# Bài 14 — Học biểu diễn và mô hình sinh dưới góc nhìn xác suất

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Thiết lập bài toán nén tuyến tính, chứng minh nghiệm PCA bằng phân rã phổ và chứng minh sự tương đương giữa giữ phương sai với giảm lỗi tái tạo trực giao.
2. Thiết lập bộ mã hóa–giải mã, giải thích liên hệ giữa bộ tự mã hóa tuyến tính và PCA, đồng thời phân biệt không gian con tối ưu với hệ tọa độ học được.
3. Xây dựng mô hình sinh bằng phân phối tiên nghiệm và phân phối quan sát có điều kiện; phân biệt lấy mẫu, tính hợp lý và suy luận hậu nghiệm.
4. Chứng minh tính không âm của phân kỳ KL, phân rã log-hợp lý qua ELBO và điều kiện đạt dấu bằng; phân biệt hai phân kỳ KL xuất hiện trong lập luận.
5. Tính KL Gaussian, kỳ vọng tái tạo và ELBO; thiết lập VAE và giải thích phép tái tham số hóa cùng các điều kiện để dùng gradient qua kỳ vọng.
6. Phân tích giới hạn của lỗi tái tạo và KL khi đánh giá mô hình sinh, nhận ra trường hợp hậu nghiệm xấp xỉ bỏ qua quan sát hoặc phân phối dữ liệu không phù hợp mô hình.

Các mục tiêu cụ thể hóa năng lực phân tích mô hình học máy thuộc CLO2 và năng lực nhận dạng bài toán tối ưu trong AI thuộc CLO4 của đề cương học phần. Đây là mục tiêu biên soạn, không phải mã chuẩn đầu ra bài học mới. Các Bài tập 14.1–14.6 lần lượt kiểm tra sáu nhóm mục tiêu; bài trên lớp và bài tự học phối hợp nhiều nhóm kiến thức.

## Kiến thức tiên quyết và liên hệ với các bài trước

- **Đại số tuyến tính.** Cần biết tích vô hướng, cơ sở trực chuẩn, phép chiếu trực giao, vết ma trận và định lý phổ: ma trận đối xứng thực có một cơ sở trực chuẩn gồm các vector riêng. Ta dùng trị riêng để chọn không gian biểu diễn thay vì chỉ để mô tả hình học hiệp phương sai.
- **Không gian đặc trưng và mạng nơ-ron.** Các Bài 05–06 đã xét ánh xạ đặc trưng và tối ưu tham số của ánh xạ. Ở đây, mục tiêu mới là học một biểu diễn ít chiều từ chính quan sát, rồi xác định thêm phân phối xác suất để sinh dữ liệu. Bộ mã hóa và bộ giải mã có thể là mạng nơ-ron, nhưng việc chúng khả vi chưa xác định một mô hình sinh.
- **Xác suất và suy luận.** Cần phép lấy biên, Bayes và kỳ vọng trong Bài 10. Với mật độ đồng thời $p_\theta(x,z)$, lấy biên theo $z$ cho $p_\theta(x)$, còn Bayes cho $p_\theta(z\mid x)=p_\theta(x,z)/p_\theta(x)$ khi mẫu số dương.
- **Ước lượng và mất mát.** Mệnh đề 11.3 chuyển cực đại hợp lý thành cực tiểu âm log-hợp lý. Bài 12 đã suy mất mát bình phương từ nhiễu Gaussian có phương sai cố định. Chúng ta dùng lại phép suy đó cho phân phối quan sát có điều kiện theo biến ẩn, nhưng phải lấy kỳ vọng theo một phân phối mã hóa.
- **Giới hạn của tối ưu.** Bài 12 phân biệt khớp dữ liệu huấn luyện với tổng quát hóa. Bài 13 phân biệt giải một mô hình đã biết với học mô hình từ dữ liệu. Tương tự, tối ưu một cận của log-hợp lý không tự bảo đảm đã học đúng phân phối dữ liệu.

## Cách đọc và phân bổ thời gian

| Nội dung lý thuyết | Thời gian |
|---|---:|
| 14.1. PCA: giữ phương sai và tái tạo trực giao | 30 phút |
| 14.2. Bộ tự mã hóa tất định | 25 phút |
| 14.3. Mô hình xác suất có biến ẩn | 25 phút |
| 14.4. Suy luận biến phân, ELBO và VAE | 40 phút |
| **Tổng lý thuyết** | **120 phút** |

Ba bài trên lớp chiếm 30 phút riêng. Bốn bài tự học cần 180 phút; khoảng hai giờ còn lại dành cho đọc sách và kiểm tra chứng minh, tổng cộng khoảng năm giờ tự học.

Phần **cốt lõi** gồm PCA một chiều, tương đương phương sai–tái tạo, bộ tự mã hóa, mô hình sinh, tính không âm của KL, phân rã ELBO, công thức KL Gaussian và phép tái tham số hóa. Phần **mở rộng** gồm PCA nhiều chiều, chứng minh giá trị tối ưu của bộ tự mã hóa tuyến tính và điều kiện đổi đạo hàm với kỳ vọng. Phần **đọc thêm** dẫn đến PCA xác suất, các họ hậu nghiệm phong phú hơn và những hạn chế của VAE trong Murphy; không đòi hỏi chứng minh toàn bộ lý thuyết suy luận biến phân.

Số liệu là dữ liệu giả lập phục vụ học tập. Các Ví dụ 14.1, 14.3 và phần KL của Ví dụ 14.6 giữ dữ kiện trong `sources/part2/lecture_notes.pdf`, Tuần 5, §§9.1–9.4, trang in 22–24. Bốn bài E14.1–E14.4 là bài điều chỉnh từ W5.1–W5.4 trong `homework.pdf`, bổ sung chứng minh, diễn giải và kiểm tra giả thiết; chúng không phải bài tập nguyên bản của Murphy.

## Bảng ký hiệu

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $X,x$ | quan sát ngẫu nhiên; một giá trị quan sát | $\mathbb R^d$ trong mô hình Gaussian |
| $n,d,k$ | số quan sát, chiều dữ liệu, chiều biểu diễn | số nguyên dương, $k\le d$ |
| $\bar x$, $y_i=x_i-\bar x$ | trung bình mẫu; quan sát đã tâm hóa | vector cột trong $\mathbb R^d$ |
| $S$ | hiệp phương sai thực nghiệm dùng mẫu số $n$ | ma trận đối xứng nửa xác định dương |
| $u$, $U$ | hướng đơn vị; ma trận các cột trực chuẩn | $\mathbb R^d$; $\mathbb R^{d\times k}$ |
| $\lambda_j$, $v_j$ | trị riêng giảm dần; vector riêng đơn vị của $S$ | $\lambda_j\ge0$; $v_j\in\mathbb R^d$ |
| $\operatorname{tr}$, $I_k$ | vết ma trận; ma trận đơn vị | tổng phần tử đường chéo; $k\times k$ |
| $Z,z$ | biến ẩn hoặc mã biểu diễn; một giá trị | $\mathbb R^k$ |
| $\widehat x$ | quan sát được tái tạo | $\mathbb R^d$ |
| $f_\phi$, $g_\theta$ | bộ mã hóa; hàm giải mã hoặc trung bình giải mã | $\mathbb R^d\to\mathbb R^k$; $\mathbb R^k\to\mathbb R^d$ |
| $\phi$, $\theta$ | tham số suy luận; tham số mô hình sinh | vector thực hữu hạn chiều |
| $A$, $B$ | ma trận mã hóa, giải mã tuyến tính | $k\times d$; $d\times k$ |
| $\widehat J$ | lỗi tái tạo bình phương trung bình trên mẫu | số không âm |
| $p(z)$ | mật độ tiên nghiệm của biến ẩn | mật độ chuẩn hóa trên $\mathbb R^k$ |
| $p_\theta(x\mid z)$ | mật độ quan sát có điều kiện | mật độ chuẩn hóa theo $x$ với mỗi $z$ |
| $p_\theta(x)$, $p_\theta(z\mid x)$ | mật độ biên; mật độ hậu nghiệm | mật độ trên không gian quan sát; biến ẩn |
| $q_\phi(z\mid x)$ | mật độ hậu nghiệm xấp xỉ do bộ mã hóa sinh ra | mật độ trên $\mathbb R^k$ |
| $\tau^2$, $\mu_\phi(x)$, $\sigma_\phi(x)$ | phương sai nhiễu; trung bình và độ lệch chuẩn mã hóa | $\tau>0$; $\mathbb R^k$; $(0,\infty)^k$ |
| $D_{\mathrm{KL}}(q\Vert p)$ | phân kỳ Kullback–Leibler từ $q$ đến $p$ | $[0,\infty]$ |
| $\mathcal L(\theta,\phi;x)$ | cận dưới của log-hợp lý tại $x$ | số thực khi các kỳ vọng hữu hạn |
| $\varepsilon$, $\odot$ | nhiễu chuẩn; tích theo từng tọa độ | $\mathcal N(0,I_k)$; vector cùng chiều |
| $\mathbb E_q$, $\log$ | kỳ vọng theo $q$; logarit tự nhiên | khi tích phân tồn tại; đơn vị nat |

## 14.1. PCA: giữ phương sai và tái tạo trực giao

Một cảm biến ghi hai đặc trưng cho mỗi quan sát, nhưng bộ lưu trữ chỉ dành một số thực cho mỗi cặp. Bốn điểm $(2,0)^\top$, $(-2,0)^\top$, $(0,1)^\top$, $(0,-1)^\top$ cho thấy hai hướng không chứa cùng mức biến thiên. Nhiệm vụ là chọn một đường thẳng và một quy tắc tái tạo để mất ít thông tin bình phương nhất.

Về mặt hình học, hình chiếu lên một đường giữ phần song song và bỏ phần vuông góc. Một đường đi theo hướng đám mây trải rộng giữ được nhiều độ dài bình phương hơn. Đây là trực giác; tiêu chuẩn toán học còn cần tâm hóa dữ liệu, chuẩn hóa hướng và xác định cách tính lỗi.

### Từ phương sai thực nghiệm đến hướng chính

::: definition Định nghĩa 14.1 (Hiệp phương sai và phép chiếu của dữ liệu đã tâm hóa)
Cho $x_1,\ldots,x_n\in\mathbb R^d$. Đặt $\bar x=n^{-1}\sum_i x_i$ và $y_i=x_i-\bar x$, nên $\sum_i y_i=0$. Ma trận hiệp phương sai thực nghiệm dùng trong chương là

$$
S=\frac1n\sum_{i=1}^n y_i y_i^\top.
\tag{14.1}
$$

Với một hướng $u\in\mathbb R^d$ thỏa $u^\top u=1$, mã một chiều và tái tạo là $z_i=u^\top y_i$ và $\widehat x_i=\bar x+uz_i$. Phương sai thực nghiệm của các mã bằng $n^{-1}\sum_i z_i^2=u^\top Su$.
:::

Ma trận $S$ cùng loại với ước lượng hiệp phương sai Gaussian ở Bài 11, nhưng được dùng ở đây như một đại lượng mô tả mẫu; không cần giả thiết dữ liệu tuân Gaussian. Mẫu số $n-1$ sẽ nhân mọi trị riêng với cùng một hằng số khi $n>1$, nên không đổi hướng riêng. Công thức lỗi trung bình trong chương dùng mẫu số $n$ và phải được giữ nhất quán.

Ràng buộc $\|u\|_2=1$ làm phương sai giữa các hướng so sánh được. Nếu cho nhân $u$ với một số tùy ý, giá trị $u^\top Su$ có thể tăng chỉ vì đổi đơn vị của mã.

Kết quả tiếp theo dùng định lý phổ để biến tối ưu trên mặt cầu thành so sánh các trị riêng. Cơ sở đọc là Murphy (2022), tập I, §20.1 về phân tích thành phần chính.

::: theorem Định lý 14.2 (Hướng có phương sai lớn nhất)
**Giả thiết.** $S$ là ma trận hiệp phương sai trong Định nghĩa 14.1, với các trị riêng $\lambda_1\ge\cdots\ge\lambda_d\ge0$ và một cơ sở trực chuẩn gồm các vector riêng $v_1,\ldots,v_d$.

**Kết luận.** Bài toán

$$
\max_{u\in\mathbb R^d,\ \|u\|_2=1}u^\top Su
\tag{14.2}
$$

có giá trị tối ưu $\lambda_1$. Mọi vector đơn vị thuộc không gian riêng ứng với $\lambda_1$ đều là nghiệm; mọi nghiệm đều thuộc không gian riêng này.

**Điều kiện áp dụng.** Dữ liệu được tâm hóa và phương sai được đo theo khoảng cách Euclid trong hệ đơn vị đã chọn.

**Phạm vi.** Nếu $\lambda_1>\lambda_2$, hướng duy nhất đến dấu. Nếu trị riêng lớn nhất bội, hướng tối ưu có thể không duy nhất. Kết luận không khẳng định một quan hệ phi tuyến hoặc một mô hình sinh xác suất.
:::

::: proof Chứng minh Định lý 14.2
**Bước 1 (phân rã theo cơ sở riêng).** Viết $u=\sum_j a_jv_j$. Tính trực chuẩn cho $\sum_j a_j^2=1$. Vì $Sv_j=\lambda_jv_j$, ta có

$$
\begin{aligned}
u^\top Su&=\sum_{j=1}^d\lambda_j a_j^2\\
&\le\lambda_1\sum_{j=1}^d a_j^2\\
&=\lambda_1.
\end{aligned}
$$

**Bước 2 (đạt chặn và xác định nghiệm).** Chọn $u=v_1$ thì giá trị bằng $\lambda_1$. Đẳng thức trong chặn xảy ra đúng khi $a_j=0$ với mọi $j$ thỏa $\lambda_j<\lambda_1$. Do đó các nghiệm chính là các vector đơn vị trong không gian riêng lớn nhất. $\square$
:::

Trong học máy, vector $u$ là một ánh xạ đặc trưng học từ mẫu: $x\mapsto u^\top(x-\bar x)$. Định lý 14.2 cho nghiệm toàn cục của tiêu chuẩn giữ phương sai tuyến tính, không cần huấn luyện mạng. Việc một hướng có phương sai cao chỉ có nghĩa nó giữ nhiều biến thiên theo hệ đơn vị đã chọn; chưa bảo đảm nó chứa tín hiệu cần cho một nhiệm vụ phân loại.

::: example Ví dụ 14.1 (Nén bốn quan sát hai chiều)
**Dữ kiện.** Bốn quan sát là $(2,0)^\top$, $(-2,0)^\top$, $(0,1)^\top$, $(0,-1)^\top$. Ví dụ giữ dữ kiện của `lecture_notes.pdf`, Tuần 5, Ví dụ 9.1, trang 22.

**Tâm hóa và tính ma trận.** Trung bình bằng $\bar x=(0,0)^\top$. Tổng tích ngoài có đường chéo $(8,2)$ và hai phần tử ngoài đường chéo bằng $0$, nên

$$
S=\begin{pmatrix}2&0\\0&1/2\end{pmatrix}.
$$

**Chọn hướng và tái tạo.** Các trị riêng là $2$ và $1/2$. Theo Định lý 14.2, chọn $u=(1,0)^\top$. Bốn mã là $2,-2,0,0$, và bốn điểm tái tạo lần lượt là $(2,0)^\top$, $(-2,0)^\top$, $(0,0)^\top$, $(0,0)^\top$.

**Kết quả.** Lỗi bình phương từng điểm là $0,0,1,1$, tổng bằng $2$ và trung bình bằng $1/2$. Tỉ lệ phương sai giữ lại là $2/(2+1/2)=4/5$.

**Kiểm tra.** Nếu chọn trục đứng thì lỗi trung bình bằng $2$, lớn hơn $1/2$. Tổng phương sai $5/2$ bằng phương sai giữ lại $2$ cộng phương sai bị bỏ $1/2$.
:::

![Bốn điểm tại cộng trừ hai trên trục ngang và cộng trừ một trên trục đứng; phép chiếu lên trục ngang giữ hai điểm ngang và đưa hai điểm đứng về gốc.](img/lec-14/pca-projection.svg)

Hình 14.1. Các đoạn vuông góc biểu diễn phần bị bỏ khi nén; tổng bình phương độ dài của chúng bằng $2$. Hình được vẽ lại từ dữ kiện của Ví dụ 14.1, không sao chép hình nguồn.

### Từ giữ phương sai đến lỗi tái tạo

Một mã có phương sai lớn còn cần được nối với nhiệm vụ ban đầu: tái tạo quan sát từ mã. Với phép chiếu trực giao, hai mục tiêu dùng cùng một phân rã độ dài. Kết quả sau giải thích vì sao PCA giải bài toán nén bình phương, thay vì chỉ cung cấp một hướng dao động lớn.

::: proposition Mệnh đề 14.3 (Phương sai giữ lại và lỗi tái tạo)
**Giả thiết.** Dữ liệu đã tâm hóa có hiệp phương sai $S$. Ma trận $U\in\mathbb R^{d\times k}$ có $U^\top U=I_k$. Mã là $U^\top y_i$ và tái tạo là $UU^\top y_i$.

**Kết luận.** Lỗi bình phương trung bình thỏa

$$
\frac1n\sum_i\|y_i-UU^\top y_i\|_2^2
=\operatorname{tr}(S)-\operatorname{tr}(U^\top SU).
\tag{14.3}
$$

Với $k=1$, cực tiểu lỗi tương đương bài toán (14.2), và lỗi tối ưu bằng $\operatorname{tr}(S)-\lambda_1$. Tổng quát, chọn các cột $v_1,\ldots,v_k$ cho lỗi tối ưu $\sum_{j>k}\lambda_j$.

**Điều kiện áp dụng.** Tái tạo là phép chiếu trực giao lên không gian con tuyến tính; khi dữ liệu chưa tâm hóa, phải cộng lại $\bar x$.

**Phạm vi.** Đây là lỗi trên mẫu cho mất mát Euclid bình phương; không phải một bảo đảm tổng quát hóa hay một lựa chọn số chiều tối ưu cho mọi nhiệm vụ AI.
:::

::: proof Chứng minh Mệnh đề 14.3
**Bước 1 (hai thành phần vuông góc).** Đặt $P=UU^\top$. Từ $U^\top U=I_k$ suy ra $P^\top=P$ và $P^2=P$. Do $Py_i$ vuông góc với $(I_d-P)y_i$, định lý Pythagore cho

$$
\|y_i-Py_i\|_2^2=\|y_i\|_2^2-\|U^\top y_i\|_2^2.
$$

**Bước 2 (lấy trung bình).** Dùng $a^\top Ma=\operatorname{tr}(Maa^\top)$ và tính tuyến tính của vết, ta có $n^{-1}\sum_i\|y_i\|_2^2=\operatorname{tr}(S)$ và $n^{-1}\sum_i\|U^\top y_i\|_2^2=\operatorname{tr}(U^\top SU)$. Trừ hai đẳng thức cho (14.3).

**Bước 3 (mở rộng nhiều chiều).** Viết $b_j=\|U^\top v_j\|_2^2$. Vì đây là độ dài bình phương của hình chiếu một vector đơn vị, $0\le b_j\le1$, và $\sum_jb_j=k$. Do đó

$$
\begin{aligned}
\operatorname{tr}(U^\top SU)&=\sum_j\lambda_j b_j\\
&\le\sum_{j\le k}\lambda_j b_j+\lambda_k\sum_{j>k}b_j\\
&\le\sum_{j\le k}\lambda_j.
\end{aligned}
$$

Ở bất đẳng thức cuối, thay $\sum_{j>k}b_j$ bằng $\sum_{j\le k}(1-b_j)$ và dùng $\lambda_j\ge\lambda_k$ với $j\le k$. Chọn $U=(v_1,\ldots,v_k)$ đạt chặn. Trừ khỏi $\operatorname{tr}(S)=\sum_j\lambda_j$ cho lỗi tối ưu. $\square$
:::

Mệnh đề 14.3 chuyển tiêu chuẩn của Định lý 14.2 thành tiêu chuẩn tái tạo. Trong học máy, ta có thể chọn $k$ để giữ một tỉ lệ phương sai hoặc giới hạn lỗi nén trên mẫu. Nếu một đặc trưng chỉ đổi từ mét sang milimét, trị riêng và hướng tối ưu có thể đổi; chuẩn hóa đặc trưng là một lựa chọn mô hình, không phải bước vô hại trong mọi bối cảnh.

::: remark Nhận xét 14.4 (Phương sai và ý nghĩa của đặc trưng)
Xét $X=(M,N)$ với $M$ có phương sai $100$ và $N\in\{-1,1\}$ có phương sai $1$, hai biến độc lập và trung bình bằng $0$. Nếu nhãn cần dự đoán là $N$, PCA một chiều giữ $M$ nhưng bỏ toàn bộ tín hiệu nhãn. Tiêu chuẩn không giám sát của Định lý 14.2 không sử dụng nhãn nên không bảo đảm giữ đặc trưng dự đoán tốt nhất.
:::

::: exercise Bài tập 14.1 (Củng cố mục tiêu 1)
Cho dữ liệu đã tâm hóa có $S=\operatorname{diag}(3,1)$. Với $u=(\cos\alpha,\sin\alpha)^\top$, biểu diễn phương sai mã và lỗi tái tạo trung bình theo $\alpha$. Xác định mọi hướng tối ưu và kiểm tra tổng của hai đại lượng.
:::

::: hint Gợi ý Bài tập 14.1
Dùng $u^\top Su$ rồi áp dụng (14.3) với $\operatorname{tr}(S)=4$.
:::

::: solution Lời giải Bài tập 14.1
Phương sai mã là $3\cos^2\alpha+\sin^2\alpha=1+2\cos^2\alpha$. Lỗi bằng $4-(1+2\cos^2\alpha)=3-2\cos^2\alpha$. Các hướng tối ưu có $\cos^2\alpha=1$, tức $u=\pm(1,0)^\top$, cho phương sai $3$ và lỗi $1$. Hai đại lượng luôn cộng thành $4$, đúng bằng tổng phương sai.
:::

Định nghĩa 14.1 xác định đại lượng cần giữ; Định lý 14.2 chọn hướng và Mệnh đề 14.3 chứng minh nó cũng là phép tái tạo tuyến tính trực giao tốt nhất. Giới hạn còn lại nằm ở dạng tuyến tính của mã và hình chiếu. Chúng ta chuyển sang học hai ánh xạ để cho phép biểu diễn linh hoạt hơn, nhưng vẫn cần phân biệt nhiệm vụ tái tạo với nhiệm vụ sinh dữ liệu.

## 14.2. Bộ tự mã hóa tất định

Với bốn điểm ở Ví dụ 14.1, mã $z=x_1$ đủ tái tạo hai điểm nằm ngang nhưng mất thông tin của hai điểm đứng. Một tập quan sát nằm gần một đường cong có thể cần một ánh xạ phi tuyến để dùng một tọa độ hiệu quả. Chúng ta cần học cả cách mã hóa lẫn cách chuyển mã trở lại quan sát.

Một cách trực quan, bộ mã hóa gán tọa độ ít chiều, còn bộ giải mã dựng lại một điểm từ tọa độ đó. Đây là mô tả vai trò của hai hàm; nó chưa nói các tọa độ xuất hiện với xác suất nào.

::: definition Định nghĩa 14.5 (Bộ tự mã hóa và mục tiêu tái tạo)
Một **bộ tự mã hóa** (autoencoder, AE) tất định gồm bộ mã hóa $f_\phi:\mathbb R^d\to\mathbb R^k$ và bộ giải mã $g_\theta:\mathbb R^k\to\mathbb R^d$. Với quan sát $x$, mã là $z=f_\phi(x)$ và tái tạo là $\widehat x=g_\theta(f_\phi(x))$.

Với mất mát bình phương, bài toán huấn luyện trên mẫu là

$$
\min_{\theta,\phi}\widehat J(\theta,\phi),\qquad
\widehat J(\theta,\phi)=\frac1n\sum_i\|x_i-g_\theta(f_\phi(x_i))\|_2^2.
\tag{14.4}
$$

Khi dùng dữ liệu đã tâm hóa, hai hàm được áp dụng cho $y=x-\bar x$ và cộng lại $\bar x$ ở đầu ra.
:::

PCA của Mệnh đề 14.3 là một trường hợp của Định nghĩa 14.5 với $f(y)=U^\top y$ và $g(z)=Uz$. Khi cho phép các hàm phi tuyến, ảnh của bộ giải mã có thể là một tập cong. Ràng buộc $k<d$ tạo một nút thắt về số chiều, nhưng riêng điều đó không chứng minh rằng mô hình không thể ghi nhớ một mẫu hữu hạn.

Bộ tự mã hóa tuyến tính cho phép phân biệt hai đối tượng thường bị đồng nhất: ánh xạ tái tạo và các trục tọa độ của mã. Kết quả sau phát triển Mệnh đề 14.3 và dựa trên Murphy I, §20.3, về bộ tự mã hóa.

::: proposition Mệnh đề 14.6 (Giá trị tối ưu tuyến tính và sự không duy nhất của tọa độ)
**Giả thiết.** $y_i\in\mathbb R^d$ đã tâm hóa. Bộ mã hóa và giải mã tuyến tính không có ràng buộc thêm: $f(y)=Ay$, $g(z)=Bz$, với $A\in\mathbb R^{k\times d}$, $B\in\mathbb R^{d\times k}$, $1\le k\le d$. Mất mát là trung bình bình phương như (14.4).

**Kết luận.** Giá trị nhỏ nhất bằng $\sum_{j>k}\lambda_j$, đúng bằng lỗi PCA hạng $k$. Một lựa chọn tối ưu là $A=U^\top$, $B=U$, với $U=(v_1,\ldots,v_k)$. Với mọi ma trận khả nghịch $R\in\mathbb R^{k\times k}$, cặp $A'=RA$, $B'=BR^{-1}$ có cùng tái tạo và cùng lỗi.

**Điều kiện áp dụng.** Không có hàm kích hoạt phi tuyến, ràng buộc trọng số, số hạng phạt bổ sung hoặc nhiễu mã hóa; kết luận nói về cực tiểu toàn cục.

**Phạm vi.** Không khẳng định thuật toán gradient tìm được cực tiểu, cũng không khẳng định trọng số học được bằng các vector riêng hoặc mã có hiệp phương sai chéo.
:::

::: proof Chứng minh Mệnh đề 14.6
**Bước 1 (chặn mọi bộ giải mã tuyến tính).** Ảnh $W$ của $B$ là một không gian con có chiều không quá $k$. Với mỗi $i$, vector $BAy_i$ thuộc $W$. Hình chiếu trực giao $P_Wy_i$ là điểm gần $y_i$ nhất trong $W$, nên

$$
\|y_i-BAy_i\|_2^2\ge\|y_i-P_Wy_i\|_2^2.
$$

Mệnh đề 14.3 cho lỗi trung bình của mọi không gian con chiều không quá $k$ ít nhất là $\sum_{j>k}\lambda_j$. Nếu chiều nhỏ hơn $k$, có thể mở rộng cơ sở; việc mở rộng chỉ làm giảm hoặc giữ nguyên lỗi.

**Bước 2 (đạt chặn).** Chọn $A=U^\top$ và $B=U$ như trong phát biểu. Tái tạo $BAy_i=UU^\top y_i$ đạt lỗi $\sum_{j>k}\lambda_j$ theo Mệnh đề 14.3.

**Bước 3 (đổi tọa độ).** Nhân trực tiếp cho $B'A'=BR^{-1}RA=BA$. Mọi tái tạo giữ nguyên, dù mã đổi từ $Ay_i$ thành $RAy_i$. $\square$
:::

Trong học máy, Mệnh đề 14.6 cho phép dùng PCA làm mốc so sánh lỗi của một bộ tự mã hóa tuyến tính. Nó mở rộng lớp tham số hóa của Mệnh đề 14.3 nhưng không cải thiện giá trị tối ưu. Các hệ tọa độ khác nhau của mã có thể cho cùng dự đoán; muốn diễn giải từng tọa độ như một nhân tố riêng cần giả thiết hoặc ràng buộc bổ sung.

::: example Ví dụ 14.2 (Đổi độ lớn mã mà không đổi tái tạo)
**Dữ kiện.** Với bốn điểm $(\pm2,0)^\top$, $(0,\pm1)^\top$, chọn $A=(1\ \ 0)$, $B=(1\ \ 0)^\top$. Chọn thêm $R=(2)$, nên $A'=(2\ \ 0)$ và $B'=(1/2\ \ 0)^\top$.

**Tính.** Mã của $(2,0)^\top$ đổi từ $2$ thành $4$, nhưng hai tái tạo đều bằng $(2,0)^\top$. Mã của $(0,1)^\top$ vẫn bằng $0$ và tái tạo bằng gốc. Trên cả bốn điểm, lỗi trung bình vẫn bằng $1/2$.

**Diễn giải và kiểm tra.** Phương sai mã đổi từ $2$ thành $8$ khi đổi $A$ thành $A'$, trong khi $B'A'=BA=\operatorname{diag}(1,0)$. Vì vậy không thể đọc phương sai của mã AE không chuẩn hóa như các trị riêng PCA.
:::

::: example Ví dụ 14.3 (Tái tạo đúng chưa xác định xác suất)
**Dữ kiện.** Hai điểm huấn luyện là $(-2,0)^\top$ và $(2,0)^\top$. Dùng $f(x_1,x_2)=x_1$ và $g(z)=(z,0)^\top$. Ví dụ điều chỉnh từ `lecture_notes.pdf`, Ví dụ 9.2, trang 23.

**Tái tạo.** Hai mã là $-2$ và $2$; cả hai điểm được tái tạo đúng, nên lỗi trên mẫu bằng $0$.

**Thiếu phân phối.** Nếu chọn $Z$ bằng $-2$ hoặc $2$ với xác suất bằng nhau rồi lấy $X=g(Z)$, mô hình sinh chỉ hai điểm. Nếu thay bằng $Z\sim\mathcal N(0,1)$, dữ liệu sinh trải dọc toàn trục ngang. Hai cơ chế dùng cùng hàm $g$ nhưng có phân phối khác nhau.

**Kiểm tra.** Cơ chế thứ nhất cho $\mathbb E[Z^2]=4$, cơ chế thứ hai cho $\mathbb E[Z^2]=1$. Lỗi tái tạo bằng $0$ ở hai điểm huấn luyện không chọn được cơ chế nào. Hơn nữa, cả hai phân phối của $X$ đều tập trung trên trục ngang, nên không có mật độ hai chiều đối với diện tích nếu không thêm nhiễu quan sát.
:::

::: remark Nhận xét 14.7 (Khả năng biểu diễn và chất lượng sinh)
Một bộ tự mã hóa phi tuyến có thể giảm lỗi trên mẫu nhờ biểu diễn linh hoạt hơn. Định nghĩa 14.5 không quy định phân phối của mã, cũng không ràng buộc bộ giải mã tại những mã chưa xuất hiện khi huấn luyện. Do đó nội suy đẹp giữa vài mã hoặc lỗi huấn luyện nhỏ không chứng minh lấy mã ngẫu nhiên sẽ cho dữ liệu phù hợp.
:::

::: exercise Bài tập 14.2 (Củng cố mục tiêu 2)
Cho $f(x_1,x_2)=3x_1$, $g(z)=(z/3,0)^\top$ và $x=(1,2)^\top$. Tính mã, tái tạo và lỗi bình phương. Nêu một lý do không thể gán xác suất cho một miền quan sát chỉ từ hai hàm này.
:::

::: hint Gợi ý Bài tập 14.2
Tính hợp $g\circ f$ và phân biệt ánh xạ với phân phối đầu vào của ánh xạ.
:::

::: solution Lời giải Bài tập 14.2
Mã là $3$, tái tạo $(1,0)^\top$ và lỗi $\|(1,2)^\top-(1,0)^\top\|_2^2=4$. Hợp hai hàm là phép chiếu lên trục ngang dù mã đã được nhân $3$. Chưa có phân phối cho $Z$ hoặc nhiễu quan sát, nên chưa có xác suất của một miền dữ liệu. Kiểm tra bằng cách chọn hai phân phối khác nhau cho $Z$: cùng hàm $g$ cho các xác suất miền khác nhau.
:::

Định nghĩa 14.5 cho mục tiêu học biểu diễn qua tái tạo; Mệnh đề 14.6 chỉ ra giới hạn của việc diễn giải tọa độ mã từ mục tiêu đó. Ví dụ 14.3 xác định phần còn thiếu để sinh dữ liệu: một cơ chế chọn mã và một phân phối quan sát. Chúng ta bổ sung hai đối tượng này để chuyển từ ánh xạ tất định sang mô hình xác suất.

## 14.3. Mô hình xác suất có biến ẩn

Hai điểm nằm ngang có thể là kết quả của một biến ẩn mô tả mức tín hiệu và một nhiễu cảm biến. Thay vì chỉ chọn một tọa độ để tái tạo, chúng ta cần gán xác suất cho những mã có thể xảy ra và mô tả độ phân tán của quan sát quanh đầu ra giải mã.

Về mặt ý tưởng, cơ chế sinh có hai bước: chọn trạng thái tiềm ẩn rồi tạo quan sát có điều kiện theo trạng thái ấy. Trực giác này phân biệt sự ngẫu nhiên trong mã với nhiễu ở quan sát; định nghĩa dưới đây xác định cách hai phân phối kết hợp.

::: definition Định nghĩa 14.8 (Mô hình sinh có biến ẩn)
Một mô hình có biến ẩn liên tục gồm mật độ tiên nghiệm $p(z)$ trên $\mathbb R^k$ và mật độ có điều kiện $p_\theta(x\mid z)$ trên $\mathbb R^d$, mỗi mật độ được chuẩn hóa theo biến tương ứng. Mật độ đồng thời và mật độ biên là

$$
p_\theta(x,z)=p_\theta(x\mid z)p(z),\qquad
p_\theta(x)=\int_{\mathbb R^k}p_\theta(x\mid z)p(z)\,dz.
\tag{14.5}
$$

Một lựa chọn Gaussian là

$$
p(z)=\mathcal N(0,I_k),\qquad
p_\theta(x\mid z)=\mathcal N(g_\theta(z),\tau^2I_d),\quad\tau>0.
\tag{14.6}
$$

Ở đây $g_\theta(z)$ là trung bình có điều kiện, không phải toàn bộ phân phối giải mã.
:::

Định nghĩa 14.8 bổ sung phân phối cho bộ giải mã trong Định nghĩa 14.5. Do tích phân của một hàm không âm có thể đổi thứ tự, lấy tích phân (14.5) theo $x$ cho $\int p_\theta(x)\,dx=\int p(z)\,dz=1$. Như vậy mô hình được chuẩn hóa ngay cả khi chưa tính được tích phân biên tại một quan sát cụ thể.

Nhiễu có phương sai $\tau^2>0$ làm mô hình Gaussian có mật độ trên toàn không gian quan sát. Nếu đặt $\tau=0$ và $k<d$, ảnh của bộ giải mã có thể nằm trên một tập ít chiều; khi đó không được dùng công thức mật độ Gaussian đầy chiều với phương sai bằng $0$.

### Ba nhiệm vụ tính toán khác nhau

::: definition Định nghĩa 14.9 (Sinh mẫu, hợp lý và suy luận hậu nghiệm)
Với mô hình trong Định nghĩa 14.8:

1. **Sinh mẫu** là lấy $z\sim p(z)$ rồi lấy $x\sim p_\theta(x\mid z)$.
2. **Đánh giá hợp lý** tại quan sát $x$ là tính $p_\theta(x)$ hoặc $\log p_\theta(x)$, dùng tích phân (14.5).
3. **Suy luận hậu nghiệm** tại $x$ có $p_\theta(x)>0$ là xác định phân phối

$$
p_\theta(z\mid x)=\frac{p_\theta(x\mid z)p(z)}{p_\theta(x)}.
\tag{14.7}
$$
:::

Hậu nghiệm của Định nghĩa 14.9 dùng Bayes trong Bài 10, còn hợp lý coi $x$ đã cố định và $\theta$ là tham số cần học như ở Bài 11. Khi $g_\theta$ là mạng phi tuyến, lấy mẫu vẫn có thể chỉ cần một lần chạy mạng, nhưng việc chuẩn hóa hậu nghiệm đòi hỏi tích phân theo mọi mã. Tính được tử số tại từng $z$ không đồng nghĩa tính được mẫu số.

::: example Ví dụ 14.4 (Một mô hình sinh hai chiều tính được chính xác)
**Dữ kiện và giả thiết.** Cho $Z\sim\mathcal N(0,1)$, hai nhiễu $\eta_1,\eta_2$ độc lập với nhau và với $Z$, mỗi nhiễu có phân phối $\mathcal N(0,1/2)$. Đặt $X=(\sqrt{3/2}Z+\eta_1,\eta_2)^\top$. Đây là (14.6) với $k=1$, $g(z)=(\sqrt{3/2}z,0)^\top$, $\tau^2=1/2$.

**Mật độ biên.** Một biến đổi tuyến tính của các biến Gaussian độc lập vẫn Gaussian. Trung bình bằng $0$, các phương sai là $3/2+1/2=2$ và $1/2$, hiệp phương sai bằng $0$. Do đó

$$
X\sim\mathcal N\!\left(\begin{pmatrix}0\\0\end{pmatrix},
\begin{pmatrix}2&0\\0&1/2\end{pmatrix}\right).
$$

**Hậu nghiệm.** Đặt $w=\sqrt{3/2}$. Với $x$ cố định, các số hạng chứa $z$ trong log-mật độ đồng thời là

$$
-\frac12z^2-(x_1-wz)^2
=-2\left(z-\frac{wx_1}{2}\right)^2+\text{hằng số theo }z.
$$

Suy ra $Z\mid X=x\sim\mathcal N(wx_1/2,1/4)$. Với $x=(2,0)^\top$, trung bình hậu nghiệm là $w=\sqrt{3/2}$ và phương sai là $1/4$.

**Diễn giải và kiểm tra.** Hiệp phương sai biên trùng $S$ ở Ví dụ 14.1, nhưng phân phối Gaussian liên tục không phải phân phối thực nghiệm bốn điểm. Hoàn bình phương cho hệ số $-2=-1/(2\cdot1/4)$, xác nhận phương sai hậu nghiệm. Tọa độ $x_2$ không ảnh hưởng hậu nghiệm vì nó chỉ chứa nhiễu độc lập.
:::

Ví dụ 14.4 là trường hợp tuyến tính Gaussian tính được biên và hậu nghiệm bằng đại số. Khi thay $wz$ bằng một mạng phi tuyến, log-mật độ theo $z$ thường không còn là hàm toàn phương nên hoàn bình phương không áp dụng. Vấn đề không nằm ở việc thiếu công thức Bayes, mà ở khả năng tính tích phân và kỳ vọng mà công thức đó yêu cầu. Murphy II, §21.1–§21.2 đặt mô hình có biến ẩn và VAE trong bối cảnh này.

::: exercise Bài tập 14.3 (Củng cố mục tiêu 3)
Cho $Z\sim\mathcal N(0,1)$, $X\mid Z=z\sim\mathcal N(z,1)$ và quan sát $x=1$. Tính phân phối biên của $X$ và hậu nghiệm $Z\mid X=1$. Mô tả cách sinh một quan sát mới mà không cần biết hậu nghiệm tại $x=1$.
:::

::: hint Gợi ý Bài tập 14.3
Viết $X=Z+\eta$ với nhiễu chuẩn độc lập, rồi hoàn bình phương trong $-z^2/2-(1-z)^2/2$.
:::

::: solution Lời giải Bài tập 14.3
Do $X=Z+\eta$, $\eta\sim\mathcal N(0,1)$ độc lập, ta có $X\sim\mathcal N(0,2)$. Với $x=1$, số mũ là $-(z-1/2)^2-1/4$, nên hậu nghiệm là $\mathcal N(1/2,1/2)$. Để sinh mẫu mới, lấy hai mẫu độc lập $z,\eta\sim\mathcal N(0,1)$ rồi trả về $x'=z+\eta$. Kiểm tra: phương sai mẫu mới là $2$, còn phương sai hậu nghiệm chỉ là $1/2$; đây là hai phân phối khác nhiệm vụ.
:::

Định nghĩa 14.8 xây dựng phân phối dữ liệu bằng phép lấy biên; Định nghĩa 14.9 tách lấy mẫu khỏi tính hợp lý và hậu nghiệm. Ví dụ 14.4 cho một trường hợp giải chính xác để làm mốc kiểm tra. Với bộ giải mã phi tuyến, chúng ta giữ mô hình sinh nhưng thay hậu nghiệm khó tính bằng một họ phân phối dễ tính và một mục tiêu tối ưu có thể ước lượng.

## 14.4. Suy luận biến phân, ELBO và VAE

Trong mô hình biến ẩn, cực đại log-hợp lý vẫn là một lựa chọn học tham số như Bài 11. Khó khăn mới là $\log p_\theta(x)$ chứa tích phân theo $z$. Chúng ta cần một đại lượng tính được bằng các kỳ vọng theo phân phối tự chọn, đồng thời biết chính xác đại lượng đó lệch khỏi log-hợp lý bao nhiêu.

Về mặt ý tưởng, một phân phối dễ lấy mẫu sẽ đặt khối lượng ở các mã có thể giải thích quan sát. Đây là trực giác của xấp xỉ hậu nghiệm. Cần xác định một thước đo phân phối và một đẳng thức để biết lựa chọn đó liên quan thế nào đến mô hình sinh.

### Phân kỳ KL và tính không âm

::: definition Định nghĩa 14.10 (Phân kỳ Kullback–Leibler)
Với hai mật độ chuẩn hóa $q,p$ trên cùng không gian, **phân kỳ Kullback–Leibler** (Kullback–Leibler divergence, KL) là

$$
D_{\mathrm{KL}}(q\Vert p)=\int q(z)\log\frac{q(z)}{p(z)}\,dz.
\tag{14.8}
$$

Quy ước $0\log(0/p)=0$. Nếu $q$ gán khối lượng dương cho một tập mà $p$ bằng $0$, phân kỳ bằng $+\infty$. Điều kiện $q$ tuyệt đối liên tục đối với $p$ có nghĩa mọi tập có xác suất $0$ theo $p$ cũng có xác suất $0$ theo $q$.
:::

So với hiệu giữa hai trung bình hoặc hai hiệp phương sai, Định nghĩa 14.10 so sánh toàn bộ mật độ. Thứ tự $q\Vert p$ có vai trò: kỳ vọng được lấy theo $q$. KL không phải khoảng cách metric vì nói chung không đối xứng và không thỏa bất đẳng thức tam giác.

Kết quả sau là cơ sở để biến một phân rã đẳng thức thành cận dưới. Nguồn chính là Murphy I, §6.2.4 về tính không âm của phân kỳ KL; chứng minh dưới đây dùng bất đẳng thức vô hướng $\log t\le t-1$ với $t>0$.

::: lemma Bổ đề 14.11 (KL không âm)
**Giả thiết.** $p,q$ là các mật độ chuẩn hóa. Tích phân KL được hiểu theo giá trị mở rộng.

**Kết luận.** $D_{\mathrm{KL}}(q\Vert p)\ge0$, và dấu bằng xảy ra khi và chỉ khi $q=p$ hầu khắp nơi đối với độ đo nền.

**Điều kiện áp dụng.** Hai phân phối được biểu diễn trên cùng không gian và cùng độ đo nền. Khi $q$ không tuyệt đối liên tục đối với $p$, kết luận không âm vẫn đúng vì KL bằng $+\infty$.

**Phạm vi.** Kết quả không cho tính đối xứng và không suy rằng KL nhỏ tại một quan sát bảo đảm toàn bộ mô hình dữ liệu đúng.
:::

::: proof Chứng minh Bổ đề 14.11
**Bước 1 (bất đẳng thức logarit).** Hàm $t-1-\log t$ có đạo hàm $1-1/t$, giảm trên $(0,1)$ và tăng trên $(1,\infty)$. Giá trị nhỏ nhất bằng $0$ tại $t=1$, nên $-\log t\ge1-t$, với dấu bằng đúng khi $t=1$.

**Bước 2 (tích phân trên miền $q>0$).** Nếu KL vô hạn thì không âm. Trong trường hợp hữu hạn, đặt $C=\{z:q(z)>0\}$ và áp dụng Bước 1 với $t=p(z)/q(z)$ tại những điểm liên quan. Ta được

$$
\begin{aligned}
D_{\mathrm{KL}}(q\Vert p)&\ge\int_C q(z)\left(1-\frac{p(z)}{q(z)}\right)\,dz\\
&=1-\int_Cp(z)\,dz\\
&\ge0.
\end{aligned}
$$

**Bước 3 (đẳng thức).** Muốn KL bằng $0$, cần $\int_Cp=1$ và $p/q=1$ hầu khắp nơi theo $q$. Vì vậy $p=q$ trên $C$ và $p$ không còn khối lượng ngoài $C$. Ngược lại, nếu $p=q$ hầu khắp nơi, tích phân bằng $0$. $\square$
:::

Trong học máy, Bổ đề 14.11 cho phép dùng KL để phạt sự lệch của phân phối mã hóa khỏi một phân phối tham chiếu. Nhưng cần chỉ rõ phân phối tham chiếu là tiên nghiệm hay hậu nghiệm: hai lựa chọn dẫn đến hai vai trò khác nhau trong ELBO.

### Phân rã log-hợp lý

::: definition Định nghĩa 14.12 (Hậu nghiệm xấp xỉ và cận ELBO)
Với $x$ cố định, chọn một mật độ $q_\phi(z\mid x)$ dễ lấy mẫu để xấp xỉ hậu nghiệm $p_\theta(z\mid x)$. **Cận dưới của log-hợp lý** (evidence lower bound, ELBO) là

$$
\begin{aligned}
\mathcal L(\theta,\phi;x)
&=\mathbb E_{q_\phi(z\mid x)}\!\left[\log\frac{p_\theta(x,z)}{q_\phi(z\mid x)}\right]\\
&=\mathbb E_{q_\phi(z\mid x)}[\log p_\theta(x\mid z)]
-D_{\mathrm{KL}}\!\left(q_\phi(z\mid x)\Vert p(z)\right),
\end{aligned}
\tag{14.9}
$$

khi các kỳ vọng và phân kỳ trong đẳng thức hữu hạn. Một trường hợp thường dùng là $q_\phi(z\mid x)=\mathcal N(\mu_\phi(x),\operatorname{diag}(\sigma_\phi^2(x)))$ với mọi $\sigma_{\phi,j}(x)>0$.
:::

Định nghĩa 14.12 dùng một bộ mã hóa phân phối thay cho mã đơn lẻ của Định nghĩa 14.5. Vector $\mu_\phi(x)$ cho vị trí của phân phối mã hóa, còn $\sigma_\phi^2(x)$ mô tả độ bất định theo từng tọa độ. Phân phối $q_\phi$ là công cụ suy luận; mô hình sinh vẫn do $p(z)$ và $p_\theta(x\mid z)$ xác định.

Kết quả sau dùng Bayes ở (14.7) và Bổ đề 14.11. Nó giải thích cả tên gọi cận dưới lẫn đại lượng bị mất khi thay hậu nghiệm chính xác bằng một họ xấp xỉ. Nguồn đọc là Murphy II, §10.1.1 và §21.2.2. Đối chiếu bổ trợ: Kingma và Welling, §§2.2–2.3, công thức (1)–(3), về phân rã và cận ELBO.

::: theorem Định lý 14.13 (Phân rã ELBO)
**Giả thiết.** Với quan sát $x$ cố định, $0<p_\theta(x)<\infty$. Mật độ $q_\phi(\cdot\mid x)$ tuyệt đối liên tục đối với $p_\theta(\cdot\mid x)$. Các số hạng kỳ vọng và KL dưới đây hữu hạn.

**Kết luận.** Ta có đẳng thức

$$
\log p_\theta(x)=\mathcal L(\theta,\phi;x)
+D_{\mathrm{KL}}\!\left(q_\phi(z\mid x)\Vert p_\theta(z\mid x)\right).
\tag{14.10}
$$

Vì vậy $\mathcal L(\theta,\phi;x)\le\log p_\theta(x)$, với dấu bằng đúng khi $q_\phi(z\mid x)=p_\theta(z\mid x)$ hầu khắp nơi.

**Điều kiện áp dụng.** Đẳng thức hữu hạn yêu cầu các mật độ có miền hỗ trợ phù hợp và các kỳ vọng tồn tại. Không dùng phép trừ $\infty-\infty$ để suy ra một ELBO số thực.

**Phạm vi.** Với $\theta$ cố định, tối đa hóa ELBO theo $\phi$ tương đương giảm KL tới hậu nghiệm trong họ đang chọn. Khi đồng thời thay $\theta$, tăng ELBO chưa đủ để kết luận log-hợp lý luôn tăng.
:::

::: proof Chứng minh Định lý 14.13
**Bước 1 (thay công thức Bayes).** Tại những $z$ có khối lượng theo $q_\phi$, Bayes cho

$$
\log\frac{q_\phi(z\mid x)}{p_\theta(z\mid x)}
=\log q_\phi(z\mid x)-\log p_\theta(x,z)+\log p_\theta(x).
$$

**Bước 2 (lấy kỳ vọng).** Vì $x$ cố định và $q_\phi$ được chuẩn hóa, kỳ vọng của số hạng cuối vẫn là $\log p_\theta(x)$. Do đó

$$
\begin{aligned}
D_{\mathrm{KL}}(q_\phi\Vert p_\theta(\cdot\mid x))
&=\mathbb E_{q_\phi}[\log q_\phi(z\mid x)-\log p_\theta(x,z)]+\log p_\theta(x)\\
&=-\mathcal L(\theta,\phi;x)+\log p_\theta(x).
\end{aligned}
$$

Chuyển vế cho (14.10). Dùng $p_\theta(x,z)=p_\theta(x\mid z)p(z)$ rồi tách logarit thu được dạng hai số hạng trong (14.9).

**Bước 3 (cận và điều kiện bằng).** Bổ đề 14.11 cho KL tới hậu nghiệm không âm, nên ELBO là cận dưới. Điều kiện bằng của bổ đề cho điều kiện bằng trong định lý. $\square$
:::

Định lý 14.13 dùng tính không âm ở Bổ đề 14.11 để chuyển bài toán tích phân khó thành một bài toán tối ưu cận. Trong học máy, kỳ vọng tái tạo thưởng cho các mã làm quan sát có mật độ cao dưới bộ giải mã. Số hạng $D_{\mathrm{KL}}(q_\phi\Vert p)$ so với **tiên nghiệm** nằm trong mục tiêu; KL so với **hậu nghiệm** ở (14.10) là khe hở của cận, thường không tính được trực tiếp.

Một cách suy cận khác là viết $p_\theta(x)=\mathbb E_q[p_\theta(x,Z)/q(Z)]$ rồi dùng tính lõm của logarit. Cách viết đó cần $q$ phủ miền có khối lượng của mật độ đồng thời để đẳng thức tích phân giữ nguyên. Chứng minh bằng Bayes ở đây chỉ dùng các điều kiện đã ghi trong Định lý 14.13 và tránh ngầm đổi điều kiện hỗ trợ.

::: exercise Bài tập 14.4 (Củng cố mục tiêu 4)
Với $\theta$ cố định, giả sử $\log p_\theta(x)=-3$. Hai mật độ xấp xỉ $q_1,q_2$ có KL tới hậu nghiệm lần lượt là $0.7$ và $0.2$. Tính hai ELBO. Nếu một phân phối xấp xỉ có KL tới tiên nghiệm bằng $0$, có thể kết luận ELBO bằng $-3$ không?
:::

::: hint Gợi ý Bài tập 14.4
Dùng (14.10); kiểm tra phân phối ở vị trí thứ hai trong mỗi KL.
:::

::: solution Lời giải Bài tập 14.4
Các ELBO là $-3.7$ và $-3.2$; giảm KL tới hậu nghiệm làm cận chặt hơn khi mô hình được giữ cố định. KL tới tiên nghiệm bằng $0$ chỉ cho $q=p(z)$, trong khi dấu bằng của cận yêu cầu $q=p_\theta(z\mid x)$. Hai điều kiện trùng nhau chỉ khi hậu nghiệm đúng bằng tiên nghiệm. Vì vậy chưa thể kết luận ELBO bằng $-3$.
:::

### KL Gaussian và kỳ vọng tái tạo

Để dùng (14.9), chúng ta cần tính được KL hoặc ước lượng nó. Lựa chọn tiên nghiệm chuẩn và bộ mã hóa Gaussian chéo cho một công thức giải tích; phần giải mã vẫn có thể là mạng phi tuyến. Kết quả sau áp dụng Định nghĩa 14.10 và các moment Gaussian trong Bài 10, theo cách dùng Gaussian trong Murphy I, §6.2.3 và Murphy II, §21.2.2. Kingma và Welling, §3, công thức (10), cung cấp dạng KL Gaussian chéo trong mục tiêu VAE.

::: proposition Mệnh đề 14.14 (KL Gaussian chéo so với chuẩn)
**Giả thiết.** $q=\mathcal N(\mu,\operatorname{diag}(s_1^2,\ldots,s_k^2))$, với $\mu\in\mathbb R^k$, mọi $s_j>0$, và $p=\mathcal N(0,I_k)$.

**Kết luận.** Phân kỳ bằng

$$
D_{\mathrm{KL}}(q\Vert p)
=\frac12\sum_{j=1}^k\left(\mu_j^2+s_j^2-1-\log s_j^2\right).
\tag{14.11}
$$

**Điều kiện áp dụng.** Các tọa độ độc lập dưới hai phân phối và phương sai mã hóa dương. $s_j$ là độ lệch chuẩn, $s_j^2$ là phương sai.

**Phạm vi.** Công thức này tính KL tới tiên nghiệm chuẩn, không tự tính KL tới hậu nghiệm của một bộ giải mã phi tuyến. Gaussian có hiệp phương sai không chéo cần công thức ma trận tương ứng.
:::

::: proof Chứng minh Mệnh đề 14.14
**Bước 1 (một tọa độ).** Với $q=\mathcal N(\mu,s^2)$ và $p=\mathcal N(0,1)$, lấy hiệu log-mật độ cho

$$
\log\frac{q(z)}{p(z)}
=-\log s-\frac{(z-\mu)^2}{2s^2}+\frac{z^2}{2}.
$$

Dưới $q$, ta có $\mathbb E_q[(Z-\mu)^2]=s^2$ và $\mathbb E_q[Z^2]=\mu^2+s^2$. Do đó kỳ vọng của biểu thức là $\tfrac12(\mu^2+s^2-1-\log s^2)$.

**Bước 2 (cộng các tọa độ).** Mật độ Gaussian chéo phân tích thành tích các mật độ một chiều. Logarit của tỉ số trở thành tổng; tính tuyến tính của kỳ vọng cho (14.11). Mỗi số hạng hữu hạn vì $s_j>0$. $\square$
:::

Trong học máy, Mệnh đề 14.14 loại bỏ nhiễu Monte Carlo khỏi số hạng KL tới tiên nghiệm cho lựa chọn Gaussian chéo. Một mạng có thể xuất $a_j(x)=\log\sigma_{\phi,j}^2(x)$ rồi đặt $\sigma_{\phi,j}(x)=\exp(a_j(x)/2)$ để bảo đảm dương. Đây là tham số hóa của phương sai, không phải một giả thiết rằng hậu nghiệm thật có các tọa độ độc lập.

::: example Ví dụ 14.5 (Mật độ giải mã và lỗi bình phương)
**Dữ kiện.** Cho $d=2$, $p_\theta(x\mid z)=\mathcal N(g_\theta(z),\tau^2I_2)$, $g_\theta(z)=(z,0)^\top$, $\tau^2=1/2$, quan sát $x=(0,1)^\top$, và $q(z\mid x)=\mathcal N(0,1/4)$.

**Kỳ vọng tái tạo.** Từ log-mật độ Gaussian,

$$
\mathbb E_q[\log p_\theta(x\mid Z)]
=-\frac d2\log(2\pi\tau^2)
-\frac{\mathbb E_q\|x-g_\theta(Z)\|_2^2}{2\tau^2}.
\tag{14.12}
$$

Ở đây $\|x-g_\theta(Z)\|_2^2=Z^2+1$, nên kỳ vọng bình phương là $1/4+1=5/4$. Thay $d=2$, $\tau^2=1/2$, ta được kỳ vọng log-mật độ $-\log\pi-5/4\approx-2.39473$.

**Diễn giải và kiểm tra.** Dùng duy nhất trung bình mã $z=0$ sẽ cho lỗi $1$, nhỏ hơn kỳ vọng $5/4$ vì bỏ qua bất định mã hóa. Công thức cũng cho hệ số trước lỗi bằng $1/(2\tau^2)=1$, xác nhận kết quả. Hằng số Gaussian phải giữ khi báo ELBO số; chỉ có thể bỏ khi tối ưu các tham số không làm nó thay đổi.
:::

::: example Ví dụ 14.6 (Tính ELBO và khe hở trong mô hình vô hướng)
**Dữ kiện.** Cho $p(z)=\mathcal N(0,1)$, $q(z\mid x)=\mathcal N(1,1/4)$, $p_\theta(x\mid z)=\mathcal N(z,1)$ và $x=1$. KL dùng dữ kiện của `lecture_notes.pdf`, Ví dụ 9.3, trang 23; phần kỳ vọng điều chỉnh từ `homework.pdf`, W5.3.

**KL tới tiên nghiệm.** Mệnh đề 14.14 cho

$$
D_{\mathrm{KL}}(q\Vert p)=\frac12\left(\frac14+\log4\right)
\approx0.818147.
$$

**Kỳ vọng tái tạo và ELBO.** Dùng $\mathbb E_q[(1-Z)^2]=(1-\mathbb E_qZ)^2+\operatorname{Var}_qZ=1/4$, ta có

$$
\begin{aligned}
\mathbb E_q[\log p_\theta(1\mid Z)]&=-\frac12\log(2\pi)-\frac18,\\
\mathcal L&=-\frac12\log(2\pi)-\frac14-\log2\\
&\approx-1.862086.
\end{aligned}
$$

**Kiểm tra cận chính xác.** Biên là $X\sim\mathcal N(0,2)$, nên $\log p_\theta(1)=-\tfrac12\log(4\pi)-\tfrac14\approx-1.515512$. Hậu nghiệm là $\mathcal N(1/2,1/2)$ như Bài tập 14.3. Khe hở $\log p_\theta(1)-\mathcal L=\tfrac12\log2\approx0.346574$ dương. Tích phân trực tiếp giữa hai Gaussian cũng cho $D_{\mathrm{KL}}(\mathcal N(1,1/4)\Vert\mathcal N(1/2,1/2))=\tfrac12\log2$, xác nhận (14.10).
:::

### Từ suy luận biến phân đến VAE

Chọn riêng một bộ tham số xấp xỉ cho từng quan sát sẽ làm số biến tối ưu tăng theo cỡ mẫu. Chúng ta thay bằng một bộ mã hóa chung $x\mapsto(\mu_\phi(x),\sigma_\phi(x))$. Về mặt trực quan, cùng một mạng học quy tắc suy luận cho nhiều quan sát; đây là trực giác của suy luận dùng chung tham số, không phải bảo đảm họ Gaussian sẽ biểu diễn được mọi hậu nghiệm.

::: definition Định nghĩa 14.15 (Bộ tự mã hóa biến phân)
Một **bộ tự mã hóa biến phân** (variational autoencoder, VAE) kết hợp mô hình sinh $p(z)p_\theta(x\mid z)$ với bộ mã hóa phân phối $q_\phi(z\mid x)$ dùng chung tham số trên các quan sát. Với mẫu $x_1,\ldots,x_n$, bài toán học là

$$
\max_{\theta,\phi}\frac1n\sum_{i=1}^n\mathcal L(\theta,\phi;x_i).
\tag{14.13}
$$

Trong trường hợp Gaussian thường dùng, $p(z)=\mathcal N(0,I_k)$, $q_\phi(z\mid x)=\mathcal N(\mu_\phi(x),\operatorname{diag}(\sigma_\phi^2(x)))$ và $p_\theta(x\mid z)=\mathcal N(g_\theta(z),\tau^2I_d)$ với $\tau>0$ cố định.
:::

Định nghĩa 14.15 dùng ELBO của Định nghĩa 14.12 làm mục tiêu thay cho lỗi tất định của Định nghĩa 14.5. Tham số $\theta$ quyết định phân phối quan sát có điều kiện; tham số $\phi$ quyết định các mã được dùng để xấp xỉ kỳ vọng và hậu nghiệm. Với tiên nghiệm cố định, KL tới tiên nghiệm không chứa $\theta$ trực tiếp, nhưng cả hai nhóm tham số đều ảnh hưởng kỳ vọng tái tạo.

![Hai đường khác nhau: suy luận đưa quan sát x qua bộ mã hóa thành trung bình và độ lệch chuẩn rồi tạo z; sinh mẫu lấy z từ tiên nghiệm rồi lấy x theo phân phối giải mã.](img/lec-14/vae-paths.svg)

Hình 14.2. Đường suy luận có điều kiện theo quan sát; đường sinh mẫu bắt đầu từ tiên nghiệm. Lúc sinh dữ liệu mới không cần đưa một quan sát huấn luyện qua bộ mã hóa. Hình tự biên soạn từ Định nghĩa 14.15.

### Tái tham số hóa và đạo hàm

Kỳ vọng trong (14.9) phụ thuộc $\phi$ qua phân phối của $Z$. Nếu chỉ coi một mẫu $z$ đã rút là một hằng số khi lấy đạo hàm, ta bỏ mất sự thay đổi của phân phối mã hóa. Chúng ta chuyển nguồn ngẫu nhiên về một biến nhiễu không phụ thuộc tham số rồi viết mẫu như một hàm của tham số. Cơ sở đọc là Murphy II, §10.2.1; Kingma và Welling, §§2.3–2.4, công thức (4)–(7), giải thích cách ước lượng gradient và dùng chung bộ mã hóa.

::: proposition Mệnh đề 14.16 (Phép tái tham số hóa Gaussian và gradient)
**Giả thiết.** Với $x$ cố định, $\varepsilon\sim\mathcal N(0,I_k)$ độc lập với tham số. Đặt

$$
Z_\phi=\mu_\phi(x)+\sigma_\phi(x)\odot\varepsilon,
\qquad\sigma_{\phi,j}(x)>0.
\tag{14.14}
$$

**Kết luận.** $Z_\phi$ có phân phối $q_\phi(\cdot\mid x)$ trong Định nghĩa 14.15. Với $h_\theta(z)=\log p_\theta(x\mid z)$, nếu được đổi đạo hàm với kỳ vọng thì

$$
\nabla_{\theta,\phi}\mathbb E_{q_\phi}[h_\theta(Z)]
=\mathbb E_\varepsilon\!\left[\nabla_{\theta,\phi}h_\theta(Z_\phi)\right].
\tag{14.15}
$$

**Điều kiện áp dụng.** Một bộ điều kiện đủ gồm:

- Với hầu mọi $\varepsilon$, hàm $F(\theta,\phi,\varepsilon)=h_\theta(Z_\phi(\varepsilon))$ khả vi liên tục theo tham số trên một lân cận mở của điểm đang xét.
- Chuẩn gradient được chặn đều trên lân cận bởi một hàm $G(\varepsilon)$ có kỳ vọng hữu hạn.
- Hàm $F$ khả tích tại một điểm của lân cận.

Bộ điều kiện đủ này không nhằm bao phủ mọi mạng dùng hàm kích hoạt không trơn.

**Phạm vi.** Trung bình Monte Carlo từ các nhiễu độc lập cho ước lượng gradient không chệch dưới các điều kiện trên. Một số mẫu hữu hạn vẫn có phương sai; công thức không bảo đảm tối ưu toàn cục hoặc áp dụng trực tiếp cho mã rời rạc.
:::

::: proof Chứng minh Mệnh đề 14.16
**Bước 1 (phân phối mẫu).** Tọa độ thứ $j$ là $\mu_{\phi,j}+\sigma_{\phi,j}\varepsilon_j$, có phân phối Gaussian với trung bình $\mu_{\phi,j}$ và phương sai $\sigma_{\phi,j}^2$. Các nhiễu độc lập nên ma trận hiệp phương sai là ma trận chéo. Vì vậy mọi kỳ vọng theo $q_\phi$ bằng kỳ vọng của cùng hàm tại $Z_\phi$ theo nhiễu chuẩn.

**Bước 2 (đạo hàm theo đường mẫu).** Với mỗi tọa độ tham số, xét thương sai phân trên một đoạn đủ nhỏ nằm trong lân cận. Định lý giá trị trung bình và tính khả vi liên tục chặn trị tuyệt đối thương sai phân bởi $G(\varepsilon)$. Thương sai phân hội tụ tới đạo hàm tại hầu mọi nhiễu; định lý hội tụ bị chặn cho phép đổi giới hạn với kỳ vọng, thu được (14.15). Quy tắc dây chuyền cho đạo hàm theo $\phi$ là

$$
\nabla_\phi h_\theta(Z_\phi)
=(\nabla_\phi Z_\phi)^\top\nabla_z h_\theta(Z_\phi),
$$

với quy ước Jacobian $\nabla_\phi Z_\phi$ có số hàng bằng $k$. Khi $h$ còn phụ thuộc $\phi$ trực tiếp thì phải cộng đạo hàm riêng trực tiếp; trong thiết lập này chỉ $Z_\phi$ phụ thuộc $\phi$.

**Bước 3 (trung bình Monte Carlo).** Với $m$ nhiễu độc lập cùng phân phối, ước lượng là $m^{-1}\sum_{r=1}^m\nabla h_\theta(Z_\phi^{(r)})$. Tính tuyến tính của kỳ vọng và (14.15) cho kỳ vọng đúng bằng gradient cần tính. $\square$
:::

Trong học máy, Mệnh đề 14.16 cho đường tính gradient từ bộ giải mã qua mẫu mã tới bộ mã hóa. Số hạng KL Gaussian có thể lấy đạo hàm giải tích bằng (14.11), còn kỳ vọng tái tạo dùng Monte Carlo. Thay đổi $\phi$ điều chỉnh quy tắc suy luận; thay đổi $\theta$ điều chỉnh mô hình sinh. Hai nhóm tham số được tối ưu đồng thời trong (14.13) vì cùng ảnh hưởng kỳ vọng tái tạo.

::: example Ví dụ 14.7 (Mẫu tái tham số hóa và một gradient)
**Dữ kiện.** Xét một tọa độ có $\mu=2$, $\sigma=1/2$, $x=1$ và $p_\theta(x\mid z)=\mathcal N(z,1)$. Dùng ba giá trị nhiễu minh họa $\varepsilon=-1,0,2$.

**Lấy mẫu.** Công thức $z=2+\varepsilon/2$ cho $z=3/2,2,3$. Phương sai mã hóa là $\sigma^2=1/4$, không phải $1/2$.

**Gradient theo đường mẫu.** Bỏ hằng số không phụ thuộc $\mu$, log-mật độ là $h(z)=-(1-z)^2/2$. Vì $\partial z/\partial\mu=1$, ta có $\partial h/\partial\mu=1-z$. Ba giá trị gradient là $-1/2,-1,-2$, trung bình bằng $-7/6$.

**Kiểm tra.** Gradient kỳ vọng chính xác là $1-\mu=-1$. Ba nhiễu minh họa không có trung bình bằng $0$, nên trung bình gradient không bằng giá trị chính xác. Tính không chệch trong Mệnh đề 14.16 là phát biểu về kỳ vọng khi nhiễu được lấy ngẫu nhiên đúng phân phối, không phải đẳng thức với mọi bộ số minh họa.
:::

::: exercise Bài tập 14.5 (Củng cố mục tiêu 5)
Cho $q(z\mid x)=\mathcal N(0,4)$, $p(z)=\mathcal N(0,1)$ và phép tái tham số hóa $z=\mu+\sigma\varepsilon$. Tính KL, xác định $\mu,\sigma$ và tính $z$ tại $\varepsilon=-1$. Giải thích vì sao dùng $\sigma=4$ sẽ sai.
:::

::: hint Gợi ý Bài tập 14.5
Tham số thứ hai trong $\mathcal N(0,4)$ là phương sai. Dùng (14.11).
:::

::: solution Lời giải Bài tập 14.5
Ta có $\mu=0$, $\sigma=2$ và $D_{\mathrm{KL}}=\tfrac12(4-1-\log4)=\tfrac12(3-\log4)\approx0.806853$. Với $\varepsilon=-1$, mẫu là $z=-2$. Nếu dùng $\sigma=4$, phân phối mẫu có phương sai $16$, không phải $4$. Kiểm tra tính không âm: $3>\log4$ nên KL dương.
:::

### Giới hạn của mục tiêu và phân phối được học

::: remark Nhận xét 14.17 (Hai tiêu chuẩn nhỏ chưa đủ kết luận)
Lỗi tái tạo nhỏ trên mẫu chỉ kiểm tra đầu ra khi mã được lấy từ các quan sát đó. Sinh mẫu mới lấy mã từ $p(z)$, nên còn cần kiểm tra bộ giải mã ở vùng mã mà tiên nghiệm thường sinh ra và sự phù hợp của mô hình với dữ liệu mới.

KL tới tiên nghiệm nhỏ có thể xuất hiện khi $q_\phi(z\mid x)$ gần như không phụ thuộc $x$. Nếu bộ giải mã cũng bỏ qua $z$, biến ẩn không mang thông tin hữu ích về từng quan sát. Hiện tượng này thường được gọi là **suy sụp hậu nghiệm** (posterior collapse); tên gọi không có nghĩa hậu nghiệm thật được tính chính xác hoặc mô hình luôn có chất lượng kém trên mọi tiêu chuẩn.

ELBO là một tiêu chuẩn kết hợp: số hạng tái tạo và KL phải được đọc cùng nhau, với cùng loại dữ liệu và cùng mô hình nhiễu. Thay trọng số KL bằng một hệ số khác $1$ tạo một mục tiêu khác; không được tự động gọi mục tiêu mới là cận (14.10) của cùng mô hình.
:::

::: exercise Bài tập 14.6 (Củng cố mục tiêu 6)
Dữ liệu một chiều có xác suất bằng nhau tại $-3$ và $3$. Chọn $p(z)=q_\phi(z\mid x)=\mathcal N(0,1)$ với mọi $x$, và $p_\theta(x\mid z)=\mathcal N(0,1)$ không phụ thuộc $z$. Tính KL tới tiên nghiệm và log-mật độ giải mã tại hai quan sát. Đánh giá kết luận “KL bằng 0 nên mô hình sinh tốt”.
:::

::: hint Gợi ý Bài tập 14.6
Tính $\log\mathcal N(3;0,1)$ và xác định phân phối biên của mô hình.
:::

::: solution Lời giải Bài tập 14.6
KL tới tiên nghiệm bằng $0$ vì hai mật độ trùng nhau. Ở cả hai quan sát, log-mật độ bằng $-\tfrac12\log(2\pi)-9/2\approx-5.418939$, nên ELBO cũng bằng giá trị này. Mô hình sinh có phân phối biên $\mathcal N(0,1)$, tập trung quanh $0$ trong khi dữ liệu nằm tại $\pm3$. KL bằng $0$ không phát hiện sự lệch đó. Kiểm tra: hậu nghiệm thật cũng bằng tiên nghiệm vì bộ giải mã bỏ qua $z$; cận có thể chặt mà mô hình vẫn không phù hợp dữ liệu.
:::

Bổ đề 14.11 cho dấu của KL; Định lý 14.13 xác định khe hở ELBO; Mệnh đề 14.14 và Mệnh đề 14.16 làm hai số hạng của mục tiêu khả tính trong lựa chọn Gaussian. Định nghĩa 14.15 ghép chúng thành cách học đồng thời mô hình sinh và quy tắc suy luận. Giới hạn ở Nhận xét 14.17 yêu cầu đánh giá thêm trên dữ liệu mới và mẫu sinh, thay vì suy chất lượng từ một số hạng đơn lẻ.

## 14.5. Tình huống áp dụng và ứng dụng

::: application Tình huống 14.1 (Nén và sinh quan sát cảm biến)
**Bài toán và dữ kiện.** Bốn quan sát cảm biến đã tâm hóa là $(2,0)^\top$, $(-2,0)^\top$, $(0,1)^\top$, $(0,-1)^\top$. Mục tiêu thứ nhất là lưu một tọa độ cho mỗi điểm; mục tiêu thứ hai là xây dựng một mô hình liên tục để tạo quan sát mô phỏng có cùng hiệp phương sai mẫu.

**Mô hình hóa và kiểm giả thiết.** Với mục tiêu nén, dùng không gian con một chiều và lỗi Euclid bình phương. Ma trận $S=\operatorname{diag}(2,1/2)$ đối xứng nửa xác định dương và dữ liệu có trung bình $0$, đáp ứng Định lý 14.2 và Mệnh đề 14.3. Với mục tiêu sinh, chọn $Z\sim\mathcal N(0,1)$, $X\mid Z=z\sim\mathcal N((\sqrt{3/2}z,0)^\top,(1/2)I_2)$ như Định nghĩa 14.8.

**Giải và diễn giải.** PCA chọn $u=(1,0)^\top$, mã $(2,-2,0,0)$, lỗi trung bình $1/2$. Bộ mã hóa $f(x)=x_1$ và giải mã $g(z)=(z,0)^\top$ đạt đúng lỗi đó. Mô hình sinh Gaussian riêng có hiệp phương sai $\operatorname{diag}(2,1/2)$ vì biến ẩn góp $3/2$ vào phương sai ngang, nhiễu góp $1/2$ cho mỗi chiều. Để sinh một quan sát, lấy ba nhiễu chuẩn độc lập $z,e_1,e_2$ rồi trả về $(\sqrt{3/2}z+e_1/\sqrt2,e_2/\sqrt2)^\top$.

**Kiểm tra và giới hạn.** Tổng phương sai sinh là $5/2$, khớp vết của $S$. Tuy nhiên, hai mục tiêu không cho cùng đối tượng: một mục tiêu chọn phép chiếu của bốn điểm, mục tiêu kia giả định một phân phối Gaussian liên tục. Việc khớp hiệp phương sai không chứng minh phân phối Gaussian là cơ chế thực tạo dữ liệu hoặc mô hình đã học được nhiều cụm của dữ liệu.
:::

::: application Tình huống 14.2 (Dữ liệu nhiều cụm và giả thiết bị vi phạm)
**Bài toán và dữ kiện.** Một cảm biến có đầu ra hai chiều tại $(-3,0)^\top$ hoặc $(3,0)^\top$ với xác suất bằng nhau. Mô hình thử nghiệm dùng $p(z)=\mathcal N(0,1)$, $q_\phi(z\mid x)=\mathcal N(0,1)$ và bộ giải mã $p_\theta(x\mid z)=\mathcal N((0,0)^\top,I_2)$, không phụ thuộc $z$.

**Kiểm giả thiết.** Mô hình và bộ mã hóa đều có mật độ dương, nên Định lý 14.13 áp dụng tại mỗi quan sát. Giả thiết thực hành “một Gaussian đơn có thể mô tả hai cụm tách biệt” không được dữ liệu hỗ trợ. Phân phối dữ liệu rời rạc cũng không bằng mật độ Gaussian liên tục; ta chỉ đang đánh giá log-mật độ mô hình tại các điểm đã quan sát.

**Tính.** KL tới tiên nghiệm bằng $0$. Với $x=(3,0)^\top$ hoặc $(-3,0)^\top$, log-mật độ giải mã là $-\log(2\pi)-9/2\approx-6.337877$. Vì bộ giải mã bỏ qua $z$, hậu nghiệm thật bằng tiên nghiệm và ELBO bằng đúng log-mật độ biên này.

**Hậu quả và kiểm tra.** Một mẫu sinh thường ở gần gốc hơn hai cụm quan sát. Cận chặt và KL bằng $0$ vẫn đi cùng một mô hình không thể hiện cấu trúc hai cụm. Kiểm tra bằng moment: dữ liệu có $\mathbb E[X_1^2]=9$, còn mô hình có $\mathbb E[X_1^2]=1$. Cần đổi họ mô hình hoặc cách dùng biến ẩn và đánh giá trên quan sát mới; chỉ làm giảm KL không sửa được giả thiết sai.
:::

Các công cụ của chương còn xuất hiện trong những nhiệm vụ sau:

- **Tiền xử lý và nén đặc trưng.** Mệnh đề 14.3 định lượng phương sai bị bỏ khi giữ $k$ hướng; chuẩn hóa đặc trưng và chọn $k$ cần dựa vào nhiệm vụ, như phản ví dụ trong Nhận xét 14.4.
- **Biểu diễn phi tuyến.** Định nghĩa 14.5 cho phép học mạng mã hóa từ dữ liệu không nhãn; tiêu chuẩn của Bài 12 vẫn cần thiết để đánh giá trên dữ liệu chưa dùng khi tối ưu.
- **Sinh dữ liệu và suy luận.** Định nghĩa 14.8 cung cấp cơ chế sinh, còn Định lý 14.13 cho mục tiêu suy luận gần đúng khi hậu nghiệm khó tính. Murphy II, §21.2 phát triển VAE từ cặp nhiệm vụ này.

## 14.6. Tóm tắt chương

Chúng ta xuất phát từ nhu cầu biểu diễn một quan sát hai chiều bằng một tọa độ và tái tạo nó với lỗi nhỏ. Định lý 14.2 chọn hướng riêng có phương sai lớn nhất; Mệnh đề 14.3 chứng minh lựa chọn ấy cũng tối thiểu hóa lỗi chiếu trực giao. Bộ tự mã hóa học hai ánh xạ linh hoạt hơn, nhưng Mệnh đề 14.6 cho thấy ngay trong trường hợp tuyến tính, tọa độ mã không được xác định duy nhất. Để sinh dữ liệu, Định nghĩa 14.8 bổ sung tiên nghiệm và phân phối quan sát, kéo theo bài toán lấy biên và suy luận hậu nghiệm. Định lý 14.13 thay log-hợp lý khó tính bằng ELBO và chỉ rõ khe hở là KL tới hậu nghiệm. KL Gaussian và tái tham số hóa làm mục tiêu này có thể tối ưu bằng gradient trong VAE. Các kết quả đó vẫn cần lựa chọn phân phối phù hợp và kiểm tra chất lượng dữ liệu sinh; lỗi tái tạo hoặc KL riêng lẻ chưa giải quyết các yêu cầu ấy.

| Mạch | Kết quả và giả thiết cần nhớ |
|---|---|
| PCA | Định nghĩa 14.1; Định lý 14.2; Mệnh đề 14.3. Tâm hóa, chuẩn hóa hướng, phép chiếu trực giao và mất mát bình phương. |
| Bộ tự mã hóa | Định nghĩa 14.5; Mệnh đề 14.6; Nhận xét 14.7. Cùng tái tạo có thể có nhiều tọa độ; AE tất định chưa chọn phân phối mã. |
| Mô hình biến ẩn | Định nghĩa 14.8–14.9. Phân biệt tiên nghiệm, điều kiện, biên và hậu nghiệm; sinh mẫu khác tính tích phân biên. |
| Suy luận biến phân | Định nghĩa 14.10; Bổ đề 14.11; Định nghĩa 14.12; Định lý 14.13. Kiểm tra hỗ trợ, chuẩn hóa và tính hữu hạn. |
| VAE | Mệnh đề 14.14; Định nghĩa 14.15; Mệnh đề 14.16; Nhận xét 14.17. Phương sai dương, gradient qua nhiễu và giới hạn của mục tiêu. |

Ba công thức liên kết toàn chương là lỗi chiếu (14.3), cơ chế lấy biên (14.5) và phân rã ELBO (14.10). Trong (14.10), KL đo khe hở dùng hậu nghiệm; trong mục tiêu (14.9), KL có thể tính giải tích dùng tiên nghiệm. Hai vị trí này không thay thế cho nhau.

Bài 14 khép mạch năm bài từ bất định, ước lượng và rủi ro đến quyết định rồi sinh dữ liệu. Các Bài 05–06 cung cấp ngôn ngữ biểu diễn và tối ưu; Bài 10 cung cấp lấy biên và Bayes; Bài 11–12 giải thích nguồn gốc mục tiêu học và giới hạn của việc khớp mẫu. Phần đọc thêm dưới đây tiếp tục với PCA xác suất và các họ suy luận phong phú hơn trong Murphy.

## 14.7. Bài tập trên lớp — 30 phút

Ba bài sau điều chỉnh từ bài trên lớp của `lecture_notes.pdf`, Tuần 5, trang 24. Lời giải được đặt trong khối gập để hỗ trợ tự kiểm tra.

::: exercise Bài trên lớp 14.A (10 phút — tính toán)
Cho bốn điểm $(2,0)^\top$, $(-2,0)^\top$, $(0,1)^\top$, $(0,-1)^\top$. Tính trung bình, hiệp phương sai mẫu số $4$, một hướng PCA thứ nhất, tái tạo của $(0,1)^\top$ và lỗi bình phương của riêng điểm đó.
:::

::: hint Gợi ý 14.A
Tính hai phần tử đường chéo bằng trung bình bình phương từng tọa độ.
:::

::: solution Lời giải 14.A
Trung bình bằng $0$, hiệp phương sai là $\operatorname{diag}(2,1/2)$. Một hướng tối ưu là $(1,0)^\top$. Mã của $(0,1)^\top$ bằng $0$, tái tạo là $(0,0)^\top$ và lỗi bình phương bằng $1$. Kiểm tra: hướng chọn ứng với trị riêng $2>1/2$; lỗi của riêng điểm không phải lỗi trung bình $1/2$ trên cả bốn điểm.
:::

::: exercise Bài trên lớp 14.B (10 phút — mô hình hóa)
Một AE tất định dùng $f(x_1,x_2)=x_1$ và $g(z)=(z,0)^\top$. Xây dựng một mô hình sinh Gaussian hai chiều dùng cùng hàm $g$, với tiên nghiệm chuẩn và phương sai nhiễu $1/2$. Viết riêng phân phối mã hóa Gaussian chéo nếu dùng VAE. Nêu đường lấy mẫu mới và đường suy luận từ quan sát.
:::

::: hint Gợi ý 14.B
Tiên nghiệm và likelihood xác định mô hình sinh. Phân phối mã hóa là công cụ bổ sung cho suy luận.
:::

::: solution Lời giải 14.B
Chọn $p(z)=\mathcal N(0,1)$ và $p_\theta(x\mid z)=\mathcal N((z,0)^\top,(1/2)I_2)$. Một bộ mã hóa VAE là $q_\phi(z\mid x)=\mathcal N(\mu_\phi(x),\sigma_\phi^2(x))$, với $\sigma_\phi(x)>0$; hai hàm này cần được học, không suy ra duy nhất từ $f$. Để sinh, lấy $z$ từ tiên nghiệm rồi thêm nhiễu quan sát vào $(z,0)^\top$. Để suy luận, đưa quan sát $x$ qua bộ mã hóa để xác định phân phối của $z$. Kiểm tra: mô hình biên có hiệp phương sai $\operatorname{diag}(3/2,1/2)$, khác phân phối chỉ nằm trên trục ngang của bộ giải mã tất định.
:::

::: exercise Bài trên lớp 14.C (10 phút — suy luận giới hạn)
Tính $D_{\mathrm{KL}}(\mathcal N(0,4)\Vert\mathcal N(0,1))$. Phân kỳ có bằng $0$ không? Nếu giảm nó về $0$ mà không biết số hạng tái tạo, có thể kết luận mẫu sinh tốt hơn không?
:::

::: hint Gợi ý 14.C
Dùng (14.11) với phương sai $4$, rồi đối chiếu hai vai trò KL trong Định lý 14.13.
:::

::: solution Lời giải 14.C
KL bằng $(3-\log4)/2\approx0.806853>0$. Để bằng $0$ trong họ này cần trung bình $0$ và phương sai $1$. Giảm KL chỉ cho biết bộ mã hóa gần tiên nghiệm hơn; chưa biết nó giữ thông tin của quan sát hay bộ giải mã mô tả dữ liệu ra sao. Tình huống 14.2 là một phản ví dụ cụ thể: KL bằng $0$ nhưng mô hình không thể hiện hai cụm dữ liệu.
:::

## 14.8. Bài tập tự học — 180 phút

Bốn bài dưới đây điều chỉnh từ `homework.pdf`, W5.1–W5.4, trang in 2–3, giữ số liệu chính và bổ sung yêu cầu suy diễn, liên hệ AI, phản biện. Thời lượng lần lượt là 45, 35, 65 và 35 phút, tổng cộng 180 phút. Mức 1 là nhận biết và tính toán trực tiếp, mức 2 là suy diễn hoặc chứng minh, mức 3 là phân tích mô hình và giới hạn.

::: exercise E14.1 (45 phút — mức 1–2: PCA và hình học)
Cho bốn quan sát $(2,0)^\top$, $(-2,0)^\top$, $(0,1)^\top$, $(0,-1)^\top$.

1. Tính $\bar x$, $S=n^{-1}\sum_i(x_i-\bar x)(x_i-\bar x)^\top$, các trị riêng và một vector riêng đơn vị ứng với trị riêng lớn nhất.
2. Tính mã và tái tạo một chiều của từng điểm, đặc biệt $(0,1)^\top$. Tính tổng lỗi và trung bình lỗi bình phương.
3. Với $u=(\cos\alpha,\sin\alpha)^\top$, suy ra biểu thức lỗi trung bình và xác định mọi $\alpha$ tối ưu. Giải thích vì sao đổi dấu vector riêng không đổi tái tạo.
4. Nếu chỉ nhân tọa độ thứ hai của mọi điểm với $3$, hướng PCA thay đổi thế nào? Diễn giải ảnh hưởng của đơn vị đo.
:::

::: hint Gợi ý E14.1
Tổng bình phương hai tọa độ là $8$ và $2$. Dùng $\widehat x=uu^\top x$ và lỗi $\operatorname{tr}(S)-u^\top Su$. Khi đổi đơn vị, phải tính lại cả ma trận hiệp phương sai.
:::

::: exercise E14.2 (35 phút — mức 1–3: AE và giới hạn sinh dữ liệu)
Cho $f_\phi(x_1,x_2)=x_1$, $g_\theta(z)=(z,0)^\top$.

1. Tính mã, tái tạo và lỗi bình phương tại $x=(2,0)^\top$ và $x=(0,1)^\top$.
2. Với $c\ne0$, thay bằng $f_c(x)=cx_1$ và $g_c(z)=(z/c,0)^\top$. Chứng minh tái tạo giữ nguyên. Mã này có bắt buộc là tọa độ PCA chuẩn hóa không?
3. Xây dựng hai phân phối khác nhau cho $Z$ đi qua cùng $g_\theta$ và so sánh $\mathbb E[X_1^2]$. Giải thích vì sao hai hàm AE chưa chỉ định duy nhất một phân phối sinh.
4. Với $Z\sim\mathcal N(0,1)$ và $X=g_\theta(Z)$, giải thích vì sao không có mật độ hai chiều theo diện tích. Nêu một thay đổi tạo được mật độ Gaussian đầy chiều.
:::

::: hint Gợi ý E14.2
Có thể so sánh tiên nghiệm chuẩn với phân phối hai điểm tại $\pm2$. Phân phối tập trung trên một đường thẳng gán xác suất $1$ cho một tập có diện tích bằng $0$.
:::

::: exercise E14.3 (65 phút — mức 1–3: Gaussian KL, tái tạo và ELBO)
Cho $p(z)=\mathcal N(0,1)$, $q(z\mid x)=\mathcal N(1,1/4)$, $p_\theta(x\mid z)=\mathcal N(z,1)$ và quan sát $x=1$.

1. Tính KL tới tiên nghiệm bằng công thức (14.11), giữ logarit ở dạng chính xác.
2. Tính $\mathbb E_q[(1-Z)^2]$ và $\mathbb E_q[\log p_\theta(1\mid Z)]$. Vì sao thay $Z$ bằng trung bình của nó làm mất một số hạng?
3. Kết hợp thành ELBO; giữ $\log(2\pi)$ ở dạng ký hiệu trước khi tính gần đúng.
4. Tính biên $p_\theta(x)$ và hậu nghiệm $p_\theta(z\mid1)$ bằng hoàn bình phương. Tính KL tới hậu nghiệm để kiểm tra phân rã (14.10).
5. Với cùng mô hình, nếu đổi $q$ thành hậu nghiệm chính xác, ELBO và KL tới tiên nghiệm thay đổi ra sao? Dùng kết quả để phân biệt cận chặt với KL tới tiên nghiệm nhỏ.
:::

::: hint Gợi ý E14.3
Dùng $\mathbb E[(a-Z)^2]=(a-\mathbb EZ)^2+\operatorname{Var}(Z)$. Để so sánh $\mathcal N(a,b)$ với $\mathcal N(c,d)$, lấy hiệu log-mật độ và dùng $\mathbb E[(Z-c)^2]=b+(a-c)^2$; $b,d$ là phương sai.
:::

::: exercise E14.4 (35 phút — mức 1–2: tái tham số hóa và gradient)
Cho tiên nghiệm $p(z)=\mathcal N(0,1)$, đầu ra mã hóa $\mu=2$, $\sigma=1/2$ và $Z=\mu+\sigma\varepsilon$, $\varepsilon\sim\mathcal N(0,1)$.

1. Tính $z$ với các giá trị minh họa $\varepsilon=-1,0,2$. Xác định phương sai của $Z$.
2. Với $x=1$, $h(z)=\log\mathcal N(1;z,1)$, tính đạo hàm theo $\mu$ và $\sigma$ của $h(\mu+\sigma\varepsilon)$ tại mỗi nhiễu. Tính trung bình ba gradient.
3. Tính gradient chính xác của $\mathbb E[h(Z)]$ theo $\mu,\sigma$. So sánh với câu 2 và giải thích ý nghĩa không chệch.
4. Nêu điều kiện đủ để đưa đạo hàm vào kỳ vọng. Phân biệt gradient của kỳ vọng tái tạo với gradient của toàn ELBO.
:::

::: hint Gợi ý E14.4
Dùng $\partial z/\partial\mu=1$, $\partial z/\partial\sigma=\varepsilon$ và $h'(z)=1-z$. Kỳ vọng chính xác là $-\tfrac12\log(2\pi)-\tfrac12[(1-\mu)^2+\sigma^2]$.
:::

## 14.9. Phụ lục lời giải bài tự học

::: solution Lời giải E14.1
**Câu 1 (hiệp phương sai).** Tổng bốn điểm bằng $0$, nên $\bar x=0$. Hai phần tử ngoài đường chéo bằng $0$, còn hai phần tử đường chéo là $8/4=2$ và $2/4=1/2$. Do đó $S=\operatorname{diag}(2,1/2)$, trị riêng là $2,1/2$, và chọn $u=(1,0)^\top$.

**Câu 2 (tái tạo).** Các mã là $2,-2,0,0$, các tái tạo là $(2,0)^\top$, $(-2,0)^\top$, $0$, $0$. Lỗi là $0,0,1,1$, tổng $2$, trung bình $1/2$.

**Câu 3 (chứng minh tối ưu).** Phương sai giữ là $2\cos^2\alpha+\tfrac12\sin^2\alpha$. Trừ khỏi vết $5/2$ cho lỗi

$$
\widehat J(\alpha)=\frac12+\frac32\sin^2\alpha.
$$

Cực tiểu xảy ra khi $\alpha$ là bội nguyên của $\pi$. Đổi $u$ thành $-u$ đổi dấu mã nhưng $(-u)(-u)^\top=uu^\top$, nên tái tạo giữ nguyên.

**Câu 4 (đổi đơn vị).** Tọa độ thứ hai thành $\pm3$, nên hiệp phương sai mới là $\operatorname{diag}(2,9/2)$. Hướng giữ phương sai lớn nhất đổi sang trục đứng, với lỗi trung bình $2$. Điều đó là hệ quả của việc thay thang đo trong mất mát Euclid, không phải phát hiện một quan hệ xác suất mới.

**Kiểm tra.** Trước đổi đơn vị, phương sai giữ $2$ cộng lỗi $1/2$ bằng $5/2$. Sau đổi, $9/2+2=13/2$ bằng vết mới.
:::

::: solution Lời giải E14.2
**Câu 1 (tính tái tạo).** Tại $(2,0)^\top$, mã $2$, tái tạo $(2,0)^\top$, lỗi $0$. Tại $(0,1)^\top$, mã $0$, tái tạo gốc, lỗi $1$.

**Câu 2 (đổi tọa độ).** Với mọi $x$, $g_c(f_c(x))=(cx_1/c,0)^\top=(x_1,0)^\top$. Nếu $|c|\ne1$, hướng mã hóa không có chuẩn $1$, nên mã không phải tọa độ PCA chuẩn hóa mặc dù tái tạo bằng PCA trục ngang.

**Câu 3 (hai phân phối).** Chọn $Z_1\sim\mathcal N(0,1)$ và $Z_2$ nhận $-2,2$ với xác suất $1/2$. Với $X_j=g_\theta(Z_j)$, ta có $\mathbb E[X_{1,1}^2]=1$ và $\mathbb E[X_{2,1}^2]=4$. Cùng bộ giải mã cho hai phân phối khác nhau khi đổi tiên nghiệm, nên chỉ hai hàm không chọn được phân phối sinh.

**Câu 4 (mật độ).** Cả hai cơ chế không nhiễu đặt xác suất $1$ trên trục ngang, một tập có diện tích bằng $0$. Nếu có mật độ hai chiều theo diện tích, tích phân trên tập đó phải bằng $0$, mâu thuẫn. Thêm $\eta\sim\mathcal N(0,\tau^2I_2)$ độc lập, $\tau>0$, và lấy $X=g_\theta(Z_1)+\eta$ cho Gaussian đầy chiều có hiệp phương sai $\operatorname{diag}(1+\tau^2,\tau^2)$.

**Kiểm tra.** Định thức hiệp phương sai mới là $(1+\tau^2)\tau^2>0$, đúng điều kiện mật độ Gaussian không suy biến.
:::

::: solution Lời giải E14.3
**Câu 1 (KL tiên nghiệm).** Công thức (14.11) cho

$$
D_{\mathrm{KL}}(q\Vert p)=\frac12(1+1/4-1-\log(1/4))
=\frac18+\log2\approx0.818147.
$$

**Câu 2 (tái tạo).** Trung bình của $Z$ là $1$, phương sai $1/4$, nên $\mathbb E_q[(1-Z)^2]=1/4$. Vì phương sai giải mã bằng $1$,

$$
\mathbb E_q[\log p_\theta(1\mid Z)]=-\frac12\log(2\pi)-\frac18.
$$

Thay $Z$ bằng trung bình làm mất $\operatorname{Var}(Z)=1/4$ trong lỗi bình phương; nói chung không thể đưa hàm phi tuyến ra khỏi kỳ vọng.

**Câu 3 (ELBO).** Trừ KL cho

$$
\mathcal L=-\frac12\log(2\pi)-\frac14-\log2\approx-1.862086.
$$

**Câu 4 (kiểm tra bằng hậu nghiệm).** Viết $X=Z+\eta$ với $Z,\eta$ chuẩn độc lập, suy ra $X\sim\mathcal N(0,2)$. Do đó

$$
\log p_\theta(1)=-\frac12\log(4\pi)-\frac14\approx-1.515512.
$$

Hoàn bình phương trong $-z^2/2-(1-z)^2/2=-(z-1/2)^2-1/4$ cho $r(z)=p_\theta(z\mid1)=\mathcal N(1/2,1/2)$. Lấy hiệu log-mật độ hai Gaussian rồi lấy kỳ vọng theo $q$ cho

$$
\begin{aligned}
D_{\mathrm{KL}}(q\Vert r)
&=\frac12\left[\log\frac{1/2}{1/4}
+\frac{1/4+(1-1/2)^2}{1/2}-1\right]\\
&=\frac12\log2.
\end{aligned}
$$

Cộng KL này vào ELBO thu được đúng log-hợp lý trên, kiểm tra (14.10).

**Câu 5 (hậu nghiệm chính xác).** Nếu $q=r$, KL tới hậu nghiệm bằng $0$ và ELBO tăng lên $-\tfrac12\log(4\pi)-\tfrac14$. KL tới tiên nghiệm khi đó là

$$
\frac12\left(\frac14+\frac12-1-\log\frac12\right)
=\frac12\log2-\frac18\approx0.221574,
$$

vẫn dương. Kỳ vọng lỗi tái tạo là $(1-1/2)^2+1/2=3/4$, nên số hạng tái tạo mới là $-\tfrac12\log(2\pi)-3/8$. Trừ KL mới cho đúng log-hợp lý. Cận chặt yêu cầu khớp hậu nghiệm, không yêu cầu KL tiên nghiệm bằng $0$.
:::

::: solution Lời giải E14.4
**Câu 1 (mẫu).** Ba mẫu là $3/2,2,3$. Phương sai là $\sigma^2=1/4$.

**Câu 2 (gradient từng mẫu).** Quy tắc dây chuyền cho $\partial h/\partial\mu=1-z$ và $\partial h/\partial\sigma=(1-z)\varepsilon$. Bảng giá trị là

| $\varepsilon$ | $z$ | $\partial h/\partial\mu$ | $\partial h/\partial\sigma$ |
|---|---:|---:|---:|
| $-1$ | $3/2$ | $-1/2$ | $1/2$ |
| $0$ | $2$ | $-1$ | $0$ |
| $2$ | $3$ | $-2$ | $-4$ |

Trung bình hai cột gradient là $-7/6$ và $-7/6$.

**Câu 3 (gradient chính xác).** Từ kỳ vọng trong gợi ý, đạo hàm theo $\mu$ là $1-\mu=-1$, theo $\sigma$ là $-\sigma=-1/2$. Ba nhiễu minh họa không cho đúng hai moment chuẩn, nên trung bình hữu hạn lệch khỏi kỳ vọng. Nếu lấy nhiễu ngẫu nhiên đúng phân phối, kỳ vọng của ước lượng gradient bằng gradient chính xác dưới các điều kiện đổi đạo hàm.

**Câu 4 (điều kiện và toàn mục tiêu).** Một điều kiện đủ là, với hầu mọi nhiễu, hàm sau tái tham số hóa khả vi liên tục trên một lân cận mở của tham số; chuẩn gradient có hàm chặn khả tích đồng đều trên lân cận; hàm gốc khả tích tại một điểm, như Mệnh đề 14.16. Trong ví dụ Gaussian toàn phương, các đạo hàm là đa thức bậc không quá hai theo nhiễu chuẩn nên khả tích. Gradient toàn ELBO còn phải trừ đạo hàm KL tới tiên nghiệm. Với $\mu=2$, $\sigma=1/2$, đạo hàm KL theo $\mu$ là $\mu=2$ và theo $\sigma$ là $\sigma-1/\sigma=-3/2$, nên gradient ELBO lần lượt là $-3$ và $1$.

**Kiểm tra.** Tái tham số hóa dùng độ lệch chuẩn $1/2$, còn KL dùng cả $\sigma^2$ và $\log\sigma^2$. Đạo hàm KL theo $\sigma$ phải lấy quy tắc dây chuyền, không lấy đạo hàm như thể $\sigma^2$ là $\sigma$.
:::

## 14.10. Hướng dẫn đọc và tài liệu tham khảo

1. **Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press.** [Trang sách do tác giả cung cấp](https://probml.github.io/pml-book/book1.html). Đọc §§20.1–20.1.2 cho PCA và tiêu chuẩn phương sai–tái tạo; §§20.3–20.3.1 cho bộ tự mã hóa và mối liên hệ tuyến tính; §6.2.3 cho KL Gaussian và §6.2.4 cho tính không âm. [Mục lục trên trang tác giả](https://probml.github.io/pml-book/toc1.pdf) xác nhận tên và số mục; bản mục lục nháp năm 2021 không được dùng để gán số trang cho ấn bản năm 2022. Các mục 14.1–14.2 và Bổ đề 14.11 dựa trên những chủ đề này; chứng minh, ví dụ và diễn giải trong chương được viết lại.
2. **Kevin P. Murphy (2023), *Probabilistic Machine Learning: Advanced Topics*, MIT Press.** [Trang sách do tác giả cung cấp](https://probml.github.io/pml-book/book2.html). Đọc §10.1.1 cho mục tiêu suy luận biến phân, §10.1.5 cho suy luận dùng chung tham số, §10.2.1 cho tái tham số hóa; §§21.1–21.2 cho mô hình biến ẩn và VAE, đặc biệt §21.2.1 về mô hình hóa, §21.2.2 về khớp mô hình và §21.2.3 về so sánh với AE. [Mục lục nhà xuất bản](https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/14319/TOC_MurphyPMLv2.pdf) xác nhận các mục này lần lượt ở trang 433, 438, 440 và 781–783. Các mục 14.3–14.4 dùng khung mô hình–suy luận–tối ưu này. Đọc thêm PCA xác suất và các mở rộng của VAE trong các mục liên quan của hai tập; chúng không thay thế các giả thiết cụ thể đã dùng trong chứng minh.
3. **Diederik P. Kingma và Max Welling, *Auto-Encoding Variational Bayes*.** [Bản tác giả trên arXiv](https://arxiv.org/abs/1312.6114), mã 1312.6114, bản v11 ngày 2022-12-10 đã được dùng bổ trợ. §§2.2–2.4, trang 3–5, trình bày cận và tái tham số hóa; §3, trang 5, cho dạng Gaussian của mô hình. Nguồn này bổ trợ các phép suy diễn trong mục 14.4, không thay Murphy làm giáo trình chính.
4. **Tài liệu khởi đầu của học phần, `sources/part2/lecture_notes.pdf`, Tuần 5, §§9.1–9.4, trang in 22–24.** Giữ bộ bốn điểm hai chiều, AE trục ngang, KL $\mathcal N(1,1/4)$ so với chuẩn và ba nhiệm vụ trên lớp. Không có thông tin tác giả trong dữ kiện được dùng ở đây; không gán tài liệu này cho Murphy.
5. **Tài liệu bài tập của học phần, `sources/part2/homework.pdf`, W5.1–W5.4, trang in 2–3.** Là cơ sở dữ kiện của E14.1–E14.4; bổ sung phần chứng minh, kiểm tra giả thiết, kết nối AI và phụ lục lời giải. Không gán các mã W5 hoặc E14 thành số bài tập của textbook.

Khi đọc, chúng ta có thể kiểm tra từng kết quả theo ba câu: tối ưu đại lượng nào, trên lớp đối tượng nào, dưới giả thiết nào. Với PCA đó là lỗi chiếu tuyến tính; với AE đó là lỗi của hợp hai ánh xạ; với VAE đó là cận log-hợp lý của một mô hình xác suất cùng một họ suy luận xấp xỉ.
