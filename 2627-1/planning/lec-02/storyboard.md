# Storyboard Lecture 02 — Các bài toán tối ưu lồi

## 1. Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm | Ký hiệu truyền | Thời lượng |
|---|---|---|---|---|---|---|---|---|---|
| A1. Dạng chuẩn và cải dạng | A01 | A03 | A03 | A02, A04 | Không áp dụng: A04 chỉ minh họa ngắn ba phép cải dạng; A07 là điểm đo chuyển giao duy nhất của cụm A1 | A07 (ca 1, 3) | Tập lồi, hàm lồi → nhận dạng và cải dạng tương đương; LLO3, minh chứng bộ phận CLO1 | $D,\mathcal F,p^*,f_i,h_j$ | 0,22 tiết LT + 0,05 tiết BT |
| A2. Tựa lồi và chia đôi | A05 | A05 | A05 | A05, A06 | A06 | A07 (ca 2) | Tập mức dưới → kiểm tra mức và cập nhật cận; LLO3, minh chứng bộ phận CLO1 | $f,S_t,\phi_t,l,u,\varepsilon$ | 0,18 tiết LT + 0,10 tiết BT |
| B1. LP | B01 | B03 | B03 (ví dụ dẫn nhập) | B02 | B09 (ca a, c) | B09 (ca a, c) | Đa diện, hàm affine → nhận dạng LP và đọc nghiệm; LLO3 | $c,A,b,G,h$ | 0,17 tiết LT + 0,08 tiết BT |
| B2. QP | B02 | B05, B06 | B05 (ví dụ dẫn nhập), B06 | B04 | B09 (ca e) | B09 (ca e) | Dạng toàn phương, PSD → kiểm tra QP và hồi quy ràng buộc; LLO3, minh chứng bộ phận CLO1 | $P,q,r$ | 0,20 tiết LT + 0,12 tiết BT |
| B3. QCQP | B04 | B08 | B08 | B07 | B10 | B10 | QP và PSD → kiểm tra Hessian, miền ellipse và QCQP lồi; LLO3 | $P_i,q_i,r_i$ | 0,18 tiết LT + 0,10 tiết BT |
| C. GP | C01 | C05 | C05 | C02–C04 | C06 | C07 | Log, hàm mũ → đổi GP sang bài toán lồi; LLO3, minh chứng bộ phận CLO1 | $x>0,y=\log x,c_k,a_{kj}$ | 0,30 tiết LT + 0,15 tiết BT |
| D1. SDP theo nón | D01 | D05 | D05 | D02, D03, D04 | D06 | D10 (chặn trị riêng) | Ma trận đối xứng → đọc thứ tự PSD và LMI; LLO3 | $E,K,G,h,\preceq_K,\mathbb S_+^r,F(x)$ | 0,28 tiết LT + 0,10 tiết BT |
| D2. Tối ưu Pareto | D06 | D08 | D08 | D07 | D09 | D10 (quan hệ trội) | Thứ tự theo nón → đánh giá sai số–chi phí và chọn điểm tối tiểu; LLO3, minh chứng bộ phận CLO1 | $\Phi,\mathcal O,\preceq_K,\lambda$ | 0,17 tiết LT + 0,10 tiết BT |
| Tổng hợp | Z01 | Không áp dụng: bảng là công cụ tổng hợp | Các ví dụ trước | Z01 | Z01 | Z02 | Các cụm → pipeline và ca hồi quy AI tích hợp | Toàn bộ bảng ký hiệu | 0,10 tiết LT + 0,20 tiết BT |

Trình tự trong từng khái niệm giữ đúng nhu cầu → trực quan/ví dụ → hình thức → ứng dụng → bài tập. Một số vai trò được gộp: A03 vừa trực quan vừa ví dụ dẫn nhập cho cải dạng; A05 vừa tạo nhu cầu vừa cho ví dụ tựa lồi; A06 vừa hình thức vừa ứng dụng của kiểm tra mức; B03 và B05 là ví dụ dẫn nhập, còn ứng dụng B1/B2 được đo tại B09; B10 vừa ứng dụng vừa bài tập QCQP; C05, D05 và D08 vừa trực quan vừa ví dụ. A07 là điểm đo chuyển giao duy nhất của cụm A1; A04 không đóng vai ứng dụng. Không có bước bị bỏ ngầm.

Phần mở đầu, bốn trang chia phần và các câu chuyển dùng 0,20 tiết lý thuyết. Cộng với các cụm trên, tổng là 2,00 tiết lý thuyết và 1,00 tiết bài tập cho toàn bộ 41 trang. Phân bổ đã tính P00–P03, A01, B01, C01, D01, Z01–Z03 và mọi chuyển mạch; không tạo tuyến phụ hoặc trang đọc thêm.

## 2. Xương sống câu chuyện và điểm nhấn

| Mạch | Chức năng trong câu chuyện | Đầu vào từ mạch trước | Đầu ra cho mạch sau | Đóng góp vào vấn đề trung tâm |
|---|---|---|---|---|
| P — Mở đầu | Đặt sản phẩm học tập và vấn đề nhận dạng cấu trúc ẩn | Kiến thức tiên quyết về tập lồi, hàm lồi, ma trận nửa xác định dương và thứ tự theo nón | Câu hỏi trung tâm cùng pipeline cần hình thành | Xác định đích: không phân loại theo hình thức bề mặt mà phải nhận dạng, cải dạng và chứng nhận |
| A — Khuôn chung và tựa lồi | Xây ngôn ngữ bài toán tối ưu, các cải dạng tương đương và kiểm tra mức | Câu hỏi nhận dạng cấu trúc ẩn từ P | Khuôn ký hiệu, dạng chuẩn lồi và thao tác kiểm tra/cải dạng | Cung cấp hai bước đầu của pipeline: nhận dạng miền–ràng buộc và cải dạng có điều kiện |
| B — LP, QP và QCQP | Tổ chức ba lớp theo mức độ biểu diễn và dùng PSD làm chứng nhận | Khuôn chung cùng năng lực cải dạng từ A | Quy tắc nhận dạng LP/QP/QCQP và chứng nhận lồi bằng kích thước, affine, PSD | Biến pipeline thành các kiểm tra cụ thể trên mục tiêu và ràng buộc bậc nhất/bậc hai |
| C — GP | Xử lý mô hình tích và lũy thừa bằng miền dương và đổi log | Giới hạn của ba lớp bậc nhất/bậc hai từ B | Một bài toán lồi tương đương trong biến log | Chứng minh rằng cải dạng đúng có thể làm lộ cấu trúc lồi không thấy trong biến gốc |
| D — SDP và Pareto | Mở rộng ngôn ngữ thứ tự từ vô hướng sang nón cho ma trận và vector mục tiêu | Kinh nghiệm cải dạng GP và nhu cầu biểu diễn ngoài vô hướng từ C | Mẫu nhận dạng LMI, thứ tự PSD, quan hệ trội và vô hướng hóa | Hoàn chỉnh bước chứng nhận cho ràng buộc ma trận và đánh giá lựa chọn khi nhiều mục tiêu cạnh tranh |
| Z — Kết luận | Thu hồi pipeline, kiểm tra giả thiết và chuyển giao sang ca hồi quy AI | Các quy tắc nhận dạng, cải dạng và chứng nhận từ A–D | Bảng quyết định, ca tích hợp và cầu nối sang đối ngẫu | Trả lời trực tiếp vấn đề trung tâm và đo khả năng áp dụng toàn bộ pipeline |

Sáu mạch gồm một mạch mở P, bốn mạch phát triển A–D và một mạch kết Z; mỗi mạch có đầu vào, đầu ra và chức năng riêng, nên đáp ứng giới hạn 5–7 mạch mà không tạo phần trang trí.

- **Điểm xuất phát:** P03 đặt vấn đề nhận dạng cấu trúc ẩn; A03 chứng minh một biểu diễn có thể che khuất một tập khả thi đơn giản.
- **Tích lũy qua phần A–B:** sau khi có khuôn chung, mỗi lớp LP, QP và QCQP xuất hiện như lời giải cho một mức độ biểu diễn mới. Ví dụ hoặc phản ví dụ đứng trước phát biểu hình thức; B10 đóng riêng vòng QCQP bằng nhiệm vụ kiểm tra Hessian và miền ellipse trước bài tổng hợp B09.
- **Mở rộng qua phần C–D:** GP cho thấy đổi biến có thể tạo tính lồi; SDP cho thấy đổi kiểu thứ tự từ vô hướng sang nón có thể mở rộng ngôn ngữ mô hình. Pareto tái sử dụng chính thứ tự theo nón cho nhiều mục tiêu.
- **Điểm nhấn chính:** A06 là điểm nhấn về thuật toán cải dạng; B08–B07–B10 là điểm nhấn về vai trò chứng nhận PSD; C04–C06 là điểm nhấn về đổi log; D05–D04 và D08–D07 là hai cặp ví dụ → hình thức.
- **Đích đến:** Z01 thu hồi vấn đề P03 bằng bản đồ quyết định; Z02 kiểm tra các giả thiết dễ bỏ; Z03 nối các dạng bài toán sang đối ngẫu ở Lecture 03.

## 3. Bảng theo từng trang

| Mã | Lý do tồn tại và khoảng trống giải quyết | Quan hệ trước → sau | LLO/CLO hoặc minh chứng | Quyết định |
|---|---|---|---|---|
| P00 | Định danh đúng bài và giới hạn trọng tâm ở các lớp bài toán lồi | Chưa có bối cảnh → kiểm kê tiên quyết và sản phẩm học tập | Định hướng LLO3 | thêm: deck mới |
| P01 | Ngăn bài dạy lại Lecture 01 và nêu sản phẩm quan sát được; báo trước thứ tự theo nón sẽ được thiết lập lại ở D02 | Tên và chủ đề bài → chuẩn đầu ra chính thức cần đo | Tiên quyết, LLO3 | sửa: làm rõ trạng thái tiên quyết |
| P02 | Liên kết LLO3 với CLO1 chính thức mà không đồng nhất hai chuẩn | Tiên quyết và sản phẩm dự kiến → bản đồ bốn phần thực hiện mục tiêu | LLO3; minh chứng bộ phận đóng góp CLO1 | sửa: trích đúng CLO1 |
| P03 | Cho người học mô hình bốn phần trước khi vào ký hiệu | Mục tiêu đánh giá → nhu cầu nhận dạng cấu trúc ẩn ở phần A | Bản đồ toàn bài | thêm |
| A01 | Tạo nhu cầu nhận dạng và cải dạng trước định nghĩa | Vấn đề cấu trúc ẩn → ví dụ hai biểu diễn cùng tập khả thi | Nêu quyết định mô hình | sửa: nối trực tiếp tới ví dụ dẫn nhập |
| A03 | Chứng minh biểu diễn ban đầu có thể che cấu trúc lồi; nêu rõ “cùng tập khả thi” chỉ là tương đương trong ví dụ, còn cải dạng tổng quát thêm/bớt biến nhưng bảo toàn giá trị tối ưu và ánh xạ nghiệm | Nhu cầu cải dạng → khuôn ký hiệu để mô tả miền, tập khả thi và giá trị | Cải dạng có kiểm chứng | sửa: đưa ví dụ trước khuôn tổng quát và làm rõ hai mức tương đương |
| A02 | Xác lập miền, hàm mục tiêu $f_0$, các hàm ràng buộc $f_i,h_j$, tập khả thi và $p^*$ sau khi ví dụ tạo nhu cầu ký hiệu | Ví dụ tương đương → dạng chuẩn lồi và các phép cải dạng có chứng nhận | Phân biệt $\pm\infty$ | sửa: nêu đủ vai trò hàm và chuyển thành ngoại lệ nền sau ví dụ |
| A04 | Nêu dạng chuẩn, chứng nhận tập khả thi lồi và minh họa ngắn ba phép cải dạng với đủ điều kiện tương đương | Khuôn tối ưu tổng quát → định nghĩa tựa lồi qua tập mức | Hình thức và minh họa; chưa nhận vai ứng dụng | sửa: nêu giao của miền, tập mức dưới và tập affine là lồi; bổ sung $\operatorname{range}(F)=\ker A$, $\exists s$ và giữ ràng buộc epigraph |
| A05 | Định nghĩa tựa lồi tổng quát và minh họa cả mức âm; nói rõ ví dụ này cũng lồi, còn A07 ca 2 mới phân biệt tựa lồi không lồi | Các phép cải dạng chuẩn → thuật toán chia đôi có đầu vào/đầu ra | Kiểm tra tựa lồi | sửa: thêm $S_t$ cho mọi $t\in\mathbb R$ và chặn ngộ nhận |
| A06 | Biến tính tựa lồi thành thuật toán khả thi có bất biến khoảng, tốc độ co và quy tắc dừng; nhãn cột nêu rõ phép thử $S_t\ne\varnothing$ | Tập mức lồi $S_t$ → bài tập phân biệt lồi và tựa lồi | Đầu vào, đầu ra, cận, bảo đảm sau $k$ vòng và dung sai | sửa: hoàn chỉnh giao diện, nghĩa của “khả thi” và đưa $u_k-l_k=(u_0-l_0)/2^k$ lên mặt slide |
| A07 | Đo khả năng phân loại và cải dạng của cụm A | Quy trình cải dạng và chia đôi → phân cấp LP, QP, QCQP | Bài tập LLO3 | thêm |
| B01 | Đặt quan hệ bao hàm giữa LP, QP, QCQP | Năng lực cải dạng chung → ví dụ hình học của lớp tuyến tính đầu tiên | Nhận dạng lớp | sửa: mở bằng ví dụ LP |
| B03 | Cụ thể hóa hình học LP bằng ví dụ số; hình là cửa sổ hữu hạn của miền không bị chặn và đường mức đi qua nghiệm | Phân cấp ba lớp → dạng LP tổng quát rút ra từ đường mức và đa diện | Nghiệm $(3,0)$ | sửa: đặt trước dạng chuẩn LP và hiệu chỉnh hình |
| B02 | Khái quát ví dụ thành kiểu dữ liệu và ba trạng thái kết quả LP | Hình học LP → nhu cầu thêm độ cong cho sai số bình phương | Dạng chuẩn LP | sửa: hình thức sau trực quan |
| B05 | Nối độ cong bậc hai với bình phương tối thiểu có ràng buộc; gọi tên QP ngay trong ví dụ một biến | Giới hạn mục tiêu affine → QP hai biến cho thấy độ cong theo tọa độ | Ứng dụng LS | sửa: ví dụ dẫn nhập QP; bỏ giả nghịch đảo Moore–Penrose vì không phục vụ LLO3 và xuất hiện đột ngột |
| B06 | Cho một QP hai biến tính đầy đủ để so sánh độ cong theo tọa độ | Bình phương tối thiểu một biến → khuôn ma trận thống nhất hai ví dụ QP | Nghiệm QP | sửa: ví dụ thứ hai trước khuôn chung |
| B04 | Gom hai ví dụ vào dạng QP và xác lập PSD là giả thiết quyết định | Hai ví dụ có mục tiêu cong → phản ví dụ về ràng buộc bậc hai bất định | Dạng chuẩn QP | sửa: hình thức sau ví dụ |
| B08 | Cung cấp phản ví dụ khi ma trận không PSD và tính tường minh giá trị tại trung điểm | Chứng nhận PSD của QP → dạng QCQP lồi với PSD cho mọi hàm bậc hai | Chứng minh tập không lồi | sửa: phản ví dụ chuẩn bị giả thiết QCQP |
| B07 | Mở rộng mục tiêu bậc hai sang ràng buộc bậc hai sau phản ví dụ | Phản ví dụ bất định → bài tập kiểm tra hai miền ellipse bằng Hessian | Dạng chuẩn QCQP | sửa: nối tới B10 |
| B10 | Cung cấp một QCQP lồi cụ thể và đo nhận dạng miền | Dạng QCQP và chứng nhận PSD → bài tổng hợp LP–QP trên miền đa diện | Kiểm tra QCQP, LLO3/CLO1 | thêm: lấp khoảng trống ứng dụng–bài tập QCQP |
| B09 | Đo phân loại LP/QP và tính nghiệm trên đúng miền chung của nguồn | Kiểm tra QCQP bằng Hessian → nhu cầu mô hình tích ngoài ba lớp bậc nhất/bậc hai | Bài tập LLO3 | sửa: khôi phục đề nguồn và đáp án |
| C01 | Tạo nhu cầu cho mô hình tích và lũy thừa | Kết thúc phân cấp bậc hai → ví dụ tích dưới ngân sách | Nhận dạng khoảng trống | sửa: nối tới ví dụ tích |
| C05 | Cho ví dụ dẫn nhập có nghiệm chính xác dùng AM–GM; công thức và kết luận được rút gọn để không cắt đáy ở khung $1280\times720$ | Nhu cầu mô hình tích → thuật ngữ đơn thức và đa thức dương | Nghiệm $(2,2)$ | sửa: đặt trước thuật ngữ hình thức và tối ưu bố cục, không đổi nội dung toán |
| C02 | Đặt tên đơn thức và đa thức dương từ cấu trúc của ví dụ | Các hạng dương trong ví dụ → dạng chuẩn GP | Thuật ngữ và miền | sửa: hình thức sau ví dụ |
| C03 | Nêu đầy đủ dạng chuẩn GP và loại đẳng thức hợp lệ | Viên gạch đơn thức/đa thức dương → phép đổi log tạo tính lồi | Dạng GP | thêm |
| C04 | Giải thích phép đổi log và phát biểu định lý tương đương GP–log với ánh xạ nghiệm và giá trị tối ưu | Dạng GP chưa lồi theo biến gốc → ứng dụng dầm dùng đúng log-tổng-mũ | Cải dạng lồi có chứng nhận | sửa: nêu $x^*=\exp(y^*)$, giá trị mới $\log p^*$ và điều kiện mục tiêu dương trước ứng dụng |
| C06 | Áp dụng đúng phép đổi log cho mô hình dầm chuẩn hóa có ràng buộc cụ thể | Phép đổi log tổng quát → bài tập tự viết một GP tương đương | Ứng dụng có thể kiểm tra | sửa: thay phát biểu chung bằng GP cụ thể |
| C07 | Đo khả năng tự viết bài toán log-tổng-mũ | Ứng dụng dầm → nhu cầu thứ tự cho ma trận và nhiều mục tiêu | Bài tập LLO3 | thêm |
| D01 | Tạo nhu cầu cho ràng buộc ma trận và đa mục tiêu | Giới hạn biểu diễn vô hướng → ngôn ngữ thứ tự theo nón | Hai giới hạn của vô hướng | thêm |
| D02 | Cung cấp ngôn ngữ thứ tự theo nón dùng chung cho ma trận và vector | Hai nhu cầu ma trận/vector → ví dụ chặn hai trị riêng bằng thứ tự PSD | Đọc $\preceq_K$ | sửa: nối tới ví dụ trị riêng |
| D05 | Trực quan hóa bất đẳng thức PSD bằng bài toán cân bằng hai trị riêng | Thứ tự PSD → khuôn tối ưu nón thống nhất LP và SDP | Nghiệm $x=t=1$ | sửa: đặt trước khuôn nón và LMI |
| D03 | Khái quát ví dụ vào khuôn nón trên không gian $E$ | Ví dụ chặn trị riêng → dạng SDP và LMI chính thức | Phân loại dạng nón | sửa: nêu $G:\mathbb R^n\to E$, bỏ tuyến SOCP |
| D04 | Nêu đúng kiểu ma trận, tên LMI của SDP và định lý nghịch ảnh affine chứng nhận tập khả thi lồi | Khuôn nón → ứng dụng LMI khối biểu diễn chuẩn phổ | Dạng chuẩn SDP có chứng nhận | sửa: thu hồi thuật ngữ được báo trước ở D05 và nêu đúng lý do tập LMI lồi |
| D06 | Chứng minh ích lợi biểu diễn của LMI khối | Dạng SDP → tái sử dụng thứ tự theo nón cho đánh đổi hai mục tiêu | Ứng dụng chuẩn phổ | sửa: thêm cầu nối sang tối ưu vector |
| D08 | Cho một đánh đổi mục tiêu có thể kiểm tra bằng đơn điệu và nêu rõ thứ tự theo nón còn dùng cho vector mục tiêu | Thứ tự theo nón chuyển từ ma trận sang vector → định nghĩa phần tử nhỏ nhất và tối tiểu | Trực quan quan hệ trội | sửa: thêm cầu nối và bỏ thuật ngữ Pareto trước định nghĩa |
| D07 | Phân biệt phần tử nhỏ nhất và tối tiểu từ ví dụ đánh đổi, dựa trên nón nhọn ở D02 | Đường đánh đổi không có điểm trội tất cả → vô hướng hóa để chọn một điểm tối tiểu | Khái niệm Pareto | sửa: hình thức sau trực quan và nối giả thiết |
| D09 | Tách trọng số dương khỏi hai đầu mút, nêu chiều thuận và điều kiện của chiều đảo, rồi nối đánh đổi AI | Khái niệm điểm tối tiểu → bài tập song song về LMI và quan hệ trội | Đánh giá sai số–chi phí, CLO1 | sửa: phân biệt $0<\lambda<1$ với $\lambda\in\{0,1\}$; trọng số dương sinh nghiệm Pareto, chiều đảo cần tính lồi phù hợp |
| D10 | Đo đồng thời LMI và quan hệ trội dưới một nhãn “Câu hỏi:” chung | Hai nhánh SDP/Pareto → bản đồ quyết định thu hồi toàn bộ lớp bài toán | Bài tập LLO3 | sửa: gộp lời mời tương tác |
| Z01 | Thu hồi pipeline nhận dạng → cải dạng → chứng nhận và trả lời P03 | Kết quả bài tập các lớp → ca AI tích hợp | Tổng hợp LLO3 | sửa: làm rõ kết luận câu chuyện |
| Z02 | Kiểm tra giả thiết và chuyển giao sang hồi quy AI có ràng buộc với đủ kiểu $X,y,w,\tau$; mọi nhiệm vụ nằm dưới nhãn “Câu hỏi:” | Pipeline tổng hợp → tài liệu nguồn và cầu nối sang đối ngẫu | LLO3; minh chứng bộ phận CLO1 | sửa: thêm ca AI tích hợp, dữ kiện kích thước và chỉnh đáp án đẳng thức |
| Z03 | Truy nguyên nguồn và tạo cầu nối tới đối ngẫu; trạng thái metadata chưa xác minh nằm trong ghi chú thay vì mặt trang | Tự kiểm tra LLO3 → Lecture 03 dùng dạng chuẩn làm đầu vào cho đối ngẫu | Đọc thêm, phụ thuộc | sửa: giảm tải mặt trang nhưng giữ minh bạch nguồn |

## 4. Sai khác có chủ ý so với nguồn

- Không sao chép ảnh hoặc bố cục trang nguồn; hình kỹ thuật được vẽ lại thành SVG cục bộ.
- Tách QCQP khỏi QP để nêu riêng giả thiết $P_i\succeq0$ và phản ví dụ ma trận bất định.
- Bỏ giả nghịch đảo Moore–Penrose khỏi B05 và Z02; nội dung này không cần cho việc nhận dạng QP và làm đứt mạch ví dụ một biến sang dạng tổng quát.
- Bài tập B09 giữ đúng miền khả thi chung và các mục tiêu a, c, e của nguồn; sửa nhãn phân loại sai nếu có và tính lại kết quả mà không dùng kỹ thuật chưa được chuẩn bị.
- Đổi thứ tự vật lý nhưng giữ nguyên mã truy nguyên: A03 trước A02; B03 trước B02, B05–B06 trước B04, B08 trước B07; C05 trước C02; D05 trước D03–D04 và D08 trước D07. Thêm B10 sau B07 để hoàn thành riêng chu trình QCQP. Mục đích là đặt nhu cầu, trực quan hoặc ví dụ trước phát biểu hình thức và đóng mỗi khái niệm bằng ứng dụng hoặc bài tập.
- Thêm caveat: tổng trọng số không sinh mọi nghiệm Pareto nếu tập mục tiêu không lồi.
