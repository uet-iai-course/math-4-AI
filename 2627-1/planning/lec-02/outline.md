# Dàn ý Bài 02 — Khung bảy phần

Cập nhật ngày 2026-09-11 theo yêu cầu xóa toàn bộ trang chiếu hiện tại và tạo khung để cùng người dùng xây dựng từng phần.

## Cấu trúc hiện tại

1. Mô hình hóa và chứng nhận bài toán tối ưu lồi.
2. Quy hoạch tuyến tính: phân bổ nguồn lực và kiểm soát sai số.
3. Quy hoạch bậc hai: khớp dữ liệu và kiểm soát độ lớn của mô hình.
4. Quy hoạch hình học và phép đổi biến làm lộ tính lồi.
5. Tối ưu nón và quy hoạch nửa xác định: ràng buộc trên chuẩn và ma trận.
6. Xấp xỉ lồi và nới lỏng bài toán không lồi.
7. Tổng hợp: lựa chọn biểu diễn và đánh giá nghiệm.

Phần 1 hiện có bảy trang: cả bảy trang đã có nội dung. Các phần 2–7 mỗi phần có một trang tiêu đề. Tổng cộng 13 trang trong bảy section ngoài; đây không phải số trang cuối cùng.

## Phần 1 hiện tại

1. Bài 02: Các bài toán tối ưu lồi — thông tin học phần, Viện Trí tuệ nhân tạo, năm học và học kỳ.
2. Nội dung chính — liệt kê các chủ đề đã chốt.
3. Bài toán tối ưu lồi tổng quát — mục tiêu lồi và tập khả thi lồi.
4. Dạng toán học của bài toán tối ưu lồi — miền chung lồi, mục tiêu và các hàm bất đẳng thức lồi, đẳng thức affine.
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
