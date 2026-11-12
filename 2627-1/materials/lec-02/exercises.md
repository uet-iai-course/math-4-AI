# Bài tập Bài 02 — Các bài toán tối ưu lồi

Bài tập 02.18–02.32 dưới đây đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-02/lecture-note.md&deck=lecture-02-cac-bai-toan-toi-uu-loi.html) và [bài giảng](lecture-02-cac-bai-toan-toi-uu-loi.html) của Bài 02. Các bài lấy từ Boyd và Vandenberghe (2004) và Murphy (2022); số trang là trang in của sách. Lời giải dẫn định nghĩa, định lý, mệnh đề và ví dụ theo số hiệu của ghi chú. Ký hiệu theo ghi chú: vector viết chữ thường, không in đậm, và là vector cột; bất đẳng thức giữa hai vector hiểu theo từng tọa độ; $\mathbf 1$ là vector có mọi tọa độ bằng $1$.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Chứng nhận một mô hình là bài toán tối ưu lồi bằng cách kiểm tra từng dòng | 02.2, 02.10, 02.11 | 02.18, 02.25, 02.32 |
| 1. Phân biệt kết luận "bài toán lồi" với kết luận "bài toán có nghiệm" | 02.2, 02.11 | 02.20, 02.21 |
| 2. Lập một quy hoạch tuyến tính | 02.3, 02.17 | 02.30, 02.31 |
| 2. Đưa quy hoạch tuyến tính về dạng chuẩn | 02.3 | 02.30 |
| 2. Chứng nhận nghiệm của quy hoạch tuyến tính | 02.3, 02.4, 02.15, 02.17 | 02.20, 02.21, 02.22, 02.23 |
| 2. Biến phụ cho trị tuyệt đối hoặc cực đại của hàm affine | 02.4, 02.12, 02.15, 02.17 | 02.20, 02.24, 02.31 |
| 3. Nhận dạng quy hoạch bậc hai và quy hoạch bậc hai có ràng buộc bậc hai | 02.6, 02.13 | 02.18, 02.20, 02.25, 02.26 |
| 3. Giải bài toán hồi quy có chính quy hóa | 02.5, 02.14 | 02.27, 02.28 |
| 3. Phân biệt số hạng phạt với ràng buộc chặn chuẩn | — | 02.26 |
| 4. Đưa bài toán chứa tích và tỷ số của các đại lượng dương về quy hoạch hình học | 02.7, 02.16 | 02.19, 02.29 |
| 4. Đổi biến logarit để được bài toán lồi tương đương | 02.1, 02.16 | 02.29 |
| 5. Biến đổi tương đương: ánh xạ đưa sang và ánh xạ khôi phục | 02.1, 02.12 | 02.28, 02.29 |
| 5. Hàm thay thế, số hạng phạt và nới lỏng | 02.8, 02.9, 02.11, 02.13 | — |
| 5. Cận cho giá trị tối ưu từ nới lỏng tuyến tính | 02.9, 02.11 | — |
| 6. Quy trình nhận dạng cho một mô hình mới | 02.10, 02.17 | 02.31, 02.32 |
| 6. Kết luận mất khi một giả thiết bị vi phạm | 02.10, 02.12 | 02.18, 02.25, 02.31 |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 1, 3, 6; nhận ra một ràng buộc bậc hai lồi và kiểm tra chiều ngược của kết luận.

::: exercise Bài tập 02.18 (Tập nghiệm của một bất đẳng thức bậc hai; Boyd và Vandenberghe, Bài 2.10(a), tr. 61)
Cho ma trận đối xứng $P_1\in\mathbb R^{n\times n}$, vector $q_1\in\mathbb R^n$, số $\rho_1\in\mathbb R$, và
$$
\begin{aligned}
C=\{x\in\mathbb R^n\mid\ &\tfrac12x^TP_1x+q_1^Tx\\
&+\rho_1\le0\}.
\end{aligned}
$$

- **(a)** Chứng minh $C$ lồi nếu $P_1\succeq0$.
- **(b)** Xác định chiều ngược có đúng không: nếu $C$ lồi thì $P_1\succeq0$.
:::

::: hint Gợi ý 1
Ở (a), tính Hessian của hàm $f_1(x)=\tfrac12x^TP_1x+q_1^Tx+\rho_1$ và viết $C$ thành một tập mức dưới của $f_1$.
:::

::: hint Gợi ý 2
Ở (b), xét $n=1$, $q_1=0$ và $P_1<0$, rồi xác định $C$ theo dấu của $\rho_1$.
:::

::: solution Lời giải Bài tập 02.18
**Câu (a).** $C$ là tập khả thi của (6.4) với $m=1$, $P_0=0$, $q_0=0$ và không có đẳng thức, nên khi $P_1\succeq0$, $C$ là tập mức dưới lồi của $f_1$ theo Mệnh đề 02.25(a).

**Câu (b).** Chiều ngược sai. Với $n=1$, $P_1=-2$, $q_1=0$, $\rho_1=-1$, bất đẳng thức là $-x^2-1\le0$, đúng với mọi $x\in\mathbb R$. Do đó $C=\mathbb R$, là tập lồi (Mệnh đề 01.18(a)), trong khi $P_1=-2$ có $v^TP_1v=-2v^2<0$ với $v\ne0$, nên $P_1\not\succeq0$ (Định nghĩa 00.17). Vậy $P_1\succeq0$ là điều kiện đủ nhưng không là điều kiện cần cho tính lồi của $C$, khớp với ý 1 của Nhận xét 02.3: một tập khả thi lồi vẫn có thể được biểu diễn bằng một hàm ràng buộc không lồi.

**Kiểm tra lại.** Với dữ kiện ở (b), $-x^2-1\le-1<0$ với mọi $x$. Với $P_1=2$, $q_1=0$, $\rho_1=-1$ ở (a), bất đẳng thức $x^2-1\le0$ cho $C=[-1,1]$, lồi.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 4; đưa ràng buộc chứa một số hạng âm về dạng chuẩn của quy hoạch hình học.

::: exercise Bài tập 02.19 (Quy hoạch signomial đưa về quy hoạch hình học; Boyd và Vandenberghe, Bài 4.35, tr. 200)
Một *signomial* là một tổ hợp tuyến tính với hệ số thực của các đơn thức (Định nghĩa 02.28) theo các biến dương $x_1,\ldots,x_n$; tổng đơn thức dương là signomial có mọi hệ số dương. Một *quy hoạch signomial* (signomial program) là bài toán cực tiểu một signomial với các ràng buộc "signomial $\le0$" và "signomial $=0$". Xét quy hoạch signomial
$$
\begin{aligned}
&\underset{x\in\mathbb R^n_{++}}{\operatorname{minimize}}\ f_0(x)\\
&\text{subject to}\\
&\ \ f_i(x)-g_i(x)\le0,\\
&\ \ \quad i=1,\ldots,m,\\
&\ \ g_j'(x)-g_j''(x)=0,\\
&\ \ \quad j=1,\ldots,p,
\end{aligned}
$$
trong đó $f_0,f_1,\ldots,f_m$ là tổng đơn thức dương, còn $g_i$, $g_j'$, $g_j''$ là đơn thức. Như vậy mỗi hàm ràng buộc bất đẳng thức có đúng một hạng với hệ số âm, và mỗi hàm ràng buộc đẳng thức có đúng một hạng với hệ số dương và một hạng với hệ số âm. Đưa bài toán về một quy hoạch hình học dạng chuẩn (7.1) có cùng tập khả thi và cùng hàm mục tiêu.
:::

::: hint Gợi ý 1
Chuyển hạng có hệ số âm của mỗi ràng buộc sang vế phải.
:::

::: hint Gợi ý 2
Chia hai vế cho một đơn thức dương theo Mệnh đề 02.30, rồi kiểm tra từng dòng theo Định nghĩa 02.29.
:::

::: solution Lời giải Bài tập 02.19
**Ràng buộc bất đẳng thức.** Với $x>0$, $f_i(x)-g_i(x)\le0$ khi và chỉ khi $f_i(x)\le g_i(x)$, và theo Mệnh đề 02.30(a), khi và chỉ khi $f_i(x)/g_i(x)\le1$, với $f_i/g_i$ là tổng đơn thức dương.

**Ràng buộc đẳng thức.** Với $x>0$, $g_j'(x)-g_j''(x)=0$ khi và chỉ khi $g_j'(x)=g_j''(x)$, và theo Mệnh đề 02.30(b), khi và chỉ khi $g_j'(x)/g_j''(x)=1$, với $g_j'/g_j''$ là đơn thức.

**Bài toán mới.** Bài toán
$$
\begin{aligned}
&\underset{x\in\mathbb R^n_{++}}{\operatorname{minimize}}\ f_0(x)\\
&\text{subject to}\\
&\ \ f_i(x)/g_i(x)\le1,\\
&\ \ \quad i=1,\ldots,m,\\
&\ \ g_j'(x)/g_j''(x)=1,\\
&\ \ \quad j=1,\ldots,p,
\end{aligned}
$$
có mục tiêu là tổng đơn thức dương, các ràng buộc bất đẳng thức có dạng "tổng đơn thức dương $\le1$" và các ràng buộc đẳng thức có dạng "đơn thức $=1$", nên là quy hoạch hình học dạng chuẩn (7.1). Hai tương đương trên cho thấy hai bài toán có cùng tập khả thi, và mục tiêu không đổi. Với $\varphi(x)=x$, $\psi(x)=x$, $T(s)=s$, cả hai bất đẳng thức của (4.3) đúng với dấu bằng, nên theo Mệnh đề 02.6, hai bài toán có cùng tập nghiệm và cùng giá trị tối ưu. Định lý 02.33 đưa tiếp bài toán mới về dạng lồi (7.4).

**Kiểm tra lại.** Với $n=1$, bài toán $\min_{x>0}x$ với $1-x\le0$ có $f_0(x)=x$, $f_1(x)=1$, $g_1(x)=x$. Ràng buộc mới là $1/x\le1$, tức $x\ge1$, giống ràng buộc cũ; nghiệm là $x^*=1$ với $p^*=1$. Với $n=2$, đẳng thức $x_1-2x_2=0$ trở thành $x_1/(2x_2)=1$, cùng tập nghiệm $\{x>0\mid x_1=2x_2\}$.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2, 3; giải năm bài toán trên cùng một đa diện và chứng nhận từng nghiệm.

::: exercise Bài tập 02.20 (Năm mục tiêu trên cùng một miền; Boyd và Vandenberghe, Bài 4.1, tr. 189)
Xét bài toán
$$
\begin{aligned}
&\underset{x\in\mathbb R^2}{\operatorname{minimize}}\ f_0(x_1,x_2)\\
&\text{subject to}\\
&\ \ 2x_1+x_2\ge1,\quad x_1+3x_2\ge1,\\
&\ \ x_1\ge0,\quad x_2\ge0 .
\end{aligned}
$$
Vẽ phác tập khả thi bằng các đỉnh và các cạnh của nó. Với mỗi hàm mục tiêu sau, xác định tập nghiệm và giá trị tối ưu:

- **(a)** $f_0(x_1,x_2)=x_1+x_2$;
- **(b)** $f_0(x_1,x_2)=-x_1-x_2$;
- **(c)** $f_0(x_1,x_2)=x_1$;
- **(d)** $f_0(x_1,x_2)=\max\{x_1,x_2\}$;
- **(e)** $f_0(x_1,x_2)=x_1^2+9x_2^2$.
:::

::: hint Gợi ý 1
Tìm các đỉnh của tập khả thi bằng cách giải từng cặp phương trình biên. Ở (a), tìm $\mu\ge0$ để $(1,1)$ là tổ hợp không âm của các vector hệ số ràng buộc (Mệnh đề 02.11). Ở (b), thử một tia nằm trong tập khả thi.
:::

::: hint Gợi ý 2
Ở (d), thêm biến phụ $t$ theo Định lý 02.15(c), rồi tìm một tổ hợp không âm của $t-x_1\ge0$, $t-x_2\ge0$ và một ràng buộc của bài toán cho cận dưới của $t$. Ở (e), cực tiểu $f_0$ trên đường thẳng $x_1+3x_2=1$, rồi kiểm tra điểm tìm được bằng (4.2).
:::

::: solution Lời giải Bài tập 02.20
**Tập khả thi.** Hai biên $2x_1+x_2=1$ và $x_1+3x_2=1$ cắt nhau tại $(\tfrac25,\tfrac15)$; biên thứ nhất cắt trục $x_1=0$ tại $(0,1)$, biên thứ hai cắt trục $x_2=0$ tại $(1,0)$. Tập khả thi là một đa diện không bị chặn, có ba đỉnh $(0,1)$, $(\tfrac25,\tfrac15)$, $(1,0)$; biên gồm tia $\{(0,x_2)\mid x_2\ge1\}$, đoạn nối $(0,1)$ với $(\tfrac25,\tfrac15)$ trên đường $2x_1+x_2=1$, đoạn nối $(\tfrac25,\tfrac15)$ với $(1,0)$ trên đường $x_1+3x_2=1$, và tia $\{(x_1,0)\mid x_1\ge1\}$. Mọi ràng buộc đều affine và năm hàm mục tiêu đều lồi, nên năm bài toán đều ở dạng (4.1).

**Câu (a).** Giải $(1,1)=\mu_1(2,1)+\mu_2(1,3)$: $2\mu_1+\mu_2=1$, $\mu_1+3\mu_2=1$ cho $\mu_1=\tfrac25$, $\mu_2=\tfrac15$, đều dương. Theo Mệnh đề 02.11(a), $x_1+x_2\ge\tfrac25\cdot1+\tfrac15\cdot1=\tfrac35$ với mọi điểm khả thi. Điểm $(\tfrac25,\tfrac15)$ khả thi và đạt $\tfrac35$, nên là nghiệm theo (b) của mệnh đề. Theo (c), mọi nghiệm làm hai ràng buộc đầu chặt, và hệ $2x_1+x_2=1$, $x_1+3x_2=1$ có nghiệm duy nhất. Vậy $S^*=\{(\tfrac25,\tfrac15)\}$, $p^*=\tfrac35$.

**Câu (b).** Với $s\ge1$, điểm $(s,0)$ khả thi ($2s\ge1$, $s\ge1$) và $f_0(s,0)=-s\to-\infty$ khi $s\to\infty$. Vậy $p^*=-\infty$ và $S^*=\varnothing$: bài toán lồi, khả thi nhưng không bị chặn dưới, trạng thái 2 của Nhận xét 02.8.

**Câu (c).** Ràng buộc $x_1\ge0$ cho $f_0\ge0$ trên tập khả thi. Điểm $(0,x_2)$ khả thi khi và chỉ khi $x_2\ge1$ và $3x_2\ge1$, tức $x_2\ge1$. Vậy $p^*=0$ và $S^*=\{(0,x_2)\mid x_2\ge1\}$, một tia: tập nghiệm lồi (Hệ quả 02.4(b)) nhưng không bị chặn.

**Câu (d).** Theo Định lý 02.15(c), bài toán tương đương với $\min_{(x,t)}t$ với $t\ge x_1$, $t\ge x_2$ và bốn ràng buộc trên. Theo Mệnh đề 02.11(a) với các hệ số $\tfrac23,\tfrac13,\tfrac13$ trước ba ràng buộc $t-x_1\ge0$, $t-x_2\ge0$, $2x_1+x_2\ge1$: $\tfrac23(t-x_1)+\tfrac13(t-x_2)+\tfrac13(2x_1+x_2-1)=t-\tfrac13\ge0$, tức $t\ge\tfrac13$. Điểm $(x,t)=(\tfrac13,\tfrac13,\tfrac13)$ khả thi ($\tfrac23+\tfrac13=1$, $\tfrac13+1=\tfrac43\ge1$) và đạt $\tfrac13$. Theo Mệnh đề 02.11(c), mọi nghiệm có $t=x_1=x_2$ và $2x_1+x_2=1$, nên $x_1=x_2=\tfrac13$. Vậy $S^*=\{(\tfrac13,\tfrac13)\}$, $p^*=\tfrac13$.

**Câu (e).** Hàm $f_0$ có $\nabla^2f_0=\operatorname{diag}(2,18)\succ0$, nên bài toán là quy hoạch bậc hai với $P\succ0$ và có đúng một nghiệm (Mệnh đề 02.18(b)). Trên đường $x_1=1-3x_2$, $f_0=(1-3x_2)^2+9x_2^2$ có đạo hàm $-6(1-3x_2)+18x_2=36x_2-6$, bằng $0$ tại $x_2=\tfrac16$, nên ứng viên là $x^*=(\tfrac12,\tfrac16)$. Điểm này khả thi: $2\cdot\tfrac12+\tfrac16=\tfrac76\ge1$, $\tfrac12+\tfrac12=1$. Ta có $\nabla f_0(x^*)=(2x_1^*,18x_2^*)=(1,3)$, và với mọi $x$ khả thi,
$$
\begin{aligned}
&\nabla f_0(x^*)^T(x-x^*)\\
&\quad=x_1+3x_2-1\ge0 .
\end{aligned}
$$
Theo Hệ quả 02.4(c), $x^*$ là nghiệm. Vậy $S^*=\{(\tfrac12,\tfrac16)\}$, $p^*=\tfrac14+\tfrac14=\tfrac12$.

**Kiểm tra lại.**

- Ở (a), đỉnh $(0,1)$ và $(1,0)$ cho giá trị $1>\tfrac35$.
- Ở (d), đỉnh $(\tfrac25,\tfrac15)$ cho $\max\{\tfrac25,\tfrac15\}=\tfrac25>\tfrac13$.
- Ở (e), đỉnh $(\tfrac25,\tfrac15)$ cho $\tfrac4{25}+\tfrac9{25}=\tfrac{13}{25}>\tfrac12$, và điểm $(\tfrac13,\tfrac13)$ cho $\tfrac19+1>\tfrac12$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2; giải tường minh hai quy hoạch tuyến tính và nhận ra các trạng thái không khả thi, không bị chặn dưới, có vô số nghiệm.

::: exercise Bài tập 02.21 (Hàm tuyến tính trên tập affine và trên nửa không gian; Boyd và Vandenberghe, Bài 4.8(a), (b), tr. 192)
Cho $c\in\mathbb R^n$. Xác định giá trị tối ưu và tập nghiệm của mỗi quy hoạch tuyến tính sau, biểu diễn qua $A$, $b$, $c$ ở (a) và qua $a$, $\beta$, $c$ ở (b).

- **(a)** Cực tiểu một hàm tuyến tính trên một tập affine: $\min_{x\in\mathbb R^n}c^Tx$ với ràng buộc $Ax=b$, trong đó $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$.
- **(b)** Cực tiểu một hàm tuyến tính trên một nửa không gian: $\min_{x\in\mathbb R^n}c^Tx$ với ràng buộc $a^Tx\le\beta$, trong đó $a\in\mathbb R^n$, $a\ne0$, $\beta\in\mathbb R$.
:::

::: hint Gợi ý 1
Ở (a), áp dụng kết luận 1 của Mệnh đề 00.8 cho $A^T$ để viết $c=A^T\nu+\hat c$ với $\nu\in\mathbb R^p$ và $A\hat c=0$, rồi tính $c^Tx$ trên tập khả thi. Xét riêng trường hợp hệ $Ax=b$ vô nghiệm.
:::

::: hint Gợi ý 2
Ở (b), viết $c=\tau a+\hat c$ với $\tau\in\mathbb R$ và $a^T\hat c=0$. Xét ba trường hợp: $\hat c\ne0$; $\hat c=0$ và $\tau>0$; $\hat c=0$ và $\tau\le0$. Trong trường hợp cuối, viết ràng buộc thành $(-a)^Tx\ge-\beta$ và dùng Mệnh đề 02.11.
:::

::: solution Lời giải Bài tập 02.21
**Câu (a).** Theo kết luận 1 của Mệnh đề 00.8 áp dụng cho $A^T\in\mathbb R^{n\times p}$, ta viết được $c=A^T\nu+\hat c$ với một $\nu\in\mathbb R^p$ và $\hat c\in\operatorname{Ker}(A)$; hai thành phần trực giao vì $(A^T\nu)^T\hat c=\nu^TA\hat c=0$, nên $c^T\hat c=\lVert\hat c\rVert_2^2$.

- *Không khả thi.* Nếu $b\notin\operatorname{Col}(A)$, hệ $Ax=b$ vô nghiệm (Định lý 00.9, kết luận 1), nên $p^*=+\infty$ và $S^*=\varnothing$.
- *Khả thi.* Nếu $Ax^{(0)}=b$ với một $x^{(0)}$, tập khả thi là $x^{(0)}+\operatorname{Ker}(A)$ (Định lý 00.9, kết luận 2), và với mọi $x$ khả thi, $c^Tx=\nu^TAx+\hat c^Tx=\nu^Tb+\hat c^Tx$.
  - Khi $\hat c=0$, tức $c\in\operatorname{Col}(A^T)$, $c^Tx=\nu^Tb$ trên toàn tập khả thi. Vậy $p^*=\nu^Tb$ và $S^*=\{x\mid Ax=b\}$. Giá trị này không phụ thuộc cách chọn $\nu$: nếu $A^T\nu=A^T\nu'$ thì $\nu^Tb=(A^T\nu)^Tx^{(0)}=\nu'^Tb$.
  - Khi $\hat c\ne0$, điểm $x_s=x^{(0)}-s\hat c$ khả thi với mọi $s\ge0$ vì $A\hat c=0$, và $c^Tx_s=c^Tx^{(0)}-s\lVert\hat c\rVert_2^2\to-\infty$ khi $s\to\infty$. Vậy $p^*=-\infty$ và $S^*=\varnothing$.

Tóm lại, giá trị tối ưu là:

- $p^*=+\infty$ nếu $b\notin\operatorname{Col}(A)$;
- $p^*=\nu^Tb$ nếu $b\in\operatorname{Col}(A)$ và $c=A^T\nu$ với một $\nu\in\mathbb R^p$;
- $p^*=-\infty$ trong trường hợp còn lại.

**Câu (b).** Đặt $\tau=a^Tc/\lVert a\rVert_2^2$ và $\hat c=c-\tau a$; khi đó $a^T\hat c=a^Tc-\tau\lVert a\rVert_2^2=0$ và $c=\tau a+\hat c$. Điểm $\hat x=\beta a/\lVert a\rVert_2^2$ có $a^T\hat x=\beta$, nên tập khả thi không rỗng.

- *$\hat c\ne0$.* Điểm $x_s=\hat x-s\hat c$ có $a^Tx_s=\beta$, nên khả thi, và $c^Tx_s=\tau\beta-s\lVert\hat c\rVert_2^2\to-\infty$. Vậy $p^*=-\infty$.
- *$\hat c=0$, $\tau>0$.* Khi đó $c=\tau a$ là một bội dương của $a$. Điểm $x_s=-sa$ khả thi khi $s\ge-\beta/\lVert a\rVert_2^2$, và $c^Tx_s=-\tau s\lVert a\rVert_2^2\to-\infty$. Vậy $p^*=-\infty$.
- *$\hat c=0$, $\tau\le0$.* Ràng buộc viết thành $(-a)^Tx\ge-\beta$, và $c=\mu(-a)$ với $\mu=-\tau\ge0$. Theo Mệnh đề 02.11(a) với $k=1$, $c^Tx\ge-\mu\beta=\tau\beta$ với mọi $x$ khả thi, và $c^T\hat x=\tau\beta$, nên $\hat x$ là nghiệm. Nếu $\tau<0$, mọi nghiệm có $a^Tx=\beta$ (Mệnh đề 02.11(c)), và mọi điểm như vậy có $c^Tx=\tau\beta$, nên $S^*=\{x\mid a^Tx=\beta\}$. Nếu $\tau=0$ thì $c=0$ và $S^*$ là cả nửa không gian.

Tóm lại, $p^*=\tau\beta$ nếu $c=\tau a$ với một $\tau\le0$, và $p^*=-\infty$ trong trường hợp còn lại. Ở cả (a) lẫn (b), bài toán lồi nhưng có thể không có nghiệm hoặc có vô số nghiệm (Nhận xét 02.8, Nhận xét 02.12).

**Kiểm tra lại.**

- Ở (a), với $n=2$, $A=\begin{bmatrix}1&1\end{bmatrix}$, $b=2$: khi $c=(1,1)=A^T\cdot1$, mọi điểm của đường $x_1+x_2=2$ cho $c^Tx=2=\nu^Tb$; khi $c=(1,0)$, $\hat c=(\tfrac12,-\tfrac12)$ và $x_s=(1,1)-s(\tfrac12,-\tfrac12)$ cho $c^Tx_s=1-\tfrac s2\to-\infty$.
- Ở (b), với $a=(1,1)$, $\beta=2$, $c=(-1,-1)$: $\tau=-1$, $p^*=-2$, và $c^Tx=-(x_1+x_2)\ge-2$ khi $x_1+x_2\le2$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 2; chứng nhận nghiệm của quy hoạch tuyến tính trên đơn hình và trên hộp có ràng buộc ngân sách bằng một cận dưới tường minh.

::: exercise Bài tập 02.22 (Hàm tuyến tính trên đơn hình và trên hộp có ngân sách; Boyd và Vandenberghe, Bài 4.8(d), (e), tr. 192)
Cho $c\in\mathbb R^n$ với các tọa độ đã sắp xếp, $c_1\le c_2\le\cdots\le c_n$ (đánh số lại các tọa độ nếu cần).

- **(a)** Cực tiểu một hàm tuyến tính trên *đơn hình xác suất* (probability simplex) $\{x\mid\mathbf 1^Tx=1,\ x\ge0\}$: $\min c^Tx$ với $\mathbf 1^Tx=1$, $x\ge0$. Xác định giá trị tối ưu và tập nghiệm. Giải lại bài toán khi đẳng thức được thay bằng $\mathbf 1^Tx\le1$. Trong cách hiểu *danh mục đầu tư* (portfolio), $x_i$ là tỷ lệ ngân sách đầu tư vào tài sản $i$ với lợi nhuận cố định $-c_i$, và bất đẳng thức $\mathbf 1^Tx\le1$ cho phép giữ lại một phần ngân sách.
- **(b)** Cực tiểu một hàm tuyến tính trên hộp đơn vị có ràng buộc tổng ngân sách: $\min c^Tx$ với $\mathbf 1^Tx=\beta$, $0\le x\le\mathbf 1$, trong đó $\beta$ là một số nguyên, $0\le\beta\le n$. Xác định giá trị tối ưu. Xác định lại giá trị tối ưu khi $\beta$ không nguyên nhưng $0\le\beta\le n$, và khi đẳng thức được thay bằng $\mathbf 1^Tx\le\beta$ với $\beta$ nguyên.
:::

::: hint Gợi ý 1
Ở (a), so sánh $c^Tx$ với $c_1\mathbf 1^Tx$ trên tập $x\ge0$.
:::

::: hint Gợi ý 2
Ở (b), với $k=\lfloor\beta\rfloor<n$, viết $c^Tx=c_{k+1}\mathbf 1^Tx+\sum_i(c_i-c_{k+1})x_i$ và chặn dưới từng số hạng của tổng bằng $0\le x_i\le1$, tách $i\le k$ và $i>k+1$.
:::

::: hint Gợi ý 3
Với ràng buộc $\mathbf 1^Tx\le\beta$, chặn dưới $c^Tx$ bằng $\sum_i\min\{c_i,0\}x_i$, rồi lặp lại lập luận của Gợi ý 2 cho các hệ số $\min\{c_i,0\}$.
:::

::: solution Lời giải Bài tập 02.22
**Câu (a).** Với $x\ge0$, $c^Tx-c_1\mathbf 1^Tx=\sum_i(c_i-c_1)x_i\ge0$. Trên tập khả thi $\mathbf 1^Tx=1$, nên $c^Tx\ge c_1$, với dấu bằng khi và chỉ khi $x_i=0$ với mọi $i$ có $c_i>c_1$. Điểm $(1,0,\ldots,0)$ đạt $c_1$. Vậy
$$
\begin{aligned}
p^*&=c_1,\\
S^*&=\{x\ge0\mid\mathbf 1^Tx=1,\\
&\qquad x_i=0\text{ khi }c_i>c_1\}.
\end{aligned}
$$
Khi $n\ge2$, nghiệm duy nhất khi và chỉ khi $c_1<c_2$; khi nhiều tọa độ cùng bằng $c_1$, mọi cách chia ngân sách giữa chúng đều tối ưu (Nhận xét 02.12).

*Ràng buộc $\mathbf 1^Tx\le1$.* Nếu $c_1\ge0$ thì $c\ge0$, nên $c^Tx=\sum_ic_ix_i\ge0$ với mọi $x\ge0$, với dấu bằng khi và chỉ khi $x_i=0$ với mọi $i$ có $c_i>0$; $x=0$ đạt $0$. Nếu $c_1<0$ thì $c^Tx\ge c_1\mathbf 1^Tx\ge c_1$, trong đó bất đẳng thức thứ hai dùng $\mathbf 1^Tx\le1$ và $c_1<0$. Dấu bằng ở bất đẳng thức thứ nhất đòi $x_i=0$ khi $c_i>c_1$, dấu bằng ở bất đẳng thức thứ hai đòi $\mathbf 1^Tx=1$, và điểm $(1,0,\ldots,0)$ đạt $c_1$. Vậy $p^*=\min\{0,c_1\}$, và

- khi $c_1\ge0$, $S^*=\{x\ge0\mid\mathbf 1^Tx\le1,\ x_i=0\text{ khi }c_i>0\}$, chỉ gồm $x=0$ khi $c_1>0$;
- khi $c_1<0$, $S^*$ là tập nghiệm của bài toán có đẳng thức.

**Câu (b).** Đặt $k=\lfloor\beta\rfloor$, nên $0\le\beta-k<1$. Nếu $\beta=n$, điểm khả thi duy nhất là $x=\mathbf 1$ và $p^*=c_1+\cdots+c_n$. Xét $\beta<n$, nên $k+1\le n$. Điểm
$$
\hat x=(\underbrace{1,\ldots,1}_{k},\ \beta-k,\ 0,\ldots,0)
$$
khả thi vì $\mathbf 1^T\hat x=k+(\beta-k)=\beta$, với $c^T\hat x=c_1+\cdots+c_k+(\beta-k)c_{k+1}$. Với mọi $x$ khả thi,
$$
\begin{aligned}
c^Tx&=c_{k+1}\beta\\
&\quad+\textstyle\sum_{i\le k}(c_i-c_{k+1})x_i\\
&\quad+\textstyle\sum_{i>k+1}(c_i-c_{k+1})x_i .
\end{aligned}
$$
Với $i\le k$, $c_i-c_{k+1}\le0$ và $x_i\le1$, nên $(c_i-c_{k+1})x_i\ge c_i-c_{k+1}$; với $i>k+1$, $(c_i-c_{k+1})x_i\ge0$. Do đó
$$
\begin{aligned}
c^Tx&\ge c_{k+1}\beta\\
&\quad+\textstyle\sum_{i\le k}(c_i-c_{k+1})\\
&=c_1+\cdots+c_k\\
&\quad+(\beta-k)c_{k+1}\\
&=c^T\hat x,
\end{aligned}
$$
và $\hat x$ là nghiệm.

- Khi $\beta$ nguyên, $\beta-k=0$ và $p^*=c_1+\cdots+c_\beta$, tổng của $\beta$ hệ số nhỏ nhất (bằng $0$ khi $\beta=0$).
- Khi $\beta$ không nguyên, $p^*=c_1+\cdots+c_{\lfloor\beta\rfloor}+(\beta-\lfloor\beta\rfloor)\,c_{\lfloor\beta\rfloor+1}$.

*Ràng buộc $\mathbf 1^Tx\le\beta$ với $\beta$ nguyên.* Đặt $\check c_i=\min\{c_i,0\}\le0$; dãy $\check c_i$ không giảm theo $i$. Vì $x\ge0$, $c^Tx\ge\sum_i\check c_ix_i$. Nếu $\beta=n$, $\sum_i\check c_ix_i\ge\sum_i\check c_i$ vì $\check c_i\le0$ và $x_i\le1$. Nếu $\beta<n$, lập luận trên với $\check c$ thay cho $c$ cho
$$
\begin{aligned}
\textstyle\sum_i\check c_ix_i&\ge \check c_{\beta+1}\,\mathbf 1^Tx\\
&\quad+\textstyle\sum_{i\le\beta}(\check c_i-\check c_{\beta+1})\\
&\ge\textstyle\sum_{i\le\beta}\check c_i,
\end{aligned}
$$
trong đó bất đẳng thức thứ hai dùng $\check c_{\beta+1}\le0$ và $\mathbf 1^Tx\le\beta$. Điểm có $x_i=1$ khi $i\le\beta$ và $c_i<0$, $x_i=0$ trong trường hợp còn lại, khả thi và đạt cận. Vậy $p^*=\sum_{i\le\beta}\min\{c_i,0\}$: tổng các hệ số âm trong $\beta$ hệ số nhỏ nhất.

**Kiểm tra lại.** Với $n=3$, $c=(-2,1,3)$:

- (a) cho $p^*=-2$ ở cả hai dạng ràng buộc;
- (b) với $\beta=2$ cho $p^*=-1$; với $\beta=\tfrac32$ cho $p^*=-2+\tfrac12=-\tfrac32$, và điểm khả thi $(\tfrac12,\tfrac12,\tfrac12)$ cho $1\ge-\tfrac32$; với $\mathbf 1^Tx\le2$ cho $p^*=-2$ tại $(1,0,0)$, nhỏ hơn $-1$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 2; tìm và chứng minh tập nghiệm của hồi quy sai số tuyệt đối và hồi quy minimax với một tham số.

::: exercise Bài tập 02.23 (Xấp xỉ bằng vector hằng theo chuẩn $\ell_1$ và $\ell_\infty$; Boyd và Vandenberghe, Bài 6.2, tr. 344)
Cho $y\in\mathbb R^N$, và gọi $y_{(1)}\le y_{(2)}\le\cdots\le y_{(N)}$ là các tọa độ của $y$ sắp xếp tăng dần. Tìm tập nghiệm và giá trị tối ưu của bài toán xấp xỉ theo chuẩn với một biến vô hướng $w_0\in\mathbb R$:

- **(a)** $\min_{w_0}\lVert w_0\mathbf 1-y\rVert_1$;
- **(b)** $\min_{w_0}\lVert w_0\mathbf 1-y\rVert_\infty$.

Chứng minh các kết quả tìm được.
:::

::: hint Gợi ý 1
Bài tập 02.4 giải hai bài toán này với $N=3$. Ở (a), ghép $y_{(i)}$ với $y_{(N+1-i)}$ và chặn dưới $\lvert w_0-y_{(i)}\rvert+\lvert w_0-y_{(N+1-i)}\rvert$ bằng bất đẳng thức tam giác.
:::

::: hint Gợi ý 2
Xác định khi nào bất đẳng thức của Gợi ý 1 có dấu bằng, rồi tách hai trường hợp $N$ chẵn và $N$ lẻ. Ở (b), chỉ hai tọa độ $y_{(1)}$ và $y_{(N)}$ quyết định cận dưới.
:::

::: solution Lời giải Bài tập 02.23
Hai bài toán là hồi quy sai số tuyệt đối và hồi quy minimax của Định nghĩa 02.13 với $X=\mathbf 1\in\mathbb R^{N\times1}$; theo Định lý 02.15, mỗi bài toán viết được thành quy hoạch tuyến tính như ở Bài tập 02.4.

**Câu (a).** Đặt $K=\lfloor N/2\rfloor$ và $\mathcal I_i=[y_{(i)},y_{(N+1-i)}]$, $i=1,\ldots,K$; các đoạn này lồng nhau, $\mathcal I_1\supseteq\mathcal I_2\supseteq\cdots\supseteq\mathcal I_K$. Với mỗi $i\le K$, bất đẳng thức tam giác cho
$$
\begin{aligned}
&\lvert w_0-y_{(i)}\rvert+\lvert y_{(N+1-i)}-w_0\rvert\\
&\quad\ge y_{(N+1-i)}-y_{(i)},
\end{aligned}
$$
với dấu bằng khi và chỉ khi $w_0-y_{(i)}\ge0$ và $y_{(N+1-i)}-w_0\ge0$, tức $w_0\in\mathcal I_i$. Cộng $K$ bất đẳng thức này, và khi $N$ lẻ thêm số hạng $\lvert w_0-y_{((N+1)/2)}\rvert\ge0$, ta có
$$
\begin{aligned}
\lVert w_0\mathbf 1-y\rVert_1&\ge\textstyle\sum_{i=1}^K\bigl(y_{(N+1-i)}\\
&\qquad-y_{(i)}\bigr).
\end{aligned}
$$
Dấu bằng xảy ra khi và chỉ khi $w_0$ thuộc mọi $\mathcal I_i$, tức $w_0\in\mathcal I_K$, và khi $N$ lẻ thêm $w_0=y_{((N+1)/2)}$, một điểm của $\mathcal I_K$. Do đó giá trị tối ưu bằng vế phải, và

- khi $N$ lẻ, $S^*=\{y_{((N+1)/2)}\}$, trung vị của các tọa độ;
- khi $N$ chẵn, $S^*=[y_{(N/2)},y_{(N/2+1)}]$, đoạn giữa hai trung vị, chỉ gồm một điểm khi $y_{(N/2)}=y_{(N/2+1)}$.

**Câu (b).** Với mọi $w_0$,
$$
\begin{aligned}
&\lVert w_0\mathbf 1-y\rVert_\infty\\
&\ \ge\max\{\lvert w_0-y_{(1)}\rvert,\lvert y_{(N)}-w_0\rvert\}\\
&\ \ge\tfrac12\bigl(\lvert w_0-y_{(1)}\rvert\\
&\qquad+\lvert y_{(N)}-w_0\rvert\bigr)\\
&\ \ge\tfrac12\bigl(y_{(N)}-y_{(1)}\bigr).
\end{aligned}
$$
Tại $\bar w_0=\tfrac12(y_{(1)}+y_{(N)})$, mọi $y_i\in[y_{(1)},y_{(N)}]$ cho $\lvert\bar w_0-y_i\rvert\le\tfrac12(y_{(N)}-y_{(1)})$, nên cận đạt. Dấu bằng ở bất đẳng thức thứ hai (cực đại không nhỏ hơn trung bình) đòi $\lvert w_0-y_{(1)}\rvert=\lvert y_{(N)}-w_0\rvert$; dấu bằng ở bất đẳng thức thứ ba (bất đẳng thức tam giác) đòi hai hiệu $w_0-y_{(1)}$, $y_{(N)}-w_0$ không âm; hai điều kiện cho $w_0=\bar w_0$. Vậy $S^*=\{\tfrac12(y_{(1)}+y_{(N)})\}$, trung điểm của giá trị nhỏ nhất và lớn nhất, và $p^*=\tfrac12(y_{(N)}-y_{(1)})$.

**Kiểm tra lại.** Với $y=(7,1,6,2)$, dãy sắp xếp là $(1,2,6,7)$.

- (a) cho $S^*=[2,6]$, $p^*=(7-1)+(6-2)=10$; tại $w_0=4$, tổng là $3+3+2+2=10$, còn tại $w_0=1$ là $6+0+5+1=12>10$.
- (b) cho $\bar w_0=4$, $p^*=3$; tại $w_0=\tfrac72$, độ lệch lớn nhất là $\tfrac72>3$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 2; đưa các bài toán chứa chuẩn một và chuẩn vô cùng về quy hoạch tuyến tính bằng biến phụ và nêu ánh xạ khôi phục.

::: exercise Bài tập 02.24 (Chuẩn một và chuẩn vô cùng có ràng buộc; Boyd và Vandenberghe, Bài 4.11(c)–(e), tr. 193)
Cho $X\in\mathbb R^{N\times d}$ và $y\in\mathbb R^N$. Với mỗi bài toán sau, lập một quy hoạch tuyến tính là biến đổi tương đương của nó theo Định nghĩa 02.5, nêu ánh xạ đưa sang $\varphi$ và ánh xạ khôi phục $\psi$, và giải thích quan hệ giữa nghiệm của bài toán gốc và nghiệm của quy hoạch tuyến tính:

- **(a)** $\min_w\lVert Xw-y\rVert_1$ với ràng buộc $\lVert w\rVert_\infty\le1$;
- **(b)** $\min_w\lVert w\rVert_1$ với ràng buộc $\lVert Xw-y\rVert_\infty\le1$;
- **(c)** $\min_w\lVert Xw-y\rVert_1+\lVert w\rVert_\infty$.
:::

::: hint Gợi ý 1
Viết mỗi ràng buộc chuẩn vô cùng thành các bất đẳng thức tuyến tính bằng Bổ đề 02.14, với $\lVert v\rVert_\infty=\max_j\max(v_j,-v_j)$.
:::

::: hint Gợi ý 2
Với mỗi hạng của mục tiêu, xác định nên dùng một biến phụ cho mỗi trị tuyệt đối, như Định lý 02.15(a), hay một biến phụ chung cho một cực đại, như Định lý 02.15(c).
:::

::: solution Lời giải Bài tập 02.24
**Ràng buộc chuẩn vô cùng.** Vì $\lVert w\rVert_\infty=\max_j\max(w_j,-w_j)$, Bổ đề 02.14 cho $\lVert w\rVert_\infty\le t_0$ khi và chỉ khi $-t_0\mathbf 1\le w\le t_0\mathbf 1$; tương tự với $Xw-y$ thay cho $w$. Phép viết lại này giữ nguyên tập khả thi (bước 3 của Thuật toán 02.44), và tập khả thi là một đa diện. Trong cả ba câu, $\lvert\cdot\rvert$ của một vector lấy theo từng tọa độ.

**Câu (a).** Tập $C=\{w\mid-\mathbf 1\le w\le\mathbf 1\}$ là một đa diện, và $\lVert Xw-y\rVert_1=\sum_{i=1}^N\max(r_i,-r_i)$ với $r=Xw-y$ affine theo $w$. Định lý 02.15(a) với $f_0=0$, $M=N$, $\gamma_i=1$ cho quy hoạch tuyến tính
$$
\begin{aligned}
&\underset{w\in\mathbb R^d,\ t\in\mathbb R^N}{\operatorname{minimize}}\ \mathbf 1^Tt\\
&\text{subject to}\\
&\ \ -t\le Xw-y\le t,\\
&\ \ -\mathbf 1\le w\le\mathbf 1,
\end{aligned}
$$
với $\varphi(w)=(w,\lvert Xw-y\rvert)$, $\psi(w,t)=w$ và $T(s)=s$. Hai bài toán có cùng giá trị tối ưu; nếu $(w^*,t^*)$ là nghiệm của quy hoạch tuyến tính thì $w^*$ là nghiệm của bài toán gốc và $t^*=\lvert Xw^*-y\rvert$ (Định lý 02.15(b)); ngược lại, nghiệm $w^*$ của bài toán gốc cho nghiệm $(w^*,\lvert Xw^*-y\rvert)$.

**Câu (b).** Tập $C=\{w\mid-\mathbf 1\le Xw-y\le\mathbf 1\}$ là một đa diện, và $\lVert w\rVert_1=\sum_{j=1}^d\max(w_j,-w_j)$. Định lý 02.15(a) với $f_0=0$, $M=d$, $\gamma_j=1$ cho
$$
\begin{aligned}
&\underset{w,v\in\mathbb R^d}{\operatorname{minimize}}\ \mathbf 1^Tv\\
&\text{subject to}\\
&\ \ -v\le w\le v,\\
&\ \ -\mathbf 1\le Xw-y\le\mathbf 1,
\end{aligned}
$$
với $\varphi(w)=(w,\lvert w\rvert)$, $\psi(w,v)=w$. Tại mọi nghiệm, $v^*=\lvert w^*\rvert$, và $w^*$ là nghiệm của bài toán gốc.

**Câu (c).** Mục tiêu là $\sum_{i=1}^N\max(r_i,-r_i)+\max_j\max(w_j,-w_j)$: $N$ cực đại của hai hàm affine và một cực đại của $2d$ hàm affine. Định lý 02.15(a) với $f_0=0$, $C=\mathbb R^d$, $M=N+1$ và mọi trọng số bằng $1$ cho quy hoạch tuyến tính theo biến $w\in\mathbb R^d$, $t\in\mathbb R^N$, $t_0\in\mathbb R$:
$$
\begin{aligned}
&\underset{w,\,t,\,t_0}{\operatorname{minimize}}\ \mathbf 1^Tt+t_0\\
&\text{subject to}\\
&\ \ -t\le Xw-y\le t,\\
&\ \ -t_0\mathbf 1\le w\le t_0\mathbf 1,
\end{aligned}
$$
với $\varphi(w)=(w,\lvert Xw-y\rvert,\lVert w\rVert_\infty)$, $\psi(w,t,t_0)=w$. Tại mọi nghiệm, $t^*=\lvert Xw^*-y\rvert$ và $t_0^*=\lVert w^*\rVert_\infty$.

**Kiểm tra lại.** Với $N=d=1$, $X=1$, $y=2$:

- (a) là $\min\lvert w-2\rvert$ trên $[-1,1]$, có nghiệm $w^*=1$ và giá trị $1$; trong quy hoạch tuyến tính, $t\ge\lvert w-2\rvert\ge1$ khi $w\le1$, và $(w,t)=(1,1)$ đạt $1$;
- (b) là $\min\lvert w\rvert$ với $w\in[1,3]$, có nghiệm $w^*=1$ và giá trị $1$;
- (c) là $\min\lvert w-2\rvert+\lvert w\rvert$, có giá trị $2$ trên cả đoạn $[0,2]$; điểm $(w,t,t_0)=(1,1,1)$ khả thi và đạt $2$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 3, 6; giải tường minh một quy hoạch bậc hai có ràng buộc bậc hai và chỉ ra kết luận nào mất khi ma trận của ràng buộc không nửa xác định dương.

::: exercise Bài tập 02.25 (Hàm tuyến tính trên elipxoit; Boyd và Vandenberghe, Bài 4.21(a), (b), tr. 196–197)
Cho $c\in\mathbb R^n$ với $c\ne0$ và ma trận đối xứng $\Omega\in\mathbb R^{n\times n}$.

- **(a)** Cực tiểu một hàm tuyến tính trên một *elipxoit* (ellipsoid) tâm gốc $\{x\mid x^T\Omega x\le1\}$: với $\Omega\succ0$, giải $\min c^Tx$ với ràng buộc $x^T\Omega x\le1$.
- **(b)** Xác định giá trị tối ưu của bài toán ở (a) khi $\Omega$ không nửa xác định dương.
- **(c)** Cực tiểu một hàm tuyến tính trên một elipxoit tâm $x_{\mathrm c}\in\mathbb R^n$: với $\Omega\succ0$, giải $\min c^Tx$ với ràng buộc $(x-x_{\mathrm c})^T\Omega(x-x_{\mathrm c})\le1$.
:::

::: hint Gợi ý 1
Theo Định lý 00.16, $\Omega=V\operatorname{diag}(\varsigma_1,\ldots,\varsigma_n)V^T$ với $V$ trực giao. Khi mọi $\varsigma_i>0$, đặt $\Omega^{1/2}=V\operatorname{diag}(\sqrt{\varsigma_1},\ldots,\sqrt{\varsigma_n})V^T$, viết $x^T\Omega x=\lVert\Omega^{1/2}x\rVert_2^2$ và $c^Tx=(\Omega^{-1/2}c)^T(\Omega^{1/2}x)$, rồi dùng bất đẳng thức Cauchy–Schwarz.
:::

::: hint Gợi ý 2
Ở (b), lấy một vector riêng đơn vị $v$ ứng với một giá trị riêng âm của $\Omega$ và xét các điểm có thành phần lớn theo hướng $v$; xét riêng trường hợp $c^Tv=0$. Ở (c), đổi biến $x=x_{\mathrm c}+\zeta$.
:::

::: solution Lời giải Bài tập 02.25
**Câu (a).** Theo Định lý 00.16, $\Omega=V\operatorname{diag}(\varsigma_1,\ldots,\varsigma_n)V^T$ với $V^TV=I$, và theo Mệnh đề 00.18, mọi $\varsigma_i>0$. Đặt $\Omega^{1/2}=V\operatorname{diag}(\sqrt{\varsigma_i})V^T$ và $\Omega^{-1/2}=V\operatorname{diag}(1/\sqrt{\varsigma_i})V^T$. Hai ma trận này đối xứng, và vì $V^TV=I$,
$$
\begin{aligned}
\Omega^{1/2}\Omega^{1/2}&=\Omega,\\
\Omega^{-1/2}\Omega^{1/2}&=I,\\
\Omega^{-1/2}\Omega^{-1/2}&=\Omega^{-1}.
\end{aligned}
$$
Do đó $x^T\Omega x=\lVert\Omega^{1/2}x\rVert_2^2$ và $c^T\Omega^{-1}c=\lVert\Omega^{-1/2}c\rVert_2^2>0$. Với mọi $x$ khả thi, Mệnh đề 00.5 cho
$$
\begin{aligned}
c^Tx&=(\Omega^{-1/2}c)^T(\Omega^{1/2}x)\\
&\ge-\lVert\Omega^{-1/2}c\rVert_2\lVert\Omega^{1/2}x\rVert_2\\
&\ge-\sqrt{c^T\Omega^{-1}c}.
\end{aligned}
$$
Điểm
$$
x^*=-\frac{\Omega^{-1}c}{\sqrt{c^T\Omega^{-1}c}}
$$
có $x^{*T}\Omega x^*=c^T\Omega^{-1}c/(c^T\Omega^{-1}c)=1$, nên khả thi, và $c^Tx^*=-\sqrt{c^T\Omega^{-1}c}$. Vậy $x^*$ là nghiệm và $p^*=-\sqrt{c^T\Omega^{-1}c}$. Dấu bằng trong cả hai bất đẳng thức đòi $\lVert\Omega^{1/2}x\rVert_2=1$ và $\Omega^{1/2}x$, $\Omega^{-1/2}c$ phụ thuộc tuyến tính (Mệnh đề 00.5); hệ số tỷ lệ không dương vì tích vô hướng của hai vector bằng $-\lVert\Omega^{-1/2}c\rVert_2\lVert\Omega^{1/2}x\rVert_2<0$. Do đó $\Omega^{1/2}x=-\Omega^{-1/2}c/\lVert\Omega^{-1/2}c\rVert_2$, tức $x=x^*$: nghiệm duy nhất. Bài toán là (6.4) với $P_0=0$, $q_0=c$, $P_1=2\Omega\succ0$, $q_1=0$, $\rho_1=-1$, nên lồi và có nghiệm theo Mệnh đề 02.25.

**Câu (b).** Định lý 00.16 vẫn áp dụng cho $\Omega$ đối xứng, và theo kết luận 2 của Mệnh đề 00.18, giá trị riêng nhỏ nhất $\varsigma_{\min}$ của $\Omega$ âm. Lấy $v$ với $\lVert v\rVert_2=1$ và $\Omega v=\varsigma_{\min}v$.

- Nếu $c^Tv\ne0$, gọi $\operatorname{sign}(c^Tv)\in\{-1,1\}$ là dấu của $c^Tv$; điểm $x_s=-s\operatorname{sign}(c^Tv)\,v$, $s\ge0$, có $x_s^T\Omega x_s=s^2\varsigma_{\min}\le0\le1$, nên khả thi, và $c^Tx_s=-s\lvert c^Tv\rvert\to-\infty$.
- Nếu $c^Tv=0$, thì $v^T\Omega c=\varsigma_{\min}v^Tc=0$. Đặt $\kappa_v=\sqrt{\max\{c^T\Omega c,0\}/(-\varsigma_{\min})}$ và $x_s=s(\kappa_vv-c)$, $s\ge0$. Khi đó $x_s^T\Omega x_s=s^2(c^T\Omega c+\kappa_v^2\varsigma_{\min})\le0$, nên $x_s$ khả thi, và $c^Tx_s=-s\lVert c\rVert_2^2\to-\infty$.

Vậy $p^*=-\infty$ với mọi $c\ne0$: khi $\Omega$ có một giá trị riêng âm, hàm ràng buộc $x^T\Omega x-1$ không lồi (Định lý 01.29(a)), bài toán không còn là quy hoạch bậc hai có ràng buộc bậc hai lồi, và kết luận "có nghiệm" của (a) mất.

**Câu (c).** Với $\varphi(x)=x-x_{\mathrm c}$, $\psi(\zeta)=x_{\mathrm c}+\zeta$ và hàm tăng chặt $T(s)=s-c^Tx_{\mathrm c}$, bài toán $\min c^T\zeta$ với $\zeta^T\Omega\zeta\le1$ là biến đổi tương đương của bài toán đã cho: $c^T\varphi(x)=T(c^Tx)$ và $T(c^T\psi(\zeta))=c^T\zeta$, nên (4.3) đúng với dấu bằng. Theo (a) và Mệnh đề 02.6,
$$
\begin{aligned}
x^*&=x_{\mathrm c}-\frac{\Omega^{-1}c}{\sqrt{c^T\Omega^{-1}c}},\\
p^*&=c^Tx_{\mathrm c}-\sqrt{c^T\Omega^{-1}c}.
\end{aligned}
$$

**Kiểm tra lại.**

- Ở (a), với $\Omega=\operatorname{diag}(1,4)$, $c=(1,1)$: $\Omega^{-1}c=(1,\tfrac14)$, $c^T\Omega^{-1}c=\tfrac54$, $x^*=-\tfrac2{\sqrt5}(1,\tfrac14)$; khi đó $x^{*T}\Omega x^*=\tfrac45+4\cdot\tfrac1{20}=1$ và $c^Tx^*=-\tfrac{5}{2\sqrt5}=-\tfrac{\sqrt5}2$.
- Ở (b), với $\Omega=\operatorname{diag}(1,-1)$, $c=(1,0)$: $v=(0,1)$, $c^Tv=0$, $c^T\Omega c=1$, $\kappa_v=1$, và $x_s=s(-1,1)$ có $x_s^T\Omega x_s=0$, $c^Tx_s=-s$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; chứng nhận nghiệm của một quy hoạch bậc hai trên quả cầu đơn vị bằng điều kiện (4.2) và liên hệ ràng buộc chặn chuẩn với số hạng phạt.

::: exercise Bài tập 02.26 (Quy hoạch bậc hai trên quả cầu đơn vị; Boyd và Vandenberghe, Bài 4.22, tr. 197)
Xét bài toán
$$
\begin{aligned}
&\underset{x\in\mathbb R^n}{\operatorname{minimize}}\\
&\ \ f_0(x)=\tfrac12x^TPx+q^Tx+\rho_0\\
&\text{subject to}\ \ x^Tx\le1,
\end{aligned}
$$
với $P\in\mathbb R^{n\times n}$ đối xứng, $P\succ0$, $q\in\mathbb R^n$, $\rho_0\in\mathbb R$. Gọi $\bar\lambda$ là nghiệm lớn nhất của phương trình $q^T(P+\tau I)^{-2}q=1$ với ẩn $\tau$, và đặt $\lambda=\max\{0,\bar\lambda\}$; khi $q=0$, phương trình vô nghiệm và ta lấy $\lambda=0$.

- **(a)** Chứng minh $x^*=-(P+\lambda I)^{-1}q$ là nghiệm duy nhất của bài toán.
- **(b)** Chứng minh $x^*$ cũng là nghiệm duy nhất của bài toán không ràng buộc $\min_{x\in\mathbb R^n}f_0(x)+\tfrac\lambda2\lVert x\rVert_2^2$.
:::

::: hint Gợi ý 1
Với $q\ne0$, viết $P=V\operatorname{diag}(\varsigma_1,\ldots,\varsigma_n)V^T$ theo Định lý 00.16 và biểu diễn $\mathcal N(\tau)=q^T(P+\tau I)^{-2}q$ thành tổng các hạng $\tilde q_i^2/(\varsigma_i+\tau)^2$ với $\tilde q=V^Tq$. Khảo sát $\mathcal N$ trên khoảng $\tau>-\varsigma_{\min}$ để suy ra: $\lambda>0$ khi và chỉ khi $\mathcal N(0)>1$.
:::

::: hint Gợi ý 2
Tính $\nabla f_0(x^*)$ trong hai trường hợp $\lambda>0$ và $\lambda=0$, rồi kiểm tra (4.2); khi $\lambda>0$, chặn $x^{*T}x$ bằng bất đẳng thức Cauchy–Schwarz.
:::

::: solution Lời giải Bài tập 02.26
**Câu (a), lớp bài toán.** Bài toán là (6.4) với $P_0=P\succ0$, $q_0=q$, $P_1=2I$, $q_1=0$, $\rho_1=-1$. Tập khả thi là quả cầu Euclid đóng tâm $0$ bán kính $1$ (Mệnh đề 01.18(e)), không rỗng, và $f_0$ lồi chặt (Định lý 01.29(b)). Theo Mệnh đề 02.25 bài toán lồi và có nghiệm, và theo Định lý 01.34 nghiệm duy nhất. Vậy chỉ cần chứng minh $x^*$ khả thi và thỏa (4.2) (Hệ quả 02.4(c)). Khi $q=0$, $x^*=0$ khả thi và $\nabla f_0(0)=q=0$, nên (4.2) đúng. Xét $q\ne0$.

**Câu (a), tính chất của $\lambda$.** Theo Định lý 00.16 và Mệnh đề 00.18, $P=V\operatorname{diag}(\varsigma_1,\ldots,\varsigma_n)V^T$ với $V^TV=I$ và mọi $\varsigma_i>0$; gọi $\varsigma_{\min}$ là số nhỏ nhất trong các $\varsigma_i$. Với $\tau>-\varsigma_{\min}$, $P+\tau I=V\operatorname{diag}(\varsigma_i+\tau)V^T$ khả nghịch, $(P+\tau I)^{-2}=V\operatorname{diag}\bigl((\varsigma_i+\tau)^{-2}\bigr)V^T$, và với $\tilde q=V^Tq\ne0$,
$$
\begin{aligned}
\mathcal N(\tau)&=q^T(P+\tau I)^{-2}q\\
&=\sum_{i=1}^n\frac{\tilde q_i^2}{(\varsigma_i+\tau)^2}.
\end{aligned}
$$
Trên $(-\varsigma_{\min},\infty)$, $\mathcal N$ liên tục, giảm chặt (mỗi hạng có $\tilde q_i\ne0$ giảm chặt) và dần tới $0$ khi $\tau\to\infty$. Do đó phương trình $\mathcal N(\tau)=1$ có nhiều nhất một nghiệm trên khoảng này, và mọi nghiệm khác không vượt $-\varsigma_{\min}<0$.

- Nếu $\mathcal N(0)>1$, định lý giá trị trung gian cho một nghiệm trên $(0,\infty)$; nghiệm đó là $\bar\lambda$, nên $\lambda=\bar\lambda>0$ và $\mathcal N(\lambda)=1$.
- Nếu $\mathcal N(0)\le1$, thì $\mathcal N(\tau)<1$ với mọi $\tau>0$, nên $\bar\lambda\le0$ và $\lambda=0$.

**Câu (a), chứng nhận.** Từ $(P+\lambda I)x^*=-q$, ta có $\nabla f_0(x^*)=Px^*+q=-\lambda x^*$ và $\lVert x^*\rVert_2^2=\mathcal N(\lambda)$.

- Khi $\lambda>0$: $\lVert x^*\rVert_2^2=1$, nên $x^*$ khả thi. Với mọi $x$ khả thi, theo Mệnh đề 00.5,
$$
\begin{aligned}
&\nabla f_0(x^*)^T(x-x^*)\\
&\quad=\lambda\bigl(1-x^{*T}x\bigr)\\
&\quad\ge\lambda\bigl(1-\lVert x^*\rVert_2\lVert x\rVert_2\bigr)\\
&\quad\ge0 .
\end{aligned}
$$
- Khi $\lambda=0$: $\lVert x^*\rVert_2^2=\mathcal N(0)\le1$, nên $x^*$ khả thi, và $\nabla f_0(x^*)=0$ thỏa (4.2).

Theo Hệ quả 02.4(c), $x^*$ là nghiệm, và là nghiệm duy nhất.

**Câu (b).** Hàm $f_0(x)+\tfrac\lambda2\lVert x\rVert_2^2$ có Hessian $P+\lambda I\succ0$, nên lồi chặt, và gradient $(P+\lambda I)x+q$ bằng $0$ tại $x^*$. Theo Hệ quả 01.26 với $C=\mathbb R^n$ và Định lý 01.34, $x^*$ là nghiệm duy nhất. Với $L=f_0$, $R(x)=\tfrac12\lVert x\rVert_2^2$, đây là Mệnh đề 02.26: khi $\lambda>0$, $\tfrac12\lVert x^*\rVert_2^2=\tfrac12$, nên bài toán có phạt và bài toán ở (a) có cùng nghiệm. Hệ số phạt $\lambda$ là giá của độ lớn ứng với mức chặn $1$ (Nhận xét 02.27).

**Kiểm tra lại.** Với $n=1$, $P=1$, $\rho_0=0$:

- $q=-2$: $\mathcal N(\tau)=4/(1+\tau)^2=1$ có các nghiệm $1$ và $-3$, nên $\lambda=1$ và $x^*=2/2=1$; trên $[-1,1]$, $f_0'(x)=x-2<0$, nên $f_0$ giảm và nghiệm là $1$.
- $q=-\tfrac12$: $\mathcal N(\tau)=\tfrac14/(1+\tau)^2=1$ có các nghiệm $-\tfrac12$ và $-\tfrac32$, nên $\lambda=0$ và $x^*=\tfrac12$, điểm dừng của $\tfrac12x^2-\tfrac12x$, nằm trong $[-1,1]$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; giải hồi quy ridge có hệ số chặn không bị phạt trên dữ liệu đã quy tâm.

::: exercise Bài tập 02.27 (Quy tâm và hồi quy ridge; Murphy (2022), Bài 11.2, tr. 411–412)
Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$ và $\lambda>0$. Giả sử dữ liệu đầu vào đã được *quy tâm* (centered): mỗi cột của $X$ có trung bình bằng $0$, tức $X^T\mathbf 1=0$. Xét hồi quy ridge với hệ số chặn $w_0\in\mathbb R$ không bị phạt và $w\in\mathbb R^d$,
$$
\begin{aligned}
J_\lambda(w,w_0)&=\lVert y-Xw-w_0\mathbf 1\rVert_2^2\\
&\quad+\lambda\lVert w\rVert_2^2 .
\end{aligned}
$$
Chứng minh bài toán $\min_{(w,w_0)}J_\lambda(w,w_0)$ có nghiệm duy nhất
$$
\begin{aligned}
\hat w_0&=\bar y=\tfrac1N\mathbf 1^Ty,\\
\hat w&=(X^TX+\lambda I_d)^{-1}X^Ty .
\end{aligned}
$$
:::

::: hint Gợi ý 1
Viết $J_\lambda$ theo ma trận $\begin{bmatrix}X&\mathbf 1\end{bmatrix}$ và vector tham số $(w,w_0)$, tính gradient bằng Mệnh đề 00.45, và dùng $\mathbf 1^TX=(X^T\mathbf 1)^T=0$.
:::

::: hint Gợi ý 2
Tính Hessian của $J_\lambda$ theo $(w,w_0)$ và chứng minh nó xác định dương; kết luận bằng Hệ quả 01.26 và Định lý 01.34.
:::

::: solution Lời giải Bài tập 02.27
**Điểm dừng duy nhất.** Hạng thứ nhất của $J_\lambda$ là $\lVert Xw+w_0\mathbf 1-y\rVert_2^2$, tổng bình phương phần dư với ma trận thiết kế $\begin{bmatrix}X&\mathbf 1\end{bmatrix}\in\mathbb R^{N\times(d+1)}$ và vector tham số $(w,w_0)$. Theo Mệnh đề 00.45, gradient của hạng này theo $(w,w_0)$ là $2\begin{bmatrix}X&\mathbf 1\end{bmatrix}^T(Xw+w_0\mathbf 1-y)$. Với $\mathbf 1^TX=0$ và $\mathbf 1^T\mathbf 1=N$,
$$
\begin{aligned}
\nabla_wJ_\lambda&=2X^T(Xw+w_0\mathbf 1-y)\\
&\quad+2\lambda w\\
&=2(X^TX+\lambda I_d)w\\
&\quad-2X^Ty,\\
\partial_{w_0}J_\lambda&=2\mathbf 1^T(Xw+w_0\mathbf 1-y)\\
&=2N(w_0-\bar y).
\end{aligned}
$$
Ma trận $X^TX+\lambda I_d$ xác định dương, vì $v^T(X^TX+\lambda I_d)v=\lVert Xv\rVert_2^2+\lambda\lVert v\rVert_2^2>0$ với $v\ne0$ (Mệnh đề 00.20), nên khả nghịch. Do đó gradient bằng $0$ khi và chỉ khi $w=\hat w$ và $w_0=\bar y$.

**Tính lồi chặt.** Hessian theo $(w,w_0)$ là
$$
\begin{aligned}
&\nabla^2J_\lambda\\
&\ =2\begin{bmatrix}X^TX+\lambda I_d&X^T\mathbf 1\\ \mathbf 1^TX&N\end{bmatrix}\\
&\ =2\begin{bmatrix}X^TX+\lambda I_d&0\\0&N\end{bmatrix}\succ0,
\end{aligned}
$$
nên $J_\lambda$ lồi chặt trên $\mathbb R^{d+1}$ (Định lý 01.29(b)). Theo Hệ quả 01.26 với $C=\mathbb R^{d+1}$, điểm dừng $(\hat w,\bar y)$ là nghiệm, và theo Định lý 01.34, nghiệm duy nhất.

Điều kiện $X^T\mathbf 1=0$ làm khối ngoài đường chéo của Hessian bằng $0$, nên phương trình theo $w_0$ tách khỏi phương trình theo $w$. Bài toán là tổ hợp $\ell_2^2+\ell_2^2$ của Định nghĩa 02.20, với số hạng phạt chỉ đặt trên $w$.

**Kiểm tra lại.** Với $N=2$, $d=1$, $X=(1,-1)^T$, $y=(3,1)^T$, $\lambda=2$: $X^T\mathbf 1=0$, $\bar y=2$, $X^TX=2$, $X^Ty=2$, nên $\hat w=2/4=\tfrac12$. Phần dư $y-X\hat w-\bar y\mathbf 1=(\tfrac12,-\tfrac12)$ cho $\partial_{w_0}J_\lambda=-2(\tfrac12-\tfrac12)=0$ và $\nabla_wJ_\lambda=-2X^T(\tfrac12,-\tfrac12)^T+2\lambda\hat w=-2+2=0$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3, 5; đưa bài toán lưới đàn hồi về LASSO trên dữ liệu bổ sung bằng một biến đổi tương đương.

::: exercise Bài tập 02.28 (Đưa bài toán lưới đàn hồi về LASSO; Murphy (2022), Bài 11.4, tr. 412)
Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$ và $\lambda_1,\lambda_2\ge0$. Bài toán *lưới đàn hồi* (elastic net) là cực tiểu
$$
\begin{aligned}
J_{\mathrm{en}}(w)&=\lVert y-Xw\rVert_2^2+\lambda_2\lVert w\rVert_2^2\\
&\quad+\lambda_1\lVert w\rVert_1 .
\end{aligned}
$$
Đặt $\varkappa=(1+\lambda_2)^{-1/2}$,
$$
\begin{aligned}
\tilde X&=\varkappa\begin{bmatrix}X\\ \sqrt{\lambda_2}\,I_d\end{bmatrix}\in\mathbb R^{(N+d)\times d},\\
\tilde y&=\begin{bmatrix}y\\0\end{bmatrix}\in\mathbb R^{N+d},
\end{aligned}
$$
và
$$
\tilde J(w)=\lVert\tilde y-\tilde Xw\rVert_2^2+\varkappa\lambda_1\lVert w\rVert_1 .
$$

- **(a)** Chứng minh $J_{\mathrm{en}}(\varkappa w)=\tilde J(w)$ với mọi $w\in\mathbb R^d$.
- **(b)** Gọi $S^*_{\mathrm{en}}$ và $\tilde S^*$ là tập nghiệm của $\min_wJ_{\mathrm{en}}(w)$ và $\min_w\tilde J(w)$. Suy ra $S^*_{\mathrm{en}}=\{\varkappa w\mid w\in\tilde S^*\}$, nêu các ánh xạ $\varphi$, $\psi$ của biến đổi tương đương, và nhận dạng bài toán $\min \tilde J$.
:::

::: hint Gợi ý 1
Với hai khối $r\in\mathbb R^N$, $r'\in\mathbb R^d$, $\bigl\lVert\begin{bmatrix}r\\r'\end{bmatrix}\bigr\rVert_2^2=\lVert r\rVert_2^2+\lVert r'\rVert_2^2$; áp dụng cho $\tilde y-\tilde Xw$.
:::

::: hint Gợi ý 2
Ở (b), từ đẳng thức ở (a), chọn $\varphi$ và $\psi$ là phép nhân với một hằng số dương, lấy $T(s)=s$, rồi kiểm tra (4.3).
:::

::: solution Lời giải Bài tập 02.28
**Câu (a).** Theo khối, $\tilde y-\tilde Xw=\begin{bmatrix}y-X(\varkappa w)\\-\sqrt{\lambda_2}\,\varkappa w\end{bmatrix}$, nên
$$
\begin{aligned}
\lVert\tilde y-\tilde Xw\rVert_2^2&=\lVert y-X(\varkappa w)\rVert_2^2\\
&\quad+\lambda_2\lVert\varkappa w\rVert_2^2 .
\end{aligned}
$$
Vì $\varkappa>0$, $\varkappa\lambda_1\lVert w\rVert_1=\lambda_1\lVert\varkappa w\rVert_1$. Cộng hai đẳng thức: $\tilde J(w)=J_{\mathrm{en}}(\varkappa w)$.

**Câu (b).** Đặt $(\mathrm P)$: $\min_wJ_{\mathrm{en}}(w)$ và $(\mathrm Q)$: $\min_w\tilde J(w)$, $\varphi(w)=w/\varkappa$, $\psi(w)=\varkappa w$, $T(s)=s$. Theo (a), $\tilde J(\varphi(w))=J_{\mathrm{en}}(w)$ và $J_{\mathrm{en}}(\psi(w))=\tilde J(w)$, nên (4.3) đúng với dấu bằng. Theo Mệnh đề 02.6, $w^*\in S^*_{\mathrm{en}}$ kéo theo $w^*/\varkappa\in\tilde S^*$, và $\tilde w\in\tilde S^*$ kéo theo $\varkappa\tilde w\in S^*_{\mathrm{en}}$. Hai bao hàm này cho $S^*_{\mathrm{en}}=\{\varkappa w\mid w\in\tilde S^*\}$, và hai giá trị tối ưu bằng nhau.

Bài toán $\min \tilde J$ là LASSO (tổ hợp $\ell_2^2+\ell_1$ của Định nghĩa 02.20) trên dữ liệu $(\tilde X,\tilde y)$ với hệ số phạt $\varkappa\lambda_1$, nên một bộ giải LASSO cho nghiệm của bài toán lưới đàn hồi qua $\psi$. Khi $\lambda_2>0$, khối dưới $\varkappa\sqrt{\lambda_2}\,I_d$ cho $\operatorname{rank}\tilde X=d$, nên với $\lambda_1>0$, Mệnh đề 02.21(c) cho $\min \tilde J$, và do đó $\min J_{\mathrm{en}}$, đúng một nghiệm.

**Kiểm tra lại.** Với $N=d=1$, $X=1$, $y=1$, $\lambda_2=3$, $\lambda_1=1$: $\varkappa=\tfrac12$, $\tilde X=(\tfrac12,\tfrac{\sqrt3}2)^T$, $\tilde y=(1,0)^T$. Tại $w=1$, $\tilde J(1)=(1-\tfrac12)^2+\tfrac34+\tfrac12=\tfrac32$ và $J_{\mathrm{en}}(\tfrac12)=\tfrac14+3\cdot\tfrac14+\tfrac12=\tfrac32$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 4, 5; đưa ba bài toán chứa tổng đơn thức dương về quy hoạch hình học hoặc bài toán lồi sau đổi biến logarit, kèm ánh xạ khôi phục.

::: exercise Bài tập 02.29 (Ba bài toán với tổng đơn thức dương; Boyd và Vandenberghe, Bài 4.33(a)–(c), tr. 199)
Cho $f_1$, $f_2$ là tổng đơn thức dương và $g$ là đơn thức trên $\mathbb R^n_{++}$. Đưa mỗi bài toán sau về một bài toán tối ưu lồi tương đương; nêu các ánh xạ $\varphi$, $\psi$ và hàm $T$ của mỗi biến đổi:

- **(a)** $\min_{x>0}\max\{f_1(x),f_2(x)\}$;
- **(b)** $\min_{x>0}\exp(f_1(x))+\exp(f_2(x))$;
- **(c)** $\min_{x>0}f_1(x)/(g(x)-f_2(x))$ với ràng buộc $g(x)>f_2(x)$.
:::

::: hint Gợi ý 1
Ở (a) và (c), thêm một biến dương $t$ chặn trên mục tiêu, rồi dùng Mệnh đề 02.30 để viết mỗi ràng buộc ở dạng "tổng đơn thức dương $\le1$" theo biến $(x,t)$.
:::

::: hint Gợi ý 2
Ở (b), thêm hai biến thực $t_1\ge f_1(x)$, $t_2\ge f_2(x)$ và chỉ đổi biến logarit cho $x$. Kiểm tra tính lồi của $z\mapsto f_i(e^z)$ bằng Định lý 01.30.
:::

::: solution Lời giải Bài tập 02.29
**Câu (a).** Xét quy hoạch hình học theo biến $(x,t)\in\mathbb R^{n+1}_{++}$:
$$
\begin{aligned}
&\underset{(x,t)}{\operatorname{minimize}}\ t\\
&\text{subject to}\\
&\ \ f_1(x)t^{-1}\le1,\ \ f_2(x)t^{-1}\le1 .
\end{aligned}
$$
Mỗi hạng của $f_i(x)t^{-1}$ là một đơn thức theo $(x,t)$, nên đây là dạng chuẩn (7.1). Với $\varphi(x)=(x,\max\{f_1(x),f_2(x)\})$, $\psi(x,t)=x$, $T(s)=s$:

- tại $\varphi(x)$, ràng buộc đúng vì $f_i(x)\le\max\{f_1(x),f_2(x)\}$, và mục tiêu bằng mục tiêu gốc;
- tại $(x,t)$ khả thi, nhân hai ràng buộc với $t>0$ cho $f_1(x)\le t$, $f_2(x)\le t$, nên $\max\{f_1(x),f_2(x)\}\le t$ (Bổ đề 02.14).

Vậy (4.3) đúng. Theo Định lý 02.33 với $(z,z_{n+1})=(\log x,\log t)$, bài toán tương đương với bài toán lồi $\min z_{n+1}$ với $\log f_i(e^z)-z_{n+1}\le0$, $i=1,2$, trong đó $\log f_i(e^z)$ là hàm log-sum-exp của các hàm affine theo $z$ (Bổ đề 02.31, Định lý 02.32).

**Câu (b).** Xét bài toán theo biến $(x,t_1,t_2)\in\mathbb R^n_{++}\times\mathbb R\times\mathbb R$:
$$
\begin{aligned}
&\underset{(x,t_1,t_2)}{\operatorname{minimize}}\ e^{t_1}+e^{t_2}\\
&\text{subject to}\\
&\ \ f_1(x)\le t_1,\ \ f_2(x)\le t_2 .
\end{aligned}
$$
Với $\varphi(x)=(x,f_1(x),f_2(x))$, $\psi(x,t_1,t_2)=x$, $T(s)=s$: tại $\varphi(x)$ hai mục tiêu bằng nhau; tại một điểm khả thi, $e^{f_i(x)}\le e^{t_i}$ vì hàm mũ tăng, nên (4.3) đúng. Đổi biến $x=e^z$, giữ nguyên $t_1,t_2$ (ánh xạ $(x,t)\mapsto(\log x,t)$ và ngược lại $(z,t)\mapsto(e^z,t)$, $T(s)=s$), ta được
$$
\begin{aligned}
&\underset{(z,t_1,t_2)\in\mathbb R^{n+2}}{\operatorname{minimize}}\ e^{t_1}+e^{t_2}\\
&\text{subject to}\\
&\ \ f_i(e^z)-t_i\le0,\ i=1,2 .
\end{aligned}
$$
Theo Bổ đề 02.31, $f_i(e^z)=\sum_ke^{\alpha_{k}^Tz+\beta_{k}}$ với các $\alpha_k$, $\beta_k$ của $f_i$. Hàm $s\mapsto e^s$ có đạo hàm bậc hai $e^s>0$, nên lồi (Bổ đề 01.28(a)); mỗi hạng $e^{\alpha_k^Tz+\beta_k}$ lồi theo Định lý 01.30(b), và tổng lồi theo Định lý 01.30(a). Do đó mọi hàm ràng buộc và mục tiêu lồi, và bài toán ở dạng (4.1) với $D=\mathbb R^{n+2}$.

**Câu (c).** Xét quy hoạch hình học theo biến $(x,t)\in\mathbb R^{n+1}_{++}$:
$$
\begin{aligned}
&\underset{(x,t)}{\operatorname{minimize}}\ t\\
&\text{subject to}\\
&\ \ \frac{f_1(x)t^{-1}+f_2(x)}{g(x)}\le1 .
\end{aligned}
$$
Vế trái là tổng đơn thức dương theo $(x,t)$ (Mệnh đề 02.30(a)). Với $\varphi(x)=\bigl(x,f_1(x)/(g(x)-f_2(x))\bigr)$, $\psi(x,t)=x$, $T(s)=s$:

- tại $x$ khả thi, $t=f_1(x)/(g(x)-f_2(x))>0$ và vế trái bằng $\bigl(g(x)-f_2(x)+f_2(x)\bigr)/g(x)=1$, nên $\varphi(x)$ khả thi với cùng giá trị mục tiêu;
- tại $(x,t)$ khả thi, ràng buộc cho $g(x)-f_2(x)\ge f_1(x)/t>0$, nên $x$ khả thi cho bài toán gốc, và nhân hai vế của $f_1(x)/t\le g(x)-f_2(x)$ với $t/(g(x)-f_2(x))>0$ cho $f_1(x)/(g(x)-f_2(x))\le t$.

Vậy (4.3) đúng, và Định lý 02.33 cho dạng lồi.

**Kiểm tra lại.** Với $n=1$:

- ở (a), $f_1(x)=x$, $f_2(x)=1/x$: $\max\{x,1/x\}\ge1$ với dấu bằng tại $x=1$, và trong quy hoạch hình học $t\ge x$, $t\ge1/x$ cho $t\ge1$, đạt tại $(1,1)$;
- ở (b), cùng $f_1$, $f_2$: đạo hàm $e^x-e^{1/x}/x^2$ bằng $0$ tại $x=1$, giá trị $2e$, khớp với điểm $(z,t_1,t_2)=(0,1,1)$;
- ở (c), $f_1(x)=1/x$, $f_2(x)=x$, $g(x)=2$: mục tiêu $1/(x(2-x))$ nhỏ nhất tại $x=1$ với giá trị $1$, và điểm $(x,t)=(1,1)$ cho vế trái $(1+1)/2=1$.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 2; lập quy hoạch tuyến tính từ một mô tả bằng lời và đưa nó về dạng chuẩn.

::: exercise Bài tập 02.30 (Bài toán luồng mạng; Boyd và Vandenberghe, Bài 4.12, tr. 193)
*Bài toán luồng mạng* (network flow problem) xét một mạng có $n$ nút, với cung có hướng nối mọi cặp nút. Biến của bài toán là luồng trên các cung: $x_{ij}$ là luồng từ nút $i$ tới nút $j$, $i,j=1,\ldots,n$. Chi phí của luồng trên cung từ nút $i$ tới nút $j$ là $c_{ij}x_{ij}$ với các hằng số $c_{ij}$ cho trước, và tổng chi phí trên mạng là $\sum_{i,j=1}^nc_{ij}x_{ij}$. Mỗi luồng $x_{ij}$ có cận dưới $\underline x_{ij}$ (thường không âm) và cận trên $\overline x_{ij}$ cho trước.

Lượng *cung ngoài* (external supply) tại nút $i$ là $\beta_i$: $\beta_i>0$ nghĩa là một luồng từ ngoài đi vào mạng tại nút $i$, còn $\beta_i<0$ nghĩa là lượng $\lvert\beta_i\rvert$ rời mạng tại nút $i$. Giả sử $\sum_i\beta_i=0$, tức tổng cung ngoài bằng tổng cầu ngoài. Tại mỗi nút có *bảo toàn luồng* (conservation of flow): tổng luồng đi vào nút theo các cung cộng với cung ngoài, trừ tổng luồng đi ra theo các cung, bằng $0$. Bài toán là cực tiểu tổng chi phí với các ràng buộc trên.

- **(a)** Lập bài toán thành một quy hoạch tuyến tính dạng (5.2).
- **(b)** Đưa quy hoạch tuyến tính ở (a) về dạng chuẩn (5.3) và nêu các ánh xạ $\varphi$, $\psi$ và hàm $T$ của biến đổi.
:::

::: hint Gợi ý 1
Tại nút $i$, luồng đi vào theo các cung là $\sum_jx_{ji}$ và luồng đi ra là $\sum_jx_{ij}$.
:::

::: hint Gợi ý 2
Ở (b), đặt $x_{ij}=\underline x_{ij}+\zeta_{ij}$ với $\zeta_{ij}\ge0$, và thêm một biến bù không âm cho mỗi cận trên. Hằng số xuất hiện trong mục tiêu được xử lý bằng hàm $T$ của Định nghĩa 02.5.
:::

::: solution Lời giải Bài tập 02.30
**Câu (a).** Biến quyết định là $x=(x_{ij})\in\mathbb R^{n\times n}$, gồm $n^2$ tọa độ. Quy hoạch tuyến tính là
$$
\begin{aligned}
&\underset{x}{\operatorname{minimize}}\ \textstyle\sum_{i,j=1}^nc_{ij}x_{ij}\\
&\text{subject to}\\
&\ \ \beta_i+\textstyle\sum_jx_{ji}-\sum_jx_{ij}=0,\\
&\ \ \quad i=1,\ldots,n,\\
&\ \ \underline x_{ij}\le x_{ij}\le\overline x_{ij},\\
&\ \ \quad i,j=1,\ldots,n .
\end{aligned}
$$
Mục tiêu và mọi ràng buộc affine. Theo dạng (5.2), mỗi đẳng thức bảo toàn là một hàng của $Ax=b$ với vế phải $-\beta_i$: hệ số của $x_{ji}$ là $1$, của $x_{ij}$ là $-1$, và của $x_{ii}$ là $0$. Hai cận cho $2n^2$ hàng của $Gx\le h$: $x_{ij}\le\overline x_{ij}$ và $-x_{ij}\le-\underline x_{ij}$. Theo Mệnh đề 02.10(a), bài toán là bài toán tối ưu lồi và tập khả thi là một đa diện.

**Câu (b).** Đặt $\zeta_{ij}=x_{ij}-\underline x_{ij}$ và $\sigma_{ij}=\overline x_{ij}-x_{ij}$. Quy hoạch tuyến tính dạng chuẩn theo biến $(\zeta,\sigma)\in\mathbb R^{n^2}\times\mathbb R^{n^2}$ là
$$
\begin{aligned}
&\underset{(\zeta,\sigma)\ge0}{\operatorname{minimize}}\ \textstyle\sum_{i,j}c_{ij}\zeta_{ij}\\
&\text{subject to}\\
&\ \ \textstyle\sum_j\zeta_{ji}-\sum_j\zeta_{ij}=-\beta_i\\
&\ \ \quad-\textstyle\sum_j\underline x_{ji}+\sum_j\underline x_{ij},\\
&\ \ \quad i=1,\ldots,n,\\
&\ \ \zeta_{ij}+\sigma_{ij}=\overline x_{ij}-\underline x_{ij},\\
&\ \ \quad i,j=1,\ldots,n,
\end{aligned}
$$
với $2n^2$ biến và $n+n^2$ đẳng thức. Đặt $\varphi(x)=(x-\underline x,\ \overline x-x)$, $\psi(\zeta,\sigma)=\underline x+\zeta$ và $T(s)=s-\sum_{i,j}c_{ij}\underline x_{ij}$, hàm tăng chặt.

- Với $x$ khả thi cho (a), $\varphi(x)\ge0$ theo hai cận, các đẳng thức của (b) có được bằng cách thay $x_{ij}=\underline x_{ij}+\zeta_{ij}$ vào đẳng thức bảo toàn và từ $\zeta_{ij}+\sigma_{ij}=\overline x_{ij}-\underline x_{ij}$; mục tiêu của (b) tại $\varphi(x)$ bằng $\sum c_{ij}x_{ij}-\sum c_{ij}\underline x_{ij}=T(\text{mục tiêu của (a)})$.
- Với $(\zeta,\sigma)$ khả thi cho (b), $x=\underline x+\zeta$ thỏa $x\ge\underline x$ vì $\zeta\ge0$, thỏa $x\le\overline x$ vì $\sigma\ge0$, và thỏa đẳng thức bảo toàn; $T$ của mục tiêu (a) tại $x$ bằng $\sum c_{ij}\zeta_{ij}$.

Vậy (4.3) đúng với dấu bằng, và theo Mệnh đề 02.6, nếu $(\zeta^*,\sigma^*)$ là nghiệm của (b) thì $x^*=\underline x+\zeta^*$ là nghiệm của (a), với chi phí tối ưu bằng giá trị tối ưu của (b) cộng $\sum c_{ij}\underline x_{ij}$. Phép dịch theo cận dưới thay cho việc tách mỗi biến tự do thành hiệu $x^+-x^-$ của Mệnh đề 02.10(b), nên dạng chuẩn chỉ có $2n^2$ biến.

**Kiểm tra lại.**

- Cộng $n$ đẳng thức bảo toàn: mỗi $x_{ij}$ xuất hiện một lần với dấu $+$ (tại nút $j$) và một lần với dấu $-$ (tại nút $i$), nên tổng là $\sum_i\beta_i=0$, đúng với giả thiết; khi $\sum_i\beta_i\ne0$, bài toán không khả thi.
- Với $n=2$, $\beta=(1,-1)$, $c_{12}=3$, $c_{21}=1$, $c_{11}=c_{22}=0$, $0\le x_{12}\le2$, $0\le x_{21}\le2$, $x_{11}=x_{22}=0$: đẳng thức tại nút $1$ là $1+x_{21}-x_{12}=0$, nên chi phí là $3(1+x_{21})+x_{21}=3+4x_{21}\ge3$, đạt tại $x_{21}=0$, $x_{12}=1$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 2, 6; nhận ra một doanh thu tuyến tính từng khúc lõm và đưa bài toán cực đại doanh thu về quy hoạch tuyến tính bằng biến phụ.

::: exercise Bài tập 02.31 (Mức hoạt động tối ưu với giá chiết khấu theo sản lượng; Boyd và Vandenberghe, Bài 4.17, tr. 195)
Cần chọn $n$ mức hoạt động không âm $x_1,\ldots,x_n$. Các hoạt động tiêu thụ $m$ loại tài nguyên có giới hạn: hoạt động $j$ tiêu thụ $G_{ij}x_j$ đơn vị tài nguyên $i$, với $G_{ij}$ cho trước, và tổng lượng tài nguyên $i$ được tiêu thụ là $(Gx)_i=\sum_{j=1}^nG_{ij}x_j$. Thông thường $G_{ij}\ge0$; $G_{ij}<0$ nghĩa là hoạt động $j$ tạo ra tài nguyên $i$ như một sản phẩm phụ. Lượng tiêu thụ bị giới hạn: $(Gx)_i\le h_i$ với $h_i$ cho trước. Mỗi hoạt động tạo ra doanh thu $\mathcal R_j(x_j)$ là một hàm tuyến tính từng khúc lõm của mức hoạt động:

- $\mathcal R_j(x_j)=\varpi_jx_j$ khi $0\le x_j\le x_j^{\mathrm{ck}}$;
- $\mathcal R_j(x_j)=\varpi_jx_j^{\mathrm{ck}}+\varpi_j^{\mathrm{ck}}(x_j-x_j^{\mathrm{ck}})$ khi $x_j\ge x_j^{\mathrm{ck}}$,

trong đó $\varpi_j>0$ là giá cơ bản, $x_j^{\mathrm{ck}}>0$ là mức sản lượng bắt đầu được chiết khấu (ck: chiết khấu), và $\varpi_j^{\mathrm{ck}}$ là *giá chiết khấu* (discount price), với $0<\varpi_j^{\mathrm{ck}}<\varpi_j$. Tổng doanh thu là $\sum_j\mathcal R_j(x_j)$. Lập bài toán chọn mức hoạt động làm cực đại tổng doanh thu và thỏa các giới hạn tài nguyên thành một quy hoạch tuyến tính, và nêu cách khôi phục nghiệm.
:::

::: hint Gợi ý 1
Dùng $\varpi_j^{\mathrm{ck}}<\varpi_j$ để viết $\mathcal R_j(x_j)$ thành cực tiểu của hai hàm affine.
:::

::: hint Gợi ý 2
Đổi bài toán cực đại thành bài toán cực tiểu (bước 1 của Thuật toán 02.44); khi đó mỗi hạng của mục tiêu là cực đại của hai hàm affine, và Định lý 02.15 áp dụng được.
:::

::: solution Lời giải Bài tập 02.31
**Doanh thu là cực tiểu của hai hàm affine.** Với $x_j\ge0$,
$$
\begin{aligned}
&\varpi_jx_j-\bigl(\varpi_jx_j^{\mathrm{ck}}+\varpi_j^{\mathrm{ck}}(x_j-x_j^{\mathrm{ck}})\bigr)\\
&\quad=(\varpi_j-\varpi_j^{\mathrm{ck}})(x_j-x_j^{\mathrm{ck}}),
\end{aligned}
$$
không dương khi $x_j\le x_j^{\mathrm{ck}}$ và không âm khi $x_j\ge x_j^{\mathrm{ck}}$, vì $\varpi_j-\varpi_j^{\mathrm{ck}}>0$. Do đó $\mathcal R_j(x_j)=\min\{\varpi_jx_j,\ \varpi_jx_j^{\mathrm{ck}}+\varpi_j^{\mathrm{ck}}(x_j-x_j^{\mathrm{ck}})\}$.

**Bài toán cực tiểu tương đương.** Cực đại $\sum_j\mathcal R_j(x_j)$ trên $C=\{x\mid x\ge0,\ Gx\le h\}$ có cùng tập nghiệm với cực tiểu $\sum_j(-\mathcal R_j(x_j))$, và
$$
\begin{aligned}
&-\mathcal R_j(x_j)=\max\{-\varpi_jx_j,\\
&\quad-\varpi_jx_j^{\mathrm{ck}}-\varpi_j^{\mathrm{ck}}(x_j-x_j^{\mathrm{ck}})\}.
\end{aligned}
$$

**Quy hoạch tuyến tính tương đương.** Tập $C$ là một đa diện. Định lý 02.15(a) với $f_0=0$, $M=n$, $K_j=2$ và mọi trọng số bằng $1$ cho quy hoạch tuyến tính
$$
\begin{aligned}
&\underset{x,t\in\mathbb R^n}{\operatorname{minimize}}\ \mathbf 1^Tt\\
&\text{subject to}\\
&\ \ -\varpi_jx_j\le t_j,\ j=1,\ldots,n,\\
&\ \ -\varpi_jx_j^{\mathrm{ck}}-\varpi_j^{\mathrm{ck}}(x_j-x_j^{\mathrm{ck}})\le t_j,\\
&\ \ \quad j=1,\ldots,n,\\
&\ \ Gx\le h,\ \ x\ge0,
\end{aligned}
$$
với $\varphi(x)=(x,(-\mathcal R_j(x_j))_j)$, $\psi(x,t)=x$. Nếu $(x^*,t^*)$ là nghiệm thì $x^*$ là mức hoạt động tối ưu, $t_j^*=-\mathcal R_j(x_j^*)$ (Định lý 02.15(b)), và doanh thu lớn nhất bằng $-\mathbf 1^Tt^*$.

**Biến phụ thỏa bước 8 của Thuật toán 02.44.** Bài toán sau khi đổi dấu là bài toán cực tiểu, mọi trọng số trước các cực đại bằng $1\ge0$, và mỗi $t_j$ có ràng buộc cho cả hai nhánh của cực đại. Giả thiết $\varpi_j^{\mathrm{ck}}<\varpi_j$ được dùng để viết $\mathcal R_j$ thành cực tiểu; nếu $\varpi_j^{\mathrm{ck}}>\varpi_j$, $\mathcal R_j$ là cực đại của hai hàm affine, và bài toán cực đại tổng doanh thu rơi vào ý 3 của Nhận xét 02.16: biến phụ không cho biến đổi tương đương.

**Kiểm tra lại.** Với $n=m=1$, $G=1$, $h=3$, $\varpi_1=2$, $\varpi_1^{\mathrm{ck}}=1$, $x_1^{\mathrm{ck}}=1$: doanh thu $\mathcal R_1(x_1)=\min\{2x_1,\ 1+x_1\}$ tăng trên $[0,3]$, nên $x_1^*=3$ với doanh thu $4$. Trong quy hoạch tuyến tính, $t_1\ge\max\{-2x_1,-1-x_1\}\ge-1-x_1\ge-4$ khi $x_1\le3$, và $(x_1,t_1)=(3,-4)$ khả thi với $-6\le-4$, $-4\le-4$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 1, 6; áp dụng Thuật toán 02.44 cho một mô hình logistic, dùng phép lấy logarit mục tiêu để được một bài toán lồi tương đương.

::: exercise Bài tập 02.32 (Cực đại lợi nhuận kỳ vọng theo mô hình logistic; Boyd và Vandenberghe, Bài 4.61(b), tr. 210)
Biến ngẫu nhiên $Y\in\{0,1\}$ có
$$
\Pr(Y=1\mid x)=\frac{e^{a^Tx+a_0}}{1+e^{a^Tx+a_0}},
$$
trong đó $a\in\mathbb R^n$ và $a_0\in\mathbb R$ là các tham số đã biết. Sự kiện $Y=1$ là sự kiện một khách hàng mua sản phẩm, và $x\in\mathbb R^n$ là vector các yếu tố ảnh hưởng tới xác suất mua, như mức đầu tư quảng cáo, giá bán lẻ, giá khuyến mãi, chi phí bao bì. Biến $x$ phải thỏa các ràng buộc tuyến tính $Gx\le h$, với $G\in\mathbb R^{m\times n}$ và $h\in\mathbb R^m$ đã biết. Lợi nhuận thu được khi bán sản phẩm là $\tilde a^Tx+\tilde a_0$, với $\tilde a\in\mathbb R^n$, $\tilde a_0\in\mathbb R$, và giả sử lợi nhuận này dương với mọi $x$ khả thi. Mục tiêu là chọn $x$ làm cực đại lợi nhuận kỳ vọng $\mathcal E(x)=\Pr(Y=1\mid x)\,(\tilde a^Tx+\tilde a_0)$.

- **(a)** Đưa bài toán về một bài toán cực tiểu dạng (4.1) có cùng tập nghiệm; nêu miền $D$, các ánh xạ $\varphi$, $\psi$ và hàm $T$ của biến đổi.
- **(b)** Chứng nhận bài toán ở (a) là bài toán tối ưu lồi theo bước 2 của Thuật toán 02.44.
:::

::: hint Gợi ý 1
Hai thừa số của $\mathcal E(x)$ dương trên tập khả thi. Lấy logarit, một hàm tăng chặt trên $(0,\infty)$, rồi đổi dấu để được một bài toán cực tiểu.
:::

::: hint Gợi ý 2
Viết $\log\Pr(Y=1\mid x)=-\log\bigl(1+e^{-(a^Tx+a_0)}\bigr)$ và dùng Mệnh đề 01.8(c). Với hạng còn lại, tính Hessian của $x\mapsto-\log(\tilde a^Tx+\tilde a_0)$ trên tập mở $D$.
:::

::: solution Lời giải Bài tập 02.32
**Câu (a).** Chia tử và mẫu cho $\exp(a^Tx+a_0)$: $\Pr(Y=1\mid x)=1/\bigl(1+e^{-(a^Tx+a_0)}\bigr)>0$, nên $\log\Pr(Y=1\mid x)=-\log\bigl(1+e^{-(a^Tx+a_0)}\bigr)$. Theo bước 1 của Thuật toán 02.44, bài toán gốc tương đương với $(\mathrm P)$: $\min_{x\in C}\bigl(-\mathcal E(x)\bigr)$, $C=\{x\mid Gx\le h\}$, và $-\mathcal E(x)<0$ trên $C$. Chọn miền
$$
D=\{x\in\mathbb R^n\mid\tilde a^Tx+\tilde a_0>0\},
$$
chứa $C$ theo giả thiết, và bài toán
$$
\begin{aligned}
(\mathrm Q):\ &\underset{x\in D}{\operatorname{minimize}}\ f_0(x)\\
&\text{subject to}\ \ Gx\le h,
\end{aligned}
$$
với
$$
\begin{aligned}
f_0(x)&=\log\bigl(1+e^{-(a^Tx+a_0)}\bigr)\\
&\quad-\log(\tilde a^Tx+\tilde a_0).
\end{aligned}
$$
Với $x\in C$, $f_0(x)=-\log\mathcal E(x)=T(-\mathcal E(x))$, trong đó $T(s)=-\log(-s)$ có đạo hàm $-1/s>0$ trên $(-\infty,0)$, nên tăng chặt trên khoảng chứa mọi giá trị của $-\mathcal E$. Với $\varphi(x)=x$, $\psi(x)=x$, cả hai bất đẳng thức của (4.3) đúng với dấu bằng, nên theo Mệnh đề 02.6, $(\mathrm P)$ và $(\mathrm Q)$ có cùng tập nghiệm. Khi $(\mathrm Q)$ có nghiệm $x^*$ với giá trị $p^*$, lợi nhuận kỳ vọng lớn nhất là $\mathcal E(x^*)=e^{-p^*}$.

**Câu (b).** Theo bước 2 của Thuật toán 02.44, kiểm tra từng dòng theo Định nghĩa 02.1.

- *Miền.* $D$ là tập mở, vì bất đẳng thức chặt $\tilde a^Tx+\tilde a_0>0$ vẫn đúng trong một lân cận của mỗi điểm thỏa nó, và lồi: nếu $\tilde a^Tx+\tilde a_0>0$, $\tilde a^Tx'+\tilde a_0>0$ và $\vartheta\in[0,1]$ thì $\tilde a^T(\vartheta x+(1-\vartheta)x')+\tilde a_0=\vartheta(\tilde a^Tx+\tilde a_0)+(1-\vartheta)(\tilde a^Tx'+\tilde a_0)>0$.
- *Hạng thứ nhất của mục tiêu.* Hàm $\zeta\mapsto\log(1+e^{-\zeta})$, mất mát logistic $\ell$ của Mệnh đề 01.8, có đạo hàm bậc hai dương (Mệnh đề 01.8(c)), nên lồi trên $\mathbb R$ (Bổ đề 01.28(a)); hợp với ánh xạ affine $x\mapsto a^Tx+a_0$ là hàm lồi (Định lý 01.30(b)).
- *Hạng thứ hai của mục tiêu.* Hàm $x\mapsto-\log(\tilde a^Tx+\tilde a_0)$ thuộc lớp $C^2$ trên tập mở lồi $D$, với gradient $-\tilde a/(\tilde a^Tx+\tilde a_0)$ và Hessian $\tilde a\tilde a^T/(\tilde a^Tx+\tilde a_0)^2$; ma trận này nửa xác định dương vì $v^T\tilde a\tilde a^Tv=(\tilde a^Tv)^2\ge0$, nên hàm lồi trên $D$ (Định lý 01.29(a)).
- *Mục tiêu.* $f_0$ là tổng của hai hàm lồi trên $D$, nên lồi (Định lý 01.30(a)).
- *Ràng buộc.* Các hàm $(Gx)_i-h_i$ affine, nên lồi; không có đẳng thức.

Vậy $(\mathrm Q)$ thỏa Định nghĩa 02.1, và theo Mệnh đề 02.2, đây là bài toán tối ưu lồi.

**Kiểm tra lại.** Với $n=1$, $a=1$, $a_0=0$, $\tilde a=-1$, $\tilde a_0=2$ và ràng buộc $0\le x\le1$ ($G=(1,-1)^T$, $h=(1,0)^T$), lợi nhuận $2-x\in[1,2]$ dương trên tập khả thi. Ta có $f_0'(x)=-1/(1+e^x)+1/(2-x)$, nên $f_0'(0)=-\tfrac12+\tfrac12=0$, và (4.2) đúng tại $x^*=0$ (Hệ quả 02.4(c)). Lợi nhuận kỳ vọng tại đó là $\mathcal E(0)=\tfrac12\cdot2=1$, lớn hơn $\mathcal E(1)=e/(1+e)\approx0{,}7311$.
:::

## Tài liệu tham khảo

- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press:
  - Chương 2, mục Exercises: Bài 2.10(a) (Examples, tr. 61);
  - Chương 4, mục Exercises: Bài 4.1 (Basic terminology and optimality conditions, tr. 189); Bài 4.8(a), (b), (d), (e) (Linear optimization problems, tr. 192), Bài 4.11(c)–(e) và 4.12 (Linear optimization problems, tr. 193), Bài 4.17 (Linear optimization problems, tr. 195); Bài 4.21(a), (b) (Quadratic optimization problems, tr. 196–197), Bài 4.22 (Quadratic optimization problems, tr. 197); Bài 4.33(a)–(c) (Geometric programming, tr. 199), Bài 4.35 (Geometric programming, tr. 200); Bài 4.61(b) (Miscellaneous problems, tr. 210);
  - Chương 6, mục Exercises: Bài 6.2, phần chuẩn $\ell_1$ và $\ell_\infty$ (Norm approximation and least-norm problems, tr. 344).
- Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả: §11.8 (Exercises), Bài 11.2 (Centering and ridge regression, tr. 411–412) và Bài 11.4 (Reducing elastic net to lasso, tr. 412).
