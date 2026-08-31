# Nhật ký rà soát Bài giảng 06

## Kiểm định ghi chú bài giảng — 2026-08-31

- Ghi chú công khai gồm 6 mạch, 14 chủ đề; mỗi chủ đề có mục tiêu đọc hiểu, định nghĩa và giả thiết, trực quan, ví dụ tính được, ứng dụng AI, điểm dễ nhầm, câu hỏi kiểm tra và đầu ra.
- Bảy kết quả về Adam, Newton, gradient liên hợp, BFGS, chuẩn hóa theo lô, hạ theo khối và trung bình Polyak được tách thành phần chứng minh sau ca tích hợp.
- Rà toán học độc lập đạt sau khi bổ sung trường hợp $r_0=0$ cho gradient liên hợp, viết nghiệm gần đúng bằng sai số giá trị hàm, định nghĩa $q_\star$ trên cặp $(x,y)$ và giữ đúng chiều suy ra của bất đẳng thức hạ trơn.
- Hậu kiểm `no-ai-slop` đạt; các câu dẫn chứng minh lặp, lời xác nhận quy trình và ba chỗ chuyển mạch đột ngột đã được sửa.
- Sáu SVG của ghi chú phân tích XML thành công, có `role="img"`, `title`, `desc`, không chứa script, tài nguyên mạng hoặc `foreignObject`; cả bản rộng 900 px và hẹp 600 px đã được kết xuất và xem trực tiếp, không có phần tử chồng hoặc bị cắt.
- Nguồn đúng của Martens (2010) là tệp ICML `https://icml.cc/Conferences/2010/papers/458.pdf`; đường dẫn Proceedings of Machine Learning Research từng xuất hiện trong ghi chú diễn giả của deck không phải trang bài báo này. Ghi chú dùng nội dung từ `sources/Deep_HessianFree.pdf` và không lặp lại URL sai.
- Codex Slides vẫn không khả dụng do giới hạn runtime đã ghi bên dưới. Kiểm định phát hành dùng RevealJS và viewer web tĩnh cục bộ; không tuyên bố đã kiểm bằng Codex Slides.

## Trạng thái

**Đã chỉnh sửa theo vòng rà soát cuối; chờ kiểm định trực quan bằng Browser.** Tệp RevealJS, outline và storyboard được đồng bộ ở 36 trang, 6 mạch. Các vấn đề nội dung của vai sinh viên, chuyên gia, toán học, học thuật–giảng dạy và mạch kể chuyện đã có quyết định và bằng chứng bên dưới; chưa tuyên bố đạt cổng trực quan bằng Codex Slides.

## Kiểm kê nguồn và quyền

| Nguồn | Vai trò | Quyền/quyết định |
|---|---|---|
| Đề cương UET.AI2012 DOCX chính thức | Phạm vi, LLO/CLO, 2 LT + 1 BT | Nguồn nội bộ do người dùng cung cấp; chỉ trích thông tin học phần |
| Goodfellow, Bengio, Courville (2016), Ch. 8 §§8.5–8.7 | Nguồn nội dung chính | Trích dẫn trang HTML chính thức của tác giả; không sao chép hình từ bản PDF phân phối không chính thức |
| Duchi et al. (2011); Kingma & Ba (2015) | AdaGrad, Adam | Dùng công thức và ghi nguồn; không lấy tài sản hình |
| Martens (2010), `sources/Deep_HessianFree.pdf` | Hessian-free, CG và giảm chấn | Dùng nội dung toán, tự vẽ sơ đồ; không sao chép hình thực nghiệm |
| Nocedal & Wright (2006) | Newton, BFGS, L-BFGS | Dùng phát biểu chuẩn và công thức; không sao chép hình |
| Ioffe & Szegedy (2015); Polyak & Juditsky (1992); Bengio et al. (2009) | Ba chiến lược LLO16 | Dùng định nghĩa/công thức, không dùng hình gốc |
| `sources/Optimization_2015_11_11.pdf` | Kiểm chéo | Quyền phát hành chưa xác minh; không đưa tài sản trực tiếp vào deck |

Không tải thêm nguồn MIT OpenCourseWare. Không dùng tệp `._*`. Bốn SVG trong `img/lec-06/` là hình tự vẽ, chỉ biểu diễn quan hệ toán học, không giả làm dữ liệu thực nghiệm.

## Sai khác có chủ ý so với mẫu

- Kế thừa cấu trúc RevealJS, nền sáng, bảng, thẻ, chân trang và màu từ `2526-2-another-course/`; không phụ thuộc runtime chéo.
- Dùng đúng 6 mạch `P/A/B/C/D/Z`, thay vì 7 mạch của Bài 05, để gộp sáu chiến lược LLO16 thành hai mạch có quan hệ rõ: ổn định cục bộ và thay đổi tuyến bài toán.
- Không giữ lịch sử thuật toán hoặc ảnh thực nghiệm trong mẫu tham khảo. Thay bằng ví dụ số kiểm được và SVG tự vẽ.
- Bổ sung Hessian-free và L-BFGS để làm rõ cách mở rộng CG/BFGS cho số chiều lớn; đây là triển khai trực tiếp phạm vi “phương pháp xấp xỉ bậc hai”, không mở sang một chương mới.
- Tách huấn luyện và suy diễn ở chuẩn hóa theo lô; bổ sung điều kiện $y^Ts>0$ cho BFGS và giảm chấn cho Newton để tránh lược giả thiết quyết định tính đúng.

## Giới hạn Codex Slides

- Runtime cục bộ là Node.js `18.19.1`, trong khi Codex Slides yêu cầu Node.js `>=20`.
- Lệnh `capabilities` trả được bề mặt lệnh, nhưng không có Browser tích hợp trong phiên tác tử để xác nhận màn hình tạo dự án.
- Các lần chạy trước trong cùng kho ghi nhận hợp đồng phiên bản giữa CLI và dịch vụ bị lệch; thao tác tải tệp/render có thể dừng với `ReferenceError: File is not defined`.
- Vì ba giới hạn trên, bản này không tuyên bố đã render, tải tệp hoặc rà trực quan bằng Codex Slides. RevealJS cục bộ là cơ chế dự phòng theo chỉ dẫn kho.

## Kiểm tra của tác tử soạn

- Bộ phân tích HTML xác nhận đúng 6 `<section>` ngoài, 38 `data-slide-id` duy nhất và 38 khối ghi chú diễn giả.
- 38 mã trong storyboard trùng tập và đúng thứ tự với 38 mã trong RevealJS.
- Mọi tham chiếu CSS, JavaScript, plugin, KaTeX và SVG đều là đường dẫn tương đối tồn tại trong `2627-1/`.
- KaTeX cục bộ được kết xuất thử lại sau chỉnh sửa; kết quả kiểm định cuối được ghi ở mục hợp nhất năm vai.
- Bốn SVG phân tích XML được và đều có `title`, `desc`; bốn lần nhúng trong HTML có `alt` cụ thể.
- `git diff --check` không báo lỗi trong phạm vi Bài 06. `xmllint` không có trong môi trường, nên kiểm tra XML dùng bộ phân tích chuẩn của Python.
- Kiểm tra tràn ở khung 16:9 và màn hình hẹp vẫn cần Browser hoặc tác tử kiểm thử trực quan độc lập. CSS cục bộ giữ thân bài ở mức `0.80em`, màn hình hẹp `0.78em`; bảng và mã dùng hệ số `0.90em`, nên cỡ hiệu dụng tối thiểu là `0.702em`.

## Các mục bắt buộc cho vòng rà soát độc lập

1. Kiểm toán số học A03–A08 và B03.
2. Kiểm tra quy ước Adam, dấu bước Newton/CG/BFGS, điều kiện giảm chấn và độ phức tạp.
3. Kiểm tra chu trình sáu bước trong storyboard và tính khả thi của 2 LT + 1 BT.
4. Rà đủ sáu chiến lược LLO16, đặc biệt phân biệt tiền huấn luyện, tiếp tục hóa và học theo chương trình.
5. Render 38/38 trang ở $1280\times720$ và khung hẹp; kiểm KaTeX, tràn, alt, điều hướng bàn phím và hash.

## Chỉnh sửa theo kiểm định storyboard

| Yêu cầu | Bằng chứng sau chỉnh sửa |
|---|---|
| Sáu chiến lược LLO16 có minh chứng riêng | Bản đồ hành trình tách sáu hàng; C08.1–3 đo BN, hạ theo khối, Polyak; D07.1–3 đo tiền huấn luyện, tiếp tục và chương trình học. P02 và outline trỏ đúng sáu minh chứng này. |
| Ánh xạ ứng dụng của tiền huấn luyện và tiếp tục | Đã sửa cột ứng dụng thành D07.1 cho tiền huấn luyện và D07.2 cho phương pháp tiếp tục, trùng với cột bài tập tương ứng; cùng một sản phẩm thiết kế vừa là vận dụng vừa là minh chứng đánh giá. |
| C03 giữ $\epsilon>0$ | HTML dùng $\epsilon=0{,}01$, tính $\widehat h\approx(\!-0{,}995,0{,}995)^T$; kết quả với $\epsilon=0$ chỉ xuất hiện dưới dạng giới hạn $\epsilon\to0^+$. |
| C05 phân biệt cập nhật và chu kỳ | Một cập nhật vô hướng có hệ số $1/(1+\alpha)\approx0{,}9901$; một chu kỳ hai tọa độ co biến được truyền theo $1/(1+\alpha)^2\approx0{,}9803$. |
| C06 có ví dụ Polyak tính được | Bốn véc-tơ dao động được cộng và chia trực tiếp, cho $\widehat\theta_4=(0,0)$. |
| C08 đòi dữ kiện và giới hạn | Đề bài yêu cầu cả hai; ghi chú nêu tiêu chí chấm riêng cho từng tình huống. |
| D03 có ví dụ continuation | Chuỗi $J^{(k)}(\theta)=(\theta-k)^2$, $k=0,1,2$, có nghiệm truyền $0\to1\to2$ và bước gradient kiểm được. |
| D07 tách continuation khỏi curriculum | Đề bài và ghi chú chấm riêng thay mục tiêu $J^{(k)}$ với thay phân phối $q_t$; yêu cầu báo kết quả riêng trên phân phối đích. |
| Z04 truy nguyên nguồn | Ghi chú diễn giả chứa URL ổn định cho sách, AdaGrad, Adam, HF, BN; DOI cho curriculum; tập/chương cho Polyak và Nocedal–Wright. |
| Danh mục nguồn và ký hiệu | Loại `sources/lecture6-appro.pdf` khỏi nguồn dùng; sửa ký tự tab thành $\theta$ và $\gamma$. |
| Thời lượng vòng storyboard trước | Phân bổ cũ P/Z 0,15/0,15; A 0,70/0,35; B 0,65/0,25; C 0,30/0,10; D 0,20/0,15 đã đạt tổng 2,00 LT + 1,00 BT nhưng được thay bằng phân bổ mới ở vòng hợp nhất năm vai bên dưới. |

## Hợp nhất năm vai rà soát — vòng 2026-08-30

Không xóa các phát hiện và bằng chứng của vòng trước. Bảng này ghi quyết định mới nhất sau khi đối chiếu đồng thời năm vai.

| Vai rà soát | Vấn đề | Mức | Trang | Quyết định | Trạng thái | Bằng chứng sau sửa |
|---|---|---|---|---|---|---|
| Sinh viên | Dữ kiện A03 thiếu siêu tham số và trạng thái đầu nên A08 không tự đủ để tính. | cao | A03, A06, A08 | sửa | đã xử lý | A03 hiển thị $\rho=0{,}9$, $\beta_1=0{,}9$, $\beta_2=0{,}999$, $\epsilon=10^{-8}$ và phân biệt khởi tạo $r_0=v_0^{\mathrm{RMS}}=m_0^{\mathrm{Adam}}=v_0^{\mathrm{Adam}}=0$; A08 gọi đúng bốn trạng thái rồi hiện trạng thái vòng 2 và kết quả gần đúng. |
| Sinh viên | Mã và bảng nhỏ hơn ngưỡng đọc khi chiếu; C08/D07 buộc đọc đề dài nhưng thiếu khung trả lời. | cao | CSS cục bộ, C08, D07 | sửa | đã xử lý về mã; chờ kiểm trực quan | Thân bài `0.80em`, màn hẹp `0.78em`; bảng/mã `0.90em`, cỡ hiệu dụng nhỏ nhất `0.702em`. C08 và D07 dùng ba cột tín hiệu–can thiệp–phép đo/giới hạn. |
| Chuyên gia | Newton/HF–CG lược điều kiện dương xác định; CG cắt ngắn có thể bị hiểu là luôn cho bước đủ tốt. | nghiêm trọng | B04–B06 | sửa và gộp | đã xử lý | B04 yêu cầu chọn/tăng $\lambda$ để $B\succ0$ hoặc kiểm $g^Tp<0$ trước tìm kiếm đường. B05 nêu $G\succeq0$, $\lambda>0\Rightarrow B\succ0$; ghi chú B06 nêu giới hạn CG cắt ngắn và kiểm giảm ở vòng ngoài. |
| Chuyên gia | BFGS và L-BFGS tách thành hai trang khái niệm nhưng chưa có phép kiểm số. | cao | B07, B08 | gộp và sửa | đã xử lý | B07 gộp công thức, điều kiện cặp cong và bộ nhớ; B08 tính $M_1$, $p=(0{,}25,-1{,}5)^T$, $g^Tp=-2{,}75$. |
| Toán học | A06 viết $g_t^2$ dễ mơ hồ; giá trị tọa độ hai của $\widehat v_2$ chưa đúng bốn chữ số. | cao | A06, A08 | sửa | đã xử lý | A06 dùng $g_t\odot g_t$; A08 dùng $v_2=(0{,}003996,0{,}009999)$ và $\widehat v_{2,2}\approx5{,}0020$. |
| Toán học | LLO15 chưa đo khả năng vận dụng CG/BFGS; chỉ có bài chọn tên công cụ. | nghiêm trọng | P02, B06, B08, B09 | tách minh chứng | đã xử lý | B06 tính hai vòng CG cho $H=\begin{pmatrix}4&1\\1&2\end{pmatrix}$ tới $(2/7,-1/7)^T$; B08 kiểm BFGS; B09 giữ lựa chọn công cụ. P02 và storyboard ánh xạ đủ ba minh chứng. |
| Học thuật–giảng dạy | D03 dùng tịnh tiến mục tiêu nhưng có nguy cơ bị hiểu là làm trơn; chưa nêu cơ chế tăng độ khó. | vừa | D03 | sửa | đã xử lý | Mặt trang gọi đây là “minh họa khởi tạo ấm” và nêu “làm trơn trước; tăng dần độ khó”; ghi chú phân biệt ví dụ tịnh tiến với làm trơn thực sự. |
| Học thuật–giảng dạy | Hai bài LLO16 chưa buộc gắn can thiệp với phép đo và giới hạn; D06/C07 tách rời minh chứng. | cao | C07 cũ, C08, D06 cũ, D07 | gộp và sửa | đã xử lý | C07 được gộp vào C08/Z01; D06 được gộp vào D07. Hai trang đánh giá đều có cùng khung ba cột và ba minh chứng chấm riêng. |
| Mạch kể chuyện | Nhãn thứ ba ở P03 chỉ nói “đổi bài toán” nên không bao quát biểu diễn, khối và quỹ đạo ở mạch C. | vừa | P03 | sửa | đã xử lý | P03 đổi thành “đổi đối tượng can thiệp” và liệt kê biểu diễn, khối, quỹ đạo, tuyến bài toán; ghi chú ánh xạ rõ C và D. |
| Mạch kể chuyện | Bộ trang chiếu 40 trang quá dày; các trang tổng hợp C07/D06 lặp lại nội dung đánh giá. | cao | C07, D06, toàn bài | gộp, bỏ | đã xử lý | Bỏ C07 và D06 dưới dạng trang riêng; nội dung cần thiết được giữ trong C08, D07 và Z01. Deck còn 38 trang, 6 mạch. |
| Học thuật–giảng dạy | Phân bổ cũ dành quá ít lý thuyết cho sáu chiến lược và quá nhiều cho A. | cao | outline, storyboard | sửa | đã xử lý | Phân bổ mới: P+Z $0{,}20/0{,}10$; A $0{,}45/0{,}20$; B $0{,}45/0{,}30$; C $0{,}45/0{,}25$; D $0{,}45/0{,}15$; tổng $2{,}00$ LT + $1{,}00$ BT. |
| Chuyên gia | Z04 ghi sai Buổi 7 và thiếu nguồn cụ thể cho RMSProp; HF xuất hiện dưới dạng viết tắt trước khi mở rộng. | cao | P02, Z04 | sửa | đã xử lý | P02 mở rộng “tối ưu không tạo Hessian (Hessian-free, HF)” ở lần đầu trên mặt trang; Z04 thêm Hinton (2012), bài giảng 6e và sửa phạm vi thành Buổi 6. |

### Quyết định cấu trúc sau hợp nhất

- Giữ 38 trang và 6 mạch. Hai phép tính B06/B08 làm cho LLO15 quan sát được mà không tăng tổng số trang.
- Giữ C08 và D07 làm mã đánh giá ổn định; bỏ riêng C07 và D06, đồng thời truy nguyên quyết định gộp trong storyboard.
- Không thay CSS chung, index, nguồn hoặc tài sản ngoài Bài 06.

### Kiểm định cục bộ sau hợp nhất

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Cấu trúc RevealJS | đạt | 6 `<section>` ngoài; 38 mã `data-slide-id` duy nhất; 38 khối ghi chú diễn giả. |
| Đồng bộ quy trình | đạt | Outline và bảng từng trang trong storyboard có cùng 38 mã, đúng tập và đúng thứ tự với HTML. |
| KaTeX | đạt | Kết xuất thử 212 biểu thức bằng KaTeX cục bộ với `throwOnError`; không có lỗi. Cảnh báo thiếu metric cho hai ký tự tiếng Việt trong chế độ văn bản không làm hỏng kết xuất. |
| Số học | đạt | Kiểm lại bằng tính toán độc lập: AdaGrad, RMSProp, Adam khớp A08; phần dư CG ở nghiệm chỉ còn sai số dấu phẩy động $5{,}55\times10^{-17}$; BFGS cho $g^Tp=-2{,}75$. |
| Tài nguyên | đạt | 14 tham chiếu cục bộ đều tồn tại; 4 SVG đều có `title`, `desc`; 4 thẻ ảnh có `alt`. |
| Cỡ chữ cục bộ | đạt theo CSS | Thân bài tối thiểu `0.78em`; bảng và mã có cỡ hiệu dụng tối thiểu $0{,}78\times0{,}90=0{,}702$ em. Không dùng quy tắc dưới `0.70em`. |
| Khoảng trắng | đạt | `git diff --check` không báo lỗi trong bốn tệp Bài 06. |
| Rà trực quan | chưa xác minh | Phiên tác tử không có Browser tích hợp và runtime Node.js vẫn là 18.19.1; không tuyên bố đã kiểm tràn trực quan bằng Codex Slides. |

## Đóng ba vấn đề vòng cuối — 2026-08-30

Các mục của những vòng trước được giữ nguyên để truy nguyên quyết định tại thời điểm rà soát. Bảng dưới đây là trạng thái mới nhất và thay thế các mã trang cũ khi có đổi mã.

| Vai rà soát | Vấn đề | Mức | Trang | Quyết định | Trạng thái | Bằng chứng sau sửa |
|---|---|---|---|---|---|---|
| Sinh viên | A03 mới chỉ cho dữ kiện nên người học phải đọc ba công thức trước khi hiểu các trạng thái lưu loại lịch sử nào; ký hiệu $v_t$ của RMSProp và Adam dễ bị nhập làm một. A08 tính số nhưng chưa buộc so sánh. | cao | A03, A08 | sửa | đã đóng | A03 hiển thị khởi tạo $r_0=v_0^{\mathrm{RMS}}=m_0^{\mathrm{Adam}}=v_0^{\mathrm{Adam}}=0$, đủ $\rho=0{,}9$, $\beta_1=0{,}9$, $\beta_2=0{,}999$, rồi hiện tuần tự bằng fragment $r_1=(4,1)$, $v_1^{\mathrm{RMS}}=(0{,}4,0{,}1)$, $m_1^{\mathrm{Adam}}=(0{,}2,0{,}1)$ và $v_1^{\mathrm{Adam}}=(0{,}004,0{,}001)$ trước A04–A06. Storyboard ghi rõ Ví dụ = A03. A08 gọi đúng bốn trạng thái và siêu tham số này, tính vòng hai và có cột so sánh `nhớ toàn bộ / quên dần / hướng và thang`; ghi chú giải thích đáp án. |
| Học thuật–giảng dạy | Bài đánh giá tuyến huấn luyện còn chung chung, đáp án lộ sẵn và chưa buộc nộp đủ ba phương án có phép đo cùng giới hạn. | cao | D06, trước đây D07 | sửa và đổi mã | đã đóng | D06 cho ba tình huống cụ thể: 200/50.000 nhãn, chuỗi mục tiêu ngày càng ít làm trơn và chuỗi dài làm gradient tăng vọt. Đề yêu cầu nộp ba phương án. Sáu ô đáp án `Can thiệp` và `Phép đo / giới hạn` dùng fragment; ghi chú có đáp án và tiêu chí chấm cho từng phương án. |
| Mạch kể chuyện | Tám trang P+Z làm phần mở–kết dài và lặp; mã C08/D07 có khoảng trống sau các lần gộp; phân bổ thời lượng chưa phản ánh ưu tiên vòng cuối. | cao | P01–P02 cũ, P03 cũ, C08 cũ, D07 cũ, Z03–Z04 cũ | gộp, đổi mã và sửa thời lượng | đã đóng | Gộp P01+P02 thành P01 nhưng giữ trang tiêu đề P00 và bản đồ ở P02; gộp Z03+Z04 thành Z03 với URL chi tiết trong ghi chú. Đổi C08→C07 và D07→D06, nên mọi mạch có mã liên tục. Deck còn 36 trang. Phân bổ mới: P+Z $0{,}30/0{,}20$; A $0{,}40/0{,}20$; B $0{,}40/0{,}30$; C $0{,}45/0{,}20$; D $0{,}45/0{,}10$, tổng đúng 2 LT + 1 BT. |

### Kiểm định cục bộ vòng cuối

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Cấu trúc RevealJS | đạt | 6 `<section>` ngoài; 36 mã `data-slide-id` duy nhất; 36 khối ghi chú diễn giả. |
| Mã liên tục | đạt | P00–P02, A01–A08, B01–B09, C01–C07, D01–D06, Z01–Z03; không còn mã hiện hành P03, C08, D07 hoặc Z04. |
| Đồng bộ quy trình | đạt | Outline và bảng từng trang trong storyboard cùng có 36 mã, trùng tập và đúng thứ tự với HTML. |
| KaTeX | đạt | Kết xuất thử 224 biểu thức bằng KaTeX cục bộ với `throwOnError`; không có lỗi. Cảnh báo metric cho ký tự tiếng Việt trong chế độ văn bản không làm hỏng kết xuất. |
| Tài nguyên | đạt | 14 tham chiếu cục bộ đều tồn tại; không thêm hoặc sửa tài sản hình. |
| Tương tác | đạt về cấu trúc | A03 có 4 fragment; D06 có 6 fragment cho đúng hai cột đáp án của ba tình huống. |
| Khoảng trắng | đạt | `git diff --check` không báo lỗi trong bốn tệp Bài 06. |
| Rà trực quan | chưa xác minh | Phiên tác tử không có Browser tích hợp và runtime Node.js là 18.19.1; không tuyên bố đã kiểm tràn bằng Codex Slides. |

## Đóng lỗi mã nội bộ trong nội dung — 2026-08-30

| Vai rà soát | Vấn đề | Mức | Trang | Quyết định | Trạng thái | Bằng chứng sau sửa |
|---|---|---|---|---|---|---|
| Học thuật–giảng dạy | Mã vị trí nội bộ xuất hiện trên mặt trang hoặc trong ghi chú, trái quy ước trình chiếu. | cao | A03, A08 | Thay mã bằng quan hệ ngữ nghĩa giữa các trang. | đã đóng | Mặt A03 dùng “ba thuật toán tiếp theo”; A08 gọi “ví dụ vòng đầu”. Quét văn bản sau khi loại thuộc tính, `style` và `script` không còn mã dạng chữ cái–hai chữ số. |

## Kiểm định kỹ thuật và trực quan cuối — 2026-08-30

- Codex Slides đã được mở trước khi triển khai nhưng không tạo được dự án bền vững: Node.js cục bộ là 18.19.1 trong khi plugin yêu cầu từ 20; manifest plugin và gói gốc cũng lệch phiên bản. Lỗi máy chủ là `ReferenceError: File is not defined`. Không tuyên bố đã kiểm định bằng Codex Slides.
- `python3 -m reloadserver 8765` không khả dụng vì môi trường thiếu mô-đun `reloadserver`. Dùng máy chủ HTTP cục bộ làm cơ chế dự phòng; tệp HTML và 14 tài nguyên cốt lõi đều trả mã HTTP 200.
- Chromium kết xuất đủ 36 trang ở $1280\times720$ và $720\times1280$. Ảnh toàn bộ trang đã được rà trực quan; không có hình, công thức hoặc nội dung bị cắt ở phiên bản cuối.
- Phép đo hộp bao phát hiện C02 và D03 có công thức vượt biên ngang trong bản trước. C02 được tách công thức thống kê và phép biến đổi; D03 rút gọn chuỗi mục tiêu và tách ví dụ. Kiểm lại toàn bộ 36 trang ở cả hai khung cho kết quả 0 trang tràn.
- Cấu trúc cuối có 6 mạch, 36 mã duy nhất và 36 ghi chú. Có 225 biểu thức KaTeX; trình duyệt không báo lỗi công thức. Điều hướng bàn phím chuyển từ `#/1/1` sang `#/1/2`; `hash: true` và `hashOneBasedIndex: true` hoạt động.
- Chỉ có yêu cầu `/favicon.ico` không thuộc tài nguyên cốt lõi trả 404; lỗi này không ảnh hưởng bộ trang chiếu.

## Cổng storyboard sau hợp nhất — 2026-08-30

- Giữ nguyên lịch sử các vòng 38 trang và 36 trang ở trên. Trạng thái hiện hành có 36 mã, 6 mạch; tập mã và thứ tự trong outline, storyboard và RevealJS trùng nhau.
- Cụm A đã đồng bộ bốn trạng thái $r_1$, $v_1^{\mathrm{RMS}}$, $m_1^{\mathrm{Adam}}$, $v_1^{\mathrm{Adam}}$ từ ví dụ tới công thức và bài tập. Ba thẻ fragment cùng hộp nối ở A03 khớp giữa storyboard và HTML.
- Cụm Z dùng chu trình rút gọn `nhu cầu → hình thức → kiểm tra`: Z01 vừa đặt lại nhu cầu quyết định vừa hình thức hóa bảng ánh xạ; Z02 kiểm tra tổng hợp–lựa chọn. Các bước trực quan và ví dụ được ghi `không áp dụng` vì cụm không đưa khái niệm mới; Z03 là ranh giới, tài liệu và chuyển tiếp, không bị gán sai thành bước hình thức.
- Z02 không đo lại các phép tính đã được A08, B06 và B08 kiểm tra. Trang này đo khả năng phối hợp bốn lựa chọn; mỗi lựa chọn phải kèm phép đo kiểm chứng và một giới hạn.
- Vòng hợp nhất hiện tại sửa thêm ký hiệu RMSProp/Adam, định nghĩa $a_{t,j}$, xấp xỉ giảm chấn lớn, tính tự chứa của ví dụ CG, ánh xạ LLO/CLO và nguồn Bengio và cộng sự (2009) cho ví dụ học theo chương trình. Không thêm, gộp, tách hoặc bỏ trang.
- GLM 5.3 Flash qua OpenRouter đã rà bản sao giới hạn chỉ gồm các tệp được người dùng cho phép. Metadata runtime: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`; không cung cấp PDF, trích xuất PDF, danh mục MIT, `.env`, khóa API hoặc dữ liệu xác thực cho worker.

## Đóng lỗi hiển thị sau hợp nhất — 2026-08-30

- A03 tràn dọc 157 px khi hiện đủ fragment. Giữ nguyên cỡ chữ, dữ kiện và bốn trạng thái; bỏ ba câu giải thích lặp trong thẻ và rút hộp tổng hợp thành ba cơ chế nhớ.
- D03 vượt ngang 8 px ở khung rộng. Giữ nguyên công thức và cỡ chữ; giảm riêng khoảng cách lưới của trang từ `0.7em` xuống `0.35em`, không đổi CSS dùng chung.
- Ghi chú Z02 bổ sung đủ checkpoint Adam gồm $\theta_t,m_t^{\mathrm{Adam}},v_t^{\mathrm{Adam}},t$ và điều kiện HF–CG $G\succeq0$, $\lambda>0\Rightarrow B=G+\lambda I\succ0$; phép đo cùng giới hạn được giữ.

## Kiểm định bàn giao của điều phối viên — 2026-08-30

- Tái kiểm cuối bằng GLM 5.3 Flash qua OpenRouter đạt ở bốn phạm vi bị tác động: sinh viên, toán học, học thuật–giảng dạy và mạch kể chuyện. Ký hiệu RMSProp/Adam, ví dụ CG, phép đo–giới hạn Z02 và cụm kết luận đều đạt.
- Chromium duyệt lại đủ 36/36 trang tại $1280\times720$, $800\times600$ và $720\times900$ qua máy chủ tạm `127.0.0.1:8876`. Cổng 8765 đang thuộc tiến trình khác nên không bị thay đổi trong vòng này. Cả ba khung có 0 tràn, 0 lỗi console, 0 lỗi trang và 0 yêu cầu tải thất bại.
- Ảnh A03 với toàn bộ fragment và ảnh D03 được xem trực tiếp sau sửa. A03 giữ cỡ chữ và đủ bốn trạng thái; D03 giữ công thức, hình và luận điểm trong khung.
- Thẻ viewport cho phép phóng to và favicon dữ liệu rỗng loại yêu cầu 404. Kiểm tra tĩnh giữ 6 section ngoài, 36 ID duy nhất, 36 ghi chú, 36 đoạn nguồn và 14/14 tham chiếu cục bộ hợp lệ; `git diff --check` sạch.
- Codex Slides vẫn không có bằng chứng render trực quan thành công do giới hạn runtime đã ghi ở trên. Kết luận bàn giao chỉ dựa trên RevealJS cục bộ và không tuyên bố cổng Codex Slides đã đạt.
