# Bài tập Bài 03 — Đối ngẫu Lagrange

Bài tập 03.18–03.33 dưới đây đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-03/lecture-note.md&deck=lecture-03-doi-ngau-lagrange.html) và [bài giảng](lecture-03-doi-ngau-lagrange.html) của Bài 03. Mọi bài lấy từ Boyd và Vandenberghe (2004), Chương 5; số trang là trang in của sách. Lời giải dẫn định nghĩa, định lý, mệnh đề, ví dụ và bài tập theo số hiệu của ghi chú. Ký hiệu theo ghi chú: vector viết chữ thường, không in đậm, và là vector cột; bất đẳng thức giữa hai vector hiểu theo từng tọa độ; $\mathbf 1$ là vector có mọi tọa độ bằng $1$. Quy hoạch tuyến tính dạng bất đẳng thức được viết $\min c^Tx$ với ràng buộc $Fx\le h$, trong đó $F\in\mathbb R^{m\times n}$, $h\in\mathbb R^m$, và nhân tử của $Fx\le h$ là $\lambda\in\mathbb R^m$.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Lập hàm Lagrange và tính hàm đối ngẫu đến công thức tường minh | 03.1, 03.2, 03.10, 03.12, 03.14 | 03.21, 03.22, 03.23, 03.28, 03.32 |
| 1. Dùng giá trị của hàm đối ngẫu làm cận dưới cho giá trị tối ưu | 03.1, 03.2 | 03.20, 03.26, 03.27 |
| 2. Chứng minh và vận dụng đối ngẫu yếu | 03.11 | 03.18, 03.26, 03.27 |
| 2. Lập và giải bài toán đối ngẫu | 03.2, 03.3, 03.13, 03.14 | 03.19, 03.20, 03.21, 03.22, 03.23, 03.28, 03.30, 03.32 |
| 2. Khoảng đối ngẫu của một cặp và khoảng đối ngẫu tối ưu | 03.11 | — |
| 3. Kiểm tra điều kiện Slater | 03.4, 03.5, 03.10, 03.13 | 03.22, 03.23, 03.28 |
| 3. Kết luận của định lý Slater; đối ngẫu mạnh khi điều kiện Slater không thỏa | 03.4, 03.5 | 03.22, 03.28 |
| 3. Đối ngẫu mạnh và sự đạt nghiệm của bài toán gốc | 03.11 | — |
| 4. Tập giá trị, tập trên và đường cận | 03.6 | 03.22, 03.23 |
| 4. Hàm giá trị và độ nhạy toàn cục | 03.6 | 03.24, 03.25 |
| 4. Độ nhạy địa phương và giá bóng | 03.6, 03.8, 03.10, 03.17 | — |
| 5. Lập và giải hệ điều kiện Karush–Kuhn–Tucker (KKT) theo các trường hợp của điều kiện bù trừ | 03.7, 03.8, 03.10, 03.15, 03.16, 03.17 | 03.28, 03.29, 03.33 |
| 5. Tính cần của hệ KKT | 03.11 | 03.28, 03.30, 03.33 |
| 5. Tính đủ của hệ KKT | 03.7, 03.10, 03.15 | 03.29, 03.31, 03.33 |
| 6. Hồi quy có ràng buộc chuẩn | 03.9 | — |
| 6. Số hạng phạt và nhân tử | 03.9 | 03.26, 03.27 |
| 6. Máy vector hỗ trợ lề mềm và vector hỗ trợ | 03.16 | — |
| 6. Nới lỏng Lagrange cho bài toán chọn rời rạc | — | 03.32 |
| 6. Kết luận mất khi một giả thiết bị vi phạm | 03.13 | 03.19, 03.23, 03.24, 03.28, 03.33 |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 2; kiểm tra đối ngẫu yếu ở hai trường hợp có giá trị tối ưu vô hạn.

::: exercise Bài tập 03.18 (Đối ngẫu yếu khi giá trị tối ưu vô hạn; Boyd và Vandenberghe, Bài 5.2, tr. 273)
Xét bài toán (1.1) với giá trị tối ưu $p^*$ và bài toán đối ngẫu (5.4) với giá trị tối ưu $d^*$. Hệ quả 03.10(a) cho $d^*\le p^*$; khi $d^*=-\infty$ hoặc $p^*=+\infty$, bất đẳng thức này đúng ngay. Chứng minh trực tiếp từ Định lý 03.8 hai kéo theo sau, ứng với hai trường hợp còn lại:

- **(a)** nếu $p^*=-\infty$ thì $d^*=-\infty$;
- **(b)** nếu $d^*=+\infty$ thì $p^*=+\infty$.
:::

::: hint Gợi ý 1
Ở (a), cố định $\lambda\ge0$ và $\nu$, rồi áp dụng (5.3) tại các điểm khả thi có giá trị mục tiêu nhỏ tùy ý.
:::

::: hint Gợi ý 2
Ở (b), chứng minh mệnh đề phản đảo: khi tập khả thi có một điểm $\tilde x$, chặn mọi $g(\lambda,\nu)$ với $\lambda\ge0$ bằng một số không phụ thuộc nhân tử.
:::

::: solution Lời giải Bài tập 03.18
**Câu (a).** Giả sử $p^*=-\infty$. Theo Định nghĩa 01.9, với mọi số thực $M$ có một điểm khả thi $x$ với $f_0(x)<M$. Lấy $\lambda\ge0$ và $\nu$ bất kỳ. Theo Định lý 03.8, $g(\lambda,\nu)\le f_0(x)<M$, và vì $M$ tùy ý, $g(\lambda,\nu)=-\infty$. Vậy không có cặp khả thi đối ngẫu, và $d^*=-\infty$ theo quy ước của Định nghĩa 03.9.

**Câu (b).** Giả sử $p^*<+\infty$. Theo Định nghĩa 01.11, tập khả thi $C$ khác rỗng; lấy $\tilde x\in C$. Theo (5.3), $g(\lambda,\nu)\le f_0(\tilde x)$ với mọi $\lambda\ge0$ và mọi $\nu$, nên $d^*\le f_0(\tilde x)<+\infty$. Do đó $d^*=+\infty$ kéo theo $p^*=+\infty$, tức tập khả thi rỗng.

**Kiểm tra lại.**

- Ở (a), bài toán $\min_{x\in\mathbb R}x$ với $f_1(x)=x\le0$ có $p^*=-\infty$; hàm $L(x,\lambda)=(1+\lambda)x$ có hệ số $1+\lambda\ge1$, nên $g(\lambda)=-\infty$ với mọi $\lambda\ge0$ và $d^*=-\infty$.
- Ở (b), bài toán $\min_{x\in\mathbb R}0$ với $f_1(x)=1\le0$ không khả thi; $L(x,\lambda)=\lambda$, nên $g(\lambda)=\lambda$ và $d^*=\sup_{\lambda\ge0}\lambda=+\infty=p^*$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 2, 6; nhận ra một cặp quy hoạch tuyến tính mà cả bài toán gốc lẫn bài toán đối ngẫu đều không khả thi.

::: exercise Bài tập 03.19 (Quy hoạch tuyến tính với $p^*=+\infty$ và $d^*=-\infty$; Boyd và Vandenberghe, Bài 5.23(c), tr. 281)
Xét quy hoạch tuyến tính một biến
$$
\min_{x\in\mathbb R}\ x\quad\text{với}\quad Fx\le h,
$$
trong đó $F=\begin{pmatrix}0\\1\end{pmatrix}$ và $h=\begin{pmatrix}-1\\1\end{pmatrix}$, tức hai ràng buộc $0\cdot x\le-1$ và $x\le1$. Lập quy hoạch tuyến tính đối ngẫu, giải bài toán gốc và bài toán đối ngẫu, và chứng minh $p^*=+\infty$, $d^*=-\infty$.
:::

::: hint Gợi ý 1
Xét riêng ràng buộc thứ nhất để xác định tập khả thi.
:::

::: hint Gợi ý 2
Tính $L(x,\lambda)$, gom theo $x$, và dùng câu hỏi ôn nhanh thứ ba của ghi chú.
:::

::: solution Lời giải Bài tập 03.19
**Bài toán gốc.** Với mọi $x$, $0\cdot x=0>-1$, nên ràng buộc thứ nhất không được thỏa. Tập khả thi rỗng và $p^*=+\infty$ (Định nghĩa 01.11).

**Bài toán đối ngẫu.** Hàm Lagrange là $L(x,\lambda)=x+\lambda_1(0\cdot x+1)+\lambda_2(x-1)=(1+\lambda_2)x+\lambda_1-\lambda_2$. Theo câu hỏi ôn nhanh thứ ba và Định nghĩa 03.5, $g(\lambda)=\lambda_1-\lambda_2$ nếu $1+\lambda_2=0$ và $g(\lambda)=-\infty$ trong trường hợp còn lại. Quy hoạch tuyến tính đối ngẫu là
$$
\begin{aligned}
&\underset{\lambda}{\operatorname{maximize}}\ \lambda_1-\lambda_2\\
&\text{subject to}\\
&\ \ \lambda_2+1=0,\ \ \lambda\ge0 .
\end{aligned}
$$
Ràng buộc đẳng thức cho $\lambda_2=-1<0$, trái với $\lambda\ge0$. Bài toán đối ngẫu không khả thi, nên $d^*=-\infty$ theo quy ước của Định nghĩa 03.9.

**Kết luận.** $d^*=-\infty<+\infty=p^*$: đối ngẫu yếu đúng, đối ngẫu mạnh không đúng (Định nghĩa 03.12). Định lý 03.15 không áp dụng được, vì $p^*$ không hữu hạn.

**Kiểm tra lại.** Với mọi $\lambda\ge0$, hệ số $1+\lambda_2$ của $x$ trong $L$ không nhỏ hơn $1$; chẳng hạn $\lambda=(1,0)$ cho $L=x+1$, không bị chặn dưới, nên $g(1,0)=-\infty$.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2; lấy cận dưới của quy hoạch tuyến tính từ các nửa không gian chứa tập khả thi và nhận ra bài toán chọn cận tốt nhất là bài toán đối ngẫu Lagrange.

::: exercise Bài tập 03.20 (Đối ngẫu quy hoạch tuyến tính qua các nửa không gian chứa tập khả thi; Boyd và Vandenberghe, Bài 5.4, tr. 273–274)
Xét quy hoạch tuyến tính
$$
\min_{x\in\mathbb R^n}\ c^Tx\quad\text{với}\quad Fx\le h,
$$
trong đó $F\in\mathbb R^{m\times n}$, $h\in\mathbb R^m$, với giá trị tối ưu $p^*$. Cho $\mu\in\mathbb R^m$ với $\mu\ge0$. Mọi $x$ thỏa $Fx\le h$ cũng thỏa $\mu^TFx\le\mu^Th$, nên tập $H_\mu=\{x\mid\mu^TFx\le\mu^Th\}$, một nửa không gian khi $F^T\mu\ne0$, chứa tập khả thi. Theo Mệnh đề 01.15(a), cận dưới đúng của $c^Tx$ trên $H_\mu$ là một cận dưới của $p^*$.

- **(a)** Tìm biểu thức của $\inf_{x\in H_\mu}c^Tx$ theo $\mu$.
- **(b)** Lập bài toán tìm cận tốt nhất loại này, bằng cách cực đại cận dưới ở (a) theo $\mu\ge0$.
- **(c)** Liên hệ kết quả của (a) và (b) với bài toán đối ngẫu Lagrange của quy hoạch tuyến tính, cho bởi Mệnh đề 03.11.
:::

::: hint Gợi ý 1
Ở (a), đặt $\bar a=F^T\mu$ và $\bar\beta=\mu^Th$. Khi $\bar a\ne0$, áp dụng Bài tập 02.21(b) với $a=\bar a$, $\beta=\bar\beta$. Khi $\bar a=0$, $H_\mu$ là $\mathbb R^n$ hoặc tập rỗng tùy dấu của $\bar\beta$.
:::

::: hint Gợi ý 2
Ở (a), khi $\bar a\ne0$, viết $c=-s\bar a+\hat c$ với $s\in\mathbb R$ và $\bar a^T\hat c=0$, rồi xét riêng ba trường hợp:

- $\hat c\ne0$;
- $\hat c=0$ và $s<0$;
- $\hat c=0$ và $s\ge0$, dùng Mệnh đề 02.11.
:::

::: hint Gợi ý 3
Ở (c), viết điều kiện ở (a) thành $c=-sF^T\mu$ với $s\ge0$, đặt $\lambda=s\mu$, rồi viết các ràng buộc $Fx\le h$ ở dạng $\beta_i-a_i^Tx\le0$ của Mệnh đề 03.11.
:::

::: solution Lời giải Bài tập 03.20
Nếu quy hoạch tuyến tính không khả thi thì $p^*=+\infty$ và mọi số thực là cận dưới. Ta xét trường hợp tập khả thi $C$ khác rỗng; khi đó $H_\mu\supseteq C\ne\varnothing$ với mọi $\mu\ge0$.

**Câu (a).** Đặt $\bar a=F^T\mu$ và $\bar\beta=\mu^Th$.

- *Trường hợp $\bar a\ne0$.* Theo Bài tập 02.21(b) với $a=\bar a$ và $\beta=\bar\beta$, cận dưới đúng bằng $-s\bar\beta=-s\,h^T\mu$ nếu $c=-s\bar a$ với một $s\ge0$, và bằng $-\infty$ nếu không có $s$ như vậy. Khi $\bar a\ne0$, số $s$ này, nếu có, là duy nhất.
- *Trường hợp $\bar a=0$.* Vì $H_\mu\ne\varnothing$, ta có $\bar\beta\ge0$ và $H_\mu=\mathbb R^n$. Theo câu hỏi ôn nhanh thứ ba của ghi chú, cận dưới đúng bằng $0$ khi $c=0$ và bằng $-\infty$ khi $c\ne0$.

Hai trường hợp gộp lại thành
$$
\begin{aligned}
&\inf_{x\in H_\mu}c^Tx=\sup\{-s\,h^T\mu\mid\\
&\quad s\ge0,\ c=-sF^T\mu\},
\end{aligned}
$$
với quy ước cận trên đúng của tập rỗng bằng $-\infty$. Khi $\bar a=0$ và $c=0$, mọi $s\ge0$ thỏa ràng buộc và $-s\,h^T\mu\le0$, nên cận trên đúng bằng $0$.

**Câu (b).** Cận tốt nhất là giá trị tối ưu của bài toán theo hai biến $s\in\mathbb R$, $\mu\in\mathbb R^m$:
$$
\begin{aligned}
&\underset{s,\mu}{\operatorname{maximize}}\ -s\,h^T\mu\\
&\text{subject to}\\
&\ \ c=-sF^T\mu,\\
&\ \ s\ge0,\ \mu\ge0 .
\end{aligned}
$$
Ràng buộc và mục tiêu chứa tích $s\mu$, nên bài toán ở dạng này không là quy hoạch tuyến tính.

**Câu (c).** Đặt $\lambda=s\mu\ge0$. Bài toán ở (b) trở thành
$$
\begin{aligned}
&\underset{\lambda}{\operatorname{maximize}}\ -h^T\lambda\\
&\text{subject to}\\
&\ \ F^T\lambda+c=0,\ \ \lambda\ge0 .
\end{aligned}
$$
Ngược lại, mỗi $\lambda$ khả thi cho bài toán này cho cặp $(s,\mu)=(1,\lambda)$ khả thi cho (b) với cùng giá trị mục tiêu, nên hai bài toán có cùng giá trị tối ưu. Viết ràng buộc thứ $i$ thành $\beta_i-a_i^Tx\le0$ với $a_i=-F_{i\cdot}^T$ (hàng thứ $i$ của $F$, đổi dấu) và $\beta_i=-h_i$: bài toán đối ngẫu của Mệnh đề 03.11 là cực đại $\beta^T\lambda=-h^T\lambda$ với $\sum_i\lambda_ia_i=-F^T\lambda=c$ và $\lambda\ge0$, đúng bài toán trên. Vậy cận tốt nhất lấy từ các tập $H_\mu$ bằng giá trị tối ưu đối ngẫu $d^*$. Khi $c\ne0$, mỗi nhân tử khả thi đối ngẫu $\lambda$ có $F^T\lambda=-c\ne0$, nên $H_\lambda$ là một nửa không gian chứa tập khả thi.

**Kiểm tra lại.** Với $n=m=1$, bài toán $\min x$ với $-x\le-1$ có $F=-1$, $h=-1$, $p^*=1$. Với $\mu>0$, $H_\mu=\{x\mid-\mu x\le-\mu\}=\{x\ge1\}$, và cận dưới đúng của $x$ trên đó bằng $1$; công thức ở (a) cho $1=-s\cdot(-\mu)$, tức $s=\frac1\mu$, và giá trị $-s\,h^T\mu=\frac1\mu\cdot\mu=1$. Bài toán ở (c) là $\max\lambda$ với $-\lambda+1=0$, $\lambda\ge0$, có giá trị $1=p^*$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2; tính hàm đối ngẫu của quy hoạch tuyến tính tổng quát và viết điều kiện của miền hữu hiệu thành ràng buộc tường minh.

::: exercise Bài tập 03.21 (Đối ngẫu của quy hoạch tuyến tính tổng quát; Boyd và Vandenberghe, Bài 5.5, tr. 274)
Tìm hàm đối ngẫu của quy hoạch tuyến tính
$$
\begin{aligned}
&\underset{x\in\mathbb R^n}{\operatorname{minimize}}\ c^Tx\\
&\text{subject to}\\
&\ \ Fx\le h,\ \ Ax=b,
\end{aligned}
$$
trong đó $F\in\mathbb R^{m\times n}$, $h\in\mathbb R^m$, $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$. Lập bài toán đối ngẫu, và viết các ràng buộc đẳng thức ẩn trong điều kiện $(\lambda,\nu)\in\operatorname{dom}g$ thành ràng buộc tường minh.
:::

::: hint Gợi ý 1
Gom các số hạng của $L(x,\lambda,\nu)$ theo $x$: $L$ là một hàm affine của $x$.
:::

::: hint Gợi ý 2
Dùng câu hỏi ôn nhanh thứ ba của ghi chú: hàm affine $x\mapsto\bar c^Tx+\beta_0$ bị chặn dưới trên $\mathbb R^n$ khi và chỉ khi $\bar c=0$.
:::

::: solution Lời giải Bài tập 03.21
**Hàm đối ngẫu.** Theo (5.1),
$$
\begin{aligned}
&L(x,\lambda,\nu)=c^Tx\\
&\quad+\lambda^T(Fx-h)+\nu^T(Ax-b)\\
&\ =(c+F^T\lambda+A^T\nu)^Tx\\
&\quad-h^T\lambda-b^T\nu .
\end{aligned}
$$
Theo câu hỏi ôn nhanh thứ ba và Định nghĩa 03.5, $g(\lambda,\nu)=-h^T\lambda-b^T\nu$ nếu $c+F^T\lambda+A^T\nu=0$, và $g(\lambda,\nu)=-\infty$ trong trường hợp còn lại. Do đó $\operatorname{dom}g=\{(\lambda,\nu)\mid F^T\lambda+A^T\nu+c=0\}$.

**Bài toán đối ngẫu.** Bài toán (5.4) là cực đại $g(\lambda,\nu)$ với $\lambda\ge0$. Viết điều kiện $(\lambda,\nu)\in\operatorname{dom}g$ thành ràng buộc, ta được quy hoạch tuyến tính
$$
\begin{aligned}
&\underset{\lambda,\nu}{\operatorname{maximize}}\ -h^T\lambda-b^T\nu\\
&\text{subject to}\\
&\ \ F^T\lambda+A^T\nu+c=0,\\
&\ \ \lambda\ge0 .
\end{aligned}
$$
Hai bài toán có cùng giá trị tối ưu và cùng tập nghiệm, vì mọi $(\lambda,\nu)$ ngoài $\operatorname{dom}g$ cho $g=-\infty$. Khi không có đẳng thức, đây là bài toán đối ngẫu của Mệnh đề 03.11 với $a_i=-F_{i\cdot}^T$ và $\beta_i=-h_i$.

**Kiểm tra lại.** Bài toán pha trộn của Ví dụ 03.5 viết ở dạng $Fx\le h$ có các hàng của $F$ là $(-2,-1)$, $(-1,-2)$, $(-1,0)$, $(0,-1)$, $h=(-4,-5,0,0)$ và $c=(3,2)$. Với $\lambda=(\tfrac43,\tfrac13,0,0)$, $F^T\lambda=(-\tfrac83-\tfrac13,\,-\tfrac43-\tfrac23)=(-3,-2)$, nên $F^T\lambda+c=0$, và $-h^T\lambda=\tfrac{16}3+\tfrac53=7$, đúng $d^*=7$ của ví dụ đó.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2, 3, 4; đọc tập giá trị, tập trên và bài toán đối ngẫu của hai bài toán một biến, rồi kiểm tra điều kiện Slater và đối ngẫu mạnh.

::: exercise Bài tập 03.22 (Tập giá trị, tập trên và đối ngẫu của hai bài toán một biến; Boyd và Vandenberghe, Bài 5.22(a), (c), tr. 280)
Với mỗi bài toán sau trên miền $D=\mathbb R$, mô tả tập giá trị $G=\{(f_1(x),f_0(x))\mid x\in\mathbb R\}$ và tập trên $\mathcal A$ của Định nghĩa 03.18 (với $m=1$, $p=0$) bằng phương trình hoặc bất phương trình giữa $u$ và $t$, rồi vẽ phác hai tập. Lập bài toán đối ngẫu, giải bài toán gốc và bài toán đối ngẫu. Với mỗi bài toán, xác định:

- bài toán có lồi không;
- điều kiện Slater có thỏa không;
- đối ngẫu mạnh có đúng không.

Hai bài toán gồm:

- **(a)** Cực tiểu $x$ với ràng buộc $x^2\le1$.
- **(b)** Cực tiểu $x$ với ràng buộc $\lvert x\rvert\le0$.
:::

::: hint Gợi ý 1
Viết $f_1(x)=x^2-1$ ở (a) và $f_1(x)=\lvert x\rvert$ ở (b), rồi tham số hóa $G$ bằng $t=x$. Với mỗi $u$, đặt $p^*(u)=\inf\{x\mid f_1(x)\le u\}$; khi cận này đạt, $\mathcal A=\{(u,t)\mid t\ge p^*(u)\}$.
:::

::: hint Gợi ý 2
Khi tính $g(\lambda)=\inf_x\bigl(x+\lambda f_1(x)\bigr)$, xét riêng $\lambda=0$ và $\lambda>0$ ở (a); ở (b), xét riêng $x\ge0$ và $x<0$.
:::

::: solution Lời giải Bài tập 03.22
**Câu (a).** Ở đây $f_0(x)=x$ và $f_1(x)=x^2-1$.

- *Tập giá trị.* $G=\{(t^2-1,t)\mid t\in\mathbb R\}=\{(u,t)\mid u=t^2-1\}$, một parabol có trục là trục $u$ và đỉnh $(-1,0)$.
- *Tập trên.* Khi $u<-1$, không có $x$ nào thỏa $x^2-1\le u$. Khi $u\ge-1$, tập $\{x\mid x^2-1\le u\}$ là đoạn $[-\sqrt{1+u},\sqrt{1+u}]$. Do đó $\mathcal A=\{(u,t)\mid u\ge-1,\ t\ge-\sqrt{1+u}\}$, phần nằm bên phải và phía trên nhánh dưới $t=-\sqrt{1+u}$ của parabol.
- *Bài toán gốc.* Tập khả thi là $[-1,1]$, nên $x^*=-1$ và $p^*=-1$. Trên mặt phẳng giá trị, đó là điểm thấp nhất $(0,-1)$ của $\mathcal A$ trên trục $u=0$ (Mệnh đề 03.19, phần 1).
- *Hàm đối ngẫu.* $L(x,\lambda)=x+\lambda(x^2-1)$. Với $\lambda=0$, $L=x$ không bị chặn dưới, nên $g(0)=-\infty$. Với $\lambda>0$, $L=\lambda\bigl(x+\frac1{2\lambda}\bigr)^2-\frac1{4\lambda}-\lambda$, nên $g(\lambda)=-\lambda-\frac1{4\lambda}$. Bài toán đối ngẫu là $\max_{\lambda>0}\bigl(-\lambda-\frac1{4\lambda}\bigr)$.
- *Giải bài toán đối ngẫu.* $g'(\lambda)=-1+\frac1{4\lambda^2}$ dương trên $(0,\tfrac12)$ và âm trên $(\tfrac12,\infty)$, nên $\lambda^*=\tfrac12$ và $d^*=-\tfrac12-\tfrac12=-1$.
- *Tính lồi, điều kiện Slater, đối ngẫu mạnh.* $f_0$ affine và $f_1''=2>0$, nên bài toán lồi (Định lý 01.29). Điểm $\bar x=0$ cho $f_1(0)=-1<0$, nên điều kiện Slater thỏa, và $d^*=p^*=-1$, đúng với Định lý 03.15(a). Đường cận $t=-1-\tfrac12u$ có độ dốc $-\lambda^*$, nằm dưới nhánh lồi $t=-\sqrt{1+u}$ và tiếp xúc với nó tại $(0,-1)$, vì đạo hàm của $-\sqrt{1+u}$ tại $u=0$ bằng $-\tfrac12$ (Mệnh đề 03.19, phần 3).

**Câu (b).** Ở đây $f_0(x)=x$ và $f_1(x)=\lvert x\rvert$.

- *Tập giá trị.* $G=\{(\lvert t\rvert,t)\mid t\in\mathbb R\}$ gồm hai tia xuất phát từ gốc: $t=u$ và $t=-u$ với $u\ge0$.
- *Tập trên.* Khi $u<0$, không có $x$ nào thỏa $\lvert x\rvert\le u$. Khi $u\ge0$, tập $\{x\mid\lvert x\rvert\le u\}$ là đoạn $[-u,u]$. Do đó $\mathcal A=\{(u,t)\mid u\ge0,\ t\ge-u\}$.
- *Bài toán gốc.* Tập khả thi là $\{0\}$, nên $x^*=0$ và $p^*=0$.
- *Hàm đối ngẫu.* Với $x\ge0$, $x+\lambda\lvert x\rvert=(1+\lambda)x\ge0$. Với $x<0$, $x+\lambda\lvert x\rvert=(1-\lambda)x$, không âm khi $\lambda\ge1$ và dần tới $-\infty$ khi $x\to-\infty$ nếu $\lambda<1$. Vậy $g(\lambda)=0$ khi $\lambda\ge1$ và $g(\lambda)=-\infty$ khi $0\le\lambda<1$. Bài toán đối ngẫu là cực đại $0$ với $\lambda\ge1$: $d^*=0$, và mọi $\lambda\ge1$ là nghiệm đối ngẫu.
- *Tính lồi, điều kiện Slater, đối ngẫu mạnh.* $\lvert x\rvert=\max(x,-x)$ lồi (Định lý 01.30(c)), nên bài toán lồi. Không có $x$ nào với $\lvert x\rvert<0$, nên điều kiện Slater không thỏa; dạng yếu không áp dụng được vì $\lvert x\rvert$ không affine. Dù vậy $d^*=p^*=0$ và bài toán đối ngẫu đạt nghiệm. Như Bài tập 03.5, điều kiện Slater là điều kiện đủ, không là điều kiện cần. Trên mặt phẳng giá trị, mỗi đường $t=-\lambda u$ với $\lambda\ge1$ đi qua $(0,0)$ và để $\mathcal A$ ở phía trên: với $(u,t)\in\mathcal A$, $t+\lambda u\ge(\lambda-1)u\ge0$.

**Kiểm tra lại.** Ở (a), $L(x,\tfrac12)=x+\tfrac12(x^2-1)=\tfrac12(x+1)^2-1\ge-1$, bằng $-1$ tại điểm khả thi $x=-1$. Ở (b), với $\lambda=2$, $L=x+2\lvert x\rvert$ bằng $3x\ge0$ khi $x\ge0$ và bằng $-x>0$ khi $x<0$, nên $g(2)=0=p^*$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2, 3, 4, 6; đọc tập giá trị và đối ngẫu của ba bài toán một biến khi mục tiêu hoặc ràng buộc không lồi, và thấy kết luận thay đổi khi đổi miền.

::: exercise Bài tập 03.23 (Tập giá trị, tính lồi và miền của ba bài toán một biến; Boyd và Vandenberghe, Bài 5.22(d)–(f), tr. 280)
Với mỗi bài toán sau, mô tả tập giá trị $G=\{(f_1(x),f_0(x))\mid x\in D\}$ và tập trên $\mathcal A$ của Định nghĩa 03.18 bằng phương trình hoặc bất phương trình giữa $u$ và $t$, rồi vẽ phác hai tập. Lập bài toán đối ngẫu, giải bài toán gốc và bài toán đối ngẫu. Với mỗi bài toán, xác định:

- bài toán có lồi không;
- điều kiện Slater có thỏa không;
- đối ngẫu mạnh có đúng không.

Miền là $D=\mathbb R$ trừ khi nêu khác. Ba bài toán gồm:

- **(a)** Cực tiểu $x$ với ràng buộc $f_1(x)\le0$.
- **(b)** Cực tiểu $x^3$ với ràng buộc $-x+1\le0$.
- **(c)** Cực tiểu $x^3$ với ràng buộc $-x+1\le0$, trên miền $D=\mathbb R_+=\{x\in\mathbb R\mid x\ge0\}$.

Trong (a), $f_1$ là hàm tuyến tính từng khúc:

- $f_1(x)=-x+2$ khi $x\ge1$;
- $f_1(x)=x$ khi $-1\le x\le1$;
- $f_1(x)=-x-2$ khi $x\le-1$.
:::

::: hint Gợi ý 1
Với mỗi $u$, xác định tập $\{x\in D\mid f_1(x)\le u\}$ và cận dưới đúng $p^*(u)$ của $f_0$ trên tập đó (Định nghĩa 03.22); khi cận này đạt, $\mathcal A=\{(u,t)\mid t\ge p^*(u)\}$. Ở (b) và (c), tập $\{x\in D\mid1-x\le u\}$ là một nửa đường thẳng hoặc giao của nó với $D$.
:::

::: hint Gợi ý 2
Khi tính $g$ ở (a) và (b), xét dấu của hệ số của $x$, hoặc số hạng trội, khi $x\to+\infty$ và khi $x\to-\infty$. Ở (c), với $\lambda>0$, cực tiểu của $x^3-\lambda x$ trên $[0,\infty)$ đạt tại điểm dừng.
:::

::: solution Lời giải Bài tập 03.23
**Câu (a).** Ở đây $f_0(x)=x$.

- *Tập khả thi.* Trên $x\ge1$, $f_1\le0$ khi $x\ge2$; trên $[-1,1]$, khi $x\le0$; trên $x\le-1$, khi $x\ge-2$. Tập khả thi là $[-2,0]\cup[2,\infty)$, nên $x^*=-2$ và $p^*=-2$.
- *Tính lồi.* $f_1(0)=0$, $f_1(2)=0$ nhưng $f_1(1)=1>\tfrac12f_1(0)+\tfrac12f_1(2)$, nên $f_1$ không lồi (Định nghĩa 01.21); tập khả thi cũng không lồi. Bài toán không lồi.
- *Tập giá trị.* Với $t=x$, $G$ gồm ba phần: tia $u=2-t$, $t\ge1$; đoạn $u=t$, $-1\le t\le1$; tia $u=-t-2$, $t\le-1$.
- *Tập trên.* Khi $u\ge-1$, tập $\{x\mid f_1(x)\le u\}$ chứa đoạn $[-2-u,-1]$ của nhánh trái và không chứa điểm nào nhỏ hơn $-2-u$, nên $p^*(u)=-2-u$. Khi $u<-1$, chỉ nhánh phải có điểm thỏa, với $x\ge2-u$, nên $p^*(u)=2-u$. Các cận này đạt, nên $\mathcal A=\{(u,t)\mid t\ge p^*(u)\}$. Tập này không lồi: $(-1,-1)$ và $(-2,4)$ thuộc $\mathcal A$, còn trung điểm $(-1{,}5;\,1{,}5)$ không thuộc, vì $p^*(-1{,}5)=3{,}5>1{,}5$.
- *Hàm đối ngẫu.* Với $x\ge1$, $x+\lambda f_1(x)=(1-\lambda)x+2\lambda$; với $x\le-1$, $x+\lambda f_1(x)=(1-\lambda)x-2\lambda$. Nếu $\lambda<1$, biểu thức thứ hai dần tới $-\infty$ khi $x\to-\infty$; nếu $\lambda>1$, biểu thức thứ nhất dần tới $-\infty$ khi $x\to+\infty$. Với $\lambda=1$, $x+f_1(x)$ bằng $2$ trên $x\ge1$, bằng $2x$ trên $[-1,1]$ và bằng $-2$ trên $x\le-1$, nên $g(1)=-2$. Vậy $g(\lambda)=-\infty$ với $\lambda\ne1$, bài toán đối ngẫu có nghiệm duy nhất $\lambda^*=1$, và $d^*=-2$.
- *Điều kiện Slater, đối ngẫu mạnh.* Điểm $x=-1{,}5$ cho $f_1(-1{,}5)=-0{,}5<0$, nhưng Định nghĩa 03.13 chỉ đặt điều kiện Slater cho bài toán ở dạng phổ biến, còn $f_1$ không lồi; do đó Định lý 03.15 không áp dụng được. Phép tính trực tiếp cho $d^*=p^*=-2$. Trên mặt phẳng giá trị, đường $t=-2-u$ có độ dốc $-\lambda^*$, đi qua $(0,-2)$ và để $\mathcal A$ ở phía trên, vì $2-u>-2-u$; đây là đường cận qua $(0,p^*)$ của Mệnh đề 03.20, khẳng định 2, với $m=1$, $p=0$. Như Nhận xét 03.17, đối ngẫu mạnh không đòi tính lồi.

**Câu (b).** Ở đây $f_0(x)=x^3$ và $f_1(x)=1-x$.

- *Tập giá trị, tập trên.* Với $u=1-x$, $G=\{(u,t)\mid t=(1-u)^3\}$. Với mỗi $u$, các điểm thỏa $1-x\le u$ là $x\ge1-u$, và $x^3$ tăng, nên $p^*(u)=(1-u)^3$ và $\mathcal A=\{(u,t)\mid t\ge(1-u)^3\}$.
- *Bài toán gốc.* Tập khả thi là $[1,\infty)$, nên $x^*=1$ và $p^*=1$.
- *Tính lồi.* $(x^3)''=6x<0$ khi $x<0$, nên $x^3$ không lồi trên $\mathbb R$ (Định lý 01.29) và bài toán không lồi.
- *Hàm đối ngẫu.* Với mọi $\lambda$, $x^3+\lambda(1-x)\to-\infty$ khi $x\to-\infty$, vì số hạng bậc ba trội. Vậy $g\equiv-\infty$, không có cặp khả thi đối ngẫu, và $d^*=-\infty$.
- *Điều kiện Slater, đối ngẫu mạnh.* Điểm $x=2$ cho $1-2=-1<0$, nhưng Định nghĩa 03.13 chỉ đặt điều kiện Slater cho bài toán ở dạng phổ biến, còn $x^3$ không lồi; do đó Định lý 03.15 không áp dụng được. Đối ngẫu mạnh không đúng: $d^*=-\infty<1=p^*$. Trên mặt phẳng giá trị, với mọi $\lambda$, $t+\lambda u=(1-u)^3+\lambda u\to-\infty$ khi $u\to+\infty$ dọc biên dưới của $\mathcal A$, nên không đường không thẳng đứng nào để $\mathcal A$ ở phía trên.

**Câu (c).** Cùng $f_0$, $f_1$, với $D=[0,\infty)$.

- *Tập giá trị, tập trên.* $G=\{(1-x,x^3)\mid x\ge0\}=\{(u,t)\mid u\le1,\ t=(1-u)^3\}$. Với mỗi $u$, các điểm của $D$ thỏa $1-x\le u$ là $x\ge\max(0,1-u)$, nên $p^*(u)=\bigl(\max(0,1-u)\bigr)^3$ và $\mathcal A=\{(u,t)\mid t\ge p^*(u)\}$.
- *Bài toán gốc.* Vẫn $x^*=1$, $p^*=1$.
- *Tính lồi.* $(x^3)''=6x>0$ trên tập mở $(0,\infty)$, nên $x^3$ lồi trên $(0,\infty)$ (Định lý 01.29); bất đẳng thức của Định nghĩa 01.21 mở rộng tới điểm $x=0$ bằng cách lấy giới hạn, vì $x^3$ liên tục. Ràng buộc affine và $D$ lồi, nên bài toán có dạng của Định nghĩa 02.1.
- *Hàm đối ngẫu.* Với $\lambda>0$, hàm $x^3-\lambda x+\lambda$ trên $[0,\infty)$ có đạo hàm $3x^2-\lambda$, âm trên $[0,\sqrt{\lambda/3})$ và dương sau đó, nên đạt cực tiểu tại $x=\sqrt{\lambda/3}$ với giá trị
$$
g(\lambda)=\lambda-\frac{2\lambda}3\sqrt{\frac\lambda3};
$$
công thức cũng đúng với $\lambda=0$, vì $\inf_{x\ge0}x^3=0$.
- *Giải bài toán đối ngẫu.* $g'(\lambda)=1-\sqrt{\lambda/3}$ dương trên $(0,3)$ và âm trên $(3,\infty)$, nên $\lambda^*=3$ và $d^*=3-2\cdot1=1=p^*$.
- *Điều kiện Slater, đối ngẫu mạnh.* Điểm $x=2$ thuộc phần trong $(0,\infty)$ của $D$ và cho $1-2=-1<0$, tức điều kiện Slater thỏa theo nghĩa của Boyd và Vandenberghe (2004), §5.2.3, cho miền $D\ne\mathbb R^n$. Định lý 03.15 giả thiết $D=\mathbb R^n$, nên không áp dụng được; phép tính trực tiếp cho $d^*=p^*=1$, đạt tại $\lambda^*=3$. Trên mặt phẳng giá trị, biên dưới $t=(1-u)^3$ có đạo hàm $-3$ tại $u=0$, nên đường $t=1-3u$ tiếp xúc với $\mathcal A$ tại $(0,1)$. So với (b), chỉ miền thay đổi: điều kiện $x\ge0$ đặt vào $D$ không nhận nhân tử và làm $L(\cdot,\lambda)$ bị chặn dưới.

**Kiểm tra lại.** Ở (a), $L(x,1)=x+f_1(x)\ge-2$ với mọi $x$, bằng $-2$ tại điểm khả thi $x=-2$. Ở (c), $L(x,3)=x^3-3x+3$ có $L'(1)=0$ và $L(1)=1$, còn $L(0)=3\ge1$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 4, 6; tính hàm giá trị của một bài toán lồi có khoảng đối ngẫu dương và chỉ ra bất đẳng thức độ nhạy toàn cục mất khi không có đối ngẫu mạnh.

::: exercise Bài tập 03.24 (Bất đẳng thức độ nhạy toàn cục khi có khoảng đối ngẫu; Boyd và Vandenberghe, Bài 5.21(d), tr. 280)
Xét bài toán của Ví dụ 03.8: miền $D=\{(x,y)\in\mathbb R^2\mid y>0\}$, cực tiểu $e^{-x}$ với ràng buộc $\frac{x^2}y\le0$. Theo ví dụ đó, $p^*=1$, $g(\lambda)=0$ với mọi $\lambda\ge0$ và $d^*=0$.

- **(a)** Tính giá trị tối ưu $p^*(u)$ của bài toán nhiễu: cực tiểu $e^{-x}$ trên $D$ với ràng buộc $\frac{x^2}y\le u$, như một hàm của $u\in\mathbb R$.
- **(b)** Chứng minh với mọi nghiệm đối ngẫu $\lambda^*$, bất đẳng thức độ nhạy toàn cục $p^*(u)\ge p^*-\lambda^*u$ sai với một $u$ nào đó, và xác định giả thiết nào của Mệnh đề 03.23 bị vi phạm.
:::

::: hint Gợi ý 1
Ở (a), xét riêng $u<0$, $u=0$ và $u>0$. Với $u>0$, tìm một họ điểm khả thi của bài toán nhiễu có $x\to+\infty$.
:::

::: hint Gợi ý 2
Ở (b), xác định tập nghiệm đối ngẫu từ $g$, rồi so sánh $p^*(u)$ với $1-\lambda^*u$ khi $u>0$ nhỏ.
:::

::: solution Lời giải Bài tập 03.24
**Câu (a).** Trên $D$, $\frac{x^2}y\ge0$.

- Khi $u<0$, không điểm nào của $D$ thỏa ràng buộc, nên $p^*(u)=+\infty$.
- Khi $u=0$, ràng buộc là ràng buộc của Ví dụ 03.8, nên $p^*(0)=p^*=1$.
- Khi $u>0$, điểm $(s,\frac{s^2}u)$ với $s>0$ thuộc $D$ và có $\frac{x^2}y=u$, nên khả thi, với $e^{-s}\to0$ khi $s\to\infty$. Vì $e^{-x}>0$, ta có $p^*(u)=0$, và giá trị này không đạt.

**Câu (b).** Vì $g(\lambda)=0=d^*$ với mọi $\lambda\ge0$, mọi $\lambda^*\ge0$ là nghiệm đối ngẫu (Định nghĩa 03.9).

- Nếu $\lambda^*=0$, vế phải bằng $1$, lớn hơn $p^*(u)=0$ với mọi $u>0$.
- Nếu $\lambda^*>0$, với $0<u<\frac1{\lambda^*}$, vế phải $1-\lambda^*u>0=p^*(u)$.

Giả thiết bị vi phạm là $d^*=p^*$: ở đây $d^*=0<1=p^*$. Các giả thiết còn lại của Mệnh đề 03.23 đều thỏa, vì $p^*=1$ hữu hạn và $\lambda^*$ là một nghiệm đối ngẫu.

**Kiểm tra lại.** Hai bất đẳng thức ở Bước 2 của chứng minh Mệnh đề 03.23 không dùng giả thiết $d^*=p^*$, nên vẫn cho $p^*(u)\ge g(\lambda^*)-\lambda^*u=-\lambda^*u$. Bất đẳng thức này đúng với mọi $u$: vế trái bằng $+\infty$ khi $u<0$, bằng $1$ khi $u=0$ và bằng $0\ge-\lambda^*u$ khi $u>0$. Bất đẳng thức của (b) thay $g(\lambda^*)=0$ bằng $p^*=1$, và khoảng $p^*-d^*=1$ là phần bị mất.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 4; chứng minh hàm giá trị của bài toán lồi là hàm lồi.

::: exercise Bài tập 03.25 (Tính lồi của hàm giá trị; Boyd và Vandenberghe, Bài 5.32, tr. 283)
Cho các hàm lồi $f_0,f_1,\ldots,f_m:\mathbb R^n\to\mathbb R$, ma trận $A\in\mathbb R^{p\times n}$ và vector $b\in\mathbb R^p$. Xét hàm giá trị của Định nghĩa 03.22 với $D=\mathbb R^n$:
$$
\begin{aligned}
&p^*(u,v)=\inf\{f_0(x)\mid\\
&\quad f_i(x)\le u_i,\ \forall i,\\
&\quad Ax-b=v\},
\end{aligned}
$$
với $p^*(u,v)=+\infty$ khi tập bên phải rỗng. Chứng minh $p^*$ lồi theo nghĩa sau: với mọi $(u',v')$, $(u'',v'')$ có $p^*(u',v')<+\infty$, $p^*(u'',v'')<+\infty$ và mọi $\vartheta\in(0,1)$,
$$
\begin{aligned}
&p^*(u_\vartheta,v_\vartheta)\\
&\quad\le\vartheta p^*(u',v')\\
&\qquad+(1-\vartheta)p^*(u'',v''),
\end{aligned}
$$
trong đó $(u_\vartheta,v_\vartheta)=\vartheta(u',v')+(1-\vartheta)(u'',v'')$, với quy ước vế phải bằng $-\infty$ khi một trong hai giá trị bằng $-\infty$.
:::

::: hint Gợi ý 1
Dùng Mệnh đề 03.19 phần 4 và đẳng thức $p^*(u,v)=\inf\{t\mid(u,v,t)\in\mathcal A\}$ nêu sau Định nghĩa 03.22.
:::

::: hint Gợi ý 2
Với $t'>p^*(u',v')$ và $t''>p^*(u'',v'')$, chứng minh $(u',v',t')$ và $(u'',v'',t'')$ thuộc $\mathcal A$, rồi lấy cận dưới đúng theo $t'$, $t''$.
:::

::: solution Lời giải Bài tập 03.25
**Điểm của tập trên.** Theo Định nghĩa 03.22, $p^*(u,v)$ là cận dưới đúng của $f_0$ trên tập khả thi của (7.1). Nếu $t>p^*(u,v)$ thì có $x$ khả thi cho (7.1) với $f_0(x)<t$ (Định nghĩa 01.9), tức $f(x)\le u$, $Ax-b=v$, $f_0(x)\le t$, nên $(u,v,t)\in\mathcal A$ theo Định nghĩa 03.18.

**Tổ hợp lồi thuộc $\mathcal A$.** Lấy $t'>p^*(u',v')$ và $t''>p^*(u'',v'')$; hai số này tồn tại vì hai giá trị nhỏ hơn $+\infty$. Khi đó $(u',v',t')$ và $(u'',v'',t'')$ thuộc $\mathcal A$. Theo Mệnh đề 03.19 phần 4, $\mathcal A$ lồi, nên
$$
\bigl(u_\vartheta,v_\vartheta,\vartheta t'+(1-\vartheta)t''\bigr)\in\mathcal A .
$$
Theo đẳng thức $p^*(u,v)=\inf\{t\mid(u,v,t)\in\mathcal A\}$,
$$
p^*(u_\vartheta,v_\vartheta)\le\vartheta t'+(1-\vartheta)t'' .
$$

**Bất đẳng thức lồi cho $p^*$.** Bất đẳng thức đúng với mọi $t'>p^*(u',v')$ và mọi $t''>p^*(u'',v'')$. Khi cả hai giá trị hữu hạn, cho $t'\to p^*(u',v')$ và $t''\to p^*(u'',v'')$ ta được bất đẳng thức cần chứng minh. Khi chẳng hạn $p^*(u',v')=-\infty$, $t'$ nhỏ tùy ý và $\vartheta>0$, nên vế phải nhỏ tùy ý và $p^*(u_\vartheta,v_\vartheta)=-\infty$, đúng với quy ước.

**Kiểm tra lại.** Với bài toán của Bài tập 03.6, $\min x^2$ với $1-x\le0$, hàm giá trị là $p^*(u)=(1-u)^2$ khi $u\le1$ và $p^*(u)=0$ khi $u>1$. Với $u'=0$, $u''=2$, $\vartheta=\tfrac12$: $p^*(1)=0\le\tfrac12\cdot1+\tfrac12\cdot0$. Với $u'=-1$, $u''=1$, $\vartheta=\tfrac12$: $p^*(0)=1\le\tfrac12\cdot4+\tfrac12\cdot0=2$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 1, 2, 6; đọc từ nghiệm của bài toán có phạt bậc hai một điểm khả thi đối ngẫu và một cận dưới cho bài toán có ràng buộc đẳng thức.

::: exercise Bài tập 03.26 (Phạt bậc hai cho ràng buộc đẳng thức sinh điểm khả thi đối ngẫu; Boyd và Vandenberghe, Bài 5.14, tr. 277)
Xét bài toán
$$
\min_{x\in\mathbb R^n}\ f_0(x)\quad\text{với}\quad Ax=b,
$$
trong đó $f_0:\mathbb R^n\to\mathbb R$ lồi và khả vi, $A\in\mathbb R^{p\times n}$ có hạng $p$. *Phương pháp phạt bậc hai* (quadratic penalty method) lập hàm phụ
$$
\Phi(x)=f_0(x)+\rho\lVert Ax-b\rVert_2^2,
$$
với hệ số phạt $\rho>0$, và dùng một điểm cực tiểu của $\Phi$ làm nghiệm xấp xỉ của bài toán. Giả sử $\tilde x$ là một điểm cực tiểu của $\Phi$ trên $\mathbb R^n$. Chỉ ra cách tìm từ $\tilde x$ một điểm khả thi đối ngẫu của bài toán, và tìm cận dưới tương ứng cho giá trị tối ưu.
:::

::: hint Gợi ý 1
Viết điều kiện cần bậc nhất $\nabla\Phi(\tilde x)=0$, dùng Mệnh đề 00.45 cho gradient của số hạng phạt.
:::

::: hint Gợi ý 2
So sánh phương trình đó với $\nabla_xL(\tilde x,\nu)=0$ cho $L(x,\nu)=f_0(x)+\nu^T(Ax-b)$, và dùng tính lồi của $L(\cdot,\nu)$.
:::

::: solution Lời giải Bài tập 03.26
**Điều kiện bậc nhất.** Theo Mệnh đề 00.45, gradient của $\lVert Ax-b\rVert_2^2=2\cdot\tfrac12\lVert Ax-b\rVert_2^2$ là $2A^T(Ax-b)$. Vì $\tilde x$ cực tiểu hóa hàm khả vi $\Phi$ trên $\mathbb R^n$, Định lý 00.42 cho
$$
\nabla f_0(\tilde x)+2\rho A^T(A\tilde x-b)=0 .
$$

**Điểm khả thi đối ngẫu.** Đặt $\tilde\nu=2\rho(A\tilde x-b)$. Phương trình trên là $\nabla_xL(\tilde x,\tilde\nu)=\nabla f_0(\tilde x)+A^T\tilde\nu=0$. Hàm $L(\cdot,\tilde\nu)$ là tổng của hàm lồi $f_0$ và một hàm affine, nên lồi (Định lý 01.30(a)) và khả vi trên $\mathbb R^n$; theo Hệ quả 01.26, $\tilde x$ là điểm cực tiểu toàn cục của nó. Do đó
$$
\begin{aligned}
g(\tilde\nu)&=L(\tilde x,\tilde\nu)\\
&=f_0(\tilde x)+2\rho\lVert A\tilde x-b\rVert_2^2\\
&>-\infty,
\end{aligned}
$$
và $\tilde\nu$ khả thi đối ngẫu, vì bài toán không có ràng buộc bất đẳng thức.

**Cận dưới.** Theo Định lý 03.8, mọi $x$ thỏa $Ax=b$ có $f_0(x)\ge f_0(\tilde x)+2\rho\lVert A\tilde x-b\rVert_2^2$, nên $p^*\ge f_0(\tilde x)+2\rho\lVert A\tilde x-b\rVert_2^2$.

**Kiểm tra lại.** Với $n=p=1$, $f_0(x)=x^2$, $A=1$, $b=1$: $p^*=1$. Hàm $\Phi(x)=x^2+\rho(x-1)^2$ cực tiểu tại $\tilde x=\frac\rho{1+\rho}$, nên $\tilde\nu=2\rho(\tilde x-1)=-\frac{2\rho}{1+\rho}$, và cận là
$$
\begin{aligned}
&\frac{\rho^2}{(1+\rho)^2}+\frac{2\rho}{(1+\rho)^2}\\
&\quad=1-\frac1{(1+\rho)^2}\le1 .
\end{aligned}
$$
Tính trực tiếp, $g(\nu)=\inf_x\bigl(x^2+\nu(x-1)\bigr)=-\frac{\nu^2}4-\nu$, và $g(\tilde\nu)=-\frac{\rho^2}{(1+\rho)^2}+\frac{2\rho}{1+\rho}$, cùng giá trị.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 1, 2, 6; chứng minh tính lồi của một hàm phạt tổng quát và đọc từ điểm cực tiểu của nó một nhân tử khả thi đối ngẫu.

::: exercise Bài tập 03.27 (Hàm phạt lồi tăng sinh điểm khả thi đối ngẫu; Boyd và Vandenberghe, Bài 5.15, tr. 277)
Xét bài toán
$$
\begin{aligned}
&\min_{x\in\mathbb R^n}\ f_0(x)\\
&\text{với}\ \ f_i(x)\le0,\ i=1,\ldots,m,
\end{aligned}
$$
trong đó các hàm $f_0,f_1,\ldots,f_m:\mathbb R^n\to\mathbb R$ khả vi và lồi. Cho các hàm $\psi_1,\ldots,\psi_m:\mathbb R\to\mathbb R$ tăng, khả vi và lồi. Chứng minh hàm
$$
\Phi(x)=f_0(x)+\sum_{i=1}^m\psi_i\bigl(f_i(x)\bigr)
$$
lồi. Giả sử $\tilde x$ cực tiểu hóa $\Phi$ trên $\mathbb R^n$. Chỉ ra cách tìm từ $\tilde x$ một điểm khả thi đối ngẫu của bài toán, và tìm cận dưới tương ứng cho giá trị tối ưu.
:::

::: hint Gợi ý 1
Với hai điểm $x$, $x'$ và $\vartheta\in[0,1]$, dùng tính lồi của $f_i$, rồi tính tăng và tính lồi của $\psi_i$.
:::

::: hint Gợi ý 2
Viết $\nabla\Phi(\tilde x)=0$ bằng quy tắc dây chuyền và so sánh với điều kiện dừng (8.1).
:::

::: solution Lời giải Bài tập 03.27
**Tính lồi.** Lấy $x,x'\in\mathbb R^n$, $\vartheta\in[0,1]$, $x_\vartheta=\vartheta x+(1-\vartheta)x'$ và $\zeta_\vartheta=\vartheta f_i(x)+(1-\vartheta)f_i(x')$. Tính lồi của $f_i$ cho $f_i(x_\vartheta)\le\zeta_\vartheta$. Bất đẳng thức thứ nhất dưới đây dùng tính tăng của $\psi_i$, bất đẳng thức thứ hai dùng tính lồi của $\psi_i$:
$$
\begin{aligned}
&\psi_i\bigl(f_i(x_\vartheta)\bigr)\le\psi_i(\zeta_\vartheta)\\
&\quad\le\vartheta\psi_i\bigl(f_i(x)\bigr)\\
&\qquad+(1-\vartheta)\psi_i\bigl(f_i(x')\bigr).
\end{aligned}
$$
Vậy $\psi_i\circ f_i$ lồi (Định nghĩa 01.21), và $\Phi$ lồi theo Định lý 01.30(a).

**Nhân tử.** Theo Định lý 00.35, kết luận 2, $\nabla(\psi_i\circ f_i)(x)=\psi_i'\bigl(f_i(x)\bigr)\nabla f_i(x)$. Vì $\tilde x$ cực tiểu hóa hàm khả vi $\Phi$ trên $\mathbb R^n$, Định lý 00.42 cho
$$
\nabla f_0(\tilde x)+\sum_{i=1}^m\tilde\lambda_i\nabla f_i(\tilde x)=0,
$$
với $\tilde\lambda_i=\psi_i'\bigl(f_i(\tilde x)\bigr)$. Mỗi $\psi_i$ tăng, nên các tỷ số $\frac{\psi_i(z+s)-\psi_i(z)}s$ với $s>0$ không âm, và giới hạn $\psi_i'(z)\ge0$. Vậy $\tilde\lambda\ge0$.

**Điểm khả thi đối ngẫu và cận dưới.** Với $\tilde\lambda\ge0$, $L(\cdot,\tilde\lambda)=f_0+\sum_i\tilde\lambda_if_i$ lồi (Định lý 01.30(a)) và có gradient bằng $0$ tại $\tilde x$, nên $\tilde x$ là điểm cực tiểu toàn cục của nó (Hệ quả 01.26). Do đó
$$
\begin{aligned}
g(\tilde\lambda)&=f_0(\tilde x)+\sum_{i=1}^m\tilde\lambda_if_i(\tilde x)\\
&=f_0(\tilde x)\\
&\quad+\sum_{i=1}^m\psi_i'\bigl(f_i(\tilde x)\bigr)f_i(\tilde x)
\end{aligned}
$$
hữu hạn, nên $\tilde\lambda$ khả thi đối ngẫu, và theo Định lý 03.8, $p^*\ge g(\tilde\lambda)$.

**Kiểm tra lại.** Với $n=m=1$, $f_0(x)=x^2$, $f_1(x)=1-x$ và $\psi_1(z)=e^z$, bài toán có $p^*=1$ tại $x=1$. Điểm cực tiểu của $\Phi(x)=x^2+e^{1-x}$ thỏa $2\tilde x=e^{1-\tilde x}$, cho $\tilde x\approx0{,}6851$, và $\tilde\lambda=e^{1-\tilde x}=2\tilde x$. Cận dưới là $\tilde x^2+2\tilde x(1-\tilde x)=1-(1-\tilde x)^2\approx0{,}9008\le1$. Theo Bài tập 03.6, $g(\lambda)=\lambda-\frac{\lambda^2}4$, và $g(2\tilde x)=2\tilde x-\tilde x^2$, cùng giá trị.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2, 3, 5, 6; giải hệ KKT và bài toán đối ngẫu của một quy hoạch bậc hai có ràng buộc bậc hai, kiểm tra điều kiện Slater, và xác định sự đạt nghiệm của bài toán đối ngẫu.

::: exercise Bài tập 03.28 (Bài toán bậc hai trên giao hai hình tròn; Boyd và Vandenberghe, Bài 5.26, tr. 282)
Xét quy hoạch bậc hai có ràng buộc bậc hai theo biến $x\in\mathbb R^2$:
$$
\begin{aligned}
&\underset{x\in\mathbb R^2}{\operatorname{minimize}}\ x_1^2+x_2^2\\
&\text{subject to}\\
&\ \ (x_1-1)^2+(x_2-1)^2\le1,\\
&\ \ (x_1-1)^2+(x_2+1)^2\le1 .
\end{aligned}
$$

- **(a)** Vẽ phác tập khả thi và các tập mức của mục tiêu. Tìm nghiệm $x^*$ và giá trị tối ưu $p^*$.
- **(b)** Viết hệ KKT. Xác định có các nhân tử $\lambda_1^*$, $\lambda_2^*$ chứng nhận $x^*$ là nghiệm hay không.
- **(c)** Lập và giải bài toán đối ngẫu Lagrange. Xác định đối ngẫu mạnh có đúng không.
:::

::: hint Gợi ý 1
Ở (a), tính khoảng cách giữa tâm của hai hình tròn, hoặc cộng hai ràng buộc.
:::

::: hint Gợi ý 2
Ở (c), khai triển $L$, cực tiểu riêng theo $x_1$ và $x_2$, rồi biểu diễn $g$ qua $\lambda_1+\lambda_2$ và $\lambda_1-\lambda_2$.
:::

::: solution Lời giải Bài tập 03.28
**Câu (a).** Hai ràng buộc là hai hình tròn đóng bán kính $1$, tâm $(1,1)$ và $(1,-1)$; khoảng cách giữa hai tâm bằng $2$, tổng hai bán kính. Cộng hai ràng buộc ở dạng $f_i(x)\le0$:
$$
\begin{aligned}
&f_1(x)+f_2(x)\\
&\quad=2(x_1-1)^2+2x_2^2\le0,
\end{aligned}
$$
nên mọi điểm khả thi là $(1,0)$, và điểm này thỏa cả hai ràng buộc với dấu bằng. Các tập mức của mục tiêu là các đường tròn tâm gốc tọa độ. Vậy $x^*=(1,0)$ và $p^*=1$.

**Câu (b).** Với $f_1(x)=(x_1-1)^2+(x_2-1)^2-1$ và $f_2(x)=(x_1-1)^2+(x_2+1)^2-1$, hệ KKT gồm $f_1(x)\le0$, $f_2(x)\le0$, $\lambda_1,\lambda_2\ge0$, $\lambda_1f_1(x)=\lambda_2f_2(x)=0$ và hai phương trình dừng, đã chia cho $2$:
$$
\begin{aligned}
&x_1+(\lambda_1+\lambda_2)(x_1-1)=0,\\
&x_2+\lambda_1(x_2-1)\\
&\quad+\lambda_2(x_2+1)=0 .
\end{aligned}
$$
Tại $x^*=(1,0)$, phương trình thứ nhất thành $1=0$, vô nghiệm. Vậy không có nhân tử nào cùng $x^*$ thỏa hệ KKT. Điều kiện Slater không thỏa: một điểm có $f_1<0$ và $f_2<0$ sẽ cho $2(x_1-1)^2+2x_2^2<0$. Do đó Hệ quả 03.31 không áp dụng được.

**Câu (c).** Đặt $s=\lambda_1+\lambda_2$ và $\delta=\lambda_1-\lambda_2$. Khai triển hai ràng buộc:
$$
\begin{aligned}
L(x,\lambda)={}&(1+s)(x_1^2+x_2^2)\\
&-2sx_1-2\delta x_2+s .
\end{aligned}
$$
Với $\lambda\ge0$, $1+s\ge1>0$, nên $L$ đạt cực tiểu tại $x_1=\frac s{1+s}$, $x_2=\frac\delta{1+s}$, và
$$
g(\lambda)=s-\frac{s^2+\delta^2}{1+s}=\frac{s-\delta^2}{1+s}.
$$
Bài toán đối ngẫu là cực đại $\frac{\lambda_1+\lambda_2-(\lambda_1-\lambda_2)^2}{1+\lambda_1+\lambda_2}$ với $\lambda_1,\lambda_2\ge0$. Với mọi $\lambda\ge0$, $g(\lambda)\le\frac s{1+s}<1$. Với $\lambda_1=\lambda_2=k$, $g=\frac{2k}{1+2k}\to1$ khi $k\to\infty$. Vậy $d^*=1=p^*$: đối ngẫu mạnh đúng, nhưng bài toán đối ngẫu không đạt nghiệm. Vì bài toán đối ngẫu không đạt nghiệm, Định lý 03.30 không áp dụng được; điều này khớp với kết quả ở (b): không có nhân tử KKT tại $x^*$. Nhận xét 03.33 có hiện tượng cùng loại cho Ví dụ 03.10. Ở Bài tập 03.5, điều kiện Slater cũng không thỏa, nhưng bài toán đối ngẫu đạt nghiệm.

**Kiểm tra lại.** Tại $\lambda=(1,1)$: $s=2$, $\delta=0$, công thức cho $g=\frac23$. Tính trực tiếp, $L=3(x_1^2+x_2^2)-4x_1+2$ đạt cực tiểu tại $(\tfrac23,0)$ với giá trị $\tfrac43-\tfrac83+2=\tfrac23$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 5; lập và giải hệ KKT của bài toán bình phương nhỏ nhất có ràng buộc đẳng thức, và chứng nhận nghiệm bằng tính đủ của hệ.

::: exercise Bài tập 03.29 (Bình phương nhỏ nhất có ràng buộc đẳng thức; Boyd và Vandenberghe, Bài 5.27, tr. 282)
Xét bài toán
$$
\min_{w\in\mathbb R^d}\ \lVert Xw-y\rVert_2^2\quad\text{với}\quad Aw=b,
$$
trong đó $X\in\mathbb R^{N\times d}$ có hạng $d$, $y\in\mathbb R^N$, $A\in\mathbb R^{p\times d}$ có hạng $p$ và $b\in\mathbb R^p$. Viết hệ KKT, và tìm biểu thức của nghiệm gốc $w^*$ và nghiệm đối ngẫu $\nu^*$.
:::

::: hint Gợi ý 1
Bài toán không có ràng buộc bất đẳng thức, nên hệ KKT chỉ gồm điều kiện dừng và $Aw=b$. Gradient của $J(w)=\lVert Xw-y\rVert_2^2$ là $2X^T(Xw-y)$.
:::

::: hint Gợi ý 2
Giải phương trình dừng theo $w$ bằng $(X^TX)^{-1}$, thay vào $Aw=b$, rồi chứng minh ma trận $A(X^TX)^{-1}A^T$ xác định dương.
:::

::: solution Lời giải Bài tập 03.29
**Hệ KKT.** Với $L(w,\nu)=\lVert Xw-y\rVert_2^2+\nu^T(Aw-b)$, hệ KKT của Định nghĩa 03.29 là
$$
\begin{aligned}
2X^T(Xw-y)+A^T\nu&=0,\\
Aw&=b .
\end{aligned}
$$

**Hai ma trận khả nghịch.** Vì $X$ có hạng $d$, $X^TX\succ0$ (Mệnh đề 00.20), nên khả nghịch (Hệ quả 00.19); đặt $M=(X^TX)^{-1}$. Với $q\ne0$, $r=Mq\ne0$ và $q^TMq=r^T(X^TX)r>0$, nên $M\succ0$. Các hàng của $A$ độc lập tuyến tính, nên $A^Tq\ne0$ khi $q\ne0$ (Định nghĩa 00.6), và $q^TAMA^Tq=(A^Tq)^TM(A^Tq)>0$. Vậy $AMA^T\succ0$ và khả nghịch.

**Nghiệm của hệ.** Phương trình dừng cho $w=M\bigl(X^Ty-\tfrac12A^T\nu\bigr)$. Thay vào $Aw=b$: $AMX^Ty-\tfrac12AMA^T\nu=b$, nên
$$
\begin{aligned}
\nu^*&=-2(AMA^T)^{-1}\\
&\quad\times(b-AMX^Ty),
\end{aligned}
$$
và
$$
\begin{aligned}
w^*={}&MX^Ty+MA^T(AMA^T)^{-1}\\
&\times(b-AMX^Ty).
\end{aligned}
$$
Hệ KKT có đúng một nghiệm, vì phương trình dừng xác định duy nhất $w$ theo $\nu$ và $AMA^T$ khả nghịch.

**Chứng nhận.** Hessian của $J$ là $2X^TX\succ0$, nên $J$ lồi chặt (Định lý 01.29), và ràng buộc affine. Theo Định lý 03.32, $w^*$ là nghiệm gốc, $\nu^*$ là nghiệm đối ngẫu và $p^*=d^*$; theo Định lý 01.34, $w^*$ là nghiệm duy nhất.

**Kiểm tra lại.** Với $d=2$, $X=I_2$, $y=(1,3)$, $A=\begin{pmatrix}1&1\end{pmatrix}$, $b=2$: $M=I_2$, $AMA^T=2$, $AMX^Ty=4$, nên $\nu^*=-2\cdot\tfrac12(2-4)=2$ và $w^*=(1,3)+\tfrac12(2-4)(1,1)=(0,2)$. Điểm này thỏa $w_1+w_2=2$ và $2\bigl((0,2)-(1,3)\bigr)+(2,2)=0$; nó là hình chiếu của $y$ lên đường thẳng $w_1+w_2=2$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 2, 5; chứng nhận nghiệm của một quy hoạch tuyến tính bằng một nhân tử, rồi chứng minh nghiệm duy nhất bằng điều kiện bù trừ.

::: exercise Bài tập 03.30 (Chứng nhận nghiệm duy nhất của một quy hoạch tuyến tính bốn biến; Boyd và Vandenberghe, Bài 5.28, tr. 282)
Không dùng phần mềm quy hoạch tuyến tính, chứng minh quy hoạch tuyến tính
$$
\begin{aligned}
&\underset{x\in\mathbb R^4}{\operatorname{minimize}}\ c^Tx\\
&\text{subject to}\ \ Fx\le h,
\end{aligned}
$$
với vector chi phí $c=(47,93,17,-93)$, vế phải $h=(-3,5,-8,-7,4)$ và
$$
F=\begin{pmatrix}-1&-6&1&3\\-1&-2&7&1\\0&3&-10&-1\\-6&-11&-2&12\\1&6&-1&-3\end{pmatrix},
$$
có nghiệm duy nhất $x^*=(1,1,1,1)$.
:::

::: hint Gợi ý 1
Tìm các ràng buộc hoạt động tại $(1,1,1,1)$, rồi tìm $\lambda\ge0$ với $F^T\lambda+c=0$ và $\lambda_i=0$ cho mọi ràng buộc không hoạt động (Bài tập 03.21).
:::

::: hint Gợi ý 2
Để chứng minh nghiệm duy nhất, áp dụng Mệnh đề 03.27 phần 1 cho một nghiệm bất kỳ cùng nhân tử vừa tìm, rồi xét ma trận tạo bởi các hàng có nhân tử dương.
:::

::: solution Lời giải Bài tập 03.30
**Ràng buộc hoạt động.** Tại $x=\mathbf 1$, $F\mathbf 1$ là tổng từng hàng của $F$: $(-3,5,-8,-7,3)$. So với $h$, bốn ràng buộc đầu hoạt động và ràng buộc thứ năm không hoạt động ($3<4$). Điểm $\mathbf 1$ khả thi với $c^T\mathbf 1=47+93+17-93=64$.

**Định thức của $F_{1:4}$ bằng $286$.** Gọi $F_{1:4}$ là ma trận gồm bốn hàng đầu của $F$. Trừ hàng 1 khỏi hàng 2 và $6$ lần hàng 1 khỏi hàng 4, rồi khai triển theo cột thứ nhất:
$$
\begin{aligned}
&\det F_{1:4}\\
&\ =-\det\begin{pmatrix}4&6&-2\\3&-10&-1\\25&-8&-6\end{pmatrix}\\
&\ =-(208-42-452)=286 .
\end{aligned}
$$
Vậy $F_{1:4}$ khả nghịch.

**Nhân tử.** Đặt $\lambda_5=0$; điều kiện $F^T\lambda+c=0$ thành hệ bốn phương trình $F_{1:4}^T(\lambda_1,\ldots,\lambda_4)=-c$. Với $(\lambda_1,\ldots,\lambda_4)=(3,2,2,7)$, tích vô hướng với từng cột của $F_{1:4}$ là:

- cột 1: $-3-2+0-42=-47$;
- cột 2: $-18-4+6-77=-93$;
- cột 3: $3+14-20-14=-17$;
- cột 4: $9+2-2+84=93$,

đúng bằng $-c$. Nghiệm này duy nhất, vì $\det F_{1:4}=286\ne0$. Vậy $\lambda^*=(3,2,2,7,0)\ge0$.

**Chứng nhận.** Theo Bài tập 03.21, $g(\lambda^*)=-h^T\lambda^*=-(-9+10-16-49)=64=c^T\mathbf 1$. Theo Hệ quả 03.10(c), $x^*=\mathbf 1$ là nghiệm, $\lambda^*$ là nghiệm đối ngẫu và $p^*=d^*=64$.

**Nghiệm duy nhất.** Lấy một nghiệm bất kỳ $\tilde x$. Khi đó $c^T\tilde x=64=g(\lambda^*)$, và Mệnh đề 03.27 phần 1 cho $\lambda_i^*(F\tilde x-h)_i=0$ với mọi $i$. Vì $\lambda_i^*>0$ với $i\le4$, ta có $F_{1:4}\tilde x=(-3,5,-8,-7)$. Ma trận $F_{1:4}$ khả nghịch, nên hệ này có nghiệm duy nhất, và $\tilde x=\mathbf 1$.

**Kiểm tra lại.** Định thức $3\times3$ khai triển theo hàng đầu: $4\bigl((-10)(-6)-(-1)(-8)\bigr)=4\cdot52=208$, $-6\bigl(3\cdot(-6)-(-1)\cdot25\bigr)=-6\cdot7=-42$, $-2\bigl(3\cdot(-8)-(-10)\cdot25\bigr)=-2\cdot226=-452$. Ràng buộc thứ năm tại $\mathbf 1$ có độ dư $4-3=1$, nên $\lambda_5^*=0$ đúng với điều kiện bù trừ.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 5; chứng minh hệ KKT của bài toán lồi kéo theo điều kiện tối ưu bậc nhất của Bài 02.

::: exercise Bài tập 03.31 (Hệ KKT kéo theo điều kiện tối ưu bậc nhất; Boyd và Vandenberghe, Bài 5.31, tr. 283)
Xét bài toán lồi không có ràng buộc đẳng thức
$$
\begin{aligned}
&\min_{x\in\mathbb R^n}\ f_0(x)\\
&\text{với}\ \ f_i(x)\le0,\ i=1,\ldots,m,
\end{aligned}
$$
trong đó $f_0,f_1,\ldots,f_m:\mathbb R^n\to\mathbb R$ lồi và khả vi. Giả sử $x^*\in\mathbb R^n$ và $\lambda^*\in\mathbb R^m$ thỏa hệ KKT (Định nghĩa 03.29). Chứng minh
$$
\nabla f_0(x^*)^T(x-x^*)\ge0
$$
với mọi $x$ khả thi, tức $x^*$ thỏa điều kiện tối ưu bậc nhất của Hệ quả 02.4(c).
:::

::: hint Gợi ý 1
Với mỗi $i$, viết bất đẳng thức của Định lý 01.25 cho $f_i$ tại $x^*$.
:::

::: hint Gợi ý 2
Nhân bất đẳng thức thứ $i$ với $\lambda_i^*\ge0$, cộng lại, rồi dùng điều kiện bù trừ và điều kiện dừng.
:::

::: solution Lời giải Bài tập 03.31
**Điều kiện bậc nhất cho từng ràng buộc.** Lấy $x$ khả thi. Theo Định lý 01.25 với $C=\mathbb R^n$, $f_i(x)\ge f_i(x^*)+\nabla f_i(x^*)^T(x-x^*)$ với mọi $i$.

**Tích $\nabla f_0(x^*)^T(x-x^*)$ không âm.** Nhân với $\lambda_i^*\ge0$ và cộng:
$$
\begin{aligned}
&\textstyle\sum_i\lambda_i^*f_i(x)\\
&\ \ge\textstyle\sum_i\lambda_i^*f_i(x^*)\\
&\quad+\bigl(\textstyle\sum_i\lambda_i^*\nabla f_i(x^*)\bigr)^T(x-x^*).
\end{aligned}
$$
Vế trái không dương, vì $\lambda_i^*\ge0$ và $f_i(x)\le0$. Theo điều kiện bù trừ, $\sum_i\lambda_i^*f_i(x^*)=0$. Theo điều kiện dừng (8.1), $\sum_i\lambda_i^*\nabla f_i(x^*)=-\nabla f_0(x^*)$. Do đó $0\ge-\nabla f_0(x^*)^T(x-x^*)$, tức $\nabla f_0(x^*)^T(x-x^*)\ge0$.

**Kết luận.** Theo Hệ quả 02.4(c), $x^*$ là nghiệm. Đây là một chứng minh khác cho phần kết luận về $\tilde x$ của Định lý 03.32 khi $D=\mathbb R^n$ và không có đẳng thức.

**Kiểm tra lại.** Ở Ví dụ 03.17, $x^*=2$, $\lambda^*=2$ và $f_0'(2)=4$. Với mọi $x$ khả thi, $x\in[2,4]$, nên $4(x-2)\ge0$.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 1, 2, 6; lập nới lỏng Lagrange của một quy hoạch tuyến tính nhị phân và chứng minh nó cho cùng cận với nới lỏng tuyến tính.

::: exercise Bài tập 03.32 (Nới lỏng Lagrange của quy hoạch tuyến tính nhị phân; Boyd và Vandenberghe, Bài 5.13, tr. 276–277)
Một *quy hoạch tuyến tính nhị phân* (Boolean linear program) là bài toán
$$
\begin{aligned}
&\underset{x\in\mathbb R^n}{\operatorname{minimize}}\ c^Tx\\
&\text{subject to}\\
&\ \ Fx\le h,\\
&\ \ x_j\in\{0,1\},\ j=1,\ldots,n .
\end{aligned}
$$
*Nới lỏng tuyến tính* (LP relaxation) của nó thay điều kiện $x_j\in\{0,1\}$ bằng $0\le x_j\le1$; giá trị tối ưu $p^*_{\mathrm{LP}}$ của nới lỏng tuyến tính là một cận dưới cho giá trị tối ưu $p^*$ của quy hoạch nhị phân.

- **(a)** Điều kiện $x_j\in\{0,1\}$ tương đương $x_j(1-x_j)=0$. Vì bài toán (1.1) chỉ có đẳng thức affine, mỗi đẳng thức này được viết thành hai bất đẳng thức $x_j^2-x_j\le0$ và $x_j-x_j^2\le0$, với miền $D=\mathbb R^n$. Tìm bài toán đối ngẫu Lagrange của bài toán thu được. Cách lấy cận này gọi là *nới lỏng Lagrange* (Lagrangian relaxation): giá trị tối ưu của bài toán đối ngẫu là một cận dưới của $p^*$.
- **(b)** Giả sử nới lỏng tuyến tính khả thi. Chứng minh cận dưới từ nới lỏng Lagrange và cận dưới từ nới lỏng tuyến tính bằng nhau.
:::

::: hint Gợi ý 1
Ở (a), gọi $\lambda_j^+$, $\lambda_j^-$ là nhân tử của hai bất đẳng thức thứ $j$ và đặt $\nu_j=\lambda_j^+-\lambda_j^-$. Hàm Lagrange tách thành tổng các hàm bậc hai một biến theo từng $x_j$.
:::

::: hint Gợi ý 2
Ở (a), sau khi có hàm đối ngẫu, cực đại riêng theo từng $\nu_j\ge0$ với $\lambda$ cố định. Ở (b), lập bài toán đối ngẫu của nới lỏng tuyến tính bằng Bài tập 03.21, với các ràng buộc $Fx\le h$, $x\le\mathbf 1$, $-x\le0$.
:::

::: solution Lời giải Bài tập 03.32
**Câu (a).** Gọi $\lambda\in\mathbb R^m$ là nhân tử của $Fx\le h$. Với $\nu_j=\lambda_j^+-\lambda_j^-$, hai số hạng của bất đẳng thức thứ $j$ gộp thành $\nu_j(x_j^2-x_j)$. Đặt $\sigma_j=c_j+(F^T\lambda)_j$, hệ số bậc nhất của $x_j$ đến từ mục tiêu và từ $\lambda^T(Fx-h)$:
$$
\begin{aligned}
L={}&-h^T\lambda\\
&+\sum_{j=1}^n\bigl(\nu_jx_j^2+(\sigma_j-\nu_j)x_j\bigr).
\end{aligned}
$$
Cận dưới đúng của $\nu_jx_j^2+(\sigma_j-\nu_j)x_j$ trên $\mathbb R$ bằng:

- $-\frac{(\sigma_j-\nu_j)^2}{4\nu_j}$ khi $\nu_j>0$;
- $0$ khi $\nu_j=0$ và $\sigma_j=0$, và $-\infty$ khi $\nu_j=0$, $\sigma_j\ne0$;
- $-\infty$ khi $\nu_j<0$.

Mọi $\nu_j\ge0$ đạt được với $\lambda_j^+=\nu_j$, $\lambda_j^-=0$, nên bài toán đối ngẫu là cực đại $-h^T\lambda+\sum_j\Gamma_j(\nu_j)$ theo $\lambda\ge0$, $\nu\ge0$, với $\Gamma_j(\nu_j)$ là cận dưới đúng trên. Với $\lambda$ cố định, cực đại riêng theo từng $\nu_j$:

- nếu $\sigma_j\ge0$, $\Gamma_j\le0$ và $\nu_j=\sigma_j$ cho $0$;
- nếu $\sigma_j<0$, với $\nu_j>0$, $\Gamma_j(\nu_j)=-\frac{\sigma_j^2}{4\nu_j}+\frac{\sigma_j}2-\frac{\nu_j}4$ có đạo hàm $\frac{\sigma_j^2}{4\nu_j^2}-\frac14$, bằng $0$ tại $\nu_j=\lvert\sigma_j\rvert$, và giá trị lớn nhất là $-\frac{\lvert\sigma_j\rvert}2+\frac{\sigma_j}2=\sigma_j$.

Trong cả hai trường hợp, cận trên đúng theo $\nu_j$ bằng $\min\{0,\sigma_j\}$. Bài toán đối ngẫu rút gọn thành
$$
\begin{aligned}
&\underset{\lambda\ge0}{\operatorname{maximize}}\ -h^T\lambda\\
&\quad+\sum_{j=1}^n\min\{0,\,c_j+(F^T\lambda)_j\}.
\end{aligned}
$$
Gọi giá trị tối ưu của nó là $d^*_{\mathrm{LR}}$. Theo Hệ quả 03.10(a), $d^*_{\mathrm{LR}}\le p^*$.

**Câu (b).** Nới lỏng tuyến tính có ba nhóm ràng buộc $Fx\le h$, $x-\mathbf 1\le0$, $-x\le0$, với nhân tử $\lambda\ge0$ cho nhóm đầu và $\bar\lambda,\underline\lambda\in\mathbb R^n$, $\bar\lambda,\underline\lambda\ge0$, cho hai nhóm sau. Theo Bài tập 03.21, bài toán đối ngẫu của nó là
$$
\begin{aligned}
&\underset{\lambda,\bar\lambda,\underline\lambda}{\operatorname{maximize}}\ -h^T\lambda-\mathbf 1^T\bar\lambda\\
&\text{subject to}\\
&\ \ F^T\lambda+\bar\lambda-\underline\lambda+c=0,\\
&\ \ \lambda,\bar\lambda,\underline\lambda\ge0 .
\end{aligned}
$$
Với $\lambda$ cố định, ràng buộc đẳng thức là $\underline\lambda_j-\bar\lambda_j=\sigma_j$ với mọi $j$. Cực đại $-\bar\lambda_j$ nghĩa là chọn $\bar\lambda_j\ge0$ nhỏ nhất sao cho $\underline\lambda_j=\sigma_j+\bar\lambda_j\ge0$, tức $\bar\lambda_j=\max\{0,-\sigma_j\}$, và khi đó $-\bar\lambda_j=\min\{0,\sigma_j\}$. Do đó bài toán đối ngẫu của nới lỏng tuyến tính rút về đúng bài toán ở (a), và hai giá trị tối ưu đối ngẫu bằng nhau: $d^*_{\mathrm{LP}}=d^*_{\mathrm{LR}}$.

Vì nới lỏng tuyến tính khả thi, tập khả thi của nó khác rỗng, đóng và bị chặn, nên $p^*_{\mathrm{LP}}$ hữu hạn và đạt (Định lý 01.35); mọi ràng buộc affine, nên Định lý 03.15(b) cho $d^*_{\mathrm{LP}}=p^*_{\mathrm{LP}}$. Vậy $d^*_{\mathrm{LR}}=p^*_{\mathrm{LP}}$: hai cách nới lỏng cho cùng một cận dưới.

**Kiểm tra lại.** Hàm đối ngẫu rút gọn ở (a) trùng với hàm đối ngẫu của Ví dụ 03.7, nơi điều kiện nhị phân đặt vào miền $D=\{0,1\}^n$: khi đó $\inf_{x_j\in\{0,1\}}\sigma_jx_j=\min\{0,\sigma_j\}$. Với dữ liệu của ví dụ đó, $c=(2,2,2)$, các hàng của $F$ là $(-1,0,-1)$, $(-1,-1,0)$, $(0,-1,-1)$ và $h=(-1,-1,-1)$; tại $\lambda=(1,1,1)$, $F^T\lambda=(-2,-2,-2)$, mọi $\sigma_j=0$, và giá trị là $-h^T\lambda=3$, bằng $d^*=3$ của Ví dụ 03.7 và giá trị của nới lỏng tuyến tính ở Ví dụ 02.28.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 5, 6; giải hệ KKT của một bài toán bậc hai không lồi trên mặt cầu, chọn nghiệm bằng tính lồi của hàm Lagrange, và nhận ra các bộ KKT không phải nghiệm.

::: exercise Bài tập 03.33 (Bài toán bậc hai không lồi trên mặt cầu đơn vị; Boyd và Vandenberghe, Bài 5.29, tr. 282)
Xét bài toán
$$
\begin{aligned}
&\underset{x\in\mathbb R^3}{\operatorname{minimize}}\ -3x_1^2+x_2^2+2x_3^2\\
&\qquad\qquad+2(x_1+x_2+x_3)\\
&\text{subject to}\ \ x_1^2+x_2^2+x_3^2=1 .
\end{aligned}
$$
Ràng buộc đẳng thức không affine, nên được viết thành hai bất đẳng thức $x^Tx-1\le0$ và $1-x^Tx\le0$, với nhân tử $\lambda_1,\lambda_2\ge0$; đặt $\nu=\lambda_1-\lambda_2$.

- **(a)** Lập hệ KKT.
- **(b)** Tìm mọi cặp $(x,\nu)$ thỏa hệ KKT, với $\nu$ tính đến bốn chữ số thập phân.
- **(c)** Xác định cặp nào ứng với nghiệm của bài toán.
:::

::: hint Gợi ý 1
Phương trình dừng thứ $i$ là một phương trình bậc nhất theo $x_i$. Xét riêng các giá trị $\nu$ làm hệ số của $x_i$ bằng $0$.
:::

::: hint Gợi ý 2
Thay $x_i$ theo $\nu$ vào ràng buộc để được một phương trình một ẩn $\nu$; khảo sát vế trái trên các khoảng giữa các giá trị bị loại ở Gợi ý 1 và giải bằng phép chia đôi khoảng. Ở (c), xác định các giá trị $\nu$ làm $L(\cdot,\lambda)$ lồi, rồi dùng Mệnh đề 03.27 phần 3.
:::

::: solution Lời giải Bài tập 03.33
**Câu (a).** Gọi $f_0$ là mục tiêu, $f_1(x)=x^Tx-1$, $f_2(x)=1-x^Tx$. Hệ KKT gồm:

- khả thi gốc: $x^Tx=1$;
- khả thi đối ngẫu: $\lambda_1,\lambda_2\ge0$;
- bù trừ: $\lambda_1f_1(x)=\lambda_2f_2(x)=0$, đúng tại mọi điểm khả thi vì $f_1(x)=f_2(x)=0$;
- dừng: $\nabla f_0(x)+2(\lambda_1-\lambda_2)x=0$, tức
$$
\begin{aligned}
(\nu-3)x_1&=-1,\\
(\nu+1)x_2&=-1,\\
(\nu+2)x_3&=-1 .
\end{aligned}
$$

Mọi số thực $\nu$ viết được thành $\lambda_1-\lambda_2$ với $\lambda_1=\max\{\nu,0\}$, $\lambda_2=\max\{-\nu,0\}$, nên hệ KKT tương đương ba phương trình dừng cùng $x^Tx=1$, với $\nu\in\mathbb R$ tùy ý.

**Câu (b).** Với $\nu\in\{3,-1,-2\}$, một phương trình dừng thành $0=-1$, nên các giá trị này bị loại. Với $\nu$ khác, $x=\bigl(\frac1{3-\nu},-\frac1{\nu+1},-\frac1{\nu+2}\bigr)$, và ràng buộc thành $\chi(\nu)=1$, với
$$
\begin{aligned}
\chi(\nu)={}&\frac1{(\nu-3)^2}+\frac1{(\nu+1)^2}\\
&+\frac1{(\nu+2)^2}.
\end{aligned}
$$
Hàm $\chi$ liên tục ngoài ba điểm $-2$, $-1$, $3$, dần tới $+\infty$ khi $\nu$ tới các điểm đó và tới $0$ khi $\lvert\nu\rvert\to\infty$. Trên từng khoảng:

- trên $(-\infty,-2)$, cả ba số hạng tăng, nên $\chi$ tăng từ $0$ tới $+\infty$ và có đúng một nghiệm;
- trên $(-2,-1)$, $\lvert\nu+1\rvert<1$ và $\lvert\nu+2\rvert<1$, nên $\chi>2$ và không có nghiệm;
- trên $(-1,3)$, mỗi số hạng có đạo hàm bậc hai dương, chẳng hạn $\frac{d^2}{d\nu^2}(\nu-3)^{-2}=6(\nu-3)^{-4}$, nên $\chi$ lồi chặt, có nhiều nhất hai nghiệm; vì $\chi(1)=\tfrac14+\tfrac14+\tfrac19<1$ và $\chi\to+\infty$ ở hai đầu, có đúng hai nghiệm, một trong $(-1,1)$ và một trong $(1,3)$;
- trên $(3,\infty)$, cả ba số hạng giảm, nên $\chi$ giảm từ $+\infty$ tới $0$ và có đúng một nghiệm.

Phép chia đôi khoảng trên bốn khoảng đó cho bốn bộ KKT, làm tròn bốn chữ số:

- $\nu=-3{,}1493$: $x=(0{,}1626;\ 0{,}4653;\ 0{,}8701)$, $f_0(x)=4{,}6473$;
- $\nu=0{,}2235$: $x=(0{,}3602;\ -0{,}8173;\ -0{,}4497)$, $f_0(x)=-1{,}1304$;
- $\nu=1{,}8919$: $x=(0{,}9024;\ -0{,}3458;\ -0{,}2569)$, $f_0(x)=-1{,}5922$;
- $\nu=4{,}0352$: $x=(-0{,}9660;\ -0{,}1986;\ -0{,}1657)$, $f_0(x)=-5{,}3655$.

**Câu (c).** Với $\nu=4{,}0352$, lấy $\lambda=(\nu,0)$. Hàm Lagrange là
$$
\begin{aligned}
&L(x,\lambda)=(\nu-3)x_1^2\\
&\quad+(\nu+1)x_2^2+(\nu+2)x_3^2\\
&\quad+2\mathbf 1^Tx-\nu .
\end{aligned}
$$
Vì $\nu>3$, cả ba hệ số bậc hai dương, nên $L(\cdot,\lambda)$ lồi (Định lý 01.29), và điều kiện dừng cho $x$ là điểm cực tiểu toàn cục của nó (Hệ quả 01.26). Điểm $x$ khả thi, $\lambda\ge0$ và bù trừ đúng, nên theo Mệnh đề 03.27 phần 3, $x$ là nghiệm, $\lambda$ là nghiệm đối ngẫu và $p^*=d^*\approx-5{,}3655$. Mọi nghiệm $\tilde x$ cùng $\lambda$ thỏa hệ KKT theo Định lý 03.30, nên thỏa ba phương trình dừng với $\nu=4{,}0352$ và trùng $x$: nghiệm duy nhất.

Ba bộ KKT còn lại có $\nu<3$ và giá trị mục tiêu lớn hơn $p^*$, nên không là nghiệm. Bài toán không lồi, nên Định lý 03.32 không áp dụng được, và theo Nhận xét 03.33, một bộ KKT không nhất thiết cho nghiệm.

**Kiểm tra lại.** Với $\nu>3$, cực tiểu theo $x_1$ của $(\nu-3)x_1^2+2x_1$ bằng $-\frac1{\nu-3}$, tương tự cho $x_2$, $x_3$, nên
$$
\begin{aligned}
g(\nu)={}&-\frac1{\nu-3}-\frac1{\nu+1}\\
&-\frac1{\nu+2}-\nu .
\end{aligned}
$$
Tại $\nu=4{,}0352$: $-(0{,}9660+0{,}1986+0{,}1657)-4{,}0352\approx-5{,}3655$, bằng $f_0(x)$.
:::

## Tài liệu tham khảo

- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press, Chương 5, mục Exercises:
  - Bài 5.2 (Basic definitions, tr. 273);
  - Bài 5.4 (Examples and applications, tr. 273–274), Bài 5.5 (Examples and applications, tr. 274), Bài 5.13, với (b) rút gọn cho trường hợp nới lỏng tuyến tính khả thi (Examples and applications, tr. 276–277), Bài 5.14 và 5.15 (Examples and applications, tr. 277);
  - Bài 5.21(d) và 5.22, bỏ (b) (Strong duality and Slater's condition, tr. 280), Bài 5.23(c) (Strong duality and Slater's condition, tr. 281);
  - Bài 5.26–5.29 (Optimality conditions, tr. 282), Bài 5.31 (Optimality conditions, tr. 283);
  - Bài 5.32 (Perturbation and sensitivity analysis, tr. 283).
