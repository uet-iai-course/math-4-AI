# Storyboard Bài 01: Giới thiệu tối ưu, tập lồi và hàm lồi

## Trạng thái và phạm vi

- Hồ sơ quy trình cũ tiếp tục được giữ tại `lecture-01-storyboard.md`; không tự di chuyển sang `planning/lec-01/`.
- Trạng thái hiện hành là **53 slide lá**, **53 mã duy nhất** và **6 section ngoài**. Bảng dưới đây khớp đúng thứ tự DOM.
- Mạch kết thúc hiện hành là D01–D04.

## Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm | Ký hiệu truyền |
|---|---|---|---|---|---|---|---|---|
| Mô hình tối ưu | A00 | A00 | A02 | A01, A03 | A04 | D02 | Đại số tuyến tính → xác định dữ kiện, biến, mục tiêu và miền | $x,C,f_0,f_i$ |
| Cực tiểu, tồn tại, duy nhất | A03 | A03L, A03W | A03L, A03W | A03L, A03W | A05 | D04 | Khuôn tối ưu → phân biệt loại nghiệm và giả thiết bảo đảm | $x^\star,C,U,p^*$ |
| Cấu trúc lồi và ca độ sáng | A05 | A07 | A08 | A06, A07M, A09 | A09 | A10 | Bảo đảm lồi → cải dạng một mô hình có miền dương | $p,A,d,t$ |
| Tập lồi | B00 | B00, B02–B08 | B02–B08 | B01, B10–B12 | B06–B08, B11 | B09 | Đoạn nối → phân loại và xây tập khả thi lồi | $C,\theta,\mathbb S_+^n$ |
| Hàm lồi | C00 | C00, C01 | C01, C03, C08 | C02, C04–C07, C10 | C11–C16 | C09 | Tập lồi và giải tích → kiểm tra mục tiêu lồi | $f,\operatorname{dom}f,\nabla f,\nabla^2f$ |
| Mất mát logistic | D01 | D01 | Ví dụ tính được trong lecture note | D01 | D02 | D02, D04 | Hàm lồi và cầu chuẩn → mô hình phân loại có bảo đảm | $a_i,y_i,w,s_i,\phi,L,R$ |

Các cụm giữ thứ tự nhu cầu → trực quan/ví dụ → hình thức → ứng dụng → bài tập. A03L và A03W gộp trực quan, ví dụ và phát biểu chính xác trên cùng slide vì mỗi slide chỉ giải quyết một phân biệt. D01 gộp nhu cầu, định nghĩa và trực giác của mất mát; ví dụ số và chứng minh đầy đủ nằm trong lecture note.

## Xương sống sáu section ngoài

| Mạch | Chức năng | Đầu vào | Đầu ra cho mạch sau |
|---|---|---|---|
| P — Mở đầu | Nêu vị trí, LLO/CLO và vấn đề trung tâm | Kiến thức nền Bài 00 | Bốn đối tượng cần ghép: mô hình, bảo đảm, tập lồi, hàm lồi |
| A1 — Bài toán tối ưu | Xây khuôn mô hình và phân biệt các loại kết luận | Vấn đề trung tâm | Khuôn $\min_{x\in C}f_0(x)$ cùng điều kiện tồn tại và nhiều nhất một nghiệm |
| A2 — Bảo đảm và ca độ sáng | Biến bảo đảm lồi thành quy trình nhận dạng–cải dạng–giải | Khuôn mô hình và loại nghiệm | Một ca cải dạng cụ thể, đồng thời tạo nhu cầu học hình học miền khả thi |
| B — Tập lồi | Cung cấp ngôn ngữ và phép dựng miền lồi | Ràng buộc của mô hình | Công cụ xác nhận miền khả thi lồi |
| C — Hàm lồi | Cung cấp định nghĩa, điều kiện vi phân và phép bảo toàn | Tập lồi và giải tích nhiều biến | Công cụ xác nhận mục tiêu lồi |
| D — Ca tổng hợp | Ghép miền và mục tiêu trong hồi quy logistic rồi thu hồi LLO/CLO | Khuôn mô hình, tập lồi, hàm lồi | Bảo đảm tồn tại và địa phương–toàn cục có điều kiện; tự kiểm tra |

## Bảng 53 slide theo đúng thứ tự DOM

| # | Mã | Lý do tồn tại | Khoảng trống giải quyết | Quan hệ trước → sau | LLO/CLO | Quyết định |
|---:|---|---|---|---|---|---|
| 1 | P00 | Định danh bài học | Chưa có bối cảnh | Mở bài → P01 | CLO1 | Giữ |
| 2 | P01 | Kích hoạt tiên quyết | Chưa nối Bài 00 với công cụ tối ưu | P00 → P01 → P02 | CLO1 | Giữ |
| 3 | P02 | Nêu sản phẩm học tập quan sát được | Chưa biết đích học | P01 → P02 → P03 | LLO1, LLO2, CLO1 | Giữ |
| 4 | P03 | Đặt vấn đề trung tâm và bản đồ khái niệm | Chưa thấy quan hệ mô hình–tập–hàm | P02 → P03 → A00 | LLO1, LLO2, CLO1 | Sửa: khớp tuyến 53 slide |
| 5 | A00 | Tạo nhu cầu tối ưu từ lựa chọn và đánh đổi | Dễ đồng nhất tối ưu với một công thức | P03 → A00 → A01 | LLO1, CLO1 | Giữ |
| 6 | A01 | Xác lập khuôn mô hình | Chưa phân biệt dữ kiện, biến, mục tiêu, miền | A00 → A01 → A02 | LLO1, CLO1 | Giữ |
| 7 | A02 | Củng cố khuôn bằng ba lĩnh vực | Khuôn còn trừu tượng | A01 → A02 → A03 | LLO1, CLO1 | Giữ |
| 8 | A03 | Tạo nhu cầu chứng nhận toàn cục | Nhầm nghiệm khả thi/cục bộ với tối ưu toàn cục | A02 → A03 → A03L | LLO1, CLO1 | Giữ |
| 9 | A03L | Phân biệt cực tiểu địa phương và toàn cục tương đối với $C$ | Thiếu lượng từ và vai trò biên miền | A03 → A03L → A03W | LLO1, CLO1 | Giữ |
| 10 | A03W | Phân biệt tồn tại với nhiều nhất một nghiệm | Nhầm compact, lồi chặt và duy nhất | A03L → A03W → A11 | LLO1, CLO1 | Giữ |
| 11 | A11 | Giải thích chuỗi nhu cầu lịch sử | Thiếu quan hệ giữa lớp bài toán và phương pháp | A03W → A11 → A04 | LLO1 | Giữ |
| 12 | A04 | Cho hai lớp bài toán nền tảng | Chưa thấy LS và LP trong cùng khuôn | A11 → A04 → A05 | LLO1 | Giữ |
| 13 | A05 | Nêu bảo đảm của cấu trúc lồi | Chưa biết tập lồi và hàm lồi cùng đóng vai trò gì | A04 → A05 → A06 | LLO1, CLO1 | Giữ |
| 14 | A06 | Cung cấp quy trình nhận dạng–cải dạng–giải | Chưa có quy trình ứng dụng | A05 → A06 → A07 | LLO1, CLO1 | Giữ |
| 15 | A07 | Tạo trực giác cho ca độ sáng | Chưa có tình huống cụ thể | A06 → A07 → A07M | LLO1, CLO1 | Giữ |
| 16 | A07M | Hình thức hóa dữ kiện, biến, miền và mục tiêu | Trực giác chưa thành mô hình | A07 → A07M → A08 | LLO1, CLO1 | Giữ |
| 17 | A08 | Cho phép tính dẫn nhập | Chưa cảm nhận sai lệch của phương án khả thi | A07M → A08 → A09 | LLO1, CLO1 | Giữ |
| 18 | A09 | Cải dạng ca độ sáng thành bài toán lồi | Chưa biết phép biến đổi nào bảo toàn bài toán | A08 → A09 → A10 | LLO1, CLO1 | Giữ |
| 19 | A10 | Phân biệt ràng buộc giữ và phá cấu trúc | Cần cầu nối sang hình học tập | A09 → A10 → B00 | LLO1, CLO1 | Giữ |
| 20 | B00 | Tạo nhu cầu và trực giác tập lồi | Chưa có hình ảnh đoạn nối | A10 → B00 → B01 | LLO2, CLO1 | Giữ |
| 21 | B01 | Định nghĩa tập lồi | Trực giác chưa thành lượng từ | B00 → B01 → B02 | LLO2, CLO1 | Giữ |
| 22 | B02 | Mở rộng sang tổ hợp và bao lồi | Chưa trộn nhiều điểm | B01 → B02 → B03 | LLO2 | Giữ |
| 23 | B03 | Giới thiệu nón lồi | Chưa có phép co giãn không âm | B02 → B03 → B04 | LLO2 | Giữ |
| 24 | B04 | Giới thiệu siêu phẳng và nửa không gian | Chưa có viên gạch ràng buộc tuyến tính | B03 → B04 → B05 | LLO2 | Giữ |
| 25 | B05 | Cho ví dụ tập cong lồi | Chưa thấy cầu và ellipsoid | B04 → B05 → B06 | LLO2 | Giữ |
| 26 | B06 | Giới thiệu cầu chuẩn và nón bậc hai | Chưa có ràng buộc chuẩn | B05 → B06 → B07 | LLO2 | Giữ |
| 27 | B07 | Xác lập đa diện và thứ tự theo thành phần | Chưa ghép nhiều ràng buộc affine | B06 → B07 → B08 | LLO2 | Giữ |
| 28 | B08 | Giới thiệu nón PSD | Chưa có ràng buộc ma trận | B07 → B08 → B10 | LLO2 | Giữ |
| 29 | B10 | Chứng minh giao bảo toàn tính lồi | Chưa biết vì sao nhiều ràng buộc vẫn cho miền lồi | B08 → B10 → B11 | LLO2, CLO1 | Giữ |
| 30 | B11 | Cung cấp ảnh và nghịch ảnh affine | Chưa có công cụ xây tập mới | B10 → B11 → B09 | LLO2, CLO1 | Giữ |
| 31 | B09 | Kiểm tra nhận dạng tập lồi | Chưa luyện các công cụ lõi | B11 → B09 → B12 | LLO2, CLO1 | Giữ |
| 32 | B12 | Mở rộng bằng phối cảnh và phân tuyến tính | Chưa thấy phép biến đổi hữu tỉ | B09 → B12 → C00 | LLO2 | Giữ |
| 33 | C00 | Tạo nhu cầu và trực giác hàm lồi | Chưa nối hình dạng mục tiêu với cực tiểu | B12 → C00 → C01 | LLO2, CLO1 | Giữ |
| 34 | C01 | Minh họa bất đẳng thức dây cung | Trực giác chưa được kiểm bằng số | C00 → C01 → C02 | LLO2 | Giữ |
| 35 | C02 | Định nghĩa hàm lồi | Chưa có phát biểu đầy đủ | C01 → C02 → C03 | LLO2 | Giữ |
| 36 | C03 | Cung cấp kho ví dụ véc-tơ và ma trận | Định nghĩa còn thiếu ví dụ chuẩn | C02 → C03 → C04 | LLO2 | Giữ |
| 37 | C04 | Quy tính lồi nhiều chiều về lát cắt một chiều | Chưa có công cụ hạn chế theo đường | C03 → C04 → C05 | LLO2 | Giữ |
| 38 | C05 | Gộp miền vào hàm bằng giá trị $+\infty$ | Chưa nối miền với biểu diễn hàm | C04 → C05 → C06 | LLO2 | Giữ |
| 39 | C06 | Nêu điều kiện bậc nhất | Chưa có chứng nhận tiếp tuyến | C05 → C06 → C07 | LLO2, CLO1 | Giữ |
| 40 | C07 | Nêu điều kiện Hessian và giới hạn của PD | Chưa có kiểm tra bậc hai | C06 → C07 → C08 | LLO2, CLO1 | Giữ |
| 41 | C08 | Áp dụng Hessian cho bậc hai và LS | Chưa chuyển điều kiện thành phép tính | C07 → C08 → C09 | LLO2, CLO1 | Giữ |
| 42 | C09 | Luyện tính Hessian và kết luận PSD | Chưa tự kiểm công cụ lõi | C08 → C09 → C10 | LLO2, CLO1 | Giữ |
| 43 | C10 | Nối hàm lồi với tập mức và epigraph | Chưa thấy cầu nối hàm–tập | C09 → C10 → C11 | LLO2, CLO1 | Giữ |
| 44 | C11 | Áp dụng Jensen trong xác suất | Chưa thấy ứng dụng kỳ vọng | C10 → C11 → C12 | LLO2 | Giữ |
| 45 | C12 | Lập bảng các phép bảo toàn | Chưa có cách xây hàm lồi mới | C11 → C12 → C13 | LLO2, CLO1 | Giữ |
| 46 | C13 | Kiểm tra tổng không âm và hợp affine | Cần cụ thể hóa quy tắc đầu | C12 → C13 → C14 | LLO2 | Giữ |
| 47 | C14 | Kiểm tra cực đại điểm và supremum | Chưa có quy tắc cận trên | C13 → C14 → C15 | LLO2 | Giữ |
| 48 | C15 | Nêu điều kiện đơn điệu cho hợp hàm | Dễ áp dụng hợp hàm sai | C14 → C15 → C16 | LLO2 | Giữ |
| 49 | C16 | Nêu điều kiện cho partial minimization và phối cảnh | Dễ bỏ lồi đồng thời hoặc $t>0$ | C15 → C16 → D01 | LLO2 | Giữ |
| 50 | D01 | Xây mất mát logistic từ biên phân loại có dấu | Chưa nối hàm lồi với phân loại | C16 → D01 → D02 | LLO1, LLO2, CLO1 | Sửa: mở mạch D |
| 51 | D02 | Ghép toàn bộ công cụ vào hồi quy logistic | Chưa có ca đi từ mô hình đến bảo đảm | D01 → D02 → D03 | LLO1, LLO2, CLO1 | Giữ trong mạch D |
| 52 | D03 | Thu hồi luận điểm theo LLO/CLO | Chưa đối chiếu kết quả với mục tiêu học | D02 → D03 → D04 | LLO1, LLO2, CLO1 | Giữ trong mạch D |
| 53 | D04 | Tự kiểm tra và chỉ nguồn đọc | Chưa có cơ chế tự đánh giá cuối bài | D03 → D04 → kết thúc | LLO1, LLO2, CLO1 | Giữ trong mạch D |

## Sai khác có chủ ý so với bản phát triển dài

- Bỏ các cụm Pareto, nón đối ngẫu, siêu phẳng tách/tựa, hàm liên hợp, tựa lồi, log-lõm và mở rộng thứ tự ma trận khỏi deck Bài 01. Các chủ đề này không còn trong DOM hiện hành; chúng được dành cho bài sau hoặc lecture note khi cần.
- Giữ A03L và A03W vì lecture note cần phân biệt loại nghiệm, tồn tại và duy nhất trước khi phát biểu bảo đảm của bài toán lồi.
- Dùng D01–D04 cho ca logistic và kết luận để khớp phần D của lecture note.

## Tự kiểm trạng thái

- [x] 53 hàng storyboard khớp 53 slide lá theo đúng thứ tự DOM.
- [x] 6 section ngoài có đầu vào, đầu ra và chức năng riêng.
- [x] Mạch D dùng D01–D04.
- [x] Các khái niệm trọng tâm có bản đồ nhu cầu → trực quan/ví dụ → hình thức → ứng dụng → bài tập.
- [ ] Kiểm định trực quan khung rộng và hẹp chỉ đánh dấu sau khi có trình duyệt thực tế.
