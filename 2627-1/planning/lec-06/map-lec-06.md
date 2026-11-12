# Bảng ánh xạ số hiệu Bài 06 (viết lại theo mẫu SLT, 2026-11-12)

Tệp nội bộ (git-ignored). Kế hoạch: `SP/lec06/plan.md`; quyết định Q06-1 đến Q06-8 của điều phối viên: `SP/lec06/decisions.md`. Bản nháp: `SP/lec06/draft-v3.md` (v1, v2 lưu cùng thư mục).

**Cách thay ở giai đoạn 3.** Thay bằng **một lượt** ánh xạ cũ → mới đọc từ bảng (một từ điển trong script), không thay tuần tự, ranh giới số đầy đủ (`06\.1\b` không khớp `06.12`, `06b.1`), thay cả các số đứng sau trong danh sách ("Mệnh đề 06.4, 06.8, 06.9"), loại khối xác định theo từ đứng trước số đầu của danh sách. Thuật toán vào bộ đếm chung (Q-A), nên khóa của từ điển gồm cả loại khối ("Thuật toán 06.1" → 06.11, khác "Định nghĩa 06.1" giữ). Quy luật (Q06-1):

- bộ đếm chung: 06.1, 06.2 giữ; bỏ Định nghĩa 06.3 (→ Định nghĩa 05.20), Mệnh đề 06.4 (→ Mệnh đề 05.38(1)), Định nghĩa 06.26 (→ §2 "Ký hiệu và giả thiết"), Nhận xét 06.42 (→ danh sách ở §9.6, dẫn Nhận xét 05.40); cũ 06.5–06.12 trừ 2; Mệnh đề 06.7 → **Hệ quả** 06.5 (khóa đổi cả loại); Thuật toán 06.1 → 06.11; cũ 06.13–06.25 trừ 1; Thuật toán 06.2 → 06.25; cũ 06.27–06.38 trừ 1; Thuật toán 06.3 → 06.38; 06.39–06.41 giữ;
- Ví dụ: 06.1 giữ; bỏ Ví dụ 06.2 (→ Mệnh đề 05.38(2)), Ví dụ 06.18 (→ Ví dụ 05.25) và Ví dụ 06.22 (→ Ví dụ 05b.19); cũ 06.3–06.17 trừ 1; cũ 06.19–06.21 trừ 2; cũ 06.23–06.25 trừ 3;
- Tình huống 06.1–06.3 và Bài tập 06.1–06.11 giữ số;
- nhãn công thức: cũ $(k.m)$ → mới $(k{+}2.m)$ với $k=2,\ldots,6$.

Cột "Dẫn chiếu ngoài" đếm token "Loại 06.k" (grep `materials/*/*.md` trừ `lec-06/`, và `lecture-*.html`, 2026-11-12); số đứng sau trong danh sách được đếm riêng khi có. Deck 06 và mọi deck khác: 0 token "06.k" (deck đánh số "Mệnh đề 1, 2, 3" riêng). `lec-06/exercises.md` cũ (11 bài tự dựng) dẫn nhiều số cũ (dòng 3, 28, 45, 51, 63…); tệp này được thay ở giai đoạn 2 nên không chạy từ điển ở giai đoạn 3. Các tệp `planning/` là nhật ký: không sửa.

## 1. Bộ đếm chung (định nghĩa, định lý, mệnh đề, bổ đề, hệ quả, nhận xét, thuật toán)

| Cũ | Mới | Mục mới | Thay đổi | Dẫn chiếu ngoài (grep 2026-11-12) | Giai đoạn 3 |
|---|---|---|---|---|---|
| Định nghĩa 06.1 | Định nghĩa 06.1 | §1 | giữ; thêm "khả vi theo đối số thứ nhất", nhãn $\{-1,+1\}$ | — | |
| Nhận xét 06.2 | Nhận xét 06.2 | §1 | giữ; $d\leftrightarrow d_0$, $c\leftrightarrow w_0$, $\tau^2$ | — | |
| Định nghĩa 06.3 | **bỏ** → Định nghĩa 05.20 | §4.1 (câu) | Q-D | — | |
| Mệnh đề 06.4 (+ chứng minh) | **bỏ** → Mệnh đề 05.38(1) | §4.1 (câu) | Q-D, Q06-1 | — (`lec-06/exercises.md:3` dẫn, tệp thay ở giai đoạn 2) | |
| Mệnh đề 06.5 | Mệnh đề 06.3 | §4.2 | chứng minh dẫn 05.38(1) | — | |
| Định nghĩa 06.6 | **Định nghĩa 06.4** | §4.3 | đổi số | lec-14: 3 (dòng 3, 46, 373) | đã đổi 3 token (2026-11-12, `SP/lec06/phase3-changes.md`) |
| Mệnh đề 06.7 | **Hệ quả 06.5** | §4.3 | đổi loại (vòng biên tập 1): suy từ Mệnh đề 06.3 | — | |
| Mệnh đề 06.8 | Mệnh đề 06.6 | §4.4 | Phạm vi ($m!$ bản sao) thành câu sau khối | — | |
| Mệnh đề 06.9 | Mệnh đề 06.7 | §4.4 | giả thiết thành danh sách | — | |
| Nhận xét 06.10 | Nhận xét 06.8 | §4.4 | mục 1 gộp phép tính $0{,}503$; mục 2, 3 viết khẳng định | — | |
| Định nghĩa 06.11 | Định nghĩa 06.9 | §5.2 | | — | |
| Bổ đề 06.12 | Bổ đề 06.10 | §5.3 | | — | |
| Thuật toán 06.1 | **Thuật toán 06.11** | §5.4 | vào bộ đếm chung; thêm Điều kiện dừng, Chi phí ghi số | — | |
| Mệnh đề 06.13 | **Mệnh đề 06.12** | §5.4 | đổi số | lec-14: 2 (dòng 46, 373) | đã đổi 2 token (2026-11-12) |
| Nhận xét 06.14 | Nhận xét 06.13 | §5.4 | tiêu đề "Điểm gãy của ReLU và giả thiết (H2)"; thêm đoạn (H0), (H2) với ReLU (vòng biên tập 1–2) | — | |
| Mệnh đề 06.15 | Mệnh đề 06.14 | §5.5 | bộ nhớ thành câu sau khối | — | |
| Định nghĩa 06.16 | Định nghĩa 06.15 | §6.1 | | — | |
| Mệnh đề 06.17 | Mệnh đề 06.16 | §6.3 | | — | |
| Nhận xét 06.18 | Nhận xét 06.17 | §6.3 | | — | |
| Bổ đề 06.19 | Bổ đề 06.18 | §6.4 | tiêu đề "trên một tập lồi" | — | |
| Định lý 06.20 | Định lý 06.19 | §6.5 | | — | |
| Nhận xét 06.21 | Nhận xét 06.20 | §6.6 | viết khẳng định (Q06-8: chờ rà toán) | — | |
| Định lý 06.22 | Định lý 06.21 | §7.2 | $\sigma_\ell^2$ → $V(\theta)$ | — | |
| Nhận xét 06.23 | Nhận xét 06.22 | §7.2 | | — | |
| Định nghĩa 06.24 | Định nghĩa 06.23 | §7.3 | "lô nhỏ (mini-batch)" | — | |
| Định lý 06.25 | Định lý 06.24 | §7.3 | | — | |
| Thuật toán 06.2 | **Thuật toán 06.25** | §7.4 | vào bộ đếm chung; Điều kiện dừng; chu kỳ $T$ | — | |
| Định nghĩa 06.26 | **bỏ khối** → §2 | §2 | (H6), (H6a), (H6b) phát biểu cho $g_k$ của Định nghĩa 06.1 | — | |
| Mệnh đề 06.27 | Mệnh đề 06.26 | §7.4 | | — | |
| Nhận xét 06.28 | Nhận xét 06.27 | §7.4 | thêm mục "Khả vi" (ReLU) | — | |
| Mệnh đề 06.29 | Mệnh đề 06.28 | §8.1 | | — | |
| Nhận xét 06.30 | Nhận xét 06.29 | §8.1 | | — | |
| Định lý 06.31 | Định lý 06.30 | §8.2 | | — | |
| Định lý 06.32 | Định lý 06.31 | §8.3 | | — | |
| Nhận xét 06.33 | Nhận xét 06.32 | §8.3 | bỏ mục 2 cũ (Q06-4); còn ba mục | — | |
| Định lý 06.34 | Định lý 06.33 | §8.4 | kết luận về $\tilde k$ chuyển từ Phạm vi vào Kết luận | — | |
| Hệ quả 06.35 | Hệ quả 06.34 | §8.4 | | — | |
| Nhận xét 06.36 | Nhận xét 06.35 | §8.4 | | — | |
| Mệnh đề 06.37 | Mệnh đề 06.36 | §8.5 | tiêu đề "Hai cận trên với cùng tổng ngân sách"; kết luận 3 viết $\mathcal B/n<(n-b)^2/(2n)$; câu "hai đại lượng" sửa (Q06-8) | — | |
| Nhận xét 06.38 | Nhận xét 06.37 | §8.5 | tiêu đề "Mức chính xác đủ dùng" | — | |
| Thuật toán 06.3 | **Thuật toán 06.38** | §8.6 | vào bộ đếm chung; dừng khi thuật toán con dừng; chu kỳ $T$ | — | |
| Nhận xét 06.39 | Nhận xét 06.39 | §8.6 | giữ số | — | |
| Mệnh đề 06.40 | Mệnh đề 06.40 | §8.7 | giữ số; $v_j$ → $\xi_j$; vòng biên tập 1: giữ phát biểu, chứng minh Bước 1 dẫn chứng minh Mệnh đề 05.37 (bước $\eta$ thay $\tfrac1L$), chỉ trình bày phần chính quy hóa | — | |
| Nhận xét 06.41 | Nhận xét 06.41 | §8.7 | giữ số | — | |
| Nhận xét 06.42 | **bỏ khối** → §9.6, dẫn Nhận xét 05.40 | §9.6 | Q-D | — | |

Tổng dẫn chiếu ngoài phải đổi: `lec-14/lecture-note.md` **5 token** (Định nghĩa 06.6 → 06.4 ×3, dòng 3, 46, 373; Mệnh đề 06.13 → 06.12 ×2, dòng 46, 373). Kế hoạch §8.1 đếm 4; grep lại thấy thêm dòng 3 (đoạn dẫn của Bài 14).

## 2. Ví dụ, tình huống, bài tập

| Cũ | Mới | Mục mới | Dẫn chiếu ngoài |
|---|---|---|---|
| Ví dụ 06.1 | Ví dụ 06.1 | §4.1 | — |
| Ví dụ 06.2 (đặc trưng tích) | **bỏ** → Mệnh đề 05.38(2) | §4.1 (câu) | — |
| Ví dụ 06.3–06.17 | Ví dụ 06.2–06.16 | §4.2–§7.1 | — (`lec-06/exercises.md:63` dẫn Ví dụ 06.4 cũ; tệp thay ở giai đoạn 2) |
| Ví dụ 06.18 (SVM, RCV1) | **bỏ** → Ví dụ 05.25 | §7.2 (câu) | — |
| Ví dụ 06.19–06.21 | Ví dụ 06.17–06.19 | §7.3–§8.1 | — |
| Ví dụ 06.22 (mức nhiễu nền, ba quan sát) | **bỏ** (vòng biên tập 1, Q-D) → Ví dụ 05b.19; hình `vda-sgd-bound-vs-exact.svg` không còn được ghi chú dùng | §8.2 (hai câu) | — |
| Ví dụ 06.23–06.25 | Ví dụ 06.20–06.22 | §8.3–§8.7 | — |
| Tình huống 06.1–06.3 | giữ | §9.1–§9.3 | — |
| Bài tập 06.1–06.6 | giữ | cuối §4.4, §5.6, §6.6, §7.4, §8.7 (06.5, 06.6) | — |
| Bài tập 06.7–06.11 | giữ; bỏ tiền tố "Mức …:" ở tên | §10.1–§10.3 | — |
| Bài 1–11 của `exercises.md` (không số khối) | bỏ (giai đoạn 2); tệp mới bắt đầu từ Bài tập 06.12 | — | — |

## 3. Nhãn công thức

| Cũ | Mới | Nội dung |
|---|---|---|
| (2.1), (2.2) | (4.1), (4.2) | mạng hai tầng; rủi ro thực nghiệm của mạng |
| (3.1) | (5.1) | sai phân hữu hạn |
| (4.1)–(4.3) | (6.1)–(6.3) | Taylor tại điểm dừng; bổ đề giảm; cận của Định lý 06.19 |
| (5.1), (5.2) | (7.1), (7.2) | gradient lô nhỏ; sai số khi không hoàn lại |
| (6.1)–(6.6) | (8.1)–(8.6) | bất đẳng thức một bước; bốn cận; tỉ lệ giữ |

Không tệp nào ngoài lec-06 dẫn nhãn công thức của Bài 06 (grep).

## 4. Mục

| Cũ | Mới |
|---|---|
| Mục tiêu, Tiên quyết | Mục tiêu, Tiên quyết (+ Câu hỏi ôn nhanh) |
| — | Đoạn dẫn, Câu hỏi mở đầu, §11 |
| Bảng ký hiệu (+ ba bộ dữ liệu) | §2 Ký hiệu và giả thiết (+ (H0)–(H6b)), §3 Ví dụ xuyên suốt (bốn bộ); đoạn giả thiết bị vi phạm với ReLU ở cuối Nhận xét 06.13 (§5.4) |
| Mục 1 (1.1, 1.2) | §1 (1.2 rút thành danh sách hai lý do) |
| Mục 2 (2.1–2.5) | §4 (4.1 = 2.1 + 2.2; 4.2–4.4 = 2.3–2.5) |
| Mục 3–6 | §5–§8 (tiểu mục giữ thứ tự) |
| Mục 7, Tình huống, Ứng dụng, Tóm tắt | §9.1–§9.6 (một lần tổng kết ở §9.6) |
| Bài tập củng cố | §10 |
| Hướng dẫn đọc thêm | §12 Tài liệu đọc |

Dẫn theo tên mục từ tệp khác: không có "Bài 06, Mục k" (grep).

## 5. Đổi ký hiệu và thuật ngữ

| Cũ | Mới | Phạm vi |
|---|---|---|
| "nhóm nhỏ", "nhóm", "gradient nhóm", "(minibatch)" | "lô nhỏ", "lô", "gradient lô nhỏ", "(mini-batch)" | toàn bài (Q06-2) |
| "chính quy hóa $\ell_2$" | "chính quy hóa bậc hai (quadratic regularization)" | toàn bài (Q06-2) |
| $\sigma^2$, $\sigma_1^2$ (chặn phương sai) | $\tau^2$, $\tau_1^2$ | §2, §7–§11 (Q06-2); $\sigma$ chỉ còn là hàm kích hoạt |
| $\sigma_\ell^2(\theta)$ | $V(\theta)=\operatorname{Var}\ell(f(X;\theta),Y)$ | Định lý 06.21, §9.6 |
| $s$ (chu kỳ đánh giá) | $T$ | Thuật toán 06.25, 06.38, bảng ký hiệu; $s$ chỉ còn là bước dịch trong khai triển Taylor |
| $v_j$, $v$ (vector riêng) | $\xi_j$, $\xi$ | Mệnh đề 06.40, chứng minh Mệnh đề 06.16, bảng ký hiệu; $v$ là tham số của mạng tuyến tính một đơn vị và nút sau trong Bổ đề 06.10 |
| $v$, $c$ (bộ tách trong không gian ảnh, chứng minh Mệnh đề 06.3) | $\bar w$, $\bar c$ | chứng minh Mệnh đề 06.3 |
| $w$ "số trọng số" (câu Goodfellow tr. 220–221) | viết bằng lời | §5.5 |
| H0, H2, … | (H0), (H2), … | toàn bài |
| "chương" | "bài" | toàn bài |

Lệch deck (ghi `review-log.md`, không sửa deck): "nhóm nhỏ", "chính quy hóa $\ell_2$", $\sigma^2$/$\sigma_1$, chu kỳ $s$ (ghi chú diễn giả), phép co giãn $(cu,v/c)$ (ghi chú dùng $(\omega u,v/\omega)$), $e_k$ (G01).

## 6. Vòng biên tập 1 (2026-11-12)

- Bản v1 → v2: Mệnh đề 06.5 → Hệ quả 06.5 (giữ số); Ví dụ 06.20 (v1) bỏ, dẫn Ví dụ 05b.19; Ví dụ 06.21–06.23 (v1) → 06.20–06.22. Bộ đếm chung 06.1–06.41 không đổi số. Mệnh đề 06.40 giữ (phương án giữ phát biểu, rút chứng minh).
- Đổi ký hiệu thêm: vector đơn vị $e_j$ → $\hat e_j$; $\phi$ của Bổ đề 06.10 → $\Phi$; $\phi(t)$ của Bài tập 06.8 → $\chi(t)$, khoảng $I$ → $\mathcal I$; $q(z)$ của Nhận xét 06.13 → $\varrho(z)$; vector nhiễu $\varepsilon$ của Ví dụ 06.19 → $\zeta$; bộ đếm $t$ của Thuật toán 06.38 → $j$; "Truyền ngược" (tiêu đề §5.3, Bổ đề 06.10) → "Bước ngược"; số tầng $s$ ở §4.4 viết bằng lời.
- Không tệp ngoài nào dẫn Ví dụ 06.20–06.23 hay Mệnh đề 06.5 (grep `materials/`, deck). Giai đoạn 3 vẫn chỉ đổi 5 token ở `lec-14` (dòng 3, 46, 373: Định nghĩa 06.6 → 06.4; dòng 46, 373: Mệnh đề 06.13 → 06.12); nội dung Định nghĩa 06.4 (mạng hai tầng) và Mệnh đề 06.12 (tính đúng của lan truyền ngược) không đổi sau vòng sửa.
