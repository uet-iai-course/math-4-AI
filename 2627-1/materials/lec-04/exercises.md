# Bài tập Bài 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

Bài tập 04.16–04.31 dưới đây đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-04/lecture-note.md&deck=lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html) và [bài giảng](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html) của Bài 04. Các bài lấy từ Boyd và Vandenberghe (2004), Chương 9, 10, 11, và một bài từ Kupferschmid (2023), Chương 13; số trang là trang in của sách. Lời giải dẫn định nghĩa, định lý, mệnh đề, ví dụ và bài tập theo số hiệu của ghi chú. Ký hiệu theo ghi chú gồm:

- $g=\nabla f(x)$, $H=\nabla^2f(x)$, $d$ là hướng, $t$ là độ dài bước, $\delta$ là độ giảm Newton;
- vector viết dạng cột, ví dụ $x^0=(2,4)^T$;
- bài toán có ràng buộc đẳng thức viết $\min F(u)$ với $Au=b$, $A\in\mathbb R^{p\times n}$ đủ hạng hàng;
- $Z$ là ma trận có các cột là một cơ sở của $\ker A$.

Hai bài có nhãn "— đọc thêm" trong tên dùng phương pháp hàm chắn ở phần đọc thêm của ghi chú.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Hệ điều kiện tối ưu rút gọn, tính cần và đủ | 04.1, 04.11 | 04.25, 04.30 |
| 2. Bài toán con bậc hai; hướng ngược gradient, hướng dốc nhất theo chuẩn có trọng số, hướng Newton | 04.3, 04.11, 04.13 | 04.16, 04.26 |
| 3. Một vòng lặp hạ gradient hoặc Newton với quay lui bằng số | 04.2, 04.5, 04.6, 04.15 | 04.21, 04.22, 04.23 |
| 3. Mức giảm mô hình, mức giảm thực tế và sai số mục tiêu | 04.5, 04.10 | — |
| 4. Cận hội tụ của hạ gradient và giả thiết của chúng | 04.4, 04.14 | 04.20, 04.23 |
| 4. Tốc độ hội tụ của phương pháp Newton | 04.5, 04.6 | 04.22, 04.24 |
| 5. Newton khả thi: hệ khối và khử biến | 04.7, 04.8, 04.12, 04.13 | 04.25, 04.26, 04.27, 04.30 |
| 5. Newton từ điểm chưa khả thi | 04.9 | 04.17, 04.18 |
| 6. Tính tự điều chỉnh | 04.10, 04.11 | 04.24, 04.28, 04.29 |
| 6. Độ giảm Newton: chuẩn đối ngẫu và cận sai số | 04.10, 04.12 | 04.16 |
| 6. Điều mỗi tiêu chí dừng chứng nhận trên mô hình học | 04.6, 04.15 | — |
| Phương pháp hàm chắn (đọc thêm) | — | 04.19, 04.31 |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 2, 6; viết độ giảm Newton thành cận trên đúng theo mọi $v\ne0$.

::: exercise Bài tập 04.16 (Độ giảm Newton dưới dạng cận trên đúng; Boyd và Vandenberghe, Bài 9.9, tr. 515)
Cho $H=\nabla^2f(x)\succ0$ và $g=\nabla f(x)\ne0$. Chứng minh độ giảm Newton thỏa
$$
\begin{aligned}
\delta&=\sup_{v^THv=1}\bigl(-v^Tg\bigr)\\
&=\sup_{v\ne0}\frac{-v^Tg}{(v^THv)^{1/2}} .
\end{aligned}
$$
:::

::: hint Gợi ý 1
So $\sup_{v^THv=1}(-v^Tg)$ với chuẩn đối ngẫu của Định nghĩa 04.15.
:::

::: hint Gợi ý 2
Dùng Mệnh đề 04.16(b) với $W=H$ và tính đối xứng của elip $\{v\mid v^THv\le1\}$. Với dạng thứ hai, chuẩn hóa $v\ne0$ theo $\lVert\cdot\rVert_H$.
:::

::: solution Lời giải Bài tập 04.16
**Dạng thứ nhất.** Theo Định nghĩa 04.15 với $W=H$, $\lVert g\rVert_{H,*}=\max\{g^Tv\mid\lVert v\rVert_H\le1\}$; theo Mệnh đề 04.16(b), giá trị này bằng $\sqrt{g^TH^{-1}g}=\delta$ (Định nghĩa 04.31). Hình elip $\{\lVert v\rVert_H\le1\}$ đối xứng qua gốc, nên thay $v$ bằng $-v$ được $\delta=\max\{-v^Tg\mid\lVert v\rVert_H\le1\}$. Hàm tuyến tính $-v^Tg$ khác $0$ đạt giá trị lớn nhất trên biên: nếu $\lVert v\rVert_H<1$ và $-v^Tg>0$ thì $v/\lVert v\rVert_H$ cho giá trị lớn hơn. Do đó cận trên đúng trên mặt $v^THv=1$ cũng bằng $\delta$, đạt tại $v=-H^{-1}g/\delta$.

**Dạng thứ hai.** Với $v\ne0$, đặt $w=v/\lVert v\rVert_H$, thì $w^THw=1$ và $\frac{-v^Tg}{(v^THv)^{1/2}}=-w^Tg$. Khi $v$ chạy trên $\mathbb R^n\setminus\{0\}$, $w$ chạy trên toàn bộ mặt $w^THw=1$, nên hai cận trên đúng bằng nhau.

**Kiểm tra lại.** Với $H=\operatorname{diag}(3,7)$ và $g=(6,28)^T$: $\delta^2=\tfrac{36}3+\tfrac{784}7=124$. Tại $v=-H^{-1}g/\delta=-(2,4)^T/\sqrt{124}$: $v^THv=\tfrac{12+112}{124}=1$ và $-v^Tg=\tfrac{12+112}{\sqrt{124}}=\sqrt{124}=\delta$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 5; chứng minh một đẳng thức đã thỏa thì được giữ ở mọi vòng lặp của Thuật toán 04.49.

::: exercise Bài tập 04.17 (Các đẳng thức đã thỏa trong Newton từ điểm chưa khả thi; Boyd và Vandenberghe, Bài 10.8, tr. 558)
Dùng Thuật toán 04.49 cho bài toán $\min F(u)$ với $a_i^Tu=b_i$, $i=1,\ldots,p$, trong đó $a_i^T$ là hàng thứ $i$ của $A$. Ký hiệu $u^k$ là điểm lặp thứ $k$ và $t_k$ là bước được nhận ở vòng lặp $k$.

- **(a)** Giả sử $a_i^Tu^0=b_i$ với một chỉ số $i$. Chứng minh $a_i^Tu^k=b_i$ với mọi $k$.
- **(b)** Giả sử ràng buộc thứ $i$ trở nên thỏa ở vòng lặp $k$, tức $a_i^Tu^{k-1}\ne b_i$ và $a_i^Tu^k=b_i$. Chứng minh $Au^k=b$.
:::

::: hint Gợi ý 1
Thành phần thứ $i$ của phần dư gốc $r_p(u)=Au-b$ là $a_i^Tu-b_i$. Dùng Mệnh đề 04.47(c).
:::

::: hint Gợi ý 2
Ở (b), suy ra giá trị của $t_{k-1}$ từ một tích bằng $0$.
:::

::: solution Lời giải Bài tập 04.17
Theo Mệnh đề 04.47(c), $r_p(u^{j+1})=(1-t_j)\,r_p(u^j)$ với mọi $j$; xét thành phần thứ $i$:
$$
\begin{aligned}
&a_i^Tu^{j+1}-b_i\\
&\quad=(1-t_j)\bigl(a_i^Tu^j-b_i\bigr).
\end{aligned}
$$

**Câu (a).** Quy nạp theo $k$: nếu $a_i^Tu^k-b_i=0$ thì vế phải với $j=k$ bằng $0$, nên $a_i^Tu^{k+1}=b_i$.

**Câu (b).** Với $j=k-1$, vế trái bằng $0$ và $a_i^Tu^{k-1}-b_i\ne0$, nên $t_{k-1}=1$. Khi đó $r_p(u^k)=(1-1)\,r_p(u^{k-1})=0$, tức mọi ràng buộc đều thỏa tại $u^k$.

**Kiểm tra lại.** Với $u^0=(1,8)^T$, $A=[1\ \ 1]$, $b=14$ (Ví dụ 04.20), $r_p(u^0)=-5$. Nếu bước đầu được nhận là $t_0=\tfrac12$ thì $r_p(u^1)=-2{,}5$; nếu tiếp theo $t_1=1$ thì $r_p(u^2)=0$, và theo (a) mọi điểm lặp sau giữ $r_p=0$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 5; so tính Lipschitz của ma trận Jacobian của phần dư với tính Lipschitz của Hessian.

::: exercise Bài tập 04.18 (Tính Lipschitz của ma trận Jacobian của phần dư; Boyd và Vandenberghe, Bài 10.7(b), tr. 558)
Với phần dư ghép $r(u,\nu)$ của Định nghĩa 04.46, ma trận Jacobian theo $y=(u,\nu)$ là
$$
J_r(u,\nu)=\begin{bmatrix}\nabla^2F(u)&A^T\\A&0\end{bmatrix}.
$$
Cho $S_u\subseteq\operatorname{dom}F$ và $S=S_u\times\mathbb R^p$. Chứng minh rằng $\lVert J_r(y)-J_r(\tilde y)\rVert_2\le L_H\lVert y-\tilde y\rVert_2$ với mọi $y,\tilde y\in S$ khi và chỉ khi $\lVert\nabla^2F(u)-\nabla^2F(\tilde u)\rVert_2\le L_H\lVert u-\tilde u\rVert_2$ với mọi $u,\tilde u\in S_u$, với cùng hằng số $L_H$. Chuẩn của ma trận là chuẩn phổ.
:::

::: hint Gợi ý 1
Tính $J_r(y)-J_r(\tilde y)$; ma trận này chỉ có một khối khác $0$. Tính chuẩn phổ của nó.
:::

::: hint Gợi ý 2
Ở chiều ngược, chọn hai điểm của $S$ có cùng $\nu$.
:::

::: solution Lời giải Bài tập 04.18
Với $y=(u,\nu)$, $\tilde y=(\tilde u,\tilde\nu)$, các khối $A^T$, $A$, $0$ không phụ thuộc điểm, nên
$$
\begin{aligned}
&J_r(y)-J_r(\tilde y)=\begin{bmatrix}D&0\\0&0\end{bmatrix},\\
&D=\nabla^2F(u)-\nabla^2F(\tilde u).
\end{aligned}
$$
Với $(v,w)$ có $\lVert v\rVert_2^2+\lVert w\rVert_2^2=1$, ảnh là $(Dv,0)$, nên chuẩn phổ của ma trận khối bằng $\max_{\lVert v\rVert_2\le1}\lVert Dv\rVert_2=\lVert D\rVert_2$.

**Chiều thuận.** Nếu $\lVert D\rVert_2\le L_H\lVert u-\tilde u\rVert_2$ thì, vì $\lVert u-\tilde u\rVert_2\le\lVert y-\tilde y\rVert_2$, ta có $\lVert J_r(y)-J_r(\tilde y)\rVert_2\le L_H\lVert y-\tilde y\rVert_2$.

**Chiều ngược.** Với $u,\tilde u\in S_u$, hai điểm $y=(u,0)$ và $\tilde y=(\tilde u,0)$ thuộc $S$, nên $\lVert D\rVert_2=\lVert J_r(y)-J_r(\tilde y)\rVert_2\le L_H\lVert(u-\tilde u,0)\rVert_2=L_H\lVert u-\tilde u\rVert_2$.

**Kiểm tra lại.** Với $F(u)=\tfrac16u^3$ trên $u>0$ và $p=1$: $J_r(u,\nu)-J_r(\tilde u,\tilde\nu)=\operatorname{diag}(u-\tilde u,0)$, có chuẩn $\lvert u-\tilde u\rvert\le\lVert y-\tilde y\rVert_2$; hằng số Lipschitz của $F''(u)=u$ cũng bằng $1$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** phương pháp hàm chắn (đọc thêm); nhận ra khi nào bài toán tâm hóa không có nghiệm.

::: exercise Bài tập 04.19 (Hàm chắn trên một quy hoạch tuyến tính hai biến — đọc thêm; Boyd và Vandenberghe, Bài 11.2, tr. 623)
Xét quy hoạch tuyến tính với biến $x\in\mathbb R^2$:
$$
\begin{aligned}
&\min\ x_2\\
&\text{với}\quad x_1\le x_2,\quad 0\le x_2 .
\end{aligned}
$$

- **(a)** Viết hai ràng buộc ở dạng $f_i(x)\le0$, hàm chắn logarit $B$ và bài toán tâm hóa của Định nghĩa 04.59.
- **(b)** Tìm $p^*$ và một điểm khả thi ngặt.
- **(c)** Xác định điều xảy ra khi áp dụng Thuật toán 04.61.
:::

::: hint Gợi ý 1
Ở (c), xét mục tiêu tâm hóa dọc một tia trong $\operatorname{dom}B$ mà trên đó $f_0$ không đổi.
:::

::: hint Gợi ý 2
Ở (c), dùng Nhận xét 04.58 để xác định $\delta$ có nhỏ hơn $1$ tại điểm nào của $\operatorname{dom}B$ hay không.
:::

::: solution Lời giải Bài tập 04.19
**Câu (a).** $f_1(x)=x_1-x_2\le0$, $f_2(x)=-x_2\le0$, nên $m=2$, không có ràng buộc đẳng thức, và
$$
\begin{aligned}
&B(x)=-\log(x_2-x_1)-\log x_2,\\
&\operatorname{dom}B=\{x\mid x_1<x_2,\ x_2>0\}.
\end{aligned}
$$
Bài toán tâm hóa với tham số chắn $\tau>0$ là cực tiểu hóa $\tau x_2-\log(x_2-x_1)-\log x_2$ trên $\operatorname{dom}B$.

**Câu (b).** Mọi điểm khả thi có $x_2\ge0$, và các điểm $(x_1,0)$ với $x_1\le0$ khả thi, nên $p^*=0$, đạt tại mọi điểm như vậy. Điểm $(-1,1)$ khả thi ngặt: $-1<1$ và $1>0$.

**Câu (c).** Tại $x=(x_1,1)$ với $x_1<1$, mục tiêu tâm hóa bằng $\tau-\log(1-x_1)$, tiến tới $-\infty$ khi $x_1\to-\infty$. Bài toán tâm hóa không bị chặn dưới, nên không có $x^*(\tau)$ với bất kỳ $\tau>0$ nào, và bước 1 của Thuật toán 04.61 không có điểm $x^*(\tau)$ để trả về.

Mục tiêu tâm hóa tự điều chỉnh: $\tau x_2$ tuyến tính, còn $B$ là tổng của $-\log$ hợp với hai hàm affine (Mệnh đề 04.52(b), (c)). Hessian của nó là $\frac{a_1a_1^T}{(x_2-x_1)^2}+\frac{a_2a_2^T}{x_2^2}$ với $a_1=(-1,1)^T$, $a_2=(0,1)^T$ độc lập tuyến tính, nên xác định dương. Theo Nhận xét 04.58, nếu $\delta<1$ tại một điểm thì mục tiêu bị chặn dưới. Mục tiêu không bị chặn dưới, nên $\delta\ge1$ tại mọi điểm, và Thuật toán 04.34 với tiêu chí $\tfrac12\delta^2\le\varepsilon_{\mathrm{model}}<\tfrac12$ không bao giờ dừng.

Các giả thiết khác của Định nghĩa 04.59 đều thỏa; giả thiết bị vi phạm là bài toán tâm hóa có nghiệm $x^*(\tau)$, điều kiện mà Định nghĩa 04.59 đặt cho đường trung tâm.

**Kiểm tra lại.** Với $\tau=1$: tại $(-10,1)$, mục tiêu bằng $1-\log11\approx-1{,}398$; tại $(-100,1)$, bằng $1-\log101\approx-3{,}615$.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 4; nhận ra giả thiết về miền và tập mức dưới mà các định lý hội tụ cần.

::: exercise Bài tập 04.20 (Điểm đầu và điều kiện tập mức dưới; Boyd và Vandenberghe, Bài 9.3, tr. 514)
Xét hàm $f(x)=x_1^2+x_2^2$ với miền $\operatorname{dom}f=\{(x_1,x_2)\mid x_1>1\}$.

- **(a)** Tìm $f^*=\inf_{x\in\operatorname{dom}f}f(x)$ và xác định giá trị này có đạt được hay không.
- **(b)** Mô tả và vẽ tập mức dưới $S=\{x\in\operatorname{dom}f\mid f(x)\le f(x^0)\}$ với $x^0=(2,2)^T$. Xác định $S$ có đóng hay không và $f$ có lồi mạnh trên $S$ hay không.
- **(c)** Chạy Thuật toán 04.13 từ $x^0$ với $\alpha\in(0,\tfrac12]$ và $\beta\in(0,1)$ bất kỳ, bỏ qua tiêu chí dừng. Xác định giới hạn của dãy $x^k$ và của $f(x^k)$, và so với $f^*$.
:::

::: hint Gợi ý 1
Ở (c), chứng minh mọi điểm lặp nằm trên đường chéo $x_1=x_2$. Với $x=(s,s)$, điểm thử $x-tg$ thuộc miền khi và chỉ khi $t<\tfrac12(1-\tfrac1s)$.
:::

::: hint Gợi ý 2
Ở (c), dãy $s_k$ giảm và bị chặn dưới bởi $1$. Giả sử giới hạn $\bar s>1$, rồi chặn dưới bước được nhận bằng một hằng số dương để đi đến mâu thuẫn.
:::

::: solution Lời giải Bài tập 04.20
**Câu (a).** Với $x\in\operatorname{dom}f$, $f(x)>1+x_2^2\ge1$, và $f(1+\tfrac1k,0)=(1+\tfrac1k)^2\to1$. Vậy $f^*=1$, không đạt được vì điểm $(1,0)$ không thuộc miền.

**Câu (b).** $f(x^0)=8$, nên $S=\{x\mid x_1>1,\ x_1^2+x_2^2\le8\}$ là phần hình tròn bán kính $2\sqrt2$ nằm bên phải đường thẳng $x_1=1$, không chứa đoạn thẳng trên đường đó. Các điểm $(1+\tfrac1k,1)\in S$ hội tụ tới $(1,1)\notin S$, nên $S$ không đóng. Vì $\nabla^2f=2I$, $f$ lồi mạnh trên $S$ với $\mu=2$, và gradient Lipschitz với $L=2$.

**Câu (c).** Tại $x=(s,s)^T$, $g=(2s,2s)^T$, nên $x-tg=(s(1-2t),s(1-2t))^T$: các điểm lặp nằm trên đường chéo. Điểm thử thuộc miền khi và chỉ khi $s(1-2t)>1$, tức $t<\bar t(s)=\tfrac12(1-\tfrac1s)<\tfrac12$. Với $t<\tfrac12$, điều kiện (5.2) là $2s^2(1-2t)^2\le2s^2-8\alpha ts^2$, tức $4t^2\le4t(1-\alpha)$; điều này đúng vì $t<\tfrac12\le1-\alpha$. Vậy quay lui (Định nghĩa 04.10) trả về $t_k=\beta^j$, lũy thừa lớn nhất của $\beta$ nằm dưới $\bar t(s_k)$. Vì $\bar t(s_k)<1$, ta có $j\ge1$ và $\beta^{j-1}\ge\bar t(s_k)$, nên $\beta\bar t(s_k)\le t_k<\bar t(s_k)$, và $s_{k+1}=s_k(1-2t_k)$.

Dãy $s_k$ giảm, $s_k>1$, nên hội tụ tới $\bar s\ge1$. Nếu $\bar s>1$ thì $\bar t(s_k)\ge\bar t(\bar s)>0$, nên $t_k\ge\beta\bar t(\bar s)$ và $s_{k+1}\le(1-2\beta\bar t(\bar s))s_k$; khi đó $s_k\to0$, mâu thuẫn với $s_k>1$. Vậy $x^k\to(1,1)$, một điểm ngoài miền, và $f(x^k)=2s_k^2\to2>f^*=1$.

Hàm $f$ lồi mạnh và có gradient Lipschitz, nhưng miền khác $\mathbb R^n$ và tập mức dưới không đóng. Định lý 04.23, 04.25, 04.27 giả thiết $\operatorname{dom}f=\mathbb R^n$ (giả thiết (T3)), nên không áp dụng.

**Kiểm tra lại.** Với $\alpha=0{,}1$, $\beta=\tfrac12$: $\bar t(2)=\tfrac14$, nên $t_0=\tfrac18$ và $x^1=(1{,}5;\,1{,}5)^T$, $f(x^1)=4{,}5\le8-0{,}1\cdot\tfrac18\cdot32=7{,}6$. Chạy tiếp $60$ vòng lặp cho $x^k\approx(1,1)$ và $f(x^k)\approx2$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; tính hướng Newton bằng phân rã Cholesky, không lập $H^{-1}$.

::: exercise Bài tập 04.21 (Phân rã Cholesky cho hệ Newton; Kupferschmid, Bài 13.5.4(a), (b), tr. 445)
Xét hệ (6.1), $Hd=-g$, với
$$
\begin{gathered}
H=\begin{bmatrix}4&-1&1\\-1&\tfrac{17}4&\tfrac{11}4\\1&\tfrac{11}4&\tfrac72\end{bmatrix},\\
g=\begin{bmatrix}1\\2\\3\end{bmatrix}.
\end{gathered}
$$

- **(a)** Chứng minh $H=R^TR$ với
$$
R=\begin{bmatrix}2&-\tfrac12&\tfrac12\\0&2&\tfrac32\\0&0&1\end{bmatrix}.
$$
- **(b)** Tính $d$ bằng tay qua hai lần thế: giải $R^Ty=-g$ bằng thế xuôi (forward substitution), rồi $Rd=y$ bằng thế ngược (back substitution). Tính $\delta^2=-g^Td$.
:::

::: hint Gợi ý 1
Phần tử $(i,j)$ của $R^TR$ là tích vô hướng của cột $i$ và cột $j$ của $R$.
:::

::: hint Gợi ý 2
$R^T$ là ma trận tam giác dưới, nên phương trình đầu của $R^Ty=-g$ chỉ chứa $y_1$; $R$ là tam giác trên, nên phương trình cuối của $Rd=y$ chỉ chứa $d_3$.
:::

::: solution Lời giải Bài tập 04.21
**Câu (a).** Các cột của $R$ là $c_1=(2,0,0)^T$, $c_2=(-\tfrac12,2,0)^T$, $c_3=(\tfrac12,\tfrac32,1)^T$.

- $c_1^Tc_1=4$, $c_1^Tc_2=-1$, $c_1^Tc_3=1$.
- $c_2^Tc_2=\tfrac14+4=\tfrac{17}4$, $c_2^Tc_3=-\tfrac14+3=\tfrac{11}4$.
- $c_3^Tc_3=\tfrac14+\tfrac94+1=\tfrac72$.

Các số này trùng các phần tử của $H$, nên $H=R^TR$. Vì $R$ tam giác trên với đường chéo dương, $R$ khả nghịch và $x^THx=\lVert Rx\rVert_2^2>0$ với $x\ne0$, tức $H\succ0$; $H=R^TR$ là phân rã Cholesky của $H$.

**Câu (b).** *Thế xuôi*, $R^Ty=-g$:
$$
\begin{aligned}
2y_1&=-1,\\
-\tfrac12y_1+2y_2&=-2,\\
\tfrac12y_1+\tfrac32y_2+y_3&=-3,
\end{aligned}
$$
cho $y_1=-\tfrac12$, $y_2=\tfrac12(-2-\tfrac14)=-\tfrac98$, $y_3=-3+\tfrac14+\tfrac{27}{16}=-\tfrac{17}{16}$.

*Thế ngược*, $Rd=y$:
$$
\begin{aligned}
d_3&=-\tfrac{17}{16},\\
2d_2+\tfrac32d_3&=-\tfrac98,\\
2d_1-\tfrac12d_2+\tfrac12d_3&=-\tfrac12,
\end{aligned}
$$
cho $d_2=\tfrac12\bigl(-\tfrac98+\tfrac{51}{32}\bigr)=\tfrac{15}{64}$ và $d_1=\tfrac12\bigl(-\tfrac12+\tfrac{15}{128}+\tfrac{17}{32}\bigr)=\tfrac{19}{256}$. Vậy $d=(\tfrac{19}{256},\tfrac{15}{64},-\tfrac{17}{16})^T$ và
$$
\begin{aligned}
\delta^2&=-g^Td\\
&=-\tfrac{19}{256}-\tfrac{120}{256}+\tfrac{816}{256}\\
&=\tfrac{677}{256}\approx2{,}645 .
\end{aligned}
$$
Hai lần thế tốn cấp $n^2$ phép tính, và $H^{-1}$ không được lập (Thuật toán 04.34, bước 2).

**Kiểm tra lại.** Hàng đầu của $Hd$: $4\cdot\tfrac{19}{256}-\tfrac{60}{256}-\tfrac{272}{256}=-1=-g_1$. Hàng hai: $-\tfrac{19}{256}+\tfrac{17}4\cdot\tfrac{60}{256}-\tfrac{11}4\cdot\tfrac{272}{256}=\tfrac{-76+1020-2992}{1024}=-2=-g_2$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3, 4; quan sát hội tụ bậc hai cục bộ và sự phân kỳ của bước Newton đầy đủ.

::: exercise Bài tập 04.22 (Newton bước đầy đủ trên $\log(e^x+e^{-x})$; Boyd và Vandenberghe, Bài 9.10(a), tr. 515)
Hàm $f(x)=\log(e^x+e^{-x})$ trên $\mathbb R$ có điểm cực tiểu duy nhất $x^*=0$, với $f^*=\log2$.

- **(a)** Chứng minh $f'(x)=\tanh x$, $f''(x)=1/\cosh^2x$, và bước Newton đầy đủ là $x^+=x-\tfrac12\sinh2x$.
- **(b)** Chạy phương pháp Newton với bước cố định $t=1$ từ $x^0=1$ và từ $x^0=1{,}1$, mỗi lần năm bước. Lập bảng $x^k$ và $f(x^k)-f^*$.
- **(c)** Phác họa $f$ và $f'$, đánh dấu các điểm lặp đầu, và giải thích hai hành vi bằng Định lý 04.36 và độ cong $f''$.
:::

::: hint Gợi ý 1
Viết $f'$ và $f''$ theo $\tanh$ và $\cosh$; dùng $\sinh2x=2\sinh x\cosh x$.
:::

::: hint Gợi ý 2
Ở (c), $f''(x)\to0$ khi $\lvert x\rvert\to\infty$: hằng số $\mu$ của Định lý 04.36 nhỏ dần khi hình cầu quanh $x^*$ lớn dần.
:::

::: solution Lời giải Bài tập 04.22
**Câu (a).** $f'(x)=\frac{e^x-e^{-x}}{e^x+e^{-x}}=\tanh x$ và $f''(x)=1-\tanh^2x=1/\cosh^2x>0$. Hướng Newton là $d=-f'/f''=-\tanh x\cosh^2x=-\sinh x\cosh x=-\tfrac12\sinh2x$ (Định nghĩa 04.29).

**Câu (b).** Theo công thức ở (a):

| $k$ | $x^k$ (từ $1$) | $f(x^k)-f^*$ | $x^k$ (từ $1{,}1$) | $f(x^k)-f^*$ |
|---|---|---|---|---|
| 0 | $1$ | $0{,}4338$ | $1{,}1$ | $0{,}5119$ |
| 1 | $-0{,}8134$ | $0{,}2997$ | $-1{,}129$ | $0{,}5349$ |
| 2 | $0{,}4094$ | $0{,}0816$ | $1{,}234$ | $0{,}6223$ |
| 3 | $-0{,}0473$ | $1{,}12\cdot10^{-3}$ | $-1{,}695$ | $1{,}035$ |
| 4 | $7{,}06\cdot10^{-5}$ | $2{,}49\cdot10^{-9}$ | $5{,}715$ | $5{,}022$ |
| 5 | $-2{,}35\cdot10^{-13}$ | $2{,}8\cdot10^{-26}$ | $-2{,}302\cdot10^4$ | $2{,}302\cdot10^4$ |

Từ $x^0=1$, dãy đổi dấu và hội tụ về $0$; gần $0$, $x^+=x-\tfrac12\sinh2x=-\tfrac23x^3+O(x^5)$, nên $\lvert x^{k+1}\rvert\approx\tfrac23\lvert x^k\rvert^3$ (ví dụ $\tfrac23\lvert x^2\rvert^3=\tfrac23\cdot0{,}4094^3\approx0{,}0457$, so với giá trị $0{,}0473$ ở dòng $k=3$ của bảng). Từ $x^0=1{,}1$, $\lvert x^k\rvert$ tăng và dãy phân kỳ.

**Câu (c).** Đồ thị $f$ gần $\lvert x\rvert-\log2$ khi $\lvert x\rvert$ lớn, $f'$ là đường $\tanh$ bị chặn trong $(-1,1)$.

Định lý 04.36 chỉ bảo đảm hội tụ trong một hình cầu quanh $x^*$ mà trên đó $f''\ge\mu>0$ và điểm đầu đủ gần. Vì $f''(x)=1/\cosh^2x$ giảm nhanh khi $\lvert x\rvert$ tăng, mô hình bậc hai tại $x$ xa gốc có độ cong nhỏ, nên bước $-f'/f''$ dài và vượt qua $x^*$ sang phía bên kia, xa hơn điểm cũ. Bước $x\mapsto-x$ xảy ra khi $\tfrac12\sinh2x=2x$, tức $x\approx1{,}0887$; hai điểm đầu $1$ và $1{,}1$ nằm hai bên ngưỡng này.

Với quay lui, Thuật toán 04.34 hội tụ từ mọi điểm đầu theo Định lý 04.37: tập mức dưới $\{x\mid f(x)\le f(x^0)\}=[-\lvert x^0\rvert,\lvert x^0\rvert]$ đóng, trên đó $1/\cosh^2x^0\le f''\le1$, và $f'''=-2\tanh x/\cosh^2x$ bị chặn nên $f''$ Lipschitz.

**Kiểm tra lại.** $\tfrac12\sinh2=1{,}8134$, nên $x^1=1-1{,}8134=-0{,}8134$; $f(1)-\log2=\log(e+e^{-1})-\log2=1{,}1269-0{,}6931=0{,}4338$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3, 4; chặn số lần co của quay lui cho một hướng giảm bất kỳ.

::: exercise Bài tập 04.23 (Quay lui khi Hessian bị chặn trên; Boyd và Vandenberghe, Bài 9.5, tr. 514)
Cho $f$ lớp $C^2$ trên $\mathbb R^n$ với $\mu I\preceq\nabla^2f(x)\preceq LI$ với mọi $x$, và $d$ là một hướng giảm tại $x$, tức $g^Td<0$. Xét quay lui Armijo (Định nghĩa 04.10) với $\alpha\in(0,\tfrac12]$ và $\beta\in(0,1)$.

- **(a)** Chứng minh mọi $t$ thỏa
$$
0<t\le t_0=-\frac{g^Td}{L\lVert d\rVert_2^2}
$$
đều thỏa (5.2).
- **(b)** Suy ra một cận trên của số lần co $t\leftarrow\beta t$.
:::

::: hint Gợi ý 1
Theo Nhận xét 04.20, $0\preceq\mu I\preceq\nabla^2f\preceq LI$ cho gradient $L$-Lipschitz; áp dụng Bổ đề 04.19 với $y=x+td$.
:::

::: hint Gợi ý 2
Ở (b), quay lui dừng muộn nhất ở lần thử đầu tiên có $\beta^j\le t_0$.
:::

::: solution Lời giải Bài tập 04.23
**Câu (a).** Theo Nhận xét 04.20 và Bổ đề 04.19 với $y=x+td$,
$$
\begin{aligned}
&f(x+td)\\
&\quad\le f(x)+t\,g^Td+\frac L2t^2\lVert d\rVert_2^2 .
\end{aligned}
$$
Do đó (5.2) đúng khi $t\,g^Td+\tfrac L2t^2\lVert d\rVert_2^2\le\alpha t\,g^Td$. Chia cho $t>0$, điều kiện này là
$$
t\le\frac{2(1-\alpha)\,(-g^Td)}{L\lVert d\rVert_2^2}.
$$
Vì $\alpha\le\tfrac12$, $2(1-\alpha)\ge1$, nên vế phải không nhỏ hơn $t_0$, và mọi $t\in(0,t_0]$ thỏa (5.2).

**Câu (b).** Quay lui thử $t=1,\beta,\beta^2,\ldots$ và dừng ở lần thử đầu tiên thỏa (5.2). Nếu $t_0\ge1$ thì $t=1$ được nhận ngay, không co lần nào. Nếu $t_0<1$, theo (a) lần thử $\beta^j$ được nhận khi $\beta^j\le t_0$, tức $j\ge\log(1/t_0)/\log(1/\beta)$. Vậy số lần co không vượt
$$
\max\Bigl\{0,\ \Bigl\lceil\frac{\log(1/t_0)}{\log(1/\beta)}\Bigr\rceil\Bigr\}.
$$
Với $d=-g$, $t_0=\tfrac1L$, và kết quả này trùng phần đầu của Bổ đề 04.24. Lập luận dùng $0\preceq\nabla^2f\preceq LI$; giá trị của $\mu$ không vào cận.

**Kiểm tra lại.** Với $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$, $d=-g=(-6,-28)^T$, $L=7$: $t_0=\tfrac{820}{7\cdot820}=\tfrac17$; với $\beta=\tfrac12$, cận là $\lceil\log7/\log2\rceil=\lceil2{,}81\rceil=3$. Với $\alpha=0{,}1$, lần thử $t=\tfrac14$ (sau hai lần co) cho $f(\tfrac12,-3)=31{,}875\le62-0{,}1\cdot\tfrac14\cdot820=41{,}5$, khớp cận.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 4; đọc hằng số trong cận số bước Newton cho hàm tự điều chỉnh.

::: exercise Bài tập 04.24 (Tham số quay lui tối ưu cho cận số bước Newton; Boyd và Vandenberghe, Bài 9.21, tr. 517)
Định lý 04.57 chặn số bước của Thuật toán 04.34 trên một hàm tự điều chỉnh lồi chặt bởi
$$
\begin{aligned}
&c(\alpha,\beta)\bigl(f(x^0)-f^*\bigr)\\
&\quad+\log_2\log_2\frac1\varepsilon,\\
&c(\alpha,\beta)=\frac{20-8\alpha}{\alpha\beta(1-2\alpha)^2},
\end{aligned}
$$
với $\alpha\in(0,\tfrac12)$ và $\beta\in(0,1)$. Tìm $\inf\{c(\alpha,\beta)\mid\alpha\in(0,\tfrac12),\ \beta\in(0,1)\}$ và xác định giá trị đó có đạt được hay không.
:::

::: hint Gợi ý 1
Với $\alpha$ cố định, xét $c$ như hàm của $\beta$.
:::

::: hint Gợi ý 2
Cực tiểu hóa theo $\alpha\in(0,\tfrac12)$ logarit của $\beta\,c(\alpha,\beta)$, một biểu thức không chứa $\beta$.
:::

::: solution Lời giải Bài tập 04.24
**Theo $\beta$.** Với $\alpha$ cố định, $c(\alpha,\beta)=\bar c(\alpha)/\beta$, với $\bar c(\alpha)=\frac{20-8\alpha}{\alpha(1-2\alpha)^2}$, giảm khi $\beta$ tăng và tiến tới $\bar c(\alpha)$ khi $\beta\to1^-$. Vì $\beta<1$, giá trị $\bar c(\alpha)$ không đạt được.

**Theo $\alpha$.** $\bar c(\alpha)\to+\infty$ khi $\alpha\to0^+$ và khi $\alpha\to\tfrac12^-$. Điểm dừng của $\log \bar c$ thỏa
$$
-\frac8{20-8\alpha}-\frac1\alpha+\frac4{1-2\alpha}=0 .
$$
Nhân với $\alpha(20-8\alpha)(1-2\alpha)$ và rút gọn được $-32\alpha^2+120\alpha-20=0$, tức $8\alpha^2-30\alpha+5=0$. Nghiệm trong $(0,\tfrac12)$ là
$$
\alpha^*=\frac{30-\sqrt{740}}{16}\approx0{,}1748,
$$
với $\bar c(\alpha^*)\approx251{,}6$.

**Kết luận.** Cận dưới đúng của $c$ là khoảng $251{,}6$, không đạt được; khi $\alpha=0{,}1748$ và $\beta$ gần $1$, cận của Định lý 04.57 gần $252\bigl(f(x^0)-f^*\bigr)+\log_2\log_2(1/\varepsilon)$.

**Kiểm tra lại.** $\bar c(0{,}1748)=\frac{20-1{,}3984}{0{,}1748\cdot0{,}6504^2}\approx\frac{18{,}602}{0{,}07394}\approx251{,}6$; $\bar c(0{,}15)\approx255{,}8$ và $\bar c(0{,}2)\approx255{,}6$ đều lớn hơn.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 5, 1; nối tính khả nghịch của ma trận khối với độ cong trên $\ker A$.

::: exercise Bài tập 04.25 (Bốn điều kiện tương đương với ma trận khối khả nghịch; Boyd và Vandenberghe, Bài 10.1(a), tr. 557)
Cho $H\in\mathbb R^{n\times n}$ đối xứng, $H\succeq0$, $A\in\mathbb R^{p\times n}$ có hạng $p<n$, và $Z\in\mathbb R^{n\times(n-p)}$ có các cột là một cơ sở của $\ker A$. Chứng minh mỗi điều kiện sau tương đương với tính khả nghịch của ma trận $K=\begin{bmatrix}H&A^T\\A&0\end{bmatrix}$:

- **(i)** $\ker H\cap\ker A=\{0\}$;
- **(ii)** $Ad=0$, $d\ne0$ kéo theo $d^THd>0$;
- **(iii)** $Z^THZ\succ0$;
- **(iv)** $H+A^TQA\succ0$ với một ma trận đối xứng $Q\succeq0$ nào đó.
:::

::: hint Gợi ý 1
Chiều (ii) $\Rightarrow$ $K$ khả nghịch là Định lý 04.41(a). Với chiều ngược, tìm một vector khác $0$ trong nhân của $K$ khi (i) sai.
:::

::: hint Gợi ý 2
Với $H\succeq0$, viết $H$ theo phân rã trị riêng (Định lý 00.16) để chứng minh $d^THd=0$ kéo theo $Hd=0$.
:::

::: solution Lời giải Bài tập 04.25
Ta chứng minh (ii) $\Rightarrow$ $K$ khả nghịch $\Rightarrow$ (i) $\Rightarrow$ (ii), rồi (ii) $\Leftrightarrow$ (iii) và (ii) $\Leftrightarrow$ (iv).

**(ii) $\Rightarrow$ $K$ khả nghịch.** Đây là Định lý 04.41(a): giả thiết độ cong của định lý đúng là (ii), và $A$ đủ hạng hàng.

**$K$ khả nghịch $\Rightarrow$ (i).** Nếu có $d\ne0$ với $Hd=0$ và $Ad=0$ thì $K\begin{bmatrix}d\\0\end{bmatrix}=\begin{bmatrix}Hd\\Ad\end{bmatrix}=0$ với vector khác $0$, nên $K$ suy biến.

**(i) $\Rightarrow$ (ii).** Giả sử $Ad=0$, $d\ne0$ và $d^THd=0$. Theo Định lý 00.16, $H=\sum_i\lambda_iq_iq_i^T$ với $q_i$ trực chuẩn và $\lambda_i\ge0$ vì $H\succeq0$. Khi đó $0=d^THd=\sum_i\lambda_i(q_i^Td)^2$, nên $\lambda_i(q_i^Td)=0$ với mọi $i$, và $Hd=\sum_i\lambda_i(q_i^Td)q_i=0$. Vậy $d\in\ker H\cap\ker A$, trái với (i).

**(ii) $\Leftrightarrow$ (iii).** Mỗi $d\in\ker A$ viết duy nhất $d=Zw$, và $d\ne0$ khi và chỉ khi $w\ne0$, vì các cột của $Z$ độc lập tuyến tính (Mệnh đề 04.43(a)). Khi đó $d^THd=w^TZ^THZw$, nên (ii) chính là $w^TZ^THZw>0$ với mọi $w\ne0$.

**(ii) $\Rightarrow$ (iv).** Chọn $Q=I$. Với $d\ne0$: nếu $Ad=0$ thì $d^T(H+A^TA)d=d^THd>0$ theo (ii); nếu $Ad\ne0$ thì $d^T(H+A^TA)d=d^THd+\lVert Ad\rVert_2^2\ge\lVert Ad\rVert_2^2>0$.

**(iv) $\Rightarrow$ (ii).** Với $Ad=0$, $d\ne0$: $d^THd=d^T(H+A^TQA)d>0$.

**Kiểm tra lại.**

- $H=\operatorname{diag}(1,0)$, $A=[0\ \ 1]$: $\ker H$ sinh bởi $(0,1)$, $\ker A$ sinh bởi $(1,0)$, giao bằng $\{0\}$; $K=\begin{bmatrix}1&0&0\\0&0&1\\0&1&0\end{bmatrix}$ có định thức $-1\ne0$.
- $H=\operatorname{diag}(1,0)$, $A=[1\ \ 0]$: $\ker H=\ker A$ sinh bởi $(0,1)$, và hàng thứ hai của $K=\begin{bmatrix}1&0&1\\0&0&0\\1&0&0\end{bmatrix}$ bằng $0$, nên $K$ suy biến.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 2, 5; nhận ra hướng chiếu của gradient lên $\ker A$ là hạ gradient trên hàm rút gọn.

::: exercise Bài tập 04.26 (Phương pháp gradient chiếu; Boyd và Vandenberghe, Bài 10.2, tr. 557)
Cho $F$ lồi, lớp $C^2$, $u\in\operatorname{dom}F$ thỏa $Au=b$, với $A\in\mathbb R^{p\times n}$ hạng $p<n$, và $g=\nabla F(u)$. Hình chiếu Euclid của $-g$ lên $\ker A$ là
$$
d_{\mathrm{pg}}=\operatorname*{argmin}_{Av=0}\lVert-g-v\rVert_2 .
$$

- **(a)** Gọi $(v,w)$ là nghiệm duy nhất của
$$
\begin{bmatrix}I&A^T\\A&0\end{bmatrix}\begin{bmatrix}v\\w\end{bmatrix}=\begin{bmatrix}-g\\0\end{bmatrix}.
$$
Chứng minh $v=d_{\mathrm{pg}}$ và $w=\operatorname{argmin}_y\lVert g+A^Ty\rVert_2$.
- **(b)** Giả sử các cột của $Z$ trực chuẩn, $Z^TZ=I$, và $\psi(z)=F(\hat u+Zz)$ là hàm rút gọn của Mệnh đề 04.43, với $u=\hat u+Zz$. Nêu quan hệ giữa $d_{\mathrm{pg}}$ và $-\nabla\psi(z)$.
- **(c)** *Phương pháp gradient chiếu* (projected gradient method) dùng hướng $d_{\mathrm{pg}}$ và quay lui Armijo trên $F$, xuất phát từ $u^0\in\operatorname{dom}F$ với $Au^0=b$. Dùng (b) để nêu điều kiện đủ cho phương pháp hội tụ tới nghiệm.
:::

::: hint Gợi ý 1
Ở (a), $\tfrac12\lVert-g-v\rVert_2^2$ là hàm bậc hai lồi chặt theo $v$ với ràng buộc $Av=0$; viết hệ (1.2) của nó. Với $w$, dùng tính trực giao của $\ker A$ và $\operatorname{Col}(A^T)$ (Mệnh đề 00.8).
:::

::: hint Gợi ý 2
Ở (b), theo quy tắc dây chuyền, $\nabla\psi(z)=Z^Tg$; hình chiếu trực giao lên $\ker A$ là $ZZ^T$ khi $Z^TZ=I$.
:::

::: solution Lời giải Bài tập 04.26
**Câu (a).** Bài toán $\min_v\tfrac12\lVert v+g\rVert_2^2$ với $Av=0$ có mục tiêu lồi, khả vi, nên theo Mệnh đề 04.2(b), $v$ là nghiệm khi và chỉ khi có $w$ với $v+g+A^Tw=0$ và $Av=0$. Đây đúng là hệ đã cho. Mục tiêu lồi chặt, nên nghiệm duy nhất (Định lý 01.34), và $v=d_{\mathrm{pg}}$.

Từ hàng đầu, $g+A^Tw=-v$ với $v\in\ker A$. Với mọi $y$, $g+A^Ty=-v+A^T(y-w)$, và $A^T(y-w)\in\operatorname{Col}(A^T)$ trực giao với $v$ (Mệnh đề 00.8), nên
$$
\begin{aligned}
&\lVert g+A^Ty\rVert_2^2\\
&\quad=\lVert v\rVert_2^2+\lVert A^T(y-w)\rVert_2^2\\
&\quad\ge\lVert g+A^Tw\rVert_2^2 .
\end{aligned}
$$
Vậy $w$ cực tiểu hóa $\lVert g+A^Ty\rVert_2$; nghiệm duy nhất vì $A^T(y-w)=0$ kéo theo $y=w$.

**Câu (b).** Khi $Z^TZ=I$, ma trận $ZZ^T$ là phép chiếu trực giao lên $\ker A$: với $v=Z\xi\in\ker A$, $ZZ^Tv=Z(Z^TZ)\xi=v$; với $v$ trực giao với $\ker A$, $Z^Tv=0$. Viết $-g=v_1+v_2$ với $v_1\in\ker A$, $v_2\perp\ker A$, thì $ZZ^T(-g)=v_1$. Theo (a), $-g=d_{\mathrm{pg}}+A^Tw$ với $d_{\mathrm{pg}}\in\ker A$ và $A^Tw\perp\ker A$; theo tính duy nhất của phân tích này (Mệnh đề 00.8), $d_{\mathrm{pg}}=v_1=-ZZ^Tg$. Theo quy tắc dây chuyền, $\nabla\psi(z)=Z^T\nabla F(\hat u+Zz)=Z^Tg$. Vậy
$$
d_{\mathrm{pg}}=Z\bigl(-\nabla\psi(z)\bigr):
$$
hướng chiếu là ảnh qua $Z$ của hướng ngược gradient của $\psi$.

**Câu (c).** Theo (b), $u+td_{\mathrm{pg}}=\hat u+Z\bigl(z-t\nabla\psi(z)\bigr)$ và $F(u+td_{\mathrm{pg}})=\psi(z-t\nabla\psi(z))$. Ngoài ra $g^Td_{\mathrm{pg}}=-\lVert Z^Tg\rVert_2^2=-\lVert\nabla\psi(z)\rVert_2^2$, nên điều kiện (5.2) trên $F$ trùng điều kiện (5.2) của hạ gradient trên $\psi$. Phương pháp gradient chiếu là Thuật toán 04.13 chạy trên $\psi$. Do đó nó hội tụ khi $\psi$ thỏa giả thiết của một định lý hội tụ cho hạ gradient. Ví dụ: $\operatorname{dom}F=\mathbb R^n$, $F$ có điểm cực tiểu trên tập khả thi và $\nabla^2F\preceq LI$. Khi đó $\nabla^2\psi=Z^T\nabla^2FZ$ thỏa $\xi^T\nabla^2\psi\,\xi\le L\lVert Z\xi\rVert_2^2=L\lVert\xi\rVert_2^2$ vì $Z^TZ=I$, nên $\nabla\psi$ là $L$-Lipschitz (Nhận xét 04.20), và với quay lui $\alpha=\tfrac12$, Định lý 04.25 cho $F(u^k)-F^*=O(1/k)$. Nếu thêm $\nabla^2F\succeq\mu I$ thì tương tự $\nabla^2\psi\succeq\mu I$; khi thay quay lui bằng bước cố định $\tfrac1L$, Định lý 04.27 cho hội tụ tuyến tính.

**Kiểm tra lại.** Với $A=[1\ \ 1]$ và $g=(1,3)^T$: hệ cho $v_1+w=-1$, $v_2+w=-3$, $v_1+v_2=0$, nên $w=-2$, $v=(1,-1)^T$. Với $Z=\tfrac1{\sqrt2}(1,-1)^T$: $-ZZ^Tg=-\tfrac12(1-3)(1,-1)^T=(1,-1)^T$. Và $\lVert g+yA^T\rVert_2^2=(1+y)^2+(3+y)^2$ nhỏ nhất tại $y=-2$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 5; so sánh hướng Newton khả thi khi cộng vào mục tiêu một số hạng triệt tiêu trên tập khả thi.

::: exercise Bài tập 04.27 (Số hạng bậc hai của ràng buộc trong mục tiêu; Boyd và Vandenberghe, Bài 10.5, tr. 558)
Cho ma trận đối xứng $Q\in\mathbb R^{p\times p}$, $Q\succeq0$. Bài toán
$$
\begin{aligned}
&\min\ G(u)=F(u)\\
&\qquad+(Au-b)^TQ(Au-b)\\
&\text{với}\quad Au=b
\end{aligned}
$$
có cùng tập khả thi và cùng mục tiêu trên tập khả thi với bài toán có đẳng thức của Định nghĩa 04.1, trong đó $F$ lồi, lớp $C^2$. Tại một điểm khả thi $u$ mà $\nabla^2F(u)$ xác định dương trên $\ker A$, so sánh hướng Newton khả thi (Định nghĩa 04.40) của hai bài toán.
:::

::: hint Gợi ý 1
Tính $\nabla G$ và $\nabla^2G$, rồi dùng $Au=b$.
:::

::: hint Gợi ý 2
Thay vào hệ (7.1) và dùng hàng thứ hai $Ad=0$ để rút gọn hàng đầu.
:::

::: solution Lời giải Bài tập 04.27
Đặt $g=\nabla F(u)$, $H=\nabla^2F(u)$. Ta có
$$
\begin{aligned}
\nabla G(u)&=g+2A^TQ(Au-b),\\
\nabla^2G(u)&=H+2A^TQA .
\end{aligned}
$$
Tại $u$ khả thi, $Au-b=0$, nên $\nabla G(u)=g$. Hệ (7.1) của bài toán mới là
$$
\begin{aligned}
(H+2A^TQA)d+A^T\eta&=-g,\\
Ad&=0 .
\end{aligned}
$$
Hàng thứ hai cho $A^TQAd=0$, nên hàng đầu trở thành $Hd+A^T\eta=-g$: hệ trùng hệ (7.1) của bài toán gốc. Ma trận $\nabla^2G(u)$ cũng xác định dương trên $\ker A$, vì $d^T\nabla^2G(u)d=d^THd$ khi $Ad=0$. Theo Định lý 04.41(a), cả hai hệ có nghiệm duy nhất, nên hai bài toán có cùng hướng Newton khả thi $d$ và cùng $\eta$.

Số hạng thêm vào chỉ đổi Hessian ngoài $\ker A$. Vì $F$ lồi, $H\succeq0$; theo Bài tập 04.25 (chiều (ii) $\Rightarrow$ (iv) với ma trận $I$), $Q=\tfrac12I$ cho $H+2A^TQA=H+A^TA\succ0$, dù $H$ có thể suy biến.

**Kiểm tra lại.** Với $F(u)=\tfrac12(2u_1^2+5u_2^2)$, $A=[1\ \ 1]$, $b=14$, $u=(8,6)^T$, $Q=1$: $g=(16,30)^T$. Hệ gốc $2d_1+\eta=-16$, $5d_2+\eta=-30$, $d_1+d_2=0$ cho $d=(2,-2)^T$, $\eta=-20$. Hệ mới $4d_1+2d_2+\eta=-16$, $2d_1+7d_2+\eta=-30$, $d_1+d_2=0$ cũng cho $d=(2,-2)^T$, $\eta=-20$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 6; kiểm tra tính tự điều chỉnh trực tiếp và qua các phép bảo toàn.

::: exercise Bài tập 04.28 (Hàm nghịch đảo và hàm chắn nghịch đảo; Boyd và Vandenberghe, Bài 9.13, tr. 516)

- **(a)** Chứng minh $f(x)=1/x$ với miền $(0,\tfrac89)$ tự điều chỉnh.
- **(b)** Cho $a_i\in\mathbb R^n$, $b_i\in\mathbb R$, $i=1,\ldots,m$, tập $D=\{x\in\mathbb R^n\mid a_i^Tx<b_i,\ i=1,\ldots,m\}$ khác rỗng và bị chặn, và
$$
\begin{aligned}
f(x)&=c\sum_{i=1}^m\frac1{b_i-a_i^Tx},\\
\operatorname{dom}f&=D .
\end{aligned}
$$
Chứng minh $f$ tự điều chỉnh nếu
$$
c>\frac98\max_{i}\sup_{x\in D}\bigl(b_i-a_i^Tx\bigr).
$$
:::

::: hint Gợi ý 1
Ở (a), so $\lvert f'''\rvert$ với $2f''^{3/2}$ theo Định nghĩa 04.51 với $n=1$.
:::

::: hint Gợi ý 2
Ở (b), lặp lại phép tính của (a) cho $h(y)=c/y$ để tìm miền $(0,y_c)$ trên đó $h$ tự điều chỉnh, rồi dùng Mệnh đề 04.52(b), (c). Hệ số $c$ có thể nhỏ hơn $1$, nên không dùng Mệnh đề 04.52(a).
:::

::: solution Lời giải Bài tập 04.28
**Câu (a).** $f$ lồi, lớp $C^3$ trên khoảng mở $(0,\tfrac89)$, với $f''(x)=2/x^3$, $f'''(x)=-6/x^4$. Điều kiện của Định nghĩa 04.51 là
$$
\frac6{x^4}\le2\Bigl(\frac2{x^3}\Bigr)^{3/2}=\frac{4\sqrt2}{x^{9/2}},
$$
tức $\sqrt x\le\frac{4\sqrt2}6=\frac{2\sqrt2}3$, hay $x\le\tfrac89$. Điều kiện này đúng trên $(0,\tfrac89)$.

**Câu (b).** *Bước 1 (hàm một biến).* Với $h(y)=c/y$, $h''=2c/y^3$, $h'''=-6c/y^4$, điều kiện tự điều chỉnh là $\frac{6c}{y^4}\le2\bigl(\frac{2c}{y^3}\bigr)^{3/2}$, tức $\sqrt y\le\frac{2\sqrt2}3\sqrt c$, hay $y\le\tfrac{8c}9$. Vậy $h$ tự điều chỉnh trên $(0,\tfrac{8c}9)$.

*Bước 2 (từng số hạng).* Đặt $s_i=\sup_{x\in D}(b_i-a_i^Tx)$, hữu hạn vì $D$ bị chặn. Giả thiết cho $\tfrac{8c}9>s_i$, nên với $x\in D$, $0<b_i-a_i^Tx\le s_i<\tfrac{8c}9$. Hàm $x\mapsto c/(b_i-a_i^Tx)$ là $h$ hợp với ánh xạ affine $x\mapsto-a_i^Tx+b_i$; theo Mệnh đề 04.52(c), nó tự điều chỉnh trên $\{x\mid0<b_i-a_i^Tx<\tfrac{8c}9\}$, một tập chứa $D$.

*Bước 3 (tổng).* Theo Mệnh đề 04.52(b), tổng $m$ số hạng tự điều chỉnh trên giao các miền, và giao này chứa $D=\operatorname{dom}f$. Tính tự điều chỉnh là điều kiện trên từng đường thẳng tại các điểm của miền, nên nó còn đúng khi thu hẹp miền về tập mở lồi $D$.

**Kiểm tra lại.** Tại biên $y=\tfrac{8c}9$ với $c=1$: $\tfrac6{y^4}=6\cdot(\tfrac98)^4\approx9{,}611$ và $2\bigl(\tfrac2{y^3}\bigr)^{3/2}=2\bigl(2\cdot(\tfrac98)^3\bigr)^{3/2}\approx9{,}611$: dấu bằng xảy ra. Với $c=\tfrac12$, $y=0{,}44<\tfrac49$ thỏa điều kiện, còn $y=0{,}45>\tfrac49$ thì không.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 6; viết lại điều kiện tự điều chỉnh của hàm một biến và tìm các hàm đạt dấu bằng.

::: exercise Bài tập 04.29 (Hàm tự điều chỉnh một biến; Boyd và Vandenberghe, Bài 9.16, tr. 516)
Cho $f$ tự điều chỉnh trên một khoảng mở $\operatorname{dom}f\subseteq\mathbb R$ (Định nghĩa 04.51 với $n=1$).

- **(a)** Giả sử $f''(x)\ne0$. Chứng minh điều kiện tự điều chỉnh tại $x$ tương đương với
$$
\Bigl\lvert\frac d{dx}\bigl(f''(x)^{-1/2}\bigr)\Bigr\rvert\le1 .
$$
Tìm các hàm $f$ và $\tilde f$ thỏa $\frac d{dx}\bigl(f''(x)^{-1/2}\bigr)=1$ và $\frac d{dx}\bigl(\tilde f''(x)^{-1/2}\bigr)=-1$.
- **(b)** Chứng minh hoặc $f''(x)=0$ với mọi $x\in\operatorname{dom}f$, hoặc $f''(x)>0$ với mọi $x\in\operatorname{dom}f$.
:::

::: hint Gợi ý 1
Ở (a), $f''>0$ vì $f$ lồi và $f''\ne0$; đạo hàm $f''^{-1/2}$ theo quy tắc dây chuyền. Lấy tích phân hai lần cho các hàm đạt dấu bằng.
:::

::: hint Gợi ý 2
Ở (b), giả sử $f''(x_0)>0$ và $f''$ triệt tiêu tại một điểm bên phải $x_0$; xét không điểm gần $x_0$ nhất và dùng (a) để chặn $f''^{-1/2}$ trên khoảng giữa.
:::

::: solution Lời giải Bài tập 04.29
**Câu (a).** Vì $f$ lồi, $f''\ge0$, nên $f''(x)>0$. Theo quy tắc dây chuyền,
$$
\frac d{dx}\bigl(f''^{-1/2}\bigr)=-\tfrac12f'''\,f''^{-3/2},
$$
nên $\bigl\lvert\frac d{dx}(f''^{-1/2})\bigr\rvert\le1$ tương đương $\lvert f'''\rvert\le2f''^{3/2}$, tức điều kiện của Định nghĩa 04.51 với $h=f$.

Nếu $\frac d{dx}(f''^{-1/2})=1$ thì $f''(x)^{-1/2}=x+c_0$ trên miền $x>-c_0$, nên $f''(x)=(x+c_0)^{-2}$ và, tích phân hai lần,
$$
f(x)=-\log(x+c_0)+c_1x+c_2 .
$$
Tương tự, $\tilde f''(x)^{-1/2}=c_0-x$ trên $x<c_0$ cho $\tilde f(x)=-\log(c_0-x)+c_1x+c_2$. Hàm $s-\log s$ của Ví dụ 04.23 thuộc dạng thứ nhất với $c_0=0$, $c_1=1$, $c_2=0$, và tỷ số $\lvert f'''\rvert/f''^{3/2}$ bằng $2$ ở mọi điểm.

**Câu (b).** Giả sử có $x_0$ với $f''(x_0)>0$ và có $x_1\in\operatorname{dom}f$ với $f''(x_1)=0$; xét $x_1>x_0$ (trường hợp $x_1<x_0$ đối xứng). Đặt $\bar x=\inf\{x>x_0\mid f''(x)=0\}$. Vì $f''$ liên tục, $f''(\bar x)=0$, $\bar x>x_0$ và $f''>0$ trên $[x_0,\bar x)$. Trên khoảng này, theo (a), $\theta=f''^{-1/2}$ khả vi với $\lvert\theta'\rvert\le1$, nên
$$
\begin{aligned}
\theta(x)&\le\theta(x_0)+(x-x_0)\\
&\le\theta(x_0)+(\bar x-x_0)
\end{aligned}
$$
với mọi $x\in[x_0,\bar x)$. Nhưng $f''(x)\to0$ khi $x\to\bar x^-$, nên $\theta(x)\to+\infty$, mâu thuẫn. Vậy nếu $f''$ dương tại một điểm thì dương tại mọi điểm; ngược lại $f''\equiv0$.

**Kiểm tra lại.** Với $f(x)=-\log x$ trên $x>0$: $f''^{-1/2}=x$, đạo hàm bằng $1$. Với $f(x)=3x+1$: $f''\equiv0$. Với $f(x)=x^2$: $f''^{-1/2}=\tfrac1{\sqrt2}$, đạo hàm bằng $0$.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 1, 5; chứng minh nghiệm tồn tại trên miền mở và nhận ra một điểm đầu khả thi làm giả thiết tập mức dưới đóng không thỏa.

::: exercise Bài tập 04.30 (Cực đại entropy có ràng buộc đẳng thức; Boyd và Vandenberghe, Bài 10.9(a), (b), tr. 558)
Xét bài toán
$$
\begin{aligned}
&\min\ F(u)=\sum_{i=1}^nu_i\log u_i\\
&\text{với}\quad Au=b,
\end{aligned}
$$
với $\operatorname{dom}F=\{u\in\mathbb R^n\mid u_i>0,\ i=1,\ldots,n\}$, $A\in\mathbb R^{p\times n}$ hạng $p<n$, và có $\tilde u\in\operatorname{dom}F$ với $A\tilde u=b$.

- **(a)** Chứng minh bài toán có nghiệm duy nhất $u^*$.
- **(b)** Với
$$
\begin{gathered}
A=\begin{bmatrix}2&1&0\\1&1&1\end{bmatrix},\\
b=\begin{bmatrix}1\\1\end{bmatrix},\\
u^0=\bigl(\tfrac1{20},\tfrac9{10},\tfrac1{20}\bigr)^T,
\end{gathered}
$$
chứng minh $u^0$ khả thi và tập mức dưới $\{u\in\operatorname{dom}F\mid Au=b,\ F(u)\le F(u^0)\}$ không đóng. Rút ra kết luận về giả thiết "tập mức dưới đóng" của Định lý 04.37 khi áp cho hàm rút gọn $\psi$ của bài toán này với điểm đầu $u^0$.
:::

::: hint Gợi ý 1
Ở (a), mở rộng $F$ liên tục lên $u\ge0$ bằng quy ước $0\log0=0$, dùng Định lý 01.35 trên một tập đóng bị chặn, rồi chứng minh điểm cực tiểu không có tọa độ bằng $0$ bằng đạo hàm theo hướng $\tilde u-u$.
:::

::: hint Gợi ý 2
Ở (b), giải hệ $Au=b$ theo $u_1$ để đưa $F$ về hàm một biến trên $(0,\tfrac12)$.
:::

::: solution Lời giải Bài tập 04.30
**Câu (a).** *Bước 1 (tồn tại trên tập đóng).* Đặt $\bar F(u)=\sum_iu_i\log u_i$ trên $\bar C=\{u\mid u\ge0,\ Au=b\}$, với $0\log0=0$; $\bar F$ liên tục vì $s\log s\to0$ khi $s\to0^+$. Xét $\bar S=\{u\in\bar C\mid\bar F(u)\le F(\tilde u)\}$, khác rỗng và đóng. Vì $s\log s\ge-\tfrac1e$, mọi $u\in\bar S$ có $u_i\log u_i\le F(\tilde u)+\tfrac{n-1}e$ với mỗi $i$, nên các tọa độ bị chặn và $\bar S$ bị chặn. Theo Định lý 01.35, $\bar F$ đạt giá trị nhỏ nhất trên $\bar S$, tại một điểm $\bar u$, và $\bar u$ cũng là điểm cực tiểu của $\bar F$ trên $\bar C$.

*Bước 2 (điểm cực tiểu nằm trong miền).* Giả sử $\bar u_j=0$ với một $j$. Đặt $v=\tilde u-\bar u$, thì $A v=0$ và $\bar u+tv\in\bar C$ với $t\in[0,1]$. Với $t\in(0,1]$, $\bar u+tv=(1-t)\bar u+t\tilde u$ có mọi tọa độ dương, và
$$
\begin{aligned}
&\frac d{dt}\bar F(\bar u+tv)\\
&\quad=\sum_{i=1}^nv_i\bigl(1+\log(\bar u_i+tv_i)\bigr).
\end{aligned}
$$
Với mỗi $i$ có $\bar u_i=0$ (trong đó có $i=j$), $v_i=\tilde u_i>0$ và $v_i\log(tv_i)\to-\infty$ khi $t\to0^+$; các số hạng có $\bar u_i>0$ bị chặn. Do đó đạo hàm tiến tới $-\infty$, nên có $t_1\in(0,1]$ với đạo hàm âm trên $(0,t_1]$. Hàm $t\mapsto\bar F(\bar u+tv)$ liên tục trên $[0,t_1]$ và khả vi trên $(0,t_1)$, nên theo định lý giá trị trung bình, $\bar F(\bar u+t_1v)-\bar F(\bar u)$ bằng $t_1$ nhân đạo hàm tại một điểm trong $(0,t_1)$, tức âm. Điều này trái với tính cực tiểu. Vậy $\bar u_i>0$ với mọi $i$, tức $\bar u\in\operatorname{dom}F$ là một nghiệm.

*Bước 3 (duy nhất).* $\nabla^2F(u)=\operatorname{diag}(1/u_1,\ldots,1/u_n)\succ0$, nên $F$ lồi chặt trên tập khả thi lồi, và nghiệm là duy nhất (Định lý 01.34).

**Câu (b).** $Au^0=(\tfrac2{20}+\tfrac9{10},\ \tfrac1{20}+\tfrac9{10}+\tfrac1{20})^T=(1,1)^T$, nên $u^0$ khả thi. Từ $2u_1+u_2=1$ và $u_1+u_2+u_3=1$: $u_2=1-2u_1$, $u_3=u_1$. Tập khả thi là $\{(s,1-2s,s)\mid0<s<\tfrac12\}$, và trên đó
$$
\begin{aligned}
\theta(s)&=F(s,1-2s,s)\\
&=2s\log s\\
&\quad+(1-2s)\log(1-2s).
\end{aligned}
$$
$\theta$ lồi, $\theta'(s)=2\log\frac s{1-2s}$ triệt tiêu tại $s=\tfrac13$, với $\theta(\tfrac13)=-\log3\approx-1{,}099$. Ta có $\theta(\tfrac1{20})=F(u^0)\approx-0{,}3944$, $\theta(s)\to0$ khi $s\to0^+$ và $\theta(s)\to-\log2\approx-0{,}693$ khi $s\to\tfrac12^-$. Vì $\theta$ lồi và giảm trên $(0,\tfrac13]$, $\theta(s)\le\theta(\tfrac1{20})$ khi và chỉ khi $s\ge\tfrac1{20}$ trên đoạn đó; trên $[\tfrac13,\tfrac12)$, $\theta\le\max\{\theta(\tfrac13),-\log2\}<-0{,}3944$. Vậy tập mức dưới là
$$
\{(s,1-2s,s)\mid\tfrac1{20}\le s<\tfrac12\}.
$$
Dãy $s_k=\tfrac12-\tfrac1k$ cho các điểm của tập này hội tụ tới $(\tfrac12,0,\tfrac12)\notin\operatorname{dom}F$, nên tập không đóng.

Với $\hat u=u^0$ và $Z=(1,-2,1)^T$, hàm rút gọn là $\psi(z)=\theta(\tfrac1{20}+z)$, và tập mức dưới của $\psi$ tại $z^0=0$ là $[0,\tfrac9{20})$, không đóng. Giả thiết "tập mức dưới đóng" của Định lý 04.37 không thỏa với điểm đầu này. Thuật toán 04.44 chạy trên bài toán này là phương pháp Newton trên $\psi$ (Mệnh đề 04.43(d)), nên định lý không cho bảo đảm hội tụ hai pha từ $u^0$, dù bài toán có nghiệm duy nhất $u^*=(\tfrac13,\tfrac13,\tfrac13)$.

**Kiểm tra lại.** $F(u^0)=2\cdot\tfrac1{20}\log\tfrac1{20}+\tfrac9{10}\log\tfrac9{10}\approx-0{,}2996-0{,}0948=-0{,}3944$. Tại $u^*$: $Au^*=(1,1)^T$, $\nabla F(u^*)=(1-\log3)\mathbf 1$, và $\mathbf 1=A^T\nu$ với $\nu=(0,1)^T$, nên $\nabla F(u^*)+A^T\nu^*=0$ với $\nu^*=(0,\log3-1)^T$: hệ (1.2) thỏa.
:::

**Mức độ:** vận dụng. **Mục tiêu:** phương pháp hàm chắn (đọc thêm); tính đường trung tâm của một bài toán một biến và đối chiếu khoảng đối ngẫu với $m/\tau$.

::: exercise Bài tập 04.31 (Đường trung tâm của $\min x^2+1$ với $2\le x\le4$ — đọc thêm; Boyd và Vandenberghe, Bài 11.1, tr. 623)
Xét bài toán
$$
\min\ x^2+1\quad\text{với}\quad2\le x\le4,
$$
có tập khả thi $[2,4]$, điểm cực tiểu $x^*=2$ và $p^*=5$.

- **(a)** Viết hai ràng buộc ở dạng $f_i(x)\le0$, hàm chắn logarit $B$ và điều kiện tâm (9.2). Chứng minh điều kiện tâm tương đương với phương trình bậc ba $2\tau x(x-2)(4-x)+2x-6=0$ trên $(2,4)$, có đúng một nghiệm $x^*(\tau)$.
- **(b)** Tính $x^*(\tau)$ với $\tau=0{,}1;\ 1;\ 10;\ 100$ bằng phương pháp chia đôi (bisection) trên máy tính, tới bốn chữ số thập phân. Phác họa $f_0$ và $\tau f_0+B$ với các giá trị $\tau$ này trên $(2,4)$, đánh dấu $x^*(\tau)$.
- **(c)** Với mỗi $\tau$ ở (b), tính $f_0(x^*(\tau))-p^*$ và so với $m/\tau$ của Mệnh đề 04.60.
:::

::: hint Gợi ý 1
Nhân điều kiện tâm với $(x-2)(4-x)>0$. Vế trái của phương trình bậc ba có dấu khác nhau tại hai đầu khoảng.
:::

::: hint Gợi ý 2
Ở (a), tính đơn điệu của đạo hàm của $\tau f_0+B$ cho tính duy nhất.
:::

::: solution Lời giải Bài tập 04.31
**Câu (a).** $f_1(x)=2-x\le0$, $f_2(x)=x-4\le0$, $m=2$, không có đẳng thức. Hàm chắn là $B(x)=-\log(x-2)-\log(4-x)$ trên $(2,4)$, và điều kiện tâm (9.2) là
$$
2\tau x-\frac1{x-2}+\frac1{4-x}=0 .
$$
Nhân với $(x-2)(4-x)>0$: $2\tau x(x-2)(4-x)-(4-x)+(x-2)=0$, tức $2\tau x(x-2)(4-x)+2x-6=0$.

Hàm $\tau f_0+B$ có đạo hàm bậc hai $2\tau+\frac1{(x-2)^2}+\frac1{(4-x)^2}>0$, nên đạo hàm bậc nhất $2\tau x-\frac1{x-2}+\frac1{4-x}$ tăng ngặt, tiến tới $-\infty$ khi $x\to2^+$ và $+\infty$ khi $x\to4^-$. Vậy điều kiện tâm có đúng một nghiệm $x^*(\tau)\in(2,4)$, và đó là điểm cực tiểu của $\tau f_0+B$.

**Câu (b), (c).** Đặt $q_\tau(x)=2\tau x(x-2)(4-x)+2x-6$. Với $\tau=1$: $q_1(2)=-2<0$, $q_1(3)=6>0$, $q_1(2{,}5)=2{,}75>0$, $q_1(2{,}25)\approx0{,}469>0$, $q_1(2{,}125)\approx-0{,}754<0$, nên nghiệm nằm trong $(2{,}125;\,2{,}25)$; tiếp tục chia đôi tới bốn chữ số. Các giá trị $\tau$ còn lại làm tương tự, cho bảng sau, với $\lambda_1^*=\frac1{\tau(x^*-2)}$, $\lambda_2^*=\frac1{\tau(4-x^*)}$ theo Mệnh đề 04.60:

| $\tau$ | $x^*(\tau)$ | $f_0(x^*(\tau))-p^*$ | $m/\tau$ | $\lambda_1^*$ | $\lambda_2^*$ |
|---|---|---|---|---|---|
| $0{,}1$ | $2{,}7437$ | $3{,}5277$ | $20$ | $13{,}447$ | $7{,}960$ |
| $1$ | $2{,}2016$ | $0{,}8472$ | $2$ | $4{,}959$ | $0{,}556$ |
| $10$ | $2{,}0244$ | $0{,}0982$ | $0{,}2$ | $4{,}099$ | $0{,}051$ |
| $100$ | $2{,}0025$ | $0{,}0100$ | $0{,}02$ | $4{,}010$ | $0{,}005$ |

Đồ thị $\tau f_0+B$ tăng vô hạn ở hai đầu $x=2$ và $x=4$; khi $\tau$ tăng, điểm cực tiểu $x^*(\tau)$ dịch về $x^*=2$. Ở mọi dòng, $f_0(x^*(\tau))-p^*\le m/\tau$, đúng như Mệnh đề 04.60. Khi $\tau\to\infty$, $\lambda_1^*\to4$ và $\lambda_2^*\to0$: điều kiện dừng $2x^*-\lambda_1^*+\lambda_2^*=0$ tại $x^*=2$ cho $\lambda_1^*=4$, và ràng buộc $x\le4$ không hoạt động.

**Kiểm tra lại.** Với $\tau=1$, $x=2{,}2016$: $2x(x-2)(4-x)=2\cdot2{,}2016\cdot0{,}2016\cdot1{,}7984\approx1{,}5964$ và $2x-6=-1{,}5968$, tổng gần $0$. Hàm đối ngẫu $g_{\mathrm d}(\lambda)=\min_x\{x^2+1+\lambda_1(2-x)+\lambda_2(x-4)\}$ đạt tại $x=\tfrac12(\lambda_1-\lambda_2)$; với $(\lambda_1^*,\lambda_2^*)=(4{,}959;\,0{,}556)$, $g_{\mathrm d}\approx3{,}847$ và $f_0(x^*(1))-g_{\mathrm d}\approx5{,}847-3{,}847=2=m/\tau$.
:::

## Tài liệu tham khảo

- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press, mục Exercises của các chương:
  - Chương 9: Bài 9.3 và 9.5 (Unconstrained minimization, tr. 514), Bài 9.9 và 9.10(a) (Newton's method, tr. 515), Bài 9.13 và 9.16 (Self-concordance, tr. 516), Bài 9.21 (Self-concordance, tr. 517);
  - Chương 10: Bài 10.1(a) và 10.2 (Equality constrained minimization, tr. 557), Bài 10.5 (Newton's method with equality constraints, tr. 558), Bài 10.7(b), 10.8 và 10.9(a), (b) (Infeasible start Newton method, tr. 558);
  - Chương 11: Bài 11.1 và 11.2 (The barrier method, tr. 623).
- Kupferschmid, Michael (2023), *Introduction to Mathematical Programming*, §13.5 (Exercises): Bài 13.5.4(a), (b) (tr. 445).
