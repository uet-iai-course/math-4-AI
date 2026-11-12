# Bài tập Bài 11 — Học từ dữ liệu qua ước lượng thống kê

Các bài tập dưới đây, đánh số tiếp theo các bài tập trong ghi chú, đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-11/lecture-note.md&deck=lecture-11-hoc-tu-du-lieu-uoc-luong-thong-ke.html) và [bài giảng](lecture-11-hoc-tu-du-lieu-uoc-luong-thong-ke.html) của Bài 11. Các bài lấy từ mục bài tập của Murphy (2022), Chương 3, 4 và 7; số trang là trang in của bản trực tuyến do tác giả công bố. Lời giải dẫn định nghĩa, định lý, mệnh đề, ví dụ và công thức theo số hiệu của ghi chú. Ký hiệu theo ghi chú gồm:

- $L$ và $\ell$ là hàm hợp lý và log-hợp lý (4.1), $\log$ là logarit tự nhiên;
- $\mathcal N(\mu,v)$ là Gaussian một chiều với phương sai $v=\sigma^2$, $\mathcal N(\mu,\Sigma)$ là Gaussian nhiều chiều, $d_\Sigma$ là khoảng cách Mahalanobis (8.8);
- $\lvert\Sigma\rvert$ là định thức của $\Sigma$, như cách viết của sách, $\operatorname{tr}$ là vết;
- khi một bài giữ ký hiệu của sách ($N$ cho cỡ mẫu, $y_n$ cho quan sát, $D$ cho số chiều), đề bài nói rõ.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Mô hình thống kê, mẫu, bộ ước lượng, hàm hợp lý theo cách lấy mẫu | — | 11.7, 11.8 |
| 2. Ước lượng hợp lý cực đại Bernoulli, kể cả nghiệm biên | 11.1 | 11.7 |
| 3. Ước lượng hợp lý cực đại phân loại bằng nhân tử Lagrange | 11.2 | 11.7 |
| 4. Ước lượng Gaussian, điều kiện tồn tại, ước lượng không chệch | 11.4 | 11.6, 11.8, 11.9, 11.12 |
| 5. Trị riêng, vector riêng, khoảng cách Mahalanobis | 11.3, 11.4 | 11.5, 11.10, 11.13 |
| 6. Hàm mất mát suy ra từ giả thiết phân phối | — | 11.11 |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 5; đọc trị riêng và vector riêng thành trục của đường đồng mức Gaussian.

::: exercise Bài tập 11.5 (Trị riêng của một ma trận đường chéo; Murphy, Bài 7.2, tr. 274)
Cho ma trận

$$
A=\begin{pmatrix}2&0\\0&3\end{pmatrix}.
$$

- (a) Tìm các trị riêng và vector riêng của $A$ bằng tính tay.
- (b) Xem $A$ là ma trận hiệp phương sai của một Gaussian hai chiều có trung bình $0$. Tìm hướng và độ dài các bán trục của elip $d_A^2(x,0)=1$.
:::

::: hint Gợi ý
Giải phương trình $\det(A-\lambda I_2)=0$. Ở (b), dùng Mệnh đề 11.17(b) với $c=1$.
:::

::: solution Lời giải Bài tập 11.5
**Câu (a).** Ta có $\det(A-\lambda I_2)=(2-\lambda)(3-\lambda)$, nên hai trị riêng là $\lambda_1=2$ và $\lambda_2=3$.

- Với $\lambda_1=2$: $(A-2I_2)w=(0,\ w_2)^\top=0$ cho $w_2=0$, nên các vector riêng là $w=t(1,0)^\top$ với $t\ne0$; vector riêng đơn vị là $e_1=(1,0)^\top$.
- Với $\lambda_2=3$: $(A-3I_2)w=(-w_1,\ 0)^\top=0$ cho $w_1=0$, nên các vector riêng là $w=t(0,1)^\top$ với $t\ne0$; vector riêng đơn vị là $e_2=(0,1)^\top$.

**Câu (b).** Phân rã $A=U\operatorname{diag}(2,3)U^\top$ có $U=I_2$, nên tọa độ riêng của $x$ là chính $x$. Theo (8.9),

$$
d_A^2(x,0)=\frac{x_1^2}2+\frac{x_2^2}3,
$$

và elip $d_A^2(x,0)=1$ có bán trục $\sqrt2\approx1{,}41$ theo hướng $e_1$, bán trục $\sqrt3\approx1{,}73$ theo hướng $e_2$ (Mệnh đề 11.17(b)).

**Kiểm tra lại.** $Ae_1=(2,0)^\top=2e_1$ và $Ae_2=(0,3)^\top=3e_2$. Tổng hai trị riêng là $5=\operatorname{tr}A$, tích là $6=\det A$. Điểm $(\sqrt2,0)^\top$ cho $d_A^2=2/2=1$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 4; nhận lại hai bước của Định lý 11.9 từ điều kiện dừng.

::: exercise Bài tập 11.6 (Ước lượng hợp lý cực đại của Gaussian một chiều; Murphy, Bài 4.1, tr. 164)
Cho dữ liệu $y_1,\ldots,y_N$ của một mẫu i.i.d. $\mathcal N(\mu,\sigma^2)$ với $\mu\in\mathbb R$, $\sigma^2>0$ chưa biết, và các $y_n$ không bằng nhau hết. Chứng minh ước lượng hợp lý cực đại của Gaussian một chiều là

$$
\begin{aligned}
\hat\mu&=\frac1N\sum_{n=1}^Ny_n,\\
\hat\sigma^2&=\frac1N\sum_{n=1}^N(y_n-\hat\mu)^2.
\end{aligned}
$$
:::

::: hint Gợi ý
Viết $v=\sigma^2$, tính $\partial\ell/\partial\mu$ và $\partial\ell/\partial v$ để tìm điểm dừng. Để chứng minh điểm dừng là cực đại toàn cục, dùng đẳng thức (7.3) và xét dấu của đạo hàm theo $v$.
:::

::: solution Lời giải Bài tập 11.6
Đặt $v=\sigma^2$, $\bar y=\frac1N\sum_ny_n$ và $Q=\sum_n(y_n-\bar y)^2$. Theo (7.1), với $\mu\in\mathbb R$ và $v>0$,

$$
\begin{aligned}
\ell(\mu,v)&=-\frac N2\log(2\pi v)\\
&\quad-\frac1{2v}\sum_{n=1}^N(y_n-\mu)^2.
\end{aligned}
$$

**Điểm dừng.** Hai đạo hàm riêng là

$$
\begin{aligned}
\frac{\partial\ell}{\partial\mu}&=\frac1v\sum_{n=1}^N(y_n-\mu),\\
\frac{\partial\ell}{\partial v}&=-\frac N{2v}+\frac1{2v^2}\sum_{n=1}^N(y_n-\mu)^2.
\end{aligned}
$$

Đạo hàm thứ nhất bằng $0$ khi và chỉ khi $\mu=\bar y$. Thế vào đạo hàm thứ hai, nó bằng $0$ khi và chỉ khi $v=Q/N$. Điểm dừng duy nhất là $(\bar y,Q/N)$, đúng hai công thức của đề.

**Cực đại toàn cục khi $Q>0$.** Theo (7.3), $\sum_n(y_n-\mu)^2=Q+N(\mu-\bar y)^2$, nên với mọi $v>0$,

$$
\begin{aligned}
\ell(\mu,v)&=-\frac N2\log(2\pi v)-\frac Q{2v}\\
&\quad-\frac{N(\mu-\bar y)^2}{2v}\\
&\le\ell(\bar y,v),
\end{aligned}
$$

với dấu bằng khi và chỉ khi $\mu=\bar y$. Hàm $\varphi(v)=\ell(\bar y,v)$ có $\varphi'(v)=(Q-Nv)/(2v^2)$, dương khi $v<Q/N$ và âm khi $v>Q/N$, nên đạt cực đại duy nhất tại $v=Q/N$. Do đó $\ell(\mu,v)\le\ell(\bar y,v)\le\ell(\bar y,Q/N)$ với dấu bằng chỉ tại $(\bar y,Q/N)$.

**Trường hợp $Q=0$.** Khi mọi $y_n$ bằng nhau, $\ell(\bar y,v)=-\frac N2\log(2\pi v)\to+\infty$ khi $v\downarrow0$, và công thức cho $\hat\sigma^2=0$, nằm ngoài miền $v>0$. Khi đó không tồn tại ước lượng hợp lý cực đại (Định lý 11.9).

**Kiểm tra lại.** Tại $(\bar y,Q/N)$: $\sum_n(y_n-\bar y)=N\bar y-N\bar y=0$ và $\partial\ell/\partial v=\bigl(Q-N\cdot Q/N\bigr)/(2v^2)=0$, đúng hai điều kiện dừng.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2, 3; viết hàm hợp lý theo cơ chế sinh dữ liệu, tách thành hai bài toán Bernoulli, và so với mô hình phân loại trên bốn ô.

::: exercise Bài tập 11.7 (Đồng xu và người báo kết quả không tin cậy; Murphy, Bài 4.5, tr. 165–166)
Gọi $x\in\{0,1\}$ là kết quả tung một đồng xu. Đồng xu có thể lệch: mặt ứng với $x=1$ xuất hiện với xác suất $\theta_1$. Một người khác quan sát lần tung và báo lại kết quả $y$, nhưng chỉ báo đúng với xác suất $\theta_2$:

| | $y=0$ | $y=1$ |
|---|---|---|
| $x=0$ | $\theta_2$ | $1-\theta_2$ |
| $x=1$ | $1-\theta_2$ | $\theta_2$ |

Bảng ghi $p(y\mid x,\theta_2)$; $\theta_2$ không phụ thuộc $x$ và $\theta_1$. Dữ liệu gồm bảy cặp độc lập cùng phân phối, với

$$
\begin{aligned}
x&=(1,1,0,1,1,0,0),\\
y&=(1,0,0,0,1,0,1).
\end{aligned}
$$

- (a) Viết phân phối đồng thời $p(x,y\mid\theta)$ thành bảng $2\times2$ theo $\theta=(\theta_1,\theta_2)$.
- (b) Tìm ước lượng hợp lý cực đại của $\theta_1$ và $\theta_2$ và giải thích. Tính $p(D\mid\hat\theta,M_2)$, trong đó $M_2$ là mô hình hai tham số này.
- (c) Xét mô hình bốn tham số $\theta=(\theta_{0,0},\theta_{0,1},\theta_{1,0},\theta_{1,1})$ với $p(x,y\mid\theta)=\theta_{x,y}$; chỉ ba tham số tự do vì tổng của chúng bằng $1$. Tìm ước lượng hợp lý cực đại của $\theta$ và tính $p(D\mid\hat\theta,M_4)$, trong đó $M_4$ là mô hình bốn tham số.
:::

::: hint Gợi ý
Hàm hợp lý tách thành tích $p(x,y\mid\theta)=p(y\mid x,\theta_2)\,p(x\mid\theta_1)$. Ở (b), mỗi thừa số là một hàm hợp lý Bernoulli: đếm số lần $x_i=1$ và số lần $y_i=x_i$. Ở (c), mô hình là phân phối phân loại trên bốn ô $(x,y)$.
:::

::: solution Lời giải Bài tập 11.7
**Câu (a).** Theo quy tắc nhân, $p(x,y\mid\theta)=p(x\mid\theta_1)\,p(y\mid x,\theta_2)$, nên

| | $y=0$ | $y=1$ |
|---|---|---|
| $x=0$ | $(1-\theta_1)\theta_2$ | $(1-\theta_1)(1-\theta_2)$ |
| $x=1$ | $\theta_1(1-\theta_2)$ | $\theta_1\theta_2$ |

Tổng bốn ô bằng $(1-\theta_1)+\theta_1=1$.

**Câu (b).** Bảy cặp $(x_i,y_i)$ là

- $(1,1)$, $(1,0)$, $(0,0)$, $(1,0)$, $(1,1)$, $(0,0)$, $(0,1)$.

Có $4$ lần $x_i=1$, và $4$ cặp có $y_i=x_i$ (cặp thứ nhất, thứ ba, thứ năm, thứ sáu). Vì các cặp độc lập, hàm hợp lý là tích bảy giá trị của bảng ở (a):

$$
\begin{aligned}
L(\theta_1,\theta_2)&=g(\theta_1)\,h(\theta_2),\\
g(\theta_1)&=\theta_1^4(1-\theta_1)^3,\\
h(\theta_2)&=\theta_2^4(1-\theta_2)^3.
\end{aligned}
$$

Mỗi thừa số có dạng (5.1) với $s=4$, $n=7$, nên theo Định lý 11.4, $g$ đạt cực đại duy nhất trên $[0,1]$ tại $\hat\theta_1=4/7$, và $h$ đạt cực đại duy nhất tại $\hat\theta_2=4/7$. Với mọi $(\theta_1,\theta_2)\in[0,1]^2$, vì $g,h\ge0$,

$$
\begin{aligned}
L(\theta_1,\theta_2)&\le g(\hat\theta_1)\,h(\theta_2)\\
&\le g(\hat\theta_1)\,h(\hat\theta_2),
\end{aligned}
$$

và dấu bằng chỉ xảy ra khi $\theta_1=\hat\theta_1$, $\theta_2=\hat\theta_2$, vì $g(\hat\theta_1)>0$ và $h(\hat\theta_2)>0$. Vậy $\hat\theta=(4/7,\,4/7)$. Giá trị hợp lý tại đó là

$$
\begin{aligned}
p(D\mid\hat\theta,M_2)&=\Bigl[\Bigl(\frac47\Bigr)^4\Bigl(\frac37\Bigr)^3\Bigr]^2\\
&=\frac{4^8\cdot3^6}{7^{14}}\\
&=\frac{47\,775\,744}{678\,223\,072\,849}\\
&\approx7{,}04\cdot10^{-5}.
\end{aligned}
$$

**Câu (c).** Mô hình $M_4$ là phân phối phân loại trên bốn ô, với số đếm

- $n_{0,0}=2$ (cặp thứ ba và thứ sáu), $n_{0,1}=1$ (cặp thứ bảy), $n_{1,0}=2$ (cặp thứ hai và thứ tư), $n_{1,1}=2$ (cặp thứ nhất và thứ năm).

Theo Định lý 11.7, $\hat\theta_{x,y}=n_{x,y}/7$, tức $\hat\theta=(2/7,\,1/7,\,2/7,\,2/7)$. Do đó

$$
\begin{aligned}
p(D\mid\hat\theta,M_4)&=\Bigl(\frac27\Bigr)^2\cdot\frac17\\
&\quad\cdot\Bigl(\frac27\Bigr)^2\cdot\Bigl(\frac27\Bigr)^2\\
&=\frac{2^6}{7^7}\\
&=\frac{64}{823\,543}\\
&\approx7{,}77\cdot10^{-5}.
\end{aligned}
$$

**Kiểm tra lại.** Tổng số đếm $2+1+2+2=7$. Mỗi $\theta$ của $M_2$ cho một bảng ở (a) thuộc $M_4$, nên hợp lý cực đại của $M_4$ không nhỏ hơn của $M_2$: $7{,}77\cdot10^{-5}\ge7{,}04\cdot10^{-5}$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 1, 4; xem phương sai hợp lý cực đại là một hàm của mẫu ngẫu nhiên và tính kỳ vọng của nó.

::: exercise Bài tập 11.8 (Phương sai hợp lý cực đại là ước lượng chệch; Murphy, Bài 4.7, tr. 166)
Cho $X_1,\ldots,X_N$ là mẫu i.i.d. $\mathcal N(\mu,\sigma^2)$ với $\sigma^2>0$, và $\hat\mu=\frac1N\sum_nX_n$. Chứng minh bộ ước lượng

$$
\hat\sigma^2_{\mathrm{MLE}}=\frac1N\sum_{n=1}^N(X_n-\hat\mu)^2
$$

là ước lượng chệch của $\sigma^2$, tức là

$$
\begin{aligned}
&\mathbb E_{X_1,\ldots,X_N\sim\mathcal N(\mu,\sigma^2)}\\
&\quad\bigl[\hat\sigma^2(X_1,\ldots,X_N)\bigr]\ne\sigma^2.
\end{aligned}
$$
:::

::: hint Gợi ý
Viết $\hat\sigma^2=\frac1N\sum_nX_n^2-\hat\mu^2$. Các $X_n$ độc lập, và kỳ vọng của tích hai biến độc lập bằng tích các kỳ vọng.
:::

::: solution Lời giải Bài tập 11.8
**Đưa về mômen bậc hai.** Khai triển bình phương và dùng $\frac1N\sum_nX_n=\hat\mu$:

$$
\begin{aligned}
\hat\sigma^2&=\frac1N\sum_{n=1}^NX_n^2\\
&\quad-2\hat\mu\cdot\frac1N\sum_{n=1}^NX_n+\hat\mu^2\\
&=\frac1N\sum_{n=1}^NX_n^2-\hat\mu^2.
\end{aligned}
$$

**Kỳ vọng của từng số hạng.** Với mỗi $n$, $\mathbb E[X_n^2]=\operatorname{Var}X_n+(\mathbb EX_n)^2=\sigma^2+\mu^2$. Với $m\ne n$, $X_m$ và $X_n$ độc lập nên $\operatorname{Cov}(X_m,X_n)=0$ (Mệnh đề 10.27), tức $\mathbb E[X_mX_n]=\mathbb EX_m\,\mathbb EX_n=\mu^2$. Trong tổng kép $\hat\mu^2=\frac1{N^2}\sum_m\sum_nX_mX_n$ có $N$ số hạng với $m=n$ và $N(N-1)$ số hạng với $m\ne n$, nên

$$
\begin{aligned}
\mathbb E[\hat\mu^2]&=\frac1{N^2}\bigl[N(\sigma^2+\mu^2)\\
&\qquad+N(N-1)\mu^2\bigr]\\
&=\frac{\sigma^2}N+\mu^2.
\end{aligned}
$$

**Kết luận.** Theo tính tuyến tính của kỳ vọng,

$$
\begin{aligned}
\mathbb E[\hat\sigma^2]&=(\sigma^2+\mu^2)-\Bigl(\frac{\sigma^2}N+\mu^2\Bigr)\\
&=\frac{N-1}N\sigma^2.
\end{aligned}
$$

Vì $\sigma^2>0$, $\mathbb E[\hat\sigma^2]=\sigma^2-\sigma^2/N<\sigma^2$: bộ ước lượng chệch, với độ chệch $-\sigma^2/N$ (Định nghĩa 11.10).

**Kiểm tra lại.** Kết quả trùng (7.4) của Mệnh đề 11.11 với $Q_X/n=\hat\sigma^2$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 4; tìm ước lượng hợp lý cực đại khi một tham số đã biết và kiểm tra tính không chệch.

::: exercise Bài tập 11.9 (Ước lượng phương sai khi đã biết trung bình; Murphy, Bài 4.8, tr. 166)
Cho dữ liệu $x_1,\ldots,x_N$ của một mẫu i.i.d. $\mathcal N(\mu,\sigma^2)$, trong đó $\mu$ là một hằng số đã biết. Tìm biểu thức của ước lượng hợp lý cực đại của $\sigma^2$ trong trường hợp này. Ước lượng đó có không chệch không?
:::

::: hint Gợi ý
Log-hợp lý chỉ còn một biến $v=\sigma^2>0$. Xét dấu của $\ell'(v)$ như Bước 2 của chứng minh Định lý 11.9, với $Q$ thay bằng $\sum_n(x_n-\mu)^2$.
:::

::: solution Lời giải Bài tập 11.9
**Ước lượng.** Đặt $v=\sigma^2$ và $Q_\mu=\sum_n(x_n-\mu)^2$. Theo (7.1) với $\mu$ cố định,

$$
\begin{aligned}
\ell(v)&=-\frac N2\log(2\pi v)-\frac{Q_\mu}{2v},\\
\ell'(v)&=-\frac N{2v}+\frac{Q_\mu}{2v^2}\\
&=\frac{Q_\mu-Nv}{2v^2}.
\end{aligned}
$$

Nếu $Q_\mu>0$, đạo hàm dương khi $v<Q_\mu/N$ và âm khi $v>Q_\mu/N$, nên ước lượng hợp lý cực đại duy nhất là

$$
\hat v=\frac1N\sum_{n=1}^N(x_n-\mu)^2.
$$

Nếu $Q_\mu=0$, tức mọi $x_n=\mu$, thì $\ell(v)=-\frac N2\log(2\pi v)\to+\infty$ khi $v\downarrow0$ và không tồn tại ước lượng hợp lý cực đại với $v>0$.

**Tính không chệch.** Xét bộ ước lượng $\hat v(X_1,\ldots,X_N)=\frac1N\sum_n(X_n-\mu)^2$. Với mỗi $n$, $\mathbb E[(X_n-\mu)^2]=\operatorname{Var}X_n=\sigma^2$ vì $\mathbb EX_n=\mu$. Theo tính tuyến tính,

$$
\mathbb E[\hat v]=\frac1N\cdot N\sigma^2=\sigma^2,
$$

với mọi $\sigma^2>0$. Vậy bộ ước lượng không chệch.

**Kiểm tra lại.** Theo (7.3), $Q_\mu=Q+N(\bar x-\mu)^2\ge Q$, với $Q=\sum_n(x_n-\bar x)^2$. Khi $\mu$ đã biết, các sai lệch được đo quanh $\mu$ chứ không quanh $\bar x$, nên không có lượng $\sigma^2/N$ nào bị mất như ở Bài tập 11.8.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 5; tính ma trận hiệp phương sai và kỳ vọng của dạng toàn phương, là các công cụ của (8.2) và Nhận xét 11.18.

::: exercise Bài tập 11.10 (Tổ hợp tuyến tính của vector ngẫu nhiên; Murphy, Bài 3.4, tr. 104)
Cho $x\in\mathbb R^d$ là vector ngẫu nhiên có vector kỳ vọng $m$ và ma trận hiệp phương sai $\Sigma$ (mọi tọa độ có mômen bậc hai hữu hạn). Cho $A$ và $B$ là các ma trận.

- (a) Tính ma trận hiệp phương sai của $Ax$, với $A\in\mathbb R^{k\times d}$.
- (b) Chứng minh $\operatorname{tr}(AB)=\operatorname{tr}(BA)$, với $A\in\mathbb R^{k\times d}$ và $B\in\mathbb R^{d\times k}$.
- (c) Tìm biểu thức của $\mathbb E[x^\top Ax]$, với $A\in\mathbb R^{d\times d}$.
:::

::: hint Gợi ý
Ở (a), viết $Ax-\mathbb E[Ax]=A(x-m)$ và dùng tính tuyến tính của kỳ vọng theo từng phần tử. Ở (c), viết số $x^\top Ax$ thành vết $\operatorname{tr}(Axx^\top)$ nhờ (b), rồi dùng $\mathbb E[xx^\top]=\Sigma+mm^\top$.
:::

::: solution Lời giải Bài tập 11.10
**Câu (a).** Mỗi tọa độ của $Ax$ là tổ hợp tuyến tính của các tọa độ của $x$, nên $\mathbb E[Ax]=Am$ và $Ax-\mathbb E[Ax]=A(x-m)$. Phần tử $(i,j)$ của $A(x-m)(x-m)^\top A^\top$ là $\sum_{k,l}A_{ik}(x_k-m_k)(x_l-m_l)A_{jl}$, nên theo tính tuyến tính của kỳ vọng

$$
\begin{aligned}
&\operatorname{Cov}(Ax)\\
&\quad=\mathbb E\bigl[A(x-m)(x-m)^\top A^\top\bigr]\\
&\quad=A\,\mathbb E\bigl[(x-m)(x-m)^\top\bigr]A^\top\\
&\quad=A\Sigma A^\top.
\end{aligned}
$$

**Câu (b).** Hai ma trận $AB\in\mathbb R^{k\times k}$ và $BA\in\mathbb R^{d\times d}$ đều vuông, và

$$
\begin{aligned}
\operatorname{tr}(AB)&=\sum_{i=1}^k(AB)_{ii}\\
&=\sum_{i=1}^k\sum_{j=1}^dA_{ij}B_{ji}\\
&=\sum_{j=1}^d\sum_{i=1}^kB_{ji}A_{ij}\\
&=\sum_{j=1}^d(BA)_{jj}\\
&=\operatorname{tr}(BA).
\end{aligned}
$$

**Câu (c).** Số $x^\top Ax$ bằng vết của ma trận $1\times1$ của nó, nên theo (b) với $x^\top$ và $Ax$, $x^\top Ax=\operatorname{tr}(x^\top Ax)=\operatorname{tr}(Axx^\top)$. Khai triển định nghĩa (8.1),

$$
\begin{aligned}
\Sigma&=\mathbb E[(x-m)(x-m)^\top]\\
&=\mathbb E[xx^\top]-mm^\top,
\end{aligned}
$$

nên $\mathbb E[xx^\top]=\Sigma+mm^\top$. Vết là hàm tuyến tính của các phần tử, nên

$$
\begin{aligned}
&\mathbb E[x^\top Ax]\\
&\quad=\operatorname{tr}\bigl(A\,\mathbb E[xx^\top]\bigr)\\
&\quad=\operatorname{tr}(A\Sigma)+\operatorname{tr}(Amm^\top)\\
&\quad=\operatorname{tr}(A\Sigma)+m^\top Am.
\end{aligned}
$$

**Kiểm tra lại.** Với $k=1$ và $A=w^\top$, (a) cho $\operatorname{Var}(w^\top x)=w^\top\Sigma w$, đúng (8.2). Với $d=1$, (c) cho $\mathbb E[aX^2]=a(\sigma^2+m^2)$, đúng $\mathbb E[X^2]=\operatorname{Var}X+(\mathbb EX)^2$.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 6; suy ra hàm mất mát có trọng số từ giả thiết về phương sai của hai cảm biến.

::: exercise Bài tập 11.11 (Gộp số đo của hai cảm biến; Murphy, Bài 3.7, tr. 105)
Hai cảm biến có phương sai đã biết và khác nhau $v_1$, $v_2$, cùng đo một trung bình chưa biết $\mu$. Ta quan sát $n_1$ giá trị $y_i^{(1)}\sim\mathcal N(\mu,v_1)$ từ cảm biến thứ nhất và $n_2$ giá trị $y_i^{(2)}\sim\mathcal N(\mu,v_2)$ từ cảm biến thứ hai; mọi quan sát độc lập và $n_1+n_2\ge1$. Chẳng hạn, $\mu$ là nhiệt độ thật ngoài trời, cảm biến thứ nhất là một thiết bị đo nhiệt kỹ thuật số chính xác (phương sai nhỏ), cảm biến thứ hai là một nhiệt kế thủy ngân kém chính xác (phương sai lớn). Gọi $D$ là toàn bộ dữ liệu của hai cảm biến.

- (a) Tìm phân phối hậu nghiệm $q(\mu\mid D)$ với tiên nghiệm không thông tin cho $\mu$, mô phỏng bằng một Gaussian có độ chính xác (nghịch đảo của phương sai) bằng $0$. Cho biểu thức tường minh của trung bình và phương sai hậu nghiệm.
- (b) Viết $-\log q(\mu\mid D)$ theo $\mu$, bỏ các số hạng không phụ thuộc $\mu$, và so sánh trọng số của số đo hai cảm biến trong hàm này.
:::

::: hint Gợi ý
Dùng tiên nghiệm $\mathcal N(m_0,s^2)$, nhân với hàm hợp lý như ở §4.2 của ghi chú, gom các số hạng chứa $\mu^2$ và $\mu$ trong số mũ rồi viết thành $-\frac a2(\mu-c)^2$ cộng hằng số. Cuối cùng cho độ chính xác $1/s^2$ tiến về $0$.
:::

::: solution Lời giải Bài tập 11.11
**Câu (a).** Với $n_k\ge1$, đặt $\bar y^{(k)}=\frac1{n_k}\sum_iy_i^{(k)}$; khi $n_k=0$, quy ước $n_k\bar y^{(k)}=0$. Với tiên nghiệm $\mathcal N(m_0,s^2)$, hậu nghiệm tỉ lệ với $L(\mu;D)\,q(\mu)$, tức với $e^{E(\mu)}$, trong đó

$$
\begin{aligned}
E(\mu)&=-\sum_{i=1}^{n_1}\frac{(y_i^{(1)}-\mu)^2}{2v_1}\\
&\quad-\sum_{i=1}^{n_2}\frac{(y_i^{(2)}-\mu)^2}{2v_2}\\
&\quad-\frac{(\mu-m_0)^2}{2s^2}.
\end{aligned}
$$

Vì $\sum_i(y_i-\mu)^2=\sum_iy_i^2-2\mu n\bar y+n\mu^2$, các số hạng chứa $\mu$ là

$$
\begin{aligned}
E(\mu)&=-\frac a2\mu^2+b\mu+\text{hằng số}\\
&=-\frac a2\Bigl(\mu-\frac ba\Bigr)^2\\
&\quad+\text{hằng số},
\end{aligned}
$$

với

$$
\begin{aligned}
a&=\frac{n_1}{v_1}+\frac{n_2}{v_2}+\frac1{s^2},\\
b&=\frac{n_1\bar y^{(1)}}{v_1}+\frac{n_2\bar y^{(2)}}{v_2}+\frac{m_0}{s^2}.
\end{aligned}
$$

Hàm $e^{-\frac a2(\mu-b/a)^2}$ với $a>0$ chuẩn hóa thành mật độ $\mathcal N(b/a,\,1/a)$ (Định nghĩa 10.20), nên hậu nghiệm là $\mathcal N(b/a,1/a)$. Cho độ chính xác $1/s^2\to0$, ta được hậu nghiệm $\mathcal N(\mu_D,v_D)$ với

$$
\begin{aligned}
\frac1{v_D}&=\frac{n_1}{v_1}+\frac{n_2}{v_2},\\
\mu_D&=v_D\Bigl(\frac{n_1\bar y^{(1)}}{v_1}+\frac{n_2\bar y^{(2)}}{v_2}\Bigr)\\
&=\frac{n_1v_2\,\bar y^{(1)}+n_2v_1\,\bar y^{(2)}}{n_1v_2+n_2v_1},
\end{aligned}
$$

tức phương sai hậu nghiệm là $v_D=v_1v_2/(n_1v_2+n_2v_1)$. Kết quả này trùng với việc lấy $q(\mu)\propto1$ ngay từ đầu: khi đó $a$ và $b$ không có số hạng chứa $s^2$.

**Câu (b).** Với $1/s^2=0$,

$$
\begin{aligned}
&-\log q(\mu\mid D)\\
&\quad=\frac1{2v_1}\sum_{i=1}^{n_1}(y_i^{(1)}-\mu)^2\\
&\qquad+\frac1{2v_2}\sum_{i=1}^{n_2}(y_i^{(2)}-\mu)^2\\
&\qquad+\text{hằng số}.
\end{aligned}
$$

Đây là tổng bình phương sai lệch có trọng số: mỗi số đo của cảm biến $k$ có trọng số $1/(2v_k)$, nên cảm biến có phương sai nhỏ hơn có trọng số lớn hơn. Đạo hàm theo $\mu$ là $\frac{n_1}{v_1}(\mu-\bar y^{(1)})+\frac{n_2}{v_2}(\mu-\bar y^{(2)})$, bằng $0$ tại $\mu=\mu_D$. Với $1/s^2=0$, hàm trên bằng $-\ell(\mu;D)$ cộng hằng số, là hàm bậc hai có hệ số của $\mu^2$ dương, nên theo Mệnh đề 11.3, $\mu_D$ cũng là ước lượng hợp lý cực đại.

**Kiểm tra lại.** Với $v_1=v_2=v$: $\mu_D=(n_1\bar y^{(1)}+n_2\bar y^{(2)})/(n_1+n_2)$ là trung bình của cả $n_1+n_2$ số đo, và $v_D=v/(n_1+n_2)$, đúng phương sai của trung bình mẫu. Với $n_2=0$: $\mu_D=\bar y^{(1)}$ và $v_D=v_1/n_1$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 4; dùng ước lượng hợp lý cực đại của hai mô hình Gaussian để so sánh chúng bằng một hàm log-hợp lý có phạt.

::: exercise Bài tập 11.12 (Tiêu chuẩn BIC cho Gaussian với hiệp phương sai đầy đủ và đường chéo; Murphy, Bài 4.4, tr. 165)
*Tiêu chuẩn thông tin Bayes* (Bayesian information criterion, BIC) là một hàm log-hợp lý có phạt, dùng để chọn mô hình:

$$
\mathrm{BIC}=\log p(\mathcal D\mid\hat\theta_{ML})-\frac d2\log N,
$$

trong đó $d$ là số tham số tự do của mô hình và $N$ là số mẫu. Bài này dùng BIC để chọn giữa Gaussian có ma trận hiệp phương sai đầy đủ và Gaussian có ma trận hiệp phương sai đường chéo. Gaussian hiệp phương sai đầy đủ có hợp lý cực đại không nhỏ hơn, nhưng có thể không đáng với số tham số thêm vào nếu mức cải thiện so với ma trận đường chéo quá nhỏ.

Ở bài này $D$ là số chiều và $\mathcal D=(x_1,\ldots,x_N)$, $x_i\in\mathbb R^D$, là dữ liệu của một mẫu i.i.d. Gaussian; $\hat\mu=\bar x$. Ta viết được (sách bỏ hằng số $-\frac{ND}2\log(2\pi)$ ở công thức này)

$$
\begin{aligned}
&\log p(\mathcal D\mid\hat\Sigma,\hat\mu)\\
&\quad=-\frac{ND}2\log(2\pi)\\
&\qquad-\frac N2\operatorname{tr}\bigl(\hat\Sigma^{-1}\hat S\bigr)\\
&\qquad-\frac N2\log\lvert\hat\Sigma\rvert,\\
&\hat S=\frac1N\sum_{i=1}^N(x_i-\bar x)(x_i-\bar x)^\top,
\end{aligned}
$$

trong đó $\hat S$ là ma trận tán xạ (hiệp phương sai thực nghiệm, chính là $S_n$ của (8.3)). Giả thiết $\hat S\succ0$.

- (a) Suy ra điểm BIC của Gaussian $D$ chiều với ma trận hiệp phương sai đầy đủ, rút gọn hết mức bằng dạng của ước lượng hợp lý cực đại. Nêu rõ số tham số tự do $d$.
- (b) Suy ra điểm BIC của Gaussian $D$ chiều với ma trận hiệp phương sai đường chéo. Nêu rõ $d$. Chứng minh rằng trong trường hợp này ước lượng hợp lý cực đại của $\Sigma$ giữ các phần tử đường chéo của $\hat\Sigma_{ML}$ và có các phần tử ngoài đường chéo bằng $0$: $\hat\Sigma_{\mathrm{diag}}=\operatorname{diag}\bigl(\hat\Sigma_{ML}(1,1),\ldots,\hat\Sigma_{ML}(D,D)\bigr)$.
:::

::: hint Gợi ý
Ở (a), dùng Định lý 11.14 cho $\hat\Sigma_{ML}$; ma trận đối xứng $D\times D$ có $D(D+1)/2$ phần tử tự do. Ở (b), với $\Sigma=\operatorname{diag}(v_1,\ldots,v_D)$, mật độ Gaussian tách thành tích của $D$ mật độ một chiều, nên log-hợp lý là tổng của $D$ log-hợp lý một chiều; áp dụng Định lý 11.9 cho từng tọa độ.
:::

::: solution Lời giải Bài tập 11.12
**Câu (a).** Vì $\hat S\succ0$, Định lý 11.14 cho $\hat\Sigma_{ML}=\hat S$. Khi đó $\operatorname{tr}(\hat S^{-1}\hat S)=\operatorname{tr}I_D=D$, nên

$$
\begin{aligned}
&\log p(\mathcal D\mid\hat\Sigma_{ML},\hat\mu)\\
&\quad=-\frac{ND}2\log(2\pi)\\
&\qquad-\frac N2\bigl(D+\log\lvert\hat S\rvert\bigr).
\end{aligned}
$$

Mô hình có $D$ tham số trung bình và $D(D+1)/2$ phần tử tự do của ma trận đối xứng $\Sigma$, nên $d=D+D(D+1)/2=D(D+3)/2$ và

$$
\begin{aligned}
\mathrm{BIC}_{\mathrm{full}}&=-\frac{ND}2\log(2\pi)\\
&\quad-\frac N2\bigl(D+\log\lvert\hat S\rvert\bigr)\\
&\quad-\frac{D(D+3)}4\log N.
\end{aligned}
$$

**Câu (b).** Với $\Sigma=\operatorname{diag}(v_1,\ldots,v_D)$, $v_j>0$, ta có $\lvert\Sigma\rvert=\prod_jv_j$ và $(x-\mu)^\top\Sigma^{-1}(x-\mu)=\sum_j(x^{(j)}-\mu_j)^2/v_j$. Mật độ $\mathcal N(\mu,\Sigma)$ là tích các mật độ $\mathcal N(\mu_j,v_j)$ của từng tọa độ, nên

$$
\ell(\mu,\Sigma;\mathcal D)=\sum_{j=1}^D\ell_j(\mu_j,v_j),
$$

trong đó $\ell_j$ là log-hợp lý (7.1) của tọa độ thứ $j$ của dữ liệu. Mỗi số hạng chỉ phụ thuộc cặp $(\mu_j,v_j)$ của nó, nên tổng đạt cực đại khi và chỉ khi từng số hạng đạt cực đại. Với tọa độ $j$, tổng bình phương sai lệch là $Q_j=\sum_i(x_i^{(j)}-\bar x^{(j)})^2=N\hat S_{jj}$, và $\hat S_{jj}=e_j^\top\hat Se_j>0$ vì $\hat S\succ0$. Theo Định lý 11.9, $\hat\mu_j=\bar x^{(j)}$ và $\hat v_j=Q_j/N=\hat S_{jj}$. Vì $\hat\Sigma_{ML}=\hat S$, ta được $\hat\Sigma_{\mathrm{diag}}=\operatorname{diag}\bigl(\hat\Sigma_{ML}(1,1),\ldots,\hat\Sigma_{ML}(D,D)\bigr)$.

Ma trận $\hat\Sigma_{\mathrm{diag}}^{-1}$ là đường chéo, nên $\operatorname{tr}(\hat\Sigma_{\mathrm{diag}}^{-1}\hat S)=\sum_j\hat S_{jj}/\hat S_{jj}=D$, và $\log\lvert\hat\Sigma_{\mathrm{diag}}\rvert=\sum_j\log\hat S_{jj}$. Mô hình có $D$ tham số trung bình và $D$ phương sai, nên $d=2D$ và

$$
\begin{aligned}
&\mathrm{BIC}_{\mathrm{diag}}\\
&\quad=-\frac{ND}2\log(2\pi)\\
&\qquad-\frac N2\Bigl(D+\sum_{j=1}^D\log\hat S_{jj}\Bigr)\\
&\qquad-D\log N.
\end{aligned}
$$

**So sánh.** Hằng số $-\frac{ND}2\log(2\pi)$ triệt tiêu, và hiệu hai điểm là

$$
\begin{aligned}
&\mathrm{BIC}_{\mathrm{full}}-\mathrm{BIC}_{\mathrm{diag}}\\
&\quad=\frac N2\Bigl(\sum_{j=1}^D\log\hat S_{jj}-\log\lvert\hat S\rvert\Bigr)\\
&\qquad-\frac{D(D-1)}4\log N,
\end{aligned}
$$

và BIC chọn mô hình đầy đủ khi hiệu này dương. Mọi ma trận đường chéo xác định dương thuộc miền tham số của mô hình đầy đủ, nên hợp lý cực đại của mô hình đầy đủ không nhỏ hơn, tức số hạng thứ nhất không âm; số hạng thứ hai phạt $D(D-1)/2$ hiệp phương sai thêm vào.

**Kiểm tra lại.** Với $D=1$, hai mô hình trùng nhau: $d=1\cdot4/2=2=2D$ và $\log\lvert\hat S\rvert=\log\hat S_{11}$, nên hiệu bằng $0$. Với $D=2$, $\lvert\hat S\rvert=\hat S_{11}\hat S_{22}-\hat S_{12}^2\le\hat S_{11}\hat S_{22}$, đúng dấu của số hạng thứ nhất.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 5; dùng tọa độ riêng của Mệnh đề 11.17 để tính một tích phân nhiều chiều.

::: exercise Bài tập 11.13 (Hằng số chuẩn hóa của Gaussian nhiều chiều; Murphy, Bài 3.6, tr. 104–105)
Cho $\mu\in\mathbb R^d$ và ma trận đối xứng xác định dương $\Sigma\in\mathbb R^{d\times d}$. Chứng minh hằng số chuẩn hóa của Gaussian $d$ chiều là

$$
\begin{aligned}
&(2\pi)^{d/2}\lvert\Sigma\rvert^{1/2}\\
&\quad=\int_{\mathbb R^d}\exp\Bigl(-\frac12(x-\mu)^\top\Sigma^{-1}\\
&\qquad\qquad(x-\mu)\Bigr)\,dx.
\end{aligned}
$$
:::

::: hint Gợi ý
Chéo hóa $\Sigma$ và dùng $\lvert\Sigma\rvert=\prod_i\lambda_i$ để viết hàm dưới dấu tích phân thành tích của $d$ hàm Gaussian một chiều trong một hệ tọa độ mới. Phép đổi biến $x=\mu+Uz$ với $U$ trực giao có $\lvert\det U\rvert=1$, nên $\int g(x)\,dx=\int g(\mu+Uz)\,dz$. Cuối cùng dùng hằng số chuẩn hóa của Gaussian một chiều.
:::

::: solution Lời giải Bài tập 11.13
**Đổi sang tọa độ riêng.** Theo Định lý 00.16, $\Sigma=U\operatorname{diag}(\lambda_1,\ldots,\lambda_d)U^\top$ với $U$ trực giao và $\lambda_j>0$ vì $\Sigma\succ0$. Từ $U^\top U=I_d$ suy ra $(\det U)^2=1$, nên $\lvert\Sigma\rvert=\det U\cdot\prod_j\lambda_j\cdot\det U^\top=\prod_j\lambda_j$. Đổi biến $x=\mu+Uz$, tức $z=U^\top(x-\mu)$. Theo công thức đổi biến của tích phân bội, vì ánh xạ $z\mapsto\mu+Uz$ có ma trận Jacobian $U$ với $\lvert\det U\rvert=1$, ta có $\int g(x)\,dx=\int g(\mu+Uz)\,dz$ với mọi hàm không âm $g$. Theo (8.9) của Mệnh đề 11.17(a),

$$
(x-\mu)^\top\Sigma^{-1}(x-\mu)=\sum_{j=1}^d\frac{z_j^2}{\lambda_j}.
$$

**Tách tích phân.** Do đó

$$
\begin{aligned}
&\int_{\mathbb R^d}\exp\Bigl(-\frac12(x-\mu)^\top\Sigma^{-1}\\
&\qquad\qquad(x-\mu)\Bigr)dx\\
&\quad=\int_{\mathbb R^d}\prod_{j=1}^d\exp\Bigl(-\frac{z_j^2}{2\lambda_j}\Bigr)dz\\
&\quad=\prod_{j=1}^d\int_{\mathbb R}\exp\Bigl(-\frac{z_j^2}{2\lambda_j}\Bigr)dz_j.
\end{aligned}
$$

Đẳng thức thứ hai dùng việc tích phân của một tích các hàm không âm, mỗi hàm theo một biến, bằng tích các tích phân một chiều.

**Hằng số một chiều.** Mật độ $\mathcal N(0,\lambda_j)$ có tích phân bằng $1$ (Định nghĩa 10.20), nên $\int_{\mathbb R}\exp\bigl(-z^2/(2\lambda_j)\bigr)dz=\sqrt{2\pi\lambda_j}$. Vậy tích phân cần tính bằng

$$
\begin{aligned}
\prod_{j=1}^d\sqrt{2\pi\lambda_j}&=(2\pi)^{d/2}\Bigl(\prod_{j=1}^d\lambda_j\Bigr)^{1/2}\\
&=(2\pi)^{d/2}\lvert\Sigma\rvert^{1/2}.
\end{aligned}
$$

**Kiểm tra lại.** Với $d=1$, $\Sigma=\sigma^2$: vế trái bằng $\sqrt{2\pi\sigma^2}$, đúng hệ số của mật độ Gaussian một chiều.
:::

## Tài liệu tham khảo

- Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến do tác giả công bố:
  - mục Exercises của Chương 3 (§3.7): Bài 3.4, 3.6 (tr. 104–105), 3.7 (tr. 105);
  - mục Exercises của Chương 4 (§4.8): Bài 4.1 (tr. 164), 4.4, 4.5 (tr. 165–166), 4.7, 4.8 (tr. 166);
  - mục Exercises của Chương 7 (§7.9): Bài 7.2 (tr. 274).
