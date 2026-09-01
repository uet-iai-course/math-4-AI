# Dàn ý Bài 00: Ôn tập nền tảng toán học cho AI

## Thông tin và mục tiêu

- Học phần: Cơ sở toán học cho AI, học kỳ 1, năm học 2026–2027.
- Tệp đầu ra: `lecture-00-on-tap-nen-tang-toan-hoc.html`.
- Thời lượng: quyết định biên soạn gộp 2 tiết lý thuyết + 1 tiết bài tập, mỗi tiết 50 phút, tổng 150 phút. Đề cương chỉ xác nhận cấu trúc 2+1; tài liệu không quy định gộp thành một buổi 150 phút liền mạch.
- Định vị: Bài 00 là buổi ôn bổ trợ trước Bài 01, không phải Buổi 1 chính thức của học phần.
- Ví dụ xuyên suốt: dự đoán giá nhà từ diện tích và số phòng ngủ.
- M0.1: mô tả từng mẫu, ý nghĩa trọng số và phần dư.
- M0.2: ghép mẫu thành ma trận; tính đúng kích thước, chuẩn, hạng và dạng toàn phương.
- M0.3: tính gradient, Hessian; tìm nghiệm bình phương tối thiểu từ điều kiện gradient bằng không.
- M0.4: phân biệt nhiễu với phần dư; diễn giải phân phối một biến, nhiều biến và dự đoán có bất định.
- Các mục tiêu bổ trợ trên hỗ trợ CLO1 về vận dụng và đánh giá thuật toán tối ưu, CLO2 về xây dựng và phân tích mô hình học máy.
- Lưu ý: Bài 00 không có LLO chính thức riêng; M0.1–M0.4 là mục tiêu bổ trợ suy ra từ tiên quyết và hỗ trợ CLO1–CLO2.

## Bộ dữ liệu và quy ước khóa

Giá dùng đơn vị $100$ triệu đồng. Đặt

$$
a'_i=\frac{a_i-55}{10},\qquad b'_i=b_i-2,
$$

và dự đoán từng mẫu bằng

$$
\hat y_i=w_0+w_1a'_i+w_2b'_i.
$$

| Căn | $a_i$ ($\mathrm{m}^2$) | $b_i$ | $a'_i$ | $b'_i$ | $y_i$ |
|---|---:|---:|---:|---:|---:|
| 1 | 40 | 1 | $-1{,}5$ | $-1$ | 11 |
| 2 | 50 | 2 | $-0{,}5$ | 0 | 12 |
| 3 | 60 | 2 | $0{,}5$ | 0 | 14 |
| 4 | 70 | 3 | $1{,}5$ | 1 | 19 |

Ý nghĩa trọng số: $w_0$ là giá tại $55\,\mathrm{m}^2$, 2 phòng; $w_1$ là thay đổi giá khi tăng $10\,\mathrm{m}^2$ và giữ số phòng; $w_2$ là thay đổi giá khi thêm một phòng và giữ diện tích.

Quy ước phần dư là $r_i=\hat y_i-y_i$: dương nghĩa dự đoán cao, âm nghĩa dự đoán thấp. Nhiễu $\varepsilon_i$ là đại lượng ngẫu nhiên ẩn trong mô hình sinh; phần dư là đại lượng tính được sau khi chọn mô hình và trọng số. Không đồng nhất hai đại lượng này.

Với $\mathbf w^{(0)}=(14,1,1)^T$:

$$
\hat{\mathbf y}^{(0)}=(11{,}5,13{,}5,14{,}5,16{,}5)^T,
\quad \mathbf r^{(0)}=(0{,}5,1{,}5,0{,}5,-2{,}5)^T,
$$

$$
\mathrm{SSE}=9,\qquad f(\mathbf w^{(0)})=\frac12\mathrm{SSE}=4{,}5,
\qquad \nabla f(\mathbf w^{(0)})=(0,-5,-3)^T.
$$

Chỉ từ phần Đại số tuyến tính mới ghép

$$
\mathbf X=\begin{bmatrix}1&-1{,}5&-1\\1&-0{,}5&0\\1&0{,}5&0\\1&1{,}5&1\end{bmatrix},
\qquad \mathbf y=\begin{bmatrix}11\\12\\14\\19\end{bmatrix}.
$$

Các kết quả kiểm định:

$$
\mathbf X^T\mathbf X=\begin{bmatrix}4&0&0\\0&5&3\\0&3&2\end{bmatrix},\qquad
\mathbf X^T\mathbf y=\begin{bmatrix}56\\13\\8\end{bmatrix},\qquad
\mathbf w_{\mathrm{LS}}=(14,2,1)^T.
$$

Tại nghiệm: $\hat{\mathbf y}=(10,13,15,18)^T$, $\mathbf r=(-1,1,1,-1)^T$, $\mathrm{SSE}=4$, $f=2$ và $\mathbf X^T\mathbf r=\mathbf0$. Một bước gradient với $\eta=0{,}1$ cho $\mathbf w^+=(14,1{,}5,1{,}3)^T$, $f(\mathbf w^+)=2{,}265$.

## Cấu trúc 72 trang

### Giới thiệu buổi học

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| P00 | Ôn tập nền tảng toán học cho AI | Định danh bài và chỉ nêu phạm vi: đại số tuyến tính, giải tích nhiều biến, xác suất. |
| P01 | Mục tiêu bài học | Nêu một luận điểm trung tâm về năng lực cuối buổi (biến dữ liệu thành mô hình và dự đoán kèm bất định) cùng bốn mục tiêu quan sát được M0.1–M0.4. |
| P02 | Bản đồ bài học | Trực quan hóa pipeline AI chung: dữ liệu → biểu diễn/mô hình → học tham số → dự đoán kèm bất định; hộp bối cảnh giá nhà và hộp vấn đề trung tâm phát biểu dạng vấn đề cần giải quyết (không đặt tiêu đề câu hỏi). |

### Mô tả ví dụ đoán giá nhà

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| H01 | Bốn căn nhà đã quan sát | Mô tả cụ thể từng mẫu và đơn vị; ô giá viết dạng "11 (1,1 tỷ đồng)". |
| H02 | Dự đoán giá từng căn nhà | Giữ bảng, nhãn mô hình và công thức; ý nghĩa $w_0,w_1,w_2$ rút thành đúng một dòng, điều kiện giữ biến còn lại chuyển vào ghi chú. |
| H03 | Phần dư của từng dự đoán | Hiển thị từng chuỗi $(a'_i,b'_i)$ → thay số → $\hat y_i$ → $r_i$ và diễn giải bằng tiền. |
| H04 | Nguồn gốc của phần dư | Giải thích $f(\mathbf w)$ là thước đo độ phù hợp trên dữ liệu giá quan sát; giá trị nhỏ hơn nghĩa dự đoán nhìn chung gần dữ liệu hơn. Lý do bình phương và $1/2$ đặt trong ghi chú. |

H01–H04 không dùng ký hiệu ma trận $\mathbf X$ hoặc tích $\mathbf X\mathbf w$.

### Đại số tuyến tính

| Mã | Tiêu đề | Hành trình | Nguồn |
|---|---|---|---|
| A01 | Đối tượng của đại số tuyến tính | Dùng $r_i,\mathbf r,f(\mathbf w)$ để tạo nhu cầu phân biệt vô hướng, véc-tơ và ma trận trước phép toán | Goodfellow et al. (2016), §2.1 |
| A02 | Véc-tơ và phép toán | Nối ký hiệu với dữ liệu trước khi tính: $\boldsymbol\phi_1$ ghép ba số của căn 1 trong H02, $\mathbf w^{(0)}$ là bộ trọng số thử ở H03; tính tích vô hướng $11{,}5$ và chuẩn $\ell_2$; A08 chính thức hóa véc-tơ đặc trưng | Goodfellow et al. (2016), §2.1–2.2 |
| A03 | Ma trận, chuyển vị và kích thước | Tính ví dụ $\mathbf A\mathbf x=(-1,-3)^T$; phân biệt phép nhân hợp lệ và không hợp lệ | Goodfellow et al. (2016), §2.1–2.2 |
| A04 | Hệ phương trình và nghịch đảo | Giải hệ $2\times2$ bằng nghịch đảo; công thức nghịch đảo và $x=A^{-1}b$ tách hai dòng; dùng ma trận chữ nhật chung $\mathbf M\in\mathbb R^{4\times3}$ để cảnh báo $\mathbf M^{-1}$ không tồn tại | Goodfellow et al. (2016), §2.3 |
| A05 | Hạng và phụ thuộc tuyến tính | Định nghĩa không gian cột và hạng (câu đầu rút gọn, Col(A) trước rank); so sánh trực tiếp ma trận hạng 2 với ma trận hạng 1; ma trận và rank tách các dòng riêng trong mỗi thẻ; hộp kết luận rút gọn | Goodfellow et al. (2016), §2.5–2.6 |
| A06 | Dạng toàn phương và tính dương | Định nghĩa dạng toàn phương, PSD/PD trước khi dùng; tính ví dụ $q(\mathbf d)=8$ và nối $\mathbf A^T\mathbf A$ | Goodfellow et al. (2016), §2.6; Boyd & Vandenberghe (2004), Phụ lục A |
| A07 | Bài tập nền tảng đại số tuyến tính | Ba câu trên lớp và ba câu tự kiểm; câu cuối giải thích $\mathbf d^T\mathbf A^T\mathbf A\mathbf d=\|\mathbf A\mathbf d\|_2^2\ge0$ | Tổng hợp |
| A08 | Nhiều mẫu và nhiều đặc trưng | Định nghĩa $\boldsymbol\phi_i$ là véc-tơ đặc trưng và $\boldsymbol\Phi=[\boldsymbol\phi_1\ \boldsymbol\phi_2\ \boldsymbol\phi_3\ \boldsymbol\phi_4]\in\mathbb R^{3\times4}$ | Goodfellow et al. (2016), §2.1–2.2 |
| A09 | Ma trận thiết kế | Định nghĩa $\mathbf X=\boldsymbol\Phi^T\in\mathbb R^{4\times3}$; mỗi hàng là một mẫu, ba cột là $1,a',b'$; ghi rõ $\mathbf w$ và $\mathbf y$ | Goodfellow et al. (2016), §2.1–2.2 |
| A10 | Dự đoán và phần dư dạng véc-tơ | Tính $\mathbf X\mathbf w^{(0)}=\hat{\mathbf y}$, $\mathbf r=\hat{\mathbf y}-\mathbf y$ và $f(\mathbf w^{(0)})=4{,}5$ | Goodfellow et al. (2016), §2.2, §4.5 |
| A11 | Đặc trưng phi tuyến | Kiểm tra mô hình vẫn tuyến tính theo trọng số khi véc-tơ đặc trưng chứa $(a')^2$ | Goodfellow et al. (2016), §4.5, §5.2 |
| A12 | Hệ dữ liệu không tương thích | Kiểm tra mâu thuẫn của $\mathbf X\mathbf w=\mathbf y$ trên bốn mẫu và chuyển sang bình phương tối thiểu | Goodfellow et al. (2016), §2.2, §4.5; Boyd & Vandenberghe (2004), Phụ lục A |
| A13 | Bình phương tối thiểu là phép chiếu | Định nghĩa $\operatorname{Col}(\mathbf X)=\{\mathbf X\mathbf w:\mathbf w\in\mathbb R^3\}$ trước SVG và điều kiện trực giao | Goodfellow et al. (2016), §2.6, §4.5; Boyd & Vandenberghe (2004), Phụ lục A |
| A14 | Phương trình chuẩn từ phép chiếu | Suy phương trình chuẩn; nêu điều kiện cột độc lập trước công thức nghịch đảo | Goodfellow et al. (2016), §2.6, §4.5; Boyd & Vandenberghe (2004), Phụ lục A |
| A15 | Bài tập ứng dụng đại số tuyến tính | Bài tập chung cố ý khép cả cụm phép toán/kích thước và cụm biểu diễn/hình chiếu: một câu trên lớp về hàng–mẫu, hai câu tự kiểm về dự đoán, phần dư và hình chiếu | Tổng hợp |

### Giải tích nhiều biến

| Mã | Tiêu đề | Hành trình | Nguồn |
|---|---|---|---|
| B01 | Đối tượng của giải tích nhiều biến | Phân biệt $h:\mathbb R^2\to\mathbb R$ với $\mathbf F:\mathbb R^2\to\mathbb R^3$; định nghĩa rõ miền, đối miền và ảnh | Goodfellow et al. (2016), §4.3–4.3.1; Boyd & Vandenberghe (2004), §A.4 |
| B02 | Đồ thị, lát cắt và tập mức | Dùng lại hình trong ghi chú cho hàm bất đối xứng $h(u,v)=u^2+uv+2v^2+u-2v$; phân biệt đồ thị, lát $v=2$ và tập mức trước khi tính độ dốc | Goodfellow et al. (2016), §4.3; Boyd & Vandenberghe (2004), §A.4 |
| B03 | Lát cắt và tiếp tuyến | Tính $p'(1)=5$, $q'(2)=7$ trên hai tiếp tuyến qua giá trị $8$, rồi chốt đạo hàm riêng là đạo hàm của lát cắt | Goodfellow et al. (2016), §4.3; Boyd & Vandenberghe (2004), §A.4 |
| B04 | Gradient | Gom hai đạo hàm riêng thành $\nabla h(1,2)=(5,7)^T$ và nêu hướng tăng nhanh nhất khi gradient khác không | Goodfellow et al. (2016), §4.3; Boyd & Vandenberghe (2004), §A.4 |
| B05 | Đạo hàm theo hướng | Giả sử $h$ khả vi; định nghĩa $D_{\mathbf u}h=\nabla h^T\mathbf u$ với $\|\mathbf u\|_2=1$ và tính $43/5$ | Goodfellow et al. (2016), §4.3; Boyd & Vandenberghe (2004), §A.4 |
| B06 | Vi phân và xấp xỉ tuyến tính | Dùng $\boldsymbol\Delta=(0{,}1,-0{,}1)^T$ để tính $\mathrm dh=-0{,}2$, dự đoán $7{,}8$ và chuẩn bị hiệu chỉnh Taylor | Goodfellow et al. (2016), §4.3; Boyd & Vandenberghe (2004), §A.4 |
| B07 | Ma trận Jacobian | Định nghĩa $\mathbf J_F\in\mathbb R^{m\times n}$; tính ví dụ $3\times2$ và nêu Jacobian không nhất thiết vuông | Goodfellow et al. (2016), §4.3; Boyd & Vandenberghe (2004), §A.4 |
| B08 | Quy tắc dây chuyền | Bốn bước: hàm trong, hàm ngoài, công thức, thế số; dùng $\ell=g\circ\mathbf F$ và thu $\nabla\ell=(6,6)^T$ | Goodfellow et al. (2016), §4.3; Boyd & Vandenberghe (2004), §A.4 |
| B09 | Ma trận Hessian | Định nghĩa từng phần tử $\partial^2h/(\partial x_i\partial x_j)$ và tính ma trận $[[2,1],[1,4]]$ | Goodfellow et al. (2016), §4.3.1; Boyd & Vandenberghe (2004), §A.4 |
| B10 | Độ cong theo một hướng | Đặt $\varphi(t)=h(\mathbf x+t\mathbf d)$ và suy $\varphi''(0)=\mathbf d^T\mathbf H_h\mathbf d$ | Goodfellow et al. (2016), §4.3.1; Boyd & Vandenberghe (2004), §A.4 |
| B11 | Khai triển Taylor bậc hai | Nêu giả thiết đủ trơn; hiệu chỉnh tuyến tính bằng số hạng $0{,}02$ để thu $7{,}82$, là đẳng thức vì $h$ bậc hai | Goodfellow et al. (2016), §4.3.1; Boyd & Vandenberghe (2004), §A.4 |
| B12 | Tích phân một biến | Dùng $\psi$ cho hàm tích phân; tính $\int_0^1(2x+1)\,\mathrm dx=2$; hộp rút gọn chỉ giữ công thức nguyên hàm, câu về đơn vị chuyển sang ghi chú; câu nối rút thành "Tích phân là phép cộng tích lũy. Ở C05, cùng phép tính chuyển mật độ thành xác suất của một miền." | Stewart (2016), §§5.2–5.3 |
| B13 | Tích phân nhiều biến | Dùng $\psi$ trên miền và tính tích phân bằng $3$; nối cả hai hướng: C05 dùng tích phân cho xác suất, còn B14 quay lại quy tắc dây chuyền để tính gradient của phần dư | Stewart (2016), §§15.1–15.2; Goodfellow et al. (2016), §3.3 |
| B14 | Quy tắc dây chuyền cho phần dư và mất mát | Suy $\nabla f=\mathbf X^T\mathbf r$ | Goodfellow et al. (2016), §4.3–4.5; Boyd & Vandenberghe (2004), §A.4 |
| B15 | Gradient tại trọng số thử | Tính $\nabla f(\mathbf w^{(0)})=(0,-5,-3)^T$ | Ví dụ tự tính dựa trên Goodfellow et al. (2016), §4.3–4.5 |
| B16 | Phương trình chuẩn | Nối điều kiện gradient với A13–A14 và giải $\mathbf w_{\mathrm{LS}}$ | Goodfellow et al. (2016), §4.5 |
| B17 | Hessian của hàm mất mát | Tính $\mathbf H=\mathbf X^T\mathbf X$ và nối dạng toàn phương với độ cong không âm | Goodfellow et al. (2016), §4.3–4.5 |
| B18 | Một bước gradient | Tính $\mathbf w^+$, phần dư và $f=2{,}265$ tại $\eta=0{,}1$; nhắc kiểm tra mục tiêu khi đổi bước | Tự tính |
| B19 | Bài tập tích hợp giải tích | Một câu ứng dụng giá nhà trên lớp; tự kiểm: (1) gradient, đạo hàm hướng và Taylor với $\boldsymbol\Delta=(0{,}1,\,0)^T\in\mathbb R^2$ tại $\mathbf x=(0,1)^T,\mathbf u=(1,0)^T$; (2) gradient của $g\circ\mathbf F$ tại $(0,1)$ bằng Jacobian; (3) tính lại hai tích phân ở B12–B13; chi tiết liên hệ C05 chuyển sang ghi chú | Tổng hợp |

### Xác suất một biến

| Mã | Tiêu đề | Hành trình | Nguồn |
|---|---|---|---|
| C01 | Phép thử, không gian mẫu và biến cố | Dùng xúc xắc đều trong không gian hữu hạn; $\Pr$ mới mang nghĩa trực giác theo kết quả đồng khả năng | Koller & Friedman (2009), Ch. 2; Goodfellow et al. (2016), §3.1 |
| C02 | Xác suất và các tiên đề | Định nghĩa $(\Omega,\mathcal F,\Pr)$, sigma-đại số và ba tiên đề với $E_k\in\mathcal F$ | Koller & Friedman (2009), §2.1.1 |
| C03 | Biến ngẫu nhiên | Mặt trang dùng $X:\Omega\to\mathbb R$ và câu đo được; chi tiết $\mathcal B(\mathbb R)$ đặt trong ghi chú | Koller & Friedman (2009), Ch. 2 |
| C04 | Biến rời rạc và hàm khối xác suất | Viết đầy đủ hàm khối xác suất (PMF), điều kiện chuẩn hóa và Bernoulli$(0{,}3)$ | Goodfellow et al. (2016), §3.2 |
| C05 | Biến liên tục và hàm mật độ xác suất | Nối chính thức mật độ→xác suất: $\Pr(U\in A)=\int_Ap_U$; dùng Uniform$(0,2)$ cho diện tích khoảng và xác suất điểm bằng 0 | Goodfellow et al. (2016), §3.3 |
| C06 | Hàm phân phối tích lũy | Viết đầy đủ hàm phân phối tích lũy (CDF); đồ thị Uniform và tính xác suất bằng hiệu CDF | Goodfellow et al. (2016), §3.2–3.3 |
| C07 | Kỳ vọng | Tổng/tích phân với điều kiện $\mathbb E|X|<\infty$; so sánh Bernoulli và Uniform | Goodfellow et al. (2016), §3.8 |
| C08 | Phương sai | Hai công thức tương đương, điều kiện mômen bậc hai và độ lệch chuẩn | Goodfellow et al. (2016), §3.8 |
| C09 | Bài tập nền tảng xác suất một biến | Một câu trên lớp về chỉ báo xúc xắc; PDF/CDF và mật độ điểm ở tự kiểm | Tổng hợp |
| C10 | Bất định của giá nhà | Dùng nền tảng vừa học để giải thích vì sao dự đoán điểm chưa mô tả biến thiên của $Y$ | Goodfellow et al. (2016), §3.1–3.3, §5.5 |
| C11 | Nhiễu ẩn và phần dư quan sát | Giả sử rõ $\mathbf w_{\mathrm{true}}^T\boldsymbol\phi_2=13$ trước khi tính $\varepsilon_2=-1$ và kiểm dấu phần dư | Goodfellow et al. (2016), §3.1, §5.5 |
| C12 | Mô hình Gauss cho nhiễu | Nêu $\sigma>0$, mật độ Gauss, xác suất $0{,}6827$ (thống nhất một dạng số) và cảnh báo đây là giả thiết, không phải kết luận từ bốn mẫu; hình SVG tĩnh trong markup | Goodfellow et al. (2016), §3.9 |
| C13 | Từ hàm hợp lý đến tổng bình phương phần dư | Nêu $y_i-\mathbf w^T\boldsymbol\phi_i=-r_i$ trước âm log-hàm hợp lý và SSE | Goodfellow et al. (2016), §3.9, §5.5 |
| C14 | Bài tập xác suất một biến và giá nhà | Kiểm tra nhiễu/phần dư, giả thiết Gauss và giới hạn của bốn phần dư | Tổng hợp |

### Xác suất nhiều biến

| Mã | Tiêu đề | Hành trình | Nguồn |
|---|---|---|---|
| D01 | Véc-tơ ngẫu nhiên | Tạo nhu cầu mô tả đồng thời/phụ thuộc rồi phân biệt $\mathbf Z$ với hiện thực $\mathbf z$ | Goodfellow et al. (2016), §3.4; Koller & Friedman (2009), Ch. 2 |
| D02 | Phân phối đồng thời | Định nghĩa hàm khối xác suất đồng thời bằng bảng $2\times2$ có tổng bằng $1$ | Koller & Friedman (2009), Ch. 2 |
| D03 | Phân phối biên | Cộng theo biến bị loại; tính $p_U(1)=0{,}50$, $p_V(1)=0{,}60$ | Koller & Friedman (2009), Ch. 2 |
| D04 | Xác suất có điều kiện và quy tắc nhân | Tính $p(V=1\mid U=1)=0{,}80$ và kiểm $0{,}40=0{,}80\times0{,}50$ | Koller & Friedman (2009), Ch. 2 |
| D05 | Công thức Bayes | Đảo điều kiện để tính $p(U=1\mid V=1)=2/3$ | Koller & Friedman (2009), Ch. 2 |
| D06 | Độc lập và phụ thuộc | Kiểm $0{,}40\ne0{,}50\times0{,}60$ và phân biệt phụ thuộc với nhân quả | Goodfellow et al. (2016), §3.5 |
| D07 | Kỳ vọng của véc-tơ ngẫu nhiên | Tính $\boldsymbol\mu=(0{,}50,0{,}60)^T$ theo từng thành phần | Goodfellow et al. (2016), §3.8 |
| D08 | Hiệp phương sai và tương quan | Tính $\boldsymbol\Sigma_Z$ và $\rho_{UV}\approx0{,}408$; chứng minh PSD trong ghi chú | Goodfellow et al. (2016), §3.8; Boyd & Vandenberghe (2004), Phụ lục A |
| D09 | Gauss nhiều biến | Dùng $\mathbf G\sim\mathcal N(\mathbf0,\boldsymbol\Sigma_G)$ với $\boldsymbol\Sigma_G=[[1,0{,}8],[0{,}8,1]]$ và elip đồng mật độ | Goodfellow et al. (2016), §3.9 |
| D10 | Bình phương tối thiểu tổng quát | Mặt trang giữ giả thiết $\boldsymbol\Sigma_\varepsilon\in\mathbb S_{++}^4$, mục tiêu GLS, trực giác cân hướng và trường hợp GLS→OLS; chuyển phép tính hai chiều $(\boldsymbol\Sigma_2,\mathbf r_\pm,J_2)$ vào ghi chú | Goodfellow et al. (2016), §3.9, §5.5 |
| D11 | Bài tập xác suất nhiều biến | Tính biên, điều kiện, Bayes, độc lập; tự kiểm hiệp phương sai, elip Gauss và GLS | Tổng hợp |

### Quay lại ví dụ

| Mã | Tiêu đề | Vai trò | Nguồn |
|---|---|---|---|
| E01 | Quy trình xây dựng mô hình giá nhà | Tổng hợp ba công cụ thành quy trình; ghi rõ bất định được cụ thể hóa ở E04 và tiêu thụ đầu ra GLS của D10 qua nhánh OLS/GLS. | Goodfellow et al. (2016), Ch. 2–5 |
| E02 | Trọng số bình phương tối thiểu | Diễn giải nghiệm bằng đơn vị tiền. | Tự tính |
| E03 | Phần dư sau khi khớp mô hình | Nêu $\mathbf X^T\mathbf r=\mathbf0$ nhưng từng phần dư có thể khác không. | Tự tính; Goodfellow et al. (2016), §4.5; Boyd & Vandenberghe (2004), §A.5 |
| E04 | Dự đoán kèm bất định | Dùng vô hướng $G\sim\mathcal N(0,1)$, phân biệt với véc-tơ $\mathbf G$ ở D09; dải có điều kiện theo tỷ đồng; $1{,}96$ là phân vị chuẩn được cung cấp, nối lại $0{,}6827$ ở C12, không yêu cầu người học tự suy ra phân vị; nếu nhiễu tương quan, dải phải thay bằng GLS ở D10. | Goodfellow et al. (2016), §3.9, §5.5 |
| E05 | Mô hình mở rộng và nguy cơ quá khớp | Dùng $(\widetilde{\boldsymbol\phi},\widetilde{\mathbf w})\in\mathbb R^4\times\mathbb R^4$; so sánh dự đoán nhà mới bằng cả đơn vị mô hình và tỷ đồng; SSE thấp không chứng minh dự đoán ngoài mẫu tốt hơn. | Goodfellow et al. (2016), §5.2 |
| E06 | Bài tập tích hợp và chuẩn bị Bài 01 | Công thức nghiệm đóng, một bước gradient, giới hạn của SSE bằng 0, phân biệt nhiễu/phần dư và chọn OLS/GLS; mặt trang chốt tuyến Biểu diễn (A) → tối ưu (B) → bất định (C/D/E). | Tổng hợp |

## Phân bổ thời gian

| Phần | Thời lượng |
|---|---:|
| Giới thiệu | 6 phút |
| Mô tả ví dụ | 10 phút |
| Đại số tuyến tính | 31 phút |
| Giải tích nhiều biến | 37 phút |
| Xác suất một biến | 25 phút |
| Xác suất nhiều biến | 25 phút |
| Quay lại ví dụ | 16 phút |
| **Tổng** | **150 phút** |

Bài giảng dùng một tuyến duy nhất gồm toàn bộ 72 trang; phân bổ thời gian nội bộ dưới đây tính theo tổng 150 phút tương đương 2 tiết lý thuyết + 1 tiết bài tập (mỗi tiết 50 phút) theo quyết định biên soạn, không phải quy định gộp buổi của đề cương.

Thời lượng 150 phút chỉ tính các mục mang nhãn **“Câu hỏi:”** trên lớp; các mục **“Tự kiểm”** thực hiện ngoài lớp và không nằm trong tổng thời lượng.

## Quyết định biên tập

- Thay nhiều ví dụ số rời rạc bằng một bộ bốn căn nhà xuyên suốt.
- Đưa mô tả từng mẫu, mục tiêu tìm trọng số, ý nghĩa trọng số và phần dư lên trước ký hiệu ma trận.
- Bỏ ví dụ phát hiện bất thường bằng khoảng cách Mahalanobis vì làm đứt mạch giá nhà.
- Tách Jacobian, quy tắc dây chuyền, Hessian, Taylor và bước gradient thành các trang riêng; B17–B18 phân biệt độ cong với phép cập nhật.
- Mở rộng xác suất một biến theo chuỗi phép thử → biến ngẫu nhiên → PMF/PDF/CDF → kỳ vọng/phương sai → nhiễu/phần dư → hàm hợp lý Gauss.
- Thêm $(a')^2$ để minh họa đặc trưng phi tuyến và nguy cơ quá khớp; không kết luận mô hình tốt hơn từ bốn mẫu.
- Stewart (2016) được dùng để lấp khoảng trống trình bày tích phân (B12–B13) vì Goodfellow không trình bày chi tiết phép tích phân cần cho xác suất liên tục.
- Màn hẹp: A08, C02, H02, C12 và D10 đã được kiểm tra ở $720\times900$; D10 giữ tải hợp lý bằng rút gọn tiêu đề và hộp, không tách trang.

## Tài liệu

- Ian Goodfellow, Yoshua Bengio và Aaron Courville (2016), *Deep Learning*, Chương 2–6.
- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Phụ lục A.
- James Stewart (2016), *Calculus*, ấn bản 8, §§5.2–5.3, 15.1–15.2.
- Daphne Koller và Nir Friedman (2009), *Probabilistic Graphical Models*, Chương 2.
- Đề cương học phần UET.AI2012 và Bài 01 trong cùng thư mục học kỳ.
