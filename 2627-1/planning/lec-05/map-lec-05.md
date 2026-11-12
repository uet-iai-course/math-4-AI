# Bảng ánh xạ số hiệu Bài 05 (viết lại theo mẫu SLT, 2026-11-12)

Tệp nội bộ (git-ignored). Kế hoạch: `SP/lec05/plan.md`; quyết định Q05-1 đến Q05-10 của điều phối viên: `SP/lec05/decisions.md`.

**Cách thay ở giai đoạn 3.** Thay bằng **một lượt** ánh xạ cũ → mới đọc từ bảng (một từ điển trong script), không thay tuần tự, ranh giới số đầy đủ (`05\.3\b` không khớp `05.30`, `05b.3`), và thay cả các số đứng sau trong danh sách ("Mệnh đề 05.40, 05.41"), loại khối xác định theo từ đứng trước số đầu của danh sách. Bốn khối bỏ ánh xạ sang **số của Bài 04**, nên cụm dẫn đổi cả số bài ("Bài 05, Định lý 05.30" → "Định lý 04.27"): đọc lại câu chứa, không để thành "Bài 05, Định lý 04.27". Quy luật (Q05-1):

- bộ đếm chung: 05.1–05.29 giữ số; bỏ Định lý 05.30, Hệ quả 05.31, Định lý 05.33, Mệnh đề 05.34 (trùng Bài 04 mới, thay bằng câu dẫn); Nhận xét 05.32 → 05.30; Thuật toán 05.1 → 05.31, 05.2 → 05.32 (vào bộ đếm chung, Q-A); cũ 05.35–05.42 trừ 2;
- Ví dụ 05.1–05.25, Tình huống 05.1–05.3 giữ số; Bài tập 05.13 ↔ 05.14 (Q05-6: grep không thấy tệp ngoài dẫn hai số này).

Cột "Dẫn chiếu hiện có" đếm token "Loại 05.k" (grep `materials/*/*.md` trừ `lec-05/`, và `lecture-*.html`, 2026-11-12, theo kế hoạch §8.1); số đứng sau trong danh sách không được đếm. `lec-05/exercises.md` cũ (12 bài tự dựng, không số khối) dẫn 9 token số cũ; tệp này được thay ở giai đoạn 2 nên không đổi ở giai đoạn 3. Các tệp `planning/` dẫn số cũ trong nhật ký lịch sử: không sửa.

## 1. Bộ đếm chung (định nghĩa, định lý, mệnh đề, bổ đề, hệ quả, nhận xét, thuật toán)

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có (grep 2026-11-12) | Giai đoạn 3 |
|---|---|---|---|---|
| Định nghĩa 05.1 | Định nghĩa 05.1 | giữ | — | |
| Nhận xét 05.2 | Nhận xét 05.2 | giữ; viết lại thành danh sách Bài 01, Bài 04, Bài 05b/05c; bỏ gạch Bài 06 | — | |
| Mệnh đề 05.3 | Mệnh đề 05.3 | giữ; chứng minh rút về Mệnh đề 00.45, Định lý 00.22, Hệ quả 01.5 | lec-12: 2 |  giữ số; lec-12:48, 259 đã đối chiếu (phương trình chuẩn, tồn tại, duy nhất khi hạng $d$) |
| Mệnh đề 05.4 | Mệnh đề 05.4 | giữ | — | |
| Định nghĩa 05.5 | Định nghĩa 05.5 | giữ | lec-11: 1; lec-06: 2 |  giữ số; lec-11:52, lec-06:89, 2290 đã đối chiếu |
| Định nghĩa 05.6 | Định nghĩa 05.6 | giữ | lec-06: 3 |  giữ số; lec-06:24, 2290 đã đối chiếu |
| Mệnh đề 05.7 | Mệnh đề 05.7 | giữ; "kể cả để chọn $d$ hay $\lambda$" vào Giả thiết | — | |
| Nhận xét 05.8, 05.9 | giữ | giữ | — | |
| Mệnh đề 05.10, 05.11 | giữ | giữ | — | |
| Nhận xét 05.12 | Nhận xét 05.12 | giữ; bỏ trỏ tiến; thêm giả nghịch đảo (Định nghĩa 00.27) | — | |
| Định nghĩa 05.13 | Định nghĩa 05.13 | giữ | — | |
| Mệnh đề 05.14–05.17 | giữ | giữ | — | |
| Nhận xét 05.18 | Nhận xét 05.18 | giữ | — | |
| Mệnh đề 05.19 | Mệnh đề 05.19 | giữ | — | |
| Định nghĩa 05.20 | Định nghĩa 05.20 | giữ | lec-06: 2 |  giữ số; lec-06:168, 2290 đã đối chiếu |
| Mệnh đề 05.21 | Mệnh đề 05.21 | giữ | — | |
| Định lý 05.22 | Định lý 05.22 | giữ | lec-06: 2 |  giữ số; lec-06:103, 2290 đã đối chiếu |
| Hệ quả 05.23 | Hệ quả 05.23 | giữ; dẫn Nhận xét 04.20 thay H2 của 05b | — | |
| Mệnh đề 05.24 | Mệnh đề 05.24 | giữ | — | |
| Nhận xét 05.25 | Nhận xét 05.25 | giữ số; **đổi nội dung**: ví dụ ranh giới bốn mẫu (từ Bài 6 của `exercises.md` cũ) thay phản ví dụ cũ | deck 05: 1 (LG06) |  giữ số; deck 05:298 đã đối chiếu (trường hợp ranh giới) |
| Định lý 05.26 | Định lý 05.26 | giữ; Bước 2 dẫn thêm Mệnh đề 01.46(b) | lec-06: 3 |  giữ số; lec-06:24, 1554, 2290 đã đối chiếu |
| Hệ quả 05.27 | Hệ quả 05.27 | giữ; bỏ Điều kiện áp dụng, Phạm vi (Bài 7 cũ, Q05-4) | — | |
| Mệnh đề 05.28 | Mệnh đề 05.28 | giữ | — | |
| Nhận xét 05.29 | Nhận xét 05.29 | giữ; bỏ bảng chép Ví dụ 05.14, 05.15; "H3" → Mệnh đề 04.26(a) | — | |
| Định lý 05.30 | **bỏ** → Định lý 04.27 | câu dẫn ở §6.3 | lec-06: 3 |  viết tay → Định lý 04.27: lec-06:1959, 1966; lec-06:2290 chuyển sang cụm Bài 04 |
| Hệ quả 05.31 | **bỏ** → Định lý 04.27 (phần "Do đó") | câu dẫn ở §6.3 | — | |
| Nhận xét 05.32 | Nhận xét 05.30 | **đổi số** | — | |
| Định lý 05.33 | **bỏ** → Định lý 04.37 | đoạn phát biểu lại ở §6.4 (ký hiệu $\bar g$, $\gamma_1$ của Bài 04); câu (9.35) sửa | lec-06: 4; lec-06/exercises: 1 |  viết tay → Định lý 04.37: lec-06:1141, 1978, 1986 ("giai đoạn" → "pha" ở 1141, 1986), lec-06/exercises:376; lec-06:2290 chuyển sang cụm Bài 04 |
| Mệnh đề 05.34 | **bỏ** → Mệnh đề 04.32(c) | đoạn ở §6.4 | deck 05: 1 |  viết tay: deck 05:395 → "Mệnh đề 04.32(c) của ghi chú Bài 04" |
| Thuật toán 05.1 | Thuật toán 05.31 | **đổi số** (Q-A); thêm **Điều kiện dừng.** | — | |
| Thuật toán 05.2 | Thuật toán 05.32 | **đổi số** (Q-A); thêm **Điều kiện dừng.** | — | |
| Mệnh đề 05.35 | Mệnh đề 05.33 | **đổi số** | lec-06: 4 |  đã đổi: lec-06:24, 65, 1125, 2290 |
| Mệnh đề 05.36 | Mệnh đề 05.34 | **đổi số** | — | |
| Nhận xét 05.37 | Nhận xét 05.35 | **đổi số**; bỏ câu Bài 06c | — | |
| Định nghĩa 05.38 | Định nghĩa 05.36 | **đổi số** | lec-06: 4 |  đã đổi: lec-06:24, 1804, 1823, 2290 |
| Mệnh đề 05.39 | Mệnh đề 05.37 | **đổi số** | lec-06: 2; deck 05: 1 |  đã đổi: lec-06:1831, 2290; deck 05:537 |
| Mệnh đề 05.40 | Mệnh đề 05.38 | **đổi số** | lec-06: 4; deck 06: 2 |  đã đổi: lec-06:24, 65, 201, 2290; deck 06:78, 87 |
| Mệnh đề 05.41 | Mệnh đề 05.39 | **đổi số**; Phạm vi ($d_0^q/q!$) vào Kết luận | lec-06: 4 |  đã đổi: lec-06:24, 65, 222, 2290 |
| Nhận xét 05.42 | Nhận xét 05.40 | **đổi số**; điểm 3 bỏ ví dụ $\tfrac{69}{128}$ của Bài 06, viết bất đẳng thức một bước bằng công thức (Q05-10: 05b không có khối riêng; bất đẳng thức là Bước 2 chứng minh Định lý 05b.43) | lec-06: 2 |  đã đổi: lec-06:1953, 2290 |
| khối không số "Hàm cưỡng bức (nhắc lại Định nghĩa 01.37)" | bỏ khối, thành câu | §5.5 | — | |

Tổng token ngoài phải đổi: lec-06/lecture-note.md 27, lec-06/exercises.md 1, deck 05: 2 (05.34 → 04.32(c), 05.39 → 05.37), deck 06: 2 (05.40 → 05.38). Grep sau khi viết (2026-11-12, đếm dòng): deck 05: 2, deck 06: 2, lec-06/exercises.md: 1, lec-06/lecture-note.md: 15 dòng, lec-05/exercises.md: 9 (giai đoạn 2).

## 2. Ví dụ, tình huống, bài tập

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có |
|---|---|---|---|
| Ví dụ 05.1–05.25 | giữ | §3 không là khối; Ví dụ 05.1 thêm lập luận khả nghịch (Q05-3); Ví dụ 05.5 bỏ công thức định thức Vandermonde; Ví dụ 05.20 viết ngưỡng theo $\bar g$; Ví dụ 05.24 thêm câu trả lời Câu hỏi mở đầu | Ví dụ 05.24 ×2, 05.25 ×2 (lec-06), 05.25 ×1 (deck 06) |
| Tình huống 05.1–05.3 | giữ | thành §8.1–8.3 | — |
| Bài tập 05.1–05.12 | giữ | thêm tên ngắn và **Kiểm tra lại.** | — |
| Bài tập 05.13 (cũ: hạ gradient tìm nghiệm chuẩn nhỏ nhất) | Bài tập 05.14 | **đổi số** (Q05-6), §9.2 | — |
| Bài tập 05.14 (cũ: đúng hay sai) | Bài tập 05.13 | **đổi số** (Q05-6), §9.1 | — |
| Bài tập 05.15 | Bài tập 05.15 | giữ, §9.3 | — |

## 3. Nhãn công thức

Chỉ dẫn nội bộ; grep không thấy tệp khác dẫn nhãn của Bài 05.

| Cũ | Mới | Nội dung |
|---|---|---|
| (2.1)–(2.6) | (4.1)–(4.6) | gradient/Hessian bình phương; phương trình chuẩn; $R$; hằng số; cận độ nhạy; hệ có chính quy hóa |
| (3.1)–(3.6) | (5.1)–(5.6) | mất mát logistic; gradient/Hessian; cận Hessian; cận cưỡng bức; $\lambda w_\lambda=-\nabla F$; hằng số |
| (4.1), (4.2) | (6.1), (6.2) | hai quy tắc cập nhật |
| (4.3), (4.4) | bỏ | thuộc khối bỏ |
| (4.5)–(4.8) | (6.3)–(6.6) | Woodbury; $C_{\rm HG}$; $C_{\rm N}$; ngưỡng hòa vốn |
| (5.1), (5.2) | (7.1), (7.2) | hạ gradient theo hướng riêng; số đơn thức |

## 4. Mục

| Cũ | Mới |
|---|---|
| Mục tiêu, Tiên quyết | Mục tiêu (bỏ LLO/CLO), Tiên quyết (+ 3 câu hỏi ôn nhanh) |
| — | Đoạn dẫn, Câu hỏi mở đầu, §10 Câu hỏi cuối buổi và cầu nối |
| Bảng ký hiệu (+ đoạn hai ví dụ) | §2 (+ giả thiết (G1)–(G5)), §3 (ba ví dụ xuyên suốt) |
| Mục 1, 1.1, 1.2 | §1 |
| Mục 2.1–2.6 | §4.1–4.6 |
| Mục 3.1–3.7 | §5.1–5.7 |
| Mục 4.1–4.7 | §6.1–6.7 |
| Mục 5.1–5.3 | §7.1–7.3 |
| Mục 5.4 "Điều không còn giữ được và điều còn giữ được" | §7.4 "Bảo đảm còn lại khi rời khung tất định" |
| Tình huống áp dụng và ứng dụng | §8.1–8.4 |
| Tóm tắt chương | §8.5 (bỏ danh sách theo mục và bảng nhãn trang chiếu; giới hạn và bài sau sang §10) |
| Bài tập củng cố | §9 (9.1–9.3) |
| Hướng dẫn đọc thêm và tài liệu tham khảo | §11 |

Dẫn theo tên mục từ tệp khác: `lec-06/lecture-note.md:87` ("các kết luận về tính không lồi ở Mục 2") là Mục 2 của Bài 06, không đổi.

## 5. Đổi ký hiệu và nội dung

| Cũ | Mới | Phạm vi |
|---|---|---|
| $\gamma$, $\vartheta$ (Định lý 05.33: mức giảm, ngưỡng) | $\gamma_1$, $\bar g$ | §6.4, Ví dụ 05.20 (theo Định lý 04.37) |
| "giai đoạn tắt dần / bậc hai" | "pha tắt dần / pha bậc hai" | §6.4, Ví dụ 05.20, §8, Bài tập 05.13 (theo Bài 04) |
| "H2, H3 của Bài 05b", "Định lý 05b.18" | Định nghĩa 04.18, Nhận xét 04.20, Nhận xét 01.40, Mệnh đề 04.26(a), Định lý 04.27 | §4.5, §5.4, §5.7 |
| $(\tfrac12)^{2^j}$ sau $j$ bước bậc hai | $(\tfrac12)^{2^{j+1}}$ (Boyd và Vandenberghe 2004, (9.35), tr. 488); "sáu bước" → "năm bước" cho $2^{-64}$ | §6.4 (lỗi toán đã xác nhận) |
| "mạng nơ ron" | "mạng nơ-ron" | toàn bài |
| $\lambda$, $n$, $d$, $F$ | giữ (Q05-2); đối chiếu Bài 04 ở Nhận xét 05.2 ($\lambda$ bằng hệ số chính quy hóa của Bài 04 chia cho $N$) | — |
| $\rho$ | chỉ dùng cho độ chính xác tối ưu của Bottou và Bousquet (§6.6, Ví dụ 05.25, §7.2); Nhận xét 05.2 viết "$\lambda$ bằng hệ số chính quy hóa của Bài 04 chia cho $N$", không dùng chữ $\rho$ (vòng biên tập 1) | — |
| $w_0$ (một nghiệm bất kỳ, Mệnh đề 05.10) | $\hat w$ | vòng biên tập 1; điểm đầu trong dãy có tọa độ chặn viết "từ $w=0$" |
| $r$ (vector của Thuật toán 05.31; phần dư Bài tập 05.1; bán kính chứng minh Định lý 05.22) | $\nu$; $\hat r$; $a$ | vòng biên tập 1; $r$ chỉ còn là cận của $\lVert x_i\rVert$ |
| $z$ (điểm số $Xw$ trong thuật toán; cột thêm ở Mệnh đề 05.16) | biên $m=\operatorname{diag}(y)Xw$; $a$ | vòng biên tập 1 |
| $s^2$ (phương sai nhiễu) | $\sigma_\varepsilon^2$; $s_j$ thêm vào bảng ký hiệu | vòng biên tập 1 |
| $K$ (số mô hình, Nhận xét 05.8) | $M$; ma trận Woodbury $M\to Q$ | vòng biên tập 1 |
| $p(u)$ (Ví dụ 05.5); $p$ tỉ lệ lỗi (Ví dụ 05.25); $u$ (Bài tập 05.9, Mệnh đề 05.16) | $\psi(u)$; $\hat e$; $c$, $v'$ | vòng biên tập 1 |
| "MSE ngoài mẫu", "nhóm nhỏ" | "MSE xác thực", "lô nhỏ" (mini-batch) | vòng biên tập 1 |

## 6. Ghi chú cho giai đoạn 3 (vòng biên tập 1, 2026-11-12)

- `lec-06/lecture-note.md:2290`: danh sách "Ghi chú Bài 05: … Định lý 05.22, 05.26, 05.30, 05.33; …" **viết tay**: cụm Bài 05 còn "Định lý 05.22, 05.26"; "Định lý 04.27, 04.37" chuyển vào cụm Bài 04 của dòng. Các số khác theo bảng (Định nghĩa 05.38 → 05.36; Mệnh đề 05.35, 05.39, 05.40, 05.41 → 05.33, 05.37, 05.38, 05.39; Nhận xét 05.42 → 05.40).
- Deck 05, ghi chú diễn giả CP01 (`lecture-05-…html:395`): "Mệnh đề 05.34 của ghi chú bài giảng" **viết tay** thành "Mệnh đề 04.32(c) của ghi chú Bài 04"; ghi lệch vào `review-log.md` (phần "bước hạ gradient đổi theo $T$" nay không còn trong khối đánh số nào của Bài 05).
- Mọi chỗ `lec-06` dẫn khối bị bỏ (Định lý 05.30 → Định lý 04.27 ở 1959, 1966; Định lý 05.33 → Định lý 04.37 ở 1141, 1978, 1986 và `lec-06/exercises.md:376`): đọc lại câu chứa để số Bài 04 không nằm trong cụm "Bài 05"; đổi "giai đoạn tắt dần / hội tụ bậc hai" thành "pha tắt dần / pha bậc hai".
- Khóa của từ điển gồm cả loại khối: `lec-06` chứa cả "Mệnh đề 05.35" (→ 05.33) lẫn "Định lý 05.33" (→ 04.37), "Định nghĩa 05.38" (→ 05.36) lẫn "Mệnh đề 05.38" mới.
- `lec-05/exercises.md` cũ (12 bài tự dựng) được thay ở giai đoạn 2 nên không chạy từ điển; nếu tệp được giữ tạm, phải chạy cùng từ điển (dẫn Định lý 05.30, 05.33, Hệ quả 05.31, Mệnh đề 05.35, 05.36 ×3, 05.40 ×2, Định nghĩa 05.38, Thuật toán 05.1).
- Vòng biên tập 1 không đổi số khối nào; đổi tên: Định lý 05.26 (Tính lồi mạnh của mục tiêu có chính quy hóa bậc hai), Nhận xét 05.9 (Tập xác thực không nhiễu xấp xỉ $2R-\sigma_\varepsilon^2$), Ví dụ 05.4 (Sai số huấn luyện và sai số xác thực theo $d$), §4.3, §5.4.


## 7. Giai đoạn 3 (2026-11-12)

25 cụm ở 5 tệp: 17 tự động, 8 viết tay (lec-06 ghi chú 6, lec-06 bài tập 1, deck 05 một). Chi tiết: `SP/lec05/phase3-changes.md`. Validate: mọi "Loại 05.k" ở mọi tệp tồn tại đúng loại, không còn dẫn tới khối bị bỏ. Ví dụ 05.24, 05.25 giữ số, đã đối chiếu (lec-06:1201, 1804; deck 06:392).
