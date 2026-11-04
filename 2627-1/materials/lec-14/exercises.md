# Bài tập Bài 14 — Học biểu diễn và mô hình sinh dưới góc nhìn xác suất

Các bài tập dưới đây đi kèm ghi chú Bài 14 và dẫn định nghĩa, mệnh đề, ví dụ cùng các công thức theo số hiệu của ghi chú. Ký hiệu theo §2 của ghi chú: $S$ là hiệp phương sai thực nghiệm (còn gọi là hiệp phương sai mẫu) với mẫu số $n$, tham số thứ hai của $\mathcal N(a,\beta)$ là phương sai, $\log$ là logarit tự nhiên, và trong ví dụ hai chiều $x=(x_1,x_2)^\top$. Hai chữ viết tắt theo ghi chú: phân tích thành phần chính (principal component analysis, PCA) và bộ tự mã hóa biến phân (variational autoencoder, VAE). Bài tập 14.1, 14.2 và 14.4 điều chỉnh từ bài trên lớp tuần 5 của học phần; Bài tập 14.6, 14.8, 14.9 và 14.10 điều chỉnh từ bộ bài tập tuần 5 của học phần.

## Bài tập trên lớp

### Bài tập 14.1 (Phân tích thành phần chính của bốn quan sát trên hai trục)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1; tính hiệp phương sai, hướng chính và lỗi tái tạo.

::: exercise Bài tập 14.1
Cho bốn quan sát $(0,3)^\top$, $(0,-3)^\top$, $(1,0)^\top$, $(-1,0)^\top$.

1. Tính trung bình $\bar x$ và ma trận hiệp phương sai $S$ với mẫu số $4$.
2. Xác định một hướng chính thứ nhất.
3. Tính mã, tái tạo và lỗi bình phương của riêng quan sát $(1,0)^\top$.
4. Tính lỗi tái tạo trung bình trên bốn quan sát.
:::

::: hint Gợi ý 1
Phần tử đường chéo thứ $j$ của $S$ là trung bình bình phương tọa độ thứ $j$; phần tử ngoài đường chéo là trung bình tích hai tọa độ.
:::

::: hint Gợi ý 2
Với ma trận chéo, các vector đơn vị của hai trục là vector riêng. Dùng Mệnh đề 14.3, rồi kiểm tra câu 4 bằng (4.4).
:::

::: solution Lời giải Bài tập 14.1
**Câu 1.** Tổng bốn quan sát bằng $(0,0)^\top$, nên $\bar x=(0,0)^\top$. Mỗi quan sát có một tọa độ bằng $0$, nên các phần tử ngoài đường chéo bằng $0$. Hai phần tử đường chéo là

$$
\begin{gathered}
\frac{0+0+1+1}{4}=\frac12,\\
\frac{9+9+0+0}{4}=\frac92,
\end{gathered}
$$

nên $S=\operatorname{diag}(1/2,9/2)$.

**Câu 2.** Trị riêng lớn nhất là $\lambda_1=9/2$ với vector riêng $(0,1)^\top$. Theo Mệnh đề 14.3, một hướng chính thứ nhất là $u=(0,1)^\top$ (hoặc $-u$).

**Câu 3.** Mã của $(1,0)^\top$ là $u^\top(1,0)^\top=0$, tái tạo là $u\cdot0=(0,0)^\top$, và lỗi bình phương là $\|(1,0)^\top\|_2^2=1$.

**Câu 4.** Hai quan sát $(0,\pm3)^\top$ được dựng lại đúng, lỗi $0$; hai quan sát $(\pm1,0)^\top$ có lỗi $1$. Lỗi trung bình là $(0+0+1+1)/4=1/2$.

**Kiểm tra lại.** Theo (4.4), lỗi trung bình bằng $\operatorname{tr}(S)-\lambda_1=5-9/2=1/2$, khớp câu 4. Lỗi của riêng một điểm ($1$ ở câu 3) khác lỗi trung bình trên cả mẫu ($1/2$).
:::

### Bài tập 14.2 (Mô hình sinh từ bộ tự mã hóa trục ngang)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; dựng mô hình sinh, tính phân phối biên và phân biệt đường sinh mẫu với đường suy luận.

::: exercise Bài tập 14.2
Một bộ tự mã hóa tất định dùng $f(x)=x_1$ và $g(z)=(z,0)^\top$.

1. Viết một mô hình sinh Gaussian hai chiều dùng cùng hàm $g$, với tiên nghiệm chuẩn và phương sai nhiễu $1/2$.
2. Tính phân phối biên của $X$ và hậu nghiệm $Z\mid X=x$ bằng hoàn bình phương.
3. Viết một bộ mã hóa Gaussian cho VAE dùng mô hình này.
4. Mô tả đường sinh một quan sát mới và đường suy luận từ một quan sát.
:::

::: hint Gợi ý 1
Làm như Ví dụ 14.5 với $w=1$ thay cho $w=\sqrt{3/2}$: hoàn bình phương $-\tfrac{z^2}2-(x_1-z)^2$ theo $z$.
:::

::: hint Gợi ý 2
Tiên nghiệm và phân phối quan sát có điều kiện xác định mô hình sinh. Bộ mã hóa là công cụ suy luận, không phải một phần của mô hình sinh.
:::

::: solution Lời giải Bài tập 14.2
**Câu 1.** Theo (6.2) với $k=1$, $d=2$: $p(z)=\mathcal N(0,1)$ và $p_\theta(x\mid z)=\mathcal N\big((z,0)^\top,\tfrac12I_2\big)$.

**Câu 2.** Với $\tau^2=1/2$, log-mật độ đồng thời là một hằng số cộng $-\tfrac{z^2}2-(x_1-z)^2-x_2^2$. Hoàn bình phương theo $z$:

$$
\begin{aligned}
&-\frac{z^2}{2}-(x_1-z)^2\\
&\quad=-\frac32z^2+2x_1z-x_1^2\\
&\quad=-\frac32\Big(z-\frac{2x_1}{3}\Big)^2+\frac23x_1^2-x_1^2\\
&\quad=-\frac32\Big(z-\frac{2x_1}{3}\Big)^2-\frac{x_1^2}{3}.
\end{aligned}
$$

Lấy tích phân theo $z$ như (6.1): $p(x)\propto\exp\big(-\tfrac{x_1^2}{3}-x_2^2\big)=\exp\big(-\tfrac{x_1^2}{2\cdot3/2}-\tfrac{x_2^2}{2\cdot1/2}\big)$, nên $X\sim\mathcal N\big(0,\operatorname{diag}(3/2,1/2)\big)$. Theo (6.3), hậu nghiệm tỉ lệ với $\exp\big(-\tfrac32(z-2x_1/3)^2\big)$, tức $Z\mid X=x\sim\mathcal N(2x_1/3,1/3)$.

**Câu 3.** Một bộ mã hóa VAE là $q_\phi(z\mid x)=\mathcal N(\mu_\phi(x),\sigma_\phi^2(x))$ với $\sigma_\phi(x)>0$, trong đó $\mu_\phi$ và $\sigma_\phi$ được học bằng (8.1), không suy ra từ $f$. Trong mô hình này, hậu nghiệm đúng thuộc họ đó, với $\mu(x)=2x_1/3$ và $\sigma^2(x)=1/3$.

**Câu 4.** Sinh mẫu: lấy $z\sim\mathcal N(0,1)$ và nhiễu $\eta\sim\mathcal N(0,\tfrac12I_2)$ độc lập, rồi trả về $(z,0)^\top+\eta$. Suy luận: đưa quan sát $x$ qua bộ mã hóa để được phân phối $q_\phi(\cdot\mid x)$ của mã.

**Kiểm tra lại.** Viết $X_1=Z+\eta_1$ thì $\mathbb E[X_1^2]=1+0+1/2=3/2$, khớp câu 2. Ma trận hiệp phương sai có định thức $3/4>0$, nên $X$ có mật độ hai chiều, khác với cơ chế không nhiễu của Ví dụ 14.4.
:::

### Bài tập 14.3 (Hai vai trò của KL trong phân rã ELBO)

**Mức độ:** khái niệm. **Mục tiêu:** mục tiêu học tập 4; phân biệt KL tới hậu nghiệm với KL tới tiên nghiệm.

::: exercise Bài tập 14.3
Với $\theta$ cố định, giả sử $\log p_\theta(x)=-3$. Hai hậu nghiệm xấp xỉ $q_1,q_2$ có KL tới hậu nghiệm lần lượt là $0{,}7$ và $0{,}2$.

1. Tính hai giá trị ELBO.
2. Nếu một hậu nghiệm xấp xỉ có KL tới tiên nghiệm bằng $0$, có thể kết luận ELBO bằng $-3$ không?
:::

::: hint Gợi ý 1
Dùng (7.3).
:::

::: hint Gợi ý 2
Xác định phân phối ở vị trí thứ hai trong mỗi KL, rồi dùng điều kiện dấu bằng của Bổ đề 14.13.
:::

::: solution Lời giải Bài tập 14.3
**Câu 1.** Theo (7.3), $\mathcal L=\log p_\theta(x)-\mathrm{KL}(q\,\|\, p_\theta(\cdot\mid x))$, nên hai ELBO là $-3-0{,}7=-3{,}7$ và $-3-0{,}2=-3{,}2$. Khi mô hình cố định, KL tới hậu nghiệm nhỏ hơn cho cận chặt hơn.

**Câu 2.** KL tới tiên nghiệm bằng $0$ cho $q=p(z)$ hầu khắp nơi (Bổ đề 14.13). Dấu bằng của cận đòi hỏi $q=p_\theta(\cdot\mid x)$ (Định lý 14.15). Hai điều kiện trùng nhau chỉ khi hậu nghiệm bằng tiên nghiệm, nên nói chung không kết luận được ELBO bằng $-3$.

Ví dụ cụ thể: trong mô hình của Ví dụ 14.7 tại $x=2$, hậu nghiệm là $\mathcal N(1,1/2)$. Với $q=p(z)=\mathcal N(0,1)$, Bổ đề 14.17 cho KL tới hậu nghiệm bằng $\tfrac12\big[\log\tfrac{1/2}{1}+\tfrac{1+1}{1/2}-1\big]=\tfrac12(3-\log2)\approx1{,}1534>0$, nên ELBO nhỏ hơn log-hợp lý.

**Kiểm tra lại.** Cả hai ELBO ở câu 1 nhỏ hơn $-3$, đúng chiều của cận dưới.
:::

## Bài tập tự học

### Bài tập 14.4 (KL tới tiên nghiệm và tái tham số hóa)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 5; tính KL Gaussian, tham số của phép tái tham số hóa, và đánh giá kết luận rút ra từ KL.

::: exercise Bài tập 14.4
Cho $q(z\mid x)=\mathcal N(0,4)$ và $p(z)=\mathcal N(0,1)$.

1. Tính $\mathrm{KL}(q\,\|\, p)$. Phân kỳ có bằng $0$ không?
2. Xác định $\mu,\sigma$ để $z=\mu+\sigma\varepsilon$, $\varepsilon\sim\mathcal N(0,1)$, có phân phối $q$. Tính $z$ tại $\varepsilon=-1$. Giải thích vì sao dùng $\sigma=4$ là sai.
3. Nếu giảm KL này về $0$ mà không biết số hạng tái tạo, có thể kết luận mẫu sinh tốt hơn không?
:::

::: hint Gợi ý 1
Tham số thứ hai trong $\mathcal N(0,4)$ là phương sai. Dùng (7.5) với $k=1$.
:::

::: hint Gợi ý 2
Ở câu 3, đối chiếu hai vai trò của KL trong Định lý 14.15 và số liệu của Tình huống 14.2.
:::

::: solution Lời giải Bài tập 14.4
**Câu 1.** Theo (7.5) với $\mu=0$, $s^2=4$:

$$
\begin{aligned}
&\mathrm{KL}(q\,\|\,p)\\
&\quad=\frac12\big(0+4-1-\log4\big)\\
&\quad=\frac12(3-\log4)\approx0{,}8069.
\end{aligned}
$$

Vì $\log4\approx1{,}3863<3$, KL dương. Theo Mệnh đề 14.18, KL bằng $0$ trong họ này khi và chỉ khi trung bình bằng $0$ và phương sai bằng $1$.

**Câu 2.** Theo Mệnh đề 14.20 với $k=1$, $\mu=0$ và $\sigma=\sqrt4=2$. Tại $\varepsilon=-1$, $z=0+2\cdot(-1)=-2$. Nếu dùng $\sigma=4$, mẫu có phương sai $16$, không phải $4$.

**Câu 3.** Không. KL tới tiên nghiệm nhỏ chỉ cho biết bộ mã hóa gần tiên nghiệm; nó không cho biết mã giữ thông tin của quan sát hay bộ giải mã mô tả dữ liệu ra sao. Trong Tình huống 14.2, KL bằng $0$ nhưng mô hình có $\mathbb E[X_1^2]=1$ trong khi dữ liệu có $\mathbb E[X_1^2]=9$.

**Kiểm tra lại.** $\operatorname{Var}(2\varepsilon)=4\operatorname{Var}(\varepsilon)=4$ theo Mệnh đề 10.24. Lỗi thường gặp là đọc tham số thứ hai của $\mathcal N(0,4)$ là độ lệch chuẩn.
:::

### Bài tập 14.5 (Phương sai mã và lỗi tái tạo theo góc)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1; dùng (4.4) để đọc phương sai giữ lại và lỗi tái tạo theo hướng chiếu.

::: exercise Bài tập 14.5
Cho dữ liệu đã tâm hóa có $S=\operatorname{diag}(3,1)$. Với $u=(\cos\alpha,\sin\alpha)^\top$, biểu diễn phương sai của mã và lỗi tái tạo trung bình theo $\alpha$. Xác định mọi hướng tối ưu và kiểm tra tổng của hai đại lượng.
:::

::: hint Gợi ý 1
Tính $u^\top Su$ rồi áp dụng (4.4) với $\operatorname{tr}(S)=4$.
:::

::: hint Gợi ý 2
Viết $u^\top Su=3\cos^2\alpha+\sin^2\alpha$ theo $\cos^2\alpha$ bằng $\sin^2\alpha=1-\cos^2\alpha$; giá trị lớn nhất của $\cos^2\alpha$ là $1$.
:::

::: solution Lời giải Bài tập 14.5
**Phương sai của mã.** $u^\top Su=3\cos^2\alpha+\sin^2\alpha=1+2\cos^2\alpha$.

**Lỗi tái tạo.** Theo (4.4), $\widehat J=4-(1+2\cos^2\alpha)=3-2\cos^2\alpha$.

**Hướng tối ưu.** Phương sai lớn nhất và lỗi nhỏ nhất khi $\cos^2\alpha=1$, tức $\alpha=j\pi$ với $j$ nguyên, hay $u=\pm(1,0)^\top$. Khi đó phương sai bằng $3$ và lỗi bằng $1$.

**Kiểm tra lại.** Hai đại lượng luôn cộng thành $4=\operatorname{tr}(S)$. Tại $\alpha=\pi/2$, $u=(0,1)^\top$ là vector riêng ứng với $\lambda_2$, nên phương sai bằng $\lambda_2=1$ và lỗi bằng $\operatorname{tr}(S)-\lambda_2=\lambda_1=3$.
:::

### Bài tập 14.6 (Phân tích thành phần chính của dữ liệu theo đường chéo)

**Mức độ:** tính toán, chứng minh. **Mục tiêu:** mục tiêu học tập 1; tính PCA cho dữ liệu không nằm trên trục, chứng minh hướng tối ưu bằng tham số góc, và đánh giá ảnh hưởng của đơn vị đo.

::: exercise Bài tập 14.6
Cho bốn quan sát $(2,2)^\top$, $(-2,-2)^\top$, $(1,-1)^\top$, $(-1,1)^\top$.

1. Tính $\bar x$, $S=n^{-1}\sum_i(x_i-\bar x)(x_i-\bar x)^\top$, các trị riêng và một vector riêng đơn vị ứng với trị riêng lớn nhất.
2. Tính mã và tái tạo một chiều của từng quan sát. Tính tổng và trung bình lỗi bình phương, rồi so sánh trung bình với trị riêng nhỏ.
3. Với $u=(\cos\alpha,\sin\alpha)^\top$, suy ra biểu thức lỗi trung bình theo $\alpha$ và xác định mọi $\alpha$ tối ưu. Giải thích vì sao đổi dấu vector riêng không đổi tái tạo.
4. Nhân tọa độ thứ hai của mọi quan sát với $3$. Tính ma trận hiệp phương sai mới, chứng tỏ $(1,1)^\top/\sqrt2$ không còn là vector riêng, và diễn giải ảnh hưởng của đơn vị đo.
:::

::: hint Gợi ý 1
Tích ngoài của $(2,2)^\top$ là $\begin{pmatrix}4&4\\4&4\end{pmatrix}$, của $(1,-1)^\top$ là $\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$. Ma trận dạng $\begin{pmatrix}a&b\\b&a\end{pmatrix}$ có các vector riêng $(1,1)^\top$ và $(1,-1)^\top$.
:::

::: hint Gợi ý 2
Ở câu 3, dùng (4.4) và $2\sin\alpha\cos\alpha=\sin2\alpha$. Ở câu 4, nhân ma trận mới với $(1,1)^\top$.
:::

::: solution Lời giải Bài tập 14.6
**Câu 1.** Tổng bốn quan sát bằng $(0,0)^\top$, nên $\bar x=0$. Theo (4.1),

$$
\begin{aligned}
S&=\frac14\Bigg[2\begin{pmatrix}4&4\\4&4\end{pmatrix}\\
&\qquad+2\begin{pmatrix}1&-1\\-1&1\end{pmatrix}\Bigg]\\
&=\frac14\begin{pmatrix}10&6\\6&10\end{pmatrix}\\
&=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}.
\end{aligned}
$$

Ta có $S(1,1)^\top=(4,4)^\top$ và $S(1,-1)^\top=(1,-1)^\top$, nên các trị riêng là $\lambda_1=4$, $\lambda_2=1$. Một vector riêng đơn vị ứng với $\lambda_1$ là $u=(1,1)^\top/\sqrt2$.

**Câu 2.** Các mã $u^\top x$ là $4/\sqrt2=2\sqrt2$, $-2\sqrt2$, $0$, $0$. Các tái tạo $u\,(u^\top x)$ là $(2,2)^\top$, $(-2,-2)^\top$, $(0,0)^\top$, $(0,0)^\top$. Lỗi từng điểm là $0,0,2,2$ (vì $\|(1,-1)^\top\|_2^2=2$), tổng bằng $4$ và trung bình bằng $1=\lambda_2$.

**Câu 3.** Phương sai giữ lại là

$$
\begin{aligned}
u^\top Su&=\frac52\cos^2\alpha+\frac52\sin^2\alpha\\
&\quad+2\cdot\frac32\sin\alpha\cos\alpha\\
&=\frac52+\frac32\sin2\alpha.
\end{aligned}
$$

Theo (4.4) với $\operatorname{tr}(S)=5$,

$$
\begin{aligned}
\widehat J(\alpha)&=5-\Big(\frac52+\frac32\sin2\alpha\Big)\\
&=\frac52-\frac32\sin2\alpha.
\end{aligned}
$$

Lỗi nhỏ nhất khi $\sin2\alpha=1$, tức $\alpha=\pi/4+j\pi$ với $j$ nguyên, và giá trị nhỏ nhất là $1$. Hai giá trị $\alpha=\pi/4$ và $\alpha=5\pi/4$ cho $u$ và $-u$; vì $(-u)(-u)^\top=uu^\top$, tái tạo $uu^\top x$ không đổi, chỉ dấu của mã đổi.

**Câu 4.** Các quan sát mới là $(2,6)^\top$, $(-2,-6)^\top$, $(1,-3)^\top$, $(-1,3)^\top$. Ma trận hiệp phương sai mới là

$$
\begin{aligned}
S'&=\frac14\Bigg[2\begin{pmatrix}4&12\\12&36\end{pmatrix}\\
&\qquad+2\begin{pmatrix}1&-3\\-3&9\end{pmatrix}\Bigg]\\
&=\frac14\begin{pmatrix}10&18\\18&90\end{pmatrix}\\
&=\begin{pmatrix}5/2&9/2\\9/2&45/2\end{pmatrix}.
\end{aligned}
$$

Ta có $S'(1,1)^\top=(7,27)^\top$, không tỉ lệ với $(1,1)^\top$, nên $(1,1)^\top/\sqrt2$ không còn là vector riêng. Phương trình đặc trưng $\lambda^2-25\lambda+36=0$ cho $\lambda_1'=(25+\sqrt{481})/2\approx23{,}47$ và $\lambda_2'=(25-\sqrt{481})/2\approx1{,}53$. Vector riêng ứng với $\lambda_1'$ có tỉ số tọa độ $v_2/v_1=(\lambda_1'-5/2)/(9/2)\approx4{,}66$, tức hướng chính lệch khoảng $77{,}9^\circ$ so với trục ngang thay vì $45^\circ$. Đổi đơn vị của một tọa độ làm thay đổi $S$ và kéo hướng chính về phía tọa độ đó; chọn đơn vị hay chuẩn hóa đặc trưng là một lựa chọn mô hình.

**Kiểm tra lại.** Trước khi đổi đơn vị, $\lambda_1+\lambda_2=5=\operatorname{tr}(S)$; sau khi đổi, $\lambda_1'+\lambda_2'=25=\operatorname{tr}(S')$ và $\lambda_1'\lambda_2'=36=\det S'$.
:::

### Bài tập 14.7 (Mã, tái tạo và xác suất của một miền)

**Mức độ:** tính toán, khái niệm. **Mục tiêu:** mục tiêu học tập 2 và 3; phân biệt ánh xạ tái tạo với phân phối của dữ liệu sinh.

::: exercise Bài tập 14.7
Cho $f(x)=3x_1$, $g(z)=(z/3,0)^\top$ và $x=(1,2)^\top$.

1. Tính mã, tái tạo và lỗi bình phương.
2. Xác định ánh xạ $g\circ f$.
3. Giải thích vì sao chỉ từ hai hàm $f,g$ không thể gán xác suất cho miền quan sát $\{x:x_1>1/2\}$. Minh họa bằng hai phân phối khác nhau của $Z$.
:::

::: hint Gợi ý 1
Tính hợp $g\circ f$ trên một $x$ tổng quát, rồi phân biệt ánh xạ với phân phối của đầu vào ánh xạ.
:::

::: hint Gợi ý 2
So sánh $Z$ nhận $\pm3$ với xác suất $1/2$ mỗi giá trị và $Z\sim\mathcal N(0,1)$, với $X=g(Z)$.
:::

::: solution Lời giải Bài tập 14.7
**Câu 1.** Mã là $f(x)=3$, tái tạo là $g(3)=(1,0)^\top$, và lỗi là $\|(1,2)^\top-(1,0)^\top\|_2^2=4$.

**Câu 2.** Với mọi $x$, $g(f(x))=(3x_1/3,0)^\top=(x_1,0)^\top$: phép chiếu lên trục ngang, dù mã đã được nhân với $3$ (như phép đổi tọa độ của Mệnh đề 14.8 với $R=(3)$).

**Câu 3.** Hai hàm không chỉ định phân phối cho $Z$ hay nhiễu quan sát, nên chưa có xác suất của một miền dữ liệu. Với $X=g(Z)$, ta có $X_1=Z/3$, nên $\{X_1>1/2\}=\{Z>3/2\}$.

- Nếu $Z$ nhận $\pm3$ với xác suất $1/2$ mỗi giá trị, $\mathbb P(Z>3/2)=\mathbb P(Z=3)=1/2$.
- Nếu $Z\sim\mathcal N(0,1)$, $\mathbb P(Z>3/2)=1-\Phi(1{,}5)\approx0{,}0668$, với $\Phi$ là hàm phân phối chuẩn.

Cùng hàm $g$ cho hai xác suất khác nhau của cùng một miền.

**Kiểm tra lại.** Lỗi ở câu 1 bằng bình phương tọa độ thứ hai bị bỏ, $2^2=4$, đúng với phép chiếu lên trục ngang ở câu 2.
:::

### Bài tập 14.8 (Bộ tự mã hóa theo đường chéo và giới hạn sinh dữ liệu)

**Mức độ:** tính toán, kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 2 và 6; tính tái tạo, chỉ ra sự không duy nhất của tọa độ mã và giới hạn của bộ tự mã hóa khi sinh dữ liệu.

::: exercise Bài tập 14.8
Dùng bốn quan sát của Bài tập 14.6. Cho $f(x)=x_1+x_2$ và $g(z)=(z/2,z/2)^\top$.

1. Tính mã, tái tạo và lỗi bình phương tại $(2,2)^\top$ và $(1,-1)^\top$.
2. Với $c\ne0$, đặt $f_c(x)=c(x_1+x_2)$ và $g_c(z)=\big(z/(2c),z/(2c)\big)^\top$. Chứng minh tái tạo không đổi. Với giá trị nào của $c$ thì mã bằng tọa độ PCA $u^\top x$, $u=(1,1)^\top/\sqrt2$?
3. Xét hai phân phối của mã: $Z\sim\mathcal N(0,1)$, và $Z$ nhận $\pm4$ với xác suất $1/2$ mỗi giá trị. Với $X=g(Z)$, tính $\mathbb E[X_1^2]$ trong hai trường hợp và so sánh với trung bình $x_1^2$ trên bốn quan sát. Giải thích vì sao hai hàm $f,g$ chưa chỉ định một phân phối sinh.
4. Với $Z\sim\mathcal N(0,1)$ và $X=g(Z)$, giải thích vì sao $X$ không có mật độ hai chiều. Nêu một thay đổi làm $X$ có mật độ trên $\mathbb R^2$, và tính ma trận hiệp phương sai cùng định thức của nó.
:::

::: hint Gợi ý 1
Ở câu 1 và 2, viết $g(f(x))$ thành $uu^\top x$. Ở câu 3, $X_1=Z/2$.
:::

::: hint Gợi ý 2
Ở câu 4, xem lập luận diện tích trong Ví dụ 14.4 và mô hình (6.2).
:::

::: solution Lời giải Bài tập 14.8
**Câu 1.** Tại $(2,2)^\top$: mã $4$, tái tạo $(2,2)^\top$, lỗi $0$. Tại $(1,-1)^\top$: mã $0$, tái tạo $(0,0)^\top$, lỗi $2$.

**Câu 2.** Với mọi $x$,

$$
\begin{aligned}
&g_c(f_c(x))\\
&\quad=\Big(\frac{c(x_1+x_2)}{2c},\frac{c(x_1+x_2)}{2c}\Big)^\top\\
&\quad=\Big(\frac{x_1+x_2}2,\frac{x_1+x_2}2\Big)^\top\\
&\quad=uu^\top x,
\end{aligned}
$$

không phụ thuộc $c$; đây là phép chiếu PCA của Bài tập 14.6. Mã $c(x_1+x_2)=c\sqrt2\,u^\top x$ bằng $u^\top x$ khi và chỉ khi $c=1/\sqrt2$. Với $c=1$ như đề bài, mã gấp $\sqrt2$ lần tọa độ PCA, đúng phép đổi tọa độ của Mệnh đề 14.8 với $R=(\sqrt2)$.

**Câu 3.** Vì $X_1=Z/2$, $\mathbb E[X_1^2]=\mathbb E[Z^2]/4$.

- Với $Z\sim\mathcal N(0,1)$: $\mathbb E[X_1^2]=1/4$.
- Với $Z=\pm4$: $\mathbb E[X_1^2]=16/4=4$.

Trung bình $x_1^2$ trên bốn quan sát là $(4+4+1+1)/4=5/2$. Cùng bộ giải mã cho hai phân phối khác nhau khi đổi phân phối của mã, và không phân phối nào khớp dữ liệu; hai hàm $f,g$ không chứa thông tin để chọn phân phối của $Z$.

**Câu 4.** $X=(Z/2,Z/2)^\top$ nằm trên đường thẳng $x_1=x_2$ với xác suất $1$, một tập có diện tích bằng $0$. Nếu $X$ có mật độ hai chiều, xác suất của tập đó phải bằng $0$, mâu thuẫn. Thêm nhiễu $\eta\sim\mathcal N(0,\tau^2I_2)$ độc lập với $Z$, $\tau>0$, và đặt $X=g(Z)+\eta$: đây là mô hình (6.2), nên $X$ có mật độ (6.1). Vì $Z$ và $\eta$ độc lập, có trung bình $0$,

$$
\begin{aligned}
\operatorname{Cov}(X)&=\frac14\begin{pmatrix}1&1\\1&1\end{pmatrix}+\tau^2I_2,\\
\det\operatorname{Cov}(X)&=\Big(\frac14+\tau^2\Big)^2-\frac1{16}\\
&=\tau^2\Big(\tau^2+\frac12\Big)>0.
\end{aligned}
$$

**Kiểm tra lại.** Khi $\tau\to0$, định thức dần về $0$, ứng với phân phối suy biến trên đường chéo ở đầu câu 4.
:::

### Bài tập 14.9 (KL Gaussian, kỳ vọng tái tạo và ELBO)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 4 và 5; tính từng số hạng của ELBO, tính biên và hậu nghiệm, kiểm tra phân rã (7.3).

::: exercise Bài tập 14.9
Cho $p(z)=\mathcal N(0,1)$, $q(z\mid x)=\mathcal N(1,1/4)$, $p_\theta(x\mid z)=\mathcal N(z,1)$ và quan sát $x=1$.

1. Tính KL tới tiên nghiệm bằng (7.5), giữ logarit ở dạng chính xác.
2. Tính $\mathbb E_q[(1-Z)^2]$ và $\mathbb E_q[\log p_\theta(1\mid Z)]$. Vì sao thay $Z$ bằng trung bình của nó làm mất một số hạng?
3. Kết hợp thành ELBO; giữ $\log(2\pi)$ ở dạng ký hiệu trước khi tính gần đúng.
4. Tính biên $p_\theta(1)$ và hậu nghiệm $p_\theta(z\mid1)$ bằng hoàn bình phương. Tính KL tới hậu nghiệm để kiểm tra (7.3). Mô tả cách sinh một quan sát mới mà không cần biết hậu nghiệm.
5. Với cùng mô hình, nếu đổi $q$ thành hậu nghiệm chính xác, ELBO và KL tới tiên nghiệm thay đổi ra sao? Dùng kết quả để phân biệt cận chặt với KL tới tiên nghiệm nhỏ.
:::

::: hint Gợi ý 1
Dùng $\mathbb E[(a-Z)^2]=(a-\mathbb EZ)^2+\operatorname{Var}(Z)$ (Mệnh đề 10.24) và (7.6) với $d=1$, $\tau^2=1$.
:::

::: hint Gợi ý 2
Ở câu 4, dùng phép hoàn bình phương $-\tfrac{z^2}2-\tfrac{(x-z)^2}2=-(z-\tfrac x2)^2-\tfrac{x^2}4$ và Bổ đề 14.17; phương sai là tham số thứ hai của mỗi Gaussian.
:::

::: solution Lời giải Bài tập 14.9
**Câu 1.** Theo (7.5) với $\mu=1$, $s^2=1/4$:

$$
\begin{aligned}
&\mathrm{KL}(q\,\|\,p)\\
&\quad=\frac12\Big(1+\frac14-1-\log\frac14\Big)\\
&\quad=\frac18+\log2\approx0{,}8181.
\end{aligned}
$$

**Câu 2.** Dưới $q$, $\mathbb E_qZ=1$ và $\operatorname{Var}_q(Z)=1/4$, nên $\mathbb E_q[(1-Z)^2]=(1-1)^2+1/4=1/4$. Theo (7.6),

$$
\begin{aligned}
&\mathbb E_q[\log p_\theta(1\mid Z)]\\
&\quad=-\frac12\log(2\pi)-\frac18.
\end{aligned}
$$

Thay $Z$ bằng trung bình $1$ cho $(1-1)^2=0$, bỏ mất $\operatorname{Var}_q(Z)=1/4$ trong lỗi bình phương, tức số hạng $-1/8$ trong log-mật độ. Nói chung không thể đưa một hàm phi tuyến ra khỏi kỳ vọng.

**Câu 3.** Theo (7.2),

$$
\begin{aligned}
\mathcal L&=-\frac12\log(2\pi)-\frac18-\frac18-\log2\\
&=-\frac12\log(2\pi)-\frac14-\log2\\
&\approx-1{,}8621.
\end{aligned}
$$

**Câu 4.** Với $x=1$, $-\tfrac{z^2}2-\tfrac{(1-z)^2}2=-(z-\tfrac12)^2-\tfrac14$. Theo (6.1) và $\int e^{-(z-1/2)^2}dz=\sqrt\pi$,

$$
\begin{aligned}
p_\theta(1)&=\frac1{2\pi}e^{-1/4}\sqrt\pi\\
&=\frac1{\sqrt{4\pi}}e^{-1/4},\\
\log p_\theta(1)&=-\frac12\log(4\pi)-\frac14\\
&\approx-1{,}5155,
\end{aligned}
$$

tức $p_\theta(1)$ là mật độ $\mathcal N(0,2)$ tại $1$. Theo (6.3), hậu nghiệm tỉ lệ với $e^{-(z-1/2)^2}$, tức $r=p_\theta(\cdot\mid1)=\mathcal N(1/2,1/2)$. Bổ đề 14.17 với $a=1$, $\beta=1/4$, $c=1/2$, $\gamma=1/2$ cho

$$
\begin{aligned}
&\mathrm{KL}(q\,\|\,r)\\
&\quad=\frac12\Big[\log\frac{1/2}{1/4}\\
&\qquad+\frac{1/4+(1-1/2)^2}{1/2}-1\Big]\\
&\quad=\frac12\log2\approx0{,}3466.
\end{aligned}
$$

Cộng vào ELBO: $-\tfrac12\log(2\pi)-\tfrac14-\log2+\tfrac12\log2=-\tfrac12\log(4\pi)-\tfrac14=\log p_\theta(1)$, đúng (7.3).

Để sinh một quan sát mới, lấy $z\sim\mathcal N(0,1)$ rồi lấy $x'\sim\mathcal N(z,1)$, tức $x'=z+\eta$ với $\eta\sim\mathcal N(0,1)$ độc lập; hậu nghiệm không xuất hiện. Quan sát mới có phương sai $2$, còn hậu nghiệm tại $x=1$ có phương sai $1/2$: hai phân phối phục vụ hai phép tính khác nhau của Định nghĩa 14.11.

**Câu 5.** Nếu $q=r$, KL tới hậu nghiệm bằng $0$ và ELBO tăng lên $\log p_\theta(1)=-\tfrac12\log(4\pi)-\tfrac14$. KL tới tiên nghiệm khi đó là

$$
\begin{aligned}
&\frac12\Big(\frac14+\frac12-1-\log\frac12\Big)\\
&\quad=\frac12\log2-\frac18\approx0{,}2216,
\end{aligned}
$$

vẫn dương. Kỳ vọng lỗi bình phương là $(1-1/2)^2+1/2=3/4$, nên kỳ vọng tái tạo là $-\tfrac12\log(2\pi)-\tfrac38$, và trừ KL mới cho đúng $\log p_\theta(1)$. Cận chặt đòi hỏi $q$ khớp hậu nghiệm, không đòi hỏi KL tới tiên nghiệm bằng $0$.

**Kiểm tra lại.** Ở câu 5, $-\tfrac12\log(2\pi)-\tfrac38-\tfrac12\log2+\tfrac18=-\tfrac12\log(4\pi)-\tfrac14$. Khe hở ở câu 4 dương, đúng Bổ đề 14.13.
:::

### Bài tập 14.10 (Mẫu tái tham số hóa và ước lượng gradient)

**Mức độ:** tính toán, kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 5; tính mẫu và gradient theo đường mẫu, kiểm tra điều kiện của Mệnh đề 14.20, và tính gradient của toàn ELBO.

::: exercise Bài tập 14.10
Cho tiên nghiệm $p(z)=\mathcal N(0,1)$, đầu ra bộ mã hóa $\mu=2$, $\sigma=1/2$, và $Z=\mu+\sigma\varepsilon$ với $\varepsilon\sim\mathcal N(0,1)$.

1. Tính $z$ với các giá trị nhiễu $\varepsilon=-1,0,2$. Xác định phương sai của $Z$.
2. Với $x=1$ và $h(z)=\log\mathcal N(1;z,1)$, tính đạo hàm theo $\mu$ và theo $\sigma$ của $h(\mu+\sigma\varepsilon)$ tại mỗi giá trị nhiễu, rồi tính trung bình ba giá trị trong mỗi cột.
3. Tính gradient chính xác của $\mathbb E[h(Z)]$ theo $\mu,\sigma$. So sánh với câu 2 và giải thích ý nghĩa của tính không chệch.
4. Kiểm tra các giả thiết của Mệnh đề 14.20 trên lân cận $|\mu-2|<1$, $|\sigma-1/2|<1/4$, với một hàm chặn $G$ cụ thể. Tính gradient của toàn ELBO theo $\mu,\sigma$ tại $\mu=2$, $\sigma=1/2$.
:::

::: hint Gợi ý 1
Dùng $\partial z/\partial\mu=1$, $\partial z/\partial\sigma=\varepsilon$ và $h'(z)=1-z$. Theo Mệnh đề 10.24, $\mathbb E[h(Z)]=-\tfrac12\log(2\pi)-\tfrac12\big[(1-\mu)^2+\sigma^2\big]$.
:::

::: hint Gợi ý 2
Ở câu 4, chặn $|1-\mu-\sigma\varepsilon|$ bằng $|1-\mu|+\sigma|\varepsilon|$ trên lân cận; gradient của ELBO bằng gradient của kỳ vọng tái tạo trừ gradient của (7.5).
:::

::: solution Lời giải Bài tập 14.10
**Câu 1.** $z=2+\varepsilon/2$ cho $z=3/2,\ 2,\ 3$. Phương sai của $Z$ là $\sigma^2=1/4$.

**Câu 2.** Với $h(z)=-\tfrac12\log(2\pi)-\tfrac12(1-z)^2$, quy tắc dây chuyền cho $\partial h/\partial\mu=1-z$ và $\partial h/\partial\sigma=(1-z)\varepsilon$.

| $\varepsilon$ | $z$ | $\partial h/\partial\mu$ | $\partial h/\partial\sigma$ |
|---|---:|---:|---:|
| $-1$ | $3/2$ | $-1/2$ | $1/2$ |
| $0$ | $2$ | $-1$ | $0$ |
| $2$ | $3$ | $-2$ | $-4$ |

Trung bình cột theo $\mu$ là $(-1/2-1-2)/3=-7/6$; trung bình cột theo $\sigma$ là $(1/2+0-4)/3=-7/6$.

**Câu 3.** Từ biểu thức trong Gợi ý 1, đạo hàm theo $\mu$ là $1-\mu=-1$ và theo $\sigma$ là $-\sigma=-1/2$. Ba giá trị nhiễu có trung bình $1/3$ và trung bình bình phương $5/3$, thay vì $0$ và $1$; vì $\partial h/\partial\mu=1-\mu-\sigma\varepsilon$ và $\partial h/\partial\sigma=(1-\mu)\varepsilon-\sigma\varepsilon^2$, trung bình ba mẫu là $-1-\tfrac12\cdot\tfrac13=-\tfrac76$ và $-\tfrac13-\tfrac12\cdot\tfrac53=-\tfrac76$. Tính không chệch nói rằng khi $\varepsilon$ được lấy ngẫu nhiên theo $\mathcal N(0,1)$, kỳ vọng của ước lượng bằng gradient chính xác; nó không khẳng định đẳng thức cho một bộ ba giá trị cụ thể.

**Câu 4.** Đặt $F(\mu,\sigma,\varepsilon)=h(\mu+\sigma\varepsilon)$, một đa thức theo $(\mu,\sigma)$, nên khả vi liên tục. Hình chữ nhật $|\mu-2|<1$, $|\sigma-1/2|<1/4$ chứa hình cầu mở $\mathcal B$ bán kính $1/4$ quanh $(2,1/2)$, nên các chặn dưới đây đúng trên $\mathcal B$. Trên hình chữ nhật đó, $|1-\mu|<2$ và $\sigma<3/4$, nên

$$
\begin{aligned}
|\partial_\mu F|&=|1-\mu-\sigma\varepsilon|\\
&\le2+\tfrac34|\varepsilon|,\\
|\partial_\sigma F|&=|1-\mu-\sigma\varepsilon|\,|\varepsilon|\\
&\le2|\varepsilon|+\tfrac34\varepsilon^2.
\end{aligned}
$$

Do đó $\|\nabla F\|_2\le|\partial_\mu F|+|\partial_\sigma F|\le G(\varepsilon)=2+3|\varepsilon|+\varepsilon^2$, và $\mathbb E[G(\varepsilon)]=2+3\sqrt{2/\pi}+1<\infty$. Tại $(\mu,\sigma)=(2,1/2)$, $|F|\le\tfrac12\log(2\pi)+\tfrac12(1+\tfrac12|\varepsilon|)^2$ có kỳ vọng hữu hạn. Ba giả thiết của Mệnh đề 14.20 thỏa trên $\mathcal B$.

Theo (7.5), KL tới tiên nghiệm là $\tfrac12(\mu^2+\sigma^2-1-\log\sigma^2)$, có đạo hàm theo $\mu$ bằng $\mu=2$ và theo $\sigma$ bằng $\sigma-1/\sigma=1/2-2=-3/2$. Gradient của ELBO là gradient của kỳ vọng tái tạo trừ gradient của KL:

$$
\begin{aligned}
\frac{\partial\mathcal L}{\partial\mu}&=-1-2=-3,\\
\frac{\partial\mathcal L}{\partial\sigma}&=-\frac12-\Big(-\frac32\Big)=1.
\end{aligned}
$$

**Kiểm tra lại.** Phép tái tham số hóa dùng độ lệch chuẩn $\sigma=1/2$, còn KL dùng $\sigma^2$ và $\log\sigma^2=2\log\sigma$; đạo hàm của $-\tfrac12\log\sigma^2$ theo $\sigma$ là $-1/\sigma$, không phải $-1/(2\sigma^2)$.
:::

### Bài tập 14.11 (KL bằng không, mômen khớp và mô hình sai)

**Mức độ:** kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 6; chẩn đoán một mô hình có KL bằng $0$, cận chặt và mômen bậc hai khớp dữ liệu nhưng không phù hợp dữ liệu.

::: exercise Bài tập 14.11
Dữ liệu một chiều nhận giá trị $-2$ hoặc $2$ với xác suất bằng nhau. Chọn $p(z)=q_\phi(z\mid x)=\mathcal N(0,1)$ với mọi $x$, và $p_\theta(x\mid z)=\mathcal N(0,4)$ không phụ thuộc $z$.

1. Tính KL tới tiên nghiệm, log-mật độ giải mã và ELBO tại hai quan sát.
2. Xác định hậu nghiệm và phân phối biên của mô hình. Cận có chặt không?
3. So sánh $\mathbb E[X^2]$ của mô hình và của dữ liệu, rồi so sánh xác suất của khoảng $(-1,1)$ dưới mô hình và dưới dữ liệu.
4. Đánh giá kết luận "KL bằng $0$, cận chặt và mômen bậc hai khớp nên mô hình sinh tốt".
:::

::: hint Gợi ý 1
Khi $p_\theta(x\mid z)$ không phụ thuộc $z$, mật độ đồng thời là tích $p_\theta(x)p(z)$; dùng (6.3).
:::

::: hint Gợi ý 2
Với $X\sim\mathcal N(0,4)$, $X/2\sim\mathcal N(0,1)$, nên $\mathbb P(|X|<1)=\mathbb P(|X/2|<1/2)=2\Phi(1/2)-1$, với $\Phi$ là hàm phân phối chuẩn.
:::

::: solution Lời giải Bài tập 14.11
**Câu 1.** KL tới tiên nghiệm bằng $0$ vì $q_\phi=p$ (Bổ đề 14.13). Tại $x=\pm2$, $\log\mathcal N(\pm2;0,4)=-\tfrac12\log(8\pi)-\tfrac48=-\tfrac12\log(8\pi)-\tfrac12\approx-2{,}1121$. Giá trị này không phụ thuộc $z$, nên kỳ vọng tái tạo bằng nó và ELBO bằng $-\tfrac12\log(8\pi)-\tfrac12$.

**Câu 2.** Theo (6.3), $p_\theta(z\mid x)=p_\theta(x\mid z)p(z)/p_\theta(x)=p(z)$, vì $p_\theta(x\mid z)=p_\theta(x)$ không phụ thuộc $z$. Phân phối biên của mô hình là $\mathcal N(0,4)$. Hậu nghiệm xấp xỉ trùng hậu nghiệm, nên KL tới hậu nghiệm bằng $0$ và cận chặt: ELBO bằng $\log p_\theta(x)$ (Định lý 14.15).

**Câu 3.** Mô hình có $\mathbb E[X^2]=4$, dữ liệu có $\mathbb E[X^2]=(4+4)/2=4$: mômen bậc hai khớp. Dưới mô hình, $\mathbb P(|X|<1)=2\Phi(1/2)-1\approx0{,}3829$; dưới dữ liệu, xác suất này bằng $0$ vì dữ liệu chỉ nhận $\pm2$.

**Câu 4.** Kết luận sai. Mô hình đặt khoảng $38\%$ xác suất vào khoảng $(-1,1)$, nơi dữ liệu không bao giờ xuất hiện, và mật độ của mô hình lớn nhất tại $0$. Biến ẩn không được dùng, nên mô hình là một Gaussian đơn, không biểu diễn được hai giá trị tách biệt; KL bằng $0$, cận chặt và mômen bậc hai khớp đều không phát hiện sự lệch này.

**Kiểm tra lại.** $\tfrac12\log(8\pi)=\tfrac12(\log8+\log\pi)\approx\tfrac12(2{,}0794+1{,}1447)=1{,}6121$, nên log-mật độ ở câu 1 xấp xỉ $-1{,}6121-0{,}5=-2{,}1121$.
:::
