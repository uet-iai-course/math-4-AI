# Bài 06 — Các phương pháp tối ưu trong học sâu

## Mục tiêu học tập

Các mục tiêu sau là minh chứng bộ phận của ba chuẩn đầu ra bài học (LLO) của buổi 6:

- LLO14 đóng góp chuẩn đầu ra học phần CLO2 và CLO3: tính và phân biệt các bước cập nhật AdaGrad, RMSProp, Adam (tên gọi được giải thích ở Mục 2);
- LLO15 đóng góp CLO2 và CLO3: vận dụng phương pháp Newton, gradient liên hợp (conjugate gradient, CG) và BFGS (tên gọi được giải thích ở Mục 4) cùng điều kiện sử dụng của chúng;
- LLO16 đóng góp CLO3 và CLO4: vận dụng các chiến lược tổ chức huấn luyện, xác định thành phần bị thay và giới hạn của từng chiến lược.

Sau chương này, người học có thể:

1. Viết một bước cập nhật thành nghiệm của bài toán con có ma trận phạt, chứng minh ma trận phạt xác định dương cho nghiệm duy nhất và hướng giảm, và nhận ra khi bài toán con không có cực tiểu (LLO14; CLO2).
2. Tính trạng thái và bước của AdaGrad, RMSProp, Adam; chứng minh tính chất của trung bình mũ và của hiệu chỉnh moment; chỉ ra giới hạn của ma trận phạt đường chéo (LLO14; CLO2, CLO3).
3. Lập hệ Newton, kiểm tính xác định dương của Hessian bằng giá trị riêng và chọn hệ số giảm chấn đủ để có hướng giảm (LLO15; CLO2, CLO3).
4. Chạy gradient liên hợp trên một hệ đối xứng xác định dương, chứng minh các tính chất trực giao và liên hợp của nó, và dùng nó trong phương pháp Newton–CG với hai phép kiểm riêng cho phần dư và cho dấu của hướng (LLO15; CLO2, CLO3).
5. Tính một cập nhật BFGS, chứng minh nó thỏa phương trình cát tuyến và giữ tính xác định dương khi điều kiện độ cong đúng, và ước lượng bộ nhớ của BFGS với bộ nhớ giới hạn (LLO15; CLO2, CLO3).
6. Tính đầu ra của chuẩn hóa theo lô, một lượt hạ theo khối, trung bình Polyak và hệ số truyền ngược qua khối nối tắt; nêu giả thiết của từng bảo đảm (LLO16; CLO3, CLO4).
7. Tính bước tinh chỉnh sau tiền huấn luyện, phân loại điểm dừng của một họ mục tiêu tiếp diễn và nghiệm theo lịch của học theo chương trình; kiểm điều kiện kết thúc trên mục tiêu đích (LLO16; CLO3, CLO4).
8. Chọn phương pháp cho một bài toán huấn luyện cụ thể từ dữ kiện sẵn có, nêu giả thiết cần kiểm và điều chưa thể bảo đảm (LLO14–LLO16; CLO2–CLO4).

## Kiến thức tiên quyết

Số hiệu `04.k` và `05.k` chỉ ghi chú Bài 04 và Bài 05. Ghi chú bổ trợ Bài 05b dùng nhãn riêng như "Bổ đề BĐ5", được giữ nguyên khi dẫn.

- **Đại số tuyến tính.** Ma trận đối xứng $A\in\mathbb R^{p\times p}$ có phân tích phổ $A=U\Lambda U^T$ với $U$ trực giao và $\Lambda$ chéo chứa các giá trị riêng thực. Ma trận đối xứng $A$ gọi là xác định dương, viết $A\succ0$, nếu $z^TAz>0$ với mọi $z\ne0$; điều này tương đương mọi giá trị riêng dương, và khi đó $A^{-1}\succ0$. Với ma trận $2\times2$ đối xứng, $A\succ0$ khi và chỉ khi $A_{11}>0$ và $\det A>0$ (tiêu chuẩn Sylvester). Ma trận đơn vị viết $\mathrm I$.
- **Đạo hàm theo hướng** (Mệnh đề 04.7). Nếu $F$ khả vi tại $\theta$ với $g=\nabla F(\theta)$ và $g^Td<0$ thì có $\bar\alpha>0$ để $F(\theta+\alpha d)<F(\theta)$ với mọi $\alpha\in(0,\bar\alpha]$; vectơ $d$ như vậy gọi là hướng giảm. Mệnh đề không cho biết $\bar\alpha$ lớn bao nhiêu.
- **Mô hình bậc hai và tìm bước** (Định nghĩa 04.8, Mệnh đề 04.9, Định nghĩa 04.10, Mệnh đề 04.11). Với ma trận đối xứng $M\succ0$, hàm $d\mapsto g^Td+\tfrac12d^TMd$ có nghiệm duy nhất là nghiệm của $Md=-g$, và đó là hướng giảm khi $g\ne0$. Quay lui Armijo bắt đầu từ $\alpha=1$ và nhân $\alpha$ với một hệ số trong $(0,1)$ cho tới khi $F(\theta+\alpha d)\le F(\theta)+c_1\alpha\,g^Td$, với $c_1\in(0,1)$; Định nghĩa 04.10 lấy $c_1\in(0,\tfrac12)$, còn Mệnh đề 04.11 chỉ cần $c_1\in(0,1)$ để thủ tục kết thúc sau hữu hạn lần co khi $g^Td<0$.
- **Số điều kiện và đổi biến** (Nhận xét 04.13, Nhận xét 04.16). Trên hàm bậc hai lồi chặt (còn gọi là lồi nghiêm ngặt), số điều kiện $\kappa=\lambda_{\max}/\lambda_{\min}$ của Hessian đo độ chậm của giảm gradient. Hướng $-M^{-1}g$ là giảm gradient trong hệ tọa độ đổi biến $\theta=M^{-1/2}\varphi$; phép đổi biến này gọi là tiền điều kiện.
- **Phương pháp Newton** (Định nghĩa 04.28, Mệnh đề 04.29, Thuật toán 04.2, Định lý 04.34, Nhận xét 04.36). Với $H=\nabla^2F(\theta)\succ0$, hướng Newton là nghiệm của hệ $Hd=-g$ và là hướng giảm khi $g\ne0$. Bước đầy đủ hội tụ bậc hai khi điểm đầu đủ gần một cực tiểu có Hessian xác định dương và Hessian Lipschitz. Khi $H$ có giá trị riêng âm, hướng Newton có thể là hướng tăng (Tình huống 04.3, mạng tuyến tính hai lớp).
- **Gradient nhóm và hạ gradient ngẫu nhiên (stochastic gradient descent, SGD)** (Định nghĩa 05.1, Định nghĩa 05.10, Định lý 05.11, Thuật toán 05.1). Mất mát huấn luyện là trung bình $J(\theta)=\tfrac1N\sum_i\ell_i(\theta)$; gradient nhóm trên các chỉ số rút đều, độc lập là ước lượng không chệch của $\nabla J(\theta)$, có hiệp phương sai giảm theo cỡ nhóm.
- **Bước gradient trên hàm bậc hai** (Mệnh đề 05.17). Với Hessian hằng có giá trị riêng $\lambda_j>0$, bước cố định $\eta$ nhân thành phần theo vectơ riêng thứ $j$ với $1-\eta\lambda_j$; dãy hội tụ với mọi điểm đầu khi và chỉ khi $0<\eta<2/\lambda_{\max}$.
- **Momentum** (Thuật toán 05.2, Mệnh đề 05.18, Định lý 05.23). Vận tốc là tổng các gradient cũ với trọng số giảm theo cấp số nhân; Nesterov trên hàm bậc hai co theo hệ số $1-1/\sqrt\kappa$.
- **Nhiễu gần nghiệm và độ nhạy qua chuỗi** (Ví dụ 05.14, Mệnh đề 05.31, Mệnh đề 05.32). Với bước học cố định, SGD dao động quanh nghiệm ở một mức không giảm theo số vòng. Trọng số ngẫu nhiên theo phân phối liên tục khác nhau với xác suất $1$. Độ nhạy của đầu ra một chuỗi lớp theo đầu vào là tích các đạo hàm của từng lớp.
- **Bất đẳng thức Jensen hữu hạn** (Bài 05b, Bổ đề BĐ5). Với $F$ lồi và trọng số không âm có tổng bằng $1$, $F\bigl(\sum_k\upsilon_kz_k\bigr)\le\sum_k\upsilon_kF(z_k)$ với mọi điểm $z_k$ và trọng số $\upsilon_k$.

## Bảng ký hiệu

Bảng chỉ gồm ký hiệu dùng xuyên suốt chương; ký hiệu của một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ. Mỗi chữ trong bảng giữ một nghĩa trong cả chương.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $N$, $\ell_i$, $F$ | số quan sát huấn luyện; mất mát trên quan sát $i$; mục tiêu huấn luyện $F=\tfrac1N\sum_i\ell_i$ | $N\ge1$; $\mathbb R^p\to\mathbb R_{\ge0}$; $\mathbb R^p\to\mathbb R$ |
| $p$, $\theta$, $[\theta]_j$ | số tham số; vectơ tham số; tọa độ thứ $j$ của nó | $p\ge1$; $\mathbb R^p$; $\mathbb R$ |
| $\theta_t$, $\theta^*$, $t$, $T$ | tham số sau vòng $t$; một điểm cực tiểu; chỉ số vòng; số vòng tối đa | $\mathbb R^p$; $t\ge1$, $T\ge1$ |
| $\mathcal B_t$, $\lvert\mathcal B_t\rvert$ | nhóm chỉ số dùng ở vòng $t$ (còn gọi là lô); cỡ nhóm | tập con của $\{1,\ldots,N\}$ |
| $g_t$, $g$ | gradient nhóm tại $\theta_{t-1}$; gradient $\nabla F(\theta)$ tại điểm đang xét | $\mathbb R^p$ |
| $H$, $\lambda_j$, $\lambda_{\min}$, $\lambda_{\max}$, $\kappa$ | Hessian tại điểm đang xét; giá trị riêng của một ma trận đối xứng; nhỏ nhất, lớn nhất; số điều kiện | ma trận đối xứng; số thực |
| $d$, $d_t$, $\eta$, $\eta_t$, $\alpha$ | bước hoặc hướng; bước ở vòng $t$; bước học (learning rate); bước học ở vòng $t$; độ dài bước dọc một hướng | $\mathbb R^p$; số dương |
| $M$, $M_t$, $\psi$ | ma trận phạt; ma trận phạt ở vòng $t$; mục tiêu của bài toán con có phạt | ma trận đối xứng $p\times p$; $\mathbb R^p\to\mathbb R$ |
| $\odot$, $\operatorname{diag}(\cdot)$ | tích theo tọa độ (căn và thương của hai vectơ cũng hiểu theo tọa độ); ma trận chéo có đường chéo là vectơ đã cho | phép toán trên $\mathbb R^p$ |
| $v_t$, $m_t$, $\widehat v_t$, $\widehat m_t$ | thống kê bình phương gradient; moment bậc nhất; hai đại lượng sau hiệu chỉnh | $\mathbb R^p$ |
| $\rho$, $\beta_1$, $\beta_2$, $\varepsilon$ | hệ số nhớ của RMSProp; hai hệ số nhớ của Adam; hằng số dương cộng vào mẫu số | $(0,1)$; $\varepsilon>0$ |
| $Q$ | ma trận ví dụ $\begin{bmatrix}2&1\\1&2\end{bmatrix}$ | $\mathbb R^{2\times2}$, $Q\succ0$ |
| $\tau$, $A$ | hệ số giảm chấn; ma trận đối xứng, từ Mục 3 là ma trận của hệ cần giải, thường $A=H+\tau\mathrm I$ | $\tau\ge0$; đối xứng |
| $b$, $\phi$, $d_k$, $r_k$, $q_k$ | vế phải của hệ $Ad=b$; hàm $\tfrac12d^TAd-b^Td$; nghiệm gần đúng, phần dư, hướng tìm ở vòng trong $k$ của gradient liên hợp | $\mathbb R^p$; $\mathbb R^p\to\mathbb R$ |
| $\alpha_k$, $\omega_k$, $K$, $\varepsilon_{\rm r}$ | độ dài bước và hệ số hướng của gradient liên hợp; số vòng trong tối đa; ngưỡng phần dư | số thực; $K\ge1$; $\varepsilon_{\rm r}>0$ |
| $s$, $y$, $P$, $B$, $n_{\rm m}$ | bước $\theta^+-\theta$; sai phân gradient; xấp xỉ nghịch đảo Hessian; xấp xỉ Hessian; số cặp lưu của L-BFGS | $\mathbb R^p$; ma trận $p\times p$; $n_{\rm m}\ge1$ |
| $\mathcal B$, $a_i$, $\widehat a_i$, $z_i$ | một nhóm khi chuẩn hóa; giá trị của một đặc trưng tại quan sát $i$; giá trị chuẩn hóa; đầu ra (chữ $z$ không chỉ số là một vectơ tùy ý trong các phát biểu về dạng toàn phương) | $i\in\mathcal B$; số thực |
| $\mu_{\mathcal B}$, $\sigma_{\mathcal B}^2$, $\gamma$, $\beta$ | trung bình và phương sai của nhóm; hệ số co giãn và độ dịch của chuẩn hóa theo lô | $\mathbb R$; $\sigma_{\mathcal B}^2\ge0$; $\gamma,\beta\in\mathbb R$ |
| $\bar\theta_T$ | trung bình Polyak của $\theta_1,\ldots,\theta_T$ | $\mathbb R^p$ |
| $h$, $h_l$, $L$ | đầu vào của một lớp; biểu diễn sau lớp $l$ của một chuỗi; số lớp của chuỗi | $\mathbb R^{n_{\rm in}}$; $\mathbb R^{n_{\rm in}}$, vô hướng trong Mục 5.4; $L\ge1$ |
| $\mathcal T$, $\xi$, $F_c$, $c^{(n)}$, $\pi$, $\mathcal D$ | phép chuyển tham số; khởi tạo phần mới; họ mục tiêu tiếp diễn với tham số $c$; tham số ở giai đoạn $n$; xác suất lấy quan sát khó; phân phối lấy mẫu | ánh xạ; vectơ; $c\ge0$; $\pi\in[0,1]$; phân phối trên $\{1,\ldots,N\}$ |

Trong cả chương, $\log$ là logarit tự nhiên và $\lVert\cdot\rVert$ là chuẩn Euclid. Chữ $v$ chỉ dùng cho thống kê bình phương gradient; vận tốc của Thuật toán 05.2 không được gọi bằng ký hiệu riêng. Chữ $\beta$ không chỉ số chỉ dùng cho độ dịch của chuẩn hóa theo lô, còn $\beta_1$, $\beta_2$ là hai hệ số của Adam. Mọi bộ số của các ví dụ là số liệu sư phạm tự xây dựng, không phải kết quả đo trên dữ liệu thật.

Quy ước chỉ số vòng của chương khác Bài 05 một đơn vị. Thuật toán 05.1 tính gradient tại $\theta_t$ để tạo $\theta_{t+1}$; chương này, theo cách viết của Kingma và Ba (2015), bắt đầu vòng từ $t=1$, tính $g_t$ tại $\theta_{t-1}$ và tạo $\theta_t$. Cách đánh số này làm cho các lũy thừa $\beta_1^t$, $\beta_2^t$ trong Adam đúng với số gradient đã dùng.

## 1. Bài toán và mô hình bước cập nhật

Bài 05 kết thúc với một giới hạn của mọi phương pháp dùng một bước học chung. Theo Mệnh đề 05.17, trên hàm bậc hai có Hessian xác định dương, giảm gradient với bước $\eta$ hội tụ khi và chỉ khi $0<\eta<2/\lambda_{\max}$, và theo hướng có độ cong nhỏ nhất, sai số co theo hệ số $1-\eta\lambda_{\min}$. Với hàm $F(\theta)=\tfrac12\bigl([\theta]_1^2+9[\theta]_2^2\bigr)$, điều kiện ổn định là $\eta<\tfrac29$, và khi đó tọa độ thứ nhất co theo hệ số lớn hơn $\tfrac79$ ở mỗi bước; bước $\eta=1$ đưa tọa độ thứ nhất về đúng nghiệm trong một bước nhưng làm $F$ tăng từ $5$ lên $288$. Momentum và Nesterov của Bài 05 làm giảm số bước nhưng vẫn dùng một hệ số chung cho mọi tọa độ.

Bài 04 để lại một giới hạn khác cho phương pháp Newton, phương pháp dùng đúng độ cong: theo Nhận xét 04.36 và Tình huống 04.3, khi Hessian có giá trị riêng âm, hướng Newton có thể là hướng tăng. Mục này tách quá trình huấn luyện thành bốn thành phần và thay bước học vô hướng bằng một ma trận phạt; Mục 2–4 chọn ma trận đó từ thống kê gradient, từ Hessian và từ sai phân gradient, Mục 5–6 thay các thành phần còn lại.

### 1.1 Quá trình huấn luyện và các thành phần

Một phương pháp tối ưu trong học sâu không chỉ là một công thức cập nhật. Trước khi so sánh các phương pháp, cần biết mỗi phương pháp thay đổi phần nào của quá trình huấn luyện, vì một số phương pháp ở Mục 5–6 không thay công thức cập nhật mà thay mô hình, điểm đầu hoặc tham số được trả về. Định nghĩa sau tách quá trình huấn luyện thành các thành phần như vậy.

::: definition Định nghĩa 06.1 (Bài toán huấn luyện và quá trình huấn luyện)
**Bài toán huấn luyện.** Cho $N\ge1$ quan sát và một mô hình có tham số $\theta\in\mathbb R^p$. Với mỗi quan sát $i$, mất mát $\ell_i:\mathbb R^p\to\mathbb R_{\ge0}$ khả vi đo sai lệch của mô hình trên quan sát đó. Mục tiêu huấn luyện là

$$
F(\theta)=\frac1N\sum_{i=1}^N\ell_i(\theta),
\tag{1.1}
$$

đúng là mất mát huấn luyện $J$ của Định nghĩa 05.1.

**Quá trình huấn luyện.** Một quá trình huấn luyện cho $F$ gồm bốn thành phần:

1. *Phép tính mô hình và dữ liệu*, xác định các hàm $\ell_i$ và do đó xác định $F$.
2. *Mục tiêu và điểm đầu*: hàm được cực tiểu ở từng giai đoạn và tham số ban đầu $\theta_0$.
3. *Quy tắc cập nhật*: ở vòng $t\ge1$, chọn nhóm chỉ số $\mathcal B_t\subseteq\{1,\ldots,N\}$, tính gradient nhóm

$$
g_t=\frac1{\lvert\mathcal B_t\rvert}\sum_{i\in\mathcal B_t}\nabla\ell_i(\theta_{t-1}),
\tag{1.2}
$$

rồi tạo $\theta_t=\theta_{t-1}+d_t$, trong đó bước $d_t$ có thể phụ thuộc mọi gradient đã tính.
4. *Quy tắc trả về*: chọn tham số đầu ra từ quỹ đạo $\theta_0,\theta_1,\ldots,\theta_T$.

Ngân sách $T$ và tiêu chí dừng được định trước, như trong Thuật toán 05.1.
:::

Thành phần 1 xác định bài toán, thành phần 3 xác định cách đi trên bài toán đó. Khi $\mathcal B_t=\{1,\ldots,N\}$, gradient nhóm là gradient đầy đủ $\nabla F(\theta_{t-1})$; khi các chỉ số được rút đều và độc lập, Định lý 05.11 cho $g_t$ là ước lượng không chệch của $\nabla F(\theta_{t-1})$. Quy tắc trả về thường là điểm cuối $\theta_T$, hoặc điểm có mất mát xác thực (validation loss) nhỏ nhất như trong Thuật toán 05.1.

Giảm gradient, SGD, momentum và Nesterov của Bài 04 và Bài 05 đều chỉ đổi thành phần 3. Bảng sau ghi phương pháp nào của chương thay thành phần nào.

| Thành phần | Phương pháp trong chương | Mục |
|---|---|---|
| Quy tắc cập nhật | AdaGrad, RMSProp, Adam; Newton, Newton–CG; BFGS, L-BFGS; hạ theo khối | 2, 3, 4, 5.2 |
| Phép tính mô hình | chuẩn hóa theo lô; nối tắt | 5.1, 5.4 |
| Quy tắc trả về | trung bình Polyak | 5.3 |
| Mục tiêu và điểm đầu | tiền huấn luyện; tiếp diễn; học theo chương trình | 6 |

Nhầm lẫn thường gặp là đọc một gradient nhóm nhỏ như bằng chứng $\theta_{t-1}$ gần điểm dừng của $F$. Đại lượng $g_t$ chỉ là gradient của mất mát trung bình trên nhóm $\mathcal B_t$; nó có thể bằng $0$ trong khi $\nabla F(\theta_{t-1})\ne0$. Với ba quan sát $-1$, $1$, $3$ và mô hình hằng của Ví dụ 05.1, mất mát trên quan sát có giá trị $3$ là $\tfrac12(\theta-3)^2$; tại $\theta=3$, nhóm chỉ gồm quan sát đó cho gradient nhóm $\theta-3=0$, trong khi gradient đầy đủ là $\theta-1=2$.

### 1.2 Nhu cầu: thang đo khác nhau giữa các tọa độ

Bài toán đặt ở đầu mục được tính đầy đủ dưới đây. Hai tọa độ của tham số có độ cong khác nhau chín lần, và câu hỏi là một bước học chung có cân bằng được chúng hay không.

::: example Ví dụ 06.1 (Hai độ cong $1$ và $9$)
**Dữ kiện.**

Hàm $F(\theta)=\tfrac12\bigl([\theta]_1^2+9[\theta]_2^2\bigr)$ trên $\mathbb R^2$, điểm đầu $\theta_0=(1,1)^T$. Gradient là $\nabla F(\theta)=([\theta]_1,\,9[\theta]_2)^T$ và Hessian là hằng $\operatorname{diag}(1,9)$. Tại $\theta_0$, $g=(1,9)^T$ và $F(\theta_0)=\tfrac12(1+9)=5$.

**Bước với $\eta=0{,}2$.**

$\theta_1=\theta_0-0{,}2\,g=(0{,}8;\,-0{,}8)^T$, và $F(\theta_1)=\tfrac12(0{,}64+9\cdot0{,}64)=3{,}2$. Tọa độ thứ hai đổi dấu vì hệ số $1-9\cdot0{,}2=-0{,}8$ âm, nhưng trị tuyệt đối của nó vẫn giảm.

**Bước với $\eta=1$.**

$\theta_1=(0,-8)^T$. Tọa độ thứ nhất về đúng nghiệm, còn $F(\theta_1)=\tfrac12\cdot9\cdot64=288$, lớn hơn giá trị ban đầu.

**Hai bước học riêng.**

Với bước học $1$ cho tọa độ thứ nhất và $\tfrac19$ cho tọa độ thứ hai, điểm mới là $\bigl(1-1\cdot1,\;1-\tfrac19\cdot9\bigr)^T=(0,0)^T$, nghiệm của bài toán, sau một bước.

**Kiểm tra lại.**

Theo Mệnh đề 05.17(b), tọa độ $j$ nhân với $1-\eta\lambda_j$. Với $\eta=0{,}2$: $1-0{,}2=0{,}8$ và $1-1{,}8=-0{,}8$, khớp $(0{,}8;\,-0{,}8)$. Với $\eta=1$: $0$ và $-8$, khớp $(0,-8)$.
:::

![Hai ô đồ thị đường đồng mức của F bằng một nửa của θ₁ bình phương cộng 9 θ₂ bình phương, các elip kéo dài theo trục θ₁. Ô trái ghi "Gần điểm đầu", trục θ₁ từ −3 đến 3 và θ₂ từ −1 đến 1, đánh dấu điểm đầu (1; 1) và điểm (0,8; −0,8) sau bước học 0,2. Ô phải ghi "Toàn cảnh", trục θ₂ tới −8, đánh dấu điểm (0; −8) sau bước học 1. Chú thích "Mỗi ô có thang trục riêng".](img/lec-06/scale-step.svg)

Hình có hai ô với thang trục khác nhau, nên độ dài mũi tên chỉ so được trong cùng một ô. Ô trái cho thấy các elip đồng mức hẹp theo trục thứ hai: dịch một đoạn ngắn theo trục đó đã đi qua nhiều đường mức. Ô phải cho thấy bước học $1$ đẩy tọa độ thứ hai ra xa gấp tám lần khoảng cách ban đầu. Trên hình, $\theta_1$ và $\theta_2$ là hai trục tọa độ, tức $[\theta]_1$ và $[\theta]_2$ của chương; chỉ số dưới trên hình không phải chỉ số vòng.

Ví dụ cho một quy luật tổng quát. Theo Mệnh đề 05.17, tọa độ thứ $j$ co khi $\lvert1-\eta\lambda_j\rvert<1$, tức $0<\eta<2/\lambda_j$; điều kiện chung cho mọi tọa độ là $\eta<2/\lambda_{\max}=\tfrac29$, và trong khoảng đó tọa độ ít cong có hệ số $1-\eta\lambda_{\min}>\tfrac79$. Hai tọa độ cần hai bước học khác nhau. Trực giác, chưa phải phát biểu hình thức: thay hệ số $\eta$ bằng một ma trận cho phép chọn bước học khác nhau theo từng hướng.

### 1.3 Bước cập nhật với ma trận phạt

Để thay $\eta$ bằng một ma trận theo cách có nguyên tắc, cần viết bước giảm gradient thành nghiệm của một bài toán con. Với gradient $g$ và bước học $\eta>0$, bước $d=-\eta g$ là điểm cực tiểu của hàm

$$
d\mapsto g^Td+\frac1{2\eta}\lVert d\rVert^2,
$$

vì gradient theo $d$ của hàm này là $g+d/\eta$, bằng $0$ đúng tại $d=-\eta g$. Số hạng tuyến tính $g^Td$ là ước lượng bậc nhất của thay đổi mục tiêu khi đi bước $d$; số hạng $\lVert d\rVert^2/(2\eta)$ phạt bước dài, vì ước lượng bậc nhất chỉ đúng gần điểm hiện tại. Mức phạt như nhau theo mọi hướng, nên mọi tọa độ chịu cùng một hệ số $\eta$.

Trực giác, chưa phải phát biểu hình thức: thay $\lVert d\rVert^2=d^Td$ bằng $d^TMd$ với một ma trận $M$ cho phép phạt mỗi hướng theo một thang riêng. Ví dụ sau thử ý tưởng đó trên hàm của Ví dụ 06.1.

::: example Ví dụ 06.2 (Ma trận phạt trên hàm hai độ cong)
**Dữ kiện.** Hàm $F(\theta)=\tfrac12\bigl([\theta]_1^2+9[\theta]_2^2\bigr)$, điểm đầu $\theta_0=(1,1)^T$, gradient $g=(1,9)^T$ (Ví dụ 06.1). Chọn $\eta=1$ và ma trận phạt $M=\operatorname{diag}(1,9)$.

**Bài toán con.** Cực tiểu $\psi(d)=g^Td+\tfrac12d^TMd=[d]_1+9[d]_2+\tfrac12\bigl([d]_1^2+9[d]_2^2\bigr)$, trong đó $[d]_1$, $[d]_2$ là hai tọa độ của $d$.

**Nghiệm.** Hai đạo hàm riêng $1+[d]_1$ và $9+9[d]_2$ bằng $0$ tại $d=(-1,-1)^T$. Điểm mới là $\theta_0+d=(0,0)^T$, nghiệm của $F$.

**Kiểm tra lại.** Theo công thức $d=-\eta M^{-1}g$, hai tọa độ là $-1/1$ và $-9/9$, tức $d=(-1,-1)^T$.
:::

Ma trận phạt trong ví dụ trùng Hessian của $F$, và bước tới nghiệm trong một lần. Định nghĩa sau đặt tên cho bài toán con với ma trận phạt tổng quát.

::: definition Định nghĩa 06.2 (Bài toán con có phạt và ma trận phạt)
Cho gradient $g\in\mathbb R^p$, bước học $\eta>0$ và ma trận đối xứng $M\in\mathbb R^{p\times p}$, gọi là ma trận phạt. Bài toán con có phạt là

$$
\min_{d\in\mathbb R^p}\ \psi(d),\qquad\psi(d)=g^Td+\frac1{2\eta}\,d^TMd .
\tag{1.3}
$$

Ở vòng $t$ của quá trình huấn luyện, $g=g_t$, $\eta=\eta_t$, $M=M_t$, và bước cập nhật là một nghiệm $d_t$ của (1.3), khi nghiệm tồn tại.
:::

Định nghĩa có ba thành phần.

- Gradient $g$ cho thông tin bậc nhất tại điểm hiện tại.
- Bước học $\eta$ là thang chung của mọi hướng.
- Ma trận $M$ định hình mức phạt theo hướng, với $d^TMd$ lớn theo hướng bị phạt mạnh.

Với $M=\mathrm I$, (1.3) trở lại bài toán con của giảm gradient.

Bài toán con (1.3) là mô hình bậc hai của Định nghĩa 04.8 với ma trận $M/\eta$, bỏ hằng số $F(\theta)$. Bài 04 dùng một ma trận cố định hoặc Hessian ở vị trí đó. Chương này tách $\eta$ khỏi $M$, vì các phương pháp thích ứng của Mục 2 giữ $\eta$ như một siêu tham số và chỉ học $M$. Ma trận phạt không nhất thiết là Hessian: Ví dụ 06.2 chọn $M$ trùng Hessian, nhưng $M$ của Mục 2 dựng từ độ lớn gradient.

Mệnh đề sau trả lời khi nào (1.3) có nghiệm duy nhất, nghiệm đó có công thức nào, và nó có phải hướng giảm hay không. Nó cần các sự kiện về ma trận xác định dương ở mục "Kiến thức tiên quyết" và kết luận dấu của Mệnh đề 04.7.

::: proposition Mệnh đề 06.3 (Nghiệm của bài toán con có phạt)
**Giả thiết.** $g\in\mathbb R^p$, $\eta>0$, $M$ đối xứng.

**Kết luận.**

- (a) Nếu $M\succ0$ thì $\psi$ lồi chặt và có nghiệm duy nhất

$$
d^*=-\eta M^{-1}g,\qquad\psi(d^*)=-\frac\eta2\,g^TM^{-1}g .
\tag{1.4}
$$

- (b) Nếu $M\succ0$ và $g\ne0$ thì $g^Td^*=-\eta\,g^TM^{-1}g<0$, tức $d^*$ là hướng giảm của mọi hàm khả vi có gradient $g$ tại điểm đang xét.
- (c) Nếu $M$ có một giá trị riêng âm thì $\inf_d\psi(d)=-\infty$, nên (1.3) không có nghiệm.

**Điều kiện áp dụng.** Phần (a), (c) chỉ là phát biểu về hàm bậc hai $\psi$. Phần (b) cần $g$ là gradient đúng của hàm đang cực tiểu.

**Phạm vi.** Mệnh đề không nói bước đầy đủ $d^*$ làm mục tiêu giảm; theo Mệnh đề 04.7, chỉ các bước đủ ngắn theo hướng $d^*$ được bảo đảm làm mục tiêu giảm. Trường hợp $M$ nửa xác định dương có giá trị riêng $0$ không thuộc phạm vi.
:::

::: proof Chứng minh Mệnh đề 06.3
**Bước 1 (hoàn thành bình phương).** Với $M\succ0$, $M$ khả nghịch. Đặt $d^*=-\eta M^{-1}g$, tức $g=-M d^*/\eta$. Thay vào $\psi$ và dùng tính đối xứng của $M$:

$$
\begin{aligned}
\psi(d)&=-\frac1\eta(d^*)^TMd+\frac1{2\eta}d^TMd\\
&=\frac1{2\eta}(d-d^*)^TM(d-d^*)-\frac1{2\eta}(d^*)^TMd^* .
\end{aligned}
$$

Dòng thứ hai khai triển $(d-d^*)^TM(d-d^*)=d^TMd-2(d^*)^TMd+(d^*)^TMd^*$.

**Bước 2 (phần a).** Số hạng đầu không âm và bằng $0$ chỉ khi $d=d^*$, vì $M\succ0$. Vậy $d^*$ là nghiệm duy nhất. Giá trị tại nghiệm là $-\tfrac1{2\eta}(d^*)^TMd^*=-\tfrac1{2\eta}\eta^2g^TM^{-1}MM^{-1}g=-\tfrac\eta2g^TM^{-1}g$. Hessian của $\psi$ là $M/\eta\succ0$, nên $\psi$ lồi chặt.

**Bước 3 (phần b).** $g^Td^*=-\eta\,g^TM^{-1}g$. Vì $M^{-1}\succ0$ và $g\ne0$, tích này âm. Theo Định nghĩa 04.6, $d^*$ là hướng giảm.

**Bước 4 (phần c).** Gọi $u$ là vectơ riêng đơn vị ứng với giá trị riêng $\lambda<0$ của $M$. Với $\varsigma\in\mathbb R$,

$$
\psi(\varsigma u)=\varsigma\,g^Tu+\frac{\lambda}{2\eta}\varsigma^2 .
$$

Hệ số của $\varsigma^2$ âm, nên $\psi(\varsigma u)\to-\infty$ khi $\lvert\varsigma\rvert\to\infty$. $\square$
:::

Phần (a) cho công thức của mọi bước trong Mục 2–4; mỗi bước xác định khi biết ma trận phạt. Phần (b) là lý do chỉ dùng ma trận xác định dương, vì khi đó bước luôn chỉ về phía làm mục tiêu giảm, dù ma trận khác Hessian bao nhiêu. Phần (c) liên quan tới một nhầm lẫn. Phương trình dừng $g+Md/\eta=0$ vẫn có nghiệm khi $M$ khả nghịch nhưng bất định, và nghiệm đó là điểm yên ngựa của $\psi$, không phải cực tiểu.

So với Mệnh đề 04.9, mệnh đề thêm phần (c) và tách bước học khỏi ma trận. Cái thêm này cần thiết vì ở Mục 3, ma trận ứng viên là Hessian của một hàm không lồi, có thể có giá trị riêng âm.

::: example Ví dụ 06.3 (Ba ma trận phạt cho cùng một gradient)
**Dữ kiện.** $g=(4,2)^T$, $\eta=\tfrac12$, nên $\tfrac1{2\eta}=1$ và $\psi(d)=g^Td+d^TMd$.

**Ma trận $M=\mathrm I$.** Theo (1.4), $d^*=-\tfrac12g=(-2,-1)^T$ và $\psi(d^*)=-\tfrac14(16+4)=-5$.

**Ma trận $M=\operatorname{diag}(2,1)$.** $M^{-1}g=(2,2)^T$, nên $d^*=(-1,-1)^T$ và $\psi(d^*)=-\tfrac14(8+4)=-3$. Phạt gấp đôi ở tọa độ thứ nhất cân bằng hai thành phần của bước.

**Ma trận $M=\operatorname{diag}(-1,1)$.** $M$ có giá trị riêng $-1$. Dọc $d=(\varsigma,0)^T$, $\psi=4\varsigma-\varsigma^2\to-\infty$, nên không có nghiệm. Phương trình dừng $g+2Md=0$ vẫn cho $d=(2,-1)^T$ với $\psi=6-3=3$; điểm này là điểm yên ngựa vì $\psi$ lõm theo tọa độ thứ nhất và lồi theo tọa độ thứ hai.

**Kiểm tra lại.** Với $M=\operatorname{diag}(2,1)$: $g^Td^*+(d^*)^TMd^*=(-4-2)+(2+1)=-3$, khớp công thức. Với $M=\mathrm I$: $(-8-2)+(4+1)=-5$.
:::

::: remark Nhận xét 06.4 (Ba nhầm lẫn về bước có phạt)
**Ma trận phạt không phải Hessian.** Ví dụ 06.2 chọn $M$ bằng Hessian để bước tới nghiệm; với $M=\operatorname{diag}(2,1)$ ở Ví dụ 06.3, không có hàm nào được nhắc tới mà $M$ là Hessian. Mệnh đề 06.3 chỉ cần $M\succ0$.

**Hướng giảm khác bước giảm.** Với $F(\theta)=2\theta^2$ trên $\mathbb R$, tại $\theta=1$ có $g=4$; chọn $\eta=1$, $M=1$ cho $d^*=-4$, một hướng giảm, nhưng $F(-3)=18$, lớn hơn $F(1)=2$. Độ dài bước cần một quy tắc riêng, chẳng hạn quay lui Armijo.

**Gradient nhóm.** Khi $g=g_t$ là gradient nhóm, phần (b) chỉ nói $d^*$ là hướng giảm của mất mát trung bình trên nhóm $\mathcal B_t$. Nếu $M$ cố định và không phụ thuộc nhóm, tính không chệch của Định lý 05.11 cho $\mathbb E[\nabla F(\theta)^Td^*]=-\eta\,\nabla F(\theta)^TM^{-1}\nabla F(\theta)<0$ khi $\nabla F(\theta)\ne0$; khi $M$ được tính từ chính $g_t$, như ở Mục 2, đẳng thức này không còn đúng.
:::

**Trong học máy.** Tham số $\theta$ là trọng số của mạng, $g_t$ là gradient của mất mát trên một nhóm dữ liệu, và mỗi bộ tối ưu của Mục 2–4 là một cách chọn $M_t$. AdaGrad, RMSProp dựng $M_t$ chéo từ các gradient đã tính; Newton dùng $M_t=H$; BFGS dùng $M_t=P^{-1}$ với $P$ học từ sai phân gradient. Adam không có dạng (1.3) chính xác, vì tử số của bước là moment $\widehat m_t$ thay cho $g_t$ (Mục 2.4). Mất mát của mạng sâu không lồi, nên Hessian có thể có giá trị riêng âm, và phần (c) của Mệnh đề 06.3 là lý do Mục 3 phải sửa Hessian trước khi dùng làm ma trận phạt.

::: exercise Bài tập 06.1
Cho $g=(3,-6)^T$ và $\eta=\tfrac13$.

- (a) Tính nghiệm $d^*$ và giá trị $\psi(d^*)$ của (1.3) với $M=\mathrm I$ và với $M=\operatorname{diag}(1,4)$.
- (b) Với $M=\operatorname{diag}(1,m)$, xác định mọi $m\ne0$ để (1.3) có nghiệm. Với $m=-2$, chỉ ra một dãy $d$ làm $\psi(d)\to-\infty$.
- (c) Giả sử $M\succ0$ cố định, $g_t$ là gradient nhóm không chệch tại $\theta$ và $\nabla F(\theta)\ne0$. Chứng minh $\mathbb E\bigl[\nabla F(\theta)^Td_t\bigr]<0$ với $d_t=-\eta M^{-1}g_t$.
:::

::: hint
Ở (a), dùng (1.4); hệ số $\tfrac1{2\eta}$ bằng $\tfrac32$. Ở (c), kỳ vọng đi qua phép nhân với ma trận hằng $M^{-1}$.
:::

::: solution
**Câu (a).**

Với $M=\mathrm I$: $d^*=-\tfrac13(3,-6)^T=(-1,2)^T$ và $\psi(d^*)=-\tfrac16\lVert g\rVert^2$, với $\lVert g\rVert^2=45$, tức $\psi(d^*)=-7{,}5$.

Với $M=\operatorname{diag}(1,4)$: $M^{-1}g=(3,-\tfrac32)^T$, nên $d^*=(-1,\tfrac12)^T$ và $\psi(d^*)=-\tfrac16\bigl(9+\tfrac{36}4\bigr)=-3$.

**Câu (b).**

$M=\operatorname{diag}(1,m)$ có giá trị riêng $1$ và $m$. Theo Mệnh đề 06.3(a), mọi $m>0$ cho nghiệm. Theo (c), mọi $m<0$ cho $\inf\psi=-\infty$. Với $m=-2$ và $d=(0,\varsigma)^T$: $\psi=-6\varsigma+\tfrac32(-2)\varsigma^2=-6\varsigma-3\varsigma^2\to-\infty$ khi $\varsigma\to\infty$.

**Câu (c).**

Vì $M^{-1}$ và $\nabla F(\theta)$ không ngẫu nhiên, tính tuyến tính của kỳ vọng cho

$$
\begin{aligned}
\mathbb E\bigl[\nabla F(\theta)^Td_t\bigr]&=-\eta\,\nabla F(\theta)^TM^{-1}\,\mathbb E[g_t]\\
&=-\eta\,\nabla F(\theta)^TM^{-1}\nabla F(\theta)\\
&<0 .
\end{aligned}
$$

Dòng thứ hai dùng tính không chệch; dòng thứ ba dùng $M^{-1}\succ0$ và $\nabla F(\theta)\ne0$.

**Kiểm tra lại.** Ở (a), với $M=\mathrm I$: $g^Td^*+\tfrac32\lVert d^*\rVert^2=(-3-12)+\tfrac32\cdot5=-7{,}5$. Với $M=\operatorname{diag}(1,4)$: $(-3-3)+\tfrac32(1+1)=-3$.
:::

**Chuỗi suy luận của mục.** Định nghĩa 06.1 tách quá trình huấn luyện thành bốn thành phần. Ví dụ 06.1 cho thấy một bước học chung bị chặn bởi hướng cong nhất. Định nghĩa 06.2 thay bước học bằng ma trận phạt, và Mệnh đề 06.3 là kết quả đích: ma trận phạt xác định dương cho bước duy nhất $-\eta M^{-1}g$ và hướng giảm, còn ma trận bất định làm bài toán con mất cực tiểu.

**Kết mục.** Mục đã thu được công thức bước $d=-\eta M^{-1}g$ và điều kiện $M\succ0$ (Mệnh đề 06.3). Công thức chưa nói chọn $M$ thế nào khi không biết Hessian: Ví dụ 06.2 dùng Hessian có sẵn, trong khi Hessian của một mạng có $p^2$ phần tử. Mục 2 dựng một ma trận phạt chéo chỉ từ các gradient đã tính, với $p$ số cho $p$ tọa độ.

## 2. Thống kê gradient theo tọa độ

Mục 1 cho bước $d=-\eta M^{-1}g$ với mọi ma trận phạt $M\succ0$, nhưng chưa cho cách chọn $M$ khi Hessian không có sẵn. Một mạng với $p=10^7$ tham số có Hessian gồm $10^{14}$ phần tử, trong khi một vectơ gradient chỉ có $10^7$ số. Trên hàm $F(\theta)=\tfrac12\bigl([\theta]_1^2+9[\theta]_2^2\bigr)$ của Ví dụ 06.1, thành phần gradient thứ $j$ bằng $\lambda_j[\theta]_j$ với $\lambda_1=1$, $\lambda_2=9$; tại $(1,1)$, gradient $(1,9)$ có tỷ số hai thành phần đúng bằng tỷ số độ cong. Mục này dựng ma trận phạt chéo từ độ lớn các gradient đã tính, theo ba cách lưu lịch sử của AdaGrad, RMSProp và Adam, và chỉ ra điều một ma trận chéo không làm được.

### 2.1 Nhu cầu: thống kê độ lớn gradient theo từng tọa độ

Độ lớn gradient chứa một phần thông tin về thang của từng tọa độ, nhưng không thuần túy: thành phần $\lambda_j[\theta]_j$ còn phụ thuộc khoảng cách $\lvert[\theta]_j\rvert$ tới nghiệm. Vì vậy một thống kê dựa trên một gradient duy nhất không đủ; cần tích lũy qua nhiều vòng. Ví dụ sau tích lũy bình phương các thành phần qua hai vòng.

::: example Ví dụ 06.4 (Tổng bình phương gradient qua hai vòng)
**Dữ kiện.** Một dãy gradient minh họa $g_1=(2,1)^T$, $g_2=(2,0)^T$, không lấy từ một quỹ đạo cụ thể.

**Tính.**

| Vòng $t$ | $g_t$ | $g_t\odot g_t$ | Tổng bình phương tích lũy |
|---|---|---|---|
| $1$ | $(2,1)$ | $(4,1)$ | $(4,1)$ |
| $2$ | $(2,0)$ | $(4,0)$ | $(8,1)$ |

**Diễn giải.** Tọa độ thứ nhất có gradient khác $0$ ở cả hai vòng, nên thống kê tăng từ $4$ lên $8$. Tọa độ thứ hai chỉ có gradient khác $0$ ở vòng đầu, nên thống kê giữ $1$.

**Kiểm tra lại.** Dấu $\odot$ là tích theo tọa độ: $(2,1)\odot(2,1)=(2\cdot2,\,1\cdot1)=(4,1)$.
:::

Bình phương được dùng thay cho chính gradient vì hai gradient trái dấu triệt tiêu khi cộng: dãy $2$, $-2$ có tổng $0$ nhưng tổng bình phương $8$. Trực giác, chưa phải phát biểu hình thức: tọa độ có gradient lớn hoặc thường xuyên khác $0$ tích lũy thống kê lớn và nên nhận bước học nhỏ; tọa độ có gradient nhỏ hoặc hiếm khi khác $0$ nên nhận bước học lớn hơn. Định nghĩa sau biến một thống kê không âm thành ma trận phạt chéo.

::: definition Định nghĩa 06.5 (Ma trận phạt chéo từ thống kê bình phương và bước học hiệu dụng)
Cho một vectơ thống kê $v\in\mathbb R^p$ với mọi tọa độ $[v]_j\ge0$, bước học $\eta>0$ và hằng số $\varepsilon>0$. Ma trận phạt chéo ứng với $v$ là

$$
M=\operatorname{diag}\bigl(\sqrt v+\varepsilon\bigr),
$$

với căn lấy theo tọa độ. Bước học hiệu dụng (effective learning rate) của tọa độ $j$ là $\eta/\bigl(\sqrt{[v]_j}+\varepsilon\bigr)$, và bước tương ứng với gradient $g$ là

$$
d=-\eta\,\frac{g}{\sqrt v+\varepsilon},
\tag{2.1}
$$

với phép chia theo tọa độ.
:::

Mỗi phần tử đường chéo của $M$ không nhỏ hơn $\varepsilon>0$, nên $M\succ0$ và (2.1) đúng là công thức (1.4) của Mệnh đề 06.3. Hằng số $\varepsilon$ chỉ để mẫu số dương khi $[v]_j=0$; các phép tính tay dưới đây bỏ $\varepsilon$ khi mọi mẫu số đã dương, và nói rõ khi làm vậy. Ba phương pháp của mục chỉ khác nhau ở cách cập nhật $v$, và Adam khác thêm ở tử số của (2.1).

Ma trận chéo là trường hợp riêng của ma trận phạt tổng quát ở Định nghĩa 06.2: nó phạt từng tọa độ riêng, không phạt tổ hợp của hai tọa độ. Mục 2.5 chứng minh hạn chế này có giá thật.

### 2.2 AdaGrad

Cách đơn giản nhất để lập $v$ là cộng mọi bình phương gradient từ đầu. Tên AdaGrad viết tắt từ gradient thích ứng (adaptive gradient), phương pháp của Duchi, Hazan và Singer (2011). Ví dụ sau chạy hai vòng trên dãy gradient của Ví dụ 06.4.

::: example Ví dụ 06.5 (Hai vòng AdaGrad)
**Dữ kiện.** $g_1=(2,1)^T$, $g_2=(2,0)^T$, $v_0=0$, $\eta=1$; bỏ $\varepsilon$ vì các mẫu số đều dương.

**Vòng 1.** $v_1=v_0+g_1\odot g_1=(4,1)^T$. Bước $d_1=-g_1/\sqrt{v_1}$ có hai tọa độ $-2/2$ và $-1/1$, tức $d_1=(-1,-1)^T$.

**Vòng 2.** $v_2=v_1+g_2\odot g_2=(8,1)^T$. Bước $d_2$ có hai tọa độ $-2/\sqrt8=-1/\sqrt2\approx-0{,}7071$ và $-0/1=0$.

**Bước học hiệu dụng.** Tọa độ thứ nhất giảm từ $\tfrac12$ xuống $\tfrac1{2\sqrt2}\approx0{,}354$; tọa độ thứ hai giữ $1$.

**Kiểm tra lại.** Thống kê được cập nhật trước phép chia; nếu chia cho $v_{t-1}$ thì ở vòng 1 mẫu số là $\sqrt{v_0}=0$. Độ dài bước ở mỗi tọa độ không vượt $\eta=1$: $\lvert-1\rvert\le1$, $0{,}7071\le1$.
:::

Tọa độ thứ hai có bước học hiệu dụng lớn nhất nhưng bước ở vòng 2 bằng $0$, vì gradient hiện tại bằng $0$. Độ dài bước phụ thuộc cả tử số $[g_t]_j$ lẫn mẫu số. Thuật toán sau ghép các vòng này thành quy trình.

::: algorithm Thuật toán 06.1 (AdaGrad)
**Đầu vào.** Điểm đầu $\theta_0$; bước học $\eta>0$; hằng số $\varepsilon>0$; cách chọn nhóm $\mathcal B_t$; ngân sách $T$ và tiêu chí dừng định trước.

**Khởi tạo.** $v_0=0\in\mathbb R^p$.

**Các bước.** Với $t=1,2,\ldots,T$:

1. Tính $g_t$ theo (1.2) tại $\theta_{t-1}$.
2. Cập nhật thống kê: $v_t=v_{t-1}+g_t\odot g_t$.
3. Cập nhật tham số: $\theta_t=\theta_{t-1}-\eta\,g_t/\bigl(\sqrt{v_t}+\varepsilon\bigr)$.
4. Dừng nếu tiêu chí dừng đạt.

**Đầu ra.** $\theta_T$, hoặc điểm được chọn theo tiêu chí xác thực định trước.

**Chi phí.** Ngoài phép tính gradient, mỗi vòng tốn $O(p)$ phép toán và lưu một vectơ trạng thái $v_t\in\mathbb R^p$.
:::

Bước 3 là (2.1) với $v=v_t$, tức bước có phạt với $M_t=\operatorname{diag}(\sqrt{v_t}+\varepsilon)$. Mệnh đề sau thu thập các tính chất của AdaGrad; chúng dựa trên Mệnh đề 06.3 và trên việc $v_t$ là một tổng.

::: proposition Mệnh đề 06.6 (Tính chất của AdaGrad)
**Giả thiết.** Thuật toán 06.1 với $\eta$ cố định và một dãy gradient bất kỳ $g_1,g_2,\ldots$.

**Kết luận.**

- (a) $[v_t]_j=\sum_{i=1}^t[g_i]_j^2$ với mọi $j$ và $t$.
- (b) $M_t\succ0$, nên $d_t=\theta_t-\theta_{t-1}$ là nghiệm duy nhất của bài toán con (1.3) với $g=g_t$, $M=M_t$; khi $g_t$ là gradient đúng và khác $0$, $d_t$ là hướng giảm.
- (c) Bước học hiệu dụng $\eta/\bigl(\sqrt{[v_t]_j}+\varepsilon\bigr)$ không tăng theo $t$.
- (d) $\bigl\lvert[d_t]_j\bigr\rvert<\eta$ với mọi $j$, $t$; nếu $[g_t]_j=0$ thì $[d_t]_j=0$.

**Điều kiện áp dụng.** Chỉ cần $\varepsilon>0$ và $\eta$ cố định; không cần gì về $F$.

**Phạm vi.** Mệnh đề không nói AdaGrad hội tụ. Bảo đảm hội tụ của Duchi, Hazan và Singer (2011, mục 3) thuộc tối ưu lồi trực tuyến và không áp dụng cho mạng sâu không lồi.
:::

::: proof Chứng minh Mệnh đề 06.6
**Bước 1 (phần a).** Quy nạp theo $t$: $v_0=0$, và bước 2 của thuật toán cộng $[g_t]_j^2$ vào tọa độ $j$.

**Bước 2 (phần b).** Mọi phần tử đường chéo $\sqrt{[v_t]_j}+\varepsilon\ge\varepsilon>0$, nên $M_t\succ0$. Kết luận suy từ Mệnh đề 06.3(a), (b).

**Bước 3 (phần c).** Theo (a), $[v_t]_j=[v_{t-1}]_j+[g_t]_j^2\ge[v_{t-1}]_j$. Căn bậc hai đồng biến, nên mẫu số không giảm và thương không tăng.

**Bước 4 (phần d).** Theo (a), $[v_t]_j\ge[g_t]_j^2$, nên $\sqrt{[v_t]_j}\ge\lvert[g_t]_j\rvert$. Do đó

$$
\begin{aligned}
\bigl\lvert[d_t]_j\bigr\rvert&=\eta\,\frac{\lvert[g_t]_j\rvert}{\sqrt{[v_t]_j}+\varepsilon}\\
&<\eta\,\frac{\lvert[g_t]_j\rvert}{\lvert[g_t]_j\rvert}\\
&=\eta
\end{aligned}
$$

khi $[g_t]_j\ne0$; bất đẳng thức chặt vì $\varepsilon>0$. Khi $[g_t]_j=0$, tử số bằng $0$. $\square$
:::

Phần (c) và (d) cho hai cách đọc bước học $\eta$ của AdaGrad. Theo (d), $\eta$ là cận trên cho độ dài bước ở từng tọa độ, độc lập với thang của gradient, trong khi bước của giảm gradient tỷ lệ với gradient. Theo (c), bước học hiệu dụng chỉ giảm, nên một tọa độ đã nhận gradient lớn ở đầu quá trình giữ bước học nhỏ mãi về sau. Ở Ví dụ 06.5, hai tính chất đọc được trực tiếp: bước học hiệu dụng của tọa độ thứ nhất giảm từ $\tfrac12$ xuống $0{,}354$, và các bước có độ lớn $1$ và $0{,}707$, không vượt $\eta=1$.

Nhầm lẫn thường gặp là coi AdaGrad như phương pháp Newton với Hessian chéo. Trên hàm của Ví dụ 06.1, từ $\theta_0=(2,1)^T$ có $g_1=(2,9)^T$ và $v_1=(4,81)^T$; với $\eta=1$ và bỏ $\varepsilon$, $d_1=(-1,-1)^T$ và $\theta_1=(1,0)^T$, không phải nghiệm. Bước Newton chéo $-\operatorname{diag}(1,9)^{-1}g_1=(-2,-1)^T$ tới nghiệm ngay. Ở vòng đầu, AdaGrad đi một đoạn bằng $\eta$ theo dấu của mỗi thành phần gradient, không theo độ cong.

**Trong học máy.** Ứng dụng điển hình của AdaGrad là đặc trưng thưa (sparse feature), chẳng hạn chỉ số của một từ hiếm trong mô hình văn bản: tham số gắn với đặc trưng chỉ nhận gradient khác $0$ ở các nhóm chứa từ đó. Theo Mệnh đề 06.6(a), tổng bình phương của tham số này tăng chậm, nên bước học hiệu dụng của nó giữ lớn hơn của các tham số gắn với từ phổ biến. Goodfellow, Bengio và Courville (2016, mục 8.5.1, tr. 307) ghi nhận rằng với mạng sâu, việc tích lũy từ đầu quá trình có thể làm bước học hiệu dụng giảm sớm và quá mức; đó là hệ quả trực tiếp của phần (c), và là nhu cầu của Mục 2.3.

### 2.3 RMSProp

Phần (c) của Mệnh đề 06.6 là một ràng buộc khi quỹ đạo đi qua nhiều vùng khác nhau của mặt mất mát. Một tọa độ có gradient lớn ở vùng đầu giữ bước học nhỏ ngay cả khi quỹ đạo đã tới vùng mà gradient theo tọa độ đó nhỏ. Trực giác, chưa phải phát biểu hình thức: thay tổng bằng một trung bình có trọng số giảm dần theo tuổi của gradient, gọi là trung bình mũ (exponential moving average), để thống kê quên các gradient xa. Tên RMSProp lấy từ căn trung bình bình phương (root mean square), phương pháp được Hinton, Srivastava và Swersky (2012) trình bày trong một bài giảng.

::: example Ví dụ 06.6 (Hai vòng RMSProp)
**Dữ kiện.** Dãy gradient của Ví dụ 06.4: $g_1=(2,1)^T$, $g_2=(2,0)^T$; $v_0=0$, hệ số nhớ $\rho=\tfrac12$, $\eta=1$; bỏ $\varepsilon$ vì mẫu số dương.

**Vòng 1.** $v_1=\rho v_0+(1-\rho)g_1\odot g_1=\tfrac12(4,1)^T$, tức $v_1=(2,\tfrac12)^T$. Bước $d_1$ có hai tọa độ $-2/\sqrt2$ và $-1/\sqrt{1/2}$, cùng bằng $-\sqrt2$.

**Vòng 2.**

$$
\begin{aligned}
v_2&=\tfrac12\bigl(2,\tfrac12\bigr)^T+\tfrac12(4,0)^T\\
&=\bigl(1,\tfrac14\bigr)^T+(2,0)^T\\
&=\bigl(3,\tfrac14\bigr)^T .
\end{aligned}
$$

Bước $d_2=(-2/\sqrt3,\;0)^T\approx(-1{,}1547;\,0)^T$.

**So với AdaGrad.** Ở tọa độ thứ hai, thống kê giảm từ $\tfrac12$ xuống $\tfrac14$, trong khi AdaGrad giữ $1$. Khai triển $v_2=\tfrac14\,g_1\odot g_1+\tfrac12\,g_2\odot g_2$: gradient cũ có trọng số $\tfrac14$, gradient mới có trọng số $\tfrac12$; AdaGrad gán trọng số $1$ cho cả hai.

**Kiểm tra lại.** $\tfrac14(4,1)+\tfrac12(4,0)=(1+2,\;\tfrac14)=(3,\tfrac14)$, khớp $v_2$.
:::

Bước vòng 1 của RMSProp dài gấp $\sqrt2$ lần bước của AdaGrad, vì $v_1=(1-\rho)g_1\odot g_1$ nhỏ hơn $g_1\odot g_1$. Độ dài này đến từ khởi tạo $v_0=0$, không đến từ dữ kiện của bài toán.

::: algorithm Thuật toán 06.2 (RMSProp)
**Đầu vào.** Như Thuật toán 06.1, thêm hệ số nhớ $\rho\in(0,1)$.

**Khởi tạo.** $v_0=0$.

**Các bước.** Với $t=1,2,\ldots,T$:

1. Tính $g_t$ theo (1.2) tại $\theta_{t-1}$.
2. Cập nhật thống kê: $v_t=\rho\,v_{t-1}+(1-\rho)\,g_t\odot g_t$.
3. Cập nhật tham số: $\theta_t=\theta_{t-1}-\eta\,g_t/\bigl(\sqrt{v_t}+\varepsilon\bigr)$.
4. Dừng nếu tiêu chí dừng đạt.

**Đầu ra và chi phí.** Như Thuật toán 06.1: một vectơ trạng thái, $O(p)$ phép toán mỗi vòng ngoài gradient.
:::

Thuật toán chỉ đổi bước 2 so với AdaGrad. Mệnh đề sau khai triển bước này thành trung bình có trọng số và đo tốc độ quên.

::: proposition Mệnh đề 06.7 (Trung bình mũ của RMSProp)
**Giả thiết.** Thuật toán 06.2 với $\rho\in(0,1)$ cố định, $v_0=0$ và dãy gradient bất kỳ.

**Kết luận.**

- (a) Với mọi $t\ge1$,

$$
v_t=(1-\rho)\sum_{i=1}^t\rho^{\,t-i}\,g_i\odot g_i ,
\tag{2.2}
$$

tức gradient cách $\Delta=t-i$ vòng có trọng số $(1-\rho)\rho^{\Delta}$, và tổng các trọng số bằng $1-\rho^t<1$.
- (b) Nếu $[g_i]_j=0$ với $i=t+1,\ldots,t+\Delta$ thì $[v_{t+\Delta}]_j=\rho^{\Delta}[v_t]_j$.
- (c) Với trọng số $(1-\rho)\rho^{\Delta}$, $\Delta=0,1,2,\ldots$ (độ dài lịch sử vô hạn), độ trễ trung bình là $\sum_{\Delta\ge0}\Delta(1-\rho)\rho^{\Delta}=\rho/(1-\rho)$.
- (d) $\bigl\lvert[d_t]_j\bigr\rvert<\eta/\sqrt{1-\rho}$ với mọi $j$, $t$.

**Điều kiện áp dụng.** Hệ số $\rho$ cố định; $\varepsilon>0$ cho phần (d).

**Phạm vi.** Mệnh đề là đồng nhất thức đại số và một cận; nó không nói RMSProp hội tụ.
:::

::: proof Chứng minh Mệnh đề 06.7
**Bước 1 (phần a).** Quy nạp theo $t$. Với $t=1$: $v_1=(1-\rho)g_1\odot g_1$, đúng (2.2). Giả sử (2.2) đúng cho $v_{t-1}$; thay vào bước 2:

$$
\begin{aligned}
v_t&=\rho(1-\rho)\sum_{i=1}^{t-1}\rho^{\,t-1-i}\,g_i\odot g_i+(1-\rho)\,g_t\odot g_t\\
&=(1-\rho)\sum_{i=1}^{t}\rho^{\,t-i}\,g_i\odot g_i .
\end{aligned}
$$

Tổng trọng số là $(1-\rho)\sum_{\Delta=0}^{t-1}\rho^{\Delta}=1-\rho^t$ theo công thức cấp số nhân.

**Bước 2 (phần b).** Khi $[g_i]_j=0$, bước 2 cho $[v_i]_j=\rho[v_{i-1}]_j$; lặp $\Delta$ lần.

**Bước 3 (phần c).** Với $\lvert\rho\rvert<1$, đạo hàm của chuỗi $\sum_{\Delta\ge0}\rho^{\Delta}=\tfrac1{1-\rho}$ cho $\sum_{\Delta\ge1}\Delta\rho^{\Delta-1}=\tfrac1{(1-\rho)^2}$. Nhân với $(1-\rho)\rho$ được $\tfrac\rho{1-\rho}$.

**Bước 4 (phần d).** Theo (a), số hạng $i=t$ cho $[v_t]_j\ge(1-\rho)[g_t]_j^2$, nên $\sqrt{[v_t]_j}\ge\sqrt{1-\rho}\,\lvert[g_t]_j\rvert$. Như Bước 4 của chứng minh Mệnh đề 06.6, $\lvert[d_t]_j\rvert<\eta/\sqrt{1-\rho}$ khi $[g_t]_j\ne0$, và bằng $0$ khi $[g_t]_j=0$. $\square$
:::

Phần (a) cho thấy RMSProp vẫn là bước có phạt chéo, nhưng thống kê chủ yếu do khoảng $\rho/(1-\rho)$ gradient gần nhất quyết định theo phần (c): $1$ vòng khi $\rho=0{,}5$, $9$ vòng khi $\rho=0{,}9$. Phần (b) là điều AdaGrad không làm được: khi một tọa độ vắng gradient, thống kê của nó co theo $\rho^{\Delta}$, và bước học hiệu dụng tăng trở lại; với $\rho=0{,}9$ và $\Delta=10$, hệ số là $0{,}9^{10}\approx0{,}35$.

Phần (a) cũng cho một khuyết điểm: tổng trọng số $1-\rho^t$ nhỏ hơn $1$, và gần $0$ ở các vòng đầu khi $\rho$ gần $1$. Theo phần (d), cận cho bước là $\eta/\sqrt{1-\rho}$; với $\rho=0{,}9$, vòng đầu cho bước dài khoảng $3{,}16\,\eta$ ở mọi tọa độ có gradient khác $0$, như $\sqrt2\,\eta$ của Ví dụ 06.6 với $\rho=\tfrac12$.

![Đồ thị trọng số (1 − ρ)ρ mũ k theo độ trễ k từ 0 đến 8 của gradient, trục tung từ 0 đến 0,5. Đường ρ = 0,5 bắt đầu ở 0,5 và giảm một nửa sau mỗi vòng, gần 0 từ k = 5. Đường ρ = 0,9 bắt đầu ở 0,1 và giảm chậm, vẫn khoảng 0,043 ở k = 8.](img/lec-06/rms-weights.svg)

Hình vẽ trọng số của phần (a) theo độ trễ $\Delta$; trục $k$ trên hình là $\Delta$. Đường $\rho=0{,}5$ bắt đầu cao và rơi nhanh, nên thống kê gần như chỉ phản ánh hai, ba gradient cuối. Đường $\rho=0{,}9$ bắt đầu thấp và giảm chậm, nên các gradient cách tám vòng vẫn còn trọng số khoảng $0{,}1\cdot0{,}9^8\approx0{,}043$.

**Trong học máy.** Hinton, Srivastava và Swersky (2012, Lecture 6) dùng hệ số nhớ $\rho=0{,}9$; `torch.optim.RMSprop` của PyTorch đặt mặc định $0{,}99$. Theo Goodfellow, Bengio và Courville (2016, tr. 307–308), lý do đổi tổng thành trung bình mũ là quỹ đạo huấn luyện mạng không lồi đi qua nhiều vùng có cấu trúc khác nhau trước khi tới một vùng gần lồi. Giả thiết ngầm của Mệnh đề 06.7 khi dùng thống kê như một thang của vùng hiện tại là gradient trong khoảng $\rho/(1-\rho)$ vòng gần nhất thuộc cùng một vùng; khi quỹ đạo đổi vùng nhanh hơn độ dài bộ nhớ đó, thống kê còn mang thang của vùng cũ.

::: remark Nhận xét 06.8 (Vị trí của hằng số $\varepsilon$ và thang của thống kê)
**Vị trí của $\varepsilon$.** Chương đặt $\varepsilon$ ngoài căn, như trong (2.1). Thuật toán 8.5 của Goodfellow, Bengio và Courville (2016, tr. 309) đặt hằng số dưới căn, chia cho $\sqrt{\delta+v_t}$. Hai cách cho giá trị khác nhau khi $[v_t]_j$ nhỏ, nên một giá trị hằng số tốt cho cách này không chuyển nguyên sang cách kia. Bản cài đặt `torch.optim.RMSprop` của PyTorch cộng hằng số sau khi lấy căn, như chương này.

**Nhầm lẫn thường gặp.** $v_t$ ước lượng moment bậc hai thô $\mathbb E\bigl[[g]_j^2\bigr]$, không phải phương sai $\mathbb E\bigl[[g]_j^2\bigr]-\bigl(\mathbb E[g]_j\bigr)^2$. Một tọa độ có gradient hằng $\varsigma\ne0$ có phương sai $0$ nhưng $[v_t]_j=(1-\rho^t)\varsigma^2$.
:::

### 2.4 Adam

RMSProp còn hai điều chưa có. Tổng trọng số $1-\rho^t$ chưa được hiệu chỉnh, nên các bước đầu bị phóng đại; và thống kê chỉ nhớ độ lớn, không nhớ hướng của gradient, trong khi momentum của Bài 05 cho thấy nhớ hướng giúp giảm dao động.

Adam, tên lấy từ ước lượng moment thích ứng (adaptive moment estimation), của Kingma và Ba (2015), thêm cả hai. Trực giác, chưa phải phát biểu hình thức: tử số nhớ hướng gần đây của gradient như momentum, mẫu số nhớ độ lớn như RMSProp, và cả hai được chia cho tổng trọng số để không bị kéo về $0$ bởi khởi tạo. Ví dụ sau tính vòng đầu.

::: example Ví dụ 06.7 (Vòng đầu của Adam)
**Dữ kiện.** $g_1=(2,1)^T$, $m_0=v_0=0$, $\beta_1=\tfrac12$, $\beta_2=\tfrac34$, $\eta=1$; bỏ $\varepsilon$ vì mẫu số dương.

**Hai trung bình mũ.** Moment bậc nhất $m_1=\beta_1m_0+(1-\beta_1)g_1=\tfrac12(2,1)^T$, tức $m_1=(1,\tfrac12)^T$. Moment bậc hai thô $v_1=\beta_2v_0+(1-\beta_2)g_1\odot g_1=\tfrac14(4,1)^T$, tức $v_1=(1,\tfrac14)^T$.

**Hiệu chỉnh.** Tổng trọng số sau một vòng là $1-\beta_1=\tfrac12$ và $1-\beta_2=\tfrac14$. Chia cho chúng: $\widehat m_1=(2,1)^T=g_1$ và $\widehat v_1=(4,1)^T=g_1\odot g_1$.

**Bước.** $d_1=-\widehat m_1/\sqrt{\widehat v_1}$ có hai tọa độ $-2/2$ và $-1/1$, tức $d_1=(-1,-1)^T$.

**Kiểm tra lại.** Không hiệu chỉnh, bước là $-m_1/\sqrt{v_1}=(-1/1,\;-\tfrac12/\tfrac12)^T=(-1,-1)^T$ trong ví dụ này chỉ vì $\sqrt{1-\beta_2}=1-\beta_1=\tfrac12$; với $\beta_1=0{,}9$, $\beta_2=0{,}999$, bước không hiệu chỉnh dài $0{,}1/\sqrt{0{,}001}\approx3{,}16$ lần bước có hiệu chỉnh.
:::

::: algorithm Thuật toán 06.3 (Adam)
**Đầu vào.** Như Thuật toán 06.1, với lịch bước học $\eta_t>0$; thêm hai hệ số nhớ $\beta_1,\beta_2\in(0,1)$.

**Khởi tạo.** $m_0=v_0=0$.

**Các bước.** Với $t=1,2,\ldots,T$:

1. Tính $g_t$ theo (1.2) tại $\theta_{t-1}$.
2. Cập nhật moment bậc nhất: $m_t=\beta_1m_{t-1}+(1-\beta_1)\,g_t$.
3. Cập nhật moment bậc hai thô: $v_t=\beta_2v_{t-1}+(1-\beta_2)\,g_t\odot g_t$.
4. Hiệu chỉnh: $\widehat m_t=m_t/(1-\beta_1^t)$, $\widehat v_t=v_t/(1-\beta_2^t)$.
5. Cập nhật tham số: $\theta_t=\theta_{t-1}-\eta_t\,\widehat m_t/\bigl(\sqrt{\widehat v_t}+\varepsilon\bigr)$.
6. Dừng nếu tiêu chí dừng đạt.

**Đầu ra.** Như Thuật toán 06.1.

**Chi phí.** Hai vectơ trạng thái $m_t$, $v_t$; $O(p)$ phép toán mỗi vòng ngoài gradient.
:::

Bước 4 dùng các lũy thừa $\beta_1^t$, $\beta_2^t$ của chỉ số vòng, nên $t$ phải bắt đầu từ $1$; đó là lý do của quy ước chỉ số ở đầu chương. Bước 5 có dạng $-\eta_tM_t^{-1}\widehat m_t$ với $M_t=\operatorname{diag}(\sqrt{\widehat v_t}+\varepsilon)$: mẫu số là RMSProp có hiệu chỉnh, tử số không còn là gradient hiện tại. Mệnh đề sau cho biết hiệu chỉnh đạt được gì và cần giả thiết nào.

::: proposition Mệnh đề 06.9 (Hiệu chỉnh moment của Adam)
**Giả thiết.** Thuật toán 06.3 với $\beta_1,\beta_2\in(0,1)$ cố định và dãy gradient $g_1,g_2,\ldots$.

**Kết luận.**

- (a) $\widehat m_t=\sum_{i=1}^t \varrho_i\,g_i$ với $\varrho_i=\dfrac{(1-\beta_1)\beta_1^{\,t-i}}{1-\beta_1^t}>0$ và $\sum_{i=1}^t\varrho_i=1$; tương tự $\widehat v_t$ là trung bình có trọng số dương, tổng $1$, của $g_i\odot g_i$.
- (b) Nếu các gradient là ngẫu nhiên với kỳ vọng chung $\mathbb E[g_i]=\bar g$ cho mọi $i\le t$, thì $\mathbb E[\widehat m_t]=\bar g$. Nếu $\mathbb E[g_i\odot g_i]=\overline{g\odot g}$ cho mọi $i\le t$, thì $\mathbb E[\widehat v_t]=\overline{g\odot g}$.
- (c) Ở vòng đầu, $\widehat m_1=g_1$, $\widehat v_1=g_1\odot g_1$; khi bỏ $\varepsilon$, mọi tọa độ khác $0$ của $d_1$ có độ lớn đúng bằng $\eta_1$.

**Điều kiện áp dụng.** Phần (b) không cần các gradient độc lập; nó cần kỳ vọng không đổi theo vòng.

**Phạm vi.** Khi phân phối của gradient đổi theo vòng, như khi tham số di chuyển, phần (b) không còn đúng; phần (a) vẫn đúng. Mệnh đề không nói Adam hội tụ.
:::

::: proof Chứng minh Mệnh đề 06.9
**Bước 1 (khai triển).** Như Bước 1 của chứng minh Mệnh đề 06.7, với $\beta_1$ thay $\rho$ và $g_i$ thay $g_i\odot g_i$,

$$
m_t=(1-\beta_1)\sum_{i=1}^t\beta_1^{\,t-i}g_i,\qquad(1-\beta_1)\sum_{i=1}^t\beta_1^{\,t-i}=1-\beta_1^t .
$$

**Bước 2 (phần a).** Chia $m_t$ cho $1-\beta_1^t$ được trọng số $\varrho_i$ dương có tổng $\tfrac{1-\beta_1^t}{1-\beta_1^t}=1$. Lập luận giống hệt cho $\widehat v_t$ với $\beta_2$.

**Bước 3 (phần b).** Theo (a) và tính tuyến tính của kỳ vọng, $\mathbb E[\widehat m_t]=\sum_i\varrho_i\,\mathbb E[g_i]=\bar g\sum_i\varrho_i$, và tổng các $\varrho_i$ bằng $1$. Bước này chỉ dùng kỳ vọng của từng $g_i$, không dùng tính độc lập. Phần cho $\widehat v_t$ giống hệt.

**Bước 4 (phần c).** Với $t=1$, tổng trong (a) chỉ có $i=1$ với $\varrho_1=1$. Khi $[g_1]_j\ne0$, $[d_1]_j=-\eta_1[g_1]_j/\lvert[g_1]_j\rvert=\mp\eta_1$. $\square$
:::

Phần (a) nói hiệu chỉnh làm gì. Sau khi chia, $\widehat m_t$ và $\widehat v_t$ là các trung bình có trọng số tổng bằng $1$, nên cùng thang với một gradient và một bình phương gradient.

Phần (b) là lý do gọi chúng là ước lượng không chệch, nhưng chỉ khi kỳ vọng không đổi. Trong huấn luyện, tham số thay đổi qua các vòng, nên giả thiết này chỉ gần đúng khi các gradient trong bộ nhớ gần đây có phân phối gần nhau. Với hệ số nhớ $\beta_1$ hoặc $\beta_2$, ký hiệu chung là $\beta_i$, Mệnh đề 06.7(c) cho độ trễ trung bình $\beta_i/(1-\beta_i)$ vòng; thước đo $1/(1-\beta_i)$ vòng hay gặp trong tài liệu lớn hơn nó đúng $1$.

Phần (c) giải thích vì sao bước đầu của Adam bằng $\eta$ theo mọi tọa độ, khác bước dài $\eta/\sqrt{1-\rho}$ của RMSProp.

So với momentum của Bài 05, $m_t$ cùng dạng với vận tốc của Mệnh đề 05.18 nhưng có thêm thừa số $1-\beta_1$, nên sau hiệu chỉnh nó là trung bình chứ không phải tổng. Khi gradient hằng và hệ số momentum bằng $\beta_1$, Mệnh đề 05.18(b) cho vận tốc tiến tới $\tfrac1{1-\beta_1}$ lần bước gradient, còn $\widehat m_t$ giữ đúng gradient đó.

::: example Ví dụ 06.8 (Vòng hai: ba phương pháp khi một tọa độ vắng gradient)
**Dữ kiện.** Hệ số $\beta_1=\tfrac12$, $\beta_2=\tfrac34$, $\eta=1$, bỏ $\varepsilon$. Sau vòng đầu với $g_1=(2,1)^T$, hai moment là $m_1=(1,\tfrac12)^T$ và $v_1=(1,\tfrac14)^T$ (Ví dụ 06.7). Gradient vòng hai là $g_2=(2,0)^T$.

**Moment.** $m_2=\tfrac12(1,\tfrac12)^T+\tfrac12(2,0)^T=(\tfrac32,\tfrac14)^T$. $v_2=\tfrac34(1,\tfrac14)^T+\tfrac14(4,0)^T=(\tfrac74,\tfrac3{16})^T$.

**Hiệu chỉnh.** $1-\beta_1^2=\tfrac34$ và $1-\beta_2^2=\tfrac7{16}$, nên

$$
\widehat m_2=\Bigl(2,\;\frac13\Bigr)^T,\qquad\widehat v_2=\Bigl(4,\;\frac37\Bigr)^T .
$$

**Bước.** $[d_2]_1=-2/2=-1$ và $[d_2]_2=-\tfrac13\big/\sqrt{3/7}$, tức $[d_2]_2=-\sqrt{21}/9\approx-0{,}5092$.

**So sánh.** Với cùng hai gradient, AdaGrad cho $d_2=(-1/\sqrt2,\,0)^T$ (Ví dụ 06.5) và RMSProp cho $d_2=(-2/\sqrt3,\,0)^T$ (Ví dụ 06.6). Chỉ Adam dịch tọa độ thứ hai, dù gradient hiện tại của tọa độ đó bằng $0$, vì tử số $\widehat m_2$ còn giữ gradient vòng 1 với trọng số $\varrho_1=\tfrac{(1/2)(1/2)}{3/4}=\tfrac13$.

**Kiểm tra lại.** $[\widehat m_2]_2=\varrho_1\cdot1+\varrho_2\cdot0=\tfrac13$, khớp phần (a) của Mệnh đề 06.9. $\sqrt{21}/9=\sqrt{7/3}/3$, vì $\tfrac13\big/\sqrt{3/7}=\tfrac13\sqrt{7/3}$.
:::

Ở Ví dụ 06.8, tọa độ thứ hai dịch theo hướng giảm của gradient vòng trước. Trường hợp sau cho thấy tử số $\widehat m_t$ có thể chỉ ngược hướng giảm. Với hệ số mặc định $\beta_1=0{,}9$ và hai gradient một chiều $g_1=1$, $g_2=-0{,}05$: $m_2=0{,}9\cdot0{,}1-0{,}1\cdot0{,}05=0{,}085$, nên $\widehat m_2=0{,}085/0{,}19\approx0{,}447$ dương trong khi $g_2$ âm.

::: proposition Mệnh đề 06.10 (Bước Adam không nhất thiết là hướng giảm)
**Giả thiết.** $\beta_1\in(0,1)$, $\beta_2\in(0,1)$, $\varepsilon>0$, $\eta_2>0$; một tọa độ, với $g_1=1$ và $g_2=-\varsigma$, trong đó $0<\varsigma<\beta_1$.

**Kết luận.** $\widehat m_2>0$, nên $d_2<0$ và $g_2d_2>0$: bước thứ hai đi theo hướng làm tăng xấp xỉ bậc nhất của mất mát tại $\theta_1$.

**Điều kiện áp dụng.** Mọi cặp hệ số $\beta_1$, $\beta_2$, kể cả mặc định $\beta_1=0{,}9$.

**Phạm vi.** Mệnh đề nói về dấu của một bước, không về giá trị mất mát sau nhiều bước.
:::

::: proof Chứng minh Mệnh đề 06.10
**Bước 1 (moment).** $m_1=(1-\beta_1)$ và

$$
\begin{aligned}
m_2&=\beta_1(1-\beta_1)-(1-\beta_1)\varsigma\\
&=(1-\beta_1)(\beta_1-\varsigma)>0 ,
\end{aligned}
$$

vì $\beta_1<1$ và $\varsigma<\beta_1$. Do đó $\widehat m_2=m_2/(1-\beta_1^2)>0$.

**Bước 2 (dấu).** Mẫu số $\sqrt{\widehat v_2}+\varepsilon>0$, nên $d_2=-\eta_2\widehat m_2/(\sqrt{\widehat v_2}+\varepsilon)<0$. Vì $g_2<0$, $g_2d_2>0$. $\square$
:::

Kết luận hướng giảm của Mệnh đề 06.3(b) cần tử số là gradient hiện tại; Adam thay tử số bằng một trung bình, nên kết luận đó không áp dụng. Đây là cùng cơ chế với momentum ở Bài 05, nơi Ví dụ 05.18 cho mất mát tăng ở bước 4 dù gradient đầy đủ.

**Trong học máy.** Kingma và Ba (2015, thuật toán 1) đề xuất mặc định $\eta=0{,}001$, $\beta_1=0{,}9$, $\beta_2=0{,}999$, $\varepsilon=10^{-8}$; `torch.optim.Adam` của PyTorch dùng cùng các giá trị mặc định và cộng $\varepsilon$ sau khi lấy căn của $\widehat v_t$. Với $\beta_2=0{,}999$, theo Mệnh đề 06.7(c) độ trễ trung bình của thống kê bình phương là $999$ vòng, nên hiệu chỉnh $1/(1-\beta_2^t)$ còn lớn sau $100$ vòng, khi $1-0{,}999^{100}\approx0{,}095$.

Về hội tụ, Reddi, Kale và Kumar (2018) dựng một bài toán tối ưu lồi trực tuyến (online convex optimization) trên đó Adam với hệ số cố định không hội tụ tới nghiệm. Phân tích hội tụ của Kingma và Ba (2015, mục 4) dùng bước học giảm dần $\eta_t=\eta/\sqrt t$. Goodfellow, Bengio và Courville (2016, tr. 309) ghi nhận Adam khá bền với lựa chọn siêu tham số, dù bước học đôi khi phải đổi khỏi giá trị đề xuất (Tình huống 06.1).

### 2.5 Bất biến theo thang và giới hạn của ma trận chéo

Ba phương pháp trên có chung một tính chất: chúng không phụ thuộc thang của từng thành phần gradient. Trên hàm $F(\theta)=\tfrac12\bigl([\theta]_1^2+9[\theta]_2^2\bigr)$ của Ví dụ 06.1 và hàm $G(\theta)=\tfrac12\lVert\theta\rVert^2$, cùng từ $(1,1)$, AdaGrad với $\eta=1$ nhận $g_1=(1,9)$ và $g_1=(1,1)$, nhưng cả hai lần đều cho $d_1=(-1,-1)$. Mệnh đề sau phát biểu tính chất này cho mọi vòng.

::: proposition Mệnh đề 06.11 (Bất biến theo thang của từng thành phần gradient)
**Giả thiết.** Hai mục tiêu khả vi $F$, $G$ trên $\mathbb R^p$ và một vectơ $\varpi\in\mathbb R^p$ với mọi tọa độ dương sao cho $\nabla F(\theta)=\varpi\odot\nabla G(\theta)$ với mọi $\theta$. Chạy cùng một trong ba thuật toán AdaGrad, RMSProp, Adam, với gradient đầy đủ, cùng điểm đầu, cùng siêu tham số, và $\varepsilon=0$, trên $F$ và trên $G$; giả sử mọi mẫu số dương.

**Kết luận.** Hai quỹ đạo trùng nhau: $\theta_t^F=\theta_t^G$ với mọi $t$.

**Điều kiện áp dụng.** Cần thừa số $\varpi$ cố định, dương, theo tọa độ; cần $\varepsilon=0$, hoặc $\varepsilon$ nhỏ so với mọi mẫu số để kết luận đúng gần đúng.

**Phạm vi.** Mệnh đề không đúng cho giảm gradient: bước $-\eta\,\varpi\odot g$ khác $-\eta g$. Mệnh đề không áp dụng khi hai gradient liên hệ bằng một ma trận không chéo.
:::

::: proof Chứng minh Mệnh đề 06.11
**Bước 1 (một vòng).** Giả sử $\theta_{t-1}^F=\theta_{t-1}^G$ và các trạng thái liên hệ bởi $m^F_{t-1}=\varpi\odot m^G_{t-1}$, $v^F_{t-1}=\varpi\odot\varpi\odot v^G_{t-1}$. Khi đó $g_t^F=\varpi\odot g_t^G$, và các bước cập nhật trạng thái là tuyến tính theo $g_t$ và theo $g_t\odot g_t$, nên quan hệ giữ ở vòng $t$, kể cả sau hiệu chỉnh.

**Bước 2 (bước bằng nhau).** Vì mọi tọa độ của $\varpi$ dương, $\sqrt{\varpi\odot\varpi\odot v}=\varpi\odot\sqrt v$. Với AdaGrad, RMSProp, tử số $\varpi\odot g_t^G$ chia cho $\varpi\odot\sqrt{v^G_t}$ cho đúng bước của $G$; với Adam, $\varpi\odot\widehat m_t^G$ chia cho $\varpi\odot\sqrt{\widehat v^G_t}$ cũng vậy. Do đó $d^F_t=d^G_t$ và $\theta^F_t=\theta^G_t$.

**Bước 3 (quy nạp).** Ở $t=0$, cùng điểm đầu và trạng thái bằng $0$ thỏa giả thiết của Bước 1. $\square$
:::

Áp vào hàm của Ví dụ 06.1: $\nabla F(\theta)=(1,9)^T\odot\nabla G(\theta)$ với $G(\theta)=\tfrac12\lVert\theta\rVert^2$, hàm có số điều kiện $1$. Theo mệnh đề, AdaGrad, RMSProp và Adam đi trên $F$ đúng như trên $G$: số điều kiện $9$, hay $10^4$, không ảnh hưởng tới quỹ đạo. Tình huống 06.1 kiểm điều này trên một bài hồi quy có số điều kiện $100$.

Điều kiện "thừa số theo tọa độ" là chỗ giới hạn. Khi Hessian có phần tử ngoài đường chéo, độ cong ghép các tọa độ lại với nhau, và không thừa số chéo nào gỡ được. Ví dụ sau dùng một ma trận như vậy, xuyên suốt Mục 3 và Mục 4.

::: example Ví dụ 06.9 (Dạng toàn phương nghiêng)
**Dữ kiện.** $Q=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ và dạng toàn phương $z^TQz$ trên $\mathbb R^2$.

**Khai triển.** $z^TQz=2[z]_1^2+2[z]_1[z]_2+2[z]_2^2$. Hạng chéo $2[z]_1[z]_2$ sinh từ $Q_{12}=Q_{21}=1$.

**Giá trị riêng.** $Q(1,1)^T=(3,3)^T$ và $Q(1,-1)^T=(1,-1)^T$, nên $Q$ có giá trị riêng $3$ theo hướng $(1,1)$ và $1$ theo hướng $(1,-1)$; $Q\succ0$ và $\kappa(Q)=3$.

**Hình dạng.** Đường mức $z^TQz=1$ là elip có bán trục $1/\sqrt3$ theo $(1,1)$ và $1$ theo $(1,-1)$, nghiêng $45^\circ$ so với hai trục tọa độ.

**Kiểm tra lại.** Tại $z=(1,1)$, khai triển cho $2+2+2=6$, đúng bằng $3\lVert(1,1)\rVert^2$. Tại $z=(1,-1)$, khai triển cho $2-2+2=2$, đúng bằng $\lVert(1,-1)\rVert^2$.
:::

![Đường đồng mức elip nghiêng 45 độ của dạng toàn phương với ma trận Q có hàng (2,1) và (1,2), trên hai trục θ₁, θ₂ từ −1 đến 1. Hai trục riêng được vẽ và ghi nhãn (1; 1), hướng elip hẹp ứng với giá trị riêng 3, và (1; −1), hướng elip rộng ứng với giá trị riêng 1.](img/lec-06/tilted-curvature.svg)

Hình vẽ các đường mức của $z^TQz$; hai trục $\theta_1$, $\theta_2$ trên hình ứng với $[z]_1$, $[z]_2$. Trục chính của các elip nằm theo hai hướng riêng, không song song trục tọa độ. Một ma trận chéo $\operatorname{diag}(a,b)$ cho dạng $a[z]_1^2+b[z]_2^2$ không có hạng chéo, nên đường mức của nó luôn có trục song song trục tọa độ; mệnh đề sau lượng hóa điều đó.

::: proposition Mệnh đề 06.12 (Không thang chéo nào làm $Q$ cân hơn)
**Giả thiết.** $Q$ như Ví dụ 06.9; $D=\operatorname{diag}(a,b)$ với $a,b>0$.

**Kết luận.** Số điều kiện của $D^{-1/2}QD^{-1/2}$ thỏa $\kappa\bigl(D^{-1/2}QD^{-1/2}\bigr)\ge3=\kappa(Q)$, với dấu bằng khi và chỉ khi $a=b$.

**Điều kiện áp dụng.** Mọi thang chéo dương.

**Phạm vi.** Mệnh đề nói về ma trận $Q$ cụ thể. Với Hessian chéo, như ở Ví dụ 06.1, thang chéo đưa số điều kiện về $1$.
:::

::: proof Chứng minh Mệnh đề 06.12
**Bước 1 (vết và định thức).** $\widetilde Q=D^{-1/2}QD^{-1/2}=\begin{bmatrix}2/a&1/\sqrt{ab}\\1/\sqrt{ab}&2/b\end{bmatrix}$ đối xứng xác định dương, với vết $\tfrac2a+\tfrac2b$ và định thức $\tfrac4{ab}-\tfrac1{ab}=\tfrac3{ab}$. Gọi hai giá trị riêng là $\lambda_{\max}\ge\lambda_{\min}>0$ và $\kappa=\lambda_{\max}/\lambda_{\min}$.

**Bước 2 (một đồng nhất thức).**

$$
\begin{aligned}
\kappa+\frac1\kappa+2&=\frac{(\lambda_{\max}+\lambda_{\min})^2}{\lambda_{\max}\lambda_{\min}}\\
&=\frac{4\bigl(\frac1a+\frac1b\bigr)^2ab}{3}\\
&=\frac{4(a+b)^2}{3ab}.
\end{aligned}
$$

Dòng đầu là khai triển $(\lambda_{\max}+\lambda_{\min})^2$ chia cho tích; dòng hai thay vết và định thức của Bước 1.

**Bước 3 (chặn dưới).** Theo bất đẳng thức trung bình cộng và trung bình nhân, $(a+b)^2\ge4ab$, dấu bằng khi $a=b$. Do đó $\kappa+\tfrac1\kappa\ge\tfrac{16}3-2=\tfrac{10}3$. Hàm $\kappa\mapsto\kappa+\tfrac1\kappa$ đồng biến trên $[1,\infty)$ và bằng $\tfrac{10}3$ tại $\kappa=3$, nên $\kappa\ge3$. $\square$
:::

Mệnh đề nói rằng với ma trận nghiêng $Q$, đổi thang từng tọa độ theo bất kỳ cách nào cũng không làm bài toán cân hơn chính $Q$. Theo Nhận xét 04.16, giảm gradient với ma trận phạt $D$ là giảm gradient trong hệ tọa độ đổi biến $\theta=D^{-1/2}\varphi$, và Hessian trong hệ tọa độ đó là $D^{-1/2}QD^{-1/2}$. Vậy ba phương pháp của mục này, vốn dùng ma trận phạt chéo, không thể sửa độ cong ghép của $Q$; muốn sửa cần phần tử ngoài đường chéo.

Theo Mệnh đề 06.11, thang đo khác nhau theo trục tọa độ không ảnh hưởng tới quỹ đạo của ba phương pháp. Theo Mệnh đề 06.12, độ cong nghiêng so với trục thì không thang chéo nào sửa được.

**Trong học máy.** Với hồi quy tuyến tính trên ma trận dữ liệu $X$ có $N$ hàng, Hessian của mất mát bình phương trung bình là $\tfrac1NX^TX$. Ma trận này chéo khi các cột đặc trưng trực giao, và có phần tử ngoài đường chéo khi hai đặc trưng tương quan. Đổi đơn vị đo một đặc trưng chỉ nhân cột tương ứng với một số, đúng loại thay đổi mà Mệnh đề 06.11 loại bỏ; đặc trưng tương quan tạo Hessian nghiêng, loại mà Mệnh đề 06.12 chỉ ra là thống kê chéo không sửa được. Tình huống 06.1 so hai trường hợp trên cùng một bài hồi quy.

::: exercise Bài tập 06.2
Một tham số vô hướng nhận dãy gradient $g_1=3$, $g_2=-1$, $g_3=0$. Dùng $\eta=1$ và bỏ $\varepsilon$ khi mẫu số dương.

- (a) Tính $v_t$ và $d_t$, $t=1,2,3$, của AdaGrad.
- (b) Tính cùng các đại lượng của RMSProp với $\rho=0{,}8$. So bước đầu với cận của Mệnh đề 06.7(d).
- (c) Tính $m_t$, $v_t$, $\widehat m_t$, $\widehat v_t$, $d_t$ của Adam với $\beta_1=0{,}5$, $\beta_2=0{,}8$. Xác định vòng mà bước Adam không phải hướng giảm của gradient hiện tại.
:::

::: hint
Ở (c), hệ số hiệu chỉnh ở vòng $t$ là $1-0{,}5^t$ và $1-0{,}8^t$. Một bước $d_t$ là hướng giảm của gradient hiện tại khi $g_td_t<0$.
:::

::: solution
**Câu (a).**

| $t$ | $g_t$ | $v_t$ | $d_t$ |
|---|---|---|---|
| $1$ | $3$ | $9$ | $-3/3=-1$ |
| $2$ | $-1$ | $10$ | $1/\sqrt{10}\approx0{,}3162$ |
| $3$ | $0$ | $10$ | $0$ |

**Câu (b).**

- $v_1=0{,}2\cdot9=1{,}8$ và $d_1=-3/\sqrt{1{,}8}$, tức $d_1=-\sqrt5\approx-2{,}2361$.
- $v_2=0{,}8\cdot1{,}8+0{,}2\cdot1=1{,}64$ và $d_2=1/\sqrt{1{,}64}\approx0{,}7809$.
- $v_3=0{,}8\cdot1{,}64=1{,}312$ và $d_3=0$.

Cận của Mệnh đề 06.7(d) là $\eta/\sqrt{1-\rho}=1/\sqrt{0{,}2}=\sqrt5$; bước đầu đạt đúng cận vì $\varepsilon=0$ và $v_1=(1-\rho)g_1^2$.

**Câu (c).**

| $t$ | $m_t$ | $v_t$ | $\widehat m_t$ | $\widehat v_t$ | $d_t$ |
|---|---|---|---|---|---|
| $1$ | $1{,}5$ | $1{,}8$ | $3$ | $9$ | $-1$ |
| $2$ | $0{,}25$ | $1{,}64$ | $\tfrac13$ | $\tfrac{41}9$ | $-1/\sqrt{41}\approx-0{,}1562$ |
| $3$ | $0{,}125$ | $1{,}312$ | $\tfrac17$ | $\tfrac{164}{61}$ | $\approx-0{,}0871$ |

Ở vòng 2, $g_2=-1<0$ nhưng $d_2<0$, nên $g_2d_2\approx0{,}156>0$: bước không phải hướng giảm của gradient hiện tại, đúng cơ chế của Mệnh đề 06.10 với $\varsigma=\tfrac13<\beta_1$ sau khi chia cho $g_1=3$. Ở vòng 3, $g_3=0$ nên câu hỏi về dấu không đặt ra, nhưng Adam vẫn dịch tham số.

**Kiểm tra lại.** Vòng 2: $m_2=0{,}5\cdot1{,}5+0{,}5\cdot(-1)=0{,}25$; $1-0{,}5^2=0{,}75$, nên $\widehat m_2=\tfrac13$. $v_2=0{,}8\cdot1{,}8+0{,}2\cdot1=1{,}64$; $1-0{,}8^2=0{,}36$, nên $\widehat v_2=\tfrac{1{,}64}{0{,}36}=\tfrac{41}9$. Vòng 3: $\widehat m_3=\tfrac{0{,}125}{0{,}875}=\tfrac17$, $\widehat v_3=\tfrac{1{,}312}{0{,}488}=\tfrac{164}{61}$.
:::

**Chuỗi suy luận của mục.** Định nghĩa 06.5 chuyển một thống kê không âm thành ma trận phạt chéo, nên mọi bước của mục là trường hợp của Mệnh đề 06.3. Thuật toán 06.1 và Mệnh đề 06.6 cho tổng tích lũy, với bước học hiệu dụng chỉ giảm. Thuật toán 06.2 và Mệnh đề 06.7 thay bằng trung bình mũ có tổng trọng số $1-\rho^t$.

Thuật toán 06.3 và Mệnh đề 06.9 hiệu chỉnh tổng trọng số và thêm moment bậc nhất; Mệnh đề 06.10 chỉ ra giới hạn của tử số mới. Kết quả đích là cặp Mệnh đề 06.11, Mệnh đề 06.12, cho phạm vi của thống kê chéo: thang đo theo trục được loại bỏ, độ cong ghép thì không.

**Kết mục.** Mục đã cho ba bộ tối ưu chỉ cần gradient và $O(p)$ bộ nhớ, bất biến với thang theo tọa độ (Mệnh đề 06.11). Giới hạn còn lại là Mệnh đề 06.12, theo đó với Hessian nghiêng như $Q$, không ma trận chéo nào tạo được hướng tới nghiệm. Mục 3 dùng chính Hessian, gồm cả phần tử ngoài đường chéo, làm ma trận phạt, và giải quyết hai trở ngại kéo theo: Hessian có thể bất định, và giải hệ với Hessian tốn $O(p^3)$.

## 3. Độ cong và hệ Newton

Theo Mệnh đề 06.12, trên dạng toàn phương nghiêng $Q$, không ma trận phạt chéo nào làm bài toán cân hơn: với $F(\theta)=\tfrac12\theta^TQ\theta$, từ $\theta_0=(1,0)^T$, hướng $-g=(-2,-1)^T$ lệch $26{,}6^\circ$ so với hướng tới nghiệm $(-1,0)^T$. Mục này dùng chính Hessian làm ma trận phạt: bước Newton, giảm chấn cho Hessian bất định, gradient liên hợp để giải hệ chỉ bằng tích ma trận với vectơ, và phương pháp Newton–CG ghép các thành phần đó.

### 3.1 Nhu cầu: tương tác độ cong giữa các tọa độ

Ví dụ sau đo độ lệch giữa hướng âm gradient và hướng tới nghiệm trên hàm có Hessian $Q$.

::: example Ví dụ 06.10 (Hướng âm gradient trên hàm nghiêng)
**Dữ kiện.** $F(\theta)=\tfrac12\theta^TQ\theta$ với $Q=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ (Ví dụ 06.9), điểm đầu $\theta_0=(1,0)^T$, nghiệm $\theta^*=0$.

**Gradient.** $\nabla F(\theta)=Q\theta$, tức $\partial_1F=2[\theta]_1+[\theta]_2$ và $\partial_2F=[\theta]_1+2[\theta]_2$. Tại $\theta_0$: $g=(2,1)^T$. Thành phần $[g]_2=1$ xuất hiện dù $[\theta_0]_2=0$, vì $[\theta]_1$ đi vào $\partial_2F$ qua $Q_{21}=1$.

**Góc lệch.** Hướng tới nghiệm là $\theta^*-\theta_0=(-1,0)^T$. Cosin của góc giữa $-g$ và $(-1,0)^T$ là $\tfrac{2}{\sqrt5\cdot1}=\tfrac2{\sqrt5}\approx0{,}894$, tức góc khoảng $26{,}6^\circ$.

**Ma trận phạt chéo.** Với $D=\operatorname{diag}(a,b)$, $a,b>0$, hướng $-D^{-1}g=(-2/a,\,-1/b)^T$ có thành phần thứ hai khác $0$, nên không cùng phương với $(-1,0)^T$.

**Kiểm tra lại.** $Q\theta_0=(2\cdot1+0,\;1+0)^T=(2,1)^T$; $\arccos(0{,}894)\approx26{,}6^\circ$.
:::

![Đường đồng mức elip nghiêng của hàm bậc hai với ma trận Q, trên hai trục θ₁, θ₂ từ −1 đến 1. Điểm θ₀ nằm trên trục hoành tại (1, 0). Mũi tên ghi "hướng −g" chỉ theo phương (−2, −1), được thu ngắn theo tỷ lệ 5/8 để vừa khung; mũi tên ghi d chỉ từ θ₀ về gốc tọa độ theo phương (−1, 0).](img/lec-06/newton-direction.svg)

Hình đặt hai mũi tên tại $\theta_0$; hai trục $\theta_1$, $\theta_2$ trên hình là $[\theta]_1$, $[\theta]_2$. Mũi tên $-g$ vuông góc với đường mức đi qua $\theta_0$ và chỉ chếch xuống, vì đường mức nghiêng. Mũi tên $d$ chỉ thẳng về nghiệm; mục tiếp theo tính nó từ $Q$.

### 3.2 Bước Newton

Trực giác, chưa phải phát biểu hình thức: nếu ma trận phạt chứa đúng độ cong của hàm, kể cả phần ghép giữa các tọa độ, thì bài toán con (1.3) trùng với hàm cần cực tiểu, và nghiệm của bài toán con là nghiệm của hàm. Ví dụ sau thử điều đó.

::: example Ví dụ 06.11 (Một bước Newton trên hàm nghiêng)
**Dữ kiện.** $F(\theta)=\tfrac12\theta^TQ\theta$ với $Q=\begin{bmatrix}2&1\\1&2\end{bmatrix}$, điểm đầu $\theta_0=(1,0)^T$ và gradient $g=Q\theta_0=(2,1)^T$ (Ví dụ 06.10). Chọn $M=Q$ và $\eta=1$ trong (1.3).

**Hệ cần giải.** Bài toán con là $\min_d\{g^Td+\tfrac12d^TQd\}$; điều kiện đạo hàm bằng $0$ cho $Qd=-g$:

$$
\begin{cases}2[d]_1+[d]_2=-2\\{}[d]_1+2[d]_2=-1 .\end{cases}
$$

**Khử.** Lấy phương trình đầu trừ hai lần phương trình sau: vế trái $-3[d]_2$, vế phải $-2+2=0$, nên $[d]_2=0$; thay vào phương trình sau được $[d]_1=-1$.

**Điểm mới.** $\theta_1=\theta_0+d=(0,0)^T$, $F(\theta_1)=0$: một bước tới nghiệm.

**Kiểm tra lại.** $Q(-1,0)^T=(-2,-1)^T=-g$.
:::

Một bước tới nghiệm nhờ ba điều cùng lúc: mục tiêu là hàm bậc hai xác định dương, hệ được giải chính xác, và độ dài bước bằng $1$. Với mục tiêu tổng quát, bước này chính là hướng Newton của Định nghĩa 04.28: tại điểm $\theta$ với $g=\nabla F(\theta)$ và $H=\nabla^2F(\theta)\succ0$, hướng Newton là nghiệm của

$$
Hd=-g .
\tag{3.1}
$$

Theo Mệnh đề 06.3 với $M=H$, $\eta=1$, nó là nghiệm duy nhất của mô hình Taylor bậc hai và là hướng giảm khi $g\ne0$; Mệnh đề 04.29 còn cho một cách đọc khác: khi $g\ne0$, hướng Newton là hướng giảm dốc nhất theo chuẩn $\lVert d\rVert_H=\sqrt{d^THd}$. Thuật toán 04.2 lặp bước này với quay lui Armijo, và Định lý 04.34 cho hội tụ bậc hai cục bộ, với hằng số tỷ lệ thuận với hằng số Lipschitz $L_H$ của Hessian và tỷ lệ nghịch với cận dưới của các giá trị riêng của Hessian quanh nghiệm.

Chương này thêm một tính chất giải thích vì sao Newton không gặp khó khăn của Mệnh đề 06.12; Boyd và Vandenberghe (2004, mục 9.5.1) gọi nó là tính bất biến affine. Một phép tính trên Ví dụ 06.11 cho thấy tính chất đó: quay hệ tọa độ $45^\circ$ biến $Q$ thành $\operatorname{diag}(3,1)$, và bước Newton trong hệ mới, quay ngược lại, vẫn là $(-1,0)^T$.

::: proposition Mệnh đề 06.13 (Bước Newton không phụ thuộc phép đổi biến tuyến tính)
**Giả thiết.** $F$ khả vi hai lần tại $\theta$, $H=\nabla^2F(\theta)\succ0$. Ma trận $S\in\mathbb R^{p\times p}$ khả nghịch; đặt $G(\varphi)=F(S\varphi)$ và $\varphi=S^{-1}\theta$.

**Kết luận.**

- (a) Hướng Newton $d_G$ của $G$ tại $\varphi$ và hướng Newton $d_F$ của $F$ tại $\theta$ thỏa $Sd_G=d_F$. Do đó một bước Newton trên $G$, đổi về biến $\theta$, trùng một bước Newton trên $F$.
- (b) Bước giảm gradient $-\eta\nabla G(\varphi)$, đổi về biến $\theta$, là $-\eta SS^T\nabla F(\theta)$, nói chung khác $-\eta\nabla F(\theta)$.

**Điều kiện áp dụng.** $S$ khả nghịch, cố định.

**Phạm vi.** Mệnh đề nói về hướng tại một điểm; khi dùng tìm bước Armijo, độ dài bước cũng bất biến vì giá trị hàm dọc hai hướng trùng nhau.
:::

::: proof Chứng minh Mệnh đề 06.13
**Bước 1 (đạo hàm của $G$).** Theo quy tắc dây chuyền, $\nabla G(\varphi)=S^T\nabla F(S\varphi)=S^Tg$ và $\nabla^2G(\varphi)=S^THS$. Ma trận $S^THS$ xác định dương vì $z^TS^THSz=(Sz)^TH(Sz)>0$ khi $z\ne0$, do $S$ khả nghịch.

**Bước 2 (phần a).** $d_G$ thỏa $S^THSd_G=-S^Tg$. Nhân trái với $(S^T)^{-1}$ được $H(Sd_G)=-g$, tức $Sd_G$ là nghiệm của (3.1), bằng $d_F$ theo tính duy nhất.

**Bước 3 (phần b).** Bước trên $G$ là $-\eta S^Tg$; đổi về biến $\theta=S\varphi$ được $-\eta SS^Tg$. $\square$
:::

Phần (b) là cách viết khác của Nhận xét 04.16: giảm gradient trong hệ tọa độ đổi biến là giảm gradient với ma trận phạt $(SS^T)^{-1}$. Phần (a) nói Newton tự chọn ma trận phạt đúng trong mọi hệ tọa độ. Với $Q$ nghiêng, chọn $S$ là ma trận trực giao quay $45^\circ$ biến $Q$ thành $\operatorname{diag}(3,1)$; Newton cho cùng một bước trong cả hai hệ, còn thống kê chéo của Mục 2 cho các bước khác nhau.

::: remark Nhận xét 06.14 (Chi phí và phạm vi của bước Newton)
**Chi phí.** Hessian đặc có $p^2$ phần tử, và giải (3.1) bằng phân tích Cholesky tốn khoảng $\tfrac13p^3$ phép tính dấu phẩy động; với $p=10^6$, chỉ lưu Hessian đã cần $10^{12}$ số thực (Goodfellow, Bengio và Courville 2016, mục 8.6.1, tr. 313).

**Hội tụ cục bộ.** Định lý 04.34 không áp dụng khi điểm đầu xa nghiệm hoặc Hessian bất định; Mục 3.3 xét trường hợp sau.
:::

**Trong học máy.** Với hồi quy logistic có chính quy hóa, $F$ lồi mạnh và Hessian xác định dương ở mọi điểm; Tình huống 04.1 cho Newton hội tụ trong vài bước trên một bài hai tham số. Với mạng sâu, cả hai giả thiết của bước Newton bị vi phạm: $p$ quá lớn để lập $H$, và mất mát không lồi nên $H$ có thể có giá trị riêng âm. Mục 3.3 sửa giả thiết thứ hai, Mục 3.4–3.5 tránh việc lập $H$.

### 3.3 Giảm chấn cho Hessian bất định

Mệnh đề 06.3(c) cảnh báo rằng ma trận phạt có giá trị riêng âm làm bài toán con mất cực tiểu. Hessian của mất mát không lồi có thể như vậy tại điểm yên ngựa và ở lân cận nó. Ví dụ sau cho thấy hệ Newton khi đó vẫn có nghiệm, nhưng nghiệm chỉ về phía làm mục tiêu tăng.

::: example Ví dụ 06.12 (Hệ Newton tại lân cận một điểm yên ngựa)
**Dữ kiện.** $F(\theta)=\tfrac12\bigl([\theta]_1^2-[\theta]_2^2\bigr)$, có điểm yên ngựa tại gốc. Tại $\theta=(0,1)^T$: $F=-\tfrac12$, $g=(0,-1)^T$, $H=\operatorname{diag}(1,-1)$.

**Hệ Newton.** $Hd=-g$ cho $-[d]_2=1$ và $[d]_1=0$, tức $d=(0,-1)^T$, với $g^Td=1>0$: hướng tăng. Bước đầy đủ tới $(0,0)$, nơi $F=0>-\tfrac12$.

**Giảm chấn $\tau=2$.** $H+2\mathrm I=\operatorname{diag}(3,1)\succ0$. Hệ $(H+2\mathrm I)d=-g$ cho $d=(0,1)^T$, với $g^Td=-1<0$: hướng giảm.

**Giảm chấn $\tau=\tfrac12$.** $H+\tfrac12\mathrm I=\operatorname{diag}(\tfrac32,-\tfrac12)$ vẫn có giá trị riêng âm. Nghiệm $d=(0,-2)^T$ có $g^Td=2>0$.

**Kiểm tra lại.** Với $\tau=2$: $\operatorname{diag}(3,1)(0,1)^T=(0,1)^T=-g$.
:::

Bước Newton đầy đủ đưa tham số tới đúng điểm yên ngựa: hệ (3.1) tìm điểm dừng của mô hình bậc hai mà không phân biệt cực tiểu với điểm yên ngựa. Cộng một bội của ma trận đơn vị đổi dấu giá trị riêng âm, nhưng chỉ khi bội đó đủ lớn.

::: definition Định nghĩa 06.15 (Hệ Newton giảm chấn)
Cho $g=\nabla F(\theta)$, $H=\nabla^2F(\theta)$ đối xứng và hệ số giảm chấn (damping) $\tau\ge0$. Hệ Newton giảm chấn là

$$
(H+\tau\mathrm I)\,d=-g .
\tag{3.2}
$$

Khi $H+\tau\mathrm I\succ0$, nghiệm $d_\tau=-(H+\tau\mathrm I)^{-1}g$ gọi là bước Newton giảm chấn.
:::

Hệ (3.2) là bài toán con (1.3) với $M=H+\tau\mathrm I$ và $\eta=1$; số hạng $\tau\mathrm I$ cộng vào mức phạt $\tfrac\tau2\lVert d\rVert^2$ theo mọi hướng. Với $\tau=0$, (3.2) là hệ Newton (3.1). Cách sửa này có trong Goodfellow, Bengio và Courville (2016, công thức 8.28, tr. 312), nơi hệ số ký hiệu $\alpha$, và trong Nocedal và Wright (2006, mục 3.4).

::: proposition Mệnh đề 06.16 (Giảm chấn và tính xác định dương)
**Giả thiết.** $H$ đối xứng với phân tích phổ $H=\sum_{j=1}^p\lambda_ju_ju_j^T$, các $u_j$ trực chuẩn; $g\ne0$.

**Kết luận.**

- (a) $H+\tau\mathrm I$ có cùng các vectơ riêng $u_j$, với giá trị riêng $\lambda_j+\tau$.
- (b) $H+\tau\mathrm I\succ0$ khi và chỉ khi $\tau>-\lambda_{\min}(H)$.
- (c) Với $\tau>\max\{0,-\lambda_{\min}(H)\}$, $d_\tau$ là hướng giảm, và

$$
\lVert d_\tau\rVert^2=\sum_{j=1}^p\frac{(u_j^Tg)^2}{(\lambda_j+\tau)^2}
\tag{3.3}
$$

giảm thực sự theo $\tau$.
- (d) $\tau d_\tau\to-g$ khi $\tau\to\infty$.

**Điều kiện áp dụng.** $H$ đối xứng; không cần $F$ lồi.

**Phạm vi.** Mệnh đề không chọn $\tau$; nó không nói bước $d_\tau$ làm $F$ giảm, chỉ nói $d_\tau$ là hướng giảm.
:::

::: proof Chứng minh Mệnh đề 06.16
**Bước 1 (phần a).** $(H+\tau\mathrm I)u_j=\lambda_ju_j+\tau u_j=(\lambda_j+\tau)u_j$.

**Bước 2 (phần b).** Ma trận đối xứng xác định dương khi và chỉ khi mọi giá trị riêng dương; theo (a), điều đó là $\lambda_j+\tau>0$ với mọi $j$, tức $\tau>-\lambda_{\min}(H)$.

**Bước 3 (phần c).** Khi $H+\tau\mathrm I\succ0$, Mệnh đề 06.3(b) cho $g^Td_\tau<0$. Khai triển $g=\sum_j(u_j^Tg)u_j$ cho $d_\tau=-\sum_j\frac{u_j^Tg}{\lambda_j+\tau}u_j$; tính trực chuẩn cho (3.3). Mỗi số hạng có $\lambda_j+\tau>0$ tăng theo $\tau$, nên giảm theo $\tau$; ít nhất một số hạng khác $0$ vì $g\ne0$.

**Bước 4 (phần d).** $\tau d_\tau=-\sum_j\frac{\tau}{\lambda_j+\tau}(u_j^Tg)u_j$, và mỗi hệ số $\tfrac\tau{\lambda_j+\tau}\to1$. $\square$
:::

Phần (b) cho điều kiện chọn $\tau$. Một số dương bất kỳ chưa đủ; $\tau$ phải vượt độ lớn của giá trị riêng âm nhất.

Phần (c) và (d) cho thấy $\tau$ điều khiển vị trí giữa hai phương pháp. Với $\tau$ nhỏ, bước gần bước Newton; với $\tau$ lớn, bước gần $-g/\tau$, tức giảm gradient với bước học $1/\tau$, và bước ngắn dần khi $\tau$ tăng.

Áp vào Ví dụ 06.12, nơi $\lambda_{\min}=-1$:

- cần $\tau>1$, nên $\tau=\tfrac12$ không đủ và $\tau=2$ đủ;
- với $\tau=10$, $d=(0,\tfrac19)^T$, gần $-g/10=(0,\tfrac1{10})^T$.

**Trong học máy.** Goodfellow, Bengio và Courville (2016, mục 8.6.1, tr. 312) nêu cái giá của giảm chấn trên mạng sâu: khi Hessian có giá trị riêng âm lớn về độ lớn, $\tau$ phải lớn, và theo (3.3) bước Newton giảm chấn có thể ngắn hơn bước của giảm gradient với bước học chọn tốt. Martens (2010, mục 4.1) điều chỉnh $\tau$ ở mỗi vòng theo tỷ số giữa mức giảm thật của $F$ và mức giảm dự báo bởi mô hình bậc hai: tăng $\tau$ lên $\tfrac32$ lần khi tỷ số nhỏ hơn $\tfrac14$, giảm còn $\tfrac23$ khi tỷ số lớn hơn $\tfrac34$. Cũng ở đó (mục 4.2), Hessian được thay bằng ma trận Gauss–Newton, luôn nửa xác định dương, nên mọi $\tau>0$ đều cho ma trận xác định dương.

### 3.4 Gradient liên hợp

Bước Newton giảm chấn đòi giải một hệ $p\times p$ đối xứng xác định dương. Giải bằng phân tích tốn $O(p^3)$ và cần lập ma trận; nhưng vi phân tự động (automatic differentiation) tính được tích Hessian–vectơ $Hz$ với chi phí cùng bậc vài lần tính gradient, mà không lập $H$ (Pearlmutter 1994). Câu hỏi là giải hệ $Ad=b$, với $A=H+\tau\mathrm I$, chỉ bằng các tích $Az$.

Giải hệ $Ad=b$ với $A\succ0$ tương đương cực tiểu hàm bậc hai

$$
\phi(d)=\tfrac12d^TAd-b^Td ,
\tag{3.4}
$$

vì $\nabla\phi(d)=Ad-b$ bằng $0$ đúng tại nghiệm và $\phi$ lồi chặt. Vectơ $r=b-Ad=-\nabla\phi(d)$ gọi là phần dư (residual).

Giảm gradient trên $\phi$ với tìm bước chính xác, tức chọn độ dài bước cực tiểu $\phi$ dọc hướng đang xét, đi theo đường zích zắc. Mỗi hướng mới vuông góc với hướng cũ, và bước theo hướng mới làm mất phần đã cực tiểu theo hướng cũ (Goodfellow, Bengio và Courville 2016, hình 8.6, tr. 314). Trực giác, chưa phải phát biểu hình thức: nếu chọn các hướng sao cho cực tiểu theo hướng mới giữ nguyên cực tiểu theo các hướng cũ, thì sau $p$ hướng độc lập ta đã cực tiểu trên toàn không gian.

::: example Ví dụ 06.13 (Hai vòng gradient liên hợp)
**Dữ kiện.** $A=\operatorname{diag}(1,4)$, $b=(1,1)^T$, điểm đầu $d_0=0$. Nghiệm chính xác $(1,\tfrac14)^T$. Chỉ số $k$ đếm vòng giải hệ, tách khỏi vòng huấn luyện $t$.

**Vòng 0.** $r_0=b-Ad_0=(1,1)^T$, hướng $q_0=r_0$. Cực tiểu $\phi$ dọc $d_0+\alpha q_0$ cho

$$
\alpha_0=\frac{r_0^Tr_0}{q_0^TAq_0}=\frac{2}{1+4}=\frac25 ,
$$

nên $d_1=(\tfrac25,\tfrac25)^T$ và $r_1=b-Ad_1=(\tfrac35,-\tfrac35)^T$.

**Hướng mới.** $q_1=r_1+\omega_0q_0$ với $\omega_0$ chọn để $q_0^TAq_1=0$:

$$
\omega_0=-\frac{q_0^TAr_1}{q_0^TAq_0}=-\frac{\tfrac35-\tfrac{12}5}{5}=\frac9{25},
$$

trùng với $\tfrac{r_1^Tr_1}{r_0^Tr_0}=\tfrac{18/25}{2}$. Do đó $q_1=(\tfrac{24}{25},-\tfrac6{25})^T$.

**Vòng 1.**

- $Aq_1=(\tfrac{24}{25},-\tfrac{24}{25})^T$ và $q_1^TAq_1=\tfrac{144}{125}$.
- $\alpha_1=\tfrac{18/25}{144/125}=\tfrac58$.
- $d_2=d_1+\tfrac58q_1=(1,\tfrac14)^T$, nghiệm chính xác, và $r_2=0$.

**Kiểm tra lại.** $q_0^TAq_1=\tfrac{24}{25}-\tfrac{24}{25}=0$, trong khi $q_0^Tq_1=\tfrac{18}{25}\ne0$. $r_0^Tr_1=\tfrac35-\tfrac35=0$.
:::

![Các đường đồng mức elip của q(d) = dᵀAd/2 − bᵀd với A = diag(1, 4), b = (1, 1), trên trục (d)₁ từ 0 đến 1 và trục (d)₂ từ 0 đến 0,5. Đường gấp khúc gradient liên hợp đi từ d₀ = 0 tới d₁ = (2/5; 2/5) rồi tới d₂ = (1; 1/4), tâm của các elip.](img/lec-06/cg-path.svg)

Hình vẽ đường gấp khúc $d_0\to d_1\to d_2$ trên các đường mức của $\phi$. Trên hình, hàm ký hiệu $q(d)$ chính là $\phi(d)$ của (3.4), và $(d)_1$, $(d)_2$ là hai tọa độ $[d]_1$, $[d]_2$. Đoạn thứ hai không vuông góc với đoạn thứ nhất theo nghĩa thông thường, nhưng liên hợp theo $A$; nhờ vậy đoạn thứ hai tới thẳng tâm elip thay vì đi zích zắc.

::: definition Định nghĩa 06.17 (Hướng liên hợp)
Cho $A\in\mathbb R^{p\times p}$ đối xứng xác định dương. Hai vectơ $q,q'\in\mathbb R^p$ gọi là liên hợp theo $A$ (conjugate) nếu $q^TAq'=0$.
:::

Liên hợp theo $A$ là trực giao theo tích vô hướng $\langle q,q'\rangle_A=q^TAq'$. Khi $A=\mathrm I$, liên hợp trùng trực giao thông thường; với $A\ne\mathrm I$, hai khái niệm khác nhau, như $q_0$, $q_1$ của Ví dụ 06.13. Các hướng khác $0$ đôi một liên hợp thì độc lập tuyến tính: nhân một tổ hợp bằng $0$ của chúng với $q_j^TA$ cho hệ số của $q_j$ bằng $0$.

::: algorithm Thuật toán 06.4 (Gradient liên hợp tuyến tính)
**Đầu vào.** Một hàm tính $z\mapsto Az$ với $A$ đối xứng xác định dương, cố định trong suốt lần giải; vế phải $b$; điểm đầu $d_0$; ngưỡng $\varepsilon_{\rm r}>0$; số vòng tối đa $K\ge1$.

**Khởi tạo.** $r_0=b-Ad_0$, $q_0=r_0$. Nếu $\lVert r_0\rVert\le\varepsilon_{\rm r}$: trả $d_0$.

**Các bước.** Với $k=0,1,\ldots,K-1$:

1. $\alpha_k=\dfrac{r_k^Tr_k}{q_k^TAq_k}$.
2. $d_{k+1}=d_k+\alpha_kq_k$ và $r_{k+1}=r_k-\alpha_kAq_k$.
3. Nếu $\lVert r_{k+1}\rVert\le\varepsilon_{\rm r}$ hoặc $k+1=K$: trả $d_{k+1}$.
4. $\omega_k=\dfrac{r_{k+1}^Tr_{k+1}}{r_k^Tr_k}$ và $q_{k+1}=r_{k+1}+\omega_kq_k$.

**Chi phí.** Mỗi vòng một tích $Aq_k$, dùng chung cho bước 1 và bước 2, cùng $O(p)$ phép toán vectơ; bộ nhớ phụ là bốn vectơ.
:::

Bước 2 cập nhật phần dư bằng $r_{k+1}=r_k-\alpha_kAq_k$ thay cho $b-Ad_{k+1}$ để không tính thêm một tích. Bước 3 kiểm dừng trước bước 4: nếu $r_{k+1}=0$ mà vẫn tính tiếp, $q_{k+1}=0$ và $\alpha_{k+1}$ là phép chia $0/0$. Ngưỡng tuyệt đối $\varepsilon_{\rm r}$ là một lựa chọn; Shewchuk (1994, phụ lục B2, tr. 50) so phần dư với phần dư ban đầu. Định lý sau là cơ sở của thuật toán; nó cần định nghĩa liên hợp và tính xác định dương của $A$.

::: theorem Định lý 06.18 (Tính chất của gradient liên hợp)
**Giả thiết.** $A\in\mathbb R^{p\times p}$ đối xứng xác định dương; Thuật toán 06.4 chạy trong số học chính xác, không dừng theo ngưỡng; với một chỉ số $k$ nào đó, $r_0,\ldots,r_k$ đều khác $0$.

**Kết luận.**

- (a) Với mọi $0\le j\le k$: $r_j=b-Ad_j$, tức $r_j=-\nabla\phi(d_j)$.
- (b) Với mọi $0\le i<j\le k$: $r_j^Tr_i=0$.
- (c) Với mọi $0\le i<j\le k$: $q_j^TAq_i=0$; với mọi $j\le k$: $q_j\ne0$.
- (d) Với mọi $0\le i<j\le k+1$: $r_j^Tq_i=0$; với mọi $j\le k$: $r_j^Tq_j=r_j^Tr_j$.
- (e) Với mọi $0\le j\le k$: $\phi(d_{j+1})=\phi(d_j)-\dfrac{(r_j^Tr_j)^2}{2\,q_j^TAq_j}<\phi(d_j)$.
- (f) Với mọi $1\le j\le k+1$: $d_j$ là điểm cực tiểu của $\phi$ trên $d_0+\operatorname{span}\{q_0,\ldots,q_{j-1}\}$.
- (g) Nếu $K\ge p$, thuật toán gặp $r_m=0$, tức $Ad_m=b$, với một $m\le p$.

**Điều kiện áp dụng.** $A$ đối xứng xác định dương và cố định; số học chính xác.

**Phạm vi.** Với số dấu phẩy động, các quan hệ (b)–(d) mất dần và (g) không còn đúng; định lý không nói về tốc độ giảm của $\lVert r_k\rVert$.
:::

::: proof Chứng minh Định lý 06.18
**Bước 1 (phần a).** Quy nạp: $r_0=b-Ad_0$; nếu $r_j=b-Ad_j$ thì $r_{j+1}=b-Ad_j-\alpha_jAq_j=b-Ad_{j+1}$.

**Bước 2 (thuật toán xác định).** Giả sử $r_j\ne0$ và $r_j^Tq_j=r_j^Tr_j$. Khi đó $r_j^Tq_j>0$ nên $q_j\ne0$, và $q_j^TAq_j>0$ vì $A\succ0$; vậy $\alpha_j>0$ xác định. Đẳng thức $r_j^Tq_j=r_j^Tr_j$ sẽ được chứng minh ở Bước 3.

**Bước 3 (phần b, c, d bằng quy nạp).** Gọi $\mathcal I_j$ là mệnh đề quy nạp: (b), (c), (d) đúng cho mọi cặp chỉ số $i<j'\le j$, và $r_{j'}^Tq_{j'}=r_{j'}^Tr_{j'}$ với mọi $j'\le j$. $\mathcal I_0$ đúng vì $q_0=r_0$. Giả sử $\mathcal I_j$ đúng và $r_{j+1}\ne0$. Ta chứng minh $\mathcal I_{j+1}$ theo sáu ý.

1. $r_{j+1}^Tq_j=r_j^Tq_j-\alpha_jq_j^TAq_j$; theo công thức $\alpha_j$ và $r_j^Tq_j=r_j^Tr_j$, hai số hạng bằng nhau, nên tích bằng $0$.
2. Với $i<j$: $r_{j+1}^Tq_i=r_j^Tq_i-\alpha_jq_j^TAq_i=0-0$, theo $\mathcal I_j$.
3. Theo bước 4 của thuật toán, $q_i\in\operatorname{span}\{r_0,\ldots,r_i\}$ và $r_i=q_i-\omega_{i-1}q_{i-1}$, nên hai không gian $\operatorname{span}\{q_0,\ldots,q_j\}$ và $\operatorname{span}\{r_0,\ldots,r_j\}$ trùng nhau. Theo ý 1, 2, $r_{j+1}$ trực giao với không gian đó, nên $r_{j+1}^Tr_i=0$ với $i\le j$.
4. Theo bước 2 của thuật toán, $Aq_i=(r_i-r_{i+1})/\alpha_i$. Với $i<j$, ý 3 cho $r_{j+1}^TAq_i=(r_{j+1}^Tr_i-r_{j+1}^Tr_{i+1})/\alpha_i=0$; cùng với $q_j^TAq_i=0$ theo $\mathcal I_j$, tích $q_{j+1}^TAq_i=r_{j+1}^TAq_i+\omega_jq_j^TAq_i$ bằng $0$.
5. Với $i=j$:

    $$
\begin{aligned}
q_{j+1}^TAq_j&=r_{j+1}^TAq_j+\omega_j\,q_j^TAq_j\\
&=-\frac{r_{j+1}^Tr_{j+1}}{\alpha_j}+\omega_j\frac{r_j^Tr_j}{\alpha_j}\\
&=0 .
\end{aligned}
$$

    Dòng hai dùng $r_{j+1}^TAq_j=(r_{j+1}^Tr_j-r_{j+1}^Tr_{j+1})/\alpha_j$ với $r_{j+1}^Tr_j=0$, và $q_j^TAq_j=r_j^Tr_j/\alpha_j$. Dòng ba dùng định nghĩa của $\omega_j$.
6. $r_{j+1}^Tq_{j+1}=r_{j+1}^Tr_{j+1}+\omega_jr_{j+1}^Tq_j=r_{j+1}^Tr_{j+1}$ theo ý 1. Cùng với Bước 2, $q_{j+1}\ne0$.

Ý 1 và ý 2 chỉ dùng $\mathcal I_j$, không dùng $r_{j+1}\ne0$. Áp hai ý đó với $j=k$ được $r_{k+1}^Tq_i=0$ với mọi $i\le k$, tức phần (d) với $j=k+1$.

**Bước 4 (phần e).** Với mọi $d$, $q$ và số $\alpha$, khai triển (3.4) và dùng $\nabla\phi(d)=-r$:

$$
\phi(d+\alpha q)=\phi(d)-\alpha\,q^Tr+\tfrac12\alpha^2q^TAq .
$$

Thay $d=d_j$, $q=q_j$, $\alpha=\alpha_j$ và $q_j^Tr_j=r_j^Tr_j$ được (e).

**Bước 5 (phần f).** Đặt $\Phi(\upsilon)=\phi\bigl(d_0+\sum_{i<j}[\upsilon]_iq_i\bigr)$ với $\upsilon\in\mathbb R^j$; $\Phi$ lồi vì là hợp của hàm lồi $\phi$ với một ánh xạ affine. Điểm $d_j$ ứng với $[\upsilon]_i=\alpha_i$. Theo quy tắc dây chuyền và (d), với $j\le k+1$, đạo hàm riêng thứ $i$ của $\Phi$ tại đó là $\nabla\phi(d_j)^Tq_i=-r_j^Tq_i=0$. Theo Hệ quả 01.27, điểm có gradient bằng $0$ của hàm lồi khả vi là cực tiểu, nên $d_j$ là cực tiểu của $\phi$ trên tập đã nêu.

**Bước 6 (phần g).** Theo (b), các phần dư khác $0$ đôi một trực giao, nên độc lập tuyến tính; trong $\mathbb R^p$ có nhiều nhất $p$ vectơ như vậy. Nếu $r_0,\ldots,r_{p-1}$ đều khác $0$ thì chúng là một cơ sở, và $r_p$ trực giao với cả cơ sở, nên $r_p=0$. Với $K\ge p$, thuật toán không dừng vì ngân sách trước vòng thứ $p$; theo (a), $Ad_m=b$ tại chỉ số $m$ đầu tiên có $r_m=0$. $\square$
:::

- Phần (b) và (c) là các bất biến mà thuật toán duy trì chỉ bằng hai hệ số vô hướng $\alpha_k$, $\omega_k$ mỗi vòng: phần dư trực giao, hướng liên hợp.
- Phần (e) cho $\phi$ giảm thực sự ở mỗi vòng, tính chất mà chuẩn phần dư không có. Martens (2010, mục 4.4) ghi nhận $\lVert r_k\rVert$ có thể dao động mạnh trong khi $\phi(d_k)$ giảm đều.
- Theo phần (f) và (g), sau $j$ vòng, $d_j$ tốt nhất trên một không gian $j$ chiều; sau nhiều nhất $p$ vòng, không gian là toàn bộ $\mathbb R^p$.

Áp vào Ví dụ 06.13, với $p=2$, nghiệm đạt sau hai vòng, đúng (g). Ba giá trị của $\phi$ là:

- $\phi(d_0)=0$;
- $\phi(d_1)=-\tfrac25$, khớp mức giảm $\tfrac{2^2}{2\cdot5}=\tfrac25$ của (e) ở vòng 0;
- $\phi(d_2)=-\tfrac58$, khớp mức giảm $\tfrac{(18/25)^2}{2\cdot144/125}=\tfrac9{40}$ ở vòng 1.

::: remark Nhận xét 06.19 (Tốc độ và số học dấu phẩy động)
**Tốc độ.** Kết luận (g) có ích khi $p$ nhỏ; với $p=10^6$, chạy đủ $10^6$ vòng không khả thi. Điều dùng được trong thực hành là tốc độ giảm sai số ở các vòng đầu: với $\lVert z\rVert_A=\sqrt{z^TAz}$, sai số thỏa $\lVert d_k-d^*\rVert_A\le2\bigl(\tfrac{\sqrt\kappa-1}{\sqrt\kappa+1}\bigr)^k\lVert d_0-d^*\rVert_A$, với $\kappa$ là số điều kiện của $A$ (Nocedal và Wright 2006, mục 5.1). Hệ số $1-O(1/\sqrt\kappa)$ cùng bậc với Nesterov ở Định lý 05.23(c), nhưng không cần biết $\lambda_{\min}$, $\lambda_{\max}$ để chọn tham số.

**Số học dấu phẩy động.** Sai số làm tròn làm mất dần tính liên hợp; Shewchuk (1994) khuyến nghị thỉnh thoảng tính lại phần dư bằng $b-Ad_k$. Nếu gặp $q_k^TAq_k\le0$, giả thiết $A\succ0$ không còn đúng, và Nocedal và Wright (2006, mục 7.1) dừng gradient liên hợp, trả nghiệm gần đúng trước đó.
:::

### 3.5 Phương pháp Newton–CG

Mục 3.3 cho hệ (3.2) với ma trận xác định dương khi $\tau$ đủ lớn; Mục 3.4 cho cách giải hệ đó chỉ bằng tích ma trận–vectơ. Ghép hai thành phần, cùng quay lui Armijo, được phương pháp Newton–CG, trong Martens (2010) gọi là tối ưu không dùng Hessian (Hessian-free optimization). Mệnh đề sau xét nghiệm gần đúng khi gradient liên hợp dừng sớm, và cho biết nó vẫn là hướng giảm.

::: proposition Mệnh đề 06.20 (Nghiệm gần đúng của gradient liên hợp là hướng giảm)
**Giả thiết.** $A\succ0$, $g\ne0$, $b=-g$, $d_0=0$; Thuật toán 06.4 trong số học chính xác cho $d_1,\ldots,d_k$ với $k\ge1$.

**Kết luận.** Với mọi $k\ge1$,

$$
g^Td_k<-\tfrac12d_k^TAd_k\le0 .
\tag{3.5}
$$

**Điều kiện áp dụng.** Cần điểm đầu $d_0=0$ và $A$ xác định dương, cố định.

**Phạm vi.** Mệnh đề không nói $d_k$ gần nghiệm của hệ; dấu của $g^Td_k$ và độ lớn của $\lVert r_k\rVert$ là hai đại lượng khác nhau.
:::

::: proof Chứng minh Mệnh đề 06.20
**Bước 1 (giá trị của $\phi$).** Với $b=-g$, $\phi(d)=\tfrac12d^TAd+g^Td$ và $\phi(d_0)=\phi(0)=0$. Vì $r_0=-g\ne0$, Định lý 06.18(e) cho $\phi(d_1)<\phi(0)=0$, và các vòng sau giảm tiếp, nên $\phi(d_k)<0$ với mọi $k\ge1$.

**Bước 2 (dấu).** $g^Td_k=\phi(d_k)-\tfrac12d_k^TAd_k<-\tfrac12d_k^TAd_k\le0$; bất đẳng thức cuối dùng $A\succ0$. $\square$
:::

::: algorithm Thuật toán 06.5 (Newton–CG với giảm chấn)
**Đầu vào.** Điểm đầu $\theta_0$; cách tính $g=\nabla F(\theta)$ và tích $z\mapsto Hz$; hệ số giảm chấn $\tau$ hoặc quy tắc chỉnh $\tau$; ngưỡng $\varepsilon_{\rm r}$, số vòng trong $K$; tham số Armijo $c_1\in(0,1)$; ngưỡng gradient và ngân sách $T$.

**Các bước.** Với $t=1,2,\ldots,T$, tại $\theta=\theta_{t-1}$, giữ cố định dữ liệu dùng cho $g$ và cho tích $Hz$:

1. Tính $g$. Nếu $\lVert g\rVert$ nhỏ hơn ngưỡng: dừng, và kiểm riêng xem điểm dừng có phải cực tiểu.
2. Chạy Thuật toán 06.4 từ $d_0=0$ cho hệ $(H+\tau\mathrm I)d=-g$, dùng tích $z\mapsto Hz+\tau z$; nếu gặp $q_k^TAq_k\le0$, dừng gradient liên hợp, trả nghiệm gần đúng $d_k$ hiện có và ghi nhận $\tau$ chưa đủ lớn.
3. Kiểm hướng: nếu $g^Td\ge0$, tăng $\tau$ và quay lại bước 2, hoặc dùng $d=-g$.
4. Chọn $\alpha$ bằng quay lui Armijo theo hướng $d$; đặt $\theta_t=\theta+\alpha d$.

**Chi phí.** Mỗi vòng ngoài: một gradient, nhiều nhất $K$ tích Hessian–vectơ, các phép tính $F$ của quay lui.
:::

Bước 2 và bước 3 là hai phép kiểm khác nhau. Phần dư $\lVert r\rVert$ đo mức giải đúng hệ; dấu $g^Td$ đo hướng có giảm hay không. Mệnh đề 06.20 nói bước 3 luôn đạt khi $H+\tau\mathrm I\succ0$ và tính toán chính xác; bước 3 bảo vệ trường hợp giả thiết đó không thỏa do $\tau$ chưa đủ lớn, do sai số làm tròn, hoặc do toán tử thay đổi giữa các vòng trong. Dữ liệu được giữ cố định trong một lần giải vì Martens (2010, mục 4.3) ghi nhận đổi nhóm dữ liệu giữa các vòng gradient liên hợp phá các bất biến của Định lý 06.18.

::: example Ví dụ 06.14 (Một vòng Newton–CG tại điểm có Hessian bất định)
**Dữ kiện.** Tại một điểm có $g=(1,0)^T$ và Hessian $H=\begin{bmatrix}1&2\\2&1\end{bmatrix}$.

**Kiểm Hessian.** $H(1,1)^T=3(1,1)^T$, $H(1,-1)^T=-(1,-1)^T$: giá trị riêng $3$ và $-1$, nên $H$ bất định và cần $\tau>1$.

**Newton không giảm chấn.** $H^{-1}=-\tfrac13\begin{bmatrix}1&-2\\-2&1\end{bmatrix}$, nên $d=-H^{-1}g=(\tfrac13,-\tfrac23)^T$ và $g^Td=\tfrac13>0$: hướng tăng.

**Giảm chấn $\tau=2$.** $A=\begin{bmatrix}3&2\\2&3\end{bmatrix}$, giá trị riêng $5$ và $1$. Gradient liên hợp từ $d_0=0$ với $b=(-1,0)^T$:

| Vòng $k$ | $q_k$ | $Aq_k$ | $q_k^TAq_k$ | $\alpha_k$ | $d_{k+1}$ | $r_{k+1}$ |
|---|---|---|---|---|---|---|
| $0$ | $(-1,0)$ | $(-3,-2)$ | $3$ | $\tfrac13$ | $(-\tfrac13,0)$ | $(0,\tfrac23)$ |
| $1$ | $(-\tfrac49,\tfrac23)$ | $(0,\tfrac{10}9)$ | $\tfrac{20}{27}$ | $\tfrac35$ | $(-\tfrac35,\tfrac25)$ | $(0,0)$ |

Hướng $q_1=r_1+\omega_0q_0$ dùng $\omega_0=\tfrac{r_1^Tr_1}{r_0^Tr_0}=\tfrac49$.

**Hai phép kiểm.** Sau vòng 0, $\lVert r_1\rVert=\tfrac23$ còn lớn, nhưng $g^Td_1=-\tfrac13<0$. Sau vòng 1, phần dư bằng $0$ và $g^Td_2=-\tfrac35<0$.

**Kiểm tra lại.** Tọa độ thứ nhất của $A(-\tfrac35,\tfrac25)^T$ là $-\tfrac95+\tfrac45=-1$, tọa độ thứ hai là $-\tfrac65+\tfrac65=0$, đúng bằng $b$. Bất đẳng thức (3.5) của Mệnh đề 06.20 nói $g^Td_k<-\tfrac12d_k^TAd_k$. Với $k=1$: $d_1^TAd_1=\tfrac13$, và $g^Td_1=-\tfrac13<-\tfrac16$.
:::

**Trong học máy.** Tham số $\theta$ là trọng số mạng, $H$ là Hessian của mất mát trên một nhóm cố định, tích $Hz$ do vi phân tự động cung cấp; trong PyTorch, hàm `torch.autograd.functional.hvp` tính tích này. Giả thiết $H+\tau\mathrm I\succ0$ không được bảo đảm bởi bài toán: nó phải được tạo ra bằng cách chọn $\tau$, hoặc bằng cách thay $H$ bằng ma trận Gauss–Newton như Martens (2010). Kết luận của Mệnh đề 06.20 cho phép dừng gradient liên hợp sau ít vòng mà vẫn có hướng giảm; Tình huống 06.2 chạy phương pháp trên mạng tuyến tính hai lớp của Tình huống 04.3.

::: exercise Bài tập 06.3
Tại một điểm có $g=(2,0)^T$ và $H=\begin{bmatrix}2&3\\3&2\end{bmatrix}$.

- (a) Tìm các giá trị riêng của $H$ và miền của $\tau$ để $H+\tau\mathrm I\succ0$. Tính hướng Newton không giảm chấn và dấu của $g^Td$.
- (b) Với $\tau=2$, chạy hai vòng gradient liên hợp từ $d_0=0$ cho $(H+\tau\mathrm I)d=-g$. Ghi $\alpha_0$, $d_1$, $r_1$, $\omega_0$, $q_1$, $\alpha_1$, $d_2$.
- (c) Tính $g^Td_1$, $g^Td_2$ và kiểm bất đẳng thức (3.5), $g^Td_k<-\tfrac12d_k^TAd_k$, với $k=1$.
:::

::: hint
Thử các vectơ $(1,1)$ và $(1,-1)$ cho giá trị riêng. Ở (b), $A=\begin{bmatrix}4&3\\3&4\end{bmatrix}$ và $b=(-2,0)^T$.
:::

::: solution
**Câu (a).**

- Giá trị riêng: $H(1,1)^T=5(1,1)^T$ và $H(1,-1)^T=-(1,-1)^T$, nên là $5$ và $-1$.
- Miền giảm chấn: $H+\tau\mathrm I\succ0$ khi và chỉ khi $\tau>1$.
- Hướng Newton: $\det H=-5$, $H^{-1}=-\tfrac15\begin{bmatrix}2&-3\\-3&2\end{bmatrix}$, nên $d=-H^{-1}g=(0{,}8;\,-1{,}2)^T$.
- Dấu: $g^Td=1{,}6>0$, hướng tăng.

**Câu (b).** Với $A=\begin{bmatrix}4&3\\3&4\end{bmatrix}$ và $b=(-2,0)^T$:

| Vòng $k$ | $q_k$ | $Aq_k$ | $q_k^TAq_k$ | $\alpha_k$ | $d_{k+1}$ | $r_{k+1}$ |
|---|---|---|---|---|---|---|
| $0$ | $(-2,0)$ | $(-8,-6)$ | $16$ | $\tfrac14$ | $(-\tfrac12,0)$ | $(0,\tfrac32)$ |
| $1$ | $(-\tfrac98,\tfrac32)$ | $(0,\tfrac{21}8)$ | $\tfrac{63}{16}$ | $\tfrac47$ | $(-\tfrac87,\tfrac67)$ | $(0,0)$ |

Hướng $q_1=r_1+\omega_0q_0$ dùng $\omega_0=\tfrac{9/4}{4}=\tfrac9{16}$. Tọa độ thứ nhất của $d_2=d_1+\tfrac47q_1$ là $-\tfrac12-\tfrac9{14}=-\tfrac87$.

**Câu (c).** $g^Td_1=-1$ và $g^Td_2=-\tfrac{16}7$, đều âm. Với $k=1$: $d_1^TAd_1=4\cdot\tfrac14=1$, và $g^Td_1=-1<-\tfrac12$, đúng (3.5).

**Kiểm tra lại.** Tọa độ thứ nhất của $A(-\tfrac87,\tfrac67)^T$ là $-\tfrac{32}7+\tfrac{18}7=-2$, tọa độ thứ hai là $-\tfrac{24}7+\tfrac{24}7=0$, đúng bằng $b$; $q_0^TAq_1=(-2)\cdot0+0=0$.
:::

::: exercise Bài tập 06.4
Cho $A\in\mathbb R^{p\times p}$ đối xứng xác định dương, $b\ne0$ và $d_0=0$. Chứng minh rằng Thuật toán 06.4 cho $r_1=0$ khi và chỉ khi $b$ là một vectơ riêng của $A$. Áp vào hệ giảm chấn tại điểm có $g=(0,-1)^T$ và $H=\operatorname{diag}(1,-1)$ với $\tau=2$ (Ví dụ 06.12): giải thích vì sao gradient liên hợp tìm ra bước Newton giảm chấn sau một vòng.
:::

::: hint
Viết $r_1=b-\alpha_0Ab$ và xét khi nào vectơ này bằng $0$; với chiều ngược lại, tính $\alpha_0$ khi $Ab=\lambda b$.
:::

::: solution
**Chiều thuận.** Với $d_0=0$: $r_0=q_0=b$, và $r_1=b-\alpha_0Ab$ với $\alpha_0=\tfrac{b^Tb}{b^TAb}>0$. Nếu $r_1=0$ thì $Ab=\tfrac1{\alpha_0}b$, nên $b$ là vectơ riêng ứng với giá trị riêng $\tfrac1{\alpha_0}$.

**Chiều đảo.** Nếu $Ab=\lambda b$ thì $\lambda>0$ vì $A\succ0$, và $\alpha_0=\tfrac{b^Tb}{\lambda b^Tb}=\tfrac1\lambda$. Do đó $r_1=b-\tfrac1\lambda\lambda b=0$.

**Áp dụng.** Ở Ví dụ 06.12 với $\tau=2$: $A=\operatorname{diag}(3,1)$ và $b=-g=(0,1)^T$, một vectơ riêng ứng với giá trị riêng $1$. Gradient liên hợp cho $\alpha_0=1$, $d_1=(0,1)^T$ và $r_1=0$ sau một vòng.

**Kiểm tra lại.** $Ad_1=(0,1)^T=b$.
:::

**Chuỗi suy luận của mục.** Ví dụ 06.10 cho thấy cần phần tử ngoài đường chéo. Bước Newton (3.1), tức Mệnh đề 06.3 với $M=H$, giải quyết điều đó, và Mệnh đề 06.13 giải thích vì sao bằng tính bất biến.

Định nghĩa 06.15 và Mệnh đề 06.16 sửa Hessian bất định. Định nghĩa 06.17, Thuật toán 06.4 và Định lý 06.18 giải hệ chỉ bằng tích ma trận–vectơ. Kết quả đích là Mệnh đề 06.20, cho phép ghép thành Thuật toán 06.5 với nghiệm gần đúng vẫn là hướng giảm.

**Kết mục.** Mục đã có phương pháp dùng đầy đủ độ cong mà không lập Hessian (Thuật toán 06.5), với hai phép kiểm riêng cho phần dư và cho dấu của hướng. Phương pháp vẫn cần một toán tử $z\mapsto Hz$ và một hệ số $\tau$ đủ lớn. Khi chỉ có gradient, không có tích Hessian–vectơ, Mục 4 rút thông tin độ cong từ hiệu của hai gradient.

## 4. Thông tin độ cong từ sai phân gradient

Mục 3 kết thúc với phương pháp Newton–CG, cần một toán tử $z\mapsto Hz$ ở mỗi vòng. Khi chỉ có hàm tính gradient, chẳng hạn mục tiêu là một chương trình mô phỏng mà vi phân tự động bậc hai không đi qua được, toán tử đó không có sẵn. Nhưng mọi phương pháp gradient đều tính gradient tại các điểm liên tiếp: trên hàm $\tfrac12\theta^TQ\theta$, hai gradient tại $(0,0)$ và $(1,0)$ là $(0,0)^T$ và $(2,1)^T$, và hiệu của chúng đúng bằng cột thứ nhất của $Q$. Mục này rút thông tin độ cong từ các hiệu gradient như vậy, dẫn tới phương pháp BFGS và bản bộ nhớ giới hạn L-BFGS.

### 4.1 Cặp độ cong và phương trình cát tuyến

Ví dụ sau tính hiệu của hai gradient trên hàm có Hessian $Q$ và so nó với chính $Q$.

::: example Ví dụ 06.15 (Một cặp độ cong trên hàm nghiêng)
**Dữ kiện.** $F(\theta)=\tfrac12\theta^TQ\theta$ với $Q=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ (Ví dụ 06.9); hai điểm $\theta=(0,0)^T$ và $\theta^+=(1,0)^T$.

**Cặp.** Bước $s=\theta^+-\theta=(1,0)^T$; sai phân gradient $y=\nabla F(\theta^+)-\nabla F(\theta)=Q(1,0)^T$, tức $y=(2,1)^T$.

**Đọc.** $y=Qs$: cặp $(s,y)$ cho biết tác động của Hessian lên một hướng $s$. Tích $s^Ty=2$ bằng $s^TQs$, độ cong của $F$ dọc $s$.

**Kiểm tra lại.** Cộng vào $F$ một hàm tuyến tính của $\theta$ thì cả hai gradient cùng tăng một vectơ hằng, và $y$ không đổi.
:::

Trực giác, chưa phải phát biểu hình thức: cặp $(s,y)$ là một phép đo Hessian theo một hướng, và ghép nhiều phép đo theo nhiều hướng cho một xấp xỉ của Hessian. Một cặp cho $p$ phương trình, trong khi một ma trận đối xứng $p\times p$ có $p(p+1)/2$ ẩn; với $p=2$, hai phương trình cho ba ẩn. Định nghĩa sau đặt tên cho đòi hỏi một xấp xỉ tái tạo đúng phép đo.

::: definition Định nghĩa 06.21 (Phương trình cát tuyến và điều kiện độ cong)
Cho một cặp $s,y\in\mathbb R^p$, $s\ne0$.

**Phương trình cát tuyến.** Một ma trận đối xứng $B$ thỏa phương trình cát tuyến (secant equation) nếu $Bs=y$; một ma trận đối xứng $P$ thỏa phương trình cát tuyến dạng nghịch đảo nếu $Py=s$. $B$ đóng vai xấp xỉ Hessian, $P$ đóng vai xấp xỉ nghịch đảo Hessian.

**Điều kiện độ cong.** Cặp thỏa điều kiện độ cong (curvature condition) nếu $s^Ty>0$.
:::

Phương trình cát tuyến tổng quát hóa phép tính của Ví dụ 06.15: trên hàm bậc hai, Hessian thật thỏa $Qs=y$ với mọi cặp, nên đòi một xấp xỉ thỏa cùng phương trình trên các cặp đã đo là đòi tối thiểu. Phương pháp tựa Newton (quasi-Newton) duy trì một ma trận $P$ thỏa phương trình cát tuyến cho cặp mới nhất và dùng bước $d=-Pg$; theo Mệnh đề 06.3, đó là bước có phạt với $M=P^{-1}$, $\eta=1$, nên cần $P\succ0$. Mệnh đề sau cho biết cặp $(s,y)$ đo gì khi $F$ không bậc hai, và khi nào một $P\succ0$ như vậy tồn tại.

::: proposition Mệnh đề 06.22 (Sai phân gradient và Hessian trung bình)
**Giả thiết.** $F$ khả vi hai lần liên tục trên một tập mở chứa đoạn nối $\theta$ và $\theta^+=\theta+s$; $y=\nabla F(\theta^+)-\nabla F(\theta)$.

**Kết luận.**

- (a) $y=\bar Hs$, với $\bar H=\displaystyle\int_0^1\nabla^2F(\theta+\varsigma s)\,\mathrm d\varsigma$ là Hessian trung bình dọc đoạn.
- (b) Nếu $F$ lồi trên đoạn thì $s^Ty\ge0$; nếu mọi giá trị riêng của $\nabla^2F$ trên đoạn không nhỏ hơn một số $\underline\lambda>0$ thì $s^Ty\ge\underline\lambda\lVert s\rVert^2$.
- (c) Nếu $s\ne0$ và có ma trận $P\succ0$ với $Py=s$ thì $s^Ty>0$.

**Điều kiện áp dụng.** Phần (a), (b) cần $F$ thuộc lớp $C^2$ trên đoạn; phần (c) chỉ là phát biểu đại số.

**Phạm vi.** Khi $F$ không lồi, $s^Ty$ có thể âm, và theo (c) khi đó không ma trận xác định dương nào thỏa $Py=s$.
:::

::: proof Chứng minh Mệnh đề 06.22
**Bước 1 (phần a).** Hàm $\varsigma\mapsto\nabla F(\theta+\varsigma s)$ khả vi liên tục trên $[0,1]$, với đạo hàm $\nabla^2F(\theta+\varsigma s)\,s$. Định lý cơ bản của giải tích, áp cho từng tọa độ, cho $y=\int_0^1\nabla^2F(\theta+\varsigma s)\,s\,\mathrm d\varsigma=\bar Hs$.

**Bước 2 (phần b).** Đặt $F_s(\varsigma)=F(\theta+\varsigma s)$ trên $[0,1]$. Khi $F$ lồi trên đoạn, $F_s$ là hàm lồi một biến khả vi, nên đạo hàm $F_s'(\varsigma)=\nabla F(\theta+\varsigma s)^Ts$ không giảm; do đó $s^Ty=F_s'(1)-F_s'(0)\ge0$. Khi mọi giá trị riêng của $\nabla^2F$ trên đoạn không nhỏ hơn $\underline\lambda$, $F_s''(\varsigma)=s^T\nabla^2F(\theta+\varsigma s)s\ge\underline\lambda\lVert s\rVert^2$, và tích phân $F_s''$ trên $[0,1]$ cho $s^Ty\ge\underline\lambda\lVert s\rVert^2$.

**Bước 3 (phần c).** Vì $s=Py\ne0$, $y\ne0$. Do đó $s^Ty=(Py)^Ty=y^TPy$, dương theo $P\succ0$ và tính đối xứng của $P$. $\square$
:::

Phần (a) nói rằng một cặp không đo Hessian tại một điểm mà đo Hessian trung bình dọc bước vừa đi. Phần (c) là điều kiện cần: muốn một xấp xỉ nghịch đảo xác định dương tái tạo đúng cặp, cặp đó phải thỏa điều kiện độ cong của Định nghĩa 06.21.


Phản ví dụ cho việc bỏ điều kiện độ cong: với $s=(1,0)^T$ và $y=(-1,2)^T$, $s^Ty=-1$, và theo Mệnh đề 06.22(c) không có $P\succ0$ nào thỏa $Py=s$.

### 4.2 Cập nhật BFGS

Trong họ các ma trận đối xứng thỏa $P^+y=s$, BFGS chọn một ma trận chỉ sửa $P$ cũ bằng hai tích ngoài. Tên BFGS ghép tên bốn tác giả Broyden, Fletcher, Goldfarb và Shanno. Ví dụ sau tính một lần sửa.

::: example Ví dụ 06.16 (Một cập nhật BFGS)
**Dữ kiện.** $P=\mathrm I$, cặp $s=(1,0)^T$, $y=(2,1)^T$ của Ví dụ 06.15; $y^Ts=2>0$.

**Công thức.** Theo Nocedal và Wright (2006, mục 6.1), với $V=\mathrm I-\dfrac{ys^T}{y^Ts}$, cập nhật BFGS là $P^+=V^TPV+\dfrac{ss^T}{y^Ts}$ (công thức (4.1) dưới đây). Ở đây $ys^T=\begin{bmatrix}2&0\\1&0\end{bmatrix}$, nên $V=\begin{bmatrix}0&0\\-\tfrac12&1\end{bmatrix}$ và

$$
V^TV=\begin{bmatrix}0&-\tfrac12\\0&1\end{bmatrix}\begin{bmatrix}0&0\\-\tfrac12&1\end{bmatrix}=\begin{bmatrix}\tfrac14&-\tfrac12\\-\tfrac12&1\end{bmatrix}.
$$

Cộng $\tfrac12ss^T=\operatorname{diag}(\tfrac12,0)$:

$$
P_1=\begin{bmatrix}\tfrac34&-\tfrac12\\-\tfrac12&1\end{bmatrix}.
$$

**Ba phép kiểm.**

1. Cát tuyến: hai tọa độ của $P_1y$ là $\tfrac32-\tfrac12=1$ và $-1+1=0$, nên $P_1y=s$.
2. Xác định dương: $(P_1)_{11}=\tfrac34>0$ và $\det P_1=\tfrac34-\tfrac14=\tfrac12$, dương, nên $P_1\succ0$ theo tiêu chuẩn Sylvester.
3. Thông tin mới: $Py=y\ne s$, nên $P=\mathrm I$ chưa thỏa phương trình cát tuyến và cập nhật thực sự đổi ma trận.

**Kiểm tra lại.** Nghịch đảo thật $Q^{-1}=\tfrac13\begin{bmatrix}2&-1\\-1&2\end{bmatrix}$ cũng thỏa $Q^{-1}y=s$, nhưng $P_1-Q^{-1}=\begin{bmatrix}\tfrac1{12}&-\tfrac16\\-\tfrac16&\tfrac13\end{bmatrix}$; tích của hiệu này với $y$ là $(\tfrac16-\tfrac16,\;-\tfrac13+\tfrac13)^T=0$.
:::

Phép kiểm cuối cho thấy $P_1$ khác nghịch đảo thật chỉ theo những hướng mà cặp chưa đo. Định lý sau phát biểu các tính chất của phép cập nhật cho mọi $P\succ0$ và mọi cặp thỏa điều kiện độ cong; nó dùng Định nghĩa 06.21 và tính chất của dạng toàn phương.

::: theorem Định lý 06.23 (Cập nhật nghịch đảo BFGS)
**Giả thiết.** $P\in\mathbb R^{p\times p}$ đối xứng, $P\succ0$; $s,y\in\mathbb R^p$ với $y^Ts>0$. Đặt $V=\mathrm I-\dfrac{ys^T}{y^Ts}$ và

$$
P^+=V^TPV+\frac{ss^T}{y^Ts}=\Bigl(\mathrm I-\frac{sy^T}{y^Ts}\Bigr)P\Bigl(\mathrm I-\frac{ys^T}{y^Ts}\Bigr)+\frac{ss^T}{y^Ts}.
\tag{4.1}
$$

**Kết luận.**

- (a) $P^+$ đối xứng và $P^+y=s$.
- (b) $P^+\succ0$.
- (c) $P^+-P$ có hạng không quá hai.
- (d) Nếu $Py=s$ thì $P^+=P$.

**Điều kiện áp dụng.** Cần cả $P\succ0$ và $y^Ts>0$; định lý không cần $y$ sinh từ một hàm cụ thể.

**Phạm vi.** Định lý nói về một lần cập nhật; nó không nói $P^+$ gần nghịch đảo Hessian, cũng không nói cách chọn bước để có $y^Ts>0$.
:::

::: proof Chứng minh Định lý 06.23
**Bước 1 (đối xứng và cát tuyến).** $V^TPV$ và $ss^T$ đối xứng, nên $P^+$ đối xứng. Ta có $Vy=y-y\frac{s^Ty}{y^Ts}=0$, nên $V^TPVy=0$, và $\frac{ss^T}{y^Ts}y=s$. Vậy $P^+y=s$.

**Bước 2 (dạng toàn phương).** Với $z\in\mathbb R^p$, đặt $w=Vz=z-\frac{s^Tz}{y^Ts}y$. Khi đó

$$
z^TP^+z=w^TPw+\frac{(s^Tz)^2}{y^Ts}\ge0 ,
$$

vì $P\succ0$ và $y^Ts>0$.

**Bước 3 (phần b).** Giả sử $z^TP^+z=0$. Cả hai số hạng không âm, nên cả hai bằng $0$: $P\succ0$ cho $w=0$, và $y^Ts>0$ cho $s^Tz=0$. Khi $s^Tz=0$, $w=z$; vậy $z=0$. Do đó $z^TP^+z>0$ với mọi $z\ne0$.

**Bước 4 (phần c).** Khai triển (4.1):

$$
P^+-P=-\frac{sy^TP+Pys^T}{y^Ts}+\frac{(y^TPy)\,ss^T}{(y^Ts)^2}+\frac{ss^T}{y^Ts}.
$$

Mọi cột của vế phải nằm trong $\operatorname{span}\{s,Py\}$, nên hạng không quá hai.

**Bước 5 (phần d).** Nếu $Py=s$ thì $y^TPy=y^Ts$ và $sy^TP=s(Py)^T=ss^T$, $Pys^T=ss^T$. Thay vào Bước 4: $P^+-P=-\frac{2ss^T}{y^Ts}+\frac{ss^T}{y^Ts}+\frac{ss^T}{y^Ts}=0$. $\square$
:::

- Theo phần (a), ma trận mới tái tạo đúng cặp vừa đo.
- Theo phần (b), tính xác định dương được truyền qua mọi lần cập nhật, nên mọi bước $d=-P^+g$ là hướng giảm theo Mệnh đề 06.3(b). Mỗi giả thiết được dùng đúng một lần ở Bước 3: $P\succ0$ cho $w=0$, $y^Ts>0$ cho $s^Tz=0$.
- Theo phần (c), (d), cập nhật thêm nhiều nhất hai hướng thông tin, và không đổi gì khi cặp mới không mang thông tin mới.

Khi bỏ giả thiết $y^Ts>0$, kết luận của Bước 2 không còn đúng vì số hạng thứ hai đổi dấu. Với $P=\mathrm I$, $s=(1,0)^T$, $y=(-1,2)^T$, công thức (4.1) vẫn cho $P^+y=s$, nhưng $P^+=\begin{bmatrix}3&2\\2&1\end{bmatrix}$ có định thức $-1<0$. Phần (a) vẫn đúng, phần (b) không còn đúng.

::: remark Nhận xét 06.24 (Hai phép kiểm của BFGS)
**Kiểm cặp và kiểm hướng là hai câu hỏi.** Dấu $y^Ts$ quyết định có nhận cặp vào cập nhật hay không; dấu $g^Td$ với $d=-Pg$ quyết định ma trận hiện có cho hướng giảm hay không. Với $P_1$ của Ví dụ 06.16 và $g=(0,1)^T$: $d=-P_1g=(\tfrac12,-1)^T$ và $g^Td=-1<0$. Hai phép kiểm dùng dữ kiện khác nhau và không thay được nhau.

**$P$ không phải $M$ của Mục 2.** $P$ xấp xỉ nghịch đảo Hessian; ma trận phạt tương ứng là $M=P^{-1}$. Đồng nhất $P$ với Hessian, hay với ma trận phạt, cho bước sai hướng.
:::

### 4.3 Thuật toán BFGS và điều kiện bước

Thuật toán ghép phép cập nhật vào vòng lặp: sinh hướng từ $P$, tìm bước, rồi quyết định có nhận cặp.

Một bước chỉ làm $F$ giảm chưa bảo đảm $y^Ts>0$; điều kiện sau thêm một ràng buộc lên độ dốc tại điểm mới để bảo đảm điều đó. Trên $F(\theta)=\tfrac12\theta^TQ\theta$ từ $\theta=(1,0)^T$ theo $d=-g=(-2,-1)^T$, giá trị dọc tia là $1-5\alpha+7\alpha^2$ và độ dốc là $-5+14\alpha$. Với $c_1=0{,}1$, bước $\alpha=0{,}01$ cho giá trị $0{,}9507$, không lớn hơn $1-0{,}1\cdot0{,}01\cdot5=0{,}995$, nên được điều kiện Armijo nhận. Độ dốc tại đó là $-4{,}86$, còn gần độ dốc ban đầu $-5$; điều kiện thứ hai dưới đây với $c_2=0{,}9$ đòi độ dốc không nhỏ hơn $-4{,}5$ và loại bước này.

::: definition Định nghĩa 06.25 (Điều kiện Wolfe)
Cho $\theta$, $g=\nabla F(\theta)$, hướng $d$ với $g^Td<0$ và hai hằng số $0<c_1<c_2<1$. Độ dài bước $\alpha>0$ thỏa điều kiện Wolfe (Nocedal và Wright 2006, mục 3.1) nếu cả hai bất đẳng thức sau cùng đúng:

$$
\begin{aligned}
F(\theta+\alpha d)&\le F(\theta)+c_1\alpha\,g^Td,\\
\nabla F(\theta+\alpha d)^Td&\ge c_2\,g^Td .
\end{aligned}
\tag{4.2}
$$
:::

Bất đẳng thức thứ nhất là điều kiện Armijo của Định nghĩa 04.10. Bất đẳng thức thứ hai đòi độ dốc dọc $d$ tại điểm mới bớt âm so với tại điểm cũ, nên loại các bước quá ngắn mà Armijo vẫn nhận.

::: proposition Mệnh đề 06.26 (Điều kiện Wolfe bảo đảm điều kiện độ cong)
**Giả thiết.** $g^Td<0$, $0<c_2<1$, và $\alpha>0$ thỏa bất đẳng thức thứ hai của (4.2). Đặt $s=\alpha d$, $y=\nabla F(\theta+s)-g$.

**Kết luận.** $s^Ty\ge\alpha(1-c_2)\lvert g^Td\rvert>0$.

**Điều kiện áp dụng.** Không cần $F$ lồi.

**Phạm vi.** Mệnh đề không nói tồn tại $\alpha$ thỏa (4.2); với $F$ khả vi liên tục và bị chặn dưới dọc tia, sự tồn tại được chứng minh ở Nocedal và Wright (2006, bổ đề 3.1).
:::

::: proof Chứng minh Mệnh đề 06.26
**Bước 1.** Trừ $g^Td$ ở hai vế của bất đẳng thức thứ hai trong (4.2): $y^Td\ge(c_2-1)\,g^Td$.

**Bước 2.** Vì $c_2-1<0$ và $g^Td<0$, vế phải bằng $(1-c_2)\lvert g^Td\rvert>0$. Nhân với $\alpha>0$ được $s^Ty=\alpha\,y^Td\ge\alpha(1-c_2)\lvert g^Td\rvert$. $\square$
:::

::: algorithm Thuật toán 06.6 (BFGS)
**Đầu vào.** Điểm đầu $\theta_0$; ma trận $P_0\succ0$, thường $P_0=\mathrm I$; ngưỡng gradient $\varepsilon_{\rm g}>0$; ngưỡng nhận cặp $\varepsilon_{\rm c}>0$; ngân sách $T$; hằng số Wolfe $0<c_1<c_2<1$.

**Khởi tạo.** $\theta=\theta_0$, $P=P_0$.

**Các bước.** Với $t=1,2,\ldots,T$:

1. Tính $g=\nabla F(\theta)$, gradient đầy đủ. Nếu $\lVert g\rVert\le\varepsilon_{\rm g}$: trả $\theta$.
2. Đặt $d=-Pg$; tìm $\alpha$ thỏa (4.2).
3. Đặt $s=\alpha d$, $y=\nabla F(\theta+s)-g$; nhận $\theta\leftarrow\theta+s$.
4. Nếu $y^Ts\ge\varepsilon_{\rm c}\lVert s\rVert\lVert y\rVert$: cập nhật $P$ theo (4.1). Nếu không: giữ $P$.

**Đầu ra.** $\theta$.

**Chi phí.** Mỗi vòng $O(p^2)$ phép toán cho $Pg$ và (4.1), cộng các lần tính $F$, $\nabla F$ của tìm bước; bộ nhớ $p^2$ số cho $P$.
:::

Với $P\succ0$ và $g\ne0$, $g^Td=-g^TPg<0$, nên bước 2 có nghĩa. Theo Mệnh đề 06.26, bước Wolfe cho $y^Ts>0$, và bước 4 chỉ đòi thêm một ngưỡng tương đối $\varepsilon_{\rm c}$ để loại cặp gần suy biến; theo Định lý 06.23(b), $P$ luôn xác định dương.

::: example Ví dụ 06.17 (BFGS hai vòng trên hàm nghiêng với tìm bước chính xác)
**Dữ kiện.** $F(\theta)=\tfrac12\theta^TQ\theta$ với $Q=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ (Ví dụ 06.9), $\theta_0=(1,0)^T$, $P_0=\mathrm I$. Tìm bước chính xác: $\alpha$ cực tiểu $F$ dọc $d$, tức $\alpha=-\tfrac{g^Td}{d^TQd}$ trên hàm bậc hai.

**Vòng 1.**

- Hướng: $g=(2,1)^T$ và $d=-g=(-2,-1)^T$.
- Độ dài bước: $d^TQd=14$ và $g^Td=-5$, nên $\alpha=\tfrac5{14}$.
- Bước: $s=\alpha d=(-\tfrac57,-\tfrac5{14})^T$.
- Điểm mới: $\theta_1=(\tfrac27,-\tfrac5{14})^T$.
- Cặp: $y=Qs=(-\tfrac{25}{14},-\tfrac{10}7)^T$ và $s^Ty=\tfrac{25}{14}>0$.
- Với $P_0=\mathrm I$, khai triển (4.1) cho $P_1=\mathrm I-\tfrac{sy^T+ys^T}{y^Ts}+\bigl(1+\tfrac{y^Ty}{y^Ts}\bigr)\tfrac{ss^T}{y^Ts}$. Ở đây $y^Ty=\tfrac{1025}{196}$, nên $\tfrac{y^Ty}{y^Ts}=\tfrac{41}{14}$ và hệ số của $ss^T$ là $\tfrac{55/14}{25/14}=\tfrac{11}5$.
- Kết quả: $P_1=\dfrac1{196}\begin{bmatrix}136&-72\\-72&139\end{bmatrix}$; chẳng hạn phần tử đầu là $1-\tfrac{14}{25}\cdot\tfrac{125}{49}+\tfrac{11}5\cdot\tfrac{25}{49}=\tfrac{34}{49}$.

**Vòng 2.**

- Gradient: $g=Q\theta_1=(\tfrac3{14},-\tfrac37)^T$, với $F(\theta_1)=\tfrac3{28}$.
- $d=-P_1g=(-\tfrac{15}{49},\tfrac{75}{196})^T$, với $g^Td=-\tfrac{45}{196}$ và $d^TQd=\tfrac{675}{2744}$.
- $\alpha=\tfrac{45/196}{675/2744}=\tfrac{14}{15}$ và $s=\alpha d=(-\tfrac27,\tfrac5{14})^T$.
- Điểm mới: $\theta_2=\theta_1+s=(0,0)^T$, nghiệm.
- Cập nhật: $y=Qs=(-\tfrac3{14},\tfrac37)^T$, và (4.1) cho $P_2=\tfrac13\begin{bmatrix}2&-1\\-1&2\end{bmatrix}=Q^{-1}$.

**Kiểm tra lại.** Tìm bước chính xác thỏa (4.2) với mọi $c_2$, vì $\nabla F(\theta+\alpha d)^Td=0>c_2g^Td$, và thỏa bất đẳng thức đầu với mọi $c_1\le\tfrac12$, vì trên hàm bậc hai $F(\theta+\alpha d)=F(\theta)+\tfrac12\alpha g^Td$. Hai bước $s_1$, $s_2$ của hai vòng liên hợp theo $Q$: $s_1^TQs_2=y_1^Ts_2$, và $y_1^Ts_2=\tfrac{25}{14}\cdot\tfrac27-\tfrac{10}7\cdot\tfrac5{14}=0$.
:::

Ví dụ minh họa một kết quả chung: trên hàm bậc hai lồi chặt với tìm bước chính xác, BFGS cho các hướng liên hợp theo Hessian, đạt nghiệm sau nhiều nhất $p$ vòng và có $P_p$ bằng nghịch đảo Hessian (Nocedal và Wright 2006, chương 6; ghi chú này không chứng minh). Đó là cùng tính chất kết thúc hữu hạn của gradient liên hợp (Định lý 06.18(g)), đạt được mà không cần tích Hessian–vectơ. Trên hàm không bậc hai, kết quả tương ứng là hội tụ siêu tuyến tính gần một cực tiểu có Hessian xác định dương, dưới các giả thiết nêu ở Nocedal và Wright (2006, mục 6.4).

### 4.4 BFGS với bộ nhớ giới hạn

Thuật toán 06.6 lưu ma trận $P$ gồm $p^2$ số: với $p=10^6$, đó là $10^{12}$ số. BFGS với bộ nhớ giới hạn (limited-memory BFGS, L-BFGS) không lưu $P$ mà lưu $n_{\rm m}$ cặp $(s_i,y_i)$ gần nhất, tức $2n_{\rm m}p$ số, và tính trực tiếp tích $Pg$ từ các cặp. Ví dụ sau cho thấy tích đó chỉ cần tích vô hướng và cộng vectơ.

::: example Ví dụ 06.18 (Tích $Pg$ từ một cặp, không lập $P$)
**Dữ kiện.** Cặp $s=(1,0)^T$, $y=(2,1)^T$ với $y^Ts=2$ (Ví dụ 06.15); ma trận ban đầu $\mathrm I$; gradient $g=(1,1)^T$. Cập nhật (4.1) viết thành $P_1=V^TV+\tfrac{ss^T}{y^Ts}$ với $V=\mathrm I-\tfrac{ys^T}{y^Ts}$.

**Tính $Vg$.** $Vg=g-\tfrac{s^Tg}{y^Ts}y$, với $\tfrac{s^Tg}{y^Ts}=\tfrac12$, nên $Vg=(1,1)^T-\tfrac12(2,1)^T=(0,\tfrac12)^T$.

**Tính $V^T(Vg)$.** $V^Tu=u-\tfrac{y^Tu}{y^Ts}s$ với $u=(0,\tfrac12)^T$: $y^Tu=\tfrac12$, nên $V^Tu=(0,\tfrac12)^T-\tfrac14(1,0)^T=(-\tfrac14,\tfrac12)^T$.

**Cộng phần hạng một.** $\tfrac{s^Tg}{y^Ts}s=\tfrac12(1,0)^T$, nên $P_1g=(\tfrac14,\tfrac12)^T$.

**Kiểm tra lại.** Với $P_1=\begin{bmatrix}\tfrac34&-\tfrac12\\-\tfrac12&1\end{bmatrix}$ của Ví dụ 06.16: $P_1(1,1)^T=(\tfrac14,\tfrac12)^T$. Phép tính không lập ma trận nào, chỉ dùng bốn tích vô hướng và ba phép cộng vectơ.
:::

Thuật toán sau, gọi là đệ quy hai vòng (two-loop recursion), làm phép tính trên cho nhiều cặp; Mệnh đề 06.27 chứng tỏ nó cho đúng $Pg$.

::: algorithm Thuật toán 06.7 (Đệ quy hai vòng của L-BFGS)
**Đầu vào.** Gradient $g$; các cặp $(s_1,y_1),\ldots,(s_{n_{\rm m}},y_{n_{\rm m}})$ theo thứ tự cũ đến mới, mỗi cặp có $y_i^Ts_i>0$; ma trận ban đầu $P^\circ\succ0$, thường là $\tfrac{s_{n_{\rm m}}^Ty_{n_{\rm m}}}{y_{n_{\rm m}}^Ty_{n_{\rm m}}}\mathrm I$.

**Vòng lùi.** Đặt $\chi=g$. Với $i=n_{\rm m},n_{\rm m}-1,\ldots,1$: $\vartheta_i=\dfrac{s_i^T\chi}{y_i^Ts_i}$, rồi $\chi\leftarrow\chi-\vartheta_iy_i$.

**Giữa.** $\chi'=P^\circ\chi$.

**Vòng tiến.** Với $i=1,2,\ldots,n_{\rm m}$: $\vartheta'=\dfrac{y_i^T\chi'}{y_i^Ts_i}$, rồi $\chi'\leftarrow\chi'+(\vartheta_i-\vartheta')s_i$.

**Đầu ra.** $\chi'$.

**Chi phí.** Khoảng $4n_{\rm m}p$ phép nhân cộng và $O(p)$ cho $P^\circ$ chéo; bộ nhớ $2n_{\rm m}p$ số cho các cặp.
:::

::: proposition Mệnh đề 06.27 (Đệ quy hai vòng cho đúng tích $Pg$)
**Giả thiết.** Như Thuật toán 06.7. Gọi $P_{n_{\rm m}}$ là ma trận nhận được khi áp (4.1) lần lượt với các cặp $1,2,\ldots,n_{\rm m}$, bắt đầu từ $P^\circ$.

**Kết luận.** Đầu ra của Thuật toán 06.7 bằng $P_{n_{\rm m}}g$.

**Điều kiện áp dụng.** Mọi cặp có $y_i^Ts_i>0$; số học chính xác.

**Phạm vi.** Ma trận $P^\circ$ được chọn lại ở mỗi lần gọi, nên $P_{n_{\rm m}}$ của L-BFGS khác ma trận của BFGS đầy đủ, vốn tích lũy mọi cặp từ đầu.
:::

::: proof Chứng minh Mệnh đề 06.27
Chứng minh đầy đủ nằm ngoài phạm vi chương (Nocedal và Wright 2006, mục 7.2). Ý chính là quy nạp theo số cặp. Viết (4.1) thành $P_i=V_i^TP_{i-1}V_i+\tfrac{s_is_i^T}{y_i^Ts_i}$ với $V_i=\mathrm I-\tfrac{y_is_i^T}{y_i^Ts_i}$. Mỗi bước của vòng lùi thay vectơ hiện tại $u$ bằng $V_iu$, mỗi bước của vòng tiến thay $w$ bằng $V_i^Tw+\vartheta_is_i$, nên ghép hai vòng quanh phần giữa cho đúng biểu thức $V_i^T(P_{i-1}V_iu)+\tfrac{s_i^Tu}{y_i^Ts_i}s_i=P_iu$, lồng nhau từ cặp mới nhất tới cặp cũ nhất. $\square$
:::

Áp Thuật toán 06.7 cho cặp $s=(1,0)^T$, $y=(2,1)^T$ với $P^\circ=\mathrm I$ và $g=(1,1)^T$: vòng lùi cho $\vartheta_1=\tfrac12$, vòng tiến cho $\vartheta'=\tfrac14$, và đầu ra $(\tfrac14,\tfrac12)^T$ trùng $P_1g$ của Ví dụ 06.18.

**Trong học máy.** BFGS và L-BFGS cần gradient đầy đủ, ổn định giữa các vòng, của cùng một mục tiêu: theo Mệnh đề 06.22, $y$ đo Hessian trung bình chỉ khi hai gradient thuộc cùng một hàm. Với gradient nhóm, $y=g_{t}-g_{t-1}$ chứa cả hiệu giữa hai nhóm, nên cặp có thể có $y^Ts>0$ mà vẫn không phản ánh độ cong. Vì vậy L-BFGS thường dùng cho bài toán có gradient đầy đủ và số tham số vừa phải, như hồi quy logistic trên toàn bộ dữ liệu; trong scikit-learn, `LogisticRegression` dùng bộ giải `lbfgs` làm mặc định, và `torch.optim.LBFGS` của PyTorch giữ mặc định $100$ cặp (tham số `history_size`). Goodfellow, Bengio và Courville (2016, mục 8.6.3, tr. 317) ghi nhận BFGS đầy đủ không thực tế cho mô hình có hàng triệu tham số vì bộ nhớ $O(p^2)$.

::: exercise Bài tập 06.5
Cho $P=\mathrm I$, $s=(0,1)^T$, $y=(1,3)^T$.

- (a) Kiểm điều kiện độ cong và tính $P^+$ theo (4.1). Kiểm $P^+y=s$ và $P^+\succ0$.
- (b) Với $g=(1,1)^T$, tính $d=-P^+g$ và $g^Td$.
- (c) Cặp này sinh từ hàm $\tfrac12\theta^TR\theta$ với $R=\begin{bmatrix}2&1\\1&3\end{bmatrix}$. Kiểm $y=Rs$, tính $R^{-1}$ và chứng tỏ $(P^+-R^{-1})y=0$.
- (d) Tính lại $P^+g$ ở (b) bằng Thuật toán 06.7 với một cặp và $P^\circ=\mathrm I$.
:::

::: hint
$V=\mathrm I-\tfrac13ys^T$ có cột thứ hai là $(0,1)^T-\tfrac13(1,3)^T$. Ở (d), $\vartheta_1=\tfrac{s^Tg}{3}$.
:::

::: solution
**Câu (a).** $y^Ts=3>0$. $ys^T=\begin{bmatrix}0&1\\0&3\end{bmatrix}$, nên $V=\begin{bmatrix}1&-\tfrac13\\0&0\end{bmatrix}$ và $V^TV=\begin{bmatrix}1&-\tfrac13\\-\tfrac13&\tfrac19\end{bmatrix}$. Cộng $\tfrac13ss^T=\operatorname{diag}(0,\tfrac13)$:

$$
P^+=\begin{bmatrix}1&-\tfrac13\\-\tfrac13&\tfrac49\end{bmatrix}.
$$

Hai tọa độ của $P^+y$ là $1-1=0$ và $-\tfrac13+\tfrac43=1$, nên $P^+y=s$. $(P^+)_{11}=1>0$ và $\det P^+=\tfrac49-\tfrac19=\tfrac13$, dương.

**Câu (b).** $P^+g=(\tfrac23,\tfrac19)^T$, nên $d=(-\tfrac23,-\tfrac19)^T$. Tích $g^Td=-\tfrac23-\tfrac19=-\tfrac79$, âm.

**Câu (c).** $Rs=(1,3)^T=y$. $\det R=5$, $R^{-1}=\tfrac15\begin{bmatrix}3&-1\\-1&2\end{bmatrix}$. $P^+-R^{-1}=\begin{bmatrix}\tfrac25&-\tfrac2{15}\\-\tfrac2{15}&\tfrac2{45}\end{bmatrix}$, và tích với $y$ là $(\tfrac25-\tfrac25,\;-\tfrac2{15}+\tfrac2{15})^T=0$.

**Câu (d).**

- Vòng lùi: $\vartheta_1=\tfrac{s^Tg}{3}=\tfrac13$ và $\chi=(1,1)^T-\tfrac13(1,3)^T=(\tfrac23,0)^T$.
- Giữa: $\chi'=\chi$.
- Vòng tiến: $\vartheta'=\tfrac{y^T\chi'}{3}=\tfrac29$ và $\chi'=(\tfrac23,0)^T+(\tfrac13-\tfrac29)(0,1)^T=(\tfrac23,\tfrac19)^T$, khớp (b).

**Kiểm tra lại.** $R^{-1}R=\tfrac15\begin{bmatrix}6-1&3-3\\-2+2&-1+6\end{bmatrix}=\mathrm I$.
:::

::: exercise Bài tập 06.6
Cho $F(\theta)=\tfrac12\bigl([\theta]_1^2+4[\theta]_2^2\bigr)$, $\theta=(2,1)^T$, $d=-\nabla F(\theta)$, $c_1=0{,}1$, $c_2=0{,}9$.

- (a) Viết hàm dọc tia $F_d(\alpha)=F(\theta+\alpha d)$ và đạo hàm $F_d'(\alpha)$.
- (b) Tìm tập các $\alpha$ thỏa (4.2).
- (c) Với mọi $\alpha$ trong tập đó, chứng tỏ $s^Ty>0$ và so với cận của Mệnh đề 06.26.
:::

::: hint
$g=(2,4)^T$, $d=(-2,-4)^T$; trên hàm bậc hai, $F_d$ là đa thức bậc hai theo $\alpha$, và $F_d'(\alpha)=\nabla F(\theta+\alpha d)^Td$.
:::

::: solution
**Câu (a).**

- Điểm trên tia: $\theta+\alpha d=(2-2\alpha,\;1-4\alpha)^T$.
- Giá trị: $F_d(\alpha)=2(1-\alpha)^2+2(1-4\alpha)^2=4-20\alpha+34\alpha^2$.
- Đạo hàm: $F_d'(\alpha)=-20+68\alpha$.

**Câu (b).** $g^Td=F_d'(0)=-20$.

- Armijo: $4-20\alpha+34\alpha^2\le4-2\alpha$, tức $34\alpha^2\le18\alpha$, tức $\alpha\le\tfrac9{17}$.
- Độ dốc: $-20+68\alpha\ge-18$, tức $\alpha\ge\tfrac1{34}$.

Tập cần tìm là $\bigl[\tfrac1{34},\tfrac9{17}\bigr]$.

**Câu (c).** $s^Ty=\alpha\bigl(F_d'(\alpha)-F_d'(0)\bigr)=68\alpha^2$, dương. Cận của Mệnh đề 06.26 là $\alpha(1-0{,}9)\cdot20=2\alpha$; vì $\alpha\ge\tfrac1{34}$, $68\alpha^2\ge2\alpha$, khớp cận, với dấu bằng tại $\alpha=\tfrac1{34}$.

**Kiểm tra lại.** Tại $\alpha=\tfrac9{17}$: $34\alpha^2=\tfrac{162}{17}$, nên $F_d=4-\tfrac{180}{17}+\tfrac{162}{17}=\tfrac{50}{17}$; vế phải của Armijo là $4-\tfrac{18}{17}=\tfrac{50}{17}$, nên Armijo đạt dấu bằng.
:::

**Chuỗi suy luận của mục.** Ví dụ 06.15 cho một cặp $(s,y)$; Định nghĩa 06.21 đặt phương trình cát tuyến và điều kiện độ cong; Mệnh đề 06.22 cho biết cặp đo Hessian trung bình dọc bước và điều kiện độ cong là cần cho một xấp xỉ xác định dương. Định lý 06.23 là kết quả đích: cập nhật (4.1) giữ phương trình cát tuyến và tính xác định dương. Định nghĩa 06.25 và Mệnh đề 06.26 cho cách chọn bước bảo đảm điều kiện độ cong, ghép thành Thuật toán 06.6. Ví dụ 06.18, Thuật toán 06.7 và Mệnh đề 06.27 đưa bộ nhớ từ $p^2$ xuống $2n_{\rm m}p$.

**Kết mục.** Mục đã có một bộ tối ưu chỉ cần gradient, dùng thông tin độ cong ngoài đường chéo và giữ hướng giảm (Định lý 06.23, Thuật toán 06.6). Giới hạn là giả thiết gradient ổn định của cùng một mục tiêu, mà huấn luyện mạng sâu với gradient nhóm không thỏa; và mọi phương pháp từ Mục 2 tới đây chỉ thay quy tắc cập nhật, giữ nguyên mô hình, điểm đầu và tham số trả về. Mục 5 xét các thay đổi ngoài quy tắc cập nhật.

## 5. Phép tính mô hình, khối biến và quy tắc trả về

Mục 2–4 chỉ thay quy tắc cập nhật, tức cách biến gradient đã có thành bước; mô hình, cách chọn biến cập nhật và tham số trả về được giữ nguyên. Một số khó khăn nằm ở chính các thành phần đó. Với một lớp tuyến tính $a=Wh$, trong đó $h\in\mathbb R^{n_{\rm in}}$ là đầu vào của lớp, $W$ là ma trận trọng số và $a$ là tiền kích hoạt (pre-activation), quy tắc dây chuyền cho $\partial\ell/\partial W_{kj}=(\partial\ell/\partial[a]_k)\,[h]_j$, tức

$$
\nabla_W\ell=\delta\,h^T,\qquad\delta=\nabla_a\ell .
\tag{5.1}
$$

Cột thứ $j$ của gradient tỷ lệ với $[h]_j$: với hàng thứ $k$ của $W$, $h=(1,100)^T$ và $[\delta]_k=0{,}5$, gradient theo hàng đó là $(0{,}5;\,50)$, lệch thang một trăm lần như Ví dụ 06.1.

Phương pháp của Mục 2 chia gradient theo tọa độ sau khi gradient đã hình thành; chuẩn hóa tín hiệu đi vào lớp sửa thang trước khi gradient hình thành. Mục này xét bốn can thiệp ngoài quy tắc cập nhật, thay lần lượt phép tính mô hình, tập biến được cập nhật mỗi lần, quy tắc trả về và đường truyền gradient qua kiến trúc.

### 5.1 Chuẩn hóa theo lô

Trực giác, chưa phải phát biểu hình thức: tiền kích hoạt của lớp $l$ được trừ trung bình và chia độ lệch chuẩn trên nhóm hiện tại, theo từng đặc trưng. Sau hàm kích hoạt, tín hiệu đó trở thành đầu vào $h$ của lớp $l+1$ trong (5.1), với thang ít phụ thuộc vào việc các lớp trước đã thay đổi. Tên phương pháp giữ chữ "lô" theo thuật ngữ đã quen; lô ở đây chính là nhóm $\mathcal B$ của gradient nhóm. Ví dụ sau áp phép chuẩn hóa cho hai nhóm của cùng một đặc trưng.

::: example Ví dụ 06.19 (Hai nhóm lệch nhau một phép dịch)
**Dữ kiện.** Giá trị của một đặc trưng trên hai nhóm bốn quan sát: $(1,1,5,5)$ và $(5,5,9,9)$, nhóm sau là nhóm trước cộng $4$.

**Thống kê.** Nhóm đầu có trung bình $\tfrac{1+1+5+5}4=3$, các sai lệch $-2,-2,2,2$ và phương sai (mẫu số $4$) bằng $4$. Nhóm sau có trung bình $7$, cùng các sai lệch, cùng phương sai $4$.

**Chuẩn hóa.** Trừ trung bình và chia $\sqrt4=2$, với hằng số ổn định cho tiến về $0$: cả hai nhóm cho $(-1,-1,1,1)$.

**Co giãn và dịch.** Với hệ số co giãn $\gamma=2$ và độ dịch $\beta=1$: $z=2(-1,-1,1,1)+1=(-1,-1,3,3)$ ở cả hai nhóm.

**Một giá trị, hai đầu ra.** Giá trị $5$ nằm trên trung bình ở nhóm đầu, cho đầu ra $3$, và dưới trung bình ở nhóm sau, cho đầu ra $-1$.

**Kiểm tra lại.** $(5-3)/2=1$ và $2\cdot1+1=3$; $(5-7)/2=-1$ và $2\cdot(-1)+1=-1$.
:::

![Hai trục số cùng thang từ 1 đến 9. Trục trên mang nhóm a gồm 1, 1, 5, 5 với μ = 3 và σ² = 4; trục dưới mang nhóm a + 4 gồm 5, 5, 9, 9 với μ = 7 và σ² = 4. Dòng cuối ghi đầu ra chung sau chuẩn hóa và co giãn z = (−1; −1; 3; 3) với γ = 2, β = 1, ε → 0⁺.](img/lec-06/batch-shift.svg)

Hình đặt hai nhóm trên cùng một trục số; hai tâm $\mu=3$ và $\mu=7$ khác nhau, nhưng sau chuẩn hóa cả hai cho cùng một dãy đầu ra. Trên hình, $a$ là nhóm đầu, $\mu$, $\sigma^2$ là $\mu_{\mathcal B}$, $\sigma_{\mathcal B}^2$ của định nghĩa dưới đây. Hình cho cả hai mặt của phương pháp: đầu ra không phụ thuộc vị trí chung của nhóm, nhưng đầu ra của một quan sát phụ thuộc các quan sát khác trong nhóm.

::: definition Định nghĩa 06.28 (Chuẩn hóa theo lô)
Cho một nhóm $\mathcal B$ gồm $\lvert\mathcal B\rvert\ge1$ quan sát và giá trị $a_i\in\mathbb R$ của một đặc trưng cố định tại quan sát $i\in\mathcal B$. Cho hằng số $\varepsilon>0$ và hai tham số học được $\gamma,\beta\in\mathbb R$.

**Thống kê của nhóm.**

$$
\mu_{\mathcal B}=\frac1{\lvert\mathcal B\rvert}\sum_{i\in\mathcal B}a_i,\qquad\sigma_{\mathcal B}^2=\frac1{\lvert\mathcal B\rvert}\sum_{i\in\mathcal B}(a_i-\mu_{\mathcal B})^2 .
$$

**Chuẩn hóa và biến đổi affine.**

$$
\widehat a_i=\frac{a_i-\mu_{\mathcal B}}{\sqrt{\sigma_{\mathcal B}^2+\varepsilon}},\qquad z_i=\gamma\,\widehat a_i+\beta .
\tag{5.2}
$$

**Hai chế độ.** Khi huấn luyện, (5.2) dùng thống kê của nhóm hiện tại. Khi suy luận, $\mu_{\mathcal B}$ và $\sigma_{\mathcal B}^2$ được thay bằng hai số cố định ước lượng trong huấn luyện, và đầu ra của mỗi quan sát chỉ phụ thuộc quan sát đó.

Mỗi đặc trưng của lớp có cặp $\gamma,\beta$ riêng; chuẩn hóa theo lô (batch normalization) là phép biến đổi (5.2) áp cho từng đặc trưng.
:::

Định nghĩa đổi phép tính mô hình chứ không đổi bộ tối ưu: $\gamma$, $\beta$ là tham số mới của mô hình, được cập nhật bằng bất kỳ quy tắc nào của Mục 2–4. Khác với các ma trận phạt của Mục 2, chuẩn hóa tác động lên tiền kích hoạt của lớp $l$; sau hàm kích hoạt, đại lượng đó là đầu vào $h$ của lớp $l+1$ trong (5.1), nên thang của tín hiệu đi vào gradient ở lớp sau được ổn định trước khi gradient được tính. Ioffe và Szegedy (2015) đề xuất đặt phép biến đổi ngay sau phép nhân $Wh$, trước hàm kích hoạt, và bỏ độ lệch của lớp vì $\beta$ đã đảm nhận vai trò đó (Goodfellow, Bengio và Courville 2016, mục 8.7.1, tr. 320–321).

Mệnh đề sau chỉ cần trung bình và phương sai của nhóm ở Định nghĩa 06.28; nó cho các tính chất của phép biến đổi (5.2).

::: proposition Mệnh đề 06.29 (Tính chất của chuẩn hóa theo lô)
**Giả thiết.** Như Định nghĩa 06.28, với thống kê của nhóm.

**Kết luận.**

- (a) Trên nhóm, $\widehat a$ có trung bình $0$ và phương sai $\dfrac{\sigma_{\mathcal B}^2}{\sigma_{\mathcal B}^2+\varepsilon}<1$; $z$ có trung bình $\beta$ và phương sai $\gamma^2\dfrac{\sigma_{\mathcal B}^2}{\sigma_{\mathcal B}^2+\varepsilon}$.
- (b) Nếu mọi $a_i$ cộng cùng một hằng số, mọi $\widehat a_i$ không đổi.
- (c) Nếu mọi $a_i$ nhân cùng một số $\varsigma>0$, thì $\widehat a_i$ thành $\varsigma(a_i-\mu_{\mathcal B})/\sqrt{\varsigma^2\sigma_{\mathcal B}^2+\varepsilon}$; khi $\sigma_{\mathcal B}^2>0$, giá trị này tiến tới $\widehat a_i$ của $\varepsilon\to0^+$, không phụ thuộc $\varsigma$.
- (d) Với $\gamma=\sqrt{\sigma_{\mathcal B}^2+\varepsilon}$ và $\beta=\mu_{\mathcal B}$, $z_i=a_i$ với mọi $i\in\mathcal B$.
- (e) Khi $\lvert\mathcal B\rvert\ge2$ và $\sigma_{\mathcal B}^2>0$, $\widehat a_i$ thay đổi khi một quan sát khác $i$ trong nhóm thay đổi giá trị theo cách làm đổi $\mu_{\mathcal B}$ hoặc $\sigma_{\mathcal B}^2$.

**Điều kiện áp dụng.** Thống kê tính trên nhóm, chế độ huấn luyện.

**Phạm vi.** Mệnh đề nói về phép biến đổi; nó không nói chuẩn hóa làm huấn luyện hội tụ nhanh hơn.
:::

::: proof Chứng minh Mệnh đề 06.29
**Bước 1 (phần a).** $\sum_{i\in\mathcal B}(a_i-\mu_{\mathcal B})=0$, nên trung bình của $\widehat a$ bằng $0$. Phương sai là $\frac1{\lvert\mathcal B\rvert}\sum_i\frac{(a_i-\mu_{\mathcal B})^2}{\sigma_{\mathcal B}^2+\varepsilon}=\frac{\sigma_{\mathcal B}^2}{\sigma_{\mathcal B}^2+\varepsilon}$, nhỏ hơn $1$ vì $\varepsilon>0$. Phép affine $z=\gamma\widehat a+\beta$ dời trung bình tới $\beta$ và nhân phương sai với $\gamma^2$.

**Bước 2 (phần b, c).** Cộng hằng số vào mọi $a_i$ cộng cùng hằng số vào $\mu_{\mathcal B}$, giữ các sai lệch $a_i-\mu_{\mathcal B}$ và $\sigma_{\mathcal B}^2$. Nhân với $\varsigma$ nhân các sai lệch với $\varsigma$ và $\sigma_{\mathcal B}^2$ với $\varsigma^2$; khi $\varepsilon\to0^+$, thương $\varsigma(a_i-\mu_{\mathcal B})/(\varsigma\sigma_{\mathcal B})$ không phụ thuộc $\varsigma$.

**Bước 3 (phần d).** Thay vào (5.2): $z_i=\sqrt{\sigma_{\mathcal B}^2+\varepsilon}\cdot\frac{a_i-\mu_{\mathcal B}}{\sqrt{\sigma_{\mathcal B}^2+\varepsilon}}+\mu_{\mathcal B}=a_i$.

**Bước 4 (phần e).** $\widehat a_i$ là hàm của $a_i$, $\mu_{\mathcal B}$ và $\sigma_{\mathcal B}^2$; khi $a_i$ giữ nguyên và $\mu_{\mathcal B}$ hay $\sigma_{\mathcal B}^2$ đổi, tử số hoặc mẫu số đổi. Ví dụ 06.19 cho một trường hợp cụ thể. $\square$
:::

Phần (a) cho thấy hằng số $\varepsilon$ làm phương sai chuẩn hóa nhỏ hơn $1$ một chút. Theo phần (b), (c), các lớp trước có thể dời hoặc co giãn tiền kích hoạt mà đầu ra chuẩn hóa vẫn có thang gần như cũ; hệ số $\gamma$ học được vẫn đổi thang đầu ra.

Phần (d) nói tham số hóa mới biểu diễn được mọi hàm của tham số hóa cũ, nên chuẩn hóa không làm mất khả năng biểu diễn. Theo phần (e), khi huấn luyện, đầu ra của một quan sát phụ thuộc các quan sát cùng nhóm.

Hệ quả của (e) cho mục tiêu huấn luyện: mất mát trên một nhóm không còn là trung bình các mất mát độc lập của từng quan sát, nên công thức (1.1) không mô tả đúng điều đang được cực tiểu. Mục tiêu phù hợp là kỳ vọng $\mathbb E_{\mathcal B}\bigl[\ell_{\mathcal B}(\theta)\bigr]$ của mất mát $\ell_{\mathcal B}$ trên nhóm, với $\theta$ gồm cả $\gamma$, $\beta$ và phân phối lấy theo cách rút nhóm.

::: example Ví dụ 06.20 (Hằng số ổn định và phụ thuộc nhóm)
**Dữ kiện.** Nhóm $(2,4,6,8)$, $\varepsilon=1$, $\gamma=1$, $\beta=0$.

**Tính.**

- Thống kê: $\mu_{\mathcal B}=5$, các sai lệch $-3,-1,1,3$.
- Phương sai: $\sigma_{\mathcal B}^2=\tfrac{9+1+1+9}4=5$, nên $\sqrt{\sigma_{\mathcal B}^2+\varepsilon}=\sqrt6$.
- Chuẩn hóa: $\widehat a=(-3,-1,1,3)/\sqrt6\approx(-1{,}225;\,-0{,}408;\,0{,}408;\,1{,}225)$, với phương sai $\tfrac56$.

**Đổi một quan sát khác.** Thay giá trị $8$ bằng $0$: nhóm $(2,4,6,0)$ có $\mu_{\mathcal B}=3$, $\sigma_{\mathcal B}^2=\tfrac{1+1+9+9}4=5$. Quan sát có giá trị $2$ nhận $\widehat a=(2-3)/\sqrt6\approx-0{,}408$, thay cho $-1{,}225$ ở nhóm cũ.

**Kiểm tra lại.** $\tfrac{(9+1+1+9)/4}{6}=\tfrac56=\tfrac{\sigma_{\mathcal B}^2}{\sigma_{\mathcal B}^2+\varepsilon}$, khớp Mệnh đề 06.29(a).
:::

::: remark Nhận xét 06.30 (Chế độ suy luận và giả thuyết về cơ chế)
**Thống kê khi suy luận.** Ioffe và Szegedy (2015, thuật toán 2) dùng khi suy luận trung bình của các $\mu_{\mathcal B}$ và $\tfrac{\lvert\mathcal B\rvert}{\lvert\mathcal B\rvert-1}$ nhân trung bình của các $\sigma_{\mathcal B}^2$, thu qua các nhóm huấn luyện. Thừa số $\tfrac{\lvert\mathcal B\rvert}{\lvert\mathcal B\rvert-1}$ bù cho việc $\sigma_{\mathcal B}^2$ dùng mẫu số $\lvert\mathcal B\rvert$. Lớp `BatchNorm1d` của PyTorch mặc định $\varepsilon=10^{-5}$ và cập nhật các thống kê chạy bằng trung bình mũ với hệ số $0{,}1$ cho thống kê của nhóm mới.

**Cơ chế.** Ioffe và Szegedy (2015) giải thích hiệu quả bằng việc giảm "dịch chuyển hiệp biến nội tại" (internal covariate shift), tức sự thay đổi phân phối đầu vào của mỗi lớp khi các lớp trước được cập nhật; đây là một giả thuyết, không phải định lý. Santurkar và cộng sự (2018) đưa ra một giải thích khác dựa trên độ trơn của mặt mất mát.
:::

**Trong học máy.** Đối tượng của Định nghĩa 06.28 là tiền kích hoạt của một lớp trong mạng, và nhóm là nhóm dữ liệu của SGD. Giả thiết ngầm của chế độ huấn luyện là thống kê của nhóm đại diện được phân phối của đặc trưng; giả thiết này yếu khi nhóm nhỏ, và bị vi phạm hoàn toàn khi nhóm có một quan sát, vì khi đó $\sigma_{\mathcal B}^2=0$ và mọi đầu ra bằng $\beta$. Tình huống 06.3 tính hậu quả cụ thể của việc dùng nhầm chế độ khi suy luận.

### 5.2 Hạ theo tọa độ và theo khối

Chuẩn hóa theo lô đổi phép tính mô hình và giữ nguyên tập biến được cập nhật. Một can thiệp khác làm ngược lại: giữ mục tiêu, nhưng mỗi lần chỉ cập nhật một tọa độ hoặc một nhóm tọa độ, khi bài toán con theo nhóm đó giải được chính xác hoặc rẻ hơn bài toán đầy đủ. Trực giác, chưa phải phát biểu hình thức: cực tiểu chính xác theo một tọa độ không bao giờ làm mục tiêu tăng, nhưng mỗi lần chỉ đi song song một trục. Ví dụ sau dùng một hàm có hạng ghép hai biến.

::: example Ví dụ 06.21 (Một lượt hạ theo tọa độ)
**Dữ kiện.** $F(\theta)=\tfrac12\bigl[([\theta]_1+[\theta]_2-2)^2+[\theta]_1^2+[\theta]_2^2\bigr]$ trên $\mathbb R^2$, điểm đầu $(0,0)$, $F(0,0)=2$.

**Bài toán con theo $[\theta]_1$.** Giữ $[\theta]_2$, đạo hàm theo $[\theta]_1$ là $2[\theta]_1+[\theta]_2-2$, đạo hàm bậc hai bằng $2>0$, nên nghiệm là $[\theta]_1=(2-[\theta]_2)/2$. Tương tự, nghiệm theo $[\theta]_2$ là $[\theta]_2=(2-[\theta]_1)/2$.

**Một lượt.** Giữ $[\theta]_2=0$: $[\theta]_1=1$, $F(1,0)=\tfrac12(1+1+0)=1$. Giữ giá trị mới $[\theta]_1=1$: $[\theta]_2=\tfrac12$, $F(1,\tfrac12)=\tfrac12(\tfrac14+1+\tfrac14)=\tfrac34$.

**Nghiệm chung.** Hệ $2[\theta]_1+[\theta]_2=2$, $[\theta]_1+2[\theta]_2=2$ cho $\theta^*=(\tfrac23,\tfrac23)$ với $F(\theta^*)=\tfrac23$.

**Kiểm tra lại.** Khai triển $F(\theta)=\tfrac12\theta^TQ\theta-(2,2)\theta+2$ với $Q=\begin{bmatrix}2&1\\1&2\end{bmatrix}$; tại $(1,\tfrac12)$: $\tfrac12(2+1+\tfrac12)-3+2=\tfrac34$.
:::

![Đường đồng mức của F trên hai trục u và v từ 0 đến 1. Đường gấp khúc gồm đoạn ngang ghi "giữ v" từ (0; 0) tới (1; 0) và đoạn dọc ghi "giữ u" từ (1; 0) tới (1; 1/2). Nghiệm chung (2/3; 2/3) được đánh dấu.](img/lec-06/coordinate-path.svg)

Hình vẽ lượt cập nhật trên các đường mức; hai trục $u$, $v$ trên hình là $[\theta]_1$, $[\theta]_2$ của ví dụ. Mỗi đoạn song song một trục, nên một lượt chưa tới nghiệm. Mỗi đoạn dừng đúng tại điểm tiếp xúc với một đường mức, nơi mục tiêu nhỏ nhất dọc đoạn đó.

::: algorithm Thuật toán 06.8 (Hạ theo khối)
**Đầu vào.** Phân hoạch tọa độ của $\theta$ thành $n_{\rm b}$ khối, $\theta=(\theta^{(1)},\ldots,\theta^{(n_{\rm b})})$; lịch chọn khối, tuần hoàn hoặc ngẫu nhiên; bộ giải cho bài toán con theo từng khối; điểm đầu, tiêu chí dừng và ngân sách.

**Các bước.** Lặp cho tới khi dừng:

1. Chọn khối $j$ theo lịch.
2. Giữ mọi khối khác ở giá trị hiện tại; tìm $\theta^{(j)}$ mới làm $F$ không lớn hơn giá trị tại $\theta^{(j)}$ cũ, chẳng hạn bằng cách cực tiểu chính xác theo khối đó.
3. Thay $\theta^{(j)}$ bằng giá trị mới trước khi chuyển sang khối sau.

**Đầu ra.** Tham số hiện tại khi dừng.

**Chi phí.** Phụ thuộc bộ giải bài toán con; không có một bậc chung.
:::

Khi mỗi khối là một tọa độ, thuật toán là hạ theo tọa độ (coordinate descent); khối thứ $j$ tổng quát hóa tọa độ thứ $j$. Thuật toán thay tập biến được cập nhật mỗi lần, không thay mục tiêu.

Mệnh đề sau cần cho phần (a) chỉ bước 2 của Thuật toán 06.8, và cho phần (b) thêm một hàm bậc hai lồi chặt hai biến, để tính được hệ số co.

::: proposition Mệnh đề 06.31 (Tính không tăng và tốc độ trên hàm bậc hai hai biến)
**Giả thiết.** (a) $F$ bất kỳ; Thuật toán 06.8 với bước 2 như đã nêu. (b) $F(\theta)=\tfrac12\theta^TA\theta-b^T\theta$ trên $\mathbb R^2$ với $A=\begin{bmatrix}a_{11}&a_{12}\\a_{12}&a_{22}\end{bmatrix}\succ0$; hạ theo tọa độ tuần hoàn với cực tiểu chính xác, mỗi lượt cập nhật $[\theta]_1$ rồi $[\theta]_2$; $\theta^*=A^{-1}b$.

**Kết luận.**

- (a) $F$ không tăng sau mỗi lần cập nhật khối.
- (b) Sau mỗi lượt, $[\theta]_2-[\theta^*]_2$ được nhân với $\dfrac{a_{12}^2}{a_{11}a_{22}}\in[0,1)$, và $[\theta]_1-[\theta^*]_1=-\dfrac{a_{12}}{a_{11}}\bigl([\theta]_2-[\theta^*]_2\bigr)$ sau mỗi lượt.

**Điều kiện áp dụng.** Phần (a) không cần tính lồi; phần (b) cần hàm bậc hai lồi chặt hai biến.

**Phạm vi.** Phần (a) không suy ra hội tụ tới cực tiểu. Phần (b) chỉ cho trường hợp hai biến.
:::

::: proof Chứng minh Mệnh đề 06.31
**Bước 1 (phần a).** Giá trị cũ của khối đang chọn, cùng các khối khác giữ nguyên, là một điểm khả thi của bài toán con, và tại đó mục tiêu bằng $F$ hiện tại. Bước 2 của thuật toán chọn giá trị không tệ hơn điểm đó.

**Bước 2 (hai bài toán con).** Đạo hàm theo $[\theta]_1$ là $a_{11}[\theta]_1+a_{12}[\theta]_2-[b]_1$, nên cực tiểu chính xác cho $[\theta]_1=([b]_1-a_{12}[\theta]_2)/a_{11}$; tương tự cho $[\theta]_2$. Nghiệm $\theta^*$ thỏa cùng hai đẳng thức. Với sai số $e=\theta-\theta^*$ trước một lượt và $e^+$ sau lượt đó:

$$
[e]_1^+=-\frac{a_{12}}{a_{11}}[e]_2,\qquad[e]_2^+=-\frac{a_{12}}{a_{22}}[e]_1^+=\frac{a_{12}^2}{a_{11}a_{22}}[e]_2 .
$$

**Bước 3 (hệ số).** $A\succ0$ cho $a_{11}a_{22}-a_{12}^2=\det A>0$, nên $0\le\tfrac{a_{12}^2}{a_{11}a_{22}}<1$. $\square$
:::

Phần (a) chỉ dùng việc giá trị cũ là một lựa chọn của bài toán con, nên đúng cho mọi hàm và mọi cách chia khối. Phần (b) cho thấy tốc độ phụ thuộc mức ghép giữa hai biến, đo bằng $a_{12}^2/(a_{11}a_{22})$. Không ghép thì một lượt tới nghiệm; ghép mạnh thì hệ số gần $1$.

Áp vào Ví dụ 06.21, với $A=Q$ và $b=(2,2)^T$, hệ số là $\tfrac14$, và sai số của $[\theta]_2$ đi từ $-\tfrac23$ qua $-\tfrac16$ tới $-\tfrac1{24}$ sau hai lượt. Với hàm $([\theta]_1-[\theta]_2)^2+0{,}01([\theta]_1^2+[\theta]_2^2)$ của Goodfellow, Bengio và Courville (2016, tr. 322), $A=2\begin{bmatrix}1{,}01&-1\\-1&1{,}01\end{bmatrix}$, hệ số mỗi lượt là $1/1{,}01^2\approx0{,}980$, và giảm sai số $100$ lần cần khoảng $232$ lượt, trong khi một bước Newton tới nghiệm. Hạ theo tọa độ trên hàm bậc hai là phương pháp Gauss–Seidel giải hệ $A\theta=b$.

**Trong học máy.** Goodfellow, Bengio và Courville (2016, công thức 8.38, tr. 321) dùng ví dụ mã hóa thưa (sparse coding). Mục tiêu theo từ điển và theo mã không lồi khi xét chung, nhưng lồi theo từng khối khi giữ khối kia, nên xen kẽ hai khối cho các bài toán con lồi giải được bằng phương pháp lồi. Cùng ý tưởng xuất hiện trong phân tích ma trận cho hệ gợi ý, nơi bình phương nhỏ nhất xen kẽ (alternating least squares) cập nhật lần lượt hai ma trận nhân tử. Giả thiết được bảo đảm là phần (a); kết luận hội tụ tới cực tiểu không được bảo đảm khi $F$ không lồi, và Powell (1973) dựng một hàm khả vi liên tục ba biến trên đó hạ theo tọa độ tuần hoàn với cực tiểu chính xác lặp vòng mà không tới điểm dừng.

### 5.3 Trung bình Polyak

Ba thành phần đã xét quyết định quỹ đạo $\theta_0,\theta_1,\ldots$; thành phần cuối chọn điểm nào làm đầu ra. Theo Ví dụ 05.14, với bước học cố định, SGD dao động quanh nghiệm ở một mức không giảm theo số vòng. Trực giác, chưa phải phát biểu hình thức: các điểm dao động ở hai phía của nghiệm, nên trung bình của chúng gần nghiệm hơn từng điểm.

::: example Ví dụ 06.22 (Trung bình bốn điểm dao động)
**Dữ kiện.** $F(\theta)=\tfrac12(\theta-2)^2$; bốn điểm cuối của một quỹ đạo: $1$; $3$; $1{,}5$; $2{,}5$.

**Tính.** Tổng bằng $8$, trung bình bằng $2$, đúng nghiệm, nên $F(2)=0$. Giá trị $F$ tại bốn điểm là $0{,}5$; $0{,}5$; $0{,}125$; $0{,}125$, trung bình $0{,}3125$.

**Kiểm tra lại.** $F$ lồi, và $0\le0{,}3125$, đúng chiều bất đẳng thức Jensen.
:::

::: definition Định nghĩa 06.32 (Trung bình Polyak)
Cho quỹ đạo $\theta_1,\ldots,\theta_T$ trong $\mathbb R^p$. Trung bình Polyak (Polyak averaging) là

$$
\bar\theta_T=\frac1T\sum_{t=1}^T\theta_t ,
\tag{5.3}
$$

tính trực tuyến bằng $\bar\theta_1=\theta_1$ và $\bar\theta_t=\bar\theta_{t-1}+(\theta_t-\bar\theta_{t-1})/t$.
:::

Công thức trực tuyến suy từ $t\bar\theta_t=(t-1)\bar\theta_{t-1}+\theta_t$ chia hai vế cho $t$, nên chỉ cần thêm $p$ số bộ nhớ. Trung bình Polyak thay quy tắc trả về và không thay quỹ đạo: dãy $\theta_t$ vẫn do quy tắc cập nhật sinh ra. Nó khác momentum, vốn thay chính bước cập nhật, và khác trung bình mũ của các điểm trên quỹ đạo ở Goodfellow, Bengio và Courville (2016, công thức 8.39, tr. 322), vốn có trọng số giảm theo tuổi của điểm.

::: corollary Hệ quả 06.33 (Trung bình Polyak với mục tiêu lồi)
**Giả thiết.** $F$ lồi trên $\mathbb R^p$; $\theta_1,\ldots,\theta_T$ bất kỳ.

**Kết luận.** $F(\bar\theta_T)\le\dfrac1T\displaystyle\sum_{t=1}^TF(\theta_t)$.

**Điều kiện áp dụng.** Cần $F$ lồi trên một tập lồi chứa mọi $\theta_t$.

**Phạm vi.** Hệ quả so trung bình với giá trị trung bình trên quỹ đạo, không so với điểm cuối hay điểm tốt nhất.
:::

::: proof Chứng minh Hệ quả 06.33
Bổ đề BĐ5 của Bài 05b nói: với $F$ lồi và trọng số không âm $\upsilon_t$ có tổng bằng $1$, $F\bigl(\sum_t\upsilon_t\theta_t\bigr)\le\sum_t\upsilon_tF(\theta_t)$. Áp với $\upsilon_t=\tfrac1T$. $\square$
:::

Khi bỏ giả thiết lồi, kết luận sai. Với $F(\theta)=(\theta^2-1)^2$, hai điểm $-1$ và $1$ đều là cực tiểu toàn cục với $F=0$, nhưng trung bình $0$ của chúng là cực đại địa phương với $F(0)=1$. Trung bình chỉ hợp lý khi các điểm cùng nằm trong một miền quanh một nghiệm.

Ở Ví dụ 06.22, hệ quả cho $F(2)=0\le0{,}3125$; trong ví dụ đó trung bình còn tốt hơn mọi điểm. Hệ quả 06.33 chưa nói trung bình tốt hơn điểm cuối. Mệnh đề sau trả lời điều đó trên mô hình nhiễu đơn giản nhất: hàm bậc hai một chiều với gradient có nhiễu cộng.

::: proposition Mệnh đề 06.34 (Trung bình Polyak trên hàm bậc hai có gradient nhiễu)
**Giả thiết.** $F(\theta)=\tfrac\lambda2(\theta-\theta^*)^2$ trên $\mathbb R$ với $\lambda>0$. Quy tắc cập nhật $\theta_t=\theta_{t-1}-\eta g_t$ với $g_t=\lambda(\theta_{t-1}-\theta^*)-\zeta_t$, trong đó $\zeta_1,\zeta_2,\ldots$ độc lập, kỳ vọng $0$, phương sai $V_\zeta$; $0<\eta\lambda\le1$; $\theta_0$ không ngẫu nhiên. Đặt $e_t=\theta_t-\theta^*$, $\nu=1-\eta\lambda\in[0,1)$, $\bar e_T=\bar\theta_T-\theta^*$.

**Kết luận.**

- (a) Điểm cuối: $\mathbb Ee_t=\nu^te_0$ và $\operatorname{Var}e_t=\eta^2V_\zeta\dfrac{1-\nu^{2t}}{1-\nu^2}\to\dfrac{\eta V_\zeta}{\lambda(2-\eta\lambda)}$ khi $t\to\infty$.
- (b) Trung bình: $\mathbb E\bar e_T=\dfrac{e_0\,\nu(1-\nu^T)}{T(1-\nu)}$ và $\operatorname{Var}\bar e_T\le\dfrac{V_\zeta}{\lambda^2T}$.

**Điều kiện áp dụng.** Nhiễu độc lập, cùng phương sai, không phụ thuộc $\theta$; bước học cố định trong $(0,1/\lambda]$.

**Phạm vi.** Mệnh đề là phép tính chính xác trên mô hình một chiều. Kết quả tổng quát cho hàm lồi mạnh nhiều chiều, với bước học giảm dần, là của Polyak và Juditsky (1992); chương không chứng minh.
:::

::: proof Chứng minh Mệnh đề 06.34
**Bước 1 (đệ quy).** Thay $g_t$ vào quy tắc cập nhật: $e_t=e_{t-1}-\eta\lambda e_{t-1}+\eta\zeta_t=\nu e_{t-1}+\eta\zeta_t$. Lặp lại:

$$
e_t=\nu^te_0+\eta\sum_{i=1}^t\nu^{\,t-i}\zeta_i .
$$

**Bước 2 (phần a).** Lấy kỳ vọng, các $\zeta_i$ có kỳ vọng $0$, nên $\mathbb Ee_t=\nu^te_0$. Các $\zeta_i$ độc lập, nên $\operatorname{Var}e_t=\eta^2V_\zeta\sum_{i=1}^t\nu^{2(t-i)}$, và tổng cấp số nhân bằng $\tfrac{1-\nu^{2t}}{1-\nu^2}$. Khi $t\to\infty$, giới hạn là $\tfrac{\eta^2V_\zeta}{1-\nu^2}$, và $1-\nu^2=\eta\lambda(2-\eta\lambda)$.

**Bước 3 (tổng các sai số).** Cộng đẳng thức của Bước 1 theo $t=1,\ldots,T$ và đổi thứ tự tổng:

$$
\begin{aligned}
\sum_{t=1}^Te_t&=e_0\sum_{t=1}^T\nu^t+\eta\sum_{i=1}^T\zeta_i\sum_{t=i}^T\nu^{\,t-i}\\
&=e_0\frac{\nu(1-\nu^T)}{1-\nu}+\eta\sum_{i=1}^T\zeta_i\,\frac{1-\nu^{\,T-i+1}}{1-\nu}.
\end{aligned}
$$

**Bước 4 (phần b).** Chia cho $T$ và lấy kỳ vọng được $\mathbb E\bar e_T$. Phương sai là $\tfrac{\eta^2V_\zeta}{T^2(1-\nu)^2}\sum_{i=1}^T\bigl(1-\nu^{\,T-i+1}\bigr)^2$; vì $0\le\nu<1$, mỗi số hạng trong tổng thuộc $(0,1]$, nên

$$
\begin{aligned}
\operatorname{Var}\bar e_T&\le\frac{\eta^2V_\zeta\,T}{T^2(1-\nu)^2}\\
&=\frac{\eta^2V_\zeta}{(\eta\lambda)^2T}\\
&=\frac{V_\zeta}{\lambda^2T}.
\end{aligned}
$$

Dòng hai dùng $1-\nu=\eta\lambda$. $\square$
:::

Phần (a) là mức dao động của Ví dụ 05.14: phương sai của điểm cuối dừng ở một mức tỷ lệ với $\eta$, không giảm theo số vòng. Phần (b) nói trung bình có độ lệch giảm như $1/T$ và phương sai giảm như $1/T$, với cận $V_\zeta/(\lambda^2T)$ không phụ thuộc $\eta$. Như vậy, trên mô hình này, trung bình Polyak đạt điều mà Bài 05 đòi lịch bước học giảm dần mới đạt được, trong khi quỹ đạo vẫn dùng bước học cố định.

::: example Ví dụ 06.23 (Trung bình Polyak trên ví dụ ba quan sát của Bài 05)
**Dữ kiện.** Ba quan sát $-1$, $1$, $3$ với mô hình hằng $\theta\in\mathbb R$ và mất mát bằng nửa bình phương hiệu giữa $\theta$ và giá trị quan sát (Ví dụ 05.1, 05.14); mỗi vòng rút đều một quan sát, nhóm cỡ $1$. Mục tiêu $F(\theta)=\tfrac12(\theta-1)^2+\tfrac43$ có $\lambda=1$, $\theta^*=1$. Gradient của quan sát có giá trị $o$ là $\theta-o=(\theta-1)-(o-1)$, nên nhiễu $\zeta_t$ bằng giá trị quan sát được rút trừ $1$, nhận $-2$, $0$, $2$ với xác suất bằng nhau, và $V_\zeta=\tfrac{4+0+4}3=\tfrac83$. Điểm đầu $\theta_0=0$, nên $e_0=-1$; $\eta=0{,}1$, nên $\nu=0{,}9$.

**Điểm cuối.** Theo Mệnh đề 06.34(a), sai số bình phương trung bình $\mathbb Ee_t^2=(\mathbb Ee_t)^2+\operatorname{Var}e_t$ tiến tới $\tfrac{0{,}1\cdot8/3}{1\cdot1{,}9}=\tfrac8{57}\approx0{,}140$, đúng mức của Ví dụ 05.14.

**Trung bình, $T=1000$.**

- Độ lệch: $\mathbb E\bar e_T=-\tfrac{0{,}9(1-0{,}9^{1000})}{1000\cdot0{,}1}\approx-0{,}009$, bình phương $\approx8{,}1\cdot10^{-5}$.
- Phương sai: cận $\tfrac{8/3}{1000}\approx0{,}00267$; tính đúng tổng ở Bước 4 cho $\approx0{,}00263$.
- Sai số bình phương trung bình $\approx0{,}00271$, nhỏ hơn mức $0{,}140$ của điểm cuối khoảng $52$ lần.

**Trung bình, $T=100$.** Độ lệch $\approx-0{,}090$, phương sai $\approx0{,}0230$, sai số bình phương trung bình $\approx0{,}0311$.

**Kiểm tra lại.** Mô phỏng $20\,000$ lần chạy với $T=100$, mỗi vòng rút đều một trong ba quan sát, cho sai số bình phương trung bình $\approx0{,}0311$ của trung bình và $\approx0{,}139$ của điểm cuối, khớp phép tính.
:::

**Trong học máy.** Goodfellow, Bengio và Courville (2016, mục 8.7.3, tr. 322) ghi nhận trung bình Polyak chỉ có cơ sở kinh nghiệm trên mạng nơ-ron, và dùng trung bình mũ (8.39) để không cộng các điểm ở miền khác của mặt mất mát; đó là cách đáp ứng giả thiết "các điểm cùng một miền" của Hệ quả 06.33. PyTorch cung cấp lớp `torch.optim.swa_utils.AveragedModel` để giữ trung bình tham số; khi mô hình có chuẩn hóa theo lô, thống kê suy luận của mô hình trung bình phải tính lại, việc mà hàm `torch.optim.swa_utils.update_bn` thực hiện, vì trung bình tham số không kéo theo trung bình đúng của các thống kê.

### 5.4 Thiết kế đường truyền gradient

Hạ theo khối và trung bình Polyak không đổi mô hình; chuẩn hóa theo lô đổi phép tính nhưng không đổi đường truyền gradient giữa các lớp. Theo Mệnh đề 05.32, độ nhạy qua một chuỗi lớp là tích các đạo hàm của từng lớp, và tích co theo cấp số mũ khi mỗi thừa số nhỏ hơn $1$. Gradient theo tham số của các lớp gần đầu vào chứa tích đó làm thừa số, nên co theo độ sâu; hiện tượng này gọi là gradient tiêu biến (vanishing gradient).

Trực giác, chưa phải phát biểu hình thức: nếu mỗi lớp cộng thẳng đầu vào của nó vào đầu ra, mỗi thừa số của tích có thêm $1$ và không còn nhỏ. Định nghĩa sau đặt tên cho cấu trúc đó.

::: definition Định nghĩa 06.35 (Khối nối tắt)
Cho hàm khả vi $f_l:\mathbb R^{n_{\rm in}}\to\mathbb R^{n_{\rm in}}$. Khối nối tắt, còn gọi là khối phần dư (residual block), tính

$$
h_l=h_{l-1}+f_l(h_{l-1}) ,
\tag{5.4}
$$

tức đầu vào $h_{l-1}$ được cộng thẳng vào đầu ra của $f_l$; đường cộng thẳng đó gọi là kết nối tắt (skip connection). Ma trận Jacobi của khối theo đầu vào là $\mathrm I+J_{f_l}(h_{l-1})$, với $J_{f_l}$ là ma trận Jacobi của $f_l$.
:::

Ví dụ sau so một chuỗi vô hướng thường với một chuỗi có nối tắt.

::: example Ví dụ 06.24 (Năm lớp có và không có nối tắt)
**Dữ kiện.** Biểu diễn vô hướng $h_0,\ldots,h_5$ qua năm lớp, mất mát $\ell$ phụ thuộc $h_5$.

**Chuỗi thường.** $h_l=0{,}1\,h_{l-1}$: mỗi đạo hàm lớp bằng $0{,}1$, nên $\partial h_5/\partial h_0=0{,}1^5=10^{-5}$.

**Chuỗi có nối tắt.** $h_l=h_{l-1}+f_l(h_{l-1})$ với $f_l(h)=0{,}1\,h$: mỗi đạo hàm lớp bằng $1+0{,}1=1{,}1$, nên $\partial h_5/\partial h_0=1{,}1^5=1{,}61051$.

**Gradient theo tham số.** Theo quy tắc dây chuyền,

$$
\frac{\partial\ell}{\partial h_0}=\frac{\partial\ell}{\partial h_5}\prod_{l=1}^5\frac{\partial h_l}{\partial h_{l-1}} ,
$$

và với một tham số $w$ chỉ tác động qua $h_0$, còn nhân thêm $\partial h_0/\partial w$.

**Kiểm tra lại.** $1{,}1^2=1{,}21$, $1{,}1^4=1{,}4641$, $1{,}1^5=1{,}61051$.
:::

![Hai chuỗi năm lớp vô hướng từ h₀ tới h₅. Chuỗi trên, hₗ = 0,1hₗ₋₁, mỗi mũi tên mang đạo hàm 0,1, tích bằng 10⁻⁵. Chuỗi dưới, hₗ = hₗ₋₁ + 0,1hₗ₋₁, mỗi mũi tên mang đạo hàm 1,1, tích bằng 1,61051.](img/lec-06/gradient-chain.svg)

Hình đặt hai chuỗi song song; mỗi mũi tên mang đạo hàm của một lớp, và tích ở cuối mỗi dòng là $\partial h_5/\partial h_0$. Hai dòng chỉ khác nhau ở số hạng $h_{l-1}$ được cộng thẳng vào đầu ra của lớp, và số hạng đó cộng thêm $1$ vào mỗi thừa số.

::: proposition Mệnh đề 06.36 (Hệ số truyền qua chuỗi có nối tắt)
**Giả thiết.** $L\ge1$ lớp vô hướng; các hàm $f_l$ khả vi với $\lvert f_l'\rvert\le c_{\rm s}$ trên toàn trục, $0\le c_{\rm s}<1$.

**Kết luận.**

- (a) Với nối tắt $h_l=h_{l-1}+f_l(h_{l-1})$: $\dfrac{\partial h_L}{\partial h_0}=\displaystyle\prod_{l=1}^L\bigl(1+f_l'(h_{l-1})\bigr)$ và $(1-c_{\rm s})^L\le\dfrac{\partial h_L}{\partial h_0}\le(1+c_{\rm s})^L$.
- (b) Không nối tắt, $h_l=f_l(h_{l-1})$: $\Bigl\lvert\dfrac{\partial h_L}{\partial h_0}\Bigr\rvert\le c_{\rm s}^L$.

**Điều kiện áp dụng.** Chuỗi vô hướng, các lớp nối tiếp.

**Phạm vi.** Hai cận của (a) đều có thể tiến về $0$ hoặc $\infty$ khi $L\to\infty$; nối tắt không bảo đảm một cận chung cho mọi độ sâu. Hệ số truyền chỉ là một thừa số của gradient theo tham số.
:::

::: proof Chứng minh Mệnh đề 06.36
**Bước 1 (tích).** Theo quy tắc dây chuyền (Mệnh đề 05.32 với chuỗi tổng quát), $\partial h_L/\partial h_0=\prod_l\partial h_l/\partial h_{l-1}$, và $\partial h_l/\partial h_{l-1}$ bằng $1+f_l'(h_{l-1})$ khi có nối tắt, bằng $f_l'(h_{l-1})$ khi không.

**Bước 2 (cận).** Với nối tắt, mỗi thừa số thuộc $[1-c_{\rm s},1+c_{\rm s}]$ và dương; tích của $L$ số như vậy thuộc $[(1-c_{\rm s})^L,(1+c_{\rm s})^L]$. Không nối tắt, mỗi thừa số có trị tuyệt đối không quá $c_{\rm s}$. $\square$
:::

Với $c_{\rm s}=0{,}1$ và $L=5$: chuỗi có nối tắt có hệ số trong $[0{,}9^5;\,1{,}1^5]\approx[0{,}590;\,1{,}611]$, chuỗi thường có hệ số không quá $10^{-5}$. Phần (a) không cho bảo đảm ổn định với mọi độ sâu: $1{,}1^L\to\infty$ khi $L\to\infty$, và $0{,}9^L\to0$. Nối tắt đổi tích của các số nhỏ thành tích của các số gần $1$. Goodfellow, Bengio và Courville (2016, mục 8.7.5, tr. 326) diễn đạt điều này là rút ngắn đường ngắn nhất từ tham số lớp dưới tới đầu ra.

**Trong học máy.** Mạng phần dư (residual network) của He và cộng sự (2016) dùng khối (5.4) với $f_l$ gồm vài lớp tích chập; đó là trường hợp vectơ của Mệnh đề 06.36, với ma trận Jacobi $\mathrm I+J_{f_l}$ thay cho $1+f_l'$. Trong trường hợp vectơ, chuẩn toán tử của tích $\prod_l(\mathrm I+J_{f_l})$ bị chặn trên bởi $(1+c_{\rm s})^L$ khi mọi chuẩn $\lVert J_{f_l}\rVert$ không vượt $c_{\rm s}$, vì chuẩn toán tử của một tích không vượt tích các chuẩn và $\lVert\mathrm I+J\rVert\le1+\lVert J\rVert$; khi các chuẩn này không bị chặn, nối tắt không cho cận nào. Đầu phụ (auxiliary head), một bản sao của đầu ra gắn vào lớp giữa trong lúc huấn luyện, là một cách khác rút ngắn đường truyền (Goodfellow, Bengio và Courville 2016, mục 8.7.5). Can thiệp này đổi mô hình, tức đổi mục tiêu $F$, một lần từ đầu quá trình huấn luyện.

::: exercise Bài tập 06.7
- (a) Nhóm $(1,3,3,5)$, $\varepsilon=2$, $\gamma=3$, $\beta=-1$. Tính $\mu_{\mathcal B}$, $\sigma_{\mathcal B}^2$, $\widehat a$, $z$, rồi kiểm trung bình và phương sai của $z$ bằng Mệnh đề 06.29(a).
- (b) Hạ theo tọa độ tuần hoàn với cực tiểu chính xác trên $F(\theta)=\tfrac12\theta^TA\theta-b^T\theta$, $A=\begin{bmatrix}4&2\\2&2\end{bmatrix}$, $b=(2,2)^T$, từ $(0,0)$. Tính hai lượt, giá trị $F$ sau mỗi lần cập nhật và hệ số co của Mệnh đề 06.31(b).
:::

::: hint
Ở (a), $\sigma_{\mathcal B}^2=2$, nên mẫu số là $2$. Ở (b), nghiệm $\theta^*=A^{-1}b$ và hai công thức cập nhật là $[\theta]_1=(2-2[\theta]_2)/4$, $[\theta]_2=(2-2[\theta]_1)/2$.
:::

::: solution
**Câu (a).**

- Thống kê: $\mu_{\mathcal B}=3$, sai lệch $-2,0,0,2$, $\sigma_{\mathcal B}^2=\tfrac84=2$.
- Chuẩn hóa: $\sqrt{\sigma_{\mathcal B}^2+\varepsilon}=2$, nên $\widehat a=(-1,0,0,1)$.
- Đầu ra: $z=3\widehat a-1=(-4,-1,-1,2)$.
- Kiểm: trung bình của $z$ là $-1=\beta$; sai lệch của $z$ là $-3,0,0,3$, phương sai $\tfrac{18}4=4{,}5$, khớp $\gamma^2\tfrac{\sigma_{\mathcal B}^2}{\sigma_{\mathcal B}^2+\varepsilon}=9\cdot\tfrac24$.

**Câu (b).** $\det A=4$, $\theta^*=\tfrac14\begin{bmatrix}2&-2\\-2&4\end{bmatrix}(2,2)^T=(0,1)^T$, $F(\theta^*)=-\tfrac12b^T\theta^*=-1$.

- Lượt 1: $[\theta]_1=\tfrac24=\tfrac12$, $F(\tfrac12,0)=\tfrac12-1=-\tfrac12$; $[\theta]_2=\tfrac{2-1}2=\tfrac12$, $F(\tfrac12,\tfrac12)=-\tfrac34$.
- Lượt 2: $[\theta]_1=\tfrac{2-1}4=\tfrac14$, $F(\tfrac14,\tfrac12)=-\tfrac78$; $[\theta]_2=\tfrac{2-\frac12}2=\tfrac34$, $F(\tfrac14,\tfrac34)=-\tfrac{15}{16}$.

Hệ số $\tfrac{a_{12}^2}{a_{11}a_{22}}=\tfrac48=\tfrac12$: sai số của $[\theta]_2$ đi từ $-1$ qua $-\tfrac12$ tới $-\tfrac14$. $F$ giảm ở mọi lần cập nhật, đúng Mệnh đề 06.31(a).

**Kiểm tra lại.** Tại $(\tfrac14,\tfrac34)$, dạng toàn phương bằng $4\cdot\tfrac1{16}+2\cdot2\cdot\tfrac3{16}+2\cdot\tfrac9{16}=\tfrac{34}{16}$ và $b^T\theta=2$, nên $F=\tfrac{17}{16}-2=-\tfrac{15}{16}$. Sau lượt 2, $[\theta]_1-[\theta^*]_1=\tfrac14=-\tfrac24\cdot(-\tfrac14)$, khớp Mệnh đề 06.31(b).
:::

::: exercise Bài tập 06.8
- (a) Xét mô hình của Mệnh đề 06.34: sai số $e_t=\theta_t-\theta^*$ thỏa $e_t=(1-\eta\lambda)e_{t-1}+\eta\zeta_t$ với nhiễu độc lập, kỳ vọng $0$, phương sai $V_\zeta$; mức giới hạn của phương sai điểm cuối là $\tfrac{\eta V_\zeta}{\lambda(2-\eta\lambda)}$, độ lệch của trung bình là $\tfrac{e_0\nu(1-\nu^T)}{T(1-\nu)}$ với $\nu=1-\eta\lambda$, và cận phương sai của trung bình là $\tfrac{V_\zeta}{\lambda^2T}$. Lấy $\lambda=2$, $\eta=0{,}25$, $V_\zeta=1$, $e_0=1$. Tính mức giới hạn của phương sai điểm cuối, độ lệch của $\bar e_{100}$ và cận phương sai của $\bar e_{100}$.
- (b) Một chuỗi $L=20$ lớp vô hướng có $\lvert f_l'\rvert\le c_{\rm s}=0{,}2$. Với nối tắt, $\partial h_L/\partial h_0$ nằm giữa $(1-c_{\rm s})^L$ và $(1+c_{\rm s})^L$; không nối tắt, $\lvert\partial h_L/\partial h_0\rvert\le c_{\rm s}^L$ (Mệnh đề 06.36). Tính ba cận này.
- (c) Với dữ kiện của (a), tìm số vòng $T$ nhỏ nhất để cận phương sai của $\bar e_T$ không vượt một phần mười mức giới hạn của phương sai điểm cuối.
:::

::: hint
Ở (a), $\nu=1-\eta\lambda=\tfrac12$. Ở (c), giải $\tfrac{V_\zeta}{\lambda^2T}\le\tfrac1{10}\cdot\tfrac1{12}$.
:::

::: solution
**Câu (a).** $\nu=\tfrac12$. Mức giới hạn $\tfrac{\eta V_\zeta}{\lambda(2-\eta\lambda)}=\tfrac{0{,}25}{2\cdot1{,}5}$, tức $\tfrac1{12}\approx0{,}0833$. Độ lệch $\tfrac{1\cdot0{,}5(1-0{,}5^{100})}{100\cdot0{,}5}\approx0{,}01$. Cận phương sai $\tfrac1{4\cdot100}=0{,}0025$; tổng chính xác cho $\approx0{,}00246$.

**Câu (b).** $0{,}8^{20}\approx0{,}0115$ và $1{,}2^{20}\approx38{,}3$; chuỗi thường: $0{,}2^{20}\approx1{,}05\cdot10^{-14}$.

**Câu (c).** Cần $\tfrac1{4T}\le\tfrac1{120}$, tức $T\ge30$; số vòng nhỏ nhất là $T=30$.

**Kiểm tra lại.** Ở (a), $\eta\lambda=0{,}5$ và $2-\eta\lambda=1{,}5$. Ở (c), $\tfrac1{4\cdot30}=\tfrac1{120}$, đúng một phần mười của $\tfrac1{12}$.
:::

**Chuỗi suy luận của mục.** Công thức (5.1) chỉ ra chỗ thang của tín hiệu đi vào gradient. Định nghĩa 06.28 và Mệnh đề 06.29 chuẩn hóa tín hiệu đó, đổi lại sự phụ thuộc giữa các quan sát cùng nhóm.

Thuật toán 06.8 và Mệnh đề 06.31 đổi tập biến cập nhật, với tính không tăng không điều kiện và tốc độ phụ thuộc độ ghép. Định nghĩa 06.32, Hệ quả 06.33 và Mệnh đề 06.34 đổi quy tắc trả về; kết quả đích của mục là Mệnh đề 06.34(b), phương sai của trung bình giảm như $1/T$ với bước học cố định. Định nghĩa 06.35 và Mệnh đề 06.36 đổi kiến trúc để tích đạo hàm gần $1$.

**Kết mục.** Mục đã cho bốn can thiệp, mỗi can thiệp với giả thiết riêng:

- chuẩn hóa theo lô cần nhóm đại diện được phân phối (Mệnh đề 06.29);
- hạ theo khối cần giá trị cũ là một lựa chọn của bài toán con (Mệnh đề 06.31);
- trung bình Polyak cần các điểm cùng một miền lồi (Hệ quả 06.33);
- nối tắt cần các đạo hàm lớp bị chặn (Mệnh đề 06.36).

Không can thiệp nào đổi điểm đầu, và mục tiêu chỉ đổi một lần khi đổi mô hình. Mục 6 thay điểm đầu và mục tiêu theo giai đoạn.

## 6. Huấn luyện theo giai đoạn

Mục 5 kết thúc với bốn can thiệp giữ nguyên điểm đầu và giữ nguyên mục tiêu trong suốt quá trình. Với một số bài toán, điểm đầu quyết định kết quả bất kể quy tắc cập nhật. Với mạng tuyến tính hai lớp một đơn vị, dự đoán $w_2w_1x$, một quan sát có đầu vào $1$ và nhãn $3$, mất mát $F(\theta)=\tfrac12(w_1w_2-3)^2$ với $\theta=(w_1,w_2)^T$ có gradient bằng $0$ tại gốc; mọi phương pháp gradient bắt đầu tại $(0,0)$ đứng yên ở đó, với $F=\tfrac92$, trong khi giá trị nhỏ nhất là $0$. Mục này thay điểm đầu, mục tiêu và phân phối lấy mẫu theo giai đoạn, bằng tiền huấn luyện, phương pháp tiếp diễn và học theo chương trình.

### 6.1 Tiền huấn luyện có giám sát

Mệnh đề sau mô tả các điểm dừng của mục tiêu nêu ở đầu mục, để thấy điểm đầu quyết định điều gì. Mục tiêu này cùng dạng với Tình huống 04.3 của Bài 04, ở đó với nhãn $1$.

::: proposition Mệnh đề 06.37 (Điểm dừng của mạng tuyến tính hai lớp trên một quan sát)
**Giả thiết.** $F(\theta)=\tfrac12(w_1w_2-3)^2$ trên $\mathbb R^2$, $\theta=(w_1,w_2)^T$; giảm gradient với bước học $\eta>0$ bất kỳ.

**Kết luận.**

- (a) $\nabla F(\theta)=(w_1w_2-3)\,(w_2,w_1)^T$. Các điểm dừng là gốc và hyperbol $w_1w_2=3$; mọi điểm của hyperbol là cực tiểu toàn cục với $F=0$.
- (b) Gốc là điểm yên ngựa: Hessian tại gốc là $\begin{bmatrix}0&-3\\-3&0\end{bmatrix}$ với giá trị riêng $3$ và $-3$.
- (c) Từ một điểm trên đường $w_1=-w_2$, mọi bước giảm gradient giữ tham số trên đường đó, và trên đường đó $F\ge\tfrac92$.
- (d) Từ gốc, giảm gradient với gradient đầy đủ không rời gốc.

**Điều kiện áp dụng.** Gradient đầy đủ, chính xác.

**Phạm vi.** Mệnh đề không nói giảm gradient từ một điểm ngoài đường $w_1=-w_2$ hội tụ tới hyperbol; điều đó cần chọn $\eta$ thích hợp.
:::

::: proof Chứng minh Mệnh đề 06.37
**Bước 1 (phần a).** Quy tắc dây chuyền cho $\partial F/\partial w_1=(w_1w_2-3)w_2$ và $\partial F/\partial w_2=(w_1w_2-3)w_1$. Gradient bằng $0$ khi $w_1w_2=3$, hoặc khi $w_1=w_2=0$. Trên hyperbol, $F=0=\min F$.

**Bước 2 (phần b).** Hessian là $\begin{bmatrix}w_2^2&2w_1w_2-3\\2w_1w_2-3&w_1^2\end{bmatrix}$, bằng $\begin{bmatrix}0&-3\\-3&0\end{bmatrix}$ tại gốc, có giá trị riêng $3$ theo $(1,-1)$ và $-3$ theo $(1,1)$. Một giá trị riêng âm và một dương: điểm yên ngựa.

**Bước 3 (phần c).** Nếu $w_2=-w_1$ thì $w_1w_2-3=-w_1^2-3$ và gradient là $(-w_1^2-3)(-w_1,w_1)^T$, có hai tọa độ đối nhau. Bước $-\eta\nabla F$ vì vậy giữ $w_1+w_2=0$. Trên đường đó $F=\tfrac12(w_1^2+3)^2\ge\tfrac92$.

**Bước 4 (phần d).** Tại gốc, gradient bằng $0$, nên mọi bước bằng $0$. $\square$
:::

Theo phần (b) và (d), gốc không phải cực tiểu nhưng có gradient bằng $0$, nên giảm gradient bắt đầu tại đó không rời đi. Phần (c) mở rộng điều đó cho cả một đường. Một điểm đầu ngẫu nhiên theo phân phối liên tục, độc lập theo hai tọa độ, tránh đường $w_1=-w_2$ với xác suất $1$, cùng lập luận với Mệnh đề 05.31. Trực giác, chưa phải phát biểu hình thức: một phần của mô hình có thể học trên một nhiệm vụ dễ hơn, và tham số học được là một điểm đầu đã có tín hiệu gradient cho nhiệm vụ đích.

::: example Ví dụ 06.25 (Điểm đầu từ một nhiệm vụ phụ)
**Dữ kiện.** Mục tiêu đích $F(\theta)=\tfrac12(w_1w_2-3)^2$ với $\theta=(w_1,w_2)^T$ và gradient $(w_1w_2-3)(w_2,w_1)^T$ (Mệnh đề 06.37).

**Nhiệm vụ phụ.** Một quan sát có đầu vào $1$ và nhãn $2$, mô hình một lớp $w_1x$, mất mát $\tfrac12(w_1-2)^2$; nghiệm $w_1=2$.

**Chuyển tham số.** Giữ $w_1=2$, khởi tạo phần mới $w_2=1$: điểm đầu $\theta_0=(2,1)^T$, với $w_1w_2-3=-1$, $F(\theta_0)=\tfrac12$ và $\nabla F(\theta_0)=-1\cdot(1,2)^T=(-1,-2)^T$.

**Một bước tinh chỉnh.** Giảm gradient trên mục tiêu đích, cập nhật đồng thời, $\eta=0{,}1$:

- điểm mới $\theta_1=\theta_0+0{,}1\cdot(1,2)^T=(2{,}1;\,1{,}2)^T$;
- tích $w_1w_2=2{,}52$ và $F(\theta_1)=\tfrac12(0{,}48)^2=0{,}1152$.

**Kiểm tra lại.** $0{,}1152=\tfrac{72}{625}$, vì $0{,}48=\tfrac{12}{25}$ và $\tfrac12\cdot\tfrac{144}{625}=\tfrac{72}{625}$. Cập nhật đồng thời dùng gradient tại điểm cũ cho cả hai tọa độ.
:::

Ví dụ cho thấy một điểm đầu có tín hiệu gradient; nó không chứng minh tiền huấn luyện tốt hơn mọi khởi tạo ngẫu nhiên. Định nghĩa sau mô tả quy trình chung.

::: definition Định nghĩa 06.38 (Tiền huấn luyện có giám sát)
Cho một nhiệm vụ phụ có dữ liệu gán nhãn và mô hình phụ với tham số $\theta_{\rm aux}$, một mục tiêu đích $F$ trên $\mathbb R^p$, và một phép chuyển tham số

$$
\mathcal T:(\theta_{\rm aux},\xi)\mapsto\theta_0\in\mathbb R^p ,
\tag{6.1}
$$

trong đó $\xi$ là khởi tạo cho phần tham số của mô hình đích không có trong mô hình phụ. Tiền huấn luyện có giám sát (supervised pretraining) gồm ba giai đoạn:

1. học $\theta_{\rm aux}$ trên nhiệm vụ phụ;
2. đặt $\theta_0=\mathcal T(\theta_{\rm aux},\xi)$;
3. tinh chỉnh (fine-tuning): tối ưu $F$ từ $\theta_0$, trên các khối tham số chỉ định trước, với tiêu chí dừng và chọn điểm theo dữ liệu xác thực của nhiệm vụ đích.
:::

Ở Ví dụ 06.25, $\theta_{\rm aux}=2$, $\xi=1$ và $\mathcal T(2,1)=(2,1)^T$. Tiền huấn luyện thay thành phần "điểm đầu" của Định nghĩa 06.1, và có thể đổi kiến trúc giữa hai giai đoạn; nó không thay mục tiêu đích, vì giai đoạn 3 tối ưu đúng $F$. Nhầm lẫn thường gặp là coi nhãn của nhiệm vụ phụ là một phần của mục tiêu đích; nhãn phụ chỉ dùng để học $\theta_{\rm aux}$.

**Trong học máy.** Goodfellow, Bengio và Courville (2016, mục 8.7.4, tr. 323–325) mô tả tiền huấn luyện tham lam từng lớp (greedy layer-wise pretraining): học một mạng nông, giữ lớp ẩn, thêm lớp và bộ dự đoán mới, rồi tinh chỉnh chung; đó là một cách dựng $\mathcal T$. Học chuyển giao (transfer learning) trên ảnh, khởi tạo các lớp đầu của một mạng từ mạng đã học trên một tập nhãn khác rồi huấn luyện chung, là một cách khác (Yosinski và cộng sự 2014, dẫn qua Goodfellow, Bengio và Courville 2016, tr. 325). Giả thiết cần kiểm là kiến trúc tương thích để $\mathcal T$ có nghĩa; kết luận "tốt hơn" chỉ kiểm được trên mục tiêu đích, với ngân sách tính cả giai đoạn 1.

### 6.2 Phương pháp tiếp diễn

Tiền huấn luyện thay điểm đầu và có thể đổi không gian tham số. Một cách khác giữ nguyên không gian tham số và thay chính mục tiêu. Trực giác, chưa phải phát biểu hình thức: giải một mục tiêu dễ trước, rồi dùng nghiệm của nó làm điểm đầu cho mục tiêu khó hơn, cho tới mục tiêu đích. Ví dụ sau dùng một họ mục tiêu bậc bốn.

::: example Ví dụ 06.26 (Họ mục tiêu bậc bốn)
**Dữ kiện.** Họ $F_c(\theta)=(\theta^2-1)^2+c\,\theta^2$ trên $\mathbb R$, $c\ge0$; mục tiêu đích là $F_0$. Khai triển $F_c(\theta)=\theta^4+(c-2)\theta^2+1$: tham số $c$ chỉ đổi hệ số của $\theta^2$.

**Ba thành viên.**

| $c$ | Đạo hàm $F_c'(\theta)$ | Các cực tiểu | Giá trị nhỏ nhất |
|---|---|---|---|
| $3$ | $4\theta^3+2\theta$ | $0$ | $1$ |
| $1{,}5$ | $4\theta^3-\theta$ | $\pm\tfrac12$ | $\tfrac{15}{16}$ |
| $0$ | $4\theta^3-4\theta$ | $\pm1$ | $0$ |

**Kiểm tra lại.** Với $c=1{,}5$: $F_{1{,}5}(\tfrac12)=\tfrac1{16}-\tfrac12\cdot\tfrac14+1=\tfrac{15}{16}$. Với $c=3$: $F_3''=12\theta^2+2>0$ nên $F_3$ lồi chặt.
:::

![Ba đồ thị bậc bốn trên cùng trục θ từ −1 đến 1 và trục Fλ từ 0 đến 4, ứng với λ = 3, λ = 1,5 và λ = 0. Chấm tròn đánh dấu các cực tiểu: tại 0 khi λ = 3; tại ±0,5 khi λ = 1,5; tại ±1 khi λ = 0.](img/lec-06/continuation-quartic.svg)

Hình vẽ ba thành viên của họ trên cùng hệ trục; tham số ký hiệu $\lambda$ và hàm ký hiệu $F_\lambda$ trên hình chính là $c$ và $F_c$ của chương. Khi $c$ giảm, cực tiểu duy nhất ở $0$ tách thành hai cực tiểu đối xứng, và điểm $0$ chuyển từ đáy thành đỉnh. Hình được vẽ từ công thức hàm, không phải đường học thực nghiệm.

::: definition Định nghĩa 06.39 (Phương pháp tiếp diễn)
Cho một họ mục tiêu $F_c$ trên cùng $\mathbb R^p$, một lịch $c^{(0)},c^{(1)},\ldots,c^{(\bar n)}$ với $F_{c^{(\bar n)}}$ là mục tiêu đích, và một bộ giải cục bộ. Phương pháp tiếp diễn (continuation) giải gần đúng $F_{c^{(0)}}$ từ một điểm đầu, rồi với $n=1,\ldots,\bar n$, giải gần đúng $F_{c^{(n)}}$ với điểm đầu là đầu ra của giai đoạn $n-1$.
:::

Mục tiêu của các giai đoạn đầu được chọn để bộ giải cục bộ dễ thành công trên đó, chẳng hạn lồi hoặc trơn hơn; đầu ra của giai đoạn trước là điểm đầu tốt cho giai đoạn sau khi nghiệm thay đổi liên tục theo $c$. Phương pháp thay thành phần "mục tiêu" của Định nghĩa 06.1 theo giai đoạn, giữ không gian tham số. Mệnh đề sau cho biết giả thiết "nghiệm thay đổi liên tục" có đúng cho họ của Ví dụ 06.26 không.

::: proposition Mệnh đề 06.40 (Cấu trúc nghiệm của họ bậc bốn)
**Giả thiết.** $F_c(\theta)=(\theta^2-1)^2+c\theta^2$, $c\ge0$.

**Kết luận.**

- (a) $F_c'(0)=0$ với mọi $c$.
- (b) Với $c\ge2$, $0$ là điểm dừng duy nhất và là cực tiểu toàn cục duy nhất.
- (c) Với $0\le c<2$, $0$ là cực đại địa phương; hai cực tiểu toàn cục là $\pm\sqrt{1-c/2}$, với giá trị $c-\tfrac{c^2}4$.
- (d) Giảm gradient với gradient đầy đủ từ $\theta=0$ đứng yên ở $0$ với mọi $c$.
- (e) Với $c<2$, $0<\theta^2<1-\tfrac c2$ và $\eta>0$, bước $\theta^+=\theta-\eta F_c'(\theta)$ thỏa $\lvert\theta^+\rvert>\lvert\theta\rvert$; khi $\theta\to0$, tỷ số $\theta^+/\theta$ tiến tới $1+\eta(4-2c)$.

**Điều kiện áp dụng.** Gradient đầy đủ, chính xác.

**Phạm vi.** Mệnh đề nói về một họ cụ thể; nó minh họa, không chứng minh, rằng phương pháp tiếp diễn có thể không rời một điểm dừng.
:::

::: proof Chứng minh Mệnh đề 06.40
**Bước 1 (đạo hàm).** $F_c'(\theta)=4\theta^3+(2c-4)\theta=\theta\bigl(4\theta^2+2c-4\bigr)$ và $F_c''(\theta)=12\theta^2+2c-4$. Phần (a) và (d) suy từ $F_c'(0)=0$.

**Bước 2 (phần b).** Với $c\ge2$, $4\theta^2+2c-4>0$ khi $\theta\ne0$, nên $0$ là điểm dừng duy nhất. Vì $F_c(\theta)-F_c(0)=\theta^4+(c-2)\theta^2$, không nhỏ hơn $\theta^4$, dương khi $\theta\ne0$, $0$ là cực tiểu toàn cục duy nhất; trường hợp $c=2$, nơi $F_2''(0)=0$, được bao hàm.

**Bước 3 (phần c).** Với $c<2$, $F_c''(0)=2c-4<0$: cực đại địa phương. Các điểm dừng khác thỏa $\theta^2=1-\tfrac c2$, tại đó $F_c''=12(1-\tfrac c2)+2c-4=8-4c$, dương khi $c<2$. Giá trị: $F_c=\bigl(-\tfrac c2\bigr)^2+c\bigl(1-\tfrac c2\bigr)=c-\tfrac{c^2}4$. Vì $F_c\to\infty$ khi $\lvert\theta\rvert\to\infty$ và chỉ có ba điểm dừng, hai điểm này là cực tiểu toàn cục.

**Bước 4 (phần e).** $\theta^+=\theta\bigl(1+\eta(4-2c-4\theta^2)\bigr)$. Khi $\theta^2<1-\tfrac c2$, $4-2c-4\theta^2>0$, nên thừa số lớn hơn $1$. Khi $\theta\to0$, thừa số tiến tới $1+\eta(4-2c)$. $\square$
:::

Phần (b), (c) xác nhận giả thiết của phương pháp, vì giai đoạn $c=3$ có một cực tiểu duy nhất. Theo phần (a), (d), nghiệm $0$ của giai đoạn đầu vẫn là điểm dừng ở mọi giai đoạn sau, nên truyền nghiệm bằng giảm gradient chính xác giữ tham số tại một điểm đã thành cực đại địa phương.

Phần (e) cho cách rời điểm đó: một nhiễu nhỏ, chẳng hạn nhiễu của gradient nhóm, được khuếch đại khi $F_c''(0)<0$.

- Với $c=0$, $\eta=0{,}1$ và $\theta=10^{-3}$, thừa số gần $1{,}4$ mỗi bước, và $22$ bước đưa $\lvert\theta\rvert$ vượt $0{,}9$.
- Với $c=1{,}5$, thừa số gần $1{,}1$, và cần $72$ bước để $\lvert\theta\rvert$ vượt $0{,}45$.

**Trong học máy.** Goodfellow, Bengio và Courville (2016, mục 8.7.6, tr. 327–328) mô tả phương pháp tiếp diễn truyền thống làm trơn mục tiêu bằng kỳ vọng theo nhiễu Gauss của tham số (công thức 8.40), để một mục tiêu nhiều cực tiểu địa phương trở nên gần lồi; họ phạt $c\theta^2$ của chương là một cơ chế khác, chọn để tính tay được. Giáo trình nêu các trường hợp phương pháp không áp dụng được, như mục tiêu không trở nên lồi dù làm trơn bao nhiêu (tr. 328). Mệnh đề 06.40(d) thêm một trường hợp đến từ đối xứng; phương pháp tiếp diễn không có bảo đảm nghiệm toàn cục.

### 6.3 Học theo chương trình

Thay vì đổi hàm, có thể đổi dữ liệu: mất mát trung bình phụ thuộc phân phối lấy mẫu, nên đổi phân phối theo giai đoạn cũng sinh một họ mục tiêu. Trực giác, chưa phải phát biểu hình thức: cho mô hình gặp các quan sát dễ trước, các quan sát khó sau, như một chương trình học. Ví dụ sau dùng hai quan sát có độ nhạy khác nhau.

::: example Ví dụ 06.27 (Hai quan sát dễ và khó)
**Dữ kiện.** Mô hình $f_\theta(x)=\theta x$, mất mát bằng nửa bình phương hiệu giữa dự đoán và nhãn; quan sát dễ có đầu vào $1$, nhãn $1$; quan sát khó có đầu vào $3$, nhãn $1$. Quan sát khó được lấy với xác suất $\pi$, nên mục tiêu kỳ vọng là

$$
F_\pi(\theta)=(1-\pi)\,\frac{(\theta-1)^2}2+\pi\,\frac{(3\theta-1)^2}2 .
$$

**Độ nhạy.** Mất mát của quan sát dễ có đạo hàm bậc hai $1$, của quan sát khó là $9$; theo nghĩa đó quan sát khó nhạy hơn với $\theta$.

**Nghiệm.** $F_\pi'(\theta)=(1-\pi)(\theta-1)+3\pi(3\theta-1)=(1+8\pi)\theta-(1+2\pi)$, nên

$$
\theta_\pi^*=\frac{1+2\pi}{1+8\pi},
\tag{6.2}
$$

với $\theta_0^*=1$, $\theta_{1/4}^*=\tfrac12$, $\theta_{1/2}^*=\tfrac25$.

**Kiểm tra lại.** $F_\pi''=1+8\pi>0$ với $\pi\in[0,1]$, nên nghiệm duy nhất. Tại $\pi=\tfrac14$: $\tfrac{1+1/2}{1+2}=\tfrac12$.
:::

Phân phối đích là phân phối đều trên hai quan sát, $\pi=\tfrac12$. Mỗi giá trị $\pi$ cho một mục tiêu khác, nên một lịch dừng trước $\pi=\tfrac12$ giải một bài toán khác bài toán đích.

::: definition Định nghĩa 06.41 (Học theo chương trình)
Cho các mất mát $\ell_1,\ldots,\ell_N$ và một phân phối đích $\mathcal D$ trên $\{1,\ldots,N\}$, mục tiêu đích $F_{\mathcal D}(\theta)=\mathbb E_{i\sim\mathcal D}\,\ell_i(\theta)$. Học theo chương trình (curriculum learning) dùng một lịch phân phối $\mathcal D_0,\mathcal D_1,\ldots,\mathcal D_{\bar n}=\mathcal D$, thường tăng dần tỷ trọng của các quan sát khó theo một tiêu chí độ khó định trước, và ở giai đoạn $n$ tối ưu $F_{\mathcal D_n}$ từ đầu ra của giai đoạn $n-1$.
:::

Định nghĩa là trường hợp riêng của Định nghĩa 06.39, với tham số của họ là phân phối lấy mẫu; Bengio và cộng sự (2009) đưa ra cách đọc này. Nó khác việc đổi thứ tự trình bày các quan sát trong một lượt qua dữ liệu, vốn giữ nguyên phân phối và do đó giữ nguyên mục tiêu kỳ vọng.

::: proposition Mệnh đề 06.42 (Nghiệm theo lịch và phần mất mát thừa)
**Giả thiết.** Như Ví dụ 06.27; phân phối đích $\pi=\tfrac12$.

**Kết luận.**

- (a) $\theta_\pi^*$ của (6.2) giảm thực sự theo $\pi\in[0,1]$, từ $1$ tới $\tfrac13$.
- (b) Với mọi $\theta$, $F_{1/2}(\theta)-F_{1/2}(\tfrac25)=\tfrac52\bigl(\theta-\tfrac25\bigr)^2$. Dừng lịch ở $\pi=\tfrac14$ để lại phần mất mát thừa $\tfrac1{40}$ trên mục tiêu đích.

**Điều kiện áp dụng.** Mất mát bình phương, mô hình tuyến tính một tham số.

**Phạm vi.** Mệnh đề không so tốc độ của lịch dễ đến khó với lấy mẫu đều.
:::

::: proof Chứng minh Mệnh đề 06.42
**Bước 1 (phần a).** Đạo hàm của (6.2) theo $\pi$ là $\frac{2(1+8\pi)-8(1+2\pi)}{(1+8\pi)^2}=\frac{-6}{(1+8\pi)^2}<0$. Tại $\pi=1$: $\tfrac39=\tfrac13$.

**Bước 2 (phần b).** $F_{1/2}$ là đa thức bậc hai với $F_{1/2}''=\tfrac12\cdot1+\tfrac12\cdot9=5$ và cực tiểu tại $\tfrac25$ theo (6.2); khai triển Taylor đúng cho đa thức bậc hai: $F_{1/2}(\theta)-F_{1/2}(\tfrac25)=\tfrac52(\theta-\tfrac25)^2$. Tại $\theta=\tfrac12$: $\tfrac52\cdot\tfrac1{100}=\tfrac1{40}$. $\square$
:::

Phần (b) tính phần mất mát thừa khi dừng lịch sớm, với $F_{1/2}(\tfrac12)=\tfrac18$ so với $F_{1/2}(\tfrac25)=\tfrac1{10}$. Trung bình Polyak không sửa được sai số này, vì nó chỉ đổi quy tắc trả về, và trung bình của các điểm quanh $\tfrac12$ vẫn gần $\tfrac12$.

**Trong học máy.** Bengio và cộng sự (2009) báo cáo kết quả tốt hơn với một chương trình trên một bài toán mô hình ngôn ngữ cỡ lớn. Goodfellow, Bengio và Courville (2016, tr. 329) dẫn kết quả của Zaremba và Sutskever (2014) cho mạng nơ-ron hồi tiếp (recurrent neural network): chương trình ngẫu nhiên, luôn trộn quan sát dễ và khó nhưng tăng dần tỷ lệ quan sát khó, tốt hơn chương trình tất định. Giả thiết cần kiểm là lịch kết thúc đúng ở phân phối đích; tiêu chí "dễ" dùng ở đây, độ cong của mất mát, là một quy ước cho ví dụ, không phải định nghĩa độ khó chung.

### 6.4 Điều kiện kết thúc và cách đánh giá

Ba chiến lược của mục thay ba đối tượng khác nhau, nên chúng có ba điều kiện kết thúc khác nhau, và cùng một yêu cầu là giai đoạn cuối phải là mục tiêu đích.

::: remark Nhận xét 06.43 (Ba chiến lược theo giai đoạn)
| Chiến lược | Đối tượng thay | Điều kiện kết thúc | Phép kiểm trên dữ kiện của mục |
|---|---|---|---|
| Tiền huấn luyện | điểm đầu $\theta_0=\mathcal T(\theta_{\rm aux},\xi)$ | tinh chỉnh trên $F$ đích | một bước gradient từ $(2,1)$ giảm $F$ từ $\tfrac12$ xuống $0{,}1152$ |
| Tiếp diễn | mục tiêu $F_c$ | giai đoạn cuối là $F_0$ | $F_c'(0)=0$ với mọi $c$: nghiệm truyền qua có thể không là cực tiểu |
| Học theo chương trình | phân phối $\mathcal D_n$ | giai đoạn cuối là $\mathcal D$ | $\theta^*_{1/4}=\tfrac12\ne\tfrac25=\theta^*_{1/2}$ |

**Ngân sách.** So một chiến lược nhiều giai đoạn với huấn luyện một giai đoạn phải tính cả các giai đoạn phụ: học nhiệm vụ phụ, giải các mục tiêu trung gian, toàn bộ lịch lấy mẫu. Bỏ chúng khỏi ngân sách tạo lợi thế giả.

**Dữ liệu đánh giá.** Con số báo cáo cuối lấy trên dữ liệu của nhiệm vụ đích, tách khỏi huấn luyện và khỏi việc chọn tiêu chí chuyển giai đoạn, cùng vai trò với tập kiểm thử của Bài 05.
:::

::: exercise Bài tập 06.9
- (a) Cho họ $G_c(\theta)=(\theta^2-4)^2+c\theta^2$, $c\ge0$. Tìm ngưỡng $c$ mà dưới đó $0$ là cực đại địa phương, và các cực tiểu toàn cục khi $c$ dưới ngưỡng. Với $c=0$ và $\eta=0{,}05$, tính tỷ số $\theta^+/\theta$ của bước $\theta^+=\theta-\eta G_0'(\theta)$ khi $\theta\to0$, như Mệnh đề 06.40(e) làm với họ bậc bốn của mục.
- (b) Hai quan sát có đầu vào $1$ và $2$, cùng nhãn $2$, mô hình $\theta x$, mất mát bằng nửa bình phương sai số; quan sát thứ hai lấy với xác suất $\pi$, phân phối đích là $\pi=\tfrac12$. Một lịch tăng $\pi$ từ $0$ và dừng ở một giá trị $\pi<\tfrac12$, trả nghiệm $\theta^*_\pi$ của giai đoạn đó. Tìm $\pi$ nhỏ nhất để phần mất mát thừa trên mục tiêu đích không vượt $10^{-3}$.
- (c) Mục tiêu đích $F(w_1,w_2)=\tfrac12(w_1w_2-4)^2$; nhiệm vụ phụ cho $w_1=1$. Khối $w_1$ được đóng băng, tức giữ cố định, và chỉ $w_2$ được tinh chỉnh từ $w_2=1$. Tính một bước giảm gradient với $\eta=0{,}1$ theo $w_2$, giá trị nhỏ nhất của $F$ trên tập được phép, và nêu điều kiện trên $w_1$ để việc đóng băng không làm mất nghiệm.
:::

::: hint
Ở (a), $G_c'(\theta)=\theta(4\theta^2-16+2c)$. Ở (b), viết $\theta^*_\pi$ như Ví dụ 06.27 và dùng phần thừa $\tfrac12F''(\theta^*_\pi-\theta^*_{1/2})^2$ của mục tiêu bậc hai. Ở (c), với $w_1=1$ cố định, $F$ chỉ còn là hàm của $w_2$.
:::

::: solution
**Câu (a).** $G_c''(0)=2c-16$, âm khi $c<8$; khi đó các cực tiểu toàn cục là $\pm\sqrt{4-c/2}$. Với $c=0$, $\theta^+=\theta-\eta\theta(4\theta^2-16)$, nên khi $\theta\to0$ thừa số là $1+16\eta=1{,}8$.

**Câu (b).**

- Mục tiêu: $F_\pi(\theta)=(1-\pi)\tfrac{(\theta-2)^2}2+\pi\tfrac{(2\theta-2)^2}2$ và $F_\pi'=(1+3\pi)\theta-(2+2\pi)$, nên $\theta^*_\pi=\tfrac{2+2\pi}{1+3\pi}$, giảm theo $\pi$.
- Đích: $\theta^*_{1/2}=\tfrac65$ và độ cong $F_{1/2}''=\tfrac12(1+4)=\tfrac52$.
- Điều kiện: $\tfrac54\bigl(\theta^*_\pi-\tfrac65\bigr)^2\le10^{-3}$, tức $\theta^*_\pi\le\tfrac65+\sqrt{0{,}0008}\approx1{,}2283$.
- Giải $\tfrac{2+2\pi}{1+3\pi}\le1{,}2283$: $\pi\ge\tfrac{2-1{,}2283}{3\cdot1{,}2283-2}\approx0{,}458$.

**Câu (c).**

- Với $w_1=1$: $F=\tfrac12(w_2-4)^2$, đạo hàm theo $w_2$ tại $w_2=1$ là $-3$.
- Một bước: $w_2=1+0{,}3=1{,}3$, $F=\tfrac12(2{,}7)^2=3{,}645$, giảm từ $\tfrac92$.
- Giá trị nhỏ nhất trên tập $w_1=1$ là $0$, đạt tại $w_2=4$; đóng băng không làm mất nghiệm khi $w_1\ne0$, vì khi đó $w_2=4/w_1$ cho $w_1w_2=4$.

**Kiểm tra lại.** Ở (b), tại $\pi=0{,}458$, $\theta^*_\pi\approx1{,}2283$ và phần thừa $\approx1{,}0\cdot10^{-3}$. Ở (c), $2{,}7^2=7{,}29$.
:::

**Chuỗi suy luận của mục.** Mệnh đề 06.37 cho thấy điểm đầu có thể là điểm dừng không phải nghiệm, và Định nghĩa 06.38 thay điểm đầu bằng tham số học từ nhiệm vụ phụ. Định nghĩa 06.39 và Mệnh đề 06.40 thay mục tiêu theo giai đoạn, với giới hạn là điểm dừng truyền qua mọi giai đoạn. Định nghĩa 06.41 là trường hợp riêng với tham số là phân phối, và kết quả đích Mệnh đề 06.42 định lượng cái giá của một lịch không kết thúc ở phân phối đích. Nhận xét 06.43 gom ba điều kiện kết thúc.

**Kết mục.** Mục đã cho ba chiến lược thay điểm đầu, mục tiêu và phân phối, cùng điều kiện kết thúc của từng chiến lược (Nhận xét 06.43). Không chiến lược nào có định lý bảo đảm cải thiện; mỗi chiến lược chỉ được đánh giá trên mục tiêu đích với toàn bộ ngân sách. Mục 7 gom các điều kiện của mọi phương pháp trong chương thành một quy tắc chọn theo dữ kiện sẵn có.

## 7. Lựa chọn phương pháp theo dữ kiện

Sáu mục trước cho các phương pháp thay từng thành phần của Định nghĩa 06.1, mỗi phương pháp với dữ kiện cần có, giả thiết và phép kiểm riêng. Khi bắt đầu một bài toán huấn luyện cụ thể, câu hỏi đặt ra theo chiều ngược lại: với số tham số, bộ nhớ, toán tử và phân phối dữ liệu sẵn có, thành phần nào cần điều chỉnh và bằng phương pháp nào. Chẳng hạn, một mô hình $2{,}5\cdot10^7$ tham số chỉ cung cấp gradient nhóm; BFGS đầy đủ cần lưu $6{,}25\cdot10^{14}$ số, còn Adam cần $5\cdot10^7$ số.

Mục này gom các điều kiện thành một bảng chọn, và minh họa cách đọc bảng trên hai ví dụ: ví dụ thang đo của Mục 1 giải theo ba cách, và một phép tính bộ nhớ.

### 7.1 Bảng chọn theo dữ kiện

::: remark Nhận xét 06.44 (Dữ kiện, phương pháp và phép kiểm)
| Dữ kiện sẵn có | Phương pháp | Giả thiết cần kiểm | Phép kiểm | Kết quả của chương |
|---|---|---|---|---|
| chỉ gradient nhóm; bộ nhớ $O(p)$ | AdaGrad, RMSProp, Adam | thang lệch chủ yếu theo trục tọa độ; lịch bước học | mất mát đích theo vòng; chi phí | Mệnh đề 06.6, Mệnh đề 06.7, Mệnh đề 06.9, Mệnh đề 06.11 |
| gradient và tích Hessian–vectơ trên nhóm cố định | Newton–CG có giảm chấn | $H+\tau\mathrm I\succ0$ | phần dư; dấu $g^Td$; Armijo | Mệnh đề 06.16, Định lý 06.18, Mệnh đề 06.20 |
| gradient đầy đủ, ổn định; $p$ vừa phải | BFGS hoặc L-BFGS | $P\succ0$; $y^Ts>0$ | điều kiện Wolfe; ngưỡng nhận cặp | Định lý 06.23, Mệnh đề 06.26, Mệnh đề 06.27 |
| tín hiệu đầu vào lớp lệch thang | chuẩn hóa theo lô | nhóm đủ lớn; chế độ suy luận | đầu ra khi suy luận từng quan sát | Mệnh đề 06.29 |
| bài toán con theo khối giải được | hạ theo khối | giá trị cũ là một lựa chọn | $F$ không tăng; độ ghép giữa khối | Mệnh đề 06.31 |
| quỹ đạo dao động quanh một nghiệm | trung bình Polyak | các điểm cùng một miền | mất mát tại tham số trung bình | Hệ quả 06.33, Mệnh đề 06.34 |
| gradient tiêu biến theo độ sâu | nối tắt | đạo hàm lớp bị chặn | hệ số truyền theo độ sâu | Mệnh đề 06.36 |
| điểm đầu, mục tiêu hoặc phân phối là trở ngại | tiền huấn luyện, tiếp diễn, học theo chương trình | giai đoạn cuối là mục tiêu đích | mất mát đích; ngân sách toàn bộ | Mệnh đề 06.37, Mệnh đề 06.40, Mệnh đề 06.42 |

**Không xếp hạng vô điều kiện.** Bảng chỉ cho biết phương pháp nào áp dụng được với dữ kiện nào. Goodfellow, Bengio và Courville (2016, mục 8.5.4, tr. 309–310) ghi nhận chưa có đồng thuận về bộ tối ưu tốt nhất, và lựa chọn trong thực hành phụ thuộc nhiều vào mức quen thuộc với việc chỉnh siêu tham số.

**Phối hợp.** Các dòng có thể dùng cùng nhau, chẳng hạn Adam trên mạng có chuẩn hóa theo lô và nối tắt, với trung bình tham số ở cuối. Phối hợp không tự cho một định lý hội tụ chung; mỗi thành phần chỉ mang bảo đảm của riêng nó.
:::

::: example Ví dụ 06.28 (Một độ lệch thang, ba cách sửa)
**Dữ kiện.** Hàm của Ví dụ 06.1, $F(\theta)=\tfrac12\bigl([\theta]_1^2+9[\theta]_2^2\bigr)$, điểm đầu $(1,1)$.

**Cách 1, quy tắc cập nhật chéo.** Ma trận phạt $\operatorname{diag}(1,9)$ với $\eta=1$ (Ví dụ 06.2): một bước tới nghiệm. AdaGrad với $\eta=1$ cũng tới nghiệm sau một bước từ $(1,1)$, vì cả hai tọa độ cách nghiệm $1$.

**Cách 2, độ cong.** Hessian $\operatorname{diag}(1,9)$; bước Newton trùng cách 1.

**Cách 3, tham số hóa.** Đổi biến $\varphi_2=3[\theta]_2$, giữ $\varphi_1=[\theta]_1$: $F=\tfrac12(\varphi_1^2+\varphi_2^2)$ có cùng độ cong $1$ theo hai biến, và giảm gradient với $\eta=1$ tới nghiệm sau một bước.

**Đổi dữ kiện.** Với $Q=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ (Ví dụ 06.9) thay cho $\operatorname{diag}(1,9)$:

- cách 1 không còn đủ (Mệnh đề 06.12);
- cách 2 vẫn cho một bước (Ví dụ 06.11);
- cách 3 cần một phép quay trước khi đổi thang, tức cần biết các vectơ riêng.

**Kiểm tra lại.** Với cách 3, điểm đầu là $\varphi=(1,3)$, gradient $(1,3)$, và $\varphi-1\cdot(1,3)=(0,0)$.
:::

Ba cách thay ba thành phần khác nhau của Định nghĩa 06.1, lần lượt là quy tắc cập nhật, nguồn thông tin độ cong và phép tính mô hình. Trên Hessian chéo, ba cách cho cùng kết quả; trên Hessian nghiêng, kết quả khác nhau, nên Nhận xét 06.44 bắt đầu từ dữ kiện của bài toán.

### 7.2 Bộ nhớ và chi phí

::: example Ví dụ 06.29 (Bộ nhớ trạng thái của bốn bộ tối ưu)
**Dữ kiện.** Một mạng có $p=2{,}5\cdot10^7$ tham số, lưu bằng số thực $4$ byte.

**Trạng thái phụ ngoài tham số và gradient.**

| Bộ tối ưu | Số thực lưu thêm | Bộ nhớ |
|---|---|---|
| AdaGrad, RMSProp | $p=2{,}5\cdot10^7$ | $0{,}1$ GB |
| Adam | $2p=5\cdot10^7$ | $0{,}2$ GB |
| L-BFGS, $n_{\rm m}=10$ | $2n_{\rm m}p=5\cdot10^8$ | $2$ GB |
| BFGS đầy đủ | $p^2=6{,}25\cdot10^{14}$ | $2{,}5\cdot10^6$ GB |

**Diễn giải.** BFGS đầy đủ bị loại bởi bộ nhớ, bất kể tốc độ. L-BFGS vừa bộ nhớ, nhưng cần gradient ổn định; với gradient nhóm, các cặp $(s,y)$ chứa cả hiệu giữa hai nhóm (Mệnh đề 06.22). Newton–CG lưu vài vectơ, tức $O(p)$, nhưng mỗi vòng ngoài cần tới $K$ tích Hessian–vectơ.

**Kiểm tra lại.** $p^2=6{,}25\cdot10^{14}$ số nhân $4$ byte là $2{,}5\cdot10^{15}$ byte, tức $2{,}5\cdot10^6$ GB.
:::

::: exercise Bài tập 06.10
Một mô hình trơn có $p=5\cdot10^6$ tham số. Có gradient đầy đủ và tích Hessian–vectơ trên toàn bộ dữ liệu, mỗi tích tốn khoảng hai lần tính gradient; Hessian có thể có giá trị riêng âm. Ngân sách bộ nhớ phụ là $10p$ số thực.

- (a) Xác định các phương pháp trong Newton với Hessian đặc, BFGS, L-BFGS, Newton–CG đáp ứng ngân sách bộ nhớ, và $n_{\rm m}$ lớn nhất cho L-BFGS.
- (b) Chọn một phương pháp dùng được tích Hessian–vectơ, và nêu hai phép kiểm phải có ở mỗi vòng ngoài.
- (c) Nêu điều phải làm khi phép kiểm dấu thất bại do Hessian bất định.
:::

::: hint
L-BFGS lưu $2n_{\rm m}p$ số; gradient liên hợp lưu bốn vectơ. Xem Thuật toán 06.5 và Mệnh đề 06.16.
:::

::: solution
**Câu (a).**

- Newton với Hessian đặc và BFGS cần $p^2=2{,}5\cdot10^{13}$ số, bị loại.
- L-BFGS cần $2n_{\rm m}p\le10p$, nên $n_{\rm m}\le5$.
- Newton–CG lưu vài vectơ, tức $O(p)$, đáp ứng.

**Câu (b).** Newton–CG (Thuật toán 06.5) dùng trực tiếp tích Hessian–vectơ. Hai phép kiểm ở mỗi vòng ngoài là phần dư của gradient liên hợp, đo mức giải đúng hệ, và dấu $g^Td<0$, đo hướng có giảm hay không.

**Câu (c).** Tăng $\tau$ rồi giải lại, vì theo Mệnh đề 06.16(b), $H+\tau\mathrm I\succ0$ khi $\tau>-\lambda_{\min}(H)$; hoặc dùng $d=-g$ kèm tìm bước.

**Kiểm tra lại.** $2\cdot5\cdot p=10p$, còn $2\cdot6\cdot p=12p>10p$.
:::

**Chuỗi suy luận của mục.** Nhận xét 06.44 gom mỗi phương pháp với dữ kiện, giả thiết và phép kiểm, dẫn về số hiệu của kết quả tương ứng. Ví dụ 06.28 cho thấy cùng một khó khăn có thể sửa ở ba thành phần, và Hessian nghiêng phân biệt chúng. Ví dụ 06.29 cho thấy bộ nhớ loại bỏ một số phương pháp trước khi xét tốc độ.

**Kết mục.** Mục đã cho một quy tắc chọn bắt đầu từ dữ kiện (Nhận xét 06.44). Quy tắc chưa được áp vào một bài toán học máy đầy đủ; mục sau làm điều đó trên ba tình huống, trong đó một tình huống có giả thiết không thỏa.

## Tình huống áp dụng và ứng dụng

::: application Tình huống 06.1 (Adam và giảm gradient trên hồi quy có đặc trưng lệch thang)
**Bài toán và dữ liệu.**

Dữ liệu của Tình huống 05.2: bốn quan sát với vectơ đặc trưng $x_1=(1,10)^T$, $x_2=(1,-10)^T$, $x_3=(-1,10)^T$, $x_4=(-1,-10)^T$, nhãn sinh từ $\theta^*=(1,1)^T$ không nhiễu. Đặc trưng thứ hai có thang lớn gấp mười lần. Cần so giảm gradient với Adam từ $\theta_0=0$, gradient đầy đủ, và kiểm xem lợi thế của Adam còn không khi dữ liệu được quay.

**Mô hình hóa.**

Như Tình huống 05.2, $F(\theta)=\tfrac12(\theta-\theta^*)^TH(\theta-\theta^*)$ với $H=\operatorname{diag}(1,100)$, $\kappa=100$, $F(\theta_0)=50{,}5$.

**Kiểm giả thiết.**

1. Giả thiết của Mệnh đề 06.11: $\nabla F(\theta)=(1,100)^T\odot\nabla G(\theta)$ với $G(\theta)=\tfrac12\lVert\theta-\theta^*\rVert^2$, thừa số dương cố định theo tọa độ. Thỏa.
2. Gradient đầy đủ, chính xác; $\varepsilon=10^{-8}$ nhỏ so với mọi mẫu số trong các vòng đang xét, nên kết luận của mệnh đề đúng gần đúng.

**Giảm gradient.** Với $\eta=\tfrac1{100}$, Tình huống 05.2 cho $F\le10^{-4}$ sau $424$ bước.

**Adam, hai vòng tính tay.** $\eta=0{,}1$, $\beta_1=0{,}9$, $\beta_2=0{,}999$.

- Vòng 1: $g_1=(-1,-100)^T$, và theo Mệnh đề 06.9(c), $d_1\approx(0{,}1;\,0{,}1)^T$.
    - Điểm mới $\theta_1=(0{,}1;\,0{,}1)^T$.
    - Giá trị $F(\theta_1)=\tfrac12\cdot101\cdot0{,}81=40{,}905$.
- Vòng 2: $g_2=(-0{,}9;\,-90)^T$.
    - $m_2=0{,}9(-0{,}1;\,-10)^T+0{,}1(-0{,}9;\,-90)^T=(-0{,}18;\,-18)^T$ và $\widehat m_2=m_2/0{,}19\approx(-0{,}9474;\,-94{,}74)^T$.
    - $v_2=0{,}999(0{,}001;\,10)^T+0{,}001(0{,}81;\,8100)^T=(0{,}001809;\,18{,}09)^T$ và $\widehat v_2=v_2/0{,}001999\approx(0{,}9050;\,9049{,}5)^T$.
    - $d_2=-0{,}1\,\widehat m_2/\sqrt{\widehat v_2}\approx(0{,}09959;\,0{,}09959)^T$.
    - $\theta_2\approx(0{,}1996;\,0{,}1996)^T$ và $F(\theta_2)\approx32{,}35$.

Hai tọa độ đi đúng cùng một quỹ đạo, như Mệnh đề 06.11 dự báo: sai số của mỗi tọa độ bằng sai số của Adam trên hàm một chiều $\tfrac12(\theta-1)^2$.

**Adam, kết quả mô phỏng.** Với cùng siêu tham số, $F\le10^{-4}$ ở mọi vòng từ vòng $121$ trở đi. Với thang $100$ lần thay cho $10$ lần, tức $\kappa=10^4$, giảm gradient cần khoảng $42\,600$ bước, còn quỹ đạo của Adam theo từng tọa độ không đổi, và $F\le10^{-4}$ từ vòng $162$; số vòng tăng chỉ vì $F$ nhân sai số tọa độ thứ hai với $10^4$.

**Khi giả thiết không thỏa: dữ liệu quay $45^\circ$.** Thay mỗi $x_i$ bằng $Rx_i$, với $R$ là phép quay $45^\circ$, và $\theta^*$ bằng $R\theta^*=(0,\sqrt2)^T$; nhãn không đổi. Hessian mới $RHR^T=\begin{bmatrix}50{,}5&-49{,}5\\-49{,}5&50{,}5\end{bmatrix}$ có cùng giá trị riêng $1$ và $100$, nhưng không chéo, nên giả thiết của Mệnh đề 06.11 không thỏa.

- Giảm gradient vẫn cần $424$ bước, vì theo Mệnh đề 06.13(b) với $S=R$ trực giao, $SS^T=\mathrm I$ và bước giảm gradient không đổi qua phép quay.
- Vòng 1 của Adam: $g_1=-RHR^T(0,\sqrt2)^T\approx(70{,}0;\,-71{,}4)^T$ và $d_1\approx(-0{,}1;\,0{,}1)^T$, chỉ dịch theo hướng riêng $(-1,1)$ của giá trị riêng $100$; thành phần sai số theo hướng giá trị riêng $1$ không đổi.
- Mô phỏng với $\eta=0{,}1$: $F\le10^{-4}$ ở mọi vòng từ vòng $388$, gần bằng giảm gradient.

**Diễn giải.** Trên dữ liệu có thang lệch theo trục, Adam loại bỏ ảnh hưởng của số điều kiện, như Mệnh đề 06.11 khẳng định, mà không cần biết $\lambda_{\min}$, $\lambda_{\max}$. Khi cùng độ lệch thang nằm theo hướng nghiêng, lợi thế đó không còn, như Mệnh đề 06.12 dự báo.

Với gradient đầy đủ, sai số của Adam tiếp tục giảm sau khi qua ngưỡng: trên dữ liệu thẳng trục, sai số mỗi tọa độ $\lvert[\theta_t]_j-1\rvert$ khoảng $1{,}3\cdot10^{-3}$ ở vòng $121$, $7\cdot10^{-6}$ ở vòng $200$, $4\cdot10^{-12}$ ở vòng $500$, và bằng $0$ trong độ chính xác máy từ khoảng vòng $1000$. Với gradient nhóm, nhiễu ở tử số và mẫu số giữ Adam dao động quanh nghiệm ở một mức phụ thuộc $\eta$, như SGD ở Ví dụ 05.14; phân tích hội tụ của Kingma và Ba (2015, mục 4) dùng lịch giảm $\eta_t=\eta/\sqrt t$.

**Kiểm tra lại.** $0{,}999\cdot10+0{,}001\cdot8100=9{,}99+8{,}1=18{,}09$; $1-0{,}999^2=0{,}001999$; $\sqrt{9049{,}5}\approx95{,}13$ và $0{,}1\cdot94{,}74/95{,}13\approx0{,}0996$. $F(\theta_2)=\tfrac12\cdot101\cdot(1-0{,}1996)^2\approx32{,}35$.

**Giới hạn.** Hàm bậc hai với gradient đầy đủ là trường hợp thuận lợi nhất; với gradient nhóm, mẫu số của Adam còn chứa nhiễu.

**Dẫn ngược lý thuyết.** Mệnh đề 06.9(c) cho vòng đầu; Mệnh đề 06.11 cho trường hợp thẳng trục và chỉ ra giả thiết không thỏa khi quay; Mệnh đề 06.12 giải thích trường hợp quay; Mệnh đề 06.13(b) cho tính bất biến của giảm gradient.
:::

::: application Tình huống 06.2 (Newton–CG có giảm chấn trên mạng tuyến tính hai lớp: Hessian bất định)
**Bài toán và dữ liệu.**

Mạng tuyến tính hai lớp một đơn vị của Mệnh đề 06.37: một quan sát có đầu vào $1$ và nhãn $3$, dự đoán $w_2w_1$, mất mát $F(\theta)=\tfrac12(w_1w_2-3)^2$ với $\theta=(w_1,w_2)^T$. Gradient là $(w_1w_2-3)(w_2,w_1)^T$ và Hessian là $\begin{bmatrix}w_2^2&2w_1w_2-3\\2w_1w_2-3&w_1^2\end{bmatrix}$. Điểm đầu $\theta_0=(\tfrac12,1)^T$, một điểm ngoài đường $w_1=-w_2$. Cần một phương pháp dùng độ cong, chỉ với gradient và tích Hessian–vectơ.

**Mô hình hóa.**

Tại $\theta_0$: $w_1w_2-3=-\tfrac52$, $F(\theta_0)=\tfrac{25}8=3{,}125$, $g=-\tfrac52(1,\tfrac12)^T=(-\tfrac52,-\tfrac54)^T$, và thay vào công thức Hessian,

$$
H=\begin{bmatrix}1&-2\\-2&\tfrac14\end{bmatrix}.
$$

**Kiểm giả thiết.**

1. Giả thiết $H\succ0$ của bước Newton: $\det H=\tfrac14-4<0$, nên $H$ có một giá trị riêng âm; giá trị riêng là $\tfrac{5\pm\sqrt{265}}8\approx2{,}660$ và $-1{,}410$. Giả thiết không thỏa.
2. Giảm chấn: theo Mệnh đề 06.16(b) cần $\tau>1{,}410$; chọn $\tau=2$, $A=H+2\mathrm I=\begin{bmatrix}3&-2\\-2&\tfrac94\end{bmatrix}$ với $A_{11}=3>0$ và $\det A=\tfrac{27}4-4=\tfrac{11}4$, dương.

**Newton không giảm chấn.** $Hd=-g$ cho $d=(-\tfrac56,-\tfrac53)^T$ và $g^Td=\tfrac{25}{12}+\tfrac{25}{12}=\tfrac{25}6$, dương: hướng tăng. Bước đầy đủ tới $(-\tfrac13,-\tfrac23)$, nơi $w_1w_2=\tfrac29$ và $F=\tfrac12\bigl(\tfrac{25}9\bigr)^2\approx3{,}858$, lớn hơn $3{,}125$; tham số đi về phía điểm yên ngựa ở gốc.

**Gradient liên hợp cho $Ad=-g$.** $b=(\tfrac52,\tfrac54)^T$, $d_0=0$.

| Vòng $k$ | $q_k$ | $Aq_k$ | $q_k^TAq_k$ | $\alpha_k$ | $d_{k+1}$ | $r_{k+1}$ |
|---|---|---|---|---|---|---|
| $0$ | $(\tfrac52,\tfrac54)$ | $(5,-\tfrac{35}{16})$ | $\tfrac{625}{64}$ | $\tfrac45$ | $(2,1)$ | $(-\tfrac32,3)$ |
| $1$ | $(\tfrac{21}{10},\tfrac{24}5)$ | $(-\tfrac{33}{10},\tfrac{33}5)$ | $\tfrac{99}4$ | $\tfrac5{11}$ | $(\tfrac{65}{22},\tfrac{35}{11})$ | $(0,0)$ |

Hướng $q_1=r_1+\omega_0q_0$ dùng $\omega_0=\tfrac{45/4}{125/16}=\tfrac{36}{25}$; $d_2\approx(2{,}955;\,3{,}182)^T$.

**Hai phép kiểm.** $g^Td_1=-5-\tfrac54=-\tfrac{25}4$ và $g^Td_2=-\tfrac{125}{11}$, đều âm, đúng Mệnh đề 06.20; phần dư sau vòng 0 là $\lVert r_1\rVert=\sqrt{11{,}25}\approx3{,}35$, còn lớn.

**Quay lui Armijo với $c_1=10^{-4}$, thừa số co $\tfrac12$.**

- Với $d_2$ và $\alpha=1$: điểm thử $(3{,}455;\,4{,}182)$ có $F\approx65{,}5$, bị loại.
- Với $d_2$ và $\alpha=\tfrac12$: điểm thử $(1{,}977;\,2{,}591)$ có $F\approx2{,}253$, nhỏ hơn ngưỡng Armijo $3{,}125-10^{-4}\cdot\tfrac12\cdot\tfrac{125}{11}$, được nhận.
- Với $d_1$, nếu dừng gradient liên hợp sau một vòng: $\alpha=1$ cho $(2{,}5;\,2)$, $w_1w_2=5$, $F=2$, được nhận ngay.

**Vòng ngoài thứ hai: độ cong âm trong gradient liên hợp.** Tại $\theta_1\approx(1{,}977;\,2{,}591)$, $F\approx2{,}253$. Gradient là $g\approx(5{,}500;\,4{,}198)$. Hessian $\begin{bmatrix}6{,}713&7{,}246\\7{,}246&3{,}910\end{bmatrix}$ có $\lambda_{\min}\approx-2{,}069$, nhỏ hơn $-\tau$, nên $A=H+2\mathrm I$ có định thức $\approx-1{,}01$ và bất định.

- Vòng trong 0: $q_0=-g$, $q_0^TAq_0\approx702{,}3>0$, $\alpha_0\approx0{,}0682$, $d_1\approx(-0{,}375;\,-0{,}286)$.
- Vòng trong 1: $q_1^TAq_1\approx-0{,}0048\le0$; theo bước 2 của Thuật toán 06.5, gradient liên hợp dừng và trả $d_1$.
- Kiểm hướng: $d_1=-\alpha_0g$ với $\alpha_0>0$, nên $g^Td_1=-\alpha_0\lVert g\rVert^2\approx-3{,}26$, âm.
- Armijo nhận $\alpha=1$: $\theta_2\approx(1{,}602;\,2{,}305)$, $F\approx0{,}240$.

**Các vòng sau.** Từ vòng ngoài thứ ba, $H+2\mathrm I\succ0$ trở lại (định thức $\approx14{,}2$; $16{,}8$; $17{,}2$), và gradient liên hợp chạy hai vòng. Giá trị $F$ đi $3{,}125\to2{,}253\to0{,}240\to0{,}0172\to1{,}02\cdot10^{-3}\to5{,}6\cdot10^{-5}$; tỷ số giữa hai giá trị liên tiếp là $9{,}4$; $13{,}9$; $16{,}9$; $18{,}3$, tiến tới khoảng $18{,}8$. Dãy hội tụ tới điểm $(1{,}370;\,2{,}190)$ trên hyperbol $w_1w_2=3$.

**Giải thích tỷ số.** Tại điểm giới hạn, Hessian là $(w_2,w_1)^T(w_2,w_1)$, có giá trị riêng $\lambda=w_1^2+w_2^2\approx6{,}67$ theo hướng pháp tuyến của hyperbol và $0$ theo hướng tiếp tuyến. Bước Newton giảm chấn nhân sai số theo hướng pháp tuyến với $\tau/(\lambda+\tau)\approx0{,}231$, nên $F$, bậc hai theo sai số đó, giảm theo hệ số $\bigl(\tfrac{\lambda+\tau}\tau\bigr)^2\approx18{,}8$.

**Diễn giải.**

1. Giả thiết $H\succ0$ không thỏa tại điểm đầu, và bước Newton đi lên mặt mất mát về phía điểm yên ngựa, cùng hiện tượng với Tình huống 04.3.
2. Một $\tau$ cố định không bảo đảm $H+\tau\mathrm I\succ0$ ở mọi vòng: tại $\theta_1$, $\tau=2$ không đủ. Các hướng gradient liên hợp tính trước khi gặp độ cong âm vẫn có $q^TAq>0$, nên $d_1$ vẫn là hướng giảm, và phép kiểm dấu cùng quay lui giữ $F$ giảm ở mọi vòng ngoài.
3. Hội tụ chỉ tuyến tính, vì $\tau$ cố định giữ hệ số $\tau/(\lambda+\tau)$ theo hướng pháp tuyến. Hessian suy biến tại nghiệm chỉ làm hướng tiếp tuyến không co, và sai số theo hướng đó không ảnh hưởng tới $F$. Quy tắc của Martens (2010, mục 4.1) giảm $\tau$ khi mô hình bậc hai dự báo tốt mức giảm thật.

**Kiểm tra lại.** Tọa độ thứ nhất của $A(\tfrac{65}{22},\tfrac{35}{11})^T$ là $\tfrac{195}{22}-\tfrac{140}{22}=\tfrac52$, tọa độ thứ hai là $-\tfrac{130}{22}+\tfrac{315}{44}=\tfrac54$, đúng bằng $b$. $F(2{,}5;\,2)=\tfrac12(5-3)^2=2$.

**Giới hạn.** Ví dụ có hai tham số nên gradient liên hợp giải đúng sau hai vòng; với $p$ lớn, gradient liên hợp dừng sớm, và phép kiểm dấu cùng quay lui giữ cho mỗi vòng ngoài làm $F$ giảm. Giá trị $\tau$ tối thiểu cần biết $\lambda_{\min}(H)$, đại lượng không có sẵn khi $p$ lớn; quy tắc của Martens (2010, mục 4.1) tăng $\tau$ khi mức giảm thật nhỏ hơn nhiều so với dự báo.

**Dẫn ngược lý thuyết.** Mệnh đề 06.37 cho gradient, Hessian và điểm yên ngựa; Mệnh đề 06.16(b) cho ngưỡng $\tau$; Thuật toán 06.4, Định lý 06.18 cho hai vòng gradient liên hợp; Mệnh đề 06.20 cho dấu của $d_1$, $d_2$; Thuật toán 06.5 và quay lui Armijo (Định nghĩa 04.10) cho vòng ngoài.
:::

::: application Tình huống 06.3 (Chuẩn hóa theo lô khi suy luận một quan sát: giả thiết không thỏa)
**Bài toán và dữ liệu.**

Một bộ phân loại tối giản: đầu vào $x\in\{1,2,3,4\}$, mỗi giá trị với xác suất $\tfrac14$; tiền kích hoạt $a=2x$; chuẩn hóa theo lô với $\gamma=1$, $\beta=0$, $\varepsilon=10^{-5}$; dự đoán lớp dương khi $z>0$. Khi triển khai, mỗi yêu cầu chỉ có một quan sát. Cần xác định dự đoán ở chế độ suy luận đúng và ở chế độ dùng nhầm thống kê nhóm.

**Mô hình hóa.**

Tiền kích hoạt nhận $2,4,6,8$ với trung bình $5$ và phương sai $5$. Huấn luyện dùng nhóm $\lvert\mathcal B\rvert=4$ quan sát rút độc lập.

**Kiểm giả thiết.**

1. Chế độ huấn luyện của Định nghĩa 06.28 giả thiết thống kê nhóm đại diện phân phối của đặc trưng. Với nhóm một quan sát, $\sigma_{\mathcal B}^2=0$, nên giả thiết không thỏa.
2. Chế độ suy luận dùng hai số cố định. Với nhóm rút độc lập, $\mathbb E\mu_{\mathcal B}=5$ và $\mathbb E\sigma_{\mathcal B}^2=\tfrac34\cdot5=3{,}75$, vì phương sai mẫu với mẫu số $\lvert\mathcal B\rvert$ chệch theo thừa số $\tfrac{\lvert\mathcal B\rvert-1}{\lvert\mathcal B\rvert}$. Đây là Mệnh đề 05.2 áp lên nhóm: với mô hình hằng và mất mát bình phương chia đôi, $2J(\widehat\theta)$ là phương sai mẫu với mẫu số $N$, tức $\sigma_{\mathcal B}^2=2J(\widehat\theta)$ khi $N=\lvert\mathcal B\rvert$, và $\mathbb EJ(\widehat\theta)=\tfrac{N-1}{2N}\operatorname{Var}Y$. Thừa số $\tfrac43$ của Nhận xét 06.30 cho $5$, đúng phương sai của đặc trưng.

**Suy luận đúng.** $z(x)=(2x-5)/\sqrt{5+10^{-5}}$: $x=1,2,3,4$ cho $z\approx-1{,}342$; $-0{,}447$; $0{,}447$; $1{,}342$. Dự đoán dương khi và chỉ khi $x\ge3$, và không phụ thuộc quan sát nào khác.

**Dùng nhầm thống kê nhóm.**

- Một quan sát mỗi lần: $\mu_{\mathcal B}=a$, $\sigma_{\mathcal B}^2=0$, nên $z=0=\beta$ với mọi $x$; bộ phân loại trả cùng một giá trị cho mọi đầu vào.
- Gom bốn yêu cầu $x=3,4,4,4$ thành một nhóm $a=(6,8,8,8)$, với $\mu_{\mathcal B}=7{,}5$ và $\sigma_{\mathcal B}^2=0{,}75$. Khi đó $z(3)=-1{,}5/\sqrt{0{,}75}\approx-1{,}732$, một số âm, nên quan sát $x=3$ bị đổi sang lớp âm chỉ vì ba quan sát đi cùng.
- Gom $x=4,4,4,1$ thành nhóm $a=(8,8,8,2)$, với $\mu_{\mathcal B}=6{,}5$ và $\sigma_{\mathcal B}^2=6{,}75$. Khi đó $z(4)\approx0{,}577$, khác giá trị $1{,}342$ của suy luận đúng.

**Diễn giải.** Mệnh đề 06.29(e) nói đầu ra của một quan sát phụ thuộc các quan sát cùng nhóm; khi suy luận, sự phụ thuộc đó trở thành lỗi, vì dự đoán cho một khách hàng thay đổi theo khách hàng khác trong cùng lượt xử lý. Chế độ suy luận với thống kê cố định loại bỏ phụ thuộc này. Mỗi đặc trưng được chuẩn hóa riêng gọi là một kênh. PyTorch báo lỗi khi một lớp chuẩn hóa theo lô ở chế độ huấn luyện nhận mỗi kênh chỉ một giá trị, và chuyển chế độ bằng `model.train()`, `model.eval()`.

**Kiểm tra lại.** Nhóm $(6,8,8,8)$: sai lệch $-1{,}5;\,0{,}5;\,0{,}5;\,0{,}5$, phương sai $\tfrac{2{,}25+3\cdot0{,}25}4=0{,}75$. Nhóm $(8,8,8,2)$: sai lệch $1{,}5;\,1{,}5;\,1{,}5;\,-4{,}5$, phương sai $\tfrac{3\cdot2{,}25+20{,}25}4=6{,}75$, $1{,}5/\sqrt{6{,}75}\approx0{,}577$.

**Giới hạn.** Thống kê chạy trong thực hành là trung bình mũ, không phải kỳ vọng chính xác; khi phân phối dữ liệu triển khai lệch khỏi phân phối huấn luyện, thống kê cố định cũng lệch. Sau khi lấy trung bình tham số (Định nghĩa 06.32), thống kê phải tính lại trên dữ liệu.

**Dẫn ngược lý thuyết.** Định nghĩa 06.28 cho hai chế độ; Mệnh đề 06.29(e) cho sự phụ thuộc nhóm; Nhận xét 06.30 cho thừa số $\tfrac{\lvert\mathcal B\rvert}{\lvert\mathcal B\rvert-1}$; Mệnh đề 05.2 cho độ chệch của phương sai mẫu.
:::

**Ứng dụng.** Các khái niệm của chương xuất hiện trong học máy ở những chỗ sau.

- **Bộ tối ưu của mạng sâu.** Adam (Thuật toán 06.3) có giá trị mặc định trong PyTorch theo Kingma và Ba (2015); Mệnh đề 06.10 cho thấy một bước Adam có thể đi theo hướng làm tăng xấp xỉ bậc nhất của mất mát.
- **Mô hình thưa.** AdaGrad (Mệnh đề 06.6) giữ bước học lớn cho đặc trưng hiếm (Duchi, Hazan và Singer 2011).
- **Bài toán lồi cỡ vừa.** L-BFGS (Thuật toán 06.7) là bộ giải mặc định cho hồi quy logistic trong scikit-learn.
- **Tối ưu không dùng Hessian.** Martens (2010) huấn luyện bộ tự mã hóa (autoencoder) sâu bằng một biến thể của Thuật toán 06.5: ma trận Gauss–Newton thay Hessian, $\tau$ chỉnh theo tỷ số giữa mức giảm thật và mức giảm dự báo, gradient liên hợp khởi động từ hướng của vòng trước và dừng theo mức giảm của $\phi$.
- **Kiến trúc và trung bình trọng số.** Chuẩn hóa theo lô (Định nghĩa 06.28) và nối tắt (Mệnh đề 06.36) có trong mạng phần dư (He và cộng sự 2016); trung bình tham số (Định nghĩa 06.32) dùng ở cuối huấn luyện.
- **Học chuyển giao và học theo chương trình.** Tiền huấn luyện (Định nghĩa 06.38) cho điểm đầu; học theo chương trình (Định nghĩa 06.41) đổi phân phối mẫu theo giai đoạn (Bengio và cộng sự 2009).

## Tóm tắt chương

**Định nghĩa.**

- Quá trình huấn luyện và bốn thành phần (Định nghĩa 06.1); bài toán con có phạt (Định nghĩa 06.2).
- Ma trận phạt chéo và bước học hiệu dụng (Định nghĩa 06.5).
- Hệ Newton giảm chấn (Định nghĩa 06.15); hướng liên hợp (Định nghĩa 06.17).
- Phương trình cát tuyến và điều kiện độ cong (Định nghĩa 06.21); điều kiện Wolfe (Định nghĩa 06.25).
- Chuẩn hóa theo lô (Định nghĩa 06.28); trung bình Polyak (Định nghĩa 06.32); khối nối tắt (Định nghĩa 06.35).
- Tiền huấn luyện có giám sát (Định nghĩa 06.38); phương pháp tiếp diễn (Định nghĩa 06.39); học theo chương trình (Định nghĩa 06.41).
- Thuật toán: Thuật toán 06.1, Thuật toán 06.2, Thuật toán 06.3, Thuật toán 06.4, Thuật toán 06.5, Thuật toán 06.6, Thuật toán 06.7, Thuật toán 06.8.

**Kết quả chính.**

- Mệnh đề 06.3: ma trận phạt xác định dương cho bước $-\eta M^{-1}g$ duy nhất và hướng giảm; ma trận bất định làm bài toán con mất cực tiểu.
- Mệnh đề 06.6, Mệnh đề 06.7, Mệnh đề 06.9: tính chất của tổng tích lũy, trung bình mũ và hiệu chỉnh moment; Mệnh đề 06.10: bước Adam có thể không là hướng giảm.
- Mệnh đề 06.11 và Mệnh đề 06.12: thống kê chéo bất biến với thang theo trục và không sửa được độ cong nghiêng.
- Mệnh đề 06.13: bước Newton bất biến với phép đổi biến tuyến tính; Mệnh đề 06.16: giảm chấn và ngưỡng $\tau>-\lambda_{\min}(H)$.
- Định lý 06.18: trực giao, liên hợp, giảm $\phi$ và kết thúc sau nhiều nhất $p$ vòng; Mệnh đề 06.20: nghiệm gần đúng từ $d_0=0$ là hướng giảm.
- Mệnh đề 06.22: cặp $(s,y)$ đo Hessian trung bình; Định lý 06.23: cập nhật BFGS giữ cát tuyến và tính xác định dương; Mệnh đề 06.26: Wolfe cho $s^Ty>0$; Mệnh đề 06.27: đệ quy hai vòng.
- Mệnh đề 06.29, Mệnh đề 06.31, Hệ quả 06.33, Mệnh đề 06.34, Mệnh đề 06.36: bốn can thiệp ngoài quy tắc cập nhật.
- Mệnh đề 06.37, Mệnh đề 06.40, Mệnh đề 06.42: điểm dừng tại điểm đầu, điểm dừng truyền qua các giai đoạn, phần mất mát thừa khi lịch không tới phân phối đích.

**Công thức cần nhớ.** Ba bước cập nhật của Mục 1–2:

$$
d=-\eta M^{-1}g,\qquad d_t=-\eta\,\frac{g_t}{\sqrt{v_t}+\varepsilon},\qquad\widehat m_t=\frac{m_t}{1-\beta_1^t},\quad\widehat v_t=\frac{v_t}{1-\beta_2^t};
$$

hệ Newton giảm chấn và hai hệ số của gradient liên hợp (Mục 3):

$$
(H+\tau\mathrm I)d=-g,\qquad\alpha_k=\frac{r_k^Tr_k}{q_k^TAq_k},\qquad\omega_k=\frac{r_{k+1}^Tr_{k+1}}{r_k^Tr_k};
$$

cập nhật BFGS, chuẩn hóa theo lô và trung bình Polyak (Mục 4–5):

$$
P^+=\Bigl(\mathrm I-\frac{sy^T}{y^Ts}\Bigr)P\Bigl(\mathrm I-\frac{ys^T}{y^Ts}\Bigr)+\frac{ss^T}{y^Ts},\qquad\widehat a_i=\frac{a_i-\mu_{\mathcal B}}{\sqrt{\sigma_{\mathcal B}^2+\varepsilon}},\qquad\bar\theta_T=\frac1T\sum_{t=1}^T\theta_t .
$$

**Giả thiết hay bị bỏ quên.**

- Ma trận phạt phải xác định dương; khả nghịch chưa đủ.
- Hướng giảm chưa phải bước giảm; độ dài bước cần quy tắc riêng.
- Tử số của Adam là moment, không phải gradient hiện tại; tính không chệch của hiệu chỉnh cần kỳ vọng không đổi.
- Giảm chấn cần $\tau>-\lambda_{\min}(H)$, không chỉ $\tau>0$.
- Gradient liên hợp cần toán tử cố định trong một lần giải; phần dư nhỏ và dấu $g^Td$ là hai phép kiểm khác nhau.
- BFGS cần $y^Ts>0$ và hai gradient của cùng một mục tiêu.
- Chuẩn hóa theo lô có hai chế độ; trung bình tham số cần các điểm cùng một miền; mọi chiến lược theo giai đoạn phải kết thúc ở mục tiêu đích.

**Chuỗi suy luận của toàn chương.** Định nghĩa 06.1 và Mệnh đề 06.3 đặt khung: một bước là nghiệm của bài toán con với ma trận phạt xác định dương. Mục 2 chọn ma trận phạt chéo từ gradient, với phạm vi do Mệnh đề 06.11 và Mệnh đề 06.12 quy định.

Mục 3 dùng Hessian, sửa tính bất định bằng Mệnh đề 06.16 và tránh lập Hessian bằng Định lý 06.18, Mệnh đề 06.20; Mục 4 xấp xỉ nghịch đảo Hessian từ sai phân gradient (Định lý 06.23). Mục 5–6 thay các thành phần còn lại của Định nghĩa 06.1, và Nhận xét 06.44 gom tất cả thành quy tắc chọn theo dữ kiện.

**Giới hạn còn lại và bài sau.** Chương mở rộng giảm gradient và phương pháp Newton của Bài 04, cùng SGD và momentum của Bài 05, thành các bộ tối ưu dùng thống kê gradient, độ cong và cách tổ chức huấn luyện. Mọi phương pháp của chương xét bài toán không ràng buộc, với biến liên tục và mục tiêu khả vi, và đi theo các bước cục bộ. Bài 07 xét hai lớp bài toán có cấu trúc khác. Quy hoạch tuyến tính có ràng buộc, và khi có nghiệm tối ưu và miền có đỉnh, có một nghiệm tối ưu nằm ở một đỉnh của đa diện ràng buộc; quy hoạch động giải bài toán quyết định theo giai đoạn bằng phương trình Bellman thay cho gradient.

## Bài tập củng cố

Mỗi mức có một bài; cùng với các bài trong mục, mọi mục tiêu học tập có ít nhất một bài tập. Các bài không trùng đề với bộ bài giao chính thức trong tệp bài tập của Bài 06.

### Mức nhận biết

::: exercise Bài tập 06.11 (Nhận biết: đúng hay sai)
Xác định đúng hay sai, giải thích bằng một kết quả có số hiệu hoặc một phản ví dụ.

1. Với AdaGrad và $\varepsilon>0$, mọi tọa độ của bước có độ lớn nhỏ hơn $\eta$.
2. Ở vòng đầu, thống kê $v_1$ của RMSProp là ước lượng không chệch của $\mathbb E[g\odot g]$.
3. Bước Newton tính trong hai hệ tọa độ liên hệ bởi một ma trận khả nghịch cho cùng một điểm mới.
4. Ở chế độ suy luận, đầu ra của chuẩn hóa theo lô cho một quan sát không phụ thuộc các quan sát khác.
5. Trong mô hình của Mệnh đề 06.34, phương sai của trung bình Polyak giảm về $0$ dù bước học cố định.
6. Một lịch học theo chương trình dừng ở phân phối khác phân phối đích vẫn cho nghiệm của mục tiêu đích khi mỗi giai đoạn được giải chính xác.
:::

::: hint
Với câu 2, khai triển $v_1$ theo (2.2). Với câu 6, xem Mệnh đề 06.42.
:::

::: solution
1. Đúng: Mệnh đề 06.6(d).
2. Sai: $v_1=(1-\rho)\,g_1\odot g_1$, có kỳ vọng $(1-\rho)\mathbb E[g\odot g]$; chỉ sau khi chia cho $1-\rho$, như Adam làm, mới không chệch (Mệnh đề 06.9(b)).
3. Đúng: Mệnh đề 06.13(a).
4. Đúng: Định nghĩa 06.28, chế độ suy luận dùng hai số cố định.
5. Đúng: Mệnh đề 06.34(b) cho cận $V_\zeta/(\lambda^2T)$.
6. Sai: dừng ở $\pi=\tfrac14$ cho $\tfrac12$ thay cho $\tfrac25$ và phần mất mát thừa $\tfrac1{40}$ (Mệnh đề 06.42).

**Kiểm tra lại.** Câu 2 với $\rho=0{,}9$ và gradient hằng $1$: $v_1=0{,}1$, trong khi $\mathbb E[g\odot g]=1$.
:::

### Mức tính toán hoặc chứng minh

::: exercise Bài tập 06.12 (Chứng minh: gradient liên hợp với hai giá trị riêng)
Cho $A\in\mathbb R^{p\times p}$ đối xứng xác định dương có đúng hai giá trị riêng phân biệt $\lambda_1\ne\lambda_2$, $b\ne0$ và $d_0=0$.

- (a) Chứng minh $(A-\lambda_1\mathrm I)(A-\lambda_2\mathrm I)=0$ và suy ra $A^{-1}b\in\operatorname{span}\{b,Ab\}$.
- (b) Dùng Định lý 06.18(f) để chứng minh Thuật toán 06.4 cho nghiệm chính xác sau nhiều nhất hai vòng, với mọi $p$.
:::

::: hint
Ở (a), dùng phân tích phổ: mỗi vectơ riêng bị một trong hai thừa số triệt tiêu. Ở (b), chứng tỏ $\operatorname{span}\{q_0,q_1\}=\operatorname{span}\{b,Ab\}$ khi $r_1\ne0$.
:::

::: solution
**Câu (a).** Với vectơ riêng $u$ ứng với $\lambda_1$, $(A-\lambda_2\mathrm I)u=(\lambda_1-\lambda_2)u$ và $(A-\lambda_1\mathrm I)$ triệt tiêu nó; tương tự cho $\lambda_2$, và hai thừa số giao hoán. Các vectơ riêng tạo cơ sở, nên tích bằng $0$. Khai triển: $A^2-(\lambda_1+\lambda_2)A+\lambda_1\lambda_2\mathrm I=0$. Nhân với $A^{-1}$ rồi với $b$:

$$
A^{-1}b=\frac{(\lambda_1+\lambda_2)\,b-Ab}{\lambda_1\lambda_2}\in\operatorname{span}\{b,Ab\}.
$$

**Câu (b).** Nếu $r_1=0$, nghiệm đạt sau một vòng. Nếu không, $q_0=b$ và $q_1=r_1+\omega_0b$ với $r_1=b-\alpha_0Ab$, nên $\operatorname{span}\{q_0,q_1\}\subseteq\operatorname{span}\{b,Ab\}$; hai không gian cùng chiều $2$ vì $q_0$, $q_1$ khác $0$ và liên hợp nên độc lập (Định lý 06.18(c)). Theo Định lý 06.18(f), $d_2$ cực tiểu $\phi$ trên không gian đó, không gian chứa $A^{-1}b$ theo (a). Vì $\phi$ lồi chặt với cực tiểu duy nhất $A^{-1}b$, $d_2=A^{-1}b$.

**Kiểm tra lại.** Với $A=\operatorname{diag}(1,4,4)$ và $b=(1,1,1)^T$, công thức (a) với $\lambda_1=1$, $\lambda_2=4$ cho $\tfrac{5(1,1,1)-(1,4,4)}{4}=(1,\tfrac14,\tfrac14)$, đúng là $A^{-1}b$.
:::

### Mức vận dụng vào AI

::: exercise Bài tập 06.13 (Vận dụng: kế hoạch tối ưu cho hai mô hình)
Một nhóm có hai bài toán.

- Mô hình A: hồi quy logistic với hạng chính quy hóa $\tfrac{\mu_0}2\lVert\theta\rVert^2$, $\mu_0>0$, $p=10^4$ tham số, $N=10^5$ quan sát, tính được gradient đầy đủ trong thời gian chấp nhận được; mục tiêu lồi mạnh.
- Mô hình B: mạng tích chập có chuẩn hóa theo lô và khối nối tắt, $p=10^7$ tham số, chỉ huấn luyện được bằng gradient nhóm.

- (a) Chọn bộ tối ưu cho mỗi mô hình; tính bộ nhớ trạng thái phụ, với L-BFGS dùng $n_{\rm m}=10$.
- (b) Với mô hình A, nêu giả thiết của Định lý 06.23 và cách bảo đảm nó trong thuật toán.
- (c) Với mô hình B, nhóm muốn lấy trung bình tham số trong $5$ lượt cuối rồi triển khai với từng ảnh một. Nêu hai việc phải làm, mỗi việc kèm kết quả của chương.
:::

::: hint
Mô hình A có gradient đầy đủ và mục tiêu lồi mạnh, nên theo Mệnh đề 06.22(b) mọi cặp có $s^Ty>0$. Với (c), xem Hệ quả 06.33, Mệnh đề 06.29 và Tình huống 06.3.
:::

::: solution
**Câu (a).**

- Mô hình A: L-BFGS, bộ nhớ $2\cdot10\cdot10^4=2\cdot10^5$ số; BFGS đầy đủ cũng khả thi với $10^8$ số.
- Mô hình B: Adam, $2\cdot10^7$ số. BFGS cần $10^{14}$ số, bị loại; L-BFGS cần gradient ổn định mà gradient nhóm không cho.

**Câu (b).** Cần $P\succ0$ và $y^Ts>0$.

- Hạng $\tfrac{\mu_0}2\lVert\theta\rVert^2$ làm mọi giá trị riêng của Hessian không nhỏ hơn $\mu_0$, vì mất mát logistic lồi. Với gradient đầy đủ, Mệnh đề 06.22(b) cho $s^Ty\ge\mu_0\lVert s\rVert^2>0$ với mọi bước khác $0$.
- Tìm bước Wolfe bảo đảm $s^Ty>0$ cả khi không có tính lồi (Mệnh đề 06.26).
- Bắt đầu từ $P_0\succ0$, Định lý 06.23(b) giữ tính xác định dương ở mọi vòng.

**Câu (c).** Thứ nhất, chỉ lấy trung bình các điểm của phần cuối quỹ đạo, cùng một miền, vì Hệ quả 06.33 cần tính lồi trên tập chứa các điểm, và trung bình của hai điểm ở hai miền nghiệm có thể có mất mát lớn hơn cả hai, như phản ví dụ $(\theta^2-1)^2$ ngay sau Hệ quả 06.33. Thứ hai, tính lại thống kê suy luận của chuẩn hóa theo lô cho tham số trung bình và triển khai ở chế độ suy luận, vì theo Mệnh đề 06.29(e) và Tình huống 06.3, chế độ huấn luyện với một ảnh cho đầu ra hằng.

**Kiểm tra lại.** $10^7\cdot2\cdot4$ byte $=0{,}08$ GB cho Adam; $10^{14}\cdot4$ byte $=4\cdot10^5$ GB cho BFGS.
:::

## Hướng dẫn đọc thêm và tài liệu tham khảo

Số trang của Goodfellow, Bengio và Courville là trang in của bản MIT Press.

- Goodfellow, I., Bengio, Y. và Courville, A. (2016), *Deep Learning*, MIT Press. Mục 8.5 (tr. 306–310) cho Mục 2; mục 8.6 (tr. 310–317) cho Mục 3–4; mục 8.7.1–8.7.3 (tr. 317–322) cho Mục 5.1–5.3; mục 8.7.5 (tr. 326–327) cho Mục 5.4; mục 8.7.4 và 8.7.6 (tr. 323–329) cho Mục 6.
- Nocedal, J. và Wright, S. J. (2006), *Numerical Optimization*, ấn bản 2, Springer. Mục 3.4 (sửa Hessian), chương 4 (vùng tin cậy) cho Mục 3.3; chương 5 (gradient liên hợp) cho Mục 3.4; chương 6 (BFGS, điều kiện Wolfe) và mục 7.1–7.2 (Newton–CG, L-BFGS) cho Mục 3.5 và Mục 4.
- Boyd, S. và Vandenberghe, L. (2004), *Convex Optimization*, Cambridge University Press, mục 9.4.1 và 9.5 (tr. 476–489): hướng theo chuẩn bậc hai, phương pháp Newton và tính bất biến affine, cho Mục 1.3 và 3.2.
- Shewchuk, J. R. (1994), *An Introduction to the Conjugate Gradient Method Without the Agonizing Pain*, Đại học Carnegie Mellon, mục 8–9 và phụ lục B2: gradient liên hợp tuyến tính, Mục 3.4.
- Duchi, J., Hazan, E. và Singer, Y. (2011), "Adaptive subgradient methods for online learning and stochastic optimization", *Journal of Machine Learning Research* 12, tr. 2121–2159: AdaGrad, Mục 2.2.
- Hinton, G., Srivastava, N. và Swersky, K. (2012), *Neural Networks for Machine Learning*, Lecture 6, Đại học Toronto: RMSProp, Mục 2.3.
- Kingma, D. P. và Ba, J. (2015), "Adam: A method for stochastic optimization", *International Conference on Learning Representations*, thuật toán 1 và mục 3: Mục 2.4.
- Reddi, S. J., Kale, S. và Kumar, S. (2018), "On the convergence of Adam and beyond", *International Conference on Learning Representations*: phạm vi của Adam, Mục 2.4.
- Pearlmutter, B. A. (1994), "Fast exact multiplication by the Hessian", *Neural Computation* 6(1), tr. 147–160: tích Hessian–vectơ, Mục 3.4.
- Martens, J. (2010), "Deep learning via Hessian-free optimization", *Proceedings of the 27th International Conference on Machine Learning*, mục 3–4: Newton–CG, giảm chấn, Mục 3.5 và Tình huống 06.2.
- Ioffe, S. và Szegedy, C. (2015), "Batch normalization: Accelerating deep network training by reducing internal covariate shift", *Proceedings of the 32nd International Conference on Machine Learning*, thuật toán 1–2: Mục 5.1.
- Santurkar, S., Tsipras, D., Ilyas, A. và Madry, A. (2018), "How does batch normalization help optimization?", *Advances in Neural Information Processing Systems* 31: Nhận xét về cơ chế, Mục 5.1.
- Powell, M. J. D. (1973), "On search directions for minimization algorithms", *Mathematical Programming* 4, tr. 193–201: phản ví dụ cho hạ theo tọa độ, Mục 5.2.
- Polyak, B. T. và Juditsky, A. B. (1992), "Acceleration of stochastic approximation by averaging", *SIAM Journal on Control and Optimization* 30(4), tr. 838–855: Mục 5.3.
- He, K., Zhang, X., Ren, S. và Sun, J. (2016), "Deep residual learning for image recognition", *Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition*, tr. 770–778: nối tắt, Mục 5.4.
- Yosinski, J., Clune, J., Bengio, Y. và Lipson, H. (2014), "How transferable are features in deep neural networks?", *Advances in Neural Information Processing Systems* 27: học chuyển giao, Mục 6.1; dẫn qua Goodfellow, Bengio và Courville (2016, tr. 325).
- Zaremba, W. và Sutskever, I. (2014), "Learning to execute", arXiv:1410.4615: chương trình ngẫu nhiên, Mục 6.3; dẫn qua Goodfellow, Bengio và Courville (2016, tr. 329).
- Bengio, Y., Louradour, J., Collobert, R. và Weston, J. (2009), "Curriculum learning", *Proceedings of the 26th International Conference on Machine Learning*, mục 2–3: Mục 6.3.
- Ghi chú Bài 04 (phương pháp Newton, quay lui Armijo, Tình huống 04.3) và Bài 05 (SGD, momentum, Tình huống 05.2, Ví dụ 05.14) là tiên quyết trực tiếp; Bài 05b (Bổ đề BĐ5) cho bất đẳng thức Jensen.
