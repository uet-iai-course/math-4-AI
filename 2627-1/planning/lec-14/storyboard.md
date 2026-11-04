# Bản đồ hành trình Lecture Note 14

Sản phẩm là Markdown, không phải storyboard trang chiếu. Bốn mạch theo phần F của kế hoạch; phần ứng dụng/tổng kết/bài tập phục vụ bốn mạch này.

| Khái niệm | Nhu cầu và trực quan | Hình thức/chứng minh | Ví dụ và diễn giải AI | Giới hạn và bài tập |
|---|---|---|---|---|
|PCA|Cảm biến2D chỉ lưu1số; chiếu bỏ thành phần vuông góc|ĐN14.1,ĐL14.2,MĐ14.3;proof phổ và Pythagore;hạngk mở rộng|VD14.1 giữ4điểm;SVG14.1;application14.1|NX14.4 phương sai/nhãn;BT14.1,A,E14.1|
|AE|Biểu diễn đường cong; hai ánh xạ và mã|ĐN14.5,MĐ14.6;proof via image(B)/projection/coordinateR|VD14.2 đổi độ lớn mã,VD14.3 lỗi tái tạo0 vẫn nhiều phân phối|NX14.7;BT14.2,E14.2|
|Mô hình biến ẩn|AE chưa chọn phân phối; lấy mã rồi nhiễu quan sát|ĐN14.8–9;chuẩn hóa bằng tích phân;Bayes|VD14.4 Gaussian2D giữcov của4điểm,posterior bằng hoàn bình phương|Phân biệt sample/integral/posterior;BT14.3,B,E14.2–3|
|KL/ELBO|Loglik chứa tích phân; chọn q dễ lấy mẫu|ĐN14.10,BĐ14.11,ĐN14.12,ĐL14.13;proof log inequality/Bayes|VD14.6 exact ELBO/gap;phân biệt KLprior/KLposterior|support/finiteness,theta fixed;BT14.4,E14.3|
|VAE/gradient|Suy luận chung tham số; gradient qua mẫu|MĐ14.14,ĐN14.15,MĐ14.16;proof Gaussian moments/change variables/dominated derivative|VD14.5 expected reconstruction,VD14.7 samples/gradient;SVG14.2|NX14.17 reconstruction/KL/collapse;BT14.5–6,C,E14.4;application14.2|

## Phụ thuộc và điểm nối

14.1 dùng phổ để giải nén, kết thúc ở giới hạn tuyến tính.14.2 mở rộng ánh xạ nhưng thiếu phân phối.14.3 bổ sung prior/likelihood và phát hiện marginal khó.14.4 dùng q/ELBO để tối ưu mô hình đó, giữ ranh giới giữa bound và loglik.14.5 dùng lại các số hiệu trong hai tình huống tự chứa, trong đó trường hợp giả thiết phân phối sai cho thấy bound chặt vẫn không đủ.14.6 kể chuỗi, phân loại kết quả và nối các bài05–13;14.7–9 kiểm tra và cung cấp lời giải không cần học liệu khác.

## Ánh xạ mục tiêu

|Mục tiêu|Kết quả/ví dụ|Bài kiểm tra|
|---|---|---|
|1|ĐL14.2,MĐ14.3,VD14.1|BT14.1;A;E14.1|
|2|MĐ14.6,VD14.2–3|BT14.2;E14.2|
|3|ĐN14.8–9,VD14.4|BT14.3;B;E14.2–3|
|4|BĐ14.11,ĐL14.13|BT14.4;E14.3|
|5|MĐ14.14/16,VD14.5–7|BT14.5;C;E14.3–4|
|6|NX14.17,application14.2|BT14.6;C;E14.2–3|

## Tám bước kiểm tra

Mỗi mạch có nhu cầu trước định nghĩa, trực giác nói rõ chưa là định nghĩa hoặc vai trò hình học; định nghĩa và kết quả có miền/giả thiết; proof ngay sau phát biểu; ví dụ có dữ kiện/tính/diễn giải/kiểmtra; nhận xét giới hạn và bài tập kèm hint/solution. Các kết quả trung gian KL/Gaussian dùng ví dụ14.5–6 ở cùng mạch, không lặp dữ liệu không cần thiết trong từng đoạn proof. Bài tập/ví dụ đều nêu dữ kiện tại chỗ. Hai SVG gốc không thay thế proof.
