# Bài giảng 06. Các phương pháp tối ưu trong học sâu

Học phần: Cơ sở toán học cho AI.

Tài liệu phát triển ba năng lực: tính và phân biệt các bước cập nhật AdaGrad, RMSProp, Adam; vận dụng Newton, gradient liên hợp và BFGS với đúng điều kiện; xác định thành phần huấn luyện bị thay đổi bởi chuẩn hóa, cập nhật theo khối, trung bình tham số và các chiến lược theo giai đoạn. Ba năng lực tương ứng với chuẩn đầu ra bài học (LLO) 14–16 và chuẩn đầu ra học phần (CLO) 2–4.

Kiến thức chuẩn bị gồm gradient, Hessian, ma trận đối xứng xác định dương, hàm bậc hai, quy tắc dây chuyền, kỳ vọng và giảm theo gradient ngẫu nhiên (SGD). Các ví dụ số trong tài liệu là ví dụ tự xây dựng để kiểm tra phép tính và giới hạn của kết luận; chúng không phải kết quả thực nghiệm trên mạng sâu.

## 1. Bài toán và mô hình bước cập nhật

### 1.1. Các thành phần của quá trình huấn luyện

Với dữ liệu $\mathcal D=\{(x_i,y_i)\}_{i=1}^n$, mô hình $f_\theta$ và tham số $\theta\in\mathbb R^p$, xét mục tiêu

$$
F(\theta)=\frac1n\sum_{i=1}^n\ell(f_\theta(x_i),y_i).
$$

Công thức này giả sử đầu ra của mỗi mẫu được xác định độc lập với các mẫu cùng lô. Chuẩn hóa theo lô ở mục 5 thay giả thiết đó. Nếu có số hạng chính quy hóa, phải đưa số hạng ấy vào mục tiêu và gradient trước khi áp dụng thuật toán.

Một quá trình huấn luyện cần chỉ định dữ liệu và mô hình, mục tiêu và điểm đầu, quy tắc cập nhật và quy tắc trả về. Các phương pháp trong bài thay những thành phần khác nhau. AdaGrad, RMSProp, Adam, Newton và BFGS tạo bước cập nhật; trung bình Polyak chọn đầu ra từ quỹ đạo; tiền huấn luyện cung cấp điểm đầu; tiếp diễn và học theo chương trình tạo các mục tiêu theo giai đoạn.

Quy ước vòng $t\ge1$: lấy lô $\mathcal B_t$, tính $g_t$ tại $\theta_{t-1}$ rồi nhận $\theta_t=\theta_{t-1}+d_t$. Với mục tiêu tách theo mẫu,

$$
g_t=\frac1{|\mathcal B_t|}\sum_{i\in\mathcal B_t}
\nabla_\theta\ell(f_{\theta_{t-1}}(x_i),y_i).
$$

Khi dùng toàn bộ dữ liệu, $g_t=\nabla F(\theta_{t-1})$. Một gradient lô nhỏ khác gradient đầy đủ nói chung; chuẩn của một gradient lô nhỏ không đủ chứng nhận điểm dừng của $F$. Ngân sách, lịch tốc độ học, quy tắc chọn tham số trên tập xác thực và điều kiện dừng phải được định trước.

### 1.2. Sai lệch thang đo

::: example
Xét $F(\theta)=\frac12(\theta_1^2+9\theta_2^2)$ tại $\theta=(1,1)^\top$. Gradient là $g=(1,9)^\top$ và $F(\theta)=5$.

| Tốc độ học $\eta$ | Điểm mới $\theta-\eta g$ | Mục tiêu mới |
|---|---|---|
| $1/5$ | $(4/5,-4/5)^\top$ | $16/5=3{,}2$ |
| $1$ | $(0,-8)^\top$ | $288$ |

Độ cong theo tọa độ thứ hai bằng $9$, còn theo tọa độ thứ nhất bằng $1$. Một tốc độ học chung chịu giới hạn bởi hướng cong hơn. Với hạ gradient lặp trên hàm này, hai tọa độ nhân lần lượt với $1-\eta$ và $1-9\eta$ sau mỗi vòng. Để cả hai co về $0$ từ mọi điểm đầu, cần $0<\eta<2/9$.
:::

Việc thay thang đo từng hướng có thể được mô tả bằng một mô hình cục bộ. Nguồn đối chiếu về điều kiện số là Goodfellow, Bengio và Courville (2016), §8.2.1; hướng theo chuẩn bậc hai được trình bày trong Boyd và Vandenberghe (2004), §9.4.1.

### 1.3. Bước có ma trận phạt

**Mệnh đề.** Cho $g\in\mathbb R^p$, $\eta>0$ và ma trận đối xứng xác định dương (SPD) $M\in\mathbb R^{p\times p}$. Nghĩa là $M=M^\top$ và $z^\top Mz>0$ với mọi $z\ne0$. Bài toán

$$
\min_{d\in\mathbb R^p}\left\{g^\top d+\frac1{2\eta}d^\top Md\right\}
$$

có nghiệm duy nhất $d_*=-\eta M^{-1}g$.

::: proof
Gọi biểu thức cần tối thiểu là $q(d)$. Ta có

$$
\nabla q(d)=g+\frac1\eta Md,
\qquad \nabla^2q(d)=\frac1\eta M\succ0.
$$

Vì thế $q$ lồi chặt (còn gọi là lồi nghiêm ngặt). Nghiệm của phương trình gradient bằng $0$ là $d_*=-\eta M^{-1}g$. Có thể kiểm trực tiếp tính tối ưu bằng cách hoàn thành bình phương:

$$
q(d)=q(d_*)+\frac1{2\eta}(d-d_*)^\top M(d-d_*).
$$

Hạng sau không âm và chỉ bằng $0$ khi $d=d_*$. Nếu thêm giả thiết $g=\nabla F(\theta)\ne0$, thì

$$
\nabla F(\theta)^\top d_*=-\eta g^\top M^{-1}g<0.
$$

Do đó $d_*$ là hướng giảm tại $\theta$. Từ định nghĩa đạo hàm theo hướng, $F(\theta+\alpha d_*)<F(\theta)$ với mọi $\alpha>0$ đủ nhỏ. Kết luận này không bảo đảm bước $\alpha=1$ làm giảm $F$.
:::

Trong ví dụ thang đo, $M=\operatorname{diag}(1,9)$ và $\eta=1$ cho $d_*=(-1,-1)^\top$, đưa điểm hiện tại tới nghiệm. Kết quả một bước này do $F$ là hàm bậc hai và $M$ đúng bằng Hessian của nó. Một ma trận phạt bất kỳ không có tính chất đó.

**Câu hỏi:** Với $g=(2,8)^\top$, $\eta=1/2$, tính bước khi $M=I$ và khi $M=\operatorname{diag}(1,4)$. Nếu đổi phần tử thứ hai của $M$ thành $-4$, bài toán con còn có cực tiểu không?

::: solution
Hai bước lần lượt là $(-1,-4)^\top$ và $(-1,-1)^\top$. Với $M=\operatorname{diag}(1,-4)$, lấy $d=(0,z)^\top$ thì $q(d)=8z-4z^2\to-\infty$ khi $|z|\to\infty$. Bài toán không bị chặn dưới.
:::

Ma trận phạt là sườn so sánh các cách tạo bước ở mục 2–4. Nó không mô tả đầy đủ những thay đổi về dữ liệu, kiến trúc hoặc mục tiêu ở mục 5–6.

## 2. Thống kê gradient theo tọa độ

### 2.1. AdaGrad

Khi không có Hessian, bình phương gradient cung cấp thống kê về độ lớn cập nhật của từng tọa độ. AdaGrad lưu tổng tích lũy

$$
v_0=0,\qquad v_t=v_{t-1}+g_t\odot g_t,
\qquad
\theta_t=\theta_{t-1}-\eta\frac{g_t}{\sqrt{v_t}+\varepsilon},
$$

với $\eta>0$, $\varepsilon>0$. Ký hiệu $\odot$, phép căn và phép chia ở đây đều thực hiện theo tọa độ. Thuật toán tính gradient, cập nhật $v_t$, rồi dùng chính thống kê mới để cập nhật tham số. Trạng thái phụ $v_t$ cần $p$ số thực; phép tính ngoài gradient có chi phí $O(p)$ mỗi vòng.

::: example
Cho $g_1=(2,1)^\top$, $g_2=(2,0)^\top$, $v_0=0$, $\eta=1$. Bỏ $\varepsilon$ chỉ trong ví dụ vì các mẫu số đều dương. Khi đó

$$
v_1=(4,1)^\top,\quad d_1=(-1,-1)^\top,
\qquad
v_2=(8,1)^\top,\quad d_2=(-1/\sqrt2,0)^\top.
$$

Tọa độ thứ nhất lặp lại cùng gradient nhưng bước thứ hai ngắn hơn do tổng bình phương đã tăng. Tọa độ thứ hai không dịch chuyển khi gradient hiện tại bằng $0$.
:::

**Tính chất.** Với $\eta$ cố định, tốc độ học hiệu dụng $\eta/(\sqrt{v_{t,j}}+\varepsilon)$ không tăng theo $t$, vì $v_{t,j}$ là tổng các số không âm. Độ dài bước còn nhân với $|g_{t,j}|$, nên không suy ra mọi bước đều ngắn dần. Nếu gradient xuất hiện liên tục, thống kê tích lũy có thể khiến tốc độ hiệu dụng nhỏ ngay cả sau khi đặc điểm của bài toán đã đổi.

AdaGrad đường chéo tương ứng với ma trận phạt $M_t=\operatorname{diag}(\sqrt{v_t}+\varepsilon)$. Thống kê này không được đồng nhất với Hessian. Các bảo đảm trong tối ưu trực tuyến của Duchi, Hazan và Singer (2011) dùng giả thiết riêng; công thức cập nhật không tự chứng minh hội tụ của một mạng phi lồi.

### 2.2. RMSProp

RMSProp thay tổng tích lũy bằng trung bình mũ:

$$
v_0=0,\qquad
v_t=\rho v_{t-1}+(1-\rho)g_t\odot g_t,
\qquad
\theta_t=\theta_{t-1}-\eta\frac{g_t}{\sqrt{v_t}+\varepsilon},
$$

trong đó $0<\rho<1$, $\eta>0$, $\varepsilon>0$. Biến thể trong bài đặt $\varepsilon$ ngoài căn, không dùng momentum hay hiệu chỉnh độ lệch. Thuật toán 8.5 của *Deep Learning* đặt hằng số ổn định bên trong căn; hai hằng số không có cùng giá trị hay cùng vai trò đại số.

::: derivation
Khai triển truy hồi cho

$$
v_t=(1-\rho)\sum_{k=1}^{t}\rho^{t-k}(g_k\odot g_k).
$$

Gradient cách thời điểm hiện tại $j$ vòng có trọng số $(1-\rho)\rho^j$. Nếu tọa độ $i$ có gradient bằng $0$ trong $k$ vòng liên tiếp sau vòng $t$, thì

$$
v_{t+k,i}=\rho^k v_{t,i}.
$$

Tổng của AdaGrad tại tọa độ ấy giữ nguyên, còn RMSProp quên dần lịch sử. Trong thời gian gradient bằng $0$, tốc độ học hiệu dụng của RMSProp có thể tăng nhưng bước vẫn bằng $0$. Khi gradient hoạt động lại, $v$ còn được cộng bình phương gradient mới trước khi tính bước.
:::

Với cùng $g_1,g_2$ ở AdaGrad và $\rho=1/2$, ta có

$$
v_1=(2,1/2)^\top,\qquad
v_2=(3,1/4)^\top,\qquad
 d_2=(-2/\sqrt3,0)^\top
$$

khi $\eta=1$ và bỏ $\varepsilon$ để tính tay. Bộ nhớ và chi phí ngoài gradient đều là $O(p)$. Hệ số $\rho$ điều khiển mức giữ lịch sử, không phải tốc độ học $\eta$.

### 2.3. Adam và hiệu chỉnh trọng số

Adam lưu cả trung bình mũ của gradient và bình phương gradient. Với $m_0=v_0=0$, $0<\beta_1,\beta_2<1$,

$$
\begin{aligned}
m_t&=\beta_1m_{t-1}+(1-\beta_1)g_t,\\
v_t&=\beta_2v_{t-1}+(1-\beta_2)g_t\odot g_t,\\
\widehat m_t&=\frac{m_t}{1-\beta_1^t},
&\widehat v_t&=\frac{v_t}{1-\beta_2^t},\\
\theta_t&=\theta_{t-1}-\eta_t\frac{\widehat m_t}{\sqrt{\widehat v_t}+\varepsilon}.
\end{aligned}
$$

Ở đây $\eta_t>0$, $\varepsilon>0$, $t\ge1$. Hai vectơ trạng thái cần $2p$ số thực. Các đại lượng hiệu chỉnh có thể được tính khi cần. Nguồn trực tiếp là Kingma và Ba, Thuật toán 1 và §3.

::: example
Với $g_1=(2,1)^\top$, $\beta_1=1/2$, $\beta_2=3/4$,

$$
m_1=(1,1/2)^\top,\qquad v_1=(1,1/4)^\top.
$$

Hiệu chỉnh cho $\widehat m_1=(2,1)^\top$ và $\widehat v_1=(4,1)^\top$. Với $\eta_1=1$ và bỏ $\varepsilon$ trong phép tính này, bước đầu bằng $(-1,-1)^\top$.
:::

**Mệnh đề về hiệu chỉnh.** Nếu các gradient ngẫu nhiên có cùng moment bậc nhất $\mathbb E[g_k]=\mu$ và cùng moment bậc hai thô hữu hạn $\mathbb E[g_k\odot g_k]=\nu$ ở mọi $k$, thì $\mathbb E[\widehat m_t]=\mu$ và $\mathbb E[\widehat v_t]=\nu$.

::: proof
Khai triển truy hồi cho

$$
m_t=(1-\beta_1)\sum_{k=1}^t\beta_1^{t-k}g_k.
$$

Tổng trọng số bằng $1-\beta_1^t$. Tính tuyến tính của kỳ vọng suy ra

$$
\mathbb E[m_t]=(1-\beta_1^t)\mu,
\qquad \mathbb E[\widehat m_t]=\mu.
$$

Thay $g_k$ bằng $g_k\odot g_k$ và $\beta_1$ bằng $\beta_2$ cho kết quả thứ hai. Chứng minh không cần các gradient độc lập. Giả thiết moment không đổi được dùng khi đưa $\mu$ và $\nu$ ra khỏi tổng.
:::

Khi moment thay đổi theo quỹ đạo, hiệu chỉnh vẫn chia cho tổng trọng số, nhưng không cho ước lượng không chệch của moment hiện tại nói chung. Moment bậc hai thô cũng khác phương sai: theo từng tọa độ, $\operatorname{Var}(g)=\mathbb E[g^2]-(\mathbb E[g])^2$. Phép lấy căn và chia trong bước Adam không bảo toàn tính không chệch của các đại lượng đã hiệu chỉnh.

**Câu hỏi:** Cho gradient vô hướng $g_1=2$, $g_2=0$, mọi trạng thái ban đầu bằng $0$. Với $\eta=1$, bỏ $\varepsilon$ vì mẫu dương, tính bước thứ hai của AdaGrad, RMSProp với $\rho=1/2$, Adam với $\beta_1=1/2$, $\beta_2=3/4$.

::: solution
AdaGrad có $v_2=4$, RMSProp có $v_2=1$; cả hai bước bằng $0$. Adam có

$$
m_2=\frac12,\quad v_2=\frac34,\quad
\widehat m_2=\frac23,\quad\widehat v_2=\frac{12}{7},
\qquad d_2=-\frac{2/3}{\sqrt{12/7}}\approx-0{,}5092.
$$

Moment bậc nhất còn giữ gradient trước nên Adam vẫn dịch chuyển.
:::

### 2.4. Giới hạn của thông tin đường chéo

Một ma trận đường chéo chỉ co giãn theo các trục tọa độ đã chọn. Nó không lưu các tương tác ngoài đường chéo của Hessian. AdaGrad và RMSProp còn dùng gradient lô nhỏ; Adam dùng moment thay gradient hiện tại. Vì vậy mệnh đề hướng giảm ở mục 1 không áp dụng trực tiếp cho mọi bước của ba thuật toán.

Chẳng hạn, xét một chuỗi gradient vô hướng $g_1=2$, $g_2=-1/5$ với $\beta_1=1/2$. Khi đó $m_1=1$, $m_2=2/5>0$. Bước Adam thứ hai âm, trong khi gradient hiện tại âm, nên tích gradient với bước dương. Đây là phản ví dụ cho khẳng định moment luôn tạo hướng giảm của gradient hiện tại; nó không phải kết luận rằng Adam luôn làm tăng mục tiêu.

Các thuật toán thích ứng dừng khi hết ngân sách hoặc đạt tiêu chí xác thực đã định. Không có xếp hạng ưu thế vô điều kiện chỉ từ các công thức trên. Thông tin về tương tác tọa độ cần một mô hình độ cong ở mục 3.

## 3. Độ cong và hệ Newton

### 3.1. Bước Newton và hướng giảm

::: example
Xét

$$
F(\theta)=\frac12\theta^\top Q\theta,
\qquad Q=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad\theta=(1,0)^\top.
$$

Gradient là $g=(2,1)^\top$. Hướng $-g$ không cùng phương với vectơ nối tới nghiệm $0$. Giải hệ

$$
Qd=-g
\quad\Longleftrightarrow\quad
2d_1+d_2=-2,\quad d_1+2d_2=-1
$$

cho $d=(-1,0)^\top$. Bước đầy đủ đưa điểm hiện tại tới $0$. Các phần tử ngoài đường chéo của $Q$ được dùng trong việc phối hợp hai tọa độ.
:::

Tại một điểm $\theta$ của hàm khả vi hai lần, đặt $g=\nabla F(\theta)$ và $H=\nabla^2F(\theta)$. Mô hình Taylor bậc hai là

$$
q(d)=F(\theta)+g^\top d+\frac12d^\top Hd.
$$

Nếu $H\succ0$, nghiệm mô hình thỏa $Hd=-g$. Thuật toán Newton tính gradient và Hessian, giải hệ, chọn độ dài bước $\alpha>0$ rồi cập nhật $\theta^+=\theta+\alpha d$. Thực hiện giải hệ thường phù hợp hơn việc lập tường minh $H^{-1}$.

::: proof
Giả sử $H\succ0$ và $g\ne0$. Vì $Hd=-g$, ta có $d\ne0$ và

$$
g^\top d=-d^\top Hd<0.
$$

Tính dương xác định quyết định dấu. Nếu chỉ biết $H$ khả nghịch, bất đẳng thức này không được bảo đảm.
:::

**Kết quả cục bộ.** Giả sử $\theta_*$ là điểm dừng, Hessian xác định dương tại $\theta_*$ và Lipschitz trong một lân cận. Khi điểm đầu đủ gần $\theta_*$ và dùng bước Newton đầy đủ trong pha cục bộ, sai số thỏa $\|\theta_{t+1}-\theta_*\|\le C\|\theta_t-\theta_*\|^2$ với một hằng số $C$. Kết quả hội tụ bậc hai này không áp dụng từ mọi điểm đầu, cũng không tự giữ nguyên nếu cố định $\alpha<1$. Nguồn đối chiếu là Boyd và Vandenberghe, §9.5.1–9.5.3.

### 3.2. Giảm chấn và Hessian bất định

Với $F(\theta)=\frac12(\theta_1^2-\theta_2^2)$ tại $(0,1)^\top$, ta có $g=(0,-1)^\top$ và $H=\operatorname{diag}(1,-1)$. Newton cho $d=(0,-1)^\top$, nên $g^\top d=1>0$. Hàm này không có cực tiểu toàn cục.

Một cách sửa hệ là dùng $A=H+\lambda I\succ0$. Nếu $H$ đối xứng, trị riêng nhỏ nhất của $A$ bằng $\lambda_{\min}(H)+\lambda$. Do đó điều kiện là

$$
\lambda>-\lambda_{\min}(H).
$$

Cộng một số dương bất kỳ chưa đủ. Trong ví dụ, $\lambda=2$ cho $A=\operatorname{diag}(3,1)$ và nghiệm $Ad=-g$ là $d=(0,1)^\top$. Tích $g^\top d=-1$ chứng nhận hướng giảm; độ dài bước ngoài vẫn phải được chọn phù hợp.

Hệ đã giảm chấn cần một bộ giải. Với số tham số lớn, việc chỉ cung cấp phép nhân $v\mapsto Av$ tránh lưu toàn bộ ma trận. Gradient liên hợp sử dụng giao diện này.

### 3.3. Gradient liên hợp tuyến tính

Phương pháp gradient liên hợp (CG) giải hệ $Ad=b$, trong đó $A=A^\top\succ0$ cố định. Cùng hệ đó là điều kiện cực tiểu của

$$
\varphi(d)=\frac12d^\top Ad-b^\top d.
$$

Ký hiệu $d_k$ là nghiệm gần đúng, $r_k=b-Ad_k$ là phần dư và $p_k$ là hướng tìm kiếm. Các hướng được gọi là $A$-liên hợp nếu $p_i^\top Ap_j=0$ với $i\ne j$. Khi dịch chuyển theo một hướng liên hợp mới, điều kiện tối ưu theo các hướng đã dùng được bảo toàn trong số học chính xác.

**Thuật toán.** Đầu vào gồm toán tử $Av$, vectơ $b$, điểm đầu $d_0$, dung sai $\tau>0$ và ngân sách nguyên $K\ge1$ vòng.

1. Tính $r_0=b-Ad_0$, đặt $p_0=r_0$. Trả $d_0$ nếu phần dư bằng $0$ hoặc đã đạt ngưỡng.
2. Với $k=0,\ldots,K-1$, lặp các phép tính sau:

$$
\alpha_k=\frac{r_k^\top r_k}{p_k^\top Ap_k},\qquad
 d_{k+1}=d_k+\alpha_kp_k,\qquad
 r_{k+1}=r_k-\alpha_kAp_k.
$$

3. Trả $d_{k+1}$ nếu $\|r_{k+1}\|_2\le\tau\max(1,\|b\|_2)$ hoặc $k+1=K$. Nếu tiếp tục, tính

$$
\beta_k=\frac{r_{k+1}^\top r_{k+1}}{r_k^\top r_k},\qquad
 p_{k+1}=r_{k+1}+\beta_kp_k.
$$

Phải kiểm dừng trước phép chia của vòng tiếp theo. Khi $r_k\ne0$, số học chính xác và giả thiết SPD bảo đảm các mẫu số cần thiết dương. Mỗi vòng dùng một tích $Av$ và $O(p)$ phép tính vectơ; bộ nhớ phụ là $O(p)$. Chi phí tạo $Av$ phụ thuộc bài toán và không phải bằng $0$.

::: example
Cho $A=\operatorname{diag}(1,4)$, $b=(1,1)^\top$, $d_0=0$. Khi đó $r_0=p_0=(1,1)^\top$ và

$$
\alpha_0=\frac25,\qquad d_1=(2/5,2/5)^\top,
\qquad r_1=(3/5,-3/5)^\top.
$$

Vì $\beta_0=(18/25)/2=9/25$, hướng mới là

$$
p_1=r_1+\beta_0p_0=(24/25,-6/25)^\top.
$$

Có $p_0^\top Ap_1=24/25-24/25=0$. Vòng thứ hai cho $p_1^\top Ap_1=144/125$, $\alpha_1=5/8$ và

$$
d_2=d_1+\frac58p_1=(1,1/4)^\top,\qquad r_2=0.
$$

Hai vòng đã giải đúng hệ hai chiều trong số học chính xác.
:::

### 3.4. Các bất biến và giới hạn của CG

**Kết quả.** Trong số học chính xác, CG trên hệ SPD tạo các hướng khác $0$ đôi một $A$-liên hợp và kết thúc sau không quá $p$ vòng. Kết quả này chỉ áp dụng cho một hệ cố định, không phải cho toàn bộ quá trình Newton hay cho CG phi tuyến.

::: proof
Phần sau giải thích các bất biến dùng trong kết quả hữu hạn vòng. Giả sử ở đầu vòng $k$, $r_k$ trực giao với các hướng trước và các hướng ấy đôi một $A$-liên hợp. Vì $p_k=r_k+\beta_{k-1}p_{k-1}$, ta có $r_k^\top p_k=\|r_k\|^2$; ở vòng đầu điều này do $p_0=r_0$.

Công thức $\alpha_k$ cho

$$
r_{k+1}^\top p_k=r_k^\top p_k-\alpha_kp_k^\top Ap_k=0.
$$

Với $i<k$, trực giao cũ và tính liên hợp cho $r_{k+1}^\top p_i=0$. Các phần dư trước là tổ hợp tuyến tính của những hướng trước hoặc hiện tại, nên $r_{k+1}$ cũng trực giao với chúng.

Từ $Ap_i=(r_i-r_{i+1})/\alpha_i$, suy ra $r_{k+1}^\top Ap_i=0$ với $i<k$. Với $i=k$,

$$
r_{k+1}^\top Ap_k=-\frac{\|r_{k+1}\|^2}{\alpha_k},
\qquad
p_k^\top Ap_k=\frac{\|r_k\|^2}{\alpha_k}.
$$

Vì $\beta_k=\|r_{k+1}\|^2/\|r_k\|^2$, hướng $p_{k+1}=r_{k+1}+\beta_kp_k$ liên hợp với $p_k$ và mọi hướng trước. Khi phần dư mới khác $0$, hướng mới khác $0$ vì phần dư trực giao với các hướng trước.

Các hướng khác $0$ đôi một $A$-liên hợp độc lập tuyến tính: nhân một tổ hợp bằng $0$ với $p_j^\top A$ cho hệ số của $p_j$ bằng $0$. Trong $\mathbb R^p$ chỉ có nhiều nhất $p$ hướng như vậy. Sau $p$ hướng độc lập, phần dư trực giao với toàn không gian phải bằng $0$, nên hệ được giải đúng.
:::

Trong số học dấu phẩy động, trực giao và liên hợp có thể suy giảm. Dừng sau ít vòng chỉ cho nghiệm gần đúng. Nguồn truy hồi và kết quả hữu hạn vòng là Shewchuk (1994), §8–§9; giả mã nằm ở Phụ lục B2. Ngưỡng $\tau\max(1,\|b\|)$ ở đây là lựa chọn biên soạn; không phải nguyên văn ngưỡng của nguồn.

### 3.5. Newton–CG và hai phép kiểm

Trong một vòng Newton–CG, đặt $b=-g$, chọn $A\succ0$ rồi dùng CG từ $d_0=0$. Toán tử, dữ liệu và các lựa chọn ngẫu nhiên dùng để tạo $Av$ phải cố định trong lần giải này. Đổi lô ở mỗi tích ma trận–vectơ có thể làm mất ý nghĩa của một hệ duy nhất.

Phần dư $r=-g-Ad$ đo sai lệch giải hệ. Nếu $d_*=-A^{-1}g$ là nghiệm chính xác, thì $d-d_*=-A^{-1}r$, nên

$$
\|d-d_*\|_2\le\|A^{-1}\|_2\|r\|_2.
$$

Cùng một chuẩn phần dư có thể tương ứng với sai số nghiệm khác nhau khi điều kiện số của $A$ thay đổi. Ngoài ra,

$$
g^\top d=-d^\top Ad-r^\top d.
$$

Nghiệm chính xác có $r=0$, còn khi kiểm một nghiệm gần đúng cần theo dõi cả phần dư và dấu hướng. Với $g\ne0$, kiểm $g^\top d<0$ trước tìm bước ngoài. Nếu kiểm này không đạt do giải gần đúng hoặc sai số, có thể siết dung sai và giải lại, hoặc dùng $-g$ kèm tìm bước. Trong CG chính xác từ $d_0=0$, các bước lặp khác $0$ đã có tính chất hướng giảm; kiểm dấu còn bảo vệ triển khai trước sai số và những biến thể bộ giải.

Nếu $g=0$, nghiệm hệ là $d=0$ và không yêu cầu bất đẳng thức nghiêm $g^\top d<0$. Gradient bằng $0$ chỉ chứng nhận điểm dừng, chưa chứng nhận cực tiểu của hàm phi lồi.

**Câu hỏi:** Cho $H=\operatorname{diag}(-1,2)$ và $g=(-1,-1)^\top$. Chọn $\lambda=1/2$ hay $2$ để dùng CG trên $A=H+\lambda I$. Sau một vòng từ $d_0=0$, ngưỡng phần dư tuyệt đối $1/10$ đã đạt chưa?

::: solution
Chỉ $\lambda=2$ cho $A=\operatorname{diag}(1,4)\succ0$. Ví dụ CG cho $d_1=(2/5,2/5)^\top$ và $r_1=(3/5,-3/5)^\top$. Chuẩn phần dư là $\sqrt{18/25}=\sqrt{0{,}72}\approx0{,}8485>0{,}1$, nên chưa đạt ngưỡng. Tích $g^\top d_1=-4/5<0$ vẫn chứng nhận hướng giảm. Hai phép kiểm trả lời hai yêu cầu khác nhau.
:::

## 4. Xấp xỉ độ cong từ gradient

### 4.1. Thông tin cát tuyến

Nếu không cung cấp được toán tử độ cong, chênh lệch hai gradient vẫn mang thông tin về độ cong. Với hai điểm $\theta,\theta^+$, đặt

$$
s=\theta^+-\theta,\qquad y=\nabla F(\theta^+)-\nabla F(\theta).
$$

Với hàm bậc hai có Hessian $Q$, ta có $y=Qs$. Tổng quát hơn, nếu Hessian liên tục trên đoạn nối hai điểm,

$$
y=\left(\int_0^1\nabla^2F(\theta+ts)\,dt\right)s.
$$

Một cặp $(s,y)$ chỉ mô tả tác động của độ cong trên một hướng. Ma trận xấp xỉ Hessian $B$ được yêu cầu thỏa $Bs=y$; ma trận xấp xỉ nghịch đảo Hessian $P$ thỏa điều kiện cát tuyến $Py=s$. Trong bài, BFGS cập nhật $P$.

### 4.2. Công thức BFGS và bảo toàn tính dương xác định

Giả sử $P=P^\top\succ0$ và $y^\top s>0$. Đặt $\rho=1/(y^\top s)$. Công thức Broyden–Fletcher–Goldfarb–Shanno (BFGS) cho nghịch đảo là

$$
P^+=(I-\rho sy^\top)P(I-\rho ys^\top)+\rho ss^\top.
$$

Hệ số $\rho$ ở mục này được định nghĩa từ cặp cát tuyến, độc lập với hệ số quên cùng ký hiệu trong RMSProp.

**Mệnh đề.** Công thức trên thỏa $P^+y=s$ và $P^+\succ0$.

::: proof
Đặt $V=I-\rho sy^\top$. Ta có $V^\top y=y-\rho y(s^\top y)=0$, do đó

$$
P^+y=VPV^\top y+\rho ss^\top y=s.
$$

Với $z\ne0$,

$$
z^\top P^+z=(V^\top z)^\top P(V^\top z)+\rho(s^\top z)^2.
$$

Hai hạng đều không âm vì $P\succ0$ và $\rho>0$. Nếu tổng bằng $0$, phải có $V^\top z=0$ và $s^\top z=0$. Nhưng khi $s^\top z=0$ thì $V^\top z=z$, dẫn đến $z=0$, mâu thuẫn. Vì vậy $P^+\succ0$.
:::

Điều kiện $y^\top s>0$ cũng là điều kiện cần để một ma trận SPD thỏa cát tuyến: nếu $Py=s$ và $y\ne0$, thì $y^\top s=y^\top Py>0$. Một cặp có tích âm không thể được tiếp nhận nguyên dạng cùng với yêu cầu này.

::: example
Cho $P_0=I$, $s=(1,0)^\top$, $y=(2,1)^\top$. Đây là cặp $y=Qs$ với ma trận $Q$ ở mục 3. Ta có $\rho=1/2$ và

$$
P_1=\begin{pmatrix}3/4&-1/2\\-1/2&1\end{pmatrix}.
$$

Kiểm trực tiếp cho $P_1y=s$. Các định thức con đầu bằng $3/4$ và $1/2$, nên $P_1\succ0$. Ma trận này chưa bằng $Q^{-1}$: một cặp cát tuyến chưa xác định toàn bộ tác động nghịch đảo của $Q$.
:::

### 4.3. Thuật toán và chi phí

Với điểm đầu $\theta_0$, ma trận $P_0\succ0$, ngưỡng gradient, ngân sách nguyên $T\ge1$ bước tham số và quy tắc tìm bước đã chọn, đặt $\theta=\theta_0$, $P=P_0$. Một vòng BFGS gồm:

1. Tính gradient đầy đủ $g$; trả $\theta$ nếu đạt ngưỡng gradient hoặc hết ngân sách.
2. Tạo hướng $d=-Pg$. Nếu $g\ne0$, $g^\top d=-g^\top Pg<0$.
3. Tìm $\alpha>0$ sao cho $F(\theta+\alpha d)<F(\theta)$, rồi đặt $\theta^+=\theta+\alpha d$.
4. Lập $s=\alpha d$, $y=\nabla F(\theta^+)-\nabla F(\theta)$.
5. Kiểm điều kiện độ cong. Khi $y^\top s$ đủ dương, nhận cập nhật BFGS cho $P$; nếu không, giữ $P$. Nhận $\theta\leftarrow\theta^+$, tính thêm một bước vào ngân sách rồi lặp từ bước 1.

Điều kiện $y^\top s>0$ không thay thế phép kiểm giảm mục tiêu ở bước 3. Điều kiện tìm bước Wolfe có thể tạo điều kiện độ cong trong bối cảnh trơn phù hợp; chứng minh và chi tiết Wolfe không là tiên quyết của các bài tập ở đây. Với gradient nhiễu từ những lô khác nhau, $y$ còn chứa thay đổi do lấy mẫu, nên cần thận trọng khi diễn giải nó là thông tin độ cong.

BFGS lưu $O(p^2)$ số thực. BFGS với bộ nhớ giới hạn (L-BFGS) lưu $m$ cặp $(s,y)$ và tính tác động lên gradient với bộ nhớ $O(mp)$. Giảm bộ nhớ không loại bỏ các yêu cầu về chất lượng cặp cát tuyến. Bài này không khẳng định hội tụ siêu tuyến tính cho mọi bài toán mạng sâu.

Trong mô hình mục 1, hướng $-Pg$ tương ứng với $M=P^{-1}$ và $\eta=1$. Bước thực tế $-\alpha Pg$ tương ứng với $\eta=\alpha$. Vì vậy $P$ là xấp xỉ nghịch đảo Hessian, không phải chính ma trận phạt $M$.

**Câu hỏi:** Với $s=(1,0)^\top$, kiểm $y^{(1)}=(2,1)^\top$ và $y^{(2)}=(-1,1)^\top$. Với $P_1$ ở ví dụ và $g=(1,0)^\top$, tính hướng.

::: solution
Hai tích $y^\top s$ lần lượt bằng $2$ và $-1$, nên chỉ cặp thứ nhất thỏa điều kiện của mệnh đề. Hướng $d=-P_1g=(-3/4,1/2)^\top$ có $g^\top d=-3/4<0$.
:::

## 5. Phép tính mô hình, khối biến và đầu ra

### 5.1. Chuẩn hóa theo lô

Chuẩn hóa theo lô (BN) thay phép tính biểu diễn. Với một đặc trưng có giá trị $a_1,\ldots,a_m\in\mathbb R$ trong lô $\mathcal B$, định nghĩa

$$
\mu_\mathcal B=\frac1m\sum_{i=1}^m a_i,\qquad
\sigma_\mathcal B^2=\frac1m\sum_{i=1}^m(a_i-\mu_\mathcal B)^2,
$$

$$
\widehat a_i=\frac{a_i-\mu_\mathcal B}{\sqrt{\sigma_\mathcal B^2+\varepsilon}},
\qquad z_i=\gamma\widehat a_i+\beta,
\qquad\varepsilon>0.
$$

Tham số $\gamma,\beta$ được học cùng mô hình. Khi học, thống kê của lô tham gia phép tính và phép đạo hàm. Khi suy luận, BN dùng thống kê đã ước lượng và cố định. Nguồn là Ioffe và Szegedy (2015), Thuật toán 1 và §3.1.

::: example
Hai lô $a=(1,1,5,5)$ và $a+4=(5,5,9,9)$ có trung bình lần lượt $3$ và $7$, cùng phương sai $4$. Trong giới hạn $\varepsilon\to0$, cả hai được chuẩn hóa thành $(-1,-1,1,1)$. Với $\gamma=2$, $\beta=1$, đầu ra là $(-1,-1,3,3)$.

Đây là phép tính giới hạn với phương sai dương, không phải khuyến nghị dùng $\varepsilon=0$. Nếu chọn $\varepsilon=1$, phương sai sau chuẩn hóa là $4/5$.
:::

**Mệnh đề.** Trung bình lô của $\widehat a$ bằng $0$, phương sai bằng $\sigma_\mathcal B^2/(\sigma_\mathcal B^2+\varepsilon)$.

::: proof
Do $\sum_i(a_i-\mu_\mathcal B)=0$, tổng các $\widehat a_i$ bằng $0$. Vì vậy phương sai chuẩn hóa là

$$
\frac1m\sum_i\widehat a_i^2
=\frac{\frac1m\sum_i(a_i-\mu_\mathcal B)^2}{\sigma_\mathcal B^2+\varepsilon}
=\frac{\sigma_\mathcal B^2}{\sigma_\mathcal B^2+\varepsilon}.
$$

Nếu phương sai đầu vào bằng $0$, mọi đầu ra chuẩn hóa bằng $0$. Phương sai đúng bằng $1$ chỉ trong giới hạn thích hợp khi phương sai đầu vào dương và $\varepsilon\to0$.
:::

Sau biến đổi affine, trung bình là $\beta$ và phương sai là $\gamma^2\sigma_\mathcal B^2/(\sigma_\mathcal B^2+\varepsilon)$. Không thay mẫu số $m$ thành $m-1$ giữa chừng vì đó là một ước lượng phương sai khác.

Trong chế độ học, đầu ra của một mẫu phụ thuộc các mẫu còn lại qua trung bình và phương sai lô. Mục tiêu phù hợp là

$$
F_{\mathrm{BN}}(\theta)=\mathbb E_{\mathcal B}[L_\mathcal B(\theta)],
$$

với phân phối lấy lô được xác định trước. Không thể giữ nguyên giả thiết mỗi mất mát chỉ phụ thuộc riêng một mẫu như ở mục 1. BN cũng không phải phép chia gradient theo tọa độ của RMSProp. Tên bài báo gốc nêu một giả thuyết về cơ chế; các đẳng thức thống kê trên không chứng minh giả thuyết đó hay bảo đảm tăng chất lượng dự đoán.

### 5.2. Hạ theo tọa độ và theo khối

Khi một nhóm biến có bài toán con rẻ, có thể cập nhật nhóm đó trong khi giữ các nhóm khác cố định. Chia $\theta=(\theta^{(1)},\ldots,\theta^{(K)})$. Một lượt tuần tự chọn các khối và dùng giá trị mới nhất của những khối đã cập nhật.

::: example
Cho

$$
F(u,v)=\frac12[(u+v-2)^2+u^2+v^2].
$$

Giữ $v$ cố định, nghiệm theo $u$ thỏa $2u+v-2=0$, nên $u^+=(2-v)/2$. Giữ $u$ cố định, $v^+=(2-u)/2$. Từ $(0,0)$, cập nhật tuần tự cho

$$
(0,0)\to(1,0)\to(1,1/2)\to(3/4,1/2)\to(3/4,5/8).
$$

Các giá trị mục tiêu tương ứng là $2$, $1$, $3/4$, $11/16$, $43/64$. Nghiệm đầy đủ là $(2/3,2/3)$ và giá trị nhỏ nhất là $2/3$.
:::

**Mệnh đề không tăng.** Nếu điểm cũ của khối còn khả thi và bộ giải con trả một điểm có giá trị mục tiêu không lớn hơn điểm cũ, thì sau cập nhật $F(\theta^+)\le F(\theta)$.

::: proof
Bài toán con giữ các khối ngoài $j$ cố định. Ký hiệu hàm của khối đang cập nhật là $\phi(z)=F(\theta^{(1)},\ldots,z,\ldots,\theta^{(K)})$. Điểm $\theta^{(j)}$ cũ thuộc miền khả thi. Do bộ giải trả $z^+$ không tệ hơn điểm đó, $\phi(z^+)\le\phi(\theta^{(j)})$, chính là bất đẳng thức cần chứng minh. Giải chính xác bài toán con là một cách đáp ứng điều kiện này.
:::

Nếu $F$ bị chặn dưới, dãy giá trị mục tiêu không tăng có giới hạn. Điều đó chưa chứng minh dãy tham số hội tụ hay giới hạn là cực tiểu toàn cục của một mạng phi lồi. Chi phí mỗi bước là chi phí bộ giải con; so sánh thuật toán phải tính đủ một chu kỳ khối hoặc tổng ngân sách, không chỉ đếm số lần cập nhật.

### 5.3. Trung bình Polyak

Cho quỹ đạo $\theta_1,\ldots,\theta_T$ trong cùng không gian tham số. Trung bình Polyak trong bài là trung bình đều

$$
\bar\theta_T=\frac1T\sum_{t=1}^T\theta_t.
$$

Có thể cập nhật trực tuyến bằng $\bar\theta_t=\bar\theta_{t-1}+(\theta_t-\bar\theta_{t-1})/t$ với $\bar\theta_1=\theta_1$, nên chỉ cần thêm $O(p)$ bộ nhớ. Nếu chỉ trung bình phần cuối của quỹ đạo, mẫu số phải là số điểm thực sự đã đưa vào trung bình.

Với $F(\theta)=(\theta-2)^2/2$, bốn điểm $1;3;1{,}5;2{,}5$ có trung bình bằng $2$ và $F(2)=0$. Trung bình làm giảm dao động quanh nghiệm trong ví dụ này.

**Kết quả dưới giả thiết lồi.** Nếu $F$ lồi trên một tập lồi chứa các điểm, bất đẳng thức Jensen cho

$$
F(\bar\theta_T)\le\frac1T\sum_{t=1}^TF(\theta_t).
$$

::: proof
Trung bình là tổ hợp lồi với trọng số $1/T$. Với hai điểm, kết quả là định nghĩa tính lồi. Giả sử kết quả đúng cho $T-1$ điểm. Viết $\bar\theta_T=((T-1)/T)\bar\theta_{T-1}+(1/T)\theta_T$, rồi áp dụng tính lồi hai điểm và giả thiết quy nạp cho kết quả với $T$ điểm.
:::

Bất đẳng thức so sánh với trung bình các giá trị, không so sánh với giá trị nhỏ nhất trong các điểm. Với hàm phi lồi $F(\theta)=(\theta^2-1)^2$, hai nghiệm $-1$ và $1$ đều có giá trị $0$, nhưng trung bình $0$ có giá trị $1$.

Trung bình đều khác trung bình mũ $\widetilde\theta_t=\rho\widetilde\theta_{t-1}+(1-\rho)\theta_t$; các trọng số của trung bình mũ không bằng nhau. Cả hai cũng khác momentum, vốn thay bước trên quỹ đạo. Trung bình tham số khác trung bình dự đoán vì mô hình thường phi tuyến theo tham số. Khi mô hình dùng BN, tham số trung bình còn phải đi kèm trạng thái thống kê suy luận được xác định và đánh giá phù hợp. Nguồn *Deep Learning*, §8.7.3, định nghĩa trung bình đều ở phần văn bản; phương trình (8.39) mô tả biến thể trung bình mũ.

### 5.4. Thiết kế đường truyền gradient

Kiến trúc xác định các tích đạo hàm mà thuật toán nhận được. Xét $h_0,\ldots,h_5\in\mathbb R$, với $h_0$ là đầu vào một khối và $h_5$ là đầu ra. Nếu $h_l=0{,}1h_{l-1}$ thì

$$
\frac{\partial h_5}{\partial h_0}=0{,}1^5=10^{-5}.
$$

Nếu thêm nối tắt đồng nhất, $h_l=h_{l-1}+0{,}1h_{l-1}$, hệ số trở thành $1{,}1^5=1{,}61051$. Với mất mát vô hướng $\mathcal L$,

$$
\frac{\partial\mathcal L}{\partial h_0}
=\frac{\partial\mathcal L}{\partial h_5}
\prod_{l=1}^5\frac{\partial h_l}{\partial h_{l-1}}.
$$

Nếu tham số $w$ của tầng trước chỉ tác động qua $h_0$, còn phải nhân $\partial h_0/\partial w$ để được gradient theo $w$. Các tích đã tính chỉ là thừa số truyền qua khối, không phải toàn bộ gradient tham số.

Nối tắt không bảo đảm hệ số bị chặn với mọi độ sâu: $1{,}1^L\to\infty$ khi $L\to\infty$. Ví dụ xác định vai trò của kiến trúc, không chứng minh mạng có nối tắt luôn tốt hơn. Sau khi xác định kiến trúc, điểm đầu vẫn có thể quyết định việc quỹ đạo có nhận tín hiệu gradient hay không.

## 6. Huấn luyện theo giai đoạn

### 6.1. Tiền huấn luyện có giám sát

Tiền huấn luyện có giám sát dùng một nhiệm vụ phụ có nhãn để tạo tham số trước khi tối ưu mục tiêu đích. Cần xác định mô hình phụ, phép chuyển tham số $T$, phần mới được khởi tạo $\xi$ và các khối được tinh chỉnh:

$$
\theta_0=T(\theta_{\mathrm{aux}},\xi).
$$

Chi phí đánh giá phương án phải tính cả nhiệm vụ phụ. Việc chuyển tham số không có nghĩa chuyển nhãn hoặc hàm mất mát phụ thành mục tiêu đích.

::: example
Nhiệm vụ phụ có một mẫu $x=1,y=2$ và mô hình $f_a(x)=ax$. Tối thiểu bình phương sai số cho $a=2$. Mô hình đích là $f_{(a,b)}(x)=bax$ với nhãn đích $y=3$, nên

$$
F(a,b)=\frac12(ab-3)^2,
\qquad
\nabla F(a,b)=((ab-3)b,(ab-3)a)^\top.
$$

Tại $(0,0)$, gradient bằng $0$ nên hạ gradient chính xác giữ nguyên điểm. Chuyển $a=2$ và khởi tạo $b=1$ cho $F=1/2$, $\nabla F=(-1,-2)^\top$. Một bước đồng thời với $\eta=1/10$ cho

$$
a^+=21/10,\qquad b^+=6/5,\qquad a^+b^+=63/25,
\qquad F(a^+,b^+)=\frac{72}{625}=0{,}1152.
$$

Hai tọa độ đều dùng gradient tại $(2,1)$; đây không phải cập nhật tuần tự theo khối.
:::

Ví dụ chứng minh hai điểm đầu tạo hành vi khác nhau. Nó không chứng minh tiền huấn luyện tốt hơn mọi khởi tạo ngẫu nhiên. Trong mô hình thực, chất lượng chuyển tham số phải được kiểm trên mục tiêu đích với cùng quy tắc chọn mô hình và ngân sách so sánh rõ ràng. Sơ đồ học từng tầng trong Goodfellow và cộng sự, §8.7.4, là một trường hợp; không phải mọi tiền huấn luyện đều dùng sơ đồ đó.

### 6.2. Phương pháp tiếp diễn

Phương pháp tiếp diễn (continuation) dùng họ mục tiêu trên cùng không gian tham số, với lịch $F_{\lambda_0},\ldots,F_{\lambda_K}=F$ đích. Mỗi bài toán con được giải theo tiêu chí đã định, rồi kết quả giai đoạn trước làm điểm đầu giai đoạn sau:

$$
\theta_{k,0}=\theta_{k-1,\mathrm{out}}.
$$

Lịch, điều kiện dừng từng giai đoạn và ngân sách là đầu vào của phương pháp; không tự suy ra từ tên gọi.

::: derivation
Xét họ tự xây dựng

$$
F_\lambda(\theta)=(\theta^2-1)^2+\lambda\theta^2,
\qquad\lambda\ge0.
$$

Đạo hàm là

$$
F_\lambda'(\theta)=4\theta^3+(2\lambda-4)\theta,
\qquad
F_\lambda''(\theta)=12\theta^2+2\lambda-4.
$$

Với $\lambda>2$, hàm có cực tiểu duy nhất tại $0$. Với $\lambda=2$, $F_2(\theta)=\theta^4+1$ vẫn có cực tiểu duy nhất tại $0$ dù đạo hàm hai bằng $0$ ở đó. Với $0\le\lambda<2$, các điểm dừng là $0$ và $\pm\sqrt{1-\lambda/2}$. Tại $0$, đạo hàm hai âm; tại hai điểm còn lại, đạo hàm hai bằng $8-4\lambda>0$. Hai cực tiểu này là toàn cục vì hàm bậc bốn tăng tới vô hạn và đã liệt kê hết các điểm dừng.

| $\lambda$ | Các cực tiểu | Loại điểm $0$ |
|---|---|---|
| $3$ | $0$ | Cực tiểu |
| $3/2$ | $-1/2,1/2$ | Cực đại địa phương |
| $0$ | $-1,1$ | Cực đại địa phương |
:::

Nếu giải giai đoạn $\lambda=3$ đúng tới $0$, rồi khởi tạo hạ gradient chính xác tại $0$ ở các giai đoạn sau, thuật toán vẫn ở $0$ vì $F_\lambda'(0)=0$ với mọi $\lambda$. Muốn rời điểm này cần một cơ chế như phá đối xứng hoặc chọn nhánh, được nêu rõ trong thuật toán. Truyền nghiệm qua các giai đoạn không tự bảo đảm tìm được cực tiểu đích. Họ trên thay hàm bằng một số hạng phạt; nó không phải phép chập Gauss.

### 6.3. Học theo chương trình

Học theo chương trình (curriculum learning) thay phân phối hoặc trọng số mẫu theo giai đoạn. Với phân phối $P_k$,

$$
F_k(\theta)=\mathbb E_{(x,y)\sim P_k}\ell(f_\theta(x),y).
$$

Cần chỉ định tiêu chí độ khó, lịch lấy mẫu, điều kiện chuyển giai đoạn và phân phối đích. Một hoán vị dữ liệu trong cùng tập không tự đồng nhất với việc thay kỳ vọng trên; thứ tự có thể ảnh hưởng quỹ đạo nhưng đó là một mô tả khác.

::: example
Cho hai mẫu $(x,y)$: $E=(1,1)$ và $H=(3,1)$, mô hình $f_\theta(x)=\theta x$, mất mát bình phương:

$$
\ell_E(\theta)=\frac12(\theta-1)^2,
\qquad
\ell_H(\theta)=\frac12(3\theta-1)^2.
$$

Mẫu $H$ có độ cong $9$ so với $1$ của $E$, nên được gọi là nhạy hơn trong ví dụ. Nếu xác suất lấy mẫu $H$ là $q\in[0,1]$,

$$
F_q=(1-q)\ell_E+q\ell_H,
\qquad F_q'=(1+8q)\theta-(1+2q).
$$

Vì $F_q''=1+8q>0$, nghiệm duy nhất là

$$
\theta_q^*=\frac{1+2q}{1+8q}.
$$

Lịch $q=0;1/4;1/2$ có nghiệm tương ứng $1;1/2;2/5$. Phân phối đích trong ví dụ là $q=1/2$.
:::

Độ khó ở đây có định nghĩa bằng độ cong; không có kết luận rằng mọi mẫu có đầu vào lớn hơn đều khó hơn theo mọi tiêu chí. Học theo chương trình tạo một họ mục tiêu nhờ thay phân phối, còn tiếp diễn tổng quát có thể thay trực tiếp các thành phần khác của hàm.

### 6.4. Đánh giá bằng mục tiêu đích

Mất mát giữa các giai đoạn không trực tiếp so sánh được nếu phân phối hoặc mục tiêu đã đổi. Trong ví dụ chương trình, tại cùng $\theta=1/2$,

$$
F_0(1/2)=F_{1/4}(1/2)=F_{1/2}(1/2)=1/8,
$$

nhưng nghiệm của ba mục tiêu khác nhau. Sự trùng giá trị tại một điểm không chứng nhận đã tối ưu cùng bài toán. Trên mục tiêu đích,

$$
F_{1/2}(2/5)=1/10<1/8=F_{1/2}(1/2).
$$

Nếu lịch dừng ở $q=1/4$, cần đưa giai đoạn cuối tới $q=1/2$ và đánh giá trên phân phối đích. Trung bình các tham số không tự thay đổi mục tiêu đang được lấy mẫu.

Đánh giá một chiến lược theo giai đoạn cần giữ cố định tập xác thực đích, tiêu chí chọn tham số và phép đo chi phí. Báo cáo gồm cả tiền huấn luyện, các giai đoạn trung gian và tinh chỉnh cuối. Không dùng tập kiểm tra để chọn lịch hay thời điểm chuyển giai đoạn.

## 7. Lựa chọn và đánh giá phương pháp

Một lựa chọn cần nêu dữ kiện sẵn có, thành phần bị thay, điều kiện áp dụng và phép kiểm. Bảng dưới tổng hợp các kết quả đã xây dựng.

| Dữ kiện hoặc khó khăn | Phương pháp có thể xét | Điều kiện và phép kiểm |
|---|---|---|
| Gradient theo tọa độ, bộ nhớ tuyến tính theo $p$ | AdaGrad, RMSProp, Adam | Kiểm trạng thái, mẫu số, quy tắc lấy lô; đánh giá trên mục tiêu cố định |
| Có toán tử độ cong SPD | Newton–CG | Cố định toán tử trong lần giải; kiểm phần dư, dấu hướng và tìm bước |
| Có chênh lệch gradient đủ ổn định | BFGS hoặc L-BFGS | Kiểm $y^\top s>0$, bộ nhớ và tìm bước |
| Biểu diễn phụ thuộc thang đo lô | BN | Phân biệt học/suy luận; theo dõi thống kê và mục tiêu theo lô |
| Có bài toán con theo nhóm biến | Hạ theo khối | Điểm cũ khả thi; bộ giải con không tăng mục tiêu; tính đủ chi phí chu kỳ |
| Các điểm muộn dao động trong cùng miền | Trung bình Polyak | Kiểm mất mát của tham số trung bình; không áp Jensen cho hàm phi lồi |
| Có nhiệm vụ phụ có nhãn | Tiền huấn luyện | Phép chuyển hợp lệ; đối chứng khởi tạo; tính cả ngân sách phụ |
| Có họ mục tiêu hoặc lịch phân phối | Tiếp diễn, học theo chương trình | Giai đoạn cuối đúng mục tiêu đích; kiểm điểm dừng và đánh giá cố định |

**Câu hỏi:** Mô hình $p=10^6$ chỉ cung cấp gradient lô nhỏ và có ngân sách trạng thái phụ tối đa $4p$ số thực. Mô hình thứ hai có $p=100$, gradient đầy đủ và toán tử $A=H+\lambda I\succ0$. Đề xuất quy tắc cập nhật cùng phép kiểm cho từng trường hợp.

::: solution
Adam lưu hai vectơ trạng thái nên phù hợp ngân sách thứ nhất; AdaGrad hoặc RMSProp cũng phù hợp với một vectơ. Cần phân biệt trạng thái lưu bền với bộ nhớ tham số, gradient và vùng làm việc của triển khai. Dữ kiện chưa đủ bảo đảm phương pháp nào tốt nhất hoặc giảm mục tiêu ở mọi vòng.

Trường hợp thứ hai có thể dùng CG từ $d_0=0$ để giải $Ad=-g$. Nếu $g=0$, kiểm điểm dừng. Nếu $g\ne0$, kiểm phần dư, ngân sách và $g^\top d<0$ trước tìm bước ngoài. Một toán tử SPD là điều kiện của bài toán giải hệ; nó không tự chứng nhận mọi nghiệm mạng sâu là cực tiểu toàn cục.
:::

## Tài liệu tham khảo

1. Goodfellow, I., Bengio, Y. và Courville, A. (2016). *Deep Learning*, MIT Press. [Chương 8 chính thức](https://www.deeplearningbook.org/contents/optimization.html): §8.2.1, tr. 279–280; §§8.5–8.7, tr. 302–325. Nguồn cấu trúc thuật toán và chiến lược huấn luyện.
2. Duchi, J., Hazan, E. và Singer, Y. (2011). “Adaptive Subgradient Methods for Online Learning and Stochastic Optimization”, *Journal of Machine Learning Research*, 12, 2121–2159. [Bài báo chính thức](https://jmlr.org/papers/volume12/duchi11a/duchi11a.pdf), §3, Hình 1 và §5. Nguồn AdaGrad.
3. Hinton, G., cùng Srivastava, N. và Swersky, K. (2012). *Neural Networks for Machine Learning*, Lecture 6. [Trang chiếu Toronto](https://www.cs.toronto.edu/~hinton/coursera/lecture6/lec6.pdf), tr. PDF 26–31. Nguồn cơ chế RMSProp.
4. Kingma, D. P. và Ba, J. (2015). “Adam: A Method for Stochastic Optimization”, ICLR; bản arXiv xuất hiện năm 2014. [Bài báo](https://arxiv.org/pdf/1412.6980), Thuật toán 1, tr. PDF 2 và §3, tr. PDF 3. Nguồn moment và hiệu chỉnh trọng số.
5. Boyd, S. và Vandenberghe, L. (2004). *Convex Optimization*. [Bản tác giả](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf), §9.4.1, tr. 476–477; §9.5.1–§9.5.3, tr. 484–489. Nguồn hướng theo chuẩn bậc hai và Newton.
6. Shewchuk, J. R. (1994). *An Introduction to the Conjugate Gradient Method Without the Agonizing Pain*, Edition 1¼, Carnegie Mellon University. [Báo cáo chính thức](https://www.cs.cmu.edu/~quake-papers/painless-conjugate-gradient.pdf), §8, công thức (45)–(49), tr. in 32; §9, tr. in 32–34; Phụ lục B2, tr. in 50. Nguồn CG tuyến tính.
7. Martens, J. (2010). “Deep Learning via Hessian-free Optimization”, *Proceedings of ICML*, 735–742. [Bản tác giả](https://www.cs.toronto.edu/~jmartens/docs/Deep_HessianFree.pdf), §3, Thuật toán 1; §4.1–§4.2. Nguồn ứng dụng toán tử độ cong, giảm chấn và CG.
8. Tibshirani, R. (2019). *Quasi-Newton Methods*, CMU 10-725. [Trang chiếu chính thức](https://stat.cmu.edu/~ryantibs/convexopt/lectures/quasi-newton.pdf), tr. 8–18, 20–23. Nguồn cát tuyến, BFGS và bộ nhớ giới hạn.
9. Ioffe, S. và Szegedy, C. (2015). “Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift”, *Proceedings of ICML*, PMLR 37, 448–456. [Bài báo chính thức](https://proceedings.mlr.press/v37/ioffe15.pdf), Thuật toán 1 và §3.1. Nguồn phép biến đổi BN, chế độ học và suy luận.
10. Bengio, Y., Louradour, J., Collobert, R. và Weston, J. (2009). “Curriculum Learning”, *Proceedings of ICML*. [Bản tác giả](https://ronan.collobert.com/pub/matos/2009_curriculum_icml.pdf), §2–§3. Nguồn lịch phân phối và liên hệ tiếp diễn.
