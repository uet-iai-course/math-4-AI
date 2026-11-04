# Bài 10 — Xác suất: ngôn ngữ biểu diễn bất định trong AI

Câu hỏi trung tâm của bài là: **một hệ thống AI suy luận hợp lý như thế nào khi thông tin không đầy đủ hoặc có nhiễu?** Bài 05c đã định nghĩa xác suất có điều kiện $P(E\mid F)=P(E\cap F)/P(F)$ khi $P(F)>0$ (Định nghĩa 05c.8) và chứng minh công thức Bayes (Định lý 05c.11) trên không gian xác suất rời rạc, để kiểm soát dao động của trung bình mẫu. Trong bài này, chúng ta dùng các công cụ đó cho hai việc khác:

- cập nhật xác suất của một nhãn chưa quan sát sau khi thấy một tín hiệu, bằng định lý Bayes;
- loại bỏ một biến không quan sát được khỏi phép suy luận, bằng phép lấy biên.

## Câu hỏi mở đầu

Một dây chuyền nhận sản phẩm từ hai nhà cung cấp:

- nhà cung cấp $a$ giao $60\%$ sản phẩm, trong đó $2\%$ bị lỗi;
- nhà cung cấp $b$ giao $40\%$ sản phẩm, trong đó $8\%$ bị lỗi.

Một cảm biến kiểm định cảnh báo trên $90\%$ số sản phẩm lỗi và trên $5\%$ số sản phẩm đạt. Một sản phẩm vừa bị cảnh báo, nhưng hồ sơ nguồn hàng của nó bị thiếu.

**Câu hỏi.** Xác suất sản phẩm này bị lỗi bằng bao nhiêu?

Câu trả lời "$90\%$, vì cảm biến phát hiện $90\%$ sản phẩm lỗi" là sai. Con số $90\%$ là tỉ lệ cảnh báo trong nhóm sản phẩm lỗi, còn câu hỏi cần tỉ lệ sản phẩm lỗi trong nhóm bị cảnh báo; câu trả lời này cũng bỏ qua việc sản phẩm lỗi chỉ chiếm một phần nhỏ của dây chuyền. Một nhầm lẫn thứ hai xuất hiện khi thiếu nguồn hàng: lấy trung bình cộng hai tỉ lệ lỗi, được $5\%$, trong khi nhà cung cấp $a$ giao nhiều hàng hơn. Chúng ta sẽ tính đúng cả hai đại lượng.

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Lập không gian mẫu, biến cố và mô hình xác suất hữu hạn cho một tình huống AI; suy ra quy tắc phần bù và quy tắc hợp từ các tiên đề.
2. Chứng minh quy tắc nhân, công thức xác suất toàn phần và định lý Bayes; phân biệt độc lập, xung khắc và độc lập có điều kiện.
3. Mô tả biến ngẫu nhiên bằng hàm khối xác suất, hàm phân phối tích lũy hoặc mật độ; chọn mô hình Bernoulli, phân loại hay Gaussian theo kiểu dữ liệu.
4. Tính và chứng minh các công thức của kỳ vọng, phương sai, hiệp phương sai và kỳ vọng toàn phần; dựng phản ví dụ cho hai biến không tương quan nhưng phụ thuộc.
5. Tính phân phối biên và phân phối có điều kiện từ phân phối đồng thời; suy luận về tình trạng sản phẩm khi nguồn hàng chưa được quan sát.
6. Nêu các giả thiết mà một phép suy luận phụ thuộc vào, và phân biệt xác suất hậu nghiệm với quyết định dựa trên chi phí.

Các mục tiêu này cụ thể hóa năng lực xây dựng và phân tích mô hình học máy của chuẩn đầu ra CLO2 trong đề cương học phần.

## Kiến thức tiên quyết

- **Tập hợp và phép đếm.** Hợp, giao, phần bù, tập con; số phần tử của tích Descartes hai tập hữu hạn bằng tích số phần tử.
- **Xác suất rời rạc trong Bài 05c.** Trên không gian xác suất rời rạc (Định nghĩa 05c.1), Mệnh đề 05c.2 cho $P(\varnothing)=0$, $P(E^c)=1-P(E)$, $P(E)\le P(F)$ khi $E\subseteq F$ và $P(E\cup F)=P(E)+P(F)-P(E\cap F)$. Mệnh đề 05c.9, Mệnh đề 05c.10 và Định lý 05c.11 lần lượt là quy tắc nhân, xác suất toàn phần và công thức Bayes. Định nghĩa 05c.26 và Định lý 05c.28 cho kỳ vọng của biến rời rạc và tính tuyến tính của nó. Chúng ta phát biểu lại các kết quả ấy trên không gian xác suất tổng quát, thêm trường hợp có mật độ, và viết $\mathbb P$ cho xác suất ($P$ ở Bài 05c).
- **Tích phân một biến.** Tích phân $\int_a^bf(x)\,dx$ của hàm không âm là diện tích dưới đồ thị; $\int_{\mathbb R}e^{-u^2/2}\,du=\sqrt{2\pi}$.
- **Đại số tuyến tính.** Vector trong $\mathbb R^d$, ma trận đối xứng xác định dương, nghịch đảo và định thức.

**Câu hỏi ôn nhanh.**

1. Cho $\mathbb P(F)=0{,}25$ và $\mathbb P(E\cap F)=0{,}1$. Tính $\mathbb P(E\mid F)$.
2. Gieo hai xúc xắc cân đối, phân biệt viên thứ nhất và viên thứ hai. Tính xác suất tổng hai mặt bằng $4$.
3. Biến ngẫu nhiên $X$ có $\mathbb E[X]=3$. Tính $\mathbb E[2X+1]$.

::: hint Đáp số câu hỏi ôn nhanh
1. $\mathbb P(E\mid F)=0{,}1/0{,}25=0{,}4$.
2. Có $3$ cặp $(1,3)$, $(2,2)$, $(3,1)$ có tổng bằng $4$ trong $36$ cặp đồng khả năng, nên xác suất bằng $3/36=1/12$.
3. Theo tính tuyến tính của kỳ vọng, $\mathbb E[2X+1]=2\cdot3+1=7$.
:::

## 1. Thiết lập bài toán

Ứng dụng xuyên suốt bài là một hệ thống phân loại sản phẩm lỗi trên dây chuyền. Trước khi sản phẩm kế tiếp đến, chúng ta chưa biết nó lỗi hay đạt, cũng chưa biết cảm biến sẽ báo gì. Bài toán gồm các thành phần sau.

- **Thí nghiệm:** chọn ngẫu nhiên một sản phẩm từ luồng hàng rồi đưa qua cảm biến kiểm định.
- **Đại lượng ngẫu nhiên:** nhà cung cấp, tình trạng lỗi và phản hồi của cảm biến của sản phẩm được chọn; chúng ngẫu nhiên vì sản phẩm được chọn ngẫu nhiên, theo phân phối do tỉ lệ nguồn hàng, tỉ lệ lỗi và đặc tính cảm biến xác định.
- **Tham số:** tỉ lệ nguồn hàng, tỉ lệ lỗi của từng nhà cung cấp, xác suất cảnh báo trên sản phẩm lỗi và trên sản phẩm đạt; trong bài này chúng được cho trước.
- **Quan sát:** phản hồi của cảm biến, có thể kèm hoặc không kèm thông tin nhà cung cấp; tình trạng lỗi không được quan sát.
- **Mục tiêu:** xác suất sản phẩm lỗi sau khi có quan sát, và chi phí kỳ vọng của một quy tắc quyết định.
- **Đối tượng so sánh:** xác suất lỗi trước quan sát (tiên nghiệm) và sau quan sát (hậu nghiệm).

Bộ phân loại và cảm biến được cố định. Xác suất trong bài mô tả cách sản phẩm được chọn từ luồng hàng, không mô tả sự ngẫu nhiên bên trong cảm biến.

## 2. Ký hiệu và giả thiết

Bảng dưới gồm các ký hiệu dùng xuyên suốt bài; ký hiệu chỉ dùng trong một ví dụ hay một chứng minh được giới thiệu tại chỗ.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $\Omega$, $\omega$ | không gian mẫu; kết quả sơ cấp | tập khác rỗng; $\omega\in\Omega$ |
| $\mathcal F$ | họ các biến cố | sigma-đại số trên $\Omega$ |
| $\mathbb P$ | độ đo xác suất | $\mathcal F\to[0,1]$ |
| $E,F,G$ | biến cố | phần tử của $\mathcal F$ |
| $E^c$, $E\cup F$, $E\cap F$ | phần bù, hợp, giao | biến cố |
| $H$, $C$ | camera: có người; có cảnh báo | biến cố |
| $\mathbb P(E\mid F)$ | xác suất có điều kiện | xác định khi $\mathbb P(F)>0$ |
| $B_1,\ldots,B_q$ | phân hoạch của $\Omega$ | biến cố đôi một xung khắc, hợp bằng $\Omega$ |
| $X,Z$; $x,z$ | biến ngẫu nhiên; giá trị của chúng | thực hoặc vector |
| $S$; $s$ | nhà cung cấp; giá trị | $\{a,b\}$ |
| $Y$; $y$ | biến chỉ thị của sản phẩm lỗi; giá trị | $\{0,1\}$ |
| $A$; $a'$ | biến chỉ thị của cảnh báo; giá trị | $\{0,1\}$ |
| $p_X$, $p_{X,Z}$ | hàm khối xác suất; hàm khối xác suất đồng thời | không âm, tổng bằng $1$ |
| $f_X$, $f_{X,Z}$ | mật độ; mật độ đồng thời | không âm, tích phân bằng $1$ |
| $F_X$ | hàm phân phối tích lũy | $F_X(t)=\mathbb P(X\le t)$ |
| $X\perp Z$, $X\perp Z\mid W$ | độc lập; độc lập có điều kiện | phân tích nhân tử tương ứng |
| $\mathbf 1_E$ | biến chỉ thị của biến cố $E$ | bằng $1$ trên $E$, bằng $0$ ngoài $E$ |
| $\mathbb E[X]$, $\operatorname{Var}(X)$ | kỳ vọng; phương sai | số thực khi các mômen tương ứng hữu hạn |
| $\operatorname{Cov}(X,Z)$, $\rho_{XZ}$ | hiệp phương sai; hệ số tương quan | số thực; $\rho_{XZ}\in[-1,1]$ |
| $\psi(s)$, $\mathbb E[X\mid S]$ | $\psi(s)=\mathbb E[X\mid S=s]$; kỳ vọng có điều kiện $\psi(S)$ | số thực; biến ngẫu nhiên, hàm của $S$ |
| $\mu$, $\sigma^2$, $\Sigma$ | tham số của Gaussian | $\mathbb R$ hoặc $\mathbb R^d$; $\sigma^2>0$; ma trận $d\times d$ |

Các phép suy luận của bài dựa trên những giả thiết xác suất sau.

- **Tham số cho trước:** $\mathbb P(S=s)$, $\mathbb P(Y=1\mid S=s)$, $\mathbb P(A=1\mid Y=y)$ là các số đã biết.
- **Độc lập có điều kiện:** khi tình trạng lỗi $Y$ đã biết, nhà cung cấp $S$ không làm thay đổi phân phối của phản hồi cảm biến $A$, ký hiệu $A\perp S\mid Y$.
- **Mẫu số dương:** mọi biến cố được dùng làm điều kiện có xác suất dương.
- **Mômen hữu hạn:** kỳ vọng chỉ được dùng cho biến khả tích; phương sai và hiệp phương sai chỉ được dùng khi mômen bậc hai hữu hạn.

Giả thiết đại số chỉ xuất hiện ở Gaussian: $\sigma^2>0$ trong trường hợp một chiều; $\Sigma$ đối xứng xác định dương trong trường hợp nhiều chiều.

## 3. Ví dụ xuyên suốt

Bài dùng hai đối tượng có cùng cấu trúc "tình trạng thực × phản hồi của hệ thống".

- **Camera giao thông** (ví dụ tính tay). Một bộ phát hiện người đi bộ chạy trên từng khung hình. Tình trạng thực là có hoặc không có người; phản hồi là có hoặc không có cảnh báo. Bốn tổ hợp này được gán xác suất bằng một bảng, từ đó ta đọc ra trực tiếp xác suất cảnh báo sai, bỏ sót và xác suất có người trong nhóm khung hình bị cảnh báo.
- **Hệ thống phân loại sản phẩm lỗi** (ứng dụng AI). Tình trạng thực là lỗi hoặc đạt; phản hồi là cảm biến cảnh báo hoặc không. Hệ thống được xây dựng qua ba giai đoạn:
  - chỉ có nhãn lỗi/đạt, với một tỉ lệ lỗi chung;
  - thêm nhà cung cấp và tỉ lệ lỗi của từng nhà cung cấp, từ đó tính xác suất tiên nghiệm của sản phẩm lỗi;
  - thêm quan sát từ cảm biến, từ đó có hợp lý của quan sát, xác suất hậu nghiệm và quy tắc suy luận khi nguồn hàng bị thiếu.

Camera đủ nhỏ để mọi xác suất đồng thời được cho sẵn trong một bảng bốn ô. Hệ thống sản phẩm có thêm biến thứ ba là nhà cung cấp, và các xác suất được cho dưới dạng tỉ lệ trong từng nhóm. Để ghép các tỉ lệ ấy thành phân phối đồng thời rồi loại biến nhà cung cấp khi nó không được quan sát, chúng ta cần quy tắc nhân, định lý Bayes và phép lấy biên.

## 4. Thí nghiệm ngẫu nhiên, biến cố và mô hình xác suất

Với một bộ phát hiện $h$ có tham số cố định, nếu khung hình $x$ cố định thì cảnh báo $h(x)$ cũng cố định. Tuy nhiên, ở thời điểm thiết kế hệ thống, ta chưa biết khung hình nào sẽ xuất hiện. Để phát biểu về chất lượng của bộ phát hiện trên những khung hình chưa quan sát, chúng ta cần ba đối tượng:

- *không gian mẫu* để liệt kê các khả năng;
- *biến cố* để phát biểu tình huống quan tâm, chẳng hạn "cảnh báo khi không có người";
- *độ đo xác suất* để gán cho các tình huống ấy những trọng số nhất quán.

### 4.1. Không gian mẫu

Ta cố định cách chọn một khung hình và cách chạy bộ phát hiện. Kết quả cụ thể của lần quan sát tiếp theo chưa biết trước, nên ta mô hình hóa lần quan sát bằng một thí nghiệm ngẫu nhiên.

::: definition Định nghĩa 10.1 (Thí nghiệm ngẫu nhiên và không gian mẫu)
*Thí nghiệm ngẫu nhiên* (random experiment) là một quy trình được xác định trước về cách thực hiện, nhưng kết quả của một lần thực hiện chưa biết trước khi quan sát.

*Không gian mẫu* (sample space) $\Omega$ là tập mọi kết quả có thể xảy ra theo cách mô hình hóa đã chọn. Mỗi $\omega\in\Omega$ là một *kết quả sơ cấp* (elementary outcome).
:::

Định nghĩa không đòi hỏi cơ chế bên trong phải ngẫu nhiên. Một thuật toán tất định chạy trên đầu vào chưa biết vẫn cho một kết quả chưa biết trước khi đầu vào được quan sát.

::: example Ví dụ 10.1 (Hai lần tung đồng xu)
**Quy trình.** Tung một đồng xu hai lần, ghi kết quả theo đúng thứ tự. Ký hiệu $\mathrm H$ là ngửa và $\mathrm T$ là sấp.

**Không gian mẫu.** Có bốn kết quả sơ cấp:

$$
\Omega=\{\mathrm{HH},\mathrm{HT},\mathrm{TH},\mathrm{TT}\}.
\tag{4.1}
$$

Kết quả $\mathrm{HT}$ là một phần tử của $\Omega$. Phát biểu "ít nhất một lần ngửa" đúng với ba kết quả, nên nó chưa phải một kết quả sơ cấp.

**Kiểm tra lại.** Thứ tự phải được giữ: $\mathrm{HT}$ và $\mathrm{TH}$ là hai kết quả khác nhau. Nếu chỉ ghi số lần ngửa, ta được một không gian mẫu khác là $\{0;1;2\}$, và việc đổi cách ghi không cho phép gán xác suất $1/3$ cho mỗi giá trị.
:::

Với camera, một kết quả phải ghi đủ thông tin để biết bộ phát hiện đúng hay sai. Ta dùng các nhãn chữ đứng $\mathrm P$ (có người), $\mathrm N$ (không có người), $\mathrm A$ (có cảnh báo), $\mathrm Q$ (không cảnh báo); các nhãn này chỉ dùng cho camera và khác biến ngẫu nhiên $A$ của hệ thống sản phẩm. Không gian mẫu là

$$
\begin{aligned}
\Omega=\{&(\mathrm P,\mathrm A),(\mathrm P,\mathrm Q),\\
&(\mathrm N,\mathrm A),(\mathrm N,\mathrm Q)\}.
\end{aligned}
\tag{4.2}
$$

Mỗi phần tử của $\Omega$ có hai thành phần: tình trạng thực và phản hồi của bộ phát hiện. Chẳng hạn, $(\mathrm N,\mathrm A)$ nghĩa là không có người nhưng hệ thống cảnh báo; đây là một loại lỗi khác với $(\mathrm P,\mathrm Q)$, khi có người nhưng hệ thống bỏ sót.

Mô hình (4.2) gộp mọi khung hình có cùng tình trạng thực và cùng phản hồi. Khi câu hỏi chỉ xoay quanh việc cảnh báo đúng hay sai, bốn kết quả là đủ. Nếu cần vị trí người đi bộ hoặc mức tự tin của bộ phát hiện, không gian mẫu phải được mở rộng.

### 4.2. Biến cố

Trong mô hình camera, "có người đi bộ" đúng với hai kết quả sơ cấp, còn "cảnh báo sai" đúng với một kết quả. Ta biểu diễn các phát biểu ấy bằng tập con của $\Omega$.

::: definition Định nghĩa 10.2 (Biến cố và các phép toán biến cố)
Cho không gian mẫu hữu hạn $\Omega$. Một *biến cố* (event) là một tập $E\subseteq\Omega$; biến cố $E$ xảy ra nếu kết quả quan sát $\omega$ thuộc $E$. Với $E,F\subseteq\Omega$:

- **Phần bù:** $E^c=\Omega\setminus E$ là biến cố $E$ không xảy ra.
- **Giao:** $E\cap F$ là biến cố cả $E$ và $F$ xảy ra.
- **Hợp:** $E\cup F$ là biến cố ít nhất một trong hai biến cố xảy ra.
- **Xung khắc:** $E$ và $F$ *xung khắc* (mutually exclusive) nếu $E\cap F=\varnothing$.
:::

Với $\Omega$ hữu hạn, mọi tập con của $\Omega$ đều được coi là biến cố, tức họ biến cố là $2^\Omega$. Trong (4.2), đặt $H$ là biến cố "có người" và $C$ là biến cố "hệ thống cảnh báo". Khi đó

$$
\begin{aligned}
H&=\{(\mathrm P,\mathrm A),(\mathrm P,\mathrm Q)\},\\
C&=\{(\mathrm P,\mathrm A),(\mathrm N,\mathrm A)\},\\
H\cap C&=\{(\mathrm P,\mathrm A)\},\\
H^c\cap C&=\{(\mathrm N,\mathrm A)\},\\
H\cap C^c&=\{(\mathrm P,\mathrm Q)\}.
\end{aligned}
\tag{4.3}
$$

Dòng thứ tư là biến cố *cảnh báo sai*: hệ thống báo có người khi không có người. Dòng thứ năm là biến cố *bỏ sót*. Ngoài ra $H\cup C=\Omega\setminus\{(\mathrm N,\mathrm Q)\}$: trừ trường hợp không có người và không cảnh báo, mọi kết quả thuộc ít nhất một trong hai biến cố.

"Hoặc" trong $H\cup C$ là phép hoặc bao hàm. Kết quả $(\mathrm P,\mathrm A)$ thuộc cả $H$ và $C$ nên vẫn thuộc hợp; loại nó khỏi hợp là tính xác suất của một biến cố khác.

### 4.3. Không gian xác suất

Bốn kết quả của (4.2) chưa đủ để tính tần suất của một loại lỗi. Khung hình lấy ở ngã tư đông người có tỉ lệ "có người" khác hẳn khung hình lấy ở một tuyến đường vắng. Chúng ta cần một quy tắc gán xác suất cho các biến cố, và quy tắc đó phải thỏa những điều kiện nhất quán sau.

::: definition Định nghĩa 10.3 (Không gian xác suất)
Một *không gian xác suất* (probability space) là bộ ba $(\Omega,\mathcal F,\mathbb P)$ gồm:

- **Không gian mẫu:** tập khác rỗng $\Omega$.
- **Họ biến cố:** một *sigma-đại số* (σ-algebra) $\mathcal F$ các tập con của $\Omega$, tức $\Omega\in\mathcal F$ và $\mathcal F$ đóng dưới phép lấy phần bù và hợp đếm được.
- **Độ đo xác suất:** hàm $\mathbb P:\mathcal F\to[0,1]$ thỏa ba tiên đề dưới đây.

**(P1) Không âm.** $\mathbb P(E)\ge0$ với mọi $E\in\mathcal F$.

**(P2) Chuẩn hóa.** $\mathbb P(\Omega)=1$.

**(P3) Cộng tính đếm được.** Với mọi dãy biến cố $E_1,E_2,\ldots$ đôi một xung khắc,

$$
\mathbb P\Bigl(\bigcup_{i=1}^{\infty}E_i\Bigr)=\sum_{i=1}^{\infty}\mathbb P(E_i).
\tag{4.4}
$$
:::

Định nghĩa 10.3 mở rộng Định nghĩa 05c.1 sang không gian mẫu bất kỳ. Khi $\Omega$ hữu hạn hoặc đếm được, ta lấy $\mathcal F=2^\Omega$ và trở lại không gian xác suất rời rạc của Bài 05c. Khi $\Omega$ không đếm được, chẳng hạn khi kết quả là một số đo thực, họ $\mathcal F$ cần được chọn nhỏ hơn $2^\Omega$.

Tiên đề (P3) chỉ nói về dãy vô hạn biến cố. Trước khi dùng nó cho hai hay ba biến cố, chúng ta cần bổ đề sau. Phần 1 và phần 3 của bổ đề là phần 1 và phần 3 của Mệnh đề 05c.2, ở đây được chứng minh trên không gian xác suất tổng quát.

::: lemma Bổ đề 10.4 (Tập rỗng, cộng tính hữu hạn và tính đơn điệu) — chứng minh đầy đủ
**Giả thiết.** $(\Omega,\mathcal F,\mathbb P)$ là một không gian xác suất.

**Kết luận.**

1. $\mathbb P(\varnothing)=0$.
2. Với mọi $E_1,\ldots,E_n\in\mathcal F$ đôi một xung khắc, $\mathbb P\bigl(\bigcup_{i=1}^nE_i\bigr)=\sum_{i=1}^n\mathbb P(E_i)$.
3. Với mọi $E,F\in\mathcal F$ thỏa $E\subseteq F$, ta có $F\setminus E\in\mathcal F$ và $\mathbb P(E)\le\mathbb P(F)$.
:::

::: proof Chứng minh Bổ đề 10.4
**Lộ trình.** Áp dụng (P3) cho các dãy được bổ sung bằng tập rỗng.

**Bước 1 (tập rỗng).** Vì $\Omega\in\mathcal F$ và $\mathcal F$ đóng dưới phần bù, $\varnothing=\Omega^c\in\mathcal F$. Lấy $E_1=\Omega$ và $E_i=\varnothing$ với $i\ge2$; các tập này đôi một xung khắc và có hợp bằng $\Omega$. Theo (P3) và (P2),

$$
\begin{aligned}
1&=\mathbb P(\Omega)\\
&=\mathbb P(\Omega)+\sum_{i=2}^{\infty}\mathbb P(\varnothing)\\
&=1+\sum_{i=2}^{\infty}\mathbb P(\varnothing).
\end{aligned}
$$

Do đó chuỗi các số hạng không âm bằng nhau $\mathbb P(\varnothing)$ có tổng $0$, nên $\mathbb P(\varnothing)=0$.

**Bước 2 (cộng tính hữu hạn).** Bổ sung $E_{n+1}=E_{n+2}=\cdots=\varnothing$. Dãy mới đôi một xung khắc và có cùng hợp với $E_1,\ldots,E_n$. Theo (P3) và Bước 1,

$$
\begin{aligned}
\mathbb P\Bigl(\bigcup_{i=1}^nE_i\Bigr)&=\sum_{i=1}^n\mathbb P(E_i)+\sum_{i=n+1}^{\infty}0\\
&=\sum_{i=1}^n\mathbb P(E_i).
\end{aligned}
$$

**Bước 3 (đơn điệu).** Ta có $F\setminus E=(F^c\cup E)^c$, thu được từ các tập trong $\mathcal F$ bằng phần bù và hợp, nên $F\setminus E\in\mathcal F$. Vì $E\subseteq F$, ta viết $F=E\cup(F\setminus E)$ với hai tập xung khắc. Bước 2 và (P1) cho $\mathbb P(F)=\mathbb P(E)+\mathbb P(F\setminus E)\ge\mathbb P(E)$. $\square$

Như vậy mọi phép cộng xác suất trên một số hữu hạn biến cố xung khắc trong bài đều dựa trên (P3); tính đơn điệu cho phép bỏ qua các nhóm có xác suất $0$ khi lấy điều kiện.
:::

Ba tiên đề không xác định xác suất của từng kết quả sơ cấp; chúng chỉ nêu các ràng buộc mà một cách gán hợp lệ phải thỏa. Với không gian mẫu hữu hạn, mệnh đề sau cho cách xây dựng trực tiếp từ trọng số của các kết quả sơ cấp, giống công thức (1.3) của Bài 05c.

::: proposition Mệnh đề 10.5 (Xây dựng mô hình xác suất hữu hạn) — chứng minh đầy đủ
**Giả thiết.** $\Omega=\{\omega_1,\ldots,\omega_m\}$ hữu hạn, khác rỗng; các trọng số $p(\omega_i)\ge0$ thỏa

$$
\sum_{i=1}^mp(\omega_i)=1.
\tag{4.5}
$$

**Kết luận.** Hàm $\mathbb P$ xác định với mọi $E\subseteq\Omega$ bởi

$$
\mathbb P(E)=\sum_{\omega\in E}p(\omega)
\tag{4.6}
$$

làm $(\Omega,2^\Omega,\mathbb P)$ thành một không gian xác suất. Ngược lại, mọi độ đo xác suất trên $2^\Omega$ có dạng (4.6) với $p(\omega)=\mathbb P(\{\omega\})$.
:::

::: proof Chứng minh Mệnh đề 10.5
**Lộ trình.** Kiểm tra lần lượt ba tiên đề, rồi dùng Bổ đề 10.4 cho chiều ngược lại.

**Bước 1 (không âm và chuẩn hóa).** Mỗi $p(\omega)\ge0$ nên $\mathbb P(E)\ge0$, đó là (P1). Với $E=\Omega$, (4.5) cho $\mathbb P(\Omega)=1$, đó là (P2).

**Bước 2 (cộng tính đếm được).** Cho $E_1,E_2,\ldots$ đôi một xung khắc. Mỗi $\omega$ thuộc nhiều nhất một $E_i$, nên trong tổng $\sum_i\sum_{\omega\in E_i}p(\omega)$ mỗi trọng số $p(\omega)$ với $\omega\in\bigcup_iE_i$ xuất hiện đúng một lần. Vì $\Omega$ hữu hạn, chỉ có hữu hạn $E_i$ khác rỗng, nên tổng này là tổng hữu hạn và bằng $\sum_{\omega\in\bigcup_iE_i}p(\omega)$. Đó là (P3).

**Bước 3 (chiều ngược lại).** Mỗi $E\subseteq\Omega$ là hợp của hữu hạn tập đơn $\{\omega\}$ với $\omega\in E$, đôi một xung khắc. Bổ đề 10.4, phần 2, cho $\mathbb P(E)=\sum_{\omega\in E}\mathbb P(\{\omega\})$. $\square$

Mệnh đề cho thấy một bảng trọng số không âm có tổng bằng $1$ đã là một mô hình xác suất đầy đủ; đây là cách mọi bảng xác suất của bài được xây dựng.
:::

Mệnh đề 10.5 không yêu cầu các kết quả đồng xác suất hay độc lập. Nếu $m$ kết quả sơ cấp có cùng xác suất, (4.5) buộc mỗi trọng số bằng $1/m$, và

$$
\mathbb P(E)=\frac{|E|}{|\Omega|}.
\tag{4.7}
$$

Công thức (4.7) chỉ dùng cho mô hình đều. Trong Ví dụ 10.1, hai lần tung một đồng xu cân đối, lần sau không chịu ảnh hưởng của lần trước, được mô hình hóa bằng bốn kết quả cùng xác suất $1/4$. Nếu đồng xu bị lệch, không thể giữ cách gán này. Tương tự, bốn kết quả của camera không có lý do gì phải đồng xác suất.

### 4.4. Các quy tắc suy ra từ tiên đề

Trong một hệ thống AI, ta thường cần xác suất "ít nhất một lỗi xảy ra" hoặc "không có lỗi nào xảy ra". Các công thức dưới đây suy ra từ tiên đề cộng tính qua Bổ đề 10.4; chúng là phần 2 và phần 4 của Mệnh đề 05c.2 trên không gian xác suất tổng quát.

::: proposition Mệnh đề 10.6 (Phần bù và hợp hai biến cố) — chứng minh đầy đủ
**Giả thiết.** $(\Omega,\mathcal F,\mathbb P)$ là một không gian xác suất; $E,F\in\mathcal F$.

**Kết luận.**

$$
\mathbb P(E^c)=1-\mathbb P(E),
\tag{4.8}
$$

$$
\begin{aligned}
\mathbb P(E\cup F)={}&\mathbb P(E)+\mathbb P(F)\\
&-\mathbb P(E\cap F).
\end{aligned}
\tag{4.9}
$$
:::

::: proof Chứng minh Mệnh đề 10.6
**Lộ trình.** Viết mỗi biến cố thành hợp của các tập xung khắc rồi áp dụng Bổ đề 10.4, phần 2.

**Bước 1 (phần bù).** Hai tập $E$ và $E^c$ xung khắc, có hợp bằng $\Omega$. Bổ đề 10.4 và (P2) cho $1=\mathbb P(E)+\mathbb P(E^c)$, tức (4.8).

**Bước 2 (hợp).** Ba tập $E\setminus F=(E^c\cup F)^c$, $E\cap F=(E^c\cup F^c)^c$, $F\setminus E$ thuộc $\mathcal F$ và đôi một xung khắc; ba tập có hợp $E\cup F$, hai tập đầu có hợp $E$, hai tập sau có hợp $F$. Bổ đề 10.4 cho

$$
\begin{aligned}
\mathbb P(E\cup F)={}&\mathbb P(E\setminus F)+\mathbb P(E\cap F)\\
&+\mathbb P(F\setminus E),\\
\mathbb P(E)={}&\mathbb P(E\setminus F)+\mathbb P(E\cap F),\\
\mathbb P(F)={}&\mathbb P(F\setminus E)+\mathbb P(E\cap F).
\end{aligned}
$$

Thế $\mathbb P(E\setminus F)=\mathbb P(E)-\mathbb P(E\cap F)$ và $\mathbb P(F\setminus E)=\mathbb P(F)-\mathbb P(E\cap F)$ từ hai dòng sau vào dòng đầu, ta được (4.9). $\square$

Công thức hợp cho phép tính xác suất "ít nhất một loại lỗi" mà không cần thêm giả thiết nào về quan hệ giữa các loại lỗi.
:::

Mệnh đề 10.6 không cần thêm điều kiện nào về quan hệ giữa $E$ và $F$. Nếu chúng xung khắc thì $\mathbb P(E\cap F)=\mathbb P(\varnothing)=0$, và (4.9) trở thành công thức cộng. Một lỗi thường gặp là tính $\mathbb P(E\cup F)$ bằng $\mathbb P(E)+\mathbb P(F)$ khi giao khác rỗng; khi đó các kết quả trong giao bị cộng hai lần.

Khi chưa biết $\mathbb P(E\cap F)$, ta vẫn có một cận trên.

::: corollary Hệ quả 10.7 (Bất đẳng thức hợp, union bound) — chứng minh đầy đủ
**Giả thiết.** $E,F\in\mathcal F$ là hai biến cố bất kỳ.

**Kết luận.**

$$
\mathbb P(E\cup F)\le\mathbb P(E)+\mathbb P(F).
\tag{4.10}
$$
:::

::: proof Chứng minh Hệ quả 10.7
Trong (4.9), số hạng bị trừ $\mathbb P(E\cap F)$ không âm theo (P1); bỏ số hạng đó ta được (4.10). $\square$

Cận này đúng với mọi cặp biến cố, kể cả khi giao của chúng chưa biết.
:::

Mệnh đề 05c.7 là dạng nhiều biến cố của bất đẳng thức này và được dùng để chặn xác suất một hợp biến cố trong các cận tập trung.

### 4.5. Xác suất cảnh báo sai và bỏ sót

Ta trở lại camera với không gian mẫu (4.2). Mỗi lần quan sát gồm một khung hình lấy theo một quy trình cố định và phản hồi của bộ phát hiện đã cố định. Phân phối của bốn loại kết quả được cho trong bảng sau.

::: example Ví dụ 10.2 (Bảng tình huống của camera)
**Dữ kiện.** Bốn kết quả sơ cấp của (4.2) có trọng số:

| Tình trạng thực | Phản hồi | Kết quả $\omega$ | $p(\omega)$ |
|---|---|---|---:|
| Có người | Cảnh báo | $(\mathrm P,\mathrm A)$ | $0{,}18$ |
| Có người | Không cảnh báo | $(\mathrm P,\mathrm Q)$ | $0{,}02$ |
| Không có người | Cảnh báo | $(\mathrm N,\mathrm A)$ | $0{,}08$ |
| Không có người | Không cảnh báo | $(\mathrm N,\mathrm Q)$ | $0{,}72$ |
| | | **Tổng** | $1{,}00$ |

**Mô hình hợp lệ.** Mỗi trọng số không âm và $0{,}18+0{,}02+0{,}08+0{,}72=1$, nên theo Mệnh đề 10.5 bảng là một mô hình xác suất.

**Có người và cảnh báo.** Với $H,C$ của (4.3), công thức (4.6) cho

$$
\begin{aligned}
\mathbb P(H)&=0{,}18+0{,}02=0{,}20,\\
\mathbb P(C)&=0{,}18+0{,}08=0{,}26,\\
\mathbb P(H\cap C)&=0{,}18.
\end{aligned}
$$

**Phản hồi sai.** Cảnh báo sai $H^c\cap C=\{(\mathrm N,\mathrm A)\}$ có xác suất $0{,}08$; bỏ sót $H\cap C^c=\{(\mathrm P,\mathrm Q)\}$ có xác suất $0{,}02$. Hai biến cố này xung khắc, nên biến cố $M$ "hệ thống phản hồi sai" có xác suất

$$
\begin{aligned}
M&=(H^c\cap C)\\
&\quad\cup(H\cap C^c),\\
\mathbb P(M)&=0{,}08+0{,}02\\
&=0{,}10.
\end{aligned}
\tag{4.11}
$$

**Hợp hai biến cố.** Theo (4.9),

$$
\begin{aligned}
\mathbb P(H\cup C)&=0{,}20+0{,}26-0{,}18\\
&=0{,}28.
\end{aligned}
$$

Tính bằng phần bù: $(H\cup C)^c=\{(\mathrm N,\mathrm Q)\}$, nên (4.8) cho $\mathbb P(H\cup C)=1-0{,}72=0{,}28$.

**Kiểm tra lại.** Xác suất phản hồi đúng bằng $0{,}18+0{,}72=0{,}90$; cộng với xác suất phản hồi sai $0{,}10$ được $1$. Hai cách tính $\mathbb P(H\cup C)$ cho cùng kết quả.
:::

Con số $\mathbb P(H^c\cap C)=0{,}08$ là xác suất *đồng thời* không có người và có cảnh báo trên một khung hình được lấy theo quy trình đã chọn. Đó chưa phải xác suất cảnh báo trong số các khung hình không có người. Muốn tính đại lượng thứ hai, ta phải giới hạn việc xét vào biến cố $H^c$.

Trong Ví dụ 10.2, các trọng số được cho trước. Trong một hệ thống triển khai, chúng phải được ước lượng từ dữ liệu. Đổi cách lấy khung hình cũng đổi phân phối cần mô hình hóa, kể cả khi bộ phát hiện giữ nguyên.

::: remark Nhận xét 10.8 (Giới hạn của mô hình hữu hạn)
- **Độ chi tiết:** không gian mẫu (4.2) chỉ lưu hai thông tin nhị phân. Nó phân biệt được phản hồi đúng và sai, nhưng không mô tả vị trí người, độ trễ của cảnh báo hay độ khó của khung hình.
- **Gán xác suất:** tổng bằng $1$ chỉ bảo đảm phân phối hợp lệ về mặt toán học. Hai bảng có trọng số khác nhau đều thỏa các tiên đề; chọn bảng nào phù hợp với môi trường là việc của dữ liệu.
- **Nguồn bất định:** bộ phát hiện có thể tất định trên mỗi ảnh; xác suất ở đây đến từ cách lấy khung hình từ môi trường. Xác suất của một biến cố trên nhiều đầu vào khác với điểm tin cậy mà mô hình trả về trên một đầu vào cố định.
:::

Hệ thống phân loại sản phẩm ở giai đoạn 1 có cùng cấu trúc với camera: tình trạng thực là lỗi hoặc đạt, phản hồi là cảm biến cảnh báo hoặc không. Bốn tổ hợp có trọng số

| Tình trạng thực | Phản hồi | Trọng số |
|---|---|---:|
| Lỗi | Cảnh báo | $0{,}0396$ |
| Lỗi | Không cảnh báo | $0{,}0044$ |
| Đạt | Cảnh báo | $0{,}0478$ |
| Đạt | Không cảnh báo | $0{,}9082$ |

Các trọng số không âm và có tổng $0{,}0396+0{,}0044+0{,}0478+0{,}9082=1$, nên theo Mệnh đề 10.5 bảng là một mô hình xác suất. Công thức (4.6) cho xác suất lỗi $0{,}0396+0{,}0044=0{,}044$ và xác suất cảnh báo $0{,}0396+0{,}0478=0{,}0874$; như (4.11), xác suất phản hồi sai là $0{,}0044+0{,}0478=0{,}0522$. Ở giai đoạn này, tỉ lệ lỗi chung $0{,}044$ và bốn ô của bảng được cho sẵn; chúng chưa cho biết vì sao tỉ lệ lỗi bằng $0{,}044$, cũng chưa cho biết xác suất lỗi sau một cảnh báo.

Như vậy, Định nghĩa 10.3 và Bổ đề 10.4 cho phép gán xác suất nhất quán cho các biến cố, Mệnh đề 10.5 dựng mô hình từ một bảng trọng số, còn Mệnh đề 10.6 tính được xác suất phản hồi sai của camera trong Ví dụ 10.2. Tuy nhiên, xác suất đồng thời $0{,}18$ của "có người và cảnh báo" chưa trả lời câu hỏi người dùng hệ thống quan tâm: trong số các khung hình bị cảnh báo, tỉ lệ có người là bao nhiêu. Trong Mục 5, chúng ta chuẩn hóa phân phối trong nhóm khung hình có cảnh báo bằng xác suất có điều kiện, rồi suy ra định lý Bayes.

## 5. Xác suất có điều kiện, độc lập và định lý Bayes

Trong Ví dụ 10.2, xác suất có người và có cảnh báo bằng $0{,}18$, còn xác suất có cảnh báo bằng $0{,}26$. Khi chỉ xét các khung hình có cảnh báo, ta đã thu hẹp tập kết quả đang xét, và các trọng số cần được chuẩn hóa lại trên tập đó.

### 5.1. Chuẩn hóa sau khi có thông tin

Một cách trực quan, biết $F$ đã xảy ra nghĩa là loại mọi kết quả ngoài $F$ và chia trọng số của các kết quả còn lại cho tổng của chúng. Định nghĩa sau phát biểu chính xác phép chuẩn hóa này.

::: definition Định nghĩa 10.9 (Xác suất có điều kiện)
Cho $E,F\in\mathcal F$ với $\mathbb P(F)>0$. *Xác suất có điều kiện* (conditional probability) của $E$ khi biết $F$ là

$$
\mathbb P(E\mid F)=\frac{\mathbb P(E\cap F)}{\mathbb P(F)}.
\tag{5.1}
$$
:::

Định nghĩa 10.9 trùng Định nghĩa 05c.8. Phép giao giữ lại phần của $E$ nằm trong $F$, còn phép chia cho $\mathbb P(F)>0$ làm tổng trọng số trong $F$ bằng $1$. Với $F$ cố định, ánh xạ $E\mapsto\mathbb P(E\mid F)$ là một độ đo xác suất trên $\mathcal F$ gán xác suất $1$ cho $F$:

- **Không âm và chuẩn hóa:** $\mathbb P(E\cap F)\ge0$, và $\mathbb P(\Omega\mid F)=\mathbb P(F)/\mathbb P(F)=1$.
- **Cộng tính đếm được:** nếu $E_1,E_2,\ldots$ đôi một xung khắc thì các tập $E_i\cap F$ cũng đôi một xung khắc; (P3) cho tổng xác suất của chúng, rồi mọi số hạng cùng được chia cho hằng số dương $\mathbb P(F)$.

Do đó mọi kết quả đã chứng minh cho $\mathbb P$, như Bổ đề 10.4 và Mệnh đề 10.6, cũng đúng cho $\mathbb P(\cdot\mid F)$.

**Câu hỏi.** Trong các khung hình có cảnh báo, tỉ lệ khung hình có người có bằng tỉ lệ cảnh báo trong các khung hình có người không?

Ví dụ sau tính cả hai đại lượng.

::: example Ví dụ 10.3 (Đọc lại cảnh báo của camera)
**Dữ kiện.** Theo Ví dụ 10.2: $\mathbb P(H\cap C)=0{,}18$, $\mathbb P(H\cap C^c)=0{,}02$, $\mathbb P(H^c\cap C)=0{,}08$, $\mathbb P(H^c\cap C^c)=0{,}72$; do đó $\mathbb P(H)=0{,}20$, $\mathbb P(H^c)=0{,}80$, $\mathbb P(C)=0{,}26$.

**Ba xác suất có điều kiện.** Theo (5.1),

$$
\begin{aligned}
\mathbb P(H\mid C)&=\frac{0{,}18}{0{,}26}=\frac9{13}\approx0{,}6923,\\
\mathbb P(C\mid H)&=\frac{0{,}18}{0{,}20}=0{,}90,\\
\mathbb P(C\mid H^c)&=\frac{0{,}08}{0{,}80}=0{,}10.
\end{aligned}
$$

Trong các khung hình có người, hệ thống cảnh báo với xác suất $0{,}90$. Trong các khung hình bị cảnh báo, xác suất thực sự có người chỉ khoảng $0{,}6923$. Hai điều kiện chọn ra hai nhóm khung hình khác nhau, nên hai xác suất không có lý do phải bằng nhau.

**Kiểm tra lại.** Phần bù trong nhóm có cảnh báo cho $\mathbb P(H^c\mid C)=0{,}08/0{,}26=4/13$, và $9/13+4/13=1$.
:::

Đổi chỗ hai biến cố trong ký hiệu điều kiện làm đổi đại lượng cần tính. Để đánh giá một cảnh báo từ phía người sử dụng, ta cần cả xác suất cảnh báo khi có đối tượng và tỉ lệ đối tượng trong luồng đầu vào; định lý Bayes dưới đây ghép hai đại lượng ấy.

### 5.2. Quy tắc nhân, xác suất toàn phần và định lý Bayes

Với hệ thống sản phẩm, dữ kiện được cho dưới dạng tỉ lệ trong từng nhóm: tỉ lệ lỗi trong hàng của mỗi nhà cung cấp, tỉ lệ cảnh báo trong nhóm sản phẩm lỗi. Để từ các tỉ lệ ấy tính xác suất đồng thời, ta nhân ngược lại phép chia trong (5.1).

Xác suất đồng thời tính được bằng *quy tắc nhân* (product rule) sau.

::: proposition Mệnh đề 10.10 (Quy tắc nhân) — chứng minh đầy đủ
**Giả thiết.** $E,F,G\in\mathcal F$.

**Kết luận.**

1. Nếu $\mathbb P(F)>0$ thì $\mathbb P(E\cap F)=\mathbb P(E\mid F)\,\mathbb P(F)$; nếu $\mathbb P(E)>0$ thì $\mathbb P(E\cap F)=\mathbb P(F\mid E)\,\mathbb P(E)$.
2. Nếu $\mathbb P(E\cap F)>0$ thì

$$
\begin{aligned}
&\mathbb P(E\cap F\cap G)\\
&\quad=\mathbb P(E)\,\mathbb P(F\mid E)\\
&\qquad\times\mathbb P(G\mid E\cap F).
\end{aligned}
\tag{5.2}
$$
:::

::: proof Chứng minh Mệnh đề 10.10
**Lộ trình.** Nhân hai vế của (5.1) với mẫu số, rồi áp dụng kết quả hai lần.

**Bước 1 (hai biến cố).** Khi $\mathbb P(F)>0$, nhân hai vế của (5.1) với $\mathbb P(F)$ được $\mathbb P(E\cap F)=\mathbb P(E\mid F)\mathbb P(F)$. Khi $\mathbb P(E)>0$, đổi vai $E$ và $F$ trong (5.1) được dạng thứ hai.

**Bước 2 (ba biến cố).** Vì $E\cap F\subseteq E$, Bổ đề 10.4 cho $\mathbb P(E)\ge\mathbb P(E\cap F)>0$, nên mọi xác suất có điều kiện trong (5.2) xác định. Áp dụng Bước 1 hai lần:

$$
\begin{aligned}
&\mathbb P(E\cap F\cap G)\\
&\quad=\mathbb P(G\mid E\cap F)\,\mathbb P(E\cap F)\\
&\quad=\mathbb P(G\mid E\cap F)\,\mathbb P(F\mid E)\,\mathbb P(E).
\end{aligned}
$$

Đẳng thức thứ nhất là Bước 1 với điều kiện $E\cap F$; đẳng thức thứ hai là Bước 1 với điều kiện $E$. Sắp lại thứ tự các thừa số được (5.2). $\square$

Quy tắc nhân cho phép dựng xác suất đồng thời của nhiều thành phần từ các xác suất có điều kiện theo thứ tự của cơ chế sinh dữ liệu: chọn nhà cung cấp, rồi tình trạng lỗi, rồi phản hồi cảm biến.
:::

Mệnh đề 10.10 là Mệnh đề 05c.9 với hai và ba biến cố. Công thức (5.2) còn được gọi là *quy tắc chuỗi* (chain rule); nó không giả thiết độc lập, vì mọi phụ thuộc được giữ trong các xác suất có điều kiện.

Một *phân hoạch* (partition) $B_1,\ldots,B_q$ của $\Omega$ là các biến cố đôi một xung khắc có hợp bằng $\Omega$: mỗi kết quả thuộc đúng một nhóm $B_j$. Nhóm có xác suất dương được dùng làm điều kiện; nhóm có xác suất $0$ góp $\mathbb P(E\cap B_j)\le\mathbb P(B_j)=0$ vào mọi tổng theo Bổ đề 10.4, nên có thể bỏ khỏi tổng.

::: theorem Định lý 10.11 (Xác suất toàn phần và Bayes) — chứng minh đầy đủ
**Giả thiết.** $B_1,\ldots,B_q$ là một phân hoạch hữu hạn của $\Omega$ với $\mathbb P(B_j)>0$ cho mọi $j$; $E\in\mathcal F$.

**Kết luận.** *Công thức xác suất toàn phần* (law of total probability):

$$
\mathbb P(E)=\sum_{j=1}^q\mathbb P(E\mid B_j)\,\mathbb P(B_j).
\tag{5.3}
$$

Nếu thêm $\mathbb P(E)>0$, *định lý Bayes* (Bayes' rule) cho, với $k=1,\ldots,q$,

$$
\begin{aligned}
&\mathbb P(B_k\mid E)\\
&\quad=\frac{\mathbb P(E\mid B_k)\,\mathbb P(B_k)}{\sum_{j=1}^q\mathbb P(E\mid B_j)\,\mathbb P(B_j)}.
\end{aligned}
\tag{5.4}
$$
:::

::: proof Chứng minh Định lý 10.11
**Lộ trình.** Phân hoạch $E$ theo các nhóm $B_j$, áp dụng cộng tính và quy tắc nhân, rồi dùng định nghĩa xác suất có điều kiện cho $B_k$.

**Bước 1 (toàn phần).** Các tập $E\cap B_j$ đôi một xung khắc, vì các $B_j$ đôi một xung khắc, và có hợp bằng $E\cap\Omega=E$. Do đó

$$
\begin{aligned}
\mathbb P(E)&=\sum_{j=1}^q\mathbb P(E\cap B_j)\\
&=\sum_{j=1}^q\mathbb P(E\mid B_j)\,\mathbb P(B_j).
\end{aligned}
$$

Đẳng thức thứ nhất là Bổ đề 10.4, phần 2; đẳng thức thứ hai là Mệnh đề 10.10, dùng $\mathbb P(B_j)>0$.

**Bước 2 (Bayes).** Với $\mathbb P(E)>0$,

$$
\begin{aligned}
\mathbb P(B_k\mid E)&=\frac{\mathbb P(B_k\cap E)}{\mathbb P(E)}\\
&=\frac{\mathbb P(E\mid B_k)\,\mathbb P(B_k)}{\mathbb P(E)}.
\end{aligned}
$$

Đẳng thức thứ nhất là Định nghĩa 10.9, đẳng thức thứ hai là Mệnh đề 10.10. Thay $\mathbb P(E)$ ở mẫu số bằng (5.3) được (5.4). $\square$

Như vậy hậu nghiệm của mỗi nhóm tính được từ tiên nghiệm của các nhóm và xác suất của quan sát trong từng nhóm, không cần biết trước $\mathbb P(E)$.
:::

Định lý 10.11 gộp Mệnh đề 05c.10 và Định lý 05c.11. Ở đây ta đọc các thành phần của (5.4) như một phép cập nhật thông tin:

- $\mathbb P(B_k)$ là *xác suất tiên nghiệm* (prior) của giả thuyết $B_k$, trước khi quan sát;
- $\mathbb P(E\mid B_k)$, xem như hàm của $k$ khi quan sát $E$ đã cố định, là *hàm hợp lý* (likelihood); tổng của nó theo $k$ không nhất thiết bằng $1$;
- $\mathbb P(B_k\mid E)$ là *xác suất hậu nghiệm* (posterior), sau khi quan sát;
- mẫu số $\mathbb P(E)=\sum_j\mathbb P(E\mid B_j)\mathbb P(B_j)$ là *hợp lý biên* (marginal likelihood), vì nó cộng theo mọi giả thuyết.

Công thức toàn phần đi từ các nhóm đến xác suất của quan sát; Bayes đi theo chiều ngược lại, từ quan sát về xác suất của từng nhóm. Vì mẫu số không phụ thuộc $k$, ta có, theo $k$,

$$
\mathbb P(B_k\mid E)\propto\mathbb P(E\mid B_k)\,\mathbb P(B_k),
\tag{5.5}
$$

trong đó $\propto$ nghĩa là hai vế bằng nhau sai khác một hằng số dương không phụ thuộc $k$. Tóm lại, hậu nghiệm tỉ lệ với tiên nghiệm nhân hợp lý, và hằng số tỉ lệ được xác định bằng điều kiện tổng các hậu nghiệm bằng $1$.

### 5.3. Xác suất tiên nghiệm và hậu nghiệm của sản phẩm lỗi

Camera chỉ có tình trạng thực và phản hồi của hệ thống. Hệ thống sản phẩm có thêm nhà cung cấp, và các nhà cung cấp có tỉ lệ lỗi khác nhau. Ví dụ sau đi qua giai đoạn 2 và giai đoạn 3 của hệ thống: tính tiên nghiệm từ tỉ lệ lỗi theo nhà cung cấp, rồi cập nhật bằng quan sát của cảm biến.

::: example Ví dụ 10.4 (Cập nhật xác suất sản phẩm lỗi)
**Dữ kiện.** Chọn ngẫu nhiên một sản phẩm trong luồng hàng. Viết $\{S=a\}$, $\{S=b\}$ cho biến cố sản phẩm đến từ nhà cung cấp $a$, $b$; $\{Y=1\}$, $\{Y=0\}$ cho biến cố sản phẩm lỗi, đạt; $\{A=1\}$, $\{A=0\}$ cho biến cố cảm biến cảnh báo, không cảnh báo. Ở mục này ta chỉ dùng chúng như tên của các biến cố. Các tham số là

$$
\begin{aligned}
\mathbb P(S=a)&=0{,}60,\\
\mathbb P(S=b)&=0{,}40,\\
\mathbb P(Y=1\mid S=a)&=0{,}02,\\
\mathbb P(Y=1\mid S=b)&=0{,}08,\\
\mathbb P(A=1\mid Y=1)&=0{,}90,\\
\mathbb P(A=1\mid Y=0)&=0{,}05.
\end{aligned}
\tag{5.6}
$$

Xác suất $\mathbb P(A=1\mid Y=1)$ là *độ nhạy* (sensitivity) của cảm biến; $\mathbb P(A=1\mid Y=0)$ là *tỉ lệ cảnh báo nhầm* (false positive rate, FPR). Tỉ lệ này là xác suất có điều kiện trong nhóm sản phẩm đạt; nó khác xác suất đồng thời của biến cố cảnh báo sai, như $\mathbb P(H^c\cap C)$ của camera. Ngoài ra, khi tình trạng $Y$ đã biết, nhà cung cấp không làm đổi xác suất cảnh báo: với mọi $y\in\{0,1\}$ và $s\in\{a,b\}$,

$$
\begin{aligned}
&\mathbb P(A=1\mid Y=y,S=s)\\
&\quad=\mathbb P(A=1\mid Y=y).
\end{aligned}
\tag{5.7}
$$

**Tiên nghiệm.** Công thức toàn phần (5.3) với phân hoạch $\{S=a\},\{S=b\}$ cho

$$
\begin{aligned}
\mathbb P(Y=1)&=0{,}60\cdot0{,}02+0{,}40\cdot0{,}08\\
&=0{,}012+0{,}032\\
&=0{,}044.
\end{aligned}
$$

Nghĩa là trước khi có quan sát, xác suất sản phẩm lỗi là $4{,}4\%$, không phải trung bình cộng $5\%$ của hai tỉ lệ lỗi.

**Xác suất cảnh báo.** Công thức toàn phần với phân hoạch $\{Y=1\},\{Y=0\}$ cho

$$
\begin{aligned}
\mathbb P(A=1)&=0{,}90\cdot0{,}044\\
&\quad+0{,}05\cdot0{,}956\\
&=0{,}0396+0{,}0478\\
&=0{,}0874.
\end{aligned}
\tag{5.8}
$$

**Hậu nghiệm.** Định lý Bayes (5.4) với $E=\{A=1\}$ cho

$$
\begin{aligned}
&\mathbb P(Y=1\mid A=1)\\
&\quad=\frac{0{,}90\cdot0{,}044}{0{,}0874}=\frac{0{,}0396}{0{,}0874}\\
&\quad=\frac{198}{437}\approx0{,}4531.
\end{aligned}
\tag{5.9}
$$

Các phép tính (5.8)–(5.9) chỉ dùng $\mathbb P(A=1\mid Y=y)$; giả thiết (5.7) chỉ cần khi tính các xác suất có cả $S$ và $A$.

**Kiểm tra lại.** Xét $10\,000$ sản phẩm theo đúng các tỉ lệ của mô hình:

- $440$ sản phẩm lỗi, trong đó $0{,}9\cdot440=396$ bị cảnh báo;
- $9560$ sản phẩm đạt, trong đó $0{,}05\cdot9560=478$ bị cảnh báo nhầm.

Trong $396+478=874$ sản phẩm bị cảnh báo, tỉ lệ sản phẩm lỗi là $396/874=198/437$, khớp (5.9).

Kết quả này trả lời câu hỏi mở đầu: sau cảnh báo, xác suất lỗi tăng từ $0{,}044$ lên khoảng $0{,}4531$, thấp hơn nhiều so với $0{,}90$; trong nhóm bị cảnh báo vẫn có khoảng $0{,}5469$ sản phẩm đạt.
:::

Cây dưới đây biểu diễn phần mô hình trước khi quan sát cảm biến. Mỗi đường từ gốc tới lá là một tích theo quy tắc nhân (Mệnh đề 10.10); cộng hai lá lỗi là công thức toàn phần (5.3). Các nhánh không đồng xác suất.

![Cây xác suất: chọn nhà cung cấp a với xác suất 0,60, rồi lỗi với xác suất 0,02 hoặc đạt với xác suất 0,98, cho hai xác suất đồng thời 0,012 và 0,588. Nhà cung cấp b có xác suất 0,40, rồi lỗi 0,08 hoặc đạt 0,92, cho 0,032 và 0,368. Cộng hai lá lỗi được xác suất lỗi 0,044.](img/lec-10/supplier-probability-tree.svg)

Trong học máy, (5.9) là phép cập nhật xác suất của một nhãn chưa quan sát sau khi thấy một tín hiệu. Tiên nghiệm (tỉ lệ lỗi theo nguồn hàng) và hợp lý (đặc tính cảm biến) là hai thành phần riêng của công thức. Vì vậy khi cơ cấu nguồn hàng thay đổi, hậu nghiệm thay đổi dù cảm biến giữ nguyên, và độ nhạy $0{,}90$ không thay được xác suất lỗi sau cảnh báo.

### 5.4. Độc lập và độc lập có điều kiện

Quy tắc nhân luôn mang theo các điều kiện. Để bỏ bớt một điều kiện, chẳng hạn thay $\mathbb P(A=1\mid Y=y,S=s)$ bằng $\mathbb P(A=1\mid Y=y)$ như trong (5.7), chúng ta cần một giả thiết độc lập được phát biểu rõ.

::: definition Định nghĩa 10.12 (Độc lập của biến cố)
Hai biến cố $E,F\in\mathcal F$ *độc lập* (independent) nếu

$$
\mathbb P(E\cap F)=\mathbb P(E)\,\mathbb P(F).
\tag{5.10}
$$

Một họ hữu hạn biến cố *độc lập đồng thời* (mutually independent) nếu đẳng thức tích đúng cho giao của mọi họ con có ít nhất hai phần tử.
:::

Định nghĩa 10.12 trùng Định nghĩa 05c.12. Khi $\mathbb P(F)>0$, chia hai vế của (5.10) cho $\mathbb P(F)$ được dạng tương đương $\mathbb P(E\mid F)=\mathbb P(E)$: biết $F$ không làm đổi xác suất của $E$. Kiểm tra từng cặp chưa đủ để kết luận một họ độc lập đồng thời (Nhận xét 05c.13).

Độc lập là tính chất của độ đo xác suất, còn xung khắc là tính chất của phép giao tập hợp. Nếu $E,F$ xung khắc và đều có xác suất dương thì $\mathbb P(E\cap F)=0<\mathbb P(E)\mathbb P(F)$, nên chúng phụ thuộc: biết $F$ xảy ra thì biết chắc $E$ không xảy ra. Nếu một trong hai biến cố có xác suất $0$ thì hai biến cố luôn độc lập, vì cả hai vế của (5.10) bằng $0$ theo Bổ đề 10.4.

::: example Ví dụ 10.5 (Kiểm tra độc lập trên bảng camera)
**Dữ kiện.** Theo Ví dụ 10.2: $\mathbb P(H\cap C)=0{,}18$, $\mathbb P(H)=0{,}20$, $\mathbb P(C)=0{,}26$.

**So sánh với tích.** Ta có $\mathbb P(H)\,\mathbb P(C)=0{,}20\cdot0{,}26=0{,}052$, khác $\mathbb P(H\cap C)=0{,}18$. Vậy $H$ và $C$ phụ thuộc.

**Dạng có điều kiện.** Tương đương, $\mathbb P(C\mid H)=0{,}90$ khác $\mathbb P(C)=0{,}26$.

**Kiểm tra lại.** Với phần bù: $\mathbb P(H\cap C^c)=0{,}02$, còn $\mathbb P(H)\,\mathbb P(C^c)=0{,}20\cdot0{,}74=0{,}148$; hai số cũng khác nhau.

Một bộ phát hiện có ích phải làm cảnh báo phụ thuộc vào sự có mặt của người. Nếu $C$ độc lập với $H$ thì $\mathbb P(H\mid C)=\mathbb P(H)=0{,}20$: cảnh báo không làm thay đổi xác suất có người.
:::

Trong hệ thống sản phẩm, giả thiết cần dùng là độc lập bên trong từng nhóm có cùng tình trạng lỗi.

::: definition Định nghĩa 10.13 (Độc lập có điều kiện của biến cố)
Cho $G\in\mathcal F$ với $\mathbb P(G)>0$. Hai biến cố $E,F$ *độc lập có điều kiện* (conditionally independent) khi biết $G$ nếu

$$
\begin{aligned}
&\mathbb P(E\cap F\mid G)\\
&\quad=\mathbb P(E\mid G)\,\mathbb P(F\mid G).
\end{aligned}
\tag{5.11}
$$
:::

Định nghĩa 10.13 trùng Định nghĩa 05c.15 và là Định nghĩa 10.12 áp dụng cho độ đo $\mathbb P(\cdot\mid G)$. Khi $\mathbb P(F\cap G)>0$, nó tương đương với $\mathbb P(E\mid F\cap G)=\mathbb P(E\mid G)$, vì theo Định nghĩa 10.9

$$
\begin{aligned}
\mathbb P(E\mid F\cap G)&=\frac{\mathbb P(E\cap F\cap G)}{\mathbb P(F\cap G)}\\
&=\frac{\mathbb P(E\cap F\mid G)}{\mathbb P(F\mid G)}.
\end{aligned}
$$

Với $E=\{A=1\}$, $F=\{S=s\}$, $G=\{Y=y\}$, dạng tương đương này chính là (5.7). Nghĩa là trong nhóm sản phẩm có cùng tình trạng lỗi, biết nguồn hàng không làm đổi xác suất cảnh báo.

Độc lập có điều kiện không kéo theo độc lập, và chiều ngược lại cũng sai. Ví dụ sau cho cả hai hiện tượng.

::: example Ví dụ 10.6 (Độc lập trong từng nhóm, phụ thuộc khi gộp)
**Dữ kiện.** Mô hình sản phẩm (5.6), với giả thiết (5.7).

**Phần 1: độc lập có điều kiện nhưng phụ thuộc.** Áp dụng công thức toàn phần cho độ đo $\mathbb P(\cdot\mid S=s)$ với phân hoạch $\{Y=1\},\{Y=0\}$, rồi dùng (5.7):

$$
\begin{aligned}
&\mathbb P(A=1\mid S=s)\\
&\quad=\sum_{y\in\{0,1\}}\mathbb P(A=1\mid Y=y)\\
&\qquad\times\mathbb P(Y=y\mid S=s).
\end{aligned}
$$

Thay số,

$$
\begin{aligned}
\mathbb P(A=1\mid S=a)&=0{,}90\cdot0{,}02\\
&\quad+0{,}05\cdot0{,}98\\
&=0{,}018+0{,}049\\
&=0{,}067,\\
\mathbb P(A=1\mid S=b)&=0{,}90\cdot0{,}08\\
&\quad+0{,}05\cdot0{,}92\\
&=0{,}072+0{,}046\\
&=0{,}118.
\end{aligned}
$$

Hai số khác nhau, nên biến cố cảnh báo và nguồn hàng phụ thuộc. Nhà cung cấp làm đổi tỉ lệ sản phẩm lỗi, và tỉ lệ ấy làm đổi xác suất cảnh báo; khi $Y$ đã biết, ảnh hưởng này nằm trọn trong điều kiện $Y$.

**Phần 2: độc lập nhưng phụ thuộc khi có điều kiện.** Tung hai đồng xu cân đối, lần tung thứ hai không chịu ảnh hưởng của lần thứ nhất; đặt $U,V\in\{0,1\}$ là kết quả, bốn cặp có cùng xác suất $1/4$. Khi đó $\{U=1\}$ và $\{V=1\}$ độc lập. Với $G=\{U=V\}$, $\mathbb P(G)=1/2$ và

$$
\begin{aligned}
&\mathbb P(U=1,V=1\mid G)=\frac{1/4}{1/2}=\frac12,\\
&\mathbb P(U=1\mid G)\,\mathbb P(V=1\mid G)\\
&\quad=\frac{1/4}{1/2}\cdot\frac{1/4}{1/2}=\frac14.
\end{aligned}
$$

**Kiểm tra lại phần 1.** Trung bình có trọng số của hai xác suất cảnh báo theo nguồn hàng bằng $0{,}6\cdot0{,}067+0{,}4\cdot0{,}118=0{,}0402+0{,}0472=0{,}0874$, khớp (5.8).

Do đó giả thiết độc lập phải được nêu kèm điều kiện của nó: độc lập trong từng nhóm không suy ra độc lập khi gộp, và thêm một điều kiện có thể tạo ra phụ thuộc.
:::

Trong học máy, độc lập có điều kiện cho phép biểu diễn một phân phối nhiều biến bằng ít tham số hơn. Mỗi lần dùng nó cần một lý do mô hình hóa, chẳng hạn đáp ứng của cảm biến chỉ phụ thuộc tình trạng lỗi của sản phẩm.

Như vậy, từ phép chuẩn hóa của Định nghĩa 10.9, quy tắc nhân (Mệnh đề 10.10) và phép phân hoạch dẫn đến định lý Bayes (Định lý 10.11), cho phép tính hậu nghiệm $198/437$ trong Ví dụ 10.4; các Định nghĩa 10.12–10.13 cho biết khi nào một điều kiện được bỏ khỏi phép nhân. Tuy nhiên, các công cụ này chỉ xử lý từng biến cố. Để tính chi phí trung bình, số lỗi trong một lô hay mô tả một tín hiệu cảm biến liên tục, chúng ta cần các đại lượng số gắn với kết quả của thí nghiệm và phân phối của chúng; đó là nội dung của Mục 6.

## 6. Biến ngẫu nhiên và phân phối xác suất

Một lần kiểm định cho một kết quả đầy đủ: nhà cung cấp, tình trạng lỗi, cảnh báo và có thể nhiều giá trị đo. Khi quan tâm số sản phẩm lỗi, ta lấy một hàm của kết quả; khi quan tâm tín hiệu đo, ta lấy một hàm khác. Chúng ta cần mô tả các đại lượng ấy trên cùng một không gian xác suất, cùng với xác suất của các giá trị mà mỗi đại lượng có thể nhận.

### 6.1. Đại lượng quan sát là một hàm của kết quả

Mỗi đại lượng quan sát gán một số cho mỗi kết quả sơ cấp, nên ta mô hình hóa nó bằng một hàm trên $\Omega$ như sau.

::: definition Định nghĩa 10.14 (Biến ngẫu nhiên và phân phối)
Cho không gian xác suất $(\Omega,\mathcal F,\mathbb P)$. Một *biến ngẫu nhiên* (random variable) thực là ánh xạ $X:\Omega\to\mathbb R$ sao cho $\{\omega:X(\omega)\le t\}\in\mathcal F$ với mọi $t\in\mathbb R$; điều kiện này gọi là tính *đo được* (measurable).

*Phân phối* (distribution) của $X$ gán cho mỗi tập Borel $B\subseteq\mathbb R$ xác suất

$$
\begin{aligned}
&\mathbb P(X\in B)\\
&\quad=\mathbb P\bigl(\{\omega:X(\omega)\in B\}\bigr).
\end{aligned}
\tag{6.1}
$$

Tập Borel là các khoảng, các tập đơn điểm và mọi tập thu được từ chúng bằng phần bù và hợp đếm được. Một vector ngẫu nhiên trong $\mathbb R^d$ là một bộ $d$ biến ngẫu nhiên thực trên cùng $\Omega$. Một biến phân loại nhận giá trị trong một tập nhãn hữu hạn $\mathcal S$, với $\{\omega:X(\omega)=s\}\in\mathcal F$ cho mọi $s\in\mathcal S$.
:::

Biến ngẫu nhiên là một hàm cố định; giá trị của nó chưa biết vì kết quả $\omega$ chưa biết. Hai biến ngẫu nhiên có thể có cùng phân phối mà vẫn là hai hàm khác nhau trên $\Omega$. Ngược lại, cùng một hàm có phân phối khác khi độ đo $\mathbb P$ thay đổi, chẳng hạn khi cơ cấu nguồn hàng thay đổi. Trong mô hình hữu hạn với $\mathcal F=2^\Omega$, mọi hàm $X:\Omega\to\mathbb R$ đều đo được.

Với biến cố $F$ "sản phẩm lỗi", đặt $Y=\mathbf 1_F$, *biến chỉ thị* (indicator) của $F$: $Y(\omega)=1$ nếu $\omega\in F$ và $Y(\omega)=0$ nếu $\omega\notin F$. Khi đó $\{Y=1\}=F$, nên các biến cố của Mục 4 và Mục 5 vẫn được giữ trong ngôn ngữ mới. Các ký hiệu $S,Y,A$ của Ví dụ 10.4 là ba hàm trên cùng một kết quả kiểm định: hàm lấy nhãn nhà cung cấp, biến chỉ thị lỗi và biến chỉ thị cảnh báo. Một lần kiểm định cho cả ba giá trị.

### 6.2. Hàm khối xác suất và hàm phân phối tích lũy

Nhãn lỗi, nhãn nhà cung cấp và mức xử lý của sản phẩm chỉ nhận một số hữu hạn giá trị. Với các biến như vậy, phân phối được xác định bởi xác suất của từng giá trị.

::: definition Định nghĩa 10.15 (Hàm khối xác suất và hàm phân phối tích lũy)
Cho biến ngẫu nhiên $X$.

- Nếu $X$ nhận giá trị trong một tập hữu hạn hoặc đếm được $\mathcal X$, *hàm khối xác suất* (probability mass function, PMF) của $X$ là

$$
\begin{gathered}
p_X(x)=\mathbb P(X=x),\\
p_X(x)\ge0,\\
\sum_{x\in\mathcal X}p_X(x)=1.
\end{gathered}
\tag{6.2}
$$

- Nếu $X$ thực, *hàm phân phối tích lũy* (cumulative distribution function, CDF) của $X$ là hàm xác định với mọi $t\in\mathbb R$ bởi

$$
F_X(t)=\mathbb P(X\le t).
\tag{6.3}
$$
:::

Định nghĩa 10.15 trùng Định nghĩa 05c.17 và 05c.18. Tổng trong (6.2) bằng $1$ vì $\Omega$ là hợp đếm được của các biến cố xung khắc $\{X=x\}$, $x\in\mathcal X$, và (P3) áp dụng. Với $X$ rời rạc, cùng lập luận cho $F_X(t)=\sum_{x\le t}p_X(x)$.

Hàm $F_X$ không giảm: nếu $s<t$ thì $\{X\le s\}\subseteq\{X\le t\}$, nên $F_X(s)\le F_X(t)$ theo Bổ đề 10.4. Ngoài ra $F_X$ liên tục phải, tiến về $0$ khi $t\to-\infty$ và về $1$ khi $t\to+\infty$; ba tính chất này cần tính liên tục của độ đo xác suất đối với dãy tập đơn điệu và được dùng trong bài mà không chứng minh. Mệnh đề 05c.19 đã chứng minh tính không giảm và công thức hiệu dưới đây cho biến rời rạc. Với $t_1<t_2$, hai biến cố $\{X\le t_1\}$ và $\{t_1<X\le t_2\}$ xung khắc và có hợp $\{X\le t_2\}$, nên

$$
\mathbb P(t_1<X\le t_2)=F_X(t_2)-F_X(t_1).
$$

Dấu bằng ở hai đầu khoảng phải được giữ đúng: với phân phối rời rạc, thay $X>t_1$ bằng $X\ge t_1$ có thể thêm một khối xác suất dương.

::: example Ví dụ 10.7 (Biến ba giá trị và xác suất vượt ngưỡng)
**Dữ kiện.** Mức xử lý một sản phẩm là $X\in\{0;1;2\}$, lần lượt ứng với không can thiệp, kiểm tra lại và sửa chữa, với $p_X(0)=0{,}70$, $p_X(1)=0{,}20$, $p_X(2)=0{,}10$.

**Hàm phân phối tích lũy.** Cộng các khối xác suất đến $t$:

$$
F_X(t)=
\begin{cases}
0,&t<0,\\
0{,}70,&0\le t<1,\\
0{,}90,&1\le t<2,\\
1,&t\ge2.
\end{cases}
$$

**Xác suất vượt ngưỡng.** $\mathbb P(X\le1)=F_X(1)=0{,}90$, và theo (4.8), $\mathbb P(X\ge1)=1-\mathbb P(X=0)=0{,}30$.

**Kiểm tra lại.** $\mathbb P(0<X\le2)=F_X(2)-F_X(0)=1-0{,}70=0{,}30$, khớp tổng hai khối $0{,}20+0{,}10$.

Các mức $0$, $1$, $2$ là mã số quy ước; khoảng cách giữa chúng chỉ có ý nghĩa khi cách mã hóa phản ánh một đại lượng thật, chẳng hạn chi phí xử lý.
:::

Trong học máy, PMF phù hợp với nhãn phân loại, còn CDF phù hợp với các phát biểu vượt ngưỡng của một đại lượng có thứ tự. Khi các nhãn chỉ là các nhóm không có thứ tự, mã số của nhãn không tạo ra một đại lượng để lấy trung bình.

### 6.3. Độc lập của biến ngẫu nhiên

Giả thiết (5.7) được phát biểu cho từng cặp giá trị $(y,s)$. Với biến ngẫu nhiên, ta phát biểu độc lập cho mọi biến cố mà các biến xác định.

::: definition Định nghĩa 10.16 (Độc lập và độc lập có điều kiện của biến ngẫu nhiên)
Cho các biến ngẫu nhiên $X,Z$ trên cùng một không gian xác suất.

- $X$ và $Z$ *độc lập*, ký hiệu $X\perp Z$, nếu với mọi tập Borel $B_1,B_2$ (hoặc mọi tập con của tập nhãn, với biến phân loại),

$$
\begin{aligned}
&\mathbb P(X\in B_1,Z\in B_2)\\
&\quad=\mathbb P(X\in B_1)\,\mathbb P(Z\in B_2).
\end{aligned}
\tag{6.4}
$$

- Với các biến rời rạc $U,V,W$, $U$ và $V$ *độc lập có điều kiện* khi biết $W$, ký hiệu $U\perp V\mid W$, nếu với mọi $w$ có $p_W(w)>0$ và mọi $u,v$,

$$
\begin{aligned}
&\mathbb P(U=u,V=v\mid W=w)\\
&\quad=\mathbb P(U=u\mid W=w)\\
&\qquad\times\mathbb P(V=v\mid W=w).
\end{aligned}
\tag{6.5}
$$
:::

Độc lập của biến ngẫu nhiên mở rộng Định nghĩa 10.12 từ một cặp biến cố sang mọi cặp biến cố $\{X\in B_1\}$, $\{Z\in B_2\}$. Với $X,Z$ rời rạc, (6.4) tương đương với đẳng thức sau, đúng với mọi $x,z$:

$$
\mathbb P(X=x,Z=z)=p_X(x)\,p_Z(z).
$$

Chiều thuận có được bằng cách lấy $B_1=\{x\}$, $B_2=\{z\}$. Chiều ngược lại có được vì $\{X\in B_1,Z\in B_2\}$ là hợp đếm được của các biến cố xung khắc $\{X=x,Z=z\}$ với $x\in B_1$, $z\in B_2$, nên (P3) cho $\mathbb P(X\in B_1,Z\in B_2)=\sum_{x\in B_1}p_X(x)\sum_{z\in B_2}p_Z(z)$. Định nghĩa 05c.23 dùng dạng tích này cho biến rời rạc.

Đẳng thức (6.5) là Định nghĩa 10.13 áp dụng cho mọi bộ biến cố $\{U=u\}$, $\{V=v\}$, $\{W=w\}$. Giả thiết của hệ thống sản phẩm là $A\perp S\mid Y$. Để dùng nó trong quy tắc nhân, ta cần dạng "biết thêm $V$ không đổi phân phối của $U$" của mệnh đề sau.

::: proposition Mệnh đề 10.17 (Dạng tương đương của độc lập có điều kiện) — chứng minh đầy đủ
**Giả thiết.** $U,V,W$ là các biến rời rạc; $w$ là một giá trị với $p_W(w)>0$.

**Kết luận.** Hai phát biểu sau tương đương:

1. (6.5) đúng với giá trị $w$ này và mọi $u,v$;
2. với mọi $u$ và mọi $v$ có $\mathbb P(V=v,W=w)>0$,

$$
\begin{aligned}
&\mathbb P(U=u\mid V=v,W=w)\\
&\quad=\mathbb P(U=u\mid W=w).
\end{aligned}
\tag{6.6}
$$
:::

::: proof Chứng minh Mệnh đề 10.17
**Lộ trình.** Viết mọi xác suất có điều kiện thành tỉ số theo Định nghĩa 10.9; xử lý riêng các $v$ có $\mathbb P(V=v,W=w)=0$. Để gọn, viết $p(u,v,w)=\mathbb P(U=u,V=v,W=w)$ và tương tự cho các xác suất khác.

**Bước 1 (từ 1 suy ra 2).** Cho $v$ với $p(v,w)>0$; khi đó $p(v\mid w)=p(v,w)/p(w)>0$. Theo Định nghĩa 10.9 và giả thiết 1,

$$
\begin{aligned}
p(u\mid v,w)&=\frac{p(u,v,w)}{p(v,w)}\\
&=\frac{p(u,v\mid w)\,p(w)}{p(v\mid w)\,p(w)}\\
&=\frac{p(u\mid w)\,p(v\mid w)}{p(v\mid w)}\\
&=p(u\mid w).
\end{aligned}
$$

**Bước 2 (từ 2 suy ra 1, khi $p(v,w)>0$).** Đặt $\mathbb P_w=\mathbb P(\cdot\mid W=w)$. Xác suất có điều kiện theo $\mathbb P_w$ trùng với điều kiện theo cả hai biến cố:

$$
\begin{aligned}
&\mathbb P_w(U=u\mid V=v)\\
&\quad=\frac{p(u,v,w)/p(w)}{p(v,w)/p(w)}=p(u\mid v,w).
\end{aligned}
$$

Do đó Mệnh đề 10.10 cho độ đo $\mathbb P_w$ và giả thiết 2 cho

$$
\begin{aligned}
p(u,v\mid w)&=p(u\mid v,w)\,p(v\mid w)\\
&=p(u\mid w)\,p(v\mid w).
\end{aligned}
$$

**Bước 3 (từ 2 suy ra 1, khi $p(v,w)=0$).** Khi đó $p(v\mid w)=0$, nên vế phải của (6.5) bằng $0$. Vì $\{U=u,V=v,W=w\}\subseteq\{V=v,W=w\}$, Bổ đề 10.4 cho $p(u,v,w)\le p(v,w)=0$, nên vế trái cũng bằng $0$. $\square$

Với $U=A$, $V=S$, $W=Y$, mệnh đề cho phép thay $\mathbb P(A=a'\mid S=s,Y=y)$ bằng $\mathbb P(A=a'\mid Y=y)$ trong mọi phép nhân, và đó là cách giả thiết $A\perp S\mid Y$ làm giảm số tham số của mô hình.
:::

### 6.4. Mật độ và xác suất trên khoảng

Một giá trị cảm biến như độ dài hoặc điện áp thường được mô hình hóa là một số thực bất kỳ trong một khoảng. Mô hình như vậy không gán khối xác suất dương cho từng số thực; nó mô tả xác suất trên các khoảng bằng diện tích dưới một đường mật độ.

::: definition Định nghĩa 10.18 (Phân phối có mật độ)
Biến ngẫu nhiên thực $X$ có *hàm mật độ xác suất* (probability density function, PDF) $f_X$ nếu $f_X:\mathbb R\to[0,\infty)$ là hàm đo được, $\int_{\mathbb R}f_X(x)\,dx=1$, và với mọi tập Borel $B$,

$$
\mathbb P(X\in B)=\int_Bf_X(x)\,dx.
\tag{6.7}
$$
:::

Lấy $B=(-\infty,t]$ và $B=(t_1,t_2]$ trong (6.7), ta được

$$
\begin{gathered}
F_X(t)=\int_{-\infty}^tf_X(x)\,dx,\\
\mathbb P(t_1<X\le t_2)=\int_{t_1}^{t_2}f_X(x)\,dx.
\end{gathered}
\tag{6.8}
$$

Với $B=\{x\}$, tích phân trên một điểm bằng $0$, nên $\mathbb P(X=x)=0$ tại mọi $x$. Tại điểm $x$ mà $f_X$ liên tục, định lý cơ bản của giải tích cho $F_X'(x)=f_X(x)$. Định nghĩa 10.18 mở rộng Định nghĩa 05c.22 của Bài 05c.

Mật độ $f_X(x)$ có đơn vị là nghịch đảo đơn vị đo của $X$, còn xác suất không có đơn vị. Vì vậy giá trị mật độ có thể lớn hơn $1$. Chẳng hạn, phân phối đều trên đoạn $[0;\,0{,}1]$ có mật độ bằng $10$ trên đoạn đó và bằng $0$ bên ngoài; diện tích toàn phần là $10\cdot0{,}1=1$.

Tại nơi $f_X$ liên tục, xác suất trên một khoảng ngắn $[x,x+\Delta]$ xấp xỉ $f_X(x)\,\Delta$ khi $\Delta>0$ nhỏ. Nếu thiết bị làm tròn số đo, xác suất ghi nhận một giá trị hiển thị là xác suất của cả khoảng làm tròn, và có thể dương.

Có những phân phối vừa không rời rạc vừa không có mật độ. Một cảm biến có thể trả đúng $0$ khi tắt và trả một giá trị có mật độ khi hoạt động; phân phối khi đó có một khối tại $0$ và một phần liên tục. CDF vẫn được định nghĩa bởi (6.3). Trong các phép tính tiếp theo, ta nêu rõ đang dùng tổng cho mô hình rời rạc hay tích phân cho mô hình có mật độ.

### 6.5. Các họ phân phối cho nhãn và tín hiệu

Nhãn lỗi chỉ nhận hai giá trị, loại lỗi có thể nhận $K$ giá trị, còn một số đo nhận giá trị thực. Ba kiểu dữ liệu này được mô tả bằng ba họ phân phối, mỗi họ có một vài tham số.

::: definition Định nghĩa 10.19 (Phân phối Bernoulli và phân phối phân loại)
- Biến $Y\in\{0,1\}$ có *phân phối Bernoulli* với tham số $\theta\in[0,1]$, ký hiệu $Y\sim\operatorname{Bernoulli}(\theta)$, nếu

$$
\begin{gathered}
\mathbb P(Y=1)=\theta,\\
\mathbb P(Y=0)=1-\theta.
\end{gathered}
\tag{6.9}
$$

- Biến $Z\in\{1,\ldots,K\}$ có *phân phối phân loại* (categorical distribution) với tham số $\pi=(\pi_1,\ldots,\pi_K)$, ký hiệu $Z\sim\operatorname{Cat}(\pi)$, nếu

$$
\begin{gathered}
\mathbb P(Z=k)=\pi_k,\\
\pi_k\ge0,\qquad\sum_{k=1}^K\pi_k=1.
\end{gathered}
\tag{6.10}
$$
:::

Với $0<\theta<1$, PMF Bernoulli viết gọn được thành $p_Y(y)=\theta^y(1-\theta)^{1-y}$, $y\in\{0,1\}$; hai trường hợp biên $\theta=0$ và $\theta=1$ đọc trực tiếp từ (6.9). Bernoulli là phân phối phân loại với $K=2$ nhóm, mã hóa bằng $0$ và $1$. Phân phối phân loại có $K$ tham số nhưng chỉ $K-1$ tham số tự do, vì tổng của chúng bằng $1$. Phần Bernoulli của Định nghĩa 10.19 trùng mục 1 của Định nghĩa 05c.20; phân phối đều trên $\{1,\ldots,N\}$ của Định nghĩa 05c.20 là trường hợp riêng của phân phối phân loại với $K=N$ và $\pi_k=1/K$.

Trong Ví dụ 10.4, $Y\sim\operatorname{Bernoulli}(0{,}044)$ khi chưa biết nhà cung cấp; khi biết $S=a$, phân phối có điều kiện của $Y$ là $\operatorname{Bernoulli}(0{,}02)$. Cùng một biến lỗi có các phân phối khác nhau dưới các mức thông tin khác nhau. Nếu sản phẩm có nhiều loại lỗi loại trừ lẫn nhau, phân phối phân loại mô tả được nhãn loại lỗi; nếu một sản phẩm có thể mang đồng thời nhiều lỗi, một nhãn phân loại đơn lẻ không mô tả trực tiếp các lỗi cùng xuất hiện.

::: definition Định nghĩa 10.20 (Phân phối Gaussian)
- Biến thực $T$ có *phân phối Gaussian* (còn gọi là phân phối chuẩn) một chiều với tham số $\mu\in\mathbb R$, $\sigma^2>0$, ký hiệu $T\sim\mathcal N(\mu,\sigma^2)$, nếu $T$ có mật độ cho bởi, với mọi $t\in\mathbb R$,

$$
\begin{aligned}
f_T(t)&=\frac{1}{\sqrt{2\pi\sigma^2}}\\
&\quad\times\exp\Bigl(-\frac{(t-\mu)^2}{2\sigma^2}\Bigr).
\end{aligned}
\tag{6.11}
$$

- Với $\mu\in\mathbb R^d$ và ma trận đối xứng xác định dương $\Sigma\in\mathbb R^{d\times d}$, vector ngẫu nhiên $T$ có phân phối Gaussian nhiều chiều $\mathcal N(\mu,\Sigma)$ nếu nó có mật độ cho bởi, với mọi $t\in\mathbb R^d$,

$$
f_T(t)=\frac{\exp\bigl(-\frac12\Delta(t)\bigr)}{(2\pi)^{d/2}(\det\Sigma)^{1/2}},
\tag{6.12}
$$

trong đó $\Delta(t)=(t-\mu)^\top\Sigma^{-1}(t-\mu)$.
:::

Bài 05c gọi phân phối này là phân phối Gauss (Định nghĩa 05c.22). Hệ số trước hàm mũ của (6.11) bảo đảm chuẩn hóa: đổi biến $u=(t-\mu)/\sigma$ và dùng $\int_{\mathbb R}e^{-u^2/2}\,du=\sqrt{2\pi}$ cho $\int_{\mathbb R}f_T(t)\,dt=1$.

Mật độ đối xứng quanh $\mu$, nên ta gọi $\mu$ là tâm. Tăng $\sigma$ làm giảm chiều cao đỉnh $1/\sqrt{2\pi\sigma^2}$ và trải diện tích ra khoảng rộng hơn, nên $\sigma^2$ là tham số độ rộng. Với $\sigma^2=0$, biến trở thành hằng số và không có mật độ dạng (6.11).

Trong (6.12), các thành phần của vector có thể phụ thuộc nhau. Ma trận $\Sigma$ ghi mức phân tán của từng thành phần và quan hệ tuyến tính giữa chúng. Điều kiện xác định dương bảo đảm $\Sigma^{-1}$ tồn tại và $\det\Sigma>0$. Gaussian suy biến, với $\Sigma$ chỉ nửa xác định dương, tập trung trên một không gian con và không có mật độ dạng (6.12).

Như vậy, Định nghĩa 10.14 đưa mỗi đại lượng quan sát về một hàm trên không gian xác suất; Định nghĩa 10.15 và Định nghĩa 10.18 cho hai cách tính xác suất, bằng tổng và bằng tích phân; Định nghĩa 10.16 và Mệnh đề 10.17 phát biểu độc lập ở mức biến; các Định nghĩa 10.19–10.20 cho các họ phân phối có tham số cụ thể. Tuy nhiên, một phân phối là cả một hàm, trong khi đơn vị vận hành cần vài con số: số lỗi trung bình trong một lô, chi phí trung bình của một quy tắc cảnh báo, mức dao động quanh các trung bình ấy. Trong Mục 7, chúng ta định nghĩa các con số đó và chứng minh các quy tắc tính chúng.

## 7. Kỳ vọng, phương sai và hàm của biến ngẫu nhiên

Phân phối của biến lỗi $Y$ cho biết xác suất của từng giá trị, nhưng một đơn vị vận hành còn cần dự kiến số sản phẩm lỗi và chi phí kiểm định trên nhiều sản phẩm. Chúng ta cần một phép lấy trung bình có tính đến xác suất, rồi một đại lượng đo mức phân tán quanh trung bình ấy. Các đại lượng này được tính từ phân phối, không cần một mẫu dữ liệu.

### 7.1. Kỳ vọng

Biến $Y$ nhận $0$ và $1$, nhưng hai giá trị không có trọng số bằng nhau: trong mô hình hai nhà cung cấp, $\mathbb P(Y=1)=0{,}044$. Trung bình theo mô hình vì vậy nằm gần $0$ hơn $1$. Kỳ vọng là trung bình các giá trị của biến, mỗi giá trị nhân với xác suất của nó.

::: definition Định nghĩa 10.21 (Kỳ vọng)
Cho biến ngẫu nhiên thực $X$.

- Nếu $X$ rời rạc với tập giá trị đếm được $\mathcal X$ và $\sum_{x\in\mathcal X}|x|\,p_X(x)<\infty$, *kỳ vọng* (expectation) của $X$ là

$$
\mathbb E[X]=\sum_{x\in\mathcal X}x\,p_X(x).
\tag{7.1}
$$

- Nếu $X$ có mật độ $f_X$ và $\int_{\mathbb R}|x|\,f_X(x)\,dx<\infty$, kỳ vọng của $X$ là

$$
\mathbb E[X]=\int_{\mathbb R}x\,f_X(x)\,dx.
\tag{7.2}
$$

Điều kiện hữu hạn trong mỗi trường hợp được viết gọn là $\mathbb E|X|<\infty$; khi đó $X$ được gọi là *khả tích* (integrable).
:::

Định nghĩa 10.21 mở rộng Định nghĩa 05c.26 sang biến có mật độ. Điều kiện khả tích bảo đảm chuỗi (7.1) hội tụ tuyệt đối, nên giá trị của nó không phụ thuộc thứ tự cộng. Với biến không âm, có thể định nghĩa kỳ vọng bằng tổng hoặc tích phân không âm và cho phép giá trị $+\infty$; mọi phép tính dưới đây chỉ dùng kỳ vọng hữu hạn.

Kỳ vọng là một số suy ra từ mô hình. Nó không nhất thiết là một giá trị mà $X$ có thể nhận: biến Bernoulli chỉ nhận $0$ và $1$, nhưng kỳ vọng của nó có thể là $0{,}044$. Trung bình mẫu $\frac1n\sum_{i=1}^nx_i$ là một số tính từ dữ liệu đã quan sát; luật số lớn yếu (Định lý 05c.41) cho biết, khi $x_1,\ldots,x_n$ là giá trị của $n$ biến độc lập cùng phân phối với phương sai hữu hạn, trung bình mẫu gần kỳ vọng với xác suất tiến về $1$ khi $n\to\infty$.

### 7.2. Kỳ vọng của hàm và tính tuyến tính

Khi bộ phận kiểm định gán chi phí $g(x)$ cho kết quả $x$, đại lượng cần tính là $\mathbb E[g(X)]$. Tính theo Định nghĩa 10.21 đòi hỏi lập trước phân phối của biến mới $g(X)$. Mệnh đề sau cho phép tính trực tiếp trên phân phối của $X$, và cho phép tách kỳ vọng của một tổng chi phí thành tổng các kỳ vọng.

::: proposition Mệnh đề 10.22 (Kỳ vọng của hàm và tính tuyến tính) — chứng minh đầy đủ (rời rạc); phác thảo (có mật độ)
**Giả thiết.**

- **Biến:** $X$ rời rạc, nhận giá trị trong tập đếm được $\mathcal X\subseteq\mathbb R^d$; hoặc $X$ thực có mật độ $f_X$.
- **Hàm:** $g:\mathcal X\to\mathbb R$ thỏa $\sum_{x\in\mathcal X}|g(x)|\,p_X(x)<\infty$ (trường hợp rời rạc); hoặc $g:\mathbb R\to\mathbb R$ đo được thỏa $\int_{\mathbb R}|g(x)|\,f_X(x)\,dx<\infty$ (trường hợp có mật độ).
- **Tổ hợp tuyến tính:** $X,Z$ là hai biến thực rời rạc, khả tích; $\alpha,\beta,\gamma\in\mathbb R$.

**Kết luận.** Biến $g(X)$ khả tích, và trong trường hợp rời rạc

$$
\mathbb E[g(X)]=\sum_{x\in\mathcal X}g(x)\,p_X(x)
\tag{7.3}
$$

còn trong trường hợp có mật độ

$$
\mathbb E[g(X)]=\int_{\mathbb R}g(x)\,f_X(x)\,dx
\tag{7.4}
$$

Biến $\alpha X+\beta Z+\gamma$ khả tích và

$$
\begin{aligned}
&\mathbb E[\alpha X+\beta Z+\gamma]\\
&\quad=\alpha\,\mathbb E[X]+\beta\,\mathbb E[Z]+\gamma.
\end{aligned}
\tag{7.5}
$$
:::

::: proof Chứng minh Mệnh đề 10.22 (trường hợp rời rạc)
**Lộ trình.** Tìm phân phối của $g(X)$ bằng cách nhóm các giá trị $x$ có cùng ảnh, rồi đổi thứ tự tổng nhờ hội tụ tuyệt đối; tính tuyến tính có được bằng cách áp dụng (7.3) cho cặp $(X,Z)$.

**Bước 1 (phân phối của $g(X)$).** Biến $g(X)$ nhận giá trị trong tập đếm được $\mathcal U=g(\mathcal X)$. Với mỗi $u\in\mathcal U$, biến cố $\{g(X)=u\}$ là hợp đếm được của các biến cố xung khắc $\{X=x\}$ với $g(x)=u$, nên (P3) cho

$$
\mathbb P(g(X)=u)=\sum_{x:\,g(x)=u}p_X(x).
$$

**Bước 2 (khả tích).** Nhóm lại một chuỗi các số hạng không âm không đổi tổng, nên

$$
\begin{aligned}
&\sum_{u\in\mathcal U}|u|\,\mathbb P(g(X)=u)\\
&\quad=\sum_{u\in\mathcal U}\ \sum_{x:\,g(x)=u}|g(x)|\,p_X(x)\\
&\quad=\sum_{x\in\mathcal X}|g(x)|\,p_X(x)<\infty.
\end{aligned}
$$

**Bước 3 (công thức (7.3)).** Theo Bước 2, chuỗi $\sum_xg(x)p_X(x)$ hội tụ tuyệt đối, nên được phép nhóm các số hạng theo giá trị $u=g(x)$:

$$
\begin{aligned}
\mathbb E[g(X)]&=\sum_{u\in\mathcal U}u\,\mathbb P(g(X)=u)\\
&=\sum_{u\in\mathcal U}\ \sum_{x:\,g(x)=u}g(x)\,p_X(x)\\
&=\sum_{x\in\mathcal X}g(x)\,p_X(x).
\end{aligned}
$$

Đẳng thức thứ nhất là Định nghĩa 10.21, đẳng thức thứ hai dùng Bước 1, đẳng thức thứ ba đúng vì mỗi $x$ thuộc đúng một nhóm.

**Bước 4 (khả tích của tổ hợp).** Cặp $W=(X,Z)$ nhận giá trị trong tập đếm được $\mathcal X\times\mathcal Z$, với PMF $p_{X,Z}(x,z)=\mathbb P(X=x,Z=z)$. Với mỗi $x$, biến cố $\{X=x\}$ là hợp đếm được của các biến cố xung khắc $\{X=x,Z=z\}$, $z\in\mathcal Z$, nên (P3) cho

$$
\begin{gathered}
\sum_{z\in\mathcal Z}p_{X,Z}(x,z)=p_X(x),\\
\sum_{x\in\mathcal X}p_{X,Z}(x,z)=p_Z(z).
\end{gathered}
$$

Từ $|\alpha x+\beta z+\gamma|\le|\alpha||x|+|\beta||z|+|\gamma|$ và hai đẳng thức trên,

$$
\begin{aligned}
&\sum_{x,z}|\alpha x+\beta z+\gamma|\,p_{X,Z}(x,z)\\
&\quad\le|\alpha|\,\mathbb E|X|+|\beta|\,\mathbb E|Z|+|\gamma|\\
&\quad<\infty.
\end{aligned}
$$

**Bước 5 (tách tổng).** Áp dụng (7.3) cho $W$ và hàm $g(x,z)=\alpha x+\beta z+\gamma$. Ba chuỗi dưới đây hội tụ tuyệt đối theo Bước 4, nên được phép tách:

$$
\begin{aligned}
&\mathbb E[\alpha X+\beta Z+\gamma]\\
&\quad=\sum_{x,z}(\alpha x+\beta z+\gamma)\,p_{X,Z}(x,z)\\
&\quad=\alpha\sum_xx\sum_zp_{X,Z}(x,z)\\
&\qquad+\beta\sum_zz\sum_xp_{X,Z}(x,z)\\
&\qquad+\gamma\sum_{x,z}p_{X,Z}(x,z)\\
&\quad=\alpha\,\mathbb E[X]+\beta\,\mathbb E[Z]+\gamma.
\end{aligned}
$$

Dòng cuối dùng hai đẳng thức của Bước 4 và tổng các khối xác suất bằng $1$. $\square$

Như vậy kỳ vọng của một chi phí $g(X)$ tính được ngay trên bảng phân phối của $X$, và kỳ vọng của tổng chi phí bằng tổng các kỳ vọng mà không cần biết các thành phần có độc lập hay không.
:::

Công thức (7.4) được phác thảo ở Phụ lục B.1. Tính tuyến tính (7.5) còn đúng cho mọi cặp biến khả tích; trường hợp tổng quát cần tích phân Lebesgue và được thừa nhận trong bài. Áp dụng (7.5) lặp lại $n-1$ lần cho $X_1+\cdots+X_{n-1}$ và $X_n$, ta được $\mathbb E\bigl[\sum_{i=1}^nX_i\bigr]=\sum_{i=1}^n\mathbb E[X_i]$ với mọi $n$ biến khả tích.

Mệnh đề 10.22 gộp Mệnh đề 05c.27 và Định lý 05c.28, và thêm công thức (7.4) cho biến có mật độ.

Tính tuyến tính không mở rộng thành $\mathbb E[g(X)]=g(\mathbb E[X])$ với $g$ phi tuyến. Với biến chỉ thị, (7.3) cho $\mathbb E[\mathbf 1_E]=1\cdot\mathbb P(E)+0\cdot\mathbb P(E^c)=\mathbb P(E)$. Do đó kỳ vọng của một chi phí được gán theo các biến cố tính được bằng xác suất của chính các biến cố ấy.

::: example Ví dụ 10.8 (Chi phí kỳ vọng của một bộ cảnh báo)
**Dữ kiện.** Mô hình sản phẩm (5.6): $\mathbb P(Y=1)=0{,}044$, độ nhạy $0{,}9$, tỉ lệ cảnh báo nhầm $0{,}05$. Bỏ sót một sản phẩm lỗi tốn $5$ đơn vị chi phí; cảnh báo trên một sản phẩm đạt tốn $1$ đơn vị; hai phản hồi đúng có chi phí $0$. Biến chi phí (mất mát) là

$$
L=5\cdot\mathbf 1_{\{Y=1,A=0\}}+1\cdot\mathbf 1_{\{Y=0,A=1\}}.
$$

**Xác suất hai loại lỗi.** Theo Mệnh đề 10.10,

$$
\begin{aligned}
&\mathbb P(Y=1,A=0)\\
&\quad=\mathbb P(A=0\mid Y=1)\,\mathbb P(Y=1)\\
&\quad=0{,}1\cdot0{,}044=0{,}0044,\\
&\mathbb P(Y=0,A=1)\\
&\quad=\mathbb P(A=1\mid Y=0)\,\mathbb P(Y=0)\\
&\quad=0{,}05\cdot0{,}956=0{,}0478.
\end{aligned}
$$

**Chi phí kỳ vọng.** Theo (7.5) và $\mathbb E[\mathbf 1_E]=\mathbb P(E)$,

$$
\begin{aligned}
\mathbb E[L]&=5\cdot0{,}0044+1\cdot0{,}0478\\
&=0{,}022+0{,}0478\\
&=0{,}0698.
\end{aligned}
$$

**Kiểm tra lại.** Biến $L$ nhận các giá trị $0$; $1$; $5$ với xác suất $0{,}9478$; $0{,}0478$; $0{,}0044$. Tổng các xác suất bằng $1$, và (7.1) cho $0\cdot0{,}9478+1\cdot0{,}0478+5\cdot0{,}0044=0{,}0698$.

Xác suất phản hồi sai là $0{,}0044+0{,}0478=0{,}0522$, khác chi phí kỳ vọng $0{,}0698$ vì hai loại lỗi mang trọng số khác nhau. Với $n$ sản phẩm có cùng phân phối như trên, tổng chi phí có kỳ vọng $n\cdot0{,}0698$, kể cả khi kết quả của các sản phẩm phụ thuộc nhau.
:::

Trong học máy, một hàm mất mát gán một số cho mỗi cặp dự đoán và nhãn thật, như $L$ trong Ví dụ 10.8. Lấy kỳ vọng của mất mát đã là một bài toán xác suất trước khi chọn thuật toán tối ưu: đại lượng cần nhỏ là $\mathbb E[L]$, tính theo phân phối của dữ liệu.

### 7.3. Phương sai

Hai biến có cùng kỳ vọng có thể có phân phối rất khác nhau. Một chi phí luôn bằng $1$ và một chi phí bằng $0$ hoặc $2$ với xác suất bằng nhau đều có kỳ vọng $1$; biến thứ hai còn dao động quanh giá trị ấy. Để đo dao động mà các độ lệch dương và âm không triệt tiêu nhau, ta bình phương độ lệch trước khi lấy kỳ vọng.

::: definition Định nghĩa 10.23 (Phương sai và độ lệch chuẩn)
Cho biến ngẫu nhiên thực $X$ với $\mathbb E[X^2]<\infty$ và $\mu=\mathbb E[X]$. *Phương sai* (variance) của $X$ là

$$
\operatorname{Var}(X)=\mathbb E\bigl[(X-\mu)^2\bigr].
\tag{7.6}
$$

*Độ lệch chuẩn* (standard deviation) của $X$ là $\sqrt{\operatorname{Var}(X)}$.
:::

Điều kiện $\mathbb E[X^2]<\infty$ kéo theo $X$ khả tích, vì $|x|\le1+x^2$ với mọi $x$; do đó $\mu$ xác định. Phương sai có đơn vị là bình phương đơn vị của $X$; độ lệch chuẩn có cùng đơn vị với $X$. Định nghĩa 10.23 là một phần của Định nghĩa 05c.30.

::: proposition Mệnh đề 10.24 (Công thức tính phương sai) — chứng minh đầy đủ (rời rạc); dựa trên phác thảo ở Phụ lục B (có mật độ)
**Giả thiết.** $X$ rời rạc hoặc có mật độ, $\mathbb E[X^2]<\infty$; $\alpha,\beta\in\mathbb R$.

**Kết luận.**

$$
\begin{aligned}
&\operatorname{Var}(X)=\mathbb E[X^2]-(\mathbb E[X])^2,\\
&\operatorname{Var}(X)\ge0,\\
&\operatorname{Var}(\alpha X+\beta)=\alpha^2\operatorname{Var}(X).
\end{aligned}
\tag{7.7}
$$
:::

::: proof Chứng minh Mệnh đề 10.24
**Lộ trình.** Áp dụng (7.3) hoặc (7.4) cho các đa thức bậc hai của $X$, rồi tách tổng hoặc tích phân.

**Bước 1 (khai triển bình phương).** Đặt $\mu=\mathbb E[X]$. Hàm $g(x)=(x-\mu)^2=x^2-2\mu x+\mu^2$ thỏa $|g(x)|\le x^2+2|\mu||x|+\mu^2$, nên $g(X)$ khả tích. Trong trường hợp rời rạc, (7.3) và tính tuyến tính của chuỗi hội tụ tuyệt đối cho

$$
\begin{aligned}
&\mathbb E[(X-\mu)^2]\\
&\quad=\sum_x(x^2-2\mu x+\mu^2)\,p_X(x)\\
&\quad=\sum_xx^2p_X(x)-2\mu\sum_xx\,p_X(x)\\
&\qquad+\mu^2\sum_xp_X(x)\\
&\quad=\mathbb E[X^2]-2\mu^2+\mu^2\\
&\quad=\mathbb E[X^2]-\mu^2.
\end{aligned}
$$

Trường hợp có mật độ giống hệt, với (7.4) và tích phân thay cho tổng.

**Bước 2 (không âm).** Vì $(x-\mu)^2\ge0$ với mọi $x$, tổng hoặc tích phân trong (7.6) không âm.

**Bước 3 (biến đổi affine).** Áp dụng (7.3) hoặc (7.4) với $g(x)=\alpha x+\beta$: $\mathbb E[\alpha X+\beta]=\alpha\mu+\beta$. Độ lệch của $\alpha X+\beta$ quanh kỳ vọng của nó là $\alpha(X-\mu)$, nên

$$
\begin{aligned}
\operatorname{Var}(\alpha X+\beta)&=\mathbb E\bigl[\alpha^2(X-\mu)^2\bigr]\\
&=\alpha^2\,\mathbb E\bigl[(X-\mu)^2\bigr]\\
&=\alpha^2\operatorname{Var}(X).\ \square
\end{aligned}
$$

Công thức thứ nhất của (7.7) cho phép tính phương sai từ hai mômen $\mathbb E[X]$ và $\mathbb E[X^2]$; công thức thứ hai cho biết đổi đơn vị đo (nhân với $\alpha$) làm phương sai nhân với $\alpha^2$, còn dịch gốc (cộng $\beta$) không làm đổi phương sai.
:::

Công thức thứ nhất và công thức cuối của (7.7) là phần 1–2 của Mệnh đề 05c.31. Nếu $Y\sim\operatorname{Bernoulli}(\theta)$ thì $Y^2=Y$, nên $\mathbb E[Y^2]=\mathbb E[Y]=\theta$ và

$$
\operatorname{Var}(Y)=\theta-\theta^2=\theta(1-\theta).
\tag{7.8}
$$

Trong mô hình sản phẩm, $\theta=0{,}044$ nên $\operatorname{Var}(Y)=0{,}044\cdot0{,}956=0{,}042064$.

Với Gaussian $T\sim\mathcal N(\mu,\sigma^2)$ của Định nghĩa 10.20, tâm và tham số độ rộng chính là kỳ vọng và phương sai: $\mathbb E[T]=\mu$, $\operatorname{Var}(T)=\sigma^2$. Phép tính bằng đổi biến và tích phân từng phần nằm ở Phụ lục C.

::: example Ví dụ 10.9 (Kỳ vọng của một hàm phi tuyến)
**Dữ kiện.** Một mức chi phí $X$ nhận ba giá trị $0$; $1$; $4$ với xác suất lần lượt $0{,}5$; $0{,}3$; $0{,}2$.

**Hai mômen.** Theo (7.1) và (7.3) với $g(x)=x^2$,

$$
\begin{aligned}
\mathbb E[X]&=0\cdot0{,}5+1\cdot0{,}3+4\cdot0{,}2\\
&=1{,}1,\\
\mathbb E[X^2]&=0\cdot0{,}5+1\cdot0{,}3+16\cdot0{,}2\\
&=3{,}5.
\end{aligned}
$$

**Phương sai.** Theo (7.7), $\operatorname{Var}(X)=3{,}5-1{,}1^2=3{,}5-1{,}21=2{,}29$.

**Kiểm tra lại.** Theo định nghĩa (7.6): $0{,}5\cdot(0-1{,}1)^2+0{,}3\cdot(1-1{,}1)^2+0{,}2\cdot(4-1{,}1)^2=0{,}605+0{,}003+1{,}682=2{,}29$.

Nếu thay $\mathbb E[X^2]$ bằng $(\mathbb E[X])^2=1{,}21$, phương sai bị tính thành $0$. Tính tuyến tính (7.5) cho phép đưa tổng và hằng số qua kỳ vọng, nhưng không cho phép đưa bình phương qua kỳ vọng.
:::

Biết trung bình số lỗi chưa đủ để kết luận một lô cụ thể gần trung bình đến mức nào; bất đẳng thức Chebyshev (Hệ quả 05c.40) cần thêm phương sai. Phương sai của tổng số lỗi trong một lô lại phụ thuộc vào việc các lỗi có cùng xuất hiện hay không, nên chúng ta cần một đại lượng cho hai biến.

### 7.4. Hiệp phương sai, độc lập và phụ thuộc phi tuyến

Đại lượng đo mức hai biến cùng lệch khỏi kỳ vọng của chúng được định nghĩa như sau.

::: definition Định nghĩa 10.25 (Hiệp phương sai và hệ số tương quan)
Cho hai biến thực $X,Z$ với $\mathbb E[X^2]<\infty$, $\mathbb E[Z^2]<\infty$, và $\mu_X=\mathbb E[X]$, $\mu_Z=\mathbb E[Z]$. *Hiệp phương sai* (covariance) của $X$ và $Z$ là

$$
\begin{aligned}
&\operatorname{Cov}(X,Z)\\
&\quad=\mathbb E\bigl[(X-\mu_X)(Z-\mu_Z)\bigr].
\end{aligned}
\tag{7.9}
$$

Hai biến *không tương quan* (uncorrelated) nếu $\operatorname{Cov}(X,Z)=0$. Khi $\operatorname{Var}(X)>0$ và $\operatorname{Var}(Z)>0$, *hệ số tương quan* (correlation coefficient) là

$$
\rho_{XZ}=\frac{\operatorname{Cov}(X,Z)}{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Z)}}.
\tag{7.10}
$$
:::

Tích $XZ$ khả tích vì $2|xz|\le x^2+z^2$. Khai triển tích trong (7.9) và áp dụng tính tuyến tính (7.5) cho bốn số hạng:

$$
\begin{aligned}
\operatorname{Cov}(X,Z)&=\mathbb E[XZ]-\mu_X\mathbb E[Z]\\
&\quad-\mu_Z\mathbb E[X]+\mu_X\mu_Z\\
&=\mathbb E[XZ]-\mu_X\mu_Z.
\end{aligned}
$$

Với $Z=X$, ta có $\operatorname{Cov}(X,X)=\operatorname{Var}(X)$. Với Gaussian nhiều chiều $T\sim\mathcal N(\mu,\Sigma)$ của Định nghĩa 10.20, $\mu$ là vector kỳ vọng và $\Sigma_{ij}=\operatorname{Cov}(T_i,T_j)$ (Murphy (2022), §3.2.1). Hệ số tương quan luôn nằm trong $[-1,1]$ (Bài tập 10.12) và đo mức quan hệ *tuyến tính* giữa hai biến, không đo độ dốc của quan hệ đó. Định nghĩa 10.25 lấy phần hiệp phương sai của Định nghĩa 05c.30 và thêm hệ số tương quan.

Với một lô $n$ sản phẩm, số lỗi là tổng $N=\sum_{i=1}^nY_i$ của các biến chỉ thị lỗi. Mệnh đề sau cho phương sai của một tổng.

::: proposition Mệnh đề 10.26 (Phương sai của tổng) — chứng minh đầy đủ (rời rạc); trường hợp tổng quát dùng tính tuyến tính được thừa nhận
**Giả thiết.** $X_1,\ldots,X_n$ là các biến thực có mômen bậc hai hữu hạn.

**Kết luận.**

$$
\begin{aligned}
&\operatorname{Var}\Bigl(\sum_{i=1}^nX_i\Bigr)\\
&\quad=\sum_{i=1}^n\operatorname{Var}(X_i)\\
&\qquad+2\sum_{1\le i<j\le n}\operatorname{Cov}(X_i,X_j).
\end{aligned}
\tag{7.11}
$$
:::

::: proof Chứng minh Mệnh đề 10.26
**Lộ trình.** Viết tổng đã trừ kỳ vọng thành tổng các độ lệch, khai triển bình phương, rồi lấy kỳ vọng từng số hạng.

**Bước 1 (kỳ vọng của tổng).** Đặt $\mu_i=\mathbb E[X_i]$ và $D_i=X_i-\mu_i$. Tính tuyến tính cho $\mathbb E\bigl[\sum_iX_i\bigr]=\sum_i\mu_i$, nên độ lệch của tổng quanh kỳ vọng của nó là $\sum_iD_i$.

**Bước 2 (khai triển).** Với mọi kết quả,

$$
\begin{aligned}
\Bigl(\sum_{i=1}^nD_i\Bigr)^2&=\sum_{i=1}^nD_i^2\\
&\quad+2\sum_{1\le i<j\le n}D_iD_j.
\end{aligned}
$$

Mỗi số hạng khả tích: $D_i^2$ vì $\mathbb E[X_i^2]<\infty$, còn $D_iD_j$ vì $2|D_iD_j|\le D_i^2+D_j^2$.

**Bước 3 (lấy kỳ vọng).** Tính tuyến tính áp dụng cho tổng hữu hạn các số hạng khả tích ở Bước 2 cho

$$
\begin{aligned}
&\operatorname{Var}\Bigl(\sum_iX_i\Bigr)\\
&\quad=\sum_i\mathbb E[D_i^2]+2\sum_{i<j}\mathbb E[D_iD_j]\\
&\quad=\sum_i\operatorname{Var}(X_i)\\
&\qquad+2\sum_{i<j}\operatorname{Cov}(X_i,X_j).\ \square
\end{aligned}
$$

Như vậy phương sai của tổng chỉ bằng tổng các phương sai khi mọi hiệp phương sai bằng $0$; tổng số lỗi của một lô dao động mạnh hơn khi các lỗi có xu hướng cùng xuất hiện.
:::

Mệnh đề 10.26 trùng Mệnh đề 05c.33. Với $n=2$, nó cho $\operatorname{Var}(X+Z)=\operatorname{Var}(X)+\operatorname{Var}(Z)+2\operatorname{Cov}(X,Z)$; Murphy (2022), §2.8.4, viết cùng công thức dưới dạng $a^\top\Sigma a$ với $a=(1,1)$. Một điều kiện đủ để các hiệp phương sai bằng $0$ là độc lập.

::: proposition Mệnh đề 10.27 (Độc lập kéo theo không tương quan) — chứng minh đầy đủ
**Giả thiết.**

- **Độc lập:** $X\perp Z$ theo Định nghĩa 10.16.
- **Mômen:** $\mathbb E[X^2]<\infty$, $\mathbb E[Z^2]<\infty$.
- **Kiểu phân phối:** $X$ và $Z$ rời rạc.

**Kết luận.** $\mathbb E[XZ]=\mathbb E[X]\,\mathbb E[Z]$, do đó $\operatorname{Cov}(X,Z)=0$.
:::

::: proof Chứng minh Mệnh đề 10.27
**Lộ trình.** Viết $\mathbb E[XZ]$ thành chuỗi kép theo PMF đồng thời, dùng độc lập để tách PMF, rồi tách chuỗi kép thành tích hai chuỗi.

**Bước 1 (kỳ vọng của tích).** Áp dụng (7.3) cho cặp $(X,Z)$ và hàm $g(x,z)=xz$. Điều kiện của Mệnh đề 10.22 thỏa vì $\sum_{x,z}|xz|\,p_{X,Z}(x,z)=\mathbb E|XZ|\le\frac12\bigl(\mathbb E[X^2]+\mathbb E[Z^2]\bigr)<\infty$. Do đó $\mathbb E[XZ]=\sum_{x,z}xz\,p_{X,Z}(x,z)$.

**Bước 2 (dùng độc lập).** Theo dạng rời rạc của (6.4), $p_{X,Z}(x,z)=p_X(x)\,p_Z(z)$ với mọi $x,z$.

**Bước 3 (tách chuỗi).** Chuỗi kép $\sum_{x,z}|x||z|\,p_X(x)p_Z(z)=\mathbb E|X|\,\mathbb E|Z|$ hữu hạn, vì $X,Z$ khả tích. Chuỗi kép hội tụ tuyệt đối bằng tích của hai chuỗi, nên

$$
\begin{aligned}
&\mathbb E[XZ]=\sum_{x,z}xz\,p_X(x)\,p_Z(z)\\
&\quad=\Bigl(\sum_xx\,p_X(x)\Bigr)\Bigl(\sum_zz\,p_Z(z)\Bigr)\\
&\quad=\mathbb E[X]\,\mathbb E[Z].
\end{aligned}
$$

**Bước 4 (hiệp phương sai).** Thế vào $\operatorname{Cov}(X,Z)=\mathbb E[XZ]-\mathbb E[X]\mathbb E[Z]$ được $\operatorname{Cov}(X,Z)=0$. $\square$

Trong học máy, khi các đặc trưng độc lập đôi một, ma trận hiệp phương sai của chúng là ma trận đường chéo.
:::

Mệnh đề 10.27 trùng Mệnh đề 05c.32. Kết hợp với Mệnh đề 10.26: nếu các biến chỉ thị lỗi $Y_1,\ldots,Y_n$ độc lập và cùng phân phối $\operatorname{Bernoulli}(\theta)$, thì $\operatorname{Var}(N)=n\theta(1-\theta)$. Nếu các sản phẩm cùng chịu ảnh hưởng của một lô nguyên liệu, các hiệp phương sai có thể dương và công thức này đánh giá thấp dao động của $N$.

Chiều ngược lại của Mệnh đề 10.27 sai. Ví dụ sau dựng hai biến của dây chuyền có hiệp phương sai bằng $0$ nhưng phụ thuộc.

::: example Ví dụ 10.10 (Độ lệch kích thước và nhãn lỗi)
**Dữ kiện.** Độ lệch kích thước của một sản phẩm so với thiết kế, tính theo một đơn vị dung sai, là biến $X\in\{-2;-1;0;1;2\}$ với

$$
\begin{gathered}
p_X(-2)=p_X(2)=0{,}022,\\
p_X(-1)=p_X(1)=0{,}2,\\
p_X(0)=0{,}556.
\end{gathered}
$$

Trong ví dụ này, sản phẩm bị xếp lỗi khi lệch hai đơn vị về một trong hai phía: $Y=\mathbf 1_{\{|X|=2\}}$.

**Kiểm tra mô hình.** $2\cdot0{,}022+2\cdot0{,}2+0{,}556=0{,}044+0{,}4+0{,}556=1$, và $\mathbb P(Y=1)=0{,}022+0{,}022=0{,}044$, bằng tỉ lệ lỗi chung của mô hình hai nhà cung cấp.

**Kỳ vọng.** Do đối xứng, $\mathbb E[X]=-2\cdot0{,}022-1\cdot0{,}2+0+1\cdot0{,}2+2\cdot0{,}022=0$. Biến $XY$ bằng $X$ khi $|X|=2$ và bằng $0$ trong các trường hợp còn lại, nên

$$
\begin{aligned}
\mathbb E[XY]&=(-2)\cdot0{,}022+2\cdot0{,}022\\
&=0.
\end{aligned}
$$

**Hiệp phương sai.** $\operatorname{Cov}(X,Y)=\mathbb E[XY]-\mathbb E[X]\,\mathbb E[Y]=0-0\cdot0{,}044=0$.

**Phụ thuộc.** $\mathbb P(Y=1\mid X=2)=1$, trong khi $\mathbb P(Y=1)=0{,}044$. Tương đương,

$$
\begin{aligned}
&\mathbb P(X=0,Y=1)=0\\
&\quad\ne0{,}556\cdot0{,}044\\
&\quad=\mathbb P(X=0)\,\mathbb P(Y=1).
\end{aligned}
$$

**Kiểm tra lại.** Hai phương sai dương: $\operatorname{Var}(X)=\mathbb E[X^2]=4\cdot0{,}044+1\cdot0{,}4=0{,}576$ và $\operatorname{Var}(Y)=0{,}042064$ theo (7.8). Hiệp phương sai bằng $0$ không đến từ một biến hằng.

Độ lệch $X$ xác định hoàn toàn nhãn lỗi $Y$, nhưng quan hệ không tuyến tính: lệch về hai phía đều gây lỗi, nên các đóng góp của $X=-2$ và $X=2$ vào $\mathbb E[XY]$ triệt tiêu nhau. Một bước chọn đặc trưng chỉ giữ các đặc trưng có tương quan khác $0$ với nhãn sẽ loại $X$, dù $|X|$ dự đoán nhãn không sai lần nào.
:::

Murphy (2022), §3.1.3, dùng bản liên tục của hiện tượng này, với $X$ đều trên $(-1,1)$ và $X^2$ (Bài tập 10.11).

### 7.5. Kỳ vọng có điều kiện và kỳ vọng toàn phần

Tỉ lệ lỗi của nhà cung cấp $a$ là $0{,}02$, của nhà cung cấp $b$ là $0{,}08$. Khi đã biết nhà cung cấp, số lỗi dự kiến phải dùng tỉ lệ của nhóm ấy. Khi chưa biết nhà cung cấp, ta lấy trung bình các dự kiến theo xác suất của từng nhóm. Đây là phép lấy trung bình qua hai mức thông tin.

::: definition Định nghĩa 10.28 (Kỳ vọng có điều kiện theo một biến rời rạc)
Cho $X$ khả tích và $S$ rời rạc. Với mỗi $s$ thỏa $\mathbb P(S=s)>0$, *kỳ vọng có điều kiện* (conditional expectation) của $X$ khi biết $S=s$, ký hiệu $\psi(s)=\mathbb E[X\mid S=s]$, là kỳ vọng của $X$ dưới độ đo $\mathbb P(\cdot\mid S=s)$:

$$
\begin{aligned}
&\psi(s)=\mathbb E[X\mid S=s]\\
&\ =\sum_xx\,\mathbb P(X=x\mid S=s)
\end{aligned}
\tag{7.12}
$$

nếu $X$ rời rạc, hoặc $\psi(s)=\int_{\mathbb R}x\,f_{X\mid S}(x\mid s)\,dx$ nếu phân phối $\mathbb P(X\in\cdot\mid S=s)$ có mật độ $f_{X\mid S}(\cdot\mid s)$ theo Định nghĩa 10.18. Biến ngẫu nhiên $\psi(S)$ được ký hiệu $\mathbb E[X\mid S]$. Khi $\mathbb E[X^2]<\infty$, *phương sai có điều kiện* (conditional variance) khi biết $S=s$ là

$$
\begin{aligned}
v(s)&=\operatorname{Var}(X\mid S=s)\\
&=\mathbb E\bigl[(X-\psi(s))^2\mid S=s\bigr]\\
&=\mathbb E[X^2\mid S=s]-\psi(s)^2,
\end{aligned}
$$

và $\operatorname{Var}(X\mid S)$ là biến ngẫu nhiên $v(S)$.
:::

Đẳng thức thứ hai của phương sai có điều kiện là Mệnh đề 10.24 áp dụng cho độ đo $\mathbb P(\cdot\mid S=s)$; số $\mathbb E[X^2\mid S=s]$ hữu hạn khi $\mathbb P(S=s)>0$. Với $X$ rời rạc, vì $\mathbb P(X=x,S=s)\le p_X(x)$ theo Bổ đề 10.4,

$$
\begin{aligned}
&\mathbb E[X^2\mid S=s]\\
&\quad=\frac{1}{\mathbb P(S=s)}\sum_xx^2\,\mathbb P(X=x,S=s)\\
&\quad\le\frac{\mathbb E[X^2]}{\mathbb P(S=s)}<\infty.
\end{aligned}
$$

Ký hiệu $\mathbb E[X\mid S=s]$ chỉ một số khi $s$ đã cố định; $\mathbb E[X\mid S]=\psi(S)$ là một biến ngẫu nhiên vì giá trị của nó phụ thuộc vào $S$. Giá trị của $\psi$ tại các $s$ có xác suất $0$ có thể chọn tùy ý mà không ảnh hưởng đến phân phối của $\psi(S)$.

Với biến chỉ thị $Y$, (7.12) cho $\mathbb E[Y\mid S=s]=\mathbb P(Y=1\mid S=s)$.

Định lý sau, *kỳ vọng toàn phần* (law of total expectation), là bản kỳ vọng của công thức xác suất toàn phần, cho phân hoạch đếm được $\{S=s\}$.

::: theorem Định lý 10.29 (Kỳ vọng toàn phần) — chứng minh đầy đủ (rời rạc); phác thảo (có mật độ)
**Giả thiết.**

- **Biến cần lấy trung bình:** $X$ khả tích.
- **Biến điều kiện:** $S$ rời rạc, với tập giá trị hữu hạn hoặc đếm được.
- **Kiểu phân phối:** $X$ rời rạc, hoặc với mỗi $s$ có $\mathbb P(S=s)>0$ phân phối $\mathbb P(X\in\cdot\mid S=s)$ có mật độ.

**Kết luận.** Với mỗi $s$ có $\mathbb P(S=s)>0$, $\psi(s)$ hữu hạn; $\psi(S)$ khả tích và

$$
\begin{aligned}
\mathbb E[X]&=\sum_s\mathbb E[X\mid S=s]\\
&\qquad\times\mathbb P(S=s)\\
&=\mathbb E\bigl[\mathbb E[X\mid S]\bigr],
\end{aligned}
\tag{7.13}
$$

trong đó tổng chạy trên các $s$ có $\mathbb P(S=s)>0$.
:::

::: proof Chứng minh Định lý 10.29 (trường hợp $X$ rời rạc)
**Lộ trình.** Phân hoạch biến cố $\{X=x\}$ theo giá trị của $S$, đổi thứ tự hai tổng nhờ khả tích, rồi nhận ra tổng ngoài là kỳ vọng của $\psi(S)$. Trong chứng minh, $\sum_s$ chạy trên các $s$ có $\mathbb P(S=s)>0$.

**Bước 1 ($\psi(s)$ hữu hạn).** Với $\mathbb P(S=s)>0$,

$$
\begin{aligned}
&\sum_x|x|\,\mathbb P(X=x\mid S=s)\\
&\quad=\frac{1}{\mathbb P(S=s)}\\
&\qquad\times\sum_x|x|\,\mathbb P(X=x,S=s)\\
&\quad\le\frac{\mathbb E|X|}{\mathbb P(S=s)}<\infty,
\end{aligned}
$$

trong đó bất đẳng thức dùng $\mathbb P(X=x,S=s)\le p_X(x)$ (Bổ đề 10.4). Vậy chuỗi (7.12) hội tụ tuyệt đối.

**Bước 2 (phân hoạch đếm được).** Với mỗi $x$, $\{X=x\}$ là hợp đếm được của các biến cố xung khắc $\{X=x,S=s\}$. Theo (P3), $p_X(x)=\sum_{\text{mọi }s}\mathbb P(X=x,S=s)$. Các $s$ có $\mathbb P(S=s)=0$ góp $\mathbb P(X=x,S=s)\le\mathbb P(S=s)=0$; với các $s$ còn lại, Mệnh đề 10.10 cho $\mathbb P(X=x,S=s)=\mathbb P(X=x\mid S=s)\,\mathbb P(S=s)$. Do đó

$$
\begin{aligned}
p_X(x)&=\sum_s\mathbb P(X=x\mid S=s)\\
&\qquad\times\mathbb P(S=s).
\end{aligned}
$$

**Bước 3 (đổi thứ tự tổng).** Chuỗi kép $\sum_{x,s}|x|\,\mathbb P(X=x,S=s)=\sum_x|x|\,p_X(x)=\mathbb E|X|$ hữu hạn, nên được phép đổi thứ tự tổng:

$$
\begin{aligned}
\mathbb E[X]&=\sum_xx\sum_s\mathbb P(X=x\mid S=s)\\
&\qquad\times\mathbb P(S=s)\\
&=\sum_s\mathbb P(S=s)\\
&\qquad\times\sum_xx\,\mathbb P(X=x\mid S=s)\\
&=\sum_s\psi(s)\,\mathbb P(S=s).
\end{aligned}
$$

Đẳng thức thứ nhất dùng Bước 2, đẳng thức thứ hai đổi thứ tự hai tổng nhờ hội tụ tuyệt đối, đẳng thức thứ ba dùng (7.12).

**Bước 4 ($\psi(S)$ khả tích và nhận dạng).** Vì $|\psi(s)|\le\sum_x|x|\,\mathbb P(X=x\mid S=s)$,

$$
\begin{aligned}
&\sum_s|\psi(s)|\,\mathbb P(S=s)\\
&\quad\le\sum_s\sum_x|x|\,\mathbb P(X=x,S=s)\\
&\quad=\mathbb E|X|<\infty.
\end{aligned}
$$

Áp dụng (7.3) cho biến rời rạc $S$ và hàm $g=\psi$ được $\mathbb E[\psi(S)]=\sum_s\psi(s)\,\mathbb P(S=s)$, tức đẳng thức thứ hai của (7.13). $\square$

Như vậy trung bình chung của một đại lượng bằng trung bình có trọng số của các trung bình trong từng nhóm, với trọng số là xác suất của nhóm.
:::

Định lý 10.29 là phần 1 của Mệnh đề 05c.38; trường hợp có mật độ có điều kiện được phác thảo ở Phụ lục B. Áp dụng cho $X=Y$, ta tính lại tỉ lệ lỗi chung:

$$
\begin{aligned}
\mathbb E[Y]&=\mathbb E[Y\mid S=a]\,\mathbb P(S=a)\\
&\quad+\mathbb E[Y\mid S=b]\,\mathbb P(S=b)\\
&=0{,}02\cdot0{,}6+0{,}08\cdot0{,}4\\
&=0{,}044.
\end{aligned}
$$

Với $X$ là biến chỉ thị, (7.13) trở thành công thức xác suất toàn phần (5.3). Trong một hệ thống AI, $S$ có thể là nguồn dữ liệu hoặc nhóm môi trường; khi tỉ trọng các nhóm thay đổi, trung bình chung thay đổi dù trung bình trong từng nhóm giữ nguyên.

### 7.6. Mở rộng: phân rã phương sai

Kỳ vọng toàn phần tách trung bình theo nhóm. Phương sai cũng tách được thành hai phần: dao động bên trong từng nhóm và dao động giữa các trung bình nhóm.

::: proposition Mệnh đề 10.30 (Phân rã phương sai) — chứng minh đầy đủ (rời rạc)
**Giả thiết.** $X$ rời rạc với $\mathbb E[X^2]<\infty$; $S$ rời rạc; $\psi(S)=\mathbb E[X\mid S]$.

**Kết luận.** $\operatorname{Var}(X\mid S)$ và $\psi(S)^2$ khả tích, và

$$
\begin{aligned}
&\operatorname{Var}(X)\\
&\quad=\mathbb E\bigl[\operatorname{Var}(X\mid S)\bigr]\\
&\qquad+\operatorname{Var}\bigl(\mathbb E[X\mid S]\bigr).
\end{aligned}
\tag{7.14}
$$
:::

Chứng minh nằm ở Phụ lục A: nó áp dụng Định lý 10.29 cho $X^2$ và cho $X$, rồi dùng Mệnh đề 10.24 hai lần. Công thức (7.14) còn được gọi là *luật phương sai toàn phần* (law of total variance).

::: example Ví dụ 10.11 (Phân rã phương sai của nhãn lỗi)
**Dữ kiện.** $Y\in\{0,1\}$ là biến chỉ thị lỗi, $S$ là nhà cung cấp, với $\mathbb P(S=a)=0{,}6$, $\mathbb P(S=b)=0{,}4$, $\psi(a)=\mathbb P(Y=1\mid S=a)=0{,}02$, $\psi(b)=0{,}08$.

**Dao động trong nhóm.** Theo (7.8) cho phân phối có điều kiện, $\operatorname{Var}(Y\mid S=s)=\psi(s)(1-\psi(s))$, nên

$$
\begin{aligned}
&\mathbb E[\operatorname{Var}(Y\mid S)]\\
&\quad=0{,}6\cdot0{,}02\cdot0{,}98\\
&\qquad+0{,}4\cdot0{,}08\cdot0{,}92\\
&\quad=0{,}01176+0{,}02944\\
&\quad=0{,}0412.
\end{aligned}
$$

**Dao động giữa các nhóm.** Theo (7.7) cho biến $\psi(S)$,

$$
\begin{aligned}
&\operatorname{Var}(\psi(S))\\
&\quad=0{,}6\cdot0{,}02^2+0{,}4\cdot0{,}08^2\\
&\qquad-0{,}044^2\\
&\quad=0{,}00024+0{,}00256\\
&\qquad-0{,}001936\\
&\quad=0{,}000864.
\end{aligned}
$$

**Kiểm tra lại.** $0{,}0412+0{,}000864=0{,}042064$, khớp $\operatorname{Var}(Y)$ tính bằng (7.8).

Ở đây phần lớn dao động của nhãn lỗi nằm bên trong từng nhà cung cấp; biết nguồn hàng chỉ giải thích khoảng $0{,}000864/0{,}042064\approx2\%$ phương sai của $Y$.
:::

Như vậy, từ Định nghĩa 10.21, Mệnh đề 10.22 cho phép tính kỳ vọng của một hàm và của một tổng; Mệnh đề 10.24 và Mệnh đề 10.26 đo dao động; Mệnh đề 10.27 và Ví dụ 10.10 xác định vai trò và giới hạn của độc lập; Định lý 10.29 lấy trung bình khi dữ liệu gồm nhiều nhóm. Tuy nhiên, mọi phép tính của mục đều dựa trên phân phối của một hoặc hai biến đã cho sẵn. Với hệ thống sản phẩm, chúng ta có ba biến $S,Y,A$ được cho qua các xác suất có điều kiện, và quan sát chỉ gồm $A$. Trong Mục 8, chúng ta dựng phân phối đồng thời của cả ba biến, loại biến chưa quan sát bằng phép lấy biên, rồi chuẩn hóa theo quan sát.

## 8. Phân phối đồng thời, lấy biên và suy luận

Một cảnh báo $A=1$ chưa cho biết nhà cung cấp $S$ hay tình trạng lỗi $Y$. Mỗi biến riêng lẻ có một phân phối, nhưng ba phân phối riêng không xác định được cách các biến phụ thuộc nhau. Chúng ta cần một mô hình cho cả bộ $(S,Y,A)$, rồi loại các biến chưa biết bằng phép lấy tổng.

### 8.1. Phân phối đồng thời và phân phối biên

Mô hình cho nhiều biến cùng lúc là phân phối đồng thời của chúng, với hai dạng rời rạc và có mật độ.

::: definition Định nghĩa 10.31 (Phân phối đồng thời)
Cho hai biến ngẫu nhiên $X,Z$ trên cùng một không gian xác suất.

- Nếu $X,Z$ rời rạc, *hàm khối xác suất đồng thời* (joint PMF) của chúng là

$$
\begin{aligned}
&p_{X,Z}(x,z)\\
&\quad=\mathbb P(X=x,Z=z),\\
&p_{X,Z}(x,z)\ge0,\\
&\sum_x\sum_zp_{X,Z}(x,z)=1.
\end{aligned}
\tag{8.1}
$$

- $(X,Z)$ có *mật độ đồng thời* (joint density) $f_{X,Z}$ nếu $f_{X,Z}:\mathbb R^2\to[0,\infty)$ đo được, $\iint_{\mathbb R^2}f_{X,Z}(x,z)\,dz\,dx=1$, và với mọi tập Borel $B_1,B_2\subseteq\mathbb R$,

$$
\begin{aligned}
&\mathbb P(X\in B_1,Z\in B_2)\\
&\quad=\int_{B_1}\int_{B_2}f_{X,Z}(x,z)\,dz\,dx.
\end{aligned}
\tag{8.2}
$$
:::

Định nghĩa 10.31 mở rộng Định nghĩa 05c.23 sang trường hợp có mật độ. Phân phối của từng biến riêng, suy ra từ phân phối đồng thời, gọi là *phân phối biên* (marginal distribution); Bài 05c gọi hàm khối của nó là PMF lề. Mệnh đề sau cho cách tính nó; phép tính này gọi là *lấy biên* (marginalization), còn Murphy gọi công thức rời rạc là *quy tắc tổng* (sum rule).

::: proposition Mệnh đề 10.32 (Lấy biên) — chứng minh đầy đủ
**Giả thiết.** $X,Z$ rời rạc với PMF đồng thời $p_{X,Z}$; hoặc $(X,Z)$ có mật độ đồng thời $f_{X,Z}$.

**Kết luận.** Trong trường hợp rời rạc,

$$
\begin{gathered}
p_X(x)=\sum_zp_{X,Z}(x,z),\\
p_Z(z)=\sum_xp_{X,Z}(x,z).
\end{gathered}
\tag{8.3}
$$

Trong trường hợp có mật độ, các hàm

$$
\begin{gathered}
f_X(x)=\int_{\mathbb R}f_{X,Z}(x,z)\,dz,\\
f_Z(z)=\int_{\mathbb R}f_{X,Z}(x,z)\,dx
\end{gathered}
\tag{8.4}
$$

là mật độ của $X$ và của $Z$ theo Định nghĩa 10.18, sau khi đổi giá trị trên một tập có độ dài bằng $0$ nếu cần.
:::

::: proof Chứng minh Mệnh đề 10.32
**Lộ trình.** Trường hợp rời rạc dùng cộng tính đếm được trên phân hoạch $\{Z=z\}$; trường hợp có mật độ dùng (8.2) với $B_2=\mathbb R$ và định lý Fubini–Tonelli.

**Bước 1 (rời rạc).** Cố định $x$. Biến $Z$ nhận đúng một giá trị trong tập đếm được của nó tại mỗi kết quả, nên $\{X=x\}=\bigcup_z\{X=x,Z=z\}$, và các biến cố trong hợp đôi một xung khắc. Theo (P3), $p_X(x)=\sum_zp_{X,Z}(x,z)$. Đổi vai $X$ và $Z$ được đẳng thức thứ hai của (8.3).

**Bước 2 (có mật độ: công cụ).** Ta thừa nhận định lý Fubini–Tonelli của giải tích cho hàm không âm: nếu $f:\mathbb R^2\to[0,\infty)$ đo được thì $x\mapsto\int_{\mathbb R}f(x,z)\,dz$ là hàm đo được, nhận giá trị trong $[0,\infty]$, và tích phân lặp theo hai thứ tự bằng nhau và bằng tích phân kép.

**Bước 3 (có mật độ: xác suất của $\{X\in B\}$).** Với tập Borel $B$, ta có $\{X\in B\}=\{X\in B,Z\in\mathbb R\}$. Theo (8.2) với $B_1=B$, $B_2=\mathbb R$,

$$
\begin{aligned}
&\mathbb P(X\in B)\\
&\quad=\int_B\Bigl(\int_{\mathbb R}f_{X,Z}(x,z)\,dz\Bigr)dx\\
&\quad=\int_Bf_X(x)\,dx.
\end{aligned}
$$

**Bước 4 (có mật độ: $f_X$ là mật độ).** Theo Bước 2, $f_X$ đo được và không âm. Lấy $B=\mathbb R$ ở Bước 3 được $\int_{\mathbb R}f_X=1<\infty$, nên tập $\{f_X=+\infty\}$ có độ dài (độ đo Lebesgue) bằng $0$: nếu nó có độ dài dương, tích phân của $f_X$ trên nó đã bằng $+\infty$. Tích phân của mọi hàm không âm trên một tập có độ dài $0$ bằng $0$, nên đặt $f_X=0$ trên tập đó không đổi tích phân nào. Khi đó $f_X$ thỏa (6.7) với mọi $B$, tức là một mật độ của $X$. Đổi vai $X$ và $Z$ được $f_Z$. $\square$

Như vậy, lấy biên là cách loại một biến chưa quan sát khỏi mô hình bằng cách cộng hoặc tích phân theo mọi giá trị của nó, mà không thêm giả thiết nào về biến đó.
:::

Khi $(X,Z)$ có mật độ đồng thời, tính tuyến tính (7.5) và Mệnh đề 10.27 vẫn đúng; Phụ lục B.1–B.2 phác thảo hai trường hợp này.

Trong một bảng hai chiều, lấy biên nghĩa là cộng theo hàng hoặc theo cột. Với mật độ, miền tích phân phải phủ mọi giá trị của biến bị loại; tích phân trên cả $\mathbb R$ dùng được khi mật độ đã bằng $0$ ngoài miền giá trị. Viết $p_{X,Z}(x,z)=\mathbb P(X=x\mid Z=z)\,p_Z(z)$, công thức (8.3) trở thành công thức toàn phần (5.3) với phân hoạch $\{Z=z\}$.

Phân phối đồng thời chứa nhiều thông tin hơn hai phân phối biên. Chẳng hạn, hai biến $\operatorname{Bernoulli}(1/2)$ có thể độc lập, hoặc bằng nhau tại mọi kết quả. Hai mô hình có cùng phân phối biên, nhưng xác suất cả hai bằng $1$ lần lượt là $1/4$ và $1/2$. Vì vậy ghép hai phân phối biên bằng phép nhân là một giả thiết độc lập, cần được nêu ra.

### 8.2. Phân phối có điều kiện khi một biến đã được quan sát

Lấy biên trả lời câu hỏi về $X$ khi chưa biết $Z$. Khi đã biết $Z=z$, ta giữ phần mô hình phù hợp với quan sát đó rồi chuẩn hóa, như Định nghĩa 10.9 làm với biến cố.

::: proposition Mệnh đề 10.33 (Phân phối có điều kiện từ phân phối đồng thời) — chứng minh đầy đủ
**Giả thiết.** $X,Z$ rời rạc và $p_Z(z)>0$; hoặc $(X,Z)$ có mật độ đồng thời $f_{X,Z}$, $f_Z$ cho bởi (8.4), và $0<f_Z(z)<\infty$.

**Kết luận.** Trong trường hợp rời rạc, $p_{X\mid Z}(x\mid z)=\mathbb P(X=x\mid Z=z)$ thỏa

$$
\begin{gathered}
p_{X\mid Z}(x\mid z)=\frac{p_{X,Z}(x,z)}{p_Z(z)},\\
\sum_xp_{X\mid Z}(x\mid z)=1.
\end{gathered}
\tag{8.5}
$$

Trong trường hợp có mật độ, hàm

$$
f_{X\mid Z}(x\mid z)=\frac{f_{X,Z}(x,z)}{f_Z(z)}
\tag{8.6}
$$

không âm và có $\int_{\mathbb R}f_{X\mid Z}(x\mid z)\,dx=1$; nó được gọi là *mật độ có điều kiện* (conditional density) của $X$ khi biết $Z=z$.
:::

::: proof Chứng minh Mệnh đề 10.33
**Lộ trình.** Áp dụng Định nghĩa 10.9 cho các biến cố $\{X=x\}$, $\{Z=z\}$ rồi dùng (8.3); với mật độ, dùng (8.4).

**Bước 1 (rời rạc).** Đẳng thức thứ nhất của (8.5) là Định nghĩa 10.9 với $E=\{X=x\}$, $F=\{Z=z\}$. Cộng theo $x$ và dùng (8.3): $\sum_xp_{X,Z}(x,z)/p_Z(z)=p_Z(z)/p_Z(z)=1$.

**Bước 2 (có mật độ).** Tử số không âm, mẫu số dương, nên $f_{X\mid Z}\ge0$. Theo (8.4), $\int_{\mathbb R}f_{X,Z}(x,z)\,dx=f_Z(z)$; chia cho số dương hữu hạn $f_Z(z)$ được $1$. $\square$

Phân phối có điều kiện là phân phối đồng thời được cắt tại giá trị quan sát rồi chuẩn hóa; đại lượng $p(y\mid x)$ mà một bộ phân loại xác suất trả về là phân phối có điều kiện theo nghĩa này.
:::

Khi $Z$ có mật độ, biến cố $\{Z=z\}$ có xác suất $0$, nên (8.6) không phải phép chia $\mathbb P(X\in B,Z=z)/\mathbb P(Z=z)$. Nó xác định một mật độ theo giá trị quan sát của $Z$, phù hợp với phân tích $f_{X,Z}(x,z)=f_{X\mid Z}(x\mid z)\,f_Z(z)$. Hàm này chỉ được xác định duy nhất ngoài một tập giá trị $z$ có xác suất $0$; trong các mô hình có mật độ liên tục như Gaussian, công thức tỉ số là cách tính thông dụng.

Trong học máy, đầu vào $x$ thường là một vector liên tục, còn nhãn $y$ rời rạc. Mô hình $p(y\mid x)$ mô tả xác suất của nhãn theo giá trị của đầu vào, và không đòi hỏi một ảnh hay một vector cảm biến cụ thể có xác suất dương.

### 8.3. Lấy biên trên biến chưa quan sát trong hệ thống sản phẩm

Chúng ta trở lại hệ thống sản phẩm ở giai đoạn 3, với các tham số (5.6) và giả thiết $A\perp S\mid Y$ theo Định nghĩa 10.16: với mỗi tình trạng lỗi, cảm biến có cùng xác suất cảnh báo ở hai nhà cung cấp. Các tham số cảnh báo trong (5.6) chỉ xác định được phân phối của ba biến khi có thêm giả thiết này. Nếu kích thước hay bề mặt sản phẩm làm xác suất cảnh báo khác nhau giữa hai nhà cung cấp ngay cả khi cùng tình trạng lỗi, mô hình phải dùng $p_{A\mid S,Y}$ thay cho $p_{A\mid Y}$.

::: proposition Mệnh đề 10.34 (Phân tích nhân tử và lấy biên trên biến chưa quan sát) — chứng minh đầy đủ
**Giả thiết.** $S,Y,A$ là các biến rời rạc và $A\perp S\mid Y$.

**Kết luận.** Với mọi $s$ có $p_S(s)>0$, mọi $y$ có $p_Y(y)>0$ và mọi $a'$,

$$
\begin{aligned}
&p_{S,Y,A}(s,y,a')\\
&\quad=p_S(s)\,p_{Y\mid S}(y\mid s)\\
&\qquad\times p_{A\mid Y}(a'\mid y).
\end{aligned}
\tag{8.7}
$$

Nếu chỉ quan sát $A=a'$ với $p_A(a')>0$, thì với mọi $y$ có $p_Y(y)>0$,

$$
\begin{aligned}
&p_{Y\mid A}(y\mid a')\\
&\quad=\frac{\sum_sq(s,y)}{\sum_{y'}\sum_sq(s,y')},
\end{aligned}
\tag{8.8}
$$

trong đó $q(s,y)=p_S(s)\,p_{Y\mid S}(y\mid s)\,p_{A\mid Y}(a'\mid y)$ là vế phải của (8.7), và các tổng chạy trên các $s$ có $p_S(s)>0$ và các $y'$ có $p_Y(y')>0$. Nếu $p_Y(y)=0$ thì $p_{Y\mid A}(y\mid a')=0$.
:::

::: proof Chứng minh Mệnh đề 10.34
**Lộ trình.** Dùng quy tắc chuỗi và Mệnh đề 10.17 để được (8.7), rồi lấy biên theo $s$, theo $y$, và chuẩn hóa.

**Bước 1 (phân tích nhân tử khi $p_{S,Y}(s,y)>0$).** Mệnh đề 10.10 với $E=\{S=s\}$, $F=\{Y=y\}$, $G=\{A=a'\}$ cho

$$
\begin{aligned}
&p_{S,Y,A}(s,y,a')\\
&\quad=p_S(s)\,p_{Y\mid S}(y\mid s)\\
&\qquad\times\mathbb P(A=a'\mid S=s,Y=y).
\end{aligned}
$$

Mệnh đề 10.17 với $U=A$, $V=S$, $W=Y$ và $p_{S,Y}(s,y)>0$ cho $\mathbb P(A=a'\mid S=s,Y=y)=p_{A\mid Y}(a'\mid y)$, ta được (8.7).

**Bước 2 (phân tích nhân tử khi $p_{S,Y}(s,y)=0$).** Khi đó $p_{Y\mid S}(y\mid s)=p_{S,Y}(s,y)/p_S(s)=0$, nên vế phải của (8.7) bằng $0$. Vế trái thỏa $p_{S,Y,A}(s,y,a')\le p_{S,Y}(s,y)=0$ theo Bổ đề 10.4.

**Bước 3 (lấy biên theo $s$ và $y$).** Mệnh đề 10.32 cho cặp $\bigl((Y,A),S\bigr)$ cho $p_{Y,A}(y,a')=\sum_sp_{S,Y,A}(s,y,a')$; các $s$ có $p_S(s)=0$ góp $0$. Lấy biên tiếp theo $y$ cho $p_A(a')=\sum_{y'}p_{Y,A}(y',a')$; các $y'$ có $p_Y(y')=0$ góp $0$.

**Bước 4 (chuẩn hóa).** Mệnh đề 10.33 cho $p_{Y\mid A}(y\mid a')=p_{Y,A}(y,a')/p_A(a')$. Thay hai tổng của Bước 3, với số hạng cho bởi (8.7), được (8.8). Nếu $p_Y(y)=0$ thì $p_{Y,A}(y,a')\le p_Y(y)=0$ theo Bổ đề 10.4, nên $p_{Y\mid A}(y\mid a')=0$. $\square$

Như vậy hậu nghiệm của nhãn lỗi khi thiếu nguồn hàng tính được hoàn toàn từ ba nhân tử nhỏ của mô hình, không cần lập trước bảng đầy đủ của ba biến.
:::

Công thức (8.8) thực hiện hai thao tác khác nhau: cộng theo $s$ vì nhà cung cấp chưa được quan sát, rồi chuẩn hóa theo cảnh báo đã quan sát. Thay phép cộng bằng việc chọn nhà cung cấp có xác suất lớn nhất là một phép xấp xỉ khác và có thể cho hậu nghiệm khác. Giả thiết $A\perp S\mid Y$ cũng làm giảm số tham số: bảng đồng thời của $(S,Y,A)$ có $8$ ô, tức $7$ tham số tự do, trong khi (8.7) chỉ cần $1+2+2=5$ tham số, gồm một cho $p_S$, hai cho $p_{Y\mid S}$ và hai cho $p_{A\mid Y}$.

Mệnh đề 10.34 cho một quy trình tính cụ thể.

::: algorithm Thuật toán 10.35 (Suy luận bằng lấy biên và chuẩn hóa)
**Đầu vào.** Các nhân tử $p_S$, $p_{Y\mid S}$, $p_{A\mid Y}$ trên các tập giá trị hữu hạn $\mathcal S$, $\mathcal Y$; giá trị quan sát $a'$.

1. Với mọi $(s,y)\in\mathcal S\times\mathcal Y$, tính $q(s,y)=p_S(s)\,p_{Y\mid S}(y\mid s)\,p_{A\mid Y}(a'\mid y)$ theo (8.7).
2. Với mọi $y$, tính $r(y)=\sum_{s\in\mathcal S}q(s,y)$; đây là $p_{Y,A}(y,a')$.
3. Tính $c=\sum_{y\in\mathcal Y}r(y)$; đây là $p_A(a')$. Nếu $c=0$, dừng: quan sát có xác suất $0$ dưới mô hình.
4. Với mọi $y$, trả về $r(y)/c$.

**Đầu ra.** Phân phối hậu nghiệm $p_{Y\mid A}(\cdot\mid a')$.

**Chi phí.** $2|\mathcal S||\mathcal Y|$ phép nhân ở bước 1, khoảng $|\mathcal S||\mathcal Y|$ phép cộng ở bước 2–3 và $|\mathcal Y|$ phép chia ở bước 4.
:::

::: example Ví dụ 10.12 (Suy luận từ bảng phân phối đồng thời)
**Dữ kiện.** $S$ là nhà cung cấp, $Y=1$ là sản phẩm lỗi, $A=1$ là có cảnh báo. Nhà cung cấp $a$, $b$ có xác suất $0{,}6$ và $0{,}4$, tỉ lệ lỗi $0{,}02$ và $0{,}08$. Cảm biến cảnh báo với xác suất $0{,}9$ trên sản phẩm lỗi và $0{,}05$ trên sản phẩm đạt. Giả thiết $A\perp S\mid Y$.

**Bước 1 của Thuật toán 10.35: lập bảng.** Theo (8.7), tám xác suất đồng thời là

| Nhà cung cấp $S$ | Tình trạng $Y$ | $p(S,Y,A=0)$ | $p(S,Y,A=1)$ | Tổng theo $A$ |
|---|---:|---:|---:|---:|
| $a$ | $0$ | $0{,}5586$ | $0{,}0294$ | $0{,}5880$ |
| $a$ | $1$ | $0{,}0012$ | $0{,}0108$ | $0{,}0120$ |
| $b$ | $0$ | $0{,}3496$ | $0{,}0184$ | $0{,}3680$ |
| $b$ | $1$ | $0{,}0032$ | $0{,}0288$ | $0{,}0320$ |
| Tổng | | $0{,}9126$ | $0{,}0874$ | $1{,}0000$ |

Chẳng hạn, ô $S=b$, $Y=1$, $A=1$ bằng $0{,}4\cdot0{,}08\cdot0{,}9=0{,}0288$. Cộng hai hàng của mỗi nhà cung cấp cho $0{,}6$ và $0{,}4$; cộng hai hàng $Y=1$ cho $0{,}044$.

**Bước 2–4: hậu nghiệm của nhãn lỗi.** Cộng theo $s$ trong cột $A=1$, rồi chia cho tổng cột:

$$
\begin{aligned}
&\mathbb P(Y=1\mid A=1)\\
&\quad=\frac{0{,}0108+0{,}0288}{0{,}0874}=\frac{0{,}0396}{0{,}0874}\\
&\quad=\frac{198}{437}\approx0{,}4531.
\end{aligned}
$$

**Hậu nghiệm của nhà cung cấp.** Cảnh báo cũng làm đổi phân phối của nguồn hàng:

$$
\begin{aligned}
&\mathbb P(S=b\mid A=1)\\
&\quad=\frac{0{,}0184+0{,}0288}{0{,}0874}\\
&\quad=\frac{236}{437}\approx0{,}5400,\\
&\mathbb P(S=a\mid A=1)\\
&\quad=\frac{0{,}0294+0{,}0108}{0{,}0874}\\
&\quad=\frac{201}{437}\approx0{,}4600.
\end{aligned}
$$

Trước quan sát, xác suất của nhà cung cấp $b$ là $0{,}4$; sau cảnh báo, nó tăng lên khoảng $0{,}54$, vì hàng của $b$ có tỉ lệ lỗi cao hơn nên dễ bị cảnh báo hơn.

**Khi biết thêm nguồn hàng.** Điều kiện theo cả hai thông tin:

$$
\begin{aligned}
&\mathbb P(Y=1\mid A=1,S=a)\\
&\quad=\frac{0{,}0108}{0{,}0294+0{,}0108}\\
&\quad=\frac{18}{67}\approx0{,}2687,\\
&\mathbb P(Y=1\mid A=1,S=b)\\
&\quad=\frac{0{,}0288}{0{,}0184+0{,}0288}\\
&\quad=\frac{36}{59}\approx0{,}6102.
\end{aligned}
$$

**Kiểm tra lại.** Công thức toàn phần cho độ đo $\mathbb P(\cdot\mid A=1)$ với phân hoạch theo $S$ cho

$$
\begin{aligned}
&\frac{18}{67}\cdot\frac{201}{437}+\frac{36}{59}\cdot\frac{236}{437}\\
&\quad=\frac{54}{437}+\frac{144}{437}=\frac{198}{437},
\end{aligned}
$$

khớp phép lấy tổng trực tiếp. Mọi ô của bảng không âm và tổng tám ô bằng $1$.

Các trọng số đúng trong phép trộn là hậu nghiệm $201/437$ và $236/437$, không phải tiên nghiệm $0{,}6$ và $0{,}4$. Kết quả $198/437$ trùng với (5.9), vì Định lý 10.11 và Mệnh đề 10.34 là hai cách tính cùng một hậu nghiệm; cách thứ hai còn cho thêm phân phối hậu nghiệm của nguồn hàng.
:::

Lấy tổng theo nhà cung cấp không có nghĩa là giả định nhà cung cấp không ảnh hưởng đến lỗi: tổng trong (8.8) giữ đóng góp của cả hai khả năng với đúng trọng số. Trong các mô hình có biến ẩn liên tục, phép tổng được thay bằng tích phân. Khi số biến hoặc số giá trị lớn, phép lấy biên có thể tốn kém dù định nghĩa vẫn đơn giản: bảng của $k$ biến nhị phân có $2^k$ ô.

Như vậy, Định nghĩa 10.31 và Mệnh đề 10.32 cho cách lấy biên, Mệnh đề 10.33 cho cách chuẩn hóa sau quan sát, còn Mệnh đề 10.34 và Thuật toán 10.35 ghép chúng với một phân tích nhân tử có giả thiết rõ ràng. Bayes cập nhật xác suất bằng thông tin quan sát; lấy biên giữ lại mọi khả năng của biến chưa quan sát bằng tổng hoặc tích phân. Hai phép toán này trả lời câu hỏi mở đầu khi cảm biến chỉ cho thông tin không đầy đủ.

## 9. Ý nghĩa, tác động và giới hạn

Các mục trước cho một hậu nghiệm, $198/437$ sau một cảnh báo. Hậu nghiệm này chưa phải một quyết định, và nó chỉ đúng dưới các giả thiết của mô hình. Tình huống 10.1 ghép hậu nghiệm với chi phí để được một quy tắc quyết định; Tình huống 10.2 tính lại quy tắc đó khi tỉ lệ lỗi của luồng hàng thay đổi.

::: application Tình huống 10.1 (Quyết định sau cảnh báo)
**Bài toán.** Sau mỗi phản hồi của cảm biến, dây chuyền chọn một trong hai hành động: chấp nhận sản phẩm, hoặc loại sản phẩm để kiểm tra lại. Chấp nhận một sản phẩm lỗi tốn $5$ đơn vị; loại một sản phẩm đạt tốn $1$ đơn vị; hai trường hợp còn lại có chi phí $0$, như trong Ví dụ 10.8.

**Mô hình hóa.** Đặt $p=\mathbb P(Y=1\mid A=a')$ là hậu nghiệm sau quan sát $A=a'$. Theo (7.3) với biến chỉ thị, chi phí kỳ vọng có điều kiện của hai hành động là

$$
\text{chấp nhận: }5p,\qquad\text{loại: }1\cdot(1-p).
$$

Loại sản phẩm có chi phí kỳ vọng nhỏ hơn khi và chỉ khi $5p>1-p$, tức $p>1/6$.

**Giả thiết được dùng.** Các tham số (5.6) đúng với luồng hàng đang xét (Định lý 10.11); chi phí $5$ và $1$ được cho trước.

**Áp dụng.**

- Khi có cảnh báo, (5.9) cho $p=198/437\approx0{,}4531>1/6$. Chấp nhận tốn trung bình $990/437\approx2{,}2654$, loại tốn $239/437\approx0{,}5469$, nên loại sản phẩm.
- Khi không có cảnh báo, Định lý 10.11 cho $p=\mathbb P(Y=1\mid A=0)=0{,}0044/0{,}9126=22/4563\approx0{,}0048<1/6$. Chấp nhận tốn trung bình $110/4563\approx0{,}0241$, loại tốn $4541/4563\approx0{,}9952$, nên chấp nhận.

**Diễn giải.** Quy tắc thu được là "loại khi và chỉ khi có cảnh báo". Chi phí kỳ vọng của quy tắc này trên một sản phẩm chọn ngẫu nhiên là $5\cdot0{,}0044+1\cdot0{,}0478=0{,}0698$, đúng $\mathbb E[L]$ của Ví dụ 10.8.

**Giới hạn.** Ngưỡng $1/6$ đến từ tỉ số chi phí, không đến từ mô hình xác suất: với chi phí khác, cùng hậu nghiệm có thể dẫn đến quyết định khác.
:::

::: application Tình huống 10.2 (Tỉ lệ lỗi thay đổi khi triển khai)
**Bài toán.** Quy tắc "loại khi có cảnh báo" của Tình huống 10.1 được thiết kế với tỉ lệ lỗi $0{,}044$. Khi triển khai, cơ cấu nguồn hàng thay đổi và tỉ lệ lỗi chung giảm còn $0{,}01$; cảm biến giữ nguyên độ nhạy $0{,}90$ và tỉ lệ cảnh báo nhầm $0{,}05$.

**Giả thiết không thỏa.** Định lý 10.11 vẫn đúng, nhưng tiên nghiệm dùng lúc thiết kế không còn là tiên nghiệm của luồng hàng thật.

**Tính lại hậu nghiệm.** Theo (5.4) với tiên nghiệm mới,

$$
\begin{aligned}
&\mathbb P(Y=1\mid A=1)\\
&\quad=\frac{0{,}90\cdot0{,}01}{0{,}90\cdot0{,}01+0{,}05\cdot0{,}99}\\
&\quad=\frac{0{,}009}{0{,}0585}=\frac2{13}\approx0{,}1538.
\end{aligned}
$$

**Hậu quả.** Vì $2/13<1/6$, sau một cảnh báo, chấp nhận tốn trung bình $5\cdot2/13=10/13\approx0{,}7692$, còn loại tốn $11/13\approx0{,}8462$. Giữ quy tắc cũ làm mỗi sản phẩm bị cảnh báo tốn thêm trung bình $1/13\approx0{,}0769$ đơn vị.

**Diễn giải.** Trong (5.4), hợp lý (đặc tính cảm biến) và tiên nghiệm (tỉ lệ lỗi của luồng hàng) là hai thành phần riêng. Khi chỉ tiên nghiệm thay đổi, ta tính lại hậu nghiệm mà không cần đánh giá lại cảm biến; khi bỏ qua sự thay đổi này, quyết định dựa trên hậu nghiệm cũ có thể sai. Murphy (2022), §2.3.1, cho hiện tượng tương tự với xét nghiệm y tế khi tỉ lệ mắc bệnh thay đổi.
:::

Ngoài hai tình huống trên, các công cụ của bài xuất hiện trong học máy ở các chỗ sau.

- **Bộ phân loại xác suất:** một mô hình trả về $p(y\mid x)$ là phân phối có điều kiện của Mệnh đề 10.33; quyết định từ $p(y\mid x)$ cần thêm chi phí như Tình huống 10.1.
- **Rủi ro kỳ vọng (expected risk):** đại lượng mà huấn luyện cố gắng làm nhỏ là kỳ vọng của mất mát theo phân phối dữ liệu, như $\mathbb E[L]$ của Ví dụ 10.8.
- **Mô hình có biến ẩn (latent variable model):** khi một biến của mô hình không được quan sát, như nhà cung cấp của sản phẩm thiếu hồ sơ trong Mệnh đề 10.34, xác suất của dữ liệu được tính bằng lấy biên theo biến đó.

Chúng ta bắt đầu từ các kết quả có thể xảy ra khi một hệ thống nhận đầu vào chưa biết trước. Không gian xác suất gán trọng số nhất quán cho các biến cố, và xác suất có điều kiện chuẩn hóa lại các trọng số sau quan sát. Quy tắc nhân và công thức toàn phần dẫn đến định lý Bayes, nhờ đó cảnh báo của cảm biến cập nhật xác suất sản phẩm lỗi từ $0{,}044$ lên $198/437$, thay cho con số $0{,}90$ hấp dẫn nhưng sai của câu hỏi mở đầu. Biến ngẫu nhiên mô tả các đại lượng quan sát; kỳ vọng và phương sai tóm tắt trung bình và mức dao động, nhưng hiệp phương sai bằng $0$ không loại trừ phụ thuộc. Phân phối đồng thời giữ mọi quan hệ phụ thuộc, và phép lấy biên loại biến chưa quan sát bằng tổng hoặc tích phân. Kết hợp lấy biên với Bayes cho hậu nghiệm khi thiếu thông tin nhà cung cấp. Hậu nghiệm ấy cần thêm chi phí để thành quyết định, và chỉ đúng khi tiên nghiệm cùng đặc tính cảm biến khớp với luồng hàng thật.

Các kết quả chính, theo mục:

- **Mục 4 (mô hình xác suất):** Định nghĩa 10.1–10.3; Bổ đề 10.4; Mệnh đề 10.5 (mô hình hữu hạn); Mệnh đề 10.6 (phần bù, hợp); Hệ quả 10.7 (bất đẳng thức hợp); Nhận xét 10.8.
- **Mục 5 (cập nhật thông tin):** Định nghĩa 10.9 (xác suất có điều kiện); Mệnh đề 10.10 (quy tắc nhân); Định lý 10.11 (toàn phần và Bayes); Định nghĩa 10.12–10.13 (độc lập, độc lập có điều kiện).
- **Mục 6 (phân phối):** Định nghĩa 10.14–10.16 (biến ngẫu nhiên, PMF, CDF, độc lập của biến); Mệnh đề 10.17; Định nghĩa 10.18–10.20 (mật độ, Bernoulli, phân loại, Gaussian).
- **Mục 7 (mômen):** Định nghĩa 10.21, 10.23, 10.25, 10.28; Mệnh đề 10.22 (kỳ vọng của hàm, tuyến tính), 10.24 (công thức phương sai), 10.26 (phương sai của tổng), 10.27 (độc lập kéo theo không tương quan), 10.30 (phân rã phương sai); Định lý 10.29 (kỳ vọng toàn phần).
- **Mục 8 (suy luận nhiều biến):** Định nghĩa 10.31; Mệnh đề 10.32 (lấy biên), 10.33 (phân phối có điều kiện), 10.34 (phân tích nhân tử); Thuật toán 10.35.

Các công thức cần nhớ là Bayes (5.4) và dạng tỉ lệ (5.5), lấy biên (8.3)–(8.4), kỳ vọng toàn phần (7.13) và phương sai của tổng (7.11). Các nhầm lẫn thường gặp:

- dùng định lý Bayes với mẫu số bằng $0$;
- nhân các xác suất không điều kiện khi chưa có giả thiết độc lập;
- đọc độ cao của mật độ như một xác suất, thay vì lấy tích phân trên một khoảng;
- dùng công thức phương sai hoặc hiệp phương sai khi chưa kiểm tra mômen bậc hai hữu hạn;
- sau một quan sát, vẫn dùng tiên nghiệm $0{,}6$ và $0{,}4$ làm trọng số của nhà cung cấp thay cho hậu nghiệm.

## 10. Bài tập

Bộ bài tập đầy đủ, có gợi ý và lời giải, nằm trong [tệp bài tập của Bài 10](material-viewer.html?doc=materials/lec-10/exercises.md).

Ba bài đầu dùng trên lớp; sáu bài tự học và ba bài chọn từ Murphy dùng để tự học. Mỗi dòng ghi mục tiêu học tập mà bài kiểm tra.

**Trên lớp**

1. **Bài tập 10.1** (Đọc điều kiện trên bảng camera): mục tiêu 2.
2. **Bài tập 10.2** (Mật độ đều và xác suất trên khoảng): mục tiêu 3.
3. **Bài tập 10.3** (Độc lập trước và sau khi quan sát): mục tiêu 2.

**Tự học**

4. **Bài tập 10.4** (Không gian mẫu đều với hai xúc xắc): mục tiêu 1.
5. **Bài tập 10.5** (Xác suất lỗi của camera dưới quy trình lấy mẫu khác): mục tiêu 1, 6.
6. **Bài tập 10.6** (Bayes trong kiểm định sản phẩm): mục tiêu 2, 5, 6.
7. **Bài tập 10.7** (Phân phối rời rạc ba giá trị): mục tiêu 3, 4.
8. **Bài tập 10.8** (Phân phối đồng thời và lấy biên): mục tiêu 4, 5.
9. **Bài tập 10.9** (Hiệp phương sai bằng không nhưng phụ thuộc): mục tiêu 4.
10. **Bài tập 10.10** (Murphy (2022), Bài tập 2.9: chẩn đoán bệnh hiếm): mục tiêu 2.
11. **Bài tập 10.11** (Murphy (2022), Bài tập 3.1: không tương quan với biến liên tục): mục tiêu 4.
12. **Bài tập 10.12** (Murphy (2022), Bài tập 3.2: hệ số tương quan thuộc $[-1,1]$): mục tiêu 4.

## 11. Câu hỏi cuối buổi và cầu nối

**Câu hỏi.** Tại sao hệ thống phân loại sản phẩm cần xác suất? Trả lời trên chính sản phẩm của câu hỏi mở đầu (bị cảnh báo, thiếu hồ sơ nguồn hàng) bằng ba ý:

- đại lượng nào cần tính, và giá trị của nó;
- trọng số của nhà cung cấp $b$ trong phép trộn $\mathbb P(Y=1\mid A=1)=\sum_s\mathbb P(Y=1\mid A=1,S=s)\,\mathbb P(S=s\mid A=1)$;
- quyết định nên đưa ra, và điều xảy ra với quyết định đó khi tỉ lệ lỗi của luồng hàng giảm còn $0{,}01$.

::: solution Lời giải câu hỏi cuối buổi
**Đại lượng cần tính.** Quan sát không đầy đủ: tình trạng lỗi $Y$ không được quan sát, nguồn hàng $S$ bị thiếu, và cảm biến có nhiễu (độ nhạy $0{,}9$, cảnh báo nhầm $0{,}05$). Đại lượng cần tính là hậu nghiệm $\mathbb P(Y=1\mid A=1)$. Định lý 10.11 cho $198/437\approx0{,}4531$ theo (5.9); con số $0{,}90$ của câu hỏi mở đầu là $\mathbb P(A=1\mid Y=1)$, một đại lượng khác.

**Trọng số của $b$.** Lấy biên trên nguồn hàng chưa quan sát (Mệnh đề 10.34) cho trọng số $\mathbb P(S=b\mid A=1)=236/437\approx0{,}54$, không phải tiên nghiệm $0{,}4$ (Ví dụ 10.12): cảnh báo đã làm tăng khả năng sản phẩm đến từ nhà cung cấp có tỉ lệ lỗi cao hơn.

**Quyết định.** Với chi phí $5$ cho việc chấp nhận một sản phẩm lỗi và $1$ cho việc loại một sản phẩm đạt, loại sản phẩm khi hậu nghiệm vượt $1/6$ (Tình huống 10.1); ở đây $0{,}4531>1/6$, nên loại. Khi tỉ lệ lỗi giảm còn $0{,}01$, hậu nghiệm giảm còn $2/13<1/6$, nên quyết định đổi thành chấp nhận (Tình huống 10.2).

Tóm lại, AI cần xác suất vì dữ liệu và quan sát không đầy đủ: xác suất biểu diễn được cái chưa biết (tiên nghiệm, hợp lý), kết hợp được nhiều nguồn thông tin (quy tắc nhân, lấy biên) và cập nhật được khi có quan sát mới (định lý Bayes).
:::

Mọi tham số của bài được cho trước: tỉ lệ nguồn hàng $0{,}6$ và $0{,}4$, tỉ lệ lỗi $0{,}02$ và $0{,}08$, độ nhạy $0{,}9$, tỉ lệ cảnh báo nhầm $0{,}05$. Trong thực tế, các con số này phải được ước lượng từ một mẫu sản phẩm đã kiểm định, và ước lượng có sai số. Tương tự, nếu cảm biến trả về một số đo liên tục với mô hình $T\mid Y=y\sim\mathcal N(\mu_y,\sigma_y^2)$, các tham số $\mu_y,\sigma_y^2$ cũng chưa biết. Câu hỏi còn mở là: chọn các tham số ấy từ dữ liệu như thế nào. Bài 11 giữ cấu trúc mô hình xác suất của bài này nhưng coi các tham số là chưa biết, và chọn chúng bằng hợp lý cực đại.

## 12. Tài liệu đọc

Nguồn chính: Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả tại [probml.github.io/pml-book/book1.html](https://probml.github.io/pml-book/book1.html). Murphy dùng *sample space* cho tập giá trị $\mathcal X$ của một biến ngẫu nhiên; trong bài này, $\Omega$ là không gian mẫu của thí nghiệm và $\mathcal X$ là tập giá trị của $X$.

- **Trước buổi học:** Murphy (2022), §2.1 (nhất là §2.1.3.1–§2.1.3.3 về xác suất của biến cố, hợp và phần bù) và §2.2.1–§2.2.2 (biến rời rạc, CDF, mật độ).
- **Sau buổi học:**
  - Mục 4: §2.1.2 (hai loại bất định) và §2.1.3.1–§2.1.3.3.
  - Mục 5: §2.1.3.4–§2.1.3.6 (xác suất có điều kiện, độc lập và độc lập có điều kiện của biến cố), §2.2.3 (quy tắc tổng, quy tắc nhân, quy tắc chuỗi), §2.3 và ví dụ xét nghiệm §2.3.1.
  - Mục 6: §2.2.1, §2.2.2.1–§2.2.2.2, §2.2.4, §2.4.1, §2.5.1, §2.6.1–§2.6.2, và phần định nghĩa của §3.2.1.
  - Mục 7: §2.2.5 (mômen, kỳ vọng và phương sai có điều kiện ở §2.2.5.4), §2.2.6 (giới hạn của các thống kê tóm tắt), §2.8.1, §2.8.4, §3.1.1–§3.1.3.
  - Mục 8: §2.2.3, §2.2.4, §2.3, §3.1.4–§3.1.5 (tương quan và nhân quả; nghịch lý Simpson).
- **Mở rộng:** Murphy (2022), §6.3 (thông tin tương hỗ); §4.2 (ước lượng hợp lý cực đại), chuẩn bị cho Bài 11.

## Phụ lục

### A. Chứng minh Mệnh đề 10.30 (phân rã phương sai)

**Lộ trình.** Áp dụng Định lý 10.29 cho $X^2$ và cho $X$, viết $\mathbb E[X^2\mid S=s]$ qua phương sai có điều kiện, rồi dùng Mệnh đề 10.24 cho $\psi(S)$.

**Bước 1 (các đại lượng hữu hạn).** Biến $X^2$ rời rạc và khả tích. Định lý 10.29 áp dụng cho $X^2$ cho: $\mathbb E[X^2\mid S=s]$ hữu hạn với mọi $s$ có $\mathbb P(S=s)>0$, và $\mathbb E\bigl[\mathbb E[X^2\mid S]\bigr]=\mathbb E[X^2]$. Theo Mệnh đề 10.24 cho độ đo $\mathbb P(\cdot\mid S=s)$,

$$
\begin{aligned}
0&\le\operatorname{Var}(X\mid S=s)\\
&=\mathbb E[X^2\mid S=s]-\psi(s)^2,
\end{aligned}
$$

nên $\psi(s)^2\le\mathbb E[X^2\mid S=s]$ và $\operatorname{Var}(X\mid S=s)\le\mathbb E[X^2\mid S=s]$. Nhân với $\mathbb P(S=s)$ rồi cộng theo $s$: cả $\psi(S)^2$ và $\operatorname{Var}(X\mid S)$ khả tích, với kỳ vọng không vượt quá $\mathbb E[X^2]$.

**Bước 2 (chuỗi đẳng thức).**

$$
\begin{aligned}
&\operatorname{Var}(X)\\
&\quad=\mathbb E[X^2]-(\mathbb E[X])^2\\
&\quad=\mathbb E\bigl[\mathbb E[X^2\mid S]\bigr]-\bigl(\mathbb E[\psi(S)]\bigr)^2\\
&\quad=\mathbb E\bigl[\operatorname{Var}(X\mid S)+\psi(S)^2\bigr]\\
&\qquad-\bigl(\mathbb E[\psi(S)]\bigr)^2\\
&\quad=\mathbb E\bigl[\operatorname{Var}(X\mid S)\bigr]+\mathbb E\bigl[\psi(S)^2\bigr]\\
&\qquad-\bigl(\mathbb E[\psi(S)]\bigr)^2\\
&\quad=\mathbb E\bigl[\operatorname{Var}(X\mid S)\bigr]+\operatorname{Var}\bigl(\psi(S)\bigr).
\end{aligned}
$$

Căn cứ của năm đẳng thức, theo thứ tự:

1. Mệnh đề 10.24;
2. Định lý 10.29 cho $X^2$ và cho $X$;
3. Bước 1;
4. tính tuyến tính (7.5) cho hai biến khả tích $\operatorname{Var}(X\mid S)$ và $\psi(S)^2$, cả hai là hàm của biến rời rạc $S$;
5. Mệnh đề 10.24 cho $\psi(S)$.

Vì $\psi(S)=\mathbb E[X\mid S]$, ta được (7.14). $\square$

Phân rã cho biết bao nhiêu phần dao động của $X$ được giải thích khi biết nhóm $S$: phần $\operatorname{Var}(\mathbb E[X\mid S])$ giảm đi khi biết $S$, phần $\mathbb E[\operatorname{Var}(X\mid S)]$ còn lại.

### B. Trường hợp có mật độ (phác thảo)

Các phác thảo dưới đây thừa nhận hai kết quả của lý thuyết tích phân Lebesgue: định lý hội tụ đơn điệu (monotone convergence theorem), và định lý Fubini–Tonelli (đổi thứ tự tích phân của hàm không âm, hoặc của hàm có tích phân giá trị tuyệt đối hữu hạn). Khi $g(X)$ không rời rạc và không có mật độ, $\mathbb E[g(X)]$ được hiểu theo tích phân Lebesgue trên $\Omega$.

**B.1. Công thức (7.4) và tính tuyến tính.** Điều kiện: $\int|g|f_X<\infty$.

- Nếu $g$ chỉ nhận hữu hạn giá trị $u_1,\ldots,u_r$ trên các tập Borel $G_k=\{x:g(x)=u_k\}$, thì $g(X)$ rời rạc, và theo (6.7), $\mathbb E[g(X)]=\sum_ku_k\,\mathbb P(X\in G_k)=\sum_ku_k\int_{G_k}f_X=\int gf_X$.
- Nếu $g\ge0$, ta xấp xỉ $g$ từ dưới bằng dãy hàm $g_n=\min\bigl(n,\lfloor2^ng\rfloor/2^n\bigr)$, mỗi hàm chỉ nhận hữu hạn giá trị, tăng dần về $g$. Định lý hội tụ đơn điệu cho $\mathbb E[g_n(X)]\to\mathbb E[g(X)]$ và $\int g_nf_X\to\int gf_X$.
- Trường hợp tổng quát: viết $g=g^+-g^-$ với $g^\pm\ge0$; điều kiện $\int|g|f_X<\infty$ làm cả hai tích phân hữu hạn.

Khi $(X,Z)$ có mật độ đồng thời, cùng lập luận trên $\mathbb R^2$ cho $\mathbb E[h(X,Z)]=\iint h\,f_{X,Z}$. Với $h(x,z)=\alpha x+\beta z+\gamma$, tách tích phân kép thành ba số hạng; Fubini–Tonelli và (8.4) cho $\iint x\,f_{X,Z}(x,z)\,dz\,dx=\int xf_X(x)\,dx=\mathbb E[X]$, hợp lệ vì $\iint|x|f_{X,Z}=\mathbb E|X|<\infty$. Ta được (7.5).

**B.2. Mệnh đề 10.27.** Nếu $X\perp Z$ và $(X,Z)$ có mật độ đồng thời, (6.4) và (8.2) cho cùng xác suất trên mọi hình chữ nhật $B_1\times B_2$ khi thay $f_{X,Z}$ bằng $f_Xf_Z$; ta thừa nhận rằng khi đó $f_{X,Z}=f_Xf_Z$ ngoài một tập có diện tích bằng $0$ trong $\mathbb R^2$. Theo B.1, $\mathbb E[XZ]=\iint xz\,f_X(x)f_Z(z)\,dz\,dx$. Vì $\iint|x||z|f_Xf_Z=\mathbb E|X|\,\mathbb E|Z|<\infty$, Fubini cho tích phân kép bằng $\bigl(\int xf_X\bigr)\bigl(\int zf_Z\bigr)=\mathbb E[X]\,\mathbb E[Z]$.

**B.3. Định lý 10.29.** Giả sử với mỗi $s$ có $\mathbb P(S=s)>0$, phân phối $\mathbb P(X\in\cdot\mid S=s)$ có mật độ $f_{X\mid S}(\cdot\mid s)$. Với tập Borel $B$, cộng tính đếm được trên phân hoạch $\{S=s\}$, như Bước 2 của chứng minh Định lý 10.29, cho

$$
\begin{aligned}
&\mathbb P(X\in B)\\
&\quad=\sum_s\mathbb P(X\in B\mid S=s)\,\mathbb P(S=s)\\
&\quad=\int_B\sum_sf_{X\mid S}(x\mid s)\,\mathbb P(S=s)\,dx,
\end{aligned}
$$

trong đó đổi tổng và tích phân hợp lệ vì các số hạng không âm. Do đó $f_X(x)=\sum_sf_{X\mid S}(x\mid s)\,\mathbb P(S=s)$ là mật độ của $X$. Vì $\int|x|f_X=\mathbb E|X|<\infty$, Fubini cho phép đổi thứ tự trong $\int x\sum_s(\cdots)\,dx$, và ta được $\mathbb E[X]=\sum_s\mathbb P(S=s)\int xf_{X\mid S}(x\mid s)\,dx=\sum_s\psi(s)\,\mathbb P(S=s)$.

### C. Kỳ vọng và phương sai của Gaussian

Cho $T\sim\mathcal N(\mu,\sigma^2)$ với $\sigma>0$, và đặt $U=(T-\mu)/\sigma$, tức $T=\mu+\sigma U$.

**Lộ trình.** Chuẩn hóa $T$ thành $U\sim\mathcal N(0,1)$, tính hai mômen của $U$, rồi dùng (7.4) và (7.7).

**Bước 1 (mật độ của $U$).** Với mọi $t$, đổi biến $x=\mu+\sigma u$ trong (6.11) cho

$$
\begin{aligned}
\mathbb P(U\le t)&=\mathbb P(T\le\mu+\sigma t)\\
&=\int_{-\infty}^{\mu+\sigma t}f_T(x)\,dx\\
&=\int_{-\infty}^t\varphi(u)\,du,
\end{aligned}
$$

trong đó $\varphi(u)=e^{-u^2/2}/\sqrt{2\pi}$. Do đó $U$ có mật độ $\varphi$, tức $U\sim\mathcal N(0,1)$.

**Bước 2 ($\mathbb E[U]=0$).** Ta có $\int_0^\infty ue^{-u^2/2}\,du=\bigl[-e^{-u^2/2}\bigr]_0^\infty=1$, nên $\int|u|\varphi(u)\,du=2/\sqrt{2\pi}<\infty$ và $U$ khả tích. Hàm $u\varphi(u)$ lẻ, nên $\mathbb E[U]=\int u\varphi(u)\,du=0$.

**Bước 3 ($\mathbb E[U^2]=1$).** Tích phân từng phần với $u$ và $ue^{-u^2/2}$:

$$
\begin{aligned}
&\int_{\mathbb R}u^2e^{-u^2/2}\,du\\
&\quad=\bigl[-ue^{-u^2/2}\bigr]_{-\infty}^{\infty}+\int_{\mathbb R}e^{-u^2/2}\,du\\
&\quad=0+\sqrt{2\pi}.
\end{aligned}
$$

Chia cho $\sqrt{2\pi}$ được $\mathbb E[U^2]=1$, nên $\operatorname{Var}(U)=1-0^2=1$ theo (7.7).

**Bước 4 (quay về $T$).** Theo (7.4) với $g(u)=\mu+\sigma u$, $\mathbb E[T]=\mu+\sigma\,\mathbb E[U]=\mu$. Theo (7.7), $\operatorname{Var}(T)=\sigma^2\operatorname{Var}(U)=\sigma^2$. $\square$

Như vậy hai tham số của Gaussian là kỳ vọng và phương sai của nó, nên chúng có thể được ước lượng từ trung bình và độ phân tán của dữ liệu.
