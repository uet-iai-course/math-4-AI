# Bảng ánh xạ số hiệu Bài 04 (viết lại theo mẫu SLT, 2026-11-12)

Tệp nội bộ (git-ignored). Kế hoạch: `SP/lec04/plan.md`; quyết định Q04-0 đến Q04-13 của điều phối viên: `SP/lec04/decisions.md`.

**Cách thay ở giai đoạn 3.** Thay bằng **một lượt** ánh xạ cũ → mới đọc từ bảng (một từ điển trong script), không thay tuần tự, ranh giới số đầy đủ (`04\.13\b` không khớp `04.130`), và thay cả các số đứng sau trong danh sách ("Bổ đề 04.18, 04.20, 04.21"), loại khối xác định theo từ đứng trước số đầu của danh sách. Quy luật (Q04-1, R1(a)):

- bộ đếm chung: 04.1–04.12 giữ số; Thuật toán 04.1 → 04.13, 04.2 → 04.34, 04.3 → 04.44, 04.4 → 04.49 (vào bộ đếm chung, Q-A);
- khối không phải thuật toán: cũ 04.13–04.32 cộng 1; cũ 04.33–04.41 cộng 2; cũ 04.42–04.45 cộng 3; cũ 04.46–04.54 cộng 4; Mệnh đề 04.55 → 04.62;
- mới (§9.4 Đọc thêm, yêu cầu người dùng 2026-11-12): Định nghĩa 04.59, Mệnh đề 04.60, Thuật toán 04.61, Ví dụ 04.25;
- Ví dụ 04.1–04.24, Tình huống 04.1–04.3, Bài tập 04.1–04.15 giữ số; Ví dụ cũ 04.25 → Ví dụ 04.26.

Cột "Dẫn chiếu hiện có" đếm token "Loại 04.k" (grep `materials/*/*.md` trừ `lec-04/`, và `lecture-*.html`); số đứng sau trong danh sách không được đếm. `exercises.md` của Bài 04 (13 bài tự dựng, không số khối) được thay ở giai đoạn 2; tệp mới bắt đầu từ Bài tập 04.16. Deck RZ03 liệt kê "Bài 1–8" của `exercises.md` cũ (lệch, Q04-10). Các tệp `planning/` của bài khác dẫn số cũ trong nhật ký lịch sử: không sửa.

## 1. Bộ đếm chung (định nghĩa, định lý, mệnh đề, bổ đề, hệ quả, nhận xét, thuật toán)

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có (grep 2026-11-12) | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| Định nghĩa 04.1 | Định nghĩa 04.1 | giữ | — | không có dẫn chiếu |
| Mệnh đề 04.2 | Mệnh đề 04.2 | giữ | deck-lecture-11: 1; lec-06b/lecture-note.md: 3; lec-11/exercises.md: 3; lec-11/lecture-note.md: 2 | 9 chỗ, không đổi số; đã đối chiếu nội dung |
| Nhận xét 04.3 | Nhận xét 04.3 | tên: (Khi bỏ giả thiết; nhân tử của đẳng thức tự do dấu) | — | không có dẫn chiếu |
| Định nghĩa 04.4 | Định nghĩa 04.4 | giữ | — | không có dẫn chiếu |
| Nhận xét 04.5 | Nhận xét 04.5 | giữ | — | không có dẫn chiếu |
| Định nghĩa 04.6 | Định nghĩa 04.6 | giữ | lec-06c/lecture-note.md: 1 | 1 chỗ, không đổi số; đã đối chiếu nội dung |
| Mệnh đề 04.7 | Mệnh đề 04.7 | giữ | lec-06c/lecture-note.md: 3 | 3 chỗ, không đổi số; đã đối chiếu nội dung |
| Định nghĩa 04.8 | Định nghĩa 04.8 | giữ | lec-06c/lecture-note.md: 2 | 2 chỗ, không đổi số; đã đối chiếu nội dung |
| Mệnh đề 04.9 | Mệnh đề 04.9 | giữ | lec-06c/lecture-note.md: 2 | 2 chỗ, không đổi số; đã đối chiếu nội dung |
| Định nghĩa 04.10 | Định nghĩa 04.10 | giữ | lec-05b/lecture-note.md: 3; lec-06c/lecture-note.md: 4 | 7 chỗ, không đổi số; đã đối chiếu nội dung; lec-05b:58, lec-06c:28 khoảng $(0,\tfrac12)$ → $(0,\tfrac12]$ (viết tay) |
| Mệnh đề 04.11 | Mệnh đề 04.11 | giữ | lec-05/lecture-note.md: 1; lec-06c/lecture-note.md: 2 | 3 chỗ, không đổi số; đã đối chiếu nội dung |
| Nhận xét 04.12 | Nhận xét 04.12 | giữ | — | không có dẫn chiếu |
| Thuật toán 04.1 | Thuật toán 04.13 | **đổi số** (thuật toán vào bộ đếm chung, Q-A); tên: (Hạ gradient với quay lui Armijo; gradient descent) | lec-05b/lecture-note.md: 2 | 2 chỗ, đã đổi số |
| Nhận xét 04.13 | Nhận xét 04.14 | **đổi số** | lec-06b/lecture-note.md: 2; lec-06c/lecture-note.md: 1 | 3 chỗ, đã đổi số |
| Định nghĩa 04.14 | Định nghĩa 04.15 | **đổi số** | — | không có dẫn chiếu |
| Mệnh đề 04.15 | Mệnh đề 04.16 | **đổi số** | — | không có dẫn chiếu |
| Nhận xét 04.16 | Nhận xét 04.17 | **đổi số** | lec-06c/lecture-note.md: 3 | 3 chỗ, đã đổi số |
| Định nghĩa 04.17 | Định nghĩa 04.18 | **đổi số**; tên: (Gradient Lipschitz; Lipschitz continuous gradient) | lec-05b/lecture-note.md: 2; lec-05c/lecture-note.md: 1; lec-06b/lecture-note.md: 2; lec-06/lecture-note.md: 2 | 7 chỗ, đã đổi số |
| Bổ đề 04.18 | Bổ đề 04.19 | **đổi số** | deck-lecture-06: 1; lec-05b/exercises.md: 3; lec-05b/lecture-note.md: 6; lec-06b/lecture-note.md: 3; lec-06/lecture-note.md: 3 | 16 chỗ, đã đổi số |
| Nhận xét 04.19 | Nhận xét 04.20 | **đổi số** | deck-lecture-05: 2; lec-05b/lecture-note.md: 2; lec-05/lecture-note.md: 1; lec-06b/lecture-note.md: 4 | 9 chỗ, đã đổi số |
| Bổ đề 04.20 | Bổ đề 04.21 | **đổi số**; tên: (Bổ đề giảm; descent lemma) | lec-05b/lecture-note.md: 2; lec-05c/lecture-note.md: 2; lec-06b/lecture-note.md: 6; lec-06/lecture-note.md: 1 | 15 chỗ, đã đổi số |
| Bổ đề 04.21 | Bổ đề 04.22 | **đổi số** | lec-05b/lecture-note.md: 5 | 7 chỗ, đã đổi số |
| Định lý 04.22 | Định lý 04.23 | **đổi số** | lec-05b/lecture-note.md: 10; lec-06b/lecture-note.md: 1 | 11 chỗ, đã đổi số |
| Bổ đề 04.23 | Bổ đề 04.24 | **đổi số** | lec-05b/lecture-note.md: 3 | 5 chỗ, đã đổi số; lec-05b:58 viết lại cùng câu Định nghĩa 04.10 |
| Định lý 04.24 | Định lý 04.25 | **đổi số** | lec-05b/lecture-note.md: 1 | 3 chỗ, đã đổi số |
| Mệnh đề 04.25 | Mệnh đề 04.26 | **đổi số** | lec-05b/lecture-note.md: 6; lec-06/exercises.md: 1 | 7 chỗ, đã đổi số |
| Định lý 04.26 | Định lý 04.27 | **đổi số** | lec-05b/lecture-note.md: 3; lec-05/lecture-note.md: 7; lec-06b/lecture-note.md: 4 | 16 chỗ, đã đổi số |
| Nhận xét 04.27 | Nhận xét 04.28 | **đổi số** | — | không có dẫn chiếu |
| Định nghĩa 04.28 | Định nghĩa 04.29 | **đổi số** | lec-05/lecture-note.md: 3; lec-06c/lecture-note.md: 2 | 5 chỗ, đã đổi số |
| Mệnh đề 04.29 | Mệnh đề 04.30 | **đổi số** | lec-06c/lecture-note.md: 2 | 2 chỗ, đã đổi số |
| Định nghĩa 04.30 | Định nghĩa 04.31 | **đổi số** | lec-05/lecture-note.md: 1 | 3 chỗ, đã đổi số |
| Mệnh đề 04.31 | Mệnh đề 04.32 | **đổi số** | lec-05/lecture-note.md: 3 | 3 chỗ, đã đổi số |
| Nhận xét 04.32 | Nhận xét 04.33 | **đổi số**; tên (vòng biên tập 1): (Ba đại lượng khác nhau: mức giảm mô hình, giảm thực tế, sai số mục tiêu) | — | không có dẫn chiếu |
| Thuật toán 04.2 | Thuật toán 04.34 | **đổi số** (thuật toán vào bộ đếm chung, Q-A) | lec-05/lecture-note.md: 3; lec-06c/lecture-note.md: 2 | 5 chỗ, đã đổi số |
| Định nghĩa 04.33 | Định nghĩa 04.35 | **đổi số** | lec-05/lecture-note.md: 1 | 2 chỗ, đã đổi số |
| Định lý 04.34 | Định lý 04.36 | **đổi số** | lec-06c/lecture-note.md: 3 | 3 chỗ, đã đổi số |
| Định lý 04.35 | Định lý 04.37 | **đổi số** | lec-05/lecture-note.md: 3 | 4 chỗ, đã đổi số |
| Nhận xét 04.36 | Nhận xét 04.38 | **đổi số**; tên: (Khi bỏ giả thiết của hội tụ bậc hai; Hessian không xác định dương) | lec-06c/lecture-note.md: 2 | 2 chỗ, đã đổi số |
| Mệnh đề 04.37 | Mệnh đề 04.39 | **đổi số** | — | không có dẫn chiếu |
| Định nghĩa 04.38 | Định nghĩa 04.40 | **đổi số**; tên (vòng biên tập 1): (Hướng Newton khả thi; feasible Newton step) | — | không có dẫn chiếu |
| Định lý 04.39 | Định lý 04.41 | **đổi số**; tên (vòng biên tập 1): (Hệ KKT của hướng Newton khả thi) | — | không có dẫn chiếu |
| Nhận xét 04.40 | Nhận xét 04.42 | **đổi số** | — | không có dẫn chiếu |
| Mệnh đề 04.41 | Mệnh đề 04.43 | **đổi số**; tên: (Khử biến và hệ Newton rút gọn; elimination) | — | không có dẫn chiếu |
| Thuật toán 04.3 | Thuật toán 04.44 | **đổi số** (thuật toán vào bộ đếm chung, Q-A); tên: (Newton khả thi; feasible start Newton method) | — | không có dẫn chiếu |
| Nhận xét 04.42 | Nhận xét 04.45 | **đổi số**; tên: (Tính khả thi của các điểm lặp); **đổi nội dung** | — | không có dẫn chiếu |
| Định nghĩa 04.43 | Định nghĩa 04.46 | **đổi số**; tên: (Phần dư KKT; KKT residual) | — | không có dẫn chiếu |
| Mệnh đề 04.44 | Mệnh đề 04.47 | **đổi số** | — | không có dẫn chiếu |
| Mệnh đề 04.45 | Mệnh đề 04.48 | **đổi số** | — | không có dẫn chiếu |
| Thuật toán 04.4 | Thuật toán 04.49 | **đổi số** (thuật toán vào bộ đếm chung, Q-A); tên: (Newton từ điểm chưa khả thi; infeasible start Newton method) | — | không có dẫn chiếu |
| Nhận xét 04.46 | Nhận xét 04.50 | **đổi số** | — | không có dẫn chiếu |
| Định nghĩa 04.47 | Định nghĩa 04.51 | **đổi số** | — | không có dẫn chiếu |
| Mệnh đề 04.48 | Mệnh đề 04.52 | **đổi số** | — | không có dẫn chiếu |
| Bổ đề 04.49 | Bổ đề 04.53 | **đổi số** | — | không có dẫn chiếu |
| Định lý 04.50 | Định lý 04.54 | **đổi số** | — | không có dẫn chiếu |
| Hệ quả 04.51 | Hệ quả 04.55 | **đổi số** | — | không có dẫn chiếu |
| Hệ quả 04.52 | Hệ quả 04.56 | **đổi số** | — | không có dẫn chiếu |
| Định lý 04.53 | Định lý 04.57 | **đổi số** | — | không có dẫn chiếu |
| Nhận xét 04.54 | Nhận xét 04.58 | **đổi số**; tên (vòng biên tập 1): (Kiểm tra giả thiết của cận sai số); **đổi nội dung** (điều kiện cần kiểm là $\delta<1$ và tính tự điều chỉnh) | — | không có dẫn chiếu |
| Mệnh đề 04.55 | Mệnh đề 04.62 | **đổi số** | — | không có dẫn chiếu |
| — | Định nghĩa 04.59 | **mới** (§9.4 Đọc thêm, yêu cầu người dùng 2026-11-12); (Hàm chắn logarit, bài toán tâm hóa và đường trung tâm) | — | — |
| — | Mệnh đề 04.60 | **mới** (§9.4 Đọc thêm, yêu cầu người dùng 2026-11-12); (Điểm khả thi đối ngẫu từ đường trung tâm) | — | — |
| — | Thuật toán 04.61 | **mới** (§9.4 Đọc thêm, yêu cầu người dùng 2026-11-12); (Phương pháp hàm chắn; barrier method) | — | — |

## 2. Ví dụ

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có (grep 2026-11-12) | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| Ví dụ 04.1 | Ví dụ 04.1 | tên (vòng biên tập 1): (Khoanh vùng nghiệm của điều kiện dừng) | — | không có dẫn chiếu |
| Ví dụ 04.2 | Ví dụ 04.2 | tên: (Hệ KKT rút gọn của bài toán Ví dụ 03.18(b)); **đổi nội dung** | lec-06b/lecture-note.md: 2 | 2 chỗ, không đổi số; đã đối chiếu nội dung; lec-06b:66, :1091 "Ví dụ 04.2–04.7" → "Ví dụ 04.3–04.7" (viết tay, Ví dụ 04.2 đổi nội dung) |
| Ví dụ 04.3 | Ví dụ 04.3 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.4 | Ví dụ 04.4 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.5 | Ví dụ 04.5 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.6 | Ví dụ 04.6 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.7 | Ví dụ 04.7 | giữ | lec-05b/lecture-note.md: 1; lec-06b/lecture-note.md: 4 | 7 chỗ, không đổi số; đã đối chiếu nội dung |
| Ví dụ 04.8 | Ví dụ 04.8 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.9 | Ví dụ 04.9 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.10 | Ví dụ 04.10 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.11 | Ví dụ 04.11 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.12 | Ví dụ 04.12 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.13 | Ví dụ 04.13 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.14 | Ví dụ 04.14 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.15 | Ví dụ 04.15 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.16 | Ví dụ 04.16 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.17 | Ví dụ 04.17 | tên: (Hướng Newton không ràng buộc rời đường $u_1+u_2=14$) | — | không có dẫn chiếu |
| Ví dụ 04.18 | Ví dụ 04.18 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.19 | Ví dụ 04.19 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.20 | Ví dụ 04.20 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.21 | Ví dụ 04.21 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.22 | Ví dụ 04.22 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.23 | Ví dụ 04.23 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.24 | Ví dụ 04.24 | giữ | — | không có dẫn chiếu |
| Ví dụ 04.25 | Ví dụ 04.26 | **đổi số** | — | không có dẫn chiếu |
| — | Ví dụ 04.25 | **mới** (§9.4 Đọc thêm); (Đường trung tâm của $\min x^2$ với $x\ge1$) | — | — |

## 3. Tình huống

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có (grep 2026-11-12) | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| Tình huống 04.1 | Tình huống 04.1 | giữ | lec-06c/lecture-note.md: 1 | 1 chỗ, không đổi số; đã đối chiếu nội dung |
| Tình huống 04.2 | Tình huống 04.2 | giữ | — | không có dẫn chiếu |
| Tình huống 04.3 | Tình huống 04.3 | giữ | lec-05b/lecture-note.md: 1; lec-06b/lecture-note.md: 5; lec-06c/lecture-note.md: 6 | 12 chỗ, không đổi số; đã đối chiếu nội dung |

## 4. Bài tập trong ghi chú

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có (grep 2026-11-12) | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| Bài tập 04.1 | Bài tập 04.1 | tên: (Hệ KKT rút gọn của hai bài toán) | — | không có dẫn chiếu |
| Bài tập 04.2 | Bài tập 04.2 | tên: (Quay lui Armijo trên $x_1^2+4x_2^2$) | — | không có dẫn chiếu |
| Bài tập 04.3 | Bài tập 04.3 | tên: (Hướng dốc nhất có trọng số tại $x^1$) | — | không có dẫn chiếu |
| Bài tập 04.4 | Bài tập 04.4 | tên: (Bước cố định tối ưu và phân kỳ) | — | không có dẫn chiếu |
| Bài tập 04.5 | Bài tập 04.5 | tên: (Newton với quay lui từ $s^0=3$) | — | không có dẫn chiếu |
| Bài tập 04.6 | Bài tập 04.6 | tên: (Newton trên mất mát logistic không chính quy hóa) | — | không có dẫn chiếu |
| Bài tập 04.7 | Bài tập 04.7 | tên: (Newton khả thi từ $(8,6)^T$) | — | không có dẫn chiếu |
| Bài tập 04.8 | Bài tập 04.8 | tên: (Hệ khối và hệ rút gọn cho ba biến) | — | không có dẫn chiếu |
| Bài tập 04.9 | Bài tập 04.9 | tên: (Newton cho phần dư từ $(4,2)^T$) | — | không có dẫn chiếu |
| Bài tập 04.10 | Bài tập 04.10 | tên: (Cận sai số cho $-\log s-\log(1-s)$) | — | không có dẫn chiếu |
| Bài tập 04.11 | Bài tập 04.11 | tên: (Đúng hay sai) | — | không có dẫn chiếu |
| Bài tập 04.12 | Bài tập 04.12 | tên: (Newton khả thi cho bài toán tâm giải tích) | — | không có dẫn chiếu |
| Bài tập 04.13 | Bài tập 04.13 | tên: (Ma trận khối khi $H$ không xác định dương) | — | không có dẫn chiếu |
| Bài tập 04.14 | Bài tập 04.14 | tên: (Hạ gradient không cần tính lồi) | — | không có dẫn chiếu |
| Bài tập 04.15 | Bài tập 04.15 | tên: (Thang đo đặc trưng và số điều kiện) | — | không có dẫn chiếu |

## 5. Nhãn công thức

Chỉ dẫn nội bộ; grep không thấy tệp khác dẫn nhãn của Bài 04. Thay bằng từ điển (cũ (5.1) → (8.1) trong khi cũ (2.1) → (5.1)).

| Cũ | Mới | Nội dung |
|---|---|---|
| (1.1), (1.2) | (1.1), (1.2) | $\nabla f(x^*)=0$; hệ KKT rút gọn (Mệnh đề 04.2) |
| (2.1)–(2.6) | (5.1)–(5.6) | $Wd=-g$; Armijo; cận trên bậc hai; $O(1/k)$; $\lVert\nabla f\rVert^2/(2\mu)$; tuyến tính |
| (3.1), (3.2) | (6.1), (6.2) | $Hd=-g$; bất đẳng thức bậc hai |
| (4.1), (4.2) | (7.1), (7.2) | hệ khối Newton khả thi; hệ rút gọn |
| (5.1) | (8.1) | hệ Newton cho phần dư |
| (6.1) | (9.1) | cận $-\delta-\log(1-\delta)$ |
| — | (9.2) | điều kiện tâm (mới, §9.4) |

## 6. Mục

| Cũ | Mới |
|---|---|
| Mục tiêu, Tiên quyết | Mục tiêu (6 mục, bỏ LLO/CLO), Tiên quyết (+ 3 câu hỏi ôn nhanh) |
| — | Đoạn dẫn, Câu hỏi mở đầu, §13 Câu hỏi cuối buổi và cầu nối |
| Bảng ký hiệu (+ danh sách ba ví dụ) | §2 (+ giả thiết (T1)–(T5)), §3 |
| Mục 1 (đoạn đầu), 1.1, 1.2 | §1 |
| Mục 1.3 | §4 |
| Mục 2.1–2.6 | §5.1–5.6 |
| Mục 3.1–3.3 | §6.1–6.3 |
| Mục 4.1–4.3 | §7.1–7.3 |
| Mục 5.1–5.3 | §8.1–8.3 |
| Mục 6.1–6.3 | §9.1–9.3 |
| — | §9.4 Đọc thêm: phương pháp hàm chắn (mới) |
| Mục 7 | §10 |
| Tình huống áp dụng và ứng dụng | §11.1–11.4 |
| Tóm tắt chương | §11.5 (giới hạn và bài sau chuyển sang §13) |
| Bài tập củng cố | §12 (12.1–12.3) |
| Hướng dẫn đọc thêm và tài liệu tham khảo | §14 |

Dẫn theo tên mục từ tệp khác: `lec-05b/lecture-note.md` ("Bài 04, Mục 2.6", "ở Mục 2.6", "Bài 04 (Mục 2.6: …)") → "Mục 5.6" ở giai đoạn 3 (R16). `lec-06b` "đầu Mục 1" là Mục 1 của chính Bài 06b, không đổi.

## 7. Đổi ký hiệu (Q04-3, Q04-13)

| Cũ | Mới | Phạm vi |
|---|---|---|
| $L(w)$ (mất mát logistic, Ví dụ 04.1, Bài tập 04.6) | $J(w)$, $J_0(w)$ | $L$ chỉ là hằng số Lipschitz |
| $\mu$ (hệ số chính quy hóa logistic) | $\rho$ | Ví dụ 04.1 bối cảnh, §6.1 Trong học máy, Tình huống 04.1 ($\mu=\rho=0{,}1$ là hằng số lồi mạnh) |
| $L(u,\nu)$, $L_m(d,\eta)$, $L_s(v,\zeta)$ | $\mathcal L(u,\nu)$, $\mathcal L_Q(d,\eta)$, $\mathcal L_s(v,\chi)$ | Bài tập 04.1, Định nghĩa 04.40, chứng minh Mệnh đề 04.16 |
| $N$ (cơ sở của $\ker A$) | $Z$ | Mệnh đề 04.43, Thuật toán 04.44, Ví dụ 04.19, Bài tập 04.7, 04.8, Hệ quả 04.56, Tình huống 04.2, `equality-nullspace.svg` |
| $N_s$ (số mẫu) | $N$ | Nhận xét 04.20, §6.1, Ví dụ 04.26 |
| $\theta$ (Tiên quyết, trọng số lồi) | $\vartheta$ | Tiên quyết; $\theta$ còn là biến cục bộ ở chứng minh Mệnh đề 04.52 và Tình huống 04.2 |
| $\lambda\succeq0$, $\nu^*\succeq0$ (vector) | $\ge$ | Tiên quyết, Nhận xét 04.3 |
| $\tau$ (biến tích phân, đổi biến thang) | $\varsigma$ | Tiên quyết, Bổ đề 04.19, Nhận xét 04.20, Định lý 04.36, Định lý 04.54 |
| $\varsigma$ (đổi thang, §9.1) | $\tilde s$ | vòng biên tập 1 |
| $\zeta$ (nhân tử trong chứng minh Mệnh đề 04.16) | $\chi$ | chứng minh Mệnh đề 04.16 |
| $B$, $\vartheta$ (hình cầu, bán kính trong Định lý 04.36) | $\mathcal B$, $r_B$ | Định lý 04.36, Ví dụ 04.16 ($B$ dành cho hàm chắn) |
| $B\in\mathbb R^{n\times m}$ (Mệnh đề 04.52(c)) | $T\in\mathbb R^{n\times n'}$ | Mệnh đề 04.52 ($m$ dành cho số bất đẳng thức ở §9.4) |
| $\rho=9/11$ (Ví dụ 04.8, hình) | $c$ | `quadratic-zigzag.svg`, chú thích hình |
| $m(d)$ (mô hình bậc hai trong chứng minh Định lý 04.41, Bài tập 04.13) | $Q_H$; Bài tập 04.13 viết "mô hình $g^Td+\tfrac12d^THd$" | vòng biên tập 1 |
| $D(u)$ (Bài tập 04.5) | $E(u)$ | vòng biên tập 1 ($D$ là miền) |
| $\varsigma$ (biến ở Bước 4 chứng minh Định lý 04.54) | $t$ (tham số của $h(t)$; $\bar t$ là độ dài cố định của Bước 1) | vòng biên tập 1, sửa ở vòng 2 |
| $q(\delta)$ (chứng minh Hệ quả 04.55) | $\omega_2(\delta)$ | vòng biên tập 2 ($q$ là parabol của Câu hỏi mở đầu) |
| $\phi_i$ (chứng minh $B$ lồi, §9.4) | $h_i$ | vòng biên tập 2 |
| $\lambda_i$ (giá trị riêng, Nhận xét 04.14) | $\lambda_i(P)$ | vòng biên tập 2 ($\lambda$ là nhân tử, như Bài 03) |
| $\varepsilon$, $\omega$ (Bước 4 chứng minh Mệnh đề 04.62(d)) | $\mu\in(0,1]$, $\omega_r$ | vòng biên tập 1 |
| $X$, $\tilde X$ (Bài tập 04.15) | $M$, $\tilde M$ | vòng biên tập 1, khớp Ví dụ 04.26 |
| "giảm mô hình" | "mức giảm mô hình" (còn gọi là mức giảm dự báo, Mệnh đề 04.9(c)) | toàn bài, vòng biên tập 1 |
| — | $B$, $\tau$, $\zeta$, $g_{\mathrm d}$ | §9.4: hàm chắn, tham số chắn, hệ số tăng, hàm đối ngẫu (Boyd viết $\phi$, $t$, $\mu$; Bài 03 viết $g$) |

## 8. Ghi chú cho giai đoạn 3 (vòng biên tập 1, 2026-11-12)

- `lec-06b/lecture-note.md:66`, `:1091`: "Ví dụ 04.2–04.7" → "Ví dụ 04.3–04.7" (Ví dụ 04.2 đổi nội dung).
- `lec-05b/lecture-note.md:58`, `lec-06c/lecture-note.md:28`: khoảng $(0,\tfrac12)$ → $(0,\tfrac12]$ khi dẫn Định nghĩa 04.10.
- Chuỗi dễ bị thay hai lần (thay một lượt bằng từ điển, không tuần tự): `lec-06c/lecture-note.md:30`, `lec-05/lecture-note.md:24`, `:2355`.
- "Mục 2.6" → "Mục 5.6" (gồm `lec-05b/lecture-note.md:72`).
- Đổi tên khối (không đổi số): Nhận xét 04.33, Ví dụ 04.1, Định nghĩa 04.40, Định lý 04.41, Nhận xét 04.58; đổi nội dung: Ví dụ 04.2, Nhận xét 04.45, Nhận xét 04.58.

## 9. Giai đoạn 3 (2026-11-12)

- Nhãn công thức của Bài 04: không tệp nào dẫn.
- "Mục 2.6" của Bài 04 → "Mục 5.6": lec-05b:24, :72, :3226 (viết tay).
- lec-05b:468: biến tích phân trong câu thuật lại chứng minh Bổ đề 04.19 đổi $\tau\to\varsigma$ theo ghi chú mới (viết tay).
- Chi tiết: `SP/lec04/phase3-changes.md`.
