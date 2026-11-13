# Storyboard Bài 00: Ôn tập nền tảng toán học cho AI

Trạng thái hiện hành (2026-11-13, sau đợt sửa deck theo bảng phát hiện 2026-11-13 và theo ghi chú bài giảng viết lại ngày 2026-11-12): 92 trang lá, 92 mã `data-slide-id` duy nhất, bảy `<section>` ngoài. Mỗi mạch trừ mạch mở đầu mở bằng một trang tiêu đề mạch (`section.strand-title`, `id="mach-N"`). Bảng theo từng trang khớp thứ tự DOM. Storyboard cũ `2627-1/lecture-00-storyboard.md` giữ nguyên làm lịch sử (quyết định D00 của điều phối viên).

Ghi chú bài giảng `materials/lec-00/lecture-note.md` là chuẩn nội dung: ký hiệu theo bảng §2 của ghi chú (vector và ma trận không in đậm; $X$ chỉ dùng cho ma trận thiết kế; biến ngẫu nhiên vô hướng $U$, $V$; tham số Bernoulli $\theta$; $D_dh$, $\nabla^2h$, hàm ngoài $\chi$, $J_{\mathrm{GLS}}$, $w_{\mathrm q}$, $\phi_{\mathrm q}$), thuật ngữ "vector", số hiệu khối theo đánh số 2026-11-12. Bài 00 không có LLO riêng; năm mục tiêu trên P01 (MT1–MT5) gộp sáu mục tiêu của ghi chú và hỗ trợ CLO1–CLO2.

| Mục tiêu trên P01 | Mục tiêu của ghi chú |
|---|---|
| MT1 Biểu diễn dữ liệu bằng ma trận; dùng hạng kết luận về nghiệm | 1, 2 |
| MT2 Gradient, Jacobian, Hessian; bình phương nhỏ nhất; phân loại điểm dừng | 3 (và tính xác định dương của mục tiêu 2) |
| MT3 Xác suất, kỳ vọng, phương sai, biên, điều kiện, Bayes, hiệp phương sai | 4 (phần tính toán), 5 (phần tính toán) |
| MT4 Nhiễu và phần dư; bình phương nhỏ nhất và dạng tổng quát từ hợp lý cực đại | 4 (phần chứng minh), 5 (điều kiện GLS) |
| MT5 Dự đoán kèm dải nhiễu; quá khớp | 6 |

## Sườn lý thuyết chung

- **Bài toán trung tâm:** từ bốn căn nhà đã quan sát, tìm trọng số của mô hình giá và dự đoán giá căn nhà $65\,\mathrm m^2$, $2$ phòng ngủ kèm mức bất định.
- **Đối tượng và ký hiệu:** $(a_i,b_i,y_i)$, $a'_i=(a_i-55)/10$, $b'_i=b_i-2$, $\phi_i=(1,a'_i,b'_i)^T$, $X\in\mathbb R^{4\times3}$, $w$, $r(w)=Xw-y$ (quy ước $r_i=\hat y_i-y_i$), $f(w)=\tfrac12\lVert Xw-y\rVert_2^2$; ví dụ phụ $h(u,v)$, $F(u,v)$, bảng $p_{U,V}$.
- **Giả thiết:** (A1) hạng cột đầy đủ; (A2) độ trơn; (P1) nhiễu Gauss độc lập, cùng phân phối, $\sigma^2$ cố định; (P2) nhiễu Gauss tương quan, $\Sigma_\varepsilon$ đã biết.
- **Chuỗi định nghĩa → kết quả → phương pháp:** ma trận thiết kế → hạng, hệ không tương thích → phương trình chuẩn (Định lý 00.22) → gradient, điều kiện bậc nhất và bậc hai (Định lý 00.42, 00.43, Mệnh đề 00.45) → $w_{\mathrm{LS}}=(14,2,1)^T$ → hợp lý cực đại dưới (P1) (Mệnh đề 00.65) và (P2) (Mệnh đề 00.73) → dải nhiễu $16\pm1{,}96\sigma$.
- **Giới hạn áp dụng:** dải nhiễu coi trọng số bằng $w_{\mathrm{LS}}$ và $\sigma$ đã biết; mô hình bốn trọng số khớp đúng bốn căn nên SSE huấn luyện không chọn được mô hình.

## Chức năng và ranh giới mạch

| Số | Trang tiêu đề | Tên mạch | Câu hỏi trung tâm | Chức năng | Đầu vào → đầu ra | Số trang |
|---|---|---|---|---|---|---:|
| 1 | `P00` (bìa) | Mở đầu | Bài ôn tập giải quyết nhiệm vụ gì | Phạm vi, mục tiêu, danh sách mạch, nhiệm vụ chung | — → nhiệm vụ "từ bốn căn nhà, tìm trọng số và dự đoán kèm bất định" | 3 |
| 2 | `H00` | Dự đoán giá nhà và phần dư | Đo độ sai lệch của các dự đoán giá trên bốn căn nhà bằng con số nào | Ví dụ xuyên suốt, mô hình, quy ước phần dư, mất mát | Nhiệm vụ chung → $r_i$, $f(w^{(0)})=4{,}5$ | 6 |
| 3 | `A00` | Đại số tuyến tính cho dữ liệu | Ghép bốn mẫu thành một hệ tuyến tính và giải gần đúng hệ đó thế nào | Đối tượng, phép toán, ma trận thiết kế, hạng, hệ không tương thích, dạng toàn phương, phép chiếu | $r_i,f$ → $X$, $r(w)$, phương trình chuẩn | 18 |
| 4 | `B00` | Giải tích nhiều biến cho hàm mất mát | $f(w)$ nhạy thế nào theo từng trọng số, điểm dừng ở đâu và điểm dừng nào là cực tiểu | Đạo hàm đến Taylor; điều kiện bậc nhất, bậc hai; áp vào $f$; một bước hạ gradient | $f$ dạng ma trận → $\nabla f=X^Tr$, $w_{\mathrm{LS}}$ là cực tiểu, bước hạ gradient | 23 |
| 5 | `C00` | Xác suất một biến | Mô tả độ phân tán của giá một căn nhà khi đặc trưng đã cố định bằng công cụ nào | Không gian xác suất, biến ngẫu nhiên, hàm khối, tích phân, hàm mật độ, CDF, kỳ vọng, phương sai, Gauss một biến | Phần dư khác không → phân phối Gauss, $0{,}6827$ và $0{,}95$ | 14 |
| 6 | `D00` | Vector ngẫu nhiên, nhiễu và phân phối nhiều biến | Mô tả đồng thời nhiễu của bốn căn nhà và suy ra hàm mất mát từ mô hình nhiễu thế nào | Phân phối đồng thời, biên, điều kiện, Bayes, độc lập; nhiễu và hợp lý; hiệp phương sai; Gauss nhiều biến; GLS | Gauss một biến → $w_{\mathrm{LS}}$ là MLE dưới (P1); GLS dưới (P2) | 18 |
| 7 | `E00` | Tổng hợp mô hình giá nhà | Dự đoán giá căn $65\,\mathrm m^2$, 2 phòng kèm dải nhiễu, và chọn mô hình nào | Mạch kết luận: áp dụng tổng hợp, quá khớp, bài tập tổng hợp, bảng tổng kết, tài liệu đọc | Ba công cụ → dự đoán $16$, dải $[14{,}04;\,17{,}96]$, bảng tổng kết | 10 |

Tên mạch 5 và 6 đổi theo tên mục 6 và 7 của ghi chú (phát hiện thuật ngữ 2026-11-13); P02, C00, D00 cùng đổi.

**Mạch kết luận (quyết định 2026-11-13, ghi ngoại lệ).** Bảng phát hiện ghi mạch 7 trộn nội dung mới với tổng kết và tài liệu đọc. Tách thành mạch thứ tám vượt khoảng 5–7 mạch; bảy mạch là cấu trúc đã cố định. Cách xử lý: mạch 7 là mạch kết luận theo `AGENTS.md` §"Mở bài và kết bài" (tổng hợp kết quả và điều kiện sử dụng; trang cuối nối kết quả với ứng dụng xuyên suốt bằng một phép tính). E01–E04 chỉ áp dụng kết quả của mạch 3–6 cho căn nhà mới; nội dung mới duy nhất là Định nghĩa 00.74 (quá khớp) ở A11–E05, tương ứng §8.2 "Ý nghĩa, tác động và giới hạn" của ghi chú, cũng là mục kết luận của ghi chú. Tích phân (B12; B13 gộp vào ghi chú B12 ở lượt sửa 1), trước đây không phục vụ câu hỏi mạch 4, chuyển sang mạch 5 ngay trước hàm mật độ.

**Ngoại lệ mật độ.** `P02`: 7 dòng (trước 7, sau 7; 56 → 55 âm tiết) vượt trần 6 dòng vì trang Nội dung phải liệt kê đủ bảy mạch; dòng nhiệm vụ trung tâm nằm trong khung. Không trang nội dung nào vượt trần 60 âm tiết (trước và sau đợt sửa); `P01` 75, `E07` 48 dưới trần 80.

**Thời lượng.** Tổng 150 phút (2 tiết lý thuyết + 1 tiết bài tập) như storyboard cũ, phân bổ cũ P/H/A/B/C/D/E 6/10/31/37/25/25/16 phút. Đợt này chuyển tích phân từ phần B sang C, nhiễu và hợp lý từ C sang D, thêm ba trang điều kiện tối ưu vào B và một trang lời giải vào D; phân bổ theo phần chờ điều phối viên chốt lại, không ghi trên mặt trang hay ghi chú diễn giả.

**Lượt sửa 1 sau kiểm lại (2026-11-13).** Gộp B13 (tích phân kép) vào ghi chú diễn giả B12 (quyết định `gộp`, mục #12, #16 của danh sách điều phối viên): trang dùng "mật độ đồng thời" trước Định nghĩa 00.59 và không phục vụ câu hỏi mạch 5; mạch 6 chỉ dùng bảng rời rạc và tích mật độ, không lấy tích phân kép. Bài còn 92 trang, mạch 5 còn 14 trang.

**Ngoại lệ "phát biểu kèm ví dụ trên một trang" (mục #18).** Các trang A04, A05, A05B, A06, B03D, B04, B05, B06, C01, C03, C04, C05, D04, D05, D06 đặt khung "Ví dụ." hoặc một dòng số ngay dưới định nghĩa. Bài 00 là bài ôn tập kiến thức tiên quyết; mỗi định nghĩa được kiểm ngay trên dữ liệu nhỏ, và quy định cho phép các bước của hành trình chung một trang ("Steps may share a slide") khi trang vẫn một luận điểm. Tách các trang này sẽ thêm khoảng 15 trang ví dụ một dòng.

**Lý do giữ $\Sigma_Z$ ở D08 (mục #9).** Ghi chú viết $\Sigma=\operatorname{Cov}(Z)$; deck có ba ma trận hiệp phương sai liền nhau (bảng ở D08, Gauss nhiều biến ở D09, nhiễu ở D10), nên chỉ số $Z$ phân biệt ma trận của bảng.

## Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm; ký hiệu truyền; mục tiêu |
|---|---|---|---|---|---|---|---|
| Hàm mất mát bình phương | H00, H01 ("Nhu cầu:"), H05 ("Nhu cầu:"); ví dụ dẫn nhập H03 làm cụ thể nhu cầu so sánh các bộ trọng số | H05 ("Trực quan.") | H03, H05 | H05 | A10, B14 | A15 câu 2, A15L | Bốn phần dư → $f(w)=\tfrac12\sum r_i^2$; MT1, CLO1 |
| Đối tượng, phép toán, ma trận thiết kế | A00, A01 | A01 (ba thẻ), A08 | A02, A03, A08–A10 | A01–A03, A09 | A10 | A07/A07L câu 1–3; A15/A15L | $r_i,f$ → $\phi_i$, $X$, $Xw$; MT1, CLO1 |
| Hạng, không gian cột, nghịch đảo | A05 ("Nhu cầu:") | A05 ("Trực quan.": $Xw$ là tổ hợp các cột) | A05, A05B, A04 | A05, A05B, A04 | A12 (hệ bốn căn vô nghiệm), A14 (A1) | A07/A07L câu 4 | Cột của $X$ → $\operatorname{rank}(X)=3$, $y\notin\operatorname{Col}(X)$; MT1, CLO1 |
| Dạng toàn phương | A06 ("Nhu cầu:": dấu của $\tfrac12w^TX^TXw$) | A06 ("Trực quan.": elip $q(x)=\tau$) | A06 | A06 | B17 ($X^TX\succ0$), B11C | A07/A07L câu 5 | $X^TX$ → PSD, PD; MT1–MT2, CLO1 |
| Hệ không tương thích và phép chiếu | A12 | A13 (hình phép chiếu) | A12, A15 | A13, A14 | B16 | A15, A15L | Hệ vô nghiệm → hình chiếu → phương trình chuẩn; MT1, CLO1 |
| Đạo hàm, Jacobian, Hessian, Taylor | B00, B01 ("Nhu cầu:"), B05 ("Nhu cầu:") | B02, B03 (lát cắt, tiếp tuyến), B10 | B02–B11 trên $h$, $F$ | B03D, B04, B05, B07–B11 | B14, B15, B17 | B19 câu 2–3, B19L | $h,F$ → $\nabla h$, $D_dh$, $J_F$, $\nabla^2h$, Taylor; MT2, CLO1 |
| Điều kiện tối ưu | B11A ("Nhu cầu:"), B11B ("Nhu cầu:") | B11A, B11B ("Trực quan.") | B11C ($h$), ghi chú B11A ($s=u^2-v^2$) | B11A (Định lý 00.42), B11B (Định lý 00.43) | B15, B16, B17 | B19 câu 4 | Taylor bậc hai → điểm dừng, phân loại; MT2, CLO1 |
| Gradient của mất mát, phương trình chuẩn, bước hạ gradient | B14 (quy tắc dây chuyền áp vào $f$) | ghi chú B15 (hướng $-\nabla f$) | B15, B16, B18 | B14, B17, B18 (Định nghĩa 00.46, (5.1)) | B18 | B19 câu 1, B19L | $f=\chi\circ r$ → $w_{\mathrm{LS}}$, $f(w^+)$; MT2, CLO1 |
| Không gian xác suất, biến ngẫu nhiên, PMF | C00, C10 ("Nhu cầu:") | C03 ("Trực quan.": dụng cụ đo), C01 (hình) | C01, C03, C04 | C02, C03, C04 | C09 câu 1 | C09, C09L | Giá chưa biết trước → $U$, $p_U$, $\theta$; MT3, CLO2 |
| Tích phân và hàm mật độ, CDF | B12, C05 ("Nhu cầu:") | B12 (hình), C05 (diện tích) | B12, C05, C06; tích phân kép trong ghi chú B12 | B12, C05, C06 | C12 | C09 câu 2–3 | Tổng tích lũy → $\Pr(U\in B)=\int_Bp_U$; MT3, CLO2 |
| Kỳ vọng, phương sai, Gauss một biến | C12 ("Nhu cầu:") | C07 ("Trực quan.": tâm cân bằng), C12 (hình) | C07, C08, C12 | C07, C08, C12 | E04 | C09 câu 1, 4 | $p_U$ → $\mathbb E$, $\operatorname{Var}$, $\mathcal N(\mu,\sigma^2)$, $1{,}96$; MT3, CLO2 |
| Phân phối đồng thời, biên, điều kiện, Bayes, độc lập | D00, D01 ("Nhu cầu:"), D06 ("Nhu cầu:") | D01 (hình), D02 (bảng) | D02–D06 | D02, D04, D05, D06 | C13 (tích mật độ), D11 | D11, D11L | Bảng $p_{U,V}$ → biên $0{,}5$/$0{,}6$, $0{,}8$, $2/3$, phụ thuộc; MT3, CLO2 |
| Nhiễu, phần dư, hàm hợp lý | D06 ("Nhu cầu:"), C10 | C13 ("Trực quan.") | C11 (căn 2), ghi chú C13 ($2{,}5$) | C11 (Định nghĩa 00.63), C13 (Định nghĩa 00.64, Mệnh đề 00.65) | E04 | C14, C14L | Độc lập → $L(w)$ → $w_{\mathrm{LS}}$ là MLE; MT4, CLO2 |
| Hiệp phương sai, Gauss nhiều biến, GLS | D07, D09, D10 ("Nhu cầu:") | D08 ("Trực quan."), D09 (elip) | D07, D08, D09, D10B | D08, D09, D10 (Mệnh đề 00.73) | E01, E06 câu 5 | D11 câu 2–4, E06/E06L câu 5 | Bảng → $\Sigma$, $\rho$ → $J_{\mathrm{GLS}}$; MT3–MT4, CLO2 |
| Dự đoán kèm dải nhiễu và quá khớp | E00, E01 ("Nhu cầu:") | A11 (đặc trưng mở rộng) | E02–E04, E05 | E04, E05 (Định nghĩa 00.74) | E04, E05 | E06 câu 3–4, E06L; E07 tổng kết | Toàn bộ chuỗi số → $16$, $[14{,}04;17{,}96]$, $15{,}75$; MT5, CLO1–CLO2 |

Ví dụ dẫn nhập H03 cụ thể hóa nhu cầu so sánh các bộ trọng số trước H05. B11C đứng sau phát biểu B11A–B11B vì phép phân loại cần cả hai định lý; bước ví dụ của điều kiện bậc nhất (điểm yên ngựa $s=u^2-v^2$) nằm trong ghi chú B11A để giữ trang dưới trần. Trang tiêu đề mạch H00, A00, B00, C00, D00, E00 có dòng dẫn nêu đúng câu hỏi trung tâm và được lặp ở dòng "Nhu cầu:" của trang nội dung đầu mạch (H01, A01, B01, C10, D01, E01), nên là bước `nhu cầu` của cụm đầu mạch.

## Bảng theo từng trang

Cột "Âm tiết" ghi số âm tiết chữ trên mặt trang do `deck_check.py` đo ngày 2026-11-13 (trước → sau; "—" là trang mới). Mã F1–F15 là các dòng của bảng phát hiện 2026-11-13 theo thứ tự, xem `review-log.md`.

| Mã | Tiêu đề | Lý do tồn tại và khoảng trống | Vào → ra | Vị trí trong sườn | Mục tiêu/CLO | Âm tiết | Quyết định |
|---|---|---|---|---|---|---|---|
| P00 | Bài 00: Ôn tập nền tảng toán học cho AI | Bìa, trang tiêu đề mạch 1 | Mở bài → P01 | Điểm vào mạch 1 | CLO1–CLO2 | 25 → 25 | `giữ`; ghi chú bỏ "sẽ" |
| P01 | Mục tiêu bài học | Năm mục tiêu gộp sáu mục tiêu của ghi chú | P00 → P02 | Sản phẩm học tập của sườn | MT1–MT5 | 61 → 75 | `sửa` (F5): thêm Bayes, hiệp phương sai, GLS, phân loại điểm dừng, quá khớp; trần 80. Lượt sửa 1: ghi chú bỏ câu tự mô tả (#27) |
| P02 | Nội dung | Danh sách bảy mạch và nhiệm vụ trung tâm | P01 → H00 | Bản đồ sườn | CLO1–CLO2 | 56 → 55 | `sửa` (F4): tên mục 5, 6 theo ghi chú; ngoại lệ 7 dòng |
| H00 | 2. Dự đoán giá nhà và phần dư | Trang tiêu đề mạch 2 | P02 → H01 | Điểm vào mạch 2; bước `nhu cầu` | MT1 | 30 → 30 | `giữ` |
| H01 | Bốn căn nhà đã quan sát | Dữ liệu xuyên suốt; nêu câu hỏi mạch | H00 → H02 | Đối tượng | MT1 | 26 → 33 | `sửa` (F6, F7): thêm "Nhu cầu:"; bỏ câu xuất xứ dữ liệu; ghi chú bỏ rào đón |
| H02 | Dự đoán giá từng căn nhà | Đặc trưng đổi thang, mô hình tuyến tính | H01 → H03 | Mô hình | MT1 | 37 → 37 | `giữ` |
| H03 | Ví dụ: phần dư tại trọng số thử | Tính bốn phần dư | H02 → H04 | Ví dụ dẫn nhập của mất mát | MT1 | 21 → 21 | `sửa` (F6): nguồn trỏ Ví dụ 00.2 |
| H04 | Nguồn gốc của phần dư | Ba nguồn của phần dư | H03 → H05 | Giới hạn của mô hình | MT1, MT4 | 40 → 40 | `sửa`: ghi chú bỏ "thường", bỏ chỉ đường sang mạch xác suất. Lượt sửa 1: ghi chú: câu nối viết trực tiếp (#27) |
| H05 | Hàm mất mát bình phương | Một con số so sánh các bộ trọng số | H04 → A00 | Định nghĩa $f$ | MT1 | 45 → 48 | `sửa`: "Ý nghĩa:" bỏ "nhìn chung". Lượt sửa 1: ghi chú: câu nhân quả viết trực tiếp, bỏ vế phủ định (#27) |
| A00 | 3. Đại số tuyến tính cho dữ liệu | Trang tiêu đề mạch 3 | H05 → A01 | Điểm vào mạch 3; bước `nhu cầu` | MT1 | 31 → 31 | `sửa` (F4): "vector" |
| A01 | Đối tượng của đại số tuyến tính | Kiểu, kích thước; nêu câu hỏi mạch | A00 → A02 | Đối tượng | MT1 | 53 → 53 | `sửa` (F7): "Nhu cầu:" nêu câu hỏi mạch 3. Lượt sửa 1: "Nhu cầu:" lặp đủ câu hỏi mạch 3; kiểu và kích thước chuyển vào ghi chú (#19) |
| A02 | Vector và phép toán | Tích vô hướng, chuẩn trên $\phi_1$ | A01 → A03 | Công cụ | MT1 | 31 → 31 | `sửa` (F3): không in đậm; $\lVert\phi_1\rVert_2=(4{,}25)^{1/2}\approx2{,}06$ thay căn để bỏ báo OVERFLOW. Lượt sửa 1: hoàn lại $\sqrt{4{,}25}$ (quyết định điều phối viên); bộ số dùng ";" (#8) |
| A03 | Ma trận, chuyển vị và kích thước | Quy tắc kích thước | A02 → A08 | Công cụ | MT1 | 22 → 22 | `sửa` (F3): ký hiệu |
| A08 | Nhiều mẫu và nhiều đặc trưng | Vector đặc trưng của bốn căn | A03 → A09 | Đối tượng | MT1 | 11 → 16 | `sửa` (F3): bỏ $\Phi$ (ghi chú không dùng), khung nêu $\hat y_i=w^T\phi_i$; chuyển lên trước hạng theo §4.1 của ghi chú |
| A09 | Ma trận thiết kế | $X\in\mathbb R^{4\times3}$, $w$, $y$ | A08 → A10 | Đối tượng trung tâm | MT1 | 26 → 28 | `sửa` (F3): $X$ định nghĩa bằng hàng $\phi_i^T$ |
| A10 | Dự đoán và phần dư dạng vector | $Xw^{(0)}$, $r$, $f$ | A09 → A05 | Ví dụ | MT1 | 0 → 0 | `sửa` (F3): ký hiệu |
| A05 | Hạng và phụ thuộc tuyến tính | Độc lập tuyến tính, hạng | A10 → A05B | Định nghĩa | MT1 | 41 → 48 | `sửa` (F8): thêm "Nhu cầu:" và "Trực quan." trước định nghĩa; ký hiệu $v_j$, $\alpha_j$ theo Định nghĩa 00.6; hai chú thích chuyển vào ghi chú |
| A05B | Hạng và không gian cột | $\operatorname{Col}$, số nghiệm | A05 → A04 | Định nghĩa | MT1 | 40 → 40 | `sửa`: ghi chú nêu $\operatorname{rank}(X)=3$ (Ví dụ 00.6). Lượt sửa 1: $\operatorname{Col}(A)=\{Ax\}$, vế phải $c$ (#6) |
| A04 | Hệ phương trình và nghịch đảo | Nghịch đảo; $X$ không vuông | A05B → A12 | Công cụ | MT1 | 25 → 22 | `sửa`: khung dùng $X$; ghi chú dẫn Định lý 00.12 thay câu chỉ đường; đặt sau hạng theo §4.3. Lượt sửa 1: vế phải $c$ theo bảng ký hiệu (#6) |
| A12 | Hệ phương trình không tương thích | Hệ bốn căn vô nghiệm → bình phương nhỏ nhất | A04 → A06 | Bài toán | MT1 | 23 → 23 | `sửa`: ghi chú thêm $\operatorname{rank}[X\mid y]=4$, nguồn Ví dụ 00.8 |
| A06 | Dạng toàn phương và tính dương | PSD, PD; $X^TX\succeq0$ | A12 → A07 | Định nghĩa | MT1–MT2 | 32 → 46 | `sửa` (F3, F8): "Nhu cầu:" theo §4.6; $Q,d$ → $A,x$; khung dùng $X^TX$ (Mệnh đề 00.20); ghi chú dẫn Định lý 00.16; rút để hết tràn 65 px. Lượt sửa 1: thêm "Trực quan." elip $q(x)=\tau$ (Ví dụ 00.12) (#17) |
| A07 | Bài tập: phép toán, hạng và dạng toàn phương | Kiểm tra cụm nền tảng | A06 → A07L | Bài tập lời giải trên mặt trang | MT1 | 20 → 20 | `sửa` (F3, G5): ký hiệu; nguồn trỏ ví dụ của ghi chú |
| A07L | Bài tập: phép toán, hạng và dạng toàn phương | Lời giải | A07 → A13 | Lời giải | MT1 | 19 → 19 | `sửa`: ký hiệu, nguồn |
| A13 | Bình phương nhỏ nhất và phép chiếu | Hình chiếu, $X^Tr=0$ | A07L → A14 | Kết quả hình học | MT1 | 26 → 26 | `sửa` (F3): nhãn hình không in đậm. Lượt sửa 1: ghi chú mở bằng bài toán cực tiểu (#20) |
| A14 | Phương trình chuẩn từ phép chiếu | Phương trình chuẩn, $w_{\mathrm{LS}}$ | A13 → A15 | Định lý 00.22 | MT1 | 12 → 20 | `sửa`: bỏ `\text{}` tiếng Việt trong KaTeX (36 cảnh báo console), điều kiện thành dòng chữ. Lượt sửa 1: "$w$ không duy nhất"; ghi chú thêm $\operatorname{Ker}(X)$ (#4, #26) |
| A15 | Bài tập: ma trận thiết kế và phép chiếu | Kiểm tra mạch 3 trên bốn căn | A14 → A15L | Bài tập lời giải trên mặt trang | MT1 | 29 → 29 | `sửa`: ghi chú bỏ chỉ đường, nguồn trỏ Ví dụ 00.4, 00.14. Lượt sửa 1: bộ số dùng ";" (#8) |
| A15L | Bài tập: ma trận thiết kế và phép chiếu | Lời giải | A15 → B00 | Lời giải | MT1 | 17 → 17 | `sửa`: như A15. Lượt sửa 1: bộ số dùng ";" (#8) |
| B00 | 4. Giải tích nhiều biến cho hàm mất mát | Trang tiêu đề mạch 4 | A15L → B01 | Điểm vào mạch 4; bước `nhu cầu` | MT2 | 22 → 26 | `sửa` (F9): từ khóa "điểm dừng" thay "tích phân"; ghi chú nêu đầu ra. Lượt sửa 1: dòng dẫn đủ câu hỏi mạch: "…tìm điểm dừng và xác định cực tiểu" (#19) |
| B01 | Đối tượng của giải tích nhiều biến | $h$, $F$; câu hỏi mạch | B00 → B02 | Đối tượng | MT2 | 21 → 38 | `sửa` (F7): thêm "Nhu cầu:". Lượt sửa 1: "Nhu cầu:" như B00 (#19) |
| B02 | Đồ thị, lát cắt và tập mức | Ba cách nhìn $h$ | B01 → B03 | Trực quan | MT2 | 22 → 22 | `sửa`: nguồn |
| B03 | Lát cắt và tiếp tuyến | Đạo hàm riêng | B02 → B03D | Định nghĩa | MT2 | 20 → 20 | `giữ` |
| B03D | Khả vi của hàm nhiều biến | Định nghĩa khả vi | B03 → B04 | Định nghĩa | MT2 | 40 → 40 | `sửa` (F3): ký hiệu. Lượt sửa 1: ghi chú dẫn Nhận xét 00.31 thay "thường dùng" (#27) |
| B04 | Gradient | $\nabla h(1,2)=(5,7)^T$ | B03D → B05 | Định nghĩa | MT2 | 22 → 22 | `sửa` (F3) |
| B05 | Đạo hàm theo hướng | $D_dh$ | B04 → B06 | Định nghĩa 00.32, Mệnh đề 00.33 | MT2 | 32 → 41 | `sửa` (F3, F14): định nghĩa bằng giới hạn, công thức $\nabla h^Td$ thành mệnh đề; thêm "Nhu cầu:" theo §5.3 |
| B06 | Tuyến tính hóa | Xấp xỉ bậc nhất | B05 → B07 | Công cụ | MT2 | 10 → 18 | `sửa` (F3): bỏ ký hiệu vi phân (ghi chú không dùng); đổi tiêu đề theo §5.3 |
| B07 | Ma trận Jacobian | $J_F(1,2)$ | B06 → B08 | Định nghĩa | MT2 | 14 → 14 | `sửa` (F3) |
| B08 | Quy tắc dây chuyền | $\nabla\ell=J_F^T\nabla\chi(F)$ | B07 → B09 | Định lý 00.35 | MT2 | 6 → 6 | `sửa` (F3): hàm ngoài $g$ → $\chi$. Lượt sửa 1: ghi chú bỏ câu về ký hiệu (#27) |
| B09 | Ma trận Hessian | $\nabla^2h$ | B08 → B10 | Định nghĩa | MT2 | 6 → 10 | `sửa` (F3): $H_h$ → $\nabla^2h$ |
| B10 | Độ cong theo một hướng | $\gamma''(0)=d^T\nabla^2h\,d$ | B09 → B11 | Mệnh đề 00.38 | MT2 | 24 → 25 | `sửa` (F3): $\varphi$ → $\gamma$; $2^{-1/2}$ thay căn. Lượt sửa 1: giả thiết $h\in C^2$ trên tập mở chứa $x$; hoàn lại $\sqrt2$ (#5) |
| B11 | Khai triển Taylor bậc hai | Xấp xỉ bậc hai | B10 → B11A | Định lý 00.40 | MT2 | 40 → 34 | `sửa` (F3); ghi chú nối sang điểm dừng |
| B11A | Điều kiện cần bậc nhất | Thu hẹp ứng viên cực tiểu | B11 → B11B | Định lý 00.42 | MT2 | — → 51 | `thêm` (F5): Bài 01 dựa vào Định lý 00.42; mục tiêu 3 của ghi chú |
| B11B | Phân loại điểm dừng bằng Hessian | Phân biệt cực tiểu, cực đại, yên ngựa | B11A → B11C | Định lý 00.43 | MT2 | — → 51 | `thêm` (F5): mục tiêu 3 "phân loại điểm dừng bằng Hessian". Lượt sửa 1: "Trực quan." dùng $\nabla^2h(x^*)$ (#22) |
| B11C | Ví dụ: điểm dừng của hàm hai biến | Tính và phân loại điểm dừng của $h$ | B11B → B14 | Ví dụ 00.20, 00.21 | MT2 | — → 29 | `thêm` (F5): bước ví dụ của cụm điều kiện tối ưu, có "Diễn giải:" nối với $f$ |
| B14 | Quy tắc dây chuyền cho phần dư và mất mát | $\nabla f=X^Tr$ | B11C → B15 | Mệnh đề 00.45 | MT2 | 2 → 2 | `sửa` (F3): $f=\chi\circ r$, bỏ ký hiệu vi phân |
| B15 | Ví dụ: gradient tại trọng số thử | $\nabla f(w^{(0)})$ | B14 → B16 | Ví dụ 00.22 | MT2 | 19 → 17 | `sửa` (F15): bỏ nhận xét nhân quả; ghi chú thêm kiểm tra và hướng giảm. Lượt sửa 1: bộ số dùng ";" (#8) |
| B16 | Phương trình chuẩn | Giải $w_{\mathrm{LS}}=(14,2,1)^T$ | B15 → B17 | Ví dụ 00.14 | MT2 | 11 → 11 | `sửa`: ghi chú thêm phép khử và kiểm tra |
| B17 | Hessian của hàm mất mát | $X^TX\succ0$ → cực tiểu chặt | B16 → B18 | Ứng dụng Định lý 00.43 | MT2 | 20 → 22 | `sửa` (F5): kết luận bằng điều kiện bậc hai; bỏ `\text{}` tiếng Việt |
| B18 | Một bước hạ gradient | Bước $\eta=0{,}1$; ngưỡng $2\eta^\star$ | B17 → B19 | Định nghĩa 00.46, (5.1) | MT2 | 20 → 14 | `sửa` (F13): thuật ngữ "hạ gradient"; nêu $\eta^\star=34/233\approx0{,}146$ và điều kiện $0<\eta<2\eta^\star$ |
| B19 | Bài tập: bước hạ gradient, Jacobian và điểm dừng | Kiểm tra mạch 4 | B18 → B19L | Bài tập lời giải trên mặt trang (câu 1) | MT2 | 30 → 39 | `sửa`: câu tích phân chuyển sang C09, thêm câu phân loại điểm dừng; nguồn Bài tập 00.1. Lượt sửa 1: câu 4 thành Bài tập 00.10(b)–(c) (Rosenbrock), tránh trùng ví dụ yên ngựa (#21); bộ số dùng ";" (#8) |
| B19L | Bài tập: bước hạ gradient, Jacobian và điểm dừng | Lời giải câu 1 | B19 → C00 | Lời giải | MT2 | 14 → 14 | `sửa` (F13): ghi chú giải thích bằng (5.1) |
| C00 | 5. Xác suất một biến | Trang tiêu đề mạch 5 | B19L → C10 | Điểm vào mạch 5; bước `nhu cầu` | MT3 | 36 → 33 | `sửa` (F4, F2): tên theo §6; nhiễu, hợp lý chuyển sang mạch 6 |
| C10 | Bất định của giá nhà | Câu hỏi mạch 5 | C00 → C01 | Nhu cầu | MT3 | 46 → 49 | `sửa` (F7): chuyển lên đầu mạch 5 làm trang "Nhu cầu:"; khung bỏ "biến ngẫu nhiên" chưa định nghĩa |
| C01 | Phép thử, không gian mẫu và biến cố | Xúc xắc đều | C10 → C02 | Định nghĩa | MT3 | 45 → 45 | `sửa`: ghi chú bỏ chỉ đường |
| C02 | Xác suất và các tiên đề | Không gian xác suất | C01 → C03 | Định nghĩa 00.49 | MT3 | 37 → 37 | `giữ` |
| C03 | Biến ngẫu nhiên | Biến ngẫu nhiên $U$ | C02 → C04 | Định nghĩa 00.50 | MT3 | 43 → 52 | `sửa` (F3, F8): "Trực quan." dụng cụ đo trước định nghĩa; $X$ → $U$, chỉ báo $V$. Lượt sửa 1: ghi chú bỏ câu về ký hiệu (#27) |
| C04 | Biến rời rạc và hàm khối xác suất | PMF, Bernoulli | C03 → B12 | Định nghĩa 00.51 | MT3 | 19 → 15 | `sửa` (F3): $\pi$ → $\theta$, $p_X$ → $p_U$; nhãn hình $p(v)$. Lượt sửa 1: nhãn hình $p_V(v)$ (#10) |
| B12 | Tích phân một biến | Tổng tích lũy cho xác suất liên tục | C04 → C05 | Định nghĩa 00.47 | MT3 | 28 → 32 | `sửa` (F9): chuyển từ mạch 4 sang mạch 5; "Nhu cầu:" nối với xác suất. Lượt sửa 1: hình: tỉ lệ $\psi(1)/\psi(0)=3$, trục tung tại $x=0$ (#11); tích phân kép gộp vào ghi chú diễn giả (#12, #16) |
| C05 | Biến liên tục và hàm mật độ xác suất | PDF, phân phối đều | B12 → C06 | Định nghĩa 00.52 | MT3 | 28 → 38 | `sửa` (F8): thêm "Nhu cầu:"; bỏ `\text{}` tiếng Việt |
| C06 | Hàm phân phối tích lũy | CDF | C05 → C07 | Định nghĩa 00.53 | MT3 | 20 → 20 | `sửa` (F3): $F_U$. Lượt sửa 1: nhãn hình $F_U(t)=t/2$ (#10) |
| C07 | Kỳ vọng | $\mathbb E[U]$ | C06 → C08 | Định nghĩa 00.55 | MT3 | 17 → 33 | `sửa` (F14): điều kiện tồn tại $\sum\lvert u\rvert p_U<\infty$ thay $\mathbb E\lvert X\rvert<\infty$; thêm "Trực quan." |
| C08 | Phương sai | $\operatorname{Var}$, $\operatorname{Std}$ | C07 → C12 | Định nghĩa 00.56 | MT3 | 12 → 10 | `sửa` (F3): ký hiệu; $\operatorname{Var}^{1/2}$ thay căn. Lượt sửa 1: hoàn lại $\sqrt{\operatorname{Var}(U)}$ |
| C12 | Phân phối Gauss một biến | $\mathcal N(\mu,\sigma^2)$, $0{,}6827$, $1{,}96$ | C08 → C09 | Định nghĩa 00.58, (6.1) | MT3 | 28 → 37 | `sửa` (F2, F15): thành trang Gauss một biến theo §6.5; bỏ câu tương phản nhị phân; nhãn hình $\mu\pm\sigma$. Lượt sửa 1: hoàn lại $1/\sqrt{2\pi\sigma^2}$ |
| C09 | Bài tập: biến chỉ báo, tích phân và xác suất khoảng | Kiểm tra mạch 5 | C12 → C09L | Bài tập lời giải trên mặt trang (câu 1) | MT3 | 36 → 31 | `sửa`: nhận câu tích phân từ B19, thêm câu dải $0{,}95$ của $\mathcal N(16,1)$. Lượt sửa 1: câu 2 thành $\int_0^2u^2p_U(u)\,du$ (tích phân kép không còn trên mặt trang) |
| C09L | Bài tập: biến chỉ báo, tích phân và xác suất khoảng | Lời giải câu 1 | C09 → D00 | Lời giải | MT3 | 13 → 13 | `sửa` (F3): $V$, $\theta$ |
| D00 | 6. Vector ngẫu nhiên, nhiễu và phân phối nhiều biến | Trang tiêu đề mạch 6 | C09L → D01 | Điểm vào mạch 6; bước `nhu cầu` | MT3–MT4 | 32 → 36 | `sửa` (F4, F2): tên theo §7; dòng dẫn nêu câu hỏi mới gồm nhiễu và hợp lý |
| D01 | Vector ngẫu nhiên | $Z=(U,V)^T$; câu hỏi mạch | D00 → D02 | Định nghĩa 00.59 | MT3 | 40 → 43 | `sửa` (F7): "Nhu cầu:" lặp câu hỏi mạch. Lượt sửa 1: "Nhu cầu:" lặp đủ câu hỏi mạch 6 (#19) |
| D02 | Phân phối đồng thời | Bảng $p_{U,V}$ | D01 → D03 | Ví dụ 00.32 | MT3 | 17 → 17 | `sửa` (F6): nguồn |
| D03 | Phân phối biên | Biên $0{,}5$, $0{,}6$ | D02 → D04 | Định nghĩa 00.60 | MT3 | 8 → 8 | `sửa`: nguồn |
| D04 | Xác suất có điều kiện và quy tắc nhân | $p_{V\mid U}(1\mid1)=0{,}8$ | D03 → D05 | Định nghĩa 00.60, Mệnh đề 00.61 | MT3 | 8 → 7 | `sửa` (F3): ký hiệu $p_{V\mid U}$ |
| D05 | Công thức Bayes | Hậu nghiệm $2/3$ | D04 → D06 | Mệnh đề 00.61 | MT3 | 9 → 14 | `sửa` (F5): phát biểu tổng quát, "Ý nghĩa:" tiên nghiệm → hậu nghiệm |
| D06 | Độc lập và phụ thuộc | Độc lập $k$ biến; bảng phụ thuộc | D05 → C11 | Định nghĩa 00.62 | MT3–MT4 | 30 → 31 | `sửa` (F2, F15): định nghĩa cho $k$ biến (cần cho bốn nhiễu); "Nhu cầu:" nối sang hợp lý; bỏ nhận xét nhân quả. Lượt sửa 1: "Nhu cầu:" viết phân phối đồng thời của bốn nhiễu từ phân phối biên (#24) |
| C11 | Nhiễu ẩn và phần dư quan sát | Mô hình nhiễu cộng | D06 → C13 | Định nghĩa 00.63, Ví dụ 00.35 | MT4 | 34 → 31 | `sửa` (F2): chuyển sang mạch 6 sau định nghĩa độc lập; quy ước $r_i(w)=w^T\phi_i-y_i$ |
| C13 | Hàm hợp lý Gauss và tổng bình phương phần dư | MLE dưới (P1) là bình phương nhỏ nhất | C11 → C14 | Định nghĩa 00.64, Mệnh đề 00.65 | MT4 | 44 → 57 | `sửa` (F2): sau D06; bỏ "(xem mạch 6)"; thêm "Trực quan."; công thức (7.1) đủ hằng số. Lượt sửa 1: ghi chú thêm kiểm số $(9-4)/2=2{,}5$ với $\sigma=1$ (#25) |
| C14 | Bài tập: nhiễu và phần dư của bốn căn nhà | Kiểm tra cụm nhiễu–hợp lý | C13 → C14L | Bài tập lời giải trên mặt trang | MT4 | 49 → 46 | `sửa` (G5): thay bốn câu hỏi bằng lời bằng Bài tập 00.2 câu 1–2 trên bốn căn và một câu về giả thiết. Lượt sửa 1: nêu rõ $w_{\mathrm{true}}$ khác ví dụ căn 2 (#13); bộ số dùng ";" (#8) |
| C14L | Bài tập: nhiễu và phần dư của bốn căn nhà | Lời giải | C14 → D07 | Lời giải | MT4 | — → 33 | `thêm`: cụm nhiễu–hợp lý cần một bài có "Lời giải:" trên mặt trang |
| D07 | Kỳ vọng của vector ngẫu nhiên | $\mu=(0{,}5;0{,}6)$ | C14L → D08 | Định nghĩa 00.67 | MT3 | 16 → 35 | `sửa` (F3). Lượt sửa 1: thêm "Nhu cầu:" từ (P1) sang nhiễu tương quan (#14) |
| D08 | Hiệp phương sai và tương quan | $\Sigma_Z$, $\rho\approx0{,}408$ | D07 → D09 | Định nghĩa 00.67, Ví dụ 00.36 | MT3 | 13 → 27 | `sửa` (F3): lũy thừa $1/2$ thay căn. Lượt sửa 1: thêm "Trực quan."; $\rho$ một dòng; hoàn lại căn; giữ $\Sigma_Z$ vì chỉ số phân biệt ma trận của bảng với $\Sigma$ của D09 và $\Sigma_\varepsilon$ (#7, #9, #14) |
| D09 | Gauss nhiều biến | Mật độ, elip, tỉ số $e^{40/9}$ | D08 → D10 | Định nghĩa 00.70, Ví dụ 00.37 | MT4 | 21 → 33 | `sửa` (F3): $G$, $\Sigma_G$ → $Z$, $\Sigma$; thêm "Nhu cầu:", ví dụ và "Diễn giải:" |
| D10 | Bình phương nhỏ nhất tổng quát | $J_{\mathrm{GLS}}$ dưới (P2) | D09 → D10B | Mệnh đề 00.73 | MT4 | 51 → 53 | `sửa` (F3): $J$ → $J_{\mathrm{GLS}}$; phát biểu thành mệnh đề |
| D10B | Ví dụ: hai phần dư cùng chuẩn | $2/3$ và $2$ | D10 → D11 | Ví dụ 00.38 | MT4 | 16 → 16 | `sửa` (F3, F6) |
| D11 | Bài tập: bảng phân phối đồng thời | Kiểm tra mạch 6 | D10B → D11L | Bài tập lời giải trên mặt trang (câu 1) | MT3–MT4 | 38 → 32 | `sửa` (F3): ký hiệu, nguồn. Lượt sửa 1: câu 4 thành phép tính $J_{\mathrm{GLS}}=f/\sigma^2$ (#23) |
| D11L | Bài tập: bảng phân phối đồng thời | Lời giải câu 1 | D11 → E00 | Lời giải | MT3 | 9 → 9 | `sửa` (F3) |
| E00 | 7. Tổng hợp mô hình giá nhà | Trang tiêu đề mạch kết luận | D11L → E01 | Điểm vào mạch 7; bước `nhu cầu` | MT5 | 23 → 28 | `sửa` (F12): bỏ câu "chuyển sang Bài 01" mâu thuẫn với E07. Lượt sửa 1: dòng dẫn đủ câu hỏi mạch: "…và chọn giữa hai mô hình" (#15) |
| E01 | Mô hình giá nhà với các công cụ đã ôn | Ba công cụ trong một quy trình | E00 → E02 | Tổng hợp | MT5 | 44 → 44 | `sửa` (F7): thêm "Nhu cầu:". Lượt sửa 1: "Nhu cầu:" như E00; khung OLS/GLS chuyển vào ghi chú để không lộ lời giải E06 câu 5 (#15, #23) |
| E02 | Trọng số bình phương nhỏ nhất | Diễn giải $w_{\mathrm{LS}}$ | E01 → E03 | Ứng dụng | MT5 | 38 → 21 | `sửa` (F15): bỏ "Lưu ý:" nhân quả |
| E03 | Phần dư sau khi khớp mô hình | Phần dư $\pm1$, SSE $4$ | E02 → E04 | Ứng dụng | MT5 | 22 → 18 | `sửa`: khung viết dạng khẳng định có số |
| E04 | Dự đoán kèm bất định | $16\pm1{,}96\sigma$ | E03 → A11 | Tình huống 00.1 | MT5 | 39 → 36 | `sửa` (F1, F6): $\sigma^2=1=\hat\sigma^2=\mathrm{SSE}/m$; bỏ rào đón |
| A11 | Đặc trưng phi tuyến | Mô hình bốn trọng số | E04 → E05 | Nhu cầu của quá khớp | MT5 | 37 → 37 | `sửa`: chuyển từ mạch 3 sang mạch 7 theo §8.2; $\widetilde w$ → $w_{\mathrm q}$. Lượt sửa 1: thêm "Nhu cầu:", bỏ khung lặp vector đặc trưng (#15) |
| E05 | Mô hình mở rộng và nguy cơ quá khớp | Định nghĩa 00.74 | A11 → E06 | Tình huống 00.2 | MT5 | 53 → 44 | `sửa` (F10, F6): giữ định nghĩa, câu thứ hai sang ghi chú; bỏ rào đón. Lượt sửa 1: bộ số dùng ";" (#8) |
| E06 | Bài tập: tổng hợp mô hình giá nhà | Bài tập tổng hợp | E05 → E06L | Bài tập lời giải trên mặt trang (câu 1, 2, 5) | MT1–MT5 | 54 → 58 | `sửa`: câu 4 thành Bài tập 00.2 câu 3 (câu nhiễu–phần dư cũ trùng C14). Lượt sửa 1: câu 2 "một bước hạ gradient" (#3) |
| E06L | Bài tập: tổng hợp mô hình giá nhà | Lời giải | E06 → E07 | Lời giải | MT1–MT5 | 44 → 44 | `sửa`: nguồn. Lượt sửa 1: bộ số dùng ";" (#8) |
| E07 | Tổng kết | Bảng kết quả, giả thiết, công thức; tài liệu đọc | E06L → hết | Tổng kết sườn | MT1–MT5 | 61 → 49 | `sửa` (F5): thêm dòng điều kiện tối ưu, bỏ dòng gradient (không có giả thiết riêng), rút ô để hết tràn. Lượt sửa 1: dòng dải nhiễu thêm (P1) (#1) |
