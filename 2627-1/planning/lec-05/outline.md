# Dàn bài Bài 05 — Các phương pháp tối ưu trong huấn luyện mô hình học sâu

Quy ước thuật ngữ: chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), phương pháp hạ gradient (GD), phương pháp hạ gradient ngẫu nhiên (SGD), phương pháp gradient gia tốc Nesterov (NAG), hàm tuyến tính chỉnh lưu (ReLU).

## Phạm vi và quyết định thiết kế

Bản soạn mới ngày 2026-09-25, gồm **37 trang thuộc 5 phần**, dành cho sinh viên năm ba học phần Cơ sở toán học cho AI. Bản này thay toàn bộ dàn bài trước theo yêu cầu; không dựa vào nội dung hoặc báo cáo rà soát cũ. Phần phân tích được tích hợp tại đây để tránh tạo thêm hệ tài liệu trùng lặp. Tệp liên quan: [storyboard.md](storyboard.md) và [review-log.md](review-log.md).

Thời lượng chính thức: **2 tiết lý thuyết (LT) và 1 tiết bài tập (BT)**, theo đề cương DOCX. Chưa xác minh số phút của một tiết; mọi dự toán dưới đây dùng phần tiết, không ngầm quy đổi sang phút. Một tiết BT đã phân bổ vào năm trang kiểm tra riêng, không cộng thêm ngoài thời lượng. Các ví dụ tính tay trong LT là phần giảng giải. Thời lượng và mã trang chỉ dùng trong tài liệu lập kế hoạch, không đưa lên mặt trang chiếu hay ghi chú diễn giả.

Vấn đề trung tâm: **thiết lập một quy trình huấn luyện từ dữ liệu hữu hạn, giải thích cách lấy gradient, cách cập nhật tham số và cách chọn điểm khởi đầu, đồng thời phân biệt giảm mất mát huấn luyện với dự đoán tốt trên dữ liệu mới**.

| Mục tiêu của bài | Hành vi có thể kiểm tra | Chuẩn đầu ra |
|---|---|---|
| MT1 | Phân biệt mục tiêu huấn luyện với đánh giá; nhận diện giới hạn của gradient nhỏ, độ cong và độ sâu mạng | LLO11 → CLO1 |
| MT2 | Tính gradient nhóm nhỏ, một bước SGD, momentum và Nesterov; giải thích đúng dữ liệu và trạng thái được dùng | LLO12 → CLO2 |
| MT3 | Tính đạo hàm trên mạng nhỏ; giải thích phá đối xứng; áp dụng Glorot và nêu giả thiết của quy tắc thang | LLO13 → CLO2 |

Đề cương xác định đánh giá LLO11–LLO13 bằng bài tập cá nhân và nhóm. Tiên quyết môn học: Giải tích 1, Xác suất thống kê, Đại số tuyến tính cho kỹ thuật. Kiểm kê Bài 04 hiện hành của tác tử lập kế hoạch xác nhận đã có gradient, đạo hàm theo hướng, Hessian, Taylor bậc hai, bước cập nhật và ví dụ bậc hai. Chưa có căn cứ coi mạng nhiều lớp hoặc lan truyền ngược là kiến thức đã học; phần D xây chúng ở mức tối thiểu cần cho khởi tạo.

Ngoài phạm vi: AdaGrad, RMSProp, Adam, thuật toán bậc hai cho mạng và chuẩn hóa theo lô thuộc Bài 06. Không thêm công thức He vì Glorot đã đủ mục tiêu hiện tại và nguồn bắt buộc; không dùng Hessian ở phần C để mở lại bài học về Newton.

## Học liệu và cách sử dụng bệ đỡ khái niệm

| Mã | Tài liệu, tác giả, năm và loại | Vị trí đã đọc, đường dẫn | Vai trò |
|---|---|---|---|
| DC | Đề cương chính thức UET.AI2012, DOCX | `sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx`; Buổi 05–06 và bảng CLO | Phạm vi, chuẩn đầu ra, thời lượng và đánh giá |
| DL | Goodfellow, Bengio, Courville, *Deep Learning*, 2016, giáo trình | `sources/Deep Learning by Ian Goodfellow, Yoshua Bengio, Aaron Courville (z-lib.org).pdf`; §§8.1–8.4, trang in 275–306; phần nền §§4.3, 5.2–5.3, 5.9–5.10, 6.1–6.3, 6.5; [chương 8 chính thức](https://www.deeplearningbook.org/contents/optimization.html) | Nguồn nội dung bắt buộc; không coi là mẫu bố cục trang chiếu |
| BV | Boyd, Vandenberghe, *Convex Optimization*, 2004, giáo trình | `sources/bv_cvxbook.pdf`; §§3.1.3, 4.2.3, 9.1–9.5; đặc biệt tr.459–468, 470–472, 481–486, 492–493 | Cách thiết lập và tái dùng công cụ toán; cầu nối với Bài 04 |
| BS | Boyd, Vandenberghe, Stanford, *Convex Optimization — original slides*, năm bản slide chưa xác minh | [PDF chính thức](https://web.stanford.edu/~boyd/cvxbook/bv_cvxslides_original.pdf); trang in 10–9, 10–13, 10–21; trang PDF 222, 226, 234 đã xem trực tiếp | Đối chiếu việc giữ ví dụ, đường mức và thước đo khi đổi phương pháp |
| BT | Boyd, Stanford EE364b, *Stochastic Subgradient Method*, năm bản slide chưa xác minh | [PDF chính thức](https://see.stanford.edu/materials/lsocoee364b/04-stoch_subgrad_slides.pdf); trang in 1–8, 15, 19–20 | Cầu nối từ thông tin xác định sang kỳ vọng có điều kiện; không dùng định lý dưới gradient lồi cho mạng phi lồi |
| HI | Hinton, cùng Srivastava và Swersky, Toronto, Lecture 6, bộ slide Coursera 2012 | `sources/lecture_slides_lec6.pdf`; [PDF chính thức](https://www.cs.toronto.edu/~tijmen/csc321/slides/lecture_slides_lec6.pdf); toàn bộ 31 trang, trọng tâm 2–21; hình trang 3, 10–12, 21 đã xem | Tham chiếu hình học, cách dẫn nhu cầu và so điểm lấy gradient |
| B04 | Bài 04 hiện hành, RevealJS và dàn bài | Ví dụ RG01/RG07, mô hình Taylor và hướng cập nhật, đã được tác tử lập kế hoạch kiểm | Kế thừa kiến thức thực tế; dùng lại đúng hàm bậc hai |

Phân trang phải ghi đúng: tối ưu không ràng buộc là **Chương 9 trong sách Boyd**, nhưng là **phần 10 trong original slides**. Với DL, bản PDF cục bộ bắt đầu Chương 8 ở trang in 274, §8.1 ở 275 và §8.4 ở 301–306; bản web có phân trang khác. Ưu tiên truy nguyên bằng số mục, công thức và hình. Trang web chương 5–6 không mở được trong lượt khảo sát; các mục này đã đọc trực tiếp từ PDF cục bộ. Không dùng nguồn MIT bổ sung và không nhập toàn bộ thư mục nguồn vào bài.

| Quan sát trực tiếp từ nguồn | Khái niệm được tái dùng | Áp dụng vào Bài 05 — quyết định của người soạn |
|---|---|---|
| BV §9.1 đặt sai số và giả thiết; §9.2 giữ khung chọn hướng, chọn bước, cập nhật; §9.3 thay hướng bằng âm gradient | Bài toán, thước đo và khung cập nhật ổn định khi phương pháp đổi | Giữ $J,\theta$ và quy ước bước; chỉ ra chính xác thành phần thay ở SGD, momentum, Nesterov |
| BV hình 9.3–9.5, 9.11–9.15, 9.19–9.20; BS 10–9, 10–13, 10–21 giữ cùng hàm tổng mũ và đường mức | Một ví dụ trở thành đối chứng giữa phương pháp | C01–C08 dùng cùng hàm bậc hai của Bài 04; không đổi hàm để tạo ấn tượng phương pháp mới luôn hơn |
| BT trang 1–3 thay hướng xác định bằng hướng có kỳ vọng phù hợp; trang 6–8 tái dùng bất đẳng thức cũ trong kỳ vọng | Mở rộng bằng một giả thiết mới có quan hệ toán học rõ | B03 chứng minh tính không chệch dưới lấy mẫu đều có hoàn lại; B04 chỉ ra điều đó không bảo đảm giảm từng bước |
| DL §5.10 nêu dữ liệu, mô hình, hàm mục tiêu, quy trình tối ưu; §6.2 gọi lại | Khung chung của một bài toán học | A03 thiết lập đối tượng; E01 dùng lại để phối hợp các quyết định, không dựng công thức bao trùm giả tạo |
| DL §5.9 → §8.1.3 → §8.3.1 giữ mục tiêu dạng trung bình và gradient của nó | Trung bình trên dữ liệu → ước lượng → cập nhật | B01–B08 giữ ba quan sát và mất mát, dùng lại gradient mẫu cho kỳ vọng, phương sai, bước và lịch học |
| DL hình 4.6 → 8.5 giữ thung lũng elip; §8.2.1 gọi lại Taylor (4.9) dưới dạng (8.10) | Mô hình cục bộ → giới hạn bước → lịch sử hướng | C01–C05 đưa độ cong trước momentum; mô tả tích lũy và triệt tiêu một phần, không tuyên bố vận tốc luôn giảm phương sai |
| DL §8.3.3 giữ trạng thái momentum và đổi điểm đánh giá; HI trang 20–21 ghép các vectơ bước và hiệu chỉnh | Trạng thái cũ tạo vị trí đo mới | C06 tính tay tại điểm dự báo; C07 mới viết quy tắc tổng quát |
| DL §6.5 → §8.2.5 → §8.4 tái dùng hợp hàm và dây chuyền; HI trang 10 nêu đối xứng cả trọng số vào và ra | Cấu trúc tầng → đạo hàm → đối xứng và thang | D01–D04 thiết lập mạng và đối xứng; D05–D09 đổi rõ sang mô hình tuyến tính để suy thang, không suy Glorot chính xác cho ReLU |

Không coi chuỗi hình học lồi–siêu phẳng đỡ–đối ngẫu của Boyd là nội dung cần thêm vào Bài 05. Điều kế thừa là **một công cụ đã có nghĩa phải được dùng trong một phép suy luận tiếp theo**. Ba bệ đỡ của bài là cấu trúc trung bình, mô hình cục bộ của hàm mục tiêu, và cấu trúc hợp hàm của mạng. Chúng cùng phục vụ bài toán huấn luyện nhưng giải thích ba cơ chế khác nhau.

Lỗi nguồn đã xử lý trong thiết kế: HI trang 10 in tỉ lệ thuận với `sqrt(fan-in)` trái với yêu cầu trọng số nhỏ hơn khi số đầu vào tăng; không kế thừa dòng này. BT trang giả thiết có chỗ thiếu dấu ngã ở biến gradient; bài chỉ dùng phát biểu ước lượng đúng của mình, không chuyển chặn mômen sang gradient đầy đủ.

## Khái niệm, ví dụ và mức hình thức hóa

| Khái niệm | Đầu vào và vai trò | Kết quả được dùng lại; chỗ dễ nhầm |
|---|---|---|
| KN1 — mục tiêu huấn luyện và đánh giá | Mất mát, dữ liệu, kỳ vọng; MT1 | $J$ và $R$ sang B; không đồng nhất nghiệm của $J$ với dự đoán tốt |
| KN2 — gradient lấy mẫu và SGD | $J$ là trung bình; đạo hàm, kỳ vọng/phương sai; MT2 | $\widehat g_t$ sang C; không chệch không có nghĩa mọi bước giảm |
| KN3 — momentum và Nesterov | Đường mức, Taylor, gradient; MT2 | Trạng thái $v_t$ và điểm đánh giá; không gọi tổng có trọng số là trung bình đã chuẩn hóa |
| KN4 — mạng, dây chuyền và đối xứng | Hàm hợp, đạo hàm; nền mới cho MT3 | Gradient theo từng trọng số và tính đồng nhất sang khởi tạo; lan truyền ngược không đồng nghĩa thuật toán tối ưu |
| KN5 — thang khởi tạo | KN4, phương sai tổng độc lập; MT3 | Khởi tạo $\theta_0$ cho B/C; mô hình phương sai tuyến tính là xấp xỉ cho mạng phi tuyến |

Quan hệ phụ thuộc: KN1 → KN2 → KN3; KN2/KN3 còn để mở cách chọn $\theta_0$ → KN4 → KN5. Khởi tạo được học sau cập nhật để trả lời điều kiện còn thiếu, nhưng trong chương trình chạy nó diễn ra trước cập nhật. Mạng và dây chuyền được xây mới trong D, không giả định từ Bài 04.

Quy ước trong ví dụ vectơ: $\theta_t$ là vectơ tham số ở vòng lặp $t$; $[\theta]_i$ là tọa độ thứ $i$ của vectơ $\theta$, và $\theta_{t,i}=[\theta_t]_i$. Vì vậy $\theta_1,\theta_2$ ở các bước thuật toán là hai vectơ, không phải hai tọa độ.

| Ví dụ | Dữ kiện và phép dùng tiếp | Lý do chọn, giới hạn |
|---|---|---|
| VD1, tự xây dựng | $y=(-1,1,3)$, $f_\theta=\theta$, $\ell_i=\tfrac12(\theta-y_i)^2$; $J=\tfrac12(\theta-1)^2+\tfrac43$. Tại $\theta=1$: gradient mẫu $(2,0,-2)$, trung bình 0, phương sai $8/3$. Dùng từ A03/B02 đến B08 | Ít dữ kiện, vẫn còn nhiễu tại nghiệm; một bước với $\eta=0.1$, mẫu $y=-1$ đưa tới 0.8 và tăng $J$ thêm 0.02. Không minh họa khái quát hóa bằng ba điểm này |
| VD2, kế thừa B04 | $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$, $\theta_0=(2,4)^T$. Nhắc bước $1/4$ để thấy hai hệ số $1/4,-3/4$; sau đó cố định $\eta=1/20,\beta=1/2,v_0=0$ khi so ba quy tắc | Giữ đối tượng đã học; tỷ số $7/3$ chỉ đủ phân biệt độ cong, không phải điều kiện cực kỳ kém. Bậc hai là đối chứng cơ chế, không đại diện toàn cục cho mạng sâu |
| VD3, tự xây dựng | $h_j=\operatorname{ReLU}(w_jx+b_j)$; $f_\theta=a_1h_1+a_2h_2$; $\ell=\tfrac12(f_\theta-y)^2$. Với $x=1,y=0,w_j=a_j=1,b_j=0$, đầu ra 2 và các đạo hàm theo $a_j,w_j,b_j$ đều 2 | Hai đơn vị đủ kiểm đối xứng cả tham số vào và ra; tiền kích hoạt dương, tránh đạo hàm tại điểm gãy. Không dùng mạng ReLU này để khẳng định Glorot giữ chính xác phương sai |
| VD4, mô hình phân tích mới | Chuỗi tuyến tính vô hướng với bốn hệ số $1/2$ hoặc 2; sau đó lớp tuyến tính ngẫu nhiên $z=Wh$, $W\in\mathbb R^{n_{out}\times n_{in}}$ | Tích đạo hàm dẫn vào thang; mô hình độc lập/trung bình 0 cho phép tính phương sai. Thay mô hình được thông báo ở D05/D07 |

Sáu bước và các phương án dẫn nhập được ghi đầy đủ trong storyboard. Chọn đặt các trở ngại gần nơi sử dụng, thay vì đọc liên tục tám mục của §8.2 trước thuật toán: người học chưa có mạng/dây chuyền ở đầu bài. Không cố ép bốn ví dụ thành một ví dụ duy nhất; mỗi ví dụ được dùng lại khi cơ chế còn đúng.

| Mã, loại | Phát biểu và giả thiết | Mức trình bày, nơi dùng |
|---|---|---|
| HT1 — định nghĩa | $d,p\in\mathbb N_{>0}$ là số đặc trưng/tham số; $\theta\in\mathbb R^p$. $\mathcal Y,\mathcal Z$ lần lượt là miền nhãn/dự đoán; $f_\theta:\mathbb R^d\to\mathcal Z$, $\ell:\mathcal Z\times\mathcal Y\to\mathbb R_{\ge0}$. $P$ là phân phối dữ liệu trên $\mathbb R^d\times\mathcal Y$; $(X,Y)\sim P$ là cặp ngẫu nhiên. Với $N\in\mathbb N_{>0}$, $D=\{(x_i,y_i)\}_{i=1}^N$, đặt $\ell_i(\theta)=\ell(f_\theta(x_i),y_i)$, $J=N^{-1}\sum_i\ell_i$, $R=\mathbb E_{(X,Y)\sim P}\ell(f_\theta(X),Y)$ và giả sử $R$ hữu hạn. VD1 dùng $\mathcal Y=\mathcal Z=\mathbb R$ | A04, phân biệt hai phân phối. $R$ thay ký hiệu $J^*$ của DL để không lẫn giá trị tối ưu |
| HT2 — tính chất | Cố định $D,\theta$; mọi $\ell_i$ khả vi tại $\theta$. Đặt $g_i=\nabla\ell_i(\theta)\in\mathbb R^p$, $\bar g=N^{-1}\sum_i g_i=\nabla J(\theta)$. Với $I$ phân phối đều trên $\{1,\dots,N\}$, định nghĩa $\Sigma(\theta)=\operatorname{Cov}(g_I\mid D,\theta)=N^{-1}\sum_i(g_i-\bar g)(g_i-\bar g)^T\in\mathbb R^{p\times p}$. Lấy $I_1,\dots,I_b$ độc lập đều có hoàn lại, độc lập với lịch sử trước lấy nhóm; $\widehat g=b^{-1}\sum_r g_{I_r}$. Khi mômen bậc hai hữu hạn, $\mathbb E[\widehat g\mid D,\theta]=\nabla J(\theta)$ và $\operatorname{Cov}(\widehat g\mid D,\theta)=\Sigma(\theta)/b$ | B03 suy đủ bằng tuyến tính và độc lập. Dùng phương sai vô hướng ở VD1; không đồng nhất với $\nabla R$ |
| HT3 — thuật toán | SGD: $\theta_{t+1}=\theta_t-\eta_t\widehat g_t$; mẫu mới độc lập với lịch sử trong mô hình đang xét, $\eta_t>0$ | B05, giả mã đầy đủ. Không phát biểu định lý hội tụ tổng quát |
| HT4 — nhắc lại và phép tính chính xác | Với hàm $C^2$, Taylor bậc hai là xấp xỉ cục bộ; với VD2, đặt $g=\nabla q(\theta)$ thì $q(\theta-\eta g)=q(\theta)-\eta g^Tg+\eta^2g^THg/2$ chính xác | C02; $H=\operatorname{diag}(3,7)$. Dùng độ cong, không dạy Newton |
| HT5 — thuật toán/đẳng thức | $v_{t+1}=\beta v_t-\eta\widehat g_t$, $\theta_{t+1}=\theta_t+v_{t+1}$; $0\le\beta<1$. Với $v_0=0$, $\eta,\beta$ cố định: $v_{t+1}=-\eta\sum_{s=0}^t\beta^{t-s}\widehat g_s$ | C03–C05, khai triển hai bước rồi quy nạp ngắn. Tổng chưa chuẩn hóa, không suy phương sai nhỏ hơn |
| HT6 — thuật toán | $\widetilde\theta_t=\theta_t+\beta v_t$; tính $\widehat g_t$ tại $\widetilde\theta_t$ trên nhóm đã chọn; $v_{t+1}=\beta v_t-\eta\widehat g_t$; $\theta_{t+1}=\theta_t+v_{t+1}$ | C06–C07, giữ một quy ước trạng thái. Không gán $O(1/t^2)$ cho bản hệ số cố định này trên mạng |
| HT7 — quy tắc dây chuyền | VD3: $e=f_\theta-y$, $z_j=w_jx+b_j$; $\partial\ell/\partial a_j=eh_j$, $\partial\ell/\partial w_j=ea_j\phi'(z_j)x$, $\partial\ell/\partial b_j=ea_j\phi'(z_j)$ ở điểm khả vi | D02, suy từ từng đường trên sơ đồ; mọi đại lượng ở đây vô hướng |
| HT8 — tính bất biến trong mô hình | Hai đơn vị có cùng tham số vào/ra, cùng hàm kích hoạt, cùng dữ liệu và trạng thái cập nhật thì nhận các cập nhật giống nhau trong các quy tắc đối xứng đang xét | D03, chứng minh bằng HT7 và một bước; lặp lại bằng quy nạp. Độ lệch có thể bằng 0 nếu trọng số đã phá đối xứng |
| HT9 — phép tính trong mô hình | $n_{in},n_{out}\in\mathbb N_{>0}$ là số đầu vào/ra của lớp tuyến tính $z=Wh$. Các $W_{ji}$ độc lập, trung bình 0, phương sai $s^2$, độc lập với vectơ đầu vào có các thành phần trung bình 0, phương sai chung $q>0$. Khi đó $\operatorname{Var}(z_j)=n_{in}s^2q$. Với mất mát vô hướng khả vi $\ell$, đặt các gradient cột $\delta_z=\nabla_z\ell$, $\delta_h=\nabla_h\ell$; dây chuyền cho $\delta_{h,i}=\sum_jW_{ji}\delta_{z,j}$, tức $\delta_h=W^T\delta_z$. Trong mô hình phân tích, giả sử $\delta_z$ độc lập với toàn bộ $W$, $\mathbb E[\delta_{z,j}]=0$, $\operatorname{Var}(\delta_{z,j})=r>0$; khi đó $\operatorname{Var}(\delta_{h,i})=n_{out}s^2r$ | D07–D08. Độc lập gradient với $W$ là giả thiết phân tích, không đẳng thức phổ quát trong mạng thật |
| HT10 — chiến lược có căn cứ xấp xỉ | Glorot: $s^2=2/(n_{in}+n_{out})$; lấy độc lập $W_{ji}\sim U[-a,a]$, trong đó $U[-a,a]$ là phân phối đều trên đoạn có biên $a=\sqrt{6/(n_{in}+n_{out})}>0$, vì $\operatorname{Var}(U[-a,a])=a^2/3$ | D09, DL (8.23). Thỏa hiệp tiến/lùi của mô hình tuyến tính; không bảo đảm tối ưu và không bảo toàn chính xác cho ReLU |

Nguồn HT1–HT3: DL §§8.1, 8.3.1 và phép tính trực tiếp; HT4: BV §9.1–9.3, DL §4.3.1/§8.2.1; HT5–HT6: DL (8.15)–(8.22), thuật toán 8.2–8.3; HT7–HT8: DL §§6.5, 8.4 và suy trực tiếp VD3; HT9–HT10: DL §8.4/(8.23), phép tính với giả thiết được viết rõ. Không thêm chứng minh tốc độ tiệm cận vào tuyến chính.

## Ánh xạ các thách thức của nguồn

| Nguồn | Quyết định và nơi dùng | Lý do và giới hạn |
|---|---|---|
| §8.1 | Giữ A03–A05, B01–B03 | Mục tiêu học máy và cấu trúc tổng tạo nhu cầu lấy mẫu |
| §8.2.1, điều kiện kém | Dời C01–C02 trước momentum | Dùng ngay Taylor và đường mức; VD2 chỉ cho hai độ cong khác nhau |
| §8.2.2, nhiều cực tiểu | A06; đối xứng tái dùng D03 | Không đồng nhất nhiều bộ tham số với nhiều chất lượng; không tuyên bố mọi cực tiểu mạng đều tốt |
| §8.2.3, yên ngựa/vùng phẳng | A06, quay lại D06 | Gradient bằng 0 không đủ; bão hòa là một cơ chế làm đạo hàm nhỏ |
| §8.2.4–8.2.5, vách dốc và độ sâu | D05–D06 | Tích đạo hàm và bão hòa trước thang khởi tạo; không triển khai thuật toán cắt gradient ngoài mục tiêu hiện tại |
| §8.2.6, gradient không chính xác | B02–B04 | Giới hạn ở nhiễu do lấy mẫu; xấp xỉ gradient của mô hình phân phối khó tính chỉ nêu trong ghi chú, không mở kỹ thuật mới |
| §8.2.7, cục bộ/toàn cục | A06, ghi chú C07 và E01 | Hướng giảm cục bộ không bảo đảm đường ngắn hay nghiệm tốt; không thêm hình địa hình trang trí |
| §8.2.8, giới hạn lý thuyết | Gộp vào giới hạn A06/E03 | Không chứng minh độ khó tính toán; không suy rằng phi lồi khiến mọi huấn luyện đều thất bại |
| §8.3.1–8.3.3 | B04–B08, C03–C08 | Giữ ba thuật toán, tách ví dụ tính trước giả mã; bỏ dẫn xuất cơ học dài ở §8.3.2 |
| §8.4 | D01–D11 | Giữ phá đối xứng, thang, Glorot và chẩn đoán ban đầu; khởi tạo thưa, trực giao, tiền huấn luyện chỉ đưa tài liệu đọc, không thêm thuật toán |

## Bản đồ năm phần

| Phần | Chức năng, đầu vào → đầu ra | Trang | LT | BT | Kiểm tra riêng |
|---|---|---:|---:|---:|---|
| A. Bài toán huấn luyện và tiêu chí đánh giá | Tối ưu đã học → $D,f,\ell,J,R$ và tiêu chí → nhu cầu tính gradient | A01–A07 | 0.35 tiết | 0.10 tiết | A07 |
| B. Ước lượng gradient và phương pháp SGD | $J$ dạng trung bình → ước lượng, bước và nhiễu → luồng gradient cho C | B01–B08 | 0.40 tiết | 0.25 tiết | B08 |
| C. Phương pháp momentum và Nesterov | Gradient và Taylor → trạng thái và điểm đánh giá → quy trình còn cần $\theta_0$ | C01–C08 | 0.50 tiết | 0.25 tiết | C08 |
| D. Khởi tạo tham số mạng nơ ron | Quy trình cập nhật → mạng/dây chuyền → đối xứng và thang → $\theta_0$ có căn cứ | D01–D11 | 0.60 tiết | 0.25 tiết | D11 |
| E. Tổng hợp các phương pháp tối ưu | Các kết quả A–D → một thiết lập huấn luyện và cách kiểm chứng | E01–E03 | 0.15 tiết | 0.15 tiết | E02 |
| **Tổng** | **37 trang, tuyến liên tục** | **37** | **2.00 tiết** | **1.00 tiết** | **5 trang** |

Không tách phần thực hành thứ sáu: các phép tính riêng đã có ở B–D; nhiệm vụ phối hợp chính là kiểm tra của phần E. Số 37 xuất phát từ tách các bước khó — gradient lấy mẫu, vị trí đo Nesterov, dây chuyền, phương sai tiến/lùi — và năm kiểm tra, không lấy số trang cũ làm chỉ tiêu.

## Dàn bài từng trang

### A. Bài toán huấn luyện và tiêu chí đánh giá

Chức năng: xác lập điều phải đạt trước cách tính; nhận tiên quyết tối ưu từ Bài 04, chuyển $J$ và tập dữ liệu sang B. MT1; 0.35 LT + 0.10 BT.

#### A01 — Các phương pháp tối ưu trong huấn luyện mô hình học sâu

- **Vai trò và mục tiêu:** Giới thiệu Bài 05, MT1–MT3.
- **Luận điểm trung tâm:** Huấn luyện cần phối hợp mục tiêu, thông tin gradient và điểm bắt đầu.
- **Ý chính:** Tên học phần; số bài; tên chủ đề; Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội. Không gắn khẩu hiệu.
- **Ví dụ/hình dự kiến:** Không cần hình; tiêu đề đủ chức năng định vị.
- **Hình thức hóa:** Không áp dụng.
- **Kết nối:** Nhận bài tối ưu trước; dẫn tới bản đồ nội dung.
- **Nguồn:** DC, Buổi 05.
- **Thời lượng:** 0.02 tiết LT.
- **Ghi chú soạn:** Nêu ba việc sẽ thực hiện: giải thích mục tiêu, tính cập nhật, chọn khởi tạo; chưa liệt kê công thức.

#### A02 — Nội dung bài giảng

- **Vai trò và mục tiêu:** Cho thấy năm phần và sản phẩm học tập; MT1–MT3.
- **Luận điểm trung tâm:** Mỗi phần cung cấp một thành phần cho quy trình huấn luyện.
- **Ý chính:** Năm tên phần A–E; phần B hiển thị tên đầy đủ “Ước lượng gradient và phương pháp hạ gradient ngẫu nhiên (SGD)” trước khi dùng viết tắt. Mục tiêu ngắn: phân biệt, tính, giải thích lựa chọn. Tiên quyết nhắc trong ghi chú: gradient, Taylor, kỳ vọng/phương sai.
- **Ví dụ/hình dự kiến:** Năm khối nối theo thứ tự, đầu ra cuối là thiết lập huấn luyện; không dùng mã trang trên hình.
- **Hình thức hóa:** Không áp dụng.
- **Kết nối:** Sau tiêu đề, trước bài toán mở đầu; chưa đòi hiểu cấu trúc mạng.
- **Nguồn:** DC; quyết định thiết kế từ hai khảo sát nguồn.
- **Thời lượng:** 0.03 tiết LT.
- **Ghi chú soạn:** Giải thích khởi tạo được học sau nhưng chạy trước trong thuật toán; không tạo một tuyến tự học khác.

#### A03 — Bài toán huấn luyện mô hình

- **Vai trò và mục tiêu:** Nhu cầu và ví dụ dẫn nhập của KN1; MT1.
- **Luận điểm trung tâm:** Dữ liệu, mô hình và mất mát biến một nhiệm vụ dự đoán thành bài toán tham số.
- **Ý chính:** VD1 có ba giá trị $-1,1,3$; mô hình dự đoán hằng $f_\theta=\theta$. Cần chọn một dự đoán chung và sau này dùng cho quan sát mới.
- **Ví dụ/hình dự kiến:** Ba điểm trên trục $y$ và một vạch dự đoán $\theta$; đoạn sai số có dấu, không chỉ màu.
- **Hình thức hóa:** Đặt $\theta\in\mathbb R$, $\ell_i=\tfrac12(\theta-y_i)^2$, $J=\tfrac13\sum_i\ell_i$. Tính $J(1)=4/3$.
- **Kết nối:** Từ nhiệm vụ tới đại lượng có thể tính; A04 phân biệt dữ liệu hiện có với phân phối tương lai.
- **Nguồn:** DL §5.10, §8.1; VD1 tự xây dựng.
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Ví dụ hằng chỉ cô lập việc lấy mẫu; không coi nó là mạng sâu hay bằng chứng khái quát hóa. Giữ nguyên dữ kiện sang B.

#### A04 — Mất mát huấn luyện và rủi ro kỳ vọng

- **Vai trò và mục tiêu:** Trực quan rồi hình thức KN1; MT1.
- **Luận điểm trung tâm:** $J$ là trung bình trên dữ liệu hữu hạn; $R$ là kỳ vọng trên dữ liệu sẽ gặp.
- **Ý chính:** Một nguồn sinh dữ liệu dẫn tới tập huấn luyện và quan sát mới. Sau sơ đồ mới viết hai công thức; mô hình và mất mát được giữ nguyên.
- **Ví dụ/hình dự kiến:** Nhánh dữ liệu hữu hạn và nhánh phân phối $P$; không vẽ chúng như hai mục tiêu luôn bằng nhau.
- **Hình thức hóa:** HT1 với $x_i\in\mathbb R^d$; $d,p$ là số đặc trưng và số tham số; $\theta\in\mathbb R^p$. $\mathcal Y$ là miền nhãn, $\mathcal Z$ là miền dự đoán; $f_\theta:\mathbb R^d\to\mathcal Z$ và $\ell:\mathcal Z\times\mathcal Y\to\mathbb R_{\ge0}$. $P$ là phân phối trên $\mathbb R^d\times\mathcal Y$; $(X,Y)\sim P$ là cặp ngẫu nhiên. Dùng HT1 với $R$ hữu hạn; ở VD1, $\mathcal Y=\mathcal Z=\mathbb R$.
- **Kết nối:** Giữ $J$ của A03, tổng quát hóa mô hình; A05 quyết định đại lượng theo dõi.
- **Nguồn:** DL §5.2; §8.1, (8.1)–(8.3).
- **Thời lượng:** 0.08 tiết LT.
- **Ghi chú soạn:** $R$ không phải $\min J$; tập hữu hạn không cho phép tính đúng $R$. Đánh giá chỉ ước lượng hiệu quả trên phân phối phù hợp.

#### A05 — Tiêu chí đánh giá mô hình

- **Vai trò và mục tiêu:** Ứng dụng KN1; MT1.
- **Luận điểm trung tâm:** Mất mát dùng để cập nhật và tiêu chí dùng chọn mô hình có thể khác nhau.
- **Ý chính:** Mất mát khả vi có thể thay lỗi phân loại 0–1; dùng tập xác thực chọn thời điểm dừng; tập kiểm thử dùng đánh giá sau lựa chọn.
- **Ví dụ/hình dự kiến:** Bảng minh họa hai thời điểm: huấn luyện 0.30→0.20, xác thực 0.35→0.42; ghi dữ liệu giả lập sư phạm, cùng thước đo trong từng cột.
- **Hình thức hóa:** Không thêm định lý; nhắc tối thiểu hóa $J$ không kéo theo thứ tự tốt hơn của sai số xác thực.
- **Kết nối:** Nhận sự khác nhau $J,R$; A06 xét giới hạn của tiêu chí gradient trong không gian tham số.
- **Nguồn:** DL §§5.3, 8.1.2.
- **Thời lượng:** 0.07 tiết LT.
- **Ghi chú soạn:** Phân biệt mất mát thay thế với sai số xác thực; không sử dụng tập kiểm thử để điều chỉnh siêu tham số. Hai số đo chưa chứng minh quá khớp trong mọi bối cảnh, chỉ tạo tình huống lựa chọn đã cho.

#### A06 — Điểm dừng và chất lượng nghiệm

- **Vai trò và mục tiêu:** Giới hạn chuyển từ tối ưu lồi sang huấn luyện; MT1.
- **Luận điểm trung tâm:** Gradient bằng không và số lượng điểm cực tiểu không đủ quyết định chất lượng một mô hình.
- **Ý chính:** Với $s(u,v)=u^2-v^2$, gốc có gradient 0 nhưng là điểm yên ngựa. Với $r(u)=(u^2-1)^2$, hai cực tiểu cùng giá trị. Trong mạng, nhiều tham số có thể biểu diễn cùng hàm.
- **Ví dụ/hình dự kiến:** Hai hình nhỏ có nhãn: lát cắt của $s$ qua hai trục và đồ thị $r$; phân biệt giá trị hàm với số bộ tham số.
- **Hình thức hóa:** $\nabla s(0,0)=0$, Hessian $\operatorname{diag}(2,-2)$; $r(\pm1)=0$. Đây là ví dụ, không định lý về mọi mạng.
- **Kết nối:** Sau tiêu chí đánh giá; A07 kiểm lại giới hạn, C/D sẽ giải thích các khó khăn cụ thể.
- **Nguồn:** DL §§8.2.2–8.2.3, 8.2.7–8.2.8; ví dụ $s$ theo hình 4.5, $r$ tự xây dựng.
- **Thời lượng:** 0.09 tiết LT.
- **Ghi chú soạn:** Nhiều cực tiểu không mặc nhiên đều tốt; gradient lớn có thể đi kèm tiến triển chậm do độ cong. Chuyển đối xứng tham số sang D03, không giải thích mạng trước khi xây mạng.

#### A07 — Đánh giá kết quả huấn luyện

- **Vai trò và mục tiêu:** Trang kiểm tra riêng phần A; MT1/KN1.
- **Luận điểm trung tâm:** Chọn kết quả cần căn cứ mục đích đánh giá, không chỉ giá trị huấn luyện hoặc gradient.
- **Ý chính / Câu hỏi:** Hai thời điểm A, B có mất mát huấn luyện 0.24, 0.18 và lỗi xác thực 0.12, 0.16. Nếu tiêu chí là lỗi xác thực, chọn thời điểm nào? Với $s(u,v)=u^2-v^2$, gradient 0 tại gốc có chứng nhận cực tiểu không? Nêu một lý do cho mỗi câu.
- **Ví dụ/hình dự kiến:** Bảng có hàng tiêu đề và công thức $s$; không cần hình mới.
- **Hình thức hóa:** Dùng HT1 và phép kiểm điểm dừng đã có.
- **Kết nối:** Chốt tiêu chí; B giữ mục tiêu $J$ và xét chi phí tính gradient của nó.
- **Nguồn:** DL §§8.1–8.2; bài tập tự xây dựng.
- **Thời lượng:** 0.10 tiết BT: 0.03 suy nghĩ, 0.02 trả lời, 0.05 chữa.
- **Ghi chú / đáp án:** Chọn A theo tiêu chí đã cho; chưa tuyên bố chắc chắn tốt hơn trên mọi dữ liệu mới. Gốc là điểm yên ngựa vì $s(u,0)>0$ và $s(0,v)<0$ gần gốc.
- **Kiến thức được đo:** Phân biệt tối ưu/đánh giá và điều kiện dừng; đã dạy A04–A06.
- **Tiêu chí đánh giá:** Đúng lựa chọn và lý do; nhận diện yên ngựa bằng hai hướng. Chỉ nói “phi lồi” mà không xét ví dụ chưa đủ.

### B. Ước lượng gradient và phương pháp SGD

Chức năng: thay phép tính đắt bằng thông tin lấy mẫu có quan hệ chính xác với $J$; MT1–MT2; 0.40 LT + 0.25 BT.

#### B01 — Chi phí của gradient đầy đủ

- **Vai trò và mục tiêu:** Nhu cầu KN2; MT2.
- **Luận điểm trung tâm:** Mỗi bước gradient đầy đủ phải cộng đóng góp của toàn bộ $N$ mẫu.
- **Ý chính:** Vi phân qua tổng hữu hạn; nếu mỗi mẫu tốn chi phí $C$, một bước đầy đủ tốn xấp xỉ $NC$. Dữ liệu trùng lặp có thể lặp lại thông tin.
- **Ví dụ/hình dự kiến:** Sơ đồ $N$ gradient cùng đi vào phép trung bình; ví dụ giả định 1.000.000 mẫu so nhóm 100 chỉ để đếm đánh giá, không dự báo tốc độ phần cứng.
- **Hình thức hóa:** $\nabla J=N^{-1}\sum_i g_i$, $g_i=\nabla\ell_i$; định nghĩa kích thước $g_i\in\mathbb R^p$.
- **Kết nối:** Nhận $J$ từ A; B02 kiểm cụ thể đóng góp mẫu trước lấy mẫu.
- **Nguồn:** DL §5.9, (5.96)–(5.98); §8.1.3; HI trang 5.
- **Thời lượng:** 0.04 tiết LT.
- **Ghi chú soạn:** Phân biệt chi phí một bước với tổng chi phí đạt chất lượng mục tiêu; không kết luận nhóm nhỏ tiết kiệm đúng $N/b$ thời gian thực.

#### B02 — Gradient của từng quan sát

- **Vai trò và mục tiêu:** Trực quan và ví dụ KN2; MT2.
- **Luận điểm trung tâm:** Các quan sát có thể đề nghị các hướng khác nhau tại cùng một tham số.
- **Ý chính:** Giữ VD1; $g_i=\theta-y_i$. Tại $\theta=1$, ba gradient là $2,0,-2$ và gradient đầy đủ bằng 0.
- **Ví dụ/hình dự kiến:** Trục $\theta$, ba mũi tên $-g_i$ có nhãn mẫu, một dấu cho trung bình; kèm bảng $y_i,g_i$.
- **Hình thức hóa:** $J=\tfrac12(\theta-1)^2+4/3$, $J'=\theta-1$; đạo hàm được tính trực tiếp từ cùng dữ kiện.
- **Kết nối:** Chi phí cộng đủ ở B01; B03 hỏi trung bình của lựa chọn ngẫu nhiên có đúng mục tiêu không.
- **Nguồn:** DL §8.1.3; VD1 tự xây dựng.
- **Thời lượng:** 0.05 tiết LT.
- **Ghi chú soạn:** Phân biệt mũi tên gradient và mũi tên bước âm gradient. Gradient đầy đủ bằng 0 không làm từng gradient mẫu bằng 0.

#### B03 — Ước lượng gradient không chệch

- **Vai trò và mục tiêu:** Hình thức KN2 sau ví dụ; MT2.
- **Luận điểm trung tâm:** Lấy mẫu đều có hoàn lại cho kỳ vọng đúng của gradient thực nghiệm tại tham số cố định.
- **Ý chính:** Mỗi lần chọn một chỉ số với xác suất $1/N$; với nhóm $b$ chỉ số độc lập, lấy trung bình. Chứng minh bằng tổng xác suất; giải thích phương sai chia $b$.
- **Ví dụ/hình dự kiến:** Ba nhánh xác suất $1/3$ của VD1; $\mathbb E\widehat g=0$, $\operatorname{Var}(\widehat g)=8/(3b)$ tại $\theta=1$.
- **Hình thức hóa:** HT2: các mất mát khả vi tại điểm xét; $g_i,\bar g\in\mathbb R^p$ và $\Sigma(\theta)=\operatorname{Cov}(g_I\mid D,\theta)\in\mathbb R^{p\times p}$ được định nghĩa trước công thức. Cố định $D,\theta$, lấy nhóm độc lập với lịch sử và có mômen bậc hai hữu hạn. Với vectơ dùng hiệp phương sai.
- **Kết nối:** Dùng các số B02; B04 thử một hiện thực cụ thể thay vì chỉ kỳ vọng.
- **Nguồn:** DL §8.1.3; BT trang 1–3, 15; suy trực tiếp.
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Đích là $\nabla J$, không mặc nhiên $\nabla R$; xáo trộn không hoàn lại có quy luật khác, không áp máy móc công thức này.

#### B04 — Một bước gradient ngẫu nhiên

- **Vai trò và mục tiêu:** Ví dụ cập nhật trước thuật toán; MT1–MT2.
- **Luận điểm trung tâm:** Một gradient không chệch vẫn có thể tạo bước làm tăng mất mát toàn bộ.
- **Ý chính:** VD1 tại $\theta=1$, chọn $y=-1$, gradient 2; với bước 0.1 nhận $\theta'=0.8$. Tính lại cùng $J$.
- **Ví dụ/hình dự kiến:** Đồ thị $J$ với điểm 1 và 0.8; thêm parabol mất mát của mẫu được chọn để thấy bước giảm mẫu nhưng tăng trung bình.
- **Hình thức hóa:** $\theta'=1-0.1\times2=0.8$; $J(0.8)-J(1)=\tfrac12(0.2)^2=0.02$.
- **Kết nối:** Kỳ vọng ở B03 không là bảo đảm từng bước; B05 xây quy trình lặp và cách theo dõi.
- **Nguồn:** DL §8.3.1; phép tính VD1 tự xây dựng.
- **Thời lượng:** 0.05 tiết LT.
- **Ghi chú soạn:** Đây không phải lỗi dấu hay mâu thuẫn với tính không chệch. Không dùng Armijo trên từng nhóm làm định nghĩa SGD của bài.

#### B05 — Phương pháp hạ gradient ngẫu nhiên

- **Vai trò và mục tiêu:** Hình thức thuật toán KN2; MT2.
- **Luận điểm trung tâm:** SGD lặp lấy mẫu, tính gradient tại tham số hiện tại và cập nhật.
- **Ý chính:** Phương pháp hạ gradient ngẫu nhiên đã được viết đầy đủ ở bản đồ nội dung. Đầu vào $D,f,\ell,\theta_0,b,\{\eta_t\},T$, tập xác thực, $K_{\mathrm{stop}}\in\mathbb N_{>0}$ và $\delta\ge0$. $T\in\mathbb N_{>0}$ là ngân sách số bước, $t=0,\dots,T-1$ là chỉ số vòng lặp; $p$ vẫn là số tham số. Đầu ra là tham số có tiêu chí xác thực nhỏ nhất đã thấy.
- **Ví dụ/hình dự kiến:** Giả mã: khởi tạo; lặp $t<T$; lấy $b$ chỉ số độc lập đều có hoàn lại; tính $\widehat g_t$; cập nhật; đánh giá định kỳ; lưu bản tốt nhất; dừng theo ngân sách hoặc quy tắc dừng sớm đã chọn.
- **Hình thức hóa:** HT3; mỗi $\widehat g_t$ dùng $\theta_t$. Luôn lưu bản có tiêu chí xác thực nhỏ nhất. Đặt lại bộ đếm chờ khi lần đánh giá giảm hơn $\delta$ so với giá trị tốt nhất đã lưu trước lần đánh giá đó; nếu không thì tăng bộ đếm một đơn vị. Dừng khi bộ đếm đạt $K_{\mathrm{stop}}$ hoặc hết ngân sách $T$.
- **Kết nối:** Tổng quát hóa B04; B06–B07 giải thích $b$ và $\eta_t$.
- **Nguồn:** DL thuật toán 8.1 và §§8.1.2–8.1.3; quy tắc theo dõi cụ thể do người soạn xác định.
- **Thời lượng:** 0.08 tiết LT.
- **Ghi chú soạn:** Một bước không phải một lượt qua dữ liệu. Với lấy mẫu có hoàn lại, $N/b$ bước chỉ xử lý tương đương $N$ lần đánh giá, chưa bảo đảm gặp mọi mẫu. Không hứa hội tụ toàn cục.

#### B06 — Kích thước nhóm nhỏ

- **Vai trò và mục tiêu:** Ứng dụng tính phương sai; MT2.
- **Luận điểm trung tâm:** Nhóm lớn giảm biến thiên của ước lượng nhưng tăng công việc trong mỗi bước.
- **Ý chính:** Trong mô hình HT2, $b=1,4,16$ cho phương sai VD1 $8/3,2/3,1/6$; sai số chuẩn giảm theo $1/\sqrt b$. Nêu bộ nhớ và khả năng xử lý song song.
- **Ví dụ/hình dự kiến:** Bảng $b$, số gradient mẫu để tạo một ước lượng, phương sai và sai số chuẩn. Đồ thị $\sqrt{8/(3b)}$ có trục ngang là $b$, số gradient mẫu cho một ước lượng, trục dọc là sai số chuẩn tại $\theta=1$ cố định. Đây không phải đường hội tụ của một quá trình huấn luyện.
- **Hình thức hóa:** Dùng lại HT2; chi phí phép tính tỷ lệ $bC$ khi giữ mô hình cố định.
- **Kết nối:** Giải thích tham số nhóm trong B05; B07 điều chỉnh bước khi nhiễu còn lại.
- **Nguồn:** DL §8.1.3, tr.278–280.
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Không đưa cỡ nhóm “tốt nhất” phổ quát hoặc các con số phần cứng cũ làm khuyến nghị hiện hành. Đồ thị nếu dựng là minh họa tính toán, phải ghi rõ.

#### B07 — Bước học và dao động gần nghiệm

- **Vai trò và mục tiêu:** Ứng dụng SGD và giới hạn; MT2.
- **Luận điểm trung tâm:** Khi gradient mẫu còn biến thiên, giảm bước làm giảm độ lớn dao động của cập nhật.
- **Ý chính:** VD1 tại nghiệm: $\operatorname{Var}(\theta_{t+1}\mid\theta_t=1)=\eta_t^2\,8/(3b)$. Giảm $\eta$ một nửa giảm phương sai bước bốn lần nhưng cũng làm bước có hướng nhỏ hơn.
- **Ví dụ/hình dự kiến:** Cùng ba mũi tên ở B02, co theo hai giá trị $\eta$; không cần vẽ đường học thực nghiệm giả.
- **Hình thức hóa:** Công thức có điều kiện trên cùng $\theta_t$; lịch minh họa giảm từ 0.1 xuống 0.05 sau một ngân sách đã định, không gọi là bảo đảm hội tụ.
- **Kết nối:** Dùng phương sai B06; B08 phối hợp lấy mẫu và bước.
- **Nguồn:** DL §8.3.1; HI trang 7, 9.
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Một lịch hữu hạn được chọn để vận hành; điều kiện tổng bước vô hạn trong sách không tự thành định lý cho mạng. Theo dõi cả mất mát và xác thực như A05.

#### B08 — Cập nhật từ một nhóm quan sát

- **Vai trò và mục tiêu:** Trang kiểm tra riêng B; MT2/KN2.
- **Luận điểm trung tâm:** Phải phân biệt giá trị một mẫu nhóm với kỳ vọng của quy trình lấy mẫu.
- **Câu hỏi / ý chính:** Cho $y=(-1,1,3)$, $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$ và $J(\theta)=\tfrac13\sum_{i=1}^3\ell_i(\theta)$. Tại $\theta=1$, lấy $b=2$ chỉ số độc lập đều có hoàn lại; lần này nhận $y=-1$ và $y=1$. Với $\eta=0.1$, tính hai gradient, gradient nhóm, tham số mới và thay đổi $J$. Tính kỳ vọng và phương sai của gradient nhóm trước khi biết hai chỉ số.
- **Ví dụ/hình dự kiến:** Bảng trống bốn đại lượng; ghi quy tắc lấy mẫu ngay trên đề.
- **Hình thức hóa:** HT2–HT3.
- **Kết nối:** Dùng B02–B07; C xét cách sử dụng lịch sử gradient.
- **Nguồn:** Bài tập tự xây dựng từ VD1.
- **Thời lượng:** 0.25 tiết BT: 0.10 làm, 0.05 đối chiếu, 0.10 chữa.
- **Ghi chú / đáp án:** Gradient $2,0$; trung bình 1; $\theta'=0.9$; $\Delta J=0.005$. Kỳ vọng 0, phương sai $4/3$. Kỳ vọng đúng không làm mọi hiện thực bằng 0 hoặc giảm $J$.
- **Kiến thức được đo:** Tính ước lượng, bước, phương sai và giải thích; tất cả đã có B02–B07.
- **Tiêu chí đánh giá:** Đúng các giá trị và nêu điều kiện độc lập/có hoàn lại; không đồng nhất kỳ vọng với gradient của phân phối thực.

### C. Phương pháp momentum và Nesterov

Chức năng: dùng hình học đã biết để giải thích lịch sử cập nhật và vị trí đo gradient. Tạm dùng gradient đầy đủ để cô lập cơ chế, sau đó ghép lại nhóm nhỏ. MT1–MT2; 0.50 LT + 0.25 BT.

#### C01 — Mặt mất mát bậc hai

- **Vai trò và mục tiêu:** Nhu cầu và trực quan KN3; MT1–MT2.
- **Luận điểm trung tâm:** Gradient phụ thuộc cả độ lệch tham số và độ cong của hàm trong ví dụ bậc hai.
- **Ý chính:** Gọi lại VD2 của Bài 04, dùng quy ước $[\theta]_i$ cho tọa độ. Tại $\theta_0=(2,4)^T$, gradient $(6,28)^T$; đặt $g=\nabla q(\theta)$; với $\lambda_1=3,\lambda_2=7$, $[g]_i=\lambda_i[\theta]_i$. Tỷ số gradient $28/6=14/3$ khác tỷ số độ lệch $4/2=2$.
- **Ví dụ/hình dự kiến:** Đường mức elip trên trục $[\theta]_1,[\theta]_2$, điểm đầu, gốc, mũi tên âm gradient; cùng khung hình dùng tiếp đến C08.
- **Hình thức hóa:** $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$, $H=\operatorname{diag}(3,7)$; $\lambda_1=3,\lambda_2=7$ là hai trị riêng của $H$.
- **Kết nối:** B cung cấp gradient; C xét hình học ngay cả khi gradient chính xác.
- **Nguồn:** B04 RG01/RG07; DL hình 4.6, §8.2.1; BV §9.1–9.3.
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Tỷ số $7/3$ không phải điều kiện cực kỳ kém. Sơ đồ chỉ minh họa cơ chế có thể rõ hơn khi độ cong chênh lệch lớn.

#### C02 — Độ cong và độ dài bước

- **Vai trò và mục tiêu:** Ví dụ và hình thức về giới hạn bước; MT1.
- **Luận điểm trung tâm:** Cùng một bước học tạo hệ số biến đổi khác nhau theo các hướng có độ cong khác nhau.
- **Ý chính:** Nhắc $\eta=1/4$ của Bài 04: $[\theta^{+}]_1=[\theta]_1/4$, $[\theta^{+}]_2=-3[\theta]_2/4$, điểm mới $(0.5,-3)^T$. Dấu âm tạo dao động qua trục. Giảm bước tránh vượt trục nhưng cũng làm ngắn tiến triển theo hướng còn cần di chuyển; vì vậy xét cách giữ thành phần hướng nhất quán.
- **Ví dụ/hình dự kiến:** Hai bước trên đúng elip C01; hai đồ thị tọa độ theo bước, giữ nhãn dấu.
- **Hình thức hóa:** HT4; $I_2$ là ma trận đơn vị $2\times2$ và $\lambda_1=3,\lambda_2=7$ là trị riêng của Hessian. Trên VD2, $\theta^{+}=(I_2-\eta H)\theta$. Điều kiện $|1-\eta\lambda_i|<1$ cho co theo từng hướng, tức $0<\eta<2/7$.
- **Kết nối:** Giảm bước giải quyết một phần dao động nhưng còn làm ngắn bước tiến; C03 thử giữ các thành phần hướng nhất quán. C03–C07 dùng cấu hình chung mới $\eta=1/20,\beta=1/2$; tác dụng riêng của trạng thái được đối chứng ở C05, không suy từ việc so C02 với C03.
- **Nguồn:** B04; DL (4.9)/(8.10), hình 4.6.
- **Thời lượng:** 0.08 tiết LT.
- **Ghi chú soạn:** Đây là kết quả chính xác riêng cho bậc hai xác định dương. Từ C03 dùng cấu hình đối chứng mới $\eta=1/20,\beta=1/2$ và công bố rõ sự thay đổi.

#### C03 — Tích lũy hướng cập nhật

- **Vai trò và mục tiêu:** Nhu cầu giữ hướng nhất quán sau khi giảm bước; trực quan và bước tính trước quy tắc momentum; MT2.
- **Luận điểm trung tâm:** Bước mới có thể giữ một phần bước cũ để tích lũy các thành phần cùng hướng.
- **Ý chính:** Với VD2, $\eta=0.05$, $v_0=0$: bước đầu $v_1=(-0.3,-1.4)$, $\theta_1=(1.7,2.6)$. Giữ một nửa bước cũ rồi cộng bước âm gradient tại $\theta_1$.
- **Ví dụ/hình dự kiến:** Ghép hai vectơ $0.5v_1$ và $-0.05\nabla q(\theta_1)$; kết quả $v_2=(-0.405,-1.61)$, $\theta_2=(1.295,0.99)$.
- **Hình thức hóa:** Phép tính cụ thể; chưa cần tổng nhiều chỉ số.
- **Kết nối:** C02 cho thấy giảm bước cũng làm ngắn tiến triển; C03 thử giữ một phần hướng cũ. Các phép tính dùng $\eta=1/20,\beta=1/2$ chung cho đối chứng ở C05; từ đó tạo ý nghĩa cho $v$ và $\beta$ ở C04.
- **Nguồn:** DL §8.3.2; HI trang 17–18; tính trực tiếp VD2.
- **Thời lượng:** 0.07 tiết LT.
- **Ghi chú soạn:** Thành phần đổi dấu có thể triệt tiêu một phần; không nói mọi dao động đều bị loại. $v$ là bước dịch chuyển tích lũy, không một vị trí tham số khác.

#### C04 — Phương pháp momentum

- **Vai trò và mục tiêu:** Hình thức và ứng dụng KN3; MT2.
- **Luận điểm trung tâm:** Momentum thêm trạng thái $v$ nhưng giữ bài toán và cách tính gradient.
- **Ý chính:** Đầu vào như SGD, thêm $0\le\beta<1$ và $v_0=0$; mỗi vòng lấy nhóm, tính gradient tại $\theta_t$, cập nhật $v$, rồi $\theta$. Đầu ra và cách theo dõi giữ từ B05.
- **Ví dụ/hình dự kiến:** Giả mã hai dòng cập nhật được đánh dấu thứ tự; bên cạnh ánh xạ từng số C03 vào công thức.
- **Hình thức hóa:** HT5; khai triển $v_2=-\eta(\beta\widehat g_0+\widehat g_1)$ rồi nêu tổng cho $v_{t+1}$ khi hệ số cố định.
- **Kết nối:** Tổng quát hóa bước tính; C05 kiểm hành vi trên hình và hàm mục tiêu.
- **Nguồn:** DL (8.15)–(8.16), thuật toán 8.2; HI trang 18.
- **Thời lượng:** 0.09 tiết LT.
- **Ghi chú soạn:** Tổng có trọng số chưa chuẩn hóa; không so phương sai $v$ với $g$ như thể cùng thang. Chi phí thêm một vectơ $p$ phần tử và phép cập nhật $O(p)$ ngoài gradient. Không phát biểu bảo đảm giảm mỗi bước.

#### C05 — Quỹ đạo của phương pháp momentum

- **Vai trò và mục tiêu:** Ứng dụng và giới hạn KN3; MT2.
- **Luận điểm trung tâm:** Giữ hàm và cấu hình giúp quy khác biệt quỹ đạo cho trạng thái tích lũy.
- **Ý chính:** So phương pháp hạ gradient (GD) và momentum trên VD2, cùng điểm đầu, $\eta=0.05$; bước thứ hai GD $(1.445,1.69)$, momentum $(1.295,0.99)$. Sau đó ghép lại gradient nhóm trong cùng quy tắc.
- **Ví dụ/hình dự kiến:** Hai quỹ đạo trên elip, bảng $q$ tính từ tọa độ; nếu thêm nhiều bước phải tính bằng cùng cấu hình và ghi đó là mô phỏng hàm đã cho.
- **Hình thức hóa:** Dùng lại HT5; với gradient hằng, $v_{t+1}=-\eta(1-\beta^{t+1})g/(1-\beta)$ là trường hợp giải thích tích lũy.
- **Kết nối:** $v$ tạo dịch chuyển quán tính $\beta v$ đã biết. Độ dốc có thể thay đổi dọc dịch chuyển đó; C06 dùng lại Hessian để xác định thông tin hiệu chỉnh tại vị trí dự báo.
- **Nguồn:** DL hình 8.5 và (8.17); tính VD2; cách đối chứng kế thừa BV/BS.
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Gradient hằng là trường hợp riêng, không giả thiết toàn quỹ đạo. Không lấy hai bước để kết luận thứ hạng phổ quát hoặc tuyên bố sửa được điểm yên ngựa/bão hòa.

#### C06 — Điểm đánh giá gradient

- **Vai trò và mục tiêu:** Nhu cầu hiệu chỉnh tại vị trí quán tính dự báo; trực quan và ví dụ Nesterov; MT2.
- **Luận điểm trung tâm:** Phần dịch chuyển do vận tốc có thể làm đổi độ dốc; Nesterov tính hướng hiệu chỉnh tại vị trí dự báo đó.
- **Ý chính:** Giữ trạng thái sau bước đầu VD2: $\theta_1=(1.7,2.6)^T$, $v_1=(-0.3,-1.4)^T$. Gradient hiện tại $(5.1,18.2)^T$ khác gradient $(4.65,13.3)^T$ tại điểm dự báo $(1.55,1.9)^T$. Dùng Hessian để tính phần thay đổi, rồi tạo hiệu chỉnh ở điểm dự báo; không suy rằng lựa chọn ấy luôn tốt hơn.
- **Ví dụ/hình dự kiến:** Cùng đường mức, đánh dấu $\theta_1$ và $\widetilde\theta_1$; vectơ dự báo và vectơ hiệu chỉnh có nhãn chữ. Tính $v_2=(-0.3825,-1.365)$, $\theta_2=(1.3175,1.235)$.
- **Hình thức hóa:** $\widetilde\theta=\theta+\beta v$ và $\nabla q(\theta+\beta v)-\nabla q(\theta)=H\beta v=(-0.45,-4.9)^T$ ở trạng thái đang xét. Đây là đẳng thức của hàm bậc hai, dùng lại $H$ của C01–C02.
- **Kết nối:** C05 đã cung cấp dịch chuyển quán tính; C06 tính độ dốc thay đổi theo dịch chuyển đó. C07 tổng quát hóa phép hiệu chỉnh tại điểm dự báo, giữ nguyên điểm gốc để cập nhật tham số.
- **Nguồn:** DL §8.3.3; HI trang 20–21.
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Điểm dự báo đã biết từ trạng thái cũ, không phải điểm tối ưu tương lai. Trong ví dụ này Nesterov không có $q$ nhỏ hơn momentum ở bước hai; giữ kết quả đó để tránh minh họa thiên lệch.

#### C07 — Phương pháp Nesterov

- **Vai trò và mục tiêu:** Hình thức và ứng dụng Nesterov; MT2.
- **Luận điểm trung tâm:** Sự khác nhau cốt lõi là điểm đánh giá gradient trong cùng khung trạng thái.
- **Ý chính:** Dùng tên “phương pháp gradient gia tốc Nesterov (NAG)” cho bản momentum kiểu Nesterov của DL. Giả mã: chọn nhóm; tính điểm dự báo; tính gradient nhóm tại đó; cập nhật vận tốc; cập nhật từ $\theta_t$.
- **Ví dụ/hình dự kiến:** Hai cột momentum/Nesterov, chỉ tô phần đối số gradient; đủ các đầu vào như C04 và cùng quy tắc dừng B05.
- **Hình thức hóa:** HT6, thứ tự ba công thức; chi phí thêm trạng thái như momentum, một gradient mỗi bước.
- **Kết nối:** Tổng quát hóa hiệu chỉnh ở vị trí dự báo của C06, không thêm bảo đảm luôn tốt hơn; C08 kiểm chuyển giao tại một trạng thái khác.
- **Nguồn:** DL (8.21)–(8.22), thuật toán 8.3.
- **Thời lượng:** 0.08 tiết LT.
- **Ghi chú soạn:** Không cộng điểm dự báo hai lần. So hai thuật toán phải dùng cùng nhóm nếu muốn cô lập nơi lấy gradient. Bản hệ số cố định này không tự có bảo đảm $O(1/t^2)$ của các phương pháp gia tốc lồi với lịch/giả thiết tương ứng; không tuyên bố luôn nhanh hơn.

#### C08 — Cập nhật có trạng thái trên hàm bậc hai

- **Vai trò và mục tiêu:** Trang kiểm tra riêng C; MT2/KN3.
- **Luận điểm trung tâm:** Nơi tính gradient và thứ tự cập nhật quyết định bước mới.
- **Câu hỏi / ý chính:** Cho $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$ với $\theta\in\mathbb R^2$, trạng thái hiện tại $\theta=(1,1)^T$, $v=(-0.2,0.2)^T$, $\eta=0.05$, $\beta=0.5$. Tính một bước momentum và Nesterov; đánh dấu hai điểm đánh giá gradient. Kết quả một bước có chứng minh Nesterov luôn tốt hơn không?
- **Ví dụ/hình dự kiến:** Bảng cột điểm đo, gradient, vận tốc mới, tham số mới; dùng lại elip.
- **Hình thức hóa:** HT5–HT6.
- **Kết nối:** Dùng C03–C07; D giải quyết cách chọn trạng thái tham số ban đầu cho mạng.
- **Nguồn:** Bài tập tự xây dựng trên VD2.
- **Thời lượng:** 0.25 tiết BT: 0.10 làm, 0.05 đối chiếu, 0.10 chữa.
- **Ghi chú / đáp án:** Momentum: $g=(3,7)$, $v'=(-0.25,-0.25)$, $\theta'=(0.75,0.75)$. Nesterov: $\widetilde\theta=(0.9,1.1)$, $g=(2.7,7.7)$, $v'=(-0.235,-0.285)$, $\theta'=(0.765,0.715)$. Không suy bảo đảm chung từ một bước.
- **Kiến thức được đo:** Tính đúng trạng thái và điểm gradient; nội dung C03–C07.
- **Tiêu chí đánh giá:** Hai chuỗi tính đúng; không cập nhật từ $\widetilde\theta$ lần nữa; nêu giới hạn của so sánh.

### D. Khởi tạo tham số mạng nơ ron

Chức năng: chuẩn bị mạng và dây chuyền, rồi giải thích riêng phá đối xứng và thang. Không coi mạng ReLU nhỏ là mô hình suy ra Glorot. MT1/MT3; 0.60 LT + 0.25 BT.

#### D01 — Mạng hai đơn vị ẩn

- **Vai trò và mục tiêu:** Nhu cầu và trực quan KN4; MT3.
- **Luận điểm trung tâm:** Trước khi chọn điểm khởi đầu, cần biết tham số tạo dự đoán và mất mát qua những phép tính nào.
- **Ý chính:** VD3: $x,y\in\mathbb R$; hai nhánh $z_j=w_jx+b_j$, $h_j=\phi(z_j)$, $f_\theta=a_1h_1+a_2h_2$; $\phi(z)=\max(0,z)$. Sáu tham số thực tạo $\theta$.
- **Ví dụ/hình dự kiến:** Mạng hai nhánh có nhãn $w_j,b_j,a_j$; tính $x=1,y=0,w_j=a_j=1,b_j=0$: $z_j=h_j=1$, đầu ra 2, mất mát 2.
- **Hình thức hóa:** Định nghĩa VD3, mất mát bình phương đã biết; mọi đại lượng vô hướng, chỉ $\theta\in\mathbb R^6$.
- **Kết nối:** B/C cần gradient theo $\theta$; D02 cho thấy gradient đó được tạo ra như thế nào.
- **Nguồn:** DL §§6.1, 6.3.1, 6.5; VD3 tự xây dựng.
- **Thời lượng:** 0.05 tiết LT.
- **Ghi chú soạn:** Ghi tên “hàm tuyến tính chỉnh lưu (ReLU)” cạnh định nghĩa; không giả định người học đã biết mạng. Chỉ tính ở $z_j>0$, không cần chọn đạo hàm tại 0.

#### D02 — Quy tắc dây chuyền trong mạng

- **Vai trò và mục tiêu:** Ví dụ rồi hình thức KN4; MT3.
- **Luận điểm trung tâm:** Gradient theo trọng số là tích các độ nhạy trên đường từ trọng số tới mất mát.
- **Ý chính:** Đi từ $e=f_\theta-y=2$ về mỗi nhánh; với $z_j=1$, $\phi'=1$. Tính tay đạo hàm theo $a_j$, rồi $w_j$, rồi $b_j$; tất cả bằng 2 trong cấu hình đã cho.
- **Ví dụ/hình dự kiến:** Trên đúng mạng D01, ghi các thừa số ở cạnh, rồi nhân theo đường; màu đi kèm mũi tên và nhãn.
- **Hình thức hóa:** HT7 sau bước tính; phân biệt tính gradient bằng dây chuyền với dùng gradient để cập nhật.
- **Kết nối:** D01 đã tính xuôi; các đạo hàm bằng nhau sẽ được dùng ở D03, tích đạo hàm dùng lại ở D05.
- **Nguồn:** DL §§6.5–6.5.2; suy trực tiếp VD3.
- **Thời lượng:** 0.08 tiết LT.
- **Ghi chú soạn:** Không mở toàn bộ thuật toán vi phân tự động. Giải thích mỗi thừa số và tham số đang lấy đạo hàm; không dùng bảng công thức mạng tổng quát trước ví dụ.

#### D03 — Đối xứng giữa các đơn vị ẩn

- **Vai trò và mục tiêu:** Nhu cầu khởi tạo khác nhau; MT1/MT3.
- **Luận điểm trung tâm:** Hai đơn vị khởi đầu giống nhau có thể tiếp tục học giống nhau.
- **Ý chính:** Với VD3 và $\eta=0.1$, cả hai nhánh có $a'=0.8,w'=0.8,b'=-0.2$. Hai đơn vị vẫn cùng hàm. Đổi nhãn đơn vị cũng không đổi đầu ra nếu đổi cả tham số vào/ra.
- **Ví dụ/hình dự kiến:** Hai cột trước/sau cập nhật, các giá trị tương ứng bằng nhau; gọi lại “nhiều bộ tham số” của A06 bằng đúng mạng đã biết.
- **Hình thức hóa:** HT8; dùng HT7 kiểm một bước và lý giải phép lặp bảo toàn đối xứng khi dữ liệu/trạng thái cập nhật giống nhau.
- **Kết nối:** Các đạo hàm D02 tạo hệ quả; D04 chọn tham số khác nhau để tránh sự đồng nhất.
- **Nguồn:** DL §§8.2.2, 8.4; HI trang 10; VD3.
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Cùng trọng số vào nhưng khác trọng số ra chưa thỏa điều kiện đối xứng đầy đủ. Nhóm dữ liệu ngẫu nhiên chung không tự phân hóa hai đơn vị đối xứng.

#### D04 — Khởi tạo ngẫu nhiên và phá đối xứng

- **Vai trò và mục tiêu:** Ứng dụng KN4; MT3.
- **Luận điểm trung tâm:** Khởi tạo trọng số khác nhau tạo điều kiện để các đơn vị nhận vai trò và cập nhật khác nhau.
- **Ý chính:** Thay VD3 bằng $w_1=0.8,w_2=1.2$, giữ $a_1=a_2=1,b_j=0,x=1,y=0$. Đầu ra vẫn 2, nhưng đạo hàm theo $a_1,a_2$ lần lượt 1.6 và 2.4.
- **Ví dụ/hình dự kiến:** Cùng mạng, chỉ đánh dấu hai trọng số vừa đổi và hai gradient đầu ra khác nhau.
- **Hình thức hóa:** Áp dụng HT7; chiến lược lấy trọng số ngẫu nhiên độc lập từ phân phối liên tục, trung bình 0 được nêu như cách thực hành, không bảo đảm huấn luyện thành công.
- **Kết nối:** Giải quyết sự đồng nhất D03; còn chưa trả lời độ lớn trọng số nên bao nhiêu, dẫn D05.
- **Nguồn:** DL §8.4, tr.301–302.
- **Thời lượng:** 0.04 tiết LT.
- **Ghi chú soạn:** Độ lệch có thể khởi tạo 0 khi trọng số đã phá đối xứng. Hai giá trị 0.8/1.2 là lựa chọn minh họa có chủ ý, không giả làm mẫu rút ngẫu nhiên thật.

#### D05 — Độ nhạy qua nhiều lớp

- **Vai trò và mục tiêu:** Nhu cầu và ví dụ KN5; MT1/MT3.
- **Luận điểm trung tâm:** Nhân nhiều đạo hàm cục bộ có thể làm độ nhạy co hoặc phóng đại nhanh.
- **Ý chính:** Thông báo đổi sang mô hình tuyến tính vô hướng $h^{(l)}=c_lh^{(l-1)}$: $l=1,\dots,L$ là chỉ số lớp, $L$ là số lớp, $c_l\in\mathbb R$ là hệ số, $h^{(l)}$ là đầu ra lớp $l$ và $h^{(0)}$ là đầu vào. Với $L=4$, nếu mọi $c_l=1/2$ thì $\partial h^{(4)}/\partial h^{(0)}=1/16$; nếu mọi $c_l=2$ thì bằng 16.
- **Ví dụ/hình dự kiến:** Chuỗi bốn khối, mỗi cạnh ghi hệ số; biểu diễn độ lớn tín hiệu với $h^{(0)}=1$ và độ nhạy ngược.
- **Hình thức hóa:** $\partial h^{(L)}/\partial h^{(0)}=\prod_l c_l$; đây là độ nhạy giữa hai lớp, chưa phải toàn bộ gradient mất mát theo mọi tham số.
- **Kết nối:** Tái dùng dây chuyền D02; D06 chỉ ra hàm kích hoạt thêm thừa số khác trọng số.
- **Nguồn:** DL §8.2.5; ví dụ vô hướng tự xây dựng, ý tưởng tích từ (8.11).
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Việc chọn các $c_l$ bằng nhau chỉ là ví dụ; mạng truyền thẳng không nhất thiết dùng lại cùng ma trận ở mọi lớp. Liên hệ gradient bùng nổ và vách dốc, chưa dạy cắt gradient.

#### D06 — Bão hòa của hàm kích hoạt

- **Vai trò và mục tiêu:** Trực quan và giới hạn của suy luận thang; MT1/MT3.
- **Luận điểm trung tâm:** Trọng số lớn có thể đưa phép biến đổi vào vùng đạo hàm rất nhỏ.
- **Ý chính:** Dùng $\phi(z)=\tanh z$ như một hàm kích hoạt khác, phân biệt rõ với ReLU của VD3. Gần 0 đạo hàm gần 1; ở $|z|$ lớn, đạo hàm nhỏ dù giá trị kích hoạt đã lớn.
- **Ví dụ/hình dự kiến:** Hai đồ thị có trục $z$, một cho $\tanh z$, một cho $1-\tanh^2z$; mốc 0 và 3, không cần mạng mới.
- **Hình thức hóa:** $\phi'(z)=1-\tanh^2z$; tại 0 bằng 1, tại 3 xấp xỉ 0.00987. Gắn vào thừa số $\phi'(z_j)$ của HT7.
- **Kết nối:** D05 mới xét trọng số; D06 bổ sung độ nhạy phi tuyến. Gần 0, $\tanh z\approx z$ và đạo hàm gần 1, nên D07 dùng mô hình tuyến tính để ước lượng thang xuất phát có chủ đích; phải kiểm lại khi đưa phi tuyến vào, không bảo đảm mọi đơn vị ở vùng này.
- **Nguồn:** DL §§6.3.2, 8.2.3, 8.4.
- **Thời lượng:** 0.04 tiết LT.
- **Ghi chú soạn:** Đây là ví dụ về vùng phẳng do bão hòa, không nhận xét mọi hàm kích hoạt hay mọi gradient. Không biến thành bài phân loại toàn bộ hàm kích hoạt.

#### D07 — Phương sai qua một lớp tuyến tính

- **Vai trò và mục tiêu:** Ví dụ và hình thức KN5; MT3.
- **Luận điểm trung tâm:** Nhiều đầu vào cộng lại làm thang tín hiệu phụ thuộc số đầu vào và phương sai trọng số.
- **Ý chính:** Công bố mô hình phân tích $z=Wh$ không có phi tuyến, được gợi bởi vùng tanh gần tuyến tính ở D06. $n_{in},n_{out}\in\mathbb N_{>0}$ là số đầu vào/ra; $h\in\mathbb R^{n_{in}}$, $z\in\mathbb R^{n_{out}}$, $W\in\mathbb R^{n_{out}\times n_{in}}$. Các trọng số độc lập, trung bình 0, phương sai $s^2$, độc lập với toàn bộ vectơ đầu vào có các thành phần trung bình 0, phương sai chung $q>0$.
- **Ví dụ/hình dự kiến:** Một đơn vị nhận bốn cạnh; mỗi tích có phương sai $s^2q$, bốn đóng góp cộng thành $4s^2q$. So $s^2=1$ với $1/4$.
- **Hình thức hóa:** HT9 tiến: $\operatorname{Var}(z_j)=n_{in}s^2q$; các hạng chéo bằng 0 dưới giả thiết đã nêu.
- **Kết nối:** Độ nhạy D05–D06 tạo nhu cầu giữ thang; D08 kiểm phía truyền ngược.
- **Nguồn:** DL §8.4; suy trực tiếp từ phương sai tổng, hỗ trợ (8.23).
- **Thời lượng:** 0.07 tiết LT.
- **Ghi chú soạn:** Từ đây $q$ chỉ phương sai đầu vào, khác hàm $q(\theta)$ ở phần C. Không nói công thức chính xác cho đầu ra ReLU hoặc mọi mẫu trọng số đều giữ đúng chuẩn. Xấp xỉ tuyến tính chỉ cho thang xuất phát để kiểm tiếp trong mô hình phi tuyến.

#### D08 — Phương sai của gradient truyền ngược

- **Vai trò và mục tiêu:** Tái dùng phương sai và nêu xung đột hai mục tiêu; MT3.
- **Luận điểm trung tâm:** Bảo toàn thang tiến và lùi đưa ra hai yêu cầu khác nhau khi độ rộng hai lớp khác nhau.
- **Ý chính:** Với mất mát vô hướng khả vi $\ell$, định nghĩa các gradient cột $\delta_z=\nabla_z\ell\in\mathbb R^{n_{out}}$, $\delta_h=\nabla_h\ell\in\mathbb R^{n_{in}}$. Dùng dây chuyền $\delta_{h,i}=\sum_{j=1}^{n_{out}}W_{ji}\delta_{z,j}$ trước khi gom thành $\delta_h=W^T\delta_z$. Trong mô hình phân tích, $\delta_z$ độc lập với toàn bộ $W$, $\mathbb E[\delta_{z,j}]=0$, $\operatorname{Var}(\delta_{z,j})=r>0$.
- **Ví dụ/hình dự kiến:** Lớp $n_{in}=4,n_{out}=2$: chọn $s^2=1/4$ giữ tiến nhưng lùi nhân $1/2$; chọn $1/2$ giữ lùi nhưng tiến nhân 2.
- **Hình thức hóa:** Giữ các giả thiết của $W$ ở D07; HT9 cho $\operatorname{Var}(\delta_{h,i})=n_{out}s^2r$. Với $q,r>0$, yêu cầu bảo toàn phương sai tiến/lùi lần lượt là $s^2=1/n_{in}$ và $s^2=1/n_{out}$, không cùng thỏa khi hai kích thước khác nhau.
- **Kết nối:** D07 đã cho một phía; xung đột này tạo nhu cầu quy tắc thỏa hiệp ở D09.
- **Nguồn:** DL §8.4, lý do của (8.23); suy có giả thiết.
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Giả định gradient đầu ra độc lập với trọng số là đơn giản hóa phân tích; trong huấn luyện thật chúng có thể phụ thuộc. Phân biệt phương sai với mômen bậc hai khi bỏ điều kiện trung bình 0.

#### D09 — Khởi tạo Glorot

- **Vai trò và mục tiêu:** Hình thức và ứng dụng KN5; MT3.
- **Luận điểm trung tâm:** Glorot chọn thang chung dựa trên số đầu vào và đầu ra để dung hòa hai chiều truyền.
- **Ý chính:** Dùng số kết nối trung bình $(n_{in}+n_{out})/2$ để chọn $s^2=2/(n_{in}+n_{out})$. Đổi phương sai đó thành phân phối đều và tính ví dụ $4\rightarrow2$.
- **Ví dụ/hình dự kiến:** Lớp bốn đầu vào, hai đầu ra; $s^2=1/3$, $a=1$, $W_{ji}\sim U[-1,1]$. Hệ số phương sai tiến $4/3$, lùi $2/3$.
- **Hình thức hóa:** HT10; $U[-a,a]$ là phân phối đều trên đoạn $[-a,a]$, $a>0$ là biên và $\operatorname{Var}(U[-a,a])=a^2/3$. Đây là chiến lược từ mô hình, không định lý bảo đảm tối ưu.
- **Kết nối:** Giải xung đột D08 ở mức thỏa hiệp; D10 tính hệ quả của một thang qua chuỗi nhiều lớp trong cùng mô hình, chưa hứa số đo thực nghiệm.
- **Nguồn:** DL §8.4, công thức (8.23), tr.303.
- **Thời lượng:** 0.06 tiết LT.
- **Ghi chú soạn:** Không tuyên bố giữ đồng thời đúng 1 ở cả hai phía. Với mạng phi tuyến, nhất là ReLU, các giả thiết đổi; bản này không suy ra quy tắc He hay khẳng định Glorot tối ưu cho ReLU.

#### D10 — Thang phương sai qua nhiều lớp

- **Vai trò và mục tiêu:** Ứng dụng chẩn đoán có hướng dẫn, khác trang kiểm tra D11; MT3.
- **Luận điểm trung tâm:** Tác động của thang khởi tạo tích lũy qua nhiều lớp ngay trong mô hình tuyến tính.
- **Ý chính:** Cho mạng tuyến tính ba lớp đều rộng 4, đầu vào có các thành phần trung bình 0, phương sai 1. Các ma trận trọng số độc lập giữa các lớp và độc lập với đầu vào; trong mỗi ma trận, các phần tử độc lập, trung bình 0, cùng phương sai $s^2$. So $s^2=1/16$ với $1/4$: dùng HT9 tính hệ quả phương sai qua ba lớp.
- **Ví dụ/hình dự kiến:** Bảng tính có hướng dẫn: cấu hình nhỏ cho $1\rightarrow1/4\rightarrow1/16\rightarrow1/64$; cấu hình $1/4$ cho $1\rightarrow1\rightarrow1\rightarrow1$. Chú thích đây là kỳ vọng mô hình, không số đo thực nghiệm.
- **Hình thức hóa:** Lặp $q_l=4s^2q_{l-1}$ dưới các giả thiết tuyến tính và độc lập đã nêu; các $q_l$ là phương sai theo mô hình ở lớp $l$, không phải số đo của một mạng đã huấn luyện.
- **Kết nối:** Áp dụng thang D09; D11 yêu cầu sinh viên tự chuyển sang kích thước khác và giải thích đối xứng.
- **Nguồn:** DL §8.4, tr.304–305; bảng tính tự xây dựng.
- **Thời lượng:** 0.08 tiết LT.
- **Ghi chú soạn:** Giảng viên tính lớp đầu, sinh viên dự đoán hai lớp sau rồi chữa. Đo độ lệch chuẩn kích hoạt/gradient trên nhóm dữ liệu và kiểm giá trị không hữu hạn là bước vận hành tiếp theo, chưa thực hiện ở trang này. Không cam kết mất mát hay khái quát hóa từ bảng phương sai của mô hình.

#### D11 — Khởi tạo một lớp có tám đầu vào

- **Vai trò và mục tiêu:** Trang kiểm tra riêng D; MT3/KN4–KN5.
- **Luận điểm trung tâm:** Khởi tạo phải giải quyết riêng tính đồng nhất của đơn vị và độ lớn tín hiệu.
- **Câu hỏi / ý chính:** (1) Cho $f_\theta(x)=a_1\operatorname{ReLU}(w_1x+b_1)+a_2\operatorname{ReLU}(w_2x+b_2)$, $\ell=\tfrac12(f_\theta-y)^2$, $x=2,y=1,w_1=w_2=0.5,a_1=a_2=1,b_1=b_2=0$. Tính hai đạo hàm $\partial\ell/\partial w_j$. Hai đơn vị dùng cùng quy tắc và trạng thái cập nhật; chỉ thay nhóm dữ liệu chung có phá đối xứng không? (2) Xét riêng lớp tuyến tính $z=Wh$ có 8 đầu vào, 4 đầu ra. Trọng số độc lập, trung bình 0, độc lập với đầu vào; đầu vào và gradient đầu ra có trung bình 0, phương sai chung dương, gradient đầu ra độc lập với toàn bộ $W$ trong mô hình phân tích. Dùng Glorot, tính phương sai trọng số, biên phân phối đều và hai hệ số phương sai tiến/lùi. Có được suy nguyên kết quả bảo toàn này cho ReLU không?
- **Ví dụ/hình dự kiến:** Hai ô đề độc lập có nhãn đối xứng/thang; đủ giả thiết trên đề.
- **Hình thức hóa:** HT8–HT10.
- **Kết nối:** D01–D10 đã cung cấp mọi thao tác; E phối hợp với chọn quy tắc cập nhật.
- **Nguồn:** Bài tập tự xây dựng từ DL §8.4.
- **Thời lượng:** 0.25 tiết BT: 0.12 làm (0.06 mỗi ý), 0.04 trình bày, 0.09 chữa.
- **Ghi chú / đáp án:** (1) $z_j=h_j=1$, $f_\theta=2$, $e=1$ và $\partial\ell/\partial w_j=e a_j\phi^{\prime}(z_j)x=2$ cho cả hai đơn vị. Đối xứng đầy đủ được giữ khi dùng chung dữ liệu và trạng thái; thay lô chung không tự phá đối xứng. (2) $s^2=1/6$, $a=1/\sqrt2$; tiến $8/6=4/3$, lùi $4/6=2/3$. Không bảo toàn chính xác cả hai phía, không suy nguyên kết quả tuyến tính cho ReLU.
- **Kiến thức được đo:** Tự lấy đạo hàm theo trọng số với dữ kiện mới, giải thích đối xứng, áp dụng Glorot và nêu ranh giới; đã dạy D02–D03, D07–D09.
- **Tiêu chí đánh giá:** Có đúng các thừa số của dây chuyền và hai đạo hàm; nêu điều kiện đối xứng đầy đủ; đúng phương sai, biên, hai hệ số và giả thiết tuyến tính. Chỉ nhận diện gradient bằng nhau hoặc trả tên Glorot chưa đủ.

### E. Tổng hợp các phương pháp tối ưu

Chức năng: trở lại bài toán A03 và phối hợp các lựa chọn; không đưa khái niệm trọng tâm mới. MT1–MT3; 0.15 LT + 0.15 BT.

#### E01 — Cấu hình quy trình huấn luyện

- **Vai trò và mục tiêu:** Tổng hợp và ứng dụng các kết quả A–D; MT1–MT3.
- **Luận điểm trung tâm:** Chọn gradient, cập nhật và khởi tạo là các quyết định phối hợp nhưng có nhiệm vụ khác nhau.
- **Ý chính:** Bảng ba quyết định: dữ liệu nào tạo gradient; có lưu vận tốc/đo tại đâu; tham số bắt đầu được tạo thế nào. Thêm tiêu chí xác thực và ngân sách để chọn kết quả.
- **Ví dụ/hình dự kiến:** Sơ đồ đúng thứ tự chạy: dữ liệu/mất mát → khởi tạo → lặp lấy nhóm/tính gradient/cập nhật → đánh giá. Bên cạnh ghi đối tượng được kiểm ở từng bước.
- **Hình thức hóa:** Dùng lại $D,J,\theta_0,\widehat g_t,v_t$, không thêm công thức mới.
- **Kết nối:** Nhận đầu ra D; E02 dùng các thành phần trên để chẩn đoán một tình huống.
- **Nguồn:** DL §5.10, §§8.1–8.4; tổng hợp người soạn.
- **Thời lượng:** 0.08 tiết LT.
- **Ghi chú soạn:** Không cho rằng momentum sửa được tất cả khởi tạo xấu, hoặc gradient nhỏ chứng nhận chất lượng. Giữ riêng thời điểm chọn khởi tạo với thứ tự bài học.

#### E02 — Chẩn đoán một phiên huấn luyện

- **Vai trò và mục tiêu:** Trang kiểm tra riêng E, chuyển giao phối hợp; MT1–MT3.
- **Luận điểm trung tâm:** Một quyết định điều chỉnh cần gắn với bằng chứng và cơ chế đã học.
- **Câu hỏi / ý chính:** Một mô hình có $N=10^5$ mẫu; một bước đầy đủ vượt ngân sách. Hai đơn vị ẩn có tham số vào/ra giống nhau và trạng thái momentum bằng 0. Sau huấn luyện, hai thời điểm cho mất mát huấn luyện 0.22,0.17 và lỗi xác thực 0.10,0.14. Đề xuất cách tính gradient theo ngân sách; chỉ ra lỗi khởi tạo và cách sửa; chọn thời điểm lưu. Trong tiểu bài toán độc lập ở $\mathbb R^2$, cho $\theta=(1,1)^T,v=(-0.2,0.2)^T,\beta=0.5$: ghi điểm lấy gradient của Nesterov. Vectơ hai chiều này không phải toàn bộ tham số của mạng ở tình huống trước.
- **Ví dụ/hình dự kiến:** Một phiếu bốn ô: dữ liệu, khởi tạo, đánh giá, điểm đo; không cần hình trang trí.
- **Hình thức hóa:** HT2, HT6, HT8 và tiêu chí A05.
- **Kết nối:** Dùng sơ đồ E01; E03 đối chiếu câu trả lời với mục tiêu.
- **Nguồn:** Tình huống sư phạm tự xây dựng; không dữ liệu thực nghiệm.
- **Thời lượng:** 0.15 tiết BT: 0.06 làm, 0.04 trình bày, 0.05 chữa.
- **Ghi chú / đáp án:** Dùng nhóm nhỏ lấy đều, nêu ngân sách/biến thiên cần kiểm; không có dữ kiện để chốt cỡ nhóm tốt nhất. Phá đối xứng bằng trọng số khác nhau và kiểm thang, không chỉ tăng momentum. Chọn thời điểm đầu theo lỗi xác thực. Điểm Nesterov $(0.9,1.1)$; gradient phải tính tại đó trên nhóm đã chọn.
- **Kiến thức được đo:** Phối hợp ít nhất ba cơ chế, đọc số liệu và tính điểm đo; tất cả từ A–D.
- **Tiêu chí đánh giá:** Mỗi lựa chọn có cơ chế đúng; không đòi cỡ nhóm duy nhất; không dùng tập kiểm thử hoặc mất mát huấn luyện thấp hơn để thay tiêu chí đã cho.

#### E03 — Kết luận và tài liệu đọc

- **Vai trò và mục tiêu:** Đối chiếu mục tiêu và khép tuyến; MT1–MT3.
- **Luận điểm trung tâm:** Người học đã có các công cụ để giải thích một thiết lập huấn luyện cơ bản cùng giới hạn của nó.
- **Ý chính:** MT1: tách mục tiêu và đánh giá. MT2: gradient trung bình, trạng thái, điểm đo. MT3: đối xứng và thang. Tài liệu chính DL §§8.1–8.4; phần nền §5.9, §6.5; đọc tiếp §§8.5–8.7 cho Bài 06.
- **Ví dụ/hình dự kiến:** Bảng mục tiêu → kết quả làm được, tối đa ba hàng; nguồn đọc trong khối riêng, không thêm hình.
- **Hình thức hóa:** Không thêm công thức hoặc thuật toán.
- **Kết nối:** Trả lời vấn đề A03 qua E02; chỉ định ranh giới Bài 06.
- **Nguồn:** DC; DL; BV/HI ghi trong ghi chú và danh mục nguồn khi triển khai.
- **Thời lượng:** 0.07 tiết LT.
- **Ghi chú soạn:** Nhắc những giới hạn đã kiểm: không giảm mỗi bước, không luôn gia tốc, không bảo đảm của công thức khởi tạo. Không kết luận phi lồi là không thể học.

## Tự kiểm của người soạn và giới hạn bàn giao

- 37 trang có trường mục tiêu, luận điểm, nội dung, hình/ví dụ, hình thức, kết nối, nguồn, thời lượng và ghi chú; A07, B08, C08, D11, E02 là năm trang kiểm tra riêng với đề, đáp án và tiêu chí.
- Tổng phân bổ theo thiết kế: 2 tiết LT và 1 tiết BT. Các thời lượng là dự toán nội bộ, cần điều chỉnh sau tập giảng mà vẫn giữ tổng chính thức.
- Các công thức VD1, VD2, VD3 và Glorot được nêu bằng dữ kiện đủ tính lại; điều phối viên kiểm toán số độc lập trong lượt làm mới. Trạng thái xử lý phát hiện nằm trong review-log, không coi ghi chú này là chứng nhận đã hoàn tất rà độc lập.
- Chưa triển khai HTML, SVG, ghi chú công khai hay bài tập công khai. Chưa kiểm khả năng đọc, tràn trang, bàn phím hay xuất tệp của một bộ trang chiếu đã dựng. Storyboard là đặc tả trước triển khai.
- Khảo sát nguồn đã phân biệt quan sát trực tiếp và suy luận người soạn; hai bộ slide đại học thuộc Stanford và Toronto chỉ làm tham chiếu có chọn lọc. Không sao chép hình bên thứ ba chưa đủ quyền.
