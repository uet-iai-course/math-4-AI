# Bài 03 — Đối ngẫu Lagrange và điều kiện tối ưu

Ghi chú này xây một tuyến chứng nhận cho bài toán tối ưu có ràng buộc. Ta bắt đầu từ một nghiệm khả thi, tạo cận dưới bằng hàm Lagrange, xác định khi cận trở nên khít, rồi diễn giải cùng một nhân tử qua hình học, điều kiện Karush–Kuhn–Tucker (KKT) và độ nhạy.

Ký hiệu chung là $x\in D\subseteq\mathbb R^n$, với $D\ne\varnothing$. Bài toán gốc có dạng

$$
\begin{aligned}
\underset{x\in D}{\operatorname{minimize}}\quad & f_0(x)\\
\text{với}\quad & f_i(x)\le 0,\quad i=1,\ldots,m,\\
& h_j(x)=0,\quad j=1,\ldots,p.
\end{aligned}
$$

Nguồn chính là Boyd và Vandenberghe (2004), Chương 5, cùng Lecture 5 của MIT 6.079/6.975. Ví dụ xuyên suốt dựa trên bộ bài tập Chương 4 trong kho. Bài 02 cung cấp dạng chuẩn và các lớp bài toán lồi; Bài 04 sẽ dùng các điều kiện tối ưu ở đây làm đầu vào cho phương pháp số.


## A. Từ ràng buộc đến cận đối ngẫu

### 1. Nhu cầu chứng nhận và bài toán xuyên suốt

**Mục tiêu đọc hiểu.** Người đọc phân biệt được giá trị của một nghiệm khả thi với một chứng nhận tối ưu, đồng thời xác định được loại cận còn thiếu trong một bài toán cực tiểu.

**Định nghĩa và giả thiết.** Một số $U$ là cận trên của $p^*$ nếu $p^*\le U$; một số $L$ là cận dưới nếu $L\le p^*$. Với bài toán cực tiểu, mọi $x\in\mathcal F$ cho cận trên

$$
p^*\le f_0(x).
$$

Nếu đồng thời tìm được một cận dưới $L=f_0(x)$, hai bất đẳng thức ép $f_0(x)=p^*$; khi đó $x$ là nghiệm tối ưu và $L$ là chứng nhận cho kết luận này.

**Trực quan.** Một nghiệm khả thi trả lời “ta làm được tốt đến mức nào”. Cận dưới trả lời “không phương án nào có thể tốt hơn mức nào”. Khoảng giữa hai số đo phần chất lượng chưa được chứng nhận.

::: example
**Ví dụ tính được.** Xét bài toán xuyên suốt

$$
\min_{x\in\mathbb R}x^2+1
\quad\text{với}\quad
(x-2)(x-4)\le0.
$$

Vì

$$
(x-2)(x-4)=(x-3)^2-1,
$$

tập khả thi là $\mathcal F=[2,4]$. Hàm $x^2+1$ tăng trên đoạn này, nên nhìn trực tiếp được

$$
x^*=2,\qquad p^*=5.
$$

Điểm $x=2$ mới chỉ cho cận trên $p^*\le5$. Mục tiêu của đối ngẫu là xây độc lập một cận dưới bằng $5$.
:::

**Ý nghĩa và ứng dụng trong AI.** Một mô hình học máy có thể cho mất mát nhỏ trên một nghiệm tìm được, nhưng riêng con số đó không cho biết còn có thể cải thiện bao nhiêu. Cận dưới cho phép lượng hóa khoảng tối ưu mà không cần biết trước nghiệm thật; đây là cơ sở của chứng nhận, so sánh mô hình và tiêu chuẩn dừng gốc–đối ngẫu.

**Điểm dễ nhầm.** Trong bài toán cực tiểu, nghiệm khả thi cho cận trên, không phải cận dưới. Việc nhìn ra nghiệm trong ví dụ chỉ dùng để kiểm tra kết quả; phép dựng đối ngẫu không được giả sử đã biết $x^*$.

**Câu hỏi kiểm tra.** Nếu một điểm khả thi có giá trị $7$ và một phép chứng nhận cho cận dưới $5{,}5$, có thể kết luận gì về $p^*$ và độ lệch tối ưu của điểm đang có?

### 2. Hàm Lagrange và vai trò của nhân tử

**Mục tiêu đọc hiểu.** Người đọc lập được hàm Lagrange theo đúng quy ước dấu và giải thích được vì sao nhân tử không âm của bất đẳng thức tạo cận dưới.

**Định nghĩa và giả thiết.** Với $x\in D$, $\lambda\in\mathbb R^m$ và $\nu\in\mathbb R^p$, hàm Lagrange là

$$
L(x,\lambda,\nu)
=f_0(x)+\sum_{i=1}^m\lambda_i f_i(x)
+\sum_{j=1}^p\nu_jh_j(x).
$$

Hàm $L$ được định nghĩa cho mọi nhân tử thực. Điều kiện $\lambda_i\ge0$ chỉ được áp đặt khi dùng $L$ để tạo cận hoặc khi lập bài toán đối ngẫu. Nhân tử $\nu_j$ của đẳng thức không bị hạn chế dấu.

Nếu $x\in\mathcal F$ và $\lambda\ge0$ theo từng thành phần thì

$$
\sum_i\lambda_i f_i(x)\le0,
\qquad
\sum_j\nu_jh_j(x)=0,
$$

nên $L(x,\lambda,\nu)\le f_0(x)$.

**Trực quan.** Mỗi nhân tử $\lambda_i$ đặt một “giá” không âm lên độ vi phạm của ràng buộc thứ $i$. Trên miền khả thi, hạng này không làm giá trị vượt quá mục tiêu. Thay đổi nhân tử tạo một họ hàm nằm dưới mục tiêu tại mọi điểm khả thi.

![Ba hàm Lagrange của bài toán xuyên suốt ứng với các nhân tử khác nhau; các đường cùng khớp mục tiêu tại biên hoạt động và cực tiểu của chúng tạo các cận dưới.](img/lec-03/lagrangian-family.svg)

::: example
**Ví dụ tính được.** Với bài toán xuyên suốt,

$$
\begin{aligned}
L(x,\lambda)
&=x^2+1+\lambda(x^2-6x+8)\\
&=(1+\lambda)x^2-6\lambda x+1+8\lambda.
\end{aligned}
$$

Với $x\in[2,4]$ và $\lambda\ge0$, ta có $L(x,\lambda)\le x^2+1$. Chẳng hạn,

$$
L(x,0)=x^2+1,
\qquad
L(x,2)=3x^2-12x+17=3(x-2)^2+5.
$$

Do đó $L(x,2)\ge5$ với mọi $x\in\mathbb R$, trong khi $L(x,2)\le f_0(x)$ với mọi $x$ khả thi. Số $5$ đã xuất hiện như một cận dưới mà không cần cực tiểu trực tiếp $f_0$ trên $[2,4]$.
:::

**Ý nghĩa và ứng dụng trong AI.** Nhân tử cho phép hấp thụ giới hạn chuẩn, ngân sách tài nguyên hoặc ràng buộc công bằng vào một biểu thức vô hướng. Sau này, cùng nhân tử vừa chứng nhận nghiệm qua KKT vừa đo ảnh hưởng của việc nới ràng buộc.

**Điểm dễ nhầm.** Với quy ước $f_i(x)\le0$, nhân tử tạo cận dưới phải không âm. Nếu đổi ràng buộc thành $f_i(x)\ge0$, dấu phải đổi tương ứng. Không được ép $\nu_j\ge0$, vì đẳng thức có thể được nhân với một số thực bất kỳ.

**Câu hỏi kiểm tra.** Với ràng buộc $2-x\le0$, hạng nào phải được cộng vào mục tiêu: $\lambda(2-x)$ hay $\lambda(x-2)$? Điều kiện dấu nào đi kèm?

### 3. Hàm đối ngẫu và miền hữu hiệu

**Mục tiêu đọc hiểu.** Người đọc tính được hàm đối ngẫu bằng phép lấy infimum theo biến gốc, xác định miền hữu hiệu và phân biệt miền này với miền khả thi đối ngẫu.

**Định nghĩa và giả thiết.** Hàm đối ngẫu Lagrange là hàm giá trị mở rộng

$$
g(\lambda,\nu)=\inf_{x\in D}L(x,\lambda,\nu).
$$

Miền hữu hiệu của nó là

$$
\operatorname{dom}g
=\{(\lambda,\nu):g(\lambda,\nu)>-\infty\}.
$$

Phép lấy infimum vẫn thực hiện trên toàn $D$, không chỉ trên tập khả thi $\mathcal F$. Điểm đạt infimum của $L$ có thể vi phạm các ràng buộc gốc.

**Trực quan.** Với một cặp nhân tử cố định, ta hạ đường hoặc mặt $L$ xuống tới giá trị thấp nhất trên $D$. Con số thấp nhất là tung độ của một chứng nhận ứng với cặp nhân tử đó.

![Đồ thị hàm đối ngẫu của bài toán xuyên suốt: miền hữu hiệu bắt đầu tại âm một, miền khả thi đối ngẫu bắt đầu tại không và cực đại đạt tại lambda bằng hai.](img/lec-03/dual-function.svg)

::: example
**Ví dụ tính được.** Với $\lambda>-1$, hệ số bậc hai của $L$ dương. Điều kiện dừng cho

$$
x_\lambda=\frac{3\lambda}{1+\lambda},
$$

và

$$
g(\lambda)
=1+8\lambda-\frac{9\lambda^2}{1+\lambda}
=\frac{-\lambda^2+9\lambda+1}{1+\lambda}.
$$

Tại $\lambda=-1$, $L(x,-1)=6x-7$ không bị chặn dưới. Với $\lambda<-1$, hệ số của $x^2$ âm, nên $L$ cũng không bị chặn dưới. Vì vậy

$$
g(\lambda)=
\begin{cases}
\dfrac{-\lambda^2+9\lambda+1}{1+\lambda},&\lambda>-1,\\
-\infty,&\lambda\le-1,
\end{cases}
$$

và $\operatorname{dom}g=(-1,\infty)$. Trong khi đó, miền khả thi của bài toán đối ngẫu sẽ là $\lambda\ge0$. Chẳng hạn $-1/2\in\operatorname{dom}g$ nhưng không khả thi đối ngẫu.
:::

**Ý nghĩa và ứng dụng trong AI.** Tính $g$ thường biến một bài toán có ràng buộc thành một bài toán theo các “giá” hoặc biến chứng nhận. Trong các mô hình phân tán, nhân tử còn tách các thành phần của mục tiêu; trong các thư giãn nón, $g$ tạo cận cho một bài toán gốc khó hoặc phi lồi.

**Điểm dễ nhầm.** $\operatorname{dom}g$ trả lời khi nào infimum hữu hạn; điều kiện $\lambda\ge0$ trả lời khi nào nhân tử tạo cận đúng. Hai tập này có vai trò khác nhau. Giá trị $g=-\infty$ là hợp lệ và không có nghĩa là phép tính “bị lỗi”.

**Câu hỏi kiểm tra.** Trong ví dụ, vì sao $x_0=0$ được phép dùng để tính $g(0)$ dù không thuộc $[2,4]$? Tính $g(0)$ và $g(1)$.

### Định lý: hàm đối ngẫu luôn lõm

**Giả thiết.** $D\ne\varnothing$ và $L(x,\lambda,\nu)$ hữu hạn theo $(\lambda,\nu)$ tại mỗi $x\in D$. Bài toán gốc không cần lồi.

**Kết luận.** Hàm $g$ là hàm lõm mở rộng theo $(\lambda,\nu)$.

::: proof
Viết $z=(\lambda,\nu)$. Với $z_1,z_2$ và $\theta\in[0,1]$, tính affine của $L$ theo $z$ cho

$$
L(x,\theta z_1+(1-\theta)z_2)
=\theta L(x,z_1)+(1-\theta)L(x,z_2).
$$

Với mọi $x\in D$,

$$
L(x,z_1)\ge g(z_1),
\qquad
L(x,z_2)\ge g(z_2).
$$

Nhân với các trọng số không âm, cộng lại rồi lấy infimum theo $x$ cho

$$
g(\theta z_1+(1-\theta)z_2)
\ge
\theta g(z_1)+(1-\theta)g(z_2).
$$

Đây là bất đẳng thức lõm. Điểm quyết định là $L(x,\cdot)$ affine; không có bước nào dùng tính lồi của $f_0$ hay $f_i$ theo $x$.
:::

### 4. Đối ngẫu yếu, bài toán đối ngẫu và khoảng chứng nhận

**Mục tiêu đọc hiểu.** Người đọc chứng minh được đối ngẫu yếu, lập bài toán đối ngẫu và dùng một cặp khả thi gốc–đối ngẫu để chặn độ lệch tối ưu.

**Định nghĩa và giả thiết.** Một cặp $(\lambda,\nu)$ khả thi đối ngẫu khi $\lambda\ge0$; nếu $g(\lambda,\nu)=-\infty$, cặp đó không cung cấp cận hữu ích nhưng vẫn thỏa điều kiện dấu. Bài toán đối ngẫu là

$$
\operatorname*{maximize}_{\lambda,\nu}\ g(\lambda,\nu)
\quad\text{với}\quad \lambda\ge0,
$$

và giá trị tối ưu là

$$
d^*=\sup_{\lambda\ge0,\nu}g(\lambda,\nu).
$$

Đây là một bài toán tối ưu lồi theo quy ước “cực đại hóa hàm lõm trên tập lồi”, kể cả khi bài toán gốc không lồi.

**Trực quan.** Mỗi nhân tử khả thi cho một cận dưới. Bài toán đối ngẫu chọn đường hoặc mặt có tung độ cao nhất trong họ cận đó. Một nghiệm gốc khả thi tạo đầu trên, một nghiệm đối ngẫu khả thi tạo đầu dưới.

::: example
**Ví dụ tính được.** Xét QP hai biến

$$
\min_{x_1,x_2}x_1^2+x_2^2
\quad\text{với}\quad x_1+x_2\ge1.
$$

Viết ràng buộc thành $1-x_1-x_2\le0$. Khi đó

$$
L=x_1^2+x_2^2+\lambda(1-x_1-x_2).
$$

Cực tiểu theo từng $x_i$ cho $x_1=x_2=\lambda/2$ và

$$
g(\lambda)=\lambda-\frac{\lambda^2}{2},
\qquad \operatorname{dom}g=\mathbb R.
$$

Trên miền đối ngẫu $\lambda\ge0$, hàm đạt cực đại tại $\lambda^*=1$. Do đó

$$
d^*=\frac12,
\qquad
x^*=\left(\frac12,\frac12\right),
\qquad
f_0(x^*)=\frac12.
$$

Cận dưới và giá trị của nghiệm khả thi trùng nhau, nên nghiệm được chứng nhận tối ưu.
:::

**Ý nghĩa và ứng dụng trong AI.** Nếu một thuật toán hoặc bộ giải trả đồng thời $x$ khả thi và nhân tử khả thi, hiệu $f_0(x)-g(\lambda,\nu)$ là một sai số có chứng nhận. Nó có ý nghĩa mạnh hơn việc chỉ quan sát mức thay đổi nhỏ giữa hai vòng lặp.

**Điểm dễ nhầm.** Đối ngẫu yếu không nói cận tốt nhất phải khít. Dùng $\inf$ cho bài toán gốc và $\sup$ cho bài toán đối ngẫu tránh ngầm giả sử nghiệm đạt. Chỉ khi có điểm đạt mới viết $\min$ hoặc $\max$ theo nghĩa nghiêm ngặt.

**Câu hỏi kiểm tra.** Nếu $x$ khả thi có $f_0(x)=10$ và một cặp đối ngẫu khả thi có $g(\lambda,\nu)=9{,}7$, hãy cho một khoảng chứa $p^*$ và một cận trên cho độ lệch tối ưu của $x$.

### Định lý: đối ngẫu yếu và cận độ lệch tối ưu

**Giả thiết.** $x\in\mathcal F$ và $(\lambda,\nu)$ thỏa $\lambda\ge0$.

**Kết luận.** Ta có

$$
g(\lambda,\nu)\le p^*\le f_0(x),
\qquad
d^*\le p^*.
$$

Nếu $p^*$ hữu hạn thì

$$
0\le f_0(x)-p^*
\le f_0(x)-g(\lambda,\nu).
$$

::: proof
Vì $x$ khả thi và $\lambda\ge0$,

$$
L(x,\lambda,\nu)
=f_0(x)+\sum_i\lambda_i f_i(x)+\sum_j\nu_jh_j(x)
\le f_0(x).
$$

Mặt khác, theo định nghĩa infimum,

$$
g(\lambda,\nu)\le L(x,\lambda,\nu).
$$

Do đó $g(\lambda,\nu)\le f_0(x)$ với mọi $x\in\mathcal F$. Lấy infimum theo $x\in\mathcal F$ cho $g(\lambda,\nu)\le p^*$. Lấy supremum theo mọi nhân tử khả thi cho $d^*\le p^*$.

Cuối cùng, $p^*\le f_0(x)$ và $g(\lambda,\nu)\le p^*$ nên

$$
0\le f_0(x)-p^*\le f_0(x)-g(\lambda,\nu).
$$

Dấu của $\lambda$ được dùng đúng ở bất đẳng thức đầu; tính lồi của bài toán gốc không được dùng.
:::

## B. Khi cận trở thành giá trị tối ưu

### 5. Khoảng đối ngẫu, đối ngẫu mạnh và tính đạt

**Mục tiêu đọc hiểu.** Người đọc phân biệt được đối ngẫu yếu, đối ngẫu mạnh và tính đạt nghiệm; không suy ra một kết luận chỉ từ tên gọi của kết luận khác.

**Định nghĩa và giả thiết.** Khoảng đối ngẫu tối ưu là

$$
p^*-d^*\ge0.
$$

Ta nói **đối ngẫu mạnh** giữ khi

$$
p^*=d^*.
$$

Đẳng thức này là một phát biểu về hai giá trị. **Tính đạt nghiệm đối ngẫu** là phát biểu tồn tại: có $(\lambda^*,\nu^*)$ với $\lambda^*\ge0$ sao cho

$$
g(\lambda^*,\nu^*)=d^*.
$$

Đối ngẫu mạnh không tự động đồng nghĩa với tính đạt; mỗi kết luận cần được kiểm tra hoặc suy ra từ một định lý phù hợp.

**Trực quan.** Đối ngẫu yếu giữ đường chứng nhận dưới giá trị gốc. Đối ngẫu mạnh nói có thể nâng cận tốt nhất tới đúng $p^*$. Tính đạt nói trong họ thực sự có một đường cao nhất, thay vì chỉ có một dãy đường tiến gần giới hạn.

![Hàm đối ngẫu lõm của ví dụ đạt giá trị năm tại lambda bằng hai, đúng bằng giá trị tối ưu gốc.](img/lec-03/dual-function.svg)

::: example
**Ví dụ tính được.** Trong bài toán xuyên suốt,

$$
g'(\lambda)=\frac{9}{(1+\lambda)^2}-1,
\qquad
g''(\lambda)=-\frac{18}{(1+\lambda)^3}<0
$$

trên $\lambda>-1$. Trên miền $\lambda\ge0$, phương trình $g'(\lambda)=0$ chỉ giữ nghiệm $\lambda^*=2$. Vì vậy

$$
d^*=g(2)=5=p^*.
$$

Ví dụ này đồng thời có đối ngẫu mạnh và nghiệm đối ngẫu đạt được. Giá trị $g(1)=9/2$ chỉ là một cận hợp lệ, không phải cận tốt nhất.
:::

**Ý nghĩa và ứng dụng trong AI.** Khi khoảng bằng không, đối ngẫu biến một nghiệm đối ngẫu thành chứng nhận chính xác cho mô hình gốc. Khi khoảng dương, cận vẫn có thể hữu ích để đánh giá chất lượng một thư giãn của bài toán tổ hợp hoặc phi lồi.

**Điểm dễ nhầm.** $d^*=p^*$ không khẳng định rằng bài toán gốc hoặc đối ngẫu có nghiệm đạt. Ngược lại, việc cả hai bài toán có nghiệm cũng không bắt buộc hai giá trị bằng nhau. Tính lồi thường giúp có đối ngẫu mạnh, nhưng riêng tính lồi chưa đủ trong mọi phát biểu tổng quát; cần một điều kiện chính quy như Slater hoặc một định lý chuyên biệt.

**Câu hỏi kiểm tra.** Hãy phân loại ba mệnh đề sau: $d^*\le p^*$; $d^*=p^*$; tồn tại $(\lambda^*,\nu^*)$ sao cho $g(\lambda^*,\nu^*)=d^*$. Mệnh đề nào luôn đúng?

### 6. Điều kiện Slater

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được phiên bản Slater tinh chỉnh và nêu đúng phần kết luận mà điều kiện này bảo đảm.

**Định nghĩa và giả thiết.** Xét bài toán lồi

$$
\begin{aligned}
\operatorname*{minimize}_{x\in D}\quad &f_0(x)\\
\text{với}\quad &f_i(x)\le0,\quad i=1,\ldots,m,\\
&Ax=b,
\end{aligned}
$$

trong đó $D=\bigcap_{i=0}^m\operatorname{dom}f_i$ là tập lồi, các $f_i$ lồi và đẳng thức affine. Gọi $\mathcal I_{\mathrm{aff}}$ là tập chỉ số của các $f_i$ affine và $\mathcal I_{\mathrm{nl}}$ là tập chỉ số còn lại.

Điều kiện Slater tinh chỉnh yêu cầu tồn tại $\widetilde x\in\operatorname{relint}D$ sao cho

$$
\begin{aligned}
A\widetilde x&=b,\\
f_i(\widetilde x)&<0,&&i\in\mathcal I_{\mathrm{nl}},\\
f_i(\widetilde x)&\le0,&&i\in\mathcal I_{\mathrm{aff}}.
\end{aligned}
$$

Nội tương đối $\operatorname{relint}D$ là nội của $D$ khi xét trong bao affine $\operatorname{aff}D$.

**Trực quan.** Điểm Slater tạo khoảng trống theo mọi ràng buộc phi affine. Khoảng trống này ngăn siêu phẳng tách tại giá trị tối ưu trở thành “thẳng đứng”, nhờ đó hệ số của trục mục tiêu có thể được chuẩn hóa về $1$ và tạo một nhân tử hữu hạn.

::: example
**Ví dụ tính được.** Trong bài toán xuyên suốt, $D=\mathbb R$ và cả

$$
f_0(x)=x^2+1,
\qquad
f_1(x)=(x-2)(x-4)
$$

đều lồi. Điểm $\widetilde x=3$ thỏa

$$
f_1(3)=-1<0.
$$

Giá trị $p^*=5$ hữu hạn. Điều kiện Slater bảo đảm

$$
d^*=p^*=5
$$

và nghiệm đối ngẫu đạt được; phép tính trực tiếp đã xác định $\lambda^*=2$.
:::

**Ý nghĩa và ứng dụng trong AI.** Nhiều mô hình có giới hạn chuẩn $\|w\|_2^2\le\tau$ thỏa Slater ngay tại $w=0$ khi $\tau>0$. Khi đó định lý bảo đảm tồn tại nhân tử; các điều kiện KKT có thể chứng nhận nghiệm tối ưu.

**Điểm dễ nhầm.** Slater là điều kiện đủ, không phải điều kiện cần của đối ngẫu mạnh. Bất đẳng thức affine không cần thỏa chặt trong phiên bản tinh chỉnh. Nếu $D$ nằm trong một không gian affine thấp chiều, phải dùng $\operatorname{relint}D$ thay cho nội thông thường. Điều kiện một điểm thỏa chặt không cho kết luận Slater nếu bài toán phi lồi.

**Câu hỏi kiểm tra.** Một bài toán lồi chỉ có các bất đẳng thức affine và đẳng thức affine. Vì sao một điểm khả thi tương đối đã đủ cho phiên bản Slater tinh chỉnh, dù một số bất đẳng thức affine đang hoạt động?

### Định lý Slater: đối ngẫu mạnh và tính đạt

**Giả thiết.** Bài toán có dạng lồi ở trên và thỏa điều kiện Slater tinh chỉnh.

**Kết luận.** Đối ngẫu mạnh giữ: $d^*=p^*$. Nếu $d^*>-\infty$, nghiệm đối ngẫu đạt được. Trong trường hợp bài toán gốc khả thi và $p^*>-\infty$, giá trị $p^*$ hữu hạn, nên điều kiện cho tính đạt được thỏa sau khi dùng đối ngẫu mạnh.

::: proof
**Phác thảo chứng minh.** Đưa đồng thời mức vi phạm ràng buộc, phần dư đẳng thức và giá trị mục tiêu vào tập mở rộng

$$
\mathcal A=
\{(u,v,t):\exists x\in D,
f_i(x)\le u_i,
Ax-b=v,
f_0(x)\le t\}.
$$

Tính lồi của bài toán làm $\mathcal A$ lồi. Tập

$$
\mathcal B=\{(0,0,t):t<p^*\}
$$

lồi và không giao $\mathcal A$. Định lý siêu phẳng tách cho một vector pháp tuyến $(\widetilde\lambda,\widetilde\nu,\mu)$ với $\widetilde\lambda\ge0$ và $\mu\ge0$.

Điểm Slater, sau khi làm việc trong bao affine của $D$ và loại các hàng đẳng thức dư thừa, loại trường hợp $\mu=0$. Chuẩn hóa theo $\mu>0$ cho

$$
\lambda^*=\frac{\widetilde\lambda}{\mu},
\qquad
\nu^*=\frac{\widetilde\nu}{\mu}.
$$

Siêu phẳng tách khi đó cho

$$
g(\lambda^*,\nu^*)\ge p^*.
$$

Đối ngẫu yếu cho chiều ngược lại, nên $g(\lambda^*,\nu^*)=p^*$: đối ngẫu mạnh giữ và cặp nhân tử đạt giá trị đối ngẫu.

Phần kỹ thuật quyết định là loại $\mu=0$; đây chính là nơi điều kiện Slater và nội tương đối được dùng. Chi tiết đầy đủ xem Boyd và Vandenberghe, Chương 5, Mục 5.3.2.
:::

## C. Hình học của đối ngẫu

### 7. Tập giá trị, tập mở rộng và đường đỡ

**Mục tiêu đọc hiểu.** Người đọc chuyển được từ biến quyết định sang không gian giá trị, đọc $g(\lambda)$ như tung độ cắt của một đường đỡ và nhận biết hình học của đối ngẫu mạnh.

**Định nghĩa và giả thiết.** Trước hết xét một bất đẳng thức và không có đẳng thức. Tập giá trị chính xác là

$$
\mathcal G
=\{(u,t)=(f_1(x),f_0(x)):x\in D\}.
$$

Khả thi gốc tương ứng với $u\le0$, và

$$
p^*=\inf\{t:(u,t)\in\mathcal G,\ u\le0\}.
$$

Tập mở rộng là

$$
\mathcal A
=\{(u,t):\exists x\in D,
f_1(x)\le u,
f_0(x)\le t\}.
$$

Tập $\mathcal G$ ghi đúng cặp giá trị do một $x$ tạo ra; $\mathcal A$ mở rộng các cặp đó sang phải và lên trên. Trong bài toán lồi, $\mathcal A$ lồi, còn $\mathcal G$ không nhất thiết lồi.

Với $\lambda\ge0$,

$$
g(\lambda)
=\inf_{x\in D}\bigl(f_0(x)+\lambda f_1(x)\bigr)
=\inf_{(u,t)\in\mathcal A}(t+\lambda u).
$$

Do đó mọi điểm $(u,t)\in\mathcal A$ thỏa

$$
t+\lambda u\ge g(\lambda).
$$

Đường $t=g(\lambda)-\lambda u$ nằm dưới $\mathcal A$, có hệ số góc $-\lambda$ và tung độ cắt $g(\lambda)$.

**Trực quan.** Trục $u$ đo mức ràng buộc, trục $t$ đo mục tiêu. Tăng $\lambda$ làm đường đỡ nghiêng hơn; tối đa hóa $g$ nâng tung độ cắt cao nhất mà đường vẫn nằm dưới tập mở rộng. Đối ngẫu mạnh xuất hiện khi một đường đỡ tốt nhất đi qua $(0,p^*)$.

![Tập giá trị và tập mở rộng của bài toán xuyên suốt; đường t bằng năm trừ hai u đỡ tập tại điểm có tọa độ không, năm.](img/lec-03/dual-geometry.svg)

::: example
**Ví dụ tính được.** Với bài toán xuyên suốt,

$$
u=(x-3)^2-1,
\qquad
t=x^2+1.
$$

Ba nhân tử cho ba đường

$$
\begin{array}{c|c|c}
\lambda&\text{đường đỡ}&\text{tung độ cắt}\\ \hline
0&t=1&1\\
1&t=\dfrac92-u&\dfrac92\\
2&t=5-2u&5.
\end{array}
$$

Đường ứng với $\lambda^*=2$ đi qua $(0,5)$ và có vector pháp tuyến $(2,1)$. Vì $5=p^*$, đường này vừa cho cận tốt nhất vừa tiếp xúc tại giá trị tối ưu. Hệ số góc $-2=-\lambda^*$ báo trước dấu của độ nhạy khi vế phải ràng buộc được nới.
:::

**Ý nghĩa và ứng dụng trong AI.** Hình học này giải thích vì sao nhân tử là một “giá biên”: nó là độ nghiêng cần để một siêu phẳng đỡ cân bằng mục tiêu với mức vi phạm ràng buộc. Với nhiều ràng buộc, đường trở thành siêu phẳng; với SDP, vector pháp tuyến trở thành một nhân tử ma trận trong nón PSD.

**Điểm dễ nhầm.** Không khẳng định $\mathcal G$ lồi chỉ vì các hàm thành phần lồi. Nếu infimum không đạt, điểm $(0,p^*)$ có thể không thuộc $\mathcal A$; phát biểu tổng quát phải dùng biên của $\operatorname{cl}\mathcal A$. Phương trình $t+\lambda u=g(\lambda)$ mô tả đường đỡ, không phải mọi điểm của tập giá trị đều nằm trên đường đó.

**Câu hỏi kiểm tra.** Trong hình của ví dụ, vì sao đường $t=9/2-u$ là một đường đỡ hợp lệ nhưng không chứng nhận $p^*=5$? Vector nào vuông góc với đường $t=5-2u$?

### Định lý: tập mở rộng của bài toán lồi là lồi

**Giả thiết.** $D$ lồi, $f_0$ và $f_1$ lồi trên $D$.

**Kết luận.** Tập

$$
\mathcal A
=\{(u,t):\exists x\in D,
f_1(x)\le u,
f_0(x)\le t\}
$$

là tập lồi.

::: proof
Lấy $(u_1,t_1),(u_2,t_2)\in\mathcal A$. Theo định nghĩa, tồn tại $x_1,x_2\in D$ sao cho

$$
f_1(x_k)\le u_k,
\qquad
f_0(x_k)\le t_k,
\qquad k=1,2.
$$

Với $\theta\in[0,1]$, đặt

$$
x_\theta=\theta x_1+(1-\theta)x_2.
$$

Vì $D$ lồi nên $x_\theta\in D$. Tính lồi của $f_1$ cho

$$
f_1(x_\theta)
\le\theta f_1(x_1)+(1-\theta)f_1(x_2)
\le\theta u_1+(1-\theta)u_2.
$$

Tương tự,

$$
f_0(x_\theta)
\le\theta t_1+(1-\theta)t_2.
$$

Vậy

$$
\theta(u_1,t_1)+(1-\theta)(u_2,t_2)\in\mathcal A.
$$

Do đó $\mathcal A$ lồi. Chứng minh không cho kết luận tương tự cho $\mathcal G$, vì tổ hợp lồi của hai cặp giá trị không nhất thiết bằng đúng cặp giá trị tại $x_\theta$; ta chỉ có các bất đẳng thức theo một phía.
:::

### Hệ quả: đường đỡ và đối ngẫu mạnh

**Giả thiết.** Bài toán một bất đẳng thức là lồi, $p^*$ hữu hạn, và có một siêu phẳng đỡ không thẳng đứng của $\operatorname{cl}\mathcal A$ tại $(0,p^*)$ với pháp tuyến $(\lambda,1)$, trong đó $\lambda\ge0$.

**Kết luận.** Đường đỡ có dạng

$$
t+\lambda u\ge p^*,
$$

nên $g(\lambda)=p^*$ và đối ngẫu mạnh giữ. Ngược lại, nếu nghiệm đối ngẫu $\lambda^*$ đạt và $g(\lambda^*)=p^*$ thì

$$
t+\lambda^*u\ge p^*
$$

là một đường đỡ khít tại $(0,p^*)$ theo nghĩa đóng thích hợp.

::: proof
Từ tính đỡ, mọi $(u,t)\in\mathcal A$ thỏa $t+\lambda u\ge p^*$. Lấy infimum trên $\mathcal A$ cho $g(\lambda)\ge p^*$. Đối ngẫu yếu cho $g(\lambda)\le p^*$, nên có đẳng thức.

Theo chiều ngược lại, định nghĩa của $g$ cho $t+\lambda^*u\ge g(\lambda^*)=p^*$ với mọi $(u,t)\in\mathcal A$. Vì đường đạt giá trị $p^*$ tại $u=0$ trên biên hoặc giới hạn biên, nó là đường đỡ khít. Điều kiện Slater trong định lý trước là một cách bảo đảm tồn tại một siêu phẳng đỡ có hệ số của $t$ khác không, tức không thẳng đứng.
:::

Quan hệ đường đỡ giải thích sự bằng nhau về giá trị. Điểm yên ngựa dưới đây bổ sung quan hệ giữa các biến tối ưu và chuẩn bị cho điều kiện KKT.

### 8. Điểm yên ngựa của hàm Lagrange

**Mục tiêu đọc hiểu.** Người đọc nhận biết được điểm yên ngựa của hàm Lagrange và giải thích được vì sao đối tượng này gom tối ưu gốc, tối ưu đối ngẫu và khoảng đối ngẫu bằng không vào một quan hệ duy nhất.

**Định nghĩa và giả thiết.** Một bộ $(x^*,\lambda^*,\nu^*)$ với $x^*\in D$, $\lambda^*\ge0$ và $\nu^*\in\mathbb R^p$ là một **điểm yên ngựa của hàm Lagrange** nếu

$$
L(x^*,\lambda,\nu)
\le
L(x^*,\lambda^*,\nu^*)
\le
L(x,\lambda^*,\nu^*)
$$

với mọi $x\in D$, mọi $\lambda\ge0$ và mọi $\nu\in\mathbb R^p$.

Bất đẳng thức bên trái nói $(\lambda^*,\nu^*)$ cực đại hóa $L$ theo các nhân tử khả thi khi giữ $x=x^*$. Bất đẳng thức bên phải nói $x^*$ cực tiểu hóa $L$ theo biến gốc khi giữ các nhân tử tối ưu.

**Trực quan.** Theo hướng $x$, giá trị tại điểm yên ngựa nằm ở đáy; theo hướng nhân tử, nó nằm ở đỉnh. Hình dạng “đáy theo một hướng, đỉnh theo hướng kia” giải thích tên gọi. Cùng quan hệ xuất hiện khi một đường đỡ được nâng tới đúng $(0,p^*)$ và tiếp xúc với tập mở rộng.

::: example
**Ví dụ tính được.** Với bài toán xuyên suốt, lấy $x^*=2$ và $\lambda^*=2$. Vì ràng buộc hoạt động tại $x^*$,

$$
L(2,\lambda)=f_0(2)+\lambda f_1(2)=5
$$

với mọi $\lambda\ge0$. Mặt khác,

$$
L(x,2)=3x^2-12x+17
=3(x-2)^2+5
\ge5.
$$

Do đó

$$
L(2,\lambda)\le L(2,2)\le L(x,2)
$$

với mọi $x\in\mathbb R$ và $\lambda\ge0$. Bộ $(2,2)$ là một điểm yên ngựa, và giá trị yên ngựa bằng $p^*=d^*=5$.
:::

**Ý nghĩa và ứng dụng trong AI.** Nhiều phương pháp gốc–đối ngẫu tìm đồng thời tham số mô hình và nhân tử bằng cách tiến tới một điểm yên ngựa. Phía gốc giảm mất mát đã ghép, còn phía đối ngẫu tăng cận chứng nhận. Bài này dùng điểm yên ngựa để chứng nhận; Bài 04 mới bàn cách giải số.

**Điểm dễ nhầm.** Thứ tự hai bất đẳng thức không đối xứng: cực tiểu theo $x$ nhưng cực đại theo $(\lambda,\nu)$. Miền cực đại phải giữ $\lambda\ge0$, trong khi $\nu$ tự do. Một điểm dừng của $L$ chưa chắc là điểm yên ngựa; cần các bất đẳng thức toàn cục hoặc các giả thiết lồi–lõm cho phép suy ra chúng.

**Câu hỏi kiểm tra.** Với ví dụ xuyên suốt, vì sao $x=4$ không thể ghép với một $\lambda\ge0$ để tạo điểm yên ngựa, dù $f_1(4)=0$? Hãy kiểm tra điều kiện cực tiểu của $L(\cdot,\lambda)$ tại $x=4$.

### Định lý: điểm yên ngựa tương đương với cặp tối ưu đạt và đối ngẫu mạnh

**Giả thiết.** Hàm Lagrange được lập theo quy ước $f_i(x)\le0$, với miền nhân tử $\lambda\ge0$, $\nu\in\mathbb R^p$.

**Kết luận.** Nếu $(x^*,\lambda^*,\nu^*)$ là điểm yên ngựa thì $x^*$ khả thi gốc, $(\lambda^*,\nu^*)$ khả thi đối ngẫu, cả hai nghiệm đạt và

$$
f_0(x^*)=p^*=d^*=g(\lambda^*,\nu^*).
$$

Ngược lại, nếu $x^*$ và $(\lambda^*,\nu^*)$ lần lượt là nghiệm gốc và đối ngẫu đạt, đồng thời $p^*=d^*$, thì $(x^*,\lambda^*,\nu^*)$ là điểm yên ngựa.

::: proof
Giả sử trước hết có điểm yên ngựa. Vì bất đẳng thức bên trái đúng với mọi $\nu\in\mathbb R^p$, phải có $h_j(x^*)=0$; nếu không, chọn một thành phần $\nu_j$ với độ lớn tùy ý và dấu làm $L(x^*,\lambda,\nu)$ tăng vô hạn. Tương tự, vì nó đúng với mọi $\lambda\ge0$, phải có $f_i(x^*)\le0$; nếu $f_i(x^*)>0$, tăng $\lambda_i$ sẽ phá bất đẳng thức. Vậy $x^*$ khả thi gốc.

Chọn $\lambda=0$ trong bất đẳng thức bên trái. Tính khả thi vừa chứng minh cho

$$
L(x^*,0,\nu)=f_0(x^*)
\le L(x^*,\lambda^*,\nu^*)
\le f_0(x^*),
$$

trong đó bất đẳng thức cuối dùng $\lambda^*\ge0$, $f_i(x^*)\le0$ và $h_j(x^*)=0$. Vì vậy mọi dấu đều là đẳng thức. Bất đẳng thức bên phải cho

$$
g(\lambda^*,\nu^*)
=\inf_{x\in D}L(x,\lambda^*,\nu^*)
=L(x^*,\lambda^*,\nu^*)
=f_0(x^*).
$$

Đối ngẫu yếu ép giá trị chung này bằng $p^*=d^*$, nên hai nghiệm đều tối ưu và đạt.

Theo chiều ngược lại, giả sử hai nghiệm đạt và $p^*=d^*$. Với mọi nhân tử khả thi $(\lambda,\nu)$, tính khả thi của $x^*$ cho

$$
L(x^*,\lambda,\nu)\le f_0(x^*)=p^*.
$$

Mặt khác,

$$
g(\lambda^*,\nu^*)
=\inf_{x\in D}L(x,\lambda^*,\nu^*)
=d^*=p^*=f_0(x^*).
$$

Suy ra $x^*$ đạt infimum của $L(\cdot,\lambda^*,\nu^*)$ và

$$
L(x^*,\lambda,\nu)
\le
L(x^*,\lambda^*,\nu^*)
\le
L(x,\lambda^*,\nu^*)
$$

với mọi $x\in D$, $\lambda\ge0$ và $\nu\in\mathbb R^p$. Đây chính là quan hệ điểm yên ngựa.
:::

## D. KKT như chứng nhận tối ưu

### 9. Ràng buộc hoạt động và điều kiện bù trừ

**Mục tiêu đọc hiểu.** Người đọc xác định được ràng buộc hoạt động tại một điểm, ghép đúng ràng buộc với nhân tử và giải thích được điều kiện bù trừ.

**Định nghĩa và giả thiết.** Xét các ràng buộc bất đẳng thức

$$
f_i(x)\le 0,
\qquad i=1,\ldots,m,
$$

và các nhân tử khả thi đối ngẫu $\lambda_i\ge 0$. Ràng buộc thứ $i$ **hoạt động** tại $x$ nếu $f_i(x)=0$, và **không hoạt động** nếu $f_i(x)<0$. Điều kiện bù trừ tại một cặp gốc–đối ngẫu là

$$
\lambda_i f_i(x)=0,
\qquad i=1,\ldots,m.
$$

**Trực quan.** Ràng buộc không hoạt động còn một khoảng dư, nên bù trừ buộc nhân tử của nó bằng $0$. Ràng buộc hoạt động có thể có nhân tử dương, nhưng cũng có thể có nhân tử bằng $0$ trong trường hợp suy biến.

Hình tổng hợp ở Chủ đề 11 sẽ đặt trường hợp hoạt động này cạnh điều kiện dấu và điều kiện dừng.

::: example
**Ví dụ tính được.** Với bài toán xuyên suốt,

$$
f_1(x)=(x-2)(x-4)\le 0,
$$

nghiệm $x^*=2$ nằm trên biên vì $f_1(2)=0$. Nhân tử tối ưu là $\lambda^*=2$, nên

$$
\lambda^*f_1(x^*)=2\cdot 0=0.
$$

Trong bài toán nhiễu $f_1(x)\le u$, tại $u=8$ nghiệm là $x^*(8)=0$ và $f_1(0)=8$. Ràng buộc vẫn hoạt động, nhưng $\lambda^*(8)=0$. Đây là trường hợp hoạt động suy biến.
:::

**Ý nghĩa và ứng dụng trong AI.** Nhân tử dương chỉ ra một ngân sách đang tạo đánh đổi cục bộ với mục tiêu. Một giới hạn chuẩn, năng lượng hoặc công bằng không hoạt động có giá biên bằng $0$ tại nghiệm đang xét.

**Điểm dễ nhầm.** Hoạt động không kéo theo $\lambda_i>0$; chiều đúng là $f_i(x)<0$ cùng bù trừ kéo theo $\lambda_i=0$. Bù trừ cũng không thay thế khả thi gốc hoặc khả thi đối ngẫu.

**Câu hỏi kiểm tra.** Nếu $f_i(x^*)=-0{,}3$ và bộ đang xét thỏa bù trừ, $\lambda_i^*$ phải bằng bao nhiêu? Điều gì còn chưa thể kết luận nếu $f_i(x^*)=0$?

### 10. Nón pháp tuyến và điều kiện dừng trên miền

**Mục tiêu đọc hiểu.** Người đọc viết được điều kiện dừng khi biến bị giới hạn trong một miền lồi $D$, đồng thời nhận ra khi nào điều kiện này thu về $\nabla_xL=0$.

**Định nghĩa và giả thiết.** Cho $D\subseteq\mathbb R^n$ lồi và $x\in D$. Nón pháp tuyến của $D$ tại $x$ là

$$
N_D(x)
=
\{v\in\mathbb R^n:\langle v,y-x\rangle\le 0
\text{ với mọi }y\in D\}.
$$

Với các hàm khả vi, điều kiện dừng của Lagrangian trên miền $D$ là

$$
0\in \nabla_xL(x^*,\lambda^*,\nu^*)+N_D(x^*).
$$

Nếu $D=\mathbb R^n$ thì $N_D(x^*)=\{0\}$, do đó điều kiện dừng trở thành $\nabla_xL(x^*,\lambda^*,\nu^*)=0$.

**Trực quan.** Tại một điểm trong tương đối của miền, thường không có pháp tuyến khác $0$. Tại biên, một véc-tơ pháp tuyến có thể cân bằng gradient, vì mọi hướng làm giảm hàm ngay lập tức đều đi ra ngoài miền.

Panel hình chiếu trong hình ở Chủ đề 11 minh họa một véc-tơ gradient được cân bằng bởi pháp tuyến tại biên.

::: example
**Ví dụ tính được.** Xét

$$
\min_{x\in[0,\infty)}(x+1)^2.
$$

Nghiệm là $x^*=0$ và $\nabla f(0)=2$. Theo định nghĩa,

$$
N_{[0,\infty)}(0)=(-\infty,0].
$$

Vì $-2\in N_{[0,\infty)}(0)$, ta có

$$
0=2+(-2)\in \nabla f(0)+N_{[0,\infty)}(0).
$$

Gradient không bằng $0$, nhưng điều kiện dừng trên miền vẫn đúng.
:::

**Ý nghĩa và ứng dụng trong AI.** Nón pháp tuyến cho phép giữ trực tiếp một miền tham số cứng, chẳng hạn tham số không âm hoặc một tập lồi đơn giản, mà không cần viết lại mọi mặt biên thành một ràng buộc riêng.

**Điểm dễ nhầm.** Với quy ước trên, $-\nabla_xL$ thuộc nón pháp tuyến. Không được thay điều kiện bao hàm bằng $\nabla_xL=0$ khi nghiệm nằm trên biên của $D$.

**Câu hỏi kiểm tra.** Hãy tính $N_{[0,\infty)}(x)$ khi $x>0$ và khi $x=0$. Vì sao hai trường hợp cho hai điều kiện dừng khác nhau?

### 11. Bốn nhóm điều kiện KKT và phạm vi cần–đủ

**Mục tiêu đọc hiểu.** Người đọc kiểm tra đủ bốn nhóm điều kiện Karush–Kuhn–Tucker (KKT) và nêu đúng giả thiết trước khi dùng chúng như điều kiện cần hoặc đủ.

**Định nghĩa và giả thiết.** Xét

$$
\begin{aligned}
\operatorname*{minimize}_{x\in D}\quad &f_0(x)\\
\text{với}\quad &f_i(x)\le0,
\quad i=1,\ldots,m,\\
&h_j(x)=0,
\quad j=1,\ldots,p,
\end{aligned}
$$

trong đó các hàm đang dùng là khả vi. Một bộ $(x^*,\lambda^*,\nu^*)$ thỏa KKT nếu:

1. **Khả thi gốc:** $x^*\in D$, $f_i(x^*)\le0$, $h_j(x^*)=0$.
2. **Khả thi đối ngẫu:** $\lambda_i^*\ge0$.
3. **Bù trừ:** $\lambda_i^*f_i(x^*)=0$.
4. **Dừng:** $0\in\nabla_xL(x^*,\lambda^*,\nu^*)+N_D(x^*)$.

Trong bài toán lồi, $D$ phải lồi, $f_0,f_i$ lồi và $h_j$ affine. Khi một nghiệm gốc tồn tại và điều kiện Slater thỏa, KKT là cần và đủ. Nếu đã có một bộ KKT cho bài toán lồi, tính đủ không cần dùng lại Slater.

**Trực quan.** KKT ghép bốn phép kiểm tra: điểm nằm trong miền, nhân tử có đúng dấu, chỉ biên thích hợp mang lực pháp tuyến, và tổng các lực pháp tuyến cân bằng gradient mục tiêu.

![Hai ứng viên biên của ví dụ xuyên suốt, trong đó chỉ điểm x bằng 2 có nhân tử không âm; panel bên phải minh họa một bộ KKT trong hai chiều.](img/lec-03/kkt-active-projection.svg)

::: example
**Ví dụ tính được.** Trong bài toán xuyên suốt, điều kiện dừng trên $D=\mathbb R$ là

$$
2x+\lambda(2x-6)=0.
$$

Tại $x^*=2$, phương trình cho $4-2\lambda=0$, nên $\lambda^*=2$. Bộ $(2,2)$ thỏa khả thi gốc, khả thi đối ngẫu, bù trừ và dừng.

Điểm biên còn lại $x=4$ đòi

$$
8+2\lambda=0
\quad\Longrightarrow\quad
\lambda=-4,
$$

trái với khả thi đối ngẫu.

Để thấy giới hạn ngoài phạm vi lồi, xét $\min_{x\in[-1,1]}-x^2$. Điểm $x=0$ thỏa điều kiện dừng vì gradient bằng $0$, nhưng $x=0$ không phải cực tiểu toàn cục.
:::

**Ý nghĩa và ứng dụng trong AI.** KKT là một chứng nhận có thể kiểm tra cho nghiệm của mô hình lồi có ràng buộc. Nhân tử còn cho biết ràng buộc nào tạo đánh đổi với mất mát.

**Điểm dễ nhầm.** Không kiểm tra riêng điều kiện dừng rồi gọi đó là KKT. Slater hỗ trợ tính cần và sự tồn tại của nhân tử; tính lồi cho tính đủ khi đã có một bộ KKT. Trong bài toán phi lồi, KKT không bảo đảm tối ưu toàn cục.

**Câu hỏi kiểm tra.** Hãy nêu giả thiết cần kiểm tra trước khi kết luận rằng một bộ KKT là nghiệm tối ưu toàn cục.

### 12. KKT cho hồi quy có giới hạn chuẩn

**Mục tiêu đọc hiểu.** Người đọc chuyển được bốn nhóm KKT sang một bài toán hồi quy có ngân sách tham số và giải thích vai trò của nhân tử trong mô hình AI.

**Định nghĩa và giả thiết.** Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$, $w\in\mathbb R^d$ và $\tau>0$. Xét

$$
\min_w\frac12\|Xw-y\|_2^2
\quad\text{với}\quad
\|w\|_2^2\le\tau.
$$

Đặt $f_1(w)=\|w\|_2^2-\tau$. Lagrangian là

$$
L(w,\lambda)
=
\frac12\|Xw-y\|_2^2
+\lambda(\|w\|_2^2-\tau),
\qquad \lambda\ge0.
$$

Điều kiện dừng là

$$
X^T(Xw^*-y)+2\lambda^*w^*=0.
$$

**Trực quan.** Nếu nghiệm bình phương tối thiểu không ràng buộc nằm ngoài cầu chuẩn, nghiệm có ràng buộc xuất hiện tại điểm một tập mức của mất mát tiếp xúc với biên cầu. Nhân tử cân bằng pháp tuyến của hai bề mặt.

Panel phải của hình ở Chủ đề 11 cho đúng bài toán QP hai biến dùng dưới đây.

::: example
**Ví dụ tính được.** Dùng lại bài toán QP hai biến ở Chủ đề 4:

$$
\min_{x_1,x_2}x_1^2+x_2^2
\quad\text{với}\quad
x_1+x_2\ge1.
$$

Chủ đề 4 đã cho

$$
\lambda^*=1,
\qquad
x^*=\left(\frac12,\frac12\right),
\qquad
p^*=d^*=\frac12.
$$

Điểm $(1,1)$ thỏa Slater, nên KKT là cần và đủ.

Tại bộ trên, khả thi gốc và đối ngẫu đều đúng; ràng buộc hoạt động nên bù trừ bằng $0$; điều kiện dừng là

$$
(2x_1^* - \lambda^*,2x_2^* - \lambda^*)=(0,0).
$$
:::

**Ý nghĩa và ứng dụng trong AI.** Khi $\lambda^*>0$, phương trình dừng có dạng của hồi quy có phạt bình phương chuẩn (ridge regression) với hệ số điều chuẩn liên quan đến $2\lambda^*$. Cách nhìn này nối ngân sách cứng với một giá biên, nhưng không phải một thuật toán chọn siêu tham số.

**Điểm dễ nhầm.** Hệ số $2$ xuất phát từ cách viết $\|w\|_2^2$; nếu dùng $\tfrac12\|w\|_2^2$ thì hệ số thay đổi. Không được khẳng định ánh xạ giữa $\tau$ và $\lambda^*$ luôn một–một, đặc biệt khi nghiệm hoặc nhân tử không duy nhất.

**Câu hỏi kiểm tra.** Hãy viết khả thi gốc, khả thi đối ngẫu và bù trừ cho bài hồi quy có giới hạn chuẩn ở trên.

## Các định lý và chứng minh quan trọng — Nhóm D

### Định lý: khoảng bằng không suy ra bù trừ

**Giả thiết.** $x^*$ là nghiệm tối ưu gốc, $(\lambda^*,\nu^*)$ là nghiệm tối ưu đối ngẫu, hai nghiệm đều đạt và $p^*=d^*$. Quy ước là $f_i(x)\le0$ và $\lambda_i^*\ge0$.

**Kết luận.** Với mọi $i$,

$$
\lambda_i^*f_i(x^*)=0.
$$

::: proof
Từ định nghĩa hàm đối ngẫu và tính khả thi của $x^*$,

$$
g(\lambda^*,\nu^*)
\le
L(x^*,\lambda^*,\nu^*)
\le
f_0(x^*).
$$

Hai đầu mút lần lượt bằng $d^*$ và $p^*$, nên đối ngẫu mạnh buộc cả hai bất đẳng thức thành đẳng thức. Vì $h_j(x^*)=0$,

$$
L(x^*,\lambda^*,\nu^*)-f_0(x^*)
=
\sum_{i=1}^m\lambda_i^*f_i(x^*)=0.
$$

Mỗi số hạng trong tổng không dương do $\lambda_i^*\ge0$ và $f_i(x^*)\le0$. Một tổng hữu hạn các số không dương chỉ bằng $0$ khi từng số hạng bằng $0$. Do đó $\lambda_i^*f_i(x^*)=0$ với mọi $i$.
:::

### Định lý: KKT là điều kiện đủ cho bài toán lồi

**Giả thiết.** $D$ lồi; $f_0,f_i$ lồi và khả vi trên miền phù hợp; $h_j$ affine. Bộ $(x^*,\lambda^*,\nu^*)$ thỏa đủ bốn nhóm KKT.

**Kết luận.** $x^*$ là nghiệm tối ưu gốc; $(\lambda^*,\nu^*)$ là nghiệm tối ưu đối ngẫu; khoảng đối ngẫu bằng $0$.

::: proof
Với $(\lambda^*,\nu^*)$ cố định, hàm $L(\cdot,\lambda^*,\nu^*)$ lồi trên $D$. Điều kiện dừng

$$
0\in\nabla_xL(x^*,\lambda^*,\nu^*)+N_D(x^*)
$$

là điều kiện tối ưu bậc nhất của việc cực tiểu hóa hàm lồi này trên $D$. Vì vậy, với mọi $x\in D$,

$$
L(x,\lambda^*,\nu^*)
\ge
L(x^*,\lambda^*,\nu^*).
$$

Nếu $x$ khả thi gốc thì

$$
L(x,\lambda^*,\nu^*)\le f_0(x),
$$

vì $\lambda_i^*f_i(x)\le0$ và các hạng đẳng thức bằng $0$. Tại $x^*$, khả thi và bù trừ cho

$$
L(x^*,\lambda^*,\nu^*)=f_0(x^*).
$$

Do đó, với mọi $x$ khả thi,

$$
f_0(x)
\ge
L(x,\lambda^*,\nu^*)
\ge
L(x^*,\lambda^*,\nu^*)
=f_0(x^*).
$$

Vậy $x^*$ tối ưu gốc. Đồng thời $x^*$ đạt infimum của Lagrangian, nên

$$
g(\lambda^*,\nu^*)
=L(x^*,\lambda^*,\nu^*)
=f_0(x^*).
$$

Đối ngẫu yếu cho thấy hai phía đều tối ưu và khoảng bằng $0$.
:::

### Phác thảo: tính cần của KKT dưới điều kiện Slater

Với bài toán lồi thỏa điều kiện Slater và $p^*>-\infty$, đối ngẫu mạnh giữ và nghiệm đối ngẫu đạt được. Chọn một nghiệm gốc $x^*$ và một nghiệm đối ngẫu $(\lambda^*,\nu^*)$. Khoảng bằng $0$ cho bù trừ theo định lý trên. Đẳng thức

$$
g(\lambda^*,\nu^*)
=L(x^*,\lambda^*,\nu^*)
$$

cho thấy $x^*$ cực tiểu hóa Lagrangian trên $D$, nên điều kiện tối ưu bậc nhất cho hàm lồi cho

$$
0\in\nabla_xL(x^*,\lambda^*,\nu^*)+N_D(x^*).
$$

Cùng với khả thi gốc và khả thi đối ngẫu, ta thu được đủ bốn nhóm KKT. Phần khó nằm ở định lý Slater bảo đảm đối ngẫu mạnh và tính đạt; chứng minh đầy đủ của Slater dùng định lý siêu phẳng tách và không lặp lại tại đây.

## E. Nhiễu và độ nhạy

### 13. Hàm giá trị, cận toàn cục và dưới gradient

**Mục tiêu đọc hiểu.** Người đọc lập được bài toán nhiễu, suy ra cận toàn cục từ nhân tử tối ưu và phân biệt dưới gradient với gradient duy nhất.

**Định nghĩa và giả thiết.** Xét một bài toán lồi và cố định quy ước nhiễu

$$
f_i(x)\le u_i,
\qquad
h_j(x)=v_j.
$$

Hàm giá trị là

$$
p^*(u,v)
=
\inf_{x\in D}
\{f_0(x):f_i(x)\le u_i,\ h_j(x)=v_j\}.
$$

Với bài toán lồi, $p^*$ là một hàm lồi mở rộng theo $(u,v)$. Giả sử $p^*(0,0)$ hữu hạn. Nếu bài không nhiễu có đối ngẫu mạnh và đạt nghiệm đối ngẫu tại $(\lambda^*,\nu^*)$, thì

$$
p^*(u,v)
\ge
p^*(0,0)-u^T\lambda^*-v^T\nu^*.
$$

Một véc-tơ $s$ là dưới gradient của $p^*$ tại gốc nếu, với mọi $(u,v)$,

$$
p^*(u,v)\ge p^*(0,0)+s^T(u,v).
$$

Vì vậy,

$$
(-\lambda^*,-\nu^*)\in\partial p^*(0,0).
$$

Nếu $p^*$ khả vi tại gốc, dưới gradient này là gradient duy nhất.

**Trực quan.** Nhân tử xác định một siêu phẳng đỡ của hàm giá trị. Dưới gradient là hệ số góc của một đường đỡ; nó chỉ trở thành đạo hàm duy nhất khi hàm giá trị khả vi.

![Hàm giá trị của bài toán nhiễu cùng đường đỡ tại u bằng 0 có hệ số góc âm lambda sao.](img/lec-03/sensitivity-value.svg)

::: example
**Ví dụ tính được.** Trong bài toán xuyên suốt, $p^*(0)=5$ và $\lambda^*(0)=2$. Vì thế

$$
p^*(u)\ge5-2u.
$$

Tại $u=0$, hàm giá trị khả vi và

$$
p^{*\prime}(0)=-2=-\lambda^*(0).
$$

Ngược lại, với hàm lồi $q(u)=|u|$, tập dưới gradient tại $0$ là cả khoảng $[-1,1]$; không có một đạo hàm duy nhất.
:::

**Ý nghĩa và ứng dụng trong AI.** Độ nhạy ước lượng tác động của việc nới ngân sách chuẩn, năng lượng, độ trễ hoặc sai lệch công bằng mà chưa cần giải lại toàn bộ mô hình cho một thay đổi rất nhỏ.

**Điểm dễ nhầm.** Dấu âm đến từ quy ước $f_i(x)\le u_i$. Nếu viết $f_i(x)+u_i\le0$, dấu sẽ đổi. Không gọi một nhân tử tùy ý là gradient khi hàm giá trị không khả vi hoặc nghiệm đối ngẫu không duy nhất.

**Câu hỏi kiểm tra.** Với $\lambda^*=3$ và quy ước $f(x)\le u$, giá trị tối ưu thay đổi bậc nhất theo dấu nào khi tăng $u$ một lượng nhỏ?

### 14. Hàm giá trị đầy đủ của ví dụ xuyên suốt

**Mục tiêu đọc hiểu.** Người đọc tính được hàm giá trị trên toàn miền nhiễu, nhận ra các điểm đổi chế độ và phân biệt cận toàn cục với xấp xỉ cục bộ.

**Định nghĩa và giả thiết.** Xét

$$
p^*(u)
=
\inf_x
\{x^2+1:(x-2)(x-4)\le u\}.
$$

Ràng buộc tương đương với

$$
(x-3)^2\le1+u.
$$

**Trực quan.** Khi $u$ tăng từ $-1$, khoảng khả thi mở rộng quanh $3$. Nghiệm đi theo đầu trái của khoảng cho đến khi chạm nghiệm không ràng buộc $x=0$ tại $u=8$; sau đó giá trị tối ưu giữ nguyên.

![Ba miền của hàm giá trị, đường đỡ tại u bằng 0, điểm mất Slater u bằng âm 1 và điểm chuyển chế độ u bằng 8.](img/lec-03/sensitivity-value.svg)

::: example
**Ví dụ tính được.** Hàm giá trị là

$$
p^*(u)
=
\begin{cases}
+\infty,
&u<-1,\\
11+u-6\sqrt{1+u},
&-1\le u\le8,\\
1,
&u\ge8.
\end{cases}
$$

Trên $-1<u<8$,

$$
p^{*\prime}(u)
=
1-\frac3{\sqrt{1+u}}.
$$

Tại $u=0$, $p^{*\prime}(0)=-2$. Với $u=0{,}1$,

$$
p^*(0{,}1)
=11{,}1-6\sqrt{1{,}1}
\approx4{,}807,
$$

trong khi xấp xỉ bậc nhất cho $5-2(0{,}1)=4{,}8$.
:::

**Ý nghĩa và ứng dụng trong AI.** Ví dụ cho thấy thông tin cục bộ hữu ích khi ngân sách thay đổi nhỏ, nhưng một thay đổi lớn có thể làm ràng buộc mất vai trò và chuyển mô hình sang một chế độ khác.

**Điểm dễ nhầm.** Tại $u=-1$, Slater không còn thỏa. Tại đúng $u=8$, ràng buộc vẫn hoạt động nhưng suy biến với $\lambda^*(8)=0$; chỉ khi $u>8$ ràng buộc mới không hoạt động. Đường $5-2u$ là cận toàn cục và tiếp tuyến tại $0$, không phải công thức đúng cho mọi $u$.

**Câu hỏi kiểm tra.** Vì sao $u=8$ không được gọi là trường hợp ràng buộc không hoạt động? Xấp xỉ $5-2u$ nên được dùng trong phạm vi nào?

## Các định lý và chứng minh quan trọng — Nhóm E

### Định lý: nhân tử đối ngẫu tạo cận toàn cục cho hàm giá trị

**Giả thiết.** Bài toán đang xét là lồi và $p^*(0,0)$ hữu hạn. Bài không nhiễu có đối ngẫu mạnh và $(\lambda^*,\nu^*)$ là một nghiệm đối ngẫu đạt được. Quy ước nhiễu là $f_i(x)\le u_i$, $h_j(x)=v_j$.

**Kết luận.** Với mọi $(u,v)$,

$$
p^*(u,v)
\ge
p^*(0,0)-u^T\lambda^*-v^T\nu^*.
$$

Do đó $(-\lambda^*,-\nu^*)\in\partial p^*(0,0)$.

::: proof
Lấy một điểm $x$ khả thi cho bài nhiễu. Vì $\lambda^*\ge0$,

$$
\begin{aligned}
L(x,\lambda^*,\nu^*)
&=f_0(x)
+\sum_i\lambda_i^*f_i(x)
+\sum_j\nu_j^*h_j(x)\\
&\le
f_0(x)+u^T\lambda^*+v^T\nu^*.
\end{aligned}
$$

Mặt khác,

$$
g(\lambda^*,\nu^*)
\le
L(x,\lambda^*,\nu^*).
$$

Đối ngẫu mạnh tại bài không nhiễu cho $g(\lambda^*,\nu^*)=p^*(0,0)$. Vì vậy

$$
f_0(x)
\ge
p^*(0,0)-u^T\lambda^*-v^T\nu^*.
$$

Lấy infimum trên mọi $x$ khả thi của bài nhiễu thu được cận cần chứng minh. Cận có đúng dạng bất đẳng thức dưới gradient tại $(0,0)$, nên

$$
(-\lambda^*,-\nu^*)\in\partial p^*(0,0).
$$
:::

### Hệ quả: công thức độ nhạy khi hàm giá trị khả vi

Nếu thêm giả thiết $p^*$ khả vi tại $(0,0)$, dưới vi phân chỉ có một phần tử. Do đó

$$
\nabla p^*(0,0)=(-\lambda^*,-\nu^*),
$$

hay theo từng thành phần,

$$
\lambda_i^*
=-\frac{\partial p^*}{\partial u_i}(0,0),
\qquad
\nu_j^*
=-\frac{\partial p^*}{\partial v_j}(0,0).
$$

Không dùng hệ quả này nếu hàm giá trị không khả vi; khi đó chỉ giữ phát biểu dưới gradient hoặc dùng đạo hàm một phía phù hợp.

## F. Bất đẳng thức tổng quát và bản đồ tổng hợp

### 15. Nhân tử theo nón và trường hợp SDP

**Mục tiêu đọc hiểu.** Người đọc mở rộng được nhân tử không âm từ bất đẳng thức thành phần sang bất đẳng thức theo nón và viết đúng hạng ghép cho một ràng buộc ma trận.

**Định nghĩa và giả thiết.** Cho $K$ là một nón proper trong không gian tích vô hướng $E$, nghĩa là $K$ lồi, đóng, nhọn và có nội khác rỗng. Nón đối ngẫu là

$$
K^*
=
\{\lambda\in E:\langle\lambda,z\rangle\ge0
\text{ với mọi }z\in K\}.
$$

Với ràng buộc

$$
f(x)\preceq_K0,
$$

ta có $-f(x)\in K$. Nhân tử phải thỏa $\lambda\in K^*$, hay $\lambda\succeq_{K^*}0$, và Lagrangian dùng

$$
L(x,\lambda)
=f_0(x)+\langle\lambda,f(x)\rangle.
$$

**Trực quan.** Nón $K$ xác định phía khả thi của ràng buộc; nón đối ngẫu chứa các véc-tơ tạo tích vô hướng không âm với mọi hướng trong $K$. Vì $-f(x)\in K$, hạng ghép với một nhân tử đối ngẫu khả thi không dương.

![Thứ tự theo nón trên véc-tơ và ma trận được kiểm tra bằng hiệu; hình cũng chỉ ra các cặp không so sánh được và nhấn mạnh rằng thứ tự PSD không phải so sánh từng phần tử.](img/lec-02/cone-induced-orders.svg)

::: example
**Ví dụ tính được.** Với $K=\mathbb R_+^m$, ta có $K^*=\mathbb R_+^m$ và thu lại các nhân tử thành phần $\lambda_i\ge0$.

Trong trường hợp ma trận, cho

$$
F(x)=
\begin{bmatrix}
x-1&0\\
0&-x
\end{bmatrix}
\preceq0.
$$

Ràng buộc tương đương $0\le x\le1$. Chọn

$$
Z=
\begin{bmatrix}
2&0\\
0&3
\end{bmatrix}
\succeq0.
$$

Hạng ghép là

$$
\langle Z,F(x)\rangle
=\operatorname{tr}(ZF(x))
=2(x-1)-3x
=-x-2\le0
$$

với mọi $x\in[0,1]$.
:::

**Ý nghĩa và ứng dụng trong AI.** Nhân tử ma trận xuất hiện khi ràng buộc liên quan đến ma trận hạt nhân, ma trận hiệp phương sai, chặn chuẩn phổ hoặc một thư giãn nửa xác định dương.

**Điểm dễ nhầm.** Không ghép một số vô hướng với một ràng buộc ma trận nếu chưa đưa nó về một bất đẳng thức vô hướng. $F(x)\preceq0$ yêu cầu nhân tử $Z\succeq0$ cùng cấp, và hạng ghép là tích trong Frobenius, không phải tích theo từng phần tử.

**Câu hỏi kiểm tra.** Với $F(x)\in\mathbb S^r$ và $F(x)\preceq0$, nhân tử thuộc nón nào, có kích thước gì, và hạng tương ứng trong Lagrangian là gì?

## Các định lý và chứng minh quan trọng — Nhóm F

### Định lý: đối ngẫu yếu cho bất đẳng thức theo nón

**Giả thiết.** Xét bài toán cực tiểu có ràng buộc $f(x)\preceq_K0$ và, nếu có, các đẳng thức $h_j(x)=0$. Nhân tử thỏa $\lambda\in K^*$; các nhân tử đẳng thức tự do dấu.

**Kết luận.** Hàm đối ngẫu tạo một cận dưới cho giá trị tối ưu gốc. Do đó $d^*\le p^*$.

::: proof
Nếu $x$ khả thi thì $-f(x)\in K$. Vì $\lambda\in K^*$,

$$
\langle\lambda,-f(x)\rangle\ge0,
$$

nên $\langle\lambda,f(x)\rangle\le0$. Các hạng đẳng thức bằng $0$ tại điểm khả thi. Vì vậy

$$
L(x,\lambda,\nu)\le f_0(x).
$$

Theo định nghĩa của hàm đối ngẫu,

$$
g(\lambda,\nu)
=\inf_{z\in D}L(z,\lambda,\nu)
\le
L(x,\lambda,\nu).
$$

Suy ra $g(\lambda,\nu)\le f_0(x)$ với mọi điểm khả thi gốc và mọi nhân tử khả thi đối ngẫu. Lấy infimum theo $x$ rồi supremum theo nhân tử cho $d^*\le p^*$.
:::

## Bản đồ tổng hợp

| Bước | Đối tượng cần viết hoặc kiểm tra | Câu hỏi quyết định |
|---|---|---|
| 1. Khóa khuôn | $D$, $f_i\le0$, $h_j=0$, kiểu và kích thước | Quy ước dấu đã nhất quán chưa? |
| 2. Lập cận | $L$, $g$, $\operatorname{dom}g$ | Infimum lấy trên đúng miền chưa? |
| 3. Chọn cận tốt nhất | Bài toán đối ngẫu, $d^*\le p^*$ | Miền hữu hiệu và khả thi đối ngẫu đã được tách chưa? |
| 4. Kiểm tra độ khít | Khoảng đối ngẫu, Slater, tính đạt | Kết luận mạnh dựa trên giả thiết nào? |
| 5. Giải thích hình học | Tập mở rộng, đường đỡ, điểm yên ngựa | Tung độ cắt và pháp tuyến mã hóa nhân tử ra sao? |
| 6. Chứng nhận nghiệm | Bốn nhóm KKT | Đang dùng tính cần, tính đủ hay cả hai? |
| 7. Diễn giải thay đổi | $p^*(u,v)$, dưới gradient, trường hợp biên | Nhân tử là cận toàn cục hay đạo hàm cục bộ? |
| 8. Mở rộng theo nón | $K$, $K^*$ và tích trong | Nhân tử có đúng không gian và đúng hướng dấu không? |

**Ca tổng hợp trong AI.** Với hồi quy có giới hạn chuẩn, chuỗi trên bắt đầu từ một QCQP lồi, tạo nhân tử cho ngân sách chuẩn, dùng KKT để chứng nhận nghiệm và dùng nhân tử như dưới gradient của giá trị tối ưu theo $\tau$. Nếu ràng buộc là ma trận, cùng chuỗi được giữ nhưng nhân tử chuyển từ số không âm sang ma trận nửa xác định dương.

**Chuyển tiếp.** Bài 04 dùng điều kiện dừng như đầu vào để xây các phương pháp số cho tối ưu trơn và bài toán có ràng buộc đẳng thức. Phần này không trình bày hướng giảm, tìm bước, phương pháp giảm gradient hoặc Newton.

## Tài liệu tham khảo

- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Chương 5, đặc biệt các mục 5.1–5.6 và 5.9.
- Stephen Boyd (2009), *Lecture 5: Duality*, MIT 6.079/6.975, các trang 5-2–5-30; MIT OpenCourseWare.
- Nguyễn Bích Vân, *Bài tập chương 4*, Bài 1 và các bài KKT liên quan; năm chưa xác minh.
- Đề cương học phần UET.AI2012, Buổi 3, LLO4–LLO5 và CLO1.
