# Bài tập Bài 06 — Mở rộng mô hình và dữ liệu

Sáu bài tập dưới đây, đánh số tiếp theo các bài tập trong ghi chú, đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-06/lecture-note.md&deck=lecture-06-mo-rong-mo-hinh-va-du-lieu.html) và [bài giảng](lecture-06-mo-rong-mo-hinh-va-du-lieu.html) của Bài 06. Các bài lấy từ Kupferschmid (2023), Chương 25; Murphy (2022), Chương 13; Boyd và Vandenberghe (2004), Chương 6; số trang là trang in của sách. Lời giải dẫn định nghĩa, bổ đề, mệnh đề, nhận xét, thuật toán và ví dụ theo số hiệu của ghi chú. Ký hiệu theo ghi chú gồm:

- tham số là $\theta\in\mathbb R^p$, $\hat e_i$ là vector đơn vị thứ $i$ của $\mathbb R^p$, $\varepsilon>0$ là bước sai phân;
- vector viết dạng cột, ví dụ $\hat e_1=(1,0,\ldots,0)^\top$;
- $\sigma(z)=\max\{0,z\}$ là hàm kích hoạt ReLU, và $\mathbb 1[z>0]$ là vector có thành phần $j$ bằng $1$ khi $z_j>0$ và bằng $0$ khi $z_j\le0$, khớp quy ước $\sigma'(0)=0$ của Nhận xét 06.13.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Đặc trưng affine và XOR, mạng hai tầng, tính không lồi | 06.1, 06.7, 06.8 | — |
| 2. Lan truyền ngược, sai phân hữu hạn, đếm phép nhân | 06.2, 06.7, 06.9 | 06.12, 06.13, 06.14, 06.15, 06.17 |
| 3. Điểm dừng, bổ đề giảm, hội tụ của chuẩn gradient khi không lồi | 06.3, 06.7, 06.8, 06.9 | — |
| 4. Gradient lô nhỏ và thuật toán hạ gradient ngẫu nhiên | 06.4, 06.7 | — |
| 5. Hội tụ của hạ gradient ngẫu nhiên, dừng sớm và chính quy hóa bậc hai | 06.5, 06.6, 06.7, 06.10 | 06.16 |
| 6. Chọn phương pháp | 06.6, 06.11 | — |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 2; đếm số lần tính hàm của sai phân tiến.

::: exercise Bài tập 06.12 (Số lần tính hàm của sai phân tiến; Kupferschmid, Bài 25.8.35(d)(e), tr. 844)
Cho $\phi:\mathbb R^p\to\mathbb R$. Sai phân tiến xấp xỉ đạo hàm riêng bậc một và bậc hai của $\phi$ tại $\theta$ bằng

$$
\begin{aligned}
&\frac{\partial\phi}{\partial\theta_i}(\theta)\\
&\quad\approx\frac{\phi(\theta+\varepsilon\hat e_i)-\phi(\theta)}{\varepsilon},\\
&\frac{\partial^2\phi}{\partial\theta_i\partial\theta_j}(\theta)\\
&\quad\approx\frac1{\varepsilon^2}\bigl(\phi(\theta+\varepsilon\hat e_i+\varepsilon\hat e_j)\\
&\qquad-\phi(\theta+\varepsilon\hat e_i)-\phi(\theta+\varepsilon\hat e_j)\\
&\qquad+\phi(\theta)\bigr).
\end{aligned}
$$

- **(a)** Giải thích vì sao xấp xỉ gradient $\nabla\phi(\theta)$ bằng sai phân tiến cần $p+1$ lần tính giá trị của $\phi$.
- **(b)** Giải thích vì sao xấp xỉ Hessian đối xứng $\nabla^2\phi(\theta)$ bằng sai phân tiến cần $(\tfrac12p+1)(p+1)$ lần tính giá trị của $\phi$.
:::

::: hint Gợi ý 1
Đếm các điểm khác nhau mà công thức cần giá trị của $\phi$; một giá trị dùng được cho nhiều thành phần thì chỉ tính một lần.
:::

::: hint Gợi ý 2
Ở (b), dùng tính đối xứng của Hessian để giảm số phần tử cần tính; với $i=j$, điểm $\theta+\varepsilon\hat e_i+\varepsilon\hat e_j$ là $\theta+2\varepsilon\hat e_i$.
:::

::: solution Lời giải Bài tập 06.12
**Câu (a).** Thành phần $i$ cần $\phi(\theta+\varepsilon\hat e_i)$ và $\phi(\theta)$. Giá trị $\phi(\theta)$ dùng chung cho cả $p$ thành phần, nên cần $p$ giá trị $\phi(\theta+\varepsilon\hat e_i)$, $i=1,\ldots,p$, cộng một giá trị $\phi(\theta)$: tổng $p+1$.

**Câu (b).** Phần tử $(i,j)$ cần bốn giá trị: $\phi(\theta+\varepsilon\hat e_i+\varepsilon\hat e_j)$, $\phi(\theta+\varepsilon\hat e_i)$, $\phi(\theta+\varepsilon\hat e_j)$, $\phi(\theta)$. Vì Hessian đối xứng, chỉ cần các cặp $i\le j$, gồm $\tfrac12p(p+1)$ cặp, và mỗi cặp có một điểm $\theta+\varepsilon\hat e_i+\varepsilon\hat e_j$ riêng (với $i=j$ là $\theta+2\varepsilon\hat e_i$). Các giá trị $\phi(\theta+\varepsilon\hat e_i)$, $i=1,\ldots,p$, và $\phi(\theta)$ dùng chung. Tổng số lần tính là

$$
\begin{aligned}
&\tfrac12p(p+1)+p+1\\
&\quad=(\tfrac12p+1)(p+1).
\end{aligned}
$$

Với mạng hai tầng, mỗi lần tính $\ell$ là một lần truyền xuôi, nên câu (a) là kết luận 3 của Mệnh đề 06.14: $p+1$ lần truyền xuôi cho một gradient mẫu, như $78\,602$ lần ở Ví dụ 06.7.

**Kiểm tra lại.** Với $p=1$: gradient cần $\phi(\theta+\varepsilon)$, $\phi(\theta)$, tức $2=p+1$ giá trị; đạo hàm bậc hai cần thêm $\phi(\theta+2\varepsilon)$, tức $3=(\tfrac12+1)\cdot2$ giá trị.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 2; chứng minh sai phân trung tâm chính xác với hàm bậc hai và đánh giá sai số chặt cụt của nó.

::: exercise Bài tập 06.13 (Sai phân trung tâm trên hàm bậc hai và sai số chặt cụt; Kupferschmid, Bài 25.8.39 và 25.8.42, tr. 844)
Sai phân trung tâm xấp xỉ đạo hàm riêng bậc một và bậc hai của $\phi:\mathbb R^p\to\mathbb R$ tại $\theta$ bằng

$$
\begin{aligned}
&\frac{\partial\phi}{\partial\theta_i}(\theta)\\
&\quad\approx\frac{\phi(\theta+\varepsilon\hat e_i)-\phi(\theta-\varepsilon\hat e_i)}{2\varepsilon},\\
&\frac{\partial^2\phi}{\partial\theta_i\partial\theta_j}(\theta)\\
&\quad\approx\frac1{4\varepsilon^2}\bigl(\phi(\theta+\varepsilon\hat e_i+\varepsilon\hat e_j)\\
&\qquad-\phi(\theta-\varepsilon\hat e_i+\varepsilon\hat e_j)\\
&\qquad-\phi(\theta+\varepsilon\hat e_i-\varepsilon\hat e_j)\\
&\qquad+\phi(\theta-\varepsilon\hat e_i-\varepsilon\hat e_j)\bigr).
\end{aligned}
$$

- **(a)** Chứng minh rằng nếu $\phi(\theta)=\tfrac12\theta^\top H\theta+\beta^\top\theta+\beta_0$ với $H\in\mathbb R^{p\times p}$ đối xứng, $\beta\in\mathbb R^p$, $\beta_0\in\mathbb R$, thì xấp xỉ trung tâm của mọi đạo hàm riêng bậc một là chính xác với mọi $\varepsilon>0$.
- **(b)** Với cùng hàm bậc hai đó, xác định xấp xỉ trung tâm của Hessian có chính xác hay không.
- **(c)** Cho $\phi:\mathbb R\to\mathbb R$ khả vi liên tục ba lần. Dùng khai triển Taylor, chứng minh sai số chặt cụt $\frac{\phi(t+\varepsilon)-\phi(t-\varepsilon)}{2\varepsilon}-\phi'(t)$ của sai phân trung tâm tỉ lệ với $\varepsilon^2$.
:::

::: hint Gợi ý 1
Với hàm bậc hai, khai triển Taylor bậc hai là đẳng thức chính xác; với hàm một biến khả vi liên tục ba lần, khai triển Taylor bậc hai có thêm phần dư bậc ba.
:::

::: hint Gợi ý 2
Ở (a), (b), thế $w=\pm\varepsilon\hat e_i\pm\varepsilon\hat e_j$ vào $\phi(\theta+w)=\phi(\theta)+(H\theta+\beta)^\top w+\tfrac12w^\top Hw$. Ở (c), viết $\phi(t\pm\varepsilon)$ theo định lý Taylor với phần dư Lagrange, trừ hai đẳng thức, rồi dùng định lý giá trị trung gian cho $\phi'''$ (Giải tích 1).
:::

::: solution Lời giải Bài tập 06.13
**Câu (a).** Với mọi $w\in\mathbb R^p$, $\phi(\theta+w)=\phi(\theta)+(H\theta+\beta)^\top w+\tfrac12w^\top Hw$ chính xác, vì $\phi$ bậc hai. Do đó

$$
\begin{aligned}
&\phi(\theta+v)-\phi(\theta-v)\\
&\quad=2(H\theta+\beta)^\top v,
\end{aligned}
$$

vì số hạng $\tfrac12v^\top Hv$ có mặt trong cả $\phi(\theta+v)$ lẫn $\phi(\theta-v)$ và triệt tiêu khi trừ. Với $v=\varepsilon\hat e_i$, thương sai phân bằng $(H\theta+\beta)_i=\frac{\partial\phi}{\partial\theta_i}(\theta)$, với mọi $\varepsilon>0$.

**Câu (b).** Có. Đặt $u=\varepsilon\hat e_i$, $v=\varepsilon\hat e_j$ và $S=\phi(\theta+u+v)-\phi(\theta-u+v)-\phi(\theta+u-v)+\phi(\theta-u-v)$. Trong khai triển trên, các số hạng hằng có hệ số $1-1-1+1=0$, các số hạng bậc nhất có tổng $(H\theta+\beta)^\top\bigl((u+v)-(v-u)-(u-v)+(-u-v)\bigr)=0$, còn các số hạng bậc hai cho

$$
\begin{aligned}
S&=\tfrac12(u+v)^\top H(u+v)\cdot2\\
&\quad-\tfrac12(u-v)^\top H(u-v)\cdot2\\
&=4u^\top Hv=4\varepsilon^2H_{ij},
\end{aligned}
$$

dùng $(v-u)^\top H(v-u)=(u-v)^\top H(u-v)$. Vậy $S/(4\varepsilon^2)=H_{ij}=\frac{\partial^2\phi}{\partial\theta_i\partial\theta_j}$, kể cả khi $i=j$, với mọi $\varepsilon>0$.

**Câu (c).** Theo định lý Taylor với phần dư Lagrange, có $t_+\in(t,t+\varepsilon)$ và $t_-\in(t-\varepsilon,t)$ để

$$
\begin{aligned}
\phi(t\pm\varepsilon)&=\phi(t)\pm\varepsilon\phi'(t)\\
&\quad+\tfrac{\varepsilon^2}2\phi''(t)\\
&\quad\pm\tfrac{\varepsilon^3}6\phi'''(t_\pm).
\end{aligned}
$$

Trừ hai đẳng thức rồi chia cho $2\varepsilon$:

$$
\begin{aligned}
&\frac{\phi(t+\varepsilon)-\phi(t-\varepsilon)}{2\varepsilon}-\phi'(t)\\
&\quad=\frac{\varepsilon^2}{12}\bigl(\phi'''(t_+)+\phi'''(t_-)\bigr).
\end{aligned}
$$

Trung bình $\tfrac12\bigl(\phi'''(t_+)+\phi'''(t_-)\bigr)$ nằm giữa $\phi'''(t_-)$ và $\phi'''(t_+)$. Vì $\phi'''$ liên tục, định lý giá trị trung gian cho $t^\circ\in[t_-,t_+]\subset[t-\varepsilon,t+\varepsilon]$ với $\phi'''(t^\circ)$ bằng trung bình đó, nên sai số bằng $\tfrac{\varepsilon^2}6\phi'''(t^\circ)$ và có trị tuyệt đối không quá $\tfrac{\varepsilon^2}6\max_{[t-\varepsilon,t+\varepsilon]}\lvert\phi'''\rvert$. Khi $\varepsilon\to0$, sai số chia cho $\varepsilon^2$ tiến về $\tfrac16\phi'''(t)$. Sai phân trung tâm vì vậy có sai số chặt cụt bậc $\varepsilon^2$, nhỏ hơn bậc $\varepsilon$ của sai phân tiến (5.1); dòng **Kiểm tra lại** của Ví dụ 06.9 dùng đúng tính chính xác của câu (a) theo một tọa độ.

**Kiểm tra lại.** Với $\phi(t)=t^3$, $t=1$: $\frac{(1+\varepsilon)^3-(1-\varepsilon)^3}{2\varepsilon}=\frac{6\varepsilon+2\varepsilon^3}{2\varepsilon}=3+\varepsilon^2$, nên sai số là $\varepsilon^2=\tfrac{\varepsilon^2}6\cdot6$, khớp $\phi'''\equiv6$. Với $\phi(t)=t^2$, sai số bằng $0$, khớp câu (a).
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 2; dựng cây tính toán của một hàm hợp và ghép đạo hàm cục bộ bằng quy tắc dây chuyền.

::: exercise Bài tập 06.14 (Cây phân tích và quy tắc dây chuyền cho $\theta_2(1+e^{2\theta_1})$; Kupferschmid, Bài 25.8.58, tr. 846)
Cho hàm $\phi(\theta)=\theta_2\bigl(1+e^{2\theta_1}\bigr)$ với $\theta=(\theta_1,\theta_2)^\top\in\mathbb R^2$.

- **(a)** Vẽ một cây phân tích (parse tree), tức một đồ thị tính toán (Định nghĩa 06.9) có dạng cây, để tính giá trị của hàm.
- **(b)** Viết biểu thức đạo hàm riêng của mỗi biến trung gian theo các đầu vào của phép toán sinh ra nó.
- **(c)** Dùng quy tắc dây chuyền ghép các đạo hàm riêng đó để tìm $\nabla\phi(\theta)$.
:::

::: hint Gợi ý 1
Đặt một biến trung gian cho mỗi phép toán cơ bản trong biểu thức.
:::

::: hint Gợi ý 2
Ở (c), đi từ nút gốc về các đầu vào, nhân đạo hàm đã có của nút sau với đạo hàm cục bộ của nút đang xét.
:::

::: solution Lời giải Bài tập 06.14
**Câu (a).** Đặt các biến trung gian $v_1=2\theta_1$, $v_2=e^{v_1}$, $v_3=1+v_2$, $v_4=\theta_2v_3=\phi(\theta)$. Cây có các cạnh từ con lên cha:

- $2\to v_1$ và $\theta_1\to v_1$;
- $v_1\to v_2$;
- $1\to v_3$ và $v_2\to v_3$;
- $v_3\to v_4$ và $\theta_2\to v_4$.

Nút gốc là $v_4$, các lá là $\theta_1$, $\theta_2$ và hằng số $2$, $1$.

**Câu (b).** Các đạo hàm cục bộ là

$$
\begin{aligned}
&\frac{\partial v_1}{\partial\theta_1}=2,\quad\frac{\partial v_2}{\partial v_1}=e^{v_1},\\
&\frac{\partial v_3}{\partial v_2}=1,\\
&\frac{\partial v_4}{\partial v_3}=\theta_2,\quad\frac{\partial v_4}{\partial\theta_2}=v_3 .
\end{aligned}
$$

**Câu (c).** Theo Bổ đề 06.10 cho từng nút, đi ngược từ $v_4$:

$$
\begin{aligned}
\frac{\partial\phi}{\partial v_3}&=\theta_2,\qquad\frac{\partial\phi}{\partial v_2}=\theta_2\cdot1,\\
\frac{\partial\phi}{\partial v_1}&=\theta_2e^{v_1},\\
\frac{\partial\phi}{\partial\theta_1}&=2\theta_2e^{2\theta_1},\\
\frac{\partial\phi}{\partial\theta_2}&=v_3=1+e^{2\theta_1}.
\end{aligned}
$$

Vậy $\nabla\phi(\theta)=\bigl(2\theta_2e^{2\theta_1},\ 1+e^{2\theta_1}\bigr)^\top$.

**Kiểm tra lại.** Lấy đạo hàm trực tiếp: $\frac{\partial}{\partial\theta_1}\theta_2(1+e^{2\theta_1})=\theta_2\cdot2e^{2\theta_1}$ và $\frac{\partial}{\partial\theta_2}\theta_2(1+e^{2\theta_1})=1+e^{2\theta_1}$. Tại $\theta=(0,1)^\top$, cả hai cách cho $\nabla\phi=(2,2)^\top$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 2; chứng minh các công thức lan truyền ngược của mạng hai tầng với tầng ra softmax.

::: exercise Bài tập 06.15 (Lan truyền ngược cho mạng hai tầng với tầng ra softmax; Murphy (2022), Bài 13.1, tr. 463–465)
Cho mạng hai tầng của Định nghĩa 06.4 với tầng ra có $J$ thành phần, dùng cho phân loại $J$ lớp:

$$
\begin{aligned}
z&=W_1x+b_1\in\mathbb R^m,\\
h&=\sigma(z)\in\mathbb R^m,\\
a&=W_2h+b_2\in\mathbb R^J,\\
\hat y&=\operatorname{softmax}(a),\\
\ell&=-\textstyle\sum_{k=1}^Jy_k\log\hat y_k,
\end{aligned}
$$

với đầu vào $x\in\mathbb R^d$, $W_1\in\mathbb R^{m\times d}$, $b_1\in\mathbb R^m$, $W_2\in\mathbb R^{J\times m}$, $b_2\in\mathbb R^J$, $m$ đơn vị ẩn và nhãn $y\in\{0,1\}^J$ có đúng một thành phần bằng $1$. Hàm kích hoạt $\sigma$ là ReLU. Hàm softmax cho $\hat y_k=e^{a_k}/\sum_{l=1}^Je^{a_l}$, và $\ell$ là mất mát entropy chéo (cross-entropy) (Bài 02). Gradient theo một ma trận có cùng cỡ với ma trận đó. Tại điểm không có $z_j$ nào bằng $0$, gradient của $\ell$ theo $a$ và theo $z$ là

$$
\begin{aligned}
\delta_a&=\nabla_a\ell=\hat y-y,\\
\delta_z&=\nabla_z\ell=(W_2^\top\delta_a)\odot\mathbb 1[z>0].
\end{aligned}
$$

Chứng minh

$$
\begin{aligned}
&\nabla_{W_2}\ell=\delta_ah^\top,\quad\nabla_{b_2}\ell=\delta_a,\\
&\nabla_{W_1}\ell=\delta_zx^\top,\quad\nabla_{b_1}\ell=\delta_z,\\
&\nabla_x\ell=W_1^\top\delta_z .
\end{aligned}
$$
:::

::: hint Gợi ý 1
Xét lần lượt ba nút $a$, $h$, $z$ theo thứ tự ngược của đồ thị.
:::

::: hint Gợi ý 2
Mỗi nút là một phép affine $v=Mu+\beta$ hoặc một phép áp theo từng thành phần; dùng đúng trường hợp của Bổ đề 06.10.
:::

::: solution Lời giải Bài tập 06.15
**Bước 1 (nút $a$).** $a=W_2h+b_2$ là trường hợp 2 của Bổ đề 06.10 với $M=W_2$, $u=h$, $\beta=b_2$ và $\delta_v=\delta_a$, nên

$$
\begin{aligned}
&\nabla_{W_2}\ell=\delta_ah^\top,\quad\nabla_{b_2}\ell=\delta_a,\\
&\delta_h=\nabla_h\ell=W_2^\top\delta_a .
\end{aligned}
$$

**Bước 2 (nút $h$).** $h=\sigma(z)$ theo từng thành phần. Tại điểm không có $z_j=0$, $\sigma$ khả vi tại mọi $z_j$ với đạo hàm $\mathbb 1[z_j>0]$, nên trường hợp 1 của Bổ đề 06.10 cho $\nabla_z\ell=\mathbb 1[z>0]\odot\delta_h=(W_2^\top\delta_a)\odot\mathbb 1[z>0]$, đúng biểu thức $\delta_z$ đã cho.

**Bước 3 (nút $z$).** $z=W_1x+b_1$ là trường hợp 2 với $M=W_1$, $u=x$, $\beta=b_1$ và $\delta_v=\delta_z$, nên $\nabla_{W_1}\ell=\delta_zx^\top$, $\nabla_{b_1}\ell=\delta_z$ và $\nabla_x\ell=W_1^\top\delta_z$.

**Bước 4 (ghép).** Mỗi tham số chỉ ảnh hưởng tới $\ell$ qua đúng một nút ($W_2$, $b_2$ qua $a$; $W_1$, $b_1$, $x$ qua $z$), nên các đạo hàm ở Bước 1 và Bước 3 là các gradient cần tìm. Thuật toán 06.11 và Mệnh đề 06.12 xét tầng ra một chiều với mất mát $\ell(\cdot,y)$ khả vi bất kỳ; lời giải trên là bản $J$ chiều của chúng với mất mát entropy chéo.

**Kiểm tra lại.** Dữ kiện $\delta_a$: vì $\sum_ky_k=1$, $\ell=-y^\top a+\log\sum_le^{a_l}$, nên $\partial\ell/\partial a_k=\hat y_k-y_k$. Với $J=2$, $a=(0,0)^\top$, $y=(1,0)^\top$: $\hat y=(\tfrac12,\tfrac12)^\top$, $\delta_a=(-\tfrac12,\tfrac12)^\top$, và $\partial\ell/\partial a_1=-1+\tfrac12=-\tfrac12$, khớp. Kích thước: $\delta_ah^\top\in\mathbb R^{J\times m}$ bằng cỡ $W_2$; $\delta_zx^\top\in\mathbb R^{m\times d}$ bằng cỡ $W_1$; $W_1^\top\delta_z\in\mathbb R^d$ bằng cỡ $x$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 5; giải bài toán chính quy hóa bậc hai qua phân rã giá trị kỳ dị và đọc hệ số co theo từng hướng.

::: exercise Bài tập 06.16 (Chính quy hóa bậc hai qua phân rã giá trị kỳ dị; Boyd và Vandenberghe, Bài 6.7(a), tr. 346)
Cho $A\in\mathbb R^{n\times p}$ có hạng $r_A$ và $y\in\mathbb R^n$, với phân rã giá trị kỳ dị (singular value decomposition, SVD) dạng rút gọn

$$
A=\sum_{i=1}^{r_A}\varsigma_i\,\zeta_i\xi_i^\top .
$$

Theo Định nghĩa 00.26 với $A=Q_1SQ_2^\top$, $\zeta_i\in\mathbb R^n$ và $\xi_i\in\mathbb R^p$ là cột thứ $i$ của $Q_1$ và $Q_2$, còn $\varsigma_i>0$ là phần tử $(i,i)$ của $S$, tức giá trị kỳ dị thứ $i$ (Định nghĩa 00.26 viết $s_i$). Với $\lambda>0$, chỉ ra cách tìm nghiệm của bài toán chính quy hóa bậc hai (còn gọi là chính quy hóa Tikhonov, Tikhonov regularization)

$$
\operatorname*{minimize}_{\theta\in\mathbb R^p}\ \lVert A\theta-y\rVert^2+\lambda\lVert\theta\rVert^2
$$

từ phân rã giá trị kỳ dị của $A$.
:::

::: hint Gợi ý 1
Mục tiêu lồi chặt; viết điều kiện bậc nhất và biểu diễn $A^\top A$, $A^\top y$ theo $\varsigma_i$, $\zeta_i$, $\xi_i$.
:::

::: hint Gợi ý 2
Viết $\theta=\sum_{i=1}^p\tilde\theta_i\xi_i$ theo các cột $\xi_1,\ldots,\xi_p$ của $Q_2$, rồi nhân điều kiện bậc nhất với từng $\xi_i^\top$.
:::

::: solution Lời giải Bài tập 06.16
**Bước 1 (điều kiện bậc nhất).** Hessian của mục tiêu là $2(A^\top A+\lambda I)\succ0$. Do đó $A^\top A+\lambda I$ khả nghịch, mục tiêu lồi chặt nên có nhiều nhất một điểm cực tiểu (Định lý 01.34), và theo Hệ quả 01.26, nghiệm duy nhất của

$$
(A^\top A+\lambda I)\theta=A^\top y
$$

là điểm cực tiểu đó.

**Bước 2 (viết theo các vector kỳ dị).** Từ phân rã và $\zeta_i^\top\zeta_k=0$ khi $i\ne k$, $\zeta_i^\top\zeta_i=1$:

$$
\begin{aligned}
A^\top A&=\sum_{i=1}^{r_A}\varsigma_i^2\,\xi_i\xi_i^\top,\\
A^\top y&=\sum_{i=1}^{r_A}\varsigma_i(\zeta_i^\top y)\,\xi_i .
\end{aligned}
$$

Các cột $\xi_1,\ldots,\xi_p$ của $Q_2$ là một cơ sở trực chuẩn của $\mathbb R^p$; viết $\theta=\sum_{i=1}^p\tilde\theta_i\xi_i$. Nhân phương trình ở Bước 1 với $\xi_i^\top$:

$$
\begin{aligned}
(\varsigma_i^2+\lambda)\tilde\theta_i&=\varsigma_i\,\zeta_i^\top y,\quad i\le r_A,\\
\lambda\tilde\theta_i&=0,\quad i>r_A .
\end{aligned}
$$

**Bước 3 (nghiệm).** Do đó

$$
\theta_\lambda=\sum_{i=1}^{r_A}\frac{\varsigma_i}{\varsigma_i^2+\lambda}\,(\zeta_i^\top y)\,\xi_i .
$$

Khi đã có phân rã, phép tính gồm $r_A$ tích vô hướng $\zeta_i^\top y$ trong $\mathbb R^n$ và tổ hợp $r_A$ vector $\xi_i$, tức bậc $(n+p)r_A$ phép nhân–cộng cho mỗi giá trị $\lambda$.

**Bước 4 (so với Mệnh đề 06.40).** Đặt

$$
\theta^+=A^\dagger y=\sum_{i=1}^{r_A}\frac1{\varsigma_i}(\zeta_i^\top y)\,\xi_i ,
$$

với giả nghịch đảo $A^\dagger$ của Định nghĩa 00.27. Ta có $A^\top A\theta^+=\sum_{i\le r_A}\varsigma_i(\zeta_i^\top y)\xi_i=A^\top y$, nên $\theta^+$ là một nghiệm bình phương nhỏ nhất. Theo Định lý 00.9, các nghiệm khác của $A^\top A\theta=A^\top y$ bằng $\theta^+$ cộng một vector của $\operatorname{Ker}(A^\top A)=\operatorname{span}\{\xi_i:i>r_A\}$, trực giao với $\theta^+$, nên $\theta^+$ là nghiệm có chuẩn nhỏ nhất. Vì $A^\top(A\theta^+-y)=0$, khai triển $\lVert A(\theta-\theta^+)+(A\theta^+-y)\rVert^2$ cho

$$
\begin{aligned}
&\tfrac12\lVert A\theta-y\rVert^2\\
&\quad=\tfrac12(\theta-\theta^+)^\top A^\top A(\theta-\theta^+)\\
&\qquad+\tfrac12\lVert A\theta^+-y\rVert^2 .
\end{aligned}
$$

Mục tiêu của bài vì vậy bằng hai lần $Q(\theta)+\tfrac\lambda2\lVert\theta\rVert^2$ cộng một hằng số, với $Q$ của Mệnh đề 06.40, $H=A^\top A$, $\theta^*=\theta^+$ và trị riêng $\alpha_i=\varsigma_i^2$ theo $\xi_i$ với $i\le r_A$, $\alpha_i=0$ với $i>r_A$.

- Khi $r_A=p$, mọi $\alpha_i>0$, và Mệnh đề 06.40 cho $\xi_i^\top\theta_\lambda=\frac{\alpha_i}{\alpha_i+\lambda}\,\xi_i^\top\theta^+$, khớp Bước 3.
- Khi $r_A<p$, các hướng $\xi_i$ với $i>r_A$ có $\alpha_i=0$, nằm ngoài giả thiết $\alpha_j>0$ của mệnh đề. Theo các hướng đó, Bước 2 cho $\tilde\theta_i=0$, và $\theta^+$ cũng có thành phần $0$. Theo các hướng $i\le r_A$, Bước 3 cho thành phần của $\theta_\lambda$ bằng $\frac{\varsigma_i^2}{\varsigma_i^2+\lambda}$ lần thành phần của $\theta^+$, đúng tỉ lệ giữ của Mệnh đề 06.40.

**Kiểm tra lại.** Với $n=p=1$, $A=\varsigma>0$ ($r_A=1$, $\zeta_1=\xi_1=1$): mục tiêu $(\varsigma\theta-y)^2+\lambda\theta^2$ có đạo hàm $2\varsigma(\varsigma\theta-y)+2\lambda\theta=0$, cho $\theta=\frac{\varsigma y}{\varsigma^2+\lambda}$, khớp công thức ở Bước 3.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 2; đánh giá sai phân hữu hạn khi hàm không trơn và hệ quả cho phương pháp dựa trên gradient.

::: exercise Bài tập 06.17 (Sai phân hữu hạn trên hàm không trơn; Kupferschmid, Bài 25.8.32, tr. 843)
Giả sử sai phân hữu hạn được dùng để xấp xỉ gradient của một hàm không trơn $\phi$.

- **(a)** Mô tả các cách gradient xấp xỉ khác gradient đúng, và cho một ví dụ.
- **(b)** So sánh khả năng giải một bài toán không trơn của một phương pháp dựa trên gradient khi dùng đạo hàm giải tích và khi dùng xấp xỉ sai phân hữu hạn; nêu một lập luận hoặc một ví dụ làm căn cứ.
:::

::: hint Gợi ý 1
Xét $\phi(\theta)=\lvert\theta\rvert$ trên $\mathbb R$ với bước sai phân $\varepsilon$, tại $\theta=0$ và tại các điểm $\theta$ với $\lvert\theta\rvert<\varepsilon$.
:::

::: hint Gợi ý 2
Ở (b), so dãy hạ gradient bước hằng trên $\phi(\theta)=\lvert\theta\rvert$ khi dùng $\phi'(\theta)=\operatorname{sign}(\theta)$ và khi dùng sai phân trung tâm.
:::

::: solution Lời giải Bài tập 06.17
**Câu (a).** Khi $\phi$ có điểm gãy, thương sai phân dùng giá trị của $\phi$ ở hai phía của điểm gãy, nên nó có thể khác đạo hàm cả về độ lớn lẫn về dấu, kể cả tại các điểm mà $\phi$ khả vi. Ví dụ với $\phi(\theta)=\lvert\theta\rvert$ và bước $\varepsilon>0$:

- tại $\theta=0$, $\phi$ không khả vi; sai phân tiến cho $\frac{\lvert\varepsilon\rvert-0}{\varepsilon}=1$, sai phân lùi cho $-1$, sai phân trung tâm cho $0$, nên giá trị trả về do công thức quyết định;
- với $\lvert\theta\rvert\le\varepsilon$, sai phân trung tâm bằng $\frac{(\theta+\varepsilon)-(\varepsilon-\theta)}{2\varepsilon}=\frac\theta\varepsilon$, trong khi $\phi'(\theta)=\operatorname{sign}(\theta)$ khi $\theta\ne0$; với $\varepsilon=0{,}1$, $\theta=0{,}025$, xấp xỉ là $0{,}25$ thay vì $1$;
- với $-\varepsilon<\theta<0$, sai phân tiến bằng $\frac{(\theta+\varepsilon)+\theta}{\varepsilon}=1+\frac{2\theta}\varepsilon$; với $\varepsilon=0{,}1$, $\theta=-0{,}025$, xấp xỉ là $0{,}5$, trái dấu với $\phi'(\theta)=-1$.

Hàm ReLU $\sigma(z)=\tfrac12(z+\lvert z\rvert)$ có cùng hiện tượng tại $z=0$, nơi lan truyền ngược dùng quy ước $\sigma'(0)=0$ (Nhận xét 06.13).

**Câu (b).** Xét hạ gradient bước hằng $\eta=0{,}3$ trên $\phi(\theta)=\lvert\theta\rvert$ từ $\theta_0=1$.

- Với đạo hàm giải tích $\operatorname{sign}(\theta)$: dãy là $1$; $0{,}7$; $0{,}4$; $0{,}1$; $-0{,}2$; $0{,}1$; $-0{,}2$; …, dao động mãi giữa $0{,}1$ và $-0{,}2$ và không tiến về điểm cực tiểu $0$.
- Với sai phân trung tâm bước $\varepsilon=0{,}2$: ngoài khoảng $\lvert\theta\rvert<\varepsilon$ xấp xỉ bằng $\operatorname{sign}(\theta)$, trong khoảng đó bằng $\theta/\varepsilon$, đúng là đạo hàm của hàm trơn hóa $\tfrac{\theta^2}{2\varepsilon}+\tfrac\varepsilon2$. Dãy là $1$; $0{,}7$; $0{,}4$; $0{,}1$, rồi $\theta_{k+1}=(1-\tfrac\eta\varepsilon)\theta_k=-\tfrac12\theta_k$, tức $-0{,}05$; $0{,}025$; … $\to0$.

Trên $\phi(\theta)=\lvert\theta\rvert$ với bước hằng $0{,}3$, đạo hàm giải tích cho dãy dao động, còn sai phân trung tâm cho dãy hội tụ, vì sai phân trung tâm là gradient của một hàm trơn gần $\phi$. Đổi lại, mỗi gradient xấp xỉ tốn $2p$ lần tính $\phi$ thay vì một lần lan truyền ngược (Mệnh đề 06.14), và theo câu (a), gần điểm gãy hướng xấp xỉ có thể sai dấu. Với mạng ReLU có rất nhiều điểm gãy, huấn luyện dùng gradient của lan truyền ngược kèm quy ước $\sigma'(0)=0$.

**Kiểm tra lại.** Tại $\theta=0{,}025$, $\varepsilon=0{,}1$: $\frac{\lvert0{,}125\rvert-\lvert-0{,}075\rvert}{0{,}2}=\frac{0{,}05}{0{,}2}=0{,}25=\frac\theta\varepsilon$. Dãy dùng $\operatorname{sign}$: $0{,}1-0{,}3=-0{,}2$ và $-0{,}2+0{,}3=0{,}1$, nên dãy lặp lại hai giá trị này.
:::

## Tài liệu tham khảo

- Kupferschmid, Michael (2023), *Introduction to Mathematical Programming*, first edition, giấy phép CC BY 4.0:
  - §25.6.1–25.6.4 (tr. 820–827): sai phân tiến, sai phân trung tâm, chi phí và chọn bước sai phân;
  - mục Exercises 25.8: Bài 25.8.32 (tr. 843), 25.8.35(d)(e), 25.8.39 và 25.8.42 (tr. 844), 25.8.58 (tr. 846).
- Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả, mục Exercises của Chương 13 (§13.7):
  - Bài 13.1 (Backpropagation for a MLP, tr. 463–465).
- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press, mục Exercises của Chương 6:
  - Bài 6.7(a) (Bi-criterion optimization with Euclidean norms, tr. 346).
