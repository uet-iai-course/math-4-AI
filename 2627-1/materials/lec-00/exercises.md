# Bài tập Bài 00 — Ôn tập nền tảng toán học cho AI

Bài tập 00.3–00.16 dưới đây đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-00/lecture-note.md&deck=lecture-00-on-tap-nen-tang-toan-hoc.html) và [bài giảng](lecture-00-on-tap-nen-tang-toan-hoc.html) của Bài 00. Lời giải dẫn định nghĩa, định lý, mệnh đề và ví dụ theo số hiệu của ghi chú. Ký hiệu theo ghi chú: vector viết chữ thường, không in đậm, và là vector cột, $\mathbb 1=(1,\ldots,1)^T$. Trong mỗi bài, $h$ là hàm vô hướng do đề bài cho.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Vector đặc trưng, ma trận thiết kế, vector trọng số, vector phần dư; kích thước của phép nhân ma trận | 00.1 | 00.3, 00.4 |
| 1. Tích vô hướng và chuẩn của vector | — | 00.14 |
| 2. Không gian cột, hạt nhân, hạng và tính xác định dương của ma trận nhỏ | — | 00.5, 00.6, 00.7 |
| 2. Số nghiệm của hệ tuyến tính và của bài toán bình phương nhỏ nhất | — | 00.5, 00.13 |
| 3. Gradient, ma trận Hessian, khai triển Taylor bậc hai | 00.1 | 00.8, 00.9, 00.10 |
| 3. Ma trận Jacobian | — | — |
| 3. Bình phương nhỏ nhất từ điều kiện gradient bằng không; phân loại điểm dừng bằng Hessian | — | 00.10, 00.13, 00.15 |
| 4. Tính xác suất | — | 00.11 |
| 4. Kỳ vọng và phương sai từ hàm khối, hàm mật độ hoặc hàm phân phối tích lũy | — | — |
| 4. Phân biệt nhiễu với phần dư | 00.2 | — |
| 4. Hợp lý cực đại dưới nhiễu Gauss độc lập dẫn tới bình phương nhỏ nhất | — | — |
| 5. Phân phối biên, phân phối có điều kiện, độc lập | — | 00.16 |
| 5. Xác suất hậu nghiệm theo công thức Bayes | — | — |
| 5. Hiệp phương sai | — | 00.12 |
| 5. Điều kiện dùng bình phương nhỏ nhất tổng quát | — | — |
| 6. Dự đoán kèm dải nhiễu | 00.2 | — |
| 6. Quá khớp khi số trọng số bằng số mẫu | — | — |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 1; tính tích ma trận và kiểm tra $AB\ne BA$.

::: exercise Bài tập 00.3 (Hai tích $AB$ và $BA$; Kupferschmid, Bài 28.9.10, tr. 957)
Cho
$$
\begin{gathered}
A=\begin{bmatrix}1&0&0\\-2&1&0\\0&0&1\end{bmatrix},\\
B=\begin{bmatrix}1&0&0\\0&1&0\\0&3&1\end{bmatrix}.
\end{gathered}
$$
Tính các tích ma trận:

- **(a)** $AB$;
- **(b)** $BA$.
:::

::: hint Gợi ý
Dùng công thức $(AC)_{ij}=\sum_ka_{ik}c_{kj}$ của Định nghĩa 00.3 cho từng phần tử. Ghi kích thước trước: hai tích đều có kích thước $3\times3$. Các hàng $(1,0,0)$ và $(0,0,1)$ của $A$ làm tổng chỉ còn một số hạng.
:::

::: solution Lời giải Bài tập 00.3
**Câu (a).** Theo Định nghĩa 00.3, $(AB)_{ij}=\sum_ka_{ik}b_{kj}$. Hàng một của $A$ là $(1,0,0)$, nên $(AB)_{1j}=b_{1j}$; tương tự, hàng ba $(0,0,1)$ cho $(AB)_{3j}=b_{3j}$. Hàng hai $(-2,1,0)$ cho $(AB)_{2j}=-2b_{1j}+b_{2j}$, tức hàng hai của $AB$ là $(-2,1,0)$. Vậy
$$
AB=\begin{bmatrix}1&0&0\\-2&1&0\\0&3&1\end{bmatrix}.
$$

**Câu (b).** Tương tự, $(BA)_{ij}=\sum_kb_{ik}a_{kj}$. Hai hàng đầu của $B$ là $(1,0,0)$ và $(0,1,0)$, nên $(BA)_{1j}=a_{1j}$ và $(BA)_{2j}=a_{2j}$. Hàng ba $(0,3,1)$ cho $(BA)_{3j}=3a_{2j}+a_{3j}$, tức hàng ba của $BA$ là $(-6,3,1)$. Vậy
$$
BA=\begin{bmatrix}1&0&0\\-2&1&0\\-6&3&1\end{bmatrix}.
$$

**Kiểm tra lại.** Tính lại phần tử $(3,1)$ theo công thức: $(AB)_{31}=a_{31}b_{11}+a_{32}b_{21}+a_{33}b_{31}=0+0+0=0$ và $(BA)_{31}=b_{31}a_{11}+b_{32}a_{21}+b_{33}a_{31}=0+3\cdot(-2)+0=-6$. Hai tích khác nhau, khớp với câu "Nói chung $AC\ne CA$" sau Định nghĩa 00.3.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 1; phân biệt tích vô hướng, tích ngoài và kiểm tra kích thước.

::: exercise Bài tập 00.4 (Tích vô hướng và tích ngoài; Kupferschmid, Bài 28.9.15, tr. 958)
Cho $u=(1,2,3)^T$ và $v=(4,5,6)^T$. *Tích ngoài* (outer product) của $u$ và $v$ là ma trận $uv^T$. Tính:

- **(a)** tích vô hướng $u^Tv$;
- **(b)** tích vô hướng $v^Tu$;
- **(c)** tích ngoài $uv^T$;
- **(d)** tích ngoài $vu^T$;
- **(e)** dùng quy tắc kích thước để kiểm tra tích $uv$ có xác định không.
:::

::: hint Gợi ý
Ghi kích thước trước khi nhân: $u^T$ là $1\times3$, $v$ là $3\times1$, nên $u^Tv$ là $1\times1$; $u$ là $3\times1$, $v^T$ là $1\times3$, nên $uv^T$ là $3\times3$ với phần tử $(i,j)$ bằng $u_iv_j$. Câu (e): so số cột của $u$ với số hàng của $v$.
:::

::: solution Lời giải Bài tập 00.4
**Câu (a).** $u^Tv=1\cdot4+2\cdot5+3\cdot6=32$.

**Câu (b).** $v^Tu=4\cdot1+5\cdot2+6\cdot3=32$; tích vô hướng đối xứng theo Định nghĩa 00.3.

**Câu (c).** Phần tử $(i,j)$ của $uv^T$ là $u_iv_j$:
$$
uv^T=\begin{bmatrix}4&5&6\\8&10&12\\12&15&18\end{bmatrix}.
$$

**Câu (d).** Phần tử $(i,j)$ của $vu^T$ là $v_iu_j=(uv^T)_{ji}$, nên $vu^T=(uv^T)^T$:
$$
vu^T=\begin{bmatrix}4&8&12\\5&10&15\\6&12&18\end{bmatrix}.
$$

**Câu (e).** $u$ và $v$ đều có kích thước $3\times1$. Quy tắc $(m\times n)(n\times p)$ đòi số cột của nhân tử trái ($1$) bằng số hàng của nhân tử phải ($3$), nên $uv$ không xác định.

**Kiểm tra lại.** Vết của $uv^T$ là $4+10+18=32=u^Tv$, đúng với $\operatorname{tr}(uv^T)=\sum_iu_iv_i$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 2; nhận ra quan hệ phụ thuộc tuyến tính giữa các hàng, suy ra hạng và tập nghiệm của hệ thuần nhất.

::: exercise Bài tập 00.5 (Ma trận $3\times3$ có hạng $2$; Kupferschmid, Bài 28.9.22(b)(c), tr. 958)
Ma trận
$$
A=\begin{bmatrix}1&2&3\\4&5&6\\7&8&9\end{bmatrix}
$$
có ba hàng nhưng hạng bằng $2$.

- **(a)** Tìm các vô hướng $\alpha$, $\beta$ sao cho $\alpha(1,2,3)+\beta(4,5,6)=(7,8,9)$.
- **(b)** Từ câu (a), giải thích vì sao ba hàng của $A$ phụ thuộc tuyến tính và vì sao $\operatorname{rank}(A)=2$.
- **(c)** Xác định $\dim\operatorname{Ker}(A)$ và tập nghiệm của hệ $Ax=0$.
:::

::: hint Gợi ý 1
Câu (a): so từng thành phần của hai vế để được một hệ ba phương trình theo hai ẩn $\alpha$, $\beta$. Câu (b): dùng Định nghĩa 00.6 cho ba hàng và kết luận 2 của Mệnh đề 00.8. Câu (c): dùng kết luận 3 của Mệnh đề 00.8 và kết luận 2 của Định lý 00.9.
:::

::: hint Gợi ý 2
Câu (a): giải hệ của hai thành phần đầu rồi kiểm tra thành phần thứ ba. Câu (b): để có hạng đúng bằng $2$, còn cần hai hàng độc lập tuyến tính. Câu (c): tìm một vector khác $0$ trong $\operatorname{Ker}(A)$ từ một quan hệ tuyến tính giữa ba cột của $A$.
:::

::: solution Lời giải Bài tập 00.5
**Câu (a).** Từ $\alpha+4\beta=7$ và $2\alpha+5\beta=8$: nhân phương trình đầu với $2$ rồi trừ phương trình sau, được $3\beta=6$, nên $\beta=2$ và $\alpha=7-8=-1$. Thành phần thứ ba: $-1\cdot3+2\cdot6=9$. Vậy $\alpha=-1$, $\beta=2$.

**Câu (b).** Đẳng thức $-(1,2,3)+2(4,5,6)-(7,8,9)=0$ là một tổ hợp tuyến tính bằng $0$ với hệ số $(-1,2,-1)$ khác $0$, nên theo Định nghĩa 00.6 ba hàng phụ thuộc tuyến tính. Hai hàng đầu độc lập tuyến tính vì không hàng nào là bội của hàng kia ($4/1\ne5/2$). Vậy số lớn nhất các hàng độc lập tuyến tính là $2$, và theo kết luận 2 của Mệnh đề 00.8, $\operatorname{rank}(A)=2$.

**Câu (c).** Theo kết luận 3 của Mệnh đề 00.8, $\dim\operatorname{Ker}(A)=3-2=1$. Với các cột $c_1=(1,4,7)^T$, $c_2=(2,5,8)^T$, $c_3=(3,6,9)^T$, ta có $c_1-2c_2+c_3=(1-4+3,\ 4-10+6,\ 7-16+9)^T=0$, nên $(1,-2,1)^T\in\operatorname{Ker}(A)$. Không gian một chiều $\operatorname{Ker}(A)$ chứa vector khác $0$ này, nên $\operatorname{Ker}(A)=\operatorname{span}\{(1,-2,1)^T\}$. Hệ $Ax=0$ có nghiệm $x_0=0$, nên theo kết luận 2 của Định lý 00.9, tập nghiệm là $\{t(1,-2,1)^T:\ t\in\mathbb R\}$, gồm vô số nghiệm.

**Kiểm tra lại.** Hàng một nhân với $(1,-2,1)^T$: $1-4+3=0$; hàng hai: $4-10+6=0$; hàng ba: $7-16+9=0$. Kết luận 3 của Định lý 00.9 cũng cho nghiệm không duy nhất, vì $\operatorname{rank}(A)=2<3$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 2; áp dụng trực tiếp định nghĩa nửa xác định dương và xác định dương.

::: exercise Bài tập 00.6 (Ma trận đơn vị và ma trận không; Kupferschmid, Bài 10.9.31, tr. 372)
- **(a)** Chứng minh rằng ma trận đơn vị $I_n$ xác định dương.
- **(b)** Chứng minh rằng ma trận $0\in\mathbb R^{n\times n}$ nửa xác định dương.
- **(c)** Viết một ma trận đối xứng không nửa xác định dương, khác ma trận $\begin{bmatrix}1&2\\2&1\end{bmatrix}$ sau Định nghĩa 00.17.
:::

::: hint Gợi ý
Dùng Định nghĩa 00.17: tính $x^TI_nx$ và $x^T0x$ cho $x\ne0$. Câu (c): chỉ cần một vector $x$ có $x^TAx<0$; thử một ma trận đường chéo có một phần tử âm.
:::

::: solution Lời giải Bài tập 00.6
**Câu (a).** $I_n$ đối xứng và với mọi $x\ne0$, $x^TI_nx=x^Tx=\lVert x\rVert_2^2>0$, nên $I_n\succ0$ theo Định nghĩa 00.17.

**Câu (b).** Ma trận $0$ đối xứng và $x^T0x=0\ge0$ với mọi $x$, nên $0\succeq0$. Nó không xác định dương, vì $x^T0x=0$ với mọi $x\ne0$.

**Câu (c).** Với $A=\begin{bmatrix}1&0\\0&-1\end{bmatrix}$ và $x=e_2$, $x^TAx=-1<0$, nên $A$ không nửa xác định dương; vì xác định dương kéo theo nửa xác định dương, $A$ cũng không xác định dương. Với $x=e_1$, $x^TAx=1>0$, nên $A$ bất định dấu.

**Kiểm tra lại.** Theo kết luận 2 của Mệnh đề 00.18: $I_n$ có $\lambda_{\min}=1>0$; ma trận $0$ có $\lambda_{\min}=0\ge0$; $A$ có $\lambda_{\min}=-1<0$.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 2; kiểm tra tính xác định dương bằng hai cách.

::: exercise Bài tập 00.7 (Tính xác định dương của một ma trận $2\times2$; Kupferschmid, Bài 11.7.24(a)(b), tr. 391)
Cho
$$
A=\begin{bmatrix}2&1\\1&3\end{bmatrix}.
$$
Chứng minh rằng $A$ xác định dương bằng mỗi cách sau.

- **(a)** Dùng Định nghĩa 00.17.
- **(b)** Giải phương trình $\det(A-\lambda I_2)=0$ và lập luận dựa trên các giá trị riêng của $A$.
:::

::: hint Gợi ý 1
Câu (a): khai triển $x^TAx$ và tách một bình phương chứa $x_1x_2$. Câu (b): khai triển $\det(A-\lambda I_2)$ theo Định nghĩa 00.10, rồi dùng kết luận 2 của Mệnh đề 00.18.
:::

::: hint Gợi ý 2
Câu (a): với bình phương $(x_1+x_2)^2$, xét dấu phần còn lại. Câu (b): giải phương trình bậc hai theo $\lambda$ và xét dấu nghiệm nhỏ hơn.
:::

::: solution Lời giải Bài tập 00.7
**Câu (a).** $A$ đối xứng. Với $x=(x_1,x_2)^T$,
$$
\begin{aligned}
x^TAx&=2x_1^2+2x_1x_2+3x_2^2\\
&=(x_1+x_2)^2+x_1^2+2x_2^2 .
\end{aligned}
$$
Ba số hạng không âm, và tổng bằng $0$ chỉ khi $x_1=0$ và $x_2=0$. Vậy $x^TAx>0$ với mọi $x\ne0$, nên $A\succ0$ theo Định nghĩa 00.17.

**Câu (b).** $\det(A-\lambda I_2)=(2-\lambda)(3-\lambda)-1=\lambda^2-5\lambda+5$. Phương trình $\lambda^2-5\lambda+5=0$ có hai nghiệm
$$
\begin{gathered}
\lambda_{\min}=\frac{5-\sqrt5}2\approx1{,}382,\\
\lambda_{\max}=\frac{5+\sqrt5}2\approx3{,}618 .
\end{gathered}
$$
Theo Định lý 00.12, $\det(A-\lambda I_2)=0$ cho $\operatorname{Ker}(A-\lambda I_2)\ne\{0\}$, nên theo Định nghĩa 00.15 hai nghiệm này là hai giá trị riêng của $A$. Vì $\lambda_{\min}>0$, kết luận 2 của Mệnh đề 00.18 cho $A\succ0$.

**Kiểm tra lại.** $\lambda_{\min}+\lambda_{\max}=5=\operatorname{tr}(A)$ và $\lambda_{\min}\lambda_{\max}=(25-5)/4=5=\det(A)$. Với $x=(1,-1)^T$, câu (a) cho $x^TAx=0+1+2=3$, và tính trực tiếp $2-2+3=3$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; tính gradient của một dạng bậc hai có ma trận không đối xứng.

::: exercise Bài tập 00.8 (Gradient của $x^TAx$ với $A$ không đối xứng; Kupferschmid, Bài 28.9.6, tr. 957)
Cho $h(x)=x^TAx$ với $x\in\mathbb R^2$ và
$$
A=\begin{bmatrix}1&2\\3&4\end{bmatrix}.
$$

- **(a)** Tính $\nabla h(x)$.
- **(b)** Kiểm tra rằng các thành phần của kết quả ở câu (a) là các đạo hàm riêng của $h(x)=x_1^2+5x_1x_2+4x_2^2$.
:::

::: hint Gợi ý 1
Câu (a): khai triển $h(x+\Delta)=(x+\Delta)^TA(x+\Delta)$ thành bốn số hạng rồi so với Định nghĩa 00.30. Câu (b): dùng Định nghĩa 00.29.
:::

::: hint Gợi ý 2
Hai số hạng bậc nhất theo $\Delta$ là $x^TA\Delta$ và $\Delta^TAx$; viết cả hai dưới dạng $(\cdot)^T\Delta$ bằng phép chuyển vị của một vô hướng. Số hạng còn lại $\Delta^TA\Delta$ bị chặn bởi một hằng số nhân $\lVert\Delta\rVert_2^2$.
:::

::: solution Lời giải Bài tập 00.8
**Câu (a).** Với mọi $\Delta\in\mathbb R^2$,
$$
\begin{aligned}
h(x+\Delta)&=x^TAx+x^TA\Delta\\
&\quad+\Delta^TAx+\Delta^TA\Delta .
\end{aligned}
$$
Vô hướng $\Delta^TAx$ bằng chuyển vị của nó, $x^TA^T\Delta$, nên hai số hạng giữa bằng $\bigl((A+A^T)x\bigr)^T\Delta$. Số hạng cuối thỏa $\lvert\Delta^TA\Delta\rvert\le\sum_{i,j}\lvert a_{ij}\rvert\,\lvert\Delta_i\rvert\,\lvert\Delta_j\rvert\le10\lVert\Delta\rVert_2^2$, vì $\lvert\Delta_i\rvert\le\lVert\Delta\rVert_2$ và $\sum_{i,j}\lvert a_{ij}\rvert=10$; do đó $\Delta^TA\Delta=o(\lVert\Delta\rVert_2)$. Theo Định nghĩa 00.30,
$$
\begin{aligned}
\nabla h(x)&=(A+A^T)x=\begin{bmatrix}2&5\\5&8\end{bmatrix}x\\
&=\begin{pmatrix}2x_1+5x_2\\5x_1+8x_2\end{pmatrix}.
\end{aligned}
$$

**Câu (b).** $x^TAx=x_1^2+2x_1x_2+3x_2x_1+4x_2^2=x_1^2+5x_1x_2+4x_2^2$. Theo Định nghĩa 00.29, $\partial h/\partial x_1=2x_1+5x_2$ và $\partial h/\partial x_2=5x_1+8x_2$, trùng với hai thành phần ở câu (a).

**Kiểm tra lại.** Tại $x=(1,1)^T$: $h=10$, và theo câu (a) $\nabla h=(7,13)^T$; với $\Delta=(0{,}01;\,0)^T$, $h(x+\Delta)=1{,}0201+5{,}05+4=10{,}0701$, gần với $h(x)+\nabla h(x)^T\Delta=10{,}07$. Công thức $2Ax$ cho $(6,14)^T$ tại điểm này, khác $(7,13)^T$, vì $A\ne A^T$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; viết xấp xỉ Taylor bậc hai một biến và hai biến.

::: exercise Bài tập 00.9 (Xấp xỉ Taylor bậc hai; Kupferschmid, Bài 10.9.2, tr. 370)
- **(a)** Viết xấp xỉ Taylor bậc hai của $h(x)=e^x$ quanh điểm $\bar x=1$.
- **(b)** Viết xấp xỉ Taylor bậc hai của $h(x)=e^{x_1x_2}$ quanh điểm $\bar x=(1,-1)^T$.
:::

::: hint Gợi ý 1
Xấp xỉ Taylor bậc hai của $h$ quanh $\bar x$ gồm ba số hạng đầu của Định lý 00.40 tại điểm $\bar x$: $h(\bar x)+\nabla h(\bar x)^T\Delta+\tfrac12\Delta^T\nabla^2h(\bar x)\Delta$, với $\Delta=x-\bar x$. Câu (a) là trường hợp $n=1$.
:::

::: hint Gợi ý 2
Câu (b): $\partial h/\partial x_1=x_2e^{x_1x_2}$; tính tiếp đạo hàm riêng theo $x_2$ và ba đạo hàm riêng bậc hai theo Định nghĩa 00.36, rồi thay $\bar x=(1,-1)^T$.
:::

::: solution Lời giải Bài tập 00.9
**Câu (a).** $h'(x)=h''(x)=e^x$, nên $h(\bar x)=h'(\bar x)=h''(\bar x)=e$. Theo Định lý 00.40 tại $\bar x=1$, với $n=1$ và $\Delta=x-1$,
$$
e^x\approx e+e(x-1)+\tfrac e2(x-1)^2 .
$$

**Câu (b).** Các đạo hàm riêng là
$$
\begin{aligned}
\frac{\partial h}{\partial x_1}&=x_2e^{x_1x_2},\\
\frac{\partial h}{\partial x_2}&=x_1e^{x_1x_2},\\
\frac{\partial^2h}{\partial x_1^2}&=x_2^2e^{x_1x_2},\\
\frac{\partial^2h}{\partial x_2^2}&=x_1^2e^{x_1x_2},\\
\frac{\partial^2h}{\partial x_1\partial x_2}&=(1+x_1x_2)e^{x_1x_2}.
\end{aligned}
$$
Tại $\bar x=(1,-1)^T$: $\bar x_1\bar x_2=-1$, $h(\bar x)=e^{-1}$, $\nabla h(\bar x)=e^{-1}(-1,1)^T$ và $\nabla^2h(\bar x)=e^{-1}I_2$, vì $1+\bar x_1\bar x_2=0$. Với $\Delta=x-\bar x=(x_1-1,\ x_2+1)^T$, theo Định lý 00.40,
$$
\begin{aligned}
e^{x_1x_2}&\approx e^{-1}\bigl[1-\Delta_1+\Delta_2\\
&\qquad+\tfrac12(\Delta_1^2+\Delta_2^2)\bigr].
\end{aligned}
$$

**Kiểm tra lại.** Với $\Delta=(0{,}01;\,0{,}02)^T$: $e^{(1{,}01)(-0{,}98)}=e^{-0{,}9898}\approx0{,}371651$, còn xấp xỉ cho $e^{-1}(1+0{,}01+0{,}00025)\approx0{,}371650$; sai khác cỡ $10^{-6}$, nhỏ so với $\lVert\Delta\rVert_2^2=5\cdot10^{-4}$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; tính gradient, Hessian và phân loại điểm dừng.

::: exercise Bài tập 00.10 (Hessian của hàm Rosenbrock tại điểm cực tiểu; Kupferschmid, Bài 10.9.33, tr. 372, và Bài 11.7.22(a), tr. 390)
Hàm Rosenbrock là $h(x)=100(x_2-x_1^2)^2+(1-x_1)^2$, $x\in\mathbb R^2$; đặt $x^*=(1,1)^T$.

- **(a)** Tìm ma trận Hessian $\nabla^2h(x)$ tại một điểm $x$ bất kỳ.
- **(b)** Kiểm tra rằng $\nabla h(x^*)=0$ và
$$
\nabla^2h(x^*)=\begin{bmatrix}802&-400\\-400&200\end{bmatrix}.
$$
- **(c)** Dùng Định nghĩa 00.17 để chứng minh rằng $\nabla^2h(x^*)$ xác định dương, rồi phân loại điểm dừng $x^*$.
:::

::: hint Gợi ý 1
Câu (a): $\partial h/\partial x_2=200(x_2-x_1^2)$; tính $\partial h/\partial x_1$ bằng quy tắc dây chuyền một biến, rồi lấy đạo hàm lần nữa. Câu (c): dùng Định nghĩa 00.17, rồi Định lý 00.43.
:::

::: hint Gợi ý 2
Câu (c): với $z=(z_1,z_2)^T$, viết $z^T\nabla^2h(x^*)z$ thành đa thức theo $z_1$, $z_2$ và tách một bình phương chứa $z_1z_2$.
:::

::: solution Lời giải Bài tập 00.10
**Câu (a).** Các đạo hàm riêng bậc nhất là
$$
\begin{aligned}
\frac{\partial h}{\partial x_1}&=-400x_1(x_2-x_1^2)\\
&\quad-2(1-x_1),\\
\frac{\partial h}{\partial x_2}&=200(x_2-x_1^2).
\end{aligned}
$$
Theo Định nghĩa 00.36, các phần tử của $\nabla^2h(x)$ là
$$
\begin{aligned}
\nabla^2h(x)_{11}&=1200x_1^2-400x_2+2,\\
\nabla^2h(x)_{12}&=-400x_1,\\
\nabla^2h(x)_{21}&=-400x_1,\\
\nabla^2h(x)_{22}&=200.
\end{aligned}
$$

**Câu (b).** Tại $x^*=(1,1)^T$: $x_2-x_1^2=0$ và $1-x_1=0$, nên $\nabla h(x^*)=0$. Thay vào câu (a): $1200-400+2=802$, $-400\cdot1=-400$, và phần tử $(2,2)$ bằng $200$.

**Câu (c).** $\nabla^2h(x^*)$ đối xứng. Với $z=(z_1,z_2)^T$,
$$
\begin{aligned}
&z^T\nabla^2h(x^*)z\\
&\quad=802z_1^2-800z_1z_2+200z_2^2\\
&\quad=200(z_2-2z_1)^2+2z_1^2 .
\end{aligned}
$$
Tổng bằng $0$ chỉ khi $z_1=0$ và $z_2=2z_1=0$, nên $z^T\nabla^2h(x^*)z>0$ với mọi $z\ne0$, tức $\nabla^2h(x^*)\succ0$. Hàm $h$ là đa thức nên thuộc lớp $C^2$ trên $\mathbb R^2$; cùng với $\nabla h(x^*)=0$, kết luận 1 của Định lý 00.43 cho $x^*$ là cực tiểu địa phương chặt của $h$.

**Kiểm tra lại.** Vết bằng $1002>0$ và định thức bằng $802\cdot200-400^2=400>0$, nên hai giá trị riêng cùng dương, khớp với kết luận 2 của Mệnh đề 00.18.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 4; suy ra tính chất của xác suất từ ba tiên đề.

::: exercise Bài tập 00.11 (Tính chất suy từ tiên đề xác suất; Koller và Friedman, Bài 2.1, tr. 39)
Cho không gian xác suất $(\Omega,\mathcal F,\Pr)$ của Định nghĩa 00.49 và các biến cố $E,E'\in\mathcal F$. Chỉ dùng các tính chất của $\mathcal F$ và ba tiên đề của $\Pr$ trong Định nghĩa 00.49, chứng minh:

- **(a)** $\Pr(\emptyset)=0$;
- **(b)** nếu $E\subseteq E'$ thì $\Pr(E)\le\Pr(E')$;
- **(c)** $\Pr(E\cup E')=\Pr(E)+\Pr(E')-\Pr(E\cap E')$.
:::

::: hint Gợi ý 1
Câu (a): $\emptyset=\Omega\setminus\Omega\in\mathcal F$; dùng tiên đề cộng tính cho một dãy rời nhau gồm $\Omega$ và các tập rỗng. Từ câu (a) suy ra tiên đề cộng tính cũng đúng cho hai biến cố rời nhau.
:::

::: hint Gợi ý 2
Câu (b) và (c): viết $E'$ và $E\cup E'$ thành hợp của hai phần rời nhau, một phần là $E'\setminus E$; kiểm tra các phần này thuộc $\mathcal F$ nhờ phần bù và hợp.
:::

::: solution Lời giải Bài tập 00.11
**Câu (a).** $\emptyset=\Omega\setminus\Omega\in\mathcal F$. Dãy $E_1=\Omega$, $E_k=\emptyset$ với $k\ge2$ đôi một rời nhau và có hợp $\Omega$. Tiên đề thứ ba và thứ hai cho $1=\Pr(\Omega)=1+\sum_{k\ge2}\Pr(\emptyset)$, nên $\sum_{k\ge2}\Pr(\emptyset)=0$. Mỗi số hạng không âm theo tiên đề thứ nhất, nên $\Pr(\emptyset)=0$.

**Cộng tính cho hai biến cố.** Nếu $E_1,E_2\in\mathcal F$ rời nhau, áp tiên đề thứ ba cho dãy $E_1,E_2,\emptyset,\emptyset,\ldots$ và dùng câu (a): $\Pr(E_1\cup E_2)=\Pr(E_1)+\Pr(E_2)$.

**Các biến cố trung gian.** Với $E,E'\in\mathcal F$: $E\cap E'=\Omega\setminus\bigl((\Omega\setminus E)\cup(\Omega\setminus E')\bigr)\in\mathcal F$, và $E'\setminus E=E'\cap(\Omega\setminus E)\in\mathcal F$.

**Câu (b).** Khi $E\subseteq E'$, $E'=E\cup(E'\setminus E)$ với hai phần rời nhau, nên $\Pr(E')=\Pr(E)+\Pr(E'\setminus E)\ge\Pr(E)$ theo tiên đề thứ nhất.

**Câu (c).** $E\cup E'=E\cup(E'\setminus E)$ và $E'=(E\cap E')\cup(E'\setminus E)$, mỗi đẳng thức với hai phần rời nhau. Do đó $\Pr(E\cup E')=\Pr(E)+\Pr(E'\setminus E)$ và $\Pr(E')=\Pr(E\cap E')+\Pr(E'\setminus E)$. Trừ đẳng thức thứ hai khỏi đẳng thức thứ nhất được kết luận.

**Kiểm tra lại.** Gieo một xúc xắc đều như Ví dụ 00.25, $E=\{2,4,6\}$, $E'=\{4,5,6\}$: $\Pr(E\cup E')=4/6$, còn $3/6+3/6-2/6=4/6$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 5; dùng tính tuyến tính của kỳ vọng và định nghĩa hiệp phương sai.

::: exercise Bài tập 00.12 (Phương sai của một tổng; Murphy (2022), Bài 2.6, tr. 75)
Cho hai biến ngẫu nhiên $U$, $V$ với $\mathbb E[U^2]<\infty$ và $\mathbb E[V^2]<\infty$. Chỉ dùng Định nghĩa 00.56, 00.67 và Mệnh đề 00.66, chứng minh rằng
$$
\begin{aligned}
&\operatorname{Var}(U+V)\\
&\quad=\operatorname{Var}(U)+\operatorname{Var}(V)\\
&\qquad+2\operatorname{Cov}(U,V),
\end{aligned}
$$
trong đó $\operatorname{Cov}(U,V)$ là hiệp phương sai của $U$ và $V$ theo Định nghĩa 00.67.
:::

::: hint Gợi ý 1
Đặt $\mu_U=\mathbb E[U]$, $\mu_V=\mathbb E[V]$ và tính $\mathbb E[U+V]$ bằng kết luận 1 của Mệnh đề 00.66.
:::

::: hint Gợi ý 2
Viết $U+V-\mathbb E[U+V]=(U-\mu_U)+(V-\mu_V)$, bình phương rồi lấy kỳ vọng từng số hạng.
:::

::: solution Lời giải Bài tập 00.12
**Khai triển.** Theo kết luận 1 của Mệnh đề 00.66, $\mathbb E[U+V]=\mu_U+\mu_V$, nên theo Định nghĩa 00.56,
$$
\begin{aligned}
&\operatorname{Var}(U+V)\\
&\quad=\mathbb E\bigl[(U-\mu_U+V-\mu_V)^2\bigr]\\
&\quad=\mathbb E\bigl[(U-\mu_U)^2\bigr]\\
&\qquad+\mathbb E\bigl[(V-\mu_V)^2\bigr]\\
&\qquad+2\,\mathbb E\bigl[(U-\mu_U)(V-\mu_V)\bigr]\\
&\quad=\operatorname{Var}(U)+\operatorname{Var}(V)\\
&\qquad+2\operatorname{Cov}(U,V).
\end{aligned}
$$
Đẳng thức thứ hai dùng kết luận 1 của Mệnh đề 00.66, đẳng thức cuối dùng Định nghĩa 00.56 và 00.67. Ba kỳ vọng đều hữu hạn, vì $\lvert(U-\mu_U)(V-\mu_V)\rvert\le\tfrac12\bigl((U-\mu_U)^2+(V-\mu_V)^2\bigr)$.

**Kiểm tra lại.** Theo kết luận 3 của Mệnh đề 00.68 với $Z=(U,V)^T$, $a=(1,1)^T$: $\operatorname{Var}(U+V)=a^T\Sigma a=\Sigma_{11}+2\Sigma_{12}+\Sigma_{22}$, cùng kết quả. Với $V=U$: $\operatorname{Var}(2U)=4\operatorname{Var}(U)$, khớp kết luận 3 của Mệnh đề 00.57.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 2, 3; nhận ra một bài toán bình phương nhỏ nhất với ma trận thiết kế một cột và xác định số nghiệm của nó.

::: exercise Bài tập 00.13 (Xấp xỉ bằng vector hằng theo chuẩn $\ell_2$; Boyd và Vandenberghe, Bài 6.2, tr. 344)
Cho $y\in\mathbb R^m$ và $\mathbb 1=(1,\ldots,1)^T\in\mathbb R^m$. Tìm nghiệm của *bài toán xấp xỉ theo chuẩn* (norm approximation) với một biến vô hướng: cực tiểu hóa $\lVert w\mathbb 1-y\rVert_2$ theo $w\in\mathbb R$.
:::

::: hint Gợi ý 1
Hàm $t\mapsto\tfrac12t^2$ tăng chặt trên $[0,\infty)$; so tập nghiệm của bài toán với tập nghiệm của bài toán cực tiểu hóa $\tfrac12\lVert w\mathbb 1-y\rVert_2^2$.
:::

::: hint Gợi ý 2
Bài toán thứ hai là bài toán của Định nghĩa 00.21 với ma trận thiết kế $X=\mathbb 1\in\mathbb R^{m\times1}$. Viết phương trình chuẩn (4.1) và tính $\mathbb 1^T\mathbb 1$, $\mathbb 1^Ty$.
:::

::: solution Lời giải Bài tập 00.13
**Đưa về bình phương nhỏ nhất.** Vì $\lVert w\mathbb 1-y\rVert_2\ge0$ và $t\mapsto\tfrac12t^2$ tăng chặt trên $[0,\infty)$, $w$ cực tiểu hóa $\lVert w\mathbb 1-y\rVert_2$ khi và chỉ khi $w$ cực tiểu hóa $f(w)=\tfrac12\lVert Xw-y\rVert_2^2$ với $X=\mathbb 1\in\mathbb R^{m\times1}$.

**Nghiệm.** $\operatorname{rank}(\mathbb 1)=1$, bằng số cột của $X$, nên theo kết luận 3 của Định lý 00.22, nghiệm duy nhất là
$$
w^\star=(\mathbb 1^T\mathbb 1)^{-1}\mathbb 1^Ty=\frac1m\sum_{i=1}^my_i ,
$$
trung bình các thành phần của $y$.

**Kiểm tra lại.** Phần dư $r(w^\star)=w^\star\mathbb 1-y$ thỏa $\mathbb 1^Tr(w^\star)=mw^\star-\sum_iy_i=0$, đúng với kết luận 1 của Định lý 00.22. Với giá bốn căn nhà $y=(11,12,14,19)^T$ của Ví dụ 00.1, $w^\star=56/4=14$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 1; dùng tích vô hướng, chuẩn $\ell_2$ và bất đẳng thức Cauchy–Schwarz để tính một khoảng cách hình học.

::: exercise Bài tập 00.14 (Khoảng cách giữa hai siêu phẳng song song; Boyd và Vandenberghe, Bài 2.5, tr. 60)
*Khoảng cách* (distance) giữa hai tập khác rỗng $C_1,C_2\subseteq\mathbb R^n$ là
$$
\begin{aligned}
&\operatorname{dist}(C_1,C_2)\\
&\quad=\inf_{x\in C_1,\ x'\in C_2}\lVert x-x'\rVert_2 ,
\end{aligned}
$$
với $\inf$ là cận dưới đúng (infimum).
Cho $v\in\mathbb R^n$, $v\ne0$, và $\beta_1,\beta_2\in\mathbb R$. Tính khoảng cách giữa hai siêu phẳng song song $C_1=\{x\in\mathbb R^n:\ v^Tx=\beta_1\}$ và $C_2=\{x\in\mathbb R^n:\ v^Tx=\beta_2\}$.
:::

::: hint Gợi ý 1
Với $x\in C_1$ và $x'\in C_2$, tính $v^T(x-x')$. Kết luận 1 của Mệnh đề 00.5 cho một cận dưới của $\lVert x-x'\rVert_2$.
:::

::: hint Gợi ý 2
Để thấy cận dưới đạt được, xét hai điểm trên đường thẳng $\operatorname{span}\{v\}$, dạng $x=t_1v$ và $x'=t_2v$, rồi chọn $t_1$, $t_2$ sao cho $x\in C_1$, $x'\in C_2$.
:::

::: solution Lời giải Bài tập 00.14
**Cận dưới.** Với $x\in C_1$ và $x'\in C_2$, $v^T(x-x')=\beta_1-\beta_2$, và kết luận 1 của Mệnh đề 00.5 cho
$$
\begin{aligned}
\lvert\beta_1-\beta_2\rvert&=\lvert v^T(x-x')\rvert\\
&\le\lVert v\rVert_2\,\lVert x-x'\rVert_2 .
\end{aligned}
$$
Vì $v\ne0$, $\lVert x-x'\rVert_2\ge\lvert\beta_1-\beta_2\rvert/\lVert v\rVert_2$ với mọi cặp $(x,x')$, nên khoảng cách không nhỏ hơn số này.

**Cận dưới đạt được.** Đặt $x=\dfrac{\beta_1}{\lVert v\rVert_2^2}v$ và $x'=\dfrac{\beta_2}{\lVert v\rVert_2^2}v$. Khi đó $v^Tx=\beta_1$ và $v^Tx'=\beta_2$, nên $x\in C_1$, $x'\in C_2$, và
$$
\begin{aligned}
\lVert x-x'\rVert_2&=\frac{\lvert\beta_1-\beta_2\rvert}{\lVert v\rVert_2^2}\lVert v\rVert_2\\
&=\frac{\lvert\beta_1-\beta_2\rvert}{\lVert v\rVert_2}.
\end{aligned}
$$
Vậy
$$
\operatorname{dist}(C_1,C_2)=\frac{\lvert\beta_1-\beta_2\rvert}{\lVert v\rVert_2}.
$$

**Kiểm tra lại.** Với $n=2$, $v=(0,1)^T$, $\beta_1=1$, $\beta_2=3$: hai đường thẳng $x_2=1$ và $x_2=3$ cách nhau $2$, và công thức cho $\lvert1-3\rvert/1=2$. Dấu bằng trong Cauchy–Schwarz xảy ra vì $x-x'$ là bội của $v$, đúng với điều kiện của Mệnh đề 00.5.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 3; nối phương trình chuẩn dạng ma trận với điều kiện đạo hàm riêng bằng không.

::: exercise Bài tập 00.15 (Phương trình chuẩn dạng ma trận và dạng vô hướng; Kupferschmid, Bài 8.8.28, tr. 332)
*Hồi quy tuyến tính đơn* (simple linear regression) gồm:

- $m$ cặp dữ liệu $(a_i,y_i)$, $i=1,\ldots,m$, với đặc trưng $a_i$ và giá trị quan sát $y_i$;
- mô hình $\hat y_i=w_0+w_1a_i$;
- mất mát bình phương $\sum_i(y_i-w_0-w_1a_i)^2$.

Đặt
$$
\begin{gathered}
y=\begin{pmatrix}y_1\\\vdots\\y_m\end{pmatrix},\quad
w=\begin{pmatrix}w_0\\w_1\end{pmatrix},\\
X=\begin{bmatrix}1&a_1\\\vdots&\vdots\\1&a_m\end{bmatrix}.
\end{gathered}
$$
Đặt các đạo hàm riêng của $\sum_i(y_i-w_0-w_1a_i)^2$ theo $w_1$ và $w_0$ bằng $0$ được hai *phương trình chuẩn dạng vô hướng* (scalar normal equations)
$$
\begin{aligned}
&-\sum_{i=1}^ma_iy_i+w_1\sum_{i=1}^ma_i^2\\
&\qquad+w_0\sum_{i=1}^ma_i=0,\\
&-\sum_{i=1}^my_i+w_1\sum_{i=1}^ma_i+mw_0=0.
\end{aligned}
$$

- **(a)** Viết phương trình chuẩn dạng ma trận của bài toán.
- **(b)** Dùng định nghĩa của $y$, $X$, $w$ để chứng minh rằng phương trình chuẩn dạng ma trận tương đương với hai phương trình chuẩn dạng vô hướng.
:::

::: hint Gợi ý 1
Câu (a): dùng Định lý 00.22. Câu (b): theo Định nghĩa 00.3, phần tử $(j,k)$ của $X^TX$ là tích vô hướng của cột $j$ và cột $k$ của $X$, như Ví dụ 00.13; tương tự cho $X^Ty$.
:::

::: hint Gợi ý 2
Câu (b): cột thứ nhất của $X$ là $\mathbb 1$, cột thứ hai là $a=(a_1,\ldots,a_m)^T$. Viết hai hàng của $X^TXw=X^Ty$ rồi so với hai phương trình chuẩn dạng vô hướng.
:::

::: solution Lời giải Bài tập 00.15
**Câu (a).** Theo Định lý 00.22, phương trình chuẩn là $X^TXw=X^Ty$, tức $X^Tr(w)=0$ với $r(w)=Xw-y$. Theo Mệnh đề 00.45, đây là điều kiện $\nabla f(w)=0$ của $f(w)=\tfrac12\lVert Xw-y\rVert_2^2$.

**Câu (b).** Cột thứ nhất của $X$ là $\mathbb 1$, cột thứ hai là $a=(a_1,\ldots,a_m)^T$. Theo Định nghĩa 00.3,
$$
\begin{gathered}
X^TX=\begin{bmatrix}m&\sum_ia_i\\\sum_ia_i&\sum_ia_i^2\end{bmatrix},\\
X^Ty=\begin{pmatrix}\sum_iy_i\\\sum_ia_iy_i\end{pmatrix}.
\end{gathered}
$$
Hệ $X^TXw=X^Ty$ gồm hai phương trình
$$
\begin{aligned}
mw_0+w_1\sum_ia_i&=\sum_iy_i,\\
w_0\sum_ia_i+w_1\sum_ia_i^2&=\sum_ia_iy_i .
\end{aligned}
$$
Chuyển vế phải sang trái: phương trình thứ nhất là phương trình chuẩn dạng vô hướng thứ hai, phương trình thứ hai là phương trình chuẩn dạng vô hướng thứ nhất. Mỗi bước là phép biến đổi tương đương, nên hai dạng có cùng tập nghiệm $w$.

**Kiểm tra lại.** $\sum_i(y_i-w_0-w_1a_i)^2=2f(w)$, nên theo Mệnh đề 00.45 các đạo hàm riêng theo $w_0$, $w_1$ là $2(\mathbb 1^Tr(w))$ và $2(a^Tr(w))$; đặt chúng bằng $0$ là hai hàng của $X^Tr(w)=0$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 5; kiểm tra độc lập và độc lập có điều kiện từ bảng phân phối đồng thời.

::: exercise Bài tập 00.16 (Độc lập của hai biến nhị phân; Koller và Friedman, Bài 2.2, tr. 39)
- **(a)** Cho $U$, $V$ là hai biến ngẫu nhiên nhị phân nhận giá trị trong $\{0,1\}$. Chứng minh rằng nếu biến cố $\{U=0\}$ và $\{V=0\}$ độc lập, tức $p_{U,V}(0,0)=p_U(0)\,p_V(0)$, thì $U$ và $V$ độc lập theo Định nghĩa 00.62.
- **(b)** Chỉ ra một phản ví dụ cho khẳng định ở câu (a) khi các biến không nhị phân.
- **(c)** Cho $U$, $V$ như câu (a) và $T$ là biến nhị phân nhận giá trị trong $\{0,1\}$, với $p_T(0)>0$. Xác định xem đẳng thức $p_{U,V\mid T}(u,v\mid0)=p_{U\mid T}(u\mid0)\,p_{V\mid T}(v\mid0)$ với mọi $(u,v)$ có kéo theo $U$ và $V$ độc lập có điều kiện khi biết $T$ hay không; chứng minh hoặc chỉ ra phản ví dụ.
:::

::: hint Gợi ý 1
Câu (a): dùng Định nghĩa 00.60 để biểu diễn $p_{U,V}(0,1)$ và $p_{U,V}(1,0)$ qua $p_U(0)$, $p_V(0)$ và $p_{U,V}(0,0)$; ô $(1,1)$ suy ra từ tổng bằng $1$. Câu (b): cho ít nhất một biến nhận ba giá trị và chọn vài kết quả đồng khả năng. Câu (c): đọc lại điều kiện "với mọi $t$ có $p_T(t)>0$" của Định nghĩa 00.62.
:::

::: hint Gợi ý 2
Câu (b): chọn bốn kết quả đồng khả năng sao cho $p_{U,V}(0,0)=\tfrac14$ và $p_U(0)=p_V(0)=\tfrac12$; khi đó đẳng thức đúng tại $(0,0)$. Kiểm tra một ô khác. Câu (c): dựng bảng có điều kiện thỏa đẳng thức của đề khi $T=0$, còn khi $T=1$ thì $U=V$.
:::

::: solution Lời giải Bài tập 00.16
**Câu (a).** Ký hiệu $p_{00}=p_{U,V}(0,0)=p_U(0)p_V(0)$. Theo Định nghĩa 00.60,
$$
\begin{aligned}
p_{U,V}(0,1)&=p_U(0)-p_{00}\\
&=p_U(0)\bigl(1-p_V(0)\bigr)\\
&=p_U(0)\,p_V(1),\\
p_{U,V}(1,0)&=p_V(0)-p_{00}\\
&=\bigl(1-p_U(0)\bigr)p_V(0)\\
&=p_U(1)\,p_V(0).
\end{aligned}
$$
Tổng bốn ô bằng $1$, nên
$$
\begin{aligned}
p_{U,V}(1,1)&=1-p_U(0)\\
&\quad-p_U(1)\,p_V(0)\\
&=p_U(1)\bigl(1-p_V(0)\bigr)\\
&=p_U(1)\,p_V(1).
\end{aligned}
$$
Cả bốn ô bằng tích hai biên, nên $U$ và $V$ độc lập theo Định nghĩa 00.62.

**Câu (b).** Cho $U,V\in\{0,1,2\}$ với bốn cặp đồng khả năng $(0,0)$, $(0,1)$, $(1,0)$, $(2,2)$, mỗi cặp có xác suất $\tfrac14$. Khi đó $p_U(0)=p_V(0)=\tfrac12$, $p_U(1)=p_U(2)=p_V(1)=p_V(2)=\tfrac14$, và $p_{U,V}(0,0)=\tfrac14=p_U(0)p_V(0)$. Nhưng $p_{U,V}(1,0)=\tfrac14\ne\tfrac18=p_U(1)p_V(0)$, nên $U$ và $V$ không độc lập.

**Câu (c).** Không kéo theo. Cho $p_T(0)=p_T(1)=\tfrac12$. Khi $T=0$, bốn cặp $(u,v)\in\{0,1\}^2$ đồng khả năng, mỗi cặp có xác suất có điều kiện $\tfrac14$; khi $T=1$, $U=V$ với $p_{U,V\mid T}(0,0\mid1)=p_{U,V\mid T}(1,1\mid1)=\tfrac12$. Với $t=0$, mọi ô bằng $\tfrac14=\tfrac12\cdot\tfrac12$, nên đẳng thức của đề đúng. Với $t=1$, $p_{U,V\mid T}(0,0\mid1)=\tfrac12\ne\tfrac14=p_{U\mid T}(0\mid1)\,p_{V\mid T}(0\mid1)$, nên $U$ và $V$ không độc lập có điều kiện khi biết $T$.

**Kiểm tra lại.** Câu (b): bảng có các hàng $u=0$: $(\tfrac14,\tfrac14,0)$, $u=1$: $(\tfrac14,0,0)$, $u=2$: $(0,0,\tfrac14)$, tổng bằng $1$; ô $(2,0)$ bằng $0\ne\tfrac18=p_U(2)p_V(0)$ cũng cho phụ thuộc. Câu (c): bảng đồng thời của $(U,V,T)$ có tổng $4\cdot\tfrac18+2\cdot\tfrac14=1$.
:::

## Tài liệu tham khảo

- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press: Bài 2.5 (Chương 2, mục Exercises), Bài 6.2 (Chương 6, mục Exercises).
- Kupferschmid, Michael (2023), *Introduction to Mathematical Programming*: Bài 8.8.28 (§8.8; định nghĩa của $y$, $X$, $w$ ở §8.6.1, tr. 307–308), Bài 10.9.2, 10.9.31, 10.9.33 (§10.9), Bài 11.7.22(a), 11.7.24(a)(b) (§11.7), Bài 28.9.6, 28.9.10, 28.9.15, 28.9.22(b)(c) (§28.9).
- Koller, Daphne; Friedman, Nir (2009), *Probabilistic Graphical Models: Principles and Techniques*, MIT Press: Bài 2.1, 2.2 (§2.4).
- Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả: Bài 2.6 (§2.9).
