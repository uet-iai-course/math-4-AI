# Nhật ký rà soát Bài 05 — ghi chú bài giảng và bài tập

Tệp sản phẩm: `materials/lec-05/lecture-note.md` (mới, 29 197 từ theo `wc -w`, 141 khối) và `materials/lec-05/exercises.md` (mới, 4 201 từ, 12 bài, 36 khối). Thư mục `materials/lec-05/` chưa tồn tại trước vòng này (học liệu Bài 05 cũ đã chuyển sang `materials/lec-06b/` ở commit 619a5c1). Ghi chú dùng lại mười một SVG của bộ trang chiếu trong `img/lec-05/`, không vẽ hình mới, không sửa hình. Bộ trang chiếu, CSS, viewer, `index.html` và các tệp của Bài 06 không bị sửa. `material-local-data.js` được sinh lại bằng `scripts/sync-local-materials.py`. Chưa commit.

## Viết học liệu (2026-10-12)

### Tác tử

| Vai | Loại tác tử | Mô hình | Effort | Ghi chú |
|---|---|---|---|---|
| Soạn học liệu (authoring), ghi tệp | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo brief `scratchpad/build/brief-materials-author.md` của điều phối viên Fable 5.1 ngày 2026-10-12; tác tử tự ghi dòng này, điều phối viên đối chiếu với lời gọi công cụ. Không sinh tác tử con. |

Kỹ năng `no-ai-slop` được nạp bằng công cụ `Skill` (chế độ Edit) trước khi soạn; tự đối chiếu `eval.md` ở mục "Tự kiểm `no-ai-slop`".

### Đầu vào đã đọc

- Bộ trang chiếu đã duyệt `lecture-05-khong-gian-dac-trung-nhieu-chieu.html`: 44 trang, toàn bộ mặt trang và ghi chú diễn giả (trích văn bản bằng script, đọc hết).
- `planning/lec-05/outline.md` (phạm vi, LLO/CLO, khung lý thuyết, mục Ví dụ số, Kết quả dùng lại, Nguồn), `storyboard.md` (bản đồ hành trình KN1–KN8), `review-log.md` (vòng dựng deck, vòng sửa sau năm vai S1–S3, M1–M19, N1–N11, vòng sửa sau tái kiểm R1–R12).
- `AGENTS.md` §"Ngôn ngữ và giọng văn", §"Tiêu chuẩn giáo trình cho ghi chú bài giảng" (gồm "Trình bày sáng sủa", "Kiểm định ghi chú bài giảng"); `CLAUDE.md`; mẫu `materials/_templates/lecture-note.md`; ghi chú mẫu `lec-05b/lecture-note.md`, `lec-05b/exercises.md`, `lec-04/lecture-note.md` (giọng, khối, kết mục).
- Phát biểu thật của các kết quả được dẫn, đọc trực tiếp trong ghi chú: Mệnh đề 01.6, Định nghĩa 01.8, Mệnh đề 01.9, Ví dụ 01.6, 01.7, Định lý 01.36, 01.38, Nhận xét 01.40, Hệ quả 01.41, Định nghĩa 01.42, Nhận xét 01.43, Tình huống 01.1; Mệnh đề 02.21; Định nghĩa 04.28, 04.30, 04.33, Mệnh đề 04.31, Thuật toán 04.2, Định lý 04.26, 04.34, 04.35; Định nghĩa 05b.5, Bổ đề 05b.6, Hệ quả 05b.17, Định lý 05b.18, 05b.36, 05b.39, 05b.41, 05b.43; Định nghĩa 05c.51, Định lý 05c.52, 05c.53.

### Nguồn giáo trình đã tra cách diễn giải

Chỉ học thứ tự dẫn dắt, cách đọc kết quả và ví dụ chuẩn; không dịch, không chép đoạn văn.

| Mục của ghi chú | Nguồn và vị trí | Đọc trực tiếp trong vòng này hay qua kế hoạch | Lấy gì |
|---|---|---|---|
| Mục 1 (khung, hai lý do) | Bottou và Bousquet, trong Sra, Nowozin, Wright (2011), ch. 13, §13.1–13.2 | qua `outline.md` (Nguồn đã tham khảo) | luận đề xấp xỉ–ước lượng–tối ưu |
| Mục 2.1–2.3 (đa thức bậc tăng, rủi ro) | Goodfellow, Bengio, Courville (2016), §5.2 (tr. 110–117), §5.3.1, §8.1 (tr. 275–277) | qua `outline.md` và ghi chú diễn giả HQ01–HQ05 | thứ tự dung lượng → quá khớp → chọn bằng tập xác thực; rủi ro thực nghiệm thay thế rủi ro kỳ vọng |
| Mục 2.4, Nhận xét 05.12, 05.18 | Goodfellow và cộng sự (2016), §7.3 (tr. 239–240) | đọc trực tiếp (bản trích văn bản `scratchpad/build/lec-05/gbc.txt`) | $X^TX$ suy biến khi ít mẫu hơn đặc trưng; giả nghịch đảo là giới hạn của chính quy hóa; logistic trên dữ liệu tách được, hạ gradient tăng chuẩn mãi |
| Mục 2.5 (số điều kiện, đường mức) | Boyd, Vandenberghe (2004), §9.1.2 (tr. 459–461); Goodfellow và cộng sự (2016), §8.2.1 | qua `outline.md`; vị trí mục kiểm lại trong `bv.txt` | số điều kiện của tập mức; điều kiện hóa kém |
| Mục 2.6 (chính quy hóa) | Boyd, Vandenberghe (2004), §6.3.2 (tr. 306); Goodfellow và cộng sự (2016), §7.1.1 (tr. 231) | qua `outline.md` | chính quy hóa như suy giảm trọng số |
| Mục 3.2–3.4 | Boyd, Vandenberghe (2004), §7.1.1 (tr. 354–355), §8.6.1 (phân tách tuyến tính); Goodfellow và cộng sự (2016), §5.7.1, §7.3 | §8.6.1 đọc trực tiếp trong `bv.txt`; còn lại qua `outline.md` | mô hình logistic; phân tách bởi hàm affine |
| Mục 4.1–4.4 | Boyd, Vandenberghe (2004), §9.3.1 (tr. 466–468), §9.5.1 (tr. 486), §9.5.3 (tr. 488–491); MIT OCW 6.079 (2009), bài 10 "Unconstrained minimization", trang 10–16 đến 10–18 | MIT đọc trực tiếp (`sources/…MIT6_079F09_lec16.pdf`); BV qua `outline.md`, ghi chú diễn giả CP03–CP05 và Định lý 04.35 | hai giai đoạn của Newton, ngưỡng $m^2/L_H$, bất biến affine |
| Mục 4.5 (chi phí, Mệnh đề 05.36) | Boyd, Vandenberghe (2004), §9.7.1–9.7.2 (tr. 508–512, mục "Diagonal plus low rank"); MIT OCW 6.079, trang 10–29, 10–30 | đọc trực tiếp | chi phí $\tfrac13n^3$ của Cholesky; hệ Newton đường chéo cộng hạng thấp giải qua hệ nhỏ, chi phí $2p^2n$ |
| Mục 4.6 | Bottou và Bousquet (2011), Bảng 13.2 (tr. 362) | qua ghi chú diễn giả CP08 | bảng chi phí GD/2GD |
| Mục 5.1 (dừng sớm) | Goodfellow và cộng sự (2016), §7.8 (tr. 246–250), Thuật toán 7.1 | đọc trực tiếp (`gbc.txt`) | quy tắc trả về tham số có sai số xác thực nhỏ nhất, tham số kiên nhẫn |
| Mục 5.2 (RCV1) | Bottou và Bousquet (2011), §13.4.1, Bảng 13.3 (tr. 363) | đọc trực tiếp (`snw.txt`): 781 265 / 23 149 mẫu, 47 152 đặc trưng, ba dòng logistic, câu "TRON reaches the optimum with 10 digits of accuracy in less than one minute" | số liệu bảng và chú thích TRON |
| Mục 5.3 (XOR) | Goodfellow và cộng sự (2016), §6.1 | qua ghi chú diễn giả KL03 | ví dụ chuẩn XOR |
| Giọng kể | Giáo trình *Học máy thống kê* của người dùng, `chapters/05_regression/sec_linear_regression.tex` (bản giải nén sẵn trong `scratchpad/sml-unzip-A/`) | đọc trực tiếp | giọng "chúng ta/ta", câu dẫn trước khối; không chạy mã nào trong gói |

Nocedal–Wright và Strang không có trong `sources/`; Strang (2016) được dẫn cho định lý hạng–số chiều và thương Rayleigh ở mức tên phần, không dẫn số trang. Hai nguồn bổ sung chỉ ghi ở "Hướng dẫn đọc thêm": Soudry và cộng sự (2018, JMLR 19) cho hướng giới hạn của hạ gradient trên dữ liệu tách được; Lin, Weng, Keerthi (2008, JMLR 9) cho TRON. Không tải tài nguyên MIT OCW mới.

### Cấu trúc và số hiệu

- Năm mục nội dung ứng với năm mạch của deck: Mục 1 (MD), Mục 2 (HQ), Mục 3 (LG), Mục 4 (CP), Mục 5 (KL); thêm Tình huống áp dụng và ứng dụng, Tóm tắt chương, Bài tập củng cố, Hướng dẫn đọc thêm.
- Bộ đếm chung (Định nghĩa, Định lý, Mệnh đề, Hệ quả, Nhận xét): 05.1–05.42, liên tục. Ví dụ 05.1–05.25; Bài tập 05.1–05.15; Thuật toán 05.1–05.2; Tình huống 05.1–05.3.
- Đếm theo loại khối: 6 định nghĩa, 4 định lý, 19 mệnh đề, 3 hệ quả, 10 nhận xét, 2 thuật toán, 24 chứng minh, 25 ví dụ, 3 tình huống, 15 bài tập (mỗi bài có `hint` và `solution`). 141 khối mở bằng 141 khối đóng, không lồng.
- Bảng tương ứng nhãn deck → số hiệu ghi chú đặt ở Tóm tắt chương và đầu `exercises.md`: Mệnh đề 1 → 05.10; Mệnh đề 2 → 05.21; Định lý 1 → 05.22; Mệnh đề 3 → 05.24; Định lý 2 → 05.26; Mệnh đề 4 → 05.28; Định lý 3 → 05.30; Định lý 4 → 05.33; Mệnh đề 5 → 05.35; T5–T8 → Định lý 05b.36, 05b.39, 05b.41, 05b.43.
- Kiểm tham chiếu chéo bằng script: mọi chuỗi "Định nghĩa/Định lý/Mệnh đề/Hệ quả/Nhận xét/Ví dụ/Bài tập/Tình huống/Thuật toán 05.k" trỏ tới một khối có thật; từng tham chiếu "Ví dụ 05.k" được đọc lại theo ngữ cảnh.
- Độ dài 29 197 từ, trong khoảng của các ghi chú 01–07 (31 000–35 000); bảng ký hiệu 20 dòng (21 dòng sau vòng sửa sau hai vai rà soát).

### Quyết định ký hiệu và toán đã áp dụng (theo review-log Bài 05, 2026-10-11 và 2026-10-12)

| Quyết định | Chỗ áp dụng trong ghi chú |
|---|---|
| Hệ số chặn gộp vào $w$ qua tọa độ hằng $1$; không viết $b$ | Mục 1.2, Định nghĩa 05.1, Nhận xét 05.2 |
| $\sigma$ là sigmoid; phương sai nhiễu gradient ngẫu nhiên viết $\tau^2$ (Bài 05b viết $\sigma^2$) | Nhận xét 05.2, Mục 5.4, Nhận xét 05.42 |
| $\lambda=\mu/n$; hai mẫu của Tình huống 01.1 ứng với $\lambda=\mu/2$ | Nhận xét 05.2, Ví dụ 05.14 |
| T5 bước hằng chỉ tới lân cận: $\mathbb E\lVert w_k-w^*\rVert^2$ cỡ $\eta\tau^2/\mu$, bán kính cỡ $\sqrt{\eta\tau^2/\mu}$ (sửa A5); T6 bước giảm dần tới cực tiểu, $O(1/k)$ (R1) | Nhận xét 05.42 (bảng và điểm 1), đoạn sau nhận xét |
| T7 chặn $\min_{k<K}$; T8 có mức nhiễu nền $L\eta\tau^2$ | Nhận xét 05.42 (bảng và điểm 2) |
| CP08: ngưỡng hòa vốn chỉ có nghĩa bậc độ lớn; $548$ khi bỏ hằng số, $\approx137$ khi tính hằng số; ở $\lambda=10^{-3}$ không kết luận (M1) | Ví dụ 05.22, đoạn sau, Tóm tắt (giả thiết hay quên 6) |
| HQ05: MSE trên bốn điểm không nhiễu ước lượng $2R-s^2$ (R3) | Nhận xét 05.9, Tình huống 05.1 |
| Thuật ngữ người dùng 2026-10-11: "tính thủ công", "mức nhiễu nền", "kích thước nhóm", "phép kiểm tra", "trường hợp", "bài toán con"; "hạ gradient"; "chi phí" thay "giá" | toàn tệp; quét `giá`, `bằng tay`, `tính tay` sau khi viết |
| Ký hiệu đổi ở vòng sửa sau hai vai rà soát (B1): độ chính xác đích $\varepsilon_{\rm tol}$, $\varepsilon$ chỉ cho nhiễu nhãn; hằng số Hessian của Định lý 05.33 viết $\mu$, $L$, $L_H$ (Boyd viết $m$, $M$, $L$); số chiều đầu vào $d_0$; kích thước tập kiểm thử $n_{\rm kt}$ | toàn tệp; Định lý 05.33, Ví dụ 05.20; Mệnh đề 05.41; Mệnh đề 05.7, Ví dụ 05.25 |
| KL01: MSE huấn luyện $\le10^{-6}$ từ bước $2701$ (MSE xác thực $0{,}0480$); $F\le10^{-6}$ từ bước $2509$; 34 lần, 45 lần | Ví dụ 05.24 |

### Sai lệch so với bộ trang chiếu

Không đổi ký hiệu, giả thiết, số liệu hay kết luận nào của deck. Các sai lệch đều là phần mở rộng mà ghi chú phải có theo tiêu chuẩn giáo trình, hoặc chính xác hóa câu chữ.

| # | Trang deck | Sai lệch | Lý do |
|---|---|---|---|
| D1 | HQ03, HQ05, HQ07, HQ09 | Các phát biểu bằng lời trên deck được viết thành kết quả có chứng minh: Mệnh đề 05.4 (sai số huấn luyện không tăng), Mệnh đề 05.7 (không chệch), Nhận xét 05.8 (thiên lệch khi chọn, có chứng minh), Mệnh đề 05.11 (nghiệm chuẩn nhỏ nhất), Mệnh đề 05.14, 05.15 (hằng số, cận độ nhạy), Mệnh đề 05.16 (chứng minh phần đầu mút của định lý xen kẽ Cauchy bằng thương Rayleigh) | Tiêu chuẩn giáo trình: kết quả phải có chứng minh |
| D2 | LG06, LG08, KL05 | Deck để "chứng minh đầy đủ Mệnh đề 3" và "$\lVert w_\lambda\rVert\to\infty$" làm bài tập về nhà; ghi chú chứng minh đầy đủ cả hai (Mệnh đề 05.24, Hệ quả 05.27). `exercises.md` giao hai bài thay thế không trùng: Bài 5 chứng minh Mệnh đề 05.24 bằng phản chứng với dãy (khác chứng minh dùng $\max_i(-m_i(v))$ của ghi chú), Bài 7 chứng minh cận dưới định lượng $\lVert w_\lambda\rVert\ge\frac1\rho\log\frac{\log2}{\lambda(1+\log^2(1/\lambda)/(2\gamma^2))}$ | Tiêu chuẩn giáo trình đòi chứng minh đủ trong ghi chú; hai tệp không lặp đề. Trang KL05 của deck vẫn đúng (hai bài về nhà tồn tại trong `exercises.md`, dưới dạng biến thể); điều phối viên quyết có sửa câu chữ KL05 hay không |
| D3 | LG05, LG10 (ghi chú diễn giả) | Lập luận "hạ gradient có $\lVert w_k\rVert\to\infty$" thành Hệ quả 05.23 có chứng minh | như D1 |
| D4 | CP05, CP07 (Nhận xét) | Bất biến affine và cấu trúc $d>n$ thành Mệnh đề 05.34, 05.36 có chứng minh (công thức Woodbury kiểm trực tiếp) | như D1 |
| D5 | KL01 (ghi chú) | Thêm Mệnh đề 05.39: dãy hạ gradient trên bình phương nhỏ nhất theo hướng riêng, $w_k=\sum_j[1-(1-s_j/L)^k](v_j^Tw^*)v_j$, kèm hệ số khớp tại $k=79$ ($0{,}133;\ 0{,}726;\ 1;\ 1;\ 1$). Nêu công thức $\frac{s_j}{s_j+\lambda}$ của nghiệm chính quy hóa để chỉ sự tương tự; Bài tập 05.12 tính trên ví dụ $2\times2$ | Ghi chú diễn giả KL01 chỉ mô tả định tính "khớp nhanh hướng cong, chậm hướng phẳng". Deck nói "phép so sánh định lượng được trình bày ở Bài 06"; ghi chú giữ câu đó và không lập quan hệ $k\leftrightarrow\lambda$. Điều phối viên cần xác nhận mức này không lấn Bài 06 |
| D6 | KL04 | Cột trái hàng 2 viết "(khi (i) hoặc (ii))"; deck lúc viết vòng này ghi "(khi (i) và (ii))", nay đã sửa thành "hoặc" (tái kiểm 2026-10-12), nên sai lệch đã khép | Ghi chú diễn giả KL04 nói Định lý 3 mất khi có (i), và cũng mất khi có (ii); "hoặc" là cách đọc logic đúng. Đề nghị điều phối viên cân nhắc sửa deck |
| D7 | CP04, CP05 | Định lý 05.30 dẫn cả Định lý 05b.18(b) và Định lý 04.26; Định lý 05.33 dẫn Định lý 04.35 và Boyd, Vandenberghe §9.5.3 | Nêu đủ nguồn đã có trong kho |
| D8 | — | Số liệu mới, không có trên deck, đều tính lại bằng Python thuần: tập kiểm thử tám điểm $\pm\tfrac18,\pm\tfrac38,\pm\tfrac58,\pm\tfrac78$ và cột MSE kiểm thử (Tình huống 05.1); quỹ đạo hạ gradient không chính quy hóa trên ba điểm, $\lVert w_k\rVert$ và $F(w_k)$ tại $k=10..10^5$ (Tình huống 05.2); kịch bản $n=10^6$, $d=100$, $\lambda=10^{-4}$ (Tình huống 05.3); phân tích theo hướng riêng của Ví dụ 05.17 ($a_0=7{,}196$, $b_0=0{,}464$); tỉ số trị riêng Hessian tại nghiệm $\approx4{,}4$ (ba điểm, $\lambda=0{,}01$); $L_H=1/(6\sqrt3)$ dẫn từ $\max\lvert s(1-s)(1-2s)\rvert$ (Ví dụ 05.20); số liệu của 27 bài tập trong hai tệp | Tình huống áp dụng và bài tập cần dữ kiện riêng |
| D9 | MD04 | Thêm (G1)–(G5) thành danh sách giả thiết có tên trong Mục 1.2 | Deck để năm giả thiết trong ghi chú diễn giả |

### Kiểm số liệu

Mọi con số được tính lại bằng Python thuần (phân số `fractions.Fraction` khi có thể; trị riêng bằng phép quay Jacobi; nghiệm logistic bằng Newton tới chuẩn gradient dưới $10^{-15}$). Script trong `scratchpad/build/lec-05/mat/`: `linalg.py`, `hq.py` (bảng MSE $d=1..5$ dạng phân số, trị riêng, độ nhạy, họ nghiệm $d=6$, chuẩn nhỏ nhất $d=6,7,8$, ridge $d=5,8$), `es.py` (dừng sớm: bước 79, 2509, 2701, tập kiểm thử tám điểm, hệ số theo hướng riêng), `lg.py` (ba điểm, tia, hạng phạt dọc tia, $w_\lambda$ ba chiều, bảng một chiều), `cp.py` (Newton/hạ gradient 4–5–7 và 12–71–446 bước, quay lui Armijo nhận $t=1$, tỉ số co cục bộ, ngưỡng $6\sqrt3\lambda^2$, đường đi hàm bậc hai), `sit.py` (Tình huống 05.2), `misc.py` (chi phí, ngưỡng 548/137, RCV1, tổ hợp, các bài tập). Mọi số trùng với mục Ví dụ số của `outline.md` và với deck; số mới khớp script.

Dòng kiểm đáng chú ý: tỉ số $0{,}048682/0{,}000125=389{,}5$; $\kappa\log(e_0/\varepsilon_{\rm tol})=916{,}3\to917$ (ký hiệu $\varepsilon_{\rm tol}$ từ vòng sửa sau hai vai rà soát); $(1-F''_\lambda(w_\lambda)/L)^2=0{,}267;\ 0{,}819;\ 0{,}973$ so với tỉ số đo $0{,}2666;\ 0{,}8192;\ 0{,}9729$; ngưỡng hòa vốn $1{,}01\cdot10^{12}/1{,}842\cdot10^9=548{,}3$ và $5{,}053\cdot10^{11}/(2\cdot10^8\cdot18{,}42)=137{,}2$; RCV1 $nd^2+d^3=1{,}842\cdot10^{15}$, $8d^2=1{,}779\cdot10^{10}$ byte; sai số chuẩn $\sqrt{0{,}057\cdot0{,}943/23\,149}=0{,}0015$.

Sửa trong khi soạn: Bài tập 05.10 (chẵn lẻ ba bit) bản nháp đòi "thêm đúng một đơn thức"; kiểm lại thấy không thể (chẵn lẻ $r$ bit cần đơn thức bậc $r$ cùng các bậc thấp hơn), nên đổi đề thành ba câu: affine không đủ, thêm riêng $u_1u_2u_3$ không đủ (chứng minh bằng cộng bất đẳng thức), mọi đơn thức tới bậc ba đủ với $\bar w$ cho điểm số $-\tfrac12\prod_i(1-2u_i)$.

### Kiểm trình duyệt và đồng bộ

- `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: "OK: material-local-data.js is up to date (20 file(s))".
- Playwright Chromium, máy chủ 8765, `wait_until='load'`, URL `material-viewer.html?doc=materials/lec-05/{lecture-note,exercises}.md&deck=lecture-05-khong-gian-dac-trung-nhieu-chieu.html`, 1600×900 và 390×844:
  - ghi chú: 141 khối render đúng nhãn (6 definition, 4 theorem, 19 proposition, 3 corollary, 10 remark, 2 algorithm, 24 proof, 25 example, 3 application, 15 exercise, 15 hint, 15 solution), 0 chuỗi `:::` thô, 11/11 hình tải được và có `alt`, 0 `.katex-error`, 0 cảnh báo KaTeX, 0 ký hiệu `$` sót trong văn bản, không tràn ngang (bề rộng tài liệu 1585 và 375);
  - bài tập: 36 khối, 0 `.katex-error`, 0 cảnh báo KaTeX, không tràn ngang.
  - Một lỗi console "Executing inline script violates the following Content Security Policy directive" xuất hiện ở cả bốn trang; lỗi giống hệt khi mở học liệu Bài 05b, nên thuộc viewer chung, không do tệp của vòng này. Không sửa (ngoài phạm vi ghi).
  - Lượt đầu có 38 và 12 cảnh báo KaTeX do chữ tiếng Việt trong `\text{…}` của công thức; đã chuyển mọi căn cứ tiếng Việt ra câu sau công thức (nhãn (a), (b) trong `aligned`), thay "với mọi" bằng $\forall$, và đổi bảng tổng chi phí từ `aligned` sang bảng Markdown; lượt sau 0 cảnh báo.
  - Đã xem bằng mắt ảnh chụp đầu trang, Nhận xét 05.42 (bảng trong khối), Mệnh đề 05.36 và chứng minh, Ví dụ 05.19 ở màn hẹp (bảng cuộn ngang trong khối), Bài 7 của tệp bài tập ở màn hẹp. Một lỗi bố cục phát hiện qua ảnh: danh sách đề Bài 7 bị ngắt ở mục 4 do công thức hiển thị nằm giữa; đã chuyển công thức xuống cuối đề. Ảnh trong `scratchpad/build/lec-05/mat/shots/`.
- Không có khoảng trắng cuối dòng hay tab trong hai tệp mới; `git diff --check` sạch.

### Tự kiểm `no-ai-slop`

Chế độ Edit, đối chiếu `eval.md`. Quét: "hãy", dấu hỏi, "Mục này…", "trang chiếu" (chỉ còn trong bảng tương ứng nhãn), "dễ thấy", "suy ra ngay", dấu ba chấm, "quan trọng", "Lưu ý", "nhấn mạnh", "thực sự", "hoàn toàn", "Tiếp theo". Đã sửa: câu lấy chương hoặc mục làm chủ ngữ ("Chương này phục vụ…", "Chương dùng…", "Mục 2.6 cho thấy…", "Mục 2 và Mục 3 cho thấy…", "Chương kết thúc…", "mà Mục 4 đếm"); một câu dấu hai chấm kịch tính có "quan trọng" ở cuối Mục 1; ba câu đối lập nhị phân "không phải X, mà Y" chuyển thành câu khẳng định; "cái giá", "trả giá", "không miễn phí", "thắng" thay bằng "chi phí", "hệ quả", "rẻ hơn", "có sai số nhỏ hơn"; "tính được bằng tay" thành "tính thủ công được". Giữ các câu "không phải" nêu phân biệt toán học (quá khớp là trạng thái của cặp mô hình–dữ liệu; điều quyết định sự tồn tại là hình học của dữ liệu, không phải tính lồi). Mỗi mục `##` mở bằng bài toán có số liệu; câu nối giữa các mục đặt luân phiên ở cuối Mục 1, đầu Mục 3, cuối Mục 3, đầu Mục 5.

### Điểm cần điều phối viên quyết

1. D2: chấp nhận ghi chú chứng minh đủ hai kết quả mà deck để làm bài về nhà, và hai bài biến thể trong `exercises.md`; có sửa câu chữ KL05 của deck hay không.
2. D5: mức chi tiết của so sánh dừng sớm và chính quy hóa (công thức hai họ hệ số, Bài tập 05.12) so với câu "Bài 06 trình bày phép so sánh định lượng".
3. D6: "(i) hoặc (ii)" thay "(i) và (ii)" ở KL04; có đồng bộ deck không.
4. Lỗi CSP của viewer (chung mọi bài) cần một vòng hạ tầng riêng nếu muốn console sạch hoàn toàn.
5. Tình huống 05.3 dùng bối cảnh chấm điểm tín dụng với số liệu giả định ($n=10^6$, $d=100$); có thể đổi bối cảnh nếu muốn gắn với một tập dữ liệu có thật.

Chưa có tác tử rà toán và rà mạch truyện cho học liệu; theo `AGENTS.md`, hai vai này cần chạy trước khi công bố trên chỉ mục.

## Vòng sửa sau hai vai rà soát học liệu (2026-10-12)

Cùng tác tử soạn (general-purpose, `claude-opus-5-5`, effort high), tiếp tục làm vai biên tập viên theo lệnh của điều phối viên. Đầu vào: `scratchpad/build/lec-05/materials-fix-list.md` và hai báo cáo `review-materials-A.md` (toán: 0 chặn, 0 nghiêm trọng, 4 trung bình, 10 nhẹ) và `review-materials-B.md` (tiêu chuẩn: 0 chặn, 0 nghiêm trọng, 7 trung bình, 14 nhẹ). Phạm vi ghi: hai tệp học liệu, nhật ký này, `material-local-data.js` qua script sync. Không sửa deck (tác tử deck sửa song song các chỗ tương ứng A5, A7, A8), không sửa tệp Bài 06, không commit. Kỹ năng `no-ai-slop` vẫn áp dụng ở chế độ Edit cho mọi câu mới.

Sau vòng sửa: ghi chú 30 686 từ, 141 khối (không đổi số hiệu nào); bài tập 4 291 từ, 36 khối.

### Trung bình

| Mã | Trạng thái | Cách sửa |
|---|---|---|
| A1 | đã sửa | Tình huống 05.1, bước "Xác minh giả thiết": giả thiết của Mệnh đề 05.7 thỏa cho tập kiểm thử với mọi mô hình; với tập xác thực, chỉ thỏa cho mô hình có tham số cố định trước. Bước dừng $79$ được chọn trên tập xác thực, nên giá trị $0{,}00108$ có xu hướng thấp (Nhận xét 05.8) |
| A2 | đã sửa | Sau Mệnh đề 05.39: chỉ hướng phẳng nhất $s_1\approx0{,}0028$ làm sai số xác thực tăng. Số liệu tính lại độc lập bằng Python thuần, khớp vai A: giữ trọn hướng $s_2$ và ba hướng cong, bỏ $s_1$ cho $0{,}0013$; thêm trọn $s_1$ cho $0{,}0487$; bỏ cả hai hướng phẳng cho $0{,}0163$. Hình chiếu của $\delta w$ lên $v_1$ có độ lớn $0{,}0646$ trên $0{,}0648$ |
| A3 | đã sửa | Bài tập 05.10 câu 3: thay "theo câu 2" bằng lập luận đối xứng hóa (trung bình qua sáu hoán vị bit cho điểm số $a+bs+c\,s(s-1)/2$, đổi dấu nhiều nhất hai lần, trong khi nhãn đổi dấu ba lần); câu 2 chỉ cho tính cần thiết của các tích đôi một |
| A4 | đã sửa | Nhận xét 05.25: thêm điều kiện bộ tách $\bar w$ với $x_0^T\bar w=0$ tại vector chung; nêu phản ví dụ của vai A (bốn mẫu $(0,\pm1)$, $(1,+1)$, $(-1,+1)$ vẫn thỏa Mệnh đề 05.24); trỏ Bài 6 của tệp bài tập kèm dữ kiện và kết luận |
| B1 | đã sửa | Giữ $r$ cho cận $\lVert x_i\rVert\le r$ như deck LG09, KL05. Số chiều đầu vào đổi thành $d_0$ (bảng ký hiệu, Mệnh đề 05.41, Bài tập 05.11). `exercises.md` Bài 7: $\rho\to r$. Kích thước tập kiểm thử $m\to n_{\rm kt}$ (Mệnh đề 05.7, Ví dụ 05.25), tập xác thực ở Bài 3 bài tập $m\to n_{\rm xt}$. Định lý 05.33, Ví dụ 05.20 viết $\mu$, $L$ thay cho $m$, $M$ của Boyd và nêu tương ứng bằng chữ. Độ chính xác đích $\varepsilon\to\varepsilon_{\rm tol}$ trong cả hai tệp, $\varepsilon$ chỉ còn là nhiễu nhãn; biến tạm $\epsilon$ trong chứng minh Hệ quả 05.27 đổi thành $c_0$. Bảng ký hiệu thêm $d_0$, $\bar w$, $\gamma$, $\varepsilon$ và $s^2$, $r$, gộp $L_H$ với $\delta_N$ (21 dòng). Ghi chú: lúc sửa, deck KL03 còn dùng $r$ cho số biến đầu vào; deck nay đã đổi sang $d_0$, nên ghi chú và deck khớp. Giữ $r_i$ cục bộ của Thuật toán 05.1 và bán kính $r$ trong chứng minh Định lý 05.22, vì deck CP06 và LG05 dùng đúng các ký hiệu này |
| B2 | đã sửa | Khoảng 20 câu lấy chương hoặc mục làm chủ ngữ được viết lại với "chúng ta/ta" hoặc với đối tượng toán học: các câu ở Mục 1 ("Mục 4.5 đếm", "Mục 5 ghép", "Mục 2 bắt đầu", "Mục 5.3 dùng"), Mục 2 ("Mục 2.4 chứng minh", "Mục 4.1 cho thấy", "chương dùng", "chương không chứng minh"), Mục 3 ("Mục 4.3 cho thấy", "chương không viết chi tiết"), Mục 4 ("Hai mục con tiếp theo", "Phần còn lại của mục", "Bảng sau tính", "Chương không giả định"), dòng 20 và 28 của Kiến thức tiên quyết. Quét lại bằng regex: không còn mẫu nào |
| B3 | đã sửa | Câu nối chỉ đặt một phía: ranh giới 2→3 chuyển câu nối về cuối Mục 2, Mục 3 mở thẳng bằng bài toán ba điểm; ranh giới 4→5 đặt ở cuối Mục 4, Mục 5 mở bằng câu hỏi cụ thể, bỏ đoạn tóm ba mục. Mười chuỗi quan hệ dài chuyển sang `aligned` một quan hệ mỗi dòng (chứng minh 05.4, 05.15, 05.16, Ví dụ 05.1, 05.7, 05.12, chứng minh 05.26, 05.27, 05.28, Bài tập 05.5, chứng minh 05.34, 05.39, 05.40; Bài 3 bài tập). Chứng minh Mệnh đề 05.14 chia ba bước. Hằng số của Mệnh đề 05.17 ngắt hai dòng; bảng Ví dụ 05.16 bỏ cột cận chuẩn (chuyển vào "Kiểm tra lại"), bảng Ví dụ 05.19 bỏ cột $F''_\lambda(w_\lambda)$ (chuyển vào câu sau bảng), bảng Bài 12 bài tập xoay dọc. Đo bằng Playwright ở 1600 px: 0 công thức, 0 bảng vượt khung. Hai đoạn nhiều ý (Nhận xét 05.9, "Trong học máy" sau Mệnh đề 05.16) tách đoạn |
| B4 | đã sửa | Câu cuối đoạn kể của Tóm tắt viết theo luận đề MD03: điểm cực tiểu chính xác của $F$ không phải đích, mỗi bước trả chi phí theo $n$, nên với ngân sách cố định số lần cập nhật giảm theo $1/n$ |
| B5 | đã sửa | Thêm ba đoạn "Trong học máy": sau Hệ quả 05.31 (mục tiêu $F_\lambda$, $\mu=\lambda$ bảo đảm, $L$ từ Mệnh đề 05.28, số bước tăng theo $1/\lambda$, mạng nơ ron không lồi mạnh); sau Mệnh đề 05.34 (bộ tối ưu bậc hai cho hồi quy logistic, giả thiết Hessian bị chặn và Lipschitz thỏa, ReLU vi phạm); cuối Mục 5.3 (đặc trưng thủ công giữ được giả thiết nhưng $d$ tăng theo (5.2); đặc trưng học được làm mục tiêu không lồi) |
| B6 | đã sửa | Nhận xét 05.29: chứng minh ngắn tính liên tục theo dữ liệu, $\lVert w_\lambda-w'_\lambda\rVert\le\frac1\lambda\lVert\nabla F'(w_\lambda)-\nabla F(w_\lambda)\rVert$ từ hai bất đẳng thức H3, và gradient liên tục theo $(X,y)$ |

### Nhẹ

| Mã | Trạng thái | Cách sửa |
|---|---|---|
| A5 | đã sửa | Nhận xét 05.42 điểm 1: kỳ vọng bình phương khoảng cách cỡ $\eta\tau^2/\mu$, bán kính cỡ $\sqrt{\eta\tau^2/\mu}$; ô bảng viết "giữ $\mathbb E\lVert w_k-w^*\rVert^2$ ở mức cỡ $\eta\tau^2/\mu$" |
| A6 | đã sửa | Chứng minh Mệnh đề 05.3, Bước 2: chiều thuận là điều kiện cần bậc nhất của Bài 00, chiều ngược là Hệ quả 01.27 |
| A7 | đã sửa | Mục 4.7: một tích $Xv$ trên RCV1 là $nd\approx3{,}7\cdot10^{10}$; một gradient theo Thuật toán 05.1 cần hai tích, khoảng $7{,}4\cdot10^{10}$ |
| A8 | đã sửa | Bài 8 câu 2 bài tập: hai cận chênh dưới một bậc, phép đếm bỏ hằng số chưa đủ; tính cả hằng số, $3{,}7\cdot10^{14}$ so với $5{,}0\cdot10^{14}$ (tính lại: $3{,}684\cdot10^{14}$ và $5{,}035\cdot10^{14}$), chiều kết luận không đổi |
| A9 | đã sửa | Bài 5 bài tập: bỏ câu cấm dùng $\max_i(-m_i(v))$; đề nêu hai cách, cách của ghi chú và gợi ý trên deck KL05 dùng hàm max, lời giải đi theo cách dãy. Tiêu đề "Chứng minh đầy đủ Mệnh đề 05.24", khớp bài về nhà trên deck |
| A10 | đã sửa | "năm cột đầu" → "$n$ cột đầu"; "Tính chất này thuộc riêng mất mát bình phương" → "Trong hai mất mát của chương, chỉ mất mát bình phương có tính chất này"; "tức tại $w=0$" → "tức khi $Xw=0$, chẳng hạn tại $w=0$"; Phạm vi Mệnh đề 05.7: phương sai "đo" độ lệch, chẳng hạn qua Chebyshev; tương đương H2–H3 với tiêu chuẩn Hessian dẫn Nhận xét 01.40 và Nhận xét 04.19 thay vì Định nghĩa 05b.5 |
| B7 | đã sửa | Tiêu đề 1.1 → "Hai lý do xem xét lại khung tất định". Tiêu đề 5.4 giữ (trùng tiêu đề KL04 có chủ ý) |
| B8 | đã sửa | Câu hỏi trung tâm chỉ phát biểu đầy đủ một lần (cuối Mục 1.1); đoạn mở Mục 1 chỉ nêu "khung còn đúng tới đâu" |
| B9 | đã sửa | "khuôn" → "sơ đồ chung"; "bò chậm" → "tiến chậm"; "thực ra thưa" → "là dữ liệu thưa"; "một vạn lần" → "$10^4$ lần"; câu hỏi lửng đầu Mục 5 viết lại. Khẳng định không nguồn: "phổ biến nhất" (Mục 2.6) thay bằng dẫn Goodfellow §5.3; "phổ biến nhất" (Mục 5.1) dẫn Goodfellow §7.8 tr. 247 (đã đọc lại câu gốc "probably the most commonly used form of regularization in deep learning"); "nhiều thư viện" → nêu TRON trong LIBLINEAR và `newton-cg` của scikit-learn; "một số tài liệu" bỏ; "thường nhỏ hơn $nd$ hàng trăm lần" → điều kiện phần lớn tọa độ bằng $0$; "gốc của mọi hiện tượng" → "giải thích các hiện tượng của Mục 3.3–3.7"; "phụ thuộc vào lúc dừng chứ không vào bài toán" → "nhiều hơn vào dữ liệu" |
| B10 | đã sửa | Thêm câu dẫn trước Nhận xét 05.2, Ví dụ 05.8, Nhận xét 05.37, Ví dụ 05.21, Tình huống 05.2, 05.3, trước nhóm bài tập của mỗi mục (05.1, 05.4, 05.7, 05.10), và đoạn mở mục Tình huống nêu ba tình huống. Các bài tập liền nhau trong cùng một nhóm dùng chung câu dẫn của nhóm, như ghi chú 05b |
| B11 | đã sửa | Hai chỗ trỏ tệp bài tập nêu số bài và nội dung: Nhận xét 05.25 (Bài 6, $\inf F=\tfrac12\log2$ không đạt), Hệ quả 05.27 (Bài 7, chuẩn tăng ít nhất như $\frac1r\log\frac1\lambda$ trừ số hạng bậc $\log\log\frac1\lambda$) |
| B12 | đã sửa | Lần đầu ở Mục 3.4: "hạ gradient ngẫu nhiên (stochastic gradient descent, SGD)", kèm một mệnh đề giải nghĩa; Ví dụ 05.25 dẫn lại Mục 3.4 |
| B13 | đã sửa | Ghi chú đổi phản ví dụ ở Mục 3.3 sang $u=(-3,-1,2,4)$ (biên $3,1,2,4$), để Bài 4 câu 1 bài tập (câu hỏi LG11) không bị giải sẵn. Bài tập 05.15 viết lại hoàn toàn: dữ liệu văn bản thưa $n=10^5$, $d=5\cdot10^4$, $10^7$ phần tử khác $0$; chi phí hạ gradient thưa ($1{,}8\cdot10^{12}$ theo cận), Hessian dày 20 GB và Cholesky $4{,}2\cdot10^{13}$ mỗi bước, Newton–gradient liên hợp với $50$ tích mỗi bước (giả định) khoảng $1{,}0\cdot10^{10}$; không còn trùng Bài 10 (câu hỏi KL05) |
| B14 | đã sửa | Bài 9 câu 3: "khoảng $nd=25$", "khoảng $nd^2+d^3=250$", không gán $O(\cdot)$ bằng số |
| B nhẹ khác | đã sửa | $\eta_0$ → $\vartheta$ (ngưỡng) và $\ell$ → $j$ (số bước bậc hai) ở đoạn sau Định lý 05.33; Mục 2.6 thêm câu trực giác trước Mệnh đề 05.17 (hạng phạt cộng $\lambda$ vào mọi độ cong, ví dụ $\operatorname{diag}(1;\ 0{,}5)\to\operatorname{diag}(1+\lambda;\ 0{,}5+\lambda)$) |

### Giữ, có lý do

| Mã | Quyết định | Lý do |
|---|---|---|
| G1 | giữ | Bảng "Tương ứng với nhãn của bộ trang chiếu" ở Tóm tắt chương và đoạn đầu `exercises.md` là bảng tra cứu, giúp người học đối chiếu nhãn ngắn trên deck (Mệnh đề 1–5, Định lý 1–4, T5–T8) với số hiệu `05.k`; nó không thay nội dung nào của ghi chú. Đã kiểm: bảng không nêu mã trang (MD01…, HQ01…), chỉ nêu nhãn hiển thị trên mặt trang |
| G2 | giữ | Tình huống 05.3 giữ bối cảnh chấm điểm tín dụng; câu mở nay nói rõ hệ thống là giả định, kích thước chọn để minh họa phép đếm, không lấy từ một tập dữ liệu thật. Đoạn mở mục Tình huống cũng gọi đây là "bài toán có kích thước giả định" |

### Số liệu tính lại trong vòng này

Bằng Python thuần (`scratchpad/build/lec-05/mat/`): hệ số khớp theo hướng riêng và MSE xác thực $0{,}01627$; $0{,}0013$; $0{,}04868$; $0{,}06365$; $0{,}00108$ (A2); hình chiếu $\delta w$ lên các vector riêng (A2); Bài 8 với hằng số $3{,}684\cdot10^{14}$, $5{,}035\cdot10^{14}$ (A8); Bài tập 05.15 mới: $\kappa\le5001$, $9{,}21\cdot10^4$ bước, $1{,}84\cdot10^{12}$, $d^3/3=4{,}17\cdot10^{13}$, $8d^2=2\cdot10^{10}$ byte, $10\cdot51\cdot2\cdot10^7=1{,}02\cdot10^{10}$, tỉ số $180$; phản ví dụ Mục 3.3 với $u=(-3,-1,2,4)$.

### Kiểm tra

- `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: "OK: material-local-data.js is up to date (22 file(s))" (thêm hai tệp do vòng Bài 06 song song).
- Playwright 1600×900 và 390×844, hai tệp: 141 và 36 khối render đúng nhãn, 0 `:::` thô, 11/11 hình tải được, 0 `.katex-error`, 0 cảnh báo KaTeX (đã chuyển các căn cứ tiếng Việt mới thêm trong `aligned` ra câu sau công thức, nhãn (a), (b)), không tràn ngang trang; ở 1600 px không công thức hay bảng nào vượt khung. Lỗi console CSP như cũ (chung của viewer). Đã xem bằng mắt ảnh Nhận xét 05.29, Ví dụ 05.12, Ví dụ 05.16, Ví dụ 05.19 ở hai kích thước và Bài 8, Bài 12 bài tập (`scratchpad/build/lec-05/mat/shots2/`).
- Kiểm tham chiếu chéo bằng script: 0 tham chiếu `05.k` treo trong hai tệp; số hiệu không đổi.
- `git diff --check` sạch; hai tệp không có khoảng trắng cuối dòng.

## Sửa sau tái kiểm (2026-10-12)

Cùng tác tử biên tập (general-purpose, `claude-opus-5-5`, effort high). Đầu vào: `scratchpad/build/lec-05/recheck-materials.md` (25/26 mục của vòng trước đúng) và danh sách 12 mục của điều phối viên. Không commit, không sửa deck hay tệp Bài 06.

| # | Mức độ | Trạng thái | Cách sửa |
|---|---|---|---|
| 1 | trung bình | đã sửa | Nhận xét 05.25: phản ví dụ viết lại đúng. Với $x_0=(1,0)$, hai mẫu $(1,+1)$, $(-1,+1)$ tách được bởi $\bar w=(1,0)$ nhưng $x_0^T\bar w=1\ne0$; các biên cùng không âm buộc $w=0$, nên đây không phải trường hợp ranh giới. "là cần" thay bằng "không bỏ được" |
| 2 | nhẹ | đã sửa | Bài 8 câu 2 bài tập: chỉ kết luận ở mức bậc độ lớn (hai cận cỡ $10^{14}$–$10^{15}$; tính cả hằng số $3{,}7\cdot10^{14}$ và $5{,}0\cdot10^{14}$), bỏ "nghiêng về hạ gradient", thống nhất với ghi chú diễn giả CP10 |
| 3 | nhẹ | đã sửa | Nhật ký: dòng kiểm số dùng $\varepsilon_{\rm tol}$; bảng quyết định ký hiệu thêm dòng $\varepsilon_{\rm tol}$, $\mu$/$L$/$L_H$, $d_0$, $n_{\rm kt}$, và dòng T5 ghi bán kính; D6 ghi deck nay đã viết "(i) hoặc (ii)", sai lệch đã khép; B1 ghi deck KL03 nay dùng $d_0$, ghi chú và deck khớp. Đã kiểm deck hiện tại: có "khi (i) hoặc (ii)" và $\binom{d_0+q}{q}$ |
| 4 | nhẹ | đã sửa | Đoạn sau Định nghĩa 05.13: tương đương "H2 và H3 ⇔ $\mu I\preceq\nabla^2f\preceq LI$" dẫn Bài 05b (đoạn sau Định nghĩa 05b.5); Nhận xét 01.40 cho tương đương của H3; Nhận xét 04.19 chỉ được dẫn cho chiều đủ của H2 |
| 5 | nhẹ | đã sửa | Nhận xét 05.29: bỏ "nghiệm càng nhạy"; câu cuối viết "khi $\lambda$ nhỏ, hằng số $\frac1\lambda$ làm cận này cho phép độ dịch của nghiệm lớn hơn" |
| 6 | nhẹ | đã sửa | "Trong học máy" sau Mệnh đề 05.34: ReLU trỏ Bài 06 thay Bài 06c |
| 7 | nhẹ | đã sửa | "Trong học máy" Mục 5.3: "cái phải trả" → "chi phí" |
| 8 | nhẹ | đã sửa | Mục 4.7: "mà Mục 5.2 dùng lại" → "mà chúng ta gặp lại ở Mục 5.2"; Nhận xét 05.25 và Hệ quả 05.27: "Ở Bài 6/Bài 7 của tệp bài tập, ta…" |
| 9 | nhẹ | đã sửa | Chứng minh Mệnh đề 05.36 (dòng (b) tách thành hai dòng) và lời giải Bài 7 bài tập câu 2 (dòng đầu tách thành ba dòng): một quan hệ mỗi dòng |
| 10 | nhẹ | đã sửa | Lời giải Bài 2 bài tập: vector phần dư năm thành phần đặt thành công thức hiển thị hai dòng (`aligned`), thụt vào trong mục 2 của danh sách. Đo ở 390 px: công thức rộng 243/243 px, không phần tử nội dòng nào vượt khung, danh sách giữ ba mục |
| 11 | nhẹ | đã sửa | Gợi ý Bài tập 05.12: theo quy ước $s_1\le s_2$ của Mệnh đề 05.39, $s_1=0{,}01$ (trục thứ hai, hướng phẳng), $s_2=1$ (trục thứ nhất, hướng cong). Lời giải đã kiểm: chỉ nói "hướng cong", "hướng phẳng" và tọa độ, không dùng chỉ số $s_j$, nên không đổi |
| 12 | nhẹ | đã sửa | Bỏ khoảng trắng đầu dòng (dòng "Vậy $\lVert X\delta w\rVert\le\lVert\delta y\rVert$" sau chứng minh Bước 2 của Mệnh đề 05.15) |

Kiểm tra sau vòng này: `sync-local-materials.py` rồi `--check` báo "OK … (22 file(s))", gói gồm cả học liệu Bài 06 đang viết. Playwright 1600×900 và 390×844 cho hai tệp: 141 và 36 khối, 0 `.katex-error`, 0 cảnh báo KaTeX, không tràn ngang trang, ở 1600 px không công thức hay bảng nào vượt khung; lỗi CSP chung của viewer như cũ. `git diff --check` sạch; hai tệp không có khoảng trắng cuối dòng hay đầu dòng lẻ.

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12):** chấp nhận học liệu Bài 05 sau vòng viết (tác tử general-purpose, claude-opus-5-5, high), hai vai rà soát (toán; tiêu chuẩn giáo trình — cùng loại tác tử), vòng sửa 24 mục và vòng sửa sau tái kiểm 12 mục; tái kiểm xác nhận 25/26 mục đúng, mục còn lại (phản ví dụ Nhận xét 05.25) đã sửa. Kiểm độc lập: 141/36 khối `:::`, không "hãy"/"Kết mục"/"Chuỗi suy luận", thẻ index Bài 05 đúng mẫu và liên kết 200. Gói `material-local-data.js` ở mốc này sinh từ cây không có `materials/lec-06` (đang biên tập), nên `--check` trong cây làm việc báo lệch cho tới mốc Bài 06. Ba quyết định cho tác giả: D2 giữ biến thể bài tập; D5 giữ Mệnh đề 05.39 không lập quan hệ $k$–$\lambda$; D6 deck đã viết "(i) hoặc (ii)". Lỗi CSP trên viewer chỉ do script nạp lại của reloadserver, không sửa.
