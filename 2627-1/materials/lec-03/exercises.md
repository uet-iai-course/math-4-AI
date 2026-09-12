# Bài tập Bài 03 — Đối ngẫu Lagrange, Slater và KKT

Quy ước: mọi bài toán là cực tiểu; bất đẳng thức được viết thành $f_i(x)\le0$ trước khi đặt nhân tử $\lambda_i\ge0$. Khi dùng KKT, kiểm tra đủ khả thi gốc, khả thi đối ngẫu, bù trừ và dừng. Các lời giải được gập để có thể tự làm trước.

## 1. Nhận biết và sửa phát biểu

::: exercise
Xác định đúng hoặc sai; giải thích hoặc cho phản ví dụ.

1. Khi tính $g(\lambda)$, phải giữ ràng buộc gốc trên $x$.
2. Đối ngẫu yếu cần bài toán gốc lồi.
3. Slater không thỏa thì đối ngẫu mạnh sai.
4. Ràng buộc hoạt động luôn có nhân tử dương.
5. Trong bài toán lồi khả vi, một bộ thỏa KKT chứng nhận tối ưu toàn cục mà không cần kiểm tra Slater.
6. Công thức $p'(0)=-\lambda^*$ cho phép kết luận $p(1)=p(0)-\lambda^*$.
:::

::: solution
1. Sai. Lấy $\inf_xL$ trên miền xác định ban đầu, không áp lại các ràng buộc đã đưa vào Lagrange. Ví dụ trong bài: $x(1)=1{,}5$ nằm ngoài $[2,4]$ nhưng cho cận hợp lệ $4{,}5$.
2. Sai. Chuỗi $g\le L\le f_0$ chỉ dùng định nghĩa $\inf$, tính khả thi và dấu nhân tử.
3. Sai. $\min x$ với $x^2\le0$ có $p^*=d^*=0$ dù không có điểm khả thi nghiêm.
4. Sai. $\min x^2$ với $x\le0$ có $(x^*,\lambda^*)=(0,0)$.
5. Đúng trong dạng bài đang học: các hàm lồi khả vi trên toàn không gian, đẳng thức affine. Dừng làm $x^*$ cực tiểu hóa Lagrange; khả thi và bù trừ làm cận khít.
6. Sai. Đây là đạo hàm tại một điểm, chỉ cho xấp xỉ với nhiễu nhỏ. Trong ví dụ chính, $p(1)=12-6\sqrt2\approx3{,}51472$, khác $5-2=3$.
:::

## 2. Tính cận dưới và chứng nhận nghiệm

::: exercise
Xét $\min_{x\in\mathbb R}(x-2)^2$ với $x\le1$.

1. Lập $L(x,\lambda)$ và tính $g(\lambda)$ trên $\lambda\ge0$.
2. Giải bài toán đối ngẫu.
3. Dùng một đẳng thức hoàn thành bình phương để chứng nhận nghiệm gốc.
4. Kiểm tra Slater và giải lại bằng KKT.
:::

::: hint
Ràng buộc là $x-1\le0$. Không bỏ hạng $-\lambda$ khỏi Lagrange. Khi cực tiểu hóa theo $x$, nghiệm bên trong là $2-\lambda/2$.
:::

::: solution

$$
L=(x-2)^2+\lambda(x-1)
=\left(x-2+\frac\lambda2\right)^2+\lambda-\frac{\lambda^2}{4}.
$$

Vì vậy $g(\lambda)=\lambda-\lambda^2/4$, cực đại tại $\lambda^*=2$, giá trị $1$. Với $\lambda=2$, $L(x,2)=(x-1)^2+1\ge1$. Điểm $x=1$ khả thi và có mục tiêu $1$, nên $x^*=1$, $p^*=d^*=1$.

Chọn điểm Slater $\bar x=0$, thỏa $\bar x-1=-1<0$. KKT là $x\le1$, $\lambda\ge0$, $\lambda(x-1)=0$, $2(x-2)+\lambda=0$. Nhánh $\lambda=0$ cho $x=2$ không khả thi; nhánh $x=1$ cho $\lambda=2$. Bài toán lồi nên bộ này chứng nhận tối ưu.
:::

## 3. Kiểm tra Slater khi có đẳng thức

::: exercise
Xét $x\in\mathbb R^2$:

$$
\min(x_1^2+x_2^2)\quad\text{với }x_1+x_2=1,\quad x_1\ge0,\quad x_2\ge0.
$$

1. Viết dạng chuẩn và tìm một điểm Slater.
2. Kiểm tra $p^*$ hữu hạn; nêu kết luận của định lý Slater.
3. Tìm một bộ KKT và chứng nhận nghiệm tối ưu.
:::

::: solution
Dạng chuẩn: $f_1=-x_1\le0$, $f_2=-x_2\le0$, $A=(1\;1)$, $b=1$. Chọn $\bar x=(1/2,1/2)$: cả hai bất đẳng thức nghiêm và đẳng thức đúng. Mục tiêu không âm, điểm khả thi có chi phí $1/2$, nên $0\le p^*\le1/2$. Các hàm lồi, đẳng thức affine; Slater cho đối ngẫu mạnh và nghiệm đối ngẫu tồn tại.

$$
L=x_1^2+x_2^2-\lambda_1x_1-\lambda_2x_2+\nu(x_1+x_2-1).
$$

Tại $x^*=(1/2,1/2)$, hai ràng buộc bất đẳng thức không hoạt động nên bù trừ cho $\lambda_1^*=\lambda_2^*=0$. Hai phương trình dừng là $2x_i-\lambda_i+\nu=0$, cho $\nu^*=-1$. Nhân tử đẳng thức được phép âm. Tất cả KKT thỏa, nên $p^*=1/2$.
:::

## 4. Giới hạn của điều kiện đủ

::: exercise
Xét $\min_{x\in\mathbb R}x$ với $x^2\le0$.

1. Tìm nghiệm gốc, giá trị tối ưu và kiểm tra Slater.
2. Tính $g(\lambda)$ cho $\lambda=0$ và $\lambda>0$.
3. Phân biệt đối ngẫu mạnh với sự đạt nghiệm đối ngẫu.
4. Kiểm tra liệu có nhân tử KKT tại nghiệm gốc hay không.
:::

::: solution
Miền khả thi chỉ có $x=0$, nên $x^*=0$, $p^*=0$. Không tồn tại $x^2<0$ nên Slater không thỏa.

Với $\lambda=0$, $g(0)=\inf_xx=-\infty$. Với $\lambda>0$,

$$
L=x+\lambda x^2
=\lambda\left(x+\frac1{2\lambda}\right)^2-\frac1{4\lambda},
\qquad g(\lambda)=-\frac1{4\lambda}.
$$

Ta có $d^*=\sup g=0=p^*$, nhưng mọi $\lambda$ hữu hạn đều cho giá trị nhỏ hơn $0$. Đối ngẫu mạnh đúng; đối ngẫu không đạt nghiệm. Dừng KKT tại $0$ đòi $1+2\lambda\cdot0=0$, vô nghiệm. Một nghiệm tối ưu không nhất thiết có nhân tử KKT nếu thiếu điều kiện chính quy.
:::

## 5. Đọc hình và giải thích cận

::: exercise
Trong ví dụ $f_0=x^2+1$, $f_1=(x-2)(x-4)$, đặt $u=f_1(x)$, $t=f_0(x)$.

1. Tính $(u,t)$ tại $x=1{,}5$ và $x=2$; xác định điểm khả thi.
2. Đường $t=4{,}5-u$ đỡ và chạm tập giá trị. Đọc $\lambda$, $g(\lambda)$ và chặn trên sai số của phương án chi phí $5$.
3. Chứng minh đường $t=5-2u$ tạo cận khít bằng một đẳng thức bình phương.
4. Giải thích vì sao tiếp xúc tại một điểm của tập giá trị chưa đủ để chứng nhận nghiệm gốc.
:::

::: solution
Với $x=1{,}5$, $(u,t)=(1{,}25;3{,}25)$, không khả thi vì $u>0$. Với $x=2$, $(u,t)=(0,5)$, khả thi.

Đường thứ nhất có hệ số góc $-1$, tung độ cắt $4{,}5$: $\lambda=1$, $g(1)=4{,}5$. Theo đối ngẫu yếu, $4{,}5\le p^*\le5$, nên sai số của phương án không quá $0{,}5$. Không kết luận khoảng đối ngẫu tối ưu bằng $0{,}5$.

Ta có $t+2u-5=3(x-2)^2\ge0$, đạt dấu bằng tại $x=2$. Vì điểm này khả thi và $t=5=g(2)$, đó là chứng nhận tối ưu. Tiếp xúc riêng lẻ có thể ở điểm không khả thi, như với $\lambda=1$; còn muốn cận khít tại một điểm khả thi phải có thêm $f_0(x)=g(\lambda)$.
:::

## 6. Vận dụng KKT vào hồi quy

::: exercise
Xét mô hình một trọng số, với giới hạn $\tau>0$:

$$
\min_{w\in\mathbb R}\frac12(w-3)^2\quad\text{với }w^2\le\tau.
$$

1. Tại $\tau=1$, giải tất cả các trường hợp từ bù trừ và loại ứng viên không hợp lệ.
2. Kiểm tra bốn nhóm KKT; nêu giả thiết làm chúng đủ.
3. Tìm $w^*(\tau)$, $\lambda^*(\tau)$ với $0<\tau<9$ và với $\tau\ge9$.
4. Tại $\tau=9$, ràng buộc hoạt động có nhất thiết có nhân tử dương không?
:::

::: solution
Tại $\tau=1$, dừng là $w-3+2\lambda w=0$, bù trừ là $\lambda(w^2-1)=0$. Nhánh $\lambda=0$ cho $w=3$ không khả thi. Nhánh $w=1$ cho $\lambda=1$ hợp lệ; nhánh $w=-1$ cho $\lambda=-2$ trái dấu.

Bộ $(w^*,\lambda^*)=(1,1)$ thỏa $w^2\le1$, $\lambda\ge0$, bù trừ và dừng. Mục tiêu và hàm ràng buộc đều lồi khả vi, nên KKT đủ cho tối ưu toàn cục. Mất mát tối ưu bằng $2$. Điểm $w=0$ còn thỏa Slater.

Với $0<\tau<9$, điểm khả thi gần $3$ nhất là $w^*=\sqrt\tau$. Thay vào dừng cho

$$
\lambda^*(\tau)=\frac{3-\sqrt\tau}{2\sqrt\tau}>0.
$$

Với $\tau\ge9$, lấy $w^*=3$, $\lambda^*=0$, mất mát $0$. Tại $\tau=9$, ràng buộc hoạt động nhưng nhân tử bằng không. Với $\tau>9$, ràng buộc không hoạt động.
:::

## 7. Độ nhạy và giới hạn của xấp xỉ

::: exercise
Trong ví dụ xuyên suốt, nới ràng buộc thành $(x-3)^2\le1+u$. Với $-1\le u\le8$, biết $p(u)=11+u-6\sqrt{1+u}$.

1. Tính $p'(0)$ và đối chiếu với $\lambda^*=2$.
2. Tính giá trị đúng và xấp xỉ tuyến tính tại $u=0{,}1$ và $u=1$.
3. Phân biệt cận toàn cục với xấp xỉ cục bộ.
4. Với mô hình hồi quy ở bài 6, dự đoán mất mát khi nới $\tau$ từ $1$ lên $1{,}1$, rồi kiểm tra bằng công thức đúng.
:::

::: solution
$p'(u)=1-3/\sqrt{1+u}$, nên $p'(0)=-2=-\lambda^*$; tiếp tuyến là $5-2u$.

| Mức nới $u$ | Giá trị đúng | Xấp xỉ tuyến tính | Sai số tuyệt đối |
|---|---|---|---|
| $0{,}1$ | $11{,}1-6\sqrt{1{,}1}\approx4{,}80715$ | $4{,}8$ | $0{,}00715$ |
| $1$ | $12-6\sqrt2\approx3{,}51472$ | $3$ | $0{,}51472$ |

Cận $p(u)\ge5-2u$ đúng cho mọi $u$ theo giả thiết đối ngẫu mạnh và nhân tử tối ưu tại $0$. Xấp xỉ $p(u)\approx5-2u$ chỉ chính xác cục bộ; nó dùng thêm khả vi của hàm giá trị. Sai số tăng ở $u=1$ vì độ dốc của $p$ thay đổi.

Trong hồi quy, $v(1)=2$, $\lambda^*=1$, nên dự đoán $v(1{,}1)\approx2-0{,}1=1{,}9$. Giá trị đúng là $\tfrac12(3-\sqrt{1{,}1})^2\approx1{,}90357$.
:::

## 8. Bài tập tổng hợp hai chiều

::: exercise
Chọn hai trọng số $x_1,x_2\in\mathbb R$ với tổng ít nhất $1$, đồng thời làm nhỏ bình phương chuẩn:

$$
\min(x_1^2+x_2^2)\quad\text{với }x_1+x_2\ge1.
$$

1. Kiểm tra tính lồi, Slater và tính hữu hạn của giá trị tối ưu.
2. Tính $g(\lambda)$ và giải đối ngẫu.
3. Giải KKT và viết một chứng nhận cận khít.
4. Siết yêu cầu thành $x_1+x_2\ge1+\varepsilon$ với $\varepsilon>0$ nhỏ. Tính giá trị tối ưu mới và giải thích dấu của độ nhạy.
:::

::: solution
Mục tiêu lồi, ràng buộc $f_1=1-x_1-x_2\le0$ affine. Điểm $(1,1)$ thỏa Slater. Mục tiêu không âm, có điểm khả thi hữu hạn, nên $p^*$ hữu hạn.

$$
\begin{aligned}
L&=x_1^2+x_2^2+\lambda(1-x_1-x_2)\\
&=(x_1-\lambda/2)^2+(x_2-\lambda/2)^2+\lambda-\lambda^2/2,\\
g(\lambda)&=\lambda-\lambda^2/2.
\end{aligned}
$$

Đối ngẫu đạt cực đại $1/2$ tại $\lambda^*=1$. KKT cho $2x_i-\lambda=0$. Nếu $\lambda=0$ thì $x_1=x_2=0$ không khả thi; vì vậy bù trừ buộc tổng bằng $1$, cho $x^*=(1/2,1/2)$.

Chứng nhận: $L(x,1)=(x_1-1/2)^2+(x_2-1/2)^2+1/2\ge1/2$, bằng mục tiêu tại điểm khả thi $x^*$. Do đó $p^*=d^*=1/2$.

Với $\varepsilon$ gần $0$, nghiệm mới là $x_i=(1+\varepsilon)/2$, giá trị $q(\varepsilon)=(1+\varepsilon)^2/2$. Suy ra $q'(0)=1$: siết yêu cầu làm chi phí tăng xấp xỉ $\varepsilon$. Theo quy ước $f_1\le u$, thay đổi này tương ứng $u=-\varepsilon$; công thức $p'(0)=-\lambda^*=-1$ vì thế hoàn toàn nhất quán.
:::

## Nguồn và phạm vi

Các bài tập được biên soạn và tính lại cho bài giảng này; bài 2–8 dùng phép hoàn thành bình phương, đạo hàm và các định lý đã trình bày. Kiến thức nền: Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, chương 5, §5.1–5.3, §5.5–5.6. [Nguồn chính thức](https://web.stanford.edu/~boyd/cvxbook/). Không yêu cầu nội tương đối, nón pháp tuyến hoặc kỹ thuật tối ưu số để giải các bài trên.
