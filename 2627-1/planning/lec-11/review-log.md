# Nhật ký rà soát bộ trang chiếu Bài 11 — Học từ dữ liệu qua ước lượng thống kê

Nhật ký soạn và rà soát ghi chú bài giảng nay ở `review-log-lecture-note.md` (đổi tên bằng `git mv`, tiền lệ Bài 07 và Bài 10). Tệp này ghi quy trình của bộ trang chiếu.

## Trạng thái

2026-11-07: giai đoạn A (planning) do author-lec11 soạn: `outline.md` (dàn ý deck, kế hoạch ghi chú cũ ở "Phụ lục"), `storyboard.md` (bảng mạch lập luận cũ ở "Phụ lục"), tệp này. Cổng storyboard: đạt có điều kiện (0 chặn bàn giao, 1 nghiêm trọng); 22 phát hiện đã sửa trong planning; storyboard có 75 mục trang (cổng #8 thêm TK04). Giai đoạn B (deck HTML, SVG) do author-lec11 soạn: deck 76 trang (TK01 tách thành TK01, TK01b), một SVG mới, khối CSS Bài 11; `deck_check.py` đạt (mục "Soạn HTML"). Năm rà soát độc lập trên bản đóng băng v1: 0 chặn bàn giao, 1 nghiêm trọng (TS15), quyết định gộp D1, D2 và 52 mục (mục "Năm rà soát độc lập"). Chỉnh sửa do editor-lec11 thực hiện (mục "Chỉnh sửa"); `deck_check.py` đạt. Rà lại vòng 1 (rv-math, rv-pedagogy, rv-storyline): cả ba đạt, 14 mục nhẹ R1–R14. Chỉnh sửa đợt 2 sửa R1–R10, R12–R14 (R11 giữ có lý do) và công bố deck trên `index.html`, trình xem tài liệu (mục "Chỉnh sửa đợt 2"). Kiểm định cuối (final-lec11): không đạt ở lượt đầu vì F1 (ký hiệu KaTeX bị viết hoa trong tiêu đề GN07–GN09) và F2 (thiếu báo cáo rà tập trung từng mạch); F1 đã sửa trong CSS Bài 11, F2 và F3 đã ghi (mục "Rà tập trung bảy mạch", "Kiểm định cuối"). Điều phối viên ký duyệt sau khi kiểm lại ảnh và deck_check (mục "Kiểm định cuối").

## Phạm vi và yêu cầu người dùng

Yêu cầu người dùng (2026-11-07, `/goal`, nguyên văn): "sử dụng lecture note bài 11 của math-4-AI, xây dựng slide deck và đưa lên 2626-1/index.html theo các nguyên tắc về nội dung, văn phong, bố cục, cách diễn giải (đặc biệt là các chứng minh quan trọng) như đã thiết lập trong các file CLAUDE.md chung và riêng của học phần, sử dụng nguồn Murphy, tham khảo các slide của môn Xác suất thống kê ở ../MATH1101 khi cần cách diễn đạt, mô tả của các khái niệm Xác suất thống kê. Các nguyên tắc xung đột nhau thì lựa chọn nguyên tắc hợp lý hơn để việc xây dựng slide không bị thành vòng lặp không thoát được"

Ghi chú điều phối: "2626-1" là lỗi gõ của học kỳ hiện tại `2627-1/`; "../MATH1101" là `/data/tqlong/MAT1101` (symlink `/data/tqlong/lectures/MAT1101`).

Sản phẩm: `2627-1/lecture-11-hoc-tu-du-lieu-uoc-luong-thong-ke.html` (`<html lang="vi" data-lecture="11">`), SVG trong `2627-1/img/lec-11/`, planning trong `2627-1/planning/lec-11/`; sau kiểm định cuối, thẻ Bài 11 của `2627-1/index.html` có liên kết "Bài giảng", các liên kết ghi chú và bài tập thêm `&amp;deck=…`, và `"11"` được bỏ khỏi `DECKLESS_LECTURES` trong `2627-1/material-viewer.js`.

## Nhật ký tác tử

Ghi từ lời gọi công cụ của điều phối viên, không từ lời tự khai của tác tử. Điều phối viên điền bảng.

| Tác tử | Vai | Loại | Mô hình | Effort | Kết quả | Quyết định điều phối |
|---|---|---|---|---|---|---|
| planner-lec11 | Lập kế hoạch | general-purpose | opus | medium | Kế hoạch 10 mục (74 trang, bảy mạch, 15 trang chứng minh) | chấp nhận kèm Q-A…Q-L; Q-C1, Q-C2 sửa hai điểm theo báo cáo nguồn |
| sources-lec11 | Phân tích nguồn | general-purpose | opus | medium | Ánh xạ Murphy có trang PDF, mẫu MAT1101, lỗi MAT1101, kiểm số liệu, đề xuất chứng minh 11.14 | chấp nhận; điều phối viên kiểm mẫu §4.2.3 (PDF 140) và (4.95)–(4.96) (PDF 152) |
| author-lec11 (tiếp tục tác tử planner-lec11 bằng SendMessage) | Soạn: giai đoạn A, sửa theo cổng, giai đoạn B | general-purpose | opus | medium | Planning 74 trang; sửa 22 mục cổng; deck 76 trang, `gaussian-geometry-deck.svg`, khối CSS Bài 11 | giai đoạn A: chuyển cổng; giai đoạn B: chấp nhận sau khi điều phối viên chạy deck_check độc lập (76 trang, 0 lỗi console/KaTeX, chỉ cờ `path` dấu căn), kiểm diff CSS (chỉ thêm luật Bài 11) và xem ảnh HL06, GN06 (hai cỡ), HH01, TK01; ghi nhận lỗi `\tag` chồng chữ ở 390 px chuyển cho rà soát |
| gate-lec11 | Kiểm định storyboard | general-purpose | opus | high | 22 phát hiện (0 chặn, 1 nghiêm trọng HL06/HL07) | chấp nhận tất cả; G112 phương án A; thêm trang tự kiểm tra; giữ "ellipsoid" |
| rv-student, rv-expert, rv-math, rv-pedagogy, rv-storyline | Năm rà soát độc lập trên bản đóng băng v1 | general-purpose | opus | high | Năm báo cáo (mục "Năm rà soát độc lập") | hợp nhất trong `scratchpad/review-merge-lec11.md`: D1, D2, 52 mục, chấp nhận tất cả; 1 nghiêm trọng (TS15) điều phối viên kiểm lại với Murphy §4.6.3.4 (PDF 170) |
| editor-lec11 | Chỉnh sửa | general-purpose | opus | medium | Sửa D1, D2, 52 mục; SVG, CSS (một luật `.nocase`), planning (mục "Chỉnh sửa") | chấp nhận để rà lại: điều phối viên chạy deck_check độc lập (76 trang, 0 lỗi, mật độ trong trần, 0 `\tag`), `git diff --check`, kiểm CSS chỉ thêm luật Bài 11, xem ảnh HH01 (390), TS15, GN06 (390) |
| rv-math, rv-pedagogy, rv-storyline (tiếp tục bằng SendMessage) | Rà lại vòng 1: toán trên nội dung đổi; văn phong (`no-ai-slop` Detect) trên chữ đổi; mạch lập luận và rà tập trung cả năm mạch nội dung | general-purpose | opus | high | Ba báo cáo: cả ba đạt, 15 mục nhẹ (R1–R14) | chấp nhận; sửa ở đợt 2 |
| editor-lec11 (đợt 2 và hai lượt sửa nhỏ, tiếp tục bằng SendMessage) | Chỉnh sửa đợt 2: R1–R14, công bố (`index.html`, `material-viewer.js`, phiên bản tài nguyên); TS13 ($e\to$ câu không ký hiệu, $\nabla_{\boldsymbol\pi}$); sửa F1 và câu chữ TS13 theo kiểm định cuối | general-purpose | opus | medium | Mục "Chỉnh sửa đợt 2", "Kiểm định cuối" | chấp nhận: điều phối viên xem ảnh TS13, GN09 (1600×900) sau F1; deck_check `check-edit5` sạch |
| final-lec11 | Kiểm định cuối | general-purpose | opus | high | Bảng 8 hạng mục (mục "Kiểm định cuối") | không đạt ở lượt đầu (F1, F2 nghiêm trọng; F3 trung bình); đã sửa: F1 bởi editor-lec11, F2 và F3 bởi điều phối viên (ghi nhật ký) |

## Quyết định điều phối (master, 2026-11-07, sau kế hoạch planner-lec11 và báo cáo sources-lec11)

| Mã | Quyết định | Cách thực hiện trong planning |
|---|---|---|
| Q-A | Bảy mạch MD · HL · TS · G1 · GN · HH · TK với câu hỏi trung tâm, phân rã, đầu vào và đầu ra như kế hoạch; đích 74 ± 4 trang. | `outline.md`, "Bảy mạch"; `storyboard.md` (a). Planning có 74 trang: 5 + 9 + 17 + 13 + 15 + 10 + 5; sau cổng storyboard (#8) là 75 (mạch 7 có 6 trang). |
| Q-B | Mỗi mạch nội dung một "Bài tập: …" có "Lời giải:" trên mặt trang: HL08, TS08–TS09, TS16–TS17, G112, GN14, HH07–HH08, TK02–TK03; lời giải bài tự học 11.4–11.8 không lên mặt trang. | Đúng các mã trên. Câu (d) của Bài tập 11.2 trong ghi chú diễn giả TS16. Bài tự học chỉ dẫn ở TK05 và trong ghi chú diễn giả G112, GN13. |
| Q-C | Trang chứng minh riêng cho 11.3 (1), 11.4 (2), 11.7 (2, tách 3 nếu tràn), 11.9 (2), 11.11 (1), 11.14 (3–4), 11.15 (1), 11.17 (1–2); dòng lộ trình, mỗi bước một quan hệ, tên bước theo kết quả, chỗ dùng giả thiết. | HL07; TS04–TS05; TS13–TS14; G104–G105; G111; GN06–GN09 (4 trang); GN13; HH04. Tổng 15 trang chứng minh. Bảng P1–P8 của `outline.md`; phác thảo từng bước trong `storyboard.md` (c). |
| Q-C1 | Định lý 11.7: Lagrange chỉ tìm ứng viên; cực đại toàn cục và duy nhất do $\log t\le t-1$; không viện dẫn tính đủ của Mệnh đề 04.2(b); "Nhắc lại:" chỉ gồm hàm Lagrange và điều kiện dừng. | TS13: "Nhắc lại:" hàm Lagrange và điểm dừng $\nabla_u\mathcal L=0$; dòng lộ trình nói rõ Lagrange cho ứng viên. TS14: so sánh với mọi điểm của đơn hình bằng $\log t\le t-1$. |
| Q-C2 | Định lý 11.14: tách tâm → $h$ theo $C=S_n^{1/2}\Lambda S_n^{1/2}$ → cực đại duy nhất tại $\Sigma=S_n$ → không bị chặn khi suy biến; bỏ ý "song ánh"; chỉ cần $C\succ0$ và $S_n^{1/2}$ khả nghịch; 3 hoặc 4 trang. | Chọn 4 trang (GN06–GN09) vì GN07, GN08 mỗi trang đã có hai khối công thức. GN07 không có dòng song ánh (Phụ lục A L1524 không dùng); GN08 dùng $S_n^{1/2}$ khả nghịch cho $C=I_d\Rightarrow\Lambda=S_n^{-1}$. Gộp GN07 với GN08 nếu số đo thật cho phép. |
| Q-D | Lược §5.2 Beta và §6.2 KL (mỗi mục một câu trong ghi chú diễn giả); Nhận xét 11.18 mục 1 không lên mặt trang; add-one gọi là ước lượng MAP với tiên nghiệm Beta$(2,2)$ (Murphy (4.96), PDF 152). | Beta: ghi chú diễn giả TS05. KL: ghi chú diễn giả TS14. Nhận xét 11.18: mục 2 ghi chú diễn giả HH09, mục 3 ghi chú diễn giả HH02, mục 1 lược. Add-one: ghi chú diễn giả TS15. Danh sách đầy đủ: `outline.md`, mục cuối. |
| Q-E | Hai ví dụ xuyên suốt: dữ liệu cảm biến nền và dây chuyền kiểm tra một chiều; mỗi lần dùng lại nêu lại dữ kiện và trả lời câu hỏi mới. | `outline.md`, "Ví dụ xuyên suốt" (8 lần dùng dữ liệu cảm biến, 9 lần dùng dây chuyền một chiều). |
| Q-F | Khóa ký hiệu: $\mathbb P$, `\mid`, `{,}`; Bernoulli $p$; $\boldsymbol\pi$ đậm, $\pi_k$; trị riêng của $S_n$ là $\alpha_j$; mọi lệch ghi ở "Ngoại lệ có chủ đích". | `outline.md`, "Khóa ký hiệu và dữ kiện"; mục 2 dưới đây. |
| Q-G | Thuật ngữ tiếng Anh ở lần đầu theo bảng mục 8 của kế hoạch; thuật ngữ theo ghi chú, không theo MAT1101. | Lần đầu trên mặt trang: maximum likelihood estimation, MLE (MD01); independent and identically distributed, i.i.d.; anomaly detection (MD04); parametric statistical model, statistic, estimator, estimate (HL03); likelihood, log-likelihood (HL05); empirical risk, negative log-likelihood, NLL (HL06); plug-in prediction (TS06); binary cross-entropy (TS07); probability simplex (TS11); categorical cross-entropy (TS15, cổng #7); Laplace distribution (G107); bias, unbiased (G109); covariance matrix (GN02); sample covariance, outer product (GN03); precision matrix (GN06); Mahalanobis distance (HH02). Chỉ trong ghi chú diễn giả: sampling distribution (HL03), sufficient statistic (TS01, cổng #19), zero-count problem (TS05), add-one smoothing (TS15), whitening (HH01). |
| Q-H | Thứ tự cắt khi quá tải theo kế hoạch mục 10; không cắt trang chứng minh của 11.3, 11.4, 11.7, 11.9, 11.11, 11.14, 11.17. | Thứ tự cắt: (1) gộp TS08 với TS09 bằng fragment; (2) gộp HH05 với HH06; (3) chuyển G107 vào ghi chú diễn giả G106; (4) gộp GN13 vào dòng "Chứng minh." của GN12; (5) chuyển GN11 vào ghi chú diễn giả GN09; (6) bỏ hình tùy chọn `bernoulli-loglik.svg`. Ghi tại trường "Quyết định" của các mục storyboard tương ứng. |
| Q-I | SVG bắt buộc `img/lec-11/gaussian-geometry-deck.svg`; giữ nguyên `gaussian-geometry.svg` của ghi chú; tùy chọn `bernoulli-loglik.svg`. | `outline.md`, "Hình SVG"; HH01, TS06. |
| Q-J | Câu rào đón trạng thái của ghi chú (L140, 293, 425, 605, 880) không chép lên deck; sửa ghi chú ngoài phạm vi deck. | Các trang trực quan HL01, TS01, TS10, G101, GN01 mở bằng "Trực quan." và nêu nội dung khẳng định; mục "Nguồn" của năm trang này ghi rõ câu không chép. |
| Q-K | Ngoại lệ chấp nhận trước: trang "Nội dung" bảy dòng; ví dụ của Mệnh đề 11.3 đứng sau phát biểu (TS07); HH09 đứng sau bài tập HH07–HH08; G107 là trang bảng so sánh hai mô hình nhiễu, phép tính trong ghi chú diễn giả. | MD02, TS07, HH09, G107; ghi trong bản đồ hành trình (`storyboard.md` (b)) và mục 3 dưới đây. |
| Q-L | Chính sách kết thúc vòng lặp như master brief: chỉ `chặn bàn giao` và `nghiêm trọng` bắt buộc sửa; tối đa hai vòng rà lại. | Áp dụng từ cổng storyboard trở đi. |

## Ngoại lệ có chủ đích

1. **Giữ $\mathbb P$, không đổi sang `\Pr`** (tiền lệ Bài 10, ngoại lệ 2): deck theo ký hiệu của ghi chú Bài 11. Quy tắc `\mid` vẫn áp dụng.
2. **Lệch ký hiệu so với ghi chú** (Q-F; cũng ghi ở `outline.md`, "Khóa ký hiệu"):
   - vector tham số phân loại viết đậm $\boldsymbol\pi$, thành phần $\pi_k$ (ghi chú: $\pi$ thường, L102, L431–453), để phân biệt với hằng số $\pi$ của mật độ Gaussian và khớp deck 10 (PP07);
   - trị riêng của $S_n$ trong chứng minh Định lý 11.14 viết $\alpha_j$ (ghi chú: $a_j$, L1102, L1516), vì $a$ là sản phẩm mới;
   - cạnh ô vuông nhỏ trong diễn giải mật độ tại tâm viết $\delta$ (ghi chú: $h$, L1161), vì $h$ là hàm $h(\Lambda)$ của chứng minh trong cùng mạch; $\delta$ cũng là ký hiệu khoảng nhỏ của deck 10. Sau rà soát #9, câu này chỉ còn trong ghi chú diễn giả GN10, không lên mặt trang;
   - tham số Bernoulli viết $p$ như ghi chú (L49); deck 10 viết $\operatorname{Bernoulli}(\theta)$. Ghi chú diễn giả HL01 nêu lý do: $\theta$ của Bài 11 là tham số chung của mô hình;
   - vector riêng của $S_n$ trong bước suy biến (GN09) giữ $u_j$ như ghi chú (L1102); khi $\hat\Sigma=S_n$ chúng là chính các $u_j$ của Mệnh đề 11.17 (điều phối viên chấp nhận, điểm 4);
   - hàm một biến trong chứng minh Định lý 11.9 (G105) viết $\varphi(v)$ (ghi chú: $g(v)$, L682), vì $g(\theta)$ là đại lượng cần ước lượng của Định nghĩa 11.10 trong cùng mạch (cổng #10);
   - tham số tỉ lệ của phân phối Laplace (G107) viết $\beta$ (ghi chú: $b$, L749), vì $b$ là sản phẩm mới của bài toán mở đầu (rà soát #7);
   - hàm từng khúc của Ví dụ 11.6 trong ghi chú diễn giả G107 viết $\psi(\mu)$ (ghi chú: $h(\mu)$), vì $h(\Lambda)$ đã dùng ở GN06–GN08 (rà soát #18);
   - mật độ tiên nghiệm và hậu nghiệm trong ghi chú diễn giả HL05, TK04 viết $q(\theta)$, $q(\theta\mid D)$ (ghi chú: $p(\theta)$, L244–250), để không trùng $p_\theta$ và tham số Bernoulli $p$ (rà soát #40);
   - Bài tập 11.3 (HH07–HH08) giữ tên $a=(3,1)^\top$, $b=(1,-1)^\top$ của `exercises.md` (BT L106–112) dù trùng tên hai sản phẩm của bài toán mở đầu; HH07 ghi "hai điểm $a$, $b$ của bài tập này", ghi chú diễn giả HH07 nói rõ hai điểm khác hai sản phẩm (rà soát #28);
   - lý do của các lệch ký hiệu trên chỉ ghi ở tệp này và `outline.md`; ghi chú diễn giả chỉ nêu trong `p.note-source` ký hiệu mà ghi chú bài giảng dùng (rà soát #46).
2b. **Không dùng `\tag`; công thức và kết quả gọi theo tên** (D1, D2 của năm rà soát). Deck Bài 10 cũng không đánh số công thức. Số công thức và số kết quả của ghi chú chỉ còn trong `p.note-source`; số hiệu của bài khác (Mệnh đề 04.2(b), 10.26) đứng sau phát biểu bằng lời, nhiều nhất một lần mỗi trang.
3. **Thứ tự và vai trò trang khác mẫu hành trình** (Q-K):
   - ví dụ của Mệnh đề 11.3 (entropy chéo nhị phân, TS07) đứng sau phát biểu HL06, vì mệnh đề là phép đổi thứ tự và ví dụ cụ thể cần một họ phân phối;
   - HH09 (ứng dụng chấm điểm lệch) đứng sau bài tập HH07–HH08, vì AGENTS.md đặt ứng dụng cụ thể ở trang cuối của mạch nội dung cuối; tiền lệ SL11–SL12 của Bài 10. Bước ứng dụng của cụm Mahalanobis đã có ở HH06;
   - G112 vừa là ứng dụng vừa là bài tập của cụm độ chệch (phép chia hai mẫu số trên cùng $Q$ là thao tác người học cần tái tạo);
   - Hệ quả 11.15 dùng chu trình rút gọn nhu cầu → hình thức → kiểm tra (khái niệm phụ; trực quan đã có ở G108).
4. **Gộp và đổi mã so với kế hoạch.** TS02 (hàm hợp lý Bernoulli) gộp vào TS01; mã TS02 không dùng để các mã khác khớp Q-B. Trang tài liệu đọc giữ mã TK05 như kế hoạch; TK04 là trang câu hỏi tự kiểm tra (cổng #8), TK01b tách từ TK01 khi dựng HTML (rà soát #52).
5. **Ngoại lệ mật độ có lý do.**
   - MD02 "Nội dung" bảy dòng (Q-K; AGENTS.md yêu cầu liệt kê mọi mạch).
   - TS05: dòng "Lưu ý:" về miền mở nằm trên trang chứng minh. Lý do: dòng này chỉ nêu hậu quả khi bỏ giả thiết miền đóng vừa dùng ở hai bước trên cùng trang; nhận xét đầy đủ (bài toán số đếm bằng không) nằm trong ghi chú diễn giả.
   - TK01: bảng bảy hàng có trần 80 âm tiết; `tách` TK01b nếu cao quá khung (tiền lệ Bài 10).
   - Các trang ước lượng sát trần 60 âm tiết và quyết định khi số đo thật vượt: `storyboard.md`, mục (d).
6. **Bài trên lớp và số của ghi chú làm bài tập.** G112 dùng số của Ví dụ 11.7, GN14 dùng số của Ví dụ 11.10, HL08 dùng câu 1 và TK02–TK03 dùng câu 2–3 của câu hỏi cuối buổi (Q-B). Không thêm số liệu ngoài ghi chú và tệp bài tập.
7. **Mật độ Gaussian nhiều chiều lần đầu lên mặt trang** (GN05) dưới nhãn "Nhắc lại:": mật độ đã là Định nghĩa 10.20 của ghi chú Bài 10, nhưng deck 10 chỉ ghi nó trong ghi chú diễn giả PP08 (Q-D của Bài 10).
8. **Mật độ Laplace** chỉ xuất hiện trong ô bảng của G107 (công thức và tên), không có trang định nghĩa riêng; ghi chú bài giảng cũng chỉ giới thiệu nó tại Ví dụ 11.6 (L749).

## Điểm tác tử soạn đã hỏi sau giai đoạn A

1. **TS17, lời giải (b) của Bài tập 11.2.** `exercises.md` (BT L82–84) chứng minh tính cực đại trên mặt $\pi_2=0$ bằng Mệnh đề 04.2(b) (bài toán lồi). Q-C1 chỉ áp cho Định lý 11.7. Planning giữ lời giải của tệp bài tập trên mặt trang (để deck và tệp bài tập khớp nhau) và ghi cách khác ($\log t\le t-1$ như Định lý 11.7) trong ghi chú diễn giả. Phương án thay: dùng $\log t\le t-1$ trên mặt trang và bỏ viện dẫn 04.2(b); khi đó cần sửa đồng bộ `exercises.md`.
2. **GN07 và GN08: 4 trang hay gộp thành 3.** Planning chọn 4; gộp nếu số đo thật vừa sáu dòng và ba công thức (Q-C2).
3. **G107 (Laplace) trên mặt trang.** Planning giữ (bằng chứng cho mục tiêu 6 và cho câu nối cuối bài); đây là ứng viên cắt thứ ba.
4. **Ghi chú bài giảng có năm câu rào đón** (L140, L293, L425, L605, L880; Q-J): deck không chép; điều phối viên báo người dùng ở bàn giao.

## Quyết định của điều phối viên cho sáu điểm đã hỏi (2026-11-07, `master-decisions-lec11.md`)

1. **TS17:** giữ lời giải (b) theo `exercises.md` (Mệnh đề 04.2(b)) trên mặt trang để deck khớp tệp bài tập; cách dùng $\log t\le t-1$ chỉ trong ghi chú diễn giả. Không sửa `exercises.md`.
2. **Định lý 11.14:** 4 trang (GN06–GN09); được gộp GN07 với GN08 nếu số đo thật vừa trần.
3. **G107:** giữ trên mặt trang (bằng chứng cho mục tiêu 6); vẫn là ứng viên cắt thứ ba.
4. **$\delta$ ở GN10 và $u_j$ ở GN09:** chấp nhận; ghi ở "Ngoại lệ có chủ đích", mục 2.
5. **Dòng "Lưu ý:" về miền mở trên TS05:** chấp nhận (hệ quả trực tiếp của giả thiết vừa dùng trên cùng trang); ghi ở "Ngoại lệ có chủ đích", mục 5.
6. **Câu rào đón trong ghi chú:** theo Q-J; điều phối viên báo người dùng ở bàn giao.

## Cổng storyboard

Tác tử gate-lec11 (Kiểm định storyboard; general-purpose; opus; high; chỉ đọc) rà `storyboard.md` 74 trang. Kết luận: đạt có điều kiện; 0 chặn bàn giao, 1 nghiêm trọng (#1). Điều phối viên chấp nhận tất cả với các điều chỉnh ở cột "quyết định"; báo cáo gốc: `reports/gate-lec11.md` trong scratchpad của phiên điều phối. Tác tử soạn sửa `storyboard.md`, `outline.md` và tệp này cùng ngày; mục storyboard bị ảnh hưởng ghi "Sửa (cổng)". Cột "bằng chứng" ghi số dòng ("d.") của `storyboard.md` bản giai đoạn A hoặc dòng ghi chú ("L") mà cổng dẫn.

| # | mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa | quyết định | trạng thái |
|---|---|---|---|---|---|---|---|
| 1 | nghiêm trọng | HL06, HL07 | Mệnh đề 11.3 mở bằng phát biểu; không có "Nhu cầu:"/"Trực quan." trước | d.33, 169; ghi chú L252 | Đầu HL06 thêm "**Nhu cầu:** so sánh hợp lý của $n$ quan sát qua tích; học máy cực tiểu trung bình mất mát." và "**Trực quan.** $\log$ biến tích thành tổng, giữ thứ tự; đổi dấu biến cực đại thành cực tiểu."; giữ ≤ 60 âm tiết (thay "Ý nghĩa:" bằng dòng ngắn đặt tên NLL); bản đồ: Trực quan = HL06 | chấp nhận (được tách HL06 thành hai trang nếu vượt trần; tổng trang vẫn trong 74 ± 4) | đã sửa trong planning (trường "Sửa (cổng)") |
| 2 | trung bình | HL01, G101, GN01 | "Nhu cầu:" chỉ nêu một phần câu hỏi trung tâm | d.119, 381, 512 so với d.14, 16, 17 | HL01 thêm "… bằng một bài toán tối ưu trên $\Theta$"; G101 thêm tồn tại nghiệm và mẫu số; GN01 thêm điều kiện nghiệm tồn tại; ≤ 20 âm tiết/dòng | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 3 | trung bình | TS00 | dòng dẫn dùng "đơn hình" trước định nghĩa | storyboard, mục (c) của trang | "Muốn ước lượng xác suất từ số đếm, cần cực đại hợp lý với ràng buộc tổng bằng $1$, kể cả khi có số đếm $0$." — lưu ý trang tiêu đề mạch không có công thức: viết "tổng bằng một", "số đếm bằng không" bằng chữ | chấp nhận, viết số bằng chữ | đã sửa trong planning (trường "Sửa (cổng)") |
| 4 | trung bình | GN05 | thiếu trực quan trước định lý | storyboard, mục (c) của trang | GN03 dòng (3): "**Trực quan.** Khi $d=1$, $S_n=Q/n$; $S_n$ là ứng viên cho $\Sigma$ như $Q/n$ cho $\sigma^2$."; câu nối GN04 → GN05 | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 5 | trung bình | GN06 | "Thế vào (8.5)" nhưng (8.5) không có trên mặt trang | storyboard, mục (c) của trang | thay dòng lộ trình bằng display (8.5) | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 6 | trung bình | G112, G106 | bài tập chỉ còn hai phép chia, trùng G106; hai dòng sau "Diễn giải:" | storyboard, mục (c) của trang | A: đề chỉ cho $D=(0,1,2,3,4)$, yêu cầu tính $\bar x$, $Q$, hai ước lượng; một dòng diễn giải. B: BT 11.6 (a),(e) | **phương án A** (giữ Q-B; G106 chỉ tính $\hat\mu,\hat\sigma^2$ và so hai hợp lý, G112 hỏi thêm $Q/(n-1)$ và để người học tự tính lại $\bar x,Q$) | đã sửa trong planning (trường "Sửa (cổng)") |
| 7 | trung bình | TS15 | ứng dụng chỉ trong ghi chú diễn giả; dòng (6) 22 âm tiết | storyboard, mục (c) của trang | thay (6) bằng "Chia âm log-hợp lý cho $n$ được *entropy chéo nhiều lớp* (categorical cross-entropy) $-\sum_k\frac{n_k}n\log\pi_k$." | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 8 | trung bình | TK01, TK04 | câu hỏi tự kiểm tra chỉ trong ghi chú; AGENTS yêu cầu trong mạch kết luận; tiền lệ Bài 10 TK04 | storyboard, mục (c) của trang | thêm trang "Câu hỏi tự kiểm tra" (L1458–1463; đáp án trong ghi chú) trước tài liệu đọc → 75 trang | chấp nhận (75 trang) | đã sửa trong planning (trường "Sửa (cổng)") |
| 9 | trung bình | TK01 | hàng 6 đặt $\mathbb E[S_{n-1}]=\Sigma$ dưới $S_n\succ0$; hàng 1 chỉ "(4.3)" | storyboard, mục (c) của trang | chuyển sang hàng 5 (hiệu chỉnh vô hướng và ma trận); hàng 1 viết $\operatorname{argmax}L=\operatorname{argmin}\hat R_n$ | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 10 | trung bình | G105, G109 | $g$ hai nghĩa trong mạch 4 | storyboard, mục (c) của trang | $g(v)\to\varphi(v)$; G109 khai báo $g:\Theta\to\mathbb R$; ghi ngoại lệ | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 11 | nhẹ | GN07 | "Nhắc lại:" bao định nghĩa mới $S_n^{1/2}$ | storyboard, mục (c) của trang | tách "Nhắc lại:" phân rã trị riêng và "Đặt $S_n^{1/2}=…$" | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 12 | nhẹ | TS13 | thiếu lý do khối lượng ngoài $\mathcal K_+$ bằng 0 | storyboard, mục (c) của trang | "tìm ứng viên có $\pi_k=0$ ngoài $\mathcal K_+$; bước sau so với mọi điểm" | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 13 | nhẹ | TS07 | gán $\hat p=s/n$ cho riêng Mệnh đề 11.3 | storyboard, mục (c) của trang | "Theo Mệnh đề 11.3 và định lý ước lượng Bernoulli, …" | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 14 | nhẹ | HH04 | "đưa $u_j$ về $e_j$" | storyboard, mục (c) của trang | "đưa $\mu$ về $0$, hướng $u_j$ về $e_j$" | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 15 | nhẹ | G103 | "Ý nghĩa:" suy "không có nghiệm" từ tính mở | storyboard, mục (c) của trang | "**Ý nghĩa:** khi $Q=0$, hợp lý tăng vô hạn khi $v\downarrow0$, và $v=0$ nằm ngoài miền." | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 16 | nhẹ | G105, GN08 | tên bước "Ghép hai bước" theo thao tác | storyboard, mục (c) của trang | "**Cực đại duy nhất tại $(\bar x,Q/n)$.**", "**Cực đại duy nhất tại $(\bar x,S_n)$.**" | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 17 | nhẹ | nhiều trang | số âm tiết bỏ tên bước in đậm; MD03, HL01, HL06 (4), TS15 (6) lệch | storyboard, mục (c) của trang | tính tên bước vào số đếm; đếm lại sau khi dựng HTML; tách dòng > 20 | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 18 | nhẹ | (d) | bảng nguy cơ tràn 390 px thiếu HL05, G102, G104, TS04, GN05, HH02, HH04 | storyboard, mục (c) của trang | thêm; ngắt `aligned` mỗi dòng một quan hệ; đo bằng Playwright | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 19 | nhẹ | TS01, TS11, HL01 | "Nhắc lại:" lặp; TS01 quá nhiều vai; "thống kê đủ" không được dùng | storyboard, mục (c) của trang | bỏ "Nhắc lại:" lặp ở TS01, TS11 (giữ HL01); "thống kê đủ" vào ghi chú diễn giả | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 20 | nhẹ | TS06, G110, G107, G106, TK03, HL04 | no-ai-slop Detect: rào đón (TS06 (6)), động từ giả (G110 (5)), câu chung chung (G107 (3)), dấu hai chấm lộ (G106 (5)), dòng kết không điều kiện (TK03 (5)), chỉ mơ hồ (HL04 (6)) | storyboard, mục (c) của trang | TS06 cắt vế sau; G110 "$Q/n$ cực đại hợp lý; $Q/(n-1)$ có kỳ vọng đúng bằng $\sigma^2$."; G107 "**Diễn giải:** trên $(0,0,9)$, nhiễu Gaussian cho $3$, nhiễu Laplace cho $0$."; G106 "… kém khoảng $0{,}77$ vì hai điểm $0$ và $4$ bị phạt nặng hơn"; TK03 (5) vào ghi chú; HL04 "theo xác suất của $D$" | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |
| 21 | nhẹ | MD03, GN11, HH03 | $\bar x$ trước định nghĩa; "cột"; "ellipsoid" | storyboard, mục (c) của trang | "Trung bình bốn vector $\bar x=(10,20)^\top$"; "tọa độ thứ hai bằng hai lần tọa độ thứ nhất"; ellipsoid | chấp nhận hai ý đầu; **ellipsoid giữ theo ghi chú** (Q-G), thêm "(ellipsoid)" không cần | đã sửa trong planning (trường "Sửa (cổng)") |
| 22 | nhẹ | storyboard | trang tiêu đề mạch thiếu "Nguồn"; "Vị trí" thiếu phần việc; GN05 trùng tên mạch 5 | storyboard, mục (c) của trang | thêm Nguồn; thêm "phần việc: …"; GN05 → "Ước lượng hợp lý cực đại Gaussian nhiều chiều" | chấp nhận | đã sửa trong planning (trường "Sửa (cổng)") |

Thực hiện các điều chỉnh của điều phối viên: #3 dòng dẫn TS00 "Muốn ước lượng xác suất từ số đếm, cần cực đại hợp lý với tổng bằng một, kể cả số đếm bằng không." (23 âm tiết, số viết bằng chữ); #6 phương án A (G106 tính $\hat\mu$, $\hat\sigma^2$ và so hai hợp lý; G112 cho dữ liệu, người học tự tính lại $\bar x$, $Q$ và hai ước lượng); #8 thêm TK04 "Câu hỏi tự kiểm tra", trang tài liệu đọc thành TK05, tổng 75 trang; #21 giữ "ellipsoid" theo ghi chú.

## Soạn HTML (giai đoạn B, 2026-11-07)

Tệp: `2627-1/lecture-11-hoc-tu-du-lieu-uoc-luong-thong-ke.html` (`lang="vi"`, `data-lecture="11"`; cấu trúc, cấu hình Reveal, plugin, footer, lớp CSS và mẫu ghi chú diễn giả theo deck Bài 10); `2627-1/img/lec-11/gaussian-geometry-deck.svg` (mới); `2627-1/lecture-course.css`: khối Bài 11 chép từ khối Bài 10 (bỏ các luật theo trang của Bài 10, đổi phạm vi sang `:where(html[data-lecture="11"])`) và một luật theo trang cho HH01 (cột hình rộng hơn, ảnh cao tối đa 520 px). Không có `<style>`, `style=""`; không sửa `lecture-style.css`, `index.html`, `material-viewer.js` hay materials.

Kiểm tra: `deck_check.py --shots` trên `http://localhost:8767/…`, kết quả và ảnh ở `check-B/` trong scratchpad của phiên điều phối (`check-B/report.json`, `check-B-table.txt`):

- 76 trang; 0 lỗi console (lượt đầu có 12 cảnh báo phông KaTeX do `\text{…}` chứa chữ Việt, đã sửa), 0 lỗi trang, 0 yêu cầu hỏng, 0 `.katex-error`.
- Mật độ: mọi trang nội dung ≤ 60 âm tiết (MD01 77/80); mọi dòng ≤ 20 âm tiết (trang tiêu đề mạch: dòng dẫn 22–24, trần 25); ≤ 6 dòng trừ MD02 (ngoại lệ Q-K); ≤ 3 công thức hiển thị. Số đo từng trang: `storyboard.md`, mục (e).
- Tràn khung ở 1600×900: không còn phần tử hiển thị nào tràn. Lượt đầu tràn thật ở TS14 (29 px), GN06 (93 px), TK01 (298 px), GN08 (2 px); đã sửa (TS14 `grid2`, GN06 dòng kết luận viết trong dòng chữ, TK01 `tách`, GN08 gộp dòng). Cờ "OVERFLOW"/"NARROW-H" còn lại ở G101, GN07, GN14, HH02, HH03, HH05–HH08 là đuôi SVG của dấu căn KaTeX (`span.hide-tail`, `overflow:hidden`), kiểm bằng một đoạn Playwright riêng.
- 390×844: không trang nào cuộn ngang toàn trang; công thức rộng (GN06, GN09, HH04 và một số khác) cuộn trong `.formula` với dấu ↔, như Bài 10. Ngắt thêm dòng `aligned` cho GN06, GN09 làm hai trang tràn 73–120 px ở 1600×900 nên đã hoàn lại.
- Ảnh tác tử soạn đã xem: HL08, TS14, G105, GN06, GN07, HH01 (1600×900); GN09, HH01 (390×844).

Trang nên được điều phối viên xem ảnh: HH01 (hình), các trang chứng minh TS13, TS14, G104, G105, GN06–GN09, HH04, các trang bảng TK01, TK01b, G107, HH06, và GN09, GN06 ở 390×844 (cuộn ngang trong công thức).

## Năm rà soát độc lập (bản đóng băng v1, 2026-11-07)

Năm vai chỉ đọc rà cùng một bản đóng băng (`frozen-v1` trong scratchpad của phiên điều phối). Kết luận và quyết định lấy từ tệp hợp nhất của điều phối viên (`review-merge-lec11.md`); loại tác tử, mô hình và effort ghi theo tệp đó (general-purpose, opus, high), điều phối viên đối chiếu với lời gọi công cụ khi điền "Nhật ký tác tử".

| Vai | Mã trong bảng | Kết luận | Ghi chú |
|---|---|---|---|
| rv-student (sinh viên) | [SV] | đạt | các phát hiện trung bình, nhẹ về nhãn công thức, ký hiệu, dòng giải thích |
| rv-expert (chuyên gia lĩnh vực) | [CG] | đạt có điều kiện | báo độc lập phát hiện nghiêm trọng TS15 (add-one) |
| rv-math (độ chính xác toán học) | [TH] | đạt có điều kiện | tính lại mọi chứng minh (11.3, 11.4, 11.7, 11.9, 11.11, 11.14, 11.15, 11.17), con số và tọa độ SVG: đúng; báo độc lập TS15 |
| rv-pedagogy (phê bình học thuật – sư phạm, `no-ai-slop` Detect) | [PB] | đạt có điều kiện | văn phong ghi chú diễn giả, nhãn, tên bước |
| rv-storyline (mạch truyện và liên kết) | [ML] | đạt có điều kiện | planning khớp 76/76 trang; kiểm tra tập trung của mạch |

Tổng: 0 chặn bàn giao; 1 nghiêm trọng (TS15); còn lại trung bình và nhẹ. Điều phối viên kiểm phát hiện TS15 tại deck dòng 297 và Murphy (2022), §4.6.3.4, PDF 170: "The only way to get the same effect as add-one smoothing is to use a MAP estimate with α̌_c = 2". [ĐP] là phát hiện của điều phối viên.

**Quyết định gộp.**
- **D1 — bỏ mọi `\tag{…}`; gọi công thức theo tên.** Lý do: nhãn chồng chữ ở 390 px ([ĐP]); số (4.1), (4.3), (8.4) được dẫn mà không có nhãn trên trang ([SV][TH][PB][ML]); deck Bài 10 không dùng `\tag`. Số của ghi chú chỉ đứng sau tên bằng lời khi công thức có trên chính trang đó; trong ghi chú diễn giả thay bằng đối tượng.
- **D2 — kết quả gọi theo tên trên mặt trang** (HL08, TS07, GN13, TK03): "hợp lý cực đại tương đương rủi ro thực nghiệm", "định lý ước lượng Bernoulli", "hiệu chỉnh phương sai mẫu"; số hiệu ghi chú giữ trong `p.note-source`.

Bác bỏ: không có. Đề xuất đổi $a,b\to y_1,y_2$ ở HH07 ([PB]) được thay bằng #28 (giữ đồng bộ `exercises.md`); đề xuất thêm "Lưu ý:" tiên nghiệm lên HL05 ([SV]) được thay bằng #10 (vượt trần; khái niệm ngoài câu hỏi mạch).

| # | mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa | quyết định | trạng thái |
|---|---|---|---|---|---|---|---|
| 1 | nghiêm trọng | TS15 (ghi chú diễn giả) | add-one gán Beta(2,2) cho ba nhóm; "MAP" chưa viết đủ; "một ước lượng khác (6.2)" mơ hồ ([CG][TH][PB]) | "là ước lượng MAP với tiên nghiệm Beta$(2,2)$, một ước lượng khác (6.2)" | MAP với tiên nghiệm Dirichlet$(2,2,2)$; Beta$(2,2)$ khi hai nhóm; khác nghiệm hợp lý cực đại; nguồn Murphy §4.5.1 (4.96), §4.6.3.4 | chấp nhận | đã sửa |
| 2 | trung bình | HL07, GN13, ghi chú HL00, TS00, G100, TS01, TS11, G102, GN03 | số công thức không có nhãn; `\tag` chồng chữ ([SV][TH][PB][ML][ĐP]) | HL07 "dạng tích (4.1)"; GN13 "theo (8.4)"; HL00 "mục tiêu tối ưu (4.3)" | D1 | chấp nhận (D1) | đã sửa; 16 `\tag` xóa, grep `\tag` = 0 |
| 3 | trung bình | HL08, TS07, GN13, TK03 | số kết quả không có trên trang phát biểu ([SV][TH][ML][PB]) | "(Mệnh đề 11.3)", "Theo Mệnh đề 11.3 …", "Mệnh đề 11.11 cho", "(Định lý 11.4)" | D2 | chấp nhận (D2) | đã sửa; HL08 gọi đối tượng "rủi ro thực nghiệm" để vừa trần 60 âm tiết; TS07 "Cực tiểu $\hat R_n$ tương đương cực đại hợp lý, nên nghiệm là $\hat p=s/n$ của định lý ước lượng Bernoulli" (một dòng ≤ 20) |
| 4 | trung bình | G110, G108 | lẫn $Q$ và $Q_X$; "$Q/n$ cực đại hợp lý" cần Gaussian ([CG][SV][PB]) | G110 "**Ý nghĩa:** $Q/n$ cực đại hợp lý; $Q/(n-1)$ có kỳ vọng …"; ghi chú "Nghĩa vận hành:" | "Ý nghĩa:" có "dưới mô hình Gaussian", $Q_X$; ghi chú bỏ nhãn nội bộ | chấp nhận | đã sửa; bỏ "lặp lại" trong "Ý nghĩa:" để ≤ 20 âm tiết; G108 "Nhu cầu:" định nghĩa $Q_X$ tại chỗ |
| 5 | trung bình | G108 | "Sai lệch quanh $\bar x$ nhỏ hơn…" sai theo nghĩa đen ([CG][SV][TH][PB]) | "Sai lệch quanh $\bar x$ nhỏ hơn sai lệch quanh $\mu$ thật" | "Tổng bình phương sai lệch quanh $\bar x$ không vượt tổng quanh $\mu$ thật, nên $Q_X/n$ có xu hướng nhỏ hơn $\sigma^2$." | chấp nhận | đã sửa |
| 6 | trung bình | TS16 | lời giải (a) thiếu $L>0$ ([TH][SV]) | "(a) $L=\pi_1^4\pi_3^6$; nếu $m=\pi_1+\pi_3<1$ …" | thêm "điểm cực đại có $L>0$, nên $\pi_1,\pi_3>0$", tách dòng | chấp nhận | đã sửa (hai dòng, trang 6 dòng) |
| 7 | trung bình | G107 (và ghi chú), HH | $b$ hai nghĩa (Laplace và sản phẩm mới) ([TH]) | "$\frac1{2b}e^{-|\varepsilon|/b}$, $b$ đã biết" | tham số Laplace $\beta$; ngoại lệ ký hiệu | chấp nhận | đã sửa; ngoại lệ 2 |
| 8 | trung bình | TS01 | "Nhu cầu:" thiếu phân rã hai nhóm → nhiều nhóm ([ML]) | "**Nhu cầu:** mười cờ … chứng minh $7/10$ cực đại hợp lý." | "Nhu cầu:" ước lượng xác suất từ số đếm, hai nhóm rồi nhiều nhóm; mười cờ thành dòng sau | chấp nhận | đã sửa |
| 9 | trung bình | GN10 | nửa trang tính mật độ tại tâm, không dùng lại; diễn giải lạc câu hỏi ([ML][PB]) | khối $\hat f(\hat\mu)=1/(4\pi)$; "ô vuông nhỏ cạnh $\delta$ …" | khối và câu vào ghi chú diễn giả; nhiệm vụ "Tính $\hat\Sigma^{-1}$; kiểm tra $S_4\hat\Sigma^{-1}=I_2$."; "Diễn giải:" nghiệm duy nhất, $\hat\Sigma^{-1}$ | chấp nhận | đã sửa; $\delta$ chỉ còn trong ghi chú diễn giả (ngoại lệ 2 giữ, ghi rõ) |
| 10 | trung bình | TK04 | câu 4 hỏi tiên nghiệm chưa lên mặt trang; câu 1 "mười cờ" lệch HL02; câu 2 lặp TS09; không câu nào cho mạch 5–6; câu kết bằng dấu chấm ([SV][ML][PB]) | "Mười cờ được chép từ một cờ: … không."; "… xác suất của tham số cần thêm gì." | câu 1 sáu cờ; câu 2 ba điểm thẳng hàng; câu 4 "Hàm hợp lý là hàm của biến nào khi dữ liệu cố định?"; `<ol>` trong `.check`; "?" | chấp nhận | đã sửa; lời giải câu 2 trong ghi chú diễn giả |
| 11 | trung bình | GN06 | thiếu dòng lộ trình trên mặt trang ([SV][PB]) | lộ trình chỉ có trong ghi chú diễn giả | "Tách tâm; đổi biến $C$; $\log c\le c-1$ trên trị riêng; xét $S_n$ suy biến." | chấp nhận | đã sửa trên GN06; tràn 33 px được khử bằng cách rút dòng "Do … số hạng cuối $\ge0$, bằng $0$ $\iff$ $\mu=\bar x$" còn một dòng; không cần dời sang GN05 |
| 12 | trung bình | HH01 | mặt trang không giải thích elip; nhãn SVG ~11 px ở 390 px, đè trục ([SV][ML]) | nhãn `font-size="18"` tại (176,314), (120,370), (64,426); "tâm" tại (250,232) cắt đường chéo | thêm dòng "Elip ghi $1$, $2$, $3$: …"; nhãn 22–24, dời khỏi nét trục | chấp nhận | đã sửa; nhãn 23–24 đơn vị, "tâm" 22, viền trắng (`paint-order="stroke"`); hình học không đổi |
| 13 | trung bình | GN01 (và ghi chú GN01, GN04) | "phương sai riêng" trùng chữ "riêng" của trị riêng ([SV]) | tiêu đề "Hai phương sai riêng …"; "hai phương sai riêng không ghi hướng này" | "Phương sai từng tọa độ …" | chấp nhận | đã sửa (mặt trang, ghi chú diễn giả, outline, storyboard) |
| 14 | trung bình | TS10 | dùng $\pi_k^{n_k}$ trước định nghĩa ([SV]) | "Cực đại riêng từng thừa số $\pi_k^{n_k}$ …" | "Hợp lý $\pi_1^2\pi_2^3\pi_3^5$; cực đại riêng từng thừa số …" | chấp nhận | đã sửa |
| 15 | trung bình | TS15 | ví dụ không kết bằng "Diễn giải:" ([PB]) | trang kết bằng dòng entropy chéo | gộp dòng nhiệm vụ; thêm "Diễn giải:" | chấp nhận | đã sửa; dòng kiểm tra viết "Kiểm tra điều kiện dừng: …" để không lặp "tổng bằng $1$" của "Diễn giải:" |
| 16 | nhẹ | G103 | "Ý nghĩa:" lặp dòng trên ([SV][PB]) | "khi $Q=0$, hợp lý tăng vô hạn …" lặp dòng "Nếu $Q=0$" | "khi $Q>0$, trung bình mẫu và trung bình bình phương sai lệch là nghiệm duy nhất." | chấp nhận | đã sửa |
| 17 | nhẹ | G107 | "Diễn giải:" chỉ đọc lại bảng ([SV][PB]) | "trên $(0,0,9)$, nhiễu Gaussian cho $3$, nhiễu Laplace cho $0$." | "đổi giả thiết nhiễu thì đổi mất mát; …" | chấp nhận | đã sửa; bỏ "trên $(0,0,9)$" (đã ở tiêu đề cột bảng) để ≤ 20 âm tiết |
| 18 | nhẹ | G107 (ghi chú) | $h(\mu)$ trùng $h(\Lambda)$ ([TH]) | "$h(\mu)=2|\mu|+|9-\mu|$" | $\psi(\mu)$ | chấp nhận | đã sửa; ngoại lệ 2 |
| 19 | nhẹ | HL04 | "Trực quan." đứng sau phép tính ([PB]) | dòng "Trực quan." ở dòng 5 | lên ngay sau "Nhu cầu:" | chấp nhận | đã sửa |
| 20 | nhẹ | G104 | tên bước 2 nằm giữa dòng ([PB]) | "vì $\sum_i(x_i-\bar x)=0$. **$\ell(\mu,v)\le\ell(\bar x,v)$ …**" | "Do $\sum_i(x_i-\bar x)=0$" vào câu dẫn bước 1; bước 2 dòng riêng | chấp nhận | đã sửa; khối tách tâm viết một dòng (bỏ `aligned`) để hết tràn 26 px ở 1600×900 |
| 21 | nhẹ | GN07 | tiêu đề theo thao tác ([PB]) | "… đổi biến ma trận" | "Chứng minh: Gaussian nhiều chiều, $h$ chỉ phụ thuộc $C$" | chấp nhận | đã sửa |
| 22 | nhẹ | GN03 | "cần nhưng chưa đủ" ([SV][PB]) | dòng cuối GN03 | "cần nhưng không đủ" | chấp nhận | đã sửa |
| 23 | nhẹ | TS00 | thiếu "ràng buộc" ([PB]) | "cần cực đại hợp lý với tổng bằng một" | thêm "ràng buộc" (≤ 25 âm tiết) | chấp nhận | đã sửa (25 âm tiết) |
| 24 | nhẹ | TS11 | câu dẫn treo trước "Định nghĩa." ([SV][PB]) | "Với $K\ge2$ nhóm, dữ liệu $D$ …:" đứng trước "Định nghĩa." | "Định nghĩa." mở câu; mẫu i.i.d. vào câu số đếm | chấp nhận | đã sửa |
| 25 | nhẹ | TS13 | ràng buộc trên $\mathcal K_+$ chưa giải thích ([SV]) | "với $\sum_{k\in\mathcal K_+}\pi_k=1$:" | thêm "(đặt $\pi_k=0$ ngoài $\mathcal K_+$; bước sau so với mọi điểm)", bỏ mệnh đề lặp | chấp nhận | đã sửa |
| 26 | nhẹ | HL02 | "chép sáu lần" không công thức ([SV]) | "Một cờ $Z$ chép sáu lần: …" | "…, $X_1=\cdots=X_6=Z$: …" | chấp nhận | đã sửa |
| 27 | nhẹ | HL01 | $\Theta$ trước định nghĩa ([SV][ML]) | "bài toán tối ưu trên $\Theta$" | "theo $\theta$" | chấp nhận | đã sửa |
| 28 | nhẹ | HH07–HH08 | tên $a$, $b$ dùng lại ([SV][PB]) | "hai điểm $a=(3,1)^\top$, $b=(1,-1)^\top$" | giữ tên như `exercises.md`; "… của bài tập này"; ngoại lệ | chấp nhận | đã sửa; ngoại lệ 2 |
| 29 | nhẹ | HH08, HH01 | bình phương khoảng cách ([SV][TH]) | "Theo Euclid, $a$ xa gấp $5$ lần $b$ (bình phương)"; HH01 "($18$ so với $8$)" | câu so bình phương khoảng cách, $13/9$; HH01 "(bình phương $18$ so với $8$)" | chấp nhận | đã sửa |
| 30 | nhẹ | TS17, HH08 | trang lời giải nối tiếp không nhắc câu hỏi ([PB]) | TS17, HH08 mở bằng "Lời giải:" | thêm dòng "Câu hỏi:" nếu ≤ 6 dòng | chấp nhận | đã sửa (cả hai trang 6 dòng) |
| 31 | nhẹ | TS16, TS17 | "mặt của đơn hình" chưa giới thiệu ([ML]) | tiêu đề "Lagrange trên một mặt của đơn hình"; "(b) trên mặt $\pi_2=0$" | tiêu đề "Lagrange khi có nhóm vắng mặt"; "(b) với $\pi_2=0$" | chấp nhận | đã sửa; TS17 "nghiệm khi $\pi_2=0$" thay "nghiệm trên mặt"; ghi chú diễn giả bỏ "nằm trên mặt" |
| 32 | nhẹ | tiêu đề có (a)/(b) | CSS viết hoa thành "(A)" ([SV]) | `--r-heading-text-transform: uppercase` của theme | `span.nocase` + `text-transform:none` trong khối CSS Bài 11 | chấp nhận | đã sửa: TS08, TS09, TS16, TS17, HH07, HH08; luật `:where(html[data-lecture="11"]) .reveal h2 .nocase` |
| 33 | nhẹ | TK02, TK03 | trùng tiêu đề ([SV]) | hai tiêu đề "Bài tập: hàm mất mát từ giả thiết phân phối" | TK03 "…, lời giải" | chấp nhận | đã sửa |
| 34 | nhẹ | TS01 | chỉ nêu mẫu toàn $0$ ([SV]) | "Mẫu toàn $0$ xét riêng" | "Mẫu toàn $0$ hoặc toàn $1$ xét riêng" | chấp nhận | đã sửa |
| 35 | nhẹ | TS06 | dự đoán thế tham số thiếu "theo mô hình đã khớp" ([CG]); ghi chú lặp ([PB]) | "sản phẩm tiếp theo bị gắn cờ với xác suất $0{,}7$" | thêm "theo mô hình đã khớp"; ghi chú bỏ vế lặp | chấp nhận | đã sửa; viết "cờ tiếp theo bằng $1$" để dòng ≤ 20 âm tiết |
| 36 | nhẹ | TS07, TS15 | entropy chéo thổi phồng; thiếu "log loss" ([CG]) | "là hàm mất mát của bài toán phân loại nhị phân" | "(binary cross-entropy, log loss)"; ghi chú: mất mát log, Murphy §4.3.2 | chấp nhận | đã sửa; TS15 thêm "log loss", không dẫn §4.3.2 cho trường hợp nhiều lớp (mục này của Murphy viết cho nhãn nhị phân) |
| 37 | nhẹ | HL06 (ghi chú) | "trở nên khó tính" không có nguồn ([CG]) | "tỉ số của các tích trở nên khó tính" | "log đổi tích thành tổng, và học máy làm việc với trung bình của các mất mát." | chấp nhận | đã sửa |
| 38 | nhẹ | HH09 (ghi chú), HH09 | câu phủ định về $c$ ([CG]); "Nhu cầu:" mô tả quy tắc ([ML]) | "nó không tự cho xác suất …"; "**Nhu cầu:** quy tắc vận hành gắn cờ …" | ghi chú khẳng định ba ý ([CG]); "**Nhu cầu:** quyết định gắn cờ sản phẩm nào theo quy tắc $d_{\hat\Sigma}^2>6$." | chấp nhận | đã sửa; ghi chú viết theo ba ý của tệp hợp nhất (ngưỡng chọn đường đồng mức; tỉ lệ báo động sai ước lượng trên dữ liệu kiểm tra; sai số ước lượng của $\hat\mu$, $\hat\Sigma$) |
| 39 | nhẹ | TS05, GN09, TS14 (ghi chú) | thiếu tiếng Anh lần đầu ([CG][PB]) | "quá khớp", "ước lượng co", "phân kỳ Kullback–Leibler" | "(overfitting)", "(shrinkage estimate)", "(Kullback–Leibler divergence, KL)" | chấp nhận | đã sửa |
| 40 | nhẹ | HL05, TK04 (ghi chú) | $p(\theta)$ trùng $p$ ([CG]) | "tiên nghiệm $p(\theta)$ … $p(\theta\mid D)$" | $q(\theta)$, $q(\theta\mid D)\propto L(\theta;D)\,q(\theta)$ | chấp nhận | đã sửa; ngoại lệ 2 |
| 41 | nhẹ | G109 (nguồn) | ví dụ $X_1$ ở §4.7.6.2 ([CG]) | nguồn chỉ ghi §4.7.6.1 | thêm §4.7.6.2 | chấp nhận | đã sửa |
| 42 | nhẹ | GN12 (ghi chú) | "$S_{n-1}=\frac43S_4$" đọc như $S_3$ ([TH]) | "$n=4$ và $S_{n-1}=\frac43S_4$" | "giá trị của $S_{n-1}$ là $\frac43S_4$" | chấp nhận | đã sửa |
| 43 | nhẹ | TK03 | bỏ cả hệ số dương ([TH]) | "bỏ hằng số, còn tổng bình phương sai lệch" | "bỏ hằng số và hệ số dương $\frac1{2vn}$" | chấp nhận | đã sửa |
| 44 | nhẹ | HH03 (ghi chú) | câu về lỗi in Murphy ([TH]) | "công thức đúng là $U^\top$, như ở đây" | viết đủ điều kiện cột $u_j$ và $z=U^\top(y-\mu)$ | chấp nhận | đã sửa |
| 45 | nhẹ | GN04 | dấu hai chấm lộ ([PB]) | "phần tử $3/2>0$: hai số đo …" | "… nghĩa là hai số đo …" | chấp nhận | đã sửa |
| 46 | nhẹ | ghi chú HL01, GN02, G105, GN07, GN10 | "deck" làm chủ ngữ, lý do đổi ký hiệu trong ghi chú diễn giả ([PB]) | "deck Bài 10 viết …"; "deck thừa nhận sự kiện này"; "trên trang chiếu dùng $\varphi$ vì …" | lý do đổi ký hiệu chỉ ở `review-log.md`; `p.note-source` ghi "ghi chú bài giảng viết …" | chấp nhận | đã sửa; HL01 giữ câu nêu ý nghĩa của $p$, $\theta$, $\boldsymbol\pi$ cho người học, bỏ so sánh với deck Bài 10; GN02 "sự kiện này được thừa nhận, theo Murphy (2022), §3.2.1" |
| 47 | nhẹ | ghi chú HL08, TK02 | câu chỉ đường nội bộ ([PB][ML]) | "Câu 2 và câu 3 … dùng ở bài tổng hợp cuối bài."; "Câu 1 … đã dùng ở bài tập cuối phần 2." | xóa | chấp nhận | đã sửa |
| 48 | nhẹ | ghi chú HL07, TS06, G101 | câu lặp; "tối thiểu hóa" ([PB]) | "Kết luận: trên mẫu i.i.d., …"; "chỉ tối thiểu hóa phần số mũ" | xóa câu kết HL07; TS06 bỏ vế lặp; "cực tiểu" | chấp nhận | đã sửa |
| 49 | nhẹ | ghi chú TK01b, TK03 | mục song song viết thành đoạn ([PB]) | bốn ứng dụng, ba mất mát nối bằng dấu chấm phẩy | `<ul>` | chấp nhận | đã sửa |
| 50 | nhẹ | ghi chú TS00, G100 | thiếu câu giới hạn tạo nhu cầu ([ML]) | TS00, G100 chỉ nêu đầu vào và đầu ra | thêm câu giới hạn, ghi chú ≤ 100 âm tiết | chấp nhận | đã sửa: TS00 "nguyên lý đó không tự cho công thức nghiệm, và với số đếm, nghiệm có thể nằm trên biên"; G100 "hai mô hình của phần 3 chỉ áp dụng cho biến rời rạc" |
| 51 | nhẹ | ghi chú TK01b | chưa trở lại câu hỏi mở đầu ([ML]) | ghi chú TK01b không nhắc $a$, $b$ | câu $9/2<8$, $b$ lệch hơn | chấp nhận | đã sửa |
| 52 | nhẹ | planning | mục cũ lệch deck: ngoại lệ 4 của tệp này, `outline.md` d.102, 106, 246, `storyboard.md` d.798 ([ML]) | ngoại lệ 4 "trang tài liệu đọc là TK04"; outline HL06 "Ý nghĩa:", TS01 "Nhắc lại:", "câu hỏi tự kiểm tra: ghi chú diễn giả TK01"; storyboard TK01 "bảng bảy hàng" | sửa theo [ML]; cập nhật storyboard, outline theo mọi sửa | chấp nhận | đã sửa; storyboard: 59 mục có "Sửa (rà soát)", phác thảo và ghi chú diễn giả sinh lại từ deck, mục (f) số đo mới |

## Chỉnh sửa (editor-lec11, 2026-11-07)

Phạm vi ghi: deck, `img/lec-11/gaussian-geometry-deck.svg`, khối `data-lecture="11"` của `lecture-course.css`, `storyboard.md`, `outline.md`, tệp này. Không sửa materials, `index.html`, `material-viewer.js`.

- **Deck.** D1: 16 `\tag` xóa; mọi tham chiếu "(4.1)"…"(8.9)" trên mặt trang và trong ghi chú diễn giả thay bằng tên hoặc công thức ("dạng tích $L=\prod_ip_\theta(x_i)$", "hàm hợp lý Bernoulli", "hàm hợp lý phân loại", "log-hợp lý Gaussian", "đẳng thức tách tâm", "định nghĩa của $S_n$", "$\operatorname{Var}(w^\top X)=w^\top\Sigma w$", "$\sum_jz_j^2/\lambda_j$"); số công thức chỉ còn trong `p.note-source`, sau "ghi chú bài giảng" hoặc "Murphy". D2: mặt trang không còn "Mệnh đề 11.x", "Định lý 11.x"; số hiệu của bài khác (Mệnh đề 04.2(b), 10.26) giữ một lần sau phát biểu bằng lời. Mục 1–52: theo bảng trên. Chữ trên mặt trang thay đổi: HL01, HL02, HL04, HL07, HL08, TS00, TS01, TS03, TS06, TS07, TS08, TS09, TS10, TS11, TS12, TS13, TS15, TS16, TS17, G103, G104, G107, G108, G110, G111, G112, GN01, GN03, GN04, GN06, GN07, GN10, GN13, HH01, HH04, HH06, HH07, HH08, HH09, TK03, TK04. Mặt trang chỉ bỏ `\tag`: G102, GN02, GN05, GN12, HH02, HH03 (ghi chú diễn giả của các trang này cũng sửa). Chỉ ghi chú diễn giả: HL00, HL05, HL06, TS05, TS14, G100, G101, G105, G109, GN09, TK01b, TK02.
- **Chỉnh nhẹ so với chữ đề xuất** (giữ nghĩa, để vừa trần): #3 (HL08, TS07), #4, #15, #17, #35 như ghi ở cột trạng thái; #20 và #11 đo lại ở 1600×900; #36 không dẫn Murphy §4.3.2 cho entropy chéo nhiều lớp; ghi chú diễn giả HH02 viết "dạng toàn phương dưới dấu căn, nhân với $-\frac12$, chính là số mũ" cho đúng hệ số.
- **SVG.** Nhãn $1$, $2$, $3$ (23 đơn vị) đặt ngoài đầu trục dài của từng elip, lệch khỏi đường chéo; "tâm" (22) nằm trong elip $1$; $a$, $b$ 24 đơn vị; $u_\pm$ 23; nhãn có viền trắng. Tọa độ hình học (elip, điểm) không đổi.
- **CSS.** Thêm một luật trong khối Bài 11: `:where(html[data-lecture="11"]) .reveal h2 .nocase { text-transform:none; }`. Không đổi luật của bài khác; deck khác không dùng lớp `nocase`.
- **Kiểm tra.** `deck_check.py --shots` (cổng 8767, ảnh trong `check-edit1/` của scratchpad điều phối): 76 trang; 0 lỗi console, 0 lỗi trang, 0 yêu cầu hỏng, 0 `.katex-error`; không trang nào tràn khung thật ở 1600×900 (cờ còn lại là đuôi `path` của dấu căn KaTeX ở G101, GN07, GN14, HH02, HH03, HH05–HH08, như trước); mật độ trong trần (bảng ở `storyboard.md`, mục (f)). `grep -c '\\tag'` trên deck: 0. Ảnh đã xem: GN06, HH01 (1600×900 và 390×844), TS15, TS16, GN10, TK04, HH08, G104, SVG riêng ở 480×480.

## Rà lại vòng 1 (2026-11-07)

Ba vai chỉ đọc rà lại phần đã chỉnh sửa; kết luận và các mục R1–R14 lấy từ lời giao việc đợt 2 của điều phối viên.

| Vai | Phạm vi | Kết luận |
|---|---|---|
| rv-math | toán học trên nội dung đổi | đạt (2 mục nhẹ: R1, R2) |
| rv-pedagogy | văn phong, `no-ai-slop` Detect trên nội dung đổi | đạt (9 mục nhẹ: R3–R11) |
| rv-storyline | trang đổi ±2 và ranh giới mạch | đạt (3 mục nhẹ: R12–R14) |

| # | mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa | quyết định | trạng thái |
|---|---|---|---|---|---|---|---|
| R1 | nhẹ | G104 | câu dẫn bước 1 nói "Do $\sum_i(x_i-\bar x)=0$" trước khi khai triển, không chỉ ra số hạng nào bằng $0$ | "Do $\sum_i(x_i-\bar x)=0$, viết $x_i-\mu=(x_i-\bar x)+(\bar x-\mu)$:" | "Viết …; số hạng chéo bằng $0$ vì $\sum_i(x_i-\bar x)=0$:" | chấp nhận | đã sửa |
| R2 | nhẹ | TS13 | $b$ trong $Au=b$ trùng tên sản phẩm mới | "ràng buộc $Au=b$ … $\nu^\top(Au-b)$" | $Au=e$, $\nu^\top(Au-e)$; ghi ngoại lệ 2 | chấp nhận, thay bằng câu không ký hiệu (điều phối viên: $e$ trùng số $e$ và $e_j$) | đã sửa: "**Nhắc lại:** hàm Lagrange cộng vào hàm mục tiêu tích của nhân tử $\nu$ với ràng buộc đẳng thức; điểm dừng: $\nabla_{\boldsymbol\pi}\mathcal L=0$." (rút từ câu đề xuất 26 âm tiết còn 20: bỏ "tuyến tính", "có"); không còn lệch ký hiệu nên không ghi ngoại lệ. Điều phối viên quyết định thêm: $\nabla_u$ đổi thành $\nabla_{\boldsymbol\pi}$, vì $u$ không còn được giới thiệu trên trang, còn $\boldsymbol\pi$ đã định nghĩa ở TS11 và là biến của bài toán trên TS13. |
| R3 | nhẹ | HH01 | dấu hai chấm lộ; "đổi trục" lệch "quay trục" của dòng "Trực quan." | "Elip ghi $1$, $2$, $3$: các điểm cách tâm … sau phép đổi trục …" | "… gồm các điểm … sau phép quay trục và chia độ lệch chuẩn." | chấp nhận | đã sửa |
| R4 | nhẹ | GN10 | "Diễn giải:" viết phân phối thay cho cặp tham số; vế "khoảng cách đến tâm đo bằng $\hat\Sigma^{-1}$" đi trước định nghĩa Mahalanobis | "$\mathcal N\bigl((10,20)^\top,S_4\bigr)$ là nghiệm …; khoảng cách đến tâm đo bằng $\hat\Sigma^{-1}$" | "$(\hat\mu,\hat\Sigma)=\bigl((10,20)^\top,S_4\bigr)$ là nghiệm hợp lý cực đại duy nhất, và $\hat\Sigma^{-1}$ tồn tại." | chấp nhận | đã sửa |
| R5 | nhẹ | TS10 | "Hợp lý $\pi_1^2\pi_2^3\pi_3^5$" thiếu động từ | "Hợp lý $\pi_1^2\pi_2^3\pi_3^5$; cực đại riêng …" | "Hàm hợp lý là $\pi_1^2\pi_2^3\pi_3^5$; …" | chấp nhận | đã sửa; bỏ "riêng" ("cực đại từng thừa số") để dòng còn 20 âm tiết (lần đo đầu 21) |
| R6 | nhẹ | TS17 (ghi chú) | "điểm trên mặt tốt hơn" còn chữ "mặt" đã bỏ khỏi mặt trang | "câu (a) cho một điểm trên mặt tốt hơn" | "câu (a) cho một điểm có $\pi_2=0$ và hợp lý lớn hơn" | chấp nhận | đã sửa |
| R7 | nhẹ | HH07 (ghi chú) | lý do giữ tên nằm trong ghi chú diễn giả | "; tên giữ như trong tệp bài tập." | "Hai điểm $a$, $b$ của bài tập khác hai sản phẩm của bài toán mở đầu." | chấp nhận | đã sửa |
| R8 | nhẹ | G100 (ghi chú) | "cần mật độ Gaussian" đặt giả thiết thành nhu cầu; kết quả giao thiếu phần việc của G107 | "số đo liên tục cần mật độ Gaussian, trong đó …" | "cần một mô hình mật độ; với mật độ Gaussian, …"; thêm "mất mát bình phương suy từ nhiễu Gaussian" | chấp nhận | đã sửa; "chỉ áp dụng cho" rút thành "dành cho" để ghi chú ≤ 100 âm tiết |
| R9 | nhẹ | TS00 (ghi chú) | vế "nghiệm có thể nằm trên biên" lặp câu ngay sau | "…, và với số đếm, nghiệm có thể nằm trên biên của miền tham số." | "Nguyên lý đó không tự cho công thức nghiệm." | chấp nhận | đã sửa |
| R10 | nhẹ | GN02 (ghi chú) | "theo Murphy" sau dấu chấm phẩy đọc như lời dẫn | "sự kiện này được thừa nhận, theo Murphy (2022), §3.2.1." | "… được thừa nhận (Murphy (2022), §3.2.1)." | chấp nhận | đã sửa |
| R11 | nhẹ | GN06 | ký hiệu "$\iff$" giữa câu chữ | "bằng $0$ $\iff$ $\mu=\bar x$" | "khi và chỉ khi" nếu vừa khung | chấp nhận | không sửa: "khi và chỉ khi" làm dòng giải thích thành hai dòng và trang tràn khung 1600×900 (`deck_check`, lượt đầu đợt 2); giữ "$\iff$" |
| R12 | nhẹ | TS03, TS07 | tên "hàm hợp lý Bernoulli", "âm log-hợp lý Bernoulli" được dùng mà chưa được đặt | TS03 "hàm hợp lý Bernoulli có đúng …"; TS07 "Chia âm log-hợp lý Bernoulli cho $n$" | TS03 viết $L(p;D)=p^s(1-p)^{n-s}$; TS07 "Chia $-\ell(p;D)$ cho $n$" | chấp nhận | đã sửa theo cách thứ nhất (viết công thức tại chỗ; TS01 giữ nguyên) |
| R13 | nhẹ | `storyboard.md` | bảng (a) còn dòng dẫn TS00 cũ; trường "Ghi chú diễn giả" của HL00, TS00, G100 lệch deck | bảng (a) dòng 15 | chép dòng dẫn mới; thay ghi chú diễn giả; cập nhật R1–R12 | chấp nhận | đã sửa: 13 mục có "Sửa (rà lại vòng 1)", phác thảo và ghi chú diễn giả sinh lại từ deck; mục (g) số đo mới |
| R14 | nhẹ | `outline.md` | đồng bộ với R1–R12 | — | sửa nếu outline ghi nội dung đổi | chấp nhận | đã sửa: thêm lệch ký hiệu $Au=e$ vào "Khóa ký hiệu"; các mục khác của outline không ghi chữ đã đổi |

## Chỉnh sửa đợt 2 (editor-lec11, 2026-11-07)

- **Deck.** R1–R10, R12 như bảng trên (R2 theo quyết định sau của điều phối viên: câu "Nhắc lại:" không ký hiệu vế phải). Mặt trang đổi: TS03, TS07, TS10, TS13, G104, GN10, HH01. Chỉ ghi chú diễn giả: TS00, TS17, G100, GN02, HH07. R11 không sửa (lý do ở bảng). `grep -c '\tag'`: 0.
- **Công bố deck** (tiền lệ commit 7304805 của Bài 10):
  - `index.html`, thẻ Bài 11: "Bài giảng" thành liên kết `lecture-11-hoc-tu-du-lieu-uoc-luong-thong-ke.html`; liên kết ghi chú và bài tập thêm `&amp;deck=lecture-11-hoc-tu-du-lieu-uoc-luong-thong-ke.html`;
  - `material-viewer.js`: `DECKLESS_LECTURES` còn `"05c", "12", "13", "14"`;
  - phiên bản tài nguyên `?v=20261105-lec10-deck` → `?v=20261107-lec11-deck`: một chỗ trong `material-viewer.html`, hai chỗ trong `material-bootstrap.js`; không còn chỗ nào dùng phiên bản cũ;
  - `sync-local-materials.py --check`: "OK: material-local-data.js is up to date (33 file(s))", không cần chạy lại bản ghi.
- **Kiểm tra.**
  - `deck_check.py --shots` (`check-edit2/`): 76 trang; 0 lỗi console, 0 lỗi trang, 0 yêu cầu hỏng, 0 `.katex-error`; không tràn khung thật ở 1600×900; 390×844 không cuộn ngang toàn trang; mật độ trong trần (MD01 77/80, MD02 7 dòng). Ảnh đã xem: TS03, TS13, G104, GN10 (1600×900).
  - Playwright trên `index.html` và trình xem (`check-edit2-publish/`): `index.html` 0 lỗi console, 0 yêu cầu hỏng; liên kết "Bài giảng" của Bài 11 mở `lecture-11-…html#/mach-1`, tiêu đề "Bài 11: Học từ dữ liệu qua ước lượng thống kê". `material-viewer.html` với `lecture-note.md` và `exercises.md` của Bài 11: hiển thị đủ, 0 lỗi trang, 0 yêu cầu hỏng, 0 `.katex-error`, có nút "Bộ trang chiếu" trỏ về deck Bài 11. Bài 10: ghi chú, bài tập (nút "Bộ trang chiếu" về deck Bài 10) và deck Bài 10 hoạt động, 0 lỗi trang. Trình xem của cả Bài 10 và Bài 11 ghi cùng các thông báo console có sẵn: một cảnh báo CSP về script nội tuyến và cảnh báo `strict` của KaTeX về chữ Việt trong công thức của tệp Markdown; không phát sinh từ thay đổi này.
  - `git diff --check`: sạch.


## Rà tập trung bảy mạch (rv-storyline, bản đóng băng v1 và rà lại vòng 1)

Báo cáo của rv-storyline (general-purpose, opus, high). Lượt đầu trên bản đóng băng v1; lượt hai (rà lại vòng 1) chạy lại cho cả năm mạch nội dung vì mở đầu mạch 3, 4, 5 đã đổi. Điều phối viên chép kết luận và các dòng có phát hiện từ hai báo cáo; mọi trang khác trong bảng chức năng của báo cáo là "đạt".

| Mạch | Câu hỏi trung tâm (phân rã) | Trên dòng dẫn trang tiêu đề mạch | Trên "Nhu cầu:" trang nội dung đầu | Phát hiện lượt đầu | Xử lý | Kết luận lượt hai |
|---|---|---|---|---|---|---|
| 1 MD (mở đầu) | Sản phẩm mới nào lệch khỏi chế độ vận hành bình thường nhiều hơn, cần ước lượng gì từ dữ liệu nền | — (bìa) | MD03 "Câu hỏi:" | không | — | đạt |
| 2 HL | Biến yêu cầu "tham số phù hợp với dữ liệu" thành bài toán tối ưu (mô hình và cách lấy mẫu → hàm hợp lý dạng tích → log → rủi ro thực nghiệm) | có (HL00) | có (HL01) | nhẹ: $\Theta$ dùng trước định nghĩa (HL01); trung bình: (4.1), (4.3) không có nhãn (HL05–HL07); nhẹ: câu chỉ đường trong ghi chú HL08 | #27, D1, #47 | đạt |
| 3 TS | Xác suất nào cực đại hợp lý khi dữ liệu là số đếm, kể cả số đếm bằng không (hai nhóm trên $[0,1]$ → nhiều nhóm trên đơn hình) | có câu hỏi, thiếu phân rã (TS00) | chỉ nửa Bernoulli (TS01) — **trung bình** | trung bình: phân rã thiếu trên TS01; nhẹ: "mặt của đơn hình" chưa giới thiệu (TS16–TS17); nhẹ: tên "hàm hợp lý Bernoulli" chưa đặt (lượt hai) | #8, #23, #31, R12, R6 | đạt |
| 4 G1 | Với số đo liên tục, $(\mu,\sigma^2)$ nào cực đại hợp lý, khi nào nghiệm tồn tại, chia $Q$ cho $n$ hay $n-1$ | có (G100) | có, đủ ba phần (G101) | nhẹ: ghi chú G100 thiếu câu giới hạn và phần việc của G107 | #50, R8 | đạt |
| 5 GN | Từ bốn vector nền, ước lượng $\mu$, $\Sigma$ thế nào và khi nào nghiệm tồn tại ($S_n$ → tối ưu $\mu$ → tối ưu $\Sigma$ qua trị riêng → $S_n$ suy biến → bản không chệch) | có (GN00) | có (GN01) | trung bình: GN10 kết bằng mật độ tại tâm, không ai dùng lại; trung bình: (8.4) không có nhãn (GN13) | #9, R4, D1 | đạt |
| 6 HH | Đo độ lệch của $a$, $b$ theo mức phân tán từng hướng và sản phẩm nào lệch hơn (quay trục, chia độ lệch chuẩn) | có (HH00) | có (HH01) | nhẹ: mặt trang HH01 không giải thích elip; nhẹ: "Nhu cầu:" HH09 mô tả quy tắc | #12, R3, #38 | đạt |
| 7 TK (kết luận) | Công thức ước lượng nào dùng được dưới giả thiết nào | có (TK00) | — | trung bình: TK04 câu 4 hỏi tiên nghiệm chưa lên mặt trang; nhẹ: câu 1–2 lệch ví dụ, lặp; nhẹ: chưa trở lại câu hỏi mở đầu | #10, #51 | đạt |

Chuỗi câu hỏi mở đầu (lượt hai): MD03 hỏi; HH06 trả lời "$b$ lệch khỏi chế độ vận hành bình thường nhiều hơn $a$" ($9/2<8$); HH09 gắn cờ chỉ $b$ ($4{,}5\le6<8$); ghi chú TK01b nhắc lại câu trả lời. Đồng bộ planning: 76/76 trang khớp mã, thứ tự, tiêu đề trong `storyboard.md` và `outline.md`.

## Kiểm định cuối (final-lec11, 2026-11-07)

Tác tử final-lec11 (general-purpose, opus, high, chỉ đọc) chạy bảng 8 hạng mục trên bản sau chỉnh sửa đợt 2.

| # | Hạng mục | Lượt đầu | Sau sửa |
|---|---|---|---|
| 1 | Kỹ thuật deck (cấu hình Reveal, CSS, không tài nguyên ngoài, 0 `\tag`) | đạt | đạt |
| 2 | Trình duyệt (deck_check 1600×900 và 390×844, bàn phím, ảnh 15 trang) | không đạt (F1) | đạt (`check-edit5`; điều phối viên xem ảnh GN09, TS13) |
| 3 | Mật độ | đạt | đạt (TS13: 58 âm tiết, 6 dòng) |
| 4 | Toán học tái kiểm (TS13, TS03, TS07, TS10, G104, GN10, HH01; thêm TS14, GN06, GN09, HH06) | đạt | đạt |
| 5 | Đồng bộ planning | không đạt (F2) | đạt (mục "Rà tập trung bảy mạch") |
| 6 | Công bố (`index.html`, `DECKLESS_LECTURES`, phiên bản `20261107-lec11-deck`, viewer Bài 10 và 11, sync `--check`) | đạt | đạt |
| 7 | Git (`git diff --check`, danh sách stage, `git add -f` cho `review-log.md`) | đạt | đạt |
| 8 | Văn phong (mẫu) | đạt | đạt |

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa | quyết định | trạng thái |
|---|---|---|---|---|---|---|
| nghiêm trọng | GN07, GN08, GN09 (tiêu đề) | `h2` viết hoa cả ký hiệu KaTeX: $h\to H$, $S_n\to S_N$ | ảnh `final/title-GN07.png`, `wide-053-GN09.png`; khối Bài 11 chỉ có luật cho `h3 .katex` | thêm `:where(html[data-lecture="11"]) .reveal h2 .katex, … .katex * { text-transform:none!important; }` | chấp nhận | đã sửa (editor-lec11); điều phối viên xem ảnh GN09 |
| nghiêm trọng | `review-log.md` | thiếu báo cáo rà tập trung từng mạch ("Done means") | grep "tập trung" chỉ có hai dòng | ghi bảng rà tập trung bảy mạch từ báo cáo rv-storyline | chấp nhận | đã sửa (điều phối viên ghi mục "Rà tập trung bảy mạch") |
| trung bình | `review-log.md` | nhật ký tác tử thiếu ba vai rà lại và editor đợt 2; "Trạng thái" cũ | d.17–28, d.7 | bổ sung | chấp nhận | đã sửa (điều phối viên) |
| nhẹ | TS13 | tên bước kết bằng công thức rồi công thức nối ngay sau dấu chấm | ảnh `wide-026-TS13.png` | "Từ …", "Thế vào: …" | chấp nhận | đã sửa; bỏ "trên $\mathcal K_+$" ở dòng cuối để không chạm chân trang (đã nêu ở dòng trên) |
| nhẹ | TS13, GN09, G104, GN06 | mũi tên điều hướng sát chữ ở mép | ảnh 1600×900 | bố cục chung `controlsLayout:"edges"` | ghi nhận, không sửa trong commit này (chung mọi deck) | mở |
| nhẹ | viewer Bài 10, 11 | cảnh báo KaTeX strict về chữ tiếng Việt trong công thức của Markdown | console viewer | đợt sửa ghi chú sau | ghi nhận, ngoài phạm vi deck | mở |

Điều phối viên ký duyệt: các phát hiện nghiêm trọng đã sửa và kiểm lại; không mở lại vòng rà soát nội dung (chính sách kết thúc vòng lặp, Q-L).

## Nguồn đã tham khảo

- Ghi chú bài giảng Bài 11 (toàn bộ, L1–1548) và tệp bài tập (BT L1–152 cho ba bài trên lớp; tiêu đề các bài tự học 11.4–11.8).
- Planning cũ của Bài 11 (`outline.md`, `storyboard.md`, nay ở "Phụ lục" của hai tệp) và tiền lệ Bài 10: `planning/lec-10/outline.md`, `storyboard.md` (a)–(c), `review-log.md` (phần đầu, quyết định Q-A…Q-I, ngoại lệ có chủ đích); deck `lecture-10-xac-suat-bieu-dien-bat-dinh.html` (cấu trúc trang chứng minh KV12, trang tài liệu TK05).
- Báo cáo nguồn đã duyệt `sources-lec11` (scratchpad của phiên điều phối, `reports/sources-lec11.md`): ánh xạ Murphy theo khối và trang PDF, mẫu MAT1101, số liệu đã kiểm bằng Python. Trang PDF Murphy trong `outline.md` và `storyboard.md` lấy từ báo cáo này; tác tử soạn không mở lại PDF.
- MAT1101 b10.1 (S1–S9, bản trích trong scratchpad) để đối chiếu cách diễn đạt hàm hợp lý; các trang mẫu khác theo mục 3 của báo cáo nguồn.
- Quy tắc: `AGENTS.md` (§"Cấu trúc bộ trang chiếu mặc định", "Trang tiêu đề mạch", "Tập trung của mạch", "Văn phong và mật độ mặt trang chiếu", "Quy trình đa tác tử" mục 2), `CLAUDE.md` của học phần, `../CLAUDE.md` ("Writing course content", "The author's voice"), kỹ năng `no-ai-slop` (`SKILL.md`, `eval.md`).

## Tự kiểm `no-ai-slop` (chế độ Edit) cho câu chữ dự kiến trên mặt trang và trong ghi chú diễn giả

Tác tử soạn tải kỹ năng `no-ai-slop` và tự kiểm các phác thảo trong `storyboard.md` (c) theo `eval.md`.

| Hạng mục | Kết quả | Ghi chú |
|---|---|---|
| Không thêm nhận định, số liệu, ví dụ ngoài nguồn | đạt | Mọi con số dẫn dòng ghi chú hoặc BT; câu "nghĩa vận hành" của G110 chỉ diễn lại (7.4) bằng lời. |
| Câu rào đón trạng thái văn bản ("chưa phải định nghĩa", "đây mới là trực giác") | đạt | Năm câu của ghi chú (Q-J) không chép; tìm "chưa phải" trong phần (a)–(d) của storyboard: 0 kết quả. |
| "chúng ta", "ta thấy", "rõ ràng", "hãy", lời chỉ đường trên mặt trang | đạt | Không có; câu nối trong ghi chú diễn giả gọi tên kết quả kế thừa thay cho "tiếp theo". |
| Câu hỏi tu từ, câu cảm thán, khẩu hiệu | đạt | Câu hỏi chỉ sau nhãn "Câu hỏi:" (MD03, G108, các trang bài tập); dòng kết là kết luận có điều kiện hoặc con số. |
| Đối lập nhị phân, liệt kê phủ định, câu kết "sâu sắc" | đạt | Diễn giải viết nghĩa khẳng định (HL05 "Ý nghĩa:", TS06, G112); không có danh sách treo trên một phủ định. |
| Thuật ngữ thống nhất, không luân phiên từ đồng nghĩa | đạt | "hàm hợp lý", "ước lượng hợp lý cực đại", "hiệp phương sai mẫu", "tọa độ riêng" dùng một nghĩa; không dùng "phân bố", "liên hợp", "sự hợp lý" (Q-G). |
| Câu chủ động, chủ ngữ rõ | đạt | Mặt trang dùng "Đặt …", "Suy ra …", "Thế … vào …"; định nghĩa dùng "là", "gọi là". |
| Định dạng: in đậm chỉ ở nhãn và tên bước; danh sách cho ý song song | đạt | Tên bước của trang chứng minh in đậm theo mẫu deck 10. |
| Gạch dài (em dash) | đạt | Chỉ trong tiêu đề mục "MÃ — tiêu đề" của planning theo mẫu Bài 10; không có trong câu chữ dự kiến của mặt trang hay ghi chú diễn giả. |
| Văn phong tác giả: công thức đứng tại chỗ được gọi tên; ba ý song song trở lên thành danh sách | đạt | Ví dụ: G101, GN05 đặt công thức ngay sau "mật độ … là"; ba cách đổi mô hình của GN11 được viết thành danh sách khi dựng ghi chú diễn giả. |
