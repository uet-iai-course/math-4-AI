# Storyboard bộ trang chiếu Bài 14

Ngày 2026-11-16. Dựng từ `materials/lec-14/lecture-note.md` (gọi tắt "ghi chú", số dòng theo bản hiện tại, 1558 dòng) và `materials/lec-14/exercises.md` theo NT1–NT28 (`tools/courses/math-4-AI/2627-1/deck-build/common-brief.md`). Bản đồ mạch cũ của ghi chú chuyển nguyên văn xuống mục "Phụ lục: bản đồ mạch của ghi chú". Mọi số đếm âm tiết trong tệp do script `count.py` (thư mục nháp của vai) tính trên các dòng `>` của mục 6, theo quy ước NT17 (bỏ tiêu đề, KaTeX, số trong ô bảng, nhãn hình).

## 1. Tệp deck và tiêu đề

- Tệp: `2627-1/lecture-14-hoc-bieu-dien-mo-hinh-sinh.html`, `<html lang="vi" data-lecture="14">`.
- Tiêu đề deck (`h1`, `<title>`): **Học biểu diễn và mô hình sinh dưới góc nhìn xác suất** (tên bài của ghi chú, dòng 1).
- Phụ đề `h3`: "Phân tích thành phần chính, bộ tự mã hóa và cận dưới bằng chứng · Bài 14".
- Chân trang: `Cơ sở toán học cho AI · Học kỳ 1, 2026–2027 · Bài 14`.
- Mã trang `L14-k-mm`; trang tiêu đề mạch `L14-k-00`, `id="mach-k"`; bìa `L14-1-01`.

## 2. Khung lý thuyết chung

**Câu hỏi trung tâm** (đúng câu in đậm của ghi chú, dòng 3; dùng cho hộp "Vấn đề trung tâm"): *Làm thế nào học một không gian biểu diễn có chiều thấp và sử dụng nó để mô hình hóa hoặc sinh dữ liệu mới?*

**Luận điểm bìa** (một câu, có điều kiện): "Một biểu diễn ít chiều sinh được dữ liệu mới khi có thêm phân phối của mã và nhiễu quan sát; khi tích phân biên không tính được, mô hình được học bằng một cận dưới của log-hợp lý." Cơ sở: ghi chú dòng 28 (cần phân phối của mã, phân phối độ phân tán quanh $g(z)$, cách học), dòng 650 và 801 (ELBO thay tích phân khó), dòng 1480.

**Đối tượng và ký hiệu chung** (ghi chú §2, dòng 77–101):

- Quan sát $x_1,\ldots,x_n\in\mathbb R^d$, $\bar x$, $y_i=x_i-\bar x$; hiệp phương sai thực nghiệm $S$ (mẫu số $n$), trị riêng $\lambda_1\ge\cdots\ge\lambda_d\ge0$, vector riêng $v_j$, $V_k$.
- Mã $Z\in\mathbb R^k$, $k<d$; bộ mã hóa $f_\phi$ hoặc $q_\phi(z\mid x)$; bộ giải mã $g_\theta$ hoặc $p_\theta(x\mid z)$; tiên nghiệm $p(z)$; mật độ biên $p_\theta(x)$; hậu nghiệm $p_\theta(z\mid x)$.
- $\mathrm{KL}(q\,\|\,p)$, ELBO $\mathcal L(\theta,\phi;x)$, nhiễu $\varepsilon\sim\mathcal N(0,I_k)$, $\odot$, $m$ mẫu nhiễu; $\tau^2$ phương sai nhiễu quan sát; $\mathcal N(a,\beta)$ có tham số thứ hai là phương sai; $\log$ tự nhiên.

**Giả thiết** (ghi chú dòng 103–116), giữ đúng nhãn của ghi chú:

- Giả thiết xác suất: **Mật độ mô hình** ($p(z)$, $p_\theta(x\mid z)$ chuẩn hóa, $\tau>0$); **Mật độ biên** ($0<p_\theta(x)<\infty$); **Hậu nghiệm xấp xỉ** ($q_\phi$ chuẩn hóa, kỳ vọng trong cận dưới hữu hạn).
- Giả thiết đại số và tối ưu: **Dữ liệu và phép chiếu** (tâm hóa, $U^\top U=I_k$); **Ánh xạ tuyến tính**; **Độ lệch chuẩn** ($\sigma_{\phi,j}(x)>0$); **Tính chính quy** (khả vi, hàm chặn khả tích).

**Chuỗi định nghĩa → kết quả → phương pháp** (theo thứ tự mục của ghi chú):

1. Định nghĩa 14.1, 14.2 → Mệnh đề 14.3 (hướng chính = vector riêng của $\lambda_1$) → Mệnh đề 14.4 (phương sai giữ lại + lỗi = $\operatorname{tr}S$) → Định lý 14.6 (hạng $k$) → phương pháp: PCA.
2. Định nghĩa 14.7 → Mệnh đề 14.8 (bộ tự mã hóa tuyến tính tái tạo như PCA, mã xác định tới $R$) → Ví dụ 14.4 (tái tạo không xác định phân phối) → giới hạn: không sinh được.
3. Định nghĩa 14.10, 14.11 → Ví dụ 14.5 (biên và hậu nghiệm tính được khi bậc hai) → giới hạn: tích phân (6.1) không có dạng đóng khi $g_\theta$ phi tuyến.
4. Định nghĩa 14.12 → Bổ đề 14.13 → Định nghĩa 14.14 → Định lý 14.15 (phân rã (7.3)) → Định nghĩa 14.16 → Bổ đề 14.17, Mệnh đề 14.18, (7.6) → phương pháp: suy luận biến phân.
5. Định nghĩa 14.19 → Mệnh đề 14.20 → Thuật toán 14.21 → Nhận xét 14.22 (giới hạn của mục tiêu) → phương pháp: VAE.

**Giới hạn áp dụng** (giữ trên mặt trang ở trang tương ứng): PCA và (4.4) đo lỗi trên chính mẫu, cần tâm hóa, phụ thuộc thang đo, không dùng nhãn (dòng 325–331); Mệnh đề 14.8 nói về cực tiểu toàn cục (dòng 444); $\tau>0$ để có mật độ (dòng 523); khe hở (7.3) phụ thuộc $\theta$ (dòng 810); Mệnh đề 14.20 không áp dụng cho mã rời rạc, ReLU (dòng 1236); Thuật toán 14.21 không bảo đảm cực đại toàn cục (dòng 1273); lỗi nhỏ hay KL nhỏ không chứng minh mô hình sinh tốt (Nhận xét 14.22).

## 3. Bảng mạch

Thời lượng tổng 120 phút. Âm tiết của dòng dẫn do script đếm (mục 6).

| Số | Tên mạch | Mục ghi chú | Câu hỏi của mạch (và phân rã) | Chức năng | Đầu vào | Đầu ra | Dòng dẫn `strand-lead` (âm tiết) | Từ khóa | Phút | ID tiêu đề |
|---|---|---|---|---|---|---|---|---|---:|---|
| 1 | Mở đầu | đầu bài (dòng 3–10), Câu hỏi mở đầu, Mục tiêu, Kiến thức tiên quyết, §1–§3 | Câu hỏi trung tâm của bài | Nêu bài toán, tiên quyết, mục tiêu, nội dung | Bài 10–12, Bài 05–06 | Câu hỏi trung tâm; ví dụ bốn quan sát | (bìa, không có dòng dẫn) | — | 6 | L14-1-01 |
| 2 | Phân tích thành phần chính | §4 (4.1–4.3) | Đường thẳng (không gian con) nào giữ nhiều thông tin nhất? Phân rã: tổng bình phương = phần giữ lại + lỗi tái tạo | Giải bài toán nén tuyến tính | Ví dụ 14.1, định lý phổ | $V_k$, lỗi $\sum_{j>k}\lambda_j$, giới hạn tuyến tính | "Hướng giữ nhiều phương sai nhất cũng là hướng nén có lỗi bình phương nhỏ nhất." (16) | Hiệp phương sai thực nghiệm · Hướng chính · Lỗi tái tạo · Phương sai được giải thích | 22 | L14-2-00 |
| 3 | Bộ tự mã hóa tất định | §5 | Học hai ánh xạ mã hóa, giải mã thì xác định được gì? Phân rã: tái tạo $g\circ f$ / tọa độ mã / phân phối của mã | Mở rộng nén ra ánh xạ tổng quát, chỉ ra giới hạn sinh | PCA hạng $k$, lỗi $\sum_{j>k}\lambda_j$ | Tái tạo như PCA; mã xác định tới $R$; thiếu phân phối | "Hai ánh xạ học từ dữ liệu xác định phép tái tạo nhưng không xác định phân phối của mã." (20) | Bộ mã hóa · Bộ giải mã · Đổi tọa độ mã · Phân phối của mã | 14 | L14-3-00 |
| 4 | Mô hình sinh có biến ẩn | §6 (gồm 6.1, Bài tập 14.1) | Cần thêm gì để sinh dữ liệu, và mô hình đó đặt ra những phép tính nào? Phân rã: tiên nghiệm + nhiễu → sinh mẫu / hợp lý / hậu nghiệm | Xây dựng mô hình sinh, tách ba phép tính | Thiếu phân phối của mã | (6.1), (6.3); ví dụ tính được bằng hoàn bình phương | "Mô hình sinh lấy mã ngẫu nhiên rồi thêm nhiễu quanh đầu ra của bộ giải mã." (17) | Tiên nghiệm · Phân phối quan sát có điều kiện · Mật độ biên · Hậu nghiệm | 14 | L14-4-00 |
| 5 | Cận dưới bằng chứng | §7 (7.1–7.3) | Đại lượng nào chỉ gồm kỳ vọng theo một phân phối tự chọn, và lệch khỏi $\log p_\theta(x)$ bao nhiêu? | Thay tích phân khó bằng cận dưới, đo khe hở | (6.1) không tính được; Mệnh đề 11.3 | (7.2), (7.3), (7.5), (7.6) | "Log-hợp lý của mô hình biến ẩn có một cận dưới tính được, và khe hở của cận được xác định chính xác." (23) | Phân kỳ Kullback–Leibler · Hậu nghiệm xấp xỉ · Cận dưới bằng chứng · Suy luận biến phân | 26 | L14-5-00 |
| 6 | Bộ tự mã hóa biến phân | §8 (8.1–8.2), §9 (Tình huống 14.2 vào ghi chú diễn giả) | Tối ưu cận dưới trên $n$ quan sát bằng gradient thế nào, và giá trị của mục tiêu cho phép kết luận gì? | Biến ELBO thành thuật toán, nêu giới hạn đánh giá | (7.2), (7.5), (7.6) | Thuật toán 14.21; Nhận xét 14.22 | "Cận dưới trở thành mục tiêu huấn luyện bằng gradient khi mã được viết như hàm của nhiễu chuẩn." (19) | Suy luận dùng chung tham số · Tái tham số hóa · Gradient không chệch · Suy sụp hậu nghiệm | 26 | L14-6-00 |
| 7 | Tổng kết | §9 (tóm tắt, Tình huống 14.1), §10, §11, §12; `exercises.md` | Câu hỏi trung tâm của cả bài | Tổng hợp, kiểm tra, giao bài, tài liệu | Mọi mạch | — | "Phân tích thành phần chính, bộ tự mã hóa và bộ tự mã hóa biến phân tối ưu ba đại lượng khác nhau." (23) | Lỗi chiếu · Lỗi tái tạo · Cận dưới bằng chứng | 12 | L14-7-00 |

Năm dòng dẫn có năm khuôn câu khác nhau (chủ ngữ: "Hướng", "Hai ánh xạ", "Mô hình sinh", "Log-hợp lý", "Cận dưới"); dòng dẫn mạch 7 nêu kết luận của cả bài. Không dòng nào dùng "Nhu cầu:", "Muốn …", "Người học …". Dòng dẫn mạch 5 tránh tên "phân kỳ" (khái niệm mới của mạch, để ở dòng từ khóa).

## 4. Bảng kết quả chính

| Kết quả (ghi chú) | (a) Trực quan dự kiến | (b) Ý tưởng chứng minh: bước, mẹo then chốt, giả thiết vào ở bước nào, bỏ giả thiết thì hỏng ở đâu | (c) Kỹ thuật | (d) Ví dụ bổ trợ | (e) Ứng dụng trong AI | Trang |
|---|---|---|---|---|---|---|
| Mệnh đề 14.3 (Hướng chính thứ nhất), dòng 188–228 | Hình chiếu giữ phần song song; hướng đám điểm trải rộng giữ nhiều độ dài bình phương | 4 bước: $\lambda_j=\frac1n\sum_i(v_j^\top y_i)^2\ge0$; khai triển $u=\sum a_jv_j$ với $\sum a_j^2=1$ (giả thiết $\|u\|_2=1$); $\lambda_1-u^\top Su=\sum(\lambda_1-\lambda_j)a_j^2\ge0$; dấu bằng ⇔ $a_j=0$ khi $\lambda_j<\lambda_1$. Bỏ $\|u\|_2=1$: $u^\top Su$ nhân $c^2$, không có cực đại (dòng 166). Điều kiện dừng Lagrange chỉ cho vector riêng (dòng 230) | Định lý phổ (Nhắc lại, deck 11 HH03); một dòng "Kỹ thuật.": $u^\top Su$ là trung bình có trọng số $a_j^2$ của các trị riêng | Ví dụ 14.2 (bốn quan sát) | Ánh xạ đặc trưng không nhãn $x\mapsto u^\top(x-\bar x)$, nghiệm toàn cục không cần huấn luyện (dòng 232) | L14-2-03, L14-2-04 |
| Mệnh đề 14.4 (Phương sai giữ lại và lỗi tái tạo), dòng 269–323 | $\|y\|^2$ = phần giữ lại + phần bị bỏ; tổng cố định nên giữ nhiều thì bỏ ít | 4 bước: $P=UU^\top$ đối xứng, lũy đẳng (giả thiết $U^\top U=I_k$); Pythagore; lấy trung bình bằng vết; $\operatorname{tr}S$ không phụ thuộc $U$. Bỏ tâm hóa: (4.4) sai (dòng 325) | Pythagore (Nhắc lại, deck 05); tính tuyến tính của vết | Ví dụ 14.2, kiểm tra trục đứng: $2+\frac12=\frac12+2=\frac52$ | Chọn $k$ theo tỉ lệ phương sai được giải thích (dòng 327) | L14-2-05 → L14-2-07 |
| Định lý 14.6 (PCA hạng $k$), dòng 337–346, Phụ lục A | $k$ hướng riêng đầu giữ $k$ trị riêng lớn nhất; quay trong không gian con giữ nguyên phép chiếu (L14-2-09) | Chỉ ở ghi chú diễn giả (quyết định ở mục 12): trọng số $b_j=\|U^\top v_j\|^2\in[0,1]$, $\sum b_j=k$; chặn $\sum\lambda_jb_j\le\sum_{j\le k}\lambda_j$; dấu bằng và khe $\lambda_k>\lambda_{k+1}$ cho duy nhất | Cùng mẹo trung bình có trọng số | Tỉ lệ $4/5$ của bốn quan sát | Nén $k$ chiều | L14-2-09 |
| Mệnh đề 14.8 (Bộ tự mã hóa tuyến tính và PCA), dòng 377–446 | Mọi tái tạo $BAy$ nằm trong ảnh của $B$, chiều $\le k$; điểm tốt nhất trong đó là hình chiếu (L14-3-02) | 5 bước: $BAy_i\in W=\operatorname{im}B$; điểm gần nhất là $P_Wy$; bổ sung thành $U$ và dùng Định lý 14.6; đạt chặn tại $(V_k^\top,V_k)$, $(BR^{-1})(RA)=BA$; giả thiết bổ sung ($k<d$, $\lambda_k>\lambda_{k+1}$, $y_i$ sinh $\mathbb R^d$) biến ba bất đẳng thức thành đẳng thức. Bỏ "$y_i$ sinh $\mathbb R^d$": $BA=V_kV_k^\top$ chỉ trên không gian con của dữ liệu (dòng 442). Điểm dừng $A=B=0$ không tối ưu (dòng 444) | Một dòng "Kỹ thuật.": chặn dưới mọi tái tạo trong không gian con bằng hình chiếu trực giao | Ví dụ 14.3 ($R=(2)$) | Lỗi PCA $\sum_{j>k}\lambda_j$ là mốc cho mọi bộ tự mã hóa tuyến tính (dòng 444) | L14-3-02, L14-3-03 |
| Định nghĩa 14.10, 14.11 (mô hình sinh có biến ẩn; ba phép tính), dòng 492–542 | Cơ chế sinh hai bước: trạng thái ẩn, rồi quan sát có điều kiện | Không phải kết quả: chuẩn hóa bằng đổi thứ tự tích phân (dòng 521); $\tau=0$ mất mật độ (dòng 523) | Hoàn bình phương (trang "Kỹ thuật." mới, L14-4-04) | Ví dụ 14.5 | Cơ chế sinh $z\sim p(z)$, $x\sim p_\theta(x\mid z)$ | L14-4-02 → L14-4-05 |
| Bổ đề 14.13 (Tính không âm của KL), dòng 678–719 | $\log t\le t-1$ biến từng điểm của tích phân thành số hạng không âm (L14-5-02) | 4 bước: trường hợp vô hạn; $q\log\frac qp=q\psi(t)+q-p\ge-p$ (tích phân xác định); tích phân: $\int q\psi+(1-\int_{\mathcal S_q}p)\ge0$ (giả thiết chuẩn hóa); dấu bằng từ hàm không âm có tích phân $0$ | $\log t\le t-1$ (Nhắc lại, deck 11 TS14) | Bất đối xứng: $0{,}0966$ và $0{,}1534$ (dòng 873, ghi chú diễn giả) | Phạt độ lệch của phân phối mã hóa khỏi phân phối tham chiếu (dòng 721) | L14-5-02, L14-5-03 |
| Định lý 14.15 (Phân rã log-hợp lý qua ELBO), dòng 747–802 | Cận dưới + khe hở = log-hợp lý; khe hở là KL tới hậu nghiệm | 4 bước: thay Bayes (6.3) vào tỉ số (giả thiết miền hỗ trợ); lấy kỳ vọng theo $q_\phi$ (giả thiết tính hữu hạn); Bổ đề 14.13 cho cận, dấu bằng; $\log p_\theta(x)$ không phụ thuộc $\phi$. Cách khác: Jensen cho cận, không cho khe hở (dòng 814). Bỏ $\theta$ cố định: tăng $\mathcal L$ không bảo đảm tăng $\log p_\theta(x)$ (dòng 810) | Thay công thức Bayes vào tỉ số; Jensen (Nhắc lại) | Ví dụ 14.7 (khe hở $\log2-\frac38$) | Mục tiêu huấn luyện mô hình có biến ẩn (dòng 812) | L14-5-05 → L14-5-07 |
| Bổ đề 14.17, Mệnh đề 14.18 (KL Gaussian), dòng 820–911 | Hai log-mật độ Gaussian bậc hai theo $z$, nên KL chỉ cần hai mômen của $q$ (L14-5-08) | Một dòng "Chứng minh." mỗi kết quả (quyết định ở mục 12): $\mathbb E_q[(Z-c)^2]=\beta+(a-c)^2$; mật độ chéo là tích, áp dụng (7.4) với $c=0,\gamma=1$ từng tọa độ | Hai mômen của Gaussian (Mệnh đề 10.24, Nhắc lại) | Ví dụ 14.7, Bài tập 14.2 | Số hạng KL của ELBO có công thức đóng, không có nhiễu Monte Carlo (dòng 913) | L14-5-08 |
| Mệnh đề 14.20 (Tái tham số hóa Gaussian và gradient), dòng 1161–1234, Phụ lục B | Chuyển nguồn ngẫu nhiên sang nhiễu không chứa tham số; mẫu mã thành hàm khả vi của tham số (L14-6-02) | 5 bước: một tọa độ qua hàm phân phối ($\sigma>0$); độc lập → mật độ tích $=q_\phi$; đổi biến (Jacobi $\prod\sigma_j>0$); đổi đạo hàm và kỳ vọng bằng định lý giá trị trung bình + hội tụ trội (giả thiết khả vi, chặn khả tích, khả tích); tuyến tính của kỳ vọng → không chệch. Bỏ giả thiết: mã rời rạc, ReLU (dòng 1236) | Tái tham số hóa (trang "Kỹ thuật." mới, L14-6-02) | Ví dụ 14.8 | Đường gradient từ bộ giải mã qua (8.2) tới $\mu_\phi,\sigma_\phi$ (dòng 1236); Thuật toán 14.21 | L14-6-02 → L14-6-06 |

**Kết quả phụ và cách xử lý:** Nhận xét 14.5 lên trang L14-2-08 (phản ví dụ phương sai lớn / nhãn). Nhận xét 14.9 vào ghi chú diễn giả L14-3-05. Định nghĩa 14.16 lên L14-5-07 cùng bảng hai vai trò của KL. Định nghĩa 14.19, Thuật toán 14.21 lên L14-6-01, L14-6-05. Nhận xét 14.22 lên L14-6-07. Đoạn nút thắt (dòng 373) vào ghi chú diễn giả L14-3-01. Đoạn chọn $k$ trên tập kiểm tra (dòng 325) vào ghi chú diễn giả L14-2-09. Đoạn PCA xác suất (dòng 586) vào ghi chú diễn giả L14-4-05. Đoạn ràng buộc $AA^\top=I_k$ (dòng 446) vào ghi chú diễn giả L14-3-02. Tình huống 14.1 vào trang "Vấn đề trung tâm" L14-7-02 (câu trả lời trên bốn quan sát); Tình huống 14.2 vào ghi chú diễn giả L14-6-09 (cùng cấu trúc với Bài tập 14.4, tránh trùng ví dụ theo NT13).

## 5. Ví dụ bổ trợ (toàn bộ phép tính)

Không có ví dụ mới về dữ liệu. Mọi ví dụ lấy từ ghi chú hoặc `exercises.md`; điều phối viên kiểm từng con số dưới đây (đã tính lại hai lần bằng tay và bằng Python). Ví dụ xuyên suốt: **bốn quan sát của cảm biến hai chiều** $(2,0)^\top,(-2,0)^\top,(0,1)^\top,(0,-1)^\top$ (Ví dụ 14.1), dùng lại ở L14-2-01, L14-2-05, L14-2-08, L14-3-04, L14-4-01, L14-4-05, L14-7-03, L14-7-05; mỗi lần trả lời một câu hỏi mới (đường chiếu tốt nhất; lỗi và tỉ lệ phương sai; đổi tọa độ mã; thất bại của cách sinh thử; mô hình sinh khớp hiệp phương sai; câu trả lời tổng kết; kiểm tra PCA xác suất).

**E1. Câu hỏi mở đầu và Ví dụ 14.1** (dòng 14–28, 122–131). Trục ngang $f(x)=x_1$, $g(z)=(z,0)^\top$: tái tạo $(2,0),(-2,0),(0,0),(0,0)$; lỗi bình phương $0,0,1,1$; trung bình $2/4=1/2$. Cách sinh thử $Z\sim\mathcal N(0,1)$, $X=(Z,0)^\top$: $\mathbb E[X_1^2]=\mathbb E[Z^2]=1$; dữ liệu $(4+4+0+0)/4=2$; $X_2\equiv0$.

**E2. Ví dụ 14.2** (dòng 234–259). $\bar x=0$. Tích ngoài: $(\pm2,0)$ cho $\operatorname{diag}(4,0)$, $(0,\pm1)$ cho $\operatorname{diag}(0,1)$. $S=\frac14(2\operatorname{diag}(4,0)+2\operatorname{diag}(0,1))=\frac14\operatorname{diag}(8,2)=\operatorname{diag}(2,\frac12)$. $\lambda_1=2$, $v_1=(1,0)^\top$; $\lambda_2=\frac12$, $v_2=(0,1)^\top$. Mã $2,-2,0,0$; lỗi $0,0,1,1$, trung bình $1/2$; $u^\top Su=2$; tỉ lệ $2/(5/2)=4/5$. Trục đứng: mã $0,0,1,-1$, lỗi $4,4,0,0$, trung bình $2$. Kiểm tra: $2+\frac12=\frac12+2=\frac52=\operatorname{tr}S$. Định lý 14.6 với $k=1$: lỗi nhỏ nhất $\lambda_2=\frac12$.

**E3. Nhận xét 14.5** (dòng 329–331). $S=\operatorname{diag}(100,1)$; PCA giữ $M$. Đổi mét sang milimét: phương sai nhân $(10^3)^2=10^6$ (dòng 327). Áp dụng cụ thể (dựng từ dòng 327 và Nhận xét 14.5, dùng trên L14-2-09): đổi $N$: $\operatorname{Var}(N)=1\cdot10^6$, $S=\operatorname{diag}(100,10^6)$, $\lambda_1=10^6$ ứng với trục của $N$, PCA giữ $N$. Kiểm tra ngược: đổi $M$: $S=\operatorname{diag}(10^8,1)$, hướng chính không đổi.

**E4. Ví dụ 14.3** (dòng 448–462). $A=(1\ 0)$, $B=(1\ 0)^\top$, $R=(2)$: $A'=(2\ 0)$, $B'=(\frac12\ 0)^\top$. Tại $(2,0)^\top$: mã $2$, tái tạo $B\cdot2=(2,0)^\top$; mã mới $4$, $B'\cdot4=(2,0)^\top$. Tại $(0,1)^\top$: mã $0$, tái tạo $(0,0)^\top$. $B'A'=\operatorname{diag}(1,0)=BA$; lỗi $1/2$. Phương sai mã: $(4+4+0+0)/4=2$; $(16+16+0+0)/4=8=R^2\cdot2$.

**E5. Ví dụ 14.4** (dòng 466–478). Hai quan sát $(\mp2,0)^\top$; lỗi $0$. Cơ chế 1: $Z=\pm2$ mỗi giá trị $\frac12$: $\mathbb E[X_1^2]=(4+4)/2=4$. Cơ chế 2: $Z\sim\mathcal N(0,1)$: $\mathbb E[X_1^2]=1$. Cả hai đặt xác suất $1$ trên trục ngang (diện tích $0$) nên không có mật độ hai chiều.

**E6. Bài tập 14.1** (dòng 593–648). $S=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}$: kiểm tra $S=\frac14\sum x_ix_i^\top=\frac14\big(2\begin{pmatrix}4&4\\4&4\end{pmatrix}+2\begin{pmatrix}1&-1\\-1&1\end{pmatrix}\big)=\frac14\begin{pmatrix}10&6\\6&10\end{pmatrix}$ ✓; $Su=4u$, trị riêng còn lại $1$ ✓. Câu 1: $(2,2)$: mã $4$, tái tạo $(2,2)$, lỗi $0$; $(1,-1)$: mã $0$, tái tạo $(0,0)$, lỗi $1+1=2$. Câu 2: $g_c(f_c(x))=\big(\frac{x_1+x_2}2,\frac{x_1+x_2}2\big)^\top=uu^\top x$; $c(x_1+x_2)=c\sqrt2\,u^\top x$, nên $c=1/\sqrt2$; với $c=1$, $R=(\sqrt2)$. Câu 3: $X_1=Z/2$: $\mathcal N(0,1)$ cho $\frac14$; $\pm4$ cho $16/4=4$; dữ liệu $(4+4+1+1)/4=\frac52$. Câu 4: $X$ trên đường $x_1=x_2$; thêm $\eta\sim\mathcal N(0,\tau^2I_2)$: $\operatorname{Cov}(X)=\frac14\begin{pmatrix}1&1\\1&1\end{pmatrix}+\tau^2I_2$, $\det=(\frac14+\tau^2)^2-\frac1{16}=\tau^4+\frac{\tau^2}2=\tau^2(\tau^2+\frac12)>0$.

**E7. Ví dụ 14.5** (dòng 544–587). $w^2=\frac32$, $\tau^2=\frac12$, $1/(2\tau^2)=1$. $-\frac{z^2}2-(x_1-wz)^2=-2z^2+2wx_1z-x_1^2=-2(z-\frac{wx_1}2)^2+\frac{w^2x_1^2}2-x_1^2=-2(z-\frac{wx_1}2)^2-\frac{x_1^2}4$ (vì $\frac{3/2}{2}-1=-\frac14$). Biên $\propto\exp(-\frac{x_1^2}4-x_2^2)$: $X\sim\mathcal N(0,\operatorname{diag}(2,\frac12))$. Hậu nghiệm $\propto\exp(-2(z-\frac{wx_1}2)^2)$, $2=1/(2\cdot\frac14)$: $\mathcal N(\frac{wx_1}2,\frac14)$; tại $x=(2,0)^\top$: trung bình $w=\sqrt{3/2}\approx1{,}2247$. Kiểm tra $\mathbb E[X_1^2]=w^2+\tau^2=2$. PCA xác suất: $w^2=\lambda_1-\lambda_2=\frac32$, $\tau^2=\lambda_2=\frac12$.

**E8. Lưới tích phân** (dòng 589). $N^k=100^{10}=10^{20}$.

**E9. Bổ đề 14.17, bất đối xứng** (dòng 873). $\mathrm{KL}(\mathcal N(0,1)\|\mathcal N(0,2))=\frac12(\log2+\frac12-1)=\frac12\log2-\frac14\approx0{,}34657-0{,}25=0{,}0966$; $\mathrm{KL}(\mathcal N(0,2)\|\mathcal N(0,1))=\frac12(\log\frac12+2-1)=\frac12(1-\log2)\approx0{,}1534$.

**E10. Ví dụ 14.6** (dòng 928–950). $\|x-g(Z)\|^2=Z^2+1$; $\mathbb E_q[Z^2]=\frac14$; kỳ vọng lỗi $\frac54$. $-\frac22\log(2\pi\cdot\frac12)=-\log\pi\approx-1{,}1447$. Kỳ vọng tái tạo $-\log\pi-\frac54\approx-2{,}3947$. Thay mã bằng $0$: $-\log\pi-1$; hiệu $\frac14=\operatorname{Var}_q(Z)\cdot\frac1{2\tau^2}$.

**E11. Ví dụ 14.7** (dòng 954–1021). KL tới tiên nghiệm $\frac12(1+\frac18-1-\log\frac18)=\frac1{16}+\frac32\log2\approx0{,}0625+1{,}0397=1{,}1022$. $\mathbb E_q[(2-Z)^2]=1+\frac18=\frac98$; kỳ vọng tái tạo $-\frac12\log(2\pi)-\frac9{16}\approx-0{,}9189-0{,}5625=-1{,}4814$. $\mathcal L=-\frac12\log(2\pi)-\frac58-\frac32\log2\approx-2{,}5837$. Hoàn bình phương $-\frac{z^2}2-\frac{(x-z)^2}2=-(z-\frac x2)^2-\frac{x^2}4$: $X\sim\mathcal N(0,2)$, $Z\mid X=x\sim\mathcal N(\frac x2,\frac12)$. $\log p_\theta(2)=-\frac12\log(4\pi)-1\approx-1{,}2655-1=-2{,}2655$. Khe hở $-2{,}2655-(-2{,}5837)=0{,}3182$; chính xác $\log2-\frac38\approx0{,}3181$ (làm tròn từng số). Kiểm tra bằng (7.4): $a=1,\beta=\frac18,c=1,\gamma=\frac12$: $\frac12[\log4+\frac14-1]=\log2-\frac38$ ✓.

**E12. Bài tập 14.2** (dòng 1025–1110). Câu 1: $\frac12(1+\frac14-1-\log\frac14)=\frac18+\log2\approx0{,}8181$. Câu 2: $\mathbb E_q[(1-Z)^2]=0+\frac14$; kỳ vọng tái tạo $-\frac12\log(2\pi)-\frac18$; số hạng mất $\operatorname{Var}_q(Z)=\frac14$ trong lỗi, tức $-\frac18$ trong log-mật độ. Câu 3: $\mathcal L=-\frac12\log(2\pi)-\frac14-\log2\approx-0{,}9189-0{,}25-0{,}6931=-1{,}8621$. Câu 4: $-(z-\frac12)^2-\frac14$; $\log p_\theta(1)=-\frac12\log(4\pi)-\frac14\approx-1{,}5155$; hậu nghiệm $\mathcal N(\frac12,\frac12)$; $\mathrm{KL}(q\|r)=\frac12[\log2+\frac{1/4+1/4}{1/2}-1]=\frac12\log2\approx0{,}3466$; $-1{,}8621+0{,}3466=-1{,}5155$ ✓. Sinh: $z\sim\mathcal N(0,1)$, $x'=z+\eta$. Câu 5: ELBO $=\log p_\theta(1)$; KL tới tiên nghiệm mới $\frac12(\frac14+\frac12-1-\log\frac12)=\frac12\log2-\frac18\approx0{,}2216$; kỳ vọng lỗi $(1-\frac12)^2+\frac12=\frac34$.

**E13. Ví dụ 14.8** (dòng 1275–1295). $z=1+2\varepsilon$: $-1,1,3$. $\partial h/\partial\mu=-z$: $1,-1,-3$, trung bình $-1$. $\partial h/\partial\sigma=-z\varepsilon$: $-1,0,-3$, trung bình $-\frac43$. Chính xác: $\mathbb E h=-\frac12\log(2\pi)-\frac12(\mu^2+\sigma^2)$: $(-\mu,-\sigma)=(-1,-2)$. Kiểm tra: trung bình nhiễu $0$, trung bình bình phương $\frac23$: $-\sigma\cdot\frac23=-\frac43$ ✓.

**E14. Bài tập 14.3** (dòng 1299–1350; chỉ ở ghi chú diễn giả và bài về nhà). $z=\frac32,2,3$; cột $\mu$: $-\frac12,-1,-2$, trung bình $-\frac76$; cột $\sigma$: $\frac12,0,-4$, trung bình $-\frac76$; chính xác $(-1,-\frac12)$; gradient ELBO $(-3,1)$.

**E15. Bài tập 14.4** (dòng 1364–1387). KL $=0$; $\log\mathcal N(\pm2;0,4)=-\frac12\log(8\pi)-\frac48$; $\frac12\log(8\pi)=\frac12(2{,}0794+1{,}1447)=1{,}6121$; giá trị $\approx-2{,}1121$. Hậu nghiệm $=p(z)$, biên $\mathcal N(0,4)$, cận chặt. $\mathbb E[X^2]=4$ hai phía. $\mathbb P(|X|<1)=2\Phi(\frac12)-1=2\cdot0{,}69146-1\approx0{,}3829$; dữ liệu: $0$.

**E16. Tình huống 14.2** (dòng 1411–1419; ghi chú diễn giả L14-6-09). $\log\mathcal N((\pm3,0);0,I_2)=-\log(2\pi)-\frac92\approx-1{,}8379-4{,}5=-6{,}3379$; $\mathbb E[X_1^2]$: dữ liệu $9$, mô hình $1$.

**E17. Bài tập 14.5** (`exercises.md` dòng 23–83). $WW^\top=V_k(\Lambda_k-\tau^2I_k)V_k^\top$ (vì $RR^\top=I_k$); $a=V_k^\top v$; $v^\top Cv=a^\top(\Lambda_k-\tau^2I_k)a+\tau^2$. Câu 1: $a=0$ cho $\tau^2$. Câu 2: $a=e_i$ cho $\lambda_i$. Kiểm tra: $\tau^2=\lambda_2=\frac12$, $W=\sqrt{3/2}\,v_1$, $C=\operatorname{diag}(\frac32,0)+\frac12I_2=\operatorname{diag}(2,\frac12)=S$.

**E18. Tình huống 14.1** (dòng 1395–1409; L14-7-03). Lấy mẫu $(\sqrt{3/2}\,z+\eta_1,\eta_2)^\top$, $\eta_j\sim\mathcal N(0,\frac12)$; tổng phương sai $2+\frac12=\frac52=\operatorname{tr}S$.

## 6. Danh sách trang

60 trang (sau khi tách L14-7-01), 120 phút (ngoại lệ NT27 so với 45–55, bằng trần 60; lý do và phương án cắt ở mục 12). Mỗi mục: loại; mặt trang dự kiến (dòng `>`, đúng chữ dự kiến, công thức bằng KaTeX; `[Hình: …]` và `[fragment]` không tính âm tiết); ghi chú diễn giả (ý chính); lý do và khoảng trống; nối trước → sau; phần câu hỏi mạch và mục tiêu học tập (MT1–MT6 theo ghi chú dòng 34–39); nguồn; quyết định và thời lượng. Mọi trang là `thêm` (deck Bài 14 chưa có). Mọi ghi chú diễn giả kết thúc bằng dòng `note-source` theo NT22 với mục ghi chú nêu ở "Nguồn" và mục Murphy mà ghi chú dẫn cho nội dung đó.

### Mạch 1. Mở đầu (6 phút, 5 trang)

#### L14-1-01 — Học biểu diễn và mô hình sinh dưới góc nhìn xác suất

- **Loại:** bìa; điểm vào mạch 1; `id="mach-1"`.
- **Mặt trang:**
  > Phân tích thành phần chính, bộ tự mã hóa và cận dưới bằng chứng · Bài 14
  > Một biểu diễn ít chiều sinh được dữ liệu mới khi có thêm phân phối của mã và nhiễu quan sát; khi tích phân biên không tính được, mô hình được học bằng một cận dưới của log-hợp lý.
  > Cơ sở toán học cho AI · Học kỳ 1, 2026–2027
  > Trường Đại học Công nghệ · Đại học Quốc gia Hà Nội
- **Ghi chú diễn giả:** Bài khép lại chuỗi Bài 10–14. Bài 13 gặp một biến ẩn khi cảm biến chỉ ghi giá trị hiện tại (Tình huống 13.2); Bài 05–06 học ánh xạ đặc trưng có nhãn. Bỏ nhãn, mã ít chiều của mỗi quan sát là đại lượng không quan sát được. Thêm phân phối của mã và nhiễu thì sinh được dữ liệu mới. Tích phân biên không tính được thì mô hình học bằng cận dưới.
- **Lý do · khoảng trống:** bìa theo NT11; luận điểm một câu có điều kiện.
- **Nối:** — → L14-1-02 (tiên quyết).
- **Câu hỏi mạch · MT:** toàn bài.
- **Nguồn:** ghi chú dòng 1, 3, 28, 650, 1480.
- **Quyết định · phút:** thêm; 0,5.

#### L14-1-02 — Tiên quyết và quy ước

- **Loại:** tiên quyết.
- **Mặt trang:**
  > **Nhắc lại:** định lý phổ (spectral theorem): ma trận đối xứng thực có cơ sở trực chuẩn gồm vector riêng.
  > - $p(x)=\int p(x,z)\,dz$; $p(z\mid x)=p(x,z)/p(x)$ khi $0<p(x)<\infty$; $\operatorname{Var}(X)=\mathbb E[X^2]-(\mathbb EX)^2$.
  > - hợp lý cực đại: cực tiểu $-\frac1n\sum_i\log p_\theta(x_i)$.
  > - nhiễu Gaussian phương sai cố định cho âm log-hợp lý tỉ lệ với tổng bình phương sai số, sai khác hằng số.
  > **Ký hiệu:** $X\in\mathbb R^d$, mã $Z\in\mathbb R^k$, $k<d$; mật độ viết $p$; $\beta$ trong $\mathcal N(a,\beta)$ là phương sai.
- **Ghi chú diễn giả:** Các dòng nhắc lại là Mệnh đề 10.32, 10.33 (lấy biên, mật độ có điều kiện), Mệnh đề 11.3, Mệnh đề 12.2 (công thức (4.3) của Bài 12), Mệnh đề 10.24 và Mệnh đề 06.12. Định lý phổ đã dùng ở Mệnh đề 11.17 để đọc trục của đường đồng mức Gaussian; ở đây nó cho nghiệm của PCA. Hai mệnh đề lấy biên và Bayes của Bài 10 áp dụng nguyên cho vector $X\in\mathbb R^d$, $Z\in\mathbb R^k$ với tích phân trên $\mathbb R^{d+k}$. Hiệp phương sai mẫu $S_n$ của Định nghĩa 11.13 (mẫu số $n$) luôn nửa xác định dương. Mạng hai tầng theo Định nghĩa 06.4.
- **Lý do · khoảng trống:** NT11 mục "Tiên quyết và quy ước" theo "Kiến thức tiên quyết" của ghi chú; NT9 nhắc lại trước khi dùng.
- **Nối:** bìa → mục tiêu.
- **Câu hỏi mạch · MT:** nền cho MT1–MT6.
- **Nguồn:** ghi chú dòng 3–10, 41–47.
- **Quyết định · phút:** thêm; 2. Số hiệu mệnh đề chỉ ở ghi chú diễn giả để giữ mật độ dưới 60.

#### L14-1-03 — Mục tiêu học tập

- **Loại:** mục tiêu (trần 80).
- **Mặt trang:**
  > 1. Chứng minh hướng chính cực đại phương sai, cực tiểu lỗi tái tạo.
  > 2. Chứng minh bộ tự mã hóa tuyến tính tái tạo như hướng chính, tọa độ mã không duy nhất.
  > 3. Xây dựng mô hình biến ẩn; phân biệt sinh mẫu, hợp lý, hậu nghiệm.
  > 4. Chứng minh phân kỳ không âm, phân rã log-hợp lý; phân biệt phân kỳ tới tiên nghiệm, tới hậu nghiệm.
  > 5. Tính cận dưới; giải thích tái tham số hóa, điều kiện đổi gradient và kỳ vọng.
  > 6. Phân biệt ba mục tiêu; chẩn đoán lỗi hoặc phân kỳ nhỏ mà mô hình sinh vẫn kém.
- **Ghi chú diễn giả:** Mục tiêu 1–2 thuộc bài toán nén, mục tiêu 3–5 thuộc bài toán sinh, mục tiêu 6 so sánh hai bài toán. Phân kỳ tới tiên nghiệm nằm trong mục tiêu học; phân kỳ tới hậu nghiệm là khe hở của cận. Điều kiện đổi gradient và kỳ vọng gồm tính khả vi và một hàm chặn khả tích.
- **Lý do · khoảng trống:** NT11, giữ đủ sáu mục tiêu, rút gọn chữ; tên tiếng Anh và viết tắt chưa xuất hiện nên chưa dùng.
- **Nối:** tiên quyết → nội dung.
- **Câu hỏi mạch · MT:** MT1–MT6.
- **Nguồn:** ghi chú dòng 30–39.
- **Quyết định · phút:** thêm; 1. Ngoại lệ mật độ: 100 âm tiết (trần 80), giữ đủ các vế của sáu mục tiêu theo cổng duyệt M3.

#### L14-1-04 — Nội dung

- **Loại:** nội dung (trần 80); liên kết `#/1`…`#/7`.
- **Mặt trang:**
  > 1. Mở đầu
  > 2. Phân tích thành phần chính
  > 3. Bộ tự mã hóa tất định
  > 4. Mô hình sinh có biến ẩn
  > 5. Cận dưới bằng chứng
  > 6. Bộ tự mã hóa biến phân
  > 7. Tổng kết
  > Đọc trước: Murphy (2022), §20.1 và §6.2.3–6.2.4.
- **Ghi chú diễn giả:** Mạch 2–3 giải bài toán nén; mạch 4–6 giải bài toán sinh. Mỗi mạch nhận một giới hạn của mạch trước: phép chiếu tuyến tính, thiếu phân phối của mã, tích phân biên không tính được, gradient theo tham số của phân phối lấy mẫu.
- **Lý do · khoảng trống:** NT11; dòng đọc trước theo "Tài liệu đọc — Trước buổi học".
- **Nối:** mục tiêu → vấn đề trung tâm.
- **Câu hỏi mạch · MT:** —.
- **Nguồn:** ghi chú dòng 1486.
- **Quyết định · phút:** thêm; 0,5.

#### L14-1-05 — Vấn đề trung tâm

- **Loại:** vấn đề trung tâm (một hộp duy nhất).
- **Mặt trang:**
  > **Câu hỏi:** Làm thế nào học một không gian biểu diễn có chiều thấp và sử dụng nó để mô hình hóa hoặc sinh dữ liệu mới?
- **Ghi chú diễn giả:** Câu trả lời theo mạch: mạch 2 tìm không gian con tuyến tính tốt nhất theo lỗi chiếu; mạch 3 học hai ánh xạ, tái tạo như PCA trong trường hợp tuyến tính nhưng không có phân phối của mã; mạch 4 thêm tiên nghiệm và nhiễu, nhận được mật độ biên và hậu nghiệm; mạch 5 thay log-hợp lý bằng cận dưới, khe hở là phân kỳ tới hậu nghiệm; mạch 6 tối ưu cận dưới bằng gradient và nêu giới hạn của mục tiêu. Bài toán gồm dữ liệu, biến ẩn, bộ mã hóa và bộ giải mã, mục tiêu nén (lỗi tái tạo) và mục tiêu sinh (log-hợp lý).
- **Lý do · khoảng trống:** NT11, một hộp, đúng câu in đậm của ghi chú; câu trả lời theo mạch chỉ ở ghi chú diễn giả.
- **Nối:** nội dung → mạch 2.
- **Câu hỏi mạch · MT:** toàn bài.
- **Nguồn:** ghi chú dòng 3, 61–73.
- **Quyết định · phút:** thêm; 2 (gồm đọc thiết lập §1 trong ghi chú diễn giả).

### Mạch 2. Phân tích thành phần chính (22 phút, 10 trang)

Câu hỏi của mạch: đường thẳng (không gian con) qua tâm dữ liệu nào giữ nhiều thông tin nhất, đo bằng gì? Phân rã: $\frac1n\sum\|y_i\|^2=$ phần giữ lại $+$ lỗi tái tạo.

#### L14-2-00 — 2. Phân tích thành phần chính

- **Loại:** tiêu đề mạch; điểm vào mạch 2; `id="mach-2"`. Ngoài hành trình khái niệm (dòng dẫn nêu kết quả, không nêu vấn đề của khái niệm đầu).
- **Mặt trang:**
  > Hướng giữ nhiều phương sai nhất cũng là hướng nén có lỗi bình phương nhỏ nhất.
  > Hiệp phương sai thực nghiệm · Hướng chính · Lỗi tái tạo · Phương sai được giải thích
- **Ghi chú diễn giả:** Mạch nhận định lý phổ và hiệp phương sai mẫu của Bài 11. Việc của mạch: so sánh mọi đường thẳng qua tâm dữ liệu bằng phương sai của mã, tìm nghiệm bằng vector riêng và chứng minh tiêu chuẩn này trùng tiêu chuẩn lỗi tái tạo. Mạch trao cho mạch 3 phép nén tốt nhất trong lớp phép chiếu và lỗi $\sum_{j>k}\lambda_j$ làm mốc so sánh.
- **Lý do · khoảng trống:** NT12.
- **Nối:** vấn đề trung tâm → L14-2-01.
- **Câu hỏi mạch · MT:** MT1.
- **Nguồn:** ghi chú §4, dòng 135–139.
- **Quyết định · phút:** thêm; 0,5.

#### L14-2-01 — Ví dụ: bốn quan sát của cảm biến hai chiều

- **Loại:** vấn đề + ví dụ dẫn nhập (ví dụ xuyên suốt).
- **Mặt trang:**
  > **Ví dụ 14.1.** Mỗi quan sát chỉ được lưu bằng một số thực. Dữ liệu, $n=4$:
  > - $(2,0)^\top$, $(-2,0)^\top$;
  > - $(0,1)^\top$, $(0,-1)^\top$.
  > Trục ngang: $f(x)=x_1$, $g(z)=(z,0)^\top$; lỗi bình phương $0,0,1,1$, trung bình $1/2$.
  > Trục đứng giữ hai điểm nằm dọc và làm mất hai điểm nằm ngang.
  > **Câu hỏi:** Đường thẳng qua gốc nào giữ nhiều thông tin nhất của bốn quan sát?
- **Ghi chú diễn giả:** Bộ mã hóa $f$ nén quan sát thành một số, bộ giải mã $g$ dựng lại quan sát từ số đó. Hai điểm nằm ngang được dựng lại đúng; hai điểm nằm dọc thành gốc tọa độ, lỗi bình phương $1$ mỗi điểm. Cần một tiêu chuẩn so sánh mọi đường thẳng qua tâm dữ liệu và một cách tìm đường tốt nhất. Ví dụ này quay lại ở mạch 3 và mạch 4 với câu hỏi sinh dữ liệu.
- **Lý do · khoảng trống:** NT8 bước vấn đề, NT14 vào thẳng dữ kiện dạng danh sách, NT23 ví dụ xuyên suốt.
- **Nối:** tiêu đề mạch → L14-2-02 (tiêu chuẩn so sánh).
- **Câu hỏi mạch · MT:** nêu câu hỏi của mạch (NT13); MT1.
- **Nguồn:** ghi chú dòng 14–19, 122–131, 137.
- **Quyết định · phút:** thêm; 2.

#### L14-2-02 — Phương sai của mã

- **Loại:** trực quan + định nghĩa.
- **Mặt trang:**
  > **Trực quan.** Hình chiếu bỏ phần vuông góc; hướng trải rộng giữ nhiều độ dài bình phương hơn.
  > **Định nghĩa 14.1.** $\bar x=\frac1n\sum_ix_i$, $y_i=x_i-\bar x$; hiệp phương sai thực nghiệm (còn gọi là hiệp phương sai mẫu) $S=\frac1n\sum_iy_iy_i^\top$.
  > Với $U^\top U=I_k$: mã $z_i=U^\top y_i$, tái tạo $\bar x+UU^\top y_i$, và $$\frac1n\sum_{i=1}^n\|z_i\|_2^2=\operatorname{tr}(U^\top SU).$$
  > **Định nghĩa 14.2.** Phân tích thành phần chính (principal component analysis, PCA) hạng $k$: cực đại $\operatorname{tr}(U^\top SU)$ trên $U^\top U=I_k$; với $k=1$:
  > $$\max_{u\in\mathbb R^d,\ \|u\|_2=1}u^\top Su.\tag{4.3}$$
- **Ghi chú diễn giả:** $S$ trùng $S_n$ của Định nghĩa 11.13, chỉ mô tả mẫu, không cần giả thiết Gaussian; mẫu số $n-1$ nhân mọi trị riêng với $n/(n-1)$, vector riêng không đổi. Mã có trung bình $0$, nên $\operatorname{tr}(U^\top SU)$ là tổng phương sai thực nghiệm của các tọa độ mã; đẳng thức dùng $\|U^\top y\|^2=\operatorname{tr}(U^\top yy^\top U)$. Ràng buộc $\|u\|_2=1$ làm các hướng so sánh được: thay $u$ bằng $cu$ nhân $u^\top Su$ với $c^2$ chỉ vì đổi đơn vị của mã. Nghiệm của (4.3) gọi là hướng chính thứ nhất.
- **Lý do · khoảng trống:** NT8 trực quan trước phát biểu; biến trực giác thành bài toán tối ưu.
- **Nối:** L14-2-01 (cần tiêu chuẩn) → L14-2-03 (nghiệm của (4.3)).
- **Câu hỏi mạch · MT:** "đo bằng gì": phương sai của mã; MT1.
- **Nguồn:** ghi chú dòng 139–186.
- **Quyết định · phút:** thêm; 2,5. Hai số hiệu trên một trang (mục 12, điểm Q2).

#### L14-2-03 — Hướng chính thứ nhất

- **Loại:** kết quả.
- **Mặt trang:**
  > **Mệnh đề 14.3.** **Giả thiết:** $S$ như Định nghĩa 14.1; định lý phổ cho $Sv_j=\lambda_jv_j$, $\lambda_1\ge\cdots\ge\lambda_d$, $v_1,\ldots,v_d$ trực chuẩn.
  > **Kết luận:** mọi $\lambda_j\ge0$; (4.3) có giá trị tối ưu $\lambda_1$; vector đơn vị $u$ là nghiệm khi và chỉ khi $Su=\lambda_1u$.
  > **Ý nghĩa:** lấy một vector riêng đơn vị của trị riêng lớn nhất; không cần huấn luyện.
  > Nếu $\lambda_1>\lambda_2$, hướng tối ưu duy nhất, sai khác dấu.
- **Ghi chú diễn giả:** Nếu trị riêng lớn nhất là bội, mọi vector đơn vị trong không gian riêng đều tối ưu. Điều kiện dừng của hàm Lagrange chỉ cho biết $u$ là vector riêng (Murphy (2022), §20.1.2); so sánh giá trị mới chọn được trị riêng lớn nhất. Trong học máy, $u$ cho ánh xạ đặc trưng $x\mapsto u^\top(x-\bar x)$ học từ mẫu không nhãn.
- **Lý do · khoảng trống:** NT5 phát biểu gọn "Giả thiết:/Kết luận:".
- **Nối:** L14-2-02 → L14-2-04 (vì sao đúng).
- **Câu hỏi mạch · MT:** đường thẳng tốt nhất theo phương sai; MT1.
- **Nguồn:** ghi chú dòng 188–192, 230–232.
- **Quyết định · phút:** thêm; 2.

#### L14-2-04 — Ý tưởng chứng minh: hướng chính thứ nhất

- **Loại:** ý tưởng chứng minh.
- **Mặt trang:**
  > 1. $\lambda_j=v_j^\top Sv_j=\frac1n\sum_i(v_j^\top y_i)^2\ge0$.
  > 2. Viết $u=\sum_ja_jv_j$, $a_j=v_j^\top u$; giả thiết $\|u\|_2=1$ cho $\sum_ja_j^2=1$, và $u^\top Su=\sum_j\lambda_ja_j^2$.
  > 3. $$\lambda_1-u^\top Su=\sum_{j=1}^d(\lambda_1-\lambda_j)a_j^2\ge0,$$ bằng $0$ tại $u=v_1$.
  > 4. Dấu bằng khi và chỉ khi $a_j=0$ với mọi $j$ có $\lambda_j<\lambda_1$.
  > **Kỹ thuật.** Trong cơ sở riêng, $u^\top Su$ là trung bình có trọng số $a_j^2$ của các trị riêng, nên không vượt $\lambda_1$.
- **Ghi chú diễn giả:** Bước 2 dùng tính trực chuẩn hai lần: $\sum a_j^2=\|u\|^2$ và $v_j^\top v_l=0$ khi $j\ne l$ làm mất các số hạng chéo. Bỏ ràng buộc chuẩn đơn vị thì $u^\top Su$ không bị chặn khi $\lambda_1>0$. Mẹo trung bình có trọng số được dùng lại ở chứng minh Định lý 14.6 với trọng số $b_j\in[0,1]$ có tổng $k$.
- **Lý do · khoảng trống:** NT6 trang riêng, 4 bước, bất đẳng thức then chốt ở một công thức hiển thị.
- **Nối:** L14-2-03 → L14-2-05 (tính trên bốn quan sát).
- **Câu hỏi mạch · MT:** MT1 (chứng minh).
- **Nguồn:** ghi chú dòng 194–228.
- **Quyết định · phút:** thêm; 3.

#### L14-2-05 — Ví dụ: phân tích thành phần chính của bốn quan sát

- **Loại:** ví dụ (ví dụ xuyên suốt); `grid2`: chữ bên trái, hình bên phải.
- **Mặt trang:**
  > **Ví dụ 14.2.** Dữ kiện: $(2,0)^\top,(-2,0)^\top,(0,1)^\top,(0,-1)^\top$; $\bar x=0$. Tính $S$, hướng chính, mã và lỗi.
  > $S=\frac14\big(2\operatorname{diag}(4,0)+2\operatorname{diag}(0,1)\big)=\operatorname{diag}(2,\tfrac12)$.
  > $\lambda_1=2$, $u=(1,0)^\top$; mã $2,-2,0,0$; lỗi từng điểm $0,0,1,1$, trung bình $1/2$.
  > Trục đứng $u=(0,1)^\top$: lỗi $4,4,0,0$, trung bình $2$.
  > **Diễn giải:** ở cả hai hướng, phương sai giữ lại cộng lỗi trung bình bằng $\operatorname{tr}(S)=5/2$: $2+\tfrac12=\tfrac12+2$.
  > [Hình: `img/lec-14/pca-projection.svg`, alt như ghi chú dòng 261.]
- **Ghi chú diễn giả:** Hai quan sát nằm ngang có tích ngoài $\operatorname{diag}(4,0)$, hai quan sát nằm dọc có tích ngoài $\operatorname{diag}(0,1)$. Ma trận chéo có vector riêng là hai trục. Trên hình, hai đoạn nét đứt dài $1$ là phần bị bỏ khi nén, tổng bình phương độ dài bằng $2$. Phương sai của mã $u^\top Su=2$ chiếm $4/5$ tổng phương sai. Hướng có phương sai lớn hơn cũng cho lỗi nhỏ hơn; trang sau chứng minh đẳng thức $\operatorname{tr}(S)$ cho mọi dữ liệu.
- **Lý do · khoảng trống:** NT23 (dữ kiện → Tính → bước → Diễn giải); trả lời câu hỏi của L14-2-01 bằng số.
- **Nối:** L14-2-04 → L14-2-06 (đẳng thức cho mọi dữ liệu).
- **Câu hỏi mạch · MT:** đường tốt nhất là trục ngang; phân rã quan sát được bằng số; MT1.
- **Nguồn:** ghi chú dòng 234–263.
- **Quyết định · phút:** thêm; 2,5.

#### L14-2-06 — Phương sai giữ lại và lỗi tái tạo

- **Loại:** trực quan + kết quả.
- **Mặt trang:**
  > **Trực quan.** $\|y\|_2^2$ là phần giữ lại $\|U^\top y\|_2^2$ cộng phần bị bỏ; tổng cố định.
  > **Mệnh đề 14.4.** **Giả thiết:** $y_1,\ldots,y_n$ đã tâm hóa, hiệp phương sai $S$; $U^\top U=I_k$; tái tạo của $y_i$ là $UU^\top y_i$.
  > **Kết luận:** lỗi tái tạo (reconstruction error) $$\widehat J(U)=\frac1n\sum_{i=1}^n\|y_i-UU^\top y_i\|_2^2=\operatorname{tr}(S)-\operatorname{tr}(U^\top SU).\tag{4.4}$$
  > Với mỗi $k$, $U$ cực tiểu $\widehat J$ khi và chỉ khi $U$ là nghiệm của bài toán PCA hạng $k$.
  > Với $k=1$, lỗi nhỏ nhất bằng $\operatorname{tr}(S)-\lambda_1$.
- **Ghi chú diễn giả:** Mệnh đề biến quan sát $2+\frac12=\frac12+2$ của bốn quan sát thành đẳng thức cho mọi dữ liệu đã tâm hóa: cực đại phương sai và cực tiểu lỗi tái tạo là cùng một bài toán. Lỗi ở đây đo trên chính mẫu dùng để tính $S$. Với bốn quan sát, $\operatorname{tr}(S)-\lambda_1=\frac52-2=\frac12$, đúng lỗi đã tính.
- **Lý do · khoảng trống:** kết quả chính thứ hai của mạch (MT1, vế "tương đương giảm lỗi tái tạo trực giao").
- **Nối:** L14-2-05 → L14-2-07.
- **Câu hỏi mạch · MT:** phân rã của câu hỏi mạch; MT1.
- **Nguồn:** ghi chú dòng 265–284.
- **Quyết định · phút:** thêm; 2.

#### L14-2-07 — Ý tưởng chứng minh: phương sai giữ lại và lỗi tái tạo

- **Loại:** ý tưởng chứng minh.
- **Mặt trang:**
  > 1. $P=UU^\top$ thỏa $P^\top=P$ và $P^2=U(U^\top U)U^\top=P$ (giả thiết $U^\top U=I_k$).
  > 2. **Nhắc lại:** định lý Pythagore. $$\|y\|_2^2=\|Py\|_2^2+\|(I_d-P)y\|_2^2,\qquad\|Py\|_2=\|U^\top y\|_2.$$
  > 3. Lấy trung bình bằng vết: $\frac1n\sum_i\|y_i\|_2^2=\operatorname{tr}(S)$, $\frac1n\sum_i\|U^\top y_i\|_2^2=\operatorname{tr}(U^\top SU)$; trừ hai đẳng thức được (4.4).
  > 4. $\operatorname{tr}(S)$ không phụ thuộc $U$, nên hai bài toán cùng tập nghiệm.
  > **Lưu ý:** dữ liệu chưa tâm hóa thì tái tạo là $\bar x+UU^\top(x-\bar x)$; bỏ $\bar x$ làm (4.4) sai.
- **Ghi chú diễn giả:** Số hạng chéo $(Py)^\top(I_d-P)y=y^\top(P-P^2)y=0$ dùng cả $P^\top=P$ lẫn $P^2=P$. Dòng $\|Py\|_2=\|U^\top y\|_2$ dùng lại $U^\top U=I_k$. Bước 3 dùng $\|y_i\|^2=\operatorname{tr}(y_iy_i^\top)$ và tính tuyến tính của vết. Giả thiết tâm hóa vào ở Bước 3: $S$ được tính từ $y_i$, không từ $x_i$.
- **Lý do · khoảng trống:** NT6.
- **Nối:** L14-2-06 → L14-2-09 (hạng $k$).
- **Câu hỏi mạch · MT:** MT1 (chứng minh).
- **Nguồn:** ghi chú dòng 286–325.
- **Quyết định · phút:** thêm; 2,5.

#### L14-2-08 — Phương sai lớn và tín hiệu cần dự đoán

- **Loại:** phản ví dụ + kiểm tra.
- **Mặt trang:**
  > **Nhận xét 14.5.** $X=(M,N)$ độc lập, trung bình $0$; $\operatorname{Var}(M)=100$; $N\in\{-1,1\}$, $\operatorname{Var}(N)=1$.
  > $S=\operatorname{diag}(100,1)$: PCA một chiều giữ $M$, bỏ $N$.
  > Nhãn cần dự đoán là $N$ thì mã PCA không chứa thông tin về nhãn.
  > Đổi $N$ từ mét sang milimét: $\operatorname{Var}(N)=10^6$, $S=\operatorname{diag}(100,10^6)$, PCA một chiều giữ $N$.
  > **Câu hỏi:** Vì sao tiêu chuẩn (4.3) không chọn đặc trưng theo khả năng dự đoán?
- **Ghi chú diễn giả:** Lời giải: (4.3) chỉ dùng $S$, không dùng nhãn. Đổi $M$ sang milimét thì $S=\operatorname{diag}(10^8,1)$, hướng chính không đổi; đổi $N$ thì hướng chính đổi. Do đó chuẩn hóa đặc trưng và chọn $k$ cần dựa vào nhiệm vụ. Mệnh đề 14.4 vẫn định lượng chính xác phương sai bị bỏ khi giữ $k$ hướng.
- **Lý do · khoảng trống:** NT8 bước kiểm tra (phản ví dụ, "Câu hỏi:"); giới hạn áp dụng của khung chung.
- **Nối:** L14-2-09 → mạch 3.
- **Câu hỏi mạch · MT:** "thông tin" đo bằng phương sai, không phải khả năng dự đoán; MT1, MT6.
- **Nguồn:** ghi chú dòng 327–331, 1423.
- **Quyết định · phút:** thêm; 2.

#### L14-2-09 — Phân tích thành phần chính hạng $k$

- **Loại:** kết quả (mở rộng) + ứng dụng.
- **Mặt trang:**
  > **Trực quan.** $V_k$ giữ $k$ trị riêng lớn nhất; quay trong không gian con giữ nguyên phép chiếu.
  > **Định lý 14.6.** **Giả thiết:** $S$, $\lambda_j$, $v_j$ như Mệnh đề 14.3; $1\le k\le d$; $V_k=(v_1,\ldots,v_k)$.
  > **Kết luận:** giá trị tối ưu $\sum_{j\le k}\lambda_j$ tại $U=V_k$; lỗi tái tạo nhỏ nhất $\sum_{j>k}\lambda_j$.
  > Nếu $k<d$, $\lambda_k>\lambda_{k+1}$: nghiệm khi và chỉ khi $UU^\top=V_kV_k^\top$, tức $U=V_kQ$, $Q$ trực giao.
  > Tỉ lệ phương sai được giải thích: $\operatorname{tr}(U^\top SU)/\operatorname{tr}(S)$.
  > Mã và tái tạo vẫn tuyến tính.
- **Ghi chú diễn giả:** $v_j$ là thành phần chính (principal component) thứ $j$. Với bốn quan sát, tỉ lệ phương sai được giải thích bằng $2/(5/2)=4/5$. Ý tưởng chứng minh (ghi chú, Phụ lục A): đặt $b_j=\|U^\top v_j\|_2^2$; khi đó $\operatorname{tr}(U^\top SU)=\sum_j\lambda_jb_j$ với $0\le b_j\le1$ và $\sum_jb_j=k$; trung bình có trọng số này không vượt $\sum_{j\le k}\lambda_j$, bằng nhau tại $V_k$; khe $\lambda_k>\lambda_{k+1}$ buộc $b_j=0$ khi $j>k$. Chọn $k$ theo ngưỡng tỉ lệ phương sai được giải thích (Murphy (2022), §20.1.4.2) hoặc chặn lỗi nén trên mẫu; lỗi tái tạo trên tập kiểm tra tiếp tục giảm khi tăng $k$ (Murphy (2022), §20.1.4.1), nên lỗi tái tạo không xác định một số chiều tối ưu. Mã và tái tạo tuyến tính là giới hạn mà bộ tự mã hóa bỏ đi.
- **Lý do · khoảng trống:** hoàn tất câu hỏi mạch cho $k>1$; ứng dụng chọn $k$; câu nối sang mạch 3 trên mặt trang (NT13).
- **Nối:** L14-2-07 → L14-2-08.
- **Câu hỏi mạch · MT:** không gian con tốt nhất; MT1.
- **Nguồn:** ghi chú dòng 325–348, 1492–1528.
- **Quyết định · phút:** thêm; 3. Ý tưởng chứng minh chỉ ở ghi chú diễn giả (mục 12, Q3).

### Mạch 3. Bộ tự mã hóa tất định (14 phút, 7 trang)

Câu hỏi của mạch: học hai ánh xạ mã hóa và giải mã thì xác định được gì? Phân rã: ánh xạ tái tạo $g\circ f$ / hệ tọa độ của mã / phân phối của mã.

#### L14-3-00 — 3. Bộ tự mã hóa tất định

- **Loại:** tiêu đề mạch; điểm vào mạch 3; `id="mach-3"`. Ngoài hành trình khái niệm.
- **Mặt trang:**
  > Hai ánh xạ học từ dữ liệu xác định phép tái tạo nhưng không xác định phân phối của mã.
  > Bộ mã hóa · Bộ giải mã · Đổi tọa độ mã · Phân phối của mã
- **Ghi chú diễn giả:** Mạch nhận phép nén tốt nhất trong lớp phép chiếu và lỗi $\sum_{j>k}\lambda_j$. Việc của mạch: thay phép chiếu bằng hai ánh xạ học được, so sánh trường hợp tuyến tính với PCA, rồi kiểm tra cặp ánh xạ có sinh được dữ liệu không. Mạch trao cho mạch 4 một giới hạn cụ thể: cùng bộ giải mã và cùng lỗi tái tạo đi với nhiều phân phối sinh.
- **Lý do · khoảng trống:** NT12.
- **Nối:** L14-2-09 → L14-3-01.
- **Câu hỏi mạch · MT:** MT2.
- **Nguồn:** ghi chú §5, dòng 350–354.
- **Quyết định · phút:** thêm; 0,5.

#### L14-3-01 — Bộ tự mã hóa

- **Loại:** vấn đề + trực quan + định nghĩa.
- **Mặt trang:**
  > **Trực quan.** Gần một đường cong, bộ mã hóa gán tọa độ dọc đường cong; bộ giải mã dựng lại điểm.
  > **Định nghĩa 14.7.** Bộ tự mã hóa (autoencoder, AE): bộ mã hóa (encoder) $f_\phi:\mathbb R^d\to\mathbb R^k$, bộ giải mã (decoder) $g_\theta:\mathbb R^k\to\mathbb R^d$, $1\le k\le d$;
  > $$\min_{\theta,\phi}\widehat J(\theta,\phi)=\frac1n\sum_{i=1}^n\|x_i-g_\theta(f_\phi(x_i))\|_2^2.\tag{5.1}$$
  > **Câu hỏi:** Hai ánh xạ xác định gì: phép tái tạo, tọa độ mã, phân phối của mã?
- **Ghi chú diễn giả:** PCA là trường hợp $f(y)=U^\top y$, $g(z)=Uz$; với mạng nơ-ron, gradient của (5.1) tính bằng lan truyền ngược. Câu hỏi của mạch có ba phần: phép tái tạo $g\circ f$, hệ tọa độ của mã, phân phối của mã. Với bốn quan sát, mã PCA $z=x_1$ đưa hai điểm nằm dọc về gốc; với dữ liệu gần một đường cong, một tọa độ chạy dọc đường cong giữ được phần biến thiên mà mọi đường thẳng bỏ. Khi dùng dữ liệu tâm hóa, hai hàm áp dụng cho $y=x-\bar x$ và cộng $\bar x$ ở đầu ra. Mạng theo Định nghĩa 06.4, gradient theo Mệnh đề 06.12. Chiều $k<d$ tạo nút thắt (bottleneck): với $k=d$, cặp $f(x)=x$, $g(z)=z$ cho lỗi $0$ mà không học được cấu trúc nào (Murphy (2022), §20.3). Nút thắt không ngăn ghi nhớ: với các quan sát phân biệt, $x_i\mapsto i$ và $i\mapsto x_i$ cho lỗi $0$ ngay cả khi $k=1$. Hai vai trò mã hóa, giải mã chưa nói gì về tần suất xuất hiện của các tọa độ.
- **Lý do · khoảng trống:** NT8 vấn đề → trực quan → định nghĩa trên một trang; nối PCA với ánh xạ tổng quát.
- **Nối:** mạch 2 (giới hạn tuyến tính) → L14-3-02 (trường hợp tuyến tính so với PCA).
- **Câu hỏi mạch · MT:** nêu câu hỏi mạch: học hai ánh xạ; MT2.
- **Nguồn:** ghi chú dòng 352–373.
- **Quyết định · phút:** thêm; 2.

#### L14-3-02 — Bộ tự mã hóa tuyến tính và phân tích thành phần chính

- **Loại:** kết quả.
- **Mặt trang:**
  > **Trực quan.** $BAy$ nằm trong ảnh của $B$; điểm gần $y$ nhất của ảnh là hình chiếu.
  > **Mệnh đề 14.8.** **Giả thiết:** $y_i$ tâm hóa; $f(y)=Ay$, $g(z)=Bz$, $A\in\mathbb R^{k\times d}$, $B\in\mathbb R^{d\times k}$, không ràng buộc khác; $\widehat J(A,B)=\frac1n\sum_i\|y_i-BAy_i\|_2^2$.
  > **Kết luận:** $\min_{A,B}\widehat J(A,B)=\sum_{j>k}\lambda_j$, đạt tại $(V_k^\top,V_k)$;
  > - với $R$ khả nghịch, $(RA,BR^{-1})$ cùng $BA$, cùng lỗi;
  > - thêm $k<d$, $\lambda_k>\lambda_{k+1}$, $y_i$ sinh $\mathbb R^d$: mọi nghiệm có $BA=V_kV_k^\top$, dạng $(RV_k^\top,V_kR^{-1})$.
  > **Ý nghĩa:** $\sum_{j>k}\lambda_j$ là mốc cho mọi bộ tự mã hóa tuyến tính; mã xác định tới $R$.
- **Ghi chú diễn giả:** Mệnh đề nói về cực tiểu toàn cục: cặp $A=0$, $B=0$ có gradient bằng $0$ nhưng không tối ưu khi $\lambda_1>0$, nên một điểm dừng của hạ gradient chưa chắc là nghiệm. Lỗi PCA $\sum_{j>k}\lambda_j$ là mốc cho mọi bộ tự mã hóa tuyến tính. Thêm ràng buộc $AA^\top=I_k$ chỉ thu hẹp $R$ về ma trận trực giao; chốt từng tọa độ cần thêm $\lambda_1>\cdots>\lambda_k$, mã không tương quan và xếp theo phương sai giảm dần, khi đó $R$ chéo với phần tử $\pm1$. Khi các $y_i$ không sinh ra $\mathbb R^d$, $BA=V_kV_k^\top$ chỉ bảo đảm trên không gian con của dữ liệu (Murphy (2022), §20.3.1).
- **Lý do · khoảng trống:** kết quả chính của mạch (MT2); tách tái tạo khỏi tọa độ.
- **Nối:** L14-3-01 → L14-3-03.
- **Câu hỏi mạch · MT:** tái tạo và tọa độ mã; MT2.
- **Nguồn:** ghi chú dòng 375–389, 442–446.
- **Quyết định · phút:** thêm; 2,5.

#### L14-3-03 — Ý tưởng chứng minh: bộ tự mã hóa tuyến tính

- **Loại:** ý tưởng chứng minh.
- **Mặt trang:**
  > 1. $BAy_i$ thuộc ảnh $W$ của $B$, $\dim W\le k$.
  > 2. Pythagore: điểm của $W$ gần $y$ nhất là hình chiếu $P_Wy$.
  > 3. Bổ sung cơ sở trực chuẩn của $W$ thành $U$, $U^\top U=I_k$; Định lý 14.6 cho $$\widehat J(A,B)\ge\frac1n\sum_{i=1}^n\|y_i-UU^\top y_i\|_2^2\ge\sum_{j>k}\lambda_j.$$
  > 4. Đạt chặn tại $(V_k^\top,V_k)$; $(BR^{-1})(RA)=BA$; giả thiết bổ sung biến các bất đẳng thức thành đẳng thức.
  > **Kỹ thuật.** Chặn dưới mọi tái tạo trong một không gian con bằng hình chiếu trực giao lên nó.
- **Ghi chú diễn giả:** Bổ sung cơ sở thực hiện được vì $k\le d$. Bước 3 có ba bất đẳng thức: từng điểm (Bước 2), thay $P_W$ bằng $UU^\top$ (ảnh của $U$ chứa $W$), và Định lý 14.6. Ở Bước 4, giả thiết $\lambda_k>\lambda_{k+1}$ cho $UU^\top=V_kV_k^\top$ (tính duy nhất), giả thiết $y_i$ sinh $\mathbb R^d$ biến đẳng thức trên dữ liệu thành đẳng thức ma trận; $BA$ có hạng $k$ nên $B=V_kM$ với $M$ khả nghịch, $R=M^{-1}$.
- **Lý do · khoảng trống:** NT6, 4 bước, chỗ dùng từng giả thiết.
- **Nối:** L14-3-02 → L14-3-04 (đổi tọa độ bằng số).
- **Câu hỏi mạch · MT:** MT2 (chứng minh).
- **Nguồn:** ghi chú dòng 391–440.
- **Quyết định · phút:** thêm; 3.

#### L14-3-04 — Ví dụ: đổi độ lớn mã mà không đổi tái tạo

- **Loại:** ví dụ (ví dụ xuyên suốt).
- **Mặt trang:**
  > **Ví dụ 14.3.** Dữ kiện: bốn quan sát $(\pm2,0)^\top$, $(0,\pm1)^\top$; $k=1$; $A=(1\ \ 0)$, $B=(1\ \ 0)^\top$, $R=(2)$.
  > Tính mã, tái tạo, phương sai mã với $A'=RA=(2\ \ 0)$, $B'=BR^{-1}=(\tfrac12\ \ 0)^\top$.
  > $(2,0)^\top$: mã $2$ thành $4$, tái tạo $(2,0)^\top$; $(0,1)^\top$: mã $0$, tái tạo $(0,0)^\top$.
  > $B'A'=\operatorname{diag}(1,0)=BA$: lỗi trung bình vẫn bằng $1/2$.
  > Phương sai của mã: $2=\lambda_1$ và $8=R^2\cdot2$.
  > **Diễn giải:** phương sai mã nhân với $R^2$, nên không đọc được như trị riêng $\lambda_1$.
- **Ghi chú diễn giả:** Ví dụ là kết luận đổi tọa độ của Mệnh đề 14.8 với $R=(2)$: bộ giải mã chia đôi đúng phần bộ mã hóa nhân đôi. Mọi tái tạo giữ nguyên nên lỗi giữ nguyên; chỉ thang đo của mã đổi. Kiểm tra: $8=R^2\cdot2$, đúng hệ số của phép đổi tọa độ.
- **Lý do · khoảng trống:** ví dụ tính được cho phần "tọa độ mã" của câu hỏi mạch (NT23).
- **Nối:** L14-3-03 → L14-3-05 (câu hỏi sinh dữ liệu).
- **Câu hỏi mạch · MT:** tọa độ của mã; MT2.
- **Nguồn:** ghi chú dòng 448–462.
- **Quyết định · phút:** thêm; 2.

#### L14-3-05 — Ví dụ: tái tạo đúng chưa xác định phân phối

- **Loại:** ví dụ (giới hạn, chuyển mạch).
- **Mặt trang:**
  > **Ví dụ 14.4.** Dữ kiện: hai quan sát $(-2,0)^\top$, $(2,0)^\top$; $f(x)=x_1$, $g(z)=(z,0)^\top$; lỗi trên mẫu $0$.
  > Cơ chế thứ nhất: $Z=\pm2$, mỗi giá trị xác suất $\tfrac12$, $X=g(Z)$: $\mathbb E[X_1^2]=4$.
  > Cơ chế thứ hai: $Z\sim\mathcal N(0,1)$, $X=g(Z)$: $\mathbb E[X_1^2]=1$.
  > Cả hai đặt xác suất $1$ lên trục ngang, diện tích $0$: không có mật độ hai chiều.
  > **Diễn giải:** cùng $g$, cùng lỗi $0$, hai phân phối khác nhau; bộ tự mã hóa không chứa phân phối của mã.
- **Ghi chú diễn giả:** Cơ chế thứ nhất chỉ sinh lại hai quan sát huấn luyện; cơ chế thứ hai trải điểm dọc toàn trục ngang. Nếu $X$ có mật độ hai chiều thì xác suất của một tập diện tích $0$ bằng $0$, mâu thuẫn. Nhận xét 14.9: bộ tự mã hóa phi tuyến giảm được lỗi trên mẫu, nhưng Định nghĩa 14.7 không quy định phân phối của mã và không ràng buộc bộ giải mã tại các mã không xuất hiện khi huấn luyện (Murphy (2022), §20.3.5.3), nên lỗi huấn luyện nhỏ không cho biết giải mã một mã ngẫu nhiên có cho dữ liệu phù hợp.
- **Lý do · khoảng trống:** phần "phân phối của mã" của câu hỏi mạch; câu nối sang mạch 4 trên mặt trang (dòng Diễn giải).
- **Nối:** L14-3-04 → L14-3-06.
- **Câu hỏi mạch · MT:** phân phối của mã; MT2, MT6.
- **Nguồn:** ghi chú dòng 464–482.
- **Quyết định · phút:** thêm; 2.

#### L14-3-06 — Bài tập: tái tạo và tọa độ mã trên đường chéo

- **Loại:** bài tập có lời giải trên mặt trang (fragment); cụm "nén dữ liệu" (mạch 2–3).
- **Mặt trang:**
  > **Bài tập 14.1.** Dữ liệu:
  > - $(2,2)^\top$, $(-2,-2)^\top$;
  > - $(1,-1)^\top$, $(-1,1)^\top$.
  > $\bar x=0$, $S=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}$, $u=(1,1)^\top/\sqrt2$, $Su=4u$; $f(x)=x_1+x_2$, $g(z)=(z/2,z/2)^\top$.
  > **Câu hỏi:** (1) Tính mã, tái tạo và lỗi bình phương tại $(2,2)^\top$ và $(1,-1)^\top$.
  > (2) Với $c\ne0$, $f_c(x)=c(x_1+x_2)$, $g_c(z)=\big(z/(2c),z/(2c)\big)^\top$: chứng minh tái tạo không đổi; xác định $c$ để mã bằng $u^\top x$.
  > [fragment] **Lời giải:** (1) $(2,2)^\top$: mã $4$, tái tạo $(2,2)^\top$, lỗi $0$; $(1,-1)^\top$: mã $0$, lỗi $2$. (2) $g_c(f_c(x))=uu^\top x$ không phụ thuộc $c$; $c(x_1+x_2)=c\sqrt2\,u^\top x$ nên $c=1/\sqrt2$.
- **Ghi chú diễn giả:** Gợi ý của ghi chú: viết $g(f(x))$ thành $uu^\top x$, phép chiếu trực giao lên hướng chính thứ nhất. Trị riêng còn lại bằng $1$, nên lỗi trung bình nhỏ nhất là $1$: hai điểm trên đường $x_1=x_2$ lỗi $0$, hai điểm còn lại lỗi $2$. Với $c=1$ như đề, mã gấp $\sqrt2$ lần tọa độ PCA, đúng phép đổi tọa độ của Mệnh đề 14.8 với $R=(\sqrt2)$. Câu 3–4 ở trang tiếp theo của mạch 4.
- **Lý do · khoảng trống:** NT24, mỗi cụm khái niệm lớn có một bài với "Lời giải:" trên mặt trang; giữ dữ liệu, câu chữ đề.
- **Nối:** L14-3-05 → mạch 4.
- **Câu hỏi mạch · MT:** tái tạo và tọa độ; MT2.
- **Nguồn:** ghi chú dòng 593–603, 608–626.
- **Quyết định · phút:** thêm; 2. Ngoại lệ 7 dòng: dữ liệu mỗi cặp điểm một dòng, đề giữ câu chữ.

### Mạch 4. Mô hình sinh có biến ẩn (14 phút, 7 trang)

Câu hỏi của mạch: cần thêm gì vào cặp $f,g$ để sinh dữ liệu, và mô hình nhận được đặt ra những phép tính nào? Phân rã: tiên nghiệm + nhiễu → sinh mẫu / đánh giá hợp lý / suy luận hậu nghiệm.

#### L14-4-00 — 4. Mô hình sinh có biến ẩn

- **Loại:** tiêu đề mạch; điểm vào mạch 4; `id="mach-4"`. Dòng dẫn nêu đúng cơ chế của khái niệm đầu tiên (Định nghĩa 14.10), nên trang đảm nhận một phần bước vấn đề.
- **Mặt trang:**
  > Mô hình sinh lấy mã ngẫu nhiên rồi thêm nhiễu quanh đầu ra của bộ giải mã.
  > Tiên nghiệm · Phân phối quan sát có điều kiện · Mật độ biên · Hậu nghiệm
- **Ghi chú diễn giả:** Mạch nhận từ mạch 3 kết luận: bộ tự mã hóa tất định không chứa phân phối của mã. Việc của mạch: thêm tiên nghiệm cho mã và nhiễu cho quan sát, viết mật độ biên và hậu nghiệm, tính chúng trong một mô hình Gaussian tuyến tính. Mạch trao cho mạch 5 khó khăn còn lại: với bộ giải mã phi tuyến, tích phân biên không có dạng đóng.
- **Lý do · khoảng trống:** NT12.
- **Nối:** L14-3-06 → L14-4-01.
- **Câu hỏi mạch · MT:** MT3.
- **Nguồn:** ghi chú §6, dòng 486–490.
- **Quyết định · phút:** thêm; 0,5.

#### L14-4-01 — Ví dụ: sinh dữ liệu từ bộ giải mã trục ngang

- **Loại:** vấn đề + ví dụ dẫn nhập + trực quan (ví dụ xuyên suốt).
- **Mặt trang:**
  > Dữ kiện: bốn quan sát $(\pm2,0)^\top$, $(0,\pm1)^\top$; $g(z)=(z,0)^\top$; cách sinh thử $Z\sim\mathcal N(0,1)$, $X=g(Z)$.
  > Mọi điểm sinh ra nằm trên trục ngang; không điểm nào giống $(0,\pm1)^\top$.
  > $\mathbb E[X_1^2]=\mathbb E[Z^2]=1$, còn dữ liệu có $(4+4+0+0)/4=2$.
  > **Trực quan.** Sinh hai bước: chọn một trạng thái ẩn, rồi tạo quan sát theo trạng thái đó.
  > **Diễn giải:** cần thêm một phân phối của mã và một nhiễu quanh $g(z)$.
- **Ghi chú diễn giả:** Đây là cách làm có vẻ hợp lý trong Câu hỏi mở đầu của ghi chú, và nó sai vì hai lý do trên. Ví dụ 14.4 vừa cho thấy chọn phân phối của $Z$ không có căn cứ trong bộ tự mã hóa. Trực giác hai bước tách tính ngẫu nhiên của mã khỏi nhiễu của quan sát; định nghĩa ở trang sau viết hai bước đó thành hai mật độ.
- **Lý do · khoảng trống:** NT8 bước vấn đề bằng ví dụ cụ thể; NT14 dữ kiện ngay đầu trang.
- **Nối:** tiêu đề mạch → L14-4-02.
- **Câu hỏi mạch · MT:** nêu câu hỏi mạch "cần thêm gì"; MT3.
- **Nguồn:** ghi chú dòng 21–28, 488–490.
- **Quyết định · phút:** thêm; 2.

#### L14-4-02 — Mô hình sinh có biến ẩn

- **Loại:** định nghĩa.
- **Mặt trang:**
  > **Định nghĩa 14.10.** Mô hình sinh (generative model) có biến ẩn (latent variable model) gồm:
  > - tiên nghiệm (prior) $p(z)$ của biến ẩn (latent variable) $Z\in\mathbb R^k$;
  > - phân phối quan sát có điều kiện $p_\theta(x\mid z)$, chuẩn hóa theo $x$ trên $\mathbb R^d$.
  > $$p_\theta(x,z)=p_\theta(x\mid z)p(z),\qquad p_\theta(x)=\int_{\mathbb R^k}p_\theta(x\mid z)p(z)\,dz.\tag{6.1}$$
  > Lựa chọn Gaussian, với $g_\theta(z)$ là trung bình có điều kiện: $$p(z)=\mathcal N(0,I_k),\qquad p_\theta(x\mid z)=\mathcal N(g_\theta(z),\tau^2I_d),\ \tau>0.\tag{6.2}$$
- **Ghi chú diễn giả:** Mật độ biên (6.1) là phép lấy biên của Mệnh đề 10.32 cho cặp $(X,Z)$. Đổi thứ tự tích phân của hàm không âm: $\int p_\theta(x)\,dx=\int p(z)\big(\int p_\theta(x\mid z)\,dx\big)dz=1$, nên mô hình được chuẩn hóa ngay cả khi tích phân biên tại một quan sát cụ thể không tính được. Nhiễu $\tau^2>0$ làm $X$ có mật độ trên toàn $\mathbb R^d$; lập luận diện tích của Ví dụ 14.4 cho trường hợp $\tau=0$: khi $k<d$, $X=g_\theta(Z)$ nằm trên ảnh của bộ giải mã và không có mật độ trên $\mathbb R^d$ nếu ảnh có thể tích $0$. Bộ tự mã hóa tất định chính là trường hợp chỉ có trung bình $g_\theta$, thiếu cả tiên nghiệm lẫn nhiễu.
- **Lý do · khoảng trống:** định nghĩa trung tâm của mạch (MT3); nêu vai trò của giả thiết $\tau>0$.
- **Nối:** L14-4-01 → L14-4-03 (ba phép tính).
- **Câu hỏi mạch · MT:** "cần thêm gì": tiên nghiệm và nhiễu; MT3.
- **Nguồn:** ghi chú dòng 492–523.
- **Quyết định · phút:** thêm; 2,5.

#### L14-4-03 — Sinh mẫu, hợp lý và suy luận hậu nghiệm

- **Loại:** định nghĩa.
- **Mặt trang:**
  > **Định nghĩa 14.11.** Với mô hình (6.1):
  > 1. Sinh mẫu: lấy $z\sim p(z)$ rồi lấy $x\sim p_\theta(x\mid z)$.
  > 2. Đánh giá hợp lý: tính $p_\theta(x)$ hoặc $\log p_\theta(x)$ bằng tích phân (6.1).
  > 3. Suy luận hậu nghiệm (posterior) tại $x$ có $0<p_\theta(x)<\infty$: $$p_\theta(z\mid x)=\frac{p_\theta(x\mid z)p(z)}{p_\theta(x)}.\tag{6.3}$$
  > Sinh mẫu: một lần lấy $z$, một lần giải mã; hai phép tính sau cần tích phân theo mọi mã.
- **Ghi chú diễn giả:** (6.3) là công thức Bayes cho mật độ, Mệnh đề 10.33 với mật độ đồng thời $p_\theta(x\mid z)p(z)$. Trong đánh giá hợp lý, $x$ cố định và $\theta$ là tham số cần học, như hàm hợp lý của Định nghĩa 11.2. Nhầm lẫn dễ gặp: sinh mẫu không cần hậu nghiệm, còn hậu nghiệm và hợp lý cùng cần mẫu số $p_\theta(x)$.
- **Lý do · khoảng trống:** phân rã câu hỏi mạch thành ba phép tính (MT3 "phân biệt").
- **Nối:** L14-4-02 → L14-4-04 (kỹ thuật tính hai phép tính khó trong trường hợp Gaussian).
- **Câu hỏi mạch · MT:** "phép tính nào"; MT3.
- **Nguồn:** ghi chú dòng 525–542.
- **Quyết định · phút:** thêm; 2.

#### L14-4-04 — Hoàn bình phương

- **Loại:** kỹ thuật (lần đầu trong các deck của học phần, xem mục 11).
- **Mặt trang:**
  > **Kỹ thuật.** Với $a>0$: $$-az^2+bz=-a\Big(z-\frac b{2a}\Big)^2+\frac{b^2}{4a}.$$
  > Dùng khi log-mật độ đồng thời là hàm bậc hai theo $z$.
  > Phần chứa $z$ cho hậu nghiệm $\mathcal N\big(\tfrac b{2a},\tfrac1{2a}\big)$.
  > Tích phân theo $z$ chỉ thêm hằng số $\int_{\mathbb R}e^{-a(z-c)^2}dz=\sqrt{\pi/a}$; phần còn lại cho mật độ biên.
  > Chỗ dùng: mật độ biên và hậu nghiệm của mô hình Gaussian tuyến tính.
- **Ghi chú diễn giả:** Hệ số $b$ phụ thuộc quan sát $x$, nên trung bình hậu nghiệm $b/(2a)$ là hàm của $x$, còn phương sai hậu nghiệm $1/(2a)$ thì không. Tích phân Gaussian không phụ thuộc tâm $c$, nên lấy biên chỉ giữ số hạng $b^2/(4a)$ cùng các số hạng không chứa $z$. Kỹ thuật dùng lại ở mô hình vô hướng của mạch 5 và ở các bài tập 14.2, 14.8, 14.9. Hai mật độ tỉ lệ cùng có tích phân $1$ thì bằng nhau, nên chỉ cần đọc dạng của số mũ.
- **Lý do · khoảng trống:** NT7, kỹ thuật dùng lại qua nhiều ví dụ và bài tập của bài; deck 00–11 chưa có trang này (mục 11).
- **Nối:** L14-4-03 → L14-4-05.
- **Câu hỏi mạch · MT:** công cụ cho hợp lý và hậu nghiệm; MT3.
- **Nguồn:** ghi chú dòng 557–580, 996, 1036 (các phép hoàn bình phương cụ thể); dạng tổng quát là đại số sơ cấp, đã kiểm (mục 5).
- **Quyết định · phút:** thêm; 2. Phụ thuộc deck 12–13 (mục 12, Q4).

#### L14-4-05 — Ví dụ: mô hình sinh tuyến tính Gaussian hai chiều

- **Loại:** ví dụ (nối ví dụ xuyên suốt).
- **Mặt trang:**
  > **Ví dụ 14.5.** Dữ kiện: (6.2) với $k=1$, $d=2$, $g(z)=(wz,0)^\top$, $w=\sqrt{3/2}$, $\tau^2=1/2$. Tính mật độ biên và hậu nghiệm.
  > Với hằng số chuẩn hóa $C$ và $w^2=3/2$: $$\log p(x,z)=C-\frac{z^2}2-(x_1-wz)^2-x_2^2=C-2\Big(z-\frac{wx_1}2\Big)^2-\frac{x_1^2}4-x_2^2.$$
  > Biên $X\sim\mathcal N\big(0,\operatorname{diag}(2,\tfrac12)\big)$; hậu nghiệm $Z\mid X=x\sim\mathcal N(wx_1/2,1/4)$, tại $x=(2,0)^\top$ có trung bình $w$.
  > Kiểm tra: $\mathbb E[X_1^2]=w^2+\tau^2=3/2+1/2=2$.
  > **Diễn giải:** hiệp phương sai biên trùng $S=\operatorname{diag}(2,\tfrac12)$ của bốn quan sát; mô hình sinh điểm ngoài trục ngang.
- **Ghi chú diễn giả:** Hệ số $1/(2\tau^2)=1$. Hoàn bình phương với $a=2$, $b=2wx_1$. Hậu nghiệm có hệ số $2=1/(2\cdot\frac14)$. Kiểm tra viết $X_1=wZ+\eta_1$, $\eta_1\sim\mathcal N(0,\frac12)$ độc lập với $Z$. Mô hình trả lời ví dụ đầu mạch: biến ẩn góp $3/2$ vào phương sai ngang, nhiễu góp $1/2$ cho mỗi tọa độ. Các tham số $w^2=\lambda_1-\lambda_2$, $\tau^2=\lambda_2$ là nghiệm hợp lý cực đại của PCA xác suất (probabilistic PCA) với một chiều ẩn (Murphy (2022), §20.2.2); phân phối Gaussian liên tục này vẫn khác phân phối thực nghiệm đặt khối lượng $1/4$ tại mỗi quan sát. Khi thay $wz$ bằng mạng phi tuyến, log-mật độ đồng thời không còn bậc hai theo $z$: đó là vấn đề của mạch 5.
- **Lý do · khoảng trống:** NT23; một ví dụ tính đủ ba phép tính; nối PCA với mô hình sinh.
- **Nối:** L14-4-04 → L14-4-06.
- **Câu hỏi mạch · MT:** hợp lý và hậu nghiệm tính được khi bậc hai; MT3.
- **Nguồn:** ghi chú dòng 544–589.
- **Quyết định · phút:** thêm; 3. Công thức hiển thị cần `aligned` ở 390 px (người viết đo).

#### L14-4-06 — Bài tập: phân phối của mã và nhiễu

- **Loại:** bài tập có lời giải trên mặt trang (fragment); cụm "mô hình sinh có biến ẩn".
- **Mặt trang:**
  > **Bài tập 14.1.** Dữ liệu $(2,2)^\top,(-2,-2)^\top,(1,-1)^\top,(-1,1)^\top$; $g(z)=(z/2,z/2)^\top$, $X=g(Z)$.
  > **Câu hỏi:** (3) Với $Z\sim\mathcal N(0,1)$ và với $Z=\pm4$ (xác suất $\tfrac12$ mỗi giá trị), tính $\mathbb E[X_1^2]$; so với trung bình $x_1^2$ trên dữ liệu.
  > Giải thích vì sao hai hàm $f,g$ chưa chỉ định một phân phối sinh.
  > (4) Với $Z\sim\mathcal N(0,1)$: vì sao $X$ không có mật độ hai chiều?
  > Nêu một thay đổi làm $X$ có mật độ trên $\mathbb R^2$; tính hiệp phương sai và định thức.
  > [fragment] **Lời giải:** (3) $\frac14$ và $4$, so với $\frac52$: $f,g$ không chọn được phân phối của $Z$. (4) $X$ nằm trên đường $x_1=x_2$; thêm $\eta\sim\mathcal N(0,\tau^2I_2)$, $\tau>0$: $\det\operatorname{Cov}(X)=\tau^2\big(\tau^2+\tfrac12\big)>0$.
- **Ghi chú diễn giả:** Câu 3: $\mathbb E[X_1^2]=\mathbb E[Z^2]/4$; không phân phối nào trong hai phân phối khớp $5/2$, và cùng bộ giải mã cho hai phân phối khác nhau. Câu 4 dùng lập luận diện tích của Ví dụ 14.4; với nhiễu, $X$ có mật độ (6.1). Với nhiễu, $\operatorname{Cov}(X)=\frac14\begin{pmatrix}1&1\\1&1\end{pmatrix}+\tau^2I_2$ vì $Z$ và $\eta$ độc lập, trung bình $0$; định thức $(\frac14+\tau^2)^2-\frac1{16}=\tau^2(\tau^2+\frac12)$. Kiểm tra: khi $\tau\to0$, định thức dần về $0$, ứng với phân phối suy biến trên đường chéo.
- **Lý do · khoảng trống:** NT24, bài có lời giải cho cụm mô hình sinh; nối bộ tự mã hóa với (6.2).
- **Nối:** L14-4-05 → mạch 5.
- **Câu hỏi mạch · MT:** "cần thêm gì": nhiễu cho mật độ; MT3, MT6.
- **Nguồn:** ghi chú dòng 604–605, 609, 628–647.
- **Quyết định · phút:** thêm; 2. Ngoại lệ mật độ: 80 âm tiết (bảng đếm); đề giữ đủ câu chữ.

### Mạch 5. Cận dưới bằng chứng (26 phút, 12 trang)

Câu hỏi của mạch: đại lượng nào chỉ gồm các kỳ vọng theo một phân phối tự chọn, ước lượng được bằng mẫu, và lệch khỏi $\log p_\theta(x)$ đúng bao nhiêu? Phân rã: $\log p_\theta(x)=$ cận dưới $+$ khe hở.

#### L14-5-00 — 5. Cận dưới bằng chứng

- **Loại:** tiêu đề mạch; điểm vào mạch 5; `id="mach-5"`. Ngoài hành trình khái niệm.
- **Mặt trang:**
  > Log-hợp lý của mô hình biến ẩn có một cận dưới tính được, và khe hở của cận được xác định chính xác.
  > Phân kỳ Kullback–Leibler · Hậu nghiệm xấp xỉ · Cận dưới bằng chứng · Suy luận biến phân
- **Ghi chú diễn giả:** Mạch nhận mô hình (6.1) và hợp lý cực đại của Mệnh đề 11.3. Việc của mạch: đưa ra thước đo khác nhau giữa hai phân phối, dựng một cận dưới của $\log p_\theta(x)$ chỉ gồm kỳ vọng theo một phân phối dễ lấy mẫu, đo đúng khe hở, rồi tính hai số hạng của cận trong lựa chọn Gaussian. Mạch trao cho mạch 6 mục tiêu (7.2) với hai số hạng có công thức.
- **Lý do · khoảng trống:** NT12.
- **Nối:** L14-4-06 → L14-5-01.
- **Câu hỏi mạch · MT:** MT4, MT5.
- **Nguồn:** ghi chú §7, dòng 652–656.
- **Quyết định · phút:** thêm; 0,5.

#### L14-5-01 — Log-hợp lý của mô hình có biến ẩn

- **Loại:** vấn đề + trực quan.
- **Mặt trang:**
  > Hợp lý cực đại cần $\log p_\theta(x_i)$, tức tích phân (6.1); với $g_\theta$ phi tuyến, (6.1) nói chung không có dạng đóng.
  > Lưới $N$ điểm mỗi tọa độ: $N^k$ lần giải mã; $N=100$, $k=10$ cho $10^{20}$.
  > **Trực quan.** Phân phối dễ lấy mẫu nên đặt khối lượng nơi hậu nghiệm lớn.
  > **Câu hỏi:** Đại lượng nào gồm kỳ vọng theo phân phối tự chọn, lệch khỏi $\log p_\theta(x)$ bao nhiêu?
- **Ghi chú diễn giả:** Với $g_\theta$ phi tuyến, số hạng $-\|x-g_\theta(z)\|_2^2/(2\tau^2)$ không còn bậc hai theo $z$, nên hoàn bình phương không áp dụng. Công thức Bayes (6.3) vẫn đúng; khó khăn nằm ở mẫu số, cũng là đại lượng cần cho đánh giá hợp lý (Murphy (2023), §21.1). Để nói "gần hậu nghiệm" một cách định lượng cần một thước đo sự khác nhau giữa hai phân phối: đó là định nghĩa ở trang sau.
- **Lý do · khoảng trống:** NT8 bước vấn đề; NT13 câu hỏi mạch trên trang nội dung đầu tiên.
- **Nối:** tiêu đề mạch → L14-5-02.
- **Câu hỏi mạch · MT:** nêu câu hỏi mạch; MT4.
- **Nguồn:** ghi chú dòng 589, 654–656.
- **Quyết định · phút:** thêm; 2.

#### L14-5-02 — Phân kỳ Kullback–Leibler

- **Loại:** định nghĩa + kết quả.
- **Mặt trang:**
  > **Định nghĩa 14.12.** Với mật độ chuẩn hóa $q,p$ trên $\mathbb R^k$, phân kỳ Kullback–Leibler (Kullback–Leibler divergence, KL):
  > $$\mathrm{KL}(q\,\|\,p)=\int_{\{q>0\}}q(z)\log\frac{q(z)}{p(z)}\,dz,\tag{7.1}$$
  > bằng $+\infty$ nếu $\{q>0,\ p=0\}$ có xác suất dương theo $q$.
  > **Trực quan.** $\log t\le t-1$ làm mỗi điểm của tích phân thành số hạng không âm.
  > **Bổ đề 14.13.** **Giả thiết:** $q,p$ mật độ chuẩn hóa.
  > **Kết luận:** $\mathrm{KL}(q\,\|\,p)\in[0,+\infty]$, bằng $0$ khi và chỉ khi $q=p$ hầu khắp nơi (ngoài tập thể tích $0$).
- **Ghi chú diễn giả:** Thứ tự hai đối số có vai trò: kỳ vọng lấy theo $q$, nói chung $\mathrm{KL}(q\,\|\,p)\ne\mathrm{KL}(p\,\|\,q)$. KL phụ thuộc hai mật độ qua tỉ số $q/p$; vì không đối xứng nên KL không phải metric. $q$ tuyệt đối liên tục (absolutely continuous) đối với $p$ nếu mọi tập có xác suất $0$ theo $p$ cũng có xác suất $0$ theo $q$; khi đó trường hợp $+\infty$ không xảy ra. "Hầu khắp nơi" nghĩa là ngoài một tập có thể tích $0$. Bài 11 dùng KL giữa hai phân phối trên $K$ nhóm để đọc lại Định lý 11.7 qua đẳng thức (6.3) của Bài 11. Bổ đề cho phép biến một đẳng thức chứa KL thành một cận.
- **Lý do · khoảng trống:** thước đo cần cho câu hỏi mạch; NT9 nhắc lại kết quả Bài 11.
- **Nối:** L14-5-01 → L14-5-03.
- **Câu hỏi mạch · MT:** công cụ đo khe hở; MT4.
- **Nguồn:** ghi chú dòng 658–682.
- **Quyết định · phút:** thêm; 2,5. Hai số hiệu trên một trang (mục 12, Q2).

#### L14-5-03 — Ý tưởng chứng minh: tính không âm của phân kỳ Kullback–Leibler

- **Loại:** ý tưởng chứng minh.
- **Mặt trang:**
  > **Nhắc lại:** $\psi(t)=t-1-\log t\ge0$ với mọi $t>0$, dấu bằng khi và chỉ khi $t=1$.
  > 1. Nếu $\{q>0,\ p=0\}$ có xác suất dương theo $q$ thì $\mathrm{KL}=+\infty$. Ngược lại, đặt $t=p/q$ trên $\mathcal S_q=\{q>0\}$.
  > 2. $q\log\frac qp=q\,\psi(t)+q-p\ge-p$: phần âm bị chặn bởi $p$ khả tích, nên tích phân (7.1) xác định.
  > 3. Giả thiết chuẩn hóa: $\int_{\mathcal S_q}q=1$, $\int_{\mathcal S_q}p\le1$, nên $$\mathrm{KL}(q\,\|\,p)=\int_{\mathcal S_q}q\,\psi(t)\,dz+\Big(1-\int_{\mathcal S_q}p\,dz\Big)\ge0.$$
  > 4. Dấu bằng: $q\,\psi(t)=0$ hầu khắp nơi trên $\mathcal S_q$, nên $p=q$ trên $\mathcal S_q$, và $\int_{\{q=0\}}p=0$.
- **Ghi chú diễn giả:** $\psi'(t)=1-1/t$ âm trên $(0,1)$, dương trên $(1,\infty)$, nên $\psi$ nhỏ nhất tại $t=1$; đây là bất đẳng thức $\log t\le t-1$ đã dùng ở Bài 11. Bước 2 là điểm kỹ thuật của trường hợp liên tục: hàm dưới dấu tích phân có thể âm, nên cần một chặn dưới khả tích trước khi tích phân. Ở Bước 3, số hạng thứ hai không âm vì $p$ có thể đặt khối lượng ngoài miền hỗ trợ của $q$. Bước 4: hàm không âm có tích phân $0$ thì bằng $0$ hầu khắp nơi; chiều ngược lại hiển nhiên từ $\log(q/p)=0$.
- **Lý do · khoảng trống:** NT6; MT4 "chứng minh tính không âm".
- **Nối:** L14-5-02 → L14-5-04.
- **Câu hỏi mạch · MT:** MT4 (chứng minh).
- **Nguồn:** ghi chú dòng 684–719.
- **Quyết định · phút:** thêm; 2,5.

#### L14-5-04 — Cận dưới bằng chứng

- **Loại:** định nghĩa.
- **Mặt trang:**
  > **Định nghĩa 14.14.** Với $x$ cố định, mật độ $q_\phi(z\mid x)$ dễ lấy mẫu, dùng thay $p_\theta(z\mid x)$, là hậu nghiệm xấp xỉ (approximate posterior).
  > $\log p_\theta(x)$ là log-hợp lý biên (còn gọi là bằng chứng, evidence).
  > Cận dưới bằng chứng (evidence lower bound, ELBO), khi các kỳ vọng hữu hạn:
  > $$\mathcal L(\theta,\phi;x)=\mathbb E_{q_\phi(z\mid x)}\Big[\log\frac{p_\theta(x,Z)}{q_\phi(Z\mid x)}\Big]=\mathbb E_{q_\phi(z\mid x)}[\log p_\theta(x\mid Z)]-\mathrm{KL}\big(q_\phi(\cdot\mid x)\,\|\,p\big).\tag{7.2}$$
  > Số hạng đầu là kỳ vọng tái tạo, số hạng sau là KL tới tiên nghiệm.
- **Ghi chú diễn giả:** Dạng thứ hai suy từ dạng thứ nhất bằng $p_\theta(x,z)=p_\theta(x\mid z)p(z)$ và tách logarit: $\log\frac{p_\theta(x,z)}{q_\phi}=\log p_\theta(x\mid z)-\log\frac{q_\phi}{p(z)}$. Cận dưới bằng chứng còn gọi là cận dưới của log-hợp lý. Định nghĩa dùng một phân phối mã hóa thay cho mã đơn lẻ $f_\phi(x)$ của bộ tự mã hóa tất định. Trong cả bài, $\mathcal L$ chỉ mang nghĩa ELBO. $q_\phi$ chỉ là công cụ suy luận; mô hình sinh vẫn do $p(z)$ và $p_\theta(x\mid z)$ xác định.
- **Lý do · khoảng trống:** đại lượng ứng viên cho câu hỏi mạch.
- **Nối:** L14-5-03 → L14-5-05 (khe hở).
- **Câu hỏi mạch · MT:** "đại lượng nào"; MT4.
- **Nguồn:** ghi chú dòng 723–745.
- **Quyết định · phút:** thêm; 2. Công thức (7.2) cần `aligned` ở 390 px.

#### L14-5-05 — Phân rã log-hợp lý qua cận dưới bằng chứng

- **Loại:** kết quả.
- **Mặt trang:**
  > **Định lý 14.15.** **Giả thiết:** $x$ cố định; **mật độ biên:** $0<p_\theta(x)<\infty$;
  > - **miền hỗ trợ** (support) $\{q_\phi(\cdot\mid x)>0\}$: $p_\theta(x,z)>0$ tại hầu mọi $z$ trong đó;
  > - **tính hữu hạn:** $\mathbb E_{q_\phi}|\log q_\phi(Z\mid x)|<\infty$, $\mathbb E_{q_\phi}|\log p_\theta(x,Z)|<\infty$.
  > **Kết luận:** $$\log p_\theta(x)=\mathcal L(\theta,\phi;x)+\mathrm{KL}\big(q_\phi(\cdot\mid x)\,\|\,p_\theta(\cdot\mid x)\big).\tag{7.3}$$
  > $\mathcal L\le\log p_\theta(x)$, bằng khi và chỉ khi $q_\phi(\cdot\mid x)=p_\theta(\cdot\mid x)$ hầu khắp nơi; $\theta$ cố định: $\max_\phi\mathcal L$ tương đương cực tiểu KL tới hậu nghiệm.
- **Ghi chú diễn giả:** Giả thiết miền hỗ trợ kéo theo $q_\phi(\cdot\mid x)$ tuyệt đối liên tục đối với $p_\theta(\cdot\mid x)$. Trực quan: log-hợp lý chia thành phần tính được và khe hở; khe hở đúng bằng KL từ hậu nghiệm xấp xỉ tới hậu nghiệm thật, nên một $q_\phi$ gần hậu nghiệm cho cận chặt. Bài toán tích phân khó được thay bằng bài toán tối ưu một cận chỉ gồm kỳ vọng theo $q_\phi$ (Murphy (2023), §10.1.1).
- **Lý do · khoảng trống:** kết quả chính của mạch (MT4 "phân rã").
- **Nối:** L14-5-04 → L14-5-06.
- **Câu hỏi mạch · MT:** "lệch bao nhiêu": đúng bằng KL tới hậu nghiệm; MT4.
- **Nguồn:** ghi chú dòng 747–769, 801.
- **Quyết định · phút:** thêm; 2,5.

#### L14-5-06 — Ý tưởng chứng minh: phân rã log-hợp lý

- **Loại:** ý tưởng chứng minh.
- **Mặt trang:**
  > 1. Giả thiết miền hỗ trợ và (6.3): tại $z$ có $q_\phi(z\mid x)>0$, $$\log\frac{q_\phi(z\mid x)}{p_\theta(z\mid x)}=\log q_\phi(z\mid x)-\log p_\theta(x,z)+\log p_\theta(x).$$
  > 2. Lấy kỳ vọng theo $q_\phi$ (giả thiết tính hữu hạn): KL tới hậu nghiệm bằng $-\mathcal L(\theta,\phi;x)+\log p_\theta(x)$.
  > 3. Bổ đề 14.13: KL tới hậu nghiệm không âm, cho cận và dấu bằng.
  > 4. $\log p_\theta(x)$ không phụ thuộc $\phi$: hai bài toán theo $\phi$ cùng tập nghiệm.
  > **Cách khác:** bất đẳng thức Jensen cho cận nhưng không cho khe hở.
- **Ghi chú diễn giả:** Số hạng $\log p_\theta(x)$ là hằng số theo $z$, và $q_\phi$ chuẩn hóa nên kỳ vọng của nó bằng chính nó; giả thiết $0<p_\theta(x)<\infty$ làm logarit hữu hạn. Giả thiết tính hữu hạn cho phép tách kỳ vọng của hiệu thành hiệu các kỳ vọng. Đường Jensen (Murphy (2022), §20.3.5.1) viết $\mathcal L\le\log\mathbb E_q[p_\theta(x,Z)/q(Z)]$ và chỉ cho cận; đường Bayes cho đẳng thức (7.3). Khi $\theta$ cũng thay đổi, khe hở phụ thuộc $\theta$.
- **Lý do · khoảng trống:** NT6, 4 bước, chỗ dùng từng giả thiết; "Cách khác:" nối kỹ thuật Jensen đã có ở deck trước.
- **Nối:** L14-5-05 → L14-5-07.
- **Câu hỏi mạch · MT:** MT4 (chứng minh).
- **Nguồn:** ghi chú dòng 771–802, 814.
- **Quyết định · phút:** thêm; 2,5.

#### L14-5-07 — Hai vai trò của phân kỳ Kullback–Leibler

- **Loại:** bảng so sánh (trần 80) + định nghĩa.
- **Mặt trang:**
  > | | KL tới tiên nghiệm | KL tới hậu nghiệm |
  > | Vị trí | trong mục tiêu (7.2) | khe hở của cận (7.3) |
  > | Tính được | khi $q_\phi$, $p(z)$ đơn giản | không, khi (6.1) không tính được |
  > | Tham số | $\phi$ | $\theta$ và $\phi$ |
  > | Vai trò | phạt $q_\phi$ lệch khỏi $p(z)$ | đo độ chặt của cận |
  > **Định nghĩa 14.16.** Suy luận biến phân (variational inference): $\theta$ cố định, họ $\mathcal Q$; chọn $q\in\mathcal Q$ cực đại $\mathbb E_q[\log p_\theta(x,Z)-\log q(Z)]$, tức cực tiểu $\mathrm{KL}(q\,\|\,p_\theta(\cdot\mid x))$ trên $\mathcal Q$.
  > Khi $\theta$ thay đổi, khe hở đổi theo: tăng $\mathcal L$ không bảo đảm $\log p_\theta(x)$ tăng.
- **Ghi chú diễn giả:** Hậu nghiệm (6.3) chia cho $p_\theta(x)$, nên KL tới hậu nghiệm không tính được đúng lúc cần cận dưới. Ví dụ của họ $\mathcal Q$: Gaussian có hiệp phương sai chéo. Khi hậu nghiệm thật không thuộc họ, khe hở dương với mọi $q$ trong họ (Bổ đề 14.13), nên ELBO cao chỉ là cận dưới của log-hợp lý, không tự chứng minh mô hình khớp dữ liệu. Trong học máy, ELBO là đại lượng được tối ưu khi huấn luyện mô hình có biến ẩn với bộ giải mã là mạng nơ-ron. Nhầm lẫn dễ gặp: KL tới tiên nghiệm nhỏ không có nghĩa cận chặt; bài tập cuối mạch kiểm tra điểm này.
- **Lý do · khoảng trống:** MT4 vế "phân biệt phân kỳ tới tiên nghiệm với phân kỳ tới hậu nghiệm"; NT8 bước ứng dụng (suy luận biến phân).
- **Nối:** L14-5-06 → L14-5-08 (tính KL tới tiên nghiệm).
- **Câu hỏi mạch · MT:** phần nào tính được, phần nào là khe hở; MT4.
- **Nguồn:** ghi chú dòng 804–812.
- **Quyết định · phút:** thêm; 2.

#### L14-5-08 — Phân kỳ giữa các phân phối Gaussian

- **Loại:** kết quả (hai công cụ).
- **Mặt trang:**
  > **Trực quan.** Log-mật độ Gaussian bậc hai theo $z$, nên KL chỉ cần hai mômen của $q$.
  > **Bổ đề 14.17.** **Giả thiết:** $q=\mathcal N(a,\beta)$, $p=\mathcal N(c,\gamma)$, $a,c\in\mathbb R$, $\beta,\gamma>0$. **Kết luận:** $$\mathrm{KL}(q\,\|\,p)=\frac12\Big[\log\frac\gamma\beta+\frac{\beta+(a-c)^2}\gamma-1\Big].\tag{7.4}$$
  > **Mệnh đề 14.18.** **Giả thiết:** $q=\mathcal N\big(\mu,\operatorname{diag}(s_1^2,\ldots,s_k^2)\big)$, mọi $s_j>0$; $p=\mathcal N(0,I_k)$. **Kết luận:** $$\mathrm{KL}(q\,\|\,p)=\frac12\sum_{j=1}^k\big(\mu_j^2+s_j^2-1-\log s_j^2\big),\tag{7.5}$$ mỗi số hạng không âm, bằng $0$ khi và chỉ khi $\mu_j=0$ và $s_j=1$.
  > **Chứng minh.** Hai mật độ là tích theo tọa độ; áp dụng (7.4) với $c=0$, $\gamma=1$ cho từng tọa độ.
- **Ghi chú diễn giả:** Chứng minh (7.4): lấy hiệu hai log-mật độ rồi dùng hai mômen $\mathbb E_q[Z]=a$, $\mathbb E_q[(Z-c)^2]=\beta+(a-c)^2$. Với $a=c$, $\beta=\gamma$, (7.4) bằng $0$. Công thức cho thấy KL không đối xứng: $\mathrm{KL}(\mathcal N(0,1)\|\mathcal N(0,2))=\frac12\log2-\frac14\approx0{,}0966$, còn $\mathrm{KL}(\mathcal N(0,2)\|\mathcal N(0,1))=\frac12(1-\log2)\approx0{,}1534$. Số hạng thứ $j$ của (7.5) bằng $\mu_j^2+\psi(s_j^2)$ với $\psi$ của Bổ đề 14.13. Dạng giải tích (7.5) không có nhiễu Monte Carlo (Murphy (2023), §10.2.1.1). Một mạng có thể xuất $a_j(x)=\log\sigma_{\phi,j}^2(x)$ rồi đặt $\sigma_{\phi,j}=\exp(a_j/2)$ để bảo đảm độ lệch chuẩn dương. Dạng chéo là ràng buộc trên họ $\mathcal Q$; hậu nghiệm thật vẫn có thể có tọa độ phụ thuộc nhau.
- **Lý do · khoảng trống:** số hạng KL của (7.2) có công thức đóng (MT5).
- **Nối:** L14-5-07 → L14-5-09 (số hạng còn lại).
- **Câu hỏi mạch · MT:** cận dưới tính được: số hạng KL; MT5.
- **Nguồn:** ghi chú dòng 816–913.
- **Quyết định · phút:** thêm; 2. Ý tưởng chứng minh một dòng "Chứng minh." (mục 12, Q3).

#### L14-5-09 — Kỳ vọng tái tạo và lỗi bình phương

- **Loại:** công thức + ví dụ.
- **Mặt trang:**
  > Với $p_\theta(x\mid z)=\mathcal N(g_\theta(z),\tau^2I_d)$: $$\mathbb E_q[\log p_\theta(x\mid Z)]=-\frac d2\log(2\pi\tau^2)-\frac{\mathbb E_q\|x-g_\theta(Z)\|_2^2}{2\tau^2}.\tag{7.6}$$
  > **Nhắc lại:** với $z$ cố định, $-\log p_\theta(x\mid z)$ bằng $\|x-g_\theta(z)\|_2^2/(2\tau^2)$ cộng hằng số, như Mệnh đề 12.2 với $\sigma^2=\tau^2$.
  > **Ví dụ 14.6.** Dữ kiện: $g_\theta(z)=(z,0)^\top$, $\tau^2=1/2$, $x=(0,1)^\top$, $q=\mathcal N(0,1/4)$. Tính kỳ vọng tái tạo.
  > $\mathbb E_q\|x-g_\theta(Z)\|_2^2=\mathbb E_q[Z^2]+1=\frac54$; kỳ vọng tái tạo $-\log\pi-\frac54\approx-2{,}3947$.
  > **Diễn giải:** mã thay bằng trung bình $0$ cho $-\log\pi-1$; kỳ vọng tái tạo phạt thêm $\operatorname{Var}_q(Z)/(2\tau^2)=1/4$.
- **Ghi chú diễn giả:** (7.6) dùng mật độ Gaussian nhiều chiều với $\Sigma=\tau^2I_d$: $\log p_\theta(x\mid z)=-\frac d2\log(2\pi\tau^2)-\|x-g_\theta(z)\|^2/(2\tau^2)$; (7.6) thay bình phương sai số bằng kỳ vọng của nó theo mã. Với $d=2$, $\tau^2=\frac12$: $-\frac22\log(2\pi\cdot\frac12)=-\log\pi$, hệ số $1/(2\tau^2)=1$. $\mathbb E_q[Z^2]=0^2+\frac14$ theo Mệnh đề 10.24. Hằng số $-\log\pi$ phải giữ khi báo giá trị ELBO, chỉ được bỏ khi tối ưu theo tham số không làm nó thay đổi. Khi bộ giải mã phi tuyến, kỳ vọng này ước lượng bằng Monte Carlo.
- **Lý do · khoảng trống:** số hạng thứ hai của (7.2); ví dụ tính được (NT23).
- **Nối:** L14-5-08 → L14-5-10 (ghép hai số hạng).
- **Câu hỏi mạch · MT:** cận dưới tính được: số hạng tái tạo; MT5.
- **Nguồn:** ghi chú dòng 913–950.
- **Quyết định · phút:** thêm; 2. Công thức (7.6) và Ví dụ 14.6 chung trang (mục 12, Q2).

#### L14-5-10 — Ví dụ: cận dưới và khe hở trong mô hình vô hướng

- **Loại:** ví dụ; một cột (hình `elbo-gap.svg` bỏ khi dựng deck, xem mục 8).
- **Mặt trang:**
  > **Ví dụ 14.7.** Dữ kiện: $p(z)=\mathcal N(0,1)$, $p_\theta(x\mid z)=\mathcal N(z,1)$, $x=2$, $q=\mathcal N(1,1/8)$. Tính $\mathcal L$, $\log p_\theta(2)$ và khe hở.
  > KL tới tiên nghiệm theo (7.5): $\frac1{16}+\frac32\log2\approx1{,}1022$.
  > Kỳ vọng tái tạo theo (7.6): $\mathbb E_q[(2-Z)^2]=\frac98$, cho $-\frac12\log(2\pi)-\frac9{16}$; $\mathcal L\approx-2{,}5837$.
  > Hoàn bình phương: $X\sim\mathcal N(0,2)$, $Z\mid X=2\sim\mathcal N(1,\tfrac12)$, $\log p_\theta(2)\approx-2{,}2655$.
  > Khe hở $\log2-\frac38\approx0{,}3181$, bằng $\mathrm{KL}\big(q\,\|\,\mathcal N(1,\tfrac12)\big)$ theo (7.4), đúng (7.3).
- **Ghi chú diễn giả:** $\mathcal L=-\frac12\log(2\pi)-\frac58-\frac32\log2$. Hoàn bình phương $-\frac{z^2}2-\frac{(x-z)^2}2=-(z-\frac x2)^2-\frac{x^2}4$, và $\int e^{-(z-x/2)^2}dz=\sqrt\pi$ cho $p_\theta(x)=e^{-x^2/4}/\sqrt{4\pi}$. Khe hở: $-\frac12\log2-1+\frac58+\frac32\log2=\log2-\frac38$. Diễn giải: hậu nghiệm xấp xỉ có đúng trung bình hậu nghiệm, nên toàn bộ khe hở đến từ phương sai $1/8$ nhỏ hơn $1/2$; KL tới tiên nghiệm ($\approx1{,}1022$) không cho thấy khe hở này.
- **Lý do · khoảng trống:** kiểm tra (7.3) bằng số trong mô hình mà biên và hậu nghiệm tính đúng được.
- **Nối:** L14-5-09 → L14-5-11.
- **Câu hỏi mạch · MT:** khe hở đúng bằng KL tới hậu nghiệm, bằng số; MT4, MT5.
- **Nguồn:** ghi chú dòng 952–1021.
- **Quyết định · phút:** thêm; 2,5.

#### L14-5-11 — Bài tập: phân kỳ và cận dưới bằng chứng

- **Loại:** bài tập có lời giải trên mặt trang (fragment, câu 4–5); câu 1–3 tự làm, đáp án trong ghi chú diễn giả; cụm "cận dưới bằng chứng".
- **Mặt trang:**
  > **Bài tập 14.2.** $p(z)=\mathcal N(0,1)$, $q(z\mid x)=\mathcal N(1,1/4)$, $p_\theta(x\mid z)=\mathcal N(z,1)$, $x=1$; câu 3 cho $\mathcal L=-\frac12\log(2\pi)-\frac14-\log2$.
  > **Câu hỏi:** (4) Tính biên $p_\theta(1)$ và hậu nghiệm $p_\theta(z\mid1)$ bằng hoàn bình phương. Tính KL tới hậu nghiệm để kiểm tra (7.3).
  > Mô tả cách sinh một quan sát mới mà không cần biết hậu nghiệm.
  > (5) Với cùng mô hình, đổi $q$ thành hậu nghiệm chính xác. Tính ELBO và KL tới tiên nghiệm mới,
  > rồi dùng kết quả để phân biệt cận chặt với KL tới tiên nghiệm nhỏ.
  > [fragment] **Lời giải:** (4) $\log p_\theta(1)=-\frac12\log(4\pi)-\frac14\approx-1{,}5155$, $p_\theta(z\mid1)=\mathcal N(\frac12,\frac12)$, KL $\frac12\log2$; $z\sim\mathcal N(0,1)$, $x'\sim\mathcal N(z,1)$. (5) $\mathcal L=\log p_\theta(1)$, KL tới tiên nghiệm $\frac12\log2-\frac18\approx0{,}2216>0$: cận chặt.
- **Ghi chú diễn giả:** Đáp án câu 1–3: KL tới tiên nghiệm $\frac18+\log2\approx0{,}8181$; $\mathbb E_q[(1-Z)^2]=\frac14$, kỳ vọng tái tạo $-\frac12\log(2\pi)-\frac18$, thay $Z$ bằng trung bình $1$ bỏ mất $\operatorname{Var}_q(Z)=\frac14$ trong lỗi, tức $-\frac18$ trong log-mật độ; $\mathcal L\approx-1{,}8621$. Câu 4: $-\frac{z^2}2-\frac{(1-z)^2}2=-(z-\frac12)^2-\frac14$; Bổ đề 14.17 với $a=1,\beta=\frac14,c=\frac12,\gamma=\frac12$. Quan sát mới có phương sai $2$, còn hậu nghiệm tại $x=1$ có phương sai $\frac12$: hai phân phối phục vụ hai phép tính khác nhau. Câu 5: kỳ vọng lỗi $(1-\frac12)^2+\frac12=\frac34$, kỳ vọng tái tạo $-\frac12\log(2\pi)-\frac38$.
- **Lý do · khoảng trống:** NT24 bài có lời giải cho cụm ELBO; câu 5 kiểm tra trực tiếp bảng hai vai trò của KL. Câu 1–3 lặp phép tính của Ví dụ 14.7 nên để tự làm.
- **Nối:** L14-5-10 → mạch 6.
- **Câu hỏi mạch · MT:** MT4, MT5.
- **Nguồn:** ghi chú dòng 1023–1110.
- **Quyết định · phút:** thêm; 3. Dòng "câu 3 cho …" nêu kết quả câu 3 của ghi chú để câu 4 tự chứa (mục 12, Q6). Ngoại lệ mật độ: 86 âm tiết (bảng đếm).

### Mạch 6. Bộ tự mã hóa biến phân (26 phút, 10 trang)

Câu hỏi của mạch: tối ưu cận dưới trên $n$ quan sát bằng gradient thế nào, và giá trị của mục tiêu cho phép kết luận gì về mô hình sinh? Phân rã: bộ mã hóa dùng chung / gradient qua mẫu / giới hạn của hai số hạng.

#### L14-6-00 — 6. Bộ tự mã hóa biến phân

- **Loại:** tiêu đề mạch; điểm vào mạch 6; `id="mach-6"`. Ngoài hành trình khái niệm.
- **Mặt trang:**
  > Cận dưới trở thành mục tiêu huấn luyện bằng gradient khi mã được viết như hàm của nhiễu chuẩn.
  > Suy luận dùng chung tham số · Tái tham số hóa · Gradient không chệch · Suy sụp hậu nghiệm
- **Ghi chú diễn giả:** Mạch nhận cận dưới (7.2) với hai số hạng có công thức (7.5) và (7.6). Còn hai vấn đề khi học từ $n$ quan sát: một hậu nghiệm xấp xỉ riêng cho mỗi quan sát làm số tham số tăng theo $n$, và kỳ vọng tái tạo phụ thuộc $\phi$ qua chính phân phối lấy mẫu. Mạch giải hai vấn đề đó, cho thuật toán huấn luyện và nêu điều mà giá trị của mục tiêu không chứng minh được.
- **Lý do · khoảng trống:** NT12.
- **Nối:** L14-5-11 → L14-6-01.
- **Câu hỏi mạch · MT:** MT5, MT6.
- **Nguồn:** ghi chú dòng 1112–1116.
- **Quyết định · phút:** thêm; 0,5.

#### L14-6-01 — Suy luận dùng chung tham số và mục tiêu học

- **Loại:** vấn đề + trực quan + định nghĩa; `grid2` với hình `vae-paths-wide.svg` (mục 8).
- **Mặt trang:**
  > Mỗi $x_i$ một cặp $(\mu_i,s_i)$: số biến tăng theo $n$.
  > **Trực quan.** Một mạng chung $x\mapsto(\mu_\phi(x),\sigma_\phi(x))$: suy luận dùng chung tham số (amortized inference).
  > **Định nghĩa 14.19.** Bộ tự mã hóa biến phân (variational autoencoder, VAE): (6.2), $q_\phi(z\mid x)=\mathcal N\big(\mu_\phi(x),\operatorname{diag}(\sigma_\phi^2(x))\big)$, mọi $\sigma_{\phi,j}(x)>0$, chung $\phi$, $\tau>0$ cố định;
  > $$\max_{\theta,\phi}\frac1n\sum_{i=1}^n\mathcal L(\theta,\phi;x_i).\tag{8.1}$$
  > **Câu hỏi:** Tối ưu (8.1) bằng gradient thế nào, giá trị mục tiêu cho biết gì về mô hình sinh?
  > [Hình: `img/lec-14/vae-paths-wide.svg`, bản không có hộp nhiễu (mục 8).]
- **Ghi chú diễn giả:** Định nghĩa của ghi chú có ba thành phần: mô hình sinh $p(z)$, $p_\theta(x\mid z)$; bộ mã hóa $x\mapsto q_\phi(\cdot\mid x)$ với cùng $\phi$; mục tiêu (8.1); lựa chọn Gaussian trên trang là trường hợp được dùng trong bài (Murphy (2023), §10.1.5). Với lựa chọn Gaussian và $\tau$ cố định, cực đại $\mathcal L$ tương đương cực tiểu $\mathbb E_{q_\phi}\|x-g_\theta(Z)\|_2^2/(2\tau^2)+\mathrm{KL}(q_\phi(\cdot\mid x)\,\|\,p)$: lỗi tái tạo bình phương kỳ vọng với mã lấy từ $q_\phi$, cộng số hạng kéo phân phối mã hóa về tiên nghiệm. KL tới tiên nghiệm không chứa $\theta$, còn kỳ vọng tái tạo chứa cả hai nhóm tham số. Hình: đường suy luận có điều kiện theo quan sát; đường sinh mẫu bắt đầu từ tiên nghiệm, không cần bộ mã hóa.
- **Lý do · khoảng trống:** NT8 vấn đề → trực quan → định nghĩa; hình hai đường tính của ghi chú (Hình 14.2).
- **Nối:** tiêu đề mạch → L14-6-02.
- **Câu hỏi mạch · MT:** phần "bộ mã hóa dùng chung"; MT5, MT6.
- **Nguồn:** ghi chú dòng 1116–1155, 1238–1240.
- **Quyết định · phút:** thêm; 3,5.

#### L14-6-02 — Tái tham số hóa

- **Loại:** kỹ thuật (lần đầu trong các deck của học phần, xem mục 11) + vấn đề.
- **Mặt trang:**
  > Với $h_\theta(z)=\log p_\theta(x\mid z)$, $\mathbb E_{q_\phi}[h_\theta(Z)]$ phụ thuộc $\phi$ qua phân phối của $Z$.
  > **Trực quan.** Nguồn ngẫu nhiên chuyển vào nhiễu $\varepsilon$; mẫu mã thành hàm khả vi của tham số.
  > **Kỹ thuật.** Tái tham số hóa (reparameterization trick), $\odot$: tích từng tọa độ: $$Z_\phi=\mu_\phi(x)+\sigma_\phi(x)\odot\varepsilon,\qquad\varepsilon\sim\mathcal N(0,I_k).\tag{8.2}$$
  > Dùng khi cần gradient theo tham số của phân phối lấy mẫu, như (8.1).
  > **Kỹ thuật.** Monte Carlo: $\mathbb E_q[h(Z)]\approx\frac1m\sum_{r=1}^mh(z^{(r)})$, các $z^{(r)}$ lấy độc lập từ $q$.
- **Ghi chú diễn giả:** Coi một mẫu $z$ đã rút là hằng số khi lấy đạo hàm theo $\phi$ thì bỏ mất sự thay đổi của phân phối mã hóa. Gradient theo $\theta$ đưa được vào trong kỳ vọng vì $q_\phi$ không chứa $\theta$; gradient theo $\phi$ thì không (Murphy (2023), §10.2). Phép tái tham số hóa chuyển nguồn ngẫu nhiên sang một biến nhiễu có phân phối không phụ thuộc tham số, rồi viết mẫu mã như một hàm của tham số. Monte Carlo thay kỳ vọng bằng trung bình mẫu; số hạng KL không cần Monte Carlo vì có (7.5).
- **Lý do · khoảng trống:** NT7, kỹ thuật dùng lại trong mệnh đề, thuật toán, ví dụ và bài tập của mạch.
- **Nối:** L14-6-01 → L14-6-03.
- **Câu hỏi mạch · MT:** phần "gradient qua mẫu"; MT5.
- **Nguồn:** ghi chú dòng 913, 1157–1159.
- **Quyết định · phút:** thêm; 2,5.

#### L14-6-03 — Tái tham số hóa Gaussian và gradient

- **Loại:** kết quả; `grid2` (Giả thiết bên trái, Kết luận bên phải).
- **Mặt trang:**
  > **Mệnh đề 14.20.** **Giả thiết:** $x$ cố định, $\vartheta=(\theta,\phi)$; **nhiễu:** $\varepsilon\sim\mathcal N(0,I_k)$ không phụ thuộc $\vartheta$; **mẫu mã:** (8.2), mọi $\sigma_{\phi,j}(x)>0$;
  > - **khả vi:** với hầu mọi $\varepsilon$, $F(\vartheta,\varepsilon)=h_\theta(Z_\phi)$ khả vi liên tục theo $\vartheta$ trên hình cầu mở $\mathcal B$;
  > - **chặn khả tích:** $\|\nabla_\vartheta F\|_2\le G(\varepsilon)$ trên $\mathcal B$, $\mathbb E[G]<\infty$; **khả tích:** $\mathbb E|F(\vartheta_0,\varepsilon)|<\infty$, $\vartheta_0\in\mathcal B$.
  > **Kết luận:** $Z_\phi\sim q_\phi(\cdot\mid x)$, $\mathbb E_{q_\phi}[h(Z)]=\mathbb E_\varepsilon[h(Z_\phi)]$ với mọi $h$ có kỳ vọng hữu hạn; trên $\mathcal B$: $$\nabla_\vartheta\,\mathbb E_{q_\phi}[h_\theta(Z)]=\mathbb E_\varepsilon\big[\nabla_\vartheta h_\theta(Z_\phi)\big].\tag{8.3}$$
  > Với $\varepsilon^{(r)}$ độc lập cùng phân phối $\mathcal N(0,I_k)$, $\frac1m\sum_{r=1}^m\nabla_\vartheta h_\theta\big(\mu_\phi(x)+\sigma_\phi(x)\odot\varepsilon^{(r)}\big)$ không chệch cho vế trái của (8.3).
- **Ghi chú diễn giả:** Kết luận thứ nhất đúng với mọi hàm $h$ có kỳ vọng hữu hạn. Ba giả thiết khả vi, chặn khả tích, khả tích chỉ dùng cho phép đổi đạo hàm và kỳ vọng. Trong học máy, mệnh đề cho đường tính gradient từ bộ giải mã, qua mẫu mã (8.2), tới các đầu ra $\mu_\phi(x)$, $\sigma_\phi(x)$ của bộ mã hóa (Murphy (2023), §10.2.1); ước lượng với $m$ hữu hạn vẫn có phương sai.
- **Lý do · khoảng trống:** kết quả chính của mạch (MT5 "điều kiện đưa gradient vào trong kỳ vọng"); giữ đủ năm nhãn giả thiết (NT2).
- **Nối:** L14-6-02 → L14-6-04.
- **Câu hỏi mạch · MT:** gradient qua mẫu là không chệch; MT5.
- **Nguồn:** ghi chú dòng 1161–1190, 1236.
- **Quyết định · phút:** thêm; 3,5. Giữ đủ năm nhãn giả thiết trong trần 60 (bảng đếm).

#### L14-6-04 — Ý tưởng chứng minh: tái tham số hóa Gaussian

- **Loại:** ý tưởng chứng minh.
- **Mặt trang:**
  > 1. Giả thiết $\sigma_{\phi,j}(x)>0$: qua hàm phân phối của $\mathcal N(0,1)$, $\mu_j+\sigma_j\varepsilon_j\sim\mathcal N(\mu_j,\sigma_j^2)$; các $\varepsilon_j$ độc lập nên $Z_\phi\sim q_\phi(\cdot\mid x)$.
  > 2. Đổi biến, định thức Jacobi $\prod_j\sigma_{\phi,j}(x)>0$: $$\mathbb E_{q_\phi}[h(Z)]=\mathbb E_\varepsilon\big[h(\mu_\phi(x)+\sigma_\phi(x)\odot\varepsilon)\big].$$
  > 3. Khả vi, chặn khả tích, khả tích và hội tụ trội (dominated convergence theorem): đổi đạo hàm, kỳ vọng.
  > 4. Tuyến tính của kỳ vọng cho tính không chệch.
  > **Lưu ý:** mã rời rạc và ReLU nằm ngoài giả thiết.
- **Ghi chú diễn giả:** $\Phi$ và $\rho$ là hàm phân phối và mật độ của $\mathcal N(0,1)$; phép chia cho $\sigma>0$ giữ chiều bất đẳng thức, đó là chỗ dùng giả thiết độ lệch chuẩn dương. Bước 2 dùng $q_\phi(z\mid x)\prod_j\sigma_{\phi,j}=\prod_j\rho(\varepsilon_j)$. Bước 3: giả thiết khả tích tại $\vartheta_0$ cùng hàm chặn $G$ cho $F$ khả tích trên cả $\mathcal B$; thương sai phân $D_\delta$ thỏa $|D_\delta|\le G$ nên giới hạn chuyển được vào trong kỳ vọng (ghi chú, Phụ lục B). Phần theo $\phi$ của gradient là $(\nabla_\phi Z_\phi)^\top\nabla_zh_\theta(Z_\phi)$.
- **Lý do · khoảng trống:** NT6, 4 bước, bước then chốt ở công thức hiển thị, chỗ dùng từng giả thiết; bỏ giả thiết thì hỏng ở đâu.
- **Nối:** L14-6-03 → L14-6-06.
- **Câu hỏi mạch · MT:** MT5 (chứng minh).
- **Nguồn:** ghi chú dòng 1192–1236, 1530–1558.
- **Quyết định · phút:** thêm; 3.

#### L14-6-05 — Huấn luyện bộ tự mã hóa biến phân

- **Loại:** thuật toán (ứng dụng của mạch 5–6).
- **Mặt trang:**
  > **Thuật toán 14.21.** **Đầu vào:** $x_1,\ldots,x_n\in\mathbb R^d$; $k$, $\tau^2$; mạng $\mu_\phi$, $\log\sigma_\phi^2$, $g_\theta$; bước học $\alpha>0$, cỡ nhóm $b$, số mẫu nhiễu $m$, số vòng lặp $T$.
  > 1. Chọn ngẫu nhiên một nhóm $I$ gồm $b$ chỉ số.
  > 2. Với $i\in I$: lấy $\varepsilon^{(i,r)}\sim\mathcal N(0,I_k)$ độc lập, $z^{(i,r)}=\mu_\phi(x_i)+\sigma_\phi(x_i)\odot\varepsilon^{(i,r)}$, $r=1,\ldots,m$.
  > 3. $$\widehat{\mathcal L}_i=-\frac d2\log(2\pi\tau^2)-\frac1m\sum_{r=1}^m\frac{\|x_i-g_\theta(z^{(i,r)})\|_2^2}{2\tau^2}-\mathrm{KL}\big(q_\phi(\cdot\mid x_i)\,\|\,p\big),\quad\widehat{\mathcal L}_I=\frac1b\sum_{i\in I}\widehat{\mathcal L}_i.$$
  > 4. Lan truyền ngược, coi $\varepsilon^{(i,r)}$ là hằng số; cập nhật đồng thời $\theta\leftarrow\theta+\alpha\nabla_\theta\widehat{\mathcal L}_I$, $\phi\leftarrow\phi+\alpha\nabla_\phi\widehat{\mathcal L}_I$.
  > **Đầu ra:** $\theta$, $\phi$ sau $T$ vòng lặp; mỗi vòng $b$ lần chạy bộ mã hóa, $bm$ lần chạy bộ giải mã.
- **Ghi chú diễn giả:** Khởi tạo $\theta$, $\phi$ tùy chọn; bốn bước lặp với $t=1,\ldots,T$. KL ở bước 3 tính bằng (7.5), kỳ vọng tái tạo thay bằng trung bình trên $m$ mẫu mã. Theo Mệnh đề 14.20, với nhóm $I$ cố định, kỳ vọng theo nhiễu của gradient ở bước 4 bằng gradient của $b^{-1}\sum_{i\in I}\mathcal L(\theta,\phi;x_i)$. Hai nhóm tham số cập nhật cùng bước vì cùng ảnh hưởng kỳ vọng tái tạo: với $\theta$ cố định, một bước tăng $\mathcal L$ theo $\phi$ thu hẹp khe hở (7.3); bước theo $\theta$ đổi chính mô hình sinh, nên khe hở có thể tăng hoặc giảm. Thuật toán không bảo đảm hội tụ tới cực đại toàn cục của (8.1). Chi phí gồm cả lan truyền ngược qua các lần chạy đó.
- **Lý do · khoảng trống:** NT8 bước ứng dụng: ghép Mệnh đề 14.18, (7.6) và Mệnh đề 14.20 thành phương pháp; đầu vào, đầu ra, bước, điều kiện dừng, chi phí.
- **Nối:** L14-6-06 → L14-6-07 (giá trị của mục tiêu cho biết gì).
- **Câu hỏi mạch · MT:** "tối ưu bằng gradient thế nào"; MT5.
- **Nguồn:** ghi chú dòng 1242–1273.
- **Quyết định · phút:** thêm; 3,5. Công thức bước 3 cần `aligned` ở 390 px.

#### L14-6-06 — Ví dụ: mẫu tái tham số hóa và gradient theo hai tham số

- **Loại:** ví dụ.
- **Mặt trang:**
  > **Ví dụ 14.8.** Dữ kiện: $k=d=1$; $\mu=1$, $\sigma=2$; $p_\theta(x\mid z)=\mathcal N(z,1)$, $x=0$, nên $h(z)=\log\mathcal N(0;z,1)=-\frac12\log(2\pi)-\frac{z^2}2$; nhiễu $\varepsilon=-1,0,1$. Tính đạo hàm theo đường mẫu.
  > $z=1+2\varepsilon$; quy tắc dây chuyền: $\partial h/\partial\mu=-z$, $\partial h/\partial\sigma=-z\varepsilon$.
  > | $\varepsilon$ | $z$ | $\partial h/\partial\mu$ | $\partial h/\partial\sigma$ |
  > | $-1$ | $-1$ | $1$ | $-1$ |
  > | $0$ | $1$ | $-1$ | $0$ |
  > | $1$ | $3$ | $-3$ | $-3$ |
  > Trung bình ba mẫu: $-1$ và $-4/3$; gradient chính xác $(-\mu,-\sigma)=(-1,-2)$.
  > **Diễn giải:** ba nhiễu có trung bình bình phương $2/3$ thay vì $1$; không chệch là phát biểu về kỳ vọng.
- **Ghi chú diễn giả:** $p_\theta(x\mid z)=\mathcal N(z,1)$ nên $h(z)=\log\mathcal N(0;z,1)$, $h'(z)=-z$, $\partial z/\partial\mu=1$, $\partial z/\partial\sigma=\varepsilon$. Gradient chính xác: $\mathbb E[Z^2]=\mu^2+\sigma^2$ (Mệnh đề 10.24). Kiểm tra: $\partial h/\partial\mu=-\mu-\sigma\varepsilon$, $\partial h/\partial\sigma=-\mu\varepsilon-\sigma\varepsilon^2$; cột theo $\mu$ đúng $-1$ vì trung bình nhiễu bằng $0$, cột theo $\sigma$ cho $-\sigma\cdot\frac23=-\frac43$. Bài tập 14.3 lặp phép tính này với $\mu=2$, $\sigma=\frac12$, $\varepsilon=-1,0,2$ (bài về nhà).
- **Lý do · khoảng trống:** NT23, ví dụ tính tay cho (8.2)–(8.3).
- **Nối:** L14-6-04 → L14-6-05.
- **Câu hỏi mạch · MT:** gradient qua mẫu bằng số; MT5.
- **Nguồn:** ghi chú dòng 1275–1297.
- **Quyết định · phút:** thêm; 2,5.

#### L14-6-07 — Giới hạn của mục tiêu

- **Loại:** nhận xét (giới hạn).
- **Mặt trang:**
  > **Nhận xét 14.22.** Lỗi tái tạo chỉ kiểm tra bộ giải mã tại mã lấy từ $q_\phi(\cdot\mid x_i)$.
  > Sinh mẫu từ $p(z)$: cần kiểm tra bộ giải mã trên vùng đó, dữ liệu mới.
  > KL tới tiên nghiệm nhỏ: $q_\phi(\cdot\mid x)\approx p(z)$, mã gần như không phụ thuộc $x$.
  > Bộ giải mã cũng bỏ qua $z$: cận chặt, biến ẩn bị bỏ: suy sụp hậu nghiệm (posterior collapse).
- **Ghi chú diễn giả:** Khi bộ giải mã bỏ qua $z$, hậu nghiệm thật bằng tiên nghiệm, nên $q_\phi=p(z)$ làm KL tới hậu nghiệm bằng $0$ (Murphy (2023), §21.4). Ngoài vùng mã của tiên nghiệm, mô hình còn cần được kiểm tra trên dữ liệu mới. Cận chặt không nói mô hình khớp dữ liệu. Phần sau kiểm tra điều này trên một mô hình có KL bằng $0$, cận chặt và mômen bậc hai khớp.
- **Lý do · khoảng trống:** MT6 "chẩn đoán trường hợp lỗi tái tạo nhỏ hoặc phân kỳ nhỏ vẫn đi cùng mô hình sinh kém"; giới hạn áp dụng của khung chung.
- **Nối:** L14-6-05 → L14-6-08.
- **Câu hỏi mạch · MT:** "giá trị của mục tiêu cho phép kết luận gì"; MT6.
- **Nguồn:** ghi chú dòng 1352–1360.
- **Quyết định · phút:** thêm; 2,5.

#### L14-6-08 — Bài tập: phân kỳ bằng không, mômen khớp và mô hình sai

- **Loại:** bài tập (đề); lời giải ở trang kế tiếp cùng tiêu đề; cụm "bộ tự mã hóa biến phân".
- **Mặt trang:**
  > **Bài tập 14.4.** Dữ liệu một chiều nhận $-2$ hoặc $2$ với xác suất bằng nhau; $p(z)=q_\phi(z\mid x)=\mathcal N(0,1)$ với mọi $x$, $p_\theta(x\mid z)=\mathcal N(0,4)$ không phụ thuộc $z$.
  > **Câu hỏi:** (1) Tính KL tới tiên nghiệm, log-mật độ giải mã và ELBO tại hai quan sát.
  > (2) Xác định hậu nghiệm và phân phối biên của mô hình. Cận có chặt không?
  > (3) So sánh $\mathbb E[X^2]$, xác suất của khoảng $(-1,1)$ dưới mô hình và dưới dữ liệu.
  > (4) Đánh giá kết luận "KL bằng $0$, cận chặt và mômen bậc hai khớp nên mô hình sinh tốt".
- **Ghi chú diễn giả:** Gợi ý của ghi chú: khi $p_\theta(x\mid z)$ không phụ thuộc $z$, mật độ đồng thời là tích $p_\theta(x)p(z)$; dùng (6.3). Với $X\sim\mathcal N(0,4)$, $X/2\sim\mathcal N(0,1)$, nên $\mathbb P(|X|<1)=2\Phi(1/2)-1$ với $\Phi$ là hàm phân phối chuẩn.
- **Lý do · khoảng trống:** NT24 bài có lời giải cho cụm VAE; kiểm tra Nhận xét 14.22 bằng số.
- **Nối:** L14-6-07 → L14-6-09.
- **Câu hỏi mạch · MT:** MT6.
- **Nguồn:** ghi chú dòng 1362–1375.
- **Quyết định · phút:** thêm; 2. Ngoại lệ mật độ: 86 âm tiết (bảng đếm); đề giữ đủ câu chữ.

#### L14-6-09 — Bài tập: phân kỳ bằng không, mômen khớp và mô hình sai

- **Loại:** lời giải (trang kế tiếp cùng tiêu đề).
- **Mặt trang:**
  > **Lời giải:**
  > 1. $q_\phi=p$ nên KL bằng $0$; $\log\mathcal N(\pm2;0,4)=-\frac12\log(8\pi)-\frac12\approx-2{,}1121$ không phụ thuộc $z$, bằng ELBO.
  > 2. Theo (6.3), $p_\theta(z\mid x)=p(z)$; biên $\mathcal N(0,4)$; $q_\phi$ trùng hậu nghiệm nên cận chặt.
  > 3. $\mathbb E[X^2]=4$ ở cả hai; với $\Phi$ hàm phân phối của $\mathcal N(0,1)$, $\mathbb P(|X|<1)=2\Phi(1/2)-1\approx0{,}3829$ dưới mô hình, $0$ dưới dữ liệu.
  > 4. Kết luận sai: một Gaussian đơn đặt khoảng $38\%$ xác suất vào $(-1,1)$, không biểu diễn được hai giá trị tách biệt.
- **Ghi chú diễn giả:** Mật độ của mô hình lớn nhất tại $0$, nơi dữ liệu không bao giờ xuất hiện. Cả ba đại lượng KL, khe hở và mômen bậc hai đều không phát hiện sự lệch này. Kiểm tra: $\frac12\log(8\pi)\approx\frac12(2{,}0794+1{,}1447)=1{,}6121$. Cảm biến hai cụm (Tình huống 14.2) cho cùng hiện tượng: đầu ra $(\pm3,0)^\top$, bộ giải mã $\mathcal N((0,0)^\top,I_2)$ bỏ qua $z$, ELBO $=-\log(2\pi)-\frac92\approx-6{,}3379$ đúng bằng log-mật độ biên. Dữ liệu có $\mathbb E[X_1^2]=9$, mô hình có $1$. Giảm phân kỳ không sửa được giả thiết sai; cần đổi họ mô hình hoặc cách dùng biến ẩn, rồi đánh giá trên quan sát mới.
- **Lý do · khoảng trống:** NT24 "Lời giải:" trên mặt trang, mỗi dòng một bước.
- **Nối:** L14-6-08 → mạch 7.
- **Câu hỏi mạch · MT:** trả lời "giá trị của mục tiêu cho phép kết luận gì"; MT6.
- **Nguồn:** ghi chú dòng 1377–1387, 1411–1419.
- **Quyết định · phút:** thêm; 2,5.

### Mạch 7. Tổng kết (12 phút, 9 trang)

#### L14-7-00 — 7. Tổng kết

- **Loại:** tiêu đề mạch; điểm vào mạch 7; `id="mach-7"`.
- **Mặt trang:**
  > Phân tích thành phần chính, bộ tự mã hóa và bộ tự mã hóa biến phân tối ưu ba đại lượng khác nhau.
  > Lỗi chiếu · Lỗi tái tạo · Cận dưới bằng chứng
- **Ghi chú diễn giả:** Mạch nhận các kết quả của mạch 2–6. Việc của mạch: đặt các kết quả cạnh giả thiết không được bỏ, trả lời câu hỏi trung tâm cho cả bài, kiểm tra bằng một bài tập nối PCA với mô hình sinh, rồi giao bài và tài liệu. Ba đại lượng là lỗi chiếu trực giao bình phương, lỗi tái tạo của hợp hai ánh xạ và cận dưới bằng chứng.
- **Lý do · khoảng trống:** NT12, NT15.
- **Nối:** L14-6-09 → L14-7-01.
- **Câu hỏi mạch · MT:** MT6.
- **Nguồn:** ghi chú dòng 1427–1431.
- **Quyết định · phút:** thêm; 0,5.

#### L14-7-01 — Kết quả và giả thiết của bài toán nén

- **Loại:** bảng tổng kết (trần 80).
- **Mặt trang:**
  > | Kết quả | Giả thiết không được bỏ | Công thức hoặc thuật toán |
  > | Hướng chính (14.3) | $S$ hiệp phương sai thực nghiệm; $\|u\|_2=1$ | $\max u^\top Su=\lambda_1$ |
  > | Lỗi tái tạo (14.4, 14.6) | tâm hóa; $U^\top U=I_k$ | (4.4); $\min\widehat J=\sum_{j>k}\lambda_j$ |
  > | Bộ tự mã hóa tuyến tính (14.8) | mọi nghiệm: $k<d$, $\lambda_k>\lambda_{k+1}$, $y_i$ sinh $\mathbb R^d$ | $(V_k^\top,V_k)$; $(RA,BR^{-1})$ |
  > | Mô hình biến ẩn (14.10) | mật độ chuẩn hóa; $\tau>0$ | (6.1), (6.3) |
  > | Phân rã log-hợp lý (14.15) | $0<p_\theta(x)<\infty$; miền hỗ trợ; kỳ vọng hữu hạn | (7.3) |
  > | Phân kỳ Gaussian (14.18) | mọi $s_j>0$; $p=\mathcal N(0,I_k)$ | (7.5) |
  > | Tái tham số hóa (14.20) | nhiễu không chứa tham số; $\sigma_{\phi,j}>0$; khả vi liên tục; chặn khả tích; khả tích | (8.3); Thuật toán 14.21 |
- **Ghi chú diễn giả:** Ba công thức nối toàn bài là lỗi chiếu (4.4), mật độ biên (6.1) và phân rã (7.3). Trong (7.3), KL tới hậu nghiệm là khe hở của cận; trong mục tiêu (7.2), KL tới tiên nghiệm tính được bằng công thức đóng. Giả thiết Bổ đề 14.13 (hai mật độ chuẩn hóa) nằm trong giả thiết của Định lý 14.15. Giới hạn chung: lỗi tái tạo nhỏ hay KL nhỏ không chứng minh mô hình sinh tốt.
- **Lý do · khoảng trống:** NT15 bảng `Kết quả | Giả thiết không được bỏ | Công thức hoặc thuật toán`, mỗi kết quả chính một hàng.
- **Nối:** tiêu đề mạch → L14-7-03.
- **Câu hỏi mạch · MT:** MT1–MT5.
- **Nguồn:** ghi chú dòng 1433–1443.
- **Quyết định · phút:** thêm; 2. Nếu bảng vượt 80 âm tiết hoặc chạm chân trang ở 1600×900, tách thành "Kết quả và giả thiết: nén dữ liệu" (ba hàng đầu) và "…: mô hình sinh" (bốn hàng sau), tổng 60 trang.

#### L14-7-02 — Kết quả và giả thiết của mô hình sinh

- **Loại:** bảng tổng kết (phần hai, tách từ L14-7-01 theo phương án của trang đó).
- **Mặt trang:** bốn hàng sau của bảng L14-7-01 (Mô hình biến ẩn, Phân rã log-hợp lý, Phân kỳ Gaussian, Tái tham số hóa), cùng cột; hàng cuối ghi "(8.3), ước lượng không chệch; Thuật toán 14.21".
- **Ghi chú diễn giả:** hai công thức nối (6.1), (7.3); hai vai trò của KL; loại bảo đảm của (7.3), (8.3).
- **Nối:** L14-7-01 → L14-7-03. **Nguồn:** ghi chú §9. **Quyết định · phút:** tách; 1 (L14-7-01 còn 1).

#### L14-7-03 — Vấn đề trung tâm

- **Loại:** câu trả lời cho câu hỏi trung tâm của cả bài (trần 80).
- **Mặt trang:**
  > - Phân tích thành phần chính: không gian con tuyến tính có lỗi chiếu trực giao nhỏ nhất trên mẫu.
  > - Bộ tự mã hóa: hai ánh xạ theo lỗi tái tạo; tuyến tính thì như PCA, mã không duy nhất.
  > - Bộ tự mã hóa biến phân: mô hình sinh xác suất, học bằng cận dưới bằng chứng.
  > - Bốn quan sát: PCA giữ $u=(1,0)^\top$, lỗi $1/2$; mô hình sinh $(\sqrt{3/2}\,z+\eta_1,\eta_2)^\top$, $z\sim\mathcal N(0,1)$, $\eta_j\sim\mathcal N(0,\tfrac12)$, có hiệp phương sai $S$.
- **Ghi chú diễn giả:** Các bước của bài: (1) Mệnh đề 14.3 chọn hướng riêng có phương sai lớn nhất, Mệnh đề 14.4 chứng minh hướng đó cực tiểu lỗi chiếu. (2) Mệnh đề 14.8: tọa độ mã không duy nhất; Ví dụ 14.4: bộ tự mã hóa không chứa phân phối để sinh. (3) Định nghĩa 14.10 thêm tiên nghiệm và phân phối quan sát; tích phân biên khó tính. (4) Định lý 14.15 thay log-hợp lý bằng ELBO, khe hở là KL tới hậu nghiệm. (5) Mệnh đề 14.18 và 14.20 làm ELBO tối ưu được bằng gradient. Với bốn quan sát (Tình huống 14.1), tổng phương sai của mô hình $2+\frac12=\operatorname{tr}(S)$; khớp hiệp phương sai không chứng minh phân phối Gaussian là cơ chế tạo ra bốn quan sát.
- **Lý do · khoảng trống:** NT15 trang "Vấn đề trung tâm" trả lời cho cả bài, không theo mạch.
- **Nối:** L14-7-01 → L14-7-04.
- **Câu hỏi mạch · MT:** toàn bài; MT6.
- **Nguồn:** ghi chú dòng 1395–1409, 1427–1433.
- **Quyết định · phút:** thêm; 2.

#### L14-7-04 — Bài tập: phương sai của PCA xác suất

- **Loại:** bài tập tổng hợp (đề); lời giải ở trang kế tiếp.
- **Mặt trang:**
  > **Bài tập 14.5.** PCA xác suất (probabilistic PCA, PPCA), $1\le k<d$: $p(z)=\mathcal N(0,I_k)$, $p(x\mid z)=\mathcal N(Wz+\mu,\tau^2I_d)$, $W\in\mathbb R^{d\times k}$, $\tau>0$; mật độ biên $\mathcal N(\mu,C)$ với $C=WW^\top+\tau^2I_d$.
  > Nghiệm hợp lý cực đại, với $\Lambda_k=\operatorname{diag}(\lambda_1,\ldots,\lambda_k)$ và $R\in\mathbb R^{k\times k}$ trực giao:
  > $$W=V_k(\Lambda_k-\tau^2I_k)^{1/2}R,\qquad\tau^2=\frac1{d-k}\sum_{j=k+1}^d\lambda_j.$$
  > Phương sai của mô hình theo hướng đơn vị $v$ là $v^\top Cv$.
  > **Câu hỏi:** (1) Với $v^\top V_k=0$, chứng minh $v^\top Cv=\tau^2$. (2) Với $v=v_i$, $1\le i\le k$, chứng minh $v^\top Cv=(\lambda_i-\tau^2)+\tau^2=\lambda_i$.
- **Ghi chú diễn giả:** Bài nối hai nửa của bài: trị riêng của PCA (mạch 2) và mô hình sinh có biến ẩn tuyến tính Gaussian (mạch 4). Gợi ý của `exercises.md`: tính $WW^\top$ trước, dùng $RR^\top=I_k$, rồi tính $V_k^\top v$ trong từng trường hợp. Nguồn: Murphy (2022), Bài 20.6; (20.41)–(20.46).
- **Lý do · khoảng trống:** NT15 bài tập tổng hợp lấy từ bài tập của bài; nối PCA với mô hình sinh, trả lời câu hỏi trung tâm "dùng biểu diễn để mô hình hóa".
- **Nối:** L14-7-03 → L14-7-05.
- **Câu hỏi mạch · MT:** MT1, MT3.
- **Nguồn:** `exercises.md` dòng 21–39.
- **Quyết định · phút:** thêm; 1,5. Lựa chọn bài tổng hợp chờ duyệt (mục 12, Q7).

#### L14-7-05 — Bài tập: phương sai của PCA xác suất

- **Loại:** lời giải (trang kế tiếp cùng tiêu đề).
- **Mặt trang:**
  > **Lời giải:** $\Lambda_k-\tau^2I_k$ chéo và $RR^\top=I_k$, nên $WW^\top=V_k(\Lambda_k-\tau^2I_k)V_k^\top$.
  > Đặt $a=V_k^\top v$: $v^\top Cv=a^\top(\Lambda_k-\tau^2I_k)a+\tau^2v^\top v$.
  > (1) $a=0$, $v^\top v=1$: $v^\top Cv=\tau^2$. (2) $a=e_i$, vector đơn vị thứ $i$: $v_i^\top Cv_i=(\lambda_i-\tau^2)+\tau^2=\lambda_i$.
  > Kiểm tra trên bốn quan sát, $k=1$: $\tau^2=\tfrac12$, $W=\sqrt{3/2}\,v_1$, $C=\operatorname{diag}(2,\tfrac12)=S$.
  > **Diễn giải:** theo hướng chính, mô hình có đúng phương sai $\lambda_i$; theo hướng vuông góc, chỉ có $\tau^2$.
- **Ghi chú diễn giả:** Căn bậc hai xác định vì $\tau^2$ là trung bình của $\lambda_{k+1},\ldots,\lambda_d$, nên $\tau^2\le\lambda_{k+1}\le\lambda_j$ với mọi $j\le k$. Biến ẩn đóng góp $\lambda_i-\tau^2$, nhiễu đóng góp $\tau^2$. Phép kiểm tra khớp mô hình tuyến tính Gaussian hai chiều của mạch 4 ($w^2=\frac32$, $\tau^2=\frac12$).
- **Lý do · khoảng trống:** NT15 "Lời giải:" trên mặt trang.
- **Nối:** L14-7-04 → L14-7-06.
- **Câu hỏi mạch · MT:** MT1, MT3.
- **Nguồn:** `exercises.md` dòng 41–83.
- **Quyết định · phút:** thêm; 2,5.

#### L14-7-06 — Câu hỏi tự kiểm tra

- **Loại:** câu hỏi tự kiểm tra (đáp án ở ghi chú diễn giả).
- **Mặt trang:**
  > **Câu hỏi:** Biến ẩn $Z$ cho phép làm gì mà bộ tự mã hóa tất định không làm được?
  > **Câu hỏi:** Hợp lý cực đại cần đại lượng nào không tính được, thay bằng gì, sai khác bao nhiêu?
  > **Câu hỏi:** VAE có KL tới tiên nghiệm bằng $0$ tại mọi $x_i$: mã mang thông tin gì, mẫu sinh tốt không?
- **Ghi chú diễn giả:** (1) Một cơ chế sinh dữ liệu mới: $z\sim p(z)$ rồi $x\sim p_\theta(x\mid z)$; bộ tự mã hóa tất định không chỉ định phân phối của mã, nên cùng bộ giải mã đi với nhiều cơ chế sinh (Ví dụ 14.4). (2) $\log p_\theta(x)$, chứa tích phân (6.1); thay bằng ELBO (7.2); $\log p_\theta(x)-\mathcal L=\mathrm{KL}(q_\phi(\cdot\mid x)\,\|\,p_\theta(\cdot\mid x))\ge0$, và Mệnh đề 14.20 cho phép tối ưu ELBO bằng gradient. (3) KL bằng $0$ cho $q_\phi(\cdot\mid x_i)=p(z)$ hầu khắp nơi: phân phối của mã không phụ thuộc quan sát, mã không mang thông tin riêng của $x_i$; không kết luận được về mẫu sinh (Bài tập 14.4, cảm biến hai cụm).
- **Lý do · khoảng trống:** NT15, 3 câu theo "Câu hỏi cuối buổi" của ghi chú, trả lời được chỉ bằng ghi chú.
- **Nối:** L14-7-05 → L14-7-07.
- **Câu hỏi mạch · MT:** MT3, MT4, MT6.
- **Nguồn:** ghi chú dòng 1460–1472.
- **Quyết định · phút:** thêm; 2.

#### L14-7-07 — Bài tập về nhà

- **Loại:** bài tập về nhà (bảng `Mục | Bài tập`, trần 80). Liên kết dòng cuối: `material-viewer.html?doc=materials/lec-14/lecture-note.md&deck=lecture-14-hoc-bieu-dien-mo-hinh-sinh.html` và `material-viewer.html?doc=materials/lec-14/exercises.md&deck=lecture-14-hoc-bieu-dien-mo-hinh-sinh.html`.
- **Mặt trang:**
  > | Mục | Bài tập |
  > | 2. Phân tích thành phần chính | 14.6, 14.7, 14.10 |
  > | 4. Mô hình sinh có biến ẩn | 14.1 (trên lớp), 14.5 (trên lớp), 14.8, 14.9 |
  > | 5. Cận dưới bằng chứng | 14.2 (câu 4–5 trên lớp), 14.11 |
  > | 6. Bộ tự mã hóa biến phân | 14.3, 14.4 (trên lớp) |
  > Ghi chú bài giảng · Bài tập
- **Ghi chú diễn giả:** Mỗi bài được xếp vào mạch cung cấp kiến thức cuối cùng bài cần: 14.1 câu 4 cần mô hình (6.2); 14.5 cần mật độ biên của mô hình tuyến tính Gaussian; 14.8, 14.9 dùng hoàn bình phương; 14.11 so sánh KL thuận và KL ngược; 14.3 cần Mệnh đề 14.20 và (7.5); 14.4 cần Nhận xét 14.22. Bài 14.1–14.4 nằm trong ghi chú, 14.5–14.11 trong tệp bài tập, mỗi bài có gợi ý và lời giải.
- **Lý do · khoảng trống:** NT15 bảng `Mục | Bài tập`, đủ 11 bài.
- **Nối:** L14-7-06 → L14-7-08.
- **Câu hỏi mạch · MT:** MT1–MT6.
- **Nguồn:** ghi chú dòng 1445–1458; `exercises.md` dòng 13–18.
- **Quyết định · phút:** thêm; 1. Mạch 3 không có hàng: bài 14.1 cần (6.2) ở câu 4.

#### L14-7-08 — Tài liệu tham khảo

- **Loại:** tài liệu tham khảo, trang cuối.
- **Mặt trang:**
  > - Murphy (2022), *Probabilistic Machine Learning: An Introduction*: §20.1, §6.2.3–6.2.4, §20.3, §20.3.5, §20.2.2.
  > - Murphy (2023), *Probabilistic Machine Learning: Advanced Topics*: §10.1.1, §10.1.5, §10.2.1, §21.1–§21.2, §21.4.
  > - Kingma và Welling, *Auto-Encoding Variational Bayes*, arXiv:1312.6114: §2.2–§2.4, §3.
  > Bài toán quyết định tuần tự có trạng thái không quan sát đủ cần suy luận về biến ẩn.
  > Mô hình biến ẩn, hậu nghiệm và suy luận biến phân là công cụ cho việc đó.
- **Ghi chú diễn giả:** Trước buổi học: Murphy (2022), §20.1, đặc biệt §20.1.2, và §6.2.3–6.2.4. Sau buổi học: Murphy (2022), §20.1.4.1, §20.3, §20.3.1, §20.3.5; Murphy (2023), §10.1.1, §10.1.5, §10.2.1, §21.1–§21.2 (gồm §21.2.1–§21.2.3). Mở rộng: Murphy (2022), §20.2.2; Murphy (2023), §10.1.6, §21.3.1, §21.4; Kingma và Welling. Dòng nối: khi quan sát không bộc lộ đầy đủ trạng thái của một bài toán quyết định tuần tự như ở Bài 13, mô hình có biến ẩn (6.1), hậu nghiệm (6.3) và suy luận biến phân là các công cụ cho nhu cầu đó. Bài 10–14 trả lời năm câu hỏi về vai trò của toán học trong AI; Bài 14: biến ẩn cho cơ chế sinh, Định lý 14.15 thay tích phân khó tính bằng một cận dưới tối ưu được.
- **Lý do · khoảng trống:** NT15 trang cuối "Tài liệu tham khảo" + dòng nối theo "Câu hỏi cuối buổi và cầu nối" (Bài 14 là bài cuối, không dẫn bài sau).
- **Nối:** L14-7-07 → —.
- **Câu hỏi mạch · MT:** —.
- **Nguồn:** ghi chú dòng 1474–1488.
- **Quyết định · phút:** thêm; 0,5. Không đặt URL trên mặt trang (AGENTS §"Những điểm của MAT1101 không áp dụng"). Ngoại lệ mật độ: 69 âm tiết (tên sách, số mục).

### Thời lượng theo mạch

| Mạch | Trang | Phút |
|---|---:|---:|
| 1. Mở đầu | 5 | 6 |
| 2. Phân tích thành phần chính | 10 | 22 |
| 3. Bộ tự mã hóa tất định | 7 | 14 |
| 4. Mô hình sinh có biến ẩn | 7 | 14 |
| 5. Cận dưới bằng chứng | 12 | 26 |
| 6. Bộ tự mã hóa biến phân | 10 | 26 |
| 7. Tổng kết | 9 | 12 |
| Tổng | 60 | 120 |

### Bảng đếm mật độ (đếm lại bằng quy tắc của `deck_lint.py` sau biên tập, 2026-11-16)

Cột: âm tiết mặt trang (KaTeX, tiêu đề, số trong bảng không tính); số dòng (p, li, công thức hiển thị, mỗi bảng một dòng); số công thức hiển thị; số hộp "Câu hỏi". Ngoại lệ và lý do: mục "Biên tập theo năm báo cáo duyệt" cuối tệp.

| Trang | Âm tiết | Dòng | Công thức | Hộp | Ghi chú |
|---|---:|---:|---:|---:|---|
| L14-1-01 | 73 | 3 | 0 | 0 |  |
| L14-1-02 | 58 | 6 | 0 | 0 |  |
| L14-1-03 | 110 | 6 | 0 | 0 |  |
| L14-1-04 | 38 | 8 | 0 | 0 |  |
| L14-1-05 | 27 | 1 | 0 | 1 |  |
| L14-2-00 | dòng dẫn 16 | — | — | — | |
| L14-2-01 | 52 | 6 | 0 | 1 |  |
| L14-2-02 | 56 | 5 | 1 | 0 |  |
| L14-2-03 | 59 | 4 | 0 | 0 |  |
| L14-2-04 | 43 | 6 | 1 | 0 |  |
| L14-2-05 | 34 | 5 | 0 | 0 |  |
| L14-2-06 | 56 | 6 | 1 | 0 |  |
| L14-2-07 | 45 | 6 | 1 | 0 |  |
| L14-2-08 | 52 | 5 | 0 | 1 |  |
| L14-2-09 | 60 | 5 | 0 | 0 |  |
| L14-3-00 | dòng dẫn 20 | — | — | — | |
| L14-3-01 | 56 | 4 | 1 | 1 |  |
| L14-3-02 | 60 | 6 | 0 | 0 |  |
| L14-3-03 | 60 | 6 | 1 | 0 |  |
| L14-3-04 | 45 | 6 | 0 | 0 |  |
| L14-3-05 | 58 | 6 | 0 | 0 |  |
| L14-3-06 | 48 | 7 | 0 | 1 |  |
| L14-4-00 | dòng dẫn 17 | — | — | — | |
| L14-4-01 | 59 | 5 | 0 | 1 |  |
| L14-4-02 | 52 | 6 | 2 | 0 |  |
| L14-4-03 | 49 | 6 | 1 | 0 |  |
| L14-4-04 | 48 | 6 | 1 | 0 |  |
| L14-4-05 | 39 | 6 | 1 | 0 |  |
| L14-4-06 | 81 | 5 | 0 | 2 |  |
| L14-5-00 | dòng dẫn 23 | — | — | — | |
| L14-5-01 | 60 | 4 | 0 | 1 |  |
| L14-5-02 | 50 | 6 | 1 | 0 |  |
| L14-5-03 | 55 | 6 | 1 | 0 |  |
| L14-5-04 | 60 | 5 | 1 | 0 |  |
| L14-5-05 | 50 | 6 | 1 | 0 |  |
| L14-5-06 | 59 | 5 | 1 | 0 |  |
| L14-5-07 | 52 | 2 | 0 | 0 |  |
| L14-5-08 | 57 | 6 | 2 | 0 |  |
| L14-5-09 | 41 | 5 | 1 | 0 |  |
| L14-5-10 | 32 | 6 | 0 | 0 |  |
| L14-5-11 | 89 | 4 | 0 | 2 |  |
| L14-6-00 | dòng dẫn 21 | — | — | — | |
| L14-6-01 | 60 | 5 | 0 | 1 |  |
| L14-6-02 | 60 | 6 | 1 | 0 |  |
| L14-6-03 | 60 | 6 | 1 | 0 |  |
| L14-6-04 | 58 | 6 | 1 | 0 |  |
| L14-6-05 | 39 | 6 | 1 | 0 |  |
| L14-6-06 | 44 | 5 | 0 | 0 |  |
| L14-6-07 | 75 | 6 | 0 | 0 | ngoại lệ 75 (N1) |
| L14-6-08 | 86 | 5 | 0 | 1 |  |
| L14-6-09 | 53 | 5 | 0 | 0 |  |
| L14-7-00 | dòng dẫn 23 | — | — | — | |
| L14-7-01 | 35 | 1 | 0 | 0 |  |
| L14-7-02 | 59 | 1 | 0 | 0 |  |
| L14-7-03 | 59 | 5 | 0 | 0 |  |
| L14-7-04 | 34 | 4 | 1 | 1 |  |
| L14-7-05 | 36 | 5 | 0 | 0 |  |
| L14-7-06 | 59 | 4 | 0 | 0 |  |
| L14-7-07 | 39 | 2 | 0 | 0 |  |
| L14-7-08 | 72 | 5 | 0 | 0 |  |

## 7. Hành trình khái niệm

Bước: vấn đề → trực quan → ví dụ → phát biểu → ý tưởng chứng minh → ứng dụng → kiểm tra. Thứ tự mục của ghi chú (NT2) đặt một số ví dụ tính sau phát biểu; khi đó bước "ví dụ" trước phát biểu do ví dụ dẫn nhập đảm nhận, và ví dụ sau phát biểu đóng vai ứng dụng hoặc kiểm tra (mục 12, Q5).

| Cụm | Vấn đề | Trực quan | Ví dụ | Phát biểu | Ý tưởng chứng minh | Ứng dụng | Kiểm tra | Ký hiệu, dữ kiện chuyển sang phát biểu | Bước gộp hoặc không áp dụng | Phút |
|---|---|---|---|---|---|---|---|---|---|---:|
| Hướng chính (Đn 14.1, 14.2, Mđ 14.3) | L14-2-01 | L14-2-02 | L14-2-01 (dẫn nhập: trục ngang, lỗi $1/2$) | L14-2-02, L14-2-03 | L14-2-04 | L14-2-03 (Ý nghĩa: vector riêng cho đặc trưng không nhãn, không cần huấn luyện) | L14-2-08 | bốn quan sát → $S=\operatorname{diag}(2,\frac12)$, $\lambda_1=2$, $u=(1,0)^\top$ | vấn đề và ví dụ dẫn nhập chung L14-2-01 | 9,5 |
| Lỗi tái tạo (Mđ 14.4, Đl 14.6) | L14-2-05 (Diễn giải: $2+\frac12=\frac12+2$) | L14-2-06 (Mđ 14.4); L14-2-09 (Đl 14.6) | L14-2-05 | L14-2-06, L14-2-09 | L14-2-07; Đl 14.6 ở ghi chú diễn giả L14-2-09 | L14-2-09 (tỉ lệ phương sai được giải thích dùng để chọn $k$) | L14-2-08 (phản ví dụ, Câu hỏi) | $\operatorname{tr}(S)=\frac52$ → (4.4) | trực quan và phát biểu chung trang | 12,5 |
| Bộ tự mã hóa (Đn 14.7, Mđ 14.8) | L14-3-01 (đường cong; Câu hỏi của mạch) | L14-3-01 (Đn 14.7); L14-3-02 (Mđ 14.8) | cặp $f(x)=x_1$, $g(z)=(z,0)^\top$ của L14-2-01 (dẫn nhập); L14-3-04 sau phát biểu | L14-3-01, L14-3-02 | L14-3-03 | L14-3-02 (Ý nghĩa: lỗi $\sum_{j>k}\lambda_j$ là mốc cho mọi bộ tự mã hóa tuyến tính) | L14-3-06 | $A=V_k^\top$, $B=V_k$, $R$ → Ví dụ 14.3 với $R=(2)$ | vấn đề, trực quan, định nghĩa chung L14-3-01 | 9,5 |
| Giới hạn sinh của bộ tự mã hóa (Ví dụ 14.4) | L14-3-05 | — | L14-3-05 | — | không áp dụng (ví dụ, không phải kết quả) | L14-4-01 (giới hạn dùng để dựng mô hình sinh: cần phân phối của mã và nhiễu) | L14-4-06 (câu 3) | $g(z)=(z,0)^\top$, $Z=\pm2$ / $\mathcal N(0,1)$ | chu trình rút gọn vấn đề → ví dụ → ứng dụng → kiểm tra: ví dụ là đầu ra của mạch 3 | 2 |
| Mô hình biến ẩn (Đn 14.10, 14.11) | L14-4-01 | L14-4-01 | L14-4-01 (dẫn nhập); L14-4-05 | L14-4-02, L14-4-03 | không áp dụng (định nghĩa); chuẩn hóa ở ghi chú diễn giả L14-4-02 | L14-4-05 (Diễn giải: mô hình sinh cho cảm biến, hiệp phương sai $S$); L14-7-02 (Tình huống 14.1: cách lấy mẫu) | L14-4-06 | $\mathbb E[X_1^2]=1$ so với $2$ → cần $p(z)$ và $\tau^2$; (6.2) với $w=\sqrt{3/2}$, $\tau^2=\frac12$ | kỹ thuật L14-4-04 chen giữa phát biểu và ví dụ tính | 13,5 |
| Tính không âm của phân kỳ (Đn 14.12, Bđ 14.13) | L14-5-01 (cần thước đo) | L14-5-01 (đặt khối lượng nơi hậu nghiệm lớn); L14-5-02 ($\log t\le t-1$ trước Bđ 14.13) | bất đối xứng $0{,}0966$ / $0{,}1534$ ở ghi chú diễn giả L14-5-08; KL tới hậu nghiệm bằng số ở L14-5-10 | L14-5-02 | L14-5-03 | L14-5-07 (hàng "Vai trò": phạt $q_\phi$ lệch khỏi $p(z)$, đo độ chặt của cận) | L14-5-11 (câu 5) | $\psi(t)=t-1-\log t$ (Bài 11) | ví dụ gộp vào cụm cận dưới: KL là khái niệm đã có ở Bài 11 | 5 |
| Cận dưới bằng chứng (Đn 14.14, Đl 14.15, Đn 14.16) | L14-5-01 | L14-5-01; ghi chú diễn giả L14-5-05 | ví dụ dẫn nhập: lưới $10^{20}$ (L14-5-01); L14-5-10 sau phát biểu (cần Bđ 14.17, Mđ 14.18) | L14-5-04, L14-5-05 | L14-5-06 | L14-5-07 (Đn 14.16 suy luận biến phân); L14-6-01 (mục tiêu học (8.1)) | L14-5-11 | $q=\mathcal N(1,\frac18)$, $x=2$ → khe hở $\log2-\frac38$ | — | 11 |
| Phân kỳ Gaussian và kỳ vọng tái tạo (Bđ 14.17, Mđ 14.18, (7.6)) | L14-5-07 (KL tới tiên nghiệm tính được khi dạng đơn giản) | L14-5-08 (hai mômen) | L14-5-09, L14-5-10 | L14-5-08, L14-5-09 | một dòng "Chứng minh." (Mđ 14.18), ghi chú diễn giả (Bđ 14.17) | L14-5-10 (cận dưới và khe hở bằng số) | L14-5-11 | $(\mu,s^2)$, $\tau^2$ → (7.5), (7.6) | chu trình rút gọn: công cụ tính | 6,5 |
| Tái tham số hóa (Mđ 14.20) | L14-6-02 (dòng 1) | L14-6-02 | L14-6-06 sau phát biểu | L14-6-03 | L14-6-04 | L14-6-05 (Thuật toán 14.21: gradient qua (8.2)) | L14-6-06 (Diễn giải); Bài tập 14.3 (về nhà) | $\mu=1$, $\sigma=2$, $\varepsilon=-1,0,1$ | ví dụ sau phát biểu theo thứ tự ghi chú | 11,5 |
| Bộ tự mã hóa biến phân và giới hạn (Đn 14.19, Tt 14.21, Nx 14.22) | L14-6-01 (dòng 1; Câu hỏi của mạch) | L14-6-01 (+ hình hai đường) | L14-6-01 (hình) | L14-6-01, L14-6-05, L14-6-07 | không áp dụng (định nghĩa, thuật toán, nhận xét) | L14-6-05 (huấn luyện); L14-6-09 ghi chú diễn giả (Tình huống 14.2: cảm biến hai cụm) | L14-6-08, L14-6-09 | $q_\phi=p(z)=\mathcal N(0,1)$, dữ liệu $\pm2$ | — | 14 |
Câu nối giữa các cụm trên mặt trang: L14-2-05 Diễn giải (→ Mđ 14.4); L14-2-09 dòng cuối (mã và tái tạo vẫn tuyến tính → mạch 3); L14-3-05 Diễn giải (bộ tự mã hóa không chứa phân phối → mạch 4); L14-4-01 Diễn giải (cần phân phối của mã và nhiễu); L14-5-01 dòng 2–3 (tích phân không có dạng đóng → mạch 5); L14-5-07 dòng cuối (khe hở phụ thuộc $\theta$); L14-6-01 dòng 1 (số biến tăng theo $n$); L14-6-02 dòng 1 (gradient theo tham số của phân phối lấy mẫu); L14-6-07 (giá trị của mục tiêu → bài tập).

## 8. Hình

| Tệp | Trạng thái | Trang | Nội dung, dữ liệu chính xác | Alt dự kiến |
|---|---|---|---|---|
| `img/lec-14/pca-projection.svg` | có sẵn (Hình 14.1 của ghi chú), viewBox 600×420, chữ 25 | L14-2-05 (cột phải `grid2`) | bốn điểm $(2,0),(-2,0),(0,1),(0,-1)$; trục ngang $u=(1,0)$; hai đoạn nét đứt dài $1$; "Tổng lỗi: 2; lỗi trung bình: 1/2" | như ghi chú dòng 261 |
| `img/lec-14/vae-paths.svg` | có sẵn (Hình 14.2), dọc 600×850, chữ 23–25 | không dùng trực tiếp | ở nửa cột của trang 16:9, chiều cao hiển thị khoảng 560 px, chữ còn khoảng 15 px, dưới ngưỡng 16 px (NT25) | — |
| `img/lec-14/vae-paths-wide.svg` | **vẽ mới** (vẽ lại ngang của Hình 14.2, bỏ hộp nhiễu), viewBox khoảng 1000×440, chữ ≥ 24 | L14-6-01 (cột phải `grid2`) | Hai hàng hộp và mũi tên, nhãn bằng chữ và ký hiệu ngắn, không vẽ công thức (NT25). Hàng trên "Suy luận từ x": Quan sát x → Bộ mã hóa → Trung bình μ_φ(x), độ lệch chuẩn σ_φ(x) → Mẫu mã z. Hàng dưới "Sinh mẫu mới": Tiên nghiệm p(z) → Lấy mẫu z → Bộ giải mã → Lấy mẫu x mới. Không có hộp nhiễu ε, không có phép ⊙: (8.2) chỉ xuất hiện từ L14-6-02 (NT9). Hai hàng phân biệt bằng nhãn hàng và kiểu viền (liền / nét đứt), không chỉ bằng màu; `role="img"`, `<title>` | "Hai hàng. Hàng trên, suy luận từ x: quan sát x qua bộ mã hóa cho trung bình μ_φ(x) và độ lệch chuẩn σ_φ(x), từ đó lấy mẫu mã z. Hàng dưới, sinh mẫu mới: lấy z từ tiên nghiệm p(z) rồi qua bộ giải mã lấy x mới; đường sinh không đi qua bộ mã hóa." |
| `img/lec-14/pca-projection-slide.svg` | **vẽ mới khi biên tập lượt 2** (R14) | L14-2-05 (thay `pca-projection.svg` của ghi chú, tệp đó giữ nguyên) | cùng dữ liệu Hình 14.1: bốn điểm, trục ngang hướng $u$, hai đoạn nét đứt dài $1$, "Tổng lỗi: 2; lỗi trung bình: 1/2"; viewBox 600×420, chữ 30–32 (≈ 18 px ở 354 px); nhãn hướng chỉ "u", không công thức | như ghi chú dòng 261 |
| `img/lec-14/vae-paths-narrow.svg` | **vẽ mới khi biên tập** (E6) | L14-6-01 (`img.only-narrow`, màn ≤ 760 px) | bản dọc của `vae-paths-wide.svg`: hai phần "Suy luận từ x", "Sinh mẫu mới", mỗi phần bốn hộp nối bằng mũi tên; viewBox 600×1046, chữ 30 (≈ 17 px ở 340 px) | "Hai phần xếp dọc. Phần trên, suy luận từ x: …; phần dưới, sinh mẫu mới: …" |
| `img/lec-14/elbo-gap.svg` | **bỏ khi dựng deck** (Q12 cho phép bỏ; tệp đã xóa) | L14-5-10 (cột phải `grid2`) | Trục số nằm ngang từ $-2{,}7$ đến $-2{,}1$, vạch mỗi $0{,}1$; điểm "ELBO ≈ −2,5837" (hình tròn đặc) và điểm "log p_θ(2) ≈ −2,2655" (hình vuông); ngoặc giữa hai điểm ghi "khe hở ≈ 0,3181" (giá trị chính xác $\log2-\frac38$; hiệu hai số đã làm tròn là $0{,}3182$). Đẳng thức khe hở = KL tới hậu nghiệm chỉ ở chữ của trang (dòng 5 của L14-5-10), không vẽ vào SVG (NT25). Số đúng như mục 5, E11 (Ví dụ 14.7); hai điểm phân biệt bằng hình dạng và nhãn | "Trục số từ −2,7 đến −2,1. Cận dưới ELBO ≈ −2,5837 nằm bên trái log-hợp lý log p_θ(2) ≈ −2,2655; đoạn giữa hai điểm dài ≈ 0,3181, bằng KL từ q = N(1, 1/8) tới hậu nghiệm N(1, 1/2)." |

Không raster. Mọi con số trên hai hình mới có trong chữ của trang (L14-5-10 dòng 3–5) hoặc trong nhãn của hình gốc.

## 9. Mạch Tổng kết

- **Bảng kết quả** (L14-7-01, L14-7-02): 7 hàng, tách 3 + 4 — Mệnh đề 14.3; Mệnh đề 14.4 cùng Định lý 14.6; Mệnh đề 14.8; Định nghĩa 14.10; Định lý 14.15; Mệnh đề 14.18; Mệnh đề 14.20 cùng Thuật toán 14.21. Giả thiết giữ lượng từ "mọi nghiệm" và điều kiện $\lambda_k>\lambda_{k+1}$, $y_i$ sinh $\mathbb R^d$ của Mệnh đề 14.8; loại bảo đảm: (7.3) là đẳng thức, (8.3) là đẳng thức gradient trên $\mathcal B$, ước lượng không chệch.
- **Câu trả lời cho câu hỏi trung tâm** (L14-7-03): PCA tìm không gian con tuyến tính tốt nhất theo lỗi chiếu trực giao bình phương trên mẫu; bộ tự mã hóa học hai ánh xạ theo lỗi tái tạo, tuyến tính thì tái tạo như PCA và không xác định tọa độ mã; bộ tự mã hóa biến phân xây dựng mô hình sinh xác suất và dùng suy luận biến phân để tối ưu ELBO; trên bốn quan sát: $u=(1,0)^\top$, lỗi $1/2$, mô hình $(\sqrt{3/2}\,z+\eta_1,\eta_2)^\top$ có hiệp phương sai $S$ (ghi chú dòng 1427–1431, Tình huống 14.1).
- **Bài tập tổng hợp** (L14-7-04, L14-7-05): Bài tập 14.5 (`exercises.md`), đề và lời giải theo mục 5, E17.
- **Câu hỏi tự kiểm tra** (L14-7-06): ba câu của ghi chú §11; đáp án theo "Lời giải câu hỏi cuối buổi" (dòng 1468–1472) trong ghi chú diễn giả.
- **Bài tập về nhà** (L14-7-07):

| Mục | Bài tập | Lý do xếp |
|---|---|---|
| 2. Phân tích thành phần chính | 14.6, 14.7, 14.10 | chỉ cần $S$, vector riêng, (4.4) |
| 4. Mô hình sinh có biến ẩn | 14.1 (trên lớp), 14.5 (trên lớp), 14.8, 14.9 | 14.1 câu 4 cần (6.2); 14.5 cần mật độ biên tuyến tính Gaussian; 14.8, 14.9 cần (6.1), (6.3), hoàn bình phương |
| 5. Cận dưới bằng chứng | 14.2 (câu 4–5 trên lớp), 14.11 | 14.2 cần (7.3)–(7.6); 14.11 so sánh KL thuận và ngược |
| 6. Bộ tự mã hóa biến phân | 14.3, 14.4 (trên lớp) | 14.3 cần Mệnh đề 14.20 và (7.5); 14.4 cần Nhận xét 14.22 |

Mạch 3 không có hàng (Bài tập 14.1 dùng (6.2) ở câu 4). Liên kết "Ghi chú bài giảng · Bài tập": `material-viewer.html?doc=materials/lec-14/lecture-note.md&deck=lecture-14-hoc-bieu-dien-mo-hinh-sinh.html`, `material-viewer.html?doc=materials/lec-14/exercises.md&deck=lecture-14-hoc-bieu-dien-mo-hinh-sinh.html`.

- **Tài liệu tham khảo** (L14-7-08): theo "Tài liệu đọc" (dòng 1484–1488): Murphy (2022), Murphy (2023), Kingma và Welling; không URL trên mặt trang.
- **Dòng nối** (L14-7-08): theo §11 (dòng 1482); Bài 14 là bài cuối, không dẫn bài sau.

## 10. Bảng thuật ngữ

| Tiếng Việt (trên mặt trang) | Tiếng Anh, viết tắt | Trang dùng lần đầu |
|---|---|---|
| định lý phổ | spectral theorem | L14-1-02 |
| hiệp phương sai thực nghiệm (còn gọi là hiệp phương sai mẫu) | — | L14-2-02 |
| phân tích thành phần chính | principal component analysis, PCA | L14-2-02 |
| hướng chính thứ nhất; thành phần chính | principal component (ghi chú diễn giả) | L14-2-03; L14-2-08 |
| lỗi tái tạo | reconstruction error | L14-2-06 |
| mô hình sinh | generative model | L14-4-02 |
| tỉ lệ phương sai được giải thích | — | L14-2-08 |
| bộ tự mã hóa | autoencoder, AE | L14-3-01 |
| bộ mã hóa; bộ giải mã | encoder; decoder | L14-3-01 |
| nút thắt | bottleneck (ghi chú diễn giả) | L14-3-01 |
| mô hình sinh có biến ẩn | latent variable model | L14-4-02 |
| tiên nghiệm; biến ẩn | prior; latent variable | L14-4-02 |
| hậu nghiệm | posterior | L14-4-03 |
| miền hỗ trợ | support | L14-5-02 |
| phân kỳ Kullback–Leibler | Kullback–Leibler divergence, KL | L14-5-02 |
| hầu khắp nơi | — | L14-5-02 |
| hậu nghiệm xấp xỉ | approximate posterior | L14-5-04 |
| log-hợp lý biên (còn gọi là bằng chứng) | evidence | L14-5-04 |
| cận dưới bằng chứng | evidence lower bound, ELBO | L14-5-04 |
| kỳ vọng tái tạo; KL tới tiên nghiệm; KL tới hậu nghiệm | — | L14-5-04; L14-5-07 |
| suy luận biến phân | variational inference | L14-5-07 |
| suy luận dùng chung tham số | amortized inference | L14-6-01 |
| bộ tự mã hóa biến phân | variational autoencoder, VAE | L14-6-01 |
| tái tham số hóa | reparameterization trick | L14-6-02 |
| Monte Carlo | Monte Carlo | L14-6-02 |
| định lý hội tụ trội | dominated convergence theorem | L14-6-04 |
| suy sụp hậu nghiệm | posterior collapse | L14-6-07 |
| PCA xác suất | probabilistic PCA, PPCA | L14-4-05 (Diễn giải) |
| tuyệt đối liên tục | absolutely continuous (ghi chú diễn giả) | L14-5-02 |

Thuật ngữ học phần giữ theo Q8, Q13: phân phối, kỳ vọng, hàm mất mát, hợp lý cực đại, log-hợp lý, tập huấn luyện. Dấu thập phân là dấu phẩy (`0{,}3181`). "Lời giải", không "Đáp án".

## 11. Kỹ thuật đã giới thiệu đến hết Bài 14

Kiểm bằng `grep` trên `2627-1/lecture-*.html` (deck 00–11) và ghi chú Bài 10–13 (2026-11-16).

| Kỹ thuật | Nơi giới thiệu | Cách dùng ở deck 14 |
|---|---|---|
| Biến phụ | deck 02 | không dùng |
| Nhân tử Lagrange | deck 03; deck 11 TS13 | ghi chú diễn giả L14-2-03 (điều kiện dừng chỉ cho vector riêng) |
| $\log t\le t-1$ | deck 11 TS14 ("Nhắc lại:") | "Nhắc lại:" L14-5-02, L14-5-03 |
| Bất đẳng thức Jensen | deck 05b, 06, 06c | "Cách khác:" L14-5-06 |
| Định lý Pythagore, phép chiếu | deck 05 | "Nhắc lại:" L14-2-07; dùng ở L14-3-03 |
| Phân rã trị riêng, tọa độ riêng | deck 11 HH03–HH04 (Mệnh đề 11.17) | "Nhắc lại:" L14-1-02 (định lý phổ); dòng "Kỹ thuật." L14-2-04 |
| Trung bình có trọng số của trị riêng | **mới**, dòng "Kỹ thuật." L14-2-04 | dùng lại ở ghi chú diễn giả L14-2-08 |
| Chặn dưới bằng hình chiếu lên không gian con | **mới**, dòng "Kỹ thuật." L14-3-03 | — |
| Hoàn bình phương | **mới**, trang "Kỹ thuật." L14-4-04 (không có trong deck 00–11 và ghi chú 10–13) | L14-4-05, L14-5-10, L14-5-11 |
| Tái tham số hóa | **mới**, trang "Kỹ thuật." L14-6-02 (deck 06c chỉ có "tái tham số hóa thích ứng" của chuẩn hóa theo lô, khác nghĩa) | L14-6-03 → L14-6-06 |
| Ước lượng Monte Carlo | **mới**, dòng "Kỹ thuật." trên L14-6-02 | L14-6-06 |
| Đổi đạo hàm và kỳ vọng (giá trị trung bình + hội tụ trội) | bước 3 của ý tưởng chứng minh L14-6-04 (không có nhãn "Kỹ thuật."; mẹo chỉ dùng trong một chứng minh) | — |

## 12. Rủi ro, đề xuất sửa ghi chú, điểm cần điều phối viên quyết định

**Điểm cần quyết định**

- **Q1. Số trang 59** (NT27: 45–55, trần 60). Lý do: mạch tối đa (7), năm khối lý thuyết mới, sáu trang ý tưởng chứng minh theo NT6, ba bài tập có lời giải trên mặt trang cần trang lời giải riêng (L14-6-09, L14-7-04). Phương án về 55, mỗi phương án −1 trang: (a) đưa Ví dụ 14.3 (L14-3-04) vào ghi chú diễn giả L14-3-02; (b) gộp đề và lời giải Bài tập 14.5 (L14-7-03/04) bằng fragment, ngoại lệ mật độ khoảng 73 âm tiết; (c) gộp L14-6-08/09 tương tự (khoảng 130 âm tiết, vượt 1,5 lần trần, không khuyến nghị); (d) nếu deck 12 hoặc 13 đã có trang "Kỹ thuật." hoàn bình phương, L14-4-04 thành một dòng "Nhắc lại:" trên L14-4-05; (e) đưa Nhận xét 14.5 (L14-2-09) vào ghi chú diễn giả L14-2-08 (mất phản ví dụ và câu hỏi kiểm tra của mạch 2, không khuyến nghị).
- **Q2. Hai số hiệu trên một trang**: L14-2-02 (Đn 14.1, 14.2), L14-5-02 (Đn 14.12, Bđ 14.13), L14-5-07 (bảng + Đn 14.16), L14-5-08 (Bđ 14.17, Mđ 14.18), L14-5-09 ((7.6) + Ví dụ 14.6). Storyboard hiểu NT5 "trích số hiệu ghi chú một lần mỗi trang" là mỗi số hiệu xuất hiện một lần; nếu điều phối viên hiểu là một số hiệu mỗi trang thì cần thêm 4–5 trang (vượt 60) hoặc bỏ số hiệu của khối phụ.
- **Q3. Ý tưởng chứng minh không có trang riêng**: Định lý 14.6 (mục "Mở rộng", chứng minh ở Phụ lục A; ý tưởng ở ghi chú diễn giả L14-2-08), Bổ đề 14.17 (ghi chú diễn giả), Mệnh đề 14.18 (một dòng "Chứng minh."). Thêm trang cho Định lý 14.6 đưa tổng lên 60.
- **Q4. Kỹ thuật dùng chung với Bài 12–13** (đã chốt): deck 12, 13 không dùng hoàn bình phương hay ước lượng Monte Carlo. Deck 14 giới thiệu hoàn bình phương (tên theo ghi chú dòng 557 và `exercises.md`) bằng trang "Kỹ thuật." L14-4-04 và Monte Carlo bằng một dòng "Kỹ thuật." trên L14-6-02; $\log t\le t-1$ (deck 11) chỉ nhắc lại. Bất đẳng thức hợp, Hoeffding (Bài 12) và ánh xạ co (Bài 13) không dùng trong Bài 14.
- **Q5. Ví dụ sau phát biểu** (Ví dụ 14.2, 14.3, 14.7, 14.8) theo thứ tự ghi chú (NT2 thắng thứ tự hành trình NT8); bước ví dụ trước phát biểu do ví dụ dẫn nhập đảm nhận (mục 7).
- **Q6. Bài tập 14.2 trên mặt trang chỉ có câu 4–5** (câu 1–3 lặp phép tính của Ví dụ 14.7, đáp án ở ghi chú diễn giả); dòng dữ kiện thêm "câu 3 cho $\mathcal L=\ldots$", là kết quả của ghi chú (dòng 1065–1068), để câu 4 tự chứa.
- **Q7. Bài tập tổng hợp**: Bài tập 14.5 (mức nhận biết, nối trị riêng PCA với mô hình sinh tuyến tính Gaussian). Phương án khác: Bài tập 14.9 (hậu nghiệm của PCA xác suất, dài hơn) hoặc Bài tập 14.1 đầy đủ (đã dùng ở mạch 3–4).
- **Q8. Tình huống 14.1, 14.2 không có trang riêng**: 14.1 vào L14-7-02 (câu trả lời trên bốn quan sát), 14.2 vào ghi chú diễn giả L14-6-09. Lý do: tránh trùng Ví dụ 14.2, 14.5 và Bài tập 14.4 (NT13).
- **Q9. Bài tập 14.3 không lên mặt trang** (bài về nhà, đáp án ở ghi chú diễn giả L14-6-05); kiểm tra của cụm tái tham số hóa là Ví dụ 14.8 và Bài tập 14.4.
- **Q10. Ngoại lệ mật độ** (bảng đếm sau cổng duyệt): L14-4-06 (80), L14-5-11 (86), L14-6-08 (86) do đề giữ câu chữ; L14-3-06 (7 dòng) do dữ liệu viết mỗi cặp điểm một dòng; L14-1-03 (100/80) do giữ đủ các vế của sáu mục tiêu; L14-7-07 (69) do tên sách; L14-1-04 (8 dòng) do 7 mạch; L14-1-05 (một câu 27 âm tiết) do nguyên văn câu hỏi trung tâm. Tất cả dưới 1,5 lần trần.
- **Q11. Tiêu đề** (đã áp dụng theo quyết định bác bỏ và cổng duyệt S1): không tiêu đề nào chứa "KL" hay "ELBO"; L14-5-11 "Bài tập: phân kỳ Gaussian, kỳ vọng tái tạo và cận dưới bằng chứng", L14-6-08/09 "Bài tập: phân kỳ bằng không, mômen khớp và mô hình sai", L14-5-03, L14-5-07 dùng "phân kỳ Kullback–Leibler", L14-5-08 "Phân kỳ giữa các phân phối Gaussian". Số hiệu "Bài tập 14.k" ở mặt trang.
- **Q12. Hình mới**: `vae-paths-wide.svg` (bản ngang không có hộp nhiễu, không vẽ công thức; cổng duyệt M5) và `elbo-gap.svg` (số của Ví dụ 14.7; nhãn ngoặc chỉ "khe hở ≈ 0,3181"; bỏ được, khi đó L14-5-10 một cột).
- **Q13. Bài tập 14.1 tách hai trang** ở hai mạch: câu 1–2 ở L14-3-06 (tái tạo, tọa độ), câu 3–4 ở L14-4-06 (phân phối, nhiễu).

**Rủi ro kỹ thuật**

- Công thức hiển thị dài cần `aligned` ở 390 px và có thể chạm khung ở 1600×900: (6.1) L14-4-02, log-mật độ L14-4-05, (7.2) L14-5-04, (7.3) L14-5-05, $\widehat{\mathcal L}_i$ L14-6-06, (8.3) L14-6-03. Người viết đo trong trình duyệt.
- Không dùng `\text{}` chứa tiếng Việt (đã đưa "Định lý 14.6" ra ngoài công thức ở L14-3-03; hằng số viết $C$ ở L14-4-05).
- Ký hiệu $c$ trên mặt trang chỉ mang nghĩa trung bình của $p$ trong (7.4) và tâm trong L14-4-04; hệ số co giãn của Bài tập 14.1 viết $f_c,g_c$ đúng như đề (xem đề xuất N2).
- Bảng L14-7-01 bảy hàng có thể chạm chân trang ở 1600×900; phương án tách hai trang ghi ở mục quyết định của trang.

**Đề xuất sửa ghi chú (NT3; không tác tử nào sửa ghi chú)**

- **N1 (nhẹ).** `exercises.md` dòng 15 (mục tiêu 3, cột "Bài tập trong ghi chú" ghi "—") và ghi chú dòng 1449 ("Bài tập 14.1 …: mục tiêu 2 và 6"): câu 4 của Bài tập 14.1 dùng mô hình (6.2) và mật độ (6.1), nên bài này cũng đo mục tiêu 3. Đề xuất thêm 14.1 vào hàng mục tiêu 3.
- **N2 (nhẹ).** Ký hiệu $c$ mang ba nghĩa trong cùng bài: hệ số đổi đơn vị "thay $u$ bằng $cu$" (dòng 166), tham số của $f_c,g_c$ (Bài tập 14.1, dòng 603), trung bình của $p=\mathcal N(c,\gamma)$ (Bổ đề 14.17, dòng 821). Q14 ("một ký hiệu một nghĩa"). Đề xuất đổi chữ ở Bài tập 14.1 (ví dụ $\kappa$) hoặc ở dòng 166.
- **N3 (nhẹ).** Ký hiệu $r$ vừa là chỉ số mẫu Monte Carlo (dòng 913, 1189, 1252), vừa là hậu nghiệm $r=p_\theta(\cdot\mid1)$ trong lời giải Bài tập 14.2 (dòng 1083), vừa là tọa độ trong Phụ lục B (dòng 1545). Đề xuất đặt tên khác cho hậu nghiệm ở dòng 1083 (ví dụ $\pi_1$ hoặc viết thẳng $p_\theta(\cdot\mid1)$).
- **N5 (nhẹ; từ cổng duyệt).** Ghi chú dòng 327: "Chuẩn hóa đặc trưng làm thay đổi $S$, nên cũng thay đổi hướng chính thứ nhất." Đổi đơn vị không luôn đổi hướng chính (trong Nhận xét 14.5, đổi $M$ sang milimét giữ nguyên hướng). Đề xuất: "Ví dụ, trong Nhận xét 14.5, đổi $N$ từ mét sang milimét cho $\operatorname{Var}(N)=10^6$, $S=\operatorname{diag}(100,10^6)$, và PCA một chiều giữ $N$." Deck dùng đúng ví dụ này ở L14-2-09.
- **N4 (nhẹ, tùy tác giả).** Tình huống 14.2 (dòng 1411–1419) và Bài tập 14.4 (dòng 1364–1387) cùng một cấu trúc (bộ giải mã bỏ qua $z$, KL bằng $0$, cận chặt, mômen bậc hai so với dữ liệu hai giá trị). Deck chỉ dùng Bài tập 14.4 trên mặt trang. Không phải lỗi; ghi lại để tác giả cân nhắc khi rà ghi chú.

## Tự kiểm văn bản dự kiến (`no-ai-slop` Edit + `eval.md`, NT18–NT22, "The author's voice")

- Không câu hỏi tu từ (mọi câu hỏi có nhãn "Câu hỏi:"), không "ta thấy", "rõ ràng", "chúng ta", "hãy"; không "Nhu cầu:", không "Muốn …"; không câu rào đón, câu nguồn gốc, câu điều hướng trên mặt trang (dòng nối của L14-7-07 theo §11 của ghi chú, không dẫn bài sau).
- Không câu nói về trạng thái của chính văn bản; mở trực giác bằng nhãn "Trực quan." nêu cơ chế (hình chiếu, hai bước sinh, đặt khối lượng nơi hậu nghiệm lớn, mạng chung).
- Không "binary contrast" kiểu "không phải X mà là Y": các dòng giới hạn viết dạng khẳng định ("tọa độ mã thì không", "cho cận, không cho khe hở" là phủ định toán học của một kết luận cụ thể).
- Ý song song từ ba mục trở lên thành danh sách (giả thiết Định lý 14.15, Mệnh đề 14.20; ba kết luận Mệnh đề 14.8; ba phép tính Định nghĩa 14.11; câu trả lời L14-7-02). Đối tượng cụ thể viết bằng công thức (dữ liệu từng điểm, $S$, các phân phối).
- Mỗi "Diễn giải:" dùng số có trên chính trang đó; mỗi trang ví dụ có "Tính …"/"Dữ kiện:" và dòng kiểm tra hoặc Diễn giải.
- Không gạch ngang dài làm nhịp câu trên mặt trang; dấu "—" chỉ có trong tiêu đề mục của storyboard.
- Ghi chú diễn giả không mở bằng "Trang này …", không chứa mã trang, thời lượng hay chỉ dẫn quy trình; nguồn theo `note-source` (NT22) do người viết thêm.

## Quyết định của điều phối viên (2026-11-16, sau khi duyệt storyboard)

- Q1 **chấp nhận:** 59 trang, trong trần 60 (NT27).
- Q2 **chấp nhận:** NT5 nghĩa là không lặp cùng một số hiệu trên một trang.
- Q3 **chấp nhận.**
- Q4 **chấp nhận:** deck 12, 13 không dùng hoàn bình phương hay ước lượng Monte Carlo, nên deck 14 giới thiệu hoàn bình phương bằng trang "Kỹ thuật." (L14-4-04) và Monte Carlo bằng một dòng "Kỹ thuật." (L14-6-02); $\log t\le t-1$ chỉ "Nhắc lại:".
- Q5 **chấp nhận** (NT2 thắng thứ tự hành trình), với điều kiện bước "Trực quan." đứng trước mỗi phát biểu chính.
- Q6, Q7 (Bài tập 14.5 là bài tổng hợp), Q9, Q13 **chấp nhận.**
- Q8 **chấp nhận**, với điều kiện bản đồ hành trình (mục 7) ghi rõ trang đảm nhận bước "ứng dụng" của từng cụm.
- Q10 **chấp nhận** các ngoại lệ (đề bài tập giữ câu chữ, đều dưới 1,5 lần trần); người viết thử chia đề bằng `fragment` hoặc hai cột trước khi dùng ngoại lệ.
- Q11 **bác bỏ:** tiêu đề không trộn ngôn ngữ khi có cụm tiếng Việt rõ (`../CLAUDE.md`, NT16, NT21). Dùng phương án tiếng Việt: "Bài tập: phân kỳ Gaussian, kỳ vọng tái tạo và cận dưới bằng chứng", "Bài tập: phân kỳ bằng không, mômen khớp và mô hình sai"; mặt trang ghi số hiệu "Bài tập 14.k" (NT24).
- Q12 **chấp nhận** `vae-paths-wide.svg`; `elbo-gap.svg` chỉ khi mọi số trên hình lấy từ Ví dụ 14.7 của ghi chú (sửa: điều phối viên ghi nhầm 14.6) và có trong chữ của trang (NT25).
- N1–N4 ghi vào `review-log.md` làm đề xuất sửa ghi chú cho tác giả.


## Sửa theo cổng duyệt (2026-11-16)

Báo cáo: `planning/lec-14/reviews/deck-storyboard-gate.md`. Điều phối viên chấp nhận mọi phát hiện. Mật độ đếm lại bằng script trên mọi trang (bảng đếm ở cuối mục 6).

| Phát hiện | Trang | Đã sửa / không sửa |
|---|---|---|
| S1 tiêu đề trộn "KL", "ELBO" | L14-5-03, L14-5-07, L14-5-08, L14-5-11, L14-6-08, L14-6-09 | đã sửa: "phân kỳ Kullback–Leibler", "phân kỳ", "cận dưới bằng chứng" (mục 12, Q11) |
| S2 thiếu "Trực quan." trước phát biểu chính | L14-2-08, L14-3-02, L14-5-02, L14-5-08, L14-6-02 | đã sửa: một dòng "Trực quan." trước mỗi phát biểu, lấy từ ghi chú dòng 335/346, 392, 685, 836, 1159; mục 4 cột (a) và mục 7 cột "Trực quan" cập nhật |
| S3 câu hỏi mạch 3 không trên mặt trang | L14-3-01 | đã sửa: "**Câu hỏi:** Hai ánh xạ xác định gì: phép tái tạo, tọa độ mã, phân phối của mã?"; dòng "PCA là trường hợp …, lan truyền ngược" chuyển vào ghi chú diễn giả |
| M1 bước ứng dụng trong mục 7 | mục 7; L14-3-02; L14-5-07 | đã sửa: mọi cụm có trang ứng dụng; L14-3-02 "Ý nghĩa:" nêu mốc $\sum_{j>k}\lambda_j$; L14-5-07 thêm hàng "Vai trò"; Tình huống 14.1 (L14-7-02), 14.2 (ghi chú diễn giả L14-6-09) ghi vào mục 7 |
| M2 "hoàn bình phương" | L14-4-04, L14-5-10, L14-5-11, mục 10–12, Q4 | đã sửa toàn tệp; đề Bài tập 14.2 câu 4–5 chép nguyên văn ghi chú dòng 1031–1032 |
| M3 mục tiêu thiếu vế | L14-1-03 | đã sửa: đủ các vế; 100 âm tiết, ngoại lệ (Q10) |
| M4 $y_i$ hai nghĩa; L14-5-09 bỏ hằng số | L14-1-02, L14-5-09 | đã sửa: nhắc lại Mệnh đề 12.2 bằng lời; L14-5-09 "bằng $\|x-g_\theta(z)\|_2^2/(2\tau^2)$ cộng hằng số" |
| M5 hình xem trước (8.2), công thức trong SVG | L14-6-01, mục 8 | đã sửa: `vae-paths-wide.svg` bỏ hộp nhiễu và phép $\odot$, nhãn bằng chữ và ký hiệu ngắn; nhãn `elbo-gap.svg` chỉ "khe hở ≈ 0,3181" |
| M6 $h_\theta$, $\odot$ chưa định nghĩa; thiếu điều kiện | L14-6-02, L14-6-03 | đã sửa |
| M7 tên mạch trùng tiêu đề trang đầu | L14-6-01 | đã sửa: "Suy luận dùng chung tham số và mục tiêu học" |
| M8 câu hỏi mạch 6 chưa đủ | L14-6-01 | đã sửa: thêm "**Câu hỏi:**" sau (8.1) |
| M9 "đổi hướng chính" quá rộng | L14-2-09, E3 | đã sửa: đổi $N$, $S=\operatorname{diag}(100,10^6)$; thêm N5 |
| M10 Nhận xét 14.22 đổi nghĩa | L14-6-07 | đã sửa: "cần kiểm tra bộ giải mã trên vùng đó, dữ liệu mới" |
| L1 ý tưởng chứng minh thiếu công thức, nhãn giả thiết | L14-6-04 | đã sửa: 4 bước, đổi biến ở công thức hiển thị, nêu giả thiết ở bước 1 và 3 |
| L2 "Bước 5" | L14-3-03 | đã sửa |
| L3 từ khóa "Nút thắt" | L14-3-00 | đã sửa: "Phân phối của mã" |
| L4 bảng tổng kết thiếu giả thiết | L14-7-01 | đã sửa: thêm $k<d$, khả tích, nhiễu không chứa tham số; tên "Bộ tự mã hóa tuyến tính"; "$S$ hiệp phương sai thực nghiệm" thay "(4.1)"; số hiệu viết trong ngoặc để giữ trần 80 |
| L5 Q12 ghi Ví dụ 14.6; nhãn hình | mục 8 | đã sửa (điều phối viên đã sửa Q12 thành Ví dụ 14.7) |
| L6 hậu tố (a), (b) | L14-3-06, L14-4-06 | đã sửa: tên bước sau dấu phẩy |
| L7 ký hiệu chưa định nghĩa | L14-2-02, L14-5-02, L14-6-09, L14-7-02, L14-7-04 | đã sửa: $\bar x$, "hầu khắp nơi (ngoài tập thể tích $0$)", $\Phi$, $z\sim\mathcal N(0,1)$, $e_i$; L14-6-04 không còn dùng $\Phi$ |
| L8 tên tiếng Anh | L14-2-06, L14-4-02, mục 10 | đã sửa |
| L9 Monte Carlo không mang nhãn | L14-6-02, mục 11 | đã sửa: dòng "**Kỹ thuật.** Monte Carlo"; mục 11 bỏ nhãn "mới" của mẹo đổi đạo hàm (chỉ dùng trong một chứng minh) |
| L10 no-ai-slop trên mặt trang | L14-7-00, L14-2-02, L14-3-04, L14-5-06, L14-3-01 | đã sửa: dòng dẫn mạch 7 gọi tên ba phương pháp (23 âm tiết); "giữ nhiều độ dài bình phương hơn"; Diễn giải Ví dụ 14.3 nêu hệ số $R^2$; "bất đẳng thức Jensen cho cận nhưng không cho khe hở" |
| L11 no-ai-slop trong ghi chú diễn giả | L14-1-01, L14-1-03, L14-2-08, L14-6-09, L14-7-02, L14-7-06 | đã sửa; URL chuyển vào trường "Loại" của L14-7-06 (thông tin cho người viết) |
| L12 nhắc lại trùng | L14-5-01 | đã sửa: câu nêu vấn đề thay "Nhắc lại:" |
| L13 số âm tiết L14-7-07 | Q10, bảng đếm, mục 6 | đã sửa: 69 ở cả ba chỗ |
| L14 dữ liệu một dòng | L14-3-06 | đã sửa: mỗi cặp điểm một dòng (7 dòng, ngoại lệ) |
| L15 thiếu $p_\theta(x\mid z)$ | L14-6-05 | đã sửa |

Không có phát hiện bị bác bỏ. Hai điểm sửa có kèm ngoại lệ mật độ: M3 (L14-1-03, 100/80) và L14 (L14-3-06, 7 dòng). Số trang giữ 59, thời lượng 120 phút.

## Phụ lục: bản đồ mạch của ghi chú

Nội dung cũ của tệp này (bản đồ hành trình của ghi chú bài giảng, trước khi có deck), giữ nguyên văn.

# Bản đồ hành trình Lecture Note 14

Sản phẩm là Markdown, không phải storyboard trang chiếu. Bốn mạch theo phần F của kế hoạch; phần ứng dụng/tổng kết/bài tập phục vụ bốn mạch này.

| Khái niệm | Nhu cầu và trực quan | Hình thức/chứng minh | Ví dụ và diễn giải AI | Giới hạn và bài tập |
|---|---|---|---|---|
|PCA|Cảm biến2D chỉ lưu1số; chiếu bỏ thành phần vuông góc|ĐN14.1,ĐL14.2,MĐ14.3;proof phổ và Pythagore;hạngk mở rộng|VD14.1 giữ4điểm;SVG14.1;application14.1|NX14.4 phương sai/nhãn;BT14.1,A,E14.1|
|AE|Biểu diễn đường cong; hai ánh xạ và mã|ĐN14.5,MĐ14.6;proof via image(B)/projection/coordinateR|VD14.2 đổi độ lớn mã,VD14.3 lỗi tái tạo0 vẫn nhiều phân phối|NX14.7;BT14.2,E14.2|
|Mô hình biến ẩn|AE chưa chọn phân phối; lấy mã rồi nhiễu quan sát|ĐN14.8–9;chuẩn hóa bằng tích phân;Bayes|VD14.4 Gaussian2D giữcov của4điểm,posterior bằng hoàn bình phương|Phân biệt sample/integral/posterior;BT14.3,B,E14.2–3|
|KL/ELBO|Loglik chứa tích phân; chọn q dễ lấy mẫu|ĐN14.10,BĐ14.11,ĐN14.12,ĐL14.13;proof log inequality/Bayes|VD14.6 exact ELBO/gap;phân biệt KLprior/KLposterior|support/finiteness,theta fixed;BT14.4,E14.3|
|VAE/gradient|Suy luận chung tham số; gradient qua mẫu|MĐ14.14,ĐN14.15,MĐ14.16;proof Gaussian moments/change variables/dominated derivative|VD14.5 expected reconstruction,VD14.7 samples/gradient;SVG14.2|NX14.17 reconstruction/KL/collapse;BT14.5–6,C,E14.4;application14.2|

## Phụ thuộc và điểm nối

14.1 dùng phổ để giải nén, kết thúc ở giới hạn tuyến tính.14.2 mở rộng ánh xạ nhưng thiếu phân phối.14.3 bổ sung prior/likelihood và phát hiện marginal khó.14.4 dùng q/ELBO để tối ưu mô hình đó, giữ ranh giới giữa bound và loglik.14.5 dùng lại các số hiệu trong hai tình huống tự chứa, trong đó trường hợp giả thiết phân phối sai cho thấy bound chặt vẫn không đủ.14.6 kể chuỗi, phân loại kết quả và nối các bài05–13;14.7–9 kiểm tra và cung cấp lời giải không cần học liệu khác.

## Ánh xạ mục tiêu

|Mục tiêu|Kết quả/ví dụ|Bài kiểm tra|
|---|---|---|
|1|ĐL14.2,MĐ14.3,VD14.1|BT14.1;A;E14.1|
|2|MĐ14.6,VD14.2–3|BT14.2;E14.2|
|3|ĐN14.8–9,VD14.4|BT14.3;B;E14.2–3|
|4|BĐ14.11,ĐL14.13|BT14.4;E14.3|
|5|MĐ14.14/16,VD14.5–7|BT14.5;C;E14.3–4|
|6|NX14.17,application14.2|BT14.6;C;E14.2–3|

## Tám bước kiểm tra

Mỗi mạch có nhu cầu trước định nghĩa, trực giác nói rõ chưa là định nghĩa hoặc vai trò hình học; định nghĩa và kết quả có miền/giả thiết; proof ngay sau phát biểu; ví dụ có dữ kiện/tính/diễn giải/kiểmtra; nhận xét giới hạn và bài tập kèm hint/solution. Các kết quả trung gian KL/Gaussian dùng ví dụ14.5–6 ở cùng mạch, không lặp dữ liệu không cần thiết trong từng đoạn proof. Bài tập/ví dụ đều nêu dữ kiện tại chỗ. Hai SVG gốc không thay thế proof.

## Lệch storyboard khi dựng deck (người viết, 2026-11-16)

Đo bằng `deck_lint.py`, `deck_check.py`, `footer_check.py` (1600×900, 390×844). Mọi lệch dưới đây nhằm đạt 0 trang chạm chân trang và không tràn khung; nội dung, số hiệu, số liệu của ghi chú giữ nguyên.

| Trang | Lệch | Lý do |
|---|---|---|
| L14-1-03 | Mục tiêu rút còn 94 âm tiết (storyboard 100); vẫn trên trần 80 | Đã thử rút về 80: phải bỏ vế "tọa độ mã không duy nhất" hoặc "phân kỳ tới tiên nghiệm, hậu nghiệm" (cổng duyệt M3). Giữ ngoại lệ Q10; vế đầy đủ của mục tiêu 1, 5, 6 nhắc trong ghi chú diễn giả |
| L14-2-02 | Đẳng thức $\frac1n\sum_i\|z_i\|_2^2=\operatorname{tr}(U^\top SU)$ viết trong dòng, không hiển thị | Trang chạm chân trang |
| L14-2-04, 2-07, 3-03, 4-03, 5-03, 5-06, 6-04 | Công thức hiển thị của một bước đặt ngoài `li` (danh sách tách `ol` / `ol start`) | `ol` của Reveal là `inline-block`; công thức trong `li` làm danh sách rộng hơn màn hẹp và cắt chữ |
| Mọi công thức đánh số | `\tag{k}` thay bằng `\qquad(k)` | Ở 390 px, nhãn `\tag` định vị tuyệt đối đè lên công thức cuộn ngang |
| L14-3-06 | Tiêu đề "Bài tập: tái tạo và tọa độ mã trên đường chéo"; $f,g$ chuyển vào câu (1) của đề; bố cục: dữ liệu và $S$ hai cột, đề một hộp, lời giải fragment. Vẫn 7 dòng (ngoại lệ đã duyệt) | Tiêu đề cũ hai dòng làm trang chạm chân trang |
| L14-4-06 | Tiêu đề "Bài tập: phân phối của mã và nhiễu trên đường chéo"; câu 3 và câu 4 hai cột, lời giải từng câu bằng fragment dưới đề; 5 dòng, 75 âm tiết (deck_check) / 80 (lint) | Song song với L14-3-06; trang cũ tràn 184 px |
| L14-4-05 | Log-mật độ đồng thời một dòng (không `aligned`) | Vừa khung 1280; ở 390 px cuộn ngang trong hộp `.formula` |
| L14-5-04 | (7.2) viết `aligned` hai dòng | Một dòng tràn và đè số hiệu ở 1600×900 |
| L14-5-05 | Giả thiết "mật độ biên" đưa lên dòng "Giả thiết:"; hai gạch đầu dòng còn lại | Giữ 6 dòng |
| L14-5-07 | Cột đầu bảng có nhãn "Tiêu chí" ở màn hẹp | Bảng xếp chồng ở 390 px hiện nhãn rỗng |
| L14-5-08 | "mọi $s_j>0$" viết "$s_j>0$" (chỉ số $j$ chạy mọi tọa độ); dòng "Chứng minh." rút chữ | Trang chạm chân trang 2 px |
| L14-5-10 | Bỏ hình `elbo-gap.svg` (Q12 cho phép bỏ); trang một cột | Hình đặt dưới năm dòng tính làm trang tràn 170 px; đặt bên phải thì chữ hình dưới 16 px |
| L14-5-11 | Tiêu đề "Bài tập: phân kỳ Gaussian và cận dưới"; câu 4 và 5 hai cột, một lời giải fragment; lời giải câu 4 chỉ ghi $\log p_\theta(1)\approx-1{,}5155$, dạng chính xác $-\frac12\log(4\pi)-\frac14$ ở ghi chú diễn giả. 87 âm tiết (lint) | Trang tràn 121 px |
| L14-6-01 | Dòng "Mỗi $x_i$…" và "Trực quan." đặt trên; `grid2` gồm Định nghĩa 14.19 (mục tiêu (8.1) viết trong dòng) và hình; "Câu hỏi:" rút "về mô hình sinh" | Trang chạm chân trang; giữ hình đủ rộng ở 1600×900 |
| L14-6-03 | Một cột (không `grid2`); "$\vartheta\in\mathcal B$" đưa vào (8.3); dòng ước lượng không chệch rút chữ | Hai cột làm (8.3) đè số hiệu và trang tràn 235 px |
| L14-6-05 | Bảng và hai dòng kết quả đặt `grid2` | Trang chạm chân trang |
| L14-6-06 | Bước 4 viết $(\theta,\phi)\leftarrow(\theta,\phi)+\alpha\nabla_{\theta,\phi}\widehat{\mathcal L}_I$ (cập nhật đồng thời); chi phí mỗi vòng chuyển sang ghi chú diễn giả; 7 dòng (ngoại lệ: công thức $\widehat{\mathcal L}_i$ thuộc bước 3) | Trang tràn 88 px |
| L14-7-01 → L14-7-01, L14-7-02 | Bảng tổng kết tách theo phương án ở mục quyết định của L14-7-01: "Kết quả và giả thiết: nén dữ liệu" (3 hàng), "…: mô hình sinh" (4 hàng). Các trang sau đổi mã: Vấn đề trung tâm L14-7-03, Bài tập 14.5 L14-7-04/05, Câu hỏi tự kiểm tra L14-7-06, Bài tập về nhà L14-7-07, Tài liệu tham khảo L14-7-08. Tổng 60 trang (trần NT27) | Bảy hàng tràn 250 px |
| L14-7-04, 7-05 | Tiêu đề "Bài tập: phương sai của PCA xác suất"; câu phương sai theo hướng $v$ gộp vào hộp "Câu hỏi:"; "mật độ biên" viết "biên" | Trang chạm chân trang |

Phát hiện `deck_lint.py` còn lại, đều có lý do: L14-1-03 (94/80, trên); L14-3-06, L14-6-06 (7 dòng, trên); L14-4-06 (80), L14-5-11 (87), L14-6-08 (86): đề bài tập giữ câu chữ (Q10); L14-5-07 (71): bảng so sánh, trần 80; L14-7-03 "Vấn đề trung tâm" (69): trần 80 của trang tổng kết, lint chỉ nhận tiêu đề "Tổng kết…"; L14-7-08 (69): tên sách (Q10). Báo động `deck_check.py` còn lại: OVERFLOW 1–3 px trên đuôi SVG của `\sqrt` (L14-3-06, 4-04, 4-05, 7-03, 7-05; báo động giả đã biết); NARROW-H (1–3 phần tử) ở chính các trang có $\sqrt{\cdot}$ trên, cùng nguyên nhân.

## Biên tập theo năm báo cáo duyệt (2026-11-16)

Theo bảng quyết định E1–E10 của điều phối viên (`review-log.md`, mục "Năm báo cáo duyệt …"). Số trang giữ 60.

**Đổi chỗ và mã trang.** Nhận xét 14.5 lên L14-2-08, Định lý 14.6 xuống L14-2-09 (thứ tự §4.2 → §4.3; L14-2-09 kết bằng "Mã và tái tạo vẫn tuyến tính." nối sang mạch 3). Thuật toán 14.21 lên L14-6-05, Ví dụ 14.8 xuống L14-6-06 (thứ tự §8.1). Mạch 7: L14-7-01, L14-7-02 (bảng tách), L14-7-03 … L14-7-08 như danh sách trang. Thời lượng theo mạch không đổi.

**Tiêu đề đổi:** L14-3-06 "Bài tập: tái tạo và tọa độ mã trên đường chéo"; L14-4-05 "Ví dụ: mô hình sinh tuyến tính Gaussian hai chiều"; L14-4-06 "Bài tập: phân phối của mã và nhiễu"; L14-5-05 "Phân rã log-hợp lý qua cận dưới bằng chứng" (E9); L14-5-09 "Kỳ vọng tái tạo và lỗi bình phương" (trang công thức (7.6) kèm khối Ví dụ 14.6); L14-5-11 "Bài tập: phân kỳ và cận dưới bằng chứng"; L14-7-01/02 "Kết quả và giả thiết của bài toán nén / của mô hình sinh"; L14-7-04/05 "Bài tập: phương sai của PCA xác suất". Tiêu đề bài tập rút gọn để một dòng, tránh chạm chân trang.

**Chuyển nội dung.** Định nghĩa 14.16 từ L14-5-07 sang cuối L14-5-06 (sau bước "θ cố định: cực đại $\mathcal L$ là cực tiểu KL tới hậu nghiệm"); dòng "Cách khác:" (Jensen) của L14-5-06 chuyển vào ghi chú diễn giả cùng chuỗi bất đẳng thức đúng (E2). L14-5-05 có dòng "Trực quan."; hệ quả theo $\phi$ chuyển sang bước 3 của L14-5-06. PCA xác suất lên mặt trang ở L14-4-05 (Diễn giải, E8); L14-7-04 dùng tên đã có. Câu hỏi mạch 4 lên L14-4-01 nguyên văn ghi chú dòng 21 (E8). Hình L14-5-10 vẫn bỏ (E10).

**Công thức (E5).** Mọi công thức hiển thị vừa 354 px ở 390×844 (đo bằng Playwright, `scrollWidth ≤ clientWidth`): ngắt `aligned`, số hiệu (4.4), (5.1), (6.1)–(6.3), (7.1)–(7.6), (8.3) chuyển vào dòng chữ đứng trước công thức; (4.3), (8.2) giữ trong công thức (`\quad`). Ở L14-5-08, (7.4) và (7.5) ngắt hai dòng (căn trái); dòng "Chứng minh." rút còn "(7.4) với $c=0$, $\gamma=1$ cho từng tọa độ", ý "mật độ là tích theo tọa độ" chuyển vào ghi chú diễn giả. Ở L14-6-03, dòng ước lượng không chệch viết "các bản sao $\varepsilon^{(r)}$ độc lập" và điều kiện $\vartheta\in\mathcal B$ đặt trong (8.3). Để không chạm chân trang ở 1600×900, công thức nhiều dòng đặt cạnh chữ bằng `grid2`/`responsive` (L14-2-04, 3-03, 4-05, 5-02, 5-03, 5-04, 5-05, 5-08, 5-09, 6-03, 6-05, 7-04); ở màn hẹp lưới về một cột.

**Ký hiệu.** Trang "Hoàn bình phương" dùng $\kappa,\nu,z_0$ thay $a,b,c$ (trùng Bổ đề 14.17 và cỡ nhóm $b$); L14-4-05 dùng $\mathrm{const}$ thay hằng số $C$ (trùng ma trận $C$ của Bài tập 14.5).

**Ngoại lệ mật độ sau biên tập** (đếm theo `deck_lint.py`; đều dưới 1,5 lần trần; vượt trần do yêu cầu của năm báo cáo):

| Trang | Đếm | Trần | Lý do |
|---|---:|---:|---|
| L14-1-02 | 67 âm tiết, 6 dòng | 60 | E4: thêm "mẫu độc lập cùng phân phối", MLE, dòng mạng nơ-ron và lan truyền ngược |
| L14-1-03 | 110 | 80 | E3: ngoại lệ tới 110 do điều phối viên chốt |
| L14-2-09 | 66 | 60 | thêm "thành phần chính (principal component)" lên mặt trang (su-pham) |
| L14-3-02 | 63 | 60 | "mã chỉ xác định sai khác phép đổi tọa độ $R$" thay "tới $R$" (su-pham) |
| L14-3-05 | 65 | 60 | dữ kiện thành danh sách (su-pham); Diễn giải thêm "bộ giải mã chỉ khớp tại mã của mẫu" (chuyen-gia) |
| L14-4-06 | 81; 2 hộp | 60 | đề Bài tập 14.1 câu 3–4 giữ câu chữ (Q10, E7) |
| L14-5-01 | 69 | 60 | câu hỏi mạch viết đủ (su-pham), nhu cầu thước đo lên mặt trang (mach-truyen 3) |
| L14-5-04 | 69 | 60 | E9: "(evidence lower bound, ELBO; còn gọi là cận dưới của log-hợp lý)" |
| L14-5-11 | 89; 2 hộp, hộp (4) ba câu | 60 | đề Bài tập 14.2 câu 4–5 nguyên văn (Q10, E7) |
| L14-6-01 | 68 | 60 | Định nghĩa 14.19 đủ ba thành phần và lựa chọn Gaussian tách riêng (chuyen-gia); câu hỏi mạch viết đủ |
| L14-6-02 | 65 | 60 | "Kỹ thuật." Monte Carlo có vế "dùng khi" (NT7, su-pham) |
| L14-6-04 | 71 | 60 | "Lưu ý:" giữ "ở dạng đã nêu" của ghi chú (chuyen-gia); bước 3 "đổi thứ tự đạo hàm và kỳ vọng" |
| L14-6-05 | 7 dòng | 6 | công thức $\widehat{\mathcal L}_i$ thuộc bước 3 |
| L14-6-07 | 84 | 60 | Nhận xét 14.22 đủ điều kiện cận chặt và kết luận chẩn đoán (toan-hoc, chuyen-gia, su-pham) |
| L14-6-08 | 86; 1 hộp năm câu | 60 | đề Bài tập 14.4 giữ câu chữ (Q10, E7) |
| L14-3-06 | 7 dòng; 1 hộp | 6 | dữ liệu mỗi cặp điểm một dòng (Q10) |
| L14-7-03 | 60 | 60 | (lượt 2: rút về trần 60 của trang danh sách, R3) |
| L14-7-04 | 1 hộp ba câu | — | đề Bài tập 14.5 giữ câu chữ (E7) |
| L14-7-06 | 64 | 60 | câu hỏi 3 nguyên văn ghi chú §11 (su-pham) |
| L14-7-08 | 76 | 60 | tên sách, số mục; dòng nối viết đủ theo §11 và gọi tên Bài 13 (mach-truyen 17) |

## Biên tập lượt 2 theo kiểm lại 1 (2026-11-16)

Theo `reviews/deck-kiem-lai-1.md` (R1–R20) và quyết định của điều phối viên. Số trang giữ 60.

- R1: L14-5-05 khôi phục kết luận "tối ưu theo $\phi$" (dòng dưới (7.3)). R2: L14-5-08 dòng "Chứng minh." đứng sau phát biểu Mệnh đề 14.18 (cột phải, sau (7.5)), nêu "mật độ chéo là tích theo tọa độ". R3: L14-7-03 rút về 60 âm tiết (dòng về bốn quan sát tách hai dòng; câu đầy đủ ở ghi chú diễn giả). R5: Định nghĩa 14.16 đứng độc lập (hai dòng). R6: "với mọi $h$" ở L14-6-03. R7: $k<d$ ở bước 4 L14-3-03. R8, R10, R11, R16, R20: câu chữ theo đề xuất. R9: ghi chú diễn giả L14-5-02. R12: "mô hình sinh tuyến tính Gaussian" ở ghi chú diễn giả. R13: "Trực quan." L14-5-08 gọi tên KL tới tiên nghiệm trong (7.2). R14: hình `pca-projection-slide.svg`. R15: tiêu đề L14-5-10 và dòng dẫn L14-6-00 dùng "cận dưới bằng chứng". R17: khối có nhãn tách dòng riêng ở L14-5-02, 5-09, 6-06. R19: giữ (bộ giải mã chỉ ở ghi chú diễn giả).
- R4 (dòng ≤ 20 âm tiết): tách hoặc rút mọi dòng dài ở L14-3-01, 3-02, 3-05 (ý "bộ giải mã chỉ khớp tại mã của mẫu" vào ghi chú diễn giả), 4-01, 4-03, 4-05, 5-01, 5-04, 6-01, 6-04, 6-06, 6-07, 7-03, 7-05, 7-06, 7-08. Ngoại lệ dòng còn lại: L14-1-03 mục tiêu 5 (23 âm tiết; câu chữ mục tiêu do điều phối viên chốt ở E3); L14-1-05 (27; nguyên văn câu hỏi trung tâm); L14-4-06 (32, 26) và L14-5-11 (35, 34): đề bài tập nguyên văn (NT24).
- Ngoại lệ 7 dòng do tách dòng (R4, R17) hoặc khôi phục kết luận (R1): L14-5-02, 5-05, 5-09, 6-06; cùng L14-3-06, 6-05 đã có.
- Ngoại lệ âm tiết sau lượt 2 (đếm `deck_lint.py`): L14-1-02 67 > 60; L14-1-03 110 > 80; L14-2-09 66 > 60; L14-3-01 64 > 60; L14-4-01 62 > 60; L14-4-06 81 > 60; L14-5-01 66 > 60; L14-5-04 72 > 60; L14-5-05 66 > 60; L14-5-06 66 > 60; L14-5-11 89 > 60; L14-6-01 63 > 60; L14-6-02 65 > 60; L14-6-04 65 > 60; L14-6-07 86 > 60; L14-6-08 86 > 60; L14-7-06 64 > 60; L14-7-08 72 > 60. Lý do như bảng ngoại lệ lượt 1; tăng thêm ở L14-3-01, 4-01, 5-05, 5-06, 5-08, 7-08 do tách dòng và khôi phục nội dung theo R1, R2, R4, R5, R13.

## Lượt mật độ (2026-11-16)

Theo chốt của điều phối viên, chỉ giữ các ngoại lệ: L14-1-03 (110/80, mục tiêu), L14-3-06 (7 dòng), đề bài tập nguyên văn L14-4-06 (81), L14-5-11 (89), L14-6-08 (86), L14-7-08 (72/80, tài liệu tham khảo). Mọi trang khác ≤ 60 âm tiết, ≤ 6 dòng (`deck_lint.py`: đúng 6 phát hiện trên). Các ngoại lệ âm tiết và 7 dòng ghi ở hai mục biên tập trước không còn hiệu lực. Giải thích chuyển xuống ghi chú diễn giả: tên tiếng Anh MLE (L14-1-02), "tạo quan sát qua hai bước" (L14-4-01), "hậu nghiệm bằng $p(z)$" và "biến ẩn không được dùng" (L14-6-07), tương đương ở bước 3 (L14-5-06). Gộp dòng: Bổ đề 14.13 (L14-5-02), kết luận tối ưu theo $\phi$ vào dòng Kết luận (L14-5-05), dữ kiện Ví dụ 14.6, 14.8 thành một dòng (L14-5-09, 6-06), Đầu ra vào dòng Đầu vào (L14-6-05). L14-6-01 giữ "suy luận dùng chung tham số (amortized inference)" trên mặt trang; ghi chú diễn giả rút còn ≤ 150 âm tiết.

## Lượt sửa cuối theo kiểm lại 2 (2026-11-16)

Theo `reviews/deck-kiem-lai-2.md` (N1–N9). Ngoại lệ mới: **L14-6-07, 75 âm tiết** (trần 60; điều phối viên cho tối đa 75): Nhận xét 14.22 giữ trên mặt trang đủ điều kiện "bộ giải mã cũng bỏ qua $z$, hậu nghiệm bằng $p(z)$, $q_\phi=p(z)$ cho cận chặt" và định nghĩa suy sụp hậu nghiệm "biến ẩn không được dùng" (phục vụ mục tiêu học tập 6). Các ngoại lệ còn lại như mục "Lượt mật độ". Dòng > 20 âm tiết (N2) đã tách hoặc rút: L14-5-02 (Bổ đề 14.13 viết "bằng $0\iff q=p$ hầu khắp nơi"; "ngoài tập thể tích $0$" vào ghi chú diễn giả), L14-5-05 (kết luận dùng $\iff$), L14-7-06 (câu hỏi 3 hai dòng, nguyên văn §11). Chuyển chỗ: "Lựa chọn Gaussian" của Định nghĩa 14.19 từ L14-6-01 sang dòng đầu L14-6-02, nơi tái tham số hóa dùng nó; L14-6-01 ghi số biến $2kn$ ($\mu_i,s_i\in\mathbb R^k$); "$\tau$ cố định" ở dòng mục tiêu (8.1).
