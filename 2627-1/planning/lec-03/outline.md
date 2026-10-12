# Dàn ý Bài 03 — Đối ngẫu Lagrange

**Trạng thái:** bản nội dung 57 trang, 6 mạch (47 trang trước đợt sửa văn phong 2026-10-12; thêm 5 trang tiêu đề mạch, 1 trang chứng minh tách và 4 trang lời giải mẫu); đã công bố trên chỉ mục.

## Phạm vi và tiêu chí hoàn thành

Buổi 3 theo đề cương DOCX chính thức: Chương 4, Đối ngẫu; 2 tiết lý thuyết và 1 tiết bài tập. Chuẩn đầu ra bài học (LLO) 4: “Hiểu được hàm đối ngẫu và bài toán đối ngẫu Lagrange”; LLO5: “Thể hiện được minh họa hình học của hàm đối ngẫu”; cùng liên quan chuẩn đầu ra học phần (CLO) 1. Đánh giá qua bài tập cá nhân và nhóm. Tiên quyết: gradient, hàm lồi và hoàn thành bình phương.

Tiêu chí: sinh viên có thể tự tạo cận, kiểm tra Slater, giải và kiểm tra bốn nhóm KKT, giải thích hình học, vận dụng cho nhiều biến và phân biệt tính cần với tính đủ của KKT. RevealJS, ghi chú diễn giả, tài liệu đọc và bảy bài tập có lời giải phải nhất quán.

Bài 02 là mẫu bố cục và phong cách do người dùng chỉ định, được đọc tại máy. Giữ cấu trúc ngoài–trong, bảng màu, kiểu chữ, hộp, lưới hai cột, chân trang và runtime cục bộ. Giữ thứ tự sáu mạch còn lại sau khi bỏ độ nhạy theo yêu cầu người dùng; thêm S02-05b (phép tính g) và S05-05b (chứng minh tính đủ KKT) để tách lập luận, không thu nhỏ chữ. Ví dụ chính: $\min x^2+1$ với $(x-2)(x-4)\le0$, kết quả $x^*=2$, $p^*=5$, $\lambda^*=2$.

## Danh sách mạch và trang

### 1. Mở đầu

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S01-01 | Bài 03: Đối ngẫu Lagrange | Đặt vấn đề chứng nhận nghiệm, tạo động cơ cho cận dưới trước mọi ký hiệu. |
| S01-02 | Mục tiêu học tập | Định nghĩa minh chứng học được và nhắc đúng tiên quyết dùng trong phép tính. |
| S01-03 | Nội dung | Cho người học biết quan hệ giữa các công cụ và vị trí của ví dụ xuyên suốt. |

### 2. Hàm và bài toán đối ngẫu Lagrange

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S02-00 | 2. Hàm và bài toán đối ngẫu Lagrange | Trang tiêu đề mạch: nhu cầu cận dưới của p*. |
| S02-01 | Cận dưới cho giá trị tối ưu | Nêu bài toán cực tiểu có ràng buộc, giải thích điểm khả thi và nhu cầu chứng nhận tối ưu bằng cận dưới khít. |
| S02-02 | Ví dụ: bài toán một biến trên đoạn [2,4] | Nêu rõ việc cần tìm x để x²+1 nhỏ nhất trên [2,4], rồi viết ràng buộc tương đương và xác định nghiệm tối ưu. |
| S02-03 | Họ hàm tạo cận dưới | Cho thấy lý do cộng một hạng không dương tạo cận, và vì sao cực tiểu L có thể không khả thi. |
| S02-04 | Hàm Lagrange | Chuyển phép cộng trong ví dụ thành dạng nhiều ràng buộc, giải thích dấu và kích thước nhân tử. |
| S02-05 | Hàm đối ngẫu | Ngăn nhầm inf với min và ngăn áp lại ràng buộc gốc khi tính g. |
| S02-05c | Tính lõm của hàm đối ngẫu | Phát biểu tính lõm của g, ý nghĩa và ý chứng minh; không cần bài toán gốc lồi. |
| S02-05d | Chứng minh: tính lõm của hàm đối ngẫu | Hai bước: tính affine theo nhân tử, rồi lấy infimum theo x. |
| S02-05a | Ví dụ: bài toán một biến, lập hàm Lagrange | Thay hàm mục tiêu và ràng buộc, khai triển tích, gom hệ số theo x trước khi tính g. |
| S02-05b | Ví dụ: bài toán một biến, tính hàm đối ngẫu | Nhắc bài toán đang xét, thêm rồi bớt cùng một hạng để hoàn thành bình phương và suy ra g. |
| S02-06 | Đối ngẫu yếu | Chứng minh cận hợp lệ bằng hai bước độc lập, chỉ rõ không dùng tính lồi. |
| S02-07 | Bài toán đối ngẫu | Biến họ cận thành quyết định chọn cận tốt nhất, đồng thời phân biệt lõm với dễ tính. |
| S02-07a | Ví dụ: bài toán hai biến, tính hàm đối ngẫu | Chuyển từ một biến sang hai biến, gán nhân tử riêng cho hai ràng buộc và tính inf theo từng biến. |
| S02-07b | Ví dụ: bài toán hai biến, giải bài toán đối ngẫu | Giải đối ngẫu hai nhân tử bằng hoàn thành bình phương và kiểm tra điểm khả thi đạt cận. |
| S02-08 | Bài tập: cận dưới cho ràng buộc affine | Đo khả năng chuyển giao sang ràng buộc affine và phát hiện lỗi bỏ hằng số. |
| S02-08b | Bài tập: cận dưới cho ràng buộc affine | Lời giải mẫu trên mặt trang, trùng bài 2 của tài liệu bài tập. |

### 3. Đối ngẫu mạnh và điều kiện Slater

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S03-00 | 3. Đối ngẫu mạnh và điều kiện Slater | Trang tiêu đề mạch: nhu cầu điều kiện bảo đảm d*=p*. |
| S03-01 | Khoảng đối ngẫu | Ngăn đồng nhất khoảng đối ngẫu của cặp với khoảng đối ngẫu tối ưu trước khi nói cận khít. |
| S03-02 | Cận khít và đối ngẫu mạnh | Đặt tên đối ngẫu mạnh sau một chứng nhận bằng bình phương có thể kiểm tra. |
| S03-03 | Điều kiện Slater | Cung cấp một giả thiết kiểm tra được thay cho việc phải giải hai bài toán mới biết cận khít. |
| S03-02b | Trực quan của điều kiện Slater | Minh họa độ dư quanh cùng một điểm Slater, phân biệt điểm Slater và nghiệm tối ưu sau khi đã phát biểu định lý. |
| S03-03a | Chứng minh: định lý Slater | Giải thích vì sao điểm Slater bảo đảm cận khít và đạt đối ngẫu. |
| S03-03b | Chứng minh: định lý Slater, hệ số bất đẳng thức | Khai triển tổng không âm nhưng từng số hạng không dương; dấu chặt buộc mọi hệ số bằng không. |
| S03-03c | Chứng minh: định lý Slater, hệ số đẳng thức | Dùng một điểm cụ thể để suy ra bình phương chuẩn bằng không, rồi dùng các hàng độc lập để kết luận hệ số bằng không. |
| S03-04 | Ví dụ: điều kiện Slater cho bài toán một biến | Tách vai trò điểm Slater và nghiệm tối ưu, đồng thời thực hành kiểm tra tính lồi. |
| S03-05 | Giới hạn của điều kiện Slater | Phản ví dụ buộc tách ba mệnh đề Slater, đối ngẫu mạnh và sự đạt nghiệm đối ngẫu. |
| S03-06 | Bài tập: điều kiện Slater cho bài toán hai biến | Đo khả năng kiểm tra cùng một điểm Slater và tính hữu hạn trước khi dùng định lý. |
| S03-06b | Bài tập: điều kiện Slater cho bài toán hai biến | Lời giải mẫu trên mặt trang, trùng bài 7 câu 1 của tài liệu bài tập. |

### 4. Hình học của đối ngẫu

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S04-00 | 4. Hình học của đối ngẫu | Trang tiêu đề mạch: đọc nhân tử và cận trên cùng hình. |
| S04-01 | Mặt phẳng giá trị | Nêu đối tượng mới, mặt phẳng giá trị (u,t), nhắc bài toán và giải thích hai trục trước ký hiệu G. |
| S04-01a | Điểm và tập giá trị | Tính tọa độ từ x, vẽ G và phân biệt phần G khả thi với nửa mặt phẳng. |
| S04-01b | Hàm Lagrange trong mặt phẳng giá trị | Suy diễn đường cận từ L và g; giải thích tung độ gốc là cận dưới. |
| S04-02 | Đường cận trong mặt phẳng giá trị | Ánh xạ nhân tử sang độ dốc và inf sang tung độ gốc; điểm tiếp xúc không khả thi cho giới hạn trực giác. |
| S04-03 | Tiếp xúc và đối ngẫu mạnh | Dùng đẳng thức bình phương xác nhận hình học cận khít, không suy luận chỉ bằng nhìn hình. |
| S04-04 | Bài tập: đọc cận trên mặt phẳng giá trị | Đo khả năng đọc cận và chặn trên sai số tối ưu từ đường thẳng, không nhầm khoảng tối ưu. |
| S04-04b | Bài tập: đọc cận trên mặt phẳng giá trị | Lời giải mẫu trên mặt trang, trùng bài 5 câu 2 của tài liệu bài tập. |

### 5. Điều kiện Karush–Kuhn–Tucker

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S05-00 | 5. Điều kiện Karush–Kuhn–Tucker | Trang tiêu đề mạch: tìm nghiệm không cần công thức của g. |
| S05-01 | Dấu bằng trong chuỗi đối ngẫu yếu | Dẫn hệ KKT từ nhu cầu tránh tính g và từ các điều kiện xảy ra đẳng thức trong chuỗi cận. |
| S05-02 | Ràng buộc hoạt động và bù trừ | Làm rõ logic bù trừ trước khi viết hệ tổng quát; phản ví dụ sửa chiều suy luận sai. |
| S05-03 | Bốn nhóm điều kiện KKT | Tổ chức các điều kiện thành bốn nhóm để sinh viên kiểm tra có hệ thống. |
| S05-04 | Ví dụ: hệ KKT của bài toán một biến | Minh họa quy trình giải theo từng trường hợp của điều kiện bù trừ và loại ứng viên theo tính khả thi, không chỉ giải phương trình. |
| S05-05 | Điều kiện cần và điều kiện đủ | Tách giả thiết cho tính cần và tính đủ, tránh coi Slater là điều kiện bắt buộc của chứng nhận. |
| S05-05b | Chứng minh: điều kiện đủ của KKT | Chứng minh điểm dùng tính lồi để bảo đảm toàn cục và nối KKT trở lại đối ngẫu yếu. |
| S05-05c | Chứng minh: điều kiện cần của KKT | Dùng nhân tử đạt đối ngẫu và chuỗi cận khít để suy ra riêng bù trừ và dừng. |
| S05-05a | Ví dụ: nghiệm tối ưu không có nhân tử KKT | Dùng miền chỉ có một điểm để thấy nghiệm tối ưu có thể không có nhân tử KKT khi thiếu giả thiết chính quy. |
| S05-06 | KKT trong hồi quy có ràng buộc chuẩn | Áp dụng các kết quả vừa học cho mô hình AI có kích thước thực tế; giải thích vai trò giới hạn trọng số. |
| S05-06a | Giải hệ KKT của hồi quy | Giải hệ dừng, xét nghiệm bình phương nhỏ nhất và trường hợp nhân tử dương mà không giả định X đủ hạng. |
| S05-06b | Ví dụ: hồi quy hai trọng số | Tính hai trọng số, nhân tử và mất mát đến kết quả số; kiểm tra đầy đủ bốn nhóm KKT. |
| S05-07 | Bài tập: KKT cho hồi quy một trọng số | Đo khả năng tự giải đủ các trường hợp và bốn nhóm KKT trên hồi quy một trọng số. |
| S05-07b | Bài tập: KKT cho hồi quy một trọng số | Lời giải mẫu trên mặt trang, trùng bài 6 câu 1–2 của tài liệu bài tập. |

### 6. Tổng hợp và vận dụng

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S07-00 | 6. Tổng hợp và vận dụng | Trang tiêu đề mạch, `id="mach-6"`. |
| S07-01 | Ba bước chứng nhận | Bảng kết quả, giả thiết không được bỏ và công thức của ba bước chứng nhận; không biến Slater thành bước bắt buộc trước chiều KKT đủ. |
| S07-02 | Bài tập: chứng nhận nghiệm của bài toán hai biến | Đánh giá tích hợp trong hai chiều. |
| S07-03 | Tài liệu và nội dung mở rộng | Chỉ đường tự học và nguồn kiểm chứng; tách kiến thức nâng cao khỏi tiên quyết của bài tập. |

## Nguồn đã kiểm kê và vai trò

| Tài nguyên | Vai trò | Phần sử dụng |
|---|---|---|
| DOCX đề cương UET.AI2012 chính thức trong sources/ | Đề cương | Buổi 3, phạm vi Chương 4, LLO4–5/CLO1, 2 tiết lý thuyết + 1 tiết bài tập |
| Bài 02 HTML và lecture-02-style.css | Mẫu cấu trúc và thị giác | Chia phần, tiêu đề, lưới, hộp, màu, runtime; chỉ đọc tại máy |
| sources/bv_cvxbook.pdf, Boyd–Vandenberghe (2004) | Nguồn nội dung | §5.1–5.3, §5.5; đọc và đối chiếu tại máy |
| sources/dual.pdf và bản trùng bài 5 MIT | Nguồn tham khảo trình tự khái niệm | Lagrange → đối ngẫu → hình học → tối ưu; phần độ nhạy của nguồn không dùng; không sao chép hình |
| sources/Bài tập chương 4.pdf và bản lời giải | Nguồn ví dụ cũ | Ví dụ bậc hai được tự tính lại; không mặc định lời giải nguồn đúng |
| Ghi chú và hình của Bài 03 phiên bản trước | Tài liệu cũ cần đồng bộ | Viết lại ghi chú; không dùng hình cũ cho tuyến mới |

Không tải thêm MIT. Hình mới tự vẽ từ công thức kiểm tra được, không có ngoại lệ raster. Nguồn chính thức: [Boyd–Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/), [MIT 6.079 bài 5](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/resources/mit6_079f09_lec05/). Nội tương đối, nón pháp tuyến, điểm yên ngựa và đối ngẫu theo nón chuyển sang đọc mở rộng; không phải tiên quyết của bài tập chính.

Các tệp plan.md, source-map.md, math-spec.md giữ để truy nguyên phiên bản trước; bản hiện hành là outline.md, storyboard.md và review-log.md. Tài liệu công khai: materials/lec-03/lecture-note.md và exercises.md.

Điều chỉnh thứ tự theo yêu cầu người dùng: S03-02 → S03-03 → S03-02b → S03-03a. Phát biểu điều kiện và định lý trước, sau đó minh họa trực quan rồi chứng minh; yêu cầu này ưu tiên hơn trình tự mặc định trực quan trước hình thức. Thời lượng đã phân bổ giữ nguyên.

Cụm hai chiều KKT: S05-05 → S05-05b (chứng minh điều kiện đủ đã có, đổi tên theo yêu cầu) → S05-05c (chứng minh điều kiện cần mới) → S05-05a (giới hạn khi thiếu Slater) → S05-06 (hồi quy). Giữ nội dung chứng minh đủ, không tạo trang trùng.

Đợt sửa văn phong 2026-10-12: thêm trang tiêu đề mạch S02-00, S03-00, S04-00, S05-00, S07-00 (id `mach-2`…`mach-6`); trang đầu mạch cũ đổi tiêu đề; S02-05c tách chứng minh sang S02-05d; bốn bài tập có lời giải mẫu trên trang kế tiếp; S07-01 thành bảng tổng kết. Chi tiết trong storyboard.md và review-log.md.
