# Dàn ý Bài 03 — Đối ngẫu Lagrange

**Trạng thái:** bản nội dung 39 trang, 7 mạch; đã qua các vòng rà soát nội dung và kiểm định cục bộ; đã công bố trên chỉ mục.

## Phạm vi và tiêu chí hoàn thành

Buổi 3 theo đề cương DOCX chính thức: Chương 4, Đối ngẫu; 2 tiết lý thuyết và 1 tiết bài tập. Chuẩn đầu ra bài học (LLO) 4: “Hiểu được hàm đối ngẫu và bài toán đối ngẫu Lagrange”; LLO5: “Thể hiện được minh họa hình học của hàm đối ngẫu”; cùng liên quan chuẩn đầu ra học phần (CLO) 1. Đánh giá qua bài tập cá nhân và nhóm. Tiên quyết: gradient, hàm lồi và hoàn thành bình phương.

Tiêu chí: sinh viên có thể tự tạo cận, kiểm tra Slater, giải và kiểm tra bốn nhóm KKT, giải thích hình học và phân biệt độ nhạy cục bộ với sai phân hữu hạn. RevealJS, ghi chú diễn giả, tài liệu đọc và tám bài tập có lời giải phải nhất quán. Chỉ commit cục bộ, không push theo yêu cầu mới của người dùng.

Bài 02 là mẫu bố cục và phong cách do người dùng chỉ định, được đọc tại máy. Giữ cấu trúc ngoài–trong, bảng màu, kiểu chữ, hộp, lưới hai cột, chân trang và runtime cục bộ. Giữ thứ tự 7 mạch của khung đã duyệt; thêm S02-05b (phép tính g) và S05-05b (chứng minh tính đủ KKT) để tách lập luận, không thu nhỏ chữ. Ví dụ chính: $\min x^2+1$ với $(x-2)(x-4)\le0$, kết quả $x^*=2$, $p^*=5$, $\lambda^*=2$.

## Danh sách mạch và trang

### 1. Mở đầu

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S01-01 | Bài 03: Đối ngẫu Lagrange | Đặt vấn đề chứng nhận nghiệm, tạo động cơ cho cận dưới trước mọi ký hiệu. |
| S01-02 | Mục tiêu học tập | Định nghĩa minh chứng học được và nhắc đúng tiên quyết dùng trong phép tính. |
| S01-03 | Nội dung chính | Cho người học biết quan hệ giữa các công cụ và vị trí của ví dụ xuyên suốt. |

### 2. Hàm và bài toán đối ngẫu Lagrange

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S02-01 | Hàm và bài toán đối ngẫu Lagrange | Nêu bài toán cực tiểu có ràng buộc, giải thích điểm khả thi và nhu cầu chứng nhận tối ưu bằng cận dưới khít. |
| S02-02 | Ví dụ tối ưu có ràng buộc | Nêu rõ việc cần tìm x để x²+1 nhỏ nhất trên [2,4], rồi viết ràng buộc tương đương và xác định nghiệm tối ưu. |
| S02-03 | Họ hàm tạo cận dưới | Cho thấy lý do cộng một hạng không dương tạo cận, và vì sao cực tiểu L có thể không khả thi. |
| S02-04 | Hàm Lagrange | Chuyển phép cộng trong ví dụ thành dạng nhiều ràng buộc, giải thích dấu và kích thước nhân tử. |
| S02-05 | Hàm đối ngẫu | Ngăn nhầm inf với min và ngăn áp lại ràng buộc gốc khi tính g. |
| S02-05a | Lập hàm Lagrange | Thay hàm mục tiêu và ràng buộc, khai triển tích, gom hệ số theo x trước khi tính g. |
| S02-05b | Tính hàm đối ngẫu | Nhắc bài toán đang xét, thêm rồi bớt cùng một hạng để hoàn thành bình phương và suy ra g. |
| S02-06 | Đối ngẫu yếu | Chứng minh cận hợp lệ bằng hai bước độc lập, chỉ rõ không dùng tính lồi. |
| S02-07 | Bài toán đối ngẫu | Biến họ cận thành quyết định chọn cận tốt nhất, đồng thời phân biệt lõm với dễ tính. |
| S02-08 | Bài tập xây dựng cận dưới | Đo khả năng chuyển giao sang ràng buộc affine và phát hiện lỗi bỏ hằng số. |

### 3. Đối ngẫu mạnh và điều kiện Slater

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S03-01 | Đối ngẫu mạnh và điều kiện Slater | Ngăn đồng nhất khoảng của một cặp với khoảng đối ngẫu tối ưu trước khi nói cận khít. |
| S03-02 | Cận khít trong ví dụ | Đặt tên đối ngẫu mạnh sau một chứng nhận bằng bình phương có thể kiểm tra. |
| S03-03 | Điều kiện Slater | Cung cấp một giả thiết kiểm tra được thay cho việc phải giải hai bài toán mới biết cận khít. |
| S03-04 | Kiểm tra điều kiện Slater | Tách vai trò điểm Slater và nghiệm tối ưu, đồng thời thực hành kiểm tra tính lồi. |
| S03-05 | Giới hạn của điều kiện Slater | Phản ví dụ buộc tách ba mệnh đề Slater, đối ngẫu mạnh và sự đạt nghiệm đối ngẫu. |
| S03-06 | Bài tập đối ngẫu mạnh và Slater | Đo khả năng kiểm tra cùng một điểm nghiêm và tính hữu hạn trước khi dùng định lý. |

### 4. Hình học của đối ngẫu

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S04-01 | Hình học của đối ngẫu | Thiết lập ý nghĩa hai trục mới bằng bốn quyết định đã biết, tránh nhầm trục x với giá trị ràng buộc. |
| S04-02 | Đường cận trong mặt phẳng giá trị | Ánh xạ nhân tử sang hệ số góc và inf sang tung độ cắt; điểm chạm không khả thi cho giới hạn trực giác. |
| S04-03 | Tiếp xúc và đối ngẫu mạnh | Dùng đẳng thức bình phương xác nhận hình học cận khít, không suy luận chỉ bằng nhìn hình. |
| S04-04 | Bài tập đọc hình đối ngẫu | Đo khả năng đọc cận và giới hạn sai số từ đường thẳng, không nhầm khoảng tối ưu. |

### 5. Điều kiện Karush–Kuhn–Tucker (KKT)

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S05-01 | Điều kiện Karush–Kuhn–Tucker (KKT) | Dẫn hệ KKT từ nhu cầu tránh tính g và từ các điều kiện xảy ra đẳng thức trong chuỗi cận. |
| S05-02 | Ràng buộc hoạt động và bù trừ | Làm rõ logic bù trừ trước khi viết hệ tổng quát; phản ví dụ sửa chiều suy luận sai. |
| S05-03 | Bốn nhóm điều kiện KKT | Tổ chức các điều kiện thành bốn nhóm để sinh viên kiểm tra có hệ thống. |
| S05-04 | Giải ví dụ bằng KKT | Minh họa quy trình giải nhánh và loại ứng viên theo tính khả thi, không chỉ giải phương trình. |
| S05-05 | Điều kiện cần và điều kiện đủ | Tách giả thiết cho tính cần và tính đủ, tránh coi Slater là điều kiện bắt buộc của chứng nhận. |
| S05-05b | Chứng nhận tối ưu bằng KKT | Chứng minh điểm dùng tính lồi để bảo đảm toàn cục và nối KKT trở lại đối ngẫu yếu. |
| S05-06 | KKT trong hồi quy có ràng buộc | Áp dụng các kết quả vừa học cho mô hình AI có kích thước thực tế; giải thích vai trò giới hạn trọng số. |
| S05-07 | Bài tập kiểm tra nghiệm tối ưu | Đo khả năng tự giải đủ nhánh và bốn nhóm KKT trên hồi quy một trọng số; cung cấp đầu vào độ nhạy. |

### 6. Nhân tử và độ nhạy

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S06-01 | Nhân tử và độ nhạy | Tạo nhu cầu định lượng lợi ích nới ràng buộc trước khi giới thiệu hàm giá trị. |
| S06-02 | Nới ràng buộc trong ví dụ | Tính được hàm giá trị và nhìn sự khác biệt giữa đường chính xác với tiếp tuyến trên cùng ví dụ. |
| S06-03 | Hàm giá trị và độ nhạy cục bộ | Phân biệt cận toàn cục và đạo hàm có giả thiết khả vi; tránh dùng nhân tử cho sai phân hữu hạn chính xác. |
| S06-04 | Diễn giải nhân tử trong hồi quy | Chuyển cách diễn giải sang giới hạn chuẩn trong hồi quy; đối chiếu dự đoán với nghiệm đúng. |
| S06-05 | Bài tập độ nhạy | Đo khả năng kiểm tra sai số xấp xỉ khi đi xa điểm gốc, trong khi cận vẫn đúng. |

### 7. Tổng hợp và vận dụng

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S07-01 | Tổng hợp và vận dụng | Gom các quyết định thành quy trình, không biến Slater thành bước bắt buộc trước chiều KKT đủ. |
| S07-02 | Bài tập tổng hợp | Đánh giá tích hợp trong hai chiều và kiểm tra dấu khi tăng yêu cầu là siết ràng buộc. |
| S07-03 | Tài liệu và nội dung mở rộng | Chỉ đường tự học và nguồn kiểm chứng; tách kiến thức nâng cao khỏi tiên quyết của bài tập. |

## Nguồn đã kiểm kê và vai trò

| Tài nguyên | Vai trò | Phần sử dụng |
|---|---|---|
| DOCX đề cương UET.AI2012 chính thức trong sources/ | Đề cương | Buổi 3, phạm vi Chương 4, LLO4–5/CLO1, 2 tiết lý thuyết + 1 tiết bài tập |
| Bài 02 HTML và lecture-02-style.css | Mẫu cấu trúc và thị giác | Chia phần, tiêu đề, lưới, hộp, màu, runtime; chỉ đọc tại máy |
| sources/bv_cvxbook.pdf, Boyd–Vandenberghe (2004) | Nguồn nội dung | §5.1–5.3, §5.5–5.6; đọc và đối chiếu tại máy |
| sources/dual.pdf và bản trùng bài 5 MIT | Nguồn tham khảo trình tự khái niệm | Lagrange → đối ngẫu → hình học → tối ưu → độ nhạy; không sao chép hình |
| sources/Bài tập chương 4.pdf và bản lời giải | Nguồn ví dụ cũ | Ví dụ bậc hai được tự tính lại; không mặc định lời giải nguồn đúng |
| Ghi chú và hình của Bài 03 phiên bản trước | Tài liệu cũ cần đồng bộ | Viết lại ghi chú; không dùng hình cũ cho tuyến mới |

Không tải thêm MIT. Hình mới tự vẽ từ công thức kiểm tra được, không có ngoại lệ raster. Nguồn chính thức: [Boyd–Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/), [MIT 6.079 bài 5](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/resources/mit6_079f09_lec05/). Nội tương đối, nón pháp tuyến, điểm yên ngựa và đối ngẫu theo nón chuyển sang đọc mở rộng; không phải tiên quyết của bài tập chính.

Các tệp plan.md, source-map.md, math-spec.md giữ để truy nguyên phiên bản trước; bản hiện hành là outline.md, storyboard.md và review-log.md. Tài liệu công khai: materials/lec-03/lecture-note.md và exercises.md.
