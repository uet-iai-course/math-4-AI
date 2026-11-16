# Kiểm lại sau biên tập, Bài 13, lượt 1 (chỉ đọc)

- Deck sau biên tập: `2627-1/lecture-13-quyet-dinh-tuan-tu-bat-dinh.html` (60 trang). Bản trước biên tập (57 trang): `scratchpad/master/frozen/lecture-13-quyet-dinh-tuan-tu-bat-dinh.html`.
- Đối chiếu: `materials/lec-13/lecture-note.md`, `exercises.md`; năm báo cáo `reviews/deck-{sinh-vien,toan-hoc,chuyen-gia,su-pham,mach-truyen}.md`; D1–D11 cuối `review-log.md`; `storyboard.md` mục "Biên tập sau năm báo cáo duyệt".
- So sánh: diff từng trang (mặt trang và ghi chú diễn giả tách riêng, ánh xạ ID cũ → mới theo bảng của storyboard), script `scratchpad/lec-13/recheck/scripts/slidediff.py`; kết quả `scratchpad/lec-13/recheck/face-diff.txt`.
- Phạm vi: toàn deck (mục tiêu học tập và "Vấn đề trung tâm" ở Tổng kết đã đổi). Văn bản mới hoặc đã sửa: `no-ai-slop` chế độ Detect và mục "The author's voice".

## 1. Kiểm tra máy (NT28)

| Công cụ | Kết quả |
|---|---|
| `deck_lint.py` | 2 phát hiện: L13-1-03 `SYLL60 110 > 80`, L13-7-04 `SYLL60 68 > 60`. Cả hai có ngoại lệ ghi ở storyboard (D3: trần 110; đề Bài tập 13.13 dưới 1,5 × 60). |
| `footer_check.py` (1600×900) | 0 trang chạm chân trang hoặc đáy khung (chạy trên cả cổng 8765 và cổng tĩnh 8781). |
| `deck_check.py --shots` | slides=60, console=0, pageerrors=0, failed=0, `katexErr`=0 mọi trang, 0 OVERFLOW, `narrowWide`=0 mọi trang. Cờ còn lại: SYLL (L13-1-01 bìa, L13-1-03, L13-7-04), LINES (L13-1-04 "Nội dung", 7 mạch + dòng đọc trước), LINE20 (L13-1-01, L13-1-03, L13-1-05, L13-2-02, L13-4-07, L13-6-01, L13-6-04, L13-7-04). Mọi LINE20 trên trang nội dung có lý do trong storyboard; L13-1-01, L13-1-05 không đổi so với bản đóng băng. |
| Tràn ngang trong hộp công thức (đo `scrollWidth` của `.formula`, `.table-scroll`) | 1600×900: 0 hộp tràn; (6.4) và (6.9) nằm trong khung 1248 px (D2 đạt). 390×844: 31 công thức cuộn ngang có gợi ý cuộn, như mọi deck của học phần; không phải lỗi mới. |

**Lưu ý về lần chạy đầu.** Chạy `deck_check.py` trên cổng 8765 (`reloadserver`) hai lần: lần một hỏng ở trang 34 (`Reveal.getCurrentSlide is not a function`), lần hai báo OVERFLOW từ L13-4-04 tới hết deck. Cả hai do máy chủ tự tải lại trang giữa chừng khi tác tử khác ghi tệp trong repo (deck 12, 14 đang được sửa song song): sau khi tải lại, Reveal đặt `top` của trang trước khi KaTeX và hình xong. Kiểm chứng: thăm dò riêng L13-5-04, L13-7-05, L13-5-01, L13-3-05 sau 1,5 s cho đáy nội dung 814, 852, 788, 793 px < đáy khung 882 px; chạy lại `deck_check.py` trên máy chủ tĩnh `python -m http.server 8781` (đã tắt sau khi chạy) cho 0 OVERFLOW. Báo cáo máy của biên tập viên ("0/0/0, 0, 2 ngoại lệ") được xác nhận.

Ảnh: `scratchpad/lec-13/recheck/shots2/` (60 ảnh 1600×900, 60 ảnh 390×844, 37 ảnh `-end`), ảnh ghép `cs-wide-01…05.png`, `cs-narrow-sel.png`. Đã xem toàn bộ ảnh ghép 1600×900 và ảnh 390×844 của các trang đổi (L13-1-03, L13-3-05, L13-4-03, L13-4-08, L13-5-03, L13-5-04, L13-6-03, L13-6-04, L13-7-03): không chồng chữ, không tràn, chữ thân ≥ 0,9 em.

## 2. Các điểm phải kiểm riêng

**(a) Công thức (6.9).** Ghi chú d.1124–1131: $v_{k+1}=\max\{Q_{V_k}(h,A);\ Q_{V_k}(h,B)\}=\max\{1+0{,}45\,v_k;\ 0{,}6+0{,}9\,v_k\}$. Deck L13-5-03: $v_{k+1}=\max\{1+0{,}45\,v_k;\ 0{,}6+0{,}9\,v_k\}$ (6.9). Phát biểu đúng và đủ: vế bỏ là một đẳng thức trung gian theo định nghĩa, không phải giả thiết hay lượng từ; các điều kiện để rút về một biến ($V_0=0$, $V_k(z)=0$, $v_k=V_k(h)$, $\gamma=0{,}9$, dữ liệu hai hành động) có trên mặt trang; hai nhánh được gọi tên ở tiêu đề cột $Q_{V_k}(h,A)$, $Q_{V_k}(h,B)$ của bảng ngay dưới, ở dòng "Nhánh $A$: $1+0{,}45v$; nhánh $B$: …" của L13-5-04 và ở ghi chú diễn giả. Số hiệu (6.9) gắn đúng vế cuối của ghi chú. Đạt NT2.

**(b) Rút chữ.** Đọc diff mọi trang có mặt trang đổi (L13-1-02, L13-1-03, L13-1-06, L13-2-01…04, L13-3-00…04, L13-3-06, L13-3-08, L13-3-10…12, L13-4-00, L13-4-01, L13-4-03, L13-4-04, L13-4-06, L13-4-07, L13-5-00…08, L13-6-00…07, L13-7-01…07). Không mất giả thiết, lượng từ, hằng số hay loại bảo đảm nào. Các chỗ rút đáng kiểm:
- L13-3-11 bước 4: "mọi nghiệm $V$ thỏa $(I-\gamma P^\pi)V=r^\pi$, nên $V=W$" → "mọi nghiệm của $V=T^\pi V$ bằng $W$": kết luận giữ nguyên, lý do (khả nghịch ở bước 2) ở ghi chú diễn giả.
- L13-6-01: câu "Trạng thái chưa xuất hiện nhận xác suất $0$" chuyển xuống ghi chú diễn giả; kết luận $m=0$ của Hệ quả 13.26 vẫn trên mặt trang; thêm "trên $\Delta(\mathcal S)$".
- L13-3-10: dòng "Khi $\lvert\mathcal S\rvert$ lớn, lặp …" chuyển xuống ghi chú diễn giả, bỏ dẫn Mệnh đề 13.16 (đúng đề xuất toán-học và sinh-viên).
- L13-2-01: bỏ chữ "xác suất" trước $0{,}8$, $0{,}2$, $0{,}35$, $0{,}65$; nghĩa không đổi.
- Ngược lại, nhiều chỗ được khôi phục điều kiện: $\gamma^0=1$, "hội tụ tuyệt đối", "với mỗi $\pi$ Markov dừng", $c\in\mathcal R$, "không dùng phần thưởng", "không có trạng thái kết thúc", "có đúng hai chính sách", $\mathcal A(s)$ hữu hạn ở bảng tổng kết.

**(c) Ba trang mới.**
- L13-3-05 "Tồn tại giá trị và chặn phần đuôi": khớp nguyên văn Mệnh đề 13.8 (d.488–501): giả thiết "MDP của Định nghĩa 13.5; $\rho$ là một chính sách bất kỳ", "trên mọi quỹ đạo, chuỗi (5.4) hội tụ tuyệt đối và với mọi $K\ge0$", ba bất đẳng thức (5.6). Robot: $R_{\max}/(1-\gamma)=1/0{,}1=10$ đúng. Chứng minh một dòng gắn (M2), (O2) đúng chỗ. 53 âm tiết, 6 dòng.
- L13-4-08 "Hội tụ của lặp giá trị": khớp Hệ quả 13.18 (d.1016–1029): một điểm bất động, (6.7) từ mọi $V_0$ với $k\ge0$, "với mỗi $\pi$ Markov dừng". Chứng minh dẫn đúng Định lý 13.17 và Định lý 13.12. Ghi chú diễn giả có loại bảo đảm (tất định, cấp số nhân hệ số $\gamma$) và câu nối "còn phải chứng minh $\bar V=V^*$" (d.1039); mặt trang L13-5-01 có câu hỏi tương ứng. 51 âm tiết.
- L13-6-04 "Mục tiêu Bellman từ mẫu": Định nghĩa 13.28 với "bảng giá trị hành động (action value)", (7.5), (7.6), $\alpha_t\in(0,1]$ đúng d.1457–1470. "Ý nghĩa:" giữ đủ hai điều kiện của d.1480 ("$Q_t$ xác định bởi lịch sử trước chuyển tiếp", "(5.1) đúng") và công thức kỳ vọng đúng. "Lưu ý:" đúng nghĩa Nhận xét 13.29 mục 3 (xem phát hiện N3). Ghi chú diễn giả nói rõ mục đọc thêm §7.4, phân biệt $Q_t$ với $Q_U$, nối $q_*$. 56 âm tiết.

**(d) SVG mới.** Tính lại mọi tọa độ của `value-iteration-slide.svg` (viewBox 1000×420) và `value-iteration-slide-narrow.svg` (600×900): nhánh $A$ qua $(0;1)$, $(7;4{,}15)$; nhánh $B$ qua $(0;0{,}6)$ tới $y=7$; giao điểm $(8/9;\,1{,}4)$; điểm bất động $(6;6)$; dãy $v_0..v_4=0;1;1{,}5;1{,}95;2{,}355$, $v_5=2{,}7195$, $v_{30}=6-5\cdot0{,}9^{29}\approx5{,}7645$, đường ngang $6$: mọi điểm khớp Ví dụ 13.6 và Hình 13.2. Không có công thức trong hình (chỉ nhãn "nhánh A/B", "đường chéo", số $8/9$, $6$, ký hiệu trục $v$, $v_k$, $k$). Điểm do $A$ là tam giác đỏ, do $B$ là tròn xanh: màu không là tín hiệu duy nhất. Có `role="img"`, `<title>`, `<desc>`, `alt` cụ thể trên cả hai `<img>`. Cỡ chữ hiển thị đo trong trình duyệt: màn rộng, SVG rộng 857 px (ảnh 1423×360, `contain`) → chữ 24 × 0,857 ≈ 20,6 px; màn hẹp, SVG rộng 340 px → chữ 30 × 0,567 ≈ 17 px. Đạt ≥ 16 px. Lớp `only-wide`/`only-narrow` hoạt động (đo `display:none` đúng bản ở mỗi cỡ). Nhỏ, không ghi phát hiện: đường nhánh $B$ ở bản rộng kéo tới $x=456$, vượt khung trục ($x=450$) 6 đơn vị.

**(e) Kiểm tra máy:** mục 1.

## 3. Đối chiếu các phát hiện đã chấp nhận

### sinh-vien (1 nghiêm trọng, 3 trung bình, 13 nhẹ)

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| L13-5-04 SVG chữ nhỏ, công thức trong hình (nghiêm trọng, D1) | đã sửa | Mục 2(d). |
| L13-4-03 (6.4) tràn 1248 px (D2) | đã sửa | `aligned` hai dòng; `scrollWidth` không vượt ở 1600×900. |
| L13-5-03 (6.9) tràn (D2) | đã sửa | Mục 2(a). |
| L13-6-03 $Q_t$ không tên (D4) | đã sửa | L13-6-04: "bảng *giá trị hành động* (action value) $Q_t$"; ghi chú diễn giả phân biệt $Q_U$. |
| L13-1-06, L13-2-01 chữ SVG < 16 px ở 390 px | sửa chưa đủ | Xem N6. |
| L13-5-05, L13-7-06 "(6.7) chứa $V^*$" | đã sửa | "(6.7) chứa $\bar V=V^*$" ở cả hai trang. |
| L13-3-01 $c$ chưa gọi tên | đã sửa | "$p(s',c\mid s,a)\ge0$, $c\in\mathcal R$". |
| L13-3-08 (nay 3-09) nguồn $\gamma^K\lVert U\rVert_\infty$ | đã sửa | Ghi chú diễn giả có $\lvert\mathbb E_\rho[\gamma^KU(S_K)]\rvert\le\gamma^K\lVert U\rVert_\infty$. |
| L13-3-10 (nay 3-11) bước 3 nén | đã sửa (một phần) | "dấu bằng trong (5.11), $\rho=\pi$, $U=W$"; lý do $\rho_t=\pi(\cdot\mid s_\tau)$ ở ghi chú diễn giả. Chấp nhận được. |
| L13-5-02 $\rho=\pi^*$ | đã sửa | "Với $\rho=\pi^*$ (đạt cực đại, O1)". |
| L13-4-04 vị trí và nội dung "Nhắc lại:" | đã sửa | Dòng đứng trước bước 2, nêu $f(a)\le\max_bg(b)+\delta$; xem N1 về $\delta$. |
| L13-4-06 tính đầy đủ của $\mathbb R$ | đã sửa | L13-1-02: "mọi dãy Cauchy số thực hội tụ". |
| L13-3-09 (nay 3-10) phép lặp chưa có lý do | đã sửa | Chuyển xuống ghi chú diễn giả. |
| L13-6-04 (nay 6-05) $Q^+$ | đã sửa | Đề (b) có "phần tử mới $Q^+(s,a)$". |
| L13-6-05 (nay 6-06) $1/1024$ | đã sửa | "xác suất $(1/2)^{10}=1/1024$". |
| L13-6-06 (nay 6-07) câu khó đọc | đã sửa | "hàm giá trị theo $X_t$ chỉ gán một số". |
| L13-3-04 mật độ, tách trang | đã sửa | Tách L13-3-04 (50) / L13-3-05 (53). |

### toan-hoc (1 trung bình, 14 nhẹ)

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| L13-5-01 nhãn đọc thêm Nhận xét 13.20 (D11) | đã sửa | "Nhận xét 13.20, mục 1: …; mục 2 (đọc thêm) …". |
| L13-2-02 "có tính Markov" | đã sửa | "Dãy có tính Markov là *xích Markov thuần nhất* (time-homogeneous Markov chain)". |
| L13-2-04 ghi chú "nói chung" | đã sửa | "Ở xích này …; nói chung các trạng thái trên một quỹ đạo không độc lập cùng phân phối". |
| L13-3-00 dòng dẫn | đã sửa | "Nếu hành động chỉ phụ thuộc trạng thái hiện tại, …" (25 âm tiết). |
| L13-3-04 $\gamma^0=1$ | đã sửa | Trong Định nghĩa 13.7. |
| L13-3-05 (nay 3-06) "từ thời điểm $1$" | đã sửa | "$R_k=R_{\max}=7$ với mọi $k\ge2$". |
| L13-3-09 dẫn Mệnh đề 13.16 sớm | đã sửa | Câu đã bỏ. |
| L13-4-07 lượng từ $\pi$ | đã sửa | L13-4-08: "với mỗi $\pi$ Markov dừng". |
| L13-5-02 $\rho=\pi^*$ | đã sửa | Như trên. |
| L13-6-01 $\Delta(\mathcal S)$ | đã sửa | "MLE duy nhất trên $\Delta(\mathcal S)$". |
| L13-6-02 "không dùng phần thưởng" | đã sửa | Gạch đầu dòng thứ hai. |
| L13-6-06 (nay 6-07) "một hành động" | đã sửa | Dòng dữ kiện đầu. |
| Dẫn sai mục Nhận xét 13.29 | đã sửa | L13-6-07: "(Tình huống 13.2)"; L13-7-06: "(Nhận xét 13.29, mục 1; §6.4)". |
| L13-7-01 ghi chú "trong MDP" | đã sửa | Hàng đầu cho xích Markov, hàng điểm bất động (nay ở L13-7-02) cho ánh xạ co trên $\mathbb R^d$. |
| L13-7-04 đề rút gọn (D6) | đã sửa | "không có trạng thái kết thúc", "có đúng hai chính sách tất định dừng". |

### chuyen-gia (4 trung bình, 6 nhẹ)

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| L13-6-03 $Q_t$, kỳ vọng $Y_t$, Q-learning (D4) | đã sửa | Tách L13-6-03/L13-6-04; mục 2(c). |
| L13-3-00, L13-3-01 mở rộng Định lý 13.12 | đã sửa | Dòng dẫn mới; "một cách chọn hành động". |
| L13-4-01 thu hẹp sớm về chính sách dừng | đã sửa | "chưa kể chính sách theo lịch sử". |
| L13-6-01 cố định/ngẫu nhiên | đã sửa | "$P(\cdot\mid h,A)$ cố định, chưa biết"; "$\hat P$ phụ thuộc dữ liệu nên ngẫu nhiên". |
| L13-4-04 nhãn (O2) sai bước | đã sửa | Bước 1 không còn (O2); dòng cuối "Co cần $\gamma<1$ (O2)". |
| L13-6-05 $1/1024$ | đã sửa | Như trên. |
| Ứng dụng Hệ quả 13.18, $\gamma=0{,}99$ | đã sửa | L13-5-06; $0{,}99^{230}\approx0{,}099$ khớp d.1041. Xem N4 về câu. |
| L13-7-02 thiếu (O1) | đã sửa | "$\mathcal A(s)$ hữu hạn". |
| L13-7-03 "chính sách Markov dừng" | không còn áp dụng | Dòng bị thay theo D5; ghi chú diễn giả dùng đúng "chính sách Markov dừng". |
| $q_*$ ở ghi chú diễn giả L13-5-01 | đã sửa | Câu "$q_*(s,a)=Q_{V^*}(s,a)$ …". |

### su-pham (7 trung bình, 28 nhẹ)

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| L13-1-03 mục tiêu (D3) | đã sửa | Sáu mục đủ động từ, đúng nghĩa ghi chú d.30–35; 110 âm tiết theo D3. Xem N5. |
| L13-3-07 "phần dư" | đã sửa | "số hạng cuối $\gamma^KU(S_K)$". |
| L13-3-01…03 thiếu robot (D10) | đã sửa | Robot trên mặt trang cả ba trang; số khớp Ví dụ 13.1, 13.4. |
| L13-4-03 trực quan | đã sửa | "Kỳ vọng và cực đại không khuếch đại sai số; chỉ $\gamma$ làm sai số co lại." |
| L13-5-01 câu hỏi, trực quan | đã sửa | "$\bar V$ có bằng $V^*$ không; dừng sớm thì chính sách mất bao nhiêu?" |
| L13-6-03 $Q_t$ | đã sửa | Như trên. |
| Dữ kiện thành danh sách (L13-3-12, L13-5-03, L13-6-07) | đã sửa | Ba trang dùng `ul`. |
| L13-1-06 chữ hoa, "luôn chọn" | đã sửa | |
| L13-2-01 "Diễn giải:" | đã sửa | "$0{,}71>0{,}8^2$: robot có thể nghỉ một bước rồi hoạt động lại." |
| L13-2-02 tên tiếng Anh | đã sửa | "time-homogeneous Markov chain". |
| L13-2-03 vị trí số hiệu | đã sửa | Cuối dòng "Chứng minh.". |
| L13-2-04 tách gạch đầu dòng | đã sửa | |
| L13-3-03 "phụ thuộc được" | đã sửa | |
| L13-3-04 trực quan, Giả thiết của Mệnh đề 13.8, "sai số" | đã sửa | L13-3-04, L13-3-05. |
| L13-4-01 hệ quả của số chính sách | đã sửa | "Liệt kê không khả thi: …". |
| L13-4-04 "Nhắc lại:" vòng vo | đã sửa | Xem N1. |
| L13-4-06 ghi chú "bước duy nhất" | đã sửa | "bước 1 (tính duy nhất) và bước 3 (dãy Cauchy)". |
| L13-4-07 "Dùng khi …", tên kỹ thuật | đã sửa | Tên tiếng Anh và tên gọi khác; "Dùng khi ẩn số ở cả hai vế và vế phải là ánh xạ co theo ẩn đó." |
| Tên kết quả L13-5-01/02, bảng tổng kết | đã sửa | Một tên "Phương trình Bellman tối ưu và chính sách tham lam tối ưu"; hàng bảng đủ danh từ. |
| L13-5-01 ghi chú đọc thêm | đã sửa | |
| L13-5-07 lời giải ghi đại lượng | đã sửa | |
| L13-5-08 thứ tự, chủ ngữ | đã sửa | "Diễn giải:" ngay sau danh sách; "chính sách luôn chọn $B$ không tới $z$". |
| L13-5-06 thuật ngữ quy hoạch | đã sửa | "*Quy hoạch* (planning): $P$, $r$ đã biết." |
| L13-6-01 chủ ngữ | đã sửa | |
| L13-6-03 tên đầy đủ model-free | đã sửa | |
| L13-6-05 (nay 6-06) số không nghĩa, chủ ngữ | đã sửa | |
| L13-6-06 (nay 6-07) phủ định, "ấy", Bernoulli | đã sửa | |
| L13-7-03 trả lời cả bài | đã sửa | Xem D5 và N2. |
| L13-7-04 "Giải thích …" trong (b) | đã sửa | |
| L13-7-05 điều kiện $\gamma=0{,}9$ | đã sửa | |
| L13-7-06 chủ ngữ xa | đã sửa | |
| "Gợi ý của ghi chú:" (D11) | đã sửa | `grep` không còn. |
| Câu lặp giữa ghi chú diễn giả liền kề (D11) | sửa chưa đủ | Xem N7. |
| Câu điều hướng ở ghi chú L13-3-01, L13-7-00, L13-7-01 | đã sửa | |
| Dòng dẫn mạch 4, 6 | đã sửa | Hai dòng dẫn mới, không lặp khuôn "A; B." liền nhau. |

### mach-truyen (1 trung bình, 8 nhẹ)

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| P1 L13-7-03 trả lời cả bài (D5) | đã sửa | Chuỗi liệt kê → $V^*=TV^*$ → lặp giá trị → tham lam; 59 âm tiết, 6 dòng. Xem N2 về câu chữ. |
| P2 từ khóa mạch 5, phân rã câu hỏi | đã sửa | L13-5-00 có "Hệ số chiết khấu bằng một"; storyboard d.32 có "điều gì hỏng khi $\gamma=1$". Xem N9. |
| P3 L13-4-07 tiêu đề | đã sửa | Tách "Nguyên lý ánh xạ co" / "Hội tụ của lặp giá trị". |
| P4 L13-3-07 (nay 3-08) câu nối | đã sửa | "So $V^\rho$ với $U$ rút về một bất đẳng thức một bước tại từng lịch sử." |
| P5 L13-6-01 câu hỏi mạch 6 | đã sửa | "**Câu hỏi:** … số đếm thay được đến đâu?" |
| P6 L13-6-03 câu nối | đã sửa | "Từ cùng dữ liệu $(s,a,c,s')$ có hai cách học." |
| P7 L13-2-01 lý do bỏ hành động | đã sửa | "Chưa có hành động: …". |
| P8 Bài tập 13.14 (D7) | đã sửa | Hàng mạch 3; ghi chú diễn giả: "13.14 chỉ cần (5.4) và định nghĩa chính sách tối ưu". |
| P9 L13-4-06 bước hỏng | đã sửa | "Với $\kappa=1$, bước 1 và 3 hỏng: …". |

D8 (L13-5-05 "Nhắc lại: chèn một đại lượng trung gian; ở đây chèn $TV$ rồi chuyển vế"): đã sửa, đúng câu chữ quyết định. D9 ("(trên lớp)" cho 13.1, 13.4, 13.2, 13.13, 13.3): đã sửa, khớp các trang có lời giải trên mặt trang.

## 4. Mạch truyện toàn deck

- Mở đầu: bìa, "Tiên quyết và quy ước", "Nội dung", "Vấn đề trung tâm" không đổi trừ L13-1-02 (thêm dãy Cauchy) và L13-1-03 (mục tiêu). Liên kết `#/1`…`#/7` vẫn khớp bảy mạch.
- Mạch 3: L13-3-04 (định nghĩa) → L13-3-05 (Mệnh đề 13.8) → L13-3-06 (Bài tập 13.4 dùng (5.6) ở dòng kiểm tra): thứ tự đúng §5.2; ghi chú L13-3-05 "như trang trước" trỏ đúng L13-3-04.
- Mạch 4: L13-4-07 (kỹ thuật, dẫn Mệnh đề 13.16) → L13-4-08 (Hệ quả 13.18) → L13-5-00 (ghi chú: "Mạch 4 cho một vector $\bar V$ duy nhất … và một thuật toán tìm nó") → L13-5-01 (câu hỏi "$\bar V$ có bằng $V^*$ không"): câu nối có trên mặt trang.
- Mạch 6: L13-6-02 (số đếm, thăm dò) → L13-6-03 (hai cách, câu nối) → L13-6-04 (mục tiêu từ mẫu) → L13-6-05 (Bài tập 13.3 dùng (7.5), (7.6)): mỗi ký hiệu có trước khi dùng.
- Tổng kết: bảng tổng kết hai trang, "Vấn đề trung tâm" trả lời cả bài theo chuỗi §10 của ghi chú, dòng điều kiện giữ; bài tập tổng hợp, câu hỏi tự kiểm tra, bài tập về nhà, tài liệu tham khảo không đổi về chức năng.
- Thời lượng theo storyboard: $8+12+26+20{,}5+21{,}5+18{,}5+13{,}5=120$ phút; 60 trang bằng trần NT27.

## 5. Phát hiện còn mở

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| nhẹ | L13-4-04 | N1. NT9: $\delta$ xuất hiện trên mặt trang mà chưa được định nghĩa; Bổ đề 13.15 ở L13-4-03 không có $\delta$. | "**Nhắc lại:** so với phần tử bất kỳ rồi lấy cận dưới đúng; $f(a)\le\max_bg(b)+\delta$ với mọi $a$, rồi lấy cực đại." Định nghĩa $\delta=\max_a\lvert f(a)-g(a)\rvert$ chỉ có trong ghi chú diễn giả. | "…; với $\delta=\max_a\lvert f(a)-g(a)\rvert$, $f(a)\le\max_bg(b)+\delta$ với mọi $a$, rồi lấy cực đại." (trang 56 âm tiết, còn chỗ). |
| nhẹ | L13-7-03 | N2. NT18, NT20; Detect (colon reveal, câu cụt): dòng đầu mất ý "không khả thi" mà L13-4-01 và ghi chú d.1632 nêu, và thiếu danh từ "chính sách" sau "chưa kể"; dòng robot viết tắt "luôn $A$". | "Liệt kê: $\prod_s\lvert\mathcal A(s)\rvert$ chính sách tất định dừng, chưa kể theo lịch sử."; "Robot: chọn $B$, $V^*(h)=6$ (luôn $A$: $20/11$)." | "Liệt kê không khả thi: $\prod_s\lvert\mathcal A(s)\rvert$ chính sách tất định dừng, chưa kể chính sách theo lịch sử."; "Robot: chọn $B$, $V^*(h)=6$; luôn chọn $A$ chỉ được $20/11$." (+4 âm tiết, 63: nếu vượt trần thì bỏ "(cực đại hóa $Q_{V^*}(s,a)$)" ở dòng 3, hàm ý đã có ở L13-4-01). |
| nhẹ | L13-6-04 | N3. NT20 ("Content: cut … softeners", thay bằng điều kiện): "thêm giả thiết" không nói giả thiết nào; ghi chú d.1501 nêu cụ thể, ghi chú diễn giả chỉ dẫn Murphy. | "**Lưu ý:** Q-learning dạng bảng chỉ hội tụ khi thêm giả thiết (Nhận xét 13.29)." Ghi chú d.1501: "mọi cặp được thăm vô hạn lần và bước học giảm dần thích hợp". | Mặt trang giữ nguyên nếu chạm trần; thêm vào ghi chú diễn giả: "Nhận xét 13.29, mục 3: cần mọi cặp được thăm vô hạn lần và bước học giảm dần thích hợp (Murphy (2023), §35.2.5)." |
| nhẹ | L13-5-06 | N4. Detect (padding: hai ý độc lập nối bằng dấu chấm phẩy; cụm "Mỗi vòng, bảng chuyển dày:" khó đọc). | "Mỗi vòng, bảng chuyển dày: bậc $\lvert\mathcal S\rvert^2\max_s\lvert\mathcal A(s)\rvert$ phép toán; $\gamma=0{,}99$ cần khoảng $230$ vòng để giảm sai số $10$ lần." | "Với bảng chuyển dày, mỗi vòng cần bậc $\lvert\mathcal S\rvert^2\max_s\lvert\mathcal A(s)\rvert$ phép toán; với $\gamma=0{,}99$, giảm sai số $10$ lần cần khoảng $230$ vòng." hoặc tách hai câu trong cùng dòng. |
| nhẹ | L13-1-03 | N5. NT2, NT21: mục tiêu 3 gọi "phương trình tối ưu", ghi chú d.31 gọi "phương trình Bellman tối ưu" (tên dùng ở L13-5-01). | "Suy ra phương trình Bellman cho chính sách cố định và phương trình tối ưu." | "… và phương trình Bellman tối ưu." (+1 âm tiết, 111 < 120 = 1,5 × 80; cập nhật ngoại lệ ở storyboard). |
| nhẹ | L13-1-06, L13-2-01 | N6. NT25 (sinh-vien, sửa chưa đủ): ở 390×844 phần lớn nhãn hình vẫn dưới 16 px. | Đo trong trình duyệt: `robot-mdp-slide.svg` rộng 336 px trên viewBox 900, chữ 34 → 12,7 px (46 → 17 px); `two-step-paths.svg` rộng 336 px trên viewBox 680, chữ 30 → 14,8 px (34–36 → 16,8–17,8 px). Ở 1600×900 đạt (≥ 19,8 px). Dữ liệu hai hình có trên mặt trang. | Như cách làm của `value-iteration-slide-narrow.svg`: một bản hẹp với viewBox nhỏ hơn hoặc chữ ≥ 43 (robot) và ≥ 33 (cây hai bước); hoặc ghi ngoại lệ ở storyboard vì dữ liệu đã có trên mặt trang. |
| nhẹ | L13-4-03/L13-4-04, L13-4-05/L13-4-07, L13-6-03/L13-6-06 (ghi chú diễn giả) | N7. NT22, D11 (su-pham, sửa chưa đủ): câu lặp giữa ghi chú diễn giả của các trang gần nhau. | Chứng minh Bổ đề 13.15 ("$f(a)\le g(a)+\delta\le\max_bg(b)+\delta$ … đổi vai $f$, $g$") ở ghi chú L13-4-03 và L13-4-04, và còn trên mặt trang L13-4-04; "trường hợp hữu hạn chiều của định lý điểm bất động Banach" ở ghi chú L13-4-05, L13-4-07 và mặt trang L13-4-07; "Chính sách thu thập quyết định cặp nào có dữ liệu (Nhận xét 13.29)" ở ghi chú L13-6-03 và L13-6-06. | Giữ chứng minh Bổ đề 13.15 ở L13-4-04, bỏ ở L13-4-03; bỏ câu Banach ở ghi chú L13-4-07 (mặt trang đã có); bỏ câu thu thập ở một trong hai trang. |
| nhẹ | L13-3-05 (ghi chú diễn giả) | N8. NT1: "để mô phỏng" thêm mục đích không có ở ghi chú. | "Ứng dụng: cắt một quỹ đạo vô hạn sau $K$ bước để mô phỏng, …". Ghi chú d.525: "Trong học máy, chặn phần đuôi cho biết khi cắt một quỹ đạo sau $K$ bước, sai số không vượt …". | "Trong học máy: khi cắt một quỹ đạo sau $K$ bước, sai số của tổng thưởng không vượt $\gamma^KR_{\max}/(1-\gamma)$." |
| nhẹ | storyboard d.32 | N9. Đồng bộ planning: bảng mạch còn bốn từ khóa và 22 phút cho mạch 5, trong khi deck có năm từ khóa và mục "Biên tập sau năm báo cáo duyệt" ghi 21,5 phút. Mục biên tập thắng các mục trước, nhưng bảng mạch là chỗ người kiểm cuối tra. | Storyboard d.32: "Giá trị tối ưu · Phương trình Bellman tối ưu · Phần dư Bellman · Tiêu chuẩn dừng | 22". L13-5-00: thêm "Hệ số chiết khấu bằng một". | Cập nhật cột từ khóa và thời lượng ở d.32 (điều phối viên hoặc biên tập viên). |

Tổng: 0 chặn bàn giao, 0 nghiêm trọng, 0 trung bình, 9 nhẹ.

## 6. Kết luận

**đạt.** Mọi phát hiện nghiêm trọng và trung bình của năm báo cáo đã sửa đúng; trong các bảng mục 3, một phát hiện không còn áp dụng (chuyen-gia, L13-7-03), một sửa một phần nhưng chấp nhận được (sinh-vien, L13-3-11), hai sửa chưa đủ (N6, N7, đều nhẹ), còn lại đã sửa. Toán trên nội dung đổi đúng và khớp ghi chú (Mệnh đề 13.8, Hệ quả 13.18, Định nghĩa 13.28, (6.9), các số $10$, $0{,}99^{230}$, mọi tọa độ SVG). Không có giả thiết hay lượng từ nào bị mất khi rút chữ. Kiểm tra máy sạch trên máy chủ tĩnh. Chín phát hiện nhẹ nên sửa trong một lượt biên tập ngắn; N1, N2, N5 chạm mặt trang và cần kiểm lại mật độ sau khi sửa.

## Đề xuất sửa ghi chú

Không có đề xuất mới ngoài các đề xuất đã ghi ở `review-log.md`.
