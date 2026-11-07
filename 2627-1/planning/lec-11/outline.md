# Dàn ý bộ trang chiếu Bài 11 — Học từ dữ liệu qua ước lượng thống kê

Tài liệu này là dàn ý của bộ trang chiếu `2627-1/lecture-11-hoc-tu-du-lieu-uoc-luong-thong-ke.html` (soạn 2026-11-07, giai đoạn A). Kế hoạch ghi chú bài giảng trước đó được giữ nguyên văn ở cuối tệp, mục "Phụ lục". Mọi số dòng "L…" là dòng của `2627-1/materials/lec-11/lecture-note.md` tại thời điểm soạn; "BT L…" là dòng của `2627-1/materials/lec-11/exercises.md`. Mã trang chỉ dùng trong planning.

## Phạm vi và chuẩn đầu ra

- Yêu cầu người dùng (2026-11-07): dựng bộ trang chiếu từ ghi chú Bài 11 và đưa lên `2627-1/index.html`; dùng Murphy làm nguồn, MAT1101 làm mẫu diễn đạt; các chứng minh quan trọng trình bày rõ trên mặt trang; khi hai quy tắc xung đột, chọn quy tắc hợp lý hơn để quy trình không lặp vô hạn.
- Phạm vi nội dung: Câu hỏi mở đầu, Mục tiêu, §1–§9, §11–§12 của ghi chú (L1–1510) và Phụ lục A (L1514–1548) ở dạng gọn trong chứng minh Định lý 11.14. Lược theo Q-D: §5.2 (Beta, L402–419), §6.2 (KL, L563–599), Câu hỏi ôn nhanh (L57–67), Nhận xét 11.18 mục 1 (trùng Ví dụ 10.10 của deck 10); các khối chỉ ở ghi chú diễn giả liệt kê ở mục cuối của tệp này.
- Chuẩn đầu ra: CLO2 (ghi chú L44, năng lực xây dựng và phân tích mô hình học máy). Đề cương không có mã LLO riêng cho buổi này; không tự tạo mã.
- Sáu mục tiêu học tập của ghi chú (L37–42) được rút gọn trên MD01; mỗi trang ở storyboard ghi mục tiêu nó phục vụ.
- Tiên quyết (L46–55): Bài 10 đã có bộ trang chiếu, nên họ phân phối, kỳ vọng, phương sai, hiệp phương sai, độc lập chỉ xuất hiện sau nhãn "Nhắc lại:". Hàm Lagrange (Bài 03), bất đẳng thức $\log t\le t-1$ và phân rã trị riêng (Bài 00) cũng chỉ "Nhắc lại:".
- Sản phẩm học tập: $\hat p=0{,}7$ cho mười cờ; $\hat{\boldsymbol\pi}=(0{,}2;\ 0{,}3;\ 0{,}5)$ cho ba chế độ tải; $\hat\mu=2$, $\hat\sigma^2=2$ và $Q/(n-1)=2{,}5$ cho năm độ lệch nhiệt độ; $\hat\mu=(10,20)^\top$, $\hat\Sigma=S_4$ cho dữ liệu cảm biến nền; $d^2_{\hat\Sigma}(a,\hat\mu)=9/2$, $d^2_{\hat\Sigma}(b,\hat\mu)=8$ và quyết định gắn cờ $b$ với ngưỡng $6$.

## Nguồn

1. Ghi chú bài giảng và bài tập Bài 11 (`materials/lec-11/`): nguồn của mọi định nghĩa, kết quả, chứng minh và con số trên mặt trang. Không thêm số liệu, ví dụ hay nhận định ngoài hai tệp này. Mọi con số đã được kiểm bằng Python (báo cáo nguồn sources-lec11, mục 4).
2. Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press; PDF `/data/tqlong/learn-my-style/sources/murphy2022probabilistic-draft.pdf` (trang PDF = trang in + 30). Dùng để đối chiếu cách dẫn dắt và ghi nguồn trong ghi chú diễn giả (`<p class="note-source">`), không dịch chép. Số hiệu công thức của Murphy luôn viết kèm tên sách, "Murphy (4.2)", vì (4.1)–(4.3) của ghi chú trùng số.
   - §4.1 (4.1), PDF 137; §4.2.1 (4.2)–(4.7), PDF 137–138: ước lượng là bài toán tối ưu; MLE; i.i.d. cho tích; log cho tổng; NLL là tổng (ghi chú chia $n$) → mạch 2.
   - §4.2.2 (4.9), PDF 139: MLE trùng MAP khi tiên nghiệm đều → ghi chú diễn giả HL05.
   - §4.3 (4.60), PDF 145: rủi ro thực nghiệm → HL06.
   - §4.2.3 (4.20)–(4.25), PDF 140: Bernoulli, chỉ giải đạo hàm bằng $0$, không xét biên → TS01–TS06.
   - §4.5, PDF 150; §4.5.1 (4.95)–(4.96), PDF 151–152: quá khớp, bài toán số đếm bằng không; add-one là ước lượng MAP với tiên nghiệm Beta$(2,2)$ → ghi chú diễn giả TS05, TS15.
   - §4.2.4 (4.26)–(4.31), PDF 141, chú thích 3; Lagrange §8.5.1, PDF 332; đơn hình §4.6.3.2 (4.151), PDF 168 → TS10–TS15.
   - §4.2.5 (4.32)–(4.38), PDF 141–142: Gaussian một chiều, chỉ điểm dừng → G102–G106.
   - §2.7.3 (2.134)–(2.135), PDF 93: mật độ Laplace → G107 (ghi chú diễn giả).
   - §4.7.6.1 (4.232)–(4.236), PDF 189–190: độ chệch, phương sai mẫu → G108–G112.
   - §3.2.1 (3.12)–(3.15), PDF 111: ma trận hiệp phương sai → GN02.
   - §4.2.6 (4.39)–(4.51), PDF 142–144: Gaussian nhiều chiều, ma trận phân tán (4.46), $\hat\Sigma=S_y/N$ (4.51), điểm dừng bằng đạo hàm ma trận; "singular if $N<D$", PDF 144; mẹo vết (7.36), PDF 266 → GN03–GN09.
   - §4.5.2.1 (4.97), PDF 152: ước lượng co → ghi chú diễn giả GN09, GN11.
   - §3.2.2 (3.20)–(3.25), PDF 113–114; (7.159), PDF 285; §7.4.4 (7.161)–(7.163), PDF 286; làm trắng §7.4.5, PDF 286–287 → mạch 6. Murphy §3.2.2 in $z=U(y-\mu)$; deck theo ghi chú, $z=U^\top(x-\mu)$ (L1510).
   - Hệ quả 11.15 (dạng ma trận) không có ở Murphy; chỉ dựa vào ghi chú.
3. MAT1101 (Xác suất thống kê, cùng tác giả), chỉ làm mẫu diễn đạt; bản trích trong scratchpad của phiên điều phối (`src/mat1101/`). Các mẫu dùng:
   - b10.1 S7 (nguyên lý: chọn tham số để xác suất sinh dữ liệu lớn nhất) → trực quan HL01;
   - b10.1 S8 (hàm hợp lý là xác suất của dữ liệu khi tham số bằng $\theta$; MLE và MAP với tiên nghiệm đều) → "Ý nghĩa:" của HL05, ghi chú diễn giả HL05;
   - b10.1 S9 (log đồng biến, cực đại hóa tương đương) → HL06–HL07;
   - b10.1 S12 (đồng xu, cực đại tại tần suất) → TS01, TS06; deck thêm nghiệm biên;
   - b10.1 S15–S16 (hệ phương trình cực trị Gaussian; mẫu số $n-1$ trong thực hành) → G103–G112;
   - b10.1 S21 (nghĩa vận hành "trong $N$ lần …") → "Ý nghĩa:" của G110;
   - b9 S5 (Bayes và cổ điển) → ghi chú diễn giả HL05;
   - b6 S32–S33 (hai Gaussian độc lập có đường đồng mức là elip song song trục) → "Nhắc lại:" của HH01;
   - b11 S20 ($\mathbb E(X-\mu)(X-\mu)^\top=\mathbb EXX^\top-\mu\mu^\top$) → ghi chú diễn giả GN02.
   - Thuật ngữ theo ghi chú: "phân phối" (không "phân bố"), "đồng thời" (không "liên hợp"), "độc lập" (không "độc lập xác suất"), "thống kê đủ", "kỳ vọng", "vector". Không chép các lỗi MAT1101 đã liệt kê trong báo cáo nguồn (b10.1 S6, S7, S12, S16, S39–S40; b6 S33; b8 S20; b11 S36; b9 S19).
4. Đề cương UET.AI2012 (`sources/`): CLO2; mỗi buổi 2 tiết lý thuyết + 1 tiết bài tập.

## Thời lượng

Theo kế hoạch ghi chú (Phụ lục, "Đích học tập và thời lượng"): 120 phút lý thuyết và ba bài trên lớp × 10 phút (Bài tập 11.1, 11.2, 11.3). Phân bổ theo mạch nằm trong `storyboard.md`; không ghi thời lượng trên mặt trang hay trong ghi chú diễn giả.

## Sườn lý thuyết chung

- **Bài toán trung tâm.** Bốn sản phẩm vận hành bình thường cho các vector số đo $x_1=(12,22)^\top$, $x_2=(8,18)^\top$, $x_3=(11,19)^\top$, $x_4=(9,21)^\top$; hai sản phẩm mới cho $a=(13,23)^\top$, $b=(12,18)^\top$ (L14–20). Nhiệm vụ: xác định sản phẩm lệch khỏi chế độ vận hành bình thường nhiều hơn. Khoảng cách Euclid tới $\bar x=(10,20)^\top$ cho $18$ và $8$ (L22–29) nhưng bỏ qua mức phân tán theo từng hướng. Câu hỏi tổng quát của bài: khi mô hình có tham số chưa biết, dùng dữ liệu để xác định tham số đó thế nào (L3).
- **Nơi bài toán được trả lời.** GN01 (phương sai từng tọa độ đều bằng $5/2$, không phân biệt được hai hướng) → GN04 ($S_4$, phần tử ngoài đường chéo $3/2$) → GN10 ($\hat\Sigma^{-1}$) → **HH06** ($d^2_{\hat\Sigma}(a,\hat\mu)=9/2<8=d^2_{\hat\Sigma}(b,\hat\mu)$, tỉ số mật độ $e^{7/4}\approx5{,}8$; L1344–1368) → **HH09** (ngưỡng $6$: chỉ $b$ bị gắn cờ; L1407).
- **Đối tượng và ký hiệu.** Theo bảng ký hiệu L91–113: $\mathcal X$, $\{P_\theta:\theta\in\Theta\}$, $p_\theta$, $X_i$, $x_i$, $D$, $L(\theta;D)$, $\ell(\theta;D)$, $\hat R_n$, $p$, $s$, $K$, $n_k$, $\boldsymbol\pi$, $\Delta_{K-1}$, $\mu$, $v=\sigma^2$, $\bar x$, $Q$, $\operatorname{Cov}(X)$, $\Sigma$, $\tilde x_i$, $S_n$, $S_{n-1}$, $\Lambda$, $u_j$, $\lambda_j$, $d_\Sigma$; các lệch có chủ đích ở mục "Khóa ký hiệu".
- **Giả thiết** (L117–126): mẫu i.i.d.; họ phân phối chọn trước; mômen bậc hai hữu hạn (chỉ cho kết quả về độ chệch, không cần giả thiết Gaussian); miền tham số $p\in[0,1]$, $\boldsymbol\pi\in\Delta_{K-1}$ đóng, $v>0$, $\Sigma\succ0$; dữ liệu không suy biến $Q>0$, $S_n\succ0$.
- **Chuỗi định nghĩa → kết quả → phương pháp.** Mô hình thống kê, mẫu i.i.d., bộ ước lượng (Định nghĩa 11.1) → hàm hợp lý dạng tích và ước lượng hợp lý cực đại (Định nghĩa 11.2) → hợp lý cực đại tương đương cực tiểu rủi ro thực nghiệm với mất mát âm log-hợp lý (Mệnh đề 11.3) → nghiệm theo từng họ: Bernoulli bằng dấu đạo hàm và hai đầu mút (Định lý 11.4); phân loại bằng nhân tử Lagrange để tìm ứng viên và $\log t\le t-1$ để chứng minh cực đại toàn cục (Định lý 11.7); Gaussian một chiều bằng tách tâm và dấu đạo hàm (Định lý 11.9); Gaussian nhiều chiều bằng tách tâm, đổi biến $C=S_n^{1/2}\Lambda S_n^{1/2}$ và $\log c\le c-1$ trên trị riêng (Định lý 11.14) → tiêu chuẩn thứ hai, không chệch (Định nghĩa 11.10, Mệnh đề 11.11, Hệ quả 11.15) → đọc $\hat\Sigma$ bằng phân rã trị riêng và khoảng cách Mahalanobis (Định nghĩa 11.16, Mệnh đề 11.17) → chấm điểm lệch (Tình huống 11.1).
- **Phương pháp chung của các chứng minh.** (i) Tách phần chỉ phụ thuộc trung bình, hoặc dùng điều kiện cần để tìm ứng viên; (ii) chứng minh ứng viên là cực đại toàn cục bằng một bất đẳng thức (dấu đạo hàm, $\log t\le t-1$), không dừng ở điểm dừng; (iii) xét riêng trường hợp biên hoặc suy biến.
- **Giới hạn áp dụng.** Nghiệm chỉ tối ưu trên mẫu đã thấy; chất lượng dự đoán trên quan sát mới phải kiểm tra trên dữ liệu khác (L1445). Sự tồn tại nghiệm phụ thuộc miền tham số (đóng hay mở) và tính không suy biến của dữ liệu. Mẫu số $n$ hay $n-1$ tùy tiêu chuẩn. Mô hình của bài dùng chung một tham số cho mọi quan sát; Bài 12 cho tham số phụ thuộc đầu vào (nêu bằng lời ở TK05). Ngưỡng trên $d^2_{\hat\Sigma}$ cần thêm dữ liệu kiểm tra để biết tỉ lệ báo động sai (L1409).

## Khóa ký hiệu và dữ kiện

- Dữ liệu cảm biến nền (L14–31, L961–999, L1134–1162, L1326–1368): $\bar x=(10,20)^\top$; $\tilde x_1=(2,2)^\top$, $\tilde x_2=(-2,-2)^\top$, $\tilde x_3=(1,-1)^\top$, $\tilde x_4=(-1,1)^\top$; $S_4=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}$, $\det S_4=4$, trị riêng $4$ và $1$ với vector riêng $u_\pm=(1,\pm1)^\top/\sqrt2$; $\hat\Sigma^{-1}=\tfrac18\begin{pmatrix}5&-3\\-3&5\end{pmatrix}$; $\hat f(\hat\mu)=1/(4\pi)\approx0{,}0796$; $a$: Euclid bình phương $18$, $z=(3\sqrt2,0)$, $d^2=9/2$; $b$: Euclid bình phương $8$, $z=(0,2\sqrt2)$, $d^2=8$; $\hat f(a)/\hat f(b)=e^{7/4}\approx5{,}755$; $S_{n-1}=\tfrac43S_4$, trị riêng $16/3$, $4/3$ (chỉ ghi chú diễn giả).
- Dây chuyền kiểm tra một chiều (L133): sáu cờ $(1,0,1,1,0,0)$, $s=3$, $L(1/2)=1/64\approx0{,}0156$, $L(0{,}3)=0{,}009261\approx0{,}0093$, tỉ số $\approx1{,}69$; mười cờ $(1,0,1,1,0,1,1,0,1,1)$, $s=7$, $L(1/2)=1/1024\approx0{,}000977$, $L(0{,}7)\approx0{,}002224$, tỉ số $\approx2{,}28$; ba chế độ tải $(2,3,5)$, $\hat{\boldsymbol\pi}=(0{,}2;\ 0{,}3;\ 0{,}5)$; năm độ lệch nhiệt độ $(0,1,2,3,4)$, $\bar x=2$, $Q=10$, $\ell(2,2)\approx-8{,}828$, $\ell(2,1)\approx-9{,}595$, $Q/n=2$, $Q/(n-1)=2{,}5$.
- Ví dụ phụ: ba số đo $(0,0,9)$ dưới nhiễu Gaussian (nghiệm $3$) và nhiễu Laplace (nghiệm $0$) (Ví dụ 11.6); bốn điểm $(1,1)^\top,(3,3)^\top,(1,3)^\top,(3,5)^\top$ với $\bar x=(2,3)^\top$, $S_4=\begin{pmatrix}1&1\\1&2\end{pmatrix}$, trị riêng $(3\pm\sqrt5)/2$ (Ví dụ 11.10, bài tập GN14); hai cột trùng thông tin $(0,0)^\top,(1,2)^\top,(2,4)^\top$, $S_3=\tfrac23\begin{pmatrix}1&2\\2&4\end{pmatrix}$, $\det S_3=0$ (Tình huống 11.2).
- **Lệch ký hiệu có chủ đích so với ghi chú** (Q-F; ghi trong `review-log.md`, "Ngoại lệ có chủ đích"):
  - vector tham số phân loại viết đậm $\boldsymbol\pi=(\pi_1,\ldots,\pi_K)$, thành phần $\pi_k$ thường; ghi chú viết $\pi$ thường (L102, L431–453). Lý do: tránh trùng hằng số $\pi$ trong $2\pi$ của mật độ Gaussian (mạch 4–6) và khớp deck 10 (PP07);
  - trị riêng của $S_n$ trong chứng minh Định lý 11.14 viết $\alpha_j$; ghi chú viết $a_j$ (L1102, L1516). Lý do: $a$ là sản phẩm mới của bài toán trung tâm; ma trận vector riêng của $S_n$ giữ $W$ (L1516);
  - tham số Bernoulli là $p$ như ghi chú (L49, L297); deck 10 (PP07) viết $\operatorname{Bernoulli}(\theta)$. Ghi chú diễn giả HL01 nêu: $\theta$ của Bài 11 là tham số chung của mô hình;
  - tham số tỉ lệ của phân phối Laplace viết $\beta$ (G107); ghi chú viết $b$ (L749), trùng tên sản phẩm mới $b$ (rà soát #7);
  - hàm từng khúc của Ví dụ 11.6 viết $\psi(\mu)$ trong ghi chú diễn giả G107; ghi chú viết $h$, trùng $h(\Lambda)$ của GN06–GN08 (rà soát #18);
  - mật độ tiên nghiệm viết $q(\theta)$, hậu nghiệm $q(\theta\mid D)$ (ghi chú diễn giả HL05, TK04), để không trùng $p_\theta$ và tham số Bernoulli $p$ (rà soát #40);
  - cạnh ô vuông quanh tâm viết $\delta$, chỉ trong ghi chú diễn giả GN10; ghi chú viết $h$;
  - deck không dùng `\tag`; công thức và kết quả của Bài 11 được gọi bằng tên trên mặt trang (D1, D2 của `review-log.md`).
- Giữ như ghi chú: $\mathbb P$ (không đổi sang `\Pr`, tiền lệ Bài 10), `\mid`, số thập phân `{,}`, $v=\sigma^2$ trong chứng minh Định lý 11.9, $Q$ (số) và $Q_X$ (biến ngẫu nhiên), $\Lambda$, $C$, $c_j$, hằng số mức $c$ của Mệnh đề 11.17 (khác mạch với $c_j$), $d$ cho số chiều và $d_\Sigma$ cho khoảng cách.
- Bài tập 11.3 dùng lại tên $a$, $b$ cho hai điểm khác ($a=(3,1)^\top$, $b=(1,-1)^\top$, BT L106–112); HH07 nêu lại dữ kiện đầy đủ và ghi "hai điểm $a$, $b$ của bài tập này" (rà soát #28).

## Bảy mạch và câu hỏi trung tâm

| # | Tiền tố | Tên mạch (trên trang "Nội dung" và trang tiêu đề mạch) | Câu hỏi trung tâm và phân rã |
|---|---|---|---|
| 1 | MD | Mở đầu | Sản phẩm mới nào lệch khỏi chế độ vận hành bình thường nhiều hơn, và cần ước lượng gì từ dữ liệu nền để trả lời |
| 2 | HL | Mô hình thống kê và hàm hợp lý | Biến yêu cầu "tham số phù hợp với dữ liệu" thành một bài toán tối ưu trên $\Theta$ thế nào; phân rã: mô hình và cơ chế lấy mẫu → hàm hợp lý dạng tích → log → rủi ro thực nghiệm |
| 3 | TS | Ước lượng xác suất từ số đếm | Xác suất nào cực đại hợp lý khi dữ liệu là số đếm, kể cả khi có số đếm bằng $0$; phân rã: một tham số trên đoạn đóng (dấu đạo hàm và hai đầu mút) → $K$ tham số trên đơn hình (nhân tử Lagrange tìm ứng viên, $\log t\le t-1$ chứng minh cực đại) |
| 4 | G1 | Gaussian một chiều và độ chệch | Với số đo liên tục, $(\mu,\sigma^2)$ nào cực đại hợp lý, khi nào nghiệm tồn tại, và chia $Q$ cho $n$ hay $n-1$; phân rã: tối ưu $\mu$ với mọi $v$ → tối ưu $v$ → trường hợp $Q=0$ → tiêu chuẩn không chệch |
| 5 | GN | Ước lượng Gaussian nhiều chiều | Từ bốn vector nền, ước lượng $\mu$ và $\Sigma$ thế nào và khi nào nghiệm tồn tại; phân rã: hiệp phương sai mẫu → tối ưu $\mu$ với mọi $\Sigma$ → tối ưu $\Sigma$ qua trị riêng → $S_n$ suy biến → bản không chệch |
| 6 | HH | Khoảng cách Mahalanobis và hình học Gaussian | Đo độ lệch của $a$, $b$ theo mức phân tán của từng hướng thế nào, và sản phẩm nào lệch hơn; phân rã: trị riêng và vector riêng → trục, bán trục → $d^2_\Sigma=\sum_jz_j^2/\lambda_j$ → so sánh và quyết định |
| 7 | TK | Tổng kết và chuyển tiếp | Công thức ước lượng nào dùng được dưới giả thiết nào |

Trang tiêu đề mạch N có `id="mach-N"`; bìa là trang tiêu đề của mạch 1 (`id="mach-1"`). Tên mỗi mạch khác tiêu đề trang nội dung đầu tiên của mạch.

## Danh sách trang và ánh xạ sang ghi chú (76 trang)

Cột "Khối ghi chú" ghi số hiệu và dòng của `lecture-note.md` (hoặc `exercises.md`, tiền tố "BT"). Mã TS02 không dùng (hàm hợp lý Bernoulli gộp vào TS01 theo kế hoạch); mã các trang khác khớp quyết định Q-B của điều phối viên.

| Mạch | Mã | Tiêu đề dự kiến | Vai trò | Khối ghi chú |
|---|---|---|---|---|
| 1 | MD00 | Học từ dữ liệu qua ước lượng thống kê | Bìa; trang tiêu đề mạch 1 (`id="mach-1"`) | L1–10 |
| 1 | MD01 | Mục tiêu học tập | Sáu mục tiêu rút gọn, CLO2 | L33–44 |
| 1 | MD02 | Nội dung | Bảy mạch đánh số; đọc trước Murphy §2.4–2.6, §3.2.1–3.2.2 | L1505 |
| 1 | MD03 | Hai sản phẩm mới của dây chuyền | Bài toán trung tâm; "Câu hỏi:"; Euclid $18$ và $8$ | L12–31 |
| 1 | MD04 | Ngữ cảnh | Dữ liệu, mô hình, nhiệm vụ, đầu ra (≤4 dòng) | L71–78; L117–126; L134 |
| 2 | HL00 | 2. Mô hình thống kê và hàm hợp lý | Trang tiêu đề mạch (`id="mach-2"`) | §4 L136–140 |
| 2 | HL01 | Tham số chưa biết của dây chuyền | Nhu cầu + "Nhắc lại:" ba họ + "Trực quan." | L3–8; L49; L138–140 |
| 2 | HL02 | Ví dụ: sáu cờ cảnh báo dưới hai cơ chế lấy mẫu | Ví dụ dẫn nhập của mô hình và mẫu | Ví dụ 11.1 L166–188 |
| 2 | HL03 | Mô hình thống kê, mẫu và bộ ước lượng | Định nghĩa 11.1 | L144–164 |
| 2 | HL04 | Ví dụ: so sánh hai giá trị tham số trên sáu cờ | Nhu cầu + ví dụ dẫn nhập + trực quan của hàm hợp lý | L190–217 |
| 2 | HL05 | Hàm hợp lý và ước lượng hợp lý cực đại | Định nghĩa 11.2; "Ý nghĩa:" | L219–242 |
| 2 | HL06 | Hợp lý cực đại và rủi ro thực nghiệm | Nhu cầu + "Trực quan." + Mệnh đề 11.3; dòng đặt tên rủi ro thực nghiệm và mất mát âm log-hợp lý (cổng #1) | L252–271; L283–285 |
| 2 | HL07 | Chứng minh: hợp lý cực đại và rủi ro thực nghiệm | Chứng minh Mệnh đề 11.3 (P1) | L273–281 |
| 2 | HL08 | Bài tập: bài toán tối ưu của ước lượng hợp lý cực đại | Câu 1 cuối buổi; lời giải trên mặt trang (fragment) | L1485–1487; L1492 |
| 3 | TS00 | 3. Ước lượng xác suất từ số đếm | Trang tiêu đề mạch (`id="mach-3"`) | §5 L291 |
| 3 | TS01 | Mười cờ cảnh báo | Nhu cầu (hai nhóm rồi nhiều nhóm; mười cờ; mẫu toàn $0$ hoặc toàn $1$) + "Trực quan." + hàm hợp lý Bernoulli (5.1) | L291–308 |
| 3 | TS03 | Ước lượng Bernoulli | Định lý 11.4 | L310–326 |
| 3 | TS04 | Chứng minh: ước lượng Bernoulli, nghiệm trong | P2, bước 1–2 | L328–344 |
| 3 | TS05 | Chứng minh: ước lượng Bernoulli, nghiệm biên | P2, bước 3–4; "Lưu ý:" miền mở (Nhận xét 11.5) | L346–353; L396–400 |
| 3 | TS06 | Ví dụ: mười cờ cảnh báo | $\hat p=0{,}7$; tỉ số $2{,}28$; dự đoán thế tham số | Ví dụ 11.3 L368–392 |
| 3 | TS07 | Entropy chéo nhị phân | Ứng dụng của Mệnh đề 11.3 cho Bernoulli | L355–364 |
| 3 | TS08 | Bài tập: nghiệm trong và nghiệm biên (a) | Bài 11.1, đề (a), (b); lời giải (a) | BT L7–41 |
| 3 | TS09 | Bài tập: nghiệm trong và nghiệm biên (b) | Lời giải (b) | BT L23–25; BT L40–43 |
| 3 | TS10 | Ba chế độ tải | Nhu cầu + "Trực quan." của ràng buộc chuẩn hóa | L423–425 |
| 3 | TS11 | Đơn hình xác suất và hàm hợp lý phân loại | Định nghĩa 11.6 | L429–456 |
| 3 | TS12 | Ước lượng phân loại | Định lý 11.7 | L460–479 |
| 3 | TS13 | Chứng minh: ước lượng phân loại, ứng viên | P3, bước 1 (Lagrange chỉ tìm ứng viên, Q-C1) | L481–499 |
| 3 | TS14 | Chứng minh: ước lượng phân loại, cực đại toàn cục | P3, bước 2–3 | L501–518 |
| 3 | TS15 | Ví dụ: ba chế độ tải trong mười bản ghi | $(0{,}2;\ 0{,}3;\ 0{,}5)$; kiểm điều kiện dừng | Ví dụ 11.4 L536–553 |
| 3 | TS16 | Bài tập: Lagrange khi có nhóm vắng mặt (a) | Bài 11.2, đề (a)–(c); lời giải (a) | BT L45–80 |
| 3 | TS17 | Bài tập: Lagrange khi có nhóm vắng mặt (b), (c) | Lời giải (b), (c); (d) trong ghi chú diễn giả | BT L82–99 |
| 4 | G100 | 4. Gaussian một chiều và độ chệch | Trang tiêu đề mạch (`id="mach-4"`) | §7 L601 |
| 4 | G101 | Năm độ lệch nhiệt độ | Nhu cầu + "Trực quan." + "Nhắc lại:" mật độ | L603–616 |
| 4 | G102 | Log-hợp lý Gaussian | (7.1); $\bar x$, $Q$ | L618–629 |
| 4 | G103 | Ước lượng Gaussian một chiều | Định lý 11.9 | L631–651 |
| 4 | G104 | Chứng minh: Gaussian một chiều, trung bình tối ưu | P4, bước 1 | L653–680 |
| 4 | G105 | Chứng minh: Gaussian một chiều, phương sai tối ưu | P4, bước 2–4 | L682–704 |
| 4 | G106 | Ví dụ: năm độ lệch nhiệt độ | $\hat\mu=2$, $\hat\sigma^2=2$; so với $v=1$ | Ví dụ 11.5 L712–741 |
| 4 | G107 | Mất mát từ giả thiết nhiễu | Bảng Gaussian/Laplace trên $(0,0,9)$ (Q-K) | L706–708; Ví dụ 11.6 L743–773 |
| 4 | G108 | Hai mẫu số của phương sai | Nhu cầu + "Trực quan." + "Câu hỏi:" | L775–779 |
| 4 | G109 | Độ chệch và tính không chệch | Định nghĩa 11.10 | L781–794 |
| 4 | G110 | Hiệu chỉnh phương sai mẫu | Mệnh đề 11.11; "Ý nghĩa:" | L796–817; L854 |
| 4 | G111 | Chứng minh: hiệu chỉnh phương sai mẫu | P5 | L819–852 |
| 4 | G112 | Bài tập: hai mẫu số trên năm độ lệch nhiệt độ | Số của Ví dụ 11.7; lời giải trên mặt trang | L856–870 |
| 5 | GN00 | 5. Ước lượng Gaussian nhiều chiều | Trang tiêu đề mạch (`id="mach-5"`) | §8 L874 |
| 5 | GN01 | Phương sai từng tọa độ của dữ liệu cảm biến nền | Nhu cầu + ví dụ dẫn nhập + "Trực quan." | L876–880 |
| 5 | GN02 | Ma trận hiệp phương sai | Định nghĩa 11.12; (8.2) | L882–917; L929 |
| 5 | GN03 | Hiệp phương sai mẫu | Định nghĩa 11.13; (8.4); điều kiện $S_n\succ0$ | L931–957 |
| 5 | GN04 | Ví dụ: hiệp phương sai mẫu của dữ liệu cảm biến nền | $S_4$, $S_4\succ0$ | Ví dụ 11.8 L959–999 |
| 5 | GN05 | Ước lượng hợp lý cực đại Gaussian nhiều chiều | Định lý 11.14; "Nhắc lại:" mật độ | L919–927; L1001–1038 |
| 5 | GN06 | Chứng minh: Gaussian nhiều chiều, trung bình tối ưu | P6, bước 1/4 | L1040–1068 |
| 5 | GN07 | Chứng minh: Gaussian nhiều chiều, $h$ chỉ phụ thuộc $C$ | P6, bước 2/4 (không có ý song ánh, Q-C2) | L1070–1077; Phụ lục A L1514–1548 |
| 5 | GN08 | Chứng minh: Gaussian nhiều chiều, cực đại tại $\Sigma=S_n$ | P6, bước 3/4 | L1079–1100 |
| 5 | GN09 | Chứng minh: Gaussian nhiều chiều, $S_n$ suy biến | P6, bước 4/4 | L1102–1126 |
| 5 | GN10 | Ví dụ: Gaussian đã khớp cho dữ liệu cảm biến nền | $\hat\Sigma^{-1}$, kiểm tra $S_4\hat\Sigma^{-1}=I_2$, nghiệm duy nhất; $\hat f(\hat\mu)$ trong ghi chú diễn giả (rà soát #9) | Ví dụ 11.9 L1132–1162 |
| 5 | GN11 | Ví dụ: hai đặc trưng trùng thông tin | $S_3$ suy biến, không có nghiệm | Tình huống 11.2 L1412–1436 |
| 5 | GN12 | Hiệp phương sai mẫu không chệch | Hệ quả 11.15 | L1193–1214; L1235 |
| 5 | GN13 | Chứng minh: hiệp phương sai mẫu không chệch | P7 | L1216–1233 |
| 5 | GN14 | Bài tập: bốn điểm hai chiều với phương sai khác nhau | Số của Ví dụ 11.10; lời giải trên mặt trang | L1164–1186 |
| 6 | HH00 | 6. Khoảng cách Mahalanobis và hình học Gaussian | Trang tiêu đề mạch (`id="mach-6"`) | §8.3 L1237 |
| 6 | HH01 | Độ lệch của hai sản phẩm mới | Nhu cầu + "Trực quan."; hình `gaussian-geometry-deck.svg` | L1239–1241; L1368–1372 |
| 6 | HH02 | Khoảng cách Mahalanobis | Định nghĩa 11.16; quan hệ với mật độ | L1243–1264 |
| 6 | HH03 | Hướng và độ dài của đường đồng mức Gaussian | Mệnh đề 11.17 | L1266–1283 |
| 6 | HH04 | Chứng minh: hướng và độ dài của đường đồng mức | P8 | L1285–1320 |
| 6 | HH05 | Ví dụ: hai quan sát mới, tọa độ riêng | Phân rã trị riêng, bán trục, $z$ của $a$, $b$ | Ví dụ 11.11 L1324–1342 |
| 6 | HH06 | Ví dụ: hai quan sát mới, hai khoảng cách | Bảng Euclid/Mahalanobis; tỉ số mật độ; trả lời câu hỏi mở đầu | L1344–1368 |
| 6 | HH07 | Bài tập: hình học Gaussian theo hướng riêng (a) | Bài 11.3, đề; lời giải (a) | BT L101–125 |
| 6 | HH08 | Bài tập: hình học Gaussian theo hướng riêng (b), (c) | Lời giải (b), (c) | BT L126–152 |
| 6 | HH09 | Chấm điểm lệch cho quan sát cảm biến | Ứng dụng cuối mạch nội dung (Q-K) | Tình huống 11.1 L1398–1410; Nhận xét 11.18 L1376–1390 |
| 7 | TK00 | 7. Tổng kết và chuyển tiếp | Trang tiêu đề mạch (`id="mach-7"`) | L1392; L1447 |
| 7 | TK01 | Kết quả và giả thiết: mô hình một chiều | Bảng bốn hàng (tách khi dựng HTML) | L1449–1463 |
| 7 | TK01b | Kết quả và giả thiết: độ chệch, nhiều chiều, hình học | Bảng ba hàng (tách từ TK01) | L1449–1463 |
| 7 | TK02 | Bài tập: hàm mất mát từ giả thiết phân phối | Câu 2–3 cuối buổi, đề | L1483–1489 |
| 7 | TK03 | Bài tập: hàm mất mát từ giả thiết phân phối, lời giải | Lời giải trên mặt trang | L1491–1495 |
| 7 | TK04 | Câu hỏi tự kiểm tra | Bốn câu về giả thiết hay bị quên (dạng tích, ba điểm thẳng hàng, $Q=0$, biến của hàm hợp lý); đáp án trong ghi chú diễn giả (cổng #8, rà soát #10) | L1458–1463 |
| 7 | TK05 | Tài liệu đọc và chuyển tiếp | Murphy theo §12; Bài 12 nêu bằng lời | L1497–1510 |

Số trang theo mạch: 5 + 9 + 17 + 13 + 15 + 10 + 7 = 76 (đích Q-A 74 ± 4; cổng storyboard #8 thêm TK04; khi dựng HTML, bảng tổng kết bảy hàng tràn khung 298 px nên TK01 được `tách` thành TK01 và TK01b, như Bài 10). Thứ tự dòng trong bảng là thứ tự trang.

## Chứng minh trên mặt trang

Mỗi chứng minh có trang "Chứng minh: <kết quả>" riêng (Q-C): dòng đầu nêu lộ trình, mỗi bước một quan hệ, tên bước gọi theo kết quả của bước, cạnh bước ghi giả thiết hay kết quả được dùng; chi tiết đại số dài đặt trong ghi chú diễn giả. Phác thảo đầy đủ từng bước nằm trong `storyboard.md`, mục (c).

| Mã | Kết quả | Trang phát biểu → trang chứng minh | Các bước trên mặt trang | Chỗ dùng giả thiết | Ghi chú dòng |
|---|---|---|---|---|---|
| P1 | Mệnh đề 11.3 | HL06 ("Nhu cầu:", "Trực quan." trước phát biểu, cổng #1) → HL07 | "$L$ và $\ell$ cùng điểm cực đại"; "$\ell$ và $\hat R_n$ đảo thứ tự" | Mẫu i.i.d. cho dạng tích (4.1); quy ước $\log0=-\infty$ | L273–281 |
| P2 | Định lý 11.4 | TS03 → TS04 (nghiệm trong), TS05 (nghiệm biên) | TS04: "$\ell$ tăng rồi giảm" ($\ell'=(s-np)/[p(1-p)]$); "hai đầu mút có hợp lý $0$". TS05: "$s=0$: hợp lý giảm chặt"; "$s=n$: hợp lý tăng chặt" | $0<s<n$ (TS04); miền đóng $[0,1]$, $n\ge1$ (TS05) | L328–353 |
| P3 | Định lý 11.7 | TS12 → TS13 (ứng viên), TS14 (cực đại toàn cục, duy nhất) | TS13: "điểm có hợp lý dương có $\pi_k>0$ trên $\mathcal K_+$"; "điều kiện dừng cho $\pi_k=n_k/\nu$"; "ràng buộc cho $\nu=n$". TS14: "$\ell(\boldsymbol\pi)-\ell(\hat{\boldsymbol\pi})\le0$" bằng $\log t\le t-1$; "dấu bằng chỉ tại $\hat{\boldsymbol\pi}$" | Đơn hình đóng; $\sum_kn_k=n$. Không viện dẫn Mệnh đề 04.2(b) (Q-C1). Tách TS14 thành hai trang nếu chuỗi sáu dòng tràn ở 390 px | L481–518 |
| P4 | Định lý 11.9 | G103 → G104 (trung bình), G105 (phương sai, $Q=0$) | G104: "$\sum(x_i-\mu)^2=Q+n(\mu-\bar x)^2$"; "$\ell(\mu,v)\le\ell(\bar x,v)$". G105: "$\varphi'(v)=(Q-nv)/(2v^2)$, cực đại tại $Q/n$" ($\varphi$ thay $g$ của ghi chú, cổng #10); "cực đại duy nhất tại $(\bar x,Q/n)$"; "$Q=0$: hợp lý không bị chặn" | $\sum_i(x_i-\bar x)=0$; $Q>0$ để $Q/n$ thuộc miền $v>0$ | L653–704 |
| P5 | Mệnh đề 11.11 | G110 → G111 | "$Q_X=\sum(X_i-\mu)^2-n(\bar X-\mu)^2$"; "$\mathbb E(\bar X-\mu)^2=\sigma^2/n$"; "$\mathbb EQ_X=(n-1)\sigma^2$" | Độc lập ⇒ không tương quan (Bài 10); mômen bậc hai hữu hạn; $n\ge2$; không cần Gaussian | L819–852 |
| P6 | Định lý 11.14 | GN05 → GN06, GN07, GN08, GN09 | GN06: "trung bình tối ưu với mọi $\Sigma$" (tách tâm, $h(\Lambda)$). GN07: "$h$ chỉ phụ thuộc $C=S_n^{1/2}\Lambda S_n^{1/2}$" ($C\succ0$, định thức, vết). GN08: "$\sum_j(\log c_j-c_j)\le-d$, dấu bằng khi $\Sigma=S_n$"; "cực đại duy nhất tại $(\bar x,S_n)$". GN06 hiển thị (8.5) trên mặt trang (cổng #5). GN09: "hợp lý không bị chặn khi $S_n$ suy biến" | $\Lambda\succ0$; $S_n\succ0$ (GN07, GN08); $S_n^{1/2}$ khả nghịch cho $C=I_d\Rightarrow\Lambda=S_n^{-1}$; không dùng ý song ánh (Q-C2); $d-r\ge1$ (GN09) | L1040–1126; Phụ lục A L1514–1548 |
| P7 | Hệ quả 11.15 | GN12 → GN13 | "$w^\top S_nw=Q_Y/n$"; "$w^\top\mathbb E[S_n]w=\tfrac{n-1}nw^\top\Sigma w$"; "dạng toàn phương bằng $0$ thì ma trận đối xứng bằng $0$" | Các $w^\top X_i$ i.i.d.; Mệnh đề 11.11; $n\ge2$ | L1216–1233 |
| P8 | Mệnh đề 11.17 | HH03 → HH04 | "$\Sigma^{-1}=U\operatorname{diag}(1/\lambda_j)U^\top$"; "(a) thế $z=U^\top(x-\mu)$"; "(b) phép đổi tọa độ là phép dời hình"; "(c) $u_j^\top\Sigma u_j=\lambda_j$" | $\Sigma\succ0$, $U$ trực giao; tách hai trang nếu tràn | L1285–1318 |

Q-C cho phép Định lý 11.14 dùng 3 hoặc 4 trang; planning chọn 4 vì GN07 và GN08 mỗi trang đã có hai đến ba khối công thức. Cắt dự phòng: gộp GN07 với GN08 nếu số đo thật cho phép (không quá sáu dòng, ba công thức).

## Ví dụ xuyên suốt và câu hỏi của mỗi lần dùng lại

**Dữ liệu cảm biến nền** (bốn vector, $a$, $b$; L14–31, L132).

| Trang | Câu hỏi mới | Dữ kiện nêu lại trên trang |
|---|---|---|
| MD03 | Sản phẩm nào lệch hơn; Euclid xếp $a$ xa hơn | Bốn vector, $a$, $b$, $\bar x$ |
| GN01 | Phương sai hợp lý cực đại của từng tọa độ đều bằng $5/2$: có phân biệt được hướng $(1,1)^\top$ và $(1,-1)^\top$ không | Hai tọa độ, các sai lệch |
| GN04 | Tính $S_4$ và kiểm tra $S_4\succ0$ | Bốn vector |
| GN10 | Nghiệm hợp lý cực đại duy nhất và $\hat\Sigma^{-1}$ (độ cao tại tâm trong ghi chú diễn giả) | $\bar x$, $S_4$ |
| HH01 | Vị trí của $a$, $b$ so với các elip đồng mức (hình) | $a-\hat\mu=(3,3)^\top$, $b-\hat\mu=(2,-2)^\top$ |
| HH05 | Tọa độ riêng của $a$, $b$; bán trục $2$ và $1$ | $\hat\Sigma$, $u_\pm$, $\lambda_\pm$ |
| HH06 | Hai khoảng cách và tỉ số mật độ: sản phẩm nào lệch hơn | $z$ của $a$, $b$; $\lambda_\pm$ |
| HH09 | Với ngưỡng $6$, gắn cờ sản phẩm nào | $d^2$ của $a$, $b$ |

**Dây chuyền kiểm tra một chiều** (sáu cờ, mười cờ, ba chế độ tải, năm độ lệch nhiệt độ; L133).

| Trang | Câu hỏi mới | Dữ kiện nêu lại trên trang |
|---|---|---|
| HL02 | Xác suất của cùng chuỗi sáu cờ dưới hai cơ chế lấy mẫu | $D=(1,0,1,1,0,0)$ |
| HL04 | Giá trị $p=1/2$ hay $p=0{,}3$ phù hợp hơn với sáu cờ | $p^3(1-p)^3$ |
| TS01 | Tỉ lệ $7/10$ có phải nghiệm hợp lý cực đại; mẫu toàn $0$ hoặc toàn $1$ cho gì | Mười cờ, $s=7$ |
| TS06 | Tính $\hat p$, so với $p=1/2$, dự đoán sản phẩm tiếp theo | Mười cờ |
| TS10 | Ba xác suất chế độ phải thỏa tổng bằng $1$ | $(2,3,5)$ |
| TS15 | Tính $\hat{\boldsymbol\pi}$ và kiểm điều kiện dừng | $(2,3,5)$ |
| G101 | Vị trí và mức dao động của độ lệch nhiệt độ | $(0,1,2,3,4)$ |
| G106 | Tính $\hat\mu$, $\hat\sigma^2$ và so với $\mathcal N(2,1)$ | $(0,1,2,3,4)$ |
| G112 | Hai mẫu số cho hai số khác nhau từ cùng $Q$ | $n=5$, $\bar x=2$, $Q=10$ |

## Hình SVG (thư mục `2627-1/img/lec-11/`)

| Tệp | Trang | Nội dung | Ghi chú |
|---|---|---|---|
| `gaussian-geometry-deck.svg` (mới, bắt buộc, Q-I; đã vẽ, viewBox 480×480, nhãn 22–24 đơn vị có viền trắng, không nhãn vạch trục; rà soát #12) | HH01 | Mặt phẳng độ lệch quanh tâm $(10,20)$; bốn điểm nền tại $(2,2)$, $(-2,-2)$, $(1,-1)$, $(-1,1)$; ba elip đồng tâm $d_{\hat\Sigma}=1,2,3$ (elip $1$ có bán trục $2$ và $1$), trục dài theo $(1,1)$, trục ngắn theo $(1,-1)$, ghi nhãn $u_+$, $u_-$; điểm $a$ tại $(3,3)$ (hình tam giác), $b$ tại $(2,-2)$ (hình vuông), điểm nền hình tròn | Không tiêu đề, không bảng số (số ở HH06); viewBox khoảng 480×480, chữ 18–21 đơn vị; nhãn tiếng Việt; phân biệt bằng nét và hình điểm, không chỉ bằng màu; `role="img"`, `<title>`, `<desc>`, `alt` cụ thể |
| `gaussian-geometry.svg` (giữ nguyên) | — | Hình 11.1 của ghi chú (L1370) | Không sửa, không dùng trên deck vì chữ 12–16 đơn vị trên viewBox 840×590 |
| `bernoulli-loglik.svg` (tùy chọn, không làm ở giai đoạn B) | TS06 | Đồ thị $\ell(p)=7\log p+3\log(1-p)$ trên $(0,1)$, đánh dấu $p=0{,}5$ và $p=0{,}7$ | Số liệu suy trực tiếp từ (5.1); bỏ đầu tiên khi quá tải |

Không có ảnh raster.

## Nội dung chỉ trong ghi chú diễn giả hoặc lược (Q-D)

- Câu hỏi ôn nhanh (L57–67): lược; ý 3 (trị riêng của $S_4$) dẫn trong ghi chú diễn giả GN04.
- Bảng phân loại đại lượng (L80–87), phân phối mẫu (L162), độc lập qua hàm đo được (L164): ghi chú diễn giả HL03.
- Hàm hợp lý khác hậu nghiệm (L244–250), MLE trùng MAP với tiên nghiệm đều: ghi chú diễn giả HL05, viết theo nghĩa khẳng định.
- NLL âm với mật độ (L283), điều Mệnh đề 11.3 không nói về quan sát mới (L285): ghi chú diễn giả HL06.
- Hệ số $\binom ns$ (L308): ghi chú diễn giả TS01. Nhận xét 11.5, đoạn thứ hai (zero-count, L399): ghi chú diễn giả TS05.
- §5.2 Beta (L402–419): một câu trong ghi chú diễn giả TS05 (Murphy §4.6.2).
- $K=2$ quy về Bernoulli (L456, L521), phân loại khác $K$ Bernoulli (L458): ghi chú diễn giả TS11, TS12.
- Entropy chéo nhiều lớp (L523–532): lên mặt trang TS15 (cổng #7). Nhận xét 11.8 (L557–561): ghi chú diễn giả TS15; add-one là ước lượng hậu nghiệm cực đại (MAP) với tiên nghiệm Dirichlet$(2,2,2)$, tức Beta$(2,2)$ khi hai nhóm (Murphy §4.5.1 (4.96), §4.6.3.4; rà soát #1).
- §6.2 KL (L563–599): một câu trong ghi chú diễn giả TS14.
- So sánh Định lý 11.9 với 11.4 (L706); bỏ $\frac n2\log v$ thì không có cực tiểu (L708): ghi chú diễn giả G105, G107. Phép tính từng khúc $\psi(\mu)$ của Ví dụ 11.6 (ghi chú viết $h$): ghi chú diễn giả G107.
- Ví dụ $X_1$ không chệch (L794); NumPy và pandas (L870): ghi chú diễn giả G109, G112.
- $\mathbb EX=\mu$, $\operatorname{Cov}(X)=\Sigma$ được thừa nhận (L929): ghi chú diễn giả GN02.
- Mật độ đã khớp tại tâm $\hat f(\hat\mu)=1/(4\pi)$ và ô vuông cạnh $\delta$ (Ví dụ 11.9): ghi chú diễn giả GN10 (rà soát #9).
- Phụ lục A đầy đủ: ghi chú diễn giả GN07.
- Hiệp phương sai chéo và cầu (L1128), ước lượng co (L1130, L1435): ghi chú diễn giả GN09, GN11.
- $S_{n-1}=\tfrac43S_4$ và hạng không đổi (L1235): ghi chú diễn giả GN12.
- Hướng phân tán chính $(1,\varphi)^\top$ của Ví dụ 11.10 (L1188–1190): ghi chú diễn giả GN14.
- Làm trắng dữ liệu (L1241): ghi chú diễn giả HH01. Trị riêng lặp (L1320): ghi chú diễn giả HH04.
- Nhận xét 11.18: mục 1 lược (trùng Ví dụ 10.10, deck 10 KV10); mục 2 ở ghi chú diễn giả HH09; mục 3 (bất biến khi đổi đơn vị) ở ghi chú diễn giả HH02.
- Danh sách ứng dụng (L1438–1445): ghi chú diễn giả TK01b, dạng danh sách. Bốn giả thiết hay bị quên (L1458–1463): câu hỏi tự kiểm tra trên mặt trang TK04, đáp án trong ghi chú diễn giả TK04.
- Thống kê đủ (L308): ghi chú diễn giả TS01 (cổng #19). "Diễn giải:" của TK03: ghi chú diễn giả (cổng #20).
- Không có trên mặt trang: tiên nghiệm, hậu nghiệm Beta, KL, entropy, ước lượng co, hồi quy, hồi quy logistic, khoảng tin cậy; cầu nối Bài 12 nói bằng lời ở TK05.

## Phụ lục: kế hoạch ghi chú bài giảng

Nội dung dưới đây là `outline.md` của kế hoạch ghi chú, giữ nguyên văn; chỉ hạ cấp tiêu đề hai bậc. Tệp `review-log.md` được nhắc trong phụ lục nay là `review-log-lecture-note.md`.

### Dàn ý Bài 11 — Học từ dữ liệu qua ước lượng thống kê

Phạm vi người dùng: chỉ ghi chú Markdown, không tạo hoặc sửa slide. Người dùng đã cho phép dùng toàn bộ Codex thay quy định Claude trong AGENTS.md.

#### Đích học tập và thời lượng

Từ dữ liệu độc lập và một họ mô hình xác suất, lập likelihood, tối ưu tham số, kiểm điều kiện tồn tại của nghiệm, rồi diễn giải hình học của mô hình Gaussian đã khớp. Mục tiêu cụ thể hóa CLO2 của đề cương; không tự tạo mã LLO.

| Mục nội dung | Thời lượng | Kết quả cần đạt |
|---|---:|---|
| 11.1 Mô hình thống kê, mẫu, ước lượng và likelihood | 15 phút | Phân biệt mô hình dữ liệu, likelihood và hậu nghiệm; chỉ rõ vai trò giả thiết độc lập |
| 11.2 Ước lượng Bernoulli | 25 phút | Đạo hàm, tính cực đại và nghiệm biên; nguồn gốc mất mát logarit |
| 11.3 Ước lượng phân loại | 20 phút | Lagrange trên simplex; số đếm bằng không |
| 11.4 Gaussian một chiều | 25 phút | Cực đại toàn cục, phương sai MLE và không chệch; mẫu hằng |
| 11.5 Gaussian nhiều chiều và hình học | 35 phút | Mean/covariance MLE, điều kiện hạng, phổ và Mahalanobis |

Bài trên lớp: ba bài, tổng 30 phút. Tự học: E11.1–E11.4 lần lượt 45,40,45,50 phút; đọc và kiểm ví dụ khoảng 120 phút. Bài củng cố và lời giải được đặt trong cùng tài liệu. Homework được giữ trong note theo yêu cầu chỉ biên soạn lecture-note.md.

#### Nguồn và vai trò

- Kế hoạch người dùng: attachment d2f4744e-48a6-435e-b0a8-8532bcb2890c/pasted-text-1.txt, phần A,C,G.
- Đề cương chính thức sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx: CLO2 và tiên quyết.
- Murphy (2022), Probabilistic Machine Learning: An Introduction: §§4.1,4.2.1–4.2.6,4.3; §§3.2.1–3.2.2; mở rộng §§4.6,6.2. Mục lục nhà xuất bản được kiểm trực tiếp; không tuyên bố đọc toàn văn khi PDF tải thất bại.
- sources/part2/lecture_notes.pdf §6.1–6.5, trang in10–14: nội dung khởi đầu và các ví dụ 7/10, counts(2,3,5), dữ liệu0–4 và covariance[[1,1],[1,2]].
- sources/part2/homework.pdf W2.1–W2.4, trang1: bài tự học điều chỉnh, không gán số bài Murphy.
- materials/lec-10/lecture-note.md: xác suất và Gaussian đã biết; phần mới là ước lượng và hình học.

#### Giới hạn

Không dạy lại đối ngẫu Lagrange, Bayes hoặc phép lấy biên. Chỉ suy ra mất mát từ likelihood và nêu cầu nối; hồi quy có điều kiện, rủi ro tổng thể, PAC/VC thuộc Bài12. KL và Bayes là phần mở rộng, không chiếm thời gian cốt lõi. Hình cảm biến tự tạo bằng SVG; không tải tài sản MIT OCW mới.

#### Cấu trúc sau rà soát theo mẫu statistical-learning-theory (2026-11-04)

Ghi chú được tái cấu trúc theo Q1 của `planning/notes-10-14-slt-template.md`; bài tập chuyển sang `materials/lec-11/exercises.md`. Thời lượng ở trên chỉ là kế hoạch giảng, không xuất hiện trong văn bản sinh viên đọc. Các mục của ghi chú hiện tại:

- Câu hỏi mở đầu
- Mục tiêu học tập
- Kiến thức tiên quyết
- 1. Thiết lập bài toán
- 2. Ký hiệu và giả thiết
- 3. Ví dụ xuyên suốt
- 4. Mô hình thống kê, mẫu và hàm hợp lý
- 5. Hợp lý cực đại cho mô hình Bernoulli
- 6. Ước lượng phân loại và tối ưu có ràng buộc
- 7. Gaussian một chiều: trung bình và phương sai
- 8. Gaussian nhiều chiều: ước lượng và hình học
- 9. Ý nghĩa, tác động và giới hạn
- 10. Bài tập
- 11. Câu hỏi cuối buổi và cầu nối
- 12. Tài liệu đọc
- Phụ lục

Tệp bài tập:

- Bài tập 11.1 (Nghiệm trong và nghiệm biên của mô hình Bernoulli)
- Bài tập 11.2 (Nhân tử Lagrange trên một mặt của đơn hình)
- Bài tập 11.3 (Hình học Gaussian theo hướng riêng)
- Bài tập 11.4 (Hợp lý Bernoulli, nghiệm biên và cơ chế lấy mẫu)
- Bài tập 11.5 (Ước lượng phân loại và entropy chéo)
- Bài tập 11.6 (Phương sai hợp lý cực đại và phương sai không chệch)
- Bài tập 11.7 (Ma trận hiệp phương sai, đường đồng mức và dữ liệu suy biến)
- Bài tập 11.8 (Mất mát từ mô hình nhiễu có phương sai khác nhau)

Ánh xạ số hiệu cũ → mới: xem `review-log.md`, mục "Ánh xạ số hiệu cũ → mới".
