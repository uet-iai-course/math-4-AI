# Storyboard Bài 02 — Các bài toán tối ưu lồi

Phiên bản làm lại ngày 2026-09-11; bảy mạch đã được người dùng thống nhất.

## Trạng thái và mục tiêu

- Phạm vi hiện tại: cấu trúc nội dung. Chưa chốt số trang, mã trang, ví dụ số, phân bổ thời lượng, vị trí của tựa lồi và nhiều mục tiêu.
- Cấu trúc 58 trang (39 chính + 19 phụ lục) của lần sửa trước không còn là ràng buộc.
- Bản storyboard cũ lưu trong lịch sử Git tại commit e030846; không tạo bản sao, không di chuyển tệp cũ.
- Mục tiêu bài học: sinh viên hiểu rõ các dạng bài toán tối ưu lồi; nhận biết bài toán thực tế có thể chuyển về dạng lồi hoặc xấp xỉ bằng dạng lồi; chứng minh một bài toán tối ưu là lồi. Ưu tiên ví dụ trong trí tuệ nhân tạo và học máy (AI/ML) hoặc bài toán quen thuộc.
- Ba trường hợp xuyên suốt: mô hình đã lồi; cải dạng tương đương thành lồi; thay bằng bài toán lồi gần đúng. Không đồng nhất cải dạng với thay đổi yêu cầu hay xấp xỉ.

## Quy trình chín bước cho mỗi ví dụ

1. Tình huống thực tế: cần quyết định gì, vì sao cần tối ưu?
2. Mô hình ban đầu: xác định dữ liệu, biến, miền, mục tiêu, ràng buộc và đầu ra.
3. Cách tiếp cận trực tiếp: nêu phương án trực giác hoặc mô hình đơn giản, cùng hạn chế nếu có.
4. Ý tưởng nhận dạng hoặc cải dạng: tìm dấu hiệu cấu trúc gợi ý lớp bài toán phù hợp.
5. Phép biến đổi chi tiết: viết các bước thiết yếu, biến phụ, đổi biến và điều kiện áp dụng.
6. Chứng nhận: giải thích tính lồi, quan hệ với mô hình gốc và cách khôi phục nghiệm.
7. Ví dụ số và hình học: kiểm tra bằng dữ liệu nhỏ, trực quan hóa và diễn giải nghiệm.
8. Khái quát hóa: rút ra dạng chuẩn, dấu hiệu nhận dạng và giới hạn áp dụng.
9. Biến thể kiểm tra hiểu: thay một giả thiết hoặc yêu cầu; kiểm tra mô hình còn lồi hoặc còn cải dạng được không.

Chuỗi này áp dụng bên trong mỗi ví dụ, không phải chín phần của bài và không mặc định là chín trang. Thứ tự chín bước theo yêu cầu cụ thể của người dùng được ưu tiên so với chu trình sáu bước trong quy ước chung. Nếu không cần cải dạng, bước 5 ghi rõ lý do.

## Bảy mạch nội dung đã thống nhất

### Mạch 1 — Mô hình hóa và chứng nhận bài toán tối ưu lồi

- Ví dụ: dự đoán giá nhà từ dữ liệu. Xác định hệ số cần chọn, tiêu chí dự đoán tốt, dữ liệu, biến, miền, mục tiêu, ràng buộc, đầu ra trước dạng tổng quát.
- Nội dung: từ ví dụ, xây dựng chứng nhận — miền xác định lồi, mục tiêu lồi, bất đẳng thức hàm lồi không vượt quá 0, đẳng thức affine. Phân biệt chứng minh tính lồi với tìm nghiệm.
- Đầu vào: kiến thức tập/hàm lồi của Bài 01.
- Đầu ra: mô hình rõ nghĩa và khung chứng nhận để dùng ở các mạch tiếp theo.

### Mạch 2 — Quy hoạch tuyến tính: phân bổ nguồn lực và kiểm soát sai số

- Ví dụ: phân bổ ngân sách hoặc nguồn lực liên tục để hình thành quy hoạch tuyến tính (LP), rồi quay lại dự đoán với tổng sai số tuyệt đối hoặc sai số lớn nhất.
- Nội dung: biến phụ đưa trị tuyệt đối/cực đại về ràng buộc tuyến tính; giải thích tương đương và đọc nghiệm. Biến thể: số máy/sản phẩm phải nguyên.
- Đầu vào: mô hình và khung chứng nhận.
- Đầu ra: dạng LP, cải dạng bằng biến phụ và giới hạn của giả thiết biến liên tục.

### Mạch 3 — Quy hoạch bậc hai: khớp dữ liệu và kiểm soát độ lớn của mô hình

- Ví dụ: hồi quy tuyến tính, bổ sung hạn chế độ lớn hệ số; hình thành quy hoạch bậc hai (QP) và quy hoạch bậc hai với ràng buộc bậc hai (QCQP).
- Nội dung: chứng minh dạng bậc hai lồi qua ma trận nửa xác định dương; phân biệt hình phạt ở mục tiêu với giới hạn cứng. Hình đường đồng mức/miền khả thi giải thích nghiệm. Không mặc định hai cách cho cùng nghiệm nếu chưa xác định quan hệ tham số.
- Đầu vào: cùng dữ liệu dự đoán với tiêu chí sai số ở mạch 2.
- Đầu ra: nhận dạng QP/QCQP, chứng nhận cả mục tiêu lẫn ràng buộc và diễn giải lựa chọn mô hình.

### Mạch 4 — Quy hoạch hình học và phép đổi biến làm lộ tính lồi

- Ví dụ: thiết kế hộp có thể tích cho trước, sử dụng ít vật liệu nhất. Tích kích thước nảy sinh từ nhu cầu; cách nhìn trực tiếp chưa cho mô hình lồi.
- Nội dung: phát triển đổi biến log, điều kiện biến dương, đơn thức và đa thức dương, khái quát quy hoạch hình học (GP). Phải làm rõ quan hệ nghiệm, giá trị mục tiêu sau biến đổi và khôi phục kích thước thật. Biến thể: phép trừ hoặc biến được phép bằng 0.
- Đầu vào: nhận dạng/chứng nhận theo biến ban đầu.
- Đầu ra: cải dạng bằng đổi biến, kèm điều kiện và ánh xạ nghiệm.

### Mạch 5 — Tối ưu nón và quy hoạch nửa xác định: ràng buộc trên chuẩn và ma trận

- Ví dụ: giới hạn chuẩn trong hồi quy dẫn tới cấu trúc nón bậc hai. Ví dụ chính tiếp theo: học khoảng cách từ các cặp dữ liệu tương tự/khác nhau, biến là ma trận. Bình phương khoảng cách không âm dẫn tới ma trận nửa xác định dương. Với lựa chọn mục tiêu và ràng buộc tuyến tính theo ma trận, thu được quy hoạch nửa xác định (SDP).
- Nội dung: làm rõ ràng buộc áp dụng mọi hướng và vì sao đường chéo không âm chưa đủ. Không khẳng định mọi mô hình học khoảng cách là SDP; ma trận nửa xác định dương có thể cho bình phương khoảng cách bằng 0 giữa hai điểm khác nhau.
- Đầu vào: ràng buộc chuẩn và ma trận nửa xác định dương ở mạch 3, kỹ năng cải dạng ở mạch 4.
- Đầu ra: chứng nhận ràng buộc nón/ma trận, diễn giải nghiệm ma trận.

### Mạch 6 — Xấp xỉ lồi và nới lỏng bài toán không lồi

- Ví dụ chính: phân loại nhị phân, mục tiêu trực tiếp giảm số dự đoán sai, xây dựng hàm mất mát lồi thay thế. Có thể tiếp nối lựa chọn đặc trưng, thay đếm số hệ số khác 0 bằng hình phạt chuẩn một.
- Nội dung: phân biệt thay mục tiêu bằng hàm thay thế với nới rộng miền khả thi; chọn máy dưới ngân sách bỏ điều kiện nguyên minh họa nới lỏng. Không tự gọi chuẩn một là nới lỏng nếu chưa chứng minh quan hệ miền/mục tiêu, không gọi hàm mất mát thay thế là xấp xỉ địa phương. Với mỗi trường hợp: nghiệm có dùng được cho bài gốc không, bảo đảm nào giữ, phải kiểm tra lại gì?
- Đầu vào: nhận dạng và cải dạng tương đương ở các mạch trước.
- Đầu ra: phân biệt tương đương/xấp xỉ/nới lỏng và đánh giá nghiệm theo mô hình ban đầu.

### Mạch 7 — Tổng hợp: lựa chọn biểu diễn và đánh giá nghiệm

- Ví dụ/tình huống: tình huống mới hoặc đổi giả thiết ví dụ đã học. Sinh viên tự đi đủ chín bước, chọn dạng bài và viết chứng nhận.
- Nội dung: sản phẩm gồm mô hình rõ nghĩa, lập luận tính lồi, quan hệ với bài ban đầu, diễn giải nghiệm. Bảng tổng hợp dạng chuẩn xuất hiện sau các ví dụ.
- Đầu vào: các lớp mô hình và phép biến đổi/xấp xỉ.
- Đầu ra: bài làm tích hợp có thể đánh giá theo ba mục tiêu bài học.

## Phần còn chờ chốt: tựa lồi và nhiều mục tiêu

- Nội dung giữ để chốt phạm vi sau: tối ưu tựa lồi và nhiều mục tiêu trong bản cũ.
- Tựa lồi mở rộng cách giải qua bài toán khả thi lồi; nhiều mục tiêu giải thích chọn tiêu chí/đánh đổi.
- Nếu triển khai đầy đủ cần ví dụ riêng; không ghép vội vào kết luận, không tự quyết đưa phụ lục/loại bỏ hoặc chốt thời lượng.
- Không gán LLO/CLO hay thời lượng mới khi chưa đối chiếu đề cương.

## Quyết định thay cấu trúc và tham chiếu bản cũ

- Bỏ ràng buộc 58 trang.
- Ví dụ thiết kế hộp thay dầm ở mạch GP; học khoảng cách thay phép đo hiệp phương sai ở mạch SDP.
- Xấp xỉ/nới lỏng thành mạch riêng.
- Ưu tiên AI/ML hoặc bài quen thuộc.
- Bản storyboard cũ: lịch sử Git tại commit e030846.
- Việc chuyển thành từng trang, chọn dữ liệu, chứng minh, hình và bài tập là bước làm việc tiếp theo với người dùng. Bộ trang chiếu, ghi chú bài giảng và bài tập hiện vẫn thuộc bản đã phát hành; cấu trúc này là cơ sở cho các bước chỉnh sửa tiếp theo.
