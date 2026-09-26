# Bài tập Bài giảng 06. Các phương pháp tối ưu trong học sâu

Các bài tập dùng cùng ký hiệu với ghi chú bài giảng. Vòng $t\ge1$ lấy gradient tại $\theta_{t-1}$ rồi cập nhật $\theta_t$. Phép bình phương, căn và chia vectơ trong các thuật toán thích ứng thực hiện theo tọa độ. Ký hiệu đối xứng xác định dương (SPD) yêu cầu ma trận đối xứng và dạng toàn phương dương với mọi vectơ khác $0$.

Bộ bài tập đo khả năng nhận biết cơ chế, tính toán và chứng minh điều kiện, vận dụng vào thiết kế tối ưu cho trí tuệ nhân tạo (AI). Mỗi kết luận cần kèm giả thiết; số gần đúng cần kèm biểu thức chính xác khi có thể. Gợi ý và lời giải nằm trong các khối có thể mở riêng.

## I. Nhận biết và phân biệt

### Bài 1. Thành phần và điều kiện áp dụng

#### Thành phần được thay đổi

::: exercise
Ghép mỗi thao tác với thành phần bị thay: dữ liệu hoặc phép tính mô hình; điểm đầu; mục tiêu; quy tắc cập nhật; quy tắc trả về. Nêu thêm một đại lượng cần kiểm.

1. Lưu trung bình mũ của bình phương gradient để điều chỉnh thang bước.
2. Tính trung bình và phương sai của kích hoạt trong lô trước phép biến đổi affine.
3. Chuyển tham số từ mô hình đã học một nhiệm vụ có nhãn sang mô hình đích.
4. Lấy trung bình đều các tham số đã thu được ở cuối quỹ đạo.
5. Thay xác suất lấy mẫu khó từ $q=0$ qua $q=1/4$ tới $q=1/2$.
6. Giữ dữ liệu cố định nhưng giảm hệ số phạt $\lambda$ trong $F_\lambda(\theta)=F(\theta)+\lambda\|\theta\|^2$.
7. Cập nhật lần lượt từng nhóm tham số và dùng giá trị mới nhất của nhóm vừa cập nhật.
:::

::: solution
1. RMSProp thay quy tắc cập nhật; kiểm thống kê $v_t$ và mẫu số.
2. Chuẩn hóa theo lô (BN) thay phép tính mô hình; kiểm chế độ học/suy luận và thống kê lô.
3. Tiền huấn luyện thay điểm đầu; kiểm phép chuyển tham số và mất mát đích.
4. Trung bình Polyak thay quy tắc trả về; kiểm mục tiêu tại tham số trung bình.
5. Học theo chương trình thay phân phối dữ liệu và do đó mục tiêu kỳ vọng; kiểm phân phối cuối và mất mát trên phân phối đích cố định.
6. Tiếp diễn thay mục tiêu; kiểm $\lambda$ cuối và điều kiện dừng của mục tiêu đích.
7. Hạ theo khối thay quy tắc cập nhật; kiểm việc không tăng mục tiêu ở bài toán con và chi phí toàn chu kỳ.
:::

#### Phạm vi của các kết luận

::: exercise
Xác định mỗi phát biểu đúng hay sai. Nếu sai, nêu điều kiện còn thiếu hoặc phản ví dụ.

1. $g^\top d<0$ bảo đảm $F(\theta+d)<F(\theta)$.
2. Hiệu chỉnh moment Adam luôn tạo ước lượng không chệch của moment gradient hiện tại.
3. Nếu Hessian đối xứng, cộng $\lambda I$ với bất kỳ $\lambda>0$ đều cho ma trận SPD.
4. CG giải một hệ SPD cố định trong không quá $p$ vòng, nếu tính bằng số học chính xác.
5. Trung bình của hai nghiệm toàn cục của một hàm phi lồi luôn là nghiệm toàn cục.
6. Khi $\varepsilon>0$ và phương sai đầu vào dương, phương sai sau chuẩn hóa BN đúng bằng $1$.
7. Mục tiêu không tăng sau từng bước theo khối đủ chứng minh tham số hội tụ tới cực tiểu toàn cục.
8. Với khối vô hướng có nối tắt $h_l=1{,}1h_{l-1}$, hệ số truyền $1{,}1^L$ bị chặn bởi một hằng số độc lập với độ sâu $L$.
:::

::: solution
1. Sai. Hướng giảm chỉ bảo đảm giảm với độ dài bước dương đủ nhỏ. Ví dụ $F(x)=x^2/2$, $x=1$, $d=-3$ có $gd=-3$ nhưng $F(-2)=2>F(1)=1/2$.
2. Sai. Tính không chệch đối với một moment chung cần moment đó không đổi qua các thời điểm dùng trong tổng. Khi moment biến thiên, hiệu chỉnh vẫn chuẩn hóa trọng số lịch sử.
3. Sai. Cần $\lambda>-\lambda_{\min}(H)$. Với $H=\operatorname{diag}(-2,1)$ và $\lambda=1$, ma trận vẫn bất định.
4. Đúng, với xử lý dừng trước phép chia và cùng một toán tử SPD trong toàn bộ lần giải.
5. Sai. $F(x)=(x^2-1)^2$ có hai nghiệm $-1,1$, còn trung bình $0$ có giá trị $1$.
6. Sai. Phương sai bằng $\sigma^2/(\sigma^2+\varepsilon)<1$.
7. Sai. Tính không tăng chỉ cho kiểm soát giá trị mục tiêu. Cần thêm các giả thiết về hàm, tập mức và quy tắc cập nhật để suy ra kết quả hội tụ thích hợp.
8. Sai. $1{,}1^L$ tăng không bị chặn; nối tắt trong ví dụ không bảo đảm một chặn chung. Hệ số qua khối còn phải nhân các đạo hàm ngoài khối để thành gradient tham số.
:::

## II. Tính toán và chứng minh

### Bài 2. AdaGrad và RMSProp

::: exercise
Cho $g_1=(2,1)^\top$, $g_2=(2,0)^\top$, $v_0=0$, $\eta=1$. Trong các phép tính số ở phần 1–2, bỏ $\varepsilon$ vì các mẫu số đều dương. Phần 3 xét công thức tổng quát với $\varepsilon>0$.

1. Tính $v_1,v_2,d_1,d_2$ của AdaGrad.
2. Tính cùng các đại lượng của RMSProp với $\rho=1/2$.
3. Chứng minh tốc độ hiệu dụng của AdaGrad không tăng khi $\eta$ cố định. Kết luận này có buộc độ dài bước không tăng không?
4. Giả sử một tọa độ có gradient bằng $0$ trong $k$ vòng sau vòng $t$. Tính thống kê của tọa độ đó ở vòng $t+k$ trong hai thuật toán.
:::

::: solution
AdaGrad cho

$$
v_1=(4,1)^\top,\quad v_2=(8,1)^\top,
\quad d_1=(-1,-1)^\top,\quad d_2=(-1/\sqrt2,0)^\top.
$$

RMSProp cho

$$
v_1=(2,1/2)^\top,\quad v_2=(3,1/4)^\top,
\quad d_1=(-\sqrt2,-\sqrt2)^\top,\quad d_2=(-2/\sqrt3,0)^\top.
$$

Trong AdaGrad, $v_{t,j}$ không giảm, nên $\eta/(\sqrt{v_{t,j}}+\varepsilon)$ không tăng. Độ dài bước còn nhân $|g_{t,j}|$, nên chưa suy ra tính đơn điệu của nó. Chẳng hạn trong một chiều, $g_1=1,g_2=10$, $\eta=1$ và $\varepsilon=1$ cho độ dài bước $1/2$ rồi $10/(\sqrt{101}+1)>1/2$.

Nếu gradient vắng $k$ vòng, AdaGrad giữ $v_{t+k,j}=v_{t,j}$, còn RMSProp có $v_{t+k,j}=\rho^k v_{t,j}$. Bước trong các vòng ấy vẫn bằng $0$ ở tọa độ đang xét.
:::

### Bài 3. Hiệu chỉnh Adam

::: exercise
Xét gradient vô hướng $g_1=2$, $g_2=0$, $m_0=v_0=0$, $\beta_1=1/2$, $\beta_2=3/4$, $\eta=1$. Bỏ $\varepsilon$ riêng phép tính số vì mẫu dương.

1. Tính $m_1,v_1,\widehat m_1,\widehat v_1$ và bước thứ nhất.
2. Tính các đại lượng tương ứng và bước thứ hai. Giải thích dịch chuyển khi $g_2=0$.
3. Chứng minh $\mathbb E[\widehat m_t]=\mu$ nếu $\mathbb E[g_k]=\mu$ với mọi $k$. Có cần độc lập giữa các gradient không?
4. Giữ $g_1=2$ nhưng thay $g_2=-1/5$. Xác định dấu $g_2d_2$ và phạm vi của kết luận.
:::

::: solution
Vòng đầu có $m_1=1$, $v_1=1$, $\widehat m_1=2$, $\widehat v_1=4$ và $d_1=-1$. Vòng hai có

$$
m_2=\frac12,\quad v_2=\frac34,\quad
\widehat m_2=\frac23,\quad\widehat v_2=\frac{12}{7},
\quad d_2=-\frac{2/3}{\sqrt{12/7}}\approx-0{,}5092.
$$

Moment bậc nhất còn giữ gradient trước. Khai triển $m_t=(1-\beta_1)\sum_{k=1}^t\beta_1^{t-k}g_k$ rồi lấy kỳ vọng cho $\mathbb E[m_t]=(1-\beta_1^t)\mu$. Không cần độc lập; cần kỳ vọng chung không đổi để đưa $\mu$ ra ngoài tổng.

Nếu $g_2=-1/5$, ta có $m_2=2/5>0$, nên $\widehat m_2>0$ và $d_2<0$. Do $g_2<0$, tích $g_2d_2>0$. Bước này không là hướng giảm của gradient hiện tại. Dấu này không phải phép tính giá trị mục tiêu sau một bước hữu hạn.
:::

### Bài 4. Newton và giảm chấn

::: exercise
1. Với $Q=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, $F(\theta)=\theta^\top Q\theta/2$ và $\theta=(1,0)^\top$, tính gradient, bước Newton và điểm mới khi dùng bước đầy đủ.
2. Với $F(\theta)=(\theta_1^2-\theta_2^2)/2$ tại $(0,1)^\top$, tính $g,H,d=-H^{-1}g$ và $g^\top d$.
3. Thay $H$ ở phần 2 bằng $A=H+2I$ trong hệ. Tính hướng mới và tích với gradient.
4. Chứng minh điều kiện $\lambda>-\lambda_{\min}(H)$ bảo đảm $H+\lambda I$ SPD khi $H$ đối xứng. Nêu các giả thiết của hội tụ Newton bậc hai cục bộ.
:::

::: solution
Phần 1 cho $g=(2,1)^\top$, $d=(-1,0)^\top$ và điểm mới $0$. Phần 2 có $g=(0,-1)^\top$, $H=\operatorname{diag}(1,-1)$, $d=(0,-1)^\top$, $g^\top d=1$. Với $A=\operatorname{diag}(3,1)$, hướng mới là $(0,1)^\top$ và tích bằng $-1$.

Ma trận đối xứng có phân rã phổ trực giao; cộng $\lambda I$ tăng mọi trị riêng thêm $\lambda$. Tất cả trị riêng dương chính khi $\lambda_{\min}(H)+\lambda>0$.

Hội tụ bậc hai cục bộ cần một điểm dừng có Hessian xác định dương, Hessian Lipschitz trong lân cận, điểm đầu đủ gần và bước đầy đủ trong pha cục bộ. Các dữ kiện của phần 2 không đáp ứng điều kiện cực tiểu như vậy.
:::

### Bài 5. Hai vòng gradient liên hợp

::: exercise
Giải $Ad=b$ với $A=\operatorname{diag}(1,4)$, $b=(1,1)^\top$, $d_0=0$ bằng gradient liên hợp (CG). Dùng $r_k=b-Ad_k$, $p_0=r_0$ và truy hồi

$$
\alpha_k=\frac{r_k^\top r_k}{p_k^\top Ap_k},\quad
 d_{k+1}=d_k+\alpha_kp_k,\quad
 r_{k+1}=r_k-\alpha_kAp_k,
$$

$$
\beta_k=\frac{r_{k+1}^\top r_{k+1}}{r_k^\top r_k},\qquad
 p_{k+1}=r_{k+1}+\beta_kp_k.
$$

1. Tính $\alpha_0,d_1,r_1,\beta_0,p_1$.
2. Kiểm $p_0^\top Ap_1=0$ và $r_0^\top r_1=0$.
3. Tính $\alpha_1,d_2,r_2$. Thuật toán cần xử lý thế nào trước khi tính vòng tiếp theo?
4. Sau vòng đầu, ngưỡng phần dư tuyệt đối $1/10$ đạt chưa? Nếu hệ là hệ Newton với $g=-b$, hướng $d_1$ có giảm không?
5. Nếu điểm đầu là $d_0=(1,1/4)^\top$, cần làm gì trước phép tính $\alpha_0$?
:::

::: solution
Có $r_0=p_0=(1,1)^\top$,

$$
\alpha_0=2/5,\quad d_1=(2/5,2/5)^\top,
\quad r_1=(3/5,-3/5)^\top,
\quad\beta_0=9/25,
\quad p_1=(24/25,-6/25)^\top.
$$

Tích liên hợp là $24/25-24/25=0$; tích hai phần dư cũng bằng $0$. Vì $p_1^\top Ap_1=144/125$ và $r_1^\top r_1=18/25$, ta có $\alpha_1=5/8$, $d_2=(1,1/4)^\top$, $r_2=0$. Kiểm dừng trước phép chia tiếp theo để tránh trường hợp không xác định.

Sau vòng đầu, chuẩn phần dư là $\sqrt{18/25}\approx0{,}8485>0{,}1$, nhưng $g^\top d_1=-4/5<0$. Giải hệ đủ chính xác và tạo hướng giảm là hai phép kiểm khác nhau.

Điểm đầu ở phần 5 đã là nghiệm; phần dư bằng $0$. Thuật toán trả ngay điểm đầu, không tính thương $0/0$ trong $\alpha_0$.
:::

### Bài 6. Điều kiện cát tuyến BFGS

::: exercise
Cho $P_0=I$, $s=(1,0)^\top$, $y=(2,1)^\top$, $\rho=(y^\top s)^{-1}$ và

$$
P_1=(I-\rho sy^\top)P_0(I-\rho ys^\top)+\rho ss^\top.
$$

1. Tính $P_1$, kiểm $P_1y=s$ và tính xác định dương.
2. Với $g=(1,0)^\top$, tính $d=-P_1g$ và $g^\top d$.
3. Thay $y$ bằng $(-1,1)^\top$. Chứng minh không thể có ma trận SPD $P$ thỏa $Py=s$.
4. Chứng minh công thức BFGS bảo toàn SPD khi $P_0\succ0$ và $y^\top s>0$.
:::

::: hint
Với phần 4, đặt $V=I-\rho sy^\top$ và khai triển $z^\top P_1z$. Xét điều kiện để cả hai số hạng không âm cùng bằng $0$.
:::

::: solution
Kết quả là

$$
P_1=\begin{pmatrix}3/4&-1/2\\-1/2&1\end{pmatrix},
\quad P_1y=(1,0)^\top,
\quad\det P_1=1/2.
$$

Hai định thức con đầu dương nên $P_1\succ0$. Hướng $d=(-3/4,1/2)^\top$ có $g^\top d=-3/4$.

Với $y=(-1,1)^\top$, $y^\top s=-1$. Nếu $Py=s$ và $P\succ0$, thì $y^\top s=y^\top Py>0$, mâu thuẫn.

Tổng quát, $P_1=VP_0V^\top+\rho ss^\top$. Với $z\ne0$,

$$
z^\top P_1z=(V^\top z)^\top P_0(V^\top z)+\rho(s^\top z)^2.
$$

Nếu tổng bằng $0$, $V^\top z=0$ và $s^\top z=0$. Điều kiện thứ hai cho $V^\top z=z$, trái với $z\ne0$. Vậy dạng toàn phương dương.
:::

### Bài 7. Thống kê và phụ thuộc lô của BN

::: exercise
Xét một đặc trưng trong lô $a=(1,1,5,5)$ với $\varepsilon=1$, $\gamma=1$, $\beta=0$.

1. Tính trung bình, phương sai theo mẫu số $m=4$, các giá trị chuẩn hóa và phương sai sau chuẩn hóa.
2. Chứng minh công thức tổng quát cho phương sai sau chuẩn hóa, kể cả trường hợp phương sai đầu vào bằng $0$.
3. Lô thứ hai là $a'=(1,1,1,5)$, vẫn dùng cùng các tham số. Tính đầu ra chuẩn hóa của mẫu có giá trị $5$ ở hai lô. Dữ kiện này cho thấy loại phụ thuộc nào?
4. Viết dạng mục tiêu phù hợp trong chế độ học và nêu thống kê dùng khi suy luận.
:::

::: solution
Lô đầu có $\mu=3$, $\sigma^2=4$ và giá trị chuẩn hóa $(-2/\sqrt5,-2/\sqrt5,2/\sqrt5,2/\sqrt5)$. Phương sai bằng $4/5$.

Tổng các sai lệch so với trung bình bằng $0$, nên trung bình chuẩn hóa bằng $0$. Phương sai là

$$
\frac1m\sum_i\frac{(a_i-\mu)^2}{\sigma^2+\varepsilon}
=\frac{\sigma^2}{\sigma^2+\varepsilon}.
$$

Khi $\sigma^2=0$, mọi đầu ra chuẩn hóa bằng $0$ và công thức vẫn đúng.

Lô thứ hai có $\mu'=2$, $\sigma'^2=3$. Mẫu có giá trị $5$ được biến đổi thành $3/2$, so với $2/\sqrt5$ ở lô đầu. Đầu ra của cùng một mẫu phụ thuộc các mẫu còn lại trong lô.

Mục tiêu học có dạng $F_{\mathrm{BN}}(\theta)=\mathbb E_\mathcal B[L_\mathcal B(\theta)]$ với phân phối lô cố định. Suy luận dùng thống kê đã ước lượng và cố định, không dùng lại quy tắc thống kê lô học một cách ngầm định.
:::

### Bài 8. Hạ theo khối và trung bình tham số

::: exercise
1. Với $F(u,v)=[(u+v-2)^2+u^2+v^2]/2$, suy ra nghiệm chính xác theo từng tọa độ. Từ $(1,1/2)$, cập nhật $u$ rồi $v$, tính điểm cuối và mục tiêu.
2. Chứng minh tính không tăng khi mỗi bài toán con trả điểm không tệ hơn điểm cũ và điểm cũ khả thi. Có thể suy ra cực tiểu toàn cục cho mọi hàm phi lồi không?
3. Với $G(\theta)=(\theta-2)^2/2$, tính trung bình đều của $1;3;1{,}5;2{,}5$ và mục tiêu tại trung bình.
4. Phân biệt trung bình đều với trung bình mũ và momentum. Dùng $J(\theta)=(\theta^2-1)^2$ để bác bỏ một bảo đảm phổ quát cho trung bình tham số.
:::

::: solution
Hai nghiệm con là $u^+=(2-v)/2$, $v^+=(2-u)/2$. Cập nhật tuần tự từ điểm đã cho nhận $u^+=3/4$, rồi $v^+=5/8$. Khi đó $u^++v^+-2=-5/8$ và

$$
F(3/4,5/8)=\frac12\left(\frac{25}{64}+\frac9{16}+\frac{25}{64}\right)=\frac{43}{64}<\frac34.
$$

Tại mỗi bài toán con, điểm cũ thuộc tập so sánh nên kết quả không tệ hơn nó. Đó là tính không tăng, chưa phải định lý hội tụ toàn cục.

Trung bình bốn điểm là $2$, nên $G=0$. Trung bình đều gán trọng số bằng nhau; trung bình mũ gán trọng số giảm theo tuổi; momentum thay bước cập nhật của quỹ đạo. Với $J$, hai điểm $-1,1$ có giá trị $0$, còn trung bình $0$ có giá trị $1$. Vì vậy trung bình các nghiệm phi lồi không luôn cải thiện hay giữ nguyên mất mát.
:::

## III. Vận dụng vào AI

### Bài 9. Khởi tạo từ nhiệm vụ phụ

::: exercise
Nhiệm vụ phụ có mẫu $x=1,y=2$, mô hình $f_a(x)=ax$ và mất mát bình phương. Nhiệm vụ đích có mẫu $x=1,y=3$, mô hình $f_{(a,b)}(x)=bax$ và

$$
F(a,b)=\frac12(ab-3)^2.
$$

1. Tính nghiệm nhiệm vụ phụ. Mô tả phép chuyển tham số khi giữ $a$ và khởi tạo mới $b=1$.
2. Tính gradient mục tiêu đích tại $(0,0)$ và tại điểm chuyển.
3. Từ điểm chuyển, thực hiện một bước hạ gradient đồng thời với $\eta=1/10$ và tính $F$ mới.
4. Nêu một kết luận được ví dụ chứng minh, một kết luận chưa được chứng minh và một yêu cầu để so sánh tiền huấn luyện với khởi tạo từ đầu.
:::

::: solution
Nghiệm phụ là $a=2$. Phép chuyển tạo $(a,b)=(2,1)$. Gradient đích là $((ab-3)b,(ab-3)a)^\top$, bằng $(0,0)^\top$ tại điểm đầu bằng $0$ và $(-1,-2)^\top$ tại điểm chuyển.

Bước đồng thời cho $a^+=21/10$, $b^+=6/5$, tích $63/25$ và $F=72/625=0{,}1152$. Giá trị cũ tại điểm chuyển là $1/2$.

Ví dụ cho thấy điểm đầu có thể thay đổi tín hiệu gradient và quỹ đạo. Nó chưa chứng minh ưu thế trước mọi khởi tạo ngẫu nhiên hoặc mọi nhiệm vụ đích. So sánh cần cùng mục tiêu đích, quy tắc xác thực và cách tính ngân sách bao gồm cả nhiệm vụ phụ.
:::

### Bài 10. Họ mục tiêu tiếp diễn

::: exercise
Cho $F_\lambda(\theta)=(\theta^2-1)^2+\lambda\theta^2$, $\lambda\ge0$.

1. Tìm mọi điểm dừng và phân loại với $\lambda=3$, $3/2$, $0$.
2. Xét riêng $\lambda=2$, khi phép kiểm đạo hàm hai tại $0$ không quyết định. Xác định cực tiểu bằng biểu thức hàm.
3. Một quy trình giải đúng giai đoạn $\lambda=3$, rồi dùng nghiệm làm điểm đầu cho hạ gradient chính xác tại $\lambda=3/2$ và $0$. Chứng minh quy trình có thể giữ nguyên $0$.
4. Nêu một thay đổi thuật toán có thể giúp rời điểm $0$ và điều vẫn phải kiểm ở giai đoạn cuối.
:::

::: solution
Ta có $F_\lambda'=\theta(4\theta^2+2\lambda-4)$ và $F_\lambda''=12\theta^2+2\lambda-4$. Với $\lambda=3$, chỉ có điểm dừng $0$, là cực tiểu duy nhất. Với $\lambda=3/2$, $0$ là cực đại địa phương, hai cực tiểu là $\pm1/2$. Với $\lambda=0$, $0$ là cực đại địa phương, hai cực tiểu là $\pm1$.

Tại $\lambda=2$, $F_2=\theta^4+1$ cho cực tiểu duy nhất $0$ dù $F_2''(0)=0$.

Vì $F_\lambda'(0)=0$ ở mọi giai đoạn, bước gradient từ $0$ luôn bằng $0$. Thay lịch $\lambda$ không tự tạo dịch chuyển. Có thể thêm nhiễu phá đối xứng hoặc chọn một nhánh điểm đầu khác $0$ theo quy tắc đã định. Sau đó vẫn phải kiểm mục tiêu đích $F_0$, điều kiện dừng và ngân sách; không có bảo đảm toàn cục chỉ từ thao tác phá đối xứng.
:::

### Bài 11. Lịch phân phối và sai mục tiêu đích

::: exercise
Mô hình $f_\theta(x)=\theta x$ nhận mẫu $E=(1,1)$ hoặc $H=(3,1)$. Xác suất lấy $H$ là $q$, nên

$$
F_q(\theta)=\frac{1-q}{2}(\theta-1)^2+\frac q2(3\theta-1)^2.
$$

Phân phối đích có $q=1/2$.

1. Tính độ cong mất mát của mỗi mẫu. Theo đại lượng đó, mẫu nào nhạy hơn?
2. Suy ra nghiệm $\theta_q^*$ và tính tại $q=0,1/4,1/2$.
3. Một lịch dừng ở $q=1/4$. Tính mất mát đích tại nghiệm của lịch và so với nghiệm đích.
4. Một người lấy trung bình các tham số quanh nghiệm ở $q=1/4$ rồi tuyên bố đã sửa việc dừng sai phân phối. Đánh giá kết luận và đề xuất sửa lịch.
:::

::: solution
Hai độ cong là $1$ và $9$, nên $H$ nhạy hơn theo độ cong. Từ

$$
F_q'=(1+8q)\theta-(1+2q),\qquad F_q''=1+8q>0,
$$

nghiệm duy nhất là $\theta_q^*=(1+2q)/(1+8q)$. Ba nghiệm là $1,1/2,2/5$.

Lịch dừng ở $q=1/4$ trả nghiệm $1/2$. Mất mát đích tại đó là $F_{1/2}(1/2)=1/8$, còn tại $2/5$ là $1/10$. Chênh lệch là $1/40$.

Trung bình tham số chỉ đổi đầu ra, không tự sửa phân phối mà thuật toán đang tối ưu. Nếu các điểm đều bằng $1/2$ thì trung bình vẫn bằng $1/2$, cho phản ví dụ trực tiếp. Cần đưa lịch tới $q=1/2$, tối ưu và đánh giá trên mục tiêu đích cố định.
:::

### Bài 12. Phương án tối ưu có điều kiện

::: exercise
Lập bảng phương án cho ba tình huống. Mỗi hàng phải có phương pháp, dữ kiện được dùng, điều kiện và phép kiểm.

1. Mô hình có $p=10^6$ tham số, chỉ cung cấp gradient lô nhỏ, không có toán tử Hessian; ngân sách trạng thái phụ lưu bền là $4p$ số thực, không tính tham số, gradient và vùng làm việc tạm.
2. Mô hình trơn có $p=100$, gradient đầy đủ $g$ và toán tử cố định $A=H+\lambda I\succ0$. Cần một hướng cho bước ngoài. Xử lý riêng $g=0$ và $g\ne0$.
3. Mô hình dùng BN, đã lưu nhiều tham số muộn để trung bình; lịch dữ liệu dừng ở $q=1/4$ nhưng phân phối đích là $q=1/2$. Xác định hai vấn đề cần xử lý trước khi báo cáo chất lượng đích.

Không yêu cầu viết mã hoặc viện dẫn kết quả thực nghiệm ngoài đề.
:::

::: solution
| Tình huống | Phương án | Điều kiện và phép kiểm |
|---|---|---|
| Gradient lô nhỏ, trạng thái $4p$ | Adam với hai vectơ trạng thái, hoặc AdaGrad/RMSProp với một vectơ | Kiểm ngân sách thực tế của triển khai, cập nhật trạng thái và mất mát trên phân phối cố định; không bảo đảm giảm mục tiêu từng bước |
| Toán tử SPD | Dùng CG từ $d_0=0$ để giải $Ad=-g$ | Khi $g=0$, kiểm điểm dừng. Khi $g\ne0$, kiểm phần dư, ngân sách, $g^\top d<0$ và tìm bước; giữ toán tử cùng dữ liệu cố định trong lần giải |
| BN và lịch sai phân phối | Hoàn tất lịch tới phân phối đích; xác định trạng thái BN của mô hình trả về | Đánh giá tham số trung bình với thống kê suy luận phù hợp, rồi đo trên phân phối đích cố định; trung bình không thay thế việc sửa lịch |

Nếu kiểm dấu hướng của bộ giải gần đúng không đạt, có thể giải lại với dung sai chặt hơn hoặc dùng $-g$ kèm tìm bước. BN ở chế độ suy luận phải có thống kê đã xác định; không thể chỉ trung bình các trọng số và bỏ qua trạng thái đó. Dữ kiện của đề chưa đủ xếp hạng chất lượng cuối giữa mọi phương án hợp lệ.
:::

## Tài liệu đối chiếu

Các đề và dữ kiện số được biên soạn cho bài giảng; công thức và điều kiện được đối chiếu với các nguồn sau.

- Goodfellow, I., Bengio, Y. và Courville, A. (2016), *Deep Learning*, [Chương 8](https://www.deeplearningbook.org/contents/optimization.html), §§8.5–8.7: phạm vi thuật toán và chiến lược huấn luyện.
- Duchi, J., Hazan, E. và Singer, Y. (2011), [“Adaptive Subgradient Methods for Online Learning and Stochastic Optimization”](https://jmlr.org/papers/volume12/duchi11a/duchi11a.pdf), §3 và §5: AdaGrad.
- Kingma, D. P. và Ba, J. (2015), [“Adam: A Method for Stochastic Optimization”](https://arxiv.org/pdf/1412.6980), Thuật toán 1 và §3: trạng thái và hiệu chỉnh Adam.
- Boyd, S. và Vandenberghe, L. (2004), [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf), §9.4.1 và §9.5.1–§9.5.3: hướng theo chuẩn bậc hai và Newton.
- Shewchuk, J. R. (1994), [*An Introduction to the Conjugate Gradient Method Without the Agonizing Pain*](https://www.cs.cmu.edu/~quake-papers/painless-conjugate-gradient.pdf), §8–§9 và Phụ lục B2: CG tuyến tính.
- Tibshirani, R. (2019), [*Quasi-Newton Methods*, CMU 10-725](https://stat.cmu.edu/~ryantibs/convexopt/lectures/quasi-newton.pdf), tr. 8–18, 20–23: BFGS và điều kiện cát tuyến.
- Ioffe, S. và Szegedy, C. (2015), [bài báo BN](https://proceedings.mlr.press/v37/ioffe15.pdf), Thuật toán 1 và §3.1: chuẩn hóa theo lô.
- Bengio, Y., Louradour, J., Collobert, R. và Weston, J. (2009), [“Curriculum Learning”](https://ronan.collobert.com/pub/matos/2009_curriculum_icml.pdf), §2–§3: lịch phân phối và liên hệ tiếp diễn.
