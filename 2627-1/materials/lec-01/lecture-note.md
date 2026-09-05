# Bài 01: Giới thiệu tối ưu, tập lồi và hàm lồi

## 1. Mục tiêu và vấn đề trung tâm

Bài học đi từ ba nhu cầu cụ thể đến công cụ toán học dùng để chứng nhận mô hình. Sau khi học, sinh viên cần:

1. tách dữ kiện, biến quyết định, hàm mục tiêu và miền khả thi;
2. lập mô hình điều khiển một bước, hồi quy tuyến tính và hồi quy logistic;
3. kiểm tra tính lồi của miền và mục tiêu;
4. phân biệt bảo đảm toàn cục, sự tồn tại và tính duy nhất của nghiệm.

Vấn đề trung tâm là: từ một nhu cầu cụ thể, xây dựng mô hình tối ưu thế nào, và cần giả thiết nào để kết luận đúng về nghiệm?

Kiến thức dùng trong bài gồm đạo hàm một và nhiều biến, ma trận, hạng, không gian không, hình chiếu trực giao, chuẩn Euclid, hàm mũ và logarit.

::: example
Ba từ “tốt nhất” có thể chỉ ba đối tượng khác nhau:

- một điểm khả thi có giá trị tốt hơn các điểm đã thử;
- cận dưới $p^*=\inf_{x\in C}f_0(x)$;
- một nghiệm $x^*\in C$ đạt $f_0(x^*)=p^*$.

Ca logistic ở Mục 4 có cận dưới hữu hạn nhưng không có nghiệm hữu hạn.
:::

## 2. Điều khiển một bước

### 2.1. Từ động lực đến mô hình

Cho trạng thái đầu $x_0\in\mathbb R$, đích $t\in\mathbb R$ (target), giới hạn $u_{\max}\ge0$ và trọng số năng lượng $\lambda\ge0$. Ta chọn tác động $u\in\mathbb R$; trạng thái kế tiếp là

$$
x_1=x_0+u.
$$

Hai yêu cầu cạnh tranh là:

- giảm sai lệch bám đích $(x_1-t)^2$;
- giảm năng lượng điều khiển $u^2$.

Mô hình là

$$
\underset{-u_{\max}\le u\le u_{\max}}{\operatorname{minimize}}
\quad q(u)=(x_0+u-t)^2+\lambda u^2.
$$

Dữ kiện là $x_0,t,u_{\max},\lambda$; biến quyết định là $u$; hàm mục tiêu là $q$; miền khả thi là đoạn $[-u_{\max},u_{\max}]$. Mô hình là quan niệm chủ quan của con người về thế giới: ở đây ta chọn cách gộp bám đích và năng lượng thành một hàm chi phí.

### 2.2. Nghiệm tự do và nghiệm bị chặn

Trước hết bỏ ràng buộc và giải bài toán trên $\mathbb R$:

$$
q'(u)=2(x_0+u-t)+2\lambda u.
$$

Vì $1+\lambda>0$, phương trình $q'(u)=0$ có nghiệm duy nhất

$$
u_{\mathrm{free}}=\frac{t-x_0}{1+\lambda}.
$$

Trong một chiều, nghiệm trên đoạn thu được bằng cách chiếu nghiệm tự do lên đoạn:

$$
u^*=\operatorname{clip}\!\left(u_{\mathrm{free}},[-u_{\max},u_{\max}]\right).
$$

Ở đây

$$
\operatorname{clip}(z,[a,b])=
\begin{cases}
a,&z<a,\\
z,&a\le z\le b,\\
b,&z>b.
\end{cases}
$$

::: derivation
Với $x_0=0$, $t=3$, $\lambda=1/2$ và $u_{\max}=1$,

$$
q(u)=(u-3)^2+\frac12u^2=\frac32u^2-6u+9,
$$

$$
q'(u)=3u-6,
\qquad
u_{\mathrm{free}}=2.
$$

Do $2\notin[-1,1]$, ta có $u^*=1$. Khi đó

$$
x_1=1,
\qquad
q(u^*)=(1-3)^2+\frac12=\frac92.
$$
:::

### 2.3. Điều kiện dừng tại biên

Tại nghiệm trên, $q'(1)=-3\ne0$. Dấu đạo hàm khác không vẫn phù hợp với tính tối ưu vì $u=1$ là biên phải của miền. Mọi dịch chuyển khả thi đủ nhỏ có dạng $\Delta u\le0$, nên

$$
\Delta q \approx q'(1)\Delta u\ge0.
$$

Không có hướng khả thi bậc nhất nào làm $q$ giảm. Điều kiện $q'(u^*)=0$ chỉ áp dụng trực tiếp cho nghiệm nằm trong miền trong.

::: proof
Ta có

$$
q''(u)=2(1+\lambda)>0.
$$

Do đó $q$ lồi chặt (còn gọi là lồi nghiêm ngặt) trên $\mathbb R$, rồi cũng lồi chặt khi hạn chế lên đoạn $[-u_{\max},u_{\max}]$. Đoạn này không rỗng, đóng và bị chặn; $q$ liên tục. Vì vậy nghiệm tồn tại và duy nhất.
:::

## 3. Hồi quy tuyến tính

### 3.1. Mô hình bình phương nhỏ nhất

Cho ma trận thiết kế $X\in\mathbb R^{n\times d}$ và vector đầu ra $y\in\mathbb R^n$. Hàng $x_i^T$ của $X$ chứa đặc trưng của mẫu thứ $i$. Ta chọn $w\in\mathbb R^d$ và dự đoán

$$
\widehat y=Xw.
$$

Vector phần dư là $Xw-y$. Bài toán bình phương nhỏ nhất là

$$
\underset{w\in\mathbb R^d}{\operatorname{minimize}}
\quad J(w)=\lVert Xw-y\rVert_2^2
=\sum_{i=1}^{n}(x_i^Tw-y_i)^2.
$$

Miền khả thi là toàn bộ $\mathbb R^d$; không có ràng buộc bổ sung.

### 3.2. Phương trình chuẩn

Khai triển đạo hàm cho

$$
J(w)=(Xw-y)^T(Xw-y)
$$

cho

$$
\nabla J(w)=2X^T(Xw-y),
\qquad
\nabla^2J(w)=2X^TX.
$$

Mọi nghiệm của phương trình chuẩn

$$
X^TXw=X^Ty
$$

đều là nghiệm tối ưu toàn cục. Phương trình chuẩn luôn có nghiệm, dù $X^TX$ có thể suy biến.

::: derivation
Xét

$$
X=\begin{bmatrix}
1&0\\
1&1\\
1&2
\end{bmatrix},
\qquad
y=\begin{bmatrix}1\\2\\2\end{bmatrix}.
$$

Ta có

$$
X^TX=\begin{bmatrix}3&3\\3&5\end{bmatrix},
\qquad
X^Ty=\begin{bmatrix}5\\6\end{bmatrix}.
$$

Giải phương trình chuẩn được

$$
w^*=\begin{bmatrix}7/6\\1/2\end{bmatrix}.
$$

Dự đoán và phần dư là

$$
Xw^*=\begin{bmatrix}7/6\\5/3\\13/6\end{bmatrix},
\qquad
Xw^*-y=\begin{bmatrix}1/6\\-1/3\\1/6\end{bmatrix}.
$$

Vì vậy

$$
J(w^*)=\left(\frac16\right)^2+\left(-\frac13\right)^2+\left(\frac16\right)^2=\frac16.
$$
:::

### 3.3. Tồn tại và duy nhất

Không gian cột $\mathcal R(X)$ là một không gian con hữu hạn chiều nên đóng. Hình chiếu trực giao của $y$ lên $\mathcal R(X)$ luôn tồn tại. Vì điểm chiếu thuộc $\mathcal R(X)$, có ít nhất một $w^*$ tạo ra dự đoán đó. Do vậy bài toán bình phương nhỏ nhất luôn có nghiệm với mọi $X$ và $y$.

Nghiệm duy nhất khi và chỉ khi $X$ có hạng cột đầy đủ. Thật vậy,

$$
v^TX^TXv=\lVert Xv\rVert_2^2.
$$

Ma trận $X^TX$ xác định dương khi và chỉ khi $Xv=0$ chỉ có nghiệm $v=0$. Nếu tồn tại $v\ne0$ thuộc $\ker(X)$, thì $X(w^*+tv)=Xw^*$ với mọi $t\in\mathbb R$, nên tham số tối ưu không duy nhất.

::: example
Nếu thêm vào $X$ một cột trùng với cột đặc trưng đang có, không gian cột của $X$ không đổi nên dự đoán tốt nhất không đổi. Hai hệ số của các cột trùng nhau có thể bù qua lại, vì vậy vector tham số không còn duy nhất.
:::

## 4. Hồi quy logistic

### 4.1. Biên có dấu và mất mát

Cho $a_i\in\mathbb R^d$ và $y_i\in\{-1,+1\}$ với $i=1,\ldots,n$. Điểm số của mô hình là $a_i^Tw$. Biên có dấu

$$
m_i=y_i a_i^Tw
$$

dương khi dấu dự đoán khớp nhãn. Mất mát logistic cho một mẫu là

$$
\ell(m)=\log(1+e^{-m}).
$$

Ta chọn $w\in\mathbb R^d$ bằng cách giải

$$
\underset{w\in\mathbb R^d}{\operatorname{minimize}}
\quad L(w)=\sum_{i=1}^{n}\ell(y_i a_i^Tw).
$$

Các đạo hàm theo biên là

$$
\ell'(m)=-\frac{1}{1+e^m},
\qquad
\ell''(m)=\frac{e^m}{(1+e^m)^2}>0.
$$

Do đó mất mát giảm khi biên tăng và lồi chặt theo biến vô hướng $m$.

### 4.2. Dữ liệu tách tuyến tính và nghiệm không tồn tại

::: example
Xét hai mẫu một chiều

$$
(a_1,y_1)=(1,+1),
\qquad
(a_2,y_2)=(-1,-1).
$$

Cả hai biên có dấu đều bằng $w$, nên

$$
L(w)=2\log(1+e^{-w}).
$$

Một số giá trị là

| $w$ | $0$ | $1$ | $2$ | $4$ |
|---:|---:|---:|---:|---:|
| $L(w)$ | $1{,}386$ | $0{,}627$ | $0{,}254$ | $0{,}036$ |

Khi $w\to+\infty$, $L(w)\to0$, còn $L(w)>0$ với mọi $w$ hữu hạn. Vì vậy

$$
\inf_{w\in\mathbb R}L(w)=0
$$

nhưng bài toán không có nghiệm tối ưu hữu hạn.
:::

Ví dụ này cho thấy tính lồi, kể cả lồi chặt, không tự bảo đảm sự tồn tại của nghiệm.

### 4.3. Chính quy hóa bậc hai

Thêm hạng $\mu\lVert w\rVert_2^2/2$ với $\mu>0$:

$$
L_\mu(w)=L(w)+\frac\mu2\lVert w\rVert_2^2.
$$

Nếu $A$ là ma trận có hàng $a_i^T$ và $d_i=\ell''(m_i)>0$, thì

$$
\nabla^2L(w)=\sum_{i=1}^{n}d_i a_i a_i^T=A^TDA\succeq0,
$$

$$
\nabla^2L_\mu(w)=A^TDA+\mu I\succeq\mu I.
$$

Hạng chính quy hóa làm mục tiêu lồi chặt và bức: $L_\mu(w)\to+\infty$ khi $\lVert w\rVert_2\to\infty$. Do mục tiêu liên tục trên miền đóng $\mathbb R^d$, nghiệm tồn tại và duy nhất.

## 5. Bài toán tối ưu tổng quát

Ba ca đều có dạng

$$
\underset{x\in C}{\operatorname{minimize}}\quad f_0(x),
$$

trong đó:

- $x\in\mathbb R^d$ là biến quyết định;
- $f_0:C\to\mathbb R$ là hàm mục tiêu;
- $C\subseteq\mathbb R^d$ là miền khả thi do các ràng buộc xác định;
- dữ kiện của bài toán xác định $f_0$ và $C$ nhưng không được mô hình tự thay đổi.

| Ca | Biến | Mục tiêu | Miền khả thi |
|---|---|---|---|
| Điều khiển | $u\in\mathbb R$ | $(x_0+u-t)^2+\lambda u^2$ | $[-u_{\max},u_{\max}]$ |
| Hồi quy tuyến tính | $w\in\mathbb R^d$ | $\lVert Xw-y\rVert_2^2$ | $\mathbb R^d$ |
| Hồi quy logistic | $w\in\mathbb R^d$ | $\sum_i\log(1+e^{-y_i a_i^Tw})$ | $\mathbb R^d$ |

### 5.1. Các khái niệm về nghiệm

Một điểm $x\in C$ là khả thi. Giá trị tối ưu là

$$
p^*=\inf_{x\in C}f_0(x).
$$

Một điểm $x^*\in C$ là nghiệm tối ưu toàn cục nếu

$$
f_0(x^*)\le f_0(x),
\qquad \forall x\in C.
$$

Điểm $x^*$ là cực tiểu địa phương tương đối với $C$ nếu tồn tại một lân cận $N$ của $x^*$ sao cho

$$
f_0(x^*)\le f_0(x),
\qquad \forall x\in C\cap N.
$$

Các câu hỏi phải được tách riêng:

1. Điểm $x$ đang xét có thuộc $C$ không?
2. Tập khả thi $C$ có lồi không?
3. Hàm mục tiêu $f_0$ có lồi trên $C$ không?
4. Điểm ứng viên có tối ưu toàn cục không?
5. Nghiệm tối ưu có tồn tại không?
6. Nếu tồn tại, nghiệm có duy nhất không?

::: example
Trong ca điều khiển, $u=0$ là khả thi nhưng không tối ưu cho bộ số đã cho. Trong ca logistic tách tuyến tính, $p^*=0$ nhưng không có $w^*$ đạt $p^*$. Trong hồi quy tuyến tính thiếu hạng, nghiệm tồn tại nhưng không duy nhất.
:::

## 6. Công cụ lồi vừa đủ

### 6.1. Tập lồi

Cho $C\subseteq\mathbb R^d$. Với $x,y\in C$ và $\theta\in[0,1]$, điểm

$$
z_\theta=\theta x+(1-\theta)y
$$

nằm trên đoạn nối $x$ và $y$.

::: proof
**Định nghĩa.** Tập $C$ là lồi nếu

$$
\theta x+(1-\theta)y\in C
$$

với mọi $x,y\in C$ và mọi $\theta\in[0,1]$.

Thứ tự lượng từ là một phần của định nghĩa. Kiểm tra một cặp điểm hoặc chỉ trung điểm chưa đủ để kết luận trong trường hợp tổng quát.
:::

Các tập dùng trong bài:

- $\mathbb R^d$ là lồi;
- đoạn $[a,b]$ và hộp $\{x\mid l\le x\le u\}$ là lồi;
- tập affine $\{x\mid Ax=b\}$ là lồi;
- nửa không gian $\{x\mid a^Tx\le b\}$ là lồi.

Hai quy tắc bảo toàn cần dùng là:

1. giao của một họ tập lồi là lồi;
2. nếu $D$ lồi thì nghịch ảnh affine $\{x\mid Ax+b\in D\}$ là lồi.

::: proof
Nếu $x,y\in\bigcap_jC_j$ thì $x,y\in C_j$ với mọi $j$. Do từng $C_j$ lồi,

$$
\theta x+(1-\theta)y\in C_j
$$

với mọi $j$, nên tổ hợp này thuộc giao.

Với nghịch ảnh affine, nếu $Ax+b$ và $Ay+b$ thuộc $D$ thì

$$
A(\theta x+(1-\theta)y)+b
=\theta(Ax+b)+(1-\theta)(Ay+b)\in D.
$$
:::

Áp dụng:

$$
[-u_{\max},u_{\max}]
=\{u\mid u\le u_{\max}\}\cap\{u\mid -u\le u_{\max}\}
$$

là lồi; miền của hai ca hồi quy là $\mathbb R^d$, cũng lồi.

### 6.2. Hàm lồi và hàm lồi chặt

Cho $C\subseteq\mathbb R^d$ lồi.

::: proof
**Định nghĩa.** Hàm $f:C\to\mathbb R$ là lồi nếu

$$
f(\theta x+(1-\theta)y)
\le \theta f(x)+(1-\theta)f(y)
$$

với mọi $x,y\in C$ và mọi $\theta\in[0,1]$.

Hàm là **lồi chặt** nếu bất đẳng thức là nghiêm khi $x\ne y$ và $\theta\in(0,1)$.
:::

Về hình học, đồ thị của hàm lồi không nằm trên dây cung nối hai điểm của đồ thị. Lồi chặt loại trừ đoạn thẳng trên đồ thị giữa hai điểm phân biệt.

::: proof
**Định lý địa phương–toàn cục.** Nếu $C$ lồi và $f:C\to\mathbb R$ lồi, mọi cực tiểu địa phương tương đối với $C$ đều là cực tiểu toàn cục.

Giả sử $x^*$ là cực tiểu địa phương nhưng tồn tại $y\in C$ sao cho $f(y)<f(x^*)$. Với $\theta\in(0,1)$, đặt

$$
z_\theta=(1-\theta)x^*+\theta y.
$$

Tính lồi của $C$ cho $z_\theta\in C$. Khi $\theta$ đủ nhỏ, $z_\theta$ nằm trong lân cận dùng trong định nghĩa cực tiểu địa phương. Mặt khác,

$$
f(z_\theta)
\le(1-\theta)f(x^*)+\theta f(y)
<f(x^*),
$$

mâu thuẫn.
:::

Nếu $f$ lồi chặt trên $C$ lồi, $f$ có nhiều nhất một nghiệm. Nếu có hai nghiệm phân biệt $x^*$ và $y^*$, tính lồi chặt tại trung điểm cho giá trị nhỏ hơn giá trị tối ưu, tạo mâu thuẫn.

### 6.3. Điều kiện bậc nhất

::: proof
**Định lý.** Cho $C\subseteq\mathbb R^d$ mở, lồi và $f:C\to\mathbb R$ khả vi. Hàm $f$ lồi khi và chỉ khi

$$
f(y)\ge f(x)+\nabla f(x)^T(y-x),
\qquad \forall x,y\in C.
$$
:::

Vế phải là siêu phẳng tiếp xúc tại $x$. Điều kiện nói rằng mọi siêu phẳng tiếp xúc nằm dưới đồ thị.

Nếu $x^*\in C$ và $\nabla f(x^*)=0$, điều kiện bậc nhất cho

$$
f(y)\ge f(x^*),
\qquad \forall y\in C,
$$

nên $x^*$ là cực tiểu toàn cục. Điều kiện gradient bằng không không áp dụng trực tiếp cho nghiệm ở biên của một miền đóng; khi đó cần xét hướng khả thi hoặc điều kiện tối ưu có ràng buộc.

### 6.4. Điều kiện bậc hai

::: proof
**Định lý.** Cho $C\subseteq\mathbb R^d$ mở, lồi và $f:C\to\mathbb R$ khả vi hai lần. Khi đó

$$
f\text{ lồi trên }C
\quad\Longleftrightarrow\quad
\nabla^2f(x)\succeq0,
\qquad \forall x\in C.
$$

Ký hiệu $H\succeq0$ nghĩa là $v^THv\ge0$ với mọi $v\in\mathbb R^d$.
:::

Với hồi quy tuyến tính,

$$
\nabla^2J(w)=2X^TX,
$$

và

$$
v^T\nabla^2J(w)v=2\lVert Xv\rVert_2^2\ge0.
$$

Với ca điều khiển, $q$ được xác định và khả vi hai lần trên miền mở $\mathbb R$. Ta chứng nhận $q''(u)>0$ trên $\mathbb R$, rồi hạn chế $q$ lên đoạn đóng khả thi.

### 6.5. Ghép các hàm lồi

Hai quy tắc đủ cho ba ca là:

1. nếu $f_j$ lồi và $\alpha_j\ge0$ thì $\sum_j\alpha_jf_j$ lồi;
2. nếu $f$ lồi thì $x\mapsto f(Ax+b)$ lồi.

Hàm $s\mapsto s^2$ lồi. Vì vậy từng bình phương của biểu thức affine là lồi; tổng các hạng này tạo mục tiêu điều khiển và bình phương nhỏ nhất.

Hàm $\ell(s)=\log(1+e^{-s})$ lồi vì $\ell''(s)>0$. Mỗi biên $y_i a_i^Tw$ là affine theo $w$, nên từng $\ell(y_i a_i^Tw)$ lồi; tổng của chúng là $L(w)$ lồi.

### 6.6. Tồn tại và duy nhất

Ba mệnh đề cần được dùng riêng:

1. Nếu $C$ không rỗng, đóng và bị chặn, còn $f:C\to\mathbb R$ liên tục, thì $f$ đạt giá trị nhỏ nhất trên $C$.
2. Nếu $C$ không rỗng, đóng, $f$ liên tục và bức trên $C$, thì $f$ đạt giá trị nhỏ nhất trên $C$. Tính bức nghĩa là $f(x)\to+\infty$ khi $\lVert x\rVert_2\to\infty$ dọc theo $C$.
3. Nếu $C$ lồi và $f$ lồi chặt trên $C$, thì $f$ có nhiều nhất một nghiệm.

::: example
Ba trường hợp biên:

- $f(x)=e^x$ trên $\mathbb R$ lồi chặt nhưng không đạt cận dưới đúng $0$;
- $f(x)=0$ trên $[-1,1]$ có vô số nghiệm;
- $f(x)=x^2$ trên $\mathbb R$ có nghiệm duy nhất $x^*=0$.

Các trường hợp này tách rõ “không có”, “có nhiều” và “có đúng một” nghiệm.
:::

## 7. Chứng nhận ba ca và chuyển giao

### 7.1. Bảng chứng nhận

| Ca | Miền và mục tiêu | Bảo đảm tồn tại | Bảo đảm duy nhất |
|---|---|---|---|
| Điều khiển | Đoạn lồi; $q''=2(1+\lambda)>0$ | Miền không rỗng, đóng, bị chặn; $q$ liên tục | $q$ lồi chặt |
| Hồi quy tuyến tính | $\mathbb R^d$ lồi; $2X^TX\succeq0$ | Hình chiếu của $y$ lên $\mathcal R(X)$ luôn tồn tại | $X$ có hạng cột đầy đủ |
| Logistic tách tuyến tính | $\mathbb R^d$ lồi; $A^TDA\succeq0$ | Có thể không có nếu chưa chính quy hóa | Không xét khi nghiệm không tồn tại |
| Logistic có chính quy hóa | $\nabla^2L_\mu\succeq\mu I$ | $L_\mu$ liên tục và bức | $L_\mu$ lồi chặt |

Tính lồi của miền và mục tiêu tạo bảo đảm địa phương–toàn cục. Nó không thay thế các giả thiết về tồn tại hoặc duy nhất.

### 7.2. Bài toán chiếu sáng

Cho $m$ đèn và $n$ vùng cần chiếu sáng. Vector $p\in\mathbb R^m$ chứa công suất đèn; ma trận $A\in\mathbb R_+^{n\times m}$ mô tả mức đóng góp của mỗi đèn tại mỗi vùng. Độ sáng là

$$
I=Ap.
$$

Một mô hình bình phương nhỏ nhất với giới hạn công suất là

$$
\underset{0\le p\le p_{\max}}{\operatorname{minimize}}
\quad \lVert Ap-I_{\mathrm{des}}\rVert_2^2.
$$

::: exercise
Xác định dữ kiện, biến quyết định, hàm mục tiêu và miền khả thi. Sau đó chứng nhận tính lồi, sự tồn tại và nêu điều kiện đủ cho tính duy nhất.
:::

::: solution
Dữ kiện là $A$, $I_{\mathrm{des}}$ và $p_{\max}$; biến quyết định là $p$. Miền $[0,p_{\max}]^m$ là một hộp lồi, không rỗng, đóng và bị chặn. Mục tiêu có Hessian $2A^TA\succeq0$, nên lồi. Mục tiêu liên tục trên miền đóng, bị chặn nên nghiệm tồn tại. Nếu $A$ có hạng cột đầy đủ, Hessian xác định dương; mục tiêu lồi chặt và nghiệm duy nhất.
:::

Mô hình này được phỏng theo ca chiếu sáng trong MIT 6.079, lec01, trang 1-9 đến 1-12. Bản MIT còn xét mục tiêu sai lệch tương đối theo logarit; Bài 01 dùng dạng bình phương nhỏ nhất để chỉ cần các phép bảo toàn đã học.

### 7.3. Bảng kiểm cho một mô hình mới

1. Nêu kiểu và kích thước của mọi dữ kiện.
2. Chỉ ra biến quyết định và miền của biến.
3. Viết hàm mục tiêu và từng ràng buộc.
4. Kiểm tra miền khả thi có lồi không.
5. Kiểm tra mục tiêu có lồi không; ghi đúng giả thiết của công cụ kiểm tra.
6. Tách ba kết luận: địa phương–toàn cục, tồn tại, duy nhất.
7. Diễn giải nghiệm trong ngữ cảnh ban đầu.

## Tài liệu tham khảo

1. Stephen Boyd và Lieven Vandenberghe, *Convex Optimization*, Cambridge University Press, 2004, Chương 1–3.
2. Stephen Boyd và Pablo Parrilo, MIT OpenCourseWare 6.079/6.975, *Introduction to Convex Optimization*, Fall 2009, lec01, lec02 và lec03.
3. Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội, đề cương học phần UET.AI2012, *Cơ sở toán học của Trí tuệ nhân tạo*.

Các hình trong bộ trang chiếu được vẽ lại cục bộ. Nguồn MIT OpenCourseWare dùng theo giấy phép CC BY-NC-SA 4.0; thông tin URL, ngày tải và checksum nằm trong `sources/MIT/README.md` của kho học phần.
