# Bảng ánh xạ số hiệu Bài 01 (viết lại theo mẫu SLT, 2026-11-12)

**Cách thay ở giai đoạn 3.** Thay bằng **một lượt** ánh xạ cũ → mới đọc từ bảng (ví dụ một từ điển trong script), không thay tuần tự: bộ đếm chung lùi một số còn Ví dụ tiến một số, nên thay tuần tự sinh dây chuyền (Hệ quả 01.27 → 01.26 rồi 01.26 → 01.25; Ví dụ 01.13 → 01.14 rồi 01.14 → 01.15). Sau khi thay, grep lại mọi số cũ còn sót và đối chiếu loại khối của từng số mới.

**Cụm dẫn phải viết lại tay** (đổi loại khối hoặc đổi bài trong cùng một danh sách):

- `lec-02/lecture-note.md` dòng 23: "Mệnh đề 01.5, 01.6, 01.9" → "Định lý 00.22 và Mệnh đề 00.45 (Bài 00); Hệ quả 01.5; Mệnh đề 01.8".
- `lec-02/lecture-note.md` dòng 1000: "đẳng thức (3.2) của Bài 01 (Mệnh đề 01.5)" → "bước 1 của chứng minh Định lý 00.22 (Bài 00)".
- `lec-05/lecture-note.md` dòng 2355: "Mệnh đề 01.6, 01.9" → "Hệ quả 01.5, Mệnh đề 01.8".
- Mọi "Mệnh đề 01.6(…)" → "Hệ quả 01.5(…)"; mọi "Mệnh đề 01.5(c)" → "Định lý 00.22, kết luận 1" (kèm "Bài 01" → "Bài 00").

Số cũ là số trong ghi chú trước lần viết lại (HEAD ngày 2026-11-12). Cột "Dẫn chiếu hiện có cần đổi" đếm số lần số hiệu cũ xuất hiện trong ghi chú, tệp bài tập và deck khác (grep `materials/*/*.md` trừ `lec-01/`, và `lecture-*.html`, 2026-11-12; mỗi số trong cụm như "Mệnh đề 01.19 và 01.20(a)" được đếm riêng). Giai đoạn 3 grep lại trước khi thay.

## 1. Bộ đếm chung (định nghĩa, định lý, mệnh đề, bổ đề, hệ quả, nhận xét, thuật toán)

Quy luật: 01.1–01.4 giữ số; Mệnh đề 01.5 bỏ; 01.6–01.36 lùi một số; Nhận xét 01.36 mới; 01.37–01.46 giữ số; Thuật toán 01.1 → 01.47.

| Cũ | Mới | Gộp/tách/bỏ, thay đổi | Dẫn chiếu hiện có cần đổi |
|---|---|---|---|
| Định nghĩa 01.1 | Định nghĩa 01.1 | nhãn (2.1) → (4.1) | — |
| Mệnh đề 01.2 | Mệnh đề 01.2 | nhãn (2.2), (2.3), (2.4) → (4.2), (4.3), (4.4); "Điều kiện áp dụng", "Phạm vi" thành câu đọc | — |
| Nhận xét 01.3 | Nhận xét 01.3 | bỏ câu dẫn tiến Hệ quả cũ 01.27 | — |
| Định nghĩa 01.4 | Định nghĩa 01.4 | nhãn (3.1) → (4.5); hàng của $X$ viết $a_i^T$ | lec-02: 1 (không đổi số) |
| Mệnh đề 01.5 | — | **bỏ**: (a) → bước 1 chứng minh Định lý 00.22 (nhân 2); (b) → Mệnh đề 00.45 với $J=2f$; (c) → Định lý 00.22 kết luận 1. Phát biểu lại một đoạn ở §4.2 với nhãn (4.6). Dẫn ngoài đổi sang số Bài 00 (Q01-4), kể cả chữ "Bài 01" → "Bài 00" | lec-02: 2 |
| Mệnh đề 01.6 | Hệ quả 01.5 | đổi loại khối; (a), (b), (c) giữ nghĩa; chứng minh từ Định lý 00.22, 00.9, Mệnh đề 00.20 | deck 05: 7; lec-02: 3; lec-05: 8 |
| Nhận xét 01.7 | Nhận xét 01.6 | ba ý thành danh sách; bỏ ý tổng phần dư (có ở Bài tập 01.3); tiêu đề mới 'Thang đo, công thức nghịch đảo và Hessian' | — |
| Định nghĩa 01.8 | Định nghĩa 01.7 | nhãn (4.1) → (4.7) | deck 05: 2; lec-04: 1; lec-05: 3; lec-05c: 2; lec-06b: 2 |
| Mệnh đề 01.9 | Mệnh đề 01.8 | (a)–(d) giữ; hệ quả "$L>0$" thành (e) | deck 05: 2; lec-02: 3; lec-04: 2; lec-05: 5; lec-05b: 4; lec-05c: 1; lec-06b: 3 |
| Định nghĩa 01.10 | Định nghĩa 01.9 |  | lec-03: 10; lec-05b: 3 |
| Nhận xét 01.11 | Nhận xét 01.10 | gộp mệnh đề văn xuôi về sự tồn tại của dãy cực tiểu hóa | — |
| Định nghĩa 01.12 | Định nghĩa 01.11 |  | lec-02: 2; lec-03: 5; lec-07: 1 |
| Định nghĩa 01.13 | Định nghĩa 01.12 |  | lec-07: 2 |
| Mệnh đề 01.14 | Mệnh đề 01.13 |  | — |
| Nhận xét 01.15 | Nhận xét 01.14 |  | lec-03: 2; lec-04: 1 |
| Mệnh đề 01.16 | Mệnh đề 01.15 |  | lec-02: 9; lec-03: 3 |
| Nhận xét 01.17 | Nhận xét 01.16 | chỉ còn danh sách sáu câu hỏi; quy trình ở Thuật toán 01.47 | — |
| Định nghĩa 01.18 | Định nghĩa 01.17 |  | lec-02: 2; lec-03: 4; lec-04: 1; lec-07: 1 |
| Mệnh đề 01.19 | Mệnh đề 01.18 | (a)–(e) giữ; ký hiệu: $b\to c$, $a\to g$ (pháp tuyến), hộp $\underline x_j\le x_j\le\overline x_j$, tâm cầu $x_{\mathrm c}$ | lec-02: 3; lec-07: 3 |
| Mệnh đề 01.20 | Mệnh đề 01.19 | (a)–(c) giữ; chỉ số $\gamma\in\Gamma\to j\in\mathcal J$, $b\to c$ | lec-02: 3; lec-07: 2 |
| Nhận xét 01.21 | Nhận xét 01.20 | tiêu đề "Khi bỏ giả thiết: …"; thêm ý ánh xạ phi tuyến (tập vùng chết là nghịch ảnh của $[\tfrac14,1]$ qua $u\mapsto u^2$) | — |
| Định nghĩa 01.22 | Định nghĩa 01.21 |  | lec-02: 2; lec-03: 2; lec-04: 1; lec-05b: 6; lec-05c: 2; lec-06: 3 |
| Nhận xét 01.23 | Nhận xét 01.22 |  | lec-02: 1 |
| Định nghĩa 01.24 | Định nghĩa 01.23 |  | lec-04: 1 |
| Mệnh đề 01.25 | Mệnh đề 01.24 |  | lec-02: 5 |
| Định lý 01.26 | Định lý 01.25 |  | lec-02: 1; lec-03: 1; lec-04: 6; lec-05b: 6 |
| Hệ quả 01.27 | Hệ quả 01.26 |  | lec-02: 5; lec-03: 6; lec-04: 3; lec-05: 1; lec-06: 6; lec-06b: 1; lec-06c: 1 |
| Bổ đề 01.28 | Bổ đề 01.27 | biến $t\to\tau$, $T_{x,v}\to\mathcal T_{x,v}$; "$\mathcal T_{x,v}$ là khoảng" vào Kết luận | lec-04: 2 |
| Bổ đề 01.29 | Bổ đề 01.28 | (a), (b) giữ; $T\to\mathcal T$, $s,t\to\tau^\prime,\tau$ | — |
| Định lý 01.30 | Định lý 01.29 | (a), (b) giữ; giả thiết ghi "lớp $C^2$" (cũ: "khả vi hai lần") cho khớp Mệnh đề 00.38 dùng trong chứng minh | lec-02: 15; lec-03: 4; lec-04: 3; lec-06b: 2 |
| Định lý 01.31 | Định lý 01.30 | (a)–(c) giữ; $\alpha_j\to\gamma_j$, $g\to\psi$, $b\to c$ | lec-02: 13; lec-03: 4; lec-04: 2; lec-05b: 1; lec-06: 4; lec-06 (bài tập): 1; lec-07: 2 |
| Nhận xét 01.32 | Nhận xét 01.31 | tiêu đề "Khi bỏ giả thiết: …" | — |
| Định lý 01.33 | Định lý 01.32 |  | lec-02: 2; lec-04: 1 |
| Hệ quả 01.34 | Hệ quả 01.33 |  | lec-02: 2; lec-06: 6; lec-07: 2 |
| Định lý 01.35 | Định lý 01.34 |  | lec-02: 8; lec-03: 2; lec-04: 1; lec-05: 2; lec-07: 2 |
| Định lý 01.36 | Định lý 01.35 | ba bước ý tưởng thành khối `proof` phác thảo | deck 05: 2; lec-02: 9; lec-03: 5; lec-04: 2; lec-05: 5 |
| — | Nhận xét 01.36 | **mới**: Khi bỏ giả thiết của Định lý 01.35 (từ văn xuôi cũ) | — |
| Định nghĩa 01.37 | Định nghĩa 01.37 |  | deck 05: 1; lec-05: 2; lec-05 (bài tập): 1 (không đổi số) |
| Định lý 01.38 | Định lý 01.38 | trong chứng minh $x_0\to\bar x$, giới hạn $\bar x\to x^\prime$ | deck 05: 2; lec-02: 11; lec-05: 4; lec-05 (bài tập): 2 (không đổi số) |
| Định nghĩa 01.39 | Định nghĩa 01.39 |  | lec-04: 3; lec-05b: 4; lec-06b: 1 (không đổi số) |
| Nhận xét 01.40 | Nhận xét 01.40 |  | lec-04: 2; lec-05: 3; lec-05b: 2; lec-06b: 1 (không đổi số) |
| Hệ quả 01.41 | Hệ quả 01.41 | hàm phụ $g\to\tilde f$ | deck 05: 2; lec-04: 2; lec-05: 4; lec-05b: 3 (không đổi số) |
| Định nghĩa 01.42 | Định nghĩa 01.42 | ridge viết $J_\mu=J+\tfrac\mu2\lVert w\rVert_2^2$ (cũ: $J+\mu\lVert w\rVert_2^2=J_{2\mu}$) | lec-02: 1; lec-04: 1; lec-05: 2 (không đổi số) |
| Nhận xét 01.43 | Nhận xét 01.43 | bỏ câu cuối liệt kê số hiệu | deck 05: 2; lec-05: 3 (không đổi số) |
| Mệnh đề 01.44 | Mệnh đề 01.44 |  | — |
| Mệnh đề 01.45 | Mệnh đề 01.45 | bước 2 dẫn Hệ quả 01.5(a) | — |
| Mệnh đề 01.46 | Mệnh đề 01.46 |  | lec-04: 3 (không đổi số) |
| Thuật toán 01.1 | Thuật toán 01.47 | vào bộ đếm chung; chín bước nhóm thành bốn giai đoạn (deck K06); ghi chú diễn giả K06 của deck 01 dẫn "Thuật toán 01.1" → đổi số | deck 01: 1; lec-02: 2 |

## 2. Ví dụ

Quy luật (Q01-3): Ví dụ 01.1 mới (ví dụ xuyên suốt ở §3); Ví dụ cũ 01.k → 01.(k+1), $k=1,\ldots,15$; Ví dụ 01.17 mới (chiếu sáng, từ `exercises.md` Bài 9 và deck K05/K05B).

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có cần đổi |
|---|---|---|---|
| — | Ví dụ 01.1 (Ba quyết định) | mới: dữ kiện của ba tình huống | — |
| Ví dụ 01.1 | Ví dụ 01.2 (Bộ số chuẩn của bài toán điều khiển) |  | — |
| Ví dụ 01.2 | Ví dụ 01.3 (Ảnh hưởng của trọng số năng lượng) |  | — |
| Ví dụ 01.3 | Ví dụ 01.4 (Đường hồi quy cân nặng – chiều cao) | cân nặng $m_i\to s_i$, chiều cao $h_i\to y_i$ | — |
| Ví dụ 01.4 | Ví dụ 01.5 (Ba điểm dữ liệu) |  | — |
| Ví dụ 01.5 | Ví dụ 01.6 (Hai cột trùng nhau) | tham số đường nghiệm $c\to\kappa$ | — |
| Ví dụ 01.6 | Ví dụ 01.7 (Dữ liệu tách được tuyến tính, không có nghiệm) |  | deck 05: 5; lec-02: 1; lec-05: 3 |
| Ví dụ 01.7 | Ví dụ 01.8 (Dữ liệu không tách được, có nghiệm) |  | deck 05: 2; lec-04: 5; lec-05: 2 |
| Ví dụ 01.8 | Ví dụ 01.9 (Cực tiểu địa phương không toàn cục) |  | — |
| Ví dụ 01.9 | Ví dụ 01.10 (Bốn loại kết luận trên ba trường hợp) |  | — |
| Ví dụ 01.10 | Ví dụ 01.11 (Chứng nhận miền bằng phép ghép) | (d) đơn hình viết với $\omega$; (a)–(d) giữ | lec-02: 1 |
| Ví dụ 01.11 | Ví dụ 01.12 (Kiểm tra bằng định nghĩa) |  | lec-02: 2 |
| Ví dụ 01.12 | Ví dụ 01.13 (Điều kiện bậc nhất trên hai bài toán) | **bỏ phần (c)** (Q01-7); (a), (b) chứng nhận tính lồi bằng Định lý 01.25 | — |
| Ví dụ 01.13 | Ví dụ 01.14 (Điều kiện bậc hai trên các hàm của bài) |  | — |
| Ví dụ 01.14 | Ví dụ 01.15 (Chứng nhận tính lồi của các hàm mất mát) | (c) $h\to\ell_{\mathrm{hinge}}$ | lec-02: 2 |
| Ví dụ 01.15 | Ví dụ 01.16 (Chính quy hóa bậc hai với hai đặc trưng trùng nhau) | bỏ ký hiệu $s$; nghiệm viết $w_1=w_2=2/(4+\mu)$ | — |
| — | Ví dụ 01.17 (Phân bố công suất chiếu sáng) | mới; bộ số "Giả sử" $A=\begin{bmatrix}2&1\\1&2\end{bmatrix}$, $\mathcal I_{\mathrm{des}}=(3,3)^T$, $p_{\max}=0{,}8$ (nguồn gốc ghi `review-log.md`) | — |

Giai đoạn 3: mọi "Ví dụ 01.k" ở bài khác đổi thành "Ví dụ 01.(k+1)", kể cả dẫn có phần như "Ví dụ 01.10(d)" → "Ví dụ 01.11(d)", "Ví dụ 01.14(c)" → "Ví dụ 01.15(c)". Dẫn "Ví dụ 01.12(c)" (nếu có) không còn đích: thay bằng Mệnh đề 01.46.

## 3. Tình huống và bài tập

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có cần đổi |
|---|---|---|---|
| Tình huống 01.1 | Tình huống 01.1 | giữ | deck 05: 2; lec-05: 3 |
| Tình huống 01.2 | Tình huống 01.2 | trọng số $\theta\to\omega$ | lec-02: 1 |
| Tình huống 01.3 | Tình huống 01.3 | đầu vào $z\to a$; $P_1,P_2\to\pi^{(1)},\pi^{(2)}$; phần dư $r\to\varrho$ | lec-05: 1 |
| Bài tập 01.1 | Bài tập 01.1 | giữ ở cuối tiểu mục | — |
| Bài tập 01.2 | Bài tập 01.2 | giữ ở cuối tiểu mục | — |
| Bài tập 01.3 | Bài tập 01.3 | giữ ở cuối tiểu mục | — |
| Bài tập 01.4 | Bài tập 01.4 | biến phụ $s\to\rho$ | — |
| Bài tập 01.5 | Bài tập 01.5 | giữ ở cuối tiểu mục | — |
| Bài tập 01.6 | Bài tập 01.6 | giữ ở cuối tiểu mục | — |
| Bài tập 01.7 | Bài tập 01.7 | giữ ở cuối tiểu mục | — |
| Bài tập 01.8 | Bài tập 01.8 | giữ ở cuối tiểu mục | — |
| Bài tập 01.9 | Bài tập 01.9 | giữ ở cuối tiểu mục | — |
| Bài tập 01.10 | Bài tập 01.10 | giữ ở cuối tiểu mục | — |
| Bài tập 01.11 | Bài tập 01.11 | giữ ở cuối tiểu mục | — |
| Bài tập 01.12 | Bài tập 01.12 | giữ ở cuối tiểu mục | — |
| Bài tập 01.13 | Bài tập 01.13 | **sửa lập luận (a)**: cưỡng bức qua $\lambda_{\min}(X^TX)=4-\sqrt{10}$, tồn tại theo Định lý 01.38, duy nhất theo Định lý 01.34 (không dùng Hệ quả 01.41) | — |
| Bài tập 01.14 | Bài tập 01.14 | chuyển vào §11.1; bỏ tiền tố "Nhận biết:" | — |
| Bài tập 01.15 | Bài tập 01.15 | §11.1 | — |
| Bài tập 01.16 | Bài tập 01.16 | §11.2 | — |
| Bài tập 01.17 | Bài tập 01.17 | §11.2 | — |
| Bài tập 01.18 | Bài tập 01.18 | §11.2; mất mát bản lề viết $\ell_{\mathrm{hinge}}$ | — |
| Bài tập 01.19 | Bài tập 01.19 | §11.3; $R_\mu=J+\mu\lVert w\rVert_2^2$ với $\mu=1$ → $J_\mu$ với $\mu=2$; số giữ | — |
| Bài tập 01.20 | Bài tập 01.20 | §11.3; $P_1,P_2\to\pi^{(1)},\pi^{(2)}$ | — |
| Bài tập 01.21 | Bài tập 01.21 | §11.3 | — |
| `exercises.md` Bài 1–8 | bỏ | lý do theo plan §10, ghi `review-log.md` | không bài khác dẫn số bài |
| `exercises.md` Bài 9 | Ví dụ 01.17 | — | deck 01 K05/K05B (không dẫn số) |

## 4. Nhãn công thức

| Cũ | Mới | Nội dung |
|---|---|---|
| (2.1), (2.2), (2.3), (2.4) | (4.1), (4.2), (4.3), (4.4) | bài toán điều khiển, $u_{\mathrm{free}}$, quy tắc cắt, dạng bù bình phương |
| (3.1) | (4.5) | bài toán bình phương nhỏ nhất |
| (3.2) | bỏ | khai triển $J(w+v)$, thuộc bước 1 chứng minh Định lý 00.22 (nhân 2); lec-02 dòng 1000 dẫn "(3.2) của Bài 01 (Mệnh đề 01.5)" |
| (3.3) | (4.6) | phương trình chuẩn (phát biểu lại) |
| (4.1) | (4.7) | bài toán hồi quy logistic |
| (5.1), (6.1), (7.1), (7.2), (7.3) | giữ | lec-02 dẫn (7.1); lec-03 dẫn (7.3) |

## 5. Mục

| Cũ | Mới |
|---|---|
| Mục 1 | Câu hỏi mở đầu, §1, §3 |
| Mục 2 | §4.1 |
| Mục 3 | §4.2 |
| Mục 4 | §4.3 |
| Mục 5 (5.1–5.3) | §5 (5.1–5.3) |
| Mục 6.1 và 6.2 | §6.1 |
| Mục 6.3 | §6.2 |
| Mục 7.1 và 7.2 | §7.1 |
| Mục 7.3, 7.4, 7.5, 7.6 | §7.2, 7.3, 7.4, 7.5 |
| Mục 8.1, 8.2 | §8.1, 8.2 |
| Mục 8.3 | §8.3 (tồn tại) và §8.4 (lồi mạnh, chính quy hóa) |
| Mục 9 | §9.1, §9.2 |
| Tình huống áp dụng và ứng dụng; Tóm tắt chương | §10 |
| Bài tập củng cố | §11 |
| Hướng dẫn đọc thêm và tài liệu tham khảo | §13 |

Dẫn theo mục: lec-02 dòng 170 "các kết luận của Mục 7 và Mục 8 của Bài 01" giữ nghĩa (số mục 7, 8 không đổi).

## 6. Đổi ký hiệu (Q01-2), để giai đoạn 3 kiểm câu dẫn ở bài khác

- Cân nặng $m_i\to s_i$, chiều cao $h_i\to y_i$; hàng ma trận thiết kế $x_i^T\to a_i^T$; $\mathcal R(X)$, $\ker X\to\operatorname{Col}(X)$, $\operatorname{Ker}(X)$.
- Trọng số trộn và đơn hình $\theta\to\omega$; $\theta$ chỉ còn là hệ số tổ hợp lồi.
- Ridge $J_\mu=J+\tfrac\mu2\lVert w\rVert_2^2$; $\mu$ một nghĩa.
- Biến hàm hạn chế $t\to\tau$; mất mát bản lề $h\to\ell_{\mathrm{hinge}}$; mất mát một mẫu $\ell(s,y)\to\operatorname{loss}(\hat y,y)$.
- Độ sáng $I\to\mathcal I$ (tránh trùng ma trận đơn vị $I_d$); số đèn $m\to d$ (tránh trùng biên có dấu).
- Vector toàn số $1$: $\mathbf 1\to\mathbb 1$, như Bài 00.

## 7. Đổi ký hiệu thêm sau vòng rà 1 (2026-11-12)

Không có khối đánh số mới hay bị bỏ; mọi số ở §1–§4 giữ nguyên. Ký hiệu đổi:

- hệ số chặn, hệ số góc $b,a\to w_0,w_1$ ($\hat y=w_0+w_1s$; Ví dụ 01.6: $w'=(w_0,w_1,w_2)$);
- đầu mút của $\operatorname{clip}$: $[\alpha,\beta]\to[\underline u,\overline u]$; biến của sigmoid $s\to\zeta$;
- số ràng buộc $k,k'\to n_{\mathrm{in}},n_{\mathrm{eq}}$; đơn hình $\Delta_k\to\Delta_K$; số hàng ở Mệnh đề 01.18, 01.19 và Định lý 01.30: $k,p\to d'$; số hàm ở Định lý 01.30: $k\to N$; tập mức dưới trong chứng minh Định lý 01.38: $K\to\mathcal K$; chỉ số giờ ở Bài tập 01.14: $k\to j$;
- trọng số mạng ở Tình huống 01.3 và Bài tập 01.20: $(\alpha,\beta)\to(w_{\mathrm r},w_{\mathrm v})$, $\beta_0\to b_0$;
- điểm trung gian của định lý giá trị trung bình (Bổ đề 01.28): $\xi\to\tilde\tau$;
- chỉ số dãy viết chỉ số trên: $x_k,w_k\to x^{(k)},w^{(k)}$ (Định nghĩa 01.9, Nhận xét 01.10, chứng minh Định lý 01.35, 01.38);
- nghiệm của Ví dụ 01.17: $p^*\to p^{\mathrm{opt}}$ ($p^*$ chỉ còn là giá trị tối ưu);
- giả thiết (K1)–(K5) chuyển từ §2 xuống cuối §8.
- Hình chỉ của ghi chú (deck giữ hình cũ): `g00-orange-quality-pipeline-note.svg`, `height-weight-regression-note.svg` (bỏ nhãn nguồn gốc số liệu; trục $s$, $y$), `g01-linear-boundary-2d-note.svg` (trục $z_1$, $z_2$).
