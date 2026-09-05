# Dàn ý Bài 01: Giới thiệu tối ưu, tập lồi và hàm lồi

## Trạng thái

Đây là skeleton ngày 2026-09-05. Bộ trang chiếu mới đã có mạch kể chuyện, mã trang, công thức dẫn nhập và ghi chú định hướng; ví dụ số, hình, chứng minh, câu hỏi kiểm tra và bài tập chi tiết sẽ được bổ sung ở vòng sau.

## Phạm vi theo đề cương

- Buổi 1 của học phần UET.AI2012: giới thiệu tối ưu, tập lồi và hàm lồi.
- Hình thức toàn học phần: 15 buổi; mỗi buổi gồm 2 tiết lý thuyết và 1 tiết bài tập.
- LLO1: hiểu các khái niệm cơ bản về tối ưu toán học, tối ưu lồi và ứng dụng.
- LLO2: trình bày khái niệm, tính chất của tập lồi, hàm lồi và áp dụng trong bài toán tối ưu.
- LLO1 và LLO2 cùng liên quan CLO1.

## Vấn đề trung tâm

Từ một nhu cầu cụ thể, xây dựng mô hình và xác định điều kiện để nghiệm tìm được có giá trị toàn cục.

## Sáu mạch và 23 trang lá

1. **Mở đầu — M01–M03:** mục tiêu, vấn đề trung tâm và ba nhu cầu tối ưu.
2. **Ba ca ứng dụng — U01–U04:** điều khiển một bước, hồi quy tuyến tính, hồi quy logistic.
3. **Khuôn bài toán — T01–T04:** trừu tượng hóa, ánh xạ ba ca, cực tiểu địa phương/toàn cục và nhu cầu cấu trúc lồi.
4. **Tập lồi — F01–F05:** trực giác, định nghĩa, tập chuẩn, phép bảo toàn và chứng nhận miền của ba ca.
5. **Hàm lồi — H01–H05:** trực giác, định nghĩa, hai viên gạch mất mát, điều kiện kiểm tra và phép bảo toàn.
6. **Kết luận — K01–K02:** chứng nhận lại ba ca, tổng kết và bài tập chuyển giao.

## Nguồn chính

- Đề cương học phần UET.AI2012.
- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Chương 1–3.
- MIT OpenCourseWare, 6.079 *Introduction to Convex Optimization*, Bài giảng 1 → 2 → 3.

## Sai khác có chủ ý so với bản cũ

- Đưa ba ca ứng dụng lên trước định nghĩa tập lồi và hàm lồi.
- Thêm ca điều khiển một bước làm nhu cầu dẫn nhập.
- Đưa hồi quy tuyến tính và hồi quy logistic vào cùng tuyến học tập; chưa kết luận lồi trước khi có công cụ.
- Bỏ ca độ sáng khỏi mặt trang chiếu; có thể dùng lại trong tài liệu học tập như bài luyện bổ sung.
- Nén 53 trang lá của bản cũ xuống 23 trang skeleton. Không giữ trang chỉ vì có trong mẫu.
- Giữ thứ tự sử dụng nguồn MIT lec01 → lec02 → lec03, nhưng thay đổi thứ tự trình bày để tuân theo chỉ dẫn ứng dụng trước lý thuyết của người dùng.

## Nội dung cần bổ sung sau

- Ví dụ số tính được cho cả ba ca.
- Hình SVG tự vẽ cho điều khiển, dữ liệu hồi quy, tập lồi và dây cung của hàm lồi.
- Chứng minh ngắn và giả thiết đầy đủ cho các kết luận.
- Câu hỏi kiểm tra sau từng cụm; bộ bài tập nhận biết, tính toán hoặc chứng minh và vận dụng AI.
- Đồng bộ ghi chú bài giảng và tạo `materials/lec-01/exercises.md` sau khi nội dung trang chiếu ổn định.
