# Kiểm lại sau biên tập — deck Bài 14, lượt 1

Vai: người kiểm lại (chỉ đọc), 2026-11-16. Deck sau biên tập `2627-1/lecture-14-hoc-bieu-dien-mo-hinh-sinh.html` (60 trang); bản trước biên tập `scratchpad/master/frozen/lecture-14-hoc-bieu-dien-mo-hinh-sinh.html`; `diff` 648 dòng, lưu tại `scratchpad/lec-14/recheck/deck.diff`. Đối chiếu: năm báo cáo `reviews/deck-*.md`, quyết định E1–E10 cuối `review-log.md`, `storyboard.md` (bảng đếm mật độ, mục "Biên tập theo năm báo cáo duyệt"), `materials/lec-14/lecture-note.md`, `exercises.md`, ghi chú Bài 12 (ký hiệu Mệnh đề 12.2). `no-ai-slop` chế độ Detect trên văn bản mới hoặc đã sửa.

## 1. Kiểm bằng máy (NT28)

Máy chủ tĩnh tạm `http.server 8778 --bind 127.0.0.1` tại gốc REPO; đã tắt sau khi xong (cổng 8778 đóng).

| Công cụ | Kết quả |
|---|---|
| `deck_lint.py` | 19 phát hiện: SYLL60 ×17, LINES6 ×2 (xét từng cái ở mục 4) |
| `footer_check.py` (1600×900) | 0 trang chạm chân trang |
| `deck_check.py --shots` | slides=60, console=0, pageerrors=0, failed=0, `.katex-error`=0. OVERFLOW/NARROW-H chỉ ở L14-3-06, 4-04, 4-05, 7-03, 7-05; cả năm trang đều có `\sqrt` (đuôi √, báo động giả đã biết) |
| Đo riêng bằng Playwright (`scratchpad/lec-14/recheck/scripts/measure.py`) | 390×844 và 1600×900: 0 khối `.formula` có `scrollWidth > clientWidth + 2` trên cả 60 trang. Ở 390 px chỉ `vae-paths-narrow.svg` hiện (340 px rộng), ở 1600 px chỉ `vae-paths-wide.svg` hiện (593 px rộng) |
| Ảnh đã xem | 390×844 kể cả ảnh `-end`: L14-5-05, 5-08, 6-01, 6-05; 1600×900: L14-5-02, 5-08, 6-01, 6-06. Công thức, số hiệu và kết luận thấy đủ ở 390 px; không chữ chồng, không cắt |

Không kiểm điều hướng bàn phím.

## 2. Kiểm riêng theo tin nhắn giao việc

**(a) E1, E2.**
- L14-5-02 (E1): "**Nhắc lại:** $\log t\le t-1$ với $t>0$. **Trực quan.** Suy ra $q\log\frac qp\ge q-p$ tại mỗi điểm, và $\int(q-p)\ge0$." Tính lại: với $t=p/q$ trên $\{q>0\}$, $-\log t\ge1-t$ nhân $q>0$ cho $q\log\frac qp\ge q-p$; tại $p=0<q$ vế trái $=+\infty$. $\int_{\{q>0\}}(q-p)=1-\int_{\{q>0\}}p\ge0$. Khớp bước 2 của L14-5-03 ($q\log\frac qp=q\psi(t)+q-p\ge-p$, vì $q\psi\ge0$) và ghi chú dòng 699–701. Câu "tuyệt đối liên tục … $+\infty$ không xảy ra" đã bỏ khỏi ghi chú diễn giả. **Đạt.**
- L14-5-06 (E2): ghi chú diễn giả "$\mathcal L\le\log\mathbb E_q[p_\theta(x,Z)/q(Z)]=\log\int_{\{q>0\}}p_\theta(x,z)\,dz\le\log p_\theta(x)$" trùng nguyên văn ghi chú dòng 814. **Đạt.**

**(b) Rút chữ và dàn lại (NT2).** Đã so mọi đoạn đổi trong `diff` với ghi chú. Giả thiết, lượng từ, hằng số còn đủ ở hầu hết trang; năm chỗ mất ý nêu ở mục 5 (R1, R2, R5, R6, R7).

**(c) Số hiệu công thức chuyển vào dòng chữ đứng trước.** Đối chiếu `\tag` của ghi chú: (4.4) dòng 280, (5.1) dòng 365, (6.1) dòng 504 (gồm cả mật độ đồng thời và biên: khớp "mật độ đồng thời và mật độ biên (6.1):"), (6.2) dòng 515 (gồm $p(z)$, $p_\theta(x\mid z)$, $\tau>0$), (6.3) dòng 538, (7.1) dòng 668, (7.2) dòng 735, (7.3) dòng 764, (7.4) dòng 831, (7.5) dòng 886, (7.6) dòng 923, (8.3) dòng 1186 (có "trên $\mathcal B$", deck ghi $\vartheta\in\mathcal B$). Mỗi số đứng ngay trước đúng công thức mang số đó; (4.3), (8.2) giữ trong công thức. **Đạt.** Một điểm nhỏ: (8.2) nằm ở dòng thứ hai của `aligned` (dòng $\varepsilon\sim\mathcal N(0,I_k)$), trong ghi chú (8.2) chỉ là đẳng thức $Z_\phi=\dots$; không đổi nghĩa, không ghi phát hiện.

**(d) 19 phát hiện `deck_lint.py`.** Xem mục 4.

**(e) `vae-paths-wide.svg`, `vae-paths-narrow.svg`.**
- Bản rộng: sáu `<path>` riêng, mỗi path một `marker-end` (hướng trái → phải, `orient="auto"`); `font-size` 28 trên `viewBox` 990, hiển thị 593 px ở 1600×900: chữ ≈ 16,8 px (đạt, sát ngưỡng).
- Bản hẹp: bảy mũi tên dọc, mỗi đoạn một path, hướng trên → dưới; không mũi tên nối "Mẫu mã z" với "Sinh mẫu mới" (đúng: hai đường tính tách rời). `font-size` 30 trên `viewBox` 600, hiển thị 340 px: chữ ≈ 17,0 px (đạt).
- Hai tệp có `role="img"`, `<title>`, `<desc>`; `<img>` có `alt` cụ thể; nhãn chỉ là chữ và ký hiệu ngắn (μφ(x), σφ(x), p(z)), không công thức, không phép $\odot$; màu kèm nét liền/nét đứt nên màu không là tín hiệu duy nhất. **Đạt.**

**(f)** Xem mục 1.

## 3. Phát hiện của năm báo cáo → trạng thái

Đánh số theo thứ tự dòng trong từng báo cáo: toan-hoc T1–T11, chuyen-gia C1–C16, sinh-vien S1–S17, su-pham P1–P37, mach-truyen M1–M19.

| Phát hiện | Trạng thái | Bằng chứng (deck sau biên tập) |
|---|---|---|
| T1, C2, S3, P3, M10 (L14-5-02 "Trực quan.", E1) | đã sửa | mục 2(a) |
| T2, C1 (L14-5-06 Jensen, E2) | đã sửa | mục 2(a) |
| T3, S9, P19 (L14-3-03 bước 3–4) | đã sửa | "ảnh của $U$ chứa $W$"; "tại nghiệm tối ưu các bất đẳng thức là đẳng thức, và (giả thiết $\lambda_k>\lambda_{k+1}$, $y_i$ sinh $\mathbb R^d$) $BA=V_kV_k^\top$". Còn thiếu $k<d$: R7 |
| T4, C6, S15, P7 (L14-6-07) | đã sửa | "Bộ giải mã cũng bỏ qua $z$ thì hậu nghiệm bằng $p(z)$, $q_\phi=p(z)$ cho cận chặt mà biến ẩn không được dùng…"; "Cận chặt khi đó không chứng minh mô hình khớp dữ liệu." |
| T5, C4, P2 (L14-1-02 i.i.d., E4) | đã sửa | "Hợp lý cực đại (maximum likelihood estimation, MLE) trên mẫu độc lập cùng phân phối: …"; ghi chú diễn giả L14-1-01, L14-6-01 nêu mẫu cố định / mẫu i.i.d. |
| T6, C3 (L14-5-02 ghi chú diễn giả) | đã sửa | câu "$+\infty$ không xảy ra" đã bỏ |
| T7 (L14-5-03 bước 4) | đã sửa | "$p=q$ hầu khắp nơi trên $\mathcal S_q$; ngoài $\mathcal S_q$ … $p=q=0$ hầu khắp nơi" |
| T8, C16 (Nhận xét 14.5) | đã sửa | "Đổi đơn vị của $N$ (nhân với $10^3$): $\operatorname{Var}(10^3N)=10^6$"; ghi chú diễn giả: "Nhân $M$ với $10^3$ thì $S=\operatorname{diag}(10^8,1)$" (tính lại: $100\cdot10^6=10^8$) |
| T9, C15 (ký hiệu $C$, $a,b,c$) | đã sửa | L14-4-04 dùng $\kappa,\nu,z_0$; L14-4-05 dùng $\mathrm{const}$ |
| T10 (L14-5-07 ghi chú diễn giả) | đã sửa | "cận chặt và KL tới tiên nghiệm nhỏ là hai điều khác nhau; câu 5 … cho cận chặt với KL tới tiên nghiệm dương" |
| T11 (L14-7-01 ghi chú diễn giả) | đã sửa | "không còn được bảo đảm" |
| C5, P30 (L14-6-04 Lưu ý, bước 3) | đã sửa | "ReLU không thỏa giả thiết khả vi liên tục ở dạng đã nêu"; "đổi thứ tự đạo hàm và kỳ vọng" |
| C7, M15 (PPCA lần đầu ở Tổng kết, E8) | đã sửa | L14-4-05 "Diễn giải: … nghiệm hợp lý cực đại của PCA xác suất (probabilistic PCA, PPCA) một chiều ẩn"; tính lại $\lambda_1-\lambda_2=\frac32=w^2$, $\lambda_2=\frac12=\tau^2$ |
| C8 (L14-6-01 Định nghĩa 14.19) | đã sửa | ba thành phần trong định nghĩa; "Lựa chọn Gaussian:" dòng riêng |
| C9 (hình: hàng suy luận thiếu bộ giải mã) | sửa một phần | chỉ thêm câu ở ghi chú diễn giả; review-log ghi "Sửa một phần". Chờ điều phối viên chốt (R19) |
| C10 (L14-3-05) | đã sửa | "bộ giải mã chỉ khớp tại mã của mẫu" |
| C11 (L14-5-00 dòng dẫn) | đã sửa | "khe hở của cận có biểu thức chính xác" |
| C12 (bảng tổng kết, loại bảo đảm) | đã sửa | "(4.4) trên mẫu"; "(8.3), ước lượng không chệch" |
| C13 (L14-7-03) | đã sửa | "… có hiệp phương sai $S$ nhưng khác phân phối thực nghiệm của bốn điểm" |
| C14 (mục tiêu 1) | đã sửa | "cực tiểu lỗi chiếu"; ghi chú diễn giả "lỗi chiếu, tức lỗi tái tạo trực giao" |
| S1 (mũi tên SVG, E6) | đã sửa | mục 2(e) |
| S2 (chữ SVG 390 px, E6) | đã sửa | mục 2(e) |
| S4 (công thức tràn 390 px, E5) | đã sửa | mục 1: 0 khối `.formula` tràn |
| S5 (hộp chữ, E7) | đã sửa | storyboard ghi ngoại lệ hộp cho L14-3-06, 4-06, 5-11, 6-08, 7-04 |
| S6 (dòng > 20 âm tiết) | sửa chưa đủ | L14-1-02, 5-02 đạt; L14-3-01 (23), 6-04 (24) còn; biên tập sinh thêm dòng dài (R4) |
| S7, P1 (mục tiêu học tập, E3) | đã sửa phần chính | "phân biệt", đủ động từ, "điều kiện đưa gradient vào kỳ vọng", bỏ "cận dưới Gaussian"; còn mục 6 (R16) |
| S8, P16 (L14-2-08/09 $V_k$) | đã sửa | "Quay trong không gian con của $k$ vector riêng đầu không đổi phép chiếu" đứng trước Giả thiết |
| S10 (L14-4-05 $1/(2\tau^2)$) | đã sửa | dòng dữ kiện "nên $1/(2\tau^2)=1$" |
| S11 (L14-4-06 thiếu $f$) | đã sửa | "$f(x)=x_1+x_2$" trong dòng dữ liệu |
| S12, P26 (L14-5-01 "Trực quan.") | đã sửa | "Thay hậu nghiệm bằng phân phối dễ lấy mẫu; đo độ gần cần thước đo khác nhau giữa hai phân phối." |
| S13, M12 (L14-6-01 $(\mu_i,s_i)$) | đã sửa | "Hậu nghiệm xấp xỉ riêng $(\mu_i,s_i)$ cho mỗi $x_i$"; câu chữ còn nhẹ (R10) |
| S14 (L14-6-03 tâm của $\mathcal B$) | đã sửa | "quanh điểm đang xét" |
| S16 (`pca-projection.svg` 390 px) | chưa sửa | `font-size` 25, `viewBox` 600, hiển thị 336 px: chữ ≈ 14,0 px < 16 px (R14) |
| S17, M18 (storyboard theo mã mới) | đã sửa phần chính | bảng đếm theo L14-7-01…08; mục 8 ghi `elbo-gap.svg` bỏ; còn chi tiết cũ (R18) |
| P4 (L14-5-05 "Trực quan.") | đã sửa | "$\log p_\theta(x)$ gồm phần tính được $\mathcal L$ và một khe hở; …" |
| P5 (thuật ngữ ELBO, E9) | sửa chưa đủ | L14-5-04 đúng dạng của ghi chú; tiêu đề L14-5-10 và dòng dẫn L14-6-00 vẫn dùng "cận dưới" trơn (R15) |
| P6 (dữ kiện dạng danh sách) | đã sửa | L14-3-04, 3-05, 4-05, 5-09, 5-10, 6-06 có danh sách dữ kiện |
| P8 (L14-5-11 lời giải câu 5) | đã sửa | "(5) $q$ là hậu nghiệm: $\mathcal L=\log p_\theta(1)$, cận chặt dù KL tới tiên nghiệm $\approx0{,}2216>0$" |
| P9 (L14-7-06 câu 3) | đã sửa | nguyên văn ghi chú §11 |
| P10, M4 (L14-5-09) | đã sửa | "Nhắc lại:" trước (7.6); tiêu đề "Kỳ vọng tái tạo và lỗi bình phương" |
| P11 (Định nghĩa 14.16) | đã sửa | chuyển sang cuối L14-5-06; cách viết mới sinh R5 |
| P12 (luận điểm bìa) | đã sửa | một câu, không chấm phẩy; ghi chú diễn giả không chép lại. Ngữ pháp câu mới: R8 |
| P13, P14, P15, P17, P18, P21, P23, P24, P25, P27, P29, P32–P37 | đã sửa | đúng phương án đề xuất (đối chiếu từng dòng trong `diff`) |
| P20 (tiêu đề L14-3-05) | giữ, đúng đề xuất "có thể giữ" | tên Ví dụ 14.4 của ghi chú |
| P22 (một tên cho mô hình sinh tuyến tính Gaussian) | sửa chưa đủ | mặt trang L14-4-04, 4-05 đã thống nhất; ghi chú diễn giả còn ba dạng khác (R12) |
| P28 (Monte Carlo "dùng khi") | đã sửa | "…; dùng khi kỳ vọng không có dạng đóng" |
| P31 ("của ghi chú", "trên trang" trong ghi chú diễn giả) | đã sửa | `grep` không còn cụm nào ngoài dòng `note-source` |
| M1 (câu hỏi mạch 4, E8) | đã sửa | L14-4-01 "Câu hỏi:" nguyên văn ghi chú dòng 21 |
| M2 (thứ tự L14-2-08/09, E8) | đã sửa | Nhận xét 14.5 → Định lý 14.6; L14-2-09 kết bằng "Mã và tái tạo vẫn tuyến tính." |
| M3 (nhu cầu thước đo lên mặt trang) | đã sửa | dòng "Trực quan." L14-5-01 |
| M5 (mạng nơ-ron, E4) | đã sửa | L14-1-02 "Mạng nơ-ron; lan truyền ngược tính gradient theo mọi tham số của mạng."; số hiệu 06.4, 06.12 ở ghi chú diễn giả |
| M6, M7, M8, M9 | đã sửa | L14-2-02 "phần giữ lại đo bằng phương sai của mã"; L14-2-05 "trùng $f(x)=x_1$"; L14-4-01 hai sai lệch, "Trực quan." cuối trang |
| M11 (L14-5-08 câu nối tới (7.2)) | chưa sửa | mặt trang vẫn "Log-mật độ Gaussian bậc hai theo $z$: KL chỉ cần hai mômen của $q$."; ý "KL tới tiên nghiệm của (7.2)" chỉ ở ghi chú diễn giả (R13) |
| M13 (thứ tự Thuật toán 14.21 / Ví dụ 14.8) | đã sửa | L14-6-05 Thuật toán, L14-6-06 Ví dụ 14.8 |
| M14 (L14-7-03 cơ chế sinh) | đã sửa | "Bộ tự mã hóa biến phân: sinh $z\sim p(z)$, $x\sim p_\theta(x\mid z)$; …" |
| M16 ("(trên lớp)", E10) | đã sửa | L14-7-07 |
| M17 (dòng nối L14-7-08) | đã sửa | "… như ở Bài 13, …" |
| M19, P33 (tiêu đề L14-7-01/02) | đã sửa | "Kết quả và giả thiết của bài toán nén / của mô hình sinh" |

## 4. Ngoại lệ mật độ (`deck_lint.py`, 19 phát hiện)

Trần theo NT17: 60 âm tiết (80 cho "Mục tiêu học tập", "Nội dung", bảng tổng kết, bảng so sánh); 6 dòng. 1,5 lần trần: 90 (hoặc 120).

| Trang | Đếm / trần | Tỉ lệ | Lý do ở storyboard | Đánh giá |
|---|---|---:|---|---|
| L14-1-02 | 67 / 60 | 1,12 | E4: i.i.d., MLE, mạng nơ-ron | chính đáng (điều phối viên yêu cầu) |
| L14-1-03 | 110 / 80 | 1,38 | E3: trần 110 do điều phối viên chốt | chính đáng |
| L14-2-09 | 66 / 60 | 1,10 | "thành phần chính (principal component)" | chính đáng (NT21) |
| L14-3-02 | 63 / 60 | 1,05 | "sai khác phép đổi tọa độ $R$" | chính đáng (P18) |
| L14-3-05 | 65 / 60 | 1,08 | dữ kiện thành danh sách; Diễn giải thêm ý của C10 | chính đáng |
| L14-3-06 | 7 dòng / 6 | — | mỗi cặp điểm một dòng (đã duyệt ở cổng storyboard) | chính đáng |
| L14-4-06 | 81 / 60; 2 hộp | 1,35 | đề Bài tập 14.1 câu 3–4 nguyên văn | chính đáng (NT24) |
| L14-5-01 | 69 / 60 | 1,15 | câu hỏi mạch viết đủ; thước đo lên mặt trang (M3) | chính đáng |
| L14-5-04 | 69 / 60 | 1,15 | E9 | chính đáng |
| L14-5-11 | 89 / 60; 2 hộp | 1,48 | đề Bài tập 14.2 câu 4–5 nguyên văn (đối chiếu ghi chú dòng 1025–1033: đúng nguyên văn) | chính đáng, sát ngưỡng 1,5: mọi thêm chữ sau này phải tách trang |
| L14-6-01 | 68 / 60 | 1,13 | Định nghĩa 14.19 đủ ba thành phần (C8) | chính đáng |
| L14-6-02 | 65 / 60 | 1,08 | "dùng khi" của Monte Carlo (NT7) | chính đáng |
| L14-6-04 | 71 / 60 | 1,18 | Lưu ý giữ "ở dạng đã nêu"; bước 3 | chính đáng |
| L14-6-05 | 7 dòng / 6 | — | công thức $\widehat{\mathcal L}_i$ thuộc bước 3; khối Thuật toán có Đầu vào/Đầu ra | chính đáng |
| L14-6-07 | 84 / 60 | 1,40 | Nhận xét 14.22 đủ điều kiện cận chặt và kết luận chẩn đoán (T4, C6, P7) | chính đáng; có thể rút khoảng 5 âm tiết (mục 5, R4) |
| L14-6-08 | 86 / 60; 1 hộp 4 câu | 1,43 | đề Bài tập 14.4 (ghi chú dòng 1364–1372: câu 3 rút nhẹ, giữ nghĩa) | chính đáng |
| L14-7-03 | 80 / 60 | 1,33 | "trần 80 của trang tổng kết; `deck_lint.py` chỉ nhận tiêu đề Tổng kết…" | **lý do không đúng**: NT17 chỉ cho trần 80 với bảng tổng kết; trang này là danh sách, trần 60 (R3) |
| L14-7-06 | 64 / 60 | 1,07 | câu hỏi 3 nguyên văn §11 (P9) | chính đáng |
| L14-7-08 | 76 / 60 | 1,27 | tên sách, số mục; dòng nối theo §11 (M17) | chính đáng (tên riêng) |

Không trang nào vượt 1,5 lần trần. Một ngoại lệ có lý do sai (L14-7-03).

## 5. Phát hiện còn mở

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| trung bình | L14-5-05 | R1. NT2, NT5: trang phát biểu Định lý 14.15 bỏ kết luận thứ ba của ghi chú ("Tối ưu theo $\phi$"); kết luận này chỉ còn là bước 3 của trang ý tưởng chứng minh | Deck: "**Kết luận:** $\mathcal L\le\log p_\theta(x)$, bằng khi và chỉ khi … hầu khắp nơi, và (7.3):" (bản trước biên tập có "$\theta$ cố định: $\max_\phi\mathcal L$ tương đương cực tiểu KL tới hậu nghiệm"). Ghi chú dòng 768: "**Tối ưu theo $\phi$:** với $\theta$ cố định, cực đại $\mathcal L(\theta,\phi;x)$ theo $\phi$ tương đương cực tiểu $\mathrm{KL}(q_\phi(\cdot\mid x)\,\|\,p_\theta(\cdot\mid x))$ theo $\phi$." | Thêm vào cuối dòng Kết luận (hoặc một dòng dưới công thức): "$\theta$ cố định: cực đại $\mathcal L$ theo $\phi$ tương đương cực tiểu KL tới hậu nghiệm." Trang đang 50 âm tiết (`deck_check`), thêm khoảng 14. Chạy lại `footer_check.py` |
| trung bình | L14-5-08 | R2. NT9, NT2: dòng "Chứng minh." của Mệnh đề 14.18 đứng trước phát biểu (cột trái, ngay dưới (7.4)); ở 390 px nó cũng hiện trước "Mệnh đề 14.18". Lý do then chốt của chứng minh (mật độ chéo là tích theo tọa độ) đã chuyển hẳn vào ghi chú diễn giả, nên dòng chứng minh không nói vì sao được áp dụng (7.4) cho từng tọa độ | Ảnh `wide-037-L14-5-08.png`, `narrow-037-L14-5-08.png`. Deck: "**Chứng minh.** (7.4) với $c=0$, $\gamma=1$ cho từng tọa độ." Ghi chú, chứng minh Mệnh đề 14.18, Lộ trình: "Viết hai mật độ thành tích các mật độ một chiều, đưa log-tỉ số về tổng theo tọa độ, rồi áp dụng Bổ đề 14.17 cho từng tọa độ." | Chuyển dòng "Chứng minh." xuống cột phải, sau (7.5): "**Chứng minh.** Mật độ chéo là tích theo tọa độ; (7.4) với $c=0$, $\gamma=1$ cho từng tọa độ." Kiểm lại `footer_check.py` (trang từng chạm chân trang 2 px trước khi dùng `grid2`) |
| trung bình | L14-7-03 | R3. NT17: ngoại lệ 80/60 ghi lý do sai ("trần 80 của trang tổng kết"); NT17 chỉ cho trần 80 với bảng tổng kết, trang này là danh sách | Storyboard, bảng ngoại lệ: "L14-7-03 \| 80 \| 80 \| trang 'Vấn đề trung tâm' của Tổng kết (trần 80; `deck_lint.py` chỉ nhận tiêu đề 'Tổng kết…')". Mặt trang: ba gạch đầu dòng và đoạn "Trên bốn quan sát: … nhưng khác phân phối thực nghiệm của bốn điểm." | Chọn một: (i) ghi lại ngoại lệ đúng: "80/60 = 1,33×; trả lời câu hỏi trung tâm cho cả bài (NT15) và giới hạn của ví dụ xuyên suốt (C13)"; (ii) rút đoạn cuối: "Trên bốn quan sát: PCA giữ $u=(1,0)^\top$, lỗi $1/2$; mô hình sinh của Ví dụ 14.5 có hiệp phương sai $S$ nhưng khác phân phối thực nghiệm." (công thức mẫu sinh đã có ở L14-4-05 và ghi chú diễn giả) |
| trung bình | L14-3-05, 4-03, 4-05, 5-01, 6-01, 6-04, 6-06, 6-07, 7-03, 7-05, 7-06 | R4. NT17 (≤ 20 âm tiết mỗi dòng), không có ngoại lệ ở storyboard. Biên tập gộp hoặc nối dài nhiều dòng; số âm tiết dòng dài nhất tăng so với bản trước biên tập | `deck_check.py` maxLine (trước → sau, theo cùng nội dung): L14-3-05 20 → 29 (Diễn giải), L14-4-05 18 → 27, L14-6-06 (Ví dụ 14.8) 13 → 27 (dòng kết quả gộp "Diễn giải:"), L14-6-07 18 → 25, L14-7-03 20 → 25, L14-7-06 20 → 26, L14-4-03 19 → 24, L14-6-04 21 → 24, L14-5-01 17 → 23, L14-6-01 17 → 23, L14-7-05 17 → 22. Còn L14-3-01 (23) của S6 | Tách lại các dòng gộp hai khối có nhãn (L14-6-06: "Diễn giải:" thành dòng riêng; L14-3-05: tách "bộ giải mã chỉ khớp tại mã của mẫu" thành dòng riêng hoặc nối vào ghi chú diễn giả). Với dòng không tách được (câu hỏi nguyên văn L14-7-06, Nhận xét 14.22 ở L14-6-07), ghi ngoại lệ dòng vào storyboard kèm số âm tiết |
| nhẹ | L14-5-06 | R5. NT20: Định nghĩa 14.16 định nghĩa bằng tham chiếu tới một bước của ý tưởng chứng minh, không tự đứng | "**Định nghĩa 14.16.** Bài toán ở bước 3 với $q$ trong họ $\mathcal Q$: suy luận biến phân (variational inference)." Ghi chú dòng 807: "… là bài toán chọn $q\in\mathcal Q$ cực đại $\mathbb E_q[\log p_\theta(x,Z)-\log q(Z)]$" | "**Định nghĩa 14.16.** $\theta$ cố định, họ $\mathcal Q$: chọn $q\in\mathcal Q$ cực đại $\mathcal L$, tức cực tiểu KL tới hậu nghiệm trên $\mathcal Q$, là suy luận biến phân (variational inference)." |
| nhẹ | L14-6-03 | R6. NT2 (lượng từ): kết luận thứ nhất mất "với mọi hàm $h$" | Deck: "$\mathbb E_{q_\phi}[h(Z)]=\mathbb E_\varepsilon[h(Z_\phi)]$ khi kỳ vọng hữu hạn". Ghi chú dòng 1180: "… với mọi hàm $h$ có kỳ vọng hữu hạn." | "… $=\mathbb E_\varepsilon[h(Z_\phi)]$ với mọi $h$ có kỳ vọng hữu hạn" (thêm 2 âm tiết) |
| nhẹ | L14-3-03 | R7. NT6, NT2: bước 4 liệt kê giả thiết bổ sung thiếu $k<d$ (ghi chú và L14-3-02 có) | "(giả thiết $\lambda_k>\lambda_{k+1}$, $y_i$ sinh $\mathbb R^d$)". L14-3-02: "thêm $k<d$, $\lambda_k>\lambda_{k+1}$, $y_i$ sinh $\mathbb R^d$" | "(giả thiết $k<d$, $\lambda_k>\lambda_{k+1}$, $y_i$ sinh $\mathbb R^d$)" |
| nhẹ | L14-1-01 | R8. NT20 (câu khó đọc): câu luận điểm mở bằng cụm động từ không chủ ngữ, điều kiện "khi …" dồn cuối câu | "Thêm phân phối của mã và nhiễu quan sát, một biểu diễn ít chiều sinh được dữ liệu mới và được học bằng một cận dưới của log-hợp lý khi tích phân biên không tính được." | "Với phân phối của mã và nhiễu quan sát, một biểu diễn ít chiều sinh được dữ liệu mới và được học bằng một cận dưới của log-hợp lý khi tích phân biên không tính được." |
| nhẹ | L14-5-02 (ghi chú diễn giả) | R9. `no-ai-slop` (interpretive metadiscourse); NT9: câu nói về chính trang chiếu, và dùng $\psi$ trước khi $\psi$ được nhắc lại ở L14-5-03 | "Trực quan nêu đúng cơ chế của chứng minh: hàm dưới dấu tích phân $q\log(q/p)$ có thể âm tại một điểm; chỉ phần $q\,\psi(p/q)$ không âm …" | "Hàm dưới dấu tích phân $q\log(q/p)$ có thể âm tại một điểm; bất đẳng thức đúng tại mỗi điểm là $q\log\frac qp\ge q-p$, còn $q-p$ có tích phân $1-\int_{\{q>0\}}p\ge0$. Ví dụ: …" |
| nhẹ | L14-6-01 | R10. NT20: đồng nhất hậu nghiệm xấp xỉ với cặp tham số của nó; hai khối (câu nêu vấn đề và "Trực quan.") chung một đoạn | "Hậu nghiệm xấp xỉ riêng $(\mu_i,s_i)$ cho mỗi $x_i$: số biến tăng theo $n$. **Trực quan.** …" Ghi chú dòng 1116: "một cặp tham số $(\mu_i,s_i)$ cho hậu nghiệm xấp xỉ" | "Mỗi $x_i$ một hậu nghiệm xấp xỉ riêng, tham số $(\mu_i,s_i)$: số biến tăng theo $n$." |
| nhẹ | L14-3-05 | R11. NT20: "Cả hai" (hai cơ chế) làm chủ ngữ của "nằm trên trục ngang"; bản trước nói đúng hơn ("đặt xác suất $1$ lên trục ngang") | "Cả hai nằm trên trục ngang, diện tích $0$: không có mật độ hai chiều." | "Cả hai đặt xác suất $1$ lên trục ngang, diện tích $0$: không có mật độ hai chiều." |
| nhẹ | L14-4-00, L14-7-04, L14-7-05, L14-7-07 (ghi chú diễn giả) | R12. NT21 (một thuật ngữ, một dạng), P22 sửa chưa đủ | "một mô hình Gaussian tuyến tính" (L14-4-00); "mô hình sinh có biến ẩn tuyến tính Gaussian (mạch 4)" (L14-7-04); "mô hình tuyến tính Gaussian hai chiều" (L14-7-05); "mô hình tuyến tính Gaussian" (L14-7-07). Ghi chú: "mô hình sinh tuyến tính Gaussian" | Thay cả bốn bằng "mô hình sinh tuyến tính Gaussian" |
| nhẹ | L14-5-08 | R13. NT13, M11 chưa sửa: câu nối từ bảng hai vai trò sang trang này chưa nói trang tính số hạng nào của (7.2) | "**Trực quan.** Log-mật độ Gaussian bậc hai theo $z$: KL chỉ cần hai mômen của $q$." | "**Trực quan.** KL tới tiên nghiệm trong (7.2) chỉ cần hai mômen của $q$, vì log-mật độ Gaussian bậc hai theo $z$." |
| nhẹ | L14-2-05 (390×844) | R14. NT25, S16 chưa sửa: chữ hình dưới 16 px ở màn hẹp | `pca-projection.svg`: `font-size="25"`, `viewBox` rộng 600, hiển thị 336 px → ≈ 14,0 px. Mọi số của hình có trong chữ trên trang | Như E6: thêm bản `pca-projection-narrow.svg` (chữ ≥ 29 trên `viewBox` 600) với `img.only-narrow`, hoặc điều phối viên ghi ngoại lệ có lý do vào review-log |
| nhẹ | L14-5-10 (tiêu đề), L14-6-00 (dòng dẫn) | R15. E9 sửa chưa đủ: sau lần đầu, tên thuật ngữ là "cận dưới bằng chứng"; hai chỗ dùng "cận dưới" trơn | "Ví dụ: cận dưới và khe hở trong mô hình vô hướng"; "Cận dưới trở thành mục tiêu huấn luyện bằng gradient …" | "Ví dụ: cận dưới bằng chứng và khe hở trong mô hình vô hướng" (hoặc giữ nếu tiêu đề chạm chân trang, ghi lý do); "Cận dưới bằng chứng trở thành mục tiêu huấn luyện …" |
| nhẹ | L14-1-03 | R16. Mục tiêu 6 vẫn kiểu điện tín, mất "hoặc" của ghi chú | "chẩn đoán mô hình sinh kém dù lỗi tái tạo, phân kỳ nhỏ." Ghi chú dòng 39: "chẩn đoán trường hợp lỗi tái tạo nhỏ hoặc phân kỳ nhỏ vẫn đi cùng một mô hình sinh kém" | "chẩn đoán mô hình sinh kém khi lỗi tái tạo hoặc phân kỳ nhỏ." (cùng số âm tiết) |
| nhẹ | L14-5-02, 5-09, 6-01, 6-06 | R17. NT17, NT19: hai khối có nhãn ghép trong một đoạn (`Nhắc lại:` + `Trực quan.`; kết quả + `Diễn giải:`) làm `deck_lint` đếm ít dòng hơn thực tế; tách ra thì L14-5-02, 5-09, 6-06 thành 7 dòng | L14-5-02: "**Nhắc lại:** … **Trực quan.** …"; L14-5-09: "… $\approx-2{,}3947$. **Diễn giải:** …"; L14-6-06: "… $(-1,-2)$. **Diễn giải:** …" | Tách thành dòng riêng và ghi ngoại lệ 7 dòng, hoặc giữ ghép và ghi lý do trong storyboard |
| nhẹ | storyboard | R18. Đồng bộ storyboard: một số dòng còn số cũ | Dòng 114 "59 trang"; mục 9 bảng `Mục \| Bài tập` chưa có "(trên lớp)" như deck L14-7-07 | Cập nhật hai chỗ |
| nhẹ | L14-6-01 (hình) | R19. C9 sửa một phần: hàng "Suy luận từ x" của hình dừng ở "Mẫu mã z"; ý mã đi qua bộ giải mã khi huấn luyện chỉ ở ghi chú diễn giả | ghi chú diễn giả: "khi huấn luyện, mã $z$ của đường này đi qua bộ giải mã để tính kỳ vọng tái tạo" | Điều phối viên chốt: chấp nhận sửa một phần (ghi review-log), hoặc thêm ô "Bộ giải mã → tái tạo x" cuối hàng trên ở cả hai SVG |
| nhẹ | L14-4-01 | R20. NT20 (lặp từ): "Mô hình sinh … sinh hai bước" | "**Trực quan.** Mô hình sinh (generative model) sinh hai bước: trạng thái ẩn, rồi quan sát quanh nó." | "**Trực quan.** Mô hình sinh (generative model) tạo quan sát qua hai bước: chọn trạng thái ẩn, rồi lấy quan sát quanh nó." |

`no-ai-slop` Detect trên văn bản mới hoặc đã sửa: một mẫu "interpretive metadiscourse" (R9). Không thấy câu rào đón, câu nguồn gốc, câu điều hướng mới trên mặt trang; không câu hỏi tu từ; không nhãn ngoài danh sách NT19.

## 6. Mạch truyện trên trang đã đổi (±2) và ranh giới mạch

- Mạch 2: L14-2-07 → 2-08 (Nhận xét 14.5, chỉ dùng (4.3)) → 2-09 (Định lý 14.6, kết "Mã và tái tạo vẫn tuyến tính.") → L14-3-00: đúng thứ tự §4.2 → §4.3 và nối sang mạch 3.
- Mạch 4: L14-4-01 mở bằng dữ kiện, "Câu hỏi:" của mạch, hai sai lệch, "Trực quan." dẫn sang Định nghĩa 14.10; "mô hình sinh (generative model)" có tiếng Anh ở lần đầu; L14-4-05 gọi tên PCA xác suất trước L14-7-04.
- Mạch 5: L14-5-01 → 5-02 có câu nối "đo độ gần cần thước đo khác nhau giữa hai phân phối"; L14-5-05 → 5-06 → 5-07 liền mạch, nhưng kết luận "tối ưu theo $\phi$" rời khỏi trang phát biểu (R1) và Định nghĩa 14.16 tham chiếu bước 3 (R5); 5-07 → 5-08 câu nối còn thiếu (R13).
- Mạch 6: L14-6-04 → 6-05 (Thuật toán 14.21) → 6-06 (Ví dụ 14.8) → 6-07 (Nhận xét 14.22) → 6-08/09: đúng §8.1 → §8.2.
- Mở đầu và Tổng kết: bìa một câu luận điểm (R8 về câu chữ); "Nội dung" giữ 7 liên kết (số trang và vị trí mạch không đổi, 60 trang); Tổng kết có bảng tách hai trang, "Vấn đề trung tâm" trả lời cả bài gồm cơ chế sinh và giới hạn của ví dụ; dòng nối L14-7-08 theo §11.

## 7. Toán đã tính lại trên nội dung đổi

Ví dụ 14.5 ($\lambda_1-\lambda_2=\frac32=w^2$, $\tau^2=\frac12$, $\mathbb E[X_1^2]=2$); Ví dụ 14.6 ($\frac54$; $-\log\pi-\frac54\approx-2{,}3947$; phạt $\frac14$); Ví dụ 14.7 (KL $\frac1{16}+\frac32\log2\approx1{,}1022$; $\frac98$; $\mathcal L\approx-2{,}5837$; $\log p_\theta(2)\approx-2{,}2655$; khe hở $\log2-\frac38\approx0{,}3181$); Bài tập 14.2 câu 4–5 ($-1{,}5155$; $\mathcal N(\frac12,\frac12)$; $\frac12\log2$; $\frac12\log2-\frac18\approx0{,}2216$, ghi chú diễn giả mới tính đúng $\frac12(\frac14+\frac12-1-\log\frac12)$); Nhận xét 14.5 ($10^8$); $\widehat{\mathcal L}_i$ viết lại với $\frac1{2m\tau^2}$ (bằng dạng cũ); "Nhiễu Gaussian phương sai $\sigma^2$ cố định: $-\log p_\theta(y\mid x)=\frac{(y-m_\theta(x))^2}{2\sigma^2}+\frac12\log(2\pi\sigma^2)$" khớp Mệnh đề 12.2 (ghi chú Bài 12, (4.3), ký hiệu $m_\theta$). Không sai số nào.

## 8. Kết luận

Còn mở: 0 chặn bàn giao, 0 nghiêm trọng, 4 trung bình (R1–R4), 16 nhẹ (R5–R20). Mọi phát hiện nghiêm trọng của năm báo cáo đã sửa đúng; E1–E10 đạt, trừ phần chưa đủ của E9 (R15). Kiểm máy đạt.

**Kết luận: đạt khi sửa** (R1–R4; các mục nhẹ theo quyết định của điều phối viên).

## Đề xuất sửa ghi chú

Không có đề xuất mới.
