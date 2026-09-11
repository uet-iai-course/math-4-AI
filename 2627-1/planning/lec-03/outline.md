# Dàn ý Bài 03 — Khung Đối ngẫu Lagrange

**Trạng thái:** khung theo yêu cầu ngày 2026-09-11; 36 trang, 7 mạch. Mỗi trang chỉ có tiêu đề và một TODO hiển thị. Chưa phải bài giảng hoàn chỉnh.

## Phạm vi và mẫu

- Buổi 3 theo đề cương DOCX chính thức; LLO4: hiểu hàm và bài toán đối ngẫu Lagrange; LLO5: thể hiện minh họa hình học của hàm đối ngẫu; liên quan CLO1.
- Bài 02 là mẫu cấu trúc và phong cách theo yêu cầu mới: section ngoài cho mạch, section trong cho trang, trang tiêu đề nằm đầu mạch thứ nhất; giữ kiểu chữ, màu, chân trang và cấu hình RevealJS.
- Ưu tiên yêu cầu khung: bỏ toàn bộ nội dung và ghi chú diễn giả cũ trong HTML; chưa thêm hình, công thức, lời giải hoặc ghi chú bài giảng mới.
- Đề cương phân bổ 2 tiết lý thuyết và 1 tiết bài tập cho buổi; thời lượng chi tiết chỉ là dự kiến nội bộ khi phát triển nội dung.
- Vấn đề trung tâm: tạo cận dưới, nhận biết khi cận khít và dùng kết quả để chứng nhận nghiệm tối ưu.
- Ví dụ cho giai đoạn soạn: $\min_x x^2+1$ với $(x-2)(x-4)\le0$; $x^*=2$, $p^*=5$, $\lambda^*=2$. Không đưa công thức lên khung.
- Nội tương đối, tập mở rộng và bao đóng, nón pháp tuyến, dưới gradient, điểm yên ngựa và đối ngẫu theo nón đặt trong kế hoạch đọc mở rộng cuối bài.

## Danh sách mạch và trang

### 1. Mở đầu — 3 trang

| Mã | Tiêu đề | Việc cần soạn |
|---|---|---|
| S01-01 | Bài 03: Đối ngẫu Lagrange | TODO: Giới thiệu học phần, đơn vị phụ trách và chủ đề đối ngẫu Lagrange. |
| S01-02 | Mục tiêu học tập | TODO: Nêu tiên quyết và mục tiêu giải thích cận dưới, đọc hình, kiểm tra điều kiện tối ưu. |
| S01-03 | Nội dung chính | TODO: Nối các mạch cận dưới, đối ngẫu mạnh, hình học, điều kiện tối ưu và độ nhạy. |

### 2. Hàm và bài toán đối ngẫu Lagrange — 8 trang

| Mã | Tiêu đề | Việc cần soạn |
|---|---|---|
| S02-01 | Hàm và bài toán đối ngẫu Lagrange | TODO: Nêu nhu cầu chứng nhận một nghiệm khả thi bằng cận dưới của giá trị tối ưu. |
| S02-02 | Ví dụ tối ưu có ràng buộc | TODO: Giới thiệu ví dụ bậc hai xuyên suốt, miền khả thi và nghiệm ứng viên. |
| S02-03 | Họ hàm tạo cận dưới | TODO: Vẽ họ hàm tạo cận và kiểm tra một cận cụ thể trên ví dụ. |
| S02-04 | Hàm Lagrange | TODO: Định nghĩa hàm Lagrange, miền biến và quy ước dấu của các nhân tử. |
| S02-05 | Hàm đối ngẫu | TODO: Định nghĩa hàm đối ngẫu bằng cận dưới đúng và tính trên ví dụ xuyên suốt. |
| S02-06 | Đối ngẫu yếu | TODO: Chứng minh đối ngẫu yếu bằng chuỗi bất đẳng thức, không cần giả thiết lồi. |
| S02-07 | Bài toán đối ngẫu | TODO: Chọn cận dưới tốt nhất trong ví dụ và phát biểu bài toán đối ngẫu. |
| S02-08 | Bài tập xây dựng cận dưới | TODO: Giao bài tập tạo cận dưới và chứng nhận nghiệm cho một bài toán mới. |

### 3. Đối ngẫu mạnh và điều kiện Slater — 6 trang

| Mã | Tiêu đề | Việc cần soạn |
|---|---|---|
| S03-01 | Đối ngẫu mạnh và điều kiện Slater | TODO: Minh họa khoảng giữa cận dưới và giá trị tối ưu; nêu nhu cầu bảo đảm cận khít. |
| S03-02 | Cận khít trong ví dụ | TODO: Tìm nhân tử cho cận khít trong ví dụ và đặt tên đối ngẫu mạnh. |
| S03-03 | Điều kiện Slater | TODO: Phát biểu Slater với giả thiết lồi, miền toàn không gian và điểm khả thi nghiêm. |
| S03-04 | Kiểm tra điều kiện Slater | TODO: Tìm điểm thỏa Slater trong ví dụ và phân biệt điểm này với nghiệm tối ưu. |
| S03-05 | Giới hạn của điều kiện Slater | TODO: Dùng phản ví dụ phân biệt điều kiện đủ, đối ngẫu mạnh và sự đạt nghiệm đối ngẫu. |
| S03-06 | Bài tập đối ngẫu mạnh và Slater | TODO: Giao bài tập kiểm tra Slater và xác định những kết luận được bảo đảm. |

### 4. Hình học của đối ngẫu — 4 trang

| Mã | Tiêu đề | Việc cần soạn |
|---|---|---|
| S04-01 | Hình học của đối ngẫu | TODO: Nêu nhu cầu đọc cận bằng hình và đổi tọa độ trên các điểm của ví dụ. |
| S04-02 | Đường cận trong mặt phẳng giá trị | TODO: Vẽ tập giá trị và đường cận; giải thích hệ số góc và tung độ cắt. |
| S04-03 | Tiếp xúc và đối ngẫu mạnh | TODO: Liên hệ đường cận khít với giá trị tối ưu và điều kiện tiếp xúc trong ví dụ. |
| S04-04 | Bài tập đọc hình đối ngẫu | TODO: Giao bài tập đọc cận, nhân tử và khoảng đối ngẫu từ hình. |

### 5. Điều kiện Karush–Kuhn–Tucker (KKT) — 7 trang

| Mã | Tiêu đề | Việc cần soạn |
|---|---|---|
| S05-01 | Điều kiện Karush–Kuhn–Tucker (KKT) | TODO: Suy điều kiện tối ưu từ cận khít; minh họa cân bằng gradient trong ví dụ. |
| S05-02 | Ràng buộc hoạt động và bù trừ | TODO: Giải thích bù trừ và kiểm tra trường hợp ràng buộc hoạt động có nhân tử bằng không. |
| S05-03 | Bốn nhóm điều kiện KKT | TODO: Trình bày khả thi gốc, khả thi đối ngẫu, bù trừ và dừng trong trường hợp khả vi. |
| S05-04 | Giải ví dụ bằng KKT | TODO: Giải các trường hợp của ví dụ và loại ứng viên vi phạm tính khả thi hoặc dấu nhân tử. |
| S05-05 | Điều kiện cần và điều kiện đủ | TODO: Nêu giả thiết cho tính cần và tính đủ; phân biệt bài toán lồi với phi lồi. |
| S05-06 | KKT trong hồi quy có ràng buộc | TODO: Áp dụng KKT cho hồi quy có ràng buộc chuẩn và kiểm tra điều kiện Slater. |
| S05-07 | Bài tập kiểm tra nghiệm tối ưu | TODO: Giao bài tập kiểm tra bốn nhóm KKT và biện minh kết luận tối ưu. |

### 6. Nhân tử và độ nhạy — 5 trang

| Mã | Tiêu đề | Việc cần soạn |
|---|---|---|
| S06-01 | Nhân tử và độ nhạy | TODO: Nêu nhu cầu dự đoán thay đổi giá trị tối ưu khi nới hoặc siết ràng buộc. |
| S06-02 | Nới ràng buộc trong ví dụ | TODO: Vẽ miền khả thi và tính giá trị tối ưu khi thay đổi ràng buộc trong ví dụ. |
| S06-03 | Hàm giá trị và độ nhạy cục bộ | TODO: Định nghĩa hàm giá trị, nêu giả thiết khả vi và diễn giải xấp xỉ cục bộ bằng nhân tử. |
| S06-04 | Diễn giải nhân tử trong hồi quy | TODO: Ước lượng thay đổi mất mát tối ưu khi nới giới hạn chuẩn trong hồi quy. |
| S06-05 | Bài tập độ nhạy | TODO: Giao bài tập ước lượng thay đổi giá trị tối ưu và kiểm tra giới hạn của xấp xỉ. |

### 7. Tổng hợp và vận dụng — 3 trang

| Mã | Tiêu đề | Việc cần soạn |
|---|---|---|
| S07-01 | Tổng hợp và vận dụng | TODO: Tổng hợp cách tạo cận, kiểm tra Slater, dùng KKT và diễn giải nhân tử. |
| S07-02 | Bài tập tổng hợp | TODO: Giao bài tập tích hợp mô hình hóa, cận đối ngẫu và chứng nhận tối ưu. |
| S07-03 | Tài liệu và nội dung mở rộng | TODO: Ghi nguồn đọc, nội dung mở rộng và kiến thức dùng tiếp ở bài sau. |

## Nguồn và trạng thái tài liệu

- `sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx`: phạm vi, LLO/CLO và đánh giá; đã đọc ở bước nghiên cứu.
- `2627-1/lecture-02-cac-bai-toan-toi-uu-loi.html`, `lecture-02-style.css`: mẫu bố cục và phong cách, chỉ phân tích tại máy.
- Boyd và Vandenberghe (2004), *Convex Optimization*, Chương 5: nguồn nội dung khi soạn chi tiết; [trang giáo trình chính thức](https://web.stanford.edu/~boyd/cvxbook/).
- `sources/dual.pdf`: nguồn thứ tự khái niệm cũ; `sources/Bài tập chương 4.pdf`: nguồn ví dụ. Không tải thêm nguồn MIT.
- `source-map.md`, `math-spec.md`, `plan.md` trong thư mục này là hồ sơ phiên bản trước; ánh xạ khung hiện hành nằm trong `storyboard.md`.
- Ghi chú công khai hiện có thuộc phiên bản trước. Chưa có tệp bài tập công khai Bài 03; không tạo lại trong nhiệm vụ khung.
