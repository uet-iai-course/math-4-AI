# Duyệt mạch truyện, liên kết và tập trung của mạch — deck Bài 14

Vai 5 `mach-truyen` (chỉ đọc), 2026-11-16. Bản đóng băng `2627-1/lecture-14-hoc-bieu-dien-mo-hinh-sinh.html` (60 trang, 7 mạch). Đối chiếu: `materials/lec-14/lecture-note.md` (thứ tự mục), `materials/lec-14/exercises.md`, `planning/lec-14/storyboard.md`, deck 05, 06, 10, 11, 12 và bản nháp deck 13. Bảng kiểm liên tục theo phần Outline/Threads/Concept của `quill/references/workflows.md` (thứ tự tiên quyết, mạch ý mở và đóng, khái niệm có trước khi dùng); không tạo `quill.json`.

Kiểm bằng máy đã chạy: `deck_lint.py` (9 phát hiện, đều có lý do trong bảng lệch cuối storyboard); Playwright kiểm sáu liên kết của trang "Nội dung": `#/1`→L14-1-01, `#/2`→L14-2-00, …, `#/7`→L14-7-00, tổng 60 trang. Không chụp ảnh (ngoài phạm vi vai).

## 1. Kiểm tra chung

| Hạng mục | Kết quả |
|---|---|
| Số mạch (NT10) | 7, gồm Mở đầu và Tổng kết; mỗi mạch có trang tiêu đề `strand-title`, `id="mach-N"` |
| "Nội dung" và `#/N` (NT11) | 7 mục, tên trùng `h2` của trang tiêu đề mạch; liên kết đúng (kiểm bằng trình duyệt) |
| "Vấn đề trung tâm" mở đầu (NT11) | một hộp `div.check`, đúng câu in đậm của ghi chú dòng 3; câu trả lời theo mạch ở ghi chú diễn giả |
| Dòng dẫn (NT12) | năm khuôn câu khác nhau, không "Nhu cầu:", không "Muốn …", không mở bằng "Người học" |
| "Vấn đề trung tâm" ở Tổng kết (NT15) | trả lời cho cả bài theo ba phương pháp như §9 của ghi chú; thiếu cơ chế sinh mẫu (phát hiện 14) |
| Tổng kết không thêm khái niệm mới (NT15) | thuật ngữ "PCA xác suất" lần đầu lên mặt trang ở L14-7-04 (phát hiện 15) |
| Bảng `Mục \| Bài tập` (NT15) | đủ 11 bài (14.1–14.4 của ghi chú, 14.5–14.11 của `exercises.md`); cách xếp đúng quy tắc "mạch cung cấp kiến thức cuối cùng" |
| Liên kết trình xem | `material-viewer.html?doc=materials/lec-14/{lecture-note,exercises}.md&deck=lecture-14-hoc-bieu-dien-mo-hinh-sinh.html`, đúng hợp đồng |
| Dòng nối cuối (NT15) | theo đoạn cuối §11 của ghi chú (Bài 14 là bài cuối, không dẫn bài sau); đóng mạch ý mà deck 13 mở ("Bài 14 xét mô hình có biến ẩn, như bit cũ của cảm biến") nhưng chưa gọi tên Bài 13 (phát hiện 17) |
| Xem trước bài sau | không có (bài cuối) |
| Thứ tự mạch và mục | mạch 2–6 ứng với §4, §5, §6, §7, §8 liên tiếp; hai chỗ đảo thứ tự trong một mục (phát hiện 2, 13) |

## 2. Rà tập trung từng mạch

### Mạch 1. Mở đầu

Câu hỏi: câu hỏi trung tâm của bài — *làm thế nào học một không gian biểu diễn có chiều thấp và sử dụng nó để mô hình hóa hoặc sinh dữ liệu mới?*

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Đề xuất |
|---|---|---|---|---|---|---|
| L14-1-01 | bìa, luận điểm một câu có điều kiện | cả bài | mở | — (ghi chú diễn giả nối Tình huống 13.2) | L14-1-02 | giữ |
| L14-1-02 | "Nhắc lại:" định lý phổ, lấy biên, Bayes, phương sai, hợp lý cực đại, nhiễu Gaussian; "Ký hiệu:" | tiên quyết | chuẩn bị | Bài 06, 10–12 | mạch 2–6 | thiếu mạng nơ-ron và lan truyền ngược (phát hiện 5) |
| L14-1-03 | sáu mục tiêu của ghi chú | khung | định hướng | — | L14-1-04 | giữ |
| L14-1-04 | danh sách 7 mạch, đọc trước | khung | định hướng | — | L14-1-05 | giữ |
| L14-1-05 | một hộp "Câu hỏi:" | câu hỏi trung tâm | mở câu hỏi | — | mạch 2 | giữ |

### Mạch 2. Phân tích thành phần chính

Câu hỏi của mạch: đường thẳng (không gian con) qua tâm dữ liệu nào giữ nhiều thông tin nhất, đo bằng phương sai của mã hay bằng lỗi tái tạo, và hai tiêu chuẩn đó có cùng nghiệm không? Câu hỏi có trên mặt trang L14-2-01 ("Câu hỏi: Đường thẳng qua gốc nào giữ nhiều thông tin nhất của bốn quan sát?"). Phân rã "tổng bình phương = phần giữ lại + lỗi" chỉ lên mặt trang ở L14-2-05/06 (phát hiện 6).

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Đề xuất |
|---|---|---|---|---|---|---|
| L14-2-00 | tiêu đề mạch | khung | mở | L14-1-05 | L14-2-01 | giữ |
| L14-2-01 | Ví dụ 14.1, lỗi trục ngang $1/2$, câu hỏi mạch | vấn đề | mở câu hỏi, ví dụ dẫn nhập | Câu hỏi mở đầu | L14-2-02 (cần tiêu chuẩn so sánh) | giữ |
| L14-2-02 | trực quan + Định nghĩa 14.1, 14.2, (4.3) | tiêu chuẩn phương sai | phát biểu bài toán | L14-2-01 | L14-2-03 | câu nối lỗi → phương sai (phát hiện 6) |
| L14-2-03 | Mệnh đề 14.3 | nghiệm của (4.3) | kết quả chính | L14-2-02 | L14-2-04 | giữ |
| L14-2-04 | ý tưởng chứng minh 14.3 | nghiệm của (4.3) | chứng minh | L14-2-03 | L14-2-05 | giữ |
| L14-2-05 | Ví dụ 14.2, Diễn giải $2+\frac12=\frac12+2$ | nối hai tiêu chuẩn | ví dụ, câu nối sang 14.4 | L14-2-04 | L14-2-06 | lặp phép tính lỗi của L14-2-01 (phát hiện 7) |
| L14-2-06 | Mệnh đề 14.4 | hai tiêu chuẩn cùng nghiệm | kết quả chính, trả lời câu hỏi | L14-2-05 | L14-2-07 | giữ |
| L14-2-07 | ý tưởng chứng minh 14.4 | như trên | chứng minh | L14-2-06 | L14-2-08 | giữ |
| L14-2-08 | Định lý 14.6, tỉ lệ phương sai, "Mã và tái tạo vẫn tuyến tính." | mở rộng hạng $k$; giới hạn | kết quả, câu nối sang mạch 3 | L14-2-07 | mạch 3 (nhưng L14-2-09 chen giữa) | đổi chỗ với L14-2-09 (phát hiện 2) |
| L14-2-09 | Nhận xét 14.5, "Câu hỏi:" | giới hạn của tiêu chuẩn | kiểm tra | L14-2-08 | mạch 3 (không có câu nối) | đặt trước L14-2-08 (phát hiện 2) |

### Mạch 3. Bộ tự mã hóa tất định

Câu hỏi của mạch: học hai ánh xạ mã hóa và giải mã thì xác định được phép tái tạo, tọa độ mã, phân phối của mã hay không? Có trên mặt trang L14-3-01 ("Câu hỏi: Hai ánh xạ xác định gì: phép tái tạo, tọa độ mã, phân phối của mã?"). Ba phần việc được trả lời lần lượt ở L14-3-02 (tái tạo), L14-3-04 (tọa độ), L14-3-05 (phân phối).

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Đề xuất |
|---|---|---|---|---|---|---|
| L14-3-00 | tiêu đề mạch | khung | mở | L14-2-08/09 | L14-3-01 | giữ |
| L14-3-01 | trực quan đường cong, Định nghĩa 14.7, câu hỏi mạch | ba phần việc | mở câu hỏi | "Mã và tái tạo vẫn tuyến tính." | L14-3-02 | giữ |
| L14-3-02 | Mệnh đề 14.8, Ý nghĩa | tái tạo; tọa độ tới $R$ | kết quả chính | L14-3-01, Định lý 14.6 | L14-3-03 | giữ |
| L14-3-03 | ý tưởng chứng minh 14.8 | tái tạo | chứng minh | L14-3-02 | L14-3-04 | giữ |
| L14-3-04 | Ví dụ 14.3, $R=(2)$ | tọa độ mã | ví dụ | L14-3-02 | L14-3-05 | giữ |
| L14-3-05 | Ví dụ 14.4, Diễn giải "không chứa phân phối của mã" | phân phối của mã | ví dụ, câu nối sang mạch 4 | L14-3-04 | mạch 4 | giữ |
| L14-3-06 | Bài tập 14.1 câu 1–2, Lời giải | tái tạo, tọa độ | kiểm tra | L14-3-05 | mạch 4 | giữ (tách bài đã duyệt ở cổng, Q13) |

### Mạch 4. Mô hình sinh có biến ẩn

Câu hỏi của mạch: cần thêm gì vào cặp $f,g$ để sinh dữ liệu, và mô hình đó đặt ra những phép tính nào (sinh mẫu, hợp lý, hậu nghiệm)? Trên mặt trang trang nội dung đầu tiên L14-4-01 chỉ có dữ kiện và "Diễn giải: cần thêm một phân phối của mã và một nhiễu quanh $g(z)$" ở cuối trang; không có câu nêu vấn đề hay dòng "Câu hỏi:" như bốn mạch nội dung còn lại (phát hiện 1). Phần thứ hai của câu hỏi lên mặt trang ở L14-4-03, trong nửa đầu mạch.

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Đề xuất |
|---|---|---|---|---|---|---|
| L14-4-00 | tiêu đề mạch | khung | mở | L14-3-05 | L14-4-01 | giữ |
| L14-4-01 | cách sinh thử $Z\sim\mathcal N(0,1)$, $X=g(Z)$; Trực quan hai bước; Diễn giải | cần thêm gì | vấn đề | Câu hỏi mở đầu, Ví dụ 14.4 | L14-4-02 | thêm "Câu hỏi:" (phát hiện 1); Trực quan sau Diễn giải (phát hiện 8); tránh lặp L14-3-05 (phát hiện 9) |
| L14-4-02 | Định nghĩa 14.10, (6.1), (6.2) | tiên nghiệm + nhiễu | định nghĩa | L14-4-01 | L14-4-03 | giữ |
| L14-4-03 | Định nghĩa 14.11, (6.3), dòng kết về tích phân | ba phép tính | định nghĩa, câu nối sang mạch 5 | L14-4-02 | L14-4-04, mạch 5 | giữ |
| L14-4-04 | trang "Kỹ thuật." hoàn bình phương | công cụ tính biên, hậu nghiệm | kỹ thuật (lần đầu trong deck của học phần) | L14-4-03 | L14-4-05 | giữ |
| L14-4-05 | Ví dụ 14.5, Diễn giải "hiệp phương sai biên trùng $S$" | ba phép tính trên mô hình bậc hai | ví dụ, đóng Câu hỏi mở đầu | L14-4-04 | L14-4-06 | giữ |
| L14-4-06 | Bài tập 14.1 câu 3–4, Lời giải | phân phối của mã, nhiễu | kiểm tra | L14-4-05 | mạch 5 | giữ |

### Mạch 5. Cận dưới bằng chứng

Câu hỏi của mạch: đại lượng nào chỉ gồm kỳ vọng theo một phân phối tự chọn và lệch khỏi $\log p_\theta(x)$ bao nhiêu? Có trên mặt trang L14-5-01; câu trả lời ở L14-5-05 (trang thứ 5 trong 11 trang nội dung).

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Đề xuất |
|---|---|---|---|---|---|---|
| L14-5-00 | tiêu đề mạch | khung | mở | L14-4-03 | L14-5-01 | giữ |
| L14-5-01 | (6.1) không có dạng đóng, lưới $10^{20}$, Trực quan, câu hỏi mạch | vấn đề | mở câu hỏi, câu nối từ mạch 4 | giới hạn của Ví dụ 14.5 | L14-5-02 | nhu cầu thước đo chỉ ở ghi chú diễn giả (phát hiện 3) |
| L14-5-02 | Định nghĩa 14.12, Bổ đề 14.13 | thước đo, dấu của khe hở | định nghĩa, kết quả phụ | L14-5-01 | L14-5-03 | mở bằng định nghĩa (phát hiện 3); dùng $\log t\le t-1$ trước "Nhắc lại:" (phát hiện 10) |
| L14-5-03 | ý tưởng chứng minh 14.13 | dấu của khe hở | chứng minh | L14-5-02 | L14-5-04 | giữ |
| L14-5-04 | Định nghĩa 14.14, (7.2) | đại lượng tính được | định nghĩa | L14-5-03 | L14-5-05 | giữ |
| L14-5-05 | Định lý 14.15, (7.3) | độ lệch chính xác | kết quả chính, trả lời câu hỏi | L14-5-04 | L14-5-06 | giữ |
| L14-5-06 | ý tưởng chứng minh 14.15, Cách khác Jensen | như trên | chứng minh | L14-5-05 | L14-5-07 | giữ |
| L14-5-07 | bảng hai vai trò của KL, Định nghĩa 14.16, dòng "khe hở đổi theo $\theta$" | đọc (7.2) và (7.3) | so sánh, câu nối sang mạch 6 | L14-5-06 | L14-5-08 | giữ |
| L14-5-08 | Bổ đề 14.17, Mệnh đề 14.18 | số hạng KL của (7.2) | công cụ tính | L14-5-07 (hàng "Tính được") | L14-5-09 | câu nối chưa gọi tên số hạng của (7.2) (phát hiện 11) |
| L14-5-09 | (7.6), Nhắc lại Mệnh đề 12.2, Ví dụ 14.6 | số hạng tái tạo của (7.2) | công thức + ví dụ | L14-5-08 | L14-5-10 | trộn phát biểu và ví dụ; "Nhắc lại:" đứng sau công thức (phát hiện 4) |
| L14-5-10 | Ví dụ 14.7, khe hở $\log2-\frac38$ | kiểm (7.3) bằng số | ví dụ | L14-5-08, L14-5-09 | L14-5-11 | giữ |
| L14-5-11 | Bài tập 14.2 câu 4–5, Lời giải | cận chặt khác KL tới tiên nghiệm nhỏ | kiểm tra | L14-5-10 | mạch 6 | giữ |

### Mạch 6. Bộ tự mã hóa biến phân

Câu hỏi của mạch: tối ưu cận dưới trên $n$ quan sát bằng gradient thế nào, và giá trị của mục tiêu cho phép kết luận gì? Có trên mặt trang L14-6-01. Phần một trả lời ở L14-6-02 → L14-6-06, phần hai ở L14-6-07 → L14-6-09.

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Đề xuất |
|---|---|---|---|---|---|---|
| L14-6-00 | tiêu đề mạch | khung | mở | L14-5-07 | L14-6-01 | giữ |
| L14-6-01 | số biến tăng theo $n$, Trực quan, Định nghĩa 14.19, (8.1), hình, câu hỏi mạch | mục tiêu học | mở câu hỏi | (7.2), Mệnh đề 14.18 | L14-6-02 | dòng đầu chưa gọi tên hậu nghiệm xấp xỉ (phát hiện 12) |
| L14-6-02 | vấn đề gradient theo $\phi$, "Kỹ thuật." tái tham số hóa, Monte Carlo | gradient | kỹ thuật (lần đầu) | L14-6-01 | L14-6-03 | giữ |
| L14-6-03 | Mệnh đề 14.20, (8.3) | gradient không chệch | kết quả chính | L14-6-02 | L14-6-04 | giữ |
| L14-6-04 | ý tưởng chứng minh 14.20 | như trên | chứng minh | L14-6-03 | L14-6-05 | giữ |
| L14-6-05 | Ví dụ 14.8 | không chệch theo kỳ vọng | ví dụ | L14-6-04 | L14-6-06 | đảo thứ tự với Thuật toán 14.21 so với ghi chú (phát hiện 13) |
| L14-6-06 | Thuật toán 14.21 | thuật toán huấn luyện | thuật toán | L14-6-05 | L14-6-07 | như trên |
| L14-6-07 | Nhận xét 14.22 | giá trị mục tiêu cho biết gì | giới hạn | L14-6-06 | L14-6-08 | giữ |
| L14-6-08 | Bài tập 14.4 (đề) | như trên | kiểm tra | L14-6-07 | L14-6-09 | giữ |
| L14-6-09 | Bài tập 14.4 (Lời giải) | như trên | kiểm tra, đóng mạch | L14-6-08 | mạch 7 | giữ |

### Mạch 7. Tổng kết

Câu hỏi: câu hỏi trung tâm của cả bài.

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Đề xuất |
|---|---|---|---|---|---|---|
| L14-7-00 | tiêu đề mạch | khung | mở | L14-6-09 | L14-7-01 | giữ |
| L14-7-01 | bảng kết quả, bài toán nén | tổng hợp | bảng tổng kết (phần 1) | mạch 2–3 | L14-7-02 | tiêu đề (phát hiện 19) |
| L14-7-02 | bảng kết quả, mô hình sinh | tổng hợp | bảng tổng kết (phần 2) | mạch 4–6 | L14-7-03 | tiêu đề (phát hiện 19) |
| L14-7-03 | "Vấn đề trung tâm" | trả lời cả bài | câu trả lời | L14-7-02 | L14-7-04 | thêm cơ chế sinh mẫu (phát hiện 14) |
| L14-7-04 | Bài tập 14.5 (đề) | nối PCA với mô hình sinh | bài tập tổng hợp | mạch 2, 4 | L14-7-05 | "PCA xác suất" mới trên mặt trang (phát hiện 15) |
| L14-7-05 | Bài tập 14.5 (Lời giải), kiểm tra bốn quan sát | như trên | lời giải | L14-7-04 | L14-7-06 | giữ |
| L14-7-06 | ba "Câu hỏi:" của §11 | tự kiểm tra | kiểm tra | — | L14-7-07 | giữ |
| L14-7-07 | bảng `Mục \| Bài tập`, liên kết trình xem | giao bài | bài về nhà | — | L14-7-08 | đánh dấu bài đã làm trên lớp (phát hiện 16) |
| L14-7-08 | "Tài liệu tham khảo", dòng nối | tài liệu, cầu nối | đóng bài | — | — | gọi tên Bài 13 trong dòng nối (phát hiện 17) |

## 3. Bảng đối chiếu trang → mục ghi chú

| Trang | Mục ghi chú | Thứ tự |
|---|---|---|
| L14-1-01 → L14-1-05 | phần mở đầu (dòng 3–10), Mục tiêu học tập, Kiến thức tiên quyết, §12 (đọc trước), §1 (ghi chú diễn giả) | đúng |
| L14-2-01 | Câu hỏi mở đầu (dòng 14–19), §3 Ví dụ 14.1, §4 mở đầu | đúng |
| L14-2-02 → L14-2-05 | §4.1: Định nghĩa 14.1, 14.2, Mệnh đề 14.3, Ví dụ 14.2 | đúng |
| L14-2-06, L14-2-07 | §4.2: Mệnh đề 14.4 | đúng |
| L14-2-08 | §4.3: Định lý 14.6 (cùng đoạn chọn $k$ của §4.2 trong ghi chú diễn giả) | **đặt trước** Nhận xét 14.5 của §4.2 |
| L14-2-09 | §4.2: Nhận xét 14.5 | **đặt sau** §4.3 |
| L14-3-01 → L14-3-05 | §5: Định nghĩa 14.7, Mệnh đề 14.8, Ví dụ 14.3, 14.4, Nhận xét 14.9 (ghi chú diễn giả) | đúng |
| L14-3-06 | §6.1: Bài tập 14.1 câu 1–2 | đưa lên trước §6 (đã duyệt ở cổng, Q13) |
| L14-4-01 | §6 mở đầu (dẫn Câu hỏi mở đầu dòng 21–27) | đúng |
| L14-4-02 → L14-4-06 | §6: Định nghĩa 14.10; §6.1: Định nghĩa 14.11, Ví dụ 14.5, Bài tập 14.1 câu 3–4 | đúng |
| L14-5-01 | cuối §6.1 (dòng 589), §7 mở đầu | đúng |
| L14-5-02, L14-5-03 | §7.1 | đúng |
| L14-5-04 → L14-5-07 | §7.2: Định nghĩa 14.14, Định lý 14.15, Định nghĩa 14.16 | đúng |
| L14-5-08 → L14-5-11 | §7.3: Bổ đề 14.17, Mệnh đề 14.18, (7.6), Ví dụ 14.6, 14.7, Bài tập 14.2 | đúng |
| L14-6-01, L14-6-02 | §8: Định nghĩa 14.19; §8.1 mở đầu | đúng |
| L14-6-03, L14-6-04 | §8.1: Mệnh đề 14.20 (dòng 1161) | đúng |
| L14-6-05 | §8.1: Ví dụ 14.8 (dòng 1275) | **đặt trước** Thuật toán 14.21 |
| L14-6-06 | §8.1: Thuật toán 14.21 (dòng 1244) | **đặt sau** Ví dụ 14.8 |
| L14-6-07 → L14-6-09 | §8.2: Nhận xét 14.22, Bài tập 14.4; §9 Tình huống 14.2 (ghi chú diễn giả) | đúng |
| L14-7-01 → L14-7-03 | §9: bảng kết quả, ba câu trả lời, Tình huống 14.1 | đúng |
| L14-7-04, L14-7-05 | `exercises.md` Bài tập 14.5 | — |
| L14-7-06 | §11: câu hỏi cuối buổi | đúng |
| L14-7-07 | §10, `exercises.md` | đúng |
| L14-7-08 | §12, đoạn cuối §11 | đúng |

## 4. Liên tục khái niệm và mạch ý (bảng kiểm Outline/Threads/Concept)

| Mạch ý hoặc khái niệm | Mở | Dùng lại | Đóng | Nhận xét |
|---|---|---|---|---|
| Bốn quan sát cảm biến (ví dụ xuyên suốt) | L14-2-01 | L14-2-05, L14-3-04, L14-4-01, L14-4-05, L14-7-03, L14-7-05 | L14-7-05 | mỗi lần một câu hỏi mới; lặp phép tính lỗi ở L14-2-05 (phát hiện 7) |
| Câu hỏi mở đầu (sinh từ $f,g$) | ghi chú diễn giả L14-2-01; mặt trang L14-4-01 | — | L14-4-05 Diễn giải | câu hỏi chưa lên mặt trang (phát hiện 1) |
| Tọa độ mã không duy nhất | L14-3-02 | L14-3-04, L14-3-06 | L14-7-03 | đủ |
| Bộ tự mã hóa không chứa phân phối | L14-3-05 | L14-4-01, L14-4-06 | L14-7-06 câu 1 | lặp lập luận "diện tích $0$" ba lần (phát hiện 9) |
| Tích phân biên không tính được | L14-4-03 dòng kết | L14-5-01 | L14-5-05 | đủ, câu nối trên mặt trang |
| KL tới tiên nghiệm nhỏ khác cận chặt | L14-5-07 (bảng) | L14-5-11 câu 5, L14-6-07 | L14-6-09, L14-7-06 câu 3 | đủ |
| Khe hở phụ thuộc $\theta$ | L14-5-07 | ghi chú diễn giả L14-6-06 | — | đủ cho mục đích của bài |
| Mạng nơ-ron, lan truyền ngược (Bài 06) | — | mặt trang L14-6-01, L14-6-06 | — | chưa "Nhắc lại:" trên mặt trang (phát hiện 5) |
| $\log t\le t-1$ (deck 11) | — | L14-5-02 | L14-5-03 "Nhắc lại:" | dùng trước khi nhắc (phát hiện 10) |
| Hiệp phương sai mẫu (deck 11) | L14-2-02 "còn gọi là hiệp phương sai mẫu" | — | — | khớp tên ở deck 11 |
| Định lý Pythagore (deck 05), Jensen (deck 05b, 06) | — | L14-2-07 "Nhắc lại:", L14-5-06 "Cách khác:" | — | khớp |
| Kỹ thuật mới: hoàn bình phương, tái tham số hóa, Monte Carlo | L14-4-04, L14-6-02 | L14-4-05, L14-5-10, L14-6-03 → L14-6-06 | — | đúng NT7; deck 12, 13 không dùng các kỹ thuật này (grep) |
| Mạch ý từ deck 13 ("Bài 14 xét mô hình có biến ẩn, như bit cũ của cảm biến") | deck 13, trang "Tài liệu tham khảo" | ghi chú diễn giả L14-1-01 (Tình huống 13.2) | L14-7-08 dòng nối | đóng ngầm, chưa gọi tên Bài 13 trên mặt trang (phát hiện 17) |
| Quy ước bảng bài về nhà | deck 12 đánh dấu "(trên lớp)" | deck 13 không đánh dấu | deck 14 không đánh dấu | thiếu thống nhất (phát hiện 16) |

## 5. Phát hiện

| # | mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|---|
| 1 | trung bình | L14-4-01 | NT13: câu hỏi của mạch 4 không có trên mặt trang nội dung đầu tiên dưới dạng câu nêu vấn đề hay "Câu hỏi:"; trang mở thẳng bằng dữ kiện và chỉ có "Diễn giải:" ở cuối. Bốn mạch nội dung còn lại đều có dòng "Câu hỏi:" ở trang đầu | Mặt trang: "Dữ kiện: bốn quan sát …; cách sinh thử $Z\sim\mathcal N(0,1)$, $X=g(Z)$." … "**Diễn giải:** cần thêm một phân phối của mã và một nhiễu quanh $g(z)$." Ghi chú dòng 21: "**Câu hỏi.** Làm thế nào dùng cặp ánh xạ $f,g$ để sinh thêm những quan sát giống bốn quan sát trên?" | Thêm sau dòng dữ kiện: "**Câu hỏi:** Làm thế nào dùng cặp ánh xạ $f,g$ để sinh thêm những quan sát giống bốn quan sát trên?" (nguyên văn ghi chú). Trang lên 6 dòng, còn trong trần |
| 2 | trung bình | L14-2-08, L14-2-09 | NT2: thứ tự lệch ghi chú (Nhận xét 14.5 thuộc §4.2, Định lý 14.6 thuộc §4.3). NT13: câu nối sang mạch 3 không đứng cuối mạch; trang cuối mạch 2 nói về nhãn và thang đo, không nối sang bộ tự mã hóa | L14-2-08 dòng cuối: "Mã và tái tạo vẫn tuyến tính."; sau đó L14-2-09 "Phương sai lớn và tín hiệu cần dự đoán", rồi L14-3-00. Ghi chú: Nhận xét 14.5 dòng 329 (§4.2), Định lý 14.6 dòng 337 (§4.3), câu nối "mã và tái tạo vẫn bị giới hạn ở dạng tuyến tính … Trong Mục 5 …" dòng 348 | Đổi chỗ: L14-2-09 (Nhận xét 14.5) đứng ngay sau L14-2-07, L14-2-08 (Định lý 14.6) thành trang cuối mạch 2 với dòng "Mã và tái tạo vẫn tuyến tính." nối thẳng sang L14-3-00. L14-2-09 chỉ dùng (4.3) và PCA một chiều nên không phụ thuộc L14-2-08. Đổi mã trang và storyboard tương ứng |
| 3 | trung bình | L14-5-01, L14-5-02 | NT8: khái niệm KL mở bằng định nghĩa; nhu cầu "một thước đo khác nhau giữa hai phân phối" chỉ có trong ghi chú diễn giả. NT13: câu nối giữa cụm "cận dưới" và cụm "phân kỳ" không có trên mặt trang | L14-5-01 ghi chú diễn giả: "Để nói "gần hậu nghiệm" một cách định lượng cần một thước đo sự khác nhau giữa hai phân phối; định nghĩa tiếp theo cho thước đo đó." L14-5-02 dòng đầu: "**Định nghĩa 14.12.** Với mật độ chuẩn hóa $q,p$ …". Ghi chú dòng 656 đặt câu này trên trang chữ | Nối vào dòng "Trực quan." của L14-5-01: "**Trực quan.** Phân phối dễ lấy mẫu nên đặt khối lượng nơi hậu nghiệm lớn; đo "gần hậu nghiệm" cần một thước đo khác nhau giữa hai phân phối." (L14-5-01 hiện 4 dòng) |
| 4 | trung bình | L14-5-09 | AGENTS §"Tập trung của mạch" (phát biểu và ví dụ tách vai): trang "Ví dụ: …" chứa công thức tổng quát (7.6). NT9: "Nhắc lại:" đứng sau công thức dùng nó | Thứ tự mặt trang: "Với $p_\theta(x\mid z)=\ldots$:" → (7.6) → "**Nhắc lại:** với $z$ cố định, $-\log p_\theta(x\mid z)$ bằng … như Mệnh đề 12.2" → "**Ví dụ 14.6.** …" | Tối thiểu: đưa dòng "Nhắc lại:" lên trước (7.6). Thêm một trong hai: đổi tiêu đề thành "Kỳ vọng tái tạo và lỗi bình phương" và giữ "**Ví dụ 14.6.**" làm nhãn khối ví dụ dưới công thức, hoặc ghi ngoại lệ "công thức + ví dụ" cho trang này trong storyboard kèm lý do (ghi chú đặt (7.6) ngay trước Ví dụ 14.6, dòng 924–928) |
| 5 | trung bình | L14-1-02 (hệ quả ở L14-6-01, L14-6-06) | NT11, NT9: "Tiên quyết và quy ước" bỏ mục "Mạng nơ-ron" của Kiến thức tiên quyết (Định nghĩa 06.4, Mệnh đề 06.12); mặt trang về sau dùng "mạng" và "Lan truyền ngược" mà không có "Nhắc lại:" ở trang nào trước đó | Ghi chú dòng 44: "**Mạng nơ-ron.** Định nghĩa 06.4 (mạng hai tầng) và Mệnh đề 06.12: lan truyền ngược tính đúng gradient …". L14-1-02 chỉ nhắc trong ghi chú diễn giả. L14-6-01: "Một mạng chung $x\mapsto(\mu_\phi(x),\sigma_\phi(x))$"; L14-6-06 bước 4: "Lan truyền ngược ($\varepsilon^{(i,r)}$ cố định)" | Thêm gạch đầu dòng vào L14-1-02: "Mạng nơ-ron (Định nghĩa 06.4); lan truyền ngược tính gradient theo mọi tham số của mạng (Mệnh đề 06.12)." Trang lên 6 dòng |
| 6 | nhẹ | L14-2-01, L14-2-02 | NT13 (phân rã của câu hỏi mạch): L14-2-01 đo bằng lỗi tái tạo, L14-2-02 chuyển sang phương sai của mã mà mặt trang không nói vì sao phương sai là tiêu chuẩn thay thế; quan hệ hai tiêu chuẩn chỉ hiện ở L14-2-05/06 (nửa sau mạch) và ở dòng dẫn | L14-2-01: "lỗi bình phương $0,0,1,1$, trung bình $1/2$"; L14-2-02: "**Trực quan.** Hình chiếu bỏ phần vuông góc; hướng trải rộng giữ nhiều độ dài bình phương hơn." Ghi chú dòng 139: "đo phần được giữ bằng phương sai của mã" | Sửa dòng trực quan L14-2-02: "**Trực quan.** Hình chiếu bỏ phần vuông góc; hướng trải rộng giữ nhiều độ dài bình phương hơn, nên phần giữ lại được đo bằng phương sai của mã." |
| 7 | nhẹ | L14-2-05 | AGENTS "Không trùng lặp … Gộp các trang kể lại cùng một phép tính": lỗi từng điểm của trục ngang tính lại nguyên văn | L14-2-01: "lỗi bình phương $0,0,1,1$, trung bình $1/2$"; L14-2-05: "mã $2,-2,0,0$; lỗi từng điểm $0,0,1,1$, trung bình $1/2$" | L14-2-05: "$\lambda_1=2$, $u=(1,0)^\top$; mã $2,-2,0,0$ trùng $f(x)=x_1$, nên lỗi trung bình $1/2$." Giữ dòng trục đứng (phép tính mới) |
| 8 | nhẹ | L14-4-01 | NT8, NT23: "Trực quan." chen giữa phép tính và "Diễn giải:" của ví dụ; ghi chú đặt trực giác hai bước sau khi nêu hai thành phần còn thiếu | Mặt trang: hai dòng tính → "**Trực quan.** Sinh hai bước …" → "**Diễn giải:** cần thêm …". Ghi chú dòng 488 (hai sai lệch, hai thành phần) rồi dòng 490 ("Về mặt ý tưởng, cơ chế sinh có hai bước") | Đặt dòng "Trực quan." sau "Diễn giải:", làm câu chuyển sang Định nghĩa 14.10 |
| 9 | nhẹ | L14-3-05, L14-4-01, L14-4-06 | AGENTS "Không trùng lặp": cùng lập luận "bộ giải mã đặt mọi điểm lên trục (đường) có diện tích $0$" xuất hiện ba lần; L14-4-01 chưa nêu phần mới của nó | L14-3-05: "Cả hai đặt xác suất $1$ lên trục ngang, diện tích $0$"; L14-4-01: "Mọi điểm sinh ra nằm trên trục ngang; không điểm nào giống $(0,\pm1)^\top$"; L14-4-06 câu 4: "$X$ nằm trên đường $x_1=x_2$" | Viết hai dòng tính của L14-4-01 thành hai sai lệch, mỗi sai lệch gắn một thành phần còn thiếu, như ghi chú dòng 488: "$\mathbb E[X_1^2]=1$, dữ liệu có $2$: phân phối của mã chưa khớp dữ liệu." và "$X_2\equiv0$, dữ liệu có $x_2=\pm1$: thiếu nhiễu quanh $g(z)$." Giữ L14-4-06 (bài tập kiểm tra) |
| 10 | nhẹ | L14-5-02 | NT9: dùng $\log t\le t-1$ (deck 11) trong "Trực quan." trước dòng "Nhắc lại:" ở trang sau | L14-5-02: "**Trực quan.** $\log t\le t-1$ làm mỗi điểm của tích phân thành số hạng không âm." L14-5-03: "**Nhắc lại:** $\psi(t)=t-1-\log t\ge0$ …" | L14-5-02: "**Nhắc lại:** $\log t\le t-1$ với $t>0$; bất đẳng thức này làm mỗi điểm của tích phân thành số hạng không âm." L14-5-03 giữ dòng $\psi$ làm ký hiệu cho chứng minh |
| 11 | nhẹ | L14-5-08 | NT13: câu nối từ bảng hai vai trò sang trang KL Gaussian chưa nói trang này tính số hạng nào của (7.2) | L14-5-07 hàng "Tính được: khi $q_\phi$, $p(z)$ đơn giản"; L14-5-08 dòng đầu: "**Trực quan.** Log-mật độ Gaussian bậc hai theo $z$: KL chỉ cần hai mômen của $q$." | "**Trực quan.** Với $q$, $p$ Gaussian, KL tới tiên nghiệm của (7.2) chỉ cần hai mômen của $q$, vì log-mật độ bậc hai theo $z$." |
| 12 | nhẹ | L14-6-01 | NT13 (câu nối gọi tên kết quả kế thừa): dòng mở đầu không nói cặp $(\mu_i,s_i)$ tham số hóa đối tượng nào | "Mỗi $x_i$ một cặp $(\mu_i,s_i)$: số biến tăng theo $n$." Ghi chú dòng 1116: "có riêng một cặp tham số $(\mu_i,s_i)$ cho hậu nghiệm xấp xỉ" | "Hậu nghiệm xấp xỉ $\mathcal N\big(\mu_i,\operatorname{diag}(s_i^2)\big)$ riêng cho mỗi $x_i$: số biến tăng theo $n$." |
| 13 | nhẹ | L14-6-05, L14-6-06 | NT2: Ví dụ 14.8 đặt trước Thuật toán 14.21, ngược thứ tự trong §8.1; storyboard không ghi lý do | Ghi chú: Thuật toán 14.21 dòng 1244, Ví dụ 14.8 dòng 1275. Deck: L14-6-05 Ví dụ 14.8, L14-6-06 Thuật toán 14.21 | Đổi chỗ theo ghi chú, hoặc giữ và ghi lý do trong storyboard (ví dụ kiểm (8.3) ngay sau chứng minh; Thuật toán 14.21 nối thẳng sang Nhận xét 14.22) |
| 14 | nhẹ | L14-7-03 | NT15: câu trả lời cho câu hỏi trung tâm không nêu cách "sinh dữ liệu mới", là vế thứ hai của câu hỏi | Gạch thứ ba: "Bộ tự mã hóa biến phân: mô hình sinh xác suất, học bằng cận dưới bằng chứng." Ghi chú §11, dòng về Bài 14: "Biến ẩn $Z$ cho cơ chế sinh $z\sim p(z)$, $x\sim p_\theta(x\mid z)$, còn Định lý 14.15 thay tích phân khó tính bằng một cận dưới tối ưu được." | "Bộ tự mã hóa biến phân: sinh $z\sim p(z)$, $x\sim p_\theta(x\mid z)$; học bằng cận dưới bằng chứng." (trang 69/80 âm tiết, thêm khoảng 2) |
| 15 | nhẹ | L14-7-04 | NT15 (Tổng kết không thêm khái niệm mới), NT9: thuật ngữ "PCA xác suất (probabilistic PCA, PPCA)" lần đầu lên mặt trang ở bài tập tổng hợp; trước đó chỉ có trong ghi chú diễn giả L14-4-05 | L14-7-04: "**Bài tập 14.5.** PCA xác suất (probabilistic PCA, PPCA), $1\le k<d$ …". Ghi chú dòng 586 gọi tên PCA xác suất trong khối Ví dụ 14.5 | Gọi tên trên mặt trang L14-4-05, ví dụ ở dòng kiểm tra hoặc Diễn giải: "$w^2=\lambda_1-\lambda_2$, $\tau^2=\lambda_2$: nghiệm hợp lý cực đại của PCA xác suất (probabilistic PCA) một chiều ẩn" (nếu trang vượt trần thì ghi ngoại lệ hoặc rút "Kiểm tra:"). Đề bài L14-7-04 giữ nguyên câu chữ |
| 16 | nhẹ | L14-7-07 | Liên tục với deck 12: bảng bài về nhà của deck 12 đánh dấu "(trên lớp)" cho các bài đã giải trên mặt trang; deck 14 giao lại 14.1, 14.2, 14.4, 14.5 (đều có "Lời giải:" trên mặt trang) mà không đánh dấu | Deck 12: "12.1 (câu 4 trên lớp)", "12.10 (trên lớp)". Deck 14: "14.1, 14.5, 14.8, 14.9", "14.2, 14.11", "14.3, 14.4" | Theo deck 12: "14.1 (trên lớp)", "14.5 (trên lớp)", "14.2 (câu 4–5 trên lớp)", "14.4 (trên lớp)". Điều phối viên chốt một quy ước cho deck 12–14 (deck 13 cũng chưa đánh dấu) |
| 17 | nhẹ | L14-7-08 | NT15 (dòng nối theo §11), liên tục với deck 13: dòng nối diễn đạt lại ghi chú, bỏ tham chiếu "như ở Bài 13", nên mạch ý deck 13 mở chỉ đóng ngầm; cụm "không quan sát đủ" lệch chữ ghi chú | "Bài toán quyết định tuần tự có trạng thái không quan sát đủ cần suy luận về biến ẩn." Ghi chú dòng 1482: "Khi quan sát không bộc lộ đầy đủ trạng thái của một bài toán quyết định tuần tự như ở Bài 13, cần suy luận về một biến không quan sát được." Deck 13: "Bài 14 xét mô hình có biến ẩn, như bit cũ của cảm biến." | "Khi quan sát không bộc lộ đầy đủ trạng thái của bài toán quyết định tuần tự như ở Bài 13, cần suy luận về biến ẩn." Giữ dòng thứ hai |
| 18 | nhẹ | storyboard | CLAUDE.md "Done means" (storyboard khớp deck): mã trang mạch 7, tiêu đề và hình đã đổi khi dựng deck chỉ ghi ở bảng lệch cuối tệp; các mục 5, 6, 7, 8, 9 còn mã và nội dung cũ | Storyboard mục 6 "Mạch 7. Tổng kết (12 phút, 8 trang)", L14-7-01 … L14-7-07; mục 5 "L14-7-02, L14-7-04" cho ví dụ xuyên suốt; mục 8 và mục trang L14-5-10 còn `elbo-gap.svg`; tiêu đề L14-3-06, L14-4-06, L14-5-11, L14-7-04/05 khác deck | Người sửa cập nhật tại chỗ các mục trang, mục 5, 7, 8, 9 theo deck cuối (mã L14-7-00 … L14-7-08, tiêu đề mới, bỏ `elbo-gap.svg`), giữ bảng lệch làm lịch sử |
| 19 | nhẹ | L14-7-01, L14-7-02 | NT16: "Kết quả và giả thiết: …" dùng dấu hai chấm như tiền tố chức năng, nhưng "Kết quả và giả thiết" không thuộc danh sách tiền tố | "Kết quả và giả thiết: nén dữ liệu", "Kết quả và giả thiết: mô hình sinh" | "Kết quả và giả thiết của bài toán nén", "Kết quả và giả thiết của mô hình sinh" |

Ghi nhận không thành phát hiện:

- Bài tập 14.1 tách hai trang ở mạch 3 và mạch 4 (Q13) và ví dụ đặt sau phát biểu (Q5) đã được cổng duyệt chấp nhận; câu hỏi mạch 3 có ở L14-3-01 và mỗi nửa bài tập đo đúng phần việc của mạch chứa nó.
- Ba trang lặp "hiệp phương sai mô hình bằng $S$" (L14-4-05 Diễn giải, L14-7-03 gạch thứ tư, L14-7-05 dòng kiểm tra) nằm ở ví dụ, câu trả lời tổng kết và lời giải bài tập lấy nguyên từ `exercises.md` ("Kiểm tra lại"); mỗi lần phục vụ một chức năng khác, không cần sửa.
- Câu hỏi tự kiểm tra L14-7-06 câu 3 trùng chủ đề Bài tập 14.4 nhưng là câu hỏi cuối buổi của ghi chú §11; giữ.
- Số trang 60 bằng trần NT27; lý do ghi trong bảng lệch của storyboard (tách bảng tổng kết). Đổi chỗ ở phát hiện 2 và 13 không đổi số trang.

## Đề xuất sửa ghi chú

Không có đề xuất mới. Đề xuất N4 của storyboard (Tình huống 14.2 và Bài tập 14.4 cùng cấu trúc) vẫn đúng: deck chỉ dùng Bài tập 14.4 trên mặt trang và đưa Tình huống 14.2 vào ghi chú diễn giả L14-6-09.

## Tóm tắt và kết luận

0 chặn bàn giao, 0 nghiêm trọng, 5 trung bình (1–5), 14 nhẹ (6–19). Cả bảy mạch có câu hỏi trên mặt trang trước nửa sau mạch; bốn mạch nội dung có dòng "Câu hỏi:" ngay ở trang nội dung đầu tiên, riêng mạch 4 cần thêm (phát hiện 1). Câu nối giữa các mạch có trên mặt trang ở các ranh giới 3→4, 4→5, 5→6, 6→7; ranh giới 2→3 bị Nhận xét 14.5 chen giữa (phát hiện 2). Trang "Nội dung", số mạch, liên kết `#/N`, bảng `Mục | Bài tập` và liên kết trình xem đúng.

**Kết luận: đạt khi sửa.**
