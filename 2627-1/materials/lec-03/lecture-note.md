# Bài 03 — Đối ngẫu Lagrange, điều kiện Slater và điều kiện KKT

## 1. Mở đầu: chứng nhận một nghiệm tối ưu

Trong bài toán cực tiểu có ràng buộc, ta tìm giá trị nhỏ nhất của hàm mục tiêu trong các điểm thỏa mọi ràng buộc. Những điểm này được gọi là **điểm khả thi**. Một thuật toán tìm được điểm khả thi có giá trị mục tiêu bằng $5$ chưa đủ để kết luận không còn nghiệm tốt hơn. Với bài toán cực tiểu, nghiệm khả thi cho **cận trên** của giá trị tối ưu. Nếu xây dựng được một **cận dưới** cũng bằng $5$, ta đã chứng nhận tối ưu mà không phải thử mọi nghiệm khả thi.

Bài này phát triển ba công cụ liên quan: đối ngẫu Lagrange tạo cận dưới; điều kiện Slater bảo đảm cận tốt nhất bằng giá trị tối ưu trong một lớp bài toán lồi; điều kiện Karush–Kuhn–Tucker (KKT) biến chứng nhận ấy thành một hệ điều kiện có thể kiểm tra và giải. Cuối bài, nhân tử Lagrange được dùng để diễn giải ảnh hưởng của việc nới ràng buộc.

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

Hàm $g$ luôn lõm theo các nhân tử: với $x$ cố định, $L$ là hàm affine theo $(\lambda,\nu)$; cận dưới của họ hàm affine là hàm lõm. Cụ thể, với hai bộ nhân tử $z_1,z_2$ và $0\le\theta\le1$,

$$
\inf_x[\theta L(x,z_1)+(1-\theta)L(x,z_2)]
\ge\theta\inf_xL(x,z_1)+(1-\theta)\inf_xL(x,z_2).
$$

Tính lõm không bảo đảm $g$ dễ tính, khả vi hoặc có cực đại đạt được.

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

Đặt $u=f_1(x)$ và $t=f_0(x)$. Mỗi quyết định $x$ tạo một điểm trong mặt phẳng **giá trị ràng buộc–giá trị mục tiêu**, khác với mặt phẳng $x$–$f_0(x)$ trước đó. Các đại lượng của ví dụ không có đơn vị vật lý.

| $x$ | $u=f_1(x)$ | $t=f_0(x)$ | Khả thi |
|---|---|---|---|
| $0$ | $8$ | $1$ | Không |
| $2$ | $0$ | $5$ | Có |
| $3$ | $-1$ | $10$ | Có |
| $4$ | $0$ | $17$ | Có |

Gọi $G=\{(f_1(x),f_0(x)):x\in\mathbb R\}$. Miền quyết định khả thi tương ứng với phần của $G$ có $u\le0$. Không được suy ra $G$ lồi chỉ từ việc bài toán gốc lồi.

Theo định nghĩa hàm đối ngẫu, mọi điểm của $G$ thỏa

$$
t+\lambda u\ge g(\lambda),\quad\text{tức }t\ge g(\lambda)-\lambda u.
$$

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

Điều kiện dừng tương đương $(X^TX+2\lambda I)w=X^Ty$, trong đó $I$ là ma trận đơn vị $d\times d$. Khi $\lambda>0$, ma trận vế trái xác định dương; khi $\lambda=0$, không được giả định nó khả nghịch nếu chưa biết hạng của $X$. Ta không khẳng định nghiệm duy nhất cho mọi $X$.

Ví dụ một trọng số: $\min_w\tfrac12(w-3)^2$ với $w^2\le1$. Nghiệm khả thi gần $3$ nhất là $w^*=1$. Dừng $w-3+2\lambda w=0$ cho $\lambda^*=1$. Bù trừ và hai điều kiện khả thi đều đúng, nên mất mát tối ưu bằng $2$.

## 6. Nhân tử và độ nhạy

### 6.1. Nới ràng buộc trong ví dụ

Thay $f_1(x)\le0$ bằng $f_1(x)\le u$, trong đó $u$ là mức thay đổi vế phải; $u>0$ nghĩa là nới. Ký hiệu $p(u)$ là giá trị tối ưu của bài toán mới, không phải vị trí nghiệm $x^*(u)$.

Ràng buộc tương đương $(x-3)^2\le1+u$. Nếu $u<-1$, không có nghiệm khả thi; quy ước $p(u)=+\infty$. Với $-1\le u\le8$, đầu trái của đoạn khả thi không âm, nên

$$
x^*(u)=3-\sqrt{1+u},\qquad
p(u)=(3-\sqrt{1+u})^2+1=11+u-6\sqrt{1+u}.
$$

Với $u\ge8$, đoạn khả thi chứa $0$, nên $x^*(u)=0$, $p(u)=1$. Gần $u=0$,

$$
p'(u)=1-\frac3{\sqrt{1+u}},\qquad p'(0)=-2=-\lambda^*.
$$

Như vậy, nhân tử $2$ cho biết tăng vế phải một lượng nhỏ $\varepsilon$ làm giá trị tối ưu giảm xấp xỉ $2\varepsilon$.

![Hàm giá trị chính xác và đường tiếp tuyến 5 trừ 2u tại u bằng 0. Sai lệch tăng khi đi xa điểm tiếp xúc.](img/lec-03/value-sensitivity.svg)

### 6.2. Cận toàn cục và xấp xỉ cục bộ

Với một ràng buộc $f_1(x)\le u$, đặt $p(u)=\inf\{f_0(x):f_1(x)\le u\}$. Giả sử tại $u=0$ có đối ngẫu mạnh, $p(0)$ hữu hạn và nhân tử tối ưu $\lambda^*$ tồn tại. Với mọi $x$ khả thi cho bài nhiễu,

$$
p(0)=g(\lambda^*)\le f_0(x)+\lambda^*f_1(x)
\le f_0(x)+\lambda^*u.
$$

Lấy cận dưới theo các $x$ đó cho **cận toàn cục**

$$
p(u)\ge p(0)-\lambda^*u.
$$

Nếu $p$ khả vi tại $0$ thì đường affine này tiếp xúc với $p$ và

$$
p'(0)=-\lambda^*,\qquad
p(\varepsilon)=p(0)-\lambda^*\varepsilon+o(|\varepsilon|).
$$

Ký hiệu $o(|\varepsilon|)$ là sai số mà tỷ số với $|\varepsilon|$ tiến về $0$ khi $\varepsilon\to0$. Khi chỉ cần ước lượng, viết $p(\varepsilon)\approx p(0)-\lambda^*\varepsilon$. Công thức đạo hàm đòi hỏi khả vi của **hàm giá trị**, không chỉ khả vi của các hàm trong bài toán.

Trong ví dụ, $p(0{,}1)\approx4{,}8$, giá trị đúng xấp xỉ $4{,}80715$. Với $u=1$, xấp xỉ tuyến tính cho $3$, trong khi giá trị đúng là $12-6\sqrt2\approx3{,}51472$. Cận $p(u)\ge5-2u$ vẫn đúng ở cả hai điểm, nhưng độ chính xác của xấp xỉ thay đổi.

### 6.3. Diễn giải trong hồi quy

Với ví dụ một trọng số ở trên, gọi $v(\tau)$ là mất mát tối ưu khi $w^2\le\tau$. Với $0<\tau<9$,

$$
w^*(\tau)=\sqrt\tau,\quad
v(\tau)=\frac12(3-\sqrt\tau)^2,\quad
v'(\tau)=-\frac{3-\sqrt\tau}{2\sqrt\tau}.
$$

Tại $\tau=1$, $v(1)=2$ và $v'(1)=-1=-\lambda^*$. Nới giới hạn từ $1$ lên $1{,}1$ cho dự đoán mất mát xấp xỉ $1{,}9$. Giá trị đúng là $\tfrac12(3-\sqrt{1{,}1})^2\approx1{,}90357$. Đây là thay đổi mất mát tối ưu, không phải thay đổi của trọng số.

## 7. Tổng hợp và vận dụng

Khi giải một bài toán mới, trước hết đưa bất đẳng thức về dạng $f_i\le0$ và ghi miền biến. Tính lồi quyết định chiều “KKT suy ra tối ưu”. Một điểm Slater kiểm tra được giúp bảo đảm chiều ngược lại khi nghiệm gốc tồn tại. Từ đó, ta có thể tính $g$ để tạo cận hoặc giải trực tiếp KKT, nhưng vẫn phải kiểm tra đầy đủ tính khả thi, dấu nhân tử và bù trừ. Muốn diễn giải đạo hàm bằng nhân tử, cần bổ sung giả thiết về hàm giá trị.

Tự kiểm tra bằng cách giải bài $\min(x_1^2+x_2^2)$ với $x_1+x_2\ge1$ mà không xem lời giải. Bạn cần tạo được cận $1/2$, tìm nghiệm $(1/2,1/2)$, giải thích vì sao điểm Slater $(1,1)$ không phải nghiệm tối ưu, và xác nhận cùng một nhân tử $\lambda=1$ vừa xuất hiện trong KKT vừa tạo cận khít. Các bài giao và lời giải nằm ở tài liệu **Bài tập Bài 03**.

### Tài liệu đọc

- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, chương 5: §5.1 hàm đối ngẫu, §5.2 bài toán đối ngẫu và Slater, §5.3 hình học, §5.5 điều kiện tối ưu, §5.6 độ nhạy. [Giáo trình và bản PDF chính thức](https://web.stanford.edu/~boyd/cvxbook/).
- MIT OpenCourseWare, *6.079 Introduction to Convex Optimization*, Fall 2009, bài 5 về đối ngẫu; giảng viên Stephen Boyd và Pablo Parrilo. [Trang tài nguyên chính thức](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/resources/mit6_079f09_lec05/). Dùng cho thứ tự khái niệm; các hình trong bài này được tự vẽ từ công thức, không cắt ảnh nguồn.

Nội dung đọc mở rộng sau khi hoàn thành tuyến chính: Slater trên nội tương đối của miền xác định (§5.2.3), cách chứng minh bằng phân tách (§5.3.2), điểm yên ngựa (§5.4), và bất đẳng thức tổng quát theo nón (§5.9). Những phần này mở rộng phạm vi áp dụng; chúng không phải tiên quyết cho các bài tập cơ bản ở đây.
