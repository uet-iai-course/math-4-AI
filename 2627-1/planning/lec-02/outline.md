# Dàn ý Bài 02 — Khung sáu phần

Cập nhật ngày 2026-09-11 theo yêu cầu xóa toàn bộ trang chiếu hiện tại và tạo khung để cùng người dùng xây dựng từng phần.

## Cấu trúc hiện tại

1. Mô hình hóa và chứng nhận bài toán tối ưu lồi.
2. Quy hoạch tuyến tính.
3. Quy hoạch bậc hai.
4. Quy hoạch hình học.
5. Xấp xỉ lồi và nới lỏng bài toán không lồi.
6. Tổng hợp: lựa chọn biểu diễn và đánh giá nghiệm.

Phần 1 có 7 trang; phần 2 có 12; phần 3 có 14; phần 4 có 16; phần 5 có 15 trang đã triển khai. Phần 6 còn một trang tiêu đề. Toàn bài có 65 trang trong sáu section ngoài; chưa chốt số trang cuối cùng.

## Phần 1 hiện tại

1. Bài 02: Các bài toán tối ưu lồi — thông tin học phần, Viện Trí tuệ nhân tạo, năm học và học kỳ.
2. Nội dung chính — liệt kê các chủ đề đã chốt.
3. Bài toán tối ưu lồi tổng quát — mục tiêu lồi và tập khả thi lồi.
4. Dạng phổ biến của tối ưu lồi — biến $x\in\mathbb{R}^n$, mục tiêu và các hàm bất đẳng thức lồi, đẳng thức affine.
5. Ví dụ: hàm bậc hai — tối thiểu hóa $(x-2)^2$ trên $[0,1]$, nghiệm ở biên.
6. Ví dụ: hàm giá trị tuyệt đối — tối thiểu hóa $|x-2|$ trên $\mathbb{R}$, nghiệm tại điểm không khả vi.
7. Ví dụ: hàm nghịch đảo — tối thiểu hóa $1/x$ trên $(0,+\infty)$, cận dưới không đạt được.

Trang điều kiện riêng được bỏ theo yêu cầu người dùng vì nội dung đã nằm ở trang dạng toán học. Nguồn đã dùng: Boyd và Vandenberghe (2004), *Convex Optimization*, §4.2, trang 136–138. Nguồn cho các ví dụ: §3.1.3, §3.1.5 và Ví dụ 4.1, trang 128. Ba ví dụ có công thức, đồ thị SVG tự vẽ, chứng nhận tính lồi và kết luận về nghiệm; chứng minh chi tiết và biến thể kiểm tra hiểu nằm trong ghi chú diễn giả. CSS riêng Bài 02 tham khảo các bài trong `../rl-plan/2627-1/`.

## Quy ước triển khai tiếp

- Giữ thứ tự sáu mạch hiện tại và chuỗi chín bước cho mỗi ví dụ trong storyboard.
- Thêm các trang nội dung vào section ngoài tương ứng khi xây dựng từng mạch.
- Tựa lồi, nhiều mục tiêu, dữ liệu ví dụ và số trang chi tiết còn chờ chốt.
- Ghi chú bài giảng và bài tập của bản cũ được giữ để tham khảo nhưng tạm ngừng liên kết trên chỉ mục trong thời gian đồng bộ lại.
- Bản trình chiếu trước khi xóa nội dung truy xuất tại commit `774112d`.

## Phần 2 đã triển khai

1. Quy hoạch tuyến tính.
2. Pha trộn cho một vườn ươm — câu chuyện, nhu cầu dinh dưỡng, lựa chọn nguyên liệu.
3. Mô hình pha trộn — dữ liệu, biến, chi phí và ràng buộc.
4. Dạng phổ biến của quy hoạch tuyến tính — nhận dạng và chứng nhận tính lồi.
5. Dạng chuẩn của quy hoạch tuyến tính — đẳng thức, biến không âm và cách chuyển từ bài toán tổng quát.
6. Nghiệm của bài toán pha trộn — hình học, nghiệm (1,2), chi phí 70 nghìn đồng.
7. Hồi quy với sai số tuyệt đối — năm điểm dữ liệu và mô hình tuyến tính.
8. Biến phụ cho giá trị tuyệt đối — một cận trên cho mỗi phần dư.
9. Tính tương đương của phép cải dạng — hai chiều, giá trị tối ưu, khôi phục nghiệm.
10. Nghiệm hồi quy với sai số tuyệt đối — đường dự đoán y=u, tổng sai số 3.
11. Hồi quy với sai số lớn nhất — đường dự đoán y=u+1,5, sai số lớn nhất 1,5.
12. Nhận dạng quy hoạch tuyến tính — ba biến thể kiểm tra và chuyển sang quy hoạch bậc hai.

Giữ kế hoạch 10 trang đã duyệt, bổ sung trang chuẩn tắc theo yêu cầu và tách câu chuyện khỏi mô hình theo yêu cầu mô tả bối cảnh. Các mã cũ giữ nguyên; hai mã mới là S02-01b và S02-03b. Không bổ sung thời lượng. Nguồn và quyết định từng trang ở [storyboard.md](storyboard.md).

## Phần 3 đã triển khai — Quy hoạch bậc hai

Phần này có 14 trang, bổ sung chính quy hóa cho cả hai tiêu chí sai số theo yêu cầu. Mô hình chuẩn một có biến phụ dùng lại kết quả của phần 2; không tạo một phần riêng chỉ để lặp kỹ thuật. Toàn bài hiện có 65 trang trong sáu phần.

1. Quy hoạch bậc hai — Định danh lớp bài toán; nhận câu hỏi đổi tiêu chí từ phần 2.
2. Hồi quy với tổng bình phương sai số — Thiết lập nhu cầu dự đoán và hai ứng viên trước khi khai triển mục tiêu.
3. Dạng bậc hai của bình phương sai số — Chỉ ra cấu trúc bậc hai và chứng nhận Hessian; phân biệt viết lại với thay mục tiêu.
4. Dạng phổ biến của quy hoạch bậc hai — Khái quát nhận dạng QP: mục tiêu bậc hai lồi, ràng buộc affine.
5. Nghiệm hồi quy bình phương tối thiểu — Đọc nghiệm thành đường dự đoán; hình đồng mức làm rõ tác động của ràng buộc.
6. Chính quy hóa trong hồi quy — Thiết lập nhu cầu kiểm soát hệ số và phân biệt hai tiêu chí sai số với hai hình phạt.
7. Sai số tuyệt đối và chính quy hóa chuẩn một — Dùng lại biến phụ của phần 2 cho cả sai số và hệ số; nhận dạng LP.
8. Sai số tuyệt đối và chính quy hóa bậc hai — Thay hình phạt bằng bình phương chuẩn hai; nhận ra QP dù sai số chưa trơn.
9. Bình phương sai số và chính quy hóa chuẩn một — Giữ sai số bậc hai, cải dạng hình phạt chuẩn một; phân biệt QP với hàm trơn.
10. Bình phương sai số và chính quy hóa bậc hai — Khai triển chính quy hóa bậc hai; chỉ rõ điều kiện đủ cho nghiệm duy nhất theo w.
11. Nghiệm hồi quy có chính quy hóa — Đối chiếu bốn đường dự đoán, hệ số và tham số; đánh giá theo từng mục tiêu gốc.
12. Hồi quy với giới hạn độ lớn hệ số — Thay chi phí mềm bằng mức trần cứng; chứng nhận miền hình tròn và nghiệm trên biên.
13. Quy hoạch bậc hai với ràng buộc bậc hai — Khái quát QCQP từ ràng buộc chuẩn; chứng nhận cả mục tiêu và các bất đẳng thức.
14. Nhận dạng và chứng nhận bài toán bậc hai — Kiểm tra chuyển giao khi thêm ràng buộc, đổi chiều bất đẳng thức hoặc đặt hệ số phạt bằng 0.

Cả bốn mô hình dùng cùng dữ liệu và phạt toàn bộ hệ số để minh họa. Chính quy hóa chuẩn một khác chính quy hóa bằng bình phương chuẩn hai. Nguồn, chứng nhận hai chiều, giới hạn và ánh xạ từng ví dụ nằm trong [storyboard.md](storyboard.md). Phần 5 được triển khai ở mục dưới; phần 6 còn khung tiêu đề. Không phân bổ thời lượng mới.


## Phần 4 đã triển khai — Quy hoạch hình học

Đã triển khai 16 trang, gồm tiêu đề và 15 trang nội dung. Giữ nhu cầu hộp có thể tích cho trước, dùng ít vật liệu nhất; thêm bài phân bổ công suất cho hai đường truyền. Tách phép đổi biến, mô hình lồi và nghiệm để sinh viên kiểm tra từng bước.

1. Quy hoạch hình học.
2. Hộp đựng và chi phí vật liệu.
3. Mô hình thiết kế hộp.
4. Đơn thức và tổng đơn thức dương.
5. Dạng chuẩn của quy hoạch hình học.
6. Cải dạng về quy hoạch hình học.
7. Phép đổi biến logarit.
8. Dạng lồi của quy hoạch hình học.
9. Cải dạng bài toán thiết kế hộp.
10. Kích thước hộp tối ưu.
11. Phân bổ công suất cho hai đường truyền.
12. Mô hình chất lượng đường truyền.
13. Cải dạng bài phân bổ công suất.
14. Dạng lồi của bài phân bổ công suất.
15. Nghiệm phân bổ công suất.
16. Nhận dạng và giới hạn cải dạng.

Dạng tổng quát có vế phải đơn thức được chuẩn hóa bằng phép chia; tối đa hóa đơn thức chuyển thành tối thiểu hóa nghịch đảo. Đổi biến logarit sau đó tạo mô hình lồi tương đương. Phải phân biệt ba bước này, chứng nhận tính lồi và khôi phục đại lượng ban đầu. Nguồn chính: Boyd–Vandenberghe, §4.5; bối cảnh công suất phỏng theo Bài tập 4.20, còn dữ liệu và cải dạng GP tự xây dựng. Không phân bổ thời lượng mới.


## Phần 5 đã triển khai — Xấp xỉ lồi và nới lỏng bài toán không lồi

Theo yêu cầu mới, bỏ phần Tối ưu nón; chuyển xấp xỉ/nới lỏng thành phần 5 và tổng hợp thành phần 6. Giữ hai ví dụ AI: chọn ngưỡng phân loại ảnh và chọn mua các gói ảnh đã gán nhãn. Đi từ nhu cầu đến mô hình và phép biến đổi, sau đó mới khái quát ba quan hệ với bài toán gốc.

1. Xấp xỉ lồi và nới lỏng bài toán không lồi.
2. Phân loại bằng ngưỡng.
3. Mô hình giảm số lỗi phân loại.
4. Hàm mất mát bản lề.
5. Cải dạng hàm bản lề thành LP.
6. Nghiệm của hàm thay thế.
7. Phân loại nhiều đặc trưng.
8. Chọn các gói dữ liệu.
9. Mô hình chọn gói dữ liệu.
10. Nới lỏng điều kiện nhị phân.
11. Nghiệm phân số của bài nới lỏng.
12. Khôi phục phương án mua.
13. Cận dưới và chứng nhận nghiệm.
14. Phân biệt ba cách xử lý.
15. Đánh giá nghiệm theo bài toán gốc.

Tiêu chí hoàn thành: phân biệt thay mục tiêu với cải dạng tương đương; chứng nhận tính lồi; chứng minh cận dưới từ tối ưu LP; kiểm tra và diễn giải phương án nguyên. LLO3/CLO1 buổi 2 được hỗ trợ qua năng lực mô hình hóa, nhận dạng và đánh giá nghiệm. Không gán mục đề cương hoặc thời lượng riêng cho ví dụ bổ sung. Nguồn: Boyd–Vandenberghe (2004), §8.6.1 và Bài tập 4.15; dữ liệu và bốn hình SVG tự xây dựng.
