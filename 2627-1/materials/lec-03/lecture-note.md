# Bài 03 — Đối ngẫu Lagrange, điều kiện Slater và điều kiện KKT

## 1. Mở đầu: chứng nhận một nghiệm tối ưu

Trong bài toán cực tiểu có ràng buộc, ta tìm giá trị nhỏ nhất của hàm mục tiêu trong các điểm thỏa mọi ràng buộc. Những điểm này được gọi là **điểm khả thi**. Một thuật toán tìm được điểm khả thi có giá trị mục tiêu bằng $5$ chưa đủ để kết luận không còn nghiệm tốt hơn. Với bài toán cực tiểu, nghiệm khả thi cho **cận trên** của giá trị tối ưu. Nếu xây dựng được một **cận dưới** cũng bằng $5$, ta đã chứng nhận tối ưu mà không phải thử mọi nghiệm khả thi.

Bài này phát triển ba công cụ liên quan: đối ngẫu Lagrange tạo cận dưới; điều kiện Slater bảo đảm cận tốt nhất bằng giá trị tối ưu trong một lớp bài toán lồi; điều kiện Karush–Kuhn–Tucker (KKT) biến chứng nhận ấy thành một hệ điều kiện có thể kiểm tra và giải.

Kiến thức cần dùng: đạo hàm, gradient, hàm lồi, điều kiện cực tiểu của hàm lồi khả vi và phép hoàn thành bình phương. Mục tiêu là tự tính hàm đối ngẫu, tìm một điểm thỏa Slater, đọc đường cận trên hình và kiểm tra đầy đủ bốn nhóm KKT.

## 2. Hàm và bài toán đối ngẫu Lagrange

### 2.1. Ví dụ xuyên suốt

Bài toán: tìm số thực $x$ để $x^2+1$ nhỏ nhất, với $2\le x\le4$. Viết ràng buộc dưới dạng tương đương, ta có

$$
\begin{aligned}
\min_x\quad &f_0(x)=x^2+1,\\
\text{với}\quad &f_1(x)=(x-2)(x-4)\le0.
\end{aligned}
$$

Ràng buộc tương đương $x\in[2,4]$. Trên đoạn này, $f_0'(x)=2x>0$, nên nghiệm tối ưu là $x^*=2$, giá trị tối ưu $p^*=5$. Điểm $x=0$ là cực tiểu của hàm mục tiêu trên toàn trục số nhưng không khả thi.

![Hàm mục tiêu đạt giá trị nhỏ nhất trên đoạn khả thi từ 2 đến 4 tại điểm (2,5).](img/lec-03/intro-feasible.svg)

Trong ví dụ một chiều, ta biết nghiệm bằng cách đọc đồ thị. Ta vẫn xây dựng cận dưới để có một phương pháp dùng được khi không thể liệt kê hoặc vẽ toàn bộ miền khả thi.

### 2.2. Một họ hàm tạo cận dưới

Chọn $\lambda\ge0$ và đặt

$$
L(x,\lambda)=f_0(x)+\lambda f_1(x).
$$

Nếu $x$ khả thi thì $f_1(x)\le0$, nên $L(x,\lambda)\le f_0(x)$. Đây là chỗ dùng dấu không âm của $\lambda$. Bất đẳng thức này không được khẳng định cho mọi $x$ ngoài miền khả thi.

Với $\lambda=1$,

$$
L(x,1)=2x^2-6x+9=2(x-1{,}5)^2+4{,}5.
$$

Vì $L(x,1)\ge4{,}5$ với mọi $x\in\mathbb R$, nên $f_0(x)\ge4{,}5$ với mọi $x$ khả thi. Điểm đạt cực tiểu của $L(x,1)$ là $1{,}5$, nằm ngoài miền khả thi; điều đó không làm mất hiệu lực của cận dưới.

![Hàm mục tiêu và hai hàm Lagrange. Trên miền khả thi, mỗi hàm Lagrange nằm dưới hoặc bằng hàm mục tiêu.](img/lec-03/bound-family.svg)

### 2.3. Định nghĩa tổng quát và quy ước dấu

Trong tuyến chính, xét $x\in\mathbb R^n$, các hàm hữu hạn $f_i:\mathbb R^n\to\mathbb R$ với $i=0,\ldots,m$, ma trận $A\in\mathbb R^{r\times n}$ và véc-tơ $b\in\mathbb R^r$. Bài toán gốc là

$$
\min_x f_0(x)\quad\text{với } f_i(x)\le0\ (i=1,\ldots,m),\quad Ax=b.
$$

**Định nghĩa.** Hàm Lagrange là

$$
L(x,\lambda,\nu)=f_0(x)+\sum_{i=1}^{m}\lambda_i f_i(x)+\nu^T(Ax-b),
$$

trong đó $\lambda\in\mathbb R^m$, $\nu\in\mathbb R^r$. Để tạo cận dưới, lấy $\lambda_i\ge0$; $\nu$ không bị ràng buộc dấu vì $Ax-b=0$ tại điểm khả thi. Nếu ràng buộc ban đầu có dạng $h(x)\ge0$, cần viết lại $-h(x)\le0$ trước khi áp dụng quy ước này.

**Định nghĩa.** Hàm đối ngẫu là

$$
g(\lambda,\nu)=\inf_{x\in\mathbb R^n}L(x,\lambda,\nu).
$$

Ký hiệu $\inf$ chỉ cận dưới lớn nhất. Nó bằng giá trị nhỏ nhất khi giá trị đó đạt được; nếu không đạt, vẫn dùng được $\inf$. Ví dụ $\inf_{x\in\mathbb R}e^x=0$ nhưng không có $x$ hữu hạn làm $e^x=0$. Giá trị $g$ cũng có thể bằng $-\infty$; chẳng hạn $\inf_x x=-\infty$.

Khi tính $g$, ta tối ưu theo $x$ trên **toàn miền ban đầu của các hàm**, không áp lại $f_i(x)\le0$ hoặc $Ax=b$. Trong bài này, miền đó là $\mathbb R^n$. Với các hàm chỉ xác định trên miền $D$, phải thay bằng $\inf_{x\in D}$; các phát biểu Slater tổng quát cũng phải xét miền $D$.

**Mệnh đề: tính lõm của hàm đối ngẫu.** Viết $\theta=(\lambda,\nu)$, $g(\theta)=\inf_x L(x,\theta)$. Hàm $g$ lõm theo nhân tử, kể cả khi bài toán gốc không lồi.

::: proof
Chọn hai bộ nhân tử $\theta_a,\theta_b$ có giá trị $g$ hữu hạn và $\alpha\in[0,1]$. Đặt $\theta_\alpha=\alpha\theta_a+(1-\alpha)\theta_b$. Với mỗi $x$ cố định, $L$ affine theo nhân tử, nên

$$
\begin{aligned}
L(x,\theta_\alpha)&=\alpha L(x,\theta_a)+(1-\alpha)L(x,\theta_b)\\
&\ge\alpha g(\theta_a)+(1-\alpha)g(\theta_b).
\end{aligned}
$$

Bất đẳng thức dùng $L(x,\theta_a)\ge g(\theta_a)$, $L(x,\theta_b)\ge g(\theta_b)$ và trọng số không âm. Vế phải không phụ thuộc $x$, nên lấy infimum vế trái cho

$$
g(\theta_\alpha)\ge\alpha g(\theta_a)+(1-\alpha)g(\theta_b).
$$

Đây là bất đẳng thức tính lõm. Không tách infimum của tổng thành tổng các infimum bằng dấu bằng. Chứng minh không cần tính lồi theo $x$ hay điều kiện Slater. Giá trị $g$ có thể là $-\infty$ ngoài miền hữu hiệu; cách viết với hai giá trị hữu hạn tránh phép toán không xác định với vô cùng. Nguồn: Boyd và Vandenberghe (2004), mục 5.1.2, trang 216.
:::

### 2.4. Tính hàm đối ngẫu trong ví dụ

::: derivation
Xét lại bài toán $\min_x(x^2+1)$ với $(x-2)(x-4)\le0$. Với $\lambda\ge0$, thay hai hàm vào định nghĩa Lagrange, khai triển tích rồi gom hệ số:

$$
\begin{aligned}
L(x,\lambda)
&=x^2+1+\lambda(x-2)(x-4)\\
&=x^2+1+\lambda(x^2-6x+8)\\
&=(1+\lambda)x^2-6\lambda x+1+8\lambda\\
&=(1+\lambda)\left(x-\frac{3\lambda}{1+\lambda}\right)^2
  +1+8\lambda-\frac{9\lambda^2}{1+\lambda}.
\end{aligned}
$$

Ở bước cuối, thêm rồi bớt $(3\lambda/(1+\lambda))^2$ trong ngoặc sau khi tách hệ số $1+\lambda$. Ba hạng đầu tạo thành bình phương; hạng trừ còn lại, khi nhân với $1+\lambda$, là $-9\lambda^2/(1+\lambda)$.

Vì $1+\lambda>0$, cực tiểu đạt duy nhất tại

$$
x(\lambda)=\frac{3\lambda}{1+\lambda}.
$$

Do đó

$$
g(\lambda)=1+8\lambda-\frac{9\lambda^2}{1+\lambda}
=10-\lambda-\frac9{1+\lambda}.
$$

Đặc biệt, $g(0)=1$, $g(1)=4{,}5$, $g(2)=5$. Không được đồng nhất $x(\lambda)$ với nghiệm gốc: chẳng hạn $x(1)=1{,}5$ không khả thi.
:::

### 2.5. Đối ngẫu yếu và bài toán đối ngẫu

**Định lý đối ngẫu yếu.** Với mọi $x$ khả thi và mọi $(\lambda,\nu)$ có $\lambda\ge0$,

$$
g(\lambda,\nu)\le f_0(x).
$$

::: proof
Theo định nghĩa $\inf$, $g(\lambda,\nu)\le L(x,\lambda,\nu)$. Vì $x$ khả thi, các hạng $\lambda_i f_i(x)$ không dương và $\nu^T(Ax-b)=0$, nên $L(x,\lambda,\nu)\le f_0(x)$. Ghép hai bước:

$$
\underbrace{g(\lambda,\nu)\le L(x,\lambda,\nu)}_{\text{lấy cận dưới theo }x}
\le f_0(x).
$$

Chứng minh không dùng tính lồi hoặc khả vi.
:::

Mỗi bộ nhân tử hợp lệ tạo một cận dưới. **Bài toán đối ngẫu** tìm cận tốt nhất:

$$
\sup_{\lambda\ge0,\,\nu\in\mathbb R^r}g(\lambda,\nu)=d^*\le p^*,
$$

với $p^*=\inf\{f_0(x):x\text{ khả thi}\}$. Dùng $\sup$ để không giả định trước rằng đối ngẫu đạt nghiệm. Nếu đạt, có thể viết bài toán cực đại và gọi bộ nhân tử đạt giá trị đó là nghiệm đối ngẫu.

Tính lõm đã chứng minh ở trên giúp nhận dạng cấu trúc của bài toán đối ngẫu. Tính lõm không bảo đảm $g$ dễ tính, khả vi hoặc có cực đại đạt được.

Trong ví dụ,

$$
g'(\lambda)=-1+\frac9{(1+\lambda)^2},\qquad
g''(\lambda)=-\frac{18}{(1+\lambda)^3}<0.
$$

Trên $\lambda\ge0$, $g$ tăng đến $\lambda=2$ rồi giảm, nên $\lambda^*=2$ và $d^*=5$. Ta có thể kiểm tra bằng phép hoàn thành bình phương mà không cần đạo hàm:

$$
L(x,2)=3(x-2)^2+5\ge5.
$$

Với $x$ khả thi, $f_0(x)\ge L(x,2)\ge5$, còn $f_0(2)=5$. Đây là chứng nhận tối ưu.

### 2.6. Ví dụ đối ngẫu hai chiều

Xét $x=(x_1,x_2)\in\mathbb R^2$ và bài toán $\min\frac12(x_1^2+x_2^2)$ với $x_1\ge1$, $x_2\ge2$. Viết $f_1=1-x_1\le0$, $f_2=2-x_2\le0$ và gán mỗi bất đẳng thức một nhân tử $\lambda_i\ge0$.

::: derivation
$$
\begin{aligned}
L(x,\lambda)&=\frac12(x_1^2+x_2^2)+\lambda_1(1-x_1)+\lambda_2(2-x_2)\\
&=\frac12[(x_1-\lambda_1)^2+(x_2-\lambda_2)^2]+\lambda_1+2\lambda_2-\frac12(\lambda_1^2+\lambda_2^2).
\end{aligned}
$$

Lấy cực tiểu trên toàn $\mathbb R^2$ tại $x_i=\lambda_i$, ta được

$$
g(\lambda)=\lambda_1+2\lambda_2-\frac12(\lambda_1^2+\lambda_2^2)
=\frac52-\frac12[(\lambda_1-1)^2+(\lambda_2-2)^2].
$$

Bài toán đối ngẫu là cực đại hóa $g$ với $\lambda_1,\lambda_2\ge0$. Hai bình phương cho $g\le5/2$, đạt tại $\lambda^*=(1,2)$. Điểm $x=(1,2)$ thỏa hai ràng buộc và có mục tiêu $5/2$, nên $x^*=(1,2)$ và $p^*=d^*=5/2$. Chứng nhận này dùng trực tiếp đối ngẫu yếu, không cần áp dụng Slater.
:::

## 3. Đối ngẫu mạnh và điều kiện Slater

### 3.1. Cận khít và khoảng đối ngẫu

Khi $p^*,d^*$ hữu hạn, $p^*-d^*\ge0$ là khoảng đối ngẫu tối ưu. **Đối ngẫu mạnh** nghĩa là $d^*=p^*$. Ví dụ của bài có $d^*=p^*=5$.

Phân biệt khoảng đối ngẫu tối ưu với khoảng của một cặp cụ thể. Dùng $x=2,\lambda=1$ cho khoảng $f_0(2)-g(1)=0{,}5$ dù khoảng đối ngẫu tối ưu bằng $0$. Tổng quát, $f_0(x)-g(\lambda,\nu)$ chặn trên sai số tối ưu $f_0(x)-p^*$ của nghiệm khả thi $x$.

### 3.2. Điều kiện Slater trong trường hợp toàn không gian

**Trực quan.** Trong ví dụ $f_1(x)=(x-3)^2-1\le0$, điểm $\bar x=3$ không chỉ thỏa ràng buộc mà còn có khoảng dư: $f_1(3)=-1<0$. Cả đoạn $[2{,}5;3{,}5]$ quanh điểm này vẫn thỏa nghiêm vì $|x-3|\le0{,}5$ kéo theo $f_1(x)\le-0{,}75<0$. Nghiệm tối ưu $x^*=2$ nằm trên biên vẫn hoàn toàn phù hợp với Slater.

![Điểm Slater 3 bên trong miền [2,4], một lân cận quanh 3 thỏa nghiêm, nghiệm tối ưu 2 ở biên.](img/lec-03/slater-interior.svg)

Với các hàm lồi hữu hạn trên toàn không gian, tính liên tục bảo đảm quanh một điểm thỏa nghiêm tất cả bất đẳng thức có một lân cận nhỏ vẫn thỏa nghiêm. Nếu có đẳng thức $Ax=b$, chỉ xét các dịch chuyển nằm trong tập thỏa đẳng thức. Đây là trực quan cho giả thiết, không phải chứng minh đối ngẫu mạnh hay yêu cầu nghiệm tối ưu nằm trong miền. Hình tự vẽ từ ví dụ; căn cứ: Boyd và Vandenberghe (2004), mục 5.2.3, trang 226–227.

**Giả thiết:** $f_0,\ldots,f_m$ lồi và hữu hạn trên $\mathbb R^n$; các ràng buộc đẳng thức là $Ax=b$.

**Điều kiện Slater:** tồn tại **cùng một điểm** $\bar x\in\mathbb R^n$ sao cho

$$
f_i(\bar x)<0\quad(i=1,\ldots,m),\qquad A\bar x=b.
$$

Điểm này gọi là điểm khả thi nghiêm đối với các bất đẳng thức. Đẳng thức vẫn phải được thỏa đúng, không thay bằng một bất đẳng thức nghiêm.

**Định lý Slater.** Với các giả thiết trên, nếu Slater thỏa và $p^*$ hữu hạn, thì đối ngẫu mạnh đúng và tồn tại nghiệm đối ngẫu đạt $d^*=p^*$.

Đây là điều kiện đủ; không thỏa Slater không cho phép kết luận rằng đối ngẫu mạnh sai. Định lý cũng không tự bảo đảm bài toán gốc đạt nghiệm. Ví dụ $\min_{x\in\mathbb R}e^x$ có giá trị tối ưu $0$ nhưng không đạt; có thể thêm ràng buộc luôn nghiêm $-1\le0$ mà vẫn giữ hiện tượng này.

Trực quan, điểm khả thi nghiêm tạo khoảng dư cho các bất đẳng thức. Trong hình học phân tách dùng để chứng minh định lý, khoảng dư ngăn hệ số của mục tiêu bị triệt tiêu, nhờ đó có thể chuẩn hóa thành các nhân tử hữu hạn. Chứng minh đầy đủ ở Boyd–Vandenberghe, §5.3.2; không cần kỹ thuật này để vận dụng bản định lý vừa nêu.

::: proof
**Ý tưởng.** Tách tập các mức đạt được khỏi các mức mục tiêu thấp hơn $p^*$. Điểm Slater bảo đảm có thể chuẩn hóa siêu phẳng tách thành các nhân tử Lagrange.

**Chuẩn bị.** Các hàm $f_0,\ldots,f_m$ lồi, hữu hạn trên $\mathbb R^n$; $p^*$ hữu hạn. Vì điểm Slater thỏa $Ax=b$, hệ đẳng thức nhất quán. Giữ một tập hàng độc lập của $A$ và các phần tử tương ứng của $b$: các hàng bỏ đi là tổ hợp tuyến tính của các hàng giữ lại, với cùng tổ hợp ở vế phải. Miền khả thi không đổi. Tiếp tục gọi hệ rút gọn là $Ax=b$, với $A$ đủ hạng hàng. Nếu không có đẳng thức, bỏ các đại lượng $v,\beta,\nu$ dưới đây.

**1. Tách hai tập lồi.** Đặt $f(x)=(f_1(x),\ldots,f_m(x))\in\mathbb R^m$, và giả sử hệ rút gọn có $r$ hàng. Xét

$$C=\{(u,v,t)\in\mathbb R^m\times\mathbb R^r\times\mathbb R:\exists x,\ f(x)\le u,\ Ax-b=v,\ f_0(x)\le t\},$$

$$B=\{(0,0,t):t<p^*\}.$$

Tập $C$ lồi: lấy hai bộ có các điểm chứng $x_1,x_2$, tổ hợp lồi của hai điểm chứng thỏa các bất đẳng thức nhờ tính lồi của $f_i$, và thỏa đẳng thức nhờ tính affine của $Ax-b$. Tập $B$ lồi. Hai tập không giao nhau, vì một điểm chung sẽ cho điểm khả thi có mục tiêu nhỏ hơn $p^*$. Đây là lập luận dùng giá trị infimum, không cần nghiệm gốc đạt được.

Dùng định lý tách hai tập lồi không giao nhau: tồn tại $(a,\beta,\mu)\ne0$ và $c\in\mathbb R$ sao cho

$$a^Tu+\beta^Tv+\mu t\ge c\quad ((u,v,t)\in C),\qquad \mu t\le c\quad(t<p^*).$$

Vì có thể tăng tùy ý từng tọa độ $u_i$ và $t$ trong $C$, ta phải có $a\ge0,\mu\ge0$. Cho $t\uparrow p^*$ trong bất đẳng thức trên $B$ được $c\ge\mu p^*$. Do $(f(x),Ax-b,f_0(x))\in C$, suy ra

$$a^Tf(x)+\beta^T(Ax-b)+\mu f_0(x)\ge\mu p^*\qquad\forall x\in\mathbb R^n.$$

**2. Điểm dùng Slater: $\mu>0$.** Giả sử $\mu=0$. Thay điểm Slater $\bar x$ vào bất đẳng thức tách cho $a^Tf(\bar x)\ge0$. Vì mọi $f_i(\bar x)<0$ và $a\ge0$, điều này buộc $a=0$. Khi đó $\beta^T(Ax-b)\ge0$ với mọi $x$. Nếu $A^T\beta\ne0$, chọn $x=-sA^T\beta$, $s\to+\infty$, làm vế trái tiến tới $-\infty$. Vậy $A^T\beta=0$. Do $A$ đủ hạng hàng, suy ra $\beta=0$, mâu thuẫn với $(a,\beta,\mu)\ne0$.

**3. Chuẩn hóa và lấy infimum.** Đặt $\lambda=a/\mu\ge0$, $\nu=\beta/\mu$. Chia bất đẳng thức tách cho $\mu>0$, được $L(x,\lambda,\nu)\ge p^*$ với mọi $x$. Lấy infimum theo $x$, rồi dùng đối ngẫu yếu:

$$p^*\le g(\lambda,\nu)\le d^*\le p^*.$$

Vậy $d^*=p^*$ và bộ nhân tử này đạt nghiệm đối ngẫu. Với hệ đẳng thức ban đầu, đặt nhân tử của các hàng đã bỏ bằng $0$ để giữ nguyên hàm Lagrange. Chứng minh không khẳng định bài toán gốc đạt nghiệm.

Nguồn: Boyd và Vandenberghe (2004), mục 2.5.1 (định lý tách) và mục 5.3.2, trang 235–236 (chứng minh Slater). Định lý tách được dùng như một bổ đề; chứng minh bổ đề không thuộc phạm vi bài này.
:::

### 3.3. Kiểm tra trên ví dụ

Ta có $f_0''(x)=2>0$, $f_1''(x)=2>0$, nên hai hàm lồi. Chọn $\bar x=3$: $f_1(3)=-1<0$. Hơn nữa $p^*=5$ hữu hạn. Slater bảo đảm cận khít và nhân tử tối ưu tồn tại; phép tính trước đã tìm được $\lambda^*=2$.

Điểm Slater $\bar x=3$ có mục tiêu $10$, khác nghiệm tối ưu $x^*=2$ có mục tiêu $5$. Không cần và thường không nên tìm điểm Slater ngay trên biên tối ưu.

### 3.4. Trường hợp biên: đối ngẫu mạnh nhưng không có nhân tử tối ưu

::: example
Xét $\min_x x$ với $x^2\le0$. Tập khả thi chỉ có $x=0$, nên $p^*=0$, nhưng không có điểm thỏa $x^2<0$.

Với $\lambda>0$,

$$
L(x,\lambda)=x+\lambda x^2
=\lambda\left(x+\frac1{2\lambda}\right)^2-\frac1{4\lambda},
\qquad g(\lambda)=-\frac1{4\lambda}.
$$

Với $\lambda=0$, $g(0)=\inf_x x=-\infty$. Do đó $\sup_{\lambda\ge0}g(\lambda)=0=p^*$ khi $\lambda\to+\infty$, nhưng không có $\lambda$ hữu hạn đạt $0$. Ví dụ phân biệt ba mệnh đề: Slater thỏa; đối ngẫu mạnh đúng; đối ngẫu đạt nghiệm.
:::

## 4. Hình học của đối ngẫu

Ở phần trước, ta đã tính cận dưới $g(\lambda)$ và biết khi nào cận tốt nhất bằng giá trị tối ưu. Phần này biểu diễn **quyết định khả thi và cận dưới trong cùng một hình**: nhân tử quyết định độ dốc của đường cận, còn giá trị đối ngẫu là tung độ cắt.

Xét lại bài toán $\min_x(x^2+1)$ với $f_1(x)=(x-2)(x-4)\le0$. Đồ thị theo $x$ giúp đọc nghiệm trong ví dụ một chiều. Để nhìn trực tiếp hàm Lagrange $L=f_0+\lambda f_1$, ta ghi lại đúng hai giá trị xuất hiện trong biểu thức này: giá trị ràng buộc và giá trị mục tiêu. Dấu của giá trị ràng buộc cho biết một quyết định có hợp lệ hay không; giá trị mục tiêu cho biết chi phí của quyết định đó.

Đặt $u=f_1(x)$ và $t=f_0(x)$. Mỗi quyết định $x$ tạo một điểm trong mặt phẳng **giá trị ràng buộc–giá trị mục tiêu**, khác với mặt phẳng $x$–$f_0(x)$ trước đó. Các đại lượng của ví dụ không có đơn vị vật lý.

| $x$ | $u=f_1(x)$ | $t=f_0(x)$ | Khả thi |
|---|---|---|---|
| $0$ | $8$ | $1$ | Không |
| $2$ | $0$ | $5$ | Có |
| $3$ | $-1$ | $10$ | Có |
| $4$ | $0$ | $17$ | Có |

Chẳng hạn, $x=2$ cho $u=(2-2)(2-4)=0$ và $t=2^2+1=5$, nên được biểu diễn bằng điểm $(0,5)$. Điểm này nằm trên trục tung vì ràng buộc đạt dấu bằng. Với $x=3$, cặp giá trị là $(-1,10)$: điểm nằm bên trái trục tung vì thỏa nghiêm ràng buộc.

![Tập giá trị G với các điểm ứng với x bằng 0, 2, 3, 4; phần G bên trái và trên trục tung ứng với quyết định khả thi.](img/lec-03/value-plane-mapping.svg)

Gọi $G=\{(f_1(x),f_0(x)):x\in\mathbb R\}$. Miền quyết định khả thi tương ứng với phần của $G$ có $u\le0$. Không được suy ra $G$ lồi chỉ từ việc bài toán gốc lồi.

Giữ $\lambda\ge0$ cố định. Trên mỗi điểm $(u,t)\in G$, giá trị Lagrange là $L=t+\lambda u$. Vì $g(\lambda)$ là cận dưới lớn nhất của các giá trị này khi $x$ chạy trên toàn $\mathbb R$, mọi điểm của $G$ thỏa

$$
t+\lambda u\ge g(\lambda),\quad\text{tức }t\ge g(\lambda)-\lambda u.
$$

Xét các đường song song $t=c-\lambda u$. Với $c$ đủ thấp, đường nằm dưới toàn bộ $G$. Tăng $c$ cho đến mức lớn nhất vẫn giữ tính chất đó cho $c=g(\lambda)$, khi giá trị này hữu hạn. Đường chỉ có điểm chạm khi cận dưới đạt được; không giả định điều này cho mọi bài toán.

Đường cận có hệ số góc $-\lambda$, tung độ cắt $g(\lambda)$. Với $u\le0$ và $\lambda\ge0$, đường này nằm ở mức ít nhất $g(\lambda)$, giải thích cận dưới đối với các quyết định khả thi.

Với $\lambda=1$, đường cận là $t=4{,}5-u$ và chạm $G$ tại $x=1{,}5$, tức $(u,t)=(1{,}25;3{,}25)$. Điểm chạm không khả thi, nên sự tiếp xúc riêng lẻ chưa chứng nhận nghiệm gốc.

![Đường cận với nhân tử 1 chạm tập giá trị tại một điểm có u dương, nằm ngoài miền khả thi.](img/lec-03/value-plane-1.svg)

Với $\lambda=2$, đường cận là $t=5-2u$ và chạm tại $(0,5)$, tương ứng $x=2$ khả thi. Ta có đẳng thức kiểm tra được

$$
t+2u-5=3(x-2)^2\ge0.
$$

Tung độ cắt bằng giá trị mục tiêu tại điểm chạm khả thi, nên $g(2)=f_0(2)=5$. Đây là hình học của chứng nhận đã tính bằng đại số.

![Đường cận với nhân tử 2 chạm tại (0,5), cho cận dưới bằng giá trị tối ưu.](img/lec-03/value-plane-2.svg)

## 5. Điều kiện Karush–Kuhn–Tucker

### 5.1. Nhu cầu và trực giác

Tính $g$ tường minh có thể khó trong nhiều chiều. Nếu có cận khít, ta tìm trực tiếp những điều kiện làm hai bất đẳng thức $g\le L\le f_0$ trở thành đẳng thức.

Đẳng thức thứ nhất đòi hỏi $x^*$ cực tiểu hóa $L$ theo $x$. Với hàm khả vi trên toàn không gian, điều kiện cần là $\nabla_xL=0$. Đẳng thức thứ hai đòi hỏi $\sum_i\lambda_i f_i(x^*)=0$. Vì từng hạng không dương, mỗi hạng phải bằng không.

Trong ví dụ tại $x=2$, $f_0'(2)=4$ và $2f_1'(2)=-4$: hai đóng góp gradient cân bằng. Gradient mục tiêu riêng lẻ không bằng không vì nghiệm nằm trên biên ràng buộc.

### 5.2. Bốn nhóm điều kiện

Giả sử các $f_i$ khả vi trên $\mathbb R^n$, với kích thước và dạng bài toán như mục 2.3. Một bộ $(x^*,\lambda^*,\nu^*)$ thỏa KKT khi

| Nhóm | Điều kiện | Vai trò |
|---|---|---|
| Khả thi gốc | $f_i(x^*)\le0$, $Ax^*=b$ | Quyết định được phép |
| Khả thi đối ngẫu | $\lambda_i^*\ge0$ | Dấu tạo cận dưới |
| Bù trừ | $\lambda_i^*f_i(x^*)=0$ | Không mất cận tại ràng buộc |
| Dừng | $\nabla f_0(x^*)+\sum_i\lambda_i^*\nabla f_i(x^*)+A^T\nu^*=0$ | Cân bằng gradient |

Ràng buộc **hoạt động** khi $f_i(x^*)=0$, **không hoạt động** khi $f_i(x^*)<0$. Bù trừ cho biết không hoạt động thì nhân tử bằng không, còn nhân tử dương thì ràng buộc hoạt động. Chiều “hoạt động thì nhân tử dương” sai: bài $\min x^2$ với $x\le0$ có $x^*=0$, $\lambda^*=0$, thỏa dừng $2x+\lambda=0$.

### 5.3. Giải ví dụ bằng KKT

Hai điều kiện đẳng thức là

$$
2x+\lambda(2x-6)=0,\qquad \lambda(x-2)(x-4)=0.
$$

Từ bù trừ, xét $\lambda=0$ hoặc $x=2$ hoặc $x=4$:

| Trường hợp | Nghiệm của điều kiện dừng | Kiểm tra |
|---|---|---|
| $\lambda=0$ | $x=0$ | Không khả thi |
| $x=2$ | $\lambda=2$ | Thỏa cả bốn nhóm |
| $x=4$ | $\lambda=-4$ | Vi phạm $\lambda\ge0$ |

Do đó bộ hợp lệ là $(x^*,\lambda^*)=(2,2)$. Không được chỉ giải phương trình dừng rồi bỏ qua các điều kiện dấu và khả thi.

### 5.4. Tính cần và tính đủ

**Định lý về tính đủ.** Nếu $f_0,\ldots,f_m$ lồi, khả vi trên $\mathbb R^n$, và một bộ thỏa KKT, thì $x^*$ là nghiệm tối ưu toàn cục. Không cần thêm Slater cho chiều này.

::: proof
Do $\lambda^*\ge0$, $L(\cdot,\lambda^*,\nu^*)$ là hàm lồi. Điều kiện dừng làm $x^*$ cực tiểu hóa hàm này trên toàn không gian, nên $g(\lambda^*,\nu^*)=L(x^*,\lambda^*,\nu^*)$. Khả thi và bù trừ cho $L(x^*,\lambda^*,\nu^*)=f_0(x^*)$. Đối ngẫu yếu cho

$$
f_0(x^*)=g(\lambda^*,\nu^*)\le p^*\le f_0(x^*).
$$

Mọi dấu đều là đẳng thức, nên bộ nhân tử cũng tối ưu đối ngẫu.
:::

**Tính cần trong lớp bài toán đang học.** Nếu bài toán lồi, khả vi, thỏa Slater và có nghiệm tối ưu $x^*$, thì tồn tại các nhân tử để KKT thỏa tại $x^*$. Slater cung cấp đối ngẫu mạnh và nghiệm đối ngẫu; chuỗi cận khít dẫn tới bù trừ và điều kiện dừng.

Ngoài lớp bài toán này, tính cần phải dựa vào điều kiện chính quy thích hợp. Trong ví dụ $\min x$ với $x^2\le0$, nghiệm gốc $0$ tồn tại nhưng phương trình dừng $1+2\lambda\cdot0=0$ vô nghiệm. Ngược lại, với bài phi lồi $\min -x^2$ trên $[-1,1]$, điểm $0$ và hai nhân tử bằng không thỏa KKT nhưng $0$ là cực đại, không phải cực tiểu.

::: example
**Nghiệm tối ưu không thỏa KKT.** Với $\min x$ và $x^2\le0$, miền khả thi chỉ có $x=0$, nên $x^*=0$. Hàm Lagrange $L=x+\lambda x^2$ cho điều kiện dừng $1+2\lambda x=0$. Tại $x^*=0$, vế trái luôn bằng $1$: không có nhân tử hữu hạn thỏa KKT dù nghiệm tối ưu tồn tại. Bài toán lồi nhưng không có điểm Slater. Thiếu Slater không đồng nghĩa mọi bài đều không có KKT: nếu đổi mục tiêu thành $x^2$, cùng ràng buộc này có cặp KKT $(x,\lambda)=(0,0)$.
:::

### 5.5. Hồi quy có ràng buộc

Cho $X\in\mathbb R^{N\times d}$ chứa dữ liệu, $y\in\mathbb R^N$ chứa giá trị cần dự đoán, $w\in\mathbb R^d$ là trọng số và $\tau>0$ là giới hạn bình phương chuẩn. Xét

$$
\min_w\frac12\|Xw-y\|_2^2\quad\text{với }\|w\|_2^2\le\tau.
$$

Mục tiêu đo sai số khớp dữ liệu; ràng buộc giới hạn độ lớn của trọng số. Bài toán lồi, $w=0$ thỏa Slater. KKT là

$$
\begin{gathered}
\|w\|_2^2\le\tau,\qquad\lambda\ge0,\qquad
\lambda(\|w\|_2^2-\tau)=0,\\
X^T(Xw-y)+2\lambda w=0.
\end{gathered}
$$

**Giải hệ KKT.** Điều kiện dừng tương đương

$$
(X^TX+2\lambda I)w=X^Ty,
$$

trong đó $I$ là ma trận đơn vị $d\times d$. Chọn $w_0$ là nghiệm bình phương tối thiểu không ràng buộc có chuẩn nhỏ nhất. Đây là tên một nghiệm, không phải véc-tơ không.

- Nếu $\|w_0\|^2\le\tau$, chọn $w^*=w_0$, $\lambda^*=0$. Trường hợp bằng vẫn có thể có ràng buộc hoạt động với nhân tử bằng không.
- Nếu $\|w_0\|^2>\tau$, không có nghiệm khả thi của hệ dừng với $\lambda=0$. Vì vậy $\lambda^*>0$ và bù trừ buộc $\|w^*\|^2=\tau$. Khi đó

$$
w(\lambda)=(X^TX+2\lambda I)^{-1}X^Ty,\qquad
\|w(\lambda^*)\|^2=\tau.
$$

Với $\lambda>0$, ma trận luôn xác định dương, kể cả khi $X$ thiếu hạng. Trong tính toán, giải hệ tuyến tính thay vì lập ma trận nghịch đảo. Trong nhánh thứ hai, hàm $h(\lambda)=\|w(\lambda)\|^2$ liên tục, giảm nghiêm từ $\|w_0\|^2$ khi $\lambda\downarrow0$ về $0$ khi $\lambda\to\infty$. Do đó phương trình $h(\lambda)=\tau$ có một nghiệm dương duy nhất. Có thể tìm bằng chia đôi: bắt đầu một cận trên dương, nhân đôi đến khi $h$ không vượt $\tau$, rồi thu hẹp khoảng dựa vào dấu $h-\tau$. Dừng theo dung sai của khoảng nhân tử và kiểm tra lại phần dư KKT; mỗi bước chính là một lần giải hệ tuyến tính. Chia đôi thu hẹp khoảng còn một nửa mỗi bước. Không cần giới thiệu phép nghịch đảo giả để thực hiện ví dụ dưới đây.

::: example
**Hồi quy hai trọng số.** Chọn $X=I_2$, $y=(3,4)^T$, $\tau=1$:

$$
\min_w\frac12[(w_1-3)^2+(w_2-4)^2]\quad\text{với }w_1^2+w_2^2\le1.
$$

Nghiệm không ràng buộc $w_0=y$ có bình phương chuẩn $25>1$, nên $\lambda^*>0$. Dừng cho $w=y/(1+2\lambda)$. Bù trừ buộc

$$
\frac{25}{(1+2\lambda)^2}=1\quad\Longrightarrow\quad1+2\lambda=5\quad\Longrightarrow\quad\lambda^*=2.
$$

Chọn căn dương vì $\lambda\ge0$. Vậy $w^*=(3/5,4/5)^T$. Kiểm tra: $\|w^*\|^2=1$ (khả thi gốc), $\lambda^*=2\ge0$ (khả thi đối ngẫu), $2(1-1)=0$ (bù trừ), $5w^*-y=0$ (dừng). Bài toán lồi nên KKT chứng nhận tối ưu. Mất mát bằng

$$
\frac12\left[\left(-\frac{12}{5}\right)^2+\left(-\frac{16}{5}\right)^2\right]=8.
$$
:::

Ví dụ một trọng số: $\min_w\tfrac12(w-3)^2$ với $w^2\le1$. Nghiệm khả thi gần $3$ nhất là $w^*=1$. Dừng $w-3+2\lambda w=0$ cho $\lambda^*=1$. Bù trừ và hai điều kiện khả thi đều đúng, nên mất mát tối ưu bằng $2$.

## 6. Tổng hợp và vận dụng

Khi giải một bài toán mới, trước hết đưa bất đẳng thức về dạng $f_i\le0$ và ghi miền biến. Tính lồi quyết định chiều “KKT suy ra tối ưu”. Một điểm Slater kiểm tra được giúp bảo đảm chiều ngược lại khi nghiệm gốc tồn tại. Từ đó, ta có thể tính $g$ để tạo cận hoặc giải trực tiếp KKT, nhưng vẫn phải kiểm tra đầy đủ tính khả thi, dấu nhân tử và bù trừ.

Tự kiểm tra bằng cách giải bài $\min(x_1^2+x_2^2)$ với $x_1+x_2\ge1$ mà không xem lời giải. Bạn cần tạo được cận $1/2$, tìm nghiệm $(1/2,1/2)$, giải thích vì sao điểm Slater $(1,1)$ không phải nghiệm tối ưu, và xác nhận cùng một nhân tử vừa thỏa KKT vừa tạo cận khít. Các bài giao và lời giải nằm ở tài liệu **Bài tập Bài 03**.

### Tài liệu đọc

- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, chương 5: §5.1 hàm đối ngẫu, §5.2 bài toán đối ngẫu và Slater, §5.3 hình học, §5.5 điều kiện tối ưu. [Giáo trình và bản PDF chính thức](https://web.stanford.edu/~boyd/cvxbook/).
- MIT OpenCourseWare, *6.079 Introduction to Convex Optimization*, Fall 2009, bài 5 về đối ngẫu; giảng viên Stephen Boyd và Pablo Parrilo. [Trang tài nguyên chính thức](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/resources/mit6_079f09_lec05/). Dùng cho thứ tự khái niệm; các hình trong bài này được tự vẽ từ công thức, không cắt ảnh nguồn.

Nội dung đọc mở rộng sau khi hoàn thành tuyến chính: Slater trên nội tương đối của miền xác định (§5.2.3), điểm yên ngựa (§5.4), và bất đẳng thức tổng quát theo nón (§5.9). Những phần này mở rộng phạm vi áp dụng; chúng không phải tiên quyết cho các bài tập cơ bản ở đây.
