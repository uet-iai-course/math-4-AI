# Bảng ánh xạ số hiệu Bài 07 (viết lại theo mẫu SLT, 2026-11-12)

Kế hoạch: `SP/lec07/plan.md`; quyết định Q07-1 đến Q07-10 của điều phối viên: `SP/lec07/decisions.md`. Bản nháp: `SP/lec07/draft-v1.md`.

**Cách thay ở giai đoạn 3.** Thay bằng **một lượt** ánh xạ cũ → mới đọc từ bảng (một từ điển trong script), không thay tuần tự, ranh giới số đầy đủ (`07\.2\b` không khớp `07.27`), thay cả các số đứng sau trong danh sách ("Định lý 07.13, 07.20"), loại khối xác định theo từ đứng trước số đầu của danh sách. Thuật toán vào bộ đếm chung (Q-A), nên khóa của từ điển gồm cả loại khối ("Thuật toán 07.1" → 07.27, khác "Nhận xét 07.27" cũ → 07.24). Quy luật:

- bộ đếm chung: bỏ Định nghĩa 07.1 (→ Định nghĩa 02.9 và dạng (1.1) ở §1), Hệ quả 07.4 (→ Định lý 02.15 và (4.1) ở §4.3), Mệnh đề 07.8 (→ Mệnh đề 02.10(b) ở §5.2); cũ 07.2–07.3 trừ 1; cũ 07.5–07.7 trừ 2; cũ 07.9–07.29 trừ 3; Thuật toán 07.1 → 07.27; Bổ đề 07.30 → **07.36**, Mệnh đề 07.31 → **07.37** (dời sau định lý Bland, Q07-1); cũ 07.32–07.34 trừ 4, cũ 07.35–07.38 trừ 3; Thuật toán 07.2 → 07.31 chen giữa (07.32–07.34 → 07.28–07.30, 07.35–07.38 → 07.32–07.35); cũ 07.39–07.44 trừ 1; Thuật toán 07.3 → 07.44; 07.45–07.51 **giữ số**; Thuật toán 07.4 → 07.52; cũ 07.52–07.54 cộng 1;
- Ví dụ 07.1–07.30, Tình huống 07.1–07.4, Bài tập 07.1–07.18 giữ số;
- nhãn công thức: (1.1) giữ; (1.2) → (4.1); $(k.m)$ → $(k{+}3.m)$ với $k=2,3,5,6,7$.

Cột "Dẫn chiếu ngoài" đếm token "Loại 07.k" (grep `materials/*/*.md` trừ `lec-07/`, và `lecture-*.html`, 2026-11-12). `lec-07/exercises.md` cũ thay ở giai đoạn 2 nên không chạy từ điển. Các tệp `planning/` là nhật ký: không sửa.

## 1. Bộ đếm chung (định nghĩa, định lý, mệnh đề, bổ đề, hệ quả, nhận xét, thuật toán)

| Cũ | Mới | Mục mới | Thay đổi | Dẫn chiếu ngoài (grep 2026-11-12) | Giai đoạn 3 |
|---|---|---|---|---|---|
| Định nghĩa 07.1 | **bỏ** → Định nghĩa 02.9 + (1.1) | §1 (văn xuôi) | Q-D; thuật ngữ phương án, miền khả thi, giá trị và nghiệm tối ưu viết ở §1 | — | |
| Mệnh đề 07.2 | Mệnh đề 07.1 | §4.2 | Điều kiện/Phạm vi thành câu sau khối | — | |
| Nhận xét 07.3 | Nhận xét 07.2 | §4.2 | | — | |
| Hệ quả 07.4 (+ chứng minh) | **bỏ** → Định lý 02.15 + (4.1) | §4.3 (câu) | Q-D | — | |
| Định nghĩa 07.5 | Định nghĩa 07.3 | §5.1 | | — | |
| Mệnh đề 07.6 | Mệnh đề 07.4 | §5.1 | | — | |
| Định nghĩa 07.7 | Định nghĩa 07.5 | §5.2 | giả thiết hạng gọi là (L1) | — | |
| Mệnh đề 07.8 (+ chứng minh) | **bỏ** → Mệnh đề 02.10(b) | §5.2 (câu) | Q-D; bảng chuyển dạng cũ bỏ | — | |
| Nhận xét 07.9 | Nhận xét 07.6 | §5.2 | | — | |
| Định nghĩa 07.10 | Định nghĩa 07.7 | §5.3 | | — | |
| Định nghĩa 07.11 | Định nghĩa 07.8 | §6.1 | "Đỉnh (vertex) là tên gọi khác …" | — | |
| Định nghĩa 07.12 | Định nghĩa 07.9 | §6.2 | | — | |
| Định lý 07.13 | Định lý 07.10 | §6.2 | | — | |
| Hệ quả 07.14 | Hệ quả 07.11 | §6.2 | | — | |
| Định lý 07.15 | Định lý 07.12 | §6.3 | | — | |
| Hệ quả 07.16 | Hệ quả 07.13 | §6.3 | | — | |
| Nhận xét 07.17 | Nhận xét 07.14 | §6.3 | | — | |
| Định nghĩa 07.18 | Định nghĩa 07.15 | §6.4 | | — | |
| Bổ đề 07.19 | Bổ đề 07.16 | §6.4 | | — | |
| Định lý 07.20 | **Định lý 07.17** | §6.4 | | deck `lecture-07-…html` dòng 243 ×1 (ghi chú diễn giả) | đổi 1 token |
| Hệ quả 07.21 | Hệ quả 07.18 | §6.4 | | — | |
| Mệnh đề 07.22 | Mệnh đề 07.19 | §7.1 | | — | |
| Định lý 07.23 | Định lý 07.20 | §7.2 | giả thiết viết "(L2)" | — | |
| Hệ quả 07.24 | Hệ quả 07.21 | §7.2 | giả thiết viết "(L3)" | — | |
| Mệnh đề 07.25 | Mệnh đề 07.22 | §7.2 | chứng minh Bước 4 dẫn Định lý 02.15(b) | — | |
| Định lý 07.26 | Định lý 07.23 | §7.3 | chứng minh Bước 2 dẫn Mệnh đề 02.10(b) | — | |
| Nhận xét 07.27 | Nhận xét 07.24 | §7.3 | tiêu đề "(Khi bỏ giả thiết; so với bài toán lồi tổng quát; ba nhầm lẫn)", thêm phản ví dụ khi bỏ (L2), (L3) (Q07-6) | — | |
| Định nghĩa 07.28 | Định nghĩa 07.25 | §7.4 | | — | |
| Mệnh đề 07.29 | Mệnh đề 07.26 | §7.4 | | — | |
| Thuật toán 07.1 | **Thuật toán 07.27** | §7.5 | vào bộ đếm chung; phát biểu cho dạng chuẩn thỏa (L1), (L3); thêm Điều kiện dừng, Chi phí | — | |
| Bổ đề 07.30 (+ hai chứng minh) | **Bổ đề 07.36** | §8.4 | dời sau định lý Bland; phát biểu cho dạng chuẩn thỏa (L1), (L3); một chứng minh hai trường hợp; bỏ Bước 1a–1c (Q07-1) | — (deck C07c gọi bằng tên) | |
| Mệnh đề 07.31 | **Mệnh đề 07.37** | §8.4 | dời theo bổ đề; Bước 2 dẫn Hệ quả 07.13 | — | |
| Định nghĩa 07.32 | Định nghĩa 07.28 | §8.1 | | — | |
| Mệnh đề 07.33 | Mệnh đề 07.29 | §8.1 | | — | |
| Mệnh đề 07.34 | Mệnh đề 07.30 | §8.2 | | — | |
| Thuật toán 07.2 | **Thuật toán 07.31** | §8.3 | vào bộ đếm chung | — | |
| Định lý 07.35 | Định lý 07.32 | §8.3 | giả thiết viết "(L1), (L4)" | — | |
| Nhận xét 07.36 | Nhận xét 07.33 | §8.3 | bỏ Bertsimas–Tsitsiklis | — | |
| Định nghĩa 07.37 | Định nghĩa 07.34 | §8.4 | | — | |
| Định lý 07.38 | Định lý 07.35 | §8.4 | độ sâu trong tiêu đề: ngoài phạm vi, Vanderbei (2014, §3.4) | — | |
| Nhận xét 07.39 | Nhận xét 07.38 | §8.4, vùng đọc thêm | rút gọn; bỏ Bertsimas–Tsitsiklis | — | |
| Định nghĩa 07.40 | Định nghĩa 07.39 | §8.5 | | — | |
| Mệnh đề 07.41 | Mệnh đề 07.40 | §8.5 | | — | |
| Nhận xét 07.42 | Nhận xét 07.41 | §8.5, vùng đọc thêm | bỏ câu so sánh chi phí $mn$, bộ nhớ $m^2$ (nguồn chỉ là Bertsimas–Tsitsiklis) | — | |
| Định nghĩa 07.43 | Định nghĩa 07.42 | §8.6 | | — | |
| Mệnh đề 07.44 | Mệnh đề 07.43 | §8.6 | | — | |
| Thuật toán 07.3 | **Thuật toán 07.44** | §8.6 | vào bộ đếm chung; thêm Điều kiện dừng | — | |
| Nhận xét 07.45 | Nhận xét 07.45 | §8.7, vùng đọc thêm | giữ số; câu Bertsimas Ch. 8–9 bỏ; câu `highs-ipm` bỏ ở vòng 1 (đã có ở §11.5), thay bằng công thức đo của Vanderbei tr. 49 | — | |
| Định nghĩa 07.46 | Định nghĩa 07.46 | §9.1 | giữ số; bốn giả thiết thành (D1)–(D4) ở §2 | lec-13 ×1 (dòng 41) | giữ |
| Nhận xét 07.47 | Nhận xét 07.47 | §9.1 | giữ số | lec-13 ×2 (41, 1473), lec-13/exercises ×1 (376) | giữ |
| Định nghĩa 07.48 | Định nghĩa 07.48 | §9.2 | giữ số; (9.2) viết $J_k(\xi)=\min_{\mathcal U_k(\xi)}G_k$ | lec-13 ×2 (41, 1080) | giữ |
| Định lý 07.49 | Định lý 07.49 | §9.2 | giữ số; giả thiết "(D1)–(D4)" | lec-13 ×5 (3, 41, 770, 1080 ×2) | giữ |
| Mệnh đề 07.50 | Mệnh đề 07.50 | §9.2 | giữ số | — | |
| Định nghĩa 07.51 | Định nghĩa 07.51 | §10.1 | giữ số | — | |
| Thuật toán 07.4 | **Thuật toán 07.52** | §10.1 | vào bộ đếm chung; thêm Điều kiện dừng | — | |
| Mệnh đề 07.52 | Mệnh đề 07.53 | §10.1 | | — | |
| Mệnh đề 07.53 | Mệnh đề 07.54 | §10.2 | | — | |
| Nhận xét 07.54 | Nhận xét 07.55 | §10.2 | bỏ Bellman (1957), Bertsekas (2017) | — | |

Tổng dẫn chiếu ngoài phải đổi: **1 token** (deck dòng 243, ghi chú diễn giả: "Định lý 07.20" → "Định lý 07.17"). Bài 13 (11 token 07.46–07.49: 07.46 ×1, 07.47 ×3, 07.48 ×2, 07.49 ×5) giữ nguyên. Ngoài số hiệu: `lec-13/lecture-note.md` dòng 1080 viết "Bertsekas (2017), §1.1–1.3, đã dẫn ở Bài 07", nhưng ghi chú Bài 07 mới không còn dẫn Bertsekas (không có bản cục bộ, Q07-8).

## 2. Ví dụ, tình huống, bài tập

| Cũ | Mới | Mục mới | Dẫn chiếu ngoài |
|---|---|---|---|
| Ví dụ 07.1 | Ví dụ 07.1 | §3 | — |
| Ví dụ 07.2–07.24 | giữ số | §4.2–§8.6 | deck ×1 (Ví dụ 07.10, dòng 212) |
| Ví dụ 07.25 | giữ | §8.7 (vùng đọc thêm) | — |
| Ví dụ 07.26–07.30 | giữ | §9–§10 | — |
| Tình huống 07.1–07.4 | giữ | §11.1–§11.4 | — |
| Bài tập 07.1–07.12 | giữ | cuối §4.2, §4.3, §5.3, §6.4, §7.5, §8.6 | deck: 07.1 (114, 120), 07.6 (37), 07.7 (306, 313), 07.8 (37, 448, 457), 07.15 (526, 534) |
| Bài tập 07.13 | giữ | §8.7 (vùng đọc thêm) | deck dẫn khoảng "07.8–07.13" |
| Bài tập 07.14, 07.15 | giữ | cuối §9.2, §10.2 | — |
| Bài tập 07.16–07.18 | giữ | §12.1–§12.3 | — |
| Bài tập 07.19–07.22 (`exercises.md` cũ) | bỏ (Q07-7); tệp mới bắt đầu từ Bài tập 07.19 với bài giáo trình | — | — |

## 3. Nhãn công thức

| Cũ | Mới | Nội dung |
|---|---|---|
| (1.1) | (1.1) | dạng $\max c^Tx$, $Ax\le b$, $x\ge0$; chuyển từ Định nghĩa 07.1 cũ sang §1 |
| (1.2) | (4.1) | hồi quy sai số tuyệt đối dạng quy hoạch tuyến tính |
| (2.1)–(2.3) | (5.1)–(5.3) | đa diện; dạng chuẩn; nghiệm cơ sở |
| (3.1), (3.2) | (6.1), (6.2) | tổ hợp lồi; phép thử tỉ số của Bổ đề 07.16 |
| (5.1)–(5.5) | (8.1)–(8.5) | hướng cơ sở; chi phí rút gọn; phép thử tỉ số; bảng; bài toán phụ |
| (6.1)–(6.3) | (9.1)–(9.3) | chi phí chuỗi; $J_k$; phương trình Bellman |
| (7.1) | (10.1) | chính sách đạt cực tiểu |

Không tệp ngoài dẫn nhãn công thức của Bài 07.

## 4. Mục

| Cũ | Mới |
|---|---|
| Mục tiêu, Tiên quyết | Mục tiêu (6 mục, bỏ LLO/CLO), Tiên quyết (+ câu hỏi ôn nhanh) |
| — | Đoạn dẫn, Câu hỏi mở đầu, §1, §3, §13 |
| Bảng ký hiệu | §2 (thêm (L1)–(L4), (D1)–(D4)) |
| Mục 1 (1.1–1.3) | §4 (4.1–4.3); Ví dụ 07.1 sang §3 |
| Mục 2–4 | §5–§7 |
| Mục 5 (5.1–5.7) | §8 (8.1–8.7; 8.7 Đọc thêm; hình học cột bỏ) |
| Mục 6, 7 | §9, §10 |
| Tình huống áp dụng và ứng dụng | §11.1–§11.5 (đoạn `linprog` chuyển vào §11.5) |
| Tóm tắt chương | §11.6 ("Giới hạn còn lại" sang §13) |
| Bài tập củng cố | §12 |
| Hướng dẫn đọc thêm và tài liệu tham khảo | §14 |

## 5. Ghi chú cho giai đoạn 3 (vòng biên tập 1, 2026-11-12)

Chỉ ghi, không sửa tệp ngoài Bài 07 ở vòng này.

- Deck `lecture-07-quy-hoach-tuyen-tinh-va-dong.html` dòng 243 (ghi chú diễn giả): "Định lý 07.20, Bước 3–4" → "Định lý 07.17, Bước 3–4" (Bước 3–4 của chứng minh Định lý 07.17 là chiều (iii) ⇒ (i), lặp bước tăng hạng). Các lệch khác của deck (thứ tự kết cục, Bổ đề 07.36, Klee–Minty, nguồn Bertsimas–Tsitsiklis) do điều phối viên ghi `review-log.md`; không sửa deck.
- `lec-13/lecture-note.md`: 11 token 07.46–07.49 khớp nội dung khối giữ số; không đổi.
- `lec-13/lecture-note.md` dòng 1080: "xem Bertsekas (2017), §1.1–1.3, đã dẫn ở Bài 07" sai, vì Bài 07 mới không dẫn Bertsekas. Viết tay thành nguồn Bài 07 dẫn cho quy hoạch động: "xem MIT OpenCourseWare 15.093J (2009, Bài giảng 16, slide 7–10), đã dẫn ở Bài 07" (Bài 07 dẫn slide 7, 9–10 ở Nhận xét 07.55 và slide 9 trước Mệnh đề 07.50; bản cục bộ `sources/MIT/…MIT15_093J_F09_lec16.pdf`). Người rà toán của Bài 13 xác nhận bài 16 có truy hồi ngược ngẫu nhiên hữu hạn bước.
- `lec-13/lecture-note.md` dòng 770: câu "…; nó chưa phải định nghĩa." vi phạm quy tắc 2026-11-04; sửa khi làm Bài 13 (không thuộc dẫn chiếu số).
- `lec-03/lecture-note.md` dòng 2361: "…điều kiện dừng của nó cho một nghiệm đối ngẫu của Mệnh đề 03.11 cùng giá bóng của từng ràng buộc." Bài 07 mới nối chi phí rút gọn với hệ số của Mệnh đề 02.11 (sau Ví dụ 07.19) và 03.11 (sau Ví dụ 07.5), nhưng không phát biểu giá bóng; Tình huống 07.2 cho thấy tại đỉnh suy biến không có giá bóng duy nhất. Viết tay: "Bài 07 trở lại quy hoạch tuyến tính: phương pháp đơn hình tìm đỉnh tối ưu, và chi phí rút gọn của các biến bù ở cơ sở tối ưu, đổi dấu, cho một nghiệm đối ngẫu của Mệnh đề 03.11." (Bài 07 nêu điều này sau Ví dụ 07.19, dẫn Mệnh đề 02.11 và 03.11.)
- `lec-07/exercises.md`: Bài tập 07.2 giữ dữ kiện $y=(0,2,6)$ (bản sao trong `exercises.md`); ghi chú chỉ thêm câu nối tới Bài tập 02.4(a) ở gợi ý. Nếu `exercises.md` chép gợi ý, thêm cùng câu.
- Hình mới `img/lec-07/extreme-point-def-note.svg` (bản ghi chú của `extreme-point-def.svg`, nhãn $u$, $w$ thay bằng tọa độ): cần `git add` khi commit.
