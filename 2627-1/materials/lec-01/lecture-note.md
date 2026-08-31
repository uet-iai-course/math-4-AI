# Bài 01 — Giới thiệu tối ưu, tập lồi và hàm lồi

Ghi chú này mở rộng các khái niệm nền của Bài 01. Phần đầu xây dựng ngôn ngữ để mô tả một bài toán tối ưu, phân biệt các loại nghiệm và kiểm tra hai câu hỏi thường bị gộp lại: nghiệm có tồn tại không và có duy nhất không.

Ký hiệu chung trong phần này là $x\in\mathbb R^n$ cho biến quyết định, $C\subseteq\mathbb R^n$ cho tập khả thi và $f_0$ cho hàm mục tiêu. Khi không có nguy cơ nhầm lẫn, ta viết bài toán dưới dạng

$$
\underset{x\in C}{\operatorname{minimize}}\; f_0(x).
$$

Nguồn chính của phần này là Boyd và Vandenberghe (2004), Chương 1–3. Ký hiệu giá trị tối ưu, tập khả thi và các bảo đảm tối ưu cơ bản được đối chiếu thêm với Mục 4.1–4.2; phần này chỉ dùng các kết quả đó làm nền, chưa phân loại hay cải dạng các lớp bài toán của Bài 02.

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

Tính duy nhất cần một giả thiết khác. Nếu $C$ lồi và $f_0$ lồi chặt (còn gọi là lồi nghiêm ngặt) trên $C$, thì bài toán có nhiều nhất một nghiệm tối ưu. Kết luận này không tự tạo ra nghiệm; nó chỉ loại trừ khả năng có hai nghiệm khác nhau.

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

## C. Hàm lồi và công cụ kiểm tra

### 9. Hàm lồi, hàm lõm và hàm lồi chặt

**Mục tiêu đọc hiểu.** Người đọc diễn giải được bất đẳng thức dây cung, phân biệt hàm lồi, hàm lõm, hàm affine và hàm lồi chặt.

**Định nghĩa và giả thiết.** Cho $D\subseteq\mathbb R^n$ lồi. Hàm $f:D\to\mathbb R$ là hàm lồi nếu với mọi $x,y\in D$ và $\theta\in[0,1]$,

$$
f\bigl(\theta x+(1-\theta)y\bigr)
\le\theta f(x)+(1-\theta)f(y).
$$

Hàm $f$ là lồi chặt nếu bất đẳng thức là chặt với mọi $x\ne y$ và $\theta\in(0,1)$. Hàm $f$ là lõm nếu $-f$ lồi. Hàm affine vừa lồi vừa lõm.

**Trực quan.** Đồ thị của hàm lồi nằm không cao hơn dây cung nối hai điểm bất kỳ trên đồ thị. Với hàm lồi chặt, phần đồ thị giữa hai điểm phân biệt nằm thấp hơn hẳn dây cung.

![Đồ thị hàm lồi nằm dưới dây cung, hàm lồi chặt nằm thấp hơn dây cung và hàm lõm có chiều bất đẳng thức ngược lại.](img/lec-01/convex-concave-strict.svg)

*Nét liền, nét đứt và nhãn bất đẳng thức phân biệt ba trường hợp ngoài tín hiệu màu.*

**Ví dụ và phản ví dụ.** Với $f(x)=x^2$, chọn $x=-1$, $y=3$ và $\theta=1/2$. Khi đó

$$
f(1)=1
<\frac12f(-1)+\frac12f(3)=5,
$$

phù hợp với tính lồi chặt. Hàm $g(x)=|x|$ lồi nhưng không lồi chặt: với $x=1$, $y=3$, đồ thị trùng dây cung trên đoạn $[1,3]$. Hàm $h(x)=-x^2$ lõm.

**Ý nghĩa và ứng dụng trong AI.** Mục tiêu lồi trên tập khả thi lồi cho phép chuyển cực tiểu địa phương thành cực tiểu toàn cục. Lồi chặt có thể cho nghiệm duy nhất khi nghiệm tồn tại. Log-hợp lý lõm thường được đổi dấu thành âm log-hợp lý lồi.

**Điểm dễ nhầm.** Miền xác định phải lồi. Hình chiếc bát chỉ là trực giác, không phải định nghĩa. Hàm affine không lồi chặt. Tính lồi của mục tiêu không tự bảo đảm tập khả thi lồi, tồn tại nghiệm hoặc khả năng tổng quát hóa.

**Đầu ra.** Định nghĩa dây cung có thể được chuyển thành các phát biểu hình học qua epigraph và tập mức.

### 10. Epigraph, tập mức và hàm mở rộng giá trị

**Mục tiêu đọc hiểu.** Người đọc chuyển được giữa một hàm và các tập gắn với hàm, đồng thời mã hóa ràng buộc bằng giá trị $+\infty$.

**Định nghĩa và giả thiết.** Epigraph của $f:D\to\mathbb R$ là

$$
\operatorname{epi}f
=\{(x,t)\in D\times\mathbb R:t\ge f(x)\}.
$$

Tập mức dưới tại mức $\alpha$ là

$$
S_\alpha=\{x\in D:f(x)\le\alpha\}.
$$

Với tập $C$, hàm chỉ thị mở rộng được định nghĩa bởi

$$
I_C(x)=
\begin{cases}
0,&x\in C,\\
+\infty,&x\notin C.
\end{cases}
$$

Nếu $C$ lồi thì $I_C$ là hàm lồi mở rộng. Bài toán có ràng buộc có thể được viết thành cực tiểu hóa $f+I_C$ trên toàn không gian.

**Trực quan.** Epigraph là vùng nằm trên đồ thị; một lát cắt ngang của epigraph tạo tập mức dưới. Hàm chỉ thị dựng một bức tường vô hạn bên ngoài tập khả thi.

![Epigraph của hàm bình phương, lát ngang tạo tập mức dưới và hàm chỉ thị dựng tường ngoài tập khả thi.](img/lec-01/epigraph-levelset-indicator.svg)

*Ba panel dùng cùng miền một chiều để thể hiện quan hệ giữa đồ thị, tập và ràng buộc.*

**Ví dụ và phản ví dụ.** Với $f(x)=x^2$,

$$
S_1=\{x:x^2\le1\}=[-1,1].
$$

Do đó $f+I_{[-1,1]}$ bằng $x^2$ trong đoạn và bằng $+\infty$ ngoài đoạn. Ngược lại, $g(x)=\sqrt{|x|}$ có các tập mức dưới $[-\alpha^2,\alpha^2]$ khi $\alpha\ge0$, đều lồi, nhưng $g$ không lồi. Điều này cho thấy chiều đảo của hệ quả tập mức là sai.

**Ý nghĩa và ứng dụng trong AI.** Epigraph giúp tách một cận trên khỏi giá trị hàm; hàm chỉ thị giúp viết loss và tập khả thi trong cùng một biểu thức. Hai cách biểu diễn này cho phép giữ mục tiêu và giới hạn trong một ngôn ngữ thống nhất.

**Điểm dễ nhầm.** Graph của hàm lồi thường không phải tập lồi; epigraph mới là đối tượng lồi tương ứng. Mọi tập mức dưới lồi chỉ suy ra tính tựa lồi, không suy ra tính lồi. Không thực hiện tùy ý các phép toán không xác định như $+\infty-(+\infty)$.

**Đầu ra.** Để kiểm tra một hàm nhiều biến, ta có thể xét mọi hạn chế của nó trên đường thẳng.

### 11. Hạn chế trên đường và các ví dụ hàm lồi

**Mục tiêu đọc hiểu.** Người đọc giảm được kiểm tra nhiều biến về một biến và nhận dạng một thư viện hàm lồi nền.

**Định nghĩa và giả thiết.** Cho $f:D\to\mathbb R$ với $D$ lồi. Với $x\in D$ và hướng $v\in\mathbb R^n$, hạn chế trên đường là

$$
g(t)=f(x+tv),
\qquad
\operatorname{dom}g=\{t:x+tv\in D\}.
$$

Hàm $f$ lồi trên $D$ khi và chỉ khi mọi hạn chế như vậy lồi trên miền một chiều tương ứng.

**Trực quan.** Một mặt phẳng dọc cắt bề mặt của hàm nhiều biến thành một đường cong. Nếu bề mặt lồi, mọi lát cắt theo đường đều cong lên; một lát cắt không lồi đủ để bác bỏ tính lồi.

![Bề mặt bậc hai lồi cùng hai lát cắt theo đường và thư viện nhỏ các hàm lồi cơ bản.](img/lec-01/line-restriction-convex-library.svg)

*Các lát cắt ghi rõ điểm gốc, hướng và biến $t$.*

**Ví dụ tính được.** Với $f(x)=\lVert Ax-b\rVert_2^2$, hạn chế theo $x+tv$ là

$$
g(t)=\lVert A(x+tv)-b\rVert_2^2.
$$

Hệ số của $t^2$ bằng $\lVert Av\rVert_2^2\ge0$, nên mọi lát cắt là hàm bậc hai lồi. Các hàm nền khác gồm hàm affine, chuẩn, $e^x$, cực đại của hữu hạn hàm affine và log-tổng-mũ

$$
\operatorname{lse}(z)=\log\left(\sum_{i=1}^m e^{z_i}\right).
$$

Chẳng hạn, $\operatorname{lse}(0,0)=\log2$.

**Ý nghĩa và ứng dụng trong AI.** Bình phương tối thiểu, chuẩn điều chuẩn, log-tổng-mũ và mất mát logistic được tạo từ thư viện này. Hạn chế trên đường cũng giải thích độ cong theo một hướng tham số.

**Điểm dễ nhầm.** Một vài lát cắt minh họa không đủ chứng minh; phát biểu yêu cầu mọi đường. Với dạng bậc hai $x^TPx$, tính lồi phụ thuộc phần đối xứng $(P+P^T)/2$. Không nên kết luận từ vài điểm lấy mẫu trên đồ thị.

**Đầu ra.** Khi hàm đủ trơn, độ cong của mọi lát cắt được mã hóa bởi gradient và Hessian.

### 12. Điều kiện bậc nhất và bậc hai

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được tính lồi bằng mặt phẳng tiếp xúc hoặc Hessian, với đúng miền và giả thiết trơn.

**Định nghĩa và giả thiết.** Cho $D\subseteq\mathbb R^n$ mở và lồi. Nếu $f:D\to\mathbb R$ khả vi thì $f$ lồi khi và chỉ khi

$$
f(y)\ge f(x)+\nabla f(x)^T(y-x)
$$

với mọi $x,y\in D$. Nếu $f\in C^2(D)$ thì $f$ lồi khi và chỉ khi

$$
\nabla^2f(x)\succeq0
\quad
\text{với mọi }x\in D.
$$

Điều kiện $\nabla^2f(x)\succ0$ với mọi $x\in D$ là điều kiện đủ cho lồi chặt, nhưng không phải điều kiện cần.

**Trực quan.** Đồ thị hàm lồi nằm trên mọi mặt phẳng tiếp xúc. Theo hướng $d$, độ cong bậc hai là $d^T\nabla^2f(x)d$ và phải không âm.

![Mặt phẳng tiếp xúc nằm dưới bề mặt lồi và các elip mức biểu diễn Hessian xác định dương.](img/lec-01/first-second-order-convexity.svg)

*Panel Hessian ghi cả hướng $d$ và đại lượng $d^T\nabla^2f(x)d$.*

**Ví dụ tính được.** Xét

$$
f(x_1,x_2)=x_1^2+x_1x_2+2x_2^2.
$$

Ta có

$$
\nabla f(x)=\begin{bmatrix}2x_1+x_2\\x_1+4x_2\end{bmatrix},
\qquad
\nabla^2f(x)=\begin{bmatrix}2&1\\1&4\end{bmatrix}.
$$

Hai giá trị riêng của Hessian là $3\pm\sqrt2>0$, nên $f$ lồi chặt. Tại $(1,-1)$, $f=2$ và $\nabla f=(1,-3)^T$.

**Ý nghĩa và ứng dụng trong AI.** Gradient cung cấp chứng nhận tiếp tuyến; Hessian kiểm tra độ cong của loss và dạng toàn phương. Trong phần này, hai đại lượng chỉ được dùng để nhận dạng và chứng minh tính lồi.

**Điểm dễ nhầm.** Hessian PSD tại một điểm không chứng minh tính lồi trên toàn miền. Gradient bằng $0$ chỉ suy ra tối ưu toàn cục sau khi đã có tính lồi và điểm nằm trong miền thích hợp. Hàm $x^4$ lồi chặt dù Hessian bằng $0$ tại $x=0$.

**Đầu ra.** Trong nhiều mô hình, ta có thể tránh tính Hessian lại bằng các phép bảo toàn tính lồi.

### 13. Các phép bảo toàn hàm lồi và Jensen

**Mục tiêu đọc hiểu.** Người đọc dựng được hàm lồi mới từ các hàm cơ sở và nối tính lồi với kỳ vọng.

**Định nghĩa và giả thiết.** Các phép sau bảo toàn tính lồi khi các miền tương thích:

- $\sum_i\alpha_i f_i$ với $f_i$ lồi và $\alpha_i\ge0$;
- $f(Ax+b)$ khi $f$ lồi;
- $\sup_{s\in S}f_s(x)$ khi mỗi $f_s$ lồi trên miền chung;
- $h\circ g$ khi $g$ lồi, $h$ lồi và không giảm trên miền liên quan;
- $h\circ g$ khi $g$ lõm, $h$ lồi và không tăng trên miền liên quan;
- $g(x)=\inf_{y\in C}f(x,y)$ khi $f$ lồi đồng thời theo $(x,y)$ và $C$ lồi;
- phối cảnh $g(x,t)=tf(x/t)$ trên $t>0$.

Với $f$ lồi, các điểm $x_i$ trong miền và $\theta_i\ge0$, $\sum_i\theta_i=1$, Jensen hữu hạn cho

$$
f\left(\sum_i\theta_i x_i\right)
\le\sum_i\theta_i f(x_i).
$$

**Trực quan.** Một cây cấu tạo ghi hàm cơ sở, phép ghép và giả thiết. Jensen so sánh hàm của trung bình với trung bình của các giá trị hàm.

![Cây các phép bảo toàn tính lồi và hình Jensen so sánh hàm của trung bình với trung bình của hàm.](img/lec-01/convex-preservation-and-jensen.svg)

*Mỗi nhánh của cây ghi điều kiện hệ số hoặc tính đơn điệu; hình Jensen dùng cả vị trí và nhãn số.*

**Ví dụ và phản ví dụ.** Cho $Z$ nhận $-1$ và $3$ với xác suất bằng nhau, và $f(u)=u^2$. Khi đó

$$
f(\mathbb EZ)=f(1)=1,
\qquad
\mathbb E[f(Z)]=\frac12(1+9)=5.
$$

Điều kiện hợp hàm không được bỏ. Hai hàm $h(u)=u^2$ và $g(x)=x^2-1$ đều lồi, nhưng

$$
(h\circ g)(x)=(x^2-1)^2
$$

không lồi gần $0$ vì đạo hàm bậc hai tại $0$ bằng $-4$.

**Ý nghĩa và ứng dụng trong AI.** Tổng loss theo mẫu, điều chuẩn, max-loss, log-tổng-mũ và rủi ro kỳ vọng đều dùng các quy tắc này. Jensen là cầu nối giữa giải tích lồi và xác suất.

**Điểm dễ nhầm.** Trọng số âm có thể phá tính lồi. Infimum tùy ý của các hàm lồi không bảo toàn lồi; cần lồi đồng thời trước khi loại biến. Không có quy tắc chung “lồi hợp lồi”. Jensen cho biến ngẫu nhiên cần các kỳ vọng tồn tại và hữu hạn.

**Đầu ra.** Nhóm C cung cấp công cụ để chứng minh mục tiêu lồi từ thư viện hàm và phép ghép, chuẩn bị cho ca logistic ở chủ đề 14.

## Các định lý và chứng minh quan trọng — Nhóm C

### Cực tiểu địa phương của bài toán lồi là cực tiểu toàn cục

**Giả thiết.** Cho $C$ lồi, $f:C\to\mathbb R$ lồi và $x^*\in C$ là cực tiểu địa phương tương đối với $C$.

**Kết luận.** Điểm $x^*$ là cực tiểu toàn cục của $f$ trên $C$.

::: proof
Giả sử ngược lại rằng tồn tại $y\in C$ sao cho $f(y)<f(x^*)$. Với $\theta\in(0,1)$, đặt

$$
x_\theta=(1-\theta)x^*+\theta y.
$$

Tính lồi của $C$ cho $x_\theta\in C$, còn tính lồi của $f$ cho

$$
f(x_\theta)
\le(1-\theta)f(x^*)+\theta f(y)
<f(x^*).
$$

Khi $\theta\downarrow0$, $x_\theta\to x^*$. Vì vậy có các điểm khả thi tùy ý gần $x^*$ với giá trị nhỏ hơn $f(x^*)$, mâu thuẫn giả thiết cực tiểu địa phương. Do đó không tồn tại $y$ như trên.
:::

### Hàm lồi chặt có nhiều nhất một nghiệm tối ưu

**Giả thiết.** Cho $C$ lồi và $f:C\to\mathbb R$ lồi chặt.

**Kết luận.** Bài toán $\min_{x\in C}f(x)$ có nhiều nhất một nghiệm tối ưu.

::: proof
Giả sử có hai nghiệm phân biệt $x^*,y^*\in C$ cùng đạt giá trị $p^*$. Trung điểm $z=(x^*+y^*)/2$ thuộc $C$. Tính lồi chặt cho

$$
f(z)
<\frac12f(x^*)+\frac12f(y^*)
=p^*,
$$

mâu thuẫn định nghĩa của $p^*$. Vì vậy không thể có hai nghiệm tối ưu phân biệt. Kết quả này chỉ nói “nhiều nhất một”; sự tồn tại cần một lập luận riêng như định lý Weierstrass.
:::

### Hàm lồi khi và chỉ khi epigraph lồi

**Giả thiết.** Cho $D$ lồi và $f:D\to\mathbb R$.

**Kết luận.** Hàm $f$ lồi khi và chỉ khi $\operatorname{epi}f$ lồi. Nếu $f$ lồi thì mọi tập mức dưới $S_\alpha$ của $f$ đều lồi.

::: proof
Giả sử $f$ lồi. Lấy $(x,s),(y,t)\in\operatorname{epi}f$ và $\theta\in[0,1]$. Ta có $s\ge f(x)$, $t\ge f(y)$, nên

$$
\theta s+(1-\theta)t
\ge\theta f(x)+(1-\theta)f(y)
\ge f\bigl(\theta x+(1-\theta)y\bigr).
$$

Vậy tổ hợp lồi của hai điểm epigraph vẫn thuộc epigraph.

Ngược lại, giả sử $\operatorname{epi}f$ lồi. Hai điểm $(x,f(x))$ và $(y,f(y))$ thuộc epigraph. Do đó

$$
\bigl(\theta x+(1-\theta)y,\ \theta f(x)+(1-\theta)f(y)\bigr)
\in\operatorname{epi}f,
$$

chính là bất đẳng thức định nghĩa tính lồi của $f$.

Với hệ quả tập mức, nếu $x,y\in S_\alpha$ thì

$$
f\bigl(\theta x+(1-\theta)y\bigr)
\le\theta f(x)+(1-\theta)f(y)
\le\alpha.
$$

Vậy $S_\alpha$ lồi. Chiều đảo của hệ quả này không đúng nói chung.
:::

### Tính lồi tương đương với tính lồi trên mọi đường

**Giả thiết.** Cho $D\subseteq\mathbb R^n$ lồi và $f:D\to\mathbb R$.

**Kết luận.** Hàm $f$ lồi trên $D$ khi và chỉ khi với mọi $x\in D$, $v\in\mathbb R^n$, hàm $g(t)=f(x+tv)$ lồi trên $\{t:x+tv\in D\}$.

::: proof
Nếu $f$ lồi thì $g$ là hợp của $f$ với ánh xạ affine $t\mapsto x+tv$, nên lồi.

Ngược lại, giả sử mọi hạn chế theo đường đều lồi. Lấy $x,y\in D$ và đặt $v=y-x$. Hạn chế $g(t)=f(x+t(y-x))$ lồi trên đoạn $[0,1]$. Với $\theta\in[0,1]$,

$$
f\bigl((1-\theta)x+\theta y\bigr)
=g(\theta)
\le(1-\theta)g(0)+\theta g(1)
=(1-\theta)f(x)+\theta f(y).
$$

Do đó $f$ lồi.
:::

### Điều kiện bậc nhất đặc trưng hàm lồi khả vi

**Giả thiết.** Cho $D\subseteq\mathbb R^n$ mở và lồi; cho $f:D\to\mathbb R$ khả vi.

**Kết luận.** Hàm $f$ lồi khi và chỉ khi với mọi $x,y\in D$,

$$
f(y)\ge f(x)+\nabla f(x)^T(y-x).
$$

::: proof
Giả sử $f$ lồi. Đặt $g(t)=f(x+t(y-x))$. Với $t\in(0,1]$, tính lồi cho

$$
g(t)\le(1-t)g(0)+tg(1),
$$

nên

$$
g(1)\ge g(0)+\frac{g(t)-g(0)}{t}.
$$

Cho $t\downarrow0$ và dùng $g'(0)=\nabla f(x)^T(y-x)$ thu được bất đẳng thức cần chứng minh.

Ngược lại, giả sử bất đẳng thức tiếp tuyến đúng. Với $z=\theta x+(1-\theta)y$, áp dụng tại $z$ cho $x$ và $y$:

$$
f(x)\ge f(z)+\nabla f(z)^T(x-z),
$$

$$
f(y)\ge f(z)+\nabla f(z)^T(y-z).
$$

Nhân hai bất đẳng thức lần lượt với $\theta$ và $1-\theta$, rồi cộng lại. Vì $\theta(x-z)+(1-\theta)(y-z)=0$, ta được

$$
\theta f(x)+(1-\theta)f(y)\ge f(z).
$$

Đây là định nghĩa tính lồi.
:::

### Tiêu chuẩn Hessian cho hàm lồi hai lần khả vi

**Giả thiết.** Cho $D\subseteq\mathbb R^n$ mở và lồi; cho $f\in C^2(D)$.

**Kết luận.** Hàm $f$ lồi trên $D$ khi và chỉ khi $\nabla^2f(x)\succeq0$ với mọi $x\in D$.

::: proof
Nếu $f$ lồi, với mọi $x\in D$ và hướng $d$, hạn chế $g(t)=f(x+td)$ lồi trên một khoảng mở chứa $0$. Hàm một biến hai lần khả vi lồi có $g''(0)\ge0$. Theo quy tắc dây chuyền,

$$
g''(0)=d^T\nabla^2f(x)d\ge0.
$$

Vì điều này đúng với mọi $d$, Hessian PSD.

Ngược lại, giả sử Hessian PSD tại mọi điểm. Với hai điểm $x,y\in D$, đặt $d=y-x$ và $g(t)=f(x+td)$ trên $[0,1]$. Khi đó

$$
g''(t)=d^T\nabla^2f(x+td)d\ge0.
$$

Do đó $g$ lồi trên $[0,1]$. Tính lồi trên mọi đoạn suy ra $f$ lồi trên $D$.
:::

### Tổng không âm, hợp affine và supremum bảo toàn tính lồi

**Giả thiết.** Các hàm được xét có miền chung phù hợp. Cho $f_i$ lồi, $\alpha_i\ge0$; cho $f$ lồi và $F(x)=Ax+b$ affine; cho họ $(g_s)_{s\in S}$ gồm các hàm lồi.

**Kết luận.** Các hàm $\sum_i\alpha_i f_i$, $f\circ F$ và $g(x)=\sup_{s\in S}g_s(x)$ đều lồi trên miền tương ứng; $g$ có thể nhận giá trị $+\infty$.

::: proof
Với tổng không âm, nhân bất đẳng thức lồi của từng $f_i$ với $\alpha_i\ge0$ rồi cộng lại.

Với hợp affine, tính chất

$$
F\bigl(\theta x+(1-\theta)y\bigr)
=\theta F(x)+(1-\theta)F(y)
$$

cho phép áp dụng trực tiếp bất đẳng thức lồi của $f$.

Với supremum, với mọi $s\in S$,

$$
g_s\bigl(\theta x+(1-\theta)y\bigr)
\le\theta g_s(x)+(1-\theta)g_s(y)
\le\theta g(x)+(1-\theta)g(y).
$$

Lấy supremum theo $s$ ở vế trái cho bất đẳng thức lồi của $g$.
:::

### Bất đẳng thức Jensen hữu hạn

**Giả thiết.** Cho $D$ lồi, $f:D\to\mathbb R$ lồi, $x_1,\ldots,x_k\in D$ và $\theta_i\ge0$ với $\sum_{i=1}^k\theta_i=1$.

**Kết luận.**

$$
f\left(\sum_{i=1}^k\theta_i x_i\right)
\le\sum_{i=1}^k\theta_i f(x_i).
$$

::: proof
Chứng minh bằng quy nạp theo $k$. Trường hợp $k=2$ chính là định nghĩa tính lồi. Giả sử kết quả đúng với $k-1$ điểm. Nếu $\theta_k=1$ thì kết luận hiển nhiên. Nếu $\theta_k<1$, đặt

$$
\bar x=\sum_{i=1}^{k-1}\frac{\theta_i}{1-\theta_k}x_i.
$$

Các hệ số trong $\bar x$ không âm và có tổng $1$, nên $\bar x\in D$. Ta có

$$
\sum_{i=1}^k\theta_i x_i
=(1-\theta_k)\bar x+\theta_kx_k.
$$

Áp dụng tính lồi cho hai điểm rồi giả thiết quy nạp:

$$
\begin{aligned}
f\left(\sum_{i=1}^k\theta_i x_i\right)
&\le(1-\theta_k)f(\bar x)+\theta_kf(x_k)\\
&\le\sum_{i=1}^{k-1}\theta_i f(x_i)+\theta_kf(x_k).
\end{aligned}
$$

Vậy kết quả đúng với mọi $k$ hữu hạn.
:::

## D. Ca tổng hợp trong AI

### 14. Logistic loss như ứng dụng AI

**Mục tiêu đọc hiểu.** Người đọc ghép được dữ liệu, biến quyết định, biên phân loại có dấu (margin), hàm mất mát và tập khả thi thành một ca tối ưu; sau đó dùng các kết quả của Bài 01 để kết luận về tính lồi, sự tồn tại và quan hệ giữa cực tiểu địa phương với cực tiểu toàn cục.

**Định nghĩa dữ liệu và mô hình.** Cho tập dữ liệu phân loại nhị phân

$$
(a_i,y_i),
\qquad
a_i\in\mathbb R^n,
\qquad
y_i\in\{-1,1\},
\qquad
i=1,\ldots,m.
$$

Véc-tơ $a_i$ và nhãn $y_i$ là dữ kiện; $w\in\mathbb R^n$ là biến quyết định. Điểm số tuyến tính là $a_i^Tw$. Margin có dấu của mẫu thứ $i$ là

$$
s_i(w)=y_i a_i^Tw.
$$

Biên dương nghĩa là dấu của điểm số phù hợp với nhãn; biên càng lớn thì mẫu càng nằm sâu về phía được phân loại đúng. Mất mát logistic của một biên $s$ là

$$
\sigma(s)=\frac1{1+e^{-s}},
\qquad
\Pr(y_i\mid a_i,w)=\sigma\bigl(s_i(w)\bigr).
$$

Vì vậy, âm log-hợp lý của nhãn quan sát được chính là

$$
\phi(s)=-\log\sigma(s)=\log(1+e^{-s}),
$$

và mất mát trên toàn bộ dữ liệu là

$$
L(w)=\sum_{i=1}^m\phi\bigl(s_i(w)\bigr)
=\sum_{i=1}^m\log\left(1+e^{-y_i a_i^Tw}\right).
$$

Để minh họa vai trò của tập khả thi, xét bài toán

$$
\underset{\lVert w\rVert_2\le R}{\operatorname{minimize}}\;L(w),
\qquad
R\ge0.
$$

**Trực quan.** Mất mát logistic giảm trơn khi biên tăng. Hàm phạt mạnh biên âm, bằng $\log2$ tại biên $0$, và tiến về $0$ khi biên tiến tới $+\infty$. Quả cầu chuẩn giới hạn độ lớn của tham số và giữ tập khả thi compact.

![Hai mẫu phân loại một chiều, biên phân loại có dấu và đồ thị mất mát logistic trên tập khả thi đóng từ âm một đến một.](img/lec-01/logistic-loss-convex-case.svg)

*Hình đánh dấu nghiệm ở biên và ghi giá trị margin; vị trí, ký hiệu và kiểu nét được dùng cùng màu.*

**Ví dụ một chiều tính được.** Cho hai mẫu

$$
(a_1,y_1)=(1,1),
\qquad
(a_2,y_2)=(-1,-1),
$$

và tập khả thi $C=[-1,1]$. Cả hai margin đều bằng $w$ vì

$$
y_1a_1w=w,
\qquad
y_2a_2w=(-1)(-1)w=w.
$$

Do đó

$$
L(w)=2\log(1+e^{-w}),
$$

với các đạo hàm

$$
L'(w)=-\frac{2}{1+e^w}<0,
\qquad
L''(w)=\frac{2e^w}{(1+e^w)^2}>0.
$$

Hàm giảm và lồi chặt trên $[-1,1]$, nên nghiệm là điểm biên phải

$$
w^*=1,
\qquad
L(w^*)=2\log(1+e^{-1})\approx0{,}627.
$$

Ví dụ này cũng cho thấy gradient tại nghiệm có ràng buộc không nhất thiết bằng $0$: ta có $L'(1)<0$, nhưng mọi điểm lớn hơn $1$ đều không khả thi.

**Ý nghĩa và ứng dụng trong AI.** Mất mát logistic là một mục tiêu chuẩn cho phân loại nhị phân. Ca này cho thấy tính lồi của mất mát, tính lồi và compact của tập khả thi, cùng tính liên tục của mục tiêu trả lời ba câu hỏi khác nhau: hình học của bài toán, sự tồn tại của nghiệm và chất lượng toàn cục của cực tiểu địa phương.

**Điểm dễ nhầm.** Mất mát logistic lồi không có nghĩa dữ liệu không nhiễu, mô hình dự đoán tốt ngoài mẫu hoặc nghiệm luôn duy nhất. Gradient bằng $0$ không phải điều kiện bắt buộc cho nghiệm nằm ở biên tập khả thi. Nếu bỏ giới hạn chuẩn trong dữ liệu phân tách được, một dãy tham số có thể làm mất mát tiến về infimum mà không đạt được tại tham số hữu hạn.

**Đầu ra và chuyển sang Bài 02.** Bài 01 cung cấp công cụ để chứng minh tập khả thi và mục tiêu lồi, đồng thời phát biểu đúng bảo đảm tồn tại và toàn cục. Bài 02 sẽ dùng các công cụ này để nhận dạng và cải dạng những lớp bài toán tối ưu lồi cụ thể.

## Các định lý và chứng minh quan trọng — Nhóm D

### Tính lồi của logistic loss

**Giả thiết.** Dữ liệu $(a_i,y_i)$ được giữ cố định, với $a_i\in\mathbb R^n$ và $y_i\in\{-1,1\}$.

**Kết luận.** Hàm

$$
L(w)=\sum_{i=1}^m\log\left(1+e^{-y_i a_i^Tw}\right)
$$

lồi trên $\mathbb R^n$.

::: proof
Xét hàm một biến $\phi(s)=\log(1+e^{-s})$. Ta có

$$
\phi'(s)=-\frac1{1+e^s},
\qquad
\phi''(s)=\frac{e^s}{(1+e^s)^2}>0.
$$

Vì vậy $\phi$ lồi. Mỗi margin $s_i(w)=y_i a_i^Tw$ là hàm affine của $w$, nên $\phi\circ s_i$ lồi theo quy tắc hợp affine. Tổng hữu hạn của các hàm lồi cũng lồi, do đó $L$ lồi.

Gradient của tổng mất mát là

$$
\nabla L(w)
=-
\sum_{i=1}^m
\frac{y_i a_i}{1+e^{y_i a_i^Tw}}.
$$

Có thể kiểm tra lại bằng Hessian. Đặt $s_i=y_i a_i^Tw$ và

$$
q_i(w)=\frac{e^{s_i}}{(1+e^{s_i})^2}>0.
$$

Vì $y_i^2=1$,

$$
\nabla^2L(w)
=\sum_{i=1}^m q_i(w)a_i a_i^T.
$$

Với mọi $v\in\mathbb R^n$,

$$
v^T\nabla^2L(w)v
=\sum_{i=1}^m q_i(w)(a_i^Tv)^2\ge0.
$$

Vậy $\nabla^2L(w)\succeq0$, xác nhận lại tính lồi.
:::

### Tồn tại và tính toàn cục trên quả cầu tham số

**Giả thiết.** Cho $R\ge0$ và $C=\{w\in\mathbb R^n:\lVert w\rVert_2\le R\}$. Dữ liệu hữu hạn và cố định.

**Kết luận.** Bài toán $\min_{w\in C}L(w)$ có ít nhất một nghiệm; mọi cực tiểu địa phương tương đối với $C$ đều là cực tiểu toàn cục.

::: proof
Quả cầu $C$ khác rỗng, đóng và bị chặn, nên compact trong $\mathbb R^n$. Hàm $L$ là tổng hữu hạn của các hàm liên tục, nên liên tục. Định lý Weierstrass cho tồn tại ít nhất một nghiệm $w^*\in C$.

Quả cầu $C$ lồi và phần trên đã chứng minh $L$ lồi. Theo định lý cực tiểu địa phương của bài toán lồi, mọi cực tiểu địa phương của $L$ tương đối với $C$ là cực tiểu toàn cục.
:::

**Không kết luận duy nhất.** Hessian chỉ được bảo đảm PSD. Nếu tồn tại $v\ne0$ sao cho $a_i^Tv=0$ với mọi $i$, thì

$$
v^T\nabla^2L(w)v=0
$$

với mọi $w$. Vì vậy không thể suy ra lồi chặt hoặc nghiệm duy nhất nếu thiếu giả thiết bổ sung về dữ liệu và tập khả thi.

Một điều kiện đủ dễ kiểm tra là ma trận dữ liệu có các hàng $a_i^T$ và có hạng cột đầy đủ. Khi đó, với mọi $v\ne0$, có ít nhất một $a_i^Tv\ne0$, nên công thức Hessian cho $v^T\nabla^2L(w)v>0$. Mục tiêu lồi chặt; kết hợp với sự tồn tại trên quả cầu, nghiệm là duy nhất. Chiều ngược lại không được khẳng định vì hình học của tập khả thi vẫn có thể làm nghiệm duy nhất ngay cả khi ma trận dữ liệu thiếu hạng.

### Dữ liệu phân tách được có thể làm infimum không đạt được

**Giả thiết.** Dùng hai mẫu một chiều của ví dụ, nhưng bỏ ràng buộc $w\in[-1,1]$ và cho $w\in\mathbb R$.

**Kết luận.** Hàm $L(w)=2\log(1+e^{-w})$ có infimum bằng $0$ nhưng không có nghiệm tối ưu hữu hạn.

::: proof
Với mọi $w\in\mathbb R$, ta có $e^{-w}>0$, nên

$$
L(w)=2\log(1+e^{-w})>0.
$$

Mặt khác,

$$
\lim_{w\to+\infty}L(w)=2\log(1+0)=0.
$$

Do đó $\inf_{w\in\mathbb R}L(w)=0$, nhưng không có $w$ hữu hạn nào đạt giá trị $0$. Phản ví dụ này cho thấy tính lồi và tính liên tục không đủ bảo đảm tồn tại trên một tập khả thi không compact.
:::

## Tài liệu tham khảo

- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Mục 1.1, 2.1–2.3, 3.1–3.2, đặc biệt Mục 3.1.5 về các ví dụ hàm lồi và Mục 3.2.2 về hợp hàm; Mục 4.1–4.2 chỉ dùng cho ký hiệu và kết luận của bài toán lồi; Phụ lục A.2.2–A.3.2.
