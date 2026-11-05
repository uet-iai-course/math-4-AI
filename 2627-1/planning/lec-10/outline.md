# Dàn ý bộ trang chiếu Bài 10 — Xác suất: ngôn ngữ biểu diễn bất định trong AI

Tài liệu này là dàn ý của bộ trang chiếu `2627-1/lecture-10-xac-suat-bieu-dien-bat-dinh.html` (soạn 2026-11-05, giai đoạn A; sửa theo cổng storyboard cùng ngày). Kế hoạch ghi chú bài giảng trước đó được giữ nguyên văn ở cuối tệp, mục "Phụ lục". Mọi số dòng "L…" là dòng của `2627-1/materials/lec-10/lecture-note.md` tại thời điểm soạn; "BT L…" là dòng của `2627-1/materials/lec-10/exercises.md`.

## Phạm vi và chuẩn đầu ra

- Yêu cầu người dùng (2026-11-05): dựng bộ trang chiếu từ ghi chú Bài 10, đưa lên `2627-1/index.html`; dùng Murphy làm nguồn, MAT1101 làm mẫu diễn đạt; chứng minh quan trọng trình bày rõ trên mặt trang.
- Phạm vi nội dung: §§1–9 và §11 của ghi chú (L53–2081), theo thứ tự đã điều chỉnh ở quyết định Q-A (độc lập chuyển sang mạch 4). Lược theo Q-D: phân rã phương sai (§7.6, Phụ lục A), Phụ lục B, Ví dụ 10.1, 10.5, 10.6 phần 2, 10.9, Hệ quả 10.7, Mệnh đề 10.26 (trừ trường hợp $n=2$, "Mệnh đề." của KV07), Markov, Chebyshev và luật số lớn chỉ ở ghi chú diễn giả hoặc bỏ.
- Chuẩn đầu ra: CLO2 (ghi chú L32, năng lực xây dựng và phân tích mô hình học máy); không gán LLO vì đề cương không có buổi riêng cho xác suất cơ bản.
- Sáu mục tiêu học tập của ghi chú (L23–30) được rút gọn trên trang mục tiêu; mỗi trang ở storyboard ghi mục tiêu nó phục vụ.
- Tiên quyết (L34–39): tập hợp, phép đếm, xác suất rời rạc Bài 05c, tích phân một biến, ma trận xác định dương. Bài 05c không có bộ trang chiếu, nên các định nghĩa và chứng minh trùng 05c được trình bày đầy đủ trên mặt trang (ngoại lệ có chủ đích, ghi trong `review-log.md`); ghi chú diễn giả dẫn số hiệu 05c tương ứng.
- Sản phẩm học tập: mô hình xác suất hữu hạn của camera; hậu nghiệm $198/437$ sau cảnh báo; phân phối của $S,Y,A$; chi phí kỳ vọng $0{,}0698$; hậu nghiệm khi thiếu nguồn hàng ($198/437$, $236/437$); quy tắc quyết định với ngưỡng $1/6$.

## Nguồn

1. Ghi chú bài giảng và bài tập Bài 10 (`materials/lec-10/`): nguồn của mọi định nghĩa, kết quả, chứng minh và con số trên mặt trang. Không thêm số liệu hay ví dụ ngoài hai tệp này.
2. Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press; PDF `/data/tqlong/learn-my-style/sources/murphy2022probabilistic-draft.pdf` (trang PDF = trang in + 30). Các mục dùng để đối chiếu cách dẫn dắt và ghi nguồn trong ghi chú diễn giả (`<p class="note-source">`), không dịch chép:
   - §2.1.1–2.1.3 (PDF 63–65): bất định, xác suất của biến cố, hợp, phần bù, có điều kiện → mạch 2, 3.
   - §2.2, §2.2.1–2.2.2 (PDF 65–67): biến rời rạc, CDF, mật độ → mạch 4.
   - §2.2.3 (PDF 68–69): đồng thời, lấy biên (quy tắc tổng), quy tắc nhân, quy tắc chuỗi → mạch 3, 6.
   - §2.2.4 (PDF 69–70): độc lập, độc lập có điều kiện → mạch 4.
   - §2.2.5 (PDF 70–72): mômen; kỳ vọng toàn phần với ví dụ bóng đèn hai nhà máy $0{,}6/0{,}4$ → mạch 5 (chỉ dẫn trong ghi chú diễn giả).
   - §2.3, §2.3.1 (PDF 74–77): định lý Bayes, ví dụ xét nghiệm COVID-19 → mạch 3 (dẫn trong ghi chú diễn giả, không đưa số liệu Murphy lên mặt trang).
   - §2.4.1 (PDF 79–80) Bernoulli; §2.5.1 (PDF 83) phân phối phân loại; §2.6.1–2.6.2 (PDF 87–88) Gaussian, mật độ có thể lớn hơn $1$ → mạch 4.
   - §3.1.1–3.1.3 (PDF 107–109): hiệp phương sai, tương quan, không tương quan không kéo theo độc lập → mạch 5.
   - §3.2.1 (PDF 111): Gaussian nhiều chiều → mạch 4.
3. MAT1101 (Xác suất thống kê, cùng tác giả), chỉ làm mẫu diễn đạt; bản trích trong scratchpad của phiên điều phối (`src/lec10/y1.txt`…`y6.txt`, `z7.1.txt`, `z8.txt`, `z9.txt`, `b2.txt`…`b6.txt`). Các mẫu dùng: Bài 1 S11–S21 (mô hình xác suất, tiên đề), Bài 2 S4–S7 (trang "Muốn …", điều kiện như không gian mẫu mới), S14 (luật nhân, cây), S19, S25 (khuôn "Nếu … thì …"), S28 (độc lập khác rời nhau), Bài 3 S5–S9 (biến ngẫu nhiên là hàm), S24–S25 (kỳ vọng như trọng tâm), S27 (chứng minh bốn dòng), S28–S34 ("Cách khác:" cho phương sai), S49–S51 (quyết định theo chi phí kỳ vọng), Bài 4 S16 (tử số đồng thời, mẫu số biên), Bài 5 S5–S9 (mật độ khác xác suất), S16–S17 (CDF), S25 (Gaussian), Bài 6 S19. Không chép lỗi $\operatorname{var}(X+Y)$ của Bài 7.1 S24.
4. Đề cương UET.AI2012 (`sources/`): CLO2; mỗi buổi 2 tiết lý thuyết + 1 tiết bài tập.

## Thời lượng

Theo kế hoạch của người dùng (phụ lục, mục "Mạch và thời gian"): 120 phút lý thuyết và ba bài trên lớp × 10 phút. Phân bổ theo mạch nằm trong `storyboard.md`; không ghi thời lượng trên mặt trang hay trong ghi chú diễn giả.

## Sườn lý thuyết chung

- **Bài toán trung tâm.** Hệ thống sản phẩm ba bước: nhà cung cấp $S\in\{a,b\}$ → tình trạng lỗi $Y\in\{0,1\}$ → phản hồi cảm biến $A\in\{0,1\}$, với tham số (5.6) (L613–622): $\mathbb P(S=a)=0{,}6$, $\mathbb P(Y=1\mid S=a)=0{,}02$, $\mathbb P(Y=1\mid S=b)=0{,}08$, $\mathbb P(A=1\mid Y=1)=0{,}9$, $\mathbb P(A=1\mid Y=0)=0{,}05$. Nhiệm vụ: tính xác suất của nhãn chưa quan sát sau cảnh báo, kể cả khi thiếu hồ sơ nguồn hàng, rồi quyết định theo chi phí kỳ vọng. Câu hỏi mở đầu L8–19 được trả lời trên mặt trang: hậu nghiệm $198/437$ (trang ví dụ cập nhật của mạch 3 và trang bảng đồng thời của mạch 6), hậu nghiệm nguồn hàng $236/437$, ngưỡng quyết định $1/6$.
- **Đối tượng và ký hiệu.** Theo bảng ký hiệu L70–92: $(\Omega,\mathcal F,\mathbb P)$, $E,F,G$, $H,C$, $\mathbb P(E\mid F)$, $p_X$, $F_X$, $f_X$, $\mathbb E$, $\operatorname{Var}$, $\operatorname{Cov}$, $\mathbf 1_E$, $\perp$, $\psi(s)$; các lệch có chủ đích ở mục "Khóa ký hiệu".
- **Giả thiết** (L94–101): tham số cho trước; $A\perp S\mid Y$; mẫu số dương; mômen hữu hạn; Gaussian cần $\sigma^2>0$ hoặc $\Sigma$ đối xứng xác định dương.
- **Chuỗi định nghĩa → kết quả → phương pháp.** Không gian mẫu → biến cố → tiên đề → phần bù và hợp → có điều kiện → quy tắc nhân → toàn phần → Bayes → biến ngẫu nhiên, PMF, CDF, mật độ, các họ phân phối → độc lập, độc lập có điều kiện → kỳ vọng, tính tuyến tính → phương sai, hiệp phương sai → kỳ vọng toàn phần → phân phối đồng thời → lấy biên → phân phối có điều kiện → phân tích nhân tử → thuật toán suy luận → quyết định theo chi phí.
- **Giới hạn áp dụng.** Tham số cho trước (ước lượng nói bằng lời, cầu nối Bài 11); phân tích nhân tử (8.7) cần $A\perp S\mid Y$; hậu nghiệm cần thêm chi phí mới thành quyết định; tiên nghiệm đổi thì tính lại hậu nghiệm (Tình huống 10.2, L1995–2013); mật độ không phải xác suất; hiệp phương sai bằng $0$ không kéo theo độc lập.

## Khóa ký hiệu và dữ kiện

- Camera (Ví dụ 10.2, L372–419): bốn kết quả viết bằng lời, "(có người, cảnh báo)", "(có người, không cảnh báo)", "(không có người, cảnh báo)", "(không có người, không cảnh báo)", với trọng số $0{,}18$; $0{,}02$; $0{,}08$; $0{,}72$. Biến cố $H$ (có người), $C$ (cảnh báo), $M$ (phản hồi sai). Không dùng nhãn chữ đứng $\mathrm P,\mathrm N,\mathrm A,\mathrm Q$ của (4.2) (Q-F). Số đọc ra: $\mathbb P(H)=0{,}20$, $\mathbb P(C)=0{,}26$, $\mathbb P(H\cap C)=0{,}18$, $\mathbb P(M)=0{,}10$, $\mathbb P(H\cup C)=0{,}28$, $\mathbb P(H\mid C)=9/13$, $\mathbb P(C\mid H)=0{,}90$, $\mathbb P(C\mid H^c)=0{,}10$.
- Hệ thống sản phẩm: giai đoạn 1 (L431–440) bảng $0{,}0396/0{,}0044/0{,}0478/0{,}9082$; tiên nghiệm $\mathbb P(Y=1)=0{,}044$; $\mathbb P(A=1)=0{,}0874$; $\mathbb P(Y=1\mid A=1)=198/437\approx0{,}4531$; $\mathbb P(A=1\mid S=a)=0{,}067$, $\mathbb P(A=1\mid S=b)=0{,}118$; $\mathbb E[L]=0{,}0698$; $\operatorname{Var}(Y)=0{,}042064$; bảng 8 ô (L1902–1908); $\mathbb P(S=b\mid A=1)=236/437$, $\mathbb P(S=a\mid A=1)=201/437$; $\mathbb P(Y=1\mid A=1,S=a)=18/67$, $\mathbb P(Y=1\mid A=1,S=b)=36/59$; $\mathbb P(Y=1\mid A=0)=22/4563\approx0{,}0048$; tiên nghiệm mới $0{,}01$ cho $2/13$.
- Ví dụ phụ: mức xử lý $X\in\{0,1,2\}$ với $0{,}70/0{,}20/0{,}10$ (Ví dụ 10.7, L858–878); độ lệch kích thước $X\in\{-2,\dots,2\}$ (Ví dụ 10.10, L1463–1502); mật độ đều cao $10$ trên $[0;\,0{,}1]$ (L1000).
- **Lệch ký hiệu có chủ đích so với ghi chú** (ghi trong `review-log.md`):
  - khoảng nhỏ trong xấp xỉ mật độ: $\delta$ thay $\Delta$ (L1002), vì $\Delta(t)$ là dạng toàn phương của Gaussian;
  - hậu nghiệm trong quy tắc quyết định (SL12): $r=\mathbb P(Y=1\mid A=a')$ thay $p$ (L1975), tránh trùng $p_X$, $p(\omega)$ và $q(s,y)$; trục của `decision-threshold.svg` ghi $r$;
  - phân hoạch trong Định lý 10.11: $B_1,\ldots,B_m$ thay $B_1,\ldots,B_q$ (L541), vì $q$ đã dành cho tích nhân tử; Mệnh đề 10.5 viết tổng theo $\omega\in\Omega$, không cần chỉ số $m$;
  - tích nhân tử trong Mệnh đề 10.34 và Thuật toán 10.35 giữ $q(s,y)$ như ghi chú (L1853, L1887); Thuật toán 10.35 trên mặt trang không đặt tên $r(y)$ và $c$ của ghi chú (L1888–1890): bước 2 viết $p_{Y,A}(y,a')=\sum_sq(s,y)$, bước 3 viết $p_A(a')=\sum_yp_{Y,A}(y,a')$;
  - Gaussian tổng quát viết cho biến $X$ với mật độ $f_X$ (ghi chú dùng $T$, L1037), vì $T$ là thời gian xử lý trong Bài tập 10.2 (BT L56–62), bài được đưa lên mặt trang; số đo cảm biến trong ghi chú diễn giả TK05 cũng viết $X$;
  - tập Borel trong định nghĩa độc lập của biến (PP09) và mật độ đồng thời (SL02): $B,B'$ thay $B_1,B_2$ (L897, L1730), để $B_1,\ldots,B_m$ chỉ là phân hoạch của Định lý 10.11 (rà soát v1);
  - tham số của phân phối phân loại (PP07): vector $\boldsymbol\pi=(\pi_1,\ldots,\pi_K)$ viết đậm, phân biệt với hằng số $\pi$ trong mật độ Gaussian;
  - giá trị quan sát của cảm biến: $a'\in\{0,1\}$ (SL05, "Ký hiệu:"), như ghi chú;
  - ghi chú diễn giả KV03b không đặt tên $W=(X,Z)$, vì $W$ là biến điều kiện của PP10–PP13.
- Giữ $\mathbb P$ (không đổi sang `\Pr`), dùng `\mid`; số thập phân dấu phẩy `{,}`.

## Bảy mạch và câu hỏi trung tâm

| # | Tiền tố | Tên mạch (trên trang "Nội dung" và trang tiêu đề mạch) | Câu hỏi trung tâm |
|---|---|---|---|
| 1 | MD | Mở đầu | Sản phẩm bị cảnh báo, thiếu hồ sơ nguồn hàng: xác suất lỗi bao nhiêu, xử lý thế nào |
| 2 | MH | Mô hình xác suất | Gán xác suất cho các kết quả của camera thế nào để mọi phép tính trên biến cố nhất quán |
| 3 | BY | Xác suất có điều kiện và định lý Bayes | Xác suất sản phẩm lỗi sau một cảnh báo bằng bao nhiêu; phân rã: tỉ lệ cảnh báo trong từng nhóm × tỉ lệ của nhóm, rồi chuẩn hóa (hậu nghiệm ∝ tiên nghiệm × hợp lý, gọi tên từ BY09) |
| 4 | PP | Biến ngẫu nhiên, phân phối và độc lập | Phân phối của nhãn, nguồn hàng, tín hiệu đo và quy tắc ghép chúng (dòng dẫn: "Muốn mô tả nhãn, nguồn hàng, tín hiệu đo và ghép chúng, cần phân phối của từng biến và quy tắc độc lập.") |
| 5 | KV | Kỳ vọng, phương sai và hiệp phương sai | Những con số nào tóm tắt phân phối của chi phí và nhãn lỗi: kỳ vọng, phương sai, hiệp phương sai, trung bình theo nhóm |
| 6 | SL | Phân phối đồng thời và phép lấy biên | Khi thiếu hồ sơ nguồn hàng: hậu nghiệm của nguồn hàng $\mathbb P(S=s\mid A=1)$ và của nhãn lỗi theo nguồn $\mathbb P(Y=1\mid A=1,S=s)$ cần một mô hình chung của $(S,Y,A)$ (hậu nghiệm $198/437$ tính lại như tổng theo $s$), rồi quyết định; phân rã: phân phối đồng thời (tích ba nhân tử) → lấy biên → chuẩn hóa → chi phí |
| 7 | TK | Tổng kết và chuyển tiếp | Kết quả nào dùng được dưới giả thiết nào |

Trang tiêu đề mạch N có `id="mach-N"`; bìa là trang tiêu đề của mạch 1 (`id="mach-1"`).

## Danh sách trang và ánh xạ sang ghi chú (77 trang)

Thứ tự mạch 4 sau rà soát v1: PP00–PP10, PP12, PP11, PP13.

Cột "Khối ghi chú" ghi số hiệu và dòng của `lecture-note.md` (hoặc `exercises.md`, tiền tố "BT") mà trang lấy nội dung.

| Mạch | Mã | Tiêu đề dự kiến | Vai trò | Khối ghi chú |
|---|---|---|---|---|
| 1 | MD00 | Xác suất: ngôn ngữ biểu diễn bất định trong AI | Bìa; trang tiêu đề mạch 1 (`id="mach-1"`) | L1–6 |
| 1 | MD01 | Mục tiêu học tập | Sáu mục tiêu rút gọn, CLO2 | L21–32 |
| 1 | MD02 | Nội dung | Bảy mạch đánh số; tài liệu đọc trước trong ghi chú diễn giả | L2083–2087 |
| 1 | MD03 | Sản phẩm bị cảnh báo khi thiếu hồ sơ nguồn hàng | Bài toán trung tâm, "Câu hỏi:" mở | Câu hỏi mở đầu L8–19 |
| 1 | MD04 | Ngữ cảnh | Đối tượng, giả thiết, đầu ra (≤4 dòng) | §1 L53–64; §2 L94–101; §3 L103–113 |
| 2 | MH00 | 2. Mô hình xác suất | Trang tiêu đề mạch (`id="mach-2"`) | §4 L117–121 |
| 2 | MH01 | Kết quả của một khung hình camera | Nhu cầu + ví dụ dẫn nhập | L117–125; L150–162 |
| 2 | MH02 | Biến cố trên lưới camera | Trực quan, hình `camera-event-grid.svg` | L166; L177–192 |
| 2 | MH03 | Không gian mẫu và biến cố | Định nghĩa 10.1, 10.2 | L127–131; L168–175; L177 |
| 2 | MH04 | Không gian xác suất | Định nghĩa 10.3 | L196–217 |
| 2 | MH05 | Cộng tính hữu hạn và tính đơn điệu | Bổ đề 10.4, "Chứng minh." một dòng | L219–258 |
| 2 | MH06 | Mô hình xác suất hữu hạn | Mệnh đề 10.5 | L260–299 |
| 2 | MH09 | Ví dụ: bảng tình huống của camera | Ứng dụng Mệnh đề 10.5; $\mathbb P(H\cup C)=0{,}28$ tính trực tiếp từ trọng số (ví dụ dẫn nhập); nhu cầu và trực quan ($0{,}46$ so với $0{,}28$) ở MH07; bảng camera đầy đủ (lần duy nhất); đứng sau MH06 | Ví dụ 10.2 L372–419; L421 |
| 2 | MH07 | Phần bù và hợp hai biến cố | Nhu cầu + "Trực quan." (ô chung đếm hai lần) + Mệnh đề 10.6 | L303–322; L345 |
| 2 | MH08 | Chứng minh: phần bù và hợp hai biến cố | P1 | L324–343 |
| 2 | MH10 | Bài tập: bảng của hệ thống sản phẩm | Bài có lời giải trên mặt trang (fragment), gồm cách tính bằng phần bù; bảng giai đoạn 1 đầy đủ (lần duy nhất) | L431–442 |
| 3 | BY00 | 3. Xác suất có điều kiện và định lý Bayes | Trang tiêu đề mạch (`id="mach-3"`) | §5 L446 |
| 3 | BY01 | Khung hình có cảnh báo | Nhu cầu + ví dụ dẫn nhập + trực quan, hình `camera-conditioning.svg` | L421; L446–450 |
| 3 | BY02 | Xác suất có điều kiện | Định nghĩa 10.9 và tính chất độ đo | Định nghĩa 10.9 L452–459; L461–466 |
| 3 | BY03 | Ví dụ: đọc lại cảnh báo của camera | Ví dụ; phép đảo điều kiện | Câu hỏi L468; Ví dụ 10.3 L472–490 |
| 3 | BY04 | Cây xác suất của nguồn hàng và lỗi | Nhu cầu (thiếu hồ sơ nguồn hàng) + trực quan + ví dụ toàn phần; hình `supplier-tree-deck.svg` | L494; L634–644; L681–683 |
| 3 | BY05 | Quy tắc nhân | Mệnh đề 10.10, "Chứng minh." một dòng; đặt sau cây | L496–536 |
| 3 | BY06 | Xác suất toàn phần và định lý Bayes | Định lý 10.11 | L538–559 |
| 3 | BY07 | Chứng minh: xác suất toàn phần | P2, bước 1 | L561–573 |
| 3 | BY08 | Chứng minh: định lý Bayes | P2, bước 2 | L575–587 |
| 3 | BY09 | Tiên nghiệm, hợp lý và hậu nghiệm | Đọc (5.4), dạng tỉ lệ (5.5) | L589–603 |
| 3 | BY10 | Ví dụ: cập nhật xác suất sản phẩm lỗi | Ứng dụng; $198/437$ trả lời một nửa câu hỏi mở đầu | Ví dụ 10.4 L609–679; L685 |
| 3 | BY11 | Bài tập: đọc điều kiện trên bảng camera | Bài 10.1 (a), (c), lời giải trên mặt trang | BT L7–50 |
| 4 | PP00 | 4. Biến ngẫu nhiên, phân phối và độc lập | Trang tiêu đề mạch (`id="mach-4"`) | §6 L796 |
| 4 | PP01 | Đại lượng quan sát của một lần kiểm định | Nhu cầu + ví dụ dẫn nhập + trực quan | L796–800; L818–820 |
| 4 | PP02 | Biến ngẫu nhiên và phân phối | Định nghĩa 10.14: biến chỉ thị, biến phân loại, vector ngẫu nhiên | L802–820 |
| 4 | PP03 | Hàm khối xác suất và hàm phân phối tích lũy | Định nghĩa 10.15 | L824–856 |
| 4 | PP04 | Ví dụ: mức xử lý sản phẩm | Ví dụ CDF, hình `cdf-three-levels.svg` | Ví dụ 10.7 L858–880 |
| 4 | PP05 | Mật độ xác suất | Nhu cầu + trực quan (hình `density-area.svg`) + Định nghĩa 10.18 | L977–1004 |
| 4 | PP06 | Bài tập: mật độ đều trên một đoạn | Bài 10.2 (a), (b), lời giải trên mặt trang; (c) tự học | BT L52–97 |
| 4 | PP07 | Phân phối Bernoulli và phân phối phân loại | Định nghĩa 10.19 | L1008–1034 |
| 4 | PP08 | Phân phối Gaussian | Định nghĩa 10.20 | L1036–1061 |
| 4 | PP09 | Độc lập của biến cố và của biến ngẫu nhiên | Nhu cầu + Định nghĩa 10.12, 10.16 (phần 1) | L689–704; L884–917 |
| 4 | PP10 | Độc lập có điều kiện | Định nghĩa 10.13, 10.16 (phần 2); đọc (5.7) | L718–741; L899–919; (5.7) L624–632 |
| 4 | PP12 | Dạng tương đương của độc lập có điều kiện | Mệnh đề 10.17, "Chứng minh." ngắn | L919–973 |
| 4 | PP11 | Ví dụ: cảnh báo và nguồn hàng | Độc lập có điều kiện nhưng phụ thuộc | Ví dụ 10.6 phần 1 L745–773, L785–790 |
| 4 | PP13 | Bài tập: độc lập trước và sau khi quan sát | Bài 10.3, lời giải trên mặt trang | BT L99–149 |
| 5 | KV00 | 5. Kỳ vọng, phương sai và hiệp phương sai | Trang tiêu đề mạch (`id="mach-5"`) | §7 L1067 |
| 5 | KV01 | Kỳ vọng | Nhu cầu + trực quan + Định nghĩa 10.21 | L1067–1095 |
| 5 | KV02 | Kỳ vọng của hàm và tính tuyến tính | Mệnh đề 10.22; $\mathbb E[\mathbf 1_E]=\mathbb P(E)$ | L1099–1131; L1201–1205 |
| 5 | KV03 | Chứng minh: kỳ vọng của hàm | P3 | L1133–1162 |
| 5 | KV03b | Chứng minh: tính tuyến tính của kỳ vọng | P4 (tách theo cổng storyboard) | L1164–1199 |
| 5 | KV04 | Ví dụ: chi phí kỳ vọng của bộ cảnh báo | Ứng dụng; $\mathbb E[L]=0{,}0698$ | Ví dụ 10.8 L1207–1242 |
| 5 | KV05 | Phương sai | Nhu cầu + Định nghĩa 10.23 + Mệnh đề 10.24 | L1246–1274 |
| 5 | KV06 | Chứng minh: công thức tính phương sai | P5 | L1276–1307 |
| 5 | KV07 | Hiệp phương sai | Định nghĩa 10.25, $\operatorname{Cov}=\mathbb E[XZ]-\mu_X\mu_Z$ | L1341–1376 |
| 5 | KV08 | Độc lập kéo theo không tương quan | Mệnh đề 10.27 | L1425–1435 |
| 5 | KV09 | Chứng minh: độc lập kéo theo không tương quan | P6 | L1437–1457 |
| 5 | KV10 | Ví dụ: độ lệch kích thước và nhãn lỗi | Phản ví dụ, hình `uncorrelated-dependent.svg` | L1461; Ví dụ 10.10 L1463–1504 |
| 5 | KV11 | Kỳ vọng toàn phần | Nhu cầu + "Trực quan." + Định nghĩa 10.28 (phần $\psi$) + Định lý 10.29 cho $X$ rời rạc | L1508–1569 |
| 5 | KV12 | Chứng minh: kỳ vọng toàn phần | P7 | L1571–1623 |
| 5 | KV13 | Bài tập: tỉ lệ lỗi và phương sai của nhãn lỗi | Lời giải trên mặt trang; số của L1309–1316, L1625–1634 | L1309–1316; L1625–1636 |
| 6 | SL00 | 6. Phân phối đồng thời và phép lấy biên | Trang tiêu đề mạch (`id="mach-6"`) | §8 L1696; L1692 |
| 6 | SL01 | Ba biến của hệ thống sản phẩm | Nhu cầu + trực quan, hình `generation-chain.svg` | L1696; L1827 |
| 6 | SL02 | Phân phối đồng thời | Định nghĩa 10.31; "Lưu ý:" biên không xác định đồng thời | L1700–1728; L1782 |
| 6 | SL03 | Lấy biên | Mệnh đề 10.32, "Chứng minh." (phần rời rạc, P8) | L1728–1780 |
| 6 | SL04 | Phân phối có điều kiện từ phân phối đồng thời | Mệnh đề 10.33, "Chứng minh." một dòng | L1786–1823 |
| 6 | SL05 | Phân tích nhân tử và lấy biên trên biến chưa quan sát | Mệnh đề 10.34 | L1827–1854 |
| 6 | SL06 | Chứng minh: phân tích nhân tử | P9, bước 1–2 | L1856–1871 |
| 6 | SL07 | Chứng minh: lấy biên và chuẩn hóa | P9, bước 3–4 | L1873–1878; L1880 |
| 6 | SL08 | Thuật toán suy luận bằng lấy biên và chuẩn hóa | Thuật toán 10.35 | L1882–1895 |
| 6 | SL09 | Ví dụ: bảng đồng thời của hệ thống sản phẩm | Bảng 8 ô (lần duy nhất), $198/437$ | Ví dụ 10.12 L1897–1920 |
| 6 | SL10 | Ví dụ: hậu nghiệm của nguồn hàng | $236/437$, $18/67$, $36/59$, kiểm tra trộn | L1922–1964 |
| 6 | SL11 | Bài tập: hậu nghiệm khi không có cảnh báo | Lời giải trên mặt trang, $22/4563$ | L1988 (số của Tình huống 10.1); bảng L1902–1908 |
| 6 | SL12 | Quyết định theo hậu nghiệm và chi phí | Ứng dụng cuối mạch nội dung, hình `decision-threshold.svg` | Tình huống 10.1 L1972–1993 |
| 7 | TK00 | 7. Tổng kết và chuyển tiếp | Trang tiêu đề mạch (`id="mach-7"`) | L1966; L2021 |
| 7 | TK01 | Kết quả và giả thiết: suy luận xác suất | Bảng năm hàng (phần bù, hợp; quy tắc nhân; toàn phần, Bayes; lấy biên, không thêm giả thiết; phân tích nhân tử với $A\perp S\mid Y$, $p_A(a')>0$); ở màn hẹp xếp khối | L2021–2037 |
| 7 | TK01b | Kết quả và giả thiết: phân phối, kỳ vọng và quyết định | Bảng sáu hàng (mật độ; tuyến tính; phương sai; không tương quan; kỳ vọng toàn phần; quyết định); không có "Kết luận:" | L2021–2037 |
| 7 | TK02 | Bài tập: sản phẩm bị cảnh báo khi thiếu hồ sơ nguồn hàng | Bài tổng hợp, đề | §11 L2063–2069 |
| 7 | TK03 | Bài tập: sản phẩm bị cảnh báo khi thiếu hồ sơ nguồn hàng | Lời giải trên mặt trang (gồm $2/13$ của Tình huống 10.2) | L2071–2079; L1995–2013 |
| 7 | TK04 | Câu hỏi tự kiểm tra | Bốn câu (câu 4: hiệp phương sai bằng $0$ có kéo theo độc lập không), lời giải trong ghi chú diễn giả | L2031–2037 |
| 7 | TK05 | Tài liệu đọc và chuyển tiếp | Murphy theo §12; cầu nối Bài 11 bằng lời | L2081; L2083–2094 |

Số trang theo mạch: 5 + 11 + 12 + 14 + 15 + 13 + 7 = 77 (đích Q-H là 70 ± 6; vượt biên trên một trang, xem `review-log.md`, mục "Soạn HTML"). Khi dựng HTML, bảng tổng kết tám hàng cao gần gấp rưỡi khung 16:9 nên được `tách` thành TK01 và TK01b. Thứ tự dòng trong bảng là thứ tự trang; mã giữ nguyên khi đổi thứ tự (mạch 2: MH06 → MH09 → MH07 → MH08 → MH10; mạch 3: cây BY04 trước quy tắc nhân BY05). Cắt giảm Q-H đã áp dụng: gộp trang mật độ với định nghĩa (PP05). Cổng storyboard (2026-11-05) yêu cầu tách chứng minh của Mệnh đề 10.22 thành KV03 và KV03b. Nếu cần giảm tiếp: dồn TK04 vào ghi chú diễn giả của TK01; gộp BY07–BY08.

## Chứng minh trên mặt trang

Mỗi chứng minh dài có trang "Chứng minh: <kết quả>" riêng: dòng đầu nêu mục tiêu và ý tưởng (lộ trình của ghi chú), mỗi bước một quan hệ, cạnh mỗi bước ghi kết quả hay giả thiết được dùng; chi tiết khả tích và hội tụ tuyệt đối đặt trong ghi chú diễn giả (Q-C).

| Mã | Kết quả | Trang phát biểu → trang chứng minh | Các bước trên mặt trang | Chỗ dùng giả thiết | Ghi chú dòng |
|---|---|---|---|---|---|
| P1 | Mệnh đề 10.6 (phần bù, hợp) | MH07 → MH08 | (1) $E,E^c$ xung khắc, hợp $\Omega$ ⇒ $1=\mathbb P(E)+\mathbb P(E^c)$; (2) $E\cup F$ là hợp xung khắc của $E\setminus F$, $E\cap F$, $F\setminus E$; (3) viết $\mathbb P(E)$, $\mathbb P(F)$ theo cùng ba mảnh; (4) thế vào | Bổ đề 10.4 phần 2 (cộng tính hữu hạn, MH05); (P2); ba mảnh thuộc $\mathcal F$ (ghi chú diễn giả) | L324–343 |
| P2 | Định lý 10.11 | BY06 → BY07 (toàn phần), BY08 (Bayes) | BY07: $E=\bigcup_j(E\cap B_j)$ xung khắc; cộng tính; quy tắc nhân. BY08: định nghĩa có điều kiện; quy tắc nhân; thế (5.3) vào mẫu số | Phân hoạch; $\mathbb P(B_j)>0$; $\mathbb P(E)>0$; Bổ đề 10.4 phần 2; Mệnh đề 10.10 | L561–587 |
| — | Mệnh đề 10.10 (quy tắc nhân) | BY05, dòng "Chứng minh." (sau cây BY04) | Nhân hai vế của định nghĩa xác suất có điều kiện với mẫu số; áp dụng hai lần cho ba biến cố | $\mathbb P(F)>0$; $\mathbb P(E\cap F)>0$ | L516–534 |
| P3 | Mệnh đề 10.22, kỳ vọng của hàm (rời rạc) | KV02 → KV03 | Phân phối của $g(X)$ bằng cộng tính đếm được; nhóm các $x$ cùng ảnh $u=g(x)$: $\mathbb E[g(X)]=\sum_uu\,\mathbb P(g(X)=u)=\sum_xg(x)p_X(x)$ | Hội tụ tuyệt đối cho phép gom nhóm; trường hợp mật độ (Phụ lục B.1) chỉ trong ghi chú diễn giả | L1133–1162 |
| P4 | Mệnh đề 10.22, tính tuyến tính (rời rạc) | KV02 → KV03b | Kỳ vọng của hàm cho cặp $(X,Z)$; tổng theo một biến $\sum_z\mathbb P(X=x,Z=z)=p_X(x)$; tách tổng | $X,Z$ khả tích; không cần độc lập | L1164–1199 |
| P5 | Mệnh đề 10.24 | KV05 → KV06 | Khai triển $(x-\mu)^2$; tuyến tính; $\mathbb E[X]=\mu$; không âm; biến đổi affine | $\mathbb E[X^2]<\infty$ | L1276–1307 |
| P6 | Mệnh đề 10.27 | KV08 → KV09; phản ví dụ KV10 | $\mathbb E[XZ]=\sum xz\,p_{X,Z}$; độc lập tách PMF; tách chuỗi kép thành tích; $\operatorname{Cov}=0$ | $X\perp Z$ (Định nghĩa 10.16); mômen bậc hai hữu hạn; rời rạc | L1437–1504 |
| P7 | Định lý 10.29 | KV11 → KV12 | Phân hoạch $\{X=x\}$ theo $S$; quy tắc nhân; đổi thứ tự tổng; nhận ra $\sum_s\psi(s)\mathbb P(S=s)=\mathbb E[\psi(S)]$ | $X$ khả tích (đổi thứ tự tổng); $\mathbb P(S=s)>0$; các $s$ xác suất $0$ góp $0$ | L1571–1623 |
| P8 | Mệnh đề 10.32 (phần rời rạc) | SL03, dòng "Chứng minh." | $\{X=x\}=\bigcup_z\{X=x,Z=z\}$ xung khắc; (P3) | Cộng tính đếm được; phần mật độ (Fubini–Tonelli) chỉ trong ghi chú diễn giả | L1756–1776 |
| — | Mệnh đề 10.33 | SL04, dòng "Chứng minh." | Định nghĩa 10.9 với $\{X=x\},\{Z=z\}$; cộng theo $x$ dùng (8.3) | $p_Z(z)>0$ | L1811–1819 |
| P9 | Mệnh đề 10.34 (kết quả trung tâm) | SL05 → SL06 (nhân tử), SL07 (lấy biên, chuẩn hóa) | SL06: quy tắc chuỗi cho $(S,Y,A)$; Mệnh đề 10.17 bỏ điều kiện $S$; trường hợp $p_{S,Y}=0$. SL07: lấy biên theo $s$; lấy biên theo $y$; chuẩn hóa bằng Mệnh đề 10.33 | $A\perp S\mid Y$ (bước bỏ $S$); $p_S(s)>0$, $p_Y(y)>0$; Bổ đề 10.4 phần 3 cho các ô xác suất $0$ | L1856–1878 |
| — | Mệnh đề 10.17 (P9 dùng) | PP12, dòng "Chứng minh." | Viết mọi xác suất có điều kiện thành tỉ số; trường hợp $\mathbb P(V=v,W=w)=0$ hai vế bằng $0$ | $p_W(w)>0$ | L938–973 |
| — | Bổ đề 10.4 (P1 dùng) | MH05, dòng "Chứng minh." | Bổ sung dãy bằng tập rỗng rồi áp dụng (P3) | (P2), (P3) | L231–258 |

P8 (Mệnh đề 10.32, phần rời rạc) chỉ có một quan hệ (cộng tính đếm được trên phân hoạch $\{Z=z\}$), nên nằm ở dòng "Chứng minh." của SL03 theo quy tắc "chứng minh một đến hai dòng" của AGENTS.md; điều phối viên đã quyết định như vậy sau cổng storyboard (2026-11-05).

## Ví dụ xuyên suốt và câu hỏi của mỗi lần dùng lại

**Camera giao thông** (bảng $0{,}18/0{,}02/0{,}08/0{,}72$, L372–423).

| Trang | Câu hỏi mới | Dữ kiện nêu lại trên trang |
|---|---|---|
| MH01 | Các kết quả có thể của một khung hình là gì | Bốn tổ hợp tình trạng × phản hồi |
| MH02 | Phát biểu "cảnh báo sai", "bỏ sót" thành tập nào | Lưới 2×2 |
| MH09 | $\mathbb P(H\cup C)$ tính trực tiếp bằng bao nhiêu và vì sao khác $\mathbb P(H)+\mathbb P(C)$; xác suất phản hồi sai | Bảng đầy đủ (lần duy nhất) |
| MH07 | Ô chung bị đếm hai lần ($0{,}46$ so với $0{,}28$) | $0{,}46$, $0{,}28$ |
| BY01 | Trong các khung hình có cảnh báo, tỉ lệ có người bằng bao nhiêu | $0{,}18$, $0{,}08$, $\mathbb P(C)=0{,}26$ |
| BY03 | $\mathbb P(H\mid C)$ và $\mathbb P(C\mid H)$ có bằng nhau không | $\mathbb P(H\cap C)=0{,}18$, $\mathbb P(H)=0{,}20$, $\mathbb P(C)=0{,}26$, $\mathbb P(H^c\cap C)=0{,}08$ |
| BY11 | (bảng khác, tuyến đường vắng) Phép đảo điều kiện cho $1/3$ thay vì $0{,}90$ | Bảng của Bài tập 10.1 |
| PP09 (ghi chú diễn giả) | $H$ và $C$ có độc lập không ($0{,}052\ne0{,}18$) | Ví dụ 10.5, chỉ trong ghi chú |

**Hệ thống sản phẩm hai nhà cung cấp** (tham số (5.6)).

| Trang | Câu hỏi mới | Dữ kiện nêu lại trên trang |
|---|---|---|
| MD03 | Xác suất lỗi của sản phẩm bị cảnh báo, thiếu nguồn hàng | Toàn bộ tham số bằng phần trăm |
| MH10 | Bảng giai đoạn 1: xác suất lỗi, cảnh báo, phản hồi sai (cộng hai ô và phần bù) | Bảng bốn ô (lần duy nhất) |
| BY04 | Dữ kiện là tỉ lệ trong nhóm: xác suất lỗi trước quan sát $\mathbb P(Y=1)=0{,}044$, trung bình có trọng số của hai tỉ lệ lỗi | Cây $0{,}6/0{,}4$, $0{,}02/0{,}08$ |
| BY05 | Tích dọc mỗi đường của cây là quy tắc nhân | (phát biểu tổng quát) |
| BY10 | Hậu nghiệm sau cảnh báo, khi biết hoặc không cần biết nguồn hàng | $0{,}044$, độ nhạy $0{,}9$, tỉ lệ cảnh báo nhầm $0{,}05$ |
| PP01–PP02 | $S,Y,A$ là ba hàm của cùng một kết quả | Tên ba biến |
| PP07 | $Y\sim\operatorname{Bernoulli}(0{,}044)$; khi biết $S=a$ là $\operatorname{Bernoulli}(0{,}02)$ | $0{,}044$, $0{,}02$ |
| PP10 | Đọc giả thiết (5.7) thành $A\perp S\mid Y$ | (5.7) |
| PP11 | Cảnh báo có độc lập với nguồn hàng không ($0{,}067$ khác $0{,}118$) | (5.6) |
| KV01 | Trung bình của $Y$ | $\mathbb P(Y=1)=0{,}044$ |
| KV04 | Chi phí kỳ vọng của quy tắc cảnh báo | $0{,}044$, $0{,}1$, $0{,}05$, chi phí $5$ và $1$ |
| KV10 | Hai biến của dây chuyền không tương quan nhưng phụ thuộc | PMF của độ lệch; $\mathbb P(Y=1)=0{,}044$ |
| KV13 | $\mathbb E[Y]$ qua kỳ vọng toàn phần; $\operatorname{Var}(Y)$ | $0{,}6/0{,}4$, $0{,}02/0{,}08$ |
| SL01 | Thiếu $S$: cần mô hình của cả $(S,Y,A)$ | Chuỗi sinh dữ liệu |
| SL09 | Hậu nghiệm lỗi bằng lấy biên trên bảng 8 ô | Bảng 8 ô (lần duy nhất) |
| SL10 | Hậu nghiệm của nguồn hàng; trộn theo hậu nghiệm | Sáu ô của cột $A=1$, tổng $0{,}0874$ |
| SL11 | Hậu nghiệm khi không có cảnh báo | Hai ô $Y=1$ của cột $A=0$, tổng $0{,}9126$ |
| SL12 | Chấp nhận hay loại, với chi phí $5$ và $1$; hậu nghiệm ký hiệu $r$ | $198/437$, $22/4563$ |
| TK02–TK03 | Tổng hợp; vì sao trọng số của $b$ khác $0{,}4$; tiên nghiệm đổi thành $0{,}01$ | Tham số của bài toán, $0{,}01$ |

## Hình SVG (thư mục `2627-1/img/lec-10/`)

| Tệp | Trang | Nội dung | Ghi chú |
|---|---|---|---|
| `camera-event-grid.svg` (mới) | MH02 | Lưới 2×2: hàng $H$, $H^c$; cột $C$, $C^c$; ô "cảnh báo sai" và "bỏ sót" có nhãn chữ và mẫu nền khác nhau | Không ghi số trọng số (số xuất hiện ở MH09) |
| `camera-conditioning.svg` (mới) | BY01 | Cùng lưới, cột $C$ được giữ, cột $C^c$ làm mờ; hai ô $0{,}18$, $0{,}08$ chia cho tổng $0{,}26$ | Kết quả $9/13$ để trang BY03 tính |
| `supplier-tree-deck.svg` (mới, rà soát v1) | BY04 | Cây nguồn hàng → lỗi, lá $0{,}012$, $0{,}588$, $0{,}032$, $0{,}368$; không tiêu đề, phụ đề hay công thức trong hình | Thay `supplier-probability-tree.svg` (giữ nguyên cho ghi chú bài giảng L683) vì chữ của hình đó quá nhỏ trên trang chiếu |
| `cdf-three-levels.svg` (mới) | PP04 | CDF bậc thang $0\to0{,}70\to0{,}90\to1$ tại $0,1,2$, chấm đặc/rỗng chỉ liên tục phải | |
| `density-area.svg` (mới) | PP05 | Mật độ đều cao $10$ trên $[0;\,0{,}1]$; diện tích tô bằng $1$; một khoảng con độ rộng $\delta$ | |
| `generation-chain.svg` (mới) | SL01 | Ba nút nhà cung cấp $S$ → tình trạng $Y$ → cảm biến $A$, mũi tên ghi nhân tử $p_S$, $p_{Y\mid S}$, $p_{A\mid Y}$; nút $S$ nét đứt (chưa quan sát), nút $A$ tô đậm (đã quan sát); nhãn $p_S(s)$, $p_{Y\mid S}(y\mid s)$, $p_{A\mid Y}(a'\mid y)$ có chỉ số | Không gọi là "mạng Bayes" hay "đồ thị" trên mặt trang (Q-D) |
| `generation-chain-narrow.svg` (mới, đợt 2) | SL01 | Cùng chuỗi, ba khối xếp dọc, chỉ hiện ở màn hẹp (`img.only-narrow`) | chữ khoảng 22 px ở 390 px |
| `uncorrelated-dependent.svg` (mới) | KV10 | Năm giá trị độ lệch $-2,\dots,2$, cột cao theo PMF; hai cột $\pm2$ đánh dấu "lỗi" bằng chữ và mẫu nền | |
| `decision-threshold.svg` (mới) | SL12 | Trục hoành $r=\mathbb P(Y=1\mid A=a')$ trên $[0;\,0{,}6]$; hai đường $5r$ (chấp nhận) và $1-r$ (loại), cắt tại $r=1/6$; miền "chấp nhận, $r<1/6$" và "loại, $r>1/6$" dưới trục; đánh dấu $r\approx0{,}453$ và $r\approx0{,}0048$ | |

Mỗi hình có `role="img"`, `<title>`, `<desc>`, `alt` cụ thể; nhãn chữ trong hình bằng tiếng Việt; màu không là tín hiệu duy nhất. Không có ảnh raster. Sau rà soát v1, mọi hình được vẽ lại với viewBox khoảng 420–520 đơn vị và chữ 18–21 đơn vị: chữ hiển thị 26–34 px ở 1600×900 (đo bằng Playwright), 13–19 px ở 390×844 (chỉ số dưới của nhãn SL01 nhỏ hơn); tiêu đề, phụ đề và chú giải lặp mặt trang được bỏ khỏi hình.

## Nội dung chỉ trong ghi chú diễn giả hoặc lược (Q-D)

- Ví dụ 10.1 (đồng xu), Ví dụ 10.5 (độc lập trên bảng camera), Ví dụ 10.6 phần 2, Ví dụ 10.9: ghi chú diễn giả của MH03, PP09, PP11, KV05.
- Hệ quả 10.7 (bất đẳng thức hợp), Nhận xét 10.8: ghi chú diễn giả của MH07, MH09.
- Ví dụ hai biến $\operatorname{Bernoulli}(1/2)$ cùng biên (L1782): ghi chú diễn giả của SL02.
- Số tham số $7$ so với $5$ (L1880): ghi chú diễn giả của SL05.
- Trường hợp có mật độ có điều kiện của Định lý 10.29 (L1555): ghi chú diễn giả của KV11.
- Mệnh đề 10.26: trường hợp $n=2$ lên mặt trang ở "Mệnh đề." của KV07 (kèm "Chứng minh." một dòng); dạng tổng quát và $\operatorname{Var}(N)=n\theta(1-\theta)$ ở ghi chú diễn giả KV07, KV08; ví dụ $\operatorname{Cov}(\mathbf 1_H,\mathbf 1_C)=0{,}128$ ở ghi chú diễn giả KV07.
- Ứng dụng của công thức hợp (4.9) trên bảng camera ($0{,}20+0{,}26-0{,}18=0{,}28$): ghi chú diễn giả MH07; bài tự học 10.5.
- Phân rã phương sai (Mệnh đề 10.30, Ví dụ 10.11, Phụ lục A), Phụ lục B, Phụ lục C: chỉ dẫn số hiệu trong ghi chú diễn giả.
- Markov, Chebyshev, luật số lớn (05c): ghi chú diễn giả của KV01 nếu cần.
- Gaussian nhiều chiều: chỉ ở ghi chú diễn giả PP08 (mật độ, $\mu\in\mathbb R^d$, $\Sigma\in\mathbb R^{d\times d}$ đối xứng xác định dương, $\Sigma$ là ma trận hiệp phương sai); ma trận hiệp phương sai đường chéo của đặc trưng độc lập ở ghi chú diễn giả KV08 (rà soát v1).
- Không có MLE, "mạng Bayes", "đồ thị" trên mặt trang; cầu nối Bài 11 nói bằng lời ở TK05.

## Phụ lục: kế hoạch ghi chú bài giảng (2026-11-02)

Nội dung dưới đây là `outline.md` của kế hoạch ghi chú, giữ nguyên văn; chỉ hạ cấp tiêu đề hai bậc. Tệp `review-log.md` được nhắc trong phụ lục nay là `review-log-lecture-note.md`.

### Kế hoạch ghi chú Bài 10

#### Phạm vi và ủy quyền

Người dùng yêu cầu viết tiếp Bài 10 theo kế hoạch năm bài 10–14, chỉ tạo ghi chú Markdown, không tạo hoặc sửa slide. Người dùng xác nhận “Dùng Codex toàn bộ”, thay yêu cầu mô hình Claude của AGENTS.md cho nhiệm vụ này; sau đó nhấn mạnh dùng textbook Murphy. Giữ Mục 1 hiện có, chỉ cập nhật lời nối cần thiết; viết Mục 2–5 và phần cuối chương. Không triển khai Bài 11–14.

#### Nguồn

- Chính: Kevin P. Murphy (2022), Probabilistic Machine Learning: An Introduction, §§2.2–2.6, §3.1 và phần giới thiệu §3.2.1. Nguồn trang sách chính thức và mục lục được kiểm tra ngày 2026-11-02.
- Ví dụ khởi đầu: sources/part2/lecture_notes.pdf, Week 1A–1E, trang in 3–8. Không kế thừa phân bổ thời gian khác với kế hoạch mới của người dùng.
- Bài tập: sources/part2/homework.pdf, W1.1–W1.4, trang in 1. Dùng bài W1.2–W1.4 làm nền cho E10.1–E10.3, thêm E10.4 tự biên soạn; không gán số bài của Murphy.
- Đề cương: sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx, CLO2; không bịa mã LLO cho kế hoạch mới.
- Liên hệ: Bài05c (điều kiện, Bayes, mômen đã có, trọng tâm concentration), Bài03–06 (tối ưu hàm mục tiêu); chỉ phát biểu lại kiến thức cần thiết và phát triển hướng suy luận.

#### Mạch và thời gian

1. Không gian mẫu và tiên đề: 15 phút, giữ camera hiện có.
2. Điều kiện, độc lập, Bayes: 30 phút; chuyển sang kiểm định sản phẩm, tiền nghiệm → quan sát → hậu nghiệm.
3. Biến ngẫu nhiên, PMF/CDF/PDF, Bernoulli/phân loại/Gaussian: 25 phút.
4. Kỳ vọng, phương sai, hiệp phương sai, kỳ vọng toàn phần: 25 phút.
5. Phân phối đồng thời, lấy biên, suy luận khi thiếu nhà cung cấp: 25 phút.

Bài tập trên lớp: 3 × 10 phút. Tự học: 4 bài, 40+40+50+50=180 phút; đọc thêm khoảng 120 phút. Lời giải tự học đặt cuối cùng trong cùng tệp. Các khối ::: không lồng nhau.

#### Cấu trúc sau rà soát theo mẫu statistical-learning-theory (2026-11-04)

Ghi chú được tái cấu trúc theo Q1 của `planning/notes-10-14-slt-template.md`; bài tập chuyển sang `materials/lec-10/exercises.md`. Thời lượng ở trên chỉ là kế hoạch giảng, không xuất hiện trong văn bản sinh viên đọc. Các mục của ghi chú hiện tại:

- Câu hỏi mở đầu
- Mục tiêu học tập
- Kiến thức tiên quyết
- 1. Thiết lập bài toán
- 2. Ký hiệu và giả thiết
- 3. Ví dụ xuyên suốt
- 4. Thí nghiệm ngẫu nhiên, biến cố và mô hình xác suất
- 5. Xác suất có điều kiện, độc lập và định lý Bayes
- 6. Biến ngẫu nhiên và phân phối xác suất
- 7. Kỳ vọng, phương sai và hàm của biến ngẫu nhiên
- 8. Phân phối đồng thời, lấy biên và suy luận
- 9. Ý nghĩa, tác động và giới hạn
- 10. Bài tập
- 11. Câu hỏi cuối buổi và cầu nối
- 12. Tài liệu đọc
- Phụ lục

Tệp bài tập:

- Bài tập 10.1 (Đọc điều kiện trên bảng camera)
- Bài tập 10.2 (Mật độ đều và xác suất trên khoảng)
- Bài tập 10.3 (Độc lập trước và sau khi quan sát)
- Bài tập 10.4 (Không gian mẫu đều với hai xúc xắc)
- Bài tập 10.5 (Xác suất lỗi của camera dưới quy trình lấy mẫu khác)
- Bài tập 10.6 (Bayes trong kiểm định sản phẩm)
- Bài tập 10.7 (Phân phối rời rạc ba giá trị)
- Bài tập 10.8 (Phân phối đồng thời và lấy biên)
- Bài tập 10.9 (Hiệp phương sai bằng không nhưng phụ thuộc)
- Bài tập 10.10 (Murphy (2022), Bài tập 2.9: chẩn đoán bệnh hiếm)
- Bài tập 10.11 (Murphy (2022), Bài tập 3.1: không tương quan với biến liên tục)
- Bài tập 10.12 (Murphy (2022), Bài tập 3.2: hệ số tương quan thuộc $[-1,1]$)

Ánh xạ số hiệu cũ → mới: xem `review-log.md`, mục "Ánh xạ số hiệu cũ → mới".
