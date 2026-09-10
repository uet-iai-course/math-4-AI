# Ghi chú Bài 02 — Các bài toán tối ưu lồi

Học phần **Cơ sở toán học cho AI**. Chuẩn đầu ra bài học (LLO3): hiểu rõ và biết cách vận dụng các khái niệm cơ bản về tối ưu lồi, tối ưu tựa lồi, tối ưu tuyến tính, tối ưu bậc hai, quy hoạch nửa xác định và tối ưu hóa véc-tơ. Chuẩn đầu ra học phần (CLO1): hiểu và đánh giá các thuật toán tối ưu; vận dụng kiến thức của học phần để giải quyết bài toán thực tế. Bài này chuẩn bị năng lực đó qua đặc tả mô hình, nhận dạng lớp bài toán, chứng nhận tính lồi và cải dạng tương đương.

Ta có hai tín hiệu tải đã chuẩn hóa $z\in[0,1]^2$ và muốn dự đoán bằng mô hình tuyến tính $\widehat y=w^Tz$. Yêu cầu nghiệp vụ: dự đoán không âm, không giảm theo từng tín hiệu, và không vượt $2$ trên toàn hộp $[0,1]^2$. Với $w\ge0$, giá trị lớn nhất của $w^Tz$ trên hộp đạt tại $z=(1,1)$, bằng $w_1+w_2$, nên yêu cầu trần dẫn về ràng buộc $\mathbf 1^Tw\le2$. Dữ liệu huấn luyện minh họa là $X=I_2$, $y=(2,1)^T$; biến cần tìm là $w\in\mathbb R^2$. Hai điểm dữ liệu chỉ để học cách tính, không chứng minh chất lượng dự đoán ngoài mẫu.

Nội dung gồm ba ứng dụng chính: hồi quy có ràng buộc, thiết kế dầm và lựa chọn cấu hình đo. Các ứng dụng lần lượt xây dựng quy hoạch tuyến tính (LP), quy hoạch bậc hai (QP), quy hoạch bậc hai có ràng buộc bậc hai (QCQP), quy hoạch hình học (GP) và quy hoạch nửa xác định (SDP). Phần mở rộng trình bày các phép cải dạng, tối ưu nón, tối ưu tựa lồi và nhiều mục tiêu. Nguồn toán học chính là Boyd và Vandenberghe (2004), *Convex Optimization*, chương 4, §3.1.5, §3.4 và §A.5.5 ([bản chính thức](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf), [bản cục bộ](../sources/bv_cvxbook.pdf)). Mọi bộ số trong bài là minh họa.

## 1. Đặc tả mô hình hồi quy

### 1.1. Dữ liệu, biến và miền khả thi

Trước khi viết công thức, hãy tách bốn thứ thường bị trộn lẫn: dữ liệu ($X$, $y$, và trần $2$ là tham số yêu cầu), biến quyết định ($w$), miền biến ($D$), và các ràng buộc. Khuôn tổng quát là

$$
\operatorname*{minimize}_{x\in D}\ f_0(x)
\quad\text{với}\quad
f_i(x)\le0,\ i=1,\ldots,m;\qquad h_j(x)=0,\ j=1,\ldots,p.
$$

Tập khả thi và giá trị tối ưu:

$$
\mathcal F=\{x\in D:f_i(x)\le0,\ h_j(x)=0\},
\qquad
p^*=\inf_{x\in\mathcal F}f_0(x).
$$

Quy ước: $p^*=+\infty$ nếu $\mathcal F=\varnothing$; $p^*=-\infty$ nếu bài toán không bị chặn dưới. Nghiệm tối ưu $x^*$ là điểm trong $\mathcal F$ đạt $f_0(x^*)=p^*$; infimum hữu hạn không tự động được đạt, ví dụ $\inf_{x>0}x=0$ không có điểm nào đạt.

Áp vào hồi quy của ta: $x=w$, $D=\mathbb R^2$, $f_0(w)=\lVert Xw-y\rVert_2^2=(w_1-2)^2+(w_2-1)^2$, ba bất đẳng thức $-w_1\le0$, $-w_2\le0$, $w_1+w_2-2\le0$. Tập khả thi là tam giác

$$
C=\{w\ge0:\ w_1+w_2\le2\}
$$

với ba đỉnh $(0,0)$, $(2,0)$, $(0,2)$.

![Tam giác khả thi C với đỉnh (0,0), (2,0), (0,2); các đường mức tròn tâm (2,1) tiếp xúc tam giác tại (1.5, 0.5).](img/lec-02/regression-qp.svg)

### 1.2. Chứng nhận bài toán lồi

Bài toán ở **dạng lồi chuẩn** khi $D$ lồi, mọi hàm $f_0,f_1,\ldots,f_m$ lồi trên $D$, và mọi đẳng thức là affine. Với hồi quy, mục tiêu có Hessian

$$
\nabla^2 f_0=2X^TX,
\qquad
v^T(2X^TX)v=2\lVert Xv\rVert_2^2\ge0\ \text{với mọi }v,
$$

nên $2X^TX\succeq0$ (một ma trận đối xứng $P$ là nửa xác định dương, viết PSD, khi $v^TPv\ge0$ với mọi $v$). Ba ràng buộc đều affine. Vậy đây là một quy hoạch bậc hai (QP) lồi.

Định lý nền: **tập khả thi của dạng lồi chuẩn là tập lồi.**

::: proof
**Mục tiêu:** chứng minh với mọi $x,y\in\mathcal F$ và $\theta\in[0,1]$, điểm $z=\theta x+(1-\theta)y$ cũng thuộc $\mathcal F$.

**Ý tưởng:** tính lồi của các hàm bất đẳng thức bảo toàn dấu $\le0$; tính affine của đẳng thức bảo toàn $Ax=b$.

**Bước dùng giả thiết:** vì $D$ lồi nên $z\in D$. Với mỗi hàm lồi $f_i$, theo định nghĩa tính lồi,

$$
f_i(z)\le\theta f_i(x)+(1-\theta)f_i(y)\le0,
$$

vì hai vế trong ngoặc đều $\le0$. Với đẳng thức affine $Ax=b$,

$$
Az=\theta Ax+(1-\theta)Ay=\theta b+(1-\theta)b=b.
$$

Vậy $z\in\mathcal F$, tức $\mathcal F$ lồi. Giả thiết lồi của $f_i$ được dùng ở bất đẳng thức đầu; tính affine được dùng ở đẳng thức cuối.
:::

Lưu ý: tập khả thi lồi riêng nó chưa chứng nhận bài toán lồi; cần cả mục tiêu lồi. Ví dụ $\min_{-1\le x\le1}-x^2$ có miền lồi nhưng mục tiêu lõm, không phải bài toán lồi.

### 1.3. Khả thi, tồn tại, duy nhất

Bốn câu hỏi khác nhau, không được gộp: $\mathcal F\ne\varnothing$? $p^*$ hữu hạn? Có $x^*$ đạt $p^*$? Nghiệm có duy nhất không? Trong ví dụ của ta, $C$ khác rỗng và bị chặn, đóng và bị chặn (compact), mục tiêu liên tục nên nghiệm tồn tại; vì $X=I_2$ làm mục tiêu lồi chặt (còn gọi là lồi nghiêm ngặt) nên nghiệm duy nhất. Lồi chặt trên tập lồi chỉ cho **nhiều nhất một** nghiệm, không bảo đảm tồn tại: $\min_{x>0}x^2$ lồi chặt nhưng infimum $0$ không được đạt.

Hệ quả quan trọng của tính lồi: **mọi cực tiểu địa phương (tương đối trên $\mathcal F$) là tối ưu toàn cục.** Giả sử $\mathcal F$ lồi không rỗng, $f_0$ lồi trên $\mathcal F$, và $x^*$ là cực tiểu địa phương tương đối trên $\mathcal F$ nhưng tồn tại $y\in\mathcal F$ với $f_0(y)<f_0(x^*)$. Với $\theta\in(0,1)$, điểm $x_\theta=(1-\theta)x^*+\theta y$ thuộc $\mathcal F$ (tính lồi của $\mathcal F$) và tiến về $x^*$ khi $\theta\to0^+$. Theo tính lồi của $f_0$,

$$
f_0(x_\theta)\le(1-\theta)f_0(x^*)+\theta f_0(y)<f_0(x^*),
$$

mâu thuẫn với tính cực tiểu địa phương của $x^*$. Lập luận không cần giả thiết khả vi. Kết quả này phân biệt tính tối ưu với hai vấn đề khác: nghiệm có tồn tại hay không và có duy nhất hay không.

### 1.4. Giải QP hồi quy và chứng minh nghiệm

Nghiệm không ràng buộc là $y=(2,1)$, vi phạm $w_1+w_2\le2$ (tổng bằng $3$). Nghiệm có ràng buộc là $w^*=(1{,}5,\,0{,}5)$ với $p^*=0{,}5$. Đây không phải phỏng đoán "cắt bớt mỗi tọa độ"; cắt từng tọa độ không phải quy tắc chung khi ràng buộc liên kết các biến. Chứng minh bằng bất đẳng thức Cauchy:

::: proof
**Mục tiêu:** chứng minh $f_0(w)\ge\frac12$ trên $C$ và dấu bằng đạt tại $(1{,}5,0{,}5)$.

**Ý tưởng:** đặt $a=2-w_1$, $b=1-w_2$; ràng buộc tam giác cho $a+b\ge1$, rồi dùng $a^2+b^2\ge(a+b)^2/2$.

**Bước dùng giả thiết:** với $w\in C$ ta có $w_1+w_2\le2$, nên

$$
a+b=(2-w_1)+(1-w_2)=3-(w_1+w_2)\ge1.
$$

Theo bất đẳng thức Cauchy–Schwarz (hoặc $(a-b)^2\ge0$),

$$
f_0(w)=a^2+b^2\ge\frac{(a+b)^2}{2}\ge\frac12.
$$

Dấu bằng cần $a=b$ và $a+b=1$, tức $a=b=\frac12$, cho $w=(1{,}5,0{,}5)$. Điểm này thỏa $w\ge0$ và tổng $2$, nên khả thi và đạt cận. Vậy $w^*=(1{,}5,0{,}5)$, $p^*=0{,}5$.
:::

Nghiệm đọc ra thành mô hình dự đoán $\widehat y=1{,}5z_1+0{,}5z_2$.

**Câu hỏi:** vì sao ràng buộc $w_1+w_2\le2$ hoạt động còn $w_1\ge0$, $w_2\ge0$ không?

::: hint
Tại $w^*=(1{,}5,0{,}5)$, hai ràng buộc dương đều lỏng ($w_1,w_2>0$), chỉ ràng buộc tổng chạm biên. Đường mức tròn tâm $(2,1)$ tiếp xúc cạnh $w_1+w_2=2$ của tam giác tại điểm đó.
:::

## 2. Tiêu chí sai số và LP/QP

### 2.1. QP dạng chuẩn và vai trò của hằng số

QP lồi có dạng

$$
\operatorname*{minimize}_{w\in\mathbb R^d}\ \frac12w^TPw+q^Tw+r
\quad\text{với}\quad Aw\le b,\ Gw=h,
$$

trong đó $P\in\mathbb S^d$, $P\succeq0$. Với hồi quy $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$, khai triển $\lVert Xw-y\rVert_2^2=w^T(X^TX)w-2y^TXw+y^Ty$ cho $P=2X^TX$, $q=-2X^Ty$, $r=y^Ty$. Hằng số $r$ không đổi nghiệm nhưng đổi giá trị mục tiêu, nên khi báo $p^*$ phải giữ $r$. Khi $P\succ0$, mục tiêu lồi chặt nên nhiều nhất một nghiệm; khi $P\succeq0$ suy biến, vẫn lồi nhưng có thể có nhiều nghiệm, và ràng buộc đôi khi vẫn ép nghiệm duy nhất.

### 2.2. Epigraph: dùng biến phụ chặn mục tiêu

Một công cụ lặp lại suốt bài này: với $f:C\to\mathbb R$,

$$
\inf_{w\in C}f(w)=\inf_{w\in C,\ t\in\mathbb R}\{t:\ f(w)\le t\}.
$$

Biến $t$ biểu diễn một mức chi phí có thể đạt, không phải một quan sát mới. Hai chiều của đẳng thức: mọi $w\in C$ cho cặp $(w,f(w))$ khả thi nên infimum bên phải $\le$ infimum trái; ngược lại mọi cặp khả thi có $t\ge f(w)$ nên infimum trái $\le$ infimum phải. Nếu $f$ và $C$ lồi thì tập trên đồ thị (epigraph) $\{(w,t):w\in C,\ f(w)\le t\}$ lồi. Ánh xạ khôi phục là chiếu $(w,t)\mapsto w$; nâng một $w$ thành $(w,f(w))$ là ánh xạ ngược. Tại nghiệm đạt được, $t^*=f(w^*)$: một điểm $(w,t)$ khả thi bất kỳ có thể có $t>f(w)$, nhưng ở tối ưu luôn hạ được $t$ xuống đúng $f(w)$.

![Đồ thị f(w)=w^2 trên trục w,t; vùng phía trên đồ thị được tô là epigraph; đường ngang t hạ dần về đỉnh.](img/lec-02/epigraph.svg)

### 2.3. Đổi tiêu chí: sai số tệ nhất và LP minimax

Giữ nguyên dữ liệu và tập $C$, đổi yêu cầu từ tổng bình phương sai số sang sai số tệ nhất (minimax):

$$
\min_{w\in C}\ \max_{i=1,\ldots,N}\ \lvert X_iw-y_i\rvert.
$$

Dùng $\lvert r_i\rvert\le t\iff -t\le r_i\le t$, bài toán trở thành

$$
\operatorname*{minimize}_{w,t}\ t
\quad\text{với}\quad
Xw-y\le t\mathbf 1,\quad -Xw+y\le t\mathbf 1,\quad w\in C.
$$

Mọi ràng buộc đều affine, nên đây là quy hoạch tuyến tính (LP). Biến $t\ge0$ tự suy ra khi $N\ge1$. Phép cải dạng tăng $1$ biến và thêm $2N$ bất đẳng thức; ánh xạ khôi phục là lấy $w$.

![Cùng tam giác C; các hình vuông (đường mức chuẩn vô cùng) tâm (2,1) co dần đến khi tiếp xúc tam giác tại (1.5, 0.5).](img/lec-02/regression-minimax.svg)

::: proof
**Mục tiêu:** chứng minh với dữ liệu $X=I_2$, $y=(2,1)$, nghiệm minimax là $w^*=(1{,}5,0{,}5)$, $t^*=0{,}5$.

**Ý tưởng:** tìm một cận dưới cho sai số lớn nhất từ tổng hai thiếu hụt, rồi chỉ ra một điểm khả thi đạt cận.

**Bước dùng giả thiết:** với $w\in C$, đặt $a=2-w_1$, $b=1-w_2$; như mục 1.4, $a+b\ge1$. Sai số tại hai điểm dữ liệu là $\lvert a\rvert$ và $\lvert b\rvert$, nên sai số lớn nhất $\max\{\lvert a\rvert,\lvert b\rvert\}\ge\frac{\lvert a\rvert+\lvert b\rvert}{2}\ge\frac{a+b}{2}\ge\frac12$. Điểm $w=(1{,}5,0{,}5)$ khả thi và cho $a=b=\frac12$, đạt sai số lớn nhất đúng $\frac12$. Vậy $w^*=(1{,}5,0{,}5)$, $t^*=0{,}5$.
:::

Hai tiêu chí trùng nghiệm trong bộ số này, nhưng điều đó không có nghĩa chúng tương đương. Thử khớp một hằng số $w\in\mathbb R$ cho ba quan sát $y=(0,0,3)$:

::: example
**Bình phương tối thiểu:** $\min_w\sum_{i=1}^3(w-y_i)^2$. Đạo hàm $2\sum_i(w-y_i)=0$ cho $w=1$ (trung bình cộng).

**Minimax:** $\min_w\max\{\lvert w\rvert,\lvert w-3\rvert\}$. Hai đại lượng cân bằng khi $w=3-w$, tức $w=1{,}5$ (trung điểm), giá trị $1{,}5$.
:::

Hai nghiệm khác nhau vì hai tiêu chí khác nhau. Phân biệt rõ: đưa minimax về LP là **cải dạng tương đương của chính bài minimax**; thay tiêu chí bình phương bằng minimax là **đổi bài toán**.

### 2.4. LP nhận dạng và ví dụ phân bổ

LP có dạng $\min_x c^Tx$ với $Ax\le b$, $Gx=h$. Miền là đa diện; với $c\ne0$, các đường mức là siêu phẳng song song. Một LP khả thi với giá trị hữu hạn đạt nghiệm, nhưng LP cũng có thể vô nghiệm hoặc không bị chặn dưới; không nói mọi LP đều có đỉnh hay nghiệm duy nhất. Có hàm max hay trị tuyệt đối trong biểu thức ban đầu không loại LP, vì epigraph có thể xử lý được.

Ví dụ phân bổ: cần ít nhất $3$ đơn vị nguyên liệu cùng chất lượng, hai nguồn giá $1$ và $2$ điểm chi phí mỗi đơn vị, mua liên tục $x_i\ge0$:

$$
\min\ x_1+2x_2\quad\text{với}\quad x_1+x_2\ge3.
$$

Giả thiết để cộng trực tiếp hai lượng: chất lượng tương đương, lượng cộng được, chi phí tỷ lệ thuận, chưa có trần cung. Với mọi điểm khả thi,

$$
x_1+2x_2=(x_1+x_2)+x_2\ge3,
$$

dấu bằng cần $x_1+x_2=3$ và $x_2=0$, cho $x^*=(3,0)$, $p^*=3$. Mua từ nguồn rẻ hơn là phương án trực giác hợp lý ở mô hình này. Dấu $\ge$ thay $=$ vì nhu cầu là tối thiểu; chi phí dương khiến nghiệm không mua dư.

![Trục x1, x2 với mốc 0 và 3; miền x1+x2≥3, x≥0 tô góc; các đường mức x1+2x2=k với k=5,4,3 tịnh tiến xuống chạm (3,0).](img/lec-02/allocation.svg)

Biến thể: thêm trần cung $x_1\le2$. Khi đó $x_2\ge1$ nên chi phí ít nhất $2+2\cdot1=4$, đạt tại $(2,1)$. Ràng buộc mới hoạt động và đổi nghiệm. Nếu chỉ mua nguyên kiện, bài toán cần biến nguyên và rời lớp LP liên tục, dù bộ số này tình cờ có nghiệm nguyên.

**Câu hỏi:** cùng một nghiệm $(1{,}5,0{,}5)$ ở mục 2.3 và mục 1.4 có chứng minh hai mô hình tương đương không?

::: hint
Không. Trùng nghiệm là tình cờ của bộ số; hai tiêu chí (tổng bình phương sai số, SSE, và minimax) cho nghiệm khác nhau trên dữ liệu $(0,0,3)$.
:::

## 3. Cải dạng và giới hạn độ nhạy

### 3.1. Bốn phép biến đổi và điều phải ghi kèm

Mỗi phép biến đổi phải ghi rõ miền, điều kiện và ánh xạ khôi phục:

1. **Cải dạng chính xác với biến phụ** (epigraph, biến dư): giữ nguyên infimum, khôi phục nghiệm bằng chiếu.
2. **Đổi biến song ánh kèm mục tiêu tăng nghiêm ngặt**: giữ tập nghiệm và thứ tự; giá trị có thể đổi. Ví dụ $f\mapsto2f+1$ giữ argmin nhưng $p^*$ thành $2p^*+1$.
3. **Thư giãn**: mở rộng miền, cho cận dưới khi cực tiểu cùng mục tiêu. Bỏ ràng buộc trần trong hồi quy là thư giãn, không phải cải dạng.
4. **Xấp xỉ**: thay một quan hệ bằng mô hình gần đúng, cần đánh giá sai số riêng.

Đối chiếu mục 2.3: đưa minimax sang LP là loại 1; thay LS bằng minimax là đổi tiêu chí, không thuộc cả bốn loại trên.

### 3.2. Cùng miền khả thi chưa đủ kết luận lồi

Trên $\mathbb R^2$, hai hệ ràng buộc

$$
\frac{x_1}{1+x_2^2}\le0,\quad (x_1+x_2)^2=0
\qquad\Longleftrightarrow\qquad
x_1\le0,\quad x_1+x_2=0,
$$

vì mẫu $1+x_2^2$ luôn dương và $u^2=0$ khi và chỉ khi $u=0$. Tập nghiệm chung là tia $x=(-s,s)$, $s\ge0$.

![Trục x1, x2 với tia x=(-s,s), s≥0, xuất phát từ gốc tọa độ được đánh dấu.](img/lec-02/feasible-ray.svg)

Thêm mục tiêu $\min\lVert x-(1,1)\rVert_2^2$: trên tia, mục tiêu bằng $(-s-1)^2+(s-1)^2=2s^2+2$, nhỏ nhất tại $s=0$, nên $x^*=0$, $p^*=2$. Sau cải dạng, bài toán là QP lồi, dù biểu diễn ban đầu có mẫu phi tuyến và bình phương đẳng thức trông không lồi. Hai biểu diễn cùng tập khả thi nhưng một cái ở dạng lồi chuẩn, cái kia không; phải xét biểu diễn, không chỉ xét tập.

Nếu thay mục tiêu bằng $-\lVert x\rVert_2^2$, miền không đổi nhưng mục tiêu lõm trên tia và bài toán không bị chặn dưới. Miền quyết định tính khả thi; mục tiêu quyết định tính lồi của bài toán.

### 3.3. QCQP và giới hạn độ nhạy

Yêu cầu mới từ nghiệp vụ: với mọi nhiễu $\Delta z$ có $\lVert\Delta z\rVert_2\le1$, muốn $\lvert w^T\Delta z\rvert\le1$. Theo Cauchy–Schwarz, $\lvert w^T\Delta z\rvert\le\lVert w\rVert_2\lVert\Delta z\rVert_2\le\lVert w\rVert_2$. Khi $w=0$, mọi $\Delta z$ trong quả cầu đều cho $w^T\Delta z=0$, nên yêu cầu tự thỏa; chỉ khi $w\ne0$ mới chia cho $\lVert w\rVert_2$, và khi đó chọn $\Delta z=w/\lVert w\rVert_2$ đạt đúng chặn. Vậy yêu cầu tương đương $\lVert w\rVert_2^2\le1$. Thêm vào mô hình hồi quy:

$$
\operatorname*{minimize}_{w\in C}\ \lVert Xw-y\rVert_2^2
\quad\text{với}\quad
\lVert w\rVert_2^2\le1.
$$

Đây là quy hoạch bậc hai với ràng buộc bậc hai (QCQP) lồi: ràng buộc chuẩn có $P_1=2I\succ0$, $q_1=0$, $r_1=-1$.

Định lý chứng nhận: **nếu mọi ma trận bậc hai $P_i\succeq0$** trong mục tiêu và các ràng buộc $\frac12x^TP_ix+q_i^Tx+r_i\le0$, cùng đẳng thức affine, thì bài toán lồi.

::: proof
**Mục tiêu:** chứng minh mỗi hàm $q_i(x)=\frac12x^TP_ix+a_i^Tx+b_i$ lồi, từ đó suy ra bài toán lồi.

**Ý tưởng:** Hessian không đổi theo $x$; PSD của Hessian là điều kiện đủ cho tính lồi theo tiêu chí bậc hai đã học ở Bài 01.

**Bước dùng giả thiết:** $\nabla^2q_i(x)=P_i\succeq0$ với mọi $x$, theo giả thiết $P_i\in\mathbb S_+^n$. Do đó mỗi $q_i$ lồi trên $\mathbb R^n$, nên mỗi tập mức dưới $\{x:q_i(x)\le0\}$ lồi. Kết hợp định lý tập khả thi ở mục 1.2 (các đẳng thức affine giữ lát phẳng), tập khả thi lồi; mục tiêu $q_0$ lồi. Vậy bài toán ở dạng lồi chuẩn.
:::

PSD là chứng nhận đủ cho dạng chuẩn trên toàn không gian; một ma trận không PSD chưa loại mọi biểu diễn lồi, vì ràng buộc khác có thể thu hẹp miền. Thay $\le$ bằng $\ge$ trong giới hạn chuẩn (phần ngoài quả cầu, $\tau>0$) nói chung không lồi.

![Tam giác C, đĩa đơn vị tâm gốc, tia từ gốc qua (2,1) và điểm chạm w*=(2,1)/√5 trên cung.](img/lec-02/regression-qcqp.svg)

::: proof
**Mục tiêu:** chứng minh nghiệm của QCQP trên là $w^*=(2,1)/\sqrt5$ với $p^*=(\sqrt5-1)^2\approx1{,}5279$.

**Ý tưởng:** chặn dưới $\lVert w-y\rVert_2$ bằng hiệu chuẩn qua bất đẳng thức tam giác, rồi chỉ ra điểm trên tia $y$ đạt bằng và khả thi.

**Bước dùng giả thiết:** với $w\in C$ ta có $\lVert w\rVert_2\le1$ (từ ràng buộc chuẩn; $C$ không cần thêm ở bước này). Bất đẳng thức tam giác ngược cho

$$
\lVert w-y\rVert_2\ge\lVert y\rVert_2-\lVert w\rVert_2\ge\sqrt5-1.
$$

Bình phương: $f_0(w)\ge(\sqrt5-1)^2$. Xét $w=\alpha y$ với $\alpha=1/\lVert y\rVert_2=1/\sqrt5$: khi đó $\lVert w\rVert_2=1$ (thỏa ràng buộc chuẩn), $w\ge0$ và $w_1+w_2=3/\sqrt5\approx1{,}342\le2$ (thỏa $C$), và $\lVert w-y\rVert_2=\sqrt5-1$ vì $w$ nằm trên đoạn từ gốc tới $y$. Dấu bằng đạt tại điểm khả thi, nên $w^*=(2,1)/\sqrt5$, $p^*=(\sqrt5-1)^2$.
:::

Nhiễu ở đây được quy định trên quả cầu đơn vị, nghiêm hơn nhiễu chỉ nằm trong hộp $[0,1]^2$. Tham số $\tau=1$ là bình phương cận độ nhạy; không tự động là độ trễ hay bộ nhớ. Nếu $\tau<0$, tập $\{w:\lVert w\rVert_2^2\le\tau\}$ rỗng nên bài toán vô nghiệm.

### 3.4. Phạt độ lớn và đặt trần là hai lựa chọn mô hình

Trên cùng tập $C$, có hai cách kiểm soát độ lớn trọng số:

- **Ridge (phạt mềm):** $\min_w\lVert Xw-y\rVert_2^2+\lambda\lVert w\rVert_2^2$, $\lambda\ge0$. Hessian $2X^TX+2\lambda I\succeq0$, là QP.
- **Trần cứng:** $\min_{w}\lVert Xw-y\rVert_2^2$ với $\lVert w\rVert_2^2\le\tau$, là QCQP.

Với $X=I_2$, $y=(2,1)$, $\lambda=1$: dùng đẳng thức

$$
\lVert w-y\rVert^2+\lVert w\rVert^2=2\Big\lVert w-\frac y2\Big\rVert^2+\frac{\lVert y\rVert^2}{2},
$$

và $y/2=(1,0{,}5)$ khả thi trong $C$ (tổng bằng $1{,}5\le2$), nên $w^*=(1,0{,}5)$. Các giá trị phải ghi riêng: SSE $=(1)^2+(0{,}5)^2=1{,}25$; mục tiêu ridge $=1{,}25+1\cdot1{,}25=2{,}5$; chuẩn bình phương $\lVert w^*\rVert_2^2=1{,}25$.

Điểm cần phân biệt: $\lambda=1$ **không** bảo đảm trần $\tau=1$, vì $\lVert w^*\rVert_2^2=1{,}25>1$ vi phạm trần. Phạt và trần không đổi chỗ tùy ý; chúng có quan hệ qua điều kiện tối ưu dưới giả thiết thích hợp, sẽ xem ở bài đối ngẫu. Ở đây chỉ so ý nghĩa: phạt cho phép vượt ngân sách với cái giá $\lambda\lVert w\rVert^2$, trần cấm hẳn.

### 3.5. Bảng phân loại và phản ví dụ ma trận bất định

| Yêu cầu | Mục tiêu | Ràng buộc | Lớp sau cải dạng |
|---|---|---|---|
| Sai số tệ nhất nhỏ nhất | $t$ (tuyến tính) | $Xw-y\le t\mathbf1$, $-Xw+y\le t\mathbf1$, $w\in C$ | LP |
| Tổng bình phương sai số nhỏ nhất | $\lVert Xw-y\rVert_2^2$ | affine ($w\in C$) | QP |
| SSE + giới hạn độ nhạy | $\lVert Xw-y\rVert_2^2$ | $\lVert w\rVert_2^2\le\tau$ | QCQP |
| SSE + phạt ridge | $\lVert Xw-y\rVert_2^2+\lambda\lVert w\rVert_2^2$ | affine ($w\in C$) | QP |

Ở mức dạng chuẩn, LP $\subseteq$ QP lồi $\subseteq$ QCQP lồi, cho phép hệ số bậc hai bằng $0$. Sự thay đổi mục tiêu hoặc ràng buộc xuất phát từ yêu cầu nghiệp vụ, không từ việc muốn dùng một lớp bài toán.

Cuối cùng, một phản ví dụ cho thấy vì sao phải kiểm tra **từng** ma trận bậc hai. Xét $C=\{x:x_1^2-x_2^2\le1\}$ với ma trận $\operatorname{diag}(1,-1)$ không PSD. Hai điểm $a=(\sqrt2,1)$ và $b=(\sqrt2,-1)$ đều khả thi (giá trị $1\le1$), nhưng trung điểm $(\sqrt2,0)$ cho giá trị $2>1$, không khả thi. Vậy tập cụ thể này không lồi, kiểm chứng bằng định nghĩa chứ không chỉ bằng việc Hessian thất bại PSD. Nếu thêm ràng buộc $x_2=0$, tập thu thành đoạn $-1\le x_1\le1$ lồi: phải xét đủ hệ ràng buộc trước khi kết luận.

**Câu hỏi:** tập $\{x:x_1^2-x_2^2\le1\}$ sau khi thêm $x_1\ge2$ còn lồi không?

::: hint
Với $x_1\ge2$, hàm $x_1^2-x_2^2\le1$ cho $\lvert x_2\rvert\le\sqrt{x_1^2-1}$; lấy hai điểm $(2,\pm\sqrt3)$ khả thi, trung điểm $(2,0)$ có giá trị $4>1$, không khả thi. Vẫn không lồi.
:::

Phần đọc luyện sau bài bổ sung các ví dụ về đơn hình (simplex), ràng buộc dùng chung và giao của các miền ràng buộc bậc hai.

## 4. Thiết kế dầm và quy hoạch hình học

### 4.1. Mô hình dầm công-xôn

Hãy tưởng tượng một dầm công-xôn: đầu trái bị ngàm chặt, đầu phải treo tự do, một lực $F$ hướng xuống đặt tại đầu tự do. Ta chia dầm thành bốn đoạn bằng nhau, mỗi đoạn có tiết diện chữ nhật riêng với chiều rộng $b_i$ và chiều cao $h_i$ (đơn vị mét). Vật liệu đàn hồi tuyến tính với môđun Young $E$ (N/m²), dầm mảnh, võng nhỏ, bỏ tự trọng và biến dạng cắt. Dữ liệu vào là $F$ [N], $E$ [N/m²], chiều dài $L$ [m] và độ võng cho phép $\delta_{\max}$ [m]. Câu hỏi thiết kế: chọn $b_i, h_i$ sao cho tổng thể tích vật liệu nhỏ nhất mà độ võng đầu tự do không vượt $\delta_{\max}$.

Với dầm Euler–Bernoulli, mô men quán tính của tiết diện là $I(\xi)=b(\xi)h(\xi)^3/12$ tại vị trí $\xi$ đo từ ngàm. Đóng góp của mỗi đoạn vào độ võng đầu tự do tỷ lệ với tích phân $(L-\xi)^2$ trên đoạn đó, chia cho $I$ tại đoạn ấy:

$$
\delta=\frac{12F}{E}\sum_{i=1}^4\frac{1}{b_ih_i^3}\int_{(i-1)L/4}^{iL/4}(L-\xi)^2\,d\xi.
$$

Tích phân tính được tường minh. Đặt

$$
d_i=\frac{(5-i)^3-(4-i)^3}{64},
\qquad
d=\frac{1}{64}(37,\,19,\,7,\,1),
$$

thì

$$
\delta=\frac{4FL^3}{E}\sum_{i=1}^4\frac{d_i}{b_ih_i^3}.
$$

Hai điều đáng chú ý ngay từ công thức này. Thứ nhất, đoạn gần ngàm có trọng số lớn nhất: $d_1=37/64$ gấp hơn hai mươi lần $d_4=1/64$, vì $(L-\xi)^2$ lớn nhất ở gần ngàm. Thứ hai, chiều cao xuất hiện với số mũ $-3$ và chiều rộng với số mũ $-1$: đây là các quan hệ lũy thừa nghịch, không phải quan hệ tuyến tính. Cơ sở năng lượng của công thức độ võng được đối chiếu với [bài giảng cơ học IIT Kharagpur, Lesson 3, Example 3.1](https://facweb.iitkgp.ac.in/~baidurya/CE21004/online_lecture_notes/m1l3.pdf); cách chia đoạn và bộ hệ số ở đây là dẫn xuất minh họa của tài liệu này, không phải trích nguyên bộ số của nguồn. Mô hình rút gọn chưa gồm giới hạn bền, ứng suất hay chế tạo; kết quả không phải một thiết kế đã kiểm chứng.

### 4.2. Ca rộng cố định: bài toán đã lồi

Trước hết cố định chiều rộng $b$ cho cả bốn đoạn. Chuẩn hóa bằng

$$
h_{\rm ref}=\left(\frac{4FL^3}{Eb\,\delta_{\max}}\right)^{1/3},
\qquad
H_i=\frac{h_i}{h_{\rm ref}}>0,
$$

thì độ võng chuẩn hóa thành $\delta/\delta_{\max}=\sum_i d_iH_i^{-3}$ và thể tích vật lý là $b(L/4)h_{\rm ref}\sum_iH_i$. Bài toán thiết kế trở thành

$$
\min_{H_i>0}\ \sum_{i=1}^4H_i
\quad\text{với}\quad
\sum_{i=1}^4d_iH_i^{-3}\le1.
$$

Bài này lồi ngay trong biến $H$: hàm $H^{-3}$ có đạo hàm hai $12H^{-5}>0$ trên $H>0$, nên mục tiêu và ràng buộc đều lồi. Chưa cần phép đổi log để chứng nhận tính lồi.

![Dầm công-xôn bốn đoạn, ngàm trái, lực F ở đầu tự do, chiều cao từng đoạn là biến thiết kế.](img/lec-02/cantilever-gp.svg)

### 4.3. Mô hình hai kích thước: chiều rộng và chiều cao là biến

Giờ cho cả hai chiều thay đổi. Chuẩn hóa hai chiều bằng cùng độ dài

$$
s_0=\left(\frac{4FL^3}{E\,\delta_{\max}}\right)^{1/4},
\qquad
B_i=\frac{b_i}{s_0},\quad H_i=\frac{h_i}{s_0},
$$

và thêm trần tỉ lệ minh họa $H_i\le2B_i$ (giả định thiết kế, không phải tiêu chuẩn kỹ thuật). Bài toán là

$$
\min_{B_i,H_i>0}\ \sum_{i=1}^4B_iH_i
\quad\text{với}\quad
\sum_{i=1}^4d_iB_i^{-1}H_i^{-3}\le1,
\qquad
\frac{H_i}{2B_i}\le1.
$$

Thể tích vật lý là $V_{\rm phys}=(L/4)s_0^2V$ với $V=\sum_iB_iH_i$. Mỗi tích $B_iH_i$ có Hessian với hai trị riêng $+1$ và $-1$, nên mục tiêu không lồi trong các biến hiện tại. Việc cho phép thay đổi chiều rộng chính là điều làm mất chứng nhận lồi. Điều đó không có nghĩa bài toán không thể cải dạng: ta chỉ cần một tọa độ khác. Cấu trúc "tích các lũy thừa" trong các biểu thức cũng gợi ý một lớp bài toán rộng hơn, và lớp đó cần một ngôn ngữ riêng.

### 4.4. Đơn thức, đa thức dương và dạng chuẩn GP

Trên miền $\mathbb R_{++}^n$ (mọi tọa độ dương), một **đơn thức** là

$$
g(x)=c\prod_{j=1}^nx_j^{a_j},
\qquad c>0,\qquad a_j\in\mathbb R,
$$

với số mũ cho phép âm hoặc không nguyên. Một **đa thức dương** (posynomial) là tổng hữu hạn các đơn thức:

$$
f(x)=\sum_{k=1}^Kc_k\prod_{j=1}^nx_j^{a_{kj}},
\qquad c_k>0.
$$

Quy hoạch hình học (GP) ở dạng chuẩn là

$$
\begin{aligned}
\operatorname*{minimize}_{x\in\mathbb R_{++}^n}\quad&f_0(x)\\
\text{với}\quad&f_i(x)\le1,\quad i=1,\ldots,m,\\
&g_j(x)=1,\quad j=1,\ldots,p,
\end{aligned}
$$

trong đó mọi $f_i$ là đa thức dương và mọi $g_j$ là đơn thức. Ràng buộc $f(x)\le a$ với $a>0$ chuẩn hóa được thành $f(x)/a\le1$. Đẳng thức phải là đơn thức bằng $1$; đẳng thức giữa hai đa thức dương tổng quát không hợp lệ ở dạng chuẩn.

Ba biểu thức của bài dầm hai kích thước ở mục 4.3 đều thuộc ngôn ngữ này: $B_iH_i$, $d_iB_i^{-1}H_i^{-3}$ và $H_i/(2B_i)$ là đơn thức; tổng thể tích và tổng độ võng là đa thức dương. Ngược lại, $x-y$ có hiệu hai đơn thức nên không phải đa thức dương theo biểu thức, dù nó có khi nhận giá trị dương; "đa thức dương" là tên lớp cấu trúc, không phải khẳng định mọi hàm dương đều thuộc lớp.

::: example
**Ví dụ tính được: tích lớn nhất dưới ngân sách.** Xét $\max_{x,y>0}xy$ với $x+y\le4$. Đưa về GP bằng cách cực tiểu hóa nghịch đảo:

$$
\min_{x,y>0}(xy)^{-1}
\quad\text{với}\quad
\frac{x+y}{4}\le1.
$$

Mục tiêu là một đơn thức, vế trái là một đa thức dương. Bất đẳng thức trung bình cộng–trung bình nhân cho $\sqrt{xy}\le(x+y)/2\le2$, nên $xy\le4$, dấu bằng tại $x=y=2$. Giá trị mục tiêu gốc là $4$, giá trị mục tiêu GP là $1/4$.
:::

### 4.5. Hàm log-tổng-mũ và chứng minh tính lồi

Đặt $y_j=\log x_j$, tức $x_j=e^{y_j}$; đây là song ánh giữa $\mathbb R_{++}^n$ và $\mathbb R^n$. Công cụ trung tâm là hàm log-tổng-mũ (log-sum-exp, viết tắt LSE):

$$
\operatorname{lse}(z)=\log\sum_{k=1}^Ke^{z_k},
\qquad z\in\mathbb R^K.
$$

::: proof
**Mục tiêu:** chứng minh $\operatorname{lse}$ lồi trên $\mathbb R^K$.

**Ý tưởng:** viết dạng toàn phương của Hessian và nhận ra nó là phương sai có trọng số, luôn không âm.

**Các bước.** Đặt $p_k=e^{z_k}/\sum_je^{z_j}$, nên $p_k>0$ và $\sum_kp_k=1$. Đạo hàm cấp hai của $\operatorname{lse}$ là

$$
\nabla^2\operatorname{lse}(z)=\operatorname{diag}(p)-pp^T.
$$

Với mọi $v\in\mathbb R^K$,

$$
v^T\big(\operatorname{diag}(p)-pp^T\big)v
=\sum_kp_kv_k^2-\Big(\sum_kp_kv_k\Big)^2,
$$

đúng là phương sai có trọng số của các tọa độ $v_k$ với trọng số $p_k$, nên không âm. Vậy $\operatorname{lse}$ lồi. Khi $z_k=a_k^Ty+b_k$ affine theo $y$, hợp với hàm affine giữ tính lồi, nên $\operatorname{lse}(z(y))$ lồi theo $y$. Trường hợp $K=1$ rút gọn thành hàm affine $a_1^Ty+b_1$.
:::

Lưu ý: log của một hàm lồi bất kỳ không nhất thiết lồi; $\log(1+y^2)$ không lồi trên toàn $\mathbb R$. Điểm dùng tiếp theo là log của tổng các hàm mũ affine, không phải một quy tắc "log bảo toàn lồi".

### 4.6. Đổi log cho bài dầm và quan hệ nghiệm–giá trị

Với một đơn thức, $\log g(e^y)=\log c+a^Ty$: affine. Với một đa thức dương,

$$
\log f(e^y)=\operatorname{lse}_k\big(a_k^Ty+\log c_k\big),
$$

một LSE của các hàm affine, do đó lồi. Vì log tăng nghiêm trên $\mathbb R_{++}$,

$$
f_i(x)\le1\iff\log f_i(e^y)\le0,
\qquad
g_j(x)=1\iff\log g_j(e^y)=0.
$$

Xét từng hạng của bài dầm hai kích thước, với $u_i=\log B_i$, $v_i=\log H_i$:

$$
\log\big(d_iB_i^{-1}H_i^{-3}\big)=\log d_i-u_i-3v_i.
$$

Bài lồi tương ứng là

$$
\begin{aligned}
\operatorname*{minimize}_{u,v\in\mathbb R^4}\quad
&\operatorname{lse}_i(u_i+v_i)\\
\text{với}\quad
&\operatorname{lse}_i(\log d_i-u_i-3v_i)\le0,\\
&v_i-u_i-\log2\le0,\quad i=1,\ldots,4.
\end{aligned}
$$

Mục tiêu và ràng buộc độ võng là LSE của các hàm affine; bốn giới hạn tỉ lệ là affine. Vẫn tám biến, một ràng buộc độ võng, bốn giới hạn tỉ lệ: phép đổi log không thêm biến ở mức công thức này. Khôi phục nghiệm bằng $B_i=e^{u_i}$, $H_i=e^{v_i}$, luôn dương.

Về giá trị: $x=e^y$ là song ánh giữa hai miền khả thi, nên khả thi, vô nghiệm và tính đạt infimum được bảo toàn. Nếu tối ưu đạt được thì $x^*=\exp y^*$ và ngược lại. Với $0<p^*<\infty$, giá trị mới là $\widetilde p^*=\log p^*$, tức $p^*=\exp\widetilde p^*$; hai bài có cùng thứ tự giá trị chứ không cùng giá trị số. Nếu bộ giải báo $-\log2$ thì giá trị GP gốc là $1/2$, không phải số âm. Trường hợp biên cần tách riêng: nếu $\inf f_0=0$ trên miền dương thì $\inf\log f_0=-\infty$, vì $f_0>0$ nên không có nghiệm đạt $0$. Ví dụ $\min_{x>0}x$: bài gốc có infimum $0$ không đạt, bài log có giá trị $-\infty$. Không dùng $\log p^*$ khi $p^*=0$ như một log thực. Sai số cộng trong mục tiêu log chuyển thành bảo đảm theo tỉ số ở thang gốc, không tự là cùng sai số cộng.

### 4.7. Nghiệm tối ưu của dầm một đoạn

Giảm còn một đoạn với dữ liệu minh họa $d=1$:

$$
\min_{B,H>0}\ BH
\quad\text{với}\quad
BH^3\ge1,\qquad H\le2B.
$$

::: proof
**Mục tiêu:** chứng minh giá trị tối ưu là $V^*=2^{-1/2}$ và chỉ ra nghiệm đạt được.

**Ý tưởng:** gộp hai biến thành $a=BH$ và dùng trần tỉ lệ để khép lại mọi thứ theo $a$.

**Các bước.** Đặt $a=BH$. Trần tỉ lệ $H\le2B$ cho $H^2\le2BH=2a$. Ràng buộc độ võng $BH^3\ge1$ viết lại là $aH^2\ge1$. Kết hợp:

$$
1\le aH^2\le2a^2,
$$

nên $a\ge1/\sqrt2$. Vậy mọi điểm khả thi có $V=BH=a\ge2^{-1/2}$. Nghiệm $B^*=2^{-3/4}\approx0{,}5946$, $H^*=2^{1/4}\approx1{,}1892$ thỏa $B^*H^*=2^{-1/2}$, $B^*(H^*)^3=1$ và $H^*=2B^*$, nên đạt cận. Giá trị log là $\widetilde V^*=-(\log2)/2$.
:::

Hình hai ô dưới đây cho thấy cùng một bài ở hai tọa độ: miền và đường mức $BH=k$ trong $(B,H)$, và miền với các đường mức thẳng $u+v=c$ trong $(u,v)=(\log B,\log H)$.

![Bên trái: miền khả thi trong (B,H) với đường mức BH=k. Bên phải: miền affine trong (u,v) với đường mức u+v=c.](img/lec-02/beam-log-spaces.svg)

Biến thể đáng ghi: bỏ trần tỉ lệ trong ca một đoạn thì $H\to\infty$, $B=H^{-3}$, và $BH=H^{-2}\to0$: bài không đạt nghiệm. Tính lồi sau đổi log không ngăn hiện tượng này; trần tỉ lệ là thứ giữ bài toán có nghiệm.

### 4.8. Ca bốn đoạn: chặn Hölder và kiểm nghiệm số

Với bốn đoạn và trần tỉ lệ, đặt $a_i=B_iH_i$, $q_i=d_i/2$ và $S=\sum_iq_i^{1/3}$. Trần tỉ lệ $H_i\le2B_i$ cho $H_i^2\le2B_iH_i=2a_i$, nên vì $a_i=B_iH_i>0$,

$$
\frac{1}{B_iH_i^3}=\frac{1}{a_iH_i^2}\ge\frac{1}{2a_i^2}.
$$

Do đó $d_iB_i^{-1}H_i^{-3}=d_i/(B_iH_i^3)\ge d_i/(2a_i^2)=q_i/a_i^2$, và ràng buộc độ võng $\sum_id_iB_i^{-1}H_i^{-3}\le1$ kéo theo

$$
\sum_i\frac{q_i}{a_i^2}\le1,
\qquad
S\le\Big(\sum_i\frac{q_i}{a_i^2}\Big)^{1/3}\Big(\sum_ia_i\Big)^{2/3}\le V^{2/3}.
$$

Bất đẳng thức giữa là bất đẳng thức Hölder với số mũ $(3,3/2)$; nó cho $V\ge S^{3/2}$. Cận đạt tại

$$
a_i^*=\sqrt S\,q_i^{1/3},
\qquad
B_i^*=\sqrt{a_i^*/2},
\qquad
H_i^*=\sqrt{2a_i^*},
$$

và mọi $H_i^*=2B_i^*$: trần tỉ lệ chạm sát ở nghiệm. Với bộ $d=(37,19,7,1)/64$, kiểm nghiệm số cho

$$
B^*\approx(0{,}6631,\ 0{,}5934,\ 0{,}5024,\ 0{,}3632),
\qquad
H^*=2B^*,
$$

$$
V^*\approx2{,}3522,
\qquad
\widetilde V^*\approx0{,}8553,
\qquad
\delta/\delta_{\max}=1.
$$

Nghiệm cụ thể chứng nhận tính đạt tối ưu; tính lồi sau log chỉ bảo đảm mọi tối ưu địa phương là toàn cục, không tự chỉ ra điểm nào. Khi đọc nghiệm vật lý, nhân $B_i,H_i$ với $s_0$ và nhân $V$ với $(L/4)s_0^2$.

Ca rộng cố định cũng có nghiệm tường thức. Đặt $S_4=\sum_id_i^{1/4}$ thì $H_i^*=S_4^{1/3}d_i^{1/4}$; bộ $d$ mới cho $H^*\approx(1{,}1895,\ 1{,}0070,\ 0{,}7845,\ 0{,}4823)$, tổng $\approx3{,}4633$, độ võng chuẩn hóa bằng $1$. Chứng nhận dùng Hölder:

$$
\sum_id_i^{1/4}
\le\Big(\sum_i\frac{d_i}{H_i^3}\Big)^{1/4}\Big(\sum_iH_i\Big)^{3/4},
$$

với dấu bằng tại $H^*$. Vì ràng buộc độ võng cho $\sum_id_iH_i^{-3}\le1$, suy ra $\sum_iH_i\ge S_4^{4/3}$, đúng giá trị nghiệm. Bộ $d$ cũ $(0{,}1;0{,}2;0{,}3;0{,}4)$ cho nghiệm $(0{,}7894,0{,}9388,1{,}0389,1{,}1164)$, tổng $\approx3{,}8835$: thay $d$ là đổi dữ liệu đề xuất, không phải cải dạng tương đương cùng một bài toán.

**Điểm dễ nhầm.** Đa thức dương không phải đa thức thông thường: hệ số dương, số mũ thực tùy ý. Không phân phối log qua phép cộng: $\log(u+v)\ne\log u+\log v$. Đổi đơn vị bằng chuẩn hóa trước khi lấy log kích thước vật lý. Tính lồi của bài log không có nghĩa các biểu thức gốc lồi theo $x$.

**Câu hỏi kiểm tra.** (1) Biểu thức $2x^{-1/2}y^3$ có phải đơn thức không, và $x-y+2$ có phải đa thức dương không? (2) Đổi $3x_1^2x_2^{-1}=1$ sang biến $y_i=\log x_i$: đẳng thức affine nào thu được? (3) Trong ca một đoạn, vì sao bỏ trần tỉ lệ làm bài mất nghiệm?

::: hint
(1) Đơn thức: hệ số $2>0$, số mũ $-1/2$ và $3$ hợp lệ. $x-y+2$ không phải: hiệu hai đơn thức, không viết được dưới dạng tổng hệ số dương. (2) $\log3+2y_1-y_2=0$. (3) Không có $H\le2B$, chọn $H\to\infty$, $B=H^{-3}$ cho $BH\to0$; dãy khả thi không có điểm hội tụ khả thi.
:::

## 5. Thiết kế phép đo và quy hoạch nửa xác định

### 5.1. Hai cấu hình đo và hiệp phương sai

Giả sử cần chọn giữa hai cấu hình đo, sai số $e\in\mathbb R^2$ đã chuẩn hóa với trung bình $0$. Đại lượng mô tả mức sai số là ma trận hiệp phương sai (covariance)

$$
\Sigma=\mathbb E[ee^T]
\quad\text{khi}\quad\mathbb E[e]=0,
$$

trong đó $\mathbb E$ là trung bình theo phân phối các lần đo. Phần tử đường chéo là phương sai từng tọa độ; phần tử ngoài đường chéo mô tả hiệp phương sai giữa hai tọa độ. Dữ liệu minh họa:

$$
\Sigma_0=\begin{bmatrix}0{,}5&0{,}5\\0{,}5&1{,}5\end{bmatrix},
\qquad
\Sigma_1=\begin{bmatrix}1{,}5&0{,}5\\0{,}5&0{,}5\end{bmatrix}.
$$

Cấu hình 0 chính xác hơn ở tọa độ thứ nhất nhưng kém hơn ở tọa độ thứ hai; cấu hình 1 ngược lại. Câu hỏi là dùng cấu hình nào, và "sai số xấu nhất" nghĩa là gì. Không cần phân phối Gaussian hay xác suất nâng cao: chỉ cần trung bình và phương sai theo hướng.

### 5.2. Chọn ngẫu nhiên và mô hình minimax

Chọn cấu hình 1 ngẫu nhiên với xác suất $\alpha\in[0,1]$, cấu hình 0 với xác suất $1-\alpha$. Vì hai cấu hình có cùng trung bình $0$, ma trận hỗn hợp là

$$
\Sigma(\alpha)=(1-\alpha)\Sigma_0+\alpha\Sigma_1.
$$

Đây là covariance của việc chọn ngẫu nhiên một cấu hình trước mỗi lần đo, không phải covariance của trung bình có trọng số hai kết quả đo. Phương sai theo hướng đơn vị $q$ là $\operatorname{Var}(q^Te)=q^T\Sigma(\alpha)q$, vì $\mathbb E[(q^Te)^2]=q^T\mathbb E[ee^T]q$ khi trung bình bằng $0$. Mô hình ban đầu:

$$
\min_{0\le\alpha\le1}\ \max_{\lVert q\rVert_2=1}q^T\Sigma(\alpha)q.
$$

Biến cần tìm là $\alpha$; $q$ chỉ là hướng dùng để đánh giá. Cách trực tiếp là chọn hẳn cấu hình 0 hoặc 1; phần dưới sẽ đối chiếu hai đầu với phối hợp. Không hứa phối hợp cải thiện mọi hướng.

### 5.3. Nón PSD và thứ tự ma trận

Gọi $\mathbb S^r$ là tập ma trận thực đối xứng cấp $r$. Ma trận $M\in\mathbb S^r$ là **nửa xác định dương** (PSD), ký hiệu $M\succeq0$, khi

$$
q^TMq\ge0\quad\text{với mọi }q\in\mathbb R^r
\iff
\lambda_i(M)\ge0\ \text{với mọi }i.
$$

Tập $\mathbb S_+^r$ là một nón lồi: với $M,N\succeq0$ và $\theta\in[0,1]$,

$$
q^T\big(\theta M+(1-\theta)N\big)q
=\theta\,q^TMq+(1-\theta)\,q^TNq\ge0.
$$

Ký hiệu $A\preceq tI$ nghĩa là $tI-A\succeq0$, tương đương mọi trị riêng của $A$ không vượt $t$. Đây không phải so sánh từng phần tử: ma trận $\begin{bmatrix}1&2\\2&1\end{bmatrix}$ có mọi phần tử dương nhưng trị riêng $3$ và $-1$, nên không PSD; lấy $q=(1,-1)$ cho $q^TMq=-2<0$.

![Thứ tự theo nón kiểm tra bằng hiệu; một số cặp ma trận không so sánh được.](img/lec-02/cone-induced-orders.svg)

### 5.4. Ví dụ đường chéo: chặn hai trị riêng bằng một biến

Trước khi xử lý covariance có phần tử ngoài đường chéo, hãy kiểm tra ký hiệu trên ma trận dễ tính:

$$
\min_{x,t\in\mathbb R}t
\quad\text{với}\quad
\operatorname{diag}(x,\,2-x)\preceq tI.
$$

Ma trận là đường chéo nên điều kiện PSD tương đương hai bất đẳng thức vô hướng $t\ge x$ và $t\ge2-x$, tức $t\ge\max\{x,2-x\}$. Hai cận cân bằng tại $x=1$, nên $x^*=1$, $t^*=1$. Cần cả hai bất đẳng thức vì phải chặn tất cả trị riêng; theo công thức Rayleigh $\lambda_{\max}(A)=\max_{\lVert q\rVert=1}q^TAq$ với $A$ đối xứng, hạ $t$ chính là hạ trị riêng lớn nhất. Ma trận phụ thuộc affine vào $(x,t)$, nên đây là một bất đẳng thức ma trận tuyến tính (LMI); ca đường chéo này cũng là một bài quy hoạch tuyến tính.

![Hai đường t=x và t=2-x, miền phía trên cả hai, hạ xuống đỉnh (1,1).](img/lec-02/sdp-eigenvalue-lmi.svg)

### 5.5. Dạng SDP và tập khả thi LMI

Quy hoạch nửa xác định (SDP) có biến $z\in\mathbb R^n$, mục tiêu affine $c^Tz$, và ràng buộc chính là một LMI:

$$
F_0+\sum_{i=1}^nz_iF_i\succeq0,
\qquad
F_0,\ldots,F_n\in\mathbb S^r,
$$

cùng các đẳng thức affine nếu có. Tập khả thi của một LMI lồi, vì nghịch ảnh của nón PSD qua ánh xạ affine là lồi.

::: proof
**Mục tiêu:** chứng minh $C=\{x: h-Gx\succeq0\}$ lồi, với $G:\mathbb R^n\to\mathbb S^r$ tuyến tính.

**Ý tưởng:** hiệu hai điểm khả thi qua ánh xạ affine là tổ hợp lồi của hai ma trận PSD.

**Các bước.** Lấy $x,y\in C$ và $\theta\in[0,1]$. Khi đó $h-Gx\succeq0$ và $h-Gy\succeq0$. Vì $G$ tuyến tính,

$$
h-G\big(\theta x+(1-\theta)y\big)
=\theta(h-Gx)+(1-\theta)(h-Gy).
$$

Với mọi $q$, $q^T$ của vế phải là tổ hợp lồi của hai số không âm, nên không âm. Vậy ma trận hiệu PSD và $\theta x+(1-\theta)y\in C$.
:::

Trong ví dụ covariance, chọn $z=(\alpha,t)$ và ma trận

$$
tI-\Sigma_0-\alpha(\Sigma_1-\Sigma_0)\succeq0.
$$

Phụ thuộc affine vào $(\alpha,t)$, nên là LMI cấp 2. Hai bất đẳng thức affine $0\le\alpha\le1$ là LMI cấp 1. Nếu một phần tử là $\alpha^2$ thì phụ thuộc không còn affine theo $\alpha$ và biểu diễn này mất tính LMI. Một ma trận biến PSD không tự làm mọi bài toán dùng nó thành SDP: mục tiêu và cách phụ thuộc cũng phải đúng dạng. LMI đường chéo biểu diễn các ràng buộc LP, nên hai lớp có giao nhau.

### 5.6. Nghiệm của bài phép đo và ý nghĩa

Bài đầy đủ là

$$
\min_{\alpha,t}\ t
\quad\text{với}\quad
tI-\Sigma(\alpha)\succeq0,\quad 0\le\alpha\le1.
$$

Ma trận $\Sigma(\alpha)$ có hai trị riêng (công thức ma trận $2\times2$ đối xứng với đường chéo $1+\alpha$, ngoài đường chéo $0{,}5$):

$$
\lambda_{\max}\big(\Sigma(\alpha)\big)=1+\sqrt{\Big(\alpha-\tfrac12\Big)^2+\tfrac14}.
$$

Căn nhỏ nhất tại $\alpha=1/2$, cho

$$
\alpha^*=\tfrac12,
\qquad
t^*=1{,}5.
$$

Chứng nhận bằng thế lại: tại $\alpha=1/2$,

$$
\Sigma=\begin{bmatrix}1&0{,}5\\0{,}5&1\end{bmatrix},
$$

có trị riêng $1{,}5$ và $0{,}5$, nên $t=1{,}5$ đúng bằng trị riêng lớn nhất. Chọn riêng một cấu hình (hai đầu $\alpha=0$ hoặc $1$) cho giá trị $1+\sqrt{1/2}\approx1{,}7071$. Cân bằng hai cấu hình giảm phương sai theo hướng xấu nhất từ khoảng $1{,}71$ xuống $1{,}5$.

![Đường cong trị riêng lớn nhất theo alpha, tập trên đồ thị phía trên, hai đầu và đáy được đánh dấu.](img/lec-02/covariance-epigraph.svg)

Bài đạt nghiệm vì $0\le\alpha\le1$ là tập đóng và bị chặn (compact) và trị riêng lớn nhất liên tục; công thức căn cho nghiệm duy nhất, không suy từ tính lồi chung. Khi khôi phục, chỉ lấy $\alpha$; $t$ là cận và bằng trị riêng lớn nhất tại tối ưu. Hai biến thể: ép $\alpha\in\{0,1\}$ mất miền lồi; nếu hai cấu hình có trung bình khác nhau $\mu_0\ne\mu_1$, hiệp phương sai của lựa chọn ngẫu nhiên có thêm hạng

$$
\alpha(1-\alpha)(\mu_1-\mu_0)(\mu_1-\mu_0)^T,
$$

nên LMI affine ở trên không còn đúng nguyên dạng và phải viết lại.

**Điểm dễ nhầm.** Biến $\alpha$ là vô hướng, covariance là ma trận, $q$ là hướng thử chứ không phải cấu hình cần tìm. $F(x)\succeq0$ không có nghĩa từng phần tử không âm. Từ bài đường chéo sang bài covariance, không được chỉ chặn các phần tử đường chéo.

**Câu hỏi kiểm tra.** (1) Giải $\min_t t$ với $\operatorname{diag}(3-x,x)\preceq tI$; điểm cân bằng ở đâu? (2) Vì sao $\begin{bmatrix}1&2\\2&1\end{bmatrix}$ không PSD? (3) Nếu hai trung bình $\mu_0\ne\mu_1$, hạng bổ sung có phá tính affine của LMI không?

::: hint
(1) $t\ge\max\{3-x,x\}$, cân bằng tại $x=1{,}5$, $t^*=1{,}5$. (2) Trị riêng $3,-1$; hướng $q=(1,-1)$ cho giá trị âm. (3) Có: hạng $\alpha(1-\alpha)(\mu_1-\mu_0)(\mu_1-\mu_0)^T$ bậc hai theo $\alpha$, nên ma trận không còn affine theo $\alpha$.
:::

## 6. Kiểm tra mô hình: bảng kiểm và bài kết

### 6.1. Bảng kiểm trước khi chọn lớp bài toán

Trước khi gán tên lớp (LP, QP, QCQP, GP, SDP), chạy bốn bước theo thứ tự:

1. Đặc tả dữ liệu, biến, miền và đầu ra. Biến nào là biến quyết định, đại lượng nào chỉ là dữ liệu hoặc hướng đánh giá.
2. Kiểm tra toàn bộ mục tiêu và ràng buộc: mục tiêu và ràng buộc affine cho quy hoạch tuyến tính (LP); mục tiêu toàn phương PSD với ràng buộc affine cho quy hoạch toàn phương (QP); mọi bậc hai PSD cùng đẳng thức affine cho QCQP; cấu trúc đa thức dương và đơn thức trên miền dương cho GP kèm phép đổi log; mục tiêu affine với LMI cho SDP.
3. Ghi ánh xạ nghiệm và quan hệ giá trị giữa biểu diễn gốc và biểu diễn cải dạng (ví dụ $\widetilde p^*=\log p^*$ khi $0<p^*<\infty$).
4. Kiểm tra khả thi, tính đạt nghiệm, rồi diễn giải nghiệm ở biến gốc.

Không có dấu hiệu nào là điều kiện "chỉ cần nhìn thấy một hạng". Biến dương và có lũy thừa chưa đủ cho GP: còn phải kiểm tra dấu hệ số và dạng ràng buộc. Hai nhánh mở rộng (tựa lồi với oracle và chia đôi; nhiều mục tiêu với quy tắc ưu tiên hoặc trần) thuộc phần sau của khóa.

### 6.2. Bài tập kết: hồi quy minimax với trần chuẩn

Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$, trọng số $w\ge0$ với $\mathbf1^Tw\le2$.

**(a)** Muốn giảm sai số lớn nhất, hãy viết mô hình và cải dạng.

::: hint
Đặt phần dư $r=Xw-y$. Sai số lớn nhất là $\max_i|r_i|$. Dùng một biến $t$ chặn mọi $|r_i|$.
:::

::: solution
Mô hình là

$$
\min_{w,t}\ t
\quad\text{với}\quad
-t\mathbf1\le Xw-y\le t\mathbf1,\quad
w\ge0,\quad
\mathbf1^Tw\le1\cdot2.
$$

Mọi hàm đều affine, nên đây là LP. Ánh xạ nghiệm: đọc $w$ trực tiếp; $t$ là giá trị sai số lớn nhất.
:::

**(b)** Thêm ràng buộc $\lVert w\rVert_2^2\le1$: lớp mô hình thay đổi ra sao?

::: solution
Thêm một bất đẳng thức bậc hai lồi; bài trở thành QCQP với mục tiêu tuyến tính. Có thể biểu diễn bằng nón bậc hai, nhưng phần này chưa yêu cầu học dạng đó. Trong ca hai chiều với $w\ge0$ và $\lVert w\rVert_2\le1$, trần $\mathbf1^Tw\le2$ đã được kéo theo vì tổng không vượt $\sqrt2<2$; giữ lại trần tổng chỉ để nối với mô hình trước.
:::

**(c)** Nêu cách đọc lại $w$ và giá trị sai số từ biến phụ.

::: solution
Lấy $w$ từ nghiệm, tính lại $\max_i|X_iw-y_i|$; nếu tối ưu đạt được chính xác thì giá trị này bằng $t$. Sai số làm tròn của bộ giải có thể làm hai số lệch nhau nhỏ.
:::

**Hai câu ngắn kiểm tra khái niệm.** Phép log có giữ giá trị tối ưu không? PSD có phải dấu từng phần tử không?

::: hint
Giá trị mới là log của giá trị cũ khi $0<p^*<\infty$; ngoài ca đó phải nói riêng (infimum $0$ cho $-\infty$, vô nghiệm cho vô nghiệm). PSD là bất đẳng thức cho mọi hướng $q$, không phải so sánh từng phần tử.
:::

### 6.3. Tài liệu đối chiếu và chuyển tiếp

Nguồn toán học chính: Boyd và Vandenberghe (2004), [Sách Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf), chương 4, §3.1.5 và §A.5.5 (bản nội bộ: [bv_cvxbook.pdf](../sources/bv_cvxbook.pdf)); bổ đề Schur ở §A.5.5 sẽ được dùng chi tiết ở phần 3 cùng với nón tổng quát và chuẩn phổ, nên phần này cố tình dừng ở mẫu LMI $2\times2$ kiểm tra trực tiếp bằng trị riêng. Nguồn cơ học độ võng dầm: [bài giảng cơ học IIT Kharagpur](https://facweb.iitkgp.ac.in/~baidurya/CE21004/online_lecture_notes/m1l3.pdf), Lesson 3, Example 3.1; mô hình dầm hai kích thước đối chiếu [ví dụ dầm GGPLAB](https://web.stanford.edu/~boyd/ggplab/examples/html/cantilever_beam.html); dạng chuẩn SDP đối chiếu [MOSEK Modeling Cookbook](https://docs.mosek.com/modeling-cookbook/sdo.html) §6.2.4. Các bộ số trong bài là dữ liệu minh họa, không phải số đo thực nghiệm.

Bài tiếp theo: Lagrange, đối ngẫu và điều kiện tối ưu. Ba thứ cần mang theo: một mô hình có giả thiết ghi rõ, một chứng nhận hợp lệ (chặn sơ cấp, thế lại nghiệm, hoặc công thức trị riêng), và một cách đọc nghiệm ở biến gốc kèm quan hệ giá trị.

## 7. Các phép cải dạng và bài luyện bổ sung

Trước khi giải một bài toán, người ta thường biến đổi nó về một dạng mà bộ giải hoặc bản thân người học xử lý được. Hai phép cải dạng dưới đây không đổi giá trị tối ưu, chỉ đổi cách viết. Sau đó là một loạt bài luyện có số cụ thể, mỗi bài minh họa một lớp bài toán đã gặp ở mạch chính.

### 7.1 Khử đẳng thức và thêm biến dư

Giả thiết: các ràng buộc đẳng thức là affine, viết được dưới dạng $Ax=b$ với $A\in\mathbb R^{r\times n}$, $r=\operatorname{rank}A$, và hệ này khả thi.

**Khử affine.** Chọn một nghiệm $x_0$ cụ thể với $Ax_0=b$, rồi chọn $F\in\mathbb R^{n\times(n-r)}$ có các cột là một cơ sở của không gian nghiệm thuần $\ker A$. Mọi nghiệm của $Ax=b$ viết được duy nhất dưới dạng

$$
x=x_0+Fz,\qquad z\in\mathbb R^{n-r}.
$$

Thay biểu thức này vào mục tiêu, mọi ràng buộc còn lại và miền $D$: bài toán mới có $n-r$ biến, không còn ràng buộc đẳng thức, và có cùng giá trị tối ưu với bài toán gốc.

**Thêm biến dư (slack).** Với một bất đẳng thức affine $a^Tx\le b$, ta có tương đương

$$
a^Tx\le b\quad\Longleftrightarrow\quad \exists\, s\ge 0:\ a^Tx+s=b.
$$

Mỗi bất đẳng thức đổi thành một đẳng thức cộng thêm một biến không âm. Khi cần khôi phục $x$ từ nghiệm của bài toán có biến dư, chỉ cần bỏ các tọa độ $s$; ngược lại, từ $x$ nâng lên bằng $s=b-a^Tx$.

::: example
**Ví dụ kích thước.** Ràng buộc $x_1+x_2=1$ với $x\ge0$. Khử affine: đặt $x=(z,\,1-z)$, và điều kiện $x\ge0$ phải được viết lại thành $0\le z\le1$ — bỏ được một biến nhưng ràng buộc bất đẳng thức không biến mất, chỉ đổi hình. Thêm biến dư: $x_1+x_2+s=1$, $s\ge0$, tức là tăng từ hai biến lên ba biến và từ một bất đẳng thức thành một đẳng thức kèm một bất đẳng thức.
:::

Hai điều cần nhớ về kích thước. Khử affine còn $n-r$ biến, nhưng ma trận của các ràng buộc còn lại có thể dày hơn vì $F$ nhân vào. Mỗi biến dư thêm đúng một biến không âm và một đẳng thức. Và phép thêm biến dư chỉ hợp lệ cho ràng buộc affine: viết $f_i(x)+s_i=0$ với $f_i$ phi tuyến rồi gọi đó là "đẳng thức affine" là sai.

Câu hỏi kiểm tra: nếu $Ax=b$ vô nghiệm thì chọn $x_0$ thế nào? Không chọn được: phép khử đẳng thức đòi hỏi một nghiệm $x_0$ của hệ, nên khi hệ vô nghiệm, bước chọn $x_0$ để khử không thực hiện được và bài toán gốc vô nghiệm.

### 7.2 QP trên đơn hình (simplex)

![Đoạn khả thi nối (1,0) và (0,1); các ellipse mức $x_1^2+4x_2^2=c$ co về gốc và tiếp xúc đoạn tại $(0{,}8,\,0{,}2)$.](img/lec-02/simplex-qp.svg)

Xét bài toán với dữ liệu minh họa:

$$
\min\ x_1^2+4x_2^2
\quad\text{sao cho}\quad
x_1+x_2=1,\quad x_1,x_2\ge0.
$$

Đây là bài toán quy hoạch bậc hai (QP): mục tiêu bậc hai lồi, ràng buộc affine. Dùng phép khử ở mục 7.1: thế $x_2=1-x_1$ với $0\le x_1\le1$, được hàm một biến

$$
g(x_1)=x_1^2+4(1-x_1)^2=5x_1^2-8x_1+4.
$$

Đạo hàm $g'(x_1)=10x_1-8$ triệt tiêu tại $x_1=0{,}8$, nằm trong $[0,1]$; vì $g''=10>0$ nên đây là điểm cực tiểu duy nhất. Vậy

$$
x^*=(0{,}8,\ 0{,}2),\qquad p^*=0{,}64+4\cdot0{,}04=0{,}8.
$$

Đối chứng: thử hai đầu mút, $g(0)=4$ và $g(1)=1$, đều lớn hơn $0{,}8$. Bài này cũng cho thấy một điểm hình học: nghiệm nằm trong tương đối của một cạnh của miền khả thi, không bắt buộc ở đỉnh như trong nhiều ví dụ quy hoạch tuyến tính (LP).

### 7.3 Chứng nhận một QCQP hai miền

![Ellipse tâm $(0,0)$ bán trục $2$ và $1$; đĩa tâm $(1,1)$ bán kính $\sqrt2$; giao hai miền được tô, đánh dấu điểm $(0{,}8,\,0{,}7)$.](img/lec-02/qcqp-intersection.svg)

Xét bài toán quy hoạch bậc hai với ràng buộc bậc hai (QCQP) minh họa:

$$
\min_{x\in\mathbb R^2}\ -x_1-x_2
\quad\text{sao cho}\quad
x_1^2+4x_2^2\le4,\quad (x_1-1)^2+(x_2-1)^2\le2.
$$

Nhiệm vụ ở đây không phải tìm nghiệm mà là chứng nhận bài toán lồi. Viết mỗi ràng buộc dưới dạng $f_i(x)\le0$ rồi tính Hessian:

- Mục tiêu $f_0=-x_1-x_2$ affine, Hessian bằng $0$ (vừa lồi vừa lõm).
- $f_1(x)=x_1^2+4x_2^2-4$ có Hessian $\operatorname{diag}(2,8)\succ0$.
- $f_2(x)=(x_1-1)^2+(x_2-1)^2-2$ có Hessian $2I\succ0$.

Cả ba hàm đều lồi, nên miền khả thi — giao của hai tập mức dưới lồi — là tập lồi, và bài toán là QCQP lồi. Về khả thi, điểm $(0{,}8,\,0{,}7)$ cho $0{,}64+1{,}96=2{,}60\le4$ và $0{,}04+0{,}09=0{,}13\le2$, nên giao khác rỗng. Cần tách bạch hai việc: kiểm tra khả thi chỉ cần chỉ ra một điểm; chứng nhận tính lồi chỉ cần Hessian và hình học. Chưa cần giải KKT hay tìm nghiệm tối ưu.

### 7.4 Ba ca trên cùng một miền khả thi

![Miền khả thi trong góc phần tư I bị chặn bởi hai nửa mặt phẳng $2x_1+x_2\ge1$ và $x_1+3x_2\ge1$; lần lượt thêm đường mức của từng mục tiêu.](img/lec-02/shared-feasible.svg)

Cùng một miền khả thi, ba mục tiêu khác nhau cho ba kết luận khác nhau. Đặt

$$
\mathcal F=\{x\in\mathbb R_+^2:\ 2x_1+x_2\ge1,\ x_1+3x_2\ge1\}.
$$

Hai đường biên cắt nhau tại giao của $2x_1+x_2=1$ và $x_1+3x_2=1$, tức $x=(2/5,\,1/5)$.

**Ca a (LP):** $\min_{x\in\mathcal F}x_1+x_2$. Nhân bất đẳng thức thứ nhất với $2/5$ và thứ hai với $1/5$ rồi cộng:

$$
x_1+x_2=\tfrac25(2x_1+x_2)+\tfrac15(x_1+3x_2)\ge\tfrac25+\tfrac15=\tfrac35.
$$

Dấu bằng đạt tại $(2/5,\,1/5)$, thuộc $\mathcal F$. Vậy $x^*=(2/5,\,1/5)$, $p^*=3/5$. Đây là kỹ thuật chứng nhận bằng tổ hợp lồi của các ràng buộc, rất đáng luyện.

**Ca c (LP):** $\min_{x\in\mathcal F}x_1$. Vì $x_1\ge0$ trên $\mathcal F$ và điểm $(0,\,1)$ khả thi ($2\cdot0+1\ge1$, $0+3\ge1$), nên $p^*=0$ với tập nghiệm $\{(0,\,x_2):\ x_2\ge1\}$ — một tia, không phải một điểm.

**Ca e (QP):** $\min_{x\in\mathcal F}x_1^2+9x_2^2$. Dùng bất đẳng thức Cauchy–Schwarz dạng

$$
x_1^2+9x_2^2\ \ge\ \tfrac12(x_1+3x_2)^2\ \ge\ \tfrac12,
$$

vì $x_1+3x_2\ge1$ trên $\mathcal F$. Dấu bằng cần $x_1=3x_2$ và $x_1+3x_2=1$, cho $x^*=(1/2,\,1/6)$; kiểm tra ràng buộc còn lại: $2\cdot\tfrac12+\tfrac16=7/6\ge1$. Nghiệm duy nhất vì Hessian $\operatorname{diag}(2,18)\succ0$.

Bài học: cùng một miền, vị trí và số nghiệm do độ cong và hướng của mục tiêu quyết định. Ca c có vô số nghiệm, ca a và ca e có nghiệm duy nhất.

### 7.5 GP và phép đổi log

**Bài trung bình cộng – trung bình nhân (AM–GM).** Với $x,y>0$ và $x+y\le4$, tìm $\min (xy)^{-1}$. Viết lại ràng buộc dưới dạng chuẩn của quy hoạch hình học (GP): $0{,}25x+0{,}25y\le1$. Bất đẳng thức trung bình–cộng–trung bình–nhân cho

$$
\sqrt{xy}\le\frac{x+y}{2}\le2
\quad\Rightarrow\quad
xy\le4
\quad\Rightarrow\quad
(xy)^{-1}\ge\tfrac14.
$$

Dấu bằng cần đồng thời $x=y$ và $x+y=4$, tức $x=y=2$. Vậy $p^*=1/4$. Chú ý hai điểm. Thứ nhất, ví dụ này vốn đã lồi theo $x,y$: Hessian của $(xy)^{-1}$ khả định dương trên miền dương, nên đổi log không bắt buộc để có tính lồi ở đây. Thứ hai, nếu lấy log mục tiêu, giá trị mới là $-\log 4$, không phải $1/4$ — hai bài toán tương đương về nghiệm nhưng giá trị tối ưu khác nhau.

**Bài đổi log.** Xét

$$
\min_{u,v>0}\ 2u^{-1}v^{-1}+uv^{-2}
\quad\text{sao cho}\quad
0{,}5u+0{,}25v\le1.
$$

Đặt $y_1=\log u$, $y_2=\log v$. Mỗi đơn thức $cu^av^b$ trở thành $\exp(\log c+ay_1+by_2)$, nên mục tiêu mới là

$$
\operatorname{lse}\bigl(\log 2-y_1-y_2,\ y_1-2y_2\bigr),
$$

và ràng buộc trở thành

$$
\operatorname{lse}\bigl(\log 0{,}5+y_1,\ \log 0{,}25+y_2\bigr)\le0,
$$

trong đó $\operatorname{lse}$ là hàm log-tổng-số-mũ. Hàm $\operatorname{lse}$ lồi, và hợp của nó với ánh xạ affine vẫn lồi, nên bài toán sau đổi log là bài toán lồi, tương đương về nghiệm với bài toán gốc qua ánh xạ $u=e^{y_1}$, $v=e^{y_2}$. Nếu biết giá trị tối ưu mới $\tilde p^*$ hữu hạn, khôi phục giá trị gốc bằng $p^*=e^{\tilde p^*}$.

Ba lỗi thường gặp khi đổi log: bỏ hằng số $\log 2$ (hoặc $\log 0{,}5$, $\log 0{,}25$) trong số mũ; biến log của một tổng thành tổng các log; khẳng định hai giá trị tối ưu bằng nhau. Câu hỏi kiểm tra: thay miền bằng $x,y\ge0$ (cho phép bằng $0$) thì còn đổi log trực tiếp được không? Không — log cần biến dương nghiêm ngặt.

## 8. Nón tổng quát và chuẩn phổ

### 8.1 Thứ tự do nón sinh

Trong một không gian hữu hạn chiều $E$, cho nón $K$ lồi, đóng, nhọn và có phần trong khác rỗng. Định nghĩa thứ tự

$$
u\preceq_K v\quad\Longleftrightarrow\quad v-u\in K.
$$

Tính "nhọn" nghĩa là $K\cap(-K)=\{0\}$; đây chính là điều bảo đảm tính phản đối xứng: nếu $u\preceq_Kv$ và $v\preceq_Ku$ thì $v-u\in K\cap(-K)$, nên $u=v$. Hai ví dụ chuẩn:

- Với $E=\mathbb R^q$, $K=\mathbb R_+^q$: $u\preceq_Kv$ nghĩa là $u_i\le v_i$ với mọi $i$ — so theo từng thành phần.
- Với $E=\mathbb S^r$ (ma trận đối xứng cấp $r$), $K=\mathbb S_+^r$: $X\preceq Y\iff Y-X\succeq0$. Đây là thứ tự PSD, không phải so từng phần tử. Nhắc lại định nghĩa: $M\succeq0\iff z^TMz\ge0$ với mọi $z\in\mathbb R^r$.

::: example
**Phản ví dụ quan trọng.** Ma trận $M=\begin{bmatrix}1&2\\2&1\end{bmatrix}$ có mọi phần tử dương, nhưng không PSD: với $z=(1,-1)$, $z^TMz=1-4+1=-2<0$. Trị riêng của $M$ là $3$ và $-1$. Vậy "dương từng phần tử" và "khả định dương" là hai khái niệm khác nhau, và thứ tự PSD không so từng phần tử.
:::

Trong cả hai ví dụ, mọi phép trừ phải cùng kiểu và cùng kích thước: trừ hai vector cùng chiều, hoặc trừ hai ma trận đối xứng cùng cấp.

### 8.2 Một khuôn chung cho LP và SDP

Cho dữ liệu $c\in\mathbb R^n$, $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$, một ánh xạ tuyến tính $G:\mathbb R^n\to E$ và $h\in E$. Dạng tối ưu nón là

$$
\min\ c^Tx
\quad\text{sao cho}\quad
Ax=b,\quad h-Gx\in K.
$$

Bài toán này lồi vì nghịch ảnh của một nón lồi qua ánh xạ affine là tập lồi. Chọn nón khác nhau cho ra các lớp quen thuộc:

- $K=\mathbb R_+^m$: điều kiện $h-Gx\in K$ chính là $Gx\le h$ theo từng thành phần — thu được LP.
- $K=\mathbb S_+^r$: ánh xạ affine nhận giá trị ma trận $h-Gx$ phải PSD — thu được quy hoạch nửa xác định (SDP) với ràng buộc dạng bất đẳng thức ma trận tuyến tính (LMI).

Hai lưu ý về kích thước và cách khớp khuôn. Biến $n$ là số biến quyết định; $r$ là cấp ma trận, không nhất thiết bằng $n$. Nếu ràng buộc có dạng $F(x)=F_0+\sum_i x_iF_i\succeq0$, chọn $h=F_0$ và $Gx=-\sum_i x_iF_i$ để khớp khuôn; từng ma trận $F_i$ chỉ cần đối xứng, không cần PSD. Câu hỏi kiểm tra: thay $F(x)$ bằng $F_0+x_1x_2F_1$ có còn tự động là SDP không? Không — ánh xạ đã không còn affine theo $x$.

### 8.3 Chặn chuẩn phổ bằng LMI

Với $A\in\mathbb R^{m\times n}$ và $t\in\mathbb R$:

$$
\lVert A\rVert_2\le t
\quad\Longleftrightarrow\quad
\begin{bmatrix}tI_m&A\\A^T&tI_n\end{bmatrix}\succeq0.
$$

Nếu $A=A(x)$ affine theo biến $x$, vế phải là một LMI cấp $m+n$, nên mọi bài toán có ràng buộc chặn chuẩn phổ trên ma trận affine đều viết được dưới dạng SDP. Nhắc lại: chuẩn phổ là độ khuếch đại Euclid lớn nhất $\sup_{z\ne0}\lVert Az\rVert_2/\lVert z\rVert_2$, không phải chuẩn Frobenius.

Với $A$ đối xứng, cần cẩn thận: $A\preceq tI$ chỉ chặn trị riêng lớn nhất $\lambda_{\max}$; để chặn chuẩn phổ cần cả hai chiều $-tI\preceq A\preceq tI$.

::: example
**Đối chứng vì sao không được bỏ dấu trị tuyệt đối.** Ma trận $\operatorname{diag}(-10,1)$ thỏa $\operatorname{diag}(-10,1)\preceq I$, nhưng chuẩn phổ của nó bằng $10$. Chỉ chặn trên bằng $I$ thì không đủ; trị riêng âm lớn về độ lớn vẫn làm chuẩn phổ lớn.
:::

::: example
**Bài tập tính được.** Tìm $\min_{x\in\mathbb R}\lVert\operatorname{diag}(x,\,3-x)\rVert_2$. Chuẩn phổ của ma trận đường chéo là trị tuyệt đối lớn nhất của các phần tử đường chéo:

$$
\max\{|x|,\ |3-x|\}\ \ge\ \frac{|x|+|3-x|}{2}\ \ge\ \frac{|x+3-x|}{2}=\frac32.
$$

Bất đẳng thức đầu là trung bình; dấu bằng chỉ khi $|x|=|3-x|$, tức $x=3/2$. Vậy $t^*=3/2$. LMI tương ứng là ma trận khối $4\times4$ với hai khối đường chéo $tI_2$ và khối ngoài đường chéo $\operatorname{diag}(x,\,3-x)$.
:::

### 8.4 Chứng minh công thức Schur cho cả ba trường hợp của $t$

Đặt

$$
M=\begin{bmatrix}tI_m&A\\A^T&tI_n\end{bmatrix}.
$$

Mục tiêu: chứng minh $M\succeq0\iff\lVert A\rVert_2\le t$ với mọi $t\in\mathbb R$.

::: proof
**Mục tiêu.** Chứng minh tương đương trên cho ba trường hợp $t>0$, $t=0$, $t<0$.

**Ý tưởng.** Với $t>0$, dùng bổ đề Schur với khối khả nghịch. Với $t\le0$, xét trực tiếp các phần tử của $M$.

**Bước 1, $t>0$.** Bổ đề Schur cho khối $B\succ0$ nói rằng

$$
\begin{bmatrix}B&C\\C^T&D\end{bmatrix}\succeq0
\iff
D-C^TB^{-1}C\succeq0.
$$

Áp dụng với $B=tI_m\succ0$, $C=A$, $D=tI_n$:

$$
M\succeq0
\iff
tI_n-t^{-1}A^TA\succeq0
\iff
A^TA\preceq t^2I_n
\iff
\lVert A\rVert_2\le t.
$$

Bước cuối dùng $\lVert A\rVert_2^2=\lambda_{\max}(A^TA)$ và $t>0$ để bỏ căn mà không đổi chiều bất đẳng thức.

**Bước 2, $t=0$.** Khi $t=0$, $M=\begin{bmatrix}0&A\\A^T&0\end{bmatrix}$. Nếu $M\succeq0$ thì mọi ma trận con chính cấp 2 phải có định thức không âm; với cặp chỉ số $(i,j)$,

$$
\det\begin{bmatrix}0&a_{ij}\\a_{ij}&0\end{bmatrix}=-a_{ij}^2\ge0
\quad\Rightarrow\quad
a_{ij}=0.
$$

Vậy $M\succeq0$ buộc $A=0$. Điều kiện chuẩn $\lVert A\rVert_2\le0$ cũng buộc $A=0$. Hai chiều khớp nhau.

**Bước 3, $t<0$.** Phần tử đường chéo $t$ của $M$ âm, nên $M$ không thể PSD; đồng thời $\lVert A\rVert_2\ge0>t$. Cả hai điều kiện đều sai, tương đương vẫn đúng.

**Kết luận.** Tương đương đúng với mọi $t\in\mathbb R$. Chú ý chỗ nào cần $t>0$: phép lấy nghịch đảo $t^{-1}$ và việc so sánh cận chuẩn với $t$ trong bước 1. Không dùng $(tI)^{-1}$ tại $t=0$, và không cần Schur suy rộng bằng giả nghịch đảo.
:::

## 9. Tối ưu tựa lồi và chia đôi

### 9.1 Hàm tựa lồi qua tập mức dưới

Cho miền lồi $D$ và hàm $f:D\to\mathbb R$. Hàm $f$ là **tựa lồi** nếu tập mức dưới

$$
S_t=\{x\in D:\ f(x)\le t\}
$$

lồi với mọi $t\in\mathbb R$. Trước khi chốt định nghĩa, hãy nhìn một ví dụ mà tính lồi thất bại nhưng các tập mức vẫn lồi.

::: example
**Tựa lồi nhưng không lồi.** Lấy $f(x)=x^3$ trên $D=[-1,1]$. Hàm này tăng nghiêm, nên

$$
S_t=
\begin{cases}
\varnothing,&t<-1,\\
[-1,\sqrt[3]{t}],&-1\le t<1,\\
[-1,1],&t\ge1.
\end{cases}
$$

Mỗi $S_t$ là một khoảng hoặc tập rỗng — đều lồi (tập rỗng cũng là tập lồi). Vậy $f$ tựa lồi. Nhưng $f''(x)=6x$ đổi dấu trên $[-1,1]$, nên $f$ không lồi.
:::

Ví dụ trên cho thấy trực quan: tính lồi khống chế cả độ cao của dây cung; tính tựa lồi chỉ yêu cầu điểm trên đoạn nối không cao hơn đầu mút cao hơn. Vì vậy các "vùng đạt mức $t$" vẫn lồi dù đồ thị không có độ cong lồi ở mọi nơi. Mọi hàm lồi đều tựa lồi, chiều ngược lại sai, và tính lồi của một vài tập mức không đủ: điều kiện phải đúng với mọi $t\in\mathbb R$.

### 9.2 Định lý: hai đặc trưng tương đương của tính tựa lồi

**Giả thiết.** $D$ lồi và $f:D\to\mathbb R$.

**Kết luận.** Hai mệnh đề sau tương đương:

1. $S_t=\{x\in D:f(x)\le t\}$ lồi với mọi $t\in\mathbb R$.
2. Với mọi $x,y\in D$ và $\theta\in[0,1]$,

$$
f(\theta x+(1-\theta)y)\le\max\{f(x),f(y)\}.
$$

::: proof
**Mục tiêu.** Chứng minh (1) $\Rightarrow$ (2) và (2) $\Rightarrow$ (1).

**Ý tưởng.** Chiều thuận: chọn mức $t$ đúng bằng giá trị lớn hơn của hai đầu mút, rồi dùng tính lồi của $S_t$. Chiều đảo: lấy hai điểm trong cùng một tập mức và dùng bất đẳng thức cực đại.

**Bước 1, (1) $\Rightarrow$ (2).** Giả sử mọi $S_t$ lồi. Chọn $x,y\in D$ và đặt $t=\max\{f(x),f(y)\}$. Khi đó $x,y\in S_t$. Do $S_t$ lồi, $\theta x+(1-\theta)y\in S_t$, tức

$$
f(\theta x+(1-\theta)y)\le t=\max\{f(x),f(y)\}.
$$

**Bước 2, (2) $\Rightarrow$ (1).** Giả sử bất đẳng thức cực đại đúng với mọi $x,y,\theta$. Chọn một mức $t$ và hai điểm $x,y\in S_t$, tức $f(x)\le t$ và $f(y)\le t$. Khi đó

$$
f(\theta x+(1-\theta)y)\le\max\{f(x),f(y)\}\le t,
$$

nên mọi tổ hợp lồi của $x,y$ vẫn thuộc $S_t$. Vậy $S_t$ lồi với mọi $t$.
:::

### 9.3 Ví dụ phân thức: không lồi nhưng kiểm tra mức là affine

Lấy $x=(x_1,x_2)\in C=[0,2]\times[1,2]$ và mục tiêu $f(x)=x_1/x_2$. Mẫu số luôn dương trên $C$. Với mỗi $t$ cố định:

$$
f(x)\le t
\quad\Longleftrightarrow\quad
x_1-tx_2\le0,
$$

vì $x_2>0$ cho phép nhân hai vế với $x_2$ mà không đổi chiều. Giao với $C$ là bài toán khả thi với ràng buộc affine, nên mọi tập mức lồi: $f$ tựa lồi trên $C$.

Tính lồi thì thất bại. Hessian của $f$ là

$$
\nabla^2f=
\begin{bmatrix}
0&-x_2^{-2}\\
-x_2^{-2}&2x_1x_2^{-3}
\end{bmatrix},
$$

có định thức $-x_2^{-4}<0$ ở nội miền, nên $f$ không lồi.

::: example
**Kiểm tra mức cụ thể.** Ở $t=1/2$, bài kiểm tra là: tồn tại $x$ với $0\le x_1\le2$, $1\le x_2\le2$, $x_1-\tfrac12x_2\le0$. Khả thi, chẳng hạn $(0,1)$. Giá trị tối ưu trên $C$: vì $x_1\ge0$ và $x_2\ge1$, ta có $f\ge0$, và $p^*=0$ đạt được với mọi $(0,x_2)$, $1\le x_2\le2$.
:::

Khái quát hóa: với mẫu $c^Tx+d>0$ trên miền khả thi,

$$
\frac{a^Tx+b}{c^Tx+d}\le t
\quad\Longleftrightarrow\quad
(a-tc)^Tx+b-td\le0.
$$

Nếu mẫu đổi dấu trên miền, không được nhân giữ nguyên chiều. Ví dụ này là mô hình số để minh họa tính tựa lồi, chưa phải một ứng dụng thực tế.

### 9.4 Chia đôi trên giá trị mục tiêu

Ý tưởng: khi mục tiêu chỉ tựa lồi, ta không tối thiểu hóa trực tiếp mà hỏi ngược — với một mức $t$, tập $\{x:f(x)\le t\}$ có khả thi không? Mỗi câu trả lời cắt đôi khoảng chứa giá trị tối ưu.

**Giả thiết.** $f$ tựa lồi và với mỗi $t$ có một biểu diễn

$$
f(x)\le t
\quad\Longleftrightarrow\quad
\phi_t(x)\le0,
$$

trong đó $\phi_t$ lồi theo $x$ khi cố định $t$, và bài toán $\phi_t(x)\le0$ trên miền khả thi được giải chính xác. Bắt đầu với $l_0\le p^*\le u_0<\infty$, một điểm khả thi $\hat x_0$ với $f(\hat x_0)\le u_0$, và dung sai $\varepsilon>0$.

**Thuật toán.** Đặt $(l,u,\hat x)=(l_0,u_0,\hat x_0)$. Trong khi $u-l>\varepsilon$:

1. Đặt $t=(l+u)/2$; gọi kiểm tra mức $t$.
2. Nếu có điểm $x_t$ khả thi: cập nhật $(u,\hat x)\leftarrow(t,x_t)$; nếu vô nghiệm: $l\leftarrow t$.

Trả về $[l,u]$ và $\hat x$. Lưu ý bước 2 lưu cả điểm khả thi ứng với cận trên, không chỉ trả một cận số — nhờ vậy đầu ra thỏa $0\le f(\hat x)-p^*\le\varepsilon$, tức là một nghiệm gần tối ưu chứ không chỉ một khoảng giá trị.

::: example
**Ba bước chia đôi tính bằng tay.** Xét $\min_{x\in[0,2]}f(x)=\dfrac{x^2+1}{x+2}$. Vì $x+2>0$ trên miền,

$$
f(x)\le t
\quad\Longleftrightarrow\quad
\phi_t(x)=x^2+1-t(x+2)\le0,
$$

và $\phi_t$ là bậc hai lồi theo $x$. Khởi tạo $[l_0,u_0]=[0,1]$ với điểm khả thi $\hat x_0=0$, $f(0)=1/2\le u_0$.

- $t=0{,}5$: $\phi_t(x)=x^2-0{,}5x$ triệt tiêu tại $0$ và $0{,}5$, nên $S_t=[0,\,0{,}5]\ne\varnothing$; cập nhật $[0,\,0{,}5]$.
- $t=0{,}25$: $\phi_t(x)=x^2-0{,}25x+0{,}5$ có biệt thức $0{,}0625-2<0$, vô nghiệm; cập nhật $[0{,}25,\,0{,}5]$.
- $t=0{,}375$: $\phi_t(x)=x^2-0{,}375x+0{,}25$ có biệt thức $0{,}140625-1<0$, vô nghiệm; cập nhật $[0{,}375,\,0{,}5]$.

Mỗi kiểm tra ở đây chỉ cần số hữu hạn phép tính vô hướng: $\phi_t=x^2-tx+1-2t$ có điểm cực tiểu trên đoạn tại $x_t=\operatorname{clip}(t/2,\,0,\,2)$, và với $t\in[0,1]$ giá trị nhỏ nhất là $1-2t-t^2/4$. Đối chiếu bằng đạo hàm: $x^*=\sqrt5-2\approx0{,}2361$ và $p^*=2\sqrt5-4\approx0{,}4721$, nằm trong khoảng cuối $[0{,}375,\,0{,}5]$. Lưu ý ví dụ này cũng lồi vì $f''(x)=10/(x+2)^3>0$; nó được dùng để luyện thao tác chia đôi, không phải để minh họa tính tựa lồi bắt buộc.
:::

### 9.5 Bất biến, số lần gọi và lưu ý về infimum

::: proof
**Mục tiêu.** Chứng minh bất biến $l\le p^*\le u$, $f(\hat x)\le u$, và độ rộng giảm một nửa mỗi vòng.

**Ý tưởng.** Xét hai trường hợp của phép thử mức, dùng định nghĩa $p^*=\inf_{z\in D}f(z)$.

**Bước 1, phép thử khả thi.** Nếu $S_t\ne\varnothing$, tồn tại $x$ với $f(x)\le t$, nên $p^*\le t$. Cập nhật $u\leftarrow t$ và $\hat x\leftarrow x_t$ giữ nguyên cả hai phần của bất biến.

**Bước 2, phép thử vô nghiệm.** Nếu $S_t=\varnothing$, mọi $x\in D$ thỏa $f(x)>t$, nên $p^*\ge t$. Cập nhật $l\leftarrow t$ vẫn giữ bất biến.

**Bước 3, độ rộng.** Trong cả hai trường hợp, một đầu mút được thay bằng trung điểm, nên $u_{\text{mới}}-l_{\text{mới}}=(u-l)/2$. Sau $k$ vòng, độ rộng không quá $(u_0-l_0)/2^k$.
:::

Hệ quả về số lần gọi: nếu $u_0-l_0\le\varepsilon$ thì $N=0$; nếu không,

$$
N=\left\lceil\log_2\frac{u_0-l_0}{\varepsilon}\right\rceil.
$$

Tổng chi phí là $\sum_{k=1}^N T_{\text{feas}}(t_k)$ cộng các phép cập nhật vô hướng, trong đó $T_{\text{feas}}(t)$ là chi phí giải bài toán khả thi ở mức $t$; không có con số chung cho mọi bài toán.

Hai lưu ý tinh tế. Thứ nhất, khi phép thử vô nghiệm ở mức $t$, chỉ suy ra $p^*\ge t$, không luôn suy ra $p^*>t$: nếu infimum không đạt được, dấu bằng có thể xảy ra. Ví dụ $f(x)=x$ trên miền $x>0$: mức $t=0$ vô nghiệm nhưng $p^*=0$. Bất biến dùng khoảng đóng nên vẫn đúng. Thứ hai, bảo đảm của thuật toán là về giá trị: $0\le f(\hat x)-p^*\le\varepsilon$. Không được kết luận $\lVert\hat x-x^*\rVert\le\varepsilon$ — khoảng cách tới nghiệm không được khống chế bởi chia đôi giá trị. Cũng không được coi kết quả "chưa xác định" của bộ giải số là chứng minh vô nghiệm; dung sai và bộ giải số thuộc bài sau.

Câu hỏi kiểm tra: nếu $u_0-l_0=8$ và cần độ rộng không quá $1/32$, cần ít nhất bao nhiêu vòng? Đáp án: $\lceil\log_2 256\rceil=8$ vòng.

### 9.6 Tự kiểm tra: dạng chuẩn hay biểu diễn tương đương?

Với mỗi bài toán, nêu miền, kết luận độ cong và phép cải dạng nếu dùng:

1. $\min_{x\in\mathbb R}\max\{x,\ -x+2\}$.
2. $\min_{x\in[-1,1]}x^3$.
3. $\min_{x\in\mathbb R}x^2$ với $(x-1)^2=0$.

Đáp án. Bài 1: hàm cực đại của hai hàm affine là lồi; đưa về dạng chuẩn LP bằng biến phụ $t$: $\min t$ với $x\le t$, $-x+2\le t$. Nghiệm $x^*=1$, $p^*=1$; khôi phục $x$ từ nghiệm $(x,t)$. Bài 2: tựa lồi (mục 9.1) nhưng không lồi trên miền đã cho; hàm tăng nghiêm nên $x^*=-1$, $p^*=-1$. Bài 3: đẳng thức phi tuyến không thuộc dạng chuẩn, nhưng tương đương với $x=1$, cho một QP lồi tầm thường với $x^*=1$, $p^*=1$. Bài học: một biểu thức nằm ngoài khuôn không tự kết luận mô hình không thể lồi hóa.

## 10. Nhiều mục tiêu và biên Pareto

### 10.1 Khi hai tiêu chí xung đột

![Đường đạt được từ $(0,4)$ qua $(1,1)$ đến $(4,0)$ trong mặt phẳng mục tiêu; hướng tốt hơn là về trái và xuống.](img/lec-02/pareto-front.svg)

Cho biến $x\in[0,2]$ và hai tiêu chí cùng cần giảm:

$$
\Phi_1(x)=x^2,\qquad \Phi_2(x)=(x-2)^2.
$$

Tiêu chí 1 đạt nhỏ nhất riêng tại $x=0$, tiêu chí 2 tại $x=2$ — không có một tham số duy nhất làm cả hai đạt giá trị nhỏ nhất riêng. Hơn nữa, nếu $0\le x<y\le2$ thì $\Phi_1(x)<\Phi_1(y)$ nhưng $\Phi_2(x)>\Phi_2(y)$: cải thiện một tiêu chí tất yếu làm xấu tiêu chí kia. Chưa có một đáp án tốt nhất nếu chưa có ưu tiên hoặc giới hạn trên từng tiêu chí.

### 10.2 Phần tử nhỏ nhất, điểm tối tiểu và quan hệ trội

Cho tập khả thi $\mathcal F$ và ánh xạ mục tiêu $\Phi:\mathcal F\to\mathbb R^q$. Tập giá trị đạt được là $\mathcal O=\Phi(\mathcal F)$. Với $y^*\in\mathcal O$:

- $y^*$ là **phần tử nhỏ nhất** nếu $y^*\preceq y$ với mọi $y\in\mathcal O$ — nhỏ hơn hoặc bằng mọi điểm khác.
- $y^*$ là **tối tiểu** nếu không tồn tại $y\in\mathcal O$, $y\ne y^*$, với $y\preceq y^*$ — chỉ cần không bị điểm nào trội.

Với so sánh theo từng thành phần, $y$ **trội** $y^*$ khi $y_i\le y^*_i$ với mọi $i$ và $y_i<y^*_i$ với ít nhất một $i$. Nghiệm $x^*\in\mathcal F$ là **Pareto** nếu $\Phi(x^*)$ tối tiểu trong $\mathcal O$.

Trong ví dụ hai bình phương ở mục 10.1, mọi $x\in[0,2]$ đều Pareto, nhưng không có phần tử nhỏ nhất: muốn tốt hơn ở tiêu chí 1 phải hy sinh tiêu chí 2 và ngược lại. Hai nghiệm quyết định khác nhau có thể cùng một giá trị Pareto, vì Pareto là thuộc tính của tập giá trị và $\Phi$ có thể không đơn ánh.

### 10.3 Vô hướng hóa bằng trọng số

Cách đưa ưu tiên vào bài toán: thay bài toán nhiều mục tiêu bằng

$$
\min_{x\in\mathcal F}\ \sum_{i=1}^q w_i\Phi_i(x).
$$

Trong ví dụ hai bình phương:

$$
\min_{0\le x\le2}\ \lambda x^2+(1-\lambda)(x-2)^2.
$$

Đạo hàm $2x-4(1-\lambda)=0$ cho $x^*(\lambda)=2(1-\lambda)$; hai đầu $\lambda=1,0$ lần lượt cho $x^*=0,2$. Ví dụ $\lambda=1/4$ cho $x^*=1{,}5$ với $\Phi(x^*)=(2{,}25,\,0{,}25)$ và giá trị tổng có trọng số $0{,}75$.

**Định lý (chiều thuận).** Giả thiết: $\mathcal F$ khác rỗng, $\Phi:\mathcal F\to\mathbb R^q$ và $w_i>0$ với mọi $i$. Kết luận: mọi nghiệm của bài toán vô hướng hóa là một điểm Pareto.

::: proof
**Mục tiêu.** Chứng minh không có điểm khả thi nào trội nghiệm $x^*$.

**Ý tưởng.** Phản chứng: nếu có điểm trội, tổng có trọng số dương phải giảm nghiêm, mâu thuẫn với tính tối ưu.

**Bước 1.** Giả sử có $y\in\mathcal F$ trội $x^*$: $\Phi_i(y)\le\Phi_i(x^*)$ với mọi $i$, và bất đẳng thức nghiêm với ít nhất một chỉ số.

**Bước 2.** Nhân mỗi bất đẳng thức với $w_i>0$ rồi cộng:

$$
\sum_{i=1}^q w_i\Phi_i(y)<\sum_{i=1}^q w_i\Phi_i(x^*),
$$

vì mọi trọng số dương và ít nhất một hiệu số âm được nhân với trọng số dương.

**Bước 3.** Điều này mâu thuẫn với $x^*$ là nghiệm của bài toán vô hướng hóa. Vậy không có điểm nào trội $x^*$.
:::

**Chiều đảo cho bài toán lồi.** Nếu $\mathcal F$ lồi, từng $\Phi_i$ lồi, thì mỗi điểm Pareto là nghiệm tối ưu của bài toán vô hướng hóa với một trọng số $w\ge0$, $w\ne0$; có thể cần trọng số bằng $0$. Tập cần chứng minh lồi để có chiều đảo là

$$
\mathcal U=\Phi(\mathcal F)+\mathbb R_+^q,
$$

không phải $\mathcal O=\Phi(\mathcal F)$. Trong ví dụ hai bình phương, $(0,4)$ và $(4,0)$ thuộc $\mathcal O$ nhưng $(2,2)$ không thuộc $\mathcal O$, nên $\mathcal O$ không lồi.

::: proof
**Mục tiêu.** Với $\mathcal F$ lồi và từng $\Phi_i$ lồi, chứng minh $\mathcal U$ lồi; từ đó suy ra mọi điểm Pareto là nghiệm của bài toán vô hướng hóa với một trọng số $w\ge0$, $w\ne0$.

**Bước 1, $\mathcal U$ lồi.** Lấy $y=\Phi(x)+r$ và $z=\Phi(x')+r'$ với $x,x'\in\mathcal F$, $r,r'\in\mathbb R_+^q$, và $x_\theta=\theta x+(1-\theta)x'$ với $\theta\in[0,1]$. Vì $\mathcal F$ lồi nên $x_\theta\in\mathcal F$; vì từng $\Phi_i$ lồi nên $\theta\Phi_i(x)+(1-\theta)\Phi_i(x')\ge\Phi_i(x_\theta)$; vì $\mathbb R_+^q$ lồi nên $\theta r+(1-\theta)r'\in\mathbb R_+^q$. Cộng lại:

$$
\theta y+(1-\theta)z-\Phi(x_\theta)
=\theta r+(1-\theta)r'+\theta\Phi(x)+(1-\theta)\Phi(x')-\Phi(x_\theta)\in\mathbb R_+^q,
$$

tức $\theta y+(1-\theta)z\in\Phi(x_\theta)+\mathbb R_+^q\subseteq\mathcal U$. Vậy $\mathcal U$ lồi.

**Bước 2, tách hai tập lồi.** Gọi $y^*=\Phi(x^*)$ với $x^*$ Pareto. Xét hai tập $\mathcal U-y^*=\{y-y^*:\ y\in\mathcal U\}$ và $-\mathbb R_{++}^q$ (các véc-tơ có mọi thành phần âm). Tập thứ nhất là phép tịnh tiến của tập lồi $\mathcal U$, nên lồi; tập thứ hai lồi và mở. Chúng rời nhau: nếu $y-y^*\in-\mathbb R_{++}^q$ với $y\in\mathcal U$, viết $y=\Phi(x)+r$, $r\in\mathbb R_+^q$, thì $\Phi(x)\preceq y\prec y^*$, tức $x$ trội $x^*$ — trái với $x^*$ Pareto.

**Bước 3, siêu phẳng tách.** Hai tập lồi rời nhau, một tập mở, được tách bởi một siêu phẳng: tồn tại $w\ne0$ và $\beta\in\mathbb R$ sao cho $w^T(y-y^*)\ge\beta\ge w^Tr$ với mọi $y\in\mathcal U$ và $r\in-\mathbb R_{++}^q$. Vì $0\in\mathcal U-y^*$ nên $\beta\le0$; cho $r\to0$ từ miền âm nghiêm ngặt thì $\beta\ge0$. Do đó $\beta=0$. Điều thứ hai, áp dụng cho mọi $r$ âm nghiêm ngặt, buộc $w_i\ge0$ với mọi $i$; và $w\ne0$. Với mọi $x\in\mathcal F$, điểm $\Phi(x)\in\mathcal U$ nên

$$
w^T\Phi(x)\ge w^T\Phi(x^*),
$$

nghĩa là $x^*$ đạt giá trị nhỏ nhất của $\sum_i w_i\Phi_i$ trên $\mathcal F$.
:::

**Phản ví dụ khi một trọng số bằng $0$.** Trọng số không âm khác $0$ không bảo đảm mọi nghiệm vô hướng hóa là Pareto. Lấy $\mathcal F=[0,1]$, $\Phi(x)=(0,\,x)$ và $w=(1,0)$. Bài toán vô hướng hóa là $\min 0$, mọi $x\in[0,1]$ đều tối ưu, nhưng chỉ $x=0$ là Pareto — mọi $x>0$ bị $(0,0)$ trội. Vậy khi cho một trọng số bằng $0$, không được tự kết luận mọi nghiệm đều Pareto.

Câu hỏi kiểm tra: trong bốn điểm $(1,4)$, $(2,2)$, $(4,1)$, $(3,3)$, điểm nào bị trội? Đáp án: $(3,3)$ bị $(2,2)$ trội (cả hai thành phần nhỏ hơn); ba điểm còn lại không trội lẫn nhau. Nhận ra điểm không bị trội và chọn một điểm bằng ưu tiên là hai công việc khác nhau. Cũng cần nhớ: đơn vị và cách chuẩn hóa hai tiêu chí ảnh hưởng trực tiếp đến ý nghĩa của trọng số.

## Tài liệu đối chiếu

- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Chương 4, §4.2.4 (cải dạng và biến dư), §4.2.5 (chia đôi trên giá trị mục tiêu), §4.6 (dạng tối ưu nón), §4.7 (nhiều mục tiêu, §4.7.4 vô hướng hóa); §3.4 cho hàm tựa lồi; §2.4 cho nón và thứ tự. Bản PDF chính thức: [Sách Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf); bản dùng trong học kỳ: [bản giáo trình cục bộ](../sources/bv_cvxbook.pdf).
- MOSEK Modeling Cookbook, §6.2.4, công thức (6.15) về chặn chuẩn phổ bằng LMI: [MOSEK Modeling Cookbook](https://docs.mosek.com/modeling-cookbook/sdo.html).
- Nguyễn Bích Vân, *Chương 3: Các bài toán tối ưu lồi*, phần 2, trang PDF 2–16 (năm chưa xác minh); các giả thiết về ma trận PSD được đối chiếu theo Boyd và Vandenberghe. Bản dùng trong học kỳ: [Chương 3 phần 2](../sources/Chương%203%20Các%20bài%20toán%20tối%20ưu%20lồi%20phần%202.pdf).
- Bài tập tuần 3, các bài về dạng tối ưu nón và nhiều mục tiêu: [Bài tập tuần 3](../sources/Bài%20tập%20tuần%203.pdf).
- MIT 6.079, Boyd (2009), bài giảng 4 (dạng tối ưu nón, nhiều mục tiêu): [Bài giảng MIT lec04](../sources/Lecture4-MIT.pdf).
- Đề cương học phần UET.AI2012, Buổi 2, các chuẩn đầu ra LLO3 và CLO1.
