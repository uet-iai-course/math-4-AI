# Nhật ký rà soát bộ trang chiếu Bài 10 — Xác suất: ngôn ngữ biểu diễn bất định trong AI

Nhật ký soạn và rà soát ghi chú bài giảng (2026-11-02 đến 2026-11-04) nay ở `review-log-lecture-note.md` (đổi tên bằng `git mv`, tiền lệ Bài 07). Tệp này ghi quy trình của bộ trang chiếu.

## Trạng thái

2026-11-05: giai đoạn A (planning) xong, cổng storyboard đạt có điều kiện và các điều kiện đã sửa; giai đoạn B (soạn HTML, SVG) xong: deck 77 trang, bảy mạch, bảy hình SVG mới. Năm rà soát độc lập xong; tác tử chỉnh sửa đã sửa theo quyết định hợp nhất. Ba vòng rà lại đạt; chỉnh sửa đợt 2 xong; `index.html` và `material-viewer.js` đã cập nhật. Bước kế tiếp: kiểm định cuối.

## Phạm vi và yêu cầu người dùng

Yêu cầu người dùng (2026-11-05, `/goal`): "Dùng lecture note Bài 10 của math-4-AI, xây dựng slide deck và đưa lên 2627-1/index.html theo các nguyên tắc về nội dung, văn phong, bố cục, cách diễn giải (đặc biệt là các chứng minh quan trọng) đã thiết lập trong các CLAUDE.md chung và riêng của học phần; dùng nguồn Murphy; tham khảo slide MAT1101 (Xác suất thống kê) khi cần cách diễn đạt, mô tả các khái niệm xác suất."

Sản phẩm: `2627-1/lecture-10-xac-suat-bieu-dien-bat-dinh.html` (`data-lecture="10"`), SVG trong `2627-1/img/lec-10/`, planning trong `2627-1/planning/lec-10/`; sau kiểm định cuối, thẻ Bài 10 của `2627-1/index.html` có liên kết "Bài giảng" và `"10"` được bỏ khỏi `DECKLESS_LECTURES` trong `2627-1/material-viewer.js`.

## Nhật ký tác tử

Ghi từ lời gọi công cụ của điều phối viên (master-brief), không từ lời tự khai của tác tử.

| Tác tử | Vai | Loại | Mô hình | Effort | Kết quả | Quyết định điều phối |
|---|---|---|---|---|---|---|
| planner-lec10 | Lập kế hoạch | general-purpose | opus | medium | Kế hoạch 10 mục | chấp nhận kèm Q-A…Q-I; đã đối chiếu đề cương (mỗi buổi 2+1 tiết, không có buổi xác suất cơ bản), `DECKLESS_LECTURES`, danh sách bài trên lớp |
| sources-lec10 | Phân tích nguồn và mẫu | general-purpose | opus | medium | Đặc tả 7 mục | chấp nhận; kiểm mẫu Murphy PDF 72 (bóng đèn), 76–77 (COVID-19), 109 (uncorrelated); hậu nghiệm $198/437$; lỗi MAT1101 Bài 7.1 S24. Lượt tiếp theo (lưu báo cáo ra tệp) bị bộ lọc an toàn của API dừng (req_011Cgipxddf4qnpysTiexMtn); báo cáo đã bàn giao trước đó nên không ảnh hưởng |
| author-lec10 | Soạn | general-purpose | opus | medium | Giai đoạn A: `outline.md`, `storyboard.md`, `review-log.md`; `git mv` nhật ký ghi chú; sửa theo cổng storyboard và lượt rà lại; giai đoạn B: deck HTML, bảy SVG, khối CSS Bài 10 | bản đầu: chuyển cổng storyboard; giai đoạn A, sửa cổng, giai đoạn B: chấp nhận — điều phối viên đã đọc diff planning, chạy deck_check độc lập (77 trang, 0 lỗi console/KaTeX/tràn, MD02 ngoại lệ) và xem ảnh BY04, SL09, KV03b, PP00, SL12, TK01, MH02 trước khi đóng băng; ghi nhận các lỗi hiển thị (chữ SVG nhỏ, công thức ngắt dòng) đã chuyển cho vòng rà soát |
| rv-student, rv-expert, rv-math, rv-pedagogy, rv-storyline | Năm rà soát độc lập | general-purpose | opus | high | Năm báo cáo (mục "Năm rà soát độc lập") | hợp nhất trong `scratchpad/review-merge-lec10.md` |
| editor-lec10 | Chỉnh sửa | general-purpose | opus | medium | Sửa deck, SVG, CSS phạm vi Bài 10, planning, một câu `exercises.md` (mục "Chỉnh sửa"); đợt 2: 26 mục nhẹ, `index.html`, `material-viewer.js`, phiên bản tài nguyên (mục "Chỉnh sửa đợt 2") | chấp nhận sau ba vòng rà lại (toán, mạch toàn deck, sinh viên) đều đạt; điều phối viên đã kiểm diff CSS (mọi luật phạm vi Bài 10), diff viewer/index, sync --check, git diff --check và ảnh BY04, SL12, PP08, TK01 (390) |
| final-lec10 | Kiểm định cuối | general-purpose | opus | high | Bảng kiểm 9 hạng mục (mục "Kiểm định cuối") | chưa đạt ở lượt đầu (hạng mục 6, liên kết L2041 của ghi chú bài giảng); lỗi đã sửa ở lượt sửa cuối |
| gate-lec10 | Kiểm định storyboard | general-purpose | opus | high | Bảng phát hiện của cổng storyboard (mục "Cổng storyboard") | chấp nhận tất cả, trừ câu tính hợp $0{,}0918$ ở MH10 (bác bỏ theo Q-B) |

## Quyết định điều phối (master-brief, 2026-11-05)

| Mã | Quyết định | Lý do và cách thực hiện trong planning |
|---|---|---|
| Q-A | Độc lập và độc lập có điều kiện của biến cố (ghi chú §5.4) chuyển sang mạch 4, gộp với độc lập của biến ngẫu nhiên (§6.3), ngay trước khi mạch 6 dùng $A\perp S\mid Y$. Ghi chú giữ thứ tự. | Mạch 3 chỉ phục vụ câu hỏi Bayes; độc lập là quy tắc ghép các biến. Thực hiện ở PP09–PP13. |
| Q-B | Mỗi mạch 2–6 có một "Bài tập: …" với "Câu hỏi:" và "Lời giải:" trên mặt trang; chỉ dùng bài 10.1–10.3 hoặc đại lượng ghi chú đã tính; lời giải bài tự học 10.4–10.12 không lên mặt trang. | MH10 (bảng giai đoạn 1, L433–440), BY11 (10.1), PP06 (10.2), PP13 (10.3), KV13 ($0{,}044$, $0{,}042064$), SL11 ($22/4563$), TK02–TK03 (câu hỏi cuối buổi L2063–2081 và $2/13$ của Tình huống 10.2). |
| Q-C | Trang "Chứng minh: <kết quả>" riêng, chia bước, mỗi bước một quan hệ, nêu chỗ dùng giả thiết; mục tiêu và ý tưởng ở dòng đầu hoặc trong ghi chú diễn giả; chi tiết khả tích trong ghi chú diễn giả: P1 Mệnh đề 10.6; P2 Định lý 10.11 (tách 2 trang nếu cần; Mệnh đề 10.10 một dòng "Chứng minh."); P3, P4 Mệnh đề 10.22; P5 Mệnh đề 10.24; P6 Mệnh đề 10.27 kèm phản ví dụ Ví dụ 10.10 trên trang riêng; P7 Định lý 10.29; P8 Mệnh đề 10.32 (rời rạc); P9 Mệnh đề 10.34 (2–3 trang). Mệnh đề 10.17 phát biểu và một dòng "Chứng minh." hoặc trang ngắn. | Bảng "Chứng minh trên mặt trang" của `outline.md`. P2 và P9 mỗi kết quả hai trang; P3 (KV03) và P4 (KV03b) mỗi phần một trang sau cổng storyboard; P8 là dòng "Chứng minh." trên SL03 (điều phối viên đã quyết định). |
| Q-D | Lược phân rã phương sai, Phụ lục B, Ví dụ 10.1, 10.5, 10.6 phần 2, 10.9, Markov, Chebyshev, luật số lớn, ví dụ của 05c; Gaussian nhiều chiều chỉ mật độ và $\Sigma\succ0$; không có MLE, "mạng Bayes", "đồ thị" trên mặt trang. | `outline.md`, mục "Nội dung chỉ trong ghi chú diễn giả hoặc lược". Thêm theo cùng tiêu chí: Hệ quả 10.7 và Nhận xét 10.8 chỉ trong ghi chú diễn giả; Mệnh đề 10.26 chỉ có trường hợp $n=2$ trên mặt trang (dòng "Ý nghĩa:" của KV07), dạng tổng quát trong ghi chú diễn giả. |
| Q-E | Hai ví dụ xuyên suốt; mỗi lần dùng lại trả lời câu hỏi mới, nêu lại dữ kiện; bảng giai đoạn 1 và bảng 8 ô mỗi bảng chỉ đầy đủ ở một trang. | Bảng "Ví dụ xuyên suốt" của `outline.md`; bảng camera đầy đủ chỉ ở MH09, giai đoạn 1 chỉ ở MH10, bảng 8 ô chỉ ở SL09. |
| Q-F | Ký hiệu trên mặt trang: không dùng nhãn P/N/A/Q cho camera; $\delta$ cho khoảng nhỏ; $\{Y=1\}$ cho "lỗi"; hậu nghiệm của quy tắc quyết định đặt tên không trùng $p_X$; mỗi ký hiệu một nghĩa; mọi lệch ghi ở đây. | Mục "Lệch ký hiệu" dưới đây. |
| Q-G | Thuật ngữ theo ghi chú; tiếng Anh trong ngoặc ở lần đầu cho danh sách thuật ngữ đã định. | Các phác thảo mặt trang trong storyboard đặt tiếng Anh ở lần đầu: sample space, event (MH03); conditional probability (BY02); prior, likelihood, posterior, marginal likelihood (BY09); sensitivity, false positive rate (FPR) (BY10); random variable (PP02); PMF, CDF (PP03); PDF (PP05); conditional independence (PP10); expectation (KV01); variance (KV05); covariance (KV07); marginalization, sum rule (SL03). |
| Q-H | Đích khoảng 70 ± 6 trang. Thứ tự cắt khi quá tải: gộp trang mật độ với định nghĩa mật độ; gộp hai trang chứng minh kỳ vọng nếu vừa; bỏ hình Gaussian; dồn bảng tổng kết một trang. | 76 trang (đúng biên trên). Đã áp dụng cắt đầu tiên (PP05); cắt thứ hai bị cổng storyboard đảo lại (KV03 tách thành KV03, KV03b); không có hình Gaussian; tổng kết một trang (TK01). |
| Q-I | Tám hình SVG đề xuất. | Bảng "Hình SVG" của `outline.md`; bảy hình mới, tái dùng `supplier-probability-tree.svg`. |

## Ngoại lệ có chủ đích

1. **Trùng nội dung với ghi chú Bài 05c.** Định nghĩa 10.9, 10.12, 10.13, 10.15, Mệnh đề 10.6, 10.10, Định lý 10.11, Mệnh đề 10.22, 10.24, 10.27 và Định lý 10.29 trùng hoặc mở rộng các kết quả 05c (05c.2, 05c.8–05c.12, 05c.15, 05c.17–05c.18, 05c.26–05c.28, 05c.30–05c.32, 05c.38). Bài 05c không có bộ trang chiếu (`DECKLESS_LECTURES`), nên Bài 10 là lần đầu các nội dung này lên lớp. Deck trình bày đầy đủ phát biểu và chứng minh thay cho một trang "Nhắc lại:"; ghi chú diễn giả dẫn số hiệu 05c tương ứng (đã ghi trong từng mục storyboard). Đây là ngoại lệ với quy tắc "lý thuyết bài trước chỉ nhắc lại" của AGENTS.md, mục "Tập trung của mạch".
2. **Giữ $\mathbb P$, không đổi sang `\Pr`.** Q8 của `planning/notes-10-14-slt-template.md` giữ thuật ngữ và quy ước của học phần thay vì theo mẫu ngoài; bảng ký hiệu của ghi chú (L74) dùng $\mathbb P$, và ghi chú nói rõ $\mathbb P$ thay $P$ của Bài 05c (L37). Deck theo ghi chú để hai tài liệu cùng ký hiệu; quy tắc `\Pr` của CLAUDE.md workspace (rút từ bài SLT) không áp dụng ở đây. Quy tắc `\mid` vẫn áp dụng.
3. **Thứ tự §5.4 khác ghi chú.** Deck đặt độc lập ở mạch 4 (PP09–PP13), sau biến ngẫu nhiên; ghi chú đặt ở §5.4, trước biến ngẫu nhiên. Tác tử soạn đã đọc lại §5.4 (L687–792) và §6.3 (L882–973): Định nghĩa 10.12–10.13 chỉ dùng $\mathbb P$, (5.1) và (5.7); Ví dụ 10.5 dùng bảng camera, Ví dụ 10.6 dùng (5.6)–(5.7); cả hai đọc đúng khi đặt sau §6.1–6.2. Không cần sửa ghi chú. Hệ quả cho deck: PP09 không dùng $p_{X,Z}$ (định nghĩa ở SL02) mà viết $\mathbb P(X=x,Z=z)$.
4. **Lệch ký hiệu so với ghi chú** (Q-F; cũng ghi ở `outline.md`, "Khóa ký hiệu"):
   - camera: bốn kết quả viết bằng lời thay cho $(\mathrm P,\mathrm A)$, … của (4.2);
   - $\delta$ thay $\Delta$ trong xấp xỉ $f_X(x)\,\delta$ (L1002);
   - hậu nghiệm trong quy tắc quyết định (SL12) ký hiệu $r=\mathbb P(Y=1\mid A=a')$; ghi chú dùng $p$ (L1975); trục hình `decision-threshold.svg` ghi $r$;
   - phân hoạch $B_1,\ldots,B_m$ thay $B_1,\ldots,B_q$ (L541), vì $q$ dành cho tích nhân tử;
   - tích nhân tử giữ $q(s,y)$ như ghi chú (L1853, L1887); Thuật toán 10.35 trên mặt trang không đặt tên $r(y)$ (L1888) và hằng $c$ (L1889) của ghi chú: bước 2 viết $p_{Y,A}(y,a')=\sum_sq(s,y)$, bước 3 viết $p_A(a')=\sum_yp_{Y,A}(y,a')$;
   - Gaussian tổng quát viết cho $X$, $f_X$ thay $T$, $f_T$ (L1037), vì $T$ là thời gian xử lý trong Bài tập 10.2 trên PP06;
5. **Gộp trang theo Q-H.** PP05 (nhu cầu, trực quan, định nghĩa mật độ), có điều kiện `tách` lại nếu số đo thật vượt trần hoặc tràn khung. KV03 gộp P3 + P4 ở bản đầu; cổng storyboard yêu cầu tách lại (KV03, KV03b).
6. **Bài trên lớp đưa lên một phần.** BY11 dùng câu (a) và (c) của Bài tập 10.1, đánh lại nhãn (a), (b) trên mặt trang; câu (b) là tự học, đáp án trong ghi chú diễn giả. PP06 dùng câu (a), (b) của Bài tập 10.2; câu (c) là tự học. Lý do: giữ một trang có lời giải trong trần sáu dòng.
7. **Trang "Nội dung" bảy dòng** (MD02): ngoại lệ trần sáu dòng, như Bài 07.
8. **Tính lại $\mathbb P(Y=1)=0{,}044$ ở hai trang** (BY04 bằng công thức toàn phần; KV13 bằng kỳ vọng toàn phần): cùng số liệu, hai công cụ, đúng như ghi chú L1625–1634; AGENTS.md, mục "Ví dụ xuyên suốt", cho phép so sánh hai công cụ trên cùng số liệu.

## Quyết định của điều phối viên cho các điểm tác tử soạn đã hỏi (2026-11-05, sau cổng storyboard)

1. **P8 (Mệnh đề 10.32): đã quyết định.** Một dòng "Chứng minh." trên SL03; không thêm trang.
2. **Ký hiệu: đã quyết định.** Phân hoạch $B_1,\ldots,B_m$; giữ $q(s,y)$ cho tích nhân tử như ghi chú; hậu nghiệm trên trang quyết định là $r$; Thuật toán 10.35 không đặt chữ $r(y)$. Chi tiết ở mục 4 của "Ngoại lệ có chủ đích".
3. **Số trang:** đồng ý; sau khi tách KV03b, planning có 76 trang (khi soạn HTML, TK01 được tách thêm, deck 77 trang; xem "Soạn HTML"). Cắt dự phòng giữ nguyên: dồn TK04 vào ghi chú diễn giả của TK01; gộp BY07–BY08.
4. **Bài trên lớp đưa lên một phần (BY11, PP06):** đồng ý.
5. **Thời lượng mạch do tác tử soạn chia:** đồng ý.
6. **Gộp bước trên KV01, KV05, KV11, PP05:** đồng ý; KV11 được sửa theo cổng (định lý chỉ cho $X$ rời rạc, "Trực quan." trước định nghĩa).
7. **Nguồn ngoài chưa mở lại ở giai đoạn A:** ghi nhận.
8. **`git add -f` cho `review-log.md` mới:** điều phối viên thực hiện khi commit.

## Rủi ro thời lượng

Mạch 5 có 15 trang (sau khi tách KV03b) trong 24 phút, trong đó có năm trang chứng minh (KV03, KV03b, KV06, KV09, KV12). Nếu buổi học thiếu thời gian, ghi chú diễn giả của KV03b và KV12 đủ để chuyển hai chứng minh này sang tự học mà không đổi mặt trang; quyết định thuộc về giảng viên, không ghi trên trang chiếu.

## Nguồn đã tham khảo

- `materials/lec-10/lecture-note.md` (đọc toàn bộ, L1–2201) và `materials/lec-10/exercises.md` (bài trên lớp, BT L1–149): nguồn của mọi số và kết quả trong planning.
- Murphy (2022), *Probabilistic Machine Learning: An Introduction*, các mục và trang PDF đã được tác tử nguồn kiểm (master-brief, mục "Nguồn"): §2.1.1–2.1.3 (PDF 63–65), §2.2, §2.2.1–2.2.2 (65–67), §2.2.3 (68–69), §2.2.4 (69–70), §2.2.5 (70–72), §2.3, §2.3.1 (74–77), §2.4.1 (79–80), §2.5.1 (83), §2.6.1–2.6.2 (87–88), §3.1.1–3.1.3 (107–109), §3.2.1 (111). Tác tử soạn dùng danh mục này để gắn nguồn cho từng trang trong storyboard; không mở lại PDF ở giai đoạn A.
- MAT1101 (mẫu diễn đạt), bản trích trong scratchpad của phiên (`src/lec10/`): `y1.txt` (Bài 1, S11–S21), `y2.txt`/`b2.txt` (Bài 2, S4–S7, S14, S19, S25–S28), `y3.txt`/`b3.txt` (Bài 3, S5–S9, S24–S34, S49–S51), `y4.txt`/`b4.txt` (Bài 4, S16), `y5.txt`/`b5.txt` (Bài 5, S5–S9, S16–S17, S25), `y6.txt`/`b6.txt` (Bài 6, S19), `z7.1.txt` (Bài 7.1, S24: lỗi hệ số $2$, không chép). Tác tử soạn xác nhận tên bài ở đầu mỗi tệp; số trang theo master-brief.
- Mẫu planning: `planning/lec-07/{outline.md,storyboard.md,review-log.md}`.

## Tự kiểm `no-ai-slop` (chế độ Edit) cho câu chữ dự kiến trên mặt trang và trong ghi chú diễn giả

Kỹ năng đã tải (`~/.claude/skills/no-ai-slop/SKILL.md`, `eval.md`). Văn phong học thuật và độ chính xác toán học được ưu tiên hơn lời khuyên về giọng văn của kỹ năng (CLAUDE.md của workspace).

| Kiểm tra trong `eval.md` | Kết quả | Ghi chú |
|---|---|---|
| Không thêm nhận định, số, ví dụ, nguồn | đạt | Mọi số dẫn dòng ghi chú hoặc tệp bài tập; dòng "Cách khác:" của BY11 dùng số của Bài tập 10.1 (BT L11–19, L32–48), đã kiểm: $0{,}9\cdot0{,}1+0{,}2\cdot0{,}9=0{,}27$, $0{,}09/0{,}27=1/3$. Câu tính hợp $0{,}0918$ ở MH10 không thêm (ghi chú không tính số này). Ghi chú diễn giả dự kiến không dẫn MAT1101 và không có lời dặn quy trình; tham chiếu MAT1101 nằm ở trường "Mẫu (chỉ planning)" của storyboard. |
| Từ cấm, trạng từ rỗng, cụm rỗng | đạt | Không có "rõ ràng", "ta thấy", "chúng ta", "quan trọng là" trên mặt trang. |
| Đối lập nhị phân, liệt kê phủ định, câu hỏi tu từ, mở đầu rào đón | đạt | Sau cổng storyboard, các dòng "Diễn giải:" đều khẳng định: BY04 (xác suất lỗi trước quan sát là trung bình có trọng số), BY03 (hai mẫu số), MH09, MH10, SL10, TK03 (kết luận có điều kiện). Các so sánh với ngộ nhận ($5\%$, $0{,}6$ và $0{,}4$, $0{,}9$) chuyển vào ghi chú diễn giả. Câu hỏi trên mặt trang chỉ đứng sau nhãn "Câu hỏi:". |
| Lời dẫn đường, siêu ngôn ngữ, câu kết sáo | đạt | Không có "tiếp theo", "như đã thấy"; mỗi trang có nhiều nhất một dòng kết luận là con số hoặc mệnh đề có điều kiện. |
| Rào đón về trạng thái văn bản (quy tắc tác giả 2026-11-04) | đạt | Không có "chưa phải định nghĩa", "đây mới là trực giác". MH10 "Diễn giải: bảng cho xác suất đồng thời; tỉ lệ lỗi trong nhóm bị cảnh báo cần thêm một phép chia" nói về một phép tính còn thiếu, không nói về trạng thái của văn bản. |
| Nhãn | đạt | Chỉ dùng nhãn được phép; bỏ "Dữ kiện:", "Kiểm tra:" và (sau cổng) "Ý tưởng:"; MD04 bỏ "Ví dụ.". Tên bước trong chứng minh gọi theo kết quả ("**Công thức phần bù.**", "**Công thức hợp.**", "**Công thức hai mômen.**"). |
| Gạch ngang dài, in đậm trang trí | đạt | In đậm chỉ cho nhãn và tên bước. |
| Nhịp đều, câu cụt | đạt | Dòng trên mặt trang là mệnh đề toán ngắn theo chuẩn MAT1101; ghi chú diễn giả dự kiến viết thành đoạn liền. |
| Thuật ngữ, viết tắt | đạt | Tiếng Anh ở lần đầu theo Q-G; FPR viết đủ trước viết tắt; "kỳ vọng", "phân phối", "biến cố" (không "kì vọng", "phân bố", "sự kiện"). |

## Vòng rà soát

### Cổng storyboard

Tác tử gate-lec10 (Kiểm định storyboard; general-purpose; opus; high; chỉ đọc) rà bản đầu của `storyboard.md` (75 trang). Điều phối viên đối chiếu từng phát hiện và quyết định: chấp nhận tất cả, trừ đề xuất thêm câu tính hợp $0{,}0918$ ở MH10 (bác bỏ theo Q-B: ghi chú không tính số này). Mức độ ghi theo bản gốc của cổng (thư điều phối viên khi rà lại). Tác tử soạn sửa `storyboard.md`, `outline.md` và tệp này cùng ngày; các mục storyboard bị ảnh hưởng ghi "Sửa (cổng)".

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| chặn bàn giao | KV11 | Giả thiết của định lý dùng "mật độ có điều kiện" trước khi SL04 định nghĩa khái niệm này | Phác thảo KV11 bản đầu: "$X$ rời rạc hoặc có mật độ có điều kiện"; mật độ có điều kiện ở SL04 (Mệnh đề 10.33) | Phát biểu cho $X$ rời rạc; trường hợp có mật độ (L1555) vào ghi chú diễn giả | chấp nhận | đã sửa |
| nghiêm trọng | KV11 | Thiếu bước trực quan; "Ý nghĩa:" đứng thay | Phác thảo KV11 bản đầu kết bằng "Ý nghĩa:" sau định lý | "Trực quan." ngay sau "Nhu cầu:", trước định nghĩa, định lý | chấp nhận | đã sửa |
| chặn bàn giao | PP02, KV02 | Biến phân loại và vector ngẫu nhiên được dùng nhưng chưa định nghĩa trên mặt trang | KV02 "$\mathcal X\subseteq\mathbb R^d$"; PP07, PP11 dùng $S$ như biến; L815 có định nghĩa | PP02 thêm hai dòng theo L815; "Lưu ý:" cũ vào ghi chú; KV02 ghi "$X$ rời rạc trên $\mathcal X\subseteq\mathbb R^d$" | chấp nhận | đã sửa |
| trung bình | SL05–SL08, SL12 | Ký hiệu không đồng bộ với ghi chú ($\phi$, $r(y)$, $q$ cho hậu nghiệm) | Ghi chú L1853, L1887–1890, L1975 | Giữ $q(s,y)$; không đặt $r(y)$; hậu nghiệm ở SL12 là $r$ | chấp nhận | đã sửa |
| trung bình | KV03 | Hai chứng minh trên một trang, nguy cơ tràn khung | Phác thảo KV03 bản đầu: 6 dòng, 2 khối `aligned` dài | Tách KV03, KV03b | chấp nhận | đã sửa (76 trang) |
| trung bình | MH07–MH10 | Cụm công thức hợp: ví dụ đứng sau mệnh đề; "Ý nghĩa:" thay trực quan | Thứ tự MH07 → MH08 → MH09 bản đầu | Thứ tự MH06 → MH09 → MH07 → MH08 → MH10; MH09 tính $\mathbb P(H\cup C)$ trực tiếp; MH07 "Trực quan." | chấp nhận | đã sửa |
| trung bình | BY11 | Bài tập chưa kiểm phần toàn phần rồi Bayes | Phác thảo BY11 bản đầu chỉ có phép chia trên bảng | Thêm "Cách khác:" (số kiểm với BT L11–48) | chấp nhận | đã sửa |
| trung bình | KV00, KV01 | Câu hỏi trung tâm mạch 5 hẹp hơn nội dung mạch | Câu hỏi bản đầu chỉ nói chi phí kỳ vọng và dao động | Câu hỏi và dòng dẫn mới; "Nhu cầu:" KV01 khớp | chấp nhận | đã sửa |
| trung bình | BY00, BY01, BY04, BY05 | Dòng dẫn dùng "tiên nghiệm", "hợp lý" trước khi giới thiệu; quy tắc nhân đứng trước trực quan | Dòng dẫn bản đầu; thứ tự BY04 (quy tắc nhân) → BY05 (cây) | Dòng dẫn mới; BY01 nối tới sản phẩm; cây trước quy tắc nhân | chấp nhận | đã sửa (đổi chỗ) |
| trung bình | MH10 | Ký hiệu $\{Y\ne A\}$ không có trong ghi chú | Ghi chú L440 chỉ nói bằng lời | Viết hợp hai biến cố; thêm cách tính bằng phần bù | chấp nhận | đã sửa |
| trung bình | MH10 | Đề xuất thêm câu tính hợp $0{,}0918$ | Ghi chú không tính số này | — | bác bỏ (Q-B) | không áp dụng |
| trung bình | MH03 | Định nghĩa biến cố là mọi tập con khi chưa nêu $\Omega$ hữu hạn | L169, L177 | "Với $\Omega$ hữu hạn, biến cố là tập $E\subseteq\Omega$" | chấp nhận | đã sửa |
| trung bình | PP09, KV13 | Trang 7 dòng | Phác thảo bản đầu | Gộp dòng | chấp nhận | đã sửa |
| trung bình | BY03, KV04, SL04, SL05, SL09, SL12, TK03 | Bảy dòng quá 20 âm tiết | Phác thảo bản đầu | Tách hoặc chuyển vào ghi chú | chấp nhận | đã sửa |
| trung bình | MH08, BY07, BY08, KV03, KV06, KV09, KV12, SL06, SL07 | Nhãn "Ý tưởng:" không thuộc danh sách nhãn | math-4-AI/CLAUDE.md, "Allowed labels" | Câu thường hoặc vào ghi chú; tên bước theo kết quả | chấp nhận | đã sửa |
| trung bình | TK01 | Tên trùng ý tên mạch; "Kết luận:" thiếu điều kiện | Bản đầu "Tổng kết" | "Kết quả và giả thiết của bài"; "Kết luận:" có điều kiện và ngưỡng | chấp nhận | đã sửa |
| nhẹ | MH01, MH05 | Lưới trùng MH02; dòng chứng minh thiếu bước tập rỗng | Phác thảo bản đầu | Danh sách; thêm bước $\mathbb P(\varnothing)=0$ | chấp nhận | đã sửa |
| nhẹ | BY03, PP07, PP11, KV07, KV12 | "Diễn giải:" phủ định; "Ý nghĩa:" chưa đọc tham số; thứ tự dòng; thiếu phương sai của tổng; thiếu căn cứ phân hoạch | Phác thảo bản đầu | Như các mục storyboard "Sửa (cổng)" | chấp nhận | đã sửa |
| nhẹ | nhiều trang | Số hiệu công thức trên mặt trang khi công thức không hiển thị | Ví dụ (5.6), (5.7), (8.2) | Gọi bằng tên | chấp nhận | đã sửa |
| nhẹ | SL00, SL02, SL06, SL07, SL12 | "Nhân tử" trước định nghĩa; ví dụ trong "Lưu ý:"; một vế; "Nhận xét." lạc chỗ; độ đo của chi phí kỳ vọng | Phác thảo bản đầu | Như các mục storyboard "Sửa (cổng)" | chấp nhận | đã sửa |
| nhẹ | TK02, TK03, MD01, MD04 | Câu (b) chưa đòi giải thích; "Diễn giải:" dài; viết tắt PMF, CDF; nhãn "Ví dụ." | Phác thảo bản đầu | Như các mục storyboard "Sửa (cổng)" | chấp nhận | đã sửa |
| nhẹ | ghi chú diễn giả dự kiến | Dẫn MAT1101 và lời dặn quy trình | Các trường "Ghi chú diễn giả" bản đầu | Chuyển sang trường "Mẫu (chỉ planning)" | chấp nhận | đã sửa |

### Cổng storyboard — rà lại

Lượt rà lại của gate-lec10 trên bản sửa: **đạt có điều kiện**. Các phát hiện của lượt rà lại và trạng thái:

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| trung bình | MH07, MH09 | Công thức (4.9) không có bước ứng dụng; lời "đếm hai lần" lặp ở MH09 | Ghi chú L415–417 | MH07 thêm dòng $0{,}20+0{,}26-0{,}18=0{,}28$ (bước ứng dụng trong bản đồ); MH09 dòng (4) chỉ ghi $0{,}46\ne0{,}28$ | chấp nhận | đã sửa |
| nhẹ | MH03 | Dòng (1) quá 20 âm tiết | Phác thảo MH03 | Bỏ "khi quan sát" | chấp nhận | đã sửa |
| nhẹ | BY05 | Dòng (1) chưa nói tích là gì; "Ý nghĩa:" quá dài | Phác thảo BY05; L536 | "Tích dọc một đường của cây là xác suất đồng thời của các nhánh."; "(5.2) còn gọi là quy tắc chuỗi (chain rule); không cần giả thiết độc lập" | chấp nhận | đã sửa |
| nhẹ | BY04, BY03 | Dòng sau "Diễn giải:"; "Diễn giải:" BY03 chưa nói phép chuẩn hóa | Phác thảo | Đổi thứ tự; "chuẩn hóa trong nhóm có người / nhóm bị cảnh báo" | chấp nhận | đã sửa |
| nhẹ | BY11 | Trang 6 dòng sát trần; "Cách khác:" chưa viết công thức Bayes | Phác thảo | Gộp câu hỏi một dòng; $0{,}9\cdot0{,}1/(0{,}9\cdot0{,}1+0{,}2\cdot0{,}9)$ | chấp nhận | đã sửa |
| nhẹ | KV00, KV07, KV03b | Dòng dẫn chưa gồm trung bình theo nhóm; "Ý nghĩa:" chưa đọc bằng lời; thiếu bước trung gian | Phác thảo; L1185–1196 | Dòng dẫn mới (25 âm tiết); lời trước công thức; thêm $\alpha\sum_xx\sum_z\mathbb P(X=x,Z=z)$ | chấp nhận | đã sửa |
| nhẹ | TK01, TK02, BY00 | Ô công thức nên thử KaTeX trước; TK02 chưa nêu lại tham số; số âm tiết dòng dẫn BY00 ghi sai | Phác thảo; đếm lại: 24 | KaTeX ngắn, số hiệu chỉ khi tràn; nêu lại $0{,}6$; $0{,}02$, $0{,}08$; $0{,}9$; $0{,}05$; ghi 24 | chấp nhận | đã sửa |
| nhẹ | review-log | Ô quyết định Q-C, Q-H hỏng; mức độ bảng cổng chưa đúng bản gốc; Q-D chưa khớp KV07; câu trích MH10 cũ | Tệp này | Khôi phục từ master-brief; viết lại bảng; sửa Q-D; cập nhật câu trích | chấp nhận | đã sửa |

Quyết định điều phối viên cho các điểm tác tử soạn đã hỏi: xem mục "Quyết định của điều phối viên cho các điểm tác tử soạn đã hỏi".

### Soạn HTML (giai đoạn B, 2026-11-05)

Tác tử author-lec10 dựng `2627-1/lecture-10-xac-suat-bieu-dien-bat-dinh.html` theo storyboard đã duyệt. Khối `<head>`, cấu trúc `.reveal > .lecture-viewport > .slides`, chân trang và toàn bộ `<script>` cuối tệp chép từ Bài 07 (đổi tiêu đề và số bài). Mỗi trang có `data-slide-id` bằng mã storyboard; bảy trang tiêu đề mạch có `id="mach-1"` … `id="mach-7"`. Không có `<style>`, `style=""`, lớp `dense` hay lớp thu nhỏ chữ.

**Hình (mới, `2627-1/img/lec-10/`):** `camera-event-grid.svg`, `camera-conditioning.svg`, `cdf-three-levels.svg`, `density-area.svg`, `generation-chain.svg`, `uncorrelated-dependent.svg`, `decision-threshold.svg` (trục $r$); tái dùng `supplier-probability-tree.svg`. Mỗi hình có `role="img"`, `<title>`, `<desc>` tiếng Việt; tín hiệu phân biệt bằng nét liền/đứt, gạch chéo, chấm và nhãn chữ, không chỉ bằng màu. Cả tám tệp phân tích XML hợp lệ (`xml.dom.minidom`); tác tử đã xem ảnh dựng của từng hình. Không có ảnh raster.

**CSS (`2627-1/lecture-course.css`, cuối tệp, phạm vi `:where(html[data-lecture="10"])`):** chép khối bố cục chung của Bài 07 (lưới `grid2`, `responsive`, `formula`, `box`, `check`, `table-scroll`, `algorithm`, cỡ chữ cơ sở `section[data-slide-id]{font-size:.8em}`, chế độ cuộn dọc ở màn hẹp ≤760 px), không chép các luật theo trang của Bài 07; thêm `figure` lề nhỏ, giới hạn chiều cao hình cho PP04, PP05, SL01, SL12 (230 px) và độ rộng cột cho bảng TK01, TK01b. Không sửa `lecture-style.css` hay luật của bài khác. Vì mọi luật đều mang phạm vi `data-lecture="10"`, các deck đã công bố không đổi. Quyết định điều phối viên: chấp nhận — theo tiền lệ mỗi deck một khối trong lecture-course.css; gộp selector với Bài 07 buộc chạy hồi quy Bài 07; kiểm định cuối xác nhận 99 selector mới đều có `data-lecture="10"` và computed style Bài 00, 05, 06, 07 không đổi.

**Kiểm tra đã chạy** (máy chủ `reloadserver` cổng 8765, gốc `math-4-AI`):

- `deck_check.py --shots` (Playwright, 1600×900 và 390×844), lần cuối: 77 trang; console 0, lỗi trang 0, yêu cầu hỏng 0; không có `OVERFLOW`, `KATEX`, `NARROW-H`, `FONT`, `DISP`, `LINE20`; còn `LINES` ở MD02 (7 dòng, ngoại lệ trang "Nội dung"). Một lượt giữa chừng báo cảnh báo KaTeX về chữ tiếng Việt trong `\text{}` (PP09, KV01); đã thay bằng chữ HTML, lượt cuối không còn cảnh báo.
- `deck_check.py` không đo tràn dọc (khung của trang giãn theo nội dung). Tác tử đo thêm chiều cao nội dung trong khung $1280\times720$ với chuyển trang tắt (`scratchpad/vfit.py`); Bài 07 làm mốc: lớn nhất 727 px. Bản đầu của Bài 10 có 55 trang vượt mốc do thiếu luật cỡ chữ cơ sở của học phần; sau khi bổ sung luật đó và sửa nội dung theo bảng "Lệch giữa phác thảo và deck đã dựng" của storyboard, lớn nhất 725 px (PP07).
- Ảnh chụp không chuyển trang (`scratchpad/shots.py`) cho MH00, MH02, MH10, BY04, BY11, PP05, KV03b, SL09, SL10, SL12, TK01, TK01b ở hai cỡ; tác tử đã xem. Ở màn hẹp, công thức và bảng rộng cuộn ngang trong vùng có dấu "↔", như Bài 07.
- Ảnh chụp của `deck_check.py` ở màn rộng chụp trong lúc chuyển trang (250 ms), nên nội dung lệch xuống; không dùng chúng để đánh giá bố cục.

**Lệch so với storyboard đã duyệt** (chi tiết theo trang trong `storyboard.md`, mục "Lệch giữa phác thảo và deck đã dựng"):

1. **77 trang, vượt biên trên 76 của Q-H một trang:** bảng tổng kết tám hàng cao khoảng 1000 px; quy tắc học phần cấm thu nhỏ chữ, nên TK01 được `tách` thành TK01 (suy luận xác suất) và TK01b (kỳ vọng và quyết định). Cắt dự phòng để trở lại 76 trang: dồn TK04 vào ghi chú diễn giả của TK01b. Quyết định điều phối viên: chấp nhận 77 trang (tách TK01 thành TK01, TK01b) — bảng tổng kết tám hàng không vừa khung ở cỡ chữ chuẩn, cấm thu nhỏ chữ; nằm trong biên 70 ± 6 mở rộng 1 trang, các trang chứng minh giữ theo yêu cầu người dùng.
2. **Đổi tiêu đề:** MH10 "Bài tập: bảng của hệ thống sản phẩm"; SL09 "Ví dụ: bảng đồng thời của hệ thống sản phẩm"; TK01, TK01b như trên.
3. **Dòng chuyển vào ghi chú diễn giả:** BY03 (phần bù), PP05 ("Lưu ý:"), PP08 ("Ý nghĩa:"), PP13 ($\mathbb P(W=0)$), KV02 ("Lưu ý:"), KV03 (căn cứ gom nhóm), KV07 (hệ số tương quan $\rho_{XZ}$), KV11 (điều kiện tổng), KV12 (câu mở đầu), SL01 (một câu), TK02 ("cảm biến giữ nguyên"). Trang ứng dụng và câu nối không mất bước nào của hành trình khái niệm.
4. **Ký hiệu trình bày:** mật độ Gaussian viết $(2\pi\sigma^2)^{-1/2}$ và độ lệch chuẩn $\operatorname{Var}(X)^{1/2}$ (tránh căn thức bị công cụ đếm nhầm là tràn); nghĩa không đổi.
5. **MH10:** "Diễn giải:" giữ trên mặt trang, nhưng bỏ vế "bảng cho xác suất đồng thời" (chuyển vào ghi chú).

**Tự kiểm `no-ai-slop` (chế độ Edit) trên chữ của deck:** không có câu hỏi tu từ, lời dẫn đường, "ta thấy", "rõ ràng", "chúng ta" trên mặt trang; câu hỏi chỉ sau nhãn "Câu hỏi:"; nhãn đều thuộc danh sách cho phép; ghi chú diễn giả không mở bằng "Trang này", không có mã trang, thời lượng hay lời dặn quy trình, không dẫn MAT1101; mọi số trên mặt trang và trong ghi chú dẫn được về ghi chú bài giảng hoặc tệp bài tập. Một chỗ còn nên rà: ghi chú KV01 có câu hình dung "trọng tâm của các khối" (diễn giải toán học, không phải số liệu mới).

### Năm rà soát độc lập (bản đóng băng sha256 85cc1470…)

Năm tác tử rà trên cùng một bản đóng băng (`scratchpad/frozen-v1/`, sha256 85cc1470be4c…); điều phối viên hợp nhất trong `scratchpad/review-merge-lec10.md` và ra quyết định ở cột "Quyết định". Cột "Bằng chứng" dẫn tệp hợp nhất (số đo và ảnh của vai sinh viên ở `scratchpad/rv-student/`, gồm `breaks.txt`). Cột "Trạng thái" do tác tử chỉnh sửa ghi; điều phối viên kiểm lại ở bước rà lại.

| Tác tử | Vai | Loại | Mô hình | Effort |
|---|---|---|---|---|
| rv-student | Sinh viên | general-purpose | opus | high |
| rv-expert | Chuyên gia lĩnh vực | general-purpose | opus | high |
| rv-math | Độ chính xác toán học | general-purpose | opus | high |
| rv-pedagogy | Phản biện học thuật–giảng dạy, `no-ai-slop` Detect | general-purpose | opus | high |
| rv-storyline | Mạch lập luận và liên kết, rà tập trung bảy mạch | general-purpose | opus | high |

Không vai nào báo `chặn bàn giao`. Phát hiện `nghiêm trọng`: [PB] thứ tự PP11/PP12, nhu cầu SL01/SL03/SL09, MH04 thiếu trực quan; [ML] nhu cầu của mạch 6 lặp mạch 3; [SV] chữ SVG quá nhỏ. [T] tính lại mọi con số bằng phân số đúng: khớp; 1238 khối KaTeX, 0 lỗi.

#### Sinh viên (rv-student)

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| nghiêm trọng | BY04, PP04, SL12, PP05 | chữ SVG mang số liệu 12–18 px so với thân bài ~40 px (1600×900); ở 390 px 6–11 px | `review-merge-lec10.md`, mục [SV] | vẽ lại để chữ hiển thị ≥ khoảng 0,65 thân bài (≈26 px ở 1600×900): thu viewBox/tăng font-size; bỏ tiêu đề, phụ đề và chú giải lặp mặt trang trong SVG. `supplier-probability-tree.svg` đang được ghi chú bài giảng dùng: KHÔNG sửa tệp đó, tạo `supplier-tree-deck.svg` cho deck | chấp nhận | đã sửa |
| trung bình | MH02, BY01, KV10, SL01 | chữ SVG 16–26 px | `review-merge-lec10.md`, mục [SV] | như trên; chú giải "Viền liền đậm…" vào alt/ghi chú | chấp nhận | đã sửa |
| trung bình | 15 trang (breaks.txt) | công thức nội dòng ngắt giữa biểu thức ở 1600×900 | `review-merge-lec10.md`, mục [SV] | biểu thức dài thành công thức hiển thị hoặc đứng đầu dòng; thêm `:where(html[data-lecture="10"]) .reveal .katex{white-space:nowrap}` CHỈ trong `@media (min-width:761px)`; kiểm lại không tràn | chấp nhận | đã sửa |
| trung bình | 46 trang ở 390 px, trọng tâm MH07, BY04, BY05, BY06, BY08, BY10, PP03, KV02, KV12, SL09, SL10, SL11, TK03 | công thức hiển thị tràn, phải cuộn ngang | `review-merge-lec10.md`, mục [SV] | các trang trọng tâm: `aligned`/`gathered`, một quan hệ mỗi dòng (văn phong tác giả); trang khác giữ cơ chế cuộn có dấu ↔ của học phần | chấp nhận | đã sửa 13 trang trọng tâm (đo lại: không tràn ở 390 px); các trang khác giữ cơ chế cuộn có dấu ↔, thêm `aligned` ở BY03, BY07, PP06, PP10, KV05, KV07, KV08, KV11, SL02–SL07 |
| trung bình | TK01, TK01b | bảng ở 390 px vỡ cột; ô công thức ngắt ở 1600 | `review-merge-lec10.md`, mục [SV] | rút ô công thức; ở màn hẹp xếp bảng thành khối bằng CSS phạm vi Bài 10 | chấp nhận | đã sửa |
| trung bình | SL06 | dẫn số hiệu thay lời | `review-merge-lec10.md`, mục [SV] | như [PB]/[ML] | chấp nhận | đã sửa |
| trung bình | KV07 | tiêu đề hứa "hệ số tương quan" | `review-merge-lec10.md`, mục [SV] | tiêu đề "Hiệp phương sai" | chấp nhận | đã sửa |
| trung bình | SL05, SL07, SL08, SL12 | $a'$ chưa nêu miền | `review-merge-lec10.md`, mục [SV] | SL05 thêm "**Ký hiệu:** $a'\in\{0,1\}$ là giá trị quan sát của $A$" (giữ ký hiệu ghi chú) | chấp nhận | đã sửa |
| trung bình | PP08 | Gaussian nhiều chiều không dùng tới | `review-merge-lec10.md`, mục [SV] | dời vào ghi chú (trùng [CG]) | chấp nhận | đã sửa |
| nhẹ | BY04, MH10, PP07, SL12, PP13, KV03, SL11, TK03 | trang đầy chiều cao, tiêu đề dưới chevron | `review-merge-lec10.md`, mục [SV] | bớt dòng / thu hình | chấp nhận | đã sửa |
| nhẹ | MH09 | tiêu đề bảng ngắt trong ngoặc; thiếu $H^c$ | `review-merge-lec10.md`, mục [SV] | ký hiệu dòng riêng; thêm $H^c$ | chấp nhận | đã sửa |
| nhẹ | SL10, PP04, MH03 | dấu chấm mồ côi | `review-merge-lec10.md`, mục [SV] | dấu chấm trong KaTeX | chấp nhận | đã sửa |
| nhẹ | SL09 | "A=1:0,4·" | `review-merge-lec10.md`, mục [SV] | "Chẳng hạn ô $(b,1,1)$ bằng $0{,}4\cdot0{,}08\cdot0{,}9=0{,}0288$" | chấp nhận | đã sửa |
| nhẹ | BY04 SVG | tiêu đề "Từ … đến …", phụ đề lặp | `review-merge-lec10.md`, mục [SV] | bỏ trong bản deck | chấp nhận | đã sửa |
| nhẹ | SL12 SVG | nhãn đè đường | `review-merge-lec10.md`, mục [SV] | dời nhãn; miền "chấp nhận ($r<1/6$)", "loại ($r>1/6$)" | chấp nhận | đã sửa |
| nhẹ | KV03b, KV09 | thứ tự căn cứ | `review-merge-lec10.md`, mục [SV] | như [PB]; KV09 "Đẳng thức thứ nhất…; thứ hai…; thứ ba tách chuỗi hội tụ tuyệt đối" | chấp nhận | đã sửa |
| nhẹ | TK04, TK02 | khung "Câu hỏi:" không bao đủ | `review-merge-lec10.md`, mục [SV] | đặt cả đề vào một khối hoặc bỏ khung | chấp nhận | đã sửa |
| nhẹ | TK05 | dòng đọc thứ hai | `review-merge-lec10.md`, mục [SV] | "Đọc sau buổi học: Murphy (2022), §…" (gộp [CG]) | chấp nhận | đã sửa |
| nhẹ | BY03 | câu hỏi dễ nhầm nằm trong ghi chú | `review-merge-lec10.md`, mục [SV] | "**Câu hỏi:** So sánh $\mathbb P(H\mid C)$ với $\mathbb P(C\mid H)$." trên mặt trang trước khối tính (fragment); bỏ khỏi ghi chú | chấp nhận | đã sửa |
| nhẹ | PP02 | "tập Borel" chưa định nghĩa trên mặt trang | `review-merge-lec10.md`, mục [SV] | một dòng "Lưu ý:" (khoảng và các tập thu được bằng phần bù, hợp đếm được) nếu vừa trần, nếu không giữ trong ghi chú | chấp nhận | không áp dụng trên mặt trang: PP02 đã đủ 6 dòng; định nghĩa tập Borel giữ trong ghi chú diễn giả (quyết định cho phép) |
| nhẹ | BY11, KV10, PP05 | một dòng chiếm 3–4 dòng hiển thị | `review-merge-lec10.md`, mục [SV] | tách dòng | chấp nhận | đã sửa |
| nhẹ | PP09 | "Nhu cầu:" khó hiểu | `review-merge-lec10.md`, mục [SV] | "thay $\mathbb P(E\mid F)$ bằng $\mathbb P(E)$ trong quy tắc nhân chỉ đúng dưới một giả thiết" | chấp nhận | đã sửa |
| nhẹ | BY05 | như [PB]/[CG] | `review-merge-lec10.md`, mục [SV] | "Quy tắc nhân (product rule); dạng ba biến cố còn gọi là quy tắc chuỗi (chain rule)"; "Ý nghĩa:" không cần giả thiết nào thêm | chấp nhận | đã sửa |
| nhẹ | quy ước tập | $\{0;1;2\}$ | `review-merge-lec10.md`, mục [SV] | dấu phẩy cho tập số nguyên/nhãn; dấu chấm phẩy chỉ khi có số thập phân ($[0;\,0{,}1]$) | chấp nhận | đã sửa |
| nhẹ | notes MD00, MH00, BY00, KV00, SL00, TK00 | tài liệu làm chủ ngữ ("Bài này…", "Phần này…") | `review-merge-lec10.md`, mục [SV] | mở bằng đối tượng hoặc kết quả | chấp nhận | đã sửa |
| nhẹ | notes MD01 | mã "CLO2" trong ghi chú | `review-merge-lec10.md`, mục [SV] | nói bằng lời | chấp nhận | đã sửa |
| nhẹ | notes dài | PP00, KV00, SL00 >100; MH09, BY03, PP05, SL01, KV11 >150 | `review-merge-lec10.md`, mục [SV] | cắt câu bên lề | chấp nhận | đã sửa |
| nhẹ | mạch 5 | nhịp nặng | `review-merge-lec10.md`, mục [SV] | căn cứ hội tụ tuyệt đối chi tiết vào ghi chú; trên mặt trang giữ một vế "hợp lệ vì khả tích" tại bước dùng (người dùng yêu cầu thấy chỗ dùng giả thiết) | chấp nhận một phần | đã sửa một phần: căn cứ hội tụ tuyệt đối chi tiết ở ghi chú; mặt trang giữ vế "hợp lệ vì khả tích" tại bước dùng (KV03b, KV09, KV12) |

#### Chuyên gia lĩnh vực (rv-expert)

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| trung bình | TK01b, TK02, TK03 | "Kết luận:" ở TK01b in sẵn đáp số câu (a), (c) trước đề; (a), (b) trùng SL09–SL12 | `review-merge-lec10.md`, mục [CG] | bỏ hoặc dời "Kết luận:" của TK01b ra sau TK03 (hoặc viết ở dạng không lộ số); TK02 lấy trọng tâm Tình huống 10.2 (tiên nghiệm chung 0,01, ngưỡng, chi phí thêm 1/13); (a), (b) thành câu nhắc ngắn, không tính lại | chấp nhận | đã sửa |
| trung bình | toàn deck | thời lượng 77 trang / 120 phút, 10 trang chứng minh | `review-merge-lec10.md`, mục [CG] | KHÔNG gộp trang chứng minh (người dùng nhấn mạnh chứng minh); đưa Gaussian nhiều chiều của PP08 vào ghi chú; ghi phân bổ phút theo mạch và cho trang chứng minh trong storyboard; ghi rủi ro trong review-log | chấp nhận một phần | đã sửa một phần: Gaussian nhiều chiều vào ghi chú PP08; phân bổ phút cho trang chứng minh ghi trong storyboard; không gộp trang chứng minh; rủi ro ghi dưới đây |
| trung bình | KV07 | Var(X+Z) dưới "Ý nghĩa:" | `review-merge-lec10.md`, mục [CG] | "**Mệnh đề.**" (Mệnh đề 10.26 của ghi chú, trường hợp hai biến) + "**Chứng minh.** Khai triển $(X-\mu_X+Z-\mu_Z)^2$, dùng tính tuyến tính." (thay quyết định "Hệ quả." ở [PB]) | chấp nhận | đã sửa |
| trung bình | KV08 | "ma trận hiệp phương sai" là xem trước Bài 11 | `review-merge-lec10.md`, mục [CG] | "các đặc trưng (feature) độc lập đôi một có mọi hiệp phương sai giữa hai đặc trưng khác nhau bằng 0"; ma trận chỉ trong ghi chú (thay quyết định ở [PB]) | chấp nhận | đã sửa |
| trung bình | KV03b | như [PB] | `review-merge-lec10.md`, mục [CG] | như [PB], thêm căn cứ $\sum_{x,z}\mathbb P=1$ cho $\gamma$ | chấp nhận | đã sửa |
| trung bình | SL12 (và SL08) | liên kết AI trên mặt trang mỏng | `review-merge-lec10.md`, mục [CG] | SL12 thêm một dòng: bộ phân loại xác suất trả về $p(y\mid x)$; quyết định cần thêm chi phí như trên (ghi chú L2014–2020); tùy chọn SL08 một dòng về mô hình biến ẩn (latent variable model) nếu ≤6 dòng | chấp nhận | đã sửa SL12; dòng tùy chọn SL08 không thêm (SL08 đủ 6 dòng); mô hình biến ẩn đã có trong ghi chú diễn giả SL08 |
| nhẹ | PP08 | không có nhu cầu; $\pi$ hai nghĩa; dấu phẩy treo | `review-merge-lec10.md`, mục [CG] | "Nhu cầu:" số đo cảm biến khi biết $Y=y$ (ghi chú L2081) — dùng $X$, không $T$; ghi chú nói rõ hai cách dùng $\pi$ hoặc đổi tham số phân loại | chấp nhận | đã sửa |
| nhẹ | MD01 | mục tiêu thiếu kỳ vọng toàn phần, phản ví dụ, giả thiết suy luận | `review-merge-lec10.md`, mục [CG] | bổ sung, giữ ≤80 âm tiết | chấp nhận | đã sửa |
| nhẹ | notes MH04, PP03, PP08 | dẫn mục Murphy chưa chính xác | `review-merge-lec10.md`, mục [CG] | MH04: §2.1.3.1 (hoặc chỉ ghi chú bài giảng); PP03: §2.2.1, §2.2.2.1; PP08: §2.6.2, §3.2.1 | chấp nhận | đã sửa |
| nhẹ | TK04 notes | "Đáp án:" | `review-merge-lec10.md`, mục [CG] | "Lời giải:" | chấp nhận (trùng [T]) | đã sửa |
| nhẹ | KV05, BY05, KV11, PP02 | thiếu tiếng Anh lần đầu | `review-merge-lec10.md`, mục [CG] | standard deviation; product rule (dạng ba biến cố: chain rule); law of total expectation; categorical variable | chấp nhận | đã sửa |
| nhẹ | KV01, KV11 | điều kiện vòng; thiếu $\mathbb P(S=s)>0$ | `review-merge-lec10.md`, mục [CG] | như [T]/[PB] | chấp nhận | đã sửa |
| nhẹ | KV06 | chứng minh chỉ trường hợp rời rạc mà không nói | `review-merge-lec10.md`, mục [CG] | dòng đầu "Trường hợp rời rạc; có mật độ thì thay tổng bằng tích phân." | chấp nhận | đã sửa |
| nhẹ | SL04 | trường hợp mật độ chỉ đặt tên | `review-merge-lec10.md`, mục [CG] | "… là mật độ: không âm, tích phân theo $x$ bằng 1"; dòng chứng minh thêm trường hợp mật độ, nếu vừa trần | chấp nhận | đã sửa |
| nhẹ | PP13 notes; exercises.md L146 | "hai nguyên nhân độc lập trở nên phụ thuộc…" khái quát quá | `review-merge-lec10.md`, mục [CG] | "có thể trở nên phụ thuộc"; sửa cả exercises.md rồi chạy sync | chấp nhận | đã sửa |
| nhẹ | BY03 notes | hai số 0,10 khác nghĩa | `review-merge-lec10.md`, mục [CG] | thêm câu phân biệt (chia cho 1 so với chia cho 0,80) | chấp nhận | đã sửa |
| nhẹ | TK01, TK01b | thiếu "độc lập ⇒ không tương quan, chiều ngược sai" | `review-merge-lec10.md`, mục [CG] | thêm hàng nếu vừa khung, nếu không đưa vào câu hỏi tự kiểm tra | chấp nhận | đã sửa |
| nhẹ | bài tập mức chứng minh | không bài nào ở mức chứng minh | `review-merge-lec10.md`, mục [CG] | ghi chú diễn giả của một trang chứng minh nêu Bài tập 10.12 như bài tự học | chấp nhận | đã sửa |
| nhẹ | BY06/PP09/SL02; SL01 SVG | như [T] | `review-merge-lec10.md`, mục [CG] | như [T] | chấp nhận | đã sửa |
| nhẹ | TK05 | dòng đọc thứ hai là dãy mục trơ | `review-merge-lec10.md`, mục [CG] | "Murphy (2022), phân phối và mômen: §2.4.1, §2.5.1, §2.6.1–§2.6.2, §3.1.1–§3.1.3, §3.2.1." | chấp nhận | đã sửa |
| nhẹ | notes SL01, MD03, MD04, MH09, BY01, PP11, TK03 | lặp, chỉ đường, câu khẩu hiệu | `review-merge-lec10.md`, mục [CG] | như [PB] | chấp nhận | đã sửa |

#### Độ chính xác toán học (rv-math)

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| trung bình | PP03 | $\mathbb P(t_1<X\le t_2)=F_X(t_2)-F_X(t_1)$ thiếu điều kiện | `review-merge-lec10.md`, mục [T] | thêm "với $t_1<t_2$" | chấp nhận | đã sửa |
| trung bình | KV11, KV12 | $\psi(s)$ chỉ xác định khi $\mathbb P(S=s)>0$; tổng chạy trên các $s$ đó, mặt trang không nêu | `review-merge-lec10.md`, mục [T] | thêm điều kiện vào định nghĩa và định lý | chấp nhận | đã sửa |
| trung bình | BY09 | "∝: bằng nhau sai khác một hằng số dương" mơ hồ (hằng số cộng?) | `review-merge-lec10.md`, mục [T] | "vế trái bằng vế phải nhân một hằng số dương không phụ thuộc $k$ (ở đây $1/\mathbb P(E)$)" | chấp nhận | đã sửa |
| trung bình | BY06 vs PP09, SL02 | $B_1,\ldots$ vừa là phân hoạch vừa là tập Borel | `review-merge-lec10.md`, mục [T] | tập Borel ở PP09, SL02 (và PP02, PP05 nếu có) đổi thành $I,J$ hoặc $B,B'$; ghi lệch ký hiệu | chấp nhận (dùng $B,B'$ cho tập Borel) | đã sửa |
| nhẹ | BY06 notes | "bỏ khỏi phân hoạch" | `review-merge-lec10.md`, mục [T] | "bỏ khỏi tổng" | chấp nhận | đã sửa |
| nhẹ | PP08 | thiếu $\mu\in\mathbb R^d$, $\Sigma\in\mathbb R^{d\times d}$; dấu phẩy cuối khối công thức | `review-merge-lec10.md`, mục [T] | thêm; đổi dấu chấm | chấp nhận | đã sửa |
| nhẹ | KV02 | thiếu kiểu của $g$ | `review-merge-lec10.md`, mục [T] | "$g:\mathcal X\to\mathbb R$"; $\mathcal X$ đếm được (số, vector hoặc nhãn) để KV12 áp cho $S$ | chấp nhận | đã sửa |
| nhẹ | KV07 | $\mu_X,\mu_Z$ chưa định nghĩa | `review-merge-lec10.md`, mục [T] | thêm $\mu_X=\mathbb E[X]$, $\mu_Z=\mathbb E[Z]$ | chấp nhận | đã sửa |
| nhẹ | SL05 | công thức hậu nghiệm thiếu miền $y$, tổng | `review-merge-lec10.md`, mục [T] | thêm điều kiện hoặc đưa vào notes nếu tràn trần | chấp nhận | đã sửa |
| nhẹ | TK01 | $\propto$ không ghi đối số; thiếu $p_A(a')>0$ | `review-merge-lec10.md`, mục [T] | ghi đủ đối số (theo $y$), thêm $p_A(a')>0$ | chấp nhận | đã sửa |
| nhẹ | TK02 | "(c) tỉ lệ lỗi giảm còn $0{,}01$" mơ hồ | `review-merge-lec10.md`, mục [T] | "tỉ lệ lỗi chung $\mathbb P(Y=1)$ giảm còn $0{,}01$" | chấp nhận | đã sửa |
| nhẹ | PP06 | "$f_T>1$" | `review-merge-lec10.md`, mục [T] | "$f_T(t)=2>1$ trên $[0;\,0{,}5]$" | chấp nhận | đã sửa |
| nhẹ | PP05 | thiếu "đo được" | `review-merge-lec10.md`, mục [T] | thêm vào notes | chấp nhận | đã sửa |
| nhẹ | PP11 notes | dùng dạng tương đương trước PP12 | `review-merge-lec10.md`, mục [T] | ghi trong notes rằng dạng tương đương được phát biểu và chứng minh ở trang sau | chấp nhận | đã sửa |
| nhẹ | KV01 notes | luật số lớn thiếu "với mọi $\varepsilon>0$" | `review-merge-lec10.md`, mục [T] | sửa phát biểu | chấp nhận | đã sửa |
| nhẹ | BY10 notes | "khoảng 0,5469 sản phẩm đạt" | `review-merge-lec10.md`, mục [T] | "tỉ lệ sản phẩm đạt khoảng $239/437\approx0{,}5469$" | chấp nhận | đã sửa |
| nhẹ | TK04 notes (dòng 786) | "Đáp án:" | `review-merge-lec10.md`, mục [T] | "Lời giải:" | chấp nhận | đã sửa |
| nhẹ | SL01 notes | một ý lặp hai lần | `review-merge-lec10.md`, mục [T] | bỏ một câu | chấp nhận | đã sửa |
| nhẹ | toàn deck | $T$ (PP06 thời gian; TK05 notes số đo cảm biến), $W$ (PP10–PP13; KV03b notes $W=(X,Z)$), $Z$ phân loại ở PP07, $\pi$ vector tham số cạnh $2\pi$ | `review-merge-lec10.md`, mục [T] | TK05 notes đổi $T$→$X$; KV03b bỏ tên $W$; PP07 dùng $\boldsymbol\pi$ hoặc $\theta_k$ theo ghi chú; ghi outline | chấp nhận | đã sửa |
| nhẹ | SL01 SVG | nhãn $p(s)$, $p(y\mid s)$, $p(a'\mid y)$ không chỉ số | `review-merge-lec10.md`, mục [T] | đổi nhãn thành $p_S(s)$, $p_{Y\mid S}(y\mid s)$, $p_{A\mid Y}(a'\mid y)$ | chấp nhận | đã sửa |
| nhẹ | PP04 | $\{0;1;2\}$ khác $\{0,1\}$ | `review-merge-lec10.md`, mục [T] | dấu phẩy | chấp nhận | đã sửa |

#### Phản biện học thuật–giảng dạy (`no-ai-slop` Detect) (rv-pedagogy)

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| nghiêm trọng | PP11 → PP12 | PP11 dùng dạng "bỏ điều kiện $S$" trước khi PP12 phát biểu | `review-merge-lec10.md`, mục [PB] | đổi thứ tự PP10 → PP12 → PP11 → PP13; "Ý nghĩa:" của PP12 dẫn vào PP11 | chấp nhận; chạy lại rà tập trung mạch 4 | đã sửa |
| nghiêm trọng | SL01, SL03, SL09 | Nhu cầu lấy biên không thật trên mặt trang (BY04/BY10 đã cho 0,044 và 198/437) | `review-merge-lec10.md`, mục [PB] | SL01 "Nhu cầu:" nêu đại lượng mới: $\mathbb P(S=s\mid A=1)$ và $\mathbb P(Y=1\mid A=1,S=s)$ cần phân phối của cả bộ $(S,Y,A)$; SL03 thêm dòng nối "cộng hai lá lỗi trên cây là lấy biên theo $S$"; SL09 "Diễn giải:" nêu cột $A=1$ cho cùng 198/437 và thêm phân phối nguồn hàng sau cảnh báo | chấp nhận | đã sửa |
| nghiêm trọng | MH04 | Độ đo xác suất mở bằng "Định nghĩa." không có trực quan | `review-merge-lec10.md`, mục [PB] | thêm trước định nghĩa "**Trực quan.** xác suất của một tập ô là tỉ lệ khung hình rơi vào tập đó: không âm, cả lưới bằng 1, cộng được trên các tập rời nhau" | chấp nhận | đã sửa |
| trung bình | PP10 | nghĩa bằng lời của độc lập có điều kiện ở cuối | `review-merge-lec10.md`, mục [PB] | "Trực quan." lên đầu; "Giả thiết:" chỉ còn ký hiệu | chấp nhận | đã sửa |
| trung bình | PP03 | CDF không có nhu cầu/trực quan | `review-merge-lec10.md`, mục [PB] | "Nhu cầu:" xác suất không vượt ngưỡng $t$ với mọi $t$ (ghi chú L880); "Trực quan." cộng dồn khối đến $t$ | chấp nhận | đã sửa |
| trung bình | PP07, PP08 | thiếu dòng nhu cầu (kiểu dữ liệu) | `review-merge-lec10.md`, mục [PB] | PP07 "Nhu cầu:" nhãn hai giá trị, loại lỗi $K$ giá trị; PP08 "Nhu cầu:" số đo thực cần họ mật độ có tâm và độ rộng; nếu tràn thì Gaussian nhiều chiều vào ghi chú | chấp nhận | đã sửa |
| trung bình | MH07 | nhu cầu "ít nhất một lỗi" không khớp; trang phát biểu chứa trường hợp cụ thể | `review-merge-lec10.md`, mục [PB] | nhu cầu: tính $\mathbb P(E\cup F)$ khi $E$, $F$ có kết quả chung; dòng kiểm tra camera $0{,}20+0{,}26-0{,}18$ chuyển vào ghi chú diễn giả MH07 | chấp nhận (thay quyết định trước: ứng dụng (4.9) ghi ở ghi chú diễn giả MH07 và bài tự học 10.5; ghi vào bản đồ hành trình và review-log) | đã sửa |
| trung bình | MH09, SL09, SL10 | ví dụ lệch khuôn | `review-merge-lec10.md`, mục [PB] | MH09 đưa 0,10 thành dòng bước, "Diễn giải:" đọc ý nghĩa; SL09 thêm "Tính $\mathbb P(Y=1\mid A=1)$", công thức trước "Diễn giải:"; SL10 "Diễn giải:" nguồn $b$ tăng từ 0,4 lên khoảng 0,54, đẳng thức trộn thành dòng bước có $\mathbb P(S=a\mid A=1)=201/437$ | chấp nhận | đã sửa |
| trung bình | KV03b | thứ tự đảo (lý do trước điểm xuất phát) | `review-merge-lec10.md`, mục [PB] | dòng đầu: áp dụng kỳ vọng của hàm cho $(X,Z)$, $g=\alpha x+\beta z+\gamma$, rồi tách tổng; aligned; dòng cuối nêu căn cứ từng đẳng thức | chấp nhận | đã sửa |
| trung bình | KV05 | ví dụ dẫn nhập không khép | `review-merge-lec10.md`, mục [PB] | "Nhu cầu:" phân biệt hai chi phí cùng kỳ vọng 1; thêm kết luận phương sai 0 và 1 (tính từ định nghĩa) | chấp nhận | đã sửa |
| trung bình | KV07 | công thức Var(X+Z) dưới "Ý nghĩa:" | `review-merge-lec10.md`, mục [PB] | đổi thành "Hệ quả." + một dòng "Chứng minh." (khai triển bình phương, tuyến tính). Ví dụ Cov dương 0,128 chỉ trong ghi chú diễn giả, tính từ số camera đã có | chấp nhận | đã sửa |
| trung bình | MH05 | ba chứng minh trong một câu | `review-merge-lec10.md`, mục [PB] | tách ba dòng, viết rõ $1=1+\sum_{i\ge2}\mathbb P(\varnothing)$ | chấp nhận | đã sửa |
| trung bình | PP13 | nghĩa của $U$, $V$ chỉ ở ghi chú | `review-merge-lec10.md`, mục [PB] | thêm vào dòng dữ kiện | chấp nhận | đã sửa |
| nhẹ | BY05 | "Ý nghĩa:" đặt tên; nói "độc lập" trước PP09 | `review-merge-lec10.md`, mục [PB] | tên "quy tắc chuỗi (chain rule)" trong phát biểu; "không cần giả thiết nào thêm" | chấp nhận | đã sửa |
| nhẹ | BY04 | "Nhu cầu:" là câu dữ kiện | `review-merge-lec10.md`, mục [PB] | "từ tỉ lệ lỗi của từng nhà cung cấp, tính tỉ lệ lỗi chung và xác suất đồng thời" | chấp nhận | đã sửa |
| nhẹ | BY09 | thiếu nhãn | `review-merge-lec10.md`, mục [PB] | "Định nghĩa."; dòng ∝ dưới "Ký hiệu:" (gộp với sửa [T]) | chấp nhận | đã sửa |
| nhẹ | KV08 | "ma trận hiệp phương sai", "đặc trưng" chưa giới thiệu | `review-merge-lec10.md`, mục [PB] | gọi $\Sigma$ là ma trận hiệp phương sai ở PP08/KV07, hoặc chuyển dòng vào ghi chú | chấp nhận | đã sửa |
| nhẹ | KV01 | khả tích viết bằng $\mathbb E\lvert X\rvert$ khi đang định nghĩa $\mathbb E$ | `review-merge-lec10.md`, mục [PB] | $\sum\lvert x\rvert p_X(x)<\infty$ hoặc $\int\lvert x\rvert f_X<\infty$; khép ví dụ $\mathbb E[Y]=0{,}044$ | chấp nhận | đã sửa |
| nhẹ | KV03b, KV09, KV12, SL06, SL07 | tên bước theo thao tác; KV12 thiếu dòng ý tưởng | `review-merge-lec10.md`, mục [PB] | tên theo kết quả; thêm dòng ý tưởng KV12; KV09 "Đẳng thức thứ nhất…; thứ hai…" | chấp nhận | đã sửa |
| nhẹ | SL06 | dẫn "Mệnh đề 10.17" chưa có trên mặt trang | `review-merge-lec10.md`, mục [PB] | ghi "(Mệnh đề 10.17)" sau phát biểu ở PP12 | chấp nhận | đã sửa |
| nhẹ | SL05 | "vế phải của đẳng thức trên" | `review-merge-lec10.md`, mục [PB] | "Đặt $q(s,y)=\ldots$" | chấp nhận | đã sửa |
| nhẹ | BY11 | không nói đây là camera khác | `review-merge-lec10.md`, mục [PB] | tiêu đề bảng "Camera trên tuyến đường vắng"; ghi chú nêu cả tiên nghiệm và tỉ lệ cảnh báo nhầm khác | chấp nhận | đã sửa |
| nhẹ | TK02–TK03 | (a) động từ yếu; (c) mơ hồ | `review-merge-lec10.md`, mục [PB] | (a) "Xác định đại lượng cần tính, phân biệt với độ nhạy, và tính giá trị"; (c) như [T] | chấp nhận | đã sửa |
| nhẹ | MH10 | "Diễn giải:" chỉ đường | `review-merge-lec10.md`, mục [PB] | "khoảng 5,2% sản phẩm nhận phản hồi sai"; câu nối vào ghi chú | chấp nhận | đã sửa |
| nhẹ | MD04 | lời bàn về deck trên mặt trang | `review-merge-lec10.md`, mục [PB] | viết như cổng đã đề xuất (không nhãn "Ví dụ.") | chấp nhận, không dùng nhãn "Ví dụ." | đã sửa |
| nhẹ | PP08, PP04 | dấu phẩy treo; $\{0;1;2\}$ | `review-merge-lec10.md`, mục [PB] | như [T] | chấp nhận | đã sửa |
| nhẹ | SL12, MD01 | tiêu đề hẹp; mục tiêu viết tắt | `review-merge-lec10.md`, mục [PB] | SL12 "Quyết định theo hậu nghiệm và chi phí"; MD01 viết đủ (giữ trần 80) | chấp nhận | đã sửa |
| nhẹ | notes MD03, MD04, MH09, BY01, PP11 | lời chỉ đường tới trang/phần sau | `review-merge-lec10.md`, mục [PB] | xóa hoặc thay bằng quan hệ nội dung | chấp nhận | đã sửa |
| nhẹ | notes SL01; MH04/MH06; MH03/TK05 | lặp ý | `review-merge-lec10.md`, mục [PB] | giữ mỗi ý một nơi | chấp nhận | đã sửa |
| nhẹ | notes BY07, BY08, TK01, TK01b | lặp mặt trang; câu cụt mô tả trang | `review-merge-lec10.md`, mục [PB] | ghi chú nói điều mặt trang không có | chấp nhận | đã sửa |
| nhẹ | notes BY03 | lời dặn giảng viên | `review-merge-lec10.md`, mục [PB] | thành "Câu hỏi:" trên mặt trang (nếu còn chỗ) hoặc câu khẳng định về chỗ dễ nhầm | chấp nhận | đã sửa |
| nhẹ | notes TK03 | câu kết bộ ba | `review-merge-lec10.md`, mục [PB] | xóa; kết ở con số 1/13 | chấp nhận | đã sửa |
| nhẹ | notes KV11, BY10, TK03, KV10 | nhận xét bên lề về ví dụ Murphy | `review-merge-lec10.md`, mục [PB] | chuyển vào note-source (mục, trang) | chấp nhận | đã sửa |
| nhẹ | notes BY08 | "hậu nghiệm" trước BY09 | `review-merge-lec10.md`, mục [PB] | "xác suất $\mathbb P(B_k\mid E)$ của mỗi nhóm" | chấp nhận | đã sửa |
| nhẹ | notes MD04 | đối lập nhị phân | `review-merge-lec10.md`, mục [PB] | câu khẳng định | chấp nhận | đã sửa |

#### Mạch lập luận và liên kết (rv-storyline)

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| nghiêm trọng | BY04, BY10, MD04, SL00, SL01, SL09 | Mạch 6 mở bằng nhu cầu mà mạch 3 đã đáp ứng (BY04 đã cộng theo nhà cung cấp, BY10 cho 198/437); đóng góp riêng của mạch 6 không được nêu thành nhu cầu | `review-merge-lec10.md`, mục [ML] | (1) BY04 "Nhu cầu:" xác suất lỗi khi thiếu hồ sơ nguồn hàng, từ tỉ lệ lỗi trong từng nhóm; (2) MD04 "Đầu ra:" $\mathbb P(Y=1\mid A=1)$, $\mathbb P(S=b\mid A=1)$ và quyết định theo chi phí; (3) SL00 dòng dẫn: "Muốn tính hậu nghiệm của nguồn hàng và nhãn lỗi từ một mô hình chung, rồi quyết định theo chi phí."; (4) SL01 "Nhu cầu:" hậu nghiệm của nguồn hàng và của nhãn trong cùng một mô hình; ghi chú SL01 giải thích vì sao Bayes đã cho 198/437 và vì sao hậu nghiệm nguồn hàng cần $\mathbb P(A=1\mid S=s)$ và $A\perp S\mid Y$; (5) SL09 "Diễn giải:" sau công thức: khi thiếu hồ sơ, hậu nghiệm là tổng theo $s$ trong cột $A=1$, khớp định lý Bayes. Gộp với [PB] (SL03 thêm dòng nối cây ↔ lấy biên) | chấp nhận; mở bài đổi nên rà lại TOÀN deck | đã sửa |
| trung bình | PP11, PP12 | như [PB] | `review-merge-lec10.md`, mục [ML] | đổi thứ tự; ghi chú PP11 "nhờ dạng tương đương của độc lập có điều kiện" | chấp nhận | đã sửa |
| trung bình | KV11 | "Nhu cầu:" lặp bài toán đã giải ở BY04 | `review-merge-lec10.md`, mục [ML] | "trung bình chung của chi phí hay số lỗi từ trung bình trong từng nhóm nguồn hàng"; ghi chú: công thức toàn phần cho xác suất, kỳ vọng toàn phần cho mọi biến khả tích, xác suất là trường hợp chỉ thị | chấp nhận | đã sửa |
| trung bình | PP00, PP01 | câu hỏi hẹp hơn mạch (thiếu tín hiệu đo) | `review-merge-lec10.md`, mục [ML] | PP00 "Muốn mô tả nhãn, nguồn hàng, tín hiệu đo và ghép chúng, cần phân phối của từng biến và quy tắc độc lập."; PP01 "Nhu cầu:" thêm giá trị đo | chấp nhận | đã sửa |
| trung bình | KV08 | "ma trận hiệp phương sai", "đặc trưng"; không trả lời nhu cầu KV07 | `review-merge-lec10.md`, mục [ML] | "**Ý nghĩa:** với chỉ thị lỗi độc lập đôi một, phương sai của tổng số lỗi bằng tổng các phương sai."; ma trận vào ghi chú (thay đề xuất [CG]/[PB]) | chấp nhận | đã sửa |
| trung bình | TK01b–TK03 | "Kết luận:" lộ đáp số, lặp ba lần | `review-merge-lec10.md`, mục [ML] | bỏ "Kết luận:" ở TK01b (TK03 kết bằng mệnh đề có điều kiện) | chấp nhận (gộp [CG]) | đã sửa |
| trung bình | TK01 | hàng "Nhân tử và lấy biên" gán $A\perp S\mid Y$ cho cả lấy biên | `review-merge-lec10.md`, mục [ML] | tách hai hàng: Lấy biên \| không thêm giả thiết \| $p_X(x)=\sum_z p_{X,Z}(x,z)$; Phân tích nhân tử \| $A\perp S\mid Y$, $p_A(a')>0$ \| công thức đủ đối số | chấp nhận | đã sửa |
| trung bình | MH07 | như [PB] | `review-merge-lec10.md`, mục [ML] | "Nhu cầu:" tính xác suất của hợp và phần bù từ xác suất của từng biến cố; dòng camera vào ghi chú | chấp nhận (gộp [PB]) | đã sửa |
| nhẹ | BY04, BY10 | dòng "Sau quan sát…" trên cây $S\to Y$ không có $A$; BY10 đổi phân hoạch không báo | `review-merge-lec10.md`, mục [ML] | bỏ dòng ở BY04; BY10 dòng 1 "Phân hoạch $\{Y=1\},\{Y=0\}$; tiên nghiệm $\mathbb P(Y=1)=0{,}044$ từ cây nguồn hàng" | chấp nhận | đã sửa |
| nhẹ | SL09, SL06, SL10 | như [PB] | `review-merge-lec10.md`, mục [ML] | như [PB] | chấp nhận | đã sửa |
| nhẹ | KV05–KV10 | nhánh phương sai không có đầu ra cho mạch 6 | `review-merge-lec10.md`, mục [ML] | ghi trong bảng (a) storyboard: phục vụ mục tiêu 4; KV08 mới gắn vào tổng số lỗi | chấp nhận | đã sửa |
| nhẹ | TK01/TK01b | thiếu hàng mật độ | `review-merge-lec10.md`, mục [ML] | thêm hàng "Mật độ \| $f_X\ge0$, $\int f_X=1$ \| $\mathbb P(X\in B)=\int_B f_X$" (cùng hàng độc lập ⇒ không tương quan của [CG] nếu vừa khung; nếu không, vào TK04) | chấp nhận | đã sửa |
| nhẹ | TK04 | câu 4 trùng TK02(b); "Đáp án:" | `review-merge-lec10.md`, mục [ML] | câu 4: "Hai biến có hiệp phương sai bằng 0 có độc lập không?" (lời giải dựa KV10); "Lời giải:" | chấp nhận | đã sửa |
| nhẹ | notes TK03; MD00, PP00, SL00 dài; SL01 lặp | — | `review-merge-lec10.md`, mục [ML] | xóa câu khẩu hiệu; rút ghi chú trang tiêu đề mạch ≤100 âm tiết | chấp nhận | đã sửa |
| nhẹ | notes MD03, MH09, BY01, PP11 | câu chỉ đường | `review-merge-lec10.md`, mục [ML] | như đề xuất | chấp nhận | đã sửa |
| nhẹ | notes BY00 | gán sai đầu ra | `review-merge-lec10.md`, mục [ML] | "Kết quả giao cho phần sau là hậu nghiệm 198/437 và quy tắc nhân, dùng lại khi ghép ba biến." | chấp nhận | đã sửa |
| nhẹ | KV04 | không nêu hành động gắn với chi phí | `review-merge-lec10.md`, mục [ML] | thêm "(sản phẩm bị cảnh báo thì bị loại)" vào dữ kiện hoặc ghi chú | chấp nhận | đã sửa |

#### Rà tập trung bảy mạch ([ML], tóm tắt của điều phối viên)

| Mạch | Kết quả rà tập trung | Xử lý |
|---|---|---|
| 1 Mở đầu | đạt; MD04 "Đầu ra:" cần thêm hậu nghiệm nguồn hàng và quyết định | MD04 sửa |
| 2 Mô hình xác suất | đạt; MH07 trộn phát biểu với ví dụ camera | dòng camera vào ghi chú MH07 |
| 3 Xác suất có điều kiện và định lý Bayes | đạt; BY04 phải gọi tên "thiếu hồ sơ" | BY04 "Nhu cầu:" mới |
| 4 Biến ngẫu nhiên, phân phối và độc lập | câu hỏi hẹp hơn nội dung (thiếu tín hiệu đo); PP11 dùng kết quả trước PP12 (trung bình) | PP00, PP01 sửa; thứ tự PP10 → PP12 → PP11 → PP13; cần chạy lại rà tập trung mạch 4 |
| 5 Kỳ vọng, phương sai và hiệp phương sai | đạt; KV11 nhu cầu lặp BY04, KV08 thuật ngữ | KV11, KV08 sửa |
| 6 Phân phối đồng thời và phép lấy biên | nhu cầu lặp mạch 3 (nghiêm trọng) | SL00, SL01, SL03, SL09 và BY04, MD04 sửa; mở bài đổi nên cần rà lại toàn deck |
| 7 Tổng kết và chuyển tiếp | lặp kết luận ba lần; hàng lấy biên gán sai giả thiết (trung bình) | bỏ "Kết luận:" TK01b; tách hàng TK01; TK02 lấy trọng tâm Tình huống 10.2 |

Rủi ro thời lượng (chấp nhận một phần [CG]): 77 trang trong 120 phút, 12 trang chứng minh (khoảng 24 phút, bảng phút trong `storyboard.md`). Người dùng yêu cầu chứng minh trên mặt trang, nên không gộp; giảm tải bằng cách đưa Gaussian nhiều chiều vào ghi chú diễn giả PP08.

### Chỉnh sửa

| Tác tử | Vai | Loại | Mô hình | Effort |
|---|---|---|---|---|
| editor-lec10 | Chỉnh sửa (người ghi tệp duy nhất) | general-purpose | opus | medium |

Việc đã làm (chi tiết theo trang: `storyboard.md`, mục "Chỉnh sửa sau năm rà soát độc lập"):

1. Áp dụng mọi mục "chấp nhận" của năm bảng trên, theo các quyết định thay thế của điều phối viên: KV07 dùng "Mệnh đề." + "Chứng minh." một dòng; KV08 dùng câu "Ý nghĩa:" của [ML] (ma trận hiệp phương sai và đặc trưng vào ghi chú); MH07 chuyển dòng camera và Bài tập 10.5 vào ghi chú; tập Borel ký hiệu $B,B'$.
2. Đổi thứ tự mạch 4: PP10 → PP12 → PP11 → PP13. Tiêu đề mới: KV07 "Hiệp phương sai", SL12 "Quyết định theo hậu nghiệm và chi phí", TK01b "Kết quả và giả thiết: phân phối, kỳ vọng và quyết định". Số trang giữ 77.
3. Vẽ lại bảy SVG của deck và tạo `img/lec-10/supplier-tree-deck.svg` cho BY04 (`supplier-probability-tree.svg` không đổi, ghi chú bài giảng vẫn dùng). Chữ hiển thị đo bằng Playwright ở 1600×900: MH02 28,6–30,0 px; BY01 28,6–34,3; BY04 29,5–31,0; PP04 26,3–27,8; PP05 26,3–27,8; KV10 27,5–29,0; SL01 31–35 (chỉ số dưới khoảng 25); SL12 26,1. Ở 390×844: 13,2–19,2 px (chỉ số dưới của SL01 khoảng 10 px). Mọi hình giữ `role="img"`, `<title>`, `<desc>`, alt cụ thể; lỗi và loại ô phân biệt bằng nét viền và mẫu nền, không chỉ bằng màu.
4. Công thức: `white-space:nowrap` cho `.katex` chỉ ở `min-width:761px`; 13 trang trọng tâm ở 390 px dùng `aligned`/`gathered` một quan hệ mỗi dòng (đo lại bằng `rv-student/scripts/breaks.py`: không tràn). TK01, TK01b, MH05 xếp bảng thành khối ở màn hẹp (`table.stack-table`, nhãn cột qua `data-label`).
5. CSS: chỉ luật phạm vi `:where(html[data-lecture="10"])` trong `lecture-course.css` (không ảnh hưởng deck khác): lề đoạn `.32em` và lề công thức hiển thị `.3em` ở màn rộng để các trang có khối `aligned` vừa khung 16:9; lưới KV10, SL12; chiều cao hình. Không có lớp thu nhỏ chữ.
6. `materials/lec-10/exercises.md` L146: "có thể trở nên phụ thuộc"; chạy `sync-local-materials.py` và `--check`.
7. Ghi chú diễn giả: bỏ câu chỉ đường, câu lấy tài liệu làm chủ ngữ, câu khẩu hiệu (TK03), nhận xét bên lề về ví dụ Murphy (chuyển vào `note-source`), "Đáp án:" → "Lời giải:" (TK04), mã CLO2 (MD01); rút ghi chú dài (MH09, BY03, PP05, SL01, KV11).

Mục không áp dụng hoặc áp dụng một phần:

| Mục | Lý do |
|---|---|
| [SV] PP02 dòng "Lưu ý:" tập Borel | PP02 đã 6 dòng; giữ trong ghi chú diễn giả (quyết định cho phép) |
| [CG] SL08 dòng mô hình biến ẩn (tùy chọn) | SL08 đã 6 dòng; câu này có trong ghi chú diễn giả SL08 |
| [CG] thời lượng | một phần, như quyết định: không gộp trang chứng minh |
| [SV] mạch 5 nhịp nặng | một phần, như quyết định |
| [SV] 33 trang không trọng tâm ở 390 px | giữ cơ chế cuộn có dấu ↔ của học phần theo quyết định; nhiều trang vẫn được thêm `aligned` |
| [CG]/[ML] TK01, TK01b hàng mật độ và hàng "độc lập ⇒ không tương quan" | áp dụng ở TK01b (6 hàng); TK04 câu 4 hỏi chiều ngược |

Kiểm tra đã chạy (máy chủ `localhost:8765`):

- `deck_check.py --shots` (1600×900 và 390×844): 77 trang; 0 lỗi bảng điều khiển, 0 lỗi trang, 0 yêu cầu hỏng, 0 lỗi KaTeX, 0 NARROW-H; mật độ: mọi trang ≤60 âm tiết (MD01 80, trần 80), ≤6 dòng trừ MD02 (7, ngoại lệ đã ghi), ≤20 âm tiết mỗi dòng, ≤3 công thức hiển thị. Cờ OVERFLOW còn lại: PP08, một `span.mord` của KaTeX thấp hơn đáy `section` 6 px; ảnh chụp cho thấy nội dung nằm gọn trong khung, cách chân trang hơn 100 px.
- Đo chiều cao nội dung (Playwright, tắt hiệu ứng chuyển trang): không trang nào chạm chân trang ở 1600×900.
- `rv-student/scripts/breaks.py`: ở 1600×900 không còn công thức nội dòng bị ngắt (KV01 báo cáo do chỉ số của $\sum$ hiển thị làm lệch đỉnh các `base`, ảnh chụp không ngắt dòng); ở 390×844, 13 trang trọng tâm không tràn ngang.
- `rv-student/scripts/measure.py`: cỡ chữ SVG như mục 3.
- Xem ảnh chụp toàn bộ 77 trang ở hai kích thước (bảng ghép trong scratchpad của tác tử chỉnh sửa).
- `sync-local-materials.py --check`: OK.

Trang có thay đổi nội dung cần rà lại toán và mạch: MD01, MD04, MH04, MH05, MH07, MH09, MH10, BY03, BY04, BY05, BY09, BY10, BY11, PP00, PP01, PP03, PP05, PP06, PP07, PP08, PP09, PP10, PP12, PP11, PP13, KV01, KV02, KV03b, KV04, KV05, KV06, KV07, KV08, KV09, KV10, KV11, KV12, SL00, SL01, SL03, SL04, SL05, SL06, SL07, SL09, SL10, SL11, SL12, TK01, TK01b, TK02, TK03, TK04, TK05; toàn deck cho mạch (mở bài mạch 6 đổi).

### Rà lại sau chỉnh sửa

Ba tác tử rà soát được tiếp tục qua SendMessage (giữ ngữ cảnh), cùng loại, mô hình và effort như vòng đầu. Cả ba kết luận ĐẠT: không còn `chặn bàn giao`, `nghiêm trọng`, `trung bình`; 26 mục nhẹ. Phát hiện lấy từ `scratchpad/review-merge-lec10.md`, mục [T-2], [ML-2], [SV-2]; số đo của vai sinh viên ở `scratchpad/rv-student/measure2.txt`, `breaks2.txt`.

| Tác tử | Vai | Loại | Mô hình | Effort | Kết luận |
|---|---|---|---|---|---|
| rv-math | Rà lại toán trên trang đổi nội dung | general-purpose | opus | high | đạt; 21/22 phát hiện cũ sửa đúng, KV02 một phần; 1312 khối KaTeX, 0 lỗi |
| rv-storyline | Rà lại mạch toàn deck và bảy báo cáo rà tập trung | general-purpose | opus | high | đạt; 21 phát hiện cũ đã sửa (2 một phần) |
| rv-student | Rà lại sinh viên | general-purpose | opus | high | đạt; SVG 26–35 px ở 1600×900, 13 trang trọng tâm không tràn ở 390 px |

#### Độ chính xác toán học (rv-math)

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| nhẹ | PP12 | "Ý nghĩa:" dùng $a'$ trước SL05; thiếu $\mathbb P(S=s,Y=y)>0$ | `review-merge-lec10.md`, mục [T-2] | dùng $A=1$ như PP10 hoặc "với mọi giá trị $a$ của $A$ và mọi $(s,y)$ có $\mathbb P(S=s,Y=y)>0$" (tránh $a'$ trước SL05) | chấp nhận | đã sửa: "Ý nghĩa:" dùng $A=1$ và điều kiện $\mathbb P(S=s,Y=y)>0$ |
| nhẹ | KV02 | phần mật độ thiếu kiểu $g$ | `review-merge-lec10.md`, mục [T-2] | "$g:\mathbb R\to\mathbb R$ đo được" (mặt trang nếu vừa, nếu không ghi chú) | chấp nhận | đã sửa trên mặt trang ("$g:\mathbb R\to\mathbb R$ đo được") |
| nhẹ | TK01b | hàng "Không tương quan" thiếu mômen bậc hai; hàng "Mật độ" đặt tính chất vào cột giả thiết | `review-merge-lec10.md`, mục [T-2] | thêm $\mathbb E[X^2],\mathbb E[Z^2]<\infty$; cột giả thiết "$X$ có mật độ $f_X$" | chấp nhận | đã sửa |
| nhẹ | KV07 | Mệnh đề không tự nêu giả thiết | `review-merge-lec10.md`, mục [T-2] | "Với $X,Z$ có mômen bậc hai hữu hạn, …" | chấp nhận | đã sửa: "Với $X,Z$ như trên" (giả thiết mômen bậc hai nêu ngay ở định nghĩa cùng trang) |
| nhẹ | KV08 notes | dùng dạng $n$ biến | `review-merge-lec10.md`, mục [T-2] | ghi "theo Mệnh đề 10.26 ($n$ biến)" trong ghi chú | chấp nhận | đã sửa |
| nhẹ | MH09 | "trong đó 8%" mơ hồ | `review-merge-lec10.md`, mục [T-2] | "$8\%$ khung hình là cảnh báo sai, $2\%$ là bỏ sót" | chấp nhận | đã sửa |
| nhẹ | KV10 SVG | cột $\pm2$ cao 10 px, đúng tỉ lệ ≈5,5 px | `review-merge-lec10.md`, mục [T-2] | đặt đúng tỉ lệ | chấp nhận | đã sửa |
| nhẹ | KV01 notes | luật số lớn thiếu "khi $n\to\infty$" | `review-merge-lec10.md`, mục [T-2] | thêm | chấp nhận | đã sửa |

#### Mạch lập luận và liên kết (rv-storyline)

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| nhẹ (bắt buộc trước kiểm định cuối) | outline.md TK01, TK01b, TK04 | planning không khớp deck | `review-merge-lec10.md`, mục [ML-2] | TK01 năm hàng; TK01b tiêu đề mới, sáu hàng, không "Kết luận:"; TK04 "lời giải trong ghi chú diễn giả" | chấp nhận | đã sửa |
| nhẹ | storyboard (b), outline L93 | MH09 không còn 0,46 | `review-merge-lec10.md`, mục [ML-2] | ghi: MH09 cho 0,28 trực tiếp; nhu cầu và trực quan (0,46 so với 0,28) ở MH07 | chấp nhận | đã sửa |
| nhẹ | storyboard (a) mạch 5 | ghi "nối vào mạch 6 qua tổng số lỗi" sai | `review-merge-lec10.md`, mục [ML-2] | "nhánh phương sai KV05–KV10 phục vụ mục tiêu 4, khép trong mạch qua tổng số lỗi (KV07 → KV08); không có đầu ra cho mạch 6; TK01b tổng kết" | chấp nhận | đã sửa |
| nhẹ | notes MH00, BY00, PP00, PP01, KV00, SL00, TK00, MD02 | lẫn "mạch"/"phần" | `review-merge-lec10.md`, mục [ML-2] | thống nhất "phần" | chấp nhận | đã sửa |
| nhẹ | notes MD00 | 113 âm tiết | `review-merge-lec10.md`, mục [ML-2] | rút ≤100 | chấp nhận | đã sửa |
| nhẹ | SL10 | không gọi tên công cụ; không nối PP11 | `review-merge-lec10.md`, mục [ML-2] | "**Tính** $\mathbb P(S=b\mid A=1)$ (lấy biên theo $y$ trong cột $A=1$, rồi chuẩn hóa) và $\mathbb P(Y=1\mid A=1,S=s)$."; ghi chú: tử số $0{,}0472=0{,}4\cdot0{,}118$ đã có ở ví dụ cảnh báo và nguồn hàng | chấp nhận | đã sửa |
| nhẹ | TK02 | "quy tắc cũ" chưa định nghĩa; thiếu tỉ lệ nguồn hàng | `review-merge-lec10.md`, mục [ML-2] | "nếu vẫn loại khi có cảnh báo"; thêm $\mathbb P(S=a)=0{,}6$, tỉ lệ lỗi 0,02, 0,08 nếu vừa trần, nếu không vào ghi chú | chấp nhận | đã sửa: "nếu vẫn loại khi có cảnh báo"; tỉ lệ nguồn hàng vào ghi chú (mặt trang ở trần 60 âm tiết) |
| nhẹ | notes PP00 | câu nối chưa nêu giới hạn | `review-merge-lec10.md`, mục [ML-2] | "Định lý Bayes đã cho hậu nghiệm 198/437; hậu nghiệm của nguồn hàng còn cần biết cảnh báo phụ thuộc nguồn hàng thế nào." | chấp nhận | đã sửa |
| nhẹ | MH06 | $2^\Omega$ chưa định nghĩa trên mặt trang | `review-merge-lec10.md`, mục [ML-2] | "trên họ mọi tập con $2^\Omega$" | chấp nhận | đã sửa |

#### Sinh viên (rv-student)

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| nhẹ | SL01 (PP05) | chữ hình nhỏ ở 390 px (0,44–0,6 thân bài) | `review-merge-lec10.md`, mục [SV-2] | SL01: bản SVG dọc cho màn hẹp (`<picture>`/`srcset` không dùng được với CSS? → dùng hai `<img>` và ẩn/hiện bằng lớp trong lecture-course.css phạm vi Bài 10) hoặc chấp nhận có lý do trong review-log | chấp nhận: làm bản dọc nếu gọn, nếu không ghi lý do (alt đầy đủ, số liệu có trên mặt trang) | đã sửa SL01: thêm `generation-chain-narrow.svg` (xếp dọc) hiện ở màn hẹp, chữ khoảng 22 px ở 390 px; PP05 không làm bản riêng (chữ 13–14 px, số liệu và định nghĩa đều có trên mặt trang, alt đầy đủ) |
| nhẹ | SL09, SL12, TK03, KV04, PP04, PP06, KV02, SL11, TK01b, PP05 | tiêu đề dưới chevron, dòng cuối sát chân trang; PP05 chevron chạm chỉ số $\int_B$ | `review-merge-lec10.md`, mục [SV-2] | bớt dòng/giảm chiều cao hình; SL12 "Ý nghĩa:" giữ (liên kết AI theo [CG]) nhưng giảm hình | chấp nhận | đã sửa: lưới hai cột (KV02, PP06, PP03), gộp dòng (KV04, SL09, SL11, SL12, TK03), hình PP05 cao 276 px, TK01b bỏ vế "chiều ngược sai" và nới cột; đo lại: mọi trang cách đáy khung ≥ 51 px ở 1600×900 (vùng chevron khoảng 45 px) |
| nhẹ | SL09 | bảng bị cắt cột phải ở 390 px | `review-merge-lec10.md`, mục [SV-2] | màn hẹp: xếp khối hoặc bỏ cột "Tổng" ở màn hẹp | chấp nhận | đã sửa |
| nhẹ | TK02, TK04 | khung `.check` chứa >2 câu | `review-merge-lec10.md`, mục [SV-2] | bỏ lớp `.check`, giữ "Câu hỏi:" in đậm + danh sách | chấp nhận | đã sửa |
| nhẹ | PP03 | nhu cầu/trực quan CDF ở cột phải cạnh PMF; ":" mồ côi ở 390 | `review-merge-lec10.md`, mục [SV-2] | đặt "Nhu cầu:", "Trực quan." của CDF ngay trên dòng định nghĩa CDF; dấu ":" vào trong KaTeX | chấp nhận | đã sửa |
| nhẹ | TK01, TK01b (390) | công thức ngắt trong ngoặc | `review-merge-lec10.md`, mục [SV-2] | `white-space:nowrap` cho ô công thức khối TK ở màn hẹp (kiểm không tràn) | chấp nhận | đã sửa |
| nhẹ | PP04, PP05, SL12 hình | nhãn "0" chồng chấm; hai nhãn "x"; thiếu dấu 0,0048 | `review-merge-lec10.md`, mục [SV-2] | dời nhãn; $x_0$, $x_0+\delta$; thêm dấu 0,0048 nếu không chồng | chấp nhận | đã sửa |
| nhẹ | notes SL12, PP08, SL01, BY10, KV07, MH04 | >150 âm tiết | `review-merge-lec10.md`, mục [SV-2] | rút gọn câu bên lề; giữ nội dung giả thiết/lời giải (khuyến nghị, không phải trần) | chấp nhận | đã sửa: bỏ một câu bên lề ở mỗi ghi chú |
| nhẹ (thông tin) | 22 trang không trọng tâm ở 390 | cuộn ngang có ↔ | `review-merge-lec10.md`, mục [SV-2] | ưu tiên KV03b (908/354 px): `aligned` | chấp nhận cho KV03b | KV03b viết lại `aligned` bảy dòng trong lưới hai cột; ở 390 px còn cần 362/354 px (trước 908 px), cuộn ngang 8 px có dấu ↔ |

#### Rà tập trung bảy mạch, lần hai ([ML-2])

| Mạch | Kết quả |
|---|---|
| 1 Mở đầu | đạt (sau đổi "Đầu ra:" MD04 và mục tiêu MD01) |
| 2 Mô hình xác suất | đạt |
| 3 Xác suất có điều kiện và định lý Bayes | đạt |
| 4 Biến ngẫu nhiên, phân phối và độc lập | đạt sau đổi thứ tự PP10 → PP12 → PP11 → PP13 |
| 5 Kỳ vọng, phương sai và hiệp phương sai | đạt |
| 6 Phân phối đồng thời và phép lấy biên | đạt sau đổi nhu cầu (SL00, SL01, SL03, SL09) |
| 7 Tổng kết và chuyển tiếp | đạt sau đổi kết bài (TK01, TK01b, TK02, TK03) |


Tự kiểm `no-ai-slop` (chế độ Edit, theo `eval.md`) của tác tử chỉnh sửa, đợt 1 và đợt 2:

| Mẫu đã soát | Chỗ đã sửa |
|---|---|
| Lấy tài liệu làm chủ ngữ, mở đầu vòng ("Bài này…", "Phần này…") | ghi chú MD00, MH00, BY00, PP00, KV00, SL00, TK00 mở bằng đối tượng hoặc kết quả kế thừa |
| Lời chỉ đường, câu nối trỏ tới trang sau ("ở trang ví dụ", "bài tập cuối phần này", "trang sau giải thích") | ghi chú MD03, MD04, MH09, MH10, BY01, PP11 thay bằng quan hệ nội dung |
| Câu khẩu hiệu, câu kết "sâu sắc" | ghi chú TK03 bỏ câu bộ ba "biểu diễn, kết hợp, cập nhật"; kết ở con số $1/13$ |
| Đối lập nhị phân ("không mô tả … mà …") | ghi chú MD04 viết khẳng định |
| Lời bàn về deck trên mặt trang | MD04 dòng camera viết như mô tả đối tượng |
| Nhận xét bên lề, ý lặp | ghi chú SL01 (câu lặp hai lần), MH04/MH06, MH03/TK05, PP05 (hai nhận xét), SL12, PP08, BY10, KV07, MH04 (đợt 2); nhận xét về ví dụ Murphy chuyển vào `note-source` (BY10, KV10, KV11, TK03) |
| Lẫn thuật ngữ "mạch"/"phần" trong ghi chú | đợt 2: thống nhất "phần" |
| Câu hỏi tu từ, câu tự hỏi tự đáp, cảm thán, "ta thấy", "rõ ràng", "chúng ta" | không có trên mặt trang; câu hỏi chỉ sau nhãn "Câu hỏi:" (BY03, TK02, TK04 đều có nhãn) |
| Nói về tình trạng của chính văn bản ("chưa phải…") | không có |
| Gạch ngang trang trí, in đậm rải rác | không có; in đậm chỉ ở nhãn và tên bước |

Mọi mục `eval.md` (giữ ý, không thêm số liệu, câu chủ động, không từ đệm, không câu kết tóm lược) đạt sau sửa; giọng học thuật và độ chính xác toán học được ưu tiên theo quy tắc của học phần.

### Chỉnh sửa đợt 2

| Tác tử | Vai | Loại | Mô hình | Effort |
|---|---|---|---|---|
| editor-lec10 | Chỉnh sửa (tiếp tục) | general-purpose | opus | medium |

Việc đã làm:

1. 26 mục nhẹ của [T-2], [ML-2], [SV-2] (bảng trên, cột "Trạng thái"). Trang đổi: MD00 (ghi chú), MH00, BY00, KV00, SL00, TK00 (ghi chú: "phần"), MH04 (ghi chú), MH06, MH09, PP00 (ghi chú), PP03, PP04, PP05, PP06, PP08 (ghi chú), PP12, KV01 (ghi chú), KV02, KV03b, KV04, KV07, KV08 (ghi chú), KV10 (hình), SL01, SL09, SL10, SL11, SL12, TK01, TK01b, TK02, TK03, TK04, BY10 (ghi chú).
2. Hình: `uncorrelated-dependent.svg` (cột $\pm2$ cao 5,5 đơn vị, đúng tỉ lệ $0{,}022/0{,}556$); `cdf-three-levels.svg` (nhãn "0" không chồng chấm); `density-area.svg` ($x_0$, $x_0+\delta$, chữ 19–20); `decision-threshold.svg` (thêm nhãn $0{,}0048$, hai miền dời xuống); mới `generation-chain-narrow.svg` (chuỗi xếp dọc cho màn hẹp; deck dùng hai `img` với lớp `only-wide`/`only-narrow`).
3. Bảng TK01, TK01b: đối số của xác suất và kỳ vọng có điều kiện đặt trong `{}` để KaTeX không ngắt dòng giữa ngoặc ở màn hẹp (không cần `nowrap`, không tràn).
4. CSS phạm vi Bài 10: `only-wide`/`only-narrow`; SL09 ẩn cột "Tổng" và thu đệm ô ở màn hẹp (bảng 354/354 px, không cuộn); chiều cao hình PP05 276 px; cột TK01b 19%/35%.
5. Planning: `outline.md` (TK01 năm hàng; TK01b tiêu đề mới, sáu hàng, không "Kết luận:"; TK04 lời giải trong ghi chú diễn giả; MH09; hình mới); `storyboard.md` (bảng (a) mạch 5; bản đồ MH09/MH07; mục "Chỉnh sửa đợt 2").
6. Trang mục lục và viewer: thẻ Bài 10 của `2627-1/index.html` có liên kết "Bài giảng" (`term-link`, "Mở") và tham số `&amp;deck=` cho hai liên kết học liệu; mô tả thẻ khớp deck nên giữ nguyên. `material-viewer.js`: bỏ `"10"` khỏi `DECKLESS_LECTURES`. Nâng phiên bản tài nguyên theo quy ước commit 2caee87: `material-bootstrap.js` (hai tham số `?v=`) và `material-viewer.html` (`material-bootstrap.js?v=`) thành `20261105-lec10-deck`.

Mục không áp dụng: PP05 không có bản SVG riêng cho màn hẹp (lý do ở bảng [SV-2]); KV03b ở 390 px còn cuộn 8 px (trang không trọng tâm, có dấu ↔).

Kiểm tra đã chạy:

- `deck_check.py --shots` (`scratchpad/chk10f`): 77 trang; 0 lỗi bảng điều khiển, 0 lỗi trang, 0 yêu cầu hỏng, 0 lỗi KaTeX, 0 NARROW-H; mật độ trong trần (MD02 7 dòng, ngoại lệ đã ghi). Cờ OVERFLOW còn PP08 (một `span.mord` 6 px dưới đáy `section`, ảnh chụp gọn khung, như đợt 1).
- Đo khoảng cách tới đáy khung ở 1600×900: mọi trang ≥ 51 px (trước đợt 2: có trang 31 px).
- `breaks.py`: 13 trang trọng tâm không tràn ở 390 px; TK01, TK01b chỉ ngắt sau dấu quan hệ hoặc phép toán, không ngắt trong ngoặc.
- Viewer (Playwright): `material-viewer.html?doc=materials/lec-10/{lecture-note,exercises}.md&deck=lecture-10-xac-suat-bieu-dien-bat-dinh.html` mở đúng, có liên kết "Bộ trang chiếu" tới deck (HTTP 200), 0 `.katex-error`; viewer Bài 11 mở bằng `doc` một mình; `index.html` không lỗi. Lỗi console duy nhất ở viewer là CSP chặn script nội dòng do máy chủ xem thử `reloadserver` chèn vào; lỗi này cũng có ở viewer Bài 07, không thuộc tệp của học phần.
- Xem ảnh các trang đã sửa ở hai kích thước; `sync-local-materials.py --check`: OK; `git diff --check`: sạch.


### Rà soát độc lập các trang chứng minh

| Tác tử | Vai | Loại | Mô hình | Effort | Kết luận |
|---|---|---|---|---|---|
| proof-audit | Rà soát độc lập các trang chứng minh, đối chiếu ghi chú bài giảng và Murphy (2022) | general-purpose | opus | high | đạt; một mục trung bình (SL04) |

| Trang | Kết quả | Phát biểu | Chứng minh | Ghi chú (dòng) | Murphy (mục, công thức, trang PDF; có/không chứng minh) | Nhận xét |
|---|---|---|---|---|---|---|
| MH05 | Bổ đề 10.4 | đúng | đúng | Bổ đề 10.4 | §2.1.3.1, PDF 64; không có tiên đề | deck chặt chẽ hơn |
| MH07–MH08 | Mệnh đề 10.6 | đúng | đúng | Mệnh đề 10.6 | §2.1.3.3, (2.3)–(2.4), PDF 64–65; phần bù là định nghĩa | deck chứng minh từ tiên đề |
| BY05 | Mệnh đề 10.10 | đúng | đúng | Mệnh đề 10.10 | §2.2.3, (2.19) product rule, (2.20) chain rule, PDF 68–69; không chứng minh | — |
| BY06–BY08 | Định lý 10.11 | đúng | đúng | Định lý 10.11 | §2.3, (2.51)–(2.54), PDF 75–76 | căn cứ BY08 thêm $\mathbb P(B_k)>0$ |
| PP12 | Mệnh đề 10.17 | đúng | đúng | Mệnh đề 10.17 | §2.2.4, (2.23), PDF 69; không chứng minh | — |
| KV02–KV03 | Mệnh đề 10.22 (kỳ vọng của hàm) | đúng | đúng | Mệnh đề 10.22 | Murphy không phát biểu | — |
| KV03b | Mệnh đề 10.22 (tuyến tính) | đúng | đúng | Mệnh đề 10.22 | (2.26)–(2.27), PDF 70; không chứng minh | — |
| KV05–KV06 | Mệnh đề 10.24 | đúng | đúng | Mệnh đề 10.24 | (2.29)–(2.30), PDF 70 | "Mệnh đề." nêu giả thiết |
| KV07 | Mệnh đề 10.26 ($n=2$) | đúng | đúng | Mệnh đề 10.26 | §2.8.4, (2.166)–(2.167), PDF 100 | ghi chú nêu tuyến tính tổng quát được thừa nhận |
| KV08–KV09 | Mệnh đề 10.27 | đúng | đúng | Mệnh đề 10.27 | §3.1.3, PDF 109 | — |
| KV11–KV12 | Định lý 10.29 | đúng | đúng | Định lý 10.29 | §2.2.5.4, (2.41)–(2.43), PDF 71–72; Murphy không bàn khả tích | — |
| SL03 | Mệnh đề 10.32 | đúng | đúng | Mệnh đề 10.32 | (2.17), PDF 68; là định nghĩa ở Murphy | — |
| SL04 | Mệnh đề 10.33 | thiếu giả thiết (đã sửa) | đúng | Mệnh đề 10.33, L1789 ("$f_Z$ cho bởi (8.4)") | — | phải nêu $f_Z(z)=\int f_{X,Z}(x,z)\,dx\in(0,\infty)$ |
| SL05–SL07 | Mệnh đề 10.34 | đúng | đúng | Mệnh đề 10.34 | (2.20), (2.23), PDF 69; (2.53), PDF 75 | căn cứ SL07 thêm $p_A(a')>0$ |

Kết luận của tác tử: deck chặt chẽ hơn Murphy ở mọi kết quả; không có `chặn bàn giao`, `nghiêm trọng`. Quyết định điều phối viên: chấp nhận tất cả.

| Mức độ | Trang chiếu | Vấn đề | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| trung bình | SL04 | trường hợp mật độ chỉ ghi $0<f_Z(z)<\infty$ | nêu $f_Z(z)=\int f_{X,Z}(x,z)\,dx\in(0,\infty)$ | chấp nhận | đã sửa trên mặt trang (59 âm tiết) |
| nhẹ | BY08 | căn cứ đẳng thức thứ hai thiếu giả thiết | "quy tắc nhân, dùng $\mathbb P(B_k)>0$" | chấp nhận | đã sửa (38 âm tiết) |
| nhẹ | SL07 | bước hậu nghiệm thiếu giả thiết | thêm "dùng $p_A(a')>0$" | chấp nhận | đã sửa (46 âm tiết) |
| nhẹ | KV05 | "Mệnh đề." không nêu giả thiết | "Với $X$ như trên, $\alpha,\beta\in\mathbb R$:" ($\mathbb E[X^2]<\infty$ ở định nghĩa ngay trên) | chấp nhận | đã sửa (59 âm tiết) |
| nhẹ | KV07, KV08 | tuyến tính tổng quát thừa nhận chưa nêu; KV08 chưa dẫn Mệnh đề 10.26 | ghi chú KV07; "(Mệnh đề 10.26)" sau "Ý nghĩa:" nếu vừa trần | chấp nhận | KV07: đã sửa ghi chú; KV08: dòng "Ý nghĩa:" đã 20 âm tiết, nên dẫn ở ghi chú (đoạn đầu và dòng nguồn) |
| nhẹ | KV07, KV08, KV11 | dẫn nguồn Murphy chưa đủ mục, công thức | KV11 §2.2.5.4, (2.41)–(2.44); KV07 §2.8.4, (2.165)–(2.167); KV08 §3.1.3; (2.28) | chấp nhận | đã sửa |
| nhẹ (tùy chọn) | KV03 | căn cứ gom nhóm | "hợp lệ vì $\sum_x\lvert g(x)\rvert p_X(x)<\infty$" nếu vừa trần | chấp nhận | không thêm: dòng căn cứ sẽ vượt 20 âm tiết; điều kiện đã ở ghi chú diễn giả KV03 |

Kiểm tra: `deck_check.py` (không ảnh chụp, `scratchpad/chk10h`): 77 trang, 0 lỗi console, KaTeX, tràn; MD02 ngoại lệ; mọi trang trong trần mật độ (KV11 60, KV05 59, SL04 59). `git diff --check`: sạch.

#### Rà lại (proof-audit, cùng tác tử)

| Mục | Kết quả rà lại | Quyết định | Trạng thái |
|---|---|---|---|
| SL04, BY08, SL07, KV05 (mặt trang); ghi chú KV07, KV08, KV11 | đã sửa đúng | chấp nhận | đóng |
| KV11: kết luận $\psi$ hữu hạn và $\psi(S)$ khả tích; KV02, KV03: điều kiện khả tích; SL03: sửa $f_X$ trên tập độ dài $0$ | để ở ghi chú diễn giả | chấp nhận | giữ ở ghi chú |
| nhẹ (mới), KV08: dẫn nguồn Murphy thiếu mục của (2.28) | "Murphy (2022), §3.1.3; §2.2.5.1, (2.28)" | chấp nhận | đã sửa |

Kết luận rà lại: ĐẠT.

### Kiểm định cuối

Tác tử final-lec10 (general-purpose, opus, high). Quyết định điều phối viên cho tác tử chỉnh sửa đợt 1 và đợt 2: chấp nhận sau ba vòng rà lại đều đạt; điều phối viên đã kiểm diff CSS (mọi luật phạm vi Bài 10), diff viewer/index, sync --check, git diff --check và ảnh BY04, SL12, PP08, TK01 (390).

| # | Hạng mục | Kết quả lượt đầu | Trạng thái |
|---|---|---|---|
| 1 | Kỹ thuật deck (console, KaTeX, tài nguyên, mật độ) | đạt | đạt |
| 2 | Hiển thị 1600×900 và 390×844 | đạt | đạt |
| 3 | SVG (chữ, alt, `role="img"`, màu không là tín hiệu duy nhất) | đạt | đạt |
| 4 | CSS phạm vi Bài 10, hồi quy deck khác | đạt (99 selector có `data-lecture="10"`; Bài 00, 05, 06, 07 không đổi) | đạt |
| 5 | Planning khớp deck | đạt (mục nhẹ bên dưới) | đạt |
| 6 | Học liệu và viewer | chưa đạt: `materials/lec-10/lecture-note.md` L2041 liên kết tới bài tập thiếu `&deck=` | đã sửa: thêm `&deck=lecture-10-xac-suat-bieu-dien-bat-dinh.html` (như lec-07 L3103); sync và `--check` OK; Playwright mở ghi chú, nhấp liên kết, mở `exercises.md` có `deck`, 0 `.katex-error` |
| 7 | `index.html`, `DECKLESS_LECTURES`, phiên bản tài nguyên | đạt | đạt |
| 8 | Nhật ký và quyết định trong `review-log.md` | đạt (mục trung bình bên dưới) | đạt |
| 9 | Git (`git diff --check`, phạm vi tệp) | đạt | đạt |

| Mức độ | Vị trí | Vấn đề | Đề xuất sửa | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| nghiêm trọng | `lecture-note.md` L2041 | liên kết bài tập thiếu `&deck=` | thêm tham số `deck` | chấp nhận | đã sửa |
| trung bình | `review-log.md` | thiếu tự kiểm `no-ai-slop` của hai đợt chỉnh sửa | ghi mẫu đã soát, chỗ đã sửa | chấp nhận | đã sửa (mục "Chỉnh sửa") |
| trung bình | `review-log.md` | thiếu quyết định điều phối viên cho author-lec10, 77 trang, khối CSS, editor-lec10; còn các ô và mục để trống chờ quyết định | ghi quyết định; điền các ô còn trống | chấp nhận | đã sửa |
| nhẹ | `storyboard.md` | số âm tiết TK01b cũ (53); tên hình BY04; mục TK01b, TK04 không khớp deck | 39 âm tiết; `supplier-tree-deck.svg`; viết lại hai mục | chấp nhận | đã sửa |
| nhẹ | `outline.md` | tên hình BY04 | `supplier-tree-deck.svg` | chấp nhận | đã sửa |
| nhẹ | ghi chú PP00 | trên 100 âm tiết | rút gọn | chấp nhận | đã sửa (79 âm tiết, không tính dòng nguồn) |
| nhẹ | MH10, 390 px | dòng ngắt trước ";$\mathbb P(Y=1)$" | đưa dấu câu vào KaTeX hoặc tách câu | chấp nhận | đã sửa: "tổng bằng $1.$ Suy ra …" |
| nhẹ | MH10, SL12, MH07 | nút điều hướng chạm mép nội dung | giữ | chấp nhận giữ: không che chữ, chỉ là thẩm mỹ | ghi nhận, không sửa |
| nhẹ | `lecture-note.md`, `exercises.md` | cảnh báo KaTeX về chữ tiếng Việt trong `\text{}` | giữ | chấp nhận giữ: có từ trước, ngoài phạm vi deck | ghi nhận, không sửa |

## Định dạng ghi phát hiện và quyết định

Phát hiện ghi theo bảng `mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa`, mức độ `chặn bàn giao`, `nghiêm trọng`, `trung bình`, `nhẹ`. Mỗi phát hiện có quyết định của điều phối viên `chấp nhận | yêu cầu sửa | bác bỏ` kèm lý do; phát hiện đã xử lý không bị xóa khỏi nhật ký.

| Mức độ | Trang chiếu | Vấn đề | Bằng chứng | Đề xuất sửa | Quyết định | Lý do |
|---|---|---|---|---|---|---|

## Xác nhận cuối của điều phối viên (2026-11-05, sau commit 7304805)

Stop hook của mục tiêu nêu bốn điểm; điều phối viên xử lý như sau.

| Điểm | Xử lý | Bằng chứng |
|---|---|---|
| Trang "Nội dung" (MD02) có 7 dòng | Giữ: ngoại lệ có chủ đích đã ghi trong storyboard (trang liệt kê đủ bảy mạch, AGENTS.md cho phép vượt trần khi có ngoại lệ ghi lý do; tiền lệ trang "Nội dung" P02b của Bài 07 cũng 7 dòng). | deck_check: MD02 44 âm tiết, 7 dòng; lecture-07 P02b 7 dòng |
| 77 trang so với đích 70 ± 6 | Không phải quy định học phần: đích nội bộ của điều phối viên (Q-H). Một trang vượt do tách bảng tổng kết (TK01, TK01b); quyết định "chấp nhận" đã ghi ở mục Soạn HTML. | mục "Soạn HTML", quyết định điều phối |
| Cờ OVERFLOW ở PP08 | Báo nhầm của công cụ: `deck_check.py` so phần tử với khung `section` (cao theo nội dung khi `center:false`) thay vì khung trang. Đã sửa công cụ (`tools/courses/math-4-AI/2627-1/scripts/deck_check.py`, so với hộp `.reveal .slides`). Chạy lại trên bản commit 7304805: 77 trang, console 0, pageerror 0, request hỏng 0, 0 OVERFLOW, 0 KATEX, 0 NARROW-H, 0 FONT; cờ duy nhất MD02 LINES (ngoại lệ). Bài 07 chạy cùng công cụ: không có OVERFLOW (các cờ còn lại có từ trước). | scratchpad m-final-lecture-10…, m-final-lecture-07… |
| Rà tập trung trên trạng thái cuối | Tác tử rv-storyline (general-purpose, opus, high, tiếp tục qua SendMessage) chạy rà tập trung bảy mạch trên bản commit 7304805 (trùng byte với cây làm việc): cả bảy mạch **đạt**; N1–N9 đã sửa; không có phát hiện `chặn bàn giao`, `nghiêm trọng`, `trung bình`. Một mục nhẹ: outline.md L191 (MH09) — đã sửa trong lượt này. Quyết định điều phối viên: **chấp nhận**. | báo cáo rv-storyline lần ba |

Bảng rà tập trung lần ba (tóm tắt): mạch 1 đạt (MD04 "Đầu ra:" đủ ba đại lượng); mạch 2 đạt (câu hỏi ở MH00, MH01; MH07 không trộn ví dụ); mạch 3 đạt (BY04 gọi tên thiếu hồ sơ; BY10 trả lời 198/437); mạch 4 đạt (PP10 → PP12 → PP11 → PP13 không dùng kết quả trước khi phát biểu); mạch 5 đạt (KV07 → KV08 khép bằng tổng số lỗi; đầu ra 0,0698 vào SL12); mạch 6 đạt (đóng góp riêng: hậu nghiệm nguồn hàng 236/437, khớp Bayes ở SL09; SL12 quyết định); mạch 7 đạt (TK01 năm hàng, TK01b sáu hàng, không lộ đáp số).

Trạng thái bàn giao: mọi phát hiện `chặn bàn giao` và `nghiêm trọng` đã sửa và được rà lại; bảy mạch đạt rà tập trung trên bản cuối; outline, storyboard và review-log khớp deck; kiểm tra trình duyệt 1600×900 và 390×844 đạt; học liệu đồng bộ; index.html liên kết Bài 10. Điều phối viên ký duyệt.

## Kiểm định cuối, lượt 2 (2026-11-05, HEAD 194de3b; deck ở 7304805)

Tác tử final-lec10 (general-purpose, opus, high, tiếp tục qua SendMessage), chỉ đọc, chạy lại đủ 9 hạng mục trên HEAD sau khi sửa liên kết lecture-note.md L2041 và sửa `deck_check.py` (so với khung `.reveal .slides`). Kết luận: **ĐẠT để bàn giao**. Quyết định điều phối viên: **chấp nhận**.

| Hạng mục | Kết quả | Bằng chứng chính |
|---|---|---|
| 1. Kỹ thuật | đạt | 84 section (7 + 77), 77 id không trùng; 21 đường dẫn tương đối, tồn tại; config và plugin đúng; không style/dense/raster/http; 77/77 aside.notes; 10/10 SVG hợp lệ |
| 2. deck_check mới --shots | đạt | 77 trang, console 0, pageerror 0, request hỏng 0; 0 OVERFLOW (PP08 = 0), 0 KATEX, 0 NARROW-H, 0 FONT; cờ duy nhất MD02 LINES (ngoại lệ); đã xem 77 ảnh 1600×900 và các trang dày ở 390×844 |
| 3. Trang tiêu đề mạch | đạt | `#/1`…`#/7` đúng ở hai kích thước; khớp "Nội dung" |
| 4. Bàn phím | đạt | Space, →/↓, ↑, ←, Home, End; 77/77 trang |
| 5. Planning | đạt | storyboard, outline: 77 mục, 0 khác biệt; review-log không còn mục mở |
| 6. Index và viewer | đạt | thẻ Bài 10 ba liên kết đúng; liên kết L2041 mở exercises với &deck=; mọi neo và liên kết nội bộ của note và exercises trả 200; viewer Bài 11 mở bằng doc |
| 7. Hồi quy CSS | đạt | 99 selector đều data-lecture="10"; computed style Bài 05, 07 không đổi; deck_check mới cho Bài 05, 07 chỉ có cờ có từ trước |
| 8. Học liệu và git | đạt | sync --check OK (33); git diff --check sạch; HEAD = origin/main (194de3b) |
| 9. Câu hỏi mở đầu | đạt | 198/437; 236/437; ngưỡng 1/6 và quyết định; 2/13 và 1/13 ở TK03 |

Lỗi còn lại: chỉ mức nhẹ, đã ghi "chấp nhận giữ" (nút điều hướng chạm mép ở MH07, MH10, SL12; cảnh báo KaTeX chữ tiếng Việt trong `\text{}` của học liệu; MD02 7 dòng). Điều phối viên ký duyệt bàn giao.

## Rà tập trung lần ba trên trạng thái cuối — báo cáo đầy đủ (rv-storyline, commit 7304805)

Tác tử rv-storyline (general-purpose, opus, high). Bản đối chiếu: `git show 7304805:2627-1/lecture-10-xac-suat-bieu-dien-bat-dinh.html`, trùng từng byte với cây làm việc và HEAD hiện tại (deck không đổi sau 7304805) [đúng tại thời điểm ghi; sau đó commit d13265e sửa 7 dòng bổ sung giả thiết, xem mục "Hoàn tất sau d13265e"]. 77 trang, thứ tự như lượt rà lại thứ hai; 7 section ngoài `mach-1`…`mach-7`, số và tên khớp "Nội dung". Kết luận: **đạt**; không phát hiện `chặn bàn giao`, `nghiêm trọng`, `trung bình`.

| Mạch | Câu hỏi trung tâm | Kết quả | Bằng chứng |
|---|---|---|---|
| 1. Mở đầu | Sản phẩm bị cảnh báo khi thiếu hồ sơ nguồn hàng có xác suất lỗi bao nhiêu, nguồn hàng nào khả dĩ hơn, và nên xử lý thế nào. | đạt | MD03 đặt câu hỏi; MD04 "Đầu ra:" có $\mathbb P(Y=1\mid A=1)$, $\mathbb P(S=b\mid A=1)$ và quyết định. |
| 2. Mô hình xác suất | Gán xác suất cho các kết quả của camera thế nào để mọi phép tính trên biến cố nhất quán. | đạt | Câu hỏi ở dòng dẫn MH00 và "Nhu cầu:" MH01; MH06 "họ mọi tập con $2^\Omega$"; MH07 phát biểu tổng quát, không trộn ví dụ; mọi ví dụ có "Diễn giải:" (MH09: 8% cảnh báo sai, 2% bỏ sót). |
| 3. Xác suất có điều kiện và định lý Bayes | Xác suất sản phẩm lỗi sau một cảnh báo, khi thiếu hồ sơ nguồn hàng, bằng bao nhiêu. | đạt | Câu hỏi ở BY00, BY01; BY04 gọi tên thiếu hồ sơ; BY10 trả lời 198/437 và nêu phân hoạch theo $Y$; dạy lại nội dung 05c thuộc ngoại lệ 1. |
| 4. Biến ngẫu nhiên, phân phối và độc lập | Phân phối của nhãn, nguồn hàng, tín hiệu đo là gì và các biến được ghép theo quy tắc nào. | đạt | Câu hỏi ở PP00, PP01 (cả tín hiệu đo); ghi chú PP00 nêu giới hạn tạo nhu cầu; thứ tự PP10 → PP12 → PP11 → PP13 không dùng kết quả trước khi phát biểu; PP12 "Ý nghĩa:" có điều kiện $\mathbb P(S=s,Y=y)>0$. |
| 5. Kỳ vọng, phương sai và hiệp phương sai | Những con số nào tóm tắt phân phối của chi phí và nhãn lỗi. | đạt | Câu hỏi ở KV00, KV01; KV07 → KV08 khép bằng tổng số lỗi; KV11 nhu cầu thật; KV04 "Diễn giải:" nối 0,0522 của MH10; đầu ra $\mathbb E[\mathbf 1_E]=\mathbb P(E)$ và 0,0698 vào SL12. |
| 6. Phân phối đồng thời và phép lấy biên | Sau cảnh báo, hậu nghiệm của nguồn hàng và của nhãn lỗi theo từng nguồn, trong một mô hình chung của $(S,Y,A)$, bằng bao nhiêu và quyết định là gì. | đạt | Câu hỏi ở SL00, SL01; SL09 tính lại 198/437 "khớp định lý Bayes" (không mâu thuẫn BY10); SL10 gọi tên công cụ, ghi chú nối $0{,}0472=0{,}4\cdot0{,}118$ với PP11; SL12 kết bằng quyết định và bộ phân loại xác suất. |
| 7. Tổng kết và chuyển tiếp | Kết quả nào dùng được dưới giả thiết nào. | đạt | Câu hỏi ở TK00; TK01 năm hàng, TK01b sáu hàng, không "Kết luận:" lộ đáp số; TK02 "vẫn loại khi có cảnh báo"; Bài 11 chỉ nêu bằng lời. |

Kiểm chung: không mạch nào xem trước bài sau trên mặt trang; bảng 8 ô chỉ ở SL09, bảng camera chỉ ở MH09; trùng lặp duy nhất 0,044 ở BY04 và KV13 thuộc ngoại lệ 8. Trạng thái N1–N9 (lượt rà lại thứ hai): cả chín đã sửa (outline TK01/TK01b/TK04; bản đồ MH09/MH07; bảng (a) mạch 5; "phần" thống nhất trong ghi chú; ghi chú MD00 113 → 89 âm tiết; SL10 công cụ và nối PP11; TK02 dữ kiện; câu nối PP00; MH06 $2^\Omega$). Mục nhẹ outline L191 đã sửa ở 194de3b.

Các bảng theo từng trang của rà tập trung lần một và lần hai nằm ở các mục "Năm rà soát độc lập" và "Rà lại sau chỉnh sửa" phía trên.

Về hai ngoại lệ cấu trúc (điều phối viên): (i) MD02 "Nội dung" 7 dòng — AGENTS.md §"Cấu trúc bộ trang chiếu mặc định" yêu cầu trang "Nội dung" đánh số **mọi** mạch, kể cả mạch mở đầu; với 7 mạch (trong khoảng 5–7 được phép) trang tất yếu có 7 dòng, và AGENTS.md §"Mật độ chữ" quy định cơ chế ngoại lệ ghi lý do trong storyboard (đã ghi). (ii) Quy định học phần không đặt trần số trang; 77 trang chỉ vượt đích nội bộ 70 ± 6 của kế hoạch (Q-H) một trang, do tách bảng tổng kết để không thu nhỏ chữ.

## Quyết định điều phối viên sau rà soát các trang chứng minh

Chấp nhận: rà soát độc lập các trang chứng minh (proof-audit) kết luận ĐẠT, deck chặt chẽ hơn Murphy ở mọi kết quả; phát hiện trung bình SL04 và các mục nhẹ đã sửa, rà lại ĐẠT. Điều phối viên đã đọc diff deck (7 dòng: SL04, BY08, SL07, KV05 trên mặt trang; ghi chú KV07, KV08, KV11), xem ảnh SL04 ở 1600×900 và 390×844, chạy deck_check: 77 trang, console 0, pageerror 0, request hỏng 0, 0 OVERFLOW, 0 KATEX, 0 NARROW-H; cờ duy nhất MD02 LINES (ngoại lệ đã ghi). Bàn giao.

## Hoàn tất sau d13265e (2026-11-05)

**Người sửa d13265e.** Bảy dòng của deck (SL04, BY08, SL07, KV05 trên mặt trang; ghi chú KV07, KV08, KV11) do tác tử editor-lec10 (Agent, general-purpose, model opus, effort medium; cùng tác tử của hai đợt chỉnh sửa, tiếp tục qua SendMessage) áp dụng theo rà soát proof-audit. Chuỗi kiểm cho sửa trang: editor → rà lại toán (proof-audit: đạt) → rà lại mạch (dưới) → kiểm trình duyệt (dưới) → nhật ký.

**Rà lại mạch.** rv-storyline (general-purpose, opus, high), phạm vi các trang đổi ±2 và ranh giới mạch: **đạt**. Cả bảy trang đổi nằm giữa mạch; vai và vào–ra không đổi (BY08: chuẩn hóa của mạch 3, vào BY05–BY07, ra BY09–BY10; KV05: dao động của mạch 5; SL04: chuẩn hóa của mạch 6, nối SL03 rõ hơn; SL07: dùng giả thiết của SL05; ghi chú KV07, KV08, KV11 chỉ đổi phạm vi/nguồn). Hai điểm nhẹ (lặp ý giữa giả thiết và dòng chứng minh ở SL04; câu phạm vi tuyến tính ở ghi chú KV07 trùng ghi chú KV02): **bác bỏ**, lý do: cả hai nêu giả thiết hoặc phạm vi toán học, không sai, giữ để mỗi trang tự đủ.

**Kiểm định cuối, lượt 3** (final-lec10, general-purpose, opus, high), trên HEAD d13265e: **ĐẠT** cả 9 hạng mục. deck_check --shots: 77 trang, console 0, pageerror 0, request hỏng 0, 0 OVERFLOW/KATEX/NARROW-H/FONT, cờ duy nhất MD02 LINES (ngoại lệ); đã xem 77 ảnh 1600×900 và ảnh màn hẹp các trang đổi; trang đổi kết thúc trước đáy khung (SL04 843/882 px, KV05 845/882); bàn phím 77/77; storyboard và outline 77 mục khớp; "Đáp án" đếm 0 trong deck, lecture-note.md, exercises.md của Bài 10; viewer và liên kết L2041 đạt; hồi quy CSS Bài 05, 07 SAME; sync --check OK; HEAD = origin/main. Mục trung bình duy nhất (nhật ký chưa ghi người sửa d13265e và rà lại mạch) đã xử lý trong mục này.

**Xác nhận của người dùng (2026-11-05, câu hỏi trực tiếp trong phiên).**
- Thư mục đích: "2626-1/index.html" trong yêu cầu là `2627-1/index.html` (người dùng chọn "Đúng, 2627-1").
- Ngoại lệ: trang "Nội dung" 7 dòng (bảy mạch) và tổng 77 trang (đích nội bộ 70 ± 6; quy định học phần không có trần số trang): người dùng chọn "Chấp nhận".

Điều phối viên ký duyệt bàn giao Bài 10.

## Rà tập trung lượt cuối riêng, đủ bảy mạch (rv-storyline, HEAD d9d29bf, deck ở d13265e)

Tác tử rv-storyline (general-purpose, opus, high). Đọc lại toàn bộ mặt trang và ghi chú của 77 trang (deck HEAD trùng byte bản d13265e). Kiểm cấp bài đạt: 7 section `mach-1`…`mach-7`, `hashOneBasedIndex:true`, số/tên khớp MD02; dòng dẫn ≤25 âm tiết; ghi chú trang tiêu đề mạch ≤100 âm tiết (MD00 89, MH00 77, BY00 87, PP00 80, KV00 81, SL00 79, TK00 65); câu hỏi mở đầu trả lời trên mặt trang (198/437 BY10, SL09; 236/437 SL10, TK03; 1/6 SL12, TK01b, TK03); 9 trang "Ví dụ:" đều kết bằng "Diễn giải:". **Kết luận: cả bảy mạch đạt; toàn bài đạt.**

### Mạch 1 · Mở đầu — đạt
Câu hỏi: Một sản phẩm bị cảnh báo khi thiếu hồ sơ nguồn hàng có xác suất lỗi bao nhiêu, nguồn hàng nào khả dĩ hơn, và nên xử lý thế nào.

| trang | chức năng thực tế | phần việc | đầu vào | đầu ra | đề xuất |
|---|---|---|---|---|---|
| MD00 | bìa; ghi chú nêu luận đề Bayes để cập nhật, lấy biên để loại biến chưa quan sát | khung bài | Bài 05c (ghi chú) | hai công cụ | giữ |
| MD01 | sáu mục tiêu | đo lường | MD00 | mục tiêu 1–6 | giữ |
| MD02 | danh sách 7 mạch | bản đồ bài | MD01 | số, tên khớp `#/N` | giữ (ngoại lệ 7 dòng, người dùng chấp nhận) |
| MD03 | bài toán bằng số, "Câu hỏi:" | câu hỏi trung tâm | — | tham số 0,6/0,4; 0,02/0,08; 0,9; 0,05 | giữ |
| MD04 | ký hiệu, giả thiết, ba đầu ra, vai camera | khung chung | MD03 | $S,Y,A$; $\mathbb P(Y=1\mid A=1)$, $\mathbb P(S=b\mid A=1)$, quyết định | giữ |

### Mạch 2 · Mô hình xác suất — đạt
Câu hỏi: Gán xác suất cho các kết quả của camera thế nào để mọi phép tính trên biến cố nhất quán.

| trang | chức năng thực tế | phần việc | đầu vào | đầu ra | đề xuất |
|---|---|---|---|---|---|
| MH00 | tiêu đề mạch, dòng dẫn nêu câu hỏi | nhu cầu | MD03–MD04 | nhiệm vụ | giữ |
| MH01 | "Nhu cầu:", bốn kết quả | kết quả | MH00 | danh sách | giữ |
| MH02 | "Trực quan." phát biểu là tập ô | biến cố | MH01 | $H$, $C$, cảnh báo sai, bỏ sót | giữ |
| MH03 | định nghĩa thí nghiệm, không gian mẫu, biến cố | biến cố | MH02 | $\Omega$, $E$ | giữ |
| MH04 | "Trực quan." tỉ lệ khung hình; định nghĩa không gian xác suất | tiên đề | MH03 | (P1)–(P3) | giữ |
| MH05 | bổ đề, bảng phát biểu–chứng minh | quy tắc tính | MH04 | cộng tính hữu hạn, đơn điệu | giữ |
| MH06 | mệnh đề mô hình hữu hạn | dựng mô hình | MH05 | bảng trọng số | giữ |
| MH09 | ví dụ bảng camera | trả lời câu hỏi cho camera | MH06 | 0,28; 8% cảnh báo sai, 2% bỏ sót | giữ |
| MH07 | nhu cầu, trực quan (0,46 so với 0,28), mệnh đề phần bù và hợp | quy tắc tính | MH09 | hai công thức | giữ |
| MH08 | chứng minh | quy tắc tính | MH05, MH07 | — | giữ |
| MH10 | bài tập bảng sản phẩm, "Lời giải:" | đối tượng thứ hai | MH07 | 0,044; 0,0874; 0,0522 | giữ |

### Mạch 3 · Xác suất có điều kiện và định lý Bayes — đạt
Câu hỏi: Xác suất sản phẩm lỗi sau một cảnh báo, khi thiếu hồ sơ nguồn hàng, bằng bao nhiêu.

| trang | chức năng thực tế | phần việc | đầu vào | đầu ra | đề xuất |
|---|---|---|---|---|---|
| BY00 | tiêu đề mạch | nhu cầu, phân rã | MH10 | nhiệm vụ | giữ |
| BY01 | "Nhu cầu:", "Trực quan." chuẩn hóa | chuẩn hóa | 0,18; 0,26 | phép chia trong cột $C$ | giữ |
| BY02 | định nghĩa xác suất có điều kiện | công cụ | BY01 | $\mathbb P(\cdot\mid F)$ | giữ |
| BY03 | ví dụ, "Câu hỏi:" trước, lời giải fragment | hai chiều điều kiện | BY02 | 9/13 khác 0,90 | giữ |
| BY04 | cây nguồn hàng; thiếu hồ sơ | tiên nghiệm | MH10 | 0,044 | giữ |
| BY05 | quy tắc nhân, quy tắc chuỗi | phép nhân | BY04 | tích dọc đường | giữ |
| BY06 | toàn phần, Bayes | kết quả trung tâm | BY05 | công thức | giữ |
| BY07 | chứng minh toàn phần | mẫu số | BY06 | — | giữ |
| BY08 | chứng minh Bayes ($\mathbb P(E)>0$, $\mathbb P(B_k)>0$) | chuẩn hóa | BY06, BY07 | — | giữ |
| BY09 | định nghĩa tiên nghiệm, hợp lý, hậu nghiệm; ∝ | phân rã | BY06 | thuật ngữ | giữ |
| BY10 | ví dụ, phân hoạch theo $Y$ | trả lời câu hỏi mạch | BY04, BY09 | 198/437 | giữ |
| BY11 | bài tập camera tuyến vắng | đảo điều kiện | BY03, BY06 | 1/3 | giữ |

### Mạch 4 · Biến ngẫu nhiên, phân phối và độc lập — đạt
Câu hỏi: Phân phối của nhãn, nguồn hàng, tín hiệu đo là gì và các biến được ghép theo quy tắc nào.

| trang | chức năng thực tế | phần việc | đầu vào | đầu ra | đề xuất |
|---|---|---|---|---|---|
| PP00 | tiêu đề mạch; ghi chú nêu giới hạn của mạch 3 | nhu cầu | BY10 | nhiệm vụ | giữ |
| PP01 | "Nhu cầu:" (gồm giá trị đo); $S,Y,A$ là hàm | biến | PP00 | ba hàm | giữ |
| PP02 | định nghĩa biến, phân phối, chỉ thị, phân loại, vector | phân phối | PP01 | $\mathbf 1_E$ | giữ |
| PP03 | hàm khối; nhu cầu, trực quan, định nghĩa CDF | phân phối của nhãn | PP02 | $p_X$, $F_X$ | giữ |
| PP04 | ví dụ ba mức | nhãn có thứ tự | PP03 | $F_X$ bậc thang | giữ |
| PP05 | nhu cầu tín hiệu đo, trực quan, định nghĩa mật độ | tín hiệu đo | PP03 | $f_X$ | giữ |
| PP06 | bài tập mật độ đều | tín hiệu đo | PP05 | 0,4 | giữ |
| PP07 | nhu cầu; Bernoulli, phân loại | phân phối nhãn | PP03 | $\theta$, $\boldsymbol\pi$ | giữ |
| PP08 | nhu cầu, trực quan; Gaussian một chiều | tín hiệu đo | PP05 | $\mathcal N(\mu,\sigma^2)$ | giữ |
| PP09 | nhu cầu, trực quan, định nghĩa độc lập | quy tắc ghép | BY05 | dạng tích | giữ |
| PP10 | trực quan, độc lập có điều kiện; giả thiết $A\perp S\mid Y$ | quy tắc ghép | PP09 | giả thiết | giữ |
| PP12 | dạng tương đương (Mệnh đề 10.17) | dạng dùng trong phép nhân | PP10 | bỏ điều kiện $S$ | giữ |
| PP11 | ví dụ cảnh báo và nguồn hàng | giới hạn của quy tắc | PP12 | 0,067; 0,118; 0,0874 | giữ |
| PP13 | bài tập độc lập trước và sau quan sát | giới hạn | PP10 | 1/3; 0 | giữ |

### Mạch 5 · Kỳ vọng, phương sai và hiệp phương sai — đạt
Câu hỏi: Những con số nào tóm tắt phân phối của chi phí và nhãn lỗi: kỳ vọng, phương sai, hiệp phương sai, trung bình theo nhóm.

| trang | chức năng thực tế | phần việc | đầu vào | đầu ra | đề xuất |
|---|---|---|---|---|---|
| KV00 | tiêu đề mạch | nhu cầu | PP13 | nhiệm vụ | giữ |
| KV01 | nhu cầu, trực quan, định nghĩa kỳ vọng | kỳ vọng | PP03, PP05 | $\mathbb E$ | giữ |
| KV02 | kỳ vọng của hàm, tuyến tính, chỉ thị | kỳ vọng của hàm | KV01 | $\mathbb E[\mathbf 1_E]=\mathbb P(E)$ | giữ |
| KV03 | chứng minh kỳ vọng của hàm | — | KV02 | — | giữ |
| KV03b | chứng minh tuyến tính | — | KV03 | — | giữ |
| KV04 | ví dụ chi phí | chi phí | KV02, MH10 | 0,0698 | giữ |
| KV05 | nhu cầu, trực quan, định nghĩa, mệnh đề phương sai | dao động | KV01, KV02 | Var; 0 và 1 | giữ |
| KV06 | chứng minh | dao động | KV05 | — | giữ |
| KV07 | nhu cầu tổng số lỗi; Cov; Var(X+Z) | tổng số lỗi | KV05 | Cov | giữ |
| KV08 | không tương quan; độc lập ⇒ không tương quan | tổng số lỗi | PP09, KV07 | Cov = 0 | giữ |
| KV09 | chứng minh | — | KV08 | — | giữ |
| KV10 | phản ví dụ | giới hạn tóm tắt | KV08 | không tương quan nhưng phụ thuộc | giữ |
| KV11 | nhu cầu trung bình nhóm; kỳ vọng toàn phần | trung bình theo nhóm | BY04, KV01 | định lý | giữ |
| KV12 | chứng minh | trung bình theo nhóm | KV11 | — | giữ |
| KV13 | bài tập $\mathbb E[Y]$, Var(Y) | trung bình nhóm, dao động | KV11, KV05 | 0,044; 0,042064 | giữ |

### Mạch 6 · Phân phối đồng thời và phép lấy biên — đạt
Câu hỏi: Sau cảnh báo, hậu nghiệm của nguồn hàng và của nhãn lỗi theo từng nguồn, trong một mô hình chung của $(S,Y,A)$, bằng bao nhiêu và quyết định là gì.

| trang | chức năng thực tế | phần việc | đầu vào | đầu ra | đề xuất |
|---|---|---|---|---|---|
| SL00 | tiêu đề mạch | nhu cầu, phân rã | KV13, PP12, BY10 | nhiệm vụ | giữ |
| SL01 | nhu cầu hai đại lượng mới; chuỗi sinh dữ liệu | phân phối đồng thời | PP10, BY10 | mô hình bộ ba | giữ |
| SL02 | định nghĩa đồng thời, biên | phân phối đồng thời | SL01 | $p_{X,Z}$, $f_{X,Z}$ | giữ |
| SL03 | mệnh đề lấy biên; nối cây nguồn hàng | lấy biên | SL02, BY04 | quy tắc tổng | giữ |
| SL04 | có điều kiện từ đồng thời ($f_Z$ tích phân biên) | chuẩn hóa | SL03, BY02 | $p_{X\mid Z}$, $f_{X\mid Z}$ | giữ |
| SL05 | phân tích nhân tử, hậu nghiệm | toàn bộ phân rã | PP12, SL03–SL04 | $q(s,y)$, công thức | giữ |
| SL06 | chứng minh nhân tử | phân phối đồng thời | BY05, PP12 | — | giữ |
| SL07 | chứng minh lấy biên, chuẩn hóa ($p_A(a')>0$) | lấy biên → chuẩn hóa | SL03–SL05 | — | giữ |
| SL08 | thuật toán | phương pháp | SL05 | các bước | giữ |
| SL09 | ví dụ bảng 8 ô | hậu nghiệm lỗi khi thiếu hồ sơ | SL08 | 198/437, khớp Bayes | giữ |
| SL10 | hậu nghiệm nguồn hàng | nhu cầu riêng của mạch | SL09 | 236/437; 18/67; 36/59 | giữ |
| SL11 | bài tập $A=0$ | kiểm thuật toán | SL09 | 22/4563 | giữ |
| SL12 | quyết định theo hậu nghiệm và chi phí; bộ phân loại xác suất | chi phí | SL09, SL11, KV04 | ngưỡng 1/6 | giữ |

### Mạch 7 · Tổng kết và chuyển tiếp — đạt
Câu hỏi: Kết quả nào dùng được dưới giả thiết nào.

| trang | chức năng thực tế | phần việc | đầu vào | đầu ra | đề xuất |
|---|---|---|---|---|---|
| TK00 | tiêu đề mạch | nhu cầu | SL12 | nhiệm vụ | giữ |
| TK01 | bảng 5 hàng (phần bù và hợp; nhân; toàn phần và Bayes; lấy biên; nhân tử) | kết quả và giả thiết | mạch 2, 3, 6 | bảng | giữ |
| TK01b | bảng 6 hàng (mật độ; tuyến tính; phương sai; không tương quan; kỳ vọng toàn phần; quyết định) | kết quả và giả thiết | mạch 4–6 | bảng | giữ |
| TK02 | đề tổng hợp, câu (c) trọng tâm | tiên nghiệm đổi | toàn bài | — | giữ |
| TK03 | lời giải 198/437, 236/437, 2/13, 1/13 | quyết định có điều kiện | TK02 | trả lời câu hỏi mở đầu | giữ |
| TK04 | câu hỏi tự kiểm tra | giả thiết | toàn bài | — | giữ |
| TK05 | tài liệu đọc; nhu cầu chọn tham số từ dữ liệu | giới hạn | toàn bài | nhu cầu Bài 11 bằng lời | giữ |

Phát hiện: không `chặn bàn giao`, `nghiêm trọng`, `trung bình`. Ba mục nhẹ: (1) SL04 lặp ý giữa giả thiết và dòng chứng minh; (2) ghi chú KV07 trùng ý ghi chú KV02 — cả hai **bác bỏ** (đã quyết ở mục "Hoàn tất sau d13265e"); (3) outline.md L191 — **bác bỏ**: đã sửa ở 194de3b (điều phối viên kiểm L191 hiện ghi "tính trực tiếp từ bốn trọng số; … nhu cầu và trực quan của MH07"). Quyết định điều phối viên: **chấp nhận** báo cáo.

## Điều phối viên tự kiểm trích dẫn Murphy của các trang chứng minh

Kiểm trực tiếp bằng pdftotext trên `murphy2022probabilistic-draft.pdf` (trang PDF = trang in + 30), 12/12 khớp: (2.17), (2.18) PDF 68; (2.20), (2.23) PDF 69, có câu "This is called the product rule. By extending the product rule to D variables, we get the chain rule of probability"; (2.27), (2.28) PDF 70; (2.41) PDF 71; (2.42)–(2.43) PDF 72 (chứng minh kỳ vọng toàn phần cho biến rời rạc); (2.51), (2.53) PDF 75; (2.167) PDF 100 ($\mathbb V[x_1+x_2]=\mathbb V[x_1]+\mathbb V[x_2]+2\operatorname{Cov}[x_1,x_2]$); "Uncorrelated does not imply independent" PDF 109. Khớp với bảng 14 kết quả của proof-audit.
