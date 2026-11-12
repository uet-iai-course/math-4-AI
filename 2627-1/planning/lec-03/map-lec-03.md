# Bảng ánh xạ số hiệu Bài 03 (viết lại theo mẫu SLT, 2026-11-12)

**Cách thay ở giai đoạn 3.** Thay bằng **một lượt** ánh xạ cũ → mới đọc từ bảng (một từ điển trong script), không thay tuần tự. Quy luật:

- bộ đếm chung: 03.1–03.35 giữ số; Thuật toán 03.1 → Thuật toán 03.36; Mệnh đề 03.36 → Mệnh đề 03.37; Nhận xét 03.37 → Nhận xét 03.38; Thuật toán 03.2 → Thuật toán 03.39 (hai thuật toán vào bộ đếm chung, Q-A);
- Ví dụ 03.1–03.20, Tình huống 03.1–03.3 và Bài tập 03.1–03.17 giữ số; nhiều tên đổi (bảng dưới);
- nhãn công thức: (1.1) → (3.1); (2.1) → (1.1); (2.k) → (5.k−1) với $k=2,\ldots,5$; (3.k) → (6.k); (4.k) → (7.k); (5.k) → (8.k). Vì (2.1) → (1.1) và (1.1) → (3.1) móc nhau, phải thay bằng từ điển, không thay tuần tự.

Dẫn chiếu hiện có (grep `materials/*/*.md` trừ `lec-03/lecture-note.md`, `materials/README.md` và `lecture-*.html`, ngày 2026-11-12): mọi số khối được dẫn đều giữ nguyên số, nên giai đoạn 3 không phải thay số khối nào; chỉ một nhãn công thức đổi (`lec-04/lecture-note.md:134`, "Bài toán tổng quát (2.1) của Bài 03" → "(1.1)"). Deck không dẫn số hiệu ghi chú. Các tệp `planning/` của Bài 02, 03, 04, 07 dẫn số cũ trong nhật ký lịch sử: không sửa. `materials/README.md:15` ghi "Định lý 03.2 (Đối ngẫu yếu)" (đã sai trước đợt này; đúng là Định lý 03.8): ngoài phạm vi ghi, để điều phối viên quyết định (Q03-10). `exercises.md` hiện có (7 bài tự dựng, không số) bị thay ở giai đoạn 2; tệp mới bắt đầu từ Bài tập 03.18.

**Kiểm nội dung các số được dẫn từ bài khác.**

- `lec-04:34`, `:76`, `:108`, `:203`, `:761` dẫn Định lý 03.32 "kể cả khi miền là tập mở lồi": khớp phát biểu mới (Giả thiết $D$ mở, lồi).
- `lec-04:112` dẫn Định nghĩa 03.29 với $D=\mathbb R^n$: phát biểu mới cho $D$ mở, nói riêng $\mathbb R^n$; vẫn đúng. `lec-04:33` viết $\lambda\succeq0$; ghi chú Bài 03 nay viết $\lambda\ge0$ (đồng bộ khi viết lại Bài 04).
- `lec-04:34`, `:212` dẫn Ví dụ 03.18(b) (đẳng thức, hệ KKT tuyến tính): giữ nội dung và phần (b).
- `lec-04:34`, `:76` dẫn Ví dụ 03.19: giữ nội dung (mục tiêu có $\tfrac12$, $\lambda^*=2$).
- `lec-07` dẫn Mệnh đề 03.11 (đối ngẫu quy hoạch tuyến tính), Định lý 03.15 (Slater, phần (b)), Hệ quả 03.24 (giá bóng): giữ nội dung; Mệnh đề 03.11 nay đếm ràng buộc bằng $m$ (cũ $k$).
- `lec-11` dẫn Định nghĩa 03.4 (hàm Lagrange): giữ nội dung; `lec-11` không dẫn nhãn công thức nào của Bài 03.
- Ghi cho lần viết lại Bài 04 (không thuộc giai đoạn 3 của Bài 03): `lec-04:228` viết "hai nhân tử không âm $\lambda_+$ và $\lambda_-$ như Bài 03", nhưng ghi chú Bài 03 (cũ và mới) không tách đẳng thức thành hai bất đẳng thức; `lec-04:33` viết $\lambda\succeq0$, Bài 03 nay viết $\lambda\ge0$.

## 1. Bộ đếm chung (định nghĩa, định lý, mệnh đề, bổ đề, hệ quả, nhận xét, thuật toán)

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có (grep 2026-11-12) | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| Định nghĩa 03.1 | Định nghĩa 03.1 | tên: (Cận dưới, cận khít, khoảng chứng nhận, chứng nhận tối ưu) | — | không có dẫn chiếu |
| Mệnh đề 03.2 | Mệnh đề 03.2 | tên: (Cận dưới chặn sai số tối ưu; chứng nhận tối ưu) | — | không có dẫn chiếu |
| Nhận xét 03.3 | Nhận xét 03.3 | tên: (Chứng nhận của Bài 02 là một cận dưới) | — | không có dẫn chiếu |
| Định nghĩa 03.4 | Định nghĩa 03.4 | giữ | lec-04: 1 (dòng 33); lec-11: 3 (dòng 53, 460, 484); lec-11/exercises: 1 (dòng 82) | 5 chỗ, không đổi số; đã đối chiếu nội dung |
| Định nghĩa 03.5 | Định nghĩa 03.5 | giữ | — | không có dẫn chiếu |
| Mệnh đề 03.6 | Mệnh đề 03.6 | giữ | — | không có dẫn chiếu |
| Nhận xét 03.7 | Nhận xét 03.7 | giữ | — | không có dẫn chiếu |
| Định lý 03.8 | Định lý 03.8 | tên: (Đối ngẫu yếu, weak duality) | — | không có dẫn chiếu |
| Định nghĩa 03.9 | Định nghĩa 03.9 | giữ | — | không có dẫn chiếu |
| Hệ quả 03.10 | Hệ quả 03.10 | tên: (Đối ngẫu yếu cho giá trị tối ưu; chứng nhận từ một cặp) | — | không có dẫn chiếu |
| Mệnh đề 03.11 | Mệnh đề 03.11 | giữ | lec-07: 5 (dòng 78, 432, 1624, 2843, 2901) | 6 chỗ, không đổi số; đã đối chiếu nội dung |
| Định nghĩa 03.12 | Định nghĩa 03.12 | giữ | — | không có dẫn chiếu |
| Định nghĩa 03.13 | Định nghĩa 03.13 | giữ | — | không có dẫn chiếu |
| Bổ đề 03.14 | Bổ đề 03.14 | chứng minh chuyển sang Phụ lục A; ký hiệu đổi (§6) | — | không có dẫn chiếu |
| Định lý 03.15 | Định lý 03.15 | tiêu đề ghi độ sâu chứng minh; ký hiệu chứng minh đổi (§6) | lec-07: 2 (dòng 33, 562) | 2 chỗ, không đổi số; đã đối chiếu nội dung |
| Nhận xét 03.16 | Nhận xét 03.16 | giữ | — | không có dẫn chiếu |
| Nhận xét 03.17 | Nhận xét 03.17 | tên: (Khi bỏ giả thiết: cách viết ràng buộc và tính lồi) | — | không có dẫn chiếu |
| Định nghĩa 03.18 | Định nghĩa 03.18 | giữ | — | không có dẫn chiếu |
| Mệnh đề 03.19 | Mệnh đề 03.19 | giữ | — | không có dẫn chiếu |
| Mệnh đề 03.20 | Mệnh đề 03.20 | tên: (Đối ngẫu mạnh có nghiệm đối ngẫu tương đương một siêu phẳng đỡ không thẳng đứng tại $(0,0,p^*)$) | — | không có dẫn chiếu |
| Nhận xét 03.21 | Nhận xét 03.21 | giữ | — | không có dẫn chiếu |
| Định nghĩa 03.22 | Định nghĩa 03.22 | giữ | — | không có dẫn chiếu |
| Mệnh đề 03.23 | Mệnh đề 03.23 | giữ | — | không có dẫn chiếu |
| Hệ quả 03.24 | Hệ quả 03.24 | giữ | lec-04: 3 (dòng 1965, 3061, 3073); lec-07: 1 (dòng 2906) | 5 chỗ, không đổi số; đã đối chiếu nội dung |
| Nhận xét 03.25 | Nhận xét 03.25 | giữ | — | không có dẫn chiếu |
| Định nghĩa 03.26 | Định nghĩa 03.26 | giữ | — | không có dẫn chiếu |
| Mệnh đề 03.27 | Mệnh đề 03.27 | giữ | — | không có dẫn chiếu |
| Nhận xét 03.28 | Nhận xét 03.28 | giữ | — | không có dẫn chiếu |
| Định nghĩa 03.29 | Định nghĩa 03.29 | phát biểu cho $D$ mở (nói riêng $\mathbb R^n$); nhãn (5.1) → (8.1) | lec-04: 1 (dòng 112) | 2 chỗ, không đổi số; đã đối chiếu nội dung; "$\lambda\succeq0$" ở lec-04:33 giữ (ký hiệu của Bài 04, đồng bộ khi viết lại Bài 04) |
| Định lý 03.30 | Định lý 03.30 | giả thiết $D$ mở (cũ $D=\mathbb R^n$) | — | không có dẫn chiếu |
| Hệ quả 03.31 | Hệ quả 03.31 | giữ | lec-04: 3 (dòng 34, 203, 761) | 3 chỗ, không đổi số; đã đối chiếu nội dung; lec-04:761 viết lại "thỏa chặt ràng buộc" → "là điểm khả thi ngặt" |
| Định lý 03.32 | Định lý 03.32 | giả thiết $D$ mở, lồi (cũ: câu Phạm vi) | lec-04: 5 (dòng 34, 76, 108, 203, 761) | 5 chỗ, không đổi số; đã đối chiếu nội dung |
| Nhận xét 03.33 | Nhận xét 03.33 | tên: (Khi bỏ giả thiết: tính cần và tính đủ của KKT) | — | không có dẫn chiếu |
| Mệnh đề 03.34 | Mệnh đề 03.34 | giữ | — | không có dẫn chiếu |
| Mệnh đề 03.35 | Mệnh đề 03.35 | giữ | — | không có dẫn chiếu |
| Thuật toán 03.1 | Thuật toán 03.36 | **đổi số** (vào bộ đếm chung, Q-A); tên: (Chia đôi hệ số phạt cho hồi quy có ràng buộc chuẩn) | — | không có dẫn chiếu |
| Mệnh đề 03.36 | Mệnh đề 03.37 | **đổi số** (sau khi hai thuật toán vào bộ đếm chung) | — | không có dẫn chiếu |
| Nhận xét 03.37 | Nhận xét 03.38 | **đổi số** (sau khi hai thuật toán vào bộ đếm chung) | — | không có dẫn chiếu |
| Thuật toán 03.2 | Thuật toán 03.39 | **đổi số** (vào bộ đếm chung, Q-A) | — | không có dẫn chiếu |

## 2. Ví dụ

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có (grep 2026-11-12) | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| Ví dụ 03.1 | Ví dụ 03.1 | tên: (Bài toán một biến trên đoạn $[2,4]$) | — | không có dẫn chiếu |
| Ví dụ 03.2 | Ví dụ 03.2 | tên: (Hai cận dưới cho bài toán (3.1)) | — | không có dẫn chiếu |
| Ví dụ 03.3 | Ví dụ 03.3 | tên: (Hàm đối ngẫu của bài toán (3.1)) | — | không có dẫn chiếu |
| Ví dụ 03.4 | Ví dụ 03.4 | tên: (Bài toán đối ngẫu của (3.1)) | — | không có dẫn chiếu |
| Ví dụ 03.5 | Ví dụ 03.5 | giữ | — | không có dẫn chiếu |
| Ví dụ 03.6 | Ví dụ 03.6 | giữ | — | không có dẫn chiếu |
| Ví dụ 03.7 | Ví dụ 03.7 | giữ | — | không có dẫn chiếu |
| Ví dụ 03.8 | Ví dụ 03.8 | giữ | — | không có dẫn chiếu |
| Ví dụ 03.9 | Ví dụ 03.9 | giữ | — | không có dẫn chiếu |
| Ví dụ 03.10 | Ví dụ 03.10 | tên: (Thiếu điều kiện Slater: nghiệm đối ngẫu đạt hoặc không đạt) | — | không có dẫn chiếu |
| Ví dụ 03.11 | Ví dụ 03.11 | giữ | — | không có dẫn chiếu |
| Ví dụ 03.12 | Ví dụ 03.12 | tên: (Hai đường cận của bài toán (3.1)) | — | không có dẫn chiếu |
| Ví dụ 03.13 | Ví dụ 03.13 | tên: (Đường cận tại $(0,p^*)$ chỉ có thể thẳng đứng) | — | không có dẫn chiếu |
| Ví dụ 03.14 | Ví dụ 03.14 | tên: (Hàm giá trị của bài toán (3.1)) | — | không có dẫn chiếu |
| Ví dụ 03.15 | Ví dụ 03.15 | giữ | — | không có dẫn chiếu |
| Ví dụ 03.16 | Ví dụ 03.16 | giữ | — | không có dẫn chiếu |
| Ví dụ 03.17 | Ví dụ 03.17 | tên: (Giải bài toán (3.1) bằng hệ KKT) | — | không có dẫn chiếu |
| Ví dụ 03.18 | Ví dụ 03.18 | giữ | lec-04: 2 (dòng 34, 212) | 2 chỗ, không đổi số; đã đối chiếu nội dung |
| Ví dụ 03.19 | Ví dụ 03.19 | giữ | lec-04: 2 (dòng 34, 76) | 2 chỗ, không đổi số; đã đối chiếu nội dung |
| Ví dụ 03.20 | Ví dụ 03.20 | tên: (Thuật toán 03.39 cho bài toán chiếu) | — | không có dẫn chiếu |

## 3. Tình huống và bài tập

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có (grep 2026-11-12) | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| Bài tập 03.1 | Bài tập 03.1 | tên: (Hai cận dưới cho một bài toán có ràng buộc chặn dưới) | — | không có dẫn chiếu |
| Bài tập 03.2 | Bài tập 03.2 | tên: (Đối ngẫu của bài toán hàm tuyến tính trên hình tròn); đề dẫn Bài tập 02.6 | — | không có dẫn chiếu |
| Bài tập 03.3 | Bài tập 03.3 | tên: (Đối ngẫu của một quy hoạch tuyến tính hai biến) | — | không có dẫn chiếu |
| Bài tập 03.4 | Bài tập 03.4 | tên: (Kiểm tra điều kiện Slater cho ba bài toán) | — | không có dẫn chiếu |
| Bài tập 03.5 | Bài tập 03.5 | tên: (Hai hình tròn tiếp xúc) | — | không có dẫn chiếu |
| Bài tập 03.6 | Bài tập 03.6 | tên: (Mặt phẳng giá trị và hàm giá trị của một bài toán một biến) | — | không có dẫn chiếu |
| Bài tập 03.7 | Bài tập 03.7 | tên: (Hệ KKT của một bài toán hai biến) | — | không có dẫn chiếu |
| Bài tập 03.8 | Bài tập 03.8 | tên: (Bốn trường hợp bù trừ) | — | không có dẫn chiếu |
| Bài tập 03.9 | Bài tập 03.9 | tên: (Hồi quy ba trọng số với ràng buộc chuẩn) | — | không có dẫn chiếu |
| Bài tập 03.10 | Bài tập 03.10 | tên: (Quy trình chứng nhận cho một bài toán chiếu) | — | không có dẫn chiếu |
| Tình huống 03.1 | Tình huống 03.1 | giữ | — | không có dẫn chiếu |
| Tình huống 03.2 | Tình huống 03.2 | tên: (Hồi quy có ràng buộc chuẩn trên năm quan sát: hệ số phạt ứng với mức chặn) | — | không có dẫn chiếu |
| Tình huống 03.3 | Tình huống 03.3 | giữ | — | không có dẫn chiếu |
| Bài tập 03.11 | Bài tập 03.11 | tên: (Đúng hay sai) | — | không có dẫn chiếu |
| Bài tập 03.12 | Bài tập 03.12 | tên: (Tìm lỗi trong một lời giải) | — | không có dẫn chiếu |
| Bài tập 03.13 | Bài tập 03.13 | tên: (Cách viết ràng buộc thay đổi bài toán đối ngẫu) | — | không có dẫn chiếu |
| Bài tập 03.14 | Bài tập 03.14 | tên: (Bài toán nghiệm chuẩn nhỏ nhất) | — | không có dẫn chiếu |
| Bài tập 03.15 | Bài tập 03.15 | tên: (Entropy cực đại và softmax) | — | không có dẫn chiếu |
| Bài tập 03.16 | Bài tập 03.16 | tên: (Máy vector hỗ trợ trên ba mẫu) | — | không có dẫn chiếu |
| Bài tập 03.17 | Bài tập 03.17 | tên: (Giá bóng của ngân sách tính toán) | — | không có dẫn chiếu |

Vị trí bài tập trong thân bài: 03.1 cuối §4.3; 03.2, 03.3 cuối §5.4; 03.4, 03.5 cuối §6.4; 03.6 cuối §7.3; 03.7, 03.8 cuối §8.2; 03.9 cuối §8.3; 03.10 cuối §9; 03.11–03.17 ở §11.1–§11.3. Bảy bài tự dựng của `exercises.md` cũ (không số) bị bỏ ở giai đoạn 2.

## 4. Nhãn công thức

| Cũ | Mới | Nội dung | Dẫn từ nơi khác | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| (1.1) | (3.1) | bài toán một biến trên đoạn $[2,4]$ (Ví dụ 03.1) | — | không có dẫn chiếu |
| (2.1) | (1.1) | bài toán gốc tổng quát | `lec-04:134` | đã thay 1 chỗ (lec-04:134, viết tay) |
| (2.2) | (5.1) | hàm Lagrange | — | không có dẫn chiếu |
| (2.3) | (5.2) | hàm đối ngẫu | — | không có dẫn chiếu |
| (2.4) | (5.3) | đối ngẫu yếu $g\le L\le f_0$ | — | không có dẫn chiếu |
| (2.5) | (5.4) | bài toán đối ngẫu | — | không có dẫn chiếu |
| (3.1) | (6.1) | điều kiện Slater | — | không có dẫn chiếu |
| (3.2) | (6.2) | bất đẳng thức tách trong chứng minh Định lý 03.15 | — | không có dẫn chiếu |
| (4.1) | (7.1) | bài toán nhiễu | — | không có dẫn chiếu |
| (4.2) | (7.2) | độ nhạy toàn cục | — | không có dẫn chiếu |
| (4.3) | (7.3) | độ nhạy địa phương | — | không có dẫn chiếu |
| (5.1) | (8.1) | điều kiện dừng | — | không có dẫn chiếu |
| (5.2) | (8.2) | máy vector hỗ trợ lề mềm (quy hoạch bậc hai) | — | không có dẫn chiếu |
| (5.3) | (8.3) | mục tiêu đối ngẫu, cũ $h(\alpha)$, nay $\Psi(\alpha)$ | — | không có dẫn chiếu |

## 5. Mục

| Cũ | Mới | Giai đoạn 3 (2026-11-12) |
|---|---|---|
| Mục tiêu học tập; Kiến thức tiên quyết | Mục tiêu học tập; Kiến thức tiên quyết | — |
| — | Câu hỏi mở đầu | — |
| Bảng ký hiệu | §2 Ký hiệu và giả thiết | — |
| Mục 2.1 (bài toán gốc tổng quát) | §1 Thiết lập bài toán | — |
| Mục 1.1, phần Ví dụ 03.1 | §3 Ví dụ xuyên suốt | — |
| Mục 1 (1.1 phần còn lại, 1.2, 1.3) | §4 (4.1–4.3) | — |
| Mục 2 (2.2–2.5) | §5 (5.1–5.4) | — |
| Mục 3 (3.1–3.4) | §6 (6.1–6.4) | — |
| Mục 4 (4.1–4.3) | §7 (7.1–7.3) | — |
| Mục 5 (5.1–5.4) | §8 (8.1–8.4) | — |
| Mục 6 | §9 | — |
| Tình huống áp dụng và ứng dụng | §10.1–§10.4 | — |
| Tóm tắt chương | §10.5 | — |
| Bài tập củng cố | §11 (11.1–11.3) | — |
| — | §12 Câu hỏi cuối buổi và cầu nối | — |
| Hướng dẫn đọc thêm và tài liệu tham khảo | §13 Tài liệu đọc | — |
| chứng minh Bổ đề 03.14 (trong Mục 3.3) | Phụ lục A | — |

## 6. Ký hiệu đổi (để đối chiếu khi dẫn lại)

| Cũ | Mới | Chỗ | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|
| $\succeq$, $\preceq$ cho vector | $\ge$, $\le$ | toàn bài | — |
| $E(w)$ | $J(w)$ | §8.3, Tình huống 03.2 | — |
| $b$ (hệ số chặn), $\beta_i$, $h(\alpha)$ | $w_0$, $\eta_i$, $\Psi(\alpha)$ | Mệnh đề 03.37, Nhận xét 03.38, Tình huống 03.1, Bài tập 03.16 | — |
| $w_0$ (nghiệm bình phương nhỏ nhất); $\lambda_{\mathrm{lo}},\lambda_{\mathrm{hi}},c$ | $w(0)$; $\rho_{\mathrm{lo}},\rho_{\mathrm{hi}},\rho_{\mathrm{mid}}$ | Thuật toán 03.36, Tình huống 03.2 | — |
| $\ell$, $r$ (Mệnh đề 03.34) | $f_0$, $\tau$ | Mệnh đề 03.34, Bài tập 03.9 | — |
| $\theta_a,\theta_b,\alpha$ (Mệnh đề 03.6); $\alpha$, $t$ (tổ hợp lồi) | $(\lambda,\nu),(\lambda',\nu')$, $\vartheta$ | Mệnh đề 03.6, Định lý 03.15, Phụ lục A | — |
| $(a,\beta,\mu)$, $c$, $s$ (chứng minh Định lý 03.15) | $(\tilde\lambda,\tilde\nu,\kappa)$, $\gamma$, $t$ | chứng minh Định lý 03.15 | — |
| $\mathcal C,\mathcal B,z,w,q,c,\pi,S,H_e$ (Bổ đề 03.14) | $\mathcal S_1,\mathcal S_2,\zeta,\zeta',q,\gamma$; phần tử của tập hiệu $r$, $r_j$, điểm gần gốc $\bar r$, mặt cầu $\mathcal U$, tập mở $\mathcal O_r$ | Bổ đề 03.14, Phụ lục A | — |
| $k$ (số ràng buộc), $s$, $t$ (Mệnh đề 03.11) | $m$, $\bar c$, $s$ | Mệnh đề 03.11, câu hỏi ôn nhanh 3 | — |
| $m_i$ (biên có dấu) | $\omega_i$ | §8.4, Tình huống 03.1, Bài tập 03.16 | — |
| $f_1,\ldots,f_k$ affine (dạng yếu Slater) | tập chỉ số $\mathcal I$ | Định nghĩa 03.13 | — |
| $c_j$ (Ví dụ 03.7) | $\sigma_j$ | Ví dụ 03.7, Nhận xét 03.7 | — |
| $s$ (bước nhiễu, Hệ quả 03.24) | $\delta$ | chứng minh Hệ quả 03.24 | — |
| $\theta$ (tham số mạng sâu) | $w$ | §6.4 | — |
| $p$, $a_i$, $m$, $\nu$, $\theta$, $r$ (Bài tập 03.15) | $\pi$, $\theta_i$, $\bar\theta$, $\nu_1$, $\nu_2$, $s=e^{-\nu_2}$ | Bài tập 03.15 | — |
| "đường đỡ" | "đường cận" (đường đỡ khi tiếp xúc) | §7 | — |
| "chặt" cho cả $f_i<0$ và $f_i=0$ | "khả thi ngặt" cho $f_i<0$; "hoạt động" (còn gọi là chặt) cho $f_i=0$ | §6, §8 | — |
| "dạng chuẩn lồi" | "dạng phổ biến" | toàn bài | — |
