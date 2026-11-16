# Storyboard bộ trang chiếu Bài 13 — Ra quyết định tuần tự dưới điều kiện bất định

Storyboard này thay bản đồ mạch cũ của ghi chú (chuyển nguyên văn xuống cuối tệp, mục "Phụ lục: bản đồ mạch của ghi chú"). Quy định áp dụng: NT1–NT28 trong `tools/courses/math-4-AI/2627-1/deck-build/common-brief.md`. Nguồn nội dung duy nhất: `materials/lec-13/lecture-note.md` (gọi tắt "ghi chú", dẫn số dòng dạng "d.N") và `materials/lec-13/exercises.md` (dẫn "bt d.N"). Thời lượng chỉ ghi ở storyboard, không lên mặt trang hay ghi chú diễn giả.

## 1. Tệp deck và tiêu đề

- **Tệp:** `2627-1/lecture-13-quyet-dinh-tuan-tu-bat-dinh.html` (slug ASCII rút từ "Ra quyết định tuần tự dưới điều kiện bất định"; chưa có tệp, chỉ mục hay liên kết nào dùng tên khác: `grep lecture-13` trong `index.html`, `material-viewer.js`, `planning/` cho 0 kết quả).
- **Tiêu đề deck (`h1`, `<title>`):** "Ra quyết định tuần tự dưới điều kiện bất định"; `<title>` dạng deck 11: "Bài 13: Ra quyết định tuần tự dưới điều kiện bất định".
- **Phụ đề (`h3`):** "Xích Markov, quá trình quyết định Markov và lặp giá trị · Bài 13".
- `<html lang="vi" data-lecture="13">`; chân trang "Cơ sở toán học cho AI · Học kỳ 1, 2026–2027 · Bài 13".
- **Số trang:** 60 sau biên tập (xem mục "Biên tập sau năm báo cáo duyệt"); bản viết đầu 57 (7 mạch), ≈ 120 phút; vượt khoảng 45–55 hai trang, dưới trần 60 (NT27; lý do ở §12, điểm 1); 30 phút còn lại của buổi 150 phút dành cho bài tập.

## 2. Khung lý thuyết chung

- **Câu hỏi trung tâm** (đúng câu in đậm của ghi chú, d.11), dùng cho hộp "Vấn đề trung tâm" L13-1-05: "Khi một hành động ảnh hưởng đến các trạng thái và phần thưởng trong tương lai, làm thế nào tìm chính sách tối ưu?"
- **Luận điểm bìa (một câu, có điều kiện):** "Với quá trình quyết định Markov hữu hạn có mô hình đã biết và hệ số chiết khấu nhỏ hơn một, lặp giá trị hội tụ tới giá trị tối ưu duy nhất, và chính sách tham lam theo giá trị đó tối ưu trong mọi chính sách." (Cơ sở: Hệ quả 13.18, Định lý 13.19, d.1016–1068; điều kiện mô hình đúng, d.1110.)
- **Đối tượng và ký hiệu chung** (bảng §2 của ghi chú, d.80–107): tập trạng thái hữu hạn $\mathcal S$; tập hành động $\mathcal A(s)$; mô hình chuyển $p(s',c\mid s,a)$, xác suất chuyển $P(s'\mid s,a)$, phần thưởng kỳ vọng $r(s,a)$ (5.2); hệ số chiết khấu $\gamma$; chính sách tổng quát $\rho$, chính sách Markov dừng $\pi$; $P^\pi$, $r^\pi$ (5.3); tổng thưởng $G_t$ (5.4); hàm giá trị $V^\rho$, giá trị tối ưu $V^*$ (5.5); giá trị nhìn trước $Q_U$ (5.7); toán tử $T^\pi$ (5.8), $T$ (6.1); chính sách tham lam $\pi_U$ (6.2); điểm bất động $\bar V$; phần dư Bellman $\beta(V)$; số đếm $N(s,a,s')$, $N(s,a)$; mô hình ước lượng $\hat P$, $\hat r$; bảng $Q_t$; mục tiêu $Y_t$ (7.5). Hai ví dụ xuyên suốt: robot $h/z$ với hai hành động $A$, $B$ (Ví dụ 13.1) và robot hoạt động/nghỉ $h/n$ (Ví dụ 13.2–13.3, Bài tập 13.1). Trạng thái nghỉ viết $n$, số lần thử viết $m$ (d.41).
- **Giả thiết** (nhãn của ghi chú, d.111–121): (M1) Markov có điều khiển, thuần nhất; (M2) phần thưởng hữu hạn giá trị trong $[-R_{\max},R_{\max}]$; (M3) các lần thử tại một cặp $(s,a)$ độc lập cùng phân phối; (O1) $\mathcal S$, $\mathcal A(s)$ hữu hạn, khác rỗng; (O2) $0\le\gamma<1$; (O3) kỳ vọng và cực đại trong các phép lặp Bellman tính đúng theo mô hình đang dùng.
- **Chuỗi định nghĩa → kết quả → phương pháp:** tính Markov, ma trận chuyển (Định nghĩa 13.1) → truyền phân phối, xác suất quỹ đạo (Mệnh đề 13.2, Hệ quả 13.3) → MDP, chính sách, tổng thưởng chiết khấu, hàm giá trị (Định nghĩa 13.5–13.7), chặn giá trị (Mệnh đề 13.8) → giá trị nhìn trước, $T^\pi$ (Định nghĩa 13.9) → so sánh theo từng bước (Bổ đề 13.10–13.11) → Bellman cho chính sách dừng (Định lý 13.12) → $T$, chính sách tham lam (Định nghĩa 13.13) → ánh xạ co (Định nghĩa 13.14), tính co của $T$, $T^\pi$ (Bổ đề 13.15, Mệnh đề 13.16) → điểm bất động (Định lý 13.17) → hội tụ lặp giá trị (Hệ quả 13.18) → Bellman tối ưu, chính sách tham lam tối ưu (Định lý 13.19) → chặn phần dư, chặn chính sách tham lam, lặp giá trị có chứng nhận (Hệ quả 13.21, Mệnh đề 13.22, Thuật toán 13.23) → số đếm và MLE một hàng (Định nghĩa 13.25, Hệ quả 13.26) → học dựa trên mô hình, mục tiêu Bellman từ mẫu (Định nghĩa 13.27–13.28).
- **Giới hạn áp dụng** (d.1110, d.1325–1341, d.1498–1503, d.1540): mô hình $P,r$ đúng; trạng thái thỏa tính Markov (5.1); $\gamma<1$. Với mô hình ước lượng, mọi bảo đảm thuộc về MDP ước lượng; phần dư Bellman nhỏ không chứng nhận mô hình đúng; hội tụ Q-learning dạng bảng cần thêm giả thiết (Murphy (2023), §35.2.5); trạng thái hấp thụ không thay được $\gamma<1$.

## 3. Bảng mạch

Dòng dẫn đếm bằng token cách nhau bởi khoảng trắng (script ở §6.8). Mỗi dòng dẫn dùng một khuôn câu khác nhau.

| Số | Tên mạch | Mục ghi chú | Câu hỏi của mạch (phân rã) | Chức năng | Đầu vào | Đầu ra | Dòng dẫn `strand-lead` (âm tiết) | Từ khóa | Phút | ID trang tiêu đề |
|---|---|---|---|---|---|---|---|---|---:|---|
| 1 | Mở đầu | Câu hỏi mở đầu, Mục tiêu, Kiến thức tiên quyết, §1–§3 (d.1–145) | Câu hỏi trung tâm của bài | Nêu vấn đề, nhắc tiên quyết, giới thiệu robot $h/z$ | Bài 07 (Định lý 07.49), Bài 10–12 | Câu hỏi mở đầu: so phần thưởng một bước chọn sai | (bìa, không dòng dẫn) | — | 8 | L13-1-01 (`id="mach-1"`) |
| 2 | Xích Markov và phân phối trạng thái | §4 (d.147–365) | Khi bước sau chỉ phụ thuộc trạng thái hiện tại, tính phân phối trạng thái sau $t$ bước thế nào? (phân phối bước sau = tổng theo trạng thái hiện tại; quỹ đạo = tích xác suất chuyển) | Mô hình chuyển ngẫu nhiên không có hành động | xác suất toàn phần, quy tắc nhân (Bài 10) | $\mu_t=\mu_0P^t$, (4.4); Markov khác độc lập | "Khi bước sau chỉ phụ thuộc trạng thái hiện tại, phân phối trạng thái được truyền bằng phép nhân ma trận." (21) | Tính Markov · Ma trận chuyển · Phân phối sau nhiều bước · Xác suất quỹ đạo | 12 | L13-2-00 |
| 3 | Quá trình quyết định Markov và giá trị của chính sách | §5 (d.367–796) | Đo và tính giá trị của một cách chọn hành động cố định thế nào? (giá trị = thưởng một bước + $\gamma$ × giá trị kỳ vọng kế tiếp) | Thêm hành động, phần thưởng, tiêu chuẩn chiết khấu; đánh giá chính sách dừng | xích Markov, $\mu_t$, (4.4) | $V^\pi=(I-\gamma P^\pi)^{-1}r^\pi$; Bổ đề 13.11; ba giá trị của robot | "Giá trị của một cách chọn hành động cố định là nghiệm của một hệ phương trình tuyến tính." (19) | Quá trình quyết định Markov · Chính sách · Tổng thưởng chiết khấu · Hàm giá trị · Phương trình Bellman | 26 | L13-3-00 |
| 4 | Toán tử Bellman tối ưu và ánh xạ co | §6.1–6.2 (d.798–1041) | Phương trình $U=TU$ có nghiệm duy nhất không và tìm nghiệm bằng cách nào? (tồn tại, duy nhất, hội tụ của phép lặp) | Đưa phép chọn hành động vào một toán tử; chứng minh tính co và hội tụ lặp giá trị | $Q_U$, $T^\pi$, Định lý 13.12 | $\bar V$ duy nhất; (6.7); nguyên lý ánh xạ co | "Lặp phép chọn hành động tốt nhất một bước hội tụ, vì mỗi lần lặp thu hẹp sai số theo hệ số chiết khấu." (24) | Toán tử Bellman tối ưu · Chính sách tham lam · Ánh xạ co · Điểm bất động · Lặp giá trị | 20 | L13-4-00 |
| 5 | Giá trị tối ưu và chứng nhận sai số | §6.3–6.5 (d.1043–1343) | Chính sách tham lam theo điểm bất động, hoặc theo vector lặp sau hữu hạn vòng, tốt đến mức nào? (đạt $\bar V$; không chính sách nào vượt $\bar V$; mất mát khi dừng sớm; điều gì hỏng khi $\gamma=1$) | Nối điểm bất động với $V^*$; trả lời câu hỏi mở đầu; tiêu chuẩn dừng; phản ví dụ khi bỏ $\gamma<1$ | $\bar V$, (6.7), Bổ đề 13.11 | Định lý 13.19; $V^*(h)=6$, chọn $B$; Thuật toán 13.23 | "Chính sách tham lam theo điểm bất động là tối ưu; dừng sớm vẫn cho chính sách có mất mát bị chặn." (22) | Giá trị tối ưu · Phương trình Bellman tối ưu · Phần dư Bellman · Tiêu chuẩn dừng · Hệ số chiết khấu bằng một | 21,5 | L13-5-00 |
| 6 | Học từ trải nghiệm | §7–§8 (d.1345–1603) | Khi chưa biết $P$, $r$, dữ liệu tương tác thay mô hình được đến đâu? (ước lượng hàng chuyển; mục tiêu từ mẫu; hai giả thiết bị vi phạm) | Ước lượng từ số đếm, mục tiêu Bellman từ mẫu, hai tình huống | Thuật toán 13.23, Định lý 13.19, Định lý 11.7 | Bảo đảm chỉ thuộc mô hình đang dùng; trạng thái đủ thông tin | "Số đếm ước lượng mô hình chưa biết; mọi bảo đảm của quy hoạch chỉ thuộc về mô hình ước lượng." (21) | Số đếm · Ước lượng hợp lý cực đại · Thăm dò · Mục tiêu Bellman từ mẫu · Trạng thái đủ thông tin | 18 | L13-6-00 |
| 7 | Tổng kết | §8 (d.1584–1603), §9–§11 (d.1605–1649) | Không khái niệm mới | Bảng tổng kết, câu trả lời cho câu hỏi trung tâm, bài tập tổng hợp, tự kiểm tra, bài tập về nhà, tài liệu | Toàn bộ mạch 2–6 | Cầu nối sang Bài 14 | "Phương trình Bellman tối ưu thay việc so sánh mọi chính sách bằng một phép lặp có chứng nhận sai số." (21) | — | 14 | L13-7-00 |

Tổng: 8 + 12 + 26 + 20 + 22 + 18 + 14 = 120 phút. "Nội dung" (L13-1-04) liên kết `#/1` … `#/7`.

## 4. Bảng kết quả chính

**Kết quả chính** (trang phát biểu riêng và trang "Ý tưởng chứng minh" riêng theo NT6): Bổ đề 13.11, Định lý 13.12, Mệnh đề 13.16, Định lý 13.17, Định lý 13.19. Ba kết quả cuối là ba chứng minh trọng tâm của Bài 13 theo Q4 (`notes-10-14-slt-template.md`); Bổ đề 13.11 và Định lý 13.12 là chỗ hai chiều của Định lý 13.19 lấy lập luận.

**Kết quả phụ** (phát biểu trên mặt trang kèm một dòng "Chứng minh." hoặc lý do trong ghi chú diễn giả, không trang ý tưởng riêng): Mệnh đề 13.2 và Hệ quả 13.3 (xác suất toàn phần, quy tắc nhân và quy nạp, mỗi bước một dòng); Mệnh đề 13.8 (một phép so sánh với cấp số nhân); Bổ đề 13.10 (kỳ vọng toàn phần theo hành động, dùng ngay trong Bổ đề 13.11); Bổ đề 13.15 (đi cùng Mệnh đề 13.16); Hệ quả 13.18 (áp dụng Định lý 13.17); Hệ quả 13.21 và Mệnh đề 13.22 (một dòng "Nhắc lại:" chèn một đại lượng trung gian rồi chuyển vế); Hệ quả 13.26 (Định lý 11.7 cho một hàng). Nhận xét 13.20 vào ghi chú diễn giả L13-5-01 (mục 2 của nhận xét là *đọc thêm*). Nhận xét 13.29 vào ghi chú diễn giả L13-6-05, L13-6-06. Phụ lục A vào ghi chú diễn giả L13-6-02.

| Kết quả | (a) Trực quan dự kiến | (b) Ý tưởng chứng minh: bước, mẹo then chốt, giả thiết, bỏ giả thiết | (c) Kỹ thuật (lần đầu / nhắc lại) | (d) Ví dụ bổ trợ | (e) Ứng dụng trong AI |
|---|---|---|---|---|---|
| Mệnh đề 13.2, Hệ quả 13.3 (d.189–263) | Xác suất đến một trạng thái ở bước sau là tổng xác suất đi qua từng trạng thái hiện tại; cây hai bước của robot $h/n$ | Phân hoạch $\{S_t=i\}$ + xác suất toàn phần → $\mu_{t+1}=\mu_tP$ (thuần nhất vào ở đây); chuẩn hóa; quy nạp. Hệ quả: quy tắc nhân + (4.1). Bỏ thuần nhất: $\mu_t=\mu_0P_0\cdots P_{t-1}$ (Nhận xét 13.4) | Xác suất toàn phần, quy tắc nhân: nhắc lại (deck 10, MD01; deck 00, D04). Quy nạp: nhắc lại (deck 05b, C02) | Ví dụ 13.2 ($\mu_2=(0{,}71;\,0{,}29)$, cây đường đi); Ví dụ 13.3 | (4.4) là hợp lý của chuỗi trạng thái quan sát được (d.262) |
| Mệnh đề 13.8 (d.488–526) | Phần thưởng sau $t$ bước nhân $\gamma^t$; tổng không chiết khấu của robot luôn chọn $B$ bằng $+\infty$ | So với cấp số nhân $R_{\max}\sum\gamma^j$ (M2, O2); phần đuôi cùng phép so sánh; lấy kỳ vọng biến bị chặn | Tổng cấp số nhân: nhắc lại (deck 04, RG17; 05b, A03) | Bài tập 13.4 ($G_1=70$, $G_0=65$, chặn $70$ đạt dấu bằng) | Cắt quỹ đạo sau $K$ bước sai không quá $\gamma^KR_{\max}/(1-\gamma)$ (d.525) |
| Bổ đề 13.11 (d.622–708) | Nếu mỗi bước không làm tăng $U$ theo kỳ vọng thì cả chuỗi vô hạn bước không vượt $U$ | 1. $D_t$; Bổ đề 13.10 + (5.11) cho $\mathbb E[D_t\mid H_t=\tau]\le0$ (M1 qua (5.1)). 2. Kỳ vọng toàn phần theo $H_t$ (M2, O1: $H_t$ rời rạc hữu hạn giá trị). 3. Tổng lồng. 4. Phần đuôi (Mệnh đề 13.8), $\gamma^K\to0$ (O2). Bỏ O2: $\gamma^K\not\to0$, bước 4 hỏng | Tổng lồng: nhắc lại (deck 04, RG15; 05b, A02). Kỳ vọng toàn phần: nhắc lại (deck 10, MD01) | Dùng trong Định lý 13.12 (dấu bằng) và Định lý 13.19 (hai chiều) | Bellman chỉ cần mô hình một bước (d.707) |
| Định lý 13.12 (d.712–758) | Giá trị = thưởng một bước + $\gamma$ × giá trị kỳ vọng kế tiếp, viết cho cả vector | 1. $P^\pi$ hàng ngẫu nhiên: $\lVert P^\pi U\rVert_\infty\le\lVert U\rVert_\infty$. 2. Hạt nhân của $I-\gamma P^\pi$ là $\{0\}$ (O2). 3. $W=T^\pi W$ là (5.11) với dấu bằng → Bổ đề 13.11 → $V^\pi=W$. 4. Duy nhất. Bỏ O2: bước 2 chỉ cho $\lVert U\rVert_\infty\le\lVert U\rVert_\infty$ | Hạt nhân tầm thường ⇒ khả nghịch: nhắc lại đại số tuyến tính (Bài 00), không trang kỹ thuật | Ví dụ 13.4–13.5: $20/11$, $6$, $32/13$ | Đánh giá chính sách (policy evaluation): giải hệ $\lvert\mathcal S\rvert$ ẩn hoặc lặp $V\leftarrow r^\pi+\gamma P^\pi V$ (d.758) |
| Mệnh đề 13.16 (d.889–944), cùng Bổ đề 13.15 | Phép kỳ vọng và phép chọn hành động không khuếch đại sai số; chỉ $\gamma$ làm co | 1. Một hành động: $r$ triệt tiêu; hàng xác suất không âm, tổng $1$ → hệ số $\gamma$. 2. $T$: Bổ đề 13.15. 3. $T^\pi$: trung bình trọng số. Bỏ O2: hệ số $1$ (Nhận xét 13.24) | Một dòng "Nhắc lại:" so với phần tử bất kỳ rồi lấy cận dưới đúng (deck 12 giới thiệu); ở đây lấy cực đại theo $a$ | Bài tập 13.2(a) | Lặp Bellman ổn định với sai số ban đầu (d.943) |
| Định lý 13.17 (d.948–1012) | Mỗi lần lặp thu hẹp khoảng cách tới điểm bất động ít nhất $\kappa$ lần; $F(x)=x/2+1$ co về $2$; $F(x)=x+1$ không có điểm bất động | 1. Duy nhất từ tính co. 2. Hiệu liên tiếp $\le\kappa^j\delta_0$ (quy nạp). 3. Cauchy (6.6) qua cấp số nhân. 4. Hội tụ từng tọa độ (tính đầy đủ của $\mathbb R$), $F(\bar x)=\bar x$ bằng bất đẳng thức tam giác. Bỏ $\kappa<1$: $x+1$ | **Nguyên lý ánh xạ co: giới thiệu lần đầu trong các deck của học phần** (`grep -il "ánh xạ co\|Banach"` trên `lecture-*.html`: 0 tệp; deck 05b, C02 chỉ có "phép co" của dãy sai số, nhắc lại một dòng). Trang "Kỹ thuật." L13-4-07 | Dãy $0;\,1;\,1{,}5;\,1{,}75$ của $F(x)=x/2+1$ (mới, §5) | Hệ quả 13.18: lặp giá trị, $\gamma=0{,}99$ cần khoảng $230$ vòng để giảm sai số $10$ lần (d.1041) |
| Định lý 13.19 (d.1047–1110) | Một chính sách đạt $\bar V$, mọi chính sách (kể cả phụ thuộc lịch sử) không vượt $\bar V$, nên $\bar V$ là cận trên đúng | 1. $\pi^*$ cho dấu bằng trong (5.11) → $V^{\pi^*}=\bar V$. 2. Trung bình không vượt cực đại → $V^\rho\le\bar V$ với mọi $\rho$. 3. Kẹp $\bar V=V^{\pi^*}\le V^*\le\bar V$. 4. Duy nhất qua Hệ quả 13.18. O2 vào qua Bổ đề 13.11; O1 cho cực đại đạt | Mẹo một dòng: kẹp hai chiều. Bổ đề 13.11 dùng lại | Ví dụ 13.6 ($V^*(h)=6$, chọn $B$; bảng lặp; $8/9$; Hình 13.2) | Trích chính sách tham lam từ hàm giá trị (Murphy (2023), §34.5.5, (34.84)); cần mô hình đúng và trạng thái Markov (d.1110) |
| Hệ quả 13.21, Mệnh đề 13.22, Thuật toán 13.23 (d.1158–1257) | $\beta(V)$ đo mức $V$ vi phạm phương trình Bellman và tính được khi biết mô hình | Chèn $TV$, bất đẳng thức tam giác, tính co, chuyển vế; với 13.22 chèn $T^{\pi_V}V=TV$, co hai lần | Một dòng "Nhắc lại:" chèn một đại lượng trung gian rồi chuyển vế (deck 12 giới thiệu) | Ví dụ 13.7 (ghi chú diễn giả), Bài tập 13.2(b)(c), robot $\varepsilon=0{,}1$ dừng tại $k=39$ | Quy hoạch có chứng nhận: mất mát $\le2\gamma\varepsilon/(1-\gamma)$ (d.1589) |
| Hệ quả 13.26 (d.1376–1409) | Mỗi hàng chuyển là một phân phối phân loại; tần suất quan sát là ước lượng | Hợp lý $\prod q(s')^{N(s,a,s')}$ (M3) → Định lý 11.7; một trạng thái; $m=0$ | MLE phân loại: nhắc lại (Định lý 11.7, deck 11) | Bài tập 13.3(a); Tình huống 13.1 ($10/10$ lần ở lại $h$) | Học mô hình môi trường (d.1408), học tăng cường dựa trên mô hình |

## 5. Ví dụ bổ trợ

Mọi số dưới đây được tính lại hai lần: một lần bằng tay theo thứ tự của ghi chú, một lần bằng phân số hoặc cách khác ghi ở dòng "Kiểm". Dấu thập phân là dấu phẩy.

1. **Robot với hai hành động** (Ví dụ 13.1 và Câu hỏi mở đầu, d.15–24, d.127–143; trang L13-1-06). $\mathcal S=\{h,z\}$; tại $h$: $A$ thưởng $1$, rồi $h$ hoặc $z$ mỗi bên xác suất $1/2$; $B$ thưởng $0{,}6$, rồi $h$ với xác suất $1$; $z$ hấp thụ, thưởng $0$; $\gamma=0{,}9$. Luôn chọn $A$: $V^A(h)=20/11\approx1{,}82$; luôn chọn $B$: $6$ (tính ở mục 4 dưới đây). $\mathcal R=\{0;\,0{,}6;\,1\}$, $R_{\max}=1$.
2. **Robot hoạt động hoặc nghỉ, hai bước** (Ví dụ 13.2, d.267–292; L13-2-01, L13-2-03). $P=\begin{pmatrix}0{,}8&0{,}2\\0{,}35&0{,}65\end{pmatrix}$, $\mu_0=(1;\,0)$.
   - Đường đi: $h\to h\to h$: $0{,}8\cdot0{,}8=0{,}64$; $h\to h\to n$: $0{,}8\cdot0{,}2=0{,}16$; $h\to n\to h$: $0{,}2\cdot0{,}35=0{,}07$; $h\to n\to n$: $0{,}2\cdot0{,}65=0{,}13$.
   - $\mu_2(h)=0{,}64+0{,}07=0{,}71$, $\mu_2(n)=0{,}16+0{,}13=0{,}29$. Kiểm: $\mu_1=(0{,}8;\,0{,}2)$, $\mu_1P=(0{,}64+0{,}07;\ 0{,}16+0{,}13)$; tổng bốn đường $0{,}64+0{,}16+0{,}07+0{,}13=1$. $0{,}71>0{,}8^2=0{,}64$.
3. **Xác suất chuyển và xác suất đồng thời** (Ví dụ 13.3, d.296–319; L13-2-04). Cùng $P$, $\mu_t=(0{,}4;\,0{,}6)$. $P_{hn}=0{,}2$; $\mathbb P(S_t=h,S_{t+1}=n)=0{,}4\cdot0{,}2=0{,}08$; $\mu_{t+1}=(0{,}32+0{,}21;\ 0{,}08+0{,}39)=(0{,}53;\,0{,}47)$; nếu độc lập: $0{,}4\cdot0{,}47=0{,}188\ne0{,}08$. Kiểm: $0{,}53+0{,}47=1$; $0{,}6\cdot0{,}35=0{,}21$, $0{,}6\cdot0{,}65=0{,}39$.
4. **Ba chính sách dừng của robot** (Ví dụ 13.4–13.5, d.450–466, d.762–794; L13-3-11).
   - Trộn đều: $P^\pi(h,h)=\tfrac12\cdot\tfrac12+\tfrac12\cdot1=0{,}75$, $P^\pi(h,z)=0{,}25$; $r^\pi(h)=\tfrac12\cdot1+\tfrac12\cdot0{,}6=0{,}8$; $r^\pi(z)=0$.
   - $V(z)=0$ (từ $z$ mọi thưởng bằng $0$; (5.12) cho $V(z)=0{,}9V(z)$).
   - $V^A(h)=1+0{,}9\cdot\tfrac12V^A(h)=1+0{,}45V^A(h)$ ⇒ $V^A(h)=1/0{,}55=20/11\approx1{,}8182$. Kiểm: $1+0{,}45\cdot20/11=1+9/11=20/11$.
   - $V^B(h)=0{,}6+0{,}9V^B(h)$ ⇒ $V^B(h)=0{,}6/0{,}1=6$. Kiểm: $0{,}6+5{,}4=6$.
   - $V^\pi(h)=0{,}8+0{,}9\cdot0{,}75V^\pi(h)=0{,}8+0{,}675V^\pi(h)$ ⇒ $V^\pi(h)=0{,}8/0{,}325=32/13\approx2{,}4615$. Kiểm: $0{,}8+0{,}675\cdot32/13=(10{,}4+21{,}6)/13=32/13$.
   - Số chính sách tất định dừng: $\prod_s\lvert\mathcal A(s)\rvert=2\cdot1=2$ (d.1632).
5. **Ánh xạ co một chiều** (sau Định nghĩa 13.14, d.850; L13-4-02, L13-4-05). $F(x)=x/2+1$: $\lvert F(x)-F(y)\rvert=\tfrac12\lvert x-y\rvert$, $\kappa=1/2$, điểm bất động $2$ ($x=x/2+1$). **Phần mới** (L13-4-05, `thêm`): lặp từ $x_0=0$ cho $x_1=1$, $x_2=1{,}5$, $x_3=1{,}75$; sai số $2;\,1;\,0{,}5;\,0{,}25$, đúng bằng $\kappa^k\lvert x_0-\bar x\rvert=2\cdot2^{-k}$ (dấu bằng trong bất đẳng thức thứ nhất của (6.5)). Cách dựng: dùng đúng ánh xạ của ghi chú và $x_0=0$ như $V_0=0$ của Ví dụ 13.6. Kiểm: $x_k=2-2^{1-k}$; $k=3$: $2-0{,}25=1{,}75$; bất đẳng thức thứ hai của (6.5) tại $k=3$: $\tfrac{(1/2)^3}{1/2}\cdot\lvert x_1-x_0\rvert=0{,}25\ge0{,}25$. Phản ví dụ $F(x)=x+1$: $\lvert F(x)-F(y)\rvert=\lvert x-y\rvert$, $x=x+1$ vô nghiệm.
6. **Lặp giá trị cho robot** (Ví dụ 13.6, d.1120–1154; L13-5-03, L13-5-04). $V_k(z)=0$; $v_{k+1}=\max\{1+0{,}45v_k;\ 0{,}6+0{,}9v_k\}$.
   - $k=0$: $v_0=0$; $1$ và $0{,}6$; $A$; $v_1=1$. $k=1$: $1{,}45$ và $1{,}5$; $B$; $v_2=1{,}5$. $k=2$: $1{,}675$ và $1{,}95$; $B$; $v_3=1{,}95$. $k=3$: $1{,}8775$ và $2{,}355$; $B$; $v_4=2{,}355$.
   - Điểm bất động: $v=0{,}6+0{,}9v$ ⇒ $v=6$; nhánh $A$ tại $6$: $1+2{,}7=3{,}7<6$. $B$ thắng khi $0{,}6+0{,}9v\ge1+0{,}45v$ ⇔ $v\ge8/9\approx0{,}889$; với $k\ge1$, $v_k\ge1$.
   - Kiểm: dạng đóng $v_k=6-5\cdot0{,}9^{k-1}$ ($k\ge1$): $k=1$: $1$; $k=2$: $1{,}5$; $k=3$: $6-4{,}05=1{,}95$; $k=4$: $6-3{,}645=2{,}355$. Chặn (6.7) tại $k=3$: $\lvert v_3-6\rvert=4{,}05\le0{,}9^3\cdot6=0{,}729\cdot6=4{,}374$.
7. **Chỉ số trong chặn phần dư** (Ví dụ 13.7, d.1263–1282; ghi chú diễn giả L13-5-05). $V=(1{,}95;\,0)$: $Q_V(h,A)=1+0{,}8775=1{,}8775$, $Q_V(h,B)=0{,}6+1{,}755=2{,}355$; $\beta=0{,}405$; chặn $0{,}405/0{,}1=4{,}05$ và $0{,}9\cdot4{,}05=3{,}645$; sai số thật $6-1{,}95=4{,}05$, $6-2{,}355=3{,}645$ (dấu bằng).
8. **Lặp giá trị có chứng nhận cho robot** (d.1257; L13-5-06). $\varepsilon=0{,}1$: dừng khi $\beta_k\le0{,}01$. $\beta_0=\lvert v_1-v_0\rvert=1$; với $k\ge1$, $\beta_k=v_{k+1}-v_k=0{,}5\cdot0{,}9^{k-1}$. $0{,}5\cdot0{,}9^{k-1}\le0{,}01$ ⇔ $0{,}9^{k-1}\le0{,}02$ ⇔ $k-1\ge\ln50/\ln(10/9)=3{,}9120/0{,}10536\approx37{,}13$ ⇒ $k=39$. $v_{39}=6-5\cdot0{,}9^{38}$; $0{,}9^{38}=e^{-38\cdot0{,}105361}=e^{-4{,}00371}\approx0{,}018248$ ⇒ $v_{39}\approx6-0{,}09124=5{,}90876\approx5{,}9088$; sai số thật $0{,}0912\le0{,}1$. Kiểm: $\beta_{38}=0{,}5\cdot0{,}9^{37}\approx0{,}5\cdot0{,}020276=0{,}01014>0{,}01$, $\beta_{39}=0{,}5\cdot0{,}018248=0{,}00912\le0{,}01$.
9. **Hệ số $\gamma=0{,}99$** (d.1041; L13-4-07). $0{,}99^{230}=e^{230\ln0{,}99}=e^{-2{,}3116}\approx0{,}0991$. Kiểm: $\ln0{,}99=-0{,}0100503$; $230\cdot0{,}0100503=2{,}3116$.
10. **Hai mô hình không chiết khấu** (Ví dụ 13.8, d.1333–1341; L13-5-08). Thưởng $1$: $V=1+V$ vô nghiệm, $V_k=k$. Thưởng $0$: $TV=V$, mọi số thực là điểm bất động.
11. **Số đếm và mục tiêu** (Ví dụ 13.9–13.10, d.1415–1494; ghi chú diễn giả L13-6-01, L13-6-03). $9/12=3/4$, $3/12=1/4$; $\hat Q_V=2+0{,}8(3{,}75+0{,}25)=5{,}2$. Mẫu $s_1$: $Y=2+4=6$, phần tử mới $2+\tfrac14\cdot4=3$; mẫu $s_2$: $Y=2+0{,}8=2{,}8$, phần tử mới $2{,}2$; $\mathbb E[Y]=4{,}5+0{,}7=5{,}2$; kỳ vọng phần tử mới $2{,}25+0{,}55=2{,}8=2+\tfrac14(5{,}2-2)$.
12. **Tình huống 13.1** (d.1542–1554; L13-6-05). $(1/2)^{10}=1/1024$; $\hat P(h\mid h,A)=1$; $\hat Tv=\max\{1+0{,}9v;\ 0{,}6+0{,}9v\}$, nhánh $A$ hơn đúng $0{,}4$; $v=1+0{,}9v$ ⇒ $v=10$; tại $10$: $10$ và $9{,}6$. Mất mát thật: $6-20/11=(66-20)/11=46/11\approx4{,}1818$.
13. **Tình huống 13.2** (d.1556–1582; L13-6-06). Sau $(X_0,X_1)=(1,0)$: $X_2,X_3,\ldots=1,0,1,0,\ldots$; $G_1=\sum_{j\ge0}(1/2)^{2j}=1/(1-1/4)=4/3$. Sau $(0,0)$: $G_1=0$. Kiểm: $1+0{,}25+0{,}0625+\cdots\to1{,}333$.
14. **Bài tập trên mặt trang** (lời giải lấy nguyên từ ghi chú và `exercises.md`, tính lại): Bài tập 13.1: $\mu_1=(0{,}7;\,0{,}3)$, $\mu_2=(0{,}49+0{,}06;\ 0{,}21+0{,}24)=(0{,}55;\,0{,}45)$. Bài tập 13.4: $G_1=7/0{,}1=70$, $G_0=2+63=65$; kiểm trực tiếp $2+7\cdot0{,}9/0{,}1=65$. Bài tập 13.2: $0{,}02/0{,}2=0{,}1$; $0{,}8\cdot0{,}1=0{,}08$; $1{,}6/0{,}2\cdot0{,}1=0{,}8$. Bài tập 13.3: $\tfrac45\cdot3-\tfrac15=2{,}2$; $1+1{,}1=2{,}1$; $Y=2{,}5$; $Q^+=1+0{,}3=1{,}3$; kiểm $\tfrac45\cdot2{,}5+\tfrac15\cdot0{,}5=2+0{,}1=2{,}1$. Bài tập 13.13: $V^{\pi_{\mathrm L}}(s_0)=1/(1-\gamma^2)$, $V^{\pi_{\mathrm R}}(s_0)=2\gamma/(1-\gamma^2)$; $\gamma=0{,}9$: $1/0{,}19=100/19\approx5{,}263$, $1{,}8/0{,}19=180/19\approx9{,}474$; $\gamma=0{,}5$: $1/0{,}75=(2\cdot0{,}5)/0{,}75=4/3$; vòng lặp $V_1=(1;\,0;\,2)$, $V_2=(\max\{1;1{,}8\}=1{,}8;\ 0{,}9;\ 2{,}9)$, $V_3=(\max\{1{,}81;\,2{,}61\}=2{,}61;\ 1{,}62;\ 3{,}62)$; $V^*=(180/19;\,162/19;\,200/19)$; $\lVert V_3-V^*\rVert_\infty=200/19-3{,}62\approx6{,}906\le0{,}729\cdot200/19\approx7{,}674$.

Ví dụ mới duy nhất là dãy lặp của $F(x)=x/2+1$ ở mục 5 (dùng đúng ánh xạ của ghi chú). Hai hình mới: `two-step-paths.svg` (số của Ví dụ 13.2, mục 2) và `robot-mdp-slide.svg` (dữ liệu của Hình 13.1, chữ lớn cho trang chiếu).

## 6. Danh sách trang

Mỗi mục: ID · tiêu đề · loại; khối `mat-trang` là văn bản dự kiến trên mặt trang (mỗi dòng một dòng nội dung; dòng bắt đầu bằng `$$` là công thức hiển thị; dòng bắt đầu bằng `|` là bảng; `[hình: …]` là hình; `[fragment]` là phần hiện sau). Số âm tiết, số dòng và dòng dài nhất lấy từ script ở §6.8. Mọi trang có quyết định `thêm` (deck mới, chưa có trang cũ); lý do ghi ở trường "Lý do". Viết tắt: MT = mục tiêu học tập của ghi chú (d.30–35).

### 6.1. Mạch 1 — Mở đầu (8 phút)

#### L13-1-01 · Ra quyết định tuần tự dưới điều kiện bất định · bìa (`id="mach-1"`)
```mat-trang
Xích Markov, quá trình quyết định Markov và lặp giá trị · Bài 13
Với quá trình quyết định Markov hữu hạn có mô hình đã biết và hệ số chiết khấu nhỏ hơn một, lặp giá trị hội tụ tới giá trị tối ưu duy nhất, và chính sách tham lam theo giá trị đó tối ưu trong mọi chính sách.
Cơ sở toán học cho AI · Học kỳ 1, 2026–2027
Trường Đại học Công nghệ · Đại học Quốc gia Hà Nội
```
- Ghi chú diễn giả: Bài 07 giải bài toán quyết định hữu hạn, tất định bằng truy hồi ngược. Hai thay đổi của bài: trạng thái kế tiếp ngẫu nhiên nên vế phải cần kỳ vọng; số bước không giới hạn nên không còn điều kiện cuối, giá trị xuất hiện ở cả hai vế. Khi tác tử hành động, dữ liệu không còn độc lập cùng phân phối như Bài 12 (d.3–11).
- Lý do: trang tiêu đề mạch mở đầu, nêu luận điểm có điều kiện. Điểm vào mạch 1. Nối sau: L13-1-02. MT: tất cả. Nguồn: d.1–11; Hệ quả 13.18, Định lý 13.19. Thời lượng: 1 phút.

#### L13-1-02 · Tiên quyết và quy ước · tiên quyết
```mat-trang
**Nhắc lại:** quy hoạch động tất định (Định lý 07.49):
$$J_k(\xi)=\min_{u}\bigl\{g_k(\xi,u)+J_{k+1}\bigl(f_k(\xi,u)\bigr)\bigr\},\qquad J_N=g_N;$$
quy tắc nhân, xác suất toàn phần, kỳ vọng toàn phần (Bài 10);
ước lượng hợp lý cực đại (maximum likelihood estimation, MLE) phân loại: $\hat\pi_k=m_k/m$ (Định lý 11.7);
$\sum_{j\ge0}\gamma^j=1/(1-\gamma)$ khi $0\le\gamma<1$; chuẩn cực đại $\lVert x\rVert_\infty=\max_i\lvert x_i\rvert$.
**Ký hiệu:** $t$ là thời điểm, $k$ là chỉ số vòng lặp; $n$ là trạng thái nghỉ, $m$ là số lần thử.
```
- Ghi chú diễn giả: $g_k$ là chi phí giai đoạn, $f_k$ là hàm chuyển, $J_k$ là chi phí tối ưu còn lại; cực tiểu lấy trên các điều khiển khả thi tại $\xi$. Nhận xét 07.47: trạng thái chưa đủ thông tin thì mở rộng trạng thái. Độc lập có điều kiện (Định nghĩa 10.16) và kỳ vọng có điều kiện theo biến rời rạc (Định nghĩa 10.28) là nền của mọi kỳ vọng trong bài. Mọi dãy Cauchy số thực hội tụ; chứng minh định lý điểm bất động dùng tính chất này. Bài 11 viết $n$, $n_k$ cho số lần thử; ở đây $n$ là trạng thái nghỉ, nên số lần thử viết $m$. Chỉ số $k$ đếm vòng tính toán, khác thời điểm $t$ robot hành động.
- Lý do: NT11 (Nhắc lại các kết quả mà bài dùng, theo "Kiến thức tiên quyết" d.37–55; dòng "Ký hiệu:" theo d.41, d.82). Một nhãn "Nhắc lại:" cho cả danh sách (T9). Công thức Định lý 07.49 viết $\min_u$ như d.39 để $U$ chỉ còn một nghĩa (L13). Khoảng trống: Bellman tất định phải có trên mặt trang trước khi mạch 4 so sánh. Nối trước: bìa; sau: mục tiêu. MT: 3–6. Nguồn: d.39–43, d.41, d.82. Thời lượng: 2 phút.

#### L13-1-03 · Mục tiêu học tập · mục tiêu
```mat-trang
Phát biểu tính Markov; lập ma trận chuyển; truyền phân phối.
Mô hình hóa bài toán bằng quá trình quyết định Markov.
Suy ra phương trình Bellman theo chính sách và tối ưu.
Chứng minh tính co; suy ra lặp giá trị hội tụ, tham lam theo điểm bất động tối ưu.
Lặp giá trị bằng tay; so thưởng tức thời, giá trị dài hạn.
Ước lượng hàng chuyển, tính mục tiêu Bellman; phân biệt quy hoạch, học tăng cường.
```
- Ghi chú diễn giả: Mục tiêu 1 đo bằng Bài tập 13.1; mục tiêu 4 bằng Bài tập 13.2; mục tiêu 6 bằng Bài tập 13.3; các mục tiêu 2, 3, 5 bằng bài tập trong tệp bài tập (bt d.16–23). Mục tiêu 4 nói về chính sách tham lam theo điểm bất động của $T$; tham lam theo một vector bất kỳ chỉ có chặn mất mát. Mục tiêu 5 gồm giải thích vì sao hành động có phần thưởng tức thời lớn nhất có thể không tối ưu.
- Lý do: NT11. MT: 1–6. Nguồn: d.26–35. Thời lượng: 1 phút. Mật độ: ngoại lệ trần 80 (trang mục tiêu).

#### L13-1-04 · Nội dung · nội dung
```mat-trang
Mở đầu
Xích Markov và phân phối trạng thái
Quá trình quyết định Markov và giá trị của chính sách
Toán tử Bellman tối ưu và ánh xạ co
Giá trị tối ưu và chứng nhận sai số
Học từ trải nghiệm
Tổng kết
Đọc trước: Murphy (2023), §2.6.1, §2.6.4.1, §34.5.1, §34.5.3–34.5.4.
```
- Ghi chú diễn giả: mạch 2 truyền phân phối khi chưa có hành động; mạch 3 thêm hành động và đánh giá một chính sách cố định; mạch 4 đưa phép chọn tốt nhất vào toán tử $T$ và chứng minh lặp hội tụ; mạch 5 nối điểm bất động với giá trị tối ưu, cho tiêu chuẩn dừng; mạch 6 bỏ giả thiết biết mô hình.
- Lý do: NT11; danh sách đánh số, liên kết `#/1`–`#/7`. Danh sách `<ol>` có đúng 7 mục `<li>` (khớp 7 mạch cho `deck_lint` STRUCT); dòng "Đọc trước: …" là một `<p>` sau danh sách (d.1645). Trần 80. MT: tất cả. Thời lượng: 1 phút.

#### L13-1-05 · Vấn đề trung tâm · vấn đề (một hộp)
```mat-trang
**Câu hỏi:** Khi một hành động ảnh hưởng đến các trạng thái và phần thưởng trong tương lai, làm thế nào tìm chính sách tối ưu?
```
- Ghi chú diễn giả (câu trả lời theo mạch, chỉ ở đây): mạch 2: phân phối trạng thái truyền bằng $\mu_{t+1}=\mu_tP$; mạch 3: giá trị của một chính sách dừng là nghiệm duy nhất của $V=r^\pi+\gamma P^\pi V$; mạch 4: $T$ co với hệ số $\gamma$, lặp giá trị hội tụ; mạch 5: chính sách tham lam theo điểm bất động tối ưu trong mọi chính sách, dừng với chứng nhận sai số; mạch 6: khi học mô hình, bảo đảm chỉ thuộc mô hình ước lượng.
- Lý do: NT11 (một hộp, đúng câu in đậm d.11). MT: 2–5. Thời lượng: 1 phút.

#### L13-1-06 · Ví dụ: robot với hai hành động · vấn đề + ví dụ dẫn nhập
```mat-trang
$h$: hoạt động; $z$: dừng mãi, thưởng $0$.
$A$ tại $h$: thưởng $1$; sau đó còn hoạt động hoặc dừng, mỗi bên xác suất $1/2$.
$B$ tại $h$: thưởng $0{,}6$; chắc chắn còn hoạt động.
Thưởng ở bước $t$ nhân $0{,}9^t$, cần tổng kỳ vọng lớn nhất. **Câu hỏi:** chọn hành động nào tại $h$?
[fragment] So phần thưởng một bước: $A$ hơn vì $1>0{,}6$.
[fragment] Tổng thưởng chiết khấu kỳ vọng: luôn $A$ được $20/11\approx1{,}82$, luôn $B$ được $6$.
[hình: img/lec-13/robot-mdp-slide.svg (mới), cột phải]
```
- Ghi chú diễn giả: chọn $A$ làm robot dừng với xác suất $1/2$ sau mỗi lần chọn và mất mọi phần thưởng về sau. Hai con số là nghiệm của $V^A(h)=1+0{,}45\,V^A(h)$ và $V^B(h)=0{,}6+0{,}9\,V^B(h)$. Câu trả lời trọn vẹn cần so với mọi cách chọn, kể cả cách chọn đổi theo lịch sử, mà không liệt kê hết (d.24). $z$ là trạng thái hấp thụ (absorbing state). Hình: hai hình tròn là trạng thái, hai ô là hành động; $A$ chỉ giữ robot hoạt động với xác suất $0{,}5$.
- Lý do: bước "vấn đề" của cả bài bằng ví dụ cụ thể (NT8, NT14: liệt kê ngay dữ kiện, lựa chọn, hệ quả). Ví dụ xuyên suốt thứ nhất. Nối sau: mạch 2 tạm bỏ hành động để mô hình hóa chuyển ngẫu nhiên. Phục vụ: câu hỏi trung tâm. MT: 2, 5. Nguồn: d.15–24, Ví dụ 13.1 d.127–143. Thời lượng: 2 phút. Đã chốt (quyết định điều phối viên, điểm 3): ví dụ ở mạch mở đầu; mặt trang chỉ dùng $h$, $z$, $A$, $B$, $0{,}9$ và lời "tổng thưởng chiết khấu kỳ vọng", không dùng $V^A$, $V^\pi$. Hai fragment tách phép so một bước khỏi tổng thưởng dài hạn (T3). Hình là bản cho trang chiếu `robot-mdp-slide.svg` (T2, §8).

### 6.2. Mạch 2 — Xích Markov và phân phối trạng thái (12 phút)

#### L13-2-00 · 2. Xích Markov và phân phối trạng thái · tiêu đề mạch (`id="mach-2"`)
```mat-trang
Khi bước sau chỉ phụ thuộc trạng thái hiện tại, phân phối trạng thái được truyền bằng phép nhân ma trận.
Tính Markov · Ma trận chuyển · Phân phối sau nhiều bước · Xác suất quỹ đạo
```
- Ghi chú diễn giả (40–100 âm tiết): robot vận hành theo một quy tắc cố định, trạng thái bước sau ngẫu nhiên và chỉ phụ thuộc trạng thái hiện tại. Xích Markov và ma trận chuyển cho công thức $\mu_t=\mu_0P^t$ và xác suất của một quỹ đạo; mạch sau thêm hành động, mỗi hành động một hàng chuyển (d.149, d.365).
- Lý do: NT12. Điểm vào mạch 2; dòng dẫn nêu câu hỏi của mạch (bước `vấn đề` của cụm xích Markov). MT: 1. Thời lượng: 0,5 phút.

#### L13-2-01 · Ví dụ: robot hoạt động hoặc nghỉ · vấn đề + trực quan
```mat-trang
Hai trạng thái: $h$ (hoạt động), $n$ (nghỉ); robot bắt đầu ở $h$.
Từ $h$: sang $h$ với xác suất $0{,}8$, sang $n$ với xác suất $0{,}2$.
Từ $n$: sang $h$ với xác suất $0{,}35$, ở lại $n$ với xác suất $0{,}65$.
**Câu hỏi:** Robot còn hoạt động sau hai bước với xác suất bao nhiêu?
**Trực quan.** Cộng xác suất các đường đi tới $h$: $h\to h\to h$ cho $0{,}64$, $h\to n\to h$ cho $0{,}07$; tổng $0{,}71$ (Ví dụ 13.2).
[hình: img/lec-13/two-step-paths.svg (mới), cột phải]
```
- Ghi chú diễn giả: xác suất bước sau chỉ dùng trạng thái hiện tại; trạng thái hiện tại tóm tắt mọi thông tin của quá khứ cần cho bước kế tiếp (d.151). Mỗi đường đi có xác suất là tích các xác suất chuyển: $0{,}8\cdot0{,}8$, $0{,}2\cdot0{,}35$. $0{,}71>0{,}8^2$ vì robot có thể nghỉ một bước rồi hoạt động lại (d.291). Cây có bốn lá $0{,}64$, $0{,}16$, $0{,}07$, $0{,}13$, tổng $1$.
- Lý do: mở cụm bằng ví dụ có dữ kiện (NT8, NT14); trực quan cho Mệnh đề 13.2 và Hệ quả 13.3 trước phát biểu. Ví dụ xuyên suốt thứ hai. Nối sau: định nghĩa gọi tên giả thiết "chỉ phụ thuộc hiện tại". Phục vụ: cả hai phần của câu hỏi mạch. MT: 1. Nguồn: §4 d.149–151, Ví dụ 13.2 d.267–292. Thời lượng: 2,5 phút.

#### L13-2-02 · Xích Markov thuần nhất · định nghĩa
```mat-trang
**Định nghĩa 13.1.** Dãy $S_0,S_1,\ldots$ trên $\mathcal S$ hữu hạn có *tính Markov* (Markov property) nếu
$$\mathbb P(S_{t+1}=s'\mid S_0=s_0,\ldots,S_t=s_t)=\mathbb P(S_{t+1}=s'\mid S_t=s_t)\tag{4.1}$$
với mọi $t$ và mọi $s_0,\ldots,s_t,s'$ có $\mathbb P(S_0=s_0,\ldots,S_t=s_t)>0$.
Xích *thuần nhất* (time-homogeneous) khi có *ma trận chuyển* (transition matrix) $P$ không phụ thuộc $t$, với mọi $i$ có $\mathbb P(S_t=i)>0$:
$$P_{ij}=\mathbb P(S_{t+1}=j\mid S_t=i),\qquad P_{ij}\ge0,\qquad\textstyle\sum_jP_{ij}=1.\tag{4.2}$$
$P$ là *ma trận hàng ngẫu nhiên* (row-stochastic matrix): phần tử không âm, tổng mỗi hàng bằng $1$.
```
- Ghi chú diễn giả: dãy $S_0,S_1,\ldots$ là một quá trình ngẫu nhiên rời rạc theo thời gian (discrete-time stochastic process). Tính Markov là một trường hợp của độc lập có điều kiện (Định nghĩa 10.16) và vẫn cho phép $S_{t+1}$ phụ thuộc $S_t$; thuần nhất là giả thiết riêng. Robot $h/n$ có $P=\begin{pmatrix}0{,}8&0{,}2\\0{,}35&0{,}65\end{pmatrix}$. Trong học máy, trạng thái là đối tượng mô hình hóa: nếu cả mức pin và vị trí ảnh hưởng bước sau, trạng thái chỉ ghi vị trí có thể mất tính Markov (d.183).
- Lý do: phát biểu định nghĩa sau trực quan (NT8). Nối trước: "chỉ phụ thuộc hiện tại" của L13-2-01; sau: công thức truyền phân phối. MT: 1. Nguồn: Định nghĩa 13.1 d.157–179, d.181–183. Thời lượng: 2 phút.

#### L13-2-03 · Phân phối sau nhiều bước · kết quả
```mat-trang
**Giả thiết:** xích Markov thuần nhất trên $\mathcal S$ hữu hạn, ma trận chuyển $P$; $\mu_t=\bigl(\mathbb P(S_t=s)\bigr)_{s\in\mathcal S}$ là vector hàng.
**Kết luận:** với mọi $t\ge0$, $\mu_t$ là hàng xác suất và (Mệnh đề 13.2, Hệ quả 13.3)
$$\mu_{t+1}=\mu_tP,\qquad\mu_t=\mu_0P^t\quad(P^0=I),\tag{4.3}$$
$$\mathbb P(S_0=s_0,\ldots,S_t=s_t)=\mu_0(s_0)\prod_{k=0}^{t-1}P_{s_ks_{k+1}}.\tag{4.4}$$
**Chứng minh.** Xác suất toàn phần theo $\{S_t=i\}$, rồi quy nạp; (4.4) từ quy tắc nhân và (4.1).
**Ý nghĩa:** (4.4) là hợp lý của chuỗi trạng thái quan sát được.
```
- Ghi chú diễn giả: với robot, $\mu_1=(0{,}8;\,0{,}2)$ và $\mu_2=\mu_1P=(0{,}71;\,0{,}29)$, trùng tổng hai đường đi $0{,}64+0{,}07$; khi biết mô hình, phân phối sau $t$ bước cần $t$ phép nhân vector với ma trận (d.227). Tính thuần nhất vào ở bước một bước; với ma trận đổi theo thời gian $P_0,P_1,\ldots$ thì $\mu_t=\mu_0P_0\cdots P_{t-1}$ (Nhận xét 13.4). Tổng mỗi hàng của $P$ bằng $1$, tổng cột không nhất thiết; dùng vector cột thì $\mu_{t+1}^\top=P^\top\mu_t^\top$. Ước lượng ma trận chuyển từ dữ liệu chuỗi bắt đầu từ (4.4) (d.262).
- Lý do: phát biểu + ứng dụng (NT5, NT8). Kết quả phụ: chứng minh một dòng (§4). Nối sau: Ví dụ 13.3 phân biệt hai loại xác suất trên cùng ma trận. MT: 1. Nguồn: Mệnh đề 13.2 d.189–228, Hệ quả 13.3 d.232–263, Nhận xét 13.4 d.323–327. Thời lượng: 3 phút.

#### L13-2-04 · Ví dụ: xác suất chuyển và xác suất đồng thời · ví dụ + kiểm tra
```mat-trang
Cùng ma trận $P=\begin{pmatrix}0{,}8&0{,}2\\0{,}35&0{,}65\end{pmatrix}$, thứ tự $h,n$; $\mu_t=(0{,}4;\,0{,}6)$ (Ví dụ 13.3). Tính hai xác suất và $\mu_{t+1}$.
Xác suất chuyển: $\mathbb P(S_{t+1}=n\mid S_t=h)=P_{hn}=0{,}2$.
Xác suất đồng thời: $\mathbb P(S_t=h,S_{t+1}=n)=0{,}4\cdot0{,}2=0{,}08$.
Bước sau: $\mu_{t+1}=(0{,}53;\,0{,}47)$; nếu $S_t$, $S_{t+1}$ độc lập thì xác suất đồng thời bằng $0{,}4\cdot0{,}47=0{,}188$.
**Diễn giải:** $0{,}08\ne0{,}188$: xích có tính Markov nhưng hai trạng thái liên tiếp không độc lập.
```
- Ghi chú diễn giả: tính Markov nói về phân phối có điều kiện theo hiện tại; độc lập nói về việc biết một biến có đổi phân phối của biến kia hay không (Nhận xét 13.4, mục 1). $\mu_{t+1}=(0{,}4\cdot0{,}8+0{,}6\cdot0{,}35;\ 0{,}4\cdot0{,}2+0{,}6\cdot0{,}65)$. Hệ quả: các trạng thái trên một quỹ đạo không độc lập cùng phân phối (i.i.d.), điểm khác với dữ liệu của Bài 12.
- Lý do: phản ví dụ cho nhầm lẫn "Markov = độc lập" (NT4); bước kiểm tra của cụm. MT: 1. Nguồn: Ví dụ 13.3 d.296–319, Nhận xét 13.4 d.323–326. Thời lượng: 2 phút.

#### L13-2-05 · Bài tập: truyền phân phối hai bước · bài tập có lời giải trên mặt trang
```mat-trang
**Câu hỏi:** Robot có hai trạng thái $h$ (hoạt động), $n$ (nghỉ), $P=\begin{pmatrix}0{,}7&0{,}3\\0{,}2&0{,}8\end{pmatrix}$, $\mu_0=(1;\,0)$ (Bài tập 13.1).
(a) Tính $\mu_1$ và $\mu_2$. (b) Giải thích vì sao xác suất ở $h$ sau hai bước khác $0{,}7^2$.
[fragment] **Lời giải:** (a) $\mu_1=(1;\,0)P=(0{,}7;\,0{,}3)$.
[fragment] $\mu_2=\mu_1P=(0{,}49+0{,}06;\ 0{,}21+0{,}24)=(0{,}55;\,0{,}45)$.
[fragment] (b) Theo (4.4), $h\to h\to h$ có xác suất $0{,}49$, $h\to n\to h$ có $0{,}06$; $0{,}7^2$ chỉ tính đường thứ nhất.
[fragment] Kiểm tra: $0{,}49+0{,}06=0{,}55=\mu_2(h)$.
```
- Ghi chú diễn giả: gợi ý của ghi chú: nhân vector hàng với $P$ từ bên phải (Mệnh đề 13.2); ở (b), liệt kê các đường đi từ $h$ tới $h$ sau hai bước và tính xác suất mỗi đường theo (4.4). Nhầm lẫn dễ gặp: lấy $0{,}7^2$ là bỏ đường $h\to n\to h$, tức bỏ khả năng robot nghỉ một bước rồi hoạt động lại. Kiểm tra cuối cùng: tổng hai tọa độ của $\mu_2$ bằng $1$.
- Lý do: bài tập của cụm xích Markov với lời giải trên mặt trang (NT24); đo MT 1. Nối sau: mạch 3 thêm hành động. Câu nối lên mặt trang ở L13-3-01. Nguồn: Bài tập 13.1 d.331–363. Thời lượng: 2 phút (cộng thời gian làm bài ngoài 120 phút).

### 6.3. Mạch 3 — Quá trình quyết định Markov và giá trị của chính sách (26 phút)

#### L13-3-00 · 3. Quá trình quyết định Markov và giá trị của chính sách · tiêu đề mạch (`id="mach-3"`)
```mat-trang
Giá trị của một cách chọn hành động cố định là nghiệm của một hệ phương trình tuyến tính.
Quá trình quyết định Markov · Chính sách · Tổng thưởng chiết khấu · Hàm giá trị · Phương trình Bellman
```
- Ghi chú diễn giả: xích Markov của mạch 2 có một ma trận chuyển cố định; robot của mạch mở đầu có hai hành động, mỗi hành động một hàng chuyển và một phần thưởng. Mô hình có điều khiển, chính sách và tổng thưởng chiết khấu dẫn tới phương trình $V=T^\pi V$, có nghiệm duy nhất là giá trị của chính sách dừng. Giá trị nhìn trước một bước $Q_U$ được dùng lại ở mạch 4 để chọn hành động.
- Lý do: NT12. Điểm vào mạch 3; dòng dẫn nêu kết quả cốt lõi của mạch (không là bước `vấn đề` của khái niệm đầu tiên). Thời lượng: 0,5 phút.

#### L13-3-01 · Quá trình quyết định Markov hữu hạn · vấn đề + định nghĩa
```mat-trang
Mỗi hành động chọn một hàng chuyển tiếp; cần giá trị dài hạn của một cách chọn cố định.
**Định nghĩa 13.5.** *Quá trình quyết định Markov* (Markov decision process, MDP) hữu hạn gồm:
$\mathcal S$, $\mathcal A(s)$ hữu hạn, khác rỗng (O1);
tập *phần thưởng* (reward) hữu hạn $\mathcal R\subset[-R_{\max},R_{\max}]$ (M2);
mô hình chuyển $p(s',c\mid s,a)\ge0$ với $\sum_{s'}\sum_{c}p(s',c\mid s,a)=1$;
*hệ số chiết khấu* (discount factor) $\gamma\in[0,1)$ (O2).
```
- Ghi chú diễn giả: với robot: $\mathcal S=\{h,z\}$, $\mathcal A(h)=\{A,B\}$, tại $z$ chỉ có một hành động, $\mathcal R=\{0;\,0{,}6;\,1\}$, $R_{\max}=1$, $\gamma=0{,}9$. Năm thành phần là đối tượng cố định; trạng thái, hành động và phần thưởng trên một quỹ đạo là ngẫu nhiên. Ba nhãn (O1), (M2), (O2) là giả thiết của bài, các chứng minh sau dẫn lại bằng nhãn: (O1) cho cực đại theo hành động đạt được, (M2) cho mọi lịch sử là biến rời rạc, (O2) cho phần đuôi tiến về $0$.
- Lý do: trang nội dung đầu của mạch 3: dòng 1 nêu câu hỏi của mạch (NT13, T6); định nghĩa trung tâm của bài, mỗi giả thiết gắn nhãn tại lời phát biểu đầu tiên (quyết định điểm 4, T4). Tách khỏi phần lịch sử và (5.1)–(5.2) (L13-3-02) để giữ trần 60 và định nghĩa $\tau$, $s_\tau$ trước khi dùng (T5, T11). Nối trước: xích Markov; sau: lịch sử và giả thiết Markov có điều khiển. MT: 2. Nguồn: d.369–371, Định nghĩa 13.5 d.377–384, giả thiết d.113–120. Thời lượng: 1,5 phút.

#### L13-3-02 · Lịch sử và giả thiết Markov có điều khiển · định nghĩa + giả thiết
```mat-trang
*Lịch sử* (history) $H_t=(S_0,A_0,R_1,\ldots,A_{t-1},R_t,S_t)$; $\tau$ là một giá trị của $H_t$, trạng thái cuối $s_\tau$.
*Tác tử* (agent) quan sát $H_t$, chọn $A_t\in\mathcal A(S_t)$; môi trường sinh $S_{t+1}$ và $R_{t+1}$.
**Giả thiết:** Markov có điều khiển, thuần nhất (M1): với mọi $t$, $\tau$, $a$ có $\mathbb P(H_t=\tau,A_t=a)>0$,
$$\mathbb P(S_{t+1}=s',R_{t+1}=c\mid H_t=\tau,A_t=a)=p(s',c\mid s_\tau,a).\tag{5.1}$$
*Xác suất chuyển* và *phần thưởng kỳ vọng một bước*:
$$P(s'\mid s,a)=\sum_{c\in\mathcal R}p(s',c\mid s,a),\qquad r(s,a)=\sum_{s'}\sum_{c}c\,p(s',c\mid s,a).\tag{5.2}$$
```
- Ghi chú diễn giả: với robot, $p(h,1\mid h,A)=p(z,1\mid h,A)=1/2$, nên $P(h\mid h,A)=1/2$ và $r(h,A)=1$. $R_{t+1}$ là phần thưởng quan sát được, ngẫu nhiên; $r(s,a)$ là trung bình của nó theo mô hình. Giả thiết Markov áp dụng cho cả phần thưởng: một biến ẩn ảnh hưởng phần thưởng tương lai phải được đưa vào trạng thái. Khi phần thưởng là hàm tất định $r(s,a,s')$ của bước chuyển, $r(s,a)=\sum_{s'}P(s'\mid s,a)\,r(s,a,s')$ (d.410).
- Lý do: định nghĩa $H_t$, $\tau$, $s_\tau$ trước khi (5.1) dùng chúng (NT9, T5); giả thiết (M1) gắn nhãn tại lời phát biểu (quyết định điểm 4). Trang `thêm` do tách L13-3-01 (T11, NT27). Nối trước: năm thành phần của MDP; sau: quy tắc chọn hành động. MT: 2. Nguồn: Định nghĩa 13.5 d.386–406, d.408–410, (M1) d.113. Thời lượng: 1,5 phút.

#### L13-3-03 · Chính sách · định nghĩa
```mat-trang
**Định nghĩa 13.6.** *Chính sách* (policy) tổng quát $\rho$: $\mathbb P(A_t=a\mid H_t=\tau)=\rho_t(a\mid\tau)$, phụ thuộc được thời gian, lịch sử và có thể ngẫu nhiên.
*Chính sách Markov dừng* (stationary Markov policy) $\pi$: $\rho_t(a\mid\tau)=\pi(a\mid s_\tau)$; *tất định* (deterministic) khi chọn $\pi(s)$ với xác suất $1$.
$$P^\pi(s,s')=\sum_{a}\pi(a\mid s)\,P(s'\mid s,a),\qquad r^\pi(s)=\sum_{a}\pi(a\mid s)\,r(s,a).\tag{5.3}$$
Cố định $\rho$ và $S_0=s$: $\mathbb P_\rho$, $\mathbb E_\rho$ là xác suất và kỳ vọng theo phân phối quỹ đạo.
Dưới $\pi$: $(S_t)$ là xích Markov thuần nhất, ma trận chuyển $P^\pi$.
```
- Ghi chú diễn giả: quy luật môi trường $p$ và quy tắc chọn $\rho$ là hai đối tượng riêng; cố định $\rho$ và $S_0=s$ thì phân phối của mọi lịch sử xác định bằng quy tắc nhân, lần lượt cho từng hành động và từng bước chuyển (d.436–444). Với $\pi$ dừng, xác suất toàn phần theo $A_t$ cho $\mathbb P_\pi(S_{t+1}=s'\mid H_t=\tau)=P^\pi(s_\tau,s')$, nên Mệnh đề 13.2 áp dụng. Dưới chính sách phụ thuộc lịch sử, riêng dãy $(S_t)$ nói chung không còn là xích Markov, dù môi trường thỏa (5.1). Chính sách trộn đều của robot cho $P^\pi(h,h)=0{,}75$ (Ví dụ 13.4).
- Lý do: đối tượng được so sánh trong câu hỏi trung tâm; nối MDP với xích Markov của mạch 2. MT: 2. Nguồn: Định nghĩa 13.6 d.414–434, d.436–446. Thời lượng: 2,5 phút.

#### L13-3-04 · Tổng thưởng chiết khấu và hàm giá trị · vấn đề + trực quan + định nghĩa + kết quả phụ
```mat-trang
Luôn chọn $B$, cộng không trọng số: $0{,}6+0{,}6+\cdots=+\infty$. **Trực quan.** Nhân phần thưởng sau $t$ bước với $\gamma^t$.
**Định nghĩa 13.7.** *Tổng thưởng chiết khấu* (discounted return) $G_t=\sum_{j\ge0}\gamma^jR_{t+j+1}$ (5.4); *hàm giá trị* (value function) $V^\rho(s)=\mathbb E_\rho[G_0\mid S_0=s]$.
*Giá trị tối ưu* (optimal value) $V^*(s)=\sup_\rho V^\rho(s)$ (5.5); $\rho^*$ *tối ưu* khi $V^{\rho^*}=V^*$.
**Mệnh đề 13.8.** Với mọi $\rho$, mọi quỹ đạo và mọi $K\ge0$:
$$\lvert G_t\rvert\le\frac{R_{\max}}{1-\gamma},\qquad\Bigl\lvert\sum_{t\ge K}\gamma^tR_{t+1}\Bigr\rvert\le\frac{\gamma^KR_{\max}}{1-\gamma},\qquad\lvert V^\rho(s)\rvert\le\frac{R_{\max}}{1-\gamma}.\tag{5.6}$$
**Ý nghĩa:** $V^*$ hữu hạn; cắt sau $K$ bước thì sai không quá $\gamma^KR_{\max}/(1-\gamma)$.
```
- Ghi chú diễn giả: chứng minh Mệnh đề 13.8: so với cấp số nhân, $\sum_j\gamma^j\lvert R_{t+j+1}\rvert\le R_{\max}/(1-\gamma)$ vì $\lvert R_{t+1}\rvert\le R_{\max}$ (M2) và $0\le\gamma<1$ (O2); phần đuôi cùng phép so sánh; $G_0$ bị chặn nên kỳ vọng tồn tại. $V^*$ là cận trên đúng theo mọi chính sách tổng quát, kể cả phụ thuộc lịch sử. $r(s,a)$ là phần thưởng kỳ vọng của một bước, $V^\rho$ gán một số cho cả chuỗi lựa chọn. Số bước $K$ để phần đuôi không vượt $\varepsilon$ tăng khi $\gamma\to1$; khi $\gamma=0$, $G_0=R_1$: chỉ tính bước đầu (d.528). Robot: $R_{\max}=1$, chặn $10$.
- Lý do: tiêu chuẩn đánh giá một chuỗi quyết định; đi theo vấn đề → trực quan → định nghĩa (NT8). Mệnh đề 13.8 là kết quả phụ (§4). Mật độ: 6 dòng, xem §6.8. MT: 2. Nguồn: d.470, Định nghĩa 13.7 d.472–484, d.486, Mệnh đề 13.8 d.488–526, d.528. Thời lượng: 2,5 phút.

#### L13-3-05 · Bài tập: tổng thưởng chiết khấu của một dãy phần thưởng vô hạn · bài tập có lời giải
```mat-trang
**Câu hỏi:** Cho $\gamma=0{,}9$ và dãy phần thưởng $R_1=2$, $R_k=7$ với mọi $k\ge2$. Tính $G_1$ và $G_0$ theo (5.4) (Bài tập 13.4).
[fragment] **Lời giải:** $G_1=\sum_{j\ge0}\gamma^jR_{j+2}=7\sum_{j\ge0}0{,}9^j=7/0{,}1=70$.
[fragment] $G_0=R_1+\gamma G_1=2+0{,}9\cdot70=65$.
[fragment] Kiểm tra: với $R_{\max}=7$, (5.6) cho $\lvert G_t\rvert\le70$; $G_1$ đạt dấu bằng vì mọi phần thưởng từ thời điểm $1$ bằng $R_{\max}$.
```
- Ghi chú diễn giả: gợi ý của tệp bài tập: $G_1$ chỉ chứa các phần thưởng bằng $7$, nên là tổng của một cấp số nhân; tách số hạng đầu của $G_0$ để viết $G_0$ theo $G_1$. Tách số hạng $j=0$ và đổi chỉ số $j\mapsto j+1$ cho $G_0=R_1+\gamma G_1$, tức đẳng thức $G_t=R_{t+1}+\gamma G_{t+1}$ với $t=0$. Kiểm trực tiếp: $G_0=2+7\cdot0{,}9/0{,}1=65$. Nguồn bài: Sutton và Barto (2018), Bài 3.9.
- Lý do: bài tập có lời giải của cụm MDP và tổng thưởng (NT24); dẫn trực tiếp vào đệ quy một bước. MT: 2. Nguồn: Bài tập 13.4 bt d.29–54. Thời lượng: 2 phút.

#### L13-3-06 · Giá trị nhìn trước một bước · trực quan + định nghĩa
```mat-trang
**Trực quan.** $G_t=R_{t+1}+\gamma G_{t+1}$: giá trị tại $s$ bằng thưởng bước đầu cộng $\gamma$ nhân giá trị kỳ vọng tại trạng thái kế tiếp.
**Định nghĩa 13.9.** Với $U:\mathcal S\to\mathbb R$ (một vector của $\mathbb R^{\lvert\mathcal S\rvert}$), *giá trị nhìn trước một bước* (one-step lookahead value) là
$$Q_U(s,a)=r(s,a)+\gamma\sum_{s'\in\mathcal S}P(s'\mid s,a)\,U(s').\tag{5.7}$$
*Toán tử Bellman theo chính sách* (policy Bellman operator) của $\pi$ dừng: $(T^\pi U)(s)=\sum_a\pi(a\mid s)\,Q_U(s,a)$ (5.8), tức
$$T^\pi U=r^\pi+\gamma P^\pi U.\tag{5.9}$$
```
- Ghi chú diễn giả: $Q_U(s,a)$ là phần thưởng kỳ vọng khi chọn $a$ tại $s$ cộng $\gamma$ nhân giá trị trung bình của $U$ tại trạng thái kế tiếp, khi $U$ thay cho giá trị thật của phần còn lại. (5.9) có được khi thay (5.7) vào (5.8), đổi thứ tự hai tổng hữu hạn và dùng (5.3). Với robot, $Q_U(h,A)=1+0{,}45\,U(h)+0{,}45\,U(z)$, $Q_U(h,B)=0{,}6+0{,}9\,U(h)$ (d.567).
- Lý do: đại lượng "một bước + phần còn lại" dùng trong mọi phương trình Bellman của bài. MT: 3. Nguồn: d.532, Định nghĩa 13.9 d.534–555, d.557–567. Thời lượng: 2,5 phút.

#### L13-3-07 · So sánh theo từng bước · trực quan + kết quả chính
```mat-trang
**Trực quan.** Mỗi bước không làm tăng $U$ theo kỳ vọng; cộng dồn $K$ bước, phần dư $\gamma^KU(S_K)$ tiến về $0$.
**Bổ đề 13.11.** **Giả thiết:** chính sách $\rho$, trạng thái đầu $s$, hàm $U:\mathcal S\to\mathbb R$; với mọi $t\ge0$, mọi $\tau$ có $\mathbb P_\rho(H_t=\tau\mid S_0=s)>0$:
$$\sum_{a}\rho_t(a\mid\tau)\,Q_U(s_\tau,a)\le U(s_\tau).\tag{5.11}$$
**Kết luận:** $V^\rho(s)\le U(s)$; nếu (5.11) xảy ra dấu bằng với mọi $t$, $\tau$ như trên thì $V^\rho(s)=U(s)$.
```
- Ghi chú diễn giả: Bổ đề 13.10 phân hoạch theo hành động $A_t$ (kỳ vọng toàn phần, Định lý 10.29) rồi dùng (5.1) cho từng hành động; kỳ vọng của một bước nhìn trước chỉ phụ thuộc lịch sử qua trạng thái hiện tại và phân phối hành động tại lịch sử đó. Bổ đề 13.11 được dùng hai lần: với dấu bằng cho chính sách dừng (Định lý 13.12), với dấu "$\le$" cho mọi chính sách khi so với giá trị tối ưu. Việc so sánh tổng thưởng vô hạn bước rút về một bất đẳng thức một bước tại từng lịch sử.
- Lý do: công cụ trung tâm của mạch 3 và mạch 5; kết quả chính (§4). Bổ đề 13.10 chuyển sang dòng đầu của trang ý tưởng chứng minh, nơi nó được dùng (T11). Trực quan nêu cơ chế cộng dồn, không lặp kết luận (L11). MT: 3. Nguồn: d.622, Bổ đề 13.11 d.624–640. Thời lượng: 2,5 phút.

#### L13-3-08 · Ý tưởng chứng minh: so sánh theo từng bước · ý tưởng chứng minh
```mat-trang
**Bổ đề 13.10.** $\mathbb E_\rho[R_{t+1}+\gamma U(S_{t+1})\mid H_t=\tau]=\sum_a\rho_t(a\mid\tau)Q_U(s_\tau,a)$ (5.10), từ kỳ vọng toàn phần theo $A_t$ và (5.1) (giả thiết M1).
Đặt $D_t=\gamma^tR_{t+1}+\gamma^{t+1}U(S_{t+1})-\gamma^tU(S_t)$; (5.10), (5.11) và kỳ vọng toàn phần theo $H_t$ cho $\mathbb E_\rho[D_t\mid S_0=s]\le0$ (M2, O1).
**Nhắc lại:** tổng lồng (telescoping sum) trên mỗi quỹ đạo, các số hạng giữa triệt tiêu:
$$\sum_{t=0}^{K-1}D_t=\sum_{t=0}^{K-1}\gamma^tR_{t+1}+\gamma^KU(S_K)-U(S_0).$$
Lấy kỳ vọng, cộng phần đuôi (5.6): $V^\rho(s)\le U(s)+\gamma^K\bigl(\lVert U\rVert_\infty+R_{\max}/(1-\gamma)\bigr)$; cho $K\to\infty$ (giả thiết O2).
Với $\gamma=1$, $\gamma^K\not\to0$: bước cuối hỏng.
```
- Ghi chú diễn giả: Bổ đề 13.10 cho kỳ vọng của một bước nhìn trước chỉ phụ thuộc lịch sử qua trạng thái hiện tại và phân phối hành động tại lịch sử đó. $H_t$ nhận hữu hạn giá trị nhờ (M2) và (O1), nên kỳ vọng toàn phần theo $H_t$ là một tổng hữu hạn. Trường hợp dấu bằng: $\mathbb E_\rho[D_t\mid S_0=s]=0$ và cùng phép chặn phần đuôi cho $\lvert V^\rho(s)-U(s)\rvert\le\gamma^K(\lVert U\rVert_\infty+R_{\max}/(1-\gamma))\to0$. Mọi đại lượng bị chặn nên dùng được tuyến tính của kỳ vọng. Bài 04 và 05b dùng tổng lồng trong các chứng minh hội tụ.
- Lý do: NT6 (trang ý tưởng riêng, bốn bước, giả thiết ở từng bước, bỏ O2 thì hỏng ở bước cuối); tổng lồng đã có ở deck 04, 05b nên dùng "Nhắc lại:" (L1). MT: 3. Nguồn: Bổ đề 13.10 d.571–620, chứng minh Bổ đề 13.11 d.642–708. Thời lượng: 3 phút.

#### L13-3-09 · Phương trình Bellman cho chính sách dừng · kết quả chính + ứng dụng
```mat-trang
**Giả thiết:** MDP hữu hạn; $\pi$ Markov dừng; giá trị, thưởng là vector cột theo cùng thứ tự trạng thái.
**Kết luận:** $I-\gamma P^\pi$ khả nghịch, và $V^\pi$ là nghiệm duy nhất của $V=T^\pi V$ (Định lý 13.12):
$$V^\pi(s)=r^\pi(s)+\gamma\sum_{s'}P^\pi(s,s')\,V^\pi(s'),\qquad V^\pi=(I-\gamma P^\pi)^{-1}r^\pi.\tag{5.12}$$
**Ý nghĩa:** *đánh giá chính sách* (policy evaluation) khi biết $P$, $r$ là giải hệ tuyến tính $\lvert\mathcal S\rvert$ ẩn.
Khi $\lvert\mathcal S\rvert$ lớn, lặp $V\leftarrow r^\pi+\gamma P^\pi V$.
```
- Ghi chú diễn giả: phương trình nói giá trị hiện tại bằng thưởng một bước cộng $\gamma$ nhân giá trị trung bình kế tiếp, cho cả vector cùng lúc. (5.12) cũng là điều kiện nhất quán mà các thuật toán học giá trị nhắm tới khi học từ dữ liệu (d.758). Phép lặp $V\leftarrow r^\pi+\gamma P^\pi V$ hội tụ vì $T^\pi$ co với hệ số $\gamma$ (Mệnh đề 13.16).
- Lý do: kết quả chính của mạch 3 (§4), bước "phát biểu" và "ứng dụng". MT: 3. Nguồn: d.710, Định lý 13.12 d.712–726, d.758. Thời lượng: 2,5 phút.

#### L13-3-10 · Ý tưởng chứng minh: phương trình Bellman cho chính sách dừng · ý tưởng chứng minh
```mat-trang
$P^\pi$ là ma trận hàng ngẫu nhiên, nên với mọi $U$:
$$\lvert(P^\pi U)(s)\rvert\le\sum_{s'}P^\pi(s,s')\,\lvert U(s')\rvert\le\lVert U\rVert_\infty.$$
Nếu $(I-\gamma P^\pi)U=0$ thì $\lVert U\rVert_\infty\le\gamma\lVert U\rVert_\infty$, nên $U=0$ (giả thiết O2): $I-\gamma P^\pi$ khả nghịch.
$W=(I-\gamma P^\pi)^{-1}r^\pi$ thỏa $W=T^\pi W$, tức (5.11) với dấu bằng cho $\rho=\pi$, $U=W$.
Bổ đề 13.11 cho $V^\pi=W$; nghiệm $V$ khác của $V=r^\pi+\gamma P^\pi V$ thỏa $(I-\gamma P^\pi)V=r^\pi$, nên $V=W$.
Với $\gamma=1$, bước thứ hai chỉ cho $\lVert U\rVert_\infty\le\lVert U\rVert_\infty$.
```
- Ghi chú diễn giả: ma trận vuông có hạt nhân chỉ gồm vector $0$ thì khả nghịch. Bước ba và bốn dùng Bổ đề 13.11 với dấu bằng: với $\rho=\pi$, $\rho_t(a\mid\tau)=\pi(a\mid s_\tau)$ tại mọi lịch sử, nên $\sum_a\pi(a\mid s_\tau)Q_W(s_\tau,a)=(T^\pi W)(s_\tau)=W(s_\tau)$. Đánh giá một chính sách dừng khi biết mô hình là giải một hệ tuyến tính $\lvert\mathcal S\rvert$ ẩn.
- Lý do: NT6. MT: 3. Nguồn: chứng minh Định lý 13.12 d.728–756. Thời lượng: 2,5 phút.

#### L13-3-11 · Ví dụ: ba chính sách dừng của robot · ví dụ
```mat-trang
Robot: $A$ thưởng $1$, ở lại $h$ với xác suất $1/2$; $B$ thưởng $0{,}6$, luôn ở lại $h$; $\gamma=0{,}9$; $V(z)=0$ (Ví dụ 13.5). Tính $V^A(h)$, $V^B(h)$, $V^\pi(h)$.
Luôn chọn $A$: $V^A(h)=1+0{,}45\,V^A(h)$, nên $V^A(h)=20/11\approx1{,}82$.
Luôn chọn $B$: $V^B(h)=0{,}6+0{,}9\,V^B(h)$, nên $V^B(h)=6$.
Trộn đều (Ví dụ 13.4): $r^\pi(h)=0{,}8$, $P^\pi(h,h)=0{,}75$; $V^\pi(h)=0{,}8+0{,}675\,V^\pi(h)=32/13\approx2{,}46$.
**Diễn giải:** chọn thưởng tức thời lớn nhất ($A$) cho giá trị thấp nhất; còn phải so $6$ với mọi chính sách.
```
- Ghi chú diễn giả: $P^\pi(h,h)=\tfrac12\cdot\tfrac12+\tfrac12\cdot1=0{,}75$, $r^\pi(h)=\tfrac12\cdot1+\tfrac12\cdot0{,}6$ theo (5.3); trước khi chọn chính sách robot không có một ma trận chuyển duy nhất, sau khi cố định $\pi$ robot là một xích Markov với ma trận $P^\pi$. Kiểm: $1+0{,}45\cdot\tfrac{20}{11}=\tfrac{20}{11}$, $0{,}8+0{,}675\cdot\tfrac{32}{13}=\tfrac{32}{13}$. Số chính sách tất định dừng là $\prod_s\lvert\mathcal A(s)\rvert$, tăng theo hàm mũ của số trạng thái; tập chính sách phụ thuộc lịch sử còn lớn hơn (d.796), nên cần một phương trình chọn hành động trực tiếp.
- Lý do: ví dụ của Định lý 13.12 trên ví dụ xuyên suốt (NT23), trả lời một phần câu hỏi mở đầu (hai số $20/11$, $6$ của L13-1-06). Gộp Ví dụ 13.4 vào đây (`gộp`: số của Ví dụ 13.4 chỉ dùng cho chính sách trộn đều; tiết kiệm một trang). Câu nối sang mạch 4 trên mặt trang ("còn cần so $6$ với mọi chính sách"). MT: 3, 5. Nguồn: Ví dụ 13.4 d.450–466, Ví dụ 13.5 d.762–794, d.796. Thời lượng: 2,5 phút.

### 6.4. Mạch 4 — Toán tử Bellman tối ưu và ánh xạ co (20 phút)

#### L13-4-00 · 4. Toán tử Bellman tối ưu và ánh xạ co · tiêu đề mạch (`id="mach-4"`)
```mat-trang
Lặp phép chọn hành động tốt nhất một bước hội tụ, vì mỗi lần lặp thu hẹp sai số theo hệ số chiết khấu.
Toán tử Bellman tối ưu · Chính sách tham lam · Ánh xạ co · Điểm bất động · Lặp giá trị
```
- Ghi chú diễn giả: phương trình $V=T^\pi V$ chỉ đánh giá một chính sách đã cố định, và số chính sách tăng theo hàm mũ của số trạng thái. Toán tử $T$ đưa phép chọn hành động tốt nhất vào một phương trình; tính co hệ số $\gamma$ cho $U=TU$ đúng một nghiệm và cho lặp giá trị hội tụ tới nghiệm đó. Mạch 5 chứng minh nghiệm ấy là giá trị tối ưu.
- Lý do: NT12. Điểm vào mạch 4; dòng dẫn nêu ý cốt lõi (ngoài hành trình khái niệm). Thời lượng: 0,5 phút.

#### L13-4-01 · Toán tử Bellman tối ưu · vấn đề + trực quan + định nghĩa
```mat-trang
Liệt kê cần so $\prod_s\lvert\mathcal A(s)\rvert$ chính sách tất định dừng.
**Trực quan.** Thưởng một bước cộng giá trị kế tiếp kỳ vọng, rồi chọn cực đại.
**Định nghĩa 13.13.** *Toán tử Bellman tối ưu* (Bellman optimality operator) $T$ trên $\mathbb R^{\lvert\mathcal S\rvert}$:
$$(TU)(s)=\max_{a\in\mathcal A(s)}Q_U(s,a)=\max_{a\in\mathcal A(s)}\Bigl[r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\,U(s')\Bigr].\tag{6.1}$$
*Chính sách tham lam* (greedy policy) theo $U$: $\pi_U(s)\in\operatorname{argmax}_aQ_U(s,a)$ (6.2).
**Câu hỏi:** $U=TU$ có nghiệm duy nhất không, và lặp $U\leftarrow TU$ có hội tụ không?
```
- Ghi chú diễn giả: khi hòa, chọn theo một quy tắc cố định. Cực đại đạt vì $\mathcal A(s)$ hữu hạn (O1), nên chính sách tham lam luôn tồn tại; $T^{\pi_U}U=TU$ và $T^\pi U\le TU$ theo từng tọa độ. Đây là bước Bellman của Định lý 07.49, với trạng thái kế tiếp tất định thay bằng tổng có trọng số xác suất và cực tiểu chi phí thay bằng cực đại thưởng. $T^\pi$ lấy trung bình theo hành động, $T$ lấy cực đại. Với robot, $(TU)(h)=\max\{1+0{,}45U(h)+0{,}45U(z);\ 0{,}6+0{,}9U(h)\}$, $(TU)(z)=0{,}9U(z)$; với $U=0$ hai giá trị nhìn trước tại $h$ là $1$ và $0{,}6$, chính sách tham lam chọn $A$ (chỉ nhìn một bước); với $U=(6;\,0)$ là $3{,}7$ và $6$, chọn $B$ (d.833).
- Lý do: câu hỏi của mạch trên mặt trang (dòng cuối, NT13, T6), câu nối từ L13-3-11 ở dòng 1; dòng "Cực đại đạt vì (O1); $T^{\pi_U}U=TU$" chuyển vào ghi chú diễn giả để giữ 6 dòng. Gộp ví dụ chính sách tham lam của robot (d.833) vào ghi chú diễn giả và vào bảng lặp L13-5-03 (hàng $k=0$ chọn $A$) để không trùng. MT: 3, 4. Nguồn: d.796–802, Định nghĩa 13.13 d.808–829, d.831–833. Thời lượng: 3 phút.

#### L13-4-02 · Ánh xạ co · vấn đề + định nghĩa + ví dụ + phản ví dụ
```mat-trang
Lặp $U\leftarrow TU$ hội tụ khi $T$ làm khoảng cách hai vector giảm theo tỉ lệ cố định nhỏ hơn $1$.
**Định nghĩa 13.14.** $F:\mathbb R^d\to\mathbb R^d$ là *ánh xạ co* (contraction mapping) với hệ số $\kappa\in[0,1)$ nếu
$$\lVert F(x)-F(y)\rVert_\infty\le\kappa\,\lVert x-y\rVert_\infty,\qquad x,y\in\mathbb R^d.$$
Điểm $\bar x$ thỏa $F(\bar x)=\bar x$ là *điểm bất động* (fixed point) của $F$.
**Ví dụ.** $F(x)=x/2+1$: $\lvert F(x)-F(y)\rvert=\tfrac12\lvert x-y\rvert$, $\kappa=1/2$, điểm bất động duy nhất $2$.
Phản ví dụ: $F(x)=x+1$ giữ nguyên khoảng cách, $x=x+1$ vô nghiệm.
```
- Ghi chú diễn giả: chuẩn cực đại đo sai lệch lớn nhất theo tọa độ, cũng là sai lệch lớn nhất theo trạng thái khi $x$ là một vector giá trị. Với $F(x)=x+1$, không có $\kappa<1$ nào dùng được vì $\lvert F(x)-F(y)\rvert=\lvert x-y\rvert$ với mọi $x,y$. Trên vector giá trị, $\lVert x-y\rVert_\infty$ là sai lệch lớn nhất giữa hai bảng giá trị theo trạng thái; tỉ lệ $\kappa$ phải cố định, cùng một số cho mọi cặp $x$, $y$.
- Lý do: định nghĩa cần trước Mệnh đề 13.16; hành trình vấn đề → định nghĩa → ví dụ → phản ví dụ của cụm ánh xạ co (NT8). MT: 4. Nguồn: d.837, Định nghĩa 13.14 d.839–848, d.850. Thời lượng: 2,5 phút.

#### L13-4-03 · Tính co của các toán tử Bellman · kết quả chính
```mat-trang
**Trực quan.** Cực đại của hai bảng lệch nhau không quá độ lệch lớn nhất giữa hai bảng.
**Bổ đề 13.15.** Với $f,g$ trên cùng một tập hữu hạn khác rỗng $\mathcal A$:
$$\Bigl\lvert\max_{a\in\mathcal A}f(a)-\max_{a\in\mathcal A}g(a)\Bigr\rvert\le\max_{a\in\mathcal A}\lvert f(a)-g(a)\rvert.\tag{6.3}$$
**Mệnh đề 13.16.** **Giả thiết:** MDP hữu hạn; $\pi$ Markov dừng. **Kết luận:** với mọi $U,W\in\mathbb R^{\lvert\mathcal S\rvert}$,
$$\lVert TU-TW\rVert_\infty\le\gamma\lVert U-W\rVert_\infty,\qquad\lVert T^\pi U-T^\pi W\rVert_\infty\le\gamma\lVert U-W\rVert_\infty.\tag{6.4}$$
**Ý nghĩa:** $T$, $T^\pi$ là ánh xạ co hệ số $\gamma$.
```
- Ghi chú diễn giả: hai cực đại có thể đạt tại hai hành động khác nhau; phép lấy cực đại không khuếch đại sai số (d.884). Kiểm bằng số của lặp giá trị cho robot: với $V_0=0$ và $V_1=(1;\,0)$, $\lVert TV_1-TV_0\rVert_\infty=\lvert1{,}5-1\rvert=0{,}5\le0{,}9\cdot1$. Phép lấy kỳ vọng theo trạng thái kế tiếp và phép chọn hành động không làm tăng sai số; chỉ hệ số chiết khấu làm sai số co lại (d.943). Chứng minh Bổ đề 13.15: với mọi $a$, $f(a)\le g(a)+\delta\le\max_bg(b)+\delta$, lấy cực đại vế trái, rồi đổi vai.
- Lý do: kết quả chính thứ nhất trong ba chứng minh trọng tâm (Q4); bước "Trực quan." đứng trước phát biểu, lấy từ d.884 (T7). Bổ đề 13.15 là kết quả phụ cùng trang. MT: 4. Nguồn: d.852, Bổ đề 13.15 d.854–885, Mệnh đề 13.16 d.887–903. Thời lượng: 2,5 phút.

#### L13-4-04 · Ý tưởng chứng minh: tính co của các toán tử Bellman · ý tưởng chứng minh
```mat-trang
Một hành động (giả thiết O2): $r(s,a)$ triệt tiêu; hàng $P(\cdot\mid s,a)$ không âm, tổng bằng $1$:
$$\lvert Q_U(s,a)-Q_W(s,a)\rvert\le\gamma\sum_{s'}P(s'\mid s,a)\,\lvert U(s')-W(s')\rvert\le\gamma\lVert U-W\rVert_\infty.$$
Toán tử $T$ (giả thiết O1): Bổ đề 13.15 với $f=Q_U(s,\cdot)$, $g=Q_W(s,\cdot)$, rồi cực đại theo $s$.
Toán tử $T^\pi$: trung bình theo $\pi(a\mid s)$ giữ nguyên chặn.
**Nhắc lại:** so với phần tử bất kỳ rồi lấy cận dưới đúng; ở đây lấy cực đại theo $a$.
Với $\gamma=1$, bước một chỉ cho hệ số $1$.
```
- Ghi chú diễn giả: bước một dùng bất đẳng thức tam giác và $P(s'\mid s,a)\ge0$, rồi tổng các xác suất chuyển bằng $1$; đây là chỗ duy nhất dùng chuẩn hóa hàng. Giả thiết O1 cho cực đại theo hành động đạt được. Trong Bổ đề 13.15, $f(a)\le\max_bg(b)+\delta$ với mọi $a$, $\delta=\max_a\lvert f(a)-g(a)\rvert$; vế phải $\max_bg(b)+\delta$ không phụ thuộc $a$, nên lấy cực đại vế trái theo $a$ rồi đổi vai $f$, $g$. Cùng mẹo này đã dùng ở Bài 12 với cận dưới đúng thay cho cực đại. Bài tập 13.2(a) lặp lại chứng minh với $\gamma=0{,}8$.
- Lý do: NT6, 3 bước có số (`<ol>`), "(giả thiết …)" ở bước dùng giả thiết (L2), bỏ O2 thì hỏng ở bước một. Mẹo đã giới thiệu ở deck 12 nên dùng một dòng "Nhắc lại:" với đúng tên của deck 12 (quyết định điểm 9–10, T1). MT: 4. Nguồn: chứng minh Bổ đề 13.15 d.867–885, chứng minh Mệnh đề 13.16 d.905–944. Thời lượng: 2,5 phút.

#### L13-4-05 · Điểm bất động của ánh xạ co · trực quan + ví dụ + kết quả chính
```mat-trang
**Trực quan.** $F(x)=x/2+1$ từ $x_0=0$: $x_1=1$, $x_2=1{,}5$, $x_3=1{,}75$; sai số $2;\,1;\,0{,}5;\,0{,}25$ giảm một nửa mỗi vòng.
**Giả thiết:** $F:\mathbb R^d\to\mathbb R^d$ là ánh xạ co hệ số $\kappa\in[0,1)$ trong chuẩn cực đại (Định lý 13.17).
**Bảo đảm:** $F$ có đúng một điểm bất động $\bar x$; với mọi $x_0$, dãy $x_{k+1}=F(x_k)$ hội tụ tới $\bar x$ và, với mọi $k\ge0$,
$$\lVert x_k-\bar x\rVert_\infty\le\kappa^k\lVert x_0-\bar x\rVert_\infty,\qquad\lVert x_k-\bar x\rVert_\infty\le\frac{\kappa^k}{1-\kappa}\lVert x_1-x_0\rVert_\infty.\tag{6.5}$$
Loại bảo đảm: tất định, tốc độ cấp số nhân hệ số $\kappa$, từ mọi điểm đầu.
```
- Ghi chú diễn giả: đây là trường hợp hữu hạn chiều của định lý điểm bất động Banach; chứng minh chỉ thừa nhận mọi dãy Cauchy số thực hội tụ (d.946). Bất đẳng thức thứ hai tính được từ hai phần tử đầu, không cần biết $\bar x$. Khi $\kappa=0$, $F$ là hằng và dãy tới điểm bất động sau một bước; với $0<\kappa<1$, sai số không vượt $\varepsilon$ khi $k\ge\ln(\lVert x_0-\bar x\rVert_\infty/\varepsilon)/\ln(1/\kappa)$, số này tăng khi $\kappa\to1$ (d.1011). Ở ví dụ, $x_k=2-2^{1-k}$ và bất đẳng thức thứ nhất xảy ra dấu bằng.
- Lý do: kết quả chính thứ hai (Q4). Dãy lặp của $F(x)=x/2+1$ là ví dụ mới (`thêm`, §5 mục 5): cho số cụ thể của tốc độ trước khi áp vào $T$. MT: 4. Nguồn: d.946, Định lý 13.17 d.948–962, d.1011. Thời lượng: 3 phút.

#### L13-4-06 · Ý tưởng chứng minh: điểm bất động của ánh xạ co · ý tưởng chứng minh
```mat-trang
Duy nhất: hai điểm bất động thỏa $\lVert\bar x-\bar y\rVert_\infty\le\kappa\lVert\bar x-\bar y\rVert_\infty$, mà $\kappa<1$.
Hiệu liên tiếp: quy nạp cho $\lVert x_{j+1}-x_j\rVert_\infty\le\kappa^j\delta_0$, với $\delta_0=\lVert x_1-x_0\rVert_\infty$.
Dãy Cauchy: bất đẳng thức tam giác và tổng cấp số nhân cho, với $\ell>k$,
$$\lVert x_\ell-x_k\rVert_\infty\le\sum_{j=k}^{\ell-1}\kappa^j\delta_0\le\frac{\kappa^k}{1-\kappa}\,\delta_0.\tag{6.6}$$
Giới hạn: mỗi tọa độ là dãy Cauchy số thực nên hội tụ (tính đầy đủ của $\mathbb R$); tính co cho $F(\bar x)=\bar x$.
Với $\kappa=1$: $F(x)=x+1$ không có điểm bất động.
```
- Ghi chú diễn giả: bước giới hạn: cho $\ell\to\infty$ trong bất đẳng thức tọa độ được $\lvert\bar x(i)-x_k(i)\rvert\le\kappa^k\delta_0/(1-\kappa)$, lấy cực đại trên $d$ tọa độ được bất đẳng thức thứ hai của (6.5). $\lVert F(\bar x)-\bar x\rVert_\infty\le\kappa\lVert\bar x-x_k\rVert_\infty+\lVert x_{k+1}-\bar x\rVert_\infty\to0$. Tốc độ: $\lVert x_k-\bar x\rVert_\infty=\lVert F(x_{k-1})-F(\bar x)\rVert_\infty\le\kappa\lVert x_{k-1}-\bar x\rVert_\infty$, quy nạp. Giả thiết $\kappa<1$ vào ở bước duy nhất và bước Cauchy. Bước Cauchy là chỗ duy nhất cần tổng cấp số nhân $\sum_{j\ge k}\kappa^j=\kappa^k/(1-\kappa)$.
- Lý do: NT6 (5 bước gộp thành 4 dòng; bất đẳng thức then chốt (6.6) ở công thức hiển thị). MT: 4. Nguồn: chứng minh Định lý 13.17 d.964–1012. Thời lượng: 3 phút.

#### L13-4-07 · Nguyên lý ánh xạ co · kỹ thuật + hệ quả + ứng dụng
```mat-trang
**Kỹ thuật.** $F$ co hệ số $\kappa<1$ thì $x=F(x)$ có nghiệm duy nhất và phép lặp hội tụ theo $\kappa^k$.
Dùng khi ẩn ở cả hai vế.
**Hệ quả 13.18.** **Giả thiết:** MDP hữu hạn; $T$, $T^\pi$ tính chính xác (O3).
**Bảo đảm:** $T$ có đúng một điểm bất động $\bar V$; *lặp giá trị* (value iteration) $V_{k+1}=TV_k$ từ mọi $V_0$ thỏa
$$\lVert V_k-\bar V\rVert_\infty\le\gamma^k\lVert V_0-\bar V\rVert_\infty,\qquad k\ge0;\tag{6.7}$$
và điểm bất động duy nhất của $T^\pi$ là $V^\pi$.
```
- Ghi chú diễn giả: Hệ quả 13.18 là Định lý 13.17 với $F=T$ (và $F=T^\pi$), $\kappa=\gamma$, nhờ Mệnh đề 13.16; điểm bất động của $T^\pi$ được nhận diện bằng Định lý 13.12. Bảo đảm là tất định, tốc độ cấp số nhân hệ số $\gamma$ trong chuẩn cực đại. Trong học máy: hệ quả giải thích sự hội tụ của một phép quy hoạch khi bảng $P,r$ được biết và các bước Bellman tính chính xác; sai số do lấy mẫu và do xấp xỉ hàm nằm ngoài hệ quả, vì $T$ không chứa các bước đó (d.1041). Với $\gamma=0{,}99$, cần khoảng $230$ vòng để giảm sai số $10$ lần ($0{,}99^{230}\approx0{,}099$). Bài 05b dùng phép co của dãy sai số một bước; ở đây phép co là tính chất của một ánh xạ. Còn phải chứng minh $\bar V=V^*$: $V^*$ định nghĩa bằng cận trên, $\bar V$ là nghiệm của một phương trình (d.1039).
- Lý do: trang "Kỹ thuật." của nguyên lý ánh xạ co, lần đầu trong các deck của học phần (NT7: tiêu đề là tên kỹ thuật, dạng tổng quát một dòng, "Dùng khi …", chỗ dùng trong bài là Hệ quả 13.18). Gộp phát biểu Hệ quả 13.18 (kết quả phụ) để chỗ dùng nằm ngay dưới kỹ thuật. Mật độ: xem §6.8. MT: 4. Nguồn: d.1014, Hệ quả 13.18 d.1016–1037, d.1039–1041. Thời lượng: 3 phút.

### 6.5. Mạch 5 — Giá trị tối ưu và chứng nhận sai số (22 phút)

#### L13-5-00 · 5. Giá trị tối ưu và chứng nhận sai số · tiêu đề mạch (`id="mach-5"`)
```mat-trang
Chính sách tham lam theo điểm bất động là tối ưu; dừng sớm vẫn cho chính sách có mất mát bị chặn.
Giá trị tối ưu · Phương trình Bellman tối ưu · Phần dư Bellman · Tiêu chuẩn dừng
```
- Ghi chú diễn giả: mạch 4 cho một vector $\bar V$ duy nhất với $\bar V=T\bar V$ và một thuật toán tìm nó. Định lý 13.19 chứng minh $\bar V=V^*$ và chính sách tham lam theo $\bar V$ tối ưu trong mọi chính sách, giải xong câu hỏi mở đầu của robot, cho tiêu chuẩn dừng có chứng nhận sai số, và chỉ ra điều gì hỏng khi $\gamma=1$. Mạch 6 bỏ giả thiết biết mô hình.
- Lý do: NT12. Điểm vào mạch 5 (ngoài hành trình khái niệm). Thời lượng: 0,5 phút.

#### L13-5-01 · Bellman tối ưu và chính sách tham lam tối ưu · vấn đề + trực quan + kết quả chính
```mat-trang
**Câu hỏi:** $\bar V=V^*$ không; dừng sau hữu hạn vòng thì mất bao nhiêu?
**Trực quan.** Tham lam giữ đúng $\bar V$; chọn khác lấy trung bình các $Q_{\bar V}$, không vượt cực đại.
**Giả thiết:** MDP; $\bar V=T\bar V$; $\pi^*$ tham lam theo $\bar V$ (Định lý 13.19).
**Kết luận:** $V^{\pi^*}=\bar V=V^*$: có chính sách tối ưu tất định dừng.
$V^*$ là nghiệm duy nhất của *phương trình Bellman tối ưu* (Bellman optimality equation)
$$V^*(s)=\max_{a\in\mathcal A(s)}\Bigl[r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\,V^*(s')\Bigr],\qquad s\in\mathcal S.\tag{6.8}$$
```
- Ghi chú diễn giả: giải $V^*=TV^*$, rồi tại mỗi trạng thái chọn hành động cực đại hóa $r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)V^*(s')$; hành động này không nhất thiết có thưởng tức thời lớn nhất. $V^*$ duy nhất, chính sách tối ưu có thể không duy nhất khi nhiều hành động cùng đạt cực đại (d.1108). Trong học máy, chính sách tham lam theo $V^*$ là cách trích chính sách từ hàm giá trị (Murphy (2023), §34.5.5, (34.84)); định lý cần mô hình $P,r$ đúng và trạng thái thỏa (5.1) (d.1110). Khi mỗi hàng dồn vào $f(s,a)$, (6.8) thành $V^*(s)=\max_a\{r(s,a)+\gamma V^*(f(s,a))\}$; phần *đọc thêm* của Nhận xét 13.20 cho Định lý 07.49 là trường hợp riêng hữu hạn bước.
- Lý do: câu hỏi của mạch, đủ hai phần (điểm bất động và dừng sớm), trên mặt trang dòng 1 (NT13, T6); trực quan nêu cơ chế, không trùng dòng "Kỹ thuật." của trang sau (L11); kết quả chính thứ ba (Q4). Ý "hành động tối ưu không nhất thiết có thưởng tức thời lớn nhất" có trên mặt trang ở L13-3-11 và L13-7-05, thay cho dòng "Ý nghĩa:" (giữ trần 60). MT: 3, 4. Nguồn: d.1039, d.1045, Định lý 13.19 d.1047–1068, d.1108–1110, Nhận xét 13.20 d.1112–1116. Thời lượng: 3 phút.

#### L13-5-02 · Ý tưởng chứng minh: phương trình Bellman tối ưu · ý tưởng chứng minh
```mat-trang
$\pi^*$ đạt cực đại (O1): $\sum_a\rho_t(a\mid\tau)Q_{\bar V}(s_\tau,a)=\bar V(s_\tau)$, dấu bằng trong (5.11); Bổ đề 13.11: $V^{\pi^*}=\bar V$.
Mọi $\rho$, kể cả phụ thuộc lịch sử: trung bình không vượt cực đại, (5.11) đúng với $U=\bar V$; Bổ đề 13.11: $V^\rho\le\bar V$.
Kẹp, với O2 qua Bổ đề 13.11:
$$\bar V(s)=V^{\pi^*}(s)\le\sup_\rho V^\rho(s)=V^*(s)\le\bar V(s).$$
Duy nhất: $U$ thỏa (6.8) thì $U=TU$, nên $U=\bar V$ (Hệ quả 13.18).
**Kỹ thuật.** Kẹp: một chính sách đạt cận, mọi chính sách không vượt.
```
- Ghi chú diễn giả: cả hai chiều là Bổ đề 13.11 với $U=\bar V$ (d.1045). Bước hai dùng $\rho_t(a\mid\tau)\ge0$, tổng bằng $1$, nên $\sum_a\rho_t(a\mid\tau)Q_{\bar V}(s_\tau,a)\le\max_bQ_{\bar V}(s_\tau,b)$; chiều này phủ cả chính sách ngẫu nhiên, phụ thuộc thời gian và lịch sử. Lặp giá trị tìm $\bar V$; định lý cho biết $\bar V$ là giá trị tối ưu, nên chỉ cần tìm trong các chính sách tất định dừng (d.1105).
- Lý do: NT6 (4 bước, bất đẳng thức kẹp ở công thức hiển thị, O2 vào qua Bổ đề 13.11). MT: 4. Nguồn: chứng minh Định lý 13.19 d.1070–1106. Thời lượng: 3 phút.

#### L13-5-03 · Ví dụ: lặp giá trị cho robot · ví dụ
```mat-trang
Robot: $A$ thưởng $1$, ở lại $h$ với xác suất $0{,}5$; $B$ thưởng $0{,}6$, luôn ở lại $h$; $\gamma=0{,}9$; $V_0=0$ (Ví dụ 13.6).
Đặt $v_k=V_k(h)$, có $V_k(z)=0$. Tính $v_1,\ldots,v_4$ và hành động đạt cực đại.
$$v_{k+1}=\max\{Q_{V_k}(h,A);\ Q_{V_k}(h,B)\}=\max\{1+0{,}45\,v_k;\ 0{,}6+0{,}9\,v_k\}.\tag{6.9}$$
| $k$ | $v_k$ | $Q_{V_k}(h,A)$ | $Q_{V_k}(h,B)$ | Hành động đạt cực đại | $v_{k+1}$ |
|---:|---:|---:|---:|---|---:|
| 0 | 0 | 1 | 0,6 | $A$ | 1 |
| 1 | 1 | 1,45 | 1,5 | $B$ | 1,5 |
| 2 | 1,5 | 1,675 | 1,95 | $B$ | 1,95 |
| 3 | 1,95 | 1,8775 | 2,355 | $B$ | 2,355 |
**Diễn giải:** vòng đầu chọn $A$ vì $V_0=0$ chưa chứa giá trị của phần đuôi; từ $k=1$, nhánh $B$ thắng.
```
- Ghi chú diễn giả: $(TV)(z)=0{,}9V(z)$ và $V_0(z)=0$ nên quy nạp cho $V_k(z)=0$. Cột "Hành động đạt cực đại" ghi hành động cho giá trị lớn hơn khi tính $v_{k+1}$ từ $v_k$. Hàng $k=0$ là chính sách tham lam theo $U=0$: nó chỉ thấy phần thưởng trước mắt. Mỗi hàng của bảng dùng toàn bộ vector $V_k$ của vòng trước, cập nhật đồng thời mọi trạng thái.
- Lý do: ví dụ của Hệ quả 13.18 và Định lý 13.19 trên ví dụ xuyên suốt (NT23), bắt đầu trả lời câu hỏi mở đầu. MT: 5. Nguồn: Ví dụ 13.6 d.1118–1141. Thời lượng: 3 phút.

#### L13-5-04 · Ví dụ: lặp giá trị cho robot, điểm bất động · ví dụ + hình
```mat-trang
Nhánh $B$: $v=0{,}6+0{,}9v$ cho $v=6$; tại $v=6$ nhánh $A$ bằng $3{,}7<6$, nên $(6;\,0)=T(6;\,0)$.
Hệ quả 13.18 và Định lý 13.19: $V^*(h)=6$, chính sách tối ưu chọn $B$ tại $h$.
$B$ thắng khi $0{,}45v\ge0{,}4$, tức $v\ge8/9$; với $k\ge1$, $v_k\ge1$.
Kiểm tra: $\lvert v_3-6\rvert=4{,}05\le0{,}9^3\cdot6=4{,}374$ theo (6.7).
**Diễn giải:** $k$ đếm vòng tính toán; robot chọn $B$ ở mọi thời điểm, đạt $6$ so với $20/11$.
[hình: img/lec-13/value-iteration.svg, cột phải hoặc dưới]
```
- Ghi chú diễn giả: $v_k\ge1$ với $k\ge1$ theo quy nạp: $v_1=1$, và $v_k\ge1$ kéo theo $v_{k+1}\ge0{,}6+0{,}9=1{,}5$. Bảng lặp không mô tả một quỹ đạo chọn $A$ rồi chuyển sang $B$. Hình: bên trái hai nhánh $1+0{,}45v$ và $0{,}6+0{,}9v$ đổi thứ tự tại $v=8/9$, nhánh trên cắt đường chéo tại $V^*(h)=6$; bên phải dãy $v_k$ tăng qua $1;\,1{,}5;\,1{,}95;\,2{,}355$ tới $6$, nhánh $A$ chỉ tạo $v_1$. Giá trị của luôn chọn $B$ tính bằng (5.12) ở Ví dụ 13.5 cũng là $6$. Câu trả lời cho câu hỏi mở đầu: chọn $B$.
- Lý do: trả lời câu hỏi mở đầu bằng số và hình (NT23 "Diễn giải:" gắn câu hỏi mạch); nhầm lẫn chỉ số vòng lặp với thời điểm. Mọi số trên hình ($8/9$, $6$, dãy lặp) có trên mặt trang (NT25). MT: 5. Nguồn: d.1143–1154. Thời lượng: 3 phút.

#### L13-5-05 · Chặn bằng phần dư Bellman · vấn đề + kết quả phụ
```mat-trang
(6.7) chứa $V^*$ chưa biết. *Phần dư Bellman* (Bellman residual, còn gọi là Bellman error) $\beta(V)=\lVert TV-V\rVert_\infty$ tính được khi biết mô hình.
**Giả thiết:** $V$ bất kỳ; $\pi_V$ tham lam theo $V$ (Hệ quả 13.21, Mệnh đề 13.22).
**Bảo đảm:** chặn tất định theo mô hình $P,r$ đang dùng:
$$\lVert V-V^*\rVert_\infty\le\frac{\beta(V)}{1-\gamma},\qquad\lVert TV-V^*\rVert_\infty\le\frac{\gamma\,\beta(V)}{1-\gamma};\tag{6.10}$$
$$\lVert V^{\pi_V}-V^*\rVert_\infty\le\frac{2\gamma}{1-\gamma}\,\lVert V-V^*\rVert_\infty.\tag{6.11}$$
**Nhắc lại:** chèn một đại lượng trung gian rồi chuyển vế; ở đây chèn $TV$: $\lVert V-V^*\rVert_\infty\le\beta(V)+\gamma\lVert V-V^*\rVert_\infty$.
```
- Ghi chú diễn giả: $\beta(V)$ đo mức một vector vi phạm phương trình Bellman. Điều kiện $\beta(V)\le(1-\gamma)\varepsilon$ đủ để $V$ cách $V^*$ không quá $\varepsilon$ và $TV$ cách $V^*$ không quá $\gamma\varepsilon$ (d.1198). Ví dụ 13.7: $V=(1{,}95;\,0)$ có $\beta=0{,}405$; chặn cho $4{,}05$ và $3{,}645$, đúng bằng sai số thật của $V$ và $TV$; chặn có hệ số $\gamma$ chỉ áp dụng cho $TV$. Với (6.11): chèn $T^{\pi_V}V=TV$ giữa $V^{\pi_V}=T^{\pi_V}V^{\pi_V}$ và $V^*=TV^*$, dùng tính co hai lần rồi chuyển vế; một vector sai lệch $\varepsilon$ cho chính sách tham lam mất không quá $2\gamma\varepsilon/(1-\gamma)$ tại mọi trạng thái.
- Lý do: tiêu chuẩn dừng cần một đại lượng tính được (câu hỏi mạch: "dừng sớm tốt đến mức nào"). Hai kết quả phụ cùng mẹo của deck 12, một dòng "Nhắc lại:" với đúng tên "chèn một đại lượng trung gian rồi chuyển vế" (quyết định điểm 9–10, T1); "Giả thiết:" và "Bảo đảm:" tách riêng, nêu loại bảo đảm (L3). Ví dụ 13.7 vào ghi chú diễn giả (`gộp`; Bài tập 13.2 trên mặt trang đã kiểm cùng chặn). MT: 4. Nguồn: d.1158, Hệ quả 13.21 d.1160–1199, d.1201, Mệnh đề 13.22 d.1203–1239, Ví dụ 13.7 d.1263–1282. Thời lượng: 2,5 phút.

#### L13-5-06 · Lặp giá trị với chứng nhận sai số · thuật toán + ứng dụng
```mat-trang
**Thuật toán 13.23.** **Đầu vào:** MDP hữu hạn, $P$, $r$ đã biết (*quy hoạch*, planning); $\gamma\in[0,1)$; $\varepsilon>0$; $V_0$.
Cập nhật: $W=TV_k$, $\beta_k=\lVert W-V_k\rVert_\infty$; nếu chưa dừng, $V_{k+1}=W$, tăng $k$.
Dừng khi $\beta_k\le(1-\gamma)\varepsilon$; dừng sau hữu hạn vòng vì $\beta_k\le\gamma^k\beta_0$.
**Đầu ra:** $V_k$ và $\pi_k$ tham lam theo $V_k$: $\lVert V_k-V^*\rVert_\infty\le\varepsilon$, $\lVert V^{\pi_k}-V^*\rVert_\infty\le2\gamma\varepsilon/(1-\gamma)$.
Chi phí mỗi vòng: bậc $\lvert\mathcal S\rvert^2\max_s\lvert\mathcal A(s)\rvert$ phép toán với bảng chuyển dày.
Robot, $\varepsilon=0{,}1$: dừng tại $k=39$, $v_{39}\approx5{,}9088$, $\pi_{39}$ chọn $B$.
```
- Ghi chú diễn giả: Thuật toán 13.23. Mỗi vòng tính $\sum_s\lvert\mathcal A(s)\rvert$ giá trị nhìn trước, mỗi giá trị cần một tổng trên $\lvert\mathcal S\rvert$ trạng thái kế tiếp; ít hơn khi chỉ cộng trên trạng thái kế tiếp có xác suất dương. $\beta_k=\lVert V_{k+1}-V_k\rVert_\infty\le\gamma^k\beta_0$ là bước hai của chứng minh Định lý 13.17; khi $\gamma=0$, $\beta_1=0$. Với robot: $\beta_k=0{,}5\cdot0{,}9^{k-1}$ với $k\ge1$, điều kiện dừng $\beta_k\le0{,}01$; sai số thật $6-v_{39}\approx0{,}0912\le0{,}1$; vì $v_k\ge1>8/9$ nên $\pi_{39}$ chọn $B$. Trong học máy: phần dư nhỏ chứng nhận đã gần giải đúng phương trình Bellman của $P,r$ đang dùng, không chứng nhận $P,r$ mô tả đúng robot thật (d.1259).
- Lý do: phương pháp của khung lý thuyết (thuật toán có đầu vào, cập nhật, điều kiện dừng, đầu ra, chi phí; AGENTS "Với thuật toán …"); thuật ngữ "quy hoạch" lên mặt trang trước khi mạch 6 dùng. MT: 4, 5. Nguồn: d.1241, Thuật toán 13.23 d.1243–1255, d.1257, d.1259. Thời lượng: 2,5 phút.

#### L13-5-07 · Bài tập: tính co và phần dư Bellman · bài tập có lời giải
```mat-trang
**Câu hỏi:** MDP hữu hạn, $\gamma=0{,}8$, phần thưởng bị chặn, các hàng xác suất chuyển chuẩn hóa (Bài tập 13.2).
(a) Chứng minh $\lVert TV-TW\rVert_\infty\le0{,}8\lVert V-W\rVert_\infty$ với mọi $V,W$.
(b) $\beta(V)=\lVert TV-V\rVert_\infty=0{,}02$: chặn sai số của $V$ và $TV$ so với $V^*$. (c) Chặn mất mát giá trị của chính sách tham lam theo $V$.
[fragment] **Lời giải:** (a) $\lvert Q_V(s,a)-Q_W(s,a)\rvert\le0{,}8\lVert V-W\rVert_\infty$, rồi Bổ đề 13.15.
[fragment] (b) Theo (6.10): $0{,}02/0{,}2=0{,}1$; $0{,}8\cdot0{,}02/0{,}2=0{,}08$.
[fragment] (c) Theo (6.11): $(2\cdot0{,}8/0{,}2)\cdot0{,}1=0{,}8$.
```
- Ghi chú diễn giả: gợi ý của ghi chú: ở (a), chặn sai khác của từng giá trị nhìn trước rồi dùng Bổ đề 13.15; ở (b) và (c), thay $\beta(V)=0{,}02$, $\gamma=0{,}8$ vào (6.10), rồi dùng chặn của $\lVert V-V^*\rVert_\infty$ trong (6.11). Ở (a), $\lvert Q_V(s,a)-Q_W(s,a)\rvert\le0{,}8\sum_{s'}P(s'\mid s,a)\lvert V(s')-W(s')\rvert$. Kiểm tra: chặn của $TV$ bằng $\gamma=0{,}8$ nhân chặn của $V$: $0{,}8\cdot0{,}1=0{,}08$. Các chặn đúng cho mô hình $P,r$ đang dùng.
- Lý do: bài tập có lời giải của cụm Bellman tối ưu, tính co và chứng nhận (NT24); đo MT 4. Nguồn: Bài tập 13.2 d.1286–1321. Thời lượng: 2 phút.

#### L13-5-08 · Ví dụ: hai mô hình không chiết khấu · phản ví dụ + câu nối
```mat-trang
Một trạng thái tự lặp, một hành động, $\gamma=1$ (Ví dụ 13.8). Xác định giá trị.
Thưởng $1$: tổng $+\infty$; $V(s)=1+V(s)$ vô nghiệm; lặp cho $V_k(s)=k$.
Thưởng $0$: $TV=V$, mọi số thực là điểm bất động.
*Trạng thái hấp thụ* (absorbing state) không thay được $\gamma<1$: luôn chọn $B$ không tới $z$.
**Diễn giải:** mô hình đầu ứng với $F(x)=x+1$.
Các kết quả trên đều giả sử biết chính xác $P$, $r$.
```
- Ghi chú diễn giả: với $\gamma=1$, bước một của chứng minh Mệnh đề 13.16 chỉ cho hệ số $1$; giá trị có thể vô hạn, hoặc phương trình Bellman có nhiều nghiệm (Nhận xét 13.24). Giả thiết duy nhất bị bỏ là $\gamma<1$. Cả hai mô hình hữu hạn và có phần thưởng bị chặn, nên không mâu thuẫn với Hệ quả 13.18 và Định lý 13.19. Bài toán hữu hạn bước có thể không cần chiết khấu và giải bằng truy hồi ngược như Bài 07. Câu cuối trên mặt trang nối sang mạch 6: các bảng $P$, $r$ phải học từ dữ liệu.
- Lý do: phản ví dụ khi bỏ giả thiết (NT4); câu nối giữa hai mạch trên mặt trang (NT13). MT: 4. Nguồn: §6.5 d.1325, Nhận xét 13.24 d.1327–1331, Ví dụ 13.8 d.1333–1341, d.1343. Thời lượng: 2,5 phút.

### 6.6. Mạch 6 — Học từ trải nghiệm (18 phút)

#### L13-6-00 · 6. Học từ trải nghiệm · tiêu đề mạch (`id="mach-6"`)
```mat-trang
Số đếm ước lượng mô hình chưa biết; mọi bảo đảm của quy hoạch chỉ thuộc về mô hình ước lượng.
Số đếm · Ước lượng hợp lý cực đại · Thăm dò · Mục tiêu Bellman từ mẫu · Trạng thái đủ thông tin
```
- Ghi chú diễn giả: lặp giá trị có chứng nhận cần $P$, $r$ đã biết; với một hệ thống mới, dữ liệu chỉ gồm các lần thử (trạng thái, hành động, phần thưởng, trạng thái kế tiếp). Số đếm cho MLE từng hàng chuyển, mục tiêu Bellman từ mẫu thay kỳ vọng bằng một kết quả quan sát, và hai tình huống cho thấy hậu quả khi mô hình sai hoặc trạng thái thiếu tính Markov (d.1347–1349, d.1540).
- Lý do: NT12. Điểm vào mạch 6; dòng dẫn nêu ý cốt lõi (ngoài hành trình khái niệm). Thời lượng: 0,5 phút.

#### L13-6-01 · Số đếm và ước lượng một hàng chuyển tiếp · trực quan + định nghĩa + kết quả phụ
```mat-trang
Robot thật chưa biết $P(\cdot\mid h,A)$. **Trực quan.** Mỗi lần thử là một mẫu; tần suất ước lượng hàng.
**Định nghĩa 13.25.** $N(s,a,s')$: số lần chuyển $(s,a)\to s'$; $N(s,a)=\sum_{s'}N(s,a,s')$.
**Hệ quả 13.26.** **Giả thiết:** $(s,a)$ thử $m$ lần độc lập, môi trường không đổi (M3).
**Kết luận:** nếu $m\ge1$, MLE duy nhất là
$$\hat P(s'\mid s,a)=\frac{N(s,a,s')}{N(s,a)},\qquad N(s,a)=m.\tag{7.3}$$
Trạng thái chưa xuất hiện nhận xác suất $0$; $m=0$ thì mọi hàng xác suất trên $\mathcal S$ là MLE.
```
- Ghi chú diễn giả: bộ mô phỏng cho các bộ $(s,a,c,s')$ tại $h$ với hành động $A$. Hệ quả 13.26 là Định lý 11.7 cho một hàng, không gian tham số là đơn hình đóng $\Delta(\mathcal S)$. $\hat r(s,a)$ là phần thưởng trung bình quan sát tại cặp khi $N(s,a)>0$ (7.2); khi $N(s,a)=0$, đặt giá trị mặc định là giả thiết bổ sung của người lập mô hình, chẳng hạn làm trơn cộng một (add-one smoothing). Chứng minh: hợp lý $L(q)=\prod_{s'}q(s')^{N(s,a,s')}$, rồi Định lý 11.7; một trạng thái thì đơn hình chỉ có một điểm; $m=0$ thì $L\equiv1$. Ví dụ 13.9: $12$ lần thử, $9$ lần tới $s_1$, $3$ lần tới $s_2$ cho $\hat P=(3/4;\,1/4)$; với $r=2$, $\gamma=0{,}8$, $V(s_1)=5$, $V(s_2)=1$: $\hat Q_V=2+0{,}8\cdot4=5{,}2$ (7.4). Lặp giá trị trên $\hat P,\hat r$ cho kết luận về MDP ước lượng; theo Nhận xét 11.8, xác suất ước lượng $0$ của trạng thái chưa thấy không chứng minh nó không xảy ra (d.1411).
- Lý do: bước vấn đề (robot thật chưa biết hàng chuyển) lên mặt trang dòng 1, cùng câu hỏi "thay mô hình được đến đâu" của mạch (NT8, NT13, T6); phát biểu của cụm học mô hình. Gộp Định nghĩa 13.25 và Hệ quả 13.26 (kết quả phụ, §4). Ví dụ 13.9 vào ghi chú diễn giả (`gộp`): Bài tập 13.3(a) trên L13-6-04 lặp đúng phép tính này với số khác, có lời giải trên mặt trang. Mật độ: xem §6.8. MT: 6. Nguồn: ứng dụng d.145, d.1347, Định nghĩa 13.25 d.1355–1372, Hệ quả 13.26 d.1374–1409, d.1411, Ví dụ 13.9 d.1415–1433. Thời lượng: 3 phút.

#### L13-6-02 · Dữ liệu quỹ đạo và thăm dò · nhận xét
```mat-trang
Một quỹ đạo vẫn cho MLE (7.3) khi: các hàng $P(\cdot\mid s,a)$ là tham số tự do;
chính sách thu thập và phân phối ban đầu không phụ thuộc các tham số đó.
Hành động chưa thử có hàng chuyển chưa xác định.
*Thăm dò* (exploration) thu thông tin; *khai thác* (exploitation) dùng thông tin để nhận thưởng.
```
- Ghi chú diễn giả: điều kiện đầy đủ cho dữ liệu quỹ đạo (Phụ lục A): các hàng $P_\theta(\cdot\mid s,a)$ là tham số tự do; chính sách thu thập không dùng phần thưởng và không phụ thuộc $\theta$; phân phối ban đầu không phụ thuộc $\theta$. Khi đó xác suất quỹ đạo (A.1) là tích, các nhân tử chuyển tiếp nhóm theo cặp $(s,a)$ với số đếm, nên cực đại hóa theo từng hàng; điều làm (7.3) đúng là cấu trúc tích, không phải tính độc lập. Một chính sách luôn chọn cùng một hành động không cho dữ liệu về các hành động khác; Murphy (2023), §35.1.5 trình bày đánh đổi thăm dò–khai thác.
- Lý do: hai điểm của §7.2 (quỹ đạo không i.i.d., thăm dò) cần cho hai tình huống cuối mạch. Dòng 1 giữ đủ ba giả thiết của d.1437 (N1); điều kiện "chính sách không dùng phần thưởng" của Phụ lục A ở ghi chú diễn giả, chờ đề xuất sửa ghi chú G1. MT: 6. Nguồn: d.1349, §7.2 d.1437–1439, Phụ lục A d.1653–1695. Thời lượng: 2,5 phút.

#### L13-6-03 · Hai cách học và mục tiêu Bellman từ mẫu · định nghĩa
```mat-trang
**Định nghĩa 13.27.** *Học tăng cường dựa trên mô hình* (model-based reinforcement learning): học $\hat P,\hat r$ rồi quy hoạch.
*Không dựa trên mô hình* (model-free): học trực tiếp giá trị hoặc chính sách.
**Định nghĩa 13.28.** Với bảng $Q_t$ và chuyển tiếp $(S_t,A_t,R_{t+1},S_{t+1})$, *mục tiêu Bellman từ mẫu* (sample Bellman target) là $Y_t=R_{t+1}+\gamma\max_{a'}Q_t(S_{t+1},a')$ (7.5).
*Q-learning*, bước học $\alpha_t\in(0,1]$, chỉ đổi phần tử $(S_t,A_t)$:
$$Q_{t+1}(S_t,A_t)=Q_t(S_t,A_t)+\alpha_t\bigl[Y_t-Q_t(S_t,A_t)\bigr].\tag{7.6}$$
```
- Ghi chú diễn giả: Định nghĩa 13.28 thuộc mục *đọc thêm* §7.4 của ghi chú. Hai cách học đều dùng dữ liệu $(s,a,c,s')$, đều cần (M1) cho trạng thái đang dùng, và cặp chưa thử không cho dữ liệu nào. Nếu $Q_t$ đã xác định bởi lịch sử trước chuyển tiếp và môi trường thỏa (5.1), lập luận của Bổ đề 13.10 cho $\mathbb E[Y_t\mid H_t,A_t=a]=r(S_t,a)+\gamma\sum_{s'}P(s'\mid S_t,a)\max_{a'}Q_t(s',a')$, tức phép Bellman tối ưu áp cho bảng hiện tại (Murphy (2023), §35.1.2). Một lần cập nhật dùng một kết quả ngẫu nhiên và đổi một phần tử. Hội tụ của Q-learning dạng bảng cần thêm giả thiết (Murphy (2023), §35.2.5).
- Lý do: phân biệt quy hoạch khi biết mô hình với học tăng cường (MT 6) cần cả hai định nghĩa. Dòng kỳ vọng của $Y_t$ chuyển vào ghi chú diễn giả kèm đủ hai điều kiện của d.1480 (N2); dòng "Kiểm tra" của Bài tập 13.3 cho kết luận đó bằng số. Ví dụ 13.10 bỏ khỏi trang (`gộp`, cùng phép tính với Bài tập 13.3(b)); ghi chú diễn giả rút dưới 150 âm tiết (L7). Mật độ: xem §6.8. MT: 6. Nguồn: §7.3 d.1443–1451, §7.4 d.1455–1480, Ví dụ 13.10 d.1484–1494, Nhận xét 13.29 d.1498–1503. Thời lượng: 3 phút.

#### L13-6-04 · Bài tập: mục tiêu theo mô hình và mục tiêu từ một mẫu · bài tập có lời giải
```mat-trang
**Câu hỏi:** Tại $(s,a)$, năm lần thử độc lập: bốn lần tới $s_1$, một lần tới $s_2$; thưởng luôn bằng $1$, $\gamma=1/2$, $V(s_1)=3$, $V(s_2)=-1$ (Bài tập 13.3).
(a) Tính hàng chuyển MLE và giá trị nhìn trước $\hat Q_V(s,a)$ theo mô hình ước lượng.
(b) Lần thử kế tiếp tới $s_1$; $Q(s,a)=1$, $\max_{a'}Q(s_1,a')=3$, $\max_{a'}Q(s_2,a')=-1$. Tính (7.5) và phần tử mới theo (7.6), $\alpha=0{,}2$.
[fragment] **Lời giải:** (a) $\hat P=(4/5;\,1/5)$; $\hat Q_V(s,a)=1+\tfrac12\bigl(\tfrac45\cdot3-\tfrac15\bigr)=1+\tfrac12\cdot2{,}2=2{,}1$.
[fragment] (b) $Y=1+\tfrac12\cdot3=2{,}5$; $Q^+(s,a)=1+0{,}2\,(2{,}5-1)=1{,}3$, dịch về $2{,}5$, không về $2{,}1$.
[fragment] Kiểm tra: $\tfrac45\cdot2{,}5+\tfrac15\cdot0{,}5=2{,}1=\hat Q_V(s,a)$.
```
- Ghi chú diễn giả: hàng MLE là tỉ số số đếm; giá trị nhìn trước lấy kỳ vọng theo hàng ước lượng, mục tiêu từ mẫu chỉ dùng trạng thái vừa quan sát. Nếu lần thử tới $s_2$, mục tiêu là $1+\tfrac12\cdot(-1)=0{,}5$. Gợi ý của ghi chú: hàng MLE là tỉ số số đếm (Hệ quả 13.26); giá trị nhìn trước lấy kỳ vọng theo hàng ước lượng, còn mục tiêu từ mẫu chỉ dùng trạng thái vừa quan sát. Nhầm lẫn dễ gặp: cho rằng một cập nhật đưa phần tử về $\hat Q_V(s,a)=2{,}1$.
- Lý do: bài tập có lời giải của cụm học từ trải nghiệm (NT24), đo MT 6; thay cho hai ví dụ 13.9, 13.10 trên mặt trang. Nguồn: Bài tập 13.3 d.1507–1534. Thời lượng: 2,5 phút.

#### L13-6-05 · Ví dụ: quy hoạch chính xác trên mô hình ước lượng sai · ứng dụng (giả thiết bị vi phạm)
```mat-trang
Robot thật; hàng của $B$ biết trước, hàng của $A$ phải ước lượng (Tình huống 13.1). Xác định chính sách quy hoạch.
$10$ lần thử $A$ tại $h$, cả $10$ lần ở lại $h$ ($1/1024$).
Hệ quả 13.26: $\hat P(h\mid h,A)=1$; mô hình ước lượng có $\hat Tv=\max\{1+0{,}9v;\ 0{,}6+0{,}9v\}$, điểm bất động $10$, tham lam chọn $A$.
Robot thật: $A$ cho $20/11$, $B$ cho $6$; quy hoạch mất $46/11\approx4{,}18$.
**Diễn giải:** sai lệch nằm ở hàng $\hat P(\cdot\mid h,A)$, không ở phép giải.
```
- Ghi chú diễn giả: Định lý 13.19 đúng cho MDP ước lượng; sai lệch không nằm ở phép giải phương trình. Hàng của $B$ biết từ thiết kế; biến cố cả $10$ lần ở lại $h$ có xác suất $(1/2)^{10}=1/1024$. Dữ kiện thật: $A$ thưởng $1$ rồi ở lại $h$ với xác suất $1/2$, $B$ thưởng $0{,}6$ rồi chắc chắn ở lại $h$, $\gamma=0{,}9$. Trên mô hình ước lượng nhánh $A$ luôn hơn nhánh $B$ đúng $0{,}4$; tại $v=10$ hai nhánh bằng $10$ và $9{,}6$. Trong môi trường thật $\max\{1+0{,}45\cdot6;\ 0{,}6+0{,}9\cdot6\}=\max\{3{,}7;\,6\}=6$ nên $B$ tối ưu; $6-20/11=46/11$. Giả thiết "mô hình đúng" của Hệ quả 13.18 và Định lý 13.19 không thỏa với robot thật. Như Nhận xét 11.8, xác suất ước lượng $0$ của sự kiện chưa thấy không chứng minh sự kiện đó không xảy ra. Nhận xét 13.29 (mục 1–2): khi dùng $\hat P,\hat r$, các định lý cho kết luận về MDP ước lượng; chính sách thu thập quyết định cặp nào có dữ liệu.
- Lý do: ứng dụng trong AI dùng thật Hệ quả 13.26 và Định lý 13.19 (NT4), tình huống giả thiết bị vi phạm; dữ kiện liệt kê ngay (NT14). Ghi "(Tình huống 13.1)" trên mặt trang theo số của ghi chú. MT: 6. Nguồn: §8 d.1540, Tình huống 13.1 d.1542–1554. Thời lượng: 3 phút.

#### L13-6-06 · Ví dụ: cảm biến bỏ mất thông tin quá khứ · ứng dụng (giả thiết Markov bị vi phạm)
```mat-trang
$X_0,X_1$ độc lập, Bernoulli $1/2$; $X_{t+1}=X_{t-1}$ ($t\ge1$); cảm biến chỉ ghi $X_t$; $R_{t+1}=X_{t+1}$, $\gamma=1/2$ (Tình huống 13.2). Kiểm tính Markov.
$$\mathbb P(X_2=1\mid X_0=0,X_1=0)=0,\qquad\mathbb P(X_2=1\mid X_0=1,X_1=0)=1,$$
nên $X_t$ không thỏa (4.1).
Cùng quan sát $X_1=0$, $G_1$ bằng $0$ hoặc $4/3$: hàm giá trị theo $X_t$ không nhận cả hai.
**Nhắc lại:** mở rộng trạng thái (Nhận xét 07.47): $\tilde S_u=(X_u,X_{u+1})$, bốn trạng thái.
**Diễn giải:** $T$ vẫn co trên bảng theo quan sát, nhưng bảng ấy không mô tả đúng cơ chế.
```
- Ghi chú diễn giả: hai lịch sử $(0,0)$ và $(1,0)$ đều có xác suất $1/4$ và cùng quan sát hiện tại $0$; sau $(1,0)$, $G_1=1+\tfrac14+\tfrac1{16}+\cdots=4/3$; một hàm giá trị chỉ theo quan sát hiện tại không thể nhận đồng thời $0$ và $4/3$. Với $\tilde S_u=(X_u,X_{u+1})$ (giá trị $4/3$ tại $(1,0)$), $\tilde S_{u+1}=(X_{u+1},X_u)$ xác định từ $\tilde S_u$, phần thưởng kế tiếp $X_{u+2}=X_u$ là tọa độ thứ nhất; mô hình mở rộng hữu hạn, thưởng trong $\{0,1\}$, $\gamma<1$, nên Định lý 13.12 và 13.19 áp dụng. Khi không quan sát được bit cũ, cần một mô hình quan sát và suy luận phân phối của trạng thái ẩn từ lịch sử quan sát (MDP quan sát một phần, Murphy (2023), §34.5.2); một cách xấp xỉ là đưa vài quan sát gần nhất vào trạng thái. Chọn trạng thái là một bước của mô hình hóa (Nhận xét 13.29, mục 4).
- Lý do: tình huống thứ hai với giả thiết Markov bị vi phạm (NT4, AGENTS "ít nhất hai, một khi giả thiết không thỏa"); dẫn sang cầu nối Bài 14 ở trang cuối. MT: 1, 6. Nguồn: Tình huống 13.2 d.1556–1582. Thời lượng: 3,5 phút.

### 6.7. Mạch 7 — Tổng kết (14 phút)

#### L13-7-00 · 7. Tổng kết · tiêu đề mạch (`id="mach-7"`)
```mat-trang
Phương trình Bellman tối ưu thay việc so sánh mọi chính sách bằng một phép lặp có chứng nhận sai số.
```
- Ghi chú diễn giả: mạch 2–6 đi từ truyền phân phối qua xích Markov tới phương trình Bellman tối ưu và giới hạn của nó khi mô hình phải học. Bảng tổng kết giữ giả thiết không được bỏ của từng kết quả; câu hỏi trung tâm được trả lời cho cả bài; bài tập tổng hợp dùng lặp giá trị trên một mô hình mới; câu hỏi tự kiểm tra nhắm các nhầm lẫn mà ghi chú nêu; mô hình có biến ẩn của Bài 14 nối tiếp Tình huống 13.2 (d.1584, d.1639).
- Lý do: NT12, NT15. Điểm vào mạch 7 (không có dòng từ khóa). Thời lượng: 0,5 phút.

#### L13-7-01 · Bảng tổng kết · tổng kết
```mat-trang
| Kết quả | Giả thiết không được bỏ | Công thức hoặc thuật toán |
|---|---|---|
| Phân phối sau nhiều bước | xích Markov thuần nhất | $\mu_t=\mu_0P^t$ |
| So sánh theo từng bước | (5.11) tại mọi lịch sử có xác suất dương; $\gamma<1$ | $V^\rho(s)\le U(s)$ |
| Bellman cho chính sách dừng | $\pi$ Markov dừng; $\gamma<1$ | $V^\pi=(I-\gamma P^\pi)^{-1}r^\pi$ |
| Tính co | hàng xác suất chuẩn hóa; $\gamma<1$ | $\lVert TU-TW\rVert_\infty\le\gamma\lVert U-W\rVert_\infty$ |
| Điểm bất động, lặp giá trị | hệ số co nhỏ hơn $1$; $T$ tính chính xác | (6.5); $\lVert V_k-\bar V\rVert_\infty\le\gamma^k\lVert V_0-\bar V\rVert_\infty$ với mọi $V_0$ |
```
- Ghi chú diễn giả: số hiệu: Mệnh đề 13.2, Bổ đề 13.11, Định lý 13.12, Mệnh đề 13.16, Định lý 13.17 và Hệ quả 13.18. Mọi hàng là đẳng thức hoặc bảo đảm tất định trong một MDP hữu hạn. Bổ đề 13.11 là công cụ chung của Định lý 13.12 và Định lý 13.19. Hàng cuối gộp nguyên lý ánh xạ co với áp dụng của nó cho $T$; hệ số co của $T$ chính là $\gamma$.
- Lý do: NT15 (mỗi kết quả chính một hàng, giữ lượng từ và loại bảo đảm). Thêm hàng Bổ đề 13.11 và Định lý 13.17 (quyết định điểm 2, T8); bảng tách hai trang vì chín hàng vượt 80 âm tiết. Bỏ số hiệu ở cột "Kết quả" để giữ trần 80 (số hiệu ở ghi chú diễn giả). MT: tất cả. Nguồn: d.1592–1603. Thời lượng: 1 phút.

#### L13-7-02 · Bảng tổng kết (tiếp) · tổng kết
```mat-trang
| Kết quả | Giả thiết không được bỏ | Công thức hoặc thuật toán |
|---|---|---|
| Bellman tối ưu | $\bar V=T\bar V$; $\gamma<1$ | $V^*=TV^*$; $\pi_{V^*}$ tối ưu; $V^\rho\le V^*$ với mọi $\rho$ |
| Chứng nhận sai số | theo mô hình $P,r$ đang dùng | dừng khi $\beta_k\le(1-\gamma)\varepsilon$; mất $\le2\gamma\varepsilon/(1-\gamma)$ |
| MLE hàng chuyển | lần thử độc lập, cùng phân phối; $N(s,a)\ge1$ | $\hat P(s'\mid s,a)=N(s,a,s')/N(s,a)$ |
```
- Ghi chú diễn giả: số hiệu: Định lý 13.19; Hệ quả 13.21, Mệnh đề 13.22, Thuật toán 13.23; Hệ quả 13.26. "Với mọi $\rho$" gồm cả chính sách ngẫu nhiên, phụ thuộc thời gian và lịch sử. Hàng giữa là chặn tất định theo mô hình đang dùng; hàng cuối là ước lượng phụ thuộc dữ liệu, nên ngẫu nhiên. Các giả thiết dễ bị bỏ quên: trạng thái đủ thông tin, chuẩn hóa từng hàng, phần thưởng bị chặn, $\gamma<1$, mô hình thật khác mô hình ước lượng; trạng thái hấp thụ không thay được chiết khấu (d.1603).
- Lý do: phần tiếp của bảng tổng kết (T8). "So với mọi chính sách" chuyển sang cột công thức ($V^\rho\le V^*$ với mọi $\rho$); hàng MLE ghi "cùng phân phối" theo (M3) d.115. Trang `thêm` (NT27). MT: tất cả. Nguồn: d.1592–1603. Thời lượng: 1 phút.

#### L13-7-03 · Vấn đề trung tâm · tổng kết (câu trả lời cho cả bài)
```mat-trang
Chính sách dừng: giá trị là nghiệm duy nhất của $V=r^\pi+\gamma P^\pi V$.
$T$ co hệ số $\gamma<1$: lặp giá trị hội tụ tới $\bar V$ từ mọi $V_0$.
$\bar V=V^*$; chính sách tham lam theo $V^*$ tối ưu trong mọi chính sách, kể cả phụ thuộc lịch sử.
Dừng khi $\beta_k\le(1-\gamma)\varepsilon$: chính sách mất không quá $2\gamma\varepsilon/(1-\gamma)$.
Robot: chọn $B$, $V^*(h)=6$, so với $20/11$ khi luôn chọn $A$.
Điều kiện: mô hình đúng, trạng thái Markov, $\gamma<1$.
```
- Ghi chú diễn giả: câu hỏi trung tâm: khi một hành động ảnh hưởng đến trạng thái và phần thưởng tương lai, tìm chính sách tối ưu thế nào. Liệt kê không khả thi: $\prod_s\lvert\mathcal A(s)\rvert$ chính sách tất định dừng, tập chính sách phụ thuộc lịch sử vô hạn. Phương trình Bellman tối ưu chỉ cần mô hình một bước và đưa bài toán chọn trên vô số chính sách về một phương trình giải được bằng lặp giá trị (d.1584, d.1632–1636).
- Lý do: NT15 (trang "Vấn đề trung tâm" trả lời cho cả bài, không theo mạch). Mật độ: xem §6.8. MT: 3–6. Nguồn: d.1584–1590, d.1629–1636. Thời lượng: 2 phút.

#### L13-7-04 · Bài tập: chính sách tối ưu phụ thuộc hệ số chiết khấu · bài tập tổng hợp có lời giải
```mat-trang
**Câu hỏi:** MDP tất định, trạng thái $s_0$, $s_{\mathrm L}$, $s_{\mathrm R}$; $\pi_{\mathrm L}$, $\pi_{\mathrm R}$: hai chính sách tất định dừng, khác nhau ở $s_0$ (Bài tập 13.13):
tại $s_0$: $\mathrm L$ thưởng $+1$ tới $s_{\mathrm L}$, $\mathrm R$ thưởng $0$ tới $s_{\mathrm R}$; $s_{\mathrm L}$ thưởng $0$, $s_{\mathrm R}$ thưởng $+2$, đều về $s_0$.
(a) Xác định chính sách tối ưu khi $\gamma=0$, $\gamma=0{,}9$, $\gamma=0{,}5$.
(b) Với $\gamma=0{,}9$, $V_0=0$, tính $V_1$, $V_2$, $V_3$ và hành động đạt cực đại tại $s_0$.
Giải thích vì sao hành động $\mathrm L$ có phần thưởng tức thời lớn hơn nhưng không tối ưu.
```
- Ghi chú diễn giả: MDP không có trạng thái kết thúc. Dưới mỗi chính sách, dãy thưởng từ $s_0$ có chu kỳ hai bước ($1,0,1,0,\ldots$ hoặc $0,2,0,2,\ldots$), tổng là cấp số nhân theo $\gamma^2$. Dưới cả hai chính sách $V(s_{\mathrm L})=\gamma V(s_0)$, $V(s_{\mathrm R})=2+\gamma V(s_0)$, nên chính sách tốt hơn tại $s_0$ không kém hơn ở đâu cả; theo Định lý 13.19 chính sách tối ưu là một trong hai. Nguồn bài: Sutton và Barto (2018), Bài 3.22.
- Lý do: NT15 bài tập tổng hợp lấy từ bài tập của bài; dùng Định nghĩa 13.7, Định lý 13.19, lặp giá trị, so sánh thưởng tức thời với giá trị dài hạn (MT 3, 5). Mặt trang định nghĩa $\pi_{\mathrm L}$, $\pi_{\mathrm R}$ trước lời giải và giữ đúng câu chữ câu (b) của đề (T12). Mật độ: xem §6.8 (trang bài tập giữ đủ dữ kiện của đề). Nguồn: Bài tập 13.13 bt d.411–467. Thời lượng: 3 phút.

#### L13-7-05 · Bài tập: chính sách tối ưu phụ thuộc hệ số chiết khấu, lời giải · lời giải (trang kế tiếp cùng tiêu đề)
```mat-trang
**Lời giải:** (a) so $V^{\pi_{\mathrm L}}(s_0)=1/(1-\gamma^2)$ với $V^{\pi_{\mathrm R}}(s_0)=2\gamma/(1-\gamma^2)$: $\gamma=0$ cho $\pi_{\mathrm L}$; $\gamma=0{,}9$ cho $\pi_{\mathrm R}$ ($180/19>100/19$); $\gamma=0{,}5$ cho cả hai.
(b) $(TV)(s_0)=\max\{1+0{,}9V(s_{\mathrm L});\ 0{,}9V(s_{\mathrm R})\}$, $(TV)(s_{\mathrm L})=0{,}9V(s_0)$, $(TV)(s_{\mathrm R})=2+0{,}9V(s_0)$.
| $k$ | $V_k(s_0)$ | $V_k(s_{\mathrm L})$ | $V_k(s_{\mathrm R})$ | Hành động đạt cực đại tại $s_0$ |
|---:|---:|---:|---:|---|
| 1 | $\max\{1;\,0\}=1$ | $0$ | $2$ | $\mathrm L$ |
| 2 | $\max\{1;\,1{,}8\}=1{,}8$ | $0{,}9$ | $2{,}9$ | $\mathrm R$ |
| 3 | $\max\{1{,}81;\,2{,}61\}=2{,}61$ | $1{,}62$ | $3{,}62$ | $\mathrm R$ |
Vòng đầu, $V_0=0$ chưa chứa phần đuôi nên chỉ so thưởng tức thời $1$ với $0$.
Trên hai bước, $\mathrm L$ cho $1$, $\mathrm R$ cho $2\gamma=1{,}8$; vì vậy $\mathrm R$ tối ưu dù thưởng tức thời bằng $0$.
```
- Ghi chú diễn giả: kiểm tra: $V^*=(180/19;\,162/19;\,200/19)\approx(9{,}474;\,8{,}526;\,10{,}526)$; tại $s_0$ nhánh $\mathrm L$ bằng $164{,}8/19<180/19$, nên $TV^*=V^*$. Chặn (6.7) tại $k=3$: $\lVert V_3-V^*\rVert_\infty\approx6{,}906\le0{,}9^3\cdot200/19\approx7{,}674$. Hiện tượng vòng đầu chọn hành động thưởng tức thời lớn giống hàng $k=0$ của robot. Ở vòng $k=2$, nhánh $\mathrm R$ đã cộng $0{,}9\cdot2$ của bước kế tiếp nên vượt nhánh $\mathrm L$; từ đó $\mathrm R$ đạt cực đại ở mọi vòng đã tính.
- Lý do: trang lời giải kế tiếp cùng tiêu đề (NT24 "trang kế tiếp cùng tiêu đề", thêm tên bước sau dấu phẩy theo NT16). MT: 5. Nguồn: Lời giải Bài tập 13.13 bt d.420–467. Thời lượng: 2,5 phút.

#### L13-7-06 · Câu hỏi tự kiểm tra · kiểm tra
```mat-trang
**Câu hỏi:** (6.7) chứa $V^*$; đại lượng nào tính được dùng làm tiêu chuẩn dừng?
**Câu hỏi:** Bảng lặp của robot chọn $A$ ở vòng đầu; robot tối ưu chọn gì ở bước đầu?
**Câu hỏi:** Trạng thái hấp thụ $z$ có thay được giả thiết $\gamma<1$ không?
**Câu hỏi:** Phần dư Bellman tính trên $\hat P$ nhỏ chứng nhận điều gì về robot thật?
```
- Ghi chú diễn giả (đáp án): (1) phần dư $\beta(V)=\lVert TV-V\rVert_\infty$; $\lVert V-V^*\rVert_\infty\le\beta(V)/(1-\gamma)$ (Hệ quả 13.21). (2) $B$ ở mọi thời điểm; $k$ đếm vòng tính toán (Ví dụ 13.6). (3) Không: chính sách luôn chọn $B$ không bao giờ tới $z$ (Nhận xét 13.24, mục 3). (4) Chỉ chứng nhận đã gần giải đúng phương trình Bellman của mô hình ước lượng, không chứng nhận $\hat P$ mô tả đúng robot (d.1259, Nhận xét 13.29, mục 4).
- Lý do: NT15 (2–4 câu, trả lời được chỉ bằng ghi chú, đáp án ở ghi chú diễn giả). Mỗi câu kiểm một nhầm lẫn mà ghi chú nêu. MT: 4, 5, 6. Nguồn: d.1158, d.1149, d.1330, d.1259. Thời lượng: 2 phút.

#### L13-7-07 · Bài tập về nhà · bài tập
```mat-trang
| Mục | Bài tập |
|---|---|
| 2. Xích Markov và phân phối trạng thái | 13.1 |
| 3. Quá trình quyết định Markov và giá trị của chính sách | 13.4, 13.5, 13.6, 13.8, 13.11 |
| 4. Toán tử Bellman tối ưu và ánh xạ co | 13.12 |
| 5. Giá trị tối ưu và chứng nhận sai số | 13.2, 13.7, 13.9, 13.10, 13.13, 13.14 |
| 6. Học từ trải nghiệm | 13.3 |
Ghi chú bài giảng · Bài tập
```
- Ghi chú diễn giả: Bài tập 13.1–13.3 nằm trong ghi chú; 13.4–13.14 lấy từ Sutton và Barto (2018), có gợi ý và lời giải trong tệp bài tập. Mỗi bài xếp vào mạch cung cấp kiến thức cuối cùng bài đó cần: 13.12 cần Hệ quả 13.18; 13.7, 13.9, 13.10, 13.14 cần phương trình Bellman tối ưu (6.8); 13.13 cần Định lý 13.19; 13.8 và 13.11 cần Định lý 13.12. Liên kết: `material-viewer.html?doc=materials/lec-13/lecture-note.md&deck=lecture-13-quyet-dinh-tuan-tu-bat-dinh.html` và `material-viewer.html?doc=materials/lec-13/exercises.md&deck=lecture-13-quyet-dinh-tuan-tu-bat-dinh.html`.
- Lý do: NT15 (bảng `Mục | Bài tập` phủ mọi bài tập của ghi chú và `exercises.md`, liên kết tới trình xem). Số trong bảng không tính âm tiết. MT: tất cả. Nguồn: §9 d.1605–1625; bt d.16–23. Thời lượng: 1 phút.

#### L13-7-08 · Tài liệu tham khảo · tài liệu
```mat-trang
Murphy, K. P. (2023), *Probabilistic Machine Learning: Advanced Topics*, MIT Press, §2.6, §34.5–34.6, §35.1–35.2.
Sutton, R. S.; Barto, A. G. (2018), *Reinforcement Learning: An Introduction*, ấn bản 2, §3.5, §4.1, §4.4.
Bertsekas, D. P. (2017), *Dynamic Programming and Optimal Control*, tập I, ấn bản 4, §1.1–1.3.
Bài 14 xét mô hình có biến ẩn, như bit cũ của cảm biến.
```
- Ghi chú diễn giả: trước buổi học: Murphy (2023), §2.6.1, §2.6.4.1, §34.5.1, §34.5.3–34.5.4; sau buổi học: §34.5.5, §34.6.1, §34.6.2 và (34.88), §2.6.3.1–2.6.3.3 và (34.74), §35.1.1, §35.1.4; mở rộng: §35.1.2, §35.1.5, §35.2.2, §35.2.5, §34.5.2, Sutton và Barto (2018), §3.5, §4.1, §4.4, Bertsekas (2017), §1.1–1.3. Murphy đánh chỉ số phần thưởng từ $r_0$, dùng $T$ cho ma trận chuyển trong (34.88) và $\eta$ cho bước học; deck viết $R_{t+1}$, dùng $T$ cho toán tử Bellman và $\alpha_t$ cho bước học. Bài 14: khi hậu nghiệm của biến ẩn không tính được trực tiếp, xây dựng ELBO của log-hợp lý để học tham số $\theta$ và xấp xỉ hậu nghiệm cùng lúc (d.1639).
- Lý do: NT15 (trang cuối "Tài liệu tham khảo", nguồn của mục "Tài liệu đọc", một dòng nối sang Bài 14 theo đoạn cầu nối d.1639). Ngoại lệ mật độ: trang tài liệu (lint không áp trần dòng; âm tiết xem §6.8). MT: —. Nguồn: §11 d.1641–1649; bt d.494–499; d.1639. Thời lượng: 1 phút.

### 6.8. Bảng mật độ

Đếm bằng script `count.py` (tệp nháp `/tmp/claude-1000/-data-tqlong-lectures/3d919d23-7082-4f41-9671-9ec3fcf3fa09/scratchpad/lec-13/storyboard/count.py`, cùng quy tắc `syll()` của `deck_lint.py`): token cách nhau bởi khoảng trắng có chữ hoặc số; bỏ công thức KaTeX; trong bảng chỉ tính token có chữ cái; bỏ tiêu đề, hình, ghi chú diễn giả. Mỗi dòng của khối `mat-trang` là một dòng nội dung; dòng `$$…$$` là một dòng và một công thức hiển thị; một bảng là một dòng. Số trên trang deck thật có thể lệch vài âm tiết; người viết deck chạy `deck_lint.py`.

| ID | Tiêu đề | Âm tiết | Dòng | Dòng dài nhất | Công thức hiển thị |
|---|---|---:|---:|---:|---:|
| L13-1-01 | Ra quyết định tuần tự dưới điều kiện bất định | 82 | 4 | 48 | 0 |
| L13-1-02 | Tiên quyết và quy ước | 60 | 6 | 18 | 1 |
| L13-1-03 | Mục tiêu học tập | 80 | 6 | 19 | 0 |
| L13-1-04 | Nội dung | 52 | 8 | 11 | 0 |
| L13-1-05 | Vấn đề trung tâm | 26 | 1 | 26 | 0 |
| L13-1-06 | Ví dụ: robot với hai hành động | 59 | 6 | 17 | 0 |
| L13-2-00 | 2. Xích Markov và phân phối trạng thái | dòng dẫn 21 | — | — | — |
| L13-2-01 | Ví dụ: robot hoạt động hoặc nghỉ | 58 | 5 | 15 | 0 |
| L13-2-02 | Xích Markov thuần nhất | 51 | 6 | 17 | 2 |
| L13-2-03 | Phân phối sau nhiều bước | 60 | 6 | 17 | 2 |
| L13-2-04 | Ví dụ: xác suất chuyển và xác suất đồng thời | 46 | 5 | 15 | 0 |
| L13-2-05 | Bài tập: truyền phân phối hai bước | 45 | 6 | 15 | 0 |
| L13-3-00 | 3. Quá trình quyết định Markov và giá trị của chính sách | dòng dẫn 19 | — | — | — |
| L13-3-01 | Quá trình quyết định Markov hữu hạn | 57 | 6 | 19 | 0 |
| L13-3-02 | Lịch sử và giả thiết Markov có điều khiển | 43 | 6 | 12 | 2 |
| L13-3-03 | Chính sách | 58 | 5 | 20 | 1 |
| L13-3-04 | Tổng thưởng chiết khấu và hàm giá trị | 60 | 6 | 15 | 1 |
| L13-3-05 | Bài tập: tổng thưởng chiết khấu của một dãy phần thưởng vô hạn | 34 | 4 | 16 | 0 |
| L13-3-06 | Giá trị nhìn trước một bước | 50 | 5 | 20 | 2 |
| L13-3-07 | So sánh theo từng bước | 45 | 4 | 17 | 1 |
| L13-3-08 | Ý tưởng chứng minh: so sánh theo từng bước | 58 | 6 | 16 | 1 |
| L13-3-09 | Phương trình Bellman cho chính sách dừng | 51 | 5 | 19 | 1 |
| L13-3-10 | Ý tưởng chứng minh: phương trình Bellman cho chính sách dừng | 39 | 6 | 9 | 1 |
| L13-3-11 | Ví dụ: ba chính sách dừng của robot | 46 | 5 | 20 | 0 |
| L13-4-00 | 4. Toán tử Bellman tối ưu và ánh xạ co | dòng dẫn 24 | — | — | — |
| L13-4-01 | Toán tử Bellman tối ưu | 58 | 6 | 16 | 1 |
| L13-4-02 | Ánh xạ co | 55 | 6 | 17 | 1 |
| L13-4-03 | Tính co của các toán tử Bellman | 52 | 6 | 18 | 2 |
| L13-4-04 | Ý tưởng chứng minh: tính co của các toán tử Bellman | 60 | 6 | 19 | 1 |
| L13-4-05 | Điểm bất động của ánh xạ co | 58 | 5 | 17 | 1 |
| L13-4-06 | Ý tưởng chứng minh: điểm bất động của ánh xạ co | 55 | 6 | 20 | 1 |
| L13-4-07 | Nguyên lý ánh xạ co | 59 | 6 | 16 | 1 |
| L13-5-00 | 5. Giá trị tối ưu và chứng nhận sai số | dòng dẫn 22 | — | — | — |
| L13-5-01 | Bellman tối ưu và chính sách tham lam tối ưu | 60 | 6 | 16 | 1 |
| L13-5-02 | Ý tưởng chứng minh: phương trình Bellman tối ưu | 59 | 6 | 19 | 1 |
| L13-5-03 | Ví dụ: lặp giá trị cho robot | 44 | 5 | 16 | 1 |
| L13-5-04 | Ví dụ: lặp giá trị cho robot, điểm bất động | 42 | 5 | 15 | 0 |
| L13-5-05 | Chặn bằng phần dư Bellman | 57 | 6 | 20 | 2 |
| L13-5-06 | Lặp giá trị với chứng nhận sai số | 48 | 6 | 13 | 0 |
| L13-5-07 | Bài tập: tính co và phần dư Bellman | 57 | 6 | 20 | 0 |
| L13-5-08 | Ví dụ: hai mô hình không chiết khấu | 59 | 6 | 15 | 0 |
| L13-6-00 | 6. Học từ trải nghiệm | dòng dẫn 21 | — | — | — |
| L13-6-01 | Số đếm và ước lượng một hàng chuyển tiếp | 60 | 6 | 17 | 1 |
| L13-6-02 | Dữ liệu quỹ đạo và thăm dò | 56 | 4 | 16 | 0 |
| L13-6-03 | Hai cách học và mục tiêu Bellman từ mẫu | 56 | 5 | 18 | 1 |
| L13-6-04 | Bài tập: mục tiêu theo mô hình và mục tiêu từ một mẫu | 59 | 6 | 20 | 0 |
| L13-6-05 | Ví dụ: quy hoạch chính xác trên mô hình ước lượng sai | 59 | 5 | 20 | 0 |
| L13-6-06 | Ví dụ: cảm biến bỏ mất thông tin quá khứ | 60 | 6 | 18 | 1 |
| L13-7-00 | 7. Tổng kết | dòng dẫn 21 | — | — | — |
| L13-7-01 | Bảng tổng kết | 64 | 1 | 0 | 0 |
| L13-7-02 | Bảng tổng kết (tiếp) | 41 | 1 | 0 | 0 |
| L13-7-03 | Vấn đề trung tâm | 60 | 6 | 17 | 0 |
| L13-7-04 | Bài tập: chính sách tối ưu phụ thuộc hệ số chiết khấu | 63 | 5 | 19 | 0 |
| L13-7-05 | Bài tập: chính sách tối ưu phụ thuộc hệ số chiết khấu, lời giải | 44 | 5 | 14 | 0 |
| L13-7-06 | Câu hỏi tự kiểm tra | 59 | 4 | 18 | 0 |
| L13-7-07 | Bài tập về nhà | 49 | 2 | 6 | 0 |
| L13-7-08 | Tài liệu tham khảo | 60 | 4 | 17 | 0 |

**Ngoại lệ đã biết:**

- L13-1-01 (bìa): lint không áp trần; luận điểm 48 âm tiết, một câu.
- L13-1-03 (Mục tiêu, 80), L13-7-01 (Bảng tổng kết, 64): trần 80.
- L13-1-04 (Nội dung): danh sách `<ol>` 7 mục `<li>` khớp 7 mạch; dòng "Đọc trước: …" là `<p>` sau danh sách (script đếm nó là dòng thứ 8).
- L13-1-05 (Vấn đề trung tâm): một hộp 26 âm tiết, vượt trần 20 âm tiết mỗi dòng vì phải giữ nguyên văn câu hỏi in đậm của ghi chú (NT11). Không tách.
- L13-7-04 (Bài tập 13.13, đề): 63 âm tiết, vượt trần 60 dưới 1,5 lần, vì trang giữ đủ dữ kiện và đúng câu chữ của đề, kể cả câu "Giải thích vì sao hành động $\mathrm L$ có phần thưởng tức thời lớn hơn nhưng không tối ưu." (NT24, T12). Lời giải sang trang kế L13-7-05.
- Khi `deck_lint` đếm vượt trần do khác cách tách thẻ, chuyển chữ diễn giải không thuộc nhãn bắt buộc sang ghi chú diễn giả; không bỏ dòng "Kỹ thuật." trên trang ý tưởng chứng minh (NT7), "Diễn giải:" của trang ví dụ (NT23), "Giả thiết:", "Kết luận:", "Bảo đảm:" (NT5), và không thu nhỏ chữ.

## 7. Hành trình khái niệm

Bước: VĐ = vấn đề, TQ = trực quan, VD = ví dụ, PB = phát biểu, YT = ý tưởng chứng minh, UD = ứng dụng trong AI, KT = kiểm tra.

| Cụm | VĐ | TQ | VD | PB | YT | UD | KT | Ký hiệu, dữ kiện chuyển từ ví dụ sang phát biểu | Gộp / không áp dụng | Phút |
|---|---|---|---|---|---|---|---|---|---|---:|
| Xích Markov, phân phối sau nhiều bước (Định nghĩa 13.1, Mệnh đề 13.2, Hệ quả 13.3) | L13-2-00, L13-2-01 | L13-2-01 | L13-2-01 (ví dụ dẫn nhập, số của Ví dụ 13.2) | L13-2-02, L13-2-03 | L13-2-03 (dòng "Chứng minh.") | L13-2-03 ("Ý nghĩa:" hợp lý chuỗi); ghi chú L13-2-02 (chọn trạng thái) | L13-2-04, L13-2-05 | $P$, $\mu_0=(1;\,0)$, hai đường đi $0{,}64+0{,}07$ → $\mu_{t+1}=\mu_tP$, (4.4) | YT gộp vào trang phát biểu (kết quả phụ, §4) | 12 |
| MDP, chính sách, tổng thưởng (Định nghĩa 13.5–13.7, Mệnh đề 13.8) | L13-1-06, L13-3-01 (dòng 1) | L13-3-04 ("Trực quan.") | L13-3-05 (Bài tập 13.4); L13-3-11 | L13-3-01, L13-3-02, L13-3-03, L13-3-04 | L13-3-04 (ghi chú diễn giả) | L13-3-04 ("Ý nghĩa:" cắt quỹ đạo) | L13-3-05 | robot $h/z$, $\gamma=0{,}9$, $R_{\max}=1$ → $p$, $P$, $r$, $G_t$ | Định nghĩa chia bốn trang liền nhau; chu trình rút gọn cho Mệnh đề 13.8 (kết quả phụ) | 8 |
| Bổ đề 13.11, Định lý 13.12 | L13-3-00 (dòng dẫn), L13-3-06 | L13-3-06, L13-3-07 | L13-3-05 ($G_0=R_1+\gamma G_1=65$) | L13-3-07, L13-3-09 | L13-3-08, L13-3-10 | L13-3-09 (đánh giá chính sách) | L13-3-11; bài tập về nhà 13.6, 13.8, 13.11 | $G_t=R_{t+1}+\gamma G_{t+1}$ → $Q_U$, $T^\pi U=r^\pi+\gamma P^\pi U$ → (5.12); robot $20/11$, $6$, $32/13$ | — | 18 |
| Toán tử $T$, ánh xạ co, Mệnh đề 13.16 | L13-4-01 (dòng 1 và "Câu hỏi:"), L13-4-02 (dòng 1) | L13-4-01 (toán tử), L13-4-03 (tính co) | L13-4-02 ($x/2+1$; phản ví dụ $x+1$) | L13-4-01, L13-4-03 | L13-4-04 | L13-4-07 (lặp giá trị) | L13-5-07 (a) | $\kappa=1/2$ → $\kappa=\gamma$; $Q_U$ của robot (ghi chú L13-4-01) | — | 8,5 |
| Định lý 13.17, Hệ quả 13.18 | L13-4-02 (dòng 1) | L13-4-05 ("Trực quan.") | L13-4-05 (dãy $1;\,1{,}5;\,1{,}75$, mới) | L13-4-05, L13-4-07 | L13-4-06 | L13-4-07 (kỹ thuật; $\gamma=0{,}99$, $230$ vòng trong ghi chú) | L13-5-04 (kiểm (6.7) tại $k=3$); bài tập về nhà 13.12 | $F(x)=x/2+1$, $x_0=0$ → $F=T$, $V_0=0$ | Hệ quả 13.18 chung trang với trang "Kỹ thuật." (chỗ dùng của kỹ thuật) | 9 |
| Định lý 13.19 | L13-3-11 ("Diễn giải:"), L13-5-01 ("Câu hỏi:") | L13-5-01 | L13-3-11 (ví dụ dẫn nhập: $V^B(h)=6$); L13-5-03, L13-5-04 | L13-5-01 | L13-5-02 | L13-5-04 (câu trả lời cho robot); ghi chú L13-5-01 (Murphy (2023), §34.5.5); L13-6-05 | L13-7-04, L13-7-05, L13-7-06 | $v_k$, (6.9) → $V^*(h)=6$, chọn $B$, $8/9$ | Ví dụ dẫn nhập đứng trước trực quan (AGENTS cho phép) | 14,5 |
| Chứng nhận sai số (Hệ quả 13.21, Mệnh đề 13.22, Thuật toán 13.23) | L13-5-05 (dòng 1) | L13-5-05 (dòng 1: $\beta$ đo mức vi phạm, tính được) | ghi chú L13-5-05 (Ví dụ 13.7); L13-5-06 (robot, $k=39$) | L13-5-05, L13-5-06 | L13-5-05 (dòng "Nhắc lại:") | L13-5-06 (quy hoạch có chứng nhận) | L13-5-07 (b)(c); L13-7-06 câu 1 | $\beta(V)$ → điều kiện dừng $\beta_k\le(1-\gamma)\varepsilon$ | Chu trình rút gọn: kết quả phụ cùng mẹo "chèn một đại lượng trung gian rồi chuyển vế" | 7 |
| Phản ví dụ $\gamma=1$ (Nhận xét 13.24, Ví dụ 13.8) | L13-4-04, L13-3-08 (dòng "Với $\gamma=1$") | — | L13-5-08 | — | — | — | L13-7-06 câu 3 | $F(x)=x+1$ → $V=1+V$ | Nhận xét, không phải kết quả: `nhu cầu → ví dụ → kiểm tra` | 2,5 |
| Học từ trải nghiệm (Định nghĩa 13.25, Hệ quả 13.26, Định nghĩa 13.27–13.28) | L13-6-00, L13-6-01 (dòng 1: robot thật) | L13-6-01 ("Trực quan.") | L13-6-04 (Bài tập 13.3); ghi chú L13-6-01, L13-6-03 (Ví dụ 13.9, 13.10) | L13-6-01, L13-6-02, L13-6-03 | L13-6-01 (ghi chú diễn giả: hợp lý + Định lý 11.7) | L13-6-05, L13-6-06 | L13-6-04; L13-7-06 câu 4 | số đếm $4/5$, $1/5$ → (7.3); $Y=2{,}5$ → (7.5)–(7.6) | Ví dụ 13.9, 13.10 vào ghi chú diễn giả (cùng phép tính với Bài tập 13.3 có lời giải trên mặt trang) | 18 |

Câu nối giữa các bước đều ở mặt trang hoặc dòng đầu trang kế: L13-2-05 → L13-3-01 ("Mỗi hành động chọn một hàng chuyển tiếp; cần giá trị dài hạn của một cách chọn cố định"); L13-3-11 → L13-4-01 ("còn phải so $6$ với mọi chính sách" → "Liệt kê cần so $\prod_s\lvert\mathcal A(s)\rvert$ chính sách"); L13-4-01 → L13-4-02 ("Lặp $U\leftarrow TU$ hội tụ khi …"); L13-4-07 → L13-5-01 ("$\bar V=V^*$ không; dừng sau hữu hạn vòng thì mất bao nhiêu?"); L13-5-05 dòng 1 ("(6.7) chứa $V^*$ chưa biết"); L13-5-08 → mạch 6 ("Các kết quả trên đều giả sử biết chính xác $P$, $r$").

## 8. Hình

| Tệp | Trạng thái | Trang | Nội dung, dữ liệu | `alt` dự kiến |
|---|---|---|---|---|
| `img/lec-13/robot-mdp.svg` | có sẵn (Hình 13.1, d.141–143) | không dùng trên deck (giữ cho ghi chú) | Hai trạng thái tròn $h$, $z$; ô $A$ (thưởng $1$, về $h$ xác suất $0{,}5$, sang $z$ xác suất $0{,}5$), ô $B$ (thưởng $0{,}6$, về $h$ xác suất $1$); $z$ tự lặp, thưởng $0$; $\gamma=0{,}9$ | alt của ghi chú d.141 (nguyên văn) |
| `img/lec-13/robot-mdp-slide.svg` | **mới** (người viết deck vẽ; quyết định điểm 5) | L13-1-06 (cột phải) | Cùng dữ liệu Hình 13.1: hai trạng thái tròn $h$ ("Hoạt động"), $z$ ("Hấp thụ"); ô hành động $A$ (thưởng $1$; mũi tên về $h$ ghi $0{,}5$, sang $z$ ghi $0{,}5$), ô $B$ (thưởng $0{,}6$; mũi tên về $h$ ghi $1$); $z$ tự lặp, xác suất $1$, thưởng $0$; dòng "γ = 0,9". Bỏ dòng tiêu đề nội bộ của bản ghi chú. Trạng thái là hình tròn, hành động là hình chữ nhật (hình dạng, không chỉ màu). Chữ ≥ 22 trên viewBox rộng 900, để ≥ 16 px khi cột phải rộng ≈ 700 px; `role="img"`, `<title>` "Hai hành động của robot trong mô hình quyết định Markov", `<desc>` như alt | alt của ghi chú d.141 (nguyên văn) |
| `img/lec-13/value-iteration.svg` | có sẵn (Hình 13.2, d.152–154) | L13-5-04 | Trái: $Q_A(v)=1+0{,}45v$, $Q_B(v)=0{,}6+0{,}9v$ cắt tại $v=8/9$, $Q_B$ cắt đường chéo tại $6$. Phải: $v_k$, $k=0..30$, qua $1;\,1{,}5;\,1{,}95;\,2{,}355$ tới $6$ | alt của ghi chú d.152 (nguyên văn) |
| `img/lec-13/two-step-paths.svg` | **mới** | L13-2-01 (cột phải) | Cây hai bước từ $h$ ($t=0$). Cạnh mức 1: $h\to h$ ghi $0{,}8$, $h\to n$ ghi $0{,}2$. Cạnh mức 2: từ $h$: $h$ ($0{,}8$), $n$ ($0{,}2$); từ $n$: $h$ ($0{,}35$), $n$ ($0{,}65$). Bốn lá ghi xác suất đường đi: $0{,}64$; $0{,}16$; $0{,}07$; $0{,}13$. Lá $h$ là nút tròn viền đậm có chữ "h", lá $n$ là nút vuông có chữ "n" (hình dạng và chữ, không chỉ màu). Không vẽ công thức tổng; tổng $0{,}71$ nằm trên mặt trang. Dấu thập phân là dấu phẩy. `role="img"`, `<title>` "Các đường đi hai bước của robot hoạt động hoặc nghỉ", `<desc>` như alt; chữ ≥ 16 px khi hiển thị ở nửa trang 1600×900 (viewBox ≈ 640×420, cỡ chữ ≥ 22) | "Cây hai bước của robot bắt đầu ở trạng thái hoạt động h. Bước một: sang h với xác suất 0,8, sang n với xác suất 0,2. Bước hai từ h: sang h 0,8, sang n 0,2; từ n: sang h 0,35, sang n 0,65. Bốn lá ghi xác suất đường đi: h, h, h là 0,64; h, h, n là 0,16; h, n, h là 0,07; h, n, n là 0,13." |

Rủi ro hình đã xử lý: `robot-mdp.svg` có chữ cỡ 15–16 trên viewBox 900 và một dòng tiêu đề nội bộ trùng vai với tiêu đề trang; ở cột phải (≈ 700 px) chữ còn ≈ 12 px (NT25), nên L13-1-06 dùng `robot-mdp-slide.svg`. `value-iteration.svg` (matplotlib) cần đo chữ ở 1600×900 và 390×844.

## 9. Mạch Tổng kết

- **Bảng tổng kết** (L13-7-01 và L13-7-02, chín hàng; tách hai trang vì vượt 80 âm tiết):

| Kết quả | Giả thiết không được bỏ | Công thức hoặc thuật toán |
|---|---|---|
| Phân phối sau nhiều bước (Mệnh đề 13.2) | xích Markov thuần nhất | $\mu_t=\mu_0P^t$ |
| So sánh theo từng bước (Bổ đề 13.11) | (5.11) tại mọi lịch sử có xác suất dương; $\gamma<1$ | $V^\rho(s)\le U(s)$ |
| Bellman cho chính sách dừng (Định lý 13.12) | $\pi$ Markov dừng; $\gamma<1$ | $V^\pi=(I-\gamma P^\pi)^{-1}r^\pi$ |
| Tính co (Mệnh đề 13.16) | hàng xác suất chuẩn hóa; $\gamma<1$ | $\lVert TU-TW\rVert_\infty\le\gamma\lVert U-W\rVert_\infty$ |
| Điểm bất động, lặp giá trị (Định lý 13.17, Hệ quả 13.18) | hệ số co nhỏ hơn $1$; $T$ tính chính xác | (6.5); $\lVert V_k-\bar V\rVert_\infty\le\gamma^k\lVert V_0-\bar V\rVert_\infty$ với mọi $V_0$ |
| Bellman tối ưu (Định lý 13.19) | $\bar V=T\bar V$; $\gamma<1$ | $V^*=TV^*$; $\pi_{V^*}$ tối ưu; $V^\rho\le V^*$ với mọi $\rho$ |
| Chứng nhận sai số (Hệ quả 13.21, Mệnh đề 13.22, Thuật toán 13.23) | theo mô hình $P,r$ đang dùng | dừng khi $\beta_k\le(1-\gamma)\varepsilon$; mất $\le2\gamma\varepsilon/(1-\gamma)$ |
| MLE hàng chuyển (Hệ quả 13.26) | lần thử độc lập, cùng phân phối; $N(s,a)\ge1$ | $\hat P(s'\mid s,a)=N(s,a,s')/N(s,a)$ |

  Trên mặt trang bỏ số hiệu ở cột "Kết quả" để giữ trần 80 (số hiệu ở ghi chú diễn giả).
- **Câu trả lời cho câu hỏi trung tâm của cả bài** (L13-7-03): sáu dòng ở §6.7 (giá trị chính sách dừng; tính co và hội tụ; $\bar V=V^*$ và tham lam tối ưu trong mọi chính sách, kể cả phụ thuộc lịch sử; tiêu chuẩn dừng và mất mát; robot chọn $B$, $6$ so với $20/11$; điều kiện mô hình đúng, Markov, $\gamma<1$).
- **Bài tập tổng hợp:** Bài tập 13.13 (Sutton và Barto, Bài 3.22), hai trang L13-7-04, L13-7-05; đề và lời giải theo `exercises.md` bt d.411–467; số kiểm ở §5 mục 14.
- **Câu hỏi tự kiểm tra** (L13-7-06) và đáp án: (1) $\beta(V)$, $\lVert V-V^*\rVert_\infty\le\beta(V)/(1-\gamma)$; (2) $B$ ở mọi thời điểm, $k$ đếm vòng tính toán; (3) không, chính sách luôn chọn $B$ không tới $z$; (4) chỉ chứng nhận nghiệm gần đúng của phương trình Bellman của mô hình ước lượng.
- **Bảng `Mục | Bài tập`** (L13-7-07), phủ đủ 14 bài:

| Mục | Bài tập | Kiến thức cuối cùng cần |
|---|---|---|
| 2. Xích Markov và phân phối trạng thái | 13.1 | Mệnh đề 13.2, (4.4) |
| 3. Quá trình quyết định Markov và giá trị của chính sách | 13.4, 13.5, 13.6, 13.8, 13.11, 13.14 | (5.4); mô hình $p(s',c\mid s,a)$; Bổ đề 13.10, (5.3); Định lý 13.12; 13.14: (5.4) và định nghĩa chính sách tối ưu (D7) |
| 4. Toán tử Bellman tối ưu và ánh xạ co | 13.12 | (6.1), Hệ quả 13.18 |
| 5. Giá trị tối ưu và chứng nhận sai số | 13.2, 13.7, 13.9, 13.10, 13.13 | Hệ quả 13.21, Mệnh đề 13.22; Định lý 13.19, (6.8) |
| 6. Học từ trải nghiệm | 13.3 | Hệ quả 13.26, (7.5), (7.6) |

- **Tài liệu tham khảo** (L13-7-08): Murphy (2023); Sutton và Barto (2018), ấn bản 2; Bertsekas (2017), tập I, ấn bản 4 — đúng mục "Tài liệu đọc" d.1641–1649; chi tiết số mục ở ghi chú diễn giả.
- **Dòng nối sang Bài 14:** "Bài 14 xét mô hình có biến ẩn, như bit cũ của cảm biến." (theo d.1639).

## 10. Thuật ngữ Việt–Anh trên mặt trang

| Tiếng Việt (theo ghi chú) | Tiếng Anh | Trang đầu tiên |
|---|---|---|
| ước lượng hợp lý cực đại | maximum likelihood estimation, MLE | L13-1-02 |
| tính Markov | Markov property | L13-2-02 |
| (xích Markov) thuần nhất | time-homogeneous | L13-2-02 |
| ma trận chuyển | transition matrix | L13-2-02 |
| ma trận hàng ngẫu nhiên | row-stochastic matrix | L13-2-02 |
| quá trình quyết định Markov | Markov decision process, MDP | L13-3-01 |
| phần thưởng | reward | L13-3-01 |
| hệ số chiết khấu | discount factor | L13-3-01 |
| lịch sử | history | L13-3-02 |
| tác tử | agent | L13-3-02 |
| chính sách | policy | L13-3-03 |
| chính sách Markov dừng | stationary Markov policy | L13-3-03 |
| tất định | deterministic | L13-3-03 |
| tổng thưởng chiết khấu | discounted return | L13-3-04 |
| hàm giá trị | value function | L13-3-04 |
| giá trị tối ưu | optimal value | L13-3-04 |
| giá trị nhìn trước một bước | one-step lookahead value | L13-3-06 |
| toán tử Bellman theo chính sách | policy Bellman operator | L13-3-06 |
| tổng lồng | telescoping sum | L13-3-08 |
| đánh giá chính sách | policy evaluation | L13-3-09 |
| toán tử Bellman tối ưu | Bellman optimality operator | L13-4-01 |
| chính sách tham lam | greedy policy | L13-4-01 |
| ánh xạ co | contraction mapping | L13-4-02 |
| điểm bất động | fixed point | L13-4-02 |
| lặp giá trị | value iteration | L13-4-07 |
| phương trình Bellman tối ưu | Bellman optimality equation | L13-5-01 |
| phần dư Bellman (còn gọi là Bellman error) | Bellman residual | L13-5-05 |
| quy hoạch | planning | L13-5-06 |
| trạng thái hấp thụ | absorbing state | L13-5-08 |
| học tăng cường dựa trên mô hình / không dựa trên mô hình | model-based / model-free reinforcement learning | L13-6-03 |
| mục tiêu Bellman từ mẫu | sample Bellman target | L13-6-03 |
| Q-learning | (tên riêng) | L13-6-03 |
| thăm dò, khai thác | exploration, exploitation | L13-6-02 |
| cận dưới bằng chứng | evidence lower bound, ELBO | ghi chú diễn giả L13-7-08 |

Chỉ ở ghi chú diễn giả: quá trình ngẫu nhiên rời rạc theo thời gian (discrete-time stochastic process), trạng thái hấp thụ ở L13-1-06, làm trơn cộng một (add-one smoothing), độc lập cùng phân phối (i.i.d.). Dấu thập phân là dấu phẩy (`0{,}9`); dãy số ngăn bằng ";"; xác suất có điều kiện viết `\mid`.

## 11. Kỹ thuật đã giới thiệu đến hết Bài 13

Kiểm bằng `grep -il` trên `2627-1/lecture-*.html` (trừ tệp backup) và ghi chú Bài 10–11; ID trang là trang đầu tiên khớp.

| Kỹ thuật | Bài, trang giới thiệu | Trong deck 13 |
|---|---|---|
| Biến phụ đưa cực đại của hàm affine về quy hoạch tuyến tính | deck 02 (trang có "Kỹ thuật biến phụ") | không dùng |
| Bất đẳng thức tam giác | deck 01, F03; deck 02, S01-01; deck 10, KV03b | dùng không nhãn (L13-4-06, L13-5-05) |
| Tổng cấp số nhân, chặn bằng cấp số nhân | deck 04, RG17; deck 05b, A03; deck 06, D06; deck 06b, A01 | "Nhắc lại:" L13-1-02; dùng L13-3-04, L13-4-06 |
| Tổng lồng | deck 04, RG15; deck 05b, A02 và C02 ("Mẫu 1") | "Nhắc lại:" một dòng, L13-3-08 |
| Phép co của dãy sai số một bước | deck 05b, C02 | ghi chú diễn giả L13-4-07 |
| Quy nạp theo bước | deck 05b, C02; deck 06b, A01 | dùng không nhãn (L13-2-03, L13-4-06) |
| Xác suất toàn phần, quy tắc nhân | deck 00, D04; deck 10, MD01 | "Nhắc lại:" L13-1-02 |
| Kỳ vọng toàn phần | deck 05b, E05; deck 06, F01c; deck 10, MD01 | "Nhắc lại:" L13-1-02; dùng L13-3-07, L13-3-08 |
| MLE phân loại bằng số đếm | ghi chú và deck Bài 11 (Định lý 11.7) | "Nhắc lại:" L13-1-02; dùng L13-6-01 |
| Mở rộng trạng thái | Bài 07 (Nhận xét 07.47) | "Nhắc lại:" L13-6-06 |
| **Nguyên lý ánh xạ co** (Định lý 13.17) | **mới: deck 13, L13-4-07** | trang "Kỹ thuật." |
| So với phần tử bất kỳ rồi lấy cận dưới đúng | deck 12, trang ý tưởng chứng minh Hệ quả 12.15 (một dòng "Kỹ thuật.") | "Nhắc lại:" một dòng, L13-4-04 (ở đây lấy cực đại theo $a$) |
| Kẹp hai chiều (một đối tượng đạt cận, mọi đối tượng không vượt cận) | mới: deck 13, L13-5-02 (một dòng) | — |
| Chèn một đại lượng trung gian rồi chuyển vế | deck 12, trang ý tưởng chứng minh Hệ quả 12.15 (một dòng "Kỹ thuật.") | "Nhắc lại:" một dòng, L13-5-05 (chèn $TV$) |

## 12. Rủi ro, đề xuất sửa ghi chú, điểm cần điều phối viên quyết định

**Điểm cần quyết định**

1. **Số trang 57** (khoảng 45–55, trần 60 theo NT27; chỉ thị điều phối viên sau cổng duyệt cho phép tới 58). Hai trang `thêm`: L13-3-02 tách Định nghĩa 13.5 để định nghĩa $\tau$, $s_\tau$ trước (5.1) và gắn nhãn giả thiết tại lời phát biểu (T4, T5, T11); L13-7-02 là phần tiếp của bảng tổng kết sau khi thêm Bổ đề 13.11 và Định lý 13.17 (T8). Lời giải Bài tập 13.13 dồn sang L13-7-05 để trang đề giữ đúng câu chữ của đề (T12). Thời lượng tính lại: L13-3-01 và L13-3-02 mỗi trang 1,5 phút, L13-7-01 và L13-7-02 mỗi trang 1 phút; tổng vẫn 120 phút. Đã gộp: Ví dụ 13.4 vào L13-3-11; Ví dụ 13.7, 13.9, 13.10 và Nhận xét 13.20, 13.29 vào ghi chú diễn giả; chứng minh Mệnh đề 13.2 thành một dòng.
2. **Phân loại kết quả chính/phụ cho NT6** (§4): trang ý tưởng chứng minh riêng cho Bổ đề 13.11, Định lý 13.12, Mệnh đề 13.16, Định lý 13.17, Định lý 13.19; Mệnh đề 13.2, Mệnh đề 13.8, Hệ quả 13.21, Mệnh đề 13.22, Hệ quả 13.26 chỉ có dòng "Chứng minh." hoặc ghi chú diễn giả. Cần chốt để người duyệt không xếp `nghiêm trọng` theo NT6.
3. **Ví dụ robot với hai hành động ở mạch mở đầu** (L13-1-06, sau "Vấn đề trung tâm"), theo thứ tự §3 của ghi chú. Phương án khác: chuyển thành trang đầu mạch 3 (không đổi số trang). Chọn phương án hiện tại vì câu hỏi mở đầu của ghi chú đứng trước mục tiêu học tập và cả bài trả lời nó.
4. **Nhãn giả thiết (M1)–(O3) trên mặt trang** (L13-3-01, L13-3-08, L13-3-10, L13-4-01, L13-4-07, L13-5-02, L13-6-01) theo NT2; CLAUDE.md học phần cấm mã kiểu "T7", "H2" của bài khác. Các nhãn này là nhãn giả thiết của chính Bài 13, luôn đi kèm lời phát biểu ở L13-3-01; xin chốt cho phép.
5. **`robot-mdp-slide.svg`** (quyết định điểm 5): người viết deck vẽ theo đặc tả ở §8; SVG của ghi chú giữ nguyên. `value-iteration.svg` (matplotlib) cần đo chữ ở 1600×900 và 390×844.
6. **Hình mới `two-step-paths.svg`** (§8): mang số của Ví dụ 13.2, thay cho phép nhân ma trận ở bước trực quan.
7. **Hai số hiệu kết quả trên một trang** (L13-2-03: Mệnh đề 13.2, Hệ quả 13.3; L13-4-03: Bổ đề 13.15, Mệnh đề 13.16; L13-5-05: Hệ quả 13.21, Mệnh đề 13.22; L13-6-01, L13-6-03): mỗi số hiệu xuất hiện một lần trên trang. Hiểu "trích số hiệu một lần mỗi trang" (NT5) là không lặp cùng một số; xin chốt.
8. **Định nghĩa 13.28 (đọc thêm) trên mặt trang** L13-6-03: cần cho MT 6 và Bài tập 13.3; ghi chú diễn giả nói rõ mức đọc thêm (NT5).

**Kỹ thuật dùng chung với Bài 12 hoặc 14 (đã chốt, quyết định điểm 9–10)**

9. **Chèn một đại lượng trung gian rồi chuyển vế**: deck 12 giới thiệu bằng một dòng "Kỹ thuật." trên trang ý tưởng chứng minh Hệ quả 12.15; deck 13 dùng một dòng "Nhắc lại:" cùng tên ở L13-5-05 (chèn $TV$, dùng tính co rồi chuyển vế).
10. **So với phần tử bất kỳ rồi lấy cận dưới đúng**: như mục 9; deck 13 nhắc lại ở L13-4-04, ở đây lấy cực đại theo $a$ (Bổ đề 13.15).
11. **Kỳ vọng toàn phần**: deck 10 đã có; Bài 12 dùng một lần, Bài 13 dùng ở Bổ đề 13.10–13.11. Chỉ "Nhắc lại:", không trang kỹ thuật.
12. **Nguyên lý ánh xạ co**: chỉ Bài 13 dùng (ghi chú 12, 14 không có "ánh xạ co", "điểm bất động"); giới thiệu ở deck 13. Bài 14 (Jensen, hoàn chỉnh bình phương, tái tham số hóa) không có kỹ thuật chung với Bài 13.

**Rủi ro khác**

13. Deck 07 trình bày phương trình Bellman tất định với $J_k$ và một ghi chú diễn giả nói "với chân trời vô hạn, phương trình thành phương trình điểm bất động"; deck 13 chỉ "Nhắc lại:" Định lý 07.49 (L13-1-02) và không lặp ví dụ đồ thị tầng của deck 07.
14. `\text{}` chứa tiếng Việt bị cấm trong KaTeX (NT26): các dòng có chữ quanh công thức (L13-4-02 "$x,y\in\mathbb R^d$", L13-5-05) đã viết chữ ngoài KaTeX.
15. Ký hiệu $T$ là toán tử Bellman; Murphy dùng $T$ cho ma trận chuyển (34.88). Ghi chú diễn giả L13-7-08 nêu khác biệt; mặt trang không dùng ký hiệu của Murphy.
16. `planning/lec-13/outline.md` còn danh sách bài tập cũ (13.1–13.11, tên cũ; review-log đã ghi). Không thuộc phạm vi ghi của vai này; điều phối viên đồng bộ khi chốt deck.

**Đề xuất sửa ghi chú (NT3; deck vẫn theo ghi chú)**

17. d.1451: "còn phần tử $Q(s,a)$ không được cập nhật theo (7.6)" dẫn công thức (7.6), chỉ được định nghĩa ở d.1466–1475 (§7.4), tức dẫn trước số hiệu (Q6 của `notes-10-14-slt-template.md`). Đề xuất: "còn một phương pháp học trực tiếp giá trị không có mẫu nào để cập nhật phần tử của cặp đó", hoặc chuyển câu xuống sau Định nghĩa 13.28. Deck không dẫn câu này trên mặt trang.
18. d.24 nêu $20/11$ và $6$ ở câu hỏi mở đầu trước khi có cách tính; deck giữ nguyên (L13-1-06, fragment) và ghi chú diễn giả cho hai phương trình sinh ra hai số đó. Không đề xuất sửa, chỉ ghi để người duyệt khỏi xếp vào NT9.
19. **G1 (cổng duyệt)**, d.1437: điều kiện cho MLE trên dữ liệu quỹ đạo thiếu "chính sách thu thập không dùng phần thưởng", mà Phụ lục A (d.1658–1661) cần. Đề xuất thêm điều kiện này vào d.1437; sau khi tác giả sửa, L13-6-02 thêm cùng điều kiện.
20. **G2 (cổng duyệt)**, d.6 và d.39: $U_k(\xi)$ (tập điều khiển của Bài 07) và $U$ (hàm $\mathcal S\to\mathbb R$, Định nghĩa 13.9) trùng chữ. Đề xuất viết d.6 như d.39 ($\min_u$); deck đã viết $\min_u$ ở L13-1-02.

## Quyết định của điều phối viên (2026-11-16, sau khi duyệt storyboard)

- Điểm 1 **chấp nhận:** 55 trang.
- Điểm 2 **chấp nhận:** kết quả chính có trang ý tưởng chứng minh riêng là Bổ đề 13.11, Định lý 13.12, Mệnh đề 13.16, Định lý 13.17, Định lý 13.19; các kết quả còn lại chỉ có dòng "Chứng minh." hoặc ghi chú diễn giả.
- Điểm 3 **chấp nhận:** ví dụ robot ở mạch mở đầu, vì ghi chú mở bằng chính câu hỏi này. Mặt trang L13-1-06 chỉ dùng $h$, $z$, $A$, $B$, $\gamma=0{,}9$ và lời ("tổng thưởng chiết khấu kỳ vọng khi luôn chọn $A$"), không dùng $V^A$, $V^\pi$ trước khi định nghĩa (NT9).
- Điểm 4 **chấp nhận:** (M1)–(O3) là nhãn giả thiết của chính ghi chú Bài 13 (NT2); lần đầu mỗi nhãn đi kèm lời phát biểu.
- Điểm 5 **chấp nhận** phương án `robot-mdp-slide.svg` (cùng dữ liệu, chữ lớn); SVG của ghi chú giữ nguyên.
- Điểm 6 **chấp nhận.**
- Điểm 7 **chấp nhận:** NT5 nghĩa là không lặp cùng một số hiệu trên một trang.
- Điểm 8 **chấp nhận.**
- Điểm 9–10: deck Bài 12 giới thiệu hai mẹo ("chèn rồi chuyển vế" và "so với phần tử bất kỳ rồi lấy cận dưới đúng") bằng một dòng "Kỹ thuật." trên trang ý tưởng chứng minh Hệ quả 12.15. Deck 13 dùng **cùng tên** trong một dòng "Nhắc lại:" (không dẫn số trang deck 12).
- Điểm 11, 12 **chấp nhận.**
- Điểm 16: điều phối viên đồng bộ `outline.md` khi chốt deck.
- Điểm 17 ghi vào `review-log.md` làm đề xuất sửa ghi chú cho tác giả.

## Sửa theo cổng duyệt (2026-11-16)

Đầu vào: `planning/lec-13/reviews/deck-storyboard-gate.md` (0 chặn, 2 nghiêm trọng, 12 trung bình, 18 nhẹ, 3 đề xuất sửa ghi chú); điều phối viên chấp nhận mọi phát hiện. Mã trang trong bảng là mã sau khi đánh số lại (mạch 3 có trang mới L13-3-02, các trang cũ L13-3-02 … L13-3-10 thành L13-3-03 … L13-3-11; mạch 7 có trang mới L13-7-02, các trang cũ L13-7-02 … L13-7-07 thành L13-7-03 … L13-7-08). Mật độ đếm lại bằng script cho cả 57 trang (§6.8). Văn bản mới tự kiểm theo `no-ai-slop` (Edit, `eval.md`) và NT.

| Mã | Mức độ | Trang hoặc mục | Xử lý |
|---|---|---|---|
| N1 | nghiêm trọng | L13-6-02 | đã sửa: dòng 1–2 giữ đủ ba giả thiết của d.1437 (hàng là tham số tự do; chính sách thu thập và phân phối ban đầu không phụ thuộc tham số). Điều kiện "không dùng phần thưởng" chờ G1. |
| N2 | nghiêm trọng | L13-6-03 | đã sửa (phương án 1): dòng kỳ vọng của $Y_t$ chuyển vào ghi chú diễn giả, kèm hai điều kiện của d.1480. |
| T1 | trung bình | L13-4-04, L13-5-05, §4, §7, §11, §12 | đã sửa: hai dòng "Nhắc lại:" với đúng tên của deck 12; §11 ghi deck 12 (trang ý tưởng chứng minh Hệ quả 12.15) là nơi giới thiệu, không dẫn số trang deck 12 trên mặt trang; §12 mục 9–10 viết lại. |
| T2 | trung bình | L13-1-06, §5, §8, §12 | đã sửa: L13-1-06 dùng `robot-mdp-slide.svg` (người viết deck vẽ); thêm hàng đặc tả ở §8. |
| T3 | trung bình | L13-1-06 | đã sửa: hai fragment "So phần thưởng một bước: $A$ hơn vì $1>0{,}6$." và "Tổng thưởng chiết khấu kỳ vọng: luôn $A$ được …, luôn $B$ được $6$."; trường "Lý do" ghi quyết định đã chốt. |
| T4 | trung bình | L13-3-01, L13-3-02 | đã sửa: (O1), (M2), (O2) gắn tại lời phát biểu ở L13-3-01; (M1) ở L13-3-02. |
| T5 | trung bình | L13-3-02, L13-3-03 | đã sửa: trang mới L13-3-02 định nghĩa $H_t$, $\tau$, $s_\tau$ trước (5.1); L13-3-03 thêm dòng $\mathbb P_\rho$, $\mathbb E_\rho$, dòng "chính sách phụ thuộc lịch sử" chuyển vào ghi chú diễn giả. |
| T6 | trung bình | L13-3-01, L13-4-01, L13-5-01, L13-6-01 | đã sửa: câu hỏi của mạch lên trang nội dung đầu tiên (L13-3-01 dòng 1; L13-4-01 dòng "Câu hỏi:"; L13-5-01 đủ hai phần; L13-6-01 dòng 1 "Robot thật chưa biết …"). L13-4-01 chuyển dòng "Cực đại đạt vì (O1); $T^{\pi_U}U=TU$" vào ghi chú diễn giả. |
| T7 | trung bình | L13-4-03, §7 | đã sửa: "Trực quan." trước Bổ đề 13.15; "Ý nghĩa:" rút còn một vế; kiểm bằng số $0{,}5\le0{,}9$ trong ghi chú diễn giả; §7 ghi TQ = L13-4-03. |
| T8 | trung bình | L13-7-01, L13-7-02, §9 | đã sửa: thêm hàng Bổ đề 13.11 và Định lý 13.17 (gộp với Hệ quả 13.18); "so với mọi chính sách" sang cột công thức; MLE thêm "cùng phân phối"; bảng chín hàng vượt 80 âm tiết nên tách hai trang (64 và 41 âm tiết). |
| T9 | trung bình | L13-1-02 | đã sửa: một nhãn "Nhắc lại:" cho cả danh sách; thêm "Ký hiệu:" ($t$, $k$, $n$, $m$); bỏ "dãy Cauchy số thực hội tụ" khỏi mặt trang (ở ghi chú diễn giả; L13-4-06 nói tại chỗ). |
| T10 | trung bình | L13-1-03 | đã sửa: mục tiêu 4 giữ "theo điểm bất động"; mục tiêu 1 giữ "lập ma trận chuyển"; mục tiêu 6 giữ "tính mục tiêu Bellman"; tổng 80 âm tiết. |
| T11 | trung bình | §6.8, §12, 57 trang | đã sửa: bỏ quy tắc dự phòng trái NT7, NT23; thêm hai trang (57, dưới trần 60) và rút chữ; Bổ đề 13.10 sang dòng đầu L13-3-08; tính lại thời lượng (120 phút). Sau sửa: 0 trang nội dung vượt 60 ngoài ngoại lệ L13-7-04 (63, đề bài nguyên văn). |
| T12 | trung bình | L13-7-04, L13-7-05 | đã sửa: dòng câu hỏi định nghĩa $\pi_{\mathrm L}$, $\pi_{\mathrm R}$; câu (b) đúng chữ của đề; lời giải (a), (b) ở trang kế cùng tiêu đề; xóa câu "câu (b) của đề đầy đủ" khỏi ghi chú diễn giả. |
| L1 | nhẹ | L13-3-08 | đã sửa: "Nhắc lại:" tổng lồng; dòng riêng "Với $\gamma=1$, $\gamma^K\not\to0$: bước cuối hỏng." |
| L2 | nhẹ | L13-4-04, L13-5-02 | đã sửa: "(giả thiết O2)", "(giả thiết O1)" ở L13-4-04; "(O1)" ở bước 1 của L13-5-02; "Lý do" L13-4-04 ghi danh sách có số. |
| L3 | nhẹ | L13-5-05, L13-5-06 | đã sửa: L13-5-05 tách "Giả thiết:" và "Bảo đảm:" (chặn tất định theo mô hình đang dùng); L13-5-06 thêm "Thuật toán 13.23.", "Cập nhật", "Dừng khi" không in đậm. Mệnh đề 13.8, Bổ đề 13.15 (kết quả phụ chung trang) giữ dạng hiện tại như báo cáo cho phép. |
| L4 | nhẹ | L13-2-04, L13-3-11, L13-5-03, L13-5-08, L13-6-05, L13-6-06 | đã sửa: thêm dòng nhiệm vụ "Tính …"/"Xác định …"/"Kiểm …". |
| L5 | nhẹ | L13-2-00, L13-3-00, L13-4-00, L13-6-00, L13-7-00 | đã sửa: ghi chú diễn giả trang tiêu đề mạch nêu việc của mạch với chủ ngữ là đối tượng toán học, không lời dẫn đường. |
| L6 | nhẹ | L13-1-03, L13-1-06, L13-3-08, L13-4-01, L13-4-07, L13-5-03, L13-6-01, L13-7-05 | đã sửa: cắt câu quy trình, "(trang tiên quyết)", khuôn "Muốn … còn phải"; câu về Bài 04, 05b viết theo đề xuất. |
| L7 | nhẹ | L13-5-01, L13-6-03, L13-2-05, L13-3-05, L13-5-07 | đã sửa: hai ghi chú rút dưới 150 âm tiết; ba ghi chú trang bài tập thêm gợi ý của ghi chú và nhầm lẫn dễ gặp (cùng L13-6-04, L13-7-05). |
| L8 | nhẹ | L13-5-08 | đã sửa: "không thay được $\gamma<1$". |
| L9 | nhẹ | L13-4-02 | đã sửa: "… khi $T$ làm khoảng cách hai vector giảm theo tỉ lệ cố định nhỏ hơn $1$" (rút "mỗi lần áp dụng" để giữ dòng ≤ 20 âm tiết). |
| L10 | nhẹ | L13-6-06 | đã sửa: kết luận về (4.1) đứng sau hai xác suất có điều kiện; dòng $G_1$ nói hàm giá trị không nhận cả hai; "không mô tả đúng cơ chế". |
| L11 | nhẹ | L13-5-01, L13-3-07 | đã sửa: hai dòng "Trực quan." nêu cơ chế (tham lam giữ $\bar V$, chọn khác là trung bình; cộng dồn $K$ bước, phần dư $\gamma^KU(S_K)\to0$). |
| L12 | nhẹ | L13-5-02 | đã sửa: tiêu đề "Ý tưởng chứng minh: phương trình Bellman tối ưu". |
| L13 | nhẹ | L13-1-02 | đã sửa: $\min_u$ như d.39; bỏ câu trả lời câu hỏi ôn nhanh và câu về Mệnh đề 12.16 khỏi ghi chú diễn giả; đề xuất G2 ở §12 mục 20. |
| L14 | nhẹ | L13-6-00, §3 | đã sửa: dòng dẫn "Số đếm ước lượng mô hình chưa biết; mọi bảo đảm của quy hoạch chỉ thuộc về mô hình ước lượng." (21 âm tiết). |
| L15 | nhẹ | L13-1-04, §6.8 | đã sửa: ghi rõ dòng "Đọc trước" là `<p>` sau danh sách 7 mục. |
| L16 | nhẹ | L13-6-05 | đã sửa: "mô hình ước lượng có $\hat Tv=\ldots$"; xác suất $1/1024$ giữ trong ngoặc, lời giải thích ở ghi chú diễn giả. |
| L17 | nhẹ | L13-2-02 | đã sửa: điều kiện "với mọi $i$ có $\mathbb P(S_t=i)>0$" ở dòng định nghĩa ma trận chuyển. |
| L18 | nhẹ | L13-3-04 | đã sửa: "Luôn chọn $B$, cộng không trọng số: …". |
| G1 | đề xuất sửa ghi chú | d.1437 | ghi vào §12 mục 19; không sửa ghi chú (NT3). |
| G2 | đề xuất sửa ghi chú | d.6, d.39 | ghi vào §12 mục 20; deck đã viết $\min_u$. |
| G3 | đề xuất sửa ghi chú | d.1451 | đã có ở §12 mục 17. |

Không phát hiện nào bị bỏ qua. Một ngoại lệ mật độ còn lại có lý do: L13-7-04 (63 âm tiết, đề bài nguyên văn).

## Lệch storyboard khi dựng deck (người viết deck, 2026-11-16)

Deck `lecture-13-quyet-dinh-tuan-tu-bat-dinh.html`, 57 trang, đúng danh sách §6. Các chỗ lệch và lý do:

| Trang | Lệch | Lý do |
|---|---|---|
| mọi trang có số hiệu công thức | `\tag{n}` thay bằng `\qquad(n)` trong công thức hiển thị | ở 390 px, nhãn `\tag` của KaTeX đè lên công thức khi công thức cuộn ngang |
| L13-3-08, L13-3-10, L13-4-04, L13-4-06, L13-5-02 | công thức hiển thị đứng ngoài `<li>`; danh sách bước tách hai `<ol>` (`start="…"`), số bước giữ nguyên | `ol` của Reveal là `inline-block`, công thức trong `li` kéo rộng danh sách ra ngoài màn hẹp |
| L13-1-06, L13-2-01, L13-3-01, L13-3-11, L13-5-04, L13-5-08, L13-6-02, L13-6-05, L13-7-03 | dữ kiện, trường hợp, câu trả lời song song thành danh sách `<ul>` | NT14, NT20; chữ không đổi |
| L13-3-10 | bước 3: "thỏa $W=T^\pi W$: (5.11) với dấu bằng, $\rho=\pi$, $U=W$"; bước 4: "mọi nghiệm $V$ thỏa $(I-\gamma P^\pi)V=r^\pi$, nên $V=W$" | trang chạm chân trang ở 1600×900 |
| L13-5-03 | hai dòng dữ kiện và nhiệm vụ gộp một dòng; bỏ "và hành động đạt cực đại" khỏi dòng nhiệm vụ (cột bảng đã ghi); "Diễn giải:" rút gọn, giữ ý | chạm chân trang |
| L13-5-04 | bỏ "$(6;\,0)=T(6;\,0)$" và "Hệ quả 13.18" khỏi dòng 1–2, "$v_k\ge1$ với $k\ge1$" và dòng "Kiểm tra … (6.7)" chuyển vào ghi chú diễn giả; số $8/9$, $6$ của hình vẫn trên mặt trang | hình `value-iteration.svg` cao 300 px làm trang chạm chân trang |
| L13-6-04 | dòng "Kiểm tra: $\tfrac45\cdot2{,}5+\tfrac15\cdot0{,}5=2{,}1$" chuyển vào ghi chú diễn giả; (a) rút "giá trị nhìn trước"; lời giải (a) bỏ bước $1+\tfrac12\cdot2{,}2$ (giá trị $2{,}2$ ở ghi chú diễn giả) | chạm chân trang |
| L13-6-06 | hai dòng "nên $X_t$ không thỏa (4.1)" và "Cùng quan sát …" gộp một đoạn | giữ 5 dòng |
| L13-7-05 | dòng "Vòng đầu, $V_0=0$ chưa chứa phần đuôi …" chuyển vào ghi chú diễn giả | chạm chân trang |
| L13-5-03, L13-7-05 | bảng lặp dùng lớp `stack-table`, nhãn `data-label` là chữ thường ("vₖ", "Q(h, A)", "Hành động"…) vì `attr()` không hiển thị KaTeX | ở 390 px bảng xếp theo hàng, không cần cuộn ngang |
| L13-7-07 | dòng "Ghi chú bài giảng · Bài tập" là hai liên kết tới trình xem | NT15 |
| `robot-mdp-slide.svg` | viewBox 900×500; tên trạng thái ("hoạt động", "hấp thụ") và $\gamma=0{,}9$ ở một dòng chú giải cuối hình thay vì dưới hai hình tròn | tránh đè lên mũi tên cong; chữ ≈ 17 px ở 1600×900 |

Ngoại lệ `deck_lint` còn lại: L13-7-04 (SYLL60, 63 âm tiết theo lint), lý do ở §6.8.

## Biên tập sau năm báo cáo duyệt (2026-11-16)

Đầu vào: năm báo cáo `reviews/deck-{sinh-vien,toan-hoc,chuyen-gia,su-pham,mach-truyen}.md` và quyết định D1–D11 của điều phối viên (`review-log.md`). Mục này thắng các mục trước về ID, tiêu đề, mật độ và thời lượng.

**Bảng ID (cũ → mới), trang thêm, đổi tiêu đề và thời lượng.** Trang không có trong bảng giữ ID, tiêu đề và thời lượng cũ.

| ID cũ | ID mới | Tiêu đề mới | Phút | Ghi chú |
|---|---|---|---:|---|
| L13-3-04 | L13-3-04 | Tổng thưởng chiết khấu và hàm giá trị | 1,5 | tách (sinh-vien, su-pham, toán-hoc): Định nghĩa 13.7 với quy ước $\gamma^0=1$ |
| — | L13-3-05 | Tồn tại giá trị và chặn phần đuôi | 1,5 | `thêm`: Mệnh đề 13.8 với "Giả thiết:", "Kết luận:" đủ ("hội tụ tuyệt đối"), dòng "Chứng minh.", robot $\lvert G_t\rvert\le10$; tên theo ghi chú |
| L13-3-05 … L13-3-11 | L13-3-06 … L13-3-12 | không đổi | L13-3-12: 2 | dời số |
| L13-4-07 | L13-4-07 | Nguyên lý ánh xạ co | 1,5 | tách: trang "Kỹ thuật." (tên tiếng Anh, "còn gọi là định lý điểm bất động Banach", "Dùng khi …", chỗ dùng trong bài) |
| — | L13-4-08 | Hội tụ của lặp giá trị | 2 | `thêm`: Hệ quả 13.18 (tên theo ghi chú, P3), lượng từ "với mỗi $\pi$ Markov dừng" |
| L13-5-01 | L13-5-01 | Phương trình Bellman tối ưu và chính sách tham lam tối ưu | 3 | đổi tiêu đề (su-pham) |
| L13-5-02 | L13-5-02 | Ý tưởng chứng minh: phương trình Bellman tối ưu và chính sách tham lam tối ưu | 3 | đổi tiêu đề |
| L13-5-04 | L13-5-04 | không đổi | 2,5 | D1: `value-iteration-slide.svg` (màn rộng) và `value-iteration-slide-narrow.svg` (màn hẹp, lớp `only-wide`/`only-narrow`) |
| L13-6-03 | L13-6-03 | Hai cách dùng trải nghiệm | 1,5 | tách (D4): Định nghĩa 13.27, câu nối P6 |
| — | L13-6-04 | Mục tiêu Bellman từ mẫu | 2,5 | `thêm` (D4): Định nghĩa 13.28, "bảng giá trị hành động (action value)", "Ý nghĩa:" kỳ vọng của $Y_t$ với đủ hai điều kiện d.1480, "Lưu ý:" Q-learning |
| L13-6-04 … L13-6-06 | L13-6-05 … L13-6-07 | không đổi | L13-6-07: 3 | dời số |
| L13-7-02 | L13-7-02 | không đổi | 0,5 | |

Tổng thời lượng theo mạch: 8 + 12 + 26 + 20,5 + 21,5 + 18,5 + 13,5 = 120 phút. Số trang 60, bằng trần NT27; ba trang thêm do D4 và hai phát hiện mật độ (L13-3-04 ở 60/60 phải nhận thêm "Giả thiết:" và quy ước $\gamma^0=1$; L13-4-07 lên 89 âm tiết khi thêm tên kỹ thuật và lượng từ).

**Ngoại lệ mật độ sau biên tập (đếm bằng `deck_lint.py`):**

- L13-1-03 (Mục tiêu học tập): 111 âm tiết sau lượt kiểm lại 1 (N5: "phương trình Bellman tối ưu"), < 120 = 1,5 × 80 (D3, điều phối viên chấp nhận N5). Mỗi mục có động từ và đúng nghĩa mục tiêu của ghi chú; các thành phần của mục tiêu 2 ở ghi chú diễn giả.
- L13-7-04 (Bài tập 13.13, đề): 68 âm tiết (< 90 = 1,5 × 60), vì khôi phục "không có trạng thái kết thúc" và "có đúng hai chính sách tất định dừng" (toán-hoc, D6) và đặt câu "Giải thích …" trong đoạn (b) (su-pham).
- Các trang còn lại ≤ 60 âm tiết, ≤ 6 dòng.
- Dòng dài hơn 20 âm tiết (`deck_check.py` cờ LINE20), giữ có lý do: L13-1-03 (mục tiêu 4, đúng nghĩa ghi chú theo D3); L13-2-02 (dòng định nghĩa xích Markov thuần nhất mang hai tên tiếng Anh và điều kiện có tính Markov, NT21, D6); L13-4-07 (dòng "Kỹ thuật." mang tên tiếng Anh và tên gọi khác); L13-6-01 (một đoạn gồm "Câu hỏi:" và "Trực quan.", tách ra sẽ thành 7 dòng); L13-6-04 (dòng Định nghĩa 13.28 mang hai tên tiếng Anh); L13-7-04 (đề Bài tập 13.13 giữ đủ điều kiện). Mỗi dòng hiển thị không quá hai dòng ở 1600×900.
- L13-7-01, L13-7-02: hàng "Điểm bất động, lặp giá trị" chuyển sang trang (tiếp) để bảng không tràn khung sau khi đổi tên hàng thành "Phương trình Bellman cho chính sách dừng"; mỗi trang bốn hàng.

**Bảng công thức:** (6.4) viết bằng `aligned` hai dòng; (6.9) bỏ vế giữa (hai nhánh $Q_{V_k}(h,A)$, $Q_{V_k}(h,B)$ ở ghi chú diễn giả) để không tràn khung 1248 px (D2). Hai bảng lặp L13-5-03, L13-7-05 giữ `stack-table`.

**Bài tập về nhà (L13-7-07):** 13.14 sang mục 3 (D7); "(trên lớp)" cho 13.1, 13.4, 13.2, 13.13, 13.3 (D9).

**Kỹ thuật (§11, cập nhật theo D8):** L13-5-05 viết "Nhắc lại: chèn một đại lượng trung gian; ở đây chèn $TV$ rồi chuyển vế". L13-4-04 giữ tên "so với phần tử bất kỳ rồi lấy cận dưới đúng", nói rõ cách dùng ($f(a)\le\max_bg(b)+\delta$ với mọi $a$, rồi lấy cực đại theo $a$) và đứng trước bước dùng nó.

**Công thức ở 390 px (lượt sửa của điều phối viên, 2026-11-16):** mọi công thức hiển thị ngắt bằng `aligned`, mỗi quan hệ một dòng, không cuộn ngang ở 390×844 (đo bằng Playwright: danh sách `.formula` có `scrollWidth > clientWidth + 2` rỗng). Để không chạm chân trang ở 1600×900, các trang L13-2-02, 2-03, 3-02, 3-03, 3-05, 3-07, 3-09, 3-11, 4-01, 4-02, 4-03, 4-04, 4-05, 5-01, 5-02, 5-03, 5-05, 6-04, 6-07 đặt công thức cạnh chữ bằng `grid2` (thứ tự đọc ở màn hẹp giữ nguyên). Số hiệu (5.2), (6.5), (6.6), (6.9)–(6.11) chuyển vào dòng chữ đứng trước khi cần; một số tổng dùng `\textstyle`. L13-3-02: số liệu robot chuyển vào ghi chú diễn giả (D10 "khi còn chỗ"). L13-3-09, L13-3-11: dòng "Với $\gamma=1$ …" gộp vào bước 4 và bước 2. L13-5-03: "Diễn giải:" đứng cạnh (6.9), trước bảng. L13-5-05: bất đẳng thức của dòng "Nhắc lại:" chuyển vào ghi chú diễn giả.

**Kiểm lại 2 (P1–P4):** L13-3-02 câu dẫn "Xác suất chuyển và phần thưởng kỳ vọng một bước:" đứng ngay trên hai công thức, số hiệu (5.2) gắn vào công thức trái; số liệu robot ở ghi chú diễn giả (thêm vào câu dẫn làm câu xuống hai dòng và trang chạm chân trang). L13-5-03: "Diễn giải:" sau bảng; câu "Tính $v_1,\ldots,v_4$ theo" đứng trên (6.9) ở cột phải. L13-5-05: (6.10), (6.11) gắn vào hai khối; "Nhắc lại:" ở cột phải. L13-4-03: bỏ chứng minh Bổ đề 13.15 khỏi ghi chú diễn giả.

**Hình:** sau lượt kiểm lại 1 (N6), L13-1-06 thêm `robot-mdp-slide-narrow.svg` (lớp `only-narrow`, chữ 44–56 trên viewBox 900, ≥ 16 px ở 336 px); `two-step-paths.svg` dùng chữ ≥ 34 trên viewBox 680 (≥ 16,8 px ở 336 px). Trước đó, `robot-mdp-slide.svg` và `two-step-paths.svg` tăng cỡ chữ (34–46 và 30–36 trên viewBox 900 và 680) để màn hẹp đọc được hơn; dữ liệu không đổi. `value-iteration-slide*.svg` vẽ lại dữ liệu Hình 13.2: hai nhánh và đường chéo gọi bằng chữ, công thức hai nhánh ở mặt trang L13-5-04; chữ 24 trên viewBox 1000 (màn rộng), 30 trên viewBox 600 (màn hẹp). SVG của ghi chú giữ nguyên.

## Phụ lục: bản đồ mạch của ghi chú

Nội dung cũ của tệp này, chép nguyên văn (chỉ hạ cấp tiêu đề).

### Mạch khái niệm của ghi chú Bài 13 (nguyên văn bản cũ)

Tài liệu chỉ có ghi chú, không có trang chiếu.

| Mạch | Nhu cầu và ví dụ | Công cụ và chứng minh | Kết quả cùng giới hạn |
|---|---|---|---|
| 13.1 | Trạng thái robot thay đổi ngẫu nhiên; xích hai trạng thái | Markov, thuần nhất, xác suất toàn phần, truyền vector hàng | Phân phối sau nhiều bước; chuyển tiếp khác xác suất đồng thời; Markov khác độc lập |
| 13.2 | Hành động đổi khả năng nhận thưởng về sau; robot A/B | MDP có điều khiển, chính sách, tổng thưởng, Bellman theo chính sách | Giá trị hữu hạn nhờ thưởng bị chặn và chiết khấu; chính sách phụ thuộc lịch sử cần phân biệt với chính sách dừng |
| 13.3 | Thưởng tức thời cao chưa tối ưu dài hạn | Bất đẳng thức cực đại → tính co → điểm bất động → chính sách đạt được và chặn mọi chính sách | Giá trị tối ưu6; lặp từ0 cho1,1.5,1.95,2.355; chỉ số vòng tính toán khác thời điểm hành động |
| 13.4 | Chuyển tiếp thường chưa biết; chỉ có dữ liệu tương tác | MLE từng hàng khi lấy mẫu phù hợp; xác suất quỹ đạo; mục tiêu Bellman từ mẫu | Thăm dò và bao phủ; mô hình ước lượng khác môi trường thật; không chuyển bảo đảm VI sang Q-learning |

Hình robot-mdp.svg phân biệt trạng thái tròn với ô hành động. Hình value-iteration.svg cho hai nhánh Bellman, điểm bất động và dãy lặp. Cả hai có alt trong note và title/desc trong SVG; đoạn đọc hình nối với ví dụ cụ thể.

Hai tình huống cuối nội dung phải giải trọn vẹn và nhắc đủ dữ kiện; ít nhất một tình huống nêu giả thiết bị vi phạm. Bài tập gồm suy diễn, tính toán, kết nối AI và phản biện; phân biệt bài lớp30 phút với homework180 phút.

Mở bài nối với Bellman tất định07.49. Kết bài giữ câu hỏi về cách chọn mô hình và trạng thái đủ thông tin, dẫn sang biến ẩn và biểu diễn ở Bài14 trong kế hoạch. Không dạy lại Bayes, Lagrange hoặc toàn bộ lý thuyết tối ưu của các bài trước.
