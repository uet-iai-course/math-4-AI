# Bài 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

Bài 03 chứng nhận nghiệm của bài toán lồi khả vi bằng hệ điều kiện Karush–Kuhn–Tucker (KKT): một bộ điểm và nhân tử thỏa hệ cho nghiệm toàn cục (Định lý 03.32). Ví dụ 03.18(b) và Ví dụ 03.19 giải hệ đó trực tiếp, vì khi mục tiêu bậc hai, hệ KKT (Ví dụ 03.18(b)) hoặc điều kiện dừng với nhân tử cố định (Ví dụ 03.19) là hệ tuyến tính. Khi mục tiêu không bậc hai, điều kiện dừng là hệ phi tuyến, như phương trình $\frac{e^w-2}{1+e^w}+w=0$ của hồi quy logistic có chính quy hóa trên ba mẫu, và hệ đó không giải được bằng biến đổi đại số. Câu hỏi trung tâm của Bài 04 là: **với bài toán không ràng buộc và bài toán chỉ có ràng buộc đẳng thức, làm thế nào sinh một dãy điểm tiến tới nghiệm của hệ KKT sao cho mục tiêu giảm ở mỗi bước, và khi nào một điểm lặp được chứng nhận là đủ gần nghiệm.** Để trả lời, chúng ta xây dựng bốn nhóm đối tượng, bao gồm:

- hướng giảm, quay lui Armijo và hạ gradient, cùng các cận hội tụ;
- hướng Newton, độ giảm Newton và tốc độ hội tụ của phương pháp Newton;
- hai phương pháp Newton cho ràng buộc đẳng thức, từ điểm khả thi và từ điểm chưa khả thi;
- tính tự điều chỉnh và cận sai số theo độ giảm Newton (đọc thêm).

## Câu hỏi mở đầu

Xét hàm $\varphi(s)=s-\log s$ trên $s>0$, lồi chặt, với giá trị nhỏ nhất $\varphi^*$ đạt tại một điểm $s^*$. Tại $s^0=\tfrac14$, ta có $\varphi'(\tfrac14)=-3$ và $\varphi''(\tfrac14)=16$, nên parabol có cùng giá trị, cùng đạo hàm bậc nhất và bậc hai với $\varphi$ tại $s^0$ là

$$
q(s)=\varphi(\tfrac14)-3\bigl(s-\tfrac14\bigr)+8\bigl(s-\tfrac14\bigr)^2 .
$$

Parabol đạt cực tiểu tại $s=\tfrac7{16}$ và dự báo $\varphi$ giảm $q(\tfrac14)-q(\tfrac7{16})=\tfrac9{32}\approx0{,}28$.

**Câu hỏi.** Mức giảm dự báo $\tfrac9{32}$, tính tại $s^0$ mà không cần biết $s^*$, có dùng được làm cận trên của sai số $\varphi(\tfrac14)-\varphi^*$ không?

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Viết hệ điều kiện tối ưu rút gọn cho bài toán không ràng buộc và bài toán có ràng buộc đẳng thức, và chứng minh hệ đó vừa cần vừa đủ khi mục tiêu lồi.
2. Lập bài toán con bậc hai tại một điểm lặp và suy ra hướng ngược gradient, hướng dốc nhất theo chuẩn có trọng số và hướng Newton.
3. Thực hiện bằng số một vòng lặp hạ gradient và một vòng lặp Newton với quay lui Armijo, phân biệt mức giảm của mô hình, mức giảm thực tế và sai số mục tiêu.
4. Chứng minh các cận hội tụ của hạ gradient, phát biểu tốc độ hội tụ của phương pháp Newton, và nêu giả thiết của từng kết quả.
5. Lập và giải hệ Newton cho bài toán có ràng buộc đẳng thức từ điểm khả thi, bằng hệ khối và bằng khử biến, và từ điểm chưa khả thi.
6. Xác định điều mỗi tiêu chí dừng (chuẩn gradient, mức giảm mô hình, chuẩn phần dư) chứng nhận trên ba mô hình học của bài, cùng giả thiết của từng chứng nhận.

## Kiến thức tiên quyết

Bài 04 dùng các kết quả sau của Bài 00, Bài 01 và Bài 03.

- **Gradient, Hessian và khai triển Taylor** (Định lý 00.40, Hệ quả 00.39, Mệnh đề 00.38). Với $f$ lớp $C^2$ trên tập mở chứa $[x,x+d]$, $f(x+d)=f(x)+\nabla f(x)^Td+\tfrac12d^T\nabla^2f(x)d+o(\lVert d\rVert_2^2)$, $\nabla f(x+d)-\nabla f(x)=\bigl(\int_0^1\nabla^2f(x+\varsigma d)\,d\varsigma\bigr)d$, và $\frac{d}{dt}f(x+td)=\nabla f(x+td)^Td$.
- **Điều kiện cần bậc nhất** (Định lý 00.42; Nhận xét 01.14). Nếu $f$ khả vi tại một điểm trong $x^*$ của miền và $x^*$ là điểm cực tiểu địa phương thì $\nabla f(x^*)=0$.
- **Hàm lồi chặt, tập mức dưới** (Định nghĩa 01.21, 01.23). Hàm $f$ lồi chặt (còn gọi là lồi nghiêm ngặt) nếu bất đẳng thức lồi là chặt với mọi $x\ne y$ và $\vartheta\in(0,1)$. Tập mức dưới của $f$ ứng với mức $c$ là $\{x\mid f(x)\le c\}$.
- **Điều kiện bậc nhất và bậc hai** (Định lý 01.25, Hệ quả 01.26, Định lý 01.29).
  - Hàm khả vi $f$ trên tập mở lồi là lồi khi và chỉ khi $f(y)\ge f(x)+\nabla f(x)^T(y-x)$ với mọi $x,y$.
  - Nếu $f$ lồi, khả vi trên tập mở lồi $D$ và $\nabla f(x^*)=0$ thì $x^*$ là điểm cực tiểu toàn cục trên $D$.
  - Hàm lớp $C^2$ trên tập mở lồi là lồi khi và chỉ khi Hessian nửa xác định dương mọi nơi; Hessian xác định dương mọi nơi cho lồi chặt.
- **Hạn chế lên đường thẳng** (Bổ đề 01.27). $f$ lồi khi và chỉ khi mọi hàm $t\mapsto f(x+tv)$ lồi.
- **Phép bảo toàn tính lồi** (Định lý 01.30). Tổng có hệ số không âm và hợp với ánh xạ affine của hàm lồi là lồi.
- **Tính duy nhất và sự tồn tại** (Định lý 01.34, 01.35). Hàm lồi chặt có nhiều nhất một điểm cực tiểu; hàm liên tục trên tập không rỗng, đóng, bị chặn đạt giá trị nhỏ nhất.
- **Hàm lồi mạnh** (Định nghĩa 01.39, Nhận xét 01.40, Hệ quả 01.41). $f$ lồi mạnh với hằng số $\mu>0$ nếu $f-\tfrac\mu2\lVert\cdot\rVert_2^2$ lồi, tương đương $\nabla^2f\succeq\mu I$ khi $f$ lớp $C^2$; hàm lồi mạnh khả vi trên $\mathbb R^n$ có đúng một điểm cực tiểu.
- **Hồi quy logistic và chính quy hóa** (Định nghĩa 01.7, Mệnh đề 01.8, Định nghĩa 01.42, Mệnh đề 01.46, Ví dụ 01.8). Mất mát logistic của biên $m$ là $\ell(m)=\log(1+e^{-m})$, với $\ell''(m)=\sigma(m)(1-\sigma(m))\in(0,\tfrac14]$, $\sigma(z)=1/(1+e^{-z})$; bài toán có chính quy hóa có đúng một nghiệm. Bài 01 viết $L$, $L_\mu$; Bài 04 viết $J(w)=\sum_i\ell(m_i)+\tfrac\rho2\lVert w\rVert_2^2$ với $\rho>0$, $J_0$ khi $\rho=0$, và dành $L$ cho hằng số Lipschitz.
- **Hàm Lagrange, đối ngẫu và hệ KKT** (Định nghĩa 03.4, 03.5, 03.12, 03.29, Định lý 03.8). Với bài toán $\min f_0(x)$, $f_i(x)\le0$, $Ax=b$, hàm Lagrange là $f_0(x)+\sum_i\lambda_if_i(x)+\nu^T(Ax-b)$ (Bài 03 viết $L$, Bài 04 viết $\mathcal L$); cận dưới đúng của nó theo $x$ là hàm đối ngẫu, không vượt $p^*$ khi $\lambda\ge0$. Hệ KKT gồm khả thi gốc, khả thi đối ngẫu $\lambda\ge0$, bù trừ $\lambda_if_i(x)=0$ và dừng $\nabla f_0(x)+\sum_i\lambda_i\nabla f_i(x)+A^T\nu=0$.
- **KKT và độ nhạy** (Định lý 03.32, Hệ quả 03.31, 03.24).
  - Với bài toán lồi khả vi, kể cả khi miền là tập mở lồi, một bộ thỏa hệ KKT cho nghiệm gốc.
  - Với bài toán lồi có điểm Slater, mọi nghiệm có nhân tử KKT.
  - Khi giá trị tối ưu $p^*(v)$ của bài toán nhiễu $Ax-b=v$ khả vi tại $0$, $\nu_j^*=-\partial p^*/\partial v_j(0)$.
- **Đại số tuyến tính** (Định lý 00.16, Mệnh đề 00.18, Hệ quả 00.19, Định nghĩa 00.25, Mệnh đề 00.5, Mệnh đề 00.8). Ma trận đối xứng $Q\succ0$ khả nghịch, có căn bậc hai đối xứng $Q^{1/2}\succ0$ và phân rã Cholesky $Q=R^TR$. Cauchy–Schwarz: $\lvert a^Tb\rvert\le\lVert a\rVert_2\lVert b\rVert_2$. Phần bù trực giao của *không gian hạt nhân* (null space) $\ker A=\{d\mid Ad=0\}$ là không gian cột $\operatorname{Col}(A^T)$ (Mệnh đề 00.8 áp cho $A^T$); nếu các hàng của $A\in\mathbb R^{p\times n}$ độc lập tuyến tính thì $A^Tv=0$ kéo theo $v=0$ và $\dim\ker A=n-p$.
- **Chuẩn phổ** (Boyd và Vandenberghe 2004, §A.1.5, tr. 636). *Chuẩn phổ* (spectral norm) của ma trận là $\lVert M\rVert_2=\max_{\lVert v\rVert_2=1}\lVert Mv\rVert_2$; với $M$ đối xứng, $\lVert M\rVert_2=\max_i\lvert\lambda_i(M)\rvert$.

**Câu hỏi ôn nhanh.**

1. Cho $P\in\mathbb R^{n\times n}$ đối xứng và $q\in\mathbb R^n$. Tính gradient và Hessian của $f(x)=\tfrac12x^TPx+q^Tx$.
2. Với $A=[1\ \ 1]$, xác định $\ker A$ và một vector cơ sở của nó.
3. Chứng minh $\begin{bmatrix}2&1\\1&2\end{bmatrix}\succ0$ bằng hai định thức con chính và giải hệ $\begin{bmatrix}2&1\\1&2\end{bmatrix}d=-\begin{bmatrix}3\\0\end{bmatrix}$.

::: hint Lời giải câu hỏi ôn nhanh
1. $\nabla f(x)=Px+q$ và $\nabla^2f(x)=P$.
2. $\ker A=\{d\mid d_1+d_2=0\}$, một vector cơ sở là $(-1,1)^T$.
3. Hai định thức con chính là $2>0$ và $4-1=3>0$, nên ma trận xác định dương. Hệ $2d_1+d_2=-3$, $d_1+2d_2=0$ cho $d=(-2,1)^T$; thử lại: $2(-2)+1=-3$ và $-2+2=0$.
:::

## 1. Thiết lập bài toán

Hệ KKT mô tả nghiệm bằng phương trình; với phương trình phi tuyến như điều kiện dừng của hồi quy logistic, chúng ta cần một dãy điểm $x^0,x^1,x^2,\ldots$, mỗi điểm tính từ điểm trước bằng hữu hạn phép tính, tiến dần tới nghiệm. Ví dụ sau xét điều kiện dừng đó trên dữ liệu của Ví dụ 01.8.

::: example Ví dụ 04.1 (Khoanh vùng nghiệm của điều kiện dừng)
**Dữ kiện.** Ba mẫu một chiều của Ví dụ 01.8: $(a,y)=(1,+1)$, $(-1,-1)$, $(1,-1)$; hệ số $\rho=1$.

**Mất mát và điều kiện dừng.** Biên có dấu là $w$, $w$ và $-w$, nên

$$
\begin{aligned}
J(w)&=2\log(1+e^{-w})\\
&\quad+\log(1+e^{w})+\tfrac12w^2,\\
J'(w)&=\frac{e^w-2}{1+e^w}+w .
\end{aligned}
$$

Theo Mệnh đề 01.46(b), $J$ có đúng một điểm cực tiểu, và vì $J''(w)=3\sigma(w)(1-\sigma(w))+1>0$, điểm đó là nghiệm duy nhất của $J'(w)=0$.

**Khoanh vùng nghiệm.** $J'(0)=-\tfrac12<0$ và $J'(1)=\frac{e-2}{e+1}+1\approx1{,}1932>0$. Hàm $J'$ liên tục và tăng chặt, nên nghiệm nằm trong $(0,1)$. Phương trình $J'(w)=0$, tức $e^w(1+w)=2-w$, chứa đồng thời $e^w$ và $w$, nên không biến đổi đại số được về dạng $w=\ldots$; ta xác định nghiệm xấp xỉ.

**Kiểm tra lại.** $J'(0{,}2865)\approx-8{,}3\cdot10^{-5}<0$ và $J'(0{,}2866)\approx9{,}1\cdot10^{-5}>0$, nên nghiệm nằm trong $(0{,}2865;\,0{,}2866)$.
:::

Bài 04 xét hai lớp bài toán không có ràng buộc bất đẳng thức, nên hai nhóm khả thi đối ngẫu và bù trừ của Định nghĩa 03.29 biến mất và hệ KKT chỉ còn phương trình.

::: definition Định nghĩa 04.1 (Bài toán không ràng buộc và bài toán có ràng buộc đẳng thức)
**Bài toán không ràng buộc.** Cho tập mở lồi $\operatorname{dom}f\subseteq\mathbb R^n$ và hàm $f:\operatorname{dom}f\to\mathbb R$ lồi, lớp $C^2$. Bài toán là

$$
\underset{x\in\operatorname{dom}f}{\operatorname{minimize}}\quad f(x),
$$

với giá trị tối ưu $f^*=\inf_{x\in\operatorname{dom}f}f(x)$.

**Bài toán có ràng buộc đẳng thức.** Cho tập mở lồi $\operatorname{dom}F\subseteq\mathbb R^n$, hàm $F:\operatorname{dom}F\to\mathbb R$ lồi, lớp $C^2$, ma trận $A\in\mathbb R^{p\times n}$ có các hàng độc lập tuyến tính và $b\in\mathbb R^p$. Bài toán là

$$
\begin{aligned}
&\underset{u\in\operatorname{dom}F}{\operatorname{minimize}}\quad F(u)\\
&\text{subject to}\quad Au=b,
\end{aligned}
$$

với giá trị tối ưu $F^*=\inf\{F(u)\mid u\in\operatorname{dom}F,\ Au=b\}$.
:::

Định nghĩa có ba loại giả thiết, bao gồm:

- **miền mở**: gradient xác định ở mọi nơi và không có điều kiện riêng tại biên;
- **tính lồi**: điều kiện dừng thành điều kiện đủ;
- **$A$ đủ hạng hàng** (các hàng độc lập tuyến tính): loại các ràng buộc thừa hoặc mâu thuẫn.

Định nghĩa 04.1 là trường hợp không có ràng buộc bất đẳng thức, với miền mở lồi, của bài toán gốc ở Bài 03; bài toán không ràng buộc là trường hợp $p=0$.

Hàm $\varphi(s)=s-\log s$ có miền mở $(0,\infty)$, nên điều kiện $s>0$ thuộc về miền và không được gán nhân tử. Bài toán $\min x$ với $x\ge0$ không thuộc hai lớp này: nghiệm $x=0$ nằm trên biên và đạo hàm tại đó bằng $1\ne0$.

Mọi phương pháp của bài hướng tới việc giải một hệ phương trình, và mệnh đề sau xác định hệ đó.

::: proposition Mệnh đề 04.2 (Hệ KKT rút gọn là điều kiện cần và đủ) — chứng minh đầy đủ
**Giả thiết.** Hai bài toán của Định nghĩa 04.1.

**Kết luận.**

- (a) Điểm $x^*\in\operatorname{dom}f$ là nghiệm của bài toán không ràng buộc khi và chỉ khi

$$
\nabla f(x^*)=0.
\tag{1.1}
$$

- (b) Điểm $u^*\in\operatorname{dom}F$ là nghiệm của bài toán có đẳng thức khi và chỉ khi tồn tại $\nu^*\in\mathbb R^p$ thỏa

$$
\begin{gathered}
\nabla F(u^*)+A^T\nu^*=0,\\
Au^*=b.
\end{gathered}
\tag{1.2}
$$

Vector $\nu^*$ khi đó là duy nhất.
:::

::: proof Chứng minh Mệnh đề 04.2
**Lộ trình.** Phần (a) ghép Định lý 00.42 với Hệ quả 01.26; phần (b) dùng bất đẳng thức lồi bậc nhất cho chiều đủ, các hướng của $\ker A$ cho chiều cần, và $A$ đủ hạng hàng cho tính duy nhất.

**Bước 1 (phần a).** Nếu $x^*$ là nghiệm thì nó là cực tiểu địa phương tại một điểm trong của miền mở, nên $\nabla f(x^*)=0$ theo điều kiện cần bậc nhất. Ngược lại, nếu $\nabla f(x^*)=0$ thì $x^*$ là cực tiểu toàn cục trên $\operatorname{dom}f$ theo Hệ quả 01.26, vì $f$ lồi, khả vi trên tập mở lồi.

**Bước 2 (phần b, chiều đủ).** Giả sử $(u^*,\nu^*)$ thỏa (1.2) và $u$ là một điểm khả thi bất kỳ. Hàm $F$ lồi nên theo Định lý 01.25,

$$
\begin{aligned}
F(u)&\ge F(u^*)\\
&\quad+\nabla F(u^*)^T(u-u^*)\\
&=F(u^*)-\nu^{*T}A(u-u^*)\\
&=F(u^*)-\nu^{*T}(b-b)\\
&=F(u^*).
\end{aligned}
$$

Trong đó, quan hệ thứ hai thay $\nabla F(u^*)=-A^T\nu^*$ từ phương trình dừng, còn quan hệ thứ ba dùng $Au=b$ và $Au^*=b$. Như vậy, $u^*$ là nghiệm.

**Bước 3 (phần b, chiều cần).** Giả sử $u^*$ là nghiệm và lấy $d\in\ker A$ bất kỳ. Vì miền mở, $u^*+td\in\operatorname{dom}F$ với mọi $\lvert t\rvert$ đủ nhỏ, và $A(u^*+td)=b$. Hàm một biến $t\mapsto F(u^*+td)$ đạt cực tiểu địa phương tại $t=0$, nên đạo hàm của nó tại $0$ bằng $0$: $\nabla F(u^*)^Td=0$. Như vậy $\nabla F(u^*)$ trực giao với mọi vector của $\ker A$, nên theo Mệnh đề 00.8, $\nabla F(u^*)\in\operatorname{Col}(A^T)$: có $\nu^*$ với $\nabla F(u^*)=-A^T\nu^*$, tức (1.2).

**Bước 4 (tính duy nhất của nhân tử).** Nếu $\nu_1$, $\nu_2$ cùng thỏa (1.2) thì $A^T(\nu_1-\nu_2)=0$, và vì các hàng của $A$ độc lập tuyến tính, $\nu_1=\nu_2$. $\square$
:::

Chiều đủ của Mệnh đề 04.2(b) là trường hợp riêng của Định lý 03.32; chiều cần ở Bài 03 dựa trên điều kiện Slater (Hệ quả 03.31), còn ở đây nó suy ra trực tiếp từ các hướng khả thi của $\ker A$.

**Trong học máy.** Huấn luyện hồi quy logistic có chính quy hóa là bài toán không ràng buộc theo vector tham số $w$, và Mệnh đề 04.2(a) xác định đích của thuật toán huấn luyện là giải $\nabla f=0$ khi mất mát lồi. Với mạng sâu, mất mát không lồi, nên $\nabla f=0$ chỉ là điều kiện cần.

::: example Ví dụ 04.2 (Hệ KKT rút gọn của bài toán Ví dụ 03.18(b))
**Dữ kiện.** $F(u)=u_1^2+u_2^2$, $A=[1\ \ 2]$, $b=5$.

**Hệ (1.2).**

$$
\begin{gathered}
2u_1+\nu=0,\\
2u_2+2\nu=0,\\
u_1+2u_2=5 .
\end{gathered}
$$

Hai phương trình đầu cho $u=(-\tfrac\nu2,-\nu)^T$; thay vào phương trình thứ ba: $-\tfrac{5\nu}2=5$, nên $\nu^*=-2$ và $u^*=(1,2)^T$.

**Kiểm tra lại.** $\nabla F(u^*)=(2,4)^T$ và $A^T\nu^*=(-2,-4)^T$, tổng bằng $0$. Điểm khả thi $(5,0)^T$ cho $F=25>5=F(u^*)$, khớp với chiều đủ.
:::

::: remark Nhận xét 04.3 (Khi bỏ giả thiết; nhân tử của đẳng thức tự do dấu)
Vai trò của mỗi giả thiết thể hiện khi lần lượt bỏ từng giả thiết:

- bỏ tính lồi thì chiều đủ không còn đúng: $f(x)=x^3$ có $f'(0)=0$ nhưng $0$ không là điểm cực tiểu;
- bỏ miền mở thì chiều cần không còn đúng, như bài toán $\min x$ với $x\ge0$;
- bỏ giả thiết $A$ đủ hạng hàng thì $\nu^*$ không duy nhất: với hai hàng trùng nhau $u_1+2u_2=5$ trong bài toán của Ví dụ 04.2, mọi cặp $(\nu_1,\nu_2)$ với $\nu_1+\nu_2=-2$ đều thỏa (1.2).

Trong (1.2) không có điều kiện $\nu^*\ge0$. Một đẳng thức $a^Tu=\beta$ tương đương cặp bất đẳng thức $a^Tu-\beta\le0$ và $\beta-a^Tu\le0$. Nếu gán cho chúng hai nhân tử không âm $\lambda_+$ và $\lambda_-$, số hạng trong điều kiện dừng là $(\lambda_+-\lambda_-)a$, và hiệu $\lambda_+-\lambda_-$ nhận mọi giá trị thực. Ở Ví dụ 04.2, $\nu^*=-2<0$ vẫn hợp lệ.

:::

::: exercise Bài tập 04.1 (Hệ KKT rút gọn của hai bài toán)
- (a) Viết hệ (1.1) cho $f(x)=x_1^2+x_1x_2+x_2^2-3x_1$ trên $\mathbb R^2$, giải và chứng minh nghiệm thu được là điểm cực tiểu toàn cục.
- (b) Viết hàm Lagrange $\mathcal L(u,\nu)$ và hệ (1.2) cho bài toán $\min\tfrac12(u_1^2+4u_2^2)$ với $u_1+u_2=5$; giải hệ.
- (c) Xác định dấu của $\nu^*$ ở câu (b) và đối chiếu với Mệnh đề 04.2.
:::

::: hint
Ở (a), dùng hai định thức con chính của Hessian. Ở (b), giải $u_1$, $u_2$ theo $\nu$.
:::

::: solution
**Câu (a).** $\nabla f(x)=(2x_1+x_2-3,\ x_1+2x_2)^T$. Hệ $2x_1+x_2=3$, $x_1+2x_2=0$ cho $x_1=-2x_2$, rồi $-4x_2+x_2=3$, nên $x_2=-1$, $x_1=2$. Hessian $\begin{bmatrix}2&1\\1&2\end{bmatrix}$ có định thức con chính $2>0$ và $3>0$, nên xác định dương; $f$ lồi chặt (Định lý 01.29(b)) và theo Mệnh đề 04.2(a), $x^*=(2,-1)^T$ là cực tiểu toàn cục, với $f^*=4-2+1-6=-3$.

**Câu (b).** $\mathcal L(u,\nu)=\tfrac12(u_1^2+4u_2^2)+\nu(u_1+u_2-5)$. Hệ (1.2): $u_1+\nu=0$, $4u_2+\nu=0$, $u_1+u_2=5$. Từ hai phương trình đầu, $u_1=-\nu$ và $u_2=-\nu/4$; thay vào phương trình thứ ba: $-\tfrac54\nu=5$, nên $\nu^*=-4$, $u^*=(4,1)^T$, $F^*=8+2=10$.

**Câu (c).** $\nu^*=-4<0$. Mệnh đề 04.2 không đòi dấu của $\nu^*$, và theo Nhận xét 04.3, nhân tử của đẳng thức tự do dấu.

**Kiểm tra lại.** Điểm khả thi $(5,0)^T$ cho $F=12{,}5>10$, và $(3,2)^T$ cho $F=4{,}5+8=12{,}5>10$.
:::

## 2. Ký hiệu và giả thiết

Vô hướng và vector viết chữ thường, ma trận chữ hoa, không in đậm; bất đẳng thức giữa hai vector hiểu theo từng tọa độ, $\succeq$, $\succ$ chỉ dùng cho ma trận; $\log$ là logarit tự nhiên. Bài toán không ràng buộc dùng $(f,x)$, bài toán có đẳng thức dùng $(F,u)$; ký hiệu cục bộ được giới thiệu tại chỗ.

| Ký hiệu | Ý nghĩa | Phạm vi, giả thiết |
|---|---|---|
| $n$, $p$; $N$ | số biến, số ràng buộc đẳng thức; số mẫu dữ liệu | $p<n$ |
| $f$, $\operatorname{dom}f$ | mục tiêu của bài toán không ràng buộc; miền của nó | miền mở, lồi |
| $x$, $x^*$, $f^*$ | điểm lặp; một nghiệm; giá trị tối ưu $f^*=\inf f$ | — |
| $g$, $H$ | $\nabla f(x)$ và $\nabla^2f(x)$ tại điểm lặp hiện tại | $H$ đối xứng |
| $d$, $t$, $x^+$; $h(t)$ | hướng, độ dài bước, điểm mới $x+td$; hàm một biến $f(x+td)$ | $t>0$ |
| $\alpha$, $\beta$ | tham số quay lui Armijo | $0<\alpha\le\tfrac12$, $0<\beta<1$; Newton dùng $\alpha<\tfrac12$ |
| $W$, $Q_W(d)$ | ma trận trọng số; mô hình bậc hai $f(x)+g^Td+\tfrac12d^TWd$ | $W\succ0$ |
| $\lVert v\rVert_W$, $\lVert g\rVert_{W,*}$ | chuẩn có trọng số $\sqrt{v^TWv}$; chuẩn đối ngẫu $\sqrt{g^TW^{-1}g}$ | — |
| $L$; $\mu$; $\kappa$ | hằng số Lipschitz của gradient; hằng số lồi mạnh; số điều kiện $L/\mu$ | $0<\mu\le L$ |
| $L_H$ | hằng số Lipschitz của Hessian | $L_H>0$ |
| $\lambda_i(M)$, $\lambda_{\min}$, $\lambda_{\max}$; $\lambda$ | giá trị riêng của ma trận đối xứng $M$; nhân tử của ràng buộc bất đẳng thức $f_i(x)\le0$, như Bài 03 | $\lambda\ge0$ |
| $\rho$ | hệ số chính quy hóa (ridge và logistic) | $\rho>0$ |
| $J(w)$, $J_0(w)$ | mất mát huấn luyện có chính quy hóa; không chính quy hóa | — |
| $\delta$ | độ giảm Newton $\sqrt{g^TH^{-1}g}$ | $\delta\ge0$ |
| $F$, $u$, $u^*$, $F^*$ | mục tiêu, biến, nghiệm, giá trị tối ưu của bài toán có đẳng thức | miền mở, lồi |
| $A$, $b$ | ma trận và vế phải của ràng buộc $Au=b$ | $A$ đủ hạng hàng |
| $\mathcal L(u,\nu)$ | hàm Lagrange $F(u)+\nu^T(Au-b)$ | — |
| $\nu$, $\nu^*$; $\eta$ | nhân tử của bài toán gốc; nhân tử của bài toán con Newton khả thi | tự do dấu |
| $\delta_{eq}$ | độ giảm Newton của bài toán con có đẳng thức | $\delta_{eq}\ge0$ |
| $Z$, $\hat u$, $z$, $\psi$ | ma trận có cột là cơ sở của $\ker A$; một điểm khả thi; tọa độ trên tập khả thi; $\psi(z)=F(\hat u+Zz)$ | $Z\in\mathbb R^{n\times(n-p)}$ |
| $r_d$, $r_p$, $r$; $\Delta\nu$ | phần dư đối ngẫu $\nabla F(u)+A^T\nu$, phần dư gốc $Au-b$, phần dư ghép; số gia nhân tử | — |
| $\varepsilon_g$, $\varepsilon_{\mathrm{model}}$, $\varepsilon_p$, $\varepsilon_d$ | dung sai dừng theo chuẩn gradient, theo mô hình, theo hai phần dư | số dương |
| $\mathbf 1$ | vector có mọi tọa độ bằng $1$ (in đậm để phân biệt với số $1$) | kích thước theo ngữ cảnh |

Giả thiết của bài gồm:

- **(T1) Miền và tính lồi.** Miền mở, lồi; $f$ (hoặc $F$) lồi, lớp $C^2$.
- **(T2) Ràng buộc.** $A\in\mathbb R^{p\times n}$ có các hàng độc lập tuyến tính.
- **(T3) Gradient Lipschitz.** $\lVert\nabla f(x)-\nabla f(y)\rVert_2\le L\lVert x-y\rVert_2$ với mọi $x,y\in\operatorname{dom}f=\mathbb R^n$, và $f$ có điểm cực tiểu $x^*$.
- **(T4) Lồi mạnh và Hessian Lipschitz.** $\nabla^2f\succeq\mu I$; với phương pháp Newton thêm $\nabla^2f\preceq LI$ và $\lVert\nabla^2f(x)-\nabla^2f(y)\rVert_2\le L_H\lVert x-y\rVert_2$ trên tập mức dưới đóng $\{x\mid f(x)\le f(x^0)\}$.
- **(T5) Tự điều chỉnh.** $\lvert h'''(t)\rvert\le2h''(t)^{3/2}$ cho mọi hạn chế $h$ của $f$ lên một đường thẳng, và $\nabla^2f\succ0$.

(T1), (T2) đủ cho hệ điều kiện tối ưu và hai phương pháp Newton có đẳng thức; cận hội tụ của hạ gradient cần thêm (T3); tốc độ của phương pháp Newton cần (T4); cận sai số theo độ giảm Newton cần (T5).

## 3. Ví dụ xuyên suốt: ba bài toán tính tay và ba mô hình học

Ba bài toán tính tay có nghiệm đã biết, bao gồm:

- **Hàm bậc hai.** $f(x)=\tfrac12(3x_1^2+7x_2^2)$ trên $\mathbb R^2$, $\nabla f(x)=(3x_1,7x_2)^T$, $\nabla^2f=\operatorname{diag}(3,7)\succ0$. Hệ (1.1) cho $x^*=0$, $f^*=0$. Điểm đầu $x^0=(2,4)^T$ có $f(x^0)=62$ và $g=(6,28)^T$. Độ cong theo $x_2$ gấp $\tfrac73$ lần độ cong theo $x_1$.
- **Hàm $s-\log s$.** $\varphi(s)=s-\log s$ trên miền mở $s>0$, $\varphi'(s)=1-\tfrac1s$, $\varphi''(s)=\tfrac1{s^2}>0$. Hệ (1.1) cho $s^*=1$, $\varphi^*=1$. Điểm đầu $s^0=\tfrac14$ có $\varphi'=-3$, $\varphi''=16$. Độ cong $\tfrac1{s^2}$ không bị chặn khi $s\to0$.
- **Bài toán trên đường $u_1+u_2=14$.** $\min F(u)=\tfrac12(2u_1^2+5u_2^2)$ với $u_1+u_2=14$, tức $A=[1\ \ 1]$, $b=14$, $n=2$, $p=1$. Hệ (1.2) gồm $2u_1+\nu=0$, $5u_2+\nu=0$, $u_1+u_2=14$, cho $u^*=(10,4)^T$, $\nu^*=-20$, $F^*=140$. Điểm đầu khả thi $(16,-2)^T$ có $F=266$; điểm đầu chưa khả thi là $(1,8)^T$ với nhân tử $\nu=4$.

Ba mô hình học của bài gồm:

- hồi quy logistic có chính quy hóa trên sáu quan sát (số giờ ôn tập và kết quả đạt hay không đạt);
- trọng số trộn hai mô hình ngôn ngữ, với ràng buộc tổng trọng số bằng $1$;
- mạng tuyến tính hai lớp $f(a,b)=\tfrac12(ab-1)^2$, nơi các giả thiết lồi không thỏa.

## 4. Phương pháp giảm

Để tính nghiệm của (1.1) hoặc (1.2), một phương pháp lặp cần ba thành phần, nêu trong định nghĩa sau.

::: definition Định nghĩa 04.4 (Phương pháp giảm)
Cho bài toán không ràng buộc của Định nghĩa 04.1 và điểm đầu $x^0\in\operatorname{dom}f$. Một *phương pháp giảm* (descent method) sinh dãy

$$
x^{k+1}=x^k+t_kd^k,\quad k\ge0 .
$$

trong đó:

- **hướng** $d^k\in\mathbb R^n$ là nghiệm của một bài toán con lập tại $x^k$;
- **độ dài bước** $t_k>0$ được chọn bởi một quy tắc nhận bước sao cho $x^{k+1}\in\operatorname{dom}f$ và $f(x^{k+1})<f(x^k)$ khi $x^k$ chưa thỏa (1.1);
- **tiêu chí dừng** là một bất đẳng thức tính được tại $x^k$ đo mức vi phạm của (1.1).
:::

::: remark Nhận xét 04.5 (Bài toán con và bài toán gốc)
Trong một bước lặp có hai bài toán tối ưu: bài toán gốc theo $x$ với hệ (1.1), và bài toán con theo $d$, lập tại $x^k$ cố định, với hệ KKT riêng, không ràng buộc hoặc có đẳng thức.

Nghiệm của bài toán con chỉ là ứng viên cho bước: điểm $x^k+d^k$ thỏa (1.1) khi bài toán con trùng bài toán gốc, như khi $f$ bậc hai và bài toán con dùng đúng Hessian, và nói chung phải kiểm tra tiêu chí dừng tại điểm mới.
:::

## 5. Hướng giảm, độ dài bước và hạ gradient

Tại $x^0=(2,4)^T$, hàm bậc hai có $g=(6,28)^T\ne0$. Để rời $x^0$, chúng ta cần biết những hướng nào làm $f$ giảm, chọn một hướng và chọn độ dài bước.

### 5.1. Đạo hàm hướng và hướng giảm

Một cách trực quan, hướng cần tìm là hướng mà dọc theo đó $f$ giảm ngay khi rời $x^0$. Để biến mô tả này thành phép kiểm tra, ta đo độ dốc dọc một hướng bằng một giới hạn một phía, như định nghĩa sau.

::: definition Định nghĩa 04.6 (Đạo hàm hướng và hướng giảm)
Cho $f:\operatorname{dom}f\to\mathbb R$ với $\operatorname{dom}f\subseteq\mathbb R^n$ mở, một điểm $x\in\operatorname{dom}f$ và một vector $d\in\mathbb R^n$.

- *Đạo hàm hướng* (directional derivative) của $f$ tại $x$ theo $d$ là

$$
f'(x;d)=\lim_{t\downarrow0}\frac{f(x+td)-f(x)}{t},
$$

khi giới hạn tồn tại.

- Khi $f$ khả vi tại $x$, vector $d$ gọi là một *hướng giảm* (descent direction) của $f$ tại $x$ nếu $\nabla f(x)^Td<0$.
:::

Giới hạn lấy theo $t>0$ vì bước lặp đi về phía trước theo $d$; khác Định nghĩa 00.32, $d$ không cần có chuẩn $1$.

Với $d=e_i$, $f'(x;e_i)=\partial f/\partial x_i$; mệnh đề sau nối đạo hàm hướng với gradient.

::: proposition Mệnh đề 04.7 (Đạo hàm hướng của hàm khả vi và tiêu chuẩn dấu) — chứng minh đầy đủ
**Giả thiết.** $f$ khả vi tại $x\in\operatorname{dom}f$, $\operatorname{dom}f$ mở, $g=\nabla f(x)$, $d\in\mathbb R^n$.

**Kết luận.**

- (a) $f'(x;d)=g^Td$, và $f'(x;sd)=s\,f'(x;d)$ với mọi $s>0$.
- (b) Nếu $g^Td<0$ thì có $\bar t>0$ sao cho $f(x+td)<f(x)$ với mọi $t\in(0,\bar t]$.
- (c) Nếu $g^Td>0$ thì có $\bar t>0$ sao cho $f(x+td)>f(x)$ với mọi $t\in(0,\bar t]$.
:::

Mệnh đề đúng cả khi $f$ không lồi.

::: proof Chứng minh Mệnh đề 04.7
**Lộ trình.** Viết khai triển bậc một của $f$ tại $x$ theo $t$, rồi chọn $t$ đủ nhỏ để phần dư nhỏ hơn một nửa số hạng bậc một.

**Bước 1 (khai triển bậc một).** Vì $f$ khả vi tại $x$, $f(x+td)=f(x)+t\,g^Td+\xi(t)$ với $\xi(t)/t\to0$ khi $t\downarrow0$. Chia cho $t>0$ và cho $t\downarrow0$ được $f'(x;d)=g^Td$. Thay $d$ bằng $sd$ được $g^T(sd)=s\,g^Td$.

**Bước 2 (dấu).** Giả sử $g^Td<0$. Vì $\xi(t)/t\to0$, có $\bar t>0$ sao cho $\lvert\xi(t)\rvert/t<\tfrac12\lvert g^Td\rvert$ với mọi $t\in(0,\bar t]$, và $x+td\in\operatorname{dom}f$ vì miền mở. Khi đó

$$
\begin{aligned}
&f(x+td)-f(x)\\
&\quad=t\Bigl(g^Td+\frac{\xi(t)}t\Bigr)\\
&\quad<t\Bigl(g^Td+\tfrac12\lvert g^Td\rvert\Bigr)\\
&\quad=\tfrac12t\,g^Td<0 .
\end{aligned}
$$

Quan hệ thứ hai dùng cận của $\xi(t)/t$; quan hệ thứ ba dùng $g^Td=-\lvert g^Td\rvert$. Phần (c) chứng minh tương tự với dấu ngược. $\square$
:::

Do $s>0$ không đổi dấu, tính chất "là hướng giảm" chỉ phụ thuộc phương và chiều của $d$. Khi $g^Td=0$, thông tin bậc một không đủ để kết luận:

- với $f(x)=x_1^2-x_2^2$ tại $x=(1,0)^T$, $g=(2,0)^T$, hướng $d=(0,1)^T$ có $g^Td=0$ và $f(x+td)=1-t^2<f(x)$;
- với $f(x)=x_1^2+x_2^2$, cùng điểm và hướng cho $f(x+td)=1+t^2>f(x)$.

::: example Ví dụ 04.3 (Ba hướng tại điểm đầu của hàm bậc hai)
**Dữ kiện.** $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$, $g=(6,28)^T$.

**Tính.**

- $d=(-1,0)^T$: $g^Td=-6<0$, hướng giảm.
- $d=(1,0)^T$: $g^Td=6>0$, $f$ tăng ngay khi rời $x^0$.
- $d=(-28,6)^T$: $g^Td=-168+168=0$; hướng này tiếp xúc với đường mức qua $x^0$.

**Kiểm tra lại.** Theo hướng thứ nhất, $f(x^0+td)=\tfrac12(3(2-t)^2+112)$ nhỏ hơn $62$ khi $0<t<4$. Theo hướng thứ ba, $f(x^0+td)=62+1302t^2$: hệ số bậc nhất bằng $0$, và $f$ tăng nhờ số hạng bậc hai.
:::

![Các elip đường mức f bằng 15, 35 và 62 của hàm bậc hai, đường mức 62 qua x0 bằng (2, 4). Từ x0 có ba mũi tên: vào trong elip (g chuyển vị d âm), tiếp xúc đường mức (bằng 0), ra ngoài (dương). Hai trục có tỷ lệ khác nhau.](img/lec-04/descent-directions.svg)

Các hướng có $g^Td<0$ chỉ vào phía trong elip qua $x^0$, nơi $f<62$; hướng có $g^Td=0$ tiếp xúc với elip.

Tiêu chuẩn dấu không chọn ra được hướng nào trong vô số hướng giảm. Cực tiểu hóa riêng $g^Td$ cũng không có nghiệm, vì $d=-sg$ cho $g^Td=-s\lVert g\rVert_2^2\to-\infty$. Bài toán con chọn hướng vì vậy cần một số hạng ngăn $\lVert d\rVert_2$ tăng không giới hạn.

### 5.2. Hướng ngược gradient từ một bài toán con bậc hai

Xấp xỉ bậc một $f(x+d)\approx f(x)+g^Td$ chỉ chính xác khi $d$ nhỏ. Về mặt ý tưởng, ta cộng vào xấp xỉ này một *số hạng phạt* (penalty term) chuẩn của $d$, như $\tfrac12\lVert d\rVert_2^2$, để cân bằng mức giảm dự báo với độ tin cậy của dự báo.

::: definition Định nghĩa 04.8 (Mô hình bậc hai và hướng ngược gradient)
Cho $x\in\operatorname{dom}f$ cố định, $g=\nabla f(x)$ và ma trận đối xứng $W\in\mathbb R^{n\times n}$, $W\succ0$. *Mô hình bậc hai* (quadratic model) của $f$ tại $x$ với ma trận $W$ là hàm của bước $d\in\mathbb R^n$:

$$
Q_W(d)=f(x)+g^Td+\tfrac12d^TWd .
$$

Với $W=I$, mô hình là $Q_I(d)=f(x)+g^Td+\tfrac12\lVert d\rVert_2^2$, và nghiệm của bài toán con $\min_dQ_I(d)$ gọi là *hướng ngược gradient* (negative gradient direction), ký hiệu $d_G$.
:::

Với $x$ cố định, biến duy nhất là $d$, và ba số hạng của $Q_W$ có ba vai trò:

- $f(x)$ là giá trị hiện tại;
- $g^Td$ là thay đổi bậc một dự báo;
- $\tfrac12d^TWd$ phạt chuẩn của $d$.

Ma trận $W$ được chọn, không nhất thiết bằng Hessian; khi $W=\nabla^2f(x)$, $Q_W$ trùng khai triển Taylor bậc hai.

::: proposition Mệnh đề 04.9 (Nghiệm của mô hình bậc hai) — chứng minh đầy đủ
**Giả thiết.** $W$ đối xứng, $W\succ0$; $g\in\mathbb R^n$.

**Kết luận.**

- (a) $Q_W$ lồi chặt và có nghiệm duy nhất $d$, là nghiệm của hệ tuyến tính

$$
Wd=-g .
\tag{5.1}
$$

- (b) $g^Td=-d^TWd$, nên $d$ là hướng giảm khi $g\ne0$.
- (c) *Mức giảm mô hình* (còn gọi là mức giảm dự báo) là $Q_W(0)-Q_W(d)=\tfrac12d^TWd=\tfrac12g^TW^{-1}g$.

Với $W=I$: $d_G=-g$, $g^Td_G=-\lVert g\rVert_2^2$ và mức giảm mô hình là $\tfrac12\lVert g\rVert_2^2$.
:::

::: proof Chứng minh Mệnh đề 04.9
**Lộ trình.** Áp Mệnh đề 04.2(a) cho bài toán con lồi chặt theo $d$, rồi nhân hệ (5.1) với $d^T$ để được dấu của $g^Td$ và mức giảm của mô hình.

**Bước 1 (lồi chặt và điều kiện tối ưu).** Gradient của $Q_W$ theo $d$ là $g+Wd$, vì $W$ đối xứng; Hessian là $W\succ0$. Theo Định lý 01.29(b), $Q_W$ lồi chặt trên $\mathbb R^n$. Theo Mệnh đề 04.2(a) áp cho bài toán con không ràng buộc theo $d$, $d$ là nghiệm khi và chỉ khi $g+Wd=0$, tức (5.1). Ma trận $W\succ0$ khả nghịch, nên hệ có đúng một nghiệm $d=-W^{-1}g$.

**Bước 2 (hướng giảm).** Nhân (5.1) bên trái với $d^T$: $d^TWd=-d^Tg$, tức $g^Td=-d^TWd$. Khi $g\ne0$ thì $d\ne0$, và $d^TWd>0$, nên $g^Td<0$.

**Bước 3 (mức giảm của mô hình).**

$$
\begin{aligned}
&Q_W(0)-Q_W(d)\\
&\quad=-g^Td-\tfrac12d^TWd\\
&\quad=d^TWd-\tfrac12d^TWd\\
&\quad=\tfrac12d^TWd .
\end{aligned}
$$

Quan hệ thứ hai dùng Bước 2. Thay $d=-W^{-1}g$ được $d^TWd=g^TW^{-1}WW^{-1}g=g^TW^{-1}g$. $\square$
:::

::: example Ví dụ 04.4 (Hướng ngược gradient của hàm bậc hai và độ tin cậy của mô hình)
**Dữ kiện.** $f(x)=\tfrac12(3x_1^2+7x_2^2)$, Hessian $\operatorname{diag}(3,7)$, $x^0=(2,4)^T$, $f(x^0)=62$, $g=(6,28)^T$, $W=I$.

**Tính hướng.** Với $g=(6,28)^T$, hệ (5.1) với $W=I$ cho $d_G=(-6,-28)^T$. Theo Mệnh đề 04.9(b), $g^Td_G=-\lVert g\rVert_2^2=-(36+784)=-820<0$.

**Mô hình dự báo và giá trị thực tế.** Mô hình dự báo $Q_I(d_G)=62-820+\tfrac12\cdot820=-348$. Giá trị thực tế tại $x^0+d_G=(-4,-24)^T$ là $f=\tfrac12(3\cdot16+7\cdot576)=\tfrac12(48+4032)=2040$.

**Kiểm tra lại.** $\tfrac12d_G^T\operatorname{diag}(3,7)d_G=2798$, nên $f(x^0+d_G)=62-820+2798=2040$: mô hình dùng độ cong $1$, còn $f$ có độ cong $3$ và $7$.
:::

Theo Ví dụ 04.4, bước đầy đủ theo một hướng giảm có thể làm $f$ tăng, từ $62$ lên $2040$, nên độ dài bước cần một quy tắc riêng.

### 5.3. Độ dài bước và quay lui Armijo

Hướng giảm chỉ bảo đảm $f$ giảm khi $t$ đủ nhỏ (Mệnh đề 04.7(b)). Với hàm bậc hai, ngưỡng của $t$ tính được chính xác.

::: example Ví dụ 04.5 (Hàm bậc hai trên tia cập nhật)
**Dữ kiện.** $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$, $f(x^0)=62$, $d_G=(-6,-28)^T$, $g^Td_G=-820$.

**Lập hàm một biến.** Đặt $h(t)=f(x^0+td_G)$:

$$
\begin{aligned}
h(t)&=\tfrac12\bigl[3(2-6t)^2\\
&\qquad+7(4-28t)^2\bigr]\\
&=62-820t+2798t^2 .
\end{aligned}
$$

Hệ số bậc nhất $-820$ là $g^Td_G$; hệ số bậc hai $2798=\tfrac12d_G^T\operatorname{diag}(3,7)d_G$ đến từ độ cong của $f$ dọc tia.

**Vùng giảm.** $h(t)<62$ khi và chỉ khi $2798t^2<820t$, tức $0<t<\frac{820}{2798}=\frac{410}{1399}\approx0{,}293$.

**Kiểm tra lại.** $t=\tfrac14$ cho $(\tfrac12,-3)^T$ với $f=\tfrac{255}8<62$; $t=\tfrac12$ cho $(-1,-10)^T$ với $f=\tfrac{703}2>62$, hai phía của $\frac{410}{1399}$.
:::

![Tia x0 cộng t nhân dG trên các đường mức của hàm f bằng một nửa nhân (3 x1 bình phương cộng 7 x2 bình phương), với mũi tên chỉ chiều t tăng. Điểm đầu x0 bằng (2, 4) có f bằng 62. Điểm ứng với t bằng 1/4 là (1/2, âm 3) với f bằng 255/8, nhỏ hơn 62. Điểm ứng với t bằng 1/2 là (âm 1, âm 10) với f bằng 703/2, lớn hơn 62.](img/lec-04/descent-ray.svg)

Với hàm tổng quát, vùng giảm không tính được dạng đóng. Một cách trực quan, ta so mức giảm thực tế $f(x)-f(x+td)$ với mức giảm theo xấp xỉ bậc một $-t\,g^Td$, và nhận bước nếu mức giảm thực tế đạt ít nhất một phần cố định của mức đó. Để làm rõ ý tưởng này, xem định nghĩa sau.

::: definition Định nghĩa 04.10 (Điều kiện Armijo và quay lui)
Cho $x\in\operatorname{dom}f$, hướng giảm $d$ với $g^Td<0$ và hai tham số $\alpha\in(0,\tfrac12]$, $\beta\in(0,1)$.

- Bước $t>0$ thỏa *điều kiện Armijo* (Armijo condition; còn gọi là điều kiện giảm đủ, sufficient decrease condition) nếu $x+td\in\operatorname{dom}f$ và

$$
\begin{aligned}
&f(x+td)\\
&\quad\le f(x)+\alpha t\,g^Td .
\end{aligned}
\tag{5.2}
$$

- *Quay lui Armijo* (backtracking line search) là thủ tục: đặt $t=1$; trong khi $x+td\notin\operatorname{dom}f$ hoặc (5.2) sai, gán $t\leftarrow\beta t$; trả về $t$.
:::

Vế phải của (5.2) là đường thẳng qua $(0,f(x))$ với hệ số góc $\alpha g^Td$, thoải hơn tiếp tuyến của $h(t)=f(x+td)$ tại $0$; bước được nhận khi đồ thị $h$ nằm dưới đường thẳng đó.

Điều kiện (5.2) đòi mức giảm tỷ lệ với $t\lvert g^Td\rvert$. Mệnh đề sau khẳng định quay lui luôn tìm được bước thỏa (5.2).

::: proposition Mệnh đề 04.11 (Quay lui Armijo kết thúc sau hữu hạn lần co) — chứng minh đầy đủ
**Giả thiết.** $f$ khả vi trên miền mở $\operatorname{dom}f$; $x\in\operatorname{dom}f$; $g^Td<0$; $\alpha\in(0,1)$, $\beta\in(0,1)$.

**Kết luận.** Có $\bar t>0$ sao cho mọi $t\in(0,\bar t]$ thỏa (5.2). Do đó quay lui dừng sau hữu hạn lần co, với bước trả về $t\ge\min\{1,\beta\bar t\}$.
:::

::: proof Chứng minh Mệnh đề 04.11
**Lộ trình.** Dùng lại khai triển bậc một của chứng minh Mệnh đề 04.7 với hệ số $1-\alpha$ thay $\tfrac12$, rồi đếm số lần co của dãy $\beta^j$.

**Bước 1 (mọi bước đủ nhỏ được nhận).** Như Bước 1 của chứng minh Mệnh đề 04.7, $f(x+td)=f(x)+t\,g^Td+\xi(t)$ với $\xi(t)/t\to0$. Vì $(1-\alpha)g^Td<0$, có $\bar t>0$ sao cho với mọi $t\in(0,\bar t]$: $x+td\in\operatorname{dom}f$ và $\xi(t)/t\le-(1-\alpha)g^Td$. Khi đó $f(x+td)\le f(x)+t\,g^Td-(1-\alpha)t\,g^Td=f(x)+\alpha t\,g^Td$.

**Bước 2 (quay lui dừng).** Dãy thử $\beta^j$ giảm về $0$, nên có chỉ số nhỏ nhất $j$ với $\beta^j\le\bar t$, và $\beta^j$ thỏa (5.2) theo Bước 1. Thủ tục kết thúc ở lần thử thứ $j$ hoặc sớm hơn. Nếu nó kết thúc ở $t=\beta^i$ với $i\ge1$ thì $\beta^{i-1}$ đã bị loại, nên $\beta^{i-1}>\bar t$, và $t=\beta\cdot\beta^{i-1}>\beta\bar t$. $\square$
:::

::: example Ví dụ 04.6 (Quay lui Armijo trên hàm bậc hai)
**Dữ kiện.** $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$, $d=d_G=(-6,-28)^T$, $f(x^0)=62$, $g^Td=-820$, $\alpha=\tfrac1{10}$, $\beta=\tfrac12$; $h(t)=62-820t+2798t^2$ (Ví dụ 04.5).

**Ngưỡng.** Vế phải của (5.2) là $62+\tfrac1{10}t(-820)=62-82t$.

**Các lần thử.**

| Lần thử | $t$ | Điểm thử | $f$ tại điểm thử | Ngưỡng $62-82t$ | Kết luận |
|---|---|---|---|---|---|
| 1 | $1$ | $(-4,-24)^T$ | $2040$ | $-20$ | loại |
| 2 | $\tfrac12$ | $(-1,-10)^T$ | $\tfrac{703}2$ | $21$ | loại |
| 3 | $\tfrac14$ | $(\tfrac12,-3)^T$ | $\tfrac{255}8$ | $\tfrac{83}2$ | nhận |

Thủ tục nhận $t=\tfrac14$ và dừng, không thử $t=\tfrac18$. Điểm mới là $x^1=(\tfrac12,-3)^T$ với $f(x^1)=\tfrac{255}8\approx31{,}9$.

**Kiểm tra lại.** Theo Ví dụ 04.5, (5.2) tương đương $2798t^2\le820t-82t=738t$, tức $0<t\le\frac{738}{2798}=\frac{369}{1399}\approx0{,}264$. Bước $1$ và $\tfrac12$ nằm ngoài khoảng này, bước $\tfrac14$ nằm trong.
:::

![Đồ thị theo t trên đoạn từ 0 đến khoảng 0,42 của hai đường: đường cong liền 62 trừ 820t cộng 2798t bình phương là giá trị hàm trên tia, và đường thẳng nét đứt 62 trừ 82t là ngưỡng Armijo với alpha bằng 1/10. Hai đường cắt nhau gần t bằng 0,26. Điểm t bằng 1/4 được đánh dấu, nằm dưới ngưỡng.](img/lec-04/armijo-window.svg)

::: remark Nhận xét 04.12 (Vai trò của tham số $\alpha$ và ba nhầm lẫn)
**Ảnh hưởng của $\alpha$.** Tham số $\alpha$ lớn làm ngưỡng chặt hơn: với $\alpha=\tfrac3{10}$ trên cùng hàm bậc hai và cùng hướng $d_G$, ngưỡng là $62-246t$ và bước $\tfrac14$ bị loại vì $\tfrac{255}8>\tfrac12$.

**Ba nhầm lẫn.**

1. Bước được nhận không phải bước tối ưu trên tia: bước tối ưu của $h$ ở Ví dụ 04.5 là $t=\frac{820}{2\cdot2798}\approx0{,}147$, khác $\tfrac14$; quay lui chỉ tìm một bước đủ tốt.
2. Bước của vòng lặp trước không dùng lại được: mỗi vòng lặp có $g$ và $d$ mới, nên quay lui chạy lại từ $t=1$.
3. Giá trị $f$ tại điểm thử ngoài miền không được tính: với $f$ chứa $-\log$, điểm thử như vậy bị loại trước khi đánh giá.
:::

Ghép các bước tính gradient, đặt $d=-g$, quay lui và cập nhật, ta được thuật toán *hạ gradient* (gradient descent) hoàn chỉnh.

::: algorithm Thuật toán 04.13 (Hạ gradient với quay lui Armijo; gradient descent)
**Đầu vào.** Điểm đầu $x^0\in\operatorname{dom}f$; dung sai $\varepsilon_g>0$; tham số $\alpha\in(0,\tfrac12]$, $\beta\in(0,1)$.

**Lặp** với $k=0,1,2,\ldots$:

1. Tính $g=\nabla f(x^k)$.
2. Nếu $\lVert g\rVert_2\le\varepsilon_g$: dừng, trả về $x^k$.
3. Đặt $d=-g$.
4. Chọn $t$ bằng quay lui Armijo (Định nghĩa 04.10).
5. Cập nhật $x^{k+1}=x^k+td$.

**Đầu ra.** Điểm $x$ với $\lVert\nabla f(x)\rVert_2\le\varepsilon_g$.

**Chi phí mỗi vòng lặp.** Một lần tính gradient và một số lần tính $f$ khi thử bước.
:::

Chuẩn gradient nhỏ chưa cho cận của $f(x)-f^*$; cận đó cần giả thiết về độ cong.

**Trong học máy.** Thuật toán 04.13 là hạ gradient *toàn lô* (full batch), với độ dài bước $t$ là *tốc độ học* (learning rate). Khi gradient chỉ tính trên một *lô nhỏ* (mini-batch) mẫu, giá trị mất mát là ước lượng và phép kiểm tra (5.2) không áp dụng nguyên dạng.

### 5.4. Độ cong không đồng đều

Hướng $-g$ chưa tính đến hình dạng của $f$: độ cong theo $x_2$ gấp $\tfrac73$ lần độ cong theo $x_1$. Ví dụ sau giữ bước cố định để tách riêng tác động của hướng.

::: example Ví dụ 04.7 (Hạ gradient với bước cố định trên hàm bậc hai)
**Dữ kiện.** $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$, $f(x^0)=62$; bước Armijo $t=\tfrac14$ của Ví dụ 04.6.

**Công thức lặp.** Với $g=(3x_1,7x_2)^T$ và bước cố định $t$, cập nhật $x^+=x-tg$ cho

$$
\begin{gathered}
x_1^+=(1-3t)x_1,\\
x_2^+=(1-7t)x_2 .
\end{gathered}
$$

**Với $t=\tfrac14$.** $x_1$ nhân $\tfrac14$ và giữ dấu; $x_2$ nhân $-\tfrac34$, đổi dấu ở mỗi vòng lặp. Năm điểm đầu là $(2,4)$, $(\tfrac12,-3)$, $(\tfrac18,\tfrac94)$, $(\tfrac1{32},-\tfrac{27}{16})$, $(\tfrac1{128},\tfrac{81}{64})$, với $f$ lần lượt $62$, $\tfrac{255}8$, $\tfrac{2271}{128}\approx17{,}7$, $\tfrac{20415}{2048}\approx9{,}97$, $\tfrac{183711}{32768}\approx5{,}61$.

**Bước cố định tối ưu.** Tốc độ co chậm nhất là $\max\{\lvert1-3t\rvert,\lvert1-7t\rvert\}$. Hàm này nhỏ nhất khi $1-3t=7t-1$, tức $t=\tfrac15$, với giá trị $\tfrac25$.

**Kiểm tra lại.** Tại $(\tfrac12,-3)$: $f=\tfrac12(\tfrac34+63)=\tfrac{255}8$, khớp Ví dụ 04.6. Tại $t=\tfrac15$: $1-\tfrac35=\tfrac25$ và $1-\tfrac75=-\tfrac25$, cùng trị tuyệt đối.
:::

![Đường đi của hạ gradient với bước cố định t bằng 1/4 trên các đường mức của hàm f bằng một nửa nhân (3 x1 bình phương cộng 7 x2 bình phương), gồm năm điểm k bằng 0 đến 4 xuất phát từ x0 bằng (2, 4). Đường đi gần như về ngay trục x2, rồi dao động qua lại hai phía trục x1 theo phương x2 với biên độ co dần theo hệ số 3/4.](img/lec-04/gradient-fixed-step.svg)

Thành phần $x_1$ gần như triệt tiêu sau hai bước, còn $x_2$ dao động hai phía trục $x_1$ và chỉ co theo hệ số $\tfrac34$. Bước đủ nhỏ để $x_2$ không dao động thì làm $x_1$ co chậm; giới hạn này do tỷ số giữa độ cong lớn nhất và nhỏ nhất quyết định.

::: remark Nhận xét 04.14 (Số điều kiện)
Với hàm bậc hai lồi chặt có Hessian $P$, các giá trị riêng $\lambda_{\min}\le\cdots\le\lambda_{\max}$ của $P$ là độ cong theo các vector riêng. Bước cố định $t$ nhân thành phần theo vector riêng thứ $i$ với $1-t\lambda_i(P)$. Giá trị lớn nhất của $\lvert1-t\lambda_i(P)\rvert$ nhỏ nhất tại $t=2/(\lambda_{\min}+\lambda_{\max})$ và bằng $(\kappa-1)/(\kappa+1)$, với $\kappa=\lambda_{\max}/\lambda_{\min}$ là *số điều kiện* (condition number). Hàm bậc hai $\tfrac12(3x_1^2+7x_2^2)$ có $\kappa=\tfrac73$ và hệ số $\frac{4/3}{10/3}=\tfrac25$, khớp Ví dụ 04.7.

Khi $\kappa$ lớn, hệ số này gần $1$: số hạng $\tfrac12\lVert d\rVert_2^2$ phạt bước như nhau theo mọi phương, trong khi hàm cong khác nhau theo từng phương. Sự chậm không do quy tắc chọn bước; ví dụ sau dùng bước tối ưu trên tia và vẫn chậm.
:::

::: example Ví dụ 04.8 (Tìm kiếm đường chính xác trên một hàm có số điều kiện 10)
**Dữ kiện.** $f(x)=\tfrac12(x_1^2+10x_2^2)$, Hessian $\operatorname{diag}(1,10)$, $\kappa=10$, điểm đầu $x^{(0)}=(10,1)^T$ với $f=55$ (chỉ số lặp viết trong ngoặc để phân biệt với lũy thừa $c^k$). Tại mỗi vòng lặp, $d=-g$ và $t$ cực tiểu hóa $f(x+td)$ trên $t>0$, tức *tìm kiếm đường chính xác* (exact line search).

**Lượt đầu.** $g=(10,10)^T$, bước chính xác $t=\frac{g^Tg}{g^T\operatorname{diag}(1,10)g}=\frac{200}{1100}=\frac2{11}$, điểm mới $x^{(1)}=(\tfrac{90}{11},-\tfrac9{11})^T$.

**Dạng đóng.** Với $c=\tfrac9{11}$, mọi vòng lặp dùng cùng bước $\tfrac2{11}$ và cho $x^{(k)}=(10c^k,(-c)^k)^T$, $f(x^{(k)})=55c^{2k}$. Phép kiểm tra bằng quy nạp: tại $x^{(k)}$, $g=(10c^k,10(-c)^k)^T$, nên bước chính xác là $\frac{g^Tg}{g^T\operatorname{diag}(1,10)g}=\frac{200c^{2k}}{1100c^{2k}}=\frac2{11}$.

**Kiểm tra lại.** $f(x^{(1)})=\tfrac12\bigl(\tfrac{8100}{121}+\tfrac{810}{121}\bigr)=\tfrac{4455}{121}=55\cdot\tfrac{81}{121}$. Hệ số $c=\frac{\kappa-1}{\kappa+1}=\tfrac9{11}$.
:::

![Các elip đường mức của một nửa của x1 bình phương cộng 10 x2 bình phương. Quỹ đạo hạ gradient với tìm kiếm đường chính xác từ (10, 1) qua (90/11, âm 9/11) đi zích zắc hai phía trục x1, tiến chậm về gốc theo hệ số c bằng 9/11. Chú thích: hệ Newton H d bằng âm g tới gốc sau một bước.](img/lec-04/quadratic-zigzag.svg)

Mỗi bước đều tối ưu trên tia, nên hai gradient liên tiếp vuông góc nhau, $g^{(k+1)T}g^{(k)}=0$ (tại $k=0$: $g^{(0)}=(10,10)^T$, $g^{(1)}=(\tfrac{90}{11},-\tfrac{90}{11})^T$), và quỹ đạo đi zích zắc. Sai số giảm theo hệ số $c^2=\tfrac{81}{121}\approx0{,}67$ mỗi vòng lặp, nên cần $22$ vòng lặp để $f(x^{(k)})\le0{,}01$, vì $\log(5500)/\log(121/81)\approx21{,}5$.

::: exercise Bài tập 04.2 (Quay lui Armijo trên $x_1^2+4x_2^2$)
Cho $f(x)=x_1^2+4x_2^2$ trên $\mathbb R^2$ và $x^0=(2,1)^T$.

- (a) Tính $g=\nabla f(x^0)$, hướng ngược gradient $d_G$ và $g^Td_G$.
- (b) Với $\alpha=\tfrac14$, $\beta=\tfrac12$, chạy quay lui Armijo theo $d_G$: lập bảng các lần thử, nêu bước được nhận và điểm mới.
- (c) Xác định chính xác tập các bước thỏa (5.2) và đối chiếu với kết quả (b).
:::

::: hint
Viết $f(x^0+td_G)$ thành đa thức bậc hai theo $t$. Ngưỡng Armijo là $f(x^0)-\alpha t\lVert g\rVert_2^2$.
:::

::: solution
**Câu (a).** $\nabla f(x)=(2x_1,8x_2)^T$, nên $g=(4,8)^T$, $d_G=(-4,-8)^T$, $g^Td_G=-80$, $f(x^0)=4+4=8$.

**Câu (b).** Ngưỡng là $8-\tfrac14\cdot80t=8-20t$.

| $t$ | Điểm thử | $f$ | Ngưỡng | Kết luận |
|---|---|---|---|---|
| $1$ | $(-2,-7)^T$ | $4+196=200$ | $-12$ | loại |
| $\tfrac12$ | $(0,-3)^T$ | $36$ | $-2$ | loại |
| $\tfrac14$ | $(1,-1)^T$ | $5$ | $3$ | loại |
| $\tfrac18$ | $(\tfrac32,0)^T$ | $\tfrac94$ | $\tfrac{11}2$ | nhận |

Bước được nhận là $t=\tfrac18$, điểm mới $x^1=(\tfrac32,0)^T$.

**Câu (c).** $f(x^0+td_G)=(2-4t)^2+4(1-8t)^2=8-80t+272t^2$. Điều kiện (5.2) là $272t^2\le60t$, tức $0<t\le\tfrac{15}{68}\approx0{,}221$.

**Kiểm tra lại.** $\tfrac14=0{,}25>0{,}221$ bị loại và $\tfrac18=0{,}125<0{,}221$ được nhận, khớp bảng. Tọa độ thứ hai về $0$ vì $1-8\cdot\tfrac18=0$: bước $\tfrac18$ trùng nghịch đảo độ cong $8$ theo phương $x_2$.
:::

### 5.5. Hướng dốc nhất theo chuẩn có trọng số

Hướng $-g$ đo độ dài bước bằng chuẩn Euclid, như nhau theo mọi phương. Một cách trực quan, một chuẩn có trọng số lớn theo phương có độ cong lớn có quả cầu đơn vị ngắn theo phương đó, nên hướng giảm $f$ nhanh nhất trên mỗi đơn vị độ dài phụ thuộc vào chuẩn được chọn.

![Hình tròn đơn vị v1 bình phương cộng v2 bình phương không quá 1 trong mặt phẳng (v1, v2), cùng một đường thẳng có pháp tuyến g bằng (6, 28) tiếp xúc với hình tròn. Tiếp điểm là hướng làm g chuyển vị v nhỏ nhất trên hình tròn, nằm ngược chiều g.](img/lec-04/euclidean-unit.svg)

![Elip 3 v1 bình phương cộng 7 v2 bình phương không quá 1, dẹt theo trục v2, cùng một đường thẳng 6 v1 cộng 28 v2 bằng hằng số tiếp xúc với elip. Tiếp điểm là hướng làm g chuyển vị v nhỏ nhất trên elip; hướng này không ngược chiều g mà lệch về phía trục v1.](img/lec-04/weighted-unit.svg)

Trên hình tròn, điểm tiếp xúc với đường mức thấp nhất của $g^Tv$, với $g=(6,28)^T$, nằm ngược chiều $g$; trên elip $3v_1^2+7v_2^2\le1$, điểm tiếp xúc lệch về phía trục $v_1$, phương có độ cong nhỏ. Để làm rõ chuẩn có trọng số và bài toán chọn hướng, xem định nghĩa sau.

::: definition Định nghĩa 04.15 (Chuẩn có trọng số, hướng dốc nhất và chuẩn đối ngẫu)
Cho ma trận đối xứng $W\in\mathbb R^{n\times n}$, $W\succ0$, và $g\in\mathbb R^n$, $g\ne0$.

- *Chuẩn có trọng số* (weighted norm) của $v\in\mathbb R^n$ là $\lVert v\rVert_W=\sqrt{v^TWv}$.
- *Hướng dốc nhất chuẩn hóa* (normalized steepest descent direction) theo $\lVert\cdot\rVert_W$ là nghiệm $v_W$ của bài toán con

$$
\begin{aligned}
&\underset{v\in\mathbb R^n}{\operatorname{minimize}}\quad g^Tv\\
&\text{subject to}\quad v^TWv\le1 .
\end{aligned}
$$

- *Chuẩn đối ngẫu* (dual norm) của $g$ là $\lVert g\rVert_{W,*}=\max\{g^Tv\mid\lVert v\rVert_W\le1\}$.
- *Hướng dốc nhất* (steepest descent direction) theo $\lVert\cdot\rVert_W$ là $d=\lVert g\rVert_{W,*}\,v_W$.
:::

Ở đây $\lVert v\rVert_W=\lVert W^{1/2}v\rVert_2$, nên quả cầu đơn vị là một elip, ngắn theo phương có trọng số lớn. Ràng buộc $v^TWv\le1$ cần thiết vì $g^Tv$ không bị chặn dưới. Hướng chuẩn hóa chỉ cho phương; hệ số $\lVert g\rVert_{W,*}$ cho độ dài dùng trong phép cập nhật.

Với $W=I$, chuẩn đối ngẫu là $\lVert g\rVert_2$ và $d=-g=d_G$, nên khái niệm tổng quát hóa hướng ngược gradient.

Mệnh đề sau giải bài toán con bằng hệ KKT của Bài 03, với đủ bốn nhóm điều kiện vì có một ràng buộc bất đẳng thức.

::: proposition Mệnh đề 04.16 (Hướng dốc nhất theo chuẩn có trọng số) — chứng minh đầy đủ
**Giả thiết.** $W$ đối xứng, $W\succ0$; $g\ne0$.

**Kết luận.**

- (a) Bài toán con của Định nghĩa 04.15 có nghiệm duy nhất

$$
v_W=-\frac{W^{-1}g}{\sqrt{g^TW^{-1}g}} .
$$

- (b) $\lVert g\rVert_{W,*}=\sqrt{g^TW^{-1}g}$.
- (c) Hướng dốc nhất là $d=-W^{-1}g$, tức nghiệm của $Wd=-g$, và trùng nghiệm của mô hình $Q_W$ (Mệnh đề 04.9).

:::

::: proof Chứng minh Mệnh đề 04.16
**Lộ trình.** Bài toán con có nghiệm và thỏa điều kiện Slater, nên nghiệm là nghiệm của hệ KKT; nhân tử dương buộc ràng buộc hoạt động, và hệ giải được dạng đóng.

**Bước 1 (tồn tại nghiệm và hệ KKT).** Tập khả thi $\{v\mid v^TWv\le1\}$ đóng, bị chặn và không rỗng, mục tiêu tuyến tính liên tục, nên bài toán con có nghiệm theo Định lý 01.35. Bài toán con lồi và $v=0$ là điểm khả thi ngặt ($0<1$), nên theo Hệ quả 03.31 và Định lý 03.32, $v$ là nghiệm khi và chỉ khi có $\chi$ thỏa hệ KKT. Với hàm Lagrange $\mathcal L_s(v,\chi)=g^Tv+\chi(v^TWv-1)$, bốn nhóm là:

1. dừng: $g+2\chi Wv=0$;
2. khả thi gốc: $v^TWv\le1$;
3. khả thi đối ngẫu: $\chi\ge0$;
4. bù trừ: $\chi(v^TWv-1)=0$.

**Bước 2 (nhân tử dương).** Nếu $\chi=0$ thì nhóm dừng cho $g=0$, trái giả thiết. Vậy $\chi>0$.

**Bước 3 (ràng buộc hoạt động).** Do $\chi>0$, nhóm bù trừ buộc $v^TWv=1$, tức nghiệm nằm trên biên elip.

**Bước 4 (giải).** Từ nhóm dừng, $v=-\frac1{2\chi}W^{-1}g$. Thay vào $v^TWv=1$, ta có

$$
\begin{aligned}
\frac{g^TW^{-1}WW^{-1}g}{4\chi^2}&=\frac{g^TW^{-1}g}{4\chi^2}\\
&=1,
\end{aligned}
$$

nên $\chi=\tfrac12\sqrt{g^TW^{-1}g}$, chọn căn dương vì $\chi>0$. Thay ngược lại được công thức (a). Nghiệm duy nhất vì $\chi$ và $v$ được xác định duy nhất từ hệ.

**Bước 5 (chuẩn đối ngẫu).** Quả cầu $\lVert v\rVert_W\le1$ đối xứng qua gốc, nên

$$
\begin{aligned}
\max_{\lVert v\rVert_W\le1}g^Tv&=-\min_{\lVert v\rVert_W\le1}g^Tv\\
&=-g^Tv_W\\
&=\frac{g^TW^{-1}g}{\sqrt{g^TW^{-1}g}}\\
&=\sqrt{g^TW^{-1}g}.
\end{aligned}
$$

Dòng thứ hai dùng (a), còn dòng thứ ba thay công thức của $v_W$.

**Bước 6 (hướng không chuẩn hóa).**

$$
\begin{aligned}
d&=\lVert g\rVert_{W,*}\,v_W\\
&=\sqrt{g^TW^{-1}g}\,\Bigl(-\frac{W^{-1}g}{\sqrt{g^TW^{-1}g}}\Bigr)\\
&=-W^{-1}g .
\end{aligned}
$$

Trong đó, dòng đầu là Định nghĩa 04.15, còn dòng thứ hai thay kết quả của Bước 4 và Bước 5.

Theo Mệnh đề 04.9(a), đây là nghiệm duy nhất của $\min Q_W$. $\square$
:::

Phần (b) còn kiểm tra được trực tiếp. Viết $g^Tv=(W^{-1/2}g)^T(W^{1/2}v)$; theo Cauchy–Schwarz, $\lvert g^Tv\rvert\le\lVert W^{-1/2}g\rVert_2\lVert W^{1/2}v\rVert_2=\sqrt{g^TW^{-1}g}\,\lVert v\rVert_W$. Vế phải bằng $\sqrt{g^TW^{-1}g}$ khi $\lVert v\rVert_W=1$, và $v=-v_W$ đạt dấu bằng. Chuẩn đối ngẫu vì vậy là hằng số tốt nhất trong bất đẳng thức Cauchy–Schwarz suy rộng

$$
\lvert g^Tv\rvert\le\lVert g\rVert_{W,*}\lVert v\rVert_W .
$$

Theo Mệnh đề 04.16(c), mọi hướng của bài có chung sơ đồ: chọn $W\succ0$, giải $Wd=-g$. Ba trường hợp gồm:

- $W=I$ cho hướng ngược gradient;
- $W\succ0$ cố định khác $I$ cho hướng dốc nhất có trọng số;
- $W$ bằng Hessian tại điểm hiện tại cho hướng Newton.

::: example Ví dụ 04.9 (Hướng dốc nhất trên hàm bậc hai với trọng số theo độ cong)
**Dữ kiện.** $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$, $f(x^0)=62$, $g=(6,28)^T$, $x^*=0$; $W=\operatorname{diag}(3,7)$, trùng Hessian của $f$.

**Tính.** Giải $Wd=-g$ theo từng tọa độ: $3d_1=-6$, $7d_2=-28$, nên $d=(-2,-4)^T$. Khi đó $W^{-1}g=(2,4)^T$, $g^TW^{-1}g=12+112=124$, $\lVert g\rVert_{W,*}=\sqrt{124}$ và $v_W=-(2,4)^T/\sqrt{124}$.

**Bước đầy đủ.** $x^0+d=(0,0)^T$, đúng nghiệm $x^*$ của $f$. Mức giảm mô hình là $\tfrac12d^TWd=\tfrac12\cdot124=62$, bằng mức giảm thực tế $f(x^0)-f(0)=62$.

**Kiểm tra lại.** $v_W^TWv_W=\frac{3\cdot4+7\cdot16}{124}=1$.
:::

![Hai khung: elip 3 v1 bình phương cộng 7 v2 bình phương bằng 1 với mũi tên chỉ hướng tối ưu; sau phép đổi biến z bằng (căn 3 nhân v1, căn 7 nhân v2), elip thành đường tròn đơn vị và mũi tên là cùng hướng trong tọa độ mới.](img/lec-04/metric-transform.svg)

Ví dụ 04.9 kết thúc sau một bước vì phép đổi biến $z=W^{1/2}x$ (với hướng: $W^{1/2}v$) đưa elip đơn vị thành hình tròn đơn vị: trong tọa độ $z$, $f=\tfrac12\lVert z\rVert_2^2$ và hướng ngược gradient trỏ thẳng vào nghiệm.

::: remark Nhận xét 04.17 (Ba đại lượng, phép đổi biến và giới hạn của trọng số cố định)
**Ba đại lượng không hoán đổi được.** Trong Ví dụ 04.9, $\lVert v_W\rVert_W=1$ là độ dài của hướng chuẩn hóa; $d^TWd=124$ là bình phương độ dài của hướng không chuẩn hóa theo $W$; $t$ là độ dài bước do quay lui chọn sau đó. Nhầm $v_W$ với $d$ làm bước ngắn đi $\sqrt{124}$ lần.

**Đổi biến.** Đặt $x=W^{-1/2}y$ và $\tilde f(y)=f(W^{-1/2}y)$. Theo quy tắc dây chuyền, $\nabla\tilde f(y)=W^{-1/2}g$. Một bước gradient trên $\tilde f$ là $y^+=y-tW^{-1/2}g$; quay về biến $x$: $x^+=W^{-1/2}y^+=x-tW^{-1}g$. Vậy hướng dốc nhất theo $\lVert\cdot\rVert_W$ là hạ gradient trong hệ tọa độ đã đổi biến; phép đổi biến này gọi là *tiền điều kiện* (preconditioning).

**Giới hạn.** Với hàm không bậc hai, Hessian thay đổi theo điểm, nên không ma trận cố định nào trùng nó ở mọi điểm lặp; phương pháp Newton tính lại $W=H$ tại từng điểm.
:::

**Trong học máy.** Với mô hình tuyến tính $Xw$, chia mỗi cột đặc trưng cho độ lệch chuẩn của nó, ta được dữ liệu $XS^{-1}$ với $S$ đường chéo dương; đó là phép đổi biến $\tilde w=Sw$. Theo Nhận xét 04.17 với $W=S^2$, khi mất mát không có chính quy hóa, hạ gradient trên dữ liệu đã chia là phương pháp dốc nhất có trọng số đường chéo trên dữ liệu gốc. Phép chia không loại bỏ tương quan giữa các cột (Murphy 2022, §7.4.5, tr. 256).

::: exercise Bài tập 04.3 (Hướng dốc nhất có trọng số tại $x^1$)
Tại điểm $x^1=(\tfrac12,-3)^T$ của hàm bậc hai $f(x)=\tfrac12(3x_1^2+7x_2^2)$, nhận được sau vòng lặp quay lui ở Ví dụ 04.6:

- (a) tính $g=\nabla f(x^1)$;
- (b) với $W=\operatorname{diag}(3,7)$, viết điều kiện dừng của $Q_W$, giải $d$, tính $x^1+d$ và $\lVert d\rVert_W^2$;
- (c) tính $\lVert g\rVert_{W,*}$ và $v_W$.
:::

::: hint
Điều kiện dừng của $Q_W$ là (5.1).
:::

::: solution
**Câu (a).** $g=(3\cdot\tfrac12,\,7\cdot(-3))^T=(\tfrac32,-21)^T$.

**Câu (b).** $Wd=-g$: $3d_1=-\tfrac32$ và $7d_2=21$, nên $d=(-\tfrac12,3)^T$. Điểm mới $x^1+d=(0,0)^T$, nghiệm của $f$. $\lVert d\rVert_W^2=3\cdot\tfrac14+7\cdot9=\tfrac34+63=\tfrac{255}4$.

**Câu (c).** $W^{-1}g=(\tfrac12,-3)^T$ và $g^TW^{-1}g=\tfrac34+63=\tfrac{255}4$, nên $\lVert g\rVert_{W,*}=\tfrac{\sqrt{255}}2$ và $v_W=-\frac{W^{-1}g}{\lVert g\rVert_{W,*}}=\frac{(-1,6)^T}{\sqrt{255}}$. Kiểm tra: $v_W^TWv_W=\frac{3+7\cdot36}{255}=1$.

**Kiểm tra lại.** Mức giảm mô hình $\tfrac12\cdot\tfrac{255}4=\tfrac{255}8=f(x^1)$, khớp vì $W$ trùng Hessian.
:::

### 5.6. Hội tụ của hạ gradient

Chúng ta chưa có kết quả bảo đảm Thuật toán 04.13 dừng, cũng chưa có cận cho $f(x^k)-f^*$ sau $k$ vòng lặp.

Một cách trực quan, nếu độ cong của $f$ không vượt $L$ ở mọi nơi thì đồ thị của $f$ nằm dưới một parabol độ cong $L$ tiếp xúc tại mỗi điểm, và cực tiểu hóa parabol đó cho một mức giảm bảo đảm. Để làm rõ giả thiết này, xem định nghĩa sau.

::: definition Định nghĩa 04.18 (Gradient Lipschitz; Lipschitz continuous gradient)
Hàm $f:\mathbb R^n\to\mathbb R$ khả vi có gradient $L$-Lipschitz, với hằng số $L>0$, nếu

$$
\begin{aligned}
&\lVert\nabla f(x)-\nabla f(y)\rVert_2\le L\lVert x-y\rVert_2\\
&\forall x,y\in\mathbb R^n .
\end{aligned}
$$
:::

Ví dụ, $f(x)=\tfrac12x^TPx$ có $L=\lVert P\rVert_2$; $\varphi(s)=s-\log s$ không có hằng số $L$ trên cả miền vì $\varphi''(s)=1/s^2$ không bị chặn khi $s\to0$.

Lồi mạnh (Định nghĩa 01.39) chặn dưới độ cong; gradient Lipschitz chặn trên độ cong, và bổ đề sau chuyển nó thành cận trên của $f$.

::: lemma Bổ đề 04.19 (Cận trên bậc hai) — chứng minh đầy đủ
**Giả thiết.** $f:\mathbb R^n\to\mathbb R$ khả vi, gradient $L$-Lipschitz.

**Kết luận.** Với mọi $x,y\in\mathbb R^n$,

$$
\begin{aligned}
f(y)&\le f(x)\\
&\quad+\nabla f(x)^T(y-x)\\
&\quad+\frac L2\lVert y-x\rVert_2^2 .
\end{aligned}
\tag{5.3}
$$
:::

::: proof Chứng minh Bổ đề 04.19
**Lộ trình.** Viết hiệu thành tích phân dọc đoạn thẳng, rồi chặn biểu thức dưới dấu tích phân bằng Cauchy–Schwarz và tính Lipschitz.

**Bước 1 (biểu diễn tích phân).** Đặt $\Delta=y-x$. Hàm một biến $\varsigma\mapsto f(x+\varsigma\Delta)$ có đạo hàm $\nabla f(x+\varsigma\Delta)^T\Delta$ theo quy tắc dây chuyền, nên

$$
\begin{aligned}
&f(y)-f(x)-\nabla f(x)^T\Delta\\
&\quad=\int_0^1\bigl(\nabla f(x+\varsigma\Delta)\\
&\qquad\quad-\nabla f(x)\bigr)^T\Delta\,d\varsigma .
\end{aligned}
$$

**Bước 2 (chặn biểu thức dưới dấu tích phân).** Theo Cauchy–Schwarz rồi Định nghĩa 04.18,

$$
\begin{aligned}
&\bigl(\nabla f(x+\varsigma\Delta)-\nabla f(x)\bigr)^T\Delta\\
&\quad\le\lVert\nabla f(x+\varsigma\Delta)-\nabla f(x)\rVert_2\\
&\qquad\cdot\lVert\Delta\rVert_2\\
&\quad\le L\varsigma\lVert\Delta\rVert_2^2 .
\end{aligned}
$$

**Bước 3 (tích phân).** $\int_0^1L\varsigma\lVert\Delta\rVert_2^2\,d\varsigma=\frac L2\lVert\Delta\rVert_2^2$. Thay vào Bước 1, ta được (5.3). $\square$
:::

Khi $f$ lồi, $f$ còn bị chặn dưới bởi tiếp tuyến (Định lý 01.25).

::: remark Nhận xét 04.20 (Kiểm tra gradient Lipschitz qua Hessian)
**Tiêu chuẩn.** Nếu $f$ lớp $C^2$ và $-LI\preceq\nabla^2f(x)\preceq LI$ với mọi $x$, thì gradient $L$-Lipschitz. Thật vậy, $\nabla f(y)-\nabla f(x)=\int_0^1\nabla^2f(x+\varsigma(y-x))(y-x)\,d\varsigma$, và một ma trận đối xứng có mọi giá trị riêng trong $[-L,L]$ có chuẩn phổ không vượt $L$. Khi $f$ lồi, cận dưới tự đúng vì $\nabla^2f\succeq0$, nên chỉ cần $\nabla^2f\preceq LI$.

**Hai ví dụ.** Hàm bậc hai $f(x)=\tfrac12(3x_1^2+7x_2^2)$ có $\nabla^2f=\operatorname{diag}(3,7)$, nên $L=7$. Hàm $s\mapsto\log(1+e^s)$, mất mát logistic viết theo $s=-m$, có đạo hàm bậc hai $\sigma(s)(1-\sigma(s))\le\tfrac14$ theo Mệnh đề 01.8(c), nên $L=\tfrac14$.

**Dữ liệu nhiều mẫu.** Cho $N$ mẫu với đặc trưng $a_i\in\mathbb R^n$, xếp thành các hàng $a_i^T$ của ma trận $X\in\mathbb R^{N\times n}$, và nhãn $y_i\in\{-1,+1\}$. Mất mát logistic là tổng $\sum_{i=1}^{N}\ell(m_i)$ theo các biên $m_i=y_ia_i^Tw$. Hessian của tổng là $\sum_i\ell''(m_i)a_ia_i^T\preceq\tfrac14X^TX$, vì $y_i^2=1$, nên có thể lấy $L=\tfrac14\lambda_{\max}(X^TX)$.
:::

![Đồ thị hàm f của s bằng log của 1 cộng e mũ s trên đoạn từ âm 4 đến 5 (nét liền), parabol cận trên q với L bằng 1/4 dựng tại s bằng 1 (nét đứt) và tiếp tuyến tại s bằng 1 (nét chấm). Ba đường tiếp xúc nhau tại s bằng 1, nơi f bằng khoảng 1,313 và độ dốc bằng khoảng 0,731. Parabol nằm trên f, tiếp tuyến nằm dưới f.](img/lec-04/lipschitz-upper-bound.svg)

Tại $s=1$, $f(s)=\log(1+e^s)$ có $f(1)\approx1{,}3133$, $f'(1)\approx0{,}7311$; tại $s=-3$, $f\approx0{,}0486$ nằm giữa tiếp tuyến $\approx-1{,}6110$ và parabol $\approx0{,}3890$.

Thay $y$ bằng một bước gradient trong (5.3), ta được mức giảm bảo đảm mà không cần quay lui.

::: lemma Bổ đề 04.21 (Bổ đề giảm; descent lemma) — chứng minh đầy đủ
**Giả thiết.** $f$ khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz; $x\in\mathbb R^n$, $g=\nabla f(x)$; $t\in(0,\tfrac1L]$.

**Kết luận.**

$$
\begin{aligned}
&f(x-tg)\\
&\quad\le f(x)-t\Bigl(1-\frac{Lt}2\Bigr)\lVert g\rVert_2^2\\
&\quad\le f(x)-\frac t2\lVert g\rVert_2^2 .
\end{aligned}
$$

Nói riêng, với $t=\tfrac1L$: $f\bigl(x-\tfrac1Lg\bigr)\le f(x)-\frac1{2L}\lVert g\rVert_2^2$.
:::

Bổ đề không cần tính lồi.

::: proof Chứng minh Bổ đề 04.21
**Lộ trình.** Thế $y=x-tg$ vào (5.3), rồi dùng $t\le\tfrac1L$.

**Bước 1 (thế vào cận trên).** Thay $y=x-tg$ vào (5.3): số hạng bậc nhất là $-t\lVert g\rVert_2^2$, số hạng bậc hai là $\tfrac L2t^2\lVert g\rVert_2^2$.

**Bước 2 (dùng $t\le\tfrac1L$).** Khi $Lt\le1$, $1-\tfrac{Lt}2\ge\tfrac12$. $\square$
:::

Bước $t=\tfrac1L$ cực tiểu hóa vế phải theo $t$. Hai hệ quả trực tiếp gồm:

1. dãy $f(x^k)$ của hạ gradient với bước $\tfrac1L$ không tăng, và giảm chặt khi $g\ne0$;
2. với $d=-g$, vế phải của (5.2) là $f(x)-\alpha t\lVert g\rVert_2^2$, nên mọi bước $t\le\tfrac1L$ thỏa (5.2) khi $\alpha\le\tfrac12$.

::: example Ví dụ 04.10 (Bước cố định $1/L$ trên hàm bậc hai)
**Dữ kiện.** $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$, $f(x^0)=62$, $g=(6,28)^T$; $L=\lambda_{\max}(\operatorname{diag}(3,7))=7$.

**Tính.** $\lVert g\rVert_2^2=820$. Bước $x^1=x^0-\tfrac17g=(2-\tfrac67,\,4-4)^T=(\tfrac87,0)^T$, với $f(x^1)=\tfrac12\cdot3\cdot\tfrac{64}{49}=\tfrac{96}{49}\approx1{,}96$.

**Đối chiếu với bổ đề.** Cận của Bổ đề 04.21 là $62-\frac{820}{14}=\frac{24}7\approx3{,}43$.

**Kiểm tra lại.** $\tfrac{96}{49}\le\tfrac{168}{49}$; tọa độ thứ hai về $0$ vì $L=7$ trùng độ cong theo $x_2$.
:::

Để so với $f^*$, chúng ta thêm tính lồi và sự tồn tại một điểm cực tiểu.

::: lemma Bổ đề 04.22 (Bất đẳng thức một bước) — chứng minh đầy đủ
**Giả thiết.** $f$ lồi, khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz; $f$ đạt cực tiểu tại $x^*$, $f^*=f(x^*)$; $x\in\mathbb R^n$, $g=\nabla f(x)$, $x^+=x-\tfrac1Lg$.

**Kết luận.**

$$
\begin{aligned}
&f(x^+)-f^*\\
&\quad\le\frac L2\Bigl(\lVert x-x^*\rVert_2^2\\
&\qquad-\lVert x^+-x^*\rVert_2^2\Bigr).
\end{aligned}
$$

Nói riêng, $\lVert x^+-x^*\rVert_2\le\lVert x-x^*\rVert_2$.
:::

Điểm $x^*$ là một điểm cực tiểu bất kỳ.

::: proof Chứng minh Bổ đề 04.22
**Lộ trình.** Ghép bổ đề giảm với bất đẳng thức tiếp tuyến tại $x$ và $x^*$, rồi viết lại vế phải bằng khai triển $\lVert x^+-x^*\rVert_2^2$.

**Bước 1 (bổ đề giảm).** Theo Bổ đề 04.21 với $t=\tfrac1L$, ta có $f(x^+)\le f(x)-\frac1{2L}\lVert g\rVert_2^2$.

**Bước 2 (tính lồi).** Theo Định lý 01.25 với hai điểm $x$ và $x^*$, ta có $f^*\ge f(x)+g^T(x^*-x)$, tức $f(x)\le f^*+g^T(x-x^*)$. Ghép với Bước 1, ta được

$$
\begin{aligned}
&f(x^+)-f^*\\
&\quad\le g^T(x-x^*)-\frac1{2L}\lVert g\rVert_2^2 .
\end{aligned}
$$

**Bước 3 (đại số).** Khai triển bình phương, ta có

$$
\begin{aligned}
&\lVert x^+-x^*\rVert_2^2\\
&\quad=\Bigl\lVert x-x^*-\tfrac1Lg\Bigr\rVert_2^2\\
&\quad=\lVert x-x^*\rVert_2^2-\tfrac2Lg^T(x-x^*)\\
&\qquad+\tfrac1{L^2}\lVert g\rVert_2^2 .
\end{aligned}
$$

Nhân hai vế với $\tfrac L2$ và chuyển vế, ta được $g^T(x-x^*)-\frac1{2L}\lVert g\rVert_2^2=\tfrac L2\bigl(\lVert x-x^*\rVert_2^2-\lVert x^+-x^*\rVert_2^2\bigr)$. Thay vào Bước 2, ta được kết luận.

**Bước 4 (khoảng cách không tăng).** Vế trái của kết luận không âm vì $f^*\le f(x^+)$, nên hiệu trong ngoặc không âm. $\square$
:::

Cộng vế phải của Bổ đề 04.22 theo $k$ bước, các số hạng giữa triệt tiêu: đó là một *tổng lồng* (telescoping sum).

::: theorem Định lý 04.23 (Tốc độ $O(1/k)$ của hạ gradient với bước $1/L$) — chứng minh đầy đủ
**Giả thiết.** $f$ lồi, khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz; $f$ đạt cực tiểu tại $x^*$. Dãy $x^{k+1}=x^k-\tfrac1L\nabla f(x^k)$ xuất phát từ $x^0\in\mathbb R^n$.

**Bảo đảm.** Với mọi $k\ge1$,

$$
\begin{aligned}
&f(x^k)-f^*\\
&\quad\le\frac{L\lVert x^0-x^*\rVert_2^2}{2k} .
\end{aligned}
\tag{5.4}
$$

Do đó $f(x^k)-f^*\le\varepsilon$ khi $k\ge\frac{LR^2}{2\varepsilon}$, với $R=\lVert x^0-x^*\rVert_2$.
:::

::: proof Chứng minh Định lý 04.23
**Lộ trình.** Cộng các bất đẳng thức một bước thành tổng lồng, rồi dùng tính đơn điệu của $f(x^j)$.

**Bước 1 (cộng các bất đẳng thức một bước).** Áp Bổ đề 04.22 cho $x=x^j$, $x^+=x^{j+1}$ với $j=0,\ldots,k-1$ rồi cộng lại, ta có

$$
\begin{aligned}
&\sum_{j=1}^{k}\bigl(f(x^j)-f^*\bigr)\\
&\quad\le\frac L2\Bigl(\lVert x^0-x^*\rVert_2^2\\
&\qquad-\lVert x^k-x^*\rVert_2^2\Bigr)\\
&\quad\le\frac L2\lVert x^0-x^*\rVert_2^2 .
\end{aligned}
$$

Dòng sau bỏ số hạng không dương.

**Bước 2 (tính đơn điệu).** Theo Bổ đề 04.21, $f(x^j)$ không tăng, nên tổng ở Bước 1 không nhỏ hơn $k\bigl(f(x^k)-f^*\bigr)$.

**Bước 3 (kết luận).** Chia cho $k$, ta được (5.4). $\square$
:::

Tốc độ $O(1/k)$ gọi là *dưới tuyến tính* (sublinear): giảm sai số mười lần cần khoảng mười lần số bước.

::: example Ví dụ 04.11 (Cận $O(1/k)$ trên hàm bậc hai)
**Dữ kiện.** $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$, $x^*=0$, $f^*=0$, $L=7$; bước $t=\tfrac17$ cho $x^1=(\tfrac87,0)^T$ (Ví dụ 04.10).

**Cận.** $\lVert x^0-x^*\rVert_2^2=4+16=20$. Cận (5.4) là $\frac{7\cdot20}{2k}=\frac{70}k$; để sai số không quá $0{,}01$, cận yêu cầu $k\ge7000$.

**Giá trị thực tế.** Từ $x^1$, $x^k=(2(\tfrac47)^k,0)^T$ và $f(x^k)=6(\tfrac{16}{49})^k$.

**Số bước thực tế.** $6(\tfrac{16}{49})^k\le0{,}01$ khi $k\ge\frac{\log600}{\log(49/16)}\approx5{,}72$, tức $k=6$.

**Kiểm tra lại.** $k=5$ cho $\approx0{,}0223>0{,}01$; $k=6$ cho $\approx0{,}0073$.
:::

Khi không biết $L$, bước được chọn bằng quay lui, và chứng minh cần một chặn dưới cho bước được nhận.

::: lemma Bổ đề 04.24 (Bước được nhận của quay lui) — chứng minh đầy đủ
**Giả thiết.** $f$ khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz; $d=-g$ với $g\ne0$; quay lui theo Định nghĩa 04.10 với $\alpha\in(0,\tfrac12]$ và $\beta\in(0,1)$.

**Kết luận.** Mọi $t\in(0,\tfrac1L]$ thỏa (5.2). Bước được nhận thỏa

$$
\begin{gathered}
t\ge t_{\min}=\min\Bigl\{1,\frac\beta L\Bigr\},\\
f(x-tg)\le f(x)-\alpha t\lVert g\rVert_2^2 .
\end{gathered}
$$
:::

Chặn $t_{\min}$ phụ thuộc $L$ dù thuật toán không dùng $L$.

::: proof Chứng minh Bổ đề 04.24
**Lộ trình.** Bổ đề giảm cho thấy mọi bước $t\le\tfrac1L$ thỏa (5.2); bước bị loại cuối cùng vì vậy lớn hơn $\tfrac1L$.

**Bước 1 (các bước nhỏ được nhận).** Với $t\le\tfrac1L$, Bổ đề 04.21 và $\alpha\le\tfrac12$ cho $f(x-tg)\le f(x)-\tfrac t2\lVert g\rVert_2^2\le f(x)-\alpha t\lVert g\rVert_2^2$, tức (5.2).

**Bước 2 (chặn dưới).** Nếu bước trả về khác $1$, giá trị thử trước đó $t/\beta$ đã bị loại, nên theo Bước 1, $t/\beta>\tfrac1L$, tức $t>\tfrac\beta L\ge t_{\min}$. $\square$
:::

::: theorem Định lý 04.25 (Tốc độ $O(1/k)$ với quay lui) — chứng minh đầy đủ
**Giả thiết.** Như Định lý 04.23, nhưng bước $t_k$ được chọn bằng quay lui với $d=-\nabla f(x^k)$, $\alpha=\tfrac12$, $\beta\in(0,1)$.

**Bảo đảm.** Với mọi $k\ge1$,

$$
\begin{gathered}
f(x^k)-f^*\le\frac{\lVert x^0-x^*\rVert_2^2}{2\,t_{\min}\,k},\\
t_{\min}=\min\Bigl\{1,\frac\beta L\Bigr\}.
\end{gathered}
$$
:::

Khi $L\ge\beta$, hằng số của cận lớn hơn hằng số của (5.4) đúng $1/\beta$ lần.

::: proof Chứng minh Định lý 04.25
**Lộ trình.** Với $\alpha=\tfrac12$, bước được nhận cho bất đẳng thức một bước cùng dạng Bổ đề 04.22 với $\tfrac1L$ thay bằng $t\ge t_{\min}$; tổng lồng cho kết luận.

**Bước 1 (bất đẳng thức một bước với bước $t$).** Với $\alpha=\tfrac12$, Bổ đề 04.24 cho $f(x^+)\le f(x)-\tfrac t2\lVert g\rVert_2^2$, có dạng của Bổ đề 04.21 với $\tfrac1L$ thay bằng $t$. Lặp lại Bước 2 và Bước 3 của chứng minh Bổ đề 04.22 với $x^+=x-tg$:

$$
\begin{aligned}
&f(x^+)-f^*\\
&\quad\le\frac1{2t}\Bigl(\lVert x-x^*\rVert_2^2\\
&\qquad-\lVert x^+-x^*\rVert_2^2\Bigr).
\end{aligned}
$$

**Bước 2 (thay $t$ bằng $t_{\min}$).** Hiệu trong ngoặc không âm vì vế trái không âm, và $\frac1{2t}\le\frac1{2t_{\min}}$ theo Bổ đề 04.24. Vậy bất đẳng thức của Bước 1 vẫn đúng khi thay $\tfrac1{2t}$ bằng $\tfrac1{2t_{\min}}$.

**Bước 3 (tổng lồng và tính đơn điệu).** Lặp lại chứng minh Định lý 04.23 với $L$ thay bằng $\tfrac1{t_{\min}}$. $\square$
:::

::: example Ví dụ 04.12 (Quay lui với $\alpha=\beta=\tfrac12$ trên hàm bậc hai)
**Dữ kiện.** $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$, $f(x^0)=62$, $d_G=(-6,-28)^T$, $\lVert g\rVert_2^2=820$, $L=7$, $\lVert x^0-x^*\rVert_2^2=20$; dọc tia $f(x^0+td_G)=62-820t+2798t^2$, bằng $2040$, $\tfrac{703}2$, $\tfrac{255}8$ tại $t=1$, $\tfrac12$, $\tfrac14$ (Ví dụ 04.5).

**Bước được nhận tại $x^0$.** Ngưỡng là $62-\tfrac12\cdot820t=62-410t$. Các lần thử: $t=1$ cho $2040>-348$; $t=\tfrac12$ cho $\tfrac{703}2>-143$; $t=\tfrac14$ cho $\tfrac{255}8>-\tfrac{81}2$; ba bước bị loại. $t=\tfrac18$ cho điểm $(\tfrac54,\tfrac12)^T$ với $f=\tfrac12(\tfrac{75}{16}+\tfrac74)=\tfrac{103}{32}$, không vượt ngưỡng $\tfrac{43}4$, được nhận.

**Cận.** $t_{\min}=\min\{1,\tfrac1{14}\}=\tfrac1{14}$, và cận là $\frac{20\cdot14}{2k}=\frac{140}k$, gấp đôi cận $\frac{70}k$ của bước $\tfrac17$, đúng bằng $1/\beta$.

**Kiểm tra lại.** Điều kiện (5.2) tương đương $2798t^2\le410t$, tức $t\le\frac{205}{1399}\approx0{,}147$. Bước $\tfrac18=0{,}125$ nằm trong và $\tfrac14$ nằm ngoài. Bước được nhận $\tfrac18\ge t_{\min}=\tfrac1{14}$, khớp Bổ đề 04.24.
:::

Hai cận $O(1/k)$ áp dụng cả cho những hàm đạt cực tiểu nhưng có độ cong tiến về $0$, như mất mát logistic không chính quy hóa $J_0$ của Ví dụ 01.8, có nghiệm $w^*=\log2$ và độ cong tiến về $0$ khi $\lvert w\rvert\to\infty$. Hàm bậc hai $\tfrac12(3x_1^2+7x_2^2)$ có độ cong tối thiểu $3>0$, và giả thiết chặn dưới độ cong của mệnh đề sau cho tốc độ nhanh hơn.

::: proposition Mệnh đề 04.26 (Lồi mạnh: dạng bậc nhất và cận theo chuẩn gradient) — chứng minh đầy đủ
**Giả thiết.** $f:\mathbb R^n\to\mathbb R$ khả vi, lồi mạnh với hằng số $\mu>0$ theo Định nghĩa 01.39.

**Kết luận.**

- (a) Với mọi $x,y$: $f(y)\ge f(x)+\nabla f(x)^T(y-x)+\tfrac\mu2\lVert y-x\rVert_2^2$.
- (b) $f$ có đúng một điểm cực tiểu $x^*$, và với mọi $x$:

$$
\begin{aligned}
&f(x)-f^*\\
&\quad\le\frac1{2\mu}\lVert\nabla f(x)\rVert_2^2 .
\end{aligned}
\tag{5.5}
$$

- (c) Nếu gradient còn $L$-Lipschitz thì $\mu\le L$.
:::

Bất đẳng thức (5.5) cho một tiêu chí dừng có bảo đảm khi biết $\mu$.

::: proof Chứng minh Mệnh đề 04.26
**Lộ trình.** Áp bất đẳng thức tiếp tuyến cho hàm lồi $f-\tfrac\mu2\lVert\cdot\rVert_2^2$; cực tiểu hóa cận dưới bậc hai theo $y$ cho (5.5); so với (5.3) cho $\mu\le L$.

**Bước 1 (phần a).** Hàm $f_\mu=f-\tfrac\mu2\lVert\cdot\rVert_2^2$ lồi, khả vi, với $\nabla f_\mu(x)=\nabla f(x)-\mu x$. Theo Định lý 01.25, $f_\mu(y)\ge f_\mu(x)+(\nabla f(x)-\mu x)^T(y-x)$. Chuyển các số hạng chứa $\mu$ sang vế phải, ta có

$$
\begin{aligned}
f(y)&\ge f(x)+\nabla f(x)^T(y-x)\\
&\quad+\tfrac\mu2\bigl(\lVert y\rVert_2^2-\lVert x\rVert_2^2\\
&\qquad-2x^T(y-x)\bigr)\\
&=f(x)+\nabla f(x)^T(y-x)\\
&\quad+\tfrac\mu2\lVert y-x\rVert_2^2 .
\end{aligned}
$$

Trong đó, quan hệ thứ hai dùng $\lVert y\rVert_2^2-2x^Ty+\lVert x\rVert_2^2=\lVert y-x\rVert_2^2$.

**Bước 2 (phần b).** Sự tồn tại và duy nhất của $x^*$ là Hệ quả 01.41. Với $x$ cố định, vế phải của (a) là hàm bậc hai lồi chặt theo $y$, đạt cực tiểu tại $y=x-\tfrac1\mu\nabla f(x)$ với giá trị $f(x)-\frac1{2\mu}\lVert\nabla f(x)\rVert_2^2$. Vế phải là cận dưới của $f(y)$ với mọi $y$, nên $f^*\ge f(x)-\frac1{2\mu}\lVert\nabla f(x)\rVert_2^2$, tức (5.5).

**Bước 3 (phần c).** Ghép (a) với (5.3) cho cùng $x,y$, ta có $\tfrac\mu2\lVert y-x\rVert_2^2\le\tfrac L2\lVert y-x\rVert_2^2$. Chọn $y\ne x$, ta được $\mu\le L$. $\square$
:::

Theo phần (a) và Bổ đề 04.19, $f$ bị chặn hai phía bởi hai parabol độ cong $\mu$ và $L$ tiếp xúc tại mỗi điểm. Với $f$ lớp $C^2$, lồi mạnh tương đương $\nabla^2f\succeq\mu I$ (Nhận xét 01.40); hàm bậc hai $\tfrac12(3x_1^2+7x_2^2)$ có $\mu=3$, $L=7$, $\kappa=\tfrac73$.

::: theorem Định lý 04.27 (Hội tụ tuyến tính của hạ gradient) — chứng minh đầy đủ
**Giả thiết.** $f$ lồi mạnh với hằng số $\mu$, khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz; $x^{k+1}=x^k-\tfrac1L\nabla f(x^k)$; $e_k=f(x^k)-f^*$.

**Bảo đảm.** Với mọi $k\ge0$,

$$
e_k\le\Bigl(1-\frac\mu L\Bigr)^ke_0 .
\tag{5.6}
$$

Do đó $e_k\le\varepsilon$ khi $k\ge\kappa\log(e_0/\varepsilon)$, với $\kappa=L/\mu$.
:::

Với quay lui, sai số co theo một hệ số $c<1$ phụ thuộc $\alpha,\beta,\mu,L$ (Boyd và Vandenberghe 2004, §9.3.1, tr. 468).

::: proof Chứng minh Định lý 04.27
**Lộ trình.** Ghép bổ đề giảm với (5.5) để được một bước co $e_{k+1}\le(1-\mu/L)e_k$, rồi quy nạp.

**Bước 1 (một bước).** Theo Bổ đề 04.21 rồi (5.5) với $x=x^k$, ta có

$$
\begin{aligned}
e_{k+1}&\le e_k-\frac1{2L}\lVert\nabla f(x^k)\rVert_2^2\\
&\le e_k-\frac\mu L\,e_k\\
&=\Bigl(1-\frac\mu L\Bigr)e_k .
\end{aligned}
$$

Dòng thứ hai dùng $\lVert\nabla f(x^k)\rVert_2^2\ge2\mu e_k$.

**Bước 2 (quy nạp).** Lặp Bước 1 $k$ lần, ta được (5.6), trong đó hệ số $1-\mu/L\in[0,1)$ theo Mệnh đề 04.26(c).

**Bước 3 (số bước).** Vì $1-u\le e^{-u}$ với mọi $u$, $(1-1/\kappa)^k\le e^{-k/\kappa}$. Khi $k\ge\kappa\log(e_0/\varepsilon)$, $e^{-k/\kappa}e_0\le\varepsilon$. $\square$
:::

Tốc độ (5.6) là hội tụ tuyến tính: số bước tăng theo $\log(1/\varepsilon)$ thay vì $1/\varepsilon$.

::: remark Nhận xét 04.28 (Ba cận trên hàm bậc hai và độ chặt)
Với hàm bậc hai $f(x)=\tfrac12(3x_1^2+7x_2^2)$ từ $x^0=(2,4)^T$, ta có $\mu=3$, $L=7$, $e_0=f(x^0)-f^*=62$ và hệ số $1-\tfrac37=\tfrac47$. Cận (5.6) cho $62(\tfrac47)^k\le0{,}01$ khi $k\ge\frac{\log6200}{\log(7/4)}\approx15{,}6$, tức $16$ bước; điều kiện đủ $k\ge\kappa\log(e_0/\varepsilon)=\tfrac73\log6200\approx20{,}4$ cho $21$ bước. Hai cận $O(1/k)$ cho $7000$ và $14000$ bước. Số bước thực tế với $t=\tfrac17$ là $6$ (Ví dụ 04.11).

:::

**Trong học máy.** Với hồi quy logistic trên dữ liệu $X\in\mathbb R^{N\times n}$ và chính quy hóa $\tfrac\rho2\lVert w\rVert_2^2$, Nhận xét 04.20 cho $L=\tfrac14\lambda_{\max}(X^TX)+\rho$, và mất mát lồi mạnh với $\mu=\rho$, nên $\kappa\le1+\lambda_{\max}(X^TX)/(4\rho)$, và cận số bước $\kappa\log(e_0/\varepsilon)$ tăng khi $\rho$ nhỏ hoặc $\lambda_{\max}(X^TX)$ lớn. Với mạng sâu, mất mát không lồi, nên các định lý hội tụ trên không áp dụng.

::: exercise Bài tập 04.4 (Bước cố định tối ưu và phân kỳ)
Cho $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$ và hạ gradient với bước cố định $t$, $x^{k+1}=x^k-t\nabla f(x^k)$:

- (a) chứng minh rằng với $t>\tfrac27$ dãy $x^k$ phân kỳ, và với $\tfrac23<t$ cả hai tọa độ phân kỳ;
- (b) với $t=\tfrac15$, bước tối ưu theo Nhận xét 04.14, tính $f(x^k)$ theo $k$ và số bước để $f(x^k)\le0{,}01$; so với $6$ bước của $t=\tfrac17$ ở Ví dụ 04.11.
:::

::: hint
Mỗi tọa độ nhân với $1-3t$ hoặc $1-7t$.
:::

::: solution
**Câu (a).** $x_2^k=(1-7t)^k\cdot4$. Với $t>\tfrac27$, $1-7t<-1$, nên $\lvert x_2^k\rvert\to\infty$ và $f(x^k)\ge\tfrac72(x_2^k)^2\to\infty$. Tọa độ thứ nhất có $\lvert1-3t\rvert>1$ khi $t>\tfrac23$.

**Câu (b).** Với $t=\tfrac15$: $x_1^k=2(\tfrac25)^k$, $x_2^k=4(-\tfrac25)^k$, nên $f(x^k)=\tfrac12(3\cdot4+7\cdot16)(\tfrac4{25})^k=62(\tfrac4{25})^k$. Điều kiện $62(0{,}16)^k\le0{,}01$ tương đương $k\ge\frac{\log6200}{\log6{,}25}\approx4{,}77$, tức $k=5$.

Bước $\tfrac15$ nhanh hơn $t=\tfrac17$ một bước; lợi thế nhỏ vì $t=\tfrac17$ triệt tiêu tọa độ thứ hai ngay ở bước đầu.

**Kiểm tra lại.** $k=4$: $62\cdot0{,}16^4\approx0{,}0406>0{,}01$; $k=5$: $\approx0{,}0065\le0{,}01$.
:::

Như vậy, hạ gradient có ba bảo đảm, và mọi cận đều phụ thuộc $\kappa$ hoặc $L$. Tuy nhiên, một $W$ cố định bằng Hessian chỉ loại bỏ được ảnh hưởng của $\kappa$ trên hàm bậc hai (Ví dụ 04.9).

## 6. Phương pháp Newton không ràng buộc

Hàm $\varphi(s)=s-\log s$ có độ cong $\tfrac1{s^2}$ không bị chặn khi $s\to0$, nên $\varphi$ không có gradient Lipschitz (Định nghĩa 04.18) trên cả miền. *Phương pháp Newton* (Newton's method) dùng chính Hessian tại điểm hiện tại làm ma trận của bài toán con.

### 6.1. Mô hình bậc hai cục bộ và hướng Newton

Một cách trực quan, tại mỗi điểm ta thay $f$ bằng parabol có cùng giá trị, độ dốc và độ cong, rồi chuyển tới điểm cực tiểu của parabol. Ví dụ sau dựng parabol đó cho hàm $s-\log s$.

::: example Ví dụ 04.13 (Mô hình bậc hai của hàm $s-\log s$ tại $s^0=\tfrac14$)
**Dữ kiện.** $\varphi(s)=s-\log s$ trên $s>0$, $s^0=\tfrac14$, $s^*=1$, $\varphi(1)=1$. Tại $s^0$: $\varphi(\tfrac14)=\tfrac14+\log4\approx1{,}6363$, $g=\varphi'(\tfrac14)=1-4=-3$, $H=\varphi''(\tfrac14)=16$.

**Mô hình.** $q(s)=\varphi(\tfrac14)-3(s-\tfrac14)+8(s-\tfrac14)^2$. Đạo hàm $q'(s)=-3+16(s-\tfrac14)$ triệt tiêu tại $s=\tfrac14+\tfrac3{16}=\tfrac7{16}$.

**So mô hình với hàm gốc.**

| $s$ | $\varphi(s)$ | $q(s)$ |
|---|---|---|
| $\tfrac14$ | $1{,}6363$ | $1{,}6363$ |
| $\tfrac7{16}$ | $1{,}2642$ | $1{,}3550$ |
| $1$ | $1$ | $3{,}8863$ |

**Kiểm tra lại.** $\varphi(\tfrac7{16})=\tfrac7{16}-\log\tfrac7{16}\approx0{,}4375+0{,}8267=1{,}2642$. $q(1)=1{,}6363-2{,}25+8\cdot0{,}5625=3{,}8863$.
:::

![Đồ thị phi của s bằng s trừ log s (nét liền), parabol q dựng tại s0 bằng 1/4 (nét đứt) và tiếp tuyến tại s0 (nét chấm), với g bằng âm 3, H bằng 16. Parabol khớp hàm gần s0 rồi tách xa khi s tăng, vì độ cong thực tế giảm còn độ cong của parabol giữ bằng 16.](img/lec-04/phi-local-model.svg)

Để làm rõ hướng dẫn tới điểm cực tiểu $\tfrac7{16}$ của parabol, xem định nghĩa sau.

::: definition Định nghĩa 04.29 (Hướng Newton)
Cho $f$ lớp $C^2$ quanh $x\in\operatorname{dom}f$, với $g=\nabla f(x)$ và $H=\nabla^2f(x)\succ0$. *Mô hình Newton* (Newton model) của $f$ tại $x$ là mô hình bậc hai $Q_H(d)=f(x)+g^Td+\tfrac12d^THd$ của Định nghĩa 04.8 với $W=H$. *Hướng Newton* (Newton step; còn gọi là Newton direction) tại $x$ là nghiệm $d$ của hệ Newton

$$
Hd=-g .
\tag{6.1}
$$
:::

Mô hình Newton trùng khai triển Taylor bậc hai tại $x$. Giả thiết $H\succ0$ bảo đảm (6.1) có nghiệm duy nhất; như $x^4$ tại $0$ cho thấy, hàm lồi chặt có thể có Hessian suy biến, và khi đó hướng Newton không xác định.

Với hồi quy logistic của Ví dụ 04.1, $J'(0)=-\tfrac12$ và $J''(0)=3\cdot\tfrac14+1=\tfrac74$, nên bước Newton từ $w=0$ cho $w^1=\tfrac12\big/\tfrac74=\tfrac27\approx0{,}2857$, rồi $w^2\approx0{,}286548$, nằm trong khoảng $(0{,}2865;\,0{,}2866)$ đã khoanh.

Hướng Newton có bốn cách đọc, nêu trong mệnh đề sau.

::: proposition Mệnh đề 04.30 (Bốn cách đọc hướng Newton) — chứng minh đầy đủ
**Giả thiết.** $f$ lớp $C^2$ trên miền mở, $x\in\operatorname{dom}f$, $H=\nabla^2f(x)\succ0$, $d$ là hướng Newton.

**Kết luận.**

- (a) $d$ là nghiệm duy nhất của $\min_dQ_H(d)$.
- (b) $g^Td=-d^THd$, nên $d$ là hướng giảm khi $g\ne0$.
- (c) Khi $g\ne0$, $d$ là hướng dốc nhất theo chuẩn $\lVert\cdot\rVert_H$ của Định nghĩa 04.15.
- (d) $d$ là nghiệm của phương trình thu được khi thay $\nabla f(x+d)$ trong điều kiện dừng $\nabla f(x+d)=0$ bằng xấp xỉ bậc một $g+Hd$.

:::

Mệnh đề nói về mô hình: điểm $x+d$ nói chung không thỏa $\nabla f(x+d)=0$, và có thể nằm ngoài miền.

::: proof Chứng minh Mệnh đề 04.30
**Lộ trình.** Phần (a)–(c) là Mệnh đề 04.9 và 04.16 với $W=H$; phần (d) tuyến tính hóa gradient tại $x$.

**Bước 1 (phần a, b, c).** Áp Mệnh đề 04.9 với $W=H$, ta được (a) và (b). Khi $g\ne0$, áp Mệnh đề 04.16(c) với $W=H$, ta được (c).

**Bước 2 (phần d).** Ánh xạ $y\mapsto\nabla f(y)$ có ma trận Jacobian (Định nghĩa 00.34) tại $x$ là $H$, nên $\nabla f(x+d)=g+Hd+o(\lVert d\rVert_2)$. Bỏ số hạng $o(\lVert d\rVert_2)$ và đặt phần còn lại bằng $0$, ta được $g+Hd=0$, tức (6.1). $\square$
:::

Cách đọc (a) xấp xỉ hàm mục tiêu rồi cực tiểu hóa; cách đọc (d) tuyến tính hóa phương trình (1.1) rồi giải, và dùng được cho mọi hệ phương trình, kể cả hệ KKT (1.2).

::: example Ví dụ 04.14 (Một bước Newton trên hàm $s-\log s$)
**Dữ kiện.** $\varphi(s)=s-\log s$; tại $s^0=\tfrac14$: $g=-3$, $H=16$; mô hình có điểm cực tiểu tại $\tfrac7{16}$ (Ví dụ 04.13).

**Hệ Newton.** $16d=3$, nên $d=\tfrac3{16}$ và $s^1=s^0+d=\tfrac7{16}$, đúng điểm cực tiểu của parabol trong Ví dụ 04.13.

**Hướng giảm.** $g\,d=-3\cdot\tfrac3{16}=-\tfrac9{16}=-Hd^2<0$.

**Cách đọc tuyến tính hóa.** $\varphi'(\tfrac14+d)\approx-3+16d$; đặt bằng $0$ được cùng $d=\tfrac3{16}$.

**Kiểm tra lại.** $\varphi'(\tfrac7{16})=-\tfrac97\ne0$: điểm mới chưa thỏa điều kiện dừng.
:::

![Đồ thị phi của s bằng s trừ log s (nét liền) và mô hình bậc hai tại s0 bằng 1/4 (nét đứt). Ba điểm được đánh dấu trên trục s: điểm đầu s0 bằng 1/4, điểm cực tiểu của mô hình s1 bằng 7/16, và nghiệm của hàm gốc s sao bằng 1.](img/lec-04/phi-newton.svg)

**Trong học máy.** Với hồi quy logistic có chính quy hóa trên dữ liệu $X$ có các hàng $a_i^T$, nhãn $y_i$ và biên $m_i=y_ia_i^Tw$, gradient là $\sum_i\ell'(m_i)y_ia_i+\rho w$ và Hessian là $X^TDX+\rho I\succ0$, với $D=\operatorname{diag}(\ell''(m_i))$. Hệ (6.1) là hệ phương trình chuẩn của một bài toán bình phương nhỏ nhất với trọng số $\ell''(m_i)$ trên mẫu $i$ (Murphy 2022, §10.2.6), nên phương pháp còn gọi là *bình phương nhỏ nhất có trọng số lặp* (iteratively reweighted least squares, IRLS).

### 6.2. Độ giảm Newton

Mức giảm mà mô hình Newton dự báo tính được ngay tại điểm hiện tại, nên là ứng viên cho tiêu chí dừng.

::: definition Định nghĩa 04.31 (Độ giảm Newton)
Với $H=\nabla^2f(x)\succ0$ và hướng Newton $d$, *độ giảm Newton* (Newton decrement) tại $x$ là

$$
\begin{aligned}
\delta_N(x)&=\sqrt{d^THd}=\sqrt{-g^Td}\\
&=\sqrt{g^TH^{-1}g}\ \ge0 .
\end{aligned}
$$

Khi không gây nhầm lẫn, viết gọn $\delta=\delta_N(x)$.
:::

Ba biểu thức bằng nhau theo Mệnh đề 04.30(b). Biểu thức đầu là độ dài của bước Newton theo $\lVert\cdot\rVert_H$, biểu thức cuối là chuẩn đối ngẫu $\lVert g\rVert_{H,*}$; khác $\lVert g\rVert_2$, độ giảm Newton không đổi khi đổi hệ tọa độ, như mệnh đề sau khẳng định.

::: proposition Mệnh đề 04.32 (Tính chất của độ giảm Newton) — chứng minh đầy đủ
**Giả thiết.** $f$ lớp $C^2$ quanh $x$, $H=\nabla^2f(x)\succ0$, $d$ là hướng Newton.

**Kết luận.**

- (a) $Q_H(0)-Q_H(d)=\tfrac12\delta^2$.
- (b) $\delta=0$ khi và chỉ khi $g=0$.
- (c) Cho $T\in\mathbb R^{n\times n}$ khả nghịch, $c\in\mathbb R^n$ và $\tilde f(y)=f(Ty+c)$ tại $y$ với $x=Ty+c$. Hướng Newton $\tilde d$ của $\tilde f$ tại $y$ thỏa $T\tilde d=d$, và độ giảm Newton của $\tilde f$ tại $y$ bằng $\delta$.

:::

::: proof Chứng minh Mệnh đề 04.32
**Lộ trình.** Phần (a), (b) suy từ Mệnh đề 04.9; phần (c) tính gradient và Hessian của hàm đổi biến bằng quy tắc dây chuyền rồi so hai hệ Newton.

**Bước 1 (phần a, b).** Phần (a) là Mệnh đề 04.9(c) với $W=H$. Vì $H^{-1}\succ0$, $\delta^2=g^TH^{-1}g=0$ khi và chỉ khi $g=0$.

**Bước 2 (đạo hàm sau khi đổi biến).** Theo quy tắc dây chuyền, $\nabla\tilde f(y)=T^Tg$ và $\nabla^2\tilde f(y)=T^THT$, ma trận này xác định dương vì $T$ khả nghịch.

**Bước 3 (hướng Newton tương ứng).** Hệ Newton theo $y$ là $T^THT\tilde d=-T^Tg$. Nhân bên trái với $(T^T)^{-1}$, ta được $H(T\tilde d)=-g$, nên $T\tilde d$ là nghiệm của (6.1), và theo tính duy nhất, $T\tilde d=d$.

**Bước 4 (độ giảm Newton).** Theo Định nghĩa 04.31 áp cho $\tilde f$, ta có

$$
\begin{aligned}
\tilde\delta^2&=-(T^Tg)^T\tilde d\\
&=-g^T(T\tilde d)\\
&=-g^Td\\
&=\delta^2 .
\end{aligned}
$$

Dòng thứ ba dùng Bước 3. $\square$
:::

Phần (c) gọi là *tính bất biến affine* (affine invariance): đổi đơn vị hay xoay hệ tọa độ rồi chạy Newton cho ảnh của các điểm lặp cũ. Hạ gradient không có tính chất này (Nhận xét 04.17).

::: example Ví dụ 04.15 (Ba hiệu trên hàm $s-\log s$)
**Dữ kiện.** $\varphi(s)=s-\log s$, $s^0=\tfrac14$, $g=-3$, $H=16$, $d=\tfrac3{16}$, $s^1=\tfrac7{16}$ (Ví dụ 04.14); $s^*=1$, $\varphi(1)=1$.

**Mức giảm mô hình.** $\delta^2=Hd^2=16\cdot\tfrac9{256}=\tfrac9{16}$, nên $\delta=\tfrac34$ và mức giảm mô hình $\tfrac12\delta^2=\tfrac9{32}=0{,}28125$.

**Giảm thực tế sau một bước.** $\varphi(\tfrac14)-\varphi(\tfrac7{16})=\bigl(\tfrac14+\log4\bigr)-\bigl(\tfrac7{16}+\log\tfrac{16}7\bigr)=\log\tfrac74-\tfrac3{16}\approx0{,}37212$.

**Sai số mục tiêu tại điểm đầu.** $\varphi(\tfrac14)-\varphi(1)=\log4-\tfrac34\approx0{,}63629$.

**Nhận bước.** Với $\alpha=\tfrac1{10}$ và $t=1$, điều kiện (5.2) đòi mức giảm ít nhất $\alpha(-g\,d)=\tfrac1{10}\cdot\tfrac9{16}=\tfrac9{160}=0{,}05625$. Mức giảm thực tế $0{,}37212$ vượt ngưỡng, nên bước đầy đủ được nhận.

**Kiểm tra lại.** $0{,}28125<0{,}37212<0{,}63629$.
:::

::: remark Nhận xét 04.33 (Ba đại lượng khác nhau: mức giảm mô hình, giảm thực tế, sai số mục tiêu)
Ví dụ 04.15 tách ba hiệu có hai vế khác nhau:

1. mức giảm mô hình $Q_H(0)-Q_H(d)=\tfrac12\delta^2$, tính trên parabol;
2. giảm thực tế $f(x)-f(x+td)$, tính trên hàm gốc sau một bước;
3. sai số mục tiêu $f(x)-f^*$, so với giá trị tối ưu chưa biết.

Ba đại lượng trùng nhau khi $f$ bậc hai lồi chặt, $d$ là hướng Newton và $t=1$ (Ví dụ 04.9). Ngưỡng của điều kiện Armijo tính từ $g^Td=-\delta^2$, không từ $\tfrac12\delta^2$.

Trên hàm $s-\log s$ tại $s^0=\tfrac14$, sai số mục tiêu lớn hơn hai lần mức giảm mô hình. Do đó $\tfrac12\delta^2$ không chặn trên sai số mục tiêu; một cận trên của sai số theo $\delta$ cần một giả thiết về sự thay đổi của độ cong.
:::

Thuật toán Newton dùng $\tfrac12\delta^2$, tính được ngay từ hướng vừa giải, làm tiêu chí dừng.

::: algorithm Thuật toán 04.34 (Newton với quay lui Armijo)
**Đầu vào.** Điểm đầu $x^0\in\operatorname{dom}f$; dung sai $\varepsilon_{\mathrm{model}}>0$; tham số $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Lặp** với $k=0,1,2,\ldots$:

1. Tính $g=\nabla f(x^k)$ và $H=\nabla^2f(x^k)$.
2. Giải hệ $Hd=-g$ bằng phân rã Cholesky $H=R^TR$, không lập $H^{-1}$.
3. Tính $\delta^2=-g^Td$.
4. Nếu $\tfrac12\delta^2\le\varepsilon_{\mathrm{model}}$: dừng, trả về $x^k$.
5. Chọn $t$ bằng quay lui Armijo theo hướng $d$, loại các điểm thử ngoài miền.
6. Cập nhật $x^{k+1}=x^k+td$.

**Đầu ra.** Điểm $x$ với $\tfrac12\delta_N(x)^2\le\varepsilon_{\mathrm{model}}$.

**Điều kiện.** $f$ lớp $C^2$ và $\nabla^2f\succ0$ tại mọi điểm lặp.

**Chi phí mỗi vòng lặp.** Tính Hessian và giải hệ $n\times n$: khoảng $\tfrac13n^3$ phép tính số thực (flop) với ma trận đặc, so với một lần tính gradient ở Thuật toán 04.13.
:::

Với hàm bậc hai lồi chặt và hướng Newton $d$, Mệnh đề 04.9(c) cho $f(x+d)=f(x)+\tfrac12g^Td$, nên $t=1$ thỏa (5.2) khi và chỉ khi $\alpha\le\tfrac12$. Với hàm không bậc hai, bước đầy đủ được nhận gần nghiệm khi $\alpha<\tfrac12$, nên Thuật toán 04.34 lấy $\alpha\in(0,\tfrac12)$ (Boyd và Vandenberghe 2004, §9.2, tr. 464; §9.5.3, tr. 489–490), còn hạ gradient cho phép $\alpha=\tfrac12$ (Bổ đề 04.24).

### 6.3. Tốc độ hội tụ của Newton

Để phát biểu số bước của Thuật toán 04.34, ta đặt tên các tốc độ hội tụ.

::: definition Định nghĩa 04.35 (Hội tụ tuyến tính và hội tụ bậc hai)
Cho dãy $x^k\to x^*$ trong $\mathbb R^n$.

- Dãy *hội tụ tuyến tính* (linear convergence) nếu có $c\in(0,1)$ và $k_0$ sao cho $\lVert x^{k+1}-x^*\rVert_2\le c\lVert x^k-x^*\rVert_2$ với mọi $k\ge k_0$.
- Dãy *hội tụ bậc hai* (quadratic convergence) nếu có $C>0$ và $k_0$ sao cho $\lVert x^{k+1}-x^*\rVert_2\le C\lVert x^k-x^*\rVert_2^2$ với mọi $k\ge k_0$.

Hai khái niệm dùng cùng cách khi thay khoảng cách $\lVert x^k-x^*\rVert_2$ bằng sai số mục tiêu $f(x^k)-f^*$.
:::

Với hội tụ bậc hai, nếu $C\lVert x^{k_0}-x^*\rVert_2\le\tfrac12$ thì $C\lVert x^{k_0+j}-x^*\rVert_2\le(\tfrac12)^{2^j}$: số chữ số đúng xấp xỉ gấp đôi sau mỗi bước, và $j=5$ đã cho $(\tfrac12)^{32}\approx2{,}3\cdot10^{-10}$.

Định lý sau cần Hessian xác định dương đều và Lipschitz gần nghiệm; hằng số Lipschitz của Hessian là $L_H$.

::: theorem Định lý 04.36 (Hội tụ bậc hai cục bộ của Newton) — chứng minh đầy đủ
**Giả thiết.**

- **Miền.** $f$ lớp $C^2$ trên một tập mở lồi chứa hình cầu đóng $\mathcal B=\{x\mid\lVert x-x^*\rVert_2\le r_B\}$, với $\nabla f(x^*)=0$.
- **Độ cong.** Trên $\mathcal B$: $\nabla^2f(x)\succeq\mu I$ với $\mu>0$.
- **Hessian Lipschitz.** Trên $\mathcal B$: $\lVert\nabla^2f(x)-\nabla^2f(y)\rVert_2\le L_H\lVert x-y\rVert_2$.

**Bảo đảm.** Với mọi $x\in\mathcal B$, bước Newton đầy đủ $x^+=x+d$ thỏa

$$
\begin{aligned}
&\lVert x^+-x^*\rVert_2\\
&\quad\le\frac{L_H}{2\mu}\lVert x-x^*\rVert_2^2 .
\end{aligned}
\tag{6.2}
$$

Nếu thêm $\lVert x^0-x^*\rVert_2\le\min\{r_B,\mu/L_H\}$ thì dãy Newton với bước đầy đủ ở lại trong $\mathcal B$, hội tụ về $x^*$ và hội tụ bậc hai.
:::

::: proof Chứng minh Định lý 04.36
**Lộ trình.** Viết $x^+-x^*$ bằng tích phân của Hessian dọc $[x^*,x]$, chặn từng nhân tử, rồi quy nạp.

**Bước 1 (biểu diễn sai số).** Đặt $e=x-x^*$ và $H=\nabla^2f(x)$. Vì $\nabla f(x^*)=0$ và đoạn $[x^*,x]$ nằm trong $\mathcal B$,

$$
\begin{aligned}
\nabla f(x)&=\nabla f(x)-\nabla f(x^*)\\
&=\int_0^1\nabla^2f(x^*+\varsigma e)\,e\,d\varsigma .
\end{aligned}
$$

Từ $x^+=x-H^{-1}\nabla f(x)$, ta có

$$
\begin{aligned}
&x^+-x^*\\
&=e-H^{-1}\int_0^1\nabla^2f(x^*+\varsigma e)\,e\,d\varsigma\\
&=H^{-1}\int_0^1\bigl(H-\nabla^2f(x^*+\varsigma e)\bigr)\\
&\quad\cdot e\,d\varsigma .
\end{aligned}
$$

Trong đó, quan hệ thứ hai viết $e=H^{-1}He=H^{-1}\int_0^1He\,d\varsigma$.

**Bước 2 (chặn từng nhân tử).** $H\succeq\mu I$ cho $\lVert H^{-1}\rVert_2\le\tfrac1\mu$. Tính Lipschitz của Hessian cho $\lVert H-\nabla^2f(x^*+\varsigma e)\rVert_2\le L_H\lVert x-x^*-\varsigma e\rVert_2=L_H(1-\varsigma)\lVert e\rVert_2$.

**Bước 3 (tích phân).**

$$
\begin{aligned}
&\lVert x^+-x^*\rVert_2\\
&\quad\le\frac1\mu\int_0^1L_H(1-\varsigma)\lVert e\rVert_2^2\,d\varsigma\\
&\quad=\frac{L_H}{2\mu}\lVert e\rVert_2^2 .
\end{aligned}
$$

**Bước 4 (dãy lặp).** Nếu $\lVert e\rVert_2\le\min\{r_B,\mu/L_H\}$ thì (6.2) cho $\lVert x^+-x^*\rVert_2\le\tfrac12\lVert e\rVert_2$, nên $x^+\in\mathcal B$ và điều kiện được giữ ở bước sau. Theo quy nạp, khoảng cách giảm ít nhất một nửa mỗi bước, nên dãy hội tụ về $x^*$, và (6.2) cho hội tụ bậc hai với $C=\frac{L_H}{2\mu}$. $\square$
:::

::: example Ví dụ 04.16 (Hội tụ bậc hai trên hàm $s-\log s$)
**Dữ kiện.** $\varphi(s)=s-\log s$, $\varphi'(s)=1-\tfrac1s$, $\varphi''(s)=\tfrac1{s^2}$, $s^0=\tfrac14$, $s^*=1$.

**Công thức một bước.** Với $\varphi'(s)=1-\tfrac1s$ và $\varphi''(s)=\tfrac1{s^2}$, bước đầy đủ là

$$
\begin{aligned}
s^+&=s-\frac{1-1/s}{1/s^2}\\
&=s-(s^2-s)\\
&=2s-s^2 .
\end{aligned}
$$

Do đó

$$
1-s^+=1-2s+s^2=(1-s)^2 .
$$

**Dãy khoảng cách.** Từ $s^0=\tfrac14$: $1-s^k$ bằng $\tfrac34$, $\tfrac9{16}$, $\tfrac{81}{256}$, $\tfrac{6561}{65536}\approx0{,}100$; mỗi bước bình phương khoảng cách trước, đúng Định nghĩa 04.35 với $C=1$.

**Bước thứ hai chi tiết.** Tại $s^1=\tfrac7{16}$: $g=-\tfrac97$, $H=\tfrac{256}{49}$, $d=\tfrac97\cdot\tfrac{49}{256}=\tfrac{63}{256}$, $s^2=\tfrac{112}{256}+\tfrac{63}{256}=\tfrac{175}{256}$. Độ giảm Newton $\delta^2=g^2/H=\tfrac{81}{256}$, mức giảm mô hình $\tfrac{81}{512}\approx0{,}158$, sai số mục tiêu $\varphi(\tfrac7{16})-1=\log\tfrac{16}7-\tfrac9{16}\approx0{,}264$.

**Miền hội tụ.** Với $s^0\in(0,2)$, $\lvert1-s^0\rvert<1$, nên $\lvert1-s^k\rvert=\lvert1-s^0\rvert^{2^k}\to0$. Với $s^0\ge2$, bước đầy đủ cho $s^+=s^0(2-s^0)\le0$, ngoài miền, và quay lui loại điểm thử đó.

**Kiểm tra lại.** $1-\tfrac{175}{256}=(\tfrac9{16})^2$. Trên $\mathcal B=[\tfrac7{16},\tfrac{25}{16}]$, $\mu=(\tfrac{16}{25})^2\approx0{,}41$ và $L_H=2(\tfrac{16}7)^3\approx23{,}9$, nên Định lý 04.36 cho $C=\frac{L_H}{2\mu}\approx29$, lớn hơn nhiều so với $C=1$ thực tế.
:::

Định lý sau ghép quay lui với hội tụ bậc hai thành một kết quả toàn cục.

::: theorem Định lý 04.37 (Hội tụ hai pha của Newton với quay lui) — chứng minh ngoài phạm vi học phần, Boyd và Vandenberghe (2004), §9.5.3, tr. 488–491
**Giả thiết.**

- **Hàm.** $f$ lớp $C^2$; tập mức dưới $S=\{x\mid f(x)\le f(x^0)\}$ đóng.
- **Độ cong.** Trên $S$: $\mu I\preceq\nabla^2f(x)\preceq LI$ và Hessian $L_H$-Lipschitz.
- **Thuật toán.** Thuật toán 04.34 với $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Bảo đảm.** Đặt ngưỡng $\bar g=\min\{1,3(1-2\alpha)\}\mu^2/L_H$ và mức giảm $\gamma_1=\alpha\beta\bar g^2\mu/L^2$.

- (a) *Pha tắt dần* (damped Newton phase): khi $\lVert\nabla f(x^k)\rVert_2\ge\bar g$, $f(x^{k+1})\le f(x^k)-\gamma_1$.
- (b) *Pha bậc hai* (quadratically convergent phase): khi $\lVert\nabla f(x^k)\rVert_2<\bar g$, quay lui nhận $t=1$ ở mọi bước sau, và $\frac{L_H}{2\mu^2}\lVert\nabla f(x^{k+1})\rVert_2\le\Bigl(\frac{L_H}{2\mu^2}\lVert\nabla f(x^k)\rVert_2\Bigr)^2$.
- (c) Số bước để $f(x^k)-f^*\le\varepsilon$ không vượt

$$
\begin{gathered}
\frac{f(x^0)-f^*}{\gamma_1}+\log_2\log_2\frac{\varepsilon_0}{\varepsilon},\\
\varepsilon_0=\frac{2\mu^3}{L_H^2}.
\end{gathered}
$$

:::

Boyd và Vandenberghe (2004) ký hiệu $\mu$, $L$, $L_H$ là $m$, $M$, $L$. Vì $\gamma_1$ và $\varepsilon_0$ chứa $\mu$, $L$, $L_H$ mà thuật toán không biết, cận (c) không cho số bước tính được trước khi chạy.

Ý tưởng chứng minh gồm hai pha. Ở pha tắt dần, Hessian bị chặn trên cho một chặn dưới của bước được nhận, như Bổ đề 04.24, nên mỗi bước giảm $f$ ít nhất $\gamma_1$. Ở pha bậc hai, tính Lipschitz của Hessian cho bước $t=1$ thỏa (5.2) và một bất đẳng thức như (6.2).

![Sơ đồ log của sai số theo vòng lặp k: ở pha tắt dần bên trái, bước nhỏ hơn 1 và log sai số giảm gần tuyến tính; từ khi bước t bằng 1 được nhận, ở pha bậc hai bên phải, log sai số giảm ngày càng nhanh theo truy hồi sai số k cộng 1 không quá C nhân bình phương sai số k.](img/lec-04/newton-phases.svg)

::: remark Nhận xét 04.38 (Khi bỏ giả thiết của hội tụ bậc hai; Hessian không xác định dương)
Mỗi giả thiết của Định lý 04.36 có vai trò riêng:

1. Hessian xác định dương đều cho $\lVert H^{-1}\rVert_2\le\tfrac1\mu$; bỏ nó thì hệ có thể suy biến;
2. Hessian Lipschitz cho số hạng $L_H(1-\varsigma)\lVert e\rVert_2$ ở Bước 2 của chứng minh, nguồn của bình phương trong (6.2);
3. điểm đầu đủ gần nghiệm giữ dãy trong vùng mà hai giả thiết trên đúng.

**Hessian không xác định dương.** Nếu $H$ có giá trị riêng âm, mô hình $Q_H$ không bị chặn dưới và hệ (6.1), nếu giải được, có thể cho $g^Td=-g^TH^{-1}g>0$, tức hướng Newton là hướng tăng. Quay lui Armijo chỉ được định nghĩa cho $g^Td<0$; với $g^Td\ge0$, thủ tục có thể không kết thúc vì mọi bước đủ nhỏ bị loại, hoặc nhận một bước làm $f$ tăng.

**Nhầm lẫn.** Hội tụ bậc hai của Định lý 04.36 là cục bộ: với $\varphi(s)=s-\log s$, điểm đầu $s^0=3$ cho bước đầy đủ $s^+=-3$ ngoài miền.
:::

**Trong học máy.** Newton phù hợp khi số tham số vừa phải và mất mát lồi, vì mỗi bước giải một hệ $n\times n$ với chi phí cấp $n^3$. Với mạng sâu, Hessian có $n^2$ phần tử theo $n$ tham số (Goodfellow, Bengio và Courville 2016, §8.6.1, tr. 313), và mất mát không lồi nên Hessian có giá trị riêng âm gần các *điểm yên ngựa* (saddle point) (§8.2.3, tr. 285–288).

::: exercise Bài tập 04.5 (Newton với quay lui từ $s^0=3$)
Chạy Thuật toán 04.34 trên hàm $\varphi(s)=s-\log s$ từ $s^0=3$ với $\alpha=\tfrac1{10}$, $\beta=\tfrac12$; điểm thử $s+td$ phải dương trước khi tính $\varphi$.

- (a) Tính $g$, $H$, hướng Newton $d$ và $\delta^2$ tại $s^0$.
- (b) Chạy quay lui: nêu các điểm thử bị loại vì ngoài miền và bước được nhận.
- (c) Tính $1-s^1$ và giải thích vì sao từ $s^1$ trở đi bước đầy đủ cho hội tụ bậc hai.
:::

::: hint
Dùng công thức $1-s^+=(1-s)^2$ của Ví dụ 04.16 cho bước đầy đủ.
:::

::: solution
**Câu (a).** $g=1-\tfrac13=\tfrac23$, $H=\tfrac19$, $d=-g/H=-6$, $\delta^2=-g\,d=4$, $\delta=2$.

**Câu (b).** $t=1$: $s=3-6=-3\notin\operatorname{dom}\varphi$, loại. $t=\tfrac12$: $s=0\notin\operatorname{dom}\varphi$, loại. $t=\tfrac14$: $s=\tfrac32$; ngưỡng là $\varphi(3)+\alpha t\,g\,d=(3-\log3)-\tfrac1{10}\cdot\tfrac14\cdot4\approx1{,}9014-0{,}1=1{,}8014$, và $\varphi(\tfrac32)=\tfrac32-\log\tfrac32\approx1{,}0945\le1{,}8014$, nhận. Vậy $s^1=\tfrac32$.

**Câu (c).** $1-s^1=-\tfrac12$, $\lvert1-s^1\rvert<1$. Bước đầy đủ từ $\tfrac32$ cho $s^2=2\cdot\tfrac32-\tfrac94=\tfrac34$ và $1-s^2=\tfrac14=(-\tfrac12)^2$. Theo Ví dụ 04.16, từ mọi $s\in(0,2)$ bước đầy đủ cho $\lvert1-s^k\rvert=\lvert1-s\rvert^{2^k}$.

Bước đầy đủ còn được nhận. Tại $s^1=\tfrac32$, $\delta^2=\tfrac14$ và mức giảm thực tế $\varphi(\tfrac32)-\varphi(\tfrac34)\approx1{,}0945-1{,}0377=0{,}0568$, lớn hơn ngưỡng $\tfrac1{10}\cdot\tfrac14=0{,}025$. Mọi điểm lặp sau có $\lvert1-s\rvert\le\tfrac12$, và trên đoạn $[\tfrac12,\tfrac32]$ bước đầy đủ thỏa (5.2) vì $\varphi(s)-\varphi(2s-s^2)\ge0{,}1(1-s)^2=\alpha\delta^2$ (với $\varphi$, $\delta^2=g^2/H=(1-s)^2$).

Căn cứ của bất đẳng thức cuối: đặt $u=1-s\in[-\tfrac12,\tfrac12]$, khi đó $2s-s^2=1-u^2$ và

$$
\begin{aligned}
E(u)&=\varphi(1-u)-\varphi(1-u^2)\\
&\quad-0{,}1u^2\\
&=0{,}9u^2-u+\log(1+u),\\
E'(u)&=\frac{u(0{,}8+1{,}8u)}{1+u}.
\end{aligned}
$$

$E(0)=0$; $E$ giảm trên $(-\tfrac49,0)$, tăng trên $(0,\tfrac12]$ và tăng trên $[-\tfrac12,-\tfrac49]$. Vì $E(-\tfrac12)=0{,}225+0{,}5-\log2\approx0{,}032>0$, ta có $E\ge0$ trên $[-\tfrac12,\tfrac12]$.

**Kiểm tra lại.** $\varphi(\tfrac34)=0{,}75+0{,}2877=1{,}0377$. Dãy $1-s^k$: $-2$, $-\tfrac12$, $\tfrac14$, $\tfrac1{16}$.
:::

::: exercise Bài tập 04.6 (Newton trên mất mát logistic không chính quy hóa)
Với mất mát logistic không chính quy hóa của Ví dụ 01.8, $J_0(w)=2\log(1+e^{-w})+\log(1+e^w)$, nghiệm là $w^*=\log2$.

- (a) Chứng minh $J_0''(w)=\frac{3e^w}{(1+e^w)^2}$.
- (b) Từ $w^0=0$, tính hướng Newton, $\delta^2$, mức giảm mô hình và sai số mục tiêu $J_0(0)-J_0(\log2)$.
- (c) Biết $w^1=\tfrac23$ và $w^2\approx0{,}693033$, tính các khoảng cách $\lvert w^k-w^*\rvert$ với $k=0,1,2$ và tỷ số $\lvert w^{k+1}-w^*\rvert/\lvert w^k-w^*\rvert^2$.
:::

::: hint
$\ell''(m)=\frac{e^m}{(1+e^m)^2}$ là hàm chẵn; $J_0$ là tổng ba số hạng $\ell(w)$, $\ell(w)$, $\ell(-w)$. $J_0(\log2)=\log\tfrac{27}4$ theo Ví dụ 01.8.
:::

::: solution
**Câu (a).** $J_0(w)=2\ell(w)+\ell(-w)$ với $\ell(m)=\log(1+e^{-m})$. Theo quy tắc dây chuyền, đạo hàm bậc hai của $\ell(-w)$ theo $w$ là $\ell''(-w)=\ell''(w)$ vì $\ell''$ chẵn. Vậy $J_0''(w)=3\ell''(w)=\frac{3e^w}{(1+e^w)^2}$.

**Câu (b).** $J_0'(0)=\frac{1-2}{2}=-\tfrac12$, $J_0''(0)=\tfrac34$. Hướng Newton $d=\frac{1/2}{3/4}=\tfrac23$; $\delta^2=\frac{(1/2)^2}{3/4}=\tfrac13$; mức giảm mô hình $\tfrac16\approx0{,}1667$. Sai số mục tiêu $J_0(0)-\log\tfrac{27}4=3\log2-\log\tfrac{27}4=\log\tfrac{32}{27}\approx0{,}1699$.

**Câu (c).** $\lvert w^0-w^*\rvert\approx0{,}6931$, $\lvert w^1-w^*\rvert\approx0{,}02648$, $\lvert w^2-w^*\rvert\approx0{,}000114$. Tỷ số: $\frac{0{,}02648}{0{,}6931^2}\approx0{,}055$ và $\frac{0{,}000114}{0{,}02648^2}\approx0{,}162$. Hai tỷ số đều nhỏ hơn $0{,}2$, phù hợp với hội tụ bậc hai; khoảng cách giảm từ $2{,}6\cdot10^{-2}$ xuống $1{,}1\cdot10^{-4}$ trong một bước.

**Kiểm tra lại.** $\log\tfrac{32}{27}\approx3{,}4657-3{,}2958=0{,}1699$.
:::

Như vậy, phương pháp Newton bất biến affine, hội tụ bậc hai gần nghiệm và hội tụ hai pha với quay lui. Tuy nhiên, tiêu chí dừng $\tfrac12\delta^2$ chưa chặn được sai số mục tiêu (Nhận xét 04.33), và với ràng buộc $Au=b$, hướng Newton không ràng buộc có thể đưa điểm lặp ra khỏi tập khả thi.

## 7. Newton khả thi cho ràng buộc đẳng thức

### 7.1. Hướng khả thi

Để làm rõ cách hướng Newton không ràng buộc rời tập khả thi, xem ví dụ sau.

::: example Ví dụ 04.17 (Hướng Newton không ràng buộc rời đường $u_1+u_2=14$)
**Dữ kiện.** $F(u)=\tfrac12(2u_1^2+5u_2^2)$, $A=[1\ \ 1]$, $b=14$, $\nabla F(u)=(2u_1,5u_2)^T$, $\nabla^2F=\operatorname{diag}(2,5)$; $u^*=(10,4)^T$, $\nu^*=-20$.

**Hướng Newton không ràng buộc từ điểm khả thi.** Điểm $u^0=(16,-2)^T$ thỏa $16-2=14$, $g=(32,-10)^T$, $H=\operatorname{diag}(2,5)$, $F(u^0)=266$, nên $d=-H^{-1}g=(-16,2)^T$.

**Kiểm tra ràng buộc.** $Ad=-16+2=-14\ne0$. Bước đầy đủ cho $(0,0)^T$, cực tiểu không ràng buộc của $F$, với tổng tọa độ bằng $0$ thay vì $14$.

**Kiểm tra lại.** Tại $u^*$: $\nabla F(u^*)=(20,20)^T=-\nu^*A^T$, gradient vuông góc với đường khả thi.
:::

![Hai trục u1, u2 với đường thẳng u1 cộng u2 bằng 14. Điểm đầu khả thi (16, âm 2) nằm trên đường mức F bằng 266, nghiệm (10, 4) nằm trên đường mức F bằng 140; đường mức 140 tiếp xúc với đường khả thi tại nghiệm.](img/lec-04/equality-start-new.svg)

![Hai trục u1, u2 với đường u1 cộng u2 bằng 14 và miền nhìn từ âm 3 tới 17. Mũi tên d bằng (âm 16, 2) đi từ điểm (16, âm 2) về gốc (0, 0), rời khỏi đường khả thi; nhãn ghi A d bằng âm 14, khác 0.](img/lec-04/equality-violation.svg)

Hướng cần tìm phải nằm dọc đường khả thi, như mệnh đề sau.

::: proposition Mệnh đề 04.39 (Hướng khả thi) — chứng minh đầy đủ
**Giả thiết.** $A\in\mathbb R^{p\times n}$, $Au=b$, $d\in\mathbb R^n$.

**Kết luận.** $A(u+td)=b$ với mọi $t\in\mathbb R$ khi và chỉ khi $Ad=0$, tức $d\in\ker A$.
:::

::: proof Chứng minh Mệnh đề 04.39
$A(u+td)=Au+tAd=b+tAd$. Vế phải bằng $b$ với mọi $t$ khi và chỉ khi $Ad=0$; chiều thuận lấy $t=1$. $\square$
:::

Với $A=[1\ \ 1]$, $\ker A$ là đường $d_1+d_2=0$, song song với đường khả thi.

### 7.2. Bài toán con có đẳng thức và hệ Newton khả thi

Giữ mô hình Newton và chỉ cho phép các hướng khả thi, ta được bài toán con sau.

::: definition Định nghĩa 04.40 (Hướng Newton khả thi; feasible Newton step)
Cho bài toán có đẳng thức của Định nghĩa 04.1, một điểm khả thi $u\in\operatorname{dom}F$ với $Au=b$, $g=\nabla F(u)$ và $H=\nabla^2F(u)$. Bài toán con Newton khả thi là

$$
\begin{aligned}
&\underset{d\in\mathbb R^n}{\operatorname{minimize}}\quad g^Td+\tfrac12d^THd\\
&\text{subject to}\quad Ad=0 .
\end{aligned}
$$

Với hàm Lagrange $\mathcal L_Q(d,\eta)=g^Td+\tfrac12d^THd+\eta^TAd$, nhân tử $\eta\in\mathbb R^p$ tự do dấu, hệ KKT của bài toán con là

$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\eta\end{bmatrix}=-\begin{bmatrix}g\\0\end{bmatrix}.
\tag{7.1}
$$

Nghiệm $d$ gọi là *hướng Newton khả thi* tại $u$. Số $\delta_{eq}=\sqrt{d^THd}$ gọi là *độ giảm Newton của bài toán con* có đẳng thức.
:::

Mục tiêu của bài toán con là $Q_H$ bỏ hằng số $F(u)$. Hai hàng của (7.1) gồm:

- hàng trên là nhóm dừng: đạo hàm của $\mathcal L_Q$ theo $d$ gồm $g$ từ $g^Td$, $Hd$ từ $\tfrac12d^THd$ vì $H$ đối xứng, và $A^T\eta$ từ $\eta^TAd$;
- hàng dưới là nhóm khả thi $Ad=0$, đạo hàm của $\mathcal L_Q$ theo $\eta$.

Hệ (7.1) có dạng (1.2) với $g+Hd$ thay $\nabla F$ và $Ad=0$ thay $Au=b$; khi $p=0$, nó là hệ (6.1).

Định lý sau là phiên bản có ràng buộc của Mệnh đề 04.30.

::: theorem Định lý 04.41 (Hệ KKT của hướng Newton khả thi) — chứng minh đầy đủ
**Giả thiết.**

- **Ràng buộc.** $A$ đủ hạng hàng.
- **Điểm xét.** $u$ khả thi.
- **Độ cong.** $d^THd>0$ với mọi $d\in\ker A$, $d\ne0$; điều này đúng khi $H\succ0$.

**Kết luận.**

- (a) Ma trận khối của (7.1) khả nghịch, nên (7.1) có nghiệm duy nhất $(d,\eta)$.
- (b) $d$ là nghiệm duy nhất của bài toán con Newton khả thi.
- (c) $g^Td=-\delta_{eq}^2$, và mức giảm mô hình là $\tfrac12\delta_{eq}^2$.
- (d) $\delta_{eq}=0$ khi và chỉ khi $(u,\eta)$ thỏa (1.2), tức $u$ là nghiệm của bài toán gốc với $\nu^*=\eta$.
- (e) $A(u+td)=b$ với mọi $t$.
:::

::: proof Chứng minh Định lý 04.41
**Lộ trình.** Hệ thuần nhất chỉ có nghiệm không; so mô hình tại mọi hướng khả thi với $d$; nhân hàng đầu của (7.1) với $d^T$.

**Bước 1 (khả nghịch).** Giả sử $Hd+A^T\eta=0$ và $Ad=0$. Nhân hàng đầu với $d^T$ và dùng $d^TA^T\eta=(Ad)^T\eta=0$, ta được $d^THd=0$. Vì $d\in\ker A$ và $H$ xác định dương trên $\ker A$, $d=0$.

Khi đó $A^T\eta=0$, và $A$ đủ hạng hàng cho $\eta=0$. Hệ thuần nhất chỉ có nghiệm không, nên ma trận vuông kích thước $(n+p)\times(n+p)$ khả nghịch.

**Bước 2 (cực tiểu của bài toán con).** Lấy $d'\in\ker A$ bất kỳ và đặt $e=d'-d\in\ker A$. Khai triển mô hình $Q_H$ (hằng số $F(u)$ triệt tiêu trong hiệu), ta có

$$
\begin{aligned}
&Q_H(d')-Q_H(d)\\
&\quad=(g+Hd)^Te+\tfrac12e^THe\\
&\quad=-\eta^TAe+\tfrac12e^THe\\
&\quad=\tfrac12e^THe .
\end{aligned}
$$

Trong đó, quan hệ thứ hai dùng hàng đầu của (7.1), còn quan hệ thứ ba dùng $Ae=0$. Vế phải dương khi $e\ne0$, nên $d$ là nghiệm duy nhất.

**Bước 3 (hướng giảm và mức giảm).** Nhân hàng đầu của (7.1) với $d^T$, ta có $g^Td+d^THd+(Ad)^T\eta=0$, và $Ad=0$, nên $g^Td=-d^THd=-\delta_{eq}^2$. Mức giảm mô hình là $-g^Td-\tfrac12d^THd=\tfrac12\delta_{eq}^2$.

**Bước 4 (phần d).** Nếu $\delta_{eq}=0$ thì $d=0$ vì $d\in\ker A$ và $H$ xác định dương trên $\ker A$; hàng đầu của (7.1) thành $g+A^T\eta=0$, cùng với $Au=b$ là (1.2). Ngược lại, nếu $(u,\nu^*)$ thỏa (1.2) thì $(d,\eta)=(0,\nu^*)$ thỏa (7.1), và theo tính duy nhất ở Bước 1, $d=0$.

**Bước 5 (phần e).** Áp Mệnh đề 04.39 với $Ad=0$. $\square$
:::

Theo phần (c), quay lui trên $F$ dừng sau hữu hạn lần co (Mệnh đề 04.11).

**Trong học máy.** Khi tham số phải thỏa một đẳng thức tuyến tính, như trọng số trộn $w_1+\cdots+w_K=1$, ràng buộc được giữ chính xác ở mọi bước Newton khả thi mà không cần phạt hay chiếu lại, và tại nghiệm $\eta=\nu^*$ (Định lý 04.41(d)), với $-\nu^*$ là đạo hàm của mất mát tối ưu theo $b$ (Hệ quả 03.24).

::: example Ví dụ 04.18 (Một bước Newton khả thi cho bài toán trên đường $u_1+u_2=14$)
**Dữ kiện.** $F(u)=\tfrac12(2u_1^2+5u_2^2)$, $A=[1\ \ 1]$, $b=14$; $u^*=(10,4)^T$, $\nu^*=-20$, $F^*=140$; điểm khả thi $u^0=(16,-2)^T$ với $F(u^0)=266$.

**Lập hệ.** Tại $u^0=(16,-2)^T$: $g=(32,-10)^T$, $H=\operatorname{diag}(2,5)$. Hệ (7.1) gồm ba phương trình:

$$
\begin{aligned}
2d_1+\eta&=-32,\\
5d_2+\eta&=10,\\
d_1+d_2&=0 .
\end{aligned}
$$

**Giải.** Trừ hàng hai khỏi hàng một: $2d_1-5d_2=-42$. Thay $d_2=-d_1$: $7d_1=-42$, nên $d=(-6,6)^T$, và từ hàng đầu $\eta=-32-2d_1=-20$.

**Bước đầy đủ.** $u^0+d=(10,4)^T=u^*$. Mức giảm thực tế $266-140=126$; mức giảm mô hình $\tfrac12\delta_{eq}^2=\tfrac12(2\cdot36+5\cdot36)=126$.

**Kiểm tra lại.** $Ad=0$; tại điểm mới, $\nabla F+A^T\eta=(20,20)^T-20(1,1)^T=0$, nên $\eta=\nu^*$.
:::

![Hai trục u1, u2 với đường u1 cộng u2 bằng 14 và miền nhìn từ âm 3 tới 17. Mũi tên d bằng (âm 6, 6) đi từ điểm (16, âm 2) tới điểm (10, 4) dọc theo đường khả thi; nhãn ghi A d bằng 0 và t bằng 1. Hai đường mức F bằng 266 và F bằng 140 đi qua hai điểm này.](img/lec-04/equality-feasible-step.svg)

Bước dẫn đúng tới nghiệm vì $F$ bậc hai: $g+Hd=\nabla F(u+d)$.

::: remark Nhận xét 04.42 (Cấu trúc của ma trận khối)
**Không xác định dương.** Ma trận khối của (7.1) đối xứng nhưng không xác định dương: với $d=0$ và $\eta\ne0$, dạng toàn phương của nó bằng $2\eta^TA\cdot0+0=0$. Khi $H\succeq0$ và ma trận khối khả nghịch, nó có đúng $n$ giá trị riêng dương và $p$ giá trị riêng âm (Boyd và Vandenberghe 2004, Bài tập 10.1(b), tr. 557). Do đó không áp dụng phân rã Cholesky cho cả ma trận; các bộ giải dùng phân rã đối xứng $LDL^T$ hoặc khử khối (Boyd và Vandenberghe 2004, §10.4, tr. 542–546).

**Chỉ cần xác định dương trên $\ker A$.** Với $H=\operatorname{diag}(1,-1)$ và $A=[0\ \ 1]$, $H$ không nửa xác định dương, nhưng $\ker A=\{(d_1,0)\}$ và $d^THd=d_1^2>0$ trên đó, nên hệ (7.1) khả nghịch theo Định lý 04.41.
:::

### 7.3. Khử biến và hệ rút gọn

Một cách trực quan, tập khả thi là một mặt phẳng affine số chiều $n-p$; trong tọa độ trên mặt phẳng đó, bài toán không còn ràng buộc.

::: proposition Mệnh đề 04.43 (Khử biến và hệ Newton rút gọn; elimination) — chứng minh đầy đủ
**Giả thiết.**

- **Ràng buộc.** $A$ đủ hạng hàng.
- **Tham số hóa.** $\hat u$ thỏa $A\hat u=b$; $Z\in\mathbb R^{n\times(n-p)}$ có các cột là một cơ sở của $\ker A$; $u=\hat u+Zz$ khả thi.
- **Độ cong.** $H$ xác định dương trên $\ker A$.

**Kết luận.**

- (a) Tập $\{u\mid Au=b\}$ bằng $\{\hat u+Zz\mid z\in\mathbb R^{n-p}\}$, và mỗi điểm khả thi ứng với đúng một $z$.
- (b) $Z^THZ\succ0$.
- (c) Hệ rút gọn

$$
Z^THZ\,\Delta z=-Z^Tg
\tag{7.2}
$$

có nghiệm duy nhất, và $d=Z\Delta z$ là hướng Newton khả thi của (7.1).
- (d) $\Delta z$ là hướng Newton tại $z$ của hàm rút gọn $\psi(z)=F(\hat u+Zz)$, và độ giảm Newton của $\psi$ tại $z$ bằng $\delta_{eq}$.
:::

Hệ rút gọn không cho $\eta$; khi cần, $\eta$ tính lại từ hàng dừng. Việc tính $Z$ có chi phí riêng và có thể phá cấu trúc thưa của $H$.

::: proof Chứng minh Mệnh đề 04.43
**Lộ trình.** Tham số hóa tập khả thi bằng $\hat u+Zz$; chuyển tính xác định dương trên $\ker A$ sang $Z^THZ$; nhận ra (7.2) là hệ Newton của hàm rút gọn.

**Bước 1 (phần a).** Nếu $Au=b$ thì $A(u-\hat u)=0$, nên $u-\hat u\in\ker A$ là tổ hợp các cột của $Z$: $u-\hat u=Zz$. Ngược lại, $A(\hat u+Zz)=b+AZz=b$. Các cột của $Z$ độc lập tuyến tính nên $z$ duy nhất.

**Bước 2 (phần b).** Với $v\ne0$, $Zv\ne0$ vì các cột của $Z$ độc lập, và $Zv\in\ker A$. Do đó $v^TZ^THZv=(Zv)^TH(Zv)>0$.

**Bước 3 (phần c).** Theo (b), (7.2) có nghiệm duy nhất. Đặt $d=Z\Delta z$; ta có $Ad=0$. Hệ (7.2) có nghĩa là $Z^T(g+Hd)=0$, tức $g+Hd$ trực giao với mọi cột của $Z$, nên trực giao với $\ker A$.

Theo Mệnh đề 00.8, $g+Hd=-A^T\eta$ với một $\eta\in\mathbb R^p$. Vậy $(d,\eta)$ thỏa (7.1), và theo Định lý 04.41(a), đó là nghiệm duy nhất.

**Bước 4 (phần d).** Theo quy tắc dây chuyền, $\nabla\psi(z)=Z^Tg$ và $\nabla^2\psi(z)=Z^THZ$, nên (7.2) là hệ Newton của $\psi$. Bình phương độ giảm Newton của $\psi$ là

$$
\begin{aligned}
&\Delta z^TZ^THZ\Delta z\\
&\quad=(Z\Delta z)^TH(Z\Delta z)\\
&\quad=d^THd\\
&\quad=\delta_{eq}^2 .
\end{aligned}
$$

Quan hệ thứ hai dùng $d=Z\Delta z$, còn quan hệ cuối là Định nghĩa 04.40. $\square$
:::

Theo phần (d), Newton khả thi là Newton không ràng buộc trên $\psi$, nên các kết quả như Định lý 04.36 áp dụng qua $\psi$.

::: example Ví dụ 04.19 (Khử biến cho bài toán trên đường $u_1+u_2=14$)
**Dữ kiện.** $F(u)=\tfrac12(2u_1^2+5u_2^2)$, $u_1+u_2=14$; tại $u^0=(16,-2)^T$: $g=(32,-10)^T$, $H=\operatorname{diag}(2,5)$; $d=(-6,6)^T$, $\delta_{eq}^2=252$ (Ví dụ 04.18).

**Tham số hóa.** $\hat u=(14,0)^T$ thỏa $A\hat u=14$; $Z=(-1,1)^T$ thỏa $AZ=0$. Điểm khả thi $u(z)=(14-z,z)^T$, và $u^0=(16,-2)^T$ ứng với $z^0=-2$.

**Hệ rút gọn.** $Z^THZ=(-1)^2\cdot2+1^2\cdot5=7$ và $Z^Tg=-32-10=-42$. Hệ (7.2): $7\Delta z=42$, nên $\Delta z=6$ và $d=Z\Delta z=(-6,6)^T$, trùng Ví dụ 04.18.

**Hàm rút gọn.** $\psi(z)=\tfrac12\bigl(2(14-z)^2+5z^2\bigr)=196-28z+\tfrac72z^2$, với $\psi'(z)=-28+7z$ và cực tiểu tại $z^*=4$, tức $u^*=(10,4)^T$. Bước $\Delta z=z^*-z^0=6$.

**Kiểm tra lại.** $\psi(-2)=196+56+14=266=F(u^0)$ và $\psi(4)=196-112+56=140=F^*$. Bình phương độ giảm Newton của $\psi$ tại $z^0$ là $\frac{\psi'(-2)^2}{\psi''}=\frac{42^2}7=252=\delta_{eq}^2$.
:::

![Hai trục u1, u2 với đường u1 cộng u2 bằng 14. Điểm u mũ bằng (14, 0) ứng với z bằng 0; vector Z bằng (âm 1, 1) chỉ dọc đường khả thi. Điểm đầu ứng với z0 bằng âm 2 là (16, âm 2); nghiệm ứng với z sao bằng 4 là (10, 4). Số gia Delta z bằng 6 cho hướng d bằng Z nhân Delta z bằng (âm 6, 6).](img/lec-04/equality-nullspace.svg)

Ghép các phần trên, ta được thuật toán Newton khả thi.

::: algorithm Thuật toán 04.44 (Newton khả thi; feasible start Newton method)
**Đầu vào.** Điểm đầu $u^0\in\operatorname{dom}F$ với $Au^0=b$; dung sai $\varepsilon_{\mathrm{model}}>0$; tham số $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Lặp** với $k=0,1,2,\ldots$:

1. Tính $g=\nabla F(u^k)$ và $H=\nabla^2F(u^k)$.
2. Giải hệ (7.1) để được $(d,\eta)$, hoặc hệ (7.2) rồi đặt $d=Z\Delta z$.
3. Tính $\delta_{eq}^2=d^THd$.
4. Nếu $\tfrac12\delta_{eq}^2\le\varepsilon_{\mathrm{model}}$: dừng, trả về $u^k$ và $\eta$.
5. Chọn $t$ bằng quay lui Armijo trên $F$ theo hướng $d$, loại các điểm thử ngoài $\operatorname{dom}F$.
6. Cập nhật $u^{k+1}=u^k+td$.

**Đầu ra.** Điểm khả thi $u$ với $\tfrac12\delta_{eq}^2\le\varepsilon_{\mathrm{model}}$ và ước lượng nhân tử $\eta$.

**Điều kiện đủ.** $A$ đủ hạng hàng, $H$ xác định dương trên $\ker A$ tại mọi điểm lặp.

**Chi phí mỗi vòng lặp.** Hệ khối đặc kích thước $n+p$: cấp $(n+p)^3$ phép nhân; hệ rút gọn kích thước $n-p$ sau khi đã có $Z$.
:::

::: remark Nhận xét 04.45 (Tính khả thi của các điểm lặp)
Theo Định lý 04.41(e), mọi điểm lặp của Thuật toán 04.44 thỏa $Au^k=b$: quay lui chỉ thay độ dài bước $t$, còn phương $d$ nằm trong $\ker A$.
:::

**Trong học máy.** Bài toán phân bổ tài nguyên $\min\sum_if_i(x_i)$ với $\sum_ix_i=b$ có $A=\mathbf 1^T$ và Hessian đường chéo $h_i=f_i''(x_i)>0$ (MIT 6.079, Lecture 17, tr. 5); hệ (7.1) giải bằng $d_i=-(g_i+\eta)/h_i$ và $\sum_id_i=0$, với chi phí tỷ lệ với $n$.

::: exercise Bài tập 04.7 (Newton khả thi từ $(8,6)^T$)
Xét bài toán $\min F(u)=\tfrac12(2u_1^2+5u_2^2)$ với $u_1+u_2=14$ tại điểm khả thi $u=(8,6)^T$:

- (a) lập hệ (7.1), giải $d$ và $\eta$, kiểm tra $Ad=0$, tính $u+d$ và mức giảm của $F$;
- (b) với $Z=(-1,1)^T$, giải (7.2) và so với (a);
- (c) giải thích vì sao $\eta$ ở (a) bằng $\eta$ của Ví dụ 04.18, dù điểm đầu khác.
:::

::: hint
$g=(16,30)^T$. Ở (c), dùng lập luận cuối của Ví dụ 04.18 về hàng dừng tại $u+d$.
:::

::: solution
**Câu (a).** Hệ: $2d_1+\eta=-16$, $5d_2+\eta=-30$, $d_1+d_2=0$. Trừ hai hàng đầu: $2d_1-5d_2=14$; thay $d_2=-d_1$: $7d_1=14$, nên $d=(2,-2)^T$, $\eta=-16-4=-20$. $Ad=0$; $u+d=(10,4)^T$; $F(8,6)=\tfrac12(128+180)=154$, nên $F$ giảm $14=\tfrac12(2\cdot4+5\cdot4)$.

**Câu (b).** $Z^THZ=7$, $Z^Tg=-16+30=14$, nên $7\Delta z=-14$, $\Delta z=-2$, $d=(2,-2)^T$, trùng (a).

**Câu (c).** $F$ bậc hai nên $g+Hd=\nabla F(u+d)$, và hàng dừng của (7.1) là $\nabla F(u+d)+A^T\eta=0$. Bước đầy đủ từ mọi điểm khả thi tới đúng $u^*$, nên hàng này là (1.2) tại $u^*$, và $\eta=\nu^*=-20$ theo tính duy nhất của nhân tử (Mệnh đề 04.2).

**Kiểm tra lại.** $\nabla F(10,4)-20(1,1)^T=(20-20,20-20)^T=0$.
:::

::: exercise Bài tập 04.8 (Hệ khối và hệ rút gọn cho ba biến)
Xét $\min F(u)=\tfrac12(u_1^2+2u_2^2+2u_3^2)$ với $u_1+u_2+u_3=5$, điểm đầu khả thi $u^0=(5,0,0)^T$.

- (a) Giải hệ (7.1) tại $u^0$.
- (b) Với $Z=\begin{bmatrix}-1&-1\\1&0\\0&1\end{bmatrix}$, kiểm tra $AZ=0$, lập và giải hệ rút gọn (7.2) và so với (a).
- (c) Tính $F(u^0)$, $F(u^0+d)$ và $\tfrac12\delta_{eq}^2$.
:::

::: hint
Ở (a), hai hàng dừng cuối cho $d_2=d_3$. Ở (b), $Z^THZ$ là ma trận $2\times2$.
:::

::: solution
**Câu (a).** $g=(5,0,0)^T$, $H=\operatorname{diag}(1,2,2)$. Hệ: $d_1+\eta=-5$, $2d_2+\eta=0$, $2d_3+\eta=0$, $d_1+d_2+d_3=0$. Từ hai hàng giữa, $d_2=d_3=-\eta/2$; hàng cuối cho $d_1=\eta$; hàng đầu cho $2\eta=-5$. Vậy $\eta=-\tfrac52$, $d=(-\tfrac52,\tfrac54,\tfrac54)^T$.

**Câu (b).** $AZ=(-1+1+0,\,-1+0+1)=(0,0)$. $Z^THZ=\begin{bmatrix}1+2&1\\1&1+2\end{bmatrix}=\begin{bmatrix}3&1\\1&3\end{bmatrix}$ và $Z^Tg=(-5,-5)^T$. Hệ $3\Delta z_1+\Delta z_2=5$, $\Delta z_1+3\Delta z_2=5$ cho $\Delta z=(\tfrac54,\tfrac54)^T$, nên $d=Z\Delta z=(-\tfrac52,\tfrac54,\tfrac54)^T$, trùng (a).

**Câu (c).** $F(u^0)=\tfrac{25}2$. $u^0+d=(\tfrac52,\tfrac54,\tfrac54)^T$ và $F=\tfrac12(\tfrac{25}4+\tfrac{25}8+\tfrac{25}8)=\tfrac{25}4$. $\delta_{eq}^2=\tfrac{25}4+2\cdot\tfrac{25}{16}+2\cdot\tfrac{25}{16}=\tfrac{25}2$, nên $\tfrac12\delta_{eq}^2=\tfrac{25}4=F(u^0)-F(u^0+d)$.

**Kiểm tra lại.** Tại $u^0+d$: $\nabla F=(\tfrac52,\tfrac52,\tfrac52)^T$ và $\nabla F+\eta\mathbf 1=0$, nên điểm mới thỏa (1.2) với $\nu^*=-\tfrac52$.
:::

Như vậy, Newton khả thi giữ tính khả thi và chính là Newton trên hàm rút gọn $\psi$. Tuy nhiên, nó đòi điểm đầu thỏa $Au^0=b$: tại điểm chưa khả thi, mọi $d\in\ker A$ giữ nguyên sai lệch $Au-b$.

## 8. Phương pháp Newton từ điểm chưa khả thi

Một điểm vừa thỏa $Au=b$ vừa thuộc $\operatorname{dom}F$ có thể khó tìm, chẳng hạn khi $F$ chứa $-\log u_i$ hoặc khi $b$ thay đổi.

Tại $u=(1,8)^T$, tổng tọa độ bằng $9\ne14$, và mọi bước theo $\ker A$ giữ tổng bằng $9$.

### 8.1. Phần dư KKT

Về mặt ý tưởng, ta đo độ lệch của từng nhóm phương trình và tìm bước làm cả hai độ lệch tiến về $0$.

::: definition Định nghĩa 04.46 (Phần dư KKT; KKT residual)
Cho bài toán có đẳng thức của Định nghĩa 04.1, $u\in\operatorname{dom}F$ và $\nu\in\mathbb R^p$.

- *Phần dư đối ngẫu* (dual residual): $r_d(u,\nu)=\nabla F(u)+A^T\nu\in\mathbb R^n$.
- *Phần dư gốc* (primal residual; còn gọi là phần dư khả thi): $r_p(u)=Au-b\in\mathbb R^p$.
- *Phần dư ghép* (KKT residual vector): $r(u,\nu)=(r_d,r_p)\in\mathbb R^{n+p}$.
:::

Hai phần dư là vế trái của hai nhóm phương trình (1.2), nên theo Mệnh đề 04.2(b), $u$ là nghiệm với nhân tử $\nu$ khi và chỉ khi $r(u,\nu)=0$. Chỉ số $d$ trong $r_d$ viết tắt dual, khác hướng $d$; chỉ số $p$ viết tắt primal, khác số ràng buộc $p$.

Ở đây $\nu$ là một phần của điểm lặp và được cập nhật cùng $u$.

::: example Ví dụ 04.20 (Phần dư của bài toán trên đường $u_1+u_2=14$ tại một điểm chưa khả thi)
**Dữ kiện.** $F(u)=\tfrac12(2u_1^2+5u_2^2)$, $A=[1\ \ 1]$, $b=14$; điểm $u=(1,8)^T$, ước lượng ban đầu $\nu=4$.

**Tính.** $\nabla F(u)=(2u_1,5u_2)^T=(2,40)^T$; $A^T\nu=(4,4)^T$; $r_d=(6,44)^T$. $r_p=1+8-14=-5$.

**Kiểm tra lại.** $44=40+4$; $r_p<0$ vì tổng tọa độ nhỏ hơn $14$.
:::

![Hai trục u1, u2 với đường khả thi u1 cộng u2 bằng 14 và nghiệm (10, 4) có F sao bằng 140. Điểm đầu chưa khả thi (1, 8) nằm dưới đường khả thi; nhãn ghi r p bằng 9 trừ 14 bằng âm 5.](img/lec-04/equality-infeasible-start.svg)

### 8.2. Tuyến tính hóa hệ KKT

Áp cách đọc (d) của Mệnh đề 04.30 cho hệ $r(u,\nu)=0$, ta được mệnh đề sau.

::: proposition Mệnh đề 04.47 (Hệ Newton cho phần dư KKT) — chứng minh đầy đủ
**Giả thiết.**

- **Hàm.** $F$ lớp $C^2$ quanh $u\in\operatorname{dom}F$, $H=\nabla^2F(u)$.
- **Ràng buộc.** $A$ đủ hạng hàng.
- **Độ cong.** $H$ xác định dương trên $\ker A$.

**Kết luận.**

- (a) Xấp xỉ bậc một của hai phần dư theo số gia $d\in\mathbb R^n$, $\Delta\nu\in\mathbb R^p$ là

$$
\begin{aligned}
&r_d(u+d,\nu+\Delta\nu)\\
&\quad\approx r_d+Hd+A^T\Delta\nu,\\
&r_p(u+d)=r_p+Ad,
\end{aligned}
$$

trong đó hệ thức thứ hai là đẳng thức. Đặt hai vế phải bằng $0$ được hệ

$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\Delta\nu\end{bmatrix}=-\begin{bmatrix}r_d\\r_p\end{bmatrix},
\tag{8.1}
$$

có nghiệm duy nhất.
- (b) Đặt $\eta=\nu+\Delta\nu$. Hàng đầu của (8.1) là $g+Hd+A^T\eta=0$. Khi $r_p=0$, nghiệm $(d,\eta)$ của (8.1) là nghiệm của (7.1).
- (c) Với mọi $t$: $r_p(u+td)=(1-t)r_p$ và $\nu+t\Delta\nu=(1-t)\nu+t\eta$.
- (d) Nếu $F$ bậc hai thì $r(u+td,\nu+t\Delta\nu)=(1-t)\,r(u,\nu)$ với mọi $t$; nói riêng, bước $t=1$ cho nghiệm KKT.

:::

Mệnh đề không cần $u$ khả thi.

::: proof Chứng minh Mệnh đề 04.47
**Lộ trình.** Tuyến tính hóa $\nabla F$ trong $r_d$, giữ nguyên phần affine; dùng hàng sau của (8.1) cho sai lệch ràng buộc và hàng đầu cho trường hợp $F$ bậc hai.

**Bước 1 (tuyến tính hóa).** Trong $r_d=\nabla F(u)+A^T\nu$, chỉ $\nabla F$ phi tuyến: $\nabla F(u+d)=\nabla F(u)+Hd+o(\lVert d\rVert_2)$, còn $A^T(\nu+\Delta\nu)=A^T\nu+A^T\Delta\nu$ đúng chính xác. Cộng lại, ta được xấp xỉ thứ nhất.

Ràng buộc affine cho $A(u+d)-b=r_p+Ad$ chính xác. Đặt hai vế phải bằng $0$ được (8.1), có ma trận của (7.1), khả nghịch theo Định lý 04.41(a).

**Bước 2 (phần b).** Thay $r_d=g+A^T\nu$ vào hàng đầu, ta có $g+A^T\nu+Hd+A^T\Delta\nu=g+Hd+A^T(\nu+\Delta\nu)=0$. Khi $r_p=0$, hàng sau là $Ad=0$, nên $(d,\eta)$ thỏa (7.1).

**Bước 3 (phần c).** Dùng hàng sau của (8.1), $Ad=-r_p$, ta có

$$
\begin{aligned}
r_p(u+td)&=Au+tAd-b\\
&=r_p-tr_p\\
&=(1-t)r_p .
\end{aligned}
$$

Với nhân tử, $\nu+t\Delta\nu=\nu+t(\eta-\nu)=(1-t)\nu+t\eta$.

**Bước 4 (phần d).** Khi $F$ bậc hai, $\nabla F$ affine với ma trận $H$ không đổi. Dùng hàng đầu của (8.1), $Hd+A^T\Delta\nu=-r_d$, ta có

$$
\begin{aligned}
&r_d(u+td,\nu+t\Delta\nu)\\
&\quad=r_d+t(Hd+A^T\Delta\nu)\\
&\quad=r_d-tr_d\\
&\quad=(1-t)r_d .
\end{aligned}
$$

Cùng với (c), $r$ co theo hệ số $1-t$. $\square$
:::

Bảng sau đối chiếu hai hệ.

| Đối chiếu | Điểm khả thi, hệ (7.1) | Điểm chưa khả thi, hệ (8.1) |
|---|---|---|
| Ẩn thứ hai | nhân tử $\eta$ của bài toán con | số gia $\Delta\nu$ của nhân tử hiện tại |
| Vế phải | $-(g,0)$ | $-(r_d,r_p)$ |
| Điều kiện khả nghịch | $A$ đủ hạng hàng, $H$ xác định dương trên $\ker A$ | giữ nguyên |

Theo phần (c), sai lệch ràng buộc co theo hệ số $1-t$ với mọi $F$; sau một bước $t=1$, điểm lặp khả thi, và theo (b), hướng trùng hướng Newton khả thi.

::: example Ví dụ 04.21 (Một bước Newton cho phần dư của bài toán trên đường $u_1+u_2=14$)
**Dữ kiện.** $F(u)=\tfrac12(2u_1^2+5u_2^2)$, $u_1+u_2=14$; $u^*=(10,4)^T$, $\nu^*=-20$. Tại $u=(1,8)^T$, $\nu=4$: $r_d=(6,44)^T$, $r_p=-5$ (Ví dụ 04.20).

**Lập hệ.** Với các giá trị trên, hệ (8.1) là

$$
\begin{aligned}
2d_1+\Delta\nu&=-6,\\
5d_2+\Delta\nu&=-44,\\
d_1+d_2&=5 .
\end{aligned}
$$

**Giải.** Trừ hàng hai khỏi hàng một: $2d_1-5d_2=38$. Thay $d_2=5-d_1$: $7d_1-25=38$, nên $d_1=9$, $d_2=-4$, và $\Delta\nu=-6-18=-24$.

**Bước đầy đủ.** $u^+=(10,4)^T$, $\nu^+=4-24=-20$.

**Kiểm tra lại.** $r_p^+=10+4-14=0$; $r_d^+=(20,20)^T+(-20)(1,1)^T=(0,0)^T$. Điểm mới là nghiệm với $F^*=140$, đúng Mệnh đề 04.47(d).
:::

### 8.3. Chuẩn phần dư như thước đo tiến triển

Tại điểm chưa khả thi, quy tắc Armijo trên $F$ không dùng được.

::: example Ví dụ 04.22 (Mục tiêu phải tăng trên đường tới nghiệm)
**Dữ kiện.** $F(u)=\tfrac12(2u_1^2+5u_2^2)$, $u_1+u_2=14$, $H=\operatorname{diag}(2,5)$; $F^*=140$ tại $u^*=(10,4)^T$. Điểm xét: $u=(0,0)^T$, $\nu=0$.

**Tính.** $F(0,0)=0<140=F^*$, $r_p=-14$, $r_d=(0,0)^T$. Hệ (8.1): $2d_1+\Delta\nu=0$, $5d_2+\Delta\nu=0$, $d_1+d_2=14$, cho $d=(10,4)^T$, $\Delta\nu=-20$.

**Kết luận.** Mọi điểm khả thi có $F\ge140>0=F(0,0)$, nên mọi quỹ đạo tới tập khả thi làm $F$ tăng ít nhất $140$. Một quy tắc đòi $F$ giảm sẽ loại cả bước đúng $d=(10,4)^T$.

**Kiểm tra lại.** Với $t=\tfrac12$: $u=(5,2)^T$, $\nu=-10$, $r_d=(10-10,10-10)^T=0$ và $r_p(5,2)=7-14=-7=\tfrac12r_p(0,0)$, khớp Mệnh đề 04.47(d).
:::

Thước đo thay thế là chuẩn của phần dư ghép, bằng $0$ đúng tại nghiệm KKT.

::: proposition Mệnh đề 04.48 (Chuẩn phần dư giảm dọc hướng Newton) — chứng minh đầy đủ
**Giả thiết.** $F$ lớp $C^2$; $(u,\nu)$ với $r=r(u,\nu)\ne0$; $(d,\Delta\nu)$ là nghiệm của (8.1); $\Phi(t)=\lVert r(u+td,\nu+t\Delta\nu)\rVert_2$.

**Kết luận.**

- (a) $\Phi'(0)=-\lVert r\rVert_2<0$.
- (b) Với mọi $\alpha\in(0,1)$, có $\bar t>0$ sao cho $\Phi(t)\le(1-\alpha t)\lVert r\rVert_2$ với mọi $t\in(0,\bar t]$.
:::

Mệnh đề đúng cả khi $F$ không lồi và $u$ chưa khả thi.

::: proof Chứng minh Mệnh đề 04.48
**Lộ trình.** Nhận ra ma trận của (8.1) là ma trận Jacobian của $r$, tính đạo hàm của $\tfrac12\Phi^2$ tại $0$, rồi dùng khai triển bậc một của $\Phi$.

**Bước 1 (ma trận Jacobian của phần dư).** Theo biến $(u,\nu)$, đạo hàm của $r_d$ là $[H\ \ A^T]$, của $r_p$ là $[A\ \ 0]$. Ma trận Jacobian $J_r$ của $r$ vì vậy là ma trận khối của (8.1), và (8.1) viết gọn là $J_r\Delta=-r$ với $\Delta=(d,\Delta\nu)$.

**Bước 2 (đạo hàm của bình phương chuẩn).** Theo quy tắc dây chuyền, ta có

$$
\begin{aligned}
&\frac{d}{dt}\tfrac12\Phi(t)^2\Big|_{t=0}\\
&\quad=r^TJ_r\Delta\\
&\quad=-r^Tr\\
&\quad=-\lVert r\rVert_2^2 .
\end{aligned}
$$

Quan hệ thứ hai dùng $J_r\Delta=-r$. Vì $\Phi(0)=\lVert r\rVert_2>0$, $\Phi$ khả vi tại $0$ và $\Phi'(0)=\frac{-\lVert r\rVert_2^2}{\lVert r\rVert_2}=-\lVert r\rVert_2$.

**Bước 3 (phần b).** $\Phi(t)=\lVert r\rVert_2-t\lVert r\rVert_2+o(t)$. Vì $(1-\alpha)\lVert r\rVert_2>0$, có $\bar t$ sao cho $o(t)\le(1-\alpha)t\lVert r\rVert_2$ trên $(0,\bar t]$, cho $\Phi(t)\le(1-\alpha t)\lVert r\rVert_2$. $\square$
:::

Mệnh đề 04.48 đóng vai trò của Mệnh đề 04.11, với $-\lVert r\rVert_2$ thay $g^Td$ trong (5.2). Ghép hệ (8.1) với quy tắc nhận bước trên $\lVert r\rVert_2$, ta được thuật toán sau.

::: algorithm Thuật toán 04.49 (Newton từ điểm chưa khả thi; infeasible start Newton method)
**Đầu vào.** $u^0\in\operatorname{dom}F$, $\nu^0\in\mathbb R^p$; dung sai $\varepsilon_p,\varepsilon_d>0$; tham số $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Lặp** với $k=0,1,2,\ldots$:

1. Tính $r_d=\nabla F(u^k)+A^T\nu^k$ và $r_p=Au^k-b$.
2. Nếu $\lVert r_p\rVert_2\le\varepsilon_p$ và $\lVert r_d\rVert_2\le\varepsilon_d$: dừng.
3. Giải (8.1) để được $(d,\Delta\nu)$.
4. Quay lui từ $t=1$: trong khi $u^k+td\notin\operatorname{dom}F$ hoặc $\lVert r(u^k+td,\nu^k+t\Delta\nu)\rVert_2>(1-\alpha t)\lVert r\rVert_2$, gán $t\leftarrow\beta t$.
5. Cập nhật $u^{k+1}=u^k+td$, $\nu^{k+1}=\nu^k+t\Delta\nu$.

**Đầu ra.** $(u,\nu)$ đạt hai dung sai.

**Điều kiện đủ.** $A$ đủ hạng hàng, $H$ xác định dương trên $\ker A$ tại mọi điểm lặp.

**Chi phí mỗi vòng lặp.** Như Thuật toán 04.44, cộng các lần tính $r$ khi thử bước.
:::

Hai dung sai được kiểm tra đồng thời vì mỗi phần dư ứng với một nhóm của (1.2). Ở Ví dụ 04.21, với $\alpha=0{,}1$, $\lVert r^+\rVert_2=0\le0{,}9\sqrt{1997}$, nên Thuật toán 04.49 nhận $t=1$.

::: remark Nhận xét 04.50 (Số gia, nhân tử mới và ý nghĩa của phần dư nhỏ)
**Số gia và nhân tử.** Nhân tử sau bước đầy đủ là $\nu+\Delta\nu$, không phải $\Delta\nu$ (Ví dụ 04.21: $\Delta\nu=-24$, $\nu^+=-20$).

**Phần dư nhỏ.** $\lVert r\rVert_2$ nhỏ chứng nhận điểm lặp thỏa (1.2) theo dung sai, và không chứng nhận $F(u)-F^*$ nhỏ. Tại điểm chưa khả thi, hiệu $F(u)-F^*$ có thể âm (Ví dụ 04.22), nên không đo sai số.

**Tốc độ.** Nếu tập $\{(u,\nu)\mid\lVert r(u,\nu)\rVert_2\le\lVert r(u^0,\nu^0)\rVert_2\}$ đóng, và trên tập đó $J_r^{-1}$ bị chặn và $J_r$ Lipschitz, thì $\lVert r\rVert_2$ giảm ít nhất một lượng cố định ở mỗi bước cho tới khi bước $t=1$ được nhận, rồi hội tụ bậc hai (Boyd và Vandenberghe 2004, §10.3.3, tr. 536–540).

**Hai lỗi lập hệ.** Lỗi thứ nhất là bỏ $A^T\nu$ khi lập $r_d$; lỗi thứ hai là lấy vế phải của hàng ràng buộc là $r_p$ thay vì $-r_p$.
:::

**Trong học máy.** Thuật toán 04.49 cho phép khởi đầu từ trọng số không thỏa $\sum_iw_i=1$ mà không cần bước chiếu. Hệ (8.1) là *bước Newton gốc – đối ngẫu* (primal-dual Newton step): cập nhật đồng thời $u$ và $\nu$ để thỏa gần đúng (1.2) (Boyd và Vandenberghe 2004, §10.3.1, tr. 532–533).

::: exercise Bài tập 04.9 (Newton cho phần dư từ $(4,2)^T$)
Xét bài toán $\min F(u)=\tfrac12(2u_1^2+5u_2^2)$ với $u_1+u_2=14$ tại $u=(4,2)^T$, $\nu=2$:

- (a) tính $r_d$, $r_p$; giải (8.1); tính $(u^+,\nu^+)$ với $t=1$ và chỉ ra số nào là nhân tử của nghiệm;
- (b) với $t=\tfrac12$, tính phần dư tại điểm thử và so với ngưỡng $(1-\alpha t)\lVert r\rVert_2$ khi $\alpha=0{,}1$.
:::

::: hint
$r_d=(8,10)^T+(2,2)^T$. Vế phải của (8.1) là $(-r_d,-r_p)$.
:::

::: solution
**Câu (a).** $r_d=(10,12)^T$, $r_p=4+2-14=-8$. Hệ: $2d_1+\Delta\nu=-10$, $5d_2+\Delta\nu=-12$, $d_1+d_2=8$. Trừ hai hàng đầu: $2d_1-5d_2=2$; thay $d_2=8-d_1$: $7d_1=42$, nên $d=(6,2)^T$, $\Delta\nu=-10-12=-22$.

Bước đầy đủ: $u^+=(10,4)^T$, $\nu^+=2-22=-20$. Nhân tử của nghiệm là $\nu^+=-20$, không phải $\Delta\nu=-22$.

**Câu (b).** Điểm thử $\tilde u=(7,3)^T$, $\tilde\nu=2-11=-9$; $\nabla F=(14,15)^T$, $\tilde r_d=(5,6)^T$, $\tilde r_p=10-14=-4$. Vậy $\tilde r=(5,6,-4)=\tfrac12r$. $\lVert r\rVert_2=\sqrt{100+144+64}=\sqrt{308}\approx17{,}55$; ngưỡng $0{,}95\cdot17{,}55\approx16{,}67$; $\lVert\tilde r\rVert_2\approx8{,}77$, nhận.

**Kiểm tra lại.** $r_d^+$ tại $u^+=(10,4)^T$: $(20-20,20-20)^T=0$. Hệ số co $\tfrac12=1-t$ đúng Mệnh đề 04.47(d).
:::

Như vậy, Thuật toán 04.49 luôn tìm được bước và chứa Newton khả thi làm trường hợp riêng. Tuy nhiên, mọi tiêu chí dừng đã xét, gồm $\lVert g\rVert_2$, $\tfrac12\delta^2$, $\tfrac12\delta_{eq}^2$ và $\lVert r\rVert_2$, chỉ đo khoảng cách tới hệ KKT; theo Nhận xét 04.33, một cận sai số theo $\delta$ cần thêm giả thiết về sự thay đổi của độ cong.

## 9. Đọc thêm: tính tự điều chỉnh và cận sai số

Với hàm tự điều chỉnh, độ giảm Newton cho một cận sai số không chứa hằng số nào của hàm; phương pháp hàm chắn dùng kết quả này cho bài toán có ràng buộc bất đẳng thức.

:::: reading Hàm tự điều chỉnh, cận sai số theo độ giảm Newton và phương pháp hàm chắn

Với $\varphi(s)=s-\log s$ từ $s^0=\tfrac14$, các hằng số của Định lý 04.37 trên $S=\{s\mid\varphi(s)\le\varphi(\tfrac14)\}\approx[0{,}25;\,2{,}587]$ là $\mu\approx0{,}149$, $L=16$, $L_H=128$. Dùng $\mu$ này trên $S$, cận (5.5) cho $\varphi'(\tfrac14)^2/(2\mu)\approx30{,}1$, gấp khoảng $47$ lần sai số $0{,}636$; các hằng số này còn thay đổi khi đổi hệ tọa độ, trong khi bước Newton thì không (Mệnh đề 04.32(c)).

### 9.1. Hàm tự điều chỉnh

![Đồ thị độ cong phi hai phẩy của s bằng 1 chia s bình phương trên s lớn hơn 0. Đường cong tăng vô hạn khi s tiến về biên s bằng 0, điểm không thuộc miền, và giảm về 0 khi s lớn; điểm s bằng 1/4 được đánh dấu với độ cong bằng 16.](img/lec-04/log-curvature.svg)

Về mặt ý tưởng, thay vì chặn độ cong $\varphi''(s)=1/s^2$ bằng một hằng số, ta chặn tốc độ thay đổi của độ cong theo thang của chính độ cong: gần $s=0$, độ cong lớn và thay đổi nhanh, nhưng chậm so với độ lớn của nó.

::: example Ví dụ 04.23 (Tỷ số độ cong của hàm $s-\log s$)
**Dữ kiện.** $\varphi(s)=s-\log s$ trên $s>0$; tỷ số cần tính là $\lvert\varphi'''(s)\rvert/\varphi''(s)^{3/2}$.

**Tính.** $\varphi''(s)=s^{-2}$, $\varphi'''(s)=-2s^{-3}$, nên $\lvert\varphi'''(s)\rvert=2s^{-3}$ và $\varphi''(s)^{3/2}=s^{-3}$. Tỷ số bằng $2$ với mọi $s>0$.

**Kiểm tra lại.** Tại $s=\tfrac14$: $\lvert\varphi'''\rvert=2\cdot64=128$ và $2\cdot16^{3/2}=2\cdot64=128$.
:::

![Đồ thị tỷ số trị tuyệt đối đạo hàm bậc ba chia lũy thừa ba phần hai của đạo hàm bậc hai của s trừ log s trên s lớn hơn 0: đường nằm ngang tại mức 2 trên toàn miền.](img/lec-04/self-concordance-ratio.svg)

Để làm rõ tính chất này, xem định nghĩa sau.

::: definition Định nghĩa 04.51 (Hàm tự điều chỉnh)
Cho tập mở lồi $\operatorname{dom}f\subseteq\mathbb R^n$ và $f:\operatorname{dom}f\to\mathbb R$ lồi, lớp $C^3$. Hàm $f$ là *tự điều chỉnh* (self-concordant) nếu với mọi $x\in\operatorname{dom}f$ và mọi $v\in\mathbb R^n$, hàm một biến $h(t)=f(x+tv)$ thỏa

$$
\lvert h'''(t)\rvert\le2\,h''(t)^{3/2}
$$

tại mọi $t$ mà $x+tv\in\operatorname{dom}f$.
:::

Bất đẳng thức phải đúng trên mọi đường thẳng qua miền, như Bổ đề 01.27 cho tính lồi; $t$ là tham số trên đường thẳng. Hằng số $2$ chuẩn hóa để $-\log s$ đạt dấu bằng. Số mũ $\tfrac32$ làm bất đẳng thức không phụ thuộc đơn vị đo: với $s=a\tilde s$, $a>0$, và $\tilde\varphi(\tilde s)=\varphi(a\tilde s)$, ta có $\tilde\varphi''=a^2\varphi''$, $\tilde\varphi'''=a^3\varphi'''$, nên tỷ số $\lvert\tilde\varphi'''\rvert/(\tilde\varphi'')^{3/2}$ không đổi, và $\tfrac32$ là số mũ duy nhất có tính chất này.

Ví dụ, hàm tuyến tính và hàm bậc hai lồi có $h'''=0$ trên mọi đường thẳng, nên tự điều chỉnh. Hàm $-\log s$ và $s-\log s$ khác nhau một số hạng tuyến tính, có cùng đạo hàm bậc hai và bậc ba, nên cả hai tự điều chỉnh. Phản ví dụ:

1. $e^s$ có tỷ số $e^s/e^{3s/2}=e^{-s/2}$, không bị chặn khi $s\to-\infty$;
2. $s^4$ có tỷ số $\frac{24\lvert s\rvert}{(12s^2)^{3/2}}=\frac{24}{12^{3/2}s^2}$, không bị chặn khi $s\to0$;
3. mất mát logistic $\ell(m)=\log(1+e^{-m})$ có $\ell''=\sigma(1-\sigma)$ và $\ell'''=\sigma(1-\sigma)(1-2\sigma)$ với $\sigma=\sigma(m)$, nên tỷ số $\lvert1-2\sigma\rvert/\sqrt{\sigma(1-\sigma)}$ không bị chặn khi $\lvert m\rvert\to\infty$.

Hai lớp tự điều chỉnh và lồi mạnh không chứa nhau:

- $s-\log s$ tự điều chỉnh nhưng không lồi mạnh trên miền, vì $\varphi''(s)=s^{-2}\to0$ khi $s\to\infty$, và không có gradient Lipschitz, vì $\varphi''$ không bị chặn khi $s\to0$;
- $f(s)=s^4+\tfrac1{100}s^2$ lồi mạnh vì $f''(s)=12s^2+0{,}02\ge0{,}02$, nhưng không tự điều chỉnh: tại $s=0{,}05$, $f''=0{,}05$, $f''^{3/2}\approx0{,}01118$ và $\lvert f'''\rvert=24\cdot0{,}05=1{,}2$, nên tỷ số $\lvert f'''\rvert/f''^{3/2}\approx107>2$.

Mệnh đề sau là phiên bản tự điều chỉnh của Định lý 01.30.

::: proposition Mệnh đề 04.52 (Phép bảo toàn tính tự điều chỉnh) — chứng minh đầy đủ
**Giả thiết.** $f$, $f_1$, $f_2$ tự điều chỉnh; $a\ge1$; $T\in\mathbb R^{n\times n'}$, $c\in\mathbb R^n$.

**Kết luận.**

- (a) $af$ tự điều chỉnh.
- (b) $f_1+f_2$ tự điều chỉnh trên $\operatorname{dom}f_1\cap\operatorname{dom}f_2$.
- (c) $y\mapsto f(Ty+c)$ tự điều chỉnh trên $\{y\in\mathbb R^{n'}\mid Ty+c\in\operatorname{dom}f\}$.
:::

Với $0<a<1$, $a(-\log s)$ có tỷ số $\lvert h'''\rvert/h''^{3/2}=2/\sqrt a>2$, nên phần (a) sai.

::: proof Chứng minh Mệnh đề 04.52
**Lộ trình.** Kiểm bất đẳng thức của Định nghĩa 04.51 trên từng đường thẳng: phần (a) dùng $a\le a^{3/2}$, phần (b) dùng $p^{3/2}+q^{3/2}\le(p+q)^{3/2}$, phần (c) nhận ra hạn chế của hàm hợp là hạn chế của $f$.

**Bước 1 (phần a).** Với $h$ là hạn chế của $f$ lên một đường thẳng, ta có

$$
\begin{aligned}
\lvert ah'''\rvert&\le2ah''^{3/2}\\
&\le2a^{3/2}h''^{3/2}\\
&=2(ah'')^{3/2}.
\end{aligned}
$$

Trong đó, dòng đầu là giả thiết, còn dòng thứ hai dùng $a\le a^{3/2}$ khi $a\ge1$.

**Bước 2 (phần b).** Với $h_1$, $h_2$ là hạn chế của $f_1$, $f_2$ lên cùng một đường thẳng, $h_1'',h_2''\ge0$ và

$$
\begin{aligned}
\lvert h_1'''+h_2'''\rvert&\le2\bigl(h_1''^{3/2}+h_2''^{3/2}\bigr)\\
&\le2(h_1''+h_2'')^{3/2}.
\end{aligned}
$$

Bất đẳng thức thứ hai là $p^{3/2}+q^{3/2}\le(p+q)^{3/2}$ với $p,q\ge0$: khi $p+q>0$, chia hai vế cho $(p+q)^{3/2}$ và dùng $\theta^{3/2}\le\theta$ với $\theta=\tfrac p{p+q}$ và $\theta=\tfrac q{p+q}$ thuộc $[0,1]$.

**Bước 3 (phần c).** Hạn chế của $y\mapsto f(Ty+c)$ lên đường thẳng $y+tw$ là $t\mapsto f(Ty+c+tTw)$, hạn chế của $f$ lên một đường thẳng; khi $Tw=0$, hàm này hằng và hai vế của bất đẳng thức bằng $0$. $\square$
:::

Theo Mệnh đề 04.52, hàm $-\sum_i\log(b_i-a_i^Tx)$ và hàm rút gọn $\psi(z)=F(\hat u+Zz)$ của một $F$ tự điều chỉnh là tự điều chỉnh.

### 9.2. Cận sai số theo độ giảm Newton

Để có cận sai số, cần một cận dưới của $f$; bổ đề sau chặn dưới độ cong dọc một đường thẳng.

::: lemma Bổ đề 04.53 (Cận dưới của độ cong dọc đường thẳng) — chứng minh đầy đủ
**Giả thiết.** $h$ lớp $C^3$ trên một khoảng chứa $[0,\bar t]$, $h''>0$ trên khoảng đó, và $\lvert h'''\rvert\le2h''^{3/2}$.

**Kết luận.** Với mọi $t\in[0,\bar t]$,

$$
h''(t)\ge\frac1{\bigl(h''(0)^{-1/2}+t\bigr)^2}.
$$
:::

::: proof Chứng minh Bổ đề 04.53
**Lộ trình.** Giả thiết là một chặn $\lvert k'\rvert\le1$ cho $k=h''^{-1/2}$; tích phân chặn này rồi nghịch đảo.

**Bước 1 (đạo hàm của $h''^{-1/2}$).** Đặt $k(t)=h''(t)^{-1/2}$. Theo quy tắc dây chuyền, $k'(t)=-\tfrac12h''(t)^{-3/2}h'''(t)$, nên giả thiết $\lvert h'''\rvert\le2h''^{3/2}$ cho $\lvert k'(t)\rvert\le1$.

**Bước 2 (tích phân).** Tích phân từ $0$ đến $t$, ta có $k(t)\le k(0)+t$, tức $h''(t)^{-1/2}\le h''(0)^{-1/2}+t$.

**Bước 3 (kết luận).** Do hai vế dương, bình phương rồi nghịch đảo hai vế, ta được kết luận. $\square$
:::

Tích phân hai lần cận dưới này dọc đường thẳng, ta được định lý sau.

::: theorem Định lý 04.54 (Cận sai số theo độ giảm Newton) — chứng minh đầy đủ
**Giả thiết.**

- **Hàm.** $f$ tự điều chỉnh, $\nabla^2f(y)\succ0$ với mọi $y\in\operatorname{dom}f$.
- **Giá trị tối ưu.** $f^*=\inf f>-\infty$.
- **Điểm xét.** Tại $x$, độ giảm Newton thỏa $\delta=\delta_N(x)<1$.

**Kết luận.**

$$
\begin{aligned}
&f(x)-f^*\\
&\quad\le-\delta-\log(1-\delta).
\end{aligned}
\tag{9.1}
$$
:::

Cận dùng $\delta$, không dùng $\delta^2$, tính được tại $x$ và không chứa hằng số nào của $f$.

::: proof Chứng minh Định lý 04.54
**Lộ trình.** Trên đường thẳng từ $x$ tới $y$, chuẩn hóa độ cong tại $x$, chặn độ dốc đầu bằng $-\delta$, tích phân hai lần cận của Bổ đề 04.53, rồi cực tiểu hóa theo độ dài.

**Bước 1 (chọn đường thẳng).** Đặt $g=\nabla f(x)$, $H=\nabla^2f(x)$ và lấy $y\in\operatorname{dom}f$, $y\ne x$. Đặt $\bar t=\lVert y-x\rVert_H=\sqrt{(y-x)^TH(y-x)}>0$ và $v=(y-x)/\bar t$, nên $v^THv=1$ và $y=x+\bar tv$. Hàm $h(t)=f(x+tv)$ xác định trên một khoảng chứa $[0,\bar t]$ vì miền lồi.

**Bước 2 (giá trị đầu).** $h''(0)=v^THv=1$. Theo Cauchy–Schwarz (như cách kiểm trực tiếp phần (b) sau Mệnh đề 04.16), ta có

$$
\begin{aligned}
\lvert g^Tv\rvert&=\lvert(H^{-1/2}g)^T(H^{1/2}v)\rvert\\
&\le\lVert H^{-1/2}g\rVert_2\,\lVert H^{1/2}v\rVert_2\\
&=\sqrt{g^TH^{-1}g}\cdot1\\
&=\delta,
\end{aligned}
$$

trong đó quan hệ thứ ba dùng $v^THv=1$, còn quan hệ cuối là Định nghĩa 04.31. Do đó $h'(0)=g^Tv\ge-\delta$.

**Bước 3 (tích phân hai lần).** Theo Bổ đề 04.53 với $h''(0)=1$, ta có $h''(\varsigma)\ge(1+\varsigma)^{-2}$ trên $[0,\bar t]$. Tích phân từ $0$, ta được

$$
\begin{aligned}
h'(\varsigma)&\ge h'(0)+1-\frac1{1+\varsigma},\\
h(\bar t)&\ge h(0)+\bar t\,h'(0)\\
&\quad+\bar t-\log(1+\bar t)\\
&\ge f(x)+\bar t(1-\delta)\\
&\quad-\log(1+\bar t).
\end{aligned}
$$

Quan hệ thứ ba dùng Bước 2.

**Bước 4 (cực tiểu theo độ dài).** Hàm $\omega(t)=t(1-\delta)-\log(1+t)$ trên $t\ge0$ có $\omega'(t)=(1-\delta)-\frac1{1+t}$, triệt tiêu tại $t=\frac\delta{1-\delta}$, với giá trị $\omega=\delta+\log(1-\delta)$. Hàm $\omega$ lồi, nên đây là giá trị nhỏ nhất. Như vậy, $f(y)=h(\bar t)\ge f(x)+\omega(\bar t)\ge f(x)+\delta+\log(1-\delta)$ với mọi $y$.

**Bước 5 (kết luận).** Với $y=x$, bất đẳng thức của Bước 4 cũng đúng vì $\delta+\log(1-\delta)\le0$. Lấy cận dưới đúng theo $y$, ta được $f^*\ge f(x)+\delta+\log(1-\delta)$, tức (9.1). $\square$
:::

Khai triển $-\log(1-\delta)=\sum_{k\ge1}\delta^k/k$ cho

$$
\begin{aligned}
&-\delta-\log(1-\delta)\\
&\quad=\frac{\delta^2}2+\frac{\delta^3}3+\frac{\delta^4}4+\cdots .
\end{aligned}
$$

Số hạng đầu là mức giảm mô hình, nên khi $\delta$ nhỏ, $\tfrac12\delta^2$ gần bằng cận (9.1). Boyd và Vandenberghe (2004, §9.6.3, tr. 501–502, công thức 9.49) chứng minh cùng cận, tham số hóa theo hướng.

::: example Ví dụ 04.24 (Cận sai số trên hàm $s-\log s$ tại hai điểm)
**Dữ kiện.** $\varphi(s)=s-\log s$, $s^*=1$, $\varphi^*=1$; $g=1-\tfrac1s$, $H=\tfrac1{s^2}$; hai điểm $s=\tfrac14$ và $s=\tfrac32$.

**Tại $s=\tfrac14$.** $\delta=\tfrac34$ (Ví dụ 04.15). Cận (9.1): $-\tfrac34-\log\tfrac14=\log4-\tfrac34\approx0{,}63629$, đúng bằng sai số $\varphi(\tfrac14)-1$. Mức giảm mô hình $0{,}28125$ chỉ bằng khoảng $44\%$ cận.

**Tại $s=\tfrac32$.** $g=1-\tfrac23=\tfrac13$, $H=\tfrac49$, $\delta^2=\frac{1/9}{4/9}=\tfrac14$, $\delta=\tfrac12$. Cận: $-\tfrac12+\log2\approx0{,}19315$. Sai số thực tế: $\tfrac32-\log\tfrac32-1\approx0{,}09453$. Mức giảm mô hình: $\tfrac18=0{,}125$.

**Kiểm tra lại.** Với $s-\log s$, $\delta^2=(1-s)^2$; khi $s<1$, cận $-(1-s)-\log s=\varphi(s)-1$ trùng sai số. Tại $s=\tfrac32$, $0{,}0945<0{,}125<0{,}193$: cận đúng nhưng không chặt, và mức giảm mô hình lớn hơn sai số.
:::

Hệ quả sau thay cận (9.1) bằng một biểu thức đơn giản hơn khi $\delta$ không quá lớn.

::: corollary Hệ quả 04.55 (Cận theo bình phương độ giảm Newton) — chứng minh đầy đủ
**Giả thiết.** Như Định lý 04.54, thêm $\delta\le0{,}68$.

**Kết luận.** $f(x)-f^*\le\delta^2$. Do đó tiêu chí $\delta^2\le\varepsilon$ với $\varepsilon\le0{,}68^2\approx0{,}46$ bảo đảm $f(x)-f^*\le\varepsilon$.
:::

Điều cần cho hệ quả là $-\delta-\log(1-\delta)\le\delta^2$.

::: proof Chứng minh Hệ quả 04.55
**Lộ trình.** Xét hiệu $\omega_2(\delta)=\delta^2+\delta+\log(1-\delta)$; nó tăng rồi giảm trên $[0,1)$, nên dấu trên $[0;\,0{,}68]$ được quyết định tại hai đầu mút.

**Bước 1 (đạo hàm).** Đặt $\omega_2(\delta)=\delta^2+\delta+\log(1-\delta)$ trên $[0,1)$, với $\omega_2(0)=0$. Đạo hàm của $\omega_2$ là

$$
\begin{aligned}
\omega_2'(\delta)&=2\delta+1-\frac1{1-\delta}\\
&=\frac{(2\delta+1)(1-\delta)-1}{1-\delta}\\
&=\frac{\delta(1-2\delta)}{1-\delta}.
\end{aligned}
$$

Vậy $\omega_2$ tăng trên $[0,\tfrac12]$ và giảm trên $[\tfrac12,1)$.

**Bước 2 (dấu tại đầu mút).** $\omega_2(0)=0$. Tại $0{,}68$, ta có $\omega_2=0{,}4624+0{,}68+\log0{,}32\approx1{,}1424-1{,}1394=0{,}0030>0$.

**Bước 3 (kết luận).** Hàm $\omega_2$ không âm tại hai đầu mút của $[0;\,0{,}68]$, tăng rồi giảm trên đoạn này, nên $\omega_2\ge0$ trên cả đoạn, tức $-\delta-\log(1-\delta)\le\delta^2$. Ghép với (9.1), ta được kết luận. Ở phần cuối, $\delta^2\le\varepsilon\le0{,}68^2$ kéo theo $\delta\le0{,}68$. $\square$
:::

### 9.3. Cận sai số cho bài toán có đẳng thức và số bước Newton

Newton khả thi là Newton trên hàm rút gọn (Mệnh đề 04.43(d)), nên cận (9.1) chuyển sang bài toán có đẳng thức.

::: corollary Hệ quả 04.56 (Cận sai số tại điểm khả thi) — chứng minh đầy đủ
**Giả thiết.**

- **Hàm.** Bài toán có đẳng thức của Định nghĩa 04.1 với $F$ tự điều chỉnh và $F^*>-\infty$.
- **Tham số hóa.** $\hat u$, $Z$ như Mệnh đề 04.43; $Z^T\nabla^2F(u)Z\succ0$ tại mọi điểm khả thi của miền.
- **Điểm xét.** $u$ khả thi và $\delta_{eq}<1$.

**Kết luận.** $F(u)-F^*\le-\delta_{eq}-\log(1-\delta_{eq})$.
:::

::: proof Chứng minh Hệ quả 04.56
**Lộ trình.** Kiểm hàm rút gọn $\psi$ thỏa giả thiết của Định lý 04.54, rồi dùng sự trùng nhau của hai độ giảm Newton.

**Bước 1 (hàm rút gọn thỏa giả thiết).** $\psi(z)=F(\hat u+Zz)$ tự điều chỉnh theo Mệnh đề 04.52(c), có Hessian $Z^T\nabla^2FZ\succ0$ trên miền của nó, và $\inf\psi=F^*>-\infty$, vì theo Mệnh đề 04.43(a) các điểm khả thi là đúng các $\hat u+Zz$.

**Bước 2 (cùng độ giảm Newton).** Với $u=\hat u+Zz$, Mệnh đề 04.43(d) cho độ giảm Newton của $\psi$ tại $z$ bằng $\delta_{eq}$.

**Bước 3 (áp dụng).** Áp Định lý 04.54 cho $\psi$ tại $z$, ta có $\psi(z)-F^*\le-\delta_{eq}-\log(1-\delta_{eq})$, và $\psi(z)=F(u)$. $\square$
:::

Tại $u=(16,-2)^T$, $\delta_{eq}^2=252$ (Ví dụ 04.19), nên hệ quả không áp dụng; vì $F$ bậc hai, $F(u)-F^*=\tfrac12\delta_{eq}^2=126$ chính xác.

Cận (9.1) còn là một thành phần của kết quả về số bước Newton cho hàm tự điều chỉnh.

::: theorem Định lý 04.57 (Số bước Newton cho hàm tự điều chỉnh) — chứng minh ngoài phạm vi học phần, Boyd và Vandenberghe (2004), §9.6.4, tr. 503–505
**Giả thiết.**

- **Hàm.** $f$ tự điều chỉnh, lồi chặt, bị chặn dưới.
- **Tập mức dưới.** $\{x\mid f(x)\le f(x^0)\}$ đóng.
- **Thuật toán.** Thuật toán 04.34 với $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Bảo đảm.** Số bước để $f(x^k)-f^*\le\varepsilon$ không vượt

$$
\begin{aligned}
&\frac{20-8\alpha}{\alpha\beta(1-2\alpha)^2}\bigl(f(x^0)-f^*\bigr)\\
&\quad+\log_2\log_2\frac1\varepsilon .
\end{aligned}
$$
:::

Hằng số chỉ phụ thuộc $\alpha$, $\beta$ (Boyd và Vandenberghe 2004, công thức 9.56) và lớn: với $\alpha=0{,}1$, $\beta=0{,}8$, hệ số bằng $375$.

Định lý 04.57 thay ba hằng số của Định lý 04.37 bằng giả thiết tự điều chỉnh. Ý tưởng chứng minh: khi $\delta>\bar\delta=(1-2\alpha)/4$, mỗi bước giảm $f$ ít nhất $\gamma_2=\alpha\beta\bar\delta^2/(1+\bar\delta)$; khi $\delta\le\bar\delta$, bước đầy đủ được nhận và $\delta$ co theo bậc hai.

Bảng sau gom các trường hợp đã biết về số bước Newton.

| Lớp hàm | Giả thiết | Kết luận |
|---|---|---|
| Bậc hai lồi chặt | $\nabla^2f\equiv H\succ0$ | một bước đầy đủ tới $x^*$ |
| Cục bộ | $\nabla^2f\succeq\mu I$, Hessian Lipschitz gần $x^*$ | bậc hai từ điểm đầu đủ gần (Định lý 04.36) |
| Lồi mạnh trên tập mức dưới | thêm $\nabla^2f\preceq LI$ | tắt dần rồi bậc hai (Định lý 04.37) |
| Tự điều chỉnh | Định nghĩa 04.51, lồi chặt, bị chặn dưới, tập mức dưới đóng | tắt dần rồi bậc hai, hằng số chỉ phụ thuộc $\alpha,\beta$ (Định lý 04.57) |

::: remark Nhận xét 04.58 (Kiểm tra giả thiết của cận sai số)
**Tự điều chỉnh không bảo đảm nghiệm.** $-\log s$ và $s-\log s$ có cùng $\varphi''$, $\varphi'''$, cùng tự điều chỉnh; chỉ hàm thứ hai bị chặn dưới. Điều kiện cần kiểm tại điểm đang xét là $\delta<1$, cùng tính tự điều chỉnh của $f$; khi $\delta<1$, Bước 4 của chứng minh Định lý 04.54 cho $f^*\ge f(x)+\delta+\log(1-\delta)>-\infty$.

**Không đổi $\delta$ thành $\delta^2$.** Với $\delta=\tfrac34$, cận đúng là $\log4-\tfrac34\approx0{,}636$; thay $\delta$ bằng $\delta^2=\tfrac9{16}$ cho $-\tfrac9{16}-\log\tfrac7{16}\approx0{,}264$, nhỏ hơn sai số thực tế $0{,}636$, nên không còn là cận trên.

**Phạm vi của lớp hàm.** Mất mát logistic không tự điều chỉnh theo Định nghĩa 04.51; tổng của nó với $\tfrac\rho2\lVert w\rVert_2^2$ phải kiểm riêng.
:::

**Trong học máy.** Với mất mát dạng $-\log$ của một biểu thức tuyến tính theo tham số, như trọng số trộn, khi mất mát có Hessian xác định dương và $\delta<1$, cận (9.1) cho tiêu chí dừng có chứng nhận.

::: exercise Bài tập 04.10 (Cận sai số cho $-\log s-\log(1-s)$)
Xét $f(s)=-\log s-\log(1-s)$ trên $(0,1)$.

- (a) Dùng Mệnh đề 04.52 chứng minh $f$ tự điều chỉnh; tìm $s^*$ và $f^*$.
- (b) Tại $s=\tfrac14$, tính $g$, $H$, $\delta$ và cận (9.1).
- (c) So cận với sai số thực tế $f(\tfrac14)-f^*$ và với mức giảm mô hình $\tfrac12\delta^2$.
:::

::: hint
$s\mapsto1-s$ là hàm affine. Do đối xứng, $s^*=\tfrac12$.
:::

::: solution
**Câu (a).** $-\log s$ tự điều chỉnh; $-\log(1-s)$ là $-\log$ hợp với ánh xạ affine $s\mapsto1-s$, tự điều chỉnh theo Mệnh đề 04.52(c); tổng tự điều chỉnh theo (b). $f'(s)=-\tfrac1s+\tfrac1{1-s}=0$ tại $s^*=\tfrac12$; $f''>0$ nên đó là cực tiểu, $f^*=2\log2$.

**Câu (b).** $g=-4+\tfrac43=-\tfrac83$, $H=16+\tfrac{16}9=\tfrac{160}9$, $\delta^2=\frac{64/9}{160/9}=\tfrac25$, $\delta\approx0{,}6325$. Cận: $-0{,}6325-\log0{,}3675\approx-0{,}6325+1{,}0009=0{,}3685$.

**Câu (c).** Sai số thực tế: $-\log\tfrac14-\log\tfrac34-2\log2=\log\tfrac43\approx0{,}2877$. Mức giảm mô hình: $0{,}2$. Thứ tự $0{,}2<0{,}2877<0{,}3685$: cận đúng, mức giảm mô hình nhỏ hơn sai số.

**Kiểm tra lại.** $\delta\le0{,}68$, nên Hệ quả 04.55 cũng cho $\delta^2=0{,}4\ge0{,}2877$.
:::

Như vậy, với hàm tự điều chỉnh bị chặn dưới, độ giảm Newton cho cận sai số tính được. Tuy nhiên, mất mát logistic không thuộc lớp này. Các phương pháp trên chỉ xử lý bài toán không ràng buộc và bài toán có ràng buộc đẳng thức; phương pháp hàm chắn sau đưa ràng buộc bất đẳng thức về dãy bài toán có đẳng thức.

### 9.4. Phương pháp hàm chắn (barrier method)

Xét bài toán $\min f_0(x)$ với $f_i(x)\le0$, $i=1,\ldots,m$, và $Ax=b$. Một cách trực quan, ta thay mỗi ràng buộc bất đẳng thức bằng một số hạng tăng vô hạn khi $f_i(x)\to0^-$; bài toán còn lại chỉ có đẳng thức, giải bằng phương pháp Newton, với điểm lặp luôn khả thi ngặt.

::: definition Định nghĩa 04.59 (Hàm chắn logarit, bài toán tâm hóa và đường trung tâm)
Cho bài toán trên với $f_0,\ldots,f_m:\mathbb R^n\to\mathbb R$ lồi, lớp $C^2$, $A\in\mathbb R^{p\times n}$ đủ hạng hàng, bài toán có nghiệm với giá trị tối ưu $p^*$, và có một điểm khả thi ngặt ($Ax=b$, $f_i(x)<0$ với mọi $i$).

- *Hàm chắn logarit* (logarithmic barrier, log barrier) là $B(x)=-\sum_{i=1}^m\log(-f_i(x))$ trên $\operatorname{dom}B=\{x\mid f_i(x)<0,\ i=1,\ldots,m\}$.
- Với *tham số chắn* (barrier parameter) $\tau>0$, *bài toán tâm hóa* (centering problem) là $\min\ \tau f_0(x)+B(x)$ với $Ax=b$.
- Khi bài toán tâm hóa có nghiệm duy nhất $x^*(\tau)$ với mọi $\tau>0$, tập $\{x^*(\tau)\mid\tau>0\}$ là *đường trung tâm* (central path), và mỗi $x^*(\tau)$ là một *điểm trung tâm* (central point).
:::

So với Boyd và Vandenberghe (2004, chương 11), $B$, $\tau$, $\zeta$ thay $\phi$ (hàm chắn), $t$, $\mu$ của sách, và hàm đối ngẫu viết $g_{\mathrm d}$ để phân biệt với gradient $g$. Biến vẫn là $x$, giá trị tối ưu là $p^*$, và Thuật toán 04.44, 04.49 áp với $F=\tau f_0+B$, $u=x$.

Hàm $B$ lồi: trên đường thẳng $x+tv$, đặt $h_i(t)=f_i(x+tv)<0$, thì $\frac{d^2}{dt^2}\bigl[-\log(-h_i)\bigr]=\frac{h_i''}{-h_i}+\frac{h_i'^2}{h_i^2}\ge0$ vì $h_i''\ge0$. Hàm $B$ có $\nabla B(x)=\sum_{i=1}^m\frac1{-f_i(x)}\nabla f_i(x)$ và tăng vô hạn khi một $f_i(x)\to0^-$ (Boyd và Vandenberghe 2004, §11.2.1, tr. 563–564). Bài toán tâm hóa thuộc Định nghĩa 04.1 trên miền mở $\operatorname{dom}B$, nên theo Mệnh đề 04.2(b), có $\hat\nu\in\mathbb R^p$ thỏa *điều kiện tâm* (centrality condition)

$$
\begin{aligned}
&\tau\nabla f_0(x^*(\tau))+\nabla B(x^*(\tau))\\
&\quad+A^T\hat\nu=0 .
\end{aligned}
\tag{9.2}
$$

Bài toán tâm hóa giải bằng Thuật toán 04.44 hoặc 04.49. Khi $f_0$ tuyến tính hoặc bậc hai lồi và mọi $f_i$ affine, $\tau f_0$ có $h'''=0$ và $B$ tự điều chỉnh theo Mệnh đề 04.52(b), (c), nên mục tiêu tâm hóa tự điều chỉnh; nếu thêm Hessian của nó xác định dương trên $\ker A$, Hệ quả 04.56 chứng nhận sai số của bước tâm hóa theo $\delta_{eq}$. Mỗi điểm trung tâm cho một điểm khả thi đối ngẫu, như mệnh đề sau.

::: proposition Mệnh đề 04.60 (Điểm khả thi đối ngẫu từ đường trung tâm) — chứng minh đầy đủ
**Giả thiết.** Như Định nghĩa 04.59; $x^*(\tau)$ và $\hat\nu$ thỏa (9.2).

**Kết luận.** Đặt

$$
\begin{aligned}
\lambda_i^*(\tau)&=-\frac1{\tau f_i(x^*(\tau))},\\
&\qquad i=1,\ldots,m,\\
\nu^*(\tau)&=\frac{\hat\nu}\tau .
\end{aligned}
$$

Khi đó $\lambda^*(\tau)>0$, cặp $(\lambda^*(\tau),\nu^*(\tau))$ khả thi đối ngẫu, và

$$
\begin{aligned}
&g_{\mathrm d}(\lambda^*(\tau),\nu^*(\tau))\\
&\quad=f_0(x^*(\tau))-\frac m\tau,\\
&f_0(x^*(\tau))-p^*\le\frac m\tau .
\end{aligned}
$$
:::

::: proof Chứng minh Mệnh đề 04.60
**Lộ trình.** Chia (9.2) cho $\tau$ để được điều kiện dừng của hàm Lagrange tại $x^*(\tau)$; tính lồi cho $x^*(\tau)$ cực tiểu hóa hàm Lagrange; đối ngẫu yếu cho cận.

**Bước 1 (điều kiện dừng của hàm Lagrange).** Vì $f_i(x^*(\tau))<0$, $\lambda_i^*(\tau)>0$. Chia (9.2) cho $\tau>0$ và thay $\nabla B$:

$$
\begin{aligned}
&\nabla f_0(x^*(\tau))\\
&\quad+\sum_{i=1}^m\lambda_i^*(\tau)\nabla f_i(x^*(\tau))\\
&\quad+A^T\nu^*(\tau)=0,
\end{aligned}
$$

tức gradient theo $x$ của hàm Lagrange $\mathcal L(x,\lambda,\nu)=f_0(x)+\sum_i\lambda_if_i(x)+\nu^T(Ax-b)$ (Định nghĩa 03.4) bằng $0$ tại $x^*(\tau)$ với $(\lambda,\nu)=(\lambda^*(\tau),\nu^*(\tau))$.

**Bước 2 (cực tiểu của hàm Lagrange).** Với $\lambda^*(\tau)>0$, hàm $x\mapsto\mathcal L(x,\lambda^*(\tau),\nu^*(\tau))$ là tổng có hệ số không âm của các hàm lồi cộng một hàm affine, nên lồi (Định lý 01.30) và khả vi trên $\mathbb R^n$. Theo Hệ quả 01.26, $x^*(\tau)$ là điểm cực tiểu toàn cục của nó, nên hàm đối ngẫu (Định nghĩa 03.5) hữu hạn tại $(\lambda^*(\tau),\nu^*(\tau))$ và bằng giá trị tại $x^*(\tau)$.

**Bước 3 (giá trị hàm đối ngẫu).** Mỗi số hạng $\lambda_i^*(\tau)f_i(x^*(\tau))$ bằng $-\tfrac1\tau$, và $Ax^*(\tau)=b$, nên

$$
\begin{aligned}
&g_{\mathrm d}(\lambda^*(\tau),\nu^*(\tau))\\
&\quad=f_0(x^*(\tau))\\
&\qquad+\sum_{i=1}^m\lambda_i^*(\tau)f_i(x^*(\tau))\\
&\qquad+\nu^*(\tau)^T(Ax^*(\tau)-b)\\
&\quad=f_0(x^*(\tau))-\frac m\tau .
\end{aligned}
$$

**Bước 4 (cận).** Theo Bước 2, $g_{\mathrm d}(\lambda^*(\tau),\nu^*(\tau))>-\infty$; cùng với $\lambda^*(\tau)>0$, cặp $(\lambda^*(\tau),\nu^*(\tau))$ khả thi đối ngẫu. Theo đối ngẫu yếu (Định lý 03.8), $g_{\mathrm d}(\lambda^*(\tau),\nu^*(\tau))\le p^*$, nên $f_0(x^*(\tau))-p^*\le\frac m\tau$. $\square$
:::

Với $\tau$ lớn, Hessian của $\tau f_0+B$ thay đổi nhanh gần biên, nên Newton khó cực tiểu hóa trực tiếp (tr. 564); phương pháp hàm chắn tăng $\tau$ dần, khởi đầu mỗi bài toán tâm hóa từ điểm trung tâm trước.

::: algorithm Thuật toán 04.61 (Phương pháp hàm chắn; barrier method)
**Giả thiết.** Mỗi bước tâm hóa tính chính xác $x^*(\tau)$ (Boyd và Vandenberghe 2004, tr. 570).

**Đầu vào.** Điểm khả thi ngặt $x$; $\tau=\tau^{(0)}>0$; hệ số tăng $\zeta>1$; dung sai $\varepsilon>0$.

**Lặp:**

1. *Bước tâm hóa* (centering step): tính $x^*(\tau)$ bằng cách cực tiểu hóa $\tau f_0+B$ với $Ax=b$, bằng Thuật toán 04.44 xuất phát từ $x$ (Thuật toán 04.34 khi không có đẳng thức).
2. Cập nhật $x\leftarrow x^*(\tau)$.
3. Nếu $m/\tau\le\varepsilon$: dừng, trả về $x$ và $(\lambda^*(\tau),\nu^*(\tau))$.
4. Tăng tham số: $\tau\leftarrow\zeta\tau$.

**Đầu ra.** Khi giả thiết trên thỏa, điểm $x$ khả thi với $f_0(x)-p^*\le m/\tau\le\varepsilon$, cùng cặp khả thi đối ngẫu $(\lambda^*(\tau),\nu^*(\tau))$ của Mệnh đề 04.60 chứng nhận cận này.

**Chi phí.** Dưới cùng giả thiết, sau bước tâm hóa đầu và $k$ bước tâm hóa tiếp theo, khoảng đối ngẫu là $m/(\zeta^k\tau^{(0)})$, nên cần $\bigl\lceil\log\bigl(m/(\varepsilon\tau^{(0)})\bigr)/\log\zeta\bigr\rceil$ bước tâm hóa ngoài bước đầu (Boyd và Vandenberghe 2004, §11.3.3, công thức 11.13, tr. 577).
:::

Mỗi lần thực hiện bước 1 là một *bước lặp ngoài* (outer iteration); các bước Newton bên trong là *bước lặp trong* (inner iterations). Phương pháp ban đầu gọi là SUMT (sequential unconstrained minimization technique), nay còn gọi là *phương pháp đi theo đường* (path-following method) (Boyd và Vandenberghe 2004, §11.3.1, tr. 569). Theo Boyd và Vandenberghe (2004, tr. 570), $\zeta$ nhỏ cho ít bước Newton mỗi bước tâm hóa nhưng nhiều bước lặp ngoài, và $\zeta$ khoảng $10$ đến $20$ cho kết quả tốt.

::: example Ví dụ 04.25 (Đường trung tâm của $\min x^2$ với $x\ge1$)
**Dữ kiện.** $f_0(x)=x^2$, $f_1(x)=1-x$, $m=1$, không có ràng buộc đẳng thức; nghiệm $x^*=1$, $p^*=1$.

**Điểm trung tâm.** Bài toán tâm hóa là $\min_{x>1}\ \tau x^2-\log(x-1)$. Điều kiện tâm (9.2) là $2\tau x-\frac1{x-1}=0$, tức $2\tau x^2-2\tau x-1=0$. Nghiệm lớn hơn $1$ là

$$
x^*(\tau)=\tfrac12\Bigl(1+\sqrt{1+2/\tau}\Bigr).
$$

**Nhân tử và hàm đối ngẫu.** Mệnh đề 04.60 cho $\lambda^*(\tau)=\frac1{\tau(x^*(\tau)-1)}=2x^*(\tau)$, vì $\tau(x-1)\cdot2x=1$ theo điều kiện tâm. Hàm Lagrange $x^2+\lambda(1-x)$ cực tiểu tại $x=\lambda/2$, nên $g_{\mathrm d}(\lambda)=\lambda-\tfrac{\lambda^2}4$.

**Khoảng đối ngẫu.** Với $x=x^*(\tau)$, $f_0(x)-g_{\mathrm d}(2x)=x^2-(2x-x^2)=2x^2-2x=\tfrac1\tau=\tfrac m\tau$.

| $\tau$ | $x^*(\tau)$ | $\lambda^*(\tau)$ | $f_0(x^*(\tau))$ | $g_{\mathrm d}(\lambda^*(\tau))$ | khoảng |
|---|---|---|---|---|---|
| $1$ | $1{,}3660$ | $2{,}7321$ | $1{,}8660$ | $0{,}8660$ | $1$ |
| $10$ | $1{,}0477$ | $2{,}0954$ | $1{,}0977$ | $0{,}9977$ | $0{,}1$ |
| $100$ | $1{,}0050$ | $2{,}0100$ | $1{,}0100$ | $1{,}0000$ | $0{,}01$ |

Khi $\tau\to\infty$, $x^*(\tau)\to1=x^*$ và $\lambda^*(\tau)\to2$, nhân tử KKT cho bởi điều kiện dừng $2x^*-\lambda^*=0$ (Định nghĩa 03.29).

**Kiểm tra lại.** Với $\tau=1$: $2x^2-2x-1=0$ tại $x=\tfrac{1+\sqrt3}2\approx1{,}3660$; $f_0=x^2\approx1{,}8660$; $g_{\mathrm d}(2{,}7321)=2{,}7321-1{,}8660=0{,}8660$; hiệu $1{,}0000=\tfrac m\tau$.
:::

Phân tích độ phức tạp của phương pháp và phương pháp điểm trong gốc – đối ngẫu (primal-dual interior-point method) nằm ngoài phạm vi học phần (Boyd và Vandenberghe 2004, §11.5, tr. 585–596; §11.7, tr. 609–615).

::::

## 10. Tổng hợp: khung chung của bước lặp

Xét hồi quy ridge hai hệ số trên ba mẫu, với $M=\begin{bmatrix}1&0\\1&1\\0&1\end{bmatrix}$, $y=(1,2,0)^T$, $\rho=1$ và ràng buộc $w_1+w_2=1$, khởi đầu từ $w=0$ không khả thi. Cần chọn thuật toán, lập hệ của bước, và biết phần dư nhỏ chứng nhận gì về mất mát.

Mỗi phương pháp gồm bốn bước:

- lập mô hình bậc hai;
- giải hệ KKT tuyến tính của bài toán con;
- chọn bước;
- kiểm tra tiêu chí dừng.

| Phương pháp | Hệ của bước | Nhận bước | Dừng |
|---|---|---|---|
| Hạ gradient (Thuật toán 04.13) | $d=-g$, tức $W=I$ | Armijo trên $f$ | $\lVert g\rVert_2\le\varepsilon_g$ |
| Dốc nhất theo $\lVert\cdot\rVert_W$ (Mệnh đề 04.16) | $Wd=-g$, $W$ cố định | Armijo trên $f$ | $\lVert g\rVert_2\le\varepsilon_g$ |
| Newton (Thuật toán 04.34) | $Hd=-g$ | Armijo trên $f$ | $\tfrac12\delta^2\le\varepsilon_{\mathrm{model}}$ |
| Newton khả thi (Thuật toán 04.44) | hệ (7.1) theo $(d,\eta)$ | Armijo trên $F$ | $\tfrac12\delta_{eq}^2\le\varepsilon_{\mathrm{model}}$ |
| Newton từ điểm chưa khả thi (Thuật toán 04.49) | hệ (8.1) theo $(d,\Delta\nu)$ | Armijo trên $\lVert r\rVert_2$ | $\lVert r_p\rVert_2\le\varepsilon_p$, $\lVert r_d\rVert_2\le\varepsilon_d$ |

Mệnh đề sau nêu điều mỗi tiêu chí dừng chứng nhận.

::: proposition Mệnh đề 04.62 (Điều mà mỗi tiêu chí dừng chứng nhận) — chứng minh đầy đủ
**Giả thiết.** Các bài toán của Định nghĩa 04.1.

**Kết luận.**

- (a) Nếu $f$ lồi mạnh với hằng số $\mu$ trên $\mathbb R^n$ và $\lVert\nabla f(x)\rVert_2\le\varepsilon_g$ thì $f(x)-f^*\le\varepsilon_g^2/(2\mu)$.
- (b) Nếu $f$ thỏa giả thiết của Định lý 04.54 và $\delta\le0{,}68$ thì $f(x)-f^*\le\delta^2$; nếu chỉ $\delta<1$ thì $f(x)-f^*\le-\delta-\log(1-\delta)$.
- (c) Tại điểm khả thi, dưới giả thiết của Hệ quả 04.56, cùng các cận với $\delta_{eq}$.
- (d) $r(u,\nu)=0$ khi và chỉ khi $u$ là nghiệm với nhân tử $\nu$. Khi $r\ne0$:
    - tại điểm chưa khả thi, $F(u)-F^*$ có thể âm, nên không phải sai số;
    - không có hàm $\omega_r$ với $\omega_r(0)=0$ sao cho $F(u)-F^*\le\omega_r(\lVert r\rVert_2)$ cho mọi bài toán lồi có đẳng thức, kể cả tại điểm khả thi.

:::

Mỗi phần có giả thiết riêng; khi thiếu giả thiết đó, tiêu chí chỉ đo mức vi phạm của (1.1) hoặc (1.2).

::: proof Chứng minh Mệnh đề 04.62
**Lộ trình.** Phần (a)–(c) ghép các cận đã chứng minh; phần (d) dùng Mệnh đề 04.2(b), Ví dụ 04.22 và một họ bài toán có độ cong theo $u_1$ tiến về $0$.

**Bước 1 (phần a, b, c).** Phần (a) là (5.5) của Mệnh đề 04.26(b). Phần (b) là Định lý 04.54 và Hệ quả 04.55. Phần (c) là Hệ quả 04.56, cùng phép chứng minh của Hệ quả 04.55 áp cho $\psi$.

**Bước 2 (phần d, chiều tương đương).** $r=0$ nghĩa là $(u,\nu)$ thỏa (1.2); theo Mệnh đề 04.2(b), điều đó tương đương $u$ là nghiệm với nhân tử $\nu$.

**Bước 3 (phần d, giá trị âm).** Ví dụ 04.22 cho điểm $u=(0,0)^T$ của bài toán trên đường $u_1+u_2=14$ (mục tiêu $\tfrac12(2u_1^2+5u_2^2)$, $F^*=140$) với $r\ne0$ và $F(u)-F^*=0-140<0$.

**Bước 4 (phần d, không có cận trên theo phần dư).** Xét bài toán $F(u)=\tfrac\mu2u_1^2+\tfrac12u_2^2$ với $\mu\in(0,1]$ và ràng buộc $u_2=0$, tức $n=2$, $p=1$, $A=[0\ \ 1]$, $b=0$. Hệ (1.2) là $\mu u_1=0$, $u_2+\nu=0$, $u_2=0$, nên $u^*=0$, $\nu^*=0$ và $F^*=0$.

Tại điểm khả thi $u=(u_1,0)$ với $\nu=0$: $r_d=(\mu u_1,0)$, $r_p=0$, nên $\lVert r\rVert_2=\mu\lvert u_1\rvert$ và $F(u)-F^*=\frac{\mu u_1^2}2=\frac{\lVert r\rVert_2^2}{2\mu}$. Với $\lVert r\rVert_2=1$ cố định, sai số bằng $\frac1{2\mu}$, không bị chặn khi $\mu\to0$. Một hàm $\omega_r$ dùng chung cho mọi bài toán sẽ phải có $\omega_r(1)\ge\frac1{2\mu}$ với mọi $\mu\in(0,1]$, điều không thể. Ở đây $F$ lồi mạnh với hằng số $\mu$, và cận (5.5) bằng đúng sai số, nên phần (a) cần $\mu$. $\square$
:::

::: example Ví dụ 04.26 (Hồi quy ridge với tổng hệ số bằng 1)
**Bài toán.** Ma trận dữ liệu $M\in\mathbb R^{N\times n}$ chứa $N$ mẫu và $n$ đặc trưng, nhãn $y\in\mathbb R^{N}$, hệ số chính quy hóa $\rho>0$, ràng buộc $Aw=b$ với $A\in\mathbb R^{p\times n}$ đủ hạng hàng:

$$
\begin{aligned}
&\min_w\ J(w)=\tfrac12\lVert Mw-y\rVert_2^2\\
&\qquad\qquad+\tfrac\rho2\lVert w\rVert_2^2\\
&\text{với}\quad Aw=b .
\end{aligned}
$$

**Gradient, Hessian và giả thiết.** $\nabla J(w)=M^T(Mw-y)+\rho w$ và $\nabla^2J=M^TM+\rho I$. Với $v\ne0$, $v^T(M^TM+\rho I)v=\lVert Mv\rVert_2^2+\rho\lVert v\rVert_2^2>0$, nên $H\succ0$ với mọi dữ liệu, kể cả khi $M^TM$ suy biến vì $N<n$.

**Một bước từ $w=0$, $\nu=0$.** $r_d=-M^Ty$, $r_p=-b$, và hệ (8.1) là $\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\Delta\nu\end{bmatrix}=\begin{bmatrix}M^Ty\\b\end{bmatrix}$. Vì $J$ bậc hai, Mệnh đề 04.47(d) cho bước $t=1$ tới đúng nghiệm KKT.

**Số liệu.** $M=\begin{bmatrix}1&0\\1&1\\0&1\end{bmatrix}$, $y=(1,2,0)^T$, $\rho=1$, $A=[1\ \ 1]$, $b=1$.

- $M^TM=\begin{bmatrix}2&1\\1&2\end{bmatrix}$, nên $H=\begin{bmatrix}3&1\\1&3\end{bmatrix}$.
- $M^Ty=(1+2,\,2+0)^T=(3,2)^T$.
- Hệ (8.1): $3d_1+d_2+\Delta\nu=3$, $d_1+3d_2+\Delta\nu=2$, $d_1+d_2=1$.
- Trừ hai hàng đầu: $2d_1-2d_2=1$; cùng $d_1+d_2=1$ cho $d=(\tfrac34,\tfrac14)^T$.
- Hàng đầu: $\Delta\nu=3-\tfrac94-\tfrac14=\tfrac12$.

**Kiểm tra lại.** $w^*=(\tfrac34,\tfrac14)^T$, $\nu^*=\tfrac12$. $\nabla J(w^*)=M^T(Mw^*-y)+w^*$ với $Mw^*-y=(-\tfrac14,-1,\tfrac14)^T$, nên $M^T(Mw^*-y)=(-\tfrac54,-\tfrac34)^T$ và $\nabla J(w^*)=(-\tfrac12,-\tfrac12)^T$. Cộng $A^T\nu^*=(\tfrac12,\tfrac12)^T$ được $0$, và $\tfrac34+\tfrac14=1$.

**Diễn giải.**

- Thuật toán 04.49 được chọn vì điểm đầu $w=0$ không thỏa $w_1+w_2=1$; Thuật toán 04.44 cần điểm đầu khả thi.
- Sau một bước, $r=0$, nên theo Mệnh đề 04.62(d) điểm thu được là nghiệm.
- Tại một điểm khả thi, $J$ bậc hai lồi chặt nên tự điều chỉnh, và Mệnh đề 04.62(c) cho cận theo $\delta_{eq}$ qua hàm rút gọn $\psi$; vì $\nabla^2J\succeq\rho I$, $\psi$ còn lồi mạnh, nên cận (5.5) áp cho $\psi$ cũng dùng được.
:::

## 11. Ý nghĩa, tác động và giới hạn

### 11.1. Hồi quy logistic có chính quy hóa: Newton và hạ gradient

::: application Tình huống 04.1 (Hồi quy logistic có chính quy hóa: Newton và hạ gradient)
**Bài toán và dữ liệu.** Sáu sinh viên có số giờ ôn tập $a=(1,2,3,4,5,6)$ và kết quả $y=(-1,-1,+1,-1,+1,+1)$, với $+1$ là đạt. Mô hình dự báo xác suất đạt $\sigma(w_1a+w_2)$. Dữ liệu không tách được tuyến tính: sinh viên thứ ba đạt, sinh viên thứ tư không.

**Mô hình hóa.** Với $\tilde a_i=(a_i,1)^T$ và hệ số chính quy hóa $\rho=0{,}1$:

$$
\begin{aligned}
J(w)&=\sum_{i=1}^6\log\bigl(1+e^{-y_i\tilde a_i^Tw}\bigr)\\
&\quad+\frac\rho2\lVert w\rVert_2^2 .
\end{aligned}
$$

Đây là bài toán không ràng buộc của Định nghĩa 04.1 trên $\mathbb R^2$.

**Xác minh giả thiết.** $\nabla^2J(w)=\sum_i\ell''(m_i)\tilde a_i\tilde a_i^T+\rho I\succeq\rho I$, nên $J$ lồi mạnh với $\mu=\rho=0{,}1$ và có nghiệm duy nhất (Mệnh đề 01.46(b)). Vì $\ell''\le\ell''(0)=\tfrac14$, $\nabla^2J(w)\preceq\nabla^2J(0)$, nên $L=\lambda_{\max}(\nabla^2J(0))$ (Nhận xét 04.20).

**Bước Newton đầu tiên, tính thủ công.** Tại $w=0$, mọi biên bằng $0$, $\ell'(0)=-\tfrac12$, $\ell''(0)=\tfrac14$. Gradient: $g=-\tfrac12\sum_iy_i\tilde a_i=-\tfrac12(7,0)^T=(-3{,}5;\,0)^T$, vì $\sum_iy_ia_i=-1-2+3-4+5+6=7$ và $\sum_iy_i=0$. Hessian:

$$
\begin{aligned}
H&=\frac14\begin{bmatrix}\sum a_i^2&\sum a_i\\\sum a_i&6\end{bmatrix}+0{,}1I\\
&=\begin{bmatrix}22{,}85&5{,}25\\5{,}25&1{,}6\end{bmatrix},
\end{aligned}
$$

với $\sum a_i^2=91$, $\sum a_i=21$.

- Định thức: $22{,}85\cdot1{,}6-5{,}25^2=8{,}9975$.
- Hệ (6.1): $d=H^{-1}(3{,}5;\,0)^T=\frac{(1{,}6\cdot3{,}5;\,-5{,}25\cdot3{,}5)}{8{,}9975}\approx(0{,}6224;\,-2{,}0422)^T$.
- Mức giảm mô hình: $\tfrac12\delta^2=\tfrac12\cdot3{,}5\cdot0{,}6224\approx1{,}0892$.
- Nhận bước với $\alpha=0{,}1$: ngưỡng là $J(0)+0{,}1g^Td\approx4{,}1589-0{,}2178=3{,}9410$, và $J(d)\approx3{,}0064$ không vượt ngưỡng, nên $t=1$ được nhận.

**Áp dụng Thuật toán 04.34.**

| $k$ | $w^k$ | $J(w^k)-J^*$ | $\lVert\nabla J(w^k)\rVert_2$ | $\tfrac12\delta^2$ |
|---|---|---|---|---|
| 0 | $(0;\,0)$ | $1{,}17$ | $3{,}50$ | $1{,}09$ |
| 1 | $(0{,}6224;\,-2{,}0422)$ | $2{,}0\cdot10^{-2}$ | $0{,}525$ | $1{,}9\cdot10^{-2}$ |
| 2 | $(0{,}7190;\,-2{,}3121)$ | $6{,}6\cdot10^{-5}$ | $3{,}6\cdot10^{-2}$ | $6{,}6\cdot10^{-5}$ |
| 3 | $(0{,}72456;\,-2{,}32486)$ | $1{,}1\cdot10^{-9}$ | $1{,}6\cdot10^{-4}$ | $1{,}1\cdot10^{-9}$ |
| 4 | $(0{,}724584;\,-2{,}324903)$ | $<10^{-15}$ | $2{,}9\cdot10^{-9}$ | $3{,}4\cdot10^{-19}$ |

Mọi bước dùng $t=1$; từ $k=1$, số chữ số đúng gần gấp đôi mỗi bước (Định lý 04.36); $J^*\approx2{,}98627$.

**Đối chiếu với hạ gradient.** $\kappa=L/\mu\approx241$ ($\mu=\rho=0{,}1$ là cận dưới của Hessian trên toàn $\mathbb R^2$). Hạ gradient với bước $\tfrac1L$ cần $580$ bước để $J-J^*\le10^{-6}$; cận $\kappa\log(e_0/\varepsilon)$ của Định lý 04.27 là khoảng $3365$ bước. Hai giá trị riêng $24{,}08$ và $0{,}37$ của $\nabla^2J(0)$ chênh nhau gần $65$ lần vì cột giờ ôn tập có thang đo lớn hơn cột *hệ số chặn* (intercept) ($\sum a_i^2=91$ so với $6$) và hai cột gần cùng phương: cosin góc giữa chúng là $21/\sqrt{91\cdot6}\approx0{,}90$.

**Diễn giải.** Nghiệm $w^*\approx(0{,}7246;\,-2{,}3249)$ cho xác suất đạt $0{,}5$ tại $a\approx3{,}21$ giờ. Theo (5.5), tại $k=3$ sai số không vượt $\lVert\nabla J\rVert_2^2/(2\mu)\approx1{,}3\cdot10^{-7}$, nên dừng thuật toán tại bước này là có chứng nhận; sai số thực tế là $1{,}1\cdot10^{-9}$.

**Kiểm tra lại.** Tại $w^4$, $\lVert\nabla J\rVert_2\approx3\cdot10^{-9}$, và theo (5.5), $J(w^4)-J^*\le(3\cdot10^{-9})^2/0{,}2<10^{-16}$.

**Giới hạn.** Với $n$ đặc trưng, mỗi bước Newton tốn cấp $n^3$. Mất mát logistic không tự điều chỉnh (Nhận xét 04.58), và với $\rho=0{,}1$ số hạng chính quy hóa không bù được: tại $w=(-40;\,245)$, theo hướng $v=(1,0)$, tỷ số $\lvert h'''\rvert/h''^{3/2}\approx7{,}2>2$. Do đó $J$ không tự điều chỉnh, và chứng nhận dùng (5.5).

**Dẫn ngược lý thuyết.** Mệnh đề 04.2(a), 04.26 và Nhận xét 04.20 ở bước xác minh; Thuật toán 04.34, Định lý 04.36 và 04.27 cho tốc độ quan sát được và phép so với hạ gradient; Mệnh đề 04.62(a) cho chứng nhận.
:::

### 11.2. Trọng số trộn hai mô hình có tổng bằng 1

::: application Tình huống 04.2 (Trọng số trộn hai mô hình có tổng bằng 1)
**Bài toán và dữ liệu.** Hai mô hình ngôn ngữ cho xác suất của hai câu kiểm định: mô hình 1 cho $0{,}6$ và $0{,}2$, mô hình 2 cho $0{,}2$ và $0{,}4$. Mô hình trộn gán cho câu $j$ xác suất $w_1p_{1j}+w_2p_{2j}$, và cần chọn $w$ với $w_1+w_2=1$ để cực đại hợp lý của dữ liệu kiểm định.

**Mô hình hóa.** Với $c_1=(0{,}6;\,0{,}2)$, $c_2=(0{,}2;\,0{,}4)$:

$$
\begin{aligned}
&\min\ F(w)=-\log(c_1^Tw)\\
&\qquad\qquad-\log(c_2^Tw)\\
&\text{với}\quad w_1+w_2=1,
\end{aligned}
$$

trên miền mở lồi $\{w\mid c_1^Tw>0,\ c_2^Tw>0\}$. Đây là bài toán có đẳng thức với $A=[1\ \ 1]$, $b=1$.

**Xác minh giả thiết.** Gradient và Hessian của $F$ là

$$
\begin{aligned}
\nabla F(w)&=-\frac{c_1}{c_1^Tw}-\frac{c_2}{c_2^Tw},\\
\nabla^2F(w)&=\frac{c_1c_1^T}{(c_1^Tw)^2}+\frac{c_2c_2^T}{(c_2^Tw)^2}.
\end{aligned}
$$

1. Hessian xác định dương vì $c_1$, $c_2$ độc lập tuyến tính.
2. $F$ tự điều chỉnh theo Mệnh đề 04.52(b), (c).
3. Trên đường khả thi $w=(\theta,1-\theta)$, hàm rút gọn là $\psi(\theta)=-\log(0{,}2(1+2\theta))-\log(0{,}2(2-\theta))$ với $\theta\in(-\tfrac12,2)$; nó tiến tới $+\infty$ ở hai đầu, nên đạt cực tiểu.
4. $\psi'(\theta)=-\frac2{1+2\theta}+\frac1{2-\theta}=0$ cho $\theta^*=\tfrac34$, nên $w^*=(\tfrac34,\tfrac14)$ và $F^*=-\log\tfrac12-\log\tfrac14=\log8\approx2{,}0794$.

**Một bước Newton khả thi từ $w^0=(\tfrac12,\tfrac12)$.** Tại $w^0$: $c_1^Tw^0=0{,}4$ và $c_2^Tw^0=0{,}3$.

Gradient: $g=-(1{,}5;\,0{,}5)-(\tfrac23,\tfrac43)=(-\tfrac{13}6,-\tfrac{11}6)$.

Hessian:

$$
\begin{aligned}
H&=\begin{bmatrix}2{,}25&0{,}75\\0{,}75&0{,}25\end{bmatrix}+\begin{bmatrix}\tfrac49&\tfrac89\\\tfrac89&\tfrac{16}9\end{bmatrix}\\
&=\frac1{36}\begin{bmatrix}97&59\\59&73\end{bmatrix}.
\end{aligned}
$$

Hệ rút gọn với $Z=(-1,1)^T$:

- $Z^THZ=\frac{97-2\cdot59+73}{36}=\tfrac{13}9$;
- $Z^Tg=\tfrac{13}6-\tfrac{11}6=\tfrac13$;
- hệ (7.2) cho $\Delta z=-\tfrac13\cdot\tfrac9{13}=-\tfrac3{13}$, nên $d=(\tfrac3{13},-\tfrac3{13})$;
- $w^1=(\tfrac{19}{26},\tfrac7{26})\approx(0{,}7308;\,0{,}2692)$.

Nhân tử lấy từ hàng đầu của (7.1): $(Hd)_1=\tfrac3{13}\cdot\tfrac{97-59}{36}=\tfrac3{13}\cdot\tfrac{38}{36}$, nên $\eta=-g_1-(Hd)_1=\tfrac{13}6-\tfrac{19}{78}=\tfrac{25}{13}$.

**Cận sai số.** $\delta_{eq}^2=\frac{(1/3)^2}{13/9}=\tfrac1{13}$, $\delta_{eq}\approx0{,}2774$, nên Hệ quả 04.56 cho $F(w^0)-F^*\le-0{,}2774-\log0{,}7226\approx0{,}0475$; sai số thực tế là $\log\frac{25}{24}\approx0{,}0408$, mức giảm mô hình $\tfrac1{26}\approx0{,}0385$.

**Khởi đầu chưa khả thi.** Từ $w=(1,1)$, $\nu=0$:

1. phần dư: $r_d=(-\tfrac{13}{12},-\tfrac{11}{12})$, $r_p=1$, $\lVert r\rVert_2\approx1{,}736$;
2. bước: hệ (8.1) cho $d=(\tfrac5{26},-\tfrac{31}{26})$;
3. nhận bước với $\alpha=0{,}1$: $t=1$ cho $\lVert r^+\rVert_2\approx1{,}494\le0{,}9\cdot1{,}736\approx1{,}562$, và $r_p^+=0$ theo Mệnh đề 04.47(c);
4. miền: điểm mới $(1{,}192;\,-0{,}192)$ có $c_1^Tw\approx0{,}677>0$, $c_2^Tw\approx0{,}162>0$; các bước sau là Newton khả thi.

**Diễn giải.** Mô hình trộn đặt $75\%$ trọng số cho mô hình 1. Vì $w^T\nabla F(w)=-2$ với mọi $w$, nhân phương trình dừng $\nabla F=-\nu\mathbf 1$ với $w^{*T}$ cho $\nu^*=2$, số câu kiểm định; theo Hệ quả 03.24, đó là tốc độ giảm của $F^*(b)=\log8-2\log b$ khi nới ràng buộc thành $w_1+w_2=b$.

**Kiểm tra lại.** Tại $w^*$: $c_1^Tw^*=0{,}5$, $c_2^Tw^*=0{,}25$, $\nabla F=-(1{,}2;\,0{,}4)-(0{,}8;\,1{,}6)=(-2,-2)$, và $\nabla F+2\mathbf 1=0$.

**Giới hạn.** Bài toán không có ràng buộc $w\ge0$; nghiệm ở đây tự thỏa, nhưng với dữ liệu khác cần ràng buộc bất đẳng thức.

**Dẫn ngược lý thuyết.** Mệnh đề 04.2(b), 04.52, 04.43, Thuật toán 04.44 và Hệ quả 04.56 cho bước Newton khả thi và cận sai số; Mệnh đề 04.47 và Thuật toán 04.49 cho khởi đầu chưa khả thi; Hệ quả 03.24 cho nghĩa của nhân tử.
:::

### 11.3. Mạng tuyến tính hai lớp: giả thiết không thỏa

::: application Tình huống 04.3 (Mạng tuyến tính hai lớp: giả thiết không thỏa)
**Bài toán và dữ liệu.** Mạng có một nơ-ron ở mỗi lớp, không có hàm kích hoạt: đầu vào $x$ qua trọng số $b$ rồi $a$, dự báo $abx$. Một mẫu $(x,y)=(1,1)$ với mất mát bình phương cho

$$
f(a,b)=\tfrac12(ab-1)^2 .
$$

**Kiểm tra giả thiết.** $\nabla f=(ab-1)(b,a)^T$ và $\nabla^2f=\begin{bmatrix}b^2&2ab-1\\2ab-1&a^2\end{bmatrix}$.

1. Tính lồi bị vi phạm: tại $(0,0)$, Hessian $\begin{bmatrix}0&-1\\-1&0\end{bmatrix}$ có giá trị riêng $\pm1$.
2. Gradient Lipschitz toàn cục bị vi phạm: các phần tử $a^2$, $b^2$ của Hessian không bị chặn.
3. Tập nghiệm $\{ab=1\}$, với $f^*=0$, gồm hai nhánh hyperbol, không lồi.

Do đó Mệnh đề 04.2(a) chỉ còn chiều cần, và các Định lý 04.23, 04.27 không áp dụng.

**Hạ gradient từ $(1,-1)$, bước $t=\tfrac14$.** Trên đường chéo $a=-b$, $\nabla f=(a^2+1)(a,-a)$, nên cập nhật giữ $a=-b$ và $a^+=a\bigl(1-\tfrac14(1+a^2)\bigr)$.

| $k$ | $a_k=-b_k$ | $f$ | $\lVert\nabla f\rVert_2$ |
|---|---|---|---|
| 0 | $1$ | $2$ | $2{,}83$ |
| 1 | $0{,}5$ | $0{,}781$ | $0{,}884$ |
| 2 | $0{,}344$ | $0{,}625$ | $0{,}544$ |
| 5 | $0{,}135$ | $0{,}518$ | $0{,}194$ |
| 7 | $0{,}075$ | $0{,}506$ | $0{,}107$ |

Dãy tiến về điểm yên ngựa $(0,0)$: $\lVert g\rVert_2\to0$ trong khi $f\to\tfrac12$, nên tiêu chí dừng của Thuật toán 04.13 dừng tại một điểm không phải nghiệm.

**Newton tại $(0{,}2;\,0{,}2)$.** $g=(0{,}04-1)(0{,}2;\,0{,}2)=-0{,}192(1,1)$. Hessian $\begin{bmatrix}0{,}04&-0{,}92\\-0{,}92&0{,}04\end{bmatrix}$ có giá trị riêng $-0{,}88$ theo $(1,1)$ và $0{,}96$ theo $(1,-1)$. Vì $g$ song song $(1,1)$, $d=-H^{-1}g=-\tfrac{0{,}192}{0{,}88}(1,1)=-\tfrac{12}{55}(1,1)$, và $g^Td=2\cdot0{,}192\cdot\tfrac{12}{55}\approx0{,}0838>0$: hướng Newton là hướng tăng.

Với $t=1,\tfrac12,\tfrac14,\tfrac18,\tfrac1{16}$, $f$ tại điểm thử là $0{,}4997$; $0{,}4918$; $0{,}4791$; $0{,}4706$; $0{,}4659$, đều lớn hơn $f(0{,}2;\,0{,}2)=0{,}4608$, và mọi bước $t\in(0,1]$ đều bị loại với $\alpha=0{,}1$. Trên tia, $a=b=a(t)=0{,}2-\tfrac{12}{55}t$ và $f=\tfrac12(1-a(t)^2)^2$, nên

$$
\begin{aligned}
&f(x+td)-f(x)\\
&\quad=\tfrac12\bigl(0{,}04-a(t)^2\bigr)\\
&\qquad\cdot\bigl(1{,}96-a(t)^2\bigr)\\
&\quad=\tfrac12\cdot\tfrac{12}{55}t\Bigl(0{,}4-\tfrac{12}{55}t\Bigr)\\
&\qquad\cdot\bigl(1{,}96-a(t)^2\bigr)\\
&\quad\ge\tfrac12\cdot\tfrac{12}{55}t\cdot0{,}18\cdot1{,}92\\
&\quad\approx0{,}0377\,t .
\end{aligned}
$$

Trong đó, quan hệ thứ hai dùng $0{,}04-a^2=(0{,}2-a)(0{,}2+a)$, còn quan hệ thứ ba dùng $\tfrac{12}{55}t\le0{,}22$ và $\lvert a(t)\rvert<0{,}2$ khi $t\in(0,1]$. Ngưỡng Armijo chỉ tăng $\alpha t\,g^Td\approx0{,}0084\,t$, nên mọi bước thử bị loại. Một thủ tục quay lui chạy trên hướng này không kết thúc.

![Các đường mức của f bằng một nửa của ab trừ 1 bình phương. Hai nhánh hyperbol ab bằng 1 (nét đậm) là tập cực tiểu; hai trục và hyperbol ab bằng 2 là mức f bằng 1/2, gốc là điểm yên ngựa. Quỹ đạo hạ gradient đi từ (1, âm 1) dọc đường chéo về gốc; mũi tên Newton tại (0,2; 0,2) chỉ về gốc.](img/lec-04/deep-linear-saddle.svg)

**Diễn giải.** Hai hậu quả quan sát được tương ứng hai giả thiết bị vi phạm:

1. không lồi: điểm dừng không phải nghiệm, và Newton bị hút về điểm dừng bất kỳ, kể cả điểm yên ngựa;
2. Hessian không xác định dương: hướng Newton có thể là hướng tăng (Nhận xét 04.38).

**Kiểm tra lại.** Tại $(0{,}5;\,-0{,}5)$: $ab-1=-1{,}25$, $f=\tfrac12\cdot1{,}5625=0{,}78125$, $\nabla f=-1{,}25\,(-0{,}5;\,0{,}5)=(0{,}625;\,-0{,}625)$ với chuẩn $0{,}884$, khớp bảng. Tại $(0{,}2;\,0{,}2)$: $f=\tfrac12\cdot0{,}96^2=0{,}4608$.

**Giới hạn.** Điểm yên ngựa và Hessian không xác định dương cũng xuất hiện ở mạng thật (Goodfellow, Bengio và Courville 2016, §8.2.3, tr. 285–288).

**Dẫn ngược lý thuyết.** Mệnh đề 04.2(a), Định lý 04.23, 04.27 và Định nghĩa 04.18 là các kết quả có giả thiết bị vi phạm; Mệnh đề 04.7(c), 04.30(b) và Nhận xét 04.38 giải thích hướng tăng.
:::

### 11.4. Ứng dụng trong học máy

Các khái niệm của bài xuất hiện trong các vấn đề sau của học máy:

- **Mô hình tuyến tính tổng quát.** Hồi quy logistic được huấn luyện bằng Newton, tức bình phương nhỏ nhất có trọng số lặp (Tình huống 04.1).
- **Tốc độ học.** Bước $\tfrac1L$ của Bổ đề 04.21 bảo đảm mất mát giảm; với hàm bậc hai, bước cố định lớn hơn $\tfrac2L$ làm dãy phân kỳ từ mọi điểm đầu có thành phần khác $0$ theo vector riêng của $\lambda_{\max}$ (Nhận xét 04.14, Bài tập 04.4).
- **Chuẩn hóa đặc trưng.** Với mô hình tuyến tính, chia theo độ lệch chuẩn là một tiền điều kiện đường chéo (Nhận xét 04.17).
- **Ràng buộc trên tham số.** Trọng số trộn và bài toán phân bổ tài nguyên là bài toán có đẳng thức (Định lý 04.41, Mệnh đề 04.47, Tình huống 04.2).
- **Bộ giải tối ưu lồi.** Hàm chắn logarit, hệ (8.1) và phương pháp hàm chắn là các thành phần của phương pháp điểm trong (Mệnh đề 04.52, Thuật toán 04.61).
- **Mạng sâu.** Điểm yên ngựa và Hessian không xác định dương hạn chế phương pháp Newton (Tình huống 04.3).

### 11.5. Tóm tắt

Đích của mọi phương pháp là hệ (1.1) hoặc (1.2). Hạ gradient dùng $W=I$, phương pháp Newton dùng $W=H$ và hội tụ bậc hai cục bộ; thêm $Ad=0$ cho Newton khả thi, tuyến tính hóa (1.2) cho Newton từ điểm chưa khả thi; với hàm tự điều chỉnh, độ giảm Newton là cận sai số.

| Nội dung | Kết quả cần tra lại |
|---|---|
| Thiết lập và phương pháp giảm | Định nghĩa 04.1, 04.4; Mệnh đề 04.2; Nhận xét 04.3, 04.5 |
| Hướng giảm, quay lui, hướng dốc nhất | Định nghĩa 04.6, 04.8, 04.10, 04.15; Mệnh đề 04.7, 04.9, 04.11, 04.16; Thuật toán 04.13 |
| Hội tụ của hạ gradient | Định nghĩa 04.18; Bổ đề 04.19, 04.21, 04.22, 04.24; Định lý 04.23, 04.25 (quay lui với $\alpha=\tfrac12$), 04.27; Mệnh đề 04.26 |
| Phương pháp Newton | Định nghĩa 04.29, 04.31, 04.35; Mệnh đề 04.30, 04.32; Thuật toán 04.34; Định lý 04.36, 04.37 |
| Newton có đẳng thức | Mệnh đề 04.39, 04.43, 04.47, 04.48; Định nghĩa 04.40, 04.46; Định lý 04.41; Thuật toán 04.44, 04.49 |
| Tự điều chỉnh và cận sai số (đọc thêm) | Định nghĩa 04.51; Mệnh đề 04.52; Bổ đề 04.53; Định lý 04.54, 04.57; Hệ quả 04.55, 04.56 |
| Phương pháp hàm chắn (đọc thêm) | Định nghĩa 04.59; Mệnh đề 04.60; Thuật toán 04.61 |
| Tiêu chí dừng | Mệnh đề 04.62 |

Các công thức cần nhớ gồm:

$$
\begin{aligned}
&Wd=-g,\\
&f(x+td)\le f(x)+\alpha t\,g^Td,\\
&f(y)\le f(x)+\nabla f(x)^T(y-x)\\
&\quad+\tfrac L2\lVert y-x\rVert_2^2;
\end{aligned}
$$

$$
\begin{aligned}
&f(x^k)-f^*\le\frac{L\lVert x^0-x^*\rVert_2^2}{2k},\\
&f(x^k)-f^*\le\Bigl(1-\frac\mu L\Bigr)^k\\
&\quad\cdot\bigl(f(x^0)-f^*\bigr),\\
&f(x)-f^*\le\frac{\lVert\nabla f(x)\rVert_2^2}{2\mu};
\end{aligned}
$$

$$
\begin{gathered}
Hd=-g,\qquad\delta^2=-g^Td,\\
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\Delta\nu\end{bmatrix}=-\begin{bmatrix}r_d\\r_p\end{bmatrix},\\
f(x)-f^*\le-\delta-\log(1-\delta).
\end{gathered}
$$

Các giả thiết thường bị bỏ qua gồm:

- hướng giảm chỉ bảo đảm $f$ giảm với bước đủ nhỏ;
- các cận của hạ gradient cần gradient Lipschitz trên cả $\mathbb R^n$ và tính lồi; cận tuyến tính cần thêm lồi mạnh;
- hướng Newton cần $H\succ0$, hoặc $H$ xác định dương trên $\ker A$ khi có đẳng thức; hội tụ bậc hai là cục bộ;
- mức giảm mô hình $\tfrac12\delta^2$ không chặn sai số, kể cả khi $f$ tự điều chỉnh (Ví dụ 04.24); với hàm tự điều chỉnh, cận là (9.1), dùng $\delta$, cần $\delta<1$, và $f(x)-f^*\le\delta^2$ khi $\delta\le0{,}68$;
- tại điểm chưa khả thi, $F(u)-F^*$ có thể âm.

## 12. Bài tập

Các bài tập trong thân bài và mục tiêu học tập mà mỗi bài kiểm tra:

1. **Bài tập 04.1** (Hệ KKT rút gọn của hai bài toán): mục tiêu 1; hệ (1.1), (1.2) và dấu nhân tử.
2. **Bài tập 04.2** (Quay lui Armijo trên $x_1^2+4x_2^2$): mục tiêu 3; các lần thử và tập bước thỏa (5.2).
3. **Bài tập 04.3** (Hướng dốc nhất có trọng số tại $x^1$): mục tiêu 2; hướng dốc nhất và chuẩn đối ngẫu.
4. **Bài tập 04.4** (Bước cố định tối ưu và phân kỳ): mục tiêu 4; ngưỡng phân kỳ và số bước.
5. **Bài tập 04.5** (Newton với quay lui từ $s^0=3$): mục tiêu 3, 4; điểm thử ngoài miền và pha bậc hai.
6. **Bài tập 04.6** (Newton trên mất mát logistic không chính quy hóa): mục tiêu 3, 4; tỷ số hội tụ bậc hai.
7. **Bài tập 04.7** (Newton khả thi từ $(8,6)^T$): mục tiêu 5; hệ (7.1), hệ (7.2) và $\eta$.
8. **Bài tập 04.8** (Hệ khối và hệ rút gọn cho ba biến): mục tiêu 5; hệ khối, hệ rút gọn và $\delta_{eq}$.
9. **Bài tập 04.9** (Newton cho phần dư từ $(4,2)^T$): mục tiêu 5; bước (8.1) và ngưỡng phần dư.
10. **Bài tập 04.10** (Cận sai số cho $-\log s-\log(1-s)$): đọc thêm; cận (9.1) so với sai số thực tế.

Các bài tập tiếp theo củng cố toàn bài, chia theo ba mức.

### 12.1. Mức nhận biết

::: exercise Bài tập 04.11 (Đúng hay sai)
Xác định đúng hay sai, giải thích hoặc cho phản ví dụ.

- (i) Nếu $g^Td<0$ thì $f(x+d)<f(x)$.
- (ii) Nhân tử $\nu^*$ của bài toán có đẳng thức phải không âm.
- (iii) Hướng dốc nhất theo $\lVert\cdot\rVert_I$ là $-g$.
- (iv) Mọi hàm tự điều chỉnh đều đạt cực tiểu.
- (v) Với $F$ bậc hai lồi chặt, một bước Newton khả thi đầy đủ từ mọi điểm khả thi cho nghiệm.
- (vi) Trong (8.1), $\Delta\nu$ là nhân tử của nghiệm sau bước đầy đủ.
- (vii) Nếu $\delta=\tfrac12$ và $f$ thỏa giả thiết của Định lý 04.54 thì $f(x)-f^*\le\tfrac18$.
:::

::: hint
Mỗi câu đối chiếu với một kết quả có số hiệu: 04.7, 04.3, 04.16, 04.58, 04.41, 04.50, 04.54.
:::

::: solution

- (i) Sai. Mệnh đề 04.7 chỉ cho $t$ đủ nhỏ; Ví dụ 04.4 có $g^Td_G=-820$ nhưng $f(x^0+d_G)=2040>62$.
- (ii) Sai. Nhận xét 04.3; Ví dụ 04.17 có $\nu^*=-20$.
- (iii) Đúng, với quy ước độ dài $d=\lVert g\rVert_{I,*}v_I$ (Mệnh đề 04.16 với $W=I$).
- (iv) Sai. $-\log s$ tự điều chỉnh, không bị chặn dưới.
- (v) Đúng. Mô hình trùng hàm, nên bước giải đúng (1.2) (Ví dụ 04.18, Bài tập 04.7).
- (vi) Sai. Nhân tử mới là $\nu+\Delta\nu$ (Nhận xét 04.50).
- (vii) Sai. Cận là $-\tfrac12-\log\tfrac12\approx0{,}193$, không phải $\tfrac18$; với $\varphi(s)=s-\log s$ tại $s=\tfrac12$, $\delta=\tfrac12$ và sai số $\log2-\tfrac12\approx0{,}193>\tfrac18$.

**Kiểm tra lại.** Câu (vii): Hệ quả 04.55 cho cận $\delta^2=\tfrac14$, cũng không phải $\tfrac18$.
:::

### 12.2. Mức tính toán hoặc chứng minh

::: exercise Bài tập 04.12 (Newton khả thi cho bài toán tâm giải tích)
Xét $\min F(u)=-\log u_1-\log u_2$ với $u_1+2u_2=4$, trên miền $u>0$; nghiệm của bài toán này gọi là *tâm giải tích* (analytic center) của tập khả thi.

- (a) Giải (1.2) để tìm $u^*$, $\nu^*$, $F^*$.
- (b) Từ $u^0=(3,\tfrac12)^T$, giải (7.1); tính $u^0+d$ và $\delta_{eq}=\sqrt{d^THd}$.
- (c) Áp dụng Hệ quả 04.56 và so với sai số thực tế.
:::

::: hint
$\nabla F=(-\tfrac1{u_1},-\tfrac1{u_2})^T$, $\nabla^2F=\operatorname{diag}(u_1^{-2},u_2^{-2})$. $F$ tự điều chỉnh theo Mệnh đề 04.52.
:::

::: solution
**Câu (a).** $-\tfrac1{u_1}+\nu=0$, $-\tfrac1{u_2}+2\nu=0$ cho $u_1=\tfrac1\nu$, $u_2=\tfrac1{2\nu}$; ràng buộc: $\tfrac2\nu=4$, $\nu^*=\tfrac12$, $u^*=(2,1)^T$, $F^*=-\log2$.

**Câu (b).** $g=(-\tfrac13,-2)^T$, $H=\operatorname{diag}(\tfrac19,4)$. Hệ: $\tfrac19d_1+\eta=\tfrac13$, $4d_2+2\eta=2$, $d_1+2d_2=0$. Thay $d_1=-2d_2$ vào hàng đầu: $\eta=\tfrac13+\tfrac29d_2$; hàng hai: $4d_2+\tfrac23+\tfrac49d_2=2$, nên $\tfrac{40}9d_2=\tfrac43$, $d_2=\tfrac3{10}$, $d_1=-\tfrac35$, $\eta=\tfrac25$.

Điểm mới $(\tfrac{12}5,\tfrac45)^T$. $\delta_{eq}^2=\tfrac19\cdot\tfrac9{25}+4\cdot\tfrac9{100}=\tfrac25$, $\delta_{eq}\approx0{,}632$.

**Câu (c).** $F$ tự điều chỉnh, Hessian xác định dương, cực tiểu đạt, $\delta_{eq}<1$: cận $-0{,}632-\log0{,}368\approx0{,}368$. Sai số thực tế $F(u^0)-F^*=-\log\tfrac32+\log2=\log\tfrac43\approx0{,}288$.

**Kiểm tra lại.** $A d=-\tfrac35+\tfrac35=0$. $\delta_{eq}\le0{,}68$ nên Hệ quả 04.55 cho thêm cận $\tfrac25=0{,}4$.
:::

::: exercise Bài tập 04.13 (Ma trận khối khi $H$ không xác định dương)
- (a) Với $H=\operatorname{diag}(1,-1)$, $A=[0\ \ 1]$ và $g=(1,1)^T$, chứng minh ma trận của (7.1) khả nghịch và giải (7.1).
- (b) Với cùng $H$, $g$ nhưng $A=[1\ \ 0]$, chứng minh ma trận vẫn khả nghịch, nhưng nghiệm $d$ không cực tiểu hóa mô hình trên $\ker A$.
- (c) Rút ra vai trò của giả thiết "$H$ xác định dương trên $\ker A$" trong Định lý 04.41.
:::

::: hint
Ở (b), $\ker A=\{(0,s)\}$; viết mô hình như hàm của $s$.
:::

::: solution
**Câu (a).** $\ker A=\{(s,0)\}$ và $d^THd=s^2>0$, nên Định lý 04.41(a) cho khả nghịch. Hệ: $d_1=-1$, $-d_2+\eta=-1$, $d_2=0$, nên $d=(-1,0)^T$, $\eta=-1$.

**Câu (b).** Ma trận $\begin{bmatrix}1&0&1\\0&-1&0\\1&0&0\end{bmatrix}$ có định thức $1\cdot0-0+1\cdot(0\cdot0-(-1)\cdot1)=1\ne0$. Hệ: $d_1+\eta=-1$, $-d_2=-1$, $d_1=0$, nên $d=(0,1)^T$, $\eta=-1$. Trên $\ker A$, mô hình $g^Td+\tfrac12d^THd$ tại $d=(0,s)$ bằng $s-\tfrac12s^2$, không bị chặn dưới; $s=1$ là điểm cực đại.

**Câu (c).** Khả nghịch chỉ cho nghiệm duy nhất của hệ KKT; tính cực tiểu và tính giảm ở Định lý 04.41(b), (c) cần độ cong dương theo các hướng khả thi.

**Kiểm tra lại.** Ở (b), $g^Td=1>0$: hướng thu được là hướng tăng.
:::

::: exercise Bài tập 04.14 (Hạ gradient không cần tính lồi)
Cho $f$ khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz, bị chặn dưới bởi $f^*$, và $x^{k+1}=x^k-\tfrac1L\nabla f(x^k)$. Chứng minh

$$
\begin{aligned}
&\min_{0\le j<k}\lVert\nabla f(x^j)\rVert_2^2\\
&\quad\le\frac{2L\bigl(f(x^0)-f^*\bigr)}k .
\end{aligned}
$$

Giải thích vì sao kết luận này áp dụng được cho Tình huống 04.3 trên một tập bị chặn, nhưng không cho biết $f(x^k)-f^*$.
:::

::: hint
Cộng bổ đề giảm theo $j=0,\ldots,k-1$.
:::

::: solution
**Chứng minh.** Bổ đề 04.21 không dùng tính lồi: $\frac1{2L}\lVert\nabla f(x^j)\rVert_2^2\le f(x^j)-f(x^{j+1})$. Cộng theo $j$:

$$
\begin{aligned}
&\frac k{2L}\min_{j<k}\lVert\nabla f(x^j)\rVert_2^2\\
&\quad\le\frac1{2L}\sum_{j=0}^{k-1}\lVert\nabla f(x^j)\rVert_2^2\\
&\quad\le f(x^0)-f(x^k)\\
&\quad\le f(x^0)-f^* .
\end{aligned}
$$

**Áp dụng.** Quỹ đạo của Tình huống 04.3 nằm trong hình vuông $\lvert a\rvert,\lvert b\rvert\le1$, nơi mỗi hàng của Hessian có tổng trị tuyệt đối không quá $b^2+\lvert2ab-1\rvert\le4$; mọi giá trị riêng của ma trận đối xứng có trị tuyệt đối không vượt tổng trị tuyệt đối lớn nhất của một hàng, nên $\lVert\nabla^2f\rVert_2\le4$ trên hình vuông. Hình vuông lồi chứa mọi đoạn nối hai điểm lặp liên tiếp, nên Bổ đề 04.19 và 04.21 đúng trên các đoạn đó với $L=4$, tức bước $\tfrac14$ của Tình huống 04.3. Kết luận chỉ nói chuẩn gradient nhỏ: $\lVert\nabla f\rVert_2\to0$ trong khi $f\to\tfrac12\ne f^*$.

**Kiểm tra lại.** Với hàm bậc hai $\tfrac12(3x_1^2+7x_2^2)$, $L=7$, $f(x^0)-f^*=62$, $k=1$: $\lVert\nabla f(x^0)\rVert_2^2=820\le868=2\cdot7\cdot62$.
:::

### 12.3. Mức vận dụng

::: exercise Bài tập 04.15 (Thang đo đặc trưng và số điều kiện)
Hồi quy ridge $J(w)=\tfrac12\lVert Mw-y\rVert_2^2+\tfrac\rho2\lVert w\rVert_2^2$ với $\rho=0{,}1$ và $M$ có bốn hàng $(1,1)$, $(1,-1)$, $(-1,1)$, $(-1,-1)$.

- (a) Tính $\nabla^2J$, $L$, $\mu$, $\kappa$.
- (b) Đặc trưng thứ hai được đo lại theo đơn vị nhỏ hơn $10$ lần, nên cột thứ hai của $M$ nhân $10$. Tính lại $\kappa$ và so hệ số $\kappa$ trong cận số bước $\kappa\log(e_0/\varepsilon)$ của Định lý 04.27 với (a).
- (c) Giải thích vì sao Newton không chịu ảnh hưởng của việc đổi thang đo này nếu bỏ chính quy hóa, và vì sao khi có chính quy hóa thì phép đổi thang làm thay đổi chính bài toán.
:::

::: hint
$M^TM$ là ma trận đường chéo. Dữ liệu mới là $\tilde M=M\operatorname{diag}(1,10)$; dùng Mệnh đề 04.32(c) với $T=\operatorname{diag}(1,10)$.
:::

::: solution
**Câu (a).** $M^TM=\operatorname{diag}(4,4)$, $\nabla^2J=\operatorname{diag}(4{,}1;\,4{,}1)$, $L=\mu=4{,}1$, $\kappa=1$: hạ gradient với bước $\tfrac1L$ tới nghiệm sau một bước.

**Câu (b).** $\tilde M^T\tilde M=\operatorname{diag}(4,400)$, $\nabla^2J=\operatorname{diag}(4{,}1;\,400{,}1)$, $\kappa\approx97{,}6$: hệ số $\kappa$ của cận tăng khoảng $98$ lần.

**Câu (c).** Không chính quy hóa, $\tilde M\tilde w=M(T\tilde w)$ với $T=\operatorname{diag}(1,10)$, nên $\tilde J(\tilde w)=J(T\tilde w)$, và theo Mệnh đề 04.32(c), các điểm lặp Newton tương ứng qua $w=T\tilde w$. Có chính quy hóa, $\tfrac\rho2\lVert\tilde w\rVert_2^2$ không phải ảnh của $\tfrac\rho2\lVert w\rVert_2^2$ qua $T$, nên bài toán mới có nghiệm khác.

**Kiểm tra lại.** $\kappa=400{,}1/4{,}1\approx97{,}6$.
:::

Bài tập 04.16–04.31, có gợi ý và lời giải, nằm trong [tệp bài tập của Bài 04](material-viewer.html?doc=materials/lec-04/exercises.md&deck=lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html).

## 13. Câu hỏi cuối buổi và cầu nối

Mức giảm dự báo $\tfrac9{32}\approx0{,}281$ không dùng được làm cận trên của sai số $\varphi(\tfrac14)-\varphi^*$: sai số này bằng $\log4-\tfrac34\approx0{,}636$ (Ví dụ 04.15), vì parabol dùng độ cong $16$, lớn hơn độ cong của $\varphi$ trên phần còn lại của $[\tfrac14,1]$ (giảm từ $16$ xuống $1$). Ở phần đọc thêm, cận (9.1) với $\delta=\tfrac34$ chứng nhận sai số này (Ví dụ 04.24).

**Câu hỏi.** Ở Tình huống 04.1, tại điểm lặp $w^2$ của phương pháp Newton, $\lVert\nabla J(w^2)\rVert_2\approx0{,}0359$, $\tfrac12\delta^2\approx6{,}6\cdot10^{-5}$ và $J$ lồi mạnh với $\mu=\rho=0{,}1$.

- (a) Xác định cận nào trong hai cận (5.5) và (9.1) (cận thứ hai ở phần đọc thêm) chứng nhận được sai số $J(w^2)-J^*$, và tính cận đó.
- (b) Thuật toán 04.34 với tiêu chí $\tfrac12\delta^2\le10^{-4}$ dừng tại $w^2$. Xác định sai số mà điểm dừng này được chứng nhận cho hồi quy logistic, và so với sai số thực tế $J(w^2)-J^*\approx6{,}6\cdot10^{-5}$.

::: solution Lời giải câu hỏi cuối buổi
**Câu (a).** Cận (5.5) áp dụng vì $J$ lồi mạnh: $J(w^2)-J^*\le\lVert\nabla J(w^2)\rVert_2^2/(2\mu)\approx6{,}4\cdot10^{-3}$. Cận (9.1) cần $J$ tự điều chỉnh. Mất mát logistic không có tính chất này (Nhận xét 04.58), và với $\rho=0{,}1$ số hạng $\tfrac\rho2\lVert w\rVert_2^2$ không bù được (Tình huống 04.1), nên $J$ cũng không tự điều chỉnh và cận (9.1) không dùng được.

**Câu (b).** Cận (9.1) không áp dụng, nên $\tfrac12\delta^2$ không chứng nhận sai số. Chứng nhận dùng (5.5): $J(w^2)-J^*\le6{,}4\cdot10^{-3}$, lớn hơn khoảng $100$ lần sai số thực tế $6{,}6\cdot10^{-5}$ (Mệnh đề 04.62(a)).

**Kiểm tra lại.** $0{,}03589^2/0{,}2\approx0{,}00644$ và $0{,}00644/0{,}000066\approx98$.
:::

Mọi phương pháp của bài dùng gradient trên toàn bộ dữ liệu và giả thiết mất mát lồi. Các bài sau xét chi phí và nới các giả thiết này:

- Bài 05 (Không gian đặc trưng nhiều chiều) đếm chi phí một bước của hạ gradient và Newton khi số đặc trưng tăng;
- Bài 05b (Hội tụ của hạ gradient và hạ gradient ngẫu nhiên) chứng minh hội tụ cho hàm không lồi và gradient ngẫu nhiên, kế thừa bổ đề giảm;
- Bài 06 (Mở rộng mô hình và dữ liệu) dùng gradient trên lô nhỏ mẫu, khi quay lui Armijo không áp dụng nguyên dạng.

## 14. Tài liệu đọc

- **Trước buổi học:**
  - Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press: §9.1–9.3 (tr. 457–475: bài toán không ràng buộc, phương pháp giảm, quay lui, hạ gradient), §10.1 (tr. 521–525: bài toán có ràng buộc đẳng thức).
  - Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả: §8.2 (tr. 282–289: phương pháp bậc nhất, hướng giảm, tốc độ học, tốc độ hội tụ).
- **Sau buổi học:**
  - Boyd và Vandenberghe (2004): §9.4–9.6 (tr. 475–508: hướng dốc nhất, Newton, tự điều chỉnh); §9.3.2 (tr. 469–470: nguồn của Ví dụ 04.8); §10.2–10.4 (tr. 525–546: hai phương pháp Newton có đẳng thức, giải hệ KKT); §5.5.3 (tr. 243–244); §11.1–11.3.1 (tr. 561–571) và §11.3.3 (tr. 577): phương pháp hàm chắn.
  - Murphy (2022): §8.3.1 (tr. 289: phương pháp Newton); §10.2.6 (tr. 346: bình phương nhỏ nhất có trọng số lặp cho hồi quy logistic).
  - Boyd, Stephen, slide bài giảng cho MIT OpenCourseWare 6.079 *Introduction to Convex Optimization* (Fall 2009), Lecture 16 *Unconstrained minimization* và Lecture 17 *Equality constrained minimization*; tài liệu theo giấy phép CC BY-NC-SA 4.0.
- **Mở rộng:**
  - Goodfellow, Ian; Bengio, Yoshua; Courville, Aaron (2016), *Deep Learning*, MIT Press: §4.3 (tr. 82–93), §8.2 (tr. 282–294: điểm yên ngựa), §8.5–8.6 (tr. 306–317: tốc độ học thích nghi, phương pháp bậc hai xấp xỉ).
  - Martens, James (2010), "Deep learning via Hessian-free optimization", *Proceedings of the 27th International Conference on Machine Learning*: Newton không lập Hessian.
