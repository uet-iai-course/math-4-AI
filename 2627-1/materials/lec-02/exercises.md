# Bài tập Bài 02: Các bài toán tối ưu lồi

Kiến thức chuẩn bị: tập lồi, hàm lồi, các phép cải dạng; quy hoạch tuyến tính (LP), quy hoạch bậc hai (QP), quy hoạch bậc hai có ràng buộc bậc hai (QCQP), quy hoạch hình học (GP) và quy hoạch nửa xác định (SDP). Bài 1–4 rèn nhận dạng và giải thích; bài 5–10 rèn tính toán và chứng minh; bài 11–12 rèn mô hình hóa trong AI. Bài 13–14 dùng phần mở rộng về chuẩn phổ, tối ưu tựa lồi và nhiều mục tiêu, chỉ làm sau khi đọc phần tương ứng trong ghi chú bài giảng. Các số liệu đều là ví dụ minh họa.

Nguồn: Boyd và Vandenberghe (2004), *Convex Optimization*, chương 4 và §A.5.5 ([giáo trình cục bộ](../sources/bv_cvxbook.pdf)); đối chiếu [Bài tập tuần 3](../sources/Bài%20tập%20tuần%203.pdf). Các bài dưới đây được viết lại theo mô hình và số liệu đã học.

## Mức 1: Nhận dạng và giải thích

### Bài 1. Phân vai dữ liệu, biến và miền

Cho mô hình hồi quy có ràng buộc

$$\min_{w\in C}\lVert Xw-y\rVert_2^2,\qquad C=\{w\in\mathbb R^2:\ w\ge0,\ \mathbf1^Tw\le2\}$$

với dữ liệu $X=I_2$, $y=(2,1)^T$.

a) Chỉ ra trong phát biểu trên đâu là dữ liệu, đâu là biến cần tìm, đâu là tham số yêu cầu. Viết tập khả thi $\mathcal F$ và giá trị tối ưu $p^*$ theo định nghĩa infimum.

b) Nghiệm $w^*$ và giá trị $p^*$ là hai đại lượng khác nhau. Giải thích khác biệt đó, và cho biết khi nào hai bài toán có cùng $p^*$ nhưng khác tập nghiệm.

::: hint
Xem trang "Dữ liệu, biến và đầu ra của một mô hình" trong bộ trang chiếu. Nhớ rằng $p^*=\inf_{x\in\mathcal F}f_0(x)$ là cận dưới lớn nhất, chưa chắc đạt được; $w^*$ là điểm đạt được (nếu có).
:::

::: solution
a) Dữ liệu là $X$ và $y$ (cố định trong các hàm của bài toán); biến cần tìm là $w\in\mathbb R^2$; trần tổng trọng số $2$ là tham số yêu cầu do người đặt mô hình chọn, không phải biến. Tập khả thi là

$$\mathcal F=\{w\in\mathbb R^2:\ w_1\ge0,\ w_2\ge0,\ w_1+w_2\le2\},$$

một tam giác với các đỉnh $(0,0)$, $(2,0)$, $(0,2)$. Giá trị tối ưu theo định nghĩa là $p^*=\inf_{w\in\mathcal F}\lVert w-(2,1)^T\rVert_2^2$.

b) $p^*$ là một số; $w^*$ là điểm khả thi đạt giá trị đó nếu nghiệm tồn tại. Hai bài toán có thể cùng giá trị tối ưu nhưng khác tập nghiệm: trên $x\in\mathbb R$, bài $\min x^2$ và bài $\min(x-1)^2$ đều có $p^*=0$, nhưng nghiệm duy nhất lần lượt là $0$ và $1$. Vì vậy phải báo riêng nghiệm và giá trị tối ưu.
:::

### Bài 2. Chứng nhận lớp bài toán

Với mỗi bài toán sau, cho biết thuộc lớp nào (LP, QP, QCQP, GP, SDP) và vì sao, dựa trên dạng chuẩn tương ứng trong bộ trang chiếu. Nếu biểu thức viết ngoài dạng chuẩn nhưng có biểu diễn tương đương thuộc một lớp, hãy nêu phép cải dạng.

a) $\min_{w\in\mathbb R^2}\ \lVert w-(2,1)\rVert_2^2$ với $w\ge0$, $\mathbf1^Tw\le2$.

b) $\min_{w\in C}\max_i\lvert (Xw-y)_i\rvert$ với $X=I_2$, $y=(2,1)^T$, $C$ như bài 1.

c) $\min_{w\in C}\lVert Xw-y\rVert_2^2$ với thêm ràng buộc $\lVert w\rVert_2^2\le1$.

d) $\min_{B,H>0}\ BH$ với $BH^3\ge1$, $H\le2B$.

::: hint
Kiểm tra từng thành phần: mục tiêu affine, bậc hai với ma trận PSD, hay posynomial; ràng buộc affine, bậc hai PSD, hay đơn thức. Với (b), nhớ tập trên đồ thị của hàm max các trị tuyệt đối.
:::

::: solution
a) Mục tiêu có Hessian $2I\succ0$ (PSD), mọi ràng buộc đều affine, nên đây là QP lồi đúng dạng chuẩn.

b) Biểu thức có max và trị tuyệt đối nên chưa ở dạng chuẩn, nhưng tập trên đồ thị cho phép cải dạng chính xác: đặt biến phụ $t$, bài trở thành $\min_{w,t}\ t$ với $Xw-y\le t\mathbf1$, $-Xw+y\le t\mathbf1$, $w\in C$. Mọi hàm đều affine, nên đây là LP. Phép biến đổi giữ nguyên giá trị tối ưu và khôi phục $w$ bằng cách bỏ tọa độ $t$.

c) Mục tiêu bậc hai với Hessian $2X^TX=2I\succ0$, ràng buộc $\lVert w\rVert_2^2-1\le0$ là bậc hai với Hessian $2I\succeq0$, các ràng buộc còn lại affine. Mục tiêu và mọi ràng buộc bậc hai đều có ma trận PSD, nên đây là QCQP lồi.

d) Trên miền dương, $BH$ và $H/(2B)$ là đơn thức, $BH^3$ là đơn thức nên ràng buộc $BH^3\ge1$ viết được thành $(BH^3)^{-1}\le1$ với $(BH^3)^{-1}=B^{-1}H^{-3}$ là đơn thức; mục tiêu $BH$ là posynomial (tổng một đơn thức). Đây là GP đúng dạng chuẩn. Lưu ý GP chưa tự động lồi theo $(B,H)$; tính lồi chỉ xuất hiện sau phép đổi log.
:::

### Bài 3. Cải dạng chính xác hay đổi tiêu chí

Một bạn làm bài như sau: xuất phát từ bài bình phương tối thiểu $\min_{w\in C}\lVert Xw-y\rVert_2^2$ với $X=I_2$, $y=(2,1)^T$, rồi nói "đưa sang dạng minimax $\min_{w\in C}\max_i\lvert (Xw-y)_i\rvert$ là một phép cải dạng chính xác".

a) Nhận định đúng sai và giải thích, phân biệt hai khái niệm: cải dạng chính xác của một bài toán, và đổi tiêu chí (đổi bài toán).

b) Trong mạch minimax, phép đưa $\min_w\max_i\lvert r_i\rvert$ về LP bằng biến $t$ là loại phép biến đổi gì? Nó bảo toàn cái gì, đổi cái gì?

c) Cho thêm ví dụ một phép biến đổi giữ nguyên tập nghiệm nhưng đổi giá trị mục tiêu.

::: hint
Đối chiếu trang "Các phép biến đổi mô hình" và ghi chú của trang minimax trong bộ trang chiếu: hai việc khác nhau bị trùng nghiệm trong bộ số này.
:::

::: solution
a) Sai. Hai bài toán có mục tiêu khác nhau trên cùng miền: một là cực tiểu tổng bình phương sai số, một là cực tiểu sai số lớn nhất. Chúng trùng nghiệm $(1{,}5;\,0{,}5)$ và cùng $p^*=0{,}5$ chỉ trong bộ dữ liệu cụ thể này; với dữ liệu khác, ví dụ khớp hằng số $w$ cho ba quan sát $y=(0,0,3)$, bình phương tối thiểu cho $w=1$ còn minimax cho $w=1{,}5$. Thay nhu cầu bình phương tối thiểu bằng minimax là đổi tiêu chí, tạo một bài toán mới, không phải cải dạng.

b) Đó là cải dạng chính xác bằng biến phụ (dựa trên tập trên đồ thị): bài $\min_{w,t}t$ với $-t\le r_i\le t$ có cùng giá trị tối ưu và cùng tập nghiệm $w$ với bài minimax gốc, vì với mọi $w$, $t$ tối ưu bằng $\max_i\lvert r_i\rvert$. Giá trị tối ưu được bảo toàn; số biến tăng thêm 1, số ràng buộc tăng thêm $2N$.

c) Đổi biến song ánh với mục tiêu tăng nghiêm ngặt: $f(w)\mapsto 2f(w)+1$ giữ nguyên argmin nhưng đổi $p^*$ thành $2p^*+1$. Tương tự, phép đổi log trong GP giữ thứ tự nghiệm nhưng đổi giá trị thành $\log p^*$.
:::

### Bài 4. Đọc đơn vị và giá trị sau phép đổi log

Một bộ giải nhận bài GP của dầm một đoạn (bài 2d) sau khi đổi log và trả về giá trị tối ưu $\widetilde p^*=-\frac{\log 2}{2}$.

a) Giá trị mục tiêu của bài GP gốc là bao nhiêu? Nêu công thức quan hệ giá trị giữa hai bài và điều kiện để công thức đúng.

b) Vì sao không được nói "hai bài toán có cùng giá trị tối ưu" sau phép đổi log? Phép đổi log bảo toàn những gì?

c) Nếu bộ giải báo giá trị $-\infty$, điều đó nói gì về bài GP gốc?

d) Xét mô hình bốn đoạn đã học, với $d=(37,19,7,1)/64$, $B_i,H_i>0$:

$$\min\sum_{i=1}^4B_iH_i\quad\text{với}\quad\sum_{i=1}^4\frac{d_i}{B_iH_i^3}\le1,\qquad H_i\le2B_i.$$

Đặt $u_i=\log B_i$, $v_i=\log H_i$. Viết bài toán sau phép đổi biến và lấy log mục tiêu. Dùng $s_0=(4FL^3/(E\delta_{\max}))^{1/4}$, với lực $F$, môđun Young $E$, chiều dài dầm $L$ và độ võng cho phép $\delta_{\max}$ đều dương, để khôi phục chiều rộng, chiều cao và thể tích vật lý. Các biến $B_i,H_i$ đều không có đơn vị; mỗi đoạn dài $L/4$.

::: hint
Xem trang "Khôi phục nghiệm và giá trị mục tiêu" trong bộ trang chiếu: $x=\exp y$ là song ánh, giá trị mới là $\log p^*$ khi $0<p^*<\infty$. Với (d), mỗi đơn thức $c\,B^\alpha H^\beta$ thành $c\,e^{\alpha u+\beta v}$.
:::

::: solution
a) Vì phép đổi log biến mục tiêu $f_0(x)$ thành $\log f_0(e^y)$, nên khi $0<p^*<\infty$ ta có $\widetilde p^*=\log p^*$, suy ra $p^*=\exp\widetilde p^*=\exp\!\big(-\tfrac{\log2}{2}\big)=2^{-1/2}\approx0{,}7071$. Đây khớp với nghiệm đã tính trong bộ trang chiếu: $B^*=2^{-3/4}$, $H^*=2^{1/4}$, $V^*=B^*H^*=2^{-1/2}$.

b) Hai giá trị nằm trên hai thang khác nhau: một là thể tích chuẩn hóa, một là logarit tự nhiên của nó. Phép đổi log bảo toàn thứ tự giá trị, tính khả thi và tính đạt infimum (qua song ánh $x=\exp y$ giữa hai miền khả thi), nhưng không bảo toàn giá trị số. Sai số cộng ở thang log tương ứng với sai số theo tỉ số ở thang gốc, không phải sai số cộng.

c) $\widetilde p^*=-\infty$ tương ứng $\inf f_0=0$ trên miền dương, tức bài GP gốc có cận dưới bằng $0$ nhưng không có nghiệm đạt $0$, vì $f_0>0$ trên miền dương (ví dụ $\min_{x>0}x$). Nếu bài log vô nghiệm thì bài GP gốc cũng vô nghiệm.

d) Với hàm log-tổng-mũ $\operatorname{lse}(z)=\log\sum_i e^{z_i}$, bài cải dạng là

$$\begin{aligned}
\min_{u,v\in\mathbb R^4}\quad&\operatorname{lse}_{i=1}^4(u_i+v_i)\\
\text{với}\quad&\operatorname{lse}_{i=1}^4(\log d_i-u_i-3v_i)\le0,\\
&v_i-u_i-\log2\le0\quad(i=1,\ldots,4).
\end{aligned}$$

Mục tiêu và ràng buộc đầu là hàm log-tổng-mũ của các hàm affine; bốn ràng buộc còn lại affine, nên bài lồi. Từ nghiệm $(u^*,v^*)$, khôi phục $B_i^*=e^{u_i^*}$, $H_i^*=e^{v_i^*}$, rồi $b_i^*=s_0B_i^*$ và $h_i^*=s_0H_i^*$ (đơn vị chiều dài). Thể tích vật lý là $V_{\rm phys}^*=(L/4)s_0^2\sum_i e^{u_i^*+v_i^*}=(L/4)s_0^2e^{\widetilde p^*}$. Phép mũ chỉ khôi phục biến chuẩn hóa; phải nhân thêm các hệ số đơn vị.
:::

---

## Mức 2: Tính toán và chứng minh

### Bài 5. Giải trọn vẹn bài QP hồi quy

Giải bài toán

$$\min_{w\in\mathbb R^2}\ (w_1-2)^2+(w_2-1)^2\quad\text{sao cho}\quad w_1\ge0,\ w_2\ge0,\ w_1+w_2\le2.$$

a) Tìm nghiệm không ràng buộc và kiểm tra nó có khả thi không.

b) Chứng minh bằng bất đẳng thức Cauchy rằng $p^*=0{,}5$ và chỉ ra điểm đạt được.

c) Giải thích vì sao "cắt từng tọa độ của nghiệm tự do về miền" không phải quy tắc giải chung, bằng cách chỉ ra một ràng buộc liên kết mà cắt tọa độ cho kết quả sai.

::: hint
Đặt $a=2-w_1$, $b=1-w_2$; ràng buộc tổng cho $a+b\ge1$. Dùng $a^2+b^2\ge(a+b)^2/2$.
:::

::: solution
a) Nghiệm không ràng buộc là $w=(2,1)$, có $w_1+w_2=3>2$, vi phạm ràng buộc tổng nên không khả thi.

b) Đặt $a=2-w_1$, $b=1-w_2$. Ràng buộc $w_1+w_2\le2$ cho $a+b=3-(w_1+w_2)\ge1$. Theo bất đẳng thức Cauchy (hoặc $(a-b)^2\ge0$),

$$a^2+b^2\ge\frac{(a+b)^2}{2}\ge\frac12.$$

Dấu bằng cần $a=b$ và $a+b=1$, tức $a=b=\tfrac12$, tức $w=(1{,}5;\,0{,}5)$. Điểm này có $w\ge0$ và tổng bằng $2$, khả thi. Vậy $w^*=(1{,}5;\,0{,}5)$, $p^*=0{,}5$. Mô hình dự đoán là $\widehat y=1{,}5z_1+0{,}5z_2$.

c) Cắt từng tọa độ vào các khoảng riêng không xử lý được ràng buộc tổng. Từ $C$ ta suy ra các chặn riêng $0\le w_1,w_2\le2$. Cắt nghiệm tự do $(2,1)$ vào hai khoảng $[0,2]$ vẫn cho $(2,1)$, vi phạm $w_1+w_2\le2$. Nghiệm $(1{,}5;0{,}5)$ ở phần (b) được tìm bằng ràng buộc liên kết hai biến và điều kiện đạt cận, không phải bằng cắt tọa độ độc lập.
:::

### Bài 6. Minimax và một phản ví dụ cho việc đổi hàm mất mát

a) Với dữ liệu $X=I_2$, $y=(2,1)^T$, $C=\{w\ge0:\mathbf1^Tw\le2\}$, giải bài $\min_{w\in C}\max_i\lvert (Xw-y)_i\rvert$ bằng cách viết LP tương đương và chứng minh cận dưới.

b) Xây dựng một bộ dữ liệu nhỏ cho thấy nghiệm minimax khác nghiệm bình phương tối thiểu, để bác bỏ kết luận "hai tiêu chí tương đương vì trùng nghiệm ở bài 5".

::: hint
Cận dưới: hai sai số thiếu hụt có tổng ít nhất $1$. Cho (b), dùng ví dụ khớp hằng số với ba quan sát trong ghi chú bộ trang chiếu.
:::

::: solution
a) Cải dạng: $\min_{w,t}\ t$ với $w\in C$, $w_i-y_i\le t$ và $y_i-w_i\le t$ cho $i=1,2$ (viết theo tọa độ: $w_1-2\le t$, $2-w_1\le t$, $w_2-1\le t$, $1-w_2\le t$). Cận dưới: tại $w=(1{,}5;\,0{,}5)$, hai sai số là $-0{,}5$ và $-0{,}5$, đều là thiếu hụt, tổng độ lớn $1$; nói chung với mọi $w\in C$, $(2-w_1)+(1-w_2)\ge1$, nên $\max_i\lvert r_i\rvert\ge\max(2-w_1,\,1-w_2)\ge\big[(2-w_1)+(1-w_2)\big]/2\ge\tfrac12$. Điểm $w=(1{,}5;\,0{,}5)$ đạt $\max=0{,}5$, vậy $w^*=(1{,}5;\,0{,}5)$, $t^*=0{,}5$.

b) Khớp một hằng số $w\in\mathbb R$ cho ba quan sát $y=(0,0,3)$. Bình phương tối thiểu: $\min_w\sum_i(w-y_i)^2$ cho $w=1$ (trung bình cộng). Minimax: $\min_w\max\{\lvert w\rvert,\lvert w-3\rvert\}$ đạt tại $w=1{,}5$ (trung điểm của khoảng $[0,3]$), giá trị $1{,}5$. Hai nghiệm khác nhau, nên trùng nghiệm ở bài 5 chỉ là trùng hợp của bộ dữ liệu đối xứng, không phải tính chất chung của hai tiêu chí.
:::

### Bài 7. LP mua liên tục với trần cung

Cần ít nhất $3$ đơn vị nguyên liệu cùng chất lượng; chi phí hai nguồn là $1$ và $2$ điểm/đơn vị; biến $x_i\ge0$ là lượng mua liên tục; thêm trần cung $x_1\le2$.

a) Viết bài toán LP và tìm nghiệm không có trần, kèm chứng minh tối ưu.

b) Thêm trần $x_1\le2$, tìm nghiệm mới và chứng minh bằng kết hợp bất đẳng thức.

c) Giải thích vì sao nghiệm không bao giờ mua dư quá nhu cầu trong mô hình này, và giả thiết nào của mô hình khiến điều đó đúng.

::: hint
Viết chi phí dưới dạng $(x_1+x_2)+x_2$ để dùng ràng buộc nhu cầu.
:::

::: solution
a) Bài toán: $\min\ x_1+2x_2$ với $x_1+x_2\ge3$, $x\ge0$. Vì $x_1+2x_2=(x_1+x_2)+x_2\ge3+0=3$, mọi điểm khả thi có chi phí ít nhất $3$; dấu bằng cần $x_1+x_2=3$ và $x_2=0$, tức $x^*=(3,0)$, khả thi. Vậy $p^*=3$.

b) Với $x_1\le2$: từ nhu cầu có $x_2\ge3-x_1\ge1$. Khi đó $x_1+2x_2=(x_1+x_2)+x_2\ge3+x_2\ge4$. Điểm $(2,1)$ khả thi ($2+1=3\ge3$, $x_1=2\le2$) và có chi phí $2+2=4$. Vậy $x^*=(2,1)$, $p^*=4$.

c) Mua dư nghĩa là $x_1+x_2>3$. Vì cả hai hệ số chi phí dương, giảm một thành phần $x_i$ (vẫn giữ $x_i\ge0$ và nhu cầu) luôn giảm chi phí, nên nghiệm tối ưu không mua dư. Điều này dựa trên các giả thiết của mô hình: chất lượng tương đương nên hai lượng cộng trực tiếp được, chi phí tỷ lệ thuận với lượng, và chưa có ràng buộc khác ép mua dư. Nếu chất lượng khác nhau hoặc có chi phí cố định, kết luận có thể thay đổi.
:::

### Bài 8. QCQP độ nhạy và so với ridge

Quay lại bài hồi quy bài 5, thêm ràng buộc độ nhạy $\lVert w\rVert_2^2\le1$:

$$\min_{w\in C}\lVert Xw-y\rVert_2^2,\qquad X=I_2,\ y=(2,1)^T.$$

a) Giải thích vì sao ràng buộc này tương đương với yêu cầu $\lvert w^T\Delta z\rvert\le1$ với mọi nhiễu $\lVert\Delta z\rVert_2\le1$.

b) Chứng minh $p^*=(\sqrt5-1)^2$ và tìm $w^*$.

c) So sánh với bài hồi quy ridge $\min_{w\in C}\lVert Xw-y\rVert_2^2+\lambda\lVert w\rVert_2^2$ với $\lambda=1$: hai cách đưa $\lVert w\rVert$ vào mô hình khác nhau ở điểm nào (về bản chất ràng buộc so với phạt, và về nghiệm)?

::: hint
Cauchy cho $\lvert w^T\Delta z\rvert\le\lVert w\rVert_2$; khi $w=0$ bất đẳng thức hiển nhiên, chỉ chọn $\Delta z=w/\lVert w\rVert_2$ khi $w\ne0$. Cho (b): $\lVert w-y\rVert_2\ge\lVert y\rVert_2-\lVert w\rVert_2$.
:::

::: solution
a) Với mọi $\Delta z$ có $\lVert\Delta z\rVert_2\le1$, bất đẳng thức Cauchy cho $\lvert w^T\Delta z\rvert\le\lVert w\rVert_2\lVert\Delta z\rVert_2\le\lVert w\rVert_2$. Ngược lại nếu $\lVert w\rVert_2\le1$ thì điều kiện hiển nhiên; nếu $\lVert w\rVert_2>1$, chọn $\Delta z=w/\lVert w\rVert_2$ (có $\lVert\Delta z\rVert_2=1$) cho $w^T\Delta z=\lVert w\rVert_2>1$, vi phạm. Vậy hai yêu cầu tương đương.

b) Với mọi $w\in C$ có $\lVert w\rVert_2\le1$, bất đẳng thức tam giác cho

$$\lVert w-y\rVert_2\ge\lVert y\rVert_2-\lVert w\rVert_2\ge\sqrt5-1,$$

nên mục tiêu $\ge(\sqrt5-1)^2$. Điểm $w^*=(2,1)/\sqrt5$ có $\lVert w^*\rVert_2=1$ và $w^*$ nằm trên tia từ gốc qua $(2,1)$, nên thuộc $C$ (kiểm tra: $w^*\ge0$, $w_1^*+w_2^*=3/\sqrt5\approx1{,}342\le2$) và đạt dấu bằng trong bất đẳng thức tam giác. Vậy $p^*=(\sqrt5-1)^2\approx1{,}5279$.

c) Ràng buộc $\lVert w\rVert_2^2\le1$ là điều kiện cứng: nghiệm phải nằm trong đĩa đơn vị, vi phạm thì bị loại; bài là QCQP. Phạt ridge cộng $\lambda\lVert w\rVert_2^2$ vào mục tiêu: nghiệm được phép ra ngoài đĩa nếu sai số giảm đủ nhiều; với $\lambda=1$ và dữ liệu này, bài ridge không ràng buộc khác có nghiệm $w=(2,1)/2=(1,0{,}5)$ với $\lVert w\rVert_2=\sqrt{1{,}25}>1$, tức nghiệm ridge vi phạm ràng buộc cứng của bài QCQP. Về ý nghĩa trong học mô hình: ridge kiểm soát độ lớn hệ số, đánh đổi giữa sai số khớp và độ phức tạp của mô hình; mức phạt lớn hơn kéo nghiệm gần gốc, nhưng không khẳng định luôn giảm sai số trên dữ liệu kiểm tra.
:::

### Bài 9. Phản ví dụ trung điểm cho tính lồi của miền khả thi

Một bạn kết luận: "Hàm xác định bất đẳng thức có Hessian không xác định, nên miền khả thi $C$ không lồi."

Xét tập $C=\{x\in\mathbb R^2:\ x_1^2-x_2^2\le1\}$ và hai điểm $a=(\sqrt2,\,1)$, $b=(\sqrt2,\,-1)$.

a) Kiểm tra $a\in C$ và $b\in C$.

b) Tính trung điểm $m=(a+b)/2$ và giá trị của biểu thức $x_1^2-x_2^2$ tại $m$. Kết luận về tính lồi của $C$.

c) Đối chiếu với lập luận Hessian: Hessian của $x_1^2-x_2^2$ là $\operatorname{diag}(2,-2)$, không xác định. Vì sao điều đó chưa đủ để kết luận về miền khả thi, và tập $\{x\in C:\ x_2=0\}$ có tính chất gì?

::: hint
Thay hai điểm vào bất đẳng thức xác định $C$; với (b), tính $m_1^2-m_2^2$ với $m=(\sqrt2,0)$. Với (c), nhớ rằng tính lồi của tập là tính chất của tập, không chỉ của một hàm.
:::

::: solution
a) $a_1^2-a_2^2=2-1=1\le1$ và $b_1^2-b_2^2=2-1=1\le1$, nên cả $a$ và $b$ đều thuộc $C$.

b) Trung điểm $m=\big(\sqrt2,\,0\big)$. Tại $m$: $m_1^2-m_2^2=2-0=2>1$, tức $m\notin C$. Vậy $C$ chứa hai điểm $a,b$ nhưng không chứa đoạn nối chúng, nên $C$ không lồi.

c) Lập luận Hessian không xác định chỉ nói về một hàm cụ thể, không tự đủ để kết luận miền khả thi không lồi: cùng một tập có thể được mô tả bởi nhiều hàm khác nhau, và một hàm không lồi vẫn có thể có tập mức lồi. Trong ví dụ này kết luận đúng, nhưng phải chứng minh bằng phản ví dụ trung điểm như ở (b). Ngược lại, nếu thêm điều kiện $x_2=0$ thì tập $\{x:\ x_1^2\le1,\ x_2=0\}=[-1,1]\times\{0\}$ là một đoạn, tức lồi: cùng một biểu thức, miền khác nhau cho tính chất khác nhau.
:::

### Bài 10. GP dầm một đoạn và biến thể thiếu tỷ lệ

a) Với dầm một đoạn, dữ liệu $d=1$, giải bài $\min_{B,H>0}BH$ với $BH^3\ge1$, $H\le2B$; chứng minh giá trị tối ưu bằng bất đẳng thức, không dùng đạo hàm.

b) Bỏ ràng buộc tỷ lệ $H\le2B$. Chứng minh bài khi đó không có nghiệm đạt được, bằng cách cho một dãy điểm khả thi làm thể tích tiến về $0$.

c) Kiểm tra tính lồi của bài ở (a) theo $(B,H)$ trực tiếp; phép đổi log có bắt buộc ở đây không?

::: hint
Đặt $a=BH$; từ $H\le2B$ suy $H^2\le2a$. Cho (b): cố định $B=H^{-3}$ và cho $H\to\infty$.
:::

::: solution
a) Đặt $a=BH$. Từ $H\le2B$ có $H^2\le2BH=2a$. Khi đó $1\le BH^3=aH^2\le2a^2$, suy ra $a\ge1/\sqrt2$. Dấu bằng cần đồng thời $H=2B$ và $BH^3=1$: thế $B=H/2$ được $H^4/2=1$, tức $H=2^{1/4}$, $B=2^{-3/4}$. Điểm này khả thi, vậy $B^*=2^{-3/4}\approx0{,}5946$, $H^*=2^{1/4}\approx1{,}1892$, $V^*=2^{-1/2}\approx0{,}7071$.

b) Không có trần tỷ lệ: với mỗi $H>0$ chọn $B=H^{-3}$, khi đó $BH^3=1$ khả thi và thể tích $BH=H^{-2}\to0$ khi $H\to\infty$. Vậy $\inf BH=0$ nhưng $BH>0$ trên miền dương, không điểm nào đạt $0$: bài có infimum bằng $0$ nhưng không đạt nghiệm. Tính lồi sau phép đổi log không ngăn hiện tượng này.

c) Mục tiêu $BH$ có Hessian $\begin{bmatrix}0&1\\1&0\end{bmatrix}$ với trị riêng $+1,-1$, không PSD, nên bài chưa lồi theo $(B,H)$ ở dạng hiện tại. Với ràng buộc tỷ lệ, miền khả thi không bị chặn (ví dụ $B=H=T\ge1$ luôn khả thi và đi ra vô cực khi $T\to\infty$), nhưng ta đã giải được bằng bất đẳng thức ở (a). Phép đổi log là con đường tổng quát để đưa GP về bài lồi: với biến $(u,v)=(\log B,\log H)$, mục tiêu thành $u+v$ và các ràng buộc thành $-u-3v\le0$ (từ $BH^3\ge1$) cùng $v-u-\log2\le0$ (từ $H\le2B$), đều affine; tuy nhiên ở ca một đoạn này phép đổi log không bắt buộc để tìm nghiệm.
:::

---

## Mức 3: Mô hình hóa trong AI

### Bài 11. Chọn cấu hình đo bằng hiệp phương sai

Hai cấu hình đo có sai số $e\in\mathbb R^2$ chuẩn hóa, trung bình $0$, với

$$\Sigma_0=\begin{bmatrix}0{,}5&0{,}5\\0{,}5&1{,}5\end{bmatrix},\qquad \Sigma_1=\begin{bmatrix}1{,}5&0{,}5\\0{,}5&0{,}5\end{bmatrix}.$$

Chọn cấu hình 1 với xác suất $\alpha\in[0,1]$ trước mỗi lần đo, cấu hình 0 với xác suất $1-\alpha$.

a) Viết ma trận hiệp phương sai $\Sigma(\alpha)$ của việc chọn ngẫu nhiên này và phát biểu bài toán giảm phương sai theo hướng xấu nhất.

b) Tính $\lambda_{\max}(\Sigma(\alpha))$, tìm $\alpha^*$ và $t^*$, so sánh với hai đầu $\alpha=0$ và $\alpha=1$.

c) Viết bài toán dưới dạng SDP với LMI, và giải thích vì sao không được chỉ chặn hai phần tử đường chéo.

::: hint
Hai trị riêng của ma trận $2\times2$ đối xứng $\begin{bmatrix}a&c\\c&b\end{bmatrix}$ là $\frac{a+b}{2}\pm\sqrt{\big(\frac{a-b}{2}\big)^2+c^2}$.
:::

::: solution
a) $\Sigma(\alpha)=(1-\alpha)\Sigma_0+\alpha\Sigma_1=\begin{bmatrix}0{,}5+\alpha&0{,}5\\0{,}5&1{,}5-\alpha\end{bmatrix}$. Bài toán: $\min_{0\le\alpha\le1}\max_{\lVert q\rVert_2=1}q^T\Sigma(\alpha)q=\min_\alpha\lambda_{\max}(\Sigma(\alpha))$.

b) Áp công thức với $a=0{,}5+\alpha$, $b=1{,}5-\alpha$, $c=0{,}5$:

$$\lambda_{\max}(\Sigma(\alpha))=1+\sqrt{(\alpha-\tfrac12)^2+\tfrac14}.$$

Hàm này nhỏ nhất tại $\alpha=\tfrac12$, cho $t^*=1+\sqrt{\tfrac14}=1{,}5$. Kiểm tra: tại $\alpha=\tfrac12$, $\Sigma=\begin{bmatrix}1&0{,}5\\0{,}5&1\end{bmatrix}$ có trị riêng $1{,}5$ và $0{,}5$. Hai đầu: $\alpha=0$ hoặc $\alpha=1$ cho $1+\sqrt{1/2}\approx1{,}7071>1{,}5$. Vậy cân bằng hai cấu hình giảm phương sai hướng xấu nhất từ khoảng $1{,}71$ xuống $1{,}5$.

c) Dạng SDP: $\min_{\alpha,t}\ t$ với $tI-\Sigma_0-\alpha(\Sigma_1-\Sigma_0)\succeq0$ và $0\le\alpha\le1$ (hai LMI cấp 1). Ma trận phụ thuộc affine vào $(\alpha,t)$ nên đây là LMI. Chỉ chặn đường chéo (tức $\Sigma(\alpha)\preceq tI$ xét từng phần tử) là sai: thứ tự PSD là bất đẳng thức cho mọi hướng $q$, ví dụ ma trận $\begin{bmatrix}1&2\\2&1\end{bmatrix}$ có mọi phần tử dương nhưng trị riêng $3,-1$, không PSD. Phải dùng LMI đầy đủ.
:::

### Bài 12. Minimax hồi quy thêm giới hạn chuẩn

Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$, trọng số $w\ge0$, $\mathbf1^Tw\le2$, và thêm yêu cầu độ nhạy $\lVert w\rVert_2^2\le1$.

a) Viết mô hình giảm sai số lớn nhất với đầy đủ ràng buộc, rồi cải dạng về dạng chuẩn. Nêu lớp bài toán sau cải dạng và kích thước (số biến, số ràng buộc).

b) Với dữ liệu $X=I_2$, $y=(2,1)^T$, tìm nghiệm và giá trị tối ưu, chứng minh bằng bất đẳng thức.

c) Nêu cách đọc lại $w$ và giá trị sai số từ biến phụ của bài cải dạng, và một tình huống mà giá trị đọc từ biến phụ khác giá trị tính lại từ $w$.

::: hint
Kết hợp cải dạng tập trên đồ thị của minimax (bài 6) với ràng buộc bậc hai của bài 8. Cho (b): dùng $w_1\le\lVert w\rVert_2\le1$ để chặn riêng sai số của quan sát thứ nhất.
:::

::: solution
a) Mô hình:

$$\min_{w\in\mathbb R^d}\max_{i=1,\ldots,N}\lvert X_iw-y_i\rvert\quad\text{sao cho}\quad w\ge0,\ \mathbf1^Tw\le2,\ \lVert w\rVert_2^2\le1.$$

Cải dạng tập trên đồ thị: $\min_{w,t}\ t$ với $Xw-y\le t\mathbf1$, $-Xw+y\le t\mathbf1$, $w\ge0$, $\mathbf1^Tw\le2$, $\lVert w\rVert_2^2\le1$. Sau cải dạng: mục tiêu affine, ràng buộc $w\ge0$, $\mathbf1^Tw\le2$ và hai khối $Xw-y\le t\mathbf1$, $-Xw+y\le t\mathbf1$ đều affine; ràng buộc $\lVert w\rVert_2^2\le1$ là bậc hai PSD. Đây là QCQP lồi với $d+1$ biến và $2N+d+1$ bất đẳng thức affine cộng một ràng buộc bậc hai.

b) Với mọi $w$ khả thi, $w_1\le\lVert w\rVert_2\le1$, nên $\max\{\lvert w_1-2\rvert,\lvert w_2-1\rvert\}\ge2-w_1\ge1$. Điểm $w^*=(1,0)$ thỏa mọi ràng buộc và có hai sai số đều bằng $-1$, nên đạt cận $p^*=t^*=1$. Nghiệm duy nhất: muốn đạt $1$ phải có $w_1=1$, rồi $w_1^2+w_2^2\le1$ buộc $w_2=0$. Giá trị tăng từ $0{,}5$ lên $1$ khi thêm ràng buộc là phù hợp với việc thu hẹp miền khả thi. Nghiệm này khác nghiệm cực tiểu tổng bình phương sai số $(2,1)/\sqrt5$ ở Bài 8.

c) Khôi phục bằng cách giữ $w$ và tính $\max_i\lvert X_iw-y_i\rvert$. Tại nghiệm tối ưu chính xác, giá trị này bằng $t$ vì có thể hạ $t$ nếu còn dư. Ở một điểm khả thi chưa tối ưu, biến phụ có thể lớn hơn sai số thật: với bộ dữ liệu ở (b), $w=0,t=3$ khả thi nhưng sai số lớn nhất bằng $2$. Sai số số học cũng có thể tạo chênh lệch; phải kiểm lại cả ràng buộc gốc và giá trị tính từ $w$.
:::

---

## Bài mở rộng (chỉ làm sau khi đọc ghi chú phần mở rộng của bộ trang chiếu)

### Bài 13. Bổ đề Schur cho chặn chuẩn phổ: ba trường hợp

Xét khẳng định: với $A\in\mathbb R^{m\times n}$ và $t\in\mathbb R$,

$$\lVert A\rVert_2\le t\iff\begin{bmatrix}tI_m&A\\A^T&tI_n\end{bmatrix}\succeq0.$$

a) Trường hợp $t>0$: dùng bổ đề Schur với khối $B=tI_m\succ0$ để chứng minh tương đương, chỉ rõ chỗ nào trong chuỗi suy luận cần $t>0$.

b) Trường hợp $t=0$: chứng minh cả hai vế buộc $A=0$, và giải thích vì sao không được viết $(tI)^{-1}$ tại $t=0$.

c) Trường hợp $t<0$: chứng minh cả hai vế sai.

d) Áp dụng: tìm $\min_{x\in\mathbb R}\lVert\operatorname{diag}(x,3-x)\rVert_2$ và viết LMI tương ứng.

::: hint
Cho (b): xét ma trận con chính $\begin{bmatrix}0&a_{ij}\\a_{ij}&0\end{bmatrix}$ có định thức $-a_{ij}^2$. Cho (d): $\max\{\lvert x\rvert,\lvert3-x\rvert\}\ge\frac{\lvert x\rvert+\lvert3-x\rvert}{2}$.
:::

::: solution
a) Với $t>0$, Schur cho

$$\begin{bmatrix}tI_m&A\\A^T&tI_n\end{bmatrix}\succeq0\iff tI_n-A^T(tI_m)^{-1}A\succeq0\iff A^TA\preceq t^2I_n.$$

Chuỗi cuối tương đương $\lVert A\rVert_2\le t$ vì $\lambda_{\max}(A^TA)=\lVert A\rVert_2^2$. Hai chỗ cần $t>0$: lấy nghịch đảo $tI_m$ (định thức dương, khối xác định dương) và khi chuyển $A^TA\preceq t^2I_n$ thành so sánh chuẩn với $t$ (cần $t\ge0$ để lấy căn giữ chiều).

b) Với $t=0$, ma trận là $\begin{bmatrix}0&A\\A^T&0\end{bmatrix}$. Nếu $a_{ij}\ne0$, ma trận con chính hai hàng hai cột $\begin{bmatrix}0&a_{ij}\\a_{ij}&0\end{bmatrix}$ có định thức $-a_{ij}^2<0$, mâu thuẫn PSD; vậy $A=0$. Điều kiện chuẩn $\lVert A\rVert_2\le0$, cũng cho $A=0$. Hai vế tương đương, nhưng không thể dùng Schur vì $tI_m$ không khả nghịch; phải xử lý riêng như trên.

c) Với $t<0$, phần tử đường chéo $t<0$ của ma trận PSD là không thể, nên vế phải sai; còn $\lVert A\rVert_2\ge0>t$ nên vế trái cũng sai. Hai vế cùng sai, tương đương vẫn đúng.

d) $\lVert\operatorname{diag}(x,3-x)\rVert_2=\max\{\lvert x\rvert,\lvert3-x\rvert\}\ge\frac{\lvert x\rvert+\lvert3-x\rvert}{2}\ge\frac{3}{2}$, dấu bằng chỉ tại $x=3/2$. Vậy $t^*=3/2$. LMI là khối $4\times4$: $\begin{bmatrix}tI_2&\operatorname{diag}(x,3-x)\\ \operatorname{diag}(x,3-x)&tI_2\end{bmatrix}\succeq0$. Đối chứng: $\operatorname{diag}(-10,1)\preceq I$ nhưng chuẩn phổ bằng $10$, nên không được bỏ dấu trị tuyệt đối khi chỉ chặn một phía.
:::

### Bài 14. Chia đôi với bộ kiểm tra khả thi chính xác và trao đổi hai tiêu chí Pareto

**Phần A. Chia đôi với bộ kiểm tra khả thi kiểm tra mức chính xác.** Cho $\min_{x\in[0,2]}f(x)=\dfrac{x^2+1}{x+2}$.

a) Với mỗi $t$, viết điều kiện kiểm tra mức $\{x:f(x)\le t\}$ dưới dạng bất đẳng thức đa thức, và cho biết vì sao mỗi lần kiểm tra là một bài toán khả thi hữu hiệu.

b) Chạy ba bước chia đôi từ $[l_0,u_0]=[0,1]$ với điểm khả thi $\hat x_0=0$; nêu bất biến mà mỗi bước bảo toàn.

c) Cho $u_0-l_0=1$ và dung sai $\varepsilon=0{,}1$, tính số lần gọi bộ kiểm tra khả thi; nêu bảo đảm đầu ra về $f(\hat x)-p^*$ và một kết luận sai mà người học thường rút sai.

**Phần B. Ghép với trao đổi hai tiêu chí.** Trên cùng miền $x\in[0,2]$, hai tiêu chí $\Phi_1(x)=x^2$ và $\Phi_2(x)=(x-2)^2$ xung đột: với $0\le x<y\le2$ thì $\Phi_1(x)<\Phi_1(y)$ nhưng $\Phi_2(x)>\Phi_2(y)$.

d) Giải thích vì sao không có nghiệm "tốt nhất" cho cả hai tiêu chí cùng lúc, và nêu hai quy tắc ra quyết định khác nhau (trần một tiêu chí, hoặc trọng số) dẫn tới nghiệm khác nhau. Chỉ ra nghiệm cụ thể của mỗi quy tắc.

e) Kiểm tra khẳng định “mọi nghiệm của bài trọng số không âm khác $0$ đều là Pareto” bằng $\mathcal F=[0,1]$, $\Phi(x)=(0,x)$, $w=(1,0)$.

::: hint
Cho (a): nhân hai vế với $x+2>0$. Cho (b): bất biến $l\le p^*\le u$ và $f(\hat x)\le u$. Cho (d): trần $\Phi_2\le1$ cho bài $\min\Phi_1$; còn $\min\Phi_1+\Phi_2$ cho $x=1$, còn $\min\Phi_1+0{,}1\Phi_2$ cho $x=2/11$.
:::

::: solution
**A(a).** Vì $x+2>0$ trên $[0,2]$, điều kiện $f(x)\le t$ tương đương $\phi_t(x)=x^2+1-t(x+2)\le0$, tức $x^2-tx+1-2t\le0$ trên đoạn. Kiểm tra mức là bài khả thi với ràng buộc đa thức bậc hai trên đoạn, giải được chính xác bằng biệt thức; bộ kiểm tra khả thi trả một điểm nếu khả thi.

**A(b).** Khởi tạo $[0,1]$, $\hat x_0=0$, $f(0)=1/2\le u_0=1$.
- $t=0{,}5$: $\phi_{0{,}5}(x)=x^2-0{,}5x$ có nghiệm $x=0$ (cả $x=0{,}5$), khả thi → $[0,\,0{,}5]$, $\hat x=0{,}5$ (hoặc $0$).
- $t=0{,}25$: $\phi=x^2-0{,}25x+0{,}5$, biệt thức $0{,}0625-2<0$, vô nghiệm → $[0{,}25,\,0{,}5]$.
- $t=0{,}375$: biệt thức $0{,}140625-1<0$, vô nghiệm → $[0{,}375,\,0{,}5]$.

Bất biến sau mỗi bước: $l\le p^*\le u$ và $f(\hat x)\le u$. Vô nghiệm ở mức $t$ chỉ suy ra $p^*\ge t$ (không chắc $p^*>t$ nếu infimum không đạt); khả thi ở mức $t$ cho $p^*\le t$ và cập nhật điểm khả thi.

**A(c).** Số lần gọi $N=\lceil\log_2((u_0-l_0)/\varepsilon)\rceil=\lceil\log_2 10\rceil=4$. Đầu ra thỏa $0\le f(\hat x)-p^*\le\varepsilon$. Kết luận sai thường gặp: suy ra $\lVert\hat x-x^*\rVert\le\varepsilon$; chia đôi chỉ chặn giá trị, không tự cho chặn khoảng cách trong biến nếu $f$ không tăng nghiêm ngặt với hằng số đã biết.

**B(d).** Vì hai tiêu chí nghịch chiều trên toàn miền, không có điểm cải thiện một tiêu chí mà không xấu tiêu chí kia, nên khái niệm "tối ưu" cần quy tắc ưu tiên. Quy tắc trần: đặt $\Phi_2(x)\le1$ (tức $x\ge1$) rồi $\min\Phi_1$, được $x=1$ với $(\Phi_1,\Phi_2)=(1,1)$; trần khác, ví dụ $\Phi_2\le4$ (tức $x\ge0$), cho $x=0$ với $(0,4)$. Quy tắc trọng số: $\min\Phi_1+\Phi_2=x^2+(x-2)^2$ có đạo hàm $4x-4$, nghiệm $x=1$, cùng cho $(1,1)$. Đổi trọng số, ví dụ $\min\Phi_1+0{,}1\Phi_2$: đạo hàm $2x+0{,}2(x-2)=2{,}2x-0{,}4=0$ cho $x=2/11\approx0{,}1818$, nghiêng về tiêu chí 1 (so sánh với trần $\Phi_2\le1$ cho $x=1$: hai quy tắc cho nghiệm khác nhau). Hai quy tắc thể hiện những ưu tiên khác nhau; cần phát biểu ưu tiên trước khi chọn nghiệm.

**B(e).** Mục tiêu trọng số bằng $0$ với mọi $x\in[0,1]$, nên mọi điểm đều là nghiệm vô hướng hóa. Tuy nhiên, với $x>0$, giá trị $(0,x)$ bị $(0,0)$ trội. Chỉ $x=0$ là Pareto. Vậy trọng số không âm khác $0$ không bảo đảm mọi nghiệm vô hướng hóa là Pareto; điều kiện mọi trọng số dương của chiều thuận không được bỏ.
:::

---

## Ghi chú về nguồn và cấp độ

- Các bài 1–12 bám sát nội dung chính của bộ trang chiếu (§4.1–4.7); bài 13, 14 dùng nội dung phần mở rộng (tựa lồi, chia đôi, nhiều mục tiêu; §4.2.5, §4.6, A.5.5) và chỉ nên giao sau khi học viên đọc ghi chú phần mở rộng.
- Sách gốc: Boyd và Vandenberghe (2004), [giáo trình cục bộ](../sources/bv_cvxbook.pdf), bản dùng trong học phần.
- Mọi số liệu là ví dụ minh họa phục vụ tính toán; không gắn với số đo thực nghiệm.
