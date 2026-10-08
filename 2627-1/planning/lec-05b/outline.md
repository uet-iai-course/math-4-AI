# Dàn bài Bài 05b — Hội tụ của hạ gradient và hạ gradient ngẫu nhiên

Quy ước thuật ngữ: chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), phương pháp hạ gradient (GD), phương pháp hạ gradient ngẫu nhiên (SGD), điều kiện Polyak–Łojasiewicz (PL). Mọi chuẩn là chuẩn Euclid.

## Phạm vi và quyết định thiết kế

Bản đầu ngày 2026-10-07; bản sửa cùng ngày theo cổng kiểm định storyboard (SB01–SB15) và tái kiểm (SB16–SB29); bản sửa ngày 2026-10-08 theo năm vai rà soát (R01–R54), xem [review-log.md](review-log.md). Deck `lecture-05b-hoi-tu-ha-gradient-va-sgd.html` đã triển khai cùng ngày đủ 51 trang theo dàn bài này; các sai khác bố cục khi triển khai được ghi tại trang tương ứng (B02, C02, G01, G02) và trong review-log. Bài gồm **51 trang thuộc 7 phần** (đúng 7 `<section>` ngoài): A5, B7, C9, D7, E12, F7, G4. Tệp liên quan: [storyboard.md](storyboard.md), [review-log.md](review-log.md).

- **Vị trí.** Bài bổ trợ đặt sau Bài 05, trước hoặc song song Bài 06; dùng được làm tài liệu cho Buổi 15 (ôn tập). **Bài không có buổi riêng trong đề cương.** Đề cương DOCX gắn LLO6, LLO8 với Buổi 04 và LLO11, LLO12 với Buổi 05; bài này đào sâu phần phân tích hội tụ của các chuẩn đầu ra đó.
- **Thời lượng.** Không gán thời lượng cho bài, phần hay trang, vì đề cương không có buổi tương ứng. Không quy đổi sang phút.
- **Tệp.** Deck `2627-1/lecture-05b-hoi-tu-ha-gradient-va-sgd.html`; `planning/lec-05b/`, `materials/lec-05b/`, `img/lec-05b/`. Nhãn trong `index.html`: "Bài 05b (bổ trợ)". Trên mặt trang chỉ ghi "Bài 05b".
- **Luận đề.** Mọi chứng minh hội tụ trong bài dùng một khuôn: lập bất đẳng thức giữa $x_k$ và $x_{k+1}$, nối các bất đẳng thức đó qua mọi bước, rồi chọn $\eta_k$. Giả thiết quyết định bất đẳng thức đó và cách nối. (Tên gọi "khuôn một bước" và "bất đẳng thức một bước" nêu trước trong ghi chú A02; C02 đặt tên hai cách nối tổng lồng và co; giải đệ quy xuất hiện ở chứng minh SGD cho hàm lồi mạnh.) Câu này trùng nguyên văn với A02 (R82).
- **Mức trình bày.** Chứng minh đầy đủ trên trang: T1, T2a, T2b, T3, T4, T5, T7, T8. Chỉ phát biểu: T2', T5-pha, T6, T9. T1' suy từ chứng minh T1 trong ghi chú. Chứng minh quy nạp của T6 nằm trong học liệu và bài tập (quyết định người dùng số 3).
- **Phần D** được giữ, 7 trang (quyết định người dùng số 4).
- **Đổi tên nhãn so với kế hoạch** để không trùng mã trang: bổ đề B1–B6 gọi là **BĐ1–BĐ6**; khuôn lớn D1–D8 gọi là **KH1–KH8**.
- **Giới thiệu ký hiệu đúng lúc dùng.** A05 chỉ nêu ký hiệu và giả thiết H0–H4 cho phần A–C. $f_{\inf}$ giới thiệu ở B01; dưới gradient và H1 dạng dưới gradient ở D02; H5 trong phát biểu T3 (D04); $\mathcal F_k$ ở E02; $a_k$, $G$, $\sigma^2$, H6, H6a, H6b ở E03–E06; $\Delta_0$ ở F02; H7 ở F06. G01 gom lại toàn bộ.

### Quy ước nhãn

| Được lên mặt trang | Chỉ dùng trong tài liệu lập kế hoạch |
|---|---|
| Tên định lý T1–T9 (kể cả T1', T2a, T2b, T2'), bổ đề BĐ1–BĐ6, giả thiết H0–H7 (kể cả H6a, H6b), "Ví dụ A", "Ví dụ B", "Ví dụ C", "Ví dụ D" | Mã trang (A01…), KT, KH, J, KN, MT, N, mã phát hiện (SB…), nhãn "Tự học", "bổ trợ", thời lượng |

Trong tài liệu lập kế hoạch, VD-A…VD-D là tên ngắn của "Ví dụ A"…"Ví dụ D". Các phần sẽ được chép sang mặt trang hoặc ghi chú diễn giả chỉ dùng nhãn ở cột trái và tham chiếu bài trước bằng tên kết quả hoặc mục học liệu, không bằng mã trang. Các phần đó gồm: trường "Ý chính"; trường "Hình thức hóa"; câu nối đặt trong ngoặc kép ở trường "Kết nối"; trường "Nguồn". Phần còn lại của trường "Kết nối" và trường "Ghi chú soạn" là chỉ dẫn lập kế hoạch, được dùng mã trang.

| Mục tiêu | Hành vi có thể kiểm tra | Chuẩn đầu ra |
|---|---|---|
| MT1 | Phân biệt bốn dạng hội tụ ($d_k$, $e_k$, chuẩn gradient, kỳ vọng) và ba tốc độ; suy quan hệ giữa các dạng từ giả thiết $L$-trơn, $\mu$-lồi mạnh, lồi | LLO6 → CLO1 |
| MT2 | Chứng minh lại các định lý hội tụ của GD và phương pháp dưới gradient theo khuôn một bước; chỉ ra chỗ dùng từng giả thiết | LLO6 → CLO1 |
| MT3 | Chọn bước, tính cận và số bước đạt sai số $\varepsilon$ cho một ví dụ cụ thể; đối chiếu cận với giá trị thật | LLO8 → CLO2 |
| MT4 | Phát biểu và áp dụng định lý hội tụ của SGD cho hàm lồi, lồi mạnh và không lồi; giải thích sàn nhiễu và lịch bước của Bài 05; nhận biết giới hạn của bảo đảm cho mục tiêu không lồi | LLO12 → CLO2; LLO11 → CLO1 (phần không lồi) |

Tiên quyết: Bài 00 (kỳ vọng, phương sai, độc lập với biến rời rạc), Bài 01 (lồi bậc nhất), Bài 04 (GD, tiêu chí dừng, cụm hội tụ RG12–RG18), Bài 05 ($J$, gradient nhóm, $\Sigma/b$, lịch bước, điểm dừng không lồi).

Ngoài phạm vi: momentum, Nesterov, AdaGrad, RMSProp, Adam; chuẩn hóa theo lô; cận dưới về độ phức tạp; giảm phương sai (SVRG, SAGA); hội tụ gần như chắc chắn (chỉ nêu); bài toán có ràng buộc và phép chiếu; Newton (Bài 04); quay lui cho SGD; định lý Robbins–Siegmund.

## Học liệu và nguồn

| Mã | Tài liệu | Vị trí dùng | Vai trò |
|---|---|---|---|
| DC | Đề cương UET.AI2012, DOCX chính thức trong `sources/` | LLO6, LLO8 (Buổi 04), LLO11, LLO12 (Buổi 05), Buổi 15 ôn tập | Chuẩn đầu ra, phạm vi; xác nhận không có buổi riêng |
| BV | Boyd, Vandenberghe, *Convex Optimization*, 2004, `sources/bv_cvxbook.pdf` | §9.1.2, (9.8)–(9.14); §9.3, §9.3.1 tr. 466–468 | BĐ1–BĐ3, T1, T2a, T2b, T2' |
| SNW | Sra, Nowozin, Wright (biên tập), *Optimization for Machine Learning*, MIT Press, 2011 | Ch. 4 (Bertsekas), §4.1.2, Mệnh đề 4.8; ch. 5 (Juditsky, Nemirovski), §5.2 Mệnh đề 5.1, (5.8); §5.4 Mệnh đề 5.4; §5.5 Mệnh đề 5.5; §5.8 ghi chú 4; ch. 13 (Bottou, Bousquet), §13.3 | T3 và D03–D06 (Mệnh đề 5.1); T4 (Mệnh đề 5.5); lịch theo pha (Mệnh đề 5.4, sơ đồ khởi động lại); lưu ý chọn $\mu$ cho T6 (§5.8); hội tụ gần như chắc chắn (Mệnh đề 4.8, chỉ nêu); chi phí GD so với SGD (ch. 13). T1, T1', T2a, T5, T6, T7, T8, T9 suy trực tiếp (R09); T2b, T2' theo BV §9.3.1 |
| B04 | Bài 04: RevealJS, `planning/lec-04/outline.md` RG12–RG18, `materials/lec-04/lecture-note.md` mục B | Định lý $O(1/k)$, tuyến tính, quay lui; VD1 | Kết quả được chứng minh lại; VD-C |
| B05 | Bài 05: A03, A06, B03–B07, E03 | VD1, hàm $r(u)=(u^2-1)^2$, gradient nhóm, $\Sigma/b$, lịch bước | VD-A; VD-D; H6; nhu cầu của phần E |
| B06 | Bài 06: E06 (trung bình Polyak) | Chỉ là liên kết về sau | Bài 06 dùng lại T4 và Jensen; Bài 05b không lấy dữ kiện từ Bài 06 |

Không dẫn Boyd EE364b: tài liệu này không có trong `sources/`; nguồn thay thế cục bộ là SNW ch. 5, Mệnh đề 5.5 (J15). Tệp `MIT-Optimization-for-Machine-Learning.2012.pdf` trùng nội dung SNW 2011; chỉ dẫn bản 2011. Robbins và Monro được nêu tên cho điều kiện bước; không dẫn bài báo gốc vì không có trong `sources/`.

Học liệu Bài 05b (soạn ngày 2026-10-08, sửa theo M01–M20): `materials/lec-05b/lecture-note.md` theo mạch A–G của deck, gồm H0–H7, BĐ1–BĐ6 và bổ đề tách phương sai có chứng minh, T1–T9 có chứng minh trừ T2' (chỉ phát biểu, dẫn BV §9.3.1), chứng minh đầy đủ cho các kết quả deck chỉ phát biểu hoặc để ghi chú (T1', lịch theo pha, T6 quy nạp, T9, Jensen quy nạp), một câu hỏi kiểm tra ngắn cuối mỗi phần A, B, D, E; `materials/lec-05b/exercises.md` gồm 10 bài ở ba mức: nhận biết (Bài 1: B07), tính toán hoặc chứng minh (Bài 2–7, 10: C09, bước $\frac1{14}$ với T1', D07, E12, T6 quy nạp, F07, bước $\frac2{L+\mu}$), vận dụng vào AI (Bài 8–9: logistic có chính quy với $\mu=\lambda$, $L\le\lambda+\frac14\max_i\lVert u_i\rVert^2$; Markov và câu hỏi G04).

## Ký hiệu và quy ước chuyển ký hiệu

| Ký hiệu | Nghĩa | Ở bài trước | Giới thiệu ở |
|---|---|---|---|
| $f:\mathbb R^n\to\mathbb R$ | Hàm mục tiêu; với SGD, $f=J=\frac1N\sum_i\ell_i$ | Bài 04 $f$; Bài 05 $J(\theta)$ | A05 |
| $x_k\in\mathbb R^n$ | Dãy lặp, chỉ số dưới | Bài 04 $x^k$, học liệu Bài 04 có chỗ $x^{(k)}$; Bài 05 $\theta_t$ | A05 |
| $x^*$, $f^*=f(x^*)$ | Điểm cực tiểu, giá trị tối ưu; $f^*=p^*$ | Bài 02–03 $p^*$; Bài 04 $f^*$ | A05 |
| $\eta_k>0$ | Bước | Bài 04 $t$; Bài 05 $\eta_t$ | A05 |
| $g_k\in\mathbb R^n$ | Vectơ cập nhật: $\nabla f(x_k)$, dưới gradient, hoặc gradient nhóm | Bài 04 $g$; Bài 05 $\widehat g_t$ | A05 |
| $e_k=f(x_k)-f^*$, $d_k=\lVert x_k-x^*\rVert$ | Sai số giá trị, khoảng cách | Bài 04 $e_k$ | A05 |
| $D=\lVert x_0-x^*\rVert$ | Khoảng cách đầu | Bài 04 viết $R$; Bài 05 dùng $D$ cho tập dữ liệu | A05 |
| $K$ | Số bước | Bài 05 viết $T$ | A05 |
| $L$, $\mu$, $\kappa=L/\mu$ | Hằng số $L$-trơn, $\mu$-lồi mạnh, số điều kiện | Bài 04 $L,\mu,\kappa$; BV dùng $M,m$ | A05 |
| $f_{\inf}=\inf f>-\infty$ | Cận dưới đúng, có thể không đạt | Chưa có | B01 |
| $\partial f(x)$ | Dưới vi phân | Chưa có | D02 |
| $G$ | Chặn $\lVert g\rVert\le G$ (D) hoặc $\mathbb E[\lVert g_k\rVert^2\mid\mathcal F_k]\le G^2$ (E) | Chưa có | D04; E03 |
| $\bar x_K=\sum_{k<K}\eta_kx_k/\sum_{k<K}\eta_k$ | Trung bình lặp có trọng số | Chưa có (Bài 06 dùng về sau) | D03 |
| $\mathcal F_k$ | Thông tin của $k$ nhóm đầu $I_0,\dots,I_{k-1}$ | Bài 05 "độc lập với lịch sử" | E02 |
| $\sigma^2$ | Chặn phương sai; với gradient nhóm của Bài 05, $\sigma^2=\operatorname{tr}\Sigma/b$ | Bài 05 $\Sigma/b$ | E03 |
| $a_k=\mathbb E d_k^2$ | Kỳ vọng bình phương khoảng cách | Chưa có | E05 |
| $\Delta_0=f(x_0)-f_{\inf}$; $\Delta_k=f(x_k)-f_{\inf}$ | Sai số đầu khi không lồi; sai số theo $f_{\inf}$ (T9) | Chưa có | F02; F06 |

Quy tắc chuyển: khi trích Bài 04 hoặc Bài 05, ghi ký hiệu gốc trong ngoặc một lần, ví dụ "$x_k$ (Bài 04 viết $x^k$)", "$\eta$ (Bài 04 viết $t$)", "$D$ (Bài 04 viết $R$)", "$K$ (Bài 05 viết $T$)". A05 và ghi chú E01 ghi: "Bài 05 dùng $D$ cho tập dữ liệu; ở bài này $D$ là khoảng cách đầu". Phần E viết "tập dữ liệu" bằng chữ, không dùng ký hiệu. Ở E–F, ví dụ một chiều giữ $\theta_k$ cho dãy lặp để khớp VD1 Bài 05; E01 nêu $\theta_k$ là trường hợp $n=1$ của $x_k$. Không dùng $R$ cho khoảng cách đầu vì Bài 05 dùng $R$ cho rủi ro kỳ vọng.

## Giả thiết có tên

Có mười nhãn: H0–H7 cùng hai biến thể H6a, H6b. A05 nêu năm nhãn H0–H4.

| Mã | Phát biểu | Giới thiệu ở |
|---|---|---|
| H0 | $f$ khả vi trên $\mathbb R^n$ và bị chặn dưới | A05 (bằng lời); ký hiệu $f_{\inf}$ ở B01 |
| H1 (lồi) | $f(y)\ge f(x)+\nabla f(x)^T(y-x)$ với mọi $x,y$ | A05; D02 mở rộng: $f$ lồi, hữu hạn trên $\mathbb R^n$, $f(y)\ge f(x)+g^T(y-x)$ với mọi $g\in\partial f(x)$ |
| H2 ($L$-trơn) | $\lVert\nabla f(x)-\nabla f(y)\rVert\le L\lVert x-y\rVert$ với mọi $x,y$ | A05 |
| H3 ($\mu$-lồi mạnh) | $f(y)\ge f(x)+\nabla f(x)^T(y-x)+\frac\mu2\lVert y-x\rVert^2$ với mọi $x,y$, $\mu>0$ | A05 |
| H4 | $f$ đạt cực tiểu tại $x^*$ | A05 |
| H5 | $\lVert g_k\rVert\le G$ với mọi dưới gradient được dùng tại các điểm lặp | D04 (trong phát biểu T3) |
| H6 | $\mathbb E[g_k\mid\mathcal F_k]=\nabla f(x_k)$ (hoặc $\in\partial f(x_k)$) | E03 |
| H6a | $\mathbb E[\lVert g_k\rVert^2\mid\mathcal F_k]\le G^2$ | E03 |
| H6b | $\mathbb E[\lVert g_k-\nabla f(x_k)\rVert^2\mid\mathcal F_k]\le\sigma^2$ | E03 |
| H7 (PL) | $\frac12\lVert\nabla f(x)\rVert^2\ge\mu(f(x)-f_{\inf})$ với mọi $x$ (bản sửa R47 dùng $f_{\inf}$) | F06 |

Dưới H3, $\nabla f$ không bị chặn trên $\mathbb R^n$, nên H5 và H6a chỉ hợp lý trên một vùng chứa dãy lặp. Mọi trang dùng H6a cùng H3 phải nói rõ điều này.

## Khung lý thuyết chung

- **Bài toán trung tâm.** Cho quy tắc $x_{k+1}=x_k-\eta_kg_k$ với $g_k=\nabla f(x_k)$ (GD), một dưới gradient, hoặc gradient nhóm (SGD). Xác định, kèm chứng minh: dãy hội tụ theo nghĩa nào (khoảng cách, giá trị, chuẩn gradient, kỳ vọng), nhanh đến đâu (tuyến tính, $O(1/k)$, $O(1/\sqrt K)$), dưới giả thiết nào và với bước nào.
- **Đối tượng và ký hiệu chung.** Bảng trên; ba đại lượng $d_k,e_k,\lVert\nabla f(x_k)\rVert$ và phiên bản kỳ vọng.
- **Giả thiết.** H0–H7; mỗi định lý dùng một tập con.
- **Chuỗi định nghĩa → kết quả → phương pháp.** Định nghĩa dạng và tốc độ hội tụ (A) → bất đẳng thức cầu nối BĐ1–BĐ4 (B), BĐ5 (D), BĐ6 (E) → bất đẳng thức một bước cho từng tập giả thiết → T1–T9 (C–F) → quy tắc chọn bước và bảng tra (D, E, F, G).
- **Giới hạn áp dụng.** Phương pháp bậc nhất, bước không thích nghi; không ràng buộc; không lồi chỉ cho bảo đảm về điểm dừng; hằng số là cận trên, có thể bi quan nhiều bậc so với giá trị thật (hai trang đối chiếu C07, E08).

### Sợi chỉ chứng minh

Sáu bậc; G02 trình bày lại bảng này trên mặt trang thành tám dòng (T6, T9 tách riêng). Cột giả thiết đổi và cột cách giải đồng bộ với G02 (R77).

| Bậc | Giả thiết đổi | Bất đẳng thức một bước | Cách giải | Kết quả | Giới hạn tạo nhu cầu |
|---|---|---|---|---|---|
| 1. GD lồi trơn (T1, T1') | H1, H2, H4; $\eta\le1/L$ | $e_{k+1}\le\frac1{2\eta}(d_k^2-d_{k+1}^2)$ (R84) | Tổng lồng (kèm tính đơn điệu của $e_k$) | $e_k\le\frac{LD^2}{2k}$ | Không dùng độ cong dưới; phải đúng cả cho $x_1^2$ |
| 2. GD lồi mạnh (T2a, T2b, T2') | Thêm H3 | $d_{k+1}^2\le(1-\frac\mu L)d_k^2$; $e_{k+1}\le(1-\frac\mu L)e_k$ | Co | Tuyến tính | Cần $L$; trị tuyệt đối, hinge không có $L$ |
| 3. Dưới gradient (T3) | Bỏ H2, H3; thêm H5; bước $\eta_k$ | $d_{k+1}^2\le d_k^2-2\eta_ke_k+\eta_k^2G^2$ | Tổng lồng (có trọng số) | $\frac{D^2+G^2\sum\eta_k^2}{2\sum\eta_k}$ | Cần dưới gradient của toàn bộ dữ liệu |
| 4. SGD lồi (T4) | H5 → H6 + H6a | Cùng dòng dưới $\mathbb E[\cdot\mid\mathcal F_k]$ | Tổng lồng | Cùng cận cho $\mathbb Ef(\bar x_K)-f^*$ | Chỉ trung bình lặp; $1/\sqrt K$ chậm; không giải thích mức dừng của điểm cuối |
| 5. SGD lồi mạnh (T5, T5-pha, T6) | Thêm H2, H3; H6b | $a_{k+1}\le(1-\eta\mu)a_k+\eta^2\sigma^2$ | Giải đệ quy (T6 bằng quy nạp $C/k$) | $(1-\eta\mu)^kD^2+\frac{\eta\sigma^2}\mu$; lịch chia đôi hoặc $\frac1{\mu(k+1)}$ | Cần lồi và $x^*$ |
| 6. SGD không lồi (T7, T8, T9) | Bỏ H1, H3, H4; thêm H0 | $\mathbb Ef(x_{k+1})\le\mathbb Ef(x_k)-\frac\eta2\mathbb E\lVert\nabla f(x_k)\rVert^2+\frac{L\eta^2\sigma^2}2$ | Tổng lồng hàm thế $f-f_{\inf}$ (T7, T8); giải đệ quy (T9) | $\frac{2\Delta_0}{\eta K}+L\eta\sigma^2$ | Chỉ điểm dừng; PL khôi phục tuyến tính |

## Ví dụ dẫn

Mọi ví dụ tự chứa; số đã kiểm trong kế hoạch, kiểm lại khi soạn. Trên mặt trang gọi là "Ví dụ A"…"Ví dụ D".

**VD-A** (từ VD1 Bài 05, ba quan sát $-1,1,3$): $J(\theta)=\frac12(\theta-1)^2+\frac43$, $\theta^*=1$, $f^*=\frac43$, $\mu=L=1$; $g=\theta-y_I$, $\sigma^2=\frac8{3b}$ không phụ thuộc $\theta$.
- GD $\eta=1$: một bước tới nghiệm. GD $\eta=0{,}1$: $d_k=0{,}9^kd_0$.
- SGD $\eta=0{,}1$, $b=1$, $\theta_0=0$ ($D=1$): $a_{k+1}=0{,}81a_k+\frac8{300}$ chính xác; $a_1\approx0{,}837$, $a_2\approx0{,}704$; giới hạn $\frac{8\eta}{3(2-\eta)}=\frac8{57}\approx0{,}140$; cận T5 $0{,}9^k+0{,}2667$. Tại $k=20$: thật $\approx0{,}153$, cận $\approx0{,}388$. Với $b=4$: giới hạn thật $\approx0{,}035$, sàn nhiễu $0{,}0667$.
- SGD $\eta_k=\frac1{k+1}$: $\theta_k=\frac1k\sum_{j<k}y_{I_j}$, $a_k=\frac8{3k}$ chính xác. So với giá trị giới hạn $8/57\approx0{,}1404$ của bước hằng $0{,}1$, lịch giảm nhỏ hơn từ $k\ge20$ (bằng nhau tại $k=19$); so với quỹ đạo thật từ $\theta_0=0$, nhỏ hơn từ $k\ge16$. Đề bài tập nói rõ so với giá trị nào.
- Giá trị dừng thật $\frac{\eta\sigma^2}{\mu(2-\eta\mu)}\approx\frac{\eta\sigma^2}{2\mu}$ khác hằng số định lý $\frac{\eta\sigma^2}\mu$; E08 ghi cả hai.
- VD-A thỏa PL với $\mu=1$ (dấu bằng).

**VD-B** ($f(x)=\frac13\sum_{i=1}^3|x-y_i|$, cùng ba quan sát): $x^*=1$ (trung vị), $f^*=\frac43$, $G=1$, $\partial f(1)=[-\frac13,\frac13]$.
- $x_0=0$, $\eta=\frac12$, $K=4$: $x_0,\dots,x_3=0,\frac16,\frac13,\frac12$ (T3 với $K$ bước chặn $\min_{k<K}e_k$ và trung bình của $x_0,\dots,x_{K-1}$). Sai số $e_k=\frac13,\frac5{18},\frac29,\frac16$. Lặp tốt nhất $\frac16$; $\bar x_4=\frac14$, sai số $\frac14$ bằng trung bình các $e_k$ (Jensen xảy ra dấu bằng vì $f$ tuyến tính trên $[-1,1]$); cận $\frac{DG}{\sqrt K}=0{,}5$.
- $x_0=0$, $\eta=4{,}5$, $K=4$ (điều phối viên đã kiểm): $x_k=0;\,1{,}5;\,0;\,1{,}5$; $f$ dao động $\frac53\to1{,}5\to\frac53\to1{,}5$; lặp tốt nhất sai số $\frac16$; $\bar x_4=0{,}75$, sai số $\frac1{12}<\frac16$.
- Phiên bản ngẫu nhiên $b=1$: $g_k=\operatorname{sign}(x_k-y_{I_k})\in\{-1,0,1\}$ thỏa H6a với $G=1$ chính xác.

**VD-C** (VD1 Bài 04): $f(x)=\frac12(3x_1^2+7x_2^2)$, $x_0=(2,4)$, $L=7$, $\mu=3$, $D^2=20$, $f(x_0)=62$. Bước $1/7$: $x_k=(2(4/7)^k,0)$, $f(x_k)=6(16/49)^k$, $\lVert x_k\rVert^2=\frac{64}{49}(\frac{16}{49})^{k-1}$ với $k\ge1$. Cận T1 $70/k$; T2b $62(4/7)^k$; T2a $20(4/7)^k$. Số bước đạt $e_k\le0{,}01$: theo T1 cần $7000$, theo T2b cần $16$, thực tế $6$ (chỉ nêu ở C07). Thỏa PL với $\mu=3$. Hệ số sắc hơn $(\frac{L-\mu}{L+\mu})^k$ chỉ trong ghi chú.

**VD-D** ($F(\theta)=\frac14(\theta^2-1)^2=\frac14r(\theta)$ với $r(u)=(u^2-1)^2$ của Bài 05): $F'=\theta^3-\theta$, $F''=3\theta^2-1$; tập mức $\{F\le\frac94\}=[-2,2]$, trên đó $L=11$; $\theta_0=2$, $\Delta_0=\frac94$; cận T7 $\frac{2L\Delta_0}K=\frac{49{,}5}K$. Điểm dừng $0,\pm1$; $F'(0)=0$ nhưng $F(0)-F_{\inf}=\frac14$ nên không thỏa PL trên $\mathbb R$. Đẳng thức $\frac12F'(\theta)^2=2\theta^2F(\theta)$ cho PL với $\mu=2c^2$ trên $\{\lvert\theta\rvert\ge c\}$ (điều phối viên đã kiểm). Bài 06 dùng lại hàm $r$ cho trung bình Polyak; đó là liên kết về sau.

## Bản đồ bảy phần

| Phần | Chức năng | Đầu vào | Đầu ra | Trang |
|---|---|---|---|---:|
| A. Các dạng hội tụ của một dãy lặp | Đặt vấn đề; phân biệt $d_k$, $e_k$, chuẩn gradient, kỳ vọng; nêu luận đề; chốt ký hiệu và H0–H4 | Định lý của Bài 04; dao động SGD ở Bài 05; VD-A, VD-C | Định nghĩa bốn dạng, ba tốc độ; ký hiệu; H0–H4 | A01–A05 (5) |
| B. Bất đẳng thức cầu nối giữa các dạng hội tụ | Bộ công cụ dùng chung; mũi tên suy ra giữa ba dạng tất định; đồng nhất thức một bước | Định nghĩa A; lồi bậc nhất (Bài 01); $L$-trơn, $\mu$-lồi mạnh (Bài 04) | BĐ1–BĐ4; bản đồ ba dạng có mũi tên | B01–B07 (7) |
| C. Hội tụ của hạ gradient | Chứng minh đầy đủ hai định lý Bài 04 mới phác thảo; thêm dạng dãy lặp; lập khuôn lần đầu | BĐ1–BĐ4; GD và VD1 Bài 04 | Khuôn "một bước → tổng lồng" và "một bước → co"; T1, T1', T2a, T2b, T2' | C01–C09 (9) |
| D. Dưới gradient và trung bình lặp | Bỏ tính trơn; bước biến; lặp tốt nhất và trung bình lặp; Jensen; bước tối ưu; Robbins–Monro | BĐ4; lồi bậc nhất; giới hạn của C | T3, BĐ5 và cách chọn bước; khuôn bước biến dùng ở E | D01–D07 (7) |
| E. Hạ gradient ngẫu nhiên cho hàm lồi và lồi mạnh | Gradient nhóm; $\mathcal F_k$, tính chất tháp; ba định lý SGD; sàn nhiễu và lịch bước của Bài 05; Markov | T3; Bài 05 (gradient nhóm, lịch bước) | Hội tụ theo kỳ vọng và xác suất; sàn nhiễu $\eta\sigma^2/\mu$; cơ sở cho trung bình Polyak ở Bài 06 | E01–E12 (12) |
| F. Mục tiêu không lồi và chuẩn gradient | Bỏ tính lồi; đo bằng chuẩn gradient; PL khôi phục tuyến tính | BĐ1–BĐ3 với $\eta\le1/L$; KT13; điểm dừng không lồi của Bài 05 | T7, T8, T9; bước $\eta\sim1/\sqrt K$ | F01–F07 (7) |
| G. Bảng tra và giới hạn | Tổng hợp; bảng tra theo mục tiêu; ngoài phạm vi; câu hỏi tự kiểm; bài tập; tài liệu | T1–T9 | Bảng tra cho Bài 06 và Buổi 15 | G01–G04 (4) |
| **Tổng** | | | | **51** |

Mỗi định lý ở C và E có trang phát biểu và trang chứng minh riêng. Ở D, T3 cũng tách hai trang. Ở F, T7 ngắn nên phát biểu và chứng minh trên cùng một trang; T8 tách phát biểu (kèm hệ quả chọn bước) và chứng minh.

## Bản đồ dạng hội tụ

| Đại lượng | Nghĩa | Cần gì | Đo được trong thực hành | Trang |
|---|---|---|---|---|
| $d_k$ | Hội tụ dãy lặp | $x^*$ tồn tại; duy nhất nếu nói "về $x^*$" | Không; chỉ trong ví dụ | A04, B06 |
| $e_k$ | Hội tụ giá trị | $f^*$ hữu hạn | Khi biết $f^*$; đối ngẫu cho cận (Bài 03) | A04, B06 |
| $\lVert\nabla f(x_k)\rVert$ | Tới điểm dừng | Khả vi | Có; tiêu chí dừng Bài 04 | A04, B06, F |
| $\min_{j<K}e_j$ | Lặp tốt nhất | Tính $f$ mỗi bước | Không với SGD dữ liệu lớn | D03 |
| $f(\bar x_K)-f^*$ | Trung bình lặp | Lồi (Jensen) | Luôn tính được $\bar x_K$ | D03, D05 |
| $\mathbb E[\cdot]$ | Theo kỳ vọng | $\mathcal F_k$ | Sang xác suất bằng Markov | E02, E11 |

Mũi tên giữa ba dạng tất định (B02–B05, tổng hợp ở B06): H2 và $\nabla f(x^*)=0$ ⇒ $e\le\frac L2d^2$ (BĐ1 tại $x^*$); H0, H2 ⇒ $\lVert\nabla f\rVert^2\le2L(f-f_{\inf})$ (BV (9.14)); H3 ⇒ $\frac\mu2d^2\le e$ (BV (9.8)), $e\le\frac1{2\mu}\lVert\nabla f\rVert^2$ (BV (9.9)), $d\le\frac2\mu\lVert\nabla f\rVert$ (BV (9.11)). Dưới H2 + H3:
$$\frac\mu2d^2\le e\le\frac1{2\mu}\lVert\nabla f\rVert^2\le\frac L\mu e\le\frac{L^2}{2\mu}d^2.$$
Phản ví dụ: logistic ($e\to0$, $x_k\to\infty$); $f=x_1^2$ trên $\mathbb R^2$ (nghiệm không duy nhất); $x^4$ (gradient nhỏ không kéo theo gần $x^*$); VD-D ($\theta=0$ là cực đại địa phương, F06). Jensen (BĐ5, D05): $f(\bar x_K)\le\sum\lambda_kf(x_k)$. Ngẫu nhiên: kỳ vọng ⇒ xác suất (BĐ6, E11); gần như chắc chắn chỉ nêu (SNW ch. 4, Mệnh đề 4.8).

Số bước đạt $\varepsilon$ (ghi chú A04, áp dụng ở C07, D06): tuyến tính $k\ge\kappa\ln(e_0/\varepsilon)$; $O(1/k)$: $k\ge LD^2/(2\varepsilon)$; $O(1/\sqrt K)$: $K\ge D^2G^2/\varepsilon^2$; SGD bước hằng: không xuống dưới sàn nhiễu $\eta\sigma^2/\mu$.

## Khoảng trống hình thức hóa

| # | Kết quả | Ở đâu | Còn thiếu | Lấp ở |
|---|---|---|---|---|
| J1 | $L$-Lipschitz, cận trên bậc hai | Bài 04 RG12 | Chứng minh trên trang | B02 (KT1) |
| J2 | Bổ đề giảm bước $1/L$ | RG13 | Dạng bước tổng quát | B03 (KT2) |
| J3 | Một bước $e^+\le\frac L2(d^2-d^{+2})$ | RG14 | KT4 tách thành bổ đề; $d_k$ không tăng | B05, C04 |
| J4 | $O(1/k)$ | RG15; học liệu Bài 04 mục B | Định nghĩa dưới tuyến tính; cận và tính không tăng của $d_k$; dạng bước $0<\eta\le1/L$ (T1'); chỉ ra bước dùng giả thiết đạt cực tiểu (trường hợp $\inf$ không đạt); chứng minh trên mặt trang (học liệu Bài 04 mục B đã có chứng minh đầy đủ) | A04, B01, C01, C03–C04 |
| J5 | Quay lui | RG16 | Trường hợp $\alpha<\frac12$ | C08 (T2' phát biểu), C09 câu (1) |
| J6 | Tuyến tính theo giá trị | RG17 | Dạng dãy lặp; $\frac\mu2d^2\le e$; định nghĩa tuyến tính; T2' | A04, B04, C05–C06, C08 |
| J7 | Ngưỡng $t>2/L$ | RG18 câu 2; bài tập Bài 05 | Phát biểu chung | B03, C09 câu (3) |
| J8 | $\lVert g\rVert^2/(2\mu)$ | RZ01, RG17 | Đặt vào bản đồ | B04, B06 |
| J9 | Tốc độ Newton | RN07 | Ngoài phạm vi | G03 |
| J10 | Ký hiệu $x^{(k)}$ / $x^k$ lẫn trong học liệu Bài 04 | `materials/lec-04/lecture-note.md` dòng 461–535 | Việc của Bài 04 | Ghi trong review-log, bàn giao |
| J11 | Không chệch, $\Sigma/b$ | Bài 05 B03 | $\mathcal F_k$, tháp, KT13, $\sigma^2$ | E02–E03 |
| J12 | Một bước có thể tăng $J$ | Bài 05 B04 | Điều được bảo đảm theo kỳ vọng | E01, E05, F05 |
| J13 | Thuật toán SGD | Bài 05 B05, HT3 | Định lý hội tụ | E04–E07, F04–F05 |
| J14 | Phương sai cập nhật, lịch bước | Bài 05 B07 | Robbins–Monro; sàn nhiễu; lý do giảm theo pha | D06, E08–E10 |
| J15 | Dẫn Boyd EE364b | Bài 05 E03 | Nguồn cục bộ: SNW ch. 5, Mệnh đề 5.5 | E04 |
| J16 | Momentum, Nesterov | Bài 05 phần C | Ngoài phạm vi | G03 |
| J17 | AdaGrad, RMSProp, Adam | Bài 06 | Ngoài phạm vi | G03 |
| J18 | Trung bình Polyak, Jensen | Bài 06 E06 (về sau) | Jensen (KT9), cận cho trung bình lặp | D03, D05, E04 |
| J19 | Chuẩn hóa theo lô | Bài 06 | Ngoài phạm vi | G03 |

## Sổ định lý

| Mã | Giả thiết | Bước | Kết luận | Mức trình bày | Trang |
|---|---|---|---|---|---|
| T1 | H1, H2, H4 | $\eta=1/L$ | $e_k\le\frac{LD^2}{2k}$ với $k\ge1$; $d_{k+1}\le d_k$ | Đầy đủ trên trang | C03, C04 |
| T1' | Như T1 | $0<\eta\le1/L$ | $e_k\le\frac{D^2}{2\eta k}$ | Phát biểu trên trang; chứng minh trong ghi chú | C03 |
| T2a | H2, H3, H4 | $\eta=1/L$ | $d_k^2\le(1-\mu/L)^kD^2$ | Đầy đủ trên trang | C05, C06 |
| T2b | H2, H3, H4 | $\eta=1/L$ | $e_k\le(1-\mu/L)^ke_0$ | Đầy đủ trên trang (một dòng) | C05, C06 |
| T2' | H2, H3 trên tập mức $\{f\le f(x_0)\}$; Armijo $0<\alpha<\frac12$, $0<\beta<1$ | Quay lui | $e_k\le c^ke_0$, $c=1-\min\{2\mu\alpha,\,2\beta\alpha\mu/L\}$ (BV §9.3.1) | Chỉ phát biểu | C08 |
| T3 | H1 (dạng dưới gradient), H4, H5 | $\eta_k>0$ | $\min_{k<K}e_k$ và $f(\bar x_K)-f^*\le\frac{D^2+G^2\sum_{k<K}\eta_k^2}{2\sum_{k<K}\eta_k}$; bước hằng $\frac D{G\sqrt K}$ cho $\frac{DG}{\sqrt K}$ | Đầy đủ trên trang | D04, D05, D06 |
| T4 | H1 (dạng dưới gradient), H4, H6 + H6a | $\eta_k>0$ cho trước, không phụ thuộc mẫu | $\mathbb Ef(\bar x_K)-f^*\le\frac{D^2+G^2\sum_{k<K}\eta_k^2}{2\sum_{k<K}\eta_k}$ (SNW ch. 5, Mệnh đề 5.5) | Đầy đủ trên trang | E04, E05 |
| T5 | H2, H3, H4, H6 + H6b | $0<\eta\le1/L$ hằng | $a_k\le(1-\eta\mu)^kD^2+\frac{\eta\sigma^2}\mu$ | Đầy đủ trên trang (giải đệ quy trong ghi chú) | E06, E07 |
| T5-pha | Như T5 | $\eta_i=\eta_02^{-i}$ ở pha $i$ | $O\big(\frac1{\mu\eta_0}\log\frac{D^2}\varepsilon+\frac{\sigma^2}{\mu^2\varepsilon}\big)$ bước để $a_k\le\varepsilon$; trang chỉ phát biểu dạng $O(1/k)$ | Chỉ phát biểu | E09 |
| T6 | H3, H4, H6 + H6a (chặn trên vùng chứa dãy lặp) | $\eta_k=\frac1{\mu(k+1)}$ | $a_k\le\frac{G^2}{\mu^2k}$ với $k\ge1$ | Chỉ phát biểu; quy nạp (KT15) trong học liệu và bài tập | E10 |
| T7 | H0, H2 | $\eta=1/L$ | $\min_{k<K}\lVert\nabla f(x_k)\rVert^2\le\frac{2L\Delta_0}K$ | Đầy đủ trên trang | F03 |
| T8 | H0, H2, H6 + H6b | $0<\eta\le1/L$ | $\frac1K\sum_{k<K}\mathbb E\lVert\nabla f(x_k)\rVert^2\le\frac{2\Delta_0}{\eta K}+L\eta\sigma^2$; $\eta=\min\{\frac1L,\sqrt{\frac{2\Delta_0}{L\sigma^2K}}\}$ cho $\frac{2L\Delta_0}K+\frac{2\sqrt{2L\Delta_0\sigma^2}}{\sqrt K}$ | Đầy đủ trên trang | F04, F05 |
| T9 | H0, H2, H7, H6 + H6b | $0<\eta\le1/L$ | $\mathbb E\Delta_k\le(1-\eta\mu)^k\Delta_0+\frac{L\eta\sigma^2}{2\mu}$ | Chỉ phát biểu | F06 |

Bổ đề cầu nối: BĐ1 cận trên bậc hai (B02); BĐ2 $\lVert\nabla f\rVert^2\le2L(f-f_{\inf})$ (B03); BĐ3 $\frac\mu2d^2\le e\le\frac1{2\mu}\lVert\nabla f\rVert^2$, $d\le\frac2\mu\lVert\nabla f\rVert$ (B04); BĐ4 đồng nhất thức khoảng cách (B05); BĐ5 Jensen hữu hạn (D05); BĐ6 Markov (E11).

## Kỹ thuật chứng minh

Khuôn lớn: KH1 hiệu + tổng lồng; KH2 co + lặp; KH3 hàm thế không tăng; KH4 kỳ vọng có điều kiện + tháp; KH5 quy nạp $C/k$; KH6 chọn tham số; KH7 phản ví dụ; KH8 giới hạn từ điều kiện tổng.

| Mã | Kỹ thuật | Bổ đề | Dùng ở | Mức trình bày |
|---|---|---|---|---|
| KT1 | Cận trên bậc hai | $f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac L2\lVert y-x\rVert^2$ (tích phân) | B02, C, F | Đầy đủ trên trang |
| KT2 | Bổ đề giảm bước tổng quát | $f(x-\eta\nabla f)\le f-\eta(1-\frac{L\eta}2)\lVert\nabla f\rVert^2$; $\eta\le1/L$: $\le f-\frac\eta2\lVert\nabla f\rVert^2$ | B03, C, F | Đầy đủ |
| KT3 | Tiếp tuyến dưới | $g^T(x-x^*)\ge f(x)-f^*$ | B05, D02, C, D, E | Đầy đủ |
| KT4 | Đồng nhất thức một bước | $\lVert x-\eta g-x^*\rVert^2=d^2-2\eta g^T(x-x^*)+\eta^2\lVert g\rVert^2$ | B05, C, D, E | Đầy đủ, nhãn BĐ4 |
| KT5 | Tổng lồng + đơn điệu | $\sum(u_j-u_{j+1})\le u_0$; $e_j$ không tăng ⇒ $\sum_{j\le k}e_j\ge ke_k$ | C02, C04, D05, F03 | Đầy đủ |
| KT6 | Co | $\lVert x-\frac1L\nabla f-x^*\rVert^2\le(1-\frac\mu L)d^2$ | C06, E07 | Đầy đủ |
| KT7 | PL thay lồi mạnh | $e^+\le(1-\eta\mu)e$ | C06 (ghi chú), F06 | Đầy đủ (ngắn) |
| KT8 | Hàm thế | $V_{k+1}\le V_k-\text{tiến bộ}+\text{nhiễu}$ | C02, F02, G02 | Nhận xét có nhãn |
| KT9 | Jensen cho trung bình lặp | $f(\bar x_K)\le\sum\eta_kf(x_k)/\sum\eta_k$ | D05, E05 | Đầy đủ; quy nạp trong ghi chú |
| KT10 | Chọn bước tối ưu | $\min_\eta\frac{D^2}{2K\eta}+\frac{G^2\eta}2$ tại $\eta=\frac D{G\sqrt K}$ | D06, E04, F04 | Đầy đủ |
| KT11 | Điều kiện Robbins–Monro | $\sum\eta_k=\infty$, $\sum\eta_k^2<\infty$ ⇒ cận → 0 | D06, D07, E11 | Đầy đủ cho cận; gần như chắc chắn chỉ nêu |
| KT12 | Kỳ vọng có điều kiện, tháp | $\mathbb E[g_k^T(x_k-x^*)\mid\mathcal F_k]=\nabla f(x_k)^T(x_k-x^*)$; $\mathbb E[\mathbb E[Z\mid\mathcal F_k]]=\mathbb EZ$ | E02, E05, E07, F05 | Phát biểu và áp dụng |
| KT13 | Tách độ chệch và phương sai | $\mathbb E[\lVert g_k\rVert^2\mid\mathcal F_k]=\lVert\nabla f(x_k)\rVert^2+\mathbb E[\lVert g_k-\nabla f(x_k)\rVert^2\mid\mathcal F_k]$ | E03, E07, F05 | Đầy đủ |
| KT14 | Giải đệ quy có số hạng cộng | $a_{k+1}\le(1-\eta\mu)a_k+\eta^2\sigma^2$ ⇒ $a_k\le(1-\eta\mu)^ka_0+\frac{\eta\sigma^2}\mu$ | E07 (ghi chú), F06 | Đầy đủ trong ghi chú |
| KT15 | Quy nạp $C/k$ | $a_{k+1}\le(1-\frac2{k+1})a_k+\frac C{(k+1)^2}$ ⇒ $a_k\le C/k$ | E10 (T6) | Ghi chú và bài tập |
| KT16 | Phản ví dụ | Logistic; $x_1^2$; $x^4$; VD-D; sàn nhiễu VD-A | B01, B06, C04, C07, E08, F06 | Trên trang, ngắn |

Hai trang đối chiếu bắt buộc: C07 (T1, T2a, T2b trên VD-C: để $e_k\le0{,}01$, T1 cần $7000$ bước, T2b cần $16$, thực tế $6$) và E08 (T5 trên VD-A: sàn nhiễu $0{,}267$ so với giá trị giới hạn $0{,}140$; hệ số co thật $(1-\eta\mu)^2$ so với $(1-\eta\mu)$ của định lý vì chứng minh bỏ số hạng $-2\eta(1-\eta L)e_k$).

## Danh sách hình SVG

Danh sách đầy đủ kèm alt dự kiến ở [storyboard.md](storyboard.md), mục "Hình cần vẽ" (16 hình). Mọi hình tự dựng từ công thức và số liệu của ví dụ; không sao chép hình nguồn; không dùng ảnh raster.

## Dàn bài từng trang

### A. Các dạng hội tụ của một dãy lặp

Chức năng: đặt vấn đề trung tâm, đặt tên các thước đo và tốc độ, chốt ký hiệu và H0–H4. Nhận định lý $O(1/k)$, tuyến tính của Bài 04 và dao động SGD của Bài 05; chuyển cho B định nghĩa dạng hội tụ chưa có mũi tên suy ra. MT1.

#### A01 — Hội tụ của hạ gradient và hạ gradient ngẫu nhiên

- **Vai trò và mục tiêu:** Trang tiêu đề; định vị bài; MT1–MT4.
- **Luận điểm trung tâm:** Bài chứng minh các bảo đảm hội tụ mà Bài 04 mới phác thảo và Bài 05 để ngỏ.
- **Ý chính:** Tên học phần; "Bài 05b"; tên chủ đề; Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội. Không ghi "bổ trợ", "Tự học" hay thời lượng.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Không áp dụng.
- **Kết nối:** Nhận GD và cụm hội tụ của Bài 04, SGD của Bài 05; dẫn tới A02.
- **Nguồn:** DC.
- **Ghi chú soạn:** Ghi chú diễn giả nêu khoảng trống cụ thể (Bài 04: cận $O(1/k)$ và cận tuyến tính, chứng minh trên trang chỉ có ý chính; Bài 05: SGD chưa có định lý hội tụ), việc bài này làm, tiên quyết (Bài 00, 01, 04, 05) và liên kết về sau với trung bình Polyak ở Bài 06. Không lặp vấn đề trung tâm và luận đề của A02. (Rà từng trang 2026-10-08.)

#### A02 — Vấn đề trung tâm và nội dung bài

- **Vai trò và mục tiêu:** Bản đồ nội dung, vấn đề trung tâm, mục tiêu; MT1–MT4.
- **Luận điểm trung tâm:** Mọi chứng minh hội tụ trong bài dùng một khuôn: lập bất đẳng thức giữa $x_k$ và $x_{k+1}$, nối các bất đẳng thức đó qua mọi bước, rồi chọn $\eta_k$. Giả thiết quyết định bất đẳng thức đó và cách nối. (Tên gọi "khuôn một bước" và "bất đẳng thức một bước" nêu trước trong ghi chú A02; C02 đặt tên hai cách nối tổng lồng và co; giải đệ quy xuất hiện ở chứng minh SGD cho hàm lồi mạnh.) (R56, R72; luận đề đặt toàn chiều rộng dưới hai cột để vừa khung; mục D, F, G của lộ trình đổi tên theo R65.) **Rà từng trang 2026-10-08:** luận đề viết bằng lời thường, không dùng thuật ngữ chưa định nghĩa; khối vấn đề và đoạn $g_k$ ở cột trái, lộ trình ở cột phải (nêu bài toán trước lộ trình, theo cách mở chương 9 của Boyd–Vandenberghe); "gradient nhóm" thay bằng "gradient trên một nhóm mẫu (Bài 05)"; "dưới gradient ... khi $f$ lồi nhưng không khả vi" (tái kiểm A02).
- **Ý chính:** Khối vấn đề: "Với $x_{k+1}=x_k-\eta_kg_k$, xác định kèm chứng minh dãy hội tụ theo nghĩa nào, nhanh đến đâu, dưới giả thiết nào và với bước nào." Danh sách bảy phần (tên đầy đủ; viết "phương pháp hạ gradient (GD)", "phương pháp hạ gradient ngẫu nhiên (SGD)" trước khi dùng viết tắt). Bốn mục tiêu dạng hành vi.
- **Ví dụ/hình dự kiến:** Không có hình; danh sách bảy mục.
- **Hình thức hóa:** Công thức cập nhật chung với ba lựa chọn của $g_k$.
- **Kết nối:** Sau tiêu đề; A03 đưa hai dãy số cụ thể để thấy cần nhiều thước đo.
- **Nguồn:** DC; kế hoạch đã duyệt.
- **Ghi chú soạn:** Ghi chú diễn giả nêu trước tên "khuôn một bước", "bất đẳng thức một bước" và ba cách nối (tổng lồng, co, giải đệ quy); phần C định nghĩa. Câu luận đề viết một lần; G02 kiểm lại luận đề trên sáu bậc của sợi chỉ chứng minh. **Bản sửa 2026-10-08** (R08, R49): luận đề nối "khi giả thiết đổi, chỉ bất đẳng thức một bước đổi"; "dưới gradient (subgradient)".

#### A03 — Thước đo tiến triển của dãy lặp

- **Vai trò và mục tiêu:** Nhu cầu và ví dụ dẫn nhập của KN1; MT1.
- **Luận điểm trung tâm:** Cùng một dãy lặp cho các đại lượng giảm với tốc độ khác nhau; một khẳng định "hội tụ" phải nói đại lượng nào.
- **Ý chính:** Ví dụ C (hàm bậc hai của Bài 04), GD bước $1/7$: $e_k=6(16/49)^k$, $d_k^2=\frac{64}{49}(16/49)^{k-1}$ ($k\ge1$); định lý $O(1/k)$ của Bài 04 cho cận $70/k$. Ví dụ A (ba quan sát của Bài 05), SGD bước $0{,}1$, nhóm một mẫu, $\theta_0=0$: $\theta_k$ ngẫu nhiên; $\mathbb E(\theta_k-1)^2$ giảm từ $0{,}837$ ($k=1$) tới $0{,}153$ ($k=20$) và không xuống dưới $0{,}140$.
- **Ví dụ/hình dự kiến:** Hai hình (rà từng trang 2026-10-08, thay hai bảng số): `vdc-measures.svg` ($e_k$, $d_k^2$, cận $70/k$ trên thang log, $k\le8$) và `vda-sgd-path.svg` (một lần chạy $(\theta_k-1)^2$ và kỳ vọng, giới hạn $0{,}140$). Số $1{,}96$; $1{,}31$; $0{,}0223$; $0{,}0149$; $14$; $0{,}837$; $0{,}153$ chuyển vào ghi chú.
- **Hình thức hóa:** Chưa định nghĩa; chỉ quan sát số. Ghi rõ dãy $\mathbb E(\theta_k-1)^2$ tính chính xác bằng một đệ quy được suy ở phần E.
- **Kết nối:** Nhận định lý Bài 04 (đo $e_k$) và quan sát dao động của Bài 05; A04 đặt tên các thước đo và tốc độ. C01 dẫn lại bảng này.
- **Nguồn:** Bài 04, ví dụ bậc hai và định lý $O(1/k)$; Bài 05, ví dụ ba quan sát và mục bước học, dao động gần nghiệm; tính trực tiếp.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** dòng định nghĩa $e_k$, $d_k$ đặt trước hai ví dụ; dữ kiện mỗi ví dụ tự chứa (hàm, nghiệm, điểm đầu, bước, cỡ nhóm); câu kết rút còn hai dòng, giữ "Một khẳng định hội tụ phải nêu đại lượng được đo và kiểu giảm" làm đầu ra cho A04; quy tắc tên Ví dụ A–D và Ví dụ B, D chuyển vào ghi chú diễn giả. Ghi chú diễn giả nêu: $e_k$ của VD-C giảm theo hệ số $16/49$, còn cận Bài 04 giảm như $1/k$; dãy VD-A có giới hạn dương vì bước hằng. Không đưa cận tuyến tính $62(4/7)^k$ ở đây. **Bản sửa 2026-10-08** (R01, R07, R51): câu kết đổi thành "$e_k$ và $d_k^2$ cùng giảm theo tỉ số $\frac{16}{49}$, cận Bài 04 như $1/k$; ở Ví dụ A kỳ vọng dừng ở $0{,}140$"; thêm dòng ký hiệu $e_k$, $d_k$ (Ví dụ C: $x^*=0$, $f^*=0$) và quy tắc tên Ví dụ A–D; bảng Ví dụ C bỏ dòng $k=2$ để vừa khung.

#### A04 — Dạng hội tụ và tốc độ hội tụ

- **Vai trò và mục tiêu:** Trực quan rồi hình thức KN1; MT1.
- **Luận điểm trung tâm:** Một khẳng định hội tụ gồm đại lượng được đo và một cận theo $k$ cho đại lượng đó.
- **Ý chính:** Trực quan: trên thang log, tuyến tính là đường thẳng, $O(1/k)$ và $O(1/\sqrt k)$ cong dần. Định nghĩa bốn dạng: dãy lặp ($d_k\to0$), giá trị ($e_k\to0$), điểm dừng ($\lVert\nabla f(x_k)\rVert\to0$), theo kỳ vọng ($\mathbb E[\cdot]\to0$). Định nghĩa tốc độ.
- **Ví dụ/hình dự kiến:** `rates-log-error.svg`: ba đường $q^k$, $C/k$, $C/\sqrt k$ trên trục log.
- **Hình thức hóa:** **Định nghĩa.** Dãy không âm $(u_k)$ hội tụ tuyến tính (linear convergence) với hệ số $q\in(0,1)$ nếu tồn tại $C>0$ với $u_k\le Cq^k$ mọi $k$; hội tụ $O(1/k^p)$, $p>0$, nếu $u_k\le C/k^p$ mọi $k\ge1$.
- **Kết nối:** Dùng số A03 làm ví dụ cho từng dạng; A05 cố định ký hiệu và giả thiết cho các cận.
- **Nguồn:** BV §9.3.1 (thuật ngữ hội tụ tuyến tính); SNW ch. 4 §4.1.
- **Ghi chú soạn:** Công thức số bước đạt $u_k\le\varepsilon$ chỉ trong ghi chú: tuyến tính $k\ge\ln(C/\varepsilon)/\ln(1/q)$, với $q=1-1/\kappa$ đủ $k\ge\kappa\ln(C/\varepsilon)$ (dùng $\ln(1-1/\kappa)\le-1/\kappa$); $O(1/k)$: $k\ge C/\varepsilon$; $O(1/\sqrt k)$: $k\ge C^2/\varepsilon^2$. Định nghĩa tuyến tính theo nghĩa cận; dạng tỉ số $u_{k+1}\le qu_k$ chỉ trong ghi chú. Lặp tốt nhất và trung bình lặp định nghĩa ở D03. **Bản sửa 2026-10-08** (R07, R48): nêu $x^*$ là một điểm cực tiểu, $f^*=f(x^*)$; "dưới tuyến tính (sublinear)"; ghi chú R-tuyến tính, Q-tuyến tính. **Rà từng trang 2026-10-08:** thêm chú thích một dòng dưới hình ("Trên thang logarit, $Cq^k$ là đường thẳng; $C/k$ và $C/\sqrt k$ cong và phẳng dần") để trực quan đứng cạnh định nghĩa; định nghĩa dạng hội tụ mở bằng "Cho $f$ có điểm cực tiểu $x^*$, $f^*=f(x^*)$"; bullet kỳ vọng nêu "$x_k$ ngẫu nhiên và $\mathbb E$ của $d_k$, $e_k$, $\lVert\nabla f(x_k)\rVert$ hay bình phương $\to0$"; định nghĩa tốc độ "hội tụ với tốc độ $O(1/k^p)$ (dưới tuyến tính, sublinear), $p>0$, nếu có $C>0$…" (tái kiểm A04); câu "không có cận tuyến tính thì gọi là dưới tuyến tính", $\mathbb E d_k\le\sqrt{\mathbb E d_k^2}$ và $\mathbb E\theta_k\to1$ ở ghi chú. Ghi chú: lý do đường thẳng ($\log(Cq^k)=\log C+k\log q$), số bước 31; 1000; $10^6$, áp dụng định nghĩa cho Ví dụ C (tuyến tính, $q=\frac{16}{49}$) và Ví dụ A (không hội tụ theo kỳ vọng với bước hằng); lặp tốt nhất, trung bình lặp chỉ trong ghi chú.

#### A05 — Ký hiệu và giả thiết

- **Vai trò và mục tiêu:** Quy ước ký hiệu trên mặt trang; năm giả thiết H0–H4 cho phần A–C; MT1–MT2.
- **Luận điểm trung tâm:** Các định lý của phần A–C dùng chung một bộ ký hiệu; mỗi định lý chỉ khác ở tập giả thiết.
- **Ý chính:** Bảng ký hiệu: $x_k,\eta_k,g_k,x^*,f^*,e_k,d_k,D,K,L,\mu,\kappa$, kèm cột ký hiệu gốc (Bài 04: $x^k$, $t$, $R$; Bài 05: $\theta_t$, $\widehat g_t$, $J$, $T$). Dòng chú thích: "Bài 05 dùng $D$ cho tập dữ liệu; ở bài này $D$ là khoảng cách đầu." Bảng H0–H4: H0 bằng lời ($f$ khả vi, bị chặn dưới), H1–H3 dạng công thức với gradient, H4 bằng lời. Một dòng: các giả thiết khác được nêu ở nơi dùng.
- **Ví dụ/hình dự kiến:** Hai bảng; không có hình.
- **Hình thức hóa:** H0–H4 như mục "Giả thiết có tên". $f^*=p^*$ của Bài 02–03.
- **Kết nối:** Nhận định nghĩa A04; B dùng H1–H3 để nối các dạng hội tụ.
- **Nguồn:** BV §9.1.2; Bài 04, mục gradient Lipschitz và hội tụ tuyến tính.
- **Ghi chú soạn:** Sau khi bỏ $f_{\inf}$, $a_k$, $G$, $\sigma^2$, $\Delta_0$, H5–H7, trang còn hai bảng ngắn. Nếu kiểm định trình duyệt vẫn cho thấy tràn ở 16:9, tách thành "Ký hiệu chung" và "Giả thiết có tên" (tổng 52 trang) và cập nhật storyboard; không thu nhỏ chữ. **Bản sửa 2026-10-08** (R49, R50): "$L$-trơn ($L$-smooth)"; "chặn chuẩn của dưới gradient" trong ghi chú. **Rà từng trang 2026-10-08:** bảng ký hiệu sáu dòng, hai cột "Ký hiệu", "Nghĩa" (cách viết ở Bài 04, 05, $p^*$ và chú thích tập dữ liệu $D$ của Bài 05 chuyển vào ghi chú); H3 dạng công thức trong khối hiển thị hai dòng; H4 "đạt giá trị nhỏ nhất"; câu kết "Trong H1–H3, $f$ khả vi… H5–H7 được nêu ở phần D, E, F"; ghi chú đối chiếu giả thiết của Boyd–Vandenberghe §9.1 với H1–H4.

### B. Bất đẳng thức cầu nối giữa các dạng hội tụ

Chức năng: xây bộ bất đẳng thức chuyển giữa ba dạng hội tụ tất định và đồng nhất thức một bước. Nhận định nghĩa A, lồi bậc nhất (Bài 01), $L$-trơn và $\mu$-lồi mạnh (Bài 04); chuyển cho C BĐ1–BĐ4 và bản đồ có mũi tên. MT1–MT2.

#### B01 — Hội tụ giá trị và hội tụ dãy lặp

- **Vai trò và mục tiêu:** Nhu cầu và ví dụ dẫn nhập của KN2; MT1.
- **Luận điểm trung tâm:** Hội tụ giá trị không kéo theo hội tụ dãy lặp khi giá trị tối ưu không đạt hoặc nghiệm không duy nhất; nối hai dạng cần thêm giả thiết.
- **Ý chính:** $\phi(s)=\log(1+e^{-s})$, $s\in\mathbb R$: lồi, $0<\phi''\le\frac14$ nên $L=\frac14$; $f_{\inf}=\inf\phi=0$ không đạt. GD bước $1/L=4$ từ $s_0=0$: $\phi(s_k)\to0$ trong khi $s_k\to\infty$. $f(x)=x_1^2$ trên $\mathbb R^2$ có tập nghiệm là trục $x_2$, nên "$x_k\to x^*$" phụ thuộc chọn $x^*$. Ký hiệu $f_{\inf}=\inf f$ được đặt tại đây.
- **Ví dụ/hình dự kiến:** `logistic-no-minimizer.svg`: đồ thị $\phi$ tiến về 0, các điểm $s_0,s_1,s_2$ dịch sang phải.
- **Hình thức hóa:** $\phi'(s)=-\frac1{1+e^s}<0$, $\phi''(s)=\frac{e^s}{(1+e^s)^2}\le\frac14$.
- **Kết nối:** Nhận dạng $e_k$ và $d_k$ của A04. Câu nối sang B02: "Cận trên bậc hai và bổ đề giảm chặn $e$ và $\lVert\nabla f\rVert$ từ trên bằng $d$ và $e$; lồi mạnh cho chiều ngược lại."
- **Nguồn:** Bài 04, mục gradient Lipschitz (hình mất mát logistic); tính trực tiếp.
- **Ghi chú soạn:** Lập luận $s_k\to\infty$ trong ghi chú: $s_{k+1}=s_k+\frac4{1+e^{s_k}}>s_k$; nếu dãy bị chặn thì hội tụ tới $\bar s$ với $\phi'(\bar s)=0$, vô lý. Đây là mất mát logistic của phân loại tách được. **Bản sửa 2026-10-08** (R30, R17): panel nêu H2 và H3; ghi chú thêm câu nối A→B. **Rà từng trang 2026-10-08:** hình vẽ lại thêm $s_{10}\approx3{,}8$, $s_{100}\approx6{,}0$, $s_{1000}\approx8{,}3$ và nhãn "$s_k\approx\ln(4k)\to\infty$" để thấy điểm lặp chạy ra xa; hai ví dụ có nhãn (mất mát logistic; nghiệm không duy nhất); "Ký hiệu. $f_{\inf}=\inf_xf(x)$ là cận dưới đúng (infimum)"; khung nêu chiều của từng giả thiết (H2: $e_k$ theo $d_k$; H3: chiều ngược lại và nghiệm duy nhất; H4: nghiệm tồn tại). Ghi chú: $s_k\approx\ln(4k)$, GD trên $x_1^2$ tới $(0,b)$, nguồn BV §9.1.2 cho chiều lồi mạnh.

#### B02 — Cận trên bậc hai

- **Vai trò và mục tiêu:** Trực quan và hình thức đầu tiên của KN2 (BĐ1); MT2.
- **Luận điểm trung tâm:** Hàm $L$-trơn nằm dưới một parabol tiếp xúc tại mỗi điểm.
- **Ý chính:** Trực quan "parabol kẹp": tại $x$, đồ thị $f$ nằm dưới parabol độ cong $L$; với $\mu$-lồi mạnh, nằm trên parabol độ cong $\mu$. **Bổ đề BĐ1.** Giả sử H2. Với mọi $x,y\in\mathbb R^n$: $f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac L2\lVert y-x\rVert^2$.
- **Ví dụ/hình dự kiến:** `quadratic-sandwich.svg`: lát cắt một chiều của VD-C theo hướng $(1,1)/\sqrt2$, $h(t)=2{,}5t^2$ (độ cong 5), hai parabol $L=7$ và $\mu=3$ kẹp đồ thị tại $t=1$. Khi soạn deck đổi từ lát cắt theo trục $x_2$ vì theo trục đó $h$ trùng parabol trên và hình không cho thấy khoảng kẹp; ghi chú diễn giả nêu dấu bằng theo trục $x_2$.
- **Hình thức hóa:** Chứng minh: $f(y)-f(x)-\nabla f(x)^T(y-x)=\int_0^1(\nabla f(x+t(y-x))-\nabla f(x))^T(y-x)\,dt\le\int_0^1Lt\lVert y-x\rVert^2dt$ (Cauchy–Schwarz và H2).
- **Kết nối:** Nhận H2 từ A05; B03 cực tiểu vế phải theo $y$.
- **Nguồn:** BV §9.1.2, (9.13); Bài 04, mục gradient Lipschitz.
- **Ghi chú soạn:** Với VD-C, BĐ1 xảy ra dấu bằng theo hướng $x_2$; parabol $\mu$ chỉ nhắc, chứng minh ở B04. **Bản sửa 2026-10-08** (R31, R35): "Bổ đề 1 (BĐ1)"; chứng minh viết đủ vế trái. **Rà từng trang 2026-10-08:** nhãn "Bổ đề BĐ1 (cận trên bậc hai). Giả sử $f$ khả vi và thỏa H2"; chú thích hình tự chứa (hàm $f$, hướng lát cắt, parabol độ cong $L=7$ tiếp xúc tại $t=1$) làm bước trực quan; chứng minh đặt $u=y-x$, ba dòng; ghi chú nêu định lý cơ bản của giải tích, bước Cauchy–Schwarz, khác biệt với BV (9.13) (Hessian so với chỉ H2), và gọi BĐ3 bằng tên thay "trang cận của hàm lồi mạnh".

#### B03 — Bổ đề giảm và cận chuẩn gradient

- **Vai trò và mục tiêu:** Hình thức KN2 (KT2, BĐ2); ví dụ kiểm số; MT2.
- **Luận điểm trung tâm:** Một bước gradient với $0<\eta\le1/L$ giảm $f$ ít nhất $\frac\eta2\lVert\nabla f\rVert^2$; hệ quả là chuẩn gradient bị chặn bởi sai số giá trị.
- **Ý chính:** **Bổ đề giảm (descent lemma).** Giả sử H2, $\eta>0$: $f(x-\eta\nabla f(x))\le f(x)-\eta(1-\frac{L\eta}2)\lVert\nabla f(x)\rVert^2$; với $0<\eta\le1/L$: $\le f(x)-\frac\eta2\lVert\nabla f(x)\rVert^2$. **BĐ2.** Giả sử H0, H2: $\lVert\nabla f(x)\rVert^2\le2L(f(x)-f_{\inf})$. Hệ số giảm dương khi và chỉ khi $0<\eta<2/L$.
- **Ví dụ/hình dự kiến:** VD-C tại $x_0$: $\nabla f(x_0)=(6,28)$, $\lVert\nabla f\rVert^2=820\le2\cdot7\cdot62=868$; bổ đề giảm cho $f(x_1)\le62-\frac{820}{14}=\frac{24}7$, thực tế $f(x_1)=\frac{96}{49}$.
- **Hình thức hóa:** Thế $y=x-\eta\nabla f(x)$ vào BĐ1. BĐ2: $f_{\inf}\le f(x-\frac1L\nabla f(x))\le f(x)-\frac1{2L}\lVert\nabla f(x)\rVert^2$.
- **Kết nối:** Nhận BĐ1; dùng ở C04, C06, E07, F02, F03, F05. B04 thêm H3 để có chiều ngược lại.
- **Nguồn:** BV §9.1.2, (9.14); Bài 04, bổ đề giảm.
- **Ghi chú soạn:** Ngưỡng $2/L$ là điều kiện để bổ đề cho giảm; phân kỳ khi $\eta>2/L$ được kiểm trên hàm bậc hai ở bài tập C09 câu (3). BĐ2 không cần lồi. **Rà từng trang 2026-10-08:** câu mở "Thế $y=x-\eta\nabla f(x)$ vào BĐ1 được bổ đề giảm; lấy $\eta=1/L$ và dùng $f_{\inf}\le f(y)$ được BĐ2"; bổ đề giảm hiển thị hai dòng (dạng $\eta$ tổng quát; dòng $\eta\le1/L$); BĐ2 nhãn "(chặn chuẩn gradient)", nêu H0, H2; khối Ví dụ C tự chứa ($f$, $L=7$, $x_0$); ghi chú: điều kiện $2/L$, BĐ2 là cực tiểu vế phải BĐ1 theo $y$ (BV (9.14)), mũi tên $e\to\lVert\nabla f\rVert$ gọi theo tên sơ đồ, không theo trang. Tiêu đề giữ.

#### B04 — Cận của hàm lồi mạnh

- **Vai trò và mục tiêu:** Hình thức KN2 (BĐ3); MT1–MT2.
- **Luận điểm trung tâm:** Lồi mạnh cho chiều ngược lại: khoảng cách và sai số giá trị bị chặn bởi chuẩn gradient.
- **Ý chính:** **BĐ3.** Giả sử H3, H4. Với mọi $x$: $\frac\mu2d^2\le e\le\frac1{2\mu}\lVert\nabla f(x)\rVert^2$ và $d\le\frac2\mu\lVert\nabla f(x)\rVert$, với $d=\lVert x-x^*\rVert$, $e=f(x)-f^*$. $x^*$ duy nhất.
- **Ví dụ/hình dự kiến:** VD-C tại $x_0$ ($\mu=3$): $30\le62\le\frac{820}6\approx136{,}7$; $d=\sqrt{20}\approx4{,}47\le\frac23\sqrt{820}\approx19{,}1$.
- **Hình thức hóa:** (i) H3 tại $x=x^*$, $\nabla f(x^*)=0$. (ii) Cực tiểu vế phải H3 theo $y$: $f^*\ge f(x)-\frac1{2\mu}\lVert\nabla f(x)\rVert^2$. (iii) H3 với $y=x^*$ và Cauchy–Schwarz: $f^*\ge f(x)-\lVert\nabla f(x)\rVert d+\frac\mu2d^2$, kết hợp $f^*\le f(x)$.
- **Kết nối:** Nhận H3, BĐ1–BĐ2; C06 dùng (i)–(ii); F06 dùng (ii) làm ví dụ dương của PL.
- **Nguồn:** BV §9.1.2, (9.8), (9.9), (9.11).
- **Ghi chú soạn:** **Bản sửa 2026-10-08** (R32): ghi chú bỏ câu lặp, thêm hằng số chặt hơn $d\le\lVert\nabla f\rVert/\mu$. **Rà từng trang 2026-10-08:** câu mở nêu chiều ngược bằng nội dung (BĐ1 tại $x^*$: $e$ theo $d$; BĐ2: $\lVert\nabla f\rVert$ theo $e$; H3 cho chiều ngược); nhãn "BĐ3 (cận của hàm lồi mạnh)", tính duy nhất đưa vào phát biểu, chứng minh trong ghi chú; bỏ câu "lồi chặt" (khái niệm không dùng ở nơi khác của deck); bước 1 kèm dòng tính duy nhất, bước 3 một dòng ($0\ge-\lVert\nabla f\rVert d+\frac\mu2d^2$), dạng đầy đủ trong ghi chú; Ví dụ C tự chứa ($f$, $\mu=3$, $x_0$, $d^2=20$, $e=62$, $\lVert\nabla f(x_0)\rVert^2=820$); không dùng hình; ghi chú nêu BV (9.9), hằng số chặt hơn với số $9{,}55$, PL, câu nối tới sơ đồ các dạng hội tụ.

#### B05 — Đồng nhất thức một bước

- **Vai trò và mục tiêu:** Hình thức KN2 (BĐ4, KT3); MT2.
- **Luận điểm trung tâm:** Bình phương khoảng cách sau một bước được viết chính xác qua tích vô hướng $g^T(x-x^*)$ và $\lVert g\rVert^2$; tính lồi chặn tích vô hướng từ dưới.
- **Ý chính:** **BĐ4.** Với mọi $x,g\in\mathbb R^n$, $\eta>0$: $\lVert x-\eta g-x^*\rVert^2=\lVert x-x^*\rVert^2-2\eta g^T(x-x^*)+\eta^2\lVert g\rVert^2$. **Hệ quả của H1.** Với H1, H4: $\nabla f(x)^T(x-x^*)\ge f(x)-f^*$. Trực quan: tích vô hướng là thành phần của $g$ hướng về $x^*$; bước đủ nhỏ thì số hạng âm thắng số hạng bậc hai.
- **Ví dụ/hình dự kiến:** VD-C tại $x_0$: $\nabla f(x_0)^T(x_0-x^*)=12+112=124\ge62$. `one-step-geometry.svg`: các vectơ $x-x^*$, $\eta g$ và $x-\eta g-x^*$.
- **Hình thức hóa:** Khai triển bình phương chuẩn; hệ quả là H1 với $y=x^*$.
- **Kết nối:** C04 ghép B03 và B05; D02 mở rộng hệ quả cho dưới gradient. B06 đặt BĐ1–BĐ4 vào một sơ đồ.
- **Nguồn:** BV §9.3; SNW ch. 4 §4.1.2; Bài 04, bất đẳng thức một bước.
- **Ghi chú soạn:** BĐ4 là đẳng thức, không cần giả thiết nào về $f$; mọi giả thiết vào ở bước chặn tích vô hướng và $\lVert g\rVert^2$. **Bản sửa 2026-10-08** (R33, R16): câu trực quan; "bước $\frac17$" và $d_1^2=\frac{64}{49}$ trong panel; ghi chú nêu BĐ4 không là mũi tên của bản đồ. **Rà từng trang 2026-10-08:** chú thích hình tự chứa ($f$, $x^*=0$, $\eta=\frac17$, $x=(2,4)$, $g=(6,28)$, $124\ge62$); nhãn "BĐ4 (đồng nhất thức một bước)", "với mọi $x,g$" ($x^*$ bất kỳ); "Nhận xét (ý nghĩa hình học)" chính xác hóa bằng ngưỡng $0<\eta<2g^T(x-x^*)/\lVert g\rVert^2$; khối Ví dụ C chuyển thành chú thích, phép kiểm BĐ4 bằng số vào ghi chú; ghi chú nêu BĐ4 đúng với mọi $g$ (gradient, dưới gradient, gradient trên một nhóm mẫu) và gọi "sơ đồ các dạng hội tụ" theo tên.

#### B06 — Bản đồ các dạng hội tụ

- **Vai trò và mục tiêu:** Ứng dụng của KN1 và KN2; MT1.
- **Luận điểm trung tâm:** Mỗi mũi tên giữa hai dạng hội tụ cần một giả thiết; thiếu giả thiết thì có phản ví dụ.
- **Ý chính:** Sơ đồ ba nút $d$, $e$, $\lVert\nabla f\rVert$. Mũi tên: $e\le\frac L2d^2$ (H2, $\nabla f(x^*)=0$); $\lVert\nabla f\rVert^2\le2Le$ (H2); $\frac\mu2d^2\le e\le\frac1{2\mu}\lVert\nabla f\rVert^2$, $d\le\frac2\mu\lVert\nabla f\rVert$ (H3). Chuỗi dưới H2 + H3: $\frac\mu2d^2\le e\le\frac1{2\mu}\lVert\nabla f\rVert^2\le\frac L\mu e\le\frac{L^2}{2\mu}d^2$. Phản ví dụ: hàm logistic, $x_1^2$, $x^4$.
- **Ví dụ/hình dự kiến:** `convergence-map.svg`. Phản ví dụ $x^4$: tại $x=0{,}1$, $|f'(x)|=0{,}004$ trong khi $d=0{,}1$.
- **Hình thức hóa:** Tổng hợp BĐ1–BĐ4; không có kết quả mới.
- **Kết nối:** Nhận BĐ1–BĐ4; C dùng mũi tên để chuyển cận $e_k$ thành cận $d_k$ và ngược lại. Hai nút trung bình lặp và xác suất được thêm trong ghi chú D05, ghi chú E11 và dòng gom ở G01.
- **Nguồn:** BV (9.8)–(9.14).
- **Ghi chú soạn:** Bảng "đo được trong thực hành" đặt trong ghi chú diễn giả. Phản ví dụ VD-D để dành cho F06. **Bản sửa 2026-10-08** (R34): "ba đại lượng chặn lẫn nhau, sai khác hằng số". **Rà từng trang 2026-10-08:** "Dưới H2, H3, H4"; chuỗi kẹp có nhãn BĐ3, BĐ3, BĐ2, BĐ1 trên từng dấu $\le$; nhãn mũi tên trong hình thêm tên bổ đề (BĐ1, H2), (BĐ2, H2), (BĐ3, H3); ba phản ví dụ tự chứa ($\phi(s)=\log(1+e^{-s})$ với GD bước 4; $f(x)=x_1^2$; $f(x)=x^4$, $x^*=0$); ghi chú nêu khớp nhãn chuỗi–hình, lý do $x^4$ thiếu H3, khả năng đo, hai nút thêm sau.

#### B07 — Bất đẳng thức cầu nối trên hai ví dụ

- **Vai trò và mục tiêu:** Bài tập của KN1 và KN2; MT1–MT2.
- **Luận điểm trung tâm:** Bài tập đo việc chứng minh BĐ2, tính hằng số $\mu$, $L$ và phân loại một khẳng định theo dạng hội tụ.
- **Ý chính:** **Câu hỏi:** (1) Chứng minh BĐ2 từ BĐ1. (2) Tính $\mu$, $L$ cho $J$ của Ví dụ A và $f$ của Ví dụ C; kiểm chuỗi kẹp của bản đồ tại điểm $x=(1,-1)$ của Ví dụ C. (3) Phân loại bốn phát biểu theo dạng hội tụ và nêu giả thiết để suy ra một dạng khác: (a) $f(x_k)-f^*\le70/k$; (b) $\lVert x_k-x^*\rVert^2\le20(4/7)^k$; (c) $\min_{k<K}\lVert\nabla f(x_k)\rVert^2\le C/K$; (d) kỳ vọng $\mathbb E(\theta_k-1)^2\le0{,}9^k+0{,}267$.
- **Ví dụ/hình dự kiến:** Không có hình; đề tự chứa hàm và dữ kiện.
- **Hình thức hóa:** Đáp án trong ghi chú: (2) Ví dụ A $\mu=L=1$; Ví dụ C $\mu=3$, $L=7$; tại $(1,-1)$: $d^2=2$, $e=5$, $\nabla f=(3,-7)$, $\lVert\nabla f\rVert^2=58$; chuỗi $3\le5\le9{,}67\le11{,}67\le16{,}33$. (3) (a) giá trị, dưới tuyến tính; (b) dãy lặp, tuyến tính; (c) điểm dừng, giá trị nhỏ nhất trên $K$ bước đầu; (d) kỳ vọng của dãy lặp, có phần nhiễu không giảm theo $k$.
- **Kết nối:** Kết thúc B; C chứng minh (a), (b).
- **Nguồn:** Tự xây dựng; chuỗi số do điều phối viên kiểm.
- **Ghi chú soạn:** Ba mức: nhận biết (3), tính toán (2), chứng minh (1). Câu (2) dùng điểm khác $x_0$ để không lặp số của B03–B04. Câu (c) viết hằng $C$ vì $\Delta_0$ chưa được đặt. **Bản sửa 2026-10-08** (R13, R17, R10): câu (1) kiểm BĐ2 cho $\phi$ tại $s=0$ và lý do dùng $f_{\inf}$ (đáp án $0{,}25\le0{,}347$); (c) "giá trị nhỏ nhất trên $K$ bước đầu"; (d) "sàn nhiễu"; ghi chú nêu nơi chứng minh (a)–(d). **Rà từng trang 2026-10-08:** đề tự chứa: câu (1) nêu $L=\frac14$; câu (2) ghi công thức $J$ và $f$, chuỗi kẹp in thành dòng $(\ast)$ dưới danh sách; bốn phát biểu (a)–(d) đặt trong khối riêng (ghi "$C>0$ là hằng số", "$\theta_k$ là SGD trên Ví dụ A") để mỗi câu ≤ 2 dòng; đáp án (d) thêm chiều suy ra ($\mathbb E e_k\le\frac L2\mathbb E d_k^2$, Markov). Đáp án (c) dùng "giá trị nhỏ nhất trên $K$ bước đầu", (d) dùng "phần nhiễu không giảm theo $k$".

### C. Hội tụ của hạ gradient

Chức năng: chứng minh đầy đủ T1, T2 với dạng dãy lặp; lập khuôn "một bước → tổng lồng" và "một bước → co". Nhận BĐ1–BĐ4 và VD-C; chuyển cho D khuôn tổng lồng và giới hạn "cần $L$". MT2–MT3.

#### C01 — Bảo đảm cho hạ gradient bước cố định

- **Vai trò và mục tiêu:** Nhu cầu và ví dụ dẫn nhập của KN3; MT2.
- **Luận điểm trung tâm:** Định lý $O(1/k)$ của Bài 04 còn ba khoảng trống; lấp chúng cần một khuôn chứng minh dùng lại được khi $g_k$ đổi.
- **Ý chính:** Ví dụ C trong bảng đầu bài: cận $70/k$ của Bài 04 so với $e_k=6(16/49)^k$. Ba khoảng trống: (1) chưa có cận cho $d_k$ và chưa biết $d_k$ không tăng; (2) chưa có dạng bước $0<\eta\le1/L$, và trên trang Bài 04 chứng minh chỉ ở mức ý chính; (3) chưa chỉ ra giả thiết đạt cực tiểu được dùng ở bước nào, trong khi thiếu nó thì hàm logistic cho $e_k\to0$ mà $x_k\to\infty$.
- **Ví dụ/hình dự kiến:** `vdc-measures.svg` (dùng lại từ A03) với câu dữ kiện tự chứa.
- **Hình thức hóa:** GD: $x_{k+1}=x_k-\frac1L\nabla f(x_k)$; giả thiết đạt cực tiểu là H4.
- **Kết nối:** Nhận BĐ1–BĐ4, bản đồ B06; C02 nêu khuôn.
- **Nguồn:** Bài 04, định lý $O(1/k)$ và hội tụ tuyến tính; học liệu Bài 04 mục B.
- **Ghi chú soạn:** Chứng minh đầy đủ của Bài 04 nằm trong học liệu Bài 04 mục B; C03–C04 đưa chứng minh lên trang, thêm $d_k$ và T1', và đánh dấu bước dùng H4. Không đưa cận $62(4/7)^k$ trước C05. Ký hiệu chuyển: Bài 04 $x^k$, $t$, $R$ → $x_k$, $\eta$, $D$ (ghi một lần). **Bản sửa 2026-10-08** (R22, R17, R52): câu đầu có vị ngữ; mục 2 "trang chiếu Bài 04 chỉ nêu ý chính"; câu cuối "Phần này xét … dưới H1, H2 và H4"; ghi chú câu nối B→C. **Rà từng trang 2026-10-08:** câu mở tham chiếu "bảng đầu bài" thay bằng hình `vdc-measures.svg` (dùng lại từ A03) và một câu tự chứa (hàm, bước, điểm đầu, $e_k=6(16/49)^k$ so với $70/k$); khung ba khoảng trống toàn chiều rộng, mỗi khoảng trống một dòng (mục 3 có công thức $\phi$); ghi chú: câu nối B→C, cách phát biểu BV §9.3.1, số $e_5\approx0{,}022$ so với $14$, ký hiệu chuyển. Tiêu đề giữ.

#### C02 — Khuôn một bước: tổng lồng và co

- **Vai trò và mục tiêu:** Trực quan KN3 (KT5, KT8); MT2.
- **Luận điểm trung tâm:** Một bất đẳng thức một bước được giải theo hai mẫu: chặn sai số bằng hiệu của một đại lượng không âm rồi cộng lại thành tổng lồng, hoặc chặn bằng một hệ số co rồi nhân lại thành lũy thừa.
- **Ý chính:** Mẫu 1: $e_{k+1}\le c(u_k-u_{k+1})$, $u_k\ge0$ ⇒ $\sum_{j<k}e_{j+1}\le cu_0$. Mẫu 2: $u_{k+1}\le qu_k$ ⇒ $u_k\le q^ku_0$. **Nhận xét (hàm thế).** $u_k$ đóng vai hàm thế (potential function): $V_{k+1}\le V_k-P_k+N_k$ với tiến bộ $P_k\ge0$ và nhiễu $N_k\ge0$; các phần sau đổi $V$, $P_k$, $N_k$ (deck dùng ký hiệu $P_k$, $N_k$ để không đặt chữ tiếng Việt trong công thức).
- **Ví dụ/hình dự kiến:** `telescoping-stack.svg`: các đoạn $u_0-u_1,u_1-u_2,\dots$ xếp liền trên một cột cao $u_0$.
- **Hình thức hóa:** Tổng lồng (telescoping sum) $\sum_{j<k}(u_j-u_{j+1})=u_0-u_k\le u_0$.
- **Kết nối:** C03–C04 áp dụng mẫu 1 với $u_k=\frac L2d_k^2$; C05–C06 áp dụng mẫu 2.
- **Nguồn:** SNW ch. 4 §4.1.2; tổng hợp sư phạm.
- **Ghi chú soạn:** Nhận xét có nhãn, không phải định lý. Hình không chứa số liệu thật. **Bản sửa 2026-10-08** (R23): biến chung $p_{k+1}$; "$u_k$ đóng vai một hàm thế $V_k\ge0$". **Rà từng trang 2026-10-08:** tiêu đề "Khuôn một bước: tổng lồng và co" (bao cả hai mẫu); câu mở đặt tên "bất đẳng thức một bước" và "khuôn một bước" trên mặt trang; nhận xét hàm thế còn một câu, dạng $V_{k+1}\le V_k-P_k+N_k$ và cách nối thứ ba (giải đệ quy, phần SGD lồi mạnh) vào ghi chú; chú thích hình tự chứa; `telescoping-stack.svg` bỏ khoảng trắng trên (khung 600×340).

#### C03 — Định lý hội tụ dưới tuyến tính của hạ gradient

- **Vai trò và mục tiêu:** Hình thức KN3 (T1, T1'); MT2.
- **Luận điểm trung tâm:** Với $f$ lồi, $L$-trơn, bước $1/L$ cho $e_k\le\frac{LD^2}{2k}$ và khoảng cách tới nghiệm không tăng.
- **Ý chính:** **Định lý (T1).** Đầu vào: $f$ thỏa H1, H2, H4; $x_0\in\mathbb R^n$. Bước: $x_{k+1}=x_k-\frac1L\nabla f(x_k)$. Kết luận: với mọi $k\ge1$, $e_k\le\frac{LD^2}{2k}$; $d_{k+1}\le d_k$ với mọi $k$. **Hệ quả (T1').** Với $0<\eta\le1/L$: $e_k\le\frac{D^2}{2\eta k}$.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Như trên.
- **Kết nối:** C04 chứng minh.
- **Nguồn:** Bài 04, định lý $O(1/k)$; học liệu Bài 04 mục B (BV §9.3 chỉ có trường hợp lồi mạnh).
- **Ghi chú soạn:** Ghi chú nêu T1' suy ra bằng cách thay $1/L$ bằng $\eta$ trong C04; số bước $k\ge\frac{LD^2}{2\varepsilon}$. **Rà từng trang 2026-10-08:** phát biểu chính là T1' (bước $0<\eta\le1/L$, kết luận $d_{k+1}\le d_k$ và $e_k\le\frac{D^2}{2\eta k}$), T1 là trường hợp $\eta=1/L$; câu dẫn nêu hai điều định lý thêm so với Bài 04 (bước $1/L$ hoặc quay lui): bước hằng bất kỳ $0<\eta\le1/L$ và kết luận $d_{k+1}\le d_k$; số bước đạt $\varepsilon$ chỉ ở ghi chú, không dùng số 7000 của Ví dụ C (để C07 đối chiếu); nguồn bỏ BV §9.3.

#### C04 — Chứng minh định lý dưới tuyến tính

- **Vai trò và mục tiêu:** Hình thức KN3 (chứng minh T1); MT2.
- **Luận điểm trung tâm:** Bổ đề giảm, tính lồi và đồng nhất thức một bước cho $e_{k+1}\le\frac L2(d_k^2-d_{k+1}^2)$; tổng lồng hoàn tất.
- **Ý chính:** Bước 1 (H2, bổ đề giảm): $f(x_{k+1})\le f(x_k)-\frac1{2L}\lVert\nabla f(x_k)\rVert^2$. Bước 2 (H1): $f(x_k)\le f^*+\nabla f(x_k)^T(x_k-x^*)$. Bước 3 (BĐ4, $\eta=1/L$): $\nabla f(x_k)^T(x_k-x^*)-\frac1{2L}\lVert\nabla f(x_k)\rVert^2=\frac L2(d_k^2-d_{k+1}^2)$. Bước 4: $e_{k+1}\ge0$ ⇒ $d_{k+1}\le d_k$; tổng lồng và $e_j$ không tăng: $ke_k\le\sum_{j=1}^ke_j\le\frac L2D^2$.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Bốn bước có nhãn, ghi giả thiết dùng ở từng bước.
- **Kết nối:** Nhận C02 mẫu 1; C05 mở bằng nhu cầu dùng $\mu$ rồi thêm H3.
- **Nguồn:** BV §9.3; học liệu Bài 04 mục B.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** chứng minh viết cho T1' với $0<\eta\le1/L$ và ký hiệu $g_k=\nabla f(x_k)$: (1) bổ đề giảm $-\frac\eta2\lVert g_k\rVert^2$; (2) hệ quả H1, đánh dấu chỗ dùng H4; (3) BĐ4 chia cho $2\eta$; (4) $e_{k+1}\le\frac1{2\eta}(d_k^2-d_{k+1}^2)$, $d_{k+1}\le d_k$; (5) $ke_k\le\frac{D^2}{2\eta}$; ghi chú kiểm đại số hệ số $\frac\eta2$, nguồn hằng số $\frac1{2\eta}$, trường hợp $\eta=1/L$; ghi chú C02 sửa "$u_k=d_k^2$, $c=\frac1{2\eta}$". Trang đổi sang cỡ chữ thường (không dense). Bước $1/L$ làm hai số hạng $\lVert\nabla f\rVert^2$ triệt tiêu ở bước 3. Đơn điệu của $e_j$ đến từ bước 1. H4 dùng ở bước 2 và bước 3 (định nghĩa $x^*$, $f^*$). Trang chỉ chứng minh; nhu cầu dùng $\mu$ đặt ở đầu C05. **Bản sửa 2026-10-08** (R21, R37): dòng "Ý tưởng"; ghi chú về số hạng triệt tiêu và hằng số $1/(L\eta)$.

#### C05 — Định lý hội tụ tuyến tính của hạ gradient

- **Vai trò và mục tiêu:** Nhu cầu dùng $\mu$ và hình thức KN3 (T2a, T2b); MT2.
- **Luận điểm trung tâm:** Cận của T1 không thể chứa $\mu$; thêm $\mu$-lồi mạnh, bước $1/L$ co cả $d_k^2$ và $e_k$ theo hệ số $1-\mu/L$.
- **Ý chính:** Nhu cầu: cận của T1 phải đúng cho $f(x)=x_1^2$ trên $\mathbb R^2$ (lồi, trơn, không lồi mạnh), nên không thể chứa $\mu$; hàm có $\mu>0$ cần một bất đẳng thức một bước khác. **Định lý (T2a, T2b).** Đầu vào: $f$ thỏa H2, H3, H4 ($0<\mu\le L$); $x_0$. Bước $1/L$. Kết luận: $d_k^2\le(1-\frac\mu L)^kD^2$ và $e_k\le(1-\frac\mu L)^ke_0$ mọi $k\ge0$; $\kappa=L/\mu\ge1$.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Như trên.
- **Kết nối:** Nhận T1 và chứng minh C04; C06 chứng minh.
- **Nguồn:** BV §9.3.1; Bài 04, hội tụ tuyến tính.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** câu mở dùng T1' và dữ kiện tự chứa ($x_1^2$ trên $\mathbb R^2$, $L=2$, mọi $(0,c)$ là nghiệm); đầu vào nêu $D$, $e_0$; dòng "Hệ số $q=1-\mu/L=1-1/\kappa\in[0,1)$, nên $d_k^2$ và $e_k$ hội tụ tuyến tính"; ghi chú: ý chứng minh một câu, số bước qua $1-u\le e^{-u}$, BV §9.3.1 (9.18) phát biểu T2b cho tìm bước chính xác với $m$, $M$, T2a suy trực tiếp. $\mu\le L$ vì BĐ1 và H3 cùng đúng. Số bước $k\ge\kappa\ln(e_0/\varepsilon)$ trong ghi chú. Mũi tên B06 chỉ cho $e_k\le\frac L2d_k^2$, yếu hơn T2b.

#### C06 — Chứng minh định lý tuyến tính

- **Vai trò và mục tiêu:** Hình thức KN3 (chứng minh T2a, T2b; KT6, KT7); MT2.
- **Luận điểm trung tâm:** Thay cận dưới tuyến tính của tính lồi bằng cận bậc hai của lồi mạnh biến bất đẳng thức một bước thành phép co.
- **Ý chính:** T2a: BĐ4 với $\eta=1/L$; H3 tại $y=x^*$ cho $\nabla f(x_k)^T(x_k-x^*)\ge e_k+\frac\mu2d_k^2$; BĐ2 cho $\lVert\nabla f\rVert^2\le2Le_k$ ⇒ $d_{k+1}^2\le(1-\frac\mu L)d_k^2$. T2b, một dòng: bổ đề giảm và BĐ3 $\lVert\nabla f\rVert^2\ge2\mu e_k$ ⇒ $e_{k+1}\le(1-\frac\mu L)e_k$.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Hai khối, mỗi khối ghi giả thiết.
- **Kết nối:** Nhận C02 mẫu 2; C07 so ba cận với giá trị thật.
- **Nguồn:** BV §9.3.1, (9.9); SNW ch. 4.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** ký hiệu $g_k$, bước $\eta=\frac1L$ nêu ở dòng Ý tưởng; bước 2 "H3 tại $x_k$ với $y=x^*$ (cần H4)", bước 3 "BĐ2 với $f_{\inf}=f^*$", bước 4 viết rõ phép thế để thấy hai số hạng $\mp\frac2Le_k$ triệt tiêu; ghi chú liệt kê chỗ dùng H2, H3, H4 và $\eta=1/L$, nguồn BV (9.18). Ghi chú: các số hạng $e_k$ triệt tiêu ở T2a ($-\frac2Le_k+\frac1{L^2}2Le_k=0$). Nhận xét PL trong ghi chú: chứng minh T2b chỉ dùng $\frac12\lVert\nabla f\rVert^2\ge\mu e$; F06 dùng lại. **Bản sửa 2026-10-08** (R21): dòng "Ý tưởng".

#### C07 — Ba cận trên ví dụ bậc hai (Ví dụ C)

- **Vai trò và mục tiêu:** Ứng dụng KN3; trang đối chiếu bắt buộc (gộp đối chiếu T1 và so ba cận); MT3.
- **Luận điểm trung tâm:** Trên Ví dụ C, cận $O(1/k)$ bi quan nhiều bậc vì bỏ qua $\mu$; cận tuyến tính đúng dạng nhưng hệ số co $4/7$ vẫn chậm hơn hệ số thật $16/49$.
- **Ý chính:** Bảng $k=1,5,10$: $70/k$ (T1); $62(4/7)^k$ (T2b); $20(4/7)^k$ (T2a); giá trị thật $e_k=6(16/49)^k$ và $d_k^2$. Số bước để $e_k\le0{,}01$: T1 cần $7000$, T2b cần $16$, thực tế $6$.
- **Ví dụ/hình dự kiến:** `vdc-three-bounds.svg`: trục log, ba đường cận, hai dãy thật, đường ngang $0{,}01$.
- **Hình thức hóa:** $70/k\le0{,}01\Leftrightarrow k\ge7000$; $62(4/7)^k\le0{,}01\Leftrightarrow k\ge\ln6200/\ln(7/4)\approx15{,}6$; $6(16/49)^k\le0{,}01\Leftrightarrow k\ge\ln600/\ln(49/16)\approx5{,}7$.
- **Kết nối:** Nhận T1, T2. Câu nối sang C08: "T1 và T2 dùng bước $1/L$, tức phải biết $L$; quay lui Armijo chọn bước mà không cần biết $L$."
- **Nguồn:** Tính trực tiếp; Bài 04, hội tụ tuyến tính.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** dòng dữ kiện tự chứa ($f$, $L$, $\mu$, $x_0$, $D^2$, $e_0$, bước) đầu trang; bảng giá trị tại $k=1,5,10$ (trùng thông tin với hình) thay bằng bảng số bước đạt $0{,}01$: T1 7000, T2b 16, T2a 14, thật 6; câu kết thêm "Một cận bảo đảm cho cả lớp hàm nên có thể bi quan trên một hàm cụ thể"; giá trị tại $k=1,5,10$ và phép tính số bước vào ghi chú. "7000 so với 6" và "16" chỉ xuất hiện ở trang này. Số liệu bảng: $k=1$: $70$; $35{,}4$; $11{,}4$; $1{,}96$; $1{,}31$. $k=5$: $14$; $3{,}78$; $1{,}22$; $0{,}0223$; $0{,}0149$. $k=10$: $7$; $0{,}230$; $0{,}0742$; $8{,}3\cdot10^{-5}$; $5{,}5\cdot10^{-5}$. Hệ số sắc hơn $(\frac{L-\mu}{L+\mu})^k=(0{,}4)^k$ chỉ trong ghi chú. **Bản sửa 2026-10-08** (R27, R29): tiêu đề thêm "(Ví dụ C)"; ghi chú giải thích hệ số $\frac{16}{49}=(1-\mu/L)^2$ bằng BĐ2 không chặt; bỏ nhãn câu nối.

#### C08 — Hội tụ tuyến tính với bước quay lui

- **Vai trò và mục tiêu:** Ứng dụng và giới hạn KN3 (T2'); MT3.
- **Luận điểm trung tâm:** Quay lui Armijo giữ hội tụ tuyến tính mà không cần biết $L$; mọi bảo đảm của phần này vẫn cần $L$ hữu hạn tồn tại.
- **Ý chính:** **Định lý (T2', chỉ phát biểu).** H2, H3 trên tập mức $\{f\le f(x_0)\}$; quay lui Armijo $0<\alpha<\frac12$, $0<\beta<1$: $e_k\le c^ke_0$, $c=1-\min\{2\mu\alpha,2\beta\alpha\mu/L\}$. Giới hạn: T1, T2, T2' đều cần gradient Lipschitz; hàm trị tuyệt đối và mất mát hinge không có.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Như trên.
- **Kết nối:** Nhận T2; giới hạn "không có $L$" mở phần D.
- **Nguồn:** BV §9.3.1, tr. 466–468; Bài 04, hội tụ với quay lui.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** câu mở "T1', T2 dùng bước $\eta\le1/L$, tức phải biết $L$; quay lui chọn bước mà không cần $L$"; T2' theo mẫu Đầu vào–Bước–Kết luận, bước ghi quy tắc Armijo bằng công thức; khối "Giới hạn" có công thức mất mát bản lề $\max\{0,1-ys\}$ và $\lvert s\rvert$; ghi chú: nguồn chứng minh BV §9.3.1, $c>1-\mu/L$, Ví dụ C cho $c=\frac{25}{28}$, nghĩa của $y$, $s$. Trang giữ hai khối (T2' và giới hạn); khối giới hạn là đầu ra sang phần D. Bài 04 dùng $\alpha=\frac12$ cho cận $O(1/k)$; T2' là trường hợp lồi mạnh với $\alpha<\frac12$ (J5). Ngưỡng $2/L$ không đặt ở trang này; bài tập C09 câu (3) đảm nhận.

#### C09 — Quay lui, co và ngưỡng bước

- **Vai trò và mục tiêu:** Bài tập KN3; MT2–MT3.
- **Luận điểm trung tâm:** Bài tập đo việc áp T2', kiểm T2a và nhận biết ngưỡng bước.
- **Ý chính:** **Câu hỏi:** (1) Với Ví dụ C, $\alpha=\frac14$, $\beta=\frac12$: tính hệ số $c$ của T2' và số bước để cận đảm bảo $e_k\le0{,}01$. (2) Kiểm T2a trên Ví dụ C với $k=2,3$. (3) Với Ví dụ C và bước $\eta=0{,}3$, chứng minh $|[x_k]_2|$ tăng và chỉ ra giả thiết về bước của T1 bị vi phạm.
- **Ví dụ/hình dự kiến:** Không có hình; đề ghi lại hàm và điểm đầu.
- **Hình thức hóa:** Đáp án ghi chú: (1) $2\mu\alpha=1{,}5$, $2\beta\alpha\mu/L=\frac3{28}$, $c=\frac{25}{28}\approx0{,}893$; $62c^k\le0{,}01\Leftrightarrow k\ge78$. (2) $d_2^2=\frac{1024}{2401}\approx0{,}427\le20(\frac47)^2\approx6{,}53$; $d_3^2\approx0{,}139\le20(\frac47)^3\approx3{,}73$. (3) Hệ số $1-0{,}3\cdot7=-1{,}1$; $\eta>2/L=2/7$.
- **Kết nối:** Kết thúc C.
- **Nguồn:** Tự xây dựng; BV §9.3.1.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** dòng dữ kiện chung đặt trước nhãn "Câu hỏi:" (thêm $D^2=20$, $e_0=62$ và định nghĩa $[x]_2$); câu (2) nêu "GD bước $\frac17$"; câu (3) "giả thiết về bước của T1'"; đáp án (3) thêm "bổ đề không còn bảo đảm giảm", bỏ "theo quy ước Bài 05"; exercises Bài 2 đồng bộ. Ký hiệu tọa độ $[x]_i$ theo quy ước Bài 05. Câu (1) cho thấy cận quay lui ($78$ bước) yếu hơn cận bước $1/L$ ($16$ bước). **Bản sửa 2026-10-08** (R36): "tọa độ thứ hai"; đáp án (3) nêu $0{,}3>1/L$ và $>2/L$.

### D. Dưới gradient và trung bình lặp

Chức năng: bỏ tính trơn, đưa bước biến, lặp tốt nhất, trung bình lặp và Jensen. Nhận BĐ4 và giới hạn "cần $L$" của C; chuyển cho E T3, BĐ5 và dòng chứng minh tổng lồng có trọng số. MT2–MT3.

#### D01 — Mục tiêu không khả vi

- **Vai trò và mục tiêu:** Nhu cầu và ví dụ dẫn nhập KN4; MT2.
- **Luận điểm trung tâm:** Mục tiêu có trị tuyệt đối không có gradient tại mọi điểm và không có hằng số $L$; T1, T2 không áp dụng.
- **Ý chính:** Ví dụ B: $f(x)=\frac13\sum_{i=1}^3|x-y_i|$ với ba quan sát $-1,1,3$ của Ví dụ A. Bình phương cho trung bình ($\theta^*=1$); trị tuyệt đối cho trung vị ($x^*=1$), $f^*=\frac43$. Không khả vi tại $-1,1,3$; độ dốc nhảy, nên không có $L$. Hồi quy chuẩn $L_1$ và mất mát hinge có cùng cấu trúc.
- **Ví dụ/hình dự kiến:** `vdb-objective.svg`: đồ thị $f$ của VD-B (gãy tại $-1,1,3$) cạnh $J$ của VD-A; cả hai cực tiểu tại 1.
- **Hình thức hóa:** Độ dốc trên các khoảng: $-1,-\frac13,\frac13,1$.
- **Kết nối:** Nhận giới hạn C08; D02 thay gradient bằng dưới gradient.
- **Nguồn:** Tự xây dựng; Bài 05, ví dụ ba quan sát.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** câu mở nêu nhu cầu (mất mát trị tuyệt đối và mất mát bản lề có điểm gãy, không có $L$, bổ đề giảm và T1', T2 không dùng được); Ví dụ B tự chứa (ba quan sát $-1,1,3$, công thức, nghiệm trung vị, $f^*$, điểm gãy, độ dốc); câu kết "Còn dùng được: BĐ4 (đúng với mọi vectơ $g$) và hệ quả của H1, nếu có một vectơ thay vai trò gradient"; "mất mát hinge" đổi thành "mất mát bản lề", câu hồi quy độ lệch tuyệt đối nhỏ nhất vào ghi chú; hình thêm nhãn "điểm gãy"; nguồn SNW ch. 5 §5.2. Cùng dữ liệu với VD-A để thấy chỉ đổi mất mát. **Bản sửa 2026-10-08** (R38): "hồi quy độ lệch tuyệt đối nhỏ nhất (least absolute deviations)".

#### D02 — Dưới gradient

- **Vai trò và mục tiêu:** Trực quan, ví dụ, hình thức KN4 (định nghĩa, mở rộng H1); MT2.
- **Luận điểm trung tâm:** Tại điểm gãy của hàm lồi có cả một chùm đường thẳng tựa dưới đồ thị; độ dốc của chúng thay vai trò gradient.
- **Ý chính:** Trực quan: chùm đường tựa tại $x=1$. Ví dụ: $f(x)\ge\frac43+s(x-1)$ với mọi $x$ khi và chỉ khi $s\in[-\frac13,\frac13]$. **Định nghĩa.** $f:\mathbb R^n\to\mathbb R$ lồi; $g\in\mathbb R^n$ là dưới gradient (subgradient) của $f$ tại $x$ nếu $f(y)\ge f(x)+g^T(y-x)$ mọi $y$; tập các dưới gradient là dưới vi phân (subdifferential) $\partial f(x)$. $0\in\partial f(x^*)$ khi và chỉ khi $x^*$ là điểm cực tiểu. **H1 dạng dưới gradient:** bất đẳng thức trên đúng với mọi $g\in\partial f(x)$; khi đó $g^T(x-x^*)\ge f(x)-f^*$.
- **Ví dụ/hình dự kiến:** `subgradient-supporting-lines.svg`: đồ thị VD-B gần $x=1$ với ba đường tựa độ dốc $-\frac13,0,\frac13$.
- **Hình thức hóa:** Với $f$ khả vi, $\partial f(x)=\{\nabla f(x)\}$ (chỉ nêu).
- **Kết nối:** Nhận nhu cầu D01; D03 dùng một dưới gradient bất kỳ làm $g_k$.
- **Nguồn:** SNW ch. 4 §4.1; Bài 01 (lồi bậc nhất).
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** cột trái: hình rồi đoạn "Trực quan" tự chứa (hàm và dữ liệu của Ví dụ B, chùm đường $\frac43+s(x-1)$, $s\in[-\frac13,\frac13]$) để thứ tự trực quan → định nghĩa giữ cả ở màn hẹp; cột phải: định nghĩa (dưới gradient, dưới vi phân), $\partial f(x)=\{\nabla f(x)\}$ tại điểm khả vi, $\partial f(1)=[-\frac13,\frac13]$, H1 dạng dưới gradient; phép tính $\partial f(1)$ và điều kiện $0\in\partial f(x^*)$ (khi và chỉ khi $x^*$ là điểm cực tiểu) chỉ ở ghi chú, khớp deck; hình: nhãn "độ dốc 1/3", "độ dốc −1/3" đặt cạnh hai đường tựa (nhãn "±1/3" cũ nằm trên đồ thị $f$), đường $0{,}6$ bắt đầu từ $x=0{,}6$, khung 600×330; nguồn SNW ch. 5 §5.2. Thứ tự trên trang: hình → ví dụ số → định nghĩa → H1 dạng dưới gradient. $\partial f(1)=\frac13(1+[-1,1]-1)$ trình bày trong ghi chú. **Bản sửa 2026-10-08** (R24): H1 dạng dưới gradient nêu $\partial f(x)\neq\emptyset$ và cần H4.

#### D03 — Phương pháp dưới gradient

- **Vai trò và mục tiêu:** Ví dụ KN4; nhu cầu của lặp tốt nhất và trung bình lặp; MT3.
- **Luận điểm trung tâm:** Bước theo âm dưới gradient có thể làm tăng $f$ và dao động qua điểm gãy, nên đầu ra là lặp tốt nhất hoặc trung bình lặp.
- **Ý chính:** **Thuật toán.** Đầu vào: $x_0$, bước $\eta_k>0$, số bước $K$, cách lấy $g_k\in\partial f(x_k)$. Lặp $x_{k+1}=x_k-\eta_kg_k$. Đầu ra: lặp tốt nhất (best iterate) $\arg\min_{k<K}f(x_k)$ hoặc trung bình lặp (iterate averaging) $\bar x_K=\sum_{k<K}\eta_kx_k/\sum_{k<K}\eta_k$. Ví dụ B, $x_0=0$, bước $\eta=4{,}5$: $x_k=0;\,1{,}5;\,0;\,1{,}5$, $f$ tăng từ $1{,}5$ lên $\frac53$ ở bước thứ hai; trung bình $\bar x_4=0{,}75$ có sai số $\frac1{12}$, nhỏ hơn sai số của mọi điểm lặp (nhỏ nhất là $\frac16$).
- **Ví dụ/hình dự kiến:** `vdb-subgradient-iterates.svg`: đồ thị VD-B, lượt bước $4{,}5$ dao động giữa $0$ và $1{,}5$, vị trí trung bình lặp $0{,}75$. Hình là trực quan cho Jensen ở D05.
- **Hình thức hóa:** Bước hằng cho trung bình đều.
- **Kết nối:** Nhận định nghĩa D02; D04 phát biểu bảo đảm cho hai đầu ra; D05 dùng Jensen để giải thích trung bình lặp.
- **Nguồn:** SNW ch. 4 §4.1.2; tính trực tiếp (lượt bước $4{,}5$ do điều phối viên kiểm).
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** hộp thuật toán ba dòng (Đầu vào; Bước; Đầu ra: lặp tốt nhất (best iterate) $\arg\min_{k<K}f(x_k)$ hoặc trung bình lặp (iterate averaging) $\bar x_K$); công thức $\bar x_K=\sum\eta_kx_k/\sum\eta_k$ đặt ở cột ví dụ; Ví dụ B tự chứa ($f$, $y$); câu "$-g_k$ không nhất thiết là hướng giảm"; ghi chú: điểm lặp không phải điểm gãy nên $g_k=\pm\frac13$, lý do chọn bước $4{,}5$, "như bước 1 trong chứng minh định lý T3" thay "hai trang sau". $-g$ với $g\in\partial f(x)$ không nhất thiết là hướng giảm; điều được bảo đảm là $d_k$ giảm khi bước đủ nhỏ (D05). Lượt bước $\frac12$ đặt ở D06 để kiểm cận.

#### D04 — Định lý hội tụ của phương pháp dưới gradient

- **Vai trò và mục tiêu:** Hình thức KN4 (T3, H5); MT2.
- **Luận điểm trung tâm:** Với $f$ lồi và dưới gradient bị chặn, lặp tốt nhất và trung bình lặp có cùng một cận theo tổng bước và tổng bình phương bước.
- **Ý chính:** **Định lý (T3).** Đầu vào: $f$ lồi (H1 dạng dưới gradient), đạt cực tiểu tại $x^*$ (H4); các dưới gradient dùng tại điểm lặp thỏa $\lVert g_k\rVert\le G$ (H5); $x_0$; $\eta_k>0$; $K\ge1$. Kết luận: $\min_{k<K}e_k\le\frac{D^2+G^2\sum_{k<K}\eta_k^2}{2\sum_{k<K}\eta_k}$ và $f(\bar x_K)-f^*$ có cùng cận.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Như trên; H5 được đặt tên tại đây.
- **Kết nối:** D05 chứng minh; D06 chọn bước.
- **Nguồn:** SNW ch. 4 §4.1.2.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** câu dẫn "Vì $f(x_k)$ có thể tăng, cận đặt cho lặp tốt nhất và cho trung bình lặp $\bar x_K$ (trọng số theo bước)"; phát biểu theo mẫu Đầu vào–Bước–Kết luận, H5 có tên "chặn chuẩn của dưới gradient"; dòng Ví dụ B tự chứa ($f$, $G=1$); ghi chú: ý chứng minh một câu, vì sao không chặn $x_K$, "hệ quả về chọn bước" thay "trang chọn bước". Cận chặn $\min_{k<K}$ và trung bình của $x_0,\dots,x_{K-1}$, không chặn $x_K$.

#### D05 — Chứng minh định lý dưới gradient

- **Vai trò và mục tiêu:** Hình thức KN4 (chứng minh T3; BĐ5; KT5 có trọng số, KT9); MT2.
- **Luận điểm trung tâm:** Đồng nhất thức một bước với dưới gradient cho $d_{k+1}^2\le d_k^2-2\eta_ke_k+\eta_k^2G^2$; tổng lồng có trọng số và bất đẳng thức Jensen hoàn tất.
- **Ý chính:** **Bổ đề BĐ5 (Jensen).** $f$ lồi, $\lambda_k\ge0$, $\sum_{k<K}\lambda_k=1$: $f(\sum\lambda_kx_k)\le\sum\lambda_kf(x_k)$. Bước 1 (BĐ4, H1, H5): $d_{k+1}^2\le d_k^2-2\eta_ke_k+\eta_k^2G^2$. Bước 2 (tổng lồng): $2\sum_{k<K}\eta_ke_k\le D^2+G^2\sum_{k<K}\eta_k^2$. Bước 3: vế trái $\ge2(\sum\eta_k)\min_{k<K}e_k$; BĐ5 với $\lambda_k=\eta_k/\sum\eta_j$: $\frac{\sum\eta_ke_k}{\sum\eta_k}\ge f(\bar x_K)-f^*$.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Ba bước có nhãn, ghi giả thiết.
- **Kết nối:** So với C04: không có bổ đề giảm, số hạng $\eta_k^2G^2$ không bị triệt tiêu. D06 cân bằng hai số hạng.
- **Nguồn:** SNW ch. 4 §4.1.2; BĐ4.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** dòng Ý tưởng; BĐ5 (Jensen hữu hạn) có nhãn và giả thiết; sáu bước mỗi bước một dòng (BĐ4; hệ quả H1 cần H4 và H5; cộng với $d_K^2\ge0$; lặp tốt nhất; trung bình lặp qua BĐ5; chia cho $2\sum\eta_k$); câu "So với chứng minh T1" thay bằng nội dung (không có bổ đề giảm nên $e_k$ không đơn điệu, $\eta_k^2G^2$ không triệt tiêu, kết luận cho $\min_ke_k$ và $\bar x_K$); ghi chú: hai lần dùng tính lồi, bước quy nạp Jensen, nút trung bình lặp trên sơ đồ, kiểm Jensen trên Ví dụ B (bước $4{,}5$ và $\frac12$). Jensen hữu hạn chứng minh quy nạp theo $K$ trong ghi chú. Kiểm Jensen trong ghi chú trên VD-B, bước $4{,}5$: sai số tại trung bình $\frac1{12}$, trung bình các sai số $\frac14$. Với bước $\frac12$ của VD-B, Jensen xảy ra dấu bằng ($\frac14=\frac14$) vì $f$ tuyến tính trên $[-1,1]$; nêu trong ghi chú. Dòng chứng minh này được dùng lại ở E05. **Bản sửa 2026-10-08** (R08, R39): "khuôn một bước"; ghi chú bước quy nạp Jensen và câu bản đồ.

#### D06 — Chọn bước cho phương pháp dưới gradient

- **Vai trò và mục tiêu:** Ứng dụng KN4 (KT10, KT11); MT3.
- **Luận điểm trung tâm:** Cận của T3 cân bằng hai số hạng ngược chiều theo bước; bước hằng tối ưu cho $DG/\sqrt K$, bước giảm thỏa điều kiện Robbins–Monro cho cận về 0.
- **Ý chính:** Bước hằng $\eta$ trong $K$ bước: cận $\frac{D^2}{2K\eta}+\frac{G^2\eta}2$, nhỏ nhất tại $\eta=\frac D{G\sqrt K}$, giá trị $\frac{DG}{\sqrt K}$. Điều kiện Robbins–Monro $\sum\eta_k=\infty$, $\sum\eta_k^2<\infty$ (ví dụ $\eta_k=\frac c{k+1}$) ⇒ cận → 0. Ví dụ B, $x_0=0$, $D=G=1$, $K=4$, bước tối ưu $\eta=\frac12$: $x_k=0,\frac16,\frac13,\frac12$; cận $0{,}5$; lặp tốt nhất $\frac16$; trung bình lặp $\frac14$.
- **Ví dụ/hình dự kiến:** Không có hình mới; bảng nhỏ bốn điểm lặp và ba sai số của VD-B.
- **Hình thức hóa:** Bất đẳng thức AM–GM hoặc đạo hàm theo $\eta$.
- **Kết nối:** Nhận T3; E thay dưới gradient đầy đủ bằng ước lượng ngẫu nhiên.
- **Nguồn:** SNW ch. 4 §4.1.2; tính trực tiếp.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** câu dẫn nêu hai phần của cận kéo bước theo hai chiều; "Hệ quả 1 (bước hằng theo $K$)" và "Hệ quả 2 (bước giảm dần)" mỗi cái ≤ 2 dòng, Hệ quả 2 phát biểu điều kiện $\eta_k\to0$, $\sum\eta_k=\infty$, Robbins–Monro là đủ; khối Ví dụ B tự chứa, bảng cột lặp tốt nhất, trung bình lặp, cận T3; ghi chú: đạo hàm một biến cho cực tiểu, lý do Hệ quả 2, tên Robbins–Monro. Số bước $K\ge D^2G^2/\varepsilon^2$ trong ghi chú. Bước tối ưu cần biết $D$, $G$, $K$ trước. Hội tụ gần như chắc chắn chỉ nêu ở E11. **Bản sửa 2026-10-08** (R25, R40): bảng có hàng "sai số $e$", cột ghi $x_3=\frac12$ và $\bar x_4=\frac14$; ghi chú về Robbins và Monro (1951).

#### D07 — Phương pháp dưới gradient trên ví dụ trị tuyệt đối

- **Vai trò và mục tiêu:** Bài tập KN4; MT2–MT3.
- **Luận điểm trung tâm:** Bài tập đo việc chạy thuật toán, tính cận và phân tích lịch bước giảm.
- **Ý chính:** **Câu hỏi:** (1) Ví dụ B từ $x_0=2{,}5$, $\eta=2$, $K=4$ (lời giải đi qua điểm gãy): tính $x_0,\dots,x_3$, lặp tốt nhất, $\bar x_4$, so với cận T3. (2) Với $\eta_k=\frac c{\sqrt{k+1}}$: (a) chứng minh $\sum_{k<K}\eta_k\ge c\sqrt K$, $\sum_{k<K}\eta_k^2\le c^2(1+\ln K)$ và suy cận dạng $\ln K/\sqrt K$; (b) chỉ ra $\frac c{k+1}$ thỏa điều kiện Robbins–Monro còn $\frac c{\sqrt{k+1}}$ không, dù cận ở (a) vẫn về 0. (3) Chỉ ra bước nào của chứng minh T3 cần tính lồi khi đầu ra là $\bar x_K$.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Đáp án ghi chú (R41): (1) $x_k=\tfrac52,\tfrac{11}6,\tfrac76,\tfrac12$; sai số $\tfrac12,\tfrac5{18},\tfrac1{18},\tfrac16$; lặp tốt nhất $\tfrac76$ (sai số $\tfrac1{18}$); $\bar x_4=\tfrac32$ (sai số $\tfrac16$); cận T3 với $D=1{,}5$, $G=1$: $\tfrac{73}{64}\approx1{,}14$; bước tối ưu $0{,}75$. (3) Jensen và H1 dạng dưới gradient.
- **Kết nối:** Kết thúc D.
- **Nguồn:** Tự xây dựng.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** dòng dữ kiện chung ($f$, $y$, $x^*=1$, $f^*=\frac43$, $G=1$); bốn câu, mỗi câu một dòng: (1) chạy từ $x_0=2{,}5$; (2) lịch $c/\sqrt{k+1}$ với bất đẳng thức $\sum\frac1{k+1}\le1+\ln K$ cho sẵn; (3) Robbins–Monro; (4) chỗ dùng tính lồi (câu 2(a), 2(b) cũ tách thành câu 2, 3); đáp án ghi chú đánh số theo các bước của chứng minh T3 trên trang (bước 2, bước 5); "trang thuật toán" thay bằng "lượt bước $4{,}5$ từ $x_0=0$ trên cùng ví dụ"; exercises Bài 4 đồng bộ. Trang đổi sang cỡ chữ thường. Dữ kiện đổi ở bản sửa R41 để bước cuối đi qua điểm gãy $x=1$. **Bản sửa 2026-10-08** (R41): dữ kiện mới $x_0=2{,}5$, $\eta=2$.

### E. Hạ gradient ngẫu nhiên cho hàm lồi và lồi mạnh

Chức năng: thay dưới gradient đầy đủ bằng gradient nhóm; đưa $\mathcal F_k$ và tính chất tháp; chứng minh T4, T5; phát biểu T5-pha, T6; Markov. Nhận T3 và gradient nhóm, lịch bước của Bài 05; chuyển cho F KT12, KT13 và giới hạn "cần lồi". MT4.

#### E01 — Gradient ngẫu nhiên trong bảo đảm hội tụ

- **Vai trò và mục tiêu:** Nhu cầu và ví dụ dẫn nhập KN5; MT4.
- **Luận điểm trung tâm:** Với gradient nhóm, điểm lặp là biến ngẫu nhiên; bảo đảm phải là phát biểu về kỳ vọng với thông tin được quy định rõ.
- **Ý chính:** Dưới gradient đầy đủ cần $N$ phép tính mỗi bước trên tập dữ liệu; Bài 05 dùng gradient nhóm $b$ mẫu, và một bước có thể làm tăng $J$. Ví dụ A, bước $0{,}1$, nhóm một mẫu, $\theta_0=0$: $\theta_1\in\{-0{,}1;\,0{,}1;\,0{,}3\}$, mỗi giá trị xác suất $\frac13$; $J(\theta_1)$ là biến ngẫu nhiên. Ở Ví dụ A, $\theta_k$ là trường hợp $n=1$ của $x_k$.
- **Ví dụ/hình dự kiến:** Không có hình mới; ba giá trị của $\theta_1$.
- **Hình thức hóa:** $g_k=\frac1b\sum_r\nabla\ell_{I_{k,r}}(x_k)$; $x_{k+1}=x_k-\eta_kg_k$.
- **Kết nối:** Nhận T3 và giới hạn D (chi phí $N$); E02 xây công cụ kỳ vọng có điều kiện.
- **Nguồn:** Bài 05, mục ước lượng gradient không chệch, một bước gradient ngẫu nhiên, phương pháp SGD; SNW ch. 13 §13.3 (so chi phí GD và SGD).
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** câu mở nêu chi phí $N$ phép tính và định nghĩa $f$, $\ell_i$, $N$, $b$; "$I_{k,r}$ … chọn ngẫu nhiên đều, độc lập, có hoàn lại trong $\{1,\dots,N\}$ (như Bài 05)" thay "lấy đều có hoàn lại"; Ví dụ A tự chứa ($J$, $y$, $\theta_0$, $\eta$, $b$) và dữ kiện một bước làm tăng $J-\frac43$ từ $0{,}5$ lên $0{,}605$; hai bullet cũ bỏ; câu kết giữ (đầu vào E02); ghi chú: cầu nối không chệch sang T4, lý do chi phí (Bottou–Bousquet). Trang đổi sang dense. Ghi chú diễn giả: "Bài 05 dùng $D$ cho tập dữ liệu; ở bài này $D$ là khoảng cách đầu." $\theta_1=0-0{,}1(0-y_I)=0{,}1y_I$. **Bản sửa 2026-10-08** (R42, R08, R09): định nghĩa $\ell_i$, $N$, $I_{k,r}$ trên trang; câu kết "có điều kiện theo các chỉ số nhóm đã chọn"; nguồn ch. 13 ghi đủ.

#### E02 — Lịch sử và kỳ vọng có điều kiện

- **Vai trò và mục tiêu:** Trực quan, ví dụ, hình thức KN5 ($\mathcal F_k$, KT12); MT4.
- **Luận điểm trung tâm:** Lấy kỳ vọng có điều kiện theo lịch sử nghĩa là cố định nút hiện tại của cây và lấy trung bình theo nhóm mới.
- **Ý chính:** Trực quan: cây lịch sử hai bước của Ví dụ A (3 nhánh, 9 lá). Ví dụ: tại nút $\theta_1=0{,}1$, $\mathbb E[g_1\mid\mathcal F_1]=\theta_1-1=-0{,}9=J'(\theta_1)$; $\mathbb E(\theta_1-1)^2\approx0{,}837$ (phép tính $\frac13(1{,}21+0{,}81+0{,}49)$ trong ghi chú, R85). **Định nghĩa.** $\mathcal F_k$ là thông tin của các chỉ số nhóm $I_0,\dots,I_{k-1}$; $x_k$ xác định bởi $\mathcal F_k$; $I_k$ độc lập với $\mathcal F_k$. **Tính chất.** $\mathbb E[\mathbb E[Z\mid\mathcal F_k]]=\mathbb EZ$ (tháp); đại lượng xác định bởi $\mathcal F_k$ ra ngoài kỳ vọng có điều kiện.
- **Ví dụ/hình dự kiến:** `history-tree.svg`.
- **Hình thức hóa:** Với biến rời rạc, $\mathbb E[Z\mid\mathcal F_k]$ là trung bình của $Z$ trên các nhánh con của nút hiện tại. Ký hiệu $\sigma(I_0,\dots,I_{k-1})$ chỉ trong ghi chú.
- **Kết nối:** Nhận nhu cầu E01 và mô hình lấy mẫu độc lập của Bài 05; E03 phát biểu giả thiết về $g_k$ theo $\mathcal F_k$.
- **Nguồn:** Bài 00 (kỳ vọng); Bài 05, ước lượng gradient không chệch; SNW ch. 5 §5.5.
- **Ghi chú soạn:** **Rà từng trang 2026-10-08:** cột trái: cây và chú thích tự chứa (Ví dụ A: $\theta_0=0$, $\theta_{k+1}=\theta_k-0{,}1(\theta_k-y)$, $y$ chọn đều trong $\{-1,1,3\}$; $\mathbb E(\theta_1-1)^2\approx0{,}837$); cột phải: bốn khối một ý mỗi khối (định nghĩa $\mathcal F_k$; kỳ vọng có điều kiện; tính chất tháp một dòng công thức; rút đại lượng đã biết) và dòng kiểm tháp trên cây; câu "trung bình ba nhánh $=J'(\theta_1)$" chỉ trong hình và ghi chú; ghi chú: $\sigma$-đại số, bộ lọc thông tin (filtration), độc lập đòi lấy mẫu có hoàn lại, xáo trộn theo lượt không thỏa điều kiện không chệch. Không tách trang (634–658/675). Không dùng lý thuyết độ đo trên mặt trang; mọi ví dụ là rời rạc hữu hạn. **Bản sửa 2026-10-08** (R15): tên tiếng Anh; phép kiểm $\mathbb E[(\theta_2-1)^2\mid\theta_1]=1{,}007;\ 0{,}683;\ 0{,}424$, trung bình $0{,}704$; ghi chú bộ lọc thông tin và lấy mẫu có hoàn lại.

#### E03 — Giả thiết về gradient ngẫu nhiên

- **Vai trò và mục tiêu:** Hình thức KN5 (H6, H6a, H6b, KT13); MT4.
- **Luận điểm trung tâm:** Hai cách chặn độ lớn của gradient ngẫu nhiên, mômen bậc hai $G^2$ hoặc phương sai $\sigma^2$, khác nhau đúng bằng $\lVert\nabla f\rVert^2$.
- **Ý chính:** H6: $\mathbb E[g_k\mid\mathcal F_k]=\nabla f(x_k)$ (hoặc $\in\partial f(x_k)$). H6a: $\mathbb E[\lVert g_k\rVert^2\mid\mathcal F_k]\le G^2$. H6b: $\mathbb E[\lVert g_k-\nabla f(x_k)\rVert^2\mid\mathcal F_k]\le\sigma^2$. **Bổ đề.** Dưới H6: $\mathbb E[\lVert g_k\rVert^2\mid\mathcal F_k]=\lVert\nabla f(x_k)\rVert^2+\mathbb E[\lVert g_k-\nabla f(x_k)\rVert^2\mid\mathcal F_k]$. Ví dụ: gradient nhóm của Bài 05 thỏa H6, với $\sigma^2=\operatorname{tr}\Sigma/b$ khi $\Sigma$ bị chặn; Ví dụ A có $\sigma^2=\frac8{3b}$ chính xác. Dưới lồi mạnh, H6a chỉ hợp lý trên vùng chứa dãy lặp.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Chứng minh bổ đề: khai triển $\lVert(g_k-\nabla f)+\nabla f\rVert^2$, số hạng chéo có kỳ vọng có điều kiện 0 theo H6.
- **Kết nối:** Nhận $\mathcal F_k$ của E02; E04 dùng H6a, E06 dùng H6b.
- **Nguồn:** Bài 05, ước lượng gradient không chệch; SNW ch. 5 §5.5.
- **Ghi chú soạn:** Ví dụ ngẫu nhiên của VD-B không đặt ở đây (là bài tập E12 câu (3)). Lý do H6a hạn chế: VD-A có $\mathbb E[g^2\mid\theta]=(\theta-1)^2+\frac8{3b}$, không bị chặn trên $\mathbb R$. **Bản sửa 2026-10-08** (R43): điều kiện $\operatorname{tr}\Sigma(x)\le b\sigma^2$; ghi chú bình phương tối thiểu tổng quát.

#### E04 — Định lý hội tụ của SGD cho hàm lồi

- **Vai trò và mục tiêu:** Hình thức KN5 (T4); MT4.
- **Luận điểm trung tâm:** Thay chặn tất định $G$ bằng chặn mômen theo kỳ vọng, cận của T3 giữ nguyên cho $\mathbb Ef(\bar x_K)-f^*$.
- **Ý chính:** **Định lý (T4).** Đầu vào: $f$ thỏa H1 (dạng dưới gradient), H4; $g_k$ thỏa H6, H6a; $\eta_k>0$ cho trước, không phụ thuộc mẫu. Kết luận: $\mathbb Ef(\bar x_K)-f^*\le\frac{D^2+G^2\sum_{k<K}\eta_k^2}{2\sum_{k<K}\eta_k}$; bước hằng $\frac D{G\sqrt K}$ cho $\frac{DG}{\sqrt K}$.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Như trên.
- **Kết nối:** Nhận T3, H6, H6a; E05 chứng minh. Liên kết về sau: Bài 06 gọi $\bar x_K$ với bước hằng là trung bình Polyak.
- **Nguồn:** SNW ch. 5 §5.5, Mệnh đề 5.5.
- **Ghi chú soạn:** Lặp tốt nhất không có trong kết luận vì cần tính $f$ trên toàn tập dữ liệu. **Bản sửa 2026-10-08** (R44): ghi chú "trùng với cận của T3".

#### E05 — Chứng minh định lý SGD lồi

- **Vai trò và mục tiêu:** Hình thức KN5 (chứng minh T4; KH4); MT4.
- **Luận điểm trung tâm:** Dòng chứng minh của T3 đúng sau khi lấy kỳ vọng có điều kiện, vì $x_k$ cố định khi biết $\mathcal F_k$.
- **Ý chính:** BĐ4: $d_{k+1}^2=d_k^2-2\eta_kg_k^T(x_k-x^*)+\eta_k^2\lVert g_k\rVert^2$. Lấy $\mathbb E[\cdot\mid\mathcal F_k]$ (tháp, H6, H1, H6a): $\mathbb E[d_{k+1}^2\mid\mathcal F_k]\le d_k^2-2\eta_ke_k+\eta_k^2G^2$. Đặt $a_k=\mathbb Ed_k^2$; tháp cho $a_{k+1}\le a_k-2\eta_k\mathbb Ee_k+\eta_k^2G^2$. Tổng lồng và Jensen như phương pháp dưới gradient.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Ba dòng có nhãn; đánh dấu chỗ dùng độc lập của $I_k$ với $\mathcal F_k$.
- **Kết nối:** So sánh từng dòng với D05. Câu nối sang E06 nêu giới hạn của T4: chỉ chặn trung bình lặp; tốc độ $1/\sqrt K$; không giải thích vì sao điểm cuối của SGD bước hằng dừng ở một mức dương như Bài 05 quan sát. E06 thêm H2, H3 để trả lời.
- **Nguồn:** SNW ch. 5 §5.5.
- **Ghi chú soạn:** Bước cho trước (không phụ thuộc mẫu) cần để $\eta_k$ ra ngoài kỳ vọng. **Bản sửa 2026-10-08** (R21): dòng "Ý tưởng".

#### E06 — Định lý hội tụ của SGD cho hàm lồi mạnh

- **Vai trò và mục tiêu:** Hình thức KN5 (T5); MT4.
- **Luận điểm trung tâm:** Với lồi mạnh, trơn và bước hằng, sai số kỳ vọng của điểm cuối co tuyến tính tới một sàn nhiễu tỉ lệ với bước.
- **Ý chính:** **Định lý (T5).** Đầu vào: $f$ thỏa H2, H3, H4; $g_k$ thỏa H6, H6b; $0<\eta\le1/L$ hằng. Kết luận: $a_k\le(1-\eta\mu)^kD^2+\frac{\eta\sigma^2}\mu$ mọi $k\ge0$. Số hạng thứ nhất co; số hạng thứ hai là sàn nhiễu (noise floor).
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Như trên.
- **Kết nối:** Nhận giới hạn E05; khi $\sigma=0$, $\eta=1/L$ lấy lại T2a. E07 chứng minh.
- **Nguồn:** Suy trực tiếp từ phép co của hạ gradient và bổ đề tách phương sai; bối cảnh SNW ch. 5 §5.4.
- **Ghi chú soạn:** Không cần H6a, nên không vướng mâu thuẫn với H3. Nguồn cụ thể chờ xác nhận (N6). **Bản sửa 2026-10-08** (R10, R09): "sàn nhiễu (noise floor)"; nguồn suy trực tiếp.

#### E07 — Chứng minh định lý SGD lồi mạnh

- **Vai trò và mục tiêu:** Hình thức KN5 (chứng minh T5; KT13, KT14); MT4.
- **Luận điểm trung tâm:** Bất đẳng thức một bước theo kỳ vọng là $a_{k+1}\le(1-\eta\mu)a_k+\eta^2\sigma^2$; giải đệ quy này cho cận của T5.
- **Ý chính:** $\mathbb E[d_{k+1}^2\mid\mathcal F_k]=d_k^2-2\eta\nabla f(x_k)^T(x_k-x^*)+\eta^2(\lVert\nabla f(x_k)\rVert^2+\text{phương sai})\le(1-\eta\mu)d_k^2-2\eta(1-\eta L)e_k+\eta^2\sigma^2$. Với $\eta\le1/L$ bỏ số hạng chứa $e_k$; lấy kỳ vọng: $a_{k+1}\le(1-\eta\mu)a_k+\eta^2\sigma^2$. Giải đệ quy cho kết luận.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Dòng thứ nhất dùng bổ đề tách phương sai, H3 tại $y=x^*$, BĐ2, H6b.
- **Kết nối:** E08 kiểm hằng số trên VD-A, kể cả số hạng đã bỏ.
- **Nguồn:** Chứng minh trực tiếp; SNW ch. 5 (bối cảnh).
- **Ghi chú soạn:** Phần giải đệ quy chỉ trong ghi chú: quy nạp $a_k\le(1-\eta\mu)^ka_0+\eta^2\sigma^2\sum_{j<k}(1-\eta\mu)^j$ và $\sum_{j<k}q^j\le\frac1{1-q}$ với $q=1-\eta\mu$. **Bản sửa 2026-10-08** (R21, R10): dòng "Ý tưởng"; "sàn nhiễu", "giá trị giới hạn".

#### E08 — Đối chiếu cận lồi mạnh trên ví dụ ba quan sát

- **Vai trò và mục tiêu:** Ứng dụng KN5; trang đối chiếu bắt buộc; MT3–MT4.
- **Luận điểm trung tâm:** Trên Ví dụ A, cận T5 đúng dạng nhưng sàn nhiễu gấp khoảng hai lần giá trị giới hạn, vì chứng minh bỏ số hạng $-2\eta(1-\eta L)e_k$.
- **Ý chính:** $\eta=0{,}1$, $b=1$, $\theta_0=0$, $\mu=L=1$, $\sigma^2=\frac83$, $D=1$. Đệ quy chính xác $a_{k+1}=0{,}81a_k+\frac8{300}$; giới hạn $\frac8{57}\approx0{,}140$. Cận T5: $0{,}9^k+0{,}267$. $k=20$: thật $0{,}153$, cận $0{,}388$. $b=4$: giới hạn $0{,}035$, sàn nhiễu $0{,}0667$. Giá trị dừng thật $\frac{\eta\sigma^2}{\mu(2-\eta\mu)}\approx\frac{\eta\sigma^2}{2\mu}$; hằng số định lý $\frac{\eta\sigma^2}\mu$.
- **Ví dụ/hình dự kiến:** `vda-sgd-bound-vs-exact.svg`: $a_k$ chính xác và cận T5 theo $k$, hai đường ngang $0{,}140$ và $0{,}267$.
- **Hình thức hóa:** Với Ví dụ A, $e_k=\frac12d_k^2$ nên số hạng bị bỏ bằng $-\eta(1-\eta)d_k^2$; hệ số co thật $(1-\eta)^2=0{,}81$ so với $1-\eta=0{,}9$ của định lý.
- **Kết nối:** Nhận T5; E09 dùng sàn nhiễu tỉ lệ $\eta$ để thiết kế lịch bước.
- **Nguồn:** Tính trực tiếp; Bài 05, mục cỡ nhóm, bước học và dao động gần nghiệm.
- **Ghi chú soạn:** Số kiểm: $0{,}81^{20}\approx0{,}0148$; $a_{20}\approx0{,}0148+0{,}1404\cdot0{,}9852\approx0{,}153$; $0{,}9^{20}\approx0{,}1216$. **Bản sửa 2026-10-08** (R26, R44, R54, R10): câu so sánh giá trị giới hạn và sàn nhiễu; dòng $b=4$ vào ghi chú; hình mở trục tới $1{,}4$; ghi chú nối về A03.

#### E09 — Lịch giảm bước theo pha

- **Vai trò và mục tiêu:** Ứng dụng KN5 (T5-pha); MT4.
- **Luận điểm trung tâm:** Vì sàn nhiễu tỉ lệ với bước, chia đôi bước mỗi khi số hạng co đã nhỏ cỡ sàn nhiễu cho tổng số bước $O(1/\varepsilon)$.
- **Ý chính:** **Hệ quả (T5-pha, chỉ phát biểu).** Giả thiết như T5; pha $i$ dùng $\eta_i=\eta_02^{-i}$ và kéo dài đến khi số hạng co của pha bằng sàn nhiễu $\eta_i\sigma^2/\mu$. Tổng số bước để $a_k\le\varepsilon$: $O\big(\frac1{\mu\eta_0}\log\frac{D^2}\varepsilon+\frac{\sigma^2}{\mu^2\varepsilon}\big)$, tức $a_k=O(1/k)$. Ví dụ A: bước $0{,}1$ có sàn nhiễu $0{,}267$; bước $0{,}05$ có sàn nhiễu $0{,}133$.
- **Ví dụ/hình dự kiến:** `step-halving-schedule.svg`: bậc thang $\eta$ và cận $a_k$ giảm theo pha.
- **Hình thức hóa:** Phát biểu bậc $O(\cdot)$; lập luận đầy đủ trong học liệu.
- **Kết nối:** Nhận E08; trả lời lịch $0{,}1\to0{,}05$ của Bài 05; E10 xét lịch giảm liên tục.
- **Nguồn:** Bài 05, mục bước học và dao động gần nghiệm; tổng hợp từ T5.
- **Ghi chú soạn:** Không đặt hằng số cụ thể trên mặt trang ngoài hai sàn nhiễu của VD-A. **Bản sửa 2026-10-08** (R10, R28, R09): "sàn nhiễu"; ghi chú pha kết thúc tại 10, 31, 75 theo nghiệm đúng và 13, 40, 95 theo dạng T5; nguồn SNW §5.4 Mệnh đề 5.4.

#### E10 — Bước giảm dần cho hàm lồi mạnh

- **Vai trò và mục tiêu:** Ứng dụng KN5 (T6); MT4.
- **Luận điểm trung tâm:** Bước $\frac1{\mu(k+1)}$ bỏ sàn nhiễu và cho $a_k=O(1/k)$, với điều kiện chặn mômen trên vùng chứa dãy lặp.
- **Ý chính:** **Định lý (T6, chỉ phát biểu).** Đầu vào: H3, H4; H6, H6a trên vùng chứa dãy lặp; $\eta_k=\frac1{\mu(k+1)}$. Kết luận: $a_k\le\frac{G^2}{\mu^2k}$ mọi $k\ge1$. Ví dụ A với $\eta_k=\frac1{k+1}$: $\theta_k$ là trung bình $k$ mẫu đầu, $a_k=\frac8{3k}$ chính xác.
- **Ví dụ/hình dự kiến:** Không có hình mới.
- **Hình thức hóa:** Đệ quy $a_{k+1}\le(1-\frac2{k+1})a_k+\frac{G^2}{\mu^2(k+1)^2}$; quy nạp trong học liệu.
- **Kết nối:** Nhận E09; E11 chuyển cận kỳ vọng sang xác suất.
- **Nguồn:** Bối cảnh SNW ch. 5 §5.4; chứng minh quy nạp trong học liệu.
- **Ghi chú soạn:** Ghi chú: với VD-A, $\theta_k\in[-1,3]$ nên H6a đúng trên vùng với $G^2=4+\frac83=\frac{20}3$; cận $\frac{20}{3k}$ so với giá trị chính xác $\frac8{3k}$ (N3). Không nêu điểm giao với bước hằng vì đó là bài tập E12. Nguồn cụ thể chờ xác nhận (N6). **Bản sửa 2026-10-08** (R18): ghi chú so sánh lịch theo pha, T6 và T4; "tiến bộ $2\eta_k\mu a_k$".

#### E11 — Bảo đảm theo xác suất

- **Vai trò và mục tiêu:** Hình thức và ứng dụng BĐ6; MT4.
- **Luận điểm trung tâm:** Cận kỳ vọng cùng bất đẳng thức Markov cho cận xác suất cho một lần chạy; hội tụ gần như chắc chắn cần công cụ khác và chỉ được nêu.
- **Ý chính:** **Bổ đề BĐ6 (Markov).** $Z\ge0$ ngẫu nhiên, $\varepsilon>0$: $P(Z\ge\varepsilon)\le\mathbb EZ/\varepsilon$. T4 bước hằng: $P(f(\bar x_K)-f^*\ge\varepsilon)\le\frac{DG}{\varepsilon\sqrt K}$. T5: $P(d_k^2\ge\varepsilon)\le a_k/\varepsilon$. Ví dụ A, $k=20$: $P((\theta_{20}-1)^2\ge0{,}5)\le\frac{0{,}153}{0{,}5}\approx0{,}31$. Dưới điều kiện Robbins–Monro, dãy hội tụ gần như chắc chắn (chỉ nêu).
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Markov từ $Z\ge\varepsilon\mathbf 1\{Z\ge\varepsilon\}$.
- **Kết nối:** Nhận T4, T5; E12 kiểm phần E.
- **Nguồn:** SNW ch. 4, Mệnh đề 4.8 (gần như chắc chắn); Bài 00 (kỳ vọng).
- **Ghi chú soạn:** Cận Markov thường lỏng; ghi chú nêu đó là cận cho một lần chạy. **Bản sửa 2026-10-08** (R02): phát biểu hội tụ gần như chắc chắn đủ giả thiết, chỉ nêu.

#### E12 — Hạ gradient ngẫu nhiên trên hai ví dụ

- **Vai trò và mục tiêu:** Bài tập KN5; MT4.
- **Luận điểm trung tâm:** Bài tập đo việc tính kỳ vọng có điều kiện, so lịch bước và kiểm giả thiết của T4.
- **Ý chính:** **Câu hỏi:** (1) Ví dụ A, bước $0{,}1$, nhóm một mẫu, $\theta_0=0$: tính $\mathbb E(\theta_1-1)^2$, $\mathbb E(\theta_2-1)^2$ bằng cây lịch sử và bằng đệ quy. (2) Với $\eta_k=\frac1{k+1}$, $\mathbb E(\theta_k-1)^2=\frac8{3k}$. Tìm $k$ nhỏ nhất để giá trị này nhỏ hơn **giá trị giới hạn** $\frac8{57}$ của bước hằng $0{,}1$; sau đó tìm $k$ nhỏ nhất để nó nhỏ hơn giá trị tương ứng của **quỹ đạo bước hằng $0{,}1$ từ $\theta_0=0$**. (3) Hạ gradient ngẫu nhiên cho Ví dụ B với $g_k=\operatorname{sign}(x_k-y_{I_k})$, quy ước $\operatorname{sign}(0)=0$: kiểm H6, H6a với $G=1$; viết cận T4 với $x_0=0$, $K=100$, bước hằng tối ưu.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Đáp án ghi chú: (1) $0{,}837$; $0{,}704$. (2) $k=20$ (bằng nhau tại $k=19$); $k=16$. (3) $\eta=\frac1{10}$, cận $0{,}1$.
- **Kết nối:** Kết thúc E.
- **Nguồn:** Tự xây dựng.
- **Ghi chú soạn:** Đề nói rõ so với giá trị nào (kế hoạch [SỬA]). E03 không nêu đáp án câu (3). **Bản sửa 2026-10-08** (R45): câu (2) tách (a), (b).

### F. Mục tiêu không lồi và chuẩn gradient

Chức năng: bỏ tính lồi; đo bằng chuẩn gradient; chứng minh T7, T8; nêu PL và T9. Nhận BĐ1–BĐ3, KT12, KT13; chuyển cho G T7–T9 và các giới hạn của bảo đảm không lồi. MT4.

#### F01 — Mục tiêu không lồi

- **Vai trò và mục tiêu:** Nhu cầu và ví dụ dẫn nhập KN6; MT4.
- **Luận điểm trung tâm:** Khi $f$ không lồi, $d_k$ và $e_k$ mất nghĩa hoặc không đo được tiến triển; cần một đại lượng chỉ dùng thông tin cục bộ.
- **Ý chính:** Ví dụ D: $F(\theta)=\frac14(\theta^2-1)^2$, bằng một phần tư hàm bậc bốn hai cực tiểu của Bài 05; hai cực tiểu $\pm1$, cực đại địa phương $0$. $d_k$ phụ thuộc chọn cực tiểu; dãy khởi tạo tại $0$ đứng yên với $e_k=\frac14$. Hệ quả của H1 không còn đúng: với $x^*=1$, tại $\theta=-0{,}5$, $F'(\theta)(\theta-x^*)=-0{,}5625<F(\theta)-F^*=0{,}140625$. Đại lượng thay thế: $\lVert\nabla f(x_k)\rVert$.
- **Ví dụ/hình dự kiến:** `quartic-two-wells.svg` (dùng chung với F02).
- **Hình thức hóa:** $F'(\theta)=\theta^3-\theta$; điểm dừng $0,\pm1$.
- **Kết nối:** Nhận giới hạn E (cần lồi); điểm dừng không lồi của Bài 05.
- **Nguồn:** Bài 05, mục điểm dừng của hàm không lồi ($r(u)=(u^2-1)^2$); tính trực tiếp.
- **Ghi chú soạn:** Số kiểm: $F'(-0{,}5)=0{,}375$, $\theta-x^*=-1{,}5$, $F(-0{,}5)=\frac14\cdot0{,}5625$. Với $x^*=-1$ bất đẳng thức đúng tại điểm này ($0{,}1875\ge0{,}1406$); ghi chú nêu hệ quả phụ thuộc cực tiểu được chọn. Bài 06 dùng lại hàm $r$ (liên kết về sau). **Bản sửa 2026-10-08** (R46, R04): dùng $\theta^*=1$; số kiểm vào ghi chú; panel câu đầy đủ; alt bỏ cụm hai bước.

#### F02 — Hàm thế và điểm dừng

- **Vai trò và mục tiêu:** Trực quan và ví dụ KN6 (KH3); đặt $\Delta_0$; MT4.
- **Luận điểm trung tâm:** $f-f_{\inf}$ là hàm thế không âm giảm ít nhất $\frac\eta2\lVert\nabla f\rVert^2$ mỗi bước; tổng các mức giảm bị chặn nên gradient không thể lớn mãi.
- **Ý chính:** Trực quan: trên mặt bậc bốn hai đáy, mỗi bước GD hạ "độ cao" $F$; độ cao ban đầu $\Delta_0=f(x_0)-f_{\inf}$ chặn tổng các lần hạ. Ví dụ D: $\theta_0=2$, $F(2)=\frac94=\Delta_0$, $F'(2)=6$, tập mức $[-2,2]$ có $L=11$; bước $\frac1{11}$: $\theta_1=\frac{16}{11}\approx1{,}455$, $F(\theta_1)\approx0{,}311$; mức giảm $1{,}94\ge\frac{36}{22}\approx1{,}64$.
- **Ví dụ/hình dự kiến:** `quartic-two-wells.svg`: đồ thị $F$ trên $[-2,2]$, ba điểm dừng, hai bước đầu từ $\theta_0=2$.
- **Hình thức hóa:** Bổ đề giảm: $f(x_{k+1})\le f(x_k)-\frac1{2L}\lVert\nabla f(x_k)\rVert^2$, không cần lồi.
- **Kết nối:** Nhận BĐ1, bổ đề giảm; F03 cộng các bất đẳng thức.
- **Nguồn:** BV §9.1.2; tính trực tiếp.
- **Ghi chú soạn:** $L=11$ chỉ đúng trên $[-2,2]$; ánh xạ $\theta\mapsto\theta-\frac1{11}F'(\theta)$ đơn điệu trên $[-2,2]$ và đưa $[-2,2]$ vào $[-\frac{16}{11},\frac{16}{11}]$, nên dãy GD ở lại vùng này. **Bản sửa 2026-10-08** (R04): alt "0,125".

#### F03 — Hội tụ tới điểm dừng của hạ gradient

- **Vai trò và mục tiêu:** Hình thức và ứng dụng KN6 (T7); MT4.
- **Luận điểm trung tâm:** Không cần lồi, GD bước $1/L$ cho $\min_{k<K}\lVert\nabla f(x_k)\rVert^2\le\frac{2L\Delta_0}K$.
- **Ý chính:** **Định lý (T7).** Đầu vào: $f$ thỏa H0, H2; $x_0$; bước $1/L$. Kết luận: $\min_{k<K}\lVert\nabla f(x_k)\rVert^2\le\frac{2L\Delta_0}K$. Chứng minh: cộng bổ đề giảm cho $k<K$: $\frac1{2L}\sum_{k<K}\lVert\nabla f(x_k)\rVert^2\le f(x_0)-f(x_K)\le\Delta_0$. Ví dụ D: cận $\frac{49{,}5}K$.
- **Ví dụ/hình dự kiến:** Không có hình mới.
- **Hình thức hóa:** Như trên; một trang vì chứng minh ba dòng.
- **Kết nối:** Nhận F02; F04 thêm nhiễu.
- **Nguồn:** SNW ch. 4; BV §9.1.2.
- **Ghi chú soạn:** Kết luận chặn lặp tốt nhất theo chuẩn gradient, không chặn $x_K$. **Bản sửa 2026-10-08** (R14, R09): câu về dãy GD ở lại $[-2,2]$; nguồn suy trực tiếp.

#### F04 — Định lý SGD cho hàm không lồi

- **Vai trò và mục tiêu:** Hình thức và ứng dụng KN6 (T8 và hệ quả chọn bước); MT4.
- **Luận điểm trung tâm:** Với SGD bước hằng, trung bình của $\mathbb E\lVert\nabla f(x_k)\rVert^2$ bị chặn bởi một số hạng giảm theo $K$ và một số hạng nhiễu tỉ lệ với bước; cân bằng hai số hạng cho bước cỡ $1/\sqrt K$.
- **Ý chính:** **Định lý (T8).** Đầu vào: $f$ thỏa H0, H2; $g_k$ thỏa H6, H6b; $0<\eta\le1/L$. Kết luận: $\frac1K\sum_{k<K}\mathbb E\lVert\nabla f(x_k)\rVert^2\le\frac{2\Delta_0}{\eta K}+L\eta\sigma^2$. **Hệ quả.** $\eta=\min\{\frac1L,\sqrt{\frac{2\Delta_0}{L\sigma^2K}}\}$ cho cận $\frac{2L\Delta_0}K+\frac{2\sqrt{2L\Delta_0\sigma^2}}{\sqrt K}$.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Như trên.
- **Kết nối:** Nhận T7 ($\sigma=0$, $\eta=1/L$ cho lại T7 dưới dạng trung bình); F05 chứng minh.
- **Nguồn:** Suy trực tiếp từ BĐ1 và bổ đề tách phương sai; SNW ch. 13 §13.3 (bối cảnh).
- **Ghi chú soạn:** Ghi chú: hai trường hợp của $\min$; chọn chỉ số $\tau$ đều trong $\{0,\dots,K-1\}$ thì $\mathbb E\lVert\nabla f(x_\tau)\rVert^2$ có cùng cận (không dùng chữ $R$). Nguồn cụ thể chờ xác nhận (N6). **Bản sửa 2026-10-08** (R09): nguồn suy trực tiếp.

#### F05 — Chứng minh định lý SGD không lồi

- **Vai trò và mục tiêu:** Hình thức KN6 (chứng minh T8; KH3); MT4.
- **Luận điểm trung tâm:** Bất đẳng thức một bước theo kỳ vọng cho hàm thế $f-f_{\inf}$ cộng lại thành T8.
- **Ý chính:** BĐ1, tính chất tháp, bổ đề tách phương sai: $\mathbb E[f(x_{k+1})\mid\mathcal F_k]\le f(x_k)-\eta\lVert\nabla f(x_k)\rVert^2+\frac{L\eta^2}2(\lVert\nabla f(x_k)\rVert^2+\sigma^2)\le f(x_k)-\frac\eta2\lVert\nabla f(x_k)\rVert^2+\frac{L\eta^2\sigma^2}2$ (dùng $\eta\le1/L$). Lấy kỳ vọng, cộng cho $k<K$, dùng $\mathbb Ef(x_K)\ge f_{\inf}$.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Ba dòng có nhãn.
- **Kết nối:** Nhận T8; F06 hỏi khi nào khôi phục được tốc độ tuyến tính.
- **Nguồn:** Suy trực tiếp từ bổ đề giảm và bổ đề tách phương sai.
- **Ghi chú soạn:** So với F03: thêm một số hạng nhiễu $\frac{L\eta^2\sigma^2}2$ mỗi bước, cộng lại thành $\frac{KL\eta^2\sigma^2}2$. **Bản sửa 2026-10-08** (R21): dòng "Ý tưởng".

#### F06 — Điều kiện Polyak–Łojasiewicz

- **Vai trò và mục tiêu:** Nhu cầu, trực quan, ví dụ, hình thức và ứng dụng của tiểu khái niệm PL trong KN6 (H7, T9, KT7, KT16); MT4.
- **Luận điểm trung tâm:** Bất đẳng thức PL nói gradient chỉ nhỏ khi giá trị đã gần tối ưu; với nó, SGD bước hằng lấy lại hội tụ tuyến tính tới một sàn nhiễu mà không cần lồi.
- **Ý chính:** Nhu cầu: T7, T8 chỉ cho tốc độ dưới tuyến tính của chuẩn gradient. Trực quan: trong Ví dụ D, $F'(0)=0$ trong khi $F(0)-F_{\inf}=\frac14$, nên gradient nhỏ không kéo theo giá trị gần tối ưu. Ví dụ dương: với Ví dụ C, $\lVert\nabla f\rVert^2=9x_1^2+49x_2^2\ge9x_1^2+21x_2^2=6e$ tại mọi điểm. **H7 (PL).** $\frac12\lVert\nabla f(x)\rVert^2\ge\mu(f(x)-f^*)$ với mọi $x$. **Định lý (T9, chỉ phát biểu).** H0, H2, H7, H6, H6b, $0<\eta\le1/L$: $\mathbb Ee_k\le(1-\eta\mu)^ke_0+\frac{L\eta\sigma^2}{2\mu}$.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Như trên.
- **Kết nối:** Nhận nhận xét PL trong ghi chú C06 và BĐ3; G01 xếp T9 vào bảng; G03 nhận các giới hạn của bảo đảm không lồi.
- **Nguồn:** BĐ3; T9 suy trực tiếp bằng cách giải đệ quy như T5.
- **Ghi chú soạn:** Phép tính VD-C đứng trước H7 và không gọi tên PL; sau H7, ghi chú nêu VD-C thỏa H7 với $\mu=3$ (BĐ3). VD-A đặt trong ghi chú: $\frac12(\theta-1)^2=1\cdot e$, dấu bằng với $\mu=1$. Không nêu ví dụ hàm không lồi thỏa PL toàn cục vì không có nguồn cục bộ; bài tập F07 câu (2) cho PL trên một tập con. Trang gộp năm bước đầu của tiểu khái niệm theo đúng thứ tự. Nguồn cụ thể chờ xác nhận (N6). **Bản sửa 2026-10-08** (R19, R20, R47): bỏ kết luận Ví dụ D không thỏa PL; Ví dụ C viết thành phép tính trước H7, Ví dụ A vào ghi chú; câu trực quan dương trên trang; H7 và T9 dùng $f_{\inf}$, $\Delta_k$; T9 có nhãn Đầu vào/Kết luận.

#### F07 — Bảo đảm điểm dừng trên ví dụ bậc bốn

- **Vai trò và mục tiêu:** Bài tập KN6; MT4.
- **Luận điểm trung tâm:** Bài tập đo việc chứng minh T7, kiểm PL trên một tập con và chọn bước cho T8.
- **Ý chính:** **Câu hỏi:** (1) Chứng minh T7 từ bổ đề giảm. (2) Với Ví dụ D, chứng minh $\frac12F'(\theta)^2=2\theta^2F(\theta)$; suy ra bất đẳng thức PL với $\mu=2c^2$ trên tập $\{\lvert\theta\rvert\ge c\}$, $c>0$, và không đúng trên toàn $\mathbb R$. (3) Giả sử H2 với $L=11$, $\Delta_0=\frac94$, $K=100$, $\sigma^2=1$: tính bước theo hệ quả của T8 và cận tương ứng.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Đáp án ghi chú: (2) $F'(\theta)^2=\theta^2(\theta^2-1)^2=4\theta^2F(\theta)$; tại $\theta=0$, $F'(0)=0<\mu F(0)$ với mọi $\mu>0$. (3) $\eta=\sqrt{4{,}5/1100}\approx0{,}064<\frac1{11}$; $\frac{2\Delta_0}{\eta K}+L\eta\sigma^2=2\sqrt{2L\Delta_0\sigma^2/K}\approx1{,}41$.
- **Kết nối:** Kết thúc F.
- **Nguồn:** Tự xây dựng.
- **Ghi chú soạn:** Câu (3) ghi "giả sử H2 với $L=11$" vì $L=11$ chỉ đúng trên $[-2,2]$, còn T8 cần H2 toàn cục (N2). **Bản sửa 2026-10-08** (R12): câu (1) dạng bước hằng $\eta\le1/L$; đáp án (3) nêu $1{,}41$ và $1{,}90$; đáp án (2) "$\frac12F'(0)^2=0<\mu F(0)$".

### G. Bảng tra và giới hạn

Chức năng: tổng hợp T1–T9 thành bảng tra theo mục tiêu; kiểm luận đề; nêu giới hạn và ngoài phạm vi; câu hỏi tự kiểm, bài tập và tài liệu. Nhận toàn bộ C–F; chuyển cho Bài 06 và Buổi 15 bảng tra. MT1–MT4.

#### G01 — Bảng tra các bảo đảm hội tụ

- **Vai trò và mục tiêu:** Tổng hợp; MT1–MT4.
- **Luận điểm trung tâm:** Mỗi bảo đảm là một bộ (giả thiết, đại lượng, tốc độ, bước); chọn định lý bằng cách kiểm giả thiết trước.
- **Ý chính:** Bảng sáu dòng gộp mười hai phát biểu (T1, T1'; T2a, T2b, T2'; T3, T4; T5, T6; T7, T8; T9), cột giả thiết | đại lượng | tốc độ; cột tốc độ của T5, T9 ghi "tuyến tính tới sàn nhiễu" (R71). Dòng dưới bảng là dòng bước: $\eta\le1/L$ (T1, T2, T5, T7–T9); $D/(G\sqrt K)$ (T3, T4); $\frac1{\mu(k+1)}$ (T6); quay lui (T2') (R19). Ánh xạ bốn mục tiêu nằm trong ghi chú.
- **Ví dụ/hình dự kiến:** Bảng; không có hình.
- **Hình thức hóa:** Không có kết quả mới.
- **Kết nối:** Nhận C–F; G02 kiểm luận đề.
- **Nguồn:** Sổ định lý.
- **Ghi chú soạn:** Cột mục tiêu ghi hành vi, không ghi mã MT. Nếu bảng tràn, gộp T2a/T2b và T1/T1' thành một dòng (ghi rõ trong ô) hoặc chuyển cột bước sang ghi chú; không thu nhỏ chữ dưới 0,75em. **Bản sửa 2026-10-08** (R19, R50, R10): dòng chú thích thành dòng bước; ánh xạ mục tiêu vào ghi chú; T6 "H6a trên vùng chứa dãy lặp"; "tới sàn nhiễu"; T9 đo $\mathbb E\Delta_k$.

#### G02 — Khuôn chứng minh chung

- **Vai trò và mục tiêu:** Tổng hợp luận đề; MT2.
- **Luận điểm trung tâm:** Sáu bậc của sợi chỉ chứng minh khác nhau ở bất đẳng thức một bước; cách giải chỉ gồm tổng lồng, co hoặc giải đệ quy.
- **Ý chính:** Bảng tám dòng: giả thiết đổi | bất đẳng thức một bước (của định lý đầu dòng) | cách giải | thu được. Dòng 1: $e_{k+1}\le\frac1{2\eta}(d_k^2-d_{k+1}^2)$, $\eta\le1/L$, tổng lồng, T1, T1'; thêm H3: co, T2a, T2b, T2'; bỏ H2, H3, thêm H5: tổng lồng, T3; H5 → H6, H6a: tổng lồng, T4; thêm H2, H3, H6b: giải đệ quy, T5 và lịch theo pha; H3, H6a trên vùng: $a_{k+1}\le(1-2\mu\eta_k)a_k+\eta_k^2G^2$, giải đệ quy (quy nạp), T6; bỏ H1, H3, H4, thêm H0: tổng lồng, T7, T8; thêm H7: $\mathbb E\Delta_{k+1}\le(1-\eta\mu)\mathbb E\Delta_k+\frac{L\eta^2\sigma^2}2$, giải đệ quy, T9. Câu kết trên mặt trang: "Tám dòng thuộc sáu bậc; T6, T9 là biến thể của bậc T5 và bậc T7–T8; T2', lịch pha, T6, T9 chỉ phát biểu. Dạng của bất đẳng thức một bước quyết định cách giải." (R56, R63, R72; câu "cột hai là bất đẳng thức của định lý đầu dòng" và "các bậc chỉ khác nhau ở bất đẳng thức một bước" chuyển vào ghi chú vì dòng thứ ba của chú thích chạm chân trang.)
- **Ví dụ/hình dự kiến:** Bảng.
- **Hình thức hóa:** Không áp dụng.
- **Kết nối:** Nhận luận đề A02; G03 nêu giới hạn.
- **Nguồn:** Tổng hợp.
- **Ghi chú soạn:** Không lặp lại bảng G01; G02 xếp theo kỹ thuật, G01 theo kết luận. Tên khuôn không kèm mã KH. **Bản sửa 2026-10-08** (R03, R08): tám dòng, T6 và T9 dòng riêng; T2', T6, T9 đánh dấu chỉ phát biểu ở dòng chú thích; dùng chung quy tắc CSS giảm lề ô với G01.

#### G03 — Phạm vi áp dụng của các bảo đảm

- **Vai trò và mục tiêu:** Giới hạn; MT1, MT4.
- **Luận điểm trung tâm:** Các định lý trong bài là cận trên cho phương pháp bậc nhất bước không thích nghi, không ràng buộc; với mục tiêu không lồi chúng chỉ nói về điểm dừng.
- **Ý chính:** Giới hạn của bảo đảm không lồi: T7, T8 không nói dãy tới cực tiểu nào và không loại điểm yên ngựa hay cực đại địa phương. Công cụ ngoài phạm vi: momentum và Nesterov (Bài 05), AdaGrad, RMSProp, Adam, chuẩn hóa theo lô (Bài 06); cận dưới về độ phức tạp; giảm phương sai (SVRG, SAGA); hội tụ gần như chắc chắn; phép chiếu cho bài toán có ràng buộc; phương pháp Newton (Bài 04). Kiểm trước khi dùng: giả thiết toàn cục hay trên vùng; chặn $G^2$ hay $\sigma^2$; đại lượng nào được chặn.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Không áp dụng.
- **Kết nối:** Nhận G01–G02 và giới hạn F06; G04 giao câu hỏi và bài tập.
- **Nguồn:** Bài 04 (Newton); Bài 05 (momentum, Nesterov); Bài 06; SNW ch. 13.
- **Ghi chú soạn:** Không viết lời quảng bá cho phương pháp ngoài phạm vi. **Bản sửa 2026-10-08** (R20): thêm gạch đầu dòng về cận bi quan; "bước cố định hoặc theo lịch cho trước"; tách danh sách ngoài phạm vi thành hai gạch; ghi chú PL toàn cục và lấy mẫu có hoàn lại.

#### G04 — Câu hỏi tự kiểm, bài tập và tài liệu đọc

- **Vai trò và mục tiêu:** Tự kiểm, bài tập, tài liệu; MT1–MT4.
- **Luận điểm trung tâm:** Câu hỏi tự kiểm đo việc chọn định lý theo giả thiết; bài tập tổng hợp đo việc tái tạo chứng minh và áp dụng vào huấn luyện mô hình.
- **Ý chính:** **Câu hỏi:** (1) Mất mát logistic có hệ số chính quy $\frac\lambda2\lVert x\rVert^2$, $\lambda>0$: chọn định lý cho GD và nêu đại lượng được chặn. (2) Mạng nơ ron huấn luyện bằng SGD bước hằng: định lý nào áp dụng và nó không nói gì. (3) Một lần chạy SGD có $\mathbb E(\theta_k-1)^2\le0{,}2$: chặn xác suất $(\theta_k-1)^2\ge1$. Bài tập tổng hợp 10 bài ba mức (nhận biết, tính toán hoặc chứng minh, vận dụng vào AI), nội dung trong học liệu; trên trang chỉ nêu nhóm bài. Tài liệu đọc: BV §9.1.2, §9.3; SNW ch. 4, 5, 13; học liệu Bài 04 mục B; học liệu Bài 05b.
- **Ví dụ/hình dự kiến:** Không có hình.
- **Hình thức hóa:** Đáp án ghi chú: (1) H2, H3 với $\mu=\lambda$: T2a, T2b (hoặc T5 nếu dùng SGD); (2) T8 nếu H0, H2, H6, H6b đúng; cần kiểm các giả thiết này trước; kể cả khi đúng, T8 không nói tới cực tiểu nào và không loại điểm yên ngựa; (3) Markov: $\le0{,}2$.
- **Kết nối:** Kết thúc bài; liên kết về sau với Bài 06 (trung bình Polyak).
- **Nguồn:** Tự xây dựng.
- **Ghi chú soạn:** Câu (1) đo MT3; câu (2), (3) đo MT4. Danh sách bài tập học liệu phải gồm chứng minh T6 bằng quy nạp (quyết định người dùng số 3) và một bài áp dụng Markov. Câu (1) cần hằng số $L$ của mất mát logistic có chính quy; đáp án học liệu tính hằng số này từ ma trận dữ liệu, không đặt trên trang. Ba câu hỏi tự kiểm là nội dung mới của bản sửa (SB14), chờ kiểm toán. **Bản sửa 2026-10-08** (R11): câu (3) viết lại; đáp án (2) nêu điều kiện của T8.
