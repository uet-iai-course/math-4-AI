# Bài 11 — Học từ dữ liệu như một bài toán ước lượng thống kê

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Phân biệt mô hình thống kê, mẫu ngẫu nhiên, số liệu quan sát, tham số, thống kê và bộ ước lượng; viết hàm hợp lý đúng với giả thiết lấy mẫu.
2. Suy ra ước lượng hợp lý cực đại cho mô hình Bernoulli, kiểm tra cực đại và xử lý nghiệm biên.
3. Dùng nhân tử Lagrange để ước lượng phân phối phân loại, kể cả trường hợp một nhóm chưa xuất hiện trong mẫu.
4. Chứng minh công thức ước lượng trung bình và phương sai Gaussian; phân biệt ước lượng hợp lý cực đại với ước lượng không chệch.
5. Ước lượng ma trận hiệp phương sai Gaussian nhiều chiều, xác định điều kiện tồn tại nghiệm và giải thích các đường đồng mức bằng trị riêng, vector riêng và khoảng cách Mahalanobis.
6. Suy ra hàm mất mát từ một giả thiết phân phối; phân tích giới hạn của việc dùng mô hình đã khớp để đánh giá dữ liệu mới.

Các mục tiêu này cụ thể hóa năng lực xây dựng và phân tích mô hình học máy thuộc CLO2 của học phần. Đây là các mục tiêu biên soạn, không phải các mã chuẩn đầu ra bài học mới. Các bài củng cố 11.1–11.6 và bài tự học E11.1–E11.4 kiểm tra các mục tiêu tương ứng.

## Kiến thức tiên quyết và liên hệ với các bài trước

- **Xác suất và phân phối.** Bài 10, Định nghĩa 10.11 cho tính độc lập; Định nghĩa 10.16 cho Bernoulli và phân phối phân loại; Định nghĩa 10.17 cho Gaussian. Ta dùng lại các họ phân phối này, nhưng xem tham số của chúng là chưa biết.
- **Kỳ vọng và hiệp phương sai.** Định nghĩa 10.18 và 10.21 cho kỳ vọng và hiệp phương sai của phân phối. Trong bài này, trung bình mẫu và ma trận hiệp phương sai mẫu là những hàm của dữ liệu dùng để ước lượng các đại lượng đó.
- **Đạo hàm và tối ưu hóa.** Cần biết đạo hàm một biến, điều kiện cực trị, tính lõm và nhân tử Lagrange với ràng buộc đẳng thức. Các Bài 03–05 đã dùng các công cụ này khi hàm mục tiêu được cho trước. Chúng ta tiếp tục bằng việc xây dựng chính hàm mục tiêu từ mô hình xác suất.
- **Đại số tuyến tính.** Cần biết chuyển vị, tích ngoài $vv^\top$, vết, định thức, hạng, ma trận đối xứng xác định dương và phân rã trị riêng. Đẳng thức $v^\top Av=\operatorname{tr}(Avv^\top)$ được giải thích lại khi dùng.

Trong Bài 10, Định lý 10.10 cập nhật xác suất của một biến cố khi mô hình xác suất đã được xác định. Để áp dụng mô hình đó khi tỉ lệ lỗi hoặc mức nhiễu chưa biết, chúng ta cần thêm một bước: ước lượng tham số từ dữ liệu. Suy luận về tham số và suy luận về một biến cố mới có liên quan nhưng là hai bài toán khác nhau.

## Cách đọc và phân bổ thời gian

| Nội dung lý thuyết | Thời gian |
|---|---:|
| 11.1. Mô hình, mẫu, bộ ước lượng và hàm hợp lý | 15 phút |
| 11.2. Ước lượng Bernoulli | 25 phút |
| 11.3. Ước lượng phân loại với ràng buộc | 20 phút |
| 11.4. Ước lượng Gaussian một chiều | 25 phút |
| 11.5. Gaussian nhiều chiều và hình học | 35 phút |
| **Tổng lý thuyết** | **120 phút** |

Ba bài trên lớp chiếm 30 phút riêng. Bốn bài tự học cần khoảng 180 phút; khoảng hai giờ còn lại dành cho đọc sách và kiểm tra các phép tính trong ví dụ, tổng cộng khoảng năm giờ tự học.

Phần **cốt lõi** gồm hàm hợp lý, ba bài toán ước lượng, phân biệt mẫu số $n$ với $n-1$ và hình học Gaussian. Chứng minh toàn cục của ước lượng hiệp phương sai được trình bày đầy đủ; có thể đọc sau khi đã nắm ví dụ hai chiều. Phần **mở rộng** gồm diễn giải bằng độ phân kỳ Kullback–Leibler và cập nhật Bayes cho Bernoulli. Phần **đọc thêm** giới thiệu các câu hỏi về độ bất định của bộ ước lượng, chưa dùng để đưa ra bảo đảm trong bài này.

Mọi dữ liệu số trong ví dụ và tình huống dưới đây là dữ liệu giả lập phục vụ học tập. Các Ví dụ 11.3, 11.5, 11.7 và 11.9 giữ dữ liệu của bộ ghi chú khởi đầu `lecture_notes.pdf`, Tuần 2; lời giải được trình bày lại và bổ sung kiểm tra theo các kết quả của bài. Các ví dụ còn lại được tự biên soạn theo dạng bài ước lượng của Murphy. Đây là các ví dụ điều chỉnh (adapted examples), không gán thành ví dụ hay bài tập nguyên bản của Murphy. Nguồn và cách điều chỉnh bốn bài tự học được ghi tại phần tài liệu tham khảo.

## Bảng ký hiệu

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $\mathcal X$ | không gian giá trị của một quan sát | tập hữu hạn hoặc $\mathbb R^d$ |
| $\theta$, $\Theta$ | tham số và không gian tham số | vector; tập giá trị cho phép |
| $p_\theta$, $f_\theta$ | hàm khối xác suất; mật độ | chuẩn hóa trên $\mathcal X$ |
| $X_i$, $x_i$ | quan sát ngẫu nhiên; giá trị đã quan sát | phần tử của $\mathcal X$ |
| $D=(x_1,\ldots,x_n)$ | tập dữ liệu có thứ tự | $\mathcal X^n$ |
| $n$ | số quan sát | số nguyên dương |
| $T(X_1,\ldots,X_n)$ | thống kê, cũng có thể là bộ ước lượng | hàm của mẫu |
| $\hat\theta$ | giá trị ước lượng sau khi quan sát | phần tử của $\Theta$ nếu nghiệm tồn tại |
| $L(\theta;D)$ | hàm hợp lý | hàm không âm theo $\theta$ |
| $\ell(\theta;D)$ | log của hàm hợp lý | số thực hoặc $-\infty$ |
| $\hat R_n(\theta)$ | mất mát thực nghiệm trung bình | hàm theo tham số |
| $p$, $\hat p$ | xác suất thành công; giá trị ước lượng | $[0,1]$ |
| $s=\sum_i x_i$ | số thành công Bernoulli | $\{0,\ldots,n\}$ |
| $K$, $n_k$ | số nhóm; số lần xuất hiện nhóm $k$ | số nguyên dương; số nguyên không âm |
| $\pi=(\pi_1,\ldots,\pi_K)$ | vector xác suất phân loại | $\pi_k\ge0$, $\sum_k\pi_k=1$ |
| $\mu$, $\bar x$ | trung bình mô hình; trung bình mẫu | vô hướng hoặc vector cột |
| $\sigma^2$, $\hat\sigma^2$ | phương sai mô hình; giá trị ước lượng | số dương trong mô hình Gaussian có mật độ |
| $\Sigma$, $S_n$ | hiệp phương sai mô hình; hiệp phương sai mẫu với mẫu số $n$ | ma trận đối xứng $d\times d$ |
| $I_d$, $\operatorname{tr}(A)$, $\det A$ | ma trận đơn vị, vết, định thức | ma trận; vô hướng; vô hướng |
| $u_j$, $\lambda_j$ | vector riêng đơn vị; trị riêng của $\Sigma$ | $\mathbb R^d$; số dương |
| $d_\Sigma(x,\mu)$ | khoảng cách Mahalanobis | số không âm khi $\Sigma\succ0$ |

## 11.1. Mô hình thống kê, mẫu, bộ ước lượng và hàm hợp lý

Một cảm biến kiểm tra sản phẩm có thể trả về một cờ lỗi, một trong ba trạng thái vận hành hoặc hai số đo liên tục. Để dự đoán quan sát kế tiếp, chúng ta cần biết tỉ lệ của các trạng thái hoặc vị trí và mức phân tán của các số đo. Trong Bài 10, những đại lượng này được cho trước. Ở đây, dữ liệu quan sát là căn cứ để xác định chúng.

Một cách trực quan, mỗi lựa chọn tham số tạo ra một cách phân bố xác suất trên các quan sát có thể xảy ra. Ta tìm lựa chọn làm dữ liệu đã thấy phù hợp nhất theo một tiêu chuẩn xác định. Đây là trực giác của việc ước lượng, chưa phải một định nghĩa về “phù hợp” hay một bảo đảm dự đoán.

### Mô hình và quy trình lấy mẫu

::: definition Định nghĩa 11.1 (Mô hình thống kê, mẫu và bộ ước lượng)
Một **mô hình thống kê** là một họ phân phối $\{P_\theta:\theta\in\Theta\}$ trên cùng không gian quan sát $\mathcal X$. Tham số $\theta$ chưa biết; tập $\Theta$ được chọn trước khi ước lượng.

Một **mẫu ngẫu nhiên độc lập cùng phân phối** (independent and identically distributed, i.i.d.) có kích thước $n$ gồm $X_1,\ldots,X_n$ độc lập và cùng có phân phối $P_\theta$. Dữ liệu $D=(x_1,\ldots,x_n)$ là giá trị đã quan sát của mẫu đó.

Một **thống kê** là một hàm xác định $T(X_1,\ldots,X_n)$ của mẫu, không phụ thuộc vào tham số chưa biết. Khi dùng thống kê để ước lượng $\theta$, ta gọi nó là một **bộ ước lượng**; $T(x_1,\ldots,x_n)$ là giá trị ước lượng trên dữ liệu cụ thể.
:::

Phân phối $P_\theta$ trong Định nghĩa 11.1 mô tả một quan sát; giả thiết i.i.d. xác định thêm cách ghép nhiều quan sát thành mẫu. “Cùng phân phối” chưa đủ để suy ra tích các mật độ. Hai số đo có cùng phân phối nhưng cùng chịu một nhiễu dùng chung vẫn có thể phụ thuộc.

::: example Ví dụ 11.1 (Tỉ lệ cảnh báo và sự phụ thuộc)
**Dữ liệu.** Sáu cờ cảnh báo là $D=(1,0,1,1,0,0)$. Chọn $X_i\sim\operatorname{Bernoulli}(p)$ với cùng tham số $p$.

**Thống kê.** Tổng số cảnh báo là $s=3$; trung bình mẫu là $\bar x=3/6=1/2$. Trước khi lấy mẫu, $\bar X$ là biến ngẫu nhiên. Sau khi quan sát, $\bar x=1/2$ là một số.

**Kiểm tra giả thiết.** Nếu sáu cờ đến từ sáu sản phẩm lấy độc lập trong một chế độ ổn định, mô hình i.i.d. có thể được đặt làm giả thiết. Nếu thiết bị sao chép cùng một cờ sáu lần, các cờ phụ thuộc hoàn toàn. Trong trường hợp thứ hai, xác suất của sáu số $1$ là $p$, thay vì $p^6$.

**Diễn giải.** Số lượng dòng dữ liệu và số lượng thông tin độc lập không tự động trùng nhau. Việc kiểm tra i.i.d. cần căn cứ vào quy trình lấy dữ liệu, không thể suy ra chỉ từ biểu thức trung bình mẫu.
:::

### Từ mô hình đến bài toán tối ưu

Dữ liệu đã quan sát được giữ cố định khi so sánh các tham số. Với dữ liệu liên tục, ta so sánh mật độ tại dữ liệu, vì xác suất của đúng một vector quan sát thường bằng không.

::: definition Định nghĩa 11.2 (Hàm hợp lý và ước lượng hợp lý cực đại)
Giả sử họ phân phối của toàn mẫu có hàm khối xác suất hoặc mật độ đồng thời $p_\theta(D)$ đối với cùng một độ đo tham chiếu. **Hàm hợp lý** (likelihood) là

$$
L(\theta;D)=p_\theta(D),\qquad \theta\in\Theta.
$$

Với mẫu i.i.d., dùng $p_\theta$ làm ký hiệu chung cho hàm khối xác suất hoặc mật độ của một quan sát, ta có

$$
L(\theta;D)=\prod_{i=1}^n p_\theta(x_i),
\qquad
\ell(\theta;D)=\sum_{i=1}^n\log p_\theta(x_i).
\tag{11.1}
$$

Một **ước lượng hợp lý cực đại** (maximum likelihood estimate, MLE) là một phần tử của

$$
\underset{\theta\in\Theta}{\operatorname{argmax}}\,L(\theta;D).
\tag{11.2}
$$

Tập nghiệm có thể rỗng hoặc có nhiều phần tử. Chỉ dùng ký hiệu $\hat\theta_{\mathrm{MLE}}$ như một nghiệm xác định khi đã kiểm tra tính tồn tại và lựa chọn nghiệm.
:::

Định nghĩa 11.2 bổ sung tiêu chuẩn lựa chọn bộ ước lượng vào Định nghĩa 11.1. Hàm khối xác suất hoặc mật độ là hàm theo dữ liệu khi tham số cố định; hàm hợp lý là hàm theo tham số khi dữ liệu cố định. Hai cách nhìn có thể dùng cùng công thức, nhưng các biến được giữ cố định khác nhau.

Hàm hợp lý không phải phân phối xác suất trên tham số và không cần có tích phân theo tham số bằng $1$. Trong tiếp cận Bayes, ta còn cần một phân phối tiên nghiệm $p(\theta)$ để có hậu nghiệm $p(\theta\mid D)\propto L(\theta;D)p(\theta)$. Việc chỉ chuẩn hóa $L$ theo tham số ngầm lựa chọn một tiên nghiệm và có thể không cho một phân phối chuẩn hóa được; MLE không thực hiện phép cập nhật Bayes đó.

Tính đơn điệu của log chuyển tích trong (11.1) thành tổng. Kết quả tiếp theo cho phép nhận ra một hàm mất mát từ mô hình xác suất; cơ sở là Murphy (2022), §4.2–4.3.

::: proposition Mệnh đề 11.3 (Từ hàm hợp lý đến mất mát thực nghiệm)
**Giả thiết.** Mẫu tuân theo mô hình i.i.d. trong Định nghĩa 11.2. Quy ước $\log0=-\infty$.

**Kết luận.** Các tập nghiệm sau trùng nhau:

$$
\underset{\theta\in\Theta}{\operatorname{argmax}}\,L(\theta;D)
=
\underset{\theta\in\Theta}{\operatorname{argmax}}\,\ell(\theta;D)
=
\underset{\theta\in\Theta}{\operatorname{argmin}}\,\hat R_n(\theta),
\qquad
\hat R_n(\theta)=-\frac1n\sum_{i=1}^n\log p_\theta(x_i).
\tag{11.3}
$$

**Điều kiện áp dụng.** Hàm hợp lý được xác định từ phân phối đồng thời đúng với giả thiết lấy mẫu. Phân tích thành tổng của các mất mát một quan sát dùng giả thiết độc lập.

**Phạm vi.** Đây là tương đương của các bài toán tối ưu trên dữ liệu đã thấy, không phải kết luận về sai số trên dữ liệu mới.
:::

::: proof Chứng minh Mệnh đề 11.3
Hàm log tăng chặt trên $(0,\infty)$ và được mở rộng bằng $\log0=-\infty$, nên bảo toàn thứ tự các giá trị hợp lý. Nhân với số âm $-1/n$ đổi cực đại thành cực tiểu. Thay công thức (11.1) vào cho (11.3). $\square$
:::

Trong học máy, tham số phân phối trở thành biến tối ưu và âm log của mật độ hoặc xác suất trở thành mất mát. Nếu mô hình nhiễu thay đổi, biểu thức mất mát cũng có thể thay đổi. Mệnh đề 11.3 chưa nói lớp mô hình chứa phân phối thật hay có đủ dữ liệu để học tốt; các câu hỏi đó được tiếp tục trong Bài 12.

::: exercise Bài tập 11.1 (Củng cố: mẫu và hàm hợp lý)
Cho $X_1=X_2=Z$ với $Z\sim\operatorname{Bernoulli}(p)$. Viết xác suất đồng thời của dữ liệu $(1,1)$, so sánh với biểu thức i.i.d. và giải thích vì sao hai biến cùng phân phối chưa đủ để dùng (11.1).
:::

::: hint Gợi ý Bài tập 11.1
Biến cố $\{X_1=1,X_2=1\}$ trùng với $\{Z=1\}$.
:::

::: solution Lời giải Bài tập 11.1
Ta có $L(p;(1,1))=p$. Nếu giả thiết độc lập được dùng, biểu thức nhận được là $p^2$, khác $p$ khi $0<p<1$. Hai biến đều có phân phối Bernoulli$(p)$, nhưng biết $X_1$ xác định hoàn toàn $X_2$; bởi vậy phân phối đồng thời không phân tích thành tích hai phân phối biên.
:::

Định nghĩa 11.1 xác định đối tượng cần ước lượng và cách lấy mẫu; Định nghĩa 11.2 biến dữ liệu thành hàm theo tham số. Mệnh đề 11.3 cho một bài toán tối ưu tương đương. Với mô hình Bernoulli, bài toán này chỉ còn một biến $p$ trên đoạn đóng $[0,1]$, đủ để khảo sát cả điểm dừng và nghiệm biên.

## 11.2. Hợp lý cực đại cho mô hình Bernoulli

Một thiết bị có thể gắn cờ lỗi cho mỗi sản phẩm. Nếu ghi nhận $9$ lần gắn cờ trong $12$ sản phẩm, ta cần ước lượng xác suất gắn cờ trong cùng chế độ vận hành. Tỉ lệ $9/12$ là một ứng viên; chúng ta cần chứng minh rằng tiêu chuẩn (11.2) thực sự dẫn đến tỉ lệ đó, và xác định điều gì xảy ra nếu mẫu không có cờ nào.

Một cách trực quan, tăng $p$ làm các số $1$ có hợp lý lớn hơn nhưng làm các số $0$ có hợp lý nhỏ hơn. Nghiệm cân bằng hai tác động khi cả hai kết quả đã xuất hiện. Trực giác này cần được thay bằng phép tối ưu trên toàn miền, vì trường hợp toàn số $0$ không có điểm dừng bên trong.

### Hàm hợp lý và nghiệm

Giả sử $X_i$ độc lập cùng có phân phối Bernoulli$(p)$, với $p\in[0,1]$. Đặt $s=\sum_i x_i$. Công thức hàm khối xác suất Bernoulli và (11.1) cho

$$
L(p;D)=p^s(1-p)^{n-s},
\qquad
\ell(p;D)=s\log p+(n-s)\log(1-p).
\tag{11.4}
$$

Các giá trị biên được đọc trực tiếp từ xác suất của dữ liệu. Khi viết log, ta dùng quy ước $0\log0=0$ cho số hạng có hệ số bằng $0$. Hàm hợp lý của chuỗi có thứ tự không có hệ số nhị thức; nếu chỉ quan sát tổng $s$, hệ số $\binom ns$ xuất hiện nhưng không phụ thuộc $p$ và không đổi nghiệm.

Từ Mệnh đề 11.3, ta chỉ cần cực đại hóa (11.4). Định lý sau dựa trên Murphy (2022), §4.2, phần ước lượng Bernoulli, §4.2.3.

::: theorem Định lý 11.4 (Ước lượng Bernoulli, kể cả biên)
**Giả thiết.** $n\ge1$, $x_i\in\{0,1\}$ là dữ liệu của mô hình i.i.d. Bernoulli$(p)$ với không gian tham số $[0,1]$.

**Kết luận.** Hàm hợp lý có nghiệm cực đại duy nhất

$$
\hat p_{\mathrm{MLE}}=\frac sn=\bar x.
\tag{11.5}
$$

**Điều kiện áp dụng.** Hai giá trị $p=0$ và $p=1$ thuộc không gian tham số. Khi $0<s<n$, nghiệm nằm trong $(0,1)$.

**Phạm vi.** Kết quả là nghiệm trên mẫu hữu hạn; $\hat p=0$ không chứng minh xác suất thật bằng $0$.
:::

::: proof Chứng minh Định lý 11.4
**Bước 1 (mẫu có cả hai giá trị).** Với $0<s<n$ và $0<p<1$, ta có

$$
\ell'(p)=\frac sp-\frac{n-s}{1-p}
=\frac{s-np}{p(1-p)}.
$$

Điều kiện $\ell'(p)=0$ cho $p=s/n$. Hơn nữa,

$$
\ell''(p)=-\frac{s}{p^2}-\frac{n-s}{(1-p)^2}<0.
$$

Vì vậy $\ell$ lõm chặt trên $(0,1)$ và điểm dừng là cực đại duy nhất bên trong. Ở cả hai biên, $L=0$ trong khi $L(s/n)>0$, nên đây cũng là cực đại trên $[0,1]$.

**Bước 2 (không có thành công).** Nếu $s=0$, hàm hợp lý là $(1-p)^n$, giảm chặt trên $[0,1]$. Nghiệm duy nhất là $\hat p=0$.

**Bước 3 (tất cả đều thành công).** Nếu $s=n$, hàm hợp lý là $p^n$, tăng chặt trên $[0,1]$. Nghiệm duy nhất là $\hat p=1$. Ba trường hợp đều cho (11.5). $\square$
:::

Trong học máy, Định lý 11.4 giải thích cách học xác suất của một nhãn nhị phân khi chưa dùng đặc trưng đầu vào. Âm log-hợp lý trong (11.4) cũng là tổng mất mát entropy chéo nhị phân khi mọi quan sát dùng chung một xác suất $p$. Bài 12 sẽ cho xác suất này phụ thuộc vào đặc trưng; phép suy ra mất mát vẫn dùng Mệnh đề 11.3.

::: example Ví dụ 11.2 (Học tỉ lệ gắn cờ)
**Dữ liệu và mô hình.** Có $9$ cờ trong $12$ sản phẩm; giả thiết i.i.d. Bernoulli$(p)$ được đặt cho các cờ trong một chế độ ổn định.

**Tính.** Từ Định lý 11.4, $\hat p=3/4$. So sánh với $p=1/2$ bằng tỉ số:

$$
\frac{L(3/4;D)}{L(1/2;D)}
=\frac{(3/4)^9(1/4)^3}{(1/2)^{12}}
=\frac{3^9}{2^{12}}
=\frac{19683}{4096}\approx4.805.
$$

**Kiểm tra.** Với $s=9$, dấu của $\ell'$ dương khi $p<3/4$ và âm khi $p>3/4$. Tỉ số lớn hơn $1$ phù hợp với cực đại tại $3/4$.

**Diễn giải.** Dữ liệu có hợp lý lớn hơn khoảng $4.805$ lần dưới $p=3/4$ so với $p=1/2$. Đây không phải xác suất hậu nghiệm của hai giả thuyết; muốn tính xác suất đó còn phải chỉ định tiên nghiệm và không gian giả thuyết.
:::

::: example Ví dụ 11.3 (Bảy thành công trong mười phép thử, điều chỉnh từ nguồn khởi đầu)
**Dữ liệu.** Lấy mẫu có hoàn lại mười lần từ một túi bóng chưa biết thành phần. Ghi $1$ nếu bóng đỏ và $0$ nếu không đỏ; chuỗi quan sát là $(1,0,1,1,0,1,1,0,1,1)$. Giả thiết các lần rút độc lập và xác suất bóng đỏ không đổi.

**Ước lượng.** Có $s=7$, $n=10$, nên Định lý 11.4 cho $\hat p=7/10$. Ta có $L(1/2)=2^{-10}$ và $L(7/10)=(7/10)^7(3/10)^3$. Vì thế

$$
\frac{L(7/10)}{L(1/2)}
=2^{10}(7/10)^7(3/10)^3\approx2.277>1.
$$

**Kiểm tra và giới hạn.** Đạo hàm log-hợp lý bằng $0$ tại $7/10$, đạo hàm bậc hai âm. Dưới mô hình đã khớp, xác suất đỏ của lần rút mới là $0.7$; đây là dự đoán thế tham số, không phải chứng minh tỉ lệ thật bằng $0.7$. Nếu rút không hoàn lại từ túi hữu hạn, mô hình i.i.d. Bernoulli thường không còn phù hợp.
:::

::: remark Nhận xét 11.5 (Miền mở và xác suất bằng không)
Nếu yêu cầu $p\in(0,1)$, mẫu toàn số $0$ chỉ cho $\sup L=1$ khi $p\downarrow0$, không cho MLE thuộc miền. Vì vậy miền tham số là một phần của bài toán, không thể bỏ qua khi viết nghiệm.

Với $n$ hữu hạn và $0<p<1$, xác suất quan sát toàn số $0$ bằng $(1-p)^n>0$. Nghiệm $\hat p=0$ có thể xuất hiện dù xác suất thật dương. Khi dùng nghiệm đó để dự đoán, mọi số $1$ mới nhận xác suất $0$; nhu cầu làm trơn có thể dẫn tới một mô hình Bayes hoặc chính quy hóa khác.
:::

### Mở rộng: thêm thông tin tiên nghiệm

Giả sử $p$ có phân phối tiên nghiệm Beta$(a,b)$ với $a,b>0$, có mật độ tỉ lệ với $p^{a-1}(1-p)^{b-1}$. Nhân với (11.4), ta được hậu nghiệm Beta$(a+s,b+n-s)$. Trung bình hậu nghiệm là

$$
\mathbb E[p\mid D]=\frac{a+s}{a+b+n}.
\tag{11.6}
$$

Với tiên nghiệm đều $a=b=1$ và mẫu toàn số $0$, trung bình hậu nghiệm là $1/(n+2)>0$. Công thức này là một bộ ước lượng khác MLE, thu được khi bổ sung tiên nghiệm và chọn trung bình hậu nghiệm. Nó không phải công thức sửa tự động cho (11.5). Cơ sở đọc thêm là Murphy (2022), §4.6.2, phần mô hình Beta–nhị thức trong thống kê Bayes; không cần kiến thức về Beta cho các bài cốt lõi.

::: exercise Bài tập 11.2 (Củng cố: nghiệm biên và dự đoán)
Có năm quan sát Bernoulli đều bằng $0$. Tìm MLE trên $[0,1]$ và trên $(0,1)$. Tính xác suất của mẫu này nếu tham số thật là $p=1/5$. Giải thích vì sao MLE bằng $0$ chưa xác định được rằng không bao giờ có thành công.
:::

::: hint Gợi ý Bài tập 11.2
Dùng $L(p)=(1-p)^5$ và so sánh “đạt cực đại” với “tiến gần cận trên”.
:::

::: solution Lời giải Bài tập 11.2
Trên $[0,1]$, $\hat p=0$ và $L(0)=1$. Trên $(0,1)$, mỗi $p$ còn có thể giảm để làm $L$ lớn hơn; cận trên $1$ không đạt được, nên không tồn tại MLE. Nếu $p=1/5$, xác suất quan sát năm thất bại là $(4/5)^5=1024/3125\approx0.328$. Do đó một mẫu như vậy vẫn có thể xảy ra với xác suất thành công dương.
:::

Định lý 11.4 dùng cả đạo hàm bên trong và đánh giá trực tiếp ở biên, còn Nhận xét 11.5 chỉ ra miền tham số quyết định sự tồn tại nghiệm. Với nhiều hơn hai trạng thái, các xác suất phải cùng thỏa một ràng buộc tổng. Ta cần thay bài toán một biến bằng tối ưu trên một đơn hình xác suất.

## 11.3. Ước lượng phân loại và tối ưu có ràng buộc

Một cảm biến có ba trạng thái: bình thường, cảnh báo nhẹ và cảnh báo mạnh. Nếu chỉ ước lượng riêng từng xác suất mà không kiểm tra tổng, kết quả có thể không còn là một phân phối. Chúng ta cần một bài toán tối ưu giữ được ràng buộc chuẩn hóa.

Một cách trực quan, tổng khối lượng xác suất bằng $1$ được phân chia giữa các nhóm theo số lần xuất hiện. Tăng xác suất cho một nhóm buộc phải lấy bớt khối lượng từ các nhóm khác. Đây là trực giác của ràng buộc, chưa thay thế việc tìm nghiệm và xử lý nhóm có số đếm bằng $0$.

::: definition Định nghĩa 11.6 (Mô hình phân loại và đơn hình xác suất)
Với số nhóm $K\ge2$, một quan sát $X\in\{1,\ldots,K\}$ có phân phối phân loại nếu

$$
\mathbb P_\pi(X=k)=\pi_k,
\qquad
\pi\in\Delta_{K-1}
=\left\{\pi\in\mathbb R^K:\pi_k\ge0,\ \sum_{k=1}^K\pi_k=1\right\}.
$$

Với mẫu i.i.d. gồm $n\ge1$ quan sát, đặt $n_k=\sum_{i=1}^n\mathbf1_{\{x_i=k\}}$. Khi đó $\sum_k n_k=n$ và

$$
L(\pi;D)=\prod_{k=1}^K\pi_k^{n_k},
\qquad
\ell(\pi;D)=\sum_{k:n_k>0}n_k\log\pi_k.
\tag{11.7}
$$
:::

Mô hình trong Định nghĩa 11.6 tổng quát hóa Bernoulli: với $K=2$, có thể đặt $\pi=(1-p,p)$ sau khi đổi nhãn $0,1$ thành $1,2$. Ràng buộc $\pi_1+\pi_2=1$ khiến hai tọa độ chỉ còn một bậc tự do. Khi $K$ lớn hơn, nhân tử Lagrange xử lý cùng loại phụ thuộc giữa các tọa độ.

Công thức (11.7) và điều kiện chuẩn hóa đủ để chứng minh kết quả sau. Nguồn cho nguyên lý ước lượng là Murphy (2022), §4.2.4; ràng buộc của mô hình phân loại được đọc cùng §2.5.

::: theorem Định lý 11.7 (Ước lượng phân loại)
**Giả thiết.** Dữ liệu tuân theo mô hình i.i.d. của Định nghĩa 11.6; không gian tham số là đơn hình đóng $\Delta_{K-1}$.

**Kết luận.** Nghiệm hợp lý cực đại duy nhất là

$$
\hat\pi_k=\frac{n_k}{n},\qquad k=1,\ldots,K.
\tag{11.8}
$$

**Điều kiện áp dụng.** Được phép có $\pi_k=0$. Nhóm chưa được quan sát nhận $\hat\pi_k=0$.

**Phạm vi.** Tính duy nhất là trên đơn hình đóng; nếu mọi tọa độ bị yêu cầu dương mà một số $n_k=0$, cận trên có thể không đạt được.
:::

::: proof Chứng minh Định lý 11.7
**Bước 1 (mọi nhóm đều xuất hiện).** Khi mọi $n_k>0$, nghiệm có hợp lý dương phải có mọi $\pi_k>0$. Lập hàm Lagrange

$$
\mathcal L(\pi,\lambda)
=\sum_{k=1}^K n_k\log\pi_k
+\lambda\left(1-\sum_{k=1}^K\pi_k\right).
$$

Điều kiện dừng cho $n_k/\pi_k=\lambda$. Lấy tổng $n_k=\lambda\pi_k$ theo $k$ và dùng ràng buộc, ta được $\lambda=n$, rồi $\pi_k=n_k/n$.

**Bước 2 (kiểm tra cực đại).** Hessian theo $\pi$ là ma trận chéo có các phần tử $-n_k/\pi_k^2<0$. Log-hợp lý lõm chặt trong miền dương, nên nghiệm khả thi ở Bước 1 là cực đại duy nhất ở đó. Mọi điểm biên làm ít nhất một xác suất của nhóm đã thấy bằng $0$, nên có hợp lý bằng $0$ và không thể tốt hơn nghiệm vừa tìm.

**Bước 3 (có nhóm chưa xuất hiện).** Gọi $A=\{k:n_k>0\}$ và đặt $m=\sum_{k\in A}\pi_k$. Một nghiệm có hợp lý dương phải có $m>0$. Nếu $m<1$, chuẩn hóa các tọa độ đã thấy bằng $\pi'_k=\pi_k/m$ trên $A$ và đặt các tọa độ ngoài $A$ bằng $0$. Ta có

$$
L(\pi';D)=m^{-n}L(\pi;D)>L(\pi;D).
$$

Vì thế cực đại phải có $m=1$ và mọi tọa độ ngoài $A$ bằng $0$. Nếu $|A|\ge2$, áp dụng hai bước đầu trên đơn hình của các nhóm trong $A$ cho (11.8). Nếu $|A|=1$, nhóm duy nhất đã thấy phải nhận xác suất $1$, cũng đúng với (11.8). $\square$
:::

Trong học máy, (11.8) học một phân phối trên nhãn hoặc trạng thái từ các số đếm. Mất mát tương ứng là $-\sum_k n_k\log\pi_k$, có cùng dạng entropy chéo nhiều lớp sau khi chia cho $n$. Nếu xác suất được biểu diễn bằng một mô hình có tham số chung cho nhiều đầu vào, các tọa độ có thể không còn được tối ưu độc lập; công thức tần suất chỉ áp dụng cho mô hình phân loại không ràng buộc thêm đang xét.

::: example Ví dụ 11.4 (Ba chế độ cảm biến)
**Dữ liệu.** Trong $20$ sản phẩm được lấy độc lập, số lần ghi nhận ba trạng thái là $(3,5,12)$. Giả thiết xác suất trạng thái không đổi giữa các sản phẩm.

**Tính.** Định lý 11.7 cho

$$
\hat\pi=\left(\frac3{20},\frac5{20},\frac{12}{20}\right)
=(0.15,0.25,0.60).
$$

Theo mô hình đã khớp, xác suất hai quan sát mới độc lập đều thuộc nhóm $3$ là $0.6^2=0.36$.

**Kiểm tra.** Mọi tọa độ đều không âm và tổng là $1$. Các phương trình dừng cũng đúng: $3/0.15=5/0.25=12/0.6=20$.

**Diễn giải.** Giá trị $0.36$ là dự đoán thế tham số ước lượng vào mô hình. Nó chưa tính độ bất định của $\hat\pi$ do chỉ có $20$ quan sát, và phép bình phương dùng thêm giả thiết độc lập cho hai quan sát mới.
:::

::: example Ví dụ 11.5 (Ba nhãn trong mười bản ghi, điều chỉnh từ nguồn khởi đầu)
**Dữ liệu.** Mười bản ghi độc lập có $2$ nhãn đỏ, $3$ nhãn xanh dương và $5$ nhãn xanh lá. Mỗi bản ghi thuộc đúng một nhóm, với xác suất nhóm không đổi.

**Ước lượng và kiểm tra.** Định lý 11.7 cho $\hat\pi=(0.2,0.3,0.5)$. Các xác suất không âm, tổng bằng $1$, và $2/0.2=3/0.3=5/0.5=10$, đúng với điều kiện Lagrange.

**Diễn giải.** Nhãn xanh lá có xác suất dự đoán lớn nhất dưới mô hình đã khớp. Ba xác suất này cùng mô tả một kết quả phân loại; chúng chịu ràng buộc tổng bằng $1$, khác với ba tham số Bernoulli tự do mô tả ba chỉ báo có thể đồng thời bằng $1$.
:::

::: remark Nhận xét 11.8 (Không quan sát được một nhóm)
Với số đếm $(3,0,7)$, Định lý 11.7 cho $(0.3,0,0.7)$. Không được viết điều kiện $n_2/\pi_2=\lambda$ tại $\pi_2=0$ như một phép chia thông thường; Bước 3 của chứng minh xử lý mặt biên đó.

Nếu nhóm thứ hai thực sự có xác suất dương nhỏ, việc nó vắng mặt trong một mẫu hữu hạn vẫn có xác suất dương. Làm trơn số đếm bằng tiên nghiệm Dirichlet là một mở rộng Bayes; đó là thay đổi phương pháp ước lượng, cần nêu thêm giả thiết.
:::

### Mở rộng: diễn giải bằng độ phân kỳ Kullback–Leibler

Với hai phân phối rời rạc $q$ và $\pi$ trên cùng $K$ nhóm, đặt

$$
\operatorname{KL}(q\Vert\pi)
=\sum_{k:q_k>0}q_k\log\frac{q_k}{\pi_k},
$$

và cho giá trị $+\infty$ nếu $q_k>0$ mà $\pi_k=0$. Khi mọi $\pi_k$ trên giá của $q$ đều dương, bất đẳng thức $\log t\le t-1$ cho

$$
\begin{aligned}
-\operatorname{KL}(q\Vert\pi)
&=\sum_{k:q_k>0}q_k\log\frac{\pi_k}{q_k}\\
&\le\sum_{k:q_k>0}(\pi_k-q_k)\\
&\le0.
\end{aligned}
$$

Do đó $\operatorname{KL}(q\Vert\pi)\ge0$, với đẳng thức khi và chỉ khi $\pi=q$. Để có đẳng thức, từng tỉ số trên giá phải bằng $1$, đồng thời không còn khối lượng ngoài giá.

Áp dụng cho phân phối tần suất $q_k=n_k/n$, ta được

$$
-\frac1n\ell(\pi;D)
=-\sum_kq_k\log\pi_k
=H(q)+\operatorname{KL}(q\Vert\pi),
\qquad H(q)=-\sum_{k:q_k>0}q_k\log q_k.
\tag{11.9}
$$

Vì $H(q)$ cố định theo $\pi$, (11.9) cho một cách chứng minh khác của Định lý 11.7. Cơ sở là Murphy (2022), §6.2. Ở đây cả hai phân phối đều rời rạc trên cùng tập hữu hạn. Với dữ liệu liên tục, phân phối thực nghiệm gồm các khối lượng tại điểm còn Gaussian có mật độ theo độ đo Lebesgue; không được thay trực tiếp chúng vào (11.9) để tuyên bố một độ phân kỳ hữu hạn.

::: exercise Bài tập 11.3 (Củng cố: ràng buộc và nhóm vắng mặt)
Một mẫu có số đếm $(2,0,3)$. Tính MLE. So sánh hợp lý tại MLE với $\pi=(0.3,0.1,0.6)$ bằng tỉ số và xác định ràng buộc nào buộc nhóm vắng mặt nhận xác suất bằng $0$ ở cực đại.
:::

::: hint Gợi ý Bài tập 11.3
Chuẩn hóa hai tọa độ đã thấy; không dùng phép chia $0/0$ trong điều kiện Lagrange.
:::

::: solution Lời giải Bài tập 11.3
MLE là $(0.4,0,0.6)$. Tỉ số hợp lý là

$$
\frac{0.4^2\,0.6^3}{0.3^2\,0.6^3}=\frac{16}{9}>1.
$$

Điều kiện tổng xác suất bằng $1$ khiến việc dành khối lượng cho nhóm chưa thấy làm giảm tổng khối lượng dành cho các nhóm đã thấy. Chứng minh ở Bước 3 của Định lý 11.7 cho thấy cực đại phải đặt toàn bộ khối lượng lên hai nhóm đã thấy; giải bài toán trên cạnh đó cho tỉ lệ $2:3$.
:::

Định nghĩa 11.6 thêm ràng buộc chuẩn hóa vào bài toán hợp lý. Định lý 11.7 dùng Lagrange trên miền trong và chuẩn hóa trên giá để xử lý biên; (11.9) diễn giải cùng nghiệm bằng độ phân kỳ giữa các phân phối rời rạc. Với số đo liên tục, tham số cần học sẽ mô tả vị trí và độ phân tán thay vì số đếm của các nhóm.

## 11.4. Gaussian một chiều: trung bình và phương sai

Một cảm biến nhiệt độ trả về các số thực thay vì các trạng thái hữu hạn. Trung bình mô tả vị trí điển hình, còn phương sai mô tả mức dao động. Nếu giả thiết nhiễu Gaussian được đặt cho các lần đo độc lập, ta có thể dùng cùng nguyên lý hợp lý cực đại để học cả hai đại lượng.

Một cách trực quan, dịch trung bình về gần dữ liệu làm giảm tổng bình phương sai lệch; giảm phương sai làm mật độ tập trung hơn nhưng cũng tăng hình phạt cho các điểm lệch tâm. Trực giác này chỉ gợi ý một sự cân bằng. Phương sai còn xuất hiện trong hệ số chuẩn hóa, nên không thể chỉ tối thiểu hóa phần mũ của mật độ khi học phương sai.

### Mật độ và hàm mục tiêu

Giả sử $X_i$ độc lập cùng có phân phối $\mathcal N(\mu,v)$, trong đó $v=\sigma^2>0$. Ta dùng biến $v$ để đạo hàm trực tiếp theo phương sai, không nhầm với độ lệch chuẩn. Với $\mu\in\mathbb R$, mật độ và log-hợp lý là

$$
f_{\mu,v}(x)=\frac1{\sqrt{2\pi v}}
\exp\left[-\frac{(x-\mu)^2}{2v}\right],
$$

$$
\ell(\mu,v;D)
=-\frac n2\log(2\pi)-\frac n2\log v
-\frac1{2v}\sum_{i=1}^n(x_i-\mu)^2.
\tag{11.10}
$$

Đẳng thức tách tổng bình phương sẽ chứng minh tính tối ưu toàn cục của trung bình, thay vì chỉ kiểm tra điểm dừng. Kết quả ước lượng và phân biệt mẫu số dựa trên Murphy (2022), §4.2.5.

::: theorem Định lý 11.9 (Ước lượng Gaussian một chiều)
**Giả thiết.** $n\ge1$, dữ liệu thuộc mô hình i.i.d. $\mathcal N(\mu,v)$ với $\mu\in\mathbb R$, $v>0$. Đặt

$$
\bar x=\frac1n\sum_{i=1}^nx_i,
\qquad Q=\sum_{i=1}^n(x_i-\bar x)^2.
$$

**Kết luận.** Nếu $Q>0$, MLE tồn tại duy nhất và bằng

$$
\hat\mu=\bar x,\qquad
\hat\sigma^2_{\mathrm{MLE}}=\frac Qn.
\tag{11.11}
$$

**Điều kiện áp dụng.** $Q>0$ tương đương dữ liệu không hoàn toàn bằng nhau; điều kiện này bảo đảm phương sai ước lượng thuộc miền $v>0$.

**Phạm vi.** Nếu $Q=0$, không tồn tại MLE trong họ Gaussian có mật độ với $v>0$; hợp lý không bị chặn khi $v\downarrow0$ và $\mu=\bar x$.
:::

::: proof Chứng minh Định lý 11.9
**Bước 1 (tối ưu trung bình với phương sai cố định).** Vì $\sum_i(x_i-\bar x)=0$, khai triển bình phương cho

$$
\sum_{i=1}^n(x_i-\mu)^2
=Q+n(\mu-\bar x)^2.
\tag{11.12}
$$

Với mọi $v>0$, log-hợp lý (11.10) lớn nhất duy nhất tại $\mu=\bar x$.

**Bước 2 (tối ưu phương sai).** Sau khi thế $\mu=\bar x$, phần phụ thuộc $v$ là $g(v)=-(n/2)\log v-Q/(2v)$. Nếu $Q>0$,

$$
g'(v)=\frac{Q-nv}{2v^2}.
$$

Hàm $g$ tăng khi $v<Q/n$, giảm khi $v>Q/n$, nên có cực đại toàn cục duy nhất tại $v=Q/n$. Kết hợp Bước 1 cho (11.11).

**Bước 3 (mẫu suy biến).** Nếu $Q=0$, mọi $x_i=\bar x$. Tại $\mu=\bar x$, ta có $\ell=-(n/2)\log(2\pi v)\to+\infty$ khi $v\downarrow0$. Giá trị $v=0$ không thuộc miền và không cho mật độ Gaussian thông thường, nên không có MLE. $\square$
:::

Trong học máy, khi phương sai $v$ được cố định, tối thiểu hóa âm (11.10) theo $\mu$ tương đương tối thiểu hóa tổng bình phương sai số. Đó là nguồn xác suất của mất mát bình phương trong bài toán vị trí này. Nếu học cả $v$, phải giữ số hạng $\log v$; bỏ nó sẽ cho một bài toán khác và không khôi phục công thức phương sai MLE.

::: example Ví dụ 11.6 (Bốn số đo Gaussian)
**Dữ liệu và mô hình.** Giả sử $D=(1,1,2,4)$ là bốn số đo độc lập cùng có phân phối $\mathcal N(\mu,\sigma^2)$.

**Tính.** Ta có $\bar x=8/4=2$. Các sai lệch là $(-1,-1,0,2)$, nên

$$
Q=1+1+0+4=6,
\qquad
\hat\sigma^2_{\mathrm{MLE}}=\frac64=\frac32.
$$

Mật độ đã khớp là

$$
\hat f(x)=\frac1{\sqrt{3\pi}}
\exp\left[-\frac{(x-2)^2}{3}\right].
$$

**Kiểm tra.** $Q>0$ nên Định lý 11.9 áp dụng. Tổng sai lệch bằng $0$, và $Q-n\hat v=6-4(3/2)=0$, đúng với hai điều kiện tối ưu.

**Diễn giải.** Trung bình ước lượng là $2$, phương sai ước lượng là $1.5$, còn độ lệch chuẩn là $\sqrt{1.5}$. Ba đại lượng này khác nhau về ý nghĩa và đơn vị đo.
:::

### Hai mẫu số trong ước lượng phương sai

Ước lượng bằng $Q/n$ tối ưu hợp lý trên dữ liệu đã thấy. Một tiêu chuẩn khác là tính không chệch: trung bình của bộ ước lượng qua các lần lấy mẫu phải bằng tham số thật. Ta cần phân biệt giá trị $\hat v$ của một mẫu với kỳ vọng của biến ngẫu nhiên $\hat V$ trên mọi mẫu.

::: definition Định nghĩa 11.10 (Độ chệch và tính không chệch)
Với tham số vô hướng $\theta$ và bộ ước lượng $T$ có kỳ vọng hữu hạn, **độ chệch** là

$$
\operatorname{Bias}_\theta(T)=\mathbb E_\theta[T]-\theta.
$$

Bộ ước lượng **không chệch** nếu $\mathbb E_\theta[T]=\theta$ với mọi tham số thuộc mô hình. Với vector hoặc ma trận, đẳng thức kỳ vọng được hiểu theo từng phần tử.
:::

Định nghĩa 11.10 đánh giá hành vi qua nhiều mẫu ngẫu nhiên, khác với tiêu chuẩn cực đại hợp lý trong Định nghĩa 11.2 trên một mẫu cố định. Không chệch cũng chưa bảo đảm một giá trị ước lượng luôn gần tham số thật; bộ ước lượng còn có độ biến động.

Mệnh đề sau dùng (11.12) dưới dạng biến ngẫu nhiên và tính tuyến tính của kỳ vọng. Gaussian không cần thiết cho kết luận về độ chệch; chỉ cần các mômen và giả thiết i.i.d. Nguồn đối chiếu là Murphy (2022), §4.2, phần ước lượng Gaussian và đánh giá bộ ước lượng.

::: proposition Mệnh đề 11.11 (Hiệu chỉnh phương sai mẫu)
**Giả thiết.** $X_1,\ldots,X_n$ i.i.d. với trung bình $\mu$ và phương sai hữu hạn $\sigma^2$, $n\ge2$. Đặt $\bar X=n^{-1}\sum_iX_i$ và $Q_X=\sum_i(X_i-\bar X)^2$.

**Kết luận.**

$$
\mathbb E[Q_X]=(n-1)\sigma^2,
\qquad
\mathbb E\left[\frac{Q_X}{n}\right]=\frac{n-1}{n}\sigma^2,
\qquad
s^2=\frac{Q_X}{n-1}.
\tag{11.13}
$$

$s^2$ là bộ ước lượng không chệch của $\sigma^2$.

**Điều kiện áp dụng.** Các quan sát độc lập, cùng có trung bình và phương sai nêu trên. Trung bình được ước lượng bằng chính mẫu đang dùng.

**Phạm vi.** Hiệu chỉnh $n-1$ cho tính không chệch, không cho MLE khi trung bình chưa biết. Nếu trung bình thật đã biết, công thức cần xét khác.
:::

::: proof Chứng minh Mệnh đề 11.11
**Bước 1 (tách phần do ước lượng trung bình).** Đẳng thức (11.12) cho

$$
Q_X=\sum_{i=1}^n(X_i-\mu)^2-n(\bar X-\mu)^2.
$$

**Bước 2 (lấy kỳ vọng).** Ta có $\mathbb E[\bar X]=\mu$ và, do độc lập, $\operatorname{Var}(\bar X)=\sigma^2/n$. Vì thế

$$
\begin{aligned}
\mathbb E[Q_X]
&=n\sigma^2-n\,\mathbb E[(\bar X-\mu)^2]\\
&=n\sigma^2-n\frac{\sigma^2}{n}\\
&=(n-1)\sigma^2.
\end{aligned}
$$

Chia lần lượt cho $n$ và $n-1$ cho hai kết luận còn lại. $\square$
:::

Trong học máy, cùng một dữ liệu có thể cho hai đại lượng phân tán hợp lệ nhưng phục vụ hai mục tiêu khác nhau. Nếu cần nghiệm của mô hình Gaussian MLE, mẫu số là $n$. Nếu cần một bộ ước lượng phương sai không chệch dưới giả thiết của Mệnh đề 11.11, mẫu số là $n-1$. Việc thay mẫu số phải đi cùng thay đổi tiêu chuẩn, thay vì xem một công thức là phép sửa lỗi đại số của công thức kia.

Với dữ liệu Ví dụ 11.6, phương sai không chệch có giá trị $s^2=6/3=2$. Cả $1.5$ và $2$ đều tính từ cùng $Q=6$; sự khác nhau đến từ mục tiêu ước lượng. Nếu $\mu$ được biết trước bằng $\mu_0$, đại lượng $n^{-1}\sum_i(X_i-\mu_0)^2$ vừa không chệch cho $\sigma^2$ vừa là MLE Gaussian theo phương sai khi tổng bình phương dương.

::: example Ví dụ 11.7 (Năm số đo, điều chỉnh từ nguồn khởi đầu)
**Dữ liệu.** Giả sử năm số đo $(0,1,2,3,4)$ độc lập cùng có phân phối Gaussian, với trung bình và phương sai chưa biết.

**Tính và kiểm tra.** Trung bình mẫu bằng $2$. Tổng bình phương sai lệch bằng $4+1+0+1+4=10>0$. Do đó $\hat\mu=2$, $\hat\sigma^2_{\mathrm{MLE}}=10/5=2$, còn phương sai không chệch có giá trị $s^2=10/4=2.5$. Tổng sai lệch bằng $0$ và phương sai MLE dương, đúng với điều kiện của Định lý 11.9.

**Mô hình đã khớp.** Mật độ là $\hat f(x)=(4\pi)^{-1/2}\exp[-(x-2)^2/4]$. So với mô hình $\mathcal N(2,1)$, nó có cùng tâm nhưng độ lệch chuẩn lớn hơn, bằng $\sqrt2$ thay vì $1$. Mỗi mật độ vẫn có tích phân bằng $1$; độ cao của mật độ tại tâm không tự xác định độ phù hợp trên toàn mẫu.
:::

::: exercise Bài tập 11.4 (Củng cố: MLE, không chệch và suy biến)
Với dữ liệu $(0,2,4)$, tính trung bình, phương sai MLE và phương sai không chệch. Với dữ liệu $(2,2,2)$, giải thích vì sao việc ghi “phương sai MLE bằng $0$” cần được sửa nếu mô hình chỉ cho phép Gaussian có mật độ.
:::

::: hint Gợi ý Bài tập 11.4
Tính $Q$ rồi dùng Định lý 11.9 và Mệnh đề 11.11; kiểm tra miền $v>0$.
:::

::: solution Lời giải Bài tập 11.4
Với $(0,2,4)$, $\bar x=2$ và $Q=4+0+4=8$. Phương sai MLE bằng $8/3$; phương sai không chệch có giá trị $8/2=4$.

Với $(2,2,2)$, $Q=0$. Các mật độ tại ba điểm cùng tăng vô hạn khi $\mu=2$ và $v\downarrow0$. Do $v=0$ bị loại khỏi mô hình mật độ, không có MLE; số $0$ là giá trị hình thức của $Q/n$ trên biên, không phải một nghiệm khả thi.
:::

Định lý 11.9 nối mô hình nhiễu Gaussian với tổng bình phương và xác định đúng miền tồn tại nghiệm. Mệnh đề 11.11 dùng kỳ vọng qua các mẫu để giải thích hiệu chỉnh $n-1$. Với nhiều đặc trưng, tổng bình phương được thay bằng tổng tích ngoài; cùng ý tưởng sẽ cho ma trận hiệp phương sai và hình học của phân phối đã khớp.

## 11.5. Gaussian nhiều chiều: ước lượng và hình học

Hai cảm biến có thể cùng tăng khi nhiệt độ môi trường tăng, ngay cả khi từng cảm biến riêng lẻ vẫn hoạt động bình thường. Hai phương sai riêng không mô tả được việc các số đo cùng biến động. Chúng ta cần một ma trận ghi cả độ phân tán của từng đặc trưng lẫn hiệp phương sai giữa chúng.

Về mặt hình học, một đám mây điểm kéo dài theo đường chéo cần một mô hình cho phép hướng phân tán chính quay khỏi các trục tọa độ. Đây là trực giác về ma trận hiệp phương sai. Các trị riêng và vector riêng sẽ cho phát biểu chính xác về hướng và độ dài của đường đồng mức.

### Mô hình và điều kiện không suy biến

::: definition Định nghĩa 11.12 (Gaussian nhiều chiều và hiệp phương sai mẫu)
Với $\mu\in\mathbb R^d$ và ma trận đối xứng xác định dương $\Sigma\succ0$, phân phối Gaussian $\mathcal N_d(\mu,\Sigma)$ có mật độ

$$
f_{\mu,\Sigma}(x)
=\frac{1}{(2\pi)^{d/2}(\det\Sigma)^{1/2}}
\exp\left[-\frac12(x-\mu)^\top\Sigma^{-1}(x-\mu)\right],
\qquad x\in\mathbb R^d.
\tag{11.14}
$$

Với dữ liệu $x_1,\ldots,x_n\in\mathbb R^d$, đặt

$$
\bar x=\frac1n\sum_{i=1}^n x_i,
\qquad
S_n=\frac1n\sum_{i=1}^n(x_i-\bar x)(x_i-\bar x)^\top.
\tag{11.15}
$$

Ma trận $S_n$ là ma trận hiệp phương sai mẫu với mẫu số $n$. Nó luôn nửa xác định dương, nhưng chưa chắc xác định dương.
:::

Định nghĩa 11.12 kế thừa mật độ Gaussian của Định nghĩa 10.17 và thay phương sai vô hướng bằng ma trận. Khi $d=1$, (11.14) trở lại mật độ trong (11.10), còn $S_n=Q/n$. Khác với $\Sigma$ của mô hình, ma trận tính từ dữ liệu có thể suy biến; cần kiểm tra tính khả thi trước khi gọi nó là MLE.

Với vector $v$, từ (11.15) ta có

$$
v^\top S_nv=\frac1n\sum_{i=1}^n\bigl[v^\top(x_i-\bar x)\bigr]^2\ge0.
\tag{11.16}
$$

Do đó $S_n\succ0$ khi và chỉ khi các vector đã trừ trung bình sinh ra toàn bộ $\mathbb R^d$. Vì tổng các vector này bằng $0$, hạng của $S_n$ không vượt quá $\min(d,n-1)$. Điều kiện $n>d$ là cần, nhưng chưa đủ: nhiều điểm vẫn có thể cùng nằm trên một đường thẳng hoặc một siêu phẳng.

### Chứng minh ước lượng trung bình và hiệp phương sai

Từ (11.14), log-hợp lý của mẫu i.i.d. là

$$
\ell(\mu,\Sigma;D)
=-\frac{nd}{2}\log(2\pi)-\frac n2\log\det\Sigma
-\frac12\sum_{i=1}^n(x_i-\mu)^\top\Sigma^{-1}(x_i-\mu).
\tag{11.17}
$$

Với ma trận vuông $A$ và vector $v$, tổng các phần tử đường chéo của $Avv^\top$ bằng $\sum_j(Av)_jv_j=v^\top Av$. Bởi vậy $v^\top Av=\operatorname{tr}(Avv^\top)$. Đẳng thức này cho phép thay tổng các dạng toàn phương trong (11.17) bằng vết của một tích ma trận.

Chúng ta dùng cùng phép tách tâm như (11.12), rồi tối ưu theo ma trận nghịch đảo để kiểm tra cực đại toàn cục. Kết quả dựa trên Murphy (2022), §4.2.6, đọc cùng §3.2.1 về Gaussian nhiều chiều.

::: theorem Định lý 11.13 (Ước lượng Gaussian nhiều chiều và điều kiện tồn tại)
**Giả thiết.** $x_1,\ldots,x_n$ thuộc mô hình i.i.d. $\mathcal N_d(\mu,\Sigma)$, với $\mu\in\mathbb R^d$ và $\Sigma\succ0$. Đặt $\bar x,S_n$ theo (11.15).

**Kết luận.** Nếu $S_n\succ0$, MLE tồn tại duy nhất và bằng

$$
\hat\mu=\bar x,
\qquad
\hat\Sigma_{\mathrm{MLE}}=S_n.
\tag{11.18}
$$

Nếu $S_n$ suy biến, log-hợp lý không bị chặn trên; không có MLE trong họ Gaussian có ma trận hiệp phương sai xác định dương.

**Điều kiện áp dụng.** Mọi vector quan sát có cùng số chiều; ma trận mô hình phải khả nghịch. Công thức (11.18) là nghiệm khả thi khi và chỉ khi dữ liệu đã trừ trung bình sinh ra $\mathbb R^d$.

**Phạm vi.** Kết quả không tự áp dụng cho mô hình có ràng buộc ma trận hiệp phương sai đường chéo, đẳng hướng hoặc cho mô hình thêm chính quy hóa.
:::

::: proof Chứng minh Định lý 11.13
**Bước 1 (tối ưu trung bình).** Đặt $r_i=x_i-\bar x$. Do $\sum_i r_i=0$, các số hạng chéo triệt tiêu và

$$
\begin{aligned}
\sum_i(x_i-\mu)^\top\Sigma^{-1}(x_i-\mu)
&=\sum_i r_i^\top\Sigma^{-1}r_i
+n(\bar x-\mu)^\top\Sigma^{-1}(\bar x-\mu)\\
&=n\operatorname{tr}(\Sigma^{-1}S_n)
+n(\bar x-\mu)^\top\Sigma^{-1}(\bar x-\mu).
\end{aligned}
$$

Vì $\Sigma^{-1}\succ0$, số hạng cuối không âm và chỉ bằng $0$ khi $\mu=\bar x$. Với mỗi $\Sigma$ khả thi, trung bình tối ưu là duy nhất.

**Bước 2 (đổi biến ma trận).** Đặt $\Lambda=\Sigma^{-1}\succ0$, gọi là ma trận độ chính xác. Sau khi tối ưu trung bình và bỏ hằng số, log-hợp lý bằng

$$
\frac n2\left[\log\det\Lambda-\operatorname{tr}(\Lambda S_n)\right].
$$

Giả sử $S_n\succ0$. Từ phân rã trị riêng, tồn tại căn bậc hai đối xứng xác định dương $S_n^{1/2}$ và nghịch đảo của nó. Đặt $C=S_n^{1/2}\Lambda S_n^{1/2}\succ0$. Tính chất của định thức và vết cho

$$
\log\det\Lambda-\operatorname{tr}(\Lambda S_n)
=\log\det C-\operatorname{tr}C-\log\det S_n.
$$

**Bước 3 (cực đại toàn cục).** Gọi $c_1,\ldots,c_d>0$ là các trị riêng của $C$. Ta có

$$
\log\det C-\operatorname{tr}C
=\sum_{j=1}^d(\log c_j-c_j)\le-d,
$$

vì $\log t\le t-1$, với đẳng thức chỉ khi $t=1$. Đẳng thức xảy ra khi mọi $c_j=1$, tức $C=I_d$ do $C$ đối xứng. Suy ra $\Lambda=S_n^{-1}$, hay $\Sigma=S_n$, là nghiệm cực đại duy nhất. Kết hợp Bước 1 cho (11.18).

**Bước 4 (dữ liệu suy biến).** Nếu $S_n$ có hạng $r<d$, chọn một cơ sở riêng trực chuẩn của nó với trị riêng $a_1,\ldots,a_r>0$ và $d-r$ trị riêng bằng $0$. Trong cơ sở này, chọn $\Sigma_\varepsilon$ có các trị riêng $a_1,\ldots,a_r$ trên không gian có dữ liệu và $\varepsilon>0$ trên không gian không.

Tại $\mu=\bar x$, phần vết bằng $r$, còn

$$
\log\det\Sigma_\varepsilon
=\sum_{j=1}^r\log a_j+(d-r)\log\varepsilon\longrightarrow-\infty.
$$

Vì vậy (11.17) tiến tới $+\infty$ khi $\varepsilon\downarrow0$. Không có ma trận xác định dương nào đạt cực đại. Lập luận cũng đúng khi $r=0$, với tổng rỗng bằng $0$. $\square$
:::

Trong học máy, Định lý 11.13 học một mô hình xác suất chung cho nhiều đặc trưng. Các phần tử ngoài đường chéo cho phép mô hình giữ lại quan hệ tuyến tính giữa các số đo. Nếu số chiều lớn so với cỡ mẫu, $S_n$ có thể không khả nghịch; thêm $\varepsilon I_d$ có thể giúp tính toán, nhưng khi đó kết quả thuộc một thủ tục có chính quy hóa và không còn là nghiệm MLE không ràng buộc trong định lý.

### Ví dụ cảm biến hai chiều

::: example Ví dụ 11.8 (Tính ma trận hiệp phương sai bằng tay)
**Dữ liệu và mô hình.** Hai đặc trưng đã được đưa về đơn vị quy ước chung. Bốn phép đo là

$$
x_1=\begin{pmatrix}12\\22\end{pmatrix},\quad
x_2=\begin{pmatrix}8\\18\end{pmatrix},\quad
x_3=\begin{pmatrix}11\\19\end{pmatrix},\quad
x_4=\begin{pmatrix}9\\21\end{pmatrix}.
$$

Ta giả thiết các phép đo độc lập trong một chế độ Gaussian ổn định. Đây là giả thiết mô hình dùng cho phép tính, chưa phải kết luận có thể kiểm chứng chỉ bằng bốn điểm.

**Trừ trung bình.** Ta có $\bar x=(10,20)^\top$. Các vector sai lệch là $(2,2)^\top$, $(-2,-2)^\top$, $(1,-1)^\top$, $(-1,1)^\top$.

**Tính tích ngoài.** Hai cặp đối nhau cho

$$
\sum_i(x_i-\bar x)(x_i-\bar x)^\top
=2\begin{pmatrix}4&4\\4&4\end{pmatrix}
+2\begin{pmatrix}1&-1\\-1&1\end{pmatrix}
=\begin{pmatrix}10&6\\6&10\end{pmatrix}.
$$

Do đó

$$
S_4=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}.
\tag{11.19}
$$

**Kiểm tra khả thi.** Phần tử đầu đường chéo dương và định thức bằng $25/4-9/4=4>0$, nên $S_4\succ0$. Định lý 11.13 áp dụng: $\hat\mu=(10,20)^\top$, $\hat\Sigma=S_4$.

**Mật độ đã khớp.** Với $r=x-\hat\mu$, ta có

$$
\hat\Sigma^{-1}
=\begin{pmatrix}5/8&-3/8\\-3/8&5/8\end{pmatrix},
\qquad
\hat f(x)=\frac1{4\pi}\exp\left[-\frac12r^\top\hat\Sigma^{-1}r\right].
$$

Tại tâm, $\hat f(\hat\mu)=1/(4\pi)\approx0.0796$. Đây là một giá trị mật độ, không phải xác suất một điểm.
:::

::: example Ví dụ 11.9 (Bốn điểm hai chiều, điều chỉnh từ nguồn khởi đầu)
**Dữ liệu.** Xét bốn vector $(1,1)^\top$, $(3,3)^\top$, $(1,3)^\top$, $(3,5)^\top$, dưới giả thiết i.i.d. Gaussian hai chiều.

**Trừ trung bình và tính tích ngoài.** Trung bình bằng $(2,3)^\top$. Bốn vector sai lệch là $(-1,-2)^\top$, $(1,0)^\top$, $(-1,0)^\top$, $(1,2)^\top$. Vì vậy

$$
\sum_i(x_i-\bar x)(x_i-\bar x)^\top
=2\begin{pmatrix}1&2\\2&4\end{pmatrix}
+2\begin{pmatrix}1&0\\0&0\end{pmatrix}
=\begin{pmatrix}4&4\\4&8\end{pmatrix}.
$$

Chia cho $4$ cho $S_4=\begin{pmatrix}1&1\\1&2\end{pmatrix}$.

**Kiểm tra và diễn giải.** Định thức bằng $1>0$, phần tử đầu đường chéo dương, nên Định lý 11.13 cho đây là hiệp phương sai MLE. Mật độ tại trung bình là $1/(2\pi)$. Phần tử ngoài đường chéo bằng $1$ ghi nhận hiệp phương sai dương; đây vẫn là độ cao mật độ tại một điểm, trong khi xác suất của đúng điểm đó bằng $0$.
:::

::: corollary Hệ quả 11.14 (Hiệp phương sai mẫu không chệch)
**Giả thiết.** $X_1,\ldots,X_n$ i.i.d. trên $\mathbb R^d$, có trung bình $\mu$, hiệp phương sai hữu hạn $\Sigma$, và $n\ge2$. Đặt $S_n$ bằng công thức (11.15) với mẫu ngẫu nhiên.

**Kết luận.**

$$
\mathbb E[S_n]=\frac{n-1}{n}\Sigma,
\qquad
S_{n-1}=\frac{n}{n-1}S_n
=\frac1{n-1}\sum_i(X_i-\bar X)(X_i-\bar X)^\top
\tag{11.20}
$$

trong đó $S_{n-1}$ là bộ ước lượng không chệch của $\Sigma$.

**Điều kiện áp dụng.** Kỳ vọng được hiểu theo từng phần tử; không yêu cầu Gaussian.

**Phạm vi.** Nhân với $n/(n-1)$ không thay đổi hạng. Hiệu chỉnh không khắc phục tính suy biến và không biến một ma trận thành nghiệm MLE mới.
:::

::: proof Chứng minh Hệ quả 11.14
**Bước 1 (mở rộng đẳng thức vô hướng).** Cùng phép khai triển đã dùng trong Mệnh đề 11.11 cho

$$
\sum_i(X_i-\bar X)(X_i-\bar X)^\top
=\sum_i(X_i-\mu)(X_i-\mu)^\top
-n(\bar X-\mu)(\bar X-\mu)^\top.
$$

**Bước 2 (lấy kỳ vọng).** Độc lập cho $\operatorname{Cov}(\bar X)=\Sigma/n$ và $\mathbb E[\bar X]=\mu$. Vì vậy kỳ vọng vế phải bằng $n\Sigma-n(\Sigma/n)=(n-1)\Sigma$. Chia cho $n$ hoặc $n-1$ cho (11.20). $\square$
:::

Hệ quả 11.14 mở rộng Mệnh đề 11.11 từ bình phương sang tích ngoài, với cùng giả thiết mômen và độc lập. Đối với Ví dụ 11.8, ma trận không chệch có giá trị $\begin{pmatrix}10/3&2\\2&10/3\end{pmatrix}$. Hai ma trận có cùng vector riêng nhưng khác trị riêng do hệ số nhân $4/3$; vì thế đường đồng mức của mô hình dùng chúng cũng có kích thước khác nhau.

### Trị riêng và khoảng cách Mahalanobis

Sau khi có ma trận hiệp phương sai, ta cần đọc được ý nghĩa của nó. So sánh hai điểm chỉ bằng khoảng cách Euclid tới trung bình sẽ coi mọi hướng có cùng mức phân tán. Với đám mây kéo dài theo đường chéo của Ví dụ 11.8, lựa chọn đó bỏ qua một phần thông tin vừa học được.

Về mặt hình học, ta có thể quay hệ trục về các hướng riêng rồi chia từng tọa độ cho độ lệch chuẩn theo hướng đó. Đây là trực giác của phép chuẩn hóa có tính đến hiệp phương sai. Định nghĩa tiếp theo mô tả độ dài sau phép biến đổi đó mà không cần thực hiện phép quay tường minh.

::: definition Định nghĩa 11.15 (Khoảng cách Mahalanobis)
Với $\Sigma\succ0$ và hai vector $x,\mu\in\mathbb R^d$, **khoảng cách Mahalanobis** từ $x$ đến $\mu$ là

$$
d_\Sigma(x,\mu)=\sqrt{(x-\mu)^\top\Sigma^{-1}(x-\mu)}.
\tag{11.21}
$$

Nếu $\Sigma=I_d$, đây là khoảng cách Euclid. Nếu $\Sigma=\sigma^2I_d$, đây là khoảng cách Euclid chia cho $\sigma$.
:::

Định nghĩa 11.15 dùng đúng dạng toàn phương trong mật độ (11.14). Vì thế nó liên hệ trực tiếp vị trí của một quan sát với giá trị mật độ dưới một Gaussian cố định. Khi so sánh các Gaussian có hiệp phương sai khác nhau, còn phải giữ cả hệ số chứa $\det\Sigma$; chỉ so khoảng cách Mahalanobis là chưa đủ để so mật độ.

Từ định lý phổ của ma trận đối xứng, ta có mô tả hình học sau; nguồn là Murphy (2022), §3.2.1–3.2.2, phần Gaussian nhiều chiều và khoảng cách Mahalanobis.

::: proposition Mệnh đề 11.16 (Hướng và độ dài của đường đồng mức Gaussian)
**Giả thiết.** $\Sigma\succ0$ có phân rã $\Sigma=U\operatorname{diag}(\lambda_1,\ldots,\lambda_d)U^\top$, trong đó $U=[u_1\ \cdots\ u_d]$ trực giao và $\lambda_j>0$. Đặt $z_j=u_j^\top(x-\mu)$.

**Kết luận.**

$$
d_\Sigma^2(x,\mu)=\sum_{j=1}^d\frac{z_j^2}{\lambda_j}.
\tag{11.22}
$$

Với $c>0$, tập $d_\Sigma^2(x,\mu)=c$ là một ellipsoid có các hướng trục $u_j$ và các bán trục $\sqrt{c\lambda_j}$. Trong hai chiều, tập đó là một ellipse. Các tập này cũng là đường đồng mức mật độ của Gaussian có $\mu,\Sigma$ cố định.

**Điều kiện áp dụng.** Ma trận xác định dương bảo đảm mọi phép chia hợp lệ. Phương sai của hình chiếu $u_j^\top X$ bằng $\lambda_j$ khi $X$ có hiệp phương sai $\Sigma$.

**Phạm vi.** Trị riêng là phương sai theo hướng riêng; độ lệch chuẩn và bán trục tỉ lệ với căn bậc hai của trị riêng. Khi trị riêng lặp, cơ sở riêng trong không gian riêng tương ứng không duy nhất.
:::

::: proof Chứng minh Mệnh đề 11.16
**Bước 1 (đổi hệ tọa độ).** Nghịch đảo của $\Sigma$ là $U\operatorname{diag}(1/\lambda_1,\ldots,1/\lambda_d)U^\top$. Thay vào (11.21) và dùng $z=U^\top(x-\mu)$ cho (11.22).

**Bước 2 (đường đồng mức).** Phương trình $\sum_jz_j^2/\lambda_j=c$ tương đương $\sum_jz_j^2/(c\lambda_j)=1$. Đây là ellipsoid trong hệ tọa độ trực chuẩn $u_j$, có bán trục $\sqrt{c\lambda_j}$. Trong (11.14), với tham số cố định, mật độ chỉ phụ thuộc $x$ qua $\exp(-d_\Sigma^2/2)$ nên không đổi trên ellipsoid này.

**Bước 3 (phương sai hình chiếu).** Vì $\operatorname{Var}(u_j^\top X)=u_j^\top\Sigma u_j=\lambda_j u_j^\top u_j=\lambda_j$, trị riêng đo độ phân tán theo hướng tương ứng. $\square$
:::

Trong học máy, Mệnh đề 11.16 cho cách dùng cấu trúc tương quan khi đo mức lệch của một quan sát. Một độ lệch lớn theo hướng có phương sai lớn có thể nhận điểm Mahalanobis thấp hơn một độ lệch Euclid nhỏ theo hướng ít biến động. Việc gán nhãn bất thường còn cần ngưỡng, dữ liệu đánh giá và kiểm tra giả thiết; hình học tự nó chỉ cho cách tính điểm dưới mô hình.

::: example Ví dụ 11.10 (So sánh hai độ lệch)
**Dữ liệu mô hình.** Xét Gaussian hai chiều với trung bình $\hat\mu=(10,20)^\top$ và ma trận hiệp phương sai $\hat\Sigma=S_4=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}$, như trong (11.19).

**Phân rã ma trận.** Ta có

$$
u_+=\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix},\quad
\lambda_+=4,
\qquad
u_-=\frac1{\sqrt2}\begin{pmatrix}1\\-1\end{pmatrix},\quad
\lambda_-=1.
$$

Thật vậy, $S_4u_+=4u_+$ và $S_4u_-=u_-$. Hai vector trực giao, có độ dài $1$; tổng các trị riêng là $5=\operatorname{tr}S_4$, tích là $4=\det S_4$.

**Đường đồng mức.** Theo Mệnh đề 11.16, ellipse $d^2=1$ có bán trục dài $2$ theo hướng $u_+$ và bán trục ngắn $1$ theo hướng $u_-$. Tỉ số độ dài bán trục bằng $2$, trong khi tỉ số phương sai bằng $4$.

**Hai quan sát.** Xét $a=(13,23)^\top$ và $b=(12,18)^\top$. So với tâm $(10,20)^\top$, các độ lệch là $(3,3)^\top$ và $(2,-2)^\top$. Do đó

$$
\begin{array}{c|c|c}
 & \|x-\hat\mu\|^2 & d_{\hat\Sigma}^2(x,\hat\mu)\\ \hline
a & 18 & (3\sqrt2)^2/4=9/2\\
b & 8 & (2\sqrt2)^2/1=8
\end{array}
$$

**Diễn giải và kiểm tra.** $a$ xa tâm hơn theo Euclid nhưng có điểm Mahalanobis thấp hơn $b$. Do cùng dùng một Gaussian, mật độ của $a$ lớn hơn mật độ của $b$:

$$
\frac{\hat f(a)}{\hat f(b)}
=\exp\left[-\frac12\left(\frac92-8\right)\right]
=e^{7/4}\approx5.755.
$$

Độ lệch của $a$ hoàn toàn theo hướng phương sai lớn; độ lệch của $b$ hoàn toàn theo hướng phương sai nhỏ. Thay hai vector vào ma trận nghịch đảo trong Ví dụ 11.8 cho cùng các kết quả $9/2$ và $8$.
:::

![Bốn điểm cảm biến quanh trung bình (10,20), các ellipse Mahalanobis có hướng dài (1,1), hướng ngắn (1,-1), và hai điểm mới a,b đảo thứ tự khi so bằng Euclid và Mahalanobis.](img/lec-11/gaussian-geometry.svg)

*Hình 11.1. Dữ liệu và mô hình trong các Ví dụ 11.8 và 11.10. Hai hướng riêng có phương sai lần lượt $4$ và $1$. Điểm $a$ xa tâm hơn theo Euclid nhưng gần hơn theo Mahalanobis vì nó lệch theo hướng phân tán lớn. Hình được vẽ từ dữ liệu giả lập của bài.*

::: remark Nhận xét 11.17 (Các giới hạn của cách đọc hình học)
1. Hiệp phương sai bằng $0$ chỉ suy ra độc lập khi có thêm giả thiết thích hợp, chẳng hạn các thành phần của một Gaussian đồng thời. Với phân phối tổng quát, không tương quan vẫn có thể phụ thuộc như phản ví dụ của Bài 10.
2. Ellipse $d^2=c$ là đường có cùng mật độ; con số $c$ không tự cho một mức xác suất. Nếu tham số Gaussian thật được biết, $d^2(X,\mu)$ có phân phối chi-bình phương với $d$ bậc tự do. Khi thay tham số bằng ước lượng từ mẫu nhỏ, không được tự động dùng kết luận đó như một bảo đảm chính xác cho điểm mới.
3. Đơn vị đo ảnh hưởng đến khoảng cách Euclid. Với phép đổi biến khả nghịch $y=Ax+b$, nếu đổi cả trung bình và hiệp phương sai thành $A\mu+b$ và $A\Sigma A^\top$, khoảng cách Mahalanobis được bảo toàn. Nếu chỉ thay số đo mà giữ nguyên ma trận, kết quả không còn cùng ý nghĩa.
:::

::: exercise Bài tập 11.5 (Củng cố: ma trận suy biến)
Cho $x_1=(0,0)^\top$, $x_2=(1,1)^\top$, $x_3=(2,2)^\top$. Tính $\bar x,S_3$ và các trị riêng. Xác định có tồn tại MLE Gaussian hai chiều với hiệp phương sai xác định dương hay không.
:::

::: hint Gợi ý Bài tập 11.5
Các điểm đều nằm trên đường $x_2=x_1$. Dùng Định lý 11.13 thay vì chỉ viết $\hat\Sigma=S_3$.
:::

::: solution Lời giải Bài tập 11.5
Ta có $\bar x=(1,1)^\top$ và

$$
S_3=\frac13\left[
\begin{pmatrix}1&1\\1&1\end{pmatrix}
+\begin{pmatrix}0&0\\0&0\end{pmatrix}
+\begin{pmatrix}1&1\\1&1\end{pmatrix}\right]
=\begin{pmatrix}2/3&2/3\\2/3&2/3\end{pmatrix}.
$$

Trị riêng là $4/3$ theo $(1,1)^\top/\sqrt2$ và $0$ theo $(1,-1)^\top/\sqrt2$. Dữ liệu không có độ lệch theo hướng thứ hai. Nếu phương sai theo hướng đó tiến tới $0$, mật độ tại mọi điểm dữ liệu tăng không bị chặn. Định lý 11.13 cho không tồn tại MLE trong họ Gaussian có hiệp phương sai xác định dương.
:::

::: exercise Bài tập 11.6 (Củng cố: mô hình xác suất và hàm mất mát)
Một số đo có mô hình $X_i=\mu+\varepsilon_i$ với nhiễu độc lập. So sánh hai giả thiết: (a) $\varepsilon_i\sim\mathcal N(0,v)$, $v>0$ đã biết; (b) nhiễu có mật độ $f(\varepsilon)=(2b)^{-1}\exp(-|\varepsilon|/b)$, $b>0$ đã biết. Suy ra mục tiêu theo $\mu$ trong mỗi trường hợp. Với dữ liệu $(0,0,9)$, tính một nghiệm của mỗi mục tiêu.
:::

::: hint Gợi ý Bài tập 11.6
Dùng Mệnh đề 11.3; bỏ những số hạng và hệ số dương không phụ thuộc $\mu$. So sánh tổng bình phương với tổng trị tuyệt đối.
:::

::: solution Lời giải Bài tập 11.6
Trong (a), âm log-hợp lý bằng hằng số cộng $(2v)^{-1}\sum_i(x_i-\mu)^2$. Nghiệm là trung bình $\hat\mu=3$, theo bước tách tổng bình phương trong Định lý 11.9.

Trong (b), âm log-hợp lý bằng hằng số cộng $b^{-1}\sum_i|x_i-\mu|$. Với mẫu đang xét, tổng trị tuyệt đối là $2|\mu|+|9-\mu|$. Nó giảm khi $\mu<0$, tăng khi $0<\mu<9$, và tiếp tục tăng khi $\mu>9$; nghiệm duy nhất là $\hat\mu=0$.

Hai giả thiết nhiễu dẫn tới hai hàm mất mát và hai giá trị ước lượng khác nhau trên cùng dữ liệu. Việc chọn mất mát tương ứng với một lựa chọn mô hình khi nó được suy ra bằng hợp lý cực đại.
:::

Định nghĩa 11.12 đưa tích ngoài vào mô tả mẫu; Định lý 11.13 xác định khi nào ma trận đó là một MLE hợp lệ. Hệ quả 11.14 tách tiêu chuẩn không chệch khỏi tiêu chuẩn hợp lý. Định nghĩa 11.15 và Mệnh đề 11.16 chuyển hiệp phương sai thành một hình học đo lệch theo hướng, cho phép diễn giải mô hình cảm biến đã học mà không bỏ qua tương quan.

## 11.6. Tình huống áp dụng và giới hạn của mô hình

### Học một mô hình cảm biến để chấm điểm quan sát mới

::: application Tình huống 11.1 (Từ mẫu hai chiều đến điểm lệch)
**Bài toán và dữ liệu.** Bốn quan sát nền của hai đặc trưng là $(12,22)^\top$, $(8,18)^\top$, $(11,19)^\top$, $(9,21)^\top$. Cần xây dựng mô hình nền và so sánh hai quan sát mới $a=(13,23)^\top$, $b=(12,18)^\top$. Đây là dữ liệu của các Ví dụ 11.8 và 11.10, được ghi lại để có thể giải trọn tình huống.

**Mô hình hóa và giả thiết.** Chọn mô hình i.i.d. Gaussian hai chiều cho dữ liệu nền và giả thiết các quan sát mới thuộc cùng chế độ đo. Tính độc lập giữa các sản phẩm không đòi hỏi hai đặc trưng trong cùng sản phẩm độc lập. Ma trận mẫu có định thức $4>0$, nên điều kiện dữ liệu của Định lý 11.13 được thỏa.

**Ước lượng.** Từ (11.18)–(11.19), dùng $\hat\mu=(10,20)^\top$ và $\hat\Sigma=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}$. Đây là ước lượng trên dữ liệu nền, không được tính lại bằng cách ghép từng quan sát cần chấm điểm vào mẫu.

**Chấm điểm.** Theo Định nghĩa 11.15 và Mệnh đề 11.16, $d^2(a)=4.5$, $d^2(b)=8$. Nếu một quy tắc minh họa đã chọn ngưỡng $d^2>6$, chỉ $b$ bị gắn cờ. Ngưỡng $6$ ở đây được chọn để minh họa cách dùng điểm, không đại diện cho một mức báo động sai đã được chứng minh.

**Diễn giải.** Điểm $b$ lệch theo hướng ít biến động nên có mật độ thấp hơn dù gần tâm hơn theo Euclid. Gaussian phát hiện bất thường dùng chính quan hệ giữa mật độ và dạng toàn phương này. Bốn điểm chưa đủ để xác nhận mô hình Gaussian, độ ổn định hay chất lượng ngưỡng; cần dữ liệu kiểm tra và quy trình đánh giá phù hợp trước khi suy ra hiệu quả vận hành.
:::

### Khi dữ liệu không đủ hướng phân tán

::: application Tình huống 11.2 (Hai đặc trưng trùng thông tin)
**Bài toán và dữ liệu.** Một hệ thống lưu hai cột: số đo $Z$ và chính số đo đó nhân $2$. Ba sản phẩm cho các vector $(0,0)^\top$, $(1,2)^\top$, $(2,4)^\top$. Nếu coi đây là dữ liệu cho một Gaussian hai chiều không ràng buộc, cần kiểm tra điều kiện của Định lý 11.13.

**Tính.** Trung bình bằng $(1,2)^\top$ và

$$
S_3=\frac23\begin{pmatrix}1&2\\2&4\end{pmatrix},
\qquad \det S_3=0.
$$

Vector $(-2,1)^\top$ nằm trong không gian không: mỗi số đo đều thỏa $-2x_1+x_2=0$. Bởi vậy một hướng có phương sai mẫu bằng $0$.

**Hậu quả.** Điều kiện $S_n\succ0$ bị vi phạm. Theo Định lý 11.13, không có MLE với hiệp phương sai xác định dương; không thể lấy nghịch đảo của $S_3$ để tính điểm theo Định nghĩa 11.15. Nhân ma trận với $3/2$ để hiệu chỉnh không chệch cũng không thay đổi hạng, theo Hệ quả 11.14.

**Lựa chọn mô hình.** Có thể giữ một đặc trưng và dùng Gaussian một chiều nếu điều đó đúng với cơ chế dữ liệu. Cũng có thể thêm một mô hình nhiễu đo riêng hoặc ràng buộc mức phương sai tối thiểu. Mỗi lựa chọn thay đổi giả thiết hoặc không gian tham số; cần nêu sự thay đổi trước khi dùng một công thức ước lượng mới.
:::

Các bài toán khác dùng cùng công cụ: ước lượng phân phối nhãn nền dùng Định lý 11.7; học trung bình tín hiệu dưới nhiễu Gaussian dùng Định lý 11.9; học các nhóm đặc trưng tương quan dùng Định lý 11.13. Trong hồi quy, tham số trung bình trở thành hàm của đầu vào; Bài 12 tiếp tục từ Mệnh đề 11.3 để suy ra mất mát bình phương và entropy chéo, rồi phân biệt mức khớp trên mẫu với khả năng tổng quát hóa.

## 11.7. Tóm tắt chương

Chúng ta bắt đầu với một họ phân phối có tham số chưa biết và một quy trình lấy mẫu cần được nêu rõ. Giả thiết độc lập cho phép viết hàm hợp lý thành tích, rồi phép log chuyển nó thành tổng các mất mát của từng quan sát. Tối ưu trên đoạn xác suất cho tần suất Bernoulli, còn ràng buộc chuẩn hóa dẫn tới tần suất của các nhóm phân loại. Với Gaussian, cùng nguyên lý dẫn tới trung bình và hiệp phương sai mẫu với mẫu số $n$; điều kiện không suy biến quyết định công thức đó có phải một nghiệm khả thi hay không. Hiệu chỉnh $n-1$ phục vụ tính không chệch qua các lần lấy mẫu và là một tiêu chuẩn khác. Cuối cùng, phân rã trị riêng chuyển ma trận hiệp phương sai thành các hướng phân tán và khoảng cách Mahalanobis. Việc tìm được cực đại hợp lý vẫn để ngỏ mức độ đúng của mô hình và sai số trên dữ liệu mới, là những vấn đề được tiếp tục trong Bài 12.

| Nhóm kết quả | Các số hiệu và nội dung |
|---|---|
| Mô hình và mục tiêu | Định nghĩa 11.1–11.2; Mệnh đề 11.3: từ mẫu và hàm hợp lý đến mất mát thực nghiệm |
| Bernoulli | Định lý 11.4; Nhận xét 11.5: $\hat p=s/n$, có thể nằm trên biên |
| Phân loại | Định nghĩa 11.6; Định lý 11.7; Nhận xét 11.8: $\hat\pi_k=n_k/n$, xử lý các nhóm chưa thấy |
| Gaussian một chiều | Định lý 11.9; Định nghĩa 11.10; Mệnh đề 11.11: tối ưu hợp lý và tính không chệch |
| Gaussian nhiều chiều | Định nghĩa 11.12; Định lý 11.13; Hệ quả 11.14: $\hat\mu=\bar x$, $\hat\Sigma=S_n$ khi $S_n\succ0$ |
| Hình học | Định nghĩa 11.15; Mệnh đề 11.16; Nhận xét 11.17: các bán trục và khoảng cách theo hiệp phương sai |

Các công thức cần nhớ là (11.3), (11.5), (11.8), (11.11), (11.18), (11.20) và (11.22). Khi dùng chúng, cần kiểm tra độc lập, cùng phân phối, miền tham số và tính không suy biến. Mật độ, hợp lý và hậu nghiệm phải được đọc theo đúng biến đang xét. Một mất mát có thể được suy ra từ giả thiết phân phối, nhưng tối ưu mất mát trên mẫu chưa cho một bảo đảm về quan sát mới.

## 11.8. Bài tập trên lớp: 30 phút

Ba bài sau dành cho làm việc trên lớp, tách khỏi bốn bài tự học ở Mục 11.9. Lời giải có thể được mở sau khi làm bài.

::: exercise Bài tập 11.7 (Trên lớp, 8 phút: biên Bernoulli)
Một mẫu gồm $8$ cờ, trong đó có $2$ số $1$. Viết log-hợp lý, tìm MLE và kiểm tra cực đại. Sau đó thay mẫu bằng tám số $0$ và xác định nghiệm trên $[0,1]$.
:::

::: hint Gợi ý Bài tập 11.7
Phân biệt trường hợp có điểm dừng bên trong với trường hợp phải kiểm tra trực tiếp hàm hợp lý ở biên.
:::

::: solution Lời giải Bài tập 11.7
Với hai thành công, $\ell(p)=2\log p+6\log(1-p)$. Ta có $\ell'(p)=(2-8p)/(p(1-p))$, nên $\hat p=1/4$. Đạo hàm đổi từ dương sang âm tại $1/4$, trong khi hai biên có hợp lý bằng $0$.

Với tám số $0$, $L(p)=(1-p)^8$, giảm chặt trên $[0,1]$ và có cực đại duy nhất tại $p=0$. Không dùng điều kiện điểm dừng trong $(0,1)$ để bỏ sót nghiệm này.
:::

::: exercise Bài tập 11.8 (Trên lớp, 10 phút: Lagrange trên một mặt)
Ba nhóm có số đếm $(4,0,6)$. Chứng minh cực đại phải có $\pi_2=0$, rồi dùng nhân tử Lagrange với $\pi_1+\pi_3=1$ để tìm nghiệm. Tính xác suất thế tham số cho hai quan sát mới độc lập đều thuộc nhóm $3$.
:::

::: hint Gợi ý Bài tập 11.8
Nếu tổng khối lượng của hai nhóm đã thấy nhỏ hơn $1$, chuẩn hóa nó lên $1$ sẽ tăng hợp lý.
:::

::: solution Lời giải Bài tập 11.8
**Đưa về mặt có dữ liệu.** Xét một ứng viên có hợp lý dương, nên $m=\pi_1+\pi_3>0$. Nếu $m<1$, thay $(\pi_1,\pi_3)$ bằng $(\pi_1/m,\pi_3/m)$ làm hợp lý nhân với $m^{-10}>1$. Vì thế cực đại có $m=1$ và $\pi_2=0$.

**Tối ưu trên mặt.** Hàm Lagrange là $4\log\pi_1+6\log\pi_3+\lambda(1-\pi_1-\pi_3)$. Điều kiện dừng cho $4/\pi_1=6/\pi_3=\lambda$, nên $\lambda=10$ và $\hat\pi=(0.4,0,0.6)$. Log-hợp lý lõm chặt theo hai tọa độ dương nên đây là cực đại duy nhất trên mặt. Xác suất cần tính là $0.6^2=0.36$, dưới giả thiết độc lập của hai quan sát mới.
:::

::: exercise Bài tập 11.9 (Trên lớp, 12 phút: hình học theo hướng riêng)
Cho Gaussian hai chiều có trung bình $(0,0)^\top$ và hiệp phương sai $\Sigma=\begin{pmatrix}5&4\\4&5\end{pmatrix}$. Tìm trị riêng, vector riêng đơn vị và bán trục của ellipse $d_\Sigma^2=1$. So sánh Euclid và Mahalanobis cho $a=(3,3)^\top$, $b=(2,-2)^\top$.
:::

::: hint Gợi ý Bài tập 11.9
Hai hướng $(1,1)^\top$ và $(1,-1)^\top$ là các hướng riêng. Chuẩn hóa chúng trước khi chiếu các điểm.
:::

::: solution Lời giải Bài tập 11.9
**Trị riêng.** Ta có $\lambda_+=9$, $u_+=(1,1)^\top/\sqrt2$ và $\lambda_-=1$, $u_-=(1,-1)^\top/\sqrt2$. Ellipse có bán trục $3$ theo $u_+$ và $1$ theo $u_-$.

**Khoảng cách.** Với $a$, bình phương Euclid bằng $18$, còn $d_\Sigma^2(a,0)=(3\sqrt2)^2/9=2$. Với $b$, bình phương Euclid bằng $8$, còn $d_\Sigma^2(b,0)=(2\sqrt2)^2=8$. Điểm $a$ xa hơn theo Euclid nhưng có mật độ Gaussian lớn hơn vì nó lệch theo hướng có phương sai lớn hơn.

**Kiểm tra.** Tổng và tích trị riêng là $10$ và $9$, đúng với vết và định thức của $\Sigma$.
:::

## 11.9. Bốn bài tự học: khoảng 180 phút

Các bài được điều chỉnh từ cấu trúc W2.1–W2.4 trong `sources/part2/homework.pdf`, đối chiếu với Murphy. Chúng là bài tập điều chỉnh (adapted exercises), không gắn số bài tập của Murphy. Mức **cơ bản** kiểm tra nhận biết và tính toán; mức **trung bình** cần suy diễn; mức **vận dụng** yêu cầu kiểm tra giả thiết hoặc diễn giải AI. Các gợi ý dưới đây không thay thế phần trình bày lời giải của người học.

::: exercise E11.1 (Trung bình; suy diễn và phản biện, 45 phút)
Có $9$ thành công trong $12$ phép thử độc lập cùng phân phối Bernoulli$(p)$, với $p\in[0,1]$.

1. Viết hàm hợp lý và log-hợp lý. Giải thích sự khác nhau giữa việc quan sát chuỗi có thứ tự với việc chỉ quan sát tổng số thành công.
2. Suy ra MLE bằng đạo hàm; kiểm tra đây là cực đại toàn cục. Tính tỉ số hợp lý giữa MLE và $p=1/2$.
3. Chứng minh công thức MLE cho mọi $s\in\{0,\ldots,n\}$, kể cả mẫu toàn thất bại hoặc toàn thành công. Phân tích điều gì thay đổi nếu miền tham số là $(0,1)$.
4. Nếu một cờ được sao chép $12$ lần thay vì thu thập $12$ phép thử độc lập, xác suất của mẫu toàn thành công là gì? Giải thích vì sao dùng $p^{12}$ sẽ sai mô hình lấy mẫu.
5. Phân biệt kết luận “tham số này cực đại hóa hợp lý” với kết luận “tham số này có xác suất hậu nghiệm lớn nhất”.
:::

::: hint Gợi ý E11.1
Dùng các Định nghĩa 11.1–11.2, Định lý 11.4 và Nhận xét 11.5. Ở câu 4, viết biến cố đồng thời bằng một biến ngẫu nhiên gốc.
:::

::: exercise E11.2 (Trung bình; tối ưu có ràng buộc và liên hệ AI, 40 phút)
Một cảm biến có ba trạng thái với số đếm $(3,5,12)$ trong $20$ quan sát i.i.d.

1. Viết bài toán cực đại log-hợp lý trên đơn hình và suy ra MLE bằng nhân tử Lagrange. Kiểm tra điều kiện cực đại và ràng buộc chuẩn hóa.
2. Tính xác suất thế tham số cho hai quan sát mới độc lập đều thuộc nhóm $3$; chỉ ra hai giả thiết cần cho phép tính đó.
3. Thay số đếm bằng $(3,0,17)$. Chứng minh MLE có tọa độ thứ hai bằng $0$ mà không dùng phép chia $0/0$ trong điều kiện dừng.
4. Viết âm log-hợp lý trung bình thành entropy chéo giữa phân phối tần suất và vector tham số. Giải thích vì sao nhóm chưa được quan sát có thể gây khó khăn khi nó xuất hiện trong dữ liệu kiểm tra.
:::

::: hint Gợi ý E11.2
Dùng Định lý 11.7 trên miền trong và trên mặt của các nhóm đã thấy. Phân biệt giả thiết cùng chế độ phân phối với giả thiết độc lập của các quan sát mới.
:::

::: exercise E11.3 (Cơ bản đến trung bình; tính toán và kiểm tra tiêu chuẩn, 45 phút)
Cho dữ liệu $(1,1,2,4)$, giả sử i.i.d. Gaussian với trung bình và phương sai đều chưa biết.

1. Viết log-hợp lý; suy ra trung bình và phương sai MLE, không chỉ thế vào công thức.
2. Tính phương sai mẫu không chệch và viết mật độ Gaussian đã khớp bằng MLE. Phân biệt phương sai với độ lệch chuẩn.
3. Chứng minh $\mathbb E[Q_X]=(n-1)\sigma^2$ dưới giả thiết i.i.d. có phương sai hữu hạn. Nêu vì sao chứng minh không cần Gaussian.
4. Nếu trung bình thật được biết trước là $0$, tính MLE của phương sai trên cùng dữ liệu và kiểm tra tính không chệch của công thức với mẫu số $n$ trong mô hình trung bình đã biết.
5. Nếu cả bốn quan sát đều bằng $2$, phân tích sự tồn tại MLE trong họ có phương sai dương.
:::

::: hint Gợi ý E11.3
Dùng đẳng thức (11.12). Ở câu 4, giữ nguyên trung bình bằng $0$ khi tối ưu; không dùng các sai lệch quanh trung bình mẫu.
:::

::: exercise E11.4 (Vận dụng; ma trận và hình học cảm biến, 50 phút)
Bốn phép đo hai chiều là $(3,2)^\top$, $(-1,-2)^\top$, $(2,-1)^\top$, $(0,1)^\top$. Giả sử các phép đo độc lập cùng phân phối Gaussian hai chiều.

1. Tính trung bình và ma trận hiệp phương sai với mẫu số $n$. Kiểm tra điều kiện tồn tại MLE trong Định lý 11.13.
2. Tính ma trận hiệp phương sai không chệch và giải thích vì sao nó có cùng hướng riêng với ma trận MLE.
3. Tìm các trị riêng và vector riêng đơn vị của ma trận MLE. Viết phương trình ellipse $d^2=1$ trong hệ trục riêng, cho hướng và độ dài các bán trục.
4. So sánh bình phương Euclid và Mahalanobis của hai quan sát mới $a=(4,3)^\top$, $b=(3,-2)^\top$ so với trung bình đã ước lượng. Giải thích kết quả bằng hướng phân tán.
5. Nếu đặc trưng thứ hai luôn bằng hai lần đặc trưng thứ nhất trong mọi sản phẩm, mô hình MLE hai chiều không ràng buộc gặp vấn đề gì? Nêu một thay đổi mô hình có thể xem xét và giải thích vì sao đó là thay đổi giả thiết.
:::

::: hint Gợi ý E11.4
Các vector đã trừ trung bình trong câu 1 có thể ghép thành hai cặp đối nhau. Kiểm tra tổng trị riêng bằng vết và tích trị riêng bằng định thức. Câu 5 dùng điều kiện hạng, không chỉ điều kiện $n>d$.
:::

## 11.10. Hướng dẫn đọc thêm và tài liệu tham khảo

Tài liệu chính là Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press. [Trang sách do tác giả cung cấp](https://probml.github.io/pml-book/book1.html) có mục lục và bản đọc. Các dẫn mục dưới đây dùng hệ thống đánh số của tập I; chúng chỉ ra nguồn kiến thức, không nhận các ví dụ số tự soạn làm ví dụ gốc của sách.

| Phần của bài | Mục đọc ở Murphy I | Mục đích đọc |
|---|---|---|
| 11.1 | §4.1, §4.2.1–4.2.2 và §4.3 | Phân biệt mô hình thống kê, ước lượng hợp lý cực đại và tối thiểu hóa mất mát thực nghiệm |
| 11.2 | §4.2.3; ôn phân phối Bernoulli ở §2.4 | Suy ra ước lượng tham số và kiểm tra nghiệm biên |
| 11.3 | §4.2.4; ôn phân phối phân loại ở §2.5 | Ước lượng xác suất từ số đếm dưới ràng buộc chuẩn hóa |
| 11.4 | §4.2.5; ôn Gaussian một chiều ở §2.6 | Ước lượng trung bình, phương sai và đánh giá bộ ước lượng |
| 11.5 | §3.2.1–3.2.2 và §4.2.6 | Gaussian nhiều chiều, hiệp phương sai, dạng toàn phương và ước lượng |
| Mở rộng của 11.2 | §4.6.2 | Phân biệt MLE, tiên nghiệm, hậu nghiệm và một lựa chọn ước lượng Bayes |
| Mở rộng của 11.3 | §6.2.1, §6.2.4–6.2.5 | Độ phân kỳ Kullback–Leibler và quan hệ với entropy chéo |
| Chuẩn bị Bài 12 | §4.3; §10.2; §11.2 | Từ hợp lý có điều kiện đến mất mát phân loại và hồi quy |

Các Định lý 11.4, 11.7, 11.9 và 11.13 dựa trên nguyên lý và các mô hình ước lượng ở §4.2; các chứng minh được biên soạn đầy đủ theo cách tối ưu đã học. Các số mục được đối chiếu với [mục lục do nhà xuất bản cung cấp](https://mitp-content-server.mit.edu/books/content/sectbyfn?collid=books_pres_0&fn=TOC.pdf&id=14260); không gán số trang hoặc số bài tập chưa đối chiếu với bản sách đang dùng. Mệnh đề 11.11 và Hệ quả 11.14 dùng khai triển mômen để làm rõ sự khác nhau giữa tiêu chuẩn hợp lý và không chệch. Mệnh đề 11.16 dùng phân rã phổ để giải thích hình học của Gaussian ở §3.2. Không giả định rằng mọi phát biểu về biên và suy biến được phát biểu nguyên dạng trong giáo trình.

Bộ ghi chú khởi đầu *Probability: Mathematical Foundations for AI — Five-week bridge*, `sources/part2/lecture_notes.pdf`, Tuần 2, §6.1–6.5, cung cấp dữ liệu được giữ lại ở các Ví dụ 11.3, 11.5, 11.7 và 11.9. Các công thức được đối chiếu với các mục Murphy tương ứng; lời giải ở đây bổ sung kiểm tra cực đại, miền tham số và giả thiết. Không bổ sung thông tin tác giả hoặc năm xuất bản khi chưa có căn cứ từ tệp nguồn.

Nguồn bài tập khởi đầu là *Five-Week Homework — Probability and Probabilistic AI — UET.AI2012*, bản sinh viên trong `sources/part2/homework.pdf`, Tuần 2. Tệp không ghi tác giả và năm xuất bản nên không bổ sung hai thông tin này. E11.1 giữ dữ liệu W2.1 và thêm phân tích quy trình lấy mẫu; E11.2 giữ số đếm W2.2, thêm Lagrange, trường hợp biên và entropy chéo; E11.3 giữ dữ liệu W2.3, thêm chứng minh và trường hợp trung bình đã biết. E11.4 điều chỉnh W2.4 từ bốn góc hình vuông thành dữ liệu tương quan để kiểm tra cả hướng riêng và khoảng cách Mahalanobis. Thời lượng được phân lại thành $45+40+45+50=180$ phút theo kế hoạch của bài.

Đọc thêm về độ bất định của bộ ước lượng tại Murphy, §4.7.1–4.7.4: một giá trị ước lượng đơn lẻ chưa mô tả được mức dao động do lấy mẫu. Các kết quả tiệm cận cần giả thiết chính quy riêng; bài này không dùng chúng để suy ra khoảng tin cậy hoặc mức phát hiện bất thường. Bài 12 tiếp tục với một phân biệt khác: nghiệm tối ưu trên mẫu huấn luyện và chất lượng trên phân phối sinh dữ liệu mới.
