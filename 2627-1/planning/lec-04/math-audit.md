# Kiểm toán ví dụ và bài tập Bài giảng 04

## 1. Phạm vi và kết luận

- Đối chiếu độc lập Mục 6–7 của `source-map.md` với phạm vi trong `plan.md`.
- Tự tính lại gradient, bước tìm kiếm đường chính xác, điều kiện Armijo, quỹ đạo, bước Newton, độ giảm Newton, ví dụ tự điều chỉnh và hai chế độ Newton–KKT.
- Kết luận: mọi giá trị số, dấu và kích thước trong hai ví dụ đều đúng. Không có lỗi chặn bàn giao hoặc nghiêm trọng.
- Khi soạn, phải giữ hai giới hạn diễn giải: công thức bước chính xác và quỹ đạo đóng chỉ áp dụng cho hàm bậc hai đang xét; $\eta$ trong bước Newton khả thi không được gọi là $\Delta\nu$.

## 2. Ví dụ gradient và Newton không ràng buộc

Xét

$$
f(x)=\frac12(x_1^2+10x_2^2),\qquad
H=\begin{bmatrix}1&0\\0&10\end{bmatrix},\qquad
x^{(0)}=(10,1)^T.
$$

$H\in\mathbb S_{++}^2$ vì có hai trị riêng $1,10>0$. Do đó $f$ lồi mạnh, có nghiệm duy nhất $x^*=0$, $p^*=0$ và số điều kiện phổ là $\kappa_2(H)=10$. Tại điểm đầu,

$$
g^{(0)}=Hx^{(0)}=(10,10)^T,\qquad f(x^{(0)})=55.
$$

### 2.1. Gradient với tìm kiếm đường chính xác

Với $d=-g$, cực tiểu hóa $f(x-tg)$ cho

$$
t=\frac{g^Tg}{g^THg}.
$$

Tại $x^{(0)}$,

$$
g^Tg=200,\qquad g^THg=1100,\qquad t_0=\frac2{11}.
$$

Suy ra

$$
x^{(1)}=x^{(0)}-\frac2{11}g^{(0)}
=\left(\frac{90}{11},-\frac9{11}\right)^T
$$

và

$$
f(x^{(1)})
=\frac12\left[\left(\frac{90}{11}\right)^2
+10\left(\frac{-9}{11}\right)^2\right]
=\frac{4455}{121}.
$$

Đặt $\rho=9/11$. Nếu $x^{(k)}=(10\rho^k,(-\rho)^k)^T$ thì hai thành phần của gradient có cùng độ lớn; do đó bước chính xác vẫn là $2/11$. Phép cập nhật nhân thành phần thứ nhất với $\rho$ và thành phần thứ hai với $-\rho$. Bằng quy nạp,

$$
x_1^{(k)}=10\rho^k,\qquad x_2^{(k)}=(-\rho)^k,
\qquad f(x^{(k)})=55\rho^{2k}.
$$

Quỹ đạo và hệ số $\rho$ trong `source-map.md` đúng. Không được trình bày dạng đóng này như kết quả cho hàm tổng quát hoặc cho backtracking.

### 2.2. Armijo

Với $\alpha=0.1$, $\beta=0.5$ và $d=-g^{(0)}=(-10,-10)^T$,

$$
f(x^{(0)}+td)=55-200t+550t^2,
$$

trong khi vế phải Armijo là

$$
f(x^{(0)})+\alpha t(g^{(0)})^Td=55-20t.
$$

Với $t>0$, điều kiện nhận bước tương đương $t\le18/55\approx0.3273$. Vì vậy $t=1$ và $t=1/2$ bị loại, còn $t=1/4$ được nhận. Khi đó

$$
x^+=(7.5,-1.5)^T,\qquad f(x^+)=39.375,
$$

đúng như `source-map.md`.

### 2.3. Newton và độ giảm Newton

Hệ $H\Delta x_N=-g^{(0)}$ cho

$$
\Delta x_N=(-10,-1)^T,\qquad x^{(0)}+\Delta x_N=0.
$$

Độ giảm Newton thỏa

$$
\delta_N^2=-g^T\Delta x_N=g^TH^{-1}g=110,
\qquad \frac{\delta_N^2}{2}=55.
$$

Đẳng thức $\delta_N^2/2=f(x^{(0)})-p^*$ đúng ở đây vì $f$ là bậc hai với Hessian hằng và bước đầy đủ tới nghiệm. Hướng giảm dốc nhất theo chuẩn $H$ là $-H^{-1}g$, nên trùng hướng Newton trong ví dụ này; đây không phải đẳng thức tổng quát giữa gradient Euclid và Newton.

## 3. Ví dụ $\phi(s)=s-\log s$

Miền là $s>0$. Các đạo hàm

$$
\phi'(s)=1-\frac1s,\qquad
\phi''(s)=\frac1{s^2},\qquad
\phi'''(s)=-\frac2{s^3}
$$

cho

$$
|\phi'''(s)|=2\phi''(s)^{3/2}=\frac2{s^3}.
$$

Do $\phi''(s)>0$, nghiệm duy nhất của $\phi'(s)=0$ là $s^*=1$. Tại $s_0=1/2$,

$$
\Delta s_N=-\frac{\phi'(s_0)}{\phi''(s_0)}=\frac14,
\qquad s_1=\frac34>0,
$$

và

$$
\delta_N(s_0)^2=\frac{\phi'(s_0)^2}{\phi''(s_0)}=\frac14.
$$

Mọi giá trị trong `source-map.md` đúng. Cần giữ điều kiện miền $s>0$ trên cùng trang với phép tính.

## 4. Ví dụ ràng buộc đẳng thức

Xét

$$
\min_{x\in\mathbb R^2}\ \frac12(x_1^2+4x_2^2)
\quad\text{với}\quad x_1+x_2=1.
$$

Ta có $H=\operatorname{diag}(1,4)\in\mathbb S_{++}^2$, $A=[1\ 1]\in\mathbb R^{1\times2}$, $b\in\mathbb R$ và $\operatorname{rank}A=1<2$. Ma trận Newton–KKT có kích thước $3\times3$. Điều kiện dừng KKT là

$$
x_1+\nu=0,\qquad4x_2+\nu=0,\qquad x_1+x_2=1.
$$

Giải hệ cho

$$
x^*=\left(\frac45,\frac15\right)^T,
\qquad \nu^*=-\frac45.
$$

Nghiệm là duy nhất vì $H\succ0$, mạnh hơn điều kiện đủ $H\succ0$ trên $\operatorname{null}A$.

### 4.1. Khởi đầu khả thi

Tại $x^{(0)}=(1/2,1/2)^T$, $g=(1/2,2)^T$. Hệ

$$
\begin{bmatrix}1&0&1\\0&4&1\\1&1&0\end{bmatrix}
\begin{bmatrix}\Delta x_1\\\Delta x_2\\\eta\end{bmatrix}
=-
\begin{bmatrix}1/2\\2\\0\end{bmatrix}
$$

cho

$$
\Delta x=\left(\frac3{10},-\frac3{10}\right)^T,
\qquad \eta=-\frac45.
$$

$A\Delta x=0$ và $x^{(0)}+\Delta x=(4/5,1/5)^T=x^*$. Dấu và kết quả trong `source-map.md` đúng. Ở chế độ này $\eta$ là biến phụ của bài toán Newton; không đổi tên thành $\Delta\nu$.

### 4.2. Khởi đầu không khả thi

Với $x^{(0)}=(0,0)^T$, $\nu^{(0)}=0$,

$$
r_d=(0,0)^T\in\mathbb R^2,
\qquad r_p=-1\in\mathbb R.
$$

Hệ primal–dual có vế phải $-(r_d,r_p)^T=(0,0,1)^T$ và cho

$$
\Delta x=\left(\frac45,\frac15\right)^T,
\qquad \Delta\nu=-\frac45.
$$

Cập nhật bước đầy đủ cho $(x^+,\nu^+)=(x^*,\nu^*)$, nên cả $r_d^+$ và $r_p^+$ bằng không trong số học chính xác. Dấu, kích thước và kết quả trong `source-map.md` đúng.

### 4.3. Khử đẳng thức

Với $\hat x=(1,0)^T$ và $F=(-1,1)^T\in\mathbb R^{2\times1}$,

$$
A\hat x=b,\qquad AF=0.
$$

Đặt $x=\hat x+Fz=(1-z,z)^T$. Bài toán rút gọn có

$$
\psi(z)=\frac12(1-2z+5z^2),
\qquad \psi'(z)=-1+5z,
$$

nên $z^*=1/5$ và $x^*=(4/5,1/5)^T$. Tham số hóa trong `source-map.md` hợp lệ.

## 5. Điểm phải giữ khi triển khai

| Mức | Vị trí | Yêu cầu |
|---|---|---|
| Trung bình nếu thiếu | Gradient exact line search | Nêu công thức $t=g^Tg/(g^THg)$ thuộc hàm bậc hai với hướng $-g$; không khái quát cho mọi $f$. |
| Trung bình nếu thiếu | Quỹ đạo gradient | Gắn $\rho=9/11$ với đúng điểm đầu, Hessian và exact line search. |
| Trung bình nếu thiếu | Newton decrement | Nêu đẳng thức với sai số thật chỉ đúng trong ví dụ bậc hai này. |
| Nghiêm trọng nếu thiếu | $\phi$ | Ghi miền $s>0$ trước đạo hàm và bước Newton. |
| Nghiêm trọng nếu trộn | Newton–KKT | Giữ $\eta$ cho bước khả thi và $\Delta\nu$ cho bước primal–dual không khả thi. |
| Chặn bàn giao nếu sai | Kích thước KKT | Giữ $x,\Delta x,r_d\in\mathbb R^2$, $\nu,\eta,\Delta\nu,r_p\in\mathbb R$, $A\in\mathbb R^{1\times2}$ và hệ $3\times3$. |

Không có số nào trong Mục 6–7 cần sửa trước khi chuyển sang outline và storyboard.
