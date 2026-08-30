# Đặc tả toán học tiền triển khai — Bài giảng 03

## 1. Quy ước chung

Xét bài toán cực tiểu dạng chuẩn

$$
\begin{aligned}
\operatorname{minimize}\quad & f_0(x)\\
\text{subject to}\quad & f_i(x)\leq 0,\quad i=1,\ldots,m,\\
& h_j(x)=0,\quad j=1,\ldots,p.
\end{aligned}
$$

Hàm Lagrange và hàm đối ngẫu là

$$
L(x,\lambda,\nu)
=f_0(x)+\sum_{i=1}^m\lambda_i f_i(x)+\sum_{j=1}^p\nu_j h_j(x),
$$

$$
g(\lambda,\nu)=\inf_{x\in\mathcal D}L(x,\lambda,\nu).
$$

- Điều kiện khả thi đối ngẫu của nhân tử bất đẳng thức là $\lambda\succeq 0$; nhân tử đẳng thức $\nu$ không bị ràng buộc dấu.
- Với mọi điểm khả thi đối ngẫu, $g(\lambda,\nu)\leq p^\star$.
- Khi dùng nhiễu vế phải, đặc tả này cố định quy ước $f_i(x)\leq u_i$ và $h_j(x)=v_j$. Theo định nghĩa, $s\in\partial p^\star(0,0)$ khi $p^\star(u,v)\geq p^\star(0,0)+s^T(u,v)$ với mọi $(u,v)$. Nếu bài không nhiễu có đối ngẫu mạnh và nghiệm đối ngẫu đạt được thì có thể chọn $s=(-\lambda^\star,-\nu^\star)$. Nếu hàm giá trị khả vi tại $(0,0)$, gradient duy nhất bằng cặp này; theo từng thành phần, $\partial p^\star/\partial u_i=-\lambda_i^\star$ và $\partial p^\star/\partial v_j=-\nu_j^\star$.
- Nếu viết ràng buộc dưới dạng $f_i(x)+u_i\leq 0$, dấu độ nhạy đổi lại. Bộ trang chiếu không được trộn hai quy ước.

Nguồn kiểm chứng chính: Boyd và Vandenberghe, *Convex Optimization*, Chương 5; `sources/dual.pdf`, trang 5-2 đến 5-25; `sources/Bài tập chương 4.pdf`, Bài 1.

## 2. Ví dụ xuyên suốt một biến

### 2.1. Bài toán gốc

$$
\begin{aligned}
\operatorname{minimize}\quad & f_0(x)=x^2+1\\
\text{subject to}\quad & f_1(x)=(x-2)(x-4)\leq 0,
\end{aligned}
\qquad x\in\mathbb R.
$$

Ta có

$$
f_1(x)=x^2-6x+8=(x-3)^2-1.
$$

Do đó tập khả thi là $[2,4]$. Trên khoảng này $x>0$, nên $f_0(x)=x^2+1$ tăng theo $x$. Vì vậy

$$
x^\star=2,
\qquad
p^\star=f_0(2)=5.
$$

Cả $f_0$ và $f_1$ đều lồi vì $f_0''(x)=f_1''(x)=2>0$.

### 2.2. Hàm Lagrange và hàm đối ngẫu

Với $\lambda\in\mathbb R$,

$$
\begin{aligned}
L(x,\lambda)
&=x^2+1+\lambda(x^2-6x+8)\\
&=(1+\lambda)x^2-6\lambda x+1+8\lambda.
\end{aligned}
$$

Phải tách miền của hàm đối ngẫu trước khi lấy đạo hàm:

- Nếu $\lambda>-1$, hệ số bậc hai dương và điểm đạt infimum là

$$
x_\lambda=\frac{3\lambda}{1+\lambda}.
$$

Thế vào $L$ cho

$$
\begin{aligned}
g(\lambda)
&=1+8\lambda-\frac{9\lambda^2}{1+\lambda}\\
&=\frac{-\lambda^2+9\lambda+1}{1+\lambda}.
\end{aligned}
$$

- Nếu $\lambda=-1$, $L(x,-1)=6x-7$, nên $\inf_xL(x,-1)=-\infty$.
- Nếu $\lambda<-1$, $L(\cdot,\lambda)$ là một tam thức bậc hai có hệ số đầu âm, nên cũng không bị chặn dưới.

Vì vậy hàm đối ngẫu mở rộng là

$$
g(\lambda)=
\begin{cases}
\dfrac{-\lambda^2+9\lambda+1}{1+\lambda}, & \lambda>-1,\\
-\infty, & \lambda\leq -1.
\end{cases}
$$

Miền hữu hiệu là $\operatorname{dom}g=(-1,\infty)$. Bài toán đối ngẫu còn yêu cầu $\lambda\geq 0$:

$$
\operatorname{maximize}_{\lambda\geq 0}\quad g(\lambda).
$$

### 2.3. Nghiệm đối ngẫu và khoảng đối ngẫu

Trên $(-1,\infty)$,

$$
g'(\lambda)
=\frac{8-2\lambda-\lambda^2}{(1+\lambda)^2}
=\frac{9}{(1+\lambda)^2}-1,
$$

$$
g''(\lambda)=-\frac{18}{(1+\lambda)^3}<0.
$$

Do đó $g$ lõm chặt trên miền hữu hiệu. Phương trình $g'(\lambda)=0$ cho

$$
(1+\lambda)^2=9.
$$

Trong miền $\lambda\geq 0$, nghiệm duy nhất là

$$
\lambda^\star=2.
$$

Khi đó

$$
d^\star=g(2)=5=p^\star,
\qquad
p^\star-d^\star=0.
$$

Bảng kiểm tra số dùng được cho đồ thị hoặc câu hỏi trên lớp:

| $\lambda$ | $x_\lambda$ | $g(\lambda)$ | Kết luận |
|---:|---:|---:|---|
| $0$ | $0$ | $1$ | Cận dưới đúng nhưng lỏng |
| $1$ | $3/2$ | $9/2$ | Cận tốt hơn |
| $2$ | $2$ | $5$ | Cận khít |
| $4$ | $12/5$ | $21/5$ | Qua điểm cực đại, cận giảm |

Lưu ý ngôn ngữ: $g$ là hàm **lõm**. Trong phần trình bày, dùng “lõm chặt trên $(-1,\infty)$”.

### 2.4. Đối ngẫu yếu và hình học

Với mọi $x$ khả thi và $\lambda\geq 0$,

$$
f_0(x)\geq f_0(x)+\lambda f_1(x)=L(x,\lambda)\geq g(\lambda).
$$

Lấy infimum theo mọi $x$ khả thi cho $p^\star\geq g(\lambda)$.

Đặt

$$
u=f_1(x),
\qquad
t=f_0(x).
$$

Đường đỡ ứng với một $\lambda$ có phương trình

$$
t+\lambda u=g(\lambda).
$$

Với $\lambda^\star=2$,

$$
t+2u=5
\quad\Longleftrightarrow\quad
t=5-2u.
$$

Đường này tiếp xúc tập giá trị tại $x=2$, tức $(u,t)=(0,5)$. Tung độ cắt là $g(2)=5=p^\star$. Đây là dữ kiện bắt buộc cho SVG minh họa LLO5.

### 2.5. Slater và đối ngẫu mạnh

Bài toán là lồi, miền xác định là $\mathbb R$, và $x=3$ thỏa

$$
f_1(3)=-1<0.
$$

Vì tồn tại điểm khả thi chặt nên điều kiện Slater thỏa. Do $p^\star$ hữu hạn, kết luận dùng trong bài là:

- đối ngẫu mạnh giữ, $d^\star=p^\star$;
- nghiệm đối ngẫu đạt được tại $\lambda^\star=2$.

Không được phát biểu Slater là điều kiện cần của đối ngẫu mạnh.

### 2.6. Điều kiện KKT

Bốn nhóm điều kiện trên miền $D$ lồi là

$$
\begin{aligned}
&\text{khả thi gốc:} && (x-2)(x-4)\leq 0,\\
&\text{khả thi đối ngẫu:} && \lambda\geq 0,\\
&\text{bù trừ:} && \lambda(x-2)(x-4)=0,\\
&\text{dừng:} && 0\in 2x+\lambda(2x-6)+N_D(x),\ \text{với } D=\mathbb R,\ N_D(x)=\{0\}.
\end{aligned}
$$

Tại $(x^\star,\lambda^\star)=(2,2)$:

$$
f_1(2)=0,
\qquad
2\geq 0,
\qquad
2f_1(2)=0,
\qquad
2(2)+2(2\cdot2-6)=0.
$$

Điểm biên còn lại $x=4$ không tạo một cặp KKT khả thi đối ngẫu, vì điều kiện dừng yêu cầu

$$
8+2\lambda=0
\quad\Longrightarrow\quad
\lambda=-4<0.
$$

Kết luận đúng phạm vi:

- Với bài toán lồi khả vi, mọi bộ $(x,\lambda,\nu)$ thỏa KKT là tối ưu gốc–đối ngẫu.
- Khi thêm Slater, một nghiệm gốc là tối ưu khi và chỉ khi tồn tại nhân tử để bộ đó thỏa KKT.
- Ngoài phạm vi lồi và điều kiện chính quy phù hợp, không được mặc định điểm KKT là nghiệm tối ưu toàn cục.

### 2.7. Nhiễu vế phải và dấu độ nhạy

Cố định bài toán nhiễu theo đúng quy ước

$$
p(u)=\inf_x\left\{x^2+1\mid (x-2)(x-4)\leq u\right\}.
$$

Ràng buộc tương đương

$$
(x-3)^2\leq 1+u.
$$

Do đó:

- $u<-1$: bài toán vô nghiệm, $p(u)=+\infty$;
- $-1\leq u\leq 8$: tập khả thi là $[3-\sqrt{1+u},\,3+\sqrt{1+u}]$, điểm gần $0$ nhất là đầu trái;
- $u\geq 8$: $x=0$ khả thi và đạt cực tiểu không ràng buộc.

Hàm giá trị là

$$
p(u)=
\begin{cases}
+\infty, & u<-1,\\
11+u-6\sqrt{1+u}, & -1\leq u\leq 8,\\
1, & u\geq 8.
\end{cases}
$$

Tại $u=0$,

$$
p(0)=5,
\qquad
p'(u)=1-\frac{3}{\sqrt{1+u}},
\qquad
p'(0)=-2=-\lambda^\star.
$$

Dùng nghiệm đối ngẫu tại bài toán không nhiễu còn có cận toàn cục

$$
p(u)\geq p(0)-\lambda^\star u=5-2u.
$$

Chứng minh ngắn: nếu $f_1(x)\leq u$ thì

$$
g(\lambda^\star)
\leq f_0(x)+\lambda^\star f_1(x)
\leq f_0(x)+\lambda^\star u,
$$

nên $f_0(x)\geq p(0)-\lambda^\star u$; lấy infimum trên tập khả thi nhiễu cho kết quả.

Hai trường hợp biên cần nêu trong ghi chú:

- tại $u=-1$, Slater không còn thỏa và công thức nhân tử từ đạo hàm không áp dụng trực tiếp;
- tại đúng $u=8$, ràng buộc vẫn hoạt động nhưng suy biến với $\lambda^\star(8)=0$;
- chỉ khi $u>8$, ràng buộc mới không hoạt động, nghiệm là $x=0$ và nhân tử bằng $0$.

## 3. Bài tập chuyển giao QP hai biến

### 3.1. Đề bài

$$
\begin{aligned}
\operatorname{minimize}_{x_1,x_2\in\mathbb R}\quad & x_1^2+x_2^2\\
\text{subject to}\quad & x_1+x_2\geq 1.
\end{aligned}
$$

Yêu cầu người học:

1. Đưa ràng buộc về dạng $f_1(x)\leq 0$ và lập $L(x,\lambda)$.
2. Tính $g(\lambda)$ cùng miền hữu hiệu và phát biểu bài toán đối ngẫu.
3. Tìm nghiệm gốc, nghiệm đối ngẫu và khoảng đối ngẫu.
4. Kiểm tra Slater và từng nhóm điều kiện KKT.
5. Giải thích hình học của nghiệm bằng phép chiếu gốc tọa độ lên nửa không gian.

### 3.2. Lời giải đã tự kiểm tra

Viết

$$
f_1(x)=1-x_1-x_2\leq 0.
$$

Hàm Lagrange là

$$
L(x_1,x_2,\lambda)
=x_1^2+x_2^2+\lambda(1-x_1-x_2),
\qquad \lambda\geq 0.
$$

Với mọi $\lambda\in\mathbb R$, điều kiện cực tiểu theo $x$ cho

$$
2x_1-\lambda=0,
\qquad
2x_2-\lambda=0,
$$

nên

$$
x_1(\lambda)=x_2(\lambda)=\frac{\lambda}{2}.
$$

Thế lại:

$$
g(\lambda)
=\lambda-\frac{\lambda^2}{2},
\qquad
\operatorname{dom}g=\mathbb R.
$$

Bài toán đối ngẫu là

$$
\operatorname{maximize}_{\lambda\geq 0}
\left(\lambda-\frac{\lambda^2}{2}\right).
$$

Do $g'(\lambda)=1-\lambda$ và $g''(\lambda)=-1$, ta có

$$
\lambda^\star=1,
\qquad
d^\star=g(1)=\frac12.
$$

Từ $x_i(\lambda^\star)=\lambda^\star/2$,

$$
x^\star=\left(\frac12,\frac12\right),
\qquad
p^\star=\frac14+\frac14=\frac12,
\qquad
p^\star-d^\star=0.
$$

Slater thỏa, chẳng hạn $(x_1,x_2)=(1,1)$ cho $1-x_1-x_2=-1<0$.

KKT tại $((1/2,1/2),1)$:

$$
\begin{aligned}
&1-x_1-x_2=0\leq 0,\\
&\lambda=1\geq 0,\\
&\lambda(1-x_1-x_2)=0,\\
&(2x_1-\lambda,2x_2-\lambda)=(0,0).
\end{aligned}
$$

Diễn giải hình học: nghiệm là điểm có chuẩn Euclid nhỏ nhất trong nửa không gian $x_1+x_2\geq 1$, tức hình chiếu vuông góc của gốc tọa độ lên đường biên $x_1+x_2=1$.

## 4. Điểm kiểm định bắt buộc khi triển khai

- Không bỏ điều kiện $\lambda\geq 0$ khi chuyển từ hàm đối ngẫu sang bài toán đối ngẫu.
- Không ghi $\operatorname{dom}g=[0,\infty)$ trong ví dụ một biến. Miền hữu hiệu của hàm là $(-1,\infty)$; $[0,\infty)$ là miền khả thi của bài toán đối ngẫu.
- Không gọi $x_\lambda$ là điểm khả thi gốc. Chẳng hạn $x_0=0$ không khả thi nhưng vẫn dùng để tính $g(0)$.
- Không suy ra đối ngẫu mạnh chỉ từ tính lồi; trong ví dụ phải chỉ rõ điểm Slater $x=3$.
- Không kiểm tra riêng điều kiện dừng rồi kết luận KKT; phải kiểm tra đủ khả thi gốc, khả thi đối ngẫu, bù trừ và dừng.
- Không viết $p'(0)=\lambda^\star$ dưới quy ước $f_1(x)\leq u$; dấu đúng là $p'(0)=-\lambda^\star=-2$.
- Không dùng từ “xấp xỉ” cho đẳng thức $d^\star=p^\star$ hoặc $p'(0)=-\lambda^\star$ khi các giả thiết đã thỏa.
- Mọi SVG về hình học phải dùng đúng đường $t+\lambda u=g(\lambda)$; với $\lambda^\star=2$, đường khít là $t=5-2u$.
- Ghi chú diễn giả phải nêu trường hợp biên $u=-1$ và $u\geq 8$ để giới hạn diễn giải độ nhạy không bị che khuất.

## 5. Bằng chứng kiểm tra độc lập

Các đẳng thức trọng tâm cần được kiểm lại bằng đại số ký hiệu hoặc thay số trước khi đưa vào HTML:

| Hạng mục | Kết quả phải khớp |
|---|---|
| Điểm đạt $\inf_xL(x,\lambda)$ | $x_\lambda=3\lambda/(1+\lambda)$ với $\lambda>-1$ |
| Hàm đối ngẫu | $g(\lambda)=(-\lambda^2+9\lambda+1)/(1+\lambda)$ |
| Đạo hàm | $g'(\lambda)=9/(1+\lambda)^2-1$ |
| Độ cong | $g''(\lambda)=-18/(1+\lambda)^3<0$ |
| Nghiệm đối ngẫu | $\lambda^\star=2$, $g(2)=5$ |
| KKT | $(x^\star,\lambda^\star)=(2,2)$ thỏa đủ bốn nhóm |
| Hàm giá trị nhiễu | $p(u)=11+u-6\sqrt{1+u}$ trên $[-1,8]$ |
| Độ nhạy tại gốc | $p'(0)=-2=-\lambda^\star$ |
| QP hai biến | $x^\star=(1/2,1/2)$, $\lambda^\star=1$, $p^\star=d^\star=1/2$ |
