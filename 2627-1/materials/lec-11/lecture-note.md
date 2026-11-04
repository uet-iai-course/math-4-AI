# Bài 11 — Học từ dữ liệu qua ước lượng thống kê

Bài 10 làm việc với các mô hình xác suất có tham số đã biết. Chẳng hạn, Định lý 10.11 (xác suất toàn phần và định lý Bayes) cập nhật xác suất một sản phẩm bị lỗi khi tỉ lệ lỗi của từng nhà cung cấp và độ nhạy của cảm biến đã được cho trước. Bài 10 kết thúc với nhận xét rằng trong thực tế các con số này chưa biết, và các tham số $\mu_y,\sigma_y^2$ của một số đo liên tục với mô hình $T\mid Y=y\sim\mathcal N(\mu_y,\sigma_y^2)$ cũng vậy; chúng phải được xác định từ dữ liệu. Câu hỏi trung tâm của bài là: **khi một mô hình có tham số chưa biết, ta dùng dữ liệu để xác định tham số đó như thế nào?**

Chúng ta dùng lại các họ phân phối của Bài 10 và xem tham số của chúng là chưa biết:

- phân phối Bernoulli và phân phối phân loại (Định nghĩa 10.19) cho cờ cảnh báo và trạng thái hữu hạn;
- phân phối Gaussian một chiều và nhiều chiều (Định nghĩa 10.20) cho số đo liên tục.

Nguyên lý dùng chung là *ước lượng hợp lý cực đại* (maximum likelihood estimation, MLE): chọn tham số làm cho dữ liệu đã quan sát có xác suất hoặc mật độ lớn nhất.

## Câu hỏi mở đầu

Một dây chuyền ghi hai số đo cho mỗi sản phẩm, đã đưa về cùng một đơn vị quy ước. Bốn sản phẩm vận hành bình thường cho các vector số đo

- $x_1=(12,22)^\top$, $x_2=(8,18)^\top$, $x_3=(11,19)^\top$, $x_4=(9,21)^\top$.

Hai sản phẩm mới cho $a=(13,23)^\top$ và $b=(12,18)^\top$.

**Câu hỏi.** Sản phẩm nào lệch khỏi chế độ vận hành bình thường nhiều hơn?

Câu trả lời hấp dẫn là $a$. Trung bình của bốn vector nền là $\bar x=(10,20)^\top$, và bình phương khoảng cách Euclid tới trung bình là

$$
\begin{aligned}
\lVert a-\bar x\rVert^2&=3^2+3^2=18,\\
\lVert b-\bar x\rVert^2&=2^2+(-2)^2=8.
\end{aligned}
$$

Câu trả lời này sai vì khoảng cách Euclid coi mọi hướng có cùng mức phân tán. Các độ lệch nền $x_i-\bar x$ là $(2,2)^\top$, $(-2,-2)^\top$, $(1,-1)^\top$ và $(-1,1)^\top$: dữ liệu nền dao động mạnh theo hướng $(1,1)^\top$ và yếu theo hướng $(1,-1)^\top$. Độ lệch $a-\bar x=(3,3)^\top$ nằm trọn theo hướng thứ nhất, còn độ lệch $b-\bar x=(2,-2)^\top$ nằm trọn theo hướng thứ hai. Để so sánh đúng, ta cần ước lượng từ dữ liệu nền cả trung bình lẫn ma trận hiệp phương sai, rồi đo độ lệch theo mức phân tán của từng hướng.

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Phát biểu một mô hình thống kê tham số; phân biệt mẫu ngẫu nhiên, dữ liệu quan sát, thống kê và bộ ước lượng; viết hàm hợp lý đúng với cách lấy mẫu.
2. Suy ra và chứng minh ước lượng hợp lý cực đại của mô hình Bernoulli, kể cả khi nghiệm nằm ở biên của miền tham số.
3. Dùng nhân tử Lagrange để suy ra ước lượng hợp lý cực đại của phân phối phân loại và chứng minh đó là cực đại toàn cục, kể cả khi có nhóm chưa xuất hiện trong mẫu.
4. Chứng minh công thức ước lượng trung bình, phương sai và ma trận hiệp phương sai Gaussian, xác định điều kiện tồn tại nghiệm, và phân biệt ước lượng hợp lý cực đại với ước lượng không chệch.
5. Giải thích đường đồng mức của Gaussian bằng trị riêng, vector riêng và khoảng cách Mahalanobis, rồi dùng chúng để so sánh độ lệch của quan sát mới.
6. Suy ra hàm mất mát từ một giả thiết phân phối và giải thích vì sao đổi mô hình xác suất thì đổi mục tiêu học tham số.

Các mục tiêu này cụ thể hóa năng lực xây dựng và phân tích mô hình học máy thuộc CLO2 của học phần.

## Kiến thức tiên quyết

- **Độc lập.** Hai biến ngẫu nhiên $X,Z$ độc lập nếu $\mathbb P(X\in B,Z\in C)=\mathbb P(X\in B)\,\mathbb P(Z\in C)$ với mọi tập Borel $B,C$ (Định nghĩa 10.16). Các biến rời rạc $X_1,\ldots,X_n$ độc lập cùng phân phối (independent and identically distributed, i.i.d.) nếu hàm khối xác suất đồng thời bằng tích các hàm khối xác suất biên và các biến có cùng hàm khối xác suất (Định nghĩa 05c.23).
- **Ba họ phân phối.** $Y\sim\operatorname{Bernoulli}(\theta)$ nếu $\mathbb P(Y=1)=\theta$, $\mathbb P(Y=0)=1-\theta$ với $\theta\in[0,1]$; $Z\sim\operatorname{Cat}(\pi)$ nếu $\mathbb P(Z=k)=\pi_k$ với $\pi_k\ge0$, $\sum_k\pi_k=1$ (Định nghĩa 10.19). Trong Bài 11, $\theta$ là ký hiệu chung cho tham số của một mô hình bất kỳ, nên tham số Bernoulli được viết là $p$. Gaussian một chiều $\mathcal N(\mu,\sigma^2)$ và nhiều chiều $\mathcal N(\mu,\Sigma)$ có các mật độ cho bởi công thức (6.11) và (6.12) của Bài 10, trong Định nghĩa 10.20; các mật độ này được viết lại tại chỗ dùng.
- **Kỳ vọng, phương sai, hiệp phương sai.** Kỳ vọng tuyến tính: $\mathbb E[\alpha X+\beta Z+\gamma]=\alpha\,\mathbb EX+\beta\,\mathbb EZ+\gamma$ (Mệnh đề 10.22 cho biến rời rạc; nhận xét sau mệnh đề và Phụ lục B.1 của Bài 10 cho biến có mật độ). Phương sai $\operatorname{Var}(X)=\mathbb E[(X-\mathbb EX)^2]$ (Định nghĩa 10.23). Hiệp phương sai $\operatorname{Cov}(X,Z)=\mathbb E[(X-\mathbb EX)(Z-\mathbb EZ)]$ (Định nghĩa 10.25) bằng $0$ khi $X,Z$ độc lập và có mômen bậc hai hữu hạn (Mệnh đề 10.27; Phụ lục B.2 của Bài 10 cho biến có mật độ). Với $n$ biến có mômen bậc hai hữu hạn, $\operatorname{Var}\bigl(\sum_iX_i\bigr)=\sum_i\operatorname{Var}X_i+2\sum_{i<j}\operatorname{Cov}(X_i,X_j)$ (Mệnh đề 10.26), và $\operatorname{Var}(aX)=a^2\operatorname{Var}X$ (Mệnh đề 10.24).
- **Trung bình mẫu.** Nếu $X_1,\ldots,X_n$ có cùng kỳ vọng $\mu$, cùng phương sai $\sigma^2<\infty$ và không tương quan đôi một thì $\bar X=\frac1n\sum_iX_i$ có $\mathbb E\bar X=\mu$ và $\operatorname{Var}\bar X=\sigma^2/n$: Định lý 05c.35 cho biến rời rạc, và trường hợp tổng quát suy từ Mệnh đề 10.26 và Mệnh đề 10.24 vì $\operatorname{Var}\bar X=\frac1{n^2}\operatorname{Var}\bigl(\sum_iX_i\bigr)=\frac1{n^2}\cdot n\sigma^2$. Một ước lượng $\hat\mu$ của $\mu$ là không chệch nếu $\mathbb E\hat\mu=\mu$; hiệu $\mathbb E\hat\mu-\mu$ là độ chệch (Định nghĩa 05c.34).
- **Rủi ro thực nghiệm.** Rủi ro thực nghiệm của tham số $\theta$ là trung bình của mất mát trên các quan sát của tập dữ liệu (Định nghĩa 05.5, Định nghĩa 05c.51).
- **Tối ưu có ràng buộc đẳng thức.** Bài toán cực tiểu $F(u)$ với ràng buộc $Au=b$ có hàm Lagrange $\mathcal L(u,\nu)=F(u)+\nu^\top(Au-b)$, với vector nhân tử $\nu$ (Định nghĩa 03.4). Nếu $F$ lồi, khả vi hai lần liên tục trên một tập mở lồi và các hàng của $A$ độc lập tuyến tính, thì $u^*$ là nghiệm khi và chỉ khi tồn tại $\nu^*$ thỏa $\nabla F(u^*)+A^\top\nu^*=0$ và $Au^*=b$ (Mệnh đề 04.2(b)).
- **Bất đẳng thức logarit.** $\log t\le t-1$ với mọi $t>0$, dấu bằng khi và chỉ khi $t=1$. Thật vậy, hàm $t\mapsto t-1-\log t$ có đạo hàm $1-1/t$, âm trên $(0,1)$ và dương trên $(1,\infty)$, nên đạt giá trị nhỏ nhất duy nhất bằng $0$ tại $t=1$.
- **Đại số tuyến tính.** Ma trận đối xứng thực $A$ có phân rã trị riêng $A=U\operatorname{diag}(\lambda_1,\ldots,\lambda_d)U^\top$ với $U$ trực giao, các cột của $U$ là vector riêng đơn vị (Bài 00, mục "Phân rã trị riêng"). Ma trận đối xứng $A$ *xác định dương*, viết $A\succ0$, nếu $w^\top Aw>0$ với mọi $w\ne0$, và *nửa xác định dương*, viết $A\succeq0$, nếu $w^\top Aw\ge0$ với mọi $w$. Với các ma trận vuông cùng cỡ, $\operatorname{tr}(AB)=\operatorname{tr}(BA)$ và $\det(AB)=\det A\det B$.

**Câu hỏi ôn nhanh.**

1. Cho $X_1,X_2$ độc lập, cùng phân phối Bernoulli$(p)$. Tính $\mathbb P(X_1=1,X_2=0)$.
2. Cho $X_1,\ldots,X_n$ độc lập, cùng kỳ vọng và cùng phương sai $\sigma^2$. Tính $\operatorname{Var}(\bar X)$.
3. Tìm trị riêng và vector riêng của ma trận $\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}$.

::: hint Đáp số câu hỏi ôn nhanh
1. Bằng $p(1-p)$: độc lập cho $\mathbb P(X_1=1,X_2=0)=\mathbb P(X_1=1)\,\mathbb P(X_2=0)$.
2. Bằng $\sigma^2/n$: các biến độc lập nên không tương quan đôi một (Mệnh đề 10.27; Phụ lục B.2 của Bài 10 cho biến có mật độ), nên Mệnh đề 10.26 cho $\operatorname{Var}\bigl(\sum_iX_i\bigr)=n\sigma^2$, và Mệnh đề 10.24 cho $\operatorname{Var}\bar X=n\sigma^2/n^2$.
3. Trị riêng $4$ với vector riêng $(1,1)^\top$, vì $\tfrac52+\tfrac32=4$; trị riêng $1$ với vector riêng $(1,-1)^\top$, vì $\tfrac52-\tfrac32=1$.
:::

## 1. Thiết lập bài toán

Một dây chuyền kiểm tra ghi lại cho mỗi sản phẩm một cờ cảnh báo, một trong ba chế độ tải và các số đo liên tục. Bài toán ước lượng của bài gồm các thành phần sau.

- **Dữ liệu:** $D=(x_1,\ldots,x_n)$, với $x_i\in\{0,1\}$ cho cờ cảnh báo, $x_i\in\{1,2,3\}$ cho chế độ tải, $x_i\in\mathbb R$ hoặc $x_i\in\mathbb R^d$ cho số đo.
- **Cơ chế lấy mẫu:** $D$ là giá trị quan sát được của một mẫu ngẫu nhiên $X_1,\ldots,X_n$ độc lập cùng phân phối $P_\theta$.
- **Mô hình:** họ phân phối $\{P_\theta:\theta\in\Theta\}$, chọn trước khi xem dữ liệu; tham số $\theta$ cố định nhưng chưa biết.
- **Bộ ước lượng:** hàm $\hat\theta(X_1,\ldots,X_n)$ của mẫu, tính được mà không cần biết $\theta$; giá trị ước lượng là số $\hat\theta(D)$.
- **Mục tiêu:** chọn $\hat\theta(D)$ sao cho phân phối $P_{\hat\theta}$ phù hợp nhất với dữ liệu theo tiêu chuẩn hợp lý cực đại.
- **Tiêu chuẩn so sánh thứ hai:** tính không chệch, $\mathbb E_\theta[\hat\theta(X_1,\ldots,X_n)]=\theta$, đo hành vi của bộ ước lượng qua các lần lấy mẫu lặp lại.

Bảng dưới phân loại các đại lượng của bài theo nguồn ngẫu nhiên.

| Loại | Đại lượng |
|---|---|
| Cố định, chọn trước | họ $\{P_\theta:\theta\in\Theta\}$, không gian tham số $\Theta$, cỡ mẫu $n$ |
| Cố định, chưa biết | tham số $\theta$, ví dụ $p$, $\pi$, $\mu$, $\sigma^2$, $\Sigma$ |
| Ngẫu nhiên theo $X_1,\ldots,X_n$ i.i.d. $P_\theta$ | $X_i$, $\bar X=\frac1n\sum_iX_i$, bộ ước lượng $\hat\theta(X_1,\ldots,X_n)$ |
| Số đã quan sát | $x_i$, $\bar x=\frac1n\sum_ix_i$, giá trị ước lượng $\hat\theta(x_1,\ldots,x_n)$ |

## 2. Ký hiệu và giả thiết

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $\mathcal X$ | không gian giá trị của một quan sát | tập hữu hạn hoặc $\mathbb R^d$ |
| $\{P_\theta:\theta\in\Theta\}$ | mô hình thống kê tham số | họ phân phối trên $\mathcal X$ |
| $p_\theta$ | hàm khối xác suất hoặc mật độ của một quan sát | hàm không âm trên $\mathcal X$ |
| $X_i$, $x_i$ | quan sát ngẫu nhiên; giá trị đã quan sát | phần tử của $\mathcal X$ |
| $D=(x_1,\ldots,x_n)$ | dữ liệu có thứ tự; $n$ là cỡ mẫu | $\mathcal X^n$, $n\ge1$ |
| $L(\theta;D)$, $\ell(\theta;D)$ | hàm hợp lý; log-hợp lý | $[0,\infty)$; $[-\infty,\infty)$ |
| $\hat R_n(\theta)$ | âm log-hợp lý trung bình (rủi ro thực nghiệm) | $(-\infty,+\infty]$ |
| $p$, $s$ | xác suất Bernoulli; số quan sát bằng $1$ | $[0,1]$; $\{0,\ldots,n\}$ |
| $K$, $n_k$ | số nhóm; số đếm của nhóm $k$ | $K\ge2$; số nguyên không âm |
| $\pi$, $\Delta_{K-1}$ | vector xác suất phân loại; đơn hình xác suất | $\pi\in\Delta_{K-1}\subset\mathbb R^K$ |
| $\mu$, $v=\sigma^2$ | trung bình; phương sai của mô hình | $\mathbb R$ hoặc $\mathbb R^d$; $v>0$ |
| $\bar x$, $Q$ | trung bình mẫu; tổng bình phương sai lệch $\sum_i(x_i-\bar x)^2$ | $\mathbb R$ hoặc $\mathbb R^d$; $Q\ge0$ |
| $Q/n$, $Q/(n-1)$ | phương sai hợp lý cực đại; phương sai không chệch | số không âm |
| $d$ | số chiều của một quan sát vector | số nguyên dương |
| $\operatorname{Cov}(X)$, $\Sigma$ | ma trận hiệp phương sai; tham số hiệp phương sai | đối xứng $d\times d$; $\Sigma\succ0$ |
| $\tilde x_i=x_i-\bar x$ | vector sai lệch so với trung bình mẫu | $\mathbb R^d$ |
| $S_n$, $S_{n-1}$ | hiệp phương sai mẫu với mẫu số $n$; với mẫu số $n-1$ | đối xứng, $\succeq0$ |
| $\Lambda=\Sigma^{-1}$ | ma trận độ chính xác | đối xứng, $\succ0$ |
| $u_j$, $\lambda_j$ | vector riêng đơn vị; trị riêng của $\Sigma$ | $\mathbb R^d$; $\lambda_j>0$ |
| $d_\Sigma(x,\mu)$ | khoảng cách Mahalanobis | số không âm |
| $\operatorname{tr}A$, $\det A$, $I_d$ | vết, định thức, ma trận đơn vị | vô hướng; vô hướng; $d\times d$ |

Các giả thiết của bài chia thành hai nhóm.

**Giả thiết thống kê.**

- **Lấy mẫu:** $X_1,\ldots,X_n$ độc lập cùng phân phối $P_\theta$.
- **Mô hình:** $P_\theta$ thuộc một họ chọn trước: $\operatorname{Bernoulli}(p)$, $\operatorname{Cat}(\pi)$, $\mathcal N(\mu,v)$ hoặc $\mathcal N(\mu,\Sigma)$.
- **Mômen:** $\mathbb E\lVert X_i\rVert^2<\infty$, dùng cho các kết quả về độ chệch; với các kết quả này không cần giả thiết về họ phân phối.

**Giả thiết tối ưu và đại số.**

- **Miền tham số:** $p\in[0,1]$; $\pi\in\Delta_{K-1}$, đơn hình đóng; $\mu\in\mathbb R$ hoặc $\mathbb R^d$; $v>0$; $\Sigma\succ0$.
- **Dữ liệu không suy biến:** $Q>0$ ở một chiều; $S_n\succ0$ ở nhiều chiều.

## 3. Ví dụ xuyên suốt

Các ví dụ của bài dùng chung một dây chuyền kiểm tra sản phẩm. Mỗi ví dụ chép lại dữ liệu nó dùng.

- **Dữ liệu cảm biến hai chiều.** Bốn vector nền $x_1=(12,22)^\top$, $x_2=(8,18)^\top$, $x_3=(11,19)^\top$, $x_4=(9,21)^\top$ và hai quan sát mới $a=(13,23)^\top$, $b=(12,18)^\top$ của Câu hỏi mở đầu. Đây là ví dụ tính tay chính của bài.
- **Dữ liệu một chiều của cùng dây chuyền.** Mười cờ cảnh báo $(1,0,1,1,0,1,1,0,1,1)$; số lần ghi nhận ba chế độ tải thấp, trung bình, cao trong mười bản ghi, $(2,3,5)$; năm độ lệch nhiệt độ so với giá trị danh định, $(0,1,2,3,4)$.
- **Ứng dụng.** Chấm điểm mức lệch của quan sát cảm biến mới bằng Gaussian đã khớp trên dữ liệu nền, như một bước của phát hiện bất thường (anomaly detection).

## 4. Mô hình thống kê, mẫu và hàm hợp lý

Trong Ví dụ 10.4, tỉ lệ lỗi của từng nhà cung cấp được cho trước. Với dây chuyền kiểm tra của bài này, xác suất gắn cờ, tỉ lệ ba chế độ tải, vị trí và mức phân tán của các số đo đều chưa biết, và dữ liệu là căn cứ duy nhất để xác định chúng. Để làm việc đó, chúng ta cần nói rõ dữ liệu được sinh ra như thế nào và một giá trị tham số "phù hợp với dữ liệu" nghĩa là gì.

Một cách trực quan, mỗi giá trị tham số cho một phân phối trên các quan sát có thể xảy ra, và ta chọn giá trị làm cho dữ liệu đã thấy có khả năng xảy ra cao nhất. Câu này chưa phải định nghĩa: còn phải nói rõ khả năng xảy ra của cả bộ dữ liệu được tính từ phân phối của từng quan sát như thế nào.

### 4.1. Mô hình và cách lấy mẫu

Định nghĩa sau tách ba đối tượng: họ phân phối, mẫu ngẫu nhiên và hàm dùng để ước lượng. Nó mở rộng Định nghĩa 05c.23 từ biến rời rạc sang biến và vector có mật độ.

::: definition Định nghĩa 11.1 (Mô hình thống kê tham số, mẫu ngẫu nhiên và bộ ước lượng)
Cho không gian quan sát $\mathcal X$, là một tập hữu hạn hoặc $\mathbb R^d$.

- *Mô hình thống kê tham số* (parametric statistical model): một họ phân phối $\{P_\theta:\theta\in\Theta\}$ trên $\mathcal X$, với không gian tham số $\Theta$ chọn trước. Mỗi $P_\theta$ có hàm khối xác suất hoặc mật độ $p_\theta$.
- *Độc lập:* các biến hoặc vector ngẫu nhiên $X_1,\ldots,X_n$ nhận giá trị trong $\mathcal X$ là độc lập nếu
$$
\begin{aligned}
&\mathbb P(X_1\in B_1,\ldots,X_n\in B_n)\\
&\quad=\prod_{i=1}^n\mathbb P(X_i\in B_i)
\end{aligned}
$$
với mọi tập Borel $B_1,\ldots,B_n\subseteq\mathcal X$.
- *Mẫu ngẫu nhiên độc lập cùng phân phối* cỡ $n$: các biến $X_1,\ldots,X_n$ độc lập và cùng có phân phối $P_\theta$. *Dữ liệu* $D=(x_1,\ldots,x_n)$ là giá trị quan sát được của mẫu.
- *Thống kê* (statistic): một hàm $T(X_1,\ldots,X_n)$ của mẫu, không phụ thuộc tham số chưa biết. Khi dùng $T$ để ước lượng $\theta$, ta gọi $T$ là *bộ ước lượng* (estimator) và số $T(x_1,\ldots,x_n)$ là *giá trị ước lượng* (estimate).
:::

Trong Định nghĩa 11.1, tham số $\theta$ cố định nhưng chưa biết; các $X_i$ và $T(X_1,\ldots,X_n)$ là ngẫu nhiên theo $P_\theta$; các $x_i$ và $T(x_1,\ldots,x_n)$ là số. Phân phối của bộ ước lượng $T(X_1,\ldots,X_n)$ qua các lần lấy mẫu lặp lại được gọi là *phân phối mẫu* (sampling distribution) của nó (Murphy (2022), §4.7.1).

Khi mỗi $X_i$ có hàm khối xác suất hoặc mật độ $p_\theta$, tính độc lập tương đương với việc hàm khối xác suất hoặc mật độ đồng thời của $(X_1,\ldots,X_n)$ tại $(x_1,\ldots,x_n)$ bằng $\prod_ip_\theta(x_i)$. Với biến rời rạc, đó là đẳng thức tích, công thức (3.5) của Bài 05c, trong Định nghĩa 05c.23; với mật độ, ta thừa nhận sự tương đương này. Tính độc lập cũng được giữ qua phép lấy hàm: nếu $g$ là hàm đo được thì $g(X_1),\ldots,g(X_n)$ độc lập, vì $\{g(X_i)\in C\}=\{X_i\in g^{-1}(C)\}$.

Giả thiết "cùng phân phối" chưa đủ để viết phân phối đồng thời thành tích. Hai số đo có cùng phân phối nhưng cùng chịu một nhiễu chung vẫn phụ thuộc nhau. Ví dụ sau so sánh hai cơ chế lấy mẫu cho cùng một chuỗi cờ.

::: example Ví dụ 11.1 (Sáu cờ cảnh báo dưới hai cơ chế lấy mẫu)
**Dữ liệu và mô hình.** Sáu cờ cảnh báo $D=(1,0,1,1,0,0)$. Mỗi cờ $X_i$ có phân phối Bernoulli$(p)$ với cùng tham số $p\in[0,1]$.

**Thống kê.** Số cờ bằng $1$ là $s=3$, và trung bình mẫu là $\bar x=3/6=1/2$. Trước khi lấy mẫu, $\bar X=\frac16\sum_iX_i$ là biến ngẫu nhiên; sau khi quan sát, $\bar x=1/2$ là một số.

**Cơ chế thứ nhất: sáu sản phẩm lấy độc lập.** Theo Định nghĩa 11.1, xác suất của chuỗi $D$ là tích sáu xác suất biên:

$$
\begin{aligned}
&\mathbb P(X_1=1,X_2=0,\ldots,X_6=0)\\
&\quad=p\,(1-p)\,p\,p\,(1-p)\,(1-p)\\
&\quad=p^3(1-p)^3.
\end{aligned}
$$

**Cơ chế thứ hai: một cờ được chép sáu lần.** Thiết bị đọc một cờ $Z\sim\operatorname{Bernoulli}(p)$ rồi ghi $X_1=\cdots=X_6=Z$. Mọi chuỗi có cả số $0$ lẫn số $1$ có xác suất $0$, nên chuỗi $D$ không thể xảy ra.

**Kiểm tra lại.** Dưới cả hai cơ chế, mỗi $X_i$ có cùng phân phối biên: $\mathbb P(X_i=1)=p$. Hai cơ chế chỉ khác nhau ở phân phối đồng thời.

**Diễn giải.** Xác suất của dữ liệu phụ thuộc vào cơ chế lấy mẫu, không chỉ vào phân phối của từng quan sát. Giả thiết độc lập phải dựa vào quy trình thu thập dữ liệu; trung bình mẫu $\bar x=1/2$ là như nhau dưới cả hai cơ chế và không cho biết giả thiết nào đúng.
:::

### 4.2. Hàm hợp lý và bài toán tối ưu

Khi so sánh các giá trị tham số, ta giữ dữ liệu đã quan sát cố định và xem xác suất của dữ liệu là hàm của tham số. Ví dụ sau so sánh hai giá trị của $p$ theo cách đó.

::: example Ví dụ 11.2 (So sánh hai giá trị tham số trên sáu cờ cảnh báo)
**Dữ kiện.** Sáu cờ $D=(1,0,1,1,0,0)$ của sáu sản phẩm lấy độc lập, mô hình Bernoulli$(p)$. Theo Ví dụ 11.1, xác suất của $D$ là $p^3(1-p)^3$.

**Tại $p=1/2$.**

$$
\Bigl(\frac12\Bigr)^3\Bigl(\frac12\Bigr)^3=\frac1{64}\approx0{,}0156.
$$

**Tại $p=0{,}3$.**

$$
\begin{aligned}
0{,}3^3\cdot0{,}7^3&=0{,}027\cdot0{,}343\\
&=0{,}009261\approx0{,}0093.
\end{aligned}
$$

**So sánh.** Tỉ số hai xác suất là $0{,}015625/0{,}009261\approx1{,}69$.

**Kiểm tra lại.** Hàm $p^3(1-p)^3$ không đổi khi thay $p$ bằng $1-p$, nên tại $p=0{,}7$ ta cũng được $0{,}7^3\cdot0{,}3^3=0{,}009261$.

**Diễn giải.** Chuỗi ba cờ trong sáu sản phẩm có khả năng xảy ra dưới $p=1/2$ cao gấp khoảng $1{,}69$ lần so với dưới $p=0{,}3$. Theo tiêu chuẩn này, $p=1/2$ phù hợp với dữ liệu hơn $p=0{,}3$.
:::

Định nghĩa sau đặt tên cho hàm $p\mapsto p^3(1-p)^3$ của Ví dụ 11.2, cho một mô hình thống kê bất kỳ.

::: definition Định nghĩa 11.2 (Hàm hợp lý và ước lượng hợp lý cực đại)
Cho mô hình thống kê tham số $\{P_\theta:\theta\in\Theta\}$ của Định nghĩa 11.1 và dữ liệu $D=(x_1,\ldots,x_n)$ của một mẫu i.i.d.

- *Hàm hợp lý* (likelihood) và *log-hợp lý* (log-likelihood) là các hàm của tham số
$$
\begin{aligned}
L(\theta;D)&=\prod_{i=1}^np_\theta(x_i),\\
\ell(\theta;D)&=\sum_{i=1}^n\log p_\theta(x_i),\\
&\qquad\theta\in\Theta,
\end{aligned}
\tag{4.1}
$$
với quy ước $\log0=-\infty$.
- Một *ước lượng hợp lý cực đại* của $\theta$ là một phần tử của tập
$$
\underset{\theta\in\Theta}{\operatorname{argmax}}\;L(\theta;D).
\tag{4.2}
$$
Tập này có thể rỗng hoặc có nhiều phần tử. Ký hiệu $\hat\theta_{\mathrm{MLE}}$ chỉ dùng khi đã chứng minh tập có đúng một phần tử.
:::

Trong Định nghĩa 11.2, dữ liệu $D$ cố định còn $\theta$ thay đổi. Cùng biểu thức $\prod_ip_\theta(x_i)$, khi $\theta$ cố định và $(x_1,\ldots,x_n)$ thay đổi, là hàm khối xác suất hoặc mật độ đồng thời của mẫu; khi $D$ cố định và $\theta$ thay đổi, nó là hàm hợp lý. Dạng tích trong (4.1) dùng giả thiết độc lập; Ví dụ 11.1 cho thấy nó sai khi các quan sát là bản chép của nhau. Với dữ liệu liên tục, $L$ là tích các giá trị mật độ tại dữ liệu, vì xác suất của đúng một vector quan sát bằng $0$.

Hàm hợp lý cũng khác phân phối hậu nghiệm của tham số. Trong tiếp cận Bayes, ta chọn thêm một phân phối tiên nghiệm (prior) $p(\theta)$ và nhận phân phối hậu nghiệm (posterior)

$$
p(\theta\mid D)\propto L(\theta;D)\,p(\theta).
$$

Khi tiên nghiệm là đều, $p(\theta)\propto1$, điểm lớn nhất của hậu nghiệm trùng với ước lượng hợp lý cực đại (Murphy (2022), §4.2.2); với tiên nghiệm khác, hai điểm này có thể khác nhau. Ước lượng hợp lý cực đại chỉ so sánh xác suất của dữ liệu dưới từng giá trị tham số, còn phát biểu về xác suất của chính tham số cần thêm một tiên nghiệm.

Ví dụ 11.2 so sánh hai giá trị tham số bằng tỉ số của các tích. Với nhiều quan sát, ta làm việc với tổng log thay cho tích, rồi với trung bình của các mất mát. Mệnh đề sau phát biểu chính xác các phép đổi này (Murphy (2022), §4.2.1 và §4.3).

::: proposition Mệnh đề 11.3 (Hợp lý cực đại và tối thiểu hóa rủi ro thực nghiệm) — chứng minh đầy đủ
**Giả thiết.**

- **Mẫu:** $D=(x_1,\ldots,x_n)$, $n\ge1$, là dữ liệu của một mẫu i.i.d. theo Định nghĩa 11.1.
- **Mô hình:** họ $\{P_\theta:\theta\in\Theta\}$ với hàm khối xác suất hoặc mật độ $p_\theta$; quy ước $\log0=-\infty$.

**Kết luận.** Ba tập nghiệm sau bằng nhau:

$$
\begin{aligned}
&\underset{\theta\in\Theta}{\operatorname{argmax}}\,L(\theta;D)\\
&\quad=\underset{\theta\in\Theta}{\operatorname{argmax}}\,\ell(\theta;D)\\
&\quad=\underset{\theta\in\Theta}{\operatorname{argmin}}\,\hat R_n(\theta),\\
&\hat R_n(\theta)=-\frac1n\sum_{i=1}^n\log p_\theta(x_i).
\end{aligned}
\tag{4.3}
$$
:::

::: proof Chứng minh Mệnh đề 11.3
**Lộ trình.** Phép lấy log giữ nguyên thứ tự các giá trị hợp lý; phép nhân với một số âm đảo thứ tự đó.

**Bước 1 (từ $L$ sang $\ell$).** Hàm $\log$ tăng chặt trên $(0,\infty)$, và giá trị quy ước $\log0=-\infty$ nhỏ hơn mọi số thực. Do đó với mọi $\theta,\theta'\in\Theta$, ta có $L(\theta;D)\ge L(\theta';D)$ khi và chỉ khi $\log L(\theta;D)\ge\log L(\theta';D)$. Theo (4.1), log của một tích bằng tổng các log, nên $\log L(\theta;D)=\ell(\theta;D)$; nếu một thừa số bằng $0$ thì cả hai vế bằng $-\infty$. Vậy $L$ và $\ell$ có cùng tập điểm cực đại.

**Bước 2 (từ $\ell$ sang $\hat R_n$).** Theo định nghĩa, $\hat R_n(\theta)=-\ell(\theta;D)/n$. Nhân với số âm $-1/n$ đảo chiều mọi bất đẳng thức, nên $\theta$ là điểm cực đại của $\ell$ khi và chỉ khi $\theta$ là điểm cực tiểu của $\hat R_n$. $\square$

Mọi bài toán ước lượng hợp lý cực đại trên mẫu i.i.d. là một bài toán tối thiểu hóa trung bình mất mát trên dữ liệu.
:::

Hàm $\hat R_n$ là rủi ro thực nghiệm (empirical risk) của Định nghĩa 05c.51 với mất mát $-\log p_\theta(x)$ cho mỗi quan sát $x$. Mất mát này gọi là *âm log-hợp lý* (negative log-likelihood, NLL). Định nghĩa 05c.51 giả thiết mất mát không âm; với mật độ, $-\log p_\theta(x)$ âm khi $p_\theta(x)>1$, nhưng phép tương đương (4.3) không dùng dấu của mất mát.

Trong học máy, tham số của phân phối trở thành biến tối ưu và âm log-hợp lý của từng quan sát trở thành hàm mất mát. Mỗi giả thiết phân phối cho một mất mát riêng, nên đổi giả thiết thì đổi mất mát. Mệnh đề 11.3 chỉ nói về dữ liệu đã thấy: nó không cho biết tham số tìm được dự đoán tốt đến đâu trên quan sát mới.

Như vậy, Định nghĩa 11.1 cố định mô hình và cách lấy mẫu, Định nghĩa 11.2 biến dữ liệu thành hàm hợp lý của tham số, và Mệnh đề 11.3 đổi bài toán ước lượng thành bài toán tối ưu. Tuy nhiên, các kết quả này chưa cho công thức của nghiệm và chưa cho biết nghiệm có tồn tại hay không. Trong Mục 5, ta giải bài toán tối ưu đầu tiên: mô hình Bernoulli với một tham số trên đoạn đóng $[0,1]$, nơi cực đại có thể nằm ở đầu mút.

## 5. Hợp lý cực đại cho mô hình Bernoulli

Dây chuyền ghi được mười cờ cảnh báo $(1,0,1,1,0,1,1,0,1,1)$, trong đó có $7$ cờ bằng $1$. Tỉ lệ $7/10$ là ứng viên tự nhiên cho xác suất gắn cờ. Chúng ta cần chứng minh rằng tiêu chuẩn (4.2) dẫn đúng tới tỉ lệ đó, và xác định nghiệm khi mẫu không có cờ nào bằng $1$, lúc hàm hợp lý không có điểm dừng trong khoảng $(0,1)$.

Một cách trực quan, tăng $p$ làm mỗi số $1$ có xác suất lớn hơn nhưng làm mỗi số $0$ có xác suất nhỏ hơn; khi cả hai giá trị đều xuất hiện, nghiệm cân bằng hai tác động này. Trực giác đó chưa phải lời giải: nó chưa xử lý mẫu toàn số $0$ hoặc toàn số $1$, khi chỉ một tác động có mặt.

### 5.1. Hàm hợp lý Bernoulli và nghiệm

Nhắc lại Định nghĩa 10.19, với tham số Bernoulli viết là $p$ thay cho $\theta$ của Bài 10 vì $\theta$ ở đây là tham số chung của mô hình: $X\sim\operatorname{Bernoulli}(p)$ nếu $\mathbb P(X=1)=p$ và $\mathbb P(X=0)=1-p$, với $p\in[0,1]$. Với quy ước $0^0=1$, có thể viết gọn $\mathbb P(X=x)=p^x(1-p)^{1-x}$ cho $x\in\{0,1\}$. Gọi $s=\sum_ix_i$ là số quan sát bằng $1$. Thay vào (4.1), ta được

$$
\begin{aligned}
L(p;D)&=p^s(1-p)^{n-s},\\
\ell(p;D)&=s\log p\\
&\quad+(n-s)\log(1-p),
\end{aligned}
\tag{5.1}
$$

trong đó số hạng có hệ số $0$ được hiểu bằng $0$ (quy ước $0\log0=0$). Hàm hợp lý chỉ phụ thuộc dữ liệu qua $s$; Murphy (2022), §4.2.3 gọi những đại lượng như vậy là *thống kê đủ* (sufficient statistic). Ở đây $L$ là xác suất của chuỗi có thứ tự. Nếu chỉ quan sát tổng $s$, xác suất của dữ liệu có thêm hệ số $\binom ns$; hệ số này không phụ thuộc $p$ nên không đổi tập nghiệm của (4.2).

Định lý sau cho nghiệm của bài toán cực đại (5.1) trên toàn đoạn $[0,1]$, kể cả khi $s=0$ hoặc $s=n$ (Murphy (2022), §4.2.3).

::: theorem Định lý 11.4 (Ước lượng Bernoulli, kể cả nghiệm biên) — chứng minh đầy đủ
**Giả thiết.**

- **Mẫu:** $x_1,\ldots,x_n\in\{0,1\}$, $n\ge1$, là dữ liệu của một mẫu i.i.d. Bernoulli$(p)$; $s=\sum_ix_i$.
- **Miền tham số:** $p\in[0,1]$, kể cả hai đầu mút.

**Kết luận.** Hàm hợp lý (5.1) có đúng một điểm cực đại trên $[0,1]$:

$$
\hat p_{\mathrm{MLE}}=\frac sn=\bar x.
\tag{5.2}
$$

Nghiệm thuộc $(0,1)$ khi $0<s<n$, bằng $0$ khi $s=0$ và bằng $1$ khi $s=n$.
:::

::: proof Chứng minh Định lý 11.4
**Lộ trình.** Xét ba trường hợp theo $s$. Khi $0<s<n$, dấu của đạo hàm cho thấy $\ell$ tăng rồi giảm, và hai đầu mút có hợp lý bằng $0$. Khi $s=0$ hoặc $s=n$, hàm hợp lý đơn điệu trên $[0,1]$.

**Bước 1 ($0<s<n$: dấu của đạo hàm).** Trên $(0,1)$, cả $\log p$ và $\log(1-p)$ khả vi, và

$$
\begin{aligned}
\ell'(p)
&=\frac sp-\frac{n-s}{1-p}\\
&=\frac{s(1-p)-(n-s)p}{p(1-p)}\\
&=\frac{s-np}{p(1-p)}.
\end{aligned}
$$

Vì $p(1-p)>0$, dấu của $\ell'(p)$ là dấu của $s-np$: dương khi $p<s/n$ và âm khi $p>s/n$. Do đó $\ell$ tăng chặt trên $(0,s/n]$, giảm chặt trên $[s/n,1)$, và $s/n$ là điểm cực đại duy nhất trên $(0,1)$.

**Bước 2 ($0<s<n$: hai đầu mút).** Tại $p=0$, thừa số $p^s$ với $s\ge1$ bằng $0$; tại $p=1$, thừa số $(1-p)^{n-s}$ với $n-s\ge1$ bằng $0$. Vậy $L(0;D)=L(1;D)=0<L(s/n;D)$, và $s/n$ là điểm cực đại duy nhất trên $[0,1]$.

**Bước 3 ($s=0$).** Khi đó $L(p;D)=(1-p)^n$, giảm chặt trên $[0,1]$ vì $n\ge1$. Điểm cực đại duy nhất là $p=0=s/n$.

**Bước 4 ($s=n$).** Khi đó $L(p;D)=p^n$, tăng chặt trên $[0,1]$. Điểm cực đại duy nhất là $p=1=s/n$. Cả ba trường hợp đều cho (5.2). $\square$

Tần suất mẫu là ước lượng hợp lý cực đại của xác suất Bernoulli trong mọi trường hợp, với điều kiện miền tham số chứa cả hai đầu mút.
:::

Định lý 11.4 dùng hai giả thiết. Giả thiết i.i.d. cho dạng tích (5.1); khi các cờ là bản chép của nhau như cơ chế thứ hai của Ví dụ 11.1, hàm hợp lý khác hẳn. Giả thiết miền đóng $[0,1]$ bảo đảm nghiệm tồn tại khi $s\in\{0,n\}$: Bước 3 và Bước 4 dùng đúng hai đầu mút. Nghiệm $\hat p=0$ chỉ nói rằng dữ liệu đã thấy có hợp lý lớn nhất khi $p=0$; xác suất thật vẫn có thể dương.

Trong học máy, Định lý 11.4 là cách học xác suất của một nhãn nhị phân khi mọi quan sát dùng chung một xác suất $p$, chưa dùng đặc trưng đầu vào. Chia âm log-hợp lý (5.1) cho $n$, ta được *entropy chéo nhị phân* (binary cross-entropy)

$$
\begin{aligned}
\hat R_n(p)&=-\frac1n\sum_{i=1}^n\bigl[x_i\log p\\
&\qquad+(1-x_i)\log(1-p)\bigr],
\end{aligned}
$$

là hàm mất mát của bài toán phân loại nhị phân. Theo Mệnh đề 11.3, cực tiểu hóa entropy chéo nhị phân theo $p$ cho đúng nghiệm (5.2).

Ví dụ sau áp dụng Định lý 11.4 cho mười cờ cảnh báo của dây chuyền và so sánh nghiệm với giá trị $p=1/2$.

::: example Ví dụ 11.3 (Mười cờ cảnh báo)
**Dữ liệu và mô hình.** Mười cờ $(1,0,1,1,0,1,1,0,1,1)$ của mười sản phẩm lấy độc lập trong cùng một chế độ vận hành; mô hình i.i.d. Bernoulli$(p)$ với $p\in[0,1]$.

**Ước lượng.** Ta có $s=7$ và $n=10$. Vì $0<s<n$, Định lý 11.4 cho $\hat p=7/10=0{,}7$.

**So sánh với $p=1/2$.** Theo (5.1),

$$
\begin{aligned}
L(1/2;D)&=(1/2)^{10}=1/1024\\
&\approx0{,}000977,\\
L(0{,}7;D)&=0{,}7^7\cdot0{,}3^3\\
&\approx0{,}0823543\cdot0{,}027\\
&\approx0{,}002224.
\end{aligned}
$$

Tỉ số hai hợp lý là $2^{10}\cdot0{,}7^7\cdot0{,}3^3\approx2{,}277$.

**Kiểm tra lại.** Theo Bước 1 của chứng minh, $\ell'(p)=(7-10p)/[p(1-p)]$: dương khi $p<0{,}7$, bằng $0$ tại $p=0{,}7$ và âm khi $p>0{,}7$.

**Dự đoán thế tham số.** *Dự đoán thế tham số* (plug-in prediction) thay $\hat p$ vào mô hình để tính xác suất của quan sát mới. Theo mô hình đã khớp, sản phẩm tiếp theo bị gắn cờ với xác suất $0{,}7$.

**Diễn giải.** Dưới $p=0{,}7$, chuỗi mười cờ đã thấy có khả năng xảy ra cao gấp khoảng $2{,}28$ lần so với dưới $p=1/2$. Xác suất gắn cờ thật của dây chuyền có thể khác $0{,}7$; mười quan sát chỉ xác định giá trị phù hợp nhất với dữ liệu đã thấy.
:::

Hai đầu mút của miền tham số quyết định Bước 3 và Bước 4 của chứng minh Định lý 11.4. Nhận xét sau cho thấy điều xảy ra khi bỏ chúng.

::: remark Nhận xét 11.5 (Miền tham số mở và số đếm bằng không)
Nếu miền tham số là $(0,1)$ và mẫu toàn số $0$, hàm hợp lý $(1-p)^n$ tiến tới cận trên $1$ khi $p\downarrow0$ nhưng không đạt cận đó tại điểm nào của $(0,1)$. Vì vậy không tồn tại ước lượng hợp lý cực đại trên $(0,1)$, dù trên $[0,1]$ nghiệm là $\hat p=0$; đổi miền tham số thì đổi kết luận về sự tồn tại nghiệm.

Trên miền $[0,1]$, nghiệm $\hat p=0$ gán xác suất $0$ cho mọi cờ bằng $1$ về sau, dù với mọi $0<p<1$, xác suất quan sát $n$ số $0$ là $(1-p)^n>0$. Murphy (2022) xem hiện tượng này là một dạng quá khớp (overfitting) (§4.5) và gọi nó là bài toán số đếm bằng không (zero-count problem) (§4.5.1).
:::

### 5.2. Mở rộng: ước lượng Bayes với tiên nghiệm Beta

Một cách tránh nghiệm $\hat p=0$ là đưa thêm thông tin tiên nghiệm về $p$. Giả sử $p$ có phân phối tiên nghiệm Beta$(a_0,b_0)$ với $a_0,b_0>0$, tức là có mật độ tỉ lệ với $p^{a_0-1}(1-p)^{b_0-1}$ trên $(0,1)$. Nhân mật độ này với hàm hợp lý (5.1), mật độ hậu nghiệm tỉ lệ với

$$
p^{a_0+s-1}(1-p)^{b_0+n-s-1},
$$

nên hậu nghiệm là Beta$(a_0+s,\,b_0+n-s)$ (Murphy (2022), §4.6.2.4). Kỳ vọng của Beta$(\alpha,\beta)$ là $\alpha/(\alpha+\beta)$ (Murphy (2022), §4.6.2.7), nên trung bình hậu nghiệm là

$$
\mathbb E[p\mid D]=\frac{a_0+s}{a_0+b_0+n}.
\tag{5.3}
$$

Với tiên nghiệm đều $a_0=b_0=1$ và mẫu toàn số $0$, (5.3) cho $1/(n+2)>0$. Với mười cờ của Ví dụ 11.3 ($s=7$, $n=10$), (5.3) cho $8/12=2/3$, nằm giữa $\hat p=0{,}7$ và trung bình tiên nghiệm $1/2$. Trung bình hậu nghiệm dùng thêm giả thiết tiên nghiệm, nên nó là một phương pháp ước lượng khác với (5.2).

Như vậy, Định lý 11.4 giải trọn bài toán một tham số: dấu của đạo hàm xử lý phần trong, đánh giá trực tiếp xử lý hai đầu mút, và Nhận xét 11.5 cho thấy miền tham số quyết định sự tồn tại nghiệm. Tuy nhiên, với ba chế độ tải, ba xác suất phải cùng thỏa ràng buộc tổng bằng $1$, nên không thể tối ưu riêng từng tọa độ. Trong Mục 6, ta thay đoạn $[0,1]$ bằng đơn hình xác suất và dùng nhân tử Lagrange cho ràng buộc đó.

## 6. Ước lượng phân loại và tối ưu có ràng buộc

Trong mười bản ghi, dây chuyền ghi nhận chế độ tải thấp $2$ lần, trung bình $3$ lần và cao $5$ lần. Các tần suất $(0{,}2;\ 0{,}3;\ 0{,}5)$ là ứng viên cho ba xác suất chế độ. Nếu cực đại hóa riêng từng thừa số $\pi_k^{n_k}$ của hàm hợp lý, mỗi tọa độ $\pi_k$ đều muốn tăng tới $1$ và kết quả không còn là một phân phối. Chúng ta cần một bài toán tối ưu giữ ràng buộc chuẩn hóa $\sum_k\pi_k=1$.

Một cách trực quan, tổng khối lượng xác suất bằng $1$ được chia cho các nhóm, và tăng xác suất của một nhóm buộc phải lấy bớt từ các nhóm khác. Trực giác này chưa cho biết cách chia nào làm hợp lý lớn nhất, và nhóm có số đếm bằng $0$ nhận bao nhiêu.

### 6.1. Hàm hợp lý phân loại

Nhắc lại Định nghĩa 10.19: $X\sim\operatorname{Cat}(\pi)$ nếu $\mathbb P(X=k)=\pi_k$, $k=1,\ldots,K$, với $\pi_k\ge0$ và $\sum_k\pi_k=1$. Định nghĩa sau đặt tên cho miền tham số và viết hàm hợp lý trên miền đó.

::: definition Định nghĩa 11.6 (Đơn hình xác suất và hàm hợp lý phân loại)
Cho số nhóm $K\ge2$ và dữ liệu $D=(x_1,\ldots,x_n)$, $x_i\in\{1,\ldots,K\}$, của một mẫu i.i.d. $\operatorname{Cat}(\pi)$.

- *Đơn hình xác suất* (probability simplex) là tập
$$
\begin{aligned}
&\Delta_{K-1}=\Bigl\{\pi\in\mathbb R^K:\\
&\qquad\pi_k\ge0\ \text{với mọi }k,\\
&\qquad\sum_{k=1}^K\pi_k=1\Bigr\}.
\end{aligned}
$$
- *Số đếm* của nhóm $k$ là $n_k=\sum_{i=1}^n\mathbf 1[x_i=k]$, trong đó $\mathbf 1[x_i=k]$ bằng $1$ nếu $x_i=k$ và bằng $0$ nếu ngược lại; ta có $\sum_kn_k=n$.
- *Hàm hợp lý phân loại* và log-hợp lý tương ứng là
$$
\begin{aligned}
&L(\pi;D)=\prod_{k=1}^K\pi_k^{n_k},\\
&\ell(\pi;D)\\
&\quad=\sum_{k:\,n_k>0}n_k\log\pi_k,\\
&\qquad\pi\in\Delta_{K-1},
\end{aligned}
\tag{6.1}
$$
với quy ước $\pi_k^0=1$.
:::

Công thức (6.1) suy từ (4.1): mỗi quan sát $x_i=k$ góp một thừa số $\pi_k$, và nhóm $k$ góp $n_k$ thừa số như vậy. Hàm hợp lý chỉ phụ thuộc dữ liệu qua các số đếm $(n_1,\ldots,n_K)$, là thống kê đủ của mô hình. Với $K=2$, đặt $\pi=(1-p,p)$ sau khi đổi nhãn $0,1$ thành $1,2$; khi đó (6.1) trở lại (5.1), và ràng buộc $\pi_1+\pi_2=1$ chỉ để lại một bậc tự do. Với $K\ge3$, ràng buộc tổng liên kết mọi tọa độ cùng lúc.

Các xác suất trong $\Delta_{K-1}$ mô tả một biến nhận đúng một trong $K$ giá trị. Chúng khác $K$ tham số Bernoulli của $K$ chỉ báo có thể đồng thời bằng $1$: các tham số đó không chịu ràng buộc tổng bằng $1$.

Định lý sau giải bài toán cực đại (6.1) trên $\Delta_{K-1}$ (Murphy (2022), §4.2.4). Chứng minh dùng hàm Lagrange của Định nghĩa 03.4 để tìm ứng viên, rồi dùng bất đẳng thức $\log t\le t-1$ để chứng minh ứng viên là cực đại toàn cục.

::: theorem Định lý 11.7 (Ước lượng phân loại) — chứng minh đầy đủ
**Giả thiết.**

- **Mẫu:** $n\ge1$ quan sát của một mẫu i.i.d. $\operatorname{Cat}(\pi)$, với số đếm $n_1,\ldots,n_K$ theo Định nghĩa 11.6.
- **Miền tham số:** đơn hình đóng $\Delta_{K-1}$; được phép có $\pi_k=0$.

**Kết luận.** Hàm hợp lý (6.1) có đúng một điểm cực đại trên $\Delta_{K-1}$:

$$
\begin{gathered}
\hat\pi_k=\frac{n_k}{n},\\
k=1,\ldots,K.
\end{gathered}
\tag{6.2}
$$

Đặc biệt, nhóm chưa xuất hiện trong mẫu ($n_k=0$) nhận $\hat\pi_k=0$.
:::

::: proof Chứng minh Định lý 11.7
**Lộ trình.** Gọi $\mathcal K_+=\{k:n_k>0\}$ là tập các nhóm đã xuất hiện. Bước 1 dùng nhân tử Lagrange trên các tọa độ thuộc $\mathcal K_+$ để tìm ứng viên; điều kiện dừng chỉ là điều kiện cần. Bước 2 so sánh ứng viên với mọi điểm của $\Delta_{K-1}$ bằng bất đẳng thức $\log t\le t-1$, và Bước 3 xét dấu bằng.

**Bước 1 (ứng viên từ nhân tử Lagrange).** Một điểm có hợp lý dương phải có $\pi_k>0$ với mọi $k\in\mathcal K_+$. Trên các tọa độ đó, xét bài toán cực tiểu $F(\pi_+)=-\sum_{k\in\mathcal K_+}n_k\log\pi_k$ với ràng buộc $\sum_{k\in\mathcal K_+}\pi_k=1$, trong đó $\pi_+=(\pi_k)_{k\in\mathcal K_+}$ có mọi tọa độ dương. Theo Định nghĩa 03.4, hàm Lagrange là

$$
\begin{aligned}
\mathcal L(\pi_+,\nu)&=-\sum_{k\in\mathcal K_+}n_k\log\pi_k\\
&\quad+\nu\Bigl(\sum_{k\in\mathcal K_+}\pi_k-1\Bigr).
\end{aligned}
$$

Cho đạo hàm riêng theo $\pi_k$ bằng $0$, ta được $-n_k/\pi_k+\nu=0$, tức $\pi_k=n_k/\nu$. Cộng theo $k\in\mathcal K_+$ và dùng ràng buộc:

$$
1=\sum_{k\in\mathcal K_+}\pi_k=\frac1\nu\sum_{k\in\mathcal K_+}n_k=\frac n\nu,
$$

nên $\nu=n$ và $\pi_k=n_k/n$. Hàm $F$ lồi, khả vi hai lần liên tục trên tập mở lồi $\{\pi_+:\pi_k>0\}$, nên theo Mệnh đề 04.2(b), điểm này là nghiệm của bài toán trên các tọa độ thuộc $\mathcal K_+$. Tổng các tọa độ đó đã bằng $1$, nên các tọa độ còn lại bằng $0$, và ta được ứng viên (6.2).

**Bước 2 (so sánh với mọi điểm của đơn hình).** Lấy $\pi\in\Delta_{K-1}$ bất kỳ. Nếu $\pi_k=0$ với một $k\in\mathcal K_+$ thì $L(\pi;D)=0<L(\hat\pi;D)$. Ngược lại, mọi $\pi_k$ với $k\in\mathcal K_+$ đều dương, và

$$
\begin{aligned}
&\ell(\pi;D)-\ell(\hat\pi;D)\\
&\quad=\sum_{k\in\mathcal K_+}n_k\log\frac{\pi_k}{\hat\pi_k}\\
&\quad\le\sum_{k\in\mathcal K_+}n_k\Bigl(\frac{\pi_k}{\hat\pi_k}-1\Bigr)\\
&\quad=\sum_{k\in\mathcal K_+}(n\pi_k-n_k)\\
&\quad=n\Bigl(\sum_{k\in\mathcal K_+}\pi_k-1\Bigr)\\
&\quad\le0.
\end{aligned}
$$

Bất đẳng thức thứ nhất dùng $\log t\le t-1$ với $t=\pi_k/\hat\pi_k>0$; hai đẳng thức tiếp theo dùng $n_k/\hat\pi_k=n$ và $\sum_{k\in\mathcal K_+}n_k=n$; bất đẳng thức cuối dùng $\sum_{k\in\mathcal K_+}\pi_k\le\sum_{k=1}^K\pi_k=1$.

**Bước 3 (tính duy nhất).** Dấu bằng ở bất đẳng thức thứ nhất cần $\pi_k=\hat\pi_k$ với mọi $k\in\mathcal K_+$, theo điều kiện dấu bằng của $\log t\le t-1$. Dấu bằng ở bất đẳng thức cuối cần $\sum_{k\in\mathcal K_+}\pi_k=1$, tức $\pi_k=0$ với mọi $k\notin\mathcal K_+$. Hai điều kiện cùng cho $\pi=\hat\pi$. $\square$

Khi không có ràng buộc nào khác ngoài đơn hình, tần suất của từng nhóm là phân phối khớp dữ liệu tốt nhất, và mọi khối lượng dành cho nhóm chưa thấy đều làm giảm hợp lý.
:::

Định lý 11.7 mở rộng Định lý 11.4: với $K=2$ và $\pi=(1-p,p)$, (6.2) cho $\hat p=n_2/n$, đúng (5.2). Giả thiết miền đóng lại quyết định sự tồn tại nghiệm. Nếu yêu cầu mọi $\pi_k>0$ mà có $n_k=0$, cận trên của hợp lý không đạt được, vì điểm cực đại duy nhất trên đơn hình đóng có $\hat\pi_k=0$.

Trong học máy, (6.2) học phân phối của nhãn hoặc trạng thái từ các số đếm. Chia âm log-hợp lý cho $n$, ta được *entropy chéo nhiều lớp* (categorical cross-entropy)

$$
\begin{aligned}
\hat R_n(\pi)&=-\frac1n\sum_{i=1}^n\log\pi_{x_i}\\
&=-\sum_{k:\,n_k>0}\frac{n_k}n\log\pi_k.
\end{aligned}
$$

Khi các xác suất được tính bằng một mô hình có tham số dùng chung cho nhiều đầu vào, các tọa độ $\pi_k$ không thể chọn tự do trên $\Delta_{K-1}$, nên công thức tần suất (6.2) chỉ áp dụng cho mô hình phân loại không có ràng buộc thêm.

Với ba chế độ tải của dây chuyền, Định lý 11.7 cho ba xác suất chế độ, và điều kiện dừng của Bước 1 cho một phép kiểm tra lại.

::: example Ví dụ 11.4 (Ba chế độ tải trong mười bản ghi)
**Dữ liệu và mô hình.** Mười bản ghi lấy độc lập; chế độ tải thấp, trung bình, cao (nhóm $1,2,3$) có số đếm $(n_1,n_2,n_3)=(2,3,5)$. Mô hình i.i.d. $\operatorname{Cat}(\pi)$ trên $\Delta_2$.

**Tập nhóm đã xuất hiện.** Mọi số đếm đều dương, nên $\mathcal K_+=\{1,2,3\}$ và $n=2+3+5=10$.

**Ước lượng.** Theo (6.2),

$$
\begin{aligned}
\hat\pi&=\Bigl(\frac2{10},\frac3{10},\frac5{10}\Bigr)\\
&=(0{,}2;\ 0{,}3;\ 0{,}5).
\end{aligned}
$$

**Kiểm tra lại.** Các tọa độ không âm và $0{,}2+0{,}3+0{,}5=1$. Điều kiện dừng của Bước 1 cũng đúng: $2/0{,}2=3/0{,}3=5/0{,}5=10=n$.

**Diễn giải.** Chế độ tải cao có xác suất lớn nhất dưới mô hình đã khớp. Ba xác suất cùng mô tả một bản ghi có đúng một chế độ, nên tăng một xác suất buộc phải giảm các xác suất còn lại.
:::

Ví dụ 11.4 có mọi số đếm dương. Khi một nhóm vắng mặt, điều kiện dừng của Bước 1 không viết được cho nhóm đó, và kết luận về nhóm vắng mặt dựa vào Bước 2.

::: remark Nhận xét 11.8 (Nhóm không xuất hiện trong mẫu)
Với số đếm $(3,0,7)$, ta có $\mathcal K_+=\{1,3\}$, $n=10$, và Định lý 11.7 cho $\hat\pi=(0{,}3;\ 0;\ 0{,}7)$. Điều kiện dừng $n_2/\pi_2=\nu$ không viết được tại $\pi_2=0$ vì nó trở thành phép chia $0/0$; Bước 2 của chứng minh xử lý điểm biên này mà không cần đạo hàm.

Khi xác suất thật của nhóm thứ hai dương nhưng nhỏ, việc nhóm đó vắng mặt trong một mẫu hữu hạn vẫn có xác suất dương, và mô hình đã khớp gán xác suất $0$ cho nhóm đó về sau. Đây là bài toán số đếm bằng không của Nhận xét 11.5, với $K=3$ nhóm. Với mô hình Bernoulli, Murphy (2022), §4.5.1 xử lý nó bằng tiên nghiệm Beta$(2,2)$, tương đương cộng thêm một vào mỗi số đếm (add-one smoothing).
:::

### 6.2. Mở rộng: diễn giải bằng phân kỳ Kullback–Leibler

Định lý 11.7 còn có một cách đọc theo độ khác biệt giữa hai phân phối: phân phối tần suất của dữ liệu và phân phối của mô hình (Murphy (2022), §6.2). Với hai phân phối $q,\pi$ trên $K$ nhóm, *phân kỳ Kullback–Leibler* (Kullback–Leibler divergence, KL) từ $q$ đến $\pi$ là

$$
\mathrm{KL}(q\,\|\,\pi)=\sum_{k:\,q_k>0}q_k\log\frac{q_k}{\pi_k},
$$

với giá trị $+\infty$ khi có $q_k>0$ mà $\pi_k=0$. Khi mọi $\pi_k$ trên tập $\{k:q_k>0\}$ đều dương, bất đẳng thức $\log t\le t-1$ với $t=\pi_k/q_k$ cho

$$
\begin{aligned}
-\mathrm{KL}(q\,\|\,\pi)
&=\sum_{k:\,q_k>0}q_k\log\frac{\pi_k}{q_k}\\
&\le\sum_{k:\,q_k>0}q_k\Bigl(\frac{\pi_k}{q_k}-1\Bigr)\\
&=\sum_{k:\,q_k>0}\pi_k-1\\
&\le0.
\end{aligned}
$$

Dòng thứ ba dùng $\sum_{k:\,q_k>0}q_k=1$; dòng cuối dùng $\sum_{k:\,q_k>0}\pi_k\le1$. Do đó $\mathrm{KL}(q\,\|\,\pi)\ge0$. Dấu bằng cần $\pi_k=q_k$ trên tập $\{k:q_k>0\}$ và $\pi$ không đặt khối lượng ngoài tập đó, tức $\pi=q$. Murphy chứng minh cùng kết quả bằng bất đẳng thức Jensen (§6.2.4); ở đây ta dùng $\log t\le t-1$ như trong Định lý 11.7.

Áp dụng cho phân phối tần suất $q_k=n_k/n$, ta tách âm log-hợp lý trung bình thành hai phần. Với mọi $\pi$ có $\pi_k>0$ trên $\{k:q_k>0\}$, thêm và bớt $\sum_{k:\,q_k>0}q_k\log q_k$ cho

$$
\begin{aligned}
&-\frac1n\ell(\pi;D)\\
&\quad=-\sum_{k:\,q_k>0}q_k\log\pi_k\\
&\quad=H(q)+\mathrm{KL}(q\,\|\,\pi),\\
&H(q)=-\sum_{k:\,q_k>0}q_k\log q_k,
\end{aligned}
\tag{6.3}
$$

trong đó $H(q)$ là *entropy* của phân phối tần suất. Vì $H(q)$ không phụ thuộc $\pi$, cực tiểu hóa entropy chéo nhiều lớp tương đương cực tiểu hóa $\mathrm{KL}(q\,\|\,\pi)$, và giá trị nhỏ nhất $0$ đạt duy nhất tại $\pi=q$, tức (6.2). Đây là một chứng minh thứ hai của Định lý 11.7 (Murphy (2022), §6.2.5).

Như vậy, Định lý 11.7 dùng nhân tử Lagrange để tìm ứng viên và bất đẳng thức $\log t\le t-1$ để chứng minh ứng viên là cực đại toàn cục trên đơn hình đóng, kể cả khi có nhóm vắng mặt; (6.3) đọc cùng kết quả là phép chọn phân phối mô hình gần phân phối tần suất nhất theo độ phân kỳ KL. Tuy nhiên, Mục 5 và Mục 6 chỉ xét dữ liệu nhận hữu hạn giá trị, với tham số là các xác suất. Trong Mục 7, ta chuyển sang số đo liên tục với mô hình Gaussian; khi đó tham số mô tả vị trí và mức phân tán, và hàm hợp lý chứa thêm một hệ số chuẩn hóa phụ thuộc phương sai.

## 7. Gaussian một chiều: trung bình và phương sai

Một nhiệt kế đo độ lệch nhiệt độ của năm sản phẩm so với giá trị danh định và ghi được $(0,1,2,3,4)$. Ta cần ước lượng vị trí điển hình và mức dao động của độ lệch, dưới giả thiết nhiễu Gaussian. Khác với hai mục trước, phương sai xuất hiện cả trong số mũ lẫn trong hệ số chuẩn hóa của mật độ, nên không thể chỉ tối thiểu hóa phần số mũ.

Một cách trực quan, dịch trung bình về gần dữ liệu làm giảm tổng bình phương sai lệch. Giảm phương sai làm mật độ cao hơn quanh tâm nhưng phạt nặng hơn các điểm lệch tâm. Trực giác này chưa cho biết vị trí chính xác của điểm cân bằng giữa hai tác động.

### 7.1. Log-hợp lý Gaussian và nghiệm

Nhắc lại Định nghĩa 10.20: với $\mu\in\mathbb R$ và $\sigma^2>0$, phân phối $\mathcal N(\mu,\sigma^2)$ có mật độ

$$
\begin{aligned}
f_{\mu,\sigma^2}(x)&=\frac1{\sqrt{2\pi\sigma^2}}\exp\Bigl[-\frac{(x-\mu)^2}{2\sigma^2}\Bigr],\\
&\qquad x\in\mathbb R.
\end{aligned}
$$

Ta viết $v=\sigma^2$ để lấy đạo hàm trực tiếp theo phương sai. Log của mật độ là $-\frac12\log(2\pi v)-(x-\mu)^2/(2v)$. Với dữ liệu $D=(x_1,\ldots,x_n)$ của một mẫu i.i.d. $\mathcal N(\mu,v)$, cộng các log này theo (4.1) cho

$$
\begin{aligned}
&\ell(\mu,v;D)\\
&\quad=-\frac n2\log(2\pi)-\frac n2\log v\\
&\qquad-\frac1{2v}\sum_{i=1}^n(x_i-\mu)^2.
\end{aligned}
\tag{7.1}
$$

Số hạng $-\frac n2\log v$ đến từ hệ số chuẩn hóa $1/\sqrt{2\pi v}$ của từng mật độ; số hạng cuối đến từ số mũ. Kết quả dưới đây dùng hai thống kê của dữ liệu: trung bình mẫu $\bar x=\frac1n\sum_ix_i$ và tổng bình phương sai lệch $Q=\sum_i(x_i-\bar x)^2$.

Định lý sau cho nghiệm của bài toán cực đại (7.1) (Murphy (2022), §4.2.5). Chứng minh tách tổng bình phương sai lệch để thấy trung bình tối ưu không phụ thuộc phương sai, rồi tối ưu phương sai bằng dấu của đạo hàm.

::: theorem Định lý 11.9 (Ước lượng Gaussian một chiều) — chứng minh đầy đủ
**Giả thiết.**

- **Mẫu:** $x_1,\ldots,x_n\in\mathbb R$, $n\ge1$, là dữ liệu của một mẫu i.i.d. $\mathcal N(\mu,v)$.
- **Miền tham số:** $\mu\in\mathbb R$ và $v>0$.
- **Thống kê:** $\bar x=\frac1n\sum_ix_i$ và $Q=\sum_i(x_i-\bar x)^2$.

**Kết luận.**

- Nếu $Q>0$, log-hợp lý (7.1) có đúng một điểm cực đại
$$
\begin{aligned}
\hat\mu&=\bar x,\\
\hat\sigma^2_{\mathrm{MLE}}&=\frac Qn.
\end{aligned}
\tag{7.2}
$$
- Nếu $Q=0$, tức mọi $x_i$ bằng nhau, log-hợp lý không bị chặn trên, và không tồn tại ước lượng hợp lý cực đại với $v>0$.
:::

::: proof Chứng minh Định lý 11.9
**Lộ trình.** Bước 1 tách $\sum_i(x_i-\mu)^2$ để tìm trung bình tối ưu với mọi $v$. Bước 2 tối ưu $v$ sau khi thế $\mu=\bar x$. Bước 3 ghép hai bước, và Bước 4 xét $Q=0$.

**Bước 1 (trung bình tối ưu với mọi $v$).** Với mọi số thực $\mu$, viết $x_i-\mu=(x_i-\bar x)+(\bar x-\mu)$ rồi khai triển bình phương:

$$
\begin{aligned}
&\sum_{i=1}^n(x_i-\mu)^2\\
&=\sum_{i=1}^n\bigl[(x_i-\bar x)+(\bar x-\mu)\bigr]^2\\
&=\sum_{i=1}^n(x_i-\bar x)^2\\
&\qquad+2(\bar x-\mu)\sum_{i=1}^n(x_i-\bar x)\\
&\qquad+n(\bar x-\mu)^2\\
&=Q+n(\mu-\bar x)^2.
\end{aligned}
\tag{7.3}
$$

Đẳng thức cuối dùng $\sum_i(x_i-\bar x)=n\bar x-n\bar x=0$. Thế (7.3) vào (7.1):

$$
\begin{aligned}
&\ell(\mu,v;D)\\
&\quad=-\frac n2\log(2\pi)-\frac n2\log v\\
&\qquad-\frac Q{2v}-\frac{n(\mu-\bar x)^2}{2v}.
\end{aligned}
$$

Với mỗi $v>0$, số hạng cuối không dương và bằng $0$ khi và chỉ khi $\mu=\bar x$. Do đó $\ell(\mu,v;D)\le\ell(\bar x,v;D)$, với dấu bằng khi và chỉ khi $\mu=\bar x$.

**Bước 2 (tối ưu phương sai khi $Q>0$).** Ta có $\ell(\bar x,v;D)=-\frac n2\log(2\pi)+g(v)$ với $g(v)=-\frac n2\log v-\frac Q{2v}$. Đạo hàm của $g$ là

$$
g'(v)=-\frac n{2v}+\frac Q{2v^2}=\frac{Q-nv}{2v^2}.
$$

Đạo hàm dương khi $v<Q/n$ và âm khi $v>Q/n$, nên $g$ tăng chặt trên $(0,Q/n]$, giảm chặt trên $[Q/n,\infty)$, và có điểm cực đại duy nhất $v=Q/n$. Giả thiết $Q>0$ được dùng ở đây: nó bảo đảm $Q/n$ thuộc miền $v>0$.

**Bước 3 (cực đại toàn cục).** Với mọi $\mu\in\mathbb R$ và $v>0$,

$$
\begin{aligned}
\ell(\mu,v;D)&\le\ell(\bar x,v;D)\\
&\le\ell(\bar x,Q/n;D).
\end{aligned}
$$

Dấu bằng thứ nhất chỉ xảy ra khi $\mu=\bar x$ (Bước 1), dấu bằng thứ hai chỉ xảy ra khi $v=Q/n$ (Bước 2). Đó là (7.2).

**Bước 4 ($Q=0$).** Khi đó $x_i=\bar x$ với mọi $i$, và $\ell(\bar x,v;D)=-\frac n2\log(2\pi v)\to+\infty$ khi $v\downarrow0$. Log-hợp lý không bị chặn trên, nên với mọi $(\mu,v)$ có một $v'>0$ đủ nhỏ thỏa $\ell(\bar x,v';D)>\ell(\mu,v;D)$; không điểm nào đạt cực đại. $\square$

Dưới mô hình Gaussian, trung bình mẫu và tổng bình phương sai lệch chia cho $n$ là các tham số khớp dữ liệu tốt nhất, với điều kiện các quan sát không trùng nhau hoàn toàn.
:::

Định lý 11.9 có cùng cấu trúc với Định lý 11.4: tham số tối ưu là một trung bình của dữ liệu, và có một trường hợp dữ liệu suy biến ($Q=0$ ở đây, $s\in\{0,n\}$ ở Định lý 11.4). Khác biệt nằm ở miền tham số. Đoạn $[0,1]$ chứa hai đầu mút nên mô hình Bernoulli luôn có nghiệm; miền $v>0$ là tập mở nên mô hình Gaussian không có nghiệm khi $Q=0$.

Trong học máy, khi phương sai $v$ cố định, Bước 1 cho thấy cực tiểu hóa âm log-hợp lý (7.1) theo $\mu$ tương đương cực tiểu hóa tổng bình phương sai lệch $\sum_i(x_i-\mu)^2$. Đó là nguồn gốc xác suất của mất mát bình phương. Khi học cả $v$, số hạng $\frac n2\log v$ phải được giữ: bỏ nó, phần còn lại $Q/(2v)$ của âm log-hợp lý tại $\mu=\bar x$ giảm dần về $0$ khi $v\to\infty$ và không có điểm cực tiểu.

Ví dụ sau áp dụng Định lý 11.9 cho năm độ lệch nhiệt độ và so sánh mô hình đã khớp với một Gaussian hẹp hơn có cùng tâm.

::: example Ví dụ 11.5 (Năm độ lệch nhiệt độ)
**Dữ liệu và mô hình.** $D=(0,1,2,3,4)$, năm độ lệch nhiệt độ của năm sản phẩm lấy độc lập; mô hình i.i.d. $\mathcal N(\mu,v)$ với $\mu\in\mathbb R$, $v>0$.

**Tính $\bar x$.** $\bar x=(0+1+2+3+4)/5=10/5=2$.

**Tính $Q$.** Các sai lệch $x_i-\bar x$ là $(-2,-1,0,1,2)$, nên $Q=4+1+0+1+4=10>0$.

**Ước lượng.** Theo Định lý 11.9, $\hat\mu=2$ và $\hat\sigma^2_{\mathrm{MLE}}=10/5=2$. Mật độ đã khớp là

$$
\hat f(x)=\frac1{\sqrt{4\pi}}\exp\Bigl[-\frac{(x-2)^2}{4}\Bigr].
$$

**So sánh với $v=1$.** Từ (7.1) với $\mu=2$ và $\sum_i(x_i-2)^2=10$:

$$
\begin{aligned}
\ell(2,2;D)&=-\tfrac52\log(4\pi)-\tfrac{10}4\\
&\approx-6{,}328-2{,}5\\
&=-8{,}828,\\
\ell(2,1;D)&=-\tfrac52\log(2\pi)-\tfrac{10}2\\
&\approx-4{,}595-5\\
&=-9{,}595.
\end{aligned}
$$

**Kiểm tra lại.** Tổng các sai lệch bằng $0$, và $Q-n\hat\sigma^2_{\mathrm{MLE}}=10-5\cdot2=0$. Đây là hai điều kiện $\partial\ell/\partial\mu=0$ và $\partial\ell/\partial v=0$ tại $(\bar x,Q/n)$.

**Diễn giải.** Mô hình đã khớp có độ lệch chuẩn $\sqrt2\approx1{,}41$. Mô hình $\mathcal N(2,1)$ hẹp hơn có mật độ tại tâm cao hơn, nhưng log-hợp lý của nó nhỏ hơn khoảng $0{,}77$ vì hai điểm $0$ và $4$ bị phạt nặng hơn.
:::

Mệnh đề 11.3 cho mỗi giả thiết phân phối một hàm mất mát. Ví dụ sau giữ nguyên dữ liệu và chỉ đổi giả thiết về nhiễu, để thấy hàm mất mát và giá trị ước lượng thay đổi theo.

::: example Ví dụ 11.6 (Nhiễu Gaussian và nhiễu Laplace trên cùng dữ liệu)
**Dữ liệu và hai mô hình.** Ba số đo $D=(0,0,9)$ của một đại lượng chưa biết $\mu\in\mathbb R$, với nhiễu cộng $x_i=\mu+\varepsilon_i$ và các nhiễu $\varepsilon_i$ độc lập. Xét hai giả thiết:

- **Mô hình (G):** $\varepsilon_i\sim\mathcal N(0,v)$ với $v>0$ đã biết.
- **Mô hình (L):** $\varepsilon_i$ có mật độ Laplace (Laplace distribution; Murphy (2022), §2.7.3) $f(\varepsilon)=\frac1{2b}e^{-|\varepsilon|/b}$ với $b>0$ đã biết.

**Mất mát từ mô hình (G).** Âm log-hợp lý theo $\mu$ là $\frac n2\log(2\pi v)+\frac1{2v}\sum_i(x_i-\mu)^2$. Bỏ hằng số và hệ số dương $1/(2v)$, mục tiêu cần cực tiểu là $\sum_i(x_i-\mu)^2$.

**Mất mát từ mô hình (L).** Với mỗi quan sát, $-\log f(x_i-\mu)=\log(2b)+|x_i-\mu|/b$. Bỏ hằng số và hệ số dương $1/b$, mục tiêu cần cực tiểu là $\sum_i|x_i-\mu|$.

**Nghiệm của (G).** Theo Bước 1 của chứng minh Định lý 11.9, điểm cực tiểu là $\bar x=(0+0+9)/3=3$.

**Nghiệm của (L).** Mục tiêu là $h(\mu)=2|\mu|+|9-\mu|$. Bỏ dấu giá trị tuyệt đối trên từng khoảng:

$$
h(\mu)=
\begin{cases}
9-3\mu, & \mu<0,\\
9+\mu, & 0\le\mu\le9,\\
3\mu-9, & \mu>9.
\end{cases}
$$

Hàm $h$ giảm chặt trên $(-\infty,0]$ và tăng chặt trên $[0,\infty)$, nên điểm cực tiểu duy nhất là $\mu=0$, với $h(0)=9$.

**Kiểm tra lại.** Với (L), $h(3)=6+6=12>9=h(0)$. Với (G), $\sum_i(x_i-0)^2=81>54=9+9+36=\sum_i(x_i-3)^2$.

**Diễn giải.** Hai giả thiết nhiễu cho hai hàm mất mát, bình phương và trị tuyệt đối, và hai ước lượng trên cùng dữ liệu: trung bình $3$ và trung vị $0$. Số đo $9$ kéo trung bình lên $3$; dưới mô hình Laplace, mật độ giảm theo $|\varepsilon|$ thay vì theo $\varepsilon^2$, nên số đo này ít ảnh hưởng hơn. Lựa chọn mô hình xác suất quyết định mục tiêu tối ưu, và do đó quyết định tham số học được.
:::

### 7.2. Hai mẫu số trong ước lượng phương sai

Ước lượng $Q/n$ của Định lý 11.9 tối ưu hợp lý trên một mẫu cố định. Một tiêu chuẩn khác xét bộ ước lượng qua các lần lấy mẫu lặp lại. Với $n=1$, ta luôn có $Q=0$, nên công thức $Q/n$ cho $0$ với mọi dữ liệu, bất kể phương sai thật (Murphy (2022), §4.7.6.1). Với $n$ lớn hơn, theo (7.3), $\sum_i(x_i-\mu)^2=Q+n(\mu-\bar x)^2\ge Q$: các sai lệch đo quanh $\bar x$ có tổng bình phương nhỏ hơn các sai lệch đo quanh trung bình thật $\mu$, nên $Q/n$ có xu hướng nhỏ hơn phương sai thật.

**Câu hỏi.** Khi ước lượng phương sai, nên chia tổng bình phương sai lệch $Q$ cho $n$ hay cho $n-1$?

Để trả lời, ta cần đo hành vi của bộ ước lượng qua các lần lấy mẫu. Định nghĩa 05c.34 gọi một ước lượng $\hat\mu$ của số thực $\mu$ là không chệch nếu $\mathbb E\hat\mu=\mu$. Định nghĩa sau phát biểu lại khái niệm đó cho bộ ước lượng của một mô hình thống kê tham số.

::: definition Định nghĩa 11.10 (Độ chệch và tính không chệch)
Cho mô hình $\{P_\theta:\theta\in\Theta\}$, mẫu i.i.d. $X_1,\ldots,X_n$ theo $P_\theta$, và bộ ước lượng $T=T(X_1,\ldots,X_n)$ của một đại lượng $g(\theta)$, với $\mathbb E_\theta|T|<\infty$ cho mọi $\theta\in\Theta$. Ở đây $\mathbb E_\theta$ là kỳ vọng khi $X_1,\ldots,X_n$ i.i.d. theo $P_\theta$.

- *Độ chệch* (bias) của $T$ tại $\theta$ là $\operatorname{Bias}_\theta(T)=\mathbb E_\theta[T]-g(\theta)$.
- $T$ là *không chệch* (unbiased) nếu $\operatorname{Bias}_\theta(T)=0$ với mọi $\theta\in\Theta$.

Khi $T$ và $g(\theta)$ là vector hoặc ma trận, kỳ vọng và đẳng thức được hiểu theo từng phần tử.
:::

So với Định nghĩa 05c.34, Định nghĩa 11.10 thêm hai điều: kỳ vọng được lấy dưới từng phân phối của mô hình, và tính không chệch phải đúng với mọi giá trị tham số, vì tham số thật chưa biết. Tiêu chuẩn này khác tiêu chuẩn của Định nghĩa 11.2. Hợp lý cực đại so sánh các tham số trên một mẫu cố định, còn độ chệch là tính chất của phân phối mẫu của $T$.

Một bộ ước lượng không chệch vẫn có thể cho giá trị xa tham số thật trên một mẫu cụ thể. Ví dụ, khi $\mathbb EX_i=\mu$, quan sát đầu tiên $X_1$ là bộ ước lượng không chệch của $\mu$, nhưng nó bỏ qua $n-1$ quan sát còn lại.

Mệnh đề sau trả lời Câu hỏi trên (Murphy (2022), §4.7.6.1). Chứng minh dùng đẳng thức (7.3) cho biến ngẫu nhiên và tính tuyến tính của kỳ vọng; giả thiết Gaussian không cần thiết.

::: proposition Mệnh đề 11.11 (Hiệu chỉnh phương sai mẫu) — chứng minh đầy đủ
**Giả thiết.**

- **Mẫu:** $X_1,\ldots,X_n$ là mẫu i.i.d. theo Định nghĩa 11.1, với $n\ge2$.
- **Mômen:** $\mathbb EX_i=\mu$ và $\operatorname{Var}X_i=\sigma^2<\infty$.
- **Thống kê:** $\bar X=\frac1n\sum_iX_i$ và $Q_X=\sum_i(X_i-\bar X)^2$.

**Kết luận.**

$$
\begin{aligned}
\mathbb E[Q_X]&=(n-1)\sigma^2,\\
\mathbb E\Bigl[\frac{Q_X}n\Bigr]&=\frac{n-1}n\sigma^2,\\
\mathbb E\Bigl[\frac{Q_X}{n-1}\Bigr]&=\sigma^2.
\end{aligned}
\tag{7.4}
$$

Do đó $Q_X/n$ có độ chệch $-\sigma^2/n$, còn $Q_X/(n-1)$ là bộ ước lượng không chệch của $\sigma^2$.
:::

::: proof Chứng minh Mệnh đề 11.11
**Lộ trình.** Tách $Q_X$ thành tổng bình phương quanh $\mu$ trừ một số hạng chỉ phụ thuộc $\bar X$, rồi lấy kỳ vọng từng phần.

**Bước 1 ($Q_X$ qua các sai lệch quanh $\mu$).** Đẳng thức (7.3) đúng với mọi số thực $x_1,\ldots,x_n$ và mọi số thực $\mu$. Áp dụng cho các giá trị $X_1(\omega),\ldots,X_n(\omega)$ và cho $\mu=\mathbb EX_i$, ta được $\sum_i(X_i-\mu)^2=Q_X+n(\bar X-\mu)^2$, tức là

$$
\begin{aligned}
Q_X&=\sum_{i=1}^n(X_i-\mu)^2\\
&\quad-n(\bar X-\mu)^2.
\end{aligned}
$$

**Bước 2 (kỳ vọng của từng phần).**

- Với mỗi $i$, $\mathbb E[(X_i-\mu)^2]=\operatorname{Var}X_i=\sigma^2$, theo định nghĩa phương sai (Định nghĩa 10.23).
- Các $X_i$ độc lập và có mômen bậc hai hữu hạn, nên không tương quan đôi một (Mệnh đề 10.27; với biến có mật độ, Phụ lục B.2 của Bài 10). Theo tính tuyến tính, $\mathbb E\bar X=\mu$. Mệnh đề 10.26 với mọi hiệp phương sai bằng $0$ cho $\operatorname{Var}\bigl(\sum_iX_i\bigr)=n\sigma^2$, rồi Mệnh đề 10.24 cho $\operatorname{Var}\bar X=n\sigma^2/n^2=\sigma^2/n$; với biến rời rạc, đây là Định lý 05c.35. Vì $\mathbb E\bar X=\mu$, ta có $\mathbb E[(\bar X-\mu)^2]=\operatorname{Var}\bar X=\sigma^2/n$.

**Bước 3 ($\mathbb E[Q_X]=(n-1)\sigma^2$).** Lấy kỳ vọng hai vế của đẳng thức ở Bước 1:

$$
\begin{aligned}
\mathbb E[Q_X]&=\sum_{i=1}^n\mathbb E[(X_i-\mu)^2]\\
&\quad-n\,\mathbb E[(\bar X-\mu)^2]\\
&=n\sigma^2-n\cdot\frac{\sigma^2}n\\
&=(n-1)\sigma^2.
\end{aligned}
$$

Đẳng thức thứ nhất dùng tính tuyến tính (Mệnh đề 10.22 và Phụ lục B.1 của Bài 10); đẳng thức thứ hai dùng Bước 2.

Chia cho $n$ và cho $n-1$, với $n-1\ge1$ do $n\ge2$, ta được hai đẳng thức còn lại của (7.4). $\square$

Đo sai lệch quanh trung bình mẫu thay vì quanh trung bình thật làm mất đúng một lượng $\sigma^2$ trong kỳ vọng của tổng bình phương, và mẫu số $n-1$ bù lại lượng đó.
:::

Mệnh đề 11.11 trả lời Câu hỏi ở đầu tiểu mục: mẫu số phụ thuộc tiêu chuẩn. Nếu cần nghiệm hợp lý cực đại của mô hình Gaussian, mẫu số là $n$ (Định lý 11.9); nếu cần bộ ước lượng không chệch của phương sai, mẫu số là $n-1$. Độ chệch $-\sigma^2/n$ của $Q_X/n$ tiến về $0$ khi $n$ tăng, nên với mẫu lớn hai ước lượng gần nhau.

Trên năm độ lệch nhiệt độ của Ví dụ 11.5, hai mẫu số cho hai con số khác nhau từ cùng một tổng bình phương $Q$.

::: example Ví dụ 11.7 (Hai mẫu số trên năm độ lệch nhiệt độ)
**Dữ kiện.** $D=(0,1,2,3,4)$ của Ví dụ 11.5: $n=5$, $\bar x=2$, $Q=10$.

**Phương sai hợp lý cực đại.** $Q/n=10/5=2$.

**Phương sai không chệch.** $Q/(n-1)=10/4=2{,}5$.

**Kiểm tra lại.** Tỉ số $2/2{,}5=0{,}8=4/5=(n-1)/n$, đúng hệ số trong (7.4).

**Diễn giải.** Hai số tính từ cùng $Q=10$. Số $2$ là phương sai của mô hình Gaussian khớp dữ liệu tốt nhất; số $2{,}5$ là giá trị trên mẫu này của bộ ước lượng có kỳ vọng đúng bằng phương sai thật qua các lần lấy mẫu.
:::

Trong học máy và tính toán thống kê, cả hai mẫu số đều được dùng: thư viện NumPy mặc định tính phương sai với mẫu số $n$, còn pandas mặc định dùng $n-1$ (Murphy (2022), §4.2.5, chú thích 4). Khi so sánh các con số phương sai từ hai công cụ trên cùng dữ liệu, cần biết công cụ dùng mẫu số nào.

Như vậy, Định lý 11.9 nối mô hình nhiễu Gaussian với tổng bình phương sai lệch và xác định khi nào nghiệm tồn tại; Ví dụ 11.6 cho thấy đổi giả thiết nhiễu thì đổi mất mát và đổi ước lượng; Mệnh đề 11.11 giải thích mẫu số $n-1$ bằng tiêu chuẩn không chệch. Tuy nhiên, các kết quả này chỉ xét một số đo. Hai số đo của cùng một sản phẩm có thể cùng tăng hoặc cùng giảm, và hai phương sai riêng không ghi lại được điều đó. Trong Mục 8, ta thay phương sai bằng ma trận hiệp phương sai và thay bình phương bằng tích ngoài, rồi đọc ma trận ước lượng được thành các hướng phân tán.

## 8. Gaussian nhiều chiều: ước lượng và hình học

Bốn sản phẩm vận hành bình thường cho các vector số đo $x_1=(12,22)^\top$, $x_2=(8,18)^\top$, $x_3=(11,19)^\top$ và $x_4=(9,21)^\top$. Áp dụng Định lý 11.9 cho từng tọa độ: tọa độ thứ nhất $(12,8,11,9)$ có trung bình $10$ và các sai lệch $(2,-2,1,-1)$; tọa độ thứ hai $(22,18,19,21)$ có trung bình $20$ và các sai lệch $(2,-2,-1,1)$. Cả hai tọa độ có phương sai hợp lý cực đại $(4+4+1+1)/4=5/2$. Hai phương sai riêng bằng nhau, nên chúng không phân biệt được hướng $(1,1)^\top$, dọc theo đó dữ liệu trải rộng, với hướng $(1,-1)^\top$, dọc theo đó dữ liệu tập trung.

Để trả lời Câu hỏi mở đầu, chúng ta cần một đại lượng ghi cả mức phân tán của từng tọa độ lẫn xu hướng hai tọa độ cùng biến động, rồi một cách đo độ lệch theo mức phân tán của từng hướng.

Về mặt hình học, một đám điểm kéo dài theo đường chéo cần một mô hình cho phép hướng phân tán chính quay khỏi các trục tọa độ. Ma trận hiệp phương sai ghi hướng đó qua các phần tử ngoài đường chéo. Mô tả này chưa chính xác: nó chưa cho biết hướng và độ dài của các trục phân tán, là những đại lượng mà trị riêng và vector riêng của ma trận xác định.

### 8.1. Ma trận hiệp phương sai và hiệp phương sai mẫu

Định nghĩa 10.25 cho hiệp phương sai của hai biến thực. Với một vector ngẫu nhiên, ta xếp mọi hiệp phương sai giữa các tọa độ vào một ma trận.

::: definition Định nghĩa 11.12 (Vector kỳ vọng và ma trận hiệp phương sai)
Cho vector ngẫu nhiên $X=(X^{(1)},\ldots,X^{(d)})^\top\in\mathbb R^d$ có $\mathbb E[(X^{(j)})^2]<\infty$ với mọi $j$.

- *Vector kỳ vọng* của $X$ là $\mathbb EX=(\mathbb EX^{(1)},\ldots,\mathbb EX^{(d)})^\top\in\mathbb R^d$.
- *Ma trận hiệp phương sai* (covariance matrix) của $X$ là ma trận $d\times d$
$$
\begin{aligned}
&\operatorname{Cov}(X)\\
&\quad=\mathbb E\bigl[(X-\mathbb EX)\\
&\qquad(X-\mathbb EX)^\top\bigr],
\end{aligned}
\tag{8.1}
$$
với kỳ vọng lấy theo từng phần tử. Phần tử $(j,k)$ của $\operatorname{Cov}(X)$ là $\operatorname{Cov}(X^{(j)},X^{(k)})$.
:::

Phần tử đường chéo thứ $j$ của $\operatorname{Cov}(X)$ là $\operatorname{Var}X^{(j)}$, vì $\operatorname{Cov}(X^{(j)},X^{(j)})=\operatorname{Var}X^{(j)}$. Phần tử ngoài đường chéo dương khi hai tọa độ có xu hướng cùng lệch về một phía so với kỳ vọng. Ma trận đối xứng vì $\operatorname{Cov}(X^{(j)},X^{(k)})=\operatorname{Cov}(X^{(k)},X^{(j)})$. Khi $d=1$, (8.1) là phương sai.

Phương sai theo một hướng được đọc ra từ $\operatorname{Cov}(X)$. Với mọi $w\in\mathbb R^d$, tính tuyến tính của kỳ vọng cho $\mathbb E[w^\top X]=w^\top\mathbb EX$ và $\mathbb E[w^\top Mw]=w^\top\mathbb E[M]w$ với mọi ma trận ngẫu nhiên $M$ có các phần tử khả tích. Do đó

$$
\begin{aligned}
&\operatorname{Var}(w^\top X)\\
&\quad=\mathbb E\bigl[\bigl(w^\top(X-\mathbb EX)\bigr)^2\bigr]\\
&\quad=\mathbb E\bigl[w^\top(X-\mathbb EX)\\
&\qquad(X-\mathbb EX)^\top w\bigr]\\
&\quad=w^\top\operatorname{Cov}(X)\,w.
\end{aligned}
\tag{8.2}
$$

Vế trái không âm với mọi $w$, nên $\operatorname{Cov}(X)\succeq0$.

Với Gaussian nhiều chiều, các tham số của mật độ chính là các đại lượng vừa định nghĩa. Nhắc lại Định nghĩa 10.20, công thức (6.12) của Bài 10: với $\mu\in\mathbb R^d$ và $\Sigma\in\mathbb R^{d\times d}$ đối xứng, $\Sigma\succ0$, phân phối $\mathcal N(\mu,\Sigma)$ có mật độ

$$
\begin{aligned}
f_{\mu,\Sigma}(x)&=\frac1{(2\pi)^{d/2}(\det\Sigma)^{1/2}}\\
&\times\exp\Bigl[-\frac12(x-\mu)^\top\Sigma^{-1}(x-\mu)\Bigr],\\
&\qquad x\in\mathbb R^d.
\end{aligned}
$$

Nếu $X\sim\mathcal N(\mu,\Sigma)$ thì $\mathbb EX=\mu$ và $\operatorname{Cov}(X)=\Sigma$ (Murphy (2022), §3.2.1). Ta dùng sự kiện này như một kết quả được thừa nhận. Với $d=1$, đó là các đẳng thức $\mathbb ET=\mu$ và $\operatorname{Var}T=\sigma^2$, được chứng minh bằng tích phân ở Phụ lục C của Bài 10.

Khi các tham số chưa biết, ta thay kỳ vọng bằng trung bình trên dữ liệu. Định nghĩa sau là bản tương tự của $\bar x$ và $Q/n$ trong Định lý 11.9.

::: definition Định nghĩa 11.13 (Trung bình mẫu và hiệp phương sai mẫu)
Cho dữ liệu $x_1,\ldots,x_n\in\mathbb R^d$, $n\ge1$.

- *Trung bình mẫu* là $\bar x=\frac1n\sum_{i=1}^nx_i\in\mathbb R^d$.
- *Hiệp phương sai mẫu* (sample covariance) với mẫu số $n$ là ma trận $d\times d$
$$
\begin{aligned}
&S_n\\
&\quad=\frac1n\sum_{i=1}^n(x_i-\bar x)\\
&\qquad(x_i-\bar x)^\top.
\end{aligned}
\tag{8.3}
$$
:::

Khi $d=1$, $S_n=Q/n$, đúng phương sai hợp lý cực đại của Định lý 11.9. Mỗi số hạng $(x_i-\bar x)(x_i-\bar x)^\top$ là một *tích ngoài* (outer product), ma trận $d\times d$ có hạng không quá $1$. Đặt $\tilde x_i=x_i-\bar x$. Với mọi $w\in\mathbb R^d$,

$$
w^\top S_nw=\frac1n\sum_{i=1}^n\bigl(w^\top\tilde x_i\bigr)^2\ge0,
\tag{8.4}
$$

nên $S_n\succeq0$, và $w^\top S_nw$ là phương sai mẫu, với mẫu số $n$, của các hình chiếu $w^\top x_i$.

Ma trận $S_n$ chưa chắc xác định dương. Theo (8.4), $w^\top S_nw=0$ khi và chỉ khi $w$ vuông góc với mọi $\tilde x_i$. Do đó $S_n\succ0$ khi và chỉ khi các vector $\tilde x_1,\ldots,\tilde x_n$ sinh ra $\mathbb R^d$. Vì $\sum_i\tilde x_i=0$, vector $\tilde x_n$ là tổ hợp tuyến tính của $n-1$ vector còn lại, nên các $\tilde x_i$ sinh ra một không gian có số chiều không quá $\min(d,n-1)$. Điều kiện $n>d$ vì vậy là cần cho $S_n\succ0$, nhưng chưa đủ: ba điểm thẳng hàng trong $\mathbb R^2$ có $n=3>2$ mà các $\tilde x_i$ chỉ sinh ra một đường thẳng.

Ví dụ sau tính $S_n$ cho bốn vector nền của Câu hỏi mở đầu và kiểm tra điều kiện $S_n\succ0$.

::: example Ví dụ 11.8 (Hiệp phương sai mẫu của dữ liệu cảm biến nền)
**Dữ liệu.** Bốn vector nền $x_1=(12,22)^\top$, $x_2=(8,18)^\top$, $x_3=(11,19)^\top$, $x_4=(9,21)^\top$.

**Trung bình mẫu.**

$$
\begin{aligned}
\bar x&=\frac14\begin{pmatrix}12+8+11+9\\22+18+19+21\end{pmatrix}\\
&=\frac14\begin{pmatrix}40\\80\end{pmatrix}\\
&=\begin{pmatrix}10\\20\end{pmatrix}.
\end{aligned}
$$

**Vector sai lệch.** $\tilde x_1=(2,2)^\top$, $\tilde x_2=(-2,-2)^\top$, $\tilde x_3=(1,-1)^\top$, $\tilde x_4=(-1,1)^\top$.

**Tích ngoài.** Hai vector đầu đối nhau, hai vector sau đối nhau, nên

$$
\begin{aligned}
\tilde x_1\tilde x_1^\top=\tilde x_2\tilde x_2^\top&=\begin{pmatrix}4&4\\4&4\end{pmatrix},\\
\tilde x_3\tilde x_3^\top=\tilde x_4\tilde x_4^\top&=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
\end{aligned}
$$

Tổng bốn tích ngoài là $\begin{pmatrix}10&6\\6&10\end{pmatrix}$.

**Hiệp phương sai mẫu.**

$$
\begin{aligned}
S_4&=\frac14\begin{pmatrix}10&6\\6&10\end{pmatrix}\\
&=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}.
\end{aligned}
$$

**Kiểm tra lại.** Hai phần tử đường chéo bằng $5/2$, trùng phương sai hợp lý cực đại của từng tọa độ ở đầu mục. Theo Câu hỏi ôn nhanh 3, các trị riêng của $S_4$ là $4$ và $1$, đều dương, nên $S_4\succ0$; cũng vậy, $\tilde x_1$ và $\tilde x_3$ độc lập tuyến tính nên các $\tilde x_i$ sinh ra $\mathbb R^2$.

**Diễn giải.** Phần tử ngoài đường chéo $3/2>0$ ghi nhận rằng hai số đo có xu hướng cùng tăng hoặc cùng giảm, điều mà hai phương sai riêng không ghi lại.
:::

### 8.2. Ước lượng trung bình và ma trận hiệp phương sai

Với dữ liệu $D=(x_1,\ldots,x_n)$ của một mẫu i.i.d. $\mathcal N(\mu,\Sigma)$, (4.1) và mật độ Gaussian nhiều chiều nhắc lại ở trên cho log-hợp lý

$$
\begin{aligned}
&\ell(\mu,\Sigma;D)\\
&\quad=-\frac{nd}2\log(2\pi)\\
&\qquad-\frac n2\log\det\Sigma\\
&\qquad-\frac12\sum_{i=1}^n(x_i-\mu)^\top\Sigma^{-1}\\
&\qquad\qquad(x_i-\mu).
\end{aligned}
\tag{8.5}
$$

Chứng minh dưới đây dùng đẳng thức $w^\top Aw=\operatorname{tr}(Aww^\top)$ cho ma trận vuông $A$ và vector $w$: phần tử đường chéo thứ $j$ của $Aww^\top$ là $(Aw)_jw_j$, nên vết của nó bằng $\sum_j(Aw)_jw_j=w^\top Aw$.

Định lý sau mở rộng Định lý 11.9 lên $d$ chiều (Murphy (2022), §4.2.6). Murphy tìm điểm dừng bằng đạo hàm theo ma trận; ở đây ta chứng minh cực đại toàn cục bằng bất đẳng thức $\log t\le t-1$ áp dụng cho các trị riêng, cùng công cụ với Định lý 11.7.

::: theorem Định lý 11.14 (Ước lượng Gaussian nhiều chiều và điều kiện tồn tại) — chứng minh đầy đủ
**Giả thiết.**

- **Mẫu:** $x_1,\ldots,x_n\in\mathbb R^d$, $n\ge1$, là dữ liệu của một mẫu i.i.d. $\mathcal N(\mu,\Sigma)$.
- **Miền tham số:** $\mu\in\mathbb R^d$ và $\Sigma$ là ma trận đối xứng xác định dương $d\times d$.
- **Thống kê:** $\bar x$ và $S_n$ theo Định nghĩa 11.13.

**Kết luận.**

- Nếu $S_n\succ0$, log-hợp lý (8.5) có đúng một điểm cực đại
$$
\begin{aligned}
\hat\mu&=\bar x,\\
\hat\Sigma_{\mathrm{MLE}}&=S_n.
\end{aligned}
\tag{8.6}
$$
- Nếu $S_n$ suy biến, log-hợp lý không bị chặn trên, và không tồn tại ước lượng hợp lý cực đại với $\Sigma\succ0$.
:::

::: proof Chứng minh Định lý 11.14
**Lộ trình.** Như trong Định lý 11.9, Bước 1 tách tâm để tìm trung bình tối ưu với mọi $\Sigma$. Bước 2 đổi biến ma trận để đưa phần còn lại về một hàm của các trị riêng, và Bước 3 dùng $\log c\le c-1$ cho từng trị riêng. Bước 4 ghép các bước, Bước 5 xét $S_n$ suy biến. Các đẳng thức đại số của Bước 2 được chứng minh ở Phụ lục A.

**Bước 1 (tối ưu trung bình).** Đặt $\tilde x_i=x_i-\bar x$ và $\Lambda=\Sigma^{-1}$, gọi là *ma trận độ chính xác* (precision matrix); $\Lambda$ đối xứng xác định dương. Viết $x_i-\mu=\tilde x_i+(\bar x-\mu)$ và khai triển dạng toàn phương:

$$
\begin{aligned}
&\sum_{i=1}^n(x_i-\mu)^\top\Lambda(x_i-\mu)\\
&\quad=\sum_{i=1}^n\tilde x_i^\top\Lambda\tilde x_i\\
&\qquad+2(\bar x-\mu)^\top\Lambda\sum_{i=1}^n\tilde x_i\\
&\qquad+n(\bar x-\mu)^\top\Lambda(\bar x-\mu)\\
&\quad=\sum_{i=1}^n\operatorname{tr}\bigl(\Lambda\tilde x_i\tilde x_i^\top\bigr)\\
&\qquad+n(\bar x-\mu)^\top\Lambda(\bar x-\mu)\\
&\quad=n\operatorname{tr}(\Lambda S_n)\\
&\qquad+n(\bar x-\mu)^\top\Lambda(\bar x-\mu).
\end{aligned}
$$

Đẳng thức thứ nhất gộp hai số hạng chéo $\tilde x_i^\top\Lambda(\bar x-\mu)=(\bar x-\mu)^\top\Lambda\tilde x_i$, vì $\Lambda$ đối xứng. Đẳng thức thứ hai dùng $\sum_i\tilde x_i=0$ và $w^\top Aw=\operatorname{tr}(Aww^\top)$. Đẳng thức thứ ba dùng tính tuyến tính của vết và (8.3). Vì $\Lambda\succ0$, số hạng cuối không âm và bằng $0$ khi và chỉ khi $\mu=\bar x$. Thế vào (8.5) và dùng $-\log\det\Sigma=\log\det\Lambda$, vì $\det\Sigma\det\Lambda=\det(\Sigma\Lambda)=\det I_d=1$, ta được

$$
\begin{aligned}
&\ell(\mu,\Sigma;D)\le\ell(\bar x,\Sigma;D)\\
&\quad=-\frac{nd}2\log(2\pi)+\frac n2\,h(\Lambda),\\
&h(\Lambda)=\log\det\Lambda-\operatorname{tr}(\Lambda S_n),
\end{aligned}
$$

với dấu bằng khi và chỉ khi $\mu=\bar x$.

**Bước 2 ($h$ viết theo $C$ khi $S_n\succ0$).** Vì $S_n$ đối xứng xác định dương, phân rã trị riêng cho một căn bậc hai đối xứng xác định dương $S_n^{1/2}$ với $S_n^{1/2}S_n^{1/2}=S_n$. Đặt $C=S_n^{1/2}\Lambda S_n^{1/2}$. Bốn sự kiện sau được chứng minh ở Phụ lục A:

- $C$ đối xứng xác định dương;
- ánh xạ $\Lambda\mapsto C$ là một song ánh từ tập các ma trận đối xứng xác định dương $d\times d$ lên chính tập đó, với ánh xạ ngược $C\mapsto S_n^{-1/2}CS_n^{-1/2}$;
- $\log\det C=\log\det\Lambda+\log\det S_n$;
- $\operatorname{tr}C=\operatorname{tr}(\Lambda S_n)$.

Do đó $h(\Lambda)=\log\det C-\operatorname{tr}C-\log\det S_n$.

**Bước 3 (cực đại theo trị riêng).** Gọi $c_1,\ldots,c_d>0$ là các trị riêng của $C$, với phân rã $C=V\operatorname{diag}(c_1,\ldots,c_d)V^\top$, $V$ trực giao. Khi đó $\det C=\det V\cdot\prod_jc_j\cdot\det V^\top=\prod_jc_j$, vì $\det V\det V^\top=\det(VV^\top)=1$; và $\operatorname{tr}C=\operatorname{tr}\bigl(\operatorname{diag}(c_j)V^\top V\bigr)=\sum_jc_j$, theo $\operatorname{tr}(AB)=\operatorname{tr}(BA)$. Vậy

$$
\begin{aligned}
&\log\det C-\operatorname{tr}C\\
&\quad=\sum_{j=1}^d(\log c_j-c_j)\\
&\quad\le\sum_{j=1}^d(-1)=-d,
\end{aligned}
$$

theo $\log c_j\le c_j-1$. Dấu bằng xảy ra khi và chỉ khi mọi $c_j=1$, tức $C=VI_dV^\top=I_d$. Theo song ánh ở Bước 2, $C=I_d$ khi và chỉ khi $\Lambda=S_n^{-1/2}S_n^{-1/2}=S_n^{-1}$, tức $\Sigma=S_n$. Như vậy $h(\Lambda)\le-d-\log\det S_n$, với dấu bằng khi và chỉ khi $\Sigma=S_n$.

**Bước 4 (cực đại toàn cục).** Với mọi $\mu\in\mathbb R^d$ và $\Sigma\succ0$,

$$
\begin{aligned}
\ell(\mu,\Sigma;D)&\le\ell(\bar x,\Sigma;D)\\
&\le\ell(\bar x,S_n;D).
\end{aligned}
$$

Dấu bằng thứ nhất chỉ xảy ra khi $\mu=\bar x$ (Bước 1), dấu bằng thứ hai chỉ xảy ra khi $\Sigma=S_n$ (Bước 3). Đó là (8.6).

**Bước 5 ($S_n$ suy biến).** Gọi $r<d$ là hạng của $S_n$. Chọn cơ sở trực chuẩn $u_1,\ldots,u_d$ gồm các vector riêng của $S_n$, với trị riêng $a_1,\ldots,a_r>0$ và $a_{r+1}=\cdots=a_d=0$; khi đó $S_n=\sum_{j\le r}a_ju_ju_j^\top$. Với $\varepsilon>0$, đặt

$$
\begin{aligned}
\Sigma_\varepsilon&=\sum_{j\le r}a_ju_ju_j^\top+\varepsilon\sum_{j>r}u_ju_j^\top,\\
\Sigma_\varepsilon^{-1}&=\sum_{j\le r}a_j^{-1}u_ju_j^\top\\
&\quad+\varepsilon^{-1}\sum_{j>r}u_ju_j^\top.
\end{aligned}
$$

Ma trận $\Sigma_\varepsilon$ đối xứng xác định dương vì mọi trị riêng của nó dương. Do $u_j^\top u_k=0$ khi $j\ne k$ và $u_j^\top u_j=1$, ta có $\Sigma_\varepsilon^{-1}S_n=\sum_{j\le r}u_ju_j^\top$, nên $\operatorname{tr}(\Sigma_\varepsilon^{-1}S_n)=\sum_{j\le r}u_j^\top u_j=r$. Ngoài ra $\log\det\Sigma_\varepsilon=\sum_{j\le r}\log a_j+(d-r)\log\varepsilon$. Theo Bước 1,

$$
\begin{aligned}
&\ell(\bar x,\Sigma_\varepsilon;D)\\
&\quad=-\frac{nd}2\log(2\pi)-\frac n2\sum_{j\le r}\log a_j\\
&\qquad-\frac{n(d-r)}2\log\varepsilon-\frac{nr}2\\
&\quad\longrightarrow+\infty
\end{aligned}
$$

khi $\varepsilon\downarrow0$, vì $d-r\ge1$. Log-hợp lý không bị chặn trên, nên không có $(\mu,\Sigma)$ nào với $\Sigma\succ0$ đạt cực đại. Lập luận cũng đúng khi $r=0$, với tổng rỗng bằng $0$. $\square$

Dưới mô hình Gaussian nhiều chiều, trung bình mẫu và hiệp phương sai mẫu với mẫu số $n$ là các tham số khớp dữ liệu tốt nhất, với điều kiện các vector sai lệch sinh ra toàn bộ $\mathbb R^d$.
:::

Khi $d=1$, $S_n=Q/n$ và Định lý 11.14 trở lại Định lý 11.9: điều kiện $S_n\succ0$ trở thành $Q>0$. Giả thiết $S_n\succ0$ là điều kiện trên dữ liệu; theo (8.4), nó đúng khi và chỉ khi các vector sai lệch sinh ra $\mathbb R^d$. Kết quả không áp dụng cho các mô hình ràng buộc $\Sigma$ là ma trận đường chéo hoặc bội của $I_d$ (các dạng hiệp phương sai chéo và cầu, Murphy (2022), §3.2.1): mỗi ràng buộc như vậy đổi miền tham số và cho một nghiệm khác.

Trong học máy, Định lý 11.14 học một mô hình xác suất chung cho nhiều đặc trưng; các phần tử ngoài đường chéo của $\hat\Sigma$ giữ lại quan hệ tuyến tính giữa các số đo. Khi số chiều lớn so với cỡ mẫu, $S_n$ suy biến hoặc có trị riêng rất nhỏ, nên $S_n^{-1}$ không tồn tại hoặc rất nhạy với dữ liệu. Murphy (2022), §4.5.2 thay $S_n$ bằng ước lượng co (shrinkage estimate) $\rho\Sigma_0+(1-\rho)S_n$, với $\rho\in(0,1)$ và một ma trận $\Sigma_0$ chọn trước; đó là ước lượng dùng thêm giả thiết tiên nghiệm, khác nghiệm (8.6).

Với dữ liệu cảm biến nền, $S_4\succ0$, nên Định lý 11.14 cho Gaussian đã khớp; ví dụ sau viết mật độ của nó.

::: example Ví dụ 11.9 (Gaussian đã khớp cho dữ liệu cảm biến nền)
**Dữ kiện.** Theo Ví dụ 11.8, bốn vector nền có $\bar x=(10,20)^\top$ và $S_4=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}\succ0$, với $\det S_4=\tfrac{25}4-\tfrac94=4$.

**Ước lượng.** Vì $S_4\succ0$, Định lý 11.14 cho $\hat\mu=(10,20)^\top$ và $\hat\Sigma=S_4$.

**Ma trận nghịch đảo.** Với ma trận đối xứng $2\times2$ khả nghịch, $\begin{pmatrix}\kappa_1&\kappa_2\\\kappa_2&\kappa_3\end{pmatrix}^{-1}=\frac1{\kappa_1\kappa_3-\kappa_2^2}\begin{pmatrix}\kappa_3&-\kappa_2\\-\kappa_2&\kappa_1\end{pmatrix}$. Do đó

$$
\begin{aligned}
\hat\Sigma^{-1}&=\frac14\begin{pmatrix}5/2&-3/2\\-3/2&5/2\end{pmatrix}\\
&=\frac18\begin{pmatrix}5&-3\\-3&5\end{pmatrix}.
\end{aligned}
$$

**Kiểm tra lại.** Phần tử $(1,1)$ của $S_4\hat\Sigma^{-1}$ là $\frac18\bigl(\frac52\cdot5-\frac32\cdot3\bigr)=\frac18\cdot8=1$; phần tử $(1,2)$ là $\frac18\bigl(-\frac52\cdot3+\frac32\cdot5\bigr)=0$. Theo tính đối xứng, hai phần tử còn lại cho $0$ và $1$, nên $S_4\hat\Sigma^{-1}=I_2$.

**Mật độ đã khớp.** Với $d=2$, hệ số chuẩn hóa là $(2\pi)^{d/2}(\det\hat\Sigma)^{1/2}=2\pi\cdot2=4\pi$, nên

$$
\begin{aligned}
\hat f(x)&=\frac1{4\pi}\\
&\times\exp\Bigl[-\frac12(x-\hat\mu)^\top\hat\Sigma^{-1}\\
&\qquad\qquad(x-\hat\mu)\Bigr],\\
\hat f(\hat\mu)&=\frac1{4\pi}\approx0{,}0796.
\end{aligned}
$$

**Diễn giải.** Số $0{,}0796$ là độ cao của mật độ tại tâm, có đơn vị nghịch đảo của diện tích. Theo mô hình đã khớp, xác suất một sản phẩm bình thường có vector số đo rơi vào một ô vuông nhỏ cạnh $h$ quanh tâm xấp xỉ $0{,}0796\,h^2$.
:::

Với bốn điểm có hai tọa độ phương sai khác nhau, Định lý 11.14 áp dụng theo cùng các bước.

::: example Ví dụ 11.10 (Bốn điểm hai chiều với phương sai khác nhau)
**Dữ liệu và mô hình.** Bốn vector $(1,1)^\top$, $(3,3)^\top$, $(1,3)^\top$, $(3,5)^\top$, dưới giả thiết i.i.d. Gaussian hai chiều.

**Trung bình mẫu.** $\bar x=\frac14(1+3+1+3,\ 1+3+3+5)^\top=(2,3)^\top$.

**Vector sai lệch.** $(-1,-2)^\top$, $(1,0)^\top$, $(-1,0)^\top$, $(1,2)^\top$.

**Tích ngoài.** Hai vector $(\pm1,\pm2)^\top$ cùng cho $\begin{pmatrix}1&2\\2&4\end{pmatrix}$, hai vector $(\pm1,0)^\top$ cùng cho $\begin{pmatrix}1&0\\0&0\end{pmatrix}$. Do đó

$$
\begin{aligned}
\sum_i\tilde x_i\tilde x_i^\top&=2\begin{pmatrix}1&2\\2&4\end{pmatrix}\\
&\quad+2\begin{pmatrix}1&0\\0&0\end{pmatrix}\\
&=\begin{pmatrix}4&4\\4&8\end{pmatrix},\\
S_4&=\begin{pmatrix}1&1\\1&2\end{pmatrix}.
\end{aligned}
$$

**Kiểm tra điều kiện.** $\operatorname{tr}S_4=3$ và $\det S_4=2-1=1$, nên hai trị riêng là nghiệm của $\lambda^2-3\lambda+1=0$, tức $(3\pm\sqrt5)/2\approx2{,}618$ và $0{,}382$, đều dương. Vậy $S_4\succ0$, và Định lý 11.14 cho $\hat\mu=(2,3)^\top$, $\hat\Sigma=S_4$.

**Kiểm tra lại.** Tổng hai trị riêng là $3=\operatorname{tr}S_4$ và tích là $(9-5)/4=1=\det S_4$. Mật độ đã khớp tại tâm bằng $1/\bigl(2\pi(\det S_4)^{1/2}\bigr)=1/(2\pi)\approx0{,}159$.

**Hướng phân tán chính.** Với $\varphi=(1+\sqrt5)/2$, ta có $S_4(1,\varphi)^\top=(1+\varphi,\ 1+2\varphi)^\top$. Vì $1+\varphi=\frac{3+\sqrt5}2$ và $1+2\varphi=2+\sqrt5=\frac{3+\sqrt5}2\varphi$, vector $(1,\varphi)^\top\approx(1;\ 1{,}618)^\top$ là vector riêng ứng với trị riêng lớn $(3+\sqrt5)/2$.

**Diễn giải.** Ở Ví dụ 11.8, hai tọa độ có cùng phương sai và hướng phân tán chính là đường chéo $(1,1)^\top$. Ở đây tọa độ thứ hai có phương sai mẫu $2$, gấp đôi tọa độ thứ nhất, nên hướng phân tán chính $(1;\ 1{,}618)^\top$ nghiêng về trục thứ hai: hướng của đường đồng mức phụ thuộc cả hiệp phương sai lẫn tỉ lệ giữa hai phương sai.
:::

Mệnh đề 11.11 cho độ chệch của $Q/n$ ở một chiều. Áp dụng mệnh đề đó cho từng hình chiếu $w^\top X_i$, ta được độ chệch của $S_n$ như một ma trận.

::: corollary Hệ quả 11.15 (Hiệp phương sai mẫu không chệch) — chứng minh đầy đủ
**Giả thiết.**

- **Mẫu:** $X_1,\ldots,X_n\in\mathbb R^d$ là mẫu i.i.d. theo Định nghĩa 11.1, với $n\ge2$.
- **Mômen:** $\mathbb EX_i=\mu$ và $\operatorname{Cov}(X_i)=\Sigma$, với mọi tọa độ có mômen bậc hai hữu hạn.
- **Thống kê:** $\bar X=\frac1n\sum_iX_i$ và $S_n=\frac1n\sum_i(X_i-\bar X)(X_i-\bar X)^\top$.

**Kết luận.**

$$
\begin{aligned}
\mathbb E[S_n]&=\frac{n-1}n\Sigma,\\
S_{n-1}&=\frac n{n-1}S_n\\
&=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X)\\
&\qquad(X_i-\bar X)^\top,\\
\mathbb E[S_{n-1}]&=\Sigma.
\end{aligned}
\tag{8.7}
$$
:::

::: proof Chứng minh Hệ quả 11.15
**Lộ trình.** Áp dụng Mệnh đề 11.11 cho các hình chiếu $w^\top X_i$ để có $w^\top\mathbb E[S_n]w$ với mọi $w$, rồi khôi phục ma trận từ dạng toàn phương.

**Bước 1 (hình chiếu).** Cố định $w\in\mathbb R^d$ và đặt $Y_i=w^\top X_i$. Theo nhận xét sau Định nghĩa 11.1, các $Y_i$ độc lập; chúng cùng phân phối vì là cùng một hàm của các $X_i$ cùng phân phối. Theo (8.2), $\operatorname{Var}Y_i=w^\top\Sigma w$. Với $\bar Y=\frac1n\sum_iY_i=w^\top\bar X$ và $Q_Y=\sum_i(Y_i-\bar Y)^2$, công thức (8.4) áp dụng cho các giá trị của $X_i$ cho

$$
\begin{aligned}
w^\top S_nw&=\frac1n\sum_{i=1}^n(w^\top X_i-w^\top\bar X)^2\\
&=\frac{Q_Y}n.
\end{aligned}
$$

**Bước 2 (kỳ vọng).** Mệnh đề 11.11 áp dụng cho $Y_1,\ldots,Y_n$ cho $\mathbb E[Q_Y]=(n-1)\,w^\top\Sigma w$. Theo tính tuyến tính của kỳ vọng, $\mathbb E[w^\top S_nw]=w^\top\mathbb E[S_n]w$. Do đó ma trận đối xứng $M=\mathbb E[S_n]-\frac{n-1}n\Sigma$ thỏa $w^\top Mw=0$ với mọi $w\in\mathbb R^d$.

**Bước 3 (từ dạng toàn phương về ma trận).** Gọi $e_1,\ldots,e_d$ là các vector đơn vị chuẩn. Với $w=e_j$, ta được $M_{jj}=0$. Với $w=e_j+e_k$, $j\ne k$, ta được $M_{jj}+M_{kk}+2M_{jk}=0$, nên $M_{jk}=0$. Vậy $M=0$, tức $\mathbb E[S_n]=\frac{n-1}n\Sigma$. Nhân với $\frac n{n-1}$ cho $\mathbb E[S_{n-1}]=\Sigma$. $\square$

Hiệu chỉnh $n-1$ của Mệnh đề 11.11 đúng cho từng hướng, và do đó đúng cho cả ma trận hiệp phương sai.
:::

Hệ quả 11.15 tách tiêu chuẩn không chệch khỏi tiêu chuẩn hợp lý cho ma trận, như Mệnh đề 11.11 làm cho phương sai; giả thiết Gaussian không cần thiết. Với dữ liệu cảm biến nền của Ví dụ 11.8, $n=4$ và $S_{n-1}=\frac43S_4=\begin{pmatrix}10/3&2\\2&10/3\end{pmatrix}$. Hai ma trận có cùng vector riêng, và trị riêng của $S_{n-1}$ bằng $\frac43$ lần trị riêng của $S_4$, tức $16/3$ và $4/3$. Phép nhân với $n/(n-1)$ không đổi hạng, nên hiệu chỉnh này không làm một ma trận suy biến trở thành khả nghịch.

### 8.3. Trị riêng và khoảng cách Mahalanobis

Gaussian đã khớp ở Ví dụ 11.9 có tâm $\hat\mu=(10,20)^\top$ và ma trận $\hat\Sigma=S_4$. Câu hỏi mở đầu đòi so sánh độ lệch của $a=(13,23)^\top$ và $b=(12,18)^\top$ so với tâm này. Khoảng cách Euclid xếp $a$ xa tâm hơn, nhưng nó bỏ qua $\hat\Sigma$, tức bỏ qua việc dữ liệu nền trải rộng theo hướng $(1,1)^\top$ và hẹp theo hướng $(1,-1)^\top$.

Về mặt hình học, ta có thể quay hệ trục về các hướng phân tán chính của $\hat\Sigma$, rồi chia mỗi tọa độ mới cho độ lệch chuẩn theo hướng đó. Sau phép biến đổi này, mọi hướng có cùng mức phân tán, và khoảng cách Euclid đo được độ lệch theo đúng mức phân tán; Murphy (2022), §7.4.5 gọi phép biến đổi này là làm trắng dữ liệu (whitening). Định nghĩa sau cho độ dài đó trực tiếp bằng ma trận nghịch đảo, không cần thực hiện phép quay.

::: definition Định nghĩa 11.16 (Khoảng cách Mahalanobis)
Cho ma trận đối xứng xác định dương $\Sigma\in\mathbb R^{d\times d}$ và hai vector $x,\mu\in\mathbb R^d$. *Khoảng cách Mahalanobis* (Mahalanobis distance) từ $x$ đến $\mu$ theo $\Sigma$ là

$$
\begin{aligned}
&d_\Sigma(x,\mu)\\
&=\sqrt{(x-\mu)^\top\Sigma^{-1}(x-\mu)}.
\end{aligned}
\tag{8.8}
$$
:::

Vì $\Sigma^{-1}\succ0$, biểu thức dưới dấu căn không âm và chỉ bằng $0$ khi $x=\mu$. Khi $\Sigma=I_d$, (8.8) là khoảng cách Euclid; khi $\Sigma=\sigma^2I_d$, nó là khoảng cách Euclid chia cho $\sigma$. Dạng toàn phương trong (8.8) chính là số mũ của mật độ Gaussian:

$$
\begin{aligned}
f_{\mu,\Sigma}(x)&=\frac1{(2\pi)^{d/2}(\det\Sigma)^{1/2}}\\
&\quad\times\exp\Bigl[-\frac12d_\Sigma^2(x,\mu)\Bigr].
\end{aligned}
$$

Với $\mu$ và $\Sigma$ cố định, khoảng cách Mahalanobis nhỏ hơn nghĩa là mật độ lớn hơn. Khi so sánh hai Gaussian có ma trận hiệp phương sai khác nhau, còn phải tính đến hệ số $(\det\Sigma)^{-1/2}$, nên so khoảng cách Mahalanobis thôi thì chưa so được mật độ.

Để thấy $d_\Sigma$ đo độ lệch theo từng hướng, ta dùng phân rã trị riêng của ma trận đối xứng (Bài 00, mục "Phân rã trị riêng"). Mệnh đề sau theo cách trình bày của Murphy (2022), §3.2.2 và §7.4.4.

::: proposition Mệnh đề 11.17 (Hướng và độ dài của đường đồng mức Gaussian) — chứng minh đầy đủ
**Giả thiết.**

- **Ma trận:** $\Sigma\in\mathbb R^{d\times d}$ đối xứng xác định dương, với phân rã $\Sigma=U\operatorname{diag}(\lambda_1,\ldots,\lambda_d)U^\top$, trong đó $U=[u_1\ \cdots\ u_d]$ trực giao và $\lambda_j>0$.
- **Tọa độ riêng:** với $x,\mu\in\mathbb R^d$, đặt $z=U^\top(x-\mu)$, tức $z_j=u_j^\top(x-\mu)$.

**Kết luận.**

- (a) Bình phương khoảng cách Mahalanobis bằng tổng có trọng số của các tọa độ riêng:
$$
d_\Sigma^2(x,\mu)=\sum_{j=1}^d\frac{z_j^2}{\lambda_j}.
\tag{8.9}
$$
- (b) Với $c>0$, tập $\{x\in\mathbb R^d:d_\Sigma^2(x,\mu)=c\}$ là một ellipsoid tâm $\mu$, có các trục theo hướng $u_j$ và các bán trục dài $\sqrt{c\lambda_j}$; khi $d=2$, đó là một elip. Tập này là một đường đồng mức của mật độ $f_{\mu,\Sigma}$.
- (c) Nếu vector ngẫu nhiên $X$ có $\operatorname{Cov}(X)=\Sigma$ thì $\operatorname{Var}(u_j^\top X)=\lambda_j$ với mọi $j$.
:::

::: proof Chứng minh Mệnh đề 11.17
**Lộ trình.** Viết $\Sigma^{-1}$ bằng cùng phân rã, đổi sang tọa độ riêng $z$, rồi đọc phương trình đồng mức trong tọa độ đó.

**Bước 1 (ma trận nghịch đảo).** Đặt $M=U\operatorname{diag}(1/\lambda_1,\ldots,1/\lambda_d)U^\top$. Vì $U^\top U=I_d$ và $UU^\top=I_d$,

$$
\begin{aligned}
&\Sigma M\\
&=U\operatorname{diag}(\lambda_j)\,U^\top U\,\operatorname{diag}(1/\lambda_j)U^\top\\
&=U\operatorname{diag}(\lambda_j/\lambda_j)U^\top\\
&=UU^\top=I_d,
\end{aligned}
$$

nên $\Sigma^{-1}=M$.

**Bước 2 (phần (a)).** Thay $\Sigma^{-1}=M$ vào (8.8) và dùng $z=U^\top(x-\mu)$:

$$
\begin{aligned}
&d_\Sigma^2(x,\mu)\\
&=(x-\mu)^\top U\operatorname{diag}(1/\lambda_j)\\
&\qquad U^\top(x-\mu)\\
&=z^\top\operatorname{diag}(1/\lambda_j)\,z\\
&=\sum_{j=1}^d\frac{z_j^2}{\lambda_j}.
\end{aligned}
$$

**Bước 3 (phần (b)).** Theo (8.9), $d_\Sigma^2(x,\mu)=c$ khi và chỉ khi $\sum_jz_j^2/(c\lambda_j)=1$. Trong tọa độ $z$, đây là ellipsoid tâm $0$ có các trục theo các vector đơn vị chuẩn $e_j$ và bán trục $\sqrt{c\lambda_j}$. Phép đổi tọa độ $x\mapsto z=U^\top(x-\mu)$ là một phép dời hình: nó đưa $\mu$ về $0$, đưa hướng $u_j$ về $e_j$ vì $U^\top u_j=e_j$, và bảo toàn độ dài vì $\lVert U^\top y\rVert^2=y^\top UU^\top y=\lVert y\rVert^2$. Do đó trong tọa độ $x$, tập trên là ellipsoid tâm $\mu$, các trục theo $u_j$, với cùng các bán trục. Mật độ $f_{\mu,\Sigma}(x)$ phụ thuộc $x$ chỉ qua $d_\Sigma^2(x,\mu)$, nên không đổi trên tập này.

**Bước 4 (phần (c)).** Theo (8.2), $\operatorname{Var}(u_j^\top X)=u_j^\top\Sigma u_j$. Vì $\Sigma u_j=\lambda_ju_j$ và $u_j^\top u_j=1$, ta được $u_j^\top\Sigma u_j=\lambda_j$. $\square$

Khoảng cách Mahalanobis đo độ lệch theo từng hướng riêng, với đơn vị là độ lệch chuẩn theo hướng đó.
:::

Mệnh đề 11.17 nói rằng $d_\Sigma^2$ là tổng bình phương các tọa độ riêng, mỗi tọa độ chia cho phương sai theo hướng của nó. Độ lệch $z_j$ theo hướng có $\lambda_j$ lớn bị chia cho một số lớn nên đóng góp ít; độ lệch theo hướng có $\lambda_j$ nhỏ đóng góp nhiều. Bán trục tỉ lệ với $\sqrt{\lambda_j}$, tức độ lệch chuẩn theo hướng đó. Khi có trị riêng lặp, vector riêng trong không gian riêng tương ứng không duy nhất, nhưng (8.9) không phụ thuộc lựa chọn đó: tổng $\sum z_j^2$ trên một không gian riêng là bình phương độ dài hình chiếu của $x-\mu$ lên không gian đó.

Trong học máy, điểm $d_{\hat\Sigma}^2(x,\hat\mu)$ dưới Gaussian đã khớp là điểm lệch dùng trong phát hiện bất thường dựa trên Gaussian: quan sát có điểm lớn có mật độ thấp dưới mô hình nền. Một độ lệch Euclid lớn theo hướng phân tán rộng có thể nhận điểm thấp hơn một độ lệch Euclid nhỏ theo hướng phân tán hẹp. Để gắn nhãn bất thường, còn cần một ngưỡng, dữ liệu đánh giá và kiểm tra giả thiết Gaussian; Mệnh đề 11.17 chỉ cho cách tính điểm.

Mệnh đề 11.17 cho phép trả lời Câu hỏi mở đầu bằng các tọa độ riêng của hai quan sát mới.

::: example Ví dụ 11.11 (Hai quan sát mới của dây chuyền)
**Dữ kiện.** Gaussian đã khớp của Ví dụ 11.9 có $\hat\mu=(10,20)^\top$, $\hat\Sigma=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}$ và $\hat\Sigma^{-1}=\frac18\begin{pmatrix}5&-3\\-3&5\end{pmatrix}$. Hai quan sát mới là $a=(13,23)^\top$ và $b=(12,18)^\top$.

**Phân rã trị riêng.** Đặt

$$
\begin{aligned}
u_+&=\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix},\quad\lambda_+=4,\\
u_-&=\frac1{\sqrt2}\begin{pmatrix}1\\-1\end{pmatrix},\quad\lambda_-=1.
\end{aligned}
$$

Thật vậy, $\hat\Sigma(1,1)^\top=(4,4)^\top$ và $\hat\Sigma(1,-1)^\top=(1,-1)^\top$. Hai vector $u_\pm$ trực giao và có độ dài $1$.

**Đường đồng mức.** Theo Mệnh đề 11.17(b), elip $d^2_{\hat\Sigma}=1$ có bán trục dài $\sqrt4=2$ theo hướng $u_+$ và bán trục ngắn $1$ theo hướng $u_-$. Tỉ số hai bán trục là $2$, còn tỉ số hai phương sai là $4$.

**Tọa độ riêng.** Độ lệch $a-\hat\mu=(3,3)^\top$ cho $z_+=u_+^\top(3,3)^\top=6/\sqrt2=3\sqrt2$ và $z_-=0$. Độ lệch $b-\hat\mu=(2,-2)^\top$ cho $z_+=0$ và $z_-=u_-^\top(2,-2)^\top=4/\sqrt2=2\sqrt2$.

**Hai khoảng cách.** Theo (8.9),

$$
\begin{array}{c|c|c}
 & \lVert x-\hat\mu\rVert^2 & d_{\hat\Sigma}^2(x,\hat\mu)\\ \hline
a & 18 & (3\sqrt2)^2/4=9/2\\
b & 8 & (2\sqrt2)^2/1=8
\end{array}
$$

**Kiểm tra lại.** Tính trực tiếp bằng $\hat\Sigma^{-1}$: $\hat\Sigma^{-1}(3,3)^\top=\frac18(6,6)^\top$, nên $d^2_{\hat\Sigma}(a,\hat\mu)=\frac18(18+18)=\frac92$; $\hat\Sigma^{-1}(2,-2)^\top=\frac18(16,-16)^\top$, nên $d^2_{\hat\Sigma}(b,\hat\mu)=\frac18(32+32)=8$. Cũng vậy, $z_+^2+z_-^2$ bằng $18$ cho $a$ và $8$ cho $b$, đúng bình phương độ dài Euclid, vì phép đổi tọa độ bảo toàn độ dài.

**Tỉ số mật độ.** Hai quan sát được đánh giá dưới cùng một Gaussian, nên hệ số chuẩn hóa triệt tiêu:

$$
\begin{aligned}
\frac{\hat f(a)}{\hat f(b)}&=\exp\Bigl[-\frac12\Bigl(\frac92-8\Bigr)\Bigr]\\
&=e^{7/4}\approx5{,}755.
\end{aligned}
$$

**Diễn giải.** Độ lệch của $a$ nằm trọn theo hướng có phương sai $4$, còn độ lệch của $b$ nằm trọn theo hướng có phương sai $1$. Vì vậy $a$ xa tâm hơn theo khoảng cách Euclid nhưng có khoảng cách Mahalanobis nhỏ hơn, và mật độ của $a$ dưới mô hình nền lớn hơn mật độ của $b$ khoảng $5{,}8$ lần.
:::

Ví dụ 11.11 trả lời Câu hỏi mở đầu: dưới Gaussian khớp với dữ liệu nền, sản phẩm $b$ lệch khỏi chế độ vận hành bình thường nhiều hơn sản phẩm $a$. Hình 11.1 vẽ lại phép so sánh này: $a$ nằm trên trục dài, giữa hai elip $d_{\hat\Sigma}=2$ và $d_{\hat\Sigma}=3$, còn $b$ nằm trên trục ngắn, gần elip $d_{\hat\Sigma}=3$.

![Mặt phẳng tọa độ với gốc đặt tại trung bình (10, 20). Bốn điểm dữ liệu nền nằm tại các độ lệch (2, 2), (−2, −2), (1, −1), (−1, 1). Ba elip đồng tâm ứng với khoảng cách Mahalanobis 1, 2, 3 có trục dài theo hướng (1, 1) và trục ngắn theo hướng (1, −1); elip ứng với khoảng cách 1 có bán trục 2 và 1. Điểm a tại độ lệch (3, 3) nằm trên trục dài, điểm b tại độ lệch (2, −2) nằm trên trục ngắn; bảng bên phải ghi bình phương Euclid 18 và 8, bình phương Mahalanobis 4,5 và 8.](img/lec-11/gaussian-geometry.svg)

*Hình 11.1. Dữ liệu cảm biến nền và Gaussian đã khớp của các Ví dụ 11.8, 11.9 và 11.11. Hai hướng riêng có phương sai $4$ và $1$. Điểm $a$ xa tâm hơn theo khoảng cách Euclid nhưng gần tâm hơn theo khoảng cách Mahalanobis, vì nó lệch theo hướng phân tán rộng.*

Cách đọc hình học trên dựa vào các giả thiết của mô hình. Nhận xét sau nêu ba chỗ dễ dùng sai.

::: remark Nhận xét 11.18 (Giới hạn của cách đọc hình học)
1. Phần tử ngoài đường chéo của $\Sigma$ bằng $0$ chỉ suy ra hai tọa độ độc lập khi có thêm giả thiết, chẳng hạn hai tọa độ của một vector Gaussian. Với phân phối tổng quát, hai biến không tương quan vẫn có thể phụ thuộc, như trong Ví dụ 10.10: độ lệch kích thước $X$ và nhãn lỗi $Y=\mathbf 1_{\{|X|=2\}}$ có hiệp phương sai $0$ nhưng $X$ xác định hoàn toàn $Y$.
2. Số $c$ trong Mệnh đề 11.17(b) chỉ chọn một đường đồng mức; nó không tự cho xác suất để một quan sát rơi vào trong ellipsoid. Khi $\hat\mu$, $\hat\Sigma$ được ước lượng từ bốn điểm, một ngưỡng đặt trên $d^2_{\hat\Sigma}$ còn chịu thêm sai số của chính phép ước lượng.
3. Khoảng cách Euclid phụ thuộc đơn vị đo, còn khoảng cách Mahalanobis thì không, nếu trung bình và ma trận được đổi cùng dữ liệu. Với phép đổi biến khả nghịch $y=Ax+\eta$, trong đó $A$ khả nghịch và $\eta\in\mathbb R^d$, trung bình và ma trận mới là $A\mu+\eta$ và $A\Sigma A^\top$, và
$$
\begin{aligned}
&(Ax-A\mu)^\top(A\Sigma A^\top)^{-1}\\
&\qquad(Ax-A\mu)\\
&=(x-\mu)^\top A^\top A^{-\top}\\
&\qquad\Sigma^{-1}A^{-1}A(x-\mu)\\
&=d_\Sigma^2(x,\mu).
\end{aligned}
$$
Nếu chỉ đổi đơn vị của dữ liệu mà giữ nguyên ma trận cũ, kết quả không còn ý nghĩa này.
:::

Như vậy, khi $S_n\succ0$, ta học được $\hat\mu=\bar x$ và $\hat\Sigma=S_n$ (Định lý 11.14); Hệ quả 11.15 cho phiên bản không chệch $S_{n-1}$; Định nghĩa 11.16 và Mệnh đề 11.17 đọc $\hat\Sigma$ thành các hướng phân tán và một khoảng cách theo mức phân tán của từng hướng. Với dữ liệu cảm biến nền, các kết quả này trả lời Câu hỏi mở đầu. Tuy nhiên, khi hai đặc trưng chứa cùng một thông tin, $S_n$ suy biến, mô hình Gaussian không ràng buộc không có ước lượng hợp lý cực đại, và khoảng cách Mahalanobis không tính được. Trong Mục 9, ta áp dụng các kết quả này cho dữ liệu cảm biến nền và xét đúng trường hợp suy biến đó.

## 9. Ý nghĩa, tác động và giới hạn

Hai tình huống dưới đây dùng các kết quả của bài trên dữ liệu cảm biến. Tình huống thứ nhất thỏa mọi giả thiết của Định lý 11.14; tình huống thứ hai vi phạm giả thiết $S_n\succ0$.

::: application Tình huống 11.1 (Chấm điểm lệch cho quan sát cảm biến hai chiều)
**Bài toán và dữ liệu.** Bốn quan sát nền của hai đặc trưng là $(12,22)^\top$, $(8,18)^\top$, $(11,19)^\top$, $(9,21)^\top$. Cần xây dựng mô hình nền rồi chấm điểm hai quan sát mới $a=(13,23)^\top$ và $b=(12,18)^\top$. Quy tắc vận hành gắn cờ một quan sát khi bình phương khoảng cách Mahalanobis của nó tới tâm vượt quá $6$.

**Mô hình hóa và giả thiết.** Chọn mô hình i.i.d. $\mathcal N(\mu,\Sigma)$ cho dữ liệu nền (Định nghĩa 11.1, Định nghĩa 10.20), và giả thiết các quan sát mới thuộc cùng chế độ đo. Tính độc lập giữa các sản phẩm không đòi hỏi hai đặc trưng trong cùng một sản phẩm độc lập với nhau; quan hệ giữa chúng được ghi trong $\Sigma$.

**Kiểm tra điều kiện.** Ma trận $S_4=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}$ có các trị riêng $4$ và $1$, nên $S_4\succ0$ (Ví dụ 11.8), và Định lý 11.14 áp dụng được.

**Ước lượng.** Theo (8.6), $\hat\mu=(10,20)^\top$ và $\hat\Sigma=S_4$. Mô hình chỉ được ước lượng trên dữ liệu nền; các quan sát cần chấm điểm không được ghép vào mẫu.

**Chấm điểm.** Theo Định nghĩa 11.16 và Mệnh đề 11.17, $d^2_{\hat\Sigma}(a,\hat\mu)=9/2=4{,}5$ và $d^2_{\hat\Sigma}(b,\hat\mu)=8$ (Ví dụ 11.11). Với ngưỡng $6$, chỉ $b$ bị gắn cờ.

**Diễn giải và giới hạn.** Quan sát $b$ lệch theo hướng ít biến động nên có mật độ thấp hơn, dù gần tâm hơn theo khoảng cách Euclid. Phát hiện bất thường dựa trên Gaussian dùng đúng quan hệ giữa mật độ và dạng toàn phương này. Để biết tỉ lệ báo động sai của ngưỡng $6$ và kiểm tra giả thiết Gaussian, cần thêm dữ liệu kiểm tra từ chế độ vận hành bình thường; bốn quan sát nền chỉ đủ để tính $\hat\mu$ và $\hat\Sigma$.
:::

Tình huống sau giữ mô hình Gaussian hai chiều nhưng dùng dữ liệu mà hai cột chứa cùng một thông tin, nên giả thiết $S_n\succ0$ của Định lý 11.14 không thỏa.

::: application Tình huống 11.2 (Hai đặc trưng trùng thông tin)
**Bài toán và dữ liệu.** Một hệ thống lưu hai cột: số đo $Z$ và chính số đo đó nhân $2$. Ba sản phẩm cho các vector $(0,0)^\top$, $(1,2)^\top$, $(2,4)^\top$. Cần kiểm tra có thể khớp một Gaussian hai chiều không ràng buộc cho dữ liệu này hay không.

**Tính.** Trung bình mẫu là $\bar x=(1,2)^\top$, và các vector sai lệch là $(-1,-2)^\top$, $(0,0)^\top$, $(1,2)^\top$. Theo (8.3),

$$
\begin{aligned}
S_3&=\frac13\Bigl[2\begin{pmatrix}1&2\\2&4\end{pmatrix}\Bigr]\\
&=\frac23\begin{pmatrix}1&2\\2&4\end{pmatrix},\\
\det S_3&=\frac49(4-4)=0.
\end{aligned}
$$

Vector $(-2,1)^\top$ thỏa $S_3(-2,1)^\top=0$: mỗi số đo đều thỏa $-2x^{(1)}+x^{(2)}=0$, nên phương sai mẫu theo hướng $(-2,1)^\top$ bằng $0$. Vì một trị riêng của $S_3$ bằng $0$, trị riêng còn lại bằng $\operatorname{tr}S_3=\frac23\cdot5=\frac{10}3$.

**Hậu quả.** Giả thiết $S_n\succ0$ bị vi phạm. Theo Định lý 11.14, log-hợp lý không bị chặn trên và không có ước lượng hợp lý cực đại với $\Sigma\succ0$; $S_3$ không khả nghịch nên không tính được khoảng cách Mahalanobis theo Định nghĩa 11.16. Nhân $S_3$ với $3/2$ để có ước lượng không chệch không thay đổi hạng (Hệ quả 11.15).

**Lựa chọn mô hình.** Có ba cách thay đổi mô hình, mỗi cách là một giả thiết mới cần được nêu rõ:

- giữ một đặc trưng và dùng Gaussian một chiều, nếu cơ chế dữ liệu cho biết đặc trưng thứ hai là bản sao có hệ số;
- thêm một mô hình nhiễu đo riêng cho từng đặc trưng;
- dùng ước lượng co $\rho\Sigma_0+(1-\rho)S_n$ (Murphy (2022), §4.5.2), tức thêm một giả thiết tiên nghiệm về $\Sigma$.
:::

Các bài toán khác của học máy dùng cùng công cụ của bài:

- ước lượng phân phối nhãn của một tập dữ liệu phân loại dùng Định lý 11.7;
- học trung bình của một tín hiệu dưới nhiễu Gaussian dùng Định lý 11.9;
- học một mô hình chung cho các đặc trưng tương quan dùng Định lý 11.14;
- chọn hàm mất mát qua việc chọn mô hình nhiễu dùng Mệnh đề 11.3, như Ví dụ 11.6.

Dưới mô hình đã chọn và trên dữ liệu đã thấy, các nghiệm (5.2), (6.2), (7.2), (8.6) là tham số có hợp lý lớn nhất, và chúng tồn tại khi dữ liệu không suy biến. Mức phù hợp của mô hình và chất lượng dự đoán trên quan sát mới phải được kiểm tra riêng, trên dữ liệu chưa dùng để ước lượng. Vì vậy, trong thực hành, cần nêu rõ mô hình và cách lấy mẫu trước khi viết hàm hợp lý, kiểm tra điều kiện không suy biến trước khi dùng công thức nghiệm, và đánh giá mô hình đã khớp trên dữ liệu khác với dữ liệu dùng để ước lượng.

Tóm lại, khi một mô hình có tham số chưa biết, học từ dữ liệu là ước lượng tham số đó từ một mẫu i.i.d., và ta chọn ước lượng hợp lý cực đại. Đây là một bài toán tối ưu vì giả thiết độc lập viết hàm hợp lý thành tích, phép lấy log đổi nó thành tổng các mất mát của từng quan sát, nên ước lượng hợp lý cực đại là điểm cực tiểu của rủi ro thực nghiệm (Mệnh đề 11.3). Tối ưu trên đoạn $[0,1]$ cho tần suất Bernoulli, và ràng buộc chuẩn hóa trên đơn hình cho tần suất của các nhóm phân loại. Với Gaussian, cùng nguyên lý cho trung bình mẫu và hiệp phương sai mẫu với mẫu số $n$, và điều kiện không suy biến quyết định công thức đó có phải nghiệm hay không. Mẫu số $n-1$ phục vụ một tiêu chuẩn khác, tính không chệch qua các lần lấy mẫu. Phân rã trị riêng đọc ma trận hiệp phương sai thành các hướng phân tán và cho khoảng cách Mahalanobis, trả lời Câu hỏi mở đầu.

| Nhóm kết quả | Số hiệu và nội dung |
|---|---|
| Mô hình và mục tiêu | Định nghĩa 11.1, 11.2; Mệnh đề 11.3: mẫu i.i.d., hàm hợp lý, tương đương với tối thiểu hóa rủi ro thực nghiệm |
| Bernoulli | Định lý 11.4; Nhận xét 11.5: $\hat p=s/n$, kể cả nghiệm biên |
| Phân loại | Định nghĩa 11.6; Định lý 11.7; Nhận xét 11.8: $\hat\pi_k=n_k/n$, nhóm vắng mặt nhận $0$ |
| Gaussian một chiều | Định lý 11.9; Định nghĩa 11.10; Mệnh đề 11.11: $\hat\mu=\bar x$, $\hat\sigma^2=Q/n$; mẫu số $n-1$ cho tính không chệch |
| Gaussian nhiều chiều | Định nghĩa 11.12, 11.13; Định lý 11.14; Hệ quả 11.15: $\hat\Sigma=S_n$ khi $S_n\succ0$; $\mathbb E[S_n]=\frac{n-1}n\Sigma$ |
| Hình học | Định nghĩa 11.16; Mệnh đề 11.17; Nhận xét 11.18: khoảng cách Mahalanobis, trục và bán trục của đường đồng mức |

Các công thức cần nhớ là (4.3), (5.2), (6.2), (7.2), (7.4), (8.6), (8.7) và (8.9). Các giả thiết hay bị bỏ quên khi dùng chúng là:

- tính độc lập của các quan sát, cần cho dạng tích của hàm hợp lý;
- miền tham số, quyết định sự tồn tại nghiệm ở biên;
- điều kiện không suy biến $Q>0$ hoặc $S_n\succ0$;
- biến đang được xét: mật độ là hàm của dữ liệu, hàm hợp lý là hàm của tham số, hậu nghiệm là phân phối của tham số và cần thêm tiên nghiệm.

## 10. Bài tập

Đề, gợi ý và lời giải nằm trong [tệp bài tập của Bài 11](material-viewer.html?doc=materials/lec-11/exercises.md); mỗi dòng ghi mục tiêu học tập mà bài kiểm tra.

**Trên lớp.**

1. **Bài tập 11.1** (Nghiệm trong và nghiệm biên của mô hình Bernoulli): mục tiêu học tập 2.
2. **Bài tập 11.2** (Nhân tử Lagrange trên một mặt của đơn hình): mục tiêu học tập 3.
3. **Bài tập 11.3** (Hình học Gaussian theo hướng riêng): mục tiêu học tập 5.

**Tự học.**

4. **Bài tập 11.4** (Hợp lý Bernoulli, nghiệm biên và cơ chế lấy mẫu): mục tiêu học tập 1, 2.
5. **Bài tập 11.5** (Ước lượng phân loại và entropy chéo): mục tiêu học tập 3, 6.
6. **Bài tập 11.6** (Phương sai hợp lý cực đại và phương sai không chệch): mục tiêu học tập 4.
7. **Bài tập 11.7** (Ma trận hiệp phương sai, đường đồng mức và dữ liệu suy biến): mục tiêu học tập 4, 5.
8. **Bài tập 11.8** (Mất mát từ mô hình nhiễu có phương sai khác nhau): mục tiêu học tập 6.

## 11. Câu hỏi cuối buổi và cầu nối

**Câu hỏi.** Cho dữ liệu $D=(x_1,\ldots,x_n)$ của một mẫu i.i.d. dưới mô hình $\{p_\theta:\theta\in\Theta\}$.

1. Viết bài toán tối ưu mà ước lượng hợp lý cực đại giải, dưới dạng cực tiểu một trung bình mất mát trên dữ liệu, và chỉ ra bước nào cần giả thiết độc lập.
2. Viết hàm mất mát của bài toán đó cho mô hình Bernoulli$(p)$ và cho mô hình $\mathcal N(\mu,v)$ với $v$ đã biết.
3. Năm lần kiểm tra liên tiếp đều cho cờ $0$. Tìm nghiệm của bài toán tối ưu cho mô hình Bernoulli trên $[0,1]$. Có thể kết luận thiết bị không bao giờ gắn cờ không?

::: solution Lời giải câu hỏi cuối buổi
1. Theo Mệnh đề 11.3, ước lượng hợp lý cực đại là điểm cực tiểu của rủi ro thực nghiệm $\hat R_n(\theta)=-\frac1n\sum_i\log p_\theta(x_i)$, công thức (4.3). Giả thiết độc lập được dùng khi viết hàm hợp lý thành tích (4.1); khi các quan sát là bản chép của nhau, như cơ chế thứ hai của Ví dụ 11.1, dạng tích sai và mục tiêu không còn là tổng trên từng quan sát.
2. Với Bernoulli$(p)$, mất mát là entropy chéo nhị phân $-\frac1n\sum_i[x_i\log p+(1-x_i)\log(1-p)]$ (Mục 5). Với $\mathcal N(\mu,v)$ và $v$ đã biết, âm log-hợp lý trung bình bằng $\frac12\log(2\pi v)+\frac1{2vn}\sum_i(x_i-\mu)^2$; bỏ hằng số, mục tiêu là tổng bình phương sai lệch, với nghiệm $\hat\mu=\bar x$ (Bước 1 của chứng minh Định lý 11.9).
3. Ta có $s=0$, $n=5$, nên Định lý 11.4 cho $\hat p=0$. Không thể kết luận thiết bị không bao giờ gắn cờ. Chẳng hạn, với $p=1/5$, xác suất năm cờ đều bằng $0$ là $(4/5)^5=1024/3125\approx0{,}328$; một mẫu như vậy xảy ra khá thường xuyên dù xác suất gắn cờ dương (Nhận xét 11.5). Nghiệm tối ưu trên mẫu đã thấy chưa cho biết chất lượng dự đoán trên quan sát mới.
:::

Đến đây ta trả lời được hai câu hỏi. Thứ nhất, một hàm mất mát được suy ra từ một giả thiết phân phối bằng cách lấy âm log-hợp lý (Mệnh đề 11.3): giả thiết Gaussian cho tổng bình phương sai lệch, giả thiết Bernoulli cho entropy chéo nhị phân, giả thiết phân loại cho entropy chéo nhiều lớp. Thứ hai, lựa chọn mô hình xác suất quyết định cách học tham số: trên cùng dữ liệu $(0,0,9)$, nhiễu Gaussian cho ước lượng $3$ còn nhiễu Laplace cho ước lượng $0$ (Ví dụ 11.6).

Ở các mô hình đã xét, mọi quan sát dùng chung một tham số, và chất lượng của tham số chỉ được đo trên mẫu đã thấy. Bài 12 cho tham số của phân phối phụ thuộc đầu vào, dưới dạng mô hình có điều kiện $p_\theta(y\mid x)$, và suy ra từ đó mất mát bình phương của hồi quy và entropy chéo của hồi quy logistic. Câu hỏi còn mở mà Bài 12 xét là: một tham số khớp tốt trên tập huấn luyện thì dự đoán quan sát mới tốt đến đâu.

## 12. Tài liệu đọc

Tài liệu chính là Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, dẫn theo số mục của bản trực tuyến do tác giả công bố ([trang sách](https://probml.github.io/pml-book/book1.html)).

- **Trước buổi học:** Murphy (2022), §2.4–2.6 (Bernoulli, phân loại, Gaussian một chiều) và §3.2.1–3.2.2 (Gaussian nhiều chiều, khoảng cách Mahalanobis).
- **Sau buổi học:** Murphy (2022), §4.1, §4.2.1–4.2.6 (ước lượng hợp lý cực đại cho Bernoulli, phân loại, Gaussian một chiều và nhiều chiều), §4.3 (tối thiểu hóa rủi ro thực nghiệm), §4.7.6.1 (độ chệch của bộ ước lượng); Bài tập 4.1, 4.7 và 4.8 của Murphy luyện thêm Định lý 11.9 và Mệnh đề 11.11.
- **Mở rộng:** Murphy (2022), §4.5–4.5.2 (bài toán số đếm bằng không, ước lượng co của ma trận hiệp phương sai), §4.6.2 (mô hình Beta–nhị thức), §6.2 (phân kỳ Kullback–Leibler và quan hệ với ước lượng hợp lý cực đại), §7.4.4–7.4.5 (hình học của dạng toàn phương, làm trắng dữ liệu).
- **Đọc thêm:** Murphy (2022), §4.7.1–4.7.4 về phân phối mẫu và khoảng tin cậy. Một giá trị ước lượng đơn lẻ chưa cho biết bộ ước lượng dao động bao nhiêu qua các lần lấy mẫu; các mục này mô tả độ dao động đó.

Khi đọc Murphy (2022), §3.2.2, lưu ý rằng tọa độ riêng ở đây là $z=U^\top(x-\mu)$, với các cột của $U$ là vector riêng của $\Sigma$.

## Phụ lục

### A. Đổi biến ma trận trong chứng minh Định lý 11.14

Bước 2 của chứng minh Định lý 11.14 dùng bốn sự kiện sau. Cho $S_n$ đối xứng xác định dương $d\times d$ với phân rã $S_n=W\operatorname{diag}(a_1,\ldots,a_d)W^\top$, $W$ trực giao, $a_j>0$.

**Căn bậc hai.** Đặt $S_n^{1/2}=W\operatorname{diag}(\sqrt{a_1},\ldots,\sqrt{a_d})W^\top$. Ma trận này đối xứng, có các trị riêng $\sqrt{a_j}>0$ nên xác định dương, và $S_n^{1/2}S_n^{1/2}=W\operatorname{diag}(a_j)W^\top=S_n$ vì $W^\top W=I_d$. Tương tự, $S_n^{-1/2}=W\operatorname{diag}(1/\sqrt{a_j})W^\top$ là nghịch đảo của $S_n^{1/2}$, và $S_n^{-1/2}S_n^{-1/2}=S_n^{-1}$.

Cho $\Lambda$ đối xứng xác định dương và đặt $C=S_n^{1/2}\Lambda S_n^{1/2}$.

**$C$ đối xứng xác định dương.** Ta có $C^\top=(S_n^{1/2})^\top\Lambda^\top(S_n^{1/2})^\top=C$. Với $w\ne0$, đặt $y=S_n^{1/2}w$; vì $S_n^{1/2}$ khả nghịch nên $y\ne0$, và $w^\top Cw=y^\top\Lambda y>0$.

**Song ánh.** Với mọi $C$ đối xứng xác định dương, ma trận $\Lambda=S_n^{-1/2}CS_n^{-1/2}$ đối xứng xác định dương, theo cùng lập luận với $S_n^{-1/2}$ thay cho $S_n^{1/2}$. Hai ánh xạ $\Lambda\mapsto S_n^{1/2}\Lambda S_n^{1/2}$ và $C\mapsto S_n^{-1/2}CS_n^{-1/2}$ là ngược của nhau, vì $S_n^{-1/2}S_n^{1/2}=S_n^{1/2}S_n^{-1/2}=I_d$. Do đó $\Lambda\mapsto C$ là song ánh trên tập các ma trận đối xứng xác định dương.

**Định thức.** Theo $\det(AB)=\det A\det B$,

$$
\begin{aligned}
\det C&=\det S_n^{1/2}\,\det\Lambda\,\det S_n^{1/2}\\
&=\det\Lambda\,\det\bigl(S_n^{1/2}S_n^{1/2}\bigr)\\
&=\det\Lambda\,\det S_n,
\end{aligned}
$$

nên $\log\det C=\log\det\Lambda+\log\det S_n$; các định thức đều dương vì các ma trận xác định dương.

**Vết.** Theo $\operatorname{tr}(AB)=\operatorname{tr}(BA)$ với $A=S_n^{1/2}$ và $B=\Lambda S_n^{1/2}$,

$$
\begin{aligned}
\operatorname{tr}C&=\operatorname{tr}\bigl(S_n^{1/2}\cdot\Lambda S_n^{1/2}\bigr)\\
&=\operatorname{tr}\bigl(\Lambda S_n^{1/2}S_n^{1/2}\bigr)\\
&=\operatorname{tr}(\Lambda S_n).
\end{aligned}
$$

Bốn sự kiện trên cho đẳng thức $h(\Lambda)=\log\det C-\operatorname{tr}C-\log\det S_n$ ở Bước 2.
