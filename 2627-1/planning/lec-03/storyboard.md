# Storyboard Bài 03 — Bản nội dung 46 trang

## Chức năng và thời lượng dự kiến của sáu mạch

Phân bổ nội bộ theo tổng 3 tiết của đề cương; không giả định số phút cho một tiết. Các bài dài trong tài liệu dùng tự luyện, không cộng thêm thời lượng lên lịch chính.

| Mạch | Đầu vào | Đầu ra | Số tiết dự kiến |
|---|---|---|---|
| 1. Mở đầu | Một nghiệm khả thi chưa chứng nhận tối ưu | Mục tiêu tính cận, đọc hình, kiểm tra KKT | 0,10 |
| 2. Hàm và bài toán đối ngẫu Lagrange | Nhu cầu chặn sai số của một phương án | L, g và chứng nhận cận dưới | 0,85 |
| 3. Đối ngẫu mạnh và điều kiện Slater | Cận tốt nhất có khít hay không | Giả thiết Slater và giới hạn của định lý | 0,45 |
| 4. Hình học của đối ngẫu | Cận đại số cần diễn giải hình học | Nhân tử là âm hệ số góc, g là tung độ cắt | 0,35 |
| 5. Điều kiện Karush–Kuhn–Tucker (KKT) | Cần tìm nghiệm khi g khó tính | Bộ KKT đã kiểm tra và chứng nhận hồi quy | 1,00 |
| 6. Tổng hợp và vận dụng | Các công cụ đã có nhưng cần tự vận dụng | Chứng nhận một bài hai chiều bằng đối ngẫu và KKT | 0,25 |

## Bản đồ hành trình khái niệm

| Cụm | Nhu cầu → trực quan → ví dụ → hình thức → ứng dụng → bài tập | Đầu vào, đầu ra, ký hiệu và câu nối |
|---|---|---|
| Hàm và bài toán đối ngẫu (0,85 tiết) | Nhu cầu S02-01 → ví dụ dẫn nhập S02-02 → trực quan và ví dụ S02-03 → hình thức S02-04–06, S02-05c, S02-05a–b → S02-07, S02-07a–b → S02-08 | Ví dụ dẫn nhập S02-02 đứng trước trực quan S02-03 để làm cụ thể nhu cầu cận dưới. Truyền nguyên f0,f1,x,λ từ ví dụ sang L,g. Đầu vào: bậc hai, gradient; đầu ra đo LLO4: tự dựng chứng nhận trên ràng buộc mới. Câu nối: một cận có thể lỏng, nên chọn cận lớn nhất. |
| Đối ngẫu mạnh và Slater (0,45 tiết) | S03-01 → S03-01 (khoảng 4,5 đến 5, tiếp nối hình S02-07) → S03-02 → S03-02b (trực quan giả thiết) → S03-03–03c → S03-04–05 → S03-06 | Gộp nhu cầu và trực quan khoảng cận trên cùng trang; ví dụ L(x,2) cho cận khít trước định lý. Đầu vào L,g,p*,d*; đầu ra LLO4: biết kiểm tra cùng một điểm nghiêm và kết luận đúng. Truyền x*=2 nhưng phân biệt x̄=3; S03-02b truyền khoảng dư f1(3)=-1 và lân cận quanh 3 sang bất đẳng thức nghiêm ở S03-03. Gộp trực quan và ví dụ trên S03-02b; ứng dụng và bài tập giữ S03-04 và S03-06. Phân bổ lại trong 0,45 tiết hiện có, không tăng thời lượng bài. Câu nối: Slater cho điều kiện đủ, trường hợp biên kiểm tra giới hạn của chiều suy luận. |
| Hình học (0,35 tiết) | S04-01 → S04-01a → S04-01a → S04-01b → S04-02–03 → S04-04 | Tách nhu cầu, ánh xạ tọa độ và suy diễn đường cận; gộp trực quan với ví dụ bốn điểm ở S04-01a. Giữ tổng 0,35 tiết, phân bổ lại phần giải thích. Truyền f0,f1,x sang u,t rồi L=t+λu; câu nối từ G sang đường: mọi giá trị L ít nhất bằng g. Đầu vào g≤L; đầu ra LLO5: đọc hệ số góc và tung độ cắt. Truyền u=f1(x),t=f0(x). Câu nối: inf của t+λu xác định đường cao nhất vẫn nằm dưới G; kiểm tra điểm chạm để chứng nhận. |
| KKT (1,00 tiết) | S05-01 → S05-01 → S05-01–02 → S05-03 → S05-04–06, S05-05a–b, S05-06a–b → S05-07 | Gộp nhu cầu, gradient cân bằng 4 và −4 ở ví dụ đã biết; ví dụ hoạt động λ=0 trước hệ tổng quát. Đầu vào cận khít, gradient của hàm lồi; đầu ra LLO4/CLO1: giải nhánh và chứng nhận hồi quy. Truyền x,λ; đổi sang w có kích thước được nêu. Thêm phản ví dụ tính cần trước chứng minh tính đủ; hồi quy được giải tổng quát rồi tính đủ hai trọng số trước bài tự luyện. Ví dụ hai chiều có X=I2,y=(3,4),τ=1 truyền nguyên dữ liệu vào bốn nhóm KKT. Câu nối: tính lồi biến dừng thành cực tiểu; hệ KKT vì vậy đủ. |

Mở đầu và tổng hợp không phải khái niệm toán mới: dùng chu trình rút gọn nhu cầu → bản đồ → đánh giá. Các nội dung đọc mở rộng chỉ được giới thiệu tên và nguồn; không dùng trong minh chứng học được. Không buộc sáu bước thành sáu trang riêng. Các trang bài tập gộp nhắc đề và yêu cầu vận dụng; lời giải ở ghi chú và tài liệu công khai.

## Quyết định theo từng trang

Mỗi trang sửa từ khung được triển khai nội dung mới; các trang thêm có lý do riêng được ghi trong bảng. Quan hệ trước–sau là theo thứ tự trình chiếu thực tế. LLO4/CLO1 dùng cho cận và điều kiện tối ưu; LLO5/CLO1 cho hình học; CLO1 cho vận dụng vào hồi quy. Các slide cuối mỗi cụm là minh chứng đánh giá.

| Mã | Tiêu đề | Lý do tồn tại và khoảng trống giải quyết | Trước → sau | Chuẩn/đánh giá | Quyết định |
|---|---|---|---|---|---|
| S01-01 | Bài 03: Đối ngẫu Lagrange | Đặt vấn đề chứng nhận nghiệm, tạo động cơ cho cận dưới trước mọi ký hiệu. | Vấn đề chứng nhận → S01-02 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S01-02 | Mục tiêu học tập | Định nghĩa minh chứng học được và nhắc đúng tiên quyết dùng trong phép tính. | S01-01 → S01-03 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S01-03 | Nội dung chính | Cho người học biết quan hệ giữa các công cụ và vị trí của ví dụ xuyên suốt. | S01-02 → S02-01 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-01 | Hàm và bài toán đối ngẫu Lagrange | Nêu bài toán cực tiểu có ràng buộc, giải thích điểm khả thi và nhu cầu chứng nhận tối ưu bằng cận dưới khít. | S01-03 → S02-02 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-02 | Ví dụ tối ưu có ràng buộc | Nêu rõ việc cần tìm x để x²+1 nhỏ nhất trên [2,4], rồi viết ràng buộc tương đương và xác định nghiệm tối ưu. | S02-01 → S02-03 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-03 | Họ hàm tạo cận dưới | Cho thấy lý do cộng một hạng không dương tạo cận, và vì sao cực tiểu L có thể không khả thi. | S02-02 → S02-04 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-04 | Hàm Lagrange | Chuyển phép cộng trong ví dụ thành dạng nhiều ràng buộc, giải thích dấu và kích thước nhân tử. | S02-03 → S02-05 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-05 | Hàm đối ngẫu | Ngăn nhầm inf với min và ngăn áp lại ràng buộc gốc khi tính g. | S02-04 → S02-05c | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-05c | Tính lõm của hàm đối ngẫu | Giải thích tính chất chung của g ngay sau định nghĩa, chứng minh hai bước và phân biệt với tính lồi của bài toán gốc. | S02-05 → S02-05a | LLO4/CLO1 | thêm — mệnh đề và chứng minh ngắn theo yêu cầu người dùng |
| S02-05a | Lập hàm Lagrange | Nhắc bài toán trên [2,4], thay f0 và f1, khai triển tích rồi gom hệ số để tránh nhảy bước. | S02-05c → S02-05b | LLO4/CLO1 | thêm/tách — theo phản hồi cần suy diễn L chi tiết |
| S02-05b | Tính hàm đối ngẫu | Nhắc bài toán đang xét, thêm rồi bớt cùng một hạng để hoàn thành bình phương và suy ra g. | S02-05a → S02-06 | LLO4/CLO1 | thêm/tách — giảm tải lập luận |
| S02-06 | Đối ngẫu yếu | Chứng minh cận hợp lệ bằng hai bước độc lập, chỉ rõ không dùng tính lồi. | S02-05b → S02-07 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-07 | Bài toán đối ngẫu | Biến họ cận thành quyết định chọn cận tốt nhất, đồng thời phân biệt lõm với dễ tính. | S02-06 → S02-07a | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S02-07a | Ví dụ đối ngẫu hai chiều | Chuyển từ một biến sang hai biến, gán nhân tử riêng cho hai ràng buộc và tính inf theo từng biến. | S02-07 → S02-07b | LLO4/CLO1 | thêm — ví dụ và lời giải theo yêu cầu người dùng |
| S02-07b | Giải đối ngẫu hai chiều | Giải đối ngẫu hai nhân tử bằng hoàn thành bình phương và kiểm tra điểm khả thi đạt cận. | S02-07a → S02-08 | LLO4/CLO1 | thêm — ví dụ và lời giải theo yêu cầu người dùng |
| S02-08 | Bài tập xây dựng cận dưới | Đo khả năng chuyển giao sang ràng buộc affine và phát hiện lỗi bỏ hằng số. | S02-07b → S03-01 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-01 | Đối ngẫu mạnh và điều kiện Slater | Ngăn đồng nhất khoảng của một cặp với khoảng đối ngẫu tối ưu trước khi nói cận khít. | S02-08 → S03-02 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-02 | Cận khít trong ví dụ | Đặt tên đối ngẫu mạnh sau một chứng nhận bằng bình phương có thể kiểm tra. | S03-01 → S03-02b | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-02b | Ý nghĩa và trực quan của Slater | Sau cận khít, giải thích khoảng dư quanh điểm 3 bằng đoạn [2,5; 3,5]; phân biệt điều kiện trên miền với yêu cầu về nghiệm tối ưu. | S03-02 → S03-03 | LLO4/CLO1 | thêm — trực quan hóa giả thiết trước định lý theo yêu cầu người dùng |
| S03-03 | Điều kiện Slater | Cung cấp một giả thiết kiểm tra được thay cho việc phải giải hai bài toán mới biết cận khít. | S03-02b → S03-03a | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-03a | Chứng minh định lý Slater | Giải thích vì sao khả thi nghiêm bảo đảm cận khít và đạt đối ngẫu. | S03-03 → S03-03b | LLO4/CLO1 | thêm — chứng minh theo yêu cầu; ba bước chính trên trang, định nghĩa hai tập và phép tách trong ghi chú |
| S03-03b | Vai trò của khả thi nghiêm | Khai triển tổng không âm nhưng từng số hạng không dương; dấu nghiêm buộc mọi hệ số bằng không. | S03-03a → S03-03c | LLO4/CLO1 | thêm — người dùng chưa thấy vai trò dấu nghiêm; tách phần trước chỉ có trong ghi chú lên mặt trang |
| S03-03c | Hệ số của ràng buộc đẳng thức | Dùng một điểm cụ thể để suy ra bình phương chuẩn bằng không, rồi dùng các hàng độc lập để kết luận hệ số bằng không. | S03-03b → S03-04 | LLO4/CLO1 | thêm — khai triển bước người dùng hỏi; chỉ rõ mọi x và điểm dùng độc lập tuyến tính |
| S03-04 | Kiểm tra điều kiện Slater | Tách vai trò điểm Slater và nghiệm tối ưu, đồng thời thực hành kiểm tra tính lồi. | S03-03c → S03-05 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-05 | Giới hạn của điều kiện Slater | Phản ví dụ buộc tách ba mệnh đề Slater, đối ngẫu mạnh và sự đạt nghiệm đối ngẫu. | S03-04 → S03-06 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S03-06 | Bài tập đối ngẫu mạnh và Slater | Đo khả năng kiểm tra cùng một điểm nghiêm và tính hữu hạn trước khi dùng định lý. | S03-05 → S04-01 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S04-01 | Hình học của đối ngẫu | Nêu mục đích nhìn quyết định khả thi và cận trong cùng hình, nhắc bài toán và giải thích hai trục trước ký hiệu G. | S03-06 → S04-01a | LLO5/CLO1 | sửa — triển khai khung đã duyệt |
| S04-01a | Điểm và tập giá trị | Tính từng cặp giá trị từ cùng ví dụ, vẽ G trước đường cận, chỉ đúng phần G khả thi. | S04-01 → S04-01b | LLO5/CLO1 | thêm/tách — làm rõ phép đổi tọa độ |
| S04-01b | Hàm Lagrange trong mặt phẳng giá trị | Giải thích L=t+λu, suy diễn đường cận và chiều bất đẳng thức trước ví dụ tiếp xúc. | S04-01a → S04-02 | LLO5/CLO1 | thêm/tách — lấp bước suy luận còn thiếu |
| S04-02 | Đường cận trong mặt phẳng giá trị | Ánh xạ nhân tử sang hệ số góc và inf sang tung độ cắt; điểm chạm không khả thi cho giới hạn trực giác. | S04-01b → S04-03 | LLO5/CLO1 | sửa — triển khai khung đã duyệt |
| S04-03 | Tiếp xúc và đối ngẫu mạnh | Dùng đẳng thức bình phương xác nhận hình học cận khít, không suy luận chỉ bằng nhìn hình. | S04-02 → S04-04 | LLO5/CLO1 | sửa — triển khai khung đã duyệt |
| S04-04 | Bài tập đọc hình đối ngẫu | Đo khả năng đọc cận và giới hạn sai số từ đường thẳng, không nhầm khoảng tối ưu. | S04-03 → S05-01 | LLO5/CLO1 | sửa — triển khai khung đã duyệt |
| S05-01 | Điều kiện Karush–Kuhn–Tucker (KKT) | Dẫn hệ KKT từ nhu cầu tránh tính g và từ các điều kiện xảy ra đẳng thức trong chuỗi cận. | S04-04 → S05-02 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-02 | Ràng buộc hoạt động và bù trừ | Làm rõ logic bù trừ trước khi viết hệ tổng quát; phản ví dụ sửa chiều suy luận sai. | S05-01 → S05-03 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-03 | Bốn nhóm điều kiện KKT | Tổ chức các điều kiện thành bốn nhóm để sinh viên kiểm tra có hệ thống. | S05-02 → S05-04 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-04 | Giải ví dụ bằng KKT | Minh họa quy trình giải nhánh và loại ứng viên theo tính khả thi, không chỉ giải phương trình. | S05-03 → S05-05 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-05 | Điều kiện cần và điều kiện đủ | Tách giả thiết cho tính cần và tính đủ, tránh coi Slater là điều kiện bắt buộc của chứng nhận. | S05-04 → S05-05a | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-05a | Nghiệm tối ưu không thỏa KKT | Dùng miền chỉ có một điểm để thấy nghiệm tối ưu có thể không có nhân tử KKT khi thiếu giả thiết chính quy. | S05-05 → S05-05b | LLO4/CLO1 | thêm — ví dụ và lời giải theo yêu cầu người dùng |
| S05-05b | Chứng nhận tối ưu bằng KKT | Chứng minh điểm dùng tính lồi để bảo đảm toàn cục và nối KKT trở lại đối ngẫu yếu. | S05-05a → S05-06 | LLO4/CLO1 | thêm/tách — giảm tải lập luận |
| S05-06 | KKT trong hồi quy có ràng buộc | Áp dụng các kết quả vừa học cho mô hình AI có kích thước thực tế; giải thích vai trò giới hạn trọng số. | S05-05b → S05-06a | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S05-06a | Giải hệ KKT của hồi quy | Giải hệ dừng, xét nghiệm bình phương tối thiểu và nhánh nhân tử dương mà không giả định X đủ hạng. | S05-06 → S05-06b | LLO4/CLO1 | thêm — ví dụ và lời giải theo yêu cầu người dùng |
| S05-06b | Ví dụ hồi quy hai trọng số | Tính hai trọng số, nhân tử và mất mát đến kết quả số; kiểm tra đầy đủ bốn nhóm KKT. | S05-06a → S05-07 | LLO4/CLO1 | thêm — ví dụ và lời giải theo yêu cầu người dùng |
| S05-07 | Bài tập kiểm tra nghiệm tối ưu | Đo khả năng tự giải đủ nhánh và bốn nhóm KKT trên hồi quy một trọng số. | S05-06b → S07-01 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S07-01 | Tổng hợp và vận dụng | Gom các quyết định thành quy trình, không biến Slater thành bước bắt buộc trước chiều KKT đủ. | S05-07 → S07-02 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S07-02 | Bài tập tổng hợp | Đánh giá tích hợp trong hai chiều. | S07-01 → S07-03 | LLO4/CLO1 | sửa — triển khai khung đã duyệt |
| S07-03 | Tài liệu và nội dung mở rộng | Chỉ đường tự học và nguồn kiểm chứng; tách kiến thức nâng cao khỏi tiên quyết của bài tập. | S07-02 → Tự luyện có lời giải | LLO4/CLO1 | sửa — triển khai khung đã duyệt |

Bỏ năm trang S06-01–05 theo yêu cầu người dùng. Chuyển 0,35 tiết nội bộ sang ví dụ đối ngẫu nhiều chiều (0,10) và KKT (0,25); tổng vẫn 3 tiết. Sáu mạch còn lại giữ thứ tự và ID ổn định, mạch tổng hợp mang mã S07 để bảo toàn liên kết.

S02-05c dùng chu trình rút gọn: nhu cầu biết cấu trúc g sau định nghĩa S02-05 → chứng minh tính lõm → kiểm tra trên g của ví dụ và bài toán đối ngẫu S02-07. Đây là tính chất phụ của khái niệm g đã được dẫn nhập bằng ví dụ, không cần lặp một chu trình sáu bước riêng. Giữ thời lượng mạch 2 là 0,85 tiết, phân bổ lại phần diễn giải.

Chứng minh Slater dùng chu trình rút gọn: nhu cầu giải thích kết luận ở S03-03 → hình thức ba bước ở S03-03a → kiểm tra giả thiết ở S03-04 và vận dụng ở S03-06. Không thêm một ví dụ riêng vì ví dụ xuyên suốt đã cho điểm nghiêm và cận khít. Bổ đề tách được phát biểu trong ghi chú bài giảng, không giả định sinh viên tự chứng minh bổ đề; giữ phân bổ nội bộ của mạch 3.

S03-03b khai triển bước quyết định của S03-03a theo nhu cầu làm rõ dấu nghiêm → lập luận từng số hạng → trường hợp biên chỉ khả thi. Không lặp chứng minh tách hay chuẩn hóa. Ví dụ số ở ghi chú giúp kiểm tra dấu; S03-04 tiếp tục vận dụng điểm nghiêm trong bài chính. Giữ phân bổ nội bộ mạch 3, không đổi tổng thời lượng.

S03-03c nối kết quả a=0 với mâu thuẫn cuối: nhu cầu loại hệ số đẳng thức → phép chọn x cụ thể → bình phương chuẩn → độc lập tuyến tính. Chỉ khai triển chứng minh đã có, không mở khái niệm mới; trường hợp hàng phụ thuộc trong ghi chú kiểm tra vai trò giả thiết. Sau đó trở lại S03-04 để vận dụng. Giữ thời lượng nội bộ mạch 3.
