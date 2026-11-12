# Bài 06 — Mở rộng mô hình và dữ liệu

Bài 05 kết thúc với hai giới hạn của mô hình tuyến tính theo đặc trưng cố định và của phương pháp tất định. Giới hạn thứ nhất là chi phí: với $n$ mẫu và $p$ tham số, một bước hạ gradient tốn bậc $np$ phép nhân–cộng và một bước Newton tốn bậc $np^2+p^3$ (Mệnh đề 05.33), nên khi $n$ lớn, một gradient đầy đủ có thể vượt *ngân sách mỗi bước*, tức thời gian tính cho phép của một lần cập nhật. Giới hạn thứ hai là biểu diễn: không điểm số affine nào phân lớp đúng bốn điểm XOR (Mệnh đề 05.38), và thêm mọi đơn thức tới bậc $q$ của $d$ biến làm số đặc trưng thành $\binom{d+q}q$ (Mệnh đề 05.39). Câu hỏi trung tâm của Bài 06 là: **khi mô hình học đặc trưng từ dữ liệu và một gradient đầy đủ vượt ngân sách mỗi bước, gradient còn chứng nhận được điều gì, và tốc độ hội tụ nào còn lại khi gradient có nhiễu.** Để trả lời, chúng ta xây dựng bốn nhóm đối tượng, bao gồm:

- mạng hai tầng, đối xứng hoán vị (permutation symmetry) và tính không lồi của rủi ro thực nghiệm (empirical risk);
- đồ thị tính toán (computational graph), lan truyền ngược (backpropagation) và chi phí của một gradient mẫu;
- điểm dừng, bổ đề giảm (descent lemma) và bảo đảm theo chuẩn gradient khi mục tiêu không lồi;
- gradient lô nhỏ (mini-batch), các định lý hội tụ của hạ gradient ngẫu nhiên (stochastic gradient descent, SGD) và dừng sớm (early stopping).

## Câu hỏi mở đầu

Cho bốn điểm $x\in\{(0,0),(0,1),(1,0),(1,1)\}$ với nhãn $y=0,1,1,0$ (bài toán XOR), mất mát bình phương $\tfrac12(f-y)^2$ và mô hình $f(x)=w_2^\top\max\{0,W_1x\}$ với $w_2=(1,1)$, trong đó $\max$ lấy theo từng thành phần. Hai ma trận

$$
\begin{aligned}
&W_1^A=\begin{pmatrix}1&-1\\-1&1\end{pmatrix},\\
&W_1^B=-W_1^A
\end{aligned}
$$

đều cho $f(x)=\lvert x_1-x_2\rvert$, khớp đúng bốn nhãn, nên trung bình mất mát trên bốn điểm bằng $0$ tại cả hai.

**Câu hỏi.** Tại trung điểm $W_1=\tfrac12(W_1^A+W_1^B)$, trung bình mất mát trên bốn điểm bằng bao nhiêu?

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Chứng minh rằng đặc trưng affine không làm dữ liệu XOR tách được, dựng một mạng hai tầng biểu diễn đúng XOR, và chứng minh rủi ro thực nghiệm của mạng không lồi bằng đối xứng hoán vị các đơn vị ẩn.
2. Tính gradient của mất mát theo mọi tham số của mạng hai tầng bằng lan truyền ngược, kiểm tra một thành phần bằng sai phân hữu hạn, và đếm số phép nhân của truyền xuôi và của bước ngược.
3. Phân loại điểm dừng bằng trị riêng của Hessian, áp dụng bổ đề giảm và định lý hội tụ của chuẩn gradient khi mục tiêu không lồi, và xác định đại lượng mà định lý đó chặn.
4. Tính kỳ vọng và sai số bình phương trung bình của gradient lô nhỏ khi chọn có và không hoàn lại, và thực hiện thuật toán hạ gradient ngẫu nhiên lô nhỏ.
5. Kiểm tra giả thiết và áp dụng các định lý hội tụ của hạ gradient ngẫu nhiên cho hàm lồi mạnh và hàm không lồi, và so dừng sớm với chính quy hóa bậc hai.
6. Chọn giữa hạ gradient đầy đủ, Newton và hạ gradient ngẫu nhiên theo số mẫu, số tham số và tính lồi, kèm bảo đảm và giả thiết của lựa chọn.

## Kiến thức tiên quyết

Bài 06 dùng các kết quả sau của Bài 00, 01, 04, 05 và hai bài bổ trợ 05b, 05c.

- **Quy tắc dây chuyền dạng Jacobian chuyển vị** (Định lý 00.35). Nếu $\psi:\mathbb R^{d_u}\to\mathbb R^{d_v}$ khả vi với Jacobian $J_\psi(u)\in\mathbb R^{d_v\times d_u}$ và $g:\mathbb R^{d_v}\to\mathbb R$ khả vi, thì $\nabla(g\circ\psi)(u)=J_\psi(u)^\top\nabla g(\psi(u))$.
- **Khai triển Taylor bậc hai và phép kiểm tra bậc hai bằng Hessian** (Định lý 00.40, 00.43). Với $F$ khả vi liên tục hai lần, $F(\theta+s)=F(\theta)+\nabla F(\theta)^\top s+\tfrac12s^\top\nabla^2F(\theta)s+o(\lVert s\rVert^2)$; tại điểm có $\nabla F(\theta)=0$, nếu $\nabla^2F(\theta)\succ0$ thì $\theta$ là cực tiểu địa phương chặt, còn nếu $\nabla^2F(\theta)$ có cả trị riêng âm và trị riêng dương thì $\theta$ là điểm yên ngựa.
- **Tính lồi** (Định nghĩa 01.21; Định lý 01.30(b); Hệ quả 01.26, 01.33). Hợp của một hàm lồi với một ánh xạ affine là hàm lồi. Với $F$ lồi khả vi, mọi điểm có $\nabla F(\theta)=0$ là cực tiểu toàn cục. Tập nghiệm của bài toán cực tiểu hóa một hàm lồi là tập lồi.
- **Gradient Lipschitz, bổ đề giảm và hạ gradient trên hàm lồi mạnh** (Định nghĩa 04.18; Bổ đề 04.19, 04.21; Nhận xét 04.20; Định lý 04.27; Bổ đề 05b.6). Nếu $\nabla F$ là $L$-Lipschitz thì $F(\theta')\le F(\theta)+\nabla F(\theta)^\top(\theta'-\theta)+\tfrac L2\lVert\theta'-\theta\rVert^2$, và một bước hạ gradient với bước $\eta$ làm $F$ giảm ít nhất $\eta(1-\tfrac{L\eta}2)\lVert\nabla F(\theta)\rVert^2$ ($\eta\le\tfrac1L$ ở Bổ đề 04.21, $\eta<\tfrac2L$ ở Bổ đề 05b.6). Nếu mọi trị riêng của $\nabla^2F$ nằm trong $[-L,L]$ thì $\nabla F$ là $L$-Lipschitz. Trên hàm lồi mạnh, hạ gradient bước $\tfrac1L$ hội tụ tuyến tính với hệ số $1-\mu/L$; Newton với quay lui có một pha hội tụ bậc hai (Định lý 04.37).
- **Mạng tuyến tính hai lớp** (Tình huống 04.3). Hàm $f(a,b)=\tfrac12(ab-1)^2$ có Hessian tại gốc với trị riêng $\pm1$, tập nghiệm $\{ab=1\}$ không lồi và gradient không Lipschitz toàn cục; hạ gradient bước $\tfrac14$ từ $(1,-1)$ tiến về điểm yên ngựa $(0,0)$.
- **Kết luận của Bài 05**, bao gồm:
  - chi phí một bước của hạ gradient và Newton (Mệnh đề 05.33);
  - tách được tuyến tính (Định nghĩa 05.20) và bài toán XOR: điểm số affine không tách được bốn điểm, còn đặc trưng thêm $u_1u_2$ thì tách được (Mệnh đề 05.38);
  - số đơn thức bậc không quá $q$ của $d_0$ biến là $\binom{d_0+q}q$ (Mệnh đề 05.39);
  - rủi ro thực nghiệm và rủi ro kỳ vọng (expected risk, population risk) (Định nghĩa 05.5), sai số xác thực theo số đặc trưng (Ví dụ 05.4); tập xác thực, tập kiểm thử (Định nghĩa 05.6) và thiên lệch khi chọn và báo cáo trên cùng một tập (Nhận xét 05.8); dừng sớm (Định nghĩa 05.36, Mệnh đề 05.37, Ví dụ 05.24);
  - mất mát logistic không có điểm cực tiểu trên dữ liệu tách được (Định lý 05.22), chính quy hóa bậc hai làm mục tiêu lồi mạnh (Định lý 05.26), thí nghiệm RCV1 (Ví dụ 05.25) và các bảo đảm còn lại khi rời khung tất định (Nhận xét 05.40).
- **Bài 05b**: giả thiết (H0)–(H4) và (H6)–(H6b) (Định nghĩa 05b.5, 05b.31); tách phương sai (Bổ đề 05b.32); ví dụ xuyên suốt A (Ví dụ 05b.19); các định lý hội tụ của hạ gradient và SGD (Định lý 05b.16, 05b.18, 05b.36, 05b.39, 05b.41, 05b.43; Hệ quả 05b.38, 05b.44).
- **Bài 05c**: rủi ro thực nghiệm tại một tham số cố định và gradient lô nhỏ (Định nghĩa 05c.51; Định lý 05c.52, 05c.53; Mệnh đề 05c.56); phân tích của Bottou và Bousquet (Nhận xét 05c.58).

**Câu hỏi ôn nhanh.**

1. Cho $\psi(u)=Mu$ với $M=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ và $g(v)=\tfrac12\lVert v\rVert^2$. Theo Định lý 00.35, tính $\nabla(g\circ\psi)(u)$ tại $u=(1,1)$.
2. Hàm $F$ có gradient $4$-Lipschitz và $\nabla F(\theta)=(1,2)$. Theo Bổ đề 04.21, xác định mức giảm bảo đảm của một bước hạ gradient bước $\tfrac14$.
3. Tại một tham số $\theta$ cố định, chọn trước khi rút mẫu, mất mát $\ell(f(X;\theta),Y)$ có phương sai $4$. Theo Định lý 05c.52, tính phương sai và độ lệch chuẩn của rủi ro thực nghiệm trên $n=100$ mẫu độc lập.

::: hint Lời giải câu hỏi ôn nhanh
1. $J_\psi=M$ và $\nabla g(v)=v$, nên $\nabla(g\circ\psi)(u)=M^\top Mu$. Với $u=(1,1)$: $Mu=(3,1)$ và $M^\top(3,1)=(3,7)$.
2. Bước $\tfrac14=\tfrac1L$, nên mức giảm ít nhất là $\lVert\nabla F(\theta)\rVert^2/(2L)=5/8$.
3. Phương sai bằng $4/100=0{,}04$; độ lệch chuẩn bằng $0{,}2$.
:::

## 1. Thiết lập bài toán

Mọi bài toán của Bài 06 có chung một dạng: từ $n$ mẫu, chọn tham số của một mô hình để mất mát trung bình nhỏ.

::: definition Định nghĩa 06.1 (Bài toán huấn luyện)
Cho $n$ mẫu $(x_i,y_i)$, $i=1,\ldots,n$, với $x_i\in\mathbb R^d$ và $y_i\in\mathbb R$ hoặc $y_i\in\{-1,+1\}$, được rút độc lập từ cùng một phân phối của cặp ngẫu nhiên $(X,Y)$. Cho một mô hình $f(x;\theta)$ với tham số $\theta\in\mathbb R^p$ và một hàm mất mát $\ell:\mathbb R\times\mathbb R\to\mathbb R$, lồi và khả vi theo đối số thứ nhất.

**Mất mát trên mẫu $i$.** $\ell_i(\theta)=\ell\bigl(f(x_i;\theta),y_i\bigr)$.

**Rủi ro thực nghiệm.** $F(\theta)=\dfrac1n\displaystyle\sum_{i=1}^n\ell_i(\theta)$.

**Rủi ro kỳ vọng.** $R(\theta)=\mathbb E\,\ell\bigl(f(X;\theta),Y\bigr)$.

**Huấn luyện bằng gradient.** Dãy lặp $\theta_{k+1}=\theta_k-\eta_kg_k$, $k=0,1,2,\ldots$, trong đó $\eta_k>0$ là bước và $g_k\in\mathbb R^p$ là $\nabla F(\theta_k)$ hoặc gradient tính trên một lô mẫu.
:::

Trong định nghĩa trên, $R$ là đại lượng cần nhỏ, vì nó đo mất mát trên dữ liệu mới, còn $F$ là đại lượng tính được, vì nó chỉ dùng $n$ mẫu đã có. Định nghĩa 06.1 viết Định nghĩa 05.5 và 05c.51 với tham số $\theta$ và dãy lặp $\theta_k$.

Mất mát mặc định của bài là mất mát bình phương $\ell(f,y)=\tfrac12(f-y)^2$. Mất mát logistic của Bài 05 cũng lồi theo $f$.

::: remark Nhận xét 06.2 (Đối chiếu ký hiệu với các bài trước)
1. Bài 05 viết đầu vào thô là $u\in\mathbb R^{d_0}$, vector đặc trưng là $x=\varphi(u)\in\mathbb R^d$ và dãy lặp là $w_k$. Ở Bài 06, $d$ ứng với $d_0$, và mô hình tuyến tính $w^\top x+c$ có $p=d+1$ tham số; các đối chiếu khác ghi trong bảng ký hiệu.
2. Bài 05b viết dãy lặp là $x_k\in\mathbb R^n$, hàm mục tiêu là $f$ và số mẫu là $N$. Khi dẫn một định lý của Bài 05b, $x_k$ đọc là $\theta_k$, $f$ đọc là $F$, số chiều $n$ đọc là $p$ và $N$ đọc là $n$.
3. Bài 05c viết rủi ro thực nghiệm là $J$, số mẫu là $N$ và số chiều tham số là $d$; ở đây là $F$, $n$ và $p$.
4. Chữ $b$ không có chỉ số luôn là kích thước lô nhỏ. Độ chệch của mạng luôn có chỉ số, $b_1$ và $b_2$.
5. Chữ $\sigma$ là hàm kích hoạt của mạng; Bài 05 dùng $\sigma$ cho hàm sigmoid. Chặn phương sai của gradient ngẫu nhiên viết là $\tau^2$, như Bài 05; Bài 05b, 05c viết đại lượng này là $\sigma^2$, và Bài 05c viết phương sai của mất mát là $\sigma_\ell^2(\theta)$, ở đây là $V(\theta)$.
:::

Ngoài hai giới hạn chi phí và biểu diễn, Bài 05 cho thấy $F$ chỉ ước lượng $R$ (Ví dụ 05.4), nên đích của huấn luyện là $R$ nhỏ chứ không phải cực tiểu chính xác của $F$ như trong khung lồi tất định của Bài 01–04. Thay gradient đầy đủ bằng gradient trên một lô nhỏ mẫu chọn ngẫu nhiên cho hạ gradient ngẫu nhiên, với chi phí mỗi bước không phụ thuộc $n$, đổi lại gradient có nhiễu.

## 2. Ký hiệu và giả thiết

Vô hướng và vector viết chữ thường, ma trận chữ hoa, không in đậm; chuẩn là chuẩn Euclid; $\log$ là logarit tự nhiên. Ký hiệu chỉ dùng trong một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $(x_i,y_i)$, $n$, $d$ | mẫu thứ $i$ gồm đầu vào và nhãn; số mẫu huấn luyện; số chiều đầu vào (Bài 05 viết $d_0$) | $x_i\in\mathbb R^d$, $y_i\in\mathbb R$ hoặc $\{-1,+1\}$; $n\ge1$ |
| $f(x;\theta)$, $\theta$, $p$ | mô hình, vector tham số, số tham số | $\theta\in\mathbb R^p$ |
| $w$, $c$ | trọng số và hệ số chặn (intercept) của mô hình tuyến tính $w^\top x+c$; Bài 05 viết hệ số chặn là $w_0$ | $\mathbb R^d$; $\mathbb R$ |
| $\ell$, $\ell_i(\theta)$ | mất mát, mặc định $\ell(f,y)=\tfrac12(f-y)^2$; mất mát trên mẫu $i$ | $\ell_i:\mathbb R^p\to\mathbb R$ |
| $F$, $R$ | rủi ro thực nghiệm $\tfrac1n\sum_i\ell_i$; rủi ro kỳ vọng | $\mathbb R^p\to\mathbb R$ |
| $m$ | số đơn vị ẩn (hidden unit) của mạng hai tầng | $m\ge1$ |
| $W_1$, $b_1$, $w_2$, $b_2$ | tham số tầng ẩn và tầng ra; $b_1$, $b_2$ là độ chệch (bias) | $\mathbb R^{m\times d}$, $\mathbb R^m$, $\mathbb R^m$, $\mathbb R$ |
| $\sigma$ | hàm kích hoạt (activation function) áp theo từng thành phần, mặc định $\sigma(z)=\max\{0,z\}$ | $\mathbb R\to\mathbb R$ |
| $z$, $h$ | tiền kích hoạt $W_1x+b_1$; kích hoạt $\sigma(z)$ | $\mathbb R^m$ |
| $e$, $\delta_h$, $\delta_z$ | sai số dự đoán $f-y$; đạo hàm của $\ell$ theo $h$ và theo $z$ | $\mathbb R$; $\mathbb R^m$ |
| $\theta_k$, $\eta$, $\eta_k$, $K$ | điểm lặp; bước hằng; bước tại bước lặp $k$; số bước | $\mathbb R^p$; $\eta,\eta_k>0$; $K\ge1$ |
| $b$, $B_k$ | kích thước lô nhỏ; lô chỉ số dùng ở bước $k$ | $1\le b\le n$; $B_k\subseteq\{1,\ldots,n\}$ |
| $\widehat g$, $\widehat g_k$ | gradient lô nhỏ $\tfrac1b\sum_{i\in B}\nabla\ell_i$ | $\mathbb R^p$ |
| $\mathcal F_k$ | lịch sử trước bước $k$, gồm $\theta_0$ và $B_0,\ldots,B_{k-1}$ | — |
| $\Sigma(\theta)$ | hiệp phương sai của gradient một mẫu chọn đều | ma trận $p\times p$ nửa xác định dương |
| $\tau^2$, $\tau_1^2$, $G^2$ | chặn phương sai của gradient ngẫu nhiên (H6b); chặn phương sai tổng của gradient một mẫu; chặn mômen bậc hai (H6a) | $\ge0$ |
| $L$, $\mu$, $\kappa$ | hằng số Lipschitz của $\nabla F$ (hằng số trơn); hằng số lồi mạnh; số điều kiện $\kappa=L/\mu$ | $0<\mu\le L$; $\kappa\ge1$ |
| $F_{\inf}$, $\Delta_0$ | cận dưới đúng của $F$; $F(\theta_0)-F_{\inf}$ | $\mathbb R$; $\ge0$ |
| $\theta^*$, $D$ | một điểm cực tiểu; $\lVert\theta_0-\theta^*\rVert$ | $\mathbb R^p$; $\ge0$ |
| $\mathcal B$ | tổng ngân sách tính bằng số gradient mẫu | $\mathcal B>0$ |
| $T$, $r$ | chu kỳ đánh giá trên tập xác thực; ngưỡng kiên nhẫn (patience) của dừng sớm | số nguyên $\ge1$ |
| $\lambda$ | hệ số chính quy hóa bậc hai (quadratic regularization, $\ell_2$ regularization, weight decay) | $\lambda>0$ |
| $\alpha_j$, $\xi_j$ | trị riêng và vector riêng trực chuẩn của Hessian của mục tiêu toàn phương (Bài 05 viết $s_j$, $v_j$) | $\alpha_j>0$ |

Các giả thiết có tên theo Định nghĩa 05b.5 và 05b.31 gồm:

- **(H0) Bị chặn dưới.** $F$ khả vi và $F_{\inf}=\inf_\theta F(\theta)>-\infty$.
- **(H2) Gradient Lipschitz.** $\lVert\nabla F(\theta)-\nabla F(\theta')\rVert\le L\lVert\theta-\theta'\rVert$ với mọi $\theta,\theta'$ thuộc một tập lồi $C$ chứa mọi điểm lặp có thể; Định nghĩa 05b.5 lấy $C=\mathbb R^p$.
- **(H3) Lồi mạnh.** $F(\theta')\ge F(\theta)+\nabla F(\theta)^\top(\theta'-\theta)+\tfrac\mu2\lVert\theta'-\theta\rVert^2$ với mọi $\theta,\theta'$, với $\mu>0$.
- **(H4) Có điểm cực tiểu.** Tồn tại $\theta^*$ với $F(\theta^*)=F_{\inf}$.
- **(H6) Không chệch.** $\mathbb E[g_k\mid\mathcal F_k]=\nabla F(\theta_k)$ với mọi $k\ge0$, với $g_k$ của Định nghĩa 06.1.
- **(H6a) Chặn mômen bậc hai.** $\mathbb E\bigl[\lVert g_k\rVert^2\mid\mathcal F_k\bigr]\le G^2$ với mọi $k\ge0$.
- **(H6b) Chặn phương sai.** $\mathbb E\bigl[\lVert g_k-\nabla F(\theta_k)\rVert^2\mid\mathcal F_k\bigr]\le\tau^2$ với mọi $k\ge0$.

Khi biết $\mathcal F_k$, điểm $\theta_k$ hoàn toàn xác định. (H6a) chặn cả phần tín hiệu $\nabla F(\theta_k)$ của $g_k$, còn (H6b) chỉ chặn phần nhiễu quanh tín hiệu. Dưới (H6), hai đại lượng nối với nhau bằng đẳng thức tách phương sai (Bổ đề 05b.32)

$$
\begin{aligned}
&\mathbb E\bigl[\lVert g_k\rVert^2\mid\mathcal F_k\bigr]\\
&\quad=\lVert\nabla F(\theta_k)\rVert^2\\
&\qquad+\mathbb E\bigl[\lVert g_k-\nabla F(\theta_k)\rVert^2\mid\mathcal F_k\bigr].
\end{aligned}
$$

## 3. Ví dụ xuyên suốt: XOR, mạng tuyến tính một đơn vị, bốn điểm và ba quan sát

Bài dùng bốn bộ dữ liệu, bao gồm:

- **Dữ liệu XOR.** Bốn đầu vào $(0,0)$, $(0,1)$, $(1,0)$, $(1,1)$ với nhãn $y=0,1,1,0$; khi cần nhãn $\pm1$, $y_\pm=2y-1$.
- **Mạng tuyến tính một đơn vị.** Mô hình $f=v\,u\,x$ với tham số $(u,v)\in\mathbb R^2$, một mẫu $x=1$, $y=1$ và mất mát bình phương, nên $F(u,v)=\tfrac12(uv-1)^2$; Tình huống 04.3 xét cùng hàm với hai biến $(a,b)$.
- **Dữ liệu bốn điểm.** $x=(-1,0,1,2)$, $y=(1,0,1,4)$, mô hình $f(x;w,c)=wx+c$, $\theta=(w,c)$, $F(\theta)=\tfrac14\sum_i\tfrac12(wx_i+c-y_i)^2$, với điểm cực tiểu $\theta^*=(1,1)$ và $F^*=\tfrac12$.
- **Ví dụ ba quan sát** (ví dụ xuyên suốt A của Bài 05b). $y=(-1,1,3)$, tham số $\theta\in\mathbb R$, $F(\theta)=\tfrac16\sum_{i=1}^3(\theta-y_i)^2=\tfrac12(\theta-1)^2+\tfrac43$; gradient một mẫu $\theta-y_I$ với $I$ đều trên $\{1,2,3\}$.

## 4. Biểu diễn phi tuyến và mạng hai tầng

Bài toán XOR (phép "hoặc loại trừ") nhận hai bit và trả về $1$ khi đúng một bit bằng $1$. Bốn điểm của dữ liệu XOR vừa là toàn bộ dữ liệu huấn luyện vừa là toàn bộ miền quan tâm, nên câu hỏi tổng quát hóa không đặt ra (Goodfellow và cộng sự 2016, §6.1). Câu hỏi duy nhất là một lớp mô hình có chứa một hàm khớp đúng bốn điểm hay không.

Với điểm số affine, Mệnh đề 05.38 cho câu trả lời phủ định. Để vượt qua giới hạn này mà không liệt kê đặc trưng, chúng ta cần một mô hình tự học phép biến đổi đặc trưng, và cần biết mô hình đó thay đổi bài toán tối ưu ra sao.

![Bốn đỉnh của hình vuông đơn vị trên mặt phẳng x₁, x₂. Hai điểm (0, 0) và (1, 1) có nhãn y = 0, vẽ bằng ô vuông rỗng; hai điểm (0, 1) và (1, 0) có nhãn y = 1, vẽ bằng hình tròn đặc. Hai lớp nằm trên hai đường chéo của hình vuông.](img/lec-06/xor-points.svg)

Hai lớp nằm trên hai đường chéo của hình vuông đơn vị. Một đường thẳng chia mặt phẳng thành hai nửa; muốn phân lớp đúng, nó phải để hai đầu của một đường chéo ở cùng một phía và hai đầu của đường chéo kia ở phía còn lại.

### 4.1. Giới hạn của mô hình tuyến tính trên XOR

Trước khi phát biểu tổng quát, ta thử mô hình tuyến tính tốt nhất theo nghĩa bình phương nhỏ nhất. Mô hình là $f(x;w,c)=w^\top x+c$ với $w\in\mathbb R^2$, $c\in\mathbb R$, và một đầu vào được xếp vào lớp $1$ khi $f>\tfrac12$, trung điểm của hai nhãn.

::: example Ví dụ 06.1 (Bình phương nhỏ nhất affine trên XOR)
**Dữ kiện.** Dữ liệu XOR với nhãn $y=(0,1,1,0)$; mô hình $f(x;w,c)=w_1x_1+w_2x_2+c$; rủi ro thực nghiệm $F(w,c)=\tfrac14\sum_{i=1}^4\tfrac12\bigl(f(x_i)-y_i\bigr)^2$.

**Phương trình chuẩn.** Ma trận thiết kế $A$ có các hàng $(x_1,x_2,1)$, tức $(0,0,1)$, $(0,1,1)$, $(1,0,1)$, $(1,1,1)$. Điểm cực tiểu của $F$ là nghiệm của $A^\top A\,(w_1,w_2,c)^\top=A^\top y$, với

$$
\begin{aligned}
A^\top A&=\begin{pmatrix}2&1&2\\1&2&2\\2&2&4\end{pmatrix},\\
A^\top y&=\begin{pmatrix}1\\1\\2\end{pmatrix}.
\end{aligned}
$$

**Nghiệm.** Thế $(w_1,w_2,c)=(0,0,\tfrac12)$: hàng thứ nhất cho $0+0+1=1$, hàng thứ hai cho $0+0+1=1$, hàng thứ ba cho $0+0+2=2$. Ma trận $A^\top A$ có định thức $2(8-4)-1(4-4)+2(2-4)=4\ne0$, nên đây là nghiệm duy nhất.

**Giá trị mục tiêu.** Mô hình trả về $\tfrac12$ tại mọi đầu vào, phần dư bằng $\pm\tfrac12$ tại cả bốn điểm, nên

$$
F=\frac14\cdot4\cdot\frac12\cdot\frac14=\frac18 .
$$

**Diễn giải.** Mô hình tuyến tính tốt nhất theo bình phương nhỏ nhất cho cùng một dự đoán ở mọi đầu vào, đúng bằng ngưỡng $\tfrac12$, nên không phân biệt được hai lớp.

**Kiểm tra lại.** Tổng nhãn bằng $2$ trên bốn mẫu, nên một hằng số tối ưu là trung bình nhãn $\tfrac12$; nghiệm tìm được chính là hằng số đó với $w=0$.
:::

Để loại mọi bộ $(w,c)$, ta dùng nhãn $y_\pm=2y-1$, bằng $+1$ tại $(0,1)$, $(1,0)$ và $-1$ tại $(0,0)$, $(1,1)$, và điểm số $g=f-\tfrac12$. Phân lớp đúng bằng ngưỡng $\tfrac12$ nghĩa là $y_{\pm,i}\,g(x_i)>0$ tại mọi $i$, tức dữ liệu tách được tuyến tính theo Định nghĩa 05.20 với vector đặc trưng $(1,x_1,x_2)$, trong đó hệ số $w_0$ của Bài 05 đóng vai hệ số chặn $c-\tfrac12$. Theo Mệnh đề 05.38(1), không bộ $(w,c)$ nào như vậy tồn tại.

Mệnh đề 05.38(2) tách XOR bằng đặc trưng thêm $x_1x_2$. Cách sửa này cần biết trước dạng tương tác. Khi không biết, phải thêm mọi đơn thức tới một bậc $q$. Theo Mệnh đề 05.39, với $d=1000$ biến và $q=2$, mô hình có $p=\binom{1002}2=501\,501$ tham số, nên riêng phần giải hệ của một bước Newton cần khoảng $p^3\approx1{,}26\cdot10^{17}$ phép tính.

### 4.2. Phép biến đổi đặc trưng bằng tầng ẩn

Về mặt ý tưởng, thay vì cố định ánh xạ đặc trưng $\varphi$ như Bài 05, ta muốn mỗi đặc trưng là một hàm đơn giản của một tổ hợp affine của đầu vào, với hệ số của tổ hợp là tham số. Để làm rõ ý tưởng này, xem ví dụ sau.

::: example Ví dụ 06.2 (Hai đặc trưng chỉnh lưu cho XOR)
**Dữ kiện.** Dữ liệu XOR; hai đặc trưng $h_1=\max\{0,x_1-x_2\}$ và $h_2=\max\{0,x_2-x_1\}$.

**Ảnh của bốn điểm.**

| $x$ | $x_1-x_2$ | $h=(h_1,h_2)$ | $h_1+h_2$ | $y$ |
|---|---:|---|---:|---:|
| $(0,0)$ | $0$ | $(0,0)$ | $0$ | $0$ |
| $(0,1)$ | $-1$ | $(0,1)$ | $1$ | $1$ |
| $(1,0)$ | $1$ | $(1,0)$ | $1$ | $1$ |
| $(1,1)$ | $0$ | $(0,0)$ | $0$ | $0$ |

**Tách trong không gian $h$.** Đường thẳng $h_1+h_2=\tfrac12$ tách gốc, ảnh của hai điểm lớp $0$, khỏi hai điểm $(1,0)$ và $(0,1)$, ảnh của hai điểm lớp $1$.

**Kiểm tra lại.** Với $g(h)=h_1+h_2-\tfrac12$ và $y_\pm=2y-1$: tại lớp $0$, $y_\pm g=(-1)(-\tfrac12)=\tfrac12>0$; tại lớp $1$, $y_\pm g=(+1)(\tfrac12)=\tfrac12>0$.
:::

![Hai khung. Khung thứ nhất: bốn điểm XOR trong không gian đầu vào, hai lớp nằm trên hai đường chéo. Khung thứ hai: ảnh qua h₁ = max(0, x₁ − x₂), h₂ = max(0, x₂ − x₁). Hai điểm lớp 0, (0, 0) và (1, 1), cùng đi tới gốc; điểm (1, 0) đi tới (1, 0); điểm (0, 1) đi tới (0, 1). Đường nét đứt h₁ + h₂ = ½ tách gốc khỏi hai điểm lớp 1.](img/lec-06/xor-feature-map.svg)

Phép biến đổi gộp hai điểm lớp $0$ vào cùng một điểm. Vì $h$ không affine theo $x$, đẳng thức $g(1,0)+g(0,1)=g(0,0)+g(1,1)$ trong chứng minh Mệnh đề 05.38 không còn ràng buộc các ảnh. Goodfellow và cộng sự (2016, Hình 6.1) dùng một phép biến đổi khác với cùng ý tưởng: học một không gian đặc trưng trong đó bài toán trở thành tuyến tính.

Phép gộp này cần hàm $\max\{0,\cdot\}$, vì theo mệnh đề sau, không phép biến đổi affine nào làm được việc của Ví dụ 06.2, dù chọn bao nhiêu đặc trưng.

::: proposition Mệnh đề 06.3 (Đặc trưng affine không làm XOR tách được) — chứng minh đầy đủ
**Giả thiết.** $\varphi(x)=Ax+a$ với $A\in\mathbb R^{m\times2}$, $a\in\mathbb R^m$, $m\ge1$ tùy ý; dữ liệu XOR với nhãn $y_\pm=2y-1$.

**Kết luận.** Không có $\bar w\in\mathbb R^m$ và hệ số chặn $\bar c\in\mathbb R$ để $y_{\pm,i}\bigl(\bar w^\top\varphi(x_i)+\bar c\bigr)>0$ với mọi $i$.
:::

::: proof Chứng minh Mệnh đề 06.3
**Lộ trình.** Hợp của hai ánh xạ affine là affine, nên mọi bộ tách trong không gian ảnh cho một điểm số affine tách bốn điểm XOR.

Giả sử có $\bar w$, $\bar c$ như vậy, và đặt $g(h)=\bar w^\top h+\bar c$. Hàm hợp

$$
\begin{aligned}
&x\mapsto g(\varphi(x))\\
&\quad=\bar w^\top(Ax+a)+\bar c\\
&\quad=(A^\top\bar w)^\top x+(\bar w^\top a+\bar c)
\end{aligned}
$$

là một điểm số affine theo $(x_1,x_2)$ và có cùng dấu với $g$ tại mỗi điểm XOR. Khi đó nó tách bốn điểm XOR, trái với Mệnh đề 05.38(1). $\square$
:::

Như vậy, một đặc trưng học được phải chứa một hàm phi tuyến. Goodfellow và cộng sự (2016, §6.3, tr. 191) gọi hàm $\max\{0,z\}$ là lựa chọn mặc định tốt cho đơn vị ẩn; ta cũng dùng nó làm hàm kích hoạt mặc định.

### 4.3. Mạng hai tầng

Ghép các đặc trưng có tham số với một tầng tuyến tính ở đầu ra, ta được lớp mô hình sau.

::: definition Định nghĩa 06.4 (Mạng nơ-ron hai tầng; two-layer neural network)
Cho các số nguyên dương $d$ (số đầu vào) và $m$ (số đơn vị ẩn của *tầng ẩn*, hidden layer), ma trận trọng số $W_1\in\mathbb R^{m\times d}$, vector độ chệch $b_1\in\mathbb R^m$, vector trọng số tầng ra $w_2\in\mathbb R^m$, độ chệch tầng ra $b_2\in\mathbb R$ và một hàm $\sigma:\mathbb R\to\mathbb R$, áp theo từng thành phần khi đối số là vector.

*Mạng hai tầng* là hàm

$$
\begin{aligned}
&f(x;\theta)\\
&=w_2^\top\sigma(W_1x+b_1)+b_2,\\
&x\in\mathbb R^d,
\end{aligned}
\tag{4.1}
$$

với tham số $\theta=(W_1,b_1,w_2,b_2)\in\mathbb R^p$, $p=md+2m+1$.

*Tiền kích hoạt* (pre-activation) là $z=W_1x+b_1\in\mathbb R^m$; *kích hoạt* (activation) là $h=\sigma(z)\in\mathbb R^m$; $\sigma$ là *hàm kích hoạt*. Phép tính lần lượt $z$, $h$, $f$ gọi là *truyền xuôi* (forward pass).

*Hàm tuyến tính chỉnh lưu* (rectified linear unit, ReLU) là $\sigma(z)=\max\{0,z\}$; nó khả vi tại mọi $z\ne0$, và $z=0$ là *điểm gãy*.
:::

Trong định nghĩa trên, hàng thứ $j$ của $W_1$ cùng phần tử thứ $j$ của $b_1$ xác định đơn vị ẩn thứ $j$: đơn vị này tính $z_j=[W_1]_{j,:}x+[b_1]_j$ rồi $h_j=\sigma(z_j)$. Đầu ra là một tổ hợp tuyến tính của $m$ đặc trưng $h_j$ cộng độ chệch.

![Sơ đồ mạng 2–2–1. Hai nút đầu vào x₁, x₂ nối tới hai đơn vị ẩn qua trọng số W₁ và độ chệch b₁; mỗi đơn vị ẩn tính tiền kích hoạt z và kích hoạt h = σ(z). Hai đơn vị ẩn nối tới đầu ra f = w₂ᵀh + b₂.](img/lec-06/two-layer-network.svg)

Sơ đồ ứng với trường hợp $d=m=2$: mỗi mũi tên từ đầu vào tới đơn vị ẩn mang một phần tử của $W_1$, mỗi mũi tên từ đơn vị ẩn tới đầu ra mang một phần tử của $w_2$.

Mạng hai tầng chứa mô hình tuyến tính: lấy $m=1$, $\sigma(z)=z$, ta được lại $w^\top x+c$. Nó cũng chứa mọi mô hình tuyến tính theo một đặc trưng dạng $\sigma(\text{affine})$, như Ví dụ 06.2. Điểm khác với đặc trưng thủ công là các hệ số bên trong $\sigma$ nay là tham số cần học.

::: example Ví dụ 06.3 (Mạng hai đơn vị ẩn biểu diễn XOR)
**Dữ kiện.** Dữ liệu XOR với nhãn $y=(0,1,1,0)$; mạng hai tầng với $d=m=2$, $\sigma(z)=\max\{0,z\}$ và tham số $\theta_A$:

$$
\begin{aligned}
&W_1=\begin{pmatrix}1&-1\\-1&1\end{pmatrix},\\
&b_1=\begin{pmatrix}0\\0\end{pmatrix},\quad w_2=\begin{pmatrix}1\\1\end{pmatrix},\\
&b_2=0.
\end{aligned}
$$

**Truyền xuôi.** Hai hàng của $W_1$ cho $z_1=x_1-x_2$ và $z_2=x_2-x_1$, nên $h_1$, $h_2$ chính là hai đặc trưng của Ví dụ 06.2 và $f=h_1+h_2=\lvert x_1-x_2\rvert$.

| $x$ | $z$ | $h$ | $f$ | $y$ |
|---|---|---|---:|---:|
| $(0,0)$ | $(0,0)$ | $(0,0)$ | $0$ | $0$ |
| $(0,1)$ | $(-1,1)$ | $(0,1)$ | $1$ | $1$ |
| $(1,0)$ | $(1,-1)$ | $(1,0)$ | $1$ | $1$ |
| $(1,1)$ | $(0,0)$ | $(0,0)$ | $0$ | $0$ |

**Kết luận.** $f(x;\theta_A)=y$ tại cả bốn điểm, nên với mất mát bình phương, $F(\theta_A)=0$, giá trị nhỏ nhất có thể của $F$.

**Kiểm tra lại.** Tại $(1,0)$: $z=(1-0,\,0-1)=(1,-1)$, $h=(1,0)$, $f=1\cdot1+1\cdot0+0=1=y$. Tại $(0,0)$ và $(1,1)$, cả hai tiền kích hoạt bằng $0$, tức nằm đúng *điểm gãy* (kink); giá trị $\sigma(0)=0$ vẫn xác định, chỉ đạo hàm tại đó cần một quy ước.
:::

Ví dụ 06.3 cho thấy mạng hai tầng biểu diễn được XOR. Với $\sigma(z)=z$, mạng rơi vào trường hợp của Mệnh đề 06.3.

::: corollary Hệ quả 06.5 (Mạng với kích hoạt tuyến tính là hàm affine) — chứng minh đầy đủ
**Giả thiết.** Mạng hai tầng (4.1) với $\sigma(z)=z$.

**Kết luận.** Với mọi $\theta$,

$$
\begin{aligned}
f(x;\theta)&=(W_1^\top w_2)^\top x\\
&\quad+(w_2^\top b_1+b_2),
\end{aligned}
$$

là một hàm affine của $x$. Đặc biệt, khi $d=2$, không mạng nào như vậy phân lớp đúng bốn điểm XOR bằng ngưỡng $\tfrac12$.
:::

::: proof Chứng minh Hệ quả 06.5
**Lộ trình.** Khai triển $f$, rồi áp Mệnh đề 06.3 cho tầng ẩn affine.

**Bước 1 (khai triển).** Với $\sigma(z)=z$, $f=w_2^\top(W_1x+b_1)+b_2=(w_2^\top W_1)x+w_2^\top b_1+b_2$, và $w_2^\top W_1=(W_1^\top w_2)^\top$.

**Bước 2 (XOR).** Tầng ẩn $h=W_1x+b_1$ là một ánh xạ affine $\varphi$, và $f-\tfrac12=w_2^\top h+(b_2-\tfrac12)$. Nếu mạng phân lớp đúng bằng ngưỡng $\tfrac12$ thì $\bar w=w_2$, $\bar c=b_2-\tfrac12$ tách các ảnh $\varphi(x_i)$, trái với Mệnh đề 06.3. $\square$
:::

Với tham số $\theta_A$ của Ví dụ 06.3 và $\sigma(z)=z$, ta có $W_1^\top w_2=(1-1,\,-1+1)=(0,0)$ và $w_2^\top b_1+b_2=0$, nên mạng trả về $0$ tại mọi đầu vào. Như vậy, cùng một bộ tham số biểu diễn đúng XOR với ReLU nhưng thành hàm hằng khi bỏ hàm kích hoạt.

::: example Ví dụ 06.4 (Số tham số của hai mạng)
**Dữ kiện.** Mạng hai tầng với số tham số $p=md+2m+1$.

**Mạng XOR.** $d=m=2$: $p=4+4+1=9$.

**Mạng cho ảnh $28\times28$ điểm ảnh.** $d=784$, $m=100$: $p=78\,400+200+1=78\,601$.

**Kiểm tra lại.** Với $d=784$, $m=100$: $W_1$ có $78\,400$ phần tử, $b_1$ và $w_2$ mỗi vector $100$ phần tử, $b_2$ một phần tử; tổng $78\,601$.
:::

### 4.4. Rủi ro thực nghiệm của mạng và tính không lồi

Với mất mát bình phương, rủi ro thực nghiệm của mạng là

$$
\begin{aligned}
&F(\theta)\\
&\quad=\frac1{2n}\sum_{i=1}^n\bigl(f(x_i;\theta)-y_i\bigr)^2 .
\end{aligned}
\tag{4.2}
$$

Với mô hình tuyến tính $f=w^\top x+c$, mỗi số hạng là hợp của hàm lồi $t\mapsto\tfrac12(t-y_i)^2$ với ánh xạ affine $\theta\mapsto w^\top x_i+c$, nên lồi theo $\theta=(w,c)$ (Định lý 01.30(b)), và $F$ lồi như một tổng không âm của các hàm lồi. Với mạng, $f$ chứa tích của tham số tầng ra $w_2$ với kích hoạt $\sigma(W_1x+b_1)$ của tham số tầng ẩn, nên $\theta\mapsto f(x_i;\theta)$ không affine, và quy tắc hợp thành không áp dụng (Boyd và Vandenberghe 2004, §3.2.2). Để chứng minh $F$ không lồi, ta cần một phản ví dụ, và phản ví dụ đến từ một tính chất đối xứng của mạng.

::: example Ví dụ 06.5 (Đổi chỗ hai đơn vị ẩn)
**Dữ kiện.** Tham số $\theta_A$ của Ví dụ 06.3: $W_1=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, $b_1=(0,0)$, $w_2=(1,1)$, $b_2=0$, với $f(x;\theta_A)=\lvert x_1-x_2\rvert$ trên bốn điểm XOR.

**Đổi chỗ.** Đổi chỗ hai đơn vị ẩn là đổi chỗ đồng thời hai hàng của $W_1$, hai phần tử của $b_1$ và hai phần tử của $w_2$. Vì $b_1$ và $w_2$ có hai phần tử bằng nhau, chỉ $W_1$ đổi, và ta được $\theta_B$:

$$
\begin{aligned}
&W_1=\begin{pmatrix}-1&1\\1&-1\end{pmatrix},\\
&b_1=(0,0),\quad w_2=(1,1),\\
&b_2=0.
\end{aligned}
$$

**Hàm thu được.** Đơn vị ẩn thứ nhất của $\theta_B$ tính $\max\{0,x_2-x_1\}$, đơn vị thứ hai tính $\max\{0,x_1-x_2\}$; tổng vẫn là $\lvert x_1-x_2\rvert$. Vậy $\theta_B\ne\theta_A$ nhưng $f(\cdot;\theta_B)=f(\cdot;\theta_A)$ và $F(\theta_B)=0$.

**Kiểm tra lại.** Tại $(0,1)$: $z=(1,-1)$, $h=(1,0)$, $f=1$, đúng nhãn.
:::

Hiện tượng trong ví dụ không phụ thuộc số liệu: thứ tự đánh số các đơn vị ẩn không ảnh hưởng tới hàm mà mạng tính. Mệnh đề sau phát biểu điều đó cho mọi phép hoán vị.

::: proposition Mệnh đề 06.6 (Đối xứng hoán vị các đơn vị ẩn) — chứng minh đầy đủ
**Giả thiết.** Mạng hai tầng (4.1) với $\sigma$ áp theo từng thành phần; $P\in\mathbb R^{m\times m}$ là một ma trận hoán vị. Ký hiệu $P\theta=(PW_1,Pb_1,Pw_2,b_2)$.

**Kết luận.** Với mọi $x\in\mathbb R^d$, $f(x;P\theta)=f(x;\theta)$. Do đó $F(P\theta)=F(\theta)$ với mọi dữ liệu và mọi hàm mất mát.
:::

::: proof Chứng minh Mệnh đề 06.6
**Lộ trình.** Phép hoán vị đi qua hàm kích hoạt theo từng thành phần, rồi triệt tiêu với chuyển vị của nó ở tầng ra.

**Bước 1 (hoán vị đi qua $\sigma$).** Phép nhân với $P$ chỉ sắp lại thứ tự các thành phần, còn $\sigma$ tác động riêng lên từng thành phần, nên $\sigma(Pz)=P\sigma(z)$ với mọi $z\in\mathbb R^m$.

**Bước 2 (tính đầu ra).** Theo Bước 1 và vì $P^\top P=I$ với ma trận hoán vị,

$$
\begin{aligned}
&f(x;P\theta)\\
&=(Pw_2)^\top\sigma(PW_1x+Pb_1)+b_2\\
&=w_2^\top P^\top P\,\sigma(W_1x+b_1)+b_2\\
&=w_2^\top\sigma(W_1x+b_1)+b_2\\
&=f(x;\theta).
\end{aligned}
$$

**Bước 3 (rủi ro).** $F(\theta)$ chỉ phụ thuộc $\theta$ qua các giá trị $f(x_i;\theta)$, nên $F(P\theta)=F(\theta)$. $\square$
:::

Mệnh đề 06.6 nói rằng ánh xạ $\theta\mapsto f(\cdot;\theta)$ từ tham số tới hàm không đơn ánh. Một mạng có $m$ đơn vị ẩn có $m!$ cách sắp thứ tự các đơn vị; khi các đơn vị có tham số đôi một khác nhau, mỗi điểm $\theta$ có $m!$ bản sao phân biệt cho cùng một hàm. Goodfellow và cộng sự (2016, §8.2.2, tr. 284) gọi hiện tượng này là *đối xứng không gian trọng số* (weight space symmetry).

Từ một cực tiểu toàn cục, đối xứng hoán vị sinh ra một cực tiểu toàn cục khác. Ghép điều này với tính lồi của tập nghiệm (Hệ quả 01.33), ta được một phép kiểm tra tính lồi.

::: proposition Mệnh đề 06.7 (Phép kiểm tra tính lồi bằng đối xứng hoán vị) — chứng minh đầy đủ
**Giả thiết.**

- **Mục tiêu.** $F$ là rủi ro thực nghiệm (4.2) của một mạng hai tầng, đạt cực tiểu toàn cục tại $\theta^*$.
- **Hai đơn vị khác nhau.** Hai đơn vị ẩn $j\ne j'$ của $\theta^*$ có tham số khác nhau, tức $([W_1]_{j,:},[b_1]_j,[w_2]_j)\ne([W_1]_{j',:},[b_1]_{j'},[w_2]_{j'})$.
- **Hoán vị.** $P$ là ma trận hoán vị đổi chỗ $j$ và $j'$.

**Kết luận.**

1. $P\theta^*\ne\theta^*$ và $P\theta^*$ cũng là cực tiểu toàn cục của $F$.
2. Nếu $F$ lồi thì mọi điểm của đoạn $[\theta^*,P\theta^*]$ là cực tiểu toàn cục.
3. Do đó, nếu tồn tại $t\in(0,1)$ với $F\bigl((1-t)\theta^*+tP\theta^*\bigr)>F(\theta^*)$ thì $F$ không lồi.
:::

::: proof Chứng minh Mệnh đề 06.7
**Lộ trình.** Hai cực tiểu toàn cục khác nhau và tính lồi của tập nghiệm buộc cả đoạn nối là tập cực tiểu.

**Bước 1 (kết luận 1).** Theo Mệnh đề 06.6, $F(P\theta^*)=F(\theta^*)=\min F$. Phép đổi chỗ $j$, $j'$ thay các hàng $j$, $j'$ của bộ $(W_1,b_1,w_2)$ cho nhau; vì hai hàng đó khác nhau, $P\theta^*\ne\theta^*$.

**Bước 2 (kết luận 2).** Nếu $F$ lồi, tập nghiệm $\{\theta: F(\theta)=\min F\}$ là tập lồi (Hệ quả 01.33). Tập này chứa $\theta^*$ và $P\theta^*$, nên chứa cả đoạn nối hai điểm.

**Bước 3 (kết luận 3).** Điểm $(1-t)\theta^*+tP\theta^*$ thuộc đoạn nối nhưng có giá trị lớn hơn $\min F$, trái với kết luận 2. Vậy $F$ không lồi. $\square$
:::

Áp phép kiểm tra cho cặp $\theta_A$, $\theta_B=P\theta_A$ của Ví dụ 06.5, ta cần giá trị của $F$ trên đoạn nối hai tham số.

::: example Ví dụ 06.6 (Rủi ro thực nghiệm trên đoạn nối hai cực tiểu đối xứng)
**Dữ kiện.** Bốn điểm XOR với nhãn $y=(0,1,1,0)$; mất mát bình phương; $\theta_A$ có $W_1=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, $\theta_B$ có $W_1=\begin{pmatrix}-1&1\\1&-1\end{pmatrix}$, cả hai có $b_1=(0,0)$, $w_2=(1,1)$, $b_2=0$ và $F(\theta_A)=F(\theta_B)=0$.

**Tham số trên đoạn nối.** Với $t\in[0,1]$, $\theta(t)=(1-t)\theta_A+t\theta_B$ có $b_1$, $w_2$, $b_2$ không đổi và

$$
W_1(t)=(1-2t)\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

**Hàm của mạng.** Với $a=(1-2t)(x_1-x_2)$, tiền kích hoạt là $z=(a,-a)$ và $f=\max\{0,a\}+\max\{0,-a\}=\lvert a\rvert=\lvert1-2t\rvert\,\lvert x_1-x_2\rvert$.

**Rủi ro.** Tại $(0,0)$ và $(1,1)$, $f=0=y$. Tại $(0,1)$ và $(1,0)$, $f=\lvert1-2t\rvert$ và $y=1$, sai số bằng $1-\lvert1-2t\rvert$. Do đó

$$
\begin{aligned}
&F(\theta(t))\\
&\quad=\frac14\cdot2\cdot\frac12\bigl(1-\lvert1-2t\rvert\bigr)^2\\
&\quad=\frac14\bigl(1-\lvert1-2t\rvert\bigr)^2\\
&\quad=\begin{cases}t^2,&0\le t\le\tfrac12,\\(1-t)^2,&\tfrac12\le t\le1.\end{cases}
\end{aligned}
$$

**Kết luận.** Tại $t=\tfrac12$, $W_1=0$, $f\equiv0$ và $F=\tfrac14>0$, trong khi hai đầu mút có $F=0$. Theo Mệnh đề 06.7, $F$ không lồi. Trung điểm $t=\tfrac12$ là điểm của câu hỏi mở đầu.

**Kiểm tra lại.** Tại $t=\tfrac14$, $W_1=\tfrac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, $f(0,1)=\tfrac12$, sai số $\tfrac12$, $F=\tfrac14\cdot2\cdot\tfrac12\cdot\tfrac14=\tfrac1{16}=t^2$.
:::

![Trục hoành t từ 0 đến 1, trục tung F(θ(t)) từ 0 đến 0,3. Đường liền bằng t² trên [0, ½] và (1 − t)² trên [½, 1], đạt đỉnh ¼ tại t = ½, nơi W₁ = 0. Hai đầu mút θ_A (t = 0) và θ_B (t = 1) có F = 0. Dây cung nét đứt nối hai cực tiểu nằm trên trục F = 0, dưới đồ thị, nên F không lồi.](img/lec-06/xor-symmetric-path.svg)

Dây cung nối hai điểm $(t,F)=(0,0)$ và $(1,0)$ của đồ thị nằm dưới đồ thị tại mọi $t\in(0,1)$, trái với định nghĩa hàm lồi (Định nghĩa 01.21), vốn đòi đồ thị nằm dưới dây cung.

::: remark Nhận xét 06.8 (Phạm vi của kết luận không lồi)
1. **Mất mát logistic.** Với nhãn $\pm1$ và mất mát logistic $\log(1+e^{-y_\pm f})$, hai tham số $\theta_A$, $\theta_B$ cho cùng giá trị $F=\tfrac12\bigl(\log2+\log(1+e^{-1})\bigr)\approx\tfrac12(0{,}693+0{,}313)\approx0{,}503$: tại $(0,0)$ và $(1,1)$, $f=0$ cho mất mát $\log2$; tại $(0,1)$ và $(1,0)$, $f=1$ và $y_\pm=1$ cho mất mát $\log(1+e^{-1})$. Trung điểm của chúng cho $f\equiv0$ và $F=\log2\approx0{,}693$, lớn hơn trung bình hai đầu mút, nên $F$ cũng không lồi.
2. **Điều kiện của phép kiểm tra.** Mệnh đề 06.7 cần một cực tiểu toàn cục có hai đơn vị khác nhau; khi mọi cực tiểu toàn cục có các đơn vị trùng nhau, phép kiểm tra không áp dụng.
3. **Nhầm lẫn thường gặp.** "Mất mát lồi theo $f$" không kéo theo "rủi ro lồi theo $\theta$". Tính lồi theo $\theta$ cần $\theta\mapsto f(x_i;\theta)$ affine, điều mạng không thỏa.
:::

**Trong học máy.** Rủi ro thực nghiệm của mọi mạng nơ-ron có đơn vị ẩn đều có đối xứng hoán vị, và ở mạng sâu, mỗi tầng ẩn có $m$ đơn vị cho $m!$ cách sắp thứ tự, nên số cách của cả mạng là tích các số đó theo các tầng (Goodfellow và cộng sự 2016, tr. 284). Vì vậy, cực tiểu toàn cục của mạng không duy nhất. Phép kiểm tra của Mệnh đề 06.7 áp dụng được mỗi khi một cực tiểu toàn cục có hai đơn vị ẩn khác nhau, và bác bỏ tính lồi khi $F$ tại một điểm của đoạn $[\theta^*,P\theta^*]$ lớn hơn $F(\theta^*)$, như ở Ví dụ 06.6.

Hệ quả cho tối ưu là các bảo đảm của Bài 01–04 dựa vào tính lồi, như "điểm dừng là cực tiểu toàn cục" (Hệ quả 01.26), không còn dùng được. Hệ quả cho thực hành là hai lần huấn luyện cùng một mạng có thể cho hai bộ trọng số khác nhau, sai khác một phép hoán vị các đơn vị ẩn, nhưng cùng một hàm dự đoán.

::: exercise Bài tập 06.1 (Mạng một đơn vị với kích hoạt bình phương)
Cho bốn điểm XOR với nhãn $y=(0,1,1,0)$, mất mát bình phương và mạng một đơn vị ẩn $f(x;W_1,b_1,w_2,b_2)=w_2\,\sigma(W_1x+b_1)+b_2$ với $W_1\in\mathbb R^{1\times2}$, $b_1,w_2,b_2\in\mathbb R$ và $\sigma(z)=z^2$.

1. Với $W_1=(1,-1)$, $b_1=0$, $w_2=1$, $b_2=0$, tính $z$, $h$, $f$ tại bốn điểm và $F$.
2. Chứng minh rằng với $\sigma(z)=z^2$, tham số $(-W_1,-b_1,w_2,b_2)$ cho cùng hàm với $(W_1,b_1,w_2,b_2)$.
3. Tính $F$ dọc đoạn nối $W_1=(1,-1)$ và $W_1=(-1,1)$ (các tham số còn lại giữ nguyên), rồi kết luận về tính lồi của $F$.
:::

::: hint
Ở câu 2, dùng $(-z)^2=z^2$. Ở câu 3, viết $W_1(t)=(1-2t)(1,-1)$ và tính $f$ tại hai điểm có nhãn $1$; Mệnh đề 06.7 không áp dụng nguyên văn vì mạng chỉ có một đơn vị, nhưng lập luận ở Bước 2 của chứng minh vẫn dùng được.
:::

::: solution
1. $z=x_1-x_2$ bằng $0,-1,1,0$ tại $(0,0)$, $(0,1)$, $(1,0)$, $(1,1)$; $h=z^2$ bằng $0,1,1,0$; $f=h$ bằng $0,1,1,0$, đúng bằng nhãn. Vậy $F=0$.

2. Với mọi $x$, $\sigma(-W_1x-b_1)=(-(W_1x+b_1))^2=(W_1x+b_1)^2=\sigma(W_1x+b_1)$, nên đầu ra $w_2\sigma(\cdot)+b_2$ không đổi.

3. Với $W_1(t)=(1-2t)(1,-1)$, $f=(1-2t)^2(x_1-x_2)^2$. Tại $(0,0)$ và $(1,1)$, $f=0=y$. Tại $(0,1)$ và $(1,0)$, $f=(1-2t)^2$ và sai số là $1-(1-2t)^2$. Do đó

$$
\begin{aligned}
&F(t)\\
&\quad=\frac14\cdot2\cdot\frac12\bigl(1-(1-2t)^2\bigr)^2\\
&\quad=\frac14\bigl(1-(1-2t)^2\bigr)^2 .
\end{aligned}
$$

Tại $t=\tfrac12$, $F=\tfrac14$; tại $t=\tfrac14$, $F=\tfrac14\cdot(\tfrac34)^2=\tfrac9{64}$. Hai đầu mút là hai cực tiểu toàn cục với $F=0$ (câu 1 và câu 2). Nếu $F$ lồi, tập nghiệm là tập lồi (Hệ quả 01.33) và chứa cả đoạn nối, nhưng $F(\tfrac12)=\tfrac14>0$. Vậy $F$ không lồi.

**Kiểm tra lại.** Ở đây đối xứng là phép đổi dấu, không phải hoán vị: với một đơn vị, Mệnh đề 06.6 chỉ cho phép hoán vị đồng nhất, còn tính chẵn của $\sigma$ sinh ra bản sao $-W_1$.
:::

Như vậy, mạng hai tầng với hàm kích hoạt phi tuyến biểu diễn được XOR, đổi lại rủi ro thực nghiệm của nó không lồi.

## 5. Lan truyền ngược trên đồ thị tính toán

Mọi phương pháp bậc nhất của Bài 04 và Bài 05 cần vector $\nabla F(\theta)\in\mathbb R^p$ ở mỗi bước, và $\nabla F=\tfrac1n\sum_i\nabla\ell_i$ là trung bình của các gradient mẫu. Với mô hình tuyến tính, gradient có công thức đóng; với mạng hai tầng có $p=78\,601$ tham số, chúng ta cần biết một gradient mẫu $\nabla\ell_i(\theta)$ tốn bao nhiêu phép tính. Có hai cách tính: sai phân hữu hạn tính lại truyền xuôi cho từng tọa độ, còn lan truyền ngược dùng lại các giá trị trung gian của một lần truyền xuôi.

### 5.1. Chi phí của sai phân hữu hạn

Cách trực tiếp nhất để xấp xỉ đạo hàm riêng theo tọa độ $j$ là *sai phân hữu hạn* (finite difference): thay đổi riêng tọa độ đó một lượng nhỏ $\varepsilon>0$ rồi tính lại mất mát,

$$
\begin{aligned}
&\frac{\partial\ell}{\partial\theta_j}(\theta)\approx\frac{\ell(\theta+\varepsilon\hat e_j)-\ell(\theta)}{\varepsilon},\\
&j=1,\ldots,p,
\end{aligned}
\tag{5.1}
$$

trong đó $\hat e_j\in\mathbb R^p$ là vector đơn vị thứ $j$, viết có dấu mũ để phân biệt với sai số dự đoán $e$. Mỗi tọa độ cần một lần tính lại $\ell$, tức một lần truyền xuôi, cộng một lần truyền xuôi tại chính $\theta$.

::: example Ví dụ 06.7 (Chi phí sai phân hữu hạn trên mạng cho ảnh)
**Dữ kiện.** Mạng hai tầng với $d=784$, $m=100$, $p=78\,601$ (Ví dụ 06.4); một lần truyền xuôi gồm $W_1x$ ($md$ phép nhân) và $w_2^\top h$ ($m$ phép nhân), tức $md+m=78\,500$ phép nhân, cùng bậc với $p$.

**Đếm.** Công thức (5.1) cần $p+1=78\,602$ lần truyền xuôi. Lấy mỗi lần khoảng $p$ phép nhân–cộng, tổng là $(p+1)p\approx6{,}2\cdot10^9$ phép nhân–cộng cho gradient của một mẫu.

**Diễn giải.** Gradient đầy đủ của $F$ còn nhân thêm $n$. Với $n=60\,000$ ảnh, con số là khoảng $3{,}7\cdot10^{14}$ cho một bước hạ gradient.

**Kiểm tra lại.** $78\,602\cdot78\,601=6\,178\,195\,802\approx6{,}2\cdot10^9$.
:::

Ngoài chi phí, (5.1) còn chịu hai loại sai số (Kupferschmid 2023, §25.6.4, tr. 824). *Sai số chặt cụt* (truncation error), có bậc $\varepsilon$, đến từ việc bỏ số hạng bậc hai của khai triển Taylor; *sai số làm tròn* (roundoff error), có bậc (độ chính xác máy)$/\varepsilon$, đến từ phép trừ hai số gần nhau. *Sai phân trung tâm* (central difference) $\bigl(\ell(\theta+\varepsilon\hat e_j)-\ell(\theta-\varepsilon\hat e_j)\bigr)/(2\varepsilon)$ có sai số chặt cụt bậc $\varepsilon^2$. Với mạng, sai phân hữu hạn vì vậy chỉ dùng để kiểm tra một cài đặt gradient trên vài tọa độ (Goodfellow và cộng sự 2016, §11.5, tr. 439). Chúng ta cần một cách tính gradient chính xác của một mẫu với chi phí cùng bậc một lần truyền xuôi, tức $O(p)$ thay vì $O(p^2)$.

### 5.2. Đồ thị tính toán và truyền xuôi

Ở mỗi lần truyền xuôi của (5.1), mọi đại lượng không đổi đều được tính lại từ đầu. Để dùng lại các đại lượng đó, ta tổ chức phép tính thành một đồ thị.

::: definition Định nghĩa 06.9 (Đồ thị tính toán)
Một *đồ thị tính toán* của một hàm là một đồ thị có hướng không chu trình, trong đó mỗi nút là một đại lượng (vô hướng, vector hoặc ma trận) và mỗi nút không phải đầu vào được tính từ các nút cha của nó bằng một phép toán đã biết, gọi là *phép toán cục bộ* của nút.

Với mạng hai tầng (4.1), một mẫu $(x,y)$ và mất mát $\ell(f,y)$, đồ thị gồm chuỗi nút

$$
\begin{aligned}
&x\ \to\ z=W_1x+b_1\\
&\quad\to\ h=\sigma(z)\\
&\quad\to\ f=w_2^\top h+b_2\\
&\quad\to\ \ell=\ell(f,y),
\end{aligned}
$$

cùng các nút tham số $W_1$, $b_1$ đi vào $z$, các nút $w_2$, $b_2$ đi vào $f$ và nút nhãn $y$ đi vào $\ell$.
:::

Định nghĩa 06.9 theo cách trình bày của Goodfellow và cộng sự (2016, §6.5.1). Đồ thị ghi lại thứ tự phép tính và các đại lượng trung gian, không thêm phép tính nào. Truyền xuôi đi theo chiều cạnh của đồ thị và lưu giá trị của mọi nút, như ví dụ sau.

::: example Ví dụ 06.8 (Truyền xuôi một mẫu)
**Dữ kiện.** Mẫu $x=(1,1)$, $y=0$; mất mát $\ell=\tfrac12(f-y)^2$; $\sigma(z)=\max\{0,z\}$; tham số

$$
\begin{aligned}
&W_1=\begin{pmatrix}1&\tfrac12\\\tfrac12&-1\end{pmatrix},\\
&b_1=\begin{pmatrix}-\tfrac12\\1\end{pmatrix},\\
&w_2=\begin{pmatrix}1\\-2\end{pmatrix},\quad b_2=\tfrac12 .
\end{aligned}
$$

**Tính từng nút.**

$$
\begin{aligned}
z_1&=1\cdot1+\tfrac12\cdot1-\tfrac12=1,\\
z_2&=\tfrac12\cdot1-1\cdot1+1=\tfrac12,\\
h&=\sigma(z)=(1,\tfrac12),\\
f&=1\cdot1-2\cdot\tfrac12+\tfrac12=\tfrac12,\\
\ell&=\tfrac12\bigl(\tfrac12-0\bigr)^2=\tfrac18 .
\end{aligned}
$$

**Kiểm tra lại.** Cả hai đơn vị ẩn *hoạt động* (active), tức $z_j>0$, nên $h=z$ và $f=h_1-2h_2+\tfrac12=1-1+\tfrac12=\tfrac12$; ví dụ không rơi vào điểm gãy.
:::

![Chuỗi nút x → z → h → f → ℓ; các tham số W₁, b₁ đi vào z, w₂, b₂ đi vào f, nhãn y đi vào ℓ. Giá trị truyền xuôi với x = (1, 1), y = 0: z = (1, ½), h = (1, ½), f = ½, ℓ = ⅛. Dưới mỗi cạnh ghi phép toán: W₁x + b₁, σ, w₂ᵀh + b₂, ½(f − y)².](img/lec-06/backprop-forward.svg)

Các giá trị $z$ và $h$ phải được lưu: *bước ngược* (backward pass), tức phép tính đạo hàm theo chiều ngược của đồ thị, cần $h$ để tính đạo hàm theo $w_2$ và cần $z$ để tính $\sigma'(z)$.

### 5.3. Bước ngược trên ví dụ

Về mặt ý tưởng, ta đi ngược đồ thị từ $\ell$ về các tham số, và tại mỗi nút nhân đạo hàm đã có của nút sau với đạo hàm cục bộ của phép toán tại nút đó. Bổ đề sau viết quy tắc dây chuyền của Định lý 00.35 cho một nút.

::: lemma Bổ đề 06.10 (Bước ngược qua một nút) — chứng minh đầy đủ
**Giả thiết.** $u\in\mathbb R^{d_u}$; $v=g(u)\in\mathbb R^{d_v}$ với $g$ khả vi tại $u$ và Jacobian $J_g(u)\in\mathbb R^{d_v\times d_u}$; $\ell$ phụ thuộc $u$ chỉ qua $v$, tức $\ell=\Phi(v)$ với $\Phi$ khả vi tại $v$. Đặt $\delta_v=\nabla\Phi(v)\in\mathbb R^{d_v}$.

**Kết luận.** $\delta_u:=\nabla_u\ell=J_g(u)^\top\delta_v$. Ba trường hợp riêng:

1. $v=\sigma(u)$ theo từng thành phần ($d_u=d_v$): $\delta_u=\sigma'(u)\odot\delta_v$, với $\odot$ là tích theo thành phần.
2. $v=Mu+\beta$ với $M\in\mathbb R^{d_v\times d_u}$, $\beta\in\mathbb R^{d_v}$: $\delta_u=M^\top\delta_v$, $\nabla_\beta\ell=\delta_v$ và $\nabla_M\ell=\delta_vu^\top$.
3. $v=w^\top u+\beta$ vô hướng ($d_v=1$): $\nabla_u\ell=\delta_v\,w$, $\nabla_w\ell=\delta_v\,u$, $\partial\ell/\partial\beta=\delta_v$.
:::

::: proof Chứng minh Bổ đề 06.10
**Lộ trình.** Áp quy tắc dây chuyền, rồi viết Jacobian cho ba loại phép toán cục bộ.

**Bước 1 (dạng chung).** Quy tắc dây chuyền dạng Jacobian chuyển vị (Định lý 00.35) áp cho $\ell=\Phi\circ g$ cho $\nabla_u\ell=J_g(u)^\top\nabla\Phi(v)$.

**Bước 2 (trường hợp 1).** Với $v_j=\sigma(u_j)$, $\partial v_j/\partial u_k=\sigma'(u_j)$ khi $j=k$ và $0$ khi $j\ne k$, nên $J_g=\operatorname{diag}\sigma'(u)$ và $J_g^\top\delta_v=\sigma'(u)\odot\delta_v$.

**Bước 3 (trường hợp 2).** Theo $u$, Jacobian là $M$. Theo $\beta$, Jacobian là $I$. Theo phần tử $M_{jk}$, chỉ $v_j$ phụ thuộc và $\partial v_j/\partial M_{jk}=u_k$, nên $\partial\ell/\partial M_{jk}=[\delta_v]_ju_k$, tức $\nabla_M\ell=\delta_vu^\top$.

**Bước 4 (trường hợp 3).** Là trường hợp 2 với $d_v=1$ và $M=w^\top$: $\nabla_u\ell=w\,\delta_v$; theo $w$, $\partial v/\partial w_k=u_k$ cho $\nabla_w\ell=\delta_v u$. $\square$
:::

Bổ đề chỉ dùng thông tin cục bộ của một nút: giá trị $u$ từ truyền xuôi và $\delta_v$ từ nút sau. Áp bổ đề lần lượt cho các nút $f$, $h$, $z$ của Ví dụ 06.8, ta được toàn bộ gradient.

::: example Ví dụ 06.9 (Bước ngược trên một mẫu)
**Dữ kiện.** Mạng và mẫu của Ví dụ 06.8: $x=(1,1)$, $y=0$, $W_1=\begin{pmatrix}1&\tfrac12\\\tfrac12&-1\end{pmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$; giá trị đã lưu $z=(1,\tfrac12)$, $h=(1,\tfrac12)$, $f=\tfrac12$, $\ell=\tfrac18$.

**Nút $\ell$.** $e=\partial\ell/\partial f=f-y=\tfrac12$.

**Nút $f=w_2^\top h+b_2$** (Bổ đề 06.10, trường hợp 3).

$$
\begin{aligned}
&\frac{\partial\ell}{\partial b_2}=e=\tfrac12,\\
&\nabla_{w_2}\ell=e\,h=\bigl(\tfrac12,\tfrac14\bigr),\\
&\delta_h=e\,w_2=\bigl(\tfrac12,-1\bigr).
\end{aligned}
$$

**Nút $h=\sigma(z)$** (trường hợp 1). Vì $z>0$ theo cả hai thành phần, $\sigma'(z)=(1,1)$ và $\delta_z=\delta_h\odot\sigma'(z)=(\tfrac12,-1)$.

**Nút $z=W_1x+b_1$** (trường hợp 2).

$$
\begin{aligned}
&\nabla_{W_1}\ell=\delta_zx^\top=\begin{pmatrix}\tfrac12&\tfrac12\\-1&-1\end{pmatrix},\\
&\nabla_{b_1}\ell=\delta_z=\bigl(\tfrac12,-1\bigr).
\end{aligned}
$$

**Chuẩn gradient.** Tổng bình phương chín thành phần là

$$
\begin{aligned}
&\lVert\nabla\ell\rVert^2\\
&\quad=\underbrace{\tfrac14+\tfrac14+1+1}_{W_1}+\underbrace{\tfrac14+1}_{b_1}\\
&\qquad+\underbrace{\tfrac14+\tfrac1{16}}_{w_2}+\underbrace{\tfrac14}_{b_2}\\
&\quad=\frac{69}{16}.
\end{aligned}
$$

**Kiểm tra lại.** Sai phân trung tâm $\bigl(\ell(\theta+\varepsilon\hat e_j)-\ell(\theta-\varepsilon\hat e_j)\bigr)/(2\varepsilon)$ theo phần tử $[W_1]_{22}$ với $\varepsilon=10^{-3}$ cho đúng $-1$. Khi $[W_1]_{22}$ thay đổi $\pm10^{-3}$, $z_2=\tfrac12\pm10^{-3}$ vẫn dương, nên theo riêng tọa độ này $\ell$ là hàm bậc hai, và sai phân trung tâm chính xác với hàm bậc hai. Tính bằng số thực dấu phẩy động, sai khác với $-1$ nhỏ hơn $10^{-13}$.
:::

![Cùng đồ thị x → z → h → f → ℓ, cạnh xuôi vẽ nhạt. Các mũi tên nét đứt chạy theo chiều ngược của đồ thị, mang đạo hàm ngược: e = f − y = ½ tại f, δ_h = e w₂ = (½, −1) tại h, δ_z = δ_h ⊙ σ′(z) = (½, −1) tại z. Hình ghi kèm gradient theo tham số: ∇W₁ = δ_z xᵀ, ∇b₁ = δ_z, ∇w₂ = e h = (½, ¼), ∇b₂ = e = ½.](img/lec-06/backprop-backward.svg)

Mỗi mũi tên nét đứt mang đạo hàm của $\ell$ theo nút mà nó tới. Phép tính ngược tại mỗi nút dùng một kết quả của nút sau và một đại lượng đã có từ truyền xuôi ($h$, $z$ hoặc $x$); không bước nào tính lại truyền xuôi. Đây là lý do lan truyền ngược rẻ hơn (5.1).

### 5.4. Thuật toán lan truyền ngược

Ví dụ 06.9 dùng mất mát bình phương và các giá trị cụ thể; thuật toán sau phát biểu cùng thứ tự tính cho một mất mát khả vi bất kỳ.

::: algorithm Thuật toán 06.11 (Lan truyền ngược cho mạng hai tầng, một mẫu)
**Đầu vào.** Mẫu $(x,y)$; tham số $\theta=(W_1,b_1,w_2,b_2)$; hàm kích hoạt $\sigma$ và đạo hàm $\sigma'$; mất mát $\ell(f,y)$ khả vi theo $f$.

**Đầu ra.** Vector $\bigl(\nabla_{W_1}\ell,\nabla_{b_1}\ell,\nabla_{w_2}\ell,\partial\ell/\partial b_2\bigr)\in\mathbb R^p$.

1. **Truyền xuôi.** Tính $z=W_1x+b_1$, $h=\sigma(z)$, $f=w_2^\top h+b_2$; lưu $z$ và $h$.
2. **Tầng ra.** Tính $e=\partial\ell/\partial f$; đặt $\partial\ell/\partial b_2=e$ và $\nabla_{w_2}\ell=e\,h$.
3. **Tầng ẩn.** Tính $\delta_z=\sigma'(z)\odot(e\,w_2)$. Với ReLU, dùng quy ước $\sigma'(0)=0$.
4. **Tham số tầng ẩn.** Đặt $\nabla_{W_1}\ell=\delta_zx^\top$ và $\nabla_{b_1}\ell=\delta_z$.

**Điều kiện dừng.** Thuật toán chạy một lượt và dừng sau bước 4.

**Chi phí.** $md+m$ phép nhân cho truyền xuôi; với ReLU, $md+2m$ cho bước ngược ($md+3m$ với $\sigma$ tổng quát). **Bộ nhớ.** $z$, $h$ và $x$ của mẫu đang xử lý.
:::

Lan truyền ngược tính gradient; bước cập nhật tham số do hạ gradient hoặc hạ gradient ngẫu nhiên thực hiện, và gradient của $F$ là trung bình của các vector đầu ra trên $n$ mẫu. Mệnh đề sau xác định khi nào đầu ra của Thuật toán 06.11 đúng là gradient.

::: proposition Mệnh đề 06.12 (Tính đúng của lan truyền ngược) — chứng minh đầy đủ
**Giả thiết.** $\ell(\cdot,y)$ khả vi; $\sigma$ khả vi tại mọi thành phần của $z=W_1x+b_1$.

**Kết luận.** Đầu ra của Thuật toán 06.11 bằng $\nabla_\theta\ell\bigl(f(x;\theta),y\bigr)$. Với ReLU, điều kiện trên nghĩa là không tiền kích hoạt nào bằng $0$.
:::

::: proof Chứng minh Mệnh đề 06.12
**Lộ trình.** Áp Bổ đề 06.10 cho ba nút theo thứ tự ngược, rồi ghép các đạo hàm riêng.

**Bước 1 (tầng ra).** $\ell=\ell(f,y)$ với $f=w_2^\top h+b_2$. Bổ đề 06.10, trường hợp 3, với $\delta_v=e=\partial\ell/\partial f$, cho $\partial\ell/\partial b_2=e$, $\nabla_{w_2}\ell=e\,h$ và $\delta_h=e\,w_2$.

**Bước 2 (hàm kích hoạt).** $h=\sigma(z)$ khả vi tại $z$ theo giả thiết. Trường hợp 1 cho $\delta_z=\sigma'(z)\odot\delta_h=\sigma'(z)\odot(e\,w_2)$.

**Bước 3 (tầng ẩn).** $z=W_1x+b_1$ affine theo $(W_1,b_1)$. Trường hợp 2 với $M=W_1$, $u=x$, $\beta=b_1$ cho $\nabla_{W_1}\ell=\delta_zx^\top$ và $\nabla_{b_1}\ell=\delta_z$.

**Bước 4 (ghép).** Mỗi tham số chỉ ảnh hưởng tới $\ell$ qua đúng một nút ($W_1$, $b_1$ qua $z$; $w_2$, $b_2$ qua $f$), nên các đạo hàm riêng ở Bước 1 và Bước 3 là các thành phần của $\nabla_\theta\ell$. $\square$
:::

Với mạng nhiều tầng, cùng quy tắc áp cho mỗi tầng (Goodfellow và cộng sự 2016, §6.5). Tại điểm có tiền kích hoạt bằng $0$, đầu ra là kết quả của quy ước $\sigma'(0)=0$, và nhận xét sau cho thấy nó có thể khác gradient.

::: remark Nhận xét 06.13 (Điểm gãy của ReLU và giả thiết (H2))
ReLU không khả vi tại $0$, và quy ước $\sigma'(0)=0$ gán một giá trị cho đạo hàm tại điểm đó. Hàm $\varrho(z)=\sigma(z)-\sigma(-z)$ bằng $z$ với mọi $z$, nên $\varrho'(0)=1$; lan truyền ngược với quy ước trên trả về $\sigma'(0)\cdot1-\sigma'(0)\cdot(-1)=0$ tại $z=0$. Vậy tại điểm có tiền kích hoạt bằng $0$, vector trả về có thể khác cả gradient lẫn mọi đạo hàm một phía.

Khi tiền kích hoạt $z_j$ của mẫu $i$ đổi dấu, gradient của $\ell_i$ theo hàng $j$ của $(W_1,b_1)$ nhảy một lượng $e_i[w_2]_j(x_i^\top,1)$, với $e_i=\partial\ell/\partial f$ tại mẫu $i$. Do đó, khi các đầu vào $x_i$ đôi một khác nhau, $F$ không khả vi tại tham số có $z_j=0$ tại một mẫu $i$ với $e_i[w_2]_j\ne0$. Tại $\theta_A$ của Ví dụ 06.3, hai mẫu $(0,0)$, $(1,1)$ có tiền kích hoạt bằng $0$ nhưng $e_i=0$, và $F$ vẫn khả vi. Mọi lân cận của một tham số có tiền kích hoạt bằng $0$ chứa tham số có bước nhảy khác $0$ (gần $\theta_A$, chẳng hạn $b_1=(\varepsilon,0)$ với $\varepsilon>0$ nhỏ), nên với mạng ReLU, $F$ không khả vi trên toàn $\mathbb R^p$ như (H0) đòi, và (H2) không đúng trên tập lồi nào có phần trong chứa một tham số có tiền kích hoạt bằng $0$. Các kết quả cần (H2) áp dụng cho mạng tuyến tính và cho mạng có hàm kích hoạt trơn như $\tanh$ hay softplus $\log(1+e^z)$, trên một vùng bị chặn chứa dãy lặp; mạng không thỏa (H3), nên các kết quả cần (H3) áp dụng cho mục tiêu có chính quy hóa bậc hai của mô hình tuyến tính (Định lý 05.26).
:::

### 5.5. Chi phí của lan truyền ngược

Sai phân hữu hạn tốn $O(p^2)$ cho một gradient mẫu. Mệnh đề sau đếm số phép nhân của Thuật toán 06.11.

::: proposition Mệnh đề 06.14 (Chi phí của lan truyền ngược) — chứng minh đầy đủ
**Giả thiết.** Mạng hai tầng với $d$ đầu vào, $m$ đơn vị ẩn, $p=md+2m+1$ tham số; ReLU; đếm phép nhân giữa hai số thực, bỏ phép cộng, phép áp $\sigma$ và phép nhân với $\sigma'(z_j)\in\{0,1\}$, vốn chỉ là phép chọn.

**Kết luận.**

1. Truyền xuôi tốn $md+m$ phép nhân; bước ngược tốn $md+2m$ phép nhân.
2. Một gradient mẫu tốn $O(p)$; gradient đầy đủ của $F$ tốn $O(np)$.
3. Sai phân hữu hạn (5.1) tốn $p+1$ lần truyền xuôi, tức $O(p^2)$ cho một gradient mẫu.
:::

::: proof Chứng minh Mệnh đề 06.14
**Lộ trình.** Đếm phép nhân của từng phép toán cục bộ ở hai chiều, rồi so với $p$.

**Bước 1 (truyền xuôi).** $W_1x$ cần $md$ phép nhân; $w_2^\top h$ cần $m$.

**Bước 2 (bước ngược).** $e\,h$ cần $m$ phép nhân; $e\,w_2$ cần $m$; tích ngoài (outer product) $\delta_zx^\top$ cần $md$; $\nabla_{b_1}\ell=\delta_z$ không cần phép nhân. Tổng $md+2m$.

**Bước 3 (so bậc).** Cả hai số $md+m$ và $md+2m$ không vượt $p=md+2m+1$, nên cả thuật toán tốn $O(p)$. Gradient đầy đủ là trung bình $n$ gradient mẫu, nên tốn $O(np)$. Với (5.1), mỗi trong $p+1$ lần truyền xuôi tốn $md+m\le p$ phép nhân, tổng $O(p^2)$. $\square$
:::

| Phép tính | Số phép nhân | $d=784$, $m=100$ |
|---|---|---:|
| truyền xuôi: $W_1x$, $w_2^\top h$ | $md+m$ | $78\,500$ |
| bước ngược: $e\,h$, $e\,w_2$, $\delta_zx^\top$ | $md+2m$ | $78\,600$ |
| sai phân hữu hạn | $p+1$ lần truyền xuôi | $78\,602$ lần truyền xuôi |

Với mạng cho ảnh, lan truyền ngược, gồm truyền xuôi và bước ngược, tốn khoảng gấp đôi một lần truyền xuôi, còn sai phân hữu hạn tốn gấp khoảng $p=78\,601$ lần. Về bộ nhớ, bước ngược cần $z$, $h$ và đầu vào $x$ của mọi mẫu đang xử lý, tức $2m+d$ số mỗi mẫu, hoặc $m+d$ nếu tính lại $h=\sigma(z)$.

Goodfellow và cộng sự (2016, Thuật toán 6.2, tr. 210) nêu kết luận tổng quát: chi phí lan truyền ngược tỉ lệ với số cạnh của đồ thị và cùng bậc với truyền xuôi; với mạng nhiều tầng đầy đủ, số phép nhân–cộng của mỗi chiều cùng bậc với số trọng số (tr. 220–221).

### 5.6. Một bước hạ gradient trên mạng

Có gradient, ta thực hiện được một bước hạ gradient trên mạng. Ví dụ sau cho thấy cùng một hướng $-\nabla\ell$ có thể làm mất mát giảm hoặc tăng tùy độ dài bước.

::: example Ví dụ 06.10 (Hai độ dài bước trên cùng một hướng)
**Dữ kiện.** Mạng và mẫu của Ví dụ 06.8: $x=(1,1)$, $y=0$, $W_1=\begin{pmatrix}1&\tfrac12\\\tfrac12&-1\end{pmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$, $\ell(\theta)=\tfrac18$. Gradient của Ví dụ 06.9: $\nabla_{W_1}\ell=\begin{pmatrix}\tfrac12&\tfrac12\\-1&-1\end{pmatrix}$, $\nabla_{b_1}\ell=(\tfrac12,-1)$, $\nabla_{w_2}\ell=(\tfrac12,\tfrac14)$, $\partial\ell/\partial b_2=\tfrac12$, $\lVert\nabla\ell\rVert^2=\tfrac{69}{16}$. Bước $\theta^+=\theta-\eta\nabla\ell(\theta)$.

**Bước $\eta=0{,}02$.** Mỗi tham số dịch $0{,}02$ lần đạo hàm tương ứng, chẳng hạn $[W_1]_{11}=1-0{,}02\cdot\tfrac12=0{,}99$ và $[W_1]_{21}=\tfrac12-0{,}02\cdot(-1)=0{,}52$:

$$
\begin{aligned}
&W_1^+=\begin{pmatrix}0{,}99&0{,}49\\0{,}52&-0{,}98\end{pmatrix},\\
&b_1^+=(-0{,}51;\ 1{,}02),\\
&w_2^+=(0{,}99;\ -2{,}005),\\
&b_2^+=0{,}49 .
\end{aligned}
$$

Truyền xuôi lại: $z^+=(0{,}99+0{,}49-0{,}51;\ 0{,}52-0{,}98+1{,}02)=(0{,}97;\ 0{,}56)$, $f^+=0{,}99\cdot0{,}97-2{,}005\cdot0{,}56+0{,}49=0{,}3275$ và $\ell^+=\tfrac12\cdot0{,}3275^2\approx0{,}0536$. Mất mát giảm từ $0{,}125$.

**Bước $\eta=0{,}25$.** Tương tự, $W_1^+=\begin{pmatrix}\tfrac78&\tfrac38\\\tfrac34&-\tfrac34\end{pmatrix}$, $b_1^+=(-\tfrac58,\tfrac54)$, $w_2^+=(\tfrac78,-\tfrac{33}{16})$, $b_2^+=\tfrac38$; $z^+=(\tfrac58,\tfrac54)$ và $f^+=\tfrac78\cdot\tfrac58-\tfrac{33}{16}\cdot\tfrac54+\tfrac38=-\tfrac{53}{32}$, nên $\ell^+=\tfrac{2809}{2048}\approx1{,}372$. Mất mát tăng.

**Đối chiếu với xấp xỉ bậc nhất.** Xấp xỉ bậc nhất dự báo mức giảm $\eta\lVert\nabla\ell\rVert^2$. Với $\eta=0{,}02$, dự báo là $0{,}08625$, còn mức giảm thật là $0{,}125-0{,}0536=0{,}0714$, nhỏ hơn vì số hạng bậc hai. Với $\eta=0{,}25$, xấp xỉ bậc nhất không còn đúng cả về dấu.

**Kiểm tra lại.** Với $\eta=0{,}5$, cùng cách tính cho $\ell^+=\tfrac{3721}{512}\approx7{,}27$; mất mát tăng nhanh theo độ dài bước.
:::

Ví dụ cho thấy độ dài bước an toàn phụ thuộc độ cong của mất mát, tức hằng số Lipschitz của gradient. Khi gradient $L$-Lipschitz, Bổ đề 04.21 bảo đảm mất mát giảm với mọi bước $\eta\le\tfrac1L$.

**Trong học máy.** Các thư viện học sâu cài đặt lan truyền ngược dưới dạng vi phân tự động chế độ ngược (reverse-mode automatic differentiation) trên đồ thị tính toán: người dùng viết truyền xuôi, thư viện ghi đồ thị và áp Bổ đề 06.10 ở mỗi nút. Theo Mệnh đề 06.14, một gradient mẫu tốn khoảng hai lần một truyền xuôi, nên huấn luyện mạng có hàng triệu tham số khả thi. Đổi lại, bộ nhớ cho các kích hoạt tăng theo số mẫu xử lý cùng lúc, nên bộ nhớ chặn trên kích thước lô.

::: exercise Bài tập 06.2 (Lan truyền ngược tại một tham số khớp đúng XOR)
Cho mạng hai tầng với tham số $\theta_A$: $W_1=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, $b_1=(0,0)$, $w_2=(1,1)$, $b_2=0$, $\sigma(z)=\max\{0,z\}$, mất mát $\ell=\tfrac12(f-y)^2$.

1. Với mẫu $x=(1,0)$, $y=\tfrac12$, chạy Thuật toán 06.11: tính $z$, $h$, $f$, $e$, $\nabla_{w_2}\ell$, $\delta_z$, $\nabla_{W_1}\ell$, $\nabla_{b_1}\ell$, $\partial\ell/\partial b_2$.
2. Giải thích vì sao hàng thứ hai của $\nabla_{W_1}\ell$ bằng $0$, và vì sao Mệnh đề 06.12 áp dụng được tại điểm này.
3. Với $d=10$, $m=5$, tính $p$ và số phép nhân của truyền xuôi và bước ngược theo Mệnh đề 06.14.
:::

::: hint
Ở câu 1, $z=(1,-1)$, nên chỉ đơn vị thứ nhất hoạt động. Ở câu 2, xét $\sigma'(z_2)$ và kiểm tra xem có tiền kích hoạt nào bằng $0$ không.
:::

::: solution
1. $z=W_1x+b_1=(1,-1)$, $h=(1,0)$, $f=1\cdot1+1\cdot0+0=1$, $e=f-y=\tfrac12$, $\ell=\tfrac18$. Tầng ra: $\partial\ell/\partial b_2=\tfrac12$, $\nabla_{w_2}\ell=e\,h=(\tfrac12,0)$. Tầng ẩn: $e\,w_2=(\tfrac12,\tfrac12)$, $\sigma'(z)=(1,0)$, nên $\delta_z=(\tfrac12,0)$. Tham số tầng ẩn:

$$
\begin{aligned}
&\nabla_{W_1}\ell=\delta_zx^\top=\begin{pmatrix}\tfrac12&0\\0&0\end{pmatrix},\\
&\nabla_{b_1}\ell=\bigl(\tfrac12,0\bigr).
\end{aligned}
$$

2. Đơn vị thứ hai có $z_2=-1<0$, nên $\sigma'(z_2)=0$ chặn mọi tín hiệu đi qua nó: $[\delta_z]_2=0$, kéo theo hàng hai của $\delta_zx^\top$ và $[\nabla_{b_1}\ell]_2$ bằng $0$. Cột hai của hàng một cũng bằng $0$ vì $x_2=0$. Hai tiền kích hoạt $1$ và $-1$ đều khác $0$, nên ReLU khả vi tại cả hai, và Mệnh đề 06.12 cho đầu ra đúng là gradient.

3. $p=md+2m+1=50+10+1=61$. Truyền xuôi: $md+m=55$ phép nhân. Bước ngược: $md+2m=60$ phép nhân.

**Kiểm tra lại.** Tăng $b_2$ thêm $\varepsilon$ làm $f=1+\varepsilon$ và $\ell=\tfrac12(\tfrac12+\varepsilon)^2$, có đạo hàm $\tfrac12$ tại $\varepsilon=0$, khớp $\partial\ell/\partial b_2$.
:::

Ví dụ 06.10 và Nhận xét 06.13 để lại hai câu hỏi: bước nào chắc chắn làm $F$ giảm, và khi gradient bằng $0$, điểm đó có phải là cực tiểu.

## 6. Điểm dừng và bảo đảm của gradient khi không lồi

Với $F$ lồi khả vi, bất đẳng thức tiếp tuyến $F(\theta')\ge F(\theta)+\nabla F(\theta)^\top(\theta'-\theta)$ biến $\nabla F(\theta)=0$ thành $F(\theta')\ge F(\theta)$ với mọi $\theta'$ (Hệ quả 01.26), và khi $F$ lồi mạnh, gradient nhỏ kéo theo giá trị gần tối ưu; đó là ý nghĩa của tiêu chí dừng $\lVert\nabla F(\theta_k)\rVert\le\varepsilon$ ở Bài 04. Không có tính lồi, bất đẳng thức tiếp tuyến không còn, nên chúng ta phải xác định lại gradient bằng $0$ hoặc gradient nhỏ chứng nhận được điều gì.

### 6.1. Điểm dừng và phân loại điểm dừng

Điều kiện bậc nhất $\nabla F(\theta)=0$ vẫn là điều kiện cần cho cực tiểu địa phương của một hàm khả vi; khi $F$ không lồi, chỉ chiều ngược lại mất đi. Các đối tượng sau gọi tên những gì có thể xảy ra.

::: definition Định nghĩa 06.15 (Điểm dừng và điểm yên ngựa)
Cho $F:\mathbb R^p\to\mathbb R$ khả vi và $\theta\in\mathbb R^p$.

**Điểm dừng.** $\theta$ là *điểm dừng* (stationary point) nếu $\nabla F(\theta)=0$.

**Điểm dừng $\varepsilon$-xấp xỉ.** Với $\varepsilon>0$, $\theta$ là *điểm dừng $\varepsilon$-xấp xỉ* ($\varepsilon$-stationary point) nếu $\lVert\nabla F(\theta)\rVert\le\varepsilon$.

**Cực tiểu địa phương.** $\theta$ là *cực tiểu địa phương* (local minimum) nếu có $\rho>0$ để $F(\theta')\ge F(\theta)$ với mọi $\lVert\theta'-\theta\rVert<\rho$; là cực tiểu địa phương chặt nếu bất đẳng thức là chặt với mọi $\theta'\ne\theta$ trong lân cận đó. Cực đại địa phương định nghĩa tương tự.

**Điểm yên ngựa.** Một điểm dừng không là cực tiểu địa phương cũng không là cực đại địa phương gọi là *điểm yên ngựa* (saddle point).
:::

Mọi cực tiểu địa phương của hàm khả vi là điểm dừng, nhưng một điểm dừng có thể là cực tiểu, cực đại địa phương hoặc điểm yên ngựa. Bảng sau so sánh điều mà điểm dừng chứng nhận trong hai trường hợp.

| | $F$ lồi, khả vi | $F$ không lồi |
|---|---|---|
| $\nabla F(\theta)=0$ chứng nhận | cực tiểu toàn cục (Hệ quả 01.26) | một điểm dừng: cực tiểu địa phương, cực đại địa phương hoặc điểm yên ngựa |
| tập cực tiểu toàn cục | tập lồi (Hệ quả 01.33) | có thể không lồi; với mạng, chứa $\theta^*$ và $P\theta^*$ nhưng không chứa trọn đoạn nối (Ví dụ 06.6) |
| $\lVert\nabla F(\theta)\rVert\le\varepsilon$ chứng nhận | giá trị gần tối ưu khi thêm lồi mạnh | chỉ một điểm dừng $\varepsilon$-xấp xỉ |

Nhầm lẫn thường gặp là coi "gradient bằng $0$" đồng nghĩa với "đã tối ưu". Trong lan truyền ngược, mẫu $x=(0,0)$ cho $\nabla_{W_1}\ell=\delta_zx^\top=0$ chỉ vì $x=0$, và đơn vị có tiền kích hoạt âm cho gradient bằng $0$ theo các tham số của nó; cả hai trường hợp không cho thông tin về tính tối ưu.

### 6.2. Mạng tuyến tính một đơn vị

Mạng XOR có chín tham số nên mặt mất mát của nó không biểu diễn được trên mặt phẳng. Để thấy đủ các loại điểm dừng trên một hình, ta dùng mạng nhỏ nhất có tích tham số.

::: example Ví dụ 06.11 (Mạng tuyến tính một đơn vị)
**Dữ kiện.** Mạng tuyến tính một đơn vị: mạng hai tầng với $d=m=1$, $\sigma(z)=z$, không có độ chệch, $f(x;u,v)=v\,(u\,x)$, $\theta=(u,v)\in\mathbb R^2$; một mẫu $x=1$, $y=1$ và mất mát bình phương, nên $F(u,v)=\tfrac12(uv-1)^2$.

**Gradient và Hessian.** Như Tình huống 04.3,

$$
\begin{aligned}
&\nabla F(u,v)=(uv-1)(v,u),\\
&\nabla^2F(u,v)\\
&\quad=\begin{pmatrix}v^2&2uv-1\\2uv-1&u^2\end{pmatrix}.
\end{aligned}
$$

**Điểm dừng.** $\nabla F=(uv-1)(v,u)=0$ khi $uv=1$ hoặc $(u,v)=(0,0)$. Các điểm của hyperbol $uv=1$ có $F=0$, giá trị nhỏ nhất có thể, nên là cực tiểu toàn cục. Gốc có $F=\tfrac12$.

**Đối xứng và tính không lồi.** Hai cực tiểu $(1,1)$ và $(-1,-1)$ có trung điểm $(0,0)$ với $F=\tfrac12>0$, nên theo đúng lập luận của Mệnh đề 06.7, $F$ không lồi. Tính không lồi ở đây chỉ do tích hai tham số, không cần ReLU.

**Kiểm tra lại.** Tại $(2,\tfrac12)$: $uv-1=0$ nên $\nabla F=0$ và $F=0$.
:::

![Hình vuông [−2, 2] × [−2, 2] với trục u, v. Đường mức là các hyperbol uv = hằng số. Tập cực tiểu uv = 1 (F = 0) gồm hai nhánh hyperbol vẽ đậm ở góc phần tư thứ nhất và thứ ba. Hai điểm (1, 1) và (−1, −1) nằm trên tập cực tiểu; đoạn nối chúng đi qua gốc. Gốc (0, 0), đánh dấu chữ X, là điểm yên ngựa với F = ½; đường mức F = ½ gồm hai trục tọa độ và hyperbol uv = 2, vẽ nét đứt.](img/lec-06/product-landscape.svg)

Hàm $F$ chỉ phụ thuộc tích $uv$, nên mọi đường mức là một hyperbol $uv=a$ với $a$ là hằng số. Đối xứng ở đây rộng hơn phép đổi dấu $(u,v)\mapsto(-u,-v)$: mọi phép co giãn $(u,v)\mapsto(\omega u,v/\omega)$ với $\omega\ne0$ giữ nguyên tích $uv$, nên giữ nguyên $F$.

### 6.3. Phân loại điểm dừng bằng Hessian

Gốc của Ví dụ 06.11 là điểm dừng nhưng không phải cực tiểu. Để phân biệt các loại điểm dừng mà không vẽ hình, ta dùng thông tin bậc hai. Mệnh đề sau ghép phép kiểm tra bậc hai của Định lý 00.43 với một điều kiện cần.

::: proposition Mệnh đề 06.16 (Phân loại điểm dừng bằng Hessian) — chứng minh đầy đủ
**Giả thiết.** $F:\mathbb R^p\to\mathbb R$ khả vi liên tục hai lần; $\nabla F(\theta)=0$; $H=\nabla^2F(\theta)$.

**Kết luận.**

1. Nếu $H\succ0$ thì $\theta$ là cực tiểu địa phương chặt.
2. Nếu $H$ có cả trị riêng âm và trị riêng dương thì $\theta$ là điểm yên ngựa.
3. Nếu $\theta$ là cực tiểu địa phương thì $H\succeq0$.
:::

::: proof Chứng minh Mệnh đề 06.16
**Lộ trình.** Kết luận 1 và 2 là Định lý 00.43; kết luận 3 suy từ khai triển Taylor theo một vector riêng.

**Bước 1 (kết luận 1 và 2).** Đây là kết luận 1 và 3 của Định lý 00.43 với $h=F$.

**Bước 2 (kết luận 3).** Khai triển Taylor bậc hai tại điểm dừng (Định lý 00.40) cho

$$
\begin{aligned}
&F(\theta+s)\\
&\quad=F(\theta)+\tfrac12s^\top Hs\\
&\qquad+E_2(s),\\
&\tfrac{E_2(s)}{\lVert s\rVert^2}\to0\ \text{khi}\ s\to0 .
\end{aligned}
\tag{6.1}
$$

Giả sử $H$ có trị riêng $\alpha_-<0$ với vector riêng đơn vị $\xi$. Với $s=t\xi$, (6.1) cho $F(\theta+t\xi)-F(\theta)=\tfrac12\alpha_-t^2+E_2(t\xi)$, âm khi $t\ne0$ đủ nhỏ, trái với giả thiết cực tiểu địa phương. Vậy mọi trị riêng của $H$ không âm. $\square$
:::

Kết luận 3 là điều kiện cần bậc hai. Khi $H\succeq0$ nhưng suy biến, mệnh đề không kết luận: dấu của $F(\theta+s)-F(\theta)$ khi đó do các số hạng bậc cao quyết định (Goodfellow và cộng sự 2016, §4.3.1, tr. 89–90).

::: example Ví dụ 06.12 (Phân loại ba điểm dừng của mạng tuyến tính một đơn vị)
**Dữ kiện.** $F(u,v)=\tfrac12(uv-1)^2$, $\nabla^2F(u,v)=\begin{pmatrix}v^2&2uv-1\\2uv-1&u^2\end{pmatrix}$; ba điểm dừng $(0,0)$, $(1,1)$, $(2,\tfrac12)$.

**Tại $(0,0)$.** Như Tình huống 04.3, $\nabla^2F=\begin{pmatrix}0&-1\\-1&0\end{pmatrix}$ có trị riêng $-1$ với vector riêng $(1,1)$ và $1$ với vector riêng $(1,-1)$. Kết luận 2 cho điểm yên ngựa. Theo hướng $(1,1)$, tích $uv$ dương và $F$ giảm; theo hướng $(1,-1)$, tích $uv$ âm và $F$ tăng.

**Tại $(1,1)$.** $\nabla^2F=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ có trị riêng $0$ (vector riêng $(1,-1)$) và $2$ (vector riêng $(1,1)$). Mệnh đề 06.16 không kết luận, dù $(1,1)$ là cực tiểu toàn cục vì $F=0$.

**Tại $(2,\tfrac12)$.** $\nabla^2F=\begin{pmatrix}0{,}25&1\\1&4\end{pmatrix}$ có định thức $0$ và vết $4{,}25$, nên trị riêng là $0$ và $4{,}25$. Phép kiểm tra không kết luận; $F=0$ cho thấy đây là cực tiểu toàn cục.

**Kiểm tra lại.** Tại $(1,1)$, hướng của trị riêng $0$ là $(1,-1)$; đường cong $t\mapsto(t,1/t)$ nằm trong tập cực tiểu và có vector tiếp tuyến $(1,-1)$ tại $t=1$.
:::

Dòng kiểm tra của ví dụ chỉ ra nguồn gốc của trị riêng $0$, được phát biểu tổng quát trong nhận xét sau.

::: remark Nhận xét 06.17 (Đối xứng liên tục và Hessian suy biến)
1. Khi một họ đối xứng liên tục, như phép co giãn $(u,v)\mapsto(\omega u,v/\omega)$, giữ nguyên $F$ và không cố định cực tiểu $\theta^*$, $\theta^*$ nằm trên một đường cong gồm toàn cực tiểu; Hessian tại cực tiểu có trị riêng $0$ theo hướng tiếp tuyến của đường cong đó, và Mệnh đề 06.16 không kết luận. Mạng ReLU có đối xứng co giãn tương tự giữa trọng số vào và ra của một đơn vị, vì $\max\{0,\omega z\}=\omega\max\{0,z\}$ đúng với mọi $\omega\ge0$, và cần $\omega>0$ để chia trọng số đi ra cho $\omega$ (Goodfellow và cộng sự 2016, §8.2.2). Đối xứng hoán vị của Mệnh đề 06.6 chỉ tạo các bản sao rời rạc và không sinh trị riêng $0$.
2. Với mạng thật, Hessian có $p^2$ phần tử: $p=78\,601$ cho khoảng $6{,}2\cdot10^9$ phần tử. Mệnh đề 06.16 vì vậy dùng được trên ví dụ nhỏ; bảo đảm cho mạng phải chỉ dùng gradient.
:::

### 6.4. Bổ đề giảm khi không lồi

Ví dụ 06.10 cho thấy cùng một hướng $-\nabla\ell$ có thể làm mất mát giảm hoặc tăng. Bổ đề giảm của Bài 04 trả lời câu hỏi "bước nào chắc chắn giảm", và chứng minh của nó không dùng tính lồi.

::: lemma Bổ đề 06.18 (Bổ đề giảm trên một tập lồi) — chứng minh đầy đủ
**Giả thiết.** $F:\mathbb R^p\to\mathbb R$ khả vi; $\nabla F$ là $L$-Lipschitz trên một tập lồi $C$, tức $\lVert\nabla F(\theta)-\nabla F(\theta')\rVert\le L\lVert\theta-\theta'\rVert$ với mọi $\theta,\theta'\in C$; $\theta\in C$, $\eta>0$ và $\theta-\eta\nabla F(\theta)\in C$.

**Kết luận.**

$$
\begin{aligned}
&F\bigl(\theta-\eta\nabla F(\theta)\bigr)\\
&\quad\le F(\theta)\\
&\qquad-\eta\bigl(1-\tfrac{L\eta}2\bigr)\\
&\qquad\cdot\lVert\nabla F(\theta)\rVert^2 .
\end{aligned}
\tag{6.2}
$$

Với $\eta=\tfrac1L$, mức giảm ít nhất là $\lVert\nabla F(\theta)\rVert^2/(2L)$; với $0<\eta<\tfrac2L$, vế phải nhỏ hơn $F(\theta)$ khi $\nabla F(\theta)\ne0$.
:::

::: proof Chứng minh Bổ đề 06.18
**Lộ trình.** Cận trên bậc hai dọc đoạn nối hai điểm, rồi thế bước hạ gradient.

**Bước 1 (cận trên bậc hai).** Với $\theta,\theta'\in C$, đặt $s=\theta'-\theta$. Đoạn nối nằm trong $C$ vì $C$ lồi. Theo định lý cơ bản của giải tích dọc đoạn này,

$$
\begin{aligned}
&F(\theta')-F(\theta)-\nabla F(\theta)^\top s\\
&\quad=\int_0^1\bigl(\nabla F(\theta+ts)\\
&\qquad\qquad-\nabla F(\theta)\bigr)^\top s\,dt\\
&\quad\le\int_0^1Lt\lVert s\rVert^2\,dt\\
&\quad=\tfrac L2\lVert s\rVert^2 .
\end{aligned}
$$

Bất đẳng thức giữa hai tích phân dùng bất đẳng thức Cauchy–Schwarz và tính Lipschitz: $\lVert\nabla F(\theta+ts)-\nabla F(\theta)\rVert\le Lt\lVert s\rVert$ vì $\theta+ts\in C$.

**Bước 2 (thế bước hạ gradient).** Lấy $\theta'=\theta-\eta\nabla F(\theta)$, tức $s=-\eta\nabla F(\theta)$. Số hạng bậc nhất bằng $-\eta\lVert\nabla F(\theta)\rVert^2$, số hạng bậc hai bằng $\tfrac{L\eta^2}2\lVert\nabla F(\theta)\rVert^2$. Cộng lại được (6.2).

**Bước 3 (hai trường hợp riêng).** Với $\eta=\tfrac1L$, hệ số là $\tfrac1L\cdot\tfrac12=\tfrac1{2L}$. Với $0<\eta<\tfrac2L$, $1-\tfrac{L\eta}2>0$. $\square$
:::

Bổ đề 06.18 là Bổ đề 04.21 và Bổ đề 05b.6 phát biểu lại với giả thiết trơn chỉ trên một tập lồi. Sự thu hẹp này cần thiết cho mạng: với mạng tuyến tính một đơn vị, không có hằng số $L$ toàn cục, như ví dụ sau tính.

::: example Ví dụ 06.13 (Bổ đề giảm trên mạng tuyến tính một đơn vị)
**Dữ kiện.** $F(u,v)=\tfrac12(uv-1)^2$ với gradient và Hessian của Ví dụ 06.11; điểm $\theta_0=(\tfrac12,\tfrac12)$; vùng $C=[0,1]^2$.

**Hằng số $L$ trên $C$.** Với ma trận đối xứng, mọi trị riêng có trị tuyệt đối không vượt tổng trị tuyệt đối lớn nhất của một hàng (lời giải Bài tập 04.14). Trên $[0,1]^2$, $v^2\le1$ và $\lvert2uv-1\rvert\le1$, nên mọi trị riêng có trị tuyệt đối không vượt $2$; tại $(1,1)$, trị riêng $2$ đạt được. Lập luận tích phân của Nhận xét 04.20, áp dọc các đoạn nằm trong tập lồi $C$, cho $\nabla F$ là $2$-Lipschitz trên $C$, nên $L=2$.

**Gradient tại $\theta_0$.** $uv-1=-\tfrac34$, $\nabla F(\theta_0)=(-\tfrac38,-\tfrac38)$, $\lVert\nabla F(\theta_0)\rVert^2=\tfrac9{32}=0{,}28125$; trùng hợp, $F(\theta_0)=\tfrac12\cdot\tfrac9{16}=\tfrac9{32}$ cũng bằng $0{,}28125$.

**Bảo đảm của Bổ đề 06.18.** Với $\eta=\tfrac1L=\tfrac12$: điểm mới $\theta_1=\theta_0-\tfrac12\nabla F(\theta_0)=(\tfrac{11}{16},\tfrac{11}{16})\in C$, và mức giảm ít nhất là $\tfrac{9/32}{4}=\tfrac9{128}\approx0{,}0703$.

**Giá trị thật.** $u_1v_1=\tfrac{121}{256}$, $F(\theta_1)=\tfrac12(\tfrac{121}{256}-1)^2=\tfrac{18225}{131072}\approx0{,}13905$. Mức giảm thật là $0{,}28125-0{,}13905=0{,}1422$, gấp đôi mức bảo đảm.

**Kiểm tra lại.** Cận trên bậc hai dọc hướng $-\nabla F(\theta_0)$ là $F(\theta_0)-\eta\lVert\nabla F\rVert^2+\tfrac L2\eta^2\lVert\nabla F\rVert^2=0{,}28125(1-\eta+\eta^2)$; tại $\eta=\tfrac12$ nó bằng $0{,}2109$, lớn hơn giá trị thật $0{,}1390$.
:::

![Trục hoành độ dài bước η từ 0 đến 1, trục tung giá trị từ 0 đến 0,4. Đường liền là φ(η) = F(θ₀ − η∇F(θ₀)) với θ₀ = (½, ½); đường nét đứt là cận trên bậc hai 0,28125(1 − η + η²) với L = 2. Hai đường bắt đầu tại 0,28125. Tại η = ½, cận bằng 0,2109 và giá trị thực bằng 0,1390; đường thực luôn nằm dưới cận.](img/lec-06/descent-bound-product.svg)

Parabol nét đứt là vế phải của (6.2) theo $\eta$, còn đường liền là giá trị thật của $F$ dọc tia $\theta_0-\eta\nabla F(\theta_0)$. Đường liền luôn nằm dưới parabol, và parabol đạt cực tiểu tại $\eta=\tfrac1L=\tfrac12$.

Trên các hình vuông lớn hơn, cùng phép tính cho trị riêng lớn nhất về trị tuyệt đối của Hessian bằng $4$ trên $[-1,1]^2$ (đạt tại $(1,-1)$, nơi Hessian là $\begin{pmatrix}1&-3\\-3&1\end{pmatrix}$ với trị riêng $4$ và $-2$) và bằng $13$ trên $[-2,2]^2$. Hằng số $L$ tăng không bị chặn theo kích thước vùng, nên với mạng, giả thiết trơn chỉ đặt được trên một vùng chứa dãy lặp.

Bổ đề 06.18 còn cho một cận dưới của độ cong từ Ví dụ 06.10. Ở đó, bước $\eta=0{,}25$ theo hướng $-\nabla\ell$ làm mất mát tăng từ $0{,}125$ lên $1{,}372$. Dọc đoạn nối $\theta$ và $\theta-0{,}25\nabla\ell$, mọi tiền kích hoạt của mẫu $(1,1)$ không nhỏ hơn $\tfrac12$, nên $\ell$ trơn trên đoạn đó. Nếu $\nabla\ell$ là $L$-Lipschitz trên đoạn với $L\le8$ thì $0{,}25\le\tfrac2L$, và (6.2) cho mất mát không tăng, mâu thuẫn. Vậy hằng số Lipschitz của gradient dọc đoạn này lớn hơn $8$.

### 6.5. Hội tụ của chuẩn gradient

Bổ đề 06.18 bảo đảm $F$ giảm ở mỗi bước. Cộng các mức giảm theo nhiều bước, ta được bảo đảm cơ bản của hạ gradient trên hàm không lồi trơn: chuẩn gradient phải nhỏ ở một bước nào đó.

::: theorem Định lý 06.19 (Hạ gradient trên hàm không lồi; Định lý 05b.41) — chứng minh đầy đủ
**Giả thiết.**

- **(H0).** $F$ khả vi và bị chặn dưới, $F_{\inf}=\inf_\theta F(\theta)>-\infty$.
- **(H2).** $\nabla F$ là $L$-Lipschitz trên một tập lồi chứa mọi điểm lặp.
- **Dãy lặp.** $\theta_0\in\mathbb R^p$, $\Delta_0=F(\theta_0)-F_{\inf}$; $\theta_{k+1}=\theta_k-\tfrac1L\nabla F(\theta_k)$.

**Kết luận.** Với mọi $K\ge1$,

$$
\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le\frac{2L\Delta_0}K .
\tag{6.3}
$$
:::

::: proof Chứng minh Định lý 06.19
**Lộ trình.** Cộng các mức giảm của bổ đề giảm theo $K$ bước, rồi chặn tổng dưới bằng $K$ lần số hạng nhỏ nhất.

**Bước 1 (một bước).** Bổ đề 06.18 với $\eta=\tfrac1L$, áp trên tập lồi của (H2), cho

$$
\begin{aligned}
&F(\theta_{k+1})\\
&\quad\le F(\theta_k)-\frac1{2L}\lVert\nabla F(\theta_k)\rVert^2,\\
&k=0,1,\ldots
\end{aligned}
$$

**Bước 2 (triệt tiêu liên tiếp).** Cộng $K$ bất đẳng thức với $k=0,\ldots,K-1$; các số hạng $F(\theta_1),\ldots,F(\theta_{K-1})$ triệt tiêu:

$$
\begin{aligned}
&\frac1{2L}\sum_{k<K}\lVert\nabla F(\theta_k)\rVert^2\\
&\quad\le F(\theta_0)-F(\theta_K)\\
&\quad\le F(\theta_0)-F_{\inf}\\
&\quad=\Delta_0,
\end{aligned}
$$

trong đó $F(\theta_K)\ge F_{\inf}$ theo (H0).

**Bước 3 (từ tổng sang cực tiểu).** Tổng của $K$ số không âm không nhỏ hơn $K$ lần số nhỏ nhất, nên $\tfrac K{2L}\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le\Delta_0$. Chia cho $\tfrac K{2L}$ được (6.3). $\square$
:::

Định lý chặn bình phương chuẩn gradient tại bước tốt nhất trong $K$ bước đầu: một trong các điểm $\theta_0,\ldots,\theta_{K-1}$ là điểm dừng $\varepsilon$-xấp xỉ với $\varepsilon^2=2L\Delta_0/K$. Định lý không cần tính lồi hay điểm cực tiểu, và cho tốc độ $O(1/K)$ cho bình phương chuẩn gradient, tức $O(1/\sqrt K)$ cho chính chuẩn. So với Định lý 05b.18 cho hàm lồi mạnh, định lý bỏ (H3) và trả bằng hai điều: đại lượng được chặn chuyển từ khoảng cách tới nghiệm sang chuẩn gradient, và tốc độ chuyển từ tuyến tính sang $O(1/K)$. Ví dụ sau so cận với dãy thật.

::: example Ví dụ 06.14 (Số bước theo cận của Định lý 06.19 và số bước thật)
**Dữ kiện.** $F(u,v)=\tfrac12(uv-1)^2$; $\theta_0=(\tfrac12,\tfrac12)$; $L=2$ trên $[0,1]^2$ (Ví dụ 06.13); $F_{\inf}=0$, nên $\Delta_0=F(\theta_0)=0{,}28125$. Yêu cầu: $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le0{,}01$.

**Xác minh giả thiết.** (H0) đúng với $F_{\inf}=0$. Dãy $\theta_k$ nằm trên đường chéo $u=v=t_k$ với $t_{k+1}=t_k+\tfrac12t_k(1-t_k^2)$; hàm $t\mapsto t+\tfrac12t(1-t^2)$ tăng trên $[0,1]$ và giữ $[0,1]$, nên mọi điểm lặp ở trong $[0,1]^2$, nơi (H2) đúng với $L=2$.

**Theo cận.** $\tfrac{2L\Delta_0}K\le0{,}01$ khi $K\ge\tfrac{2\cdot2\cdot0{,}28125}{0{,}01}=112{,}5$, tức $K=113$.

**Dãy thật.** Hạ gradient bước $\tfrac12$ cho $\lVert\nabla F(\theta_k)\rVert^2$ lần lượt bằng $0{,}28125$; $0{,}26288$; $0{,}09078$; $0{,}00453$ tại $k=0,1,2,3$. Vậy $K=4$ đã đủ.

**Diễn giải.** Cận đúng cho mọi hàm thỏa giả thiết, nên trên một hàm cụ thể nó có thể lớn hơn số bước thật nhiều lần, ở đây gần $30$ lần.

**Kiểm tra lại.** Tại $k=1$, $t_1=0{,}6875$, $t_1^2-1=-0{,}52734$, $\lVert\nabla F\rVert^2=2t_1^2(t_1^2-1)^2\approx2\cdot0{,}47266\cdot0{,}27809\approx0{,}26288$.
:::

### 6.6. Bình nguyên gần điểm yên ngựa

Định lý 06.19 chỉ chứng nhận rằng một bước nào đó có gradient nhỏ. Ví dụ sau cho thấy bước đó có thể nằm ngay cạnh một điểm yên ngựa, với giá trị $F$ còn xa cực tiểu.

::: example Ví dụ 06.15 (Bình nguyên gần điểm yên ngựa)
**Dữ kiện.** $F(u,v)=\tfrac12(uv-1)^2$; hạ gradient bước $\eta=\tfrac12$ từ $\theta_0=(0{,}01;\ 0{,}01)$; ngưỡng dừng $\varepsilon^2=2\cdot10^{-4}$ cho $\lVert\nabla F\rVert^2$.

**Rút về một chiều.** Vì $u_0=v_0$ và hai thành phần của $\nabla F$ đối xứng, dãy ở mãi trên đường chéo $u=v=t_k$, với

$$
\begin{aligned}
&t_{k+1}=t_k+\tfrac12t_k(1-t_k^2),\\
&F=\tfrac12(t_k^2-1)^2,\\
&\lVert\nabla F\rVert^2=2t_k^2(1-t_k^2)^2 .
\end{aligned}
$$

Như ở Ví dụ 06.14, dãy ở trong $[0,1]^2$, nơi $L=2$, nên $\eta=\tfrac12=\tfrac1L$ hợp lệ.

**Quỹ đạo.**

| $k$ | $t_k$ | $F(\theta_k)$ | $\lVert\nabla F(\theta_k)\rVert^2$ |
|---:|---:|---:|---:|
| $0$ | $0{,}0100$ | $0{,}4999$ | $2{,}00\cdot10^{-4}$ |
| $5$ | $0{,}0758$ | $0{,}4943$ | $1{,}14\cdot10^{-2}$ |
| $8$ | $0{,}2519$ | $0{,}4386$ | $0{,}111$ |
| $10$ | $0{,}5294$ | $0{,}2590$ | $0{,}290$ |
| $12$ | $0{,}8934$ | $0{,}0204$ | $0{,}065$ |
| $13$ | $0{,}9835$ | $5{,}3\cdot10^{-4}$ | $2{,}06\cdot10^{-3}$ |
| $14$ | $0{,}9996$ | $\approx0$ | $1{,}3\cdot10^{-6}$ |

**Đọc bảng.** Gần gốc, $t_{k+1}\approx1{,}5\,t_k$, nên $t$ tăng theo cấp số nhân từ $0{,}01$ và cần khoảng $8$ bước để rời vùng $F\approx\tfrac12$. Tiêu chí dừng $\lVert\nabla F(\theta_k)\rVert^2\le\varepsilon^2$ đã thỏa tại $k=0$, khi $F(\theta_0)\approx0{,}4999$ gần giá trị $\tfrac12$ tại điểm yên ngựa.

**Kiểm tra lại.** Tại $k=0$, $\lVert\nabla F\rVert^2=2\cdot10^{-4}(1-10^{-4})^2=1{,}9996\cdot10^{-4}$, không vượt ngưỡng $2\cdot10^{-4}$.
:::

![Hai đồ thị theo số bước k từ 0 đến 15, hạ gradient bước ½ từ θ₀ = (0,01; 0,01). Đồ thị thứ nhất: F(θₖ) giữ gần 0,5, giá trị tại điểm yên ngựa, tới khoảng k = 7, rồi giảm nhanh về 0 từ k = 10 đến k = 13. Đồ thị thứ hai: ‖∇F(θₖ)‖² trên thang logarit, tăng từ 2·10⁻⁴ tại k = 0 lên khoảng 0,29 tại k = 10 rồi giảm còn 1,3·10⁻⁶ tại k = 14; đường ngang ε² = 2·10⁻⁴ cho thấy θ₀ đã là điểm dừng ε-xấp xỉ.](img/lec-06/saddle-plateau.svg)

Đồ thị thứ nhất cho thấy một *bình nguyên* (plateau) quanh điểm yên ngựa: một vùng gradient nhỏ, giá trị mục tiêu gần như không đổi và còn xa cực tiểu. Chuẩn gradient không đơn điệu: nó tăng khi dãy rời điểm yên ngựa, đạt đỉnh tại $k=10$, rồi giảm khi dãy tới tập cực tiểu.

Goodfellow và cộng sự (2016, §8.2.3, tr. 285–286) tách bình nguyên, vùng phẳng rộng có giá trị gần như không đổi, khỏi điểm yên ngựa, và ghi nhận rằng trong thực nghiệm, hạ gradient thường thoát được điểm yên ngựa; vấn đề nằm ở thời gian đi qua vùng phẳng và ở cách đọc tiêu chí dừng.

::: remark Nhận xét 06.20 (Đại lượng mà Định lý 06.19 chặn)
Định lý 06.19 chặn đúng một đại lượng, $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2$. Trên mạng tuyến tính một đơn vị, điều đó có ba hệ quả, bao gồm:

1. Điểm thỏa tiêu chí có thể nằm cạnh điểm yên ngựa: ở Ví dụ 06.15, $\theta_0$ đã thỏa tiêu chí $\lVert\nabla F\rVert^2\le\varepsilon^2$, với $F(\theta_0)-F_{\inf}\approx0{,}5$.
2. Cận chỉ chứa $L$, $\Delta_0$ và $K$, còn điểm mà dãy tiến tới phụ thuộc $\theta_0$ và $\eta$: từ $(\tfrac12,\tfrac12)$ với bước $\tfrac12$, dãy tiến tới cực tiểu $(1,1)$ (Ví dụ 06.14); từ $(1,-1)$ với bước $\tfrac14$, dãy tiến tới điểm yên ngựa $(0,0)$ (Tình huống 04.3).
3. Xuất phát đúng tại điểm yên ngựa $(0,0)$, hạ gradient đứng yên vì $\nabla F(0,0)=0$, và cận đúng với $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2=0$.
:::

**Trong học máy.** Với mạng tuyến tính, khởi tạo mọi trọng số rất nhỏ đặt dãy lặp gần điểm yên ngựa ở gốc (Ví dụ 06.12), và theo Ví dụ 06.15, một tiêu chí dừng chỉ dựa vào chuẩn gradient khi đó kết thúc tại $F\approx\tfrac12$; Goodfellow và cộng sự (2016, tr. 286) mô tả cùng hiện tượng tại điểm yên ngựa có mọi trọng số bằng $0$. Vì vậy, giá trị $F$ trên tập huấn luyện được theo dõi cùng với chuẩn gradient (Goodfellow và cộng sự 2016, tr. 295).

::: exercise Bài tập 06.3 (Chính quy hóa bậc hai trên mạng tuyến tính một đơn vị)
Cho $F_\lambda(u,v)=\tfrac12(uv-1)^2+\tfrac\lambda2(u^2+v^2)$ với $\lambda=\tfrac12$.

1. Chứng minh mọi điểm dừng của $F_\lambda$ thỏa $u^2=v^2$, rồi tìm tất cả các điểm dừng.
2. Phân loại từng điểm dừng bằng Mệnh đề 06.16 và tính giá trị $F_\lambda$ tại đó.
3. So sánh với $F_0(u,v)=\tfrac12(uv-1)^2$ của Ví dụ 06.11: xác định tập cực tiểu của hai hàm và kiểm tra Hessian tại cực tiểu có suy biến không.
:::

::: hint
Ở câu 1, nhân phương trình $\partial F_\lambda/\partial u=0$ với $u$, phương trình $\partial F_\lambda/\partial v=0$ với $v$, rồi trừ. Xét riêng hai trường hợp $u=v$ và $u=-v$.
:::

::: solution
1. $\nabla F_\lambda=\bigl((uv-1)v+\lambda u,\ (uv-1)u+\lambda v\bigr)$. Nhân thành phần thứ nhất với $u$, thành phần thứ hai với $v$, hai phương trình bằng $0$ cho $(uv-1)uv+\lambda u^2=0$ và $(uv-1)uv+\lambda v^2=0$; trừ hai đẳng thức được $\lambda(u^2-v^2)=0$, nên $u^2=v^2$ vì $\lambda>0$.

- **Trường hợp $u=v$.** Thành phần thứ nhất thành $u(u^2-1+\lambda)=0$, nên $u=0$ hoặc $u^2=1-\lambda=\tfrac12$.
- **Trường hợp $u=-v$.** Thành phần thứ nhất thành $(-u^2-1)(-u)+\lambda u=u(u^2+1+\lambda)=0$, nên $u=0$.

Các điểm dừng là $(0,0)$, $(\tfrac1{\sqrt2},\tfrac1{\sqrt2})$ và $(-\tfrac1{\sqrt2},-\tfrac1{\sqrt2})$.

2. $\nabla^2F_\lambda=\begin{pmatrix}v^2+\lambda&2uv-1\\2uv-1&u^2+\lambda\end{pmatrix}$.

- Tại $(0,0)$: $\begin{pmatrix}\tfrac12&-1\\-1&\tfrac12\end{pmatrix}$ có trị riêng $\tfrac12\pm1$, tức $-\tfrac12$ và $\tfrac32$: điểm yên ngựa, $F_\lambda=\tfrac12$.
- Tại $\pm(\tfrac1{\sqrt2},\tfrac1{\sqrt2})$: $uv=\tfrac12$, nên $2uv-1=0$ và $v^2+\lambda=1$; Hessian là $I$, xác định dương: cực tiểu địa phương chặt, $F_\lambda=\tfrac12\cdot\tfrac14+\tfrac14\cdot1=\tfrac38$.

Vì $F_\lambda\to\infty$ khi $\lVert(u,v)\rVert\to\infty$, $F_\lambda$ đạt cực tiểu toàn cục (Định lý 01.38) tại một điểm dừng; so ba giá trị, hai điểm $\pm(\tfrac1{\sqrt2},\tfrac1{\sqrt2})$ là cực tiểu toàn cục.

3. Không chính quy hóa, tập cực tiểu là cả hyperbol $uv=1$ và Hessian tại cực tiểu có trị riêng $0$ (Ví dụ 06.12). Với $\lambda=\tfrac12$, số hạng $\tfrac\lambda2(u^2+v^2)$ phá đối xứng co giãn $(u,v)\mapsto(\omega u,v/\omega)$, chỉ còn đối xứng đổi dấu; tập cực tiểu gồm hai điểm cô lập và Hessian tại đó bằng $I$. Điểm yên ngựa tại gốc vẫn còn, và $F_\lambda$ vẫn không lồi.

**Kiểm tra lại.** Tại $(\tfrac1{\sqrt2},\tfrac1{\sqrt2})$: $(uv-1)v+\lambda u=(-\tfrac12)\tfrac1{\sqrt2}+\tfrac12\cdot\tfrac1{\sqrt2}=0$.
:::

Bổ đề giảm và Định lý 06.19 đều cần $\nabla F(\theta_k)$ đầy đủ ở mỗi bước, mỗi lần tốn $O(np)$.

## 7. Gradient lô nhỏ và chi phí mỗi bước

Trước khi thay gradient đầy đủ, ta xác định quy mô mà một bước dùng đủ $n$ mẫu vượt ngân sách mỗi bước, và độ chính xác của gradient trên một lô nhỏ chọn ngẫu nhiên.

### 7.1. Chi phí một bước của ba phương pháp

Ba phương pháp được so sánh là hạ gradient đầy đủ, Newton và hạ gradient ngẫu nhiên trên lô $b$ mẫu; mô hình chi phí đếm phép nhân–cộng của một bước.

::: example Ví dụ 06.16 (Chi phí một bước ở ba quy mô)
**Dữ kiện.** Chi phí một bước $np$, $np^2+p^3$, $bp$ (Mệnh đề 06.14, 05.33); ba bộ $(n,p,b)$ trong bảng; giả sử máy thực hiện $10^{12}$ phép nhân–cộng mỗi giây; một năm bằng $3{,}156\cdot10^7$ giây; bỏ hằng số và song song phần cứng.

| $(n,\ p,\ b)$ | hạ gradient: $np$ | Newton: $np^2+p^3$ | SGD: $bp$ |
|---|---:|---:|---:|
| $(10^3,\ 10^2,\ 10)$ | $10^5$ | $1{,}1\cdot10^7$ | $10^3$ |
| $(10^5,\ 10^5,\ 100)$ | $10^{10}$ ($0{,}01$ s) | $2\cdot10^{15}$ ($2000$ s) | $10^7$ |
| $(10^9,\ 10^9,\ 10^3)$ | $10^{18}$ ($11{,}6$ ngày) | $2\cdot10^{27}$ ($6{,}3\cdot10^7$ năm) | $10^{12}$ ($1$ s) |

**Đọc bảng.** Ở quy mô thứ ba, một bước hạ gradient đầy đủ tốn $11{,}6$ ngày, một bước Newton không thực hiện được, còn một bước SGD có chi phí không phụ thuộc $n$. Riêng việc lưu Hessian ở quy mô thứ ba cần $8\cdot10^{18}$ byte với số thực $8$ byte.

**Kiểm tra lại.** Quy mô thứ ba: $10^{18}/10^{12}=10^6$ s, chia cho $86\,400$ được $11{,}57$ ngày; $2\cdot10^{27}/10^{12}=2\cdot10^{15}$ s, chia cho $3{,}156\cdot10^7$ được $6{,}34\cdot10^7$ năm.
:::

Bảng chỉ so chi phí một bước; số bước của Newton theo Định lý 04.37. Một *lượt dữ liệu* (epoch) tốn $np$ cho cả hạ gradient đầy đủ và SGD: hạ gradient đầy đủ thực hiện một cập nhật, SGD thực hiện $n/b$ cập nhật.

### 7.2. Ước lượng rủi ro kỳ vọng bằng rủi ro thực nghiệm

Tại một tham số cố định, $F$ là trung bình của $n$ biến ngẫu nhiên độc lập; định lý sau cho kỳ vọng và phương sai của nó.

::: theorem Định lý 06.21 (Rủi ro thực nghiệm tại một tham số cố định; Định lý 05c.52) — chứng minh đầy đủ
**Giả thiết.** Các mẫu $(x_i,y_i)$, $i=1,\ldots,n$, độc lập cùng phân phối với $(X,Y)$; $\theta\in\mathbb R^p$ cố định, được chọn trước khi nhìn các mẫu; $V(\theta)=\operatorname{Var}\ell\bigl(f(X;\theta),Y\bigr)<\infty$.

**Kết luận.**

$$
\begin{aligned}
&\mathbb E\,F(\theta)=R(\theta),\\
&\operatorname{Var}F(\theta)=\frac{V(\theta)}n .
\end{aligned}
$$
:::

::: proof Chứng minh Định lý 06.21
**Lộ trình.** Với $\theta$ cố định, các $\ell_i(\theta)$ là biến ngẫu nhiên độc lập cùng phân phối; áp tính tuyến tính của kỳ vọng và cộng phương sai.

**Bước 1 (kỳ vọng).** Với $\theta$ cố định, $\ell_i(\theta)=\ell(f(x_i;\theta),y_i)$ là hàm của riêng mẫu $i$, nên các $\ell_i(\theta)$ độc lập, cùng phân phối với $\ell(f(X;\theta),Y)$ và có kỳ vọng $R(\theta)$. Tính tuyến tính của kỳ vọng cho $\mathbb EF(\theta)=\tfrac1n\sum_i\mathbb E\ell_i(\theta)=R(\theta)$.

**Bước 2 (phương sai).** Phương sai của tổng các biến độc lập bằng tổng phương sai, nên

$$
\begin{aligned}
\operatorname{Var}F(\theta)&=\frac1{n^2}\sum_i\operatorname{Var}\ell_i(\theta)\\
&=\frac{n\,V(\theta)}{n^2}\\
&=\frac{V(\theta)}n .
\end{aligned}
$$

$\square$
:::

Định lý nói rằng tại một tham số cố định, $F$ lệch $R$ một lượng có độ lệch chuẩn $\sqrt{V(\theta)/n}$, tức bậc $1/\sqrt n$. Giả thiết "$\theta$ được chọn trước khi nhìn các mẫu" đúng với tập xác thực và tập kiểm thử, nhưng sai với tham số vừa huấn luyện trên chính các mẫu đó, nên định lý không áp dụng cho tham số này.

::: remark Nhận xét 06.22 (Phân tích của Bottou và Bousquet)
Bottou và Bousquet (2011, (13.2), tr. 354; §13.2.3, tr. 355; Bảng 13.2, tr. 362) tách sai số vượt (excess error) của mô hình học được thành ba thành phần, bao gồm (Nhận xét 05c.58):

- sai số xấp xỉ (approximation error), do lớp mô hình;
- sai số ước lượng (estimation error), do chỉ có $n$ mẫu;
- sai số tối ưu (optimization error), do dừng thuật toán trước cực tiểu chính xác.

Với bài toán lồi ở quy mô lớn, khi thời gian tính toán là ràng buộc chính, giảm sai số tối ưu xuống dưới bậc của sai số ước lượng không cải thiện bậc của cận sai số vượt; thời gian đó dùng tốt hơn để xử lý thêm mẫu.
:::

Ví dụ 05.25 ghi một thí nghiệm của Bottou và Bousquet (2011, Bảng 13.3, tr. 363) trên tập RCV1: SGD với gradient của một mẫu mỗi bước đạt cùng lỗi kiểm thử với TRON, một phương pháp Newton miền tin cậy, trong thời gian nhỏ hơn một bậc.

### 7.3. Gradient lô nhỏ

Với chi phí ở Ví dụ 06.16 và sai số thống kê của Định lý 06.21, ta thay $\nabla F(\theta_k)$ bằng trung bình gradient trên $b$ mẫu chọn ngẫu nhiên. Trước khi phát biểu tổng quát, ta xem ước lượng đó thay đổi theo lô ra sao trên một bộ dữ liệu nhỏ.

::: example Ví dụ 06.17 (Gradient lô nhỏ trên dữ liệu bốn điểm)
**Dữ kiện.** Dữ liệu bốn điểm $x=(-1,0,1,2)$, $y=(1,0,1,4)$, $\ell_i=\tfrac12(wx_i+c-y_i)^2$, $F=\tfrac14\sum_i\ell_i$; điểm $\theta_0=(0,0)$; lô $b=2$ mẫu chọn đều không hoàn lại; bước $\eta=\tfrac14$.

**Gradient mẫu.** $\nabla\ell_i(\theta)=(wx_i+c-y_i)(x_i,1)$. Tại $\theta_0$, các phần dư là $-y_i$, nên bốn gradient mẫu là $(1,-1)$, $(0,0)$, $(-1,-1)$, $(-8,-4)$, và $\nabla F(\theta_0)=(-2;\ -1{,}5)$, $F(\theta_0)=\tfrac14\cdot\tfrac12(1+0+1+16)=\tfrac94$.

**Sáu lô.** Mỗi lô có xác suất $\tfrac16$. Gradient lô $\widehat g$ là trung bình hai gradient mẫu, và $\theta_1=\theta_0-\tfrac14\widehat g$:

| lô | $\{1,2\}$ | $\{1,3\}$ | $\{1,4\}$ | $\{2,3\}$ | $\{2,4\}$ | $\{3,4\}$ |
|---|---|---|---|---|---|---|
| $\widehat g$ | $(\tfrac12,-\tfrac12)$ | $(0,-1)$ | $(-\tfrac72,-\tfrac52)$ | $(-\tfrac12,-\tfrac12)$ | $(-4,-2)$ | $(-\tfrac92,-\tfrac52)$ |
| $F(\theta_1)$ | $2{,}324$ | $1{,}906$ | $0{,}605$ | $1{,}840$ | $0{,}625$ | $0{,}559$ |

**Đọc bảng.** Trung bình sáu vector $\widehat g$ là $(-2;\ -1{,}5)=\nabla F(\theta_0)$. Lô $\{1,2\}$ làm $F$ tăng từ $2{,}25$ lên $2{,}324$, dù hướng của nó là hướng giảm của mất mát trung bình trên lô. Kỳ vọng của $F(\theta_1)$ theo sáu lô là $\tfrac{503}{384}\approx1{,}310$, còn bước với gradient đầy đủ cho $\theta_1=(\tfrac12,\tfrac38)$ và $F=\tfrac{133}{128}\approx1{,}039$.

**Kiểm tra lại.** Tổng thành phần thứ nhất của sáu $\widehat g$: $\tfrac12+0-\tfrac72-\tfrac12-4-\tfrac92=-12$, chia $6$ được $-2$. Với lô $\{1,2\}$: $\theta_1=(-\tfrac18,\tfrac18)$, phần dư $wx_i+c-y_i$ là $-\tfrac34,\tfrac18,-1,-\tfrac{33}8$, nên $F=\tfrac18\bigl(\tfrac9{16}+\tfrac1{64}+1+\tfrac{1089}{64}\bigr)=\tfrac{595}{256}\approx2{,}324$.
:::

![Mặt phẳng hai thành phần (w, c) của gradient. Sáu mũi tên mảnh từ gốc tới sáu gradient lô nhỏ: {1,2}: (0,5; −0,5); {1,3}: (0; −1); {1,4}: (−3,5; −2,5); {2,3}: (−0,5; −0,5); {2,4}: (−4; −2); {3,4}: (−4,5; −2,5). Mũi tên đậm là gradient đầy đủ ∇F(θ₀) = (−2; −1,5), bằng trung bình của sáu mũi tên.](img/lec-06/batch-gradients.svg)

Một cách trực quan, gradient lô nhỏ đúng theo trung bình nhưng sai ở từng lần chọn: sáu mũi tên mảnh tỏa ra quanh mũi tên đậm, và độ tỏa của chúng là phương sai của ước lượng. Để làm rõ ước lượng này, xem định nghĩa sau.

::: definition Định nghĩa 06.23 (Gradient lô nhỏ)
Cho $F=\tfrac1n\sum_{i=1}^n\ell_i$ với mọi $\ell_i$ khả vi tại $\theta\in\mathbb R^p$; đặt $g_i=\nabla\ell_i(\theta)$ và $\bar g=\nabla F(\theta)=\tfrac1n\sum_ig_i$.

**Hiệp phương sai của gradient một mẫu.**

$$
\begin{aligned}
&\Sigma(\theta)=\frac1n\sum_{i=1}^n(g_i-\bar g)(g_i-\bar g)^\top,\\
&\operatorname{tr}\Sigma(\theta)=\frac1n\sum_{i=1}^n\lVert g_i-\bar g\rVert^2 .
\end{aligned}
$$

**Gradient lô nhỏ.** Với một *lô* (mini-batch) gồm $b$ chỉ số $I_1,\ldots,I_b\in\{1,\ldots,n\}$,

$$
\widehat g=\frac1b\sum_{t=1}^bg_{I_t}.
\tag{7.1}
$$

**Hai cách chọn.** *Có hoàn lại* (with replacement): $I_1,\ldots,I_b$ độc lập, mỗi chỉ số đều trên $\{1,\ldots,n\}$. *Không hoàn lại* (without replacement): $\{I_1,\ldots,I_b\}$ là một tập con $b$ phần tử chọn đều trong $\binom nb$ tập con, với $b\le n$.
:::

Trong định nghĩa, $\operatorname{tr}\Sigma(\theta)$ là phương sai tổng của gradient một mẫu chọn đều. Khi $b=n$ và chọn không hoàn lại, lô là toàn bộ dữ liệu và $\widehat g=\bar g$. Khi $b=1$, $\widehat g$ là gradient của một mẫu, như thuật toán SGD gốc.

::: theorem Định lý 06.24 (Tính không chệch và sai số của gradient lô nhỏ; Định lý 05c.53) — chứng minh đầy đủ
**Giả thiết.** Như Định nghĩa 06.23; $\theta$ cố định, không phụ thuộc lô đang được chọn.

**Kết luận.**

1. Chọn có hoàn lại: $\mathbb E\widehat g=\nabla F(\theta)$ và $\mathbb E\lVert\widehat g-\nabla F(\theta)\rVert^2=\dfrac{\operatorname{tr}\Sigma(\theta)}b$.
2. Chọn không hoàn lại, $n\ge2$, $1\le b\le n$: $\mathbb E\widehat g=\nabla F(\theta)$ và

$$
\begin{aligned}
&\mathbb E\lVert\widehat g-\nabla F(\theta)\rVert^2\\
&\quad=\frac{\operatorname{tr}\Sigma(\theta)}b\cdot\frac{n-b}{n-1}.
\end{aligned}
\tag{7.2}
$$
:::

::: proof Chứng minh Định lý 06.24
**Lộ trình.** Viết sai số qua các sai lệch $a_i$ có tổng bằng $0$, rồi khai triển bình phương theo xác suất một chỉ số hay một cặp chỉ số thuộc lô.

Đặt $a_i=g_i-\bar g$. Khi đó $\sum_ia_i=0$, $\tfrac1n\sum_i\lVert a_i\rVert^2=\operatorname{tr}\Sigma(\theta)$ và $\widehat g-\bar g=\tfrac1b\sum_ta_{I_t}$.

**Bước 1 (có hoàn lại).** Mỗi $I_t$ đều trên $\{1,\ldots,n\}$, nên $\mathbb Ea_{I_t}=\tfrac1n\sum_ia_i=0$, kéo theo $\mathbb E\widehat g=\bar g$. Với $t\ne t'$, $I_t$ và $I_{t'}$ độc lập, nên $\mathbb E[a_{I_t}^\top a_{I_{t'}}]=(\mathbb Ea_{I_t})^\top(\mathbb Ea_{I_{t'}})=0$. Do đó

$$
\begin{aligned}
\mathbb E\lVert\widehat g-\bar g\rVert^2&=\frac1{b^2}\sum_{t=1}^b\mathbb E\lVert a_{I_t}\rVert^2\\
&=\frac1{b^2}\cdot b\operatorname{tr}\Sigma(\theta)\\
&=\frac{\operatorname{tr}\Sigma(\theta)}b .
\end{aligned}
$$

**Bước 2 (không hoàn lại: kỳ vọng).** Mỗi chỉ số $i$ thuộc lô với xác suất $\tfrac bn$, nên $\mathbb E\widehat g=\tfrac1b\sum_i\tfrac bng_i=\bar g$.

**Bước 3 (không hoàn lại: sai số).** Mỗi cặp $i\ne j$ cùng thuộc lô với xác suất $\tfrac{b(b-1)}{n(n-1)}$. Khai triển bình phương:

$$
\begin{aligned}
&\mathbb E\Bigl\lVert\sum_{i\in B}a_i\Bigr\rVert^2\\
&\quad=\sum_i\frac bn\lVert a_i\rVert^2\\
&\qquad+\sum_{i\ne j}\frac{b(b-1)}{n(n-1)}a_i^\top a_j\\
&\quad=b\operatorname{tr}\Sigma(\theta)\\
&\qquad+\frac{b(b-1)}{n(n-1)}\Bigl\lVert\sum_ia_i\Bigr\rVert^2\\
&\qquad-\frac{b(b-1)}{n(n-1)}\sum_i\lVert a_i\rVert^2\\
&\quad=b\operatorname{tr}\Sigma(\theta)\\
&\qquad-\frac{b(b-1)}{n(n-1)}\,n\operatorname{tr}\Sigma(\theta)\\
&\quad=b\operatorname{tr}\Sigma(\theta)\,\frac{n-b}{n-1}.
\end{aligned}
$$

Phép thế $\bigl\lVert\sum_ia_i\bigr\rVert^2-\sum_i\lVert a_i\rVert^2=-n\operatorname{tr}\Sigma(\theta)$ dùng $\sum_ia_i=0$. Chia cho $b^2$ được (7.2). $\square$
:::

Hệ số $\tfrac{n-b}{n-1}\le1$ cho sai số của chọn không hoàn lại nhỏ hơn hoặc bằng sai số của chọn có hoàn lại, và bằng $0$ khi $b=n$.

Sai số chuẩn $\sqrt{\operatorname{tr}\Sigma/b}$ giảm theo $1/\sqrt b$ trong khi chi phí tăng theo $b$ (Mệnh đề 05c.56): tăng kích thước lô lên $100$ lần chỉ giảm sai số chuẩn $10$ lần. Goodfellow và cộng sự (2016, §8.1.3, tr. 278) dùng chính phép so sánh này để giải thích vì sao phần lớn thuật toán tối ưu hội tụ nhanh hơn theo tổng chi phí khi dùng ước lượng gradient rẻ.

::: example Ví dụ 06.18 (Kiểm tra Định lý 06.24 trên dữ liệu bốn điểm)
**Dữ kiện.** Dữ liệu bốn điểm tại $\theta_0=(0,0)$: gradient mẫu $(1,-1)$, $(0,0)$, $(-1,-1)$, $(-8,-4)$; $\nabla F(\theta_0)=(-2;\ -1{,}5)$; sáu gradient lô nhỏ $b=2$ không hoàn lại như Ví dụ 06.17.

**Tính $\operatorname{tr}\Sigma(\theta_0)$.** Sai lệch của bốn gradient mẫu khỏi trung bình là $(3;\ 0{,}5)$, $(2;\ 1{,}5)$, $(1;\ 0{,}5)$, $(-6;\ -2{,}5)$, với bình phương chuẩn $9{,}25$, $6{,}25$, $1{,}25$, $42{,}25$. Trung bình là $\operatorname{tr}\Sigma(\theta_0)=\tfrac{59}4$.

**Theo (7.2).** $\mathbb E\lVert\widehat g-\nabla F\rVert^2=\tfrac{59}4\cdot\tfrac12\cdot\tfrac{4-2}{4-1}=\tfrac{59}{12}$.

**Liệt kê.** Sai lệch của sáu $\widehat g$ khỏi $(-2;\ -1{,}5)$ là $(2{,}5;\ 1)$, $(2;\ 0{,}5)$, $(-1{,}5;\ -1)$, $(1{,}5;\ 1)$, $(-2;\ -0{,}5)$, $(-2{,}5;\ -1)$, với bình phương chuẩn $7{,}25$; $4{,}25$; $3{,}25$; $3{,}25$; $4{,}25$; $7{,}25$. Trung bình là $\tfrac{29{,}5}6=\tfrac{59}{12}$.

**Kiểm tra lại.** Hai cách cho cùng $\tfrac{59}{12}\approx4{,}92$; với chọn có hoàn lại, kết luận 1 cho $\tfrac{59}8\approx7{,}38$, lớn hơn.
:::

### 7.4. Thuật toán hạ gradient ngẫu nhiên lô nhỏ

Ghép gradient lô nhỏ với lan truyền ngược, ta được thuật toán sau.

::: algorithm Thuật toán 06.25 (Hạ gradient ngẫu nhiên lô nhỏ)
**Đầu vào.** Dữ liệu $(x_i,y_i)_{i=1}^n$; điểm đầu $\theta_0$; kích thước lô $b$; lịch bước $(\eta_k)$; số bước $K$; tập xác thực; chu kỳ đánh giá $T$.

**Đầu ra.** Tham số đã lưu có mất mát xác thực nhỏ nhất; nếu $K<T$, tham số $\theta_K$.

Với $k=0,1,\ldots,K-1$:

1. Chọn lô $B_k$ gồm $b$ chỉ số theo một trong hai cách của Định nghĩa 06.23, độc lập với các lô $B_0,\ldots,B_{k-1}$.
2. Tính $\widehat g_k=\tfrac1b\sum_{i\in B_k}\nabla\ell_i(\theta_k)$ bằng lan truyền ngược trên từng mẫu của lô.
3. Cập nhật $\theta_{k+1}=\theta_k-\eta_k\widehat g_k$.
4. Nếu $k+1$ chia hết cho $T$: tính mất mát trung bình trên tập xác thực; nếu nhỏ hơn mọi lần trước, lưu $\theta_{k+1}$.

**Điều kiện dừng.** Dừng sau $K$ bước.

**Chi phí.** Mỗi bước $O(bp)$, không phụ thuộc $n$; một lượt dữ liệu gồm $n/b$ bước, tổng $O(np)$. **Bộ nhớ.** Kích hoạt của $b$ mẫu.
:::

Thuật toán 06.25 là Thuật toán 8.1 của Goodfellow và cộng sự (2016, tr. 294) thêm bước lưu tham số tốt nhất theo tập xác thực. Mệnh đề sau cho điều kiện để dãy của Thuật toán 06.25 thỏa (H6) và (H6b) với $g_k=\widehat g_k$.

::: proposition Mệnh đề 06.26 (Giả thiết (H6), (H6b) cho Thuật toán 06.25) — chứng minh đầy đủ
**Giả thiết.**

- **Thuật toán.** Dãy của Thuật toán 06.25, với lô $B_k$ chọn độc lập với lịch sử như bước 1.
- **Khả vi.** Mọi $\ell_i$ khả vi tại mọi điểm lặp.
- **Vùng.** Mọi điểm lặp nằm trong một tập $C$ với $\tau_1^2:=\sup_{\theta\in C}\operatorname{tr}\Sigma(\theta)<\infty$.

**Kết luận.**

1. (H6) đúng.
2. (H6b) đúng với $\tau^2=\dfrac{\tau_1^2}b$ khi lô chọn có hoàn lại, và với $\tau^2=\dfrac{\tau_1^2}b\cdot\dfrac{n-b}{n-1}$ khi lô chọn không hoàn lại.
:::

::: proof Chứng minh Mệnh đề 06.26
**Lộ trình.** Cố định lịch sử, áp Định lý 06.24 tại $\theta_k$, rồi chặn $\operatorname{tr}\Sigma(\theta_k)$ trên $C$.

**Bước 1 (cố định lịch sử).** Khi biết $\mathcal F_k$, $\theta_k$ là một điểm cố định của $C$, còn $B_k$ được chọn độc lập với $\mathcal F_k$, nên vẫn có phân phối đều như trong Định nghĩa 06.23.

**Bước 2 (áp Định lý 06.24 có điều kiện).** Định lý 06.24 với $\theta=\theta_k$ cho $\mathbb E[\widehat g_k\mid\mathcal F_k]=\nabla F(\theta_k)$, tức (H6), và cho $\mathbb E[\lVert\widehat g_k-\nabla F(\theta_k)\rVert^2\mid\mathcal F_k]$ bằng $\operatorname{tr}\Sigma(\theta_k)/b$ hoặc $\operatorname{tr}\Sigma(\theta_k)/b\cdot\tfrac{n-b}{n-1}$.

**Bước 3 (chặn trên $C$).** Vì $\theta_k\in C$, $\operatorname{tr}\Sigma(\theta_k)\le\tau_1^2$, cho (H6b) với hằng số đã nêu. $\square$
:::

Với mục tiêu như dữ liệu bốn điểm, $\operatorname{tr}\Sigma(\theta)$ tăng không bị chặn theo $\theta$, nên (H6b) chỉ đúng trên một vùng bị chặn.

::: remark Nhận xét 06.27 (Thực hành so với giả thiết)
1. **Khả vi.** Với mạng ReLU, $\ell_i$ không khả vi tại $\theta$ khi có $j$ với $[W_1]_{j,:}x_i+[b_1]_j=0$, $e_i\ne0$ và $[w_2]_j\ne0$ (Nhận xét 06.13). Các tham số đó nằm trong hợp của $m$ siêu phẳng $\{\theta:[W_1]_{j,:}x_i+[b_1]_j=0\}$, một tập có độ đo không; tại đó vector của lan truyền ngược là kết quả của quy ước $\sigma'(0)=0$.
2. **Xáo trộn theo lượt.** Nhiều cài đặt xáo trộn (shuffle) dữ liệu một lần rồi chia thành $n/b$ lô rời nhau cho mỗi lượt (Goodfellow và cộng sự 2016, tr. 280–281). Khi đó các lô trong một lượt phụ thuộc nhau và (H6) không đúng chính xác; các định lý hội tụ của bài mô tả biến thể chọn lô độc lập.
3. **Đầu ra là tham số tốt nhất theo tập xác thực.** Các định lý hội tụ chặn đại lượng của dãy lặp, còn Thuật toán 06.25 trả về tham số tốt nhất theo tập xác thực, tức nhắm tới $R$.
:::

**Trong học máy.** Theo Goodfellow và cộng sự (2016, tr. 295), tính chất quan trọng nhất của SGD là thời gian tính cho một cập nhật không tăng theo số mẫu huấn luyện; Định lý 06.24 cho thêm rằng gradient lô nhỏ đúng theo trung bình.

::: exercise Bài tập 06.4 (Gradient lô nhỏ chọn có hoàn lại trên dữ liệu bốn điểm)
Cho dữ liệu bốn điểm $x=(-1,0,1,2)$, $y=(1,0,1,4)$, mô hình $wx+c$, $\theta_0=(0,0)$, với bốn gradient mẫu $(1,-1)$, $(0,0)$, $(-1,-1)$, $(-8,-4)$ và $\nabla F(\theta_0)=(-2;\ -1{,}5)$.

1. Với lô $b=2$ chọn có hoàn lại, liệt kê $16$ cặp có thứ tự $(I_1,I_2)$ theo các giá trị của $\lVert\widehat g-\nabla F(\theta_0)\rVert^2$ và tính trung bình. So với kết luận 1 của Định lý 06.24.
2. Giải thích vì sao trung bình này lớn hơn giá trị $\tfrac{59}{12}$ của chọn không hoàn lại, dựa vào các cặp $I_1=I_2$.
3. Với $b$ cố định, tính giới hạn của hệ số $\tfrac{n-b}{n-1}$ khi $n\to\infty$ và rút ra kết luận về hai cách chọn khi $n$ lớn.
:::

::: hint
Viết $a_i=g_i-\nabla F(\theta_0)$, rồi $\widehat g-\nabla F=\tfrac12(a_{I_1}+a_{I_2})$. Bốn cặp có $I_1=I_2$ cho $\lVert a_i\rVert^2$; mười hai cặp còn lại tạo thành sáu cặp không thứ tự, mỗi cặp xuất hiện hai lần.
:::

::: solution
1. Các sai lệch là $a_1=(3;\ 0{,}5)$, $a_2=(2;\ 1{,}5)$, $a_3=(1;\ 0{,}5)$, $a_4=(-6;\ -2{,}5)$, với $\lVert a_i\rVert^2=9{,}25;\ 6{,}25;\ 1{,}25;\ 42{,}25$.

- Bốn cặp $I_1=I_2=i$ cho $\lVert a_i\rVert^2$, tổng $59$.
- Mười hai cặp $I_1\ne I_2$ là sáu lô của Ví dụ 06.18, mỗi lô hai lần, với các giá trị $7{,}25;\ 4{,}25;\ 3{,}25;\ 3{,}25;\ 4{,}25;\ 7{,}25$, tổng $2\cdot29{,}5=59$.

Trung bình trên $16$ cặp là $\tfrac{59+59}{16}=\tfrac{59}8$, đúng bằng $\tfrac{\operatorname{tr}\Sigma(\theta_0)}b=\tfrac{59/4}2$.

2. Các cặp $I_1=I_2$ đưa cùng một mẫu vào lô hai lần, nên $\widehat g=g_i$ và sai lệch bình phương là $\lVert a_i\rVert^2$, có trung bình $\tfrac{59}4$ trên bốn cặp này, lớn hơn trung bình $\tfrac{59}{12}$ trên các cặp hai mẫu khác nhau. Chọn không hoàn lại loại bốn cặp này. Về công thức, $\tfrac{59}{12}=\tfrac{59}8\cdot\tfrac23$ với $\tfrac{n-b}{n-1}=\tfrac23$.

3. $\tfrac{n-b}{n-1}\to1$ khi $n\to\infty$. Với $n=10^6$ và $b=100$, hệ số bằng $0{,}9999$, nên trong thực hành hai cách chọn cho cùng sai số; khác biệt chỉ đáng kể khi $b$ là một phần đáng kể của $n$.

**Kiểm tra lại.** $\tfrac{59}8\approx7{,}375$ và $\tfrac{59}{12}\approx4{,}917$, tỉ số $\tfrac23$.
:::

Đổi lại chi phí $O(bp)$ mỗi bước, ở Ví dụ 06.17 một bước SGD có thể làm $F$ tăng, và kỳ vọng của $F$ sau bước đó lớn hơn giá trị sau một bước hạ gradient đầy đủ.

## 8. Tốc độ hội tụ dưới nhiễu và dừng sớm

Với hạ gradient đầy đủ, $\nabla F(\theta^*)=0$, nên một bước xuất phát từ điểm cực tiểu $\theta^*$ đứng yên. Với gradient lô nhỏ, tính chất này mất, và Bổ đề 06.18 cùng Định lý 06.19 không còn áp dụng nguyên văn.

### 8.1. Nhiễu của gradient lô nhỏ tại điểm cực tiểu

Ví dụ sau đo hiện tượng đó trên dữ liệu bốn điểm.

::: example Ví dụ 06.19 (Một bước SGD từ điểm cực tiểu của dữ liệu bốn điểm)
**Dữ kiện.** Dữ liệu bốn điểm $x=(-1,0,1,2)$, $y=(1,0,1,4)$, $F(\theta)=\tfrac14\sum_i\tfrac12(wx_i+c-y_i)^2$; lô $b=2$ chọn đều không hoàn lại; bước $\eta=\tfrac14$; điểm xuất phát $\theta_0=\theta^*$.

**Điểm cực tiểu.** $y=1+x+\zeta$ với $\zeta=(1,-1,-1,1)$, và $\zeta$ trực giao với $(1,1,1,1)$ và với $x$. Do đó phương trình chuẩn cho $\theta^*=(w,c)=(1,1)$, với phần dư $wx_i+c-y_i=-\zeta_i$ và $F^*=\tfrac14\cdot\tfrac12\cdot4=\tfrac12$. Hessian là $H=\begin{pmatrix}1{,}5&0{,}5\\0{,}5&1\end{pmatrix}$, với trị riêng $\tfrac{5\mp\sqrt5}4$, tức $\mu\approx0{,}691$ và $L\approx1{,}809$; vì vậy $\eta=\tfrac14\le\tfrac1L$.

**Gradient mẫu tại $\theta^*$.** $\nabla\ell_i(\theta^*)=-\zeta_i(x_i,1)$ cho $(1,-1)$, $(0,1)$, $(1,1)$, $(-2,-1)$, với trung bình $0=\nabla F(\theta^*)$ và $\operatorname{tr}\Sigma(\theta^*)=\tfrac14(2+1+2+5)=\tfrac52$.

**Sai số của gradient lô nhỏ.** Định lý 06.24 cho $\mathbb E\lVert\widehat g\rVert^2=\tfrac52\cdot\tfrac12\cdot\tfrac{4-2}{4-1}=\tfrac56$. Liệt kê sáu lô cho $\lVert\widehat g\rVert^2=0{,}25;\ 1;\ 1{,}25;\ 1{,}25;\ 1;\ 0{,}25$, trung bình $\tfrac56$. Do đó $\mathbb E\lVert\theta_1-\theta^*\rVert^2=\eta^2\cdot\tfrac56=\tfrac5{96}$.

**Giá trị mục tiêu sau một bước.** Sáu lô cho $F(\theta_1)=\tfrac{131}{256},\ \tfrac{35}{64},\ \tfrac{143}{256},\ \tfrac{143}{256},\ \tfrac{35}{64},\ \tfrac{131}{256}$, với trung bình

$$
\begin{aligned}
&\mathbb E\,F(\theta_1)=\frac{69}{128}\approx0{,}539\\
&\quad>F^*=\frac12 .
\end{aligned}
$$

**Kiểm tra lại.** Vì $F$ bậc hai và $\nabla F(\theta^*)=0$, $F(\theta_1)-F^*=\tfrac12(\theta_1-\theta^*)^\top H(\theta_1-\theta^*)=\tfrac{\eta^2}2\widehat g^\top H\widehat g$. Sáu giá trị $\widehat g^\top H\widehat g$ là $0{,}375;\ 1{,}5;\ 1{,}875;\ 1{,}875;\ 1{,}5;\ 0{,}375$, trung bình $1{,}25$, nên $\mathbb EF(\theta_1)-F^*=\tfrac1{32}\cdot1{,}25=\tfrac5{128}$ và $\mathbb EF(\theta_1)=\tfrac{64+5}{128}=\tfrac{69}{128}$.
:::

Ví dụ là phản ví dụ cho khẳng định "SGD giảm $F$ theo kỳ vọng ở mọi bước". Gradient đầy đủ tiến về $0$ khi dãy tới nghiệm, nhưng gradient lô nhỏ tại nghiệm vẫn khác $0$, vì nó chỉ bằng $\nabla F$ theo trung bình (Goodfellow và cộng sự 2016, tr. 294). SGD chỉ còn giữ một bất đẳng thức một bước có thêm số hạng nhiễu.

::: proposition Mệnh đề 06.28 (Bất đẳng thức một bước có nhiễu) — chứng minh đầy đủ
**Giả thiết.**

- **(H2).** $\nabla F$ là $L$-Lipschitz trên một tập lồi chứa $\theta_k$ và mọi giá trị có thể của $\theta_{k+1}=\theta_k-\eta\widehat g_k$.
- **Gradient ngẫu nhiên.** (H6) và (H6b) tại bước $k$, với $g_k=\widehat g_k$.
- **Bước.** $\eta>0$ không phụ thuộc lô $B_k$.

**Kết luận.**

$$
\begin{aligned}
&\mathbb E\bigl[F(\theta_{k+1})\mid\mathcal F_k\bigr]\\
&\quad\le F(\theta_k)+\tfrac{L\eta^2}2\tau^2\\
&\qquad-\eta\bigl(1-\tfrac{L\eta}2\bigr)\\
&\qquad\cdot\lVert\nabla F(\theta_k)\rVert^2 .
\end{aligned}
\tag{8.1}
$$
:::

::: proof Chứng minh Mệnh đề 06.28
**Lộ trình.** Áp cận trên bậc hai cho từng lần chọn lô, rồi lấy kỳ vọng có điều kiện và tách phương sai.

Viết $\nabla_k=\nabla F(\theta_k)$.

**Bước 1 (cận trên bậc hai cho từng lần chọn).** Bước 1 của chứng minh Bổ đề 06.18 với $\theta=\theta_k$ và $\theta'=\theta_k-\eta\widehat g_k$ cho

$$
\begin{aligned}
&F(\theta_{k+1})\le F(\theta_k)-\eta\,\nabla_k^\top\widehat g_k\\
&\qquad+\frac{L\eta^2}2\lVert\widehat g_k\rVert^2 .
\end{aligned}
$$

**Bước 2 (kỳ vọng có điều kiện).** Khi biết $\mathcal F_k$, $\theta_k$ và $\nabla_k$ cố định. (H6) cho $\mathbb E[\nabla_k^\top\widehat g_k\mid\mathcal F_k]=\nabla_k^\top\nabla_k=\lVert\nabla_k\rVert^2$. Tách phương sai rồi dùng (H6b):

$$
\begin{aligned}
&\mathbb E\bigl[\lVert\widehat g_k\rVert^2\mid\mathcal F_k\bigr]\\
&\quad=\lVert\nabla_k\rVert^2\\
&\qquad+\mathbb E\bigl[\lVert\widehat g_k-\nabla_k\rVert^2\mid\mathcal F_k\bigr]\\
&\quad\le\lVert\nabla_k\rVert^2+\tau^2 .
\end{aligned}
$$

Đẳng thức tách đúng vì số hạng chéo $2\nabla_k^\top\mathbb E[\widehat g_k-\nabla_k\mid\mathcal F_k]$ bằng $0$ theo (H6).

**Bước 3 (ghép).** Lấy kỳ vọng có điều kiện hai vế của Bước 1 và thế Bước 2:

$$
\begin{aligned}
&\mathbb E[F(\theta_{k+1})\mid\mathcal F_k]\\
&\quad\le F(\theta_k)-\eta\lVert\nabla_k\rVert^2\\
&\qquad+\frac{L\eta^2}2\bigl(\lVert\nabla_k\rVert^2+\tau^2\bigr),
\end{aligned}
$$

chính là (8.1). $\square$
:::

Mệnh đề 06.28 là Bước 1–2 của chứng minh Định lý 05b.43 và là bất đẳng thức một bước của Nhận xét 05.40. Vế phải nhỏ hơn $F(\theta_k)$ chỉ khi $\bigl(1-\tfrac{L\eta}2\bigr)\lVert\nabla F(\theta_k)\rVert^2>\tfrac{L\eta}2\tau^2$, tức khi gradient đủ lớn so với nhiễu. So với Bổ đề 06.18, nó có thêm số hạng $\tfrac{L\eta^2}2\tau^2$ không phụ thuộc gradient, và số hạng này là lý do SGD có thể làm $F$ tăng theo kỳ vọng. Trên Ví dụ 06.19, ta kiểm tra được hai vế.

- Tại $\theta^*$: $\nabla F=0$ và (H6b) đúng với $\tau^2=\tfrac56$, nên vế phải bằng $\tfrac12+\tfrac{L}{2}\cdot\tfrac1{16}\cdot\tfrac56\approx0{,}547$, lớn hơn giá trị thật $\tfrac{69}{128}\approx0{,}539$.
- Tại $\theta_0=(0,0)$: $\lVert\nabla F\rVert^2=6{,}25$ và $\tau^2=\tfrac{59}{12}$, nên vế phải bằng $\tfrac94-\tfrac14\bigl(1-\tfrac L8\bigr)\cdot6{,}25+\tfrac L{32}\cdot\tfrac{59}{12}\approx1{,}3188$, lớn hơn $\tfrac{503}{384}\approx1{,}3099$ của Ví dụ 06.17.

::: remark Nhận xét 06.29 (Khi nhiễu tại nghiệm bằng $0$)
Điều kiện $\operatorname{tr}\Sigma(\theta^*)>0$ là cần cho hiện tượng của Ví dụ 06.19. Khi mọi mẫu được khớp đúng tại $\theta^*$, như $\theta_A$ trên XOR với $F(\theta_A)=0$ (Ví dụ 06.3), mọi gradient mẫu tại đó bằng $0$, nhiễu tại nghiệm bằng $0$ và SGD đứng yên tại nghiệm. Ngược lại, khi $\operatorname{tr}\Sigma(\theta^*)>0$ và $b<n$ (với chọn không hoàn lại), $\mathbb E\lVert\widehat g\rVert^2>0$ tại $\theta^*$, nên dãy SGD bước hằng dao động quanh $\theta^*$ và không dừng ở đó.
:::

### 8.2. Bước hằng trên hàm lồi mạnh và mức nhiễu nền

Với hàm lồi mạnh, ta theo dõi khoảng cách tới nghiệm thay cho giá trị $F$.

::: theorem Định lý 06.30 (SGD bước hằng trên hàm lồi mạnh; Định lý 05b.36) — chứng minh đầy đủ
**Giả thiết.**

- **(H2) với $C=\mathbb R^p$.** $\nabla F$ là $L$-Lipschitz trên $\mathbb R^p$.
- **(H3).** $F$ lồi mạnh với hằng số $\mu>0$, tức $F(\theta')\ge F(\theta)+\nabla F(\theta)^\top(\theta'-\theta)+\tfrac\mu2\lVert\theta'-\theta\rVert^2$ với mọi $\theta,\theta'$.
- **(H4).** $F$ có điểm cực tiểu $\theta^*$.
- **Gradient ngẫu nhiên và bước.** (H6), (H6b) tại mọi điểm lặp; $\theta_0$ tất định, $D=\lVert\theta_0-\theta^*\rVert$; bước hằng $0<\eta\le\tfrac1L$.

**Kết luận.** Với mọi $k\ge0$,

$$
\begin{aligned}
&\mathbb E\lVert\theta_k-\theta^*\rVert^2\\
&\quad\le(1-\eta\mu)^kD^2\\
&\qquad+\frac{\eta\tau^2}\mu .
\end{aligned}
\tag{8.2}
$$
:::

::: proof Chứng minh Định lý 06.30
**Lộ trình.** Khai triển bình phương khoảng cách sau một bước, dùng lồi mạnh và bổ đề giảm để được một đệ quy co, rồi giải đệ quy.

Viết $D_k=\lVert\theta_k-\theta^*\rVert$ (nên $D_0=D$), $\Delta_k=F(\theta_k)-F(\theta^*)$ và $\nabla_k=\nabla F(\theta_k)$.

**Bước 1 (khai triển bình phương).** Từ $\theta_{k+1}-\theta^*=(\theta_k-\theta^*)-\eta\widehat g_k$,

$$
\begin{aligned}
&D_{k+1}^2=D_k^2-2\eta\,\widehat g_k^\top(\theta_k-\theta^*)\\
&\qquad+\eta^2\lVert\widehat g_k\rVert^2 .
\end{aligned}
$$

Lấy kỳ vọng có điều kiện theo $\mathcal F_k$ và dùng (H6), (H6b) như Bước 2 của Mệnh đề 06.28:

$$
\begin{aligned}
&\mathbb E[D_{k+1}^2\mid\mathcal F_k]\\
&\quad\le D_k^2-2\eta\,\nabla_k^\top(\theta_k-\theta^*)\\
&\qquad+\eta^2\bigl(\lVert\nabla_k\rVert^2+\tau^2\bigr).
\end{aligned}
$$

**Bước 2 (hai cận từ (H3) và (H2)).** (H3) với $\theta=\theta_k$, $\theta'=\theta^*$ cho $F(\theta^*)\ge F(\theta_k)+\nabla_k^\top(\theta^*-\theta_k)+\tfrac\mu2D_k^2$, tức $\nabla_k^\top(\theta_k-\theta^*)\ge \Delta_k+\tfrac\mu2D_k^2$. Bổ đề 06.18 với $\eta=\tfrac1L$ và $F(\theta^*)\le F(\theta_k-\tfrac1L\nabla_k)$ cho $F(\theta^*)\le F(\theta_k)-\tfrac1{2L}\lVert\nabla_k\rVert^2$, tức $\lVert\nabla_k\rVert^2\le2L\Delta_k$. Thế vào Bước 1:

$$
\begin{aligned}
&\mathbb E[D_{k+1}^2\mid\mathcal F_k]\\
&\quad\le D_k^2-2\eta\Delta_k-\eta\mu D_k^2\\
&\qquad+2L\eta^2\Delta_k+\eta^2\tau^2\\
&\quad=(1-\eta\mu)D_k^2\\
&\qquad-2\eta(1-L\eta)\Delta_k\\
&\qquad+\eta^2\tau^2 .
\end{aligned}
$$

**Bước 3 (bỏ số hạng không dương).** Vì $\eta\le\tfrac1L$ và $\Delta_k\ge0$, số hạng $-2\eta(1-L\eta)\Delta_k$ không dương. Lấy kỳ vọng toàn phần, với $a_k=\mathbb E D_k^2$:

$$
a_{k+1}\le(1-\eta\mu)a_k+\eta^2\tau^2 .
$$

**Bước 4 (giải đệ quy).** Vì $0<\eta\mu\le\tfrac\mu L\le1$, hệ số $1-\eta\mu$ thuộc $[0,1)$. Quy nạp theo $k$ rồi chặn tổng cấp số nhân cho

$$
\begin{aligned}
&a_k\le(1-\eta\mu)^ka_0\\
&\qquad+\eta^2\tau^2\sum_{j=0}^{k-1}(1-\eta\mu)^j\\
&\quad\le(1-\eta\mu)^kD^2+\frac{\eta^2\tau^2}{\eta\mu}\\
&\quad=(1-\eta\mu)^kD^2+\frac{\eta\tau^2}\mu .
\end{aligned}
$$

Bất đẳng thức chứa tổng $\sum_{j=0}^{k-1}$ là quy nạp từ đệ quy ở Bước 3; cận sau đó dùng $a_0=D^2$ và $\sum_{j\ge0}(1-\eta\mu)^j=\tfrac1{\eta\mu}$. Ta được (8.2). $\square$
:::

Số hạng $\tfrac{\eta\tau^2}\mu$ của (8.2), gọi là *mức nhiễu nền* (noise floor), không giảm theo $k$; với $\tau=0$, định lý cho hạ gradient đầy đủ với hệ số co $1-\eta\mu$. Giảm $\eta$ hạ mức nhiễu nền nhưng đưa hệ số co $1-\eta\mu$ về gần $1$, nên không bước hằng nào vừa co nhanh vừa có mức nhiễu nền thấp.

Trên ví dụ ba quan sát với bước $\eta=0{,}1$ và $\theta_0=0$, (H2), (H3) và (H6b) đúng trên cả trục số với $\mu=L=1$, $\tau^2=\tfrac83$. Ví dụ 05b.19 cho cận (8.2) là $0{,}9^k+0{,}267$, còn giá trị chính xác $0{,}81^k+\tfrac8{57}(1-0{,}81^k)$ tiến về $\tfrac8{57}\approx0{,}140$. Bước hằng vì vậy chỉ đưa SGD tới một lân cận bán kính bậc $\sqrt{\eta\tau^2/\mu}$ của nghiệm. Để thu nhỏ lân cận, ta giảm bước hoặc tăng kích thước lô, vì $\tau^2$ giảm theo $1/b$ (Mệnh đề 06.26); để hội tụ tới chính nghiệm, bước phải giảm dần.

### 8.3. Bước giảm dần cho hàm lồi mạnh

Định lý sau bỏ (H2), thay (H6b) bằng (H6a) và chọn bước giảm theo $1/k$ với hằng số lồi mạnh đã biết.

::: theorem Định lý 06.31 (Bước giảm dần $\tfrac1{\mu(k+1)}$ cho hàm lồi mạnh; Định lý 05b.39) — chứng minh đầy đủ
**Giả thiết.**

- **(H3), (H4).** $F$ lồi mạnh với hằng số $\mu$ và có điểm cực tiểu $\theta^*$.
- **Gradient ngẫu nhiên.** (H6), và (H6a) với hằng số $G^2$ trên một vùng chứa mọi điểm lặp.
- **Bước.** $\eta_k=\dfrac1{\mu(k+1)}$.

**Kết luận.** Với mọi $k\ge1$,

$$
\mathbb E\lVert\theta_k-\theta^*\rVert^2\le\frac{G^2}{\mu^2k}.
\tag{8.3}
$$
:::

::: proof Chứng minh Định lý 06.31
**Lộ trình.** Lập đệ quy cho $\mathbb E\lVert\theta_k-\theta^*\rVert^2$ như Định lý 06.30 nhưng dùng (H6a), rồi quy nạp theo $k$.

**Bước 1 (đệ quy).** Như Bước 1 của chứng minh Định lý 06.30 nhưng dùng (H6a) cho số hạng cuối: $\mathbb E[D_{k+1}^2\mid\mathcal F_k]\le D_k^2-2\eta_k\nabla_k^\top(\theta_k-\theta^*)+\eta_k^2G^2$. Vì $\nabla F(\theta^*)=0$, (H3) áp hai lần (tại $(\theta_k,\theta^*)$ và tại $(\theta^*,\theta_k)$) rồi cộng cho $\nabla_k^\top(\theta_k-\theta^*)\ge\mu D_k^2$. Lấy kỳ vọng toàn phần, với $a_k=\mathbb E D_k^2$ và $\eta_k\mu=\tfrac1{k+1}$:

$$
\begin{aligned}
&a_{k+1}\le\Bigl(1-\frac2{k+1}\Bigr)a_k\\
&\qquad+\frac{G^2}{\mu^2(k+1)^2}.
\end{aligned}
$$

**Bước 2 (cơ sở quy nạp).** Với $k=0$, hệ số $1-2=-1\le0$ và $a_0\ge0$, nên $a_1\le\tfrac{G^2}{\mu^2}$, tức (8.3) với $k=1$.

**Bước 3 (bước quy nạp).** Giả sử $a_k\le\tfrac{G^2}{\mu^2k}$ với một $k\ge1$. Hệ số $1-\tfrac2{k+1}=\tfrac{k-1}{k+1}\ge0$, nên

$$
\begin{aligned}
&a_{k+1}\\
&\quad\le\frac{G^2}{\mu^2}\Bigl(\frac{k-1}{k(k+1)}+\frac1{(k+1)^2}\Bigr)\\
&\quad\le\frac{G^2}{\mu^2}\cdot\frac1{k+1},
\end{aligned}
$$

trong đó $\tfrac{k-1}{k(k+1)}+\tfrac1{(k+1)^2}\le\tfrac1{k+1}$ tương đương $\tfrac{k-1}k+\tfrac1{k+1}\le1$, tức $\tfrac1{k+1}\le\tfrac1k$. $\square$
:::

Cận (8.3) về $0$ với tốc độ $O(1/k)$ theo kỳ vọng và không chứa $D$. Định lý 06.31 không còn mức nhiễu nền, đổi lại bước phải dùng đúng hằng số $\mu$ và (H6a) chặn cả phần tín hiệu của gradient; dưới (H3), gradient không bị chặn trên $\mathbb R^p$, nên (H6a) chỉ đặt được trên một vùng.

**Trong học máy.** Lịch bước $\eta_t=\tfrac1{\lambda(t+t_0)}$ của SGD trên RCV1 (Ví dụ 05.25) có cùng dạng với Định lý 06.31, với hệ số chính quy hóa $\lambda$ đóng vai $\mu$; hằng số $t_0$ được chọn để các cập nhật đầu cùng cỡ với độ lớn của trọng số (Bottou và Bousquet 2011, tr. 363).

Ví dụ sau đặt hai lịch bước cạnh nhau.

::: example Ví dụ 06.20 (Bước $\tfrac1{k+1}$ trên ví dụ ba quan sát)
**Dữ kiện.** Ví dụ ba quan sát: $y=(-1,1,3)$, $F(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, $\mu=1$, $\widehat g=\theta-y_I$, $\theta_0=0$; bước $\eta_k=\tfrac1{k+1}$.

**Dãy lặp.** $\theta_1=\theta_0-1\cdot(\theta_0-y_{I_0})=y_{I_0}$, và $\theta_{k+1}=\theta_k-\tfrac{\theta_k-y_{I_k}}{k+1}=\tfrac{k\theta_k+y_{I_k}}{k+1}$. Quy nạp cho $\theta_k$ là trung bình của $k$ quan sát được rút đầu tiên.

**Giá trị chính xác.** Trung bình của $k$ quan sát độc lập có phương sai $\tfrac{8/3}k$, nên $\mathbb E(\theta_k-1)^2=\tfrac8{3k}$.

**Cận của Định lý 06.31.** Mọi $\theta_k$ với $k\ge1$ nằm trong $[-1,3]$, cũng như $\theta_0=0$. Trên đoạn này, $\mathbb E[\widehat g^2\mid\theta]=(\theta-1)^2+\tfrac83\le4+\tfrac83=\tfrac{20}3$, nên (H6a) đúng với $G^2=\tfrac{20}3$ và cận là $\tfrac{20}{3k}$, gấp $2{,}5$ lần giá trị chính xác.

**So sánh với bước hằng $0{,}1$** (Ví dụ 05b.19).

| $\mathbb E(\theta_k-1)^2$ | $k=10$ | $k=16$ | $k=20$ |
|---|---:|---:|---:|
| bước hằng $0{,}1$ | $0{,}2449$ | $0{,}1699$ | $0{,}1531$ |
| bước $\tfrac1{k+1}$ | $0{,}2667$ | $0{,}1667$ | $0{,}1333$ |

**Đọc bảng.** Bước hằng tốt hơn ở các bước đầu vì giảm nhanh theo $0{,}81^k$, nhưng dừng ở giới hạn dương $\tfrac8{57}$; bước giảm dần tốt hơn từ $k=16$.

**Kiểm tra lại.** Tại $k=1$, $\theta_1=y_{I_0}$ cho $(\theta_1-1)^2=4,0,4$, trung bình $\tfrac83=\tfrac8{3\cdot1}$.
:::

::: remark Nhận xét 06.32 (Các lịch bước khác)
1. Lịch chia đôi bước theo pha giữ bước hằng, bắt đầu từ $\eta_0\le\tfrac1L$, cho tới khi đạt mức nhiễu nền rồi chia đôi bước; nó cho tổng số bước $O\bigl(\tfrac1{\mu\eta_0}\log\tfrac{D^2}\varepsilon+\tfrac{\tau^2}{\mu^2\varepsilon}\bigr)$ dưới (H6b) (Hệ quả 05b.38) và không cần (H6a).
2. Điều kiện đủ cổ điển cho hội tụ của SGD là $\sum_k\eta_k=\infty$ và $\sum_k\eta_k^2<\infty$ (Goodfellow và cộng sự 2016, (8.12)–(8.13), tr. 294–295); bước $\tfrac1{\mu(k+1)}$ thỏa cả hai.
:::

### 8.4. Hạ gradient ngẫu nhiên cho hàm không lồi

Mạng không thỏa (H3), nên Định lý 06.30 và 06.31 không áp dụng cho mạng. Bỏ (H3), giữ (H2) và cộng bất đẳng thức một bước (8.1) theo $K$ bước như chứng minh Định lý 06.19, ta được định lý sau.

::: theorem Định lý 06.33 (SGD trên hàm không lồi; Định lý 05b.43) — chứng minh đầy đủ
**Giả thiết.**

- **(H0), (H2).** $F_{\inf}>-\infty$; $\nabla F$ là $L$-Lipschitz trên một tập lồi chứa mọi điểm lặp có thể.
- **Gradient ngẫu nhiên.** (H6), (H6b) tại mọi bước.
- **Điểm đầu và bước.** $\theta_0$ tất định, $\Delta_0=F(\theta_0)-F_{\inf}$; bước hằng $0<\eta\le\tfrac1L$.

**Kết luận.** Với mọi $K\ge1$,

$$
\begin{aligned}
&\frac1K\sum_{k<K}\mathbb E\lVert\nabla F(\theta_k)\rVert^2\\
&\quad\le\frac{2\Delta_0}{\eta K}+L\eta\tau^2 .
\end{aligned}
\tag{8.4}
$$

Nếu chỉ số $\tilde k$ được chọn đều trên $\{0,\ldots,K-1\}$, độc lập với dãy, thì $\mathbb E\lVert\nabla F(\theta_{\tilde k})\rVert^2$ có cùng cận.
:::

::: proof Chứng minh Định lý 06.33
**Lộ trình.** Cộng bất đẳng thức một bước theo $K$ bước như chứng minh Định lý 06.19, với số hạng nhiễu cộng dồn.

**Bước 1 (bất đẳng thức một bước).** Mệnh đề 06.28 cho (8.1). Vì $\eta\le\tfrac1L$, $1-\tfrac{L\eta}2\ge\tfrac12$. Trừ $F_{\inf}$ hai vế và lấy kỳ vọng toàn phần, với $\bar\Delta_k=\mathbb E[F(\theta_k)]-F_{\inf}$:

$$
\begin{aligned}
&\bar\Delta_{k+1}\le\bar\Delta_k\\
&\qquad-\frac\eta2\,\mathbb E\lVert\nabla F(\theta_k)\rVert^2+\frac{L\eta^2\tau^2}2 .
\end{aligned}
$$

**Bước 2 (triệt tiêu liên tiếp).** Cộng $K$ bất đẳng thức với $k=0,\ldots,K-1$:

$$
\begin{aligned}
&\frac\eta2\sum_{k<K}\mathbb E\lVert\nabla F(\theta_k)\rVert^2\\
&\quad\le\bar\Delta_0-\bar\Delta_K+\frac{KL\eta^2\tau^2}2\\
&\quad\le\Delta_0+\frac{KL\eta^2\tau^2}2,
\end{aligned}
$$

vì $\bar\Delta_K\ge0$ theo (H0) và $\bar\Delta_0=\Delta_0$ do $\theta_0$ tất định.

**Bước 3 (chia).** Nhân hai vế với $\tfrac2{\eta K}$ được (8.4). Phần về $\tilde k$: $\mathbb E\lVert\nabla F(\theta_{\tilde k})\rVert^2=\tfrac1K\sum_k\mathbb E\lVert\nabla F(\theta_k)\rVert^2$ vì $\tilde k$ đều và độc lập với dãy. $\square$
:::

Số hạng $L\eta\tau^2$ của (8.4) không giảm theo $K$. Với $\tau=0$ và $\eta=\tfrac1L$, (8.4) cho lại Định lý 06.19 ở dạng trung bình. Với $\tau>0$ và bước hằng, vế phải không về $0$ khi $K\to\infty$; để cận nhỏ, bước phải được chọn theo số bước $K$ định trước.

::: corollary Hệ quả 06.34 (Chọn bước theo số bước; Hệ quả 05b.44) — chứng minh đầy đủ
**Giả thiết.** Như Định lý 06.33, với $\tau>0$ và

$$
\eta=\min\Bigl\{\frac1L,\ \sqrt{\frac{2\Delta_0}{L\tau^2K}}\Bigr\}.
$$

**Kết luận.**

$$
\begin{aligned}
&\frac1K\sum_{k<K}\mathbb E\lVert\nabla F(\theta_k)\rVert^2\\
&\quad\le\frac{2L\Delta_0}K\\
&\qquad+2\sqrt{\frac{2L\Delta_0\tau^2}K}\\
&\quad=O\Bigl(\frac1{\sqrt K}\Bigr).
\end{aligned}
\tag{8.5}
$$
:::

::: proof Chứng minh Hệ quả 06.34
**Lộ trình.** Xét riêng hai nhánh của phép lấy min trong $\eta$ và chặn (8.4) trong mỗi nhánh.

**Bước 1 (nhánh căn).** Nếu $\eta=\sqrt{2\Delta_0/(L\tau^2K)}\le\tfrac1L$, hai số hạng của (8.4) bằng nhau: $\tfrac{2\Delta_0}{\eta K}=L\eta\tau^2=\sqrt{2L\Delta_0\tau^2/K}$, nên cận là $2\sqrt{2L\Delta_0\tau^2/K}$, không vượt vế phải của (8.5).

**Bước 2 (nhánh $\tfrac1L$).** Nếu $\eta=\tfrac1L\le\sqrt{2\Delta_0/(L\tau^2K)}$, bình phương hai vế cho $\tau^2\le\tfrac{2L\Delta_0}K$. Cận (8.4) bằng $\tfrac{2L\Delta_0}K+\tau^2$, và $\tau^2=\sqrt{\tau^2\cdot\tau^2}\le\sqrt{\tau^2\cdot2L\Delta_0/K}$, nên cận không vượt vế phải của (8.5). $\square$
:::

Cách chọn bước trong hệ quả cân bằng số hạng đầu, giảm khi $\eta$ tăng, với số hạng nhiễu, tăng khi $\eta$ tăng; nó cần biết $K$, $L$, $\tau^2$ và $\Delta_0$ hoặc một cận trên của $\Delta_0$. Tốc độ $O(1/\sqrt K)$ chậm hơn $O(1/K)$ của Định lý 06.19, và khi $K$ lớn, số hạng do nhiễu chi phối: tăng $K$ lên $100$ lần chỉ giảm cận khoảng $10$ lần.

**Trong học máy.** Với hàm kích hoạt trơn như $\tanh$ hay softplus, (H2) và (H6b) đúng trên mọi vùng bị chặn, nên Định lý 06.33 áp dụng cho rủi ro thực nghiệm của mạng khi mọi dãy lặp có thể nằm trong một vùng như vậy. Khi $K$ đủ lớn, bước của Hệ quả 06.34 bằng $\sqrt{2\Delta_0/(L\tau^2K)}$, tỉ lệ với $1/\sqrt K$. Trong thực hành, bước học được chọn bằng thử và theo dõi đường cong học, thường với lịch giảm tuyến tính tới một bước định trước rồi giữ hằng (Goodfellow và cộng sự 2016, (8.14), tr. 295).

::: remark Nhận xét 06.35 (Đại lượng được chặn và phạm vi của Định lý 06.33)
1. Cận là về bình phương chuẩn gradient; với chính chuẩn, bất đẳng thức Jensen cho $\tfrac1K\sum_k\mathbb E\lVert\nabla F(\theta_k)\rVert=O(K^{-1/4})$ khi chọn bước theo Hệ quả 06.34.
2. Như Định lý 06.19, định lý không phân biệt điểm yên ngựa với cực tiểu (Ví dụ 06.15).
3. Với SGD, dãy lặp ngẫu nhiên, nên tập lồi trong (H2) phải chứa mọi dãy lặp có thể; với mạng, điều kiện này nói chung không kiểm tra được trước khi chạy, còn với mục tiêu bậc hai, (H2) đúng trên $\mathbb R^p$.
:::

### 8.5. So sánh dưới tổng ngân sách cố định

Hệ quả 06.34 cho SGD tốc độ $O(1/\sqrt K)$, chậm hơn $O(1/K)$ của hạ gradient đầy đủ. Tuy nhiên, một bước SGD rẻ hơn một bước hạ gradient đầy đủ $n/b$ lần. Để so sánh công bằng, chúng ta cố định tổng ngân sách $\mathcal B$, đo bằng tổng số gradient mẫu được tính, rồi so hai cận trên.

::: proposition Mệnh đề 06.36 (Hai cận trên với cùng tổng ngân sách) — chứng minh đầy đủ
**Giả thiết.**

- **Mục tiêu.** $F$ thỏa (H0), và (H2) trên một tập lồi chứa mọi điểm lặp.
- **Nhiễu.** Gradient một mẫu chọn đều có phương sai tổng $\operatorname{tr}\Sigma(\theta)\le\tau_1^2$ trên vùng đó, với $\tau_1^2>0$.
- **Ngân sách.** Tổng ngân sách $\mathcal B$ gradient mẫu, $\mathcal B\ge n$; $b<n$.

**Kết luận.**

1. Hạ gradient đầy đủ chạy $K=\mathcal B/n$ bước, và Định lý 06.19 cho cận $\dfrac{2L\Delta_0n}{\mathcal B}$.
2. SGD với lô $b$ mẫu chọn có hoàn lại chạy $K=\mathcal B/b$ bước, với $\tau^2=\tau_1^2/b$, và Hệ quả 06.34 cho cận $\dfrac{2L\Delta_0b}{\mathcal B}+2\sqrt{\dfrac{2L\Delta_0\tau_1^2}{\mathcal B}}$.
3. Cận của SGD nhỏ hơn khi và chỉ khi $\mathcal B<\dfrac{L\Delta_0(n-b)^2}{2\tau_1^2}$. Với $L=\Delta_0=\tau_1^2=1$, điều kiện là $\mathcal B<\tfrac{(n-b)^2}2$, tức số lượt dữ liệu thỏa $\mathcal B/n<\tfrac{(n-b)^2}{2n}$.
:::

::: proof Chứng minh Mệnh đề 06.36
**Lộ trình.** Đổi tổng ngân sách thành số bước của mỗi phương pháp, thế vào hai cận, rồi so.

**Bước 1 (kết luận 1).** Mỗi bước hạ gradient đầy đủ tốn $n$ gradient mẫu, nên ngân sách cho $K=\mathcal B/n$ bước; thế vào (6.3).

**Bước 2 (kết luận 2).** Mỗi bước SGD tốn $b$ gradient mẫu, nên $K=\mathcal B/b$. Mệnh đề 06.26 với lô có hoàn lại cho (H6b) với $\tau^2=\tau_1^2/b$. Thế vào (8.5): $\tfrac{2L\Delta_0}K=\tfrac{2L\Delta_0b}{\mathcal B}$ và $\tfrac{\tau^2}K=\tfrac{\tau_1^2}b\cdot\tfrac b{\mathcal B}=\tfrac{\tau_1^2}{\mathcal B}$.

**Bước 3 (kết luận 3).** So hai cận:

$$
\begin{aligned}
&\tfrac{2L\Delta_0b}{\mathcal B}+2\sqrt{\tfrac{2L\Delta_0\tau_1^2}{\mathcal B}}<\tfrac{2L\Delta_0n}{\mathcal B}\\
&\iff2\sqrt{\tfrac{2L\Delta_0\tau_1^2}{\mathcal B}}<\tfrac{2L\Delta_0(n-b)}{\mathcal B}\\
&\iff\sqrt{2\tau_1^2\mathcal B}<\sqrt{L\Delta_0}\,(n-b)\\
&\iff\mathcal B<\frac{L\Delta_0(n-b)^2}{2\tau_1^2},
\end{aligned}
$$

trong đó phép tương đương dẫn tới $\sqrt{2\tau_1^2\mathcal B}<\sqrt{L\Delta_0}\,(n-b)$ nhân hai vế với $\tfrac{\mathcal B}{2\sqrt{L\Delta_0}}>0$, và phép tương đương cuối bình phương hai vế dương. $\square$
:::

Hai cận chặn hai đại lượng khác nhau: kết luận 1 chặn $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2$ của hạ gradient đầy đủ, kết luận 2 chặn $\frac1K\sum_{k<K}\mathbb E\lVert\nabla F(\theta_k)\rVert^2$ của SGD. Vì $\mathbb E\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le\frac1K\sum_{k<K}\mathbb E\lVert\nabla F(\theta_k)\rVert^2$, cận của kết luận 2 cũng chặn kỳ vọng của bình phương chuẩn gradient nhỏ nhất của SGD. Do đó, khi điều kiện của kết luận 3 thỏa, SGD có cận nhỏ hơn cho cùng một loại đại lượng, $\mathbb E\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2$ trên các điểm lặp tính được với ngân sách $\mathcal B$; với hạ gradient đầy đủ, dãy tất định nên kỳ vọng là chính giá trị.

**Trong học máy.** Số hạng chính của cận SGD trong Mệnh đề 06.36, $2\sqrt{2L\Delta_0\tau_1^2/\mathcal B}$, không phụ thuộc $b$; số hạng còn lại tăng theo $b$, nên dưới tổng ngân sách cố định, cận nghiêng về $b$ nhỏ. Tăng $b$ chỉ có lợi khi phần cứng xử lý song song cả lô trong cùng thời gian. Vì vậy, trong thực hành, kích thước lô được chọn theo bộ nhớ và mức song song của phần cứng (Goodfellow và cộng sự 2016, §8.1.3, tr. 279–280).

::: example Ví dụ 06.21 (Hai quy mô với ngân sách mười lượt dữ liệu)
**Dữ kiện.** Giả sử $L=\Delta_0=\tau_1^2=1$; tổng ngân sách $\mathcal B=10n$, tức mười lượt dữ liệu.

**Quy mô lớn: $n=10^9$, $b=10^3$.** Hạ gradient đầy đủ: $K=10$, cận $\tfrac{2n}{\mathcal B}=0{,}2$. SGD: $K=10^7$, $\tau^2=10^{-3}$, bước $\eta=\sqrt{2/(10^{-3}\cdot10^7)}\approx0{,}01414$, cận $\tfrac{2\cdot10^3}{10^{10}}+2\sqrt{\tfrac2{10^{10}}}=2\cdot10^{-7}+2{,}828\cdot10^{-5}\approx2{,}85\cdot10^{-5}$.

**Quy mô nhỏ: $n=10^3$, $b=10$.** Hạ gradient đầy đủ: $K=10$, cận $0{,}2$. SGD: $K=10^3$, $\tau^2=0{,}1$, $\eta\approx0{,}1414$, cận $0{,}002+0{,}02828\approx0{,}0303$.

**Ngưỡng.** Với các hằng số bằng $1$, ngưỡng $\tfrac{L\Delta_0(n-b)^2}{2\tau_1^2}$ của Mệnh đề 06.36 thành $\tfrac{(n-b)^2}2$. Với $n=10^3$, $b=10$: $\tfrac{(n-b)^2}2=\tfrac{990^2}2=490\,050$. Hạ gradient đầy đủ có cận nhỏ hơn khi $\mathcal B>490\,050$, tức khoảng $490$ lượt dữ liệu. Với $n=10^9$, ngưỡng là $5\cdot10^{17}$ gradient mẫu, tức khoảng $5\cdot10^8$ lượt.

**Kiểm tra lại.** Ở cả hai hàng, $\mathcal B=10n<\tfrac{(n-b)^2}2$, phù hợp với việc cận SGD nhỏ hơn.
:::

Phép so sánh trên dùng các cận của Bài 05b. Bảng 13.2 của Bottou và Bousquet (2011, tr. 362), mà Bài 05 dùng cho hạ gradient, cho thêm thời gian để SGD một mẫu mỗi bước đạt độ chính xác tối ưu $\rho_{\rm BB}$ trên hàm lồi mạnh: $O\bigl(p\nu\kappa^2/\rho_{\rm BB}\bigr)$, so với $O\bigl(np\kappa\log\tfrac1{\rho_{\rm BB}}\bigr)$ của hạ gradient, trong đó $\nu$ đo nhiễu của gradient và $\kappa$ là số điều kiện như bảng ký hiệu, tính tại điểm cực tiểu.

::: remark Nhận xét 06.37 (Mức chính xác đủ dùng)
Mệnh đề 06.36 cho cận $O(1/\sqrt{\mathcal B})$ cho bình phương chuẩn gradient, tức $O(\mathcal B^{-1/4})$ cho chính chuẩn. Với bài toán lồi, mức đủ dùng là bậc của sai số ước lượng (Nhận xét 06.22). Với mạng, Định lý 06.33 bảo đảm điểm dừng xấp xỉ, và tập xác thực quyết định mức chính xác đủ dùng.
:::

### 8.6. Dừng sớm theo tập xác thực

Dừng sớm (Định nghĩa 05.36) chạy một thuật toán lặp và trả về điểm lặp có sai số trên tập xác thực nhỏ nhất; trên ví dụ năm mẫu của Bài 05, điểm lặp đó có sai số xác thực nhỏ hơn sai số xác thực của nghiệm chính xác (Ví dụ 05.24). Tập xác thực dùng để chọn siêu tham số (hyperparameter) và bước dừng, tập kiểm thử chỉ dùng để báo cáo $R$ (Định nghĩa 05.6).

![Mất mát huấn luyện có xu hướng giảm; mất mát xác thực nằm phía trên, giảm rồi tăng. Điểm thấp nhất của đường xác thực, đánh dấu bằng đường đứt thẳng đứng, là điểm dừng sớm.](img/lec-06/risk-curves.svg)

Một cách trực quan, mất mát huấn luyện có xu hướng giảm theo vòng lặp, còn mất mát xác thực giảm tới cực tiểu rồi tăng; điểm cực tiểu là nơi nên dừng. Với SGD, mất mát huấn luyện chỉ có xu hướng giảm, vì một bước có thể làm nó tăng (Ví dụ 06.17). Đánh giá trên tập xác thực ở mọi bước quá tốn với SGD, nên quy tắc cần thêm chu kỳ đánh giá và điều kiện dừng.

::: algorithm Thuật toán 06.38 (Dừng sớm với chu kỳ đánh giá và ngưỡng kiên nhẫn)
**Đầu vào.** Một thuật toán lặp sinh $\theta_1,\theta_2,\ldots$ (chẳng hạn Thuật toán 06.25); tập xác thực; chu kỳ đánh giá $T\ge1$; ngưỡng kiên nhẫn $r\ge1$.

**Đầu ra.** Tham số $\widehat\theta$ có mất mát xác thực nhỏ nhất trong các lần đánh giá; nếu thuật toán con dừng trước lần đánh giá đầu, tham số cuối của nó.

1. Đặt $\widehat R_{\min}=+\infty$ và bộ đếm $j=0$.
2. Sau mỗi $T$ bước, tính $\widehat R$, mất mát trung bình trên tập xác thực tại tham số hiện tại.
3. Nếu $\widehat R<\widehat R_{\min}$: đặt $\widehat R_{\min}=\widehat R$, lưu $\widehat\theta$ là tham số hiện tại, đặt $j=0$. Ngược lại, tăng $j$ thêm $1$.
4. Dừng khi $j=r$ hoặc khi thuật toán con dừng; trả về $\widehat\theta$.

**Điều kiện dừng.** $r$ lần đánh giá liên tiếp không cải thiện, hoặc thuật toán con dừng.

**Chi phí.** Mỗi lần đánh giá tốn một lần truyền xuôi trên tập xác thực.
:::

Thuật toán 06.38 viết quy tắc kiên nhẫn của Định nghĩa 05.36 thành thuật toán và thêm chu kỳ đánh giá $T$, như Thuật toán 7.1 của Goodfellow và cộng sự (2016, §7.8, tr. 247).

::: remark Nhận xét 06.39 (Tập xác thực sau khi đã dùng để chọn)
Tại $\theta$ cố định, $\widehat R$ là ước lượng không chệch của $R(\theta)$ (Định lý 06.21). Tham số $\widehat\theta$ được chọn vì có $\widehat R$ nhỏ nhất, nên sau khi chọn, $\widehat R(\widehat\theta)$ lệch về phía lạc quan (Nhận xét 05.8); báo cáo $R$ cần một tập kiểm thử riêng.
:::

### 8.7. Dừng sớm và chính quy hóa bậc hai trên mục tiêu toàn phương

Mệnh đề 05.37 cho thấy hạ gradient trên bình phương nhỏ nhất khớp trước các hướng có độ cong lớn và khớp muộn các hướng phẳng, và nghiệm có chính quy hóa có dạng tương tự. Mệnh đề sau viết hai dạng đó trên một mục tiêu toàn phương với bước $\eta$ bất kỳ thay cho bước $\tfrac1L$, để so hai tỉ lệ khi $\lambda=\tfrac1{\eta k}$.

::: proposition Mệnh đề 06.40 (Tỉ lệ giữ của dừng sớm và của chính quy hóa bậc hai) — chứng minh đầy đủ
**Giả thiết.**

- **Mục tiêu.** $Q(\theta)=\tfrac12(\theta-\theta^*)^\top H(\theta-\theta^*)$ với $H\in\mathbb R^{p\times p}$ đối xứng, $H=\sum_j\alpha_j\xi_j\xi_j^\top$, $\alpha_j>0$, $\xi_j$ trực chuẩn.
- **Dừng sớm.** Hạ gradient bước $\eta$ với $0<\eta\alpha_j<1$ từ $\theta_0=0$.
- **Chính quy hóa.** $\theta_\lambda=\arg\min_\theta Q(\theta)+\tfrac\lambda2\lVert\theta\rVert^2$ với $\lambda>0$.

**Kết luận.** Theo mỗi vector riêng $\xi_j$, thành phần của $\theta_k$ và của $\theta_\lambda$ bằng một tỉ lệ của thành phần của $\theta^*$:

$$
\begin{aligned}
&\xi_j^\top\theta_k=\bigl(1-(1-\eta\alpha_j)^k\bigr)\\
&\qquad\cdot\xi_j^\top\theta^*,\\
&\xi_j^\top\theta_\lambda=\tfrac{\alpha_j}{\alpha_j+\lambda}\,\xi_j^\top\theta^* .
\end{aligned}
\tag{8.6}
$$

Hai tỉ lệ này gọi là *tỉ lệ giữ* của dừng sớm và của chính quy hóa.
:::

::: proof Chứng minh Mệnh đề 06.40
**Lộ trình.** Kết luận thứ nhất là Mệnh đề 05.37 với bước $\eta$; kết luận thứ hai chiếu điều kiện bậc nhất lên các vector riêng.

**Bước 1 (dừng sớm).** Vì $\nabla Q(\theta)=H(\theta-\theta^*)$, Bước 2–3 của chứng minh Mệnh đề 05.37, với $\tfrac1L$ thay bằng $\eta$ và $A$ thay bằng $H$, cho $\theta_k-\theta^*=-(I-\eta H)^k\theta^*$; ma trận $I-\eta H$ có vector riêng $\xi_j$ với trị riêng $1-\eta\alpha_j$, nên ta được kết luận thứ nhất.

**Bước 2 (chính quy hóa).** Điều kiện bậc nhất là $(H+\lambda I)\theta_\lambda=H\theta^*$. Nhân với $\xi_j^\top$ và dùng $\xi_j^\top H=\alpha_j\xi_j^\top$: $(\alpha_j+\lambda)\xi_j^\top\theta_\lambda=\alpha_j\xi_j^\top\theta^*$. $\square$
:::

Mệnh đề phát biểu cho mục tiêu toàn phương. Cả hai cách giữ gần trọn thành phần theo hướng có độ cong lớn và nén thành phần theo hướng có độ cong nhỏ. Ví dụ sau so hai tỉ lệ khi $\lambda=\tfrac1{\eta k}$.

::: example Ví dụ 06.22 (Tỉ lệ giữ với $\eta=0{,}5$, $k=20$, $\lambda=0{,}1$)
**Dữ kiện.** Mục tiêu toàn phương của Mệnh đề 06.40 với ba trị riêng $\alpha=1;\ 0{,}1;\ 0{,}01$; bước $\eta=0{,}5$; dừng sau $k=20$ bước; hệ số chính quy hóa $\lambda=\tfrac1{\eta k}=0{,}1$.

**Hai tỉ lệ.**

| $\alpha$ | $\eta\alpha$ | dừng sớm $1-(1-\eta\alpha)^{20}$ | chính quy hóa $\tfrac\alpha{\alpha+0{,}1}$ |
|---:|---:|---:|---:|
| $1$ | $0{,}5$ | $1{,}000$ | $0{,}909$ |
| $0{,}1$ | $0{,}05$ | $0{,}642$ | $0{,}500$ |
| $0{,}01$ | $0{,}005$ | $0{,}095$ | $0{,}091$ |

**Đọc bảng.** Với $\alpha=0{,}01$, hai tỉ lệ gần nhau. Với $\alpha=0{,}1=\lambda$, hai tỉ lệ lệch nhau rõ dù $\eta\alpha=0{,}05$ nhỏ. Với $\alpha=1$, cả hai gần $1$.

**Kiểm tra lại.** $(0{,}95)^{20}\approx0{,}358$, nên dừng sớm cho $0{,}642$ khi $\alpha=0{,}1$; $(0{,}995)^{20}\approx0{,}905$, nên dừng sớm cho $0{,}095$ khi $\alpha=0{,}01$.
:::

![Trục hoành số bước k trên thang logarit từ 1 đến 1000, η = 0,5; trục tung tỉ lệ giữ từ 0 đến 1. Ba cặp đường cho ba trị riêng: α = 1 (vòng tròn), α = 0,1 (ô vuông), α = 0,01 (tam giác). Đường liền là tỉ lệ giữ của dừng sớm 1 − (1 − ηα)ᵏ; đường nét đứt là tỉ lệ giữ α/(α + λ) của chính quy hóa với λ = 1/(ηk). Các đường tăng dần theo k; cặp có α nhỏ hơn tăng muộn hơn. Tại k = 1, cặp α = 1 đã ở 0,5 và 0,33; tại k = 1000, đường chính quy hóa của α = 0,01 mới ở 0,83. Tại k = 20: α = 1 cho 1,000 và 0,909; α = 0,1 cho 0,642 và 0,500; α = 0,01 cho 0,095 và 0,091.](img/lec-06/early-stopping-shrinkage.svg)

Mỗi cặp đường cùng ký hiệu tăng theo $k$, và cặp có $\alpha$ nhỏ hơn tăng muộn hơn: dừng sớm, như chính quy hóa với $\lambda=\tfrac1{\eta k}$, giữ hướng cong và nén hướng phẳng. Hai đường của một cặp chỉ gần nhau trên một phần của trục; nhận xét sau cho điều kiện.

::: remark Nhận xét 06.41 (Điều kiện để hai tỉ lệ gần nhau)
Khi $\eta\alpha\ll1$, $(1-\eta\alpha)^k\approx e^{-\eta\alpha k}$. Khi $\alpha\ll\lambda$, $\tfrac\lambda{\alpha+\lambda}=\tfrac1{1+\alpha/\lambda}\approx e^{-\alpha/\lambda}$. Hai biểu thức bằng nhau khi $\lambda=\tfrac1{\eta k}$. Vậy hai tỉ lệ giữ gần nhau khi cả ba điều kiện cùng đúng: $\lambda\approx\tfrac1{\eta k}$, $\eta\alpha\ll1$ và $\alpha\ll\lambda$ (Goodfellow và cộng sự 2016, §7.8: hai tỉ lệ là (7.40) và (7.42), điều kiện tương đương (7.43), xấp xỉ (7.44)–(7.45)). Trong Ví dụ 06.22, dòng $\alpha=0{,}1$ vi phạm điều kiện thứ ba vì $\alpha/\lambda=1$: $(0{,}95)^{20}\approx0{,}358$ gần $e^{-1}\approx0{,}368$, nhưng $\tfrac\lambda{\alpha+\lambda}=0{,}5$ khác xa $e^{-1}$.
:::

**Trong học máy.** Một lần chạy cho cả quỹ đạo $\theta_k$, và trên mục tiêu toàn phương, theo các hướng riêng thỏa điều kiện của Nhận xét 06.41, mỗi $\theta_k$ gần với nghiệm chính quy hóa có $\lambda\approx1/(\eta k)$. Vì vậy chọn $k$ trên tập xác thực thay được việc chọn $\lambda$, vốn đòi giải lại bài toán cho mỗi giá trị (Goodfellow và cộng sự 2016, §7.8).

::: exercise Bài tập 06.5 (Chọn bước hằng theo mức nhiễu nền)
Cho ví dụ ba quan sát: $y=(-1,1,3)$, $F(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, $\mu=L=1$, $\tau^2=\tfrac83$, $\theta_0=0$, gradient một mẫu $\widehat g=\theta-y_I$ với $I$ đều trên $\{1,2,3\}$.

1. Tìm bước hằng lớn nhất để mức nhiễu nền của Định lý 06.30 không vượt $0{,}05$.
2. Với bước đó, tìm $k$ nhỏ nhất để cận (8.2) không vượt $0{,}1$.
3. Viết đệ quy chính xác cho $a_k=\mathbb E(\theta_k-1)^2$, tìm giới hạn và $k$ nhỏ nhất để $a_k\le0{,}1$. So với câu 2.
:::

::: hint
Mức nhiễu nền là $\tfrac{\eta\tau^2}\mu$. Ở câu 3, $\theta_{k+1}-1=(1-\eta)(\theta_k-1)+\eta(y_I-1)$, với $y_I-1$ có kỳ vọng $0$ và phương sai $\tfrac83$.
:::

::: solution
1. $\tfrac{\eta\cdot8/3}1\le0{,}05$ khi $\eta\le\tfrac{0{,}15}8=0{,}01875$; bước này không vượt $\tfrac1L=1$.

2. Cận là $(1-0{,}01875)^k+0{,}05\le0{,}1$ khi $0{,}98125^k\le0{,}05$, tức $k\ge\tfrac{\ln0{,}05}{\ln0{,}98125}\approx158{,}3$, nên $k=159$.

3. Bình phương rồi lấy kỳ vọng, số hạng chéo bằng $0$ vì $y_I-1$ có kỳ vọng $0$ và độc lập với $\theta_k$:

$$
a_{k+1}=(1-\eta)^2a_k+\eta^2\cdot\tfrac83 .
$$

Giới hạn là $\tfrac{\eta^2\cdot8/3}{1-(1-\eta)^2}=\tfrac{\eta\cdot8/3}{2-\eta}=\tfrac{0{,}05}{1{,}98125}\approx0{,}0252$, khoảng một nửa mức nhiễu nền. Lặp đệ quy từ $a_0=1$, $a_k$ xuống dưới $0{,}1$ lần đầu tại $k=68$ ($a_{68}\approx0{,}0995$). Cận của định lý cần $159$ bước, hơn gấp đôi, vì hệ số co của cận là $1-\eta\mu$ còn hệ số co thật là $(1-\eta\mu)^2$, và mức nhiễu nền của cận gần gấp đôi giới hạn thật.

**Kiểm tra lại.** Dạng đóng $a_k=(1-\eta)^{2k}(1-a_\infty)+a_\infty$ tại $k=68$: $0{,}98125^{136}\approx0{,}0762$, nên $a_{68}\approx0{,}0762\cdot0{,}9748+0{,}0252\approx0{,}0995$.
:::

::: exercise Bài tập 06.6 (Ngân sách một triệu gradient mẫu)
Cho $L=\Delta_0=\tau_1^2=1$, $n=10^5$ mẫu, lô $b=100$ chọn có hoàn lại và tổng ngân sách $\mathcal B=10^6$ gradient mẫu.

1. Tính số bước, bước (theo Hệ quả 06.34) và cận của SGD; tính số bước và cận của hạ gradient đầy đủ.
2. Tính ngưỡng $\mathcal B$ của Mệnh đề 06.36 và số lượt dữ liệu tương ứng.
3. Nêu hai lý do vì sao kết luận của câu 1 chưa đủ để chọn SGD cho một mạng ReLU trên dữ liệu này.
:::

::: hint
$\tau^2=\tau_1^2/b$ và $K=\mathcal B/b$ cho SGD; $K=\mathcal B/n$ cho hạ gradient đầy đủ. Ở câu 3, xét giả thiết (H2) và đại lượng mà cận chặn.
:::

::: solution
1. SGD: $K=\tfrac{10^6}{100}=10^4$ bước, $\tau^2=0{,}01$, $\eta=\min\{1,\sqrt{2/(0{,}01\cdot10^4)}\}=\sqrt{0{,}02}\approx0{,}1414$. Cận (8.5) với $L=\Delta_0=1$:

   $$
   \begin{aligned}
   &\frac{2L\Delta_0}K+2\sqrt{\frac{2L\Delta_0\tau^2}K}\\
   &\quad=\frac2{10^4}+2\sqrt{\frac{2\cdot0{,}01}{10^4}}\\
   &\quad=0{,}0002+2\sqrt{2\cdot10^{-6}}\\
   &\quad\approx0{,}0002+0{,}00283\\
   &\quad=0{,}00303 .
   \end{aligned}
   $$

   Hạ gradient đầy đủ: $K=\tfrac{10^6}{10^5}=10$ bước, cận $\tfrac{2\cdot10^5}{10^6}=0{,}2$.

2. Ngưỡng $\tfrac{L\Delta_0(n-b)^2}{2\tau_1^2}$, với $L=\Delta_0=\tau_1^2=1$, bằng $\tfrac{(n-b)^2}2=\tfrac{99\,900^2}2\approx4{,}99\cdot10^9$ gradient mẫu, tức khoảng $49\,900$ lượt dữ liệu. Ngân sách $10^6$ ứng với $10$ lượt, xa dưới ngưỡng.

3. Thứ nhất, với ReLU, $F$ không khả vi tại các điểm gãy có bước nhảy khác $0$ (Nhận xét 06.13), nên (H2) không đúng và hai cận không áp dụng cho mạng này. Thứ hai, cả hai cận chặn chuẩn gradient, không chặn $F-F_{\inf}$ hay $R$; mức chính xác đủ dùng được quyết định bằng tập xác thực (Nhận xét 06.37).

**Kiểm tra lại.** Ở câu 1, bước $\eta=\sqrt{0{,}02}$ thuộc nhánh căn, nên hai số hạng của (8.4) bằng nhau: $\tfrac2{\eta K}=L\eta\tau^2\approx0{,}001414$, tổng $0{,}00283$. Cận $0{,}00303$ của (8.5) lớn hơn đúng $\tfrac{2L\Delta_0}K=0{,}0002$, số hạng mà (8.5) giữ để đúng cho cả hai nhánh.
:::

Như vậy, mỗi bảo đảm của SGD đi kèm một bộ giả thiết riêng: (H3) hay không, (H6a) hay (H6b), bước hằng hay giảm dần.

## 9. Ý nghĩa, tác động và giới hạn

### 9.1. Chi phí huấn luyện một mạng phân loại ảnh

::: application Tình huống 06.1 (Chi phí huấn luyện một mạng phân loại ảnh)
**Bài toán và dữ liệu.** Giả sử có $n=60\,000$ ảnh xám $28\times28$, mỗi ảnh có nhãn $y\in\{0,1\}$. Mô hình là mạng hai tầng với $d=784$ đầu vào, $m=100$ đơn vị ẩn ReLU và đầu ra vô hướng; mất mát bình phương. Cần ước lượng chi phí của các phương pháp và kiểm tra bảo đảm nào áp dụng được.

**Mô hình hóa.** Theo Định nghĩa 06.4, $p=md+2m+1=78\,601$ (Ví dụ 06.4); rủi ro thực nghiệm là (4.2).

**Chi phí một gradient mẫu.** Theo Mệnh đề 06.14, truyền xuôi tốn $78\,500$ và bước ngược $78\,600$ phép nhân, tổng $157\,100$. Sai phân hữu hạn cần $78\,602$ lần truyền xuôi, khoảng $6{,}2\cdot10^9$ phép nhân.

**Chi phí một bước.**

- Hạ gradient đầy đủ: $60\,000\cdot157\,100\approx9{,}4\cdot10^9$ phép nhân.
- SGD với $b=100$: $100\cdot157\,100\approx1{,}6\cdot10^7$ phép nhân; một lượt dữ liệu gồm $600$ bước.
- Newton: riêng Hessian có $p^2\approx6{,}2\cdot10^9$ phần tử, tức $4{,}9\cdot10^{10}$ byte với số thực $8$ byte, và giải hệ tốn $p^3\approx4{,}9\cdot10^{14}$ phép tính mỗi bước.

**Bộ nhớ của SGD.** Theo phép đếm bộ nhớ sau Mệnh đề 06.14, bước ngược cần $z$, $h$ và $x$ của cả lô: $(2m+d)b=98\,400$ số.

**Xác minh giả thiết.**

1. (H6), (H6b) (Mệnh đề 06.26): đúng nếu mỗi lô được chọn độc lập với lịch sử và $\operatorname{tr}\Sigma$ bị chặn trên vùng chứa dãy lặp; xáo trộn theo lượt vi phạm (H6) (Nhận xét 06.27).
2. (H2) (Định lý 06.33): sai với ReLU (Nhận xét 06.13). Thay ReLU bằng softplus $\log(1+e^z)$, một hàm trơn, làm (H2) đúng trên mọi vùng bị chặn, và Định lý 06.33 áp dụng trên vùng chứa dãy lặp.
3. Tính lồi: không được bảo đảm. Mệnh đề 06.7 áp dụng được khi một cực tiểu toàn cục có hai đơn vị ẩn khác nhau, và bác bỏ tính lồi khi thêm một điểm trên đoạn nối có giá trị lớn hơn, như Ví dụ 06.6 trên XOR. Vì vậy chỉ dùng các bảo đảm về điểm dừng.

**Diễn giải.** Một bước SGD rẻ hơn một bước hạ gradient đầy đủ $600$ lần, và mười lượt dữ liệu cho $6\,000$ cập nhật thay vì $10$.

**Giới hạn.** Phép đếm bỏ hằng số cài đặt và tính song song. Với máy $10^{12}$ phép nhân–cộng mỗi giây của Ví dụ 06.16, một bước hạ gradient đầy đủ tốn khoảng $0{,}01$ giây, nên ở quy mô này lý do chọn SGD là số cập nhật trên cùng ngân sách (Mệnh đề 06.36).

**Kiểm tra lại.** $157\,100\cdot60\,000=9{,}426\cdot10^9$; $157\,100\cdot100=1{,}571\cdot10^7$; tỉ số $600=n/b$.

**Dẫn ngược lý thuyết.** Định nghĩa 06.4, Ví dụ 06.4, Mệnh đề 06.14 (bước đếm chi phí); Mệnh đề 06.26 (bước kiểm tra (H6), (H6b)); Định lý 06.33, Nhận xét 06.13 (bước kiểm tra (H2)); Mệnh đề 06.7 (bước kiểm tra tính lồi).
:::

### 9.2. Tiêu chí dừng khi khởi tạo gần điểm yên ngựa

::: application Tình huống 06.2 (Tiêu chí dừng khi khởi tạo gần điểm yên ngựa)
**Bài toán và dữ liệu.** Mạng tuyến tính một đơn vị $f=v\,u\,x$ huấn luyện trên một mẫu $x=1$, $y=1$, tức $F(u,v)=\tfrac12(uv-1)^2$. Trọng số được khởi tạo nhỏ với dấu ngược nhau, $\theta_0=(0{,}01;\ -0{,}01)$; hạ gradient bước $\eta=\tfrac12$; quy tắc dừng: dừng khi $\lVert\nabla F(\theta_k)\rVert^2\le10^{-8}$.

**Xác minh giả thiết.** Với Định lý 06.19, (H0) đúng với $F_{\inf}=0$. Tới bước dừng $k=8$, và cả tại $\theta_9$, mọi điểm lặp của hai lần chạy dưới đây nằm trong hình vuông $C=[-0{,}011;\ 0{,}011]^2$. Trên $C$, $u^2,v^2\le0{,}000121$ và $\lvert2uv-1\rvert\le1{,}000242$, nên theo phép chặn tổng hàng như Ví dụ 06.13, mọi trị riêng của Hessian có trị tuyệt đối không vượt $1{,}0004$. Vậy (H2) đúng trên $C$ với $L=1{,}0004$, và bước $\eta=\tfrac12$ nhỏ hơn $\tfrac1L$.

Với bước $\eta\le\tfrac1L$ thay cho đúng $\tfrac1L$, Bổ đề 06.18 cho mức giảm ít nhất $\tfrac\eta2\lVert\nabla F(\theta_k)\rVert^2$, nên chứng minh của Định lý 06.19 cho $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le\tfrac{2\Delta_0}{\eta K}$ với mọi $K\le9$.

**Giả thiết bị vi phạm.** Tính lồi: theo Ví dụ 06.11, $F$ không lồi, nên Hệ quả 01.26 không áp dụng.

**Hậu quả quan sát được.** Ở lần chạy thứ nhất, như Tình huống 04.3, dãy ở mãi trên đường chéo phụ $u=-v=t_k$ với $t_{k+1}=\tfrac12t_k(1-t_k^2)$ và tiến về điểm yên ngựa $(0,0)$, có Hessian với trị riêng $\pm1$ (Ví dụ 06.12, Mệnh đề 06.16). Tiêu chí dừng thỏa lần đầu tại $k=8$, với $\lVert\nabla F\rVert^2\approx3{,}1\cdot10^{-9}$ và $F\approx0{,}5$.

Ở lần chạy thứ hai, lệch $10^{-6}$, từ $\theta_0=(0{,}01+10^{-6};\ -0{,}01+10^{-6})$, gần gốc, phép lặp xấp xỉ $\theta_{k+1}\approx(I-\tfrac12\nabla^2F(0,0))\theta_k$ với $I-\tfrac12\nabla^2F(0,0)=\begin{pmatrix}1&\tfrac12\\\tfrac12&1\end{pmatrix}$. Ma trận này nhân thành phần theo hướng $(1,1)$ với $1{,}5$ và thành phần theo hướng $(1,-1)$ với $0{,}5$ ở mỗi bước. Thành phần lệch nhỏ theo hướng $(1,1)$ lớn dần: $F(\theta_k)\approx0{,}49999$ tại $k=20$, $0{,}465$ tại $k=30$, $0{,}0093$ tại $k=35$, và $F\approx0$ từ $k=40$. Tuy nhiên, quy tắc dừng đã thỏa tại $k=8$, khi $\lVert\nabla F\rVert^2\approx4{,}4\cdot10^{-9}$ và $F\approx0{,}5$.

**Diễn giải.** Gradient nhỏ chỉ chứng nhận một điểm dừng xấp xỉ (Nhận xét 06.20), và với mục tiêu không lồi, điểm đó có thể là điểm yên ngựa. Một nhiễu nhỏ theo hướng có độ cong âm, như nhiễu của SGD, đẩy dãy rời điểm yên ngựa, nhưng cần thêm nhiều bước: ở lần chạy thứ hai là khoảng $30$ bước.

**Cách sửa.** Theo dõi giá trị $F$ trên tập huấn luyện cùng với chuẩn gradient: $F\approx\tfrac12$ tại điểm thỏa tiêu chí cho biết dãy dừng ở điểm yên ngựa. Với mạng thật, Hessian quá lớn để phân loại điểm dừng (Nhận xét 06.17).

**Kiểm tra lại.** Với $t_0=0{,}01$: $t_1=\tfrac12\cdot0{,}01\cdot(1-10^{-4})=0{,}0049995$, và $\lVert\nabla F(\theta_0)\rVert^2=2t_0^2(1+t_0^2)^2\approx2\cdot10^{-4}$.

**Dẫn ngược lý thuyết.** Định nghĩa 06.15 (điểm dừng xấp xỉ, điểm yên ngựa); Mệnh đề 06.16 (phân loại tại $(0,0)$); Định lý 06.19 (giả thiết (H0), (H2) được kiểm tra ở bước đầu); Hệ quả 01.26 (giả thiết lồi bị thiếu).
:::

### 9.3. Hồi quy có chính quy hóa trên mười triệu mẫu

::: application Tình huống 06.3 (Hồi quy có chính quy hóa trên mười triệu mẫu)
**Bài toán và dữ liệu.** Hồi quy tuyến tính với $n=10^7$ mẫu và $p=10^3$ đặc trưng, mục tiêu $F_\lambda(\theta)=\tfrac1n\sum_i\tfrac12(x_i^\top\theta-y_i)^2+\tfrac\lambda2\lVert\theta\rVert^2$ với $\lambda=10^{-2}$. Giả sử đặc trưng được chuẩn hóa để $L\le1$, khoảng cách đầu thỏa $D^2=\lVert\theta_0-\theta^*\rVert^2\le1$, và trên vùng chứa dãy lặp, phương sai tổng của gradient một mẫu không vượt $\tau_1^2=1$. Yêu cầu: $\mathbb E\lVert\theta_k-\theta^*\rVert^2\le10^{-3}$.

**Xác minh giả thiết.** $F_\lambda$ có Hessian $\tfrac1n\sum_ix_ix_i^\top+\lambda I\succeq\lambda I$, nên (H3) đúng với $\mu=\lambda=10^{-2}$ và (H4) đúng; (H2) đúng với $L=1$, nên $\kappa=100$. Với lô $b=100$ chọn có hoàn lại, Mệnh đề 06.26 cho (H6) và (H6b) với $\tau^2=\tfrac{\tau_1^2}b=10^{-2}$. Gradient lô nhỏ của số hạng chính quy hóa là chính xác, nên không thêm nhiễu.

**SGD bước hằng (Định lý 06.30).** Chọn $\eta=5\cdot10^{-4}$ để mức nhiễu nền $\tfrac{\eta\tau^2}\mu=5\cdot10^{-4}$ bằng một nửa mức yêu cầu. Cần $(1-\eta\mu)^kD^2\le5\cdot10^{-4}$, tức $k\ge\tfrac{\ln2000}{-\ln(1-5\cdot10^{-6})}\approx1{,}52\cdot10^6$ bước. Mỗi bước tốn $bp=10^5$ phép nhân–cộng, tổng $1{,}52\cdot10^{11}$, tức khoảng $15$ lượt dữ liệu.

**Hạ gradient đầy đủ (Định lý 05b.18(a)).** $\lVert\theta_k-\theta^*\rVert^2\le(1-\tfrac1\kappa)^kD^2\le10^{-3}$ khi $k\ge\tfrac{\ln1000}{-\ln0{,}99}\approx687{,}3$, tức $688$ bước, mỗi bước $np=10^{10}$, tổng $6{,}88\cdot10^{12}$.

**Giải trực tiếp.** Mục tiêu toàn phương, nên Newton hội tụ sau một bước, tức giải hệ chuẩn: lập $\tfrac1n\sum_ix_ix_i^\top$ tốn $np^2=10^{13}$, giải hệ tốn $p^3=10^9$.

**Diễn giải.** Với yêu cầu này, SGD tốn ít hơn hạ gradient đầy đủ khoảng $45$ lần và ít hơn giải trực tiếp khoảng $66$ lần. Đổi lại, bảo đảm của SGD là theo kỳ vọng, còn hai phương pháp kia tất định; và nếu yêu cầu chặt hơn mức nhiễu nền, bước hằng không đạt được, phải giảm bước (Định lý 06.31) hoặc tăng $b$.

**Giới hạn.** Phép so sánh dùng cận trên, với mức bi quan khác nhau cho từng phương pháp (Ví dụ 06.14, Ví dụ 05b.19). Mức $10^{-3}$ đủ hay không do tập xác thực quyết định (Nhận xét 06.37).

**Kiểm tra lại.** $\tfrac{6{,}88\cdot10^{12}}{1{,}52\cdot10^{11}}\approx45{,}3$ và $\tfrac{1{,}0\cdot10^{13}}{1{,}52\cdot10^{11}}\approx66$; số lượt của SGD là $\tfrac{1{,}52\cdot10^6\cdot100}{10^7}\approx15{,}2$.

**Dẫn ngược lý thuyết.** Định lý 06.30 ((H2), (H3), (H4), (H6), (H6b), bước $\eta\le\tfrac1L$); Mệnh đề 06.26 (bước tính $\tau^2$ từ $b$); Định lý 05b.18 (bước so sánh với hạ gradient đầy đủ); Ví dụ 06.16 (mô hình chi phí).
:::

### 9.4. Lựa chọn giữa hạ gradient đầy đủ, Newton và SGD

Các kết quả của bài và của Bài 04, 05 cho một quy tắc chọn phương pháp theo số mẫu $n$, số tham số $p$ và tính lồi. Các mức "nhỏ", "vừa", "lớn" là bậc độ lớn, đọc cùng bảng chi phí của Ví dụ 06.16 và phép so sánh của Mệnh đề 06.36.

| Bài toán | Phương pháp | Mỗi bước | Bảo đảm | Điều kiện |
|---|---|---|---|---|
| $n$, $p$ nhỏ; lồi mạnh | Newton | $O(np^2+p^3)$ | bậc hai cục bộ (Định lý 04.37) | bộ nhớ $p^2$; Hessian Lipschitz (Định lý 04.37) |
| $p$ lớn, $n$ vừa; lồi mạnh, trơn | hạ gradient | $O(np)$ | tuyến tính, $O(\kappa\log\tfrac1\varepsilon)$ bước (Định lý 04.27) | quét toàn bộ dữ liệu mỗi bước; với hàm lồi trơn không lồi mạnh, tốc độ chỉ còn $O(1/k)$ (Định lý 05b.16) |
| $n$ lớn; lồi mạnh | SGD, $\eta_k=\tfrac1{\mu(k+1)}$ | $O(bp)$ | $O(1/k)$ theo kỳ vọng (Định lý 06.31) | cần đúng hằng số $\mu$ (Định lý 06.31) |
| không lồi (mạng), $n$ lớn | SGD lô nhỏ, bước chọn theo $K$ | $O(bp)$ | $O(1/\sqrt K)$ cho trung bình $\mathbb E\lVert\nabla F\rVert^2$ (Hệ quả 06.34) | (H2), (H6b) trên một vùng chứa dãy lặp; chỉ chứng nhận điểm dừng |
| không lồi, $\mathcal B>\tfrac{L\Delta_0(n-b)^2}{2\tau_1^2}$ | hạ gradient | $O(np)$ | Định lý 06.19 | so theo cận trên (Mệnh đề 06.36); (H2); tất định, và tiêu chí $\lVert\nabla F\rVert\le\varepsilon$ kiểm tra trực tiếp được; chỉ chứng nhận điểm dừng |

Với SGD trên mạng, lịch bước và dừng sớm là thực hành, nằm ngoài giả thiết của Định lý 06.33.

### 9.5. Ứng dụng trong học máy

Các ứng dụng gồm:

- **Mạng nơ-ron sâu.** Định nghĩa 06.4 lặp lại theo tầng cho mạng nhiều tầng; đối xứng hoán vị (Mệnh đề 06.6) và tính không lồi (Mệnh đề 06.7) giữ nguyên ở mọi tầng (Goodfellow và cộng sự 2016, §8.2.2).
- **Học quy mô lớn với mô hình lồi.** Hồi quy logistic có chính quy hóa trên dữ liệu văn bản dùng SGD với bước $\tfrac1{\lambda(t+t_0)}$, cùng dạng với Định lý 06.31 (Ví dụ 05.25).
- **Chính quy hóa ngầm.** Dừng sớm có tác dụng gần như chính quy hóa bậc hai trên mục tiêu toàn phương (Mệnh đề 06.40); Goodfellow và cộng sự (2016, §7.8, tr. 247) gọi dừng sớm là dạng chính quy hóa có lẽ được dùng phổ biến nhất trong học sâu.

### 9.6. Tóm tắt

Mạng hai tầng với hàm kích hoạt phi tuyến biểu diễn được XOR, nhưng đối xứng hoán vị các đơn vị ẩn làm rủi ro thực nghiệm không lồi. Lan truyền ngược tính gradient một mẫu với chi phí cùng bậc truyền xuôi, và khi mục tiêu không lồi, gradient nhỏ chỉ chứng nhận điểm dừng xấp xỉ, có thể nằm cạnh điểm yên ngựa.

Nhận xét 05.40 liệt kê bốn bảo đảm mất khi rời khung tất định. Bài này chứng minh các bảo đảm thay thế, bao gồm:

- **đích là nghiệm chính xác**, thay bằng đích là $R$ nhỏ: $F$ tại một tham số cố định ước lượng không chệch $R$ với phương sai $V(\theta)/n$ (Định lý 06.21), và dừng sớm chọn tham số theo tập xác thực (Thuật toán 06.38);
- **hội tụ tuyến tính tất định**, thay bằng: với gradient đầy đủ, $F$ giảm ở mỗi bước (Bổ đề 06.18); với SGD trên hàm lồi mạnh, mức nhiễu nền $\tfrac{\eta\tau^2}\mu$ với bước hằng (Định lý 06.30) và tốc độ $O(1/k)$ với bước giảm dần (Định lý 06.31);
- **cực tiểu toàn cục**, thay bằng điểm dừng xấp xỉ: $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le\tfrac{2L\Delta_0}K$ (Định lý 06.19) và cận (8.4) cho SGD (Định lý 06.33);
- **chi phí $O(np)$ mỗi bước**, thay bằng: gradient lô nhỏ không chệch, $O(bp)$ mỗi bước (Định lý 06.24, Thuật toán 06.25).

| Nội dung | Kết quả cần tra lại |
|---|---|
| Thiết lập | Định nghĩa 06.1; Nhận xét 06.2 |
| Biểu diễn phi tuyến và mạng hai tầng | Mệnh đề 06.3, 06.6, 06.7; Định nghĩa 06.4; Hệ quả 06.5; Nhận xét 06.8 |
| Lan truyền ngược | Định nghĩa 06.9; Bổ đề 06.10; Thuật toán 06.11; Mệnh đề 06.12, 06.14; Nhận xét 06.13 |
| Điểm dừng khi không lồi | Định nghĩa 06.15; Mệnh đề 06.16; Nhận xét 06.17, 06.20; Bổ đề 06.18; Định lý 06.19 |
| Gradient lô nhỏ | Định lý 06.21, 06.24; Nhận xét 06.22, 06.27; Định nghĩa 06.23; Thuật toán 06.25; Mệnh đề 06.26 |
| Hội tụ dưới nhiễu và dừng sớm | Mệnh đề 06.28, 06.36, 06.40; Định lý 06.30, 06.31, 06.33; Hệ quả 06.34; Nhận xét 06.29, 06.32, 06.35, 06.37, 06.39, 06.41; Thuật toán 06.38 |

Các công thức cần nhớ gồm:

- mạng hai tầng: $f(x;\theta)=w_2^\top\sigma(W_1x+b_1)+b_2$, $p=md+2m+1$;
- lan truyền ngược: $e=\partial\ell/\partial f$, $\nabla_{w_2}\ell=e\,h$, $\delta_z=\sigma'(z)\odot(e\,w_2)$, $\nabla_{W_1}\ell=\delta_zx^\top$, $\nabla_{b_1}\ell=\delta_z$;
- sai số bình phương trung bình của gradient lô nhỏ: $\tfrac{\operatorname{tr}\Sigma}b$ khi chọn có hoàn lại, $\tfrac{\operatorname{tr}\Sigma}b\cdot\tfrac{n-b}{n-1}$ khi chọn không hoàn lại;
- bất đẳng thức một bước: $\mathbb E[F(\theta_{k+1})\mid\mathcal F_k]\le F(\theta_k)-\eta(1-\tfrac{L\eta}2)\lVert\nabla F(\theta_k)\rVert^2+\tfrac{L\eta^2}2\tau^2$;
- mức nhiễu nền của bước hằng: $\tfrac{\eta\tau^2}\mu$;
- hạ gradient trên hàm không lồi: $\min_{k<K}\lVert\nabla F\rVert^2\le\tfrac{2L\Delta_0}K$; SGD trên hàm không lồi với bước chọn theo $K$: $\tfrac{2L\Delta_0}K+2\sqrt{\tfrac{2L\Delta_0\tau^2}K}$;
- tỉ lệ giữ: $1-(1-\eta\alpha)^k$ của dừng sớm, $\tfrac\alpha{\alpha+\lambda}$ của chính quy hóa, gần nhau khi $\lambda\approx\tfrac1{\eta k}$, $\eta\alpha\ll1$ và $\alpha\ll\lambda$.

Các điểm hay bị đọc sai gồm:

- mất mát lồi theo $f$ không kéo theo rủi ro lồi theo $\theta$ (Nhận xét 06.8);
- lan truyền ngược cho gradient chỉ tại điểm khả vi; tại điểm gãy, quy ước $\sigma'(0)=0$ có thể cho vector khác gradient (Nhận xét 06.13);
- đại lượng được chặn là bước tốt nhất hay trung bình theo $k$, không phải bước cuối, và không phải tham số trả về theo tập xác thực (Nhận xét 06.20, 06.27);
- tốc độ tuyến tính tất định mất khi gradient đầy đủ được thay bằng gradient lô nhỏ, dù mục tiêu vẫn lồi mạnh; với bước hằng, SGD chỉ tới một lân cận của điểm cực tiểu (Định lý 06.30);
- SGD có thể làm $F$ tăng theo kỳ vọng: ở Ví dụ 06.19, $\mathbb EF(\theta_1)=\tfrac{69}{128}>\tfrac12$;
- lô phải được chọn độc lập với lịch sử để (H6) đúng; xáo trộn theo lượt vi phạm điều này (Nhận xét 06.27).

## 10. Bài tập

Các bài tập trong thân bài và mục tiêu học tập mà mỗi bài kiểm tra:

1. **Bài tập 06.1** (Mạng một đơn vị với kích hoạt bình phương): mục tiêu 1; đối xứng đổi dấu và tính không lồi.
2. **Bài tập 06.2** (Lan truyền ngược tại một tham số khớp đúng XOR): mục tiêu 2; Thuật toán 06.11, Mệnh đề 06.12 và 06.14.
3. **Bài tập 06.3** (Chính quy hóa bậc hai trên mạng tuyến tính một đơn vị): mục tiêu 3; điểm dừng và Mệnh đề 06.16.
4. **Bài tập 06.4** (Gradient lô nhỏ chọn có hoàn lại trên dữ liệu bốn điểm): mục tiêu 4; Định lý 06.24.
5. **Bài tập 06.5** (Chọn bước hằng theo mức nhiễu nền): mục tiêu 5; Định lý 06.30.
6. **Bài tập 06.6** (Ngân sách một triệu gradient mẫu): mục tiêu 5, 6; Hệ quả 06.34 và Mệnh đề 06.36.

Các bài tập tiếp theo củng cố toàn bài, chia theo ba mức.

### 10.1. Mức nhận biết

::: exercise Bài tập 06.7 (Đúng hay sai về điểm dừng, tính lồi và SGD)
Xác định mỗi phát biểu sau đúng hay sai, và nêu kết quả hoặc ví dụ của bài làm căn cứ.

1. Nếu $F$ là rủi ro thực nghiệm của một mạng hai tầng, kể cả khi bỏ độ chệch, và $\nabla F(\theta)=0$ thì $\theta$ là cực tiểu địa phương của $F$.
2. Nếu mất mát $\ell(f,y)$ lồi theo $f$ thì rủi ro thực nghiệm $F(\theta)$ lồi theo $\theta$ với mọi mô hình $f(x;\theta)$.
3. Tại một $\theta$ cố định mà mọi $\ell_i$ khả vi, gradient lô nhỏ chọn đều không hoàn lại là ước lượng không chệch của $\nabla F(\theta)$.
4. Trên một hàm lồi mạnh và trơn, SGD với bước hằng $\eta\le\tfrac1L$ và $\tau^2>0$ cho $\mathbb E\lVert\theta_k-\theta^*\rVert^2\to0$.
5. Định lý 06.19 chặn $F(\theta_K)-F_{\inf}$.
6. Tại một điểm mà mọi tiền kích hoạt khác $0$, lan truyền ngược trên mạng ReLU cho đúng gradient với chi phí cùng bậc một lần truyền xuôi.
:::

::: hint
Mỗi phát biểu ứng với đúng một kết quả hoặc ví dụ của bài: tìm kết quả đó, rồi kiểm tra giả thiết của nó.
:::

::: solution
1. **Sai.** Mạng tuyến tính một đơn vị là mạng hai tầng với $d=m=1$, $\sigma(z)=z$ và không có độ chệch; gốc $(0,0)$ của $F(u,v)=\tfrac12(uv-1)^2$ có $\nabla F=0$ nhưng là điểm yên ngựa (Ví dụ 06.12, Mệnh đề 06.16).
2. **Sai.** Cần $\theta\mapsto f(x_i;\theta)$ affine (Định lý 01.30(b)). Với mạng, $F$ không lồi (Ví dụ 06.6, Nhận xét 06.8).
3. **Đúng.** Kết luận 2 của Định lý 06.24.
4. **Sai.** Định lý 06.30 chỉ cho cận $(1-\eta\mu)^kD^2+\tfrac{\eta\tau^2}\mu$, và trên ví dụ ba quan sát với bước $0{,}1$, giá trị chính xác tiến về $\tfrac8{57}>0$ (Ví dụ 05b.19). Cần bước giảm dần (Định lý 06.31).
5. **Sai.** Định lý 06.19 chặn $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2$; ở Ví dụ 06.15, $\theta_0$ đã thỏa tiêu chí $\lVert\nabla F\rVert^2\le\varepsilon^2$ với $F-F_{\inf}\approx0{,}5$ (Nhận xét 06.20).
6. **Đúng.** Mệnh đề 06.12 (tính đúng tại điểm khả vi) và Mệnh đề 06.14 (chi phí $md+2m$ so với $md+m$).

**Kiểm tra lại.** Ở câu 4, $\tfrac8{57}\approx0{,}140$ là giới hạn của đệ quy $a_{k+1}=0{,}81a_k+0{,}01\cdot\tfrac83$, tức $\tfrac{0{,}01\cdot8/3}{0{,}19}$.
:::

### 10.2. Mức tính toán hoặc chứng minh

::: exercise Bài tập 06.8 (Đối xứng liên tục và Hessian suy biến)
Cho $F:\mathbb R^p\to\mathbb R$ khả vi liên tục hai lần, $\theta^*$ là một cực tiểu địa phương, và $\gamma:\mathcal I\to\mathbb R^p$, với $\mathcal I$ là một khoảng mở chứa $1$, là một đường cong khả vi liên tục hai lần theo tham số $t$, với $\gamma(1)=\theta^*$, $\gamma'(1)\ne0$ và $F(\gamma(t))=F(\theta^*)$ với mọi $t$.

1. Chứng minh $\nabla^2F(\theta^*)\,\gamma'(1)=0$, tức $\gamma'(1)$ là vector riêng ứng với trị riêng $0$.
2. Với mạng hai tầng ReLU (4.1) và một vector $\omega=(\omega_1,\ldots,\omega_m)$ có mọi $\omega_j>0$, đặt $\Omega=\operatorname{diag}(\omega)$ và chứng minh tham số $(\Omega W_1,\Omega b_1,\Omega^{-1}w_2,b_2)$ cho cùng hàm với $(W_1,b_1,w_2,b_2)$.
3. Áp câu 1 cho $F(u,v)=\tfrac12(uv-1)^2$, $\theta^*=(1,1)$ và $\gamma(t)=(t,1/t)$; đối chiếu với Ví dụ 06.12.
:::

::: hint
Ở câu 1, đạo hàm hai lần hàm hằng $\chi(t)=F(\gamma(t))$ tại $t=1$, dùng $\nabla F(\theta^*)=0$, rồi dùng kết luận 3 của Mệnh đề 06.16. Đặt $\dot\gamma=\gamma'(1)$ và $H=\nabla^2F(\theta^*)$. Với ma trận nửa xác định dương $H$, $\dot\gamma^\top H\dot\gamma=0$ kéo theo $H\dot\gamma=0$: viết $H$ theo vector riêng. Ở câu 2, dùng $\max\{0,\omega z\}=\omega\max\{0,z\}$ khi $\omega>0$.
:::

::: solution
1. **Bước 1 (đạo hàm hàm hằng).** Đặt $\chi(t)=F(\gamma(t))$, hằng theo giả thiết, nên $\chi''(1)=0$. Quy tắc dây chuyền cho $\chi'(t)=\nabla F(\gamma(t))^\top\gamma'(t)$ và

   $$
   \begin{aligned}
   &\chi''(t)\\
   &\quad=\gamma'(t)^\top\nabla^2F(\gamma(t))\,\gamma'(t)\\
   &\qquad+\nabla F(\gamma(t))^\top\gamma''(t).
   \end{aligned}
   $$

   Tại $t=1$, $\nabla F(\theta^*)=0$ vì $\theta^*$ là cực tiểu địa phương của hàm khả vi. Với $\dot\gamma=\gamma'(1)$ và $H=\nabla^2F(\theta^*)$, ta được $\dot\gamma^\top H\dot\gamma=0$.

   **Bước 2 ($H$ nửa xác định dương).** Kết luận 3 của Mệnh đề 06.16 cho $H\succeq0$. Viết $H=\sum_i\alpha_i\xi_i\xi_i^\top$ với trị riêng $\alpha_i\ge0$ và vector riêng $\xi_i$ trực chuẩn. Khi đó $0=\dot\gamma^\top H\dot\gamma=\sum_i\alpha_i(\xi_i^\top\dot\gamma)^2$. Mỗi số hạng không âm, nên $\alpha_i(\xi_i^\top\dot\gamma)^2=0$, kéo theo $\alpha_i(\xi_i^\top\dot\gamma)=0$ với mọi $i$. Do đó $H\dot\gamma=\sum_i\alpha_i(\xi_i^\top\dot\gamma)\xi_i=0$.

2. Với $\omega_j>0$, $\max\{0,\omega_jz_j\}=\omega_j\max\{0,z_j\}$. Tham số mới cho tiền kích hoạt $\omega_jz_j$ ở đơn vị $j$, kích hoạt $\omega_jh_j$, và đầu ra $\sum_j\tfrac{[w_2]_j}{\omega_j}\omega_jh_j+b_2=w_2^\top h+b_2$. Với $\omega_j<0$, đẳng thức $\max\{0,\omega_jz\}=\omega_j\max\{0,z\}$ sai, chẳng hạn $\omega_j=-1$, $z=1$ cho $0\ne-1$.

3. $F(\gamma(t))=\tfrac12(t\cdot\tfrac1t-1)^2=0=F(1,1)$ với mọi $t>0$, và $\gamma'(t)=(1,-\tfrac1{t^2})$, nên $\gamma'(1)=(1,-1)$. Câu 1 cho $\nabla^2F(1,1)(1,-1)^\top=0$.

**Kiểm tra lại.** $\begin{pmatrix}1&1\\1&1\end{pmatrix}\begin{pmatrix}1\\-1\end{pmatrix}=\begin{pmatrix}0\\0\end{pmatrix}$, đúng với trị riêng $0$ và vector riêng $(1,-1)$ của Ví dụ 06.12.
:::

::: exercise Bài tập 06.9 (Lan truyền ngược trên mạng ba đơn vị ẩn)
Cho mạng hai tầng ReLU với $d=2$, $m=3$:

$$
\begin{aligned}
&W_1=\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix},\quad b_1=\begin{pmatrix}0\\0\\-1\end{pmatrix},\\
&w_2=\begin{pmatrix}1\\1\\-2\end{pmatrix},\quad b_2=0,
\end{aligned}
$$

một mẫu $x=(1,2)$, $y=1$, mất mát $\ell=\tfrac12(f-y)^2$.

1. Tính $z$, $h$, $f$, $\ell$ và mọi thành phần của gradient bằng Thuật toán 06.11; tính $\lVert\nabla\ell\rVert^2$.
2. Thực hiện một bước hạ gradient với $\eta=0{,}01$, $0{,}02$ và $0{,}05$; tính mất mát sau mỗi bước.
3. Từ kết quả với $\eta=0{,}05$, suy ra một cận dưới cho hằng số Lipschitz của $\nabla\ell$ dọc đoạn nối tham số đầu và tham số sau bước, sau khi kiểm tra $\ell$ trơn dọc đoạn đó.
:::

::: hint
Cả ba tiền kích hoạt dương, nên $\sigma'(z)=(1,1,1)$. Ở câu 3, dùng Bổ đề 06.18 với $\eta\le\tfrac2L$, và lưu ý tiền kích hoạt là hàm affine của $\eta$ dọc đoạn.
:::

::: solution
1. $z=(1,2,1+2-1)=(1,2,2)$, $h=z$, $f=1+2-4=-1$, $e=f-y=-2$, $\ell=2$.

- Tầng ra: $\partial\ell/\partial b_2=-2$, $\nabla_{w_2}\ell=e\,h=(-2,-4,-4)$.
- Tầng ẩn: $e\,w_2=(-2,-2,4)$, $\delta_z=(-2,-2,4)$.
- Tham số tầng ẩn: $\nabla_{W_1}\ell=\delta_zx^\top=\begin{pmatrix}-2&-4\\-2&-4\\4&8\end{pmatrix}$, $\nabla_{b_1}\ell=(-2,-2,4)$.

Tổng bình phương theo bốn khối $b_2$, $w_2$, $W_1$, $b_1$, với khối $W_1$ viết trên hai dòng, là

$$
\begin{aligned}
&\lVert\nabla\ell\rVert^2\\
&\quad=4+(4+16+16)\\
&\qquad+(4+16+4+16)\\
&\qquad+(16+64)\\
&\qquad+(4+4+16)\\
&\quad=4+36+120+24\\
&\quad=184 .
\end{aligned}
$$

2. Với $\eta=0{,}01$: $W_1^+=\begin{pmatrix}1{,}02&0{,}04\\0{,}02&1{,}04\\0{,}96&0{,}92\end{pmatrix}$, $b_1^+=(0{,}02;\ 0{,}02;\ -1{,}04)$, $w_2^+=(1{,}02;\ 1{,}04;\ -1{,}96)$, $b_2^+=0{,}02$. Khi đó $z^+=(1{,}12;\ 2{,}12;\ 1{,}76)$, $f^+=1{,}1424+2{,}2048-3{,}4496+0{,}02=-0{,}0824$ và $\ell^+=\tfrac12\cdot1{,}0824^2\approx0{,}586$.

Cùng cách tính: với $\eta=0{,}02$, $z^+=(1{,}24;\ 2{,}24;\ 1{,}52)$, $f^+=0{,}8304$, $\ell^+\approx0{,}0144$; với $\eta=0{,}05$, $z^+=(1{,}6;\ 2{,}6;\ 0{,}8)$, $f^+=3{,}54$, $\ell^+\approx3{,}226$. Hai bước đầu làm mất mát giảm từ $2$, bước thứ ba làm mất mát tăng.

3. Dọc đoạn nối, $z(\eta)=W_1(\eta)x+b_1(\eta)$ affine theo $\eta$, với $z(0)=(1,2,2)$ và $z(0{,}05)=(1{,}6;\ 2{,}6;\ 0{,}8)$ đều dương, nên mọi tiền kích hoạt dương trên cả đoạn và $\ell$ trơn dọc đoạn. Nếu $\nabla\ell$ là $L$-Lipschitz dọc đoạn với $L\le40$ thì $0{,}05\le\tfrac2L$, và Bổ đề 06.18 cho $\ell^+\le\ell$, trái với $3{,}226>2$. Vậy $L>40$.

**Kiểm tra lại.** $\partial\ell/\partial b_2=e=-2$: tăng $b_2$ thêm $\varepsilon$ cho $\ell=\tfrac12(-2+\varepsilon)^2$, đạo hàm tại $0$ bằng $-2$.
:::

### 10.3. Mức vận dụng

::: exercise Bài tập 06.10 (Dừng sớm thay cho chính quy hóa)
Một mô hình được huấn luyện bằng hạ gradient bước $\eta=0{,}25$ từ $\theta_0=0$ trên một mục tiêu xấp xỉ bậc hai $\tfrac12(\theta-\theta^*)^\top H(\theta-\theta^*)$, với ba trị riêng của $H$ là $\alpha=2;\ 0{,}2;\ 0{,}002$.

1. Tìm số bước $k$ nhỏ nhất để tỉ lệ giữ của dừng sớm theo hướng $\alpha=0{,}2$ đạt ít nhất $0{,}5$.
2. Với $k$ đó và $\lambda=\tfrac1{\eta k}$, tính tỉ lệ giữ của dừng sớm và của chính quy hóa theo cả ba hướng.
3. Dùng Nhận xét 06.41, xác định hướng thỏa điều kiện để hai tỉ lệ gần nhau, rồi đối chiếu với câu 2.
4. Nêu một lý do để chọn dừng sớm thay cho chính quy hóa khi huấn luyện mạng, và một giới hạn của phép tương ứng $k\leftrightarrow\lambda$.
:::

::: hint
Tỉ lệ giữ của dừng sớm là $1-(1-\eta\alpha)^k$, của chính quy hóa là $\tfrac\alpha{\alpha+\lambda}$ (Mệnh đề 06.40). Ở câu 1, giải $(1-0{,}05)^k\le0{,}5$.
:::

::: solution
1. $\eta\alpha=0{,}05$. Cần $0{,}95^k\le0{,}5$, tức $k\ge\tfrac{\ln0{,}5}{\ln0{,}95}\approx13{,}5$, nên $k=14$. Kiểm tra: $1-0{,}95^{13}\approx0{,}487$ và $1-0{,}95^{14}\approx0{,}512$.

2. $\lambda=\tfrac1{0{,}25\cdot14}=\tfrac1{3{,}5}\approx0{,}286$.

| $\alpha$ | $\eta\alpha$ | dừng sớm | chính quy hóa |
|---:|---:|---:|---:|
| $2$ | $0{,}5$ | $1-0{,}5^{14}\approx1{,}000$ | $\tfrac2{2{,}286}\approx0{,}875$ |
| $0{,}2$ | $0{,}05$ | $0{,}512$ | $\tfrac{0{,}2}{0{,}486}\approx0{,}412$ |
| $0{,}002$ | $0{,}0005$ | $0{,}00698$ | $0{,}00695$ |

3. Hướng $\alpha=0{,}002$ thỏa cả $\eta\alpha\ll1$ và $\alpha\ll\lambda$ ($\alpha/\lambda=0{,}007$), và hai tỉ lệ gần như trùng nhau. Hướng $\alpha=0{,}2$ có $\eta\alpha$ nhỏ nhưng $\alpha/\lambda=0{,}7$ không nhỏ, nên hai tỉ lệ lệch nhau ($0{,}512$ và $0{,}412$). Hướng $\alpha=2$ vi phạm cả hai điều kiện; hai cách đều giữ phần lớn thành phần nhưng với tỉ lệ khác nhau.

4. Dừng sớm không đòi sửa mục tiêu và tiết kiệm chính các bước bị bỏ: một lần chạy với tập xác thực thay cho nhiều lần huấn luyện với các $\lambda$ khác nhau. Giới hạn: tương ứng $k\leftrightarrow\tfrac1{\eta\lambda}$ được chứng minh cho mục tiêu toàn phương (Mệnh đề 06.40) và chỉ gần đúng dưới các điều kiện của Nhận xét 06.41.

**Kiểm tra lại.** Với $\alpha=0{,}002$: $\eta\alpha k=0{,}007$, nên $1-(1-\eta\alpha)^k\approx1-e^{-0{,}007}\approx0{,}00698$, khớp bảng.
:::

::: exercise Bài tập 06.11 (Bộ nhớ, kích thước lô và phương pháp)
Một mạng hai tầng ReLU với $d=3072$ đầu vào (ảnh màu $32\times32$) và $m=4096$ đơn vị ẩn được huấn luyện trên $n=10^7$ mẫu bằng SGD với lô chọn có hoàn lại, trên một bộ xử lý có $1{,}6\cdot10^{10}$ byte bộ nhớ, số thực $8$ byte.

1. Tính $p$ và bộ nhớ cần để lưu Hessian. Kết luận về Newton.
2. Bộ nhớ cố định gồm tham số và gradient, tức $2p$ số. Mỗi mẫu trong lô cần lưu $z$, $h$ và đầu vào $x$ (phép đếm bộ nhớ sau Mệnh đề 06.14) cho tích ngoài $\delta_zx^\top$. Tính kích thước lô lớn nhất $b_{\max}$ mà bộ nhớ cho phép.
3. Với tổng ngân sách $\mathcal B=10^9$ gradient mẫu và $L=\Delta_0=\tau_1^2=1$, so cận của Mệnh đề 06.36 cho SGD với $b=256$ và với $b=b_{\max}$. Rút ra kết luận về việc chọn $b$ lớn nhất mà bộ nhớ cho phép.
:::

::: hint
Ở câu 2, mỗi mẫu cần $2m+d$ số. Ở câu 3, cận SGD là $\tfrac{2b}{\mathcal B}+2\sqrt{\tfrac2{\mathcal B}}$ khi các hằng số bằng $1$.
:::

::: solution
1. $p=md+2m+1=12\,582\,912+8\,192+1=12\,591\,105$. Hessian có $p^2\approx1{,}59\cdot10^{14}$ phần tử, tức khoảng $1{,}27\cdot10^{15}$ byte, gần $8\cdot10^4$ lần bộ nhớ có sẵn. Newton không thực hiện được, chưa kể chi phí giải hệ $p^3$.

2. Bộ nhớ cố định: $2p\cdot8\approx2{,}01\cdot10^8$ byte. Mỗi mẫu: $(2m+d)\cdot8=(8\,192+3\,072)\cdot8=90\,112$ byte. Phần còn lại $1{,}6\cdot10^{10}-2{,}01\cdot10^8\approx1{,}57985\cdot10^{10}$ byte, nên $b_{\max}=\lfloor1{,}57985\cdot10^{10}/90\,112\rfloor=175\,321$, nhỏ hơn $n$.

3. Số hạng chung $2\sqrt{2/10^9}\approx8{,}94\cdot10^{-5}$ không phụ thuộc $b$.

- $b=256$: số hạng còn lại $\tfrac{2\cdot256}{10^9}\approx5{,}1\cdot10^{-7}$, cận $\approx9{,}00\cdot10^{-5}$.
- $b=175\,321$: số hạng còn lại $\approx3{,}51\cdot10^{-4}$, cận $\approx4{,}40\cdot10^{-4}$.

Dưới tổng ngân sách cố định, lô lớn nhất mà bộ nhớ cho phép làm cận tệ hơn khoảng $5$ lần, vì nó cho ít bước hơn với cùng số gradient mẫu. Lô lớn chỉ có lợi khi phần cứng xử lý song song cả lô trong cùng thời gian, tức khi giới hạn là thời gian thực chứ không phải số gradient mẫu. Vì vậy bộ nhớ chỉ cho cận trên $b_{\max}$; dưới cận đó, $b$ được chọn theo mức song song của phần cứng (Goodfellow và cộng sự 2016, §8.1.3, tr. 279).

**Kiểm tra lại.** $p^2\cdot8=12\,591\,105^2\cdot8\approx1{,}268\cdot10^{15}$; $175\,321\cdot90\,112\approx1{,}5798\cdot10^{10}$, không vượt phần bộ nhớ còn lại.
:::

Bài tập 06.12–06.17, có gợi ý và lời giải, nằm trong [tệp bài tập của Bài 06](material-viewer.html?doc=materials/lec-06/exercises.md&deck=lecture-06-mo-rong-mo-hinh-va-du-lieu.html).

## 11. Câu hỏi cuối buổi và cầu nối

Tại trung điểm của câu hỏi mở đầu, $W_1=0$ và mạng trả về $0$ tại mọi đầu vào, nên trung bình mất mát bằng $\tfrac14$ (Ví dụ 06.6). Hai đầu mút là hai cực tiểu toàn cục sinh ra nhau bởi đối xứng hoán vị (Mệnh đề 06.6), nên theo Mệnh đề 06.7, rủi ro thực nghiệm của mạng không lồi, dù mất mát bình phương lồi theo $f$.

**Câu hỏi.** Cho dữ liệu bốn điểm với điểm cực tiểu $\theta^*=(1,1)$, $F^*=\tfrac12$, Hessian $H=\begin{pmatrix}1{,}5&0{,}5\\0{,}5&1\end{pmatrix}$ và bốn gradient mẫu tại $\theta^*$ là $(1,-1)$, $(0,1)$, $(1,1)$, $(-2,-1)$. Thực hiện một bước SGD từ $\theta^*$ với bước $\eta=\tfrac14$ và lô $b$ mẫu chọn đều không hoàn lại.

- (a) Theo Định lý 06.24, tính $\mathbb E\lVert\widehat g\rVert^2$ với $b=1$ và với $b=4$.
- (b) Với $b=1$, tính $\mathbb EF(\theta_1)$ bằng cách liệt kê bốn chỉ số, rồi so với $b=2$ (Ví dụ 06.19) và $b=4$.

::: solution Lời giải câu hỏi cuối buổi
**Câu (a).** $\operatorname{tr}\Sigma(\theta^*)=\tfrac14(2+1+2+5)=\tfrac52$. Với $b=1$, hệ số $\tfrac{n-b}{n-1}=1$, nên $\mathbb E\lVert\widehat g\rVert^2=\tfrac52$. Với $b=4$, hệ số $\tfrac{n-b}{n-1}=0$, nên $\mathbb E\lVert\widehat g\rVert^2=0$.

**Câu (b).** Vì $F$ bậc hai và $\nabla F(\theta^*)=0$, $F(\theta_1)=F^*+\tfrac{\eta^2}2\widehat g^\top H\widehat g$. Bốn giá trị $\widehat g^\top H\widehat g$ là $1{,}5$; $1$; $3{,}5$; $9$, nên bốn giá trị $F(\theta_1)$ là $\tfrac{35}{64}$, $\tfrac{17}{32}$, $\tfrac{39}{64}$, $\tfrac{25}{32}$, với trung bình $\tfrac{79}{128}\approx0{,}617$. Với $b=2$, $\mathbb EF(\theta_1)=\tfrac{69}{128}\approx0{,}539$; với $b=4$, $\theta_1=\theta^*$ và $F(\theta_1)=\tfrac12$. Tăng $b$ làm $\mathbb EF(\theta_1)$ giảm về $F^*$.

**Kiểm tra lại.** Trung bình của bốn giá trị $\widehat g^\top H\widehat g$ là $\tfrac{15}4$, nên $\mathbb EF(\theta_1)=\tfrac12+\tfrac1{32}\cdot\tfrac{15}4=\tfrac{64+15}{128}=\tfrac{79}{128}$.
:::

Mọi phương pháp của bài dùng một bước chung cho mọi tọa độ, mỗi bước chỉ dùng gradient tại điểm lặp hiện tại, và điểm khởi tạo chỉ đi vào các định lý qua $\Delta_0$ và $D$. Hai bài bổ trợ nới các giới hạn này:

- Bài 06b (Các phương pháp tối ưu trong huấn luyện mô hình học sâu) trình bày momentum, Nesterov và khởi tạo tham số mạng;
- Bài 06c (Các phương pháp tối ưu trong học sâu) trình bày bước cập nhật theo thống kê gradient của từng tọa độ, thông tin độ cong từ sai phân gradient và huấn luyện theo giai đoạn.

## 12. Tài liệu đọc

- **Trước buổi học:**
  - Goodfellow, Ian; Bengio, Yoshua; Courville, Aaron (2016), *Deep Learning*, MIT Press: §6.1 (tr. 171–177: bài toán XOR và mạng hai tầng), §8.1 (tr. 275–277: học khác tối ưu thuần túy).
- **Sau buổi học:**
  - Goodfellow, Bengio và Courville (2016): §4.3.1 (tr. 89–90: phép kiểm tra đạo hàm bậc hai), §6.3 (tr. 191: ReLU), §6.5 (tr. 204–224: đồ thị tính toán, Thuật toán 6.2 ở tr. 210, chi phí ở tr. 220–221), §7.8 (tr. 246–252: dừng sớm, Thuật toán 7.1, (7.40)–(7.45)), §8.1.3 (tr. 278–281: thuật toán lô nhỏ), §11.5 (tr. 439: kiểm tra gradient bằng sai phân hữu hạn), §8.2.2–8.2.3 (tr. 283–286: đối xứng không gian trọng số, điểm yên ngựa, bình nguyên), §8.3.1 (tr. 294–296: Thuật toán 8.1, (8.12)–(8.14)).
  - Bottou, Léon; Bousquet, Olivier (2011), "The Tradeoffs of Large-Scale Learning", trong Sra, Suvrit; Nowozin, Sebastian; Wright, Stephen J. (biên tập), *Optimization for Machine Learning*, MIT Press, ch. 13: §13.2.3 (tr. 354–355: phân rã sai số vượt), Bảng 13.2 (tr. 362: thời gian theo độ chính xác), Bảng 13.3 (tr. 363: thí nghiệm RCV1).
  - Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press: §3.2.2 (tr. 79: hợp với ánh xạ affine giữ tính lồi).
- **Mở rộng:**
  - Kupferschmid, Michael (2023), *Introduction to Mathematical Programming*, first edition, giấy phép CC BY 4.0: §25.6.1–25.6.4 (tr. 820–827: sai phân tiến, sai phân trung tâm, chi phí và chọn bước sai phân).
  - Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả: §13.3 (tr. 438: lan truyền ngược).
