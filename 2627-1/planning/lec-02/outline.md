# Dàn ý Bài 02 — Khung bảy phần

Cập nhật ngày 2026-09-11 theo yêu cầu xóa toàn bộ trang chiếu hiện tại và tạo khung để cùng người dùng xây dựng từng phần.

## Cấu trúc hiện tại

1. Mô hình hóa và chứng nhận bài toán tối ưu lồi.
2. Quy hoạch tuyến tính.
3. Quy hoạch bậc hai: khớp dữ liệu và kiểm soát độ lớn của mô hình.
4. Quy hoạch hình học và phép đổi biến làm lộ tính lồi.
5. Tối ưu nón và quy hoạch nửa xác định: ràng buộc trên chuẩn và ma trận.
6. Xấp xỉ lồi và nới lỏng bài toán không lồi.
7. Tổng hợp: lựa chọn biểu diễn và đánh giá nghiệm.

Phần 1 hiện có bảy trang: cả bảy trang đã có nội dung. Phần 2 có 12 trang đã triển khai; các phần 3–7 mỗi phần có một trang tiêu đề. Tổng cộng 24 trang trong bảy section ngoài; đây không phải số trang cuối cùng.

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

- Giữ thứ tự bảy mạch và chuỗi chín bước cho mỗi ví dụ trong storyboard.
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
