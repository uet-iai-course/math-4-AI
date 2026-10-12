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
1. Sai. Lấy $\inf_xL$ trên miền xác định ban đầu, không áp lại các ràng buộc đã đưa vào Lagrange. Trong bài toán một biến trên đoạn $[2,4]$, điểm $x(1)=1{,}5$ nằm ngoài $[2,4]$ nhưng cho cận hợp lệ $4{,}5$.
2. Sai. Chuỗi $g\le L\le f_0$ chỉ dùng định nghĩa $\inf$, tính khả thi và dấu nhân tử.
3. Sai. $\min x$ với $x^2\le0$ có $p^*=d^*=0$ dù không có điểm khả thi nghiêm.
4. Sai. $\min x^2$ với $x\le0$ có $(x^*,\lambda^*)=(0,0)$.
5. Đúng trong dạng bài toán đang học: các hàm lồi khả vi trên toàn không gian, đẳng thức affine. Dừng làm $x^*$ cực tiểu hóa Lagrange; khả thi và bù trừ làm cận khít.
6. Sai. Đây là đạo hàm tại một điểm, chỉ cho xấp xỉ với nhiễu nhỏ. Trong bài toán một biến trên đoạn $[2,4]$, $p(1)=12-6\sqrt2\approx3{,}51472$, khác $5-2=3$.
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
Ràng buộc viết thành $f_1(x)=x-1\le0$, nên $L(x,\lambda)=(x-2)^2+\lambda(x-1)$. Hoàn thành bình phương theo $x$ cho

$$
L(x,\lambda)=\left(x-2+\frac\lambda2\right)^2+\lambda-\frac{\lambda^2}{4},
\qquad
g(\lambda)=\lambda-\frac{\lambda^2}{4}.
$$

Ta có $g'(\lambda)=1-\lambda/2$, nên $\lambda^*=2$ và $d^*=g(2)=1$. Với $\lambda=2$, $L(x,2)=(x-1)^2+1\ge1$. Điểm $x=1$ khả thi, nên chuỗi đối ngẫu yếu cho $1=g(2)\le p^*\le f_0(1)=1$. Do đó $x^*=1$ và $p^*=d^*=1$.

Chọn điểm Slater $\bar x=0$, thỏa $\bar x-1=-1<0$. KKT là $x\le1$, $\lambda\ge0$, $\lambda(x-1)=0$, $2(x-2)+\lambda=0$. Trường hợp $\lambda=0$ cho $x=2$ không khả thi; trường hợp $x=1$ cho $\lambda=2$. Bài toán lồi nên bộ này chứng nhận tối ưu.
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
Trong bài toán một biến trên đoạn $[2,4]$, với $f_0=x^2+1$, $f_1=(x-2)(x-4)$, đặt $u=f_1(x)$, $t=f_0(x)$.

1. Tính $(u,t)$ tại $x=1{,}5$ và $x=2$; xác định điểm khả thi.
2. Đường $t=4{,}5-u$ đỡ và tiếp xúc với tập giá trị. Đọc $\lambda$, $g(\lambda)$ và chặn trên sai số tối ưu của phương án chi phí $5$. Xét xem có suy ra được $p^*-d^*=0{,}5$ hay không.
3. Chứng minh đường $t=5-2u$ tạo cận khít bằng một đẳng thức bình phương.
4. Giải thích vì sao tiếp xúc tại một điểm của tập giá trị chưa đủ để chứng nhận nghiệm gốc.
:::

::: solution
Với $x=1{,}5$, $(u,t)=(1{,}25;3{,}25)$, không khả thi vì $u>0$. Với $x=2$, $(u,t)=(0,5)$, khả thi.

Đường thứ nhất có độ dốc $-\lambda=-1$, nên $\lambda=1$; tung độ gốc là $g(1)=4{,}5$. Đối ngẫu yếu cho cận dưới $p^*\ge4{,}5$, còn phương án khả thi chi phí $5$ cho cận trên $p^*\le5$. Vì vậy sai số tối ưu của phương án là $5-p^*\le0{,}5$. Không suy ra được $p^*-d^*=0{,}5$: từ đường này chỉ biết $p^*-d^*\le0{,}5$. Thực tế $g(2)=5$ (câu 3), nên $p^*-d^*=0$.

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
Tại $\tau=1$, ràng buộc là $f_1(w)=w^2-1\le0$; dừng là $(w-3)+2\lambda w=0$, bù trừ là $\lambda(w^2-1)=0$.

- Trường hợp $\lambda=0$: $w=3$, nhưng $w^2=9>1$, loại.
- Trường hợp $w^2=1$: $w=1$ cho $\lambda=1$, hợp lệ; $w=-1$ cho $\lambda=-2<0$, loại.

Bộ $(w^*,\lambda^*)=(1,1)$ thỏa bốn nhóm: khả thi $1\le1$, khả thi đối ngẫu $1\ge0$, bù trừ $1\cdot(1-1)=0$, dừng $(1-3)+2\cdot1\cdot1=0$. Mục tiêu và hàm ràng buộc đều lồi khả vi, nên KKT đủ cho tối ưu toàn cục. Mất mát tối ưu bằng $2$. Điểm $w=0$ còn thỏa Slater.

Với $0<\tau<9$, điểm khả thi gần $3$ nhất là $w^*=\sqrt\tau$. Thay vào dừng cho

$$
\lambda^*(\tau)=\frac{3-\sqrt\tau}{2\sqrt\tau}>0.
$$

Với $\tau\ge9$, lấy $w^*=3$, $\lambda^*=0$, mất mát $0$. Tại $\tau=9$, ràng buộc hoạt động nhưng nhân tử bằng không. Với $\tau>9$, ràng buộc không hoạt động.
:::

## 7. Bài tập tổng hợp hai chiều

::: exercise
Chọn hai trọng số $x_1,x_2\in\mathbb R$ với tổng ít nhất $1$, đồng thời làm nhỏ bình phương chuẩn:

$$
\min(x_1^2+x_2^2)\quad\text{với }x_1+x_2\ge1.
$$

1. Kiểm tra tính lồi, Slater và tính hữu hạn của giá trị tối ưu.
2. Tính $g(\lambda)$ và giải đối ngẫu.
3. Giải KKT và viết một chứng nhận cận khít.
:::

::: solution
Ràng buộc $f_1=1-x_1-x_2\le0$ affine; mục tiêu có Hessian $2I$, nên bài toán lồi. Điểm $\bar x=(1,1)$ cho $f_1(\bar x)=-1<0$, nên thỏa Slater. Mục tiêu không âm và $\bar x$ khả thi, nên $0\le p^*\le f_0(\bar x)=2$. Định lý Slater cho $d^*=p^*$ và bài toán đối ngẫu đạt nghiệm, nhưng không bảo đảm nghiệm gốc tồn tại.

$$
\begin{aligned}
L&=x_1^2+x_2^2+\lambda(1-x_1-x_2)\\
&=(x_1-\lambda/2)^2+(x_2-\lambda/2)^2+\lambda-\lambda^2/2,\\
g(\lambda)&=\lambda-\lambda^2/2.
\end{aligned}
$$

Đối ngẫu đạt cực đại $1/2$ tại $\lambda^*=1$. KKT cho $2x_i-\lambda=0$. Nếu $\lambda=0$ thì $x_1=x_2=0$ không khả thi; vì vậy bù trừ buộc tổng bằng $1$, cho $x^*=(1/2,1/2)$.

Chứng nhận: $L(x,1)=(x_1-1/2)^2+(x_2-1/2)^2+1/2\ge1/2$, bằng mục tiêu tại điểm khả thi $x^*$. Do đó $p^*=d^*=1/2$.

:::

## Nguồn và phạm vi

Các bài tập được biên soạn và tính lại cho bài giảng này; bài 2–7 dùng phép hoàn thành bình phương, đạo hàm và các định lý đã trình bày. Kiến thức nền: Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, chương 5, §5.1–5.3, §5.5. [Nguồn chính thức](https://web.stanford.edu/~boyd/cvxbook/). Không yêu cầu nội tương đối, nón pháp tuyến hoặc kỹ thuật tối ưu số để giải các bài toán trên.
