# Storyboard Bài giảng 03 — Đối ngẫu Lagrange

## 1. Bản đồ bảy mạch

| Mạch | Chức năng | Đầu vào | Đầu ra | Đóng góp cho vấn đề trung tâm |
|---|---|---|---|---|
| P — Mở đầu | Đặt vấn đề chứng nhận và mục tiêu LLO4–5 | Dạng chuẩn, tính lồi, gradient, nón từ Bài 01–02 | Nhu cầu xây cận có thể kiểm chứng | Xác định đích của toàn bài |
| A — Cận đối ngẫu | Hấp thụ ràng buộc và xây cận tốt nhất | Bài toán gốc dạng chuẩn | $g$, bài toán đối ngẫu, $d^*\le p^*$ | Tạo chứng nhận cận dù chưa biết nghiệm gốc |
| B — Cận khít | Phân biệt yếu/mạnh và dùng Slater | Họ cận cùng $p^*,d^*$ | Điều kiện đủ để $d^*=p^*$ | Xác định khi chứng nhận cận trở thành chứng nhận tối ưu |
| C — Hình học | Giải thích cận bằng tập giá trị, đường đỡ và điểm yên ngựa của $L$ | Đối ngẫu mạnh và Slater | Hình học của $g$, $p^*$, độ khít và điểm yên ngựa | Trực tiếp đo LLO5, giải thích cơ chế đại số và nối sang KKT |
| D — KKT | Chuyển tiếp xúc thành bốn điều kiện kiểm tra | Đối ngẫu mạnh, gradient và ràng buộc hoạt động | Chứng nhận KKT đúng giả thiết | Biến cận khít thành quy trình xác nhận nghiệm |
| E — Độ nhạy | Diễn giải nhân tử và mở rộng theo nón | Nhân tử tối ưu từ KKT | Cận hàm giá trị, đạo hàm cục bộ, nhân tử nón | Dùng chứng nhận để dự báo tác động thay đổi mô hình |
| Z — Kết luận | Thu hồi pipeline và đo chuyển giao | Kết quả A–E | Bản đồ quyết định và cầu nối Lecture 04 | Trả lời P03 bằng một quy trình hoàn chỉnh |

Bảy mạch gồm mở đầu P, năm mạch phát triển A–E và kết luận Z; mỗi mạch là một `<section>` ngoài, có chức năng và sản phẩm riêng.

## 2. Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm; ký hiệu truyền | Thời lượng |
|---|---|---|---|---|---|---|---|---|
| Hàm và bài toán đối ngẫu | P03, A01 | A03 | A02, A06 | A04, A05, A07, A08 | A08 | A08 | Dạng chuẩn → phân biệt miền định nghĩa của $L,g$ với khả thi $\lambda\ge0$, rồi lập cận; $x,f_0,f_1,\lambda,p^*,d^*$ | 0,45 LT + 0,15 BT |
| Đối ngẫu mạnh và Slater | B01 | B03 | B03 | B02, B04 | B05 | B06 | $d^*\le p^*$ → quan sát cận khít rồi kiểm tra $\operatorname{relint}D$, đẳng thức affine và hai loại bất đẳng thức | 0,30 LT + 0,15 BT |
| Hình học đối ngẫu | C01 | C03 | C03 | C02, C04, C05, C07 | C05, C07 | C06 | $g,\lambda,p^*$ → nhìn đường đỡ trước khi định nghĩa $\mathcal G,\mathcal A$, rồi đóng bằng điểm yên ngựa | 0,30 LT + 0,15 BT |
| KKT | D01 | D05 | D05 | D02–D04 | D06 | D07 | Hai ứng viên biên → bù trừ, bốn nhóm với $0\in\nabla_xL+N_D$ và phạm vi kết luận; $x,\lambda,\nu,D,N_D$ | 0,40 LT + 0,25 BT |
| Độ nhạy | E01 | E02 | E02 | E03–E04 | E05 | Z02 | Nhân tử KKT → ví dụ nới ràng buộc, cận và đạo hàm hàm giá trị; $u,v,p^*(u,v)$ | 0,30 LT + 0,15 BT |
| Bất đẳng thức tổng quát | E06 | Không áp dụng: nón và thứ tự theo nón đã là tiên quyết | E06, dùng SDP Bài 02 | E06, định nghĩa $K^*$ tại chỗ | E06 | E06, hỏi nón chứa $Z$ và hạng $\operatorname{tr}(ZF(x))$ | Giới hạn nhân tử vô hướng → định nghĩa nón đối ngẫu rồi chọn nhân tử trong $K^*$; $K,K^*,Z$ | gộp trong cụm E |

Chu trình rút gọn của bất đẳng thức tổng quát là `nhu cầu → hình thức → kiểm tra` vì nón và thứ tự theo nón đã được chuẩn bị ở Bài 01–02; nón đối ngẫu $K^*$ được định nghĩa tại E06 trước khi dùng. Các ví dụ xuyên suốt giữ nguyên ký hiệu từ A02 đến E05; QP tại D07 dùng lại kết quả A08 thay vì lặp phép lập đối ngẫu. A08 gộp ứng dụng và bài tập vì cùng đo việc tối đa hóa hàm đối ngẫu, không tạo luận điểm thứ hai. Thứ tự mã vật lý B01→B03→B02 và C01→C03→C02 là có chủ ý: ví dụ hoặc trực quan đi trước tên gọi hình thức. Bài tập kết thúc hành trình độ nhạy được đặt tại Z02 để E06 giữ vai trò cầu nối sang nón.

## 3. Xương sống và điểm nhấn

- P03 đặt câu hỏi chứng nhận; A cho một họ cận; B xác định khi cận khít; C giải thích cơ chế hình học; D biến tiếp xúc thành KKT; E đọc nhân tử như độ nhạy; Z thu hồi toàn tuyến.
- Điểm nhấn toán học là chuỗi $f_0(x)\ge L(x,\lambda,\nu)\ge g(\lambda,\nu)$, điểm khít $d^*=p^*$, bốn nhóm KKT và dấu $p'(0)=-\lambda^*$.
- Điểm nhấn hình học là đường $t+\lambda u=g(\lambda)$; tại $\lambda^*=2$, đường $t=5-2u$ tiếp xúc ở $(0,5)$.
- Câu nối bắt buộc: A08→B01 hỏi cận tốt nhất có khít; B01→B03 quan sát một cận khít trước khi B02 đặt tên; B06→C01 chuyển từ kết luận đại số sang giải thích hình học; C01→C03 nhìn đường đỡ trước C02; C06→C07 chuyển từ đọc hình sang khái niệm điểm yên ngựa của $L$; C07→D01 chuyển điểm yên ngựa và tiếp xúc sang pháp tuyến trong KKT; D01→D05 so sánh ứng viên trước khi hình thức hóa KKT; D07→E01 chuyển nhân tử từ chứng nhận sang thông tin; E06→Z01 thu hồi quy trình; Z02 đóng bài tập của hành trình E.

## 4. Quyết định theo từng trang

| Mã | Lý do tồn tại và khoảng trống giải quyết | Quan hệ trước → sau | LLO/CLO | Quyết định |
|---|---|---|---|---|
| P00 | Định danh đúng Buổi 3 và chủ đề | Chưa có bối cảnh → P01 kiểm kê đầu vào | Định hướng LLO4–5 | thêm |
| P01 | Ngăn dạy lại kiến thức nền, đồng thời báo trước nội tương đối và dưới gradient sẽ được định nghĩa tại chỗ | Chủ đề → P02 nêu sản phẩm đánh giá | Tiên quyết | sửa theo phản biện sinh viên |
| P02 | Trích nguyên văn LLO4–5 và tách sản phẩm Slater/KKT/độ nhạy để không mở rộng sai chuẩn | Đầu vào → P03 đặt vấn đề trung tâm | LLO4–5/CLO1 | sửa theo kiểm định storyboard |
| P03 | Cho bản đồ bảy mạch trước khi vào ký hiệu | Mục tiêu → A01 tạo nhu cầu cận | Toàn bài | thêm |
| A01 | Chỉ ra nghiệm ứng viên thiếu chứng nhận | Vấn đề trung tâm → A02 cho bài toán cụ thể | LLO4 | thêm |
| A02 | Xác lập ví dụ và mọi ký hiệu truyền A–E | Nhu cầu cận → A03 thử hấp thụ ràng buộc | LLO4 | thêm từ Bài 1 |
| A03 | Trực quan hóa infimum của Lagrangian là cận | Ví dụ gốc → A04 khái quát Lagrangian | LLO4 | thêm; SVG tự vẽ |
| A04 | Nêu miền khác rỗng, định nghĩa $L$ cho mọi nhân tử thực và giải thích trực tiếp vì sao $\lambda\ge0$ tạo cận dưới tại điểm khả thi | Họ hàm ví dụ → A05 lấy infimum để định nghĩa $g$ | LLO4 | sửa: bỏ báo trước theo mã trang; nối bằng bất đẳng thức $L\le f_0$ |
| A05 | Giải thích hàm đối ngẫu, miền hữu hiệu và tính lõm | $L$ tổng quát → A06 tính $g$ ví dụ | LLO4 | giữ trục MIT 5-3 |
| A06 | Tính đúng $g$ và tách $\operatorname{dom}g$ khỏi $\lambda\ge0$ | Định nghĩa $g$ → A07 chứng minh cận | LLO4 | sửa theo math-spec |
| A07 | Chứng minh đối ngẫu yếu và chỉ rõ chỗ dùng dấu | Công thức ví dụ → A08 chọn cận tốt nhất | LLO4/CLO1 | giữ |
| A08 | Định nghĩa bài toán đối ngẫu và giải phần đối ngẫu của QP chuyển giao | Cận cho mỗi nhân tử → B01 hỏi độ khít; kết quả chuyển sang D07 | LLO4 | sửa: tối đa hóa $g$, suy ra $\lambda^*=1$, $x^*=(1/2,1/2)$ |
| B01 | Định nghĩa nhu cầu bằng đại lượng $p^*-d^*$ và chỉ ra tính lồi chưa đủ cho khoảng bằng không | Cận tốt nhất → B03 quan sát một cận khít | LLO4 | sửa: thay đối lập khẩu hiệu bằng đại lượng đo được |
| B03 | Cho quan sát cận khít tính được, đúng $\lambda^*=2$ | Nhu cầu độ khít → B02 đặt tên kết quả | LLO4 | đổi thứ tự; SVG tự vẽ |
| B02 | Khóa ba khái niệm $d^*\le p^*$, mạnh và khoảng sau ví dụ | Kết quả tính B03 → B04 hỏi giả thiết bảo đảm | LLO4 | đổi thứ tự để hình thức theo sau ví dụ |
| B04 | Định nghĩa nội tương đối trước khi nêu Slater tinh chỉnh đúng vai trò điều kiện đủ | Ví dụ khít → B05 áp điểm khả thi chặt | LLO4/CLO1 | sửa khoảng trống tiên quyết và giả thiết affine |
| B05 | Dùng $x=3$ để kết luận mạnh và đạt nghiệm đối ngẫu | Slater tổng quát → B06 phân loại kết luận | LLO4 | thêm ứng dụng |
| B06 | Chặn suy luận đảo hoặc bỏ khả thi tương đối/affine | Chứng nhận ví dụ → C01 mở hình học | LLO4/CLO1 | sửa câu hỏi và đáp án theo Slater tinh chỉnh |
| C01 | Mở trực tiếp năng lực LLO5 | Kết luận đại số → C03 nhìn đường đỡ | LLO5 | sửa câu nối |
| C03 | Cho hình đọc được với $u=f_1(x)$, $t=f_0(x)$; chỉ gọi là đường cận cho tới khi tập mở rộng được định nghĩa | Nhu cầu hình học → C02 gọi tên họ điểm | LLO5 | sửa thuật ngữ để không dùng “đường đỡ” trước đối tượng được đỡ |
| C02 | Hình thức hóa họ điểm quan sát ở C03 thành tập giá trị | Trực quan → C04 thêm tập mở rộng | LLO5 | đổi thứ tự; giữ MIT 5-15 |
| C04 | Phân biệt $\mathcal G$ với $\mathcal A$; đặt $(0,p^*)$ trên biên của $\operatorname{cl}\mathcal A$ khi $p^*$ hữu hạn | Đường cận → C05 giải thích đối ngẫu mạnh bằng đường đỡ | LLO5 | sửa: dùng bao đóng để bao quát infimum không đạt |
| C05 | Nối hệ số góc $-\lambda^*$, pháp tuyến $(\lambda^*,1)$ với $\lambda^*\nabla f$ trong KKT | Tập mở rộng → C06 đọc hình mới | LLO5/CLO1 | sửa cầu nối hình học–KKT; chứng minh dài ở notes |
| C06 | Đo khả năng đọc hình với chính hình tham chiếu thu nhỏ | Cơ chế tiếp xúc → C07 định nghĩa điểm yên ngựa | LLO5 | sửa; nhúng `dual-geometry.svg` |
| C07 | Đưa khái niệm điểm yên ngựa của $L$ từ lecture note vào deck: định nghĩa hai phía, ví dụ $L(2,\lambda)=5$, $L(x,2)=3(x-2)^2+5$, và định lý tương đương với nghiệm gốc–đối ngẫu đều đạt cùng $p^*=d^*$; nối đối ngẫu mạnh với KKT | Bài tập đọc hình → D01 chuyển sang điều kiện KKT | LLO4/CLO1 | thêm; một luận điểm duy nhất, chi tiết chứng minh ở lecture note |
| D01 | Tạo nhu cầu hệ điều kiện kiểm tra được | Hình tiếp xúc → D05 so sánh ứng viên | LLO4 | sửa câu nối |
| D05 | So sánh hai ứng viên bằng $\nabla_xL=0$ cho biến chạy trên toàn $\mathbb R$, chưa dùng nón pháp tuyến trước khi định nghĩa | Nhu cầu cục bộ → D02 giải thích bù trừ | LLO4 | sửa thứ tự giới thiệu ký hiệu |
| D02 | Nối khoảng bằng không với ràng buộc hoạt động | Nhu cầu kiểm tra → D03 gom bốn nhóm | LLO4 | giữ MIT 5-17 |
| D03 | Đặt đủ bốn nhóm KKT; định nghĩa nón pháp tuyến và dùng $0\in\nabla_xL(x^*,\lambda^*,\nu^*)+N_D(x^*)$ | Bù trừ → D04 phân biệt cần/đủ | LLO4 | sửa để bao quát miền $D$ lồi |
| D04 | Ngăn dùng KKT vô điều kiện bằng cách khóa phạm vi ở phiên bản lồi khả vi; tách vai trò Slater cho tính cần khỏi vai trò tính lồi cho tính đủ | Bốn nhóm → D06 ứng dụng AI | LLO4/CLO1 | sửa: bỏ nhánh KKT không trơn chưa được định nghĩa; E04 chỉ còn phục vụ độ nhạy |
| D06 | Chuyển KKT sang hồi quy có ràng buộc chuẩn | Ví dụ vô hướng → D07 chuyển giao hai biến | LLO4/CLO1 | thêm ứng dụng AI |
| D07 | Dùng kết quả A08 để chỉ đo Slater, đủ bốn nhóm KKT và giả thiết kết luận | KKT ứng dụng → E01 đọc nhân tử như thông tin | LLO4 | sửa để không lặp phép lập đối ngẫu |
| E01 | Tạo nhu cầu sau khi đã biết nghiệm | Nhân tử KKT → E02 định nghĩa nhiễu | LLO4/CLO1 | thêm |
| E02 | Cho ví dụ và trực quan nới ràng buộc trước định nghĩa tổng quát | Nhu cầu độ nhạy → E03 hình thức hóa hàm giá trị | LLO4 | đổi vai trò; dùng hình tự vẽ |
| E03 | Định nghĩa tổng quát và nêu cận toàn cục với đủ giả thiết | Ví dụ E02 → E04 chuyển sang đạo hàm | LLO4 | gộp MIT 5-21–5-22 |
| E04 | Định nghĩa dưới gradient bằng bất đẳng thức đường đỡ, rồi nêu quan hệ với nhân tử khi đối ngẫu mạnh và đạt nghiệm | Cận toàn cục → E05 tính ví dụ | LLO4/CLO1 | sửa đủ tiên quyết, giả thiết và giới hạn |
| E05 | Áp dụng đủ ba miền, $\lambda^*(0)=2$; phân biệt suy biến tại $u=8$ với không hoạt động khi $u>8$ | Công thức cục bộ → E06 mở rộng theo nón | LLO4 | sửa notes theo hậu kiểm; mặt trang giữ $\lambda^*(u)=0$ khi $u\ge8$ |
| E06 | Định nghĩa $K^*$, $F(x)\in\mathbb S^r$ và $Z\in\mathbb S_+^r$ trước khi nối SDP và kiểm tra nón chứa nhân tử | Độ nhạy vô hướng → Z01 tổng hợp | LLO4/CLO1 | sửa tiên quyết, kiểu/kích thước; giữ câu hỏi; gộp MIT 5-28–30 |
| Z01 | Trả lời trực tiếp P03 và thu hồi mở rộng từ nhân tử vô hướng sang nón đối ngẫu | Kết quả A–E → Z02 tự kiểm tra | LLO4–5 | sửa notes để đóng cầu nối E06 |
| Z02 | Đo giả thiết, hình học, KKT và tính $p^{*\prime}(0)$ cùng xấp xỉ bậc nhất | Pipeline → Z03 nguồn và chuyển tiếp | LLO4–5/CLO1 | sửa; nhận bài tập của hành trình E |
| Z03 | Truy nguyên nguồn và nối Lecture 04 | Tự kiểm tra → tối ưu không ràng buộc/có đẳng thức | Đọc tiếp | thêm |

## 5. Sai khác có chủ ý so với mẫu

- Giữ trục MIT 5-2 đến 5-30 nhưng dùng một ví dụ xuyên suốt thay vì đổi ví dụ liên tục.
- Gộp các ví dụ chuyên biệt không đo LLO4–5; thêm D06 để nối KKT với hồi quy có ràng buộc.
- Không sao chụp hình MIT; vẽ lại bốn SVG cục bộ bằng cùng phép đổi tọa độ trong từng hình và polyline lấy mẫu trực tiếp từ công thức.
- Dùng $p^*,d^*$ nhất quán với Bài 02; dùng $\mathcal G,\mathcal A$ cho tập hình học để không nhầm với ma trận $A$.
- Khóa quy ước nhiễu $f_i\le u_i$ nên dấu độ nhạy là âm; không sao chép lỗi $\lambda^*=1$ từ outline Codex Slides tham chiếu.
