# Bảng ánh xạ số hiệu Bài 02 (viết lại theo mẫu SLT, 2026-11-12)

**Cách thay ở giai đoạn 3.** Thay bằng **một lượt** ánh xạ cũ → mới đọc từ bảng (một từ điển trong script), không thay tuần tự: Ví dụ 02.1–02.22 tiến một số (02.1 → 02.2, …, 02.22 → 02.23), nên thay tuần tự sinh dây chuyền. Quy luật:

- bộ đếm chung: 02.1–02.43 giữ số, trừ hai khối đổi chỗ ở bản biên tập v2: Hệ quả 02.3 → Hệ quả 02.4, Nhận xét 02.4 → Nhận xét 02.3 (nhận xét được đặt ngay sau Mệnh đề 02.2); Thuật toán 02.1 → Thuật toán 02.44; Định nghĩa 02.44 → 02.45; Mệnh đề 02.45 → 02.46; Nhận xét 02.46 → 02.47;
- Ví dụ: Ví dụ 02.1 mới (Dữ liệu chung); cũ 02.1–02.22 → mới 02.2–02.23; cũ 02.23 bỏ; cũ 02.24–02.29 giữ số;
- Tình huống 02.1–02.3 và Bài tập 02.1–02.17 giữ số;
- nhãn công thức: $(k.j)\to(k+3.j)$ với $k=1,\ldots,6$; cũ (4.5) của luật tỷ lệ không có (Ví dụ cũ 02.23 bỏ; nhãn (4.5) cũ là bài toán công suất, nay (7.5)).

Sau khi thay, grep lại mọi số cũ còn sót và đối chiếu loại khối của từng số mới. Cột "Dẫn chiếu hiện có cần đổi" đếm số lần số hiệu cũ xuất hiện trong ghi chú, tệp bài tập và deck khác (grep `materials/*/*.md` trừ `lec-02/lecture-note.md`, và `lecture-*.html`, ngày 2026-11-12; mỗi số trong một cụm được đếm riêng; `_templates` không tính). Chỉ các số đổi mới cần thay; các số giữ nguyên được liệt kê để đối chiếu nội dung.

**Cụm dẫn phải viết lại tay** (không sửa được chỉ bằng thay số; để lại cho lần viết lại Bài 03 nếu không thuộc giai đoạn 3 của Bài 02):

- `lec-03/lecture-note.md` dòng 29: "**Dạng chuẩn của bài toán tối ưu lồi** (Định nghĩa 02.1)" → "dạng phổ biến" (Q02-1).
- `lec-03/lecture-note.md` dòng 598: Ví dụ 02.5, 02.7 → Ví dụ 02.6, 02.8 (thay số); câu "chi phí tính theo đơn vị $10$ nghìn đồng" khớp Dữ kiện của Ví dụ 02.6, giữ.
- `lec-03/lecture-note.md` dòng 614: "bộ hệ số $\mu$ của Ví dụ 02.7" → Ví dụ 02.8 (Mệnh đề 02.11 dùng $\mu$).
- `lec-03/lecture-note.md` dòng 821 và 904: "dạng chuẩn lồi của Định nghĩa 02.1" → "dạng phổ biến (Định nghĩa 02.1)".
- `lec-03/lecture-note.md` dòng 1982: "Mệnh đề 02.45" → "Mệnh đề 02.46" (thay số).
- `lec-03/lecture-note.md` dòng 2477: Bài 02 nay viết đặc trưng là $u$, mô hình $\hat y=w_1u+w_0$, $w=(w_1,w_0)$; $X^TX=\operatorname{diag}(10,5)$, $X^Ty=(10,3)$ nằm ở Ví dụ 02.1(a), không ở Ví dụ 02.11 → viết lại câu theo ký hiệu này (bỏ "$s$, mà Bài 02 viết là $u$", $b\to w_0$, $a\to w_1$).
- `lec-03/lecture-note.md` dòng 2515: "$E+10\lVert w\rVert_2^2$" → "$J+10\lVert w\rVert_2^2$"; "Ví dụ 02.17" → Ví dụ 02.18 (ridge $\lambda=10$); ràng buộc $\lVert w\rVert_2^2\le\tfrac{29}{100}$ là Ví dụ 02.19.
- `lec-03/lecture-note.md` dòng 2015: "$E(w)=\lVert Xw-y\rVert_2^2$ như Bài 02" → "$J(w)$" (Bài 02 đổi $E\to J$ cho tổng bình phương; $E$ nay là số lỗi).
- Ký hiệu hệ số chặn: Bài 02 đổi $b\to w_0$ (hồi quy, máy vector hỗ trợ, Tình huống 02.1, 02.2); các chỗ ở Bài 03 dẫn công thức của Tình huống 02.2 hoặc Mệnh đề 02.39 với $b$ cần đối chiếu khi viết lại Bài 03.
- Ký hiệu mục tiêu máy vector hỗ trợ: $J(w,b)\to H_\lambda(w,w_0)$; số lỗi $\operatorname{err}\to E$; tập nới lỏng $F,\tilde F\to\mathcal F,\tilde{\mathcal F}$; miền số đặc trưng $F_k\to\mathcal W_k$.

**Trạng thái giai đoạn 3 (2026-11-12).** Đã làm ở `lec-03/lecture-note.md`: dòng 29, 821, 904 và thêm dòng 789 ("dạng chuẩn của Định nghĩa 02.1" → "dạng phổ biến (Định nghĩa 02.1)", cùng lỗi tên dạng); dòng 598, 614, 1982 (thay số); dòng 2015 (giữ ký hiệu $E$ của Bài 03, viết "tức $J(w)$ của Bài 02"); dòng 2477–2480 (Ví dụ 02.1(a), $u$, $w_1$, $w_0$ trong câu và công thức hiển thị; giữ $E$); dòng 2515 (Ví dụ 02.17 → 02.18; giữ $E$ vì $E$ là ký hiệu được định nghĩa trong Tình huống 03.2). Để lại cho lần viết lại Bài 03: $b$, $z$ thay cho $w_0$, $u$ khi dẫn Tình huống 02.2 và Mệnh đề 02.39 (dòng 33, 1064, 2417, 2421); $\ell$, $\rho$ thay cho $L$, $\lambda$ khi dẫn Mệnh đề 02.26 (dòng 32, 294, 1950); ký hiệu $E$ trong §5.3 và Tình huống 03.2. Bài 07 dẫn Định lý 02.15 với ký hiệu cục bộ cũ ($\ell_{i1}$, $\phi$); để lại cho lần viết lại Bài 07. Không tệp nào dẫn Ví dụ 02.23 cũ, mục 4.5 cũ hay luật tỷ lệ.

## 1. Bộ đếm chung (định nghĩa, định lý, mệnh đề, bổ đề, hệ quả, nhận xét, thuật toán)

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có cần đổi | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| Định nghĩa 02.1 | Định nghĩa 02.1 | tên "dạng chuẩn" → "dạng phổ biến" (Q02-1); nhãn (1.1) → (4.1) | lec-03: 6 | không đổi số; 6 chỗ, đã đối chiếu nội dung; 4 cụm ở lec-03 viết lại "dạng chuẩn (lồi)" → "dạng phổ biến" |
| Mệnh đề 02.2 | Mệnh đề 02.2 | tên đổi theo "dạng phổ biến"; "Điều kiện áp dụng", "Phạm vi" thành câu đọc | — | không có dẫn chiếu |
| Hệ quả 02.3 | **Hệ quả 02.4** | đổi số (v2: Nhận xét về giả thiết đặt trước hệ quả); tên đổi; nhãn (1.2) → (4.2); "Phạm vi" thành câu đọc có nguồn Boyd §4.2.3 | — | không có dẫn chiếu |
| Nhận xét 02.4 | **Nhận xét 02.3** | đổi số (v2), đặt ngay sau Mệnh đề 02.2; tiêu đề mới "Khi bỏ giả thiết: biểu diễn, chiều bất đẳng thức, đẳng thức không affine" | — | không có dẫn chiếu |
| Định nghĩa 02.5 | Định nghĩa 02.5 | nhãn (1.3) → (4.3) | lec-03: 3 | không đổi số; 3 chỗ, đã đối chiếu nội dung |
| Mệnh đề 02.6 | Mệnh đề 02.6 | "Phạm vi" viết lại thành câu đọc (báo cáo §6) | lec-03: 1 | không đổi số; 1 chỗ, đã đối chiếu nội dung |
| Nhận xét 02.7 | Nhận xét 02.7 |  | lec-03: 1 | không đổi số; 1 chỗ, đã đối chiếu nội dung |
| Nhận xét 02.8 | Nhận xét 02.8 |  | lec-07: 2 | không đổi số; 2 chỗ, đã đối chiếu nội dung |
| Định nghĩa 02.9 | Định nghĩa 02.9 | nhãn (2.2), (2.3) → (5.2), (5.3); vế phải dạng chuẩn $e\to\tilde b$; (5.2) gọi là *dạng tổng quát* (general form, Boyd và Vandenberghe (2004) (4.27), tr. 146); khi $p=0$ gọi là *dạng bất đẳng thức* ((4.29), tr. 147); bỏ "dạng phổ biến (dạng bất đẳng thức)"; tiêu đề §5.2 "Định nghĩa, dạng tổng quát và dạng chuẩn" | lec-07: 5 | không đổi số; 5 chỗ, đã đối chiếu nội dung |
| Mệnh đề 02.10 | Mệnh đề 02.10 | nhãn theo Định nghĩa 02.9; $\succeq\to\ge$ cho vector | deck 07-quy-: 1; lec-07: 3 | không đổi số; 4 chỗ, đã đối chiếu nội dung |
| Mệnh đề 02.11 | Mệnh đề 02.11 | bỏ dẫn "Bài 03" trong thân bài (chuyển §12) | lec-03: 14; lec-07: 5 | không đổi số; 19 chỗ, đã đối chiếu nội dung |
| Nhận xét 02.12 | Nhận xét 02.12 | nguồn đỉnh tối ưu: MIT 15.093J lec2 slide 23 thay Bertsimas–Tsitsiklis; bỏ "Định lý 07.23", "Buổi 8" | lec-07: 1 | không đổi số; 1 chỗ, đã đối chiếu nội dung |
| Định nghĩa 02.13 | Định nghĩa 02.13 |  | lec-07: 1 | không đổi số; 1 chỗ, đã đối chiếu nội dung |
| Bổ đề 02.14 | Bổ đề 02.14 |  | lec-07: 2 | không đổi số; 2 chỗ, đã đối chiếu nội dung |
| Định lý 02.15 | Định lý 02.15 | ký hiệu cục bộ: mảnh affine $s_{ik}(x)=a_{ik}^Tx+\beta_{ik}$, cực đại $\bar s_i$ (v2, thay $g_{ik},\bar g_i$, $m_i$); phần giữ nguyên của mục tiêu $f\to f_0$ | lec-07: 6 | không đổi số; 6 chỗ, đã đối chiếu nội dung |
| Nhận xét 02.16 | Nhận xét 02.16 |  | — | không có dẫn chiếu |
| Định nghĩa 02.17 | Định nghĩa 02.17 | hằng số $s\to\rho_0$; nhãn (3.1) → (6.1) | lec-03: 1 | không đổi số; 1 chỗ, đã đối chiếu nội dung |
| Mệnh đề 02.18 | Mệnh đề 02.18 | "khả vi hai lần" → lớp $C^2$; bước 2 dẫn Mệnh đề 00.18 | — | không có dẫn chiếu |
| Nhận xét 02.19 | Nhận xét 02.19 |  | — | không có dẫn chiếu |
| Định nghĩa 02.20 | Định nghĩa 02.20 |  | — | không có dẫn chiếu |
| Mệnh đề 02.21 | Mệnh đề 02.21 |  | deck 05-khon: 2; lec-05: 3 | không đổi số; 5 chỗ, đã đối chiếu nội dung |
| Bổ đề 02.22 | Bổ đề 02.22 | tâm $m\to s_0$; độ cong $\alpha\to\eta$, hàm $\phi\to\mathcal Q$ (v2); nhãn (3.3) → (6.3) | — | không có dẫn chiếu |
| Nhận xét 02.23 | Nhận xét 02.23 |  | — | không có dẫn chiếu |
| Định nghĩa 02.24 | Định nghĩa 02.24 | $s_i\to\rho_i$; nhãn (3.4) → (6.4) | lec-03: 1 | không đổi số; 1 chỗ, đã đối chiếu nội dung |
| Mệnh đề 02.25 | Mệnh đề 02.25 | "Phạm vi" (tập khả thi bị chặn) thành kết luận (b); bước 2 dẫn Mệnh đề 00.18 | — | không có dẫn chiếu |
| Mệnh đề 02.26 | Mệnh đề 02.26 |  | lec-03: 5 | không đổi số; 5 chỗ, đã đối chiếu nội dung |
| Nhận xét 02.27 | Nhận xét 02.27 | tiêu đề v2 "Số hạng phạt và ràng buộc chặn chuẩn"; bỏ đoạn "Đổi chiều ràng buộc" | — | không có dẫn chiếu |
| Định nghĩa 02.28 | Định nghĩa 02.28 |  | — | không có dẫn chiếu |
| Định nghĩa 02.29 | Định nghĩa 02.29 |  | — | không có dẫn chiếu |
| Mệnh đề 02.30 | Mệnh đề 02.30 |  | — | không có dẫn chiếu |
| Bổ đề 02.31 | Bổ đề 02.31 |  | — | không có dẫn chiếu |
| Định lý 02.32 | Định lý 02.32 | "khả vi hai lần" → lớp $C^2$; trung bình có trọng số $\bar\alpha\to\hat\alpha$ (v2); nhãn (4.3) → (7.3) | — | không có dẫn chiếu |
| Định lý 02.33 | Định lý 02.33 | đơn thức đẳng thức: $d_j,\gamma_j,\delta_j\to\bar c_j,\bar\alpha_j,\bar\beta_j$; nhãn (4.4) → (7.4); câu "mọi $f_i$ là đơn thức thì quy hoạch tuyến tính" thành kết luận (d) | — | không có dẫn chiếu |
| Nhận xét 02.34 | Nhận xét 02.34 |  | — | không có dẫn chiếu |
| Định nghĩa 02.35 | Định nghĩa 02.35 | $\ell_h\to\ell_{\mathrm{hinge}}$, hệ số chặn $b\to w_0$ | — | không có dẫn chiếu |
| Mệnh đề 02.36 | Mệnh đề 02.36 | $\operatorname{err}\to E$; căn cứ bước 1 dẫn Ví dụ 01.15(c) | — | không có dẫn chiếu |
| Nhận xét 02.37 | Nhận xét 02.37 |  | — | không có dẫn chiếu |
| Định nghĩa 02.38 | Định nghĩa 02.38 | mục tiêu $J(w,b)\to H_\lambda(w,w_0)$; nhãn (5.1) → (8.1) | lec-03: 1 | không đổi số; 1 chỗ, đã đối chiếu nội dung |
| Mệnh đề 02.39 | Mệnh đề 02.39 | $J\to H_\lambda$, $b\to w_0$; trong chứng minh $M\to U$, $K\to\bar H$ | lec-03: 4 | không đổi số; 4 chỗ, đã đối chiếu nội dung |
| Nhận xét 02.40 | Nhận xét 02.40 |  | — | không có dẫn chiếu |
| Định nghĩa 02.41 | Định nghĩa 02.41 | $F,\tilde F\to\mathcal F,\tilde{\mathcal F}$; mục tiêu chung $f\to f_0$ (v2) | — | không có dẫn chiếu |
| Mệnh đề 02.42 | Mệnh đề 02.42 | $F,\tilde F\to\mathcal F,\tilde{\mathcal F}$; $f\to f_0$ (v2) | — | không có dẫn chiếu |
| Nhận xét 02.43 | Nhận xét 02.43 | $\operatorname{err}\to E$; bỏ "(Mục 3.3, 6.2)" | — | không có dẫn chiếu |
| Thuật toán 02.1 | Thuật toán 02.44 |  | — | không có dẫn chiếu |
| Định nghĩa 02.44 | Định nghĩa 02.45 |  | — | không có dẫn chiếu |
| Mệnh đề 02.45 | Mệnh đề 02.46 |  | lec-03: 1 | đã thay 1 chỗ |
| Nhận xét 02.46 | Nhận xét 02.47 |  | — | không có dẫn chiếu |

## 2. Ví dụ

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có cần đổi | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| — | Ví dụ 02.1 (Dữ liệu chung) | **mới**: gom dữ liệu năm quan sát (cũ §2.4) và bốn ảnh (cũ §5); các ví dụ sau chỉ chép số cần dùng | — | — |
| Ví dụ 02.1 | Ví dụ 02.2 |  | — | không có dẫn chiếu |
| Ví dụ 02.2 | Ví dụ 02.3 |  | — | không có dẫn chiếu |
| Ví dụ 02.3 | Ví dụ 02.4 |  | — | không có dẫn chiếu |
| Ví dụ 02.4 | Ví dụ 02.5 |  | — | không có dẫn chiếu |
| Ví dụ 02.5 | Ví dụ 02.6 |  | lec-03: 1 | đã thay 1 chỗ |
| Ví dụ 02.6 | Ví dụ 02.7 |  | — | không có dẫn chiếu |
| Ví dụ 02.7 | Ví dụ 02.8 |  | lec-03: 2 | đã thay 2 chỗ |
| Ví dụ 02.8 | Ví dụ 02.9 |  | — | không có dẫn chiếu |
| Ví dụ 02.9 | Ví dụ 02.10 |  | — | không có dẫn chiếu |
| Ví dụ 02.10 | Ví dụ 02.11 |  | — | không có dẫn chiếu |
| Ví dụ 02.11 | Ví dụ 02.12 |  | lec-03: 1 | viết tay 1 chỗ: lec-03, Tình huống 03.2 dẫn Ví dụ 02.1(a) (nơi có $X^TX$, $X^Ty$), cùng ký hiệu $u$, $w_1$, $w_0$ |
| Ví dụ 02.12 | Ví dụ 02.13 |  | — | không có dẫn chiếu |
| Ví dụ 02.13 | Ví dụ 02.14 |  | — | không có dẫn chiếu |
| Ví dụ 02.14 | Ví dụ 02.15 |  | — | không có dẫn chiếu |
| Ví dụ 02.15 | Ví dụ 02.16 |  | — | không có dẫn chiếu |
| Ví dụ 02.16 | Ví dụ 02.17 |  | — | không có dẫn chiếu |
| Ví dụ 02.17 | Ví dụ 02.18 |  | lec-03: 1 | đã thay 1 chỗ |
| Ví dụ 02.18 | Ví dụ 02.19 |  | — | không có dẫn chiếu |
| Ví dụ 02.19 | Ví dụ 02.20 |  | — | không có dẫn chiếu |
| Ví dụ 02.20 | Ví dụ 02.21 |  | — | không có dẫn chiếu |
| Ví dụ 02.21 | Ví dụ 02.22 |  | — | không có dẫn chiếu |
| Ví dụ 02.22 | Ví dụ 02.23 |  | — | không có dẫn chiếu |
| Ví dụ 02.23 (Chia ngân sách theo luật tỷ lệ, số liệu giả lập) | — | **bỏ** (Q02-3: không có nguồn Hoffmann và cộng sự (2022) trong `sources/`) | — | không có dẫn chiếu |
| Ví dụ 02.24 | Ví dụ 02.24 |  | — | không có dẫn chiếu |
| Ví dụ 02.25 | Ví dụ 02.25 |  | — | không có dẫn chiếu |
| Ví dụ 02.26 | Ví dụ 02.26 | tiêu đề v2 "Mất mát bản lề có vô số nghiệm trên dữ liệu tách được"; dẫn Bài tập 01.18 một lần, không tính lại câu hỏi cuối Bài 01 | — | không có dẫn chiếu |
| Ví dụ 02.27 | Ví dụ 02.27 |  | lec-03: 3 | không đổi số; 3 chỗ, đã đối chiếu nội dung |
| Ví dụ 02.28 | Ví dụ 02.28 |  | lec-03: 1 | không đổi số; 1 chỗ, đã đối chiếu nội dung |
| Ví dụ 02.29 | Ví dụ 02.29 |  | — | không có dẫn chiếu |

## 3. Tình huống và bài tập

| Cũ | Mới | Thay đổi | Dẫn chiếu hiện có cần đổi | Giai đoạn 3 (2026-11-12) |
|---|---|---|---|---|
| Tình huống 02.1 | Tình huống 02.1 (§10.1) | cột thiết lập $x_j\to s^{(j)}$; $c\to\hat w$; $b\to w_0$ | — | không có dẫn chiếu |
| Tình huống 02.2 | Tình huống 02.2 (§10.2) | $J\to H_\lambda$, $b\to w_0$ | lec-03: 4 | không đổi số; 4 chỗ, đã đối chiếu nội dung |
| Tình huống 02.3 | Tình huống 02.3 (§10.3) | bỏ câu nhánh – cận (Q02-7); ngân sách $K\to\mathcal K$ | lec-03: 3 | không đổi số; 3 chỗ, đã đối chiếu nội dung |
| Bài tập 02.1–02.10 | giữ số, cuối tiểu mục | thêm tiêu đề, **Kiểm tra lại.**; rút phần chép lại mệnh đề | — | — |
| Bài tập 02.11–02.17 | giữ số, §11.1–§11.3 | bỏ tiền tố mức trong tiêu đề; 02.13: hệ số tổ hợp lồi $\vartheta$; 02.14: $c\to\hat w$; 02.16: bỏ khung luật tỷ lệ (Q02-3), biến $x_1,x_2$, $K\to\mathcal K$; 02.17: $\theta\to\omega$ | — | — |
| Bài 1–14 của `exercises.md` | bỏ | U2: bài tự dựng không chuyển sang tệp mới; tệp mới bắt đầu từ Bài tập 02.18 (giai đoạn 2) | — | — |

## 4. Nhãn công thức

| Cũ | Mới | Nội dung |
|---|---|---|
| (1.1), (1.2), (1.3) | (4.1), (4.2), (4.3) | dạng phổ biến; điều kiện bậc nhất; hai bất đẳng thức của biến đổi tương đương |
| (2.1), (2.2), (2.3) | (5.1), (5.2), (5.3) | bài toán pha trộn; quy hoạch tuyến tính dạng phổ biến; dạng chuẩn |
| (3.1), (3.2), (3.3), (3.4) | (6.1), (6.2), (6.3), (6.4) | quy hoạch bậc hai; bù bình phương của $J$; ngưỡng mềm; quy hoạch bậc hai có ràng buộc bậc hai |
| (4.1), (4.2), (4.3), (4.4), (4.5) | (7.1), (7.2), (7.3), (7.4), (7.5) | quy hoạch hình học dạng chuẩn; logarit của đơn thức, tổng đơn thức dương; Hessian log-sum-exp; dạng lồi; phân bổ công suất |
| (5.1), (5.2) | (8.1), (8.2) | máy vector hỗ trợ lề mềm; bài toán chọn gói |
| (6.1), (6.2) | (9.1), (9.2) | giới hạn số đặc trưng; thay bằng số hạng phạt chuẩn một |

Không tệp nào khác dẫn nhãn công thức của Bài 02 (grep "(k.j) … Bài 02": 0 kết quả).

## 5. Mục

| Cũ | Mới |
|---|---|
| Mục tiêu học tập, Kiến thức tiên quyết, Bảng ký hiệu | Mục tiêu học tập, Kiến thức tiên quyết, §2 |
| — | Câu hỏi mở đầu, §1, §3 |
| Mục 1 (1.1–1.4) | §4 (4.1–4.4) |
| Mục 2 (2.1–2.4) | §5 (5.1–5.4) |
| Mục 3 (3.1–3.4) | §6 (6.1–6.4) |
| Mục 4 (4.1–4.4); 4.5 | §7 (7.1–7.4; v2: 7.4 thành "Đọc thêm: phân bổ công suất cho hai đường truyền", hệ số đường truyền $\chi_{ij}$, công suất tối ưu $p^{\mathrm{opt}}$); 4.5 bỏ (Q02-3) |
| Mục 5 (5.1–5.4) | §8 (8.1–8.4) |
| Mục 6 (6.1–6.2) | §9 "Nhận dạng lớp bài toán và kiểm tra phép xử lý" (9.1–9.2); bảng kiểm tra gộp vào bước 8 của Thuật toán 02.44 (Q02-8); danh sách giả thiết (L1)–(L5) chuyển từ §2 vào §9.1 (v2) |
| Tình huống áp dụng và ứng dụng | §10.1–10.4 |
| Tóm tắt chương | §10.5 |
| Bài tập củng cố | §11 |
| — | §12 Câu hỏi cuối buổi và cầu nối |
| Hướng dẫn đọc thêm và tài liệu tham khảo | §13 |

Dẫn tới số mục của Bài 02 từ tệp khác: không có (grep "Mục k … Bài 02": 0 kết quả).
