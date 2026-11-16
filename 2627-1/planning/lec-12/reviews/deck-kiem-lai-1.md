# Kiểm lại sau biên tập, Bài 12, lượt 1 (2026-11-16)

Vai: người kiểm lại (chỉ đọc). Đầu vào: deck `2627-1/lecture-12-hoc-may-rui-ro-thong-ke-tong-quat-hoa.html` (60 trang) so với bản đóng băng trước biên tập (`scratchpad/master/frozen/`), năm báo cáo `reviews/deck-*.md`, quyết định F1–F11 (`review-log.md`), storyboard mục "Biên tập sau năm báo cáo duyệt", ghi chú và `exercises.md` Bài 12. So sánh: trích chữ từng trang của hai bản rồi `diff` theo `data-slide-id` (mặt trang và ghi chú diễn giả riêng). Văn bản mới hoặc đã sửa đọc theo `no-ai-slop` chế độ Detect và mục "The author's voice".

## 1. Kiểm tra máy (NT28)

Máy chủ tĩnh tạm `python -m http.server 8776` tại gốc REPO, đã tắt sau khi chạy.

| Công cụ | Kết quả |
|---|---|
| `deck_lint.py` | 1 phát hiện: L12-1-03 SYLL60 110 > 80 (ngoại lệ F9, có trong storyboard) |
| `footer_check.py` (1600×900) | 0 trang chạm chân trang |
| `deck_check.py --shots` | slides=60, console=0, pageerrors=0, failed=0, katexErr=0 mọi trang. OVERFLOW/NARROW-H chỉ ở L12-5-03, L12-5-05 (đuôi SVG của `\sqrt`, báo động giả đã biết; ảnh 1600 và 390 không thấy tràn). SYLL L12-7-01 do so khớp "Tổng kết" phân biệt hoa thường (`deck_lint` dùng trần 80, trang 63). Mọi LINE20 nằm trong bảng ngoại lệ của storyboard |
| Đo riêng ở 390×844 (Playwright, mọi trang, `Reveal.slide(h,v,99)`) | không `.formula`, `.katex-display`, `.table-scroll` nào có `scrollWidth > clientWidth`; không công thức nội dòng nào vượt mép phải. F3 đạt |

Đã xem ảnh ghép 1600×900 (60 trang) và 390×844 (gồm ảnh `-end`): công thức không bị che, bảng L12-2-01, L12-4-06, L12-5-09, L12-7-01, L12-7-01b, L12-7-06 hiện dạng `stack-table` ở 390 px, hình L12-4-06 có nhãn trục "0,5", "0,25", "0". Ảnh: `scratchpad/lec-12/recheck/shots/`, ảnh ghép `scratchpad/lec-12/recheck/cs-*.png`.

## 2. Các điểm điều phối viên giao kiểm riêng

**(a) Tên mạch 6, PAC, VC.** VC có tên đầy đủ trước lần dùng đầu: bìa `h3` "số chiều Vapnik–Chervonenkis (VC)". PAC: lần đầu trên mặt trang là L12-1-04 "Học gần đúng với xác suất cao (PAC) và số chiều VC"; tên tiếng Anh đầy đủ ở L12-6-01. **Không đạt** NT11: tiêu đề mạch L12-6-00 vẫn là "6.Học PAC và số chiều VC", khác mục 6 của "Nội dung" (phát hiện K1). Các mạch 2, 3, 4, 5, 7 có tên trùng mục tương ứng; liên kết `#/1`…`#/7` khớp vị trí mạch.

**(b) Định lý 12.19 trên L12-6-04.** Đủ giả thiết và kết luận như ghi chú (dòng 1175–1186): "Giả thiết: $\mathcal X=\mathbb R$, hai lớp (8.3). Kết luận: $d_{\mathrm{VC}}(\mathcal H_\uparrow)=1$, $d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})=2$ (8.4)." Trang ý tưởng chứng minh L12-6-06 vẫn khớp bốn bước của chứng minh ghi chú (phá vỡ $\{x_0\}$; thiếu $10$; $c=\frac{x_1+x_2}2$ cho bốn vector; ba dạng theo dấu $w$ loại $101$). Ý nghĩa và ví dụ $\lceil0{,}5\sin(\theta x)\rceil$ đã vào ghi chú diễn giả L12-6-04 đúng như ghi chú §8.2. Trang 57 âm tiết, 6 dòng. Đạt.

**(c) L12-3-11 dời chỗ.** Thứ tự mới 3-06 → 3-11 → 3-07: bài tập cụm Gaussian liền sau cụm Gaussian. Mọi thứ L12-3-11 dùng đã có trước: hạng (L12-3-05), (E1) và "học thêm $\sigma^2$ khi khớp hoàn hảo thì hợp lý không bị chặn" (L12-3-04). Dòng đầu L12-3-07 vẫn là câu nối Gaussian → Bernoulli. Câu so sánh với hợp lý logistic nay ở ghi chú diễn giả L12-3-10 và dẫn ngược về Bài tập 12.1 câu 4, đúng chiều. Storyboard §7 cụm A, cột "Kiểm tra" ghi "L12-3-06 …, L12-3-11", khớp thứ tự mới. Đạt.

**(d) Bảng tổng kết (F1).** Đạt đủ các chốt:
- Định lý 12.13: "(G1)–(G3); lớp hữu hạn, $M$ hàm"; công thức (7.4).
- Hệ quả 12.15: "như trên; (E2)"; "xác suất $\ge1-\delta$: $R(\hat h_S)-R_{\mathcal H}^*\le2\varepsilon_n+\eta$".
- Mệnh đề 12.16: "(G2)"; "mọi $S$: …" (tất định).
- Mệnh đề 12.3: "vector khớp: không cần hạng; (4.5): hạng cột đầy đủ".
- Mệnh đề 12.11: "$X$ đều trên $[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$; mẫu có điểm âm và không âm".
- Cột thứ ba ghi công thức, không chỉ số hiệu; loại bảo đảm nằm ở cột công thức, không ở cột giả thiết.
- Hai trang 63 và 52 âm tiết (trần 80); deck 60 trang (trần 60).

**(e) Rút chữ.** So từng dòng mặt trang trước và sau. Không mất hằng số hay loại bảo đảm. Mất lượng từ hoặc giả thiết ở hai chỗ: L12-3-02, Định nghĩa 12.1 (K2), và L12-4-02, Định nghĩa 12.10 (K3). Mất tên tiếng Anh "population risk" trên mặt trang L12-4-01 (K4). Các chỗ rút khác giữ nghĩa: L12-1-02 (Hoeffding, Mệnh đề 05.3), L12-2-02, L12-4-01, L12-5-01, L12-5-03, L12-5-06, L12-6-01, L12-6-02. Tính lại các số trên trang đã đổi:
- L12-5-05: $\log4000\approx8{,}294$, $1658{,}8$, $200e^{-8{,}295}\approx0{,}04995$, $\sqrt{8{,}294/2000}\approx0{,}0644$.
- L12-6-02: $2\cdot8{,}294/0{,}0025\approx6635{,}2$.
- L12-3-11: $y_i=1+2x_i$; $-\log L(\hat w,\sigma^2)=\frac32\log(2\pi\sigma^2)$.
- L12-3-12: $\hat L_2(w)=\frac12[\log(1+e^{-2w})+\log(1+e^{-w})]\le\frac12(e^{-2w}+e^{-w})\le e^{-w}$ khi $w\ge0$.
- L12-5-07: $2\varepsilon_n\le\varepsilon\iff n\ge2\log(2M/\delta)/\varepsilon^2$.
- L12-7-02: $R\le0+0{,}15$.

Tất cả đúng.

**(f) Ký hiệu mới.** $Q(\theta)=\sum_i(y_i-m_\theta(x_i))^2$ có trong ghi chú: chứng minh Mệnh đề 12.2, Bước 4, dòng 241, cùng $c_1$, $c_2$. Không xung đột; $Q$ được định nghĩa trên L12-3-03 trước khi dùng ở L12-3-04 và L12-7-01. $m_i=m_\theta(x_i)$ không có trong ghi chú. Nghĩa của nó khớp $m_\theta$ (xác suất nhãn 1 tại $x_i$), nên không đổi nghĩa ký hiệu nào. $m_i$ được định nghĩa trên mặt trang L12-3-08 ("với $m_i=m_\theta(x_i)$") trước khi dùng ở L12-3-09. Hai chỗ có thể gây nhầm: Bài 05c dùng $m_i$ cho cận dưới trong Hoeffding (ghi chú dòng 48 đã đổi sang $l_i$), và Bài tập 12.9 trong `exercises.md` viết $\mu_i$ cho cùng đại lượng trong mô hình logistic. Mặt trang deck 12 không có hai cách dùng đó, nên mức nhẹ (K8).

## 3. Phát hiện được chấp nhận và trạng thái sửa

Mặc định "đã sửa" khi chữ trên trang sau biên tập đúng đề xuất hoặc tương đương. Chỉ ghi bằng chứng cho mục chưa đủ hoặc đáng ghi.

### deck-toan-hoc (1 nghiêm trọng, 4 trung bình, 4 nhẹ)

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| NT L12-7-01 hàng 12.13 thiếu lớp hữu hạn | đã sửa | L12-7-01b "(G1)–(G3); lớp hữu hạn, $M$ hàm" |
| TB L12-7-01 hạng cột đầy đủ | đã sửa | "vector khớp: không cần hạng; (4.5): hạng cột đầy đủ" |
| TB L12-7-01 hàng 12.11 | đã sửa | "$X$ đều trên $[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$; …" |
| TB L12-3-03 "Ý nghĩa:" đảo chiều | đã sửa | "với nhiễu Gaussian phương sai chung, hợp lý cực đại chính là bình phương tối thiểu"; Nhận xét 12.4 ý 3 ở ghi chú diễn giả |
| TB L12-6-01 lượng từ (8.2) | đã sửa | "cùng lượng từ, mọi $P$ trên $\mathcal X\times\{0,1\}$" |
| nhẹ L12-1-02 Mệnh đề 05.3 | đã sửa | "luôn có nghiệm, duy nhất khi và chỉ khi $\operatorname{rank}A=p$" |
| nhẹ L12-5-04 ghi chú $\varepsilon\in(0,1)$ | đã sửa | "với mọi $\varepsilon\in(0,1)$" |
| nhẹ L12-5-07 "chuyển vế" (F7) | đã sửa | "Chèn một đại lượng trung gian; …"; ghi chú diễn giả gọi tên rủi ro thực nghiệm |
| nhẹ L12-4-06 nhãn trục SVG | đã sửa | ảnh 1600 và 390: "0,5", "0,25", "0" |

### deck-chuyen-gia (2 nghiêm trọng, 8 trung bình, 10 nhẹ)

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| NT L12-3-03 | đã sửa | như trên (F2) |
| NT L12-7-01 lớp hữu hạn | đã sửa | như trên (F1) |
| TB L12-7-01 hạng | đã sửa | |
| TB L12-2-02 cố định/ngẫu nhiên | đã sửa | "$P$, $\mathcal H$, $\ell$ cố định, $S$, $\hat h_S$ ngẫu nhiên"; L12-3-02 "Với đầu vào đã quan sát" (xem K2) |
| TB L12-5-03 mất mát không bị chặn (F8) | đã sửa | "Lưu ý: mất mát bình phương và entropy chéo không bị chặn, nằm ngoài (G2)." |
| TB L12-5-01 trực quan | đã sửa | "Lớp càng chứa nhiều cách giải thích dữ liệu …" |
| TB L12-3-01 "mô hình quyết định nghiệm" | đã sửa | "nghiệm tồn tại, duy nhất hay không tùy dữ liệu và việc học phương sai" |
| TB L12-3-04 ghi chú $\sigma^2$ | đã sửa | "nếu $\sigma^2$ phụ thuộc $\theta$ hoặc đổi theo quan sát" |
| TB L12-6-01 lượng từ | đã sửa | |
| TB L12-5-07 Bổ đề 12.14 (F8) | đã sửa | bước 2: "Bổ đề 12.14 (tất định): nếu $\Delta_S\le\varepsilon$ và $\hat h_S$ thỏa (6.5) thì với mọi $h$: …" |
| nhẹ L12-1-01 (G3) | đã sửa | "lớp giả thuyết chọn trước" |
| nhẹ L12-4-01 | đã sửa | "không còn bảo đảm" |
| nhẹ L12-4-02 "khi cực tiểu tồn tại" | đã sửa | nhưng mất "Với $\mathcal H$ chọn trước", xem K3 |
| nhẹ L12-4-04 nhãn mẫu | đã sửa | "mẫu $y_i=\mathbf 1_{\{x_i\ge0\}}$" |
| nhẹ L12-3-10 "bài toán khác" | đã sửa | |
| nhẹ L12-3-11 ghi chú so với logistic | đã sửa | câu chuyển sang ghi chú L12-3-10, nêu "không bị chặn" và "bị chặn bởi $1$" |
| nhẹ L12-6-02 | đã sửa | "xác suất thất bại cho phép"; "Hệ quả 12.15: … đạt (8.2)" |
| nhẹ L12-5-07 Kỹ thuật | đã sửa | |
| nhẹ L12-5-10 ghi chú | đã sửa | "Về mất mát, …" |
| nhẹ L12-6-04 trực quan | đã sửa | "khớp mọi nhãn của $k$ điểm mẫu, kể cả nhãn nhiễu" |

### deck-sinh-vien (5 trung bình, 11 nhẹ)

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| TB L12-2-02 ký hiệu trước định nghĩa | đã sửa | "Ký hiệu: $\mathcal X$ đầu vào, $\mathcal Y$ nhãn, $\mathcal A$ giá trị dự đoán."; $S=((x_i,y_i))_{i=1}^n$; "Phân phối đích $P$" |
| TB L12-6-02 số $6636$ không kèm công thức | đã sửa | "$n\ge2\log(2M/\delta)/\varepsilon^2\approx6635{,}2$" |
| TB công thức, bảng tràn ở 390 px (F3) | đã sửa | đo Playwright: 0 vùng cuộn ngang |
| TB L12-7-01 cột công thức | đã sửa | |
| TB L12-5-07, L12-5-10 Bổ đề 12.14 | đã sửa | phát biểu trên L12-5-07 trước L12-5-10 |
| nhẹ L12-7-02 | đã sửa | "$\hat R_S=0$, nên $R\le0+0{,}15$" |
| nhẹ L12-3-11 | đã sửa | "tại $\hat w$, $-\log L(\hat w,\sigma^2)$ …; theo $(w,\sigma^2)$" |
| nhẹ L12-3-12 | đã sửa | "$\le\tfrac12(e^{-2w}+e^{-w})\le e^{-w}$" |
| nhẹ L12-3-05 thứ tự | đã sửa | "Nhắc lại:" đứng đầu |
| nhẹ L12-3-07 | đã sửa | "Hai quan sát nhãn nhị phân: $(x_1,y_1)=(-1,0)$, …" |
| nhẹ L12-6-04 | đã sửa | |
| nhẹ L12-6-06 | đã sửa | "$101$ không thuộc ba dạng đó" |
| nhẹ L12-1-03 | đã sửa | "phân biệt hệ số duy nhất, giá trị khớp duy nhất"; "hai lớp ngưỡng" (xem K16) |
| nhẹ dấu câu sau KaTeX | đã sửa | dấu câu nằm trong KaTeX ở L12-3-03, L12-4-04, L12-4-05, L12-5-02, L12-5-10, L12-6-03; còn một chỗ mới ở L12-3-11 (K7) |
| nhẹ mật độ chung | sửa một phần (đã ghi ở storyboard) | 14 trang 55–60 âm tiết, không trang nào vượt trần |
| nhẹ L12-7-03 $f$ | đã sửa | ghi chú diễn giả: "$f$ là hàm gán nhãn (labeling function)" |

### deck-su-pham (10 trung bình, 24 nhẹ)

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| S1 PAC, VC trước tên đầy đủ | sửa chưa đủ | bìa, Nội dung đã sửa; tiêu đề mạch L12-6-00 lệch với Nội dung (K1) |
| S2 "học PAC" | đã sửa | "là *học gần đúng với xác suất cao* (probably approximately correct, PAC)" |
| S3 tham số độ chính xác | đã sửa | tiêu đề L12-6-02, L12-1-03 mục 5, `strand-keys` L12-6-00 |
| S4 mục tiêu | đã sửa | F9, 110 âm tiết (ngoại lệ); xem K16 |
| S5 CLO | đã sửa | ghi chú diễn giả L12-1-03 không còn mã |
| S6 L12-5-06 | đã sửa | "Trực quan." riêng; "Rủi ro dư (excess risk)" một dòng riêng |
| S7 L12-5-08 thứ tự | đã sửa | "Trực quan." đứng đầu |
| S8 L12-3-07 | đã sửa | |
| S9 L12-7-01 | đã sửa | |
| S10 ứng dụng mạch 5 | đã sửa | L12-5-05: "Trong học máy, chọn siêu tham số trên lưới $M$ điểm định trước chỉ tốn thêm $\log M$." |
| S11 L12-1-02 tên tiếng Anh | đã sửa | "union bound", "indicator function"; "normal equations" ở ghi chú diễn giả |
| S12 L12-2-02 | sửa chưa đủ | bốn dòng đã cùng khuôn, $P$, $S$ có tên; "independent and identically distributed" chỉ ở ghi chú diễn giả (K6) |
| S13 L12-2-00 | đã sửa | |
| S14 L12-3-00 | đã sửa | |
| S15 L12-7-00 | đã sửa | |
| S16 L12-2-03 | sửa chưa đủ | "trên cùng bốn sản phẩm" đã đúng chỗ; câu vẫn không chủ ngữ "so được" (K12) |
| S17 L12-3-01 | đã sửa | "Ví dụ: hồi quy trên ba số đo"; "bình phương tối thiểu" |
| S18 L12-3-05 | đã sửa | "Nhắc lại:" đầu trang (phần thêm "Trực quan." không làm, trang 52 âm tiết) |
| S19 L12-3-06 | đã sửa | |
| S20 L12-3-10 | đã sửa | |
| S21 L12-4-01 | đã sửa | |
| S22 L12-4-02 | đã sửa | |
| S23 L12-4-04 | đã sửa | |
| S24 L12-5-02 | đã sửa | |
| S25 L12-5-07 | đã sửa | |
| S26 L12-6-01 câu hỏi | đã sửa | có $M$; xem K11 về chữ "vô dụng" |
| S27 L12-6-04 | đã sửa | |
| S28 L12-6-09 | đã sửa | |
| S29 L12-7-04 | đã sửa | |
| S30 "ERM" trong tiêu đề | chưa sửa (chờ tác giả, ghi trong review-log) | |
| S31 ghi chú diễn giả tự nói về bài | đã sửa | L12-1-01, L12-2-02, L12-3-01 |
| S32 L12-5-03 ghi chú lặp | sửa chưa đủ | câu đề xuất đã thêm nhưng câu lặp cũ còn nguyên (K5) |
| S33 L12-3-03 | đã sửa | |
| S34 L12-1-01 "đủ hẹp" | đã sửa | "có số hàm hoặc số chiều VC nhỏ so với cỡ mẫu" |

### deck-mach-truyen (2 trung bình, 10 nhẹ)

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| TB L12-3-09 trùng deck 11 (F10) | đã sửa | phần cũ thành "Nhắc lại: … âm log chia $n$ giữ tập nghiệm (Mệnh đề 11.3)"; công thức hiển thị là tích có điều kiện $>0$ |
| TB (G2) không trên mặt trang | đã sửa | L12-5-03 "Lưu ý:" |
| nhẹ L12-6-01 câu hỏi trước lý do | sửa chưa đủ | lý do $M=\infty$ nay trong câu hỏi; phần (G1) của mạch chưa có trên câu hỏi, cuối L12-5-10 không có câu nối (K11) |
| nhẹ L12-5-01 vế đích | đã sửa | "từ đó chặn rủi ro ERM" (xem K17) |
| nhẹ L12-3-11 thứ tự | đã sửa | |
| nhẹ L12-3-01 đầu vào từ mạch 2 | đã sửa | "Mất mát $\ell$ suy ra từ mô hình đầu ra" |
| nhẹ liên tục với deck 11 | đã sửa | L12-1-02 "cực tiểu rủi ro thực nghiệm"; ghi chú diễn giả L12-3-08 "entropy chéo nhị phân của Bài 11" |
| nhẹ trùng kết luận ba trang | đã sửa | bỏ dòng ở L12-6-08 |
| nhẹ "quá khớp" (F6) | đã sửa | L12-7-03 bỏ cụm; ghi đề xuất tác giả trong review-log |
| nhẹ PAC, VC | sửa chưa đủ | như S1 (K1); dòng dẫn mạch 6 không còn "Số chiều VC" làm chủ ngữ |
| nhẹ tên ví dụ xuyên suốt | đã sửa | mặt trang dùng "bốn sản phẩm"; L12-6-08 giữ tên Tình huống 12.1 |
| nhẹ L12-7-07 "cố định" | đã sửa | |

Quyết định riêng F5, F11: đã làm (không CLO; "(trên lớp)" giữ trong bảng `Mục | Bài tập`).

## 4. Phát hiện mới hoặc còn mở

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| trung bình | L12-6-00 (và L12-7-06) | K1. NT11, F4, điểm kiểm (a): tên mạch 6 trên trang tiêu đề mạch khác mục 6 của "Nội dung". Bảng `Mục \| Bài tập` của L12-7-06 cũng dùng tên cũ. | L12-1-04: "Học gần đúng với xác suất cao (PAC) và số chiều VC"; L12-6-00 `h2`: "6.Học PAC và số chiều VC"; L12-7-06: "6. Học PAC và số chiều VC". Storyboard mục "Biên tập" chỉ đổi L12-1-04. | Đặt `h2` của L12-6-00 và ô "Mục" của L12-7-06 thành "Học gần đúng với xác suất cao (PAC) và số chiều VC" (tiêu đề không tính mật độ), cập nhật storyboard L12-6-00. Hoặc điều phối viên chốt một tên ngắn và dùng chung cho cả ba nơi. |
| trung bình | L12-3-02 | K2. NT2 (lượng từ), lỗi mới do rút chữ: Định nghĩa 12.1 của ghi chú cho phân phối $p_\theta(\cdot\mid x)$ với **mỗi đầu vào $x$**. Mặt trang nay chỉ cho tại các đầu vào đã quan sát $x_i$, nên mô hình không xác định tại đầu vào mới. Các trang sau lại dùng mô hình tại đầu vào mới (L12-3-06 "tại đầu vào mới $x=0$", L12-3-07 $m_w(x)$ với mọi $x$). | Sau: "Định nghĩa. Với đầu vào đã quan sát $x_1,\ldots,x_n$, mỗi $\theta\in\Theta$ cho $p_\theta(\cdot\mid x_i)$; $\theta$ dùng chung." Trước: "Mỗi $\theta\in\Theta$ và đầu vào $x$ cho phân phối $p_\theta(\cdot\mid x)$; $\theta$ dùng chung cho mọi $x$." Ghi chú dòng 173: "với mỗi $\theta\in\Theta$ và mỗi đầu vào $x$, một phân phối $p_\theta(\cdot\mid x)$ …; tham số $\theta$ dùng chung cho mọi đầu vào." | "**Định nghĩa.** Mỗi $\theta\in\Theta$ và mỗi đầu vào $x$ cho $p_\theta(\cdot\mid x)$; $\theta$ dùng chung cho mọi $x$; các đầu vào đã quan sát $x_1,\ldots,x_n$ cố định." Đếm lại mật độ (đang 57). |
| trung bình | L12-4-02 | K3. NT2 (giả thiết bị bỏ khi rút chữ): Định nghĩa 12.10 mất điều kiện lớp cố định trước khi lấy mẫu. (G3) đã nêu chung ở L12-2-02 nên nội dung không sai, nhưng đây là giả thiết mà bài và dòng dẫn Tổng kết ("lớp chọn trước") nhấn mạnh. | Trước: "Định nghĩa. Với $\mathcal H$ chọn trước, tối thiểu hóa rủi ro thực nghiệm …". Sau: "Định nghĩa. Tối thiểu hóa rủi ro thực nghiệm (empirical risk minimization, ERM) chọn, khi cực tiểu tồn tại, (6.4)". Ghi chú dòng 651: "Cho lớp $\mathcal H$ cố định trước khi lấy mẫu." | "**Định nghĩa.** Với $\mathcal H$ chọn trước (G3), tối thiểu hóa rủi ro thực nghiệm … chọn, khi cực tiểu tồn tại, (6.4)" (trang 55 → khoảng 59 âm tiết). |
| nhẹ | L12-4-01 | K4. NT21, "The author's voice" (mọi tên tiếng Anh thông dụng ở lần đầu): biên tập bỏ "population risk" khỏi mặt trang, chuyển vào ghi chú diễn giả. | Trước: "Rủi ro kỳ vọng (expected risk, population risk)". Sau: "Rủi ro kỳ vọng (expected risk) (6.1)". Ghi chú dòng 7: "*rủi ro kỳ vọng* (expected risk; còn gọi là rủi ro tổng thể, population risk)". | Trả lại "(expected risk, population risk)". |
| nhẹ | L12-5-03 (ghi chú diễn giả) | K5. NT22 (không chỉ lặp), S32 sửa chưa đủ: câu mới của S32 đã thêm, nhưng câu cũ cùng ý vẫn còn. Câu "Vì hai mất mát … không bị chặn, (7.4) không áp dụng trực tiếp …" lặp dòng "Lưu ý:" vừa thêm lên mặt trang. | "Trong (7.3), $P$ cố định trước, xác suất lấy theo $S\sim P^n$, và $N_{\mathcal H}$ không phụ thuộc $P$." và "Cỡ mẫu $N_{\mathcal H}$ chọn trước khi biết $P$, nên cùng một $n$ dùng được cho mọi phân phối; …" | Bỏ câu thứ hai của đoạn đầu; rút câu về mất mát không bị chặn thành một vế giải thích lý do (ví dụ: không có cận $[0,1]$ nên Hoeffding không áp dụng). |
| nhẹ | L12-2-02 | K6. NT21, S12 sửa chưa đủ: tên tiếng Anh đầy đủ của i.i.d. chỉ có trong ghi chú diễn giả. Trang đang 60/60 âm tiết. | Mặt trang: "(G1) $S\sim P^n$ độc lập cùng phân phối (i.i.d.)". Ghi chú diễn giả: "i.i.d. viết tắt independent and identically distributed." | Thêm tên tiếng Anh vào mặt trang và bù 4 âm tiết (ví dụ: bỏ "chỉ dùng $S$" ở dòng quy tắc học, vì ý này có ở L12-2-00). Hoặc điều phối viên chấp nhận và ghi ngoại lệ trong storyboard. |
| nhẹ | L12-3-11 | K7. Dấu "." đứng một mình ở dòng riêng tại 390×844 (lỗi giống phát hiện dấu câu của sinh-vien, nay ở trang khác). | Ảnh `narrow-016-L12-3-11.png`: "$\sum_ir_i^2=0$" rồi "." xuống dòng. HTML dòng 197: `$\sum_ir_i^2=0$.` | `$\sum_ir_i^2=0.$` |
| nhẹ | L12-3-08, L12-3-09 | K8. NT2 (ký hiệu theo ghi chú): $m_i$ không có trong ghi chú. Ký hiệu được định nghĩa trước khi dùng và không đổi nghĩa $m_\theta$. Bài 05c dùng $m_i$ cho cận dưới, Bài tập 12.9 dùng $\mu_i$ cho cùng đại lượng. | L12-3-08: "với $m_i=m_\theta(x_i)$"; ghi chú dòng 48: "(Bài 05c viết $m_i$, $M_i$)"; `exercises.md` dòng 227: "$\mu_i=\operatorname{sigm}(z_i)$". | Giữ (đã ghi trong storyboard). Thêm một câu vào ghi chú diễn giả L12-3-08: "$m_i$ là $\mu_i$ của Bài tập 12.9 khi mô hình là logistic." |
| nhẹ | L12-1-01 (ghi chú diễn giả) | K9. NT2: ghi chú diễn giả gọi điều kiện "số hàm hoặc số chiều VC nhỏ" là một trong "ba giả thiết của bài", trong khi ba giả thiết của bài là (G1)–(G3). Mất mát bị chặn (G2) không có ở luận điểm lẫn ghi chú diễn giả, trong khi dòng dẫn Tổng kết nêu nó là điều kiện của mọi cận. | "Luận điểm có ba điều kiện, ứng với ba giả thiết của bài: lớp chọn trước khi xem dữ liệu (G3); số hàm … hoặc số chiều VC … nhỏ so với cỡ mẫu; quan sát mới cùng phân phối …(G1)." L12-7-00: "Các cận của bài cần mẫu i.i.d., mất mát bị chặn và lớp chọn trước." | Ghi chú diễn giả: "Luận điểm có ba điều kiện: lớp chọn trước (G3); số hàm hoặc số chiều VC nhỏ so với cỡ mẫu; quan sát mới cùng phân phối (G1). Các cận còn cần mất mát bị chặn (G2), như mất mát $0$–$1$." |
| nhẹ | L12-7-04 | K10. NT20 (cấu trúc khó theo): một dòng dùng cả $h_S$ lẫn $g$ cho cùng một hàm mà không nói chúng trùng nhau. | "… nên rủi ro dư $\tfrac12$ của $g$ là sai số ước lượng: $\hat R_S(h_S)=0$ nhưng $R(g)=\tfrac12$." | "… : với bốn sản phẩm $h_S=g$, $\hat R_S(g)=0$ nhưng $R(g)=\tfrac12$." |
| nhẹ | L12-6-01 | K11. `no-ai-slop` Detect (từ khẩu ngữ, khẳng định phóng đại), NT18. Phần câu hỏi của mạch về (G1) (bảo đảm mất hiệu lực khi phân phối đổi) vẫn chỉ ở ghi chú diễn giả (mach-truyen, sửa chưa đủ). | "Câu hỏi: $\mathcal H_\uparrow$ vô hạn, $M=\infty$ làm (7.5) vô dụng; đại lượng nào thay $M$?" Ghi chú dòng 1121: "$M=\lvert\mathcal H_\uparrow\rvert$ không dùng được trong (7.5)". | "**Câu hỏi:** $\mathcal H_\uparrow$ vô hạn nên $M$ trong (7.5) không dùng được; đại lượng nào thay $M$, và bảo đảm còn đúng khi phân phối đổi không?" Nếu vượt 60 âm tiết, giữ vế đầu. |
| nhẹ | L12-2-03 | K12. S16 sửa chưa đủ, `no-ai-slop` Detect (câu không chủ ngữ). | "Diễn giải: ba lớp lồng nhau, nên trên cùng bốn sản phẩm so được tác động của độ linh hoạt." | "**Diễn giải:** ba lớp lồng nhau, nên bốn sản phẩm cho phép so tác động của độ linh hoạt." |
| nhẹ | L12-3-09 | K13. "Display formulas" (`../CLAUDE.md`): công thức bị ngắt thành hai dòng, dòng thứ hai chỉ có "$>0.$". Trên ảnh 390 px, vế phải còn chỗ. | `\begin{aligned}L(\theta)&=\prod_{i=1}^n m_i^{y_i}(1-m_i)^{1-y_i}\\&>0.\end{aligned}`; ảnh `narrow-019-L12-3-09.png`, `wide-019`. | Đo bằng Playwright ở 390 px. Nếu một dòng $L(\theta)=\prod_{i=1}^n m_i^{y_i}(1-m_i)^{1-y_i}>0$ vừa 354 px thì bỏ `aligned`; nếu không, giữ. |
| nhẹ | storyboard §7 | K14. Tài liệu planning lỗi thời sau khi gộp trang. Mục "Biên tập" thắng các mục trước, nên mức nhẹ. | Cụm E, cột "Phát biểu": "L12-6-01, L12-6-04, L12-6-05, L12-6-07". Mục 6.6, L12-6-00: "6. Học PAC và số chiều VC". | Cập nhật cột thành "L12-6-01, L12-6-04 (Định lý 12.19), L12-6-07" và tên mạch theo K1. |
| nhẹ | L12-1-03 | K15. F9 ("đúng nghĩa ghi chú"): mục 1 mất chủ thể "hợp lý cực đại"; mục 4 mất đối tượng của cận rủi ro dư. | Mục 1: "nhận ra khi thiếu nghiệm hữu hạn." Mục 4: "suy ra cận rủi ro dư." Ghi chú dòng 36: "nhận ra trường hợp hợp lý cực đại không có nghiệm hữu hạn"; dòng 39: "cận rủi ro dư cho nghiệm tối ưu thực nghiệm gần đúng". | Mục 1: "… nhận ra khi hợp lý cực đại không có nghiệm hữu hạn." Mục 4: "… suy ra cận rủi ro dư của nghiệm ERM gần đúng." Trang ở trần 110, nên bù bằng cách rút chữ chỗ khác. |
| nhẹ | L12-5-01 | K16. `no-ai-slop` Detect: "rủi ro ERM" mơ hồ (ERM là quy tắc, không có rủi ro). | "… có $\lvert R(h)-\hat R_S(h)\rvert\le\varepsilon;$ từ đó chặn rủi ro ERM." | "… từ đó chặn rủi ro của nghiệm ERM." |

Văn bản mới khác (dòng dẫn L12-2-00, L12-3-00, L12-6-00, L12-7-00; "Trực quan." L12-4-01, L12-5-06, L12-5-08, L12-6-04; "Diễn giải:" L12-5-02; ghi chú diễn giả L12-1-01, L12-2-02, L12-3-10, L12-6-01) đạt Detect: không rào đón, không câu về trạng thái văn bản, không điều hướng, không câu hỏi tu từ.

## 5. Đề xuất sửa ghi chú

Không có đề xuất mới. Các đề xuất của năm báo cáo đã ghi trong `review-log.md`.

## 6. Kết luận

Còn mở: 0 chặn bàn giao, 0 nghiêm trọng, 3 trung bình (K1, K2, K3), 13 nhẹ (K4–K16). Phát hiện được chấp nhận của năm báo cáo đã sửa hết, trừ năm mục sửa chưa đủ: S1/PAC-VC, S12, S16, S32, câu hỏi L12-6-01. Các mục này nằm trong K1, K6, K12, K5, K11. S30 chờ tác giả. Kiểm tra máy đạt: lint 1 (ngoại lệ đã ghi), footer 0, console/pageerrors/failed 0, KaTeX 0, không công thức cuộn ngang ở 390 px.

**Kết luận: đạt khi sửa.** Cần sửa K1–K3 trước bàn giao, rồi kiểm lại L12-1-04, L12-3-02, L12-4-02, L12-6-00, L12-7-06 (mật độ, ảnh 390 px).
