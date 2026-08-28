# Kế hoạch Bài giảng 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

## 1. Mục tiêu, phạm vi và đối tượng

- **Đối tượng:** sinh viên học phần UET.AI2012 đã hoàn thành Bài 01–03; tiên quyết gồm giải tích nhiều biến, đại số tuyến tính, hàm lồi, gradient, Hessian, đối ngẫu và KKT.
- **Thời lượng:** đúng 2 tiết lý thuyết (LT) + 1 tiết bài tập (BT), không quy đổi sang phút. LT1 dành cho phương pháp giảm, tìm kiếm đường và gradient/giảm dốc nhất; LT2 dành cho Newton, hàm tự điều chỉnh và Newton với ràng buộc đẳng thức. BT dùng các bài tính xuyên cụm trong cùng một tuyến trình chiếu.
- **Phạm vi:** dạng bài toán không ràng buộc; phương pháp gradient descent, steepest descent, Newton; tìm kiếm đường quay lui; độ giảm Newton; hàm tự điều chỉnh; khử đẳng thức; Newton khả thi và Newton khởi đầu không khả thi. Không mở rộng sang phương pháp điểm trong, bất đẳng thức tổng quát hoặc tối ưu ngẫu nhiên.
- **LLO/CLO:** LLO6–7 và LLO9 đóng góp CLO1; LLO8 và LLO10 đóng góp CLO2, đúng đề cương.

Mục tiêu quan sát được:

1. Chọn và thực hiện đúng hướng, bước, cập nhật và tiêu chuẩn dừng của gradient descent, steepest descent và Newton.
2. Giải thích vai trò của điều kiện hóa, tìm kiếm đường, độ giảm Newton và hai pha hội tụ.
3. Nhận dạng và kiểm tra một hàm tự điều chỉnh trong phạm vi ví dụ được chuẩn bị.
4. Lập và giải hệ Newton–KKT cho bài toán $\min f(x)$ với $Ax=b$, ở cả khởi đầu khả thi và không khả thi.

## 2. Căn cứ nguồn

| Nguồn | Vai trò |
|---|---|
| Đề cương UET.AI2012 chính thức | thẩm quyền về Buổi 4, LLO6–10, CLO1–2 và 2 LT + 1 BT |
| `sources/part1.docx` | xác nhận Tuần 4 thuộc lõi tối ưu nghiêm ngặt; yêu cầu nêu giả thiết và bảo đảm |
| `2627-1/planning/lectures-02-07-plan.md`, §6 | khung mục tiêu, ba cụm nội dung và khoảng trống đã duyệt |
| `sources/bv_cvxbook.pdf`, Chương 9–10 | nguồn chuẩn cho thuật toán, hội tụ và ràng buộc đẳng thức |
| `sources/Chương 5.pdf`, `sources/Chương 5phần 1.pdf` | nguồn tiếng Việt; bản đầy đủ và bản rút gọn phải được đối chiếu, không tính như hai nguồn độc lập |
| `sources/lecture16-unconstrained -opt.pdf` | mẫu MIT cho tối ưu không ràng buộc; hai tệp `b9e5d...lec16*.pdf` có cùng SHA-256 và không dùng độc lập |
| `sources/4c428302acfe82bee62cf037829a8abd_MIT6_079F09_lec17.pdf` | mẫu MIT cho tối ưu ràng buộc đẳng thức |
| Hai PDF `Chương 6 Tối ưu với các ràng buộc đẳng thức...` | nguồn bổ sung; OCR yếu nên không làm nguồn thẩm quyền công thức |

Trước khi dùng MIT Lecture 16–17, tác tử nguồn phải xác minh URL, giấy phép và cập nhật `sources/MIT/README.md`; chưa cần tải thêm nguồn khi chưa xác định khoảng trống cụ thể.

## 3. Tệp đầu ra và tiêu chí hoàn thành

Đầu ra dự kiến:

- `2627-1/lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html`;
- `2627-1/planning/lec-04/outline.md`, `storyboard.md`, `review-log.md`;
- SVG cần thiết tại `2627-1/img/lec-04/`;
- dự án Codex Slides bền vững đồng bộ với RevealJS.

Chỉ coi bài hoàn thành khi: LLO6–10 đều có minh chứng; đúng 7 section ngoài; mọi khái niệm trọng tâm hoàn tất hành trình sáu bước; thuật toán nêu đủ đầu vào, hướng, tìm bước, cập nhật, dừng và bảo đảm; ví dụ được tính lại; có đủ cổng storyboard và năm báo cáo độc lập; HTML/KaTeX/notes/tài sản/đường dẫn đạt; 40 trang hay số trang khác chỉ được chốt sau storyboard; kiểm tra đủ 16:9 và màn hình hẹp; Codex Slides và RevealJS đồng bộ; index, commit và push chỉ thực hiện sau kiểm định cuối.

## 4. Bảy mạch nội dung

| Mạch | Chức năng | Đầu vào | Đầu ra |
|---|---|---|---|
| P. Mở đầu | đặt vấn đề chuyển từ điều kiện tối ưu sang thuật toán thực thi | Bài 01–03 | câu hỏi trung tâm và tiêu chí đánh giá |
| A. Phương pháp giảm và tìm kiếm đường | tạo khuôn hướng–bước–cập nhật–dừng | gradient và miền mở | quy trình giảm có backtracking |
| B. Gradient và giảm dốc nhất | nối chuẩn, điều kiện hóa và tốc độ tiến | khuôn A | chọn được hướng theo chuẩn và nhận biết hội tụ chậm |
| C. Newton không ràng buộc | dùng xấp xỉ bậc hai và độ giảm Newton | Hessian, backtracking | thuật toán Newton đầy đủ và hai pha hội tụ |
| D. Hàm tự điều chỉnh | giải thích bảo đảm bất biến affine cho lớp hàm thích hợp | Newton decrement | nhận dạng giả thiết và giới hạn của phân tích tự điều chỉnh |
| E. Newton với đẳng thức | giữ hoặc phục hồi $Ax=b$ bằng hệ Newton–KKT | KKT Bài 03 và Newton C | giải được chế độ khả thi và không khả thi |
| Z. Kết luận và chuyển giao | thu hồi tuyến hướng → bước → chứng nhận → phần dư | sản phẩm A–E | bài tích hợp và cầu nối sang tối ưu học sâu |

## 5. Danh mục khái niệm và bản đồ sáu bước

| Cụm trọng tâm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập |
|---|---|---|---|---|---|---|
| Phương pháp giảm, backtracking, gradient/steepest | điều kiện $\nabla f=0$ chưa tạo dãy lặp | đường mức, hướng giảm và co bước | bậc hai điều kiện kém | $\nabla f(x)^T\Delta x<0$; Armijo; hướng theo chuẩn; tiêu chuẩn dừng | tối ưu hàm mất mát trơn | chạy hai vòng, ghi số lần co bước và so sánh chuẩn |
| Newton và độ giảm Newton | gradient chậm khi độ cong khác nhau | cực tiểu của xấp xỉ bậc hai | dùng lại bậc hai và một hàm không bậc hai | hệ Hessian, $\lambda(x)$, backtracking, pha tắt dần và pha bậc hai | bước bậc hai cho mô hình trơn | tính bước, decrement và quyết định dừng |
| Hàm tự điều chỉnh | phân tích cổ điển phụ thuộc hằng số khó biết | độ cong bậc ba được khống chế bởi độ cong bậc hai | $-\log x$ hoặc hàm chắn log | định nghĩa một chiều và theo mọi đường thẳng; tính bất biến affine; bảo đảm có điều kiện | chuẩn bị cho hàm chắn và điểm trong | kiểm tra bất đẳng thức đạo hàm bậc ba, nêu đúng giới hạn |
| Newton với $Ax=b$ | bước Newton thường có thể phá khả thi | bước nằm trong không gian rỗng; phần dư gốc–đối ngẫu | bình phương tối thiểu có ràng buộc tuyến tính | khử đẳng thức; hệ Newton–KKT; residual; tìm bước và dừng cho hai chế độ | ước lượng/hồi quy có ràng buộc bảo toàn | lập hệ, tính một bước khả thi và một bước phục hồi khả thi |

Ký hiệu và dữ kiện của mỗi ví dụ phải được truyền nguyên vẹn từ trực quan sang công thức, ứng dụng và bài tập. Không để bài tập dùng phân rã ma trận, giả thiết hội tụ hoặc tiêu chuẩn dừng chưa được giới thiệu.

## 6. Phụ thuộc và phân vai

Trình tự bắt buộc:

1. **Điều phối:** xác nhận tên tệp, LLO6–10, 7 mạch và mở dự án Codex Slides.
2. **Phân tích nguồn/mẫu:** ánh xạ Chương 9–10 với MIT Lecture 16–17 và nguồn tiếng Việt; khóa giả thiết, ký hiệu, ví dụ; cập nhật danh mục MIT nếu dùng.
3. **Ví dụ–toán học** và **hình hóa** có thể chạy song song sau đặc tả nguồn: tự tính ví dụ, kiểm chứng hội tụ; thiết kế đồ thị đường mức/quỹ đạo/phần dư.
4. **Soạn–triển khai:** tạo tuần tự outline, storyboard, review-log, RevealJS, notes và SVG.
5. **Kiểm định storyboard:** rà từng trang và bốn hành trình sáu bước trước các review khác.
6. **Năm review độc lập:** sinh viên, chuyên gia, toán học, học thuật–giảng dạy, mạch kể chuyện; chỉ đọc.
7. **Chỉnh sửa:** một tác tử riêng hợp nhất báo cáo và sửa tuần tự; thay đổi toán hoặc mạch phải được rà lại đúng vai.
8. **Kiểm định cuối/công bố:** HTML, KaTeX, đường dẫn, notes, Chromium rộng+hẹp, Codex Slides; sau đó mới index, commit riêng và push.

## 7. Rủi ro chính

| Rủi ro | Mức | Kiểm soát |
|---|---|---|
| nhầm gradient descent với steepest descent theo chuẩn tổng quát | nghiêm trọng | định nghĩa chuẩn và chuẩn đối ngẫu trước công thức; dùng cùng ví dụ so sánh |
| thiếu giả thiết khi phát biểu hội tụ hoặc Newton bậc hai | chặn bàn giao | ghi rõ lồi mạnh, Hessian Lipschitz/khả nghịch và miền mức; review toán độc lập |
| biến tự điều chỉnh thành phần chứng minh quá dài | nghiêm trọng | giữ định nghĩa, trực giác, một kiểm tra và vai trò; chuyển đại số dài khỏi mặt slide |
| hệ Newton–KKT sai dấu/kích thước hoặc lẫn hai chế độ khởi đầu | chặn bàn giao | khóa kiểu $A\in\mathbb R^{p\times n}$, $\operatorname{rank}A=p$; tự giải ví dụ cả hai chế độ |
| quá tải 2 LT + 1 BT | nghiêm trọng | một ví dụ xuyên cụm, bài tập đóng cụm; số trang chỉ chốt sau storyboard |
| nguồn MIT trùng hoặc chưa có danh mục | trung bình | dùng một bản Lecture 16; xác minh và cập nhật `sources/MIT/README.md` trước khi sử dụng |
| nguồn Chương 6 OCR yếu hoặc hình có quyền chưa rõ | nghiêm trọng | dùng Boyd/MIT làm thẩm quyền; tự vẽ SVG và ghi nguồn |
| công thức ma trận và giả mã tràn khung | nghiêm trọng | tách suy diễn, không hạ thân bài dưới ngưỡng; kiểm tra 16:9 và màn hình hẹp |
