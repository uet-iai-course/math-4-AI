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

## Tài liệu tham khảo

- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Mục 1.1; Chương 2–3; Mục 4.1; Phụ lục A.2.2–A.3.2.
