# Đặc tả toán học Bài giảng 04

Tệp này là thẩm quyền cho các phép tính số và quy ước toán học khi triển khai Bài giảng 04. Mọi công thức trên outline, storyboard, HTML, SVG và ghi chú diễn giả phải khớp với tệp này.

## 1. Quy ước chung

- $f:\mathbb R^n\to\mathbb R\cup\{+\infty\}$ lồi, khả vi liên tục cấp hai trên miền mở $\operatorname{dom}f$.
- Trên tuyến chính, $p^*=\inf_x f(x)$ hữu hạn và đạt được; $x^{(0)}\in\operatorname{dom}f$.
- Đặt $g=\nabla f(x)$, $H=\nabla^2f(x)$ và $x^{(k+1)}=x^{(k)}+t_kd^{(k)}$.
- Hướng $d$ là hướng giảm khi $g^Td<0$.
- Tìm kiếm đường quay lui Armijo bắt đầu từ $t=1$ và thay $t\leftarrow\beta t$ đến khi

$$
f(x+td)\le f(x)+\alpha t g^Td,
\qquad \alpha\in(0,1/2),\quad \beta\in(0,1).
$$

- Gradient descent dùng $d=-g$. Giảm dốc nhất theo chuẩn tổng quát dùng

$$
\|g\|_*=\max_{\|v\|\le1}g^Tv,
\qquad
d_{\mathrm{nsd}}=\operatorname*{argmin}_{\|v\|=1}g^Tv,
\qquad d_{\mathrm{sd}}=\|g\|_*d_{\mathrm{nsd}},
\qquad g^Td_{\mathrm{sd}}=-\|g\|_*^2.
$$

- Với $\|v\|_W=(v^TWv)^{1/2}$ và $W\in\mathbb S_{++}^n$, hướng không chuẩn hóa là nghiệm của $Wd=-g$. Không mô tả việc lập $W^{-1}$ như một thao tác.
- Newton tính $\Delta x_N$ bằng cách giải $H\Delta x_N=-g$. Không lập $H^{-1}$.
- Độ giảm Newton dùng ký hiệu

$$
\delta_N(x)^2=-g^T\Delta x_N=\Delta x_N^TH\Delta x_N.
$$

Khoảng giảm của mô hình bậc hai là $\delta_N^2/2$; chỉ trong ví dụ bậc hai dưới đây nó bằng đúng $f(x)-p^*$.

## 2. Ví dụ bậc hai không ràng buộc

Xét

$$
f(x)=\frac12(x_1^2+10x_2^2),
\qquad x^{(0)}=(10,1)^T,
\qquad H=\begin{bmatrix}1&0\\0&10\end{bmatrix}.
$$

Ta có

$$
x^*=0,\qquad p^*=0,\qquad
f(x^{(0)})=55,\qquad g^{(0)}=(10,10)^T.
$$

Số điều kiện theo chuẩn Euclid là $\kappa(H)=10$.

### 2.1. Gradient với exact line search

Với $d=-g$, bước tối ưu trên tia của một hàm bậc hai là

$$
t_0=\frac{g^Tg}{g^THg}
=\frac{200}{1100}=\frac2{11}.
$$

Do đó

$$
x^{(1)}=x^{(0)}-\frac2{11}g^{(0)}
=\left(\frac{90}{11},-\frac9{11}\right)^T,
$$

và

$$
f(x^{(1)})
=\frac12\left(\frac{8100}{121}+10\frac{81}{121}\right)
=\frac{4455}{121}.
$$

Đặt $\rho=9/11$. Quỹ đạo exact line search thỏa

$$
x_1^{(k)}=10\rho^k,
\qquad x_2^{(k)}=(-\rho)^k.
$$

Dấu của $x_2^{(k)}$ luân phiên nên quỹ đạo zigzag; độ lớn giảm theo $\rho^k$.

### 2.2. Backtracking Armijo

Chọn $\alpha=0{,}1$, $\beta=0{,}5$ và $d=-g^{(0)}=(-10,-10)^T$. Khi đó $g^Td=-200$.

Hàm một chiều và đường Armijo phải được vẽ đúng theo

$$
q(t)=f(x^{(0)}+td)=55-200t+550t^2,
\qquad \ell(t)=55-20t.
$$

Đáy của $q$ là $t=2/11$; $t=1$ và $t=1/2$ nằm trên $\ell$, còn $t=1/4$ nằm dưới $\ell$.

| $t$ | $x+td$ | $f(x+td)$ | Vế phải Armijo $55-20t$ | Kết luận |
|---:|---|---:|---:|---|
| $1$ | $(0,-9)^T$ | $405$ | $35$ | không nhận |
| $1/2$ | $(5,-4)^T$ | $92{,}5$ | $45$ | không nhận |
| $1/4$ | $(7{,}5,-1{,}5)^T$ | $39{,}375$ | $50$ | nhận |

Vậy vòng quay lui thực hiện hai lần co bước và trả $t=1/4$.

### 2.3. Gradient, chuẩn $H$ và Newton

- Gradient Euclid: giải $Id=-g$, nên $d=(-10,-10)^T$.
- Giảm dốc nhất theo chuẩn $H$: giải $Hd=-g$, nên $d=(-10,-1)^T$.
- Newton: giải cùng hệ $H\Delta x_N=-g$, nên $\Delta x_N=(-10,-1)^T$.

Ở ví dụ bậc hai, cập nhật Newton với $t=1$ cho $x^+=0$ sau một bước. Đồng thời

$$
\delta_N^2=-g^T\Delta x_N=110,
\qquad \frac{\delta_N^2}{2}=55=f(x^{(0)})-p^*.
$$

Sự trùng hướng giữa chuẩn $H$ và Newton chỉ đúng vì $W=H$ tại điểm đang xét; không suy ra gradient Euclid luôn là Newton.

## 3. Ví dụ Newton phi bậc hai và hàm tự điều chỉnh

Xét

$$
\phi(s)=s-\log s,\qquad s>0.
$$

Các đạo hàm là

$$
\phi'(s)=1-\frac1s,\qquad
\phi''(s)=\frac1{s^2},\qquad
\phi'''(s)=-\frac2{s^3}.
$$

Vì $s>0$,

$$
|\phi'''(s)|=\frac2{s^3}=2\phi''(s)^{3/2},
$$

nên $\phi$ đạt dấu bằng trong bất đẳng thức tự điều chỉnh chuẩn. Tại $s_0=1/2$:

$$
\phi'(s_0)=-1,\qquad \phi''(s_0)=4.
$$

Giải $4\Delta s_N=1$ cho

$$
\Delta s_N=\frac14,\qquad s_1=\frac34,
\qquad \delta_N(s_0)^2=-\phi'(s_0)\Delta s_N=\frac14.
$$

Nghiệm duy nhất là $s^*=1$. Ví dụ này dùng để tính một bước Newton ở C08 và kiểm tra tự điều chỉnh ở D03–D05.

## 4. Giả thiết hội tụ phải phát biểu

- Gradient có bảo đảm tuyến tính khi trên tập mức liên quan tồn tại $0<\mu\le M$ sao cho

$$
\mu I\preceq\nabla^2f(x)\preceq MI,
$$

và dùng quy tắc bước phù hợp. Không suy tốc độ tuyến tính chỉ từ tính lồi.
- Hai pha của Newton cần ít nhất tính lồi mạnh trên tập mức, Hessian Lipschitz với hằng số $L_H$ trên tập mức và backtracking phù hợp.
- Pha tắt dần tạo lượng giảm hữu hạn mỗi vòng; gần nghiệm, bước đầy đủ được nhận và gradient hoặc sai số phù hợp hội tụ bậc hai.
- Một phát biểu định lượng cho pha gần nghiệm là $\|x^{(k+1)}-x^*\|\le C\|x^{(k)}-x^*\|^2$ sau khi vào lân cận phù hợp.
- Không dùng bảo đảm trên khi Hessian suy biến, không xác định dương hoặc bài toán phi lồi.

## 5. Hàm tự điều chỉnh

Một hàm lồi một chiều, khả vi ba lần, là tự điều chỉnh chuẩn nếu

$$
|\phi'''(s)|\le2\phi''(s)^{3/2}.
$$

Hàm nhiều chiều $f$ tự điều chỉnh khi hạn chế $t\mapsto f(x+tv)$ tự điều chỉnh trên mọi đường thẳng nằm trong miền. Giữ đúng các phép tính đóng: hợp affine, tổng và nhân hệ số $a\ge1$. Không nói mọi hệ số dương đều bảo toàn dạng chuẩn. Tính tự điều chỉnh không tự bảo đảm nghiệm tồn tại hoặc Newton hội tụ từ mọi điểm.

### 5.1. Bảo đảm Newton theo decrement

Chỉ dùng phát biểu sau khi nêu $f$ tự điều chỉnh chuẩn, lồi chặt, $\nabla^2f(x)\succ0$ trên miền và nghiệm tồn tại.

- Khi $\delta_N$ còn lớn, bước giảm $t=1/(1+\delta_N)$ cho mức giảm ít nhất $\omega(\delta_N)=\delta_N-\log(1+\delta_N)$.
- Khi $\delta_N$ đủ nhỏ, bước đầy đủ được nhận và decrement kế tiếp bị chặn theo bậc hai.
- Nếu $\delta_N<1$, sai số mục tiêu thỏa

$$
f(x)-p^*\le\omega_*(\delta_N)
=-\delta_N-\log(1-\delta_N).
$$

Các kết luận này không phải bảo đảm vô điều kiện và không thay thế việc kiểm tra nghiệm tồn tại.

## 6. Ví dụ bậc hai có ràng buộc đẳng thức

Xét

$$
\operatorname*{minimize}_{x\in\mathbb R^2}\quad
\frac12(x_1^2+4x_2^2)
$$

với ràng buộc $x_1+x_2=1$.

Đặt

$$
H=\operatorname{diag}(1,4),\qquad
A=\begin{bmatrix}1&1\end{bmatrix},\qquad b=1.
$$

Điều kiện dừng $Hx+A^T\nu=0$ và $Ax=b$ cho

$$
x^*=\left(\frac45,\frac15\right)^T,
\qquad \nu^*=-\frac45,
\qquad p^*=\frac25.
$$

### 6.1. Khử đẳng thức

Chọn $\hat x=(1,0)^T$ và $F=(-1,1)^T\in\mathbb R^{2\times1}$. Tổng quát, $F\in\mathbb R^{n\times(n-p)}$ và $z\in\mathbb R^{n-p}$. Khi đó

$$
A\hat x=b,\qquad AF=0,
$$

nên mọi $x=Fz+\hat x=(1-z,z)^T$ đều khả thi. Bài toán rút gọn là

$$
\min_z\ \frac12\left((1-z)^2+4z^2\right),
$$

có đạo hàm $-1+5z$ và nghiệm $z^*=1/5$.

### 6.2. Newton từ điểm khả thi

Với $x^{(0)}=(1/2,1/2)^T$, ta có $g=(1/2,2)^T$. Giải

$$
\begin{bmatrix}1&0&1\\0&4&1\\1&1&0\end{bmatrix}
\begin{bmatrix}\Delta x_1\\\Delta x_2\\w\end{bmatrix}
=-
\begin{bmatrix}1/2\\2\\0\end{bmatrix}
$$

cho

$$
\Delta x=\left(\frac3{10},-\frac3{10}\right)^T,
\qquad w=-\frac45.
$$

Ta có $A\Delta x=0$ và $x^{(0)}+\Delta x=x^*$. Biến $w$ là biến phụ của hệ bước khả thi, không được gọi là $\Delta\nu$.

Độ giảm Newton có ràng buộc được khóa bởi

$$
\delta_{\mathrm{eq}}^2
=\Delta x^TH\Delta x
=-g^T\Delta x,
\qquad
\frac{\delta_{\mathrm{eq}}^2}{2}\le\varepsilon
$$

là tiêu chuẩn dừng trong chế độ khả thi.

### 6.3. Newton từ điểm không khả thi

Đặt

$$
r_d(x,\nu)=\nabla f(x)+A^T\nu,
\qquad r_p(x)=Ax-b.
$$

Tại $(x^{(0)},\nu^{(0)})=(0,0,0)$:

$$
r_d=(0,0)^T,\qquad r_p=-1.
$$

Giải

$$
\begin{bmatrix}1&0&1\\0&4&1\\1&1&0\end{bmatrix}
\begin{bmatrix}\Delta x_1\\\Delta x_2\\\Delta\nu\end{bmatrix}
=-
\begin{bmatrix}0\\0\\-1\end{bmatrix}
$$

cho

$$
\Delta x=\left(\frac45,\frac15\right)^T,
\qquad \Delta\nu=-\frac45.
$$

Bước đầy đủ đến đúng $(x^*,\nu^*)$. Tổng quát, $\nu,\Delta\nu\in\mathbb R^p$. Backtracking chỉ nhận điểm thử thỏa $x+t\Delta x\in\operatorname{dom}f$, dùng $\|r\|_2$ và dừng khi $\|r_d\|_2\le\varepsilon_d$, $\|r_p\|_2\le\varepsilon_p$.

## 7. Ca AI chuyển giao

Hồi quy trơn có chuẩn hóa hệ số:

$$
\operatorname*{minimize}_{w\in\mathbb R^n}\quad
\frac12\|Xw-y\|_2^2
\qquad\text{với}\qquad \mathbf1^Tw=1,
$$

trong đó $X\in\mathbb R^{m\times n}$ và $y\in\mathbb R^m$. Đây là bài lồi trơn với ràng buộc đẳng thức affine. Nếu khởi đầu khả thi, dùng Newton–KKT khả thi và dừng bằng $\delta_{\mathrm{eq}}^2/2$; nếu chưa khả thi, dùng Newton primal–dual và dừng bằng hai chuẩn phần dư.

Giả sử

$$
\operatorname{null}(X)\cap\operatorname{null}(\mathbf1^T)=\{0\}.
$$

Khi đó $H=X^TX$ xác định dương trên $\operatorname{null}(\mathbf1^T)$, nên điều kiện khả nghịch của hệ Newton–KKT được thỏa.

## 8. Điều kiện hệ Newton–KKT

Khóa kích thước

$$
x\in\mathbb R^n,\quad A\in\mathbb R^{p\times n},\quad
b\in\mathbb R^p,\quad \operatorname{rank}A=p<n.
$$

Hệ Newton–KKT khả nghịch khi $H$ xác định dương trên $\operatorname{null}A$:

$$
Av=0,\ v\ne0\Longrightarrow v^THv>0.
$$

Trong triển khai, giải hệ đối xứng bất định bằng một phân rã phù hợp như LDLT hoặc khai thác bổ Schur; không lập nghịch đảo $H^{-1}$ hoặc nghịch đảo toàn ma trận KKT.
