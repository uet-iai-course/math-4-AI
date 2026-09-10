# Storyboard Bài 02 — Các bài toán tối ưu lồi (58 trang: 39 cốt lõi + 19 mở rộng)

## Bảy mạch của bài học

| Mạch | Đầu vào | Đầu ra | Chức năng | Đóng góp vấn đề trung tâm |
|---|---|---|---|---|
| TT1–6 Mở đầu và nhu cầu (0,40 tiết) | Bài 01; tiên quyết đại số tuyến tính, tập/hàm lồi | Đặc tả dữ liệu–biến–miền–mục tiêu–ràng buộc; chứng nhận lồi; phân biệt tồn tại/duy nhất | Đặt bài: mô hình đúng trước thuật toán | Lập mô hình đúng yêu cầu trước khi tìm nghiệm |
| TT7–13 Hồi quy LP và QP (0,55 tiết) | Bài toán hồi quy có ràng buộc NEW-01 | Nghiệm QP số, epigraph, minimax thành LP, ví dụ phân bổ | Nhận dạng lớp qua yêu cầu | Cùng dữ liệu, đổi yêu cầu → đổi lớp mô hình |
| TT14–20 QCQP và mở rộng (0,55 tiết) | Hồi quy đã có QP/LP | QCQP, ridge, phản ví dụ ma trận bất định, bảng quy trình | Giới hạn độ nhạy; kiểm tra bằng trung điểm | Chứng nhận lồi phải phủ cả mục tiêu lẫn ràng buộc |
| TT21–30 GP dầm (0,65 tiết) | Thiết kế kích thước dầm công-xôn | GP chuẩn, đổi log, nghiệm và kiểm tra số | Ngôn ngữ đơn thức/posynomial, cải dạng log | Tích và lũy thừa âm cần miền dương và log |
| TT31–36 SDP phép đo (0,50 tiết) | Hai cấu hình đo, covariance | SDP với LMI, nghiệm α*=1/2 | Nón PSD, epigraph trị riêng | Chặn hướng xấu nhất bằng bất đẳng thức ma trận |
| TT37–39 Kết luận (0,35 tiết) | Ba mạch mô hình hóa | Bảng kiểm chọn lớp, bài tập tích hợp, tài liệu | Tổng hợp quy trình chung | Đặc tả → nhận dạng → cải dạng → chứng nhận → đọc nghiệm |
| TT40–58 Mở rộng (ngoài 3 tiết) | Các mạch chính | Luyện tập, tựa lồi, nhiều mục tiêu, nón tổng quát | Đọc thêm và luyện thêm theo chủ đề | Các nhánh mở rộng của cùng quy trình |

Tổng 3 tiết chỉ phân bổ cho TT1–39; TT40–58 nạp khi `appendix=1`, điều hướng theo chủ đề và quay lại kết luận.

## Hành trình sáu bước cho từng khái niệm trọng tâm

**Hồi quy xuyên suốt (NEW-01 → A02 → C05/C04 → NEW-03/NEW-04 → C07-a/NEW-05 → Z02).** Nhu cầu: dự đoán từ hai tín hiệu tải với trần và dấu. Trực quan: tam giác C và đường mức. Ví dụ: X=I₂, y=(2,1). Hình thức: QP → epigraph → minimax LP → QCQP/ridge. Ứng dụng: giới hạn độ nhạy, phạt độ lớn. Bài tập: Z02. Ký hiệu nối ví dụ → hình thức: $\lVert Xw-y\rVert_2^2$ → $\frac12w^TPw+q^Tw+r$ với $P=2X^TX$; $\max_i\lvert r_i\rvert$ → biến $t$ và $2N$ bất đẳng thức affine. Câu nối: "Cùng dữ liệu, đổi yêu cầu là đổi lớp mô hình." Bước gộp: C05/C04 chung một nhịp ví dụ–định nghĩa; NEW-03/NEW-04 ghép cặp khái niệm–ứng dụng.

**LP phân bổ (C03-a → C03-b).** Nhu cầu: mua nguyên liệu rẻ nhất. Trực quan: đường mức chạm đỉnh (3,0). Ví dụ: min x₁+2x₂, x₁+x₂≥3. Hình thức: LP chuẩn, đa diện. Ứng dụng: trần cung x₁≤2. Bài tập: kiểm tra chuyển giao ngắn cuối TT13. Câu nối: "Hình học LP trả lời cả câu hỏi dữ liệu thay đổi." Rút gọn: gộp trực giác vào C03-a, hình học riêng C03-b.

**GP dầm (D01/D06-a → NEW-06 → D02/D03 → NEW-07/D04-a/D04-b → D06-b/D06-c → D07 phụ lục).** Nhu cầu: giảm thể tích dưới trần võng. Trực quan: đoạn gần ngàm cần cao hơn. Ví dụ: d=(37,19,7,1)/64. Hình thức: posynomial → lse sau log. Ứng dụng: hai kích thước B,H. Bài tập tại lớp: D06-c (thế lại nghiệm, kiểm ràng buộc); D07 là luyện thêm. Ký hiệu nối: $d_iB_i^{-1}H_i^{-3}$ → $\log d_i-u_i-3v_i$; $\sum B_iH_i$ → $\operatorname{lse}_i(u_i+v_i)$. Câu nối: "Cho phép đổi chiều rộng làm mất chứng nhận lồi theo biến gốc." Gộp: NEW-07 đặt ngay trước D04-a; D04 tách hai trang để tách quan hệ giá trị khỏi phép đổi.

**SDP phép đo (E01-a/E01-b → NEW-08 → E05 → E04 → NEW-09 → E06 phụ lục).** Nhu cầu: giảm phương sai hướng xấu nhất. Trực quan: hạ đường ngang t tới đỉnh. Ví dụ: Σ₀, Σ₁ cho trước. Hình thức: LMI tI−Σ(α)⪰0. Ứng dụng: xác suất trộn α*=1/2. Bài tập tại lớp: NEW-09 (kiểm ma trận tại nghiệm); luyện thêm: E06-a/b. Ký hiệu nối: $\max_{\lVert q\rVert=1}q^T\Sigma q$ → $tI-\Sigma(\alpha)\succeq0$. Câu nối: "Chặn mọi hướng cùng lúc là một bất đẳng thức ma trận." E05 luyện chặn trị riêng; E06-a mở rộng sang chuẩn phổ, E06-b chứng minh.

**Tựa lồi (B01 → NEW-10 → B02-a → B02-b → B03, phụ lục).** Chu trình sáu bước đầy đủ: nhu cầu (mục tiêu không lồi), trực quan (tập mức là khoảng), ví dụ x³ và phân thức x₁/x₂, hình thức (kiểm tra mức affine), ứng dụng (chia đôi), bài tập B03. Mạch chính chỉ chỉ đường tại Z01/Z03.

**Nhiều mục tiêu (F01 → F02 → F03 → F04, phụ lục).** Nhu cầu: hai tiêu chí xung đột; trực quan: đường đạt được; ví dụ hai bình phương; hình thức: Pareto, vô hướng hóa trọng số; ứng dụng: hồi quy vs. độ lớn tham số; bài tập F04. Chiều đảo trọng số đã sửa: cần tập U lồi, có thể cần trọng số 0.

## Bảng storyboard 58 trang

| TT/mã | Lý do tồn tại và nhu cầu | Nối vào–ra (mã trước/sau, chức năng) | Minh chứng LLO3/CLO1 | Quyết định + lý do |
|---|---|---|---|---|
| 1 P00 | Trang bìa định danh bài, nêu ba việc: mô hình hóa, nhận dạng, cải dạng | Vào từ Bài 01; ra P01 mở tiên quyết | Nêu phạm vi LLO3 trong notes | Giữ — mặt bìa tối giản, không liệt kê năm lớp |
| 2 P01 | Chốt đầu vào/sản phẩm học tập, lộ trình ba mạch | Ra NEW-01 đặt bài dự đoán | LLO3/CLO1 giữ nguyên trong notes | Sửa + gộp P02/P03 — tránh quá tải, không sửa chuẩn chính thức |
| 3 NEW-01 | Nhu cầu dự đoán có trần và dấu, sinh bài toán cụ thể xuyên suốt | Vào P01; ra A02 đặc tả | LLO3: lập mô hình có ràng buộc | Thêm — ví dụ xuyên suốt cho LP/QP/QCQP |
| 4 A02 | Khung tổng quát dữ liệu–biến–miền–mục tiêu, p* | Vào NEW-01; ra A04-a chứng nhận | LLO3: khái niệm bài toán tối ưu | Sửa — ánh xạ ví dụ vào khung; tách tồn tại sang NEW-02 |
| 5 A04-a | Chứng nhận lồi: miền lồi, mục tiêu lồi, đẳng thức affine | Vào A02; ra NEW-02 hỏi tồn tại | LLO3: nhận dạng tối ưu lồi | Tách từ A04 — một luận điểm mỗi trang |
| 6 NEW-02 | Phân biệt khả thi, hữu hạn, đạt, duy nhất | Vào A04-a; ra C05 giải ví dụ | LLO3: diễn giải nghiệm | Thêm — lấp khoảng trống khái niệm của bản cũ |
| 7 C05 | Nghiệm có ràng buộc w*=(1,5;0,5), p*=0,5 | Vào NEW-02; ra C04 khái quát QP | LLO3: giải QP có ràng buộc | Sửa — bộ số mới, chứng minh Cauchy trong notes |
| 8 C04 | Định nghĩa QP chuẩn, sinh P,q,r bằng khai triển | Vào C05; ra NEW-03 mở epigraph | LLO3: QP bậc hai | Sửa gọn — bỏ liệt kê thừa, giữ r khi báo giá trị |
| 9 NEW-03 | Epigraph: biến t chặn mục tiêu, tập lồi | Vào C04; ra NEW-04 đổi yêu cầu | LLO3: kỹ thuật cải dạng | Thêm — nền cho minimax và SDP sau này |
| 10 NEW-04 | Minimax sai số tệ nhất cải dạng thành LP | Vào NEW-03; ra C02 định nghĩa LP | LLO3: cải dạng tương đương | Thêm — nối ví dụ → hình thức bằng epigraph |
| 11 C02 | Định nghĩa LP, dấu hiệu nhận dạng, ngoại lệ c=0 | Vào NEW-04; ra C03-a ví dụ | LLO3: LP | Giữ + rút gọn — bỏ tuyên bố sai về đỉnh |
| 12 C03-a | Phân bổ hai nguồn: mô hình và giả thiết | Vào C02; ra C03-b hình học | LLO3: lập mô hình LP | Tách từ C03 — trực giác tách khỏi hình học |
| 13 C03-b | Hình học đường mức, biến thể trần cung | Vào C03-a; ra A01 khái quát biến đổi | LLO3: đọc nghiệm LP | Tách từ C03 — kiểm tra chuyển giao ngắn cuối mạch |
| 14 A01 | Bốn phép biến đổi và điều kiện bảo toàn | Vào C03-b; ra A03 cảnh báo tương đương | LLO3: cải dạng có kiểm soát | Chuyển + sửa — sau ví dụ mới có cái đối chiếu |
| 15 A03 | Cùng miền chưa đủ kết luận lồi; ví dụ tia | Vào A01; ra C07-a QCQP | LLO3: kiểm tra cấu trúc | Sửa — thêm mục tiêu, sửa notes log p* |
| 16 C07-a | Giới hạn độ nhạy ‖w‖²≤1, nghiệm số | Vào A03; ra C07-b dạng chuẩn | LLO3: QCQP | Tách từ C07 — ví dụ trước định nghĩa |
| 17 C07-b | Dạng QCQP, điều kiện PSD từng ma trận | Vào C07-a; ra C08 phản ví dụ | LLO3: nhận dạng QCQP | Tách từ C07 — kiểm tra cả mục tiêu và ràng buộc |
| 18 C08 | Phản ví dụ trung điểm cho ma trận bất định | Vào C07-b; ra NEW-05 so lựa chọn | LLO3: kiểm tra bằng định nghĩa | Giữ — chứng minh tập cụ thể không lồi |
| 19 NEW-05 | Phạt λ‖w‖² và trần τ là hai lựa chọn mô hình | Vào C08; ra C01 tổng hợp lớp | LLO3: QP/QCQP | Thêm — so ý nghĩa yêu cầu, không đổi chỗ tùy ý |
| 20 C01 | Ba dòng LP⊆QP⊆QCQP trên cùng dữ liệu | Vào NEW-05; ra D01 chuyển mạch GP | LLO3: quan hệ các lớp | Chuyển từ đầu phần C — tổng hợp sau ví dụ |
| 21 D01 | Nhu cầu thiết kế dầm: thể tích, tải, võng | Vào C01; ra D06-a mô hình hóa | LLO3: lập mô hình GP | Sửa — không đưa công thức lên trang chuyển phần |
| 22 D06-a | Dầm rộng cố định, bộ số d=(37,19,7,1)/64 | Vào D01; ra NEW-06 mở hai kích thước | LLO3: mô hình lồi theo H | Tách + sửa — giả thiết lên body, hình vẽ lại |
| 23 NEW-06 | Cho phép đổi B,H: mục tiêu tích mất chứng nhận lồi | Vào D06-a; ra D02 ngôn ngữ đơn thức | LLO3: nhận dạng phi lồi | Thêm — tạo nhu cầu cải dạng GP |
| 24 D02 | Định nghĩa đơn thức, posynomial, gắn ví dụ dầm | Vào NEW-06; ra D03 dạng chuẩn | LLO3: ngôn ngữ GP | Giữ — nhận dạng theo quy tắc, không theo trực giác |
| 25 D03 | Dạng chuẩn GP, chuẩn hóa, giới hạn áp dụng | Vào D02; ra NEW-07 chuẩn bị log | LLO3: GP | Giữ — đẳng thức đơn thức hợp lệ, tổng không |
| 26 NEW-07 | Nhắc lse và tính lồi trước khi đổi log | Vào D03; ra D04-a phép đổi | LLO3: hàm lồi | Thêm đúng trước D04 — chứng minh phương sai để notes |
| 27 D04-a | Đổi log: đơn thức → affine, posynomial → lse | Vào NEW-07; ra D04-b khôi phục | LLO3: cải dạng log | Tách từ D04 — tách phép đổi khỏi quan hệ giá trị |
| 28 D04-b | Khôi phục nghiệm, p*=exp(p̃*), đúng chiều | Vào D04-a; ra D06-b áp dụng dầm | LLO3: đọc giá trị sau cải dạng | Tách từ D04 — sửa lỗi log giữ p* của bản cũ |
| 29 D06-b | Cải dạng dầm hai kích thước thành bài lồi | Vào D04-b; ra D06-c kiểm tra | LLO3: GP → lồi | Tách + sửa — giữ giới hạn tỉ lệ, ca cũ vào notes |
| 30 D06-c | Kiểm tra một đoạn, chứng nhận bằng cận dưới, diễn giải | Vào D06-b; ra E01-a chuyển mạch SDP | LLO3: kiểm chứng nghiệm | Tách từ D06 — bộ số 4 đoạn kiểm bằng số |
| 31 E01-a | Dữ liệu sai số hai cấu hình, định nghĩa covariance | Vào D06-c; ra E01-b yêu cầu | LLO3: mô hình hóa SDP | Tách + sửa — giải thích covariance trước khi dùng |
| 32 E01-b | Phối hợp ngẫu nhiên α, mục tiêu max hướng | Vào E01-a; ra NEW-08 nón PSD | LLO3: lập mô hình min-max | Tách từ E01 — tách dữ liệu khỏi yêu cầu |
| 33 NEW-08 | Nón PSD, thứ tự ⪯, kiểm tra ma trận phần tử dương | Vào E01-b; ra E05 epigraph trị riêng | LLO3: SDP | Thêm — khái niệm nón cần trước LMI |
| 34 E05 | Epigraph λmax trên ví dụ đường chéo | Vào NEW-08; ra E04 dạng SDP | LLO3: trực quan LMI | Giữ — ca dễ kiểm tra ký hiệu trước covariance |
| 35 E04 | Dạng chuẩn SDP, chứng nhận LMI | Vào E05; ra NEW-09 nghiệm | LLO3: SDP | Sửa — ký hiệu z thống nhất, không mở thuật toán |
| 36 NEW-09 | Nghiệm α*=1/2, t*=1,5; ý nghĩa LMI | Vào E04; ra Z01 bảng kiểm | LLO3: diễn giải nghiệm SDP | Thêm — đối chiếu hai đầu với phối hợp |
| 37 Z01 | Bảng kiểm chọn lớp theo dấu hiệu cấu trúc | Vào NEW-09; ra Z02 bài tập | LLO3: tổng hợp quy trình | Sửa — rút điều kiện vừa phải, gắn ba mạch |
| 38 Z02 | Bài tập tích hợp: mô hình, cải dạng, đọc nghiệm | Vào Z01; ra Z03 tài liệu | LLO3: vận dụng, đánh giá bài tập | Sửa — nhiệm vụ tích hợp thay liệt kê |
| 39 Z03 | Nguồn đối chiếu, phụ lục, bài tiếp theo | Vào Z02; ra phụ lục TT40–58 | LLO3: tài liệu đọc thêm | Sửa — chỉ đường phụ lục, không trình chiếu liên tục |
| 40 A04-b | Khử đẳng thức và biến dư bảo toàn p* | Vào Z03; ra C06 luyện QP | LLO3: cải dạng | Tách + chuyển phụ lục — kỹ thuật, không cốt lõi |
| 41 C06 | Luyện giải QP trên simplex, nghiệm (0,8;0,2) | Vào A04-b; ra C10 chứng nhận | LLO3: tính toán QP | Chuyển phụ lục — giữ bài toán số làm luyện tập |
| 42 C10 | Chứng nhận QCQP bằng Hessian và hình học | Vào C06; ra C09 so sánh lớp | LLO3: chứng nhận lồi | Chuyển phụ lục — luyện nhận dạng, chưa cần KKT |
| 43 C09 | So sánh LP và QP trên cùng miền khả thi | Vào C10; ra D05 GP đơn giản | LLO3: phân loại bài toán | Chuyển phụ lục — ba ca tăng dần độ khó |
| 44 D05 | GP tích dưới ngân sách, kiểm tra AM–GM | Vào C09; ra D07 đổi log | LLO3: GP | Chuyển phụ lục + sửa — log không bắt buộc ở đây |
| 45 D07 | Bài tập đổi log và khôi phục biến, giá trị | Vào D05; ra E02 nón tổng quát | LLO3: cải dạng GP | Chuyển phụ lục — luyện thao tác sau D04 |
| 46 E02 | Thứ tự do nón sinh, tổng quát hóa PSD | Vào D07; ra E03 khuôn nón | LLO3: nón | Chuyển phụ lục — mở rộng khái niệm NEW-08 |
| 47 E03 | Khuôn tối ưu nón chung cho LP và SDP | Vào E02; ra E06-a LMI khối | LLO3: quan hệ biểu diễn | Chuyển phụ lục — giữ công thức, không mở đối ngẫu |
| 48 E06-a | Chặn chuẩn phổ bằng LMI khối | Vào E03; ra E06-b chứng minh | LLO3: LMI, bài tập sửa | Tách + chuyển phụ lục — câu hỏi sửa thực hành chặn chuẩn phổ |
| 49 E06-b | Schur đúng cả t=0, không dùng nghịch đảo | Vào E06-a; ra B01 tựa lồi | LLO3: chứng minh kỹ thuật | Tách + chuyển phụ lục — sửa lỗi Schur t=0 của bản cũ |
| 50 B01 | Định nghĩa tựa lồi, ví dụ x³ trên [−1,1] | Vào E06-b; ra NEW-10 phân thức | LLO3: tựa lồi | Chuyển phụ lục — giữ trong tài liệu đọc và bài tập |
| 51 NEW-10 | Phân thức không lồi nhưng mức là affine | Vào B01; ra B02-a chia đôi | LLO3: tựa lồi | Thêm phụ lục — ví dụ kiểm tra mức khả thi hữu hiệu |
| 52 B02-a | Chia đôi ba bước kiểm tra bằng tay | Vào NEW-10; ra B02-b bảo đảm | LLO3: thuật toán trên mức | Tách + chuyển phụ lục — luyện thao tác trước lý thuyết |
| 53 B02-b | Bất biến, số lần gọi, tinh tế infimum | Vào B02-a; ra B03 tự kiểm tra | LLO3: bảo đảm thuật toán | Tách + chuyển phụ lục — tách đầu ra khỏi ví dụ số |
| 54 B03 | Tự kiểm tra: dạng chuẩn, tựa lồi, biểu diễn tương đương | Vào B02-b; ra F01 nhiều mục tiêu | LLO3: phân loại và cải dạng | Chuyển phụ lục — ba ca phân biệt ba tình huống |
| 55 F01 | Hai tiêu chí xung đột, đường đạt được | Vào B03; ra F02 Pareto | LLO3: tối ưu vector | Chuyển phụ lục — giữ ví dụ toán minh họa |
| 56 F02 | Nhỏ nhất, tối tiểu, trội; định nghĩa đầy đủ | Vào F01; ra F03 trọng số | LLO3: Pareto | Chuyển phụ lục + sửa — phân biệt nhỏ nhất/tối tiểu |
| 57 F03 | Vô hướng hóa: chiều thuận, chiều đảo cần tập U lồi | Vào F02; ra F04 bài tập | LLO3: trọng số Pareto | Chuyển phụ lục + sửa — chiều đảo trọng số đúng |
| 58 F04 | Bài tập trội và chọn trọng số, phản ví dụ có một trọng số bằng 0 | Vào F03; quay lại kết luận TT39 | LLO3: luyện tập nhiều mục tiêu | Chuyển phụ lục — giữ bài tập, điều hướng theo chủ đề |

## Ghi chú triển khai

- Thứ tự 58 mã giữ nguyên theo đề xuất; không thêm trang. Khoảng trống khái niệm (tồn tại/duy nhất, lse, nón PSD, phân thức) được lấp bằng các mã NEW sẵn có, không bằng trang mới.
- Chỉ notes và tài liệu mới giữ chứng minh dài: Cauchy (C05), Hessian lse (NEW-07), Schur t=0 (E06-b), chiều đảo trọng số (F03), ca SSE trần chuẩn (Z02).
- Hình đã triển khai thành 22 SVG cục bộ trong img/lec-02/: các miền khả thi, đường mức, dầm bốn đoạn, phép đổi log, trị riêng, chia đôi và Pareto. Công thức dùng KaTeX; không cắt ảnh PDF. Danh mục và truy nguyên ghi trong review-log.md.
- Không ghi phút hoặc mã trang trên mặt slide hay trong speaker notes; nhóm mở rộng chỉ nạp khi `appendix=1`.
