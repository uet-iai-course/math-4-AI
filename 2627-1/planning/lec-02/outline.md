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

Phần 1 hiện có tám trang chỉ tiêu đề; các phần 2–7 mỗi phần có một trang tiêu đề. Tệp trình chiếu giữ bảy `<section>` ngoài và hiện có tổng cộng 14 trang khung; đây không phải số trang cuối cùng. Nội dung, ví dụ, công thức và ghi chú diễn giả sẽ được soạn lần lượt cùng người dùng theo [storyboard.md](storyboard.md).

## Khung phần 1

1. Bài 02: Các bài toán tối ưu lồi.
2. Nội dung chính: bảy mạch.
3. Bài toán tối ưu tổng quát.
4. Dạng toán học của bài toán tối ưu.
5. Điều kiện để bài toán tối ưu là lồi.
6. Ví dụ: hàm bậc hai.
7. Ví dụ: hàm giá trị tuyệt đối.
8. Ví dụ: hàm nghịch đảo.

Nguồn dự kiến: Boyd và Vandenberghe (2004), *Convex Optimization*, §3.1.3, §3.1.5, §4.1.1–4.1.2 và §4.2. Hàm nghịch đảo lấy từ Ví dụ 4.1; hai hàm còn lại dùng các ví dụ cơ bản trong chương 3. Chưa chèn công thức, dữ liệu số hay lời giải. CSS riêng Bài 02 tham khảo các bài trong `../rl-plan/2627-1/`.

## Quy ước triển khai tiếp

- Giữ thứ tự bảy mạch và chuỗi chín bước cho mỗi ví dụ trong storyboard.
- Thêm các trang nội dung vào section ngoài tương ứng khi xây dựng từng mạch.
- Tựa lồi, nhiều mục tiêu, dữ liệu ví dụ và số trang chi tiết còn chờ chốt.
- Ghi chú bài giảng và bài tập của bản cũ được giữ để tham khảo nhưng tạm ngừng liên kết trên chỉ mục trong thời gian đồng bộ lại.
- Bản trình chiếu trước khi xóa nội dung truy xuất tại commit `774112d`.
