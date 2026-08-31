# Bài 01 — Giới thiệu tối ưu, tập lồi và hàm lồi

Ghi chú này mở rộng các khái niệm nền của Bài 01. Phần đầu xây dựng ngôn ngữ để mô tả một bài toán tối ưu, phân biệt các loại nghiệm và kiểm tra hai câu hỏi thường bị gộp lại: nghiệm có tồn tại không và có duy nhất không.

Ký hiệu chung trong phần này là $x\in\mathbb R^n$ cho biến quyết định, $C\subseteq\mathbb R^n$ cho tập khả thi và $f_0$ cho hàm mục tiêu. Khi không có nguy cơ nhầm lẫn, ta viết bài toán dưới dạng

$$
\underset{x\in C}{\operatorname{minimize}}\; f_0(x).
$$

Nguồn chính của phần này là Boyd và Vandenberghe (2004), Chương 1–3. Ký hiệu giá trị tối ưu, tập khả thi và cực tiểu địa phương được đối chiếu thêm với Mục 4.1; phần này chỉ dùng các ký hiệu đó làm nền, chưa phân loại hay cải dạng các lớp bài toán của Bài 02.

## A. Mô hình tối ưu và các loại nghiệm

### 1. Khuôn bài toán tối ưu

**Mục tiêu đọc hiểu.** Sau mục này, người đọc phân biệt được dữ kiện, biến quyết định, hàm mục tiêu, miền xác định, tập khả thi, giá trị tối ưu và nghiệm tối ưu trong một mô hình.

**Định nghĩa và giả thiết.** Ở mức khái quát cần cho bài này, một bài toán tối ưu được viết dưới dạng

$$
\underset{x\in C}{\operatorname{minimize}}\; f_0(x),
$$

trong đó $x\in\mathbb R^n$ là biến quyết định, $f_0$ là hàm mục tiêu và $C\subseteq\operatorname{dom}f_0$ là tập các phương án thỏa mọi giới hạn của bài toán. Dữ liệu dùng để xác định $f_0$ và $C$ được giữ cố định khi giải. Cách tách từng ràng buộc thành dạng chuẩn sẽ được trình bày ở Bài 02.

Giá trị tối ưu được định nghĩa bằng

$$
p^*=\inf_{x\in C}f_0(x).
$$

Một điểm $x^*\in C$ là nghiệm tối ưu nếu $f_0(x^*)=p^*$. Định nghĩa bằng infimum vẫn có nghĩa khi không có điểm nào đạt được giá trị $p^*$.

Tập tất cả nghiệm tối ưu được ký hiệu

$$
\operatorname*{arg\,min}_{x\in C}f_0(x)
=
\{x\in C:f_0(x)=p^*\}.
$$

Nếu $C=\varnothing$, ta dùng quy ước $p^*=+\infty$. Nếu $f_0$ không bị chặn dưới trên $C$, ta có $p^*=-\infty$. Trong cả hai trường hợp, bài toán không có nghiệm tối ưu nhận giá trị thực.

**Trực quan.** Mô hình hóa tách một tình huống thành hai câu hỏi. Tập $C$ trả lời phương án nào được phép chọn; hàm $f_0$ cho biết cách so sánh các phương án được phép đó. Thay một ràng buộc hoặc thước đo có thể làm thay đổi nghiệm dù dữ liệu ban đầu không đổi.

![Sơ đồ tách tình huống thành dữ kiện, biến quyết định, mục tiêu, ràng buộc và kết luận tối ưu.](img/lec-01/optimization-model-anatomy.svg)

*Dữ kiện được giữ cố định; chỉ biến quyết định được thay đổi khi giải bài toán.*

**Ví dụ tính được.** Xét

$$
\underset{0\le x\le 2}{\operatorname{minimize}}\;(x-3)^2.
$$

Ở đây $x$ là biến quyết định, $C=[0,2]$ là tập khả thi và $f_0(x)=(x-3)^2$ là mục tiêu. Trên đoạn $[0,2]$, hàm giảm khi $x$ tăng, nên

$$
x^*=2,
\qquad
p^*=f_0(2)=1.
$$

Nếu thay ràng buộc bằng $0\le x\le4$, điểm $x=3$ trở nên khả thi và nghiệm đổi thành $x^*=3$, $p^*=0$.

**Ý nghĩa và ứng dụng trong AI.** Trong học máy, $x$ có thể là véc-tơ trọng số; $f_0$ có thể là mất mát huấn luyện cộng điều chuẩn; các ràng buộc có thể giới hạn chuẩn tham số, năng lượng, độ trễ hoặc độ lệch giữa các nhóm. Việc viết rõ khuôn bài toán ngăn ta tối ưu một thước đo nhưng quên điều kiện vận hành.

**Điểm dễ nhầm.** Dữ liệu và siêu tham số được cho trước không phải biến tối ưu. Một điểm có giá trị mục tiêu thấp nhưng không thuộc $C$ không phải phương án chấp nhận được. Giá trị $p^*$ là infimum; nó không tự bảo đảm tồn tại một $x^*$ đạt giá trị ấy.

**Đầu ra.** Khuôn $(C,f_0,p^*,x^*)$ cho phép phát biểu chính xác các mức kết luận về một điểm ứng viên.

### 2. Tập khả thi, cực tiểu địa phương và cực tiểu toàn cục

**Mục tiêu đọc hiểu.** Người đọc phân biệt được điểm khả thi, cực tiểu địa phương tương đối với miền và cực tiểu toàn cục; đồng thời hiểu vì sao kết quả của một thuật toán chưa tự động là chứng nhận toàn cục.

**Định nghĩa và giả thiết.** Điểm $x\in C$ được gọi là khả thi. Điểm $x^*\in C$ là một cực tiểu địa phương của $f_0$ trên $C$ nếu tồn tại $r>0$ sao cho

$$
f_0(x^*)\le f_0(x)
\quad
\text{với mọi }x\in C\cap B(x^*,r),
$$

trong đó $B(x^*,r)=\{x:\lVert x-x^*\rVert_2<r\}$. Điểm $x^*$ là cực tiểu toàn cục nếu

$$
f_0(x^*)\le f_0(x)
\quad
\text{với mọi }x\in C.
$$

Mọi cực tiểu toàn cục đều là cực tiểu địa phương, nhưng chiều ngược lại không đúng đối với bài toán tổng quát.

**Trực quan.** Cực tiểu địa phương chỉ so sánh với những điểm khả thi đủ gần. Vì vậy, một điểm nằm ở đáy của một thung lũng nông hoặc ở biên miền vẫn có thể là cực tiểu địa phương, dù một thung lũng khác có giá trị thấp hơn.

![Hai cực tiểu trên một miền không lồi theo mục tiêu và sự khác nhau giữa cực tiểu địa phương với cực tiểu toàn cục.](img/lec-01/local-versus-global-minimum.svg)

*Lân cận trong định nghĩa phải được giao với tập khả thi; điểm ở biên không được so sánh với điểm nằm ngoài miền.*

**Ví dụ và phản ví dụ.** Trên miền $C=[-2,0{,}5]$, xét

$$
f_0(x)=(x^2-1)^2.
$$

Tại $x=-1$, ta có $f_0(-1)=0$, nên $-1$ là cực tiểu toàn cục. Điểm biên $x=0{,}5$ có

$$
f_0(0{,}5)=\left(\frac14-1\right)^2=\frac9{16}.
$$

Vì $f_0'(x)=4x(x^2-1)<0$ khi $x$ ở bên trái và đủ gần $0{,}5$, giá trị hàm giảm khi tiến về biên phải. Do đó $0{,}5$ là cực tiểu địa phương tương đối với $C$, nhưng không phải cực tiểu toàn cục.

Đối với $f_0(x)=x^2$ trên một đoạn lồi chứa $0$, cực tiểu địa phương tại $0$ đồng thời là cực tiểu toàn cục. Đây là biểu hiện đơn giản của bảo đảm sẽ được chứng minh trong phần tập lồi và hàm lồi.

**Ý nghĩa và ứng dụng trong AI.** Một thuật toán huấn luyện có thể trả về điểm dừng phụ thuộc khởi tạo. Muốn kết luận điểm đó là tối ưu toàn cục, ta cần giả thiết về miền và mục tiêu, chứ không chỉ cần một giá trị mất mát nhỏ hoặc gradient gần bằng không.

**Điểm dễ nhầm.** Cực tiểu địa phương trên $C$ được hiểu tương đối với $C$. Điểm dừng không tự động là cực tiểu. Tối ưu toàn cục cũng không đồng nghĩa với nghiệm duy nhất: một bài toán có thể có nhiều nghiệm cùng đạt $p^*$.

**Đầu ra.** Sau khi phân biệt mức kết luận về nghiệm, ta cần kiểm tra liệu nghiệm có tồn tại và, nếu tồn tại, có duy nhất hay không.

### 3. Tồn tại và duy nhất

**Mục tiêu đọc hiểu.** Người đọc tách được ba câu hỏi: giá trị tối ưu có hữu hạn không, infimum có đạt được không và điểm đạt được có duy nhất không.

**Định nghĩa và giả thiết.** Trong không gian hữu hạn chiều, một tập compact là một tập đóng và bị chặn. Định lý Weierstrass cho một điều kiện đủ quan trọng: nếu $C\ne\varnothing$ compact và $f_0:C\to\mathbb R$ liên tục thì tồn tại $x^*\in C$ sao cho

$$
f_0(x^*)=\min_{x\in C}f_0(x).
$$

Tính duy nhất cần một giả thiết khác. Nếu $C$ lồi và $f_0$ lồi chặt trên $C$, thì bài toán có nhiều nhất một nghiệm tối ưu. Kết luận này không tự tạo ra nghiệm; nó chỉ loại trừ khả năng có hai nghiệm khác nhau.

**Trực quan.** Miền mở có thể loại mất điểm biên mà một dãy nghiệm ứng viên đang tiến tới. Một đáy phẳng cho nhiều nghiệm. Một hàm lồi chặt trên miền phù hợp không có đoạn đáy phẳng, nên nếu đáy được đạt thì chỉ có một điểm đáy.

![Ba tình huống: infimum không đạt, nhiều nghiệm tối ưu và một nghiệm tối ưu duy nhất.](img/lec-01/existence-and-uniqueness.svg)

*Tồn tại phụ thuộc cả miền lẫn tính liên tục; duy nhất cần thêm cấu trúc như lồi chặt.*

**Ví dụ và phản ví dụ.** Ba bài toán sau tách ba hiện tượng:

1. Với $C=(0,1]$ và $f_0(x)=x$, ta có $p^*=0$ nhưng không có $x^*\in C$ đạt $0$.
2. Với $C=[-1,1]$ và $f_0(x)=0$, mọi điểm của $C$ đều là nghiệm tối ưu.
3. Với $C=[-1,1]$ và $f_0(x)=x^2$, nghiệm duy nhất là $x^*=0$.

Ví dụ thứ nhất cho thấy bị chặn nhưng không đóng là chưa đủ. Ví dụ thứ hai cho thấy liên tục trên tập compact bảo đảm tồn tại nhưng không bảo đảm duy nhất.

**Ý nghĩa và ứng dụng trong AI.** Ràng buộc compact hoặc điều chuẩn tăng theo chuẩn tham số có thể ngăn dãy tham số thoát ra vô hạn. Tính lồi chặt có thể làm nghiệm tham số duy nhất, nhưng không tự bảo đảm mô hình tổng quát hóa tốt hoặc dự đoán là duy nhất khi cách tham số hóa dư thừa.

**Điểm dễ nhầm.** Hàm lồi không tự bảo đảm tồn tại. Lồi chặt không tự bảo đảm tồn tại. Hessian nửa xác định dương chỉ gợi tính lồi, không đủ cho duy nhất. Ngược lại, một bài toán không lồi vẫn có thể có nghiệm duy nhất.

**Đầu ra.** Định lý Weierstrass cung cấp chứng nhận tồn tại nền; phần tiếp theo ghi rõ phát biểu và ý tưởng chứng minh để có thể tái sử dụng trong các ca ứng dụng.

## Các định lý và chứng minh quan trọng — Nhóm A

### Định lý Weierstrass về sự tồn tại của nghiệm

**Giả thiết.** Cho $C\subseteq\mathbb R^n$ khác rỗng và compact. Cho $f:C\to\mathbb R$ liên tục.

**Kết luận.** Tồn tại $x^*\in C$ sao cho

$$
f(x^*)=\min_{x\in C}f(x).
$$

Nói cách khác, infimum của $f$ trên $C$ là hữu hạn và được đạt tại ít nhất một điểm của $C$.

::: proof
**Ý tưởng.** Chọn một dãy điểm có giá trị hàm tiến dần tới infimum. Tính compact giữ một dãy con hội tụ bên trong $C$; tính liên tục truyền giới hạn từ điểm sang giá trị hàm.

Đặt

$$
p^*=\inf_{x\in C}f(x).
$$

Vì $f$ liên tục trên tập compact, $f(C)$ bị chặn, nên $p^*>-\infty$. Theo định nghĩa infimum, với mỗi số nguyên $k\ge1$, tồn tại $x_k\in C$ sao cho

$$
p^*\le f(x_k)<p^*+\frac1k.
$$

Do $C$ compact, dãy $(x_k)$ có một dãy con $(x_{k_j})$ hội tụ tới một điểm $x^*\in C$. Tính liên tục của $f$ cho

$$
f(x^*)
=\lim_{j\to\infty}f(x_{k_j})
=p^*.
$$

Vậy $x^*$ là một nghiệm tối ưu toàn cục.
:::

**Điểm dùng giả thiết.** Tính compact được dùng hai lần: bảo đảm hàm liên tục bị chặn trên $C$ và bảo đảm dãy cực tiểu có dãy con hội tụ tới một điểm vẫn nằm trong $C$. Tính liên tục được dùng để đổi giới hạn của điểm thành giới hạn của giá trị hàm.

**Giới hạn của định lý.** Đây là điều kiện đủ, không phải điều kiện cần. Chẳng hạn, $f(x)=x^2$ trên $C=\mathbb R$ vẫn có nghiệm dù $C$ không compact. Định lý cũng không nói nghiệm là duy nhất.

**Vai trò trong AI và tối ưu.** Khi tập tham số được giới hạn bởi một ràng buộc đóng, bị chặn và hàm mất mát liên tục, định lý xác nhận bài toán có nghiệm trước khi ta bàn cách tìm nghiệm. Nếu miền không compact, cần một lập luận khác, chẳng hạn chứng minh các tập mức phù hợp bị chặn hoặc hàm tăng ra vô hạn khi chuẩn tham số tăng.

## B. Hình học tập lồi

### 4. Tập lồi và tổ hợp lồi

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được tính lồi bằng đoạn nối và phân biệt tổ hợp lồi với một tổ hợp tuyến tính tùy ý.

**Định nghĩa và giả thiết.** Tập $C\subseteq\mathbb R^n$ là tập lồi nếu với mọi $x,y\in C$ và mọi $\theta\in[0,1]$,

$$
\theta x+(1-\theta)y\in C.
$$

Tổng quát hơn, một tổ hợp lồi của $x_1,\ldots,x_k$ có dạng

$$
\sum_{i=1}^k\theta_i x_i,
\qquad
\theta_i\ge0,
\qquad
\sum_{i=1}^k\theta_i=1.
$$

Tập rỗng, tập chỉ có một điểm, đoạn thẳng và một không gian affine đều có thể là tập lồi.

**Trực quan.** Nếu hai quyết định đều thuộc tập khả thi lồi thì mọi phép trộn theo cùng một tỉ lệ cũng khả thi. Một lỗ thủng hoặc chỗ lõm có thể làm một phần đoạn nối đi ra ngoài tập.

![Một tập lồi chứa toàn bộ đoạn nối và một tập không lồi có đoạn nối đi ra ngoài.](img/lec-01/convex-set-and-combination.svg)

*Nhãn trên đoạn nối biểu diễn hệ số $\theta$; nét đứt đánh dấu phần đoạn không thuộc tập ở phản ví dụ.*

**Ví dụ và phản ví dụ.** Với quả cầu Euclid đơn vị $C=\{x\in\mathbb R^2:\lVert x\rVert_2\le1\}$, hai điểm $x=(1,0)^T$, $y=(0,1)^T$ có trung điểm

$$
\frac{x+y}{2}=\begin{bmatrix}1/2\\1/2\end{bmatrix},
\qquad
\left\lVert\frac{x+y}{2}\right\rVert_2=\frac1{\sqrt2}<1.
$$

Ngược lại, vành khăn $A=\{x:1\le\lVert x\rVert_2\le2\}$ không lồi: $(1,0)^T$ và $(-1,0)^T$ thuộc $A$, nhưng trung điểm $(0,0)^T$ không thuộc $A$.

**Ý nghĩa và ứng dụng trong AI.** Tính lồi của tập khả thi cho phép nội suy giữa hai tham số, phân phối hoặc chính sách khả thi mà không vi phạm ràng buộc. Đây là một nửa của cấu trúc cần để chuyển bảo đảm từ cực tiểu địa phương sang cực tiểu toàn cục.

**Điểm dễ nhầm.** Kiểm tra một cặp điểm không chứng minh cả tập lồi. Một tổ hợp affine chỉ yêu cầu tổng hệ số bằng $1$, còn tổ hợp lồi yêu cầu thêm mọi hệ số không âm. Không nên suy tính lồi chỉ từ hình vẽ.

**Đầu ra.** Tổ hợp lồi hữu hạn cho phép dựng tập lồi nhỏ nhất chứa một tập điểm; bỏ điều kiện tổng hệ số bằng $1$ dẫn tới tổ hợp nón.

### 5. Bao lồi và nón lồi

**Mục tiêu đọc hiểu.** Người đọc dựng được bao lồi của một tập hữu hạn và phân biệt bao lồi với nón sinh bởi cùng các véc-tơ.

**Định nghĩa và giả thiết.** Bao lồi của $S\subseteq\mathbb R^n$ là

$$
\operatorname{conv}S
=\left\{\sum_{i=1}^k\theta_i x_i:
k\ge1,\ x_i\in S,\ \theta_i\ge0,\ \sum_{i=1}^k\theta_i=1\right\}.
$$

Tập $K$ là nón lồi nếu với mọi $x,y\in K$ và $\alpha,\beta\ge0$,

$$
\alpha x+\beta y\in K.
$$

Nón sinh bởi $S$ gồm mọi tổ hợp $\sum_i\alpha_i x_i$ với $\alpha_i\ge0$; các hệ số không phải cộng thành $1$.

**Trực quan.** Bao lồi giống một dây cao su ôm quanh các điểm. Nón sinh giữ gốc tọa độ làm đỉnh và kéo dài các tia không âm đi qua các véc-tơ sinh.

![Bao lồi của ba điểm là một tam giác, còn nón sinh bởi hai véc-tơ là một góc kéo dài từ gốc.](img/lec-01/convex-hull-and-conic-hull.svg)

*Hai panel dùng cùng các véc-tơ nhưng hai điều kiện hệ số khác nhau.*

**Ví dụ tính được.** Với $S=\{(0,0)^T,(2,0)^T,(0,2)^T\}$,

$$
\operatorname{conv}S
=\{(u,v)^T:u\ge0,\ v\ge0,\ u+v\le2\}.
$$

Nón sinh bởi $e_1=(1,0)^T$ và $e_2=(0,1)^T$ là $\mathbb R_+^2$. Điểm $(1/2,1/2)^T$ thuộc cả hai tập, còn $(3,1)^T$ chỉ thuộc nón sinh.

**Ý nghĩa và ứng dụng trong AI.** Bao lồi mô tả mọi phép trộn hữu hạn của prototype, embedding hoặc phân phối. Nón lồi mô tả các đại lượng đóng dưới phép cộng và nhân vô hướng không âm, chẳng hạn véc-tơ không âm và ma trận hiệp phương sai.

**Điểm dễ nhầm.** Bao lồi của một tập không nhất thiết đóng nếu tập ban đầu không compact. Nón lồi không mặc nhiên đóng, nhọn hoặc có phần trong. Một nón chứa bội không âm của điểm, không nhất thiết chứa bội âm.

**Đầu ra.** Bao lồi và nón lồi tạo nền để nhận dạng các tập lồi cơ bản dùng làm tập khả thi.

### 6. Các tập lồi cơ bản

**Mục tiêu đọc hiểu.** Người đọc nhận dạng được các viên gạch hình học thường gặp mà không phải kiểm tra lại định nghĩa đoạn nối từ đầu.

**Định nghĩa và giả thiết.** Các tập sau đều lồi khi các biểu thức có kiểu phù hợp:

- tập affine $\{x:Ax=b\}$;
- siêu phẳng $\{x:a^Tx=b\}$ với $a\ne0$;
- nửa không gian $\{x:a^Tx\le b\}$;
- đa diện $\{x:Ax\le b,\ Cx=d\}$;
- quả cầu chuẩn $\{x:\lVert x-x_c\rVert\le r\}$ với $r\ge0$;
- ellipsoid $\{x_c+Au:\lVert u\rVert_2\le1\}$;
- nón bậc hai $\mathcal Q^{n+1}=\{(u,t):\lVert u\rVert_2\le t\}$.

Ellipsoid có thể suy biến nếu $A$ không khả nghịch; ảnh affine đó vẫn lồi.

**Trực quan.** Tập affine và siêu phẳng là các đối tượng phẳng. Nửa không gian và đa diện được tạo bởi các phía của siêu phẳng. Quả cầu và ellipsoid có biên cong; các lát cắt ngang của nón bậc hai là những quả cầu.

![Thư viện các tập lồi cơ bản gồm tập affine, nửa không gian, đa diện, quả cầu, ellipsoid và nón bậc hai.](img/lec-01/basic-convex-set-library.svg)

*Mỗi ô ghi cả công thức và một đặc trưng hình học; hình không dùng màu làm tín hiệu duy nhất.*

**Ví dụ tính được.** Ellipsoid

$$
E=\{(x_1,x_2)^T:x_1^2+4x_2^2\le1\}
$$

có bán trục dài $1$ theo hướng $x_1$ và $1/2$ theo hướng $x_2$. Điểm $(3,4,5)$ nằm trên biên $\mathcal Q^3$ vì $\lVert(3,4)^T\rVert_2=5$; điểm $(3,4,4)$ không thuộc nón vì $5>4$.

**Ý nghĩa và ứng dụng trong AI.** Nửa không gian và đa diện mô tả giới hạn tuyến tính; quả cầu chuẩn mô tả ngân sách nhiễu hoặc độ lớn tham số; ellipsoid mô tả bất định có tương quan; nón bậc hai biểu diễn một ràng buộc chuẩn. Phần này chỉ nhận dạng hình học, chưa phân loại các bài toán chứa chúng.

**Điểm dễ nhầm.** Quả cầu $\lVert x-x_c\rVert\le r$ lồi, nhưng mặt cầu $\lVert x-x_c\rVert=r$ nói chung không lồi. Đẳng thức affine tạo tập lồi; đẳng thức phi tuyến không có bảo đảm tương tự.

**Đầu ra.** Dạng toàn phương của ellipsoid dẫn tới một nón lồi quan trọng trong không gian ma trận.

### 7. Nón nửa xác định dương

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được một ma trận đối xứng nhỏ là nửa xác định dương và giải thích điều kiện này qua dạng toàn phương.

**Định nghĩa và giả thiết.** Ký hiệu $\mathbb S^n$ là không gian các ma trận đối xứng thực cấp $n$. Nón nửa xác định dương là

$$
\mathbb S_+^n
=\{X\in\mathbb S^n:z^TXz\ge0\ \text{với mọi }z\in\mathbb R^n\}.
$$

Ta viết $X\succeq0$ khi $X\in\mathbb S_+^n$. Nếu $z^TXz>0$ với mọi $z\ne0$, thì $X\succ0$. Với ma trận đối xứng thực, $X\succeq0$ tương đương mọi giá trị riêng của $X$ không âm.

**Trực quan.** Dạng toàn phương $z^TXz$ đo độ cong theo hướng $z$. Ma trận PSD không tạo hướng có giá trị âm; một trị riêng bằng $0$ tạo hướng phẳng.

![Dạng toàn phương theo các hướng và ba trường hợp xác định dương, nửa xác định dương có hướng phẳng, và bất định.](img/lec-01/psd-cone-and-quadratic-directions.svg)

*Nhãn dấu của trị riêng và nét cong hoặc phẳng phân biệt các trường hợp ngoài tín hiệu màu.*

**Ví dụ và phản ví dụ.** Ma trận

$$
X=\begin{bmatrix}2&1\\1&2\end{bmatrix}
$$

có các giá trị riêng $1$ và $3$, nên $X\succ0$. Ma trận $Y=\operatorname{diag}(1,0)$ thuộc $\mathbb S_+^2$ nhưng không xác định dương vì $e_2^TYe_2=0$. Ma trận $Z=\operatorname{diag}(1,-1)$ không PSD vì $e_2^TZe_2=-1$.

**Ý nghĩa và ứng dụng trong AI.** Ma trận hiệp phương sai và ma trận Gram luôn PSD. Hessian PSD biểu diễn độ cong không âm theo mọi hướng. Phần này chưa đưa nón PSD vào một dạng bài toán tối ưu ma trận.

**Điểm dễ nhầm.** Đường chéo không âm chưa đủ để một ma trận đối xứng tổng quát là PSD. PSD không đồng nghĩa khả nghịch. Điều kiện dạng toàn phương phải đúng với mọi $z$, không chỉ các véc-tơ cơ sở.

**Đầu ra.** Nón PSD là một ví dụ quan trọng của tập lồi; mục tiếp theo khái quát các phép tạo tập lồi mới.

### 8. Các phép bảo toàn tập lồi

**Mục tiêu đọc hiểu.** Người đọc chứng minh được tính lồi của một tập ghép bằng các phép bảo toàn thay vì lặp lại kiểm tra đoạn nối cho toàn bộ biểu thức.

**Định nghĩa và giả thiết.** Nếu $C,D$ lồi và $F(x)=Ax+b$ affine, các phép sau bảo toàn tính lồi:

- giao tùy ý của các tập lồi;
- ảnh affine $F(C)=\{Ax+b:x\in C\}$;
- nghịch ảnh affine $F^{-1}(D)=\{x:Ax+b\in D\}$;
- tổng Minkowski $C+D=\{x+y:x\in C,\ y\in D\}$;
- tích Descartes $C\times D$.

Phối cảnh của tập cũng lồi khi giữ điều kiện $t>0$:

$$
\widetilde C=\{(x,t):t>0,\ x/t\in C\}.
$$

**Trực quan.** Giao cắt bỏ phần không thỏa các điều kiện khác. Ảnh affine co, kéo, quay hoặc chiếu một tập. Nghịch ảnh thu tất cả điểm được ánh xạ vào tập đích.

![Một quả cầu qua ánh xạ affine thành ellipsoid, nghịch ảnh của quả cầu và giao ellipsoid với một nửa không gian.](img/lec-01/convex-set-preservation-map.svg)

*Các mũi tên ghi rõ ảnh hay nghịch ảnh; phép giao được biểu diễn thêm bằng đường biên và họa tiết.*

**Ví dụ tính được.** Cho $D=\{u\in\mathbb R^2:\lVert u\rVert_2\le1\}$ và $F(x)=(2x_1,x_2)^T$. Khi đó

$$
F^{-1}(D)=\{x:4x_1^2+x_2^2\le1\},
$$

là một ellipsoid lồi. Giao thêm nửa không gian $x_2\ge0$ vẫn cho một tập lồi.

**Ý nghĩa và ứng dụng trong AI.** Ràng buộc $\lVert Ax-b\rVert_2\le\tau$ là nghịch ảnh affine của một quả cầu. Giao nhiều ràng buộc lồi tạo tập khả thi chung. Ảnh affine mô tả biến đổi đặc trưng hoặc chiếu một tập bất định.

**Điểm dễ nhầm.** Ảnh và nghịch ảnh affine không yêu cầu $A$ khả nghịch. Hợp của hai tập lồi nói chung không lồi. Nghịch ảnh qua một ánh xạ phi tuyến tùy ý không có bảo đảm này. Điều kiện $t>0$ của phối cảnh là bắt buộc.

**Đầu ra.** Nhóm B cung cấp các viên gạch và phép ghép cần để chứng minh tập khả thi lồi trong các ca ứng dụng.

## Các định lý và chứng minh quan trọng — Nhóm B

### Bao lồi là tập lồi nhỏ nhất chứa tập đã cho

**Giả thiết.** Cho $S\subseteq\mathbb R^n$ và định nghĩa $\operatorname{conv}S$ là tập mọi tổ hợp lồi hữu hạn của các điểm trong $S$.

**Kết luận.** Tập $\operatorname{conv}S$ lồi, chứa $S$, và nằm trong mọi tập lồi chứa $S$.

::: proof
Mỗi $x\in S$ thuộc $\operatorname{conv}S$ vì $x=1x$. Lấy

$$
u=\sum_{i=1}^k\alpha_i x_i,
\qquad
v=\sum_{j=1}^{\ell}\beta_j y_j
$$

thuộc $\operatorname{conv}S$, và $\theta\in[0,1]$. Khi đó

$$
\theta u+(1-\theta)v
=\sum_i(\theta\alpha_i)x_i
+\sum_j((1-\theta)\beta_j)y_j.
$$

Các hệ số không âm và có tổng $\theta+(1-\theta)=1$, nên tổ hợp trên thuộc $\operatorname{conv}S$. Vậy $\operatorname{conv}S$ lồi.

Nếu $C$ là một tập lồi chứa $S$, mọi tổ hợp lồi hữu hạn của các điểm trong $S$ đều thuộc $C$. Do đó $\operatorname{conv}S\subseteq C$, chứng minh tính nhỏ nhất.
:::

### Quả cầu chuẩn và nón bậc hai là các tập lồi

**Giả thiết.** Cho một chuẩn $\lVert\cdot\rVert$, tâm $x_c$, bán kính $r\ge0$, và $\mathcal Q^{n+1}=\{(u,t):\lVert u\rVert_2\le t\}$.

**Kết luận.** Quả cầu $B=\{x:\lVert x-x_c\rVert\le r\}$ và $\mathcal Q^{n+1}$ đều lồi.

::: proof
Với $x,y\in B$ và $\theta\in[0,1]$, bất đẳng thức tam giác cho

$$
\begin{aligned}
\left\lVert\theta x+(1-\theta)y-x_c\right\rVert
&\le\theta\lVert x-x_c\rVert+(1-\theta)\lVert y-x_c\rVert\\
&\le r.
\end{aligned}
$$

Vậy quả cầu lồi. Nếu $(u_1,t_1),(u_2,t_2)\in\mathcal Q^{n+1}$ thì

$$
\begin{aligned}
\lVert\theta u_1+(1-\theta)u_2\rVert_2
&\le\theta\lVert u_1\rVert_2+(1-\theta)\lVert u_2\rVert_2\\
&\le\theta t_1+(1-\theta)t_2.
\end{aligned}
$$

Do đó tổ hợp lồi của hai điểm lại thuộc $\mathcal Q^{n+1}$.
:::

### Nón nửa xác định dương là tập lồi

**Giả thiết.** Cho $X,Y\in\mathbb S_+^n$ và $\theta\in[0,1]$.

**Kết luận.** $\theta X+(1-\theta)Y\in\mathbb S_+^n$.

::: proof
Với mọi $z\in\mathbb R^n$,

$$
z^T\bigl(\theta X+(1-\theta)Y\bigr)z
=\theta z^TXz+(1-\theta)z^TYz\ge0.
$$

Ma trận tổ hợp vẫn đối xứng, nên thuộc $\mathbb S_+^n$. Hơn nữa, tổng hai ma trận PSD và bội không âm của một ma trận PSD đều PSD; vì vậy $\mathbb S_+^n$ vừa lồi vừa là nón.
:::

### Giao tùy ý của các tập lồi là tập lồi

**Giả thiết.** Cho một họ tập lồi $(C_i)_{i\in I}$; tập chỉ số $I$ có thể hữu hạn hoặc vô hạn.

**Kết luận.** $C=\bigcap_{i\in I}C_i$ lồi.

::: proof
Nếu $x,y\in C$ thì $x,y\in C_i$ với mọi $i\in I$. Do mỗi $C_i$ lồi,

$$
\theta x+(1-\theta)y\in C_i
$$

với mọi $\theta\in[0,1]$ và mọi $i\in I$. Vậy tổ hợp này thuộc giao $C$.
:::

### Ảnh và nghịch ảnh affine bảo toàn tính lồi

**Giả thiết.** Cho $F(x)=Ax+b$ affine; cho $C,D$ là các tập lồi trong các không gian có kích thước phù hợp.

**Kết luận.** $F(C)$ và $F^{-1}(D)$ đều lồi.

::: proof
Lấy $u=F(x)$, $v=F(y)$ với $x,y\in C$. Tính affine cho

$$
\theta u+(1-\theta)v
=F\bigl(\theta x+(1-\theta)y\bigr).
$$

Vì $C$ lồi, vế phải thuộc $F(C)$; do đó ảnh lồi.

Nếu $x,y\in F^{-1}(D)$ thì $F(x),F(y)\in D$. Ta có

$$
F\bigl(\theta x+(1-\theta)y\bigr)
=\theta F(x)+(1-\theta)F(y)\in D.
$$

Suy ra $\theta x+(1-\theta)y\in F^{-1}(D)$, nên nghịch ảnh lồi. Không bước nào yêu cầu $A$ khả nghịch.
:::

## Tài liệu tham khảo

- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Mục 1.1, 2.1–2.3; Chương 3; Mục 4.1; Phụ lục A.2.2–A.3.2.
