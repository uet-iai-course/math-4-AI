# Storyboard Bài 03 — Bản nội dung 38 trang

## Chức năng và thời lượng dự kiến của bảy mạch

Phân bổ nội bộ theo tổng 3 tiết của đề cương; không giả định số phút cho một tiết. Các bài dài trong tài liệu dùng tự luyện, không cộng thêm thời lượng lên lịch chính.

| Mạch | Đầu vào | Đầu ra | Số tiết dự kiến |
|---|---|---|---|
| 1. Mở đầu | Một nghiệm khả thi chưa chứng nhận tối ưu | Mục tiêu tính cận, đọc hình, kiểm tra KKT | 0,10 |
| 2. Hàm và bài toán đối ngẫu Lagrange | Nhu cầu chặn sai số của một phương án | L, g và chứng nhận cận dưới | 0,75 |
| 3. Đối ngẫu mạnh và điều kiện Slater | Cận tốt nhất có khít hay không | Giả thiết Slater và giới hạn của định lý | 0,45 |
| 4. Hình học của đối ngẫu | Cận đại số cần diễn giải hình học | Nhân tử là âm hệ số góc, g là tung độ cắt | 0,35 |
| 5. Điều kiện Karush–Kuhn–Tucker (KKT) | Cần tìm nghiệm khi g khó tính | Bộ KKT đã kiểm tra và chứng nhận hồi quy | 0,75 |
| 6. Nhân tử và độ nhạy | Muốn dự đoán tác động của giới hạn trọng số | Phân biệt cận toàn cục và xấp xỉ đạo hàm | 0,35 |
| 7. Tổng hợp và vận dụng | Các công cụ đã có nhưng cần tự vận dụng | Chứng nhận một bài hai chiều và diễn giải siết ràng buộc | 0,25 |

## Bản đồ hành trình khái niệm

| Cụm | Nhu cầu → trực quan → ví dụ → hình thức → ứng dụng → bài tập | Đầu vào, đầu ra, ký hiệu và câu nối |
|---|---|---|
| Hàm và bài toán đối ngẫu (0,75 tiết) | Nhu cầu S02-01 → ví dụ dẫn nhập S02-02 → trực quan và ví dụ S02-03 → hình thức S02-04–06, S02-05b → S02-07 → S02-08 | Ví dụ dẫn nhập S02-02 đứng trước trực quan S02-03 để làm cụ thể nhu cầu cận dưới. Truyền nguyên f0,f1,x,λ từ ví dụ sang L,g. Đầu vào: bậc hai, gradient; đầu ra đo LLO4: tự dựng chứng nhận trên ràng buộc mới. Câu nối: một cận có thể lỏng, nên chọn cận lớn nhất. |
| Đối ngẫu mạnh và Slater (0,45 tiết) | S03-01 → S03-01 (khoảng 4,5 đến 5, tiếp nối hình S02-07) → S03-02 → S03-03 → S03-04–05 → S03-06 | Gộp nhu cầu và trực quan khoảng cận trên cùng trang; ví dụ L(x,2) cho cận khít trước định lý. Đầu vào L,g,p*,d*; đầu ra LLO4: biết kiểm tra cùng một điểm nghiêm và kết luận đúng. Truyền x*=2 nhưng phân biệt x̄=3. Câu nối: Slater cho điều kiện đủ, trường hợp biên kiểm tra giới hạn của chiều suy luận. |
| Hình học (0,35 tiết) | S04-01 → S04-01 → S04-01–02 → S04-02 → S04-03 → S04-04 | Gộp đổi tọa độ và ví dụ trên bốn điểm, rồi vẽ đường cận. Đầu vào g≤L; đầu ra LLO5: đọc hệ số góc và tung độ cắt. Truyền u=f1(x),t=f0(x). Câu nối: inf của t+λu xác định đường cao nhất vẫn nằm dưới G; kiểm tra điểm chạm để chứng nhận. |
| KKT (0,75 tiết) | S05-01 → S05-01 → S05-01–02 → S05-03 → S05-04–06, S05-05b → S05-07 | Gộp nhu cầu, gradient cân bằng 4 và −4 ở ví dụ đã biết; ví dụ hoạt động λ=0 trước hệ tổng quát. Đầu vào cận khít, gradient của hàm lồi; đầu ra LLO4/CLO1: giải nhánh và chứng nhận hồi quy. Truyền x,λ; đổi sang w có kích thước được nêu. Câu nối: tính lồi biến dừng thành cực tiểu; hệ KKT vì vậy đủ. |
| Độ nhạy (0,35 tiết) | S06-01 → S06-02 → S06-02 → S06-03 → S06-04 → S06-05 | S06-02 gộp hình và công thức ví dụ có nghiệm đầu trái; định lý tổng quát ở trang sau. Đầu vào nhân tử tối ưu; đầu ra CLO1: phân biệt cận và xấp xỉ. u trở thành mức nới f1≤u, khác vai trò tọa độ giá trị ở mạch hình học và được định nghĩa lại rõ. p(u) là giá trị, không phải x*(u). Câu nối: tiếp tuyến dự đoán thay đổi nhỏ; so với nghiệm đúng để đánh giá sai số. |

Mở đầu và tổng hợp không phải khái niệm toán mới: dùng chu trình rút gọn nhu cầu → bản đồ → đánh giá. Các nội dung đọc mở rộng chỉ được giới thiệu tên và nguồn; không dùng trong minh chứng học được. Không buộc sáu bước thành sáu trang riêng. Các trang bài tập gộp nhắc đề và yêu cầu vận dụng; lời giải ở ghi chú và tài liệu công khai.

## Quyết định theo từng trang

Mỗi trang sửa từ khung được triển khai nội dung mới; hai trang thêm có lý do tách riêng. Quan hệ trước–sau là theo thứ tự trình chiếu thực tế. LLO4/CLO1 dùng cho cận và điều kiện tối ưu; LLO5/CLO1 cho hình học; CLO1 cho vận dụng độ nhạy. Các slide cuối mỗi cụm là minh chứng đánh giá.

| Mã | Tiêu đề | Lý do tồn tại và khoảng trống giải quyết | Trước → sau | Chuẩn/đánh giá | Quyết định |
|---|---|---|---|---|---|
| S01-01 | Bài 03: Đối ngẫu Lagrange | Đặt vấn đề chứng nhận nghiệm, tạo động cơ cho cận dưới trước mọi ký hiệu. | Vấn đề chứng nhận → S01-02 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S01-02 | Mục tiêu học tập | Định nghĩa minh chứng học được và nhắc đúng tiên quyết dùng trong phép tính. | S01-01 → S01-03 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S01-03 | Nội dung chính | Cho người học biết quan hệ giữa các công cụ và vị trí của ví dụ xuyên suốt. | S01-02 → S02-01 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-01 | Hàm và bài toán đối ngẫu Lagrange | Phân biệt cận trên từ nghiệm khả thi với cận dưới chặn sai số; cụ thể hóa nhu cầu bằng 5 và 4,5. | S01-03 → S02-02 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-02 | Ví dụ tối ưu có ràng buộc | Cung cấp miền khả thi và giá trị đúng để mỗi cận sau đó có thể đối chiếu. | S02-01 → S02-03 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-03 | Họ hàm tạo cận dưới | Cho thấy lý do cộng một hạng không dương tạo cận, và vì sao cực tiểu L có thể không khả thi. | S02-02 → S02-04 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-04 | Hàm Lagrange | Chuyển phép cộng trong ví dụ thành dạng nhiều ràng buộc, giải thích dấu và kích thước nhân tử. | S02-03 → S02-05 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-05 | Hàm đối ngẫu | Ngăn nhầm inf với min và ngăn áp lại ràng buộc gốc khi tính g. | S02-04 → S02-05b | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-05b | Tính hàm đối ngẫu trong ví dụ | Tách phép hoàn thành bình phương để thấy rõ biến được tối ưu và vai trò hệ số dương. | S02-05 → S02-06 | LLO4/CLO1 | thêm/tách — giảm tải lập luận |
| S02-06 | Đối ngẫu yếu | Chứng minh cận hợp lệ bằng hai bước độc lập, chỉ rõ không dùng tính lồi. | S02-05b → S02-07 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-07 | Bài toán đối ngẫu | Biến họ cận thành quyết định chọn cận tốt nhất, đồng thời phân biệt lõm với dễ tính. | S02-06 → S02-08 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-08 | Bài tập xây dựng cận dưới | Đo khả năng chuyển giao sang ràng buộc affine và phát hiện lỗi bỏ hằng số. | S02-07 → S03-01 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-01 | Đối ngẫu mạnh và điều kiện Slater | Ngăn đồng nhất khoảng của một cặp với khoảng đối ngẫu tối ưu trước khi nói cận khít. | S02-08 → S03-02 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-02 | Cận khít trong ví dụ | Đặt tên đối ngẫu mạnh sau một chứng nhận bằng bình phương có thể kiểm tra. | S03-01 → S03-03 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-03 | Điều kiện Slater | Cung cấp một giả thiết kiểm tra được thay cho việc phải giải hai bài toán mới biết cận khít. | S03-02 → S03-04 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-04 | Kiểm tra điều kiện Slater | Tách vai trò điểm Slater và nghiệm tối ưu, đồng thời thực hành kiểm tra tính lồi. | S03-03 → S03-05 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-05 | Giới hạn của điều kiện Slater | Phản ví dụ buộc tách ba mệnh đề Slater, đối ngẫu mạnh và sự đạt nghiệm đối ngẫu. | S03-04 → S03-06 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-06 | Bài tập đối ngẫu mạnh và Slater | Đo khả năng kiểm tra cùng một điểm nghiêm và tính hữu hạn trước khi dùng định lý. | S03-05 → S04-01 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S04-01 | Hình học của đối ngẫu | Thiết lập ý nghĩa hai trục mới bằng bốn quyết định đã biết, tránh nhầm trục x với giá trị ràng buộc. | S03-06 → S04-02 | LLO5/CLO1 | sửa — triển khai khung đã duyệt |
| S04-02 | Đường cận trong mặt phẳng giá trị | Ánh xạ nhân tử sang hệ số góc và inf sang tung độ cắt; điểm chạm không khả thi cho giới hạn trực giác. | S04-01 → S04-03 | LLO5/CLO1 | sửa — triển khai khung đã duyệt |
| S04-03 | Tiếp xúc và đối ngẫu mạnh | Dùng đẳng thức bình phương xác nhận hình học cận khít, không suy luận chỉ bằng nhìn hình. | S04-02 → S04-04 | LLO5/CLO1 | sửa — triển khai khung đã duyệt |
| S04-04 | Bài tập đọc hình đối ngẫu | Đo khả năng đọc cận và giới hạn sai số từ đường thẳng, không nhầm khoảng tối ưu. | S04-03 → S05-01 | LLO5/CLO1 | sửa — triển khai khung đã duyệt |
| S05-01 | Điều kiện Karush–Kuhn–Tucker (KKT) | Dẫn hệ KKT từ nhu cầu tránh tính g và từ các điều kiện xảy ra đẳng thức trong chuỗi cận. | S04-04 → S05-02 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-02 | Ràng buộc hoạt động và bù trừ | Làm rõ logic bù trừ trước khi viết hệ tổng quát; phản ví dụ sửa chiều suy luận sai. | S05-01 → S05-03 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-03 | Bốn nhóm điều kiện KKT | Tổ chức các điều kiện thành bốn nhóm để sinh viên kiểm tra có hệ thống. | S05-02 → S05-04 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-04 | Giải ví dụ bằng KKT | Minh họa quy trình giải nhánh và loại ứng viên theo tính khả thi, không chỉ giải phương trình. | S05-03 → S05-05 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-05 | Điều kiện cần và điều kiện đủ | Tách giả thiết cho tính cần và tính đủ, tránh coi Slater là điều kiện bắt buộc của chứng nhận. | S05-04 → S05-05b | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-05b | Chứng nhận tối ưu bằng KKT | Chứng minh điểm dùng tính lồi để bảo đảm toàn cục và nối KKT trở lại đối ngẫu yếu. | S05-05 → S05-06 | LLO4/CLO1 | thêm/tách — giảm tải lập luận |
| S05-06 | KKT trong hồi quy có ràng buộc | Áp dụng các kết quả vừa học cho mô hình AI có kích thước thực tế; giải thích vai trò giới hạn trọng số. | S05-05b → S05-07 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-07 | Bài tập kiểm tra nghiệm tối ưu | Đo khả năng tự giải đủ nhánh và bốn nhóm KKT trên hồi quy một trọng số; cung cấp đầu vào độ nhạy. | S05-06 → S06-01 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S06-01 | Nhân tử và độ nhạy | Tạo nhu cầu định lượng lợi ích nới ràng buộc trước khi giới thiệu hàm giá trị. | S05-07 → S06-02 | CLO1 | sửa — triển khai khung đã duyệt |
| S06-02 | Nới ràng buộc trong ví dụ | Tính được hàm giá trị và nhìn sự khác biệt giữa đường chính xác với tiếp tuyến trên cùng ví dụ. | S06-01 → S06-03 | CLO1 | sửa — triển khai khung đã duyệt |
| S06-03 | Hàm giá trị và độ nhạy cục bộ | Phân biệt cận toàn cục và đạo hàm có giả thiết khả vi; tránh dùng nhân tử cho sai phân hữu hạn chính xác. | S06-02 → S06-04 | CLO1 | sửa — triển khai khung đã duyệt |
| S06-04 | Diễn giải nhân tử trong hồi quy | Chuyển cách diễn giải sang giới hạn chuẩn trong hồi quy; đối chiếu dự đoán với nghiệm đúng. | S06-03 → S06-05 | CLO1 | sửa — triển khai khung đã duyệt |
| S06-05 | Bài tập độ nhạy | Đo khả năng kiểm tra sai số xấp xỉ khi đi xa điểm gốc, trong khi cận vẫn đúng. | S06-04 → S07-01 | CLO1 | sửa — triển khai khung đã duyệt |
| S07-01 | Tổng hợp và vận dụng | Gom các quyết định thành quy trình, không biến Slater thành bước bắt buộc trước chiều KKT đủ. | S06-05 → S07-02 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S07-02 | Bài tập tổng hợp | Đánh giá tích hợp trong hai chiều và kiểm tra dấu khi tăng yêu cầu là siết ràng buộc. | S07-01 → S07-03 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S07-03 | Tài liệu và nội dung mở rộng | Chỉ đường tự học và nguồn kiểm chứng; tách kiến thức nâng cao khỏi tiên quyết của bài tập. | S07-02 → Tự luyện có lời giải | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
