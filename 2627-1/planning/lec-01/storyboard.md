# Storyboard Bài 01: ứng dụng trước lý thuyết

Trạng thái hiện hành (2026-11-13, sau đợt sửa deck theo bảng phát hiện và theo ghi chú bài giảng viết lại ngày 2026-11-12): 58 trang lá, 58 mã `data-slide-id` duy nhất, bảy `<section>` ngoài. Mỗi mạch trừ mạch mở đầu mở bằng một trang tiêu đề mạch (`section.strand-title`, `id="mach-N"`). Bảng theo từng trang khớp thứ tự DOM. Ghi chú bài giảng `materials/lec-01/lecture-note.md` là chuẩn nội dung: ký hiệu theo bảng §2 của ghi chú, số hiệu khối theo đánh số 2026-11-12.

## Bản đồ bảy mạch kể chuyện

| Mạch | Trang tiêu đề | Câu hỏi trung tâm | Chức năng | Điểm vào | Đầu ra dùng cho mạch sau | Phân bổ nội bộ |
|---|---|---|---|---|---|---:|
| 1. Mở đầu và ba bài toán tối ưu | `M01` (bìa) | Học phần, cách đánh giá, mục tiêu và nhu cầu của bài là gì | Định hướng học phần, mục tiêu, nội dung, nhu cầu của bài | Kiến thức tiên quyết | Ba quyết định cần mô hình hóa | 0,15 tiết lý thuyết |
| 2. Điều khiển một bước | `D00` | Chọn tác động $u$ gần đích với $\lvert u\rvert\le u_{\max}$ và xác định nghiệm nằm trong hay trên biên (dòng dẫn D00) | Xây trường hợp có đánh đổi, ràng buộc và nghiệm biên | Nhu cầu bám đích có giới hạn | Mô hình $\min_{u\in C}q(u)$, nghiệm $u^*=1$ trên biên với $q'(1)\ne0$ | 0,30 tiết lý thuyết |
| 3. Hồi quy tuyến tính | `L00` | Chọn tham số của dự đoán tuyến tính khớp dữ liệu số và biết khi nào nghiệm duy nhất (dòng dẫn L00) | Xây trường hợp học tham số bằng bình phương nhỏ nhất | Dữ liệu dự đoán số | Mô hình $\min_w\lVert Xw-y\rVert_2^2$ và ví dụ vô số nghiệm | 0,30 tiết lý thuyết |
| 4. Hồi quy logistic | `GT` | Học $w$ cho quyết định hai lớp và biết bài toán có nghiệm hay không (dòng dẫn GT) | Xây trường hợp phân loại có cận dưới đúng nhưng có thể không có nghiệm | Dữ liệu nhãn $\pm1$ | Mục tiêu $L(w)$ và ví dụ không tồn tại nghiệm | 0,30 tiết lý thuyết |
| 5. Dạng tổng quát của bài toán tối ưu | `T00` | Ba bài toán chung một dạng: các kết luận về nghiệm được phát biểu chính xác thế nào | Trừu tượng hóa ba trường hợp bằng cùng một ngôn ngữ | Ba mô hình cụ thể | $\min_{x\in C}f_0(x)$, cực tiểu địa phương/toàn cục, bốn loại kết luận, sáu câu hỏi chứng nhận | 0,20 tiết lý thuyết |
| 6. Tập lồi và hàm lồi | `F00` | Giả thiết nào trên $C$ và $f_0$ đủ cho toàn cục, tồn tại, duy nhất (câu 2 đến câu 6) | Xây các định nghĩa và định lý cần cho sáu câu hỏi | Sáu câu hỏi chứng nhận | Tiêu chuẩn tính lồi; toàn cục; tồn tại; duy nhất; lồi mạnh và chính quy hóa | 0,75 tiết lý thuyết |
| 7. Chứng nhận nghiệm và tổng kết | `K00` | Mỗi kết luận của ba bài toán và của một mô hình mới do giả thiết nào bảo đảm | Mạch kết luận: tổng hợp công cụ thành chứng nhận, quy trình, bài tập tổng hợp, bảng tổng kết, bài tự kiểm tra, tài liệu đọc | Bộ công cụ lồi | Ba chứng nhận, quy trình bốn bước, bài toán chiếu sáng có lời giải, bảng tổng kết | 1,00 tiết bài tập |

Tổng phân bổ: 2 tiết lý thuyết và 1 tiết bài tập. Không đưa phân bổ này lên mặt trang chiếu hoặc vào ghi chú diễn giả.

**Mạch kết luận (quyết định 2026-11-13).** Bảng phát hiện 2026-11-13 ghi mạch 7 trộn nội dung với tổng kết và tài liệu đọc. Tách thành mạch thứ tám vượt khoảng 5–7 mạch, và bảy mạch là cấu trúc người dùng đã cố định. Cách xử lý: mạch 7 được định vai lại thành mạch kết luận theo `AGENTS.md` §"Mở bài và kết bài" (tổng hợp kết quả đã xây dựng và điều kiện sử dụng). Nội dung mới duy nhất trước đây nằm ở K03 (lồi mạnh, chính quy hóa) được chuyển lên mạch 6 (H08, H09, theo §8.4 của ghi chú), nên mạch 7 chỉ áp dụng công cụ đã có: ba chứng nhận và bảng so sánh là phần tổng hợp, K05–K05B là bài tập tổng hợp, K07 là bảng tổng kết, K07B là bài tự kiểm tra, K08 là tài liệu đọc. Tên mạch đổi "Chứng nhận ba bài toán" → "Chứng nhận nghiệm và tổng kết" (trang Nội dung `M02B` và `K00` cùng đổi). Mạch 6 là mạch nội dung cuối; câu nối sang mạch kết luận là câu cuối ghi chú H09 ("Bộ công cụ đã trả lời đủ sáu câu hỏi chứng nhận; mạch kết luận dùng nó …") và ghi chú K00.

## Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm | Ký hiệu truyền tiếp | LLO/CLO |
|---|---|---|---|---|---|---|---|---|---|
| Điều khiển một bước | M03, D00, D01 | D01 (sơ đồ) | D03 | D02, T01 | K01 | D04 (lời giải trên mặt trang) | Đại số một biến → lập và giải mô hình bị chặn | $x_0,t,u,u_{\max},\lambda,q$ → $x,C,f_0$ | LLO1, CLO1 |
| Hồi quy tuyến tính | M03, L00, L01 | L01, L02 (hình) | L01, L03 | L01B–L03, T01 | K02 | L04–L04B (lời giải trang kế) | Dữ liệu cân nặng–chiều cao → lập mô hình, chọn mất mát, đọc nghiệm | $s_i,y_i,w_0,w_1$ → $a_i,X,y,w,J$ → $x,C,f_0$ | LLO1, CLO1 |
| Hồi quy logistic | M03, GT, G00 | G00, G01 | G03 | G01–G02, T01 | K03 | G04 (lời giải trên mặt trang) | Nhãn $\pm1$ → biên có dấu, mất mát, phân biệt cận dưới đúng với nghiệm | $z_1,z_2,y$ → $a_i,y_i,m_i,w,L$ → $x,C,f_0$ | LLO1, CLO1 |
| Dạng tổng quát, cực tiểu địa phương/toàn cục, các loại kết luận | G04, T00, T01 | T01 (sơ đồ), T02B (hình hàm không lồi) | T02 (ba mô hình), ghi chú T02B ($x^3-3x$), ghi chú T03 (Ví dụ 01.10) | T01, T02B, T03 | T04 | K06 (câu hỏi tự kiểm tra), K05 phần (1) | Ba mô hình → $\min_{x\in C}f_0(x)$, bốn loại kết luận, sáu câu hỏi | $x,f_0,C,p^*,S^*$ | LLO1, CLO1 |
| Tập lồi | F00, F01 | F01 | F03, ghi chú F01 (vùng chết) | F02, F04 | K01–K03, K05B | F05 (lời giải trên mặt trang) | Đoạn thẳng → chứng nhận miền lồi | $C,x,y,\theta,z_\theta$ | LLO2, CLO1 |
| Hàm lồi và tiêu chuẩn | F00, H01 | H01 | ghi chú H02 ($x^2$, affine, $x^3-3x$), H05 ($J$), H06 ($\ell$) | H02, H04–H06 | K01–K03 | H07B (lời giải trên mặt trang) | Đạo hàm, Hessian → kiểm tra mục tiêu lồi, lồi chặt | $f,\nabla f,\nabla^2f,\tau,v$ | LLO2, CLO1 |
| Toàn cục, tồn tại, duy nhất | T04, F00 | H03 (hình hàm lồi), H07 (hình) | ghi chú H03 (vùng chết, $x^3-3x$), H07 (hình ba hàm) | H03, H07 | K01–K04 | H07B (lời giải trên mặt trang) | Tính lồi, tính đóng, bị chặn → ba kết luận với giả thiết riêng | $p^*,S^*$ | LLO1, LLO2, CLO1 |
| Lồi mạnh và chính quy hóa | H07B, H08, H09 | H08, ghi chú H09 | ghi chú H08 ($x^2$), ghi chú H09 (Ví dụ 01.16), K03 (hai mẫu) | H08 (01.39, 01.40), H09 (01.41, 01.42) | K03, K04 | K07B (tự kiểm tra, lời giải trong ghi chú diễn giả) | Lồi chặt không đủ cho tồn tại → điều kiện đủ cho cả tồn tại và duy nhất | $\mu,I_d,F_\mu,L_\mu,J_\mu$ | LLO1, LLO2, CLO1 |
| Chứng nhận | K00, K01 | K04 (bảng đối chiếu) | K01–K03 | K06 (quy trình bốn bước), K07 | K05, K05B | K05–K05B (lời giải trên mặt trang), K07B | Công cụ lồi → chứng nhận từng kết luận cho mô hình mới | $u^*,w^*,L_\mu$ | LLO1, LLO2, CLO1 |

Ví dụ dẫn nhập L01 cụ thể hóa nhu cầu dự đoán số trước khi L01B khái quát và L02 chọn hàm mất mát. Ví dụ D03, L03, G03 đặt trước định nghĩa lồi để làm rõ nhu cầu chứng nhận; ký hiệu của chúng được giữ tại K01–K03.

Ngoại lệ thứ tự:

- Bài tập đứng trước ứng dụng ở các cụm ba bài toán (D04, L04, G04 trước K01–K03; F05, H07B trước K01–K04): bài học theo hướng "ứng dụng trước lý thuyết", nên ứng dụng của công cụ lồi dồn về mạch kết luận.
- Ví dụ đứng sau phát biểu hình thức ở D02 → D03, F02 → F03, H02 → H05/H06; ví dụ dẫn nhập đã có ở D01 (sơ đồ), ghi chú F01 (vùng chết), ghi chú H02.
- Chứng nhận: ví dụ K01–K03 đứng trước hình thức K06, theo lối quy nạp từ ba lần chứng nhận; K04 đối chiếu ba lần chứng nhận trước khi K06 gom thành quy trình.
- Cực tiểu địa phương/toàn cục (T02B) được định nghĩa ở mạch 5 theo §5.2 của ghi chú; định lý cực tiểu địa phương là toàn cục (H03) chuyển xuống sau các tiêu chuẩn tính lồi (H04–H06) theo §8.1 của ghi chú (quyết định 2026-11-13).
- Lồi mạnh và chính quy hóa là cụm phụ dùng chu trình rút gọn: nhu cầu (H07B, dòng "Nhu cầu:" H08 và H09) → trực quan (H08; ghi chú H09) → hình thức (H08: Định nghĩa 01.39, Nhận xét 01.40; H09: Hệ quả 01.41, Định nghĩa 01.42) → ứng dụng (K03) → bài tập (K07B); bước ví dụ nằm trong ghi chú diễn giả H09 (Ví dụ 01.16) và K03 (hai mẫu), vì một trang ví dụ riêng sẽ trùng phép tính của K03.

Trang tiêu đề mạch: D00, L00, GT có dòng dẫn nêu đúng nhu cầu của khái niệm đầu tiên, nên là bước `nhu cầu` của cụm tương ứng. T00 là bước `nhu cầu` của cụm dạng tổng quát; F00 của cụm tập lồi và hàm lồi; K00 của cụm chứng nhận.

## Bảng theo từng trang

Cột "Vị trí trong khung" ghi bước của sườn lý thuyết chung (bài toán → mô hình → câu hỏi về nghiệm → dạng tổng quát → công cụ lồi → chứng nhận). Cột "Âm tiết" ghi số âm tiết chữ trên mặt trang do `deck_check.py` đo ngày 2026-11-13 (trước → sau cho trang đổi đáng kể). Mã phát hiện F1–F12 là các dòng của bảng phát hiện 2026-11-13 theo thứ tự, xem `review-log.md`.

| Mã | Tiêu đề | Lý do tồn tại và khoảng trống được giải quyết | Kết nối vào → kết nối ra | Vị trí trong khung | LLO/CLO | Âm tiết | Quyết định |
|---|---|---|---|---|---|---|---|
| M01 | Giới thiệu tối ưu, tập lồi và hàm lồi | Bìa, trang tiêu đề mạch 1 | Mở bài → M01A | Điểm vào mạch 1 | CLO1 | 22 | `sửa` ghi chú (kiểm lại mục 13): bỏ câu "Vị trí của Bài 01 chỉ rõ khi…" |
| M01A | Hai phần của học phần | Định vị Bài 01 trong hai phần của học phần | M01 → M01B | Ngoài sườn; định hướng | CLO1–CLO4 | 57 | `sửa` ghi chú (kiểm lại mục 13): "thường được viết thành" → "được viết thành" |
| M01B | Kiểm tra và đánh giá | Ba thành phần điểm | M01A → M02 | Ngoài sườn; định hướng | CLO5 | 48 | `sửa` ghi chú: "năm mục tiêu" |
| M02 | Mục tiêu học tập | Năm việc sinh viên làm được, khớp năm mục tiêu của ghi chú | M01B → M02B | Sản phẩm học tập của sườn | LLO1, LLO2, CLO1 | 59 → 76 | `sửa` (F8): thêm mục tiêu 5 (áp dụng quy trình cho mô hình mới, chỉ ra kết luận mất); mục 1–4 viết lại theo ghi chú; trần 80 của trang mục tiêu |
| M02B | Nội dung | Danh sách bảy mạch, tên trùng trang tiêu đề mạch | M02 → M03 | Bản đồ sườn | LLO1, LLO2 | 38 | `sửa`: mục 7 "Chứng nhận nghiệm và tổng kết"; ngoại lệ 7 dòng vì bài có 7 mạch |
| M03 | Một số bài toán tối ưu trong điều khiển và trí tuệ nhân tạo (AI) | Ba quyết định và nhu cầu trung tâm; vai trang "Ngữ cảnh" | M02B → D00 | Bài toán trung tâm | LLO1, CLO1 | 47 | `giữ` |
| D00 | 2. Điều khiển một bước | Trang tiêu đề mạch 2 | M03 → D01 | Điểm vào mạch 2; bước `nhu cầu` | LLO1 | 26 | `sửa` (kiểm lại mục 9): dòng dẫn nêu đủ câu hỏi của mạch, kể cả vị trí nghiệm |
| D01 | Dữ kiện của bài toán điều khiển | Dữ kiện, phương trình trạng thái, biến, miền | D00 → D02 | Mô hình: dữ kiện, biến, miền | LLO1, CLO1 | 20 | `sửa` (F4, F11): thêm "Nhu cầu:" nêu câu hỏi của mạch; bỏ hai tiêu đề thẻ để giữ 5 dòng và khung 720 px; ghi chú rút từ 262 xuống 154 âm tiết, thêm hard constraint, penalty term, nguồn Định nghĩa 01.1 |
| D02 | Hàm chi phí bám đích và năng lượng | Gộp hai yêu cầu thành hàm chi phí, viết bài toán | D01 → D03 | Mô hình: hàm mục tiêu | LLO1, CLO1 | 28 | `sửa`: bỏ `\underbrace{\text{…}}` tiếng Việt (gây 8 cảnh báo KaTeX và tràn 6 px), tên hai số hạng chuyển vào thẻ; ghi chú bỏ nhận xét bên lề "một cách gộp khác cho một mô hình khác" |
| D03 | Ví dụ: bài toán điều khiển với bộ số cụ thể | Cực tiểu không ràng buộc ngoài miền, nghiệm trên biên | D02 → D04 | Mô hình: nghiệm cụ thể | LLO1, CLO1 | 31 | `giữ`; ghi chú thêm nguồn Ví dụ 01.2 |
| D04 | Bài tập: nghiệm tối ưu trên biên | Bài tập có lời giải trên mặt trang cho cụm điều khiển | D03 → L00 | Câu hỏi về nghiệm: nghiệm biên | LLO1, CLO1 | 42 | `sửa` (F10): $\Delta u$ → $\Delta$ theo Nhận xét 01.3; ghi chú bỏ câu rào đón và đoạn chỉ tới phần sau; nguồn Nhận xét 01.3 |
| L00 | 3. Hồi quy tuyến tính | Trang tiêu đề mạch 3 | D04 → L01 | Điểm vào mạch 3; bước `nhu cầu` | LLO1 | 33 | `sửa` (kiểm lại mục 9): dòng dẫn thêm "khi nào nghiệm duy nhất" |
| L01 | Bài toán dự đoán giá trị số | Ví dụ dẫn nhập cân nặng–chiều cao | L00 → L01B | Bài toán: dự đoán số | LLO1, CLO1 | 32 | `sửa` (F1, F10, F11): $m_i,h_i,b,a$ → $s_i,y_i,w_0,w_1$; hình đổi sang `height-weight-regression-note.svg` (không còn nhãn "dữ liệu minh họa tự tạo"); ghi chú bỏ câu xuất xứ, rút từ 232 xuống 166 âm tiết |
| L01B | Hồi quy tuyến tính nhiều đặc trưng | Ma trận thiết kế, hàng $a_i^T$ | L01 → L02 | Mô hình: $\hat y=Xw$ | LLO1, CLO1 | 34 | `sửa` (F1): $x_i^T$ → $a_i^T$, $(b,a)$ → $(w_0,w_1)$, $\widehat y$ → $\hat y$ |
| L02 | Bình phương nhỏ nhất | Tổng bình phương phần dư làm hàm mục tiêu | L01B → L03 | Mô hình: hàm mục tiêu $J$ | LLO1, CLO1 | 39 → 18 | `sửa` (F9): bỏ dòng "Lưu ý: … trị tuyệt đối cho mô hình khác" (nhận xét bên lề); $x_i^Tw$ → $a_i^Tw$ |
| L03 | Ví dụ: hồi quy trên ba điểm | Nghiệm, phần dư, giá trị tối ưu | L02 → L04 | Mô hình: nghiệm cụ thể | LLO1, CLO1 | 32 | `sửa` (F6, F10): "Nhắc lại:" phương trình chuẩn (Định lý 00.22); $w_0,w_1$; ghi chú bỏ câu "được dùng ở đây trước khi chứng minh" |
| L04 | Bài tập: cột trùng trong ma trận thiết kế | Bài tập có lời giải cho cụm hồi quy tuyến tính | L03 → L04B | Câu hỏi về nghiệm: duy nhất | LLO1, CLO1 | 31 | `sửa`: $w'=(w_0,w_1,w_2)^T$; "Nhắc lại:" hạng cột đầy đủ theo $\operatorname{rank}(X)=d$; nguồn Ví dụ 01.6 |
| L04B | Bài tập: cột trùng trong ma trận thiết kế, lời giải | Lời giải trang kế tiếp | L04 → GT | Câu hỏi về nghiệm: duy nhất | LLO1, CLO1 | 30 | `sửa` (F7): $c$ → $\kappa$, $\ker$ → $\operatorname{Ker}$, $\operatorname{rank}(X')$ |
| GT | 4. Hồi quy logistic | Trang tiêu đề mạch 4 (mã `GT` vì `G00` đã có) | L04B → G00 | Điểm vào mạch 4; bước `nhu cầu` | LLO1 | 38 | `sửa` (kiểm lại mục 9): dòng dẫn (23 âm tiết) thêm "biết bài toán có nghiệm hay không" |
| G00 | Phân loại chất lượng cam trên dây chuyền | Ví dụ dẫn nhập: hai đặc trưng ảnh và nhãn | GT → G01 | Bài toán: phân loại | LLO1, CLO1 | 40 | `sửa` (F4, F10): câu hỏi cuối thành "Nhu cầu:" nêu câu hỏi của mạch; $A_{\mathrm{spot}}/A_{\mathrm{fruit}}$ theo ghi chú (bỏ `\text{vết}` gây cảnh báo KaTeX); hình đổi sang bản sao `g00-orange-quality-pipeline-deck.svg` (không còn dòng "Số liệu điểm là minh họa"; nhãn $A(\mathrm{spot})/A(\mathrm{fruit})$); ghi chú bỏ câu xuất xứ |
| G01 | Phân loại bằng biên quyết định tuyến tính | Định nghĩa biên có dấu | G00 → G02 | Mô hình: biên có dấu | LLO1, CLO1 | 39 | `sửa` (F1, F11): $m_i$ chỉ còn nghĩa biên có dấu; hình đổi sang `g01-linear-boundary-2d-note.svg` (trục $z_1,z_2$); ghi chú rút từ 237 xuống 143 âm tiết |
| G02 | Mất mát logistic | Mục tiêu $L(w)$ | G01 → G03 | Mô hình: hàm mục tiêu $L$ | LLO1, CLO1 | 22 | `giữ`; ghi chú thêm nguồn |
| G03 | Ví dụ: hai mẫu tách được tuyến tính | Mất mát giảm mãi nhưng không đạt cận dưới | G02 → G04 | Mô hình: nghiệm không tồn tại | LLO1, CLO1 | 26 | `giữ`; ghi chú bỏ nhận xét bên lề về ràng buộc $\lvert w\rvert\le1$ |
| G04 | Bài tập: dãy cực tiểu hóa và nghiệm tối ưu | Bài tập có lời giải cho cụm logistic | G03 → T00 | Câu hỏi về nghiệm: tồn tại | LLO1, CLO1 | 50 | `sửa`: $w_k$ → $w^{(k)}$ theo ghi chú; nguồn Định nghĩa 01.9, Nhận xét 01.10 |
| T00 | 5. Dạng tổng quát của bài toán tối ưu | Trang tiêu đề mạch 5 | G04 → T01 | Điểm vào mạch 5; bước `nhu cầu` | LLO1 | 30 | `sửa` ghi chú: "sáu câu hỏi chứng nhận" |
| T01 | Ba thành phần của bài toán tối ưu | Cấu trúc chung của ba trường hợp | T00 → T02 | Dạng tổng quát | LLO1, CLO1 | 9 → 25 | `sửa` (F4, F5): thêm "Nhu cầu:"; hình đổi sang `optimization-model-anatomy-deck.svg` (nhãn $d$), ghi chú bỏ câu giải thích nhãn $n$ |
| T02 | Ba bài toán trong dạng tổng quát | $x$, $f_0$, $C$ của từng bài toán | T01 → T02B | Dạng tổng quát | LLO1, CLO1 | 31 | `sửa` ghi chú: hai ràng buộc của bài toán điều khiển, cách đọc trong học máy |
| T02B | Cực tiểu địa phương và cực tiểu toàn cục | Định nghĩa 01.12 trước khi phân loại kết luận; hình trực quan | T02 → T03 | Câu hỏi về nghiệm: toàn cục | LLO1, CLO1 | 31 | `tách` từ H03 (F7, F9): định nghĩa cực tiểu địa phương rời H03 về vị trí §5.2 của ghi chú; hình là bản sao `local-versus-global-minimum-deck-left.svg` chỉ giữ khung hàm không lồi (kiểm lại mục 7), để không xem trước Định lý 01.32; ví dụ $x^3-3x$ trong ghi chú diễn giả |
| T03 | Các loại kết luận về nghiệm | Bốn loại kết luận theo Ví dụ 01.10 | T02B → T04 | Câu hỏi về nghiệm: phân loại | LLO1, LLO2, CLO1 | 48 → 45 | `sửa` (F7): bảng năm dòng thành bốn loại (điểm khả thi, $p^*$, tồn tại, duy nhất); kết luận toàn cục ở dòng "Lưu ý:"; ghi chú có bảng số của Ví dụ 01.10 |
| T04 | Sáu câu hỏi chứng nhận | Nhận xét 01.16 | T03 → F00 | Câu hỏi về nghiệm → nhu cầu công cụ | LLO1, LLO2, CLO1 | 51 | `sửa`: tiêu đề "Sáu bước kiểm tra một mô hình" → "Sáu câu hỏi chứng nhận" theo thuật ngữ ghi chú, tránh trùng "bước" của Thuật toán 01.47; mọi ghi chú đổi "bước k" → "câu k" |
| F00 | 6. Tập lồi và hàm lồi | Trang tiêu đề mạch 6 | T04 → F01 | Điểm vào mạch 6; bước `nhu cầu` | LLO2 | 34 | `sửa` ghi chú: đầu ra thêm lồi mạnh, chính quy hóa |
| F01 | Đoạn nối giữa hai phương án | Trực quan tập lồi | F00 → F02 | Công cụ: tập lồi (trực quan) | LLO2, CLO1 | 38 → 53 | `sửa` (F4): thêm "Nhu cầu:" phân rã câu hỏi của mạch (câu 2 cho $C$, câu 3–6 cho $f_0$); ghi chú thêm ví dụ vùng chết của §6 |
| F02 | Định nghĩa tập lồi | Định nghĩa 01.17 | F01 → F03 | Công cụ: tập lồi | LLO2, CLO1 | 28 | `sửa` ghi chú: bỏ khẳng định về tập đóng không có trong ghi chú bài giảng |
| F03 | Các tập lồi dùng trong ba ví dụ | Mệnh đề 01.18 | F02 → F04 | Công cụ: tập lồi (ví dụ) | LLO2, CLO1 | 27 | `sửa` (F1, F10): $[a,b]$, $l\le x\le u$, $\{Ax=b\}$, $\{a^Tx\le b\}$ → $\underline x_j\le x_j\le\overline x_j$, $\{Ax=c\}$, $\{g^Tx\le\beta\}$; ghi chú bỏ câu "Bài 01 không mở rộng…" |
| F04 | Xây miền lồi từ các tập đơn giản | Mệnh đề 01.19 | F03 → F05 | Công cụ: phép toán bảo toàn tính lồi của tập | LLO2, CLO1 | 13 | `sửa`: $Ax+b\in D$ → $Ax+c\in E$ |
| F05 | Bài tập: miền khả thi của ba bài toán | Bài tập có lời giải cho cụm tập lồi | F04 → H01 | Chứng nhận miền | LLO2, CLO1 | 51 | `sửa` (F10): ghi chú bỏ câu bình luận kỹ thuật về $u_{\max}\ge0$; nguồn Ví dụ 01.11(a) |
| H01 | Dây cung và đồ thị hàm | Trực quan hàm lồi | F05 → H02 | Công cụ: hàm lồi (trực quan) | LLO2, CLO1 | 25 | `sửa` (F10): ghi chú bỏ "Hình chỉ tạo trực giác"; thêm dây cung của $x^3-3x$ theo §7.1 |
| H02 | Định nghĩa hàm lồi | Định nghĩa 01.21 | H01 → H03B | Công cụ: hàm lồi | LLO2, CLO1 | 29 | `sửa` ghi chú: ví dụ theo Ví dụ 01.12; câu nối H02 → H03B nằm ở đầu ghi chú H03B (giả thiết miền mở, đóng, bị chặn của các kết quả tiếp theo) |
| H03B | Tập mở, tập đóng, tập bị chặn | "Nhắc lại:" tiên quyết cho H04, H05, H07 | H02 → H04 | Công cụ: giả thiết về miền | LLO2, CLO1 | 48 | `giữ`; ngoài hành trình khái niệm (ôn tiên quyết) |
| H04 | Điều kiện bậc nhất | Định lý 01.25, Hệ quả 01.26 | H03B → H05 | Công cụ: kiểm tra hàm lồi | LLO2, CLO1 | 42 | `sửa` ghi chú: ví dụ tiếp tuyến của $q$ tại $u=1$; nguồn |
| H05 | Điều kiện bậc hai | Định lý 01.29 | H04 → H06 | Công cụ: kiểm tra hàm lồi | LLO2, CLO1 | 36 | `sửa` (F5, F6): "khả vi hai lần" → "thuộc lớp $C^2$"; "Ký hiệu:" → "Nhắc lại: … (Định nghĩa 00.17)"; hình đổi sang `first-second-order-convexity-deck.svg` ($\tau$, $v$, $\nabla^2f$), ghi chú bỏ câu giải thích nhãn $d$, $H(x)$ |
| H06 | Các phép toán bảo toàn tính lồi | Định lý 01.30(a), (b) | H05 → H03 | Công cụ: phép toán bảo toàn tính lồi của hàm | LLO2, CLO1 | 33 | `sửa`: $\alpha_j$ → $\gamma_j$, $f(Ax+b)$ → $\psi(Ax+c)$, $\ell(s)$ → $\ell(m)$ theo ghi chú |
| H03 | Cực tiểu địa phương là toàn cục | Định lý 01.32 trả lời câu 4 | H06 → H07 | Kết quả: toàn cục | LLO2, CLO1 | 43 → 46 | `sửa` (F7, F9): chuyển xuống sau H06 theo §8.1; định nghĩa tách sang T02B; trang có định lý, "Ý nghĩa:", "Chứng minh." một dòng và khung hàm lồi `local-versus-global-minimum-deck-right.svg` (kiểm lại mục 7) |
| H07 | Tồn tại và duy nhất | Định lý 01.35, 01.38, 01.34 | H03 → H07B | Kết quả: tồn tại, duy nhất | LLO1, LLO2, CLO1 | 51 | `sửa` (F7): thẻ (b), (c) "Mệnh đề." → "Định lý." theo ghi chú |
| H07B | Bài tập: hàm mũ trên tập số thực | Bài tập có lời giải cho cụm hàm lồi; tạo nhu cầu cho lồi mạnh | H07 → H08 | Kết quả: giới hạn của lồi chặt | LLO2, CLO1 | 52 | `sửa` ghi chú: "Định lý về hàm cưỡng bức"; nguồn §8.3, Nhận xét 01.43 |
| H08 | Hàm lồi mạnh | Định nghĩa 01.39 và tiêu chuẩn Hessian (Nhận xét 01.40) | H07B → H09 | Kết quả: lồi mạnh | LLO1, LLO2, CLO1 | 57 | `thêm` (F2); kiểm lại mục 10: "Nhu cầu:" viết lại một mệnh đề, Hệ quả 01.41 chuyển sang H09 và Nhận xét 01.40 chuyển về H08 để giữ thứ tự 01.39 → 01.40 → 01.41 → 01.42; dưới trần 60 |
| H09 | Nghiệm duy nhất và chính quy hóa bậc hai | Hệ quả 01.41 và Định nghĩa 01.42 | H08 → K00 | Kết quả: tồn tại, duy nhất; cách tạo lồi mạnh | LLO1, LLO2, CLO1 | 56 | `thêm` (F2); kiểm lại mục 3, 8: Hệ quả 01.41 đứng đầu trang, "Nhu cầu:" (lồi mạnh hóa $L$ trên dữ liệu tách được) đứng ngay trước Định nghĩa 01.42; ghi chú rút còn 135 âm tiết, có câu trực quan và câu nối sang mạch kết luận trong ghi chú; dòng cuối nêu $F_\mu$ lồi mạnh với hằng số $\mu$ trước "đúng một nghiệm"; ví dụ Ví dụ 01.16 trong ghi chú |
| K00 | 7. Chứng nhận nghiệm và tổng kết | Trang tiêu đề mạch kết luận | H09 → K01 | Điểm vào mạch 7; bước `nhu cầu` của cụm chứng nhận | LLO1, LLO2 | 31 | `sửa` (F3): đổi tên mạch, dòng dẫn và từ khóa theo vai mạch kết luận |
| K01 | Chứng nhận bài toán điều khiển | Mệnh đề 01.44 | K00 → K02 | Chứng nhận | LLO1, LLO2, CLO1 | 38 | `sửa` (F4): thêm "Nhu cầu:"; bỏ hai tiêu đề thẻ và gộp hệ `aligned` thành một dòng để giữ 5 dòng và khung 720 px; $\operatorname{clip}(u,[\underline u,\overline u])$ theo ghi chú |
| K02 | Chứng nhận hồi quy tuyến tính | Mệnh đề 01.45 | K01 → K03 | Chứng nhận | LLO1, LLO2, CLO1 | 40 | `sửa` (F7): tồn tại theo phương trình chuẩn (Hệ quả 01.5) thay cho hình chiếu; $\mathcal R(X)$ → $\operatorname{Col}(X)$ trong ghi chú; hình chiếu giữ ở ghi chú làm "Cách khác" |
| K03 | Chứng nhận hồi quy logistic | Mệnh đề 01.46 | K02 → K04 | Chứng nhận | LLO1, LLO2, CLO1 | 41 | `sửa` (F1, F2, F11): $I$ → $I_d$; dòng chính quy hóa dẫn tới lồi mạnh (H08, H09) và Hệ quả 01.41; ghi chú rút từ 274 xuống 123 âm tiết |
| K04 | So sánh bốn trường hợp | Bảng §9.1 của ghi chú | K03 → K06 | Chứng nhận: so sánh | LLO1, LLO2, CLO1 | 61 → 38 | `sửa`: thêm hàng logistic có chính quy hóa; rút ô bảng để không tràn 1–2 px; khung nhấn còn một câu |
| K06 | Quy trình chứng nhận | Quy trình bốn bước, rút gọn Thuật toán 01.47 | K04 → K05 | Phương pháp | LLO1, LLO2, CLO1 | 52 | `sửa` ghi chú: ánh xạ với sáu câu hỏi; tồn tại của bình phương nhỏ nhất theo phương trình chuẩn; lồi mạnh |
| K05 | Bài tập: phân bố công suất chiếu sáng | Bài tập tổng hợp (Ví dụ 01.17) | K06 → K05B | Chứng nhận cho bài toán mới | LLO1, LLO2, CLO1 | 46 | `sửa` (F1, F10): $m$ đèn → $d$ đèn, $I$ → $\mathcal I$, $A\in\mathbb R^{n\times d}$; SVG `lighting-distribution.svg` đổi nhãn; ghi chú bỏ câu "không phải số liệu thực nghiệm" và câu về nội dung chưa dạy, thêm bài gốc MIT |
| K05B | Bài tập: phân bố công suất chiếu sáng, lời giải | Lời giải trên mặt trang | K05 → K07 | Chứng nhận cho bài toán mới | LLO1, LLO2, CLO1 | 47 | `sửa`: $2d$ nửa không gian, $\operatorname{rank}(A)=d$; ghi chú thay đoạn bên lề $c^Tp\le P$ bằng bộ số của Ví dụ 01.17 và kết luận mất khi $\operatorname{rank}(A)<d$ |
| K07 | Tổng kết | Bảng kết quả / giả thiết đủ / công cụ | K05B → K07B | Tổng hợp sườn | LLO1, LLO2, CLO1 | 75 → 67 | `sửa` (F2): thêm hàng "Đúng một nghiệm" (lồi mạnh); tồn tại của bình phương nhỏ nhất theo phương trình chuẩn trong ghi chú; trần 80 của trang tổng kết |
| K07B | Bài tập: hồi quy ridge | Bài tự kiểm tra cho mục tiêu 5 (Bài tập 01.19 của ghi chú) | K07 → K08 | Tổng hợp: chuyển giao | LLO1, LLO2, CLO1 | 18 | `thêm` (F8): mô hình học máy mới, chứng nhận ba kết luận và chỉ ra kết luận mất khi $\mu=0$, $\operatorname{rank}(X)<d$; bài tập tự làm, lời giải trong ghi chú diễn giả |
| K08 | Tài liệu đọc | Nguồn truy nguyên, liên hệ Bài 02 | K07B → Bài 02 | Ngoài sườn | CLO1 | 25 | `sửa`: danh sách theo §13 của ghi chú (Boyd và Vandenberghe theo mục, Murphy, MIT 6.079) |

Ngoại lệ tập trung mạch (2026-11-13): "Nhu cầu:" của D01, L01 (thẻ "Muốn …") và G00 chỉ nêu vế đầu câu hỏi trung tâm (nhiệm vụ của mô hình); vế sau (nghiệm nằm trong hay trên biên; khi nào nghiệm duy nhất; bài toán có nghiệm hay không) nằm ở dòng dẫn D00, L00, GT. Lý do: thêm vế sau vào dòng "Nhu cầu:" của D01 làm nội dung tràn khung 720 px; L01 và G00 giữ cùng cách để ba mạch song song.

Ngoại lệ mật độ: M02B có 7 dòng vì bài có 7 mạch; M02 có 76 âm tiết (trần 80 của trang mục tiêu); K07 có 67 âm tiết (trần 80 của trang tổng kết); K04 là bảng so sánh (trần 80). `deck_check.py` báo 0 OVERFLOW ngày 2026-11-13.

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
| H01–H05 | H01–H06 | Tách điều kiện bậc nhất/bậc hai; giới hạn phép toán bảo toàn tính lồi |
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
| `optimization-model-anatomy.svg` | Giữ cho ghi chú bài giảng | Deck T01 dùng bản sao `optimization-model-anatomy-deck.svg` (nhãn "x: d thành phần"), thêm 2026-11-13 |
| `convex-set-and-combination.svg` | Giữ | F01 |
| `convex-concave-strict.svg` | Giữ | H01 |
| `local-versus-global-minimum.svg` | Giữ cho ghi chú bài giảng | Deck dùng hai bản sao (kiểm lại 2026-11-13): `local-versus-global-minimum-deck-left.svg` (khung hàm không lồi) ở T02B, `local-versus-global-minimum-deck-right.svg` (khung hàm lồi) ở H03 |
| `first-second-order-convexity.svg` | Giữ cho ghi chú bài giảng | Deck H05 dùng bản sao `first-second-order-convexity-deck.svg` (nhãn $\tau$, $v$, $\nabla^2f$), thêm 2026-11-13 |
| `existence-and-uniqueness.svg` | Giữ | H07 |
| `logistic-loss-convex-case.svg` | Sửa | G03; ưu tiên miền $\mathbb R$ và trường hợp không đạt nghiệm |
| `one-step-control.svg` | Thêm | D01 |
| `height-weight-regression.svg` | Bỏ khỏi deck 2026-11-13 | L01 dùng `height-weight-regression-note.svg` (ký hiệu $s$, $y$; không có dòng "dữ liệu minh họa tự tạo") |
| `linear-regression-fit.svg` | Thêm | L02 |
| `m03-control-target.svg` | Thêm | M03 |
| `m03-linear-fit-sketch.svg` | Thêm | M03 |
| `m03-logistic-classes.svg` | Thêm | M03 |
| `d03-cost-parabola-feasible.svg` | Thêm | D03 |
| `g00-orange-quality-pipeline.svg` | Bỏ khỏi deck 2026-11-13 | G00 dùng bản sao `g00-orange-quality-pipeline-deck.svg` (từ bản `-note`, nhãn $A(\mathrm{spot})/A(\mathrm{fruit})$ theo ghi chú) |
| `g01-linear-boundary-2d.svg` | Bỏ khỏi deck 2026-11-13 | G01 dùng `g01-linear-boundary-2d-note.svg` (trục $z_1$, $z_2$) |
| `lighting-distribution.svg` | Thêm; sửa nhãn 2026-11-13 | K05; nhãn độ sáng $I$ → $\mathcal I$ theo ghi chú |
| `basic-convex-set-library.svg` | Bỏ khỏi tuyến | Rộng hơn nhu cầu ba ca |
| `convex-hull-and-conic-hull.svg` | Bỏ khỏi tuyến | Nón lồi không thuộc phạm vi cần thiết |
| `convex-set-preservation-map.svg` | Bỏ khỏi tuyến | Có phép tổng Minkowski chưa cần |
| `epigraph-levelset-indicator.svg` | Bỏ khỏi tuyến | Epigraph và hàm chỉ báo không cần cho chứng nhận |
| `convex-preservation-and-jensen.svg` | Bỏ khỏi tuyến | Jensen vượt nhu cầu Bài 01 |
| `line-restriction-convex-library.svg` | Bỏ khỏi tuyến | Thư viện hàm rộng và dễ quá tải |
| `psd-cone-and-quadratic-directions.svg` | Bỏ khỏi tuyến | Nón nửa xác định dương không cần trình bày riêng |

## Câu nối bắt buộc

- M03 → D00 → D01: bắt đầu bằng quyết định vật lý có giới hạn; D01 nêu "Nhu cầu:" chọn $u$ với $\lvert u\rvert\le u_{\max}$.
- D04 → L00 → L01: từ quyết định điều khiển sang dự đoán một giá trị số từ dữ liệu.
- L01 → L01B → L02: khái quát sang nhiều cột đặc trưng, rồi chọn đại lượng đo sai số.
- L04 → L04B → GT → G00: từ dự đoán giá trị liên tục sang quyết định phân loại; G00 nêu "Nhu cầu:" học đường thẳng tách hai lớp.
- G04 → T00 → T01: ba trường hợp cho ba hiện tượng về nghiệm nhưng cùng một dạng tổng quát; T01 nêu "Nhu cầu:".
- T02 → T02B → T03 → T04: định nghĩa cực tiểu địa phương/toàn cục, phân loại kết luận, rồi sáu câu hỏi chứng nhận.
- T04 → F00 → F01: sáu câu hỏi cần công cụ cho miền (câu 2) trước, rồi cho hàm mục tiêu (câu 3–6); F01 nêu phân rã này ở "Nhu cầu:".
- F05 → H01: miền lồi trả lời câu 2; mục tiêu còn phải có hình dạng phù hợp.
- H02 → H03B → H04: tiêu chuẩn vi phân cần miền mở, định lý Weierstrass cần miền đóng, bị chặn, nên ba khái niệm về tập được nhắc lại trước H04.
- H06 → H03 → H07: có tiêu chuẩn tính lồi thì định lý cực tiểu địa phương là toàn cục trả lời câu 4; câu 5, 6 cần giả thiết riêng.
- H07 → H07B → H08 → H09: $e^x$ lồi chặt mà không có nghiệm tạo nhu cầu cho lồi mạnh; chính quy hóa bậc hai là cách tạo lồi mạnh.
- H09 → K00 → K01: bộ công cụ đủ; mạch kết luận gắn từng giả thiết với từng kết luận; K01 nêu "Nhu cầu:".
- K04 → K06 → K05 → K05B: ba chứng nhận gom thành quy trình bốn bước, quy trình áp dụng cho bài toán chiếu sáng.
- K05B → K07 → K07B → K08: bảng tổng kết trả lời câu hỏi ở K06, bài tự kiểm tra hồi quy ridge đo mục tiêu 5, rồi tài liệu đọc.

## Nội dung bỏ hoặc chuyển khỏi mặt trang chiếu

- Không có lịch sử kiểu danh sách năm–tên–thuật toán.
- Không có nhãn quy trình, mã tuyến, mã trang hoặc thời lượng trên mặt trang chiếu và ghi chú diễn giả.
- Chứng minh đại số dài nằm trong `lecture-note.md`; mặt trang chiếu chỉ giữ mục tiêu, ý tưởng và bước then chốt.
- Từ 2026-11-13, câu xuất xứ số liệu ("dữ liệu minh họa tự tạo", "không phải số liệu thực nghiệm") không còn trên mặt trang, trong SVG deck dùng, hay trong ghi chú diễn giả; xuất xứ ghi một lần trong `review-log.md`.
- Lời giải mẫu trên mặt trang: D04, G04, F05, H07B (`fragment`); L04B, K05B (trang kế tiếp). Lời giải K07B nằm trong ghi chú diễn giả (bài tự làm).

## Hành trình định hướng bổ sung ngày 2026-09-07

M01 → M01A → M01B → M02 → M03; các trang tiếp theo giữ nguyên. Tổng khi đó: 41 trang, bảy mạch.

M01A/M01B giải quyết nhu cầu biết học gì và được đánh giá ra sao. M01A dùng hai cột để phân biệt vai trò; M01B dùng bảng ba thành phần và tổng trọng số 100%. Đầu vào là định danh học phần; đầu ra là định vị Bài 01 và kế hoạch học tập phù hợp. Không truyền ký hiệu toán học mới.

Chu trình sáu bước không áp dụng cho hai trang định hướng hành chính: không dạy khái niệm toán học hay giao bài tập xác suất tại đây. Trực quan được gộp vào hai cột và bảng; ví dụ tính toán, phát biểu hình thức, ứng dụng và bài tập không áp dụng. Hành trình toán học bắt đầu bằng ba nhu cầu tại M03 và giữ nguyên các bước đã ánh xạ. Hai trang dùng chung phân bổ 0,15 tiết của mạch mở đầu; không tăng tổng thời lượng.

Khác mẫu có chủ ý: chèn hai trang để đáp ứng yêu cầu giới thiệu học phần; không thay thứ tự lec01 → lec02 → lec03. Cuối kỳ có hai buổi theo chỉ dẫn người dùng (một buổi tuần 15, một buổi theo lịch thi), chung trọng số 60%.

Kiểm định toàn tuyến phát hiện dấu nhỏ hơn trong ghi chú H03 bị HTML hiểu thành thẻ. Đã đổi cách mã hóa thành `&lt;`, giữ nguyên bất đẳng thức và toàn bộ lập luận; rà lại H01–H06 để xác nhận kết nối và phân biệt nội dung hiển thị với ghi chú.
