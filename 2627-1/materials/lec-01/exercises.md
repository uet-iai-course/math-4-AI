# Bài tập Bài 01 — Giới thiệu tối ưu, tập lồi và hàm lồi

Bài tập 01.22–01.34 dưới đây đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-01/lecture-note.md&deck=lecture-01-gioi-thieu-toi-uu-tap-loi-ham-loi.html) và [bài giảng](lecture-01-gioi-thieu-toi-uu-tap-loi-ham-loi.html) của Bài 01. Mọi bài lấy từ Boyd và Vandenberghe (2004); số trang là trang in của sách. Lời giải dẫn định nghĩa, định lý, mệnh đề và ví dụ theo số hiệu của ghi chú. Ký hiệu theo ghi chú: vector viết chữ thường, không in đậm, và là vector cột; bất đẳng thức giữa hai vector hiểu theo từng tọa độ; $e_j$ là vector đơn vị thứ $j$.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Tách dữ kiện, biến quyết định, hàm mục tiêu, miền khả thi; viết bài toán tối ưu ở dạng tổng quát | 01.6, 01.14 | 01.34 |
| 2. Bài toán điều khiển một bước | 01.1, 01.16 | — |
| 2. Bài toán bình phương nhỏ nhất | 01.2, 01.3, 01.13, 01.19 | — |
| 2. Bài toán hồi quy logistic | 01.4 | — |
| 3. Tính lồi của tập bằng định nghĩa | 01.8 | 01.26, 01.27 |
| 3. Tính lồi của tập bằng các phép toán bảo toàn tính lồi | 01.7, 01.14 | 01.22, 01.24 |
| 3. Tính lồi của hàm bằng định nghĩa | 01.9 | 01.28, 01.29, 01.31 |
| 3. Tính lồi của hàm bằng điều kiện bậc nhất | 01.10 | 01.28 |
| 3. Tính lồi của hàm bằng điều kiện bậc hai | 01.11, 01.17 | 01.25, 01.30, 01.32 |
| 3. Tính lồi của hàm bằng các phép toán bảo toàn tính lồi | 01.14, 01.18 | 01.23, 01.24 |
| 4. Cực tiểu địa phương là toàn cục; chứng nhận một điểm bằng điều kiện tối ưu bậc nhất | 01.5, 01.10, 01.15, 01.16, 01.21 | 01.32, 01.33 |
| 4. Nghiệm tồn tại | 01.4, 01.12, 01.13, 01.15, 01.17, 01.18, 01.19, 01.21 | 01.34 |
| 4. Nghiệm duy nhất | 01.6, 01.10, 01.13, 01.16, 01.18, 01.19, 01.21 | 01.32, 01.33, 01.34 |
| 5. Quy trình chứng nhận cho một mô hình mới | 01.13, 01.14, 01.18, 01.21 | 01.34 |
| 5. Kết luận mất khi một giả thiết bị vi phạm | 01.12, 01.17, 01.20 | 01.33, 01.34 |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 3; nhận dạng tập lồi qua nửa không gian, hộp, giao và nghịch ảnh affine.

::: exercise Bài tập 01.22 (Dải, hộp và nêm; Boyd và Vandenberghe, Bài 2.12(a)–(c), tr. 61)
Cho $g,g_1,g_2\in\mathbb R^d$ và các số thực $\kappa_1$, $\kappa_2$, $\nu_1$, $\nu_2$, $\underline x_j$, $\overline x_j$, $j=1,\ldots,d$. Xác định mỗi tập sau có lồi không:

- **(a)** *dải* (slab) $\{x\in\mathbb R^d\mid\kappa_1\le g^Tx\le\kappa_2\}$;
- **(b)** *hộp* (box; còn gọi là hình hộp chữ nhật, rectangle) $\{x\in\mathbb R^d\mid\underline x_j\le x_j\le\overline x_j,\ j=1,\ldots,d\}$;
- **(c)** *nêm* (wedge) $\{x\in\mathbb R^d\mid g_1^Tx\le\nu_1,\ g_2^Tx\le\nu_2\}$.
:::

::: hint Gợi ý
Viết mỗi tập thành giao của các tập dạng $\{x\mid h^Tx\le\beta\}$, hoặc thành nghịch ảnh của một tập trong $\mathbb R$ qua ánh xạ tuyến tính $x\mapsto g^Tx$. Mệnh đề 01.18(c) cần giả thiết $g\ne0$; xét riêng các trường hợp $g=0$, $\kappa_1>\kappa_2$ ở (a) và $g_j=0$ ở (c).
:::

::: solution Lời giải Bài tập 01.22
**Câu (a).** Dải là nghịch ảnh của $E=\{s\in\mathbb R\mid\kappa_1\le s\le\kappa_2\}$ qua ánh xạ tuyến tính $x\mapsto g^Tx$, tức Mệnh đề 01.19(c) với $A=g^T\in\mathbb R^{1\times d}$ và $c=0$. Tập $E$ lồi: khi $\kappa_1\le\kappa_2$, $E$ là một hộp trong $\mathbb R$ (Mệnh đề 01.18(d)); khi $\kappa_1>\kappa_2$, $E$ rỗng. Vậy dải lồi với mọi $g$. Khi $g=0$, dải bằng $\mathbb R^d$ nếu $\kappa_1\le0\le\kappa_2$ và rỗng trong trường hợp còn lại. Khi $g\ne0$, dải còn là giao của hai nửa không gian $\{x\mid g^Tx\le\kappa_2\}$ và $\{x\mid(-g)^Tx\le-\kappa_1\}$ (Mệnh đề 01.18(c), Mệnh đề 01.19(a)).

**Câu (b).** Khi $\underline x_j\le\overline x_j$ với mọi $j$, tập là hộp của Mệnh đề 01.18(d), nên lồi; khi có $j$ với $\underline x_j>\overline x_j$, tập rỗng, nên lồi. Cách khác: tập là giao của $2d$ tập $\{x\mid e_j^Tx\le\overline x_j\}$ và $\{x\mid(-e_j)^Tx\le-\underline x_j\}$, $j=1,\ldots,d$; các vector $\pm e_j$ khác $0$, nên mỗi tập là một nửa không gian (Mệnh đề 01.18(c)), và giao lồi theo Mệnh đề 01.19(a).

**Câu (c).** Với $j=1,2$, đặt $H_j=\{x\mid g_j^Tx\le\nu_j\}$. Nếu $g_j\ne0$, $H_j$ là nửa không gian (Mệnh đề 01.18(c)); nếu $g_j=0$, $H_j=\mathbb R^d$ khi $\nu_j\ge0$ và $H_j=\varnothing$ khi $\nu_j<0$. Cả ba trường hợp cho $H_j$ lồi, nên nêm $H_1\cap H_2$ lồi theo Mệnh đề 01.19(a).

**Kiểm tra lại.** Với $d=2$, $g=(1,1)^T$, $\kappa_1=0$, $\kappa_2=1$: hai điểm $(1,0)$ và $(0,0)$ thuộc dải, và trung điểm $(\tfrac12,0)$ có $g^Tx=\tfrac12\in[0,1]$. Với nêm $g_1=e_1$, $g_2=e_2$, $\nu_1=\nu_2=0$: hai điểm $(-1,0)$ và $(0,-1)$ thuộc nêm, và trung điểm $(-\tfrac12,-\tfrac12)$ có hai tọa độ không dương.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 3; nhận ra hợp của một hàm lồi với ánh xạ affine.

::: exercise Bài tập 01.23 (Chuẩn Euclid của một ánh xạ affine; Boyd và Vandenberghe, Bài 3.20(a), tr. 116)
Cho $A\in\mathbb R^{d'\times d}$ và $c\in\mathbb R^{d'}$. Chứng minh hàm $f(x)=\lVert Ax-c\rVert_2$ lồi trên $\mathbb R^d$.
:::

::: hint Gợi ý
Viết $f$ dưới dạng $\psi(Ax+c')$ với một vector $c'$ và một hàm lồi $\psi$ trên $\mathbb R^{d'}$ đã có trong ghi chú.
:::

::: solution Lời giải Bài tập 01.23
Đặt $\psi(s)=\lVert s\rVert_2$ với $s\in\mathbb R^{d'}$. Theo Ví dụ 01.12(c) (với $d'$ thay cho $d$), $\psi$ lồi trên $\mathbb R^{d'}$. Ta có $f(x)=\psi(Ax+(-c))$, nên $f$ lồi trên $\mathbb R^d$ theo Định lý 01.30(b) với vector $-c$.

**Kiểm tra lại.** Với $d=d'=1$, $A=2$, $c=2$: $f(x)=\lvert2x-2\rvert$. Với $x=0$, $y=2$, $\theta=\tfrac12$, vế trái của (7.1) là $f(1)=0$, vế phải là $\tfrac12\cdot2+\tfrac12\cdot2=2$, và $0\le2$.
:::

**Mức độ:** nhận biết ở (a)–(e); tính toán ở (f), (g). **Mục tiêu:** mục tiêu học tập 3; viết điều kiện trên phân phối xác suất thành ràng buộc theo $p$ và nhận dạng tập lồi.

::: exercise Bài tập 01.24 (Điều kiện trên một phân phối xác suất rời rạc; Boyd và Vandenberghe, Bài 2.15(a)–(g), tr. 62)
Biến ngẫu nhiên rời rạc $U$ nhận các giá trị $\xi_1<\xi_2<\cdots<\xi_n$ với $\Pr(U=\xi_i)=p_i$, $i=1,\ldots,n$, nên $p=(p_1,\ldots,p_n)^T\in\Delta_n$. Kỳ vọng và phương sai theo Định nghĩa 00.55 và Định nghĩa 00.56. Cho hàm $\psi:\mathbb R\to\mathbb R$ và các số thực $\alpha$, $\alpha_1$, $\alpha_2$, $\rho$. Với mỗi điều kiện sau, xét tập các $p\in\Delta_n$ thỏa điều kiện:

- **(a)** $\alpha_1\le\mathbb E[\psi(U)]\le\alpha_2$;
- **(b)** $\Pr(U>\alpha)\le\rho$;
- **(c)** $\mathbb E[\lvert U^3\rvert]\le\alpha\,\mathbb E[\lvert U\rvert]$;
- **(d)** $\mathbb E[U^2]\le\alpha$;
- **(e)** $\mathbb E[U^2]\ge\alpha$;
- **(f)** $\operatorname{Var}(U)\le\alpha$;
- **(g)** $\operatorname{Var}(U)\ge\alpha$.

Xác định điều kiện nào cho một tập lồi với mọi $\xi_i$, mọi $\psi$ và mọi ngưỡng; với điều kiện còn lại, cho một phản ví dụ.
:::

::: hint Gợi ý 1
Viết mỗi đại lượng thành một hàm của $p$: theo Định nghĩa 00.55, $\mathbb E[h(U)]=\sum_ip_i\,h(\xi_i)$ với mọi hàm $h$, và theo kết luận 2 của Mệnh đề 00.57, $\operatorname{Var}(U)=\mathbb E[U^2]-(\mathbb E[U])^2$. Rồi xác định mỗi hàm đó là affine, lồi hay lõm theo $p$.
:::

::: hint Gợi ý 2
Với (f) và (g), viết $\operatorname{Var}(U)=b^Tp-(\xi^Tp)^2$ với $b_i=\xi_i^2$ và $\xi=(\xi_1,\ldots,\xi_n)^T$, rồi xác định hàm này lồi hay lõm theo $p$. Điều kiện nào đưa được về dạng $\Phi(p)\le\text{hằng số}$ với $\Phi$ lồi thì cho tập lồi (Mệnh đề 01.24).
:::

::: hint Gợi ý 3
Với điều kiện còn lại, thử $n=2$ và so $\operatorname{Var}(U)$ tại hai đỉnh của $\Delta_2$ với giá trị tại trung điểm của chúng.
:::

::: solution Lời giải Bài tập 01.24
**Ràng buộc tuyến tính trên đơn hình cho tập lồi.** Với $c\in\mathbb R^n$ và $\beta\in\mathbb R$, tập $\{p\in\mathbb R^n\mid c^Tp\le\beta\}$ là nghịch ảnh của nửa không gian $\{s\in\mathbb R\mid s\le\beta\}$ (Mệnh đề 01.18(c) với $g=1$) qua ánh xạ tuyến tính $p\mapsto c^Tp$, nên lồi theo Mệnh đề 01.19(c), kể cả khi $c=0$. Đơn hình $\Delta_n$ lồi (Ví dụ 01.11(d)). Do đó mọi tập dạng $\Delta_n\cap\{p\mid c^Tp\le\beta\}$, và mọi giao hữu hạn của các tập như vậy, lồi theo Mệnh đề 01.19(a).

**Câu (a).** $\mathbb E[\psi(U)]=\sum_ip_i\psi(\xi_i)=c^Tp$ với $c_i=\psi(\xi_i)$. Điều kiện là $c^Tp\le\alpha_2$ và $(-c)^Tp\le-\alpha_1$, nên tập lồi.

**Câu (b).** $\Pr(U>\alpha)=\sum_{i:\,\xi_i>\alpha}p_i=c^Tp$ với $c_i=1$ khi $\xi_i>\alpha$ và $c_i=0$ khi $\xi_i\le\alpha$. Điều kiện là $c^Tp\le\rho$, nên tập lồi.

**Câu (c).** Điều kiện là $\sum_ip_i\bigl(\lvert\xi_i\rvert^3-\alpha\lvert\xi_i\rvert\bigr)\le0$, tức $c^Tp\le0$ với $c_i=\lvert\xi_i\rvert^3-\alpha\lvert\xi_i\rvert$, nên tập lồi.

**Câu (d), (e).** Với $b_i=\xi_i^2$, $\mathbb E[U^2]=b^Tp$. Điều kiện (d) là $b^Tp\le\alpha$, điều kiện (e) là $(-b)^Tp\le-\alpha$; cả hai tập lồi.

**Câu (f).** Với dữ kiện sau, tập không lồi: $n=2$, $\xi_1=0$, $\xi_2=1$, $\alpha=\tfrac15$. Với $p=(1,0)$ và $p=(0,1)$, $U$ là hằng số, nên $\operatorname{Var}(U)=0\le\tfrac15$. Với trung điểm $p=(\tfrac12,\tfrac12)$, $\mathbb E[U]=\tfrac12$ và $\mathbb E[U^2]=\tfrac12$, nên theo kết luận 2 của Mệnh đề 00.57, $\operatorname{Var}(U)=\tfrac12-\tfrac14=\tfrac14>\tfrac15$. Bộ hai điểm này với $\theta=\tfrac12$ vi phạm (6.1).

**Câu (g).** Đặt $\xi=(\xi_1,\ldots,\xi_n)^T$ và $b$ như ở (d). Trên $\Delta_n$, $\operatorname{Var}(U)=b^Tp-(\xi^Tp)^2$, nên điều kiện (g) tương đương $\Phi(p)\le-\alpha$ với
$$
\Phi(p)=(\xi^Tp)^2-b^Tp,\qquad p\in\mathbb R^n .
$$
Hàm $s\mapsto s^2$ lồi (Ví dụ 01.12(a)), nên $p\mapsto(\xi^Tp)^2$ lồi theo Định lý 01.30(b); $p\mapsto-b^Tp$ affine nên lồi (Ví dụ 01.12(b)); tổng $\Phi$ lồi theo Định lý 01.30(a). Tập cần xét là $\Delta_n\cap S_{-\alpha}(\Phi)$, lồi theo Mệnh đề 01.24 và Mệnh đề 01.19(a).

**Kiểm tra lại.** Với dữ kiện phản ví dụ ở (f) và $\alpha=\tfrac15$ ở (g): $p=(1,0)$ và $p=(0,1)$ cho $\operatorname{Var}(U)=0<\tfrac15$, nên không thuộc tập của (g), còn $p=(\tfrac12,\tfrac12)$ thuộc tập đó. Tại $p=(\tfrac12,\tfrac12)$, $\Phi(p)=\tfrac14-\tfrac12=-\tfrac14\le-\tfrac15$, khớp với $\operatorname{Var}(U)=\tfrac14\ge\tfrac15$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 3; nhận ra hàm sigmoid trong hàm logistic và dùng tính lồi của mất mát logistic.

::: exercise Bài tập 01.25 (Tính log-lõm của hàm logistic; Boyd và Vandenberghe, Bài 3.49(a), tr. 122)
Một hàm $f$ dương trên một tập lồi được gọi là *log-lõm* (log-concave) nếu $\log f$ lõm. Chứng minh hàm logistic $f(x)=e^x/(1+e^x)$ log-lõm trên $\mathbb R$.
:::

::: hint Gợi ý
Viết $f$ theo hàm sigmoid $\sigma$ của ghi chú, rồi dùng hệ thức $-\log\sigma(m)=\ell(m)$ sau Định nghĩa 01.7.
:::

::: solution Lời giải Bài tập 01.25
Chia tử và mẫu cho $e^x$: $f(x)=1/(1+e^{-x})=\sigma(x)>0$. Do đó $\log f(x)=\log\sigma(x)=-\ell(x)$. Theo Mệnh đề 01.8(c), $\ell''>0$ trên $\mathbb R$, nên $\ell$ lồi theo Bổ đề 01.28(a), và $-\ell$ lõm theo Định nghĩa 01.21. Vậy $f$ log-lõm.

**Kiểm tra lại.** Tính trực tiếp: $\log f(x)=x-\log(1+e^x)$, $(\log f)'(x)=1/(1+e^x)$ và $(\log f)''(x)=-e^x/(1+e^x)^2=-\ell''(x)<0$; tại $x=0$, giá trị là $-\tfrac14$.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; mở rộng Định nghĩa 01.17 từ hai điểm lên $k$ điểm bằng quy nạp.

::: exercise Bài tập 01.26 (Tổ hợp lồi của $k$ điểm; Boyd và Vandenberghe, Bài 2.1, tr. 60)
Cho $k\ge1$, $C\subseteq\mathbb R^d$ lồi, $x^{(1)},\ldots,x^{(k)}\in C$ và $\theta_1,\ldots,\theta_k\in\mathbb R$ với $\theta_i\ge0$, $\theta_1+\cdots+\theta_k=1$. Chứng minh $\theta_1x^{(1)}+\cdots+\theta_kx^{(k)}\in C$. Định nghĩa 01.17 là trường hợp $k=2$.
:::

::: hint Gợi ý 1
Quy nạp theo $k$.
:::

::: hint Gợi ý 2
Ở bước quy nạp với $k+1$ điểm, khi $\theta_{k+1}\ne1$, viết tổng thành $(1-\theta_{k+1})\tilde x+\theta_{k+1}x^{(k+1)}$, với $\tilde x$ là một tổ hợp của $x^{(1)},\ldots,x^{(k)}$. Kiểm tra các hệ số của $\tilde x$ không âm và có tổng bằng $1$.
:::

::: solution Lời giải Bài tập 01.26
**Bước cơ sở.** Với $k=1$, $\theta_1=1$ và tổng bằng $x^{(1)}\in C$.

**Bước quy nạp.** Giả sử khẳng định đúng với $k$ điểm; xét $k+1$ điểm $x^{(1)},\ldots,x^{(k+1)}\in C$ với hệ số $\theta_i\ge0$ có tổng bằng $1$. Nếu $\theta_{k+1}=1$ thì $\theta_1=\cdots=\theta_k=0$, và tổng bằng $x^{(k+1)}\in C$. Nếu $\theta_{k+1}<1$, đặt $\tilde\theta_i=\theta_i/(1-\theta_{k+1})$ với $i=1,\ldots,k$. Khi đó $\tilde\theta_i\ge0$ và
$$
\sum_{i=1}^k\tilde\theta_i=\frac{1-\theta_{k+1}}{1-\theta_{k+1}}=1,
$$
nên theo giả thiết quy nạp, $\tilde x=\sum_{i=1}^k\tilde\theta_ix^{(i)}\in C$. Ta có
$$
\sum_{i=1}^{k+1}\theta_ix^{(i)}=(1-\theta_{k+1})\tilde x+\theta_{k+1}x^{(k+1)},
$$
một tổ hợp lồi của hai điểm $\tilde x,x^{(k+1)}\in C$ với hệ số $\theta_{k+1}\in[0,1)$, nên thuộc $C$ theo (6.1).

**Kiểm tra lại.** Với $k=3$ và $\theta=(\tfrac12,\tfrac14,\tfrac14)$: $\tilde\theta_1=\tfrac12/\tfrac34=\tfrac23$, $\tilde\theta_2=\tfrac13$, và $\tfrac34\bigl(\tfrac23x^{(1)}+\tfrac13x^{(2)}\bigr)+\tfrac14x^{(3)}=\tfrac12x^{(1)}+\tfrac14x^{(2)}+\tfrac14x^{(3)}$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; chứng minh tính lồi từ (6.1) qua hệ số nhị phân và tính đóng.

::: exercise Bài tập 01.27 (Lồi trung điểm và đóng; Boyd và Vandenberghe, Bài 2.3, tr. 60)
Một tập $C\subseteq\mathbb R^d$ là *lồi trung điểm* (midpoint convex) nếu với mọi $x,y\in C$, trung điểm $\tfrac12(x+y)$ thuộc $C$. Mọi tập lồi là lồi trung điểm (Định nghĩa 01.17 với $\theta=\tfrac12$). Chứng minh: nếu $C$ đóng và lồi trung điểm thì $C$ lồi.
:::

::: hint Gợi ý 1
Cố định $x,y\in C$ và đặt $z_\theta=\theta x+(1-\theta)y$. Trước hết chứng minh $z_\theta\in C$ khi $\theta=j/2^k$ với $k\ge0$ và $j\in\{0,1,\ldots,2^k\}$, bằng quy nạp theo $k$.
:::

::: hint Gợi ý 2
Với $\theta\in[0,1]$ tùy ý, xét dãy $\theta^{(k)}=\lfloor2^k\theta\rfloor/2^k$, trong đó $\lfloor\cdot\rfloor$ là phần nguyên, rồi dùng định nghĩa tập đóng qua dãy trong Kiến thức tiên quyết.
:::

::: solution Lời giải Bài tập 01.27
Cố định $x,y\in C$ và đặt $z_\theta=\theta x+(1-\theta)y$ với $\theta\in\mathbb R$. Ánh xạ $\theta\mapsto z_\theta$ affine, nên $z_{(\theta'+\theta'')/2}=\tfrac12z_{\theta'}+\tfrac12z_{\theta''}$ với mọi $\theta',\theta''$.

**Bước 1 (hệ số nhị phân).** Ta chứng minh bằng quy nạp theo $k$: $z_{j/2^k}\in C$ với mọi $j\in\{0,\ldots,2^k\}$. Với $k=0$, $z_0=y$ và $z_1=x$ thuộc $C$. Giả sử khẳng định đúng với $k$, xét $\theta=j/2^{k+1}$ với $0\le j\le2^{k+1}$. Nếu $j$ chẵn, $\theta=(j/2)/2^k$ và $z_\theta\in C$ theo giả thiết quy nạp. Nếu $j$ lẻ, hai số $\theta_\pm=(j\pm1)/2^{k+1}$ có tử chẵn nằm trong $[0,2^{k+1}]$, nên có dạng $j'/2^k$ với $0\le j'\le2^k$, và $z_{\theta_\pm}\in C$ theo giả thiết quy nạp. Vì $\theta=\tfrac12(\theta_-+\theta_+)$, $z_\theta=\tfrac12z_{\theta_-}+\tfrac12z_{\theta_+}\in C$ theo tính lồi trung điểm.

**Bước 2 (giới hạn).** Với $\theta\in[0,1]$, đặt $\theta^{(k)}=\lfloor2^k\theta\rfloor/2^k$. Tử số $\lfloor2^k\theta\rfloor$ thuộc $\{0,\ldots,2^k\}$, nên $z_{\theta^{(k)}}\in C$ theo bước 1, và $0\le\theta-\theta^{(k)}<2^{-k}$. Do đó
$$
\begin{aligned}
\lVert z_{\theta^{(k)}}-z_\theta\rVert_2&=\lvert\theta^{(k)}-\theta\rvert\,\lVert x-y\rVert_2\\
&<2^{-k}\lVert x-y\rVert_2\to0 .
\end{aligned}
$$
Dãy $z_{\theta^{(k)}}$ gồm các điểm của $C$ hội tụ tới $z_\theta$, và $C$ đóng, nên $z_\theta\in C$. Vậy $C$ thỏa (6.1).

**Kiểm tra lại.** Với $\theta=\tfrac13$: $\theta^{(1)}=0$, $\theta^{(2)}=\tfrac14$, $\theta^{(3)}=\tfrac28=\tfrac14$, $\theta^{(4)}=\tfrac5{16}$; các sai số $\tfrac13$, $\tfrac1{12}$, $\tfrac1{12}$, $\tfrac1{48}$ lần lượt nhỏ hơn $\tfrac12$, $\tfrac14$, $\tfrac18$, $\tfrac1{16}$. Giả thiết đóng dùng ở bước 2: tập $\mathbb Q$ lồi trung điểm, không đóng và không lồi (câu sau Định nghĩa 01.17).
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; đọc định nghĩa hàm lồi một biến qua độ dốc dây cung, nối với điều kiện bậc nhất và bậc hai.

::: exercise Bài tập 01.28 (Dây cung, độ dốc và đạo hàm; Boyd và Vandenberghe, Bài 3.1, tr. 113)
Cho $f:\mathbb R\to\mathbb R$ lồi và hai số $\xi_1<\xi_2$.

- **(a)** Chứng minh với mọi $x\in[\xi_1,\xi_2]$,
$$
\begin{aligned}
f(x)&\le\frac{\xi_2-x}{\xi_2-\xi_1}f(\xi_1)\\
&\quad+\frac{x-\xi_1}{\xi_2-\xi_1}f(\xi_2).
\end{aligned}
$$
- **(b)** Chứng minh với mọi $x\in(\xi_1,\xi_2)$,
$$
\begin{aligned}
\frac{f(x)-f(\xi_1)}{x-\xi_1}&\le\frac{f(\xi_2)-f(\xi_1)}{\xi_2-\xi_1}\\
&\le\frac{f(\xi_2)-f(x)}{\xi_2-x}.
\end{aligned}
$$
- **(c)** Giả sử thêm $f$ khả vi. Dùng (b) chứng minh
$$
f'(\xi_1)\le\frac{f(\xi_2)-f(\xi_1)}{\xi_2-\xi_1}\le f'(\xi_2).
$$
- **(d)** Giả sử thêm $f$ khả vi hai lần. Dùng (c) chứng minh $f''(\xi_1)\ge0$ và $f''(\xi_2)\ge0$.
- **(e)** Với $f$ khả vi như ở (c), suy lại hai bất đẳng thức của (c) từ (7.2).
:::

::: hint Gợi ý 1
(a): viết $x=\theta\xi_1+(1-\theta)\xi_2$ và tìm $\theta\in[0,1]$. (b): trừ $f(\xi_1)$ ở hai vế của (a), rồi làm lại với $f(\xi_2)$.
:::

::: hint Gợi ý 2
(c): cho $x\to\xi_1^+$ ở bất đẳng thức thứ nhất của (b) và $x\to\xi_2^-$ ở bất đẳng thức thứ hai. (d): chia $f'(\xi_2)-f'(\xi_1)$ cho $\xi_2-\xi_1$ rồi lấy giới hạn. (e): viết (7.2) với $d=1$ cho cặp $(\xi_1,\xi_2)$ và cho cặp $(\xi_2,\xi_1)$.
:::

::: solution Lời giải Bài tập 01.28
**Câu (a).** Với $x\in[\xi_1,\xi_2]$, đặt $\theta=(\xi_2-x)/(\xi_2-\xi_1)\in[0,1]$. Khi đó $1-\theta=(x-\xi_1)/(\xi_2-\xi_1)$ và $\theta\xi_1+(1-\theta)\xi_2=\xi_2-\theta(\xi_2-\xi_1)=x$. Bất đẳng thức (7.1) tại $\xi_1$, $\xi_2$ với hệ số $\theta$ là bất đẳng thức cần chứng minh.

**Câu (b).** Vì $\theta-1=-(x-\xi_1)/(\xi_2-\xi_1)$, trừ $f(\xi_1)$ ở hai vế của (a) được
$$
f(x)-f(\xi_1)\le\frac{x-\xi_1}{\xi_2-\xi_1}\bigl(f(\xi_2)-f(\xi_1)\bigr);
$$
chia cho $x-\xi_1>0$ được bất đẳng thức thứ nhất. Trừ $f(\xi_2)$ ở hai vế của (a) rồi đổi dấu được
$$
f(\xi_2)-f(x)\ge\frac{\xi_2-x}{\xi_2-\xi_1}\bigl(f(\xi_2)-f(\xi_1)\bigr);
$$
chia cho $\xi_2-x>0$ được bất đẳng thức thứ hai.

**Câu (c).** Khi $x\to\xi_1^+$, vế trái của bất đẳng thức thứ nhất trong (b) dần tới $f'(\xi_1)$, còn vế phải không đổi; phép lấy giới hạn giữ dấu $\le$. Tương tự, khi $x\to\xi_2^-$, $(f(\xi_2)-f(x))/(\xi_2-x)\to f'(\xi_2)$.

**Câu (d).** Theo (c), $f'(\xi_1)\le f'(\xi_2)$ với mọi $\xi_1<\xi_2$, nên $(f'(\xi_2)-f'(\xi_1))/(\xi_2-\xi_1)\ge0$. Cố định $\xi_1$ và cho $\xi_2\to\xi_1^+$, được $f''(\xi_1)\ge0$; cố định $\xi_2$ và cho $\xi_1\to\xi_2^-$, được $f''(\xi_2)\ge0$.

**Câu (e).** Định lý 01.25 áp dụng với $C=\mathbb R$ (mở và lồi), $d=1$. Bất đẳng thức $f(\xi_2)\ge f(\xi_1)+f'(\xi_1)(\xi_2-\xi_1)$, chia cho $\xi_2-\xi_1>0$, cho bất đẳng thức thứ nhất của (c). Bất đẳng thức $f(\xi_1)\ge f(\xi_2)+f'(\xi_2)(\xi_1-\xi_2)$ tương đương $f'(\xi_2)(\xi_2-\xi_1)\ge f(\xi_2)-f(\xi_1)$, cho bất đẳng thức thứ hai.

**Kiểm tra lại.** Với $f(x)=x^2$, $\xi_1=0$, $\xi_2=2$, $x=1$: ba độ dốc ở (b) là $1$, $2$, $3$; ở (c), $f'(0)=0\le2\le4=f'(2)$; ở (d), $f''=2\ge0$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; dùng hàm hạn chế lên đường thẳng và (7.1) để suy ra một tính chất toàn cục.

::: exercise Bài tập 01.29 (Hàm lồi bị chặn trên là hàm hằng; Boyd và Vandenberghe, Bài 3.7, tr. 114)
Cho $f:\mathbb R^d\to\mathbb R$ lồi và bị chặn trên, tức có $M\in\mathbb R$ sao cho $f(x)\le M$ với mọi $x\in\mathbb R^d$. Chứng minh $f$ là hàm hằng.
:::

::: hint Gợi ý 1
Phản chứng: giả sử có $x,y$ với $f(x)<f(y)$, rồi xét hàm hạn chế $\varphi(\tau)=f(x+\tau(y-x))$ trên $\mathbb R$ (Bổ đề 01.27).
:::

::: hint Gợi ý 2
Với $\tau>1$, viết số $1$ thành một tổ hợp lồi của $0$ và $\tau$, rồi áp dụng (7.1) cho $\varphi$ để được một cận dưới của $\varphi(\tau)$.
:::

::: solution Lời giải Bài tập 01.29
**Bước 1 (hàm hạn chế).** Giả sử $f$ không là hàm hằng. Khi đó có $x,y$ với $f(x)\ne f(y)$; đổi tên nếu cần để $f(x)<f(y)$. Với $v=y-x\ne0$, hàm $\varphi(\tau)=f(x+\tau v)$ lồi trên $\mathbb R$ theo Bổ đề 01.27, và $\varphi(0)=f(x)<f(y)=\varphi(1)$.

**Bước 2 (cận dưới tuyến tính).** Với $\tau>1$, ta có $1=(1-\tfrac1\tau)\cdot0+\tfrac1\tau\cdot\tau$ với $\tfrac1\tau\in(0,1)$. Theo (7.1) cho $\varphi$,
$$
\varphi(1)\le\Bigl(1-\frac1\tau\Bigr)\varphi(0)+\frac1\tau\varphi(\tau).
$$
Nhân hai vế với $\tau>0$:
$$
\varphi(\tau)\ge\varphi(0)+\tau\bigl(\varphi(1)-\varphi(0)\bigr).
$$

**Bước 3 (mâu thuẫn).** Vì $\varphi(1)-\varphi(0)>0$, chọn $\tau>\max\bigl\{1,\ (M-\varphi(0))/(\varphi(1)-\varphi(0))\bigr\}$ thì $f(x+\tau v)=\varphi(\tau)>M$, trái với giả thiết bị chặn trên. Vậy $f$ là hàm hằng.

**Kiểm tra lại.** Với $f(t)=t^2$ trên $\mathbb R$, $x=0$, $y=1$: $\varphi(\tau)=\tau^2$ và cận dưới ở bước 2 là $\tau$; với $\tau>1$, $\tau^2>\tau$. Bước 3 dùng điểm $x+\tau v$ với $\tau$ lớn tùy ý, nên cần miền $\mathbb R^d$: $t^2$ trên $[-1,1]$ lồi, bị chặn trên bởi $1$ và không là hàm hằng.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; xác định tính lồi và tính lõm bằng Hessian trên miền mở.

::: exercise Bài tập 01.30 (Lồi hay lõm: bốn hàm; Boyd và Vandenberghe, Bài 3.16(a), (b), (c), (e), tr. 116)
Đặt $\mathbb R^2_{++}=\{x\in\mathbb R^2\mid x_1>0,\ x_2>0\}$ và $\mathbb R\times\mathbb R_{++}=\{x\in\mathbb R^2\mid x_2>0\}$. Với mỗi hàm sau, xác định hàm có lồi không và có lõm không trên miền đã cho:

- **(a)** $f(x)=e^x-1$ trên $\mathbb R$;
- **(b)** $f(x)=x_1x_2$ trên $\mathbb R^2_{++}$;
- **(c)** $f(x)=1/(x_1x_2)$ trên $\mathbb R^2_{++}$;
- **(d)** $f(x)=x_1^2/x_2$ trên $\mathbb R\times\mathbb R_{++}$.
:::

::: hint Gợi ý 1
Kiểm tra $\mathbb R^2_{++}$ và $\mathbb R\times\mathbb R_{++}$ mở và lồi. Tính đạo hàm bậc hai hoặc Hessian và dùng Định lý 01.29; $f$ lõm khi và chỉ khi $-f$ lồi, và $\nabla^2(-f)=-\nabla^2f$.
:::

::: hint Gợi ý 2
Xét dấu của $v^T\nabla^2f(x)v$ theo $v_1$, $v_2$. Ở (c), đặt $s=v_1/x_1$, $t=v_2/x_2$; ở (d), viết $v^T\nabla^2f(x)v$ thành một bội của một bình phương.
:::

::: solution Lời giải Bài tập 01.30
**Miền.** Nếu hai điểm có các tọa độ dương thì mọi tổ hợp lồi của chúng có các tọa độ dương, nên $\mathbb R^2_{++}$ lồi; với $x\in\mathbb R^2_{++}$, quả cầu mở tâm $x$ bán kính $\min(x_1,x_2)$ nằm trong $\mathbb R^2_{++}$, nên $\mathbb R^2_{++}$ mở. Lập luận tương tự với một tọa độ $x_2$ cho $\mathbb R\times\mathbb R_{++}$. Miền $\mathbb R$ của (a) mở, và lồi theo Mệnh đề 01.18(a). Do đó Định lý 01.29 áp dụng được trên cả ba miền.

**Câu (a).** $e^x$ lồi chặt (Ví dụ 01.14(d)), nên $f=e^x-1$ lồi chặt. Vì $(-f)''=-e^x<0$, $-f$ không lồi theo Bổ đề 01.28(a), nên $f$ không lõm.

**Câu (b).** $\nabla^2f(x)=\begin{bmatrix}0&1\\1&0\end{bmatrix}$ và $v^T\nabla^2f(x)v=2v_1v_2$. Với $v=(1,1)$ giá trị là $2>0$, với $v=(1,-1)$ giá trị là $-2<0$. Do đó cả $\nabla^2f(x)$ và $-\nabla^2f(x)$ đều không nửa xác định dương, và theo Định lý 01.29(a), $f$ không lồi, không lõm.

**Câu (c).** Các đạo hàm riêng bậc hai là $\partial_{11}f=2/(x_1^3x_2)$, $\partial_{12}f=1/(x_1^2x_2^2)$, $\partial_{22}f=2/(x_1x_2^3)$, nên
$$
\nabla^2f(x)=\frac1{x_1x_2}\begin{bmatrix}2/x_1^2&1/(x_1x_2)\\1/(x_1x_2)&2/x_2^2\end{bmatrix}.
$$
Với $s=v_1/x_1$ và $t=v_2/x_2$,
$$
\begin{aligned}
v^T\nabla^2f(x)v&=\frac{2s^2+2st+2t^2}{x_1x_2}\\
&=\frac{(s+t)^2+s^2+t^2}{x_1x_2}>0
\end{aligned}
$$
khi $v\ne0$. Vậy $\nabla^2f(x)\succ0$ trên $\mathbb R^2_{++}$, $f$ lồi chặt theo Định lý 01.29(b), và $f$ không lõm vì $v^T(-\nabla^2f(x))v<0$ khi $v\ne0$.

**Câu (d).** Các đạo hàm riêng bậc hai là $\partial_{11}f=2/x_2$, $\partial_{12}f=-2x_1/x_2^2$, $\partial_{22}f=2x_1^2/x_2^3$, nên
$$
v^T\nabla^2f(x)v=\frac2{x_2^3}(x_2v_1-x_1v_2)^2\ge0 .
$$
Theo Định lý 01.29(a), $f$ lồi trên $\mathbb R\times\mathbb R_{++}$. Với $v=(1,0)$, $v^T\nabla^2f(x)v=2/x_2>0$, nên $-\nabla^2f(x)$ không nửa xác định dương và $f$ không lõm.

**Kiểm tra lại.** Tại $x=(1,1)$: ở (c), $\nabla^2f=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ có hai giá trị riêng $1$ và $3$; ở (d), $\nabla^2f=\begin{bmatrix}2&-2\\-2&2\end{bmatrix}$ có hai giá trị riêng $0$ và $4$. Ở (d), dạng toàn phương bằng $0$ tại $v=(1,1)$, khớp với $f(\tau,\tau)=\tau$ tuyến tính dọc tia $x_1=x_2>0$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; chứng minh (7.1) cho một phép toán nằm ngoài Định lý 01.30, với giả thiết dương và đơn điệu.

::: exercise Bài tập 01.31 (Tích của hai hàm lồi cùng chiều đơn điệu; Boyd và Vandenberghe, Bài 3.32(a), tr. 119)
Cho khoảng $I\subseteq\mathbb R$ và hai hàm $f,g:I\to\mathbb R$ lồi, dương trên $I$, cùng không giảm hoặc cùng không tăng trên $I$. Chứng minh tích $fg$ lồi trên $I$.
:::

::: hint Gợi ý 1
Với $x,y\in I$, $\theta\in[0,1]$ và $z=\theta x+(1-\theta)y$, nhân hai bất đẳng thức (7.1) của $f$ và của $g$. Tính dương của $f$ và $g$ cho phép nhân hai bất đẳng thức cùng chiều.
:::

::: hint Gợi ý 2
Khai triển tích ở vế phải và so với $\theta f(x)g(x)+(1-\theta)f(y)g(y)$: hiệu bằng $\theta(1-\theta)$ nhân với một tích của hai hiệu. Dùng giả thiết đơn điệu để xét dấu tích đó.
:::

::: solution Lời giải Bài tập 01.31
**Bước 1 (nhân hai bất đẳng thức).** Đặt $F=\theta f(x)+(1-\theta)f(y)$ và $G=\theta g(x)+(1-\theta)g(y)$. Theo (7.1), $0<f(z)\le F$ và $0<g(z)\le G$. Nhân với các số dương: $f(z)g(z)\le F\,g(z)\le FG$.

**Bước 2 (khai triển).** Khai triển $FG$ và gom các hạng chứa $\theta(1-\theta)$:
$$
\begin{aligned}
FG&=\theta f(x)g(x)+(1-\theta)f(y)g(y)\\
&\quad-\theta(1-\theta)\bigl(f(x)-f(y)\bigr)\bigl(g(x)-g(y)\bigr).
\end{aligned}
$$

**Bước 3 (dấu của hạng cuối).** Nếu $f$, $g$ cùng không giảm hoặc cùng không tăng, hai hiệu $f(x)-f(y)$ và $g(x)-g(y)$ cùng dấu (hoặc bằng $0$), nên tích của chúng không âm. Vì $\theta(1-\theta)\ge0$, bước 1 và bước 2 cho
$$
(fg)(z)\le\theta\,(fg)(x)+(1-\theta)\,(fg)(y),
$$
tức $fg$ thỏa (7.1) trên $I$.

**Kiểm tra lại.** Trên $I=(0,\infty)$, $f(x)=x$ và $g(x)=x^2$ lồi, dương và không giảm; tích $x^3$ có $(x^3)''=6x>0$ trên $I$, nên lồi trên $I$, khớp với kết quả. Trên $\mathbb R$, ví dụ tích $x\cdot x^2$ của Nhận xét 01.31 không thỏa giả thiết: $x$ không dương và $x^2$ không đơn điệu.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3, 4; chứng nhận một nghiệm trên biên của hộp bằng (7.3) và chứng nhận tính duy nhất.

::: exercise Bài tập 01.32 (Chứng nhận nghiệm của một bài toán bậc hai trên hộp; Boyd và Vandenberghe, Bài 4.3, tr. 189)
Cho
$$
P=\begin{bmatrix}13&12&-2\\12&17&6\\-2&6&12\end{bmatrix},
$$
$b=(-22,\,-\tfrac{29}2,\,13)^T$ và $\kappa=1$. Xét bài toán cực tiểu $f_0(x)=\tfrac12x^TPx+b^Tx+\kappa$ trên hộp $C=\{x\in\mathbb R^3\mid-1\le x_i\le1,\ i=1,2,3\}$.

- **(a)** Chứng minh $x^*=(1,\tfrac12,-1)^T$ là nghiệm.
- **(b)** Xác định nghiệm có duy nhất không.
:::

::: hint Gợi ý 1
Cần hai điều: $f_0$ lồi (Định lý 01.29) và $x^*$ thỏa (7.3) (Hệ quả 01.26). Tính các đạo hàm riêng của $f_0$ (Định nghĩa 00.30), dùng tính đối xứng của $P$.
:::

::: hint Gợi ý 2
Để xét dấu của $v^TPv$ theo Định nghĩa 00.17, bù bình phương lần lượt theo $v_1$ rồi theo $v_2$. Ở (7.3), xét dấu từng số hạng $\bigl(\nabla f_0(x^*)\bigr)_i(x_i-x_i^*)$ trên hộp.
:::

::: solution Lời giải Bài tập 01.32
**Câu (a).** *Tính lồi.* Bù bình phương theo $v_1$ rồi theo $v_2$:
$$
\begin{aligned}
v^TPv&=13v_1^2+17v_2^2+12v_3^2\\
&\quad+24v_1v_2-4v_1v_3+12v_2v_3\\
&=13\bigl(v_1+\tfrac{12}{13}v_2-\tfrac2{13}v_3\bigr)^2\\
&\quad+\tfrac{77}{13}\bigl(v_2+\tfrac{102}{77}v_3\bigr)^2\\
&\quad+\tfrac{100}{77}v_3^2 .
\end{aligned}
$$
Ba hạng không âm. Nếu tổng bằng $0$ thì $v_3=0$, rồi $v_2=0$, rồi $v_1=0$. Vậy $P\succ0$ (Định nghĩa 00.17). Theo Ví dụ 01.14(b), $\nabla^2f_0=P$, nên $f_0$ lồi chặt trên tập mở và lồi $\mathbb R^3$ (Định lý 01.29(b)).

*Khả thi.* Ba tọa độ của $x^*$ thuộc $[-1,1]$, nên $x^*\in C$.

*Gradient.* Vì $P$ đối xứng, $\partial_k\bigl(\tfrac12\sum_{i,j}P_{ij}x_ix_j\bigr)=\sum_jP_{kj}x_j$, nên $\nabla f_0(x)=Px+b$. Tại $x^*$, $Px^*=(21,\ \tfrac{29}2,\ -11)^T$, nên $\nabla f_0(x^*)=(-1,0,2)^T$.

*Điều kiện (7.3).* Với mọi $x\in C$,
$$
\begin{aligned}
\nabla f_0(x^*)^T(x-x^*)&=-(x_1-1)+2(x_3+1)\\
&=(1-x_1)+2(x_3+1)\ge0,
\end{aligned}
$$
vì $x_1\le1$ và $x_3\ge-1$. Hệ quả 01.26 với $D=\mathbb R^3$ cho $x^*$ là cực tiểu toàn cục của $f_0$ trên $C$.

**Câu (b).** Hộp $C$ lồi (Mệnh đề 01.18(d)) và $f_0$ lồi chặt trên $C$ (Nhận xét 01.22), nên theo Định lý 01.34, $f_0$ có nhiều nhất một cực tiểu toàn cục trên $C$. Vậy $x^*$ là nghiệm duy nhất.

**Kiểm tra lại.**

- Với $v=(1,-1,1)$: tính trực tiếp, $v^TPv=13+17+12-24-4-12=2$; theo phép bù bình phương, $\tfrac1{13}+\tfrac{625}{1001}+\tfrac{100}{77}=\tfrac{77+625+1300}{1001}=2$.
- Giá trị tối ưu là $f_0(x^*)=\tfrac{157}8-\tfrac{169}4+1=-\tfrac{173}8$, nhỏ hơn $f_0(0)=1$ tại điểm khả thi $0$.
- Trong (7.3), tọa độ $x_2^*=\tfrac12$ nằm trong khoảng mở và có đạo hàm riêng bằng $0$; ở hai tọa độ trên biên, $f_0$ giảm theo hướng đi ra ngoài hộp ($\partial_1f_0(x^*)=-1<0$ tại $x_1^*=1$, $\partial_3f_0(x^*)=2>0$ tại $x_3^*=-1$).
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 4, 5; giải tường minh một bài toán tuyến tính trên hộp, chứng nhận bằng (7.3), và chỉ ra tính duy nhất mất khi mục tiêu không lồi chặt.

::: exercise Bài tập 01.33 (Cực tiểu một hàm tuyến tính trên hộp; Boyd và Vandenberghe, Bài 4.8(c), tr. 192)
Cho $c\in\mathbb R^d$ và $\underline x,\overline x\in\mathbb R^d$ với $\underline x\le\overline x$. Xét bài toán cực tiểu $f_0(x)=c^Tx$ trên hộp $C=\{x\in\mathbb R^d\mid\underline x\le x\le\overline x\}$.

- **(a)** Tìm một nghiệm tường minh $x^*$ và giá trị tối ưu $p^*$.
- **(b)** Xác định tập nghiệm $S^*$. Chỉ ra khi nào nghiệm không duy nhất, và chỉ ra giả thiết nào của Định lý 01.34 không thỏa trong trường hợp đó.
:::

::: hint Gợi ý 1
Hàm mục tiêu là $\sum_jc_jx_j$, và mỗi ràng buộc chỉ chứa một tọa độ. Cực tiểu từng số hạng $c_jx_j$ trên đoạn $[\underline x_j,\overline x_j]$, tách theo dấu của $c_j$.
:::

::: hint Gợi ý 2
Chứng nhận điểm tìm được bằng (7.3) với $\nabla f_0=c$. Với (b), viết $c^Tx-c^Tx^*$ thành tổng các số hạng $c_j(x_j-x_j^*)$ và xét khi nào tổng bằng $0$.
:::

::: solution Lời giải Bài tập 01.33
**Câu (a).** Đặt
$$
x_j^*=\begin{cases}\underline x_j&\text{nếu }c_j>0,\\ \overline x_j&\text{nếu }c_j<0,\\ \underline x_j&\text{nếu }c_j=0.\end{cases}
$$
Khi đó $x^*\in C$. Hàm $f_0$ affine nên lồi (Ví dụ 01.12(b)), khả vi trên tập mở và lồi $\mathbb R^d$, với $\nabla f_0=c$. Với $x\in C$, $c^T(x-x^*)=\sum_jc_j(x_j-x_j^*)$, và mỗi số hạng không âm:

- nếu $c_j>0$ thì $x_j-x_j^*=x_j-\underline x_j\ge0$;
- nếu $c_j<0$ thì $x_j-x_j^*=x_j-\overline x_j\le0$;
- nếu $c_j=0$ thì số hạng bằng $0$.

Vậy $x^*$ thỏa (7.3) và là nghiệm theo Hệ quả 01.26. Với $c_j^+=\max(c_j,0)$ và $c_j^-=\max(-c_j,0)$, giá trị tối ưu là
$$
p^*=\sum_{c_j>0}c_j\underline x_j+\sum_{c_j<0}c_j\overline x_j=\underline x^Tc^+-\overline x^Tc^- .
$$

**Câu (b).** Với $x\in C$, $c^Tx-p^*=\sum_jc_j(x_j-x_j^*)$ là tổng các số hạng không âm, nên bằng $0$ khi và chỉ khi mọi số hạng bằng $0$, tức $x_j=x_j^*$ với mọi $j$ có $c_j\ne0$. Do đó
$$
\begin{aligned}
S^*=\{x\in C\mid\ &x_j=\underline x_j\text{ khi }c_j>0,\\
&x_j=\overline x_j\text{ khi }c_j<0\},
\end{aligned}
$$
trong đó mỗi tọa độ $x_j$ với $c_j=0$ chạy tự do trên $[\underline x_j,\overline x_j]$. Tập này là một hộp, nên lồi, khớp với Hệ quả 01.33. Nghiệm duy nhất khi và chỉ khi $\underline x_j=\overline x_j$ với mọi $j$ có $c_j=0$. Nếu có $j$ với $c_j=0$ và $\underline x_j<\overline x_j$, bài toán có vô số nghiệm. Trong trường hợp đó, giả thiết lồi chặt của Định lý 01.34 không thỏa: $f_0$ affine không lồi chặt (Ví dụ 01.12(b)).

**Kiểm tra lại.** Với $d=2$, $\underline x=(0,0)$, $\overline x=(1,1)$: khi $c=(1,-2)$, $x^*=(0,1)$ và $p^*=-2=0\cdot1-1\cdot2$; khi $c=(1,0)$, $S^*=\{0\}\times[0,1]$ và $p^*=0$. Hộp $C$ không rỗng, đóng, bị chặn và $f_0$ liên tục, nên Định lý 01.35 cũng cho nghiệm tồn tại, khớp với (a).
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 1, 4, 5; lập mô hình tối ưu từ một mô tả bằng lời và áp dụng Thuật toán 01.47, kể cả các bước tồn tại và duy nhất.

::: exercise Bài tập 01.34 (Cực đại xác suất mua theo mô hình logistic; Boyd và Vandenberghe, Bài 4.61(a), tr. 210)
Biến ngẫu nhiên $Y\in\{0,1\}$ có
$$
\Pr(Y=1\mid x)=\frac{\exp(a^Tx+b)}{1+\exp(a^Tx+b)},
$$
trong đó $a\in\mathbb R^d$ và $b\in\mathbb R$ là các tham số đã biết. Sự kiện $Y=1$ là sự kiện một khách hàng mua sản phẩm, và $x\in\mathbb R^d$ là vector các yếu tố ảnh hưởng tới xác suất mua, như mức đầu tư quảng cáo, giá bán lẻ, giá khuyến mãi, chi phí bao bì. Biến $x$ phải thỏa các ràng buộc tuyến tính $\Gamma x\le\kappa$, với $\Gamma\in\mathbb R^{n_{\mathrm{in}}\times d}$ và $\kappa\in\mathbb R^{n_{\mathrm{in}}}$ đã biết. Mục tiêu là chọn $x$ làm cực đại $\Pr(Y=1\mid x)$.

- **(a)** Chỉ ra dữ kiện, biến quyết định, hàm mục tiêu và miền khả thi.
- **(b)** Đưa bài toán về một bài toán cực tiểu dạng (5.1) có hàm mục tiêu affine và cùng tập nghiệm.
- **(c)** Chứng nhận bài toán ở (b) là bài toán lồi theo các bước 4 và 5 của Thuật toán 01.47.
- **(d)** Theo các bước 7 và 8 của Thuật toán 01.47, xác định bài toán ở (b) có nghiệm với mọi $a$, $b$, $\Gamma$, $\kappa$ hay không, và khi có nghiệm thì nghiệm có duy nhất không.
:::

::: hint Gợi ý 1
Viết $\Pr(Y=1\mid x)=\sigma(a^Tx+b)$ với hàm sigmoid $\sigma$ của ghi chú, rồi xét tính đơn điệu của $\sigma$.
:::

::: hint Gợi ý 2
Từ $-\log\sigma(\zeta)=\ell(\zeta)$, $\sigma(\zeta)=e^{-\ell(\zeta)}$; dùng Mệnh đề 01.8(b). Viết miền $\{x\mid \Gamma x\le\kappa\}$ thành nghịch ảnh của tập $\{s\in\mathbb R^{n_{\mathrm{in}}}\mid s\le\kappa\}$ qua ánh xạ $x\mapsto \Gamma x$. Ở (d), đối chiếu $f_0$ và miền với giả thiết của Định lý 01.35, Định lý 01.38, Hệ quả 01.41 và Định lý 01.34.
:::

::: solution Lời giải Bài tập 01.34
**Câu (a).** Dữ kiện: $a\in\mathbb R^d$, $b\in\mathbb R$, $\Gamma\in\mathbb R^{n_{\mathrm{in}}\times d}$, $\kappa\in\mathbb R^{n_{\mathrm{in}}}$. Biến quyết định: $x\in\mathbb R^d$, với $D=\mathbb R^d$. Hàm cần cực đại: $\Pr(Y=1\mid x)$. Miền khả thi: $C=\{x\mid \Gamma x\le\kappa\}$, gồm $n_{\mathrm{in}}$ ràng buộc $f_i(x)=(\Gamma x)_i-\kappa_i\le0$, $i=1,\ldots,n_{\mathrm{in}}$.

**Câu (b).** Chia tử và mẫu cho $\exp(a^Tx+b)$: $\Pr(Y=1\mid x)=\sigma(z(x))$ với $z(x)=a^Tx+b$. Vì $\sigma(\zeta)=e^{-\ell(\zeta)}$, $\ell$ giảm chặt (Mệnh đề 01.8(b)) và hàm mũ tăng chặt, $\sigma$ tăng chặt trên $\mathbb R$. Do đó với $x,x'\in C$, $\Pr(Y=1\mid x)\ge\Pr(Y=1\mid x')$ khi và chỉ khi $z(x)\ge z(x')$. Vậy $x^*$ cực đại $\Pr(Y=1\mid x)$ trên $C$ khi và chỉ khi $x^*$ cực đại $z$ trên $C$, tức cực tiểu $-z$ trên $C$. Bài toán dạng (5.1) là
$$
\begin{aligned}
&\underset{x\in\mathbb R^d}{\operatorname{minimize}}\quad f_0(x)=-a^Tx-b\\
&\text{với ràng buộc}\quad \Gamma x\le\kappa,
\end{aligned}
$$
có cùng tập nghiệm với bài toán ban đầu. Khi bài toán có nghiệm $x^*$, xác suất mua lớn nhất là $\Pr(Y=1\mid x^*)=\sigma(-p^*)$, vì $p^*=f_0(x^*)=-z(x^*)$.

**Câu (c).** *Bước 4 (miền lồi).* Tập $E=\{s\in\mathbb R^{n_{\mathrm{in}}}\mid s\le\kappa\}$ là giao của $n_{\mathrm{in}}$ nửa không gian $\{s\mid e_i^Ts\le\kappa_i\}$ (Mệnh đề 01.18(c) với vector $e_i\ne0$ và vế phải $\kappa_i$), nên lồi theo Mệnh đề 01.19(a). Miền $C=\{x\mid \Gamma x\in E\}$ là nghịch ảnh của $E$ qua ánh xạ tuyến tính $x\mapsto \Gamma x$, nên lồi theo Mệnh đề 01.19(c).

*Bước 5 (mục tiêu lồi).* $f_0$ affine, nên lồi (Ví dụ 01.12(b)).

Do đó bài toán ở (b) là bài toán lồi, và theo bước 6 của Thuật toán 01.47, mọi cực tiểu địa phương của nó là cực tiểu toàn cục (Định lý 01.32).

**Câu (d).** *Bước 7 (tồn tại).* Miền $C$ đóng: nếu $x^{(k)}\in C$ và $x^{(k)}\to x$ thì $\Gamma x^{(k)}\to\Gamma x$, và giới hạn giữ bất đẳng thức $(\Gamma x^{(k)})_i\le\kappa_i$, nên $\Gamma x\le\kappa$. Hàm $f_0$ liên tục. Do đó nghiệm tồn tại trong hai trường hợp sau:

- $C$ không rỗng và bị chặn (Định lý 01.35);
- $C$ không rỗng, không bị chặn và $f_0$ cưỡng bức trên $C$ (Định nghĩa 01.37, Định lý 01.38).

Hệ quả 01.41 không áp dụng được: $\nabla^2f_0=0$, nên không có $\mu>0$ với $\nabla^2f_0\succeq\mu I_d$ (Nhận xét 01.40). Ngoài hai trường hợp trên, kết luận tồn tại có thể mất. Ví dụ: với $d=1$, $a=1$, $b=0$, $\Gamma=-1$, $\kappa=0$, miền là $C=\{x\mid-x\le0\}=[0,\infty)$ và $f_0(x)=-x$ không bị chặn dưới trên $C$, nên $p^*=-\infty$ và bài toán không có nghiệm; xác suất mua $\sigma(x)$ tăng dần tới $1$ mà không đạt giá trị lớn nhất. Theo điều kiện dừng của Thuật toán 01.47, khi bước 7 thất bại, ta ghi rằng sự tồn tại chưa được bảo đảm.

*Bước 8 (duy nhất).* $f_0$ affine không lồi chặt (Ví dụ 01.12(b)), nên Định lý 01.34 không áp dụng được. Ví dụ: với $a=0$, $f_0\equiv-b$ là hằng số, nên khi $C$ không rỗng, mọi điểm của $C$ là nghiệm; khi $C$ có hơn một điểm, nghiệm không duy nhất.

**Kiểm tra lại.** Với $d=1$, $a=1$, $b=0$ và một ràng buộc $x\le2$ ($\Gamma=1$, $\kappa=2$): $f_0(x)=-x$ có nghiệm $x^*=2$ trên $(-\infty,2]$ và $p^*=-2$; xác suất mua lớn nhất là $\sigma(2)=1/(1+e^{-2})\approx0{,}8808$, lớn hơn $\Pr(Y=1\mid x=0)=\sigma(0)=\tfrac12$. Ở đây $C=(-\infty,2]$ không bị chặn, nhưng $f_0(x)=-x\to+\infty$ khi $x\to-\infty$ trong $C$, nên $f_0$ cưỡng bức trên $C$ và Định lý 01.38 cũng cho nghiệm tồn tại.
:::

## Tài liệu tham khảo

- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press:
  - Chương 2, mục Exercises: Bài 2.1 và 2.3 (Definition of convexity, tr. 60), Bài 2.12(a)–(c) (Examples, tr. 61), Bài 2.15(a)–(g) (Examples, tr. 62);
  - Chương 3, mục Exercises: Bài 3.1 (Definition of convexity, tr. 113), Bài 3.7 (Definition of convexity, tr. 114), Bài 3.16(a)–(c), (e) và 3.20(a) (Examples, tr. 116), Bài 3.32(a) (Operations that preserve convexity, tr. 119), Bài 3.49(a) (Log-concave and log-convex functions, tr. 122);
  - Chương 4, mục Exercises: Bài 4.3 (Basic terminology and optimality conditions, tr. 189), Bài 4.8(c) (Linear optimization problems, tr. 192), Bài 4.61(a) (Miscellaneous problems, tr. 210).
