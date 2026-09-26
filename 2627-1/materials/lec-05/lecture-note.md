# Bài 05 — Các phương pháp tối ưu trong huấn luyện mô hình học sâu

Huấn luyện một mô hình từ dữ liệu hữu hạn đòi hỏi xác định hàm mục tiêu, xây dựng thông tin gradient, lựa chọn quy tắc cập nhật và khởi tạo tham số. Chất lượng dự đoán trên dữ liệu mới còn phụ thuộc tiêu chí đánh giá và cách sử dụng dữ liệu. Ghi chú này phát triển các phép tính và chứng minh của bài giảng theo năm phần; bộ bài tập đi kèm chứa các nhiệm vụ tính toán, chứng minh và vận dụng độc lập.

Kết quả cần đạt: phân biệt mục tiêu huấn luyện và đánh giá; tính gradient nhóm cùng bước SGD, momentum, Nesterov; giải thích đối xứng và tính thang khởi tạo theo giả thiết đã nêu.

Kiến thức nền gồm gradient, Hessian, khai triển Taylor bậc hai, kỳ vọng và phương sai. Mạng hai đơn vị ẩn và quy tắc dây chuyền được thiết lập trong phần D. Nguồn nội dung chính là Goodfellow, Bengio và Courville (2016), *Deep Learning*, §§8.1–8.4.

## A. Bài toán huấn luyện và tiêu chí đánh giá

### Dữ liệu, mô hình và mất mát

Một mô hình dự đoán hằng cung cấp ví dụ tối thiểu về việc chọn tham số từ dữ liệu. Cho ba quan sát $y=(-1,1,3)$ và dự đoán $f_\theta=\theta$, với $\theta\in\mathbb R$. Mất mát trên quan sát thứ $i$ là $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$; mất mát huấn luyện là trung bình ba mất mát.

::: derivation
Khai triển các bình phương cho

$$
\begin{aligned}
J(\theta)
&=\frac16\left[(\theta+1)^2+(\theta-1)^2+(\theta-3)^2\right]\\
&=\frac12\theta^2-\theta+\frac{11}{6}
=\frac12(\theta-1)^2+\frac43.
\end{aligned}
$$

Do đó $J'(\theta)=\theta-1$. Nghiệm duy nhất là $\theta=1$, với $J(1)=4/3$. Ba sai số tại nghiệm là $2,0,-2$, nên các mất mát riêng bằng $2,0,2$.
:::

![Ba quan sát −1, 1, 3 và các sai số có dấu của dự đoán chung bằng 1.](img/lec-05/observations.svg)

Nghiệm của bài toán trung bình không buộc từng mất mát riêng bằng không. Ví dụ này chỉ xác lập cấu trúc mục tiêu và phép tính từ dữ liệu; ba quan sát không cung cấp bằng chứng về khả năng khái quát hóa.

### Mất mát huấn luyện và rủi ro kỳ vọng

**Định nghĩa.** Cho $d,p,N$ là các số nguyên dương, lần lượt chỉ số đặc trưng, số tham số và số mẫu. Tham số là $\theta\in\mathbb R^p$; mô hình $f_\theta:\mathbb R^d\to\mathcal Z$ ánh xạ đặc trưng sang miền dự đoán $\mathcal Z$. Hàm mất mát $\ell:\mathcal Z\times\mathcal Y\to\mathbb R_{\ge0}$ so sánh dự đoán với nhãn thuộc $\mathcal Y$.

Với tập dữ liệu $D=\{(x_i,y_i)\}_{i=1}^N$, đặt $\ell_i(\theta)=\ell(f_\theta(x_i),y_i)$. Mất mát huấn luyện và rủi ro kỳ vọng là

$$
J(\theta)=\frac1N\sum_{i=1}^N\ell_i(\theta),\qquad
R(\theta)=\mathbb E_{(X,Y)\sim P}\ell(f_\theta(X),Y),
$$

trong đó $P$ là phân phối trên $\mathbb R^d\times\mathcal Y$ và giả sử $R(\theta)$ hữu hạn tại các tham số xét. Hai đại lượng dùng cùng mô hình và mất mát nhưng khác phép lấy trung bình. $J$ tính được từ dữ liệu đã có; $R$ phụ thuộc phân phối dữ liệu. Ký hiệu $R$ không chỉ giá trị nhỏ nhất của $J$.

Tập xác thực cung cấp tiêu chí lựa chọn cấu hình hoặc thời điểm lưu mô hình. Tập kiểm thử dành cho đánh giá sau khi lựa chọn hoàn tất. Khi các tập đánh giá đại diện cho phân phối triển khai, kết quả của chúng cung cấp thông tin về chất lượng ngoài tập huấn luyện; một ước lượng hữu hạn vẫn có sai số.

| Thời điểm | Mất mát huấn luyện | Mất mát xác thực |
|---|---:|---:|
| 1 | 0.30 | 0.35 |
| 2 | 0.20 | 0.42 |

Bảng chứa số liệu giả lập sư phạm; mỗi cột dùng cùng một thước đo ở hai thời điểm. Nếu tiêu chí lựa chọn là mất mát xác thực, thời điểm 1 được chọn. Mất mát huấn luyện thấp hơn ở thời điểm 2 chưa xác lập chất lượng dự đoán tốt hơn. Mất mát khả vi dùng trong cập nhật cũng có thể là đại lượng thay thế cho một tiêu chí khác, chẳng hạn lỗi phân loại 0–1.

### Điểm dừng và nhiều cực tiểu

Với $s(u,v)=u^2-v^2$, gradient bằng $(2u,-2v)^T$ và Hessian bằng $\operatorname{diag}(2,-2)$. Tại gốc, gradient bằng không. Tuy nhiên, $s(u,0)=u^2>0$ và $s(0,v)=-v^2<0$ khi tọa độ khác không, kể cả trong lân cận tùy ý nhỏ. Gốc là điểm yên ngựa.

Hàm $r(u)=(u^2-1)^2$ có hai cực tiểu toàn cục tại $u=\pm1$, cùng giá trị 0. Số bộ tham số cực tiểu không tự quyết định số mức chất lượng. Trong mạng, hoán đổi đơn vị ẩn cùng các trọng số tương ứng có thể giữ nguyên hàm dự đoán; phần D thiết lập một ví dụ cụ thể.

![Hai lát cắt trái dấu của hàm yên ngựa và đồ thị hàm có hai cực tiểu cùng giá trị.](img/lec-05/critical-points.svg)

Gradient bằng không chưa chứng nhận cực tiểu; hướng giảm cục bộ cũng chưa bảo đảm nghiệm toàn cục hoặc chất lượng xác thực. Các ví dụ trên xác định giới hạn của từng kết luận, không mô tả mọi cực tiểu của mạng sâu.

**Câu hỏi:** Hai thời điểm có mất mát huấn luyện $0.24,0.18$ và lỗi xác thực $0.12,0.16$. Thời điểm nào được chọn theo lỗi xác thực? Kết luận này cung cấp thông tin gì về $R$?

## B. Ước lượng gradient và phương pháp hạ gradient ngẫu nhiên

### Chi phí và gradient của từng quan sát

Khi các $\ell_i$ khả vi, đặt $g_i(\theta)=\nabla\ell_i(\theta)\in\mathbb R^p$. Đạo hàm qua tổng hữu hạn cho

$$
\nabla J(\theta)=\frac1N\sum_{i=1}^Ng_i(\theta).
$$

Nếu mỗi gradient mẫu có chi phí $C$, một gradient đầy đủ cần khoảng $NC$ công việc, còn trung bình của $b$ gradient mẫu cần khoảng $bC$. Số phép đánh giá chưa xác định thời gian chạy trên phần cứng; chi phí mỗi bước cũng chưa xác định tổng chi phí đạt chất lượng mục tiêu.

Trong ví dụ ba quan sát, $g_i(\theta)=\theta-y_i$. Tại $\theta=1$:

| $y_i$ | $-1$ | $1$ | $3$ |
|---|---:|---:|---:|
| $g_i(1)$ | $2$ | $0$ | $-2$ |

Gradient trung bình bằng 0, nhưng hai gradient mẫu khác 0. Âm gradient của mẫu $-1$ hướng sang trái; âm gradient của mẫu $3$ hướng sang phải.

![Các hướng âm gradient của ba mẫu tại cùng tham số θ=1; trung bình ba gradient bằng không.](img/lec-05/sample-directions.svg)

### Tính không chệch và hiệp phương sai

**Mệnh đề.** Cố định $D,\theta$; giả sử mọi $\ell_i$ khả vi tại $\theta$. Đặt $g_i=\nabla\ell_i(\theta)$, $\bar g=N^{-1}\sum_i g_i$ và

$$
\Sigma(\theta)=\frac1N\sum_{i=1}^N(g_i-\bar g)(g_i-\bar g)^T\in\mathbb R^{p\times p}.
$$

Cho $b\in\mathbb N_{>0}$. Lấy $I_1,\ldots,I_b$ độc lập, phân phối đều trên $\{1,\ldots,N\}$, có hoàn lại; nhóm mới độc lập với lịch sử trước khi lấy nhóm. Với $\widehat g=b^{-1}\sum_r g_{I_r}$,

$$
\mathbb E[\widehat g\mid D,\theta]=\nabla J(\theta),\qquad
\operatorname{Cov}(\widehat g\mid D,\theta)=\frac{\Sigma(\theta)}b.
$$

Các gradient có mômen bậc hai hữu hạn trong tập hữu hạn đang xét.

::: proof
Với mỗi $r$, tính đều cho

$$
\mathbb E[g_{I_r}\mid D,\theta]=\frac1N\sum_i g_i=\bar g.
$$

Tính tuyến tính của kỳ vọng cho kết luận thứ nhất. Đặt $\xi_r=g_{I_r}-\bar g$. Khi $r\ne s$, độc lập và kỳ vọng bằng không cho $\mathbb E[\xi_r\xi_s^T\mid D,\theta]=0$. Vì vậy

$$
\begin{aligned}
\operatorname{Cov}(\widehat g\mid D,\theta)
&=\frac1{b^2}\sum_{r,s=1}^b\mathbb E[\xi_r\xi_s^T\mid D,\theta]\\
&=\frac1{b^2}\sum_{r=1}^b\Sigma(\theta)=\frac{\Sigma(\theta)}b.
\end{aligned}
$$
:::

Tính không chệch ở đây hướng tới $\nabla J$, không mặc nhiên là $\nabla R$. Lấy mẫu không hoàn lại hoặc các chỉ số phụ thuộc cần phân tích riêng; công thức chia phương sai cho $b$ dùng tính độc lập.

Ở ví dụ vô hướng tại $\theta=1$, gradient mẫu có kỳ vọng 0 và phương sai $(4+0+4)/3=8/3$. Gradient nhóm có phương sai $8/(3b)$.

### Một bước gradient ngẫu nhiên

Với $\theta=1$, chọn mẫu $y=-1$ và bước học $\eta=0.1$. Gradient của mẫu là 2, nên $\theta'=0.8$. Mất mát mẫu giảm từ 2 xuống $\tfrac12(0.8+1)^2=1.62$, nhưng

$$
J(0.8)-J(1)=\frac12(0.8-1)^2=0.02.
$$

![Bước cập nhật từ θ=1 đến θ=0,8 giảm mất mát mẫu y=−1 nhưng tăng mất mát trung bình J.](img/lec-05/sample-step.svg)

Một hiện thực của gradient không chệch có thể làm tăng $J$. Phát biểu về kỳ vọng của hướng không phải phát biểu về dấu của thay đổi hàm sau mỗi bước.

### Thuật toán và tiêu chí dừng

Phương pháp hạ gradient ngẫu nhiên (SGD) dùng

$$
\widehat g_t=\frac1b\sum_{r=1}^b\nabla\ell_{I_{t,r}}(\theta_t),\qquad
\theta_{t+1}=\theta_t-\eta_t\widehat g_t,
$$

với $\eta_t>0$ và các chỉ số mới được lấy độc lập đều có hoàn lại, độc lập với lịch sử trước bước đó.

Đầu vào gồm $D,f,\ell,\theta_0$, cỡ nhóm $b\in\mathbb N_{>0}$, lịch bước $\{\eta_t\}$, ngân sách số bước $T\in\mathbb N_{>0}$, tập xác thực, lịch đánh giá, số lần chờ $K_{\mathrm{stop}}\in\mathbb N_{>0}$ và ngưỡng cải thiện $\delta\ge0$. Ký hiệu $p$ tiếp tục chỉ số tham số.

1. Đánh giá $\theta_0$, lưu tham số và giá trị xác thực ban đầu; đặt bộ đếm chờ bằng 0.
2. Với $t=0,\ldots,T-1$, lấy nhóm, tính gradient tại $\theta_t$ và cập nhật.
3. Ở mỗi lần đánh giá xác thực, so giá trị mới với giá trị tốt nhất trước lần đánh giá. Lưu tham số nếu giá trị mới nhỏ hơn.
4. Đặt lại bộ đếm chờ bằng 0 nếu mức giảm lớn hơn $\delta$ so với giá trị tốt nhất cũ; nếu không, tăng bộ đếm một đơn vị.
5. Dừng khi bộ đếm đạt $K_{\mathrm{stop}}$ hoặc hết ngân sách $T$. Đầu ra là tham số có giá trị xác thực nhỏ nhất đã thấy.

Một cải thiện dương nhưng không vượt $\delta$ vẫn được lưu và vẫn tăng bộ đếm. Quy tắc này xác định riêng việc chọn bản lưu và việc tiếp tục huấn luyện. Nó không phải định lý hội tụ. Một bước SGD cũng không đồng nghĩa một lượt qua dữ liệu: với lấy mẫu có hoàn lại, $N/b$ bước chỉ tương đương $N$ lần đánh giá mẫu, chưa bảo đảm đã gặp mọi mẫu.

### Cỡ nhóm và bước học

Sai số chuẩn của ước lượng là căn bậc hai của phương sai của nó. Trong ví dụ ba quan sát, phương sai và sai số chuẩn của gradient nhóm tại $\theta=1$ là

| $b$ | Phương sai $8/(3b)$ | Sai số chuẩn $\sqrt{8/(3b)}$ |
|---|---:|---:|
| 1 | $8/3$ | $\sqrt{8/3}$ |
| 4 | $2/3$ | $\sqrt{2/3}$ |
| 16 | $1/6$ | $\sqrt{1/6}$ |

Tăng nhóm bốn lần làm sai số chuẩn giảm hai lần và tăng số gradient mẫu cho mỗi ước lượng bốn lần. Bộ nhớ và khả năng xử lý song song còn ảnh hưởng thời gian thực tế. Các số trên được tính tại tham số cố định, không phải đường hội tụ.

Tại $\theta_t=1$, cập nhật còn có phương sai

$$
\operatorname{Var}(\theta_{t+1}\mid D,\theta_t=1)
=\eta_t^2\frac8{3b}.
$$

Giảm bước một nửa làm phương sai cập nhật giảm bốn lần, đồng thời giảm độ dài thành phần có hướng. Một lịch hữu hạn, chẳng hạn giảm từ $0.1$ xuống $0.05$ sau một ngân sách định trước, là lựa chọn vận hành; phép tính phương sai này chưa chứng minh hội tụ toàn cục cho mạng.

**Câu hỏi:** Với nhóm gồm $y=-1$ và $y=1$ tại $\theta=1$, gradient nhóm, tham số mới và thay đổi $J$ bằng bao nhiêu khi $\eta=0.1$? Kỳ vọng trước khi biết nhóm khác giá trị của nhóm đã quan sát như thế nào?

## C. Phương pháp momentum và Nesterov

### Độ cong của hàm bậc hai

Để tách tác dụng của quy tắc cập nhật khỏi nhiễu lấy mẫu, xét gradient đầy đủ của

$$
q(\theta)=\frac12\left(3[\theta]_1^2+7[\theta]_2^2\right),\qquad
\theta\in\mathbb R^2.
$$

Ở đây $[\theta]_i$ chỉ tọa độ thứ $i$; $\theta_t$ chỉ cả vectơ tại bước $t$. Hessian là $H=\operatorname{diag}(3,7)$ và $g=\nabla q(\theta)=H\theta$. Tại $\theta_0=(2,4)^T$, $g=(6,28)^T$. Tỷ số thành phần gradient $28/6=14/3$ khác tỷ số độ lệch $4/2=2$ vì gradient còn chứa độ cong. Số điều kiện của Hessian xác định dương là $\kappa(H)=\lambda_{\max}/\lambda_{\min}$. Tỷ số lớn làm bước bị giới hạn bởi hướng cong lớn, trong khi hướng cong nhỏ tiến chậm. Trong ví dụ, $\kappa(H)=7/3$ mô tả hai độ cong khác nhau, chưa đại diện cho một bài toán có điều kiện cực kỳ kém.

![Đường mức của hàm bậc hai với hệ số 3 và 7, điểm ban đầu (2,4) và hướng âm gradient.](img/lec-05/quadratic-initial.svg)

Với $I_2$ là ma trận đơn vị $2\times2$, bước hạ gradient có dạng $\theta^+=(I_2-\eta H)\theta$. Vì $q$ là bậc hai,

$$
q(\theta-\eta g)=q(\theta)-\eta g^Tg+\frac{\eta^2}{2}g^THg
$$

là đẳng thức chính xác. Với hàm khả vi hai lần tổng quát, mô hình Taylor bậc hai còn có số dư.

Hai hệ số cập nhật là $1-3\eta$ và $1-7\eta$. Với $\eta=1/4$, chúng bằng $1/4,-3/4$, nên $\theta_1=(0.5,-3)^T$. Dấu âm ở tọa độ thứ hai tạo chuyển động qua hai phía của trục. Co nghiêm ngặt theo cả hai hướng cần

$$
|1-3\eta|<1,\quad |1-7\eta|<1
\quad\Longleftrightarrow\quad 0<\eta<\frac27.
$$

Giảm bước có thể tránh vượt trục nhưng cũng rút ngắn tiến triển theo hướng còn cách nghiệm. Momentum bổ sung trạng thái để tích lũy một phần các hướng cập nhật trước.

### Tích lũy hướng bằng momentum

Từ đây, đối chứng ba phương pháp dùng cùng $\eta=0.05$, $\beta=0.5$, $\theta_0=(2,4)^T$, $v_0=0$. Cấu hình này khác bước $1/4$ ở phép phân tích trên.

Bước đầu cho $v_1=-0.05(6,28)^T=(-0.3,-1.4)^T$ và $\theta_1=(1.7,2.6)^T$. Tại điểm này, gradient bằng $(5.1,18.2)^T$. Giữ một nửa bước cũ rồi cộng bước âm gradient cho

$$
v_2=\frac12(-0.3,-1.4)^T-0.05(5.1,18.2)^T=(-0.405,-1.61)^T,
$$

nên $\theta_2=(1.295,0.99)^T$.

**Thuật toán.** Momentum dùng bước cố định $\eta>0$ và trạng thái dịch chuyển $v_t\in\mathbb R^p$:

$$
v_{t+1}=\beta v_t-\eta\widehat g_t,\qquad
\theta_{t+1}=\theta_t+v_{t+1},\qquad 0\le\beta<1.
$$

Gradient nhóm $\widehat g_t$ được tính tại $\theta_t$ bằng cơ chế đã nêu trong phần B. Đầu vào bổ sung gồm $\beta$ và $v_0=0$; tiêu chí dừng và đầu ra giữ cùng quy tắc SGD. Trạng thái thêm một vectơ $p$ phần tử và phép cập nhật $O(p)$ ngoài chi phí gradient.

**Mệnh đề.** Với $\eta,\beta$ cố định và $v_0=0$,

$$
v_{t+1}=-\eta\sum_{s=0}^t\beta^{t-s}\widehat g_s.
$$

::: proof
Tại $t=0$, truy hồi cho $v_1=-\eta\widehat g_0$. Giả sử công thức đúng cho $v_t$. Khi đó

$$
v_{t+1}=\beta\left(-\eta\sum_{s=0}^{t-1}\beta^{t-1-s}\widehat g_s\right)-\eta\widehat g_t
=-\eta\sum_{s=0}^t\beta^{t-s}\widehat g_s.
$$

Quy nạp hoàn tất chứng minh.
:::

Các gradient cùng hướng tích lũy; các thành phần trái dấu có thể triệt tiêu một phần. Tổng trọng số hình học nói chung khác 1, nên biểu thức chưa phải trung bình chuẩn hóa. Nếu gradient luôn bằng vectơ $g$, trường hợp riêng là $v_{t+1}=-\eta(1-\beta^{t+1})g/(1-\beta)$. Gradient hằng không phải giả thiết của toàn quỹ đạo thông thường.

Sau hai bước cùng cấu hình, hạ gradient cho $(1.445,1.69)^T$ và momentum cho $(1.295,0.99)^T$. Giá trị hàm lần lượt là $13.1283875$ và $5.9458875$. Kết quả xác định ảnh hưởng của trạng thái trong ví dụ; nó chưa chứng minh ưu thế chung hoặc khả năng khắc phục mọi điểm yên ngựa và vùng bão hòa.

### Điểm dự báo của Nesterov

Dịch chuyển quán tính $\beta v_t$ làm thay đổi vị trí trước khi hiệu chỉnh bằng gradient. Trên hàm bậc hai, thay đổi gradient được tính chính xác bằng $H\beta v_t$.

Ở trạng thái $\theta_1=(1.7,2.6)^T$, $v_1=(-0.3,-1.4)^T$, điểm dự báo là $\widetilde\theta_1=\theta_1+\beta v_1=(1.55,1.9)^T$. Gradient tại điểm hiện tại là $(5.1,18.2)^T$, còn tại điểm dự báo là $(4.65,13.3)^T$; hiệu bằng $(-0.45,-4.9)^T=H\beta v_1$.

![Điểm hiện tại và điểm dự báo Nesterov trên cùng đường mức; gradient được đánh giá tại điểm dự báo.](img/lec-05/nesterov-points.svg)

**Thuật toán.** Phương pháp gradient gia tốc Nesterov (NAG), theo quy ước momentum của bài với bước cố định $\eta>0$, dùng

$$
\begin{aligned}
\widetilde\theta_t&=\theta_t+\beta v_t,\\
\widehat g_t&=\frac1b\sum_{r=1}^b\nabla\ell_{I_{t,r}}(\widetilde\theta_t),\\
v_{t+1}&=\beta v_t-\eta\widehat g_t,\\
\theta_{t+1}&=\theta_t+v_{t+1}.
\end{aligned}
$$

Điểm dự báo được tính từ trạng thái cũ. Gradient đánh giá tại đó, nhưng tham số mới vẫn cập nhật từ $\theta_t$; cộng $v_{t+1}$ vào $\widetilde\theta_t$ sẽ cộng phần quán tính hai lần. Khi đối chứng tác dụng riêng của điểm gradient, hai phương pháp cần dùng cùng nhóm.

Ví dụ cho $v_2=(-0.3825,-1.365)^T$, $\theta_2=(1.3175,1.235)^T$, với $q(\theta_2)=7.941996875$. Giá trị này lớn hơn momentum sau bước thứ hai. Một gradient mỗi bước và một vectơ trạng thái vẫn đủ cho quy tắc Nesterov; đổi điểm đánh giá không tạo bảo đảm luôn tốt hơn. Bản hệ số cố định này cũng không tự có tốc độ $O(1/t^2)$ của các phương pháp gia tốc lồi với lịch hệ số và giả thiết riêng.

**Câu hỏi:** Với $\theta=(1,1)^T$, $v=(-0.2,0.2)^T$, $\eta=0.05$, $\beta=0.5$, điểm gradient và tham số mới của momentum khác Nesterov như thế nào?

## D. Khởi tạo tham số mạng nơ ron

### Mạng hai đơn vị ẩn và đạo hàm tham số

Một quy tắc cập nhật cần gradient theo tham số của mô hình cụ thể. Xét hai đơn vị ẩn, với $x,y\in\mathbb R$ và $j\in\{1,2\}$:

$$
z_j=w_jx+b_j,\qquad h_j=\phi(z_j),\qquad
f_\theta(x)=a_1h_1+a_2h_2,\qquad
\ell=\frac12(f_\theta(x)-y)^2.
$$

Hàm tuyến tính chỉnh lưu (ReLU) là $\phi(z)=\max(0,z)$. Sáu tham số thực $w_j,b_j,a_j$ tạo thành $\theta\in\mathbb R^6$. Tại $x=1,y=0,w_j=a_j=1,b_j=0$, mỗi $z_j=h_j=1$, đầu ra bằng 2 và mất mát bằng 2.

![Mạng hai đơn vị ẩn với các trọng số đầu vào w, độ lệch b và trọng số đầu ra a.](img/lec-05/two-hidden-units.svg)

Đặt $e=f_\theta-y$. Ở điểm khả vi của $\phi$, quy tắc dây chuyền cho

$$
\frac{\partial\ell}{\partial a_j}=eh_j,\qquad
\frac{\partial\ell}{\partial w_j}=ea_j\phi'(z_j)x,\qquad
\frac{\partial\ell}{\partial b_j}=ea_j\phi'(z_j).
$$

Mỗi thừa số thể hiện độ nhạy trên đường từ tham số đến mất mát: $e$ là đạo hàm mất mát theo đầu ra, $a_j$ truyền ảnh hưởng của kích hoạt, $\phi'(z_j)$ truyền qua phi tuyến, còn $x$ xuất hiện khi lấy đạo hàm $w_jx+b_j$ theo $w_j$. Trong cấu hình số trên, $e=2$, $\phi'(1)=1$, nên cả sáu đạo hàm bằng 2. Các phép tính dùng tiền kích hoạt dương, không cần chọn đạo hàm ReLU tại 0.

Tính gradient bằng dây chuyền và dùng gradient để cập nhật là hai phép toán riêng. SGD, momentum và Nesterov sử dụng gradient này theo các quy tắc khác nhau.

### Đối xứng và khởi tạo khác nhau

Với bước hạ gradient $0.1$, cấu hình trên cho $a_j'=0.8$, $w_j'=0.8$, $b_j'=-0.2$ ở cả hai đơn vị. Hai nhánh tiếp tục biểu diễn cùng một hàm.

**Mệnh đề về đối xứng.** Hai đơn vị có tham số vào/ra và hàm kích hoạt giống nhau, trạng thái cập nhật giống nhau, nhận cùng dữ liệu và dùng cùng quy tắc đối xứng thì tiếp tục nhận các cập nhật giống nhau, tại những điểm gradient được xác định. Quy tắc xử lý điểm không khả vi cũng phải giống nhau nếu trường hợp đó xuất hiện.

::: proof
Tham số vào và độ lệch bằng nhau tạo tiền kích hoạt và kích hoạt bằng nhau trên từng mẫu. Trọng số ra bằng nhau làm các đạo hàm theo tham số tương ứng bằng nhau qua công thức dây chuyền. Áp dụng cùng quy tắc với trạng thái bằng nhau cho tham số và trạng thái mới bằng nhau. Quy nạp theo bước bảo toàn tính đồng nhất. Lập luận giả sử không có nhiễu riêng làm phân biệt hai đơn vị.
:::

Đổi nhóm dữ liệu chung chưa phá điều kiện đối xứng. Cùng trọng số vào nhưng khác trọng số ra cũng chưa thỏa toàn bộ giả thiết của mệnh đề.

Trong cấu hình $w_1=0.8,w_2=1.2$, $a_1=a_2=1$, $b_j=0$, $x=1,y=0$, đầu ra vẫn bằng 2. Gradient theo $a_1,a_2$ lần lượt bằng $1.6,2.4$, nên hai cập nhật khác nhau. Hai trọng số này được chọn có chủ ý cho ví dụ. Trong thực hành, lấy trọng số độc lập từ một phân phối liên tục là cách tạo khác biệt; độ lệch có thể bằng 0 khi trọng số đã phá đối xứng. Khác biệt giữa đơn vị chưa xác định độ lớn trọng số phù hợp.

### Độ nhạy qua nhiều lớp và bão hòa

Để phân tích độ lớn, chuyển sang chuỗi tuyến tính vô hướng

$$
h^{(l)}=c_lh^{(l-1)},\qquad l=1,\ldots,L,
$$

với $L$ là số lớp, $c_l\in\mathbb R$ là hệ số, $h^{(0)}$ là đầu vào. Dây chuyền cho $\partial h^{(L)}/\partial h^{(0)}=\prod_{l=1}^Lc_l$. Với $L=4$, mọi $c_l=1/2$ cho độ nhạy $1/16$, còn mọi $c_l=2$ cho 16. Khi $h^{(0)}=1$, hai đầu ra cũng nhận các giá trị tương ứng.

Đây là độ nhạy đầu ra theo đầu vào, chưa phải toàn bộ gradient mất mát theo mọi tham số. Phép nhân nhiều đạo hàm có thể làm độ nhạy co hoặc phóng đại; gradient lớn và vách dốc là những khó khăn có thể xuất hiện khi các tích này tăng mạnh.

Với hàm kích hoạt khác $\phi(z)=\tanh z$,

$$
\phi'(z)=1-\tanh^2z,\qquad \phi'(0)=1,\qquad \phi'(3)\approx0.00987.
$$

![Hàm tanh và đạo hàm: đạo hàm gần 1 ở gốc và gần 0 khi trị tuyệt đối của tiền kích hoạt lớn.](img/lec-05/tanh-saturation.svg)

Trọng số lớn có thể đưa tiền kích hoạt vào vùng bão hòa, nơi thừa số $\phi'(z)$ rất nhỏ. Gần gốc, $\tanh z\approx z$ và đạo hàm gần 1. Mô hình tuyến tính vì thế cung cấp một phép ước lượng thang khởi tạo; kết quả cần được kiểm lại khi có phi tuyến.

### Phương sai qua lớp tuyến tính

Xét mô hình phân tích $z=Wh$, với $h\in\mathbb R^{n_{\rm in}}$, $z\in\mathbb R^{n_{\rm out}}$ và $W\in\mathbb R^{n_{\rm out}\times n_{\rm in}}$. Hai kích thước là số nguyên dương. Từ đây, $q>0$ chỉ phương sai đầu vào, khác hàm mục tiêu $q(\theta)$ của phần C.

**Giả thiết.** Các trọng số $W_{ji}$ độc lập, trung bình 0, cùng phương sai $s^2$, độc lập với toàn bộ $h$. Mỗi $h_i$ có trung bình 0 và phương sai $q$.

**Mệnh đề.** $\operatorname{Var}(z_j)=n_{\rm in}s^2q$.

::: proof
Từ $z_j=\sum_iW_{ji}h_i$ và tính độc lập, $\mathbb E z_j=0$. Mỗi hạng bình phương có kỳ vọng $\mathbb E W_{ji}^2\mathbb E h_i^2=s^2q$. Với $i\ne k$,

$$
\mathbb E[W_{ji}W_{jk}h_ih_k]
=\mathbb E[W_{ji}W_{jk}]\mathbb E[h_ih_k]=0.
$$

Do đó $\mathbb E z_j^2=\sum_i s^2q=n_{\rm in}s^2q$. Tính độc lập giữa các thành phần của $h$ không cần thiết để triệt các hạng chéo; tính độc lập và trung bình 0 của trọng số đã đảm nhiệm bước đó.
:::

Với bốn đầu vào, $s^2=1$ nhân phương sai tín hiệu với 4, còn $s^2=1/4$ giữ phương sai theo mô hình. Kết luận là phương sai trên phân phối ngẫu nhiên, không nói từng ma trận được lấy mẫu giữ chính xác chuẩn của mọi vectơ.

### Phương sai của gradient truyền ngược

Với mất mát vô hướng khả vi $\ell$ phụ thuộc $h$ thông qua $z=Wh$, giữ $W$ cố định khi lấy đạo hàm theo $h$ và đặt các gradient cột $\delta_z=\nabla_z\ell\in\mathbb R^{n_{\rm out}}$ và $\delta_h=\nabla_h\ell\in\mathbb R^{n_{\rm in}}$. Dây chuyền theo từng thành phần cho

$$
\delta_{h,i}=\sum_{j=1}^{n_{\rm out}}W_{ji}\delta_{z,j},\qquad
\delta_h=W^T\delta_z.
$$

Giữ giả thiết về $W$; bổ sung giả thiết mô hình rằng $\delta_z$ độc lập với toàn bộ $W$, có các thành phần trung bình 0 và phương sai chung $r>0$. Phép khai triển phương sai tương tự chiều tiến cho

$$
\operatorname{Var}(\delta_{h,i})=n_{\rm out}s^2r.
$$

Giả thiết độc lập của gradient đầu ra với trọng số là đơn giản hóa phân tích. Gradient và trọng số trong mạng thực tế thường phụ thuộc nhau.

Với $q,r>0$, bảo toàn phương sai tiến cần $s^2=1/n_{\rm in}$; bảo toàn chiều lùi cần $s^2=1/n_{\rm out}$. Ở lớp $4\to2$, lựa chọn $s^2=1/4$ cho hệ số tiến/lùi là $1,1/2$; lựa chọn $s^2=1/2$ cho $2,1$. Khi hai độ rộng khác nhau, hai yêu cầu không đồng thời thỏa mãn.

### Khởi tạo Glorot và thang qua nhiều lớp

Khởi tạo Glorot lấy nghịch đảo số kết nối trung bình để dung hòa hai chiều:

$$
s^2=\frac2{n_{\rm in}+n_{\rm out}}.
$$

Một cách thực hiện là lấy các trọng số độc lập theo phân phối đều $U[-a,a]$. Vì phân phối này có trung bình 0 và phương sai $a^2/3$, biên là

$$
a=\sqrt{\frac6{n_{\rm in}+n_{\rm out}}}.
$$

Với lớp $4\to2$, phương sai bằng $1/3$, biên $a=1$; hệ số phương sai tiến bằng $4/3$ và lùi bằng $2/3$. Quy tắc là thỏa hiệp của mô hình, không bảo toàn chính xác đồng thời hai phía và không bảo đảm tối ưu. Đặc biệt, phép ReLU thay đổi phân phối và mômen tín hiệu; không được chuyển nguyên các đẳng thức tuyến tính thành bảo toàn chính xác cho ReLU.

Xét ba lớp tuyến tính đều rộng 4, đầu vào có thành phần trung bình 0 và phương sai 1. Các ma trận độc lập giữa các lớp, độc lập với đầu vào; trọng số trong mỗi ma trận độc lập, trung bình 0, cùng phương sai $s^2$. Ma trận của lớp sau độc lập với đầu ra lớp trước, nên công thức tiến áp dụng liên tiếp:

$$
q_l=4s^2q_{l-1},\qquad q_0=1.
$$

| $s^2$ | Đầu vào | Lớp 1 | Lớp 2 | Lớp 3 |
|---|---:|---:|---:|---:|
| $1/16$ | 1 | $1/4$ | $1/16$ | $1/64$ |
| $1/4$ | 1 | 1 | 1 | 1 |

Bảng là phép tính phương sai trong mô hình, không chứa số đo thực nghiệm. Đánh giá một mạng cụ thể còn cần đo kích hoạt, gradient và các giá trị không hữu hạn trên dữ liệu thực tế; phương sai thích hợp lúc khởi tạo chưa chứng nhận chất lượng sau huấn luyện.

**Câu hỏi:** Lớp tuyến tính có 8 đầu vào, 4 đầu ra nhận phương sai, biên phân phối đều và hai hệ số truyền phương sai nào theo Glorot? Hai hệ số có đồng thời bằng 1 không?

## E. Phối hợp các thành phần của quy trình huấn luyện

Thứ tự thực thi bắt đầu từ dữ liệu và mất mát, tiếp đến khởi tạo, rồi lặp lấy nhóm, tính gradient và cập nhật. Đánh giá xác thực diễn ra theo lịch định trước. Trong cấu hình này, bốn nhóm quyết định có tác dụng riêng:

| Quyết định | Đại lượng xác định | Căn cứ đánh giá |
|---|---|---|
| Nguồn gradient | $D,b,\widehat g_t$ | Số phép đánh giá mẫu, phương sai, bộ nhớ |
| Quy tắc cập nhật | $\theta_t,v_t$, điểm gradient | Trạng thái, bước học, phép tính tại đúng vị trí |
| Khởi tạo | $\theta_0$ | Đối xứng và thang tín hiệu, gradient |
| Lựa chọn kết quả | Tiêu chí xác thực, ngân sách, bộ đếm | Giá trị tốt nhất đã thấy và điều kiện dừng |

Gradient nhóm nhỏ có thể giảm công việc mỗi bước. Momentum thay cách dùng lịch sử; Nesterov thêm thay đổi vị trí gradient. Khởi tạo trọng số khác nhau xử lý sự đồng nhất của đơn vị, còn thang trọng số liên quan tín hiệu và gradient qua lớp. Tiêu chí xác thực quyết định lựa chọn mô hình sau các cập nhật.

::: example
Một mô hình có $N=10^5$ mẫu và một gradient đầy đủ vượt ngân sách. Hai đơn vị ẩn có tham số vào/ra giống nhau, trạng thái momentum bằng 0. Hai thời điểm sau huấn luyện cho mất mát huấn luyện $0.22,0.17$ và lỗi xác thực $0.10,0.14$; đây là số liệu giả lập sư phạm.

Gradient nhóm lấy đều là một lựa chọn giảm số đánh giá mẫu mỗi bước; dữ kiện chưa xác định một cỡ nhóm tối ưu. Trọng số ban đầu khác nhau có thể phá điều kiện đối xứng, trong khi thang cần được kiểm riêng. Theo lỗi xác thực, thời điểm đầu được lưu vì $0.10<0.14$.

Trong tiểu bài toán độc lập ở $\mathbb R^2$, trạng thái $\theta=(1,1)^T$, $v=(-0.2,0.2)^T$, $\beta=0.5$ cho điểm gradient Nesterov $(0.9,1.1)^T$. Vectơ hai chiều này không phải toàn bộ tham số của mạng vừa mô tả.
:::

Các phép tính trong bài cho phép kiểm một thiết lập huấn luyện mà không đồng nhất các loại kết luận: không chệch của gradient, thay đổi mất mát từng bước, thang khởi tạo và chất lượng xác thực là các thuộc tính khác nhau. Phạm vi Bài 06 tiếp tục với các thuật toán và chiến lược trong §§8.5–8.7 của *Deep Learning*.

## Tài liệu tham khảo

1. Ian Goodfellow, Yoshua Bengio và Aaron Courville (2016), *Deep Learning*, MIT Press, [Chương 8](https://www.deeplearningbook.org/contents/optimization.html), §§8.1–8.4; đặc biệt thuật toán 8.1–8.3, công thức (8.15)–(8.23). Kiến thức nền: §§4.3,5.2–5.3,5.9–5.10,6.1–6.3,6.5. Phân trang PDF được dùng trong kế hoạch là trang in 275–306 cho §§8.1–8.4.
2. Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press, §§9.1–9.3. Dùng cho mô hình cục bộ, gradient, độ cong và phép đối chứng trên hàm bậc hai.
3. Geoffrey Hinton, Nitish Srivastava và Kevin Swersky (2012), *Neural Networks for Machine Learning*, [Lecture 6](https://www.cs.toronto.edu/~tijmen/csc321/slides/lecture_slides_lec6.pdf), đặc biệt tr.17–21. Tham chiếu hình học momentum và vị trí gradient Nesterov.

Các ví dụ số, bảng và hình SVG trong ghi chú được xây dựng từ các công thức đã nêu. Chúng minh họa phép tính toán học, không được trình bày như kết quả thực nghiệm.
