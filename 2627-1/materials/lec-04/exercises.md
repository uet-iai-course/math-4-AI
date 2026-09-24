# Bài 04 — Tập bài tập: hướng giảm, Newton và ràng buộc đẳng thức

Bài tập bám theo bài giảng 04: hướng giảm và quay lui Armijo, hướng dốc nhất, phương pháp Newton, tự điều chỉnh, khử ràng buộc đẳng thức, Newton khả thi và Newton phần dư, và một mô hình học có chính quy hóa bậc hai và ràng buộc đẳng thức. Mỗi bài có đủ dữ kiện ngay trong đề; các bộ số là ví dụ sư phạm tự xây dựng. Nguồn cơ chế toán: Boyd–Vandenberghe, *Convex Optimization* (2004), chương 9 (tr. 457–520) và chương 10 (tr. 521–560), [Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/) ; MIT 6.079, bài giảng 16 và 17, [MIT 6.079, Fall 2009](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/) . Hãy tự làm phép tính trước khi mở lời giải.

::: exercise
**Bài 1 (nhận biết).** Cho $f(x)=\tfrac12(3x_1^2+7x_2^2)$, điểm đầu $x^0=(2,4)^T$ nên $g=\nabla f(x^0)=(6,28)^T$, $f_0=62$, $\|g\|^2=820$. Hướng gradient là $d_G=(-6,-28)^T$. Với tham số Armijo $\alpha=1/10$, $\beta=1/2$, điều kiện nhận bước $t$ là $f(x^0+td_G)\le 62-\alpha t\,\|g\|^2=62-82t$. Hãy lập bảng thử $t=1$, $t=1/2$, $t=1/4$: tính điểm thử, giá trị $f$, so với ngưỡng, và kết luận nhận/loại. Chỉ ra bước đầu tiên được nhận.
:::

::: hint
Tính từng điểm thử: $x^0+td_G$. Với $t=1/4$ điểm thử là $(1/2,-3)$. So sánh giá trị $f$ với $62-82t$.
:::

::: solution
Với $t=1$: điểm thử $(-4,-24)$, $f=\tfrac12(3\cdot16+7\cdot576)=\tfrac12(48+4032)=2040$; ngưỡng $62-82=-20$. Vì $2040>-20$, loại.

Với $t=1/2$: điểm thử $(-1,-10)$, $f=\tfrac12(3+700)=703/2$; ngưỡng $62-41=21$. Vì $703/2>21$, loại.

Với $t=1/4$: điểm thử $(1/2,-3)$, $f=\tfrac12(3/4+63)=255/8$; ngưỡng $62-82/4=83/2$. Vì $255/8=31{,}875\le 41{,}5$, nhận.

Vậy quay lui trả $t=1/4$. Ý nghĩa: hướng gradient giảm dần nhưng độ cong theo $x_2$ lớn khiến bước dài làm hàm tăng; Armijo chỉ chấp nhận bước đủ ngắn để giảm thật. Lưu ý đây là bảng riêng cho hướng gradient; trên hướng Newton cùng điểm, hệ số góc của ngưỡng là khác, hai bảng không dùng chung hệ số.
:::

::: exercise
**Bài 2 (tính toán/chứng minh).** (a) Với $g\ne0$ trong $\mathbb R^n$, tìm hướng dốc nhất không chuẩn hóa bằng bài toán $\min_{d\ne0}\frac{g^Td}{\|d\|_2}$ và chứng minh bằng bất đẳng thức Cauchy–Schwarz rằng giá trị tối ưu là $-\|g\|_2$, đạt tại $d=-g$. (b) Giả sử $W$ đối xứng xác định dương. Xét bài toán $\min_{d\ne0}\frac{g^Td}{\|d\|_W}$ với $\|d\|_W=(d^TWd)^{1/2}$. Chứng minh giá trị tối ưu là $-\sqrt{g^TW^{-1}g}$ và hướng tối ưu (không chuẩn hóa) là nghiệm của $Wd=-g$, tức $d=-W^{-1}g$.
:::

::: hint
(a) Dùng $g^Td\ge-\|g\|_2\|d\|_2$ và đẳng thức khi $d=-g$. (b) Với $W\succ0$, $W^{1/2}$ là căn bậc hai đối xứng xác định dương của $W$ (thu được bằng phân rã trị riêng). Đổi biến $u=W^{1/2}d$ để đưa về dạng Euclid, hoặc kiểm trực tiếp bất đẳng thức $g^Td\ge-\sqrt{g^TW^{-1}g}\,\|d\|_W$ bằng Cauchy–Schwarz trên các vectơ $W^{-1/2}g$ và $W^{1/2}d$.
:::

::: solution
(a) Cauchy–Schwarz cho $|g^Td|\le\|g\|_2\|d\|_2$, nên $g^Td\ge-\|g\|_2\|d\|_2$, tức tỉ số $\ge-\|g\|_2$. Đẳng thức xảy ra khi $d$ cùng phương ngược dấu với $g$, ví dụ $d=-g$; khi đó $g^Td=-\|g\|_2^2$ và $\|d\|_2=\|g\|_2$, tỉ số bằng $-\|g\|_2$. Vậy hướng không chuẩn hóa là $d=-g$, còn hướng đơn vị là $v=-g/\|g\|_2$.

(b) Viết $g^Td=(W^{-1/2}g)^T(W^{1/2}d)$. Cauchy–Schwarz cho
$$g^Td\ge-\|W^{-1/2}g\|_2\,\|W^{1/2}d\|_2=-\sqrt{g^TW^{-1}g}\,\|d\|_W.$$
Đẳng thức khi $W^{1/2}d$ cùng phương ngược dấu với $W^{-1/2}g$, tức $d=-c\,W^{-1}g$ với $c>0$; tỉ số không phụ thuộc $c$, nên có thể lấy $c=1$, cho $d=-W^{-1}g$, thỏa $Wd=-g$. Ý nghĩa: chuẩn $W$ thay đổi khái niệm "dốc nhất"; khi $W=H\succ0$ (Hessian), hướng này chính là hướng Newton. Hướng chuẩn hóa theo chuẩn $W$ là $v=-W^{-1}g/\sqrt{g^TW^{-1}g}$. Với $W=\operatorname{diag}(3,7)$, $g=(6,28)^T$, ta có $d=(-2,-4)^T$ và $v=(-2,-4)^T/\sqrt{124}$.
:::

::: exercise
**Bài 3 (chứng minh).** Cho $q(d)=f(x)+g^Td+\tfrac12 d^THd$ với $H$ đối xứng xác định dương ($H\succ0$) và $g\ne0$. (a) Chứng minh $q$ có nghiệm duy nhất của điều kiện tối ưu và nghiệm đó thỏa $Hd=-g$. (b) Chứng minh rằng với nghiệm $d$ này, $g^Td=-d^THd<0$, tức hướng Newton là hướng giảm.
:::

::: hint
(a) $\nabla q(d)=g+Hd$; giải hệ. (b) Nhân $Hd=-g$ với $d^T$ ở hai vế.
:::

::: solution
(a) Vì $H\succ0$, $H$ khả nghịch, nên hệ $Hd=-g$ có nghiệm duy nhất $d=-H^{-1}g$. Với nghiệm này $\nabla q(d)=g+Hd=0$; hơn nữa $q$ lồi chặt (còn gọi là lồi nghiêm ngặt) vì Hessian $H\succ0$, nên điểm dừng là cực tiểu duy nhất toàn cục của $q$.

(b) Nhân $Hd=-g$ trái với $d^T$: $d^THd=-g^Td$, tức $g^Td=-d^THd$. Vì $d\ne0$ (nếu $d=0$ thì $g=0$, mâu thuẫn) và $H\succ0$, ta có $d^THd>0$, suy ra $g^Td<0$. Ý nghĩa: điều kiện tối ưu của mô hình bậc hai tự động bảo đảm hướng giảm của $f$; đây là lý do Newton hợp lệ khi Hessian xác định dương.
:::

::: exercise
**Bài 4 (tính toán).** Cho $\varphi(s)=s-\log s$ trên $s>0$, điểm đầu $s^0=1/4$. (a) Tính $\varphi'(s)$, $\varphi''(s)$, từ đó $g$, $H$ tại $s^0$ và bước Newton $d_N$, điểm mới $s^1$. (b) Tính độ giảm Newton $\delta_N^2$ và $\delta_N^2/2$. (c) Tính sai số thật $\varphi(s^0)-\varphi(1)$, mức giảm thật của một bước $\varphi(s^0)-\varphi(s^1)$, và kiểm tra bước đầy đủ $t=1$ có thỏa Armijo với $\alpha=1/10$ không. (d) Nêu rõ vì sao ba đại lượng ở (b) và (c) không được đồng nhất.
:::

::: hint
$\varphi'(s)=1-1/s$, $\varphi''(s)=1/s^2$. Tại $s^0=1/4$: $g=-3$, $H=16$. Bước Newton là $d_N=-g/H$. Sai số thật cần giá trị $\varphi(1)=1$.
:::

::: solution
(a) $\varphi'(s)=1-1/s$, $\varphi''(s)=1/s^2$. Tại $s^0=1/4$: $g=\varphi'(1/4)=1-4=-3$, $H=\varphi''(1/4)=16$. Bước Newton $d_N=-g/H=3/16$, nên $s^1=s^0+d_N=1/4+3/16=7/16$.

(b) $\delta_N^2=g^TH^{-1}g=9/16$ (kiểm: $g^Td_N=(-3)(3/16)=-9/16$, lấy đối dấu theo đẳng thức $\delta_N^2=-g^Td_N$). Do đó $\delta_N^2/2=9/32=0{,}28125$.

(c) Sai số thật tại điểm đầu: $\varphi(1/4)-\varphi(1)=(1/4+\log4)-1=\log4-3/4\approx0{,}636294$. Mức giảm thật của một bước: $\varphi(1/4)-\varphi(7/16)=\log(7/4)-3/16\approx0{,}372116$. Điều kiện Armijo cho bước đầy đủ: cần $\varphi(1/4)-\varphi(s^1)\ge\alpha\,\delta_N^2=0{,}05625$; vì $0{,}372116\ge0{,}05625$, bước $t=1$ được nhận.

(d) $\delta_N^2/2$ là giảm dự đoán của mô hình bậc hai; sai số thật $\log4-3/4$ là khoảng cách tới giá trị tối ưu $\varphi(1)=1$; mức giảm một bước $\log(7/4)-3/16$ là lượng $\varphi$ giảm thật sau một lần lặp. Ba số $0{,}28125$, $0{,}636294$, $0{,}372116$ đo ba thứ khác nhau; trùng nhau với hàm bậc hai khi bước Newton đầy đủ tới nghiệm.
:::

::: exercise
**Bài 5 (vận dụng).** (a) Với $\varphi(s)=s-\log s$, chứng minh tính tự điều chỉnh một biến: $|\varphi'''(s)|=2(\varphi''(s))^{3/2}$ cho mọi $s>0$. Giải thích ý nghĩa: điều này kiểm soát biến thiên độ cong tương đối bằng một điều kiện trên toàn miền, không phải một phép thử tại một điểm. (b) Xét $\tilde\varphi(s)=-\log s$ trên $s>0$. Tính $\tilde\varphi''$ và $\tilde\varphi'''$, chỉ ra nó cũng thỏa cùng đẳng thức tự điều chỉnh, nhưng $\tilde\varphi$ không có cực tiểu hữu hạn. Rút ra phản ví dụ này bác kết luận gì?
:::

::: hint
Tính đạo hàm bậc ba của $s-\log s$ và của $-\log s$. Nhớ rằng $-\log s\to+\infty$ khi $s\to0^+$ và $\to-\infty$ khi $s\to\infty$.
:::

::: solution
(a) $\varphi'''(s)=-2/s^3$ và $\varphi''(s)=1/s^2$, nên $(\varphi''(s))^{3/2}=1/s^3$ và $2(\varphi''(s))^{3/2}=2/s^3=|\varphi'''(s)|$ với mọi $s>0$. Ý nghĩa: điều kiện kiểm soát biến thiên độ cong tương đối trên toàn miền; để suy ra một bảo đảm hội tụ của Newton còn phải kiểm tra giả thiết của định lý, gồm tính xác định dương của Hessian và sự tồn tại của nghiệm.

(b) $\tilde\varphi'(s)=-1/s$, $\tilde\varphi''(s)=1/s^2$, $\tilde\varphi'''(s)=-2/s^3$, nên $|\tilde\varphi'''(s)|=2/s^3=2(\tilde\varphi''(s))^{3/2}$: cùng đẳng thức tự điều chỉnh. Nhưng $\tilde\varphi(s)\to+\infty$ khi $s\to0^+$ và $\tilde\varphi(s)\to-\infty$ khi $s\to\infty$, nên không có cực tiểu hữu hạn. Phản ví dụ này bác kết luận "tính tự điều chỉnh suy ra tồn tại nghiệm": tự điều chỉnh chỉ kiểm soát độ cong tương đối, không bảo đảm hàm bị chặn dưới và đạt giá trị nhỏ nhất.
:::

::: exercise
**Bài 6 (tính toán).** Cho $F(u)=\tfrac12(2u_1^2+5u_2^2)$ với ràng buộc đẳng thức $u_1+u_2=14$, tức $A=[1\;\;1]$, $b=14$. (a) Tham số hóa miền khả thi bằng $\hat u=(14,0)^T$ và $N=(-1,1)^T$: kiểm tra $A\hat u=b$, $AN=0$, và viết $u=\hat u+Nz$. (b) Rút gọn thành $\psi(z)=F(\hat u+Nz)$, tính $\psi(z)=196-28z+\tfrac72 z^2$, tìm $z^*$, nghiệm $u^*$, giá trị $F^*$ và nhân tử $\nu^*$. (c) Kiểm tra điều kiện tối ưu $2u_1+\nu=0$, $5u_2+\nu=0$ tại $(u^*,\nu^*)$.
:::

::: hint
$\psi(z)=\tfrac12\big(2(14-z)^2+5z^2\big)$. Khảo sát đạo hàm $\psi'(z)=-28+7z$.
:::

::: solution
(a) $A\hat u=14+0=14=b$; $AN=[1\;\;1]\begin{pmatrix}-1\\1\end{pmatrix}=0$. Mọi $u=\hat u+Nz=(14-z,\,z)^T$ thỏa $u_1+u_2=14$, và mọi điểm khả thi có dạng này vì $N$ sinh không gian rỗng của $A$.

(b) $\psi(z)=\tfrac12\big(2(14-z)^2+5z^2\big)=\tfrac12(392-56z+2z^2+5z^2)=196-28z+\tfrac72 z^2$. $\psi'(z)=-28+7z=0$ cho $z^*=4$; $\psi''=7>0$ nên là cực tiểu. Vậy $u^*=(10,4)^T$, $F^*=\tfrac12(2\cdot100+5\cdot16)=140$.

(c) Nhân tử: từ điều kiện tối ưu $\nabla F(u^*)+A^T\nu=0$: $2\cdot10+\nu=0$ và $5\cdot4+\nu=0$ cùng cho $\nu^*=-20$. Cả hai phương trình thỏa, khớp với nghiệm của bài khử. Ý nghĩa: khử và nhân tử Lagrange cho cùng nghiệm; khử tiện khi $n-p$ nhỏ và cơ sở $N$ dễ xây dựng, hệ KKT tiện khi cần nhân tử.
:::

::: exercise
**Bài 7 (tính toán).** Vẫn bài toán Bài 6: $F(u)=\tfrac12(2u_1^2+5u_2^2)$, $u_1+u_2=14$. (a) **Chế độ khả thi:** từ $u^0=(3,11)^T$ (thỏa $Au^0=b$), tính $g=\nabla F(u^0)$, $F_0$, rồi giải hệ Newton khả thi $Hd+A^T\eta=-g$, $Ad=0$ với $H=\mathrm{diag}(2,5)$. Chứng minh $d=(7,-7)^T$, $\eta=-20$ là nghiệm; tính độ giảm khả thi $\delta_{eq}^2=d^THd$ và so sánh giảm mô hình $\delta_{eq}^2/2$ với $F_0-F^*$. (b) **Chế độ chưa khả thi:** từ $u^0=(1,8)^T$, $\nu^0=4$, tính phần dư $r_d=\nabla F(u^0)+A^T\nu^0$ và $r_p=Au^0-b$; giải hệ Newton phần dư
$$\begin{bmatrix}2&0&1\\0&5&1\\1&1&0\end{bmatrix}\begin{bmatrix}d_1\\d_2\\\Delta\nu\end{bmatrix}=-\begin{bmatrix}r_d\\r_p\end{bmatrix},$$
chứng minh bằng phép thế rằng $d=(9,-4)^T$, $\Delta\nu=-24$, và kiểm tra $u^1=u^0+d$, $\nu^1=\nu^0+\Delta\nu$ thỏa cả hai phần dư bằng 0.
:::

::: hint
(a) $g=(6,55)^T$; ba phương trình: $2d_1+\eta=-6$, $5d_2+\eta=-55$, $d_1+d_2=0$. (b) Nhớ cộng $A^T\nu^0$ vào gradient **trước** khi tính $r_d$; vế phải của hàng khối ràng buộc là $-r_p$, với $r_p=-5$.
:::

::: solution
(a) $g=(2\cdot3,\,5\cdot11)^T=(6,55)^T$, $F_0=\tfrac12(18+605)=623/2$. Hệ: $2d_1+\eta=-6$, $5d_2+\eta=-55$, $d_1+d_2=0$. Từ $d_2=-d_1$: trừ hai phương trình $2d_1-5d_2=49$, thay $d_2=-d_1$: $7d_1=49$, $d_1=7$, $d_2=-7$; $\eta=-6-14=-20$. Kiểm: $Ad=(7-7)=0$. Vậy $d=(7,-7)^T$, $\eta=-20$.

Độ giảm khả thi $\delta_{eq}^2=d^THd=2\cdot49+5\cdot49=343$, giảm mô hình $343/2$. Vì bài bậc hai, mô hình trùng $F$ trên hướng bước, nên giảm thật một bước đầy đủ đúng bằng $F_0-F^*=623/2-140=343/2$: hai đại lượng trùng, và đây là hệ quả cần dạy của trường hợp bậc hai, không phải quy tắc chung. Mỗi vòng Newton khả thi giữ $A(u+td)=Au^0+t\,Ad=b$, nên tính khả thi được bảo toàn.

(b) Tại $u^0=(1,8)$: $\nabla F=(2,40)^T$; **sau khi cộng** $A^T\nu^0=(4,4)^T$ ta được $r_d=(6,44)^T$; $r_p=Au^0-b=9-14=-5$. Hệ cần giải có vế phải $(-6,-44,5)^T$. Phép thế $d=(9,-4)$, $\Delta\nu=-24$:
- Hàng 1: $2\cdot9+0+(-24)=18-24=-6$. 
- Hàng 2: $0+5\cdot(-4)+(-24)=-20-24=-44$.  (vế phải là $-44$, không phải $-40$: sai lầm phổ biến là quên cộng nhân tử vào gradient.)
- Hàng 3: $9+(-4)=5=-r_p$. 

Vậy $u^1=(1+9,\,8-4)=(10,4)^T=u^*$ và $\nu^1=4-24=-20=\nu^*$. Kiểm phần dư mới: $\nabla F(u^1)+A^T\nu^1=(20,20)+(-20,-20)=(0,0)$, $Au^1-b=0$. Cả hai phần dư triệt tiêu sau một bước — đúng như kỳ vọng của Newton trên bài bậc hai, nơi tuyến tính hóa là chính xác.
:::

::: exercise
**Bài 8 (vận dụng).** Bài toán bình phương tối thiểu chính quy hóa có ràng buộc: cho dữ liệu $M\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, tham số $\rho>0$, ma trận ràng buộc $A\in\mathbb R^{p\times n}$ có hạng hàng đầy đủ và $b\in\mathbb R^p$,
$$\min_{w\in\mathbb R^n}\ \tfrac12\|Mw-y\|_2^2+\tfrac{\rho}{2}\|w\|_2^2\quad\text{với}\quad Aw=b.$$
Lưu ý: $A$ là ma trận ràng buộc kích thước $p\times n$, không phải Hessian. (a) Viết gradient và Hessian của hàm mục tiêu, nêu kích thước của từng đại lượng; lập điều kiện Karush–Kuhn–Tucker (KKT), gồm điều kiện dừng và tính khả thi và hệ KKT dạng khối. (b) Với $M=\mathrm{diag}(1,2)$, $y=0$, $\rho=1$, $A=\begin{bmatrix}1&1\end{bmatrix}$, $b=14$: giải hệ KKT tìm $w^*$ và nhân tử $\nu^*$; giải thích vì sao gradient của hàm mục tiêu tại nghiệm không bằng 0 mà điều kiện đúng là $\nabla f(w^*)+A^T\nu^*=0$. (c) Từ điểm xuất phát chưa khả thi $w^0=(1,8)^T$, $\nu^0=4$: tính phần dư $r_d$, $r_p$, bước Newton $(d,\Delta\nu)$, cập nhật một bước và kiểm tra.
:::

::: hint
Gradient của $\tfrac12\|Mw-y\|^2$ là $M^T(Mw-y)$; gradient của $\tfrac{\rho}{2}\|w\|^2$ là $\rho w$; Hessian $H=M^TM+\rho I\succ0$. Hệ KKT khối:
$$\begin{bmatrix}H & A^T\\ A & 0\end{bmatrix}\begin{bmatrix}w\\ \nu\end{bmatrix}=\begin{bmatrix}M^Ty\\ b\end{bmatrix},\qquad H\in\mathbb R^{n\times n},\ A\in\mathbb R^{p\times n}.$$
Với số liệu: $M^TM=\mathrm{diag}(1,4)$ nên $H=\mathrm{diag}(2,5)$; ràng buộc $w_1+w_2=14$. Newton: $r_d=\nabla f(w^0)+A^T\nu^0$, $r_p=Aw^0-b$, và giải hệ KKT tuyến tính hóa cho $(d,\Delta\nu)$.
:::

::: solution
(a) Kích thước: $M\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, $A\in\mathbb R^{p\times n}$ (ma trận ràng buộc, $p$ ràng buộc trên $n$ biến), $b\in\mathbb R^p$, biến $w\in\mathbb R^n$, nhân tử $\nu\in\mathbb R^p$. Gradient: $\nabla f(w)=M^T(Mw-y)+\rho w=Hw-M^Ty$ với Hessian $H=M^TM+\rho I\in\mathbb R^{n\times n}$; vì $v^THv=\|Mv\|^2+\rho\|v\|^2\ge\rho\|v\|^2>0$ với $v\ne0$ nên $f$ lồi mạnh. Hàm Lagrange: $L(w,\nu)=f(w)+\nu^T(Aw-b)$. Điều kiện KKT:
$$\nabla f(w)+A^T\nu=0,\qquad Aw=b,$$
tức hệ khối $\begin{bmatrix}H & A^T\\ A & 0\end{bmatrix}\begin{bmatrix}w\\ \nu\end{bmatrix}=\begin{bmatrix}M^Ty\\ b\end{bmatrix}$; ma trận khối này khả nghịch vì $H\succ0$ và $A$ hạng hàng đầy đủ.

(b) $M^TM=\mathrm{diag}(1,4)\Rightarrow H=\mathrm{diag}(2,5)$, $M^Ty=0$. Hệ KKT:
$$2w_1+\nu=0,\quad 5w_2+\nu=0,\quad w_1+w_2=14.$$
Từ hai phương trình đầu: $2w_1=5w_2$; kết hợp ràng buộc: $\tfrac52w_2+w_2=14\Rightarrow w_2=4,\ w_1=10,\ \nu=-20$. Vậy $w^*=(10,4)^T$, $\nu^*=-20$. **Gradient tại nghiệm không bằng 0**: $\nabla f(w^*)=Hw^*=(20,20)^T\ne0$. Điều kiện tối ưu của bài toán có ràng buộc là tính dừng của Hàm Lagrange: $\nabla f(w^*)+A^T\nu^*=(20,20)+(-20,-20)=(0,0)^T$ — thành phần $A^T\nu^*$ bù lại phần gradient bị ràng buộc "giữ". Khả thi gốc: $Aw^*=10+4=14=b$. 

(c) Tại $w^0=(1,8)^T$, $\nu^0=4$ (chưa khả thi vì $Aw^0=9\ne14$):
$$r_d=\nabla f(w^0)+A^T\nu^0=(2,40)^T+(4,4)^T=(6,44)^T,\qquad r_p=Aw^0-b=9-14=-5.$$
Bước Newton giải hệ tuyến tính hóa của KKT; vì bài toán bậc hai, bước Newton đầy đủ cập nhật tới nghiệm chính xác của hệ KKT:
$$d=w^*-w^0=(9,-4)^T,\qquad \Delta\nu=\nu^*-\nu^0=-24.$$
Kiểm thành phần khả thi: $A\,d=9-4=5=-r_p$.  Cập nhật: $w^1=w^0+d=(10,4)^T=w^*$, $\nu^1=\nu^0+\Delta\nu=-20=\nu^*$. Phần dư mới: $\nabla f(w^1)+A^T\nu^1=(20,20)+(-20,-20)=(0,0)$, $Aw^1-b=0$ — cả hai phần dư triệt tiêu sau một bước, đúng tính chất của Newton trên bài toán bậc hai. (Bộ số là ví dụ sư phạm tự xây dựng để tính tay, không lấy từ nguồn.)
:::

---
*Nguồn cơ chế: Boyd–Vandenberghe (2004), chương 9–10, [Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/) ; MIT 6.079, bài giảng 16–17, [MIT 6.079, Fall 2009](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/) . Các bộ số trong bài tập là ví dụ sư phạm tự xây dựng phục vụ tính tay.*
