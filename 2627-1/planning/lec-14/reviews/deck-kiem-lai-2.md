# Kiểm lại sau biên tập — deck Bài 14, lượt 2

Vai: người kiểm lại (chỉ đọc), 2026-11-16. Deck `2627-1/lecture-14-hoc-bieu-dien-mo-hinh-sinh.html` (60 trang). Mốc so sánh: `scratchpad/lec-14/editor/before-r2.html`. Tôi đã kiểm mốc này trùng bản deck của lượt 1: `diff` từ bản đóng băng tới nó giống hệt `recheck/deck.diff` của lượt 1. `diff` từ mốc tới deck hiện tại có 299 dòng, gồm cả ghi chú diễn giả, lưu ở `scratchpad/lec-14/recheck2/r1-to-now.diff`. Hai tệp `r2-face.diff`, `r3-face.diff` của biên tập viên chỉ dùng tham khảo. Đối chiếu với `materials/lec-14/lecture-note.md` (Định nghĩa 14.16 ở dòng 806–808, Nhận xét 14.22 ở dòng 1356–1362, §11 ở dòng 1460–1472) và `storyboard.md`. Văn bản mới hoặc đã sửa được đọc bằng `no-ai-slop` chế độ Detect.

## 1. Kiểm bằng máy

Máy chủ tĩnh tạm chạy ở cổng 8778 và đã tắt sau khi xong.

| Công cụ | Kết quả |
|---|---|
| `deck_lint.py` | 6 phát hiện, đúng 6 ngoại lệ đã duyệt: L14-1-03 (110/80), 3-06 (7 dòng), 4-06 (81), 5-11 (89), 6-08 (86), 7-08 (72). Không trang nào vượt 1,5 lần trần |
| `footer_check.py` | 0 trang chạm chân trang |
| `deck_check.py --shots` | slides=60, console=0, pageerrors=0, failed=0, `.katex-error`=0. OVERFLOW/NARROW-H chỉ còn ở L14-3-06, 4-04, 4-05, 7-05; cả bốn trang đều có `\sqrt` (báo động giả đã biết). L14-7-03 không còn báo vì công thức có √ đã chuyển xuống ghi chú diễn giả |
| Playwright (`recheck/scripts/measure.py`) | 390×844 và 1600×900: không khối `.formula` nào trong 60 trang cuộn ngang |
| Ảnh đã xem | 1600×900: L14-2-05, 5-06, 5-08, 6-07, 7-03. 390×844 kể cả ảnh `-end`: L14-2-05, 5-08 |

## 2. R1–R20 của lượt 1

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| R1 (L14-5-05, kết luận thứ ba) | đã sửa | "… hầu khắp nơi; $\theta$ cố định: cực đại $\mathcal L$ theo $\phi$ tương đương cực tiểu KL tới hậu nghiệm." Khớp ghi chú dòng 768 |
| R2 (L14-5-08, vị trí chứng minh) | đã sửa | "**Chứng minh.** Mật độ chéo là tích theo tọa độ; (7.4) với $c=0,\gamma=1$ từng tọa độ." nằm dưới cả hai cột, sau (7.5); ảnh 1600 và 390 xác nhận |
| R3 (L14-7-03, lý do ngoại lệ) | đã sửa | 59 âm tiết, hết ngoại lệ |
| R4 (dòng > 20 âm tiết) | sửa chưa đủ | Còn ba dòng không có ngoại lệ: L14-5-02 (22), 5-05 (23), 7-06 (24). Xem N2 |
| R5 (Định nghĩa 14.16) | đã sửa | Không còn tham chiếu "bước 3". Còn thiếu tên "họ $\mathcal Q$" (N3) |
| R6 (L14-6-03, "với mọi $h$") | đã sửa | "… với mọi $h$ có kỳ vọng hữu hạn" |
| R7 (L14-3-03, $k<d$) | đã sửa | "(giả thiết $k<d$, $\lambda_k>\lambda_{k+1}$, $y_i$ sinh $\mathbb R^d$)" |
| R8 (luận điểm bìa) | đã sửa | "Với phân phối của mã và nhiễu quan sát, …" |
| R9 (ghi chú diễn giả L14-5-02) | đã sửa | Câu "Trực quan nêu đúng cơ chế" đã bỏ; câu thay thế không còn dùng $\psi$ |
| R10 (L14-6-01) | sửa chưa đủ | "Mỗi $x_i$ một hậu nghiệm xấp xỉ $(\mu_i,s_i)$" vẫn đồng nhất phân phối với cặp tham số (N8) |
| R11 (L14-3-05) | đã sửa | "Cả hai đặt xác suất $1$ lên trục ngang, …" |
| R12 (thuật ngữ trong ghi chú diễn giả) | đã sửa | Ghi chú diễn giả L14-4-00, 7-04, 7-05, 7-07 dùng "mô hình sinh tuyến tính Gaussian" |
| R13 (L14-5-08, câu nối với (7.2)) | đã sửa | "KL tới tiên nghiệm trong (7.2) chỉ cần hai mômen của $q$." Cơ chế đã chuyển xuống ghi chú diễn giả (N7) |
| R14 (chữ hình ở 390 px) | đã sửa | Xem mục 4 |
| R15 (tên ELBO) | đã sửa | Tiêu đề L14-5-10 và dòng dẫn L14-6-00 dùng "cận dưới bằng chứng" |
| R16 (mục tiêu 6) | đã sửa | "… chẩn đoán mô hình sinh kém khi lỗi tái tạo hoặc phân kỳ nhỏ." |
| R17 (hai khối có nhãn chung một đoạn) | đã sửa | L14-5-02, 5-09, 6-01, 6-06: mỗi nhãn đứng ở đoạn riêng |
| R18 (storyboard) | đã sửa | Dòng 114 ghi "60 trang"; bảng ở mục 9 có "(trên lớp)" |
| R19 (hình VAE) | giữ theo quyết định của điều phối viên | `review-log.md` dòng 318: "R19 giữ" |
| R20 (L14-4-01) | đã sửa, sinh lỗi nhẹ mới | Hết lặp từ, nhưng câu thành mảnh câu (N9) |

## 3. Lượt mật độ: giả thiết, lượng từ, hằng số, loại bảo đảm, "Trực quan."

Tôi đã so từng trang trong `diff` với ghi chú. Giả thiết, lượng từ và hằng số của các kết quả chính còn đủ ở các trang sau:

- Định lý 14.15: ba giả thiết và ba kết luận.
- Định nghĩa 14.14 và (7.2): giữ điều kiện "(7.2) cần kỳ vọng hữu hạn".
- Mệnh đề 14.18: "số hạng thứ $j$ không âm, bằng $0$ khi và chỉ khi $\mu_j=0$, $s_j=1$".
- Mệnh đề 14.20: đủ năm giả thiết và "với mọi $h$".
- Định lý 14.6: giả thiết $\lambda_k>\lambda_{k+1}$ cho tính duy nhất.
- Bảng tổng kết: không đổi.
- Thuật toán 14.21: "Đầu ra:" gộp vào dòng "Đầu vào:", nội dung không đổi.

Mọi kết quả chính vẫn có dòng "Trực quan." trên mặt trang.

**Ba điểm điều phối viên yêu cầu rà riêng:**

- **Định nghĩa 14.16 (L14-5-06): đúng và đủ.** Mặt trang ghi "Suy luận biến phân (variational inference): $\theta$ cố định, chọn $q\in\mathcal Q$ cực đại $\mathcal L$." Ghi chú dòng 807 định nghĩa bài toán là chọn $q\in\mathcal Q$ cực đại $\mathbb E_q[\log p_\theta(x,Z)-\log q(Z)]$, và đại lượng này chính là $\mathcal L$ theo (7.2). Vế "tương đương cực tiểu KL" trong ghi chú là hệ quả ("Theo Định lý 14.15, …"), không thuộc định nghĩa. Vế đó vẫn có trên mặt trang ở bước 3 ngay phía trên. Chỉ còn thiếu một chỗ: $\mathcal Q$ chưa được gọi là một họ mật độ trên mặt trang (N3).
- **L14-7-06, câu hỏi 2–3: nghĩa còn khớp, vẫn trả lời được bằng phần lời giải câu hỏi cuối buổi ở §11 của ghi chú.**
  - Câu 2, "… cần đại lượng nào không tính được, thay bằng gì, lệch bao nhiêu?", giữ đủ ba vế của câu hỏi 2 ở §11.
  - Câu 3 bỏ cụm "về $x_i$" của §11 và nối hai câu bằng dấu hai chấm, trong khi lượt trước đã sửa câu này thành nguyên văn §11 (P9). Vẫn trả lời được: lời giải ghi "mã không mang thông tin riêng của $x_i$". Ghi thành N4 (nhẹ).
  - Câu 1 đã khôi phục "tất định".
- **L14-1-02: không chữ viết tắt nào thiếu tên đầy đủ.** "MLE" không còn trên mặt trang, chỉ còn trong ghi chú diễn giả. Tôi kiểm tự động lần xuất hiện đầu tiên trên mặt trang của PCA, AE, PPCA, KL, ELBO, VAE: cả sáu đều có tên tiếng Việt và tiếng Anh đầy đủ tại chỗ (L14-2-02, 3-01, 4-05, 5-02, 5-04, 6-01).

## 4. `pca-projection-slide.svg`

- **Dữ liệu đúng.** Thang 100 px cho một đơn vị, gốc tại (300, 200). Bốn điểm: (500, 200) là $(2,0)$, (100, 200) là $(-2,0)$, (300, 100) là $(0,1)$, (300, 300) là $(0,-1)$. Hai đoạn nét đứt dài 100 px, tức 1 đơn vị. "Tổng lỗi: 2; lỗi trung bình: 1/2" khớp lỗi từng điểm $0,0,1,1$. Mũi tên $u$ chỉ theo trục ngang, và $u=(1,0)^\top$ có trong chữ trên trang.
- **Chữ ≥ 16 px.** `font-size` 32 và 30 trên `viewBox` 600. Ở 390×844 hình rộng 336 px, nên chữ ≈ 17,9 và 16,8 px. Ở 1600×900 hình rộng 593 px, chữ ≈ 31,6 và 29,6 px. Ảnh xác nhận không nhãn nào chồng lên nhau.
- **Không chứa công thức.** Hình chỉ có tọa độ, tên trục x₁, x₂, nhãn $u$ và chữ. Có `role="img"`, `<title>`, `<desc>`, và `alt` cụ thể. Màu kèm nét liền/nét đứt.

**Đạt.**

## 5. Phát hiện còn mở

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| trung bình | L14-6-07 | N1. NT2, NT9: lượt mật độ làm Nhận xét 14.22 mất nghĩa của thuật ngữ và lý do cận chặt. "Suy sụp hậu nghiệm" chỉ còn được đặt tên; vế định nghĩa nó ("biến ẩn không được dùng") và điều kiện "hậu nghiệm bằng tiên nghiệm" đã chuyển xuống ghi chú diễn giả. Câu về sinh mẫu mất chủ thể "bộ giải mã" và động từ "cần" | Mặt trang: "Sinh mẫu: kiểm tra vùng mã của $p(z)$, dữ liệu mới." và "Thêm bộ giải mã bỏ qua $z$: $q_\phi=p(z)$ cho cận chặt, suy sụp hậu nghiệm (posterior collapse)." Ghi chú dòng 1359: "Nếu bộ giải mã cũng bỏ qua $z$, hậu nghiệm thật bằng tiên nghiệm, nên chọn $q_\phi=p(z)$ làm KL tới hậu nghiệm bằng $0$ và cận (7.3) chặt, trong khi biến ẩn không được dùng. Hiện tượng này được gọi là *suy sụp hậu nghiệm*" | "Sinh mẫu lấy mã từ $p(z)$: cần kiểm tra bộ giải mã trên vùng mã đó và dữ liệu mới." và "Nếu bộ giải mã cũng bỏ qua $z$: hậu nghiệm bằng $p(z)$, $q_\phi=p(z)$ cho cận chặt dù biến ẩn không được dùng, gọi là suy sụp hậu nghiệm (posterior collapse)." Trang đang 59 âm tiết và sẽ lên khoảng 72 (1,2 lần trần): ghi ngoại lệ vào storyboard (lý do: Nhận xét 14.22 phục vụ mục tiêu học tập 6), hoặc gộp dòng "KL tới tiên nghiệm nhỏ …" với dòng sau |
| trung bình | L14-5-02, 5-05, 7-06 | N2. NT17 (≤ 20 âm tiết mỗi dòng), R4 sửa chưa đủ, chưa có ngoại lệ ghi ở storyboard | `deck_check.py` maxLine: L14-5-02 = 22 (Giả thiết và Kết luận của Bổ đề 14.13 gộp một dòng), L14-5-05 = 23 (dòng Kết luận của Định lý 14.15 sau khi sửa R1), L14-7-06 = 24 (câu hỏi 3 của §11) | Ghi ngoại lệ dòng cho ba trang: phát biểu đủ kết luận của bổ đề và định lý, câu hỏi theo ghi chú. Nếu tách dòng thì L14-5-02 lên 7 dòng |
| nhẹ | L14-5-06 | N3. NT9: $\mathcal Q$ xuất hiện trên mặt trang mà không được gọi là một họ mật độ | "chọn $q\in\mathcal Q$ cực đại $\mathcal L$". Ghi chú dòng 807: "một họ $\mathcal Q$ các mật độ trên $\mathbb R^k$" | "$\theta$ cố định, họ mật độ $\mathcal Q$; chọn $q\in\mathcal Q$ cực đại $\mathcal L$." (thêm 3 âm tiết) |
| nhẹ | L14-7-06 | N4. NT2: câu hỏi 3 lại lệch câu chữ §11 (P9 của lượt trước) | "mã mang thông tin gì, có kết luận được mẫu sinh tốt không?" §11: "Mã mang thông tin gì về $x_i$, và có kết luận được mẫu sinh tốt không?" | Viết lại nguyên văn §11 (thêm 3 âm tiết, trang lên 63, ghi ngoại lệ "nguyên văn §11"), hoặc chỉ thêm "về $x_i$" |
| nhẹ | L14-6-01 | N5. NT2, NT20 | (i) "Gaussian (6.2): $q_\phi(z\mid x)=\mathcal N(\ldots)$" đọc như thể (6.2) định nghĩa $q_\phi$, trong khi (6.2) chỉ gồm $p(z)$, $p_\theta(x\mid z)$ (ghi chú dòng 515). (ii) Định nghĩa 14.19 bỏ hai nhãn "mô hình sinh" và "mục tiêu" mà C8 đã thêm: "VAE: $p(z)$, $p_\theta(x\mid z)$; bộ mã hóa …; (8.1): …". (iii) Câu hỏi nối hai vế bằng dấu phẩy (P25 của lượt trước): "Gradient của (8.1) tính thế nào, (8.1) cho biết gì về mô hình sinh?" | "Lựa chọn Gaussian: (6.2) và $q_\phi(z\mid x)=\mathcal N(\ldots)$; …"; "VAE: mô hình sinh $p(z)$, $p_\theta(x\mid z)$; bộ mã hóa …; mục tiêu (8.1): …"; "…thế nào, và (8.1) cho biết gì …" |
| nhẹ | L14-6-04 | N6. NT20, P30 và C5 của lượt trước bị đảo lại một phần | "hội tụ trội (dominated convergence theorem): đổi chỗ đạo hàm, kỳ vọng."; "ReLU không thỏa khả vi liên tục ở dạng đã nêu." | "định lý hội tụ trội (…): đổi thứ tự đạo hàm và kỳ vọng."; "ReLU không thỏa giả thiết khả vi liên tục ở dạng đã nêu." |
| nhẹ | L14-5-08, 5-09, 5-01, 7-03 | N7. NT20 ("Trực quan." nêu cơ chế; diễn giải đi thẳng vào ý): rút chữ làm mất cơ chế hoặc làm câu thiếu động từ | L14-5-08: "**Trực quan.** KL tới tiên nghiệm trong (7.2) chỉ cần hai mômen của $q$." Lý do "log-mật độ Gaussian bậc hai theo $z$" chỉ còn ở ghi chú diễn giả. L14-5-09: "mã thay bằng $0$ cho …" bỏ chữ "trung bình", tức ý thay $Z$ bằng trung bình của nó (Bài tập 14.2 câu 2). L14-5-01: câu hỏi lại nối hai vế bằng dấu phẩy (P25). L14-7-03: "Bộ tự mã hóa: lỗi tái tạo; tuyến tính thì như PCA, mã không duy nhất." quay lại đúng câu P34 đã chỉ ra | L14-5-08: "… hai mômen của $q$, vì log-mật độ Gaussian bậc hai theo $z$." L14-5-09: "mã thay bằng trung bình $0$ …". L14-5-01: "…, và lệch …". L14-7-03: "Bộ tự mã hóa: học hai ánh xạ theo lỗi tái tạo; bản tuyến tính như PCA, mã không duy nhất." |
| nhẹ | L14-6-01 | N8. R10 sửa chưa đủ | "Mỗi $x_i$ một hậu nghiệm xấp xỉ $(\mu_i,s_i)$" | "Mỗi $x_i$ một hậu nghiệm xấp xỉ, tham số $(\mu_i,s_i)$: …" |
| nhẹ | L14-4-01 | N9. NT18, NT20: dòng "Trực quan." thành mảnh câu, đọc như một định nghĩa; ý "hai bước" chỉ còn ở ghi chú diễn giả | "**Trực quan.** Mô hình sinh (generative model): trạng thái ẩn, rồi quan sát quanh nó." | "**Trực quan.** Mô hình sinh (generative model) chọn trạng thái ẩn, rồi tạo quan sát quanh nó." |

`no-ai-slop` Detect: không có mẫu mới, ngoài các câu bị rút thành dạng điện tín đã nêu ở N1, N5–N9. Không có câu rào đón, câu điều hướng hay câu hỏi tu từ mới trên mặt trang. Ghi chú diễn giả L14-5-08 mở bằng mảnh câu "Lý do: log-mật độ Gaussian bậc hai theo $z$." Lỗi này nhỏ, sửa cùng N7.

## 6. Mạch truyện

Các trang đã đổi và hai trang lân cận mỗi bên không đổi thứ tự trang. Câu nối giữa các cụm còn trên mặt trang:

- L14-2-09 kết bằng "mã và tái tạo vẫn tuyến tính".
- L14-5-01 có "cần đo độ lệch".
- L14-5-08 nối với (7.2).
- L14-6-07 dẫn sang Bài tập 14.4. Khi sửa N1, dòng cuối của trang vẫn giữ vai này.

Mở đầu và Tổng kết đổi chữ nhưng không đổi cấu trúc:

- Luận điểm bìa vẫn là một câu có điều kiện.
- Trang "Vấn đề trung tâm" ở Tổng kết vẫn trả lời cho cả bài, gồm cơ chế sinh và giới hạn của ví dụ.
- Dòng nối ở L14-7-08 tách thành hai câu, nghĩa theo §11.

## 7. Kết luận

Còn mở: 0 chặn bàn giao, 0 nghiêm trọng, 2 trung bình (N1, N2), 7 nhẹ (N3–N9). Kiểm bằng máy đạt; hình mới đạt; ba điểm rà riêng đạt, chỉ còn N3 và N4 ở mức nhẹ.

**Kết luận: đạt khi sửa** (N1, N2).
