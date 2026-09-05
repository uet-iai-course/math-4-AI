# Storyboard Bài 01: skeleton ứng dụng trước lý thuyết

## Bản đồ hành trình khái niệm

| Cụm khái niệm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm | LLO/CLO | Ký hiệu truyền tiếp |
|---|---|---|---|---|---|---|---|---|---|
| Mô hình tối ưu và chứng nhận | M03, U01 | U02 | U01, U03, U04 | T01–T04 | F05, K01 | K02 | Đại số tuyến tính cơ bản → lập được mô hình và nêu loại bảo đảm cần tìm | LLO1, CLO1 | $x_0,r,u,w,X,y,a_i,y_i$ → $x,f_0,C$ |
| Tập lồi | T04 | F01 | F03 | F02, F04 | F05 | K02 | Tập hợp và đoạn thẳng → kiểm tra được miền khả thi | LLO2, CLO1 | $C$, $x,y$, $\theta$ |
| Hàm lồi | F05, H01 | H01 | H03 | H02, H04, H05 | K01 | K02 | Hàm, gradient, Hessian → kiểm tra được mục tiêu lồi | LLO2, CLO1 | $f_0$, $f$, $\nabla f$, $\nabla^2f$ |

Ba ca U01, U03 và U04 là ví dụ dẫn nhập đứng trước trực quan và hình thức toán học. Cách đặt này làm cụ thể nhu cầu mô hình hóa và chứng nhận; kết luận tính lồi được hoãn đến F05, H03 và K01. Chu trình đầy đủ là **nhu cầu + ví dụ dẫn nhập → trực quan → hình thức/toán học → ứng dụng → bài tập**. Tổng thời lượng chi tiết của từng cụm chưa phân bổ ở giai đoạn skeleton.

## Sáu mạch kể chuyện

| Mạch | Chức năng | Đầu vào | Đầu ra | Đóng góp cho vấn đề trung tâm |
|---|---|---|---|---|
| Mở đầu | Đặt mục tiêu và ba nhu cầu | Kiến thức tiên quyết của học phần | Ba ca cần mô hình hóa | Chuyển “tối ưu” từ thuật ngữ thành nhu cầu quyết định |
| Ba ca ứng dụng | Xác lập dữ kiện, biến, mục tiêu, ràng buộc | Ba nhu cầu | Ba mô hình cụ thể | Cung cấp vật liệu để trừu tượng hóa |
| Khuôn bài toán | Rút cấu trúc chung và loại bảo đảm | Ba mô hình | Khuôn $\min_{x\in C}f_0(x)$ và nhu cầu lồi | Xác định chính xác điều cần chứng nhận |
| Tập lồi | Kiểm tra cấu trúc miền | Miền $C$ của ba ca | Chứng nhận miền lồi | Hoàn thành nửa thứ nhất của chứng nhận |
| Hàm lồi | Kiểm tra cấu trúc mục tiêu | Hàm $f_0$ của ba ca | Chứng nhận mục tiêu lồi | Hoàn thành nửa thứ hai của chứng nhận |
| Kết luận | Ghép hai nửa và chuyển giao | Miền lồi, mục tiêu lồi | Kết luận có điều kiện và bài tập | Trả lời vấn đề trung tâm |

## Bảng theo từng trang

| Mã | Tiêu đề | Lý do tồn tại | Nhu cầu hoặc khoảng trống | Kết nối vào → kết nối ra | LLO/CLO | Quyết định |
|---|---|---|---|---|---|---|
| M01 | Giới thiệu tối ưu, tập lồi và hàm lồi | Định danh bài và tuyến tiếp cận | Người học chưa có bối cảnh | Mở bài → M02 | CLO1 | Sửa trang tiêu đề cũ để báo trước tuyến ứng dụng |
| M02 | Mục tiêu và vấn đề trung tâm | Nối LLO với một sản phẩm chung | Chưa biết bài cần giải quyết vấn đề gì | M01 → M03 | LLO1, LLO2, CLO1 | Gộp mục tiêu và vấn đề trung tâm |
| M03 | Ba nhu cầu tối ưu | Công bố thứ tự ba ca | Khái niệm tối ưu còn trừu tượng | M02 → U01 | LLO1, CLO1 | Thêm ca điều khiển; gộp bản đồ ứng dụng |
| U01 | Điều khiển một bước | Cho bài toán đầu tiên có đánh đổi và ràng buộc | Chưa có quyết định cụ thể | M03 → U02 | LLO1, CLO1 | Thêm |
| U02 | Thành phần của ca điều khiển | Tách tình huống thành bốn thành phần | Chưa có bảng kiểm mô hình hóa | U01 → U03 | LLO1, CLO1 | Sửa khuôn mô hình cũ thành bước phân tích ca |
| U03 | Hồi quy tuyến tính | Đưa tối ưu vào dự đoán liên tục | Chưa thấy biến tham số học máy | U02 → U04 | LLO1, CLO1 | Giữ bình phương nhỏ nhất, đổi vị trí |
| U04 | Hồi quy logistic | Đưa tối ưu vào phân loại | Chưa thấy mục tiêu không phải bậc hai | U03 → T01 | LLO1, CLO1 | Dời ca logistic lên trước lý thuyết; hoãn chứng nhận |
| T01 | Khuôn bài toán tối ưu | Rút mẫu chung sau ba ca | Ba ca chưa dùng cùng ngôn ngữ | U04 → T02 | LLO1, CLO1 | Dời khuôn tổng quát xuống sau ví dụ |
| T02 | Ánh xạ ba ca vào khuôn chung | Kiểm chứng ý nghĩa $x,f_0,C$ | Có khuôn nhưng chưa ánh xạ | T01 → T03 | LLO1, CLO1 | Thêm bảng so sánh |
| T03 | Cực tiểu địa phương và toàn cục | Làm rõ “tốt nhất” | Chưa phân biệt phạm vi so sánh | T02 → T04 | LLO1, CLO1 | Gộp nội dung cũ |
| T04 | Nhu cầu về cấu trúc lồi | Tạo cầu vào lý thuyết | Chưa biết điều kiện cho bảo đảm | T03 → F01 | LLO1, LLO2, CLO1 | Gộp các trang động cơ lồi |
| F01 | Trực giác về tập lồi | Trực giác trước lượng từ | Chưa hình dung miền lồi | T04 → F02 | LLO2, CLO1 | Giữ vai trò, rút gọn |
| F02 | Định nghĩa tập lồi | Cung cấp phát biểu hình thức | Trực giác chưa đủ để chứng minh | F01 → F03 | LLO2, CLO1 | Giữ |
| F03 | Các tập lồi chuẩn | Tạo kho nhận dạng cơ bản | Chưa có ví dụ chuẩn | F02 → F04 | LLO2, CLO1 | Gộp các tập không trực tiếp phục vụ ba ca |
| F04 | Phép bảo toàn tính lồi của tập | Xây miền phức từ tập chuẩn | Chưa có quy tắc suy luận | F03 → F05 | LLO2, CLO1 | Gộp giao và ánh xạ affine |
| F05 | Miền khả thi của ba ca | Áp dụng lý thuyết tập | Chưa chứng nhận miền của ví dụ | F04 → H01 | LLO2, CLO1 | Thay ca độ sáng bằng ba ca mới |
| H01 | Trực giác về hàm lồi | Trực giác trước bất đẳng thức | Miền đã lồi nhưng mục tiêu chưa kiểm tra | F05 → H02 | LLO2, CLO1 | Giữ vai trò, nối trực tiếp từ ba ca |
| H02 | Định nghĩa hàm lồi | Cung cấp phát biểu hình thức | Trực giác chưa đủ để chứng minh | H01 → H03 | LLO2, CLO1 | Giữ |
| H03 | Bình phương và mất mát logistic | Trả món nợ từ U03–U04 | Hai mục tiêu chưa được chứng nhận | H02 → H04 | LLO2, CLO1 | Gộp ví dụ phục vụ trực tiếp ứng dụng |
| H04 | Điều kiện bậc nhất và bậc hai | Cho công cụ kiểm tra | Định nghĩa khó dùng trực tiếp | H03 → H05 | LLO2, CLO1 | Gộp điều kiện vi phân; chi tiết sẽ tách nếu tràn |
| H05 | Phép bảo toàn tính lồi của hàm | Ghép các viên gạch thành mục tiêu hoàn chỉnh | Chưa có quy tắc hợp thành | H04 → K01 | LLO2, CLO1 | Chỉ giữ các phép cần cho ba ca |
| K01 | Chứng nhận ba ca ứng dụng | Khép vòng ứng dụng–lý thuyết | Hai chứng nhận chưa được ghép | H05 → K02 | LLO1, LLO2, CLO1 | Gộp ca tổng hợp và kết luận cục bộ–toàn cục |
| K02 | Tổng kết và bước tiếp theo | Cố kết, tự kiểm tra và chuyển bài | Chưa đo khả năng chuyển giao | K01 → Bài 02 | LLO1, LLO2, CLO1 | Gộp tổng kết, câu hỏi và cầu nối |

## Nội dung bỏ hoặc chuyển khỏi mặt trang chiếu

- Ca độ sáng: chuyển thành bài luyện bổ sung khi xây dựng tài liệu học tập.
- Lịch sử thuật toán, nón lồi, nón nửa xác định dương, lát cắt, epigraph, Jensen, liên hợp, tựa lồi và log-lồi/log-lõm: giữ trong nguồn hoặc tài liệu mở rộng; không đưa vào skeleton vì chưa phục vụ trực tiếp ba ca.
- Các chi tiết chứng minh và đại số dài: bổ sung vào ghi chú diễn giả hoặc ghi chú bài giảng ở vòng sau.
