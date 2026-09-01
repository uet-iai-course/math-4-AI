# Ghi chú Bài 02 — Nhận dạng và cải dạng các bài toán tối ưu lồi

Bài 02 dùng lại tập lồi, hàm lồi, tập mức dưới và ma trận nửa xác định dương (PSD) để nhận dạng cấu trúc bài toán, chọn phép cải dạng và kiểm tra các giả thiết quyết định.

Người học cần nhận dạng, cải dạng và giải thích được các lớp bài toán tối ưu lồi trong một ngữ cảnh AI. Nội dung được chia như sau:

| Mạch | Chủ đề | Sản phẩm đọc hiểu |
|---|---|---|
| A. Khuôn và cải dạng | Khuôn lồi chuẩn; các phép cải dạng tương đương | Tách đối tượng toán học khỏi biểu diễn ban đầu |
| B. Tối ưu tựa lồi | Tập mức dưới; chia đôi theo giá trị | Đổi tối ưu thành chuỗi phép thử khả thi |
| C. LP, QP và QCQP | Ba lớp affine và bậc hai | Nhận dạng lớp và kiểm tra giả thiết PSD |
| D. Quy hoạch hình học | Đơn thức, đa thức dương; đổi log | Cho thấy cấu trúc lồi trên miền dương |
| E. Tối ưu nón và SDP | Thứ tự theo nón; LMI và SDP | Đọc bất đẳng thức véc-tơ hoặc ma trận đúng kiểu |
| F. Tối ưu nhiều mục tiêu | Pareto; vô hướng hóa bằng trọng số | Phân tích đánh đổi và giới hạn của trọng số |

Đối ngẫu Lagrange, Slater, KKT và độ nhạy được dành cho Bài 03; gradient và Newton thuộc Bài 04; hình học điểm cực và thuật toán quy hoạch tuyến tính thuộc Bài 07. Bài 02 tập trung vào ba việc: xác định lớp bài toán, chọn phép cải dạng hợp lệ và chứng nhận tính lồi.

## A. Khuôn bài toán và cải dạng tương đương

### 1. Khuôn bài toán tối ưu và dạng lồi chuẩn

**Mục tiêu đọc hiểu.** Người đọc phân biệt được miền của bài toán, tập khả thi, giá trị tối ưu và nghiệm tối ưu; đồng thời kiểm tra được một biểu diễn có phải dạng lồi chuẩn hay không.

**Định nghĩa và giả thiết.** Cho miền chung $D\subseteq\mathbb R^n$, hàm mục tiêu $f_0:D\to\mathbb R$, các hàm bất đẳng thức $f_i:D\to\mathbb R$ và các hàm đẳng thức $h_j:D\to\mathbb R$. Khuôn tổng quát là

$$
\begin{aligned}
\operatorname*{minimize}_{x\in D}\quad &f_0(x)\\
\text{với}\quad &f_i(x)\le0,\quad i=1,\ldots,m,\\
&h_j(x)=0,\quad j=1,\ldots,p.
\end{aligned}
$$

Tập khả thi và giá trị tối ưu lần lượt là

$$
\mathcal F
=
\{x\in D:f_i(x)\le0,\ h_j(x)=0\},
\qquad
p^*=\inf_{x\in\mathcal F}f_0(x).
$$

Ta dùng quy ước $p^*=+\infty$ nếu $\mathcal F=\varnothing$ và $p^*=-\infty$ nếu bài toán không bị chặn dưới. Một điểm $x^*$ là nghiệm tối ưu khi $x^*\in\mathcal F$ và $f_0(x^*)=p^*$. Infimum hữu hạn không tự động bảo đảm có nghiệm đạt được.

Bài toán ở **dạng lồi chuẩn** nếu:

- $D$ lồi;
- $f_0,f_1,\ldots,f_m$ lồi trên $D$;
- mọi đẳng thức là affine, nên có thể viết gộp thành $Ax=b$.

**Trực quan.** Mỗi bất đẳng thức lồi giữ lại một tập mức dưới lồi. Đẳng thức affine giữ lại một lát phẳng. Tập khả thi là phần chung của các miền này; mục tiêu lồi đặt các tập mức lồng nhau lên phần chung đó.

![Một biểu diễn phi tuyến được rút gọn về các ràng buộc affine cùng mô tả đúng một tia khả thi; phía dưới là ba phép cải dạng chuẩn.](img/lec-02/reformulation-equivalence.svg)

*Hàng trên minh họa đối tượng toán học cần nhận dạng; hàng dưới minh họa ba phép cải dạng tương đương.*

::: example
**Ví dụ tính được.** Xét

$$
\min_{x_1,x_2}\ (x_1-1)^2+(x_2-2)^2
\quad\text{với}\quad
x_1+x_2\le2,\qquad x_1-x_2=0.
$$

Đẳng thức cho $x_1=x_2=t$; bất đẳng thức cho $t\le1$. Mục tiêu trở thành

$$
g(t)=(t-1)^2+(t-2)^2=2t^2-6t+5.
$$

Nghiệm không ràng buộc của $g$ là $t=3/2$, không khả thi. Vì $g'(t)=4t-6<0$ trên $t\le1$, nghiệm là

$$
x^*=(1,1),\qquad p^*=1.
$$

Mục tiêu là hàm bậc hai lồi, bất đẳng thức và đẳng thức đều affine, nên đây là một bài toán lồi.
:::

**Ý nghĩa và ứng dụng trong AI.** Huấn luyện mô hình thường có dạng cực tiểu hóa một mất mát trên tập tham số thỏa ngân sách, giới hạn chuẩn hoặc yêu cầu công bằng. Việc ghi đúng $D$, $\mathcal F$ và kiểu của từng ràng buộc quyết định có thể dùng bảo đảm của tối ưu lồi hay không.

**Điểm dễ nhầm.** Một đẳng thức $h(x)=0$ với $h$ lồi nhưng phi tuyến nói chung không tạo tập lồi. Tính lồi của mục tiêu cũng không đủ nếu tập khả thi không lồi. Ngược lại, một biểu diễn không giống dạng chuẩn chưa đủ để kết luận bài toán không lồi; trước hết phải tìm một biểu diễn tương đương.

**Câu hỏi kiểm tra.** Bài toán $\min_x x^2$ với $(x-1)^2=0$ không ở dạng lồi chuẩn theo biểu diễn đã cho. Tập khả thi thực sự là gì, và có thể viết lại bài toán thế nào?

### Định lý: tập khả thi của dạng lồi chuẩn là lồi

**Giả thiết.** $D$ lồi; mỗi $f_i$ lồi trên $D$; các đẳng thức có dạng $Ax=b$.

**Kết luận.** Tập

$$
\mathcal F=\{x\in D:f_i(x)\le0,\ i=1,\ldots,m,\ Ax=b\}
$$

là tập lồi.

::: proof
Lấy $x,y\in\mathcal F$ và $\theta\in[0,1]$. Đặt $z=\theta x+(1-\theta)y$.

Vì $D$ lồi nên $z\in D$. Với mỗi bất đẳng thức, tính lồi cho

$$
f_i(z)
\le
\theta f_i(x)+(1-\theta)f_i(y)
\le0.
$$

Với đẳng thức affine,

$$
Az=\theta Ax+(1-\theta)Ay
=\theta b+(1-\theta)b=b.
$$

Do đó $z\in\mathcal F$. Vậy $\mathcal F$ lồi. Giả thiết lồi của $f_i$ được dùng để bảo toàn bất đẳng thức; tính affine được dùng để bảo toàn đẳng thức.
:::

### 2. Cải dạng tương đương

**Mục tiêu đọc hiểu.** Người đọc chọn được phép khử đẳng thức, thêm biến dư hoặc đưa mục tiêu về dạng trên-đồ-thị (epigraph) mà không làm thay đổi kết quả cần tìm.

**Định nghĩa và giả thiết.** Hai biểu diễn được xem là tương đương theo kết quả tối ưu khi nghiệm của biểu diễn này có thể ánh xạ sang nghiệm của biểu diễn kia và ngược lại. Nếu phép biến đổi giữ nguyên giá trị tối ưu, ta nói rõ điều đó; nếu mục tiêu được biến đổi bởi một hàm tăng nghiêm, tập nghiệm được giữ nguyên nhưng giá trị mới là ảnh của giá trị cũ. Không phải mọi cải dạng đều giữ nguyên tập khả thi trong cùng một không gian biến: thêm biến sẽ mở rộng không gian, còn khử biến sẽ thu nhỏ nó.

Ba phép thường dùng là:

1. **Khử đẳng thức.** Nếu $Ax=b$ khả thi, chọn $x_0$ sao cho $Ax_0=b$ và ma trận $F$ sao cho

   $$
   \operatorname{range}(F)=\ker A.
   $$

   Mọi nghiệm của đẳng thức có dạng $x=Fz+x_0$.

2. **Biến dư.** Với một bất đẳng thức affine,

   $$
   a^Tx\le b
   \quad\Longleftrightarrow\quad
   \exists s\ge0:\ a^Tx+s=b.
   $$

3. **Dạng trên-đồ-thị.** Bài toán $\min_x f_0(x)$ tương đương với

   $$
   \min_{x,t}t
   \quad\text{với}\quad
   f_0(x)\le t,
   $$

   đồng thời phải giữ nguyên mọi ràng buộc ban đầu của $x$.

![Ba phép cải dạng: tham số hóa một tập affine, thêm biến dư và nâng đồ thị của mục tiêu lên biến t.](img/lec-02/reformulation-equivalence.svg)

**Trực quan.** Khử đẳng thức đổi hệ tọa độ để chỉ còn các hướng khả thi. Biến dư biến khoảng cách tới biên bất đẳng thức thành một tọa độ không âm. Dạng trên-đồ-thị nâng mỗi điểm $x$ lên một điểm $(x,t)$ nằm phía trên đồ thị của $f_0$.

::: example
**Ví dụ tính được: cực đại của hai hàm affine.** Xét

$$
\min_{x\in\mathbb R}\max\{x,-x+2\}.
$$

Đặt biến $t$ và viết bài toán tương đương

$$
\begin{aligned}
\min_{x,t}\quad&t\\
\text{với}\quad&x\le t,\\
&-x+2\le t.
\end{aligned}
$$

Đây là một quy hoạch tuyến tính. Hai cận dưới của $t$ cân bằng tại

$$
x=-x+2,\qquad x=1,\qquad t=1.
$$

Vậy $x^*=1$ và $p^*=1$.
:::

**Ý nghĩa và ứng dụng trong AI.** Nhiều mất mát cực đại, chuẩn $L_1$, chuẩn $L_\infty$ và giới hạn độ lệch có biểu diễn ban đầu không trơn. Thêm biến phụ có thể đưa về một bài toán tuyến tính hoặc bài toán nón mà bộ giải nhận dạng trực tiếp.

**Điểm dễ nhầm.** Khi khử $Ax=b$, chỉ viết $x=Fz+x_0$ là chưa đủ; cần $Ax_0=b$ và các cột của $F$ sinh đúng $\ker A$. Biến dư phải đi kèm lượng từ tồn tại và điều kiện $s\ge0$. Dạng trên-đồ-thị không cho phép bỏ các ràng buộc gốc.

**Câu hỏi kiểm tra.** Hãy đưa $\min_x |x-3|$ về một quy hoạch tuyến tính bằng một biến $t$, rồi xác định nghiệm.

## B. Tối ưu tựa lồi và chia đôi theo giá trị mục tiêu

### 3. Hàm tựa lồi qua tập mức dưới

**Mục tiêu đọc hiểu.** Người đọc nhận dạng được tính tựa lồi mà không nhầm với tính lồi, và chuyển một bất đẳng thức mức thành một bài toán khả thi lồi.

**Định nghĩa và giả thiết.** Nhắc lại từ Bài 01: cho $D$ lồi, hàm $f:D\to\mathbb R$ là tựa lồi nếu tập mức dưới

$$
S_t=\{x\in D:f(x)\le t\}
$$

lồi với mọi $t\in\mathbb R$.

Một mô tả tương đương hữu ích là

$$
f(\theta x+(1-\theta)y)
\le
\max\{f(x),f(y)\}
$$

với mọi $x,y\in D$ và $\theta\in[0,1]$.

![Các tập mức dưới lồng nhau của một hàm tựa lồi và các bước chia đôi thu hẹp khoảng chứa giá trị tối ưu.](img/lec-02/quasiconvex-level-bisection.svg)

**Trực quan.** Tính lồi khống chế cả độ cao của dây cung. Tính tựa lồi chỉ yêu cầu điểm trên đoạn nối không cao hơn đầu mút cao hơn. Vì vậy các “vùng đạt mức $t$” vẫn lồi dù đồ thị không có độ cong lồi ở mọi nơi.

::: example
**Ví dụ tựa lồi nhưng không lồi.** Hàm $f(x)=x^3$ trên $[-1,1]$ tăng nghiêm, nên

$$
S_t=
\begin{cases}
\varnothing,&t<-1,\\
[-1,\sqrt[3]{t}],&-1\le t<1,\\
[-1,1],&t\ge1.
\end{cases}
$$

Mọi $S_t$ đều là một khoảng hoặc tập rỗng, nên $f$ tựa lồi. Tuy nhiên $f''(x)=6x$ đổi dấu, nên $f$ không lồi trên $[-1,1]$.
:::

**Ý nghĩa và ứng dụng trong AI.** Một tiêu chí tỷ lệ như lỗi trên chi phí, công suất trên thông lượng hoặc mức rủi ro chuẩn hóa có thể không lồi theo biểu thức gốc nhưng vẫn có các bài toán kiểm tra mức lồi. Khi đó ta tìm giá trị tối ưu bằng một chuỗi quyết định khả thi, thay vì tối thiểu hóa trực tiếp biểu thức tỷ lệ.

**Điểm dễ nhầm.** Mọi hàm lồi đều tựa lồi, nhưng chiều ngược lại sai. Tính lồi của một vài tập mức không đủ; lượng từ là mọi $t\in\mathbb R$. Tập rỗng cũng là tập lồi.

**Câu hỏi kiểm tra.** Vì sao mọi hàm đơn điệu trên một khoảng đồng thời tựa lồi và tựa lõm? Hàm $x^3$ cho thấy chiều ngược nào của quan hệ “lồi và tựa lồi” là sai?

### Định lý: hai đặc trưng tương đương của tính tựa lồi

**Giả thiết.** $D$ lồi và $f:D\to\mathbb R$.

**Kết luận.** Hai mệnh đề sau tương đương:

1. $S_t=\{x\in D:f(x)\le t\}$ lồi với mọi $t\in\mathbb R$.
2. Với mọi $x,y\in D$ và $\theta\in[0,1]$,

   $$
   f(\theta x+(1-\theta)y)
   \le
   \max\{f(x),f(y)\}.
   $$

::: proof
Giả sử mọi $S_t$ lồi. Chọn $x,y\in D$ và đặt $t=\max\{f(x),f(y)\}$. Khi đó $x,y\in S_t$. Do $S_t$ lồi,

$$
\theta x+(1-\theta)y\in S_t,
$$

nên giá trị của $f$ tại điểm này không vượt quá $t$.

Ngược lại, giả sử bất đẳng thức cực đại đúng. Chọn một mức $t$ và hai điểm $x,y\in S_t$. Khi đó

$$
f(\theta x+(1-\theta)y)
\le
\max\{f(x),f(y)\}
\le t.
$$

Vậy mọi tổ hợp lồi của $x,y$ vẫn thuộc $S_t$, nên $S_t$ lồi.
:::

### 4. Chia đôi trên giá trị mục tiêu

**Mục tiêu đọc hiểu.** Người đọc thiết lập được cận đầu, phép thử khả thi, quy tắc cập nhật và điều kiện dừng của phương pháp chia đôi.

**Trực quan.** Khung bên phải của hình ở mục 3 tách rõ không gian giá trị khỏi không gian biến: mỗi lần hỏi một mức $t$ có khả thi hay không, khoảng chứa $p^*$ được giữ lại đúng một nửa.

![Đồ thị của mục tiêu tựa lồi cùng ba mức thử và ba lần thu hẹp khoảng chứa giá trị tối ưu.](img/lec-02/quasiconvex-level-bisection.svg)

**Định nghĩa và giả thiết.** Giả sử $f$ tựa lồi và với mỗi $t$ ta có một biểu diễn

$$
f(x)\le t
\quad\Longleftrightarrow\quad
\phi_t(x)\le0,
$$

trong đó $\phi_t$ lồi theo $x$ khi cố định $t$. Bắt đầu với

$$
l_0\le p^*\le u_0
$$

và dung sai $\varepsilon>0$. Ở mỗi vòng, đặt $t=(l+u)/2$ rồi kiểm tra tập

$$
S_t=\{x\in D:\phi_t(x)\le0\}.
$$

- Nếu $S_t\ne\varnothing$, đặt $u\leftarrow t$.
- Nếu $S_t=\varnothing$, đặt $l\leftarrow t$.
- Dừng khi $u-l\le\varepsilon$.

::: example
**Ví dụ tính được.** Xét

$$
f(x)=\frac{x^2+1}{x+2},
\qquad x\in[0,2].
$$

Mẫu số dương trên miền. Với $t\ge0$,

$$
f(x)\le t
\quad\Longleftrightarrow\quad
\phi_t(x)=x^2+1-t(x+2)\le0.
$$

Hàm $\phi_t$ là bậc hai lồi theo $x$. Với cận đầu $[l,u]=[0,1]$:

| Vòng | $t$ | Kết quả phép thử | Khoảng mới |
|---:|---:|---|---|
| 1 | $0{,}5$ | $S_t=[0,0{,}5]\ne\varnothing$ | $[0,0{,}5]$ |
| 2 | $0{,}25$ | $S_t=\varnothing$ | $[0{,}25,0{,}5]$ |
| 3 | $0{,}375$ | $S_t=\varnothing$ | $[0{,}375,0{,}5]$ |

Đối chiếu bằng đạo hàm:

$$
x^*=\sqrt5-2,
\qquad
p^*=2\sqrt5-4\approx0{,}4721.
$$
:::

**Ý nghĩa và ứng dụng trong AI.** Chia đôi tách một quyết định khó về giá trị mục tiêu thành nhiều bài toán khả thi lồi. Cấu trúc này xuất hiện khi chọn ngưỡng chất lượng nhỏ nhất, giới hạn tỷ lệ lỗi–chi phí hoặc tìm mức tài nguyên vừa đủ để đạt một yêu cầu dự đoán.

**Điểm dễ nhầm.** Tính tựa lồi không tự cung cấp một bộ kiểm tra tính khả thi; phải chỉ ra $\phi_t$ và chứng minh nó lồi theo $x$. Cần biết một khoảng ban đầu chứa $p^*$. Nếu $S_t=\varnothing$, chỉ suy ra $t\le p^*$; dấu bằng có thể xảy ra khi infimum không đạt được.

**Câu hỏi kiểm tra.** Nếu $u_0-l_0=8$ và cần độ rộng không quá $1/32$, cần ít nhất bao nhiêu vòng chia đôi?

### Mệnh đề: bất biến của khoảng chia đôi

**Giả thiết.** Trước một vòng lặp, $l\le p^*\le u$ và $t=(l+u)/2$.

**Kết luận.** Sau quy tắc cập nhật ở trên, khoảng mới vẫn chứa $p^*$ và có độ rộng bằng một nửa khoảng cũ.

::: proof
Nếu $S_t\ne\varnothing$, tồn tại $x$ sao cho $f(x)\le t$, nên

$$
p^*=\inf_{z\in D}f(z)\le t.
$$

Do đó cập nhật $u\leftarrow t$ vẫn giữ $l\le p^*\le u$.

Nếu $S_t=\varnothing$, mọi $x\in D$ đều thỏa $f(x)>t$, nên $p^*\ge t$. Cập nhật $l\leftarrow t$ vẫn giữ bất biến.

Trong cả hai trường hợp, một đầu mút được thay bằng trung điểm, nên

$$
u_{\mathrm{mới}}-l_{\mathrm{mới}}
=\frac{u-l}{2}.
$$

Sau $k$ vòng, độ rộng không quá $(u_0-l_0)/2^k$. Đây là bảo đảm về khoảng chứa giá trị tối ưu; nó chưa phải bảo đảm về khoảng cách từ một điểm lặp tới nghiệm $x^*$.
:::

## C. Nhận dạng LP, QP và QCQP

### 5. Quy hoạch tuyến tính

**Mục tiêu đọc hiểu.** Người đọc nhận dạng được một quy hoạch tuyến tính từ kiểu của mục tiêu và ràng buộc, không dựa vào tên của ứng dụng.

**Định nghĩa và giả thiết.** Quy hoạch tuyến tính (LP) có dạng

$$
\begin{aligned}
\operatorname*{minimize}_{x\in\mathbb R^n}\quad&c^Tx\\
\text{với}\quad&Ax\le b,\\
&Gx=h,
\end{aligned}
$$

với $c\in\mathbb R^n$, $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$, $G\in\mathbb R^{p\times n}$ và $h\in\mathbb R^p$. Hằng số trong mục tiêu không làm thay đổi nghiệm và thường được bỏ.

![So sánh hình học: đường mức song song trên đa diện của LP, các elip mức của QP và miền tạo bởi các bất đẳng thức bậc hai của QCQP.](img/lec-02/lp-qp-qcqp-geometry.svg)

**Trực quan.** Tập khả thi là một đa diện. Các đường mức của mục tiêu là những siêu phẳng song song; giảm mục tiêu tương ứng với tịnh tiến siêu phẳng theo hướng $-c$.

::: example
**Ví dụ tính được.** Xét

$$
\min_{x_1,x_2}\ x_1+2x_2
\quad\text{với}\quad
x_1+x_2\ge3,\qquad x_1,x_2\ge0.
$$

Với mọi điểm khả thi,

$$
x_1+2x_2=(x_1+x_2)+x_2\ge3.
$$

Dấu bằng cần $x_1+x_2=3$ và $x_2=0$. Do đó

$$
x^*=(3,0),\qquad p^*=3.
$$
:::

**Ý nghĩa và ứng dụng trong AI.** LP mô tả phân bổ tài nguyên, phối trộn dữ liệu, giới hạn tuyến tính và các mất mát từng đoạn sau khi thêm biến phụ. Ở Bài 02, LP đóng vai trò mốc nhận dạng; hình học điểm cực và thuật toán giải được dành cho bài chuyên về quy hoạch tuyến tính.

**Điểm dễ nhầm.** Dấu $\ge$ không làm bài toán rời khỏi LP vì có thể nhân hai vế với $-1$. Không được khẳng định “nghiệm luôn ở một đỉnh” nếu chưa nêu điều kiện tồn tại nghiệm tối ưu và cấu trúc đa diện thích hợp. LP có thể vô nghiệm hoặc không bị chặn.

**Câu hỏi kiểm tra.** Hãy dùng dạng trên-đồ-thị để đưa $\min_x\max\{2x+1,-x+4\}$ về LP.

### 6. Quy hoạch bậc hai

**Mục tiêu đọc hiểu.** Người đọc dùng dấu PSD của ma trận bậc hai để chứng nhận một QP lồi và phân biệt tính lồi với tính duy nhất hoặc tồn tại nghiệm.

**Định nghĩa và giả thiết.** Quy hoạch bậc hai (QP) lồi có dạng

$$
\begin{aligned}
\operatorname*{minimize}_{x\in\mathbb R^n}\quad
&\frac12x^TPx+q^Tx+r\\
\text{với}\quad&Ax\le b,\\
&Gx=h,
\end{aligned}
$$

trong đó $P\in\mathbb S_+^n$, $q\in\mathbb R^n$, $r\in\mathbb R$, còn các ràng buộc là affine.

**Trực quan.** Khi $P\succ0$, các tập mức của mục tiêu là các elipxoit đồng tâm quanh nghiệm không ràng buộc. Khi $P\succeq0$ suy biến, một số hướng có thể phẳng; mục tiêu vẫn lồi nhưng có thể có nhiều nghiệm.

![Panel QP cho thấy các elip mức của mục tiêu chạm đoạn khả thi trên simplex tại điểm không nằm ở hai đầu mút.](img/lec-02/lp-qp-qcqp-geometry.svg)

::: example
**Ví dụ tính được.** Xét QP trên đơn hình một chiều:

$$
\min_{x_1,x_2}\ x_1^2+4x_2^2
\quad\text{với}\quad
x_1+x_2=1,\qquad x_1,x_2\ge0.
$$

Thế $x_2=1-x_1$ với $x_1\in[0,1]$:

$$
g(x_1)=5x_1^2-8x_1+4,
\qquad
g'(x_1)=10x_1-8.
$$

Suy ra

$$
x^*=(0{,}8,0{,}2),
\qquad
p^*=0{,}8.
$$

Ma trận Hessian của mục tiêu là $\operatorname{diag}(2,8)\succ0$, nên nghiệm trên tập khả thi lồi là duy nhất.
:::

**Ý nghĩa và ứng dụng trong AI.** Bình phương tối thiểu có ràng buộc là QP:

$$
\min_w\|Xw-y\|_2^2
\quad\text{với các ràng buộc affine trên }w.
$$

Ma trận $X^TX\succeq0$ mã hóa độ cong của mất mát. Thiếu hạng có thể tạo các hướng tham số không phân biệt được từ dữ liệu.

**Điểm dễ nhầm.** $P\succ0$ cho mục tiêu lồi chặt và do đó nhiều nhất một nghiệm tối ưu nếu nghiệm tồn tại; nó không tự bảo đảm tập khả thi khác rỗng hoặc nghiệm được đạt. Nếu biểu thức dùng ma trận không đối xứng, phần quyết định độ cong là $(P+P^T)/2$.

**Câu hỏi kiểm tra.** Với $P=\operatorname{diag}(2,0)$, mục tiêu QP có lồi không, có lồi chặt không, và hướng nào có độ cong bằng không?

### 7. Quy hoạch bậc hai với ràng buộc bậc hai

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được từng ma trận bậc hai trong mục tiêu và ràng buộc, thay vì chỉ kiểm tra mục tiêu.

**Định nghĩa và giả thiết.** Quy hoạch bậc hai với ràng buộc bậc hai (QCQP) lồi có dạng

$$
\begin{aligned}
\operatorname*{minimize}_{x\in\mathbb R^n}\quad
&\frac12x^TP_0x+q_0^Tx+r_0\\
\text{với}\quad
&\frac12x^TP_ix+q_i^Tx+r_i\le0,
\quad i=1,\ldots,m,\\
&Ax=b,
\end{aligned}
$$

với $P_i\in\mathbb S_+^n$ cho $i=0,1,\ldots,m$.

**Trực quan.** Mỗi bất đẳng thức bậc hai lồi giữ lại một tập mức lồi. Tùy ma trận và thành phần tuyến tính, tập này có thể là một elipxoit, một miền lồi không bị chặn, một tập một điểm hoặc tập rỗng. Tập khả thi là giao của các miền đó với một tập affine.

![Hai panel dưới so sánh đĩa lồi của một QCQP với tập không lồi sinh bởi một ma trận bậc hai bất định.](img/lec-02/lp-qp-qcqp-geometry.svg)

::: example
**Ví dụ tính được.** Xét

$$
\min_{x_1,x_2}-x_1-x_2
\quad\text{với}\quad
x_1^2+x_2^2\le1.
$$

Mục tiêu affine và ràng buộc có Hessian $2I\succ0$, nên đây là QCQP lồi. Theo bất đẳng thức Cauchy–Schwarz,

$$
x_1+x_2
\le
\sqrt{1^2+1^2}\sqrt{x_1^2+x_2^2}
\le\sqrt2.
$$

Dấu bằng xảy ra tại

$$
x^*=\left(\frac1{\sqrt2},\frac1{\sqrt2}\right),
\qquad
p^*=-\sqrt2.
$$
:::

**Ý nghĩa và ứng dụng trong AI.** Hồi quy với giới hạn chuẩn tham số là một QCQP lồi:

$$
\min_{w\in\mathbb R^d}\|Xw-y\|_2^2
\quad\text{với}\quad
\|w\|_2^2\le\tau,\qquad \tau\ge0.
$$

Hessian của mục tiêu là $2X^TX\succeq0$ và Hessian của hàm ràng buộc là $2I\succ0$. Tham số $\tau$ giới hạn độ lớn của mô hình và biểu diễn một ngân sách hoặc mức điều chuẩn cứng.

**Điểm dễ nhầm.** Chỉ một ma trận $P_i$ bất định cũng làm mất chứng nhận QCQP lồi theo biểu diễn chuẩn, nhưng chưa chứng minh bài toán gốc không thể cải dạng thành bài toán lồi. Nếu $P_i\succ0$, tập mức dưới có thể là elipxoit khác rỗng, tập một điểm hoặc tập rỗng; không được mặc định luôn có một elipxoit không suy biến.

**Câu hỏi kiểm tra.** Tập

$$
\{(x_1,x_2):x_1^2-x_2^2\le1\}
$$

có phải tập lồi không? Hãy tìm hai điểm khả thi có trung điểm không khả thi.

### Định lý: điều kiện PSD chứng nhận QP và QCQP lồi

**Giả thiết.** Với mỗi $i=0,1,\ldots,m$, đặt

$$
q_i(x)=\frac12x^TP_ix+a_i^Tx+b_i,
\qquad
P_i\in\mathbb S_+^n.
$$

Các đẳng thức của bài toán là affine.

**Kết luận.** Mỗi $q_i$ lồi. Do đó bài toán cực tiểu hóa $q_0$ với các ràng buộc $q_i(x)\le0$ và đẳng thức affine là một bài toán lồi.

::: proof
Hessian của $q_i$ là

$$
\nabla^2q_i(x)=P_i\succeq0.
$$

Theo điều kiện bậc hai đã học ở Bài 01, $q_i$ lồi trên $\mathbb R^n$. Vì vậy mỗi tập mức dưới

$$
\{x:q_i(x)\le0\}
$$

lồi. Tập nghiệm của các đẳng thức affine cũng lồi. Giao của các tập này là tập khả thi lồi, còn $q_0$ là mục tiêu lồi. Đây là cấu trúc của một bài toán tối ưu lồi.

Nếu $P_0\succ0$, mục tiêu lồi chặt; khi tập khả thi lồi và nghiệm tồn tại, nghiệm là duy nhất. Không cần $P_i\succ0$ cho các ràng buộc: $P_i\succeq0$ đã đủ để tập mức dưới lồi.
:::

## Bảng kiểm nhận dạng

| Quyết định | Câu hỏi kiểm tra |
|---|---|
| Nhận dạng khuôn | Miền, mục tiêu, bất đẳng thức và đẳng thức có kiểu gì? |
| Cải dạng | Phép biến đổi bảo toàn tập khả thi, giá trị hay chỉ tạo ánh xạ nghiệm? |
| Tựa lồi | Mọi tập mức dưới có lồi và có biểu diễn khả thi lồi hay không? |
| Chia đôi | Cận đầu, mức thử, quy tắc cập nhật và dung sai đã đủ chưa? |
| LP | Mọi biểu thức phụ thuộc biến có affine không? |
| QP | Ma trận mục tiêu có đối xứng PSD không? |
| QCQP | Mọi ma trận trong mục tiêu và bất đẳng thức có PSD không? |

LP, QP và QCQP xử lý cấu trúc affine hoặc bậc hai. Phần tiếp theo xét các biểu thức tích và lũy thừa trên miền dương, nơi phép đổi biến log làm lộ một bài toán lồi tương đương.

## D. Quy hoạch hình học và phép đổi biến log

### 8. Đơn thức, đa thức dương và dạng chuẩn của quy hoạch hình học

**Mục tiêu đọc hiểu.** Người đọc nhận dạng được đơn thức, đa thức dương và một quy hoạch hình học; đồng thời giải thích được vì sao miền dương là một phần của định nghĩa chứ không phải một điều kiện kỹ thuật phụ.

**Định nghĩa và giả thiết.** Trên miền $\mathbb R_{++}^n$, một **đơn thức** có dạng

$$
g(x)=c\prod_{j=1}^n x_j^{a_j},
\qquad c>0,
\qquad a_j\in\mathbb R.
$$

Số mũ có thể âm hoặc không nguyên. Một **đa thức dương** là tổng hữu hạn của các đơn thức:

$$
f(x)=\sum_{k=1}^K c_k\prod_{j=1}^n x_j^{a_{kj}},
\qquad c_k>0.
$$

Quy hoạch hình học (GP) ở dạng chuẩn là

$$
\begin{aligned}
\operatorname*{minimize}_{x\in\mathbb R_{++}^n}\quad &f_0(x)\\
\text{với}\quad &f_i(x)\le1,\quad i=1,\ldots,m,\\
&g_j(x)=1,\quad j=1,\ldots,p,
\end{aligned}
$$

trong đó $f_i$ là các đa thức dương và $g_j$ là các đơn thức.

**Trực quan.** GP mô tả tự nhiên các quan hệ nhân, tỷ lệ và lũy thừa. Những quan hệ này thường không lồi theo biến $x$, nhưng log biến tích thành tổng và biến một đơn thức thành hàm affine.

![Miền dương dưới ràng buộc ngân sách, các đường mức của tích và ánh xạ log sang một bài toán lồi.](img/lec-02/gp-log-transform.svg)

::: example
**Ví dụ tính được: tích lớn nhất dưới ngân sách.** Xét

$$
\max_{x,y>0}xy
\quad\text{với}\quad x+y\le4.
$$

Đưa về dạng GP bằng cách cực tiểu hóa nghịch đảo:

$$
\min_{x,y>0}(xy)^{-1}
\quad\text{với}\quad \frac{x+y}{4}\le1.
$$

Mục tiêu là một đơn thức; vế trái của bất đẳng thức là một đa thức dương. Bất đẳng thức trung bình cộng–trung bình nhân cho

$$
\sqrt{xy}\le\frac{x+y}{2}\le2,
$$

nên $xy\le4$. Dấu bằng xảy ra khi $x=y=2$. Giá trị mục tiêu gốc là $4$ và giá trị mục tiêu GP là $1/4$.
:::

**Ý nghĩa và ứng dụng trong AI.** GP phù hợp với đồng thiết kế mô hình–phần cứng khi độ trễ, năng lượng, bộ nhớ hoặc thông lượng được xấp xỉ bằng các luật lũy thừa của kích thước mô hình và tài nguyên. Nó cũng mô tả các bài toán phân bổ dương, nơi biến bằng không không có ý nghĩa vật lý.

**Điểm dễ nhầm.** Đa thức dương không phải đa thức thông thường: hệ số phải dương nhưng số mũ có thể là số thực. Đẳng thức trong GP chuẩn phải là đơn thức bằng $1$; đẳng thức đa thức dương nói chung không hợp lệ. Không được bỏ điều kiện $x_j>0$.

**Câu hỏi kiểm tra.** Biểu thức $2x^{-1/2}y^3$ có phải đơn thức không? Biểu thức $x-y+2$ có phải đa thức dương không? Nêu lý do từ hệ số và miền.

### 9. Phép đổi biến log và ca thiết kế dầm công-xôn

**Mục tiêu đọc hiểu.** Người đọc thực hiện được phép đổi biến $y_i=\log x_i$, chứng minh dạng mới lồi và khôi phục nghiệm trong biến gốc.

**Định nghĩa và giả thiết.** Vì $x_i>0$, phép đổi

$$
y_i=\log x_i,
\qquad
x_i=e^{y_i}
$$

là song ánh giữa $\mathbb R_{++}^n$ và $\mathbb R^n$. Với đơn thức $g$,

$$
\log g(e^y)=\log c+a^Ty,
$$

là affine. Với đa thức dương $f$, ta có

$$
\log f(e^y)
=
\log\left(\sum_{k=1}^K
\exp(a_k^Ty+\log c_k)\right),
$$

là hàm log-tổng-mũ lồi.

**Trực quan.** Trong hình ở mục 8, đường mức hyperbol trong miền biến dương được ánh xạ thành đường mức thẳng trong không gian log; điểm tiếp xúc $(2,2)$ trở thành $(\log2,\log2)$. Đây là đổi tọa độ song ánh, không phải phép chiếu làm mất thông tin.

::: derivation
**Đổi log cho ví dụ ngân sách.** Đặt $y_1=\log x$, $y_2=\log y$. Bài toán ở mục trước trở thành

$$
\begin{aligned}
\operatorname*{minimize}_{y_1,y_2}\quad&-y_1-y_2\\
\text{với}\quad&\log(e^{y_1}+e^{y_2})\le\log4.
\end{aligned}
$$

Mục tiêu affine và ràng buộc lồi. Nghiệm $(x,y)=(2,2)$ được ánh xạ thành $(y_1,y_2)=(\log2,\log2)$.
:::

**Ví dụ ứng dụng.** Chia một dầm công-xôn thành bốn đoạn có chiều cao $h_i>0$. Một mô hình chuẩn hóa là

$$
\min_{h_i>0}\sum_{i=1}^4h_i
\quad\text{với}\quad
\sum_{i=1}^4d_i h_i^{-3}\le1,
\qquad
d=(0{,}1;0{,}2;0{,}3;0{,}4)^T.
$$

![Dầm công-xôn bốn đoạn với chiều cao dương là các biến thiết kế và lực đặt ở đầu tự do.](img/lec-02/cantilever-gp.svg)

Sau $y_i=\log h_i$, dạng lồi là

$$
\begin{aligned}
\operatorname*{minimize}_{y\in\mathbb R^4}\quad
&\log\left(\sum_{i=1}^4e^{y_i}\right)\\
\text{với}\quad
&\log\left(\sum_{i=1}^4d_i e^{-3y_i}\right)\le0.
\end{aligned}
$$

**Ý nghĩa và ứng dụng trong AI.** Cùng cơ chế được dùng khi các biến dương là độ rộng lớp, mức nén, công suất, tần số hoặc ngân sách tính toán. Phép đổi tọa độ đưa biểu thức gốc về một bài toán lồi tương đương.

Các hệ số $d_i$ trong ví dụ dầm là số liệu chuẩn hóa để minh họa cấu trúc GP, không phải dữ liệu đo thực nghiệm.

**Điểm dễ nhầm.** Không lấy log tại $0$. Không được phân phối log qua phép cộng: $\log(u+v)\ne\log u+\log v$. Phải đổi cả mục tiêu, ràng buộc và miền; tính lồi của bài toán sau đổi biến không có nghĩa mọi biểu thức gốc lồi theo $x$.

**Câu hỏi kiểm tra.** Hãy đổi $3x_1^2x_2^{-1}=1$ sang biến $y_i=\log x_i$. Kết quả là đẳng thức affine nào?

### Định lý: phép đổi log biến GP thành bài toán lồi tương đương

**Giả thiết.** Bài toán GP có miền $x\in\mathbb R_{++}^n$, mục tiêu và các bất đẳng thức là đa thức dương, còn các đẳng thức là đơn thức.

**Kết luận.** Sau $y=\log x$, lấy log mục tiêu và các vế dương, ta thu được một bài toán lồi. Ánh xạ $x=e^y$ là song ánh giữa hai tập khả thi. Nếu tối ưu đạt được, hai bài toán có các nghiệm tối ưu tương ứng; nếu $0<p^*<\infty$, giá trị tối ưu mới là $\widetilde p^*=\log p^*$.

::: proof
Mỗi đơn thức $c_k\prod_jx_j^{a_{kj}}$ trở thành

$$
c_k\exp(a_k^Ty).
$$

Log của một đơn thức là $a_k^Ty+\log c_k$, nên đẳng thức đơn thức bằng $1$ trở thành đẳng thức affine bằng $0$.

Với một đa thức dương $f$, log của $f(e^y)$ là log-tổng-mũ của các hàm affine, do đó lồi. Vì log tăng nghiêm trên $\mathbb R_{++}$,

$$
f_i(x)\le1
\quad\Longleftrightarrow\quad
\log f_i(e^y)\le0.
$$

Tương tự, cực tiểu hóa $f_0(x)>0$ và cực tiểu hóa $\log f_0(e^y)$ có cùng thứ tự giá trị. Cuối cùng, exp và log là hai ánh xạ ngược nhau, nên mỗi điểm khả thi và mỗi nghiệm trong một biểu diễn tương ứng duy nhất với một điểm trong biểu diễn kia.
:::

## E. Tối ưu nón và quy hoạch nửa xác định

### 10. Thứ tự theo nón và khuôn tối ưu nón

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được một bất đẳng thức tổng quát bằng phép thử thuộc nón và giữ đúng không gian của biến, ánh xạ và nón.

**Nhắc lại và giả thiết.** Cho $E$ là không gian véc-tơ hữu hạn chiều và $K\subseteq E$ là một nón chính quy (proper cone): lồi, đóng, nhọn và có phần trong khác rỗng. Thứ tự do $K$ sinh được định nghĩa bởi

$$
u\preceq_Kv
\quad\Longleftrightarrow\quad
v-u\in K.
$$

Một khuôn tối ưu nón với mục tiêu vô hướng có thể viết

$$
\begin{aligned}
\operatorname*{minimize}_{x\in\mathbb R^n}\quad&c^Tx\\
\text{với}\quad&Gx\preceq_Kh,\\
&Ax=b,
\end{aligned}
$$

trong đó $G:\mathbb R^n\to E$ tuyến tính và $h\in E$.

**Trực quan.** Dấu nhỏ hơn vô hướng được thay bởi một phép thử hình học: hiệu $h-Gx$ phải nằm trong nón $K$. Với $K=\mathbb R_+^m$, ta thu lại bất đẳng thức theo từng tọa độ. Với $K=\mathbb S_+^r$, ta thu được thứ tự nửa xác định dương.

![Thứ tự theo nón trên véc-tơ và ma trận được kiểm tra bằng hiệu; hình cũng chỉ ra các cặp không so sánh được.](img/lec-02/cone-induced-orders.svg)

::: example
**Ví dụ véc-tơ và ma trận.** Với $u=(1,1)$, $v=(3,2)$,

$$
v-u=(2,1)\in\mathbb R_+^2,
$$

nên $u\preceq v$. Véc-tơ $w=(1/2,3)$ không so sánh được với $u$ vì một tọa độ tốt hơn và một tọa độ kém hơn.

Với $X=\operatorname{diag}(1,2)$ và $Y=\operatorname{diag}(3,3)$,

$$
Y-X=\operatorname{diag}(2,1)\succeq0,
$$

nên $X\preceq_{\mathbb S_+^2}Y$.
:::

**Ý nghĩa và ứng dụng trong AI.** Tối ưu nón tạo một ngôn ngữ chung cho bất đẳng thức tọa độ, giới hạn chuẩn, ma trận hiệp phương sai và ma trận hạt nhân (kernel). Nó giúp mô hình hóa ràng buộc về độ bất định hoặc năng lượng theo mọi hướng.

**Điểm dễ nhầm.** Thứ tự theo nón là thứ tự bộ phận: có các cặp không so sánh được. Thứ tự PSD không phải so sánh từng phần tử. Không được đặt $Gx$ trong một không gian nhưng chọn $K$ ở không gian khác.

**Câu hỏi kiểm tra.** Với $X=\operatorname{diag}(1,2)$ và $Z=\operatorname{diag}(4,1)$, hãy kiểm tra $X\preceq Z$ và $Z\preceq X$ bằng trị riêng của hiệu.

### Định lý: nghịch ảnh affine của một nón lồi là lồi

**Giả thiết.** $K\subseteq E$ là nón lồi; $G:\mathbb R^n\to E$ tuyến tính; $h\in E$.

**Kết luận.** Tập $C=\{x:h-Gx\in K\}$ là lồi.

::: proof
Lấy $x,y\in C$ và $\theta\in[0,1]$. Khi đó $h-Gx\in K$ và $h-Gy\in K$. Vì $G$ tuyến tính,

$$
h-G(\theta x+(1-\theta)y)
=
\theta(h-Gx)+(1-\theta)(h-Gy).
$$

Vế phải thuộc $K$ do $K$ lồi. Vậy $\theta x+(1-\theta)y\in C$, nên $C$ lồi. Kết luận này chỉ cần tính lồi của $K$; các điều kiện proper còn lại cần để quan hệ sinh ra có các tính chất thứ tự mong muốn.
:::

### 11. Quy hoạch nửa xác định và bất đẳng thức ma trận tuyến tính

**Mục tiêu đọc hiểu.** Người đọc nhận dạng được một bất đẳng thức ma trận tuyến tính, giải thích được ý nghĩa trị riêng và phân biệt điều kiện PSD với điều kiện theo từng phần tử.

**Định nghĩa và giả thiết.** Cho $F_0,\ldots,F_n\in\mathbb S^r$. Ánh xạ ma trận affine

$$
F(x)=F_0+\sum_{i=1}^n x_iF_i
$$

tạo một bất đẳng thức ma trận tuyến tính (LMI) khi ta yêu cầu $F(x)\succeq0$ hoặc $F(x)\preceq0$. Quy hoạch nửa xác định (SDP) có mục tiêu affine, các LMI và, nếu có, các đẳng thức affine.

**Trực quan.** Điều kiện $F(x)\succeq0$ đồng thời yêu cầu

$$
z^TF(x)z\ge0
$$

với mọi hướng $z$. Vì vậy một LMI có thể gom nhiều bất đẳng thức vô hướng, đặc biệt là các chặn trị riêng.

![Hai trị riêng được chặn bởi cùng biến t và ánh xạ affine ma trận đi vào nón PSD; bên phải là một mẫu LMI khối hai nhân hai.](img/lec-02/sdp-eigenvalue-lmi.svg)

::: example
**Ví dụ tính được: cân bằng hai trị riêng.** Xét

$$
\min_{x,t\in\mathbb R}t
\quad\text{với}\quad
\operatorname{diag}(x,2-x)\preceq tI.
$$

Vì ma trận là đường chéo, LMI tương đương với

$$
t\ge x,
\qquad
t\ge2-x.
$$

Do đó $t\ge\max\{x,2-x\}$. Hai cận cân bằng tại $x=1$, nên

$$
x^*=1,
\qquad
t^*=1.
$$
:::

**Mẫu nhận dạng LMI khối.** Với

$$
M(t,a)=
\begin{bmatrix}
t&a\\
a&t
\end{bmatrix},
$$

hai trị riêng là $t+a$ và $t-a$. Vì vậy $M(t,a)\succeq0$ khi và chỉ khi $t\ge|a|$. Đây là một ví dụ nhỏ cho thấy LMI có thể biểu diễn một ràng buộc chuẩn.

**Ý nghĩa và ứng dụng trong AI.** SDP xuất hiện trong học ma trận hạt nhân, hoàn thiện ma trận hiệp phương sai, chặn chuẩn phổ và các thư giãn lồi của bài toán rời rạc. Ma trận PSD bảo đảm các dạng toàn phương như phương sai hoặc năng lượng không âm theo mọi hướng.

**Điểm dễ nhầm.** Mọi $F_i$ phải đối xứng cùng cấp. $F(x)\succeq0$ không có nghĩa từng phần tử không âm. Các phép biến đổi bằng bổ đề Schur cần giả thiết xác định dương của khối được nghịch đảo. Mẫu $2\times2$ trên được kiểm tra trực tiếp bằng trị riêng; chưa cần bổ đề Schur tổng quát.

**Câu hỏi kiểm tra.** Giải $\min_t t$ với $\operatorname{diag}(3-x,x)\preceq tI$. Điểm nào cân bằng hai trị riêng?

## F. Tối ưu nhiều mục tiêu và biên Pareto

### 12. Điểm Pareto và vô hướng hóa bằng trọng số

**Mục tiêu đọc hiểu.** Người đọc phân biệt được phần tử nhỏ nhất với phần tử tối tiểu, xác định được điểm bị trội và giải thích được cả khả năng lẫn giới hạn của tổng trọng số.

**Nhắc lại và giả thiết.** Cho tập khả thi $C$ và ánh xạ mục tiêu

$$
\Phi:C\to\mathbb R^k.
$$

Trong bài toán cực tiểu nhiều mục tiêu, $x\in C$ **trội** $y\in C$ nếu

$$
\Phi_i(x)\le\Phi_i(y)
$$

với mọi $i$, và có ít nhất một bất đẳng thức nghiêm. Điểm $x^*$ là Pareto nếu không có điểm khả thi nào trội nó. Một phần tử nhỏ nhất phải không lớn hơn mọi điểm khác; một phần tử tối tiểu chỉ cần không bị điểm nào trội.

**Trực quan.** Ánh xạ $\Phi$ chuyển tập khả thi sang không gian mục tiêu. Với bài toán cực tiểu hai mục tiêu, vùng bị một điểm trội nằm về phía đông-bắc của điểm đó. Biên Pareto gồm các đánh đổi mà muốn cải thiện một tọa độ phải làm xấu ít nhất một tọa độ khác.

![Đoạn tham số được ánh xạ thành biên Pareto; các đường mức trọng số chọn tiếp điểm và một ví dụ rời rạc chỉ ra điểm bị trội.](img/lec-02/pareto-front-weighted-scalarization.svg)

::: example
**Ví dụ tính được.** Cho $x\in[0,2]$ và

$$
\Phi(x)=\bigl(x^2,(x-2)^2\bigr).
$$

Khi $x$ tăng, mục tiêu thứ nhất tăng còn mục tiêu thứ hai giảm, nên mọi $x\in[0,2]$ đều là điểm Pareto. Vô hướng hóa với $\lambda\in[0,1]$ cho

$$
\min_{0\le x\le2}
\lambda x^2+(1-\lambda)(x-2)^2.
$$

Đạo hàm bằng $2x-4(1-\lambda)$, nên

$$
x^*(\lambda)=2(1-\lambda).
$$

Chẳng hạn, $\lambda=3/4,1/2,1/4$ lần lượt cho $x^*=1/2,1,3/2$.
:::

**Ý nghĩa và ứng dụng trong AI.** Các mục tiêu có thể là sai số dự đoán, độ trễ, năng lượng, kích thước mô hình hoặc một thước đo công bằng. Pareto loại các phương án kém hơn đồng thời ở mọi tiêu chí; trọng số biểu diễn ưu tiên triển khai, nhưng không tự quyết định cách chuẩn hóa các đơn vị khác nhau.

**Điểm dễ nhầm.** “Không bị trội” không có nghĩa tốt nhất ở từng mục tiêu riêng lẻ. Trọng số bằng $0$ có thể trả về nghiệm chỉ tối tiểu yếu. Khi tập mục tiêu không lồi, tổng trọng số có thể bỏ sót các điểm Pareto không được hỗ trợ. Vô hướng hóa ở đây không phải đối ngẫu Lagrange của Bài 03.

**Câu hỏi kiểm tra.** Trong bốn điểm $(1,4)$, $(2,2)$, $(4,1)$ và $(3,3)$, điểm nào bị trội? Ba điểm còn lại có trội lẫn nhau không?

### Định lý: trọng số dương sinh nghiệm Pareto

**Giả thiết.** $C$ khác rỗng, $\Phi:C\to\mathbb R^k$ và $\lambda_i>0$ với mọi $i$. Điểm $x^*$ giải

$$
\min_{x\in C}\sum_{i=1}^k\lambda_i\Phi_i(x).
$$

**Kết luận.** $x^*$ là một điểm Pareto.

::: proof
Giả sử ngược lại rằng có $y\in C$ trội $x^*$. Khi đó

$$
\Phi_i(y)\le\Phi_i(x^*)
$$

với mọi $i$, và bất đẳng thức nghiêm với ít nhất một chỉ số. Vì mọi $\lambda_i>0$, nhân rồi cộng cho

$$
\sum_{i=1}^k\lambda_i\Phi_i(y)
<
\sum_{i=1}^k\lambda_i\Phi_i(x^*),
$$

mâu thuẫn với tính tối ưu của $x^*$. Do đó không có điểm nào trội $x^*$.
:::

**Giới hạn của định lý.** Đây là chiều từ nghiệm vô hướng hóa sang Pareto. Chiều đảo cần điều kiện lồi và khái niệm điểm được hỗ trợ; với tập mục tiêu không lồi, có thể có điểm Pareto không là nghiệm của bất kỳ tổng trọng số tuyến tính nào.

## Bản đồ quyết định và ca tổng hợp AI

| Dấu hiệu cấu trúc | Lớp hoặc cải dạng cần kiểm tra | Giả thiết quyết định |
|---|---|---|
| Mục tiêu và ràng buộc affine | LP | Kiểu và kích thước nhất quán |
| Mục tiêu bậc hai, ràng buộc affine | QP | Ma trận mục tiêu PSD |
| Mục tiêu và bất đẳng thức bậc hai | QCQP | Mọi ma trận bậc hai PSD |
| Tích và lũy thừa của biến dương | GP rồi đổi log | Miền dương; đúng đơn thức/đa thức dương |
| Ánh xạ affine nhận giá trị ma trận | SDP/LMI | Ma trận đối xứng; phép thử PSD |
| Nhiều mục tiêu cạnh tranh | Pareto và vô hướng hóa | Thứ tự, trọng số và hình học tập mục tiêu |

::: example
**Ca AI tích hợp: hồi quy với ngân sách tham số.** Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$, $w\in\mathbb R^d$ và $\tau\ge0$:

$$
\min_w\|Xw-y\|_2^2
\quad\text{với}\quad
\|w\|_2^2\le\tau.
$$

Đây là QCQP lồi vì Hessian của mục tiêu là $2X^TX\succeq0$ và Hessian của ràng buộc là $2I\succ0$. Tham số $\tau$ kiểm soát độ lớn của mô hình, như ngân sách $\tau$ đã xét ở mục 7. Nếu đồng thời muốn giảm sai số và giảm độ lớn tham số mà chưa chốt $\tau$, ta có thể xét bài toán hai mục tiêu

$$
\Phi(w)=\bigl(\|Xw-y\|_2^2,\|w\|_2^2\bigr)
$$

và khảo sát biên Pareto hoặc vô hướng hóa bằng trọng số. Bài 03 sẽ cung cấp ngôn ngữ đối ngẫu để giải thích giá trị của việc nới ràng buộc $\tau$.
:::

## Tài liệu đối chiếu

- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Chương 4: Mục 4.1–4.7.
- Nguyễn Bích Vân, *Chương 3: Các bài toán tối ưu lồi*, phần 2, trang PDF 2–16; năm chưa xác minh. Các giả thiết về ma trận PSD được đối chiếu theo Boyd và Vandenberghe.
- Đề cương học phần UET.AI2012, Buổi 2, LLO3 và CLO1.
