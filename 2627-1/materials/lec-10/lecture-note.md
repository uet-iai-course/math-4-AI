# Bài 10 — Xác suất: ngôn ngữ biểu diễn bất định trong AI

## Mục tiêu học tập

Với một bộ phân loại đã cố định, đầu vào kế tiếp và nhãn thật của nó vẫn chưa được biết. Chúng ta dùng xác suất để mô tả các khả năng này, kết hợp thông tin về nguồn sản phẩm với quan sát từ cảm biến và cập nhật xác suất sản phẩm lỗi. Các tham số xác suất trong bài được cho trước; việc học chúng từ dữ liệu thuộc Bài 11 trong kế hoạch học phần.

Sau bài này, người học có thể:

1. Thiết lập không gian mẫu, biến cố và mô hình xác suất hữu hạn; kiểm tra chuẩn hóa và suy ra các quy tắc phần bù, hợp.
2. Suy ra quy tắc nhân, xác suất toàn phần và định lý Bayes; phân biệt độc lập, xung khắc và độc lập có điều kiện.
3. Mô tả biến ngẫu nhiên bằng hàm khối xác suất, hàm phân phối tích lũy hoặc mật độ; chọn mô hình Bernoulli, phân loại hay Gaussian phù hợp với kiểu dữ liệu.
4. Tính kỳ vọng, phương sai và hiệp phương sai; chứng minh các công thức mômen và dùng phản ví dụ để phân biệt không tương quan với độc lập.
5. Tính phân phối biên, phân phối có điều kiện và kỳ vọng toàn phần; suy luận về tình trạng sản phẩm khi nhà cung cấp hoặc kết quả kiểm định chưa được quan sát.
6. Nêu các giả thiết mà phép suy luận phụ thuộc vào, phân biệt xác suất hậu nghiệm với quyết định và phân biệt mô hình cho trước với tham số được ước lượng.

Các mục tiêu này cụ thể hóa khả năng xây dựng và phân tích mô hình học máy của CLO2 trong đề cương học phần; chúng là mục tiêu biên soạn của bài, không phải các mã LLO mới của đề cương. Bài tập 10.1–10.9 kiểm tra lần lượt các phép tính, chứng minh và giới hạn mô hình được nêu trong sáu mục tiêu.

## Kiến thức tiên quyết và liên hệ với các bài trước

- **Tập hợp và logic.** Phép hợp, giao, phần bù, tập con và phép đếm. Mệnh đề “và”, “hoặc”, “không” lần lượt tương ứng với giao, hợp và phần bù.
- **Tổng, tích phân và đại số tuyến tính.** Tổng hữu hạn đủ cho phần rời rạc. Với biến liên tục, cần biết tích phân tính diện tích dưới đồ thị; với Gaussian nhiều chiều, cần biết vector, ma trận đối xứng xác định dương và định thức. Phần hình học của Gaussian được dành cho Bài 11.
- **Xác suất trong Bài 05c.** Định nghĩa 05c.8 đã dùng $\mathbb P(E\mid F)=\mathbb P(E\cap F)/\mathbb P(F)$ khi $\mathbb P(F)>0$; Định lý 05c.11 cho công thức Bayes. Chúng ta phát biểu lại và chứng minh các quy tắc cần dùng để tài liệu tự chứa. Trọng tâm chuyển từ việc kiểm soát dao động của trung bình mẫu sang cập nhật phân phối khi quan sát dữ liệu; các chứng minh concentration không được lặp lại.
- **Tối ưu hóa và mô hình học máy.** Ở các Bài 03–06, hàm mục tiêu và tham số của mô hình là đối tượng tối ưu. Trong Bài 10, ta giữ bộ phân loại và các xác suất cố định để xác định đại lượng cần suy luận. Bài 11–12 trong kế hoạch sẽ giải thích cách dữ liệu và giả thiết xác suất dẫn tới mục tiêu tối ưu tham số.

## Cách đọc và phân bổ thời gian

Năm mục nội dung tương ứng 120 phút lý thuyết: Mục 1 khoảng 15 phút; Mục 2 khoảng 30 phút; Mục 3 khoảng 25 phút; Mục 4 và Mục 5 mỗi mục khoảng 25 phút. Ba bài tập trên lớp chiếm 30 phút riêng. Bốn bài tự học dự kiến 180 phút; khoảng hai giờ còn lại dành cho đọc Murphy và kiểm tra lại các ví dụ.

Phần **cốt lõi** gồm các quy tắc xác suất, phân phối rời rạc và liên tục cơ bản, mômen và suy luận bằng lấy biên. Phần **mở rộng** được ghi rõ tại chỗ, dành cho chứng minh công thức ở dạng liên tục và Gaussian nhiều chiều. Nội dung **đọc thêm** dẫn tới Murphy; các kết quả về ước lượng, học máy và hình học Gaussian chưa được coi là đã chứng minh trong bài này.

## Bảng ký hiệu

Ký hiệu được định nghĩa tại lần xuất hiện đầu và tra lại trong bảng dưới đây. Các chữ đứng $\mathrm P$, $\mathrm N$, $\mathrm A$, $\mathrm Q$ ở Mục 1 là nhãn tình huống của camera; biến ngẫu nhiên $A$ ở các mục sau là chỉ báo cảnh báo của cảm biến kiểm định sản phẩm.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $\Omega$, $\omega$ | không gian mẫu; kết quả sơ cấp | tập khác rỗng; $\omega\in\Omega$ |
| $\mathcal F$ | họ biến cố đo được | sigma-đại số trên $\Omega$ |
| $\mathbb P$ | độ đo xác suất | $\mathcal F\to[0,1]$ |
| $E,F,H,C$ | biến cố; có người; camera cảnh báo | phần tử của $\mathcal F$ |
| $E^c$, $E\cup F$, $E\cap F$ | phần bù, hợp, giao | biến cố |
| $|E|$ | số phần tử của tập hữu hạn | số nguyên không âm |
| $\mathbb P(E\mid F)$ | xác suất có điều kiện | $\mathbb P(F)>0$ |
| $X,Z$; $x,z$ | biến ngẫu nhiên; giá trị của biến | vô hướng hoặc vector, tùy ngữ cảnh |
| $S$; $s$ | nhà cung cấp sản phẩm; giá trị nhà cung cấp | $\{a,b\}$ |
| $Y$; $y$ | chỉ báo sản phẩm lỗi; giá trị chỉ báo | $\{0,1\}$ |
| $A$; $a'$ | chỉ báo cảm biến cảnh báo; giá trị chỉ báo | $\{0,1\}$ |
| $p_X(x)$, $p_{X,Z}(x,z)$ | hàm khối xác suất; hàm khối đồng thời | không âm, tổng bằng $1$ |
| $f_X(x)$, $f_{X,Z}(x,z)$ | mật độ; mật độ đồng thời | không âm, tích phân bằng $1$ |
| $F_X(t)$ | hàm phân phối tích lũy | $\mathbb P(X\le t)$ |
| $X\perp Z$, $X\perp Z\mid Y$ | độc lập; độc lập có điều kiện | phân tích nhân tử tương ứng |
| $\mathbb E[X]$, $\mathbb E[g(X)]$ | kỳ vọng của biến hoặc hàm của biến | hữu hạn khi khả tích tuyệt đối |
| $\operatorname{Var}(X)$ | phương sai | hữu hạn khi $\mathbb E[X^2]<\infty$ |
| $\operatorname{Cov}(X,Z)$ | hiệp phương sai | dùng khi có mômen bậc hai hữu hạn |
| $\mathbb E[X\mid Y]$ | kỳ vọng có điều kiện như một biến ngẫu nhiên | hàm của $Y$ |
| $\mu$, $\sigma^2$, $\Sigma$ | trung bình, phương sai, ma trận hiệp phương sai | vô hướng; vô hướng không âm; ma trận |
| $\mathbf1_E$ | biến chỉ báo của biến cố $E$ | bằng $1$ trên $E$, bằng $0$ ngoài $E$ |

## 1. Thí nghiệm ngẫu nhiên, biến cố và mô hình xác suất

Trong các bài toán tối ưu hóa đã học, ta thường cho trước một hàm mục tiêu $f$ và tìm $x$ làm cực tiểu $f(x)$. Với một mô hình phân loại $h$ có tham số cố định, nếu đầu vào $x$ cố định thì đầu ra $h(x)$ cũng cố định. Tuy nhiên, ở thời điểm thiết kế hệ thống, ta chưa biết ảnh, tín hiệu hoặc câu hỏi nào sẽ xuất hiện trong tương lai. Để phát biểu về chất lượng của mô hình trên những dữ liệu chưa quan sát, ta cần mô tả các khả năng có thể xảy ra và mức độ xuất hiện của chúng.

Xét một camera giao thông và một bộ phát hiện người đi bộ. Trong một khung hình, thực tế có thể có hoặc không có người; bộ phát hiện có thể phát hoặc không phát cảnh báo. Điều cần quan tâm không chỉ là đầu ra của bộ phát hiện trên một ảnh cụ thể, mà còn là xác suất xảy ra các tình huống như “cảnh báo khi không có người” trong quy trình lấy khung hình đang xét.

Mục này xây dựng ba đối tượng: **không gian mẫu** để liệt kê những khả năng, **biến cố** để phát biểu tình huống quan tâm và **độ đo xác suất** để gán trọng số nhất quán cho các tình huống ấy. Đến Mục 2, khi đã quan sát cảnh báo, chúng ta sẽ nghiên cứu cách cập nhật xác suất của biến cố “có người” bằng xác suất có điều kiện.

### 1.1. Từ một quy trình quan sát đến không gian mẫu

Ta cố định cách chọn một khung hình và cách chạy bộ phát hiện. Trong quá trình vận hành, kết quả cụ thể của lần quan sát tiếp theo chưa biết trước. Đó là lý do để mô hình hóa lần quan sát bằng một thí nghiệm ngẫu nhiên.

::: definition Định nghĩa 10.1 (Thí nghiệm ngẫu nhiên và không gian mẫu)
**Thí nghiệm ngẫu nhiên** (random experiment) là một quy trình được xác định trước về cách thực hiện, nhưng kết quả cụ thể của một lần thực hiện chưa biết trước khi quan sát.

**Không gian mẫu** (sample space) $\Omega$ là tập tất cả kết quả sơ cấp có thể xảy ra theo cách mô hình hóa đã chọn. Mỗi $\omega\in\Omega$ là một **kết quả sơ cấp** (elementary outcome).

**Phạm vi.** Định nghĩa không đòi hỏi cơ chế vật lý bên trong phải ngẫu nhiên. Một thuật toán tất định được chạy trên đầu vào chưa biết vẫn tạo ra một kết quả chưa biết ở thời điểm trước khi quan sát đầu vào.
:::

::: example Ví dụ 10.1 (Hai lần tung đồng xu)
**Quy trình.** Tung một đồng xu hai lần, ghi kết quả theo đúng thứ tự. Gọi $\mathrm H$ là ngửa và $\mathrm T$ là sấp.

**Không gian mẫu.** Có bốn kết quả sơ cấp:

$$
\Omega=\{\mathrm{HH},\mathrm{HT},\mathrm{TH},\mathrm{TT}\}.
\tag{1.1}
$$

Kết quả $\mathrm{HT}$ là một phần tử của $\Omega$; phát biểu “ít nhất một lần ngửa” bao gồm ba kết quả và vì vậy chưa phải một kết quả sơ cấp.

**Kiểm tra lại.** Thứ tự phải được giữ: $\mathrm{HT}$ và $\mathrm{TH}$ là hai kết quả khác nhau. Nếu chỉ ghi **số lần ngửa**, ta sẽ có một không gian mẫu khác là $\{0,1,2\}$. Việc thay đổi cách ghi kết quả không tự nó cho phép gán xác suất $1/3$ cho mỗi giá trị.
:::

Đối với camera, một kết quả phải ghi đủ thông tin để biết hệ thống có phát hiện đúng hay không. Gọi $\mathrm P$ là “có người”, $\mathrm N$ là “không có người”, $\mathrm A$ là “có cảnh báo”, và $\mathrm Q$ là “không cảnh báo”. Ta chọn không gian mẫu

$$
\Omega=\{(\mathrm P,\mathrm A),(\mathrm P,\mathrm Q),
(\mathrm N,\mathrm A),(\mathrm N,\mathrm Q)\}.
\tag{1.2}
$$

Một phần tử của $\Omega$ có hai thành phần: tình trạng thực tế và phản hồi của bộ phát hiện. Chẳng hạn, $(\mathrm N,\mathrm A)$ có nghĩa là thực tế không có người nhưng hệ thống phát cảnh báo. Đó là một loại lỗi khác với $(\mathrm P,\mathrm Q)$, khi có người nhưng hệ thống bỏ sót.

Mô hình (1.2) không phân biệt hai khung hình khác nhau nếu chúng có cùng tình trạng thực tế và cùng phản hồi của hệ thống. Điều này có chủ ý: khi câu hỏi chỉ xoay quanh phát cảnh báo và phát hiện đúng hay sai, bốn loại kết quả là đủ. Nếu cần nghiên cứu vị trí người đi bộ hoặc mức độ tự tin của bộ phát hiện, không gian mẫu phải được mở rộng.

### 1.2. Biến cố: diễn đạt câu hỏi bằng tập hợp

Trong mô hình camera, “có người đi bộ” là một phát biểu có thể đúng trong nhiều kết quả sơ cấp, còn “cảnh báo sai” tương ứng đúng một loại kết quả. Ta biểu diễn các phát biểu ấy bằng tập con của $\Omega$.

::: definition Định nghĩa 10.2 (Biến cố và các phép toán biến cố)
Với không gian mẫu hữu hạn $\Omega$, một **biến cố** (event) là một tập $E\subseteq\Omega$. Biến cố $E$ xảy ra nếu kết quả quan sát $\omega$ thuộc $E$.

Với $E,F\subseteq\Omega$:

- **Phần bù:** $E^c=\Omega\setminus E$ là biến cố $E$ không xảy ra.
- **Giao:** $E\cap F$ là biến cố cả $E$ và $F$ xảy ra.
- **Hợp:** $E\cup F$ là biến cố ít nhất một trong hai biến cố xảy ra.
- **Xung khắc:** $E$ và $F$ xung khắc (mutually exclusive) nếu $E\cap F=\varnothing$.

**Phạm vi.** Với $\Omega$ hữu hạn, ta có thể lấy họ biến cố $\mathcal F=2^\Omega$, tức tập tất cả các tập con của $\Omega$. Trường hợp không gian mẫu vô hạn đòi hỏi quy định thêm về họ các biến cố; nội dung đó chưa cần trong mục này.
:::

Trong (1.2), đặt $H$ là biến cố “thực tế có người” và $C$ là biến cố “hệ thống cảnh báo”. Khi đó

$$
\begin{aligned}
H&=\{(\mathrm P,\mathrm A),(\mathrm P,\mathrm Q)\},\\
C&=\{(\mathrm P,\mathrm A),(\mathrm N,\mathrm A)\},\\
H\cap C&=\{(\mathrm P,\mathrm A)\},\\
H^c\cap C&=\{(\mathrm N,\mathrm A)\},\\
H\cap C^c&=\{(\mathrm P,\mathrm Q)\}.
\end{aligned}
\tag{1.3}
$$

Dòng thứ tư là biến cố **cảnh báo sai** theo nghĩa hệ thống báo có người khi thực tế không có người; dòng thứ năm là biến cố **bỏ sót**. Ta cũng có $H\cup C=\Omega\setminus\{(\mathrm N,\mathrm Q)\}$: trừ trường hợp không có người và không cảnh báo, mọi kết quả còn lại thuộc ít nhất một trong hai biến cố.

“Hoặc” trong $H\cup C$ là phép **hoặc bao hàm**: $(\mathrm P,\mathrm A)$ thuộc cả $H$ và $C$ nên vẫn thuộc hợp. Nếu loại kết quả này khỏi hợp, ta đã thay đổi biến cố đang tính xác suất.

### 1.3. Từ các biến cố đến một mô hình xác suất

Chỉ biết bốn kết quả của (1.2) chưa đủ để tính tần suất kỳ vọng của một loại lỗi. Nếu khung hình được lấy ở ngã tư đông người, tình huống có người sẽ khác với khung hình được lấy ở một tuyến đường vắng. Ta cần một quy tắc gán xác suất cho các biến cố, và quy tắc đó phải thỏa những điều kiện nhất quán.

::: definition Định nghĩa 10.3 (Không gian xác suất)
Một **không gian xác suất** (probability space) là bộ ba $(\Omega,\mathcal F,\mathbb P)$, trong đó:

- $\Omega$ là không gian mẫu;
- $\mathcal F$ là một *sigma-đại số* các tập con của $\Omega$: $\Omega\in\mathcal F$, họ đóng dưới phép lấy phần bù và hợp đếm được;
- $\mathbb P:\mathcal F\to[0,1]$ là độ đo xác suất thỏa ba tiên đề sau.

**(P1) Không âm.** Với mọi $E\in\mathcal F$, $\mathbb P(E)\ge0$.

**(P2) Chuẩn hóa.** $\mathbb P(\Omega)=1$.

**(P3) Cộng tính đếm được.** Với các biến cố $E_1,E_2,\ldots$ đôi một xung khắc,

$$
\mathbb P\!\left(\bigcup_{i=1}^{\infty}E_i\right)
=\sum_{i=1}^{\infty}\mathbb P(E_i).
\tag{1.4}
$$

**Phạm vi của mục.** Ta chỉ xét $\Omega$ hữu hạn và chọn $\mathcal F=2^\Omega$. Khi đó các biến cố đều đo được và tính xác suất chỉ cần các tổng hữu hạn.
:::

Ba tiên đề không xác định duy nhất xác suất của từng kết quả sơ cấp; chúng chỉ cho biết những ràng buộc mà một cách gán xác suất hợp lệ phải thỏa. Đối với không gian mẫu hữu hạn, có một cách xây dựng trực tiếp từ các trọng số của kết quả sơ cấp.

::: proposition Mệnh đề 10.4 (Xây dựng mô hình xác suất hữu hạn)
**Giả thiết.** $\Omega=\{\omega_1,\ldots,\omega_m\}$ hữu hạn, khác rỗng. Cho $p(\omega_i)\ge0$ với mọi $i$, thỏa

$$
\sum_{i=1}^m p(\omega_i)=1.
\tag{1.5}
$$

**Kết luận.** Với mọi biến cố $E\subseteq\Omega$, đặt

$$
\mathbb P(E)=\sum_{\omega\in E}p(\omega).
\tag{1.6}
$$

Khi đó $(\Omega,2^\Omega,\mathbb P)$ là một không gian xác suất. Ngược lại, mọi độ đo xác suất trên $2^\Omega$ đều có dạng (1.6) với $p(\omega)=\mathbb P(\{\omega\})$.

**Điều kiện áp dụng.** Các trọng số phải không âm và tổng bằng $1$. Không yêu cầu các kết quả đồng xác suất hoặc độc lập.
:::

::: proof Chứng minh Mệnh đề 10.4
**Bước 1 (không âm và chuẩn hóa).** Mỗi $p(\omega)\ge0$, nên $\mathbb P(E)\ge0$. Với $E=\Omega$, công thức (1.5) cho $\mathbb P(\Omega)=1$.

**Bước 2 (cộng tính).** Nếu các tập $E_i$ đôi một xung khắc, mỗi $\omega$ thuộc nhiều nhất một $E_i$. Do đó tổng các trọng số trên hợp bằng tổng các trọng số trên từng tập. Vì $\Omega$ hữu hạn, trong dãy tập đôi một xung khắc chỉ có hữu hạn tập khác rỗng, nên đẳng thức vẫn đúng cho một hợp đếm được.

**Bước 3 (chiều ngược lại).** Mỗi $E\subseteq\Omega$ là hợp rời nhau của các tập đơn $\{\omega\}$ với $\omega\in E$. Áp dụng tiên đề cộng tính cho hợp hữu hạn thu được $\mathbb P(E)=\sum_{\omega\in E}\mathbb P(\{\omega\})$. $\square$
:::

Nếu $m$ kết quả sơ cấp có cùng xác suất, (1.5) buộc mỗi trọng số bằng $1/m$. Khi đó

$$
\mathbb P(E)=\frac{|E|}{|\Omega|}.
\tag{1.7}
$$

Công thức (1.7) **chỉ** dùng cho mô hình đều. Trong Ví dụ 10.1, hai lần tung đồng xu công bằng và độc lập cho bốn kết quả cùng xác suất $1/4$. Nếu đồng xu bị lệch hoặc các lần tung phụ thuộc nhau, không thể mặc nhiên giữ cách gán này. Tương tự, bốn kết quả trong mô hình camera không có lý do gì phải đồng xác suất.

### 1.4. Các quy tắc xác suất suy ra từ tiên đề

Trong một bài toán AI, người học thường cần xác suất “ít nhất một sự kiện lỗi xảy ra” hoặc “không có lỗi nào xảy ra”. Các công thức dưới đây không phải các quy tắc bổ sung độc lập với Định nghĩa 10.3; chúng suy ra từ tiên đề cộng tính.

::: proposition Mệnh đề 10.5 (Phần bù và hợp hai biến cố)
**Giả thiết.** $(\Omega,\mathcal F,\mathbb P)$ là một không gian xác suất; $E,F\in\mathcal F$.

**Kết luận.** Ta có

$$
\mathbb P(\varnothing)=0,\qquad
\mathbb P(E^c)=1-\mathbb P(E),
\tag{1.8}
$$

và

$$
\mathbb P(E\cup F)=\mathbb P(E)+\mathbb P(F)-\mathbb P(E\cap F).
\tag{1.9}
$$

**Điều kiện áp dụng.** Không cần giả thiết $E$ và $F$ độc lập. Nếu chúng xung khắc thì $\mathbb P(E\cap F)=0$ và (1.9) rút thành công thức cộng.
:::

::: proof Chứng minh Mệnh đề 10.5
**Bước 1 (tập rỗng).** Vì $\Omega$ và $\varnothing$ xung khắc, $\Omega\cup\varnothing=\Omega$, nên tính cộng và chuẩn hóa cho $1=1+\mathbb P(\varnothing)$; suy ra $\mathbb P(\varnothing)=0$.

**Bước 2 (phần bù).** Hai tập $E$ và $E^c$ xung khắc, hợp của chúng là $\Omega$. Do đó $1=\mathbb P(E)+\mathbb P(E^c)$, được công thức phần bù.

**Bước 3 (hợp).** Ta phân hoạch $E\cup F$ thành ba tập đôi một xung khắc $E\setminus F$, $E\cap F$ và $F\setminus E$. Tính cộng cho

$$
\begin{aligned}
\mathbb P(E\cup F)
&=\mathbb P(E\setminus F)+\mathbb P(E\cap F)+\mathbb P(F\setminus E),\\
\mathbb P(E)&=\mathbb P(E\setminus F)+\mathbb P(E\cap F),\\
\mathbb P(F)&=\mathbb P(F\setminus E)+\mathbb P(E\cap F).
\end{aligned}
$$

Thế hai dòng cuối vào dòng đầu thu được (1.9). $\square$
:::

::: corollary Hệ quả 10.6 (Cận hợp — union bound)
**Giả thiết.** $E,F\in\mathcal F$ là hai biến cố bất kỳ.

**Kết luận.**

$$
\mathbb P(E\cup F)\le\mathbb P(E)+\mathbb P(F).
\tag{1.10}
$$

**Chứng minh.** Trong (1.9), $\mathbb P(E\cap F)\ge0$; bỏ số hạng bị trừ thu được cận trên. $\square$

**Phạm vi.** Cận có thể không chặt. Nó vẫn đúng khi hai biến cố phụ thuộc và khi giao của chúng chưa biết. Dạng tổng quát cho nhiều biến cố được sử dụng trong các cận xác suất đã học trước đó.
:::

Một lỗi thường gặp là tính $\mathbb P(E\cup F)$ bằng $\mathbb P(E)+\mathbb P(F)$ dù hai biến cố có giao khác rỗng. Khi đó các kết quả trong giao bị cộng hai lần. Mệnh đề 10.5 loại đúng phần cộng thừa ấy.

### 1.5. Tình huống AI: xác suất cảnh báo sai và bỏ sót

Ta trở lại bài toán camera với không gian mẫu (1.2). Mỗi lần quan sát gồm một khung hình được lấy theo cùng quy trình lấy mẫu và kết quả chạy của bộ phát hiện đã cố định. Giả sử phân phối của bốn loại kết quả được **cho trước để minh họa**, như bảng sau. Các số liệu không được xem là kết quả đo của một hệ thống thực tế.

::: example Ví dụ 10.2 (Từ bảng tình huống đến xác suất lỗi của AI)
**Dữ kiện.** Bốn kết quả sơ cấp của (1.2) được gán các trọng số:

| Tình trạng thực tế | Phản hồi hệ thống | Kết quả $\omega$ | $p(\omega)$ |
|---|---|---|---:|
| Có người | Cảnh báo | $(\mathrm P,\mathrm A)$ | $0{,}18$ |
| Có người | Không cảnh báo | $(\mathrm P,\mathrm Q)$ | $0{,}02$ |
| Không có người | Cảnh báo | $(\mathrm N,\mathrm A)$ | $0{,}08$ |
| Không có người | Không cảnh báo | $(\mathrm N,\mathrm Q)$ | $0{,}72$ |
| | | **Tổng** | **$1{,}00$** |

**Kiểm tra mô hình.** Mỗi trọng số không âm và $0{,}18+0{,}02+0{,}08+0{,}72=1$, nên Mệnh đề 10.4 xác nhận đây là một mô hình xác suất hợp lệ.

**Biến cố có người và cảnh báo.** Với $H,C$ của (1.3), công thức (1.6) cho

$$
\begin{aligned}
\mathbb P(H)&=0{,}18+0{,}02=0{,}20,\\
\mathbb P(C)&=0{,}18+0{,}08=0{,}26,\\
\mathbb P(H\cap C)&=0{,}18.
\end{aligned}
$$

**Biến cố lỗi.** Cảnh báo sai là $H^c\cap C=\{(\mathrm N,\mathrm A)\}$, xác suất $0{,}08$; bỏ sót là $H\cap C^c=\{(\mathrm P,\mathrm Q)\}$, xác suất $0{,}02$. Hai biến cố này xung khắc. Vì vậy, nếu $L$ là biến cố “hệ thống đưa ra phản hồi sai”, thì

$$
\begin{aligned}
L&=(H^c\cap C)\cup(H\cap C^c),\\
\mathbb P(L)&=0{,}08+0{,}02=0{,}10.
\end{aligned}
\tag{1.11}
$$

**Hợp hai biến cố.** Theo Mệnh đề 10.5,

$$
\mathbb P(H\cup C)=0{,}20+0{,}26-0{,}18=0{,}28.
$$

Cũng có thể kiểm tra bằng phần bù: $(H\cup C)^c=\{(\mathrm N,\mathrm Q)\}$, nên $\mathbb P(H\cup C)=1-0{,}72=0{,}28$.

**Kiểm tra lại.** Xác suất phản hồi đúng bằng $p(\mathrm P,\mathrm A)+p(\mathrm N,\mathrm Q)=0{,}18+0{,}72=0{,}90$; cộng với xác suất lỗi $0{,}10$ bằng $1$. Hai cách tính $\mathbb P(H\cup C)$ cũng cho cùng kết quả.
:::

Kết quả $\mathbb P(H^c\cap C)=0{,}08$ là xác suất **đồng thời** xảy ra không có người và cảnh báo trên một khung hình được lấy theo quy trình đã chọn. Nó chưa phải xác suất cảnh báo trong số những khung hình không có người. Muốn tính đại lượng thứ hai, ta phải giới hạn không gian quan sát vào biến cố $H^c$; đó là xác suất có điều kiện của Mục 2.

Ví dụ 10.2 còn chỉ ra sự khác biệt giữa **mô hình xác suất** và **thuật toán học máy**. Ở đây các trọng số được cho trước để tính toán. Trong một hệ thống triển khai, ta phải có một cơ chế suy ra hoặc ước lượng chúng từ dữ liệu; việc đó đặt ra bài toán ước lượng thống kê của Bài 11. Ngoài ra, thay đổi cách lấy khung hình sẽ thay đổi phân phối cần mô hình hóa, ngay cả khi bộ phát hiện không thay đổi.

::: remark Nhận xét 10.7 (Giới hạn của mô hình hữu hạn)
**Chọn độ chi tiết.** Không gian mẫu (1.2) chỉ lưu hai thông tin nhị phân. Nó đủ để phân biệt các loại phản hồi đúng/sai, nhưng không mô tả vị trí người, độ trễ của cảnh báo hoặc độ khó của khung hình.

**Gán xác suất.** Tổng bằng $1$ chỉ chứng minh phân phối hợp lệ về mặt toán học, không chứng minh nó phù hợp với môi trường thực. Hai mô hình có các trọng số khác nhau đều có thể thỏa các tiên đề.

**Nguồn bất định.** Bộ phát hiện có thể tất định trên mỗi ảnh. Xác suất ở đây xuất hiện do cách lấy khung hình từ môi trường. Không nên đồng nhất xác suất của một biến cố trên nhiều đầu vào với điểm tin cậy do mô hình trả về trên một đầu vào cố định.
:::

### 1.6. Bài tập và kiểm tra lại

::: exercise Bài tập 10.1 (Một không gian mẫu đều)
Gieo hai viên xúc xắc công bằng, phân biệt viên thứ nhất và viên thứ hai. Giả sử cả $36$ cặp kết quả có cùng xác suất.

- (a) Viết không gian mẫu bằng ký hiệu tích Descartes và nêu số phần tử.
- (b) Đặt $E$ là biến cố “ít nhất một viên ra mặt $6$”. Viết $E^c$ và tính $\mathbb P(E)$ bằng quy tắc phần bù.
- (c) Đặt $F$ là biến cố “tổng hai viên bằng $7$”. Tìm $|F|$, $|E\cap F|$ và $\mathbb P(E\cup F)$.
- (d) Có thể dùng trực tiếp công thức $|E|/|\Omega|$ nếu không giả thiết các cặp kết quả đồng xác suất hay không? Giải thích.
:::

::: hint
Ở (b), $E^c$ gồm các cặp đều thuộc $\{1,2,3,4,5\}$. Ở (c), liệt kê sáu cặp có tổng bằng $7$, rồi xác định cặp nào chứa mặt $6$.
:::

::: solution
**Câu (a).** $\Omega=\{1,2,3,4,5,6\}\times\{1,2,3,4,5,6\}$, nên $|\Omega|=36$.

**Câu (b).** $E^c=\{1,2,3,4,5\}\times\{1,2,3,4,5\}$, có $25$ kết quả. Suy ra $\mathbb P(E)=1-25/36=11/36$.

**Câu (c).** $F=\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\}$, nên $|F|=6$. Giao $E\cap F=\{(1,6),(6,1)\}$ có $2$ kết quả. Do đó

$$
\mathbb P(E\cup F)=\frac{11}{36}+\frac{6}{36}-\frac{2}{36}=\frac{15}{36}=\frac5{12}.
$$

**Câu (d).** Không. Công thức đếm chia đều cần giả thiết các kết quả sơ cấp đồng xác suất; nếu không phải cộng xác suất của từng kết quả trong biến cố theo (1.6).

**Kiểm tra lại.** $E\cup F$ có $11+6-2=15$ kết quả, đúng với $5/12$ của câu (c).
:::

::: exercise Bài tập 10.2 (Đọc xác suất lỗi từ mô hình AI)
Giữ không gian mẫu của Ví dụ 10.2, nhưng xét một quy trình lấy khung hình khác, với

$$
p((\mathrm P,\mathrm A))=0{,}27,\quad
p((\mathrm P,\mathrm Q))=0{,}03,\quad
p((\mathrm N,\mathrm A))=0{,}07,\quad
p((\mathrm N,\mathrm Q))=0{,}63.
$$

- (a) Kiểm tra bảng trọng số là một mô hình xác suất hợp lệ.
- (b) Tính xác suất thực tế có người, xác suất phát cảnh báo và xác suất hệ thống phản hồi sai.
- (c) Tính $\mathbb P(H\cup C)$ bằng hai cách: công thức hợp và phần bù.
- (d) So sánh xác suất cảnh báo sai **đồng thời** $\mathbb P(H^c\cap C)$ với Ví dụ 10.2. Có thể chỉ từ hai bảng này kết luận hệ thống phát hiện đã được cải thiện hay không?
:::

::: hint
Ở (b), lỗi gồm hai biến cố xung khắc. Ở (d), cần phân biệt thay đổi bộ phát hiện với thay đổi quy trình lấy mẫu hoặc phân phối các trường hợp thực tế.
:::

::: solution
**Câu (a).** Mọi trọng số không âm và $0{,}27+0{,}03+0{,}07+0{,}63=1$, nên hợp lệ.

**Câu (b).** $\mathbb P(H)=0{,}27+0{,}03=0{,}30$; $\mathbb P(C)=0{,}27+0{,}07=0{,}34$. Xác suất lỗi bằng $0{,}03+0{,}07=0{,}10$.

**Câu (c).** $\mathbb P(H\cap C)=0{,}27$, nên $\mathbb P(H\cup C)=0{,}30+0{,}34-0{,}27=0{,}37$. Phần bù cho $1-0{,}63=0{,}37$.

**Câu (d).** Xác suất cảnh báo sai đồng thời giảm từ $0{,}08$ xuống $0{,}07$; chưa thể kết luận thuật toán phát hiện được cải thiện vì phân phối đầu vào đã thay đổi và chưa so sánh cùng một điều kiện đánh giá.

**Kiểm tra lại.** Tổng xác suất phản hồi đúng là $0{,}27+0{,}63=0{,}90$, khớp xác suất lỗi $0{,}10$.
:::

Từ Bài tập 10.2, xác suất lỗi đồng thời chưa đủ để mô tả hiệu suất trong từng nhóm khung hình. Muốn suy luận về sự có mặt của người đi bộ sau khi nhận cảnh báo, chúng ta cần chuẩn hóa phân phối trong nhóm cảnh báo; Mục 2 thực hiện phép tính này bằng xác suất có điều kiện và Bayes.

## 2. Xác suất có điều kiện, độc lập và định lý Bayes

Trong Ví dụ 10.2, xác suất có người và có cảnh báo cùng xảy ra bằng $0{,}18$, còn xác suất cảnh báo bằng $0{,}26$. Khi chỉ xem các khung hình có cảnh báo, ta đã thay đổi tập những kết quả đang xét. Xác suất có điều kiện mô tả sự thay đổi ấy. Từ phép chuẩn hóa trên một biến cố, chúng ta sẽ suy ra quy tắc nhân, công thức xác suất toàn phần và định lý Bayes. Sau đó, cùng phép tính được dùng cho một hệ thống kiểm định sản phẩm có thông tin về nhà cung cấp và tín hiệu cảm biến.

### 2.1. Chuẩn hóa sau khi có thông tin

::: definition Định nghĩa 10.8 (Xác suất có điều kiện)
Cho hai biến cố $E,F\in\mathcal F$ và $\mathbb P(F)>0$. **Xác suất có điều kiện** (conditional probability) của $E$ khi biết $F$ là

$$
\mathbb P(E\mid F)=\frac{\mathbb P(E\cap F)}{\mathbb P(F)}.
\tag{2.1}
$$

Điều kiện $\mathbb P(F)>0$ bảo đảm phép chia xác định. Với $F$ cố định, ánh xạ $E\mapsto\mathbb P(E\mid F)$ là một độ đo xác suất trên $\mathcal F$ và gán xác suất $1$ cho $F$. Nguồn: Murphy I, §2.2.3, các quy tắc xác suất cho biến cố.
:::

Định nghĩa 10.8 sử dụng giao trong Định nghĩa 10.2: chỉ phần của $E$ nằm trong $F$ được giữ lại. Sau đó chia cho $\mathbb P(F)$ để tổng các trọng số trong $F$ bằng $1$. Trong mô hình hữu hạn, mỗi kết quả $\omega\in F$ có trọng số mới $p(\omega)/\mathbb P(F)$, còn kết quả ngoài $F$ có trọng số $0$. Các trọng số này không âm và có tổng bằng $1$, nên Mệnh đề 10.4 áp dụng. Với mô hình tổng quát, tính cộng đếm được được bảo toàn vì giao với $F$ bảo toàn tính xung khắc, rồi mọi số hạng cùng được chia cho một hằng số dương.

::: example Ví dụ 10.3 (Đọc lại cảnh báo của camera)
Đặt $H$ là biến cố có người trong khung hình và $C$ là biến cố hệ thống cảnh báo. Mô hình cho $\mathbb P(H\cap C)=0{,}18$, $\mathbb P(H\cap C^c)=0{,}02$, $\mathbb P(H^c\cap C)=0{,}08$ và $\mathbb P(H^c\cap C^c)=0{,}72$, như Ví dụ 10.2. Do đó $\mathbb P(H)=0{,}20$, $\mathbb P(C)=0{,}26$, và

$$
\begin{aligned}
\mathbb P(H\mid C)&=\frac{0{,}18}{0{,}26}=\frac9{13}\approx0{,}6923,\\
\mathbb P(C\mid H)&=\frac{0{,}18}{0{,}20}=0{,}90,\\
\mathbb P(C\mid H^c)&=\frac{0{,}08}{0{,}80}=0{,}10.
\end{aligned}
$$

Trong các khung hình có người, hệ thống cảnh báo với xác suất $0{,}90$. Trong các khung hình đã có cảnh báo, xác suất thực sự có người chỉ bằng khoảng $0{,}6923$. Hai điều kiện chọn hai nhóm khung hình khác nhau, nên hai xác suất không có lý do phải bằng nhau.

Kiểm tra bằng phần bù trong nhóm có cảnh báo cho $\mathbb P(H^c\mid C)=0{,}08/0{,}26=4/13$; cộng với $9/13$ bằng $1$.
:::

Trong học máy, một mô hình có độ nhạy cao vẫn có thể phát nhiều cảnh báo không tương ứng với đối tượng cần phát hiện. Để đánh giá cảnh báo từ phía người sử dụng, ta cần cả xác suất cảnh báo khi có đối tượng và tỉ lệ đối tượng trong quần thể đầu vào. Việc đổi thứ tự hai biến cố trong ký hiệu điều kiện làm thay đổi đại lượng cần tính.

### 2.2. Quy tắc nhân và phân hoạch các khả năng

::: proposition Mệnh đề 10.9 (Quy tắc nhân)
**Giả thiết.** $E,F$ là các biến cố trên cùng không gian xác suất và $\mathbb P(F)>0$.

**Kết luận.**

$$
\mathbb P(E\cap F)=\mathbb P(E\mid F)\mathbb P(F).
\tag{2.2}
$$

Nếu $\mathbb P(E)>0$, cũng có $\mathbb P(E\cap F)=\mathbb P(F\mid E)\mathbb P(E)$. Với ba biến cố và các mẫu số liên quan dương, quy tắc mở rộng thành

$$
\mathbb P(E\cap F\cap G)
=\mathbb P(E)\mathbb P(F\mid E)\mathbb P(G\mid E\cap F).
\tag{2.3}
$$

**Điều kiện áp dụng.** Công thức (2.3) yêu cầu $\mathbb P(E)>0$ và $\mathbb P(E\cap F)>0$; không cần giả thiết độc lập.

**Phạm vi.** Quy tắc có thể lặp lại cho một dãy hữu hạn biến cố khi các điều kiện có xác suất dương. Nguồn: Murphy I, §2.2.3.
:::

::: proof Chứng minh Mệnh đề 10.9
Nhân hai vế (2.1) với $\mathbb P(F)$ được (2.2). Đổi vai $E,F$ được dạng thứ hai. Áp dụng (2.2) cho $(E\cap F,G)$ theo thứ tự điều kiện trên $E\cap F$, rồi thay $\mathbb P(E\cap F)=\mathbb P(E)\mathbb P(F\mid E)$, được (2.3). $\square$
:::

Quy tắc nhân không giả thiết độc lập. Những thông tin phụ thuộc được giữ trong từng xác suất có điều kiện. Khi mô hình có nhiều thành phần, ta có thể chọn thứ tự phù hợp với cơ chế sinh dữ liệu, chẳng hạn chọn nhà cung cấp, xác định tình trạng sản phẩm rồi phát tín hiệu kiểm định.

Một **phân hoạch** $B_1,\ldots,B_m$ của $\Omega$ là các biến cố đôi một xung khắc, có hợp bằng $\Omega$. Mỗi kết quả thuộc đúng một nhóm. Để dùng các xác suất có điều kiện theo công thức thông thường, dưới đây ta chỉ giữ các nhóm có xác suất dương; nhóm có xác suất $0$ không đóng góp vào các tổng.

::: theorem Định lý 10.10 (Xác suất toàn phần và Bayes)
**Giả thiết.** $B_1,\ldots,B_m$ là phân hoạch hữu hạn với $\mathbb P(B_j)>0$ cho mọi $j$; $E$ là một biến cố.

**Kết luận.**

$$
\mathbb P(E)=\sum_{j=1}^m\mathbb P(E\mid B_j)\mathbb P(B_j).
\tag{2.4}
$$

Nếu thêm $\mathbb P(E)>0$, thì

$$
\mathbb P(B_k\mid E)
=\frac{\mathbb P(E\mid B_k)\mathbb P(B_k)}
{\sum_{j=1}^m\mathbb P(E\mid B_j)\mathbb P(B_j)}.
\tag{2.5}
$$

Công thức (2.4) là **công thức xác suất toàn phần**; (2.5) là **định lý Bayes**.

**Điều kiện áp dụng.** Công thức Bayes yêu cầu $\mathbb P(E)>0$; các xác suất có điều kiện theo $B_j$ cần $\mathbb P(B_j)>0$.

**Phạm vi.** Đây là dạng phân hoạch hữu hạn. Dạng đếm được hoặc có mật độ cần tổng vô hạn hoặc tích phân và các điều kiện tương ứng. Nguồn: Murphy I, §2.3 (*Bayes' Rule*), dựa trên các quy tắc xác suất ở §2.2.3.
:::

::: proof Chứng minh Định lý 10.10
Các tập $E\cap B_j$ đôi một xung khắc và có hợp bằng $E$. Theo tính cộng trong Định nghĩa 10.3,

$$
\mathbb P(E)=\sum_j\mathbb P(E\cap B_j).
$$

Thay quy tắc nhân (2.2) vào từng số hạng được (2.4). Tiếp theo, Định nghĩa 10.8 cho

$$
\mathbb P(B_k\mid E)
=\frac{\mathbb P(B_k\cap E)}{\mathbb P(E)}
=\frac{\mathbb P(E\mid B_k)\mathbb P(B_k)}{\mathbb P(E)}.
$$

Thay (2.4) vào mẫu số được (2.5). $\square$
:::

Công thức toàn phần tính xác suất của cùng một quan sát qua các nhóm có thể đã sinh ra quan sát đó. Bayes đi theo chiều ngược lại: từ quan sát trở về xác suất của từng nhóm. Trong (2.5), $\mathbb P(B_k)$ là **xác suất tiên nghiệm** (prior), $\mathbb P(E\mid B_k)$ là xác suất của quan sát dưới giả thuyết $B_k$, và $\mathbb P(B_k\mid E)$ là **xác suất hậu nghiệm** (posterior). Khi xem các giá trị $\mathbb P(E\mid B_k)$ như một hàm của giả thuyết $k$ với $E$ đã cố định, ta gọi đó là **hàm hợp lý** (likelihood). Hàm này không cần có tổng bằng $1$ theo $k$; mẫu số trong (2.5) thực hiện việc chuẩn hóa hậu nghiệm.

### 2.3. Từ tỉ lệ sản phẩm lỗi đến xác suất hậu nghiệm

Ví dụ camera chỉ có tình trạng thực tế và phản hồi của hệ thống. Chúng ta mở rộng cùng cấu trúc sang kiểm định sản phẩm, nơi thông tin nhà cung cấp giúp mô tả các nhóm có mức lỗi khác nhau. Mọi xác suất dưới đây được cho trước cho mục đích học tập; việc ước lượng chúng từ một mẫu kiểm định thuộc Bài 11.

::: example Ví dụ 10.4 (Cập nhật xác suất sản phẩm lỗi)
Chọn ngẫu nhiên một sản phẩm trong luồng hàng. Ký hiệu $S=a$ hoặc $S=b$ khi hàng đến từ nhà cung cấp tương ứng; $Y=1$ khi sản phẩm lỗi, $Y=0$ khi đạt; $A=1$ khi cảm biến cảnh báo, $A=0$ khi không cảnh báo. Ở đây, $\{S=a\}$ là cách viết gọn một biến cố; ý nghĩa hình thức của biến ngẫu nhiên được định nghĩa trong Mục 3.

Giả sử

$$
\begin{aligned}
\mathbb P(S=a)&=0{,}60,&\mathbb P(S=b)&=0{,}40,\\
\mathbb P(Y=1\mid S=a)&=0{,}02,&\mathbb P(Y=1\mid S=b)&=0{,}08.
\end{aligned}
\tag{2.6}
$$

Cảm biến có độ nhạy $\mathbb P(A=1\mid Y=1)=0{,}90$ và xác suất cảnh báo nhầm $\mathbb P(A=1\mid Y=0)=0{,}05$. Ta còn giả thiết rằng, khi tình trạng $Y$ đã biết, nhà cung cấp không làm thay đổi phân phối phản hồi cảm biến:

$$
\mathbb P(A=1\mid Y=y,S=s)=\mathbb P(A=1\mid Y=y).
\tag{2.7}
$$

Công thức toàn phần theo nhà cung cấp cho

$$
\mathbb P(Y=1)=0{,}60\cdot0{,}02+0{,}40\cdot0{,}08=0{,}044.
$$

Vậy xác suất tiên nghiệm của sản phẩm lỗi là $4{,}4\%$. Phân hoạch theo tình trạng sản phẩm cho

$$
\mathbb P(A=1)=0{,}90\cdot0{,}044+0{,}05\cdot0{,}956
=0{,}0874.
\tag{2.8}
$$

Sau khi có cảnh báo, Bayes cho

$$
\mathbb P(Y=1\mid A=1)
=\frac{0{,}90\cdot0{,}044}{0{,}0874}
=\frac{198}{437}\approx0{,}4531.
\tag{2.9}
$$

Xác suất lỗi tăng từ $0{,}044$ lên khoảng $0{,}4531$. Tuy nhiên, trong nhóm có cảnh báo, xác suất sản phẩm đạt vẫn khoảng $0{,}5469$. Một cách kiểm tra là xét $10\,000$ sản phẩm theo tỉ lệ của mô hình: có $440$ sản phẩm lỗi, trong đó số cảnh báo kỳ vọng là $396$; có $9560$ sản phẩm đạt, trong đó số cảnh báo nhầm kỳ vọng là $478$. Do đó tỉ lệ sản phẩm lỗi trong bảng số đếm kỳ vọng gồm $874$ cảnh báo là $396/874$, đúng với (2.9). Các số đếm này là phép minh họa theo mô hình, không phải bảo đảm về số lượng thực tế trong mỗi lô.
:::

Trong học máy, (2.9) minh họa việc cập nhật thông tin về một nhãn chưa quan sát khi đã thấy tín hiệu. Công thức sử dụng xác suất tiên nghiệm và cơ chế quan sát riêng biệt, nên thay đổi cơ cấu nguồn hàng có thể làm thay đổi hậu nghiệm dù cảm biến không đổi. Chẳng hạn, nếu vẫn giữ độ nhạy và tỉ lệ cảnh báo nhầm nhưng xác suất lỗi chỉ còn $0{,}01$, hậu nghiệm sau cảnh báo sẽ là $0{,}009/(0{,}009+0{,}0495)\approx0{,}1538$. Vì vậy, độ nhạy $0{,}90$ không thể được dùng trực tiếp làm xác suất lỗi sau cảnh báo.


Cây dưới đây biểu diễn phần mô hình trước khi quan sát cảm biến. Mỗi nhánh từ gốc tới lá dùng quy tắc nhân của Mệnh đề 10.9; cộng hai lá lỗi dùng công thức toàn phần của Định lý 10.10. Các nhánh không được coi là đồng xác suất.

![Cây xác suất: chọn nhà cung cấp a với xác suất 0,60, rồi lỗi với xác suất 0,02 hoặc đạt với xác suất 0,98, cho hai xác suất đồng thời 0,012 và 0,588. Nhà cung cấp b có xác suất 0,40, rồi lỗi 0,08 hoặc đạt 0,92, cho 0,032 và 0,368. Cộng hai lá lỗi được xác suất lỗi 0,044.](img/lec-10/supplier-probability-tree.svg)

### 2.4. Độc lập và độc lập có điều kiện

Quy tắc nhân luôn giữ các điều kiện cần thiết. Để loại bớt một điều kiện, chúng ta cần một giả thiết độc lập có thể phát biểu và kiểm tra trong mô hình.

::: definition Định nghĩa 10.11 (Độc lập)
Hai biến cố $E,F$ **độc lập** (independent) nếu

$$
\mathbb P(E\cap F)=\mathbb P(E)\mathbb P(F).
\tag{2.10}
$$

Nếu $\mathbb P(F)>0$, điều kiện này tương đương $\mathbb P(E\mid F)=\mathbb P(E)$, theo Định nghĩa 10.8. Một họ hữu hạn biến cố độc lập đồng thời nếu công thức tích đúng cho giao của mọi họ con có ít nhất hai phần tử; chỉ kiểm tra từng cặp chưa đủ để kết luận độc lập đồng thời. Nguồn: Murphy I, §2.2.4 (*Independence and conditional independence*).
:::

Độc lập là tính chất của độ đo xác suất, còn xung khắc trong Định nghĩa 10.2 là tính chất giao tập hợp. Nếu $E,F$ xung khắc và đều có xác suất dương thì $\mathbb P(E\cap F)=0<\mathbb P(E)\mathbb P(F)$, nên chúng phụ thuộc. Khi biết $F$ xảy ra, ta biết chắc $E$ không xảy ra; thông tin đã thay đổi xác suất của $E$. Nếu một biến cố có xác suất $0$, hai biến cố xung khắc vẫn có thể độc lập.

::: definition Định nghĩa 10.12 (Độc lập có điều kiện)
Với $\mathbb P(G)>0$, hai biến cố $E,F$ **độc lập khi biết** $G$ nếu

$$
\mathbb P(E\cap F\mid G)
=\mathbb P(E\mid G)\mathbb P(F\mid G).
\tag{2.11}
$$

Với các biến rời rạc $U,V,W$, ký hiệu $U\perp V\mid W$ có nghĩa là, với mọi $w$ có $\mathbb P(W=w)>0$ và mọi $u,v$,

$$
p(u,v\mid w)=p(u\mid w)p(v\mid w).
\tag{2.12}
$$

Trong (2.12), $p(u,v\mid w)$ viết gọn $\mathbb P(U=u,V=v\mid W=w)$. Khi các mẫu số dương, (2.12) tương đương $p(u\mid v,w)=p(u\mid w)$. Nguồn: Murphy I, §2.2.4.
:::

Định nghĩa 10.12 áp dụng Định nghĩa 10.11 bên trong từng nhóm có cùng giá trị điều kiện. Nó không khẳng định các biến độc lập sau khi gộp mọi nhóm, và độc lập ban đầu cũng không bảo đảm độc lập sau khi có thêm điều kiện. Trong học máy, giả thiết độc lập có điều kiện cho phép biểu diễn một phân phối nhiều biến bằng ít thành phần hơn. Việc sử dụng phép nhân ấy đòi hỏi một lý do mô hình hóa, chẳng hạn đáp ứng cảm biến chỉ phụ thuộc tình trạng lỗi đã được mô tả đầy đủ.

::: example Ví dụ 10.5 (Độc lập trong từng nhóm nhưng phụ thuộc khi gộp)
Xét hai nhà cung cấp có $\mathbb P(S=a)=0{,}60$, $\mathbb P(S=b)=0{,}40$, với tỉ lệ lỗi $\mathbb P(Y=1\mid S=a)=0{,}02$, $\mathbb P(Y=1\mid S=b)=0{,}08$. Cảm biến có $\mathbb P(A=1\mid Y=1)=0{,}90$, $\mathbb P(A=1\mid Y=0)=0{,}05$, và $A\perp S\mid Y$, như mô hình của Ví dụ 10.4. Xác suất cảnh báo theo nhà cung cấp là

$$
\begin{aligned}
\mathbb P(A=1\mid S=a)&=0{,}90\cdot0{,}02+0{,}05\cdot0{,}98=0{,}067,\\
\mathbb P(A=1\mid S=b)&=0{,}90\cdot0{,}08+0{,}05\cdot0{,}92=0{,}118.
\end{aligned}
$$

Hai số khác nhau, nên $A$ và $S$ phụ thuộc. Nhà cung cấp làm thay đổi cơ cấu sản phẩm lỗi, và cơ cấu ấy làm thay đổi xác suất cảnh báo. Nếu tình trạng lỗi được biết đầy đủ, ảnh hưởng này đã được giữ trong điều kiện $Y$.

Chiều suy luận ngược cũng không đúng. Tung hai đồng xu độc lập và công bằng, đặt $U,V\in\{0,1\}$ là kết quả. Khi chưa có điều kiện, $U\perp V$. Nếu biết $G=\{U=V\}$, thì $\mathbb P(U=1,V=1\mid G)=1/2$, trong khi $\mathbb P(U=1\mid G)\mathbb P(V=1\mid G)=1/4$. Vì vậy, điều kiện mới có thể tạo phụ thuộc.
:::

Từ phép chuẩn hóa của Định nghĩa 10.8, quy tắc nhân 10.9 và phân hoạch các khả năng dẫn đến Bayes 10.10. Các Định nghĩa 10.11–10.12 cho biết khi nào có thể giản lược điều kiện trong phép nhân. Để tiếp tục tính trung bình thiệt hại hoặc mô tả giá trị cảm biến liên tục, chúng ta cần chuyển từ từng biến cố sang phân phối của các đại lượng số.

## 3. Biến ngẫu nhiên và phân phối xác suất

Một kết quả kiểm định có thể chứa nhà cung cấp, tình trạng lỗi, cảnh báo và nhiều giá trị cảm biến. Khi quan tâm số sản phẩm lỗi, ta lấy một hàm của kết quả; khi quan tâm tín hiệu đo, ta lấy một hàm khác. Biến ngẫu nhiên cho phép mô tả các đại lượng ấy trên cùng một mô hình, còn phân phối cho biết xác suất của những giá trị mà từng đại lượng có thể nhận. Cách trình bày dưới đây theo Murphy I, §2.2 và các họ phân phối trong §2.4–§2.6; phần nhiều biến được tiếp tục ở Mục 5.

### 3.1. Từ kết quả sơ cấp đến đại lượng quan sát

::: definition Định nghĩa 10.13 (Biến ngẫu nhiên và phân phối)
Trên không gian xác suất $(\Omega,\mathcal F,\mathbb P)$, một **biến ngẫu nhiên thực** là ánh xạ $X:\Omega\to\mathbb R$ sao cho $\{\omega:X(\omega)\le t\}\in\mathcal F$ với mọi $t\in\mathbb R$. Điều kiện này được gọi là tính đo được.

**Phân phối** của $X$ gán cho mỗi tập Borel $B\subseteq\mathbb R$ xác suất

$$
\mathbb P_X(B)=\mathbb P(X\in B)
=\mathbb P\bigl(\{\omega:X(\omega)\in B\}\bigr).
\tag{3.1}
$$

Tập Borel bao gồm các khoảng, các tập đơn và những tập thu được từ chúng bằng các phép toán đếm được thông dụng. Trong mô hình hữu hạn với $\mathcal F=2^\Omega$, mọi hàm $X$ đều đo được. Một vector ngẫu nhiên nhận giá trị trong $\mathbb R^d$ được định nghĩa tương tự; biến phân loại hữu hạn có thể nhận trực tiếp các nhãn. Nguồn cho cách nhìn qua biến ngẫu nhiên: Murphy I, §2.2; điều kiện đo được được nêu để thống nhất với Định nghĩa 10.3.

Hai biến ngẫu nhiên $X,Z$ **độc lập**, ký hiệu $X\perp Z$, nếu với mọi tập Borel $B,D$,

$$
\mathbb P(X\in B,Z\in D)=\mathbb P(X\in B)\mathbb P(Z\in D).
$$

Với các biến rời rạc, điều này tương đương $\mathbb P(X=x,Z=z)=p_X(x)p_Z(z)$ cho mọi cặp giá trị. Như vậy, độc lập của biến ngẫu nhiên mở rộng Định nghĩa 10.11 từ một cặp biến cố sang mọi cặp biến cố được xác định bởi hai biến. Với các biến phân loại hữu hạn, thay tập Borel bằng tập con của tập nhãn.

:::

Biến ngẫu nhiên là một hàm cố định; giá trị đầu ra chưa biết vì kết quả $\omega$ chưa biết. Hai biến ngẫu nhiên có thể có cùng phân phối mà vẫn là hai hàm khác nhau trên $\Omega$. Ngược lại, cùng một hàm quan sát sẽ có phân phối khác nếu thay đổi độ đo $\mathbb P$, chẳng hạn thay cơ cấu nguồn hàng.

Với biến cố lỗi $D$, đặt $Y=\mathbf1_D$: bằng $1$ trên $D$, bằng $0$ ngoài $D$. Khi đó $\{Y=1\}=D$, nên các biến cố của Mục 1 vẫn được giữ trong ngôn ngữ mới. Các ký hiệu $S,Y,A$ của Ví dụ 10.4 lần lượt là hàm lấy nhãn nhà cung cấp, chỉ báo lỗi và chỉ báo cảnh báo từ kết quả đầy đủ của một lần kiểm định. Chúng không phải ba lần chọn sản phẩm riêng biệt.

### 3.2. Khối xác suất và hàm phân phối tích lũy

::: definition Định nghĩa 10.14 (Phân phối rời rạc và hàm phân phối tích lũy)
Nếu $X$ nhận giá trị trong một tập hữu hạn hoặc đếm được $\mathcal X$, **hàm khối xác suất** (probability mass function, PMF) là

$$
p_X(x)=\mathbb P(X=x),\qquad
p_X(x)\ge0,\qquad \sum_{x\in\mathcal X}p_X(x)=1.
\tag{3.2}
$$

Với mọi biến ngẫu nhiên thực $X$, **hàm phân phối tích lũy** (cumulative distribution function, CDF) là

$$
F_X(t)=\mathbb P(X\le t).
\tag{3.3}
$$

Hàm $F_X$ không giảm, liên tục phải, có giới hạn $0$ khi $t\to-\infty$ và $1$ khi $t\to+\infty$. Với biến rời rạc, $F_X(t)=\sum_{x\le t}p_X(x)$. Nguồn: Murphy I, §2.2.1 (*Discrete random variables*) và §2.6.1 (*Cumulative distribution function*).
:::

Các tính chất của CDF xuất phát từ quan hệ bao hàm của các biến cố và tính liên tục của độ đo xác suất đối với dãy tập đơn điệu. Ở đây, chúng ta dùng các tính chất ấy mà không phát triển lý thuyết độ đo. Công thức luôn dùng được để tính xác suất một khoảng là $\mathbb P(a<X\le b)=F_X(b)-F_X(a)$. Dấu bằng ở hai đầu khoảng cần được giữ đúng: với phân phối rời rạc, thay $X>a$ bằng $X\ge a$ có thể thêm một khối xác suất dương.

::: example Ví dụ 10.6 (Một biến ba giá trị và xác suất vượt ngưỡng)
Giả sử mức xử lý một sản phẩm là $X\in\{0,1,2\}$, lần lượt ứng với không can thiệp, kiểm tra lại và sửa chữa; mô hình minh họa cho $p_X(0)=0{,}70$, $p_X(1)=0{,}20$, $p_X(2)=0{,}10$. Khi đó

$$
F_X(t)=
\begin{cases}
0,&t<0,\\
0{,}70,&0\le t<1,\\
0{,}90,&1\le t<2,\\
1,&t\ge2.
\end{cases}
$$

Do đó $\mathbb P(X\le1)=0{,}90$, còn $\mathbb P(X\ge1)=0{,}30$. Xác suất $\mathbb P(0<X\le2)=F_X(2)-F_X(0)=0{,}30$ khớp tổng hai khối $0{,}20+0{,}10$. Các mức $0,1,2$ trong ví dụ là những giá trị số được quy định cho tính toán; khoảng cách giữa chúng chỉ có ý nghĩa nếu cách mã hóa phản ánh đại lượng cần quan tâm.
:::

Trong học máy, PMF phù hợp với nhãn phân loại, còn CDF phù hợp với các phát biểu vượt ngưỡng của một đại lượng có thứ tự. Khi nhãn chỉ là các nhóm không có thứ tự, mã số của nhãn không tự tạo ra một đại lượng vật lý để lấy trung bình. Chúng ta sẽ quay lại vai trò của cách chọn hàm quan sát khi định nghĩa kỳ vọng ở Mục 4.

### 3.3. Mật độ và xác suất trên khoảng

Một giá trị cảm biến như độ dài hoặc điện áp thường được mô hình hóa liên tục. Mô hình không gán một khối xác suất dương cho từng số thực; nó mô tả xác suất trong các khoảng bằng diện tích dưới một đường mật độ.

::: definition Định nghĩa 10.15 (Phân phối có mật độ)
Biến ngẫu nhiên $X$ có **hàm mật độ xác suất** (probability density function, PDF) $f_X$ nếu $f_X$ không âm, tích phân trên $\mathbb R$ bằng $1$, và

$$
\mathbb P(X\in B)=\int_B f_X(x)\,dx
\tag{3.4}
$$

với mọi tập Borel $B$. Đặc biệt,

$$
F_X(t)=\int_{-\infty}^{t}f_X(x)\,dx,
\qquad
\mathbb P(a<X\le b)=\int_a^b f_X(x)\,dx.
\tag{3.5}
$$

Với một biến có mật độ, $\mathbb P(X=x)=0$ tại mọi điểm $x$. Nguồn: Murphy I, §2.2.2 (*Continuous random variables*) và §2.6.2 (*Probability density function*).
:::

Mật độ $f_X(x)$ có đơn vị nghịch đảo đơn vị đo của $X$, còn xác suất không có đơn vị. Vì vậy giá trị mật độ có thể lớn hơn $1$. Chẳng hạn, phân phối đều trên đoạn $[0;0{,}1]$ có mật độ bằng $10$ trên đoạn đó và bằng $0$ bên ngoài; diện tích toàn phần vẫn bằng $10\cdot0{,}1=1$. Tại nơi $f_X$ liên tục, xác suất trong khoảng ngắn $[x,x+\Delta]$ xấp xỉ $f_X(x)\Delta$ khi $\Delta>0$ nhỏ. Nếu thiết bị làm tròn số đo, xác suất ghi nhận một giá trị hiển thị là xác suất của cả khoảng làm tròn, nên có thể dương.

Không phải mọi phân phối đều rời rạc hoặc có mật độ. Một cảm biến có thể trả chính xác $0$ khi tắt và trả một giá trị có mật độ khi hoạt động; phân phối khi đó có cả khối tại $0$ lẫn phần liên tục. CDF vẫn được định nghĩa bởi (3.3). Trong các phép tính tiếp theo, ta nêu rõ đang dùng tổng cho mô hình rời rạc hay tích phân cho mô hình có mật độ.

### 3.4. Các họ phân phối cho nhãn và tín hiệu

::: definition Định nghĩa 10.16 (Bernoulli và phân phối phân loại)
Biến $Y\in\{0,1\}$ có phân phối **Bernoulli**, ký hiệu $Y\sim\operatorname{Bernoulli}(\theta)$, nếu

$$
\mathbb P(Y=1)=\theta,\qquad \mathbb P(Y=0)=1-\theta,
\qquad 0\le\theta\le1.
\tag{3.6}
$$

Với $0<\theta<1$, PMF có thể viết $p_Y(y)=\theta^y(1-\theta)^{1-y}$ cho $y\in\{0,1\}$. Hai trường hợp biên $\theta=0,1$ được hiểu trực tiếp theo (3.6).

Biến phân loại $Z\in\{1,\ldots,K\}$ có phân phối **phân loại** (categorical), ký hiệu $Z\sim\operatorname{Cat}(\boldsymbol\pi)$, nếu

$$
\mathbb P(Z=k)=\pi_k,\qquad
\pi_k\ge0,\qquad \sum_{k=1}^{K}\pi_k=1.
\tag{3.7}
$$

Bernoulli là trường hợp hai nhóm của phân phối phân loại, với một cách mã hóa bằng $0,1$. Nguồn: Murphy I, §2.4.1 (*Bernoulli distribution*) và §2.5.1 (*Categorical distribution*).
:::

Trong Ví dụ 10.4, $Y\sim\operatorname{Bernoulli}(0{,}044)$ khi chưa biết nhà cung cấp; khi biết $S=a$, phân phối có điều kiện là $\operatorname{Bernoulli}(0{,}02)$. Cùng một biến lỗi có các phân phối khác nhau dưới các thông tin khác nhau. Nếu sản phẩm có nhiều loại lỗi loại trừ lẫn nhau, ta có thể dùng phân phối phân loại cho nhãn lỗi, nhưng nếu một sản phẩm có thể đồng thời mang nhiều lỗi thì một nhãn categorical đơn lẻ không mô tả trực tiếp các nhãn cùng xuất hiện.

::: definition Định nghĩa 10.17 (Phân phối Gaussian)
Biến ngẫu nhiên thực $T$ có phân phối **Gaussian** một chiều, ký hiệu $T\sim\mathcal N(\mu,\sigma^2)$, với $\mu\in\mathbb R$ và $\sigma^2>0$, nếu có mật độ

$$
f_T(t)=\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\!\left(-\frac{(t-\mu)^2}{2\sigma^2}\right).
\tag{3.8}
$$

Với $\mu\in\mathbb R^d$ và ma trận đối xứng xác định dương $\Sigma\in\mathbb R^{d\times d}$, Gaussian nhiều chiều có mật độ

$$
f_{\boldsymbol T}(\boldsymbol t)
=\frac{\exp\!\left(-\frac12(\boldsymbol t-\mu)^\top\Sigma^{-1}(\boldsymbol t-\mu)\right)}
{(2\pi)^{d/2}(\det\Sigma)^{1/2}}.
\tag{3.9}
$$

Nguồn: Murphy I, §2.6.2 về mật độ một chiều và §3.2.1 về định nghĩa Gaussian nhiều chiều.
:::

Hệ số trước hàm mũ của (3.8) bảo đảm chuẩn hóa; kết quả tích phân Gaussian $\int_{\mathbb R}e^{-u^2/2}\,du=\sqrt{2\pi}$ được dùng ở đây như một kết quả giải tích. Mật độ đối xứng quanh $\mu$; tăng $\sigma$ làm giảm chiều cao đỉnh và trải diện tích ra khoảng rộng hơn. Các tham số $\mu,\sigma^2$ đúng là kỳ vọng và phương sai; đây là các tính chất của Gaussian được dùng cùng những định nghĩa mômen ở Mục 4. Với $\sigma^2=0$, biến trở thành một hằng số; công thức mật độ (3.8) không còn dùng được.

Chẳng hạn, một phép đo độ lệch kích thước có thể được giả thiết $T\mid Y=y\sim\mathcal N(\mu_y,\sigma_y^2)$ cho từng tình trạng sản phẩm. Giả thiết này cho xác suất quan sát trong một khoảng dung sai bằng (3.5); nó không khẳng định mọi tín hiệu thực đều tuân theo Gaussian. Độ lệch lớn, đuôi nặng hoặc nhiều chế độ hoạt động có thể làm mô hình sai lệch. Một mô hình tín hiệu liên tục như vậy mở rộng cảm biến nhị phân $A$ của Ví dụ 10.4; nó là lựa chọn mô hình mới, không phải hệ quả tự động của các xác suất đã cho.

Trong (3.9), các thành phần của vector có thể phụ thuộc nhau. Ma trận $\Sigma$ ghi mức phân tán và quan hệ tuyến tính giữa chúng; định nghĩa hiệp phương sai xuất hiện ở Mục 4. Điều kiện xác định dương bảo đảm $\Sigma^{-1}$ tồn tại và $\det\Sigma>0$. Gaussian suy biến với $\Sigma$ chỉ nửa xác định dương cần được mô tả trên một không gian con và không có mật độ đầy đủ dạng (3.9). Chứng minh hình học qua trị riêng, ellipse mật độ và khoảng cách Mahalanobis được dành cho Bài 11, khi chúng ta học cách ước lượng $\mu,\Sigma$ từ dữ liệu.

Định nghĩa 10.13 đưa mỗi đại lượng quan sát về một hàm trên không gian xác suất; các Định nghĩa 10.14–10.15 cho hai cách tính xác suất bằng tổng và tích phân. Bernoulli, categorical và Gaussian trong các Định nghĩa 10.16–10.17 cung cấp những lựa chọn mô hình có tham số cụ thể. Sau khi có phân phối, chúng ta có thể tính trung bình chi phí, mức phân tán và ảnh hưởng của phép biến đổi tín hiệu; đó là nội dung của Mục 4.

## 4. Kỳ vọng, phương sai và hàm của biến ngẫu nhiên

Phân phối của biến lỗi $Y$ cho biết xác suất của từng kết quả, nhưng một đơn vị vận hành còn cần dự kiến số sản phẩm lỗi và chi phí kiểm định trên nhiều sản phẩm. Chúng ta cần một phép lấy trung bình có tính đến xác suất, rồi một đại lượng đo mức phân tán quanh trung bình ấy. Các đại lượng này được xác định từ phân phối của Mục 3, không đòi hỏi phải quan sát trước một mẫu dữ liệu.

### 4.1. Kỳ vọng là trung bình có trọng số xác suất

Nếu $Y=1$ đánh dấu sản phẩm lỗi và $Y=0$ đánh dấu sản phẩm đạt, các giá trị $0$ và $1$ không xuất hiện với trọng số bằng nhau. Trong mô hình hai nhà cung cấp của Mục 2, xác suất lỗi là $0{,}044$. Trung bình theo mô hình vì vậy nằm gần $0$ hơn $1$. Đây là trường hợp đơn giản của kỳ vọng; cách tính cũng áp dụng cho điểm cảm biến, số lỗi hoặc chi phí có nhiều giá trị.

::: definition Định nghĩa 10.18 (Kỳ vọng và điều kiện khả tích)
Cho biến ngẫu nhiên thực $X$.

- Nếu $X$ rời rạc, có tập giá trị hữu hạn hoặc đếm được $\mathcal X$, có hàm khối xác suất $p_X$ thỏa $\sum_{x\in\mathcal X}|x|p_X(x)<\infty$, thì

$$
\mathbb E[X]=\sum_{x\in\mathcal X}x p_X(x).
\tag{4.1}
$$

- Nếu $X$ có mật độ $f_X$ và $\int_{\mathbb R}|x|f_X(x)\,dx<\infty$, thì

$$
\mathbb E[X]=\int_{\mathbb R}x f_X(x)\,dx.
\tag{4.2}
$$

Điều kiện tương ứng được viết gọn là $\mathbb E[|X|]<\infty$; khi đó $X$ được gọi là **khả tích**. Với biến không âm, có thể định nghĩa kỳ vọng bằng tổng hoặc tích phân không âm và cho phép giá trị $+\infty$; các phép tính với kỳ vọng hữu hạn dưới đây luôn yêu cầu tính khả tích.
:::

Kỳ vọng là một số được suy ra từ mô hình. Nó không nhất thiết là một giá trị mà $X$ có thể nhận: biến Bernoulli chỉ nhận $0$ và $1$, nhưng kỳ vọng của nó có thể là $0{,}044$. Trung bình mẫu $n^{-1}\sum_{i=1}^n x_i$ lại là một số tính từ dữ liệu đã quan sát. Quan hệ giữa trung bình mẫu và kỳ vọng cần thêm giả thiết về cách lấy mẫu; các kết quả tập trung ở Bài 05c xử lý một phần quan hệ đó.

### 4.2. Hàm của biến ngẫu nhiên và tính tuyến tính

Khi bộ phận kiểm định gán chi phí $g(x)$ cho kết quả cảm biến $x$, đại lượng cần tính là $\mathbb E[g(X)]$. Ta có thể tính trực tiếp trên phân phối của $X$ mà không cần lập trước phân phối của biến mới $g(X)$. Đồng thời, tổng chi phí của nhiều thành phần dẫn đến tính tuyến tính của kỳ vọng. Các quy tắc sau theo cách trình bày về mômen của Murphy I, §2.2.5; chứng minh được viết lại trên mô hình hữu hạn để thấy từng phép nhóm tổng.

::: proposition Mệnh đề 10.19 (Kỳ vọng của hàm và tính tuyến tính)
**Giả thiết.** $g$ là hàm đo được và $\mathbb E[|g(X)|]<\infty$. Khi xét một tổ hợp $aX+bZ+c$, giả sử $X,Z$ khả tích và $a,b,c$ là các hằng số thực.

**Kết luận.** Với $X$ rời rạc,

$$
\mathbb E[g(X)]=\sum_{x\in\mathcal X}g(x)p_X(x).
\tag{4.3}
$$

Với $X$ có mật độ,

$$
\mathbb E[g(X)]=\int_{\mathbb R}g(x)f_X(x)\,dx.
\tag{4.4}
$$

Ngoài ra,

$$
\mathbb E[aX+bZ+c]=a\mathbb E[X]+b\mathbb E[Z]+c.
\tag{4.5}
$$

**Điều kiện áp dụng.** Kiểm tra tính khả tích của các biến hoặc hàm được lấy kỳ vọng.

**Phạm vi.** Không cần giả thiết $X$ và $Z$ độc lập; quy tắc không mở rộng thành $\mathbb E[g(X)]=g(\mathbb E[X])$ cho một hàm phi tuyến bất kỳ.
:::

::: proof Chứng minh Mệnh đề 10.19 trong mô hình hữu hạn
**Bước 1 (nhóm theo giá trị của hàm).**
Gọi $\mathcal U$ là tập giá trị của $g(X)$. Theo định nghĩa kỳ vọng và quy tắc cộng xác suất trên các biến cố rời nhau,

$$
\begin{aligned}
\mathbb E[g(X)]
&=\sum_{u\in\mathcal U}u\,\mathbb P(g(X)=u)\\
&=\sum_{u\in\mathcal U}u\sum_{x:g(x)=u}p_X(x)\\
&=\sum_{x\in\mathcal X}g(x)p_X(x).
\end{aligned}
$$

Mỗi giá trị $x$ xuất hiện đúng một lần trong phép nhóm tổng.

**Bước 2 (tách tổ hợp tuyến tính).**
Nếu làm việc trực tiếp trên không gian mẫu hữu hạn $\Omega$, ta cũng có

$$
\begin{aligned}
\mathbb E[aX+bZ+c]
&=\sum_{\omega\in\Omega}
\bigl(aX(\omega)+bZ(\omega)+c\bigr)p(\omega)\\
&=a\mathbb E[X]+b\mathbb E[Z]+c\sum_{\omega\in\Omega}p(\omega)\\
&=a\mathbb E[X]+b\mathbb E[Z]+c.
\end{aligned}
$$

**Bước 3 (phạm vi mở rộng).**
Trong trường hợp đếm được, tính khả tích cho phép nhóm các tổng hội tụ tuyệt đối. Công thức tích phân (4.4) là quy tắc tương ứng cho phân phối có mật độ; tính tuyến tính suy ra từ tính tuyến tính của tích phân. $\square$
:::

Với biến chỉ báo $\mathbf 1_E$, ta được $\mathbb E[\mathbf 1_E]=\mathbb P(E)$ vì giá trị $1$ có trọng số $\mathbb P(E)$ và giá trị $0$ không đóng góp vào tổng. Do đó, kỳ vọng của một chi phí được gán theo các biến cố có thể tính bằng xác suất của chính các biến cố ấy.

::: example Ví dụ 10.7 (Chi phí kỳ vọng của một bộ cảnh báo)
Trong mô hình sản phẩm, đặt $Y=1$ khi có lỗi và $A=1$ khi cảm biến cảnh báo. Giả sử bỏ sót một sản phẩm lỗi gây chi phí $5$ đơn vị, còn cảnh báo trên một sản phẩm đạt gây chi phí $1$ đơn vị. Hai phản hồi đúng có chi phí $0$ trong phép tính minh họa này. Biến chi phí là

$$
L=5\mathbf 1_{\{Y=1,A=0\}}+
\mathbf 1_{\{Y=0,A=1\}}.
$$

Từ $\mathbb P(Y=1)=0{,}044$, độ nhạy $0{,}9$ và xác suất cảnh báo trên sản phẩm đạt $0{,}05$, ta có

$$
\begin{aligned}
\mathbb P(Y=1,A=0)&=0{,}044\cdot0{,}1=0{,}0044,\\
\mathbb P(Y=0,A=1)&=0{,}956\cdot0{,}05=0{,}0478.
\end{aligned}
$$

Áp dụng (4.5),

$$
\mathbb E[L]=5\cdot0{,}0044+0{,}0478=0{,}0698.
$$

Xác suất đưa ra phản hồi sai là $0{,}0044+0{,}0478=0{,}0522$. Chi phí kỳ vọng khác xác suất sai vì hai loại lỗi mang trọng số khác nhau. Phép tính không cần giả thiết hai chỉ báo độc lập; thực tế hai biến cố lỗi xung khắc.

Với $n$ sản phẩm có cùng phân phối như trên, tổng chi phí có kỳ vọng $n\cdot0{,}0698$, kể cả khi kết quả giữa các sản phẩm phụ thuộc. Muốn đánh giá xác suất tổng chi phí lệch xa kỳ vọng, cần thêm thông tin về sự phụ thuộc và mức phân tán.

**Kiểm tra lại.** $L$ nhận các giá trị $0,1,5$ với xác suất $0{,}9478$, $0{,}0478$, $0{,}0044$; tổng xác suất bằng $1$ và phép lấy trung bình trực tiếp cũng cho $0{,}0698$.
:::

Trong học máy, một hàm mất mát cũng gán một số cho mỗi kết quả dự đoán và nhãn thực. Ví dụ 10.7 cho thấy việc lấy kỳ vọng của mất mát đã là một bài toán xác suất trước khi ta chọn thuật toán tối ưu. Bài 12 sẽ sử dụng cấu trúc này để phân biệt mục tiêu trên phân phối dữ liệu với đại lượng tính được trên một mẫu huấn luyện.

### 4.3. Phương sai đo mức phân tán quanh kỳ vọng

Hai biến có cùng kỳ vọng có thể có phân phối khác nhau. Một chi phí luôn bằng $1$ và một chi phí bằng $0$ hoặc $2$ với xác suất bằng nhau đều có kỳ vọng $1$; biến thứ hai còn có dao động quanh giá trị ấy. Để đo dao động mà không làm các độ lệch dương và âm triệt tiêu nhau, ta lấy bình phương độ lệch trước khi lấy kỳ vọng. Định nghĩa và công thức tính dưới đây theo Murphy I, §2.2.5.

::: proposition Mệnh đề 10.20 (Phương sai và công thức tính)
**Giả thiết.** $\mathbb E[X^2]<\infty$. Đặt $\mu=\mathbb E[X]$.

**Định nghĩa và kết luận.** **Phương sai** (variance) của $X$ là

$$
\operatorname{Var}(X)=\mathbb E[(X-\mu)^2].
\tag{4.6}
$$

Khi đó

$$
\operatorname{Var}(X)=\mathbb E[X^2]-(\mathbb E[X])^2\ge0,
\qquad
\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X).
\tag{4.7}
$$

**Điều kiện áp dụng.** Mômen bậc hai phải hữu hạn để các hiệu và bình phương kỳ vọng trong (4.7) là các số thực.

**Phạm vi.** Phương sai đo dao động bình phương, có đơn vị bình phương của $X$. **Độ lệch chuẩn** $\sqrt{\operatorname{Var}(X)}$ có cùng đơn vị với $X$.
:::

::: proof Chứng minh Mệnh đề 10.20
**Bước 1 (khai triển bình phương).**
Từ $|x|\le 1+x^2$, giả thiết mômen bậc hai hữu hạn bảo đảm $X$ khả tích. Khai triển bình phương và áp dụng Mệnh đề 10.19,

$$
\begin{aligned}
\mathbb E[(X-\mu)^2]
&=\mathbb E[X^2]-2\mu\mathbb E[X]+\mu^2\\
&=\mathbb E[X^2]-\mu^2.
\end{aligned}
$$

**Bước 2 (không âm và biến đổi đơn vị).**
Tính không âm suy ra trực tiếp từ $(X-\mu)^2\ge0$. Vì $\mathbb E[aX+b]=a\mu+b$, độ lệch của $aX+b$ quanh kỳ vọng là $a(X-\mu)$; bình phương rồi lấy kỳ vọng được công thức thứ hai. $\square$
:::

Nếu $Y\sim\operatorname{Bernoulli}(q)$, thì $Y^2=Y$ trên mọi kết quả. Từ (4.1), $\mathbb E[Y]=q$; do đó

$$
\operatorname{Var}(Y)=q-q^2=q(1-q).
\tag{4.8}
$$

Trong mô hình sản phẩm, $q=0{,}044$ nên $\operatorname{Var}(Y)=0{,}042064$. Với một lô gồm $n$ sản phẩm có cùng xác suất lỗi, số lỗi $N=\sum_{i=1}^nY_i$ có kỳ vọng $nq$. Nếu các $Y_i$ độc lập thì phương sai bằng $nq(1-q)$; nếu chúng cùng chịu ảnh hưởng của một lô nguyên liệu, phép cộng phương sai này có thể sai.

::: example Ví dụ 10.8 (Tính kỳ vọng của hàm phi tuyến)
Giả sử một mức chi phí $X$ nhận ba giá trị $0,1,4$, với xác suất lần lượt $0{,}5$, $0{,}3$, $0{,}2$. Ta được

$$
\mathbb E[X]=0\cdot0{,}5+1\cdot0{,}3+4\cdot0{,}2=1{,}1,
$$

$$
\mathbb E[X^2]=0^2\cdot0{,}5+1^2\cdot0{,}3+4^2\cdot0{,}2=3{,}5.
$$

Vì vậy $\operatorname{Var}(X)=3{,}5-1{,}1^2=2{,}29$. Nếu thay $\mathbb E[X^2]$ bằng $(\mathbb E[X])^2=1{,}21$, phương sai sẽ bị tính thành $0$. Tính tuyến tính (4.5) cho phép đưa tổng và hằng số qua kỳ vọng; nó không cho phép đưa bình phương qua kỳ vọng.

**Kiểm tra lại.** Tính trực tiếp theo định nghĩa cho $0{,}5(0-1{,}1)^2+0{,}3(1-1{,}1)^2+0{,}2(4-1{,}1)^2=2{,}29$.
:::

Trong các cận tập trung của Bài 05c, kỳ vọng là tâm so sánh còn phương sai hoặc một thước đo đuôi khác quyết định mức dao động được kiểm soát. Biết trung bình số lỗi vẫn chưa đủ để kết luận một lô cụ thể gần trung bình đến mức nào. Ngay cả phân phối biên của từng sản phẩm cũng chưa mô tả việc các lỗi có cùng xuất hiện hay không; ta cần hiệp phương sai và, tổng quát hơn, phân phối đồng thời.

### 4.4. Hiệp phương sai, độc lập và phụ thuộc phi tuyến

Hiệp phương sai mở rộng phép đo dao động từ một biến sang hai biến, theo Murphy I, §3.1.1. Phân biệt giữa không tương quan và độc lập ở Ví dụ 10.9 tương ứng với Murphy I, §3.1.3; số liệu của ví dụ được tự xây dựng để tính bằng tay.

::: definition Định nghĩa 10.21 (Hiệp phương sai)
Cho các biến thực $X,Z$ có mômen bậc hai hữu hạn. **Hiệp phương sai** (covariance) của chúng là

$$
\operatorname{Cov}(X,Z)
=\mathbb E[(X-\mathbb E[X])(Z-\mathbb E[Z])]
=\mathbb E[XZ]-\mathbb E[X]\mathbb E[Z].
\tag{4.9}
$$

Tích $XZ$ khả tích vì $2|XZ|\le X^2+Z^2$. Hai biến được gọi là **không tương quan** khi $\operatorname{Cov}(X,Z)=0$. Nếu cả hai phương sai đều dương, hệ số tương quan là

$$
\rho_{XZ}=\frac{\operatorname{Cov}(X,Z)}
{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Z)}}.
$$
:::

Đẳng thức thứ hai trong (4.9) thu được bằng khai triển và tính tuyến tính, giống chứng minh Mệnh đề 10.20. Với $Z=X$, ta có $\operatorname{Cov}(X,X)=\operatorname{Var}(X)$. Với hai biến bất kỳ thỏa điều kiện trên, khai triển bình phương của tổng còn cho

$$
\operatorname{Var}(X+Z)=\operatorname{Var}(X)+\operatorname{Var}(Z)
+2\operatorname{Cov}(X,Z).
\tag{4.10}
$$

Công thức này giải thích phần điều kiện còn thiếu khi cộng phương sai của các chỉ báo lỗi: phải kiểm soát các số hạng hiệp phương sai. Giả thiết độc lập là một điều kiện đủ để các số hạng ấy bằng $0$.

::: proposition Mệnh đề 10.22 (Độc lập kéo theo không tương quan)
**Giả thiết.** $X,Z$ độc lập và có mômen bậc hai hữu hạn.

**Kết luận.** $\mathbb E[XZ]=\mathbb E[X]\mathbb E[Z]$, do đó $\operatorname{Cov}(X,Z)=0$.

**Điều kiện áp dụng.** Cần độc lập của hai biến; chỉ biết phân phối biên hoặc tương quan bằng $0$ chưa đủ để tách kỳ vọng của tích.

**Phạm vi.** Chiều ngược lại không đúng nói chung, như Ví dụ 10.9.
:::

::: proof Chứng minh Mệnh đề 10.22 cho các phân phối rời rạc
**Bước 1 (dùng giả thiết độc lập).**
Độc lập cho $\mathbb P(X=x,Z=z)=p_X(x)p_Z(z)$. Bởi vậy,

$$
\begin{aligned}
\mathbb E[XZ]
&=\sum_x\sum_z xz\,p_X(x)p_Z(z)\\
&=\left(\sum_x xp_X(x)\right)
\left(\sum_z zp_Z(z)\right)
=\mathbb E[X]\mathbb E[Z].
\end{aligned}
$$

**Bước 2 (kiểm tra phép tách).**
Các tổng là hữu hạn hoặc hội tụ tuyệt đối theo giả thiết. Với các biến có mật độ đồng thời, độc lập cho mật độ tích $f_X(x)f_Z(z)$, và phép tách tích phân cho cùng kết quả. Đối với biến ngẫu nhiên tổng quát, đây là tính chất nhân của kỳ vọng dưới phân phối tích. Thế vào (4.9) được kết luận. $\square$
:::

::: example Ví dụ 10.9 (Hiệp phương sai bằng không nhưng phụ thuộc)
Cho $X$ nhận các giá trị $-1,0,1$ với xác suất $1/3$ mỗi giá trị và đặt $Z=X^2$. Khi đó

$$
\mathbb E[X]=0,\quad
\mathbb E[Z]=\frac23,\quad
\mathbb E[XZ]=\mathbb E[X^3]=0,
$$

nên $\operatorname{Cov}(X,Z)=0$. Tuy nhiên,

$$
\mathbb P(Z=0\mid X=0)=1,
\qquad
\mathbb P(Z=0)=\frac13.
$$

Quan sát $X=0$ xác định hoàn toàn $Z=0$; hai biến phụ thuộc. Cũng có thể kiểm tra trực tiếp

$$
\mathbb P(X=0,Z=0)=\frac13
\ne\frac13\cdot\frac13
=\mathbb P(X=0)\mathbb P(Z=0).
$$

Trong phân tích đặc trưng, hiệp phương sai bằng $0$ không đủ để kết luận một đặc trưng không chứa thông tin về đặc trưng kia. Ở đây quan hệ bình phương vẫn xác định $Z$ từ $X$, dù quan hệ tuyến tính được đo bằng hiệp phương sai triệt tiêu.
:::

### 4.5. Kỳ vọng có điều kiện và kỳ vọng toàn phần

Tỉ lệ lỗi của nhà cung cấp $a$ là $0{,}02$, còn của $b$ là $0{,}08$. Khi đã biết nhà cung cấp, dự kiến số lỗi phải dùng đúng tỉ lệ của nhóm ấy. Khi chưa biết nhà cung cấp, ta lấy trung bình các dự kiến theo xác suất của từng nhóm. Đây là phép lấy trung bình qua hai mức thông tin, dẫn đến quy tắc kỳ vọng toàn phần trong Murphy I, §2.2.5.

::: definition Định nghĩa 10.23 (Kỳ vọng có điều kiện theo một biến rời rạc)
Cho $X$ khả tích và $S$ là biến rời rạc. Với $s$ thỏa $\mathbb P(S=s)>0$, kỳ vọng của $X$ khi biết $S=s$ là

$$
\mathbb E[X\mid S=s]
=\sum_x x\,\mathbb P(X=x\mid S=s)
\tag{4.11}
$$

nếu $X$ rời rạc, hoặc tích phân $\int x f_{X\mid S}(x\mid s)\,dx$ nếu phân phối có điều kiện có mật độ.

Đặt $m(s)=\mathbb E[X\mid S=s]$. Biến ngẫu nhiên $m(S)$ được ký hiệu $\mathbb E[X\mid S]$. Giá trị của $m$ tại các $s$ có xác suất $0$ có thể chọn tùy ý mà không ảnh hưởng đến phân phối của $m(S)$.
:::

Ký hiệu $\mathbb E[X\mid S=s]$ chỉ một số khi $s$ đã cố định; $\mathbb E[X\mid S]$ là một biến ngẫu nhiên vì giá trị của nó phụ thuộc vào $S$. Với biến chỉ báo $Y$, công thức (4.11) cho $\mathbb E[Y\mid S=s]=\mathbb P(Y=1\mid S=s)$.

::: theorem Định lý 10.24 (Kỳ vọng toàn phần)
**Giả thiết.** $X$ khả tích và $S$ rời rạc, có tập giá trị hữu hạn hoặc đếm được.

**Kết luận.**

$$
\mathbb E[X]
=\sum_{s:\mathbb P(S=s)>0}\mathbb E[X\mid S=s]\mathbb P(S=s)
=\mathbb E\bigl[\mathbb E[X\mid S]\bigr].
\tag{4.12}
$$

**Điều kiện áp dụng.** Chỉ dùng các giá trị $s$ có xác suất dương; tính khả tích cho phép đổi thứ tự tổng và kỳ vọng.

**Phạm vi.** Đây là dạng của quy tắc kỳ vọng lặp với biến điều kiện rời rạc. Điều kiện theo một biến liên tục cần lý thuyết tổng quát hơn; không dùng phép chia cho xác suất một điểm bằng $0$.
:::

::: proof Chứng minh Định lý 10.24 cho $X$ rời rạc
**Bước 1 (phân hoạch theo thông tin điều kiện).**
Phân hoạch theo các biến cố $\{S=s\}$ và áp dụng xác suất toàn phần,

$$
\begin{aligned}
\mathbb E[X]
&=\sum_x x\sum_s\mathbb P(X=x\mid S=s)\mathbb P(S=s)\\
&=\sum_s\mathbb P(S=s)
\sum_x x\mathbb P(X=x\mid S=s)\\
&=\sum_s\mathbb E[X\mid S=s]\mathbb P(S=s).
\end{aligned}
$$

**Bước 2 (kiểm tra điều kiện và nhận dạng kỳ vọng ngoài).**
Các giá trị $s$ có xác suất $0$ được bỏ khỏi tổng. Tính khả tích cho phép đổi thứ tự các tổng; với một không gian hữu hạn, đây chỉ là sắp xếp lại hữu hạn số hạng. Kỳ vọng của biến $m(S)$ theo Định nghĩa 10.23 bằng đúng tổng ở dòng cuối. Trường hợp các phân phối có điều kiện có mật độ dùng cùng phép tính với tích phân. $\square$
:::

Áp dụng cho $X=Y$, ta tính lại tỉ lệ lỗi chung bằng

$$
\mathbb E[Y]=0{,}6\cdot0{,}02+0{,}4\cdot0{,}08=0{,}044.
$$

Công thức xác suất toàn phần của Mục 2 là trường hợp riêng của (4.12) khi $X$ là biến chỉ báo. Trong một hệ thống AI, điều kiện $S$ có thể biểu diễn nguồn dữ liệu hoặc nhóm môi trường; trọng số nhóm thay đổi sẽ làm thay đổi trung bình chung dù các trung bình trong nhóm giữ nguyên.

Một mở rộng cho người đọc tự học là phân rã phương sai khi $X$ có mômen bậc hai hữu hạn:

$$
\operatorname{Var}(X)
=\mathbb E[\operatorname{Var}(X\mid S)]
+\operatorname{Var}(\mathbb E[X\mid S]).
\tag{4.13}
$$

Để suy ra, đặt $m(S)=\mathbb E[X\mid S]$, viết $X-\mathbb E[X]=(X-m(S))+(m(S)-\mathbb E[X])$ rồi khai triển bình phương. Với mỗi $s$ có xác suất dương, $\mathbb E[X-m(s)\mid S=s]=0$. Kỳ vọng của tích chéo vì vậy là tổng các số $2(m(s)-\mathbb E[X])\mathbb E[X-m(s)\mid S=s]\mathbb P(S=s)$, tất cả đều bằng $0$. Hai số hạng bình phương còn lại lần lượt cho hai vế phải của (4.13). Với $Y$ trong ví dụ, dao động trong nhóm là $0{,}6(0{,}02)(0{,}98)+0{,}4(0{,}08)(0{,}92)=0{,}0412$, dao động giữa các trung bình nhóm là $0{,}000864$; tổng bằng $0{,}042064$, khớp (4.8).

Chúng ta đã đi từ phân phối đến kỳ vọng của một hàm bằng Mệnh đề 10.19, rồi dùng Mệnh đề 10.20 để đo dao động và Mệnh đề 10.22 để xác định vai trò của độc lập. Định lý 10.24 cho phép tính trung bình khi dữ liệu gồm nhiều nhóm chưa quan sát. Để thực hiện cả phép lấy trung bình và cập nhật sau quan sát trên một mô hình có nhiều biến, ta cần mô tả phân phối của các biến cùng nhau.

## 5. Phân phối đồng thời, lấy biên và suy luận

Một cảnh báo $A=1$ chưa cho biết nhà cung cấp $S$ hoặc tình trạng lỗi $Y$. Mỗi biến riêng lẻ có một phân phối, nhưng ba phân phối riêng không xác định được cách chúng phụ thuộc nhau. Chúng ta cần một mô hình cho cả bộ $(S,Y,A)$, sau đó loại các biến chưa biết bằng phép lấy tổng. Phép tính ấy kết hợp xác suất có điều kiện của Mục 2 với biến ngẫu nhiên của Mục 3 và kỳ vọng toàn phần của Mục 4.

### 5.1. Từ phân phối đồng thời đến các phân phối biên

::: definition Định nghĩa 10.25 (Phân phối đồng thời và phân phối biên)
Với hai biến rời rạc $X,Z$, **hàm khối xác suất đồng thời** là

$$
p_{X,Z}(x,z)=\mathbb P(X=x,Z=z),
\quad p_{X,Z}(x,z)\ge0,
\quad\sum_x\sum_zp_{X,Z}(x,z)=1.
\tag{5.1}
$$

Các **hàm khối xác suất biên** thu được bằng cách lấy tổng theo biến còn lại:

$$
p_X(x)=\sum_zp_{X,Z}(x,z),
\qquad
p_Z(z)=\sum_xp_{X,Z}(x,z).
\tag{5.2}
$$

Nếu $(X,Z)$ có mật độ đồng thời $f_{X,Z}$ trên $\mathbb R^2$, thì với các tập đo được $B,D$,

$$
\mathbb P(X\in B,Z\in D)
=\int_B\int_D f_{X,Z}(x,z)\,dz\,dx.
$$

Các mật độ biên được cho bởi

$$
f_X(x)=\int_{\mathbb R}f_{X,Z}(x,z)\,dz,
\qquad
f_Z(z)=\int_{\mathbb R}f_{X,Z}(x,z)\,dx.
\tag{5.3}
$$
:::

Công thức (5.2) suy ra vì các biến cố $\{X=x,Z=z\}$, khi $z$ thay đổi, tạo thành một phân hoạch của $\{X=x\}$. Trong bảng hai chiều, lấy biên nghĩa là cộng theo hàng hoặc cột. Với mật độ, phép tích phân thay phép cộng; miền tích phân phải phủ mọi giá trị khả dĩ của biến bị loại. Có thể tích phân trên toàn trục thực nếu mật độ đã được đặt bằng $0$ ngoài miền hỗ trợ.

Phân phối đồng thời chứa nhiều thông tin hơn các phân phối biên. Chẳng hạn, hai biến Bernoulli có xác suất thành công $1/2$ có thể độc lập; cũng có thể bằng nhau trên mọi kết quả. Hai mô hình đó có cùng phân phối biên nhưng xác suất cùng bằng $1$ lần lượt là $1/4$ và $1/2$. Vì vậy, ghép hai phân phối biên bằng phép nhân là một giả thiết độc lập cần được nêu, không phải một cách điền bảng mặc định. Các quy tắc lấy biên và điều kiện theo nhiều biến được trình bày trong Murphy I, §2.2.3; Murphy I, §3.1 phát triển tiếp mô tả nhiều biến qua hiệp phương sai và tương quan.

### 5.2. Phân phối có điều kiện khi biến đã được quan sát

Lấy biên trả lời câu hỏi về $X$ khi chưa biết $Z$. Khi đã biết $Z=z$, ta giữ phần mô hình phù hợp với quan sát đó rồi chuẩn hóa. Trong trường hợp rời rạc, đây chính là định nghĩa xác suất có điều kiện ở Mục 2 áp dụng cho hai biến cố $\{X=x\}$ và $\{Z=z\}$.

::: proposition Mệnh đề 10.26 (Phân phối có điều kiện từ phân phối đồng thời)
**Giả thiết.** $X,Z$ có hàm khối xác suất đồng thời, hoặc có mật độ đồng thời. Chọn một giá trị $z$ có mẫu số dương và hữu hạn trong công thức tương ứng.

**Kết luận.** Với trường hợp rời rạc và $p_Z(z)>0$,

$$
p_{X\mid Z}(x\mid z)=\frac{p_{X,Z}(x,z)}{p_Z(z)},
\qquad \sum_xp_{X\mid Z}(x\mid z)=1.
\tag{5.4}
$$

Với trường hợp có mật độ và $0<f_Z(z)<\infty$, một phiên bản của mật độ có điều kiện là

$$
f_{X\mid Z}(x\mid z)=\frac{f_{X,Z}(x,z)}{f_Z(z)},
\qquad \int_{\mathbb R}f_{X\mid Z}(x\mid z)\,dx=1.
\tag{5.5}
$$

**Điều kiện áp dụng.** Công thức rời rạc cần $p_Z(z)>0$; công thức mật độ cần $0<f_Z(z)<\infty$.

**Phạm vi.** Công thức mật độ được hiểu với hầu hết giá trị $z$ theo phân phối của $Z$. Tại những điểm ngoài phạm vi ấy, mô hình mật độ không nhất thiết xác định duy nhất một phân phối có điều kiện.
:::

::: proof Chứng minh tính chuẩn hóa trong Mệnh đề 10.26
Với trường hợp rời rạc, cộng tử số của (5.4) theo $x$ cho $p_Z(z)$ theo (5.2); chia cho số dương $p_Z(z)$ được $1$. Với trường hợp có mật độ, tích phân tử số của (5.5) theo $x$ cho $f_Z(z)$ theo (5.3). Cả hai hàm đều không âm vì tử và mẫu không âm, mẫu dương. $\square$
:::

Khi $Z$ có mật độ, biến cố $\{Z=z\}$ có xác suất $0$. Do đó, (5.5) không phải phép chia $\mathbb P(X\in B,Z=z)/\mathbb P(Z=z)$. Nó xác định một mật độ theo giá trị quan sát của $Z$, phù hợp với phép phân rã mật độ đồng thời. Lý thuyết tổng quát về điều kiện trên biến liên tục nằm ngoài phạm vi nhập môn này; trong các mô hình có mật độ trơn như Gaussian, công thức tỉ số là công cụ tính toán thông dụng.

Trong học máy, đầu vào thường là một vector liên tục. Khi mô hình dùng $p(y\mid x)$ cho một nhãn rời rạc $y$ và đầu vào liên tục $x$, nó mô tả xác suất nhãn theo giá trị của đầu vào. Điều kiện đó không yêu cầu một ảnh hoặc một vector cảm biến chính xác phải có xác suất dương trong phân phối dữ liệu.

### 5.3. Lấy biên trên biến chưa quan sát trong mô hình sản phẩm

Chúng ta trở lại mô hình hai nhà cung cấp, với toàn bộ tham số được cho trước:

$$
\begin{aligned}
&\mathbb P(S=a)=0{,}6,\qquad \mathbb P(S=b)=0{,}4,\\
&\mathbb P(Y=1\mid S=a)=0{,}02,\qquad
\mathbb P(Y=1\mid S=b)=0{,}08,\\
&\mathbb P(A=1\mid Y=1)=0{,}9,\qquad
\mathbb P(A=1\mid Y=0)=0{,}05.
\end{aligned}
\tag{5.6}
$$

Ta còn giả thiết $A$ và $S$ độc lập có điều kiện khi biết $Y$: đối với mỗi tình trạng lỗi đã cố định, cảm biến có cùng xác suất cảnh báo ở hai nhà cung cấp. Các tham số cảnh báo trong (5.6) chỉ đủ xác định phân phối ba biến sau khi bổ sung giả thiết này. Trong một dây chuyền thực, kích thước hoặc bề mặt sản phẩm có thể làm xác suất cảnh báo khác nhau giữa các nhà cung cấp ngay cả khi cùng tình trạng lỗi; khi đó phải dùng $p_{A\mid Y,S}$ thay cho $p_{A\mid Y}$.

::: proposition Mệnh đề 10.27 (Phân tích nhân tử và loại biến chưa quan sát)
**Giả thiết.** $S,Y,A$ là các biến rời rạc và $A\perp S\mid Y$.

**Kết luận.** Trên các giá trị có điều kiện xác định,

$$
p_{S,Y,A}(s,y,a')
=p_S(s)p_{Y\mid S}(y\mid s)p_{A\mid Y}(a'\mid y).
\tag{5.7}
$$

Nếu chỉ quan sát $A=a'$ với $p_A(a')>0$, thì

$$
p_{Y\mid A}(y\mid a')
=\frac{\sum_s p_S(s)p_{Y\mid S}(y\mid s)p_{A\mid Y}(a'\mid y)}
{\sum_{y'}\sum_s p_S(s)p_{Y\mid S}(y'\mid s)p_{A\mid Y}(a'\mid y')}.
\tag{5.8}
$$

**Điều kiện áp dụng.** Các phân phối có điều kiện phải được xác định trên miền có xác suất dương và $p_A(a')>0$ để tính hậu nghiệm.

**Phạm vi.** Độc lập có điều kiện là giả thiết mô hình; nếu nó sai thì (5.7) phải giữ số hạng $p_{A\mid S,Y}$. Chữ $a'$ chỉ một giá trị của biến cảnh báo $A$, để phân biệt với tên nhà cung cấp $a$.
:::

::: proof Chứng minh Mệnh đề 10.27
**Bước 1 (phân tích nhân tử).**
Quy tắc nhân cho

$$
p_{S,Y,A}(s,y,a')
=p_S(s)p_{Y\mid S}(y\mid s)p_{A\mid S,Y}(a'\mid s,y).
$$

Giả thiết độc lập có điều kiện cho phép thay số hạng cuối bằng $p_{A\mid Y}(a'\mid y)$, được (5.7).

**Bước 2 (lấy biên rồi chuẩn hóa).**
Cộng theo $s$ loại biến nhà cung cấp và cho $p_{Y,A}(y,a')$. Cộng thêm theo $y$ cho $p_A(a')$. Cuối cùng, chia phân phối đồng thời của $Y,A$ cho $p_A(a')$ theo (5.4) thu được (5.8). $\square$
:::

Công thức (5.8) thực hiện hai thao tác khác nhau: cộng theo $s$ vì nhà cung cấp chưa được quan sát, rồi chuẩn hóa theo cảnh báo đã quan sát. Nếu thay phép cộng bằng chọn một nhà cung cấp có xác suất lớn nhất, ta đã dùng một phép xấp xỉ khác và có thể thu được hậu nghiệm khác. Cũng không được thay tỉ số của các tổng bằng tổng các tỉ số khi các trọng số chưa được điều chỉnh theo quan sát.

::: example Ví dụ 10.10 (Suy luận từ bảng phân phối đồng thời)
**Dữ kiện.** $S$ là nhà cung cấp, $Y=1$ biểu diễn sản phẩm lỗi và $A=1$ biểu diễn có cảnh báo. Nhà cung cấp $a,b$ có xác suất được chọn $0{,}6$ và $0{,}4$, tỉ lệ lỗi tương ứng $0{,}02$ và $0{,}08$. Cảm biến cảnh báo với xác suất $0{,}9$ trên sản phẩm lỗi và $0{,}05$ trên sản phẩm đạt. Giả sử $A\perp S\mid Y$. Các số liệu là giả định sư phạm, không phải kết quả của một hệ thống kiểm định thực tế.

**Lập bảng.** Từ quy tắc nhân (5.7), ta tính đủ tám kết quả của ba biến.

| Nhà cung cấp $S$ | Tình trạng $Y$ | $p(S,Y,A=0)$ | $p(S,Y,A=1)$ | Tổng theo $A$ |
|---|---:|---:|---:|---:|
| $a$ | $0$ | $0{,}5586$ | $0{,}0294$ | $0{,}5880$ |
| $a$ | $1$ | $0{,}0012$ | $0{,}0108$ | $0{,}0120$ |
| $b$ | $0$ | $0{,}3496$ | $0{,}0184$ | $0{,}3680$ |
| $b$ | $1$ | $0{,}0032$ | $0{,}0288$ | $0{,}0320$ |
| Tổng | | $0{,}9126$ | $0{,}0874$ | $1{,}0000$ |

Chẳng hạn, ô $S=b,Y=1,A=1$ bằng $0{,}4\cdot0{,}08\cdot0{,}9=0{,}0288$. Cộng hai hàng của mỗi nhà cung cấp cho $0{,}6$ và $0{,}4$; cộng hai hàng $Y=1$ cho $0{,}044$. Đây là các kiểm tra chuẩn hóa và lấy biên.

Khi chỉ biết có cảnh báo, xác suất sản phẩm lỗi là

$$
\mathbb P(Y=1\mid A=1)
=\frac{0{,}0108+0{,}0288}{0{,}0874}
=\frac{198}{437}\approx0{,}4531.
$$

Đồng thời, cảnh báo làm thay đổi phân phối nhà cung cấp:

$$
\mathbb P(S=b\mid A=1)
=\frac{0{,}0184+0{,}0288}{0{,}0874}
=\frac{236}{437}\approx0{,}5400.
$$

Trước quan sát, xác suất nhà cung cấp $b$ là $0{,}4$. Sau quan sát, nó tăng vì nhà cung cấp $b$ có tỉ lệ lỗi cao hơn, từ đó làm cảnh báo có khả năng xuất hiện cao hơn dưới mô hình đã cho.

Nếu biết thêm nhà cung cấp, ta phải điều kiện theo cả hai thông tin:

$$
\mathbb P(Y=1\mid A=1,S=a)
=\frac{0{,}0108}{0{,}0294+0{,}0108}
=\frac{18}{67}\approx0{,}2687,
$$

$$
\mathbb P(Y=1\mid A=1,S=b)
=\frac{0{,}0288}{0{,}0184+0{,}0288}
=\frac{36}{59}\approx0{,}6102.
$$

Hậu nghiệm khi chưa biết nhà cung cấp có thể được tính lại bằng

$$
\begin{aligned}
\mathbb P(Y=1\mid A=1)
={}&\mathbb P(Y=1\mid A=1,S=a)\mathbb P(S=a\mid A=1)\\
&+\mathbb P(Y=1\mid A=1,S=b)\mathbb P(S=b\mid A=1).
\end{aligned}
$$

Các trọng số đúng là $201/437$ và $236/437$, không phải tiên nghiệm $0{,}6$ và $0{,}4$.

**Kiểm tra lại.** Thay các phân số trên vào cho $198/437$, khớp phép lấy tổng trực tiếp từ bảng. Mọi ô không âm và tổng tám ô bằng $1$, nên bảng là một phân phối đồng thời hợp lệ.
:::

Trong mô hình này, nhà cung cấp chưa biết được loại bằng phép lấy tổng; điều đó không có nghĩa ta giả định nó không ảnh hưởng đến xác suất lỗi. Ngược lại, tổng trong (5.8) giữ đóng góp của cả hai khả năng với đúng trọng số. Trong các mô hình có biến ẩn liên tục, phép tổng được thay bằng tích phân. Khi số biến hoặc số giá trị lớn, phép lấy biên có thể khó tính dù định nghĩa vẫn đơn giản; các phương pháp suy luận xấp xỉ sẽ được đặt ra ở các bài sau của kế hoạch.

### 5.4. Suy luận theo mô hình và giới hạn của kết luận

Kết quả $0{,}4531$ là xác suất lỗi theo các tỉ lệ và giả thiết đã chọn. Nó cho phép so sánh thông tin trước và sau cảnh báo, nhưng chưa xác định hành động kiểm định tối ưu. Quyết định kiểm tra lại, loại bỏ hay chấp nhận sản phẩm còn phụ thuộc vào chi phí của từng hành động, như các trọng số minh họa ở Ví dụ 10.7. Nó cũng chưa chứng minh cảm biến hoặc nhà cung cấp gây ra một thay đổi theo nghĩa nhân quả: các công thức đã dùng mô tả phân phối và điều kiện quan sát.

Các phân phối đầu vào của bài đều đã biết. Trong thực tế, tỉ lệ lỗi và xác suất cảnh báo phải được ước lượng, và các ước lượng ấy có sai số. Bài 11 sẽ bắt đầu từ khoảng trống này: giữ cấu trúc mô hình xác suất nhưng coi các tham số là chưa biết, rồi dùng dữ liệu để xây dựng bài toán ước lượng. Chúng ta chưa cần chọn thuật toán học để xác định phép suy luận khi các tham số đã có.

Định nghĩa 10.25 xác định cách lấy biên, Mệnh đề 10.26 xác định cách chuẩn hóa sau quan sát, còn Mệnh đề 10.27 kết hợp chúng với một phân tích nhân tử có giả thiết rõ ràng. Bayes cập nhật xác suất bằng thông tin quan sát; lấy biên giữ lại mọi khả năng của biến chưa quan sát bằng tổng hoặc tích phân. Hai phép toán ấy trả lời được câu hỏi về tình trạng lỗi khi cảm biến chỉ cung cấp thông tin không đầy đủ.

## Tóm tắt chương và liên hệ với Bài 11

Chúng ta bắt đầu từ những kết quả có thể xuất hiện khi một hệ thống nhận đầu vào chưa biết trước. Không gian xác suất gán trọng số nhất quán cho các biến cố, còn xác suất có điều kiện chuẩn hóa lại các trọng số sau quan sát. Quy tắc nhân và công thức toàn phần dẫn đến Bayes, nhờ đó cảnh báo của cảm biến cập nhật xác suất sản phẩm lỗi từ $0{,}044$ lên $198/437$. Biến ngẫu nhiên mô tả các đại lượng quan sát; kỳ vọng và phương sai tóm tắt trung bình và mức phân tán nhưng không xác định toàn bộ quan hệ phụ thuộc. Phân phối đồng thời giữ các quan hệ ấy, và phép lấy biên loại biến chưa quan sát bằng tổng hoặc tích phân. Trong mô hình sản phẩm, kết hợp lấy biên với Bayes cho hậu nghiệm khi thiếu thông tin nhà cung cấp. Giới hạn còn lại là các xác suất đầu vào đều đã biết; Bài 11 trong kế hoạch sẽ dùng dữ liệu để ước lượng những tham số này.

Các kết quả có thể tra lại theo năm nhóm:

- **Mô hình xác suất:** Định nghĩa 10.1–10.3; mô hình hữu hạn ở Mệnh đề 10.4; phần bù, hợp và cận hợp ở Mệnh đề 10.5, Hệ quả 10.6. Nhận xét 10.7 phân biệt tính hợp lệ với độ phù hợp của mô hình.
- **Cập nhật thông tin:** Định nghĩa 10.8; quy tắc nhân ở Mệnh đề 10.9; toàn phần và Bayes ở Định lý 10.10; độc lập và độc lập có điều kiện ở Định nghĩa 10.11–10.12.
- **Phân phối:** Định nghĩa 10.13–10.15 cho biến ngẫu nhiên, khối xác suất, hàm phân phối tích lũy và mật độ; Định nghĩa 10.16–10.17 cho các họ phân phối cơ bản.
- **Mômen:** Định nghĩa 10.18 và Mệnh đề 10.19 cho kỳ vọng; Mệnh đề 10.20 cho phương sai; Định nghĩa 10.21 và Mệnh đề 10.22 cho hiệp phương sai; Định nghĩa 10.23 và Định lý 10.24 cho kỳ vọng có điều kiện và toàn phần.
- **Suy luận nhiều biến:** Định nghĩa 10.25 cho phân phối đồng thời và lấy biên; Mệnh đề 10.26 cho phân phối có điều kiện; Mệnh đề 10.27 cho phân tích nhân tử và suy luận khi biến chưa được quan sát.

Khi dùng Bayes, mẫu số phải dương; khi nhân các xác suất không điều kiện, phải có giả thiết độc lập phù hợp. Khi tính xác suất của một biến có mật độ, phải lấy tích phân trên miền giá trị thay vì đọc độ cao mật độ như một xác suất. Khi dùng công thức phương sai hoặc hiệp phương sai hữu hạn, phải kiểm tra các mômen bậc hai. Sau khi quan sát cảnh báo, trọng số nhà cung cấp là hậu nghiệm theo cảnh báo, không còn mặc nhiên là tỉ lệ nguồn hàng ban đầu.

Về mặt tính toán, suy luận trong Bài 10 là phép biến đổi một phân phối cho trước thành phân phối của đại lượng cần biết. Học tham số trong Bài 11 sẽ giữ lại cấu trúc ấy nhưng thay các xác suất cho trước bằng một họ mô hình phụ thuộc tham số. Chất lượng dự đoán trên dữ liệu mới, chi phí của quyết định và suy luận trên biến ẩn sẽ tiếp tục được phát triển trong các Bài 12–14 của kế hoạch, với các giả thiết bổ sung riêng.

## Bài tập trên lớp — 30 phút

Ba bài sau được thực hiện trong khoảng 10 phút mỗi bài. Bài tập 10.3 kiểm tra cách đọc điều kiện quan sát; Bài tập 10.4 phân biệt mật độ với xác suất; Bài tập 10.5 kiểm tra giả thiết độc lập sau khi quan sát thêm thông tin. Các lời giải được gập để người đọc có thể tự tính trước.

::: exercise Bài tập 10.3 (Nhận biết và tính toán; 10 phút)
Một camera giao thông quan sát biến cố $H$ là có người đi bộ và $C$ là phát cảnh báo. Giả sử bảng xác suất đồng thời là

| | $C$ | $C^c$ |
|---|---:|---:|
| $H$ | $0{,}18$ | $0{,}02$ |
| $H^c$ | $0{,}08$ | $0{,}72$ |

- (a) Tính $\mathbb P(C\mid H)$, $\mathbb P(C\mid H^c)$ và $\mathbb P(H\mid C)$.
- (b) Giải thích bằng lời sự khác nhau giữa $\mathbb P(H^c\cap C)$ và $\mathbb P(C\mid H^c)$.
- (c) Một người diễn giải “hệ thống phát hiện được $90\%$ khung hình có người” thành “$90\%$ cảnh báo tương ứng với khung hình có người”. Kiểm tra phát biểu này bằng bảng.
:::

::: hint
Mẫu số của mỗi xác suất có điều kiện là xác suất của biến cố đứng sau dấu điều kiện. Tổng hàng cho điều kiện về $H$; tổng cột cho điều kiện về $C$.
:::

::: solution Lời giải Bài tập 10.3
**Tính các mẫu số.**

Tổng các ô tương ứng cho $\mathbb P(H)=0{,}20$, $\mathbb P(H^c)=0{,}80$ và $\mathbb P(C)=0{,}26$. Các mẫu số đều dương.

**Tính xác suất có điều kiện.**

Từ định nghĩa, ta được

$$
\begin{aligned}
\mathbb P(C\mid H)&=\frac{0{,}18}{0{,}20}=0{,}90,\\
\mathbb P(C\mid H^c)&=\frac{0{,}08}{0{,}80}=0{,}10,\\
\mathbb P(H\mid C)&=\frac{0{,}18}{0{,}26}=\frac9{13}\approx0{,}6923.
\end{aligned}
$$

**Diễn giải và kiểm tra.**

Xác suất $0{,}08$ tính trên tất cả khung hình; xác suất $0{,}10$ tính trong nhóm khung hình không có người. Phát biểu ở câu (c) sai vì nó đảo điều kiện: xác suất có người trong nhóm cảnh báo bằng khoảng $69{,}23\%$. Kiểm tra phép chuẩn hóa bằng $\mathbb P(H^c\mid C)=0{,}08/0{,}26=4/13$, cộng với $9/13$ bằng $1$.
:::

::: exercise Bài tập 10.4 (Tính toán và kiểm tra giả thiết; 10 phút)
Thời gian xử lý $T$, tính bằng giây, có phân phối đều trên $[0,0{,}5]$. Mật độ bằng $f_T(t)=2$ trên khoảng này và bằng $0$ ngoài khoảng.

- (a) Kiểm tra mật độ được chuẩn hóa, dù giá trị của nó lớn hơn $1$.
- (b) Tính $\mathbb P(T=0{,}2)$ và $\mathbb P(0{,}1\le T\le0{,}3)$.
- (c) Viết hàm phân phối tích lũy $F_T(t)$ trên toàn bộ trục số. Giải thích ý nghĩa của đơn vị đo của mật độ.
:::

::: hint
Xác suất trên một khoảng là diện tích dưới đồ thị mật độ. Độ dài khoảng ở câu (b) bằng $0{,}2$ giây.
:::

::: solution Lời giải Bài tập 10.4
**Chuẩn hóa và tính xác suất.**

Mật độ không âm và $\int_0^{0{,}5}2\,dt=1$. Một điểm có độ dài bằng $0$, nên $\mathbb P(T=0{,}2)=0$. Xác suất trên khoảng đã cho là

$$
\mathbb P(0{,}1\le T\le0{,}3)=\int_{0{,}1}^{0{,}3}2\,dt=0{,}4.
$$

**Hàm phân phối tích lũy.**

Tích phân từ phía trái đến $t$ cho

$$
F_T(t)=\begin{cases}
0,&t<0,\\
2t,&0\le t\le0{,}5,\\
1,&t>0{,}5.
\end{cases}
$$

Mật độ có đơn vị nghịch đảo giây; tích phân của nó theo thời gian là xác suất không có đơn vị. Giá trị $f_T(0{,}2)=2$ không phải xác suất tại điểm đó. Kiểm tra lại: $F_T(0{,}3)-F_T(0{,}1)=0{,}6-0{,}2=0{,}4$.
:::

::: exercise Bài tập 10.5 (Suy luận về độc lập; 10 phút)
Hai biến $U,V$ độc lập, mỗi biến nhận $0$ hoặc $1$ với xác suất $1/2$. Đặt $W=U\mathbin{\oplus}V$, trong đó $\oplus$ là phép hoặc loại trừ: $W=1$ khi $U\ne V$, và $W=0$ khi $U=V$.

- (a) Liệt kê bốn kết quả $(U,V,W)$ cùng xác suất.
- (b) Tính $\mathbb P(U=1\mid W=0)$, $\mathbb P(V=1\mid W=0)$ và $\mathbb P(U=1,V=1\mid W=0)$.
- (c) Kiểm tra liệu $U,V$ còn độc lập khi biết $W=0$. Nêu hệ quả đối với việc giả sử các đặc trưng độc lập sau khi đã quan sát một nhãn tổng hợp.
:::

::: hint
Điều kiện $W=0$ giữ lại đúng hai kết quả có $U=V$. Kiểm tra định nghĩa độc lập ngay trên phân phối đã điều kiện hóa.
:::

::: solution Lời giải Bài tập 10.5
**Liệt kê kết quả.**

Bốn kết quả $(0,0,0)$, $(0,1,1)$, $(1,0,1)$ và $(1,1,0)$ có cùng xác suất $1/4$, do hai biến ban đầu độc lập và công bằng. Vì vậy $\mathbb P(W=0)=1/2$.

**Điều kiện hóa và kiểm tra độc lập.**

Khi biết $W=0$, hai kết quả $(0,0,0)$ và $(1,1,0)$ có cùng xác suất có điều kiện $1/2$. Suy ra

$$
\mathbb P(U=1,V=1\mid W=0)=\frac12
\ne\frac12\cdot\frac12
=\mathbb P(U=1\mid W=0)\mathbb P(V=1\mid W=0).
$$

Do đó $U,V$ phụ thuộc khi biết $W=0$, dù chúng độc lập trước quan sát. Trong AI, độc lập của các đặc trưng trên toàn bộ dữ liệu không đủ để suy ra độc lập trong một nhóm được xác định bởi nhãn. Kiểm tra lại: hai xác suất có điều kiện trên nhóm $W=0$ cộng thành $1$.
:::

## Bài tập tự học — 180 phút

Bốn bài sau lần lượt có thời lượng dự kiến 40, 40, 50 và 50 phút. Các bài E10.1–E10.3 được điều chỉnh từ W1.2–W1.4 trong `sources/part2/homework.pdf`, có bổ sung yêu cầu giải thích và kiểm tra giả thiết. E10.4 là bài tự biên soạn. Chúng không được gán là bài tập nguyên bản của Murphy. Lời giải đầy đủ nằm trong phụ lục cuối chương.

::: exercise Bài tập 10.6 — E10.1 (Bayes trong kiểm định sản phẩm; 40 phút)
Nhà cung cấp $a$ cung cấp $80\%$ sản phẩm, với tỷ lệ lỗi $1\%$; nhà cung cấp $b$ cung cấp $20\%$, với tỷ lệ lỗi $6\%$. Một sản phẩm được chọn ngẫu nhiên theo các tỷ lệ này. Gọi $S$ là nhà cung cấp, $Y=1$ là sản phẩm lỗi và $A=1$ là cảm biến cảnh báo. Giả sử cảm biến có $\mathbb P(A=1\mid Y=1)=0{,}9$, $\mathbb P(A=1\mid Y=0)=0{,}05$ và $A$ độc lập với $S$ khi biết $Y$.

- (a) Tính $\mathbb P(Y=1)$ và $\mathbb P(S=b\mid Y=1)$. Giải thích vì sao đại lượng thứ hai khác $\mathbb P(Y=1\mid S=b)$.
- (b) Tính $\mathbb P(A=1)$ và $\mathbb P(Y=1\mid A=1)$.
- (c) Tính $\mathbb P(S=b\mid A=1)$ và $\mathbb P(S=b\mid Y=1,A=1)$.
- (d) Nếu bỏ giả thiết độc lập có điều kiện, những dữ kiện đã cho có đủ xác định đại lượng đầu tiên ở câu (c) hay không? Giải thích dựa trên những xác suất còn thiếu.
:::

::: hint
Ở câu (c), cộng theo hai trạng thái của $Y$ để tính $\mathbb P(S=b,A=1)$. Ở câu (d), phân biệt đặc tính cảm biến trên toàn bộ nhóm lỗi với đặc tính cảm biến trong từng nhóm nhà cung cấp.
:::

::: exercise Bài tập 10.7 — E10.2 (Phân phối rời rạc ba giá trị; 40 phút)
Biến $X$ nhận các giá trị $-1,0,2$ với xác suất lần lượt $1/4,1/2,1/4$.

- (a) Tính $\mathbb E[X]$, $\mathbb E[X^2]$ và $\operatorname{Var}(X)$.
- (b) Viết $F_X(t)$ trên toàn bộ trục số; tính $\mathbb P(X\ge0)$ và $F_X(0)$.
- (c) Đặt $Z=X^2$. Tìm phân phối của $Z$ và dùng phân phối đó kiểm tra lại $\mathbb E[X^2]$.
- (d) Giải thích vì sao kỳ vọng không nhất thiết là một giá trị mà biến ngẫu nhiên có thể nhận, và vì sao $F_X(0)$ khác $\mathbb P(X<0)$.
:::

::: hint
Tại một điểm có khối xác suất, hàm phân phối tích lũy bao gồm cả xác suất tại điểm đó. Khi tìm phân phối của một hàm, cộng xác suất của mọi giá trị đầu vào có cùng ảnh.
:::

::: exercise Bài tập 10.8 — E10.3 (Phân phối đồng thời và lấy biên; 50 phút)
Hai biến nhị phân $X,Y$ có bảng xác suất đồng thời

| | $Y=0$ | $Y=1$ |
|---|---:|---:|
| $X=0$ | $0{,}2$ | $0{,}3$ |
| $X=1$ | $0{,}1$ | $0{,}4$ |

- (a) Tìm hai phân phối biên và $\mathbb P(Y=1\mid X=1)$.
- (b) Tính $\mathbb E[X]$, $\mathbb E[Y]$, $\mathbb E[XY]$ và $\operatorname{Cov}(X,Y)$; kiểm tra độc lập bằng một ô của bảng.
- (c) Tính $\mathbb E[Y\mid X=0]$, $\mathbb E[Y\mid X=1]$; kiểm tra công thức kỳ vọng toàn phần.
- (d) Diễn giải $X$ là nhóm sản phẩm và $Y$ là trạng thái lỗi. So sánh xác suất lỗi khi biết nhóm với xác suất lỗi khi nhóm chưa được quan sát. Các phép tính có chứng minh quan hệ nhân quả giữa nhóm và lỗi không?
:::

::: hint
Với biến nhị phân, kỳ vọng bằng xác suất nhận $1$. Tích $XY$ chỉ khác $0$ trong ô $(1,1)$.
:::

::: exercise Bài tập 10.9 — E10.4 (Hiệp phương sai bằng không và phụ thuộc; 50 phút)
Biến $X$ phân phối đều trên $\{-2,-1,1,2\}$ và $Z=X^2$.

- (a) Tìm phân phối của $Z$; tính $\mathbb E[X]$, $\mathbb E[Z]$, $\mathbb E[XZ]$ và $\operatorname{Cov}(X,Z)$.
- (b) Chứng minh $X,Z$ phụ thuộc bằng cách so sánh $\mathbb P(Z=4\mid X=2)$ với $\mathbb P(Z=4)$.
- (c) Tính hai phương sai để kiểm tra rằng hiệp phương sai bằng không không xuất phát từ một biến hằng.
- (d) Một hệ thống chọn đặc trưng loại bỏ mọi cặp đặc trưng có hiệp phương sai bằng không khỏi bước kiểm tra phụ thuộc. Phản ví dụ trên chỉ ra giới hạn nào của cách làm đó?
:::

::: hint
Dùng tính đối xứng để tính các mômen bậc lẻ của $X$. Tính phụ thuộc ở câu (b) chỉ cần một điều kiện có xác suất dương làm thay đổi phân phối của $Z$.
:::

## Hướng dẫn đọc thêm và tài liệu tham khảo

Nguồn chính là Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press. Đọc theo các mục dưới đây trên [trang sách do tác giả cung cấp](https://probml.github.io/pml-book/book1.html); số mục được đối chiếu với [mục lục của nhà xuất bản](https://mitp-content-server.mit.edu/books/content/sectbyfn?collid=books_pres_0&fn=TOC.pdf&id=14260). Các chứng minh ở đây được trình bày lại bằng ký hiệu của học phần; các số hiệu 10.x là số hiệu nội bộ của ghi chú, không phải số hiệu của Murphy.

| Phần ghi chú | Mục đọc trong Murphy I | Mục đích đọc |
|---|---|---|
| Mục 1 | §2.1, §2.2.1 và §2.2.3 | Vai trò của xác suất, biến rời rạc và các quy tắc trên nhiều biến |
| Mục 2 | §2.2.3–§2.2.4, §2.3 | Quy tắc tổng/nhân, độc lập, độc lập có điều kiện, Bayes |
| Mục 3 | §2.2.1–§2.2.2, §2.4.1, §2.5.1, §2.6.1–§2.6.2 | Phân phối rời rạc/liên tục, Bernoulli, phân loại, Gaussian |
| Mục 3, phần mở rộng | §3.2.1 | Định nghĩa Gaussian nhiều chiều; phần hình học đọc cùng Bài 11 |
| Mục 4 | §2.2.5, §2.8.1, §3.1.1–§3.1.3 | Mômen, hàm của biến rời rạc, hiệp phương sai và giới hạn của không tương quan |
| Mục 5 | §2.2.3–§2.2.4, §2.3, §3.1 | Phân phối đồng thời, lấy biên, điều kiện hóa và suy luận |

Phần đọc chuẩn bị cho Bài 11 là Murphy I, §4.2 về ước lượng hợp lý cực đại. Ở thời điểm kết thúc Bài 10, chỉ cần phân biệt xác suất của dữ liệu dưới một mô hình cho trước với việc chọn tham số của mô hình; các phép đạo hàm để tìm ước lượng sẽ được trình bày ở bài sau.

Hai tài liệu khởi đầu do người dùng cung cấp có vai trò bổ sung:

- [lecture_notes.pdf](../sources/part2/lecture_notes.pdf), Week 1A–1E, trang in 3–8: cung cấp tuyến ví dụ ban đầu về biến cố, điều kiện, phân phối và mômen. Phân bổ thời gian của ghi chú này theo kế hoạch mới, không theo các tiêu đề thời lượng trong PDF cũ.
- [homework.pdf](../sources/part2/homework.pdf), Week 1, trang in 1: W1.1 là nền cho bài xúc xắc đã có; W1.2–W1.4 là nền cho E10.1–E10.3. E10.1 bổ sung cảm biến và giả thiết độc lập có điều kiện; E10.2 bổ sung biến đổi bình phương và yêu cầu đọc CDF; E10.3 bổ sung kỳ vọng toàn phần và diễn giải giới hạn nhân quả. E10.4 được tự biên soạn để kiểm tra phụ thuộc phi tuyến.

Ví dụ camera, mô hình hai nhà cung cấp với tham số $0{,}6$, $0{,}4$, $0{,}02$, $0{,}08$ và các chi phí minh họa là ví dụ sư phạm tự xây dựng hoặc mở rộng; không phải số liệu thực nghiệm hay bài tập được gán nguyên bản cho Murphy. Hình cây xác suất được tự vẽ từ đúng các tham số đó. Phản ví dụ biến bình phương dùng ý tưởng đối xứng quen thuộc để minh họa nội dung §3.1.3, với phép tính được viết đầy đủ trong Ví dụ 10.9.

## Phụ lục — Lời giải bài tập tự học

### Lời giải E10.1

::: solution Lời giải Bài tập 10.6
**Xác suất lỗi và nhà cung cấp khi biết lỗi.**

Quy tắc toàn phần và Bayes cho

$$
\begin{aligned}
\mathbb P(Y=1)&=0{,}8\cdot0{,}01+0{,}2\cdot0{,}06=0{,}02,\\
\mathbb P(S=b\mid Y=1)&=\frac{0{,}2\cdot0{,}06}{0{,}02}=0{,}6.
\end{aligned}
$$

Tỷ lệ $0{,}06$ tính trong sản phẩm của $b$, còn $0{,}6$ tính trong tất cả sản phẩm lỗi. Hai phép chọn nhóm có mẫu số khác nhau.

**Cập nhật từ cảnh báo.**

Lấy tổng theo $Y$ thu được

$$
\begin{aligned}
\mathbb P(A=1)&=0{,}9\cdot0{,}02+0{,}05\cdot0{,}98=0{,}067,\\
\mathbb P(Y=1\mid A=1)&=\frac{0{,}018}{0{,}067}=\frac{18}{67}\approx0{,}2687.
\end{aligned}
$$

Cảnh báo làm xác suất lỗi tăng từ $0{,}02$ lên khoảng $0{,}2687$; nó vẫn chưa xác nhận chắc chắn sản phẩm lỗi.

**Suy luận về nhà cung cấp.**

Độc lập có điều kiện cho phép dùng cùng đặc tính cảm biến trong từng nhóm nhà cung cấp. Vì vậy

$$
\begin{aligned}
\mathbb P(S=b,A=1)
&=0{,}2\bigl(0{,}06\cdot0{,}9+0{,}94\cdot0{,}05\bigr)\\
&=0{,}0202,\\
\mathbb P(S=b\mid A=1)&=\frac{0{,}0202}{0{,}067}=\frac{101}{335}\approx0{,}3015.
\end{aligned}
$$

Khi đã biết sản phẩm lỗi, cảnh báo không bổ sung thông tin về nhà cung cấp theo giả thiết của mô hình. Có thể kiểm tra trực tiếp bằng

$$
\mathbb P(S=b\mid Y=1,A=1)
=\frac{0{,}2\cdot0{,}06\cdot0{,}9}{0{,}02\cdot0{,}9}=0{,}6.
$$

**Giới hạn và kiểm tra lại.**

Nếu bỏ độc lập có điều kiện, chưa biết $\mathbb P(A=1\mid Y=y,S=s)$ trong từng nhóm. Hai tỷ lệ cảm biến gộp theo $Y$ không xác định riêng các tỷ lệ này, nên chưa đủ tính $\mathbb P(S=b\mid A=1)$. Tổng xác suất cảnh báo từ $a$ là $0{,}8(0{,}01\cdot0{,}9+0{,}99\cdot0{,}05)=0{,}0468$; cộng với $0{,}0202$ khôi phục $0{,}067$.
:::

### Lời giải E10.2

::: solution Lời giải Bài tập 10.7
**Mômen và phương sai.**

Theo định nghĩa kỳ vọng, ta tính được

$$
\begin{aligned}
\mathbb E[X]&=-\frac14+2\cdot\frac14=\frac14,\\
\mathbb E[X^2]&=\frac14+4\cdot\frac14=\frac54,\\
\operatorname{Var}(X)&=\frac54-\left(\frac14\right)^2=\frac{19}{16}.
\end{aligned}
$$

Kỳ vọng $1/4$ không thuộc tập giá trị của $X$, vì nó là trung bình có trọng số.

**Hàm phân phối tích lũy.**

Cộng các khối xác suất đến điểm $t$ cho

$$
F_X(t)=\begin{cases}
0,&t<-1,\\
1/4,&-1\le t<0,\\
3/4,&0\le t<2,\\
1,&t\ge2.
\end{cases}
$$

Do đó $\mathbb P(X\ge0)=3/4$ và $F_X(0)=3/4$, còn $\mathbb P(X<0)=1/4$. Độ nhảy tại $0$ bằng $\mathbb P(X=0)=1/2$.

**Biến đổi và kiểm tra lại.**

Biến $Z=X^2$ nhận $0,1,4$ với xác suất $1/2,1/4,1/4$, nên $\mathbb E[Z]=0+1/4+4/4=5/4$. Kiểm tra phương sai trực tiếp cho

$$
\frac14\left(-1-\frac14\right)^2
+\frac12\left(0-\frac14\right)^2
+\frac14\left(2-\frac14\right)^2
=\frac{25+2+49}{64}=\frac{19}{16}.
$$
:::

### Lời giải E10.3

::: solution Lời giải Bài tập 10.8
**Phân phối biên và điều kiện.**

Cộng theo hàng cho $p_X(0)=p_X(1)=0{,}5$. Cộng theo cột cho $p_Y(0)=0{,}3$, $p_Y(1)=0{,}7$. Vì vậy $\mathbb P(Y=1\mid X=1)=0{,}4/0{,}5=0{,}8$.

**Mômen và độc lập.**

Với các biến nhị phân, ta có $\mathbb E[X]=0{,}5$, $\mathbb E[Y]=0{,}7$ và $\mathbb E[XY]=0{,}4$. Suy ra

$$
\operatorname{Cov}(X,Y)=0{,}4-0{,}5\cdot0{,}7=0{,}05.
$$

Hai biến không độc lập: riêng ô $(1,1)$ đã cho $0{,}4\ne0{,}5\cdot0{,}7=0{,}35$.

**Kỳ vọng toàn phần và diễn giải.**

Trong nhóm $X=0$, xác suất lỗi là $0{,}3/0{,}5=0{,}6$, nên $\mathbb E[Y\mid X=0]=0{,}6$. Trong nhóm $X=1$, kỳ vọng có điều kiện bằng $0{,}8$. Lấy trung bình theo phân phối nhóm kiểm tra được

$$
\mathbb E\bigl[\mathbb E[Y\mid X]\bigr]
=0{,}5\cdot0{,}6+0{,}5\cdot0{,}8=0{,}7=\mathbb E[Y].
$$

Khi nhóm chưa quan sát, xác suất lỗi là $0{,}7$; khi nhóm được biết, dùng $0{,}6$ hoặc $0{,}8$. Bảng xác suất chỉ mô tả sự liên hệ; nó không quy định một cơ chế can thiệp hoặc loại trừ các yếu tố chung khác, nên chưa chứng minh quan hệ nhân quả. Hai phân phối biên đều có tổng $1$, và trung bình hai xác suất lỗi theo trọng số nhóm khôi phục xác suất lỗi gộp.
:::

### Lời giải E10.4

::: solution Lời giải Bài tập 10.9
**Phân phối và mômen.**

Biến $Z$ nhận $1$ và $4$, mỗi giá trị có xác suất $1/2$. Đối xứng của $X$ cho $\mathbb E[X]=0$ và $\mathbb E[XZ]=\mathbb E[X^3]=0$. Vì vậy

$$
\mathbb E[Z]=\frac{1+4}{2}=\frac52,
\qquad
\operatorname{Cov}(X,Z)=0-0\cdot\frac52=0.
$$

**Phụ thuộc.**

Biết $X=2$ xác định $Z=4$ với xác suất $1$. Trong khi đó, $\mathbb P(Z=4)=1/2$. Điều kiện $X=2$ có xác suất $1/4>0$, nên phép so sánh hợp lệ và chứng minh hai biến phụ thuộc.

**Phương sai và hệ quả cho AI.**

Ta có $\mathbb E[X^2]=5/2$ và $\mathbb E[Z^2]=(1+16)/2=17/2$. Do đó

$$
\operatorname{Var}(X)=\frac52,
\qquad
\operatorname{Var}(Z)=\frac{17}{2}-\left(\frac52\right)^2=\frac94.
$$

Cả hai phương sai đều dương. Hiệp phương sai bằng không ở đây xuất phát từ sự triệt tiêu của mômen bậc lẻ, dù $Z$ được xác định hoàn toàn bởi $X$. Một tiêu chí chỉ kiểm tra hiệp phương sai có thể bỏ qua quan hệ phi tuyến giữa đặc trưng. Kiểm tra lại: $\mathbb P(X=2,Z=4)=1/4$ khác tích hai xác suất biên $(1/4)(1/2)=1/8$.
:::
