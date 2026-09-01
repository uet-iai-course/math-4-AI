# Bài 07 — Quy hoạch tuyến tính và quy hoạch động

Bài 02 đã giới thiệu quy hoạch tuyến tính như một lớp bài toán lồi. Ghi chú này đi sâu hơn vào cách dựng mô hình, hình học đa diện, dạng chuẩn, nghiệm cơ sở khả thi và điểm cực. Phần cuối giới thiệu quy hoạch động hữu hạn tất định như một công cụ khác cho quyết định theo chuỗi; hai lớp bài toán không được đồng nhất.

Quy ước chính cho quy hoạch tuyến tính là $\max c^Tx$ với $Ax=b$, $x\ge0$ khi nói về dạng chuẩn. Ký hiệu $A\in\mathbb R^{m\times n}$ có $\operatorname{rank}(A)=m\le n$. Trong phần quy hoạch động, chân trời là $k=0,\ldots,N$, tập trạng thái và tập điều khiển hữu hạn, chuyển trạng thái tất định và chi phí cộng theo giai đoạn.

Nguồn chính là Bertsimas và Tsitsiklis (1997), Chương 1–2, cho quy hoạch tuyến tính. Vanderbei (2014) bổ sung cách trình bày dạng chuẩn và nghiệm cơ sở. Phần quy hoạch động dựa trên MIT 15.093J/6.255J, Bài 16. Phương pháp đơn hình thuộc Bài 08; ở đây chỉ xét hình học của bước đi qua các đỉnh kề.

## A. Từ quyết định đến quy hoạch tuyến tính

Ta bắt đầu từ dữ kiện của một quyết định thực tế, viết chúng thành một quy hoạch tuyến tính, rồi kiểm tra cùng kỹ thuật trên một mất mát trong học máy.

### 1. Khuôn quy hoạch tuyến tính và mô hình hộp hạt

**Mục tiêu đọc hiểu.** Người đọc xác định được biến quyết định, dữ kiện, đơn vị, mục tiêu và các ràng buộc của một mô hình quy hoạch tuyến tính.

**Định nghĩa và giả thiết.** Quy hoạch tuyến tính (LP) tối ưu một hàm tuyến tính trên một tập được xác định bởi hữu hạn phương trình và bất phương trình tuyến tính. Một khuôn thường dùng là

$$
\begin{aligned}
\operatorname*{maximize}_{\mathbf x\in\mathbb R^n}\quad
&\mathbf c^T\mathbf x\\
\text{với}\quad
&\mathbf A\mathbf x\le \mathbf b,\\
&\mathbf G\mathbf x=\mathbf h,\\
&\ell\le \mathbf x\le \mathbf u.
\end{aligned}
$$

Mỗi thành phần của $\mathbf x$ là một đại lượng được lựa chọn. Các ma trận, véc-tơ hệ số và cận là dữ kiện cố định. Chiều cực đại hoặc cực tiểu phải được ghi rõ. Các đại lượng cộng với nhau trong một ràng buộc phải dùng đơn vị tương thích.

**Trực quan.** Mỗi bất đẳng thức tuyến tính giữ lại một nửa không gian. Phần giao của các nửa không gian và siêu phẳng là miền khả thi. Hàm mục tiêu tạo một họ đường mức song song; thay đổi giá trị mục tiêu tương ứng với tịnh tiến đường mức mà không làm đổi miền khả thi.

**Hình minh họa.**

![Từ dữ kiện và đơn vị của bài toán hộp hạt đến biến quyết định, ràng buộc và hàm mục tiêu tuyến tính.](img/lec-07/lp-model-units.svg)

::: example
**Ví dụ tính được.** Một cơ sở đóng hai loại hộp hạt. Đặt $x_1,x_2$ là số lô hộp loại 1 và loại 2. Mỗi lô đem lại lợi ích lần lượt là $2$ và $3$ đơn vị. Các giới hạn cho bài toán

$$
\begin{aligned}
\operatorname*{maximize}_{x_1,x_2}\quad
&z=2x_1+3x_2\\
\text{với}\quad
&x_1\le30,\\
&x_2\le20,\\
&x_1+2x_2\le54,\\
&x_1,x_2\ge0.
\end{aligned}
$$

Điểm $(30,12)$ dùng đúng $30+2\cdot12=54$ đơn vị nguồn lực chung và cho

$$
z=2\cdot30+3\cdot12=96.
$$

Điểm $(30,20)$ thỏa hai giới hạn sản lượng riêng nhưng dùng $70$ đơn vị nguồn lực chung, vượt giới hạn $16$ đơn vị. Vì không khả thi, giá trị mục tiêu của điểm này không được dùng để so sánh phương án.
:::

**Ý nghĩa và ứng dụng trong AI.** LP mô tả các quyết định phân bổ tài nguyên trong một lần, chẳng hạn chia thời gian xử lý, bộ nhớ hoặc thông lượng cho nhiều tác vụ khi lợi ích và mức dùng tài nguyên được xấp xỉ tuyến tính.

**Điểm dễ nhầm.** Biểu thức tuyến tính chưa đủ để tạo LP liên tục nếu biến còn bị buộc nguyên. Tích $x_1x_2$ hoặc lũy thừa $x_1^2$ là phi tuyến. Một phương án có giá trị mục tiêu lớn nhưng vi phạm một ràng buộc không phải ứng viên tối ưu.

**Câu hỏi kiểm tra.** Hai luồng xử lý có lợi ích $4$ và $5$ trên mỗi đơn vị, với $x_1\le8$, $x_2\le6$, $2x_1+x_2\le14$ và $x\ge0$. Hãy viết LP đầy đủ và kiểm tra điểm $(4,6)$.

### 2. Mất mát từng đoạn và hồi quy chuẩn $L_1$ dưới dạng LP

**Mục tiêu đọc hiểu.** Người đọc đưa được tổng trị tuyệt đối của các phần dư về quy hoạch tuyến tính và giải thích được vì sao phép chuyển là tương đương.

**Định nghĩa và giả thiết.** Cho dữ liệu $\mathbf a_i\in\mathbb R^n$, $b_i\in\mathbb R$ và tham số $\mathbf x\in\mathbb R^n$. Phần dư của mẫu $i$ là

$$
r_i=\mathbf a_i^T\mathbf x-b_i.
$$

Hồi quy chuẩn $L_1$ cực tiểu hóa $\sum_i|r_i|$. Với biến phụ $t_i\ge0$, điều kiện

$$
-t_i\le r_i\le t_i
$$

tương đương với $t_i\ge|r_i|$. Vì mục tiêu cực tiểu hóa tổng các $t_i$, ta được LP

$$
\begin{aligned}
\operatorname*{minimize}_{\mathbf x,\mathbf t}\quad
&\sum_{i=1}^m t_i\\
\text{với}\quad
&-t_i\le \mathbf a_i^T\mathbf x-b_i\le t_i,
\quad i=1,\ldots,m,\\
&t_i\ge0.
\end{aligned}
$$

**Trực quan.** Với mỗi phần dư, $t_i$ là độ cao nhỏ nhất nằm trên cả $r_i$ và $-r_i$. Hai bất đẳng thức tuyến tính dựng đúng đồ thị chữ V của trị tuyệt đối khi mục tiêu ép $t_i$ xuống thấp nhất.

**Hình minh họa.**

![Đồ thị trị tuyệt đối và hai bất đẳng thức tuyến tính dùng biến phụ để biểu diễn mất mát chuẩn L1.](img/lec-07/l1-residual-slack.svg)

::: example
**Ví dụ tính được.** Với hai quan sát một chiều $b_1=1$, $b_2=3$ và $a_1=a_2=1$, bài toán là

$$
\min_{x\in\mathbb R}|x-1|+|x-3|.
$$

Dạng LP tương đương là

$$
\begin{aligned}
\min_{x,t_1,t_2}\quad&t_1+t_2\\
\text{với}\quad
&-t_1\le x-1\le t_1,\\
&-t_2\le x-3\le t_2,\\
&t_1,t_2\ge0.
\end{aligned}
$$

Nếu $x\in[1,3]$ thì

$$
|x-1|+|x-3|=(x-1)+(3-x)=2.
$$

Ngoài đoạn này, tổng lớn hơn $2$. Vì vậy mọi $x\in[1,3]$ đều tối ưu và giá trị tối ưu là $2$.
:::

**Ý nghĩa và ứng dụng trong AI.** Mất mát chuẩn $L_1$ tăng tuyến tính theo độ lớn phần dư, nên một ngoại lệ rất lớn không bị khuếch đại theo bình phương như trong bình phương tối thiểu. Phép cải dạng cho phép giải bài toán không khả vi này bằng một bộ giải LP.

**Điểm dễ nhầm.** Không khả vi không đồng nghĩa không lồi. Hai bất đẳng thức chỉ cho $t_i\ge|r_i|$; dấu bằng tại tối ưu xuất hiện vì hệ số của $t_i$ trong mục tiêu là dương. Nghiệm của hồi quy $L_1$ không nhất thiết duy nhất.

**Câu hỏi kiểm tra.** Hãy đưa

$$
\min_x\max\{|x|,|x-2|\}
$$

về LP với một biến phụ $t$, rồi xác định nghiệm và giá trị tối ưu.

## B. Hình học đa diện và dạng chuẩn

Bài hộp hạt tiếp tục được dùng để chuyển từ danh sách ràng buộc sang đa diện, rồi mã hóa một đỉnh bằng nghiệm cơ sở khả thi.

### 3. Đa diện, nửa không gian và đường mức

**Mục tiêu đọc hiểu.** Người đọc dựng được miền khả thi từ các nửa không gian và dùng đường mức để diễn giải hướng cải thiện của mục tiêu.

**Định nghĩa và giả thiết.** Một đa diện là tập nghiệm của hữu hạn bất đẳng thức tuyến tính,

$$
P=\{\mathbf x\in\mathbb R^n:\mathbf A\mathbf x\le\mathbf b\}.
$$

Các đẳng thức tuyến tính có thể được ghi bằng hai bất đẳng thức ngược chiều. Đa diện có thể rỗng, bị chặn hoặc không bị chặn.

**Trực quan.** Mỗi hàng của $\mathbf A\mathbf x\le\mathbf b$ tạo một nửa không gian. Miền khả thi là phần giao của chúng. Các đường mức $\mathbf c^T\mathbf x=\alpha$ song song khi $\alpha$ thay đổi; đường mức cuối cùng còn chạm miền cho biết vị trí tối ưu theo hình học.

**Hình minh họa.**

![Miền khả thi của bài hộp hạt có năm đỉnh và các đường mức song song của hàm mục tiêu.](img/lec-07/polyhedron-level-sets.svg)

::: example
**Ví dụ tính được.** Miền khả thi của bài hộp hạt có năm đỉnh

$$
(0,0),\quad(30,0),\quad(30,12),\quad(14,20),\quad(0,20).
$$

Với $z=2x_1+3x_2$, các giá trị tương ứng là

$$
0,\quad60,\quad96,\quad88,\quad60.
$$

Đường mức $z=96$ đi qua $(30,12)$. So sánh các đỉnh cho thấy đây là đỉnh có giá trị lớn nhất. Định lý ở phần sau sẽ giải thích vì sao việc tìm một đỉnh tối ưu là đủ dưới các giả thiết thích hợp.
:::

**Ý nghĩa và ứng dụng trong AI.** Đa diện biểu diễn đồng thời nhiều giới hạn tuyến tính về bộ nhớ, độ trễ, năng lượng, tỷ lệ dữ liệu hoặc công suất. Hình học cho biết ràng buộc nào đang hoạt động tại một phương án và mục tiêu ưu tiên hướng nào.

**Điểm dễ nhầm.** Đa diện không đồng nghĩa với đa giác bị chặn. Miền khả thi không bị chặn chưa đủ để kết luận giá trị mục tiêu không bị chặn; mục tiêu có thể không tăng theo các hướng kéo dài vô hạn của miền.

**Câu hỏi kiểm tra.** Nếu thêm ràng buộc $x_1+x_2\ge10$ vào bài hộp hạt, những đỉnh cũ nào bị loại? Miền mới còn bị chặn không?

### 4. Dạng chuẩn và các phép chuyển cơ bản

**Mục tiêu đọc hiểu.** Người đọc chuyển được một hệ ràng buộc tuyến tính về quy ước dạng chuẩn và khôi phục được nghiệm trong các biến gốc.

**Định nghĩa và giả thiết.** Trong ghi chú này, dạng chuẩn của LP được quy ước là

$$
\begin{aligned}
\operatorname*{maximize}_{\mathbf x\in\mathbb R^n}\quad
&\mathbf c^T\mathbf x\\
\text{với}\quad
&\mathbf A\mathbf x=\mathbf b,\\
&\mathbf x\ge\mathbf0,
\end{aligned}
$$

trong đó $\mathbf A\in\mathbb R^{m\times n}$ có $\operatorname{rank}(\mathbf A)=m\le n$ sau khi bỏ các phương trình phụ thuộc. Ba phép chuyển thường dùng là:

- $a^T x\le b$ trở thành $a^T x+s=b$ với $s\ge0$;
- $a^T x\ge b$ trở thành $a^T x-s=b$ với $s\ge0$;
- biến tự do $x$ được thay bởi $x=x^+-x^-$ với $x^+,x^-\ge0$.

Đổi cực tiểu thành cực đại bằng $\min c^Tx=-\max(-c^Tx)$.

**Trực quan.** Biến phụ đo phần nguồn lực chưa dùng; biến dư đo phần vượt trên một cận dưới. Tách biến tự do thành hiệu của hai biến không âm mở rộng không gian biểu diễn nhưng vẫn cho phép khôi phục biến gốc.

**Hình minh họa.**

![Các bất đẳng thức được chuyển thành phương trình bằng biến phụ hoặc biến dư, rồi các cột cơ sở được đánh dấu trong ma trận chuẩn.](img/lec-07/standard-form-basis.svg)

::: example
**Ví dụ tính được.** Bài hộp hạt trở thành

$$
\begin{aligned}
x_1+s_1&=30,\\
x_2+s_2&=20,\\
x_1+2x_2+s_3&=54,\\
x_1,x_2,s_1,s_2,s_3&\ge0.
\end{aligned}
$$

Tại $(x_1,x_2)=(30,12)$,

$$
(s_1,s_2,s_3)=(0,8,0).
$$

Các giá trị này cho biết giới hạn loại 1 và nguồn lực chung đang hoạt động, còn giới hạn loại 2 dư $8$ đơn vị.
:::

**Ý nghĩa và ứng dụng trong AI.** Dạng chuẩn tạo một giao diện đại số thống nhất cho bộ giải. Sau phép chuyển, trạng thái của các giới hạn được thể hiện trực tiếp qua các biến phụ và có thể liên hệ với một cơ sở ma trận.

**Điểm dễ nhầm.** Tài liệu khác có thể gọi $Ax\le b$ là dạng chuẩn; vì vậy phải nêu quy ước trước khi dùng. Thêm biến phụ không giữ nguyên tập khả thi trong cùng không gian biến, nhưng tạo một tương ứng một-một sau khi chiếu về biến gốc. Dấu của biến phụ và biến dư phụ thuộc chiều bất đẳng thức.

**Câu hỏi kiểm tra.** Giả sử $x_1\ge0$ và $x_2$ tự do. Hãy chuyển

$$
x_1-x_2\ge2
$$

thành một phương trình chỉ dùng biến không âm.

### 5. Cơ sở, nghiệm cơ sở khả thi và suy biến

**Mục tiêu đọc hiểu.** Người đọc tính được một nghiệm cơ sở, kiểm tra tính khả thi và nhận ra trường hợp suy biến.

**Định nghĩa và giả thiết.** Xét

$$
P=\{\mathbf x\in\mathbb R^n:\mathbf A\mathbf x=\mathbf b,\ \mathbf x\ge\mathbf0\},
\qquad
\operatorname{rank}(\mathbf A)=m.
$$

Chọn tập chỉ số $B\subseteq\{1,\ldots,n\}$ gồm $m$ phần tử sao cho ma trận con $\mathbf A_B$ khả nghịch. Đặt $N=B^c$ và

$$
\mathbf x_N=\mathbf0,
\qquad
\mathbf x_B=\mathbf A_B^{-1}\mathbf b.
$$

Véc-tơ thu được là một nghiệm cơ sở. Nó là **nghiệm cơ sở khả thi** (basic feasible solution, BFS) nếu $\mathbf x_B\ge\mathbf0$. BFS là **suy biến** nếu ít nhất một biến cơ sở bằng $0$.

**Trực quan.** Chọn một cơ sở là chọn $m$ cột độc lập để giải hệ vuông, đồng thời ghim các biến còn lại về $0$. Trong trường hợp suy biến, nhiều lựa chọn cơ sở có thể cùng biểu diễn một điểm hình học.

**Hình minh họa.**

![Một điểm cực của đa diện được nối với các cột cơ sở và nghiệm của hệ ma trận con.](img/lec-07/standard-form-basis.svg)

::: example
**Ví dụ tính được.** Với thứ tự biến $(x_1,x_2,s_1,s_2,s_3)$ của bài hộp hạt,

$$
\mathbf A=
\begin{bmatrix}
1&0&1&0&0\\
0&1&0&1&0\\
1&2&0&0&1
\end{bmatrix},
\qquad
\mathbf b=
\begin{bmatrix}30\\20\\54\end{bmatrix}.
$$

Chọn $B=\{1,2,4\}$, tương ứng với $(x_1,x_2,s_2)$. Khi đó

$$
\mathbf A_B=
\begin{bmatrix}
1&0&0\\
0&1&1\\
1&2&0
\end{bmatrix},
\qquad
\det(\mathbf A_B)=-2\ne0.
$$

Đặt $s_1=s_3=0$ và giải $\mathbf A_B\mathbf x_B=\mathbf b$ cho

$$
(x_1,x_2,s_2)=(30,12,8).
$$

Mọi thành phần đều không âm, nên đây là một BFS không suy biến.

Một trường hợp biên là

$$
x_1+x_3=1,
\qquad
x_2+x_4=0,
\qquad
\mathbf x\ge\mathbf0.
$$

Với cơ sở $B=\{1,2\}$, nghiệm cơ sở là $(x_1,x_2)=(1,0)$. Biến cơ sở $x_2=0$, nên BFS $(1,0,0,0)$ suy biến.
:::

**Ý nghĩa và ứng dụng trong AI.** Cơ sở là một mô tả đại số gọn của một phương án tại giao của các ràng buộc. Các bộ giải LP dựa trên cơ sở có thể cập nhật một tập cột nhỏ thay vì thao tác trực tiếp trên toàn bộ đa diện.

**Điểm dễ nhầm.** Điều kiện $\operatorname{rank}(\mathbf A)=m$ chưa bảo đảm mọi tập $m$ cột đều là cơ sở. Khả nghịch của $\mathbf A_B$ chưa bảo đảm tính khả thi; còn phải kiểm $\mathbf A_B^{-1}\mathbf b\ge0$. Suy biến không có nghĩa bài toán vô nghiệm hoặc có nhiều điểm khác nhau.

**Câu hỏi kiểm tra.** Với cơ sở $B=\{1,2,4\}$ của bài hộp hạt, hãy nêu các biến ngoài cơ sở, tính nghiệm đầy đủ theo thứ tự $(x_1,x_2,s_1,s_2,s_3)$ và kiểm tính suy biến.

## C. Điểm cực và logic tìm kiếm trên đa diện

Định nghĩa hình học của điểm cực sẽ được nối với nghiệm cơ sở khả thi. Từ đó, ta xác định các giả thiết cho bảo đảm tối ưu và bước đi qua các đỉnh kề.

### 6. Điểm cực và trường hợp nhiều nghiệm tối ưu

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được điểm cực bằng định nghĩa tổ hợp lồi và phân biệt điểm cực với một nghiệm tối ưu bất kỳ.

**Định nghĩa và giả thiết.** Cho tập lồi $P$. Điểm $\mathbf v\in P$ là một **điểm cực** nếu

$$
\mathbf v=\lambda\mathbf y+(1-\lambda)\mathbf z,
\qquad
\mathbf y,\mathbf z\in P,
\qquad
0<\lambda<1
$$

chỉ có thể xảy ra khi $\mathbf y=\mathbf z=\mathbf v$.

**Trực quan.** Một điểm nằm trong phần trong của một đoạn thẳng không tầm thường thuộc $P$ không phải điểm cực. Trên một đa giác hai chiều, điểm cực trùng với trực giác về đỉnh; định nghĩa tổ hợp lồi vẫn dùng được trong nhiều chiều.

**Hình minh họa.**

![Một cạnh tối ưu của đa diện cho thấy hai đầu mút là điểm cực còn các điểm ở giữa vẫn tối ưu nhưng không phải điểm cực.](img/lec-07/lp-four-statuses.svg)

::: example
**Ví dụ tính được.** Xét

$$
\begin{aligned}
\operatorname*{minimize}_{x_1,x_2}\quad&-x_1-x_2\\
\text{với}\quad&x_1+x_2\le2,\\
&x_1,x_2\ge0.
\end{aligned}
$$

Giá trị nhỏ nhất là $-2$. Mọi điểm trên đoạn

$$
\{(x_1,x_2):x_1+x_2=2,\ x_1,x_2\ge0\}
$$

đều tối ưu. Hai đầu mút $(2,0)$ và $(0,2)$ là điểm cực. Điểm $(1,1)$ cũng tối ưu nhưng

$$
(1,1)=\frac12(2,0)+\frac12(0,2),
$$

nên không phải điểm cực.
:::

**Ý nghĩa và ứng dụng trong AI.** Khi nhiều cấu hình phân bổ có cùng chi phí hoặc lợi ích, tập nghiệm tối ưu có thể chứa cả một mặt của đa diện. Một điểm cực tối ưu là một đại diện có cấu trúc, nhưng không mô tả hết mọi nghiệm tối ưu.

**Điểm dễ nhầm.** Phát biểu đúng là có thể tồn tại một điểm cực tối ưu dưới các giả thiết phù hợp. Phát biểu “mọi nghiệm tối ưu đều là điểm cực” là sai. Điểm cực là khái niệm hình học và chưa phụ thuộc hàm mục tiêu.

**Câu hỏi kiểm tra.** Trên đoạn nghiệm tối ưu của ví dụ, điểm $(1/2,3/2)$ có phải điểm cực không? Hãy viết nó thành một tổ hợp lồi của hai đầu mút.

### 7. Tương đương giữa điểm cực, nghiệm cơ sở khả thi và độc lập cột

**Mục tiêu đọc hiểu.** Người đọc chuyển được giữa ba chứng nhận hình học và đại số của cùng một điểm khả thi ở dạng chuẩn.

**Định nghĩa và giả thiết.** Với

$$
P=\{\mathbf x:\mathbf A\mathbf x=\mathbf b,\ \mathbf x\ge\mathbf0\},
\qquad
\operatorname{rank}(\mathbf A)=m,
$$

và $\mathbf x\in P$, ba mệnh đề sau tương đương:

1. $\mathbf x$ là điểm cực của $P$;
2. $\mathbf x$ là một nghiệm cơ sở khả thi;
3. các cột $\mathbf A_j$ ứng với các chỉ số $j$ thỏa $x_j>0$ độc lập tuyến tính.

Hệ quả là một điểm cực có nhiều nhất $m$ thành phần dương. Chứng minh đầy đủ được đặt ở phần định lý và chứng minh quan trọng.

**Trực quan.** Điều kiện độc lập cột loại một hướng dịch chuyển hai phía vẫn giữ phương trình và tính không âm. Vì vậy điểm không thể nằm giữa một đoạn khả thi. Ngược lại, nếu các cột dương phụ thuộc, một nhiễu đủ nhỏ theo hai dấu tạo hai điểm khả thi khác nhau có trung điểm là $\mathbf x$.

**Hình minh họa.**

![Đỉnh của đa diện và ma trận con khả nghịch biểu diễn cùng một nghiệm dưới hai góc nhìn hình học và đại số.](img/lec-07/standard-form-basis.svg)

::: example
**Ví dụ tính được.** BFS của bài hộp hạt là

$$
\mathbf x=(30,12,0,8,0)^T.
$$

Các thành phần dương nằm ở chỉ số $1,2,4$. Ba cột tương ứng tạo ma trận

$$
\begin{bmatrix}
1&0&0\\
0&1&1\\
1&2&0
\end{bmatrix}
$$

có định thức $-2$, nên độc lập tuyến tính. Theo định lý, $\mathbf x$ là một điểm cực của đa diện ở dạng chuẩn. Sau khi bỏ các tọa độ biến phụ, điểm tương ứng trong không gian gốc là $(30,12)$.
:::

**Ý nghĩa và ứng dụng trong AI.** Tương đương này cho phép chuyển một câu hỏi hình học về đỉnh thành phép kiểm tra hạng và giải hệ tuyến tính. Đây là cơ sở để các phương pháp dựa trên cơ sở thao tác với ma trận thay vì phải dựng hình đa diện.

**Điểm dễ nhầm.** Một điểm suy biến có thể tương ứng với nhiều cơ sở khác nhau. Do đó “nhiều cơ sở” không kéo theo “nhiều điểm”. Điều kiện về các cột dương không nói rằng mọi cột ngoài tập đó phải phụ thuộc; nó chỉ yêu cầu tập cột đang mang hệ số dương độc lập.

**Câu hỏi kiểm tra.** Nếu $\operatorname{rank}(\mathbf A)=m$ và một điểm khả thi có nhiều hơn $m$ thành phần dương, điểm đó có thể là điểm cực không? Hãy giải thích bằng điều kiện độc lập cột.

### 8. Tồn tại điểm cực, điểm cực tối ưu và bốn kết cục

**Mục tiêu đọc hiểu.** Người đọc phân loại được kết cục của một LP và nêu đủ giả thiết để kết luận có điểm cực tối ưu.

**Định nghĩa và giả thiết.** Một đa diện $P$ chứa một đường thẳng nếu tồn tại $\mathbf x\in P$ và $\mathbf d\ne\mathbf0$ sao cho

$$
\mathbf x+t\mathbf d\in P
\qquad
\text{với mọi }t\in\mathbb R.
$$

Hai kết quả cần dùng là:

- đa diện không rỗng có điểm cực khi và chỉ khi nó không chứa đường thẳng;
- nếu $P$ có điểm cực và $\max_{\mathbf x\in P}\mathbf c^T\mathbf x$ có giá trị tối ưu hữu hạn, thì tồn tại một điểm cực tối ưu.

Đặc biệt, đa diện dạng chuẩn $\{\mathbf x:\mathbf A\mathbf x=\mathbf b,\ \mathbf x\ge0\}$ nếu khác rỗng thì không chứa đường thẳng và có ít nhất một điểm cực.

**Trực quan.** Cần tách hai câu hỏi. Hình học miền quyết định miền có điểm cực hay không; hướng mục tiêu quyết định giá trị có tăng vô hạn hay đạt một mức hữu hạn. Một miền kéo dài vô hạn vẫn có thể có nghiệm tối ưu hữu hạn.

**Hình minh họa.**

![Bốn kết cục của quy hoạch tuyến tính gồm không khả thi, mục tiêu không bị chặn, nghiệm tối ưu duy nhất và nhiều nghiệm tối ưu.](img/lec-07/lp-four-statuses.svg)

::: example
**Ví dụ tính được.** Bốn bài toán một hoặc hai biến minh họa bốn kết cục:

1. $\max x$ với $x\le0$ và $x\ge1$: miền rỗng, nên bài toán không khả thi.
2. $\max x$ với $x\ge0$: miền khác rỗng và mục tiêu không bị chặn trên.
3. $\max x$ với $0\le x\le1$: nghiệm tối ưu duy nhất là $x^*=1$.
4. $\max x_1+x_2$ với $x_1+x_2\le1$, $x\ge0$: mọi điểm trên cạnh $x_1+x_2=1$ tối ưu, trong đó $(1,0)$ và $(0,1)$ là hai điểm cực tối ưu.
:::

**Ý nghĩa và ứng dụng trong AI.** Bốn kết cục giúp phân biệt lỗi mô hình do các yêu cầu mâu thuẫn, thiếu giới hạn tài nguyên, nghiệm xác định duy nhất và nhiều cấu hình có hiệu năng ngang nhau. Chẩn đoán kết cục phải đi trước việc diễn giải một nghiệm.

**Điểm dễ nhầm.** “Đa diện không bị chặn” mô tả miền, còn “mục tiêu không bị chặn” mô tả giá trị theo một hướng cụ thể. Một giá trị tối ưu hữu hạn của LP trên đa diện được đạt, nhưng kết luận về điểm cực tối ưu vẫn phải đi kèm giả thiết miền có điểm cực.

**Câu hỏi kiểm tra.** Xét

$$
P=\{(x_1,x_2):0\le x_1\le1,\ x_2\ge0\}
$$

và mục tiêu $\max x_1$. Miền có bị chặn không? Giá trị tối ưu có hữu hạn và được đạt không? Tập nghiệm tối ưu là gì?

### 9. Đỉnh kề và bước đi cải thiện ở mức ý niệm

**Mục tiêu đọc hiểu.** Người đọc mô tả được một bước cải thiện qua đỉnh kề và phân biệt mô tả hình học này với phương pháp đơn hình đầy đủ.

**Định nghĩa và giả thiết.** Hai điểm cực của một đa diện là **kề nhau** nếu đoạn nối chúng là một cạnh, tức một mặt một chiều của đa diện. Cho $P$ có điểm cực và bài toán

$$
\max_{\mathbf x\in P}\mathbf c^T\mathbf x
$$

có giá trị tối ưu hữu hạn. Khi đó, nếu một điểm cực $\mathbf v$ chưa tối ưu, tồn tại một điểm cực kề $\mathbf w$ sao cho

$$
\mathbf c^T\mathbf w>\mathbf c^T\mathbf v.
$$

Đây là phát biểu hình học; chứng minh bằng nón tiếp xúc và hướng cạnh được đặt ở phần định lý riêng.

**Trực quan.** Thay vì quét mọi điểm của miền khả thi, ta đi trên đồ thị các đỉnh và cạnh. Mỗi bước giữ tính khả thi và tăng nghiêm ngặt giá trị mục tiêu. Nếu không còn đỉnh kề cải thiện, bổ đề trên chứng nhận điểm hiện tại tối ưu dưới đúng giả thiết.

**Hình minh họa.**

![Đường đi qua hai cạnh của đa diện hộp hạt từ gốc tọa độ đến đỉnh tối ưu, với giá trị mục tiêu tăng ở mỗi bước.](img/lec-07/conceptual-vertex-walk.svg)

::: example
**Ví dụ tính được.** Trên đa diện hộp hạt, xét đường đi

$$
(0,0)\longrightarrow(30,0)\longrightarrow(30,12).
$$

Ba giá trị mục tiêu là

$$
0\longrightarrow60\longrightarrow96.
$$

Mỗi đoạn là một cạnh của đa diện và mỗi bước cải thiện nghiêm ngặt. Tại $(30,12)$, hai đỉnh kề là $(30,0)$ với giá trị $60$ và $(14,20)$ với giá trị $88$; không đỉnh kề nào cải thiện giá trị $96$.
:::

**Ý nghĩa và ứng dụng trong AI.** Logic đỉnh kề giải thích vì sao một bộ giải LP có thể khai thác cấu trúc cục bộ của cơ sở thay vì liệt kê mọi phương án khả thi. Nó tạo cầu nối từ hình học đa diện sang phương pháp đơn hình.

**Điểm dễ nhầm.** Mô tả này chưa phải một thuật toán hoàn chỉnh. Nó chưa chỉ cách tìm điểm cực xuất phát, chọn cơ sở kề, thực hiện phép xoay cơ sở hoặc chống quay vòng khi suy biến. Các nội dung đó thuộc bài tiếp theo.

**Câu hỏi kiểm tra.** Vì sao tiêu chuẩn “không còn đỉnh kề cải thiện” không thể được dùng nếu bài toán không có điểm cực hoặc mục tiêu không có giá trị tối ưu hữu hạn? Hãy chỉ ra giả thiết bị thiếu trong mỗi trường hợp.

## D. Quy hoạch động hữu hạn tất định

Quy hoạch tuyến tính gom quyết định vào một véc-tơ. Khi quyết định hiện tại làm thay đổi lựa chọn tương lai, mô hình cần thêm chỉ số giai đoạn và một trạng thái tóm tắt quá khứ.

### 10. Trạng thái, điều khiển, chuyển trạng thái và chi phí cộng

**Mục tiêu đọc hiểu.** Người đọc mô tả được một bài toán quyết định hữu hạn tất định và kiểm tra được trạng thái có giữ đủ thông tin cần cho tương lai hay không.

**Định nghĩa và giả thiết.** Ở giai đoạn $k=0,\ldots,N-1$, hệ có trạng thái $x_k\in X_k$. Ta chọn điều khiển $u_k\in U_k(x_k)$, chịu chi phí $g_k(x_k,u_k)$ và chuyển tất định theo

$$
x_{k+1}=f_k(x_k,u_k).
$$

Tổng chi phí của một chuỗi quyết định là

$$
\sum_{k=0}^{N-1}g_k(x_k,u_k)+g_N(x_N).
$$

Trong bài này, mỗi $X_k$ và $U_k(x)$ hữu hạn, $U_k(x)\ne\varnothing$, và mọi chi phí đều hữu hạn. Trạng thái được gọi là đủ nếu, khi đã biết $x_k$, chi phí và các chuyển tiếp tương lai không còn phụ thuộc vào lịch sử trước $k$.

**Trực quan.** Một cây lịch sử có thể chứa nhiều nhánh đi đến cùng một tình huống tương lai. Trạng thái đủ gộp các nhánh đó thành một nút, để phần còn lại chỉ cần giải một lần.

![Đồ thị phân tầng biểu diễn trạng thái, lựa chọn và chi phí của một bài toán hữu hạn tất định.](img/lec-07/dp-layered-graph.svg)

**Ví dụ tính được.** Xét đồ thị tầng với các chi phí

$$
\begin{aligned}
c(s,A)&=2,&c(s,B)&=5,\\
c(A,C)&=4,&c(A,D)&=2,\\
c(B,C)&=1,&c(B,D)&=3,\\
c(C,t)&=3,&c(D,t)&=1.
\end{aligned}
$$

Một trạng thái là nút hiện tại. Chẳng hạn, mọi lịch sử đi đến $C$ có cùng lựa chọn còn lại $C\to t$ và cùng chi phí tương lai $3$, nên tên nút là trạng thái đủ cho bài toán này.

**Ý nghĩa và ứng dụng trong AI.** Cấu trúc này mô tả một chuỗi lựa chọn mô hình, tuyến xử lý hoặc mức tài nguyên qua nhiều giai đoạn. Nó chỉ phù hợp khi trạng thái giữ được mọi thông tin quá khứ còn ảnh hưởng đến quyết định sau.

**Điểm dễ nhầm.** Trạng thái không nhất thiết là toàn bộ lịch sử, nhưng cũng không được bỏ thông tin làm thay đổi chi phí hoặc chuyển tiếp tương lai. “Tất định” nghĩa là $f_k(x,u)$ cho đúng một trạng thái kế tiếp; bài này chưa xét kỳ vọng hay nhiễu ngẫu nhiên.

**Câu hỏi kiểm tra.** Nếu chi phí từ $C$ đến $t$ còn phụ thuộc vào việc đã đi qua $A$ hay $B$, chỉ dùng nút $C$ làm trạng thái có đủ không? Hãy nêu một cách mở rộng trạng thái.

### 11. Nguyên lý tối ưu và phương trình Bellman

**Mục tiêu đọc hiểu.** Người đọc lập được truy hồi Bellman với đúng điều kiện biên, tính được hàm giá trị và giải thích được vì sao một đuôi của chính sách tối ưu cũng phải tối ưu.

**Định nghĩa và giả thiết.** Hàm giá trị $J_k(x)$ là chi phí nhỏ nhất còn lại từ trạng thái $x$ ở giai đoạn $k$. Với các giả thiết hữu hạn ở Chủ đề 10,

$$
J_N(x)=g_N(x),
$$

và, với $k=N-1,\ldots,0$,

$$
J_k(x)=
\min_{u\in U_k(x)}
\left\{
g_k(x,u)+J_{k+1}\bigl(f_k(x,u)\bigr)
\right\}.
$$

Tập điều khiển hữu hạn và khác rỗng bảo đảm giá trị nhỏ nhất được đạt.

**Trực quan.** Mỗi lựa chọn tách chi phí còn lại thành hai phần: chi phí trả ngay và chi phí tối ưu từ trạng thái kế tiếp. Nếu phần đuôi chưa tối ưu, thay nó bằng một đuôi tốt hơn sẽ làm cả chuỗi tốt hơn.

![Giá trị Bellman được truyền từ đích về nguồn trên đồ thị phân tầng.](img/lec-07/dp-layered-graph.svg)

**Ví dụ tính được.** Đặt chi phí cuối tại $t$ bằng $0$. Từ phải sang trái,

$$
J(C)=3,\qquad J(D)=1.
$$

Do đó

$$
J(A)=\min\{4+3,\,2+1\}=3,
$$

$$
J(B)=\min\{1+3,\,3+1\}=4,
$$

và

$$
J(s)=\min\{2+3,\,5+4\}=5.
$$

**Ý nghĩa và ứng dụng trong AI.** Bellman biến một bài toán chuỗi thành các bài toán con theo trạng thái. Cơ chế này xuất hiện trong lập lịch suy luận, chọn tuyến xử lý và nhiều mô hình quyết định tuần tự.

**Điểm dễ nhầm.** $J_k(x)$ là toàn bộ chi phí tối ưu còn lại, không phải chi phí của cạnh kế tiếp. Điều kiện biên nằm ở giai đoạn $N$, nơi không còn điều khiển. Với tập điều khiển vô hạn, ký hiệu $\min$ cần thêm điều kiện đạt cực tiểu; phạm vi hiện tại tránh vấn đề đó.

**Câu hỏi kiểm tra.** Vì sao $J(A)$ bằng $3$ chứ không bằng chi phí cạnh nhỏ nhất $2$? Hãy chỉ ra hai phần được cộng trong mỗi lựa chọn.

## E. Giải ngược, chính sách và chi phí tính toán

Phương trình Bellman cho giá trị tối ưu ở từng trạng thái. Để thực thi quyết định, ta còn phải lưu lựa chọn đạt cực tiểu và khôi phục chính sách theo chiều thời gian.

### 12. Giải ngược và khôi phục chính sách

**Mục tiêu đọc hiểu.** Người đọc thực hiện được lượt tính ngược, lưu một lựa chọn tối ưu ở mỗi trạng thái và chạy xuôi để khôi phục một chính sách.

**Định nghĩa và giả thiết.** Trong khi tính $J_k(x)$, chọn và lưu

$$
u_k^*(x)\in
\operatorname*{argmin}_{u\in U_k(x)}
\left\{
g_k(x,u)+J_{k+1}(f_k(x,u))
\right\}.
$$

Sau lượt tính từ $N$ về $0$, bắt đầu tại $x_0$ và dùng $u_k^*(x_k)$ để tạo $x_{k+1}$. Nếu có nhiều lựa chọn cùng đạt cực tiểu, cần một quy tắc chọn hoặc lưu toàn bộ tập lựa chọn.

**Trực quan.** Lượt đi ngược ghi “giá tốt nhất từ đây”; lượt đi xuôi lần theo các mũi tên đã lưu. Giá trị và chính sách là hai sản phẩm khác nhau.

![Đồ thị tầng dùng cho lượt tính giá trị từ phải sang trái và lượt khôi phục chính sách từ trái sang phải.](img/lec-07/dp-layered-graph.svg)

**Ví dụ tính được.** Với dữ kiện ban đầu, các lựa chọn đạt cực tiểu cho đường từ $s$ là $s\to A$, $A\to D$, $D\to t$. Chính sách tạo đường

$$
s\to A\to D\to t
$$

với tổng chi phí $2+2+1=5$. Nếu đổi $c(s,B)=3$ và $c(C,t)=0$, ta có

$$
J(C)=0,\quad J(D)=1,\quad J(A)=3,\quad J(B)=1,\quad J(s)=4,
$$

và một đường tối ưu mới là $s\to B\to C\to t$.

**Ý nghĩa và ứng dụng trong AI.** Trong một hệ có nhiều nhánh xử lý, bảng giá trị trả lời chi phí tốt nhất, còn bảng lựa chọn cho biết phải chạy nhánh nào ở mỗi trạng thái quan sát được.

**Điểm dễ nhầm.** Chỉ lưu $J_k$ chưa chắc khôi phục được đúng chính sách khi không còn dữ kiện chuyển tiếp hoặc khi có nhiều phần tử trong $\operatorname*{argmin}$. Một thay đổi cục bộ về chi phí có thể đổi cả các lựa chọn ở những tầng trước.

**Câu hỏi kiểm tra.** Với dữ kiện đã đổi, hãy kiểm trực tiếp hai tổng chi phí $s\to A\to D\to t$ và $s\to B\to C\to t$.

### 13. Dùng lại bài toán con và độ phức tạp

**Mục tiêu đọc hiểu.** Người đọc đếm được số cặp trạng thái–điều khiển mà giải ngược phải xét, chỉ ra phần tiết kiệm so với liệt kê chuỗi và nhận ra giới hạn do số trạng thái.

**Định nghĩa và giả thiết.** Với các tập hữu hạn, giải ngược xét mỗi cặp $(x,u)$ khả dĩ một lần. Số phép đánh giá chuyển tiếp có bậc

$$
\sum_{k=0}^{N-1}\sum_{x\in X_k}|U_k(x)|.
$$

Lưu toàn bộ giá trị cần bộ nhớ tỉ lệ với $\sum_k|X_k|$. Nếu chỉ cần giá trị đầu và truy hồi chỉ nối hai tầng liền nhau, có thể giữ hai tầng; khôi phục đầy đủ chính sách thường cần lưu thêm lựa chọn.

**Trực quan.** Liệt kê chuỗi đếm lại cùng một phần đuôi mỗi khi hai lịch sử hội tụ. Quy hoạch động nhận diện phần đuôi bằng trạng thái và tính nó một lần.

![Nhiều lịch sử hội tụ về cùng trạng thái và dùng chung một bài toán con.](img/lec-07/dp-state-sufficiency.svg)

**Ví dụ tính được.** Với sáu quyết định nhị phân, liệt kê thô có $2^6=64$ chuỗi. Nếu mỗi tầng trung gian chỉ có hai trạng thái và mỗi trạng thái nối đến hai trạng thái ở tầng sau, số cạnh cần đánh giá trong một đồ thị gồm một nguồn, sáu tầng hai trạng thái và một đích là

$$
2+5\cdot4+2=24.
$$

Con số cụ thể phụ thuộc cấu trúc biên; điểm tiết kiệm là đếm cạnh giữa các trạng thái thay vì đếm toàn bộ lịch sử.

**Ý nghĩa và ứng dụng trong AI.** Khi một trạng thái nhỏ tóm tắt được quá khứ, quy hoạch động có thể giảm đáng kể chi phí của bài toán lập lịch hoặc chọn tuyến. Lợi ích mất dần nếu trạng thái phải chứa quá nhiều biến.

**Điểm dễ nhầm.** Quy hoạch động không tự loại bỏ lời nguyền số chiều. Nếu số trạng thái tăng theo hàm mũ của số đặc trưng, bảng giá trị vẫn quá lớn. Việc gộp hai lịch sử chỉ đúng khi trạng thái sau gộp là đủ.

**Câu hỏi kiểm tra.** Nếu mỗi tầng có $q$ trạng thái và mỗi trạng thái nối đến mọi trạng thái của tầng sau, số cạnh giữa hai tầng là bao nhiêu? Điều này nói gì khi $q$ lớn?

## F. Bản đồ lựa chọn công cụ

Hai tuyến trong bài trả lời hai kiểu cấu trúc khác nhau. Phần này dùng cùng một bảng kiểm để tránh chọn công cụ chỉ vì tên bài toán quen thuộc.

### 14. Một quyết định hay một chuỗi quyết định: chọn LP hoặc DP

**Mục tiêu đọc hiểu.** Người đọc phân loại được một mô hình theo cấu trúc quyết định, nêu được giả thiết khiến quy hoạch tuyến tính hoặc quy hoạch động phù hợp và chỉ ra trường hợp nằm ngoài phạm vi bài.

**Định nghĩa và giả thiết.** Quy hoạch tuyến tính dùng một véc-tơ quyết định $x$, mục tiêu tuyến tính và các ràng buộc affine. Quy hoạch động hữu hạn tất định dùng chuỗi $(x_k,u_k)$, trạng thái đủ, chuyển tất định và chi phí cộng. Đây là hai khuôn mô hình, không phải hai cách viết mặc nhiên tương đương.

**Trực quan.** Nếu mọi quyết định có thể đặt cạnh nhau rồi kiểm bằng một hệ tuyến tính, hình học đa diện là cấu trúc chính. Nếu mỗi quyết định mở ra một trạng thái mới và phần tương lai chỉ phụ thuộc trạng thái đó, truy hồi Bellman là cấu trúc chính.

![Bản đồ phân biệt quyết định một lần bằng quy hoạch tuyến tính và quyết định theo chuỗi bằng quy hoạch động.](img/lec-07/lp-dp-decision-map.svg)

**Ví dụ tính được.** Phân bổ hai loại hộp dưới ba giới hạn tài nguyên là LP. Hồi quy với mất mát chuẩn $L_1$ trở thành LP sau khi thêm biến chặn phần dư. Đường đi theo tầng là DP. Nếu số hộp buộc nguyên, bài toán chuyển sang quy hoạch nguyên; nếu chuyển trạng thái có xác suất, mô hình nằm ngoài DP tất định của bài này.

**Ý nghĩa và ứng dụng trong AI.** LP thích hợp cho phân bổ tài nguyên tức thời với quan hệ tuyến tính. DP thích hợp cho lập lịch hoặc định tuyến theo giai đoạn khi trạng thái đủ có kích thước kiểm soát được.

**Điểm dễ nhầm.** Một bài toán đường đi có thể có nhiều cải dạng toán học. Trong phạm vi này, LP khai thác đa diện và điểm cực, còn DP tái sử dụng bài toán con theo trạng thái. Bài 08 mới chỉ ra cách cập nhật cơ sở trong phương pháp đơn hình.

**Câu hỏi kiểm tra.** Với mỗi tình huống sau, hãy chọn khuôn gần nhất và nêu giả thiết quyết định: phân bổ bộ nhớ cho ba mô hình; chọn ba bước xử lý phụ thuộc kết quả bước trước; phân bổ số máy chủ nguyên; định tuyến khi thời gian cạnh là ngẫu nhiên.

## G. Định lý và chứng minh quan trọng

Các định lý dưới đây chứng minh những kết quả về điểm cực, nghiệm tối ưu và truy hồi Bellman đã dùng ở trên. Các phép pivot, chi phí giảm và xử lý quay vòng thuộc Bài 08.

Phần này dùng hai quy ước. Với dạng chuẩn,

$$
P=\{x\in\mathbb R^n:Ax=b,\ x\ge0\},
\qquad
A\in\mathbb R^{m\times n},
\qquad
\operatorname{rank}(A)=m\le n.
$$

Với đa diện tổng quát, $P$ là giao của hữu hạn nửa không gian và siêu phẳng. Hai điểm cực $v,w$ được gọi là kề nhau nếu đoạn $[v,w]$ là một cạnh một chiều của $P$.

### 1. Điểm cực, độc lập cột và nghiệm cơ sở khả thi

**Giả thiết.** Cho

$$
P=\{x\in\mathbb R^n:Ax=b,\ x\ge0\},
\qquad
\operatorname{rank}(A)=m,
$$

và $x\in P$. Đặt hỗ trợ dương của $x$ là

$$
S(x)=\{j:x_j>0\}.
$$

**Kết luận.** Ba mệnh đề sau tương đương:

1. $x$ là điểm cực của $P$;
2. họ cột $\{A_j:j\in S(x)\}$ độc lập tuyến tính;
3. $x$ là một nghiệm cơ sở khả thi.

Ở mệnh đề 3, “nghiệm cơ sở khả thi” nghĩa là tồn tại tập chỉ số $B\subseteq\{1,\ldots,n\}$, $|B|=m$, sao cho $A_B$ khả nghịch, $x_N=0$ với $N=B^c$, và

$$
x_B=A_B^{-1}b\ge0.
$$

::: proof
Trước hết chứng minh mệnh đề 1 tương đương mệnh đề 2.

Giả sử các cột $A_j$, $j\in S(x)$, phụ thuộc tuyến tính. Khi đó tồn tại $d\ne0$, có hỗ trợ nằm trong $S(x)$, sao cho

$$
Ad=0.
$$

Vì $x_j>0$ với mọi $j\in S(x)$ và chỉ có hữu hạn tọa độ, tồn tại $\epsilon>0$ đủ nhỏ để

$$
x+\epsilon d\ge0,
\qquad
x-\epsilon d\ge0.
$$

Hơn nữa,

$$
A(x\pm\epsilon d)=Ax\pm\epsilon Ad=b.
$$

Vậy $x+\epsilon d$ và $x-\epsilon d$ là hai điểm khả thi phân biệt, còn

$$
x=\frac12(x+\epsilon d)+\frac12(x-\epsilon d).
$$

Do đó $x$ không phải điểm cực. Phản đảo cho thấy nếu $x$ là điểm cực thì các cột trên hỗ trợ dương phải độc lập.

Ngược lại, giả sử các cột $A_j$, $j\in S(x)$, độc lập. Nếu

$$
x=\frac12(y+z),
\qquad
y,z\in P,
$$

thì với mọi $j\notin S(x)$ ta có $x_j=0$ và $y_j,z_j\ge0$. Vì $(y_j+z_j)/2=0$, suy ra

$$
y_j=z_j=0
\qquad
\text{với mọi }j\notin S(x).
$$

Mặt khác,

$$
A(y-z)=Ay-Az=b-b=0.
$$

Véc-tơ $y-z$ chỉ có thể khác $0$ trên $S(x)$. Tính độc lập của các cột tương ứng buộc $y-z=0$, nên $y=z=x$. Vì vậy $x$ là điểm cực.

Tiếp theo chứng minh mệnh đề 2 tương đương mệnh đề 3. Nếu $x$ là nghiệm cơ sở khả thi theo cơ sở $B$, thì $S(x)\subseteq B$. Các cột trong $A_B$ độc lập, nên họ cột trên $S(x)$ cũng độc lập.

Ngược lại, giả sử họ cột trên $S(x)$ độc lập. Vì $\operatorname{rank}(A)=m$, ta có thể bổ sung các cột khác để được một tập $B$ gồm đúng $m$ cột độc lập và chứa $S(x)$. Khi đó $A_B$ khả nghịch và $x_N=0$ với $N=B^c$. Từ $Ax=b$ suy ra

$$
A_Bx_B=b,
$$

nên $x_B=A_B^{-1}b$. Do $x\ge0$, đây là nghiệm cơ sở khả thi.
:::

**Điểm dễ sai.** Một điểm suy biến có thể có ít hơn $m$ thành phần dương và tương ứng với nhiều cơ sở khác nhau. Định lý không nói mỗi điểm cực có đúng một cơ sở.

### 2. Đa diện dạng chuẩn không rỗng có điểm cực

**Giả thiết.** Cho

$$
P=\{x\in\mathbb R^n:Ax=b,\ x\ge0\},
\qquad \operatorname{rank}(A)=m,
$$

khác rỗng. Nếu hệ ban đầu có hàng phụ thuộc, ta bỏ các phương trình thừa trước khi áp dụng kết quả. Không cần giả sử trước rằng một nghiệm cơ sở khả thi đã biết.

**Kết luận.** Tập $P$ có ít nhất một điểm cực, và điểm đó là một nghiệm cơ sở khả thi.

::: proof
Chọn một điểm $x\in P$. Nếu các cột $A_j$, $j\in S(x)$, độc lập thì theo Định lý 1, $x$ đã là điểm cực.

Nếu các cột này phụ thuộc, tồn tại $d\ne0$, có hỗ trợ nằm trong $S(x)$, sao cho $Ad=0$. Đổi $d$ thành $-d$ nếu cần để $d$ có ít nhất một thành phần dương. Đặt

$$
\alpha
=\min_{j:d_j>0}\frac{x_j}{d_j}>0
$$

và

$$
x^+=x-\alpha d.
$$

Ta có

$$
Ax^+=Ax-\alpha Ad=b.
$$

Nếu $d_j>0$ thì cách chọn $\alpha$ cho $x_j^+\ge0$; nếu $d_j\le0$ thì $x_j^+=x_j-\alpha d_j\ge x_j\ge0$. Vì vậy $x^+\in P$.

Ít nhất một chỉ số đạt dấu bằng trong phép lấy min, nên một thành phần dương của $x$ trở thành $0$. Không thành phần mới nào ngoài $S(x)$ trở thành dương vì $d$ bằng $0$ ngoài hỗ trợ này. Do đó

$$
|S(x^+)|<|S(x)|.
$$

Nếu các cột trên $S(x^+)$ vẫn phụ thuộc, lặp lại bước trên. Số thành phần dương giảm nghiêm ngặt sau mỗi bước, nên quá trình kết thúc sau hữu hạn bước tại một điểm $\bar x\in P$ có các cột trên $S(\bar x)$ độc lập. Theo Định lý 1, $\bar x$ là điểm cực và là nghiệm cơ sở khả thi.
:::

**Điểm dùng giả thiết.** Điều kiện $x\ge0$ cho phép chọn bước làm một tọa độ chạm $0$ mà không rời miền. Với một đa diện tổng quát chứa đường thẳng, kết luận tồn tại điểm cực có thể sai.

### 3. Giá trị tối ưu hữu hạn của LP được đạt

**Giả thiết.** Cho đa diện không rỗng

$$
P=\{x\in\mathbb R^n:Ax\le b,\ Cx=d\}
$$

và hàm mục tiêu tuyến tính $c^Tx$. Giả sử

$$
p^*=\sup_{x\in P}c^Tx<+\infty.
$$

**Kết luận.** Tồn tại $x^*\in P$ sao cho $c^Tx^*=p^*$.

::: proof
Xét tập các giá trị mục tiêu đạt được

$$
Q=\{t\in\mathbb R:\exists x\in P,\ t=c^Tx\}.
$$

Tập

$$
\{(x,t):Ax\le b,\ Cx=d,\ t=c^Tx\}
$$

là một đa diện trong $\mathbb R^{n+1}$. Phép chiếu một đa diện lên một không gian con vẫn là đa diện; kết quả này có thể chứng minh bằng khử Fourier–Motzkin. Vì vậy $Q$ là một đa diện trong $\mathbb R$.

Mọi đa diện trong $\mathbb R$ là một tập lồi đóng có dạng điểm, đoạn, tia, toàn đường thẳng hoặc tập rỗng. Ở đây $Q$ khác rỗng và bị chặn trên bởi giả thiết. Do đó supremum hữu hạn $p^*$ thuộc $Q$. Theo định nghĩa của $Q$, tồn tại $x^*\in P$ với $c^Tx^*=p^*$.
:::

**Điểm dễ sai.** Kết luận này dùng cấu trúc đa diện. Với một tập khả thi đóng bất kỳ, ảnh qua ánh xạ tuyến tính không nhất thiết đóng; không được chuyển chứng minh sang bài toán phi tuyến mà không kiểm lại giả thiết.

### 4. Tồn tại điểm cực tối ưu

**Giả thiết.** Cho đa diện $P$ có ít nhất một điểm cực. Giả sử

$$
p^*=\sup_{x\in P}c^Tx<+\infty.
$$

**Kết luận.** Tồn tại một điểm cực $v^*$ của $P$ sao cho

$$
c^Tv^*=p^*.
$$

::: proof
Theo Định lý 3, tập nghiệm tối ưu

$$
F=\{x\in P:c^Tx=p^*\}
$$

khác rỗng. Tập $F$ là một mặt của $P$: nếu

$$
x=\lambda y+(1-\lambda)z\in F,
\qquad
y,z\in P,
\qquad
0<\lambda<1,
$$

thì $c^Ty\le p^*$ và $c^Tz\le p^*$. Đẳng thức

$$
p^*=c^Tx=\lambda c^Ty+(1-\lambda)c^Tz
$$

buộc $c^Ty=c^Tz=p^*$, nên $y,z\in F$.

Một đa diện không rỗng có điểm cực khi và chỉ khi nó không chứa đường thẳng. Vì $P$ có điểm cực nên $P$ không chứa đường thẳng; tập con $F\subseteq P$ cũng không thể chứa đường thẳng. Do đó $F$ có ít nhất một điểm cực $v^*$.

Cuối cùng, điểm cực của một mặt cũng là điểm cực của đa diện. Thật vậy, nếu

$$
v^*=\lambda y+(1-\lambda)z,
\qquad
y,z\in P,
\qquad
0<\lambda<1,
$$

tính chất mặt vừa chứng minh cho $y,z\in F$. Vì $v^*$ là điểm cực của $F$, suy ra $y=z=v^*$. Vậy $v^*$ là điểm cực của $P$ và tối ưu.
:::

**Phụ thuộc cấu trúc.** Chứng minh dùng định lý đa diện: một đa diện không rỗng có điểm cực khi và chỉ khi không chứa đường thẳng. Với dạng chuẩn, chiều tồn tại đã được chứng minh trực tiếp ở Định lý 2.

**Điểm dễ sai.** Định lý khẳng định tồn tại ít nhất một điểm cực tối ưu, không khẳng định mọi nghiệm tối ưu đều là điểm cực.

### 5. Hai nghiệm tối ưu sinh một đoạn nghiệm tối ưu

**Giả thiết.** Cho tập khả thi lồi $P$ và mục tiêu tuyến tính $c^Tx$. Giả sử $x$ và $y$ đều là nghiệm tối ưu với cùng giá trị $p^*$.

**Kết luận.** Với mọi $\lambda\in[0,1]$,

$$
z_\lambda=\lambda x+(1-\lambda)y
$$

cũng là nghiệm tối ưu.

::: proof
Tính lồi của $P$ cho $z_\lambda\in P$. Tính tuyến tính của mục tiêu cho

$$
c^Tz_\lambda
=\lambda c^Tx+(1-\lambda)c^Ty
=\lambda p^*+(1-\lambda)p^*
=p^*.
$$

Vì vậy toàn bộ đoạn $[x,y]$ là tối ưu.
:::

**Hệ quả.** Nếu LP có hai nghiệm tối ưu phân biệt thì nó có vô hạn nghiệm tối ưu. Mọi điểm nằm trong phần trong tương đối của đoạn nối hai nghiệm phân biệt đều không phải điểm cực, dù các đầu mút của mặt tối ưu có thể là điểm cực.

### 6. Đỉnh kề cải thiện và kết thúc của thuật toán mức ý niệm

**Giả thiết.** Cho đa diện $P$ có ít nhất một điểm cực và

$$
\sup_{x\in P}c^Tx<+\infty.
$$

Cho $v$ là một điểm cực chưa tối ưu.

**Kết luận.** Tồn tại một điểm cực $w$ kề $v$ sao cho

$$
c^Tw>c^Tv.
$$

Do đó, một thủ tục luôn chuyển từ điểm cực hiện tại sang một điểm cực kề cải thiện nghiêm ngặt phải kết thúc sau hữu hạn bước tại một điểm cực tối ưu.

::: proof
Ta dùng cấu trúc cục bộ của đa diện tại điểm cực $v$. Nón tiếp xúc

$$
T_P(v)=\{d:\exists\epsilon>0,\ v+td\in P\text{ với mọi }t\in[0,\epsilon]\}
$$

là một nón đa diện nhọn. Nó được sinh bởi hai loại hướng: các hướng cạnh đi từ $v$ tới điểm cực kề và các hướng suy thoái đi ra vô hạn.

Vì $v$ chưa tối ưu, tồn tại $x\in P$ sao cho

$$
c^Tx>c^Tv.
$$

Đặt $d=x-v$. Đoạn $[v,x]$ nằm trong $P$, nên $d\in T_P(v)$ và

$$
c^Td>0.
$$

Phân rã $d$ thành tổ hợp không âm của các hướng cạnh $e_i$ và các hướng suy thoái $r_j$:

$$
d=\sum_i\alpha_i e_i+\sum_j\beta_j r_j,
\qquad
\alpha_i,\beta_j\ge0.
$$

Giá trị tối ưu hữu hạn buộc

$$
c^Tr_j\le0
$$

với mọi hướng suy thoái; nếu có $c^Tr_j>0$ thì $v+tr_j$ làm mục tiêu tăng vô hạn khi $t\to+\infty$. Mọi cạnh vô hạn xuất phát từ $v$ được xếp vào nhóm hướng suy thoái $r_j$; các $e_i$ còn lại là hướng của cạnh bị chặn nối $v$ với một điểm cực kề. Vì $c^Td>0$, phải tồn tại ít nhất một hướng cạnh bị chặn $e_i$ với $c^Te_i>0$.

Hướng cạnh đó dẫn từ $v$ tới một điểm cực kề $w$, nên

$$
c^Tw>c^Tv.
$$

Một đa diện được xác định bởi hữu hạn ràng buộc có hữu hạn điểm cực. Mỗi bước của thủ tục làm giá trị mục tiêu tăng nghiêm ngặt, nên không thể quay lại một điểm cực đã đi qua. Vì vậy thủ tục kết thúc sau hữu hạn bước. Khi dừng, nếu điểm hiện tại chưa tối ưu thì phần đầu của định lý lại cho một đỉnh kề cải thiện, mâu thuẫn tiêu chuẩn dừng. Điểm dừng do đó tối ưu.
:::

**Phụ thuộc.** Bước phân rã nón tiếp xúc dựa trên định lý cấu trúc của nón đa diện; hình vẽ hai chiều chỉ có vai trò minh họa.

**Ranh giới.** Đây chưa phải phương pháp đơn hình. Cách tìm điểm cực xuất phát, chọn biến vào–ra, thực hiện phép thử tỉ số, cập nhật cơ sở và chống quay vòng thuộc Bài 08. Suy biến có thể làm một thuật toán pivot đi qua nhiều cơ sở của cùng một điểm; kết luận hình học ở đây chỉ xét các điểm cực phân biệt và cải thiện nghiêm ngặt.

### 7. Phương trình Bellman cho quy hoạch động hữu hạn tất định

**Giả thiết.** Xét các giai đoạn $k=0,\ldots,N$. Tại giai đoạn $k<N$:

- trạng thái hiện tại là $x\in X_k$;
- tập điều khiển $U_k(x)$ hữu hạn và không rỗng;
- điều khiển $u\in U_k(x)$ tạo trạng thái kế tiếp $f_k(x,u)\in X_{k+1}$;
- chi phí giai đoạn là số thực $g_k(x,u)$.

Ở giai đoạn cuối, chi phí là $g_N(x)$. Tổng chi phí của một chuỗi điều khiển là tổng các chi phí giai đoạn cộng chi phí cuối. Đặt $J_k(x)$ là chi phí nhỏ nhất từ trạng thái $x$ ở giai đoạn $k$ đến hết chân trời.

**Kết luận.** Các hàm giá trị thỏa

$$
J_N(x)=g_N(x),
$$

và với $k=N-1,\ldots,0$,

$$
J_k(x)
=\min_{u\in U_k(x)}
\left\{
g_k(x,u)+J_{k+1}(f_k(x,u))
\right\}.
$$

Nếu tại mỗi $(k,x)$ ta lưu một điều khiển đạt dấu `min`, các điều khiển đã lưu tạo một chính sách tối ưu.

::: proof
Chứng minh bằng quy nạp ngược theo giai đoạn.

Ở giai đoạn $N$, không còn quyết định nào. Chi phí còn lại đúng bằng chi phí cuối, nên

$$
J_N(x)=g_N(x).
$$

Giả sử $J_{k+1}$ đã cho đúng chi phí tối ưu từ mọi trạng thái ở giai đoạn $k+1$. Bắt đầu tại trạng thái $x\in X_k$, mọi chính sách khả thi trước hết phải chọn một điều khiển

$$
u\in U_k(x).
$$

Lựa chọn này trả chi phí $g_k(x,u)$ và đưa hệ tới trạng thái

$$
x^+=f_k(x,u).
$$

Theo giả thiết quy nạp, chi phí nhỏ nhất có thể đạt từ $x^+$ về sau là $J_{k+1}(x^+)$. Vì vậy, nếu quyết định đầu tiên là $u$, chi phí nhỏ nhất của toàn phần còn lại là

$$
g_k(x,u)+J_{k+1}(f_k(x,u)).
$$

Tối ưu trên mọi điều khiển khả thi cho

$$
J_k(x)
=\min_{u\in U_k(x)}
\left\{
g_k(x,u)+J_{k+1}(f_k(x,u))
\right\}.
$$

Tập $U_k(x)$ hữu hạn và không rỗng nên dấu `min` được đạt. Chọn một điều khiển đạt `min`, rồi tiếp tục bằng các điều khiển tối ưu đã có từ giả thiết quy nạp, tạo một chính sách đạt đúng $J_k(x)$. Quy nạp lùi tới $k=0$ chứng minh cả phương trình Bellman lẫn tính tối ưu của chính sách được truy vết.
:::

**Điểm dùng giả thiết.** Tính tất định làm trạng thái kế tiếp bằng đúng $f_k(x,u)$; chi phí cộng cho phép tách chi phí hiện tại khỏi chi phí còn lại; chân trời hữu hạn cho phép quy nạp ngược; tập điều khiển hữu hạn, không rỗng bảo đảm phép lấy `min` có nghiệm.

**Ranh giới.** Nếu điều khiển thuộc tập vô hạn, cần điều kiện bổ sung như compact và liên tục hoặc phải dùng `inf`. Nếu chuyển trạng thái ngẫu nhiên, Bellman phải chứa kỳ vọng có điều kiện. Hai mở rộng này không thuộc phạm vi Bài 07.

## Tóm tắt

- Một mô hình LP cần khóa biến, đơn vị, chiều tối ưu, mục tiêu, ràng buộc và miền biến trước khi giải.
- Dạng chuẩn nối hình học đa diện với đại số của cơ sở. Điểm cực và nghiệm cơ sở khả thi là hai mô tả tương đương dưới giả thiết hạng đầy đủ theo hàng.
- Miền không bị chặn không đồng nghĩa giá trị mục tiêu không bị chặn. Khi các giả thiết của định lý cơ bản được thỏa, tồn tại một điểm cực tối ưu.
- Bước đi qua các đỉnh kề chỉ cung cấp trực giác hình học; phương pháp đơn hình đầy đủ thuộc Bài 08.
- Trong DP hữu hạn tất định, trạng thái đủ cho phép Bellman dùng lại bài toán con. Giải ngược tính giá trị; lượt xuôi khôi phục chính sách.
- LP và DP phục vụ hai cấu trúc quyết định khác nhau; không chọn công cụ chỉ dựa trên tên miền ứng dụng.

## Tài liệu tham khảo

1. Dimitris Bertsimas và John N. Tsitsiklis (1997), *Introduction to Linear Optimization*, Chương 1–2.
2. Robert J. Vanderbei (2014), *Linear Programming: Foundations and Extensions*, ấn bản 4, Springer, Chương 1–3.
3. Dimitris Bertsimas (2009), *Dynamic Programming*, MIT 15.093J/6.255J, Bài 16, trang 6–9.
