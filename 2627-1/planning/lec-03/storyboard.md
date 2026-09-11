# Storyboard Bài 03 — Khung Đối ngẫu Lagrange

**Phiên bản 2026-09-11:** 36 trang, 7 mạch. Bảng mô tả vai trò dự kiến, không xác nhận TODO đã được triển khai. Yêu cầu mới của người dùng thay thế cấu trúc chi tiết 41 trang trước đây.

## Chức năng và kết nối các mạch

| Mạch | Chức năng | Đầu vào | Đầu ra | Thời lượng nội bộ dự kiến (tiết) |
|---|---|---|---|---|
| 1. Mở đầu | Định vị nhu cầu chứng nhận | Dạng chuẩn và tính lồi ở Bài 02 | Mục tiêu và vấn đề trung tâm | 0,20 |
| 2. Đối ngẫu | Xây và tối ưu hóa cận dưới | Nghiệm khả thi chưa đủ chứng nhận | Hàm đối ngẫu và đối ngẫu yếu | 0,75 |
| 3. Slater | Xác định bảo đảm cận khít | Khoảng đối ngẫu | Giả thiết đối ngẫu mạnh và giới hạn | 0,45 |
| 4. Hình học | Đọc cận và nhân tử bằng hình | Cận khít và ví dụ đã tính | Đường cận, tiếp xúc và hệ số góc | 0,35 |
| 5. KKT | Chuyển cận khít thành hệ kiểm nghiệm | Tiếp xúc và dấu bằng | Nghiệm và chứng nhận trong bài lồi | 0,70 |
| 6. Độ nhạy | Dùng nhân tử dự đoán thay đổi | Nhân tử tối ưu từ KKT | Xấp xỉ thay đổi giá trị tối ưu | 0,35 |
| 7. Tổng hợp | Chuyển giao toàn bộ lập luận | Cận, Slater, KKT và độ nhạy | Bài tập tích hợp và chuẩn bị bài tiếp | 0,20 |

Tổng 3 tiết theo phạm vi buổi; khi soạn sẽ phân phối hoạt động trong 2 tiết lý thuyết và 1 tiết bài tập. Đây không phải thời lượng hiển thị.

## Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức | Ứng dụng | Bài tập |
|---|---|---|---|---|---|---|
| Đối ngẫu | S02-01 | S02-03 | S02-02 dẫn nhập; S02-03, S02-05 tính cận | S02-04–06 | S02-07 chọn cận tốt nhất | S02-08 |
| Slater | S03-01 | S03-01 khoảng cận | S03-02 | S03-03 | S03-04; S03-05 phản ví dụ | S03-06 |
| Hình học | S04-01 | S04-01 đổi tọa độ | S04-01 các điểm đã tính | S04-02 tập giá trị, đường cận | S04-03 tiếp xúc | S04-04 |
| KKT | S05-01 | S05-01 cân bằng gradient | S05-01; S05-02 hoạt động với nhân tử không | S05-03; S05-05 giả thiết kết luận | S05-04 giải ví dụ; S05-06 hồi quy | S05-07 |
| Độ nhạy | S06-01 | S06-02 miền thay đổi | S06-02 tính giá trị | S06-03 | S06-04 hồi quy | S06-05 |

- Đối ngẫu: đầu vào là dạng chuẩn và miền khả thi; truyền cùng $x,f_0,f_1$ sang $L,g,\lambda$. Ví dụ dẫn nhập cụ thể hóa nhu cầu tìm cận trước khi dựng họ hàm. Sản phẩm đo LLO4 là một chứng nhận cận dưới. Câu nối: nghiệm khả thi cho một phía, hàm Lagrange bổ sung phía còn lại.
- Slater: nhận $g,\lambda,p^*,d^*$; chuyển điểm trong miền ở ví dụ thành điểm khả thi nghiêm trong phát biểu. Trực quan gộp với nhu cầu vì cùng giải thích khoảng cận. Sản phẩm đo CLO1: tìm một điểm chứng minh Slater và nêu đúng kết luận.
- Hình học: nhận $f_0,f_1,g$; lập $u=f_1(x),t=f_0(x)$ bằng các điểm cụ thể trước công thức đường. Gộp nhu cầu/trực quan/ví dụ vì chỉ một phép đổi biểu diễn. Sản phẩm đo LLO5: đọc tung độ cắt, độ dốc và khoảng đối ngẫu.
- KKT: nhận cận khít và gradient; giữ $x,\lambda$ khi chuyển cân bằng trên ví dụ sang bốn nhóm tổng quát. S05-01 giới thiệu nhu cầu và hình gradient trước hệ; S05-04 chỉ dùng hệ đã học để tìm ứng viên, S05-05 mới chốt giả thiết chứng nhận. Sản phẩm đo CLO1 là nghiệm kèm kiểm tra giả thiết.
- Độ nhạy: nhận nhân tử tối ưu; dùng nhiễu vế phải $u$ và $p(u)$, phân biệt tọa độ hình học ở mạch trước khi định nghĩa lại $u$. Ví dụ và hình cùng mô tả một phép nới ràng buộc. Sản phẩm đo CLO1 là xấp xỉ giá trị tối ưu, không phải độ dịch chuyển của nghiệm.
- Mở rộng cuối bài chưa phát triển khái niệm hay giao bài bắt buộc; chu trình sáu bước không áp dụng cho danh mục đọc thêm. Khi mở rộng thành nội dung giảng phải lập lại chu trình riêng.

## Vai trò từng trang và ánh xạ phiên bản trước

| Mã | Tiêu đề | Nhu cầu/lý do tồn tại | Trước → Sau | Chuẩn/Minh chứng | Quyết định và nguồn cũ |
|---|---|---|---|---|---|
| S01-01 | Bài 03: Đối ngẫu Lagrange | định danh: Giới thiệu học phần, đơn vị phụ trách và chủ đề đối ngẫu Lagrange. | Bài 02 → S01-02 | LLO4–5 / CLO1 | sửa: P00; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S01-02 | Mục tiêu học tập | tiên quyết và mục tiêu: Nêu tiên quyết và mục tiêu giải thích cận dưới, đọc hình, kiểm tra điều kiện tối ưu. | S01-01 → S01-03 | LLO4–5 / CLO1 | gộp: P01 + P02; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S01-03 | Nội dung chính | bản đồ lập luận: Nối các mạch cận dưới, đối ngẫu mạnh, hình học, điều kiện tối ưu và độ nhạy. | S01-02 → S02-01 | LLO4–5 / CLO1 | sửa: P03; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S02-01 | Hàm và bài toán đối ngẫu Lagrange | nhu cầu: Nêu nhu cầu chứng nhận một nghiệm khả thi bằng cận dưới của giá trị tối ưu. | S01-03 → S02-02 | LLO4 / CLO1 | sửa: A01; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S02-02 | Ví dụ tối ưu có ràng buộc | ví dụ dẫn nhập: Giới thiệu ví dụ bậc hai xuyên suốt, miền khả thi và nghiệm ứng viên. | S02-01 → S02-03 | LLO4 / CLO1 | sửa: A02; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S02-03 | Họ hàm tạo cận dưới | trực quan và ví dụ tính được: Vẽ họ hàm tạo cận và kiểm tra một cận cụ thể trên ví dụ. | S02-02 → S02-04 | LLO4 / CLO1 | sửa: A03; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S02-04 | Hàm Lagrange | hình thức: Định nghĩa hàm Lagrange, miền biến và quy ước dấu của các nhân tử. | S02-03 → S02-05 | LLO4 / CLO1 | sửa: A04; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S02-05 | Hàm đối ngẫu | hình thức và tính toán: Định nghĩa hàm đối ngẫu bằng cận dưới đúng và tính trên ví dụ xuyên suốt. | S02-04 → S02-06 | LLO4 / CLO1 | gộp: A05 + A06; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S02-06 | Đối ngẫu yếu | chứng minh: Chứng minh đối ngẫu yếu bằng chuỗi bất đẳng thức, không cần giả thiết lồi. | S02-05 → S02-07 | LLO4 / CLO1 | sửa: A07; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S02-07 | Bài toán đối ngẫu | ứng dụng: Chọn cận dưới tốt nhất trong ví dụ và phát biểu bài toán đối ngẫu. | S02-06 → S02-08 | LLO4 / CLO1 | sửa: A08; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S02-08 | Bài tập xây dựng cận dưới | bài tập: Giao bài tập tạo cận dưới và chứng nhận nghiệm cho một bài toán mới. | S02-07 → S03-01 | LLO4 / CLO1 | tách: A08 (tách luyện tập); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S03-01 | Đối ngẫu mạnh và điều kiện Slater | nhu cầu và trực quan: Minh họa khoảng giữa cận dưới và giá trị tối ưu; nêu nhu cầu bảo đảm cận khít. | S02-08 → S03-02 | CLO1; hỗ trợ LLO4–5 | sửa: B01; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S03-02 | Cận khít trong ví dụ | ví dụ: Tìm nhân tử cho cận khít trong ví dụ và đặt tên đối ngẫu mạnh. | S03-01 → S03-03 | CLO1; hỗ trợ LLO4–5 | gộp: B03 + B02; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S03-03 | Điều kiện Slater | hình thức: Phát biểu Slater với giả thiết lồi, miền toàn không gian và điểm khả thi nghiêm. | S03-02 → S03-04 | CLO1; hỗ trợ LLO4–5 | sửa: B04 (phiên bản cơ bản); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S03-04 | Kiểm tra điều kiện Slater | ứng dụng: Tìm điểm thỏa Slater trong ví dụ và phân biệt điểm này với nghiệm tối ưu. | S03-03 → S03-05 | CLO1; hỗ trợ LLO4–5 | sửa: B05; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S03-05 | Giới hạn của điều kiện Slater | phản ví dụ: Dùng phản ví dụ phân biệt điều kiện đủ, đối ngẫu mạnh và sự đạt nghiệm đối ngẫu. | S03-04 → S03-06 | CLO1; hỗ trợ LLO4–5 | tách: B06 (tách phản ví dụ); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S03-06 | Bài tập đối ngẫu mạnh và Slater | bài tập: Giao bài tập kiểm tra Slater và xác định những kết luận được bảo đảm. | S03-05 → S04-01 | CLO1; hỗ trợ LLO4–5 | sửa: B06; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S04-01 | Hình học của đối ngẫu | nhu cầu, trực quan và ví dụ: Nêu nhu cầu đọc cận bằng hình và đổi tọa độ trên các điểm của ví dụ. | S03-06 → S04-02 | LLO5 / CLO1 | gộp: C01 + C03 (đổi tọa độ); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S04-02 | Đường cận trong mặt phẳng giá trị | hình thức và trực quan: Vẽ tập giá trị và đường cận; giải thích hệ số góc và tung độ cắt. | S04-01 → S04-03 | LLO5 / CLO1 | gộp: C03 + C02; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S04-03 | Tiếp xúc và đối ngẫu mạnh | ứng dụng: Liên hệ đường cận khít với giá trị tối ưu và điều kiện tiếp xúc trong ví dụ. | S04-02 → S04-04 | LLO5 / CLO1 | sửa: C05; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S04-04 | Bài tập đọc hình đối ngẫu | bài tập: Giao bài tập đọc cận, nhân tử và khoảng đối ngẫu từ hình. | S04-03 → S05-01 | LLO5 / CLO1 | sửa: C06; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S05-01 | Điều kiện Karush–Kuhn–Tucker (KKT) | nhu cầu, trực quan và ví dụ: Suy điều kiện tối ưu từ cận khít; minh họa cân bằng gradient trong ví dụ. | S04-04 → S05-02 | CLO1; hỗ trợ LLO4–5 | gộp: D01 + D05 (trực quan); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S05-02 | Ràng buộc hoạt động và bù trừ | trực quan và phản ví dụ: Giải thích bù trừ và kiểm tra trường hợp ràng buộc hoạt động có nhân tử bằng không. | S05-01 → S05-03 | CLO1; hỗ trợ LLO4–5 | sửa: D02; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S05-03 | Bốn nhóm điều kiện KKT | hình thức: Trình bày khả thi gốc, khả thi đối ngẫu, bù trừ và dừng trong trường hợp khả vi. | S05-02 → S05-04 | CLO1; hỗ trợ LLO4–5 | sửa: D03 (phiên bản cơ bản); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S05-04 | Giải ví dụ bằng KKT | tính toán: Giải các trường hợp của ví dụ và loại ứng viên vi phạm tính khả thi hoặc dấu nhân tử. | S05-03 → S05-05 | CLO1; hỗ trợ LLO4–5 | sửa: D05 (tính toán); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S05-05 | Điều kiện cần và điều kiện đủ | giả thiết kết luận: Nêu giả thiết cho tính cần và tính đủ; phân biệt bài toán lồi với phi lồi. | S05-04 → S05-06 | CLO1; hỗ trợ LLO4–5 | sửa: D04; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S05-06 | KKT trong hồi quy có ràng buộc | ứng dụng: Áp dụng KKT cho hồi quy có ràng buộc chuẩn và kiểm tra điều kiện Slater. | S05-05 → S05-07 | CLO1; hỗ trợ LLO4–5 | sửa: D06; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S05-07 | Bài tập kiểm tra nghiệm tối ưu | bài tập: Giao bài tập kiểm tra bốn nhóm KKT và biện minh kết luận tối ưu. | S05-06 → S06-01 | CLO1; hỗ trợ LLO4–5 | sửa: D07; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S06-01 | Nhân tử và độ nhạy | nhu cầu: Nêu nhu cầu dự đoán thay đổi giá trị tối ưu khi nới hoặc siết ràng buộc. | S05-07 → S06-02 | CLO1; hỗ trợ LLO4–5 | sửa: E01; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S06-02 | Nới ràng buộc trong ví dụ | trực quan và ví dụ: Vẽ miền khả thi và tính giá trị tối ưu khi thay đổi ràng buộc trong ví dụ. | S06-01 → S06-03 | CLO1; hỗ trợ LLO4–5 | sửa: E02; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S06-03 | Hàm giá trị và độ nhạy cục bộ | hình thức: Định nghĩa hàm giá trị, nêu giả thiết khả vi và diễn giải xấp xỉ cục bộ bằng nhân tử. | S06-02 → S06-04 | CLO1; hỗ trợ LLO4–5 | gộp: E03 + E04 (phiên bản khả vi); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S06-04 | Diễn giải nhân tử trong hồi quy | ứng dụng: Ước lượng thay đổi mất mát tối ưu khi nới giới hạn chuẩn trong hồi quy. | S06-03 → S06-05 | CLO1; hỗ trợ LLO4–5 | sửa: E05 (chuyển giao hồi quy); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S06-05 | Bài tập độ nhạy | bài tập: Giao bài tập ước lượng thay đổi giá trị tối ưu và kiểm tra giới hạn của xấp xỉ. | S06-04 → S07-01 | CLO1; hỗ trợ LLO4–5 | sửa: Z02 (phần độ nhạy); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S07-01 | Tổng hợp và vận dụng | tổng hợp: Tổng hợp cách tạo cận, kiểm tra Slater, dùng KKT và diễn giải nhân tử. | S06-05 → S07-02 | LLO4–5 / CLO1 | sửa: Z01; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S07-02 | Bài tập tổng hợp | đánh giá chuyển giao: Giao bài tập tích hợp mô hình hóa, cận đối ngẫu và chứng nhận tối ưu. | S07-01 → S07-03 | LLO4–5 / CLO1 | sửa: Z02; chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |
| S07-03 | Tài liệu và nội dung mở rộng | nguồn và chuyển tiếp: Ghi nguồn đọc, nội dung mở rộng và kiến thức dùng tiếp ở bài sau. | S07-02 → Bài 04 | LLO4–5 / CLO1 | gộp: Z03 + B04/C04/C07/D03/E04/E06 (mở rộng); chuyển thành tiêu đề/TODO theo yêu cầu, giữ chức năng học tập. |

## Sai khác có chủ ý

- So với Bài 02: kế thừa cách lồng section, h1 trang tiêu đề, h2 trang nội dung, kiểu chữ/màu/hộp/chân trang và runtime; thay chủ đề, chỉ giữ tiêu đề và TODO. Không sao chép ví dụ, nội dung hay tài sản riêng của Bài 02.
- So với Bài 03 cũ: thay 41 trang bằng 36 trang. Gộp tiên quyết với mục tiêu; gộp tính hàm đối ngẫu vào trang hàm đối ngẫu, tách bài tập khỏi định nghĩa bài toán; gom đường cận và tập giá trị; chuyển lý thuyết tổng quát sang TODO đọc mở rộng.
- Không giữ trang mở phần chỉ trang trí: TODO trang đầu mỗi mạch đều nêu một nhu cầu học tập. Không hiện mã nội bộ, thời lượng hay ghi chú cũ. TODO hiển thị là ngoại lệ do người dùng yêu cầu rõ.
- Tài sản SVG và ghi chú học tập cũ được giữ để tham khảo khi soạn; khung HTML không nhúng chúng.
