# Duyệt deck Bài 13 — Vai 5 `mach-truyen` (mạch truyện, liên kết, tập trung của mạch)

- **Deck (đóng băng):** `2627-1/lecture-13-quyet-dinh-tuan-tu-bat-dinh.html`, 57 trang, 7 mạch.
- **Đối chiếu:** `materials/lec-13/lecture-note.md` (thứ tự mục §1–§11), `materials/lec-13/exercises.md`, `planning/lec-13/storyboard.md` (§3 bảng mạch, §7 hành trình, §9 Tổng kết, §11 kỹ thuật), deck 07, deck 11, `planning/lec-12/storyboard.md` (tên kỹ thuật dùng chung).
- **Đã chạy:** đọc toàn bộ HTML (mặt trang và ghi chú diễn giả); `deck_lint.py` (1 phát hiện: L13-7-04 SYLL60 63 > 60, thuộc phạm vi vai `sinh-vien`, không xếp ở đây). Không chạy kiểm tra trình duyệt; vai này không cần ảnh.
- **Văn bản đề xuất** viết theo `no-ai-slop` (Detect cho deck, câu thay thế tự kiểm) và NT17–NT20; số âm tiết dự kiến lấy từ bảng §6.8 của storyboard cộng hoặc trừ số token thay đổi, người sửa phải đếm lại bằng script.

## 1. Rà tập trung theo từng mạch

### Mạch 1 — Mở đầu

Câu hỏi của mạch: câu hỏi trung tâm của bài (không phải mạch nội dung).

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Mục ghi chú | Đề xuất |
|---|---|---|---|---|---|---|---|
| L13-1-01 | Bìa, luận điểm một câu có điều kiện | Toàn bài | Bìa | — | Luận điểm dẫn cả bài | Mở đầu, Hệ quả 13.18, Định lý 13.19 | giữ |
| L13-1-02 | "Nhắc lại:" Định lý 07.49, Bài 10, Định lý 11.7, cấp số nhân, chuẩn cực đại; "Ký hiệu:" | Tiên quyết | Tiên quyết | Bài 07, 10, 11 | (4.4), Mệnh đề 13.8, chuẩn $\infty$, Hệ quả 13.26 | Kiến thức tiên quyết | giữ (Mệnh đề 12.16 của ghi chú không được bài dùng, xem §4) |
| L13-1-03 | Sáu mục tiêu, đủ sáu MT của ghi chú | Toàn bài | Mục tiêu | — | — | Mục tiêu học tập | giữ |
| L13-1-04 | Nội dung: 7 mạch, `#/1`…`#/7`, tên trùng trang tiêu đề mạch; dòng đọc trước | Toàn bài | Nội dung | — | — | §11 | giữ |
| L13-1-05 | Một hộp "Câu hỏi:" đúng câu in đậm d.11 | Câu hỏi trung tâm | Vấn đề trung tâm | — | Ghi chú diễn giả trả lời theo mạch | Mở đầu d.11 | giữ |
| L13-1-06 | Ví dụ robot $h/z$: dữ kiện, so một bước, hai số $20/11$, $6$ | Câu hỏi mở đầu | Vấn đề cụ thể | L13-1-05 | Mạch 3 (L13-3-04, L13-3-11), mạch 5 (L13-5-04) | Câu hỏi mở đầu, §3 Ví dụ 13.1 | giữ (đã chốt, điểm 3) |

### Mạch 2 — Xích Markov và phân phối trạng thái

Câu hỏi của mạch (storyboard §3): khi bước sau chỉ phụ thuộc trạng thái hiện tại, tính phân phối trạng thái sau $t$ bước thế nào? Có trên mặt trang ở L13-2-01 dưới dạng cụ thể ("Robot còn hoạt động sau hai bước với xác suất bao nhiêu?") và ở dạng tổng quát ở L13-2-03. Đạt.

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Mục ghi chú | Đề xuất |
|---|---|---|---|---|---|---|---|
| L13-2-00 | Tiêu đề mạch, dòng dẫn nêu kết quả của mạch | Toàn mạch | Điểm vào | Mạch 1 | L13-2-01 | §4 | giữ |
| L13-2-01 | Ví dụ dẫn nhập, cây hai bước, $0{,}71$ | Phân phối bước sau = tổng theo đường đi | Vấn đề + trực quan | Robot của mạch 1 (không nêu vì sao bỏ hành động) | L13-2-02, L13-2-03 | §4 mở đầu, Ví dụ 13.2 | sửa nhẹ (P7) |
| L13-2-02 | Định nghĩa 13.1, ma trận chuyển | Tính Markov, $P$ | Phát biểu | L13-2-01 | (4.1), (4.2) dùng ở L13-2-03, L13-3-02 | §4.1 | giữ |
| L13-2-03 | Mệnh đề 13.2, Hệ quả 13.3 | $\mu_t=\mu_0P^t$, (4.4) | Kết quả | L13-2-02 | (4.4) dùng ở L13-2-05, L13-3-03 ("Dưới $\pi$ … ma trận $P^\pi$") | §4.2 | giữ |
| L13-2-04 | Ví dụ 13.3, Markov khác độc lập | Kiểm tra cách đọc (4.3) | Ví dụ + kiểm tra | L13-2-03 | Ghi chú: không i.i.d. như Bài 12 | §4.2, Nhận xét 13.4 | giữ |
| L13-2-05 | Bài tập 13.1 có lời giải | Kiểm tra mục tiêu 1 | Bài tập | L13-2-03 | L13-3-01 ("Mỗi hành động chọn một hàng chuyển tiếp") | §4.2 | giữ |

### Mạch 3 — Quá trình quyết định Markov và giá trị của chính sách

Câu hỏi của mạch: đo và tính giá trị của một cách chọn hành động cố định thế nào? Có trên mặt trang ở dòng đầu L13-3-01 ("cần giá trị dài hạn của một cách chọn cố định"); phân rã "giá trị = thưởng một bước + $\gamma$ × giá trị kỳ vọng kế tiếp" ở L13-3-06. Đạt.

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Mục ghi chú | Đề xuất |
|---|---|---|---|---|---|---|---|
| L13-3-00 | Tiêu đề mạch | Toàn mạch | Điểm vào | $P$ của mạch 2, robot mạch 1 (ghi chú) | L13-3-01 | §5 | giữ |
| L13-3-01 | Định nghĩa 13.5, nhãn O1, M2, O2 | Đối tượng của mô hình | Vấn đề + phát biểu | L13-2-05 | L13-3-02 | §2, §5.1 | giữ |
| L13-3-02 | Lịch sử, (M1), (5.1), (5.2) | $P(s'\mid s,a)$, $r(s,a)$ | Phát biểu | L13-3-01 | (5.1) dùng ở L13-3-08; (5.2) ở L13-3-03 | §2, §5.1 | giữ |
| L13-3-03 | Định nghĩa 13.6, (5.3), $P^\pi$ | Cách chọn cố định | Phát biểu; nối lại mạch 2 | L13-3-02, Mệnh đề 13.2 | L13-3-09, L13-3-11 | §5.1 | giữ |
| L13-3-04 | Định nghĩa 13.7, Mệnh đề 13.8 | "Đo" giá trị | Vấn đề ($+\infty$) + trực quan + phát biểu | L13-1-06 (luôn chọn $B$) | L13-3-05, L13-3-08 (phần đuôi), L13-5-08 | §5.2 | giữ |
| L13-3-05 | Bài tập 13.4 có lời giải | Kiểm tra (5.4), (5.6) | Bài tập | L13-3-04 | L13-3-06 ($G_t=R_{t+1}+\gamma G_{t+1}$ ở ghi chú diễn giả) | `exercises.md` 13.4 | giữ |
| L13-3-06 | Định nghĩa 13.9, $Q_U$, $T^\pi$ | Phân rã một bước | Trực quan + phát biểu | L13-3-05 | L13-3-07, L13-4-01 | §5.3 | giữ |
| L13-3-07 | Bổ đề 13.11 | Công cụ so $V^\rho$ với $U$ | Kết quả chính | L13-3-06 | L13-3-10, L13-5-02 | §5.3 | sửa nhẹ (P4): mặt trang chưa nói trang điền phần nào |
| L13-3-08 | Ý tưởng chứng minh Bổ đề 13.11 (13.10, tổng lồng, phần đuôi) | Như trên | Ý tưởng chứng minh | L13-3-07 | L13-3-10 | §5.3 | giữ |
| L13-3-09 | Định lý 13.12 | "Tính" giá trị: hệ tuyến tính | Kết quả chính + ứng dụng | L13-3-07 | L13-3-10, L13-3-11, L13-4-07 | §5.3 | giữ |
| L13-3-10 | Ý tưởng chứng minh Định lý 13.12 | Như trên | Ý tưởng chứng minh | L13-3-09 | L13-3-11 | §5.3 | giữ |
| L13-3-11 | Ví dụ 13.4–13.5, ba giá trị | Câu trả lời cụ thể của mạch | Ví dụ, câu nối ra | L13-3-09, L13-1-06 | L13-4-01 ("còn phải so $6$ với mọi chính sách") | §5.1, §5.3 | giữ |

### Mạch 4 — Toán tử Bellman tối ưu và ánh xạ co

Câu hỏi của mạch: phương trình $U=TU$ có nghiệm duy nhất không và tìm nghiệm bằng cách nào? Có trên mặt trang ở dòng "Câu hỏi:" của L13-4-01. Đạt.

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Mục ghi chú | Đề xuất |
|---|---|---|---|---|---|---|---|
| L13-4-00 | Tiêu đề mạch | Toàn mạch | Điểm vào | Định lý 13.12, số chính sách (ghi chú) | L13-4-01 | §6.1–6.2 | giữ |
| L13-4-01 | Định nghĩa 13.13, câu hỏi của mạch | Đặt phương trình | Vấn đề + trực quan + phát biểu | L13-3-11 | L13-4-02 ("Lặp $U\leftarrow TU$ hội tụ khi …") | §6.1 | giữ (liên hệ với Định lý 07.49 chỉ ở ghi chú, xem §3) |
| L13-4-02 | Định nghĩa 13.14, ví dụ $x/2+1$, phản ví dụ $x+1$ | Công cụ: tính co | Phát biểu + ví dụ | L13-4-01 | L13-4-03, L13-4-05 | §6.2 | giữ |
| L13-4-03 | Bổ đề 13.15, Mệnh đề 13.16 | $T$ co | Kết quả chính | L13-4-02 | L13-4-04, L13-4-07 | §6.2 | giữ |
| L13-4-04 | Ý tưởng chứng minh Mệnh đề 13.16 | Như trên | Ý tưởng chứng minh; "Nhắc lại:" kỹ thuật deck 12 | L13-4-03 | L13-4-05 | §6.2 | giữ |
| L13-4-05 | Định lý 13.17 | Tồn tại, duy nhất, hội tụ | Kết quả chính | L13-4-02 | L13-4-06, L13-4-07 | §6.2 | giữ |
| L13-4-06 | Ý tưởng chứng minh Định lý 13.17 | Như trên | Ý tưởng chứng minh | L13-4-05 | L13-4-07 | §6.2 | sửa nhẹ (P9) |
| L13-4-07 | Kỹ thuật nguyên lý ánh xạ co + Hệ quả 13.18 | Câu trả lời của mạch | Kỹ thuật + kết quả | L13-4-03, L13-4-05 | L13-5-01 ("$\bar V=V^*$ không") | §6.2 | sửa nhẹ (P3): tiêu đề không gọi tên câu trả lời |

### Mạch 5 — Giá trị tối ưu và chứng nhận sai số

Câu hỏi của mạch: chính sách tham lam theo điểm bất động, hoặc theo vector lặp sau hữu hạn vòng, tốt đến mức nào? Có trên mặt trang ở dòng "Câu hỏi:" của L13-5-01. Đạt. L13-5-08 (bỏ $\gamma<1$) nằm ngoài phân rã ghi trong storyboard (P2).

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Mục ghi chú | Đề xuất |
|---|---|---|---|---|---|---|---|
| L13-5-00 | Tiêu đề mạch | Toàn mạch | Điểm vào | $\bar V$, (6.7) | L13-5-01 | §6.3–6.5 | sửa nhẹ (P2: thêm từ khóa) |
| L13-5-01 | Định lý 13.19, (6.8) | Đạt $\bar V$, không vượt $\bar V$ | Vấn đề + trực quan + kết quả chính | L13-4-07 | L13-5-02 | §6.3 | giữ |
| L13-5-02 | Ý tưởng chứng minh Định lý 13.19 (kẹp) | Như trên | Ý tưởng chứng minh; dùng lại Bổ đề 13.11 | L13-3-07, L13-5-01 | L13-5-03 | §6.3 | giữ |
| L13-5-03 | Ví dụ 13.6, bảng bốn vòng | Câu trả lời cho robot | Ví dụ | L13-5-01, L13-1-06 | L13-5-04 | §6.3 | giữ |
| L13-5-04 | Ví dụ 13.6, điểm bất động $6$, Hình 13.2 | Đóng câu hỏi mở đầu | Ví dụ, đóng luồng câu hỏi mở đầu | L13-5-03 | L13-5-05 | §6.3 | giữ |
| L13-5-05 | Hệ quả 13.21, Mệnh đề 13.22 | Mất mát khi dừng sớm | Vấn đề + kết quả phụ | L13-5-04 ((6.7) chứa $V^*$) | L13-5-06 | §6.4 | giữ |
| L13-5-06 | Thuật toán 13.23, robot $k=39$ | Tiêu chuẩn dừng | Thuật toán + ứng dụng | L13-5-05 | L13-5-07 | §6.4 | giữ |
| L13-5-07 | Bài tập 13.2 có lời giải | Kiểm tra mạch 4 (a) và mạch 5 (b), (c) | Bài tập | L13-4-03, L13-5-05 | L13-5-08 | §6.4 | giữ |
| L13-5-08 | Ví dụ 13.8, $\gamma=1$; câu nối sang mạch 6 | Giới hạn của Hệ quả 13.18, Định lý 13.19 | Phản ví dụ + câu nối ra | L13-3-04 ($+\infty$), L13-4-02 ($x+1$) | L13-6-01 ("Các kết quả trên đều giả sử biết chính xác $P$, $r$") | §6.5 | sửa nhẹ (P2) |

### Mạch 6 — Học từ trải nghiệm

Câu hỏi của mạch: khi chưa biết $P$, $r$, dữ liệu tương tác thay mô hình được đến đâu? Mặt trang L13-6-01 chỉ nêu phần đầu ("Robot thật chưa biết $P(\cdot\mid h,A)$"); vế "đến đâu" chỉ có ở dòng dẫn L13-6-00 (dạng câu trả lời) và hiện ra ở L13-6-05, L13-6-06 (nửa sau mạch). Xếp `nhẹ` vì dòng dẫn đã nêu câu trả lời trên mặt trang (P5).

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Mục ghi chú | Đề xuất |
|---|---|---|---|---|---|---|---|
| L13-6-00 | Tiêu đề mạch | Toàn mạch | Điểm vào | Thuật toán 13.23 cần $P,r$ | L13-6-01 | §7–§8 | giữ |
| L13-6-01 | Định nghĩa 13.25, Hệ quả 13.26 | Ước lượng hàng chuyển | Vấn đề + trực quan + kết quả phụ | L13-5-08, Định lý 11.7 | L13-6-02, L13-6-04, L13-6-05 | §7.1 | sửa nhẹ (P5) |
| L13-6-02 | MLE từ quỹ đạo, thăm dò | Điều kiện dùng (7.3) | Nhận xét | L13-6-01 ("Một quỹ đạo vẫn cho MLE (7.3)") | L13-6-03 (không có câu nối) | §7.2 | giữ |
| L13-6-03 | Định nghĩa 13.27, 13.28, (7.6) | Hai cách dùng dữ liệu | Phát biểu (đọc thêm ở ghi chú diễn giả) | L13-6-02 (thiếu câu nối) | L13-6-04 | §7.3–7.4 | sửa nhẹ (P6) |
| L13-6-04 | Bài tập 13.3 có lời giải | Kiểm tra mục tiêu 6 | Bài tập | L13-6-01, L13-6-03 | L13-6-05 | §7.4 | giữ |
| L13-6-05 | Tình huống 13.1 | Bảo đảm chỉ thuộc mô hình ước lượng | Ứng dụng, giả thiết bị vi phạm | L13-6-01, L13-3-11 | L13-6-06 | §8 | giữ |
| L13-6-06 | Tình huống 13.2 | Trạng thái phải thỏa (5.1) | Ứng dụng, giả thiết bị vi phạm | L13-2-02 (4.1), Nhận xét 07.47 | L13-7-08 (biến ẩn, Bài 14) | §8 | giữ |

### Mạch 7 — Tổng kết

Không khái niệm mới: đạt (L13-7-04 dùng một MDP mới của Bài tập 13.13, không phải khái niệm mới).

| ID | Chức năng thực tế | Phần việc phục vụ | Vai trò trong mạch | Kết nối vào | Kết nối ra | Mục ghi chú | Đề xuất |
|---|---|---|---|---|---|---|---|
| L13-7-00 | Tiêu đề mạch "Tổng kết" | Toàn bài | Điểm vào | Mạch 2–6 | L13-7-01 | §8–§11 | giữ |
| L13-7-01 | Bảng tổng kết, 5 hàng | Kết quả mạch 2–4 | Tổng kết | Mạch 2–4 | L13-7-02 | §8 | giữ |
| L13-7-02 | Bảng tổng kết (tiếp), 3 hàng | Kết quả mạch 5–6 | Tổng kết | Mạch 5–6 | L13-7-03 | §8 | giữ |
| L13-7-03 | Năm dòng kết quả + dòng điều kiện | Trả lời câu hỏi trung tâm | Vấn đề trung tâm | L13-1-05 | L13-7-04 | §8, §10 | sửa (P1) |
| L13-7-04 | Đề Bài tập 13.13 | Tổng hợp mạch 3–5 | Bài tập tổng hợp | Định lý 13.19, (6.7) | L13-7-05 | `exercises.md` 13.13 | giữ |
| L13-7-05 | Lời giải Bài tập 13.13 | Như trên | Lời giải | L13-7-04 | L13-7-06 | `exercises.md` 13.13 | giữ |
| L13-7-06 | Bốn câu tự kiểm tra | Nhầm lẫn của ghi chú | Kiểm tra | Mạch 5–6 | — | §6.3–6.5, §7.4 | giữ |
| L13-7-07 | Bảng `Mục \| Bài tập`, liên kết trình xem | Bài tập về nhà | Bài tập | Mạch 2–6 | — | §9, `exercises.md` | sửa nhẹ (P8) |
| L13-7-08 | Tài liệu tham khảo, dòng nối Bài 14 | Nối bài sau | Tài liệu | L13-6-06 | Bài 14 | §10–§11 | giữ |

## 2. Phát hiện

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| trung bình | L13-7-03 | P1. NT15, NT13: trang "Vấn đề trung tâm" của Tổng kết tóm tắt lần lượt kết quả mạch 3, 4, 5 (trùng các hàng của L13-7-01, L13-7-02) thay vì trả lời câu hỏi trung tâm của cả bài. Dòng đầu là đánh giá chính sách, không phải bước tìm chính sách tối ưu; chuỗi trả lời của ghi chú (liệt kê không khả thi → phương trình Bellman tối ưu một bước → lặp giá trị → chính sách tham lam) chỉ có trong ghi chú diễn giả. | Mặt trang: "Chính sách dừng: giá trị là nghiệm duy nhất của $V=r^\pi+\gamma P^\pi V$." Ghi chú diễn giả: "Liệt kê không khả thi: có $\prod_s\lvert\mathcal A(s)\rvert$ chính sách tất định dừng …". Ghi chú d.1632–1636: "**Liệt kê không đủ.** … **Quy hoạch động thay thế liệt kê.** Định lý 13.19 cho giá trị tối ưu là nghiệm duy nhất của phương trình Bellman tối ưu $V^*=TV^*$, chỉ cần mô hình một bước …". | Thay năm dòng đầu bằng chuỗi trả lời, giữ dòng điều kiện (ước lượng ≈ 59 âm tiết, 6 dòng; đếm lại): (1) "Liệt kê: $\prod_s\lvert\mathcal A(s)\rvert$ chính sách tất định dừng, chưa kể chính sách theo lịch sử." (2) "$V^*$ là nghiệm duy nhất của $V=TV$, tìm bằng lặp giá trị từ mọi $V_0$." (3) "Chính sách tham lam theo $V^*$ tối ưu trong mọi chính sách." (4) dòng dừng giữ nguyên. (5) dòng robot giữ nguyên. (6) "Điều kiện: …" giữ nguyên. Dòng đánh giá chính sách đã có ở L13-7-01. |
| nhẹ | L13-5-08, L13-5-00 | P2. NT13: trang chỉ ra giới hạn của Hệ quả 13.18 và Định lý 13.19 khi $\gamma=1$, nằm ngoài câu hỏi của mạch 5 trong storyboard ("… tốt đến mức nào?") và ngoài từ khóa của L13-5-00; ghi chú diễn giả L13-5-00 có nêu, mặt trang thì không. Thứ tự đúng §6.5, nên trang ở đúng mạch. | Storyboard §3, mạch 5: "(đạt $\bar V$; không chính sách nào vượt $\bar V$; mất mát khi dừng sớm)". L13-5-00 từ khóa: "Giá trị tối ưu · Phương trình Bellman tối ưu · Phần dư Bellman · Tiêu chuẩn dừng". Ghi chú d.1325: "Các kết quả của Mục 5 và Mục 6 dùng $\gamma<1$ …". | Thêm vào phân rã câu hỏi mạch 5 trong storyboard "; điều gì hỏng khi $\gamma=1$", và thêm từ khóa thứ năm trên L13-5-00: "Hệ số chiết khấu bằng một". Không đổi mật độ L13-5-08 (59). |
| nhẹ | L13-4-07 | P3. NT13, NT16: trang mang câu trả lời của mạch 4 (Hệ quả 13.18, "Hội tụ của lặp giá trị" trong ghi chú) nhưng tiêu đề chỉ gọi tên kỹ thuật; dòng "Kỹ thuật." nhắc lại gần nguyên văn Định lý 13.17 ở L13-4-05. | "**Kỹ thuật.** $F$ co hệ số $\kappa<1$ thì $x=F(x)$ có nghiệm duy nhất và phép lặp hội tụ theo $\kappa^k$." Ghi chú d.1016: "Hệ quả 13.18 (Hội tụ của lặp giá trị)". | Đổi tiêu đề thành "Nguyên lý ánh xạ co và hội tụ của lặp giá trị" (giữ tên kỹ thuật đứng đầu theo NT7). Không đổi mặt trang. |
| nhẹ | L13-3-07 | P4. NT13 (câu nối không gọi tên phần việc): mặt trang không nói vì sao cần so $V^\rho$ với $U$; câu nêu vai trò chỉ ở ghi chú diễn giả. | Ghi chú diễn giả: "Việc so sánh tổng thưởng vô hạn bước rút về một bất đẳng thức một bước tại từng lịch sử." Ghi chú d.622: "Nếu tại mọi lịch sử, kỳ vọng của một bước nhìn trước theo $U$ không vượt $U$ … thì cả chuỗi vô hạn cũng không vượt $U$." | Thêm dòng đầu: "So $V^\rho$ với $U$ rút về một bất đẳng thức một bước tại từng lịch sử." (+14, ≈ 59 âm tiết, 5 dòng). |
| nhẹ | L13-6-01 | P5. NT13: câu hỏi của mạch 6 chỉ có vế "chưa biết $P$"; vế "thay mô hình được đến đâu" chưa có trên trang nội dung đầu tiên. | Mặt trang: "Robot thật chưa biết $P(\cdot\mid h,A)$." Storyboard §3: "Khi chưa biết $P$, $r$, dữ liệu tương tác thay mô hình được đến đâu?" | Thay câu đầu bằng "**Câu hỏi:** chưa biết $P(\cdot\mid h,A)$, số đếm thay được đến đâu?" và chuyển "Trạng thái chưa xuất hiện nhận xác suất $0$;" sang ghi chú diễn giả (đã có ý này qua Nhận xét 11.8); giữ vế "$m=0$ thì …" vì là kết luận của Hệ quả 13.26. Ước lượng 58 âm tiết. |
| nhẹ | L13-6-03 | P6. NT13, NT8: trang mở thẳng bằng Định nghĩa 13.27, không có câu nối từ số đếm (L13-6-01, L13-6-02) sang hai cách dùng dữ liệu. | Mặt trang dòng 1: "**Định nghĩa 13.27.** *Học tăng cường dựa trên mô hình* …". Ghi chú d.1443: "Cùng một tập dữ liệu chuyển tiếp có thể được dùng theo hai cách: học mô hình rồi quy hoạch, hoặc học trực tiếp đại lượng cần cho quyết định." | Chèn "Từ cùng dữ liệu $(s,a,c,s')$," ngay sau nhãn Định nghĩa 13.27 (+3, ≈ 59 âm tiết). |
| nhẹ | L13-2-01 | P7. NT13: chuyển từ robot hai hành động (L13-1-06) sang robot không có hành động mà mặt trang không nêu lý do; câu nối chỉ ở ghi chú diễn giả L13-2-00. | L13-2-00 ghi chú: "Robot vận hành theo một quy tắc cố định". Ghi chú d.149: "Trước khi robot được chọn hành động, xét robot vận hành theo một quy tắc cố định". Mặt trang: "Hai trạng thái: $h$ (hoạt động), $n$ (nghỉ); robot bắt đầu ở $h$." | Đổi "Hai trạng thái:" thành "Chưa có hành động:" (+1, 59 âm tiết). |
| nhẹ | L13-7-07 | P8. NT15: Bài tập 13.14 xếp vào mạch 5, nhưng đề chỉ cần (5.4) và định nghĩa $V^*$, chính sách tối ưu (L13-3-04); ghi chú diễn giả biện minh bằng (6.8), là công thức của phần "Kiểm tra lại" trong lời giải, không phải của đề. | Ghi chú diễn giả: "13.7, 13.9, 13.10, 13.14 cần phương trình Bellman tối ưu (6.8)". Đề 13.14 (bt d.469–475): "Dùng chính sách tối ưu này và (5.4), biểu diễn $V^*(\mathrm A)$ theo $\gamma$". | Chuyển 13.14 sang hàng mạch 3 và sửa câu biện minh; nếu điều phối viên muốn giữ ở mạch 5 theo mục tiêu 5, sửa câu thành "13.14 kiểm tra mục tiêu 5" thay cho "cần (6.8)". Cập nhật bảng §9 của storyboard. |
| nhẹ | L13-4-06 | P9. NT13 (trùng lặp nhẹ): dòng cuối lặp phản ví dụ $F(x)=x+1$ của L13-4-02 mà không nói bước nào hỏng, trong khi ghi chú diễn giả nói $\kappa<1$ vào ở bước 1 và bước 3. Phản ví dụ này xuất hiện ba lần trên mặt trang (L13-4-02, L13-4-06, L13-5-08). | "Với $\kappa=1$: $F(x)=x+1$ không có điểm bất động." Ghi chú diễn giả: "Giả thiết $\kappa<1$ vào ở bước duy nhất và bước Cauchy". | "Với $\kappa=1$, bước 1 và bước 3 hỏng: $F(x)=x+1$ không có điểm bất động." (+5, ≈ 60 âm tiết; nếu vượt trần thì bỏ vế sau dấu hai chấm). |

Không có phát hiện `chặn bàn giao` hay `nghiêm trọng`.

## 3. Các mục kiểm khác

- **Số mạch và "Nội dung":** 7 `<section>` ngoài; L13-1-04 liên kết `#/1` … `#/7` khớp `id="mach-2"` … `id="mach-7"` với `hashOneBasedIndex:true`; tên mục trùng tên trên trang tiêu đề mạch; số "2." … "7." khớp. Tên mạch khác tiêu đề trang nội dung đầu tiên (L13-4-00 "Toán tử Bellman tối ưu và ánh xạ co" so với L13-4-01 "Toán tử Bellman tối ưu": khác, nhưng gần). Đạt.
- **Dòng dẫn:** sáu câu trần thuật, không "Muốn …", không "Nhu cầu:", khuôn câu khác nhau (L13-5-00 và L13-6-00 cùng dạng "A; B", chấp nhận được). Đạt.
- **"Vấn đề trung tâm" mở đầu (L13-1-05):** một hộp, đúng câu in đậm d.11. Đạt.
- **Thứ tự mạch và khái niệm theo mục ghi chú:** mạch 2 = §4, mạch 3 = §5, mạch 4 = §6.1–6.2, mạch 5 = §6.3–6.5, mạch 6 = §7–§8 (Tình huống 13.1, 13.2), mạch 7 = §8 (phần tổng kết), §9–§11. Trong từng mạch, số hiệu tăng dần; lệch duy nhất: Ví dụ 13.4 (§5.1) gộp vào L13-3-11 sau Định lý 13.12, đã ghi trong storyboard §12 điểm 1. Đạt.
- **Câu nối giữa các mạch trên mặt trang:** 2→3 (L13-3-01 dòng 1; L13-3-03 "Dưới $\pi$ … ma trận $P^\pi$"), 3→4 (L13-3-11 "còn phải so $6$ với mọi chính sách" → L13-4-01 "Liệt kê …"), 4→5 (L13-5-01 "Câu hỏi:"), 5→6 (L13-5-08 dòng cuối → L13-6-01), 6→7 (L13-6-06 → dòng nối Bài 14 ở L13-7-08). 1→2 thiếu lý do bỏ hành động (P7). Đạt khi sửa.
- **Luồng câu hỏi mở ra và đóng lại** (bảng kiểm Threads của `quill`): câu hỏi mở đầu robot (L13-1-06) đóng ở L13-5-04 và L13-7-03; "so với mọi cách chọn, kể cả theo lịch sử" (ghi chú L13-1-06) đóng ở L13-5-02 bước 2; "$+\infty$ khi không chiết khấu" (L13-3-04) và "$z$ hấp thụ" (L13-1-06) đóng ở L13-5-08; "lặp $V\leftarrow r^\pi+\gamma P^\pi V$" (L13-3-09) đóng ở L13-4-07 dòng cuối; bit cũ của cảm biến (L13-6-06) đóng bằng dòng nối Bài 14. Không có luồng bỏ dở.
- **Không xem trước bài sau trên mặt trang:** chỉ dòng nối ở L13-7-08, bằng lời. MDP quan sát một phần và ELBO chỉ ở ghi chú diễn giả. Đạt.
- **Không trùng lặp với deck liền kề:** deck 07 có phương trình Bellman tất định và ví dụ đồ thị tầng; deck 13 chỉ "Nhắc lại:" Định lý 07.49 (L13-1-02) và Nhận xét 07.47 (L13-6-06). Deck 11 có MLE phân loại; deck 13 chỉ nhắc Định lý 11.7. Đạt.
- **Liên tục với deck trước:** hai tên kỹ thuật "so với phần tử bất kỳ rồi lấy cận dưới đúng" (L13-4-04) và "chèn một đại lượng trung gian rồi chuyển vế" (L13-5-05) trùng nguyên văn dòng "Kỹ thuật." của L12-5-07 trong storyboard 12 (d.663, Q8). "Tổng lồng (telescoping sum)" trùng deck 04. "Kẹp" mới ở deck 13 (không deck trước nào dùng). Dòng nối của deck 12 ("hành động đổi phân phối của trạng thái kế tiếp, nên dữ liệu không còn i.i.d.") được deck 13 tiếp ở ghi chú diễn giả L13-1-01, L13-2-04. Liên hệ (6.8) với Định lý 07.49 chỉ ở ghi chú diễn giả L13-4-01, L13-5-01; L13-4-01 đã ở 58 âm tiết, 6 dòng nên không đề xuất thêm lên mặt trang.
- **Tổng kết (NT15):** thứ tự bảng tổng kết → "Vấn đề trung tâm" → bài tập tổng hợp có "Lời giải:" → "Câu hỏi tự kiểm tra" (4 câu, đáp án ở ghi chú diễn giả) → "Bài tập về nhà" → "Tài liệu tham khảo". Không khái niệm mới. Đạt, trừ P1.
- **Bảng `Mục | Bài tập` (L13-7-07):** phủ đủ 14 bài (13.1–13.14), mỗi bài một lần; tên mục trùng tên mạch. Đối chiếu kiến thức cuối cùng cần: 13.1 (Mệnh đề 13.2) mạch 2; 13.4 (5.4), 13.5 (Định nghĩa 13.5), 13.6 (Bổ đề 13.10), 13.8 và 13.11 (Định lý 13.12) mạch 3; 13.12 (Hệ quả 13.18) mạch 4; 13.2 (Hệ quả 13.21, Mệnh đề 13.22), 13.7, 13.9, 13.10 (6.8), 13.13 (Định lý 13.19) mạch 5; 13.3 (Hệ quả 13.26, (7.6)) mạch 6. Lệch: 13.14 (P8).
- **Liên kết trình xem:** `material-viewer.html?doc=materials/lec-13/lecture-note.md&deck=lecture-13-quyet-dinh-tuan-tu-bat-dinh.html` và bản `exercises.md` tương ứng, đúng hợp đồng trình xem. Đạt.
- **Dòng nối sang bài sau:** "Bài 14 xét mô hình có biến ẩn, như bit cũ của cảm biến." khớp d.1637–1639. Tài liệu tham khảo khớp §11 (Murphy 2023; Sutton và Barto 2018; Bertsekas 2017). Đạt.

## 4. Đề xuất sửa ghi chú (NT3; deck vẫn theo ghi chú)

1. d.42, "Kiến thức tiên quyết": Mệnh đề 12.16 (ba nguồn sai số) được liệt kê nhưng không được dùng ở đâu trong thân ghi chú (grep "12.16" chỉ cho d.42). Đề xuất: bỏ khỏi danh sách, hoặc dẫn nó tại d.1041 ("Sai số do lấy mẫu và do xấp xỉ hàm nằm ngoài Hệ quả 13.18"). Deck không nhắc Mệnh đề 12.16 ở L13-1-02, nhất quán với cách dùng thực tế.
2. Thuật ngữ liên bài: ghi chú Bài 07 gọi khái niệm này là "trạng thái đủ" (Nhận xét 07.47, deck 07: "trạng thái đủ"), ghi chú Bài 13 viết "trạng thái đủ thông tin" (d.1600) và deck 13 theo đó (từ khóa L13-6-00, ghi chú diễn giả L13-7-02). Đề xuất ghi chú Bài 13 viết "trạng thái đủ thông tin (còn gọi là trạng thái đủ, Nhận xét 07.47)" ở lần đầu, hoặc thống nhất một tên.

## 5. Kết luận

**đạt khi sửa** — 0 chặn bàn giao, 0 nghiêm trọng, 1 trung bình (P1, L13-7-03), 8 nhẹ (P2–P9). Mọi mạch nội dung có câu hỏi trên mặt trang trước nửa sau của mạch; thứ tự mạch và khái niệm khớp thứ tự mục của ghi chú.
