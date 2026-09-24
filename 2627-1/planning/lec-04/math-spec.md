# Đặc tả toán và lựa chọn số — Bài giảng 04

## Bản triển khai KKT ngày 2026-09-25

Đặc tả hiện hành cho 46 mã RP/RG/RN/RE/RR/RS/RZ. Nội dung dưới hợp nhất trực tiếp từ dàn ý đã duyệt, giữ phép suy ra, giả thiết, sổ số và đáp án. Bản cũ cuối tệp chỉ để truy nguyên; không dùng điểm khả thi cũ (3,11) trong sản phẩm mới. Bằng chứng tính lại và rà độc lập được ghi trong review-log.md.

## 4. Cầu nối chính xác với Bài 03

| Kết quả Bài 03 | Phép dùng thực sự ở Bài 04 hiện hành | Vị trí |
|---|---|---|
| S02-04: hàm Lagrange, nhân tử đẳng thức tự do dấu | Tự viết Lagrange của bài gốc và của bài con, phân biệt biến $x,u$ với bước $d$ | RP02, RG08, RE01, RE03 |
| S05-03: bốn nhóm KKT | Bỏ các nhóm không có trong bài gốc không ràng buộc/chỉ đẳng thức; khôi phục đủ bốn nhóm cho bài con có bất đẳng thức chuẩn | RP02, RG09 |
| S05-05 và S05-05b: lồi + KKT đủ cho tối ưu, không cần Slater để chứng minh tính đủ | Chứng nhận nghiệm của mô hình lồi; không tự gán chứng nhận đó cho điểm mới của hàm phi bậc hai | RG02, RN02–RN03, RE04 |
| S05-05c: điều kiện chính quy giúp bảo đảm tồn tại nhân tử/KKT cần | $v=0$ thỏa Slater cho bài con chuẩn; $A$ đủ hạng hàng cho bài con đẳng thức | RG09, RE04 |
| S05-06a: $(X^TX+2\lambda I)w=X^Ty$ | Mẫu quen thuộc “lập Lagrange → đạo hàm → giải hệ”; phân biệt nhân tử $\lambda$ với hệ số điều chuẩn $\rho$ cho trước | RP01, RZ02 |
| S05-06b: $X=I_2,y=(3,4)^T,\tau=1$, nghiệm $(3/5,4/5)^T$, $\lambda^*=2$ | Nhắc lại đúng ví dụ cũ, không tạo bộ hồi quy mới. Với bài điều chuẩn tương ứng, $\rho=2\lambda^*=4$ chỉ sau khi ghép đúng dữ liệu/nghiệm | Ghi chú RP01, RZ02 |

Quy ước: $g$ trong Bài 04 là vectơ gradient tại điểm hiện tại, không phải hàm đối ngẫu $g(\lambda,\nu)$ của Bài 03. $\lambda$ dành cho nhân tử bất đẳng thức Bài 03; $\zeta$ là nhân tử của bài con chọn hướng; $\nu$ là nhân tử bài gốc; $\eta$ là nhân tử bài con; $\Delta\nu$ là số gia. Quy tắc này phải xuất hiện trước chỗ dùng, không chỉ trong ghi chú.

## 5. Các phép suy ra phải hiện trên slide

### 5.1. Điều kiện tối ưu và phần thiết kế thêm

Trong miền mở, hàm khả vi, không có ràng buộc: điều kiện cần là $\nabla f(x^*)=0$; nếu $f$ lồi thì điều kiện này cũng đủ. Với $u\in\mathbb R^n$, $A\in\mathbb R^{p\times n}$, $b,\nu\in\mathbb R^p$, $F$ lồi khả vi và $Au=b$, điều kiện KKT là

$$\nabla F(u^*)+A^T\nu^*=0,\qquad Au^*=b.$$

Chúng mô tả đích cần đạt, chưa quy định cách chọn bước. Tại $x$, đặt $g=\nabla f(x)\in\mathbb R^n$ và **chọn** mô hình theo biến $d\in\mathbb R^n$:

$$Q_B(d)=f(x)+g^Td+\frac12d^TBd,\qquad B=B^T\succ0.$$

KKT không ràng buộc của bài con cho $g+Bd=0$. Chọn $B=I$ được gradient; chọn $B=W\succ0$ được hướng theo thước đo cố định; chọn $B=H(x)\succ0$ được Newton. KKT không tự chọn $B$, cách tìm bước hay định lý hội tụ. Khi tính, giải hệ $Bd=-g$, không lập nghịch đảo tường minh.

### 5.2. Hướng theo chuẩn bậc hai: dùng đủ bốn nhóm KKT

Với $g\ne0$, $W\succ0$, đặt $\|v\|_W=\sqrt{v^TWv}$. Bài con chọn hướng chuẩn hóa:

$$\min_v g^Tv\quad\text{với}\quad v^TWv\le1.$$

Lagrange $L_s=g^Tv+\zeta(v^TWv-1)$ cho

$$g+2\zeta Wv=0,\quad v^TWv\le1,\quad\zeta\ge0,\quad\zeta(v^TWv-1)=0.$$

Bài con lồi, $v=0$ thỏa Slater và tập khả thi compact nên có nghiệm, KKT cần và đủ. Tính đủ đến từ lồi; Slater được dùng cho chiều cần/tồn tại nhân tử. Vì $g\ne0$, phương trình dừng buộc $\zeta>0$, nên điều kiện bù trừ cùng $\zeta>0$ cho ràng buộc hoạt động $v^TWv=1$. Do đó

$$v=-\frac{W^{-1}g}{2\zeta},\qquad 4\zeta^2=g^TW^{-1}g,$$
$$v=-\frac{W^{-1}g}{\sqrt{g^TW^{-1}g}},\qquad d=\underbrace{\sqrt{g^TW^{-1}g}}_{\|g\|_{W,*}}v=-W^{-1}g.$$

Phải chỉ ra bước đổi độ dài từ $v$ sang $d$; với $g=0$ thì dừng, không chia cho 0. Bài giảng chỉ suy ra công thức trơn này cho chuẩn bậc hai. Định nghĩa giảm dốc nhất theo chuẩn tổng quát đặt trong ghi chú RG08: $v\in\arg\min_{\|v\|\le1}g^Tv$, $\|g\|_*=\max_{\|v\|\le1}g^Tv$, $d=\|g\|_*v$; nhưng không áp công thức đạo hàm này cho chuẩn không trơn.

### 5.3. Newton: hai cách nhìn cùng một hệ

Hessian $H=\nabla^2f(x)\succ0$. Cực tiểu $Q_H$ cho $Hd=-g$. Cũng có thể tuyến tính hóa điều kiện tối ưu:

$$\nabla f(x+d)\approx g+Hd,\qquad g+Hd=0.$$

Dấu xấp xỉ phải giữ trên slide. Với $\varphi(s)=s-\log s$, $s>0$, tại $s=1/4$:

$$g=-3,\quad H=16,\quad d=3/16,\quad s^+=7/16,\quad\varphi'(s^+)=-9/7\ne0.$$

Giải đúng bài con không có nghĩa đã giải xong bài gốc. Định nghĩa $\delta_N=\sqrt{d^THd}\ge0$. Từ $Hd=-g$:

$$\delta_N^2=d^THd=-g^Td=g^TH^{-1}g,\qquad Q_H(0)-Q_H(d)=\frac12\delta_N^2.$$

| Đại lượng khác nhau của cùng VD2 | Phép trừ | Giá trị |
|---|---|---|
| Giảm mô hình | $Q_H(0)-Q_H(d)$ | $9/32\approx0{,}28125$ |
| Giảm thật một bước | $\varphi(1/4)-\varphi(7/16)$ | $\log(7/4)-3/16\approx0{,}37212$ |
| Sai số tối ưu tại điểm đầu | $\varphi(1/4)-\varphi(1)$ | $\log4-3/4\approx0{,}63629$ |

Không gọi hàng cuối là “sai số mô hình”; không lấy hàng đầu làm cận hàng cuối. Với $\alpha=1/10$, bước đầy đủ thỏa Armijo vì giảm thật lớn hơn $\alpha(-g^Td)=9/160$. Đây là ngưỡng nhận bước từ đạo hàm hướng, không phải giảm mô hình $9/32$.

### 5.4. Newton khả thi: lập Lagrange của bài con rồi xếp khối

Cho $F$ lồi hai lần khả vi liên tục trên miền mở lồi; $u\in\mathbb R^n$, $A\in\mathbb R^{p\times n}$ đủ hạng hàng, $p<n$, $Au=b$, $H=\nabla^2F(u)\succ0$, $g=\nabla F(u)$. Muốn $u+td$ khả thi thì $Ad=0$. Chọn bài con

$$\min_d\ g^Td+\frac12d^THd\quad\text{với}\quad Ad=0.$$

Viết $L_m(d,\eta)=g^Td+\frac12d^THd+\eta^TAd$, $\eta\in\mathbb R^p$ tự do dấu. Lấy đạo hàm theo hai biến:

$$g+Hd+A^T\eta=0,\qquad Ad=0.$$
$$\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\eta\end{bmatrix}=-\begin{bmatrix}g\\0\end{bmatrix}.$$

Ma trận khối khả nghịch theo giả thiết nhưng không xác định dương; không dùng Cholesky trực tiếp cho toàn ma trận. KKT chứng nhận nghiệm của bài con lồi chặt (còn gọi là lồi nghiêm ngặt). Nhân hàng đầu với $d^T$ và dùng $Ad=0$ được $g^Td=-d^THd<0$ khi $d\ne0$, nên dùng Armijo trên $F$ được.

Với VD3, chọn điểm đầu khả thi mới $u=(16,-2)^T$, $g=(32,-10)^T$, $F(u)=266$. Tọa độ âm hợp lệ vì $u\in\mathbb R^2$ và bài toán không có ràng buộc dấu. Giải

$$2d_1+\eta=-32,\qquad5d_2+\eta=10,\qquad d_1+d_2=0.$$

Thế $d_2=-d_1$, trừ hai phương trình được $7d_1=-42$. Do đó $d=(-6,6)^T$, $\eta=-20$, $\delta_{eq}^2=252$. Bước đầy đủ đến $(10,4)^T$, có giá trị mục tiêu 140. Ví dụ bậc hai giải xong một bước là trường hợp đặc biệt, không là lời hứa cho $F$ tổng quát.

Nếu $u=\hat u+Nz$, $A\hat u=b$, các cột của $N\in\mathbb R^{n\times(n-p)}$ là cơ sở $\ker A$, thì $d=N\Delta z$. Nhân $N^T$ vào hàng đầu khử nhân tử:

$$N^THN\Delta z=-N^Tg.$$

VD3: $\hat u=(14,0)^T$, $N=(-1,1)^T$, $N^THN=7$, $N^Tg=-42$, $\Delta z=6$; được cùng hướng $(-6,6)^T$. Phép khử là cách giải cùng hệ KKT. Đa thức $\psi(z)=196-28z+7z^2/2$ và đại số dài đặt trong ghi chú.

### 5.5. Newton từ điểm chưa khả thi: tuyến tính hóa hai điều kiện KKT

Đặt $r_d=\nabla F(u)+A^T\nu\in\mathbb R^n$, $r_p=Au-b\in\mathbb R^p$, $r=(r_d,r_p)$. Điểm đầu trong miền nhưng có thể $r_p\ne0$. Hai dòng cần hiện trước ma trận:

$$r_d(u+d,\nu+\Delta\nu)\approx r_d+Hd+A^T\Delta\nu,$$
$$r_p(u+d)=r_p+Ad.$$

Đặt hai biểu thức mô hình bằng 0:

$$\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\Delta\nu\end{bmatrix}=-\begin{bmatrix}r_d\\r_p\end{bmatrix}.$$

Giữ cùng giả thiết $H\succ0$, $A$ đủ hạng hàng. Hàng hai chính xác vì ràng buộc affine. Ma trận giống hệ khả thi, nhưng ẩn thứ hai và vế phải khác. Với bài con mở rộng có $Ad=-r_p$, nhân tử của nó thỏa $\eta=\nu+\Delta\nu$, cả khi điểm đầu chưa khả thi. Sau bước dài $t$:

$$u^+=u+td,\qquad\nu^+=\nu+t\Delta\nu=(1-t)\nu+t\eta,\qquad r_p^+=(1-t)r_p.$$

Chỉ khi $t=1$ mới có $\nu^+=\eta$ và khôi phục đẳng thức chính xác theo số học lý tưởng. Với VD3 tại $u=(1,8)^T$, $\nu=4$: $g=(2,40)^T$, $r_d=(6,44)^T$, $r_p=-5$; giải được $d=(9,-4)^T$, $\Delta\nu=-24$, nên $u^+=(10,4)^T$, $\nu^+=-20$ khi $t=1$.

Vì sao nhận bước theo phần dư: tại điểm đầu khác $u=(0,0)^T$, $\nu=0$, có $F(u)=0<140=F^*$ nhưng $r_p=-14$. Muốn đến nghiệm khả thi, $F$ phải tăng. Với $\Delta=(d,\Delta\nu)$, hệ Newton viết $J_r\Delta=-r$; nếu $r\ne0$ thì

$$\left.\frac{d}{dt}\frac12\|r((u,\nu)+t\Delta)\|_2^2\right|_{t=0}=r^TJ_r\Delta=-\|r\|_2^2,$$
$$\left.\frac{d}{dt}\|r((u,\nu)+t\Delta)\|_2\right|_{t=0}=-\|r\|_2.$$

Quay lui kiểm miền và tiêu chí chấp nhận $\|r_{new}\|_2\le(1-\alpha t)\|r\|_2$. Vì $0<\alpha<1$ và đạo hàm tại 0 là $-\|r\|_2<-\alpha\|r\|_2$, tồn tại bước dương đủ nhỏ thỏa tiêu chí; không suy ra mọi $t$ đều được nhận. Kiểm dừng riêng $\|r_p\|_2\le\varepsilon_p$ và $\|r_d\|_2\le\varepsilon_d$. Phần dư nhỏ là chứng nhận gần thỏa KKT theo dung sai, không tự là một cận sai số mục tiêu khi chưa có giả thiết/cận bổ sung.

### 5.6. Tính tự điều chỉnh trả lời câu hỏi về sai số

Trong phần này viết gọn $\delta=\delta_N=\sqrt{d^THd}$. Định nghĩa dùng hệ số chuẩn 2: hàm lồi $C^3$ trên miền mở lồi là tự điều chỉnh nếu mọi hạn chế lên đường thẳng thỏa $|h'''|\le2(h'')^{3/2}$. Với $\varphi(s)=s-\log s$, $s>0$, có $\varphi''=1/s^2$, $|\varphi'''|=2/s^3$ nên bất đẳng thức đúng toàn miền; kiểm riêng tại $s=1/4$ không thay chứng minh đó.

**Kết quả để áp dụng, không chứng minh đầy đủ trên slide:** với hàm tự điều chỉnh lồi chặt, Hessian xác định dương, có nghiệm tối ưu trong miền, nếu độ giảm Newton $\delta<1$, thì (BV §9.6.3, (9.49))

$$f(x)-f^*\le-\delta-\log(1-\delta).$$

VD2: $\delta=3/4$ cho cận $\log4-3/4$, bằng sai số thật của ví dụ này; sự bằng nhau có chủ ý do dạng log, không phải tính chất chung. $\delta^2/2=9/32$ vẫn chỉ là giảm mô hình. Muốn dùng cận để dừng theo sai số $\varepsilon$, cần $\delta<1$ và $-\delta-\log(1-\delta)\le\varepsilon$.

Tính tự điều chỉnh bảo toàn qua hợp thành affine, nên áp dụng cho $\psi(z)=F(\hat u+Nz)$ ở bài rút gọn khi thỏa các giả thiết còn lại. Tính bất biến của bước Newton dưới phép đổi tọa độ affine khả nghịch là tính chất riêng rộng hơn, không chỉ đúng cho hàm tự điều chỉnh. Hàm $-\log s$ cũng tự điều chỉnh nhưng không đạt cực tiểu hữu hạn trên $s>0$; không bỏ giả thiết tồn tại nghiệm.

### 5.7. Các phát biểu hội tụ và giới hạn đặt trong ghi chú

Không dùng KKT để suy ra hội tụ. Với gradient bước cố định $1/L$, $f:\mathbb R^n\to\mathbb R$ lồi, có gradient $L$-Lipschitz toàn cục và có nghiệm: $f(x^k)-f^*\le L\|x^0-x^*\|^2/(2k)$, $k\ge1$. Nếu thêm lồi mạnh hệ số $\mu>0$, có cận $f(x^k)-f^*\le(1-\mu/L)^k(f(x^0)-f^*)$; phải ghi giả thiết cạnh cận. Đây không phải khẳng định về mọi dãy bước Armijo ở RG04–RG06.

Tiêu chí $\|g\|\le\varepsilon_g$ chỉ đo tính dừng gần đúng. Nếu biết hệ số lồi mạnh $\mu$, mới suy ra $f-f^*\le\|g\|^2/(2\mu)$. Newton hội tụ bậc hai cục bộ khi Hessian Lipschitz trong lân cận nghiệm và Hessian tại nghiệm xác định dương, điểm đầu đủ gần; quay lui nhận bước đầy đủ trong lân cận thích hợp. Chi phí giải hệ đặc tổng quát cỡ $O(n^3)$; cấu trúc thưa có thể khác. Với hệ khối kích thước $n+p$, ghi chi phí tổng quát $O((n+p)^3)$ và không coi đó là chi phí mọi bộ giải.

## 6. Sổ số và phép thử nhầm lẫn

| Họ ví dụ | Dữ kiện, miền/kích thước | Trung gian và đầu ra đã tính | Nguy cơ, quyết định |
|---|---|---|---|
| VD1: không ràng buộc | $x\in\mathbb R^2$, $f=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$ | $g=(6,28)^T$, $f_0=62$, $d_G=(-6,-28)^T$, $\|g\|^2=820$ | Hệ số, tọa độ, gradient, giá trị hàm đều có vai trò khác và số phân biệt. Vectơ thử $\tilde d=(-2,1)^T$ cho đạo hàm 16, không trùng $-820$. |
| VD1: nhận bước | $\alpha=1/10$, $\beta=1/2$, $t=1,1/2,1/4$ | $f_{trial}=2040,703/2,255/8$; ngưỡng $-20,21,83/2$ | Giữ phân số chính xác trong bảng; hàng nhận $1/4$ khác tham số co $1/2$. Không gọi bước $1/L=1/7$ là bước đã nhận. |
| VD1: đổi thước đo | $W=\operatorname{diag}(3,7)$ cố ý bằng Hessian hằng | $Wd=-g\Rightarrow d=(-2,-4)^T$; $v=d/\sqrt{124}$; $d^TWd=124$; chỉ ở RN04 mới gọi là $\delta_N^2$ vì $W=H$, giảm mô hình 62 | $62=f_0$ vì mô hình là hàm thật và $f^*=0$; giải thích sự trùng. Đảo dấu cho hướng tăng, bỏ $W$ cho $(-6,-28)$ khác kết quả đúng. |
| VD2: Newton phi bậc hai | $s>0$, $s^0=1/4$, $\varphi=s-\log s$ | $g=-3$, $H=16$, $d=3/16$, $s^+=7/16$, $\delta=3/4$, $\delta^2=9/16$; ba mức giảm ở §5.3 | $s$ đổi ký hiệu để không lẫn $x$ hai chiều. $1/4$ trùng bước được nhận ở VD1 nhưng được giới thiệu rõ là điểm đầu của ví dụ mới. Không đưa hai vai trò này vào cùng bảng. |
| VD3: giữ khả thi | $u\in\mathbb R^2$, $F=\tfrac12(2u_1^2+5u_2^2)$, $A=[1\ 1]$, $b=14$, $u=(16,-2)^T$ | $g=(32,-10)^T$, $F_0=266$, $d=(-6,6)^T$, $\eta=-20$, $\delta_{eq}^2=252$, $u^*=(10,4)^T$, $F^*=140$ | $d_1=-d_2$ là cấu trúc bắt buộc của $Ad=0$. Trùng độ lớn không phải lỗi; hướng không ràng buộc $(-16,2)$ bị phát hiện bởi $Ad=-14$. |
| VD3: khử | $\hat u=(14,0)^T$, $N=(-1,1)^T$, $z=-2$ | $N^THN=7$, $N^Tg=-42$, $\Delta z=6$ | Hệ số 7, gradient rút gọn −42 và số gia 6 khác nhau. Lỗi lấy âm hệ số sẽ cho −7, khác đáp án 6; lỗi quên chia cho Hessian cho 42, cũng khác. Cùng điểm đầu mới ở cả hai cách giải. |
| VD3: sửa phần dư | Đổi điểm đầu thành $u=(1,8)^T$, $\nu=4$, giữ $F,A,b$ | $g=(2,40)^T$, $r_d=(6,44)^T$, $r_p=-5$, $d=(9,-4)^T$, $\Delta\nu=-24$, $\nu^+=-20$ | Bỏ $A^T\nu$ cho sai vế phải $-40$ thay vì $-44$; nhầm $\eta$ với $\Delta\nu$ cho $-20$ thay vì $-24$. Ghi rõ $r_p=-5$ nhưng vế phải là $5$. |
| VD3: trường hợp biên | Chỉ ở RR05 đổi thành $u=(0,0)^T$, $\nu=0$ | $g=r_d=0$, $r_p=-14$, $F=0<140$ | Số 0 có chủ ý: chứng minh chỉ kiểm gradient hoặc chỉ giảm mục tiêu là sai khi chưa khả thi. Không dùng làm ví dụ tính bước chính. |
| Hồi quy Bài 03 | $X=I_2$, $y=(3,4)^T$, $\tau=1$ | $\lambda^*=2$, $w^*=(3/5,4/5)^T$, hàm mất mát 8; $\rho=4$ cho bài điều chuẩn ghép đúng | Giữ số nguồn bài cũ; $\tau$ là mức ràng buộc, $\rho$ là hệ số cho trước, $\lambda$ là nhân tử cần tìm. Không đặt ba ký hiệu ngang vai trò. |

Các số trùng giữa những họ ví dụ cách nhau không bị cấm. Cần ngăn trùng gây che lỗi ngay trong phép suy luận. Giữ nhãn, vị trí cột và đơn vị/miền; màu chỉ hỗ trợ. Các trang không dùng số ghi rõ “không áp dụng” trong storyboard.

## 7. Câu hỏi kiểm tra, đáp án và tiêu chí

Mỗi mạch có một trang kiểm tra riêng. Thời gian nghĩ/chữa là phần của dự toán nội bộ trong storyboard, không đưa lên slide hoặc ghi chú diễn giả.

| Trang | Đáp án/gợi ý phải có trong ghi chú | Tiêu chí đánh giá |
|---|---|---|
| RP04 | $L=F+\nu^T(Au-b)$; $\nabla F+A^T\nu=0$, $Au=b$; $\nu$ tự do; $Ad=d_1+d_2$; hướng giữ khả thi khi $d_1+d_2=0$ | Đúng hai nhóm, dấu nhân tử và tự tìm điều kiện của hướng. |
| RG11 | $Wd=-g$, $d=(-2,-4)^T$; $\|v\|_W=1$ với $v=d/\sqrt{124}$. Armijo dừng thử ngay khi nhận $1/4$, không thử tiếp $1/8$ | Phân biệt hướng/chuẩn hóa/bước; tự suy ra hệ từ $Q_W$. |
| RN07 | $d=3/16$, $s^+=7/16$, $\varphi'=-9/7$; $9/32$ là giảm mô hình, không là sai số thật $\log4-3/4$ | Không suy nghiệm của bài gốc từ nghiệm mô hình; nêu đúng phép trừ. |
| RE08 | $L_m=g^Td+d^THd/2+\eta^TAd$; hai đạo hàm cho hệ khối; dùng $N^TA^T=0$ được $N^THN\Delta z=-N^Tg$ | Viết và giải thích nguồn gốc từng hàng, không chỉ chép ma trận. |
| RR07 | $-44=-(40+4)$, $5=-(-5)$; $\Delta\nu=-24$ còn $\eta=4-24=-20$. Dừng cần cả $\|r_p\|\le\varepsilon_p$, $\|r_d\|\le\varepsilon_d$ | Không lẫn gradient/phần dư, nhân tử/số gia; kiểm cả hai điều kiện KKT. |
| RS05 | $-\log s$ giảm không bị chặn dưới, không có cực tiểu; $s-\log s$ đạt min tại 1. Không thay $\delta$ bằng $\delta^2$ trong biểu thức cận. Riêng điều kiện $\delta<1$ và $\delta^2<1$ tương đương vì $\delta\ge0$ | Phân biệt điều kiện tồn tại nghiệm, giảm mô hình, cận sai số và cách đọc ký hiệu. |
| RZ02 | Với $M\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, $A\in\mathbb R^{p\times n}$ đủ hạng hàng, $\rho>0$: $g=M^T(Mw-y)+\rho w$, $H=M^TM+\rho I\succ0$; KKT $g+A^T\nu=0,Aw=b$; $r_d=g+A^T\nu,r_p=Aw-b$; dùng hệ RR03 | Tự chuyển quy trình sang mô hình học, có kích thước và giả thiết; không cần đã học thuật toán mới. |

RZ02 thực hiện hai mốc: (1) tính $g,H$ và viết KKT; (2) điền $r_d,r_p$ vào mẫu hệ đã học, không phải tái suy Jacobian. Dành 0.15 tiết BT cho RZ02 thay 0.10; giảm RG11 từ 0.20 xuống 0.15, tổng BT vẫn 1 tiết. Ghi chú RZ02 có phép liên hệ cụ thể: $M=\operatorname{diag}(1,2)$, $y=0$, $\rho=1$, $A=[1\ 1]$, $b=14$ cho $H=\operatorname{diag}(2,5)$ và đúng VD3. Bài toán điều chuẩn chỉ là ứng dụng lại các đạo hàm đã dùng, không mở thêm mạch kiến thức ở kết luận.


## Lưu vết đặc tả trước mạch KKT — không còn điều khiển HTML

## Đặc tả cũ

## Trạng thái bản 2026-09-24

Đây là đặc tả của dàn bài mới46trang, chưa phản ánh HTML40trang đang công bố. Dùng cùng [outline.md](outline.md) và [storyboard.md](storyboard.md). Các ví dụ VD1–VD3 là ví dụ sư phạm tự xây dựng; nguồn BV/M16/M17 cung cấp cơ chế toán, không phải nguồn các số mới. Kết quả tính bằng phân số chính xác và phép thế hệ tuyến tính; không coi báo cáo worker là bằng chứng tự đủ.

## Kiểu, giả thiết và quy ước

Mặc định $x,g,d\in\mathbb R^n$ là vectơ cột, $H\in\mathbb R^{n\times n}$ đối xứng. Với đẳng thức: $u\in\mathbb R^n$, $A\in\mathbb R^{p\times n}$ hạng hàng đầy đủ, $p<n$, $b,\nu,r_p\in\mathbb R^p$, $r_d\in\mathbb R^n$. Dữ liệu mô hình học: $M\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, $\rho>0$; ký hiệu m không dùng lại cho hằng số lồi mạnh.

Dùng $\mu$ cho hằng số lồi mạnh, $L$ cho Lipschitz của gradient, $L_H$ cho Lipschitz của Hessian; $\alpha=1/10,\beta=1/2$ cho quay lui; t là độ dài bước. $\delta_N$ là độ giảm Newton không ràng buộc, $\delta_{eq}$ cho chế độ khả thi. $\eta$ là nhân tử mô hình khả thi; $\Delta\nu$ là hiệu chỉnh nhân tử ở Newton phần dư; hai đối tượng này không được trộn.

Phân biệt lồi, lồi chặt (còn gọi là lồi nghiêm ngặt), lồi mạnh và Hessian xác định dương. Tuyến Newton dùng giả thiết đủ $H\succ0$. Đẳng thức trong bài là affine; không mở rộng kết luận sang đẳng thức phi tuyến. Phép giải hệ là thao tác triển khai; công thức nghịch đảo chỉ dùng khi phân tích. Không dùng Cholesky cho toàn ma trận KKT bất định.

## Sổ số và kiểm tra trùng vai trò

| Ví dụ | Dữ kiện cố định | Đại lượng dẫn xuất cần giữ nhãn | Lý do chọn và giới hạn |
|---|---|---|---|
| VD1 | Hệ số3,7; $x^0=(2,4)$ | $g=(6,28)$; $f_0=62$; $\|g\|^2=820$; $d_G=(-6,-28)$; $d_N=(-2,-4)$ | Tọa độ, độ cong và gradient không trùng nhau. Dùng d_G/d_N để tránh nhầm hai hướng cùng điểm. $\kappa=7/3$ chỉ minh họa độ cong không đều. |
| VD2 | $\varphi(s)=s-\log s$, $s^0=1/4$ | $g=-3,H=16$, $d_N=3/16$, $s^1=7/16$, $\delta^2=9/16$, $\delta^2/2=9/32$ | Tránh điểm1/2 và1/3 vì d_N có thể trùng δ² hoặc δ²/2. Phân số giữ tính tay đơn giản; sai số thật tách riêng. |
| VD3 | Hệ số2,5; tổng14; khởi đầu khả thi(3,11), chưa khả thi(1,8), $\nu^0=4$ | Nghiệm(10,4); $\nu^*=-20$; bước khả thi(7,-7); bước chưa khả thi(9,-4), $\Delta\nu=-24$ | Nghiệm không nằm giữa đường tổng; khởi đầu và bước không bằng nghiệm. Dữ kiện hai chế độ được đặt trong bảng có nhãn. |

Không áp quy tắc “mọi số trên toàn bài phải khác nhau”. Một số trùng là hệ quả cần dạy: $-d_N=x^0$ trong VD1 vì nghiệm0; giảm mô hình62 bằng sai số thật62 vì hàm bậc hai; hai thành phần d khả thi đối dấu cùng độ lớn do $Ad=0$; $\eta=\nu^*=-20$ trong bài bậc hai. Giữ các đẳng thức này, giải thích bằng nhãn và phép suy luận. Số4 là thành phần nghiệm VD3 và nhân tử ban đầu được ghi đúng bối cảnh; không đặt cạnh nhau không nhãn. Không cần thay số chỉ để đạt khác biệt hình thức.

### VD1 — Hai hướng phải được kiểm riêng

$$
f(x)=\tfrac12(3x_1^2+7x_2^2),\quad x^0=(2,4)^T,\quad g=(6,28)^T.
$$

| t trên hướng gradient | Điểm thử | Giá trị f | Ngưỡng $62-82t$ | Kết quả |
|---|---|---:|---:|---|
| 1 | $(-4,-24)$ | 2040 | -20 | loại |
| 1/2 | $(-1,-10)$ | $703/2$ | 21 | loại |
| 1/4 | $(1/2,-3)$ | $255/8$ | $83/2$ | nhận |

Trên hướng Newton $d_N=(-2,-4)$, $\delta_N^2=124$; t=1 cho f=0 và ngưỡng $62-12{,}4=49{,}6$, nên nhận ngay. Hai bảng không dùng chung hệ số góc Armijo. Quỹ đạo cố định t=1/4 ở B01 là minh họa riêng, không suy đoán mọi vòng quay lui trả cùng t. Bảo đảm B05 áp dụng bước1/L, không gán sang t=1/4.

### VD2 — Sai số mô hình và sai số thật

$$
\varphi^\prime(s)=1-1/s,\quad \varphi^{\prime\prime}(s)=1/s^2,\quad \varphi^{\prime\prime\prime}(s)=-2/s^3.
$$

Tại $s^0=1/4$: $d_N=3/16$, $s^1=7/16$, $\delta_N^2=9/16$, $\delta_N^2/2=9/32=0{,}28125$. Sai số thật tại điểm đầu là $\varphi(1/4)-\varphi(1)=\log4-3/4\approx0{,}636294$. Mức giảm của một bước là $\log(7/4)-3/16\approx0{,}372116$; ba đại lượng không đổi tên cho nhau. Bước đầy đủ thỏa Armijo vì mức giảm yêu cầu chỉ là $\alpha\delta_N^2=0{,}05625$.

Tính tự điều chỉnh kiểm cho mọi s>0 bằng $|\varphi^{\prime\prime\prime}|=2(\varphi^{\prime\prime})^{3/2}$, không bằng một phép thử tại1/4. $-\log s$ có cùng đạo hàm bậc hai/ba nhưng không có cực tiểu hữu hạn, nên là phản ví dụ cho việc suy tồn tại nghiệm từ tính tự điều chỉnh.

### VD3 — Khử, Newton khả thi và Newton phần dư

$$
F(u)=\tfrac12(2u_1^2+5u_2^2),\quad A=[1\;1],\quad b=14.
$$

Khử: $\hat u=(14,0)$, $N=(-1,1)^T$, $u=\hat u+Nz$; $\psi(z)=196-28z+(7/2)z^2$. Nghiệm $z^*=4$, $u^*=(10,4)$, $\nu^*=-20$, $F^*=140$.

Khả thi: $u^0=(3,11)$, $g=(6,55)$, $F_0=623/2$. $d=(7,-7)$, $\eta=-20$ thỏa $Hd+A^T\eta=-g$, $Ad=0$. $\delta_{eq}^2=343$, giảm mô hình343/2 bằng $F_0-F^*$ vì bài bậc hai.

Chưa khả thi: $u^0=(1,8)$, $\nu^0=4$, $g=(2,40)$; **sau cộng** $A^T\nu$ mới có $r_d=(6,44)$, $r_p=-5$. Hệ và phép thế:

$$
\begin{bmatrix}2&0&1\\0&5&1\\1&1&0\end{bmatrix}
\begin{bmatrix}9\\-4\\-24\end{bmatrix}
=\begin{bmatrix}-6\\-44\\5\end{bmatrix}.
$$

Vì thế $u^1=(10,4)$, $\nu^1=-20$, hai phần dư đều0. Vế phải thứ hai là -44, không phải -40. Một báo cáo worker trước đó tính đúng rd=(6,44) nhưng đổi sang-40 khi giải; điều phối bác kết luận sai đó bằng phép thế trên.

## Danh mục hình thức hóa và mức chứng minh

| Mã; vị trí | Loại và phát biểu dùng | Giả thiết quyết định | Mức chứng minh; nguồn |
|---|---|---|---|
| HT1; A04 | Định nghĩa hướng giảm $g^Td<0$; hệ quả bước đủ nhỏ giảm hàm | f khả vi quanh x trong miền mở | Phác thảo khai triển bậc nhất; BV§9.2, M16 10–5 |
| HT2; A05–07 | Thuật toán Armijo với kiểm miền và bất đẳng thức giảm đủ | gᵀd<0; α∈(0,1/2),β∈(0,1); khả vi | Chứng minh kết thúc từ đạo hàm hướng; BV§9.2.1, M16 10–6 |
| HT3; B03–04 | Định nghĩa giảm dốc nhất chuẩn hóa; quy ước dạng không chuẩn hóa; trường hợp W giải Wd=-g | g≠0; W đối xứng xác định dương | Cauchy–Schwarz cho Euclid/W; chuẩn đối ngẫu chỉ phát biểu đủ dùng; BV§9.4, M16 10–11 đến10–13 |
| HT4; B05 | Mệnh đề: với bước1/L, sai số hàm bị chặn bởi $(1-\mu/L)^k$ lần sai số đầu | f lồi mạnh μ, gradient Lipschitz L trên toàn miền xét chứa các đoạn/bước; nghiệm đạt được | Phác thảo bổ đề giảm và chặn gradient; không đồng nhất với đường hội tụ thực nghiệm; BV§9.3 |
| HT5; C03 | Mệnh đề: q có nghiệm duy nhất Hd=-g; gᵀd=-dᵀHd<0 khi g≠0 | H≻0 | Chứng minh đầy đủ hai dòng bằng đạo hàm q và tính xác định dương; BV§9.5.1 |
| HT6; C04,C08 | Định nghĩa δ và đẳng thức giảm mô hình δ²/2 | H≻0, d nghiệm hệ Newton | Thay Hd=-g vào q; VD2 bác việc đồng nhất sai số thật; BV§9.5.1 |
| HT7; C05 | Thuật toán Newton quay lui; dừng theo mô hình | điểm đầu trong miền, H≻0 tại các lần lặp, Armijo hợp lệ | Giải thích từng bước, không chứng nhận khoảng cách nghiệm chỉ từ δ²/2; BV§9.5.2,9.7 |
| HT8; C06 | Mệnh đề hội tụ hai pha và bậc hai cục bộ | f hai lần khả vi liên tục; tập mức ban đầu đóng nằm trong miền; lồi mạnh; Hessian Lipschitz, chặn trên/dưới trên vùng xét | Phác thảo dùng sai số tuyến tính hóa; xem công thức(9.31)–(9.33), BV§9.5.3. Không áp cho hàm phi lồi |
| HT9; D03–05 | Định nghĩa tự điều chỉnh một biến và qua mọi đường trong đa biến; tính bất biến affine | lồi, C³, miền mở lồi; xét trong miền hợp lệ | Chứng minh trường hợp log và đổi biến một chiều; không giảng tensor hay chứng minh toàn bộ cận số vòng; BV§9.6, M16 10–25,10–26 |
| HT10; E04 | Tham số hóa u=uhat+Nz; gradient/Hessian rút gọn | A hạng p<n, Auhat=b, N cơ sở ker A | Chứng minh biểu diễn và quy tắc dây chuyền; BV§10.1.2 |
| HT11; E06 | Hệ Newton khả thi và khả nghịch của hệ khối | u khả thi, H≻0, A hạng hàng đầy đủ | Chứng minh bằng nhân dᵀ rồi dùng hạng A; BV§10.2.1 |
| HT12; E07 | Độ giảm khả thi δeq²=dᵀHd; vòng Newton bảo toàn Au=b | hệ E06, Armijo trên F, kiểm miền | Chứng minh Ad=0⇒A(u+td)=b; dừng chỉ theo mô hình; BV§10.2 |
| HT13; E10–12 | Newton cho r=(rd,rp); Jacobian là hệ KKT; quay lui theo chuẩn phần dư | f C², H≻0, A hạng đầy đủ; điểm đầu trong miền. Khi phát biểu hội tụ cần tính đều Jacobian và nghiệm, không tự suy từ hệ khả nghịch | Tuyến tính hóa rd,rp; phép thế VD3; BV§10.3.1–10.3.2. Không khẳng định hội tụ từ mọi điểm đầu |

BV là Boyd và Vandenberghe, *Convex Optimization* (2004), chương9 trang in457–520, chương10 trang521–560; bản PDF cục bộ lệch+14 trang so với số in. Đọc mục cụ thể theo bảng trên. M16/M17 được truy nguyên trong source-map.md; trang PDF của hai bộ MIT trùng chỉ số sau dấu gạch ở nhãn10–k/11–k, giấy phép ở trang cuối.

### Kiểm riêng hệ số hội tụ ở B05

Đặt $e=f(x)-f^*$. Bổ đề giảm với bước1/L cho $e^+\le e-\|g\|_2^2/(2L)$. Tính lồi mạnh cho $\|g\|_2^2\ge2\mu e$. Thế vào được $e^+\le e-(\mu/L)e=(1-\mu/L)e$. Hệ số2 triệt tiêu; không phải $1-2\mu/L$. Nhận xét của reviewer đề xuất hệ số sau đã bị bác bằng phép thế này.

## Thuật toán, dừng và chi phí cần giữ khi triển khai

Gradient/chuẩn W: kiểm gradient, tạo d, tìm t, cập nhật; g=0 thì dừng. Nếu có lồi mạnh μ, chặn sai số hàm bởi $\|g\|^2/(2\mu)$ có thể biến dung sai gradient thành chứng nhận; nếu thiếu μ thì chỉ ghi dừng theo chuẩn gradient. Mỗi vòng có chi phí tính gradient và số lần đánh giá hàm; với W còn có chi phí giải hệ.

Newton không ràng buộc: giải H d=-g bằng phân tích phù hợp, không nghịch đảo; tính δ² và kiểm trước cập nhật. H đặc dương tổng quát có chi phí phân tích bậc n³ và bộ nhớ bậc n²; cấu trúc thưa/đường chéo thay đổi chi phí. Newton đẳng thức dùng hệ bất định n+p hoặc khử; không gán chi phí Cholesky n³ cho toàn hệ KKT.

Newton phần dư: đầu vào u0 trong miền, ν0,α,β,εd,εp,giới hạn vòng. Lặp tính rd,rp; dừng khi cả hai chuẩn đạt dung sai; giải hệ; thử miền rồi điều kiện giảm chuẩn r; cập nhật đồng thời u,ν. Các bảo đảm dùng phần dư chưa chuẩn hóa theo nguồn; thực hành phải chú ý tỷ lệ/đơn vị khi gộp hai phần dư. Nếu không nhận được bước hoặc hết vòng, trả trạng thái chưa đạt, không trả nhãn tối ưu.
