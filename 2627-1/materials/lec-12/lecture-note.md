# Bài 12 — Học máy, rủi ro thống kê và khả năng tổng quát hóa

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Suy ra mất mát bình phương từ hợp lý Gaussian có điều kiện, giải phương trình chuẩn và phân biệt sự duy nhất của hệ số với sự duy nhất của giá trị khớp.
2. Suy ra entropy chéo nhị phân từ hợp lý Bernoulli có điều kiện; phân biệt mô hình xác suất với bộ phân loại sau khi lấy ngưỡng và nhận ra trường hợp không có nghiệm hợp lý cực đại hữu hạn.
3. Thiết lập rủi ro tổng thể, rủi ro thực nghiệm và bài toán tối thiểu hóa rủi ro thực nghiệm; tính chính xác rủi ro của bộ phân loại ngưỡng trong một mô hình một chiều.
4. Phân biệt độ chính xác với độ tin cậy trong phát biểu học gần đúng có xác suất cao; phân biệt trường hợp khả thực với trường hợp không giả định mô hình đúng.
5. Chứng minh một chặn hội tụ đều cho lớp hữu hạn và suy ra chặn rủi ro dư cho nghiệm tối ưu thực nghiệm gần đúng.
6. Chứng minh số chiều VC của hai lớp ngưỡng một chiều, phân biệt sai số xấp xỉ, sai số do lấy mẫu và sai số tối ưu hóa; nêu giới hạn của việc chuyển bảo đảm sang lớp mạng sâu.

Các mục tiêu cụ thể hóa năng lực xây dựng và phân tích mô hình học máy thuộc CLO2, đồng thời nối với năng lực nhận dạng bài toán tối ưu thuộc CLO4 trong đề cương học phần. Đây là các mục tiêu biên soạn của bài, không phải các mã chuẩn đầu ra bài học mới. Các Bài tập 12.1–12.6 củng cố sáu nhóm mục tiêu; ba bài trên lớp và bốn bài tự học yêu cầu phối hợp các nhóm kiến thức.

## Kiến thức tiên quyết và liên hệ với các bài trước

- **Xác suất và kỳ vọng.** Cần biết phân phối có điều kiện, độc lập, kỳ vọng, Bernoulli và Gaussian trong Bài 10. Rủi ro của một bộ dự đoán là kỳ vọng của mất mát trên một quan sát mới; không phải kỳ vọng theo riêng tham số tối ưu.
- **Ước lượng hợp lý cực đại.** Mệnh đề 11.3 biến cực đại hợp lý thành cực tiểu âm log-hợp lý. Định lý 11.9 cho ước lượng trung bình Gaussian một chiều, còn Định lý 11.4 cho Bernoulli khi mọi quan sát có chung xác suất. Chúng ta cho trung bình hoặc xác suất phụ thuộc đầu vào, rồi xem điều gì còn thiếu sau khi đã tối ưu tham số.
- **Đại số tuyến tính và tối ưu.** Cần biết ma trận thiết kế, hạng cột, không gian không, gradient, tính lồi và điều kiện cực tiểu của hàm toàn phương. Các Bài 03–05 đã nghiên cứu công cụ tối ưu; ở đây mục tiêu được suy ra từ mô hình dữ liệu và được đánh giá bằng một tiêu chuẩn thống kê khác.
- **Tập trung xác suất.** Bài 05c đã dùng các bất đẳng thức tập trung để kiểm soát trung bình mẫu. Ta dùng lại Định lý 05c.47 và Định lý 05c.52 cùng phép hợp để kiểm soát đồng thời các bộ dự đoán có thể được chọn từ mẫu. Không lặp lại chứng minh đầy đủ của Hoeffding.

Kết luận của Bài 11 chỉ xác định tham số khớp dữ liệu theo một tiêu chuẩn hợp lý. Giới hạn còn lại là: một nghiệm khớp dữ liệu huấn luyện có thể không dự đoán tốt trên quan sát mới. Để phân tích giới hạn đó, chúng ta cần xác định phân phối đích, lớp mô hình và quan hệ giữa hai loại rủi ro.

## Cách đọc và phân bổ thời gian

| Nội dung lý thuyết | Thời gian |
|---|---:|
| 12.1. Hồi quy Gaussian và nguồn gốc mất mát bình phương | 30 phút |
| 12.2. Hợp lý logistic và entropy chéo | 25 phút |
| 12.3. Rủi ro tổng thể, rủi ro thực nghiệm và nguyên lý học | 30 phút |
| 12.4. Tổng quát hóa, học PAC và số chiều VC | 35 phút |
| **Tổng lý thuyết** | **120 phút** |

Ba bài trên lớp chiếm 30 phút riêng. Bốn bài tự học cần khoảng 180 phút; khoảng hai giờ còn lại dành cho đọc sách, kiểm tra ví dụ và hoàn thiện các chứng minh, tổng cộng khoảng năm giờ tự học.

Phần **cốt lõi** gồm hai suy diễn mất mát, rủi ro, ví dụ ngưỡng, chặn hội tụ đều cho lớp hữu hạn, hệ quả cho tối ưu gần đúng và hai phép tính số chiều VC. Phần **mở rộng** được ghi tại chỗ, gồm ước lượng thêm phương sai, quy tắc Bayes và phân tích lớp có khả năng ghi nhớ. Phần **đọc thêm** dẫn tới kết quả tổng quát cho lớp VC hữu hạn; chứng minh đầy đủ được dành cho học phần Lý thuyết học thống kê.

Dữ liệu dưới đây là số liệu giả lập phục vụ học tập. Các Ví dụ 12.1, 12.4, 12.7 và 12.10 giữ các tình huống và dữ kiện của `sources/part2/lecture_notes.pdf`, Tuần 3; phép suy diễn và kiểm tra được viết lại. Các ví dụ khác được tự biên soạn. Đây là các ví dụ điều chỉnh, không gán thành ví dụ hay bài tập nguyên bản của Murphy.

## Bảng ký hiệu

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $X,Y$; $x,y$ | đầu vào và đầu ra ngẫu nhiên; giá trị quan sát | tùy bài toán |
| $P$ | phân phối đích của cặp $(X,Y)$ | phân phối trên $\mathcal X\times\mathcal Y$ |
| $S=((x_i,y_i))_{i=1}^n$ | mẫu huấn luyện đã quan sát | $n$ cặp dữ liệu |
| $\mathcal X,\mathcal Y$ | không gian đầu vào, đầu ra | tập đo được |
| $\theta$, $w$, $b$ | tham số mô hình, hệ số, hệ số tự do | vector hoặc vô hướng |
| $m_\theta(x)$ | trung bình có điều kiện được mô hình hóa | số thực |
| $p_\theta(x)$ | xác suất có điều kiện của nhãn $1$ | $(0,1)$ trong mô hình logistic hữu hạn |
| $\sigma^2$ | phương sai nhiễu Gaussian | số dương |
| $\operatorname{sigm}(z)$ | hàm sigmoid $1/(1+e^{-z})$ | $\mathbb R\to(0,1)$ |
| $A$, $y$ | ma trận thiết kế; vector đầu ra | $n\times p$; $\mathbb R^n$ |
| $\mathcal H$ | lớp các bộ dự đoán được phép chọn | tập hàm từ $\mathcal X$ |
| $h$, $\hat h$ | bộ dự đoán; bộ dự đoán được chọn từ mẫu | phần tử của $\mathcal H$ |
| $\ell(a,y)$ | mất mát khi dự đoán $a$ cho nhãn $y$ | số không âm |
| $R_P(h)$, $R(h)$ | rủi ro tổng thể; viết gọn khi $P$ cố định | kỳ vọng mất mát |
| $\hat R_S(h)$, $\hat R_n(h)$ | rủi ro thực nghiệm trên mẫu $S$ | trung bình mất mát mẫu |
| $R_\mathcal H^*$, $R^*$ | rủi ro tốt nhất trong lớp; rủi ro chuẩn so sánh toàn cục | cận dưới đúng của rủi ro |
| $h_t$ | bộ phân loại ngưỡng $\mathbf1_{\{x\ge t\}}$ | hàm $\mathbb R\to\{0,1\}$ |
| $\varepsilon$, $\delta$ | mức sai số cho phép; xác suất thất bại cho phép | số trong $(0,1)$ |
| $\eta$ | sai số tối ưu hóa thực nghiệm được cho phép | số không âm |
| $\Delta_S$ | độ lệch đều giữa hai loại rủi ro | số không âm |
| $M$, $d_{\mathrm{VC}}$ | số phần tử lớp hữu hạn; số chiều VC | số nguyên không âm hoặc $+\infty$ |

## 12.1. Hồi quy Gaussian và nguồn gốc mất mát bình phương

Một hệ thống dự đoán đầu ra cảm biến từ một đặc trưng đầu vào cần học cả hệ số tự do lẫn độ dốc. Nếu chỉ cho trước tổng bình phương sai số, bài toán trở thành một phép tối ưu quen thuộc. Chúng ta bắt đầu sớm hơn: nêu mô hình xác suất của đầu ra, rồi suy ra đại lượng cần tối ưu.

Một cách trực quan, đầu vào thay đổi vị trí của phân phối đầu ra, còn nhiễu tạo dao động quanh vị trí đó. Những đường dự đoán khác nhau tương ứng với những trung bình có điều kiện khác nhau. Đây là trực giác mô hình hóa, chưa xác định dạng mất mát hoặc bảo đảm rằng đường dự đoán tuyến tính là đúng.

### Từ trung bình cố định đến trung bình phụ thuộc đầu vào

::: definition Định nghĩa 12.1 (Mô hình đầu ra có điều kiện)
Cho các đầu vào đã quan sát $x_1,\ldots,x_n$. Một mô hình đầu ra có điều kiện chỉ định các phân phối $p_\theta(y\mid x)$, trong đó $\theta$ là tham số chung cho mọi đầu vào.

Nếu $Y_1,\ldots,Y_n$ độc lập có điều kiện khi biết toàn bộ các đầu vào và $Y_i$ có phân phối $p_\theta(\cdot\mid x_i)$, hàm hợp lý có điều kiện là

$$
L(\theta;S\mid x_1,\ldots,x_n)
=\prod_{i=1}^n p_\theta(y_i\mid x_i).
\tag{12.1}
$$

Các nhân tử là mật độ khi $Y$ liên tục và là xác suất khi $Y$ rời rạc. Các đầu vào được giữ cố định trong bài toán tối ưu này.
:::

Định nghĩa 12.1 mở rộng hàm hợp lý trong Định nghĩa 11.2: mỗi quan sát không còn có cùng trung bình vô điều kiện, nhưng cùng dùng một quy tắc $x\mapsto p_\theta(\cdot\mid x)$. Nếu các cặp $(X_i,Y_i)$ i.i.d., sự phân tích có điều kiện trong (12.1) được thỏa dưới mô hình tương ứng. Tuy nhiên, hồi quy có điều kiện cũng có thể được thiết lập với thiết kế đầu vào cố định, không cần chọn phân phối xác suất cho các $x_i$.

Giả sử

$$
Y_i=m_\theta(x_i)+\xi_i,
\qquad
\xi_i\overset{\mathrm{i.i.d.}}\sim\mathcal N(0,\sigma^2),
\qquad \sigma^2>0.
\tag{12.2}
$$

Ở đây các nhiễu độc lập với thiết kế đầu vào; với đầu vào ngẫu nhiên, giả thiết là các nhiễu độc lập có điều kiện khi biết toàn bộ đầu vào, và mỗi nhiễu có phân phối $\mathcal N(0,\sigma^2)$ có điều kiện trên các đầu vào đó. Khác với Bài 11, trung bình $m_\theta(x_i)$ có thể thay đổi theo từng quan sát.

Mệnh đề tiếp theo dùng Định nghĩa 12.1 và phép lấy âm log của Mệnh đề 11.3. Cơ sở là Murphy (2022), §4.2.7 và §11.2.

::: proposition Mệnh đề 12.2 (Giả thiết Gaussian dẫn tới mất mát bình phương)
**Giả thiết.** Dữ liệu tuân theo mô hình (12.2); phương sai $\sigma^2>0$ đã biết và không phụ thuộc $\theta$.

**Kết luận.** Âm log-hợp lý có điều kiện là

$$
-\log L(\theta;S\mid x_1,\ldots,x_n)
=\frac n2\log(2\pi\sigma^2)
+\frac1{2\sigma^2}\sum_{i=1}^n\bigl(y_i-m_\theta(x_i)\bigr)^2.
\tag{12.3}
$$

Do đó các nghiệm hợp lý cực đại theo $\theta$ trùng với các nghiệm cực tiểu của tổng bình phương sai số.

**Điều kiện áp dụng.** Phương sai chung được giữ cố định; các đầu ra độc lập có điều kiện theo mô hình. Tính tuyến tính của $m_\theta$ chưa cần thiết cho kết luận này.

**Phạm vi.** Đây là nguồn gốc xác suất của mất mát bình phương dưới giả thiết Gaussian, không phải kết luận mọi loại nhiễu đều cho cùng một hàm hợp lý.
:::

::: proof Chứng minh Mệnh đề 12.2
**Bước 1 (viết từng mật độ).** Từ (12.2), ta có

$$
p_\theta(y_i\mid x_i)
=(2\pi\sigma^2)^{-1/2}
\exp\left[-\frac{(y_i-m_\theta(x_i))^2}{2\sigma^2}\right].
$$

**Bước 2 (ghép mẫu và tối ưu).** Nhân các mật độ theo (12.1), rồi lấy âm log cho (12.3). Số hạng đầu không phụ thuộc $\theta$, còn hệ số $1/(2\sigma^2)$ dương. Bỏ hằng số và nhân với một hệ số dương không thay đổi tập nghiệm cực tiểu. $\square$
:::

Trong học máy, $m_\theta$ là bộ dự đoán đầu ra liên tục; các sai lệch $y_i-m_\theta(x_i)$ là phần dư. Mệnh đề 12.2 cho phép thiết lập mục tiêu huấn luyện từ một giả thiết nhiễu. Với nhiễu có mật độ tỉ lệ với $e^{-|\xi|/b}$ và $b$ cố định, cùng phép suy diễn cho tổng trị tuyệt đối như Bài tập 11.6; lựa chọn mất mát vì vậy mang theo một giả thiết mô hình khi nó được suy ra bằng hợp lý.

### Nghiệm tuyến tính và vai trò của hạng

Chọn $m_w(x)=w_0+w_1x$ trong trường hợp một đặc trưng. Với nhiều đặc trưng đã chọn trước, ta viết các giá trị trung bình thành $Aw$, trong đó hàng thứ $i$ của $A\in\mathbb R^{n\times p}$ chứa các đặc trưng của $x_i$ và có thể có một tọa độ $1$ cho hệ số tự do. Mục tiêu từ (12.3) là $J(w)=\|Aw-y\|_2^2$.

Về mặt hình học, mọi vector khớp $Aw$ nằm trong không gian cột của $A$. Bộ dữ liệu $y$ có thể không nằm trong không gian đó, nên phần dư tốt nhất phải vuông góc với mọi hướng dịch chuyển khả thi. Trực giác phép chiếu này được thể hiện bằng phương trình chuẩn.

::: theorem Định lý 12.3 (Phương trình chuẩn và tính duy nhất)
**Giả thiết.** Cho $A\in\mathbb R^{n\times p}$, $y\in\mathbb R^n$ và $J(w)=\|Aw-y\|_2^2$ trên $\mathbb R^p$.

**Kết luận.** Nghiệm cực tiểu tồn tại. Một vector $\hat w$ là nghiệm khi và chỉ khi

$$
A^\top A\hat w=A^\top y.
\tag{12.4}
$$

Nếu $A$ có hạng cột đầy đủ thì nghiệm duy nhất là

$$
\hat w=(A^\top A)^{-1}A^\top y.
\tag{12.5}
$$

Nếu hạng cột không đầy đủ thì hệ số không duy nhất: từ một nghiệm $\hat w$, mọi nghiệm có dạng $\hat w+v$ với $v\in\ker A$. Dù vậy vector khớp $A\hat w$ là duy nhất.

**Điều kiện áp dụng.** Không có ràng buộc hoặc số hạng chính quy hóa bổ sung theo $w$. Liên hệ MLE còn cần giả thiết của Mệnh đề 12.2.

**Phạm vi.** Tính duy nhất của vector khớp trên các đầu vào đã thấy không suy ra các nghiệm cho cùng dự đoán tại mọi đầu vào mới.
:::

::: proof Chứng minh Định lý 12.3
**Bước 1 (tồn tại và điều kiện cần).** Không gian cột của $A$ là một không gian con đóng trong $\mathbb R^n$. Phép chiếu trực giao của $y$ lên không gian đó tồn tại và bằng $A\hat w$ với ít nhất một $\hat w$. Vì $J$ khả vi trên toàn $\mathbb R^p$, mọi nghiệm có gradient $2A^\top(A\hat w-y)=0$, tức (12.4).

**Bước 2 (điều kiện đủ).** Nếu (12.4) đúng, đặt $r=y-A\hat w$. Với mọi $v\in\mathbb R^p$, ta có $A^\top r=0$, nên

$$
\begin{aligned}
J(\hat w+v)
&=\|r-Av\|^2\\
&=\|r\|^2-2v^\top A^\top r+\|Av\|^2\\
&=J(\hat w)+\|Av\|^2\ge J(\hat w).
\end{aligned}
$$

Đẳng thức xảy ra khi và chỉ khi $v\in\ker A$. Điều này cũng mô tả toàn bộ tập nghiệm và chứng minh mọi nghiệm có cùng vector khớp.

**Bước 3 (hạng đầy đủ).** Với mọi $v\ne0$, hạng cột đầy đủ cho $Av\ne0$, nên $v^\top A^\top Av=\|Av\|^2>0$. Vì thế $A^\top A$ khả nghịch, cho (12.5) và nghiệm duy nhất. Nếu hạng thiếu, $\ker A$ chứa một vector khác $0$, nên từ Bước 2 có nhiều hệ số tối ưu. $\square$
:::

Trong học máy, Định lý 12.3 giải quyết phần tối ưu của hồi quy tuyến tính với các đặc trưng cố định. Nó không xác nhận rằng trung bình thật tuyến tính theo các đặc trưng đó, cũng không đánh giá sai số do chỉ có một mẫu hữu hạn. Việc tăng số đặc trưng có thể làm giảm phần dư huấn luyện trong khi làm vấn đề nhận dạng hệ số khó hơn.

::: example Ví dụ 12.1 (Hồi quy từ ba số đo, điều chỉnh từ nguồn khởi đầu)
**Dữ liệu và mô hình.** Ba cặp là $(0,1)$, $(1,2)$, $(2,2)$. Giả sử các đầu ra độc lập có điều kiện, $Y_i\mid x_i\sim\mathcal N(w_0+w_1x_i,\sigma^2)$, với $\sigma^2>0$ cố định.

**Lập hệ.** Ta có

$$
A=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix},\quad
y=\begin{pmatrix}1\\2\\2\end{pmatrix},\quad
A^\top A=\begin{pmatrix}3&3\\3&5\end{pmatrix},\quad
A^\top y=\begin{pmatrix}5\\6\end{pmatrix}.
$$

Định thức của $A^\top A$ là $6>0$. Giải $3w_0+3w_1=5$ và $3w_0+5w_1=6$ cho

$$
\hat w_1=\frac12,\qquad \hat w_0=\frac76.
$$

**Phần dư và kiểm tra.** Các giá trị khớp là $(7/6,5/3,13/6)$; các phần dư $y_i-\hat y_i$ là $(-1/6,1/3,-1/6)$. Tổng bình phương phần dư bằng $1/6$. Ta có $\sum_i r_i=0$ và $\sum_i x_ir_i=0$, đúng với $A^\top r=0$.

**Diễn giải.** Hệ số tối ưu không đi qua cả ba điểm vì chúng không thẳng hàng. Nếu học thêm phương sai trong cùng mô hình, phần dư dương cho $\hat\sigma^2=(1/6)/3=1/18$, theo phép tối ưu phương sai như Định lý 11.9.
:::

::: example Ví dụ 12.2 (Hệ số không duy nhất nhưng giá trị khớp duy nhất)
**Dữ liệu.** Hai cặp đầu vào–đầu ra là $(1,2)$ và $(1,4)$. Dùng trung bình $w_0+w_1x$ và phương sai Gaussian cố định.

**Tối ưu.** Ma trận thiết kế có hai hàng cùng bằng $(1,1)$, nên hạng bằng $1<2$. Đặt $c=w_0+w_1$. Mục tiêu là $(2-c)^2+(4-c)^2=2(c-3)^2+2$, cực tiểu khi $c=3$.

**Kiểm tra và giới hạn.** Mọi cặp $(w_0,w_1)$ có tổng bằng $3$ là nghiệm; chúng đều khớp vector $(3,3)^\top$. Tuy nhiên, tại đầu vào mới $x=0$, các nghiệm $(3,0)$ và $(0,3)$ dự đoán lần lượt $3$ và $0$. Do đó tính duy nhất trên dữ liệu đã thấy chưa xác định duy nhất phép ngoại suy.
:::

::: remark Nhận xét 12.4 (Phương sai đã biết, phương sai chưa biết và phương sai thay đổi)
1. Nếu học thêm một phương sai chung và phần dư tối ưu $\mathrm{SSE}>0$, phép tối ưu theo phương sai cho $\hat\sigma^2=\mathrm{SSE}/n$. Nếu có nghiệm khớp hoàn hảo và phương sai được phép tiến về $0$, hợp lý Gaussian không bị chặn; khi đó không có MLE chung với phương sai dương.
2. Nếu phương sai đã biết nhưng thay đổi theo quan sát thành $\sigma_i^2$, âm log-hợp lý theo trung bình cho tổng bình phương có trọng số $\sum_i(y_i-m_\theta(x_i))^2/(2\sigma_i^2)$, thay vì tổng không trọng số.
3. Dưới giả thiết có mômen bậc hai, mất mát bình phương còn có thể được dùng để ước lượng trung bình có điều kiện mà không giả sử Gaussian. Khi đó lý do lựa chọn tiêu chuẩn là một tính chất của rủi ro bình phương, không phải kết luận rằng hợp lý thật là Gaussian.
:::

::: exercise Bài tập 12.1 (Củng cố: mô hình và nghiệm hồi quy)
Cho các cặp $(0,1)$, $(1,3)$, $(2,5)$ và mô hình Gaussian có trung bình $w_0+w_1x$, phương sai chung đã biết $\sigma^2>0$. Suy ra mục tiêu từ mật độ và tìm hệ số MLE. Giải thích điều gì thay đổi nếu phương sai cũng chưa biết.
:::

::: hint Gợi ý Bài tập 12.1
Dùng Mệnh đề 12.2 rồi kiểm tra một đường thẳng qua cả ba điểm. Phân biệt tối ưu theo hệ số với tối ưu chung cả phương sai.
:::

::: solution Lời giải Bài tập 12.1
Âm log-hợp lý bằng $\frac32\log(2\pi\sigma^2)+(2\sigma^2)^{-1}\sum_i(y_i-w_0-w_1x_i)^2$. Với $\sigma^2$ cố định, đường $\hat y=1+2x$ cho tổng bình phương bằng $0$ và là nghiệm duy nhất do hai cột của ma trận thiết kế độc lập.

Nếu phương sai cũng chưa biết, giữ $(w_0,w_1)=(1,2)$ rồi cho $\sigma^2\downarrow0$ làm hợp lý tăng vô hạn. Khi đó không có MLE chung trong mô hình phương sai dương, dù bài toán bình phương tối thiểu theo hệ số có nghiệm.
:::

Định nghĩa 12.1 cho phép học một phân phối đầu ra phụ thuộc đặc trưng; Mệnh đề 12.2 biến giả thiết Gaussian thành mất mát bình phương. Định lý 12.3 giải bài toán tối ưu tuyến tính và Nhận xét 12.4 xác định giới hạn của từng giả thiết về phương sai. Với nhãn nhị phân, chúng ta cần thay mật độ Gaussian bằng xác suất Bernoulli trước khi suy ra một mất mát khác.

## 12.2. Hợp lý logistic và entropy chéo nhị phân

Một bộ nhận dạng sản phẩm lỗi phải dự đoán một trong hai nhãn, nhưng còn có thể cần một xác suất để mô tả độ chắc chắn của dự đoán. Nếu gán nhãn $0,1$ rồi dùng trực tiếp mô hình đầu ra Gaussian, miền giá trị và phân phối đầu ra không còn phù hợp với nhãn nhị phân. Chúng ta dùng phân phối Bernoulli có tham số thay đổi theo đặc trưng.

Một cách trực quan, tham số chung điều khiển cách xác suất lỗi thay đổi khi đặc trưng thay đổi. Mô hình phải giữ mọi xác suất trong khoảng $[0,1]$; hàm sigmoid thực hiện điều này với mọi điểm số hữu hạn. Đây là trực giác của cách tham số hóa, chưa phải một giả thiết rằng log-tỉ số xác suất của bài toán thật là tuyến tính.

::: definition Định nghĩa 12.5 (Mô hình Bernoulli có điều kiện và logistic)
Một mô hình nhãn nhị phân chỉ định

$$
Y\mid X=x\sim\operatorname{Bernoulli}(p_\theta(x)),
\qquad
\mathbb P_\theta(Y=y\mid X=x)
=p_\theta(x)^y[1-p_\theta(x)]^{1-y}.
$$

Trong mô hình logistic với đặc trưng $\phi(x)\in\mathbb R^p$, đặt

$$
p_w(x)=\operatorname{sigm}(w^\top\phi(x)),
\qquad
\operatorname{sigm}(z)=\frac1{1+e^{-z}}.
\tag{12.6}
$$

Một tọa độ của $\phi(x)$ có thể bằng $1$ để chứa hệ số tự do. Với một đầu vào vô hướng, ta cũng viết $p_{w,b}(x)=\operatorname{sigm}(wx+b)$.
:::

Định nghĩa 12.5 tổng quát hóa mô hình Bernoulli của Bài 11: xác suất không còn là một số chung cho mọi đầu vào, nhưng được ràng buộc bởi một vector tham số chung. Với điểm số hữu hạn, $0<p_w(x)<1$, nên cả hai nhãn đều có xác suất dương. Đẳng thức $\log[p_w(x)/(1-p_w(x))]=w^\top\phi(x)$ giải thích giả thiết tuyến tính được đặt lên log-tỉ số xác suất, thay vì lên chính xác suất.

Từ Định nghĩa 12.1 và 12.5, phép lấy âm log cho kết quả tiếp theo. Nguồn đối chiếu là Murphy (2022), §4.2.3, §4.3 và §10.2.3.

::: proposition Mệnh đề 12.6 (Hợp lý Bernoulli dẫn tới entropy chéo)
**Giả thiết.** Các nhãn độc lập có điều kiện theo đầu vào, với phân phối Bernoulli có xác suất $p_\theta(x_i)\in(0,1)$.

**Kết luận.** Âm log-hợp lý trung bình bằng

$$
\hat L_n(\theta)
=-\frac1n\sum_{i=1}^n\left[
 y_i\log p_\theta(x_i)+(1-y_i)\log(1-p_\theta(x_i))
\right].
\tag{12.7}
$$

Đây là **mất mát entropy chéo nhị phân** (binary cross-entropy). Tối thiểu hóa (12.7) tương đương cực đại hóa hợp lý có điều kiện, khi một nghiệm hữu hạn tồn tại.

**Điều kiện áp dụng.** Nhãn thuộc $\{0,1\}$ và hợp lý được xây dựng đúng với giả thiết lấy mẫu. Nếu cho xác suất bằng $0$ hoặc $1$, cần dùng quy ước log mở rộng và phân tích biên riêng.

**Phạm vi.** Entropy chéo đánh giá xác suất được gán cho nhãn thật; nó khác mất mát $0$–$1$ chỉ đánh giá nhãn sau khi lấy ngưỡng.
:::

::: proof Chứng minh Mệnh đề 12.6
**Bước 1 (lập hợp lý).** Độc lập có điều kiện cho $L(\theta)=\prod_i p_\theta(x_i)^{y_i}[1-p_\theta(x_i)]^{1-y_i}$.

**Bước 2 (lấy log).** Lấy âm log và chia cho $n$ cho (12.7). Hệ số $1/n$ dương nên không thay đổi tập nghiệm của bài toán tối ưu. $\square$
:::

Trong học máy, $p_\theta$ là bộ dự đoán xác suất. Nếu cần nhãn, ta có thể chọn $h_\theta(x)=\mathbf1_{\{p_\theta(x)\ge1/2\}}$. Với logistic, đây là $\mathbf1_{\{w^\top\phi(x)\ge0\}}$. Hai bộ tham số có thể cho cùng nhãn trên mọi đầu vào nhưng khác entropy chéo; do đó việc cải thiện hợp lý và việc giảm số lần phân loại sai là hai tiêu chuẩn khác nhau.

::: example Ví dụ 12.3 (Cùng nhãn, khác xác suất)
**Dữ kiện.** Một quan sát có nhãn $y=1$. Hai mô hình gán xác suất nhãn $1$ lần lượt $p=0.6$ và $q=0.9$.

**Tính.** Cả hai bộ phân loại sau ngưỡng $1/2$ đều dự đoán nhãn $1$, nên mất mát $0$–$1$ bằng $0$. Entropy chéo lần lượt là $-\log0.6\approx0.511$ và $-\log0.9\approx0.105$.

**Kiểm tra và diễn giải.** Khi nhãn thật bằng $1$, xác suất lớn hơn làm âm log nhỏ hơn. Nếu nhãn thật đổi thành $0$, hai mất mát trở thành $-\log0.4\approx0.916$ và $-\log0.1\approx2.303$. Việc dự đoán tự tin hơn làm tăng hình phạt nếu gán xác suất nhỏ cho nhãn thực sự xuất hiện.
:::

::: example Ví dụ 12.4 (Hai nhãn đối xứng, điều chỉnh từ nguồn khởi đầu)
**Dữ liệu và mô hình.** Hai cặp là $(-1,0)$ và $(1,1)$. Dùng $p_w(x)=\operatorname{sigm}(wx)$, không có hệ số tự do, với hai nhãn độc lập khi biết đầu vào.

**Tính tại hai tham số.** Khi $w=0$, mỗi nhãn thật nhận xác suất $1/2$, nên $\hat L_2(0)=\log2\approx0.6931$. Khi $w=\log3$, ta có $p_w(1)=3/4$, $p_w(-1)=1/4$ và

$$
\hat L_2(\log3)
=-\frac12\left[\log\frac34+\log\left(1-\frac14\right)\right]
=-\log\frac34\approx0.2877.
$$

**Kiểm tra và giới hạn.** Xác suất của cả hai nhãn thật đều bằng $3/4$, nên trung bình âm log bằng âm log của chính số đó. Tham số $\log3$ khớp hai nhãn tốt hơn theo entropy chéo; phép tính này chưa chứng minh nó có rủi ro thấp hơn trên phân phối quan sát mới.
:::

### Mất mát có cận dưới nhưng không có nghiệm hữu hạn

Với hai điểm của Ví dụ 12.4, ta có công thức chính xác

$$
\hat L_2(w)=\log(1+e^{-w}).
\tag{12.8}
$$

Mọi $w$ hữu hạn cho $\hat L_2(w)>0$, nhưng $\hat L_2(w)\downarrow0$ khi $w\to+\infty$. Đạo hàm $-1/(1+e^w)<0$ xác nhận không có điểm cực tiểu hữu hạn. Tương đương, hợp lý tiến tới cận trên $1$ nhưng không đạt được.

::: remark Nhận xét 12.7 (Dữ liệu tách được và giới hạn của MLE logistic)
Trong Ví dụ 12.4, đầu vào âm mang nhãn $0$ và đầu vào dương mang nhãn $1$, nên một ngưỡng tại $0$ phân loại hoàn hảo. Tuy vậy không có tham số logistic hữu hạn cực đại hóa hợp lý không chính quy hóa.

Đây là một trường hợp cụ thể của hiện tượng dữ liệu tách được. Tính lồi của âm log-hợp lý không tự bảo đảm tồn tại điểm cực tiểu trên miền tham số không bị chặn. Ràng buộc chuẩn hoặc thêm chính quy hóa có thể tạo một bài toán khác có nghiệm; khi dùng phải nêu số hạng và tiêu chuẩn mới.
:::

Trong học máy, cùng ví dụ cho thấy “đã phân loại đúng hết” không có nghĩa quá trình tăng hợp lý phải dừng ở một vector hữu hạn. Với mọi $w>0$, nhãn sau ngưỡng trên hai điểm đều đúng; tăng $w$ tiếp tục đổi độ tự tin. Khi bàn về tổng quát hóa, ta phải chỉ rõ đang đánh giá entropy chéo hay mất mát $0$–$1$, vì chúng có giả thiết và bảo đảm khác nhau.

::: exercise Bài tập 12.2 (Củng cố: cực tiểu không đạt được)
Với hai cặp $(-1,0)$, $(1,1)$ và mô hình $p_w(x)=\operatorname{sigm}(wx)$, suy ra (12.8). Chứng minh không có MLE hữu hạn. Tính rủi ro thực nghiệm $0$–$1$ của bộ phân loại $h_w(x)=\mathbf1_{\{wx\ge0\}}$ khi $w>0$ và khi $w=0$.
:::

::: hint Gợi ý Bài tập 12.2
Hai xác suất gán cho nhãn đúng đều bằng $\operatorname{sigm}(w)$. Ở $w=0$, quy ước dấu $\ge$ quyết định nhãn dự đoán.
:::

::: solution Lời giải Bài tập 12.2
Ta có $\hat L_2(w)=-\log\operatorname{sigm}(w)=\log(1+e^{-w})$. Hàm dương với mọi $w$ hữu hạn, giảm chặt và tiến tới $0$ khi $w\to+\infty$; do đó cận dưới không đạt được và không có MLE hữu hạn.

Khi $w>0$, bộ phân loại cho nhãn $0$ tại $-1$ và $1$ tại $1$, nên rủi ro thực nghiệm $0$–$1$ bằng $0$. Khi $w=0$, cả hai điểm số bằng $0$ nên cả hai dự đoán là $1$; chỉ một nhãn đúng, rủi ro thực nghiệm bằng $1/2$.
:::

Định nghĩa 12.5 chuyển xác suất Bernoulli thành một hàm theo đặc trưng; Mệnh đề 12.6 suy ra entropy chéo từ hợp lý. Nhận xét 12.7 chỉ ra giới hạn tồn tại nghiệm ngay trong một bài toán lồi hai điểm. Các phép tối ưu vẫn chỉ dùng dữ liệu đã thấy; để phát biểu về dữ liệu mới, ta cần một kỳ vọng theo phân phối đích.

## 12.3. Rủi ro tổng thể, rủi ro thực nghiệm và nguyên lý học

Một bộ phân loại có thể dự đoán đúng toàn bộ vài nhãn huấn luyện. Để biết kết quả đó có thể hiện năng lực dự đoán hay chỉ là khớp một mẫu nhỏ, chúng ta cần mô tả cách xuất hiện của một quan sát mới. Bài toán học vì vậy không kết thúc ở giá trị mục tiêu trên tập huấn luyện.

Một cách trực quan, rủi ro tổng thể lấy trung bình mất mát trên mọi quan sát có thể xuất hiện theo phân phối đích, còn rủi ro thực nghiệm chỉ lấy trung bình trên những quan sát đã thấy. Đây là trực giác của hai phép trung bình; định nghĩa cần nêu cả mất mát và phân phối sinh dữ liệu.

### Hai loại rủi ro và quy tắc dự đoán

::: definition Định nghĩa 12.8 (Bài toán học có giám sát và hai loại rủi ro)
Cho phân phối đích $P$ của $(X,Y)\in\mathcal X\times\mathcal Y$, lớp $\mathcal H$ gồm các hàm dự đoán đo được và hàm mất mát đo được $\ell(a,y)\ge0$. Mẫu huấn luyện $S=((X_i,Y_i))_{i=1}^n$ được rút i.i.d. từ $P$; quan sát mới cũng có phân phối $P$ và độc lập với mẫu.

Với một bộ dự đoán cố định $h$, **rủi ro tổng thể** (population risk) là

$$
R_P(h)=\mathbb E_{(X,Y)\sim P}[\ell(h(X),Y)].
\tag{12.9}
$$

Với dữ liệu đã quan sát, **rủi ro thực nghiệm** (empirical risk) là

$$
\hat R_S(h)=\frac1n\sum_{i=1}^n\ell(h(x_i),y_i).
\tag{12.10}
$$

Trong bài toán nhị phân, nếu $h:\mathcal X\to\{0,1\}$ và $\ell(h(x),y)=\mathbf1_{\{h(x)\ne y\}}$ là **mất mát $0$–$1$**, thì $R_P(h)=\mathbb P(h(X)\ne Y)$. Khi $P,S$ đã rõ, ta viết gọn $R(h)$ và $\hat R_n(h)$.
:::

Định nghĩa 12.8 bổ sung phân phối đích vào bài toán tối ưu. Mất mát trong (12.9) có thể là bình phương, entropy chéo hoặc mất mát $0$–$1$, nhưng chúng cho các rủi ro khác nhau. Đánh giá một bộ dự đoán xác suất bằng entropy chéo cũng khác đánh giá bộ phân loại đã lấy ngưỡng bằng tỉ lệ lỗi.

Với $h$ cố định độc lập với mẫu và mất mát khả tích, tính tuyến tính của kỳ vọng cho $\mathbb E_S[\hat R_S(h)]=R(h)$. Khi $h=\hat h_S$ được chọn bằng chính mẫu, các số hạng mất mát còn phụ thuộc vào mẫu qua cả bộ dự đoán. Không thể áp dụng lập luận cho một $h$ cố định mà không xử lý sự phụ thuộc đó.

Trong một mô hình nhị phân, ta còn có thể xác định quy tắc tốt nhất nếu phân phối đích được biết. Kết quả sau dựa trên lý thuyết quyết định ở Murphy (2022), §5.1; nó là chuẩn so sánh cho phần sai số xấp xỉ, không phải thủ tục có thể tính từ mọi mẫu hữu hạn.

::: proposition Mệnh đề 12.9 (Quy tắc Bayes cho mất mát $0$–$1$)
**Giả thiết.** $Y\in\{0,1\}$, $q(x)=\mathbb P(Y=1\mid X=x)$ có một phiên bản đo được, và mất mát là $0$–$1$.

**Kết luận.** Một bộ phân loại có rủi ro nhỏ nhất trong tất cả các hàm đo được là

$$
h^*(x)=\mathbf1_{\{q(x)\ge1/2\}},
\qquad
R^*=R(h^*)=\mathbb E[\min\{q(X),1-q(X)\}].
\tag{12.11}
$$

**Điều kiện áp dụng.** Quy tắc chọn nhãn tại $q(x)=1/2$ có thể thay đổi mà không đổi rủi ro. Hàm $q$ được xác định bởi phân phối thật, không mặc nhiên trùng với xác suất logistic đã ước lượng.

**Phạm vi.** Nếu chi phí hai loại sai khác nhau, ngưỡng quyết định có thể khác $1/2$. Công thức này dành cho mất mát $0$–$1$ với hai loại sai có cùng chi phí.
:::

::: proof Chứng minh Mệnh đề 12.9
**Bước 1 (so sánh tại một đầu vào).** Khi biết $X=x$, dự đoán $0$ sai với xác suất $q(x)$; dự đoán $1$ sai với xác suất $1-q(x)$. Chọn $1$ khi $q(x)\ge1/2$ đạt mất mát có điều kiện nhỏ nhất, bằng $\min\{q(x),1-q(x)\}$.

**Bước 2 (lấy kỳ vọng).** Mọi bộ phân loại khác có mất mát kỳ vọng có điều kiện không nhỏ hơn ở từng $x$. Lấy kỳ vọng theo $X$ và dùng quy tắc kỳ vọng toàn phần cho (12.11). $\square$
:::

Trong học máy, một mô hình xác suất $p_\theta(x)$ cố gắng xấp xỉ một đặc trưng của phân phối có điều kiện; quy tắc lấy ngưỡng biến nó thành quyết định nhãn. Mệnh đề 12.9 giải thích ngưỡng $1/2$ khi chi phí là mất mát $0$–$1$. Tuy nhiên, một ước lượng $p_\theta$ từ ít dữ liệu chưa chắc gần $q$, nên tối ưu hợp lý chưa đạt được quy tắc Bayes.

::: example Ví dụ 12.5 (Rủi ro trên một phân phối hữu hạn)
**Phân phối.** Cho $\mathbb P(X=-1)=\mathbb P(X=1)=1/2$, $q(-1)=1/5$ và $q(1)=4/5$.

**Tính rủi ro.** Bộ phân loại luôn dự đoán $0$ có rủi ro $\frac12(1/5)+\frac12(4/5)=1/2$. Bộ luôn dự đoán $1$ cũng có rủi ro $1/2$. Ngưỡng $h_0(x)=\mathbf1_{\{x\ge0\}}$ sai với xác suất $1/5$ ở mỗi đầu vào, nên $R(h_0)=1/5$.

**Kiểm tra và diễn giải.** Mệnh đề 12.9 cho $h^*=h_0$ trên giá của $X$ và $R^*=1/5$. Không bộ phân loại tất định nào có rủi ro bằng $0$ trong mô hình này vì nhãn vẫn có nhiễu khi đầu vào đã biết. Nếu lớp chỉ chứa hai hàm hằng, rủi ro tốt nhất trong lớp bằng $1/2$, cao hơn chuẩn Bayes một lượng $3/10$.
:::

### Lựa chọn từ mẫu và tối ưu thực nghiệm

Rủi ro $R(h)$ trong (12.9) thường không tính được vì $P$ chưa biết. Rủi ro thực nghiệm có thể tính từ dữ liệu; đó là căn cứ cho một nguyên lý học, nhưng cần được phân biệt với mục tiêu cuối cùng là rủi ro tổng thể nhỏ. Nguồn đối chiếu là Murphy (2022), §4.3 và §5.4, cùng Shalev-Shwartz và Ben-David (2014), Chương 3–4.

::: definition Định nghĩa 12.10 (Tối thiểu hóa rủi ro thực nghiệm)
Với lớp $\mathcal H$ được chọn trước khi quan sát mẫu, một quy tắc **tối thiểu hóa rủi ro thực nghiệm** (empirical risk minimization, ERM) chọn

$$
\hat h_S\in\underset{h\in\mathcal H}{\operatorname{argmin}}\,\hat R_S(h)
\tag{12.12}
$$

khi cực tiểu tồn tại. Với $\eta\ge0$, một nghiệm **tối ưu thực nghiệm gần đúng** thỏa

$$
\hat R_S(\hat h_S)\le\inf_{h\in\mathcal H}\hat R_S(h)+\eta.
\tag{12.13}
$$

Đặt $R_\mathcal H^*=\inf_{h\in\mathcal H}R(h)$. Đây là rủi ro tốt nhất trong lớp, không nhất thiết đạt được tại một phần tử của lớp.
:::

Định nghĩa 12.10 lựa chọn một hàm ngẫu nhiên $\hat h_S$ từ mẫu, thay vì đánh giá một $h$ cố định. Mệnh đề 11.3 là một trường hợp của nguyên lý này với mất mát âm log của mô hình xác suất. Nếu mất mát là $0$–$1$, ERM tối thiểu hóa tỉ lệ phân loại sai trên mẫu; nó không còn là cùng bài toán tối ưu với entropy chéo logistic.

Tối ưu gần đúng dùng cận dưới đúng nên không yêu cầu có nghiệm cực tiểu hữu hạn. Với Ví dụ 12.4, mọi $\eta>0$ đều cho một tham số logistic hữu hạn có entropy chéo trong phạm vi $\eta$ của cận dưới $0$, dù không có nghiệm chính xác. Phát biểu về ERM chính xác phải giữ điều kiện tồn tại nghiệm đó.

::: example Ví dụ 12.6 (Khớp mọi nhãn vẫn có thể sai một nửa)
**Phân phối và lớp.** Cho $X$ đều trên $[0,1]$ và $Y$ là Bernoulli$(1/2)$ độc lập với $X$. Lớp $\mathcal H$ chứa các hàm đo được $[0,1]\to\{0,1\}$. Dùng mất mát $0$–$1$.

**Quy tắc chọn từ mẫu.** Với xác suất $1$, các đầu vào huấn luyện khác nhau. Chọn $\hat h_S$ trả lại nhãn đã quan sát ở từng đầu vào huấn luyện và trả $0$ ở mọi điểm khác. Hàm này đo được và có $\hat R_S(\hat h_S)=0$.

**Rủi ro mới.** Với một quan sát mới độc lập, nhãn vẫn là đồng xu công bằng khi biết cả $X$ và mẫu. Bất kể dự đoán là gì, xác suất sai bằng $1/2$. Do đó $R(\hat h_S)=1/2$, trong khi rủi ro thực nghiệm bằng $0$.

**Kiểm tra.** Với mọi $h$ cố định, kỳ vọng rủi ro thực nghiệm bằng $R(h)=1/2$. Đối với hàm được chọn từ mẫu, $\mathbb E_S[\hat R_S(\hat h_S)]=0$ còn $\mathbb E_S[R(\hat h_S)]=1/2$. Sự khác nhau đến từ việc dùng chính nhãn để chọn hàm, không mâu thuẫn với tính không chệch cho một $h$ cố định. Trong ví dụ nhiễu này, mọi bộ phân loại đều có rủi ro $1/2$, nên nó minh họa độ lệch đánh giá khi lựa chọn theo mẫu, không minh họa rủi ro dư dương so với Bayes.
:::

### Tính rủi ro chính xác cho một lớp ngưỡng

Để tính khoảng cách giữa hai tiêu chuẩn mà không cần ước lượng thêm, ta xét một mô hình đích đơn giản có thể tích phân bằng tay: $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf1_{\{X\ge0\}}$. Ta dùng lớp các ngưỡng một chiều $h_t(x)=\mathbf1_{\{x\ge t\}}$ với $t\in[-1,1]$ trong phép tính này.

Một cách trực quan, ngưỡng sai chỉ phân loại khác ngưỡng thật trên đoạn nằm giữa hai ngưỡng. Phân phối đều chuyển độ dài đoạn đó thành xác suất. Đây là trực giác của phép tích phân; dấu bất đẳng thức ở ngưỡng vẫn cần được giữ đúng khi tính sai số trên một mẫu hữu hạn.

::: proposition Mệnh đề 12.11 (Rủi ro của ngưỡng một chiều)
**Giả thiết.** $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf1_{\{X\ge0\}}$, $h_t(x)=\mathbf1_{\{x\ge t\}}$ với $t\in[-1,1]$, mất mát $0$–$1$.

**Kết luận.**

$$
R(h_t)=\frac{|t|}{2}.
\tag{12.14}
$$

Với mẫu có đầu vào $(-0.8,-0.2,0.3,0.7)$ và nhãn $(0,0,1,1)$, các nghiệm ERM là đúng toàn bộ các ngưỡng

$$
-0.2<t\le0.3.
\tag{12.15}
$$

**Điều kiện áp dụng.** Công thức rủi ro dùng phân phối đều và ngưỡng thật bằng $0$; khoảng nghiệm mẫu dùng quy ước dự đoán $1$ khi $x\ge t$.

**Phạm vi.** Các nghiệm có cùng rủi ro thực nghiệm không nhất thiết có cùng rủi ro tổng thể. Độ dài đoạn không chuyển thành xác suất bằng cách chia $2$ nếu phân phối đầu vào thay đổi.
:::

::: proof Chứng minh Mệnh đề 12.11
**Bước 1 (rủi ro tổng thể).** Nếu $t\ge0$, hai bộ phân loại khác nhau trên $[0,t)$, có độ dài $t$. Nếu $t<0$, chúng khác nhau trên $[t,0)$, có độ dài $-t$. Mật độ của $X$ bằng $1/2$ trên $[-1,1]$, nên xác suất sai trong cả hai trường hợp là $|t|/2$. Các điểm đầu mút có xác suất bằng $0$.

**Bước 2 (ràng buộc từ mẫu âm).** Để dự đoán $0$ tại cả $-0.8$ và $-0.2$, cần $t>-0.8$ và $t>-0.2$, tương đương $t>-0.2$.

**Bước 3 (ràng buộc từ mẫu dương).** Để dự đoán $1$ tại cả $0.3$ và $0.7$, cần $t\le0.3$ và $t\le0.7$, tương đương $t\le0.3$. Giao hai điều kiện là (12.15). Các ngưỡng này đạt sai số thực nghiệm bằng $0$, là cực tiểu do mất mát không âm; mọi ngưỡng ngoài khoảng sai ít nhất một nhãn. $\square$
:::

Trong học máy, Mệnh đề 12.11 cho một trường hợp mà tối ưu thực nghiệm đã được giải hoàn toàn nhưng lựa chọn giữa các nghiệm vẫn ảnh hưởng đến chất lượng dự đoán. Lựa chọn một nghiệm duy nhất bằng quy tắc phá hòa không tự tạo thêm dữ liệu về vị trí ngưỡng thật. Việc kiểm soát rủi ro cần một lập luận thống kê về lớp các nghiệm có thể được chọn.

::: example Ví dụ 12.7 (Cùng sai số mẫu, khác rủi ro thật; điều chỉnh từ nguồn khởi đầu)
**Phân phối và mẫu.** Dùng mô hình $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf1_{\{X\ge0\}}$ và bốn cặp $(-0.8,0)$, $(-0.2,0)$, $(0.3,1)$, $(0.7,1)$.

**Tính.** Ngưỡng $t=0.4$ có rủi ro $0.4/2=0.2$ và sai một trong bốn nhãn, nên rủi ro thực nghiệm là $1/4$. Ngưỡng $t=0$ có cả hai loại rủi ro bằng $0$. Các ngưỡng $t=-0.1$ và $t=0.3$ đều đạt rủi ro thực nghiệm bằng $0$, nhưng rủi ro tổng thể lần lượt là $0.05$ và $0.15$.

**Kiểm tra đầu mút.** Tại $t=-0.2$, điểm $x=-0.2$ bị dự đoán thành $1$, nên đầu trái không thuộc tập nghiệm. Tại $t=0.3$, điểm dương $x=0.3$ vẫn được dự đoán là $1$, nên đầu phải thuộc tập nghiệm. Việc bỏ qua một điểm không ảnh hưởng xác suất trong phân phối liên tục nhưng có thể đổi sai số trên mẫu hữu hạn.
:::

![Rủi ro tổng thể dạng chữ V và rủi ro thực nghiệm dạng bậc thang của ngưỡng một chiều; khoảng nghiệm thực nghiệm âm 0.2 đến 0.3 chứa các ngưỡng có rủi ro tổng thể khác nhau.](img/lec-12/threshold-risks.svg)

*Hình 12.1. Với phân phối đều và bốn đầu vào của Ví dụ 12.7, đồ thị tổng thể đạt cực tiểu tại $t=0$, còn rủi ro mẫu bằng $0$ trên $(-0.2,0.3]$. Vùng rủi ro mẫu bằng $0$ chứa những bộ phân loại có xác suất sai khác nhau.*

::: exercise Bài tập 12.3 (Củng cố: tích phân và khoảng nghiệm)
Cho $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf1_{\{X\ge0\}}$, bộ phân loại $h_t(x)=\mathbf1_{\{x\ge t\}}$ và mất mát $0$–$1$, như trong Mệnh đề 12.11. Tính $R(h_{-0.4})$ và $R(h_{0.2})$. Với mẫu đầu vào $(-0.9,-0.1,0.4,0.8)$ có nhãn đúng, tìm toàn bộ nghiệm ERM và hai nghiệm có rủi ro tổng thể khác nhau.
:::

::: hint Gợi ý Bài tập 12.3
Xác định mẫu âm lớn nhất và mẫu dương nhỏ nhất. Dấu ở hai đầu khoảng phụ thuộc định nghĩa $h_t(x)=\mathbf1_{\{x\ge t\}}$.
:::

::: solution Lời giải Bài tập 12.3
Từ (12.14), $R(h_{-0.4})=0.2$ và $R(h_{0.2})=0.1$. Mọi nhãn mẫu đúng khi $-0.1<t\le0.4$; đây là toàn bộ nghiệm ERM. Chẳng hạn $t=0$ cho rủi ro $0$, còn $t=0.4$ cho rủi ro $0.2$, dù cả hai có rủi ro thực nghiệm bằng $0$.
:::

Định nghĩa 12.8 phân biệt tiêu chuẩn có thể tính từ mẫu với tiêu chuẩn cần cho dữ liệu mới; Mệnh đề 12.9 xác định chuẩn Bayes khi phân phối thật được biết. Định nghĩa 12.10 chọn mô hình bằng rủi ro mẫu, nhưng Mệnh đề 12.11 cho thấy ngay cả một lớp ngưỡng đơn giản cũng có nhiều nghiệm mẫu với rủi ro thật khác nhau. Bước tiếp theo là kiểm soát đồng thời độ lệch của mọi mô hình mà quy tắc học có thể chọn.

## 12.4. Tổng quát hóa, học PAC và độ phức tạp của lớp một chiều

Định lý 05c.52 đã kiểm soát rủi ro thực nghiệm tại một tham số cố định độc lập với tập đánh giá. Khi chính dữ liệu dùng để chọn mô hình, việc áp dụng kết quả đó cho từng mô hình riêng lẻ chưa đủ. Chúng ta cần một biến cố mà trên đó mọi mô hình có thể được chọn đều được đánh giá gần đúng cùng lúc.

Một cách trực quan, một lớp chứa nhiều cách giải thích dữ liệu tạo ra nhiều cơ hội để chọn được một lời giải có sai số mẫu thấp do ngẫu nhiên. Kiểm soát đồng thời các mô hình phải tính đến phạm vi lựa chọn đó. Đây là trực giác về độ phức tạp lớp; số chiều của đầu vào không tự đo được phạm vi ấy.

### Từ một mô hình cố định đến một lớp hữu hạn

Để có một kết quả hoàn chỉnh với hằng số cụ thể, ta bắt đầu bằng một lớp hữu hạn và mất mát bị chặn. Đây là bước phát triển của lập luận Hoeffding và phép hợp đã xuất hiện trong Bài 05c: đích ở đây là bảo đảm cho mô hình được chọn từ chính mẫu huấn luyện.

::: lemma Bổ đề 12.12 (Độ lệch tại một mô hình cố định)
**Giả thiết.** $S$ gồm $n$ quan sát i.i.d. từ $P$, $h$ cố định độc lập với mẫu, và $0\le\ell(h(X),Y)\le1$ gần chắc chắn.

**Kết luận.** Với mọi $\varepsilon>0$,

$$
\mathbb P_S\left(|\hat R_S(h)-R(h)|>\varepsilon\right)
\le2e^{-2n\varepsilon^2}.
\tag{12.16}
$$

**Điều kiện áp dụng.** Các mất mát là biến ngẫu nhiên độc lập bị chặn trong $[0,1]$.

**Phạm vi.** Không thay trực tiếp $h$ bằng một hàm phụ thuộc mẫu trong lập luận này. Mất mát bình phương và entropy chéo không bị chặn nói chung nên không tự thỏa giả thiết.
:::

::: proof Chứng minh Bổ đề 12.12
Đặt $Z_i=\ell(h(X_i),Y_i)$. Vì $h$ cố định, các $Z_i$ độc lập, có cùng kỳ vọng $R(h)$ và nhận giá trị trong $[0,1]$. Áp dụng bất đẳng thức Hoeffding hai phía trong Định lý 05c.47 cho trung bình $n^{-1}\sum_iZ_i$ thu được (12.16). $\square$
:::

Bổ đề 12.12 là dạng mất mát của kết quả đã học, được phát biểu lại để chỉ ra đúng vị trí của giả thiết “cố định”. Ta cần một định nghĩa mới để diễn đạt độ lệch đồng thời trước khi dùng phép hợp.

::: definition Định nghĩa 12.13 (Độ lệch đều và tính hội tụ đều)
Với lớp hàm đo được $\mathcal H$ và mất mát $\ell$, giả sử mọi $R(h)$ và $\hat R_S(h)$ đang xét hữu hạn. Đặt

$$
\Delta_S=\sup_{h\in\mathcal H}|R(h)-\hat R_S(h)|.
\tag{12.17}
$$

Một biến cố **xấp xỉ đều** ở mức $\varepsilon$ là $\{\Delta_S\le\varepsilon\}$. Trên biến cố này, cùng một mẫu xấp xỉ rủi ro của mọi phần tử trong lớp.

Lớp có **tính hội tụ đều** nếu với mọi $\varepsilon,\delta\in(0,1)$, tồn tại cỡ mẫu $N_\mathcal H(\varepsilon,\delta)$ sao cho, với mọi phân phối đích trong phạm vi đang xét và mọi $n\ge N_\mathcal H(\varepsilon,\delta)$,

$$
\mathbb P_S(\Delta_S\le\varepsilon)\ge1-\delta.
\tag{12.18}
$$

Các biến cố xác suất được giả sử đo được. Điều này tự thỏa cho lớp hữu hạn; với lớp vô hạn cần kiểm tra điều kiện đo được thích hợp.
:::

So với Bổ đề 12.12, Định nghĩa 12.13 kiểm soát một biến cố chung cho cả lớp. Khi biến cố đó xảy ra, nó đúng cho mọi $h$, nên cũng đúng cho $\hat h_S$ dù quy tắc chọn có phụ thuộc mẫu. Đây là cách xử lý sự phụ thuộc đã làm ví dụ ghi nhớ khác với đánh giá một hàm cố định.

Kết quả sau kết hợp Bổ đề 12.12 với phép chặn xác suất hợp. Cơ sở là Shalev-Shwartz và Ben-David (2014), Chương 4, phần hội tụ đều cho lớp hữu hạn, và phép tập trung của Bài 05c.

::: theorem Định lý 12.14 (Hội tụ đều cho lớp hữu hạn)
**Giả thiết.** $\mathcal H$ là lớp cố định gồm $M\ge1$ hàm đo được, được chọn trước khi lấy mẫu. Mất mát nhận giá trị trong $[0,1]$, và $S$ gồm $n$ cặp i.i.d. từ cùng phân phối đích $P$.

**Kết luận.** Với mọi $\varepsilon>0$,

$$
\mathbb P_S(\Delta_S>\varepsilon)
\le2M e^{-2n\varepsilon^2}.
\tag{12.19}
$$

Với $\delta\in(0,1)$, đặt

$$
\varepsilon_n(M,\delta)=\sqrt{\frac{\log(2M/\delta)}{2n}}.
\tag{12.20}
$$

Khi đó $\mathbb P_S(\Delta_S\le\varepsilon_n(M,\delta))\ge1-\delta$. Đặc biệt, $n\ge\log(2M/\delta)/(2\varepsilon^2)$ là điều kiện đủ cho (12.18).

**Điều kiện áp dụng.** Lớp không được định nghĩa sau khi xem nhãn của chính mẫu rồi coi nó là một lớp cố định ban đầu. Các mất mát của những mô hình khác nhau không cần độc lập với nhau.

**Phạm vi.** Chặn trên là điều kiện đủ, có thể bảo thủ; nó không phải công thức rủi ro thật hay cỡ mẫu tối thiểu cần thiết.
:::

::: proof Chứng minh Định lý 12.14
**Bước 1 (liệt kê các biến cố xấu).** Với mỗi $h\in\mathcal H$, đặt $E_h=\{|R(h)-\hat R_S(h)|>\varepsilon\}$. Khi lớp hữu hạn, biến cố $\Delta_S>\varepsilon$ đúng khi ít nhất một $E_h$ xảy ra.

**Bước 2 (dùng phép hợp).** Bổ đề 12.12 cho $\mathbb P(E_h)\le2e^{-2n\varepsilon^2}$. Do đó

$$
\mathbb P_S(\Delta_S>\varepsilon)
=\mathbb P_S\left(\bigcup_{h\in\mathcal H}E_h\right)
\le\sum_{h\in\mathcal H}\mathbb P_S(E_h)
\le2M e^{-2n\varepsilon^2}.
$$

**Bước 3 (chọn mức sai số).** Thế (12.20) vào vế phải cho $2M\exp[-\log(2M/\delta)]=\delta$. Giải cùng bất đẳng thức theo $n$ cho điều kiện đủ đã nêu. $\square$
:::

Trong học máy, Định lý 12.14 cho phép dùng mẫu huấn luyện để chọn trong một danh sách mô hình định trước mà vẫn kiểm soát độ lệch của mô hình được chọn. Chi phí của việc chọn trong $M$ mô hình xuất hiện qua $\log M$. Chặn cho lớp một phần tử là trường hợp riêng đánh giá một mô hình cố định; chặn cho cả lớp mạnh hơn về phạm vi đồng thời nên phải trả thêm chi phí lựa chọn.

::: example Ví dụ 12.8 (Một cỡ mẫu đủ, không phải số mẫu tối thiểu)
**Bài toán.** Chọn một bộ phân loại trong danh sách $M=100$ hàm cố định, dùng mất mát $0$–$1$. Dữ liệu i.i.d. từ cùng phân phối đích. Muốn độ lệch của mọi hàm không quá $\varepsilon=0.05$ với xác suất ít nhất $0.95$, tức $\delta=0.05$.

**Tính.** Định lý 12.14 cho điều kiện đủ

$$
n\ge\frac{\log(2\cdot100/0.05)}{2(0.05)^2}
=\frac{\log4000}{0.005}\approx1658.81.
$$

Cỡ mẫu nguyên $n=1659$ đủ cho phát biểu này. Với $n=1000$, chặn độ lệch là $\sqrt{\log4000/2000}\approx0.0644$.

**Kiểm tra và diễn giải.** Log ở đây là log tự nhiên. Tăng $n$ làm chặn nhỏ đi; tăng $M$ làm chặn lớn lên. Số $1659$ đến từ một bất đẳng thức đủ; một lớp có cấu trúc đơn giản hơn có thể cần ít dữ liệu hơn chặn đếm toàn bộ phần tử này.
:::

### Từ hội tụ đều đến bảo đảm cho nghiệm gần đúng

Một biến cố hội tụ đều so sánh từng mô hình với chính nó trên hai loại rủi ro. Để đánh giá việc học, ta còn phải so sánh mô hình được chọn với mô hình tốt nhất trong lớp. Kết quả tiếp theo dùng tính tối ưu thực nghiệm của Định nghĩa 12.10; cơ sở là Shalev-Shwartz và Ben-David (2014), Chương 4.

::: theorem Định lý 12.15 (Rủi ro dư của tối ưu thực nghiệm gần đúng)
**Giả thiết.** Trên mẫu $S$, mọi rủi ro đang xét hữu hạn, $\Delta_S\le\varepsilon$, và $\hat h_S\in\mathcal H$ thỏa (12.13) với $\eta\ge0$.

**Kết luận.**

$$
R(\hat h_S)\le R_\mathcal H^*+2\varepsilon+\eta.
\tag{12.21}
$$

**Điều kiện áp dụng.** Biến cố xấp xỉ đều phải đúng trên toàn lớp được dùng để lựa chọn. Không cần giả thiết cận dưới đúng $R_\mathcal H^*$ đạt được tại một hàm.

**Phạm vi.** Với ERM chính xác, $\eta=0$. Kết quả so sánh với hàm tốt nhất trong lớp, không mặc nhiên với hàm Bayes nếu lớp không biểu diễn được quy tắc Bayes.
:::

::: proof Chứng minh Định lý 12.15
**Bước 1 (so với một đối thủ bất kỳ).** Với mọi $h\in\mathcal H$, hội tụ đều và tối ưu thực nghiệm gần đúng cho

$$
\begin{aligned}
R(\hat h_S)
&\le\hat R_S(\hat h_S)+\varepsilon\\
&\le\hat R_S(h)+\eta+\varepsilon\\
&\le R(h)+2\varepsilon+\eta.
\end{aligned}
$$

Lần dùng thứ nhất của hội tụ đều dành cho hàm được chọn; lần thứ hai dành cho hàm so sánh $h$.

**Bước 2 (lấy cận dưới đúng).** Vế trái không phụ thuộc $h$. Lấy cận dưới đúng của vế phải trên $\mathcal H$ cho (12.21). $\square$
:::

Trong học máy, Định lý 12.15 tách phần đảm bảo bởi tối ưu hóa khỏi phần cần có dữ liệu đại diện. Giảm $\eta$ giúp khi sai số tối ưu còn lớn, nhưng không tự giảm $\varepsilon$ hay cải thiện lớp mô hình. Kết hợp với Định lý 12.14 cho bảo đảm xác suất: với xác suất ít nhất $1-\delta$, rủi ro dư không quá $2\varepsilon_n(M,\delta)+\eta$.

Để nối với ba nguồn sai số, ta cần thêm một chuẩn so sánh ngoài lớp. Với phân loại $0$–$1$, chuẩn đó có thể là rủi ro Bayes trong Mệnh đề 12.9. Cơ sở đọc thêm là Shalev-Shwartz và Ben-David (2014), §4.1 và §5.2; ở đây phần xấp xỉ được tính vượt quá chuẩn Bayes, khác quy ước gọi toàn bộ rủi ro tốt nhất trong lớp là sai số xấp xỉ ở §5.2 của sách.

::: proposition Mệnh đề 12.16 (Một chặn theo ba nguồn sai số)
**Giả thiết.** Mất mát bị chặn trong $[0,1]$, $\mathcal H$ là lớp con của các bộ dự đoán đo được được dùng để định nghĩa chuẩn $R^*$. Đặt $R^*=\inf_hR(h)$ trên lớp chuẩn lớn hơn. Bộ dự đoán $\hat h_S\in\mathcal H$ có sai số tối ưu thực nghiệm

$$
\eta_S=\hat R_S(\hat h_S)-\inf_{h\in\mathcal H}\hat R_S(h)\ge0.
$$

**Kết luận.**

$$
R(\hat h_S)-R^*
\le
(R_\mathcal H^*-R^*)
+2\Delta_S
+\eta_S.
\tag{12.22}
$$

Ba đại lượng ở vế phải đều không âm: sai số xấp xỉ của lớp, chặn sai số do lấy mẫu và sai số tối ưu thực nghiệm.

**Điều kiện áp dụng.** Cùng phân phối đích và cùng mất mát được dùng trong mọi rủi ro. Lớp chuẩn chứa $\mathcal H$, nên $R_\mathcal H^*\ge R^*$.

**Phạm vi.** (12.22) là một chặn trên, không phải đẳng thức phân rã chính xác thành ba số không âm. Nó không đồng nhất sai số tối ưu thực nghiệm với chênh lệch rủi ro tổng thể của hai thuật toán.
:::

::: proof Chứng minh Mệnh đề 12.16
Vì các mất mát nằm trong $[0,1]$, mọi rủi ro hữu hạn và $\Delta_S\le1$. Áp dụng Định lý 12.15 với $\varepsilon=\Delta_S$ và $\eta=\eta_S$, rồi trừ $R^*$ cho (12.22). Tính không âm theo định nghĩa của cận dưới đúng, độ lệch tuyệt đối và sai số tối ưu thực nghiệm. $\square$
:::

Trong học máy, mở rộng lớp có thể giảm $R_\mathcal H^*-R^*$ nhưng làm việc kiểm soát $\Delta_S$ khó hơn. Tối ưu hóa chính xác hơn chỉ giảm $\eta_S$ trên mục tiêu đã chọn. Nếu lấy một ERM chính xác $h_S$ để viết hiệu $R(\hat h_S)-R(h_S)$, hiệu này có thể âm; vì vậy không được gọi nó là một sai số tối ưu không âm mà thiếu giả thiết bổ sung.

::: example Ví dụ 12.9 (Đọc một ngân sách sai số)
**Giả thiết minh họa.** Trong một bài toán phân loại $0$–$1$, rủi ro Bayes bằng $R^*=0.08$, rủi ro tốt nhất trong lớp bằng $R_\mathcal H^*=0.11$. Trên một biến cố có xác suất ít nhất $0.95$, có $\Delta_S\le0.04$. Thuật toán cho $\eta_S\le0.01$ trên mọi mẫu.

**Tính.** Mệnh đề 12.16 cho

$$
R(\hat h_S)-0.08\le(0.11-0.08)+2(0.04)+0.01=0.12.
$$

Vì vậy $R(\hat h_S)\le0.20$ với xác suất ít nhất $0.95$ theo các giả thiết đã cho.

**Diễn giải.** Nếu chỉ giải tối ưu chính xác hơn tới $\eta_S=0$, chặn rủi ro còn $0.19$; phần xấp xỉ và phần do lấy mẫu vẫn giữ nguyên. Các số này là dữ kiện giả định để đọc bất đẳng thức, không phải một phép đo chất lượng trên dữ liệu thực.
:::

### Độ chính xác và độ tin cậy trong học PAC

Chặn (12.21) là một kết luận về chất lượng mô hình trên một biến cố lấy mẫu. Ta cần hai mức sai số khác nhau: độ chính xác mô tả rủi ro được chấp nhận, còn độ tin cậy mô tả xác suất việc lấy mẫu dẫn tới bảo đảm đó. Định nghĩa sau được giới hạn cho phân loại nhị phân trên trục thực để tiếp tục các ví dụ của bài; nguồn là Shalev-Shwartz và Ben-David (2014), Chương 3–4.

::: definition Định nghĩa 12.17 (Học PAC trong hai thiết lập)
Cho lớp $\mathcal H$ gồm các bộ phân loại đo được $\mathcal X\to\{0,1\}$ với $\mathcal X\subseteq\mathbb R$, và mất mát $0$–$1$. Một quy tắc học nhận mẫu i.i.d. và trả về $\hat h_S\in\mathcal H$.

Trong thiết lập **khả thực** (realizable), giả sử có $h^*\in\mathcal H$ sao cho $R(h^*)=0$. Quy tắc học là **học gần đúng có xác suất cao** (probably approximately correct, PAC) nếu với mọi $\varepsilon,\delta\in(0,1)$ tồn tại $N_\mathcal H(\varepsilon,\delta)$ sao cho, với mọi phân phối thỏa giả thiết khả thực và mọi $n\ge N_\mathcal H(\varepsilon,\delta)$,

$$
\mathbb P_S\bigl(R(\hat h_S)\le\varepsilon\bigr)\ge1-\delta.
\tag{12.23}
$$

Trong thiết lập **không giả định khả thực** (agnostic), yêu cầu tương ứng là, với mọi phân phối của cặp $(X,Y)$ và mọi cỡ mẫu đủ lớn,

$$
\mathbb P_S\bigl(R(\hat h_S)\le R_\mathcal H^*+\varepsilon\bigr)\ge1-\delta.
\tag{12.24}
$$

Ở đây $\varepsilon$ là mức sai số hoặc rủi ro dư cho phép, $1-\delta$ là mức tin cậy qua việc rút mẫu. Cỡ mẫu được phép phụ thuộc lớp và hai mức này, nhưng không phụ thuộc phân phối chưa biết.
:::

Định nghĩa 12.17 chuyển một phép tính cho phân phối cụ thể, như (12.14), thành một yêu cầu đồng thời đối với mọi phân phối trong phạm vi giả thiết. Trong thiết lập khả thực, $R_\mathcal H^*=0$; trong thiết lập agnostic, nhiễu nhãn hoặc hạn chế của lớp có thể làm cận dưới này dương. Mức tin cậy không phải xác suất nhãn của một sản phẩm đúng và cũng không phải hậu nghiệm của mô hình đã chọn.

Với lớp hữu hạn và ERM chính xác, Định lý 12.14–12.15 cho (12.24) nếu độ lệch đều không quá $\varepsilon/2$. Một điều kiện đủ là $n\ge2\log(2M/\delta)/\varepsilon^2$. Chặn này cũng dùng được trong trường hợp khả thực nhưng chưa khai thác lợi thế riêng của giả thiết rủi ro bằng $0$; không suy ra nó là tốc độ mẫu tối ưu cho mọi thiết lập PAC.

::: exercise Bài tập 12.4 (Củng cố: hai mức xác suất)
Một kết quả cho biết: với xác suất ít nhất $0.99$ theo mẫu huấn luyện, bộ phân loại được học có rủi ro $0$–$1$ không vượt rủi ro tốt nhất trong lớp một lượng $0.03$. Xác định $\varepsilon,\delta$, đây là thiết lập nào, và giải thích vì sao không thể kết luận xác suất mọi dự đoán tương lai đều đúng bằng $0.99$.
:::

::: hint Gợi ý Bài tập 12.4
Phân biệt xác suất trên việc rút mẫu với xác suất sai của một quan sát mới sau khi mẫu đã cố định.
:::

::: solution Lời giải Bài tập 12.4
Ta có $\varepsilon=0.03$ và $\delta=0.01$. Vì so sánh với rủi ro tốt nhất trong lớp mà không yêu cầu rủi ro đó bằng $0$, đây là dạng bảo đảm agnostic.

Xác suất $0.99$ nói rằng phần lớn các mẫu huấn luyện dẫn tới một bộ phân loại có rủi ro dư nhỏ. Ngay cả trên biến cố tốt, rủi ro vẫn có thể bằng $R_\mathcal H^*+0.03$ và có thể dương. Nó không phải xác suất của biến cố mọi nhãn mới đều được đoán đúng.
:::

::: exercise Bài tập 12.5 (Củng cố: hội tụ đều và nghiệm gần đúng)
Một lớp cố định có $M$ bộ phân loại, dữ liệu i.i.d., mất mát $0$–$1$. Giả sử trên mẫu $S$ có $\Delta_S\le0.02$ và thuật toán đạt $\hat R_S(\hat h_S)\le\inf_h\hat R_S(h)+0.005$. Chứng minh rủi ro dư so với lớp không quá $0.045$. Viết một điều kiện đủ theo $n,M,\delta$ để biến cố độ lệch này có xác suất ít nhất $1-\delta$.
:::

::: hint Gợi ý Bài tập 12.5
So sánh $\hat h_S$ với một $h$ bất kỳ rồi lấy cận dưới đúng. Không cần giả định có một hàm đạt rủi ro tổng thể nhỏ nhất.
:::

::: solution Lời giải Bài tập 12.5
Với mọi $h\in\mathcal H$,

$$
R(\hat h_S)\le\hat R_S(\hat h_S)+0.02
\le\hat R_S(h)+0.005+0.02
\le R(h)+0.045.
$$

Lấy cận dưới đúng theo $h$ cho $R(\hat h_S)-R_\mathcal H^*\le0.045$. Từ Định lý 12.14, một điều kiện đủ là $n\ge\log(2M/\delta)/(2(0.02)^2)$. Khi cần cỡ mẫu nguyên, làm tròn lên.
:::

### Phá vỡ tập điểm và số chiều VC trên trục thực

Lớp các ngưỡng $h_t(x)=\mathbf1_{\{x\ge t\}}$ có vô hạn phần tử, nên không thể thế $M=|\mathcal H|$ hữu hạn vào (12.20). Tuy nhiên, trên hai đầu vào có thứ tự, lớp này chỉ tạo được một số mẫu nhãn nhất định. Chúng ta dùng khả năng tạo các mẫu nhãn để mô tả độ phức tạp thay vì đếm toàn bộ tham số.

Một cách trực quan, một lớp càng có thể gán tùy ý các nhãn lên nhiều điểm thì càng có thể khớp nhiều cách giải thích của một mẫu nhỏ. Đây là trực giác về khả năng biểu diễn trên tập hữu hạn, chưa phải một chặn xác suất. Tất cả các tập điểm trong phần này nằm trên một trục thực.

::: definition Định nghĩa 12.18 (Phá vỡ tập điểm và số chiều VC)
Cho $\mathcal H$ là lớp các hàm $\mathcal X\to\{0,1\}$, $\mathcal X\subseteq\mathbb R$. Với $C=\{x_1,\ldots,x_m\}$ gồm các điểm phân biệt, tập các vector nhãn tạo được là

$$
\mathcal H|_C
=\{(h(x_1),\ldots,h(x_m)):h\in\mathcal H\}.
$$

Lớp $\mathcal H$ **phá vỡ** (shatter) $C$ nếu $\mathcal H|_C=\{0,1\}^m$, tức biểu diễn được mọi cách gán $m$ nhãn.

**Số chiều Vapnik–Chervonenkis**, viết tắt **số chiều VC**, là kích thước lớn nhất của một tập điểm bị phá vỡ. Nếu có các tập bị phá vỡ lớn tùy ý, đặt $d_{\mathrm{VC}}(\mathcal H)=+\infty$.
:::

Định nghĩa 12.18 đo độ phức tạp của lớp hàm trên tập điểm, không đo số chiều của đầu vào. Hai lớp cùng nhận một số thực vẫn có thể có số chiều VC khác nhau. Muốn chứng minh số chiều VC bằng $m$, cần cả một tập $m$ điểm bị phá vỡ và một lập luận rằng không tập $m+1$ điểm nào bị phá vỡ.

Định lý sau dùng Định nghĩa 12.18 và thứ tự của các điểm trên trục thực. Cơ sở cho định nghĩa và ví dụ ngưỡng là Shalev-Shwartz và Ben-David (2014), §6.1–6.3, đặc biệt §6.3.1. Các quy ước chiều ngưỡng và dấu tại biên được giữ theo bài này.

::: theorem Định lý 12.19 (Hai lớp một chiều có độ phức tạp khác nhau)
**Giả thiết.** Miền đầu vào là $\mathbb R$. Xét hai lớp bộ phân loại

$$
\mathcal H_\uparrow
=\{x\mapsto\mathbf1_{\{x\ge t\}}:t\in\mathbb R\},
\qquad
\mathcal H_{\mathrm{aff}}
=\{x\mapsto\mathbf1_{\{wx+b\ge0\}}:w,b\in\mathbb R\}.
\tag{12.25}
$$

**Kết luận.**

$$
d_{\mathrm{VC}}(\mathcal H_\uparrow)=1,
\qquad
d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})=2.
\tag{12.26}
$$

**Điều kiện áp dụng.** Lớp thứ nhất chỉ cho chiều tăng; lớp thứ hai cho cả dấu của $w$ và các hàm hằng khi $w=0$.

**Phạm vi.** Cả hai kết quả đều dành cho đầu vào một chiều và đúng các lớp trong (12.25). Số chiều đầu vào bằng $1$ không khiến mọi lớp trên trục thực có số chiều VC bằng $1$.
:::

::: proof Chứng minh Định lý 12.19
**Bước 1 (lớp chiều tăng phá vỡ một điểm).** Với một điểm $x_0$, chọn $t\le x_0$ cho nhãn $1$, chọn $t>x_0$ cho nhãn $0$. Vì thế một điểm bị phá vỡ.

**Bước 2 (lớp chiều tăng không phá vỡ hai điểm).** Với bất kỳ $x_1<x_2$, nếu $h_t(x_1)=1$ thì $x_1\ge t$, kéo theo $x_2\ge t$ và $h_t(x_2)=1$. Nhãn $(1,0)$ không thể xuất hiện. Do đó số chiều VC của $\mathcal H_\uparrow$ đúng bằng $1$.

**Bước 3 (lớp affine một chiều phá vỡ hai điểm).** Với $x_1<x_2$, đặt $c=(x_1+x_2)/2$. Nhãn $(0,0)$ được cho bởi $w=0,b=-1$; nhãn $(1,1)$ bởi $w=0,b=1$; nhãn $(0,1)$ bởi $w=1,b=-c$; nhãn $(1,0)$ bởi $w=-1,b=c$. Vậy mọi cách gán hai nhãn đều biểu diễn được.

**Bước 4 (lớp affine một chiều không phá vỡ ba điểm).** Với $x_1<x_2<x_3$, xét nhãn $(1,0,1)$. Nếu $w>0$, nhãn dự đoán không giảm theo $x$, nên không thể có $1$ rồi $0$. Nếu $w<0$, nhãn không tăng, nên không thể có $0$ rồi $1$. Nếu $w=0$, nhãn là hằng. Không trường hợp nào biểu diễn được $(1,0,1)$, nên không tập ba điểm nào bị phá vỡ. Số chiều VC của $\mathcal H_{\mathrm{aff}}$ đúng bằng $2$. $\square$
:::

Trong học máy, lấy ngưỡng một mô hình logistic trên một đặc trưng vô hướng với độ dốc bị ràng buộc dương cho lớp có chiều quyết định cố định. Cho phép độ dốc cả hai dấu và các hàm hằng mở rộng lớp quyết định thành $\mathcal H_{\mathrm{aff}}$. Định lý 12.19 cho thấy một thay đổi hạn chế biểu diễn có thể đổi độ phức tạp dù đầu vào vẫn chỉ có một tọa độ.

::: example Ví dụ 12.10 (Bốn cách gán nhãn trên hai điểm; điều chỉnh từ nguồn khởi đầu)
**Tập điểm và hai lớp.** Chọn $x_1=-1$, $x_2=1$. Dùng $\mathcal H_\uparrow=\{x\mapsto\mathbf1_{\{x\ge t\}}:t\in\mathbb R\}$ và $\mathcal H_{\mathrm{aff}}=\{x\mapsto\mathbf1_{\{wx+b\ge0\}}:w,b\in\mathbb R\}$, như trong (12.25).

**Liệt kê.** Với lớp affine một chiều, các cặp $(w,b)=(0,-1),(1,0),(-1,0),(0,1)$ cho lần lượt các vector nhãn $(0,0),(0,1),(1,0),(1,1)$. Với lớp chiều tăng, có thể lấy $t=2,0,-2$ để cho $(0,0),(0,1),(1,1)$, nhưng không có ngưỡng cho $(1,0)$.

**Kiểm tra và diễn giải.** Các bộ tham số vừa nêu không đặt điểm nào đúng tại biên quyết định, nên nhãn không phụ thuộc cách phá hòa ở ví dụ này. Trên ba điểm có thứ tự, lớp chiều tăng chỉ cho $4$ mẫu nhãn, còn lớp affine một chiều cho $6$ mẫu nhãn; cả hai đều không cho đủ $8$ cách gán. Khả năng tạo mẫu nhãn, thay vì số lượng điểm trên trục, phân biệt độ phức tạp của hai lớp.
:::

![Hai điểm trên một trục thực với bốn mẫu nhãn 00, 01, 10 và 11; lớp ngưỡng chiều tăng thiếu mẫu 10, còn lớp affine một chiều biểu diễn được cả bốn mẫu.](img/lec-12/vc-one-dimensional.svg)

*Hình 12.2. Cùng hai đầu vào một chiều, thay đổi lớp giả thuyết làm thay đổi những cách gán nhãn có thể biểu diễn. Dấu thiếu ở mẫu $(1,0)$ chứng minh lớp chiều tăng không phá vỡ tập hai điểm; lớp affine một chiều biểu diễn đủ bốn mẫu.*

### Đọc thêm: hội tụ đều cho các lớp một chiều có VC hữu hạn

Đếm nhãn trên một tập điểm giúp thay thế việc đếm toàn bộ một lớp vô hạn, nhưng không được lấy số mẫu nhãn trên chính dữ liệu rồi thế ngay vào $M$ của Định lý 12.14. Lớp hạn chế đó phụ thuộc vào mẫu ngẫu nhiên; cần thêm lập luận so sánh hai mẫu và kiểm soát độ phức tạp. Các bước này nằm ngoài phạm vi chứng minh của bài.

Kết quả tiếp theo được chuyên biệt hóa cho đầu vào một chiều, phù hợp các lớp trong Định lý 12.19. Nguồn là Shalev-Shwartz và Ben-David (2014), §6.4, Định lý 6.7–6.8; phần định lượng được chứng minh trong Chương 28 của sách.

::: theorem Định lý 12.20 (Hội tụ đều theo số chiều VC: đọc thêm)
**Giả thiết.** $\mathcal H$ là lớp cố định các bộ phân loại đo được trên $\mathcal X\subseteq\mathbb R$, có số chiều VC hữu hạn $d\ge1$. Mẫu gồm các cặp i.i.d. từ phân phối đích bất kỳ trên $\mathcal X\times\{0,1\}$; dùng mất mát $0$–$1$. Giả sử lớp thỏa các điều kiện đo được để độ lệch đều và các biến cố liên quan được xác định.

**Kết luận.** Tồn tại hằng số tuyệt đối $C>0$, không phụ thuộc lớp, phân phối, $n$, $\varepsilon$ hoặc $\delta$, sao cho với mọi $\varepsilon,\delta\in(0,1)$,

$$
n\ge C\,\frac{d+\log(1/\delta)}{\varepsilon^2}
\quad\Longrightarrow\quad
\mathbb P_S(\Delta_S\le\varepsilon)\ge1-\delta.
\tag{12.27}
$$

**Điều kiện áp dụng.** Số chiều VC phải thuộc đúng lớp các hàm quyết định đang học. Giả thiết cùng phân phối áp dụng cho mẫu và quan sát mới.

**Phạm vi.** Hằng số $C$ không được xác định bằng một con số trong phát biểu này, nên (12.27) cho bậc phụ thuộc chứ chưa cho cỡ mẫu số cụ thể. Kết quả không phải chặn trực tiếp cho entropy chéo không bị chặn.
:::

Chứng minh Định lý 12.20 nằm ngoài phạm vi học phần; xem nguồn được dẫn, đặc biệt Chương 28 cho chặn định lượng. Ý tưởng là kiểm soát số mẫu nhãn mà lớp biểu diễn được trên các tập hữu hạn, rồi kết hợp với lập luận tập trung xác suất. Định lý 12.19 đã chứng minh các số $d=1$ và $d=2$ cần dùng cho hai lớp ngưỡng một chiều, thay vì giả định chúng từ số tham số.

Trong học máy, kết hợp Định lý 12.20 với Định lý 12.15 cho một bảo đảm rủi ro dư cho hai lớp ngưỡng vô hạn đã xét. Đây vẫn là một bảo đảm thống kê qua việc rút mẫu; nó không nói thuật toán cụ thể có giải được bài toán tối ưu với sai số $\eta$ mong muốn hay không. Một mạng phi tuyến nhận đầu vào một chiều có thể biểu diễn nhiều vùng quyết định hơn một ngưỡng affine, nên không được gán số chiều VC bằng $2$ chỉ từ số chiều đầu vào.

::: exercise Bài tập 12.6 (Củng cố: độ phức tạp của lớp trên trục thực)
Xét $\mathcal H_\uparrow=\{\mathbf1_{\{x\ge t\}}:t\in\mathbb R\}$ và $\mathcal H_{\mathrm{aff}}=\{\mathbf1_{\{wx+b\ge0\}}:w,b\in\mathbb R\}$. Với ba điểm $-1,0,1$, liệt kê các mẫu nhãn của từng lớp. Giải thích vì sao đầu vào một chiều chưa quyết định độ phức tạp của lớp và vì sao kiểm tra một tập ba điểm không tự thay thế toàn bộ chứng minh số chiều VC.
:::

::: hint Gợi ý Bài tập 12.6
Ngưỡng chiều tăng chỉ đổi nhãn từ $0$ sang $1$; affine một chiều còn cho chiều ngược lại và các hàm hằng.
:::

::: solution Lời giải Bài tập 12.6
Lớp chiều tăng cho $000,001,011,111$. Lớp affine một chiều còn cho $100,110$, tổng cộng sáu mẫu. Hai mẫu $010$ và $101$ đều không có trong lớp affine vì chúng cần hai lần đổi nhãn theo thứ tự điểm.

Cả hai lớp đều nhận một số thực nhưng khác các mẫu nhãn có thể tạo. Để kết luận VC bằng $1$ hay $2$, còn cần một tập nhỏ hơn bị phá vỡ và cần lập luận cho mọi tập có kích thước lớn hơn. Định lý 12.19 cung cấp hai chiều chứng minh đó bằng thứ tự tổng quát $x_1<x_2<x_3$.
:::

Bổ đề 12.12 kế thừa tập trung tại mô hình cố định, Định nghĩa 12.13 chuyển sang một biến cố đồng thời, và Định lý 12.14 chứng minh biến cố đó cho lớp hữu hạn. Định lý 12.15 dùng hội tụ đều để bảo đảm cho mô hình được chọn từ dữ liệu, còn Mệnh đề 12.16 tách chặn theo khả năng biểu diễn, lấy mẫu và tối ưu. Định nghĩa 12.17 phân biệt độ chính xác với độ tin cậy; Định nghĩa 12.18 và Định lý 12.19 minh họa độ phức tạp bằng hai lớp chỉ trên trục thực. Định lý 12.20 nêu cách kết quả tổng quát nối số chiều VC hữu hạn với hội tụ đều mà không lặp lại toàn bộ lý thuyết chuyên sâu.

## 12.5. Tình huống áp dụng và giới hạn của bảo đảm

### Cùng một đầu vào, hai phạm vi lựa chọn mô hình

::: application Tình huống 12.1 (Ngưỡng cảm biến và quy tắc ghi nhớ)
**Bài toán và dữ liệu.** Một đặc trưng cảm biến được chuẩn hóa thành $X\sim\operatorname{Uniform}[-1,1]$. Nhãn thật là $Y=\mathbf1_{\{X\ge0\}}$. Mẫu quan sát gồm $(-0.8,0)$, $(-0.2,0)$, $(0.3,1)$, $(0.7,1)$; dùng mất mát $0$–$1$.

**Hai lớp biểu diễn.** Lớp thứ nhất gồm các ngưỡng $h_t(x)=\mathbf1_{\{x\ge t\}}$. Lớp thứ hai gồm mọi hàm đo được từ $[-1,1]$ đến $\{0,1\}$, chứa cả các ngưỡng lẫn các quy tắc ghi nhớ. Đầu vào của cả hai vẫn là một số thực; phạm vi các hàm biểu diễn được khác nhau.

**Tối ưu trên mẫu.** Theo Mệnh đề 12.11, mọi $t\in(-0.2,0.3]$ là ERM trong lớp ngưỡng. Chọn $t=0.3$ cho rủi ro tổng thể $0.15$. Trong lớp thứ hai, chọn hàm ghi nhớ đúng bốn nhãn đã thấy và trả $0$ ở nơi khác; hàm đó cũng có rủi ro thực nghiệm bằng $0$.

**Đánh giá trên quan sát mới.** Tập bốn đầu vào có xác suất bằng $0$ dưới phân phối liên tục. Hàm ghi nhớ dự đoán $0$ gần chắc chắn trên đầu vào mới, nên sai trên nửa dương của đoạn và có rủi ro $1/2$. Trong mô hình này rủi ro Bayes bằng $0$; lớp thứ hai cũng chứa ngưỡng thật nên rủi ro tốt nhất trong lớp bằng $0$. Vì vậy rủi ro dư của quy tắc ghi nhớ không đến từ hạn chế xấp xỉ của lớp; đây là trường hợp khác ví dụ nhiễu nhãn 12.6.

**Diễn giải và giới hạn.** Hai quy tắc đều giải chính xác mục tiêu mẫu, nhưng cho rủi ro mới khác nhau. Định lý 12.19 đã xác định lớp ngưỡng chiều tăng có số chiều VC bằng $1$. Lớp cho phép ghi nhớ tùy ý có thể biểu diễn mọi nhãn trên bất kỳ tập hữu hạn điểm phân biệt nào, nên không có cùng kiểm soát độ phức tạp. Một mẫu cụ thể chưa xác minh các giả thiết phân phối; nếu chúng không đúng thì các rủi ro $0.15$ và $1/2$ phải được tính lại.
:::

### Khi tập huấn luyện không đại diện cho phân phối đích

::: application Tình huống 12.2 (Chỉ quan sát một vùng của cảm biến)
**Dữ liệu và cơ chế.** Nhãn thật vẫn là $Y=\mathbf1_{\{X\ge0\}}$, nhưng huấn luyện chỉ lấy $X$ đều trên $[-1,0]$, còn hệ thống khi triển khai nhận $X$ đều trên $[0,1]$. Một mẫu huấn luyện có đầu vào $(-0.8,-0.6,-0.4,-0.2)$ và cả bốn nhãn bằng $0$.

**Lựa chọn mô hình.** Dùng lớp affine một chiều $\mathcal H_{\mathrm{aff}}=\{\mathbf1_{\{wx+b\ge0\}}:w,b\in\mathbb R\}$, chọn bộ luôn dự đoán $0$, tương ứng $w=0,b=-1$. Nó có rủi ro thực nghiệm bằng $0$ và rủi ro trên phân phối huấn luyện bằng $0$.

**Rủi ro đích.** Trên phân phối triển khai, nhãn bằng $1$ gần chắc chắn. Bộ dự đoán hằng $0$ có rủi ro đích bằng $1$.

**Giả thiết bị vi phạm.** Các cặp huấn luyện có thể vẫn i.i.d., và lớp vẫn có số chiều VC bằng $2$ theo Định lý 12.19. Tuy nhiên, chúng không có cùng phân phối với quan sát mới, trái với Định nghĩa 12.8 và giả thiết của Định lý 12.20. Hội tụ đều theo phân phối huấn luyện chỉ kiểm soát rủi ro trên chính phân phối đó; không chuyển tự động sang phân phối triển khai. Tăng số quan sát chỉ trong nửa âm không khắc phục thiếu thông tin về nửa dương.
:::

Các công cụ của bài xuất hiện ở ba bước khác nhau trong hệ thống AI: Mệnh đề 12.2 và 12.6 thiết lập mục tiêu học từ giả thiết đầu ra; Định lý 12.3 hoặc một bộ tối ưu khác xử lý mục tiêu trên mẫu; Định lý 12.15 đánh giá hậu quả thống kê khi có một chặn hội tụ đều phù hợp. Không bước nào tự thay thế hai bước còn lại. Bài 13 tiếp tục với quyết định tuần tự, khi hành động còn thay đổi phân phối các trạng thái và phần thưởng trong tương lai.

## 12.6. Tóm tắt chương

Chúng ta bắt đầu từ phân phối đầu ra có điều kiện để giải thích vì sao nhiễu Gaussian dẫn tới bình phương sai số và nhãn Bernoulli dẫn tới entropy chéo. Với hồi quy tuyến tính, phương trình chuẩn giải quyết bài toán tối ưu, nhưng tính đầy đủ của hạng và giả thiết về phương sai vẫn quyết định kết luận được phép rút ra. Mô hình logistic cho thấy ngay cả một mục tiêu lồi cũng có thể không đạt cực tiểu hữu hạn. Sau đó, phân phối đích xác định rủi ro tổng thể, còn mẫu huấn luyện chỉ cung cấp rủi ro thực nghiệm để lựa chọn mô hình. Hội tụ đều nối hai đại lượng trên toàn lớp và cho một chặn rủi ro dư gồm phần lấy mẫu cùng sai số tối ưu. Khi so với chuẩn Bayes, hạn chế biểu diễn của lớp tạo thêm một phần sai số xấp xỉ. Hai lớp ngưỡng cùng nhận đầu vào một chiều nhưng có số chiều VC khác nhau cho thấy độ phức tạp thuộc về phạm vi hàm được phép học; các bảo đảm vẫn cần đúng giả thiết lấy mẫu và đúng phân phối đích.

| Mạch nội dung | Các kết quả cần tra lại |
|---|---|
| Hồi quy Gaussian | Định nghĩa 12.1; Mệnh đề 12.2; Định lý 12.3; Nhận xét 12.4 |
| Phân loại xác suất | Định nghĩa 12.5; Mệnh đề 12.6; Nhận xét 12.7 |
| Tiêu chuẩn thống kê | Định nghĩa 12.8; Mệnh đề 12.9; Định nghĩa 12.10; Mệnh đề 12.11 |
| Hội tụ đều và tối ưu | Bổ đề 12.12; Định nghĩa 12.13; Định lý 12.14–12.15; Mệnh đề 12.16 |
| PAC và lớp một chiều | Định nghĩa 12.17–12.18; Định lý 12.19; kết quả đọc thêm 12.20 |

Các công thức cần nhớ là (12.3), (12.7), (12.9)–(12.10), (12.14), (12.20)–(12.22) và hai số chiều VC trong (12.26). Cần phân biệt ba câu hỏi: lớp mô hình có biểu diễn được lời giải tốt không, dữ liệu có đủ để lựa chọn lời giải tốt không, và bộ tối ưu có đạt mục tiêu thực nghiệm đủ chính xác không. Một bảo đảm cho mất mát $0$–$1$ không mặc nhiên áp dụng cho entropy chéo hay mất mát bình phương không bị chặn.

## 12.7. Bài tập trên lớp: 30 phút

Các bài dưới đây dành riêng cho 30 phút trên lớp; các lời giải có thể được mở sau khi hoàn thành. Chúng tách khỏi bốn bài tự học ở Mục 12.8.

::: exercise Bài tập 12.7 (Trên lớp, 10 phút: suy ra và giải mục tiêu)
Ba cặp là $(0,0)$, $(1,1)$, $(2,1)$. Giả sử $Y_i\mid x_i\sim\mathcal N(w_0+w_1x_i,1)$ độc lập có điều kiện. Viết âm log-hợp lý, lập phương trình chuẩn, tìm hệ số tối ưu và kiểm tra phần dư vuông góc với các cột của ma trận thiết kế.
:::

::: hint Gợi ý Bài tập 12.7
Ma trận thiết kế có các hàng $(1,0),(1,1),(1,2)$. Dùng Mệnh đề 12.2 và Định lý 12.3.
:::

::: solution Lời giải Bài tập 12.7
**Mục tiêu và hệ phương trình.** Âm log-hợp lý là $\frac32\log(2\pi)+\frac12\sum_i(y_i-w_0-w_1x_i)^2$. Ta có

$$
A^\top A=\begin{pmatrix}3&3\\3&5\end{pmatrix},
\qquad A^\top y=\begin{pmatrix}2\\3\end{pmatrix}.
$$

Giải $3w_0+3w_1=2$, $3w_0+5w_1=3$ cho $\hat w_1=1/2$, $\hat w_0=1/6$.

**Kiểm tra.** Giá trị khớp là $(1/6,2/3,7/6)$, phần dư là $(-1/6,1/3,-1/6)$. Tổng phần dư bằng $0$ và tổng phần dư nhân đầu vào bằng $1/3-2/6=0$. Định thức $6>0$ cho nghiệm hệ số duy nhất.
:::

::: exercise Bài tập 12.8 (Trên lớp, 10 phút: rủi ro và nghiệm ERM)
Cho $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf1_{\{X\ge0\}}$, $h_t(x)=\mathbf1_{\{x\ge t\}}$ và mất mát $0$–$1$. Mẫu gồm $(-0.7,0),(-0.3,0),(0.2,1),(0.9,1)$. Tìm mọi nghiệm ERM. So sánh hai loại rủi ro của các ngưỡng $t=0.1$ và $t=-0.2$.
:::

::: hint Gợi ý Bài tập 12.8
Hai điểm gần ngưỡng thật nhất cho hai đầu khoảng nghiệm; rủi ro tổng thể bằng xác suất đoạn bị phân loại khác ngưỡng $0$.
:::

::: solution Lời giải Bài tập 12.8
Các điểm âm đúng nhãn khi $t>-0.3$, còn các điểm dương đúng nhãn khi $t\le0.2$. Vì vậy tập nghiệm ERM là $(-0.3,0.2]$. Hai ngưỡng $0.1$ và $-0.2$ đều thuộc khoảng này và có rủi ro thực nghiệm bằng $0$.

Theo Mệnh đề 12.11, $R(h_{0.1})=0.05$ còn $R(h_{-0.2})=0.10$. Hai nghiệm cùng đạt tối ưu trên mẫu nhưng có rủi ro tổng thể khác nhau.
:::

::: exercise Bài tập 12.9 (Trên lớp, 10 phút: hai lớp trên một trục)
Trên hai điểm $x_1=0,x_2=2$, xét lớp ngưỡng chiều tăng $\{\mathbf1_{\{x\ge t\}}:t\in\mathbb R\}$ và lớp affine một chiều $\{\mathbf1_{\{wx+b\ge0\}}:w,b\in\mathbb R\}$. Liệt kê các mẫu nhãn của lớp thứ nhất và cho tham số lớp thứ hai biểu diễn cả bốn mẫu. Giải thích vì sao cần xét thêm mọi tập ba điểm để chứng minh số chiều VC của lớp thứ hai đúng bằng $2$.
:::

::: hint Gợi ý Bài tập 12.9
Dùng trung điểm $1$ khi chọn các hệ số có độ dốc khác $0$.
:::

::: solution Lời giải Bài tập 12.9
Lớp chiều tăng cho $00$ với $t=3$, $01$ với $t=1$, $11$ với $t=-1$, và không cho $10$. Lớp affine một chiều cho $00,01,10,11$ lần lượt bằng $(w,b)=(0,-1),(1,-1),(-1,1),(0,1)$.

Phá vỡ hai điểm chỉ chứng minh số chiều VC ít nhất bằng $2$. Để có cận trên, với mọi $x_1<x_2<x_3$, mẫu nhãn $101$ không thể đến từ một hàm quyết định chỉ hằng, không giảm hoặc không tăng. Đây là lập luận cho mọi tập ba điểm cần thiết trong Định lý 12.19.
:::

## 12.8. Bốn bài tự học: khoảng 180 phút

Các bài được điều chỉnh từ W3.1–W3.4 trong `sources/part2/homework.pdf`, không phải các số bài tập của Murphy. Mức **cơ bản** tập trung nhận biết và tính toán; mức **trung bình** cần suy diễn; mức **vận dụng** cần kiểm tra giả thiết và kết nối với AI. Bốn bài bao phủ suy diễn, tính toán, liên hệ AI và lập luận phản biện; trình bày giả thiết, bước trung gian và diễn giải kết quả.

::: exercise E12.1 (Cơ bản đến trung bình; hợp lý và hồi quy, 50 phút)
Cho các cặp $(0,1),(1,2),(2,4)$. Giả sử các đầu ra độc lập có điều kiện, $Y_i\mid x_i\sim\mathcal N(w_0+w_1x_i,\sigma^2)$, với $\sigma^2>0$ đã biết.

1. Viết mật độ có điều kiện và suy ra âm log-hợp lý. Chỉ ra chính xác số hạng nào không ảnh hưởng nghiệm theo hệ số.
2. Lập ma trận thiết kế, kiểm tra hạng và giải phương trình chuẩn để tìm $\hat w_0,\hat w_1$. Tính các phần dư và tổng bình phương phần dư.
3. Nếu phương sai cũng được ước lượng, suy ra công thức MLE phương sai và kiểm tra điều kiện tồn tại trong mẫu này.
4. Thay các đầu ra bằng $(1,3,5)$. Phân biệt sự tồn tại nghiệm theo hệ số khi phương sai đã biết với sự tồn tại MLE chung khi phương sai chưa biết.
5. Nếu nhiễu không có trung bình có điều kiện bằng $0$, giả thiết nào trong cách diễn giải đường hồi quy như trung bình có điều kiện bị vi phạm? Giải thích vì sao giải đúng phương trình chuẩn chưa xác nhận mô hình nhiễu.
:::

::: hint Gợi ý E12.1
Dùng Mệnh đề 12.2, Định lý 12.3 và Nhận xét 12.4. Khi học phương sai, không bỏ số hạng $\log\sigma^2$ trong âm log-hợp lý.
:::

::: exercise E12.2 (Trung bình; xác suất, mất mát và cực tiểu, 40 phút)
Hai cặp quan sát là $(-1,0),(1,1)$, độc lập có điều kiện. Dùng $p_w(x)=1/(1+e^{-wx})$, không có hệ số tự do.

1. Từ phân phối Bernoulli có điều kiện, suy ra entropy chéo trung bình và viết nó thành một hàm một biến $w$.
2. Tính mất mát tại $w=0$ và $w=\log3$. So sánh các nhãn dự đoán bằng quy tắc $\mathbf1_{\{p_w(x)\ge1/2\}}$, có giữ quy ước tại dấu bằng.
3. Chứng minh không có tham số hữu hạn đạt cực tiểu entropy chéo. Với một số $\eta>0$, tìm một điều kiện đủ theo $w$ để mất mát không quá $\eta$.
4. Nếu nhãn của điểm $x=-1$ đổi từ $0$ thành $1$, tính lại mất mát tại hai tham số ở câu 2. Giải thích ảnh hưởng của dự đoán tự tin lên mất mát khi nhãn không phù hợp với mô hình.
5. Việc một tham số giảm entropy chéo trên hai quan sát có chứng minh nó có rủi ro $0$–$1$ tổng thể nhỏ hơn không? Nêu đại lượng hoặc giả thiết còn thiếu.
:::

::: hint Gợi ý E12.2
Dùng $\operatorname{sigm}(-w)=1-\operatorname{sigm}(w)$. Để có điều kiện đủ ở câu 3, có thể dùng $\log(1+u)\le u$ với $u\ge0$.
:::

::: exercise E12.3 (Trung bình đến vận dụng; rủi ro chính xác, 45 phút)
Cho $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf1_{\{X\ge0\}}$ và $h_t(x)=\mathbf1_{\{x\ge t\}}$, $t\in[-1,1]$. Dùng mất mát $0$–$1$.

1. Tính $R(h_t)$ bằng tích phân cho từng trường hợp $t<0$, $t=0$, $t>0$. Tính giá trị tại $t=-0.4$ và $t=0.2$.
2. Với các cặp $(-0.8,0),(-0.2,0),(0.3,1),(0.7,1)$, tìm toàn bộ nghiệm ERM, giữ đúng hai đầu khoảng. Cho hai nghiệm có rủi ro tổng thể khác nhau.
3. Xét một quy tắc ghi nhớ trả đúng bốn nhãn trong câu 2 và trả $0$ ở mọi điểm khác. Tính rủi ro thực nghiệm và tổng thể; so sánh với ngưỡng $t=0$.
4. Thay phân phối đầu vào bằng mật độ $f_X(x)=(x+1)/2$ trên $[-1,1]$, giữ nguyên quy tắc nhãn. Kiểm tra mật độ chuẩn hóa, rồi tính rủi ro của $h_t$ bằng tích phân. Phân tích vì sao công thức $|t|/2$ không còn đúng nói chung.
:::

::: hint Gợi ý E12.3
Xác định đúng đoạn mà hai bộ phân loại khác nhãn; chỉ mật độ trên đoạn đó cần được tích phân. Một tập hữu hạn điểm có xác suất bằng $0$ dưới cả hai phân phối liên tục trong đề.
:::

::: exercise E12.4 (Vận dụng; độ phức tạp lớp một chiều và bảo đảm học, 45 phút)
Miền đầu vào là $\mathbb R$. Xét $\mathcal H_\uparrow=\{\mathbf1_{\{x\ge t\}}:t\in\mathbb R\}$ và $\mathcal H_{\mathrm{aff}}=\{\mathbf1_{\{wx+b\ge0\}}:w,b\in\mathbb R\}$, dùng mất mát $0$–$1$.

1. Chứng minh số chiều VC của lớp thứ nhất bằng $1$ và của lớp thứ hai bằng $2$. Mỗi chứng minh phải có cả tập điểm bị phá vỡ và cận trên cho mọi tập lớn hơn.
2. Trên ba điểm có thứ tự bất kỳ, đếm và mô tả các mẫu nhãn của hai lớp. Dùng kết quả để giải thích vì sao cùng một đầu vào vô hướng có thể đi cùng các mức độ phức tạp lớp khác nhau.
3. Giả sử mẫu i.i.d. từ cùng phân phối đích và một biến cố cho $\sup_h|R(h)-\hat R_S(h)|\le\varepsilon$. Chứng minh với nghiệm thực nghiệm gần đúng mức $\eta$ thì rủi ro dư so với lớp không vượt $2\varepsilon+\eta$, không cần giả định có hàm đạt $\inf_hR(h)$.
4. Nêu giả thiết cần để áp dụng Định lý 12.20 cho mỗi lớp. Giải thích vì sao không được thế vô hạn số tham số vào $M$ của Định lý 12.14, hoặc dùng số chiều đầu vào $1$ thay cho số chiều VC của một lớp bất kỳ.
5. Phân biệt sai số xấp xỉ, độ lệch do lấy mẫu và sai số tối ưu thực nghiệm trong chặn (12.22). Nêu một phần có thể giảm bằng giải tối ưu chính xác hơn và một phần không tự giảm theo cách đó.
:::

::: hint Gợi ý E12.4
Các hàm affine một chiều sau lấy dấu chỉ tạo nhãn không giảm, không tăng hoặc hằng trên các điểm có thứ tự. Ở câu 3, so với một $h$ tùy ý trước khi lấy cận dưới đúng.
:::

## 12.9. Hướng dẫn đọc thêm và tài liệu tham khảo

Tài liệu chính là Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press. [Trang sách do tác giả cung cấp](https://probml.github.io/pml-book/book1.html) dẫn tới mục lục và bản đọc. Các số mục dưới đây được đối chiếu với mục lục do nhà xuất bản cung cấp; không gán số bài tập hoặc số trang chưa kiểm tra trực tiếp trong bản sách đang dùng.

Tài liệu bổ trợ cho PAC và VC là Shai Shalev-Shwartz và Shai Ben-David (2014), *Understanding Machine Learning: From Theory to Algorithms*, Cambridge University Press, Chương 3–6. Bản nguồn trong kho là `statistical-learning-theory/sources/uml/understanding-machine-learning-theory-algorithms.pdf`. Các chứng minh sơ cấp ở đây được biên soạn cho đúng hai lớp ngưỡng trên trục thực; không trình bày lý thuyết số chiều VC nhiều chiều.

| Phần của bài | Mục đọc chính xác | Mục đích đọc |
|---|---|---|
| 12.1, mô hình và mất mát | Murphy I, §4.2.7; §11.2.2 | Hợp lý có điều kiện, ước lượng bình phương tối thiểu |
| 12.2, nhãn Bernoulli | Murphy I, §4.2.3; §4.3; §10.2.3 | Hợp lý Bernoulli, mục tiêu logistic và entropy chéo |
| 12.3, quyết định và rủi ro | Murphy I, §5.1; §5.4.1 | Mất mát, quyết định Bayes và rủi ro thực nghiệm |
| 12.3–12.4, giới hạn của việc học | Murphy I, §5.4.4; Shalev-Shwartz–Ben-David, Chương 3–4 | Rủi ro tổng thể, agnostic PAC, hội tụ đều và ERM |
| 12.4, ba nguồn sai số | Shalev-Shwartz–Ben-David, §5.2 | Khả năng biểu diễn, sai số do ước lượng từ mẫu; thêm sai số tối ưu thực nghiệm theo (12.13) |
| 12.4, lớp hữu hạn | Shalev-Shwartz–Ben-David, Chương 4; Bài 05c, Định lý 05c.47 và 05c.52 | Hoeffding, phép hợp và bảo đảm cho mô hình được chọn từ dữ liệu |
| 12.4, phá vỡ tập điểm | Shalev-Shwartz–Ben-David, §6.1–6.3, đặc biệt §6.3.1 | Định nghĩa số chiều VC, lớp ngưỡng một chiều |
| 12.4, kết quả đọc thêm | Shalev-Shwartz–Ben-David, §6.4, Định lý 6.7–6.8 | Hội tụ đều và khả năng học khi VC hữu hạn |
| Chứng minh sâu hơn, không yêu cầu | Shalev-Shwartz–Ben-David, §6.5 và Chương 28 | Lập luận cho lớp vô hạn và chứng minh định lượng của Định lý 6.8 |

Mệnh đề 12.2 và 12.6 phát triển nguyên lý hợp lý của Bài 11 thành mất mát có điều kiện. Định lý 12.3 bổ sung chứng minh bằng phép chiếu và bình phương để xử lý cả hạng thiếu. Định lý 12.14 và 12.15 có chứng minh đầy đủ bằng Hoeffding, phép hợp và so sánh rủi ro; không dựa vào một kết quả VC chưa chứng minh. Mệnh đề 12.16 dùng chuẩn Bayes để chỉ phần xấp xỉ vượt quá rủi ro không thể tránh, với quy ước sai số tối ưu được định nghĩa trên rủi ro thực nghiệm. Định lý 12.19 minh họa độ phức tạp bằng hai lớp cùng có đầu vào một chiều. Chỉ Định lý 12.20 được nêu như kết quả đọc thêm không chứng minh.

Bộ ghi chú khởi đầu là *Probability: Mathematical Foundations for AI — Five-week bridge*, `sources/part2/lecture_notes.pdf`, Tuần 3, §7.1–7.4. Ví dụ 12.1 giữ ba cặp $(0,1),(1,2),(2,2)$; Ví dụ 12.4 giữ hai nhãn đối xứng và hai tham số logistic; Ví dụ 12.7 giữ phân phối đều, ngưỡng thật $0$ và mẫu bốn điểm; Ví dụ 12.10 cụ thể hóa phép gán nhãn của hai lớp ngưỡng một chiều. Lời giải được bổ sung các bước suy diễn, điều kiện tồn tại và kiểm tra đầu mút. Không bổ sung tác giả hoặc năm xuất bản cho tệp khi chưa có căn cứ từ nguồn.

Bộ bài tập khởi đầu là *Five-Week Homework — Probability and Probabilistic AI — UET.AI2012*, bản sinh viên ở `sources/part2/homework.pdf`, Tuần 3. E12.1 điều chỉnh W3.1 bằng một mẫu không thẳng hàng trước khi xét lại mẫu thẳng hàng gốc; E12.2 giữ tình huống W3.2 và thêm trường hợp cực tiểu không đạt được, nhãn thay đổi; E12.3 giữ W3.3 và thêm kiểm tra phân phối đầu vào; E12.4 giữ hai lớp một chiều của W3.4, thêm hệ quả tối ưu gần đúng và diễn giải độ phức tạp. Chúng là các bài tập điều chỉnh (adapted exercises), không gán số bài tập trong giáo trình Murphy hoặc Shalev-Shwartz–Ben-David. Thời lượng được phân lại thành $50+40+45+45=180$ phút theo kế hoạch của bài.

Bài 13 sẽ giữ cách phát biểu giả thiết xác suất và tiêu chuẩn kỳ vọng, nhưng chuyển từ một dự đoán riêng lẻ sang chuỗi quyết định. Khi hành động hiện tại làm thay đổi trạng thái tương lai, bài toán còn cần mô hình chuyển trạng thái và các phương trình Bellman.
