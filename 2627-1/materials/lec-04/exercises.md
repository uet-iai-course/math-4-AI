# Bài 04 — Tập bài tập: hướng giảm, Newton và ràng buộc đẳng thức

Tập bài tập của Bài 04 gồm: hướng giảm và quay lui Armijo, hướng dốc nhất theo chuẩn $W$, Newton không ràng buộc, ví dụ hàm log, phương pháp khả thi và khử ràng buộc đẳng thức, Newton phần dư, tính tự điều chỉnh (self-concordant) và vận dụng vào mô hình học. Mỗi bài có đủ dữ kiện ngay trong đề; các bộ số là ví dụ sư phạm tự xây dựng. Bài 9–13 là các bài tập trên trang chiếu, mỗi bài đặt ngay sau các bài cùng mạch. Nguồn cơ chế toán: Boyd–Vandenberghe, *Convex Optimization* (2004), chương 9 (tr. 457–520) và chương 10 (tr. 521–560), [Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/); MIT 6.079, bài giảng 16 và 17, [MIT 6.079, Fall 2009](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/).

**Liên kết với bộ trang chiếu.** Bộ trang chiếu gồm bảy mạch, mở đầu bằng **điều kiện Karush–Kuhn–Tucker (KKT)** và việc xây dựng phương pháp tính từ điều kiện tối ưu. Bảng dưới dẫn tới trang tiêu đề của từng mạch (với mạch A là trang bìa) và chỉ bài tập tương ứng.

| Mạch | Mở phần | Ghi chú | Bài tập |
| --- | --- | --- | --- |
| A. Điều kiện KKT và nhiệm vụ tính | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/1/1) | A | — |
| B. Hướng giảm, bước và ma trận trọng số | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/2/1) | B | Bài 1, Bài 2, Bài 9 |
| C. Newton không ràng buộc | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/3/1) | C | Bài 3, Bài 4, Bài 10 |
| D. Newton khả thi và khử biến | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/4/1) | D | Bài 5, Bài 11 |
| E. Newton phần dư từ điểm chưa khả thi | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/5/1) | E | Bài 6, Bài 12 |
| F. Tính tự điều chỉnh và cận sai số | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/6/1) | F | Bài 7, Bài 13 |
| G. Tổng hợp và chuyển giao vào mô hình học | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/7/1) | G | Bài 8 |

Đọc phần giải thích và các chứng minh trong [ghi chú bài giảng](material-viewer.html?doc=materials/lec-04/lecture-note.md&deck=lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html).

## Bài 1 — Hướng ngược gradient và quay lui Armijo

::: exercise
**Bài 1 (tính toán/nhận biết).** Cho $f(x)=\tfrac12(3x_1^2+7x_2^2)$, điểm đầu $x^0=(2,4)^T$ nên $g=\nabla f(x^0)=(6,28)^T$, $f_0=62$, $\|g\|^2=820$.

(a) Xét mô hình $Q_I(d)=f(x^0)+g^Td+\tfrac12\|d\|_2^2$. Lấy đạo hàm theo $d$, viết điều kiện KKT không ràng buộc và tự suy ra hướng $d_G$ cực tiểu hóa mô hình. Giải thích giả thiết nào bảo đảm nghiệm duy nhất; kiểm tra $g^Td_G<0$.

(b) Với tham số Armijo $\alpha=1/10$, $\beta=1/2$, điều kiện nhận bước $t$ là $f(x^0+td_G)\le 62-\alpha t\,\|g\|^2=62-82t$. Lập bảng thử $t=1$, $t=1/2$, $t=1/4$: tính điểm thử, giá trị $f$, so với ngưỡng, và kết luận nhận/loại. Chỉ ra bước đầu tiên được nhận.

(c) (Nhận biết) Giải thích vì sao khi $f(x^0+td)\le f(x^0)+\alpha t\,g^Td$ thì có thể dừng việc thử bước và nhận $t$.
:::

::: hint
(a) Đạo hàm theo $d$ của $g^Td$ là $g$, của $\tfrac12\|d\|^2$ là $d$; điểm dừng $g+d=0$. (b) Tính từng điểm thử $x^0+td_G$; với $t=1/4$ điểm thử là $(1/2,-3)$; so với $62-82t$. (c) So sánh mức giảm thực tế với mức giảm yêu cầu $\alpha t\,g^Td$: bất đẳng thức thỏa khi mức giảm thực tế đạt ngưỡng yêu cầu của Armijo.
:::

::: solution
(a) $Q_I(d)=62+6d_1+28d_2+\tfrac12(d_1^2+d_2^2)$. $\nabla_d Q_I=g+d$, bằng $0$ tại $d=-g=(-6,-28)^T$, trùng $d_G$; vì $I\succ0$ nên đây là điểm cực tiểu của $Q_I$.

(b) Với $t=1$: điểm thử $(-4,-24)$, $f=\tfrac12(3\cdot16+7\cdot576)=\tfrac12(48+4032)=2040$; ngưỡng $62-82=-20$. Vì $2040>-20$, loại.

Với $t=1/2$: điểm thử $(-1,-10)$, $f=\tfrac12(3+700)=703/2$; ngưỡng $62-41=21$. Vì $703/2>21$, loại.

Với $t=1/4$: điểm thử $(1/2,-3)$, $f=\tfrac12(3/4+63)=255/8$; ngưỡng $62-82/4=83/2$. Vì $255/8=31{,}875\le 41{,}5$, nhận.

Vậy quay lui trả $t=1/4$. Hướng ngược gradient là hướng giảm, nhưng độ cong theo $x_2$ lớn khiến bước dài làm hàm tăng; Armijo chỉ chấp nhận bước đủ ngắn để hàm giảm đủ. Bảng này áp dụng riêng cho hướng ngược gradient; trên hướng Newton cùng điểm, hệ số góc của ngưỡng là khác, hai bảng không dùng chung hệ số.

(c) Vì $g^Td<0$, $t>0$ và $\alpha>0$, vế phải của Armijo nhỏ hơn $f_0$. Khi bất đẳng thức đã thỏa, bước cho mức giảm thực tế ít nhất $-\alpha t g^Td>0$, nên nhận $t$ và dừng vòng thử. Quay lui không yêu cầu tìm bước tốt nhất trên tia. Việc nó kết thúc sau hữu hạn lần co được chứng minh riêng bằng khai triển $f(x^0+td)=f_0+t g^Td+o(t)$; chỉ tính liên tục là chưa đủ để suy bất đẳng thức Armijo.
:::

## Bài 2 — Hướng theo chuẩn bậc hai

::: exercise
**Bài 2 (tính toán/chứng minh).** Cho $W\in\mathbb R^{n\times n}$ đối xứng xác định dương, $g\in\mathbb R^n$, $v\in\mathbb R^n$. Xét bài toán con
$$\min_{v}\; g^Tv \quad\text{với}\quad v^TWv\le 1.$$

(a) Nếu $g=0$, nêu cách chọn hướng mà không thực hiện phép chia cho $0$.

(b) Với $g\ne0$, tự lập hàm Lagrange bằng nhân tử $\zeta$ và viết đủ bốn nhóm KKT: dừng, khả thi gốc, khả thi đối ngẫu, bù trừ. Dùng nhóm dừng để suy ra $\zeta>0$, rồi dùng bù trừ để suy ra $v^TWv=1$. Giải $\zeta$ và $v$; kiểm tra đủ bốn nhóm điều kiện tại nghiệm. Cuối cùng đổi độ dài theo $d=\|g\|_*v$, với $\|g\|_*=\sqrt{g^TW^{-1}g}$, rồi tìm hệ tuyến tính tính $d$ mà không lập nghịch đảo.

(c) Với $W=\operatorname{diag}(3,7)$, $g=(6,28)^T$ và $Q_W(d)=62+g^Td+\tfrac12d^TWd$, tính $d$, $v$, $d^TWd$ và $Q_W(0)-Q_W(d)$. Hai đại lượng cuối có bằng nhau không? Cho $W^{1/2}=\operatorname{diag}(\sqrt3,\sqrt7)$ là căn bậc hai đối xứng xác định dương của $W$ và $W^{-1/2}=(W^{1/2})^{-1}$. Dùng Cauchy–Schwarz kiểm tra bổ sung rằng giá trị $g^Tv$ tìm được là nhỏ nhất trên quả cầu đơn vị theo chuẩn $W$.
:::

::: hint
(b) KKT: $g+2\zeta Wv=0$; $v^TWv\le1$; $\zeta\ge0$; $\zeta(v^TWv-1)=0$. Nếu $\zeta=0$ thì $g=0$, mâu thuẫn. Bù trừ với $\zeta>0$ cho $v^TWv=1$. Thay $v=-W^{-1}g/(2\zeta)$ vào ràng buộc để tìm $\zeta$. (c) $W^{-1}g=(2,4)^T$; $g^TW^{-1}g=124$. Kiểm tra Cauchy–Schwarz: $g^Tv=(W^{-1/2}g)^T(W^{1/2}v)\ge-\sqrt{g^TW^{-1}g}\,\|v\|_W$.
:::

::: solution
(a) Nếu $g=0$ thì mọi $v$ khả thi đều cho giá trị $0$: bài toán con không xác định một hướng giảm; phương pháp dừng thay vì chia cho $\|g\|_*=0$.

(b) $L_\zeta(v)=g^Tv+\zeta(v^TWv-1)$. Bốn điều kiện KKT:
(i) điều kiện dừng: $\nabla_v L=g+2\zeta Wv=0$;
(ii) khả thi gốc: $v^TWv\le1$;
(iii) khả thi đối ngẫu: $\zeta\ge0$;
(iv) bù trừ: $\zeta(v^TWv-1)=0$.

Nếu $\zeta=0$ thì (i) cho $g=0$, trái với $g\ne0$; vậy $\zeta>0$. Khi đó (iv) suy ra $v^TWv=1$. Từ (i), $v=-W^{-1}g/(2\zeta)$. Thay vào ràng buộc:
$$1=v^TWv=\frac{g^TW^{-1}g}{4\zeta^2}\;\Rightarrow\; \zeta=\tfrac12\sqrt{g^TW^{-1}g}.$$
Suy ra $v=-W^{-1}g/\sqrt{g^TW^{-1}g}$ và giá trị $g^Tv=-\sqrt{g^TW^{-1}g}$. Bài toán lồi: mục tiêu tuyến tính và ràng buộc lồi do $W\succ0$. Bộ $(v,\zeta)$ vừa tìm thỏa đủ KKT, nên là nghiệm tối ưu toàn cục theo chiều đủ đã học ở Bài 03. Với $\|g\|_*=\sqrt{g^TW^{-1}g}$, hướng không chuẩn hóa $d=\|g\|_*\,v=-W^{-1}g$ thỏa $Wd=-g$; nếu $W$ được chọn bằng Hessian xác định dương tại điểm hiện tại, hướng này trùng hướng Newton.

(c) $W^{-1}g=(2,4)^T$, $g^TW^{-1}g=6\cdot2+28\cdot4=124$, $\|g\|_*=\sqrt{124}$, $\zeta=\sqrt{124}/2$. Do đó
$$d=(-2,-4)^T,\qquad v=\frac{d}{\sqrt{124}}=\frac{(-2,-4)^T}{\sqrt{124}}.$$
Kiểm tra: $d^TWd=3\cdot4+7\cdot16=124$; độ thay đổi mô hình $Q_W(d)-Q_W(0)=g^Td+\tfrac12d^TWd=-124+62=-62$, nên mức giảm $Q_W(0)-Q_W(d)=62>0$. Bình phương độ dài $124$ khác mức giảm mô hình $62$. Kiểm tra bổ sung bằng Cauchy–Schwarz: với mọi $v$ khả thi,
$$g^Tv=(W^{-1/2}g)^T(W^{1/2}v)\ge-\|W^{-1/2}g\|_2\,\|W^{1/2}v\|_2\ge-\sqrt{g^TW^{-1}g},$$
và đẳng thức đúng tại $v$ tìm được, xác nhận tối ưu.
:::

## Bài 9 — Hướng theo chuẩn $W$ và quay lui với $\alpha=3/10$

::: exercise
**Bài 9 (tính toán).** Cho $f(x)=\tfrac12(3x_1^2+7x_2^2)$ trên $\mathbb R^2$, với $\nabla f(x)=(3x_1,7x_2)^T$ và Hessian $\operatorname{diag}(3,7)$. Chọn ma trận trọng số $W=\operatorname{diag}(3,7)$; tại điểm $x$ với $g=\nabla f(x)$, mô hình là $Q_W(d)=f(x)+g^Td+\tfrac12d^TWd$ và chuẩn trọng số là $\|d\|_W^2=d^TWd$.

(a) Tại $x^1=(1/2,-3)^T$, viết điều kiện dừng của $Q_W$ theo $d$, giải $d$, rồi tính $x^1+d$ và $\|d\|_W^2$.

(b) Từ $x^0=(2,4)^T$, với $f(x^0)=62$, $g=(6,28)^T$ và hướng ngược gradient $d_G=(-6,-28)^T$, chạy quay lui Armijo với $\beta=1/2$, $\alpha=3/10$: thử lần lượt $t=1,\ 1/2,\ 1/4,\ldots$ và nhận bước đầu tiên thỏa $f(x^0+td_G)\le f(x^0)+\alpha t\,g^Td_G$. Xác định bước được nhận. So với Bài 1(b), nơi $\alpha=1/10$ cho bước nhận $t=1/4$.
:::

::: hint
(a) Tính $g=\nabla f(x^1)$; điều kiện dừng $g+Wd=0$ tách thành hai phương trình một ẩn vì $W$ chéo. (b) Dọc tia, $f(x^0+td_G)=62-820t+2798t^2$; ngưỡng Armijo là $62-\alpha\cdot820\,t$.
:::

::: solution
(a) $g=\nabla f(x^1)=(3/2,-21)^T$. Đạo hàm $Q_W$ theo $d$ được $g+Wd$; điều kiện dừng $g+Wd=0$ cho $3d_1=-3/2$ và $7d_2=21$, nên $d=(-1/2,3)^T$. Vì $W\succ0$, $Q_W$ lồi chặt và $d$ là điểm cực tiểu duy nhất của mô hình. Điểm mới $x^1+d=(0,0)^T$ là nghiệm $x^*$ của $f$, vì $W$ trùng Hessian nên $Q_W(d)=f(x^1+d)$ với mọi $d$. Chuẩn trọng số:
$$\|d\|_W^2=d^TWd=3\cdot\tfrac14+7\cdot9=\tfrac34+63=\tfrac{255}4.$$

(b) $g^Td_G=-\|g\|_2^2=-820$, nên ngưỡng là $62+\tfrac3{10}t(-820)=62-246t$. Bảng thử:

| $t$ | điểm thử | $f$ | ngưỡng $62-246t$ | kết luận |
| --- | --- | --- | --- | --- |
| $1$ | $(-4,-24)$ | $2040$ | $-184$ | loại |
| $1/2$ | $(-1,-10)$ | $703/2$ | $-61$ | loại |
| $1/4$ | $(1/2,-3)$ | $255/8$ | $1/2$ | loại |
| $1/8$ | $(5/4,1/2)$ | $103/32$ | $125/4$ | nhận |

Tại $t=1/8$: $f=\tfrac12\big(3\cdot\tfrac{25}{16}+7\cdot\tfrac14\big)=\tfrac{103}{32}\approx3{,}22\le31{,}25=\tfrac{125}4$, nên quay lui trả $t=1/8$. Với $\alpha=1/10$, ngưỡng tại $t=1/4$ là $83/2$ và bước $1/4$ được nhận. Tăng $\alpha$ đòi mức giảm lớn hơn, nên ngưỡng chặt hơn và bước được nhận ngắn hơn.
:::

## Bài 3 — Độ giảm mô hình, mức giảm hàm và sai số tối ưu

::: exercise
**Bài 3 (tính toán).** Cho $\varphi(s)=s-\log s$ trên $s>0$ ($\log$ là logarit tự nhiên), điểm đầu $s^0=1/4$. (a) Tính $\varphi'(s)$, $\varphi''(s)$, từ đó $g$ và $H$ tại $s^0=1/4$. Tự lập mô hình bậc hai $Q_H(d)$ xấp xỉ $\varphi(s^0+d)$ theo độ dời $d$, lấy đạo hàm của $Q_H$ theo $d$, giải điều kiện dừng $Q_H'(d)=0$ để tìm bước $d_N$ và điểm mới $s^1$. (b) Tính $\delta_N$, $\delta_N^2$ và mức giảm dự đoán của mô hình $\delta_N^2/2$; kiểm tra $\varphi'(s^1)$ để thấy $s^1$ chưa tối ưu. (c) Tính sai số thực tế $\varphi(s^0)-\varphi(1)$, mức giảm thực tế của một bước $\varphi(s^0)-\varphi(s^1)$, và kiểm tra bước đầy đủ $t=1$ có thỏa Armijo với $\alpha=1/10$ không. (d) Nêu rõ vì sao ba đại lượng ở (b) và (c) không được đồng nhất.
:::

::: hint
Dùng khai triển Taylor bậc hai của $\varphi$ quanh $s^0$ theo độ dời $d$ để lập $Q_H(d)$; đạo hàm theo $d$ rồi giải điều kiện dừng để được bước. $\delta_N=|g^Td_N|^{1/2}$ không phải bình phương; cận Armijo là $\alpha(-g^Td_N)$. Sai số thực tế cần giá trị $\varphi(1)=1$.
:::

::: solution
(a) $\varphi'(s)=1-1/s$, $\varphi''(s)=1/s^2$. Tại $s^0=1/4$: $g=\varphi'(1/4)=1-4=-3$, $H=\varphi''(1/4)=16$. Mô hình bậc hai theo độ dời $d$:
$$Q_H(d)=\varphi(1/4)+g\,d+\tfrac12 H d^2=\varphi(1/4)-3d+8d^2.$$
Vì $H=16>0$, $Q_H$ lồi chặt (còn gọi là lồi nghiêm ngặt) nên điều kiện dừng cho nghiệm duy nhất. Đạo hàm mô hình: $Q_H'(d)=-3+16d$. Giải $Q_H'(d)=0$: $16d=3$, tức $d_N=3/16$. Điểm mới: $s^1=s^0+d_N=1/4+3/16=7/16$.

(b) $g^Td_N=(-3)(3/16)=-9/16$, nên $\delta_N^2=-g^Td_N=9/16$ và $\delta_N=\sqrt{9/16}=3/4$. $\delta_N=3/4$ không phải bình phương; đại lượng bình phương là $\delta_N^2=9/16$. Mức giảm dự đoán của mô hình là $\delta_N^2/2=9/32=0{,}28125$. Kiểm tra tối ưu: $\varphi'(7/16)=1-16/7=-9/7\ne0$, nên $s^1$ chưa phải điểm tối ưu.

(c) Vì $\varphi^{\prime\prime}(s)>0$ trên $s>0$ và $\varphi^{\prime}(1)=0$, nghiệm duy nhất là $s^*=1$. Sai số thực tế tại điểm đầu: $\varphi(1/4)-\varphi(1)=(1/4+\log4)-1=\log4-3/4\approx0{,}636294$. Mức giảm thực tế của một bước: $\varphi(1/4)-\varphi(7/16)=\log(7/4)-3/16\approx0{,}372116$. Điều kiện Armijo cho bước đầy đủ: cần $\varphi(1/4)-\varphi(s^1)\ge\alpha(-g^Td_N)=\tfrac{1}{10}\cdot\tfrac{9}{16}=\tfrac{9}{160}=0{,}05625$ (không phải $\alpha\cdot 9/32$); vì $0{,}372116\ge0{,}05625$, bước $t=1$ được nhận.

(d) Ba đại lượng có ý nghĩa khác nhau: $\delta_N^2/2=9/32$ là giảm dự đoán của mô hình bậc hai; sai số thực tế $\log4-3/4$ là khoảng cách tới giá trị tối ưu $\varphi(1)=1$; mức giảm một bước $\log(7/4)-3/16$ là lượng $\varphi$ giảm thực tế sau một lần lặp. Ba số $0{,}28125$, $0{,}636294$, $0{,}372116$ không được đồng nhất; với hàm bậc hai xác định dương, mô hình là hàm gốc và bước Newton đầy đủ tới nghiệm, nên ba đại lượng trùng nhau.
:::


## Bài 4 — Điều kiện dừng của mô hình Newton

::: exercise
**Bài 4 (chứng minh).** Cho $f$ khả vi hai lần trên một miền mở và điểm $x$ trong miền. Đặt $g=\nabla f(x)\ne0$, $H=\nabla^2f(x)\succ0$, với $g,d\in\mathbb R^n$ và $H\in\mathbb R^{n\times n}$. Xét mô hình $q(d)=f(x)+g^Td+\tfrac12 d^THd$. (a) Chứng minh $q$ có nghiệm duy nhất của điều kiện tối ưu và nghiệm đó thỏa $Hd=-g$. (b) Chứng minh rằng với nghiệm $d$ này, $g^Td=-d^THd<0$, tức hướng Newton là hướng giảm. (c) Đặt $\delta_N=\sqrt{d^THd}\ge0$. Chứng minh $q(0)-q(d)=\delta_N^2/2$. (d) Phân biệt điều kiện tối ưu của bài toán mô hình ($Hd=-g$) với điều kiện tối ưu của bài toán gốc $\min f(x)$; cho biết $H\succ0$ được dùng ở chỗ nào.
:::

::: hint
(a) $\nabla q(d)=g+Hd$; giải hệ. (b) Nhân $Hd=-g$ với $d^T$ ở hai vế. (c) Tính trực tiếp $q(0)-q(d)$ rồi dùng (b). (d) So sánh hệ $Hd=-g$ với $\nabla f(x)=0$.
:::

::: solution
(a) Vì $H\succ0$, $H$ khả nghịch, nên hệ $Hd=-g$ có nghiệm duy nhất $d=-H^{-1}g$. Với nghiệm này $\nabla q(d)=g+Hd=0$; hơn nữa $q$ lồi chặt vì Hessian $H\succ0$, nên điểm dừng là cực tiểu duy nhất toàn cục của $q$.

(b) Nhân $Hd=-g$ trái với $d^T$: $d^THd=-g^Td$, tức $g^Td=-d^THd$. Vì $d\ne0$ (nếu $d=0$ thì $g=0$, mâu thuẫn) và $H\succ0$, ta có $d^THd>0$, suy ra $g^Td<0$.

(c) $q(0)=f(x)$ và $q(d)=f(x)+g^Td+\tfrac12 d^THd$, nên
$$q(0)-q(d)=-g^Td-\tfrac12 d^THd=d^THd-\tfrac12 d^THd=\tfrac12 d^THd=\tfrac12\delta_N^2,$$
với $\delta_N=\sqrt{d^THd}\ge0$ theo định nghĩa. Đây là mức giảm dự đoán của mô hình bậc hai.

(d) Điều kiện tối ưu của bài toán mô hình là $\nabla q(d)=0$, tức $Hd=-g$, cho nghiệm bước $d=-H^{-1}g$. Điều kiện cần tại nghiệm $x^*$ của bài toán gốc là $\nabla f(x^*)=0$; trong bài toán lồi trên miền mở lồi, điều kiện này cũng đủ. Giải $Hd=-g$ chỉ giải mô hình tại $x$; không bảo đảm $\nabla f(x+d)=0$ hay tự bảo đảm hội tụ của cả dãy lặp. $H\succ0$ chỉ được dùng để bảo đảm mô hình có cực tiểu duy nhất và $d$ là hướng giảm của $f$ tại $x$; nó không thay thế điều kiện tối ưu của bài toán gốc.
:::

## Bài 10 — Hai bước Newton trên hàm $s-\log s$

::: exercise
**Bài 10 (tính toán/chứng minh).** Cho $\varphi(s)=s-\log s$ trên $s>0$, với $\varphi'(s)=1-1/s$, $\varphi''(s)=1/s^2$, nghiệm $s^*=1$ và $\varphi^*=1$. Bước Newton đầy đủ $s^+=s-\varphi'(s)/\varphi''(s)$ từ $s^0=1/4$ cho $s^1=7/16$ (Bài 3).

(a) Từ $s^1=7/16$, thực hiện bước Newton đầy đủ: tính $g=\varphi'(s^1)$, $H=\varphi''(s^1)$, $d=-g/H$, $s^2=s^1+d$ và giảm mô hình $\delta_N^2/2$ với $\delta_N^2=g^2/H$. So giảm mô hình với sai số mục tiêu $\varphi(s^1)-\varphi^*$.

(b) Chứng minh rằng bước đầy đủ từ mọi $s>0$ cho $1-s^+=(1-s)^2$. Tính $1-s^k$ với $k=0,1,2$ và đối chiếu với định nghĩa hội tụ bậc hai: có $c>0$ để $|s^{k+1}-s^*|\le c\,|s^k-s^*|^2$ từ một chỉ số trở đi.
:::

::: hint
(a) $\varphi'(7/16)=1-16/7$ và $\varphi''(7/16)=(16/7)^2$. (b) Thay $\varphi'(s)/\varphi''(s)=(1-1/s)s^2$ và rút gọn $s^+$ thành một đa thức theo $s$.
:::

::: solution
(a) Tại $s^1=7/16$: $g=1-16/7=-9/7$, $H=(16/7)^2=256/49$, nên
$$d=-\frac gH=\frac97\cdot\frac{49}{256}=\frac{63}{256},\qquad s^2=\frac{112}{256}+\frac{63}{256}=\frac{175}{256}.$$
Độ giảm Newton $\delta_N^2=g^2/H=\tfrac{81}{49}\cdot\tfrac{49}{256}=\tfrac{81}{256}$, nên giảm mô hình là $\delta_N^2/2=81/512\approx0{,}158$. Sai số mục tiêu tại $s^1$ là
$$\varphi(7/16)-1=\tfrac7{16}+\log\tfrac{16}7-1=\log\tfrac{16}7-\tfrac9{16}\approx0{,}264.$$
Như ở bước đầu (Bài 3), giảm mô hình nhỏ hơn sai số mục tiêu.

(b) $s^+=s-(1-1/s)s^2=s-s^2+s=2s-s^2$, nên $1-s^+=1-2s+s^2=(1-s)^2$. Dãy $1-s^k$ là $3/4$, $9/16$, $81/256$; kiểm tra $1-175/256=81/256$. Mỗi bước bình phương khoảng cách trước, nên định nghĩa hội tụ bậc hai thỏa với $c=1$. Với $s^0\in(0,2)$, $|1-s^0|<1$ và dãy hội tụ về $s^*=1$. Với $s^0\ge2$, bước đầy đủ cho $s^+=s^0(2-s^0)\le0$, ra ngoài miền; quay lui loại điểm thử ngoài miền.
:::

## Bài 5 — Newton khả thi và khử biến

::: exercise
**Bài 5 (tính toán).** Xét bài toán $\min_u F(u)$ với $F(u)=\tfrac12(2u_1^2+5u_2^2)$ và ràng buộc đẳng thức $u_1+u_2=14$, tức $A=\begin{bmatrix}1&1\end{bmatrix}$, $b=14$. Điểm xuất phát $u^0=(16,-2)^T$ thỏa $Au^0=b$. (a) Tự lập mô hình bậc hai $\min_d\; g^Td+\tfrac12d^THd$ với ràng buộc $Ad=0$; tự lập Lagrange $L_m$ với nhân tử $\eta$, lấy đạo hàm theo $d$ và $\eta$, xếp thành hệ điều kiện tối ưu dạng khối rồi tự giải để tìm bước $d$ và nhân tử $\eta$. Kiểm tra $Ad=0$, tính bình phương độ giảm Newton của bài toán con $\delta_{eq}^2=d^THd$, so sánh giảm mô hình $\delta_{eq}^2/2$ với giảm thực tế sau một bước đầy đủ, và cho biết điểm mới cùng giá trị $F$. (b) Đặt $N=(-1,1)^T$ và $\hat u=(14,0)^T$ với $A\hat u=b$, $AN=0$. Viết $u=\hat u+Nz$, lập hàm $\psi(z)=F(\hat u+Nz)$, tìm điểm cực tiểu $z^*$ và đối chiếu $\Delta z=z^*-z^0$ (với $z^0$ từ $u^0=\hat u+Nz^0$) với bước ở câu (a) qua hệ rút gọn $(N^THN)\Delta z=-N^Tg$.
:::

::: hint
(a) Tính $g=\nabla F(u^0)$ và $F(u^0)$ trước; ràng buộc $Ad=0$ cho $d_1+d_2=0$. Lập Lagrange $L_m=g^Td+\tfrac12d^THd+\eta^TAd$, lấy đạo hàm theo $d$ và $\eta$ để được hai phương trình, xếp thành hệ khối ba ẩn $(d_1,d_2,\eta)$ rồi giải. Đặt $Q(d)=g^Td+\tfrac12d^THd$. Giảm mô hình là $Q(0)-Q(d)=\tfrac12d^THd$ (dương), có dấu ngược với $Q(d)-Q(0)$. (b) Thay $u=\hat u+Nz$ vào $F$ bằng quy tắc dây chuyền: $\psi'(z)=N^Tg$ tại điểm đang xét và $\psi''=N^THN$; giải $\psi'(z)=0$ rồi kiểm tra $\psi''>0$. Đối chiếu $\Delta z$ với nghiệm của $(N^THN)\Delta z=-N^Tg$.
:::

::: solution
(a) Tại $u^0=(16,-2)^T$: $g=\nabla F(u^0)=(2u_1,5u_2)^T=(32,-10)^T$, $H=\operatorname{diag}(2,5)$, $F(u^0)=\tfrac12(2\cdot256+5\cdot4)=266$. Đặt $Q(d)=g^Td+\tfrac12d^THd$. Bài toán con $\min_d Q(d)$ với $Ad=0$ có Lagrange $L_m=Q(d)+\eta^TAd$. Điều kiện dừng và khả thi là
$$\nabla_dL_m=g+Hd+A^T\eta=0,\qquad \nabla_\eta L_m=Ad=0.$$
Vì $H\succ0$ và $A$ có hạng hàng đầy đủ, nghiệm KKT cho bước cực tiểu duy nhất. Xếp hai dòng thành hệ khối
$$\begin{bmatrix}2&0&1\\0&5&1\\1&1&0\end{bmatrix}\begin{bmatrix}d_1\\d_2\\\eta\end{bmatrix}=-\begin{bmatrix}32\\-10\\0\end{bmatrix}.$$
Hàng cuối cho $d_2=-d_1$; hai hàng đầu là $2d_1+\eta=-32$ và $5d_2+\eta=10$. Trừ rồi thế $d_2=-d_1$: $2d_1-5d_2=-42\Rightarrow 7d_1=-42$, nên $d=(-6,6)^T$, $\eta=-20$. Kiểm tra: $Ad=0$ và $Hd+g=(20,20)^T=-A^T\eta$. Mọi bước $u+td$ giữ $A(u+td)=Au^0+t\,Ad=b$. Bước đầy đủ tới $u^*=(10,4)^T$, $F^*=140$. Bình phương độ giảm Newton của bài toán con $\delta_{eq}^2=d^THd=2\cdot36+5\cdot36=252$; giảm mô hình $Q(0)-Q(d)=\tfrac12d^THd=126$ (dương), đúng bằng giảm thực tế $F(u^0)-F^*=266-140=126$ vì $F$ bậc hai nên $Q(d)=F(u^0+d)-F(u^0)$ chính xác.

(b) Với $\hat u=(14,0)^T$, $N=(-1,1)^T$: $A\hat u=14$, $AN=0$, nên $u=(14-z,z)^T$ khả thi với mọi $z$. Thay vào $F$:
$$\psi(z)=\tfrac12\big(2(14-z)^2+5z^2\big)=196-28z+\tfrac72 z^2.$$
Quy tắc dây chuyền cho $\psi'(z)=N^Tg$ và $\psi''=N^THN=7$. Giải $\psi'(z)=7z-28=0$ cho $z^*=4$, và $\psi''=7>0$ nên cực tiểu duy nhất tại $u^*=(10,4)^T$, $F^*=140$. Từ $u^0=\hat u+Nz^0$ suy ra $z^0=-2$, nên $\Delta z=z^*-z^0=6$. Để suy ra hệ rút gọn, thay $d=N\Delta z$ vào $Hd+A^T\eta=-g$, rồi nhân trái với $N^T$. Vì $N^TA^T=(AN)^T=0$, ta được $(N^THN)\Delta z=-N^Tg$. Tính các hệ số: $N^THN=7$, $N^Tg=(-1,1)\cdot(32,-10)=-42$, nên $7\Delta z=42\Rightarrow\Delta z=6$, và $d=N\Delta z=(-6,6)^T$ khớp đúng bước ở câu (a). Hệ rút gọn không có điều kiện không âm nào trên $z$ hay $\Delta z$.
:::

## Bài 11 — Bước Newton khả thi từ $(8,6)^T$

::: exercise
**Bài 11 (tính toán).** Xét bài toán $\min F(u)=\tfrac12(2u_1^2+5u_2^2)$ với $u_1+u_2=14$, tức $A=\begin{bmatrix}1&1\end{bmatrix}$, $b=14$; $\nabla F(u)=(2u_1,5u_2)^T$, $H=\operatorname{diag}(2,5)$. Nghiệm là $u^*=(10,4)^T$ với nhân tử $\nu^*=-20$ và $F^*=140$ (Bài 5). Điểm $u=(8,6)^T$ khả thi vì $8+6=14$; vector $N=(-1,1)^T$ thỏa $AN=0$.

(a) Với $g=\nabla F(u)$, lập hệ khối
$$\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\eta\end{bmatrix}=-\begin{bmatrix}g\\0\end{bmatrix},$$
giải $d$ và $\eta$; tính $u+d$, mức giảm $F(u)-F(u+d)$, so với $\tfrac12d^THd$, và so $\eta$ với $\nu^*$.

(b) Giải hệ rút gọn $N^THN\,\Delta z=-N^Tg$, tính $d=N\Delta z$ và so với câu (a).
:::

::: hint
Hệ khối có cùng ma trận như tại $u^0=(16,-2)^T$ của Bài 5, chỉ vế phải $-g$ thay đổi. Trừ hai hàng gradient để khử $\eta$, rồi dùng $d_1+d_2=0$.
:::

::: solution
(a) $g=(16,30)^T$. Hệ khối gồm $2d_1+\eta=-16$, $5d_2+\eta=-30$, $d_1+d_2=0$. Trừ hai hàng đầu được $2d_1-5d_2=14$; thay $d_2=-d_1$ được $7d_1=14$, nên $d=(2,-2)^T$ và $\eta=-16-4=-20$. Kiểm tra $Ad=2-2=0$. Điểm mới $u+d=(10,4)^T=u^*$. Ta có $F(8,6)=\tfrac12(128+180)=154$, nên $F$ giảm
$$154-140=14=\tfrac12d^THd=\tfrac12(2\cdot4+5\cdot4).$$
Vì $F$ bậc hai, mô hình trùng hàm và một bước đầy đủ từ mọi điểm khả thi tới đúng nghiệm. Hàng dừng của bài toán con khi đó là hàng dừng của bài toán gốc tại nghiệm, nên $\eta=\nu^*=-20$.

(b) $N^THN=2+5=7$ và $N^Tg=-16+30=14$, nên $7\Delta z=-14$, $\Delta z=-2$ và $d=N\Delta z=(2,-2)^T$, trùng câu (a).
:::

## Bài 6 — Newton phần dư

::: exercise
**Bài 6 (tính toán).** Xét bài toán với $F(u)=\tfrac12(2u_1^2+5u_2^2)$, ràng buộc đẳng thức $u_1+u_2=14$, tức $A=(1,1)$, $b=14$, và điểm khởi đầu chưa khả thi $u^0=(1,8)^T$ với nhân tử khởi tạo $\nu^0=4$. (a) Tự tính $\nabla F(u^0)$, rồi lập hai phần dư $r_d=\nabla F(u^0)+A^T\nu^0$ và $r_p=Au^0-b$. (b) Viết tuyến tính hóa hai dòng điều kiện KKT tại $(u^0,\nu^0)$, phân biệt Taylor của gradient trong bài toán tổng quát với đẳng thức chính xác trong ví dụ bậc hai này, rồi xếp thành hệ Newton phần dư đối với $(d,\Delta\nu)$ với $H=\mathrm{diag}(2,5)$. (c) Tự giải hệ bằng phép thế, kiểm tra lại nghiệm bằng cách thay vào từng hàng, rồi cập nhật $u^1=u^0+d$, $\nu^1=\nu^0+\Delta\nu$ và tính lại cả hai phần dư tại điểm mới. (d) Đặt $\eta=\nu^0+\Delta\nu$; phân biệt rõ $\eta$ với $\Delta\nu$. Với hệ số bước $t=\tfrac12$, dùng công thức $\nu^+=(1-t)\nu^0+t\,\eta$ để tính $\nu^+$, lấy $u^+=u^0+td$, rồi tính $r_p^+$ và $r_d^+$ tại điểm thử. (e) Nêu tiêu chí dừng cần theo dõi cả hai phần dư, và giải thích vì sao một phần dư nhỏ không tự chứng minh sai số mục tiêu nhỏ: cho thấy có điểm với $F(u)<F^*=140$ nhưng vẫn ngoài miền khả thi.
:::

::: hint
(a) Tính gradient trước, rồi cộng $A^T\nu^0$ vào để được $r_d$; riêng $r_p$ chỉ dùng $Au^0-b$. (b) Trong bài toán tổng quát, $r_d(u^0+d,\nu^0+\Delta\nu)\approx r_d+Hd+A^T\Delta\nu$, rồi đặt vế phải bằng $0$ để xác định bước; riêng ví dụ bậc hai này Taylor chính xác. Phương trình khả thi $r_p+Ad=0$ luôn chính xác vì ràng buộc affine; ghép thành hệ khối với $H$ và $A$. (c) Trừ hai hàng đầu để khử $\Delta\nu$, dùng hàng khối ràng buộc để biểu diễn một ẩn theo ẩn kia, rồi thay ngược; sau khi có nghiệm, thay vào từng hàng để kiểm tra. (d) $\eta$ là giá trị nhân tử mới ở bước đầy đủ, còn $\Delta\nu$ là số gia của nhân tử; với $t=\tfrac12$ nhân tử mới là trung bình cộng của $\nu^0$ và $\eta$, và phần dư gốc tại điểm thử giảm đúng theo hệ số $(1-t)$. (e) Hai phần dư cần hai ngưỡng riêng; hãy tìm một điểm cụ thể thỏa $F(u)<140$ nhưng vi phạm $u_1+u_2=14$ để thấy mục tiêu thấp không nghĩa là gần nghiệm.
:::

::: solution
**(a)** Tại $u^0=(1,8)^T$: $\nabla F(u^0)=(2u_1,5u_2)^T=(2,40)^T$. Cộng $A^T\nu^0=4(1,1)^T$ ta được
$$r_d=\nabla F(u^0)+A^T\nu^0=(6,44)^T,\qquad r_p=Au^0-b=1+8-14=-5.$$

**(b)** Tuyến tính hóa hai dòng KKT tại $(u^0,\nu^0)$:
$$r_d(u^0+d,\nu^0+\Delta\nu)\approx r_d+Hd+A^T\Delta\nu=0,$$
Trong bài toán tổng quát, dùng $\nabla F(u^0+d)\approx g+Hd$. Riêng $F$ bậc hai đang xét có gradient affine nên dòng trên là đẳng thức chính xác. Dòng thứ hai là
$$r_p(u^0+d)=r_p+Ad=0,$$
(đẳng thức, vì $r_p$ affine). Với $H=\mathrm{diag}(2,5)$, $A=(1,1)$:
$$\begin{bmatrix}2&0&1\\0&5&1\\1&1&0\end{bmatrix}\begin{bmatrix}d_1\\d_2\\\Delta\nu\end{bmatrix}=\begin{bmatrix}-6\\-44\\5\end{bmatrix}.$$

**(c)** Trừ hai hàng đầu: $2d_1-5d_2=38$. Hàng khối: $d_2=5-d_1$, thay vào: $2d_1-5(5-d_1)=38\Rightarrow 7d_1=63$, suy ra $d=(9,-4)^T$, rồi $\Delta\nu=-6-2\cdot9=-24$. Kiểm tra từng hàng: $2\cdot9-24=-6$; $5\cdot(-4)-24=-44$; $9-4=5=-r_p$. Vậy $u^1=(10,4)^T$, $\nu^1=4-24=-20$; phần dư mới: $r_d^1=(20,20)^T+(-20,-20)^T=(0,0)^T$, $r_p^1=14-14=0$. Cả hai triệt tiêu sau một bước vì bài toán bậc hai.

**(d)** Đặt $\eta=\nu^0+\Delta\nu=-20$: $\eta$ là giá trị nhân tử ở bước đầy đủ, còn $\Delta\nu=-24$ là số gia. Với $t=\tfrac12$:
$$\nu^+=(1-t)\nu^0+t\,\eta=\tfrac12(4-20)=-8,$$
$u^+=u^0+\tfrac12 d=(11/2,6)^T$. Khi đó $r_p^+=\tfrac{11}{2}+6-14=-\tfrac52$ và $r_d^+=\nabla F(u^+)+A^T\nu^+=(11,30)^T-8(1,1)^T=(3,22)^T$.

**(e)** Ở đầu mỗi vòng lặp, kiểm tra để dừng trước khi giải hệ nếu đồng thời đạt cả hai ngưỡng $\|r_d\|_2\le\varepsilon_d$ và $\|r_p\|_2\le\varepsilon_p$. Dung sai phần dư là tiêu chuẩn thực hành; để đổi nó thành cận sai số mục tiêu cần thêm giả thiết và hằng số của bài toán. Chỉ đạt một ngưỡng hoặc có giá trị mục tiêu thấp chưa đủ: tại $u=(0,0)^T$, $\nu=0$ có $F(u)=0<F^*=140$ nhưng $r_p=-14$, điểm vẫn ngoài miền khả thi, nên không buộc $F$ giảm ở mọi bước chưa khả thi.
:::

## Bài 12 — Newton phần dư từ $(4,2)^T$ và tiêu chí nhận bước

::: exercise
**Bài 12 (tính toán).** Xét bài toán $\min F(u)=\tfrac12(2u_1^2+5u_2^2)$ với $u_1+u_2=14$, tức $A=\begin{bmatrix}1&1\end{bmatrix}$, $b=14$, $H=\operatorname{diag}(2,5)$; nghiệm $u^*=(10,4)^T$, $\nu^*=-20$. Phần dư là $r_d=\nabla F(u)+A^T\nu$, $r_p=Au-b$ và $r=(r_d,r_p)\in\mathbb R^3$. Hệ Newton cho phần dư là
$$\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\Delta\nu\end{bmatrix}=-\begin{bmatrix}r_d\\r_p\end{bmatrix},$$
và bước thử $(u+td,\nu+t\Delta\nu)$ được nhận khi $\|r(u+td,\nu+t\Delta\nu)\|_2\le(1-\alpha t)\|r(u,\nu)\|_2$. Xét điểm chưa khả thi $u=(4,2)^T$ với $\nu=2$.

(a) Tính $r_d$, $r_p$; giải hệ Newton; tính $(u^+,\nu^+)$ với $t=1$ và cho biết nhân tử của nghiệm.

(b) Với $t=1/2$ và $\alpha=0{,}1$: tính $r^+$, so $\|r^+\|_2$ với $(1-\alpha t)\|r\|_2$, kết luận nhận hay loại bước, và nêu hai điều kiện dừng.
:::

::: hint
Vế phải của hệ là $-r_d$ và $-r_p$, không phải $r_d$ và $r_p$. Nhân tử sau bước là $\nu+t\Delta\nu$, khác số gia $\Delta\nu$.
:::

::: solution
(a) $g=\nabla F(u)=(8,10)^T$; cộng $A^T\nu=(2,2)^T$ được $r_d=(10,12)^T$, và $r_p=4+2-14=-8$. Hệ Newton gồm
$$2d_1+\Delta\nu=-10,\qquad 5d_2+\Delta\nu=-12,\qquad d_1+d_2=8.$$
Trừ hai hàng đầu được $2d_1-5d_2=2$; thế $d_2=8-d_1$ cho $7d_1=42$, nên $d=(6,2)^T$ và $\Delta\nu=-10-12=-22$. Bước đầy đủ cho $u^+=(10,4)^T$ và $\nu^+=2-22=-20$, trùng $u^*$ và $\nu^*$. Nhân tử của nghiệm là $\nu^+=\nu+\Delta\nu$, không phải số gia $\Delta\nu=-22$. Hai lỗi thường gặp là bỏ $A^T\nu$ khi lập $r_d$, và lấy vế phải hàng ràng buộc là $r_p=-8$ thay vì $-r_p=8$.

(b) Với $t=1/2$: $u^+=(7,3)^T$, $\nu^+=2-11=-9$; $\nabla F(u^+)=(14,15)^T$ nên $r_d^+=(5,6)^T$, và $r_p^+=10-14=-4$. Vậy $r^+=(5,6,-4)^T=\tfrac12r$ và $\|r^+\|_2=\tfrac12\|r\|_2$. Vì $F$ bậc hai, phần dư tuyến tính theo $(u,\nu)$ và co đúng theo hệ số $1-t$. Với $\alpha=0{,}1$, ngưỡng là $0{,}95\|r\|_2$; do $\tfrac12\|r\|_2\le0{,}95\|r\|_2$, bước được nhận. Thuật toán dừng khi đồng thời $\|r_p\|_2\le\varepsilon_p$ và $\|r_d\|_2\le\varepsilon_d$, vì mỗi phần dư ứng với một nhóm điều kiện KKT.
:::

## Bài 7 — Tính tự điều chỉnh và cận sai số

::: exercise
**Bài 7 (vận dụng).** (a) Với $\varphi(s)=s-\log s$, chứng minh tính tự điều chỉnh một biến: $|\varphi'''(s)|=2(\varphi''(s))^{3/2}$ cho mọi $s>0$. Giải thích ý nghĩa: điều này kiểm soát biến thiên độ cong tương đối bằng một điều kiện trên toàn miền, không phải một phép thử tại một điểm. (b) Xét $\tilde\varphi(s)=-\log s$ trên $s>0$. Tính $\tilde\varphi''$ và $\tilde\varphi'''$, chỉ ra nó cũng thỏa cùng đẳng thức tự điều chỉnh, nhưng $\tilde\varphi$ không có cực tiểu hữu hạn. Rút ra phản ví dụ này bác kết luận gì? (c) Xét hàm $f$ lồi chặt, thuộc lớp $C^3$, tự điều chỉnh chuẩn trên miền mở lồi, có Hessian xác định dương trên miền, đạt cực tiểu tại điểm hữu hạn với giá trị $p^*$, và tại $x$ độ giảm Newton thỏa $\delta_N(x)<1$. Nếu tại một điểm cho trước $\delta_N=3/4$, dùng cận sai số theo độ giảm Newton để biểu diễn chặn trên của $f(x)-p^*$ dưới dạng một biểu thức tường minh theo $\delta_N$. Tính giá trị của biểu thức đó tại $\delta_N=3/4$ và kiểm tra rằng thay $\delta_N$ bằng $\delta_N^2=9/16$ trong công thức cận cho giá trị khác; chẳng hạn con số $9/32$ không phải là giá trị của cận này tại các điểm số đã nêu. Phân biệt rõ đại lượng $\delta_N$ và $\delta_N^2$ khi thay vào công thức.
:::

::: hint
(a), (b): tính đạo hàm bậc ba của $s-\log s$ và của $-\log s$, rồi so sánh $|\varphi'''(s)|$ với $2(\varphi''(s))^{3/2}$; $-\log s\to+\infty$ khi $s\to0^+$ và $\to-\infty$ khi $s\to\infty$. (c): áp dụng kết luận $f(x)-p^*\le\omega_*(\delta_N)=-\delta_N-\log(1-\delta_N)$ với đúng các giả thiết đã cho (tự điều chỉnh, lồi chặt, $C^3$, Hessian xác định dương, đạt cực tiểu, $\delta_N<1$); chỉ thay $\delta_N$ vào công thức, phân biệt với $\delta_N^2$, và tính giá trị cận tại $\delta_N=3/4$.
:::

::: solution
(a) $\varphi'''(s)=-2/s^3$ và $\varphi''(s)=1/s^2$, nên $(\varphi''(s))^{3/2}=1/s^3$ và $2(\varphi''(s))^{3/2}=2/s^3=|\varphi'''(s)|$ với mọi $s>0$. Ý nghĩa: điều kiện kiểm soát biến thiên độ cong tương đối trên toàn miền; để suy ra một bảo đảm hội tụ của Newton còn phải kiểm tra giả thiết của định lý, gồm tính xác định dương của Hessian và sự tồn tại của nghiệm.

(b) $\tilde\varphi'(s)=-1/s$, $\tilde\varphi''(s)=1/s^2$, $\tilde\varphi'''(s)=-2/s^3$, nên $|\tilde\varphi'''(s)|=2/s^3=2(\tilde\varphi''(s))^{3/2}$: cùng đẳng thức tự điều chỉnh. Nhưng $\tilde\varphi(s)\to+\infty$ khi $s\to0^+$ và $\tilde\varphi(s)\to-\infty$ khi $s\to\infty$, nên không có cực tiểu hữu hạn. Phản ví dụ này bác kết luận "tính tự điều chỉnh suy ra tồn tại nghiệm": tự điều chỉnh chỉ kiểm soát độ cong tương đối, không bảo đảm hàm bị chặn dưới và đạt giá trị nhỏ nhất. Với $\tilde\varphi$ còn có $\delta_N^2=\tilde\varphi'(s)^2/\tilde\varphi''(s)=1$ tại mọi $s>0$, nên giả thiết $\delta_N<1$ của cận sai số cũng không thỏa.

(c) Với các giả thiết đã cho (tự điều chỉnh chuẩn, lồi chặt, $C^3$, Hessian xác định dương trên miền, đạt cực tiểu hữu hạn $p^*$, và $\delta_N(x)<1$), cận sai số theo độ giảm Newton là
$$f(x)-p^*\le\omega_*(\delta_N)=-\delta_N-\log(1-\delta_N).$$
Thay $\delta_N=3/4$ (chính đại lượng độ giảm Newton, không phải bình phương của nó):
$$\omega_*(3/4)=-\frac{3}{4}-\log\Big(1-\frac{3}{4}\Big)= -\frac{3}{4}-\log\frac{1}{4}=\log 4-\frac{3}{4}.$$
Vậy $f(x)-p^*\le\log 4-\tfrac34\approx0{,}636294$.

Nếu nhầm thay $\delta_N^2=9/16$ vào công thức thì được $-\frac{9}{16}-\log\frac{7}{16}$, một giá trị khác hẳn; nói riêng con số $9/32$ không phải là giá trị của cận này tại các điểm số đã nêu. Cần phân biệt rõ: cận áp dụng cho $\delta_N$, không phải cho $\delta_N^2$.
:::

## Bài 13 — Độ chặt của cận sai số tại $s=3/2$

::: exercise
**Bài 13 (tính toán).** Cho $\varphi(s)=s-\log s$ trên $s>0$, nghiệm $s^*=1$, $\varphi^*=1$. Hàm này tự điều chỉnh (Bài 7(a)), lồi chặt và đạt cực tiểu. Với hàm một biến, độ giảm Newton thỏa $\delta^2=\varphi'(s)^2/\varphi''(s)$, và khi $\delta<1$, cận sai số theo độ giảm Newton là
$$\varphi(s)-\varphi^*\le-\delta-\log(1-\delta).$$

(a) Tại $s=3/2$: tính $\delta$, giá trị cận, sai số $\varphi(s)-\varphi^*$ và giảm mô hình $\delta^2/2$; sắp thứ tự ba số.

(b) So kết quả câu (a) với điểm $s=1/4$, nơi $\delta=3/4$ và sai số bằng $\log4-3/4$.
:::

::: hint
$\varphi'(3/2)=1/3$ và $\varphi''(3/2)=4/9$. Với hàm này, $\delta^2=(1-1/s)^2s^2=(1-s)^2$ tại mọi $s>0$.
:::

::: solution
(a) Tại $s=3/2$: $g=1-2/3=1/3$, $H=4/9$, nên $\delta^2=g^2/H=(1/9)/(4/9)=1/4$ và $\delta=1/2$. Cận bằng
$$-\tfrac12-\log\tfrac12=\log2-\tfrac12\approx0{,}193.$$
Sai số thực tế là $\tfrac32-\log\tfrac32-1=\tfrac12-\log\tfrac32\approx0{,}095$, và giảm mô hình là $\delta^2/2=1/8$. Thứ tự $0{,}095<0{,}125<0{,}193$ cho thấy cận đúng nhưng không chặt, và tại điểm này giảm mô hình lớn hơn sai số.

(b) Vì $\delta^2=(1-s)^2$, khi $s<1$ ta có $\delta=1-s$ và cận $-(1-s)-\log s=\varphi(s)-1$ trùng sai số; tại $s=1/4$ cả hai bằng $\log4-3/4\approx0{,}636$. Khi $1<s<2$ (để $\delta<1$), đặt $u=s-1\in(0,1)$; hiệu giữa cận và sai số là $\log\frac{1+u}{1-u}-2u>0$, nên cận lớn hơn hẳn sai số. Dấu bằng tại $s=1/4$ vì vậy là trường hợp riêng của các điểm bên trái nghiệm.
:::

## Bài 8 — Mô hình học có ràng buộc

::: exercise
**Bài 8 (vận dụng).** Bài toán bình phương nhỏ nhất chính quy hóa có ràng buộc: cho dữ liệu $M\in\mathbb R^{m\times n}$, đích $y\in\mathbb R^m$, tham số chính quy hóa $\rho>0$ cho trước, ma trận ràng buộc $A\in\mathbb R^{p\times n}$ hạng hàng đầy đủ và $b\in\mathbb R^p$,
đặt $J(w)=\tfrac12\|Mw-y\|_2^2+\tfrac{\rho}{2}\|w\|_2^2$ và xét
$$\min_{w\in\mathbb R^n} J(w)\quad\text{với}\quad Aw=b.$$
$A$ là ma trận ràng buộc kích thước $p\times n$, không phải Hessian. $\rho$ là tham số cho trước điều khiển mức chính quy hóa; $\nu$ là nhân tử đẳng thức cần tìm; $\lambda$ ở Bài 03 là nhân tử bất đẳng thức, vai trò khác.

**(a)** Tính gradient $g(w)$ và Hessian $H$ của hàm mục tiêu, nêu kích thước từng đại lượng. Chứng minh $H\succ0$ mà không cần $M$ hạng cột đầy đủ. Lập hàm Lagrange và điều kiện KKT (điều kiện dừng và tính khả thi), rồi viết hệ KKT dạng khối với ẩn $(w^*,\nu^*)$.

**(b)** Cho $M=\operatorname{diag}(1,2)$, $y=(0,0)^T$, $\rho=1$, $A=\begin{bmatrix}1&1\end{bmatrix}$ và $b=14$. Tại điểm xuất phát $w^0=(1,8)^T$, $\nu^0=4$: tính hai phần dư $r_d=g(w^0)+A^T\nu^0$ và $r_p=Aw^0-b$, rồi điền chúng vào mẫu hệ tuyến tính hóa KKT
$$\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\Delta\nu\end{bmatrix}=-\begin{bmatrix}\square\\\square\end{bmatrix}.$$ Nêu rõ khác biệt giữa ẩn thứ hai $\Delta\nu$ của hệ phần dư và nhân tử $\nu$ trong hệ KKT gốc. Giải hệ, cập nhật cả hai biến ở bước đầy đủ và kiểm tra lại hai phần dư.
:::

::: hint
Viết hàm mục tiêu thành hai thành phần và lấy gradient từng phần: gradient của $\tfrac12\|Mw-y\|_2^2$ là $M^T(Mw-y)$, gradient của $\tfrac{\rho}{2}\|w\|_2^2$ là $\rho w$; cộng lại được $g$, và Hessian $H=M^TM+\rho I$. Với $v\ne0$, xét $v^THv=\|Mv\|_2^2+\rho\|v\|_2^2$ để kết luận $H\succ0$. Lập Lagrange $L(w,\nu)=J(w)+\nu^T(Aw-b)$; điều kiện dừng là $g+A^T\nu=0$, khả thi là $Aw=b$. Vì $g=Hw-M^Ty$, điều kiện dừng đưa về hệ khối $\begin{bmatrix}H & A^T\\ A & 0\end{bmatrix}\begin{bmatrix}w\\ \nu\end{bmatrix}=\begin{bmatrix}M^Ty\\ b\end{bmatrix}$; giữ $M^Ty$ khi $y\ne0$. Ở câu (b): thay $w^0,\nu^0$ vào công thức $r_d=g+A^T\nu$ và $r_p=Aw-b$, sau đó điền cặp phần dư vào vế phải của hệ đã tuyến tính hóa; phân biệt vai trò của các ẩn $(d,\Delta\nu)$.
:::

::: solution
**(a) Gradient, Hessian và hệ KKT.** Kích thước: $M\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, $A\in\mathbb R^{p\times n}$ (ma trận ràng buộc, không phải Hessian), $b\in\mathbb R^p$, $w\in\mathbb R^n$, $\nu\in\mathbb R^p$. Gradient $g(w)\in\mathbb R^n$ và Hessian $H\in\mathbb R^{n\times n}$ của hàm mục tiêu:
$$g(w)=M^T(Mw-y)+\rho w=Hw-M^Ty,\qquad H=M^TM+\rho I.$$
Với $v\ne0$: $v^THv=\|Mv\|_2^2+\rho\|v\|_2^2\ge\rho\|v\|_2^2>0$, nên $H\succ0$ mà không cần $M$ hạng cột đầy đủ. Hàm Lagrange $L(w,\nu)=J(w)+\nu^T(Aw-b)$; điều kiện KKT (dừng và khả thi):
$$g(w)+A^T\nu=0,\qquad Aw=b.$$
Vì $g=Hw-M^Ty$, hệ KKT dạng khối với ẩn $(w^*,\nu^*)$ là
$$\begin{bmatrix}H & A^T\\ A & 0\end{bmatrix}\begin{bmatrix}w^*\\ \nu^*\end{bmatrix}=\begin{bmatrix}M^Ty\\ b\end{bmatrix},$$
khả nghịch vì $H\succ0$ và $A$ hạng hàng đầy đủ. Giữ $M^Ty$ khi $y\ne0$; $\rho$ là tham số cho trước, $\nu$ là nhân tử đẳng thức cần tìm, còn $\lambda$ ở Bài 03 là nhân tử bất đẳng thức.

**(b) Điền phần dư vào mẫu hệ.** Lấy bộ số minh họa $M=\operatorname{diag}(1,2)$, $y=0$, $\rho=1$, $A=[1\;1]$, $b=14$, nên $H=\operatorname{diag}(2,5)$, $M^Ty=0$. Tại $w^0=(1,8)^T$, $\nu^0=4$ (chưa khả thi vì $Aw^0=9\ne14$):
$$r_d=g(w^0)+A^T\nu^0=(2,40)^T+(4,4)^T=(6,44)^T,\qquad r_p=Aw^0-b=9-14=-5.$$
Mẫu hệ tuyến tính hóa KKT cho ẩn $(d,\Delta\nu)$:
$$\begin{bmatrix}H & A^T\\ A & 0\end{bmatrix}\begin{bmatrix}d\\ \Delta\nu\end{bmatrix}=-\begin{bmatrix}r_d\\ r_p\end{bmatrix}=-\begin{bmatrix}(6,44)^T\\ -5\end{bmatrix}.$$
$\Delta\nu$ là số gia của nhân tử trong bước Newton, còn $\nu$ trong hệ KKT gốc là nhân tử tại nghiệm. Kiểm tra nghiệm: nghiệm của hệ KKT là $w^*=(10,4)^T$, $\nu^*=-20$, nên $d=(9,-4)^T$, $\Delta\nu=-24$; khi đó $Ad=5=-r_p$ và sau một bước cả hai phần dư triệt tiêu, đúng tính chất của Newton trên bài toán bậc hai. Gradient tại nghiệm có ràng buộc không bằng không: $g(w^*)=(20,20)^T$, nhưng $g(w^*)+A^T\nu^*=0$.
:::

---
*Nguồn cơ chế: Boyd–Vandenberghe (2004), chương 9–10, [Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/); MIT 6.079, bài giảng 16–17, [MIT 6.079, Fall 2009](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/). Các bộ số trong bài tập là ví dụ sư phạm tự xây dựng phục vụ tính thủ công.*
