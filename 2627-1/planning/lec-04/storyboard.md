# Storyboard Bài giảng 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

## 1. Bản đồ bảy mạch

| Mạch | Chức năng | Đầu vào | Đầu ra | Đóng góp cho vấn đề trung tâm |
|---|---|---|---|---|
| P — Mở đầu | Đặt bài toán chuyển điều kiện tối ưu thành thuật toán | Gradient, Hessian, tính lồi và KKT từ Bài 01–03 | Tiêu chí hướng, bước, dừng và khả thi | Xác định đích của toàn bài |
| A — Phương pháp giảm | Tạo khuôn hướng–bước–cập nhật–dừng | Điều kiện bậc nhất và miền mở | Một vòng giảm có Armijo | Biến điều kiện thành thao tác lặp được |
| B — Gradient và giảm dốc nhất | Giải thích vai trò của chuẩn và điều kiện hóa | Khuôn A cùng ví dụ bậc hai | Chọn hướng theo chuẩn và nhận biết zigzag | Cho thấy hình học lựa chọn hướng quyết định tốc độ |
| C — Newton không ràng buộc | Dùng độ cong để tạo bước và tiêu chuẩn dừng | Gradient, Hessian và quay lui | Newton đầy đủ, độ giảm Newton và hai pha | Nâng khuôn A từ bậc nhất lên bậc hai |
| D — Hàm tự điều chỉnh | Nêu lớp hàm cho phân tích Newton bất biến affine | Độ giảm Newton và đạo hàm cấp ba | Bảo đảm có điều kiện theo độ giảm Newton cùng giới hạn | Giải thích khi cấu trúc hàm thay thế hằng số khó biết |
| E — Newton với đẳng thức | Giữ hoặc phục hồi $Ax=b$ | KKT Bài 03 và Newton C; D không giữ khả thi | Hai hệ Newton–KKT, độ giảm đẳng thức và phần dư | Mở rộng quy trình sang mô hình có đẳng thức |
| Z — Kết luận | Thu hồi quyết định và đo chuyển giao | Sản phẩm A–E | Bảng chọn phương pháp và bài tích hợp | Trả lời vấn đề P03 bằng một quy trình hoàn chỉnh |

Bảy mạch gồm mở đầu P, năm mạch phát triển A–E và kết luận Z. Mỗi mạch là một `<section>` ngoài RevealJS.

## 2. Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm; ký hiệu truyền | Thời lượng |
|---|---|---|---|---|---|---|---|---|
| Phương pháp giảm và quay lui | A01 | A03 | A04, A06 | A02, A05, A07 | A06 | A07 | $f,x^{(0)},g,d,t$ → kiểm hướng, chọn bước, cập nhật và dừng; dữ kiện A04 truyền sang A06 | 0,35 LT + 0,15 BT |
| Gradient và giảm dốc nhất | B01 | B03 | B03 | B02, B04 | B05 | B06 | $g,H$ từ A04 → chọn chuẩn, giải $Wd=-g$ và so sánh hướng; dữ kiện truyền B03→B06 | 0,30 LT + 0,15 BT |
| Newton và độ giảm Newton | C01 | C04, C06 | C03, C08 | C02, C04–C06 | C07 | C08 | $g,H$ của A–B → giải $H\Delta=-g$, tính $\delta_N$ và đọc truy hồi sai số bậc hai | 0,40 LT + 0,20 BT |
| Hàm tự điều chỉnh | D01 | D03 | D03 | D02, D04 | D04 | D05, Z02 | $\phi=s-\log s$ từ C08 → kiểm tra $|\phi'''|=2(\phi'')^{3/2}$, rồi nêu pha giảm bước, bước đầy đủ và cận theo độ giảm Newton dưới giả thiết | 0,20 LT + 0,15 BT |
| Newton khả thi với $Ax=b$ | E01 dùng chung | E03 | E02 dùng chung, E05 | E03, E04 | E05 | E05 | E01 nhận kết quả Newton C và giới hạn D; $H,A,b$ → $A\Delta x=0$, $\delta_{\rm eq}^2=-g^T\Delta x$ | 0,25 LT + 0,10 BT |
| Newton không khả thi với $Ax=b$ | E06; dùng lại E01 | E06 | E02 dùng chung, E07 | E06 | E07 | E07, Z02 | $H,A,b$ và ca AI → $r_d,r_p,\Delta x,\Delta\nu$, điểm thử trong miền và hai ngưỡng dừng | 0,25 LT + 0,15 BT |

Các bước ví dụ và trực quan có thể cùng trang khi cùng phục vụ một luận điểm. C08 vừa đóng bài tập Newton vừa truyền đúng ví dụ sang D03. E01–E02 là phần dùng chung cho hai hành trình khả thi và không khả thi; E06 gộp nhu cầu khó tìm điểm đầu khả thi, trực quan giảm phần dư và thuật toán vì cả ba cùng phục vụ quyết định khởi đầu. Z02 đo riêng LLO7 bằng phép kiểm tra đạo hàm bậc ba của $\phi(s)=s-\log s$ và điều kiện dùng độ giảm Newton, nhưng không thay bài tập D05.

## 3. Xương sống và câu nối

- P03 hiện đúng năm chặng A–E: phương pháp giảm; gradient và chuẩn; Newton và độ cong; bảo đảm bằng tự điều chỉnh; khả thi với đẳng thức. A tạo khuôn lặp; B đổi hình học hướng; C dùng Hessian; D khóa lớp hàm; E giữ hoặc phục hồi khả thi; Z thu hồi quyết định.
- Điểm nhấn: $g^Td<0$; Armijo; gradient là steepest theo chuẩn Euclid; giải $H\Delta=-g$; $\delta_N^2/2$; bất đẳng thức tự điều chỉnh; hai hệ Newton–KKT và hai phần dư.
- Câu nối bắt buộc: A07→B01 hỏi vì sao cùng khuôn nhưng tiến chậm; B06→C01 dùng $W=H$ để mở Newton; C08→D01 chuyển từ một ví dụ tốt sang nhu cầu bảo đảm theo lớp hàm; D05→E01 nêu rõ tự điều chỉnh kiểm soát độ cong nhưng không giữ $Ax=b$, nên phải kết hợp Newton C với KKT; E07→Z01 thu hồi trực tiếp bốn lựa chọn.

## 4. Quyết định theo từng trang

| Mã | Lý do tồn tại và khoảng trống giải quyết | Quan hệ trước → sau | LLO/CLO | Quyết định |
|---|---|---|---|---|
| P00 | Định danh đúng Buổi 4 và hai lớp bài toán | Chưa có bối cảnh → P01 khóa đầu vào | Định hướng LLO6–10 | thêm |
| P01 | Ngăn dạy lại gradient, Hessian, tính lồi và KKT; khóa kích thước | Chủ đề → P02 nêu sản phẩm đánh giá | Tiên quyết | thêm |
| P02 | Trích nguyên LLO6–10 và nhóm theo CLO | Đầu vào → P03 đặt vấn đề trung tâm | LLO6–10/CLO1–2 | thêm |
| P03 | Cho đúng một chặng nội dung cho mỗi phần phát triển mà không lộ mã mạch hoặc quy trình nội bộ trong ghi chú diễn giả | Mục tiêu → A01 mở phương pháp giảm | Toàn bài | sửa bản đồ theo năm chặng; nguồn công khai thay tên tệp nội bộ |
| A01 | Chỉ ra điều kiện dừng chưa tạo được nghiệm | Vấn đề trung tâm → A02 khóa giả thiết | LLO6/LLO8 | giữ trục MIT 10-2 |
| A02 | Nêu miền, nghiệm đạt, điểm đầu và tập mức trước bảo đảm | Nhu cầu → A03 tạo hướng giảm | LLO8/CLO2 | gộp MIT 10-2–10-4 |
| A03 | Nối đạo hàm theo hướng với hình đường mức | Giả thiết → A04 đưa ví dụ | LLO6 | thêm SVG tự vẽ |
| A04 | Khóa mọi số, đường mức, điểm đầu và gradient nhưng chưa lộ quỹ đạo | Trực quan hướng → A05 chọn bước | LLO6/LLO8 | sửa hình tổng quan; giữ quỹ đạo cho B03 |
| A05 | Phân biệt tìm kiếm đường chính xác với quay lui thực hành, khóa thuật ngữ Việt–Anh lần đầu | Ví dụ → A06 chạy Armijo | LLO8/CLO2 | gộp MIT 10-6 |
| A06 | Cho một lần tính Armijo kiểm chứng được | Quy tắc bước → A07 đóng vòng lặp | LLO8 | thêm bảng tính |
| A07 | Gom đúng hướng, bước, cập nhật và dừng; ở đây dùng chuẩn gradient, còn các tiêu chuẩn khác chỉ xuất hiện sau khi được định nghĩa; yêu cầu chạy vòng kế | Kết quả Armijo → B01 hỏi tốc độ | LLO6/LLO8 | gộp thuật toán+bài tập |
| B01 | Tạo nhu cầu thay đổi hình học hướng do điều kiện hóa | Khuôn A → B03 quan sát zigzag | LLO6 | giữ MIT 10-8 |
| B03 | Hiển thị quỹ đạo và hệ số co trước định nghĩa chuẩn; notes nêu cầu sang B02: quỹ đạo theo chuẩn Euclid, trang sau đặt gradient vào khung chuẩn | Nhu cầu → B02 gọi tên gradient | LLO6 | đổi thứ tự theo chu trình; SVG tự vẽ |
| B02 | Đặt gradient là trường hợp Euclid, tránh đồng nhất mọi chuẩn | Ví dụ → B04 khái quát | LLO6/CLO1 | giữ MIT 10-7 |
| B04 | Định nghĩa chuẩn đối ngẫu cùng hướng chuẩn hóa và không chuẩn hóa | Euclid → B05 chuẩn bậc hai | LLO6 | sửa đủ $\|g\|_*=\max_{\|v\|\le1}g^Tv$ |
| B05 | Biến chọn chuẩn thành tiền điều kiện và khóa hội tụ tuyến tính có điều kiện: $f$ $\mu$-lồi mạnh, gradient $M$-Lipschitz hoặc $\mu I\preceq\nabla^2f\preceq MI$, bước $t=1/M$, $\kappa=M/\mu$; phân biệt với $\kappa_2(H)$ của bậc hai A04 | Hình thức → B06 so sánh | LLO6/LLO8 | sửa bảo đảm |
| B06 | Đo khả năng tính hai hướng và giải thích khác biệt | Ứng dụng chuẩn → C01 mở Newton | LLO6/LLO8 | thêm bài tập |
| C01 | Chỉ ra mô hình bậc nhất bỏ qua độ cong | B06 → C02 dựng mô hình bậc hai | LLO6 | giữ MIT 10-14 |
| C02 | Định nghĩa Newton bằng cực tiểu mô hình và hệ tuyến tính, không lập nghịch đảo | Nhu cầu → C03 kiểm chứng trên bậc hai | LLO6/LLO8 | đưa trước ví dụ để ký hiệu xuất hiện có căn cứ |
| C03 | Kiểm chứng mô hình Newton là chính hàm bậc hai và bước đầy đủ đến nghiệm | Hình thức → C04 đo độ giảm | LLO6 | chuyển sau C02; nêu rõ kết luận không mở rộng nguyên dạng sang hàm phi bậc hai |
| C04 | Phân biệt giảm mô hình với sai số thật | Hướng Newton → C05 thuật toán | LLO6 | giữ MIT 10-16 |
| C05 | Nêu đủ đầu vào, giải hệ, tìm kiếm đường, cập nhật và dừng | Độ giảm Newton → C06 bảo đảm | LLO6/LLO8 | giữ MIT 10-17 |
| C06 | Chặn phát biểu vô điều kiện và gọi rõ truy hồi sai số hội tụ bậc hai | Thuật toán → C07 triển khai | LLO6/CLO1 | sửa đồ thị log và công thức |
| C07 | Chuyển công thức sang quyết định giải hệ thực tế và đóng LLO8 trước khi đổi mục tiêu | Bảo đảm → C08 bài tập phi bậc hai | LLO8/CLO2 | giữ trước D; lý do khác thứ tự mẫu chỉ ghi trong hồ sơ, không ghi trên slide hoặc notes |
| C08 | Đo một bước Newton và tạo ví dụ cho mạch D mà không công bố sẵn đáp án | Triển khai → D01 hỏi lớp hàm | LLO6/LLO8 | chuyển đáp án vào notes |
| D01 | Nêu giới hạn của hằng số hội tụ cổ điển | Newton → D03 quan sát đạo hàm bậc ba | LLO7 | giữ MIT 10-24 |
| D03 | Cho tỷ số $|\phi'''|/(\phi'')^{3/2}=2$ làm trực quan định lượng trước định nghĩa | Nhu cầu → D02 hình thức hóa | LLO7 | sửa trực quan, dùng lại C08 |
| D02 | Định nghĩa tự điều chỉnh một và nhiều chiều | Ví dụ → D04 phép tính đóng | LLO7/CLO1 | giữ MIT 10-25 |
| D04 | Dựng hàm chắn log với $a_i,b_i,m$ và miền trong đầy đủ; truy nguyên hợp affine và tổng theo Boyd §9.6; nêu bảo đảm có điều kiện theo độ giảm Newton | Định nghĩa → D05 kiểm tra/giới hạn | LLO7 | sửa ứng dụng+bảo đảm; chi tiết cận trong ghi chú |
| D05 | Đo kiểm tra $-\log s$ không lộ đáp án và ngăn suy luận tự bảo đảm nghiệm | Phép tính → E01 kết hợp Newton với KKT | LLO7 | chuyển đáp án vào notes; sửa cầu nối |
| E01 | Chỉ ra tự điều chỉnh không giữ khả thi và bước Newton thường có thể phá $Ax=b$ | Newton C và giới hạn D → E02 ví dụ đẳng thức | LLO9/LLO10 | sửa cầu D→E |
| E02 | Khóa dữ kiện ví dụ E và chuyển giao sang hồi quy trơn với $\mathbf1^Tw=1$; hoãn độ giảm và phần dư tới E04, E06 là nơi chúng được định nghĩa | Nhu cầu → E03 khử đẳng thức | LLO9/LLO10 | sửa ca AI và giả thiết không gian rỗng; bỏ ký hiệu xuất hiện sớm |
| E03 | Trực quan hóa không gian rỗng và khóa $F,z$ | Ví dụ → E04 hệ khả thi | LLO9 | sửa kiểu đại lượng; SVG tự vẽ |
| E04 | Nêu điều kiện khả nghịch, hệ khả thi với biến phụ $\eta$ và đẳng thức độ giảm có ràng buộc | Khử đẳng thức → E05 tính bước | LLO9/LLO10 | sửa ký hiệu và dừng $\delta_{\rm eq}^2/2\le\varepsilon$ |
| E05 | Kiểm tra $A\Delta x=0$, $\eta=-4/5$ và bước đến nghiệm | Hệ khả thi → E06 mở chế độ không khả thi | LLO9 | sửa ký hiệu bài tập tính |
| E06 | Mở bằng nhu cầu khó tìm điểm đầu khả thi rồi nêu khuôn tối thiểu: phần dư, hệ, điểm thử trong miền, cập nhật và hai ngưỡng dừng; notes giữ bất đẳng thức quay lui theo chuẩn phần dư với $r=(r_d,r_p)$ | Khả thi → E07 tính bước phục hồi | LLO9/LLO10 | sửa nhu cầu và giảm tải nhưng giữ đủ LLO10 |
| E07 | Đo lập RHS phần dư, nêu quy tắc LDLT/bổ Schur và nối thẳng bảng quyết định | Hệ không khả thi → Z01 tổng hợp | LLO10 | sửa cầu nối |
| Z01 | Trả lời P03 bằng bảng chọn phương pháp, độ giảm đẳng thức và điều kiện bảo đảm; giảm dốc nhất dùng giả thiết B04 và dừng bằng $\|g\|_*$ | Kết quả A–E → Z02 tự kiểm tra | LLO6–10 | sửa thu hồi tự điều chỉnh và bảo đảm theo chuẩn |
| Z02 | Dùng bốn nhiệm vụ cho tìm bước; kiểm tra tự điều chỉnh của $\phi$; giải bài $\min\frac12(x_1^2+4x_2^2)$ với $x_1+x_2=1$; và phân loại hồi quy trơn | Pipeline → Z03 nguồn/chuyển tiếp | LLO6–10/CLO1–2 | sửa câu hỏi để đo trực tiếp LLO7 và chép đủ mục tiêu LLO9–10 |
| Z03 | Truy nguyên nguồn và làm nổi thay đổi sang cảnh quan học sâu, gradient nhiễu, minibatch | Tự kiểm tra → Bài 05 | Đọc tiếp | sửa chuyển tiếp |

## 5. Sai khác có chủ ý so với mẫu

- Giữ trục khái niệm MIT Lecture 16–17 nhưng dùng hai ví dụ xuyên cụm thay cho nhiều ví dụ rời.
- Đặt C07 về triển khai ngay sau bảo đảm hội tụ và trước mạch D, khác vị trí cuối Lecture 16 của MIT. Quyết định này đóng minh chứng LLO8 về thực hiện thuật toán Newton trước khi chuyển sang LLO7; chi tiết Hessian–vector và đếm phép toán được lược để không làm chậm tuyến.
- Đưa ví dụ và trực quan trước định nghĩa ở B03 và D03. Riêng Newton, C02 định nghĩa mô hình và hướng trước khi C03 kiểm chứng trên hàm bậc hai.
- Lược đồ thị thực nghiệm, analytic centering, network flow, LMI center, trust-region, quasi-Newton và đếm flop chi tiết vì không đo trực tiếp LLO6–10 trong thời lượng.
- Không sao chụp hình MIT; bảy SVG được tự vẽ từ công thức trong `math-spec.md`. Sáu hình dùng trong deck; `self-concordant-curvature.svg` dùng trong ghi chú bài giảng.
- Dùng $\delta_N$ thay ký hiệu $\lambda$ cho độ giảm Newton để không xung đột nhân tử Lagrange Bài 03.
- Mọi thao tác Newton và tiền điều kiện đều viết dưới dạng giải hệ; không lập nghịch đảo ma trận.

## 6. Phân bổ nội bộ sau kiểm định storyboard

| Cụm | Lý thuyết | Bài tập |
|---|---:|---:|
| P và chuyển mạch | 0,15 tiết | 0,00 tiết |
| A — phương pháp giảm và tìm bước | 0,35 tiết | 0,15 tiết |
| B — gradient và giảm dốc nhất | 0,30 tiết | 0,15 tiết |
| C — Newton không ràng buộc | 0,40 tiết | 0,20 tiết |
| D — hàm tự điều chỉnh | 0,20 tiết | 0,15 tiết |
| E — Newton với đẳng thức | 0,50 tiết | 0,25 tiết |
| Z — tổng hợp | 0,10 tiết | 0,10 tiết |
| **Tổng** | **2,00 tiết** | **1,00 tiết** |

So với bản nháp đầu, C và D mỗi mạch giảm 0,05 tiết lý thuyết; E tăng 0,10 tiết để thực hiện đủ hai chế độ Newton–KKT. Số trang và thứ tự không đổi.
