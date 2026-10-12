# Nhật ký rà soát Bài 06 — ghi chú bài giảng và bài tập

Tệp sản phẩm: `materials/lec-06/lecture-note.md` và `materials/lec-06/exercises.md` (thư mục mới). Ghi chú được viết theo deck đã duyệt `lecture-06-mo-rong-mo-hinh-va-du-lieu.html` (45 trang, 7 mạch), `planning/lec-06/outline.md`, `storyboard.md` và `review-log.md` (các vòng 2026-10-11 và 2026-10-12). Không vẽ SVG mới; ghi chú dùng 14 trong 18 SVG của `img/lec-06/` (bản rộng; bốn bản `-narrow` dành cho deck).

## Viết học liệu (2026-10-12)

### Tác tử

| Vai | Loại tác tử | Mô hình | Effort | Ghi/đọc | Ghi chú |
|---|---|---|---|---|---|
| Soạn ghi chú bài giảng và bài tập Bài 06 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Ghi: `materials/lec-06/lecture-note.md`, `materials/lec-06/exercises.md`, tệp này | Theo brief `brief-materials-author.md` của điều phối viên Fable 5.1 (NN = 06); tác tử tự ghi dòng này, điều phối viên đối chiếu với lời gọi công cụ Agent |

Theo chỉ dẫn riêng của điều phối viên cho Bài 06: không chạy `scripts/sync-local-materials.py`, không sửa `material-local-data.js` (tác tử Bài 05 đang giữ tệp đó), không sửa deck, không sửa tệp Bài 05, không commit, không đọc `.env`. Kỹ năng `no-ai-slop` được nạp bằng công cụ `Skill` (chế độ Edit) trước khi soạn; tự đối chiếu `eval.md` ở mục "Tự kiểm `no-ai-slop`" dưới đây.

### Sản phẩm

- `lecture-note.md`: 2 195 dòng, 30 261 từ (`wc -w`, đếm cả ký hiệu toán). Cấu trúc theo `materials/_templates/lecture-note.md`: Mục tiêu học tập (6 mục, ánh xạ LLO11, LLO12, LLO15; CLO1, CLO2, CLO4 theo outline §2), Kiến thức tiên quyết, Bảng ký hiệu (20 dòng), bảy mục nội dung ứng với bảy mạch A–G, Tình huống áp dụng và ứng dụng, Tóm tắt chương, Bài tập củng cố, Hướng dẫn đọc thêm.
- Khối: 7 định nghĩa, 6 định lý, 12 mệnh đề, 2 bổ đề, 1 hệ quả, 14 nhận xét (bộ đếm chung `06.1`–`06.42`); 25 ví dụ (`Ví dụ 06.1`–`06.25`); 3 thuật toán; 3 tình huống áp dụng; 11 bài tập (`Bài tập 06.1`–`06.11`), mỗi bài có `hint` và `solution`; 21 khối chứng minh, một cho mỗi mệnh đề, bổ đề, định lý và hệ quả. Tổng 127 khối, không lồng.
- `exercises.md`: 11 bài theo sáu phần của bài học, mỗi bài có mức độ, LLO/CLO, `hint` và `solution`. Bài 1, 3, 5, 7, 9, 11 là câu hỏi trên các trang B10, C07, D07, E06, F08, G03 với lời giải đầy đủ; Bài 2, 4, 6, 8, 10 là bài mới. Không bài nào trùng đề với khối `exercise` của ghi chú (xem đính chính ở vòng sửa sau rà soát: một số bài trùng dữ kiện với ví dụ đã giải và đã được đổi).

### Ánh xạ số hiệu giữa deck và ghi chú

| Deck | Ghi chú |
|---|---|
| Định nghĩa tách được tuyến tính (B02) | Định nghĩa 06.3 |
| Mệnh đề 1 (XOR không tách được) | Mệnh đề 06.4 |
| Nhận xét về $\sigma$ tuyến tính (B06) | Mệnh đề 06.7 (nâng thành mệnh đề có chứng minh) |
| Mệnh đề 2 (đối xứng hoán vị) | Mệnh đề 06.8 |
| Mệnh đề 3 (không lồi) | Mệnh đề 06.9 |
| Thuật toán lan truyền ngược (C04) | Thuật toán 06.1, Mệnh đề 06.13, Nhận xét 06.14 |
| Mệnh đề phân loại điểm dừng (D03) | Mệnh đề 06.17 |
| Bổ đề giảm (D04) | Bổ đề 06.19 |
| T7 / T5 / T6 / T8 / hệ quả T8 | Định lý 06.20 / 06.31 / 06.32 / 06.34 / Hệ quả 06.35 |
| Định lý 05c.52 / 05c.53 (E02, E04) | Định lý 06.22 / 06.25 (phát biểu lại, có chứng minh) |
| Bất đẳng thức một bước (F02) | Mệnh đề 06.29 |
| So sánh dưới ngân sách cố định (F05) | Mệnh đề 06.37 |
| Quy tắc dừng sớm (F06) | Thuật toán 06.3 |
| Tỉ lệ giữ (F07) | Mệnh đề 06.40, Nhận xét 06.41 |
| Bảng G01 / G02 | Nhận xét 06.42 / bảng Mục 7.2 |

Đầu `exercises.md` ghi ánh xạ T5–T8 và Mệnh đề 1–3 để người học đọc song song với deck.

### Nguồn đã tra theo mục

| Mục của ghi chú | Nguồn và vị trí đã tra | Điều học được và đã dùng |
|---|---|---|
| 2 (XOR, mạng hai tầng) | Goodfellow, Bengio và Courville (2016), mục 6.1, tr. 171–177, Hình 6.1, (6.4)–(6.11); mục 6.3, tr. 191 | Thứ tự dẫn: XOR → mô hình tuyến tính thất bại (bình phương nhỏ nhất cho hằng $\tfrac12$) → đặc trưng học được; ReLU là lựa chọn mặc định (tr. 191) |
| 2.5 (tính lồi) | Boyd và Vandenberghe (2004), mục 3.2.2, tr. 79; Goodfellow và cộng sự, mục 8.2.2, tr. 283–285 | Hợp với ánh xạ affine giữ tính lồi; đối xứng không gian trọng số, $n!^m$ cách sắp, đối xứng co giãn của ReLU |
| 3 (lan truyền ngược) | Goodfellow và cộng sự, mục 6.5, tr. 204–224 (6.5.1; Thuật toán 6.2, tr. 209–210; chi phí, tr. 220–221) | Đồ thị tính toán, quy tắc Jacobian chuyển vị tại mỗi nút, chi phí cùng bậc truyền xuôi |
| 4 (điểm dừng) | Goodfellow và cộng sự, mục 4.3.1, tr. 89–90; mục 8.2.3, tr. 285–286 | Phép thử Hessian và trường hợp không kết luận; tách bình nguyên khỏi điểm yên ngựa; hạ gradient thường thoát điểm yên ngựa trong thực nghiệm |
| 5 (nhóm nhỏ) | Goodfellow và cộng sự, mục 8.1.3, tr. 277–281; mục 8.3.1, tr. 294–295 | Sai số chuẩn $\sigma/\sqrt n$ (tr. 278), các yếu tố chọn kích thước nhóm (tr. 279–280), nhóm phải ngẫu nhiên và độc lập, xáo trộn theo lượt (tr. 280–281), Thuật toán 8.1 (tr. 294), chi phí một cập nhật không tăng theo $n$ (tr. 295) |
| 5.2, 6.5 (đánh đổi quy mô lớn) | Bottou và Bousquet (2011), chương 13 trong Sra, Nowozin và Wright (biên tập): mục 13.2.3, tr. 354–355; Bảng 13.2, tr. 362; Bảng 13.3, tr. 363 (đọc từ bản trích văn bản `scratchpad/build/snw.txt` của phiên) | Phân rã sai số dư; thời gian theo độ chính xác; số liệu RCV1 (SVMPerf $6{,}03\,\%$) |
| 6 (SGD) | Ghi chú Bài 05b, Mục 5–6 (Định lý 05b.36, 05b.39, 05b.41, 05b.43, Hệ quả 05b.44, Bổ đề 05b.6, 05b.7, Hệ quả 05b.10); Goodfellow và cộng sự, (8.12)–(8.14), tr. 294–295 | Cấu trúc chứng minh một bước (đồng nhất thức, kỳ vọng có điều kiện, tổng lồng); điều kiện Robbins–Monro; lịch giảm tuyến tính |
| 6.6–6.7 (dừng sớm) | Goodfellow và cộng sự, mục 7.8, tr. 246–252, Thuật toán 7.1, (7.40)–(7.45); ghi chú Bài 05, Định nghĩa 05.38, Mệnh đề 05.39 | Ngưỡng kiên nhẫn; điều kiện tương đương $\lambda\approx1/(\eta k)$ cùng $\eta\alpha\ll1$, $\alpha\ll\lambda$; đổi chỗ ký hiệu $\alpha$, $\lambda$ |
| Giọng văn | Giáo trình *Học máy thống kê* của người dùng, chương mạng nơ ron nhiều lớp (`chapters/02_multilayer_perceptron/sec_training_mlp.tex`, giải nén vào thư mục riêng của phiên) | Giọng "ta khai triển…", câu dẫn trước công thức; không chép câu nào |

Không có PDF của Nocedal và Wright trong `sources/`; ghi chú không dẫn tài liệu này. Bottou, Curtis và Nocedal (2018) chỉ được liệt kê là đọc thêm cho Mục 6, như ghi chú Bài 05b đã làm. Không có đoạn nào dịch hay chép từ nguồn.

### Kiểm số

Mọi con số được tính lại bằng Python thuần (phân số chính xác khi có thể; không numpy), tập lệnh trong `scratchpad/build/lec-06/mat/calc/c1.py`–`c6.py` của phiên. Các dòng kiểm chính:

- XOR: phương trình chuẩn $(0,0,\tfrac12)$, $F=\tfrac18$; đặc trưng tích $(0,1,1,-2)$; $\binom{d+q}q$ và $501\,501^3\approx1{,}26\cdot10^{17}$; $F(\theta(t))=t^2$ hoặc $(1-t)^2$, $F(\tfrac12)=\tfrac14$; logistic $0{,}5032$ và $\log2$; mạng Goodfellow, trung điểm $\tfrac{27}{32}$; kích hoạt bình phương (Bài tập 06.1): $F(\tfrac14)=\tfrac9{64}$, $F(\tfrac12)=\tfrac14$.
- Lan truyền ngược: $\lVert\nabla\ell\rVert^2=\tfrac{69}{16}$; sai phân trung tâm $-1$; bước $0{,}02$: $\ell^+=0{,}053628125$; bước $0{,}25$: $\tfrac{2809}{2048}$; bước $0{,}5$: $\tfrac{3721}{512}$; tiền kích hoạt nhỏ nhất dọc đoạn bước $0{,}25$ bằng $\tfrac12$; $(p+1)p=6\,178\,195\,802$; mạng ba đơn vị (Bài tập 06.9): $\lVert\nabla\ell\rVert^2=184$, $\ell^+=0{,}586$; $0{,}0144$; $3{,}226$.
- Mạng tuyến tính một đơn vị: trị riêng Hessian tại $(0,0)$, $(1,1)$, $(2,\tfrac12)$; $L=2$, $4$, $13$ trên $[0,1]^2$, $[-1,1]^2$, $[-2,2]^2$ và $L=2$ trên $[-0{,}01;\,1]^2$ (lưới $401\times401$); bổ đề giảm $0{,}0703$ so với $0{,}1422$; T7 $K=113$ so với $4$; bảng bình nguyên $k=0$–$15$; đường chéo phụ (Tình huống 06.2): dừng tại $k=8$ với cả hai lần chạy, lần lệch $10^{-6}$ cho $F=0{,}4646$ tại $k=30$ và $0{,}0093$ tại $k=35$; chính quy hóa $\lambda=\tfrac12$ (Bài tập 06.3): điểm dừng $\pm(\tfrac1{\sqrt2},\tfrac1{\sqrt2})$, $F=\tfrac38$, Hessian $I$.
- Dữ liệu bốn điểm: sáu nhóm tại $\theta_0$, $\tfrac{503}{384}$, $\tfrac{133}{128}$, $\operatorname{tr}\Sigma=\tfrac{59}4$, $\tfrac{59}{12}$ (liệt kê), $\tfrac{59}8$ (liệt kê 16 cặp có thứ tự); tại $\theta^*$: $\tfrac52$, $\tfrac56$, $\tfrac{69}{128}$ (cả liệt kê và công thức $\tfrac{\eta^2}2\widehat g^\top H\widehat g$); $b=3$: $\tfrac5{18}$, $\tfrac{197}{384}$; tại $(1,0)$: $\tfrac{23}4$, $\tfrac{23}{36}$; vế phải của bất đẳng thức một bước $0{,}547$, $1{,}3188$, $0{,}5157$.
- Ví dụ ba quan sát: đệ quy chính xác kiểm bằng liệt kê với $k\le5$; $0{,}2449$, $0{,}1699$, $0{,}1531$; $\tfrac8{3k}$; cận T6 với $G^2=\tfrac{20}3$; Bài tập 06.5: $\eta=0{,}01875$, cận cần $159$ bước, giá trị thật cần $68$ bước.
- T8 và ngân sách: $0{,}30284$, $0{,}028484$, $0{,}0028304$; $K=80\,400$; hai hàng ngân sách $0{,}2$ / $2{,}848\cdot10^{-5}$ và $0{,}2$ / $0{,}03028$; ngưỡng $490\,050$; $n=10^5$, $b=100$: $0{,}00303$, ngưỡng $4{,}99\cdot10^9$; điểm chuyển SNW $7{,}2\cdot10^5$ và $1{,}7\cdot10^6$.
- Dừng sớm: bảng $k=10,20,100$; Bài tập 06.10 với phổ $(2;\ 0{,}2;\ 0{,}002)$, $\eta=0{,}25$: $k=14$, $\lambda=0{,}286$.
- Chi phí: bảng ba quy mô (thời gian $11{,}57$ ngày, $6{,}34\cdot10^7$ năm); Tình huống 06.1: $157\,100$ phép nhân mỗi gradient mẫu, $9{,}43\cdot10^9$ mỗi bước đầy đủ; Tình huống 06.3: $1{,}52\cdot10^6$ bước SGD, $688$ bước hạ gradient, tỉ số $45$ và $66$.

Hai lỗi phát hiện khi tự kiểm và đã sửa trước khi bàn giao: phần dư của nhóm $\{1,2\}$ trong dòng kiểm tra của Ví dụ 06.19 (viết nhầm $-\tfrac78$, đúng là $\tfrac18$; giá trị $F=\tfrac{595}{256}$ không đổi), và bước dừng ở Tình huống 06.2 (ước lượng nhầm $k=7$, đúng là $k=8$).

### Sai lệch so với deck và lý do

| # | Vị trí | Deck | Ghi chú | Lý do |
|---|---|---|---|---|
| 1 | B07 (ghi chú diễn giả), Nhận xét 06.10 | Quy tắc hợp thành "Bài 02" | Định lý 01.31(b) | Số hiệu thật trong ghi chú Bài 01; đề nghị điều phối viên sửa nhãn "Bài 02" trong ghi chú diễn giả B07 nếu muốn khớp |
| 2 | G01, Nhận xét 06.42 | "Định lý 3, Bài 05" | Định lý 05.30 | Số hiệu của ghi chú Bài 05 hiện có (đã kiểm lúc bàn giao) |
| 3 | D05, E04, F02–F04 | "không chứng minh lại" | Chứng minh ngắn của T5, T6, T7, T8, hệ quả T8, Định lý 05c.52 (kết luận 1), 05c.53 | Tiêu chuẩn giáo trình đòi chương tự chứa; chứng minh theo cùng sơ đồ và hằng số của Bài 05b, 05c |
| 4 | B06 | Nhận xét $\sigma$ tuyến tính | Mệnh đề 06.7 | Có kết luận và chứng minh, nên viết thành mệnh đề |
| 5 | Mục 2.3 | Không có | Mệnh đề 06.5 (đặc trưng affine không làm XOR tách được) | Hình thức hóa ghi chú diễn giả B04 ("phép affine giữ trung điểm chung") |
| 6 | F05 | $\sigma^2=\sigma_1^2/b$ | Nêu rõ nhóm chọn có hoàn lại (Mệnh đề 06.27) | Công thức đúng nguyên văn cho nhóm có hoàn lại; nhóm không hoàn lại cho hằng số nhỏ hơn |
| 7 | F03 | Chỉ giá trị chính xác $\tfrac8{3k}$ | Thêm cận của T6 với $G^2=\tfrac{20}3$ trên $[-1,3]$ | Kiểm H6a trên vùng chứa dãy lặp, đối chiếu cận với giá trị thật |
| 8 | Toàn bài | Chỉ ba ví dụ ứng dụng | Thêm Tình huống 06.1–06.3 | Tiêu chuẩn giáo trình đòi ít nhất hai tình huống, một với giả thiết không thỏa (Tình huống 06.2) |
| 9 | D02, D03 (ghi chú diễn giả) | Phép co giãn $(u,v)\mapsto(cu,v/c)$ | $(u,v)\mapsto(\omega u,v/\omega)$ (Ví dụ 06.12, Nhận xét 06.18, Bài tập 06.3, 06.8) | Chữ $c$ trong chương là hệ số chặn; đổi theo vòng sửa B2 |
| 10 | G01 (ghi chú diễn giả) | Sai số giá trị $e_k$ trong Định lý 05.30 | $\Delta_k=F_\lambda(\theta_k)-\min F_\lambda$ (Mục 7.1) | Chữ $e$ là sai số dự đoán $f-y$ của Mục 3; $\Delta_k$ khớp $\Delta_0$ của T7, T8 |

Không phát hiện sai số liệu nào trong deck khi tính lại.

### Kiểm tra kỹ thuật

- Cấu trúc khối: 127 khối trong ghi chú, 33 khối trong bài tập; mỗi khối mở có đóng, không lồng; số hiệu liên tục; mọi tham chiếu `06.k` trỏ tới một khối tồn tại (kiểm bằng script); mọi số hiệu `05.k`, `05b.k`, `05c.k`, `01.k`, `04.k` được dẫn đều tồn tại trong ghi chú tương ứng.
- Không dùng `\text{…}` có chữ tiếng Việt trong công thức (gây cảnh báo KaTeX ở bản nháp đầu, đã bỏ).
- Viewer qua `http://localhost:8765/2627-1/material-viewer.html?doc=materials/lec-06/{lecture-note,exercises}.md&deck=lecture-06-mo-rong-mo-hinh-va-du-lieu.html`, Playwright Chromium, `wait_until='load'`, mọi khối `details` được mở, ở 1600×900 và 390×844: 0 `.katex-error` (3 098 công thức trong ghi chú, 640 trong bài tập), 0 ký hiệu thô `$` hay `:::` còn sót, mọi khối có nhãn đúng loại (13 loại khối trong ghi chú), 14/14 hình tải được và có alt, 0 phần tử tràn ngang ngoài vùng cuộn (độ rộng tài liệu 375–376 px ở màn 390 px). Một lỗi console duy nhất là thông báo chính sách bảo mật nội dung về một script nội dòng; cùng thông báo xuất hiện khi mở ghi chú Bài 05b đã công bố, nên không do tệp Bài 06. Đã xem bằng mắt ảnh chụp Nhận xét 06.42, chứng minh Định lý 06.25, Ví dụ 06.16, Tình huống 06.2 và chứng minh Mệnh đề 06.37 ở hai kích thước.
- `git diff --check` sạch; hai tệp mới không có khoảng trắng cuối dòng.
- Chưa chạy `scripts/sync-local-materials.py` và `--check` (theo chỉ dẫn; điều phối viên chạy sau).

### Tự kiểm `no-ai-slop`

Đã đối chiếu `eval.md`: bỏ các câu lấy tài liệu làm chủ ngữ ("Mục này dựng…", "Mục 2.1 biến…", "Mục 7 đọc lại…"), bỏ một câu dẫn hai chấm kịch tính ("Điều đúng là: …"), bỏ khẳng định không nguồn ("lựa chọn phổ biến nhất", "lý do mọi thư viện…") và thay bằng câu có nguồn hoặc câu hẹp hơn, tách các đoạn "Trong học máy" dài thành đoạn một ý. Các cặp "…, không phải …" còn lại đều là phân biệt toán học cần thiết (cận so với sai số thật, quy ước so với đạo hàm, định tính so với số liệu). Không dùng "hãy", câu hỏi tu từ hay lời giảng viên; câu hỏi duy nhất trong bài tập là yêu cầu học tập.

### Điểm báo điều phối viên

1. Chạy `python3 2627-1/scripts/sync-local-materials.py` rồi `--check` sau khi tác tử Bài 05 xong, để đóng gói `materials/lec-06/` vào `material-local-data.js`.
2. Ghi chú dẫn 15 số hiệu của ghi chú Bài 05 (Định nghĩa 05.5, 05.6, 05.20, 05.38; Định lý 05.22, 05.26, 05.30, 05.33; Mệnh đề 05.35, 05.39, 05.40, 05.41; Ví dụ 05.24, 05.25; Nhận xét 05.42). Cả 15 đã kiểm tồn tại lúc bàn giao; nếu ghi chú Bài 05 đánh số lại, cần cập nhật các chỗ dẫn này.
3. Sai lệch #1 (nhãn "Bài 02" trong ghi chú diễn giả B07) có thể sửa ở deck nếu muốn khớp số hiệu.
4. Độ dài 30 261 từ theo `wc -w` nằm trên khoảng 8 000–20 000 của tiêu chuẩn vì `wc` đếm cả ký hiệu toán; mức tương đương ghi chú Bài 05 (29 126) và Bài 05b (33 140).

## Sửa sau rà soát học liệu (2026-10-12)

Đầu vào: `materials-fix-list.md` của điều phối viên và hai báo cáo `review-materials-A.md` (kiểm toán toán học: 0 chặn, 0 nghiêm trọng, 4 trung bình, 7 nhẹ) và `review-materials-B.md` (tiêu chuẩn giáo trình: 0 chặn, 1 nghiêm trọng, 7 trung bình, 14 nhẹ), thư mục `scratchpad/build/lec-06/` của phiên. Tác tử: biên tập viên học liệu Bài 06 (cùng tác tử soạn, `general-purpose`, `claude-opus-5-5`, high, tiếp tục bằng tin nhắn). Phạm vi ghi: `materials/lec-06/lecture-note.md`, `materials/lec-06/exercises.md`, tệp này. Không chạy sync, không sửa deck hay tệp Bài 05, không commit. Số mới được tính lại bằng Python thuần (`scratchpad/build/lec-06/mat/fix/`, `calc/`).

| Mã | Mức | Vị trí | Trạng thái và cách sửa |
|---|---|---|---|
| S1 | nghiêm trọng | "Trong học máy" Mục 6, đoạn kết Mục 6, Nhận xét 06.42 | **đã sửa**: $\tfrac{\eta\sigma^2}\mu$ là mức của $\mathbb E\lVert\theta_k-\theta^*\rVert^2$, bán kính cỡ $\sqrt{\eta\sigma^2/\mu}$; viết như G01 của deck và Nhận xét 05.42. Đoạn "Trong học máy" mới sau Định lý 06.31 nêu hệ quả đúng bậc: giảm $\eta$ bốn lần chỉ thu bán kính hai lần. Đoạn kết Mục 6 nói "kỳ vọng bình phương khoảng cách tới nghiệm cỡ mức nhiễu nền". Không còn chữ "bán kính" gắn với $\eta\sigma^2/\mu$ |
| A1 | trung bình | Ví dụ 06.21; exercises Bài 8 | **đã sửa**: phần dư tại $\theta^*$ là $wx_i+c-y_i=-\varepsilon_i$, $\nabla\ell_i(\theta^*)=-\varepsilon_i(x_i,1)$; Bài 8 ghi phần dư $(-\tfrac{11}{12},\tfrac{11}{12},\tfrac34,-\tfrac{17}{12})$, $F=\tfrac18\cdot\tfrac{612}{144}=\tfrac{17}{32}$ (tính lại) |
| A2 | trung bình | Lời giải Bài tập 06.6 | **đã sửa**: chuỗi $\tfrac{2L\Delta_0}K+2\sqrt{2L\Delta_0\sigma^2/K}=\tfrac2{10^4}+2\sqrt{2\cdot0{,}01/10^4}=0{,}0002+2\sqrt{2\cdot10^{-6}}\approx0{,}00303$, viết bằng `aligned` |
| A3 | trung bình | Kiến thức tiên quyết, mở Mục 1, Mục 2.2 | **đã sửa**: Bài 05 viết $\binom{d_0+q}q$ với $d_0$ biến đầu vào; trong chương dùng $\binom{d+q}q$ với $d$ biến đầu vào. Đã kiểm Mệnh đề 05.41 trong ghi chú Bài 05 hiện hành dùng $d_0$ |
| B1 | trung bình | Nhận xét 06.38, Tóm tắt, đoạn kết Mục 6 | **đã sửa**: $O(1/\sqrt K)$ là cận cho bình phương chuẩn gradient; Nhận xét 06.38 thêm $O(\mathcal B^{-1/4})$ cho chính chuẩn, khớp Nhận xét 06.36(1) |
| B2 | trung bình | toàn ghi chú | **đã sửa**: gradient đầy đủ trong Định nghĩa 06.24 và chứng minh Định lý 06.25 viết $\bar g$ (giữ $G^2$ cho H6a); chỉ số trong nhóm $I_t$; quy tắc dây chuyền dùng $\psi:\mathbb R^{d_u}\to\mathbb R^{d_v}$; Bổ đề 06.12 dùng $d_u$, $d_v$ và độ lệch $\beta$; bán kính lân cận $\rho$; phần dư Taylor $E_2(s)$, bán kính chọn $\rho_0$, trị riêng trong chứng minh Mệnh đề 06.17 viết $\alpha_{\min}$, $\alpha_-$; hệ số co giãn $\omega$ (Mục 2.5, Ví dụ 06.12, Nhận xét 06.18), $\Omega=\operatorname{diag}(\omega)$ ở Bài tập 06.8; tham số đường cong $t$; trị riêng và vector riêng ở lời giải Bài tập 06.8 viết $\alpha_i$, $\xi_i$, $\dot\gamma=\gamma'(1)$; bộ đếm của Thuật toán 06.3 là $t$ (giữ $r$ cho ngưỡng kiên nhẫn như deck F06); $\tfrac{\eta_0}k$ ở Nhận xét 06.33; khoảng cách $D_k$, sai số giá trị $\Delta_k$ trong chứng minh T5, T6 và Mục 7.1; bỏ ký hiệu $q$ ở Bước 4 chứng minh T5; $\bar\Delta_k$ trong chứng minh T8; $Q$ cho mục tiêu toàn phương ở Mệnh đề 06.40; $\sigma_1^2$ thay $s^2$ ở Mệnh đề 06.27. Bảng ký hiệu thêm $\kappa=L/\mu$, $\sigma_1^2$, $G^2$ (gộp vào hai dòng có sẵn, vẫn 20 dòng); $\kappa=L/\mu$ định nghĩa tại lần dùng đầu (Mục 5.1). Không đổi $c$ trong chứng minh Mệnh đề 06.5 vì ở đó $c$ đúng là hệ số chặn |
| B3 | trung bình | khoảng 15 chỗ | **đã sửa**: các câu lấy tài liệu làm chủ ngữ chuyển sang "chúng ta/ta" hoặc đối tượng toán học ("ta cũng dùng nó làm hàm kích hoạt mặc định", "ở đây chỉ cần hai tầng", "Chúng ta cần một cách tính gradient…", "Trong Bài 05 (…), chúng ta đã…", "Ở Mục 1.2, chúng ta đã đặt…", "Chúng ta đã xuất phát từ…", "Momentum… được trình bày ở Bài 06b"); bỏ câu ghi chú người soạn ở Mục 5.1 và câu lặp Nhận xét 06.2(5) ở Mục 7.1 |
| B4 | trung bình | ranh giới 2→3, 3→4, 4→5, 5→6 | **đã sửa**: câu nối giữ ở cuối mục trước; mở Mục 3 bằng nhu cầu cụ thể (bỏ câu kết trùng ở Mục 2); mở Mục 4 bỏ câu tóm Mục 2, 3; mở Mục 5 bỏ câu lặp "Định lý 06.20 cần…"; mở Mục 6 bằng hiện tượng tại điểm cực tiểu, mở Mục 6.1 rút còn một câu. Bốn đoạn mở không còn chung khuôn "Câu hỏi của mục này là…" |
| B5 | trung bình | sau 06.31, 06.32, 06.34, 06.37, 06.40 | **đã sửa**: thêm năm đoạn "Trong học máy" (hồi quy có chính quy hóa và mức nhiễu nền; lịch $1/(\lambda(t+t_0))$ của SVM; mạng trơn so với ReLU và chọn bước theo số bước; chọn $b$ theo phần cứng; dừng sớm thay chọn $\lambda$). Đoạn "Trong học máy" chung ở cuối Mục 6 được bỏ, nội dung chuyển vào các đoạn trên và đoạn kết |
| B6 | trung bình | 462, 996, 1146, 1245, 1503, 1862, 2123; exercises Bài 7 | **đã sửa**: các chuỗi hơn hai quan hệ chuyển sang `aligned` một quan hệ mỗi dòng (Ví dụ 06.7, chứng minh T7, Định lý 06.22, Định lý 06.25, Bước 4 chứng minh T5 với câu căn cứ sau công thức, Bài tập 06.6, Bài tập 06.9, Bài 7). Tách đoạn ở 306, 420, 731, 1054, 1264, đoạn sau T5; đoạn diễn giải bảng Mục 7.2 thành danh sách năm mục |
| B7 | trung bình | exercises Bài 1, 2, 5, 9, 11 | **đã sửa**: Bài 1 câu 1 khớp nhãn $\pm1$, nghiệm $(-1,2,2,-4)$; câu 4 dùng $d=3072$, $m=256$, $p=786\,945$. Bài 2 dùng $W_1$ nhân đôi, hai đầu mút $F\approx0{,}4100$, trung điểm $\log2$. Bài 5 dùng $\theta_0=(\tfrac14,\tfrac14)$ ($K=176$ theo cận, $K=6$ thực tế) và điểm dừng $(4,\tfrac14)$ (trị riêng $0$ và $16{,}0625$). Bài 9 dùng $k=15$, $30$ ($0{,}1768$/$0{,}1778$; $0{,}1419$/$0{,}0889$; cận T5 $0{,}4726$, $0{,}3091$), ngưỡng $0{,}02$ ($K=20\,200$), $\alpha=0{,}05$ ($0{,}3973$ so với $\tfrac13$). Bài 11 (câu hỏi G03) giữ đề; Bài tập 06.11 của ghi chú đổi sang bài bộ nhớ và kích thước nhóm ($p=12\,591\,105$, Hessian $1{,}27\cdot10^{15}$ byte, $b_{\max}=175\,321$, cận $9{,}00\cdot10^{-5}$ so với $4{,}40\cdot10^{-4}$). Câu "không bài nào trùng đề" ở vòng trước được đính chính dưới đây |
| N1 | nhẹ | Tình huống 06.2 | **đã sửa**: kiểm H2 bằng lập luận thay lưới số: tới bước dừng $k=8$ (và $\theta_9$), mọi điểm lặp nằm trong $[-0{,}011;\,0{,}011]^2$, nơi chặn tổng hàng cho $L=1{,}0004$; với $\eta=\tfrac12\le\tfrac1L$, chứng minh T7 cho $\min_{k<K}\lVert\nabla F\rVert^2\le\tfrac{2\Delta_0}{\eta K}$ với $K\le9$. $F(\theta_{20})\approx0{,}49999$ |
| N2 | nhẹ | Bài tập 06.5 | **đã sửa**: $0{,}98125^{136}\approx0{,}0762$ |
| N3 | nhẹ | exercises Bài 8 | **đã sửa**: bốn giá trị $F(\theta_1)$ theo thứ tự $j=1,2,3,4$: $\tfrac{97}{192}$, $\tfrac{145}{288}$, $\tfrac{295}{576}$, $\tfrac{17}{32}$ |
| N4 | nhẹ | Mục 5.1, Mục 7.2 | **đã sửa**: hằng số Hessian viết $\mu$, $L$, $L_H$ như Định lý 05.33; bỏ $m_H$, $M_H$ |
| N5 | nhẹ | Nhận xét 06.18 | **đã sửa**: $\max\{0,\omega z\}=\omega\max\{0,z\}$ đúng với mọi $\omega\ge0$; cần $\omega>0$ để chia trọng số đi ra |
| N6 | nhẹ | 14 mục nhẹ còn lại của vai B | **đã sửa** 13 mục: tiêu đề 1.2 ("Hai lý do xem xét lại khung lồi tất định"), 4.1 ("Điểm dừng và phân loại điểm dừng"), 7 ("Bảo đảm mất đi, bảo đảm còn lại và lựa chọn phương pháp"; Nhận xét 06.42 giữ tên trang G01); khẩu ngữ ở 67, 101, 107, 201, 257, 546, 652, 819, 1875; câu trực giác ở 594 và 1745; $\kappa$ định nghĩa tại chỗ; tham chiếu "Mục 4, 5 và 6" ở dòng 25; bỏ câu 1123 và 1896; "bảo đảm cơ bản" ở 965; "học máy tính" ở 1918; câu Ví dụ 06.7 ("hai thành phần đối dấu nhau"); tiêu đề 6.7 "chính quy hóa $\ell_2$ trên mục tiêu toàn phương" và thống nhất "mục tiêu toàn phương"; chữ hoa sau dấu chấm phẩy ở 755; tham chiếu hình ở exercises (Bài 2 viết lại, không còn câu đó); các dấu hai chấm kiểu "colon reveal" ở 1394, 1442, 1736. **Không làm** 1 mục: giữ chữ $r$ cho ngưỡng kiên nhẫn vì deck F06 dùng $r$; đã đổi các nghĩa khác của $r$ |

**Đính chính vòng "Viết học liệu".** Câu "Không bài nào trùng đề với bài tập trong ghi chú" chỉ đúng với khối `exercise` của ghi chú; năm bài của `exercises.md` (Bài 1 câu 1 và 4, Bài 2, Bài 5, Bài 9) trùng dữ kiện và đáp án với các ví dụ đã giải (Ví dụ 06.2, 06.5, 06.12, 06.13, 06.15, 06.22, 06.23, 06.25, Nhận xét 06.10), và Bài 11 trùng kịch bản với Bài tập 06.11 cũ. Sau vòng sửa này, dữ kiện của các bài đó đã đổi như mục B7.

**Kiểm tra sau sửa.**

- Cấu trúc: ghi chú 127 khối, bài tập 33 khối, không lồng; số hiệu và tham chiếu `06.k` hợp lệ (script); không còn `\text{…}` chứa chữ tiếng Việt.
- Viewer Playwright (`wait_until='load'`, mọi `details` mở), 1600×900 và 390×844: 0 `.katex-error` (3 149 công thức trong ghi chú, 668 trong bài tập); không ký hiệu thô; nhãn khối đúng; 14/14 hình; 0 phần tử tràn ngang ngoài vùng cuộn ở cả hai kích thước, kể cả trong lời giải có vector nội dòng ở màn 390 px (độ rộng tài liệu 375–376 px). Lỗi console duy nhất vẫn là thông báo CSP của script nạp lại, như ở ghi chú 05b. Đã xem ảnh chứng minh Định lý 06.31 (1600 px) và lời giải Bài 5 (390 px).
- `git diff --check` sạch; không khoảng trắng cuối dòng. Độ dài: ghi chú 30 734 từ, bài tập 4 326 từ (`wc -w`).

## Sửa sau tái kiểm (2026-10-12)

Đầu vào: `recheck-materials.md` (17/17 mục của vòng trước đúng) và danh sách 13 mã của điều phối viên. Tác tử: biên tập viên học liệu Bài 06 (cùng tác tử, `general-purpose`, `claude-opus-5-5`, high). Không chạy sync, không commit; chỉ sửa `materials/lec-06/` và tệp này.

| Mã | Mức | Vị trí | Trạng thái và cách sửa |
|---|---|---|---|
| R1 | trung bình | Bài tập 06.11 | **đã sửa**: đề thêm $n=10^7$ mẫu và nhóm chọn có hoàn lại, để Mệnh đề 06.37 áp dụng được ($b_{\max}=175\,321<n$); câu 2 viết $1{,}57985\cdot10^{10}$, $\lfloor1{,}57985\cdot10^{10}/90\,112\rfloor=175\,321$; các số khác không đổi |
| R2 | nhẹ | exercises Bài 10 | **đã sửa**: bộ đếm $t$ như Thuật toán 06.3 (gợi ý, bảng, lời giải $r=1$) |
| R3 | nhẹ | Bài tập 06.3, câu 3 lời giải | **đã sửa**: $(u,v)\mapsto(\omega u,v/\omega)$ |
| R4 | nhẹ | "Trong học máy" sau Mệnh đề 06.40 | **đã sửa**: nêu điều kiện $\eta\alpha\ll1$, $\alpha\ll\lambda$ của Nhận xét 06.41 |
| R5 | nhẹ | Tình huống 06.2 | **đã sửa**: ở lần chạy thứ nhất $\lvert t_k\rvert$ giảm nên mọi điểm lặp nằm trong $C$, bảo đảm của Định lý 06.20 đúng với mọi $K$; lần chạy thứ hai vẫn giới hạn ở $K\le9$ |
| R6 | nhẹ | exercises Bài 2 | **đã sửa**: đề định nghĩa $\theta_A$ (Ví dụ 06.4) và quan hệ $\theta_A'$, $\theta_B'$ |
| R7 | nhẹ | exercises Bài 5 | **đã sửa**: "tăng qua hai bước đầu" |
| R8 | nhẹ | exercises Bài 9 | **đã sửa**: "khi yêu cầu chặt hơn hai lần, từ $0{,}02$ xuống $0{,}01$, số bước tăng khoảng bốn lần ($80\,400$ so với $20\,200$)" |
| R9 | nhẹ | Gợi ý Bài tập 06.8 | **đã sửa**: đặt $\dot\gamma=\gamma'(1)$, $H=\nabla^2F(\theta^*)$ trước khi dùng |
| R10 | nhẹ | Mục 1.2, Mục 3.6 | **đã sửa**: "Trong Bài 05, chúng ta đã thấy…", "Trong Bài 04, chúng ta đã có…" |
| R11 | nhẹ | Bài tập 06.8; Mục 6.5 | **đã sửa**: $\rho$ chỉ còn nghĩa bán kính lân cận (Định nghĩa 06.16, chứng minh Mệnh đề 06.17); đường cong của Bài tập 06.8 xác định trên một khoảng mở $I\ni1$; độ chính xác của Bottou–Bousquet viết $\rho_{\mathrm{BB}}$, nêu tại chỗ là ký hiệu $\rho$ của nguồn |
| R12 | nhẹ | Lời giải Bài tập 06.6, 06.8 | **đã sửa**: khối `$$` và các đoạn sau nó thụt lề ba dấu cách trong mục danh sách; bỏ khoảng trắng đầu dòng trước "Hạ gradient đầy đủ"; ảnh chụp ở 1600 và 390 px cho thấy công thức và đoạn nằm đúng trong mục 1 |
| R13 | nhẹ | tệp này | **đã sửa**: bảng sai lệch so với deck thêm dòng 9 ($\omega$ so với $(cu,v/c)$ ở D02/D03) và dòng 10 ($\Delta_k$ so với $e_k$ ở G01/Định lý 05.30); thêm vòng này |

**Kiểm tra.** Viewer Playwright, mọi `details` mở, 1600×900 và 390×844: 0 `.katex-error` (3 160 công thức trong ghi chú, 679 trong bài tập), không ký hiệu thô, nhãn khối đúng, 14/14 hình, 0 tràn ngang tài liệu (375–376 px ở màn 390 px). Lời giải Bài tập 06.6 và 06.8: khối lời giải không tràn (scrollWidth bằng clientWidth ở cả hai kích thước; công thức rộng cuộn trong khung riêng ở 390 px); đã xem ảnh. Console chỉ có thông báo CSP như các vòng trước. `git diff --check` sạch.

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12):** chấp nhận học liệu Bài 06 sau vòng viết (general-purpose, claude-opus-5-5, high), hai vai rà soát (toán; tiêu chuẩn), vòng sửa 17 mục và vòng sửa sau tái kiểm 13 mục; tái kiểm xác nhận 17/17. Kiểm độc lập: 254/66 khối `:::`, mỗi tệp một `#`, không "hãy"/"Kết mục"/thuật ngữ bị thay; 15 dẫn `05.k` đều tồn tại trong ghi chú Bài 05 đã commit; sync `--check` OK (22 tệp); thẻ index Bài 06 đúng vị trí. Sai lệch ký hiệu so với deck (ω; Δ_k) ghi nhận, giữ.
