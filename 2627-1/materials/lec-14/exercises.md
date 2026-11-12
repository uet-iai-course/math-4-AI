# Bài tập Bài 14 — Học biểu diễn và mô hình sinh dưới góc nhìn xác suất

Các bài tập dưới đây, đánh số tiếp theo các bài tập trong ghi chú, đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-14/lecture-note.md) của Bài 14. Các bài lấy từ Murphy (2022), Chương 2, 6 và 20; số trang là trang in của bản trực tuyến của sách. Lời giải dẫn định nghĩa, mệnh đề, định lý, ví dụ và công thức theo số hiệu của ghi chú. Ký hiệu theo ghi chú gồm:

- $y_1,\ldots,y_n\in\mathbb R^d$ là các quan sát đã tâm hóa, $\sum_iy_i=0$, và $S=\frac1n\sum_iy_iy_i^\top$ là hiệp phương sai thực nghiệm (4.1), mẫu số $n$;
- $\lambda_1\ge\cdots\ge\lambda_d\ge0$ là các trị riêng của $S$ với các vector riêng trực chuẩn $v_1,\ldots,v_d$, và $V_k=(v_1,\ldots,v_k)$;
- tham số thứ hai của $\mathcal N(a,\beta)$ là phương sai; $\tau^2$ là phương sai nhiễu quan sát (Murphy viết $\sigma^2$);
- $\log$ là logarit tự nhiên; phân tích thành phần chính viết tắt là PCA (principal component analysis), PCA xác suất là PPCA (probabilistic PCA).

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Hướng chính, phương sai giữ lại và lỗi tái tạo | — | 14.6, 14.7, 14.10 |
| 2. Bộ tự mã hóa tuyến tính và PCA | 14.1 | — |
| 3. Mô hình sinh có biến ẩn: sinh mẫu, hợp lý, hậu nghiệm | — | 14.5, 14.8, 14.9 |
| 4. Tính không âm của KL và phân rã ELBO | 14.2 | 14.11 |
| 5. KL Gaussian, ELBO và tái tham số hóa | 14.2, 14.3 | — |
| 6. So sánh PCA, bộ tự mã hóa và VAE; chẩn đoán mô hình sinh kém | 14.1, 14.4 | — |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 3; đọc ma trận hiệp phương sai biên của PCA xác suất theo các hướng chính.

::: exercise Bài tập 14.5 (Phương sai của PCA xác suất theo các hướng chính; Murphy, Bài 20.6, §20.6, tr. 714)
Mô hình PCA xác suất với $1\le k<d$ gồm tiên nghiệm $p(z)=\mathcal N(0,I_k)$ và phân phối quan sát có điều kiện $p(x\mid z)=\mathcal N(Wz+\mu,\tau^2I_d)$, với $W\in\mathbb R^{d\times k}$ và $\tau>0$. Mật độ biên của mô hình là $\mathcal N(\mu,C)$ với

$$
C=WW^\top+\tau^2I_d
$$

(Murphy (2022), (20.41)–(20.42), tr. 668). Nghiệm hợp lý cực đại (Murphy (2022), (20.45)–(20.46), tr. 668–669) là

$$
\begin{gathered}
W=V_k(\Lambda_k-\tau^2I_k)^{1/2}R,\\
\tau^2=\frac1{d-k}\sum_{j=k+1}^d\lambda_j,
\end{gathered}
$$

trong đó $\Lambda_k=\operatorname{diag}(\lambda_1,\ldots,\lambda_k)$ và $R\in\mathbb R^{k\times k}$ là một ma trận trực giao. Phương sai của mô hình theo hướng đơn vị $v$, $v^\top v=1$, là $v^\top Cv$.

1. Giả sử $v$ vuông góc với không gian chính $\operatorname{span}(v_1,\ldots,v_k)$, tức $v^\top V_k=0$. Chứng minh $v^\top Cv=\tau^2$.
2. Giả sử $v=v_i$ với $1\le i\le k$. Chứng minh $v^\top Cv=(\lambda_i-\tau^2)+\tau^2=\lambda_i$.
:::

::: hint
Tính $WW^\top$ trước: vì $RR^\top=I_k$, ta có $WW^\top=V_k(\Lambda_k-\tau^2I_k)V_k^\top$. Sau đó tính $V_k^\top v$ trong từng trường hợp.
:::

::: solution
**Ma trận $WW^\top$.** Vì $\Lambda_k-\tau^2I_k$ là ma trận chéo và $RR^\top=I_k$,

$$
\begin{aligned}
WW^\top&=V_k(\Lambda_k-\tau^2I_k)^{1/2}RR^\top\\
&\qquad\cdot(\Lambda_k-\tau^2I_k)^{1/2}V_k^\top\\
&=V_k(\Lambda_k-\tau^2I_k)V_k^\top.
\end{aligned}
$$

Căn bậc hai xác định vì $\tau^2$ là trung bình của $\lambda_{k+1},\ldots,\lambda_d$, nên $\tau^2\le\lambda_{k+1}\le\lambda_j$ với mọi $j\le k$. Đặt $a=V_k^\top v\in\mathbb R^k$. Khi đó

$$
\begin{aligned}
v^\top Cv&=a^\top(\Lambda_k-\tau^2I_k)a\\
&\quad+\tau^2v^\top v.
\end{aligned}
$$

**Câu 1.** Với $a=V_k^\top v=0$, số hạng đầu bằng $0$ và $v^\top v=1$, nên $v^\top Cv=\tau^2$.

**Câu 2.** Với $v=v_i$, $i\le k$, các cột của $V_k$ trực chuẩn nên $a=V_k^\top v_i=e_i$, vector đơn vị thứ $i$ của $\mathbb R^k$. Do đó

$$
\begin{aligned}
v_i^\top Cv_i&=e_i^\top(\Lambda_k-\tau^2I_k)e_i+\tau^2\\
&=(\lambda_i-\tau^2)+\tau^2=\lambda_i.
\end{aligned}
$$

**Diễn giải.** Theo mỗi hướng chính $v_i$, $i\le k$, mô hình có đúng phương sai thực nghiệm $\lambda_i$: biến ẩn đóng góp $\lambda_i-\tau^2$, nhiễu đóng góp $\tau^2$. Theo mọi hướng vuông góc với không gian chính, kể cả $v_{k+1},\ldots,v_d$, mô hình chỉ có phương sai nhiễu $\tau^2$, bằng trung bình của $\lambda_{k+1},\ldots,\lambda_d$.

**Kiểm tra lại.** Với dữ liệu của Ví dụ 14.2, $d=2$, $k=1$, $\lambda_1=2$, $\lambda_2=1/2$, $v_1=(1,0)^\top$: $\tau^2=\lambda_2=1/2$ và $W=v_1\sqrt{3/2}$ (với $R=(1)$), nên $C=\operatorname{diag}(3/2,0)+\tfrac12I_2=\operatorname{diag}(2,1/2)=S$, khớp mô hình của Ví dụ 14.5.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 1; chứng minh lỗi tái tạo khi giữ $k$ thành phần chính bằng tổng các trị riêng bị bỏ.

::: exercise Bài tập 14.6 (Lỗi tái tạo bằng tổng các trị riêng bị bỏ; Murphy, Bài 20.4, §20.6, tr. 713)
Với $1\le k\le d$, đặt $z_{ij}=v_j^\top y_i$ là tọa độ thứ $j$ của $y_i$ trong cơ sở riêng.

1. Chứng minh

$$
\begin{aligned}
&\Big\|y_i-\sum_{j=1}^kz_{ij}v_j\Big\|_2^2\\
&\quad=y_i^\top y_i-\sum_{j=1}^kv_j^\top y_iy_i^\top v_j.
\end{aligned}
$$

2. Chứng minh

$$
\begin{aligned}
&J_k:=\frac1n\sum_{i=1}^n\Big(y_i^\top y_i\\
&\qquad-\sum_{j=1}^kv_j^\top y_iy_i^\top v_j\Big)\\
&\quad=\frac1n\sum_{i=1}^ny_i^\top y_i-\sum_{j=1}^k\lambda_j.
\end{aligned}
$$

3. Khi $k=d$, phép khai triển không bị cắt nên $J_d=0$. Dùng điều này để chứng minh rằng với $k<d$,

$$
J_k=\sum_{j=k+1}^d\lambda_j.
$$
:::

::: hint
Ở câu 1, khai triển bình phương chuẩn và dùng $v_j^\top v_j=1$, $v_j^\top v_l=0$ khi $j\ne l$; xét trường hợp $k=2$ trước. Ở câu 2, dùng $\frac1n\sum_iv_j^\top y_iy_i^\top v_j=v_j^\top Sv_j=\lambda_j$. Ở câu 3, tách $\sum_{j=1}^d\lambda_j$ thành $\sum_{j\le k}\lambda_j$ và $\sum_{j>k}\lambda_j$.
:::

::: solution
**Câu 1.** Đặt $\widehat y_i=\sum_{j\le k}z_{ij}v_j$. Khai triển

$$
\begin{aligned}
&\|y_i-\widehat y_i\|_2^2\\
&\quad=y_i^\top y_i-2\sum_{j\le k}z_{ij}v_j^\top y_i\\
&\qquad+\sum_{j\le k}\sum_{l\le k}z_{ij}z_{il}v_j^\top v_l\\
&\quad=y_i^\top y_i-2\sum_{j\le k}z_{ij}^2\\
&\qquad+\sum_{j\le k}z_{ij}^2\\
&\quad=y_i^\top y_i-\sum_{j\le k}z_{ij}^2.
\end{aligned}
$$

Dòng thứ hai dùng $v_j^\top y_i=z_{ij}$ và tính trực chuẩn: chỉ các số hạng $l=j$ còn lại, với $v_j^\top v_j=1$. Cuối cùng $z_{ij}^2=(v_j^\top y_i)(y_i^\top v_j)=v_j^\top y_iy_i^\top v_j$.

**Câu 2.** Lấy trung bình theo $i$ và đổi thứ tự hai tổng hữu hạn:

$$
\begin{aligned}
J_k&=\frac1n\sum_{i=1}^ny_i^\top y_i\\
&\quad-\sum_{j=1}^kv_j^\top\Big(\frac1n\sum_{i=1}^ny_iy_i^\top\Big)v_j\\
&=\frac1n\sum_{i=1}^ny_i^\top y_i-\sum_{j=1}^kv_j^\top Sv_j.
\end{aligned}
$$

Vì $Sv_j=\lambda_jv_j$ và $v_j^\top v_j=1$, ta có $v_j^\top Sv_j=\lambda_j$, cho đẳng thức cần chứng minh.

**Câu 3.** Khi $k=d$, các $v_j$ là một cơ sở trực chuẩn của $\mathbb R^d$, nên $\sum_{j=1}^dz_{ij}v_j=y_i$ và $J_d=0$. Câu 2 với $k=d$ cho

$$
\frac1n\sum_{i=1}^ny_i^\top y_i=\sum_{j=1}^d\lambda_j.
$$

Thế vào câu 2 với $k<d$:

$$
J_k=\sum_{j=1}^d\lambda_j-\sum_{j=1}^k\lambda_j=\sum_{j=k+1}^d\lambda_j.
$$

**Kiểm tra lại.** Câu 3 cho $\frac1n\sum_i\|y_i\|_2^2=\operatorname{tr}(S)$ và $J_k=\operatorname{tr}(S)-\operatorname{tr}(V_k^\top SV_k)$, đúng (4.4) với $U=V_k$ và lỗi nhỏ nhất của Định lý 14.6. Với Ví dụ 14.2, $J_1=\lambda_2=1/2$, bằng lỗi trung bình đã tính trực tiếp.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 1; tìm thành phần chính thứ hai bằng điều kiện dừng của hàm Lagrange và so sánh giá trị.

::: exercise Bài tập 14.7 (Thành phần chính thứ hai; Murphy, Bài 20.3, §20.6, tr. 712)
Cho $d\ge2$ và vector riêng đơn vị $v_1$ với $Sv_1=\lambda_1v_1$; đặt $z_{i1}=v_1^\top y_i$. Với một vector đơn vị $w\perp v_1$ và các số $z_{12},\ldots,z_{n2}$, đặt $r_i=y_i-z_{i1}v_1-z_{i2}w$ và xét lỗi tái tạo hai chiều

$$
J(w,z_2)=\frac1n\sum_{i=1}^nr_i^\top r_i.
$$

1. Chứng minh $\partial J/\partial z_{i2}=0$ cho $z_{i2}=w^\top y_i$.
2. Thế $z_{i2}=w^\top y_i$ vào $J$ và chứng minh $J=\frac1n\sum_iy_i^\top y_i-\lambda_1-w^\top Sw$.
3. Hàm Lagrange của bài toán cực tiểu $-w^\top Sw$ với hai ràng buộc $w^\top w=1$, $w^\top v_1=0$ là

$$
\begin{aligned}
\tilde J(w)&=-w^\top Sw+\nu(w^\top w-1)\\
&\quad+\nu_{12}(w^\top v_1-0).
\end{aligned}
$$

Chứng minh mọi điểm dừng của $\tilde J$ thỏa hai ràng buộc là một vector riêng đơn vị của $S$ vuông góc với $v_1$. Chứng minh giá trị nhỏ nhất của $-w^\top Sw$ trên tập ràng buộc bằng $-\lambda_2$ và đạt tại $w=v_2$, vector riêng ứng với trị riêng lớn thứ hai.
:::

::: hint
Dùng $\partial(x^\top Ax)/\partial x=(A+A^\top)x$, $Sv_1=\lambda_1v_1$, $v_1^\top w=0$ và $w^\top w=1$. Ở câu 3, nhân điều kiện dừng bên trái với $v_1^\top$ để tìm $\nu_{12}$; để so sánh giá trị, khai triển $w$ theo $v_2,\ldots,v_d$ như Bước 2–3 trong chứng minh Mệnh đề 14.3.
:::

::: solution
**Câu 1.** Chỉ số hạng thứ $i$ của tổng chứa $z_{i2}$, và $\partial r_i/\partial z_{i2}=-w$, nên

$$
\begin{aligned}
&\frac{\partial J}{\partial z_{i2}}=-\frac2nw^\top r_i\\
&\quad=-\frac2n\big(w^\top y_i-z_{i1}w^\top v_1\\
&\qquad-z_{i2}w^\top w\big)\\
&\quad=-\frac2n\big(w^\top y_i-z_{i2}\big).
\end{aligned}
$$

Dòng cuối dùng $w^\top v_1=0$ và $w^\top w=1$. Đạo hàm bằng $0$ khi và chỉ khi $z_{i2}=w^\top y_i$.

**Câu 2.** Với $z_{i1}=v_1^\top y_i$, $z_{i2}=w^\top y_i$ và $\{v_1,w\}$ trực chuẩn, khai triển như câu 1 của Bài tập 14.6 với hai vector $v_1,w$ cho $\|r_i\|_2^2=y_i^\top y_i-(v_1^\top y_i)^2-(w^\top y_i)^2$. Lấy trung bình theo $i$:

$$
\begin{aligned}
&J=\frac1n\sum_iy_i^\top y_i-v_1^\top Sv_1\\
&\qquad-w^\top Sw\\
&\quad=\frac1n\sum_iy_i^\top y_i-\lambda_1-w^\top Sw.
\end{aligned}
$$

Như vậy cực tiểu $J$ theo $w$ tương đương cực tiểu $-w^\top Sw$ trên tập ràng buộc.

**Câu 3.** *Điểm dừng.* Vì $S$ đối xứng, $\nabla_w(w^\top Sw)=2Sw$, nên điều kiện dừng là

$$
-2Sw+2\nu w+\nu_{12}v_1=0.
$$

Nhân bên trái với $v_1^\top$: $v_1^\top Sw=(Sv_1)^\top w=\lambda_1v_1^\top w=0$ và $v_1^\top w=0$, nên còn $\nu_{12}v_1^\top v_1=\nu_{12}=0$. Do đó $Sw=\nu w$: mọi điểm dừng thỏa ràng buộc là một vector riêng đơn vị của $S$ vuông góc với $v_1$, với giá trị $-w^\top Sw=-\nu$.

*So sánh giá trị.* Mọi vector riêng đơn vị vuông góc với $v_1$ đều thỏa điều kiện dừng, nên ta so sánh giá trị của chúng. Mọi $w$ thỏa ràng buộc viết được $w=\sum_{j=2}^da_jv_j$ với $a_j=v_j^\top w$ và $\sum_{j\ge2}a_j^2=1$, vì $v_1^\top w=0$. Như Bước 2–3 trong chứng minh Mệnh đề 14.3,

$$
\begin{aligned}
w^\top Sw&=\sum_{j=2}^d\lambda_ja_j^2\\
&\le\lambda_2\sum_{j=2}^da_j^2=\lambda_2.
\end{aligned}
$$

Với $w=v_2$, ta có $a_2=1$ và $w^\top Sw=\lambda_2$. Vậy giá trị nhỏ nhất của $-w^\top Sw$ là $-\lambda_2$, đạt tại vector riêng $v_2$ ứng với trị riêng lớn thứ hai.

**Kiểm tra lại.** Tại $w=v_2$, câu 2 cho $J=\frac1n\sum_iy_i^\top y_i-\lambda_1-\lambda_2=\sum_{j\ge3}\lambda_j$, đúng $J_2$ của Bài tập 14.6.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; tính mật độ biên và hậu nghiệm của một mô hình có biến ẩn Gaussian một chiều.

::: exercise Bài tập 14.8 (Tổng của hai biến Gaussian độc lập; Murphy, Bài 2.4, §2.9, tr. 74)
Cho $X_1\sim\mathcal N(\mu_1,\sigma_1^2)$ và $X_2\sim\mathcal N(\mu_2,\sigma_2^2)$ độc lập, và $Y=X_1+X_2$. Mật độ của $Y$ là tích chập của hai mật độ Gaussian.

1. Xem $Z=X_1$ là biến ẩn. Viết tiên nghiệm $p(z)$, phân phối có điều kiện $p(y\mid z)$, và mật độ của $Y$ dưới dạng tích phân (6.1).
2. Tính tích phân ở câu 1 bằng hoàn bình phương theo $z$ để chứng minh $Y\sim\mathcal N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$.
3. Tính hậu nghiệm $p(z\mid y)$.
:::

::: hint
Đổi biến $(x_1,x_2)\mapsto(z,y)=(x_1,x_1+x_2)$ có định thức Jacobi bằng $1$. Đặt $s=\sigma_1^2$, $t=\sigma_2^2$, $a=y-\mu_2$, rồi hoàn bình phương $t(z-\mu_1)^2+s(z-a)^2$ theo $z$ như Ví dụ 14.5.
:::

::: solution
**Câu 1.** Mật độ đồng thời của $(X_1,X_2)$ là tích $\mathcal N(x_1;\mu_1,s)\mathcal N(x_2;\mu_2,t)$ vì hai biến độc lập. Phép đổi biến $(z,y)=(x_1,x_1+x_2)$ có nghịch đảo $(x_1,x_2)=(z,y-z)$ và định thức Jacobi bằng $1$, nên

$$
\begin{aligned}
p(z,y)&=\mathcal N(z;\mu_1,s)\\
&\qquad\cdot\mathcal N(y-z;\mu_2,t)\\
&=\mathcal N(z;\mu_1,s)\\
&\qquad\cdot\mathcal N(y;z+\mu_2,t).
\end{aligned}
$$

Do đó tiên nghiệm là $p(z)=\mathcal N(\mu_1,s)$, phân phối có điều kiện là $p(y\mid z)=\mathcal N(z+\mu_2,t)$, và theo (6.1),

$$
\begin{aligned}
p(y)&=\int_{\mathbb R}\mathcal N(y;z+\mu_2,t)\\
&\qquad\cdot\mathcal N(z;\mu_1,s)\,dz.
\end{aligned}
$$

**Câu 2.** Với $a=y-\mu_2$, hàm dưới dấu tích phân bằng $\frac1{2\pi\sqrt{st}}\exp\big(-Q(z)/(2st)\big)$ với $Q(z)=t(z-\mu_1)^2+s(z-a)^2$. Đặt $m=(t\mu_1+sa)/(s+t)$. Khai triển theo $z$:

$$
\begin{aligned}
&Q(z)=(s+t)z^2-2(t\mu_1+sa)z\\
&\qquad+t\mu_1^2+sa^2\\
&\quad=(s+t)(z-m)^2\\
&\qquad+t\mu_1^2+sa^2\\
&\qquad-\frac{(t\mu_1+sa)^2}{s+t}\\
&\quad=(s+t)(z-m)^2\\
&\qquad+\frac{st(a-\mu_1)^2}{s+t}.
\end{aligned}
$$

Dòng cuối dùng $(s+t)(t\mu_1^2+sa^2)-(t\mu_1+sa)^2=st\mu_1^2+sta^2-2st\mu_1a=st(a-\mu_1)^2$. Vì $\int_{\mathbb R}\exp\big(-\tfrac{s+t}{2st}(z-m)^2\big)dz=\sqrt{2\pi st/(s+t)}$,

$$
\begin{aligned}
&p(y)=\frac1{2\pi\sqrt{st}}\sqrt{\frac{2\pi st}{s+t}}\\
&\qquad\cdot\exp\Big(-\frac{(a-\mu_1)^2}{2(s+t)}\Big)\\
&\quad=\frac1{\sqrt{2\pi(s+t)}}\\
&\qquad\cdot\exp\Big(-\frac{(y-\mu_1-\mu_2)^2}{2(s+t)}\Big),
\end{aligned}
$$

tức $Y\sim\mathcal N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$.

**Câu 3.** Theo (6.3), với $y$ cố định, $p(z\mid y)$ tỉ lệ với $\exp\big(-\tfrac{s+t}{2st}(z-m)^2\big)$, nên

$$
\begin{gathered}
Z\mid Y=y\sim\mathcal N\Big(m,\ \frac{st}{s+t}\Big),\\
m=\mu_1+\frac{s(y-\mu_1-\mu_2)}{s+t}.
\end{gathered}
$$

Dòng thứ hai suy từ $m=(t\mu_1+sa)/(s+t)$ và $a=y-\mu_2$. Phương sai hậu nghiệm $st/(s+t)$ nhỏ hơn phương sai tiên nghiệm $s$.

**Kiểm tra lại.** Theo tính tuyến tính của kỳ vọng và phương sai của tổng hai biến độc lập, $\mathbb E[Y]=\mu_1+\mu_2$ và $\operatorname{Var}(Y)=s+t$, khớp câu 2. Với $\mu_1=\mu_2=0$, $s=t=1$, câu 2 và câu 3 cho $Y\sim\mathcal N(0,2)$ và $Z\mid Y=y\sim\mathcal N(y/2,1/2)$, đúng mô hình vô hướng của Ví dụ 14.7.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; suy luận hậu nghiệm trong PCA xác suất.

::: exercise Bài tập 14.9 (Hậu nghiệm của PCA xác suất; Murphy, Bài 20.7, §20.6, tr. 714)
Mô hình PCA xác suất gồm tiên nghiệm $p(z)=\mathcal N(0,I_k)$ và phân phối quan sát có điều kiện $p(x\mid z)=\mathcal N(Wz+\mu,\tau^2I_d)$, với $W\in\mathbb R^{d\times k}$, $\mu\in\mathbb R^d$ và $\tau>0$ (Murphy (2022), §20.2.2, tr. 668). Đặt $M=W^\top W+\tau^2I_k$.

1. Chứng minh $p(z\mid x)=\mathcal N\big(M^{-1}W^\top(x-\mu),\ \tau^2M^{-1}\big)$.
2. Viết kết quả câu 1 khi $k=1$ và $W=w\in\mathbb R^d$.
3. Giả sử $W$ có hạng cột bằng $k$. Tìm giới hạn của trung bình và hiệp phương sai hậu nghiệm khi $\tau^2\to0$.
:::

::: hint
Theo (6.3), $\log p(z\mid x)$ bằng $\log p(x\mid z)+\log p(z)$ cộng một hằng số không phụ thuộc $z$. Gom các số hạng bậc hai và bậc nhất theo $z$, rồi hoàn bình phương với ma trận $M/\tau^2$.
:::

::: solution
**Câu 1.** Đặt $b=W^\top(x-\mu)$. Theo (6.3) và các mật độ Gaussian của Định nghĩa 10.20, phần phụ thuộc $z$ của $\log p(z\mid x)$ là

$$
\begin{aligned}
&-\frac{\|x-\mu-Wz\|_2^2}{2\tau^2}-\frac{z^\top z}{2}\\
&\quad=-\frac{z^\top W^\top Wz+\tau^2z^\top z}{2\tau^2}\\
&\qquad+\frac{z^\top b}{\tau^2}+c_1\\
&\quad=-\frac{z^\top Mz-2z^\top b}{2\tau^2}+c_1,
\end{aligned}
$$

trong đó $c_1$ không phụ thuộc $z$. Ma trận $M$ đối xứng và xác định dương vì $z^\top Mz=\|Wz\|_2^2+\tau^2\|z\|_2^2>0$ khi $z\ne0$, nên khả nghịch. Với $m=M^{-1}b$,

$$
\begin{aligned}
&z^\top Mz-2z^\top b\\
&\quad=(z-m)^\top M(z-m)\\
&\qquad-b^\top M^{-1}b.
\end{aligned}
$$

Số hạng cuối không phụ thuộc $z$, nên $p(z\mid x)$ tỉ lệ với $\exp\big(-\tfrac12(z-m)^\top(M/\tau^2)(z-m)\big)$. Đây là mật độ $\mathcal N(m,\tau^2M^{-1})$ nhân một hằng số; hai mật độ tỉ lệ cùng có tích phân $1$ nên bằng nhau:

$$
\begin{gathered}
p(z\mid x)=\mathcal N\big(m,\ \tau^2M^{-1}\big),\\
m=M^{-1}W^\top(x-\mu).
\end{gathered}
$$

**Câu 2.** Khi $k=1$, $M=\|w\|_2^2+\tau^2$ là một số dương, nên

$$
\begin{gathered}
Z\mid X=x\sim\mathcal N(m,v),\\
m=\frac{w^\top(x-\mu)}{\|w\|_2^2+\tau^2},\\
v=\frac{\tau^2}{\|w\|_2^2+\tau^2}.
\end{gathered}
$$

**Câu 3.** Khi $W$ có hạng cột bằng $k$, ma trận $W^\top W$ khả nghịch. Khi $\tau^2\to0$, $M\to W^\top W$, và phép nghịch đảo liên tục trên tập ma trận khả nghịch, nên

$$
\begin{aligned}
&M^{-1}W^\top(x-\mu)\\
&\quad\to(W^\top W)^{-1}W^\top(x-\mu),\\
&\tau^2M^{-1}\to0.
\end{aligned}
$$

Trung bình giới hạn là tọa độ của hình chiếu trực giao của $x-\mu$ lên ảnh của $W$: điểm $W(W^\top W)^{-1}W^\top(x-\mu)$ thỏa $W^\top\big[(x-\mu)-W(W^\top W)^{-1}W^\top(x-\mu)\big]=0$. Hậu nghiệm suy biến về một mã tất định, như bộ mã hóa tuyến tính của PCA.

**Kiểm tra lại.** Với mô hình của Ví dụ 14.5, $d=2$, $k=1$, $w=(\sqrt{3/2},0)^\top$, $\mu=0$, $\tau^2=1/2$: $\|w\|_2^2+\tau^2=2$, nên câu 2 cho trung bình $\sqrt{3/2}\,x_1/2$ và phương sai $(1/2)/2=1/4$, khớp hậu nghiệm của Ví dụ 14.5.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 1; tìm lần lượt các thành phần chính bằng phép khử và một hàm tìm vector riêng lớn nhất.

::: exercise Bài tập 14.10 (Phân tích thành phần chính bằng phép khử dần; Murphy, Bài 20.5, §20.6, tr. 713)
Cho ma trận dữ liệu đã tâm hóa $X\in\mathbb R^{n\times d}$ với các hàng $y_1^\top,\ldots,y_n^\top$, nên $S=\frac1nX^\top X$. Cho $2\le k<d$ và giả sử $\lambda_1>\lambda_2>\cdots>\lambda_k>\lambda_{k+1}$. Các vector riêng $v_1,\ldots,v_k$ ứng với $k$ trị riêng lớn nhất, với $v_j^\top v_l=0$ khi $j\ne l$ và $v_j^\top v_j=1$, được gọi là các *vector cơ sở chính* (principal basis vectors). Đặt $P=v_1v_1^\top$,

$$
\begin{gathered}
\tilde y_i=(I_d-P)y_i,\\
\tilde X=X(I_d-P),
\end{gathered}
$$

tức $\tilde y_i$ là hình chiếu trực giao của $y_i$ lên phần bù trực giao của $v_1$, và $\tilde X$, có các hàng $\tilde y_i^\top$, là *ma trận khử* (deflated matrix).

1. Dùng $X^\top Xv_1=n\lambda_1v_1$ (nên $v_1^\top X^\top X=n\lambda_1v_1^\top$) và $v_1^\top v_1=1$, chứng minh hiệp phương sai của ma trận khử là

$$
\tilde S=\frac1n\tilde X^\top\tilde X=S-\lambda_1v_1v_1^\top.
$$

2. Gọi $u$ là một vector riêng đơn vị ứng với trị riêng lớn nhất của $\tilde S$. Giải thích vì sao $u=\pm v_2$.
3. Giả sử có hàm $[\lambda,u]=f(A)$ trả về trị riêng lớn nhất và một vector riêng đơn vị tương ứng của một ma trận đối xứng nửa xác định dương $A$ có trị riêng lớn nhất đơn. Viết các bước của một thuật toán nhận $S$, $k$, $f$ và trả về $v_j,\lambda_j$ với $j=1,\ldots,k$, chỉ dùng $f$ và phép tính vector, không dùng phân tích trị riêng đầy đủ.
:::

::: hint
Ở câu 1, khai triển $(I_d-P)S(I_d-P)$ và dùng $PS=SP=\lambda_1P$, $P^2=P$. Ở câu 2, tính $\tilde Sv_j$ với mọi $j$. Ở câu 3, lặp câu 1 và câu 2: sau khi tìm $v_j$, trừ $\lambda_jv_jv_j^\top$ khỏi ma trận hiện tại.
:::

::: solution
**Câu 1.** Ma trận $P$ đối xứng, $P^2=v_1(v_1^\top v_1)v_1^\top=P$, và $\tilde X^\top\tilde X=(I_d-P)X^\top X(I_d-P)=n(I_d-P)S(I_d-P)$. Từ $Sv_1=\lambda_1v_1$ và $S$ đối xứng, $PS=v_1(Sv_1)^\top=\lambda_1P$ và $SP=(Sv_1)v_1^\top=\lambda_1P$. Do đó

$$
\begin{aligned}
\tilde S&=(I_d-P)S(I_d-P)\\
&=S-PS-SP+PSP\\
&=S-\lambda_1P-\lambda_1P+\lambda_1P^2\\
&=S-\lambda_1v_1v_1^\top.
\end{aligned}
$$

**Câu 2.** Lấy cơ sở trực chuẩn $v_1,\ldots,v_d$ gồm các vector riêng của $S$. Ta có $\tilde Sv_1=\lambda_1v_1-\lambda_1v_1=0$ và, với $j\ge2$, $\tilde Sv_j=Sv_j-\lambda_1v_1(v_1^\top v_j)=\lambda_jv_j$. Vậy $\tilde S$ có các trị riêng $0,\lambda_2,\ldots,\lambda_d$ với cùng các vector riêng. Vì $\lambda_2>\lambda_3\ge\cdots\ge\lambda_d\ge0$, trị riêng lớn nhất của $\tilde S$ là $\lambda_2>0$ và không gian riêng của nó là $\operatorname{span}(v_2)$. Vector đơn vị trong không gian này là $\pm v_2$, nên $u=\pm v_2$.

**Câu 3.**

1. Đặt $A\leftarrow S$.
2. Với $j=1,\ldots,k$: tính $[\lambda_j,v_j]=f(A)$, rồi đặt $A\leftarrow A-\lambda_jv_jv_j^\top$.
3. Trả về $v_1,\ldots,v_k$ và $\lambda_1,\ldots,\lambda_k$.

Theo câu 1 và câu 2 lặp lại, trước lần gọi thứ $j$ ma trận hiện tại là $A=\sum_{l\ge j}\lambda_lv_lv_l^\top$, vì $S=\sum_{l=1}^d\lambda_lv_lv_l^\top$ (Bước 1 của Phụ lục A trong ghi chú). Ma trận này đối xứng, nửa xác định dương, có trị riêng lớn nhất $\lambda_j$ đơn vì $\lambda_j>\lambda_{j+1}$ và $\lambda_j>0$. Do đó $f$ trả về $\lambda_j$ và $\pm v_j$; phép trừ $\lambda_jv_jv_j^\top$ không phụ thuộc dấu của $v_j$.

**Kiểm tra lại.** Với $S=\operatorname{diag}(2,1/2)$ của Ví dụ 14.2 và lần gọi thứ nhất: $f(S)$ cho $\lambda_1=2$, $v_1=\pm(1,0)^\top$, và $\tilde S=\operatorname{diag}(0,1/2)$, có trị riêng lớn nhất $1/2=\lambda_2$ với vector riêng $\pm(0,1)^\top$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 4; so sánh KL thuận và KL ngược khi xấp xỉ một phân phối bằng một phân phối dạng tích.

::: exercise Bài tập 14.11 (KL thuận và KL ngược với xấp xỉ dạng tích; Murphy, Bài 6.4, §6.4, tr. 227)
Với hai phân phối rời rạc $p,q$ trên một tập hữu hạn, $\mathrm{KL}(p\,\|\,q)=\sum_{p>0}p\log(p/q)$, và $\mathrm{KL}(p\,\|\,q)=+\infty$ khi có một điểm với $p>0$, $q=0$ (Bài 11, §6.2). Xét xấp xỉ dạng tích $q(x,y)=q_1(x)q_2(y)$ cho một phân phối đồng thời $p(x,y)$ có các phân phối biên $p_X,p_Y$.

1. Chứng minh để cực tiểu KL thuận $\mathrm{KL}(p\,\|\,q)$, cần chọn $q_1=p_X$ và $q_2=p_Y$, tức xấp xỉ tối ưu là tích các phân phối biên.
2. Xét phân phối đồng thời sau trên $\{1,2,3,4\}^2$, trong đó hàng ứng với $y$ và cột ứng với $x$.

| $y\backslash x$ | $1$ | $2$ | $3$ | $4$ |
|---|---|---|---|---|
| $1$ | $1/8$ | $1/8$ | $0$ | $0$ |
| $2$ | $1/8$ | $1/8$ | $0$ | $0$ |
| $3$ | $0$ | $0$ | $1/4$ | $0$ |
| $4$ | $0$ | $0$ | $0$ | $1/4$ |

Tính giá trị nhỏ nhất của KL thuận ở câu 1 cho phân phối này.

3. Với phân phối ở câu 2, chứng minh KL ngược $\mathrm{KL}(q\,\|\,p)$ trên họ dạng tích có ba cực tiểu khác nhau: tập các $q$ có KL ngược hữu hạn tách thành ba phần rời nhau, và trên mỗi phần KL ngược đạt giá trị nhỏ nhất tại một điểm. Xác định ba cực tiểu và tính $\mathrm{KL}(q\,\|\,p)$ tại mỗi cực tiểu. Tính $\mathrm{KL}(q\,\|\,p)$ khi $q(x,y)=p_X(x)p_Y(y)$.
:::

::: hint
Ở câu 1, dùng $\sum_yp(x,y)=p_X(x)$ để tách $\mathrm{KL}(p\,\|\,q)$ thành $-H(p)$ cộng hai tổng chỉ chứa $q_1$ và $q_2$, với $H(\xi)=-\sum\xi\log\xi$, rồi dùng tính không âm của KL. Ở câu 3, KL ngược hữu hạn khi và chỉ khi $p(x,y)>0$ tại mọi điểm có $q_1(x)q_2(y)>0$; miền hỗ trợ của $q$ là một tích $A\times B$.
:::

::: solution
**Câu 1.** Nếu $q_1(x)=0$ tại một $x$ có $p_X(x)>0$ thì có $y$ với $p(x,y)>0=q(x,y)$, và KL thuận bằng $+\infty$; tương tự với $q_2$. Ngoài trường hợp đó,

$$
\begin{aligned}
&\mathrm{KL}(p\,\|\,q)\\
&\quad=-H(p)\\
&\qquad-\sum_{x,y}p(x,y)\log q_1(x)\\
&\qquad-\sum_{x,y}p(x,y)\log q_2(y)\\
&\quad=-H(p)\\
&\qquad-\sum_xp_X(x)\log q_1(x)\\
&\qquad-\sum_yp_Y(y)\log q_2(y)\\
&\quad=-H(p)+H(p_X)+H(p_Y)\\
&\qquad+\mathrm{KL}(p_X\,\|\,q_1)\\
&\qquad+\mathrm{KL}(p_Y\,\|\,q_2).
\end{aligned}
$$

Dòng cuối dùng $-\sum_xp_X\log q_1=-\sum_xp_X\log p_X+\sum_xp_X\log(p_X/q_1)$. Theo Bài 11, §6.2, mỗi KL không âm và bằng $0$ khi và chỉ khi hai phân phối trùng nhau. Vậy KL thuận nhỏ nhất khi và chỉ khi $q_1=p_X$ và $q_2=p_Y$, với giá trị $H(p_X)+H(p_Y)-H(p)$.

**Câu 2.** Tổng mỗi cột và mỗi hàng bằng $1/4$, nên $p_X=p_Y=(1/4,1/4,1/4,1/4)$ và $H(p_X)=H(p_Y)=\log4=2\log2$. Bảng có bốn ô bằng $1/8$ và hai ô bằng $1/4$, nên

$$
\begin{aligned}
H(p)&=4\cdot\frac18\log8+2\cdot\frac14\log4\\
&=\frac32\log2+\log2\\
&=\frac52\log2.
\end{aligned}
$$

Giá trị nhỏ nhất của KL thuận là $4\log2-\tfrac52\log2=\tfrac32\log2\approx1{,}0397$.

**Câu 3.** *Miền hỗ trợ.* Đặt $A=\{x:q_1(x)>0\}$ và $B=\{y:q_2(y)>0\}$, hai tập khác rỗng; miền hỗ trợ của $q$ là $A\times B$. KL ngược hữu hạn khi và chỉ khi $p>0$ trên $A\times B$. Miền hỗ trợ của $p$ là $\{1,2\}^2\cup\{(3,3)\}\cup\{(4,4)\}$.

- Nếu $3\in A$: với mọi $y\in B$, $p(3,y)>0$ buộc $y=3$, nên $B=\{3\}$; khi đó với mọi $x\in A$, $p(x,3)>0$ buộc $x=3$, nên $A\times B=\{(3,3)\}$.
- Tương tự, nếu $4\in A$ thì $A\times B=\{(4,4)\}$.
- Nếu $A\subseteq\{1,2\}$: với $x\in A$, $p(x,y)>0$ buộc $y\in\{1,2\}$, nên $A\times B\subseteq\{1,2\}^2$.

Vậy tập các $q$ có KL ngược hữu hạn gồm ba phần rời nhau, ứng với ba khối của $p$.

*Phần thứ nhất.* Trên $\{1,2\}^2$, $p=1/8$, nên

$$
\begin{aligned}
&\mathrm{KL}(q\,\|\,p)\\
&\quad=\sum_{x,y}q_1(x)q_2(y)\\
&\qquad\cdot\log\big(8q_1(x)q_2(y)\big)\\
&\quad=\log8-H(q_1)-H(q_2)\\
&\quad\ge\log8-2\log2=\log2,
\end{aligned}
$$

vì phân phối trên hai điểm có entropy lớn nhất $\log2$, đạt khi và chỉ khi phân phối đều. Cực tiểu là $q_1=q_2=$ phân phối đều trên $\{1,2\}$, tức $q=1/4$ trên bốn ô của khối, với $\mathrm{KL}(q\,\|\,p)=\log2\approx0{,}6931$.

*Phần thứ hai và thứ ba.* Phần thứ hai chỉ gồm $q=\mathbb 1[(x,y)=(3,3)]$, với $\mathrm{KL}(q\,\|\,p)=1\cdot\log\frac1{1/4}=\log4\approx1{,}3863$. Phần thứ ba chỉ gồm $q=\mathbb 1[(x,y)=(4,4)]$, cũng với giá trị $\log4$.

*Tích các biên.* $q(x,y)=p_X(x)p_Y(y)=1/16$ tại mọi ô, kể cả ô $(x,y)=(3,1)$ có $p=0$, nên $\mathrm{KL}(q\,\|\,p)=+\infty$.

**Diễn giải.** KL thuận bằng $+\infty$ khi $q=0$ tại một điểm có $p>0$, nên nghiệm của câu 1 đặt khối lượng lên cả ba khối của $p$. KL ngược bằng $+\infty$ khi $q>0$ tại một điểm có $p=0$, nên mọi xấp xỉ dạng tích có KL ngược hữu hạn chỉ đặt khối lượng trong một khối. Suy luận biến phân (Định nghĩa 14.16) cực tiểu KL theo chiều ngược, $\mathrm{KL}(q\,\|\,p_\theta(\cdot\mid x))$.

**Kiểm tra lại.** Với $q=1/4$ trên khối $\{1,2\}^2$: $\mathrm{KL}(q\,\|\,p)=4\cdot\tfrac14\log\tfrac{1/4}{1/8}=\log2$, khớp phần thứ nhất.
:::

## Tài liệu tham khảo

- Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả:
  - §20.2.2 (tr. 668–669): mô hình PCA xác suất, công thức (20.41)–(20.46) và (20.52);
  - mục Exercises của Chương 2: Bài 2.4 (tr. 74);
  - mục Exercises của Chương 6: Bài 6.4 (tr. 227);
  - mục Exercises của Chương 20: Bài 20.3 (tr. 712), 20.4, 20.5 (tr. 713), 20.6, 20.7 (tr. 714).
