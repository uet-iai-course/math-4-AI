# Storyboard Bài 01: ứng dụng trước lý thuyết

Trạng thái hiện hành (2026-10-12): 52 trang lá, 52 mã `data-slide-id` duy nhất, bảy `<section>` ngoài. Mỗi mạch trừ mạch mở đầu mở bằng một trang tiêu đề mạch (`section.strand-title`, `id="mach-N"`). Bảng theo từng trang khớp thứ tự DOM.

## Bản đồ bảy mạch kể chuyện

| Mạch | Trang tiêu đề | Chức năng | Điểm vào | Đầu ra dùng cho mạch sau | Phân bổ nội bộ |
|---|---|---|---|---|---:|
| 1. Mở đầu và ba bài toán tối ưu | `M01` (bìa) | Định hướng học phần, cách đánh giá, mục tiêu, nội dung, nhu cầu của bài | Kiến thức tiên quyết | Ba quyết định cần mô hình hóa | 0,15 tiết lý thuyết |
| 2. Điều khiển một bước | `D00` | Xây trường hợp có đánh đổi, ràng buộc và nghiệm biên | Nhu cầu bám đích có giới hạn | Mô hình $\min_{u\in C}q(u)$, nghiệm $u^*=1$ trên biên với $q'(1)\ne0$ | 0,30 tiết lý thuyết |
| 3. Hồi quy tuyến tính | `L00` | Xây trường hợp học tham số bằng bình phương nhỏ nhất | Dữ liệu dự đoán số | Mô hình $\min_w\lVert Xw-y\rVert^2$ và ví dụ vô số nghiệm | 0,30 tiết lý thuyết |
| 4. Hồi quy logistic | `GT` | Xây trường hợp phân loại có cận dưới đúng nhưng có thể không có nghiệm | Dữ liệu nhãn nhị phân | Mục tiêu $L(w)$ và ví dụ không tồn tại nghiệm | 0,30 tiết lý thuyết |
| 5. Dạng tổng quát của bài toán tối ưu | `T00` | Trừu tượng hóa ba trường hợp bằng cùng một ngôn ngữ | Ba mô hình cụ thể | $\min_{x\in C}f_0(x)$, bốn loại kết luận, sáu bước kiểm tra | 0,20 tiết lý thuyết |
| 6. Tập lồi và hàm lồi | `F00` | Xây đúng các định nghĩa và định lý cần cho sáu bước | Sáu bước kiểm tra | Công cụ về miền, mục tiêu, toàn cục, tồn tại và duy nhất | 0,75 tiết lý thuyết |
| 7. Chứng nhận ba bài toán | `K00` | Ghép công cụ, diễn giải nghiệm, chuyển giao và tổng kết | Bộ công cụ lồi | Ba chứng nhận, bài tập chiếu sáng có lời giải, bảng tổng kết | 1,00 tiết bài tập |

Tổng phân bổ: 2 tiết lý thuyết và 1 tiết bài tập. Mỗi trang tiêu đề mạch dùng khoảng 0,01 tiết lấy từ phân bổ của mạch đó; tổng không đổi. Không đưa phân bổ này lên mặt trang chiếu hoặc vào ghi chú diễn giả.

Tên mạch đổi ngày 2026-10-12 cho khớp trang "Nội dung" và trang tiêu đề mạch: mạch 1 "Mở đầu và ba nhu cầu" → "Mở đầu và ba bài toán tối ưu" (gọi đúng đối tượng của `M03`); mạch 5 "Khuôn chung" → "Dạng tổng quát của bài toán tối ưu" (bỏ khẩu ngữ); mạch 6 "Công cụ lồi vừa đủ" → "Tập lồi và hàm lồi" (cụm danh từ gọi tên khái niệm, khớp tên bài); mạch 7 "Trở lại ba ca" → "Chứng nhận ba bài toán" (gọi tên kết quả, bỏ "ca").

## Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm | Ký hiệu truyền tiếp | LLO/CLO |
|---|---|---|---|---|---|---|---|---|---|
| Điều khiển một bước | M03, D00, D01 | D01 | D03 | D01–D02, T01 | K01 | D04 (lời giải trên mặt trang) | Đại số một biến → lập và giải mô hình bị chặn | $x_0,t,u,u_{\max},\lambda,q$ → $x,C,f_0$ | LLO1, CLO1 |
| Hồi quy tuyến tính | M03, L00, L01 | L01 | L01, L03 | L01B–L03, T01 | K02 | L04 (lời giải trên mặt trang) | Dữ liệu cân nặng–chiều cao và đại số tuyến tính → lập mô hình, chọn hàm mất mát và đọc nghiệm | $m,h,b,a$ → $X,y,w,J$ → $x,C,f_0$ | LLO1, CLO1 |
| Hồi quy logistic | M03, GT, G00 | G00, G01, G03 | G00, G03 | G01–G03, T01 | K03 | G04 (lời giải trên mặt trang) | Dữ liệu nhãn nhị phân và hàm mũ → lập mô hình biên tuyến tính, rồi phân biệt cận dưới đúng với nghiệm | $z_1,z_2,y$ → $a_i,y_i,w,L$ → $x,C,f_0$ | LLO1, CLO1 |
| Tập lồi | T04, F00, F01 | F01 | F03 | F02, F04 | F05, K01–K03 | F05 (lời giải trên mặt trang) | Đoạn thẳng và tập hợp → chứng nhận miền lồi | $C,x,y,\theta$ | LLO2, CLO1 |
| Hàm lồi | T04, F00, H01 | H01, H03, H07 | H05, H06 | H02–H07 | K01–K04 | H07B (lời giải trên mặt trang) | Đạo hàm, Hessian → kiểm tra mục tiêu lồi, lồi chặt; điều kiện tồn tại | $f,\nabla f,\nabla^2f$ | LLO2, CLO1 |
| Dạng tổng quát và các loại kết luận | G04, T00 | T01 (sơ đồ) | D02, L02, G02 (ba mô hình đã có) | T01, T03 | T02, T04 | K06 (câu hỏi tự kiểm tra), K05 phần (1) | Ba mô hình → $\min_{x\in C}f_0(x)$, năm loại kết luận, sáu bước kiểm tra | $x,f_0,C,p^*$ | LLO1, CLO1 |
| Chứng nhận | K00 | K04 (bảng đối chiếu) | K01–K03 | K06 (quy trình bốn bước), K07 | K05, K05B | K05–K05B (lời giải trên mặt trang, trùng Bài 9 phần 1–4 của tệp bài tập) | Công cụ lồi → chứng nhận từng kết luận cho mô hình mới | $u^*,w^*,L_\mu$ | LLO1, LLO2, CLO1 |

Ví dụ dẫn nhập L01 cụ thể hóa nhu cầu dự đoán số trước khi L01B khái quát sang nhiều đặc trưng và L02 chọn hàm mất mát. Các ví dụ D03, L03 và G03 được đặt trước định nghĩa lồi để làm rõ nhu cầu chứng nhận. Ký hiệu của chúng được giữ nguyên tại K01–K03. Không bước nào bị bỏ ngầm. Hai bước trực quan và ví dụ được gộp ở D01–D03, L01–L03 và G03 vì mỗi trang vẫn giữ một luận điểm trung tâm.

Ngoại lệ thứ tự (ghi theo tái kiểm 2026-10-12, không đảo cấu trúc deck trong đợt này):

- Bài tập đứng trước ứng dụng ở mọi cụm (D04, L04, G04 trước K01–K03; F05, H07B trước K01–K04). Lý do: bài học theo hướng "ứng dụng trước lý thuyết", nên ứng dụng của công cụ lồi vào ba bài toán dồn về mạch 7; bài tập trong mạch kiểm tra đúng khái niệm vừa xây.
- Ví dụ đứng sau phát biểu hình thức ở D02 → D03, F02 → F03, H02 → H05/H06. Lý do: D03 và F03, H05, H06 là ví dụ cần định nghĩa để kiểm tra. Ví dụ dẫn nhập đã đứng trước ở trang nhu cầu hoặc trực quan: D01 (sơ đồ có dữ kiện), ghi chú F01 (tác động trộn $2\theta-1$ trên $[-1,1]$), ghi chú H02 ($x^2$, $x$).
- Chứng nhận: hình thức K06 đứng trước bài tập K05–K05B (đã chuyển K06 lên trước K05 ngày 2026-10-12); ví dụ K01–K03 đứng trước hình thức, theo lối quy nạp từ ba lần chứng nhận.

Trang tiêu đề mạch: D00, L00 và GT có dòng dẫn nêu đúng nhu cầu của khái niệm đầu tiên trong mạch (tác động bị giới hạn, tham số khớp dữ liệu số, tham số cho quyết định hai lớp), nên được ghi là bước `nhu cầu` của cụm tương ứng. F00 nêu nhu cầu của cả hai cụm tập lồi và hàm lồi (giả thiết trên $C$ và $f_0$), nên được ghi là bước `nhu cầu` cùng T04. T00 và K00 là bước `nhu cầu` của hai cụm "Dạng tổng quát và các loại kết luận" và "Chứng nhận" (thêm theo tái kiểm 2026-10-12).

## Bảng theo từng trang

Cột "Vị trí trong khung" ghi bước của sườn lý thuyết chung (bài toán → mô hình → câu hỏi về nghiệm → dạng tổng quát → công cụ lồi → chứng nhận). Cột "Âm tiết" ghi số âm tiết chữ trên mặt trang sau đợt sửa 2026-10-12 (trước → sau cho trang từng vượt trần 60, hoặc 80 với trang mục tiêu, nội dung, tổng kết và bảng so sánh).

| Mã | Tiêu đề | Lý do tồn tại và khoảng trống được giải quyết | Kết nối vào → kết nối ra | Vị trí trong khung | LLO/CLO | Âm tiết | Quyết định |
|---|---|---|---|---|---|---|---|
| M01 | Giới thiệu tối ưu, tập lồi và hàm lồi | Bìa, trang tiêu đề của mạch 1; định danh bài, học phần, học kỳ và đơn vị | Mở bài → M01A | Điểm vào mạch 1 | CLO1 | 28 | `giữ` |
| M01A | Hai phần của học phần | Định vị Bài 01 trong hai phần tối ưu hóa và mô hình xác suất | M01 → M01B | Ngoài sườn; định hướng | Định hướng CLO1–CLO4 | 104 → 57 | `sửa`: mỗi thẻ còn hai dòng chủ đề theo đề cương; câu mô tả từng phần và câu kết nối hai phần chuyển xuống ghi chú; ghi chú không còn mở bằng "Trang …" |
| M01B | Kiểm tra và đánh giá | Ba thành phần điểm và hai buổi cuối kỳ | M01A → M02 | Ngoài sườn; định hướng | Hỗ trợ CLO5 | 79 → 59 | `sửa`: rút ô bảng, gộp thang điểm 10 vào công thức điểm; ghi chú mở bằng đối tượng ("Kết quả học tập …") |
| M02 | Mục tiêu học tập | Bốn việc sinh viên phải làm được sau bài | M01B → M02B | Sản phẩm học tập của cả sườn | LLO1, LLO2, CLO1 | 74 → 59 | `sửa`: bốn thẻ thành danh sách đánh số khớp bốn mục tiêu của `outline.md`; mục 4 gộp thẻ "Quay lại các ví dụ" |
| M02B | Nội dung | Trang "Nội dung" bắt buộc của mạch mở đầu; liệt kê đánh số 1–7 đúng tên các trang tiêu đề mạch | M02 → M03 | Bản đồ sườn | Định hướng LLO1, LLO2 | 37 | `thêm`: tách trang riêng vì `M02` đã có bốn mục tiêu (gộp sẽ thành 11 dòng); ngoại lệ 7 dòng vì bài có 7 mạch |
| M03 | Một số bài toán tối ưu trong điều khiển và AI | Ba quyết định cụ thể và nhu cầu trung tâm; đóng vai trang "Ngữ cảnh" | M02B → D00 | Bài toán trung tâm | LLO1, CLO1 | 63 → 47 | `sửa`: câu hỏi không nhãn "Vấn đề trung tâm: … ?" thành câu trần thuật dưới nhãn "Nhu cầu:"; bỏ ba mũi tên trang trí; chú thích mỗi hình gom vào một đoạn |
| D00 | 2. Điều khiển một bước | Trang tiêu đề mạch 2 (yêu cầu người dùng 2026-10-12); dòng dẫn nêu nhu cầu chọn tác động bị giới hạn | M03 → D01 | Điểm vào mạch 2; đảm nhận bước `nhu cầu` của cụm điều khiển | Hỗ trợ LLO1 | 26 | `thêm`; không xử lý bằng sửa D01 vì D01 mang dữ kiện và sơ đồ |
| D01 | Dữ kiện của bài toán điều khiển | Xác định dữ kiện, động lực, biến và miền bằng sơ đồ trạng thái–tác động–chi phí | D00 → D02 | Mô hình: dữ kiện, biến, miền | LLO1, CLO1 | 19 | `sửa`: đổi tiêu đề "Bài toán điều khiển một bước" vì trùng tên mạch; ghi chú bỏ "trang xác định" |
| D02 | Hàm chi phí bám đích và năng lượng | Gộp hai yêu cầu thành một hàm chi phí và viết bài toán | D01 → D03 | Mô hình: hàm mục tiêu | LLO1, CLO1 | 58 → 29 | `sửa`: bỏ câu "Mô hình: quan niệm chủ quan của con người về thế giới", bỏ viết hoa giữa tiêu đề và tiền tố "Tối ưu nhiều mục tiêu:"; hai thẻ còn một câu mỗi thẻ; dòng về $u_{\max}$ xuống ghi chú; định nghĩa mô hình viết bằng "là" |
| D03 | Ví dụ: bài toán điều khiển với bộ số cụ thể | Ví dụ tính được: nghiệm tự do ngoài miền, nghiệm tối ưu trên biên | D02 → D04 | Mô hình: nghiệm cụ thể | LLO1, CLO1 | 23 → 39 | `sửa` theo mẫu trang ví dụ: dữ kiện có số → "Tính …" → bước → "Diễn giải:"; bỏ hai thẻ (7 dòng → 5) |
| D04 | Bài tập: nghiệm tối ưu trên biên | Bài tập có lời giải mẫu trên mặt trang cho cụm điều khiển; tách điều kiện $q'=0$ khỏi nghiệm biên | D03 → L00 | Câu hỏi về nghiệm: nghiệm biên | LLO1, CLO1 | 58 → 43 | `sửa`: câu hỏi viết thành nhiệm vụ chứng minh, lời giải hiện bằng `fragment`, câu kết dạng "Lưu ý:"; dữ kiện $q$, $C$ nêu lại |
| L00 | 3. Hồi quy tuyến tính | Trang tiêu đề mạch 3; dòng dẫn nêu nhu cầu chọn tham số khớp dữ liệu số | D04 → L01 | Điểm vào mạch 3; đảm nhận bước `nhu cầu` của cụm hồi quy tuyến tính | Hỗ trợ LLO1 | 31 | `thêm`, theo yêu cầu người dùng |
| L01 | Bài toán dự đoán giá trị số | Ví dụ dẫn nhập cân nặng–chiều cao và câu hỏi về độ khớp | L00 → L01B | Bài toán: dự đoán số | LLO1, CLO1 | 35 → 33 | `sửa`: thẻ mở bằng "Muốn …"; bỏ nhãn "Giả thuyết mô hình:" ngoài danh sách nhãn |
| L01B | Hồi quy tuyến tính nhiều đặc trưng | Khái quát sang ma trận thiết kế; hàng là mẫu, cột là đặc trưng, cột số một tạo hệ số chặn | L01 → L02 | Mô hình: $\widehat y=Xw$ | LLO1, CLO1 | 61 → 35 | `sửa`: bỏ tiêu đề thẻ và hai khung "Hàng/Cột" (12 dòng → 6); câu về mức ảnh hưởng của $w_j$ chuyển xuống ghi chú |
| L02 | Bình phương nhỏ nhất | Chọn tổng bình phương phần dư làm hàm mục tiêu | L01B → L03 | Mô hình: hàm mục tiêu $J$ | LLO1, CLO1 | 39 | `sửa`: nhãn "Mô hình:" ngoài danh sách thành "Lưu ý:"; 2026-10-12: đầu vào của hình và ghi chú đổi $t\to s$ để không trùng đích $t$ |
| L03 | Ví dụ: hồi quy trên ba điểm | Tính nghiệm, phần dư và giá trị tối ưu | L02 → L04 | Mô hình: nghiệm cụ thể | LLO1, CLO1 | 38 | `sửa` theo mẫu trang ví dụ (dữ kiện → "Tính …" → phương trình chuẩn → "Diễn giải:"); 4 khối công thức → 2; 2026-10-12: $(t_i,y_i)\to(s_i,y_i)$, $b+at_i\to b+as_i$ |
| L04 | Bài tập: cột trùng trong ma trận thiết kế | Bài tập có lời giải mẫu trên mặt trang cho cụm hồi quy tuyến tính; tạo nhu cầu phân biệt tồn tại và duy nhất | L03 → GT | Câu hỏi về nghiệm: duy nhất | LLO1, CLO1 | 79 → 42 | `sửa`: dữ kiện $X'$, $y$ nêu trên mặt trang; lời giải hiện bằng `fragment`; câu chốt chuyển sang ghi chú; lời giải nêu tập tối ưu đầy đủ và vai trò của hạng (tái kiểm toán) |
| GT | 4. Hồi quy logistic | Trang tiêu đề mạch 4 (mã `GT` vì `G00` đã có); nhu cầu học tham số cho nhãn $\pm1$, khoảng trống: mục tiêu của hồi quy tuyến tính không đo được độ đúng của nhãn | L04 → G00 | Điểm vào mạch 4; đảm nhận bước `nhu cầu` của cụm hồi quy logistic | Hỗ trợ LLO1 | 33 | `thêm`, theo yêu cầu người dùng |
| G00 | Phân loại chất lượng cam trên dây chuyền | Ví dụ dẫn nhập: hai đặc trưng đo từ ảnh và nhãn chất lượng | GT → G01 | Bài toán: phân loại | LLO1, CLO1 | 45 → 40 | `sửa`: bỏ ba tiêu đề thẻ (8 dòng → 4), bỏ lớp `compact-cards` |
| G01 | Bài toán phân loại bằng biên tuyến tính | Định nghĩa biên có dấu và đọc dấu của nó | G00 → G02 | Mô hình: biên có dấu | LLO1, CLO1 | 50 → 42 | `sửa`: nhãn "Định nghĩa." cho $m_i$; ba thẻ dấu thành danh sách ba dòng; câu kết xuống ghi chú |
| G02 | Mất mát logistic | Xây mục tiêu từ từng biên có dấu, nêu miền $\mathbb R^d$ | G01 → G03 | Mô hình: hàm mục tiêu $L$ | LLO1, CLO1 | 27 → 23 | `sửa`: bỏ dòng trùng "Biến quyết định" (7 dòng → 6) |
| G03 | Ví dụ: hai mẫu tách tuyến tính | Ví dụ số có mất mát giảm mãi nhưng không đạt cận dưới | G02 → G04 | Mô hình: nghiệm cụ thể (không tồn tại) | LLO1, CLO1 | 10 → 20 | `sửa`: tiêu đề theo mẫu "Ví dụ: …"; thêm dòng "Tính …" và "Diễn giải:" theo tái kiểm, khung kết quả thành dòng diễn giải |
| G04 | Bài tập: dãy tốt dần và nghiệm tối ưu | Bài tập có lời giải mẫu trên mặt trang cho cụm logistic; phân biệt dãy tối ưu hóa với nghiệm | G03 → T00 | Câu hỏi về nghiệm: tồn tại | LLO1, CLO1 | 58 → 52 | `sửa`: dữ kiện $L(w)$ nêu lại; lời giải hiện bằng `fragment`; định nghĩa dãy tối ưu hóa ở ghi chú |
| T00 | 5. Dạng tổng quát của bài toán tối ưu | Trang tiêu đề mạch 5; nhu cầu so sánh các kết luận về nghiệm của ba bài toán trong một ngôn ngữ | G04 → T01 | Điểm vào mạch 5; bước `nhu cầu` của cụm dạng tổng quát | Hỗ trợ LLO1 | 33 | `thêm`, theo yêu cầu người dùng |
| T01 | Ba thành phần của bài toán tối ưu | Rút cấu trúc chung sau ba trường hợp | T00 → T02 | Dạng tổng quát | LLO1, CLO1 | 12 | `sửa`: đổi tiêu đề "Bài toán tối ưu tổng quát" vì gần trùng tên mạch; ghi chú bỏ "trang đặt tên" |
| T02 | Ba bài toán trong dạng tổng quát | Kiểm tra nghĩa của dữ kiện, $x$, $f_0$ và $C$ trong từng bài toán | T01 → T03 | Dạng tổng quát | LLO1, CLO1 | 37 → 32 | `sửa`: tiêu đề bỏ chữ số đầu câu và "đã học"; khung còn một câu ngắn |
| T03 | Các loại kết luận về nghiệm | Phân biệt khả thi, giá trị tốt nhất, toàn cục, tồn tại, duy nhất; nối với bộ ba toàn cục–tồn tại–duy nhất của M02 | T02 → T04 | Câu hỏi về nghiệm: phân loại | LLO1, LLO2, CLO1 | 48 → 51 | `sửa`: bốn thẻ thành bảng hai cột (9 dòng → 4); thêm dòng "Toàn cục" theo tái kiểm; "Lưu ý:" nêu bộ ba cần giả thiết riêng |
| T04 | Sáu bước kiểm tra một mô hình | Chuyển bốn loại kết luận thành sáu bước dẫn vào công cụ lồi | T03 → F00 | Câu hỏi về nghiệm → nhu cầu công cụ | LLO1, LLO2, CLO1 | 44 → 52 | `sửa`: sáu câu hỏi không nhãn viết thành sáu nhiệm vụ; đổi tiêu đề "Các câu hỏi"; thêm "hay không" |
| F00 | 6. Tập lồi và hàm lồi | Trang tiêu đề mạch 6; dòng dẫn nêu nhu cầu giả thiết trên $C$ và $f_0$ | T04 → F01 | Điểm vào mạch 6; đảm nhận bước `nhu cầu` của hai cụm tập lồi, hàm lồi (cùng T04) | Hỗ trợ LLO2 | 33 | `thêm`, theo yêu cầu người dùng; dòng từ khóa không dùng "lồi chặt" để thuật ngữ này xuất hiện lần đầu ở H02 |
| F01 | Đoạn nối giữa hai phương án | Trực giác miền chứa trọn đoạn nối | F00 → F02 | Công cụ: tập lồi (trực quan) | LLO2, CLO1 | 30 → 32 | `sửa`: câu kết mang nhãn "Trực quan." |
| F02 | Định nghĩa tập lồi | Lượng từ và miền của hệ số tổ hợp lồi | F01 → F03 | Công cụ: tập lồi (định nghĩa) | LLO2, CLO1 | 32 | `giữ` |
| F03 | Các tập lồi dùng trong ba ví dụ | Bốn họ tập lồi cơ bản kèm lý do | F02 → F04 | Công cụ: tập lồi (ví dụ) | LLO2, CLO1 | 46 → 29 | `sửa`: bốn thẻ thành bảng "Tập / Dạng / Lý do lồi" (9 dòng → 3) |
| F04 | Xây miền lồi từ các tập đơn giản | Giao và nghịch ảnh affine | F03 → F05 | Công cụ: phép giữ tính lồi của tập | LLO2, CLO1 | 29 → 13 | `sửa`: hai dòng "Dùng để …" chuyển xuống ghi chú |
| F05 | Bài tập: miền khả thi của ba bài toán | Bài tập có lời giải mẫu trên mặt trang cho cụm tập lồi | F04 → H01 | Chứng nhận miền | LLO2, CLO1 | 41 → 53 | `sửa`: cột căn cứ (đáp án lộ sẵn) thành "Lời giải:" hiện bằng `fragment` |
| H01 | Dây cung và đồ thị hàm | Trực giác dây cung trước bất đẳng thức | F05 → H02 | Công cụ: hàm lồi (trực quan) | LLO2, CLO1 | 27 | `sửa`: câu kết mang nhãn "Trực quan." |
| H02 | Định nghĩa hàm lồi | Lồi và lồi chặt (còn gọi là lồi nghiêm ngặt) trên miền lồi | H01 → H03 | Công cụ: hàm lồi (định nghĩa) | LLO2, CLO1 | 29 → 32 | `giữ`; ghi chú đổi "câu hỏi thứ tư" thành "bước 4"; câu lồi chặt thành "Định nghĩa." + câu, thuật ngữ không làm nhãn (tái kiểm) |
| H03 | Cực tiểu địa phương là toàn cục | Định lý trả lời bước 4 | H02 → H04 | Kết quả: toàn cục | LLO2, CLO1 | 47 → 35 | `sửa` theo mẫu trang kết quả: "Định lý." → "Chứng minh." một dòng; nhãn "Ý tưởng:" ngoài danh sách bỏ; chi tiết chứng minh ở ghi chú |
| H04 | Điều kiện bậc nhất | Tiêu chuẩn tương đương qua gradient | H03 → H05 | Công cụ: kiểm tra hàm lồi | LLO2, CLO1 | 38 → 42 | `sửa`: hai thẻ thành "Ý nghĩa:" và "Hệ quả." |
| H05 | Điều kiện bậc hai | Tiêu chuẩn Hessian, áp dụng cho $J$ | H04 → H06 | Công cụ: kiểm tra hàm lồi | LLO2, CLO1 | 38 → 43 | `sửa`: thêm nhãn "Định lý.", "Ký hiệu:", "Ví dụ."; dòng về bài toán điều khiển chuyển xuống ghi chú; ghi chú bỏ câu "PSD" không còn khớp hình; thêm điều kiện đủ $\nabla^2f\succ0$ ⇒ lồi chặt và ký hiệu $\succ0$ (tái kiểm toán) |
| H06 | Các phép biến đổi giữ tính lồi | Tổng không âm và hợp affine chứng nhận $J$, $L$ lồi | H05 → H07 | Công cụ: phép giữ tính lồi của hàm | LLO2, CLO1 | 46 → 34 | `sửa`: câu kết 29 âm tiết rút còn một câu 16 âm tiết |
| H07 | Tồn tại và duy nhất | Ba điều kiện đủ cho tồn tại và duy nhất | H06 → H07B | Kết quả: tồn tại, duy nhất | LLO1, LLO2, CLO1 | 65 → 56 | `tách`: câu hỏi về $e^x$ và lời giải sang H07B; bỏ lớp `compact-cards`; ba thẻ gắn nhãn (a), (b), (c) và "Định lý (Weierstrass).", "Mệnh đề." để H07B trích lại |
| H07B | Bài tập: hàm mũ trên tập số thực | Bài tập có lời giải mẫu trên mặt trang cho cụm hàm lồi: đọc giả thiết trước khi dùng mệnh đề | H07 → K00 | Kết quả: giới hạn của lồi chặt | LLO2, CLO1 | 55 | `thêm` (tách từ H07); lời giải hiện bằng `fragment`; câu hỏi nêu lại (a), (b), (c); lời giải nêu $(e^x)''=e^x>0$ và căn cứ $e^x>0$ ở kết luận |
| K00 | 7. Chứng nhận ba bài toán | Trang tiêu đề mạch 7; nhu cầu gắn từng công cụ lồi với từng kết luận về nghiệm | H07B → K01 | Điểm vào mạch 7; bước `nhu cầu` của cụm chứng nhận | Hỗ trợ LLO1, LLO2 | 28 | `thêm`, theo yêu cầu người dùng |
| K01 | Chứng nhận bài toán điều khiển | Ghép miền đóng, bị chặn, lồi với độ cong | K00 → K02 | Chứng nhận | LLO1, LLO2, CLO1 | 42 → 35 | `sửa`: mỗi thẻ một câu (8 dòng → 6) |
| K02 | Chứng nhận hồi quy tuyến tính | Tồn tại luôn có, duy nhất khi hạng cột đầy đủ | K01 → K03 | Chứng nhận | LLO1, LLO2, CLO1 | 56 → 41 | `sửa`: bỏ mã trang "Ví dụ L03" trên mặt trang, nêu lại ba điểm dữ liệu |
| K03 | Chứng nhận hồi quy logistic | Lồi không kéo theo tồn tại; chính quy hóa | K02 → K04 | Chứng nhận | LLO1, LLO2, CLO1 | 35 → 41 | `sửa`: bỏ mã "Trong G03", gọi ví dụ bằng tên đối tượng; gọi tên chính quy hóa bậc hai trên mặt trang |
| K04 | So sánh ba trường hợp | Đặt các kết luận cạnh nhau | K03 → K05 | Chứng nhận: so sánh | LLO1, LLO2, CLO1 | 71 → 70 | `sửa`: bỏ mã "ví dụ G03", rút ô bảng; ngoại lệ: bảng so sánh, trần 80; khung nhấn thành một câu có điều kiện |
| K06 | Quy trình chứng nhận | Quy trình bốn bước (dạng rút gọn của Thuật toán 01.1) và câu hỏi tự kiểm tra; ghi chú nêu ánh xạ với sáu bước T04 và chín bước của Thuật toán 01.1 | K04 → K05 | Phương pháp | LLO1, LLO2, CLO1 | 80 → 56 | `tách`: tài liệu chuyển sang K08; `sửa` thứ tự 2026-10-12: chuyển lên trước K05 vì bài tập chiếu sáng dùng chính quy trình này |
| K05 | Bài tập: phân bố công suất chiếu sáng | Bài tập chuyển giao (Bài 9 của tệp bài tập, phần 1–4) | K06 → K05B | Chứng nhận cho bài toán mới | LLO1, LLO2, CLO1 | 41 → 46 | `sửa`: tiêu đề theo mẫu "Bài tập: …" khớp tên Bài 9; câu hỏi thêm phần tồn tại cho khớp tệp bài tập |
| K05B | Bài tập: phân bố công suất chiếu sáng, lời giải | Lời giải mẫu trên mặt trang, trang kế tiếp cùng tiêu đề; trùng lời giải Bài 9 phần 1–4 | K05 → K07 | Chứng nhận cho bài toán mới | LLO1, LLO2, CLO1 | 54 | `thêm`: lời giải trước đây chỉ ở ghi chú; phần 5 (ràng buộc $c^Tp\le P$) ở ghi chú |
| K07 | Tổng kết | Bảng "kết quả / giả thiết đủ / công cụ kiểm tra" theo mục "Mở bài và kết bài" của AGENTS.md; trả lời câu hỏi K06; ghi chú nối với mục tiêu học tập | K05B → K08 | Tổng hợp sườn | LLO1, LLO2, CLO1 | 72 | `thêm`; trang tổng kết, trần 80; tiêu đề cột đổi "không được bỏ" → "giả thiết đủ" theo tái kiểm toán |
| K08 | Tài liệu đọc | Nguồn truy nguyên và liên hệ Bài 02 | K07 → Bài 02 | Ngoài sườn | CLO1 | 21 | `thêm` (tách từ K06) |

Ngoại lệ mật độ đã ghi: M02B có 7 dòng vì bài có 7 mạch; K04 có 70 âm tiết và bảng 5 cột (trần 80 của bảng so sánh); K07 có 72 âm tiết (trần 80 của trang tổng kết). Trang tiêu đề mạch được `density.py` tính cả dòng từ khóa; mọi dòng dẫn ≤ 25 âm tiết.

## Ánh xạ trang cũ sang cấu trúc mới

| Trang skeleton cũ | Trang mới | Xử lý |
|---|---|---|
| M01–M03 | M01–M03 | Giữ vai trò, thay toàn bộ câu chữ tạm bằng nội dung hoàn chỉnh |
| U01–U02 | D01–D04 | Tách ca điều khiển thành mô hình, trực quan, ví dụ và kiểm tra |
| U03 | L01, L01B–L04 | Tách hồi quy tuyến tính thành nhu cầu cụ thể, mô hình nhiều đặc trưng, mất mát, ví dụ và kiểm tra |
| U04 | G00–G04 | Thêm ví dụ phân loại cam để tạo cầu nối; tách hồi quy logistic và thêm phản ví dụ không tồn tại nghiệm |
| T01–T02 | T01–T02 | Giữ và bổ sung dữ liệu ánh xạ |
| T03–T04 | H03, T04 | Chuyển địa phương–toàn cục sang mạch công cụ; giữ cầu vào lý thuyết |
| F01–F04 | F01–F04 | Giữ lõi, lược tập và phép không dùng trực tiếp |
| F05 | F05, K01–K03 | Tách kiểm tra miền khỏi chứng nhận hoàn chỉnh |
| H01–H05 | H01–H06 | Tách điều kiện bậc nhất/bậc hai; giới hạn phép bảo toàn |
| K01 | K01–K04 | Tách từng ca và bảng so sánh |
| K02 | K05–K08 | Tách bài tập chuyển giao, lời giải, quy trình, tổng kết và tài liệu |

## Ánh xạ ba bộ trang chiếu MIT theo đúng thứ tự

| Nguồn | Trang nguồn | Quyết định và đích dùng |
|---|---|---|
| lec01 | 1-1 | Bỏ; chỉ là bìa mẫu |
| lec01 | 1-2 | Giữ ý mô hình chung tại T01 |
| lec01 | 1-3 | Gộp vai trò nhu cầu ứng dụng vào M03 |
| lec01 | 1-4 | Giữ ý phân lớp và nhu cầu cấu trúc tại T04 |
| lec01 | 1-5 | Giữ bình phương nhỏ nhất tại L02–L03; thêm ví dụ dẫn nhập tự tạo tại L01 và cầu nối L01B |
| lec01 | 1-6 | Bỏ khỏi tuyến chính; quy hoạch tuyến tính thuộc bài sau |
| lec01 | 1-7–1-8 | Giữ khái niệm bài toán lồi tại H02–H03 và K01–K04 |
| lec01 | 1-9–1-12 | Chuyển thành bài tập chiếu sáng K05, không dùng như ca chính thứ tư |
| lec01 | 1-13 | Dùng để kiểm tra mục tiêu học tập tại M02 |
| lec01 | 1-14 | Giữ quan hệ địa phương–toàn cục tại H03 |
| lec01 | 1-15 | Bỏ lịch sử vì không phục vụ mạch nhân quả của bài |
| lec02 | 2-1–2-2 | Dùng rất nhẹ làm cầu vào F01; không giữ trang giới thiệu riêng |
| lec02 | 2-3 | Giữ định nghĩa tập lồi tại F02 |
| lec02 | 2-4–2-5 | Gộp các ví dụ trực tiếp dùng vào F03 |
| lec02 | 2-6 | Giữ nửa không gian tại F03 |
| lec02 | 2-7–2-10 | Bỏ hoặc chuyển đọc thêm; không phục vụ ba ca |
| lec02 | 2-11–2-13 | Giữ giao và ánh xạ affine tại F04 |
| lec02 | 2-14–2-23 | Bỏ khỏi Bài 01: nón, thứ tự tổng quát, tách và siêu phẳng đỡ |
| lec03 | 3-1 | Bỏ trang giới thiệu riêng |
| lec03 | 3-2 | Giữ định nghĩa tại H02 |
| lec03 | 3-3–3-4 | Gộp vào trực giác H01 và ví dụ H05–H06 |
| lec03 | 3-5–3-6 | Bỏ khỏi tuyến chính |
| lec03 | 3-7 | Giữ điều kiện bậc nhất tại H04 |
| lec03 | 3-8 | Giữ điều kiện bậc hai tại H05 |
| lec03 | 3-9 | Giữ hàm bậc hai tại H05 và L02–L03; bỏ quadratic-over-linear |
| lec03 | 3-10–3-12 | Bỏ hoặc chuyển đọc thêm |
| lec03 | 3-13–3-14 | Giữ tổng không âm và hợp affine tại H06 |
| lec03 | 3-15–3-31 | Bỏ khỏi Bài 01: thư viện rộng, epigraph, Jensen, liên hợp, tựa lồi và log-concavity |

Ánh xạ lec01 được điều phối viên sửa so với đề xuất của một reader: quy hoạch tuyến tính không phải một trong ba ca của bài; bảy mạch cố định là cấu trúc do người dùng yêu cầu, không phải tên mục của MIT.

## Kiểm kê SVG Bài 01

| Tệp | Quyết định | Vị trí hoặc lý do |
|---|---|---|
| `optimization-model-anatomy.svg` | Giữ | T01 |
| `convex-set-and-combination.svg` | Giữ | F01 |
| `convex-concave-strict.svg` | Giữ | H01 |
| `local-versus-global-minimum.svg` | Giữ | H03 |
| `first-second-order-convexity.svg` | Giữ | H05 |
| `existence-and-uniqueness.svg` | Giữ | H07 |
| `logistic-loss-convex-case.svg` | Sửa | G03; ưu tiên miền $\mathbb R$ và trường hợp không đạt nghiệm |
| `one-step-control.svg` | Thêm | D01 |
| `height-weight-regression.svg` | Thêm | L01 |
| `linear-regression-fit.svg` | Thêm | L02 |
| `m03-control-target.svg` | Thêm | M03 |
| `m03-linear-fit-sketch.svg` | Thêm | M03 |
| `m03-logistic-classes.svg` | Thêm | M03 |
| `d03-cost-parabola-feasible.svg` | Thêm | D03 |
| `g00-orange-quality-pipeline.svg` | Thêm | G00; dữ liệu và sơ đồ tự tạo để minh họa hai đặc trưng ảnh |
| `g01-linear-boundary-2d.svg` | Thêm | G01; mặt phẳng đặc trưng, biên qua gốc và vector pháp tuyến |
| `lighting-distribution.svg` | Thêm | K05; minh họa nhiều đèn, nhiều vùng đo và mức sáng mục tiêu |
| `basic-convex-set-library.svg` | Bỏ khỏi tuyến | Rộng hơn nhu cầu ba ca |
| `convex-hull-and-conic-hull.svg` | Bỏ khỏi tuyến | Nón lồi không thuộc phạm vi cần thiết |
| `convex-set-preservation-map.svg` | Bỏ khỏi tuyến | Có phép tổng Minkowski chưa cần |
| `epigraph-levelset-indicator.svg` | Bỏ khỏi tuyến | Epigraph và hàm chỉ báo không cần cho chứng nhận |
| `convex-preservation-and-jensen.svg` | Bỏ khỏi tuyến | Jensen vượt nhu cầu Bài 01 |
| `line-restriction-convex-library.svg` | Bỏ khỏi tuyến | Thư viện hàm rộng và dễ quá tải |
| `psd-cone-and-quadratic-directions.svg` | Bỏ khỏi tuyến | Nón nửa xác định dương không cần trình bày riêng |

## Câu nối bắt buộc

- M03 → D00 → D01: bắt đầu bằng quyết định vật lý có giới hạn; D00 nêu nhu cầu chọn $u$ với $|u|\le u_{\max}$.
- D04 → L00 → L01: chuyển từ quyết định điều khiển sang nhu cầu dự đoán một giá trị số từ dữ liệu.
- L01 → L01B: khái quát từ một đặc trưng cân nặng sang nhiều cột đặc trưng.
- L01B → L02: sau khi có mô hình dự đoán, chọn đại lượng đo sai số để học tham số.
- L04 → GT → G00: chuyển từ dự đoán một giá trị liên tục sang quyết định phân loại chất lượng trên dây chuyền.
- G00 → G01: khái quát hai đặc trưng của quả cam thành vector đặc trưng và biên tuyến tính.
- G04 → T00 → T01: ba trường hợp tạo ba nghi vấn khác nhau nhưng cùng một dạng tổng quát.
- T04 → F00 → F01: sáu bước kiểm tra cần công cụ cho miền trước, rồi cho hàm mục tiêu.
- F05 → H01: miền lồi mới là một nửa; mục tiêu còn phải có độ cong phù hợp.
- H07 → H07B → K00 → K01: đọc giả thiết trước khi dùng mệnh đề, rồi dùng từng giả thiết đúng chỗ cho ba trường hợp.
- K04 → K06 → K05 → K05B: ba chứng nhận được gom thành quy trình bốn bước, quy trình áp dụng cho bài toán chiếu sáng, lời giải ở trang kế.
- K05B → K07 → K08: bảng tổng kết trả lời câu hỏi tự kiểm tra ở K06, rồi tài liệu đọc.

## Nội dung bỏ hoặc chuyển khỏi mặt trang chiếu

- Không có lịch sử kiểu danh sách năm–tên–thuật toán.
- Không có nhãn quy trình, mã tuyến, mã trang hoặc thời lượng trên mặt trang chiếu và ghi chú diễn giả.
- Chứng minh đại số dài chuyển sang `lecture-note.md`; mặt trang chiếu chỉ giữ mục tiêu, ý tưởng và bước then chốt.
- Từ 2026-10-12, lời giải mẫu của bài tập chiếu sáng (phần 1–4, trùng Bài 9 của `materials/lec-01/exercises.md`) nằm trên mặt trang K05B; phần 5 nằm trong ghi chú K05B và tệp bài tập. D04, L04, G04, F05 và H07B có "Lời giải:" hiện bằng `fragment`.

## Hành trình định hướng bổ sung ngày 2026-09-07

M01 → M01A → M01B → M02 → M03; các trang tiếp theo giữ nguyên. Tổng khi đó: 41 trang, bảy mạch.

M01A/M01B giải quyết nhu cầu biết học gì và được đánh giá ra sao. M01A dùng hai cột để phân biệt vai trò; M01B dùng bảng ba thành phần và tổng trọng số 100%. Đầu vào là định danh học phần; đầu ra là định vị Bài 01 và kế hoạch học tập phù hợp. Không truyền ký hiệu toán học mới.

Chu trình sáu bước không áp dụng cho hai trang định hướng hành chính: không dạy khái niệm toán học hay giao bài tập xác suất tại đây. Trực quan được gộp vào hai cột và bảng; ví dụ tính toán, phát biểu hình thức, ứng dụng và bài tập không áp dụng. Hành trình toán học bắt đầu bằng ba nhu cầu tại M03 và giữ nguyên các bước đã ánh xạ. Hai trang dùng chung phân bổ 0,15 tiết của mạch mở đầu; không tăng tổng thời lượng.

Khác mẫu có chủ ý: chèn hai trang để đáp ứng yêu cầu giới thiệu học phần; không thay thứ tự lec01 → lec02 → lec03. Cuối kỳ có hai buổi theo chỉ dẫn người dùng (một buổi tuần 15, một buổi theo lịch thi), chung trọng số 60%.

Kiểm định toàn tuyến phát hiện dấu nhỏ hơn trong ghi chú H03 bị HTML hiểu thành thẻ. Đã đổi cách mã hóa thành `&lt;`, giữ nguyên bất đẳng thức và toàn bộ lập luận; rà lại H01–H06 để xác nhận kết nối và phân biệt nội dung hiển thị với ghi chú.
