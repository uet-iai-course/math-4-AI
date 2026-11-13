# Dàn ý ghi chú Bài 00 — Ôn tập nền tảng toán học cho AI

Tệp nội bộ. Dàn ý cuối của `materials/lec-00/lecture-note.md` sau khi viết lại theo mẫu SLT (`planning/notes-10-14-slt-template.md`, Q1–Q15) và chuẩn văn phong 2026-11 (goal `prompt_fix_lecture_notes_00_07.md`, quyết định Q00-1 đến Q00-12), cập nhật sau vòng biên tập 1 (hàng đợi `queue-v1`, 2026-11-12).

## Câu hỏi trung tâm và ví dụ xuyên suốt

- **Câu hỏi trung tâm:** từ bốn căn nhà đã quan sát, tìm trọng số của mô hình giá và dự đoán giá căn nhà mới kèm mức bất định.
- **Câu hỏi mở đầu:** chọn dự đoán $16$ (mô hình $\hat y=w_0+w_1a+w_2b$, SSE $4$) hay $15{,}75$ (mô hình thêm $w_3a^2$, khớp đúng) cho căn $65\,\mathrm m^2$, $2$ phòng ngủ. Câu trả lời hấp dẫn nhưng sai: mô hình bốn trọng số. Câu trả lời tường minh ở cuối 8.3: dùng $16$, dải nhiễu $[14{,}04;\,17{,}96]$ khi $\sigma=1$ ($=\mathrm{SSE}/m$) và trọng số coi bằng $w_{\mathrm{LS}}$.
- **Ví dụ xuyên suốt (Ví dụ 00.1):** bốn căn $(a_i,b_i,y_i)=(40,1,11)$, $(50,2,12)$, $(60,2,14)$, $(70,3,19)$; $a'=(a-55)/10$, $b'=b-2$; $\phi_i=(1,a_i',b_i')^T$; căn mới $\phi_{\mathrm{new}}=(1,1,0)^T$.
- **Ví dụ phụ dùng chung:** $h(u,v)=u^2+uv+2v^2+u-2v$ và $F(u,v)=(u+v,uv,u-v)^T$ tại $(1,2)$ (mục 5); bảng $p_{U,V}$: $0{,}30/0{,}20/0{,}10/0{,}40$ (mục 7).

## Chuỗi số (đã tính lại bằng Python)

| Đại lượng | Giá trị | Khối |
|---|---|---|
| $Xw^{(0)}$, $r^{(0)}$, $f(w^{(0)})$ | $(11{,}5;13{,}5;14{,}5;16{,}5)$; $(0{,}5;1{,}5;0{,}5;-2{,}5)$; $4{,}5$ | Ví dụ 00.2, 00.4 |
| $\operatorname{Ker}X$, $\operatorname{rank}X$, $\operatorname{rank}[X\mid y]$; thế ngược | $\{0\}$; $3$; $4$; $w_2=-1$ và $w_2=3$ | Ví dụ 00.6, 00.8 |
| $X^TX$, giá trị riêng, số điều kiện | $4$, $(7\pm3\sqrt5)/2\approx6{,}854;\,0{,}146$; $\approx47$ | Ví dụ 00.13, 4.8 |
| $X^Ty$, $w_{\mathrm{LS}}$, $r_{\mathrm{LS}}$, SSE, $f$ | $(56,13,8)$; $(14,2,1)$; $(-1,1,1,-1)$; $4$; $2$ | Ví dụ 00.14 |
| $\nabla f(w^{(0)})$, $\lVert g\rVert^2$, $Xg$, $\lVert Xg\rVert^2$ | $(0,-5,-3)$; $34$; $(10{,}5;2{,}5;-2{,}5;-10{,}5)$; $233$ | Ví dụ 00.22, 00.23 |
| (5.1) với $g$ trên | $f=4{,}5-34\eta+116{,}5\eta^2$; $\eta^\star=34/233\approx0{,}146$; ngưỡng $2\eta^\star\approx0{,}292$ | 5.8, Bài tập 00.1 |
| bước $\eta=0{,}1$ / $0{,}05$ | $f=2{,}265$ / $\sum r^2=6{,}1825$, $f=3{,}09125$ | Ví dụ 00.23, Bài tập 00.1 |
| dự đoán, dải nhiễu | $16$; $\sigma=1$: $[14{,}04;17{,}96]$; $\sigma=0{,}5$: $[15{,}02;16{,}98]$ | Tình huống 00.1, Bài tập 00.2 |
| mô hình mở rộng | $\det X_{\mathrm q}=-4$; $w_{\mathrm q}=(12{,}75;2;1;1)$; dự đoán $15{,}75$ | Tình huống 00.2 |
| Bài tập 00.2 | $w_{\mathrm{true}}=(13,2,1)$: $\varepsilon=(2,0,0,2)$, $X^T\varepsilon=(4,0,0)$ | Bài tập 00.2 |
| $h$ | $h(1,2)=8$, $\nabla h=(5,7)$, $D_dh=43/5$, $h(1{,}1;1{,}9)=7{,}82$, trị riêng $3\pm\sqrt2$, điểm dừng $(-6/7,5/7)$, $h^*=-8/7$ | Ví dụ 00.15–00.21 |
| $F$, $\ell$ | $J_F(1,2)$, JVP $(1,2,1)$, $\nabla\ell=(6,6)$ | Ví dụ 00.18 |
| bảng $U,V$ | biên $0{,}5$/$0{,}6$; $0{,}8$; Bayes $2/3$; $\Sigma$, trị riêng $0{,}345$/$0{,}145$, $\rho\approx0{,}408$ | Ví dụ 00.32–00.34, 00.36 |
| Gauss $\rho=0{,}8$ | Mahalanobis bình phương $10/9$ và $10$; tỉ số mật độ $e^{40/9}\approx85$ | Ví dụ 00.37 |
| GLS | $2/3$ và $2$ | Ví dụ 00.38 |
| Đọc thêm | LU: $\det A=-2$; Cholesky $\begin{bmatrix}4&2\\2&2\end{bmatrix}=R^TR$, $R=\begin{bmatrix}2&1\\0&1\end{bmatrix}$ | 4.8 |

## Dàn ý theo mục

| Mục | Khối | Nguồn tham khảo |
|---|---|---|
| Đoạn dẫn, Câu hỏi mở đầu, Mục tiêu (6), Tiên quyết (+ 3 câu ôn nhanh) | — | deck P01, P02, H01, E05 |
| 1. Thiết lập bài toán | danh sách 6 thành phần; ba nguồn phần dư; bảng cố định/ngẫu nhiên | deck H04, C10 |
| 2. Ký hiệu và giả thiết | bảng ký hiệu; (A1), (A2), (P1), (P2) | — |
| 3. Ví dụ xuyên suốt | Ví dụ 00.1; Định nghĩa 00.1; Ví dụ 00.2 | deck H01–H05 |
| 4.1 | Định nghĩa 00.2–00.4; Mệnh đề 00.5; Ví dụ 00.3, 00.4 | Goodfellow §2.1–2.2 |
| 4.2 | Định nghĩa 00.6, 00.7; Mệnh đề 00.8 (ngoài phạm vi); Ví dụ 00.5, 00.6 | Boyd §A.5.1; Murphy §7.1.4.3, §7.5.4 |
| 4.3 | Định lý 00.9; Định nghĩa 00.10, 00.11; Định lý 00.12 (ngoài phạm vi); Ví dụ 00.7–00.9 | Goodfellow §2.3–2.4, §2.11; Murphy §7.1.4.2 |
| 4.4 | Định nghĩa 00.13; Mệnh đề 00.14; Ví dụ 00.10 | — |
| 4.5 | Định nghĩa 00.15; Định lý 00.16 (ngoài phạm vi; kèm $\det=\prod\lambda_i$, $\operatorname{tr}=\sum\lambda_i$); Ví dụ 00.11 | Boyd §A.5.2; Murphy §7.4.3 |
| 4.6 | Định nghĩa 00.17; Mệnh đề 00.18; Hệ quả 00.19; Mệnh đề 00.20; Ví dụ 00.12, 00.13 | Boyd §A.5.2 |
| 4.7 | Định nghĩa 00.21; Định lý 00.22; Ví dụ 00.14; Trong học máy; đoạn kết mục 4 | Murphy §11.7.6 |
| 4.8 Đọc thêm | Định nghĩa 00.23 (LU), 00.24 (QR), 00.25 (Cholesky), 00.26 (SVD), 00.27 (giả nghịch đảo) | Murphy §7.1.4.4, §7.5–7.6, §11.2.2.3; Boyd §C.3.2 |
| 5.1 | Định nghĩa 00.28; Ví dụ 00.15 | — |
| 5.2 | Định nghĩa 00.29, 00.30; Nhận xét 00.31 (ngoài phạm vi, Stewart); Ví dụ 00.16 | Boyd §A.4.1; Stewart §14.1–14.7 |
| 5.3 | Định nghĩa 00.32; Mệnh đề 00.33; Ví dụ 00.17 | Goodfellow §4.3, tr. 85 |
| 5.4 | Định nghĩa 00.34; Định lý 00.35 (kết luận 1 ngoài phạm vi); Ví dụ 00.18; Trong học máy | Boyd §A.4.1–A.4.2; Goodfellow §6.5 |
| 5.5 | Định nghĩa 00.36; Định lý 00.37 (ngoài phạm vi); Mệnh đề 00.38; Hệ quả 00.39; Định lý 00.40 (phác thảo); Ví dụ 00.19 | Boyd §A.4.3, §9.5.3; Goodfellow §4.3.1 |
| 5.6 | Định nghĩa 00.41; Định lý 00.42; Ví dụ 00.20 | — |
| 5.7 | Định lý 00.43; Nhận xét 00.44; Ví dụ 00.21 | Goodfellow §4.3.1, tr. 89–90 |
| 5.8 | Mệnh đề 00.45; Ví dụ 00.22; Định nghĩa 00.46; (5.1) và $\eta^\star$; Ví dụ 00.23; Trong học máy; Bài tập 00.1 | Goodfellow §4.3.1 |
| 5.9 | Định nghĩa 00.47; Định lý 00.48 (ngoài phạm vi, Stewart); Ví dụ 00.24 | Stewart §15.1–15.2 |
| 6.1–6.4 | Định nghĩa 00.49–00.53, 00.55, 00.56; Mệnh đề 00.54 (phác thảo), 00.57; Ví dụ 00.25–00.31 | Koller §2.1.1, §2.1.6; Murphy §2.2, §2.4; Goodfellow §3.8 |
| 6.5 Phân phối Gauss một biến | Định nghĩa 00.58; (6.1) | Murphy §2.6.1–2.6.2 |
| 7.1 | Định nghĩa 00.59, 00.60; Mệnh đề 00.61; Ví dụ 00.32, 00.33; Trong học máy | — |
| 7.2 | Định nghĩa 00.62 ($k$ biến, rời rạc hoặc có mật độ); Ví dụ 00.34 | Murphy §2.2.4; Koller §2.1.6.2 |
| 7.3 Nhiễu Gauss, phần dư, hợp lý | Định nghĩa 00.63, 00.64; Ví dụ 00.35; Mệnh đề 00.65; (7.1); Trong học máy | Murphy §4.2.7, §11.2.2 |
| 7.4 | Mệnh đề 00.66 (tuyến tính của kỳ vọng, ngoài phạm vi; Murphy §2.2.5.1); Định nghĩa 00.67; Mệnh đề 00.68; Ví dụ 00.36; Nhận xét 00.69 | Murphy §3.1.2–3.1.4 |
| 7.5 | Định nghĩa 00.70, 00.71; Mệnh đề 00.72; Ví dụ 00.37 | Murphy §3.2.1; Boyd §A.5.2 |
| 7.6 | Mệnh đề 00.73; Ví dụ 00.38; Trong học máy | deck D10, D10B |
| 8. Ý nghĩa, tác động và giới hạn | Tình huống 00.1; Bài tập 00.2; Định nghĩa 00.74; Tình huống 00.2; Tóm tắt + câu trả lời câu hỏi mở đầu | Murphy §11.2.3.6; Goodfellow §5.2 |
| 9. Bài tập | danh sách Bài tập 00.1, 00.2; liên kết `exercises.md` thêm ở giai đoạn 2 | — |
| 10. Câu hỏi cuối buổi và cầu nối | cực tiểu toàn cục của $h$; cầu nối sang Bài 01 (tập lồi mở, điểm trong) | — |
| 11. Tài liệu đọc | ba tầng | — |

Bộ đếm chung: 00.1–00.74, gồm 43 định nghĩa (5 trong Đọc thêm), 16 mệnh đề, 10 định lý, 2 hệ quả, 3 nhận xét. Chứng minh đầy đủ: 00.5, 00.9, 00.14, 00.18, 00.19, 00.20, 00.22, 00.33, 00.38, 00.39, 00.43 (từ 00.40), 00.45, 00.57, 00.61, 00.65, 00.68, 00.72, 00.73. Phác thảo: 00.40, 00.54. Ngoài phạm vi có nguồn: 00.8, 00.12, 00.16, 00.31, 00.35 (kết luận 1), 00.37, 00.48, 00.66. Ví dụ 00.1–00.38, Tình huống 00.1–00.2, Bài tập 00.1–00.2. Không có `## Phụ lục`. Công thức đánh số: (4.1), (5.1), (6.1), (7.1).

## Lệch so với kế hoạch và deck

- Đọc thêm ở 4.8 (Q00-9); thêm Cholesky (queue-v1, quyết định 5).
- Nhiễu Gauss, phần dư, hàm hợp lý chuyển từ 6.5 sang 7.3, sau định nghĩa độc lập (queue-v1, quyết định 4); 6.5 chỉ còn phân phối Gauss một biến. Deck theo ghi chú từ đợt sửa 2026-11-13: C11, C13, C14, C14L nằm ở mạch 6 sau D06; C12 thành trang "Phân phối Gauss một biến"; C10 mở mạch 5.
- Tên mạch 5, 6 của deck đổi theo tên mục 6, 7 của ghi chú (đợt sửa 2026-11-13).
- Thứ tự deck sau đợt sửa 2026-11-13: A08–A10 trước A05, A05B, A04 (theo 4.1–4.3); A06 sau A12 (theo 4.6); B12 (tích phân) chuyển sang mạch 5 trước C05 (ghi chú đặt 5.9 cuối mục 5, deck đặt ngay trước hàm mật độ, nơi dùng tới); B13 (tích phân kép) gộp vào ghi chú diễn giả B12 ở lượt sửa 1; A11 sang mạch 7 trước E05 (theo 8.2). Còn lệch: B16 (giải phương trình chuẩn) ở mạch giải tích, ghi chú giải ở Ví dụ 00.14 (4.7); deck giữ vì câu hỏi mạch 4 là tìm điểm dừng.
- Deck thêm B11A, B11B, B11C cho 5.6–5.7 (Định lý 00.42, 00.43, Ví dụ 00.20–00.21) và C14L (lời giải Bài tập 00.2 câu 1–2). Deck không có trang cho 4.4 (cơ sở trực chuẩn), 4.5 (trị riêng, chỉ trong ghi chú diễn giả A06, B10), 4.8 (Đọc thêm), 7.5 phần Mahalanobis và làm trắng.
- Ký hiệu deck theo bảng §2 của ghi chú từ đợt sửa 2026-11-13 (không in đậm, $U$/$V$, $\theta$, $D_dh$, $\nabla^2h$, $\chi$, $J_{\mathrm{GLS}}$, $w_{\mathrm q}$).
- Hình `calculus-least-squares-projection-step.svg` đặt ở 5.8.
- Ký hiệu đổi so với deck và plan: ánh xạ ngoài $K$, hàm ngoài $\chi$, độ nhạy $\nu$; không gian con $\mathcal W$; biến điều kiện $T$; $U_{\mathrm s}=100U+20$; mô hình mở rộng $X_{\mathrm q}$, $w_{\mathrm q}$, $\phi_{\mathrm q,i}$; LU viết $PA=NM$, SVD viết $A=Q_1SQ_2^T$; biến tích phân của Hệ quả 00.39 là $t$; hàm o nhỏ $\zeta(\Delta)$; hàm trong của quy tắc dây chuyền một biến $\iota$; ma trận ví dụ $B_1$, $B_2$; cận tích phân kép $[\alpha_1,\beta_1]\times[\alpha_2,\beta_2]$; hằng số $k_1$, $k_2$; mục tiêu GLS $J_{\mathrm{GLS}}$ (theo nhãn hình).
