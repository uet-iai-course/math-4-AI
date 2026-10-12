# Dàn bài Bài 05 — Không gian đặc trưng nhiều chiều

Quy ước viết tắt: lý thuyết (LT), bài tập (BT), chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), hạ gradient ngẫu nhiên (SGD). Tệp liên quan: [storyboard.md](storyboard.md), [review-log.md](review-log.md).

Quy ước mã trang: `MD` mở đầu, `HQ` hồi quy nhiều chiều (phiên A1), `LG` hồi quy logistic và chính quy hóa (phiên A2), `CP` độ cong và chi phí tính toán (phiên A3), `KL` kết luận. Mã trang, thời lượng và mã LLO chỉ dùng trong dàn bài, storyboard và nhật ký; không xuất hiện trên mặt trang chiếu hay trong ghi chú diễn giả. Mục **Ghi chú** của từng trang dưới đây là đặc tả nội dung cho ghi chú diễn giả; các mã trang của bài khác trong đó (RG17, RN07, C05, C06…) chỉ để truy nguyên, khi soạn ghi chú diễn giả phải thay bằng tên kết quả (ví dụ "định lý hội tụ tuyến tính của hạ gradient trong bài bổ trợ về hội tụ"). Các mã KQ, KN, MT, G1–G5, D, R, tên phiên A1–A3, "điểm hòa giải" và "giao diện A–B" cũng chỉ dùng trong kế hoạch. Trên mặt trang, kết quả được đánh số theo bài (Mệnh đề 1–5, Định lý 1–4); bảng Kết quả dùng lại ghi tương ứng giữa nhãn trên trang và mã KQ. Giữ nguyên các nhãn đã hiện trên mặt trang của bài khác: T2b, T5, T6, T7, T8 của Bài 05b (từ 2026-10-12 thay bằng số hiệu Định lý 05b.18(b), 05b.36, 05b.39, 05b.41, 05b.43 theo AGENTS.md, mục "Mã nội bộ của bài khác"); Mệnh đề 01.6, Định lý 01.38… của ghi chú Bài 01.

## Phạm vi và quyết định thiết kế

Dàn bài này lập ngày 2026-10-11 theo thiết kế hai bài do người dùng đưa ra cùng ngày. Bài 05 ứng với **Lecture A — Scaling the Feature Space**, phụ đề gốc "From convex regression to the limits of deterministic optimization". Thiết kế gồm ba phiên, mỗi phiên một câu hỏi trung tâm; trong bài, mỗi câu hỏi được viết lại thành nhu cầu của một mạch giữa:

| Phiên | Tên trong thiết kế | Câu hỏi trung tâm (nguyên văn) | Nhu cầu của mạch |
|---|---|---|---|
| A1 | High-dimensional regression | What breaks when d grows? | Xác định điều gì thay đổi ở nghiệm bình phương nhỏ nhất khi số đặc trưng $d$ tăng tới và vượt kích thước mẫu $n$ |
| A2 | Logistic regression and regularization | Why can a convex learning problem have no minimizer? | Giải thích vì sao một bài toán học lồi có thể không có cực tiểu, và sửa bài toán để cực tiểu tồn tại và duy nhất |
| A3 | Curvature and computational cost | What is the price of a faster update? | Xác định chi phí tính toán của một bước cập nhật hội tụ nhanh hơn |

- **Tên bài:** Bài 05: Không gian đặc trưng nhiều chiều.
- **Phụ đề (tạm thời):** Hồi quy lồi và giới hạn của tối ưu tất định. Dịch sát phụ đề gốc sẽ cho dạng "Từ … đến …", bị quy tắc tiêu đề cấm; phụ đề danh từ này chờ người dùng xác nhận (D1).
- **Tệp deck đề xuất:** `2627-1/lecture-05-khong-gian-dac-trung-nhieu-chieu.html`. Học liệu: `2627-1/materials/lec-05/{lecture-note,exercises}.md`, viết lại sau khi deck ổn định.
- **Đối tượng:** sinh viên năm ba đã học Bài 00–04; Bài 05b (hội tụ hạ gradient và SGD) và Bài 05c (xác suất đến trung bình nhóm nhỏ) là học liệu bổ trợ.
- **Thời lượng:** Buổi 5 theo đề cương DOCX gồm 2 tiết LT và 1 tiết BT, tức ba khối 1 tiết. Mỗi phiên A1, A2, A3 chiếm một khối. Khối 1 gồm mạch MD và HQ, khối 2 là LG, khối 3 gồm CP và KL. Thời lượng ghi bằng phần tiết, không quy đổi ra phút.
- **Quy mô (cập nhật 2026-10-12):** 67 trang, 5 mạch; xem mục "Cập nhật 2026-10-12" cuối tệp. **Quy mô ban đầu:** 44 trang (43 trang theo kế hoạch đã duyệt; trang HQ08 được tách thành HQ08 và HQ09 sau cổng storyboard 2026-10-11), 5 mạch ngoài (mở đầu, ba mạch ứng với ba phiên, kết luận). Không gộp hai phiên vào một mạch; không tách phiên nào thành hai mạch vì mỗi phiên có một nhu cầu liền mạch.

**Luận đề xuyên suốt** (yêu cầu người dùng 2026-10-11, áp dụng cho cả Bài 05 và Bài 06). Bài 01–04 làm việc trong một khung gọn: hàm mục tiêu lồi có cực tiểu chính xác, và các phương pháp tất định hội tụ tới cực tiểu đó với bảo đảm có điều kiện. Khung này không còn là bức tranh đúng khi mô hình và dữ liệu lớn, vì hai lý do được nêu sớm (MD03c) và được kiểm chứng lần lượt trong bài:

1. **Tính toán không cho phép dùng toàn bộ dữ liệu ở mỗi bước.** Một gradient đầy đủ tốn $O(nd)$, một bước Newton tốn $O(nd^2+d^3)$; với $n$ và $d$ của bài toán hiện đại, ngay một bước như vậy mỗi lần cập nhật đã vượt ngân sách. Phiên A3 đếm các chi phí này; kết luận nêu thành giới hạn (i), Bài 06 (B3) mang hệ quả: SGD theo nhóm nhỏ là phương án còn lại khi ngân sách mỗi bước cố định, và nhiễu cùng tốc độ yếu hơn là hệ quả phải chấp nhận, không phải mục tiêu thiết kế.
2. **Cực tiểu chính xác của mất mát huấn luyện không phải đích.** $F$ là đại lượng thay thế cho rủi ro trên dữ liệu mới $R$. Phiên A1 cho thấy khớp dữ liệu huấn luyện tốt hơn khi $d$ tăng nhưng sai số trên dữ liệu ngoài mẫu xấu đi; phiên A2 cho thấy trên dữ liệu tách được, cực tiểu chính xác không tồn tại và chính quy hóa là thành phần làm bài toán đặt chỉnh. Kết luận cho thấy dừng sớm cho sai số xác thực nhỏ hơn nghiệm chính xác; vì vậy dừng sớm và chính quy hóa là một phần của phương pháp.

Điều còn giữ được khi rời khung tất định (KL04, chính xác hóa sau cổng storyboard Bài 06 và sau rà soát 2026-10-12): tính giảm mỗi bước của hạ gradient dùng gradient đầy đủ khi còn tính được (bổ đề giảm); với SGD, bất đẳng thức một bước có thêm số hạng nhiễu; với $F_\lambda$ lồi mạnh, bước hằng tới lân cận với $\mathbb E\lVert w_k-w^*\rVert^2$ có bậc $\eta\tau^2/\mu$ (T5), bước giảm dần tới cực tiểu với tốc độ $O(1/k)$ (T6); điểm dừng xấp xỉ theo nghĩa của T7 ($\min_{k<K}$ chuẩn gradient) và T8 (trung bình kỳ vọng, có mức nhiễu nền). SGD không bảo đảm $F$ giảm theo kỳ vọng ở mỗi bước.

**Tệp kế hoạch cũ.** Dàn bài và storyboard của deck Bài 05 cũ (từ ngày 2026-10-12 là Bài 06b, `lecture-06b-toi-uu-bac-nhat-cho-hoc-may.html`, 37 trang) nằm ở `planning/lec-06b/outline.md` và `storyboard.md` (trước đó là `outline.old-2026-10-01.md` và `storyboard.old-2026-10-01.md` trong thư mục này); nhật ký cũ nằm ở `planning/lec-06b/review-log.md` và `review-log-lecture-note.md`, nhật ký của kế hoạch mới ở `planning/lec-05/review-log.md`.

**Trạng thái.** Ngày 2026-10-12 deck Bài 05 được dựng theo dàn bài này: `lecture-05-khong-gian-dac-trung-nhieu-chieu.html`, 44 trang, 5 mạch, mười một SVG trong `img/lec-05/` (chín theo kế hoạch, hai thêm khi dựng: `lg-penalty-along-ray.svg`, `lg-curvature-1d.svg`); sai lệch so với dàn bài ghi ở nhật ký, vòng dựng deck. Ghi chú bài giảng và bài tập chưa viết lại. Deck cũ (từ ngày 2026-10-12 là Bài 06b, `lecture-06b-toi-uu-bac-nhat-cho-hoc-may.html` và `materials/lec-06b/`) không bị sửa. Việc giữ deck hiện hành làm bài bổ trợ là quyết định của người dùng (D2).

## Đối chiếu LLO/CLO

Đề cương Buổi 5 (LLO11–LLO13) và Buổi 6 (LLO14–LLO16) đọc trực tiếp từ `sources/đề cương-cơ sở toán học của AI-v2.docx`. CLO1: hiểu, đánh giá thuật toán tối ưu, vận dụng vào bài toán thực tế; CLO2: vận dụng, phân tích để xây dựng mô hình học máy; CLO4: nhận dạng, phân tích bài toán tối ưu, đề xuất mô hình và thuật toán.

| Phiên | LLO được hỗ trợ thật sự | Hỗ trợ ở điểm nào | Phần LLO không được hỗ trợ |
|---|---|---|---|
| A1 Hồi quy nhiều chiều | LLO11 → CLO1 | Phân biệt rủi ro thực nghiệm $F$ (mục tiêu tối ưu) với rủi ro kỳ vọng $R$ (mục tiêu học); điều kiện hóa kém qua số điều kiện $\kappa(X^TX)$ | Nhiều cực tiểu địa phương, độ sâu đồ thị tính toán (thuộc mô hình phi lồi, Bài 06) |
| A2 Hồi quy logistic và chính quy hóa | LLO11 → CLO1; CLO2 | Bài toán học lồi có thể không có nghiệm; chính quy hóa đổi bài toán để có nghiệm duy nhất; chọn $\lambda$ là quyết định mô hình | Như trên |
| A3 Độ cong và chi phí tính toán | LLO15 (một phần: Newton) → CLO4; LLO11 (điều kiện hóa kém làm chậm hạ gradient) | Đếm chi phí và số bước của hạ gradient và Newton, chọn phương pháp theo $(n,d,\kappa,\varepsilon)$ | Gradient liên hợp, BFGS; Newton cho mạng nơ ron |
| Kết luận | LLO11 → CLO1 | Dừng sớm, đánh đổi tối ưu–ước lượng, nhu cầu gradient ngẫu nhiên | — |

| Mục tiêu của bài | Hành vi kiểm tra được | Chuẩn đầu ra |
|---|---|---|
| MT1 | Giải phương trình chuẩn, xác định hạng và số điều kiện; phân biệt sai số huấn luyện với sai số ngoài mẫu khi $d$ tăng; chọn mô hình bằng tập xác thực | LLO11 → CLO1 |
| MT2 | Chứng minh mất mát logistic không có cực tiểu trên dữ liệu tách được; chứng nhận $F_\lambda$ lồi mạnh, tính $\mu$, $L$, $\kappa$ | LLO11 → CLO1; CLO2 |
| MT3 | Đếm chi phí một bước của hạ gradient và Newton; chọn phương pháp theo $(n,d,\kappa,\varepsilon)$ | LLO15 (Newton) → CLO4; LLO11 |

LLO12 (SGD, momentum, Nesterov), LLO13 (khởi tạo), LLO14 (AdaGrad, RMSProp, Adam), LLO16 (chuẩn hóa theo lô, hạ theo tọa độ, trung bình Polyak, tiền huấn luyện có giám sát, phương pháp liên tục, curriculum learning) không được Bài 05 mới hỗ trợ. Phần SGD của LLO12 thuộc B3 của Bài 06 mới. Theo quyết định của điều phối viên, bài không được bổ sung các nội dung này để phủ đủ LLO.

## Nội dung đề cương không còn

Danh sách tính từ phía Bài 05; kế hoạch Bài 06 bổ sung phần thuộc Lecture B. Điều phối viên trình bảng này cho người dùng (D3).

| Nội dung đề cương (Goodfellow et al., ch. 8) | LLO | Gợi ý nơi đặt |
|---|---|---|
| §8.3.2–8.3.3 momentum, Nesterov | LLO12 | Bài bổ trợ 06b (deck Bài 05 cũ, `lecture-06b-toi-uu-bac-nhat-cho-hoc-may.html`, mạch C, C01–C08), đã kiểm định |
| §8.4 chiến lược khởi tạo | LLO13 | B1/B2 của Bài 06 có thể nêu phá đối xứng; phần thang Glorot tái dùng mạch D của deck Bài 05 hiện hành trong "06b" |
| §8.5 AdaGrad, RMSProp, Adam | LLO14 | Bài bổ trợ 06c (deck Bài 06 cũ, `lecture-06c-toi-uu-mang-sau.html`), các mạch tương ứng |
| §8.6 gradient liên hợp, BFGS | LLO15 (phần còn lại) | Bài bổ trợ 06c (deck Bài 06 cũ, `lecture-06c-toi-uu-mang-sau.html`); trong Bài 05 mới chỉ có một nhận xét ở ghi chú CP07 rằng các phương pháp này giảm chi phí $d^3$ của Newton |
| §8.7 chuẩn hóa theo lô, hạ theo tọa độ, trung bình Polyak, tiền huấn luyện, phương pháp liên tục, curriculum | LLO16 | Bài bổ trợ 06c (chuẩn hóa theo lô và các mục còn lại của §8.7); trung bình lặp có trọng số đã có ở Bài 05b (D03, T3, T4) |
| §8.2.2–8.2.5 nhiều cực tiểu, yên ngựa, vách dốc, độ sâu | LLO11 (phần còn lại) | B2 của Bài 06 mới |

## Khung lý thuyết chung

### Vấn đề trung tâm

Với mô hình tuyến tính theo đặc trưng và mất mát lồi, xác định điều gì thay đổi khi số đặc trưng $d$ tăng so với kích thước mẫu $n$: cực tiểu của rủi ro thực nghiệm có tồn tại và duy nhất không, có dự đoán tốt trên dữ liệu mới không, và tính nó tốn bao nhiêu phép tính. Câu này đặt trên MD03c dưới dạng vấn đề cần giải quyết, không dùng câu hỏi tu từ.

### Đối tượng và ký hiệu chung

| Ký hiệu | Nghĩa | Kiểu, kích thước | Đối chiếu bài khác |
|---|---|---|---|
| $u_i$ | đầu vào thô của mẫu $i$ (trong ví dụ là một số thực) | $\mathbb R$ hoặc $\mathbb R^r$ | Boyd §7.1.1 dùng $u$ cho biến giải thích |
| $\varphi$, $x_i=\varphi(u_i)$ | ánh xạ đặc trưng; vector đặc trưng, tọa độ đầu bằng $1$ | $x_i\in\mathbb R^d$ | Bài 01 viết $a_i$; Bài 06 viết $x$ cho đầu vào thô (là $u$ ở đây), nên vector đặc trưng $(1,u)$ ở đây ứng với $(1,x)$ của Bài 06 và $d_{05}=d_{06}+1=p$ |
| $y_i$ | nhãn: số thực (hồi quy) hoặc $\pm1$ (phân loại) | | như Bài 01 |
| $n$, $d$ | kích thước mẫu, số đặc trưng | $\mathbb N_{>0}$ | Bài 05 cũ, 05b, 05c viết $N$ cho kích thước mẫu |
| $X$ | ma trận thiết kế, hàng thứ $i$ là $x_i^T$ | $\mathbb R^{n\times d}$ | như Bài 01 |
| $\theta=w$ | tham số; với mô hình tuyến tính $\theta=w$, hệ số chặn nằm trong $w$ | $\mathbb R^d$ | xem quy ước hệ số chặn bên dưới |
| $\ell_i(w)$, $F(w)=\frac1n\sum_i\ell_i(w)$ | mất mát mẫu $i$; rủi ro thực nghiệm (mất mát huấn luyện) | $\mathbb R^d\to\mathbb R$ | Bài 05 cũ viết $J$; 05b viết $f$ |
| $R(w)=\mathbb E_{(u,y)\sim P}\,\ell(w;u,y)$ | rủi ro kỳ vọng; ước lượng bằng trung bình trên tập kiểm thử | | như Bài 05 cũ, 05c |
| $m_i(w)=y_ix_i^Tw$ | biên có dấu | | như Bài 01 |
| $\sigma(z)=1/(1+e^{-z})$ | hàm sigmoid | | như Bài 01; xem ghi nhận về $\sigma$ bên dưới |
| $\lambda>0$, $F_\lambda=F+\frac\lambda2\lVert w\rVert_2^2$, $w_\lambda$ | hệ số chính quy hóa, mục tiêu chính quy hóa, nghiệm duy nhất | | Bài 01 viết $\mu$ (dạng tổng), Bài 02 viết $\lambda$ |
| $L,\mu,\kappa=L/\mu$ | hằng số trơn, hằng số lồi mạnh, số điều kiện của hàm mục tiêu | | như Bài 04, 05b (H2, H3) |
| $\kappa(A)=\lambda_{\max}(A)/\lambda_{\min}(A)$ | số điều kiện của ma trận đối xứng nửa xác định dương; quy ước $\kappa=\infty$ khi $\lambda_{\min}=0$ | | |
| $\eta$, $w_k$, $e_k=F_\lambda(w_k)-F_\lambda(w_\lambda)$ | bước, dãy lặp, sai số giá trị | | 05b viết $x_k$, $e_k=f(x_k)-f^*$ |

Ánh xạ ký hiệu nêu một lần ở ghi chú MD04 và nhắc ở CP04: dãy lặp $x_k$ của Bài 05b là $w_k$ ở đây ($\theta_k$ trong Bài 06); $N$ của Bài 05b, 05c là $n$; đầu vào thô $u$ ở đây là $x$ của Bài 06, và $d$ ở đây (đã tính tọa độ hằng) bằng số tham số $p=d_{06}+1$ của mô hình tuyến tính trong Bài 06, với $d_{06}$ là số chiều đầu vào ở đó.

- **Quy ước hệ số chặn (điểm hòa giải 1).** Hệ số chặn nằm trong $w$ qua tọa độ hằng $1$ của $x_i$. Không dùng $b$ cho hệ số chặn, vì Bài 05b, 05c và B3 của Bài 06 dùng $b$ cho kích thước nhóm nhỏ. Bài 06 dùng cùng quy ước và ghi một câu ánh xạ ở A04 của Bài 06.
- **Ghi nhận về $\sigma$.** $\sigma$ là sigmoid ở Bài 01 và Bài 05; B3 và 05c dùng $\sigma^2$ cho phương sai. Bài 05 không dùng phương sai nên giữ $\sigma$; Bài 06 nhắc nghĩa khi đổi ngữ cảnh. Giá trị kỳ dị nhỏ nhất viết $\sqrt{\lambda_{\min}(X^TX)}$, không viết $\sigma_{\min}$.
- **Thuật ngữ (điểm hòa giải 6).** "hạ gradient", "nhóm nhỏ (minibatch)", "lan truyền ngược (backpropagation)", "tách được tuyến tính (linearly separable)", "điều kiện hóa (conditioning)", "số điều kiện".

### Giả thiết

- **G1 (dữ liệu).** $n$ mẫu hữu hạn; $x_i\in\mathbb R^d$ đã chứa tọa độ hằng $1$.
- **G2 (mô hình và mất mát).** Dự đoán tuyến tính theo đặc trưng, $x^Tw$. Hai mất mát: bình phương $\ell_i=\frac12(x_i^Tw-y_i)^2$ và logistic $\ell_i=\log(1+e^{-m_i(w)})$. Cả hai lồi, khả vi hai lần theo $w$.
- **G3 (phân phối).** Mẫu huấn luyện, mẫu xác thực và mẫu kiểm thử cùng phân phối $P$; $R$ hữu hạn. Chỉ dùng để định nghĩa $R$ và đọc sai số xác thực, kiểm thử, không chứng minh cận khái quát hóa.
- **G4 (chính quy hóa).** $\lambda>0$ cố định, chọn bằng tập xác thực.
- **G5 (đếm chi phí).** Số học dày đặc, bỏ hằng số; số phép nhân–cộng của tích ma trận–vector $Xv$ là $nd$. Dữ liệu thưa được nêu ở ghi chú.

### Chuỗi định nghĩa → kết quả → phương pháp

1. **Định nghĩa:** $F$, $R$, tập xác thực, tập kiểm thử (HQ05); chế độ nội suy (HQ07); $\kappa(X^TX)$ (HQ09); dừng sớm (KL01); tách được tuyến tính (LG04); hàm cưỡng bức (LG06, nhắc lại Định nghĩa 01.37); $F_\lambda$ (LG07); $L,\mu,\kappa$ của $F_\lambda$ (LG09).
2. **Kết quả:** KQ1–KQ12 (mục Kết quả dùng lại). Ba kết quả chứng minh mới trên trang: KQ2 (nội suy khi $\operatorname{rank}X=n$), KQ4–KQ5 (mọi cách gán nhãn tách được khi $\operatorname{rank}X=n$; dữ liệu tách được thì không có cực tiểu), KQ7 (cận $L$, $\kappa$, $\lVert w_\lambda\rVert$ của $F_\lambda$). Thêm sau cổng storyboard: $\kappa(X^TX)$ không giảm khi thêm đặc trưng (định lý xen kẽ Cauchy, HQ09).
3. **Phương pháp:** hạ gradient và Newton cho $F_\lambda$ (Bài 04), số bước (05b T2b; Boyd §9.5.3), chi phí một bước (KQ10), tổng chi phí và ngưỡng hòa vốn (CP08).
4. **Quyết định:** chọn $d$, $\lambda$ và bước dừng bằng tập xác thực; chọn phương pháp theo $(n,d,\kappa,\varepsilon)$; dừng sớm.

### Giới hạn áp dụng

- Mô hình tuyến tính theo đặc trưng và mất mát lồi; không xét mô hình phi lồi (Bài 06).
- Phương pháp tất định dùng toàn bộ dữ liệu ở mỗi bước; gradient ngẫu nhiên thuộc B3 của Bài 06.
- Cận số bước là cận trên. Trên ví dụ của bài, số bước thực của hạ gradient nhỏ hơn cận khoảng 9 đến 20 lần (CP03).
- Chi phí đếm theo bậc với ma trận dày đặc, $n\ge d$; trường hợp $d>n$ và dữ liệu thưa nêu ở ghi chú CP07.
- Sai số trên vài điểm ngoài mẫu chỉ là ước lượng của $R$; ví dụ $n=5$ minh họa định tính, không phải thực nghiệm. Ví dụ thu nhỏ có tập xác thực bốn điểm, không có tập kiểm thử riêng.

## Bản đồ mạch

Thời lượng tính bằng tiết; mỗi khối 1 tiết. Khối 1 = MD + HQ; khối 2 = LG; khối 3 = CP + KL.

| Mạch | Chức năng | Đầu vào | Đầu ra | Trang | Tiết LT | Tiết BT | Trang kiểm tra |
|---|---|---|---|---|---:|---:|---|
| MD. Bài toán trung tâm và khung chung | Nêu sự thay đổi bức tranh so với Bài 01–04, hai lý do, khung và ký hiệu | Khung lồi, phương trình chuẩn, hồi quy logistic, hạ gradient, Newton (Bài 01–04) | Vấn đề trung tâm, ba nhu cầu, ký hiệu | MD01, MD02, MD03a–c, MD04 (6) | 0,10 | 0 | — |
| HQ. Hồi quy nhiều chiều (A1) | **Nhu cầu:** xác định điều gì thay đổi ở nghiệm bình phương nhỏ nhất khi $d$ tăng tới và vượt $n$ | Phương trình chuẩn và điều kiện duy nhất (Bài 01, Mệnh đề 01.6), ridge (Bài 02, Mệnh đề 02.21) | Ba hệ quả: không duy nhất khi $d>n$, khoảng cách huấn luyện–xác thực, $\kappa$ không giảm; chính quy hóa khắc phục cho bình phương | HQ00 (tiêu đề), HQ01–HQ12, HQ05a, HQ07a, HQ11a (16) | 0,56 | 0,34 | HQ11, HQ11a |
| LG. Hồi quy logistic và chính quy hóa (A2) | **Nhu cầu:** giải thích vì sao một bài toán học lồi có thể không có cực tiểu, và sửa bài toán để cực tiểu tồn tại, duy nhất | Chế độ nội suy $\operatorname{rank}X=n$ (HQ07), Bài 01 VD 01.6, 01.7, HQ 01.41 | $F_\lambda$ có nghiệm duy nhất, $\mu=\lambda$, $\kappa\le1+\lambda_{\max}(X^TX)/(4n\lambda)$, với $\lVert x_i\rVert\le r$: $\kappa\le1+r^2/(4\lambda)$; $\lambda$ nhỏ làm $\kappa$ lớn | LG00 (tiêu đề), LG01–LG12, LG05a, LG08a, LG11a (16) | 0,67 | 0,33 | LG11, LG11a |
| CP. Độ cong và chi phí tính toán (A3) | **Nhu cầu:** xác định chi phí tính toán của một bước cập nhật hội tụ nhanh hơn | $F_\lambda$, $\kappa$ (LG09); hạ gradient, Newton (Bài 04); T2b (05b) | Chi phí một bước $O(nd)$ và $O(nd^2+d^3)$, số bước theo $\kappa$ và theo hai giai đoạn Newton, ngưỡng hòa vốn; mọi bước đều trả chi phí theo $n$ | CP00 (tiêu đề), CP01–CP11, CP05a, CP06a, CP07a, CP08a, CP10a (17) | 0,53 | 0,25 | CP10, CP10a |
| KL. Giới hạn của tối ưu tất định | Tổng hợp ba phiên thành luận đề; nêu hai giới hạn chuyển sang Bài 06 | Đầu ra HQ, LG, CP | Dừng sớm, bằng chứng RCV1, hai giới hạn (i) và (ii), điều không còn giữ được và điều còn giữ được | KL00 (tiêu đề), KL01–KL05, KL01a, KL03a, KL04a, KL05a–c (12) | 0,14 | 0,08 | KL05b |
| **Tổng** | | | | **67** | **2,00** | **1,00** | 7 trang |

Cột "Trang" cập nhật ngày 2026-10-12 (văn phong MAT1101): tên mạch giữ nguyên và trùng tên trên trang "Nội dung" (MD03a) và trên bốn trang tiêu đề mạch; số trang tăng từ 44 lên 67 do bốn trang tiêu đề mạch và các trang tách theo trần mật độ (chi tiết ở mục "Cập nhật 2026-10-12" cuối tệp). Thời lượng của mạch không đổi.

Kiểm tra cộng: LT $0{,}10+0{,}56+0{,}67+0{,}53+0{,}14=2{,}00$; BT $0{,}34+0{,}33+0{,}25+0{,}08=1{,}00$; khối 1: $0{,}10+0{,}56+0{,}34=1{,}00$; khối 2: $0{,}67+0{,}33=1{,}00$; khối 3: $0{,}53+0{,}25+0{,}14+0{,}08=1{,}00$. Thời gian BT gồm cả các phép tính thủ công ở HQ02, HQ06, HQ08, LG03, LG10, CP02 và các trang kiểm tra. Sau cổng storyboard: mạch CP nhường $0{,}02$ tiết LT (CP09) cho KL03; trong KL, KL02 nhường $0{,}01$ cho KL03.

Thời lượng từng trang trong mục Dàn bài từng trang do tác tử soạn phân bổ từ tổng của mạch và của cụm khái niệm (storyboard, Bản đồ hành trình khái niệm); tổng theo trang khớp tổng theo mạch ở bảng trên.

## Dàn bài từng trang

Mọi trang mang quyết định **thêm**, vì bài được xây lại theo thiết kế mới của người dùng; lý do ghi ở từng trang. "Hành trình" chỉ bước của khái niệm KN1–KN8 trong storyboard.

### MD. Bài toán trung tâm và khung chung

Chức năng: nêu sự thay đổi bức tranh so với Bài 01–04 và hai lý do; đặt khung, ký hiệu và ba nhu cầu cho ba mạch giữa. 0,10 tiết LT.

#### MD01 — Không gian đặc trưng nhiều chiều

- **Điểm trung tâm:** định vị bài trong học phần.
- **Mặt trang:** tên học phần, "Bài 05", tiêu đề, phụ đề "Hồi quy lồi và giới hạn của tối ưu tất định" (tạm thời, D1), đơn vị.
- **Ghi chú:** Bài 05 dùng lại mô hình tuyến tính của Bài 01–02 và hai phương pháp của Bài 04; đối tượng mới là sự phụ thuộc vào $d$ và $n$.
- **Hình:** không.
- **Liên kết:** Bài 04 → bài này.
- **Quyết định:** thêm; trang tiêu đề bắt buộc.
- **Hành trình:** không áp dụng.
- **Thời lượng:** 0,01 tiết LT.

#### MD02 — Mục tiêu học tập

- **Điểm trung tâm:** ba hành vi kiểm tra được.
- **Mặt trang:**
  - Mục tiêu 1: giải phương trình chuẩn, xác định hạng và số điều kiện; phân biệt sai số huấn luyện với sai số ngoài mẫu khi $d$ tăng; chọn mô hình bằng tập xác thực.
  - Mục tiêu 2: chứng minh mất mát logistic không có cực tiểu trên dữ liệu tách được; chứng nhận mất mát có chính quy hóa lồi mạnh, tính $\mu$, $L$, $\kappa$ (sửa 2026-10-12: mặt trang không dùng ký hiệu $F_\lambda$ trước LG07, dòng ghi "tính $\mu,$ $L,$ $\kappa$ sau chính quy hóa").
  - Mục tiêu 3: đếm chi phí một bước của hạ gradient và Newton; chọn phương pháp theo $(n,d,\kappa,\varepsilon)$.
- **Sửa sau rà soát năm vai (2026-10-12):** ghi chú nêu kết quả và tiên quyết của từng mục tiêu, thay câu bình về thiết kế (N9).
- **Ghi chú:** mục tiêu 1–3 trên mặt trang là MT1–MT3 của kế hoạch; ánh xạ sang LLO11, LLO15 (phần Newton), CLO1, CLO2, CLO4 theo bảng Đối chiếu LLO/CLO. Không hiển thị mã LLO trên mặt trang nếu deck mẫu không hiển thị.
- **Hình:** không.
- **Liên kết:** từ trang tiêu đề; đầu ra là ba mục tiêu mà KL05 tổng kết lại.
- **Quyết định:** thêm; cấu trúc mặc định mục 2 của AGENTS.md.
- **Hành trình:** không áp dụng.
- **Thời lượng:** 0,02 tiết LT.

#### MD03 — Vấn đề trung tâm (đặc tả gốc; từ 2026-10-12 tách thành MD03a "Nội dung", MD03b "Ngữ cảnh", MD03c "Chi phí tính toán và đích của tối ưu")

- **Điểm trung tâm:** khung "mục tiêu lồi có cực tiểu chính xác, phương pháp tất định hội tụ tới nó" cần được kiểm tra lại khi $d$ và $n$ lớn, vì hai lý do.
- **Mặt trang:**
  - Khung Bài 01–04: $F$ lồi, nghiệm $w^*$, hạ gradient hoặc Newton hội tụ tới $w^*$.
  - Lý do thứ nhất: một gradient đầy đủ tốn $O(nd)$, một bước Newton tốn $O(nd^2+d^3)$.
  - Lý do thứ hai: $F$ thay thế cho rủi ro trên dữ liệu mới; cực tiểu chính xác của $F$ có thể không tồn tại hoặc dự đoán kém.
  - Vấn đề trung tâm (câu ở mục Khung lý thuyết chung), kèm danh sách ba phần A–C, mỗi phần một cụm nhu cầu, gọi phần bằng tên: Hồi quy nhiều chiều; Hồi quy logistic và chính quy hóa; Độ cong và chi phí tính toán (không dùng mã HQ, LG, CP trên mặt trang). Khi dựng deck, bảng ba dòng phần → nhu cầu → đầu ra được thay bằng danh sách này để trang nằm trong khung 16:9; đầu ra của từng phần nêu trong ghi chú (nhật ký, vòng dựng deck).
- **Sửa sau rà soát năm vai (2026-10-12):** lý do (1) thêm hệ quả "với ngân sách tính toán cố định, số lần cập nhật giảm theo $1/n$"; lý do (2) gọi "mất mát huấn luyện $F$"; danh sách phần B, C viết "sự tồn tại của cực tiểu", "chi phí của phương pháp hội tụ nhanh" (M10, N8).
- **Ghi chú:** hai lý do được kiểm chứng lần lượt ở HQ04–HQ05, LG05, CP07–CP09 và tổng hợp ở KL01–KL04. Thứ tự bài: hiện tượng ở bình phương nhỏ nhất, hiện tượng ở phân loại, rồi chi phí của phép sửa. Khi kết luận nêu điều còn giữ được, chỉ hạ gradient dùng gradient đầy đủ bảo đảm $F$ giảm mỗi bước; SGD không có tính chất này (KL04). Nguồn: Bottou và Bousquet trong Sra–Nowozin–Wright (2011), ch. 13, §13.1–13.2 (đánh đổi xấp xỉ, ước lượng, tối ưu).
- **Hình:** không; danh sách HTML.
- **Liên kết:** đầu ra là ba nhu cầu cho ba mạch giữa.
- **Quyết định:** thêm; luận đề xuyên suốt phải được nêu sớm (yêu cầu người dùng 2026-10-11).
- **Hành trình:** nhu cầu chung của KN1, KN4, KN7.
- **Thời lượng:** 0,04 tiết LT.

#### MD04 — Khung chung và ký hiệu

- **Điểm trung tâm:** mọi phần của bài dùng chung dữ liệu, ánh xạ đặc trưng, $F$, $R$ và bộ ba $L,\mu,\kappa$.
- **Mặt trang:** bảng rút gọn 8 dòng: $(u_i,y_i)$, $x_i=\varphi(u_i)\in\mathbb R^d$, $X\in\mathbb R^{n\times d}$, $w\in\mathbb R^d$ (hệ số chặn nằm trong $w$), $F=\frac1n\sum\ell_i$, $R=\mathbb E\,\ell$, $F_\lambda$, $L,\mu,\kappa$. Một dòng: "Dãy lặp: $w_k$ (Bài 05b viết $x_k$)". Ánh xạ với Bài 06 đặt ở ghi chú (sửa sau rà soát 2026-10-12): với $\varphi(u)=(1,u)$, đầu vào thô $u$ ở đây là $x$ của Bài 06, và $d$ ở đây bằng số tham số $p=d_{06}+1$ của Bài 06.
- **Sửa sau rà soát năm vai (2026-10-12):** dòng đối chiếu Bài 06 chuyển xuống ghi chú, viết $p=d_{06}+1$ để $d$ không mang hai nghĩa; mặt trang chỉ giữ "Dãy lặp: $w_k$" (M15). Ghi chú: $\lambda=\mu/n$ (M4); bỏ câu chỉ đường (N9).
- **Ghi chú:** giả thiết G1–G5; Bài 05b, 05c viết $N$ cho kích thước mẫu, bài này viết $n$; Bài 01 viết $a_i$ cho đặc trưng và $\mu$ cho hệ số chính quy hóa; dạng trung bình $F_\lambda$ ứng với dạng tổng của Bài 01 khi $\lambda=\mu/n$ (hai mẫu của Tình huống 01.1: $\lambda=\mu/2$; sửa sau rà soát 2026-10-12).
- **Hình:** không; bảng HTML.
- **Liên kết:** từ vấn đề trung tâm; cung cấp ký hiệu cho cả bài và ánh xạ ký hiệu với Bài 06 (A04 của Bài 06 ghi cùng ánh xạ).
- **Quyết định:** thêm; sườn lý thuyết chung phải hiện trước khi dùng (AGENTS.md).
- **Hành trình:** không áp dụng.
- **Thời lượng:** 0,03 tiết LT.

### HQ. Hồi quy nhiều chiều (phiên A1)

**Nhu cầu của mạch:** xác định điều gì thay đổi ở nghiệm bình phương nhỏ nhất khi số đặc trưng $d$ tăng tới và vượt kích thước mẫu $n$. 0,56 tiết LT + 0,34 tiết BT.

Dữ liệu dùng xuyên mạch (VD-A1, mục Ví dụ số): $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\,-0{,}7;\,0{,}2;\,0{,}4;\,1{,}0)$, sinh bởi $y=u+\varepsilon$ với $\varepsilon=(0{,}1;-0{,}2;0{,}2;-0{,}1;0)$. Đặc trưng đa thức $x=\varphi_d(u)=(1,u,\dots,u^{d-1})$. Bốn điểm ngoài mẫu $u=\pm\tfrac14,\pm\tfrac34$, nhãn bằng giá trị đúng $u$ (không nhiễu), dùng làm tập xác thực từ HQ05 trở đi; ví dụ thu nhỏ không có tập kiểm thử riêng.

#### HQ01 — Dữ liệu và đặc trưng đa thức

- **Điểm trung tâm:** tăng $d$ là thêm cột vào $X$; cùng năm mẫu, $X$ đổi từ $5\times1$ đến $5\times8$.
- **Mặt trang:** bảng năm mẫu $(u_i,y_i)$; định nghĩa $\varphi_d$; hai dòng $X$ cho $d=2$ và $d=5$ (dạng Vandermonde). Nhu cầu: chọn $d$ khi chỉ có năm mẫu.
- **Sửa sau rà soát năm vai (2026-10-12):** chú giải hình và alt gọi bốn điểm là "điểm ngoài mẫu" (M6).
- **Ghi chú:** dữ liệu tự tạo, sinh từ $y=u+\varepsilon$ với $\varepsilon$ cho trước để mọi phép tính có thể kiểm tra; quan hệ thật là tuyến tính, nên mọi đặc trưng từ $u^2$ trở lên chỉ có thể khớp nhiễu. Ví dụ dẫn nhập phục vụ nhu cầu "xác định điều gì thay đổi khi $d$ tăng". Nguồn thứ tự: Goodfellow et al. §5.2, hình 5.2 (đa thức bậc 1, 3, 9); dữ liệu riêng.
- **Hình:** `hq-data-points.svg`.
- **Liên kết:** kế thừa mô hình tuyến tính Bài 01; mở nhu cầu tính $w$ cho từng $d$.
- **Quyết định:** thêm; nhu cầu phải đi trước công thức.
- **Hành trình:** KN1 nhu cầu + ví dụ dẫn nhập; KN2 nhu cầu.
- **Thời lượng:** 0,04 tiết LT.

#### HQ02 — Phương trình chuẩn

- **Điểm trung tâm:** với $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$, cực tiểu thỏa $X^TXw=X^Ty$; với $d=2$ hệ là chéo và tính thủ công được.
- **Mặt trang:**
  - $\nabla F(w)=\frac1nX^T(Xw-y)$, $\nabla^2F=\frac1nX^TX$.
  - Nhắc lại (Bài 01, Mệnh đề 01.6): luôn có nghiệm; duy nhất khi và chỉ khi $\operatorname{rank}X=d$.
  - $d=2$: $X^TX=\operatorname{diag}(5,\tfrac52)$, $X^Ty=(0,\tfrac{49}{20})$, $w=(0,\tfrac{49}{50})$.
- **Ghi chú:** hệ số $\frac1{2n}$ không đổi nghiệm so với $\lVert Xw-y\rVert^2$ của Bài 01, nhưng đổi $L$ và $\mu$ (dùng ở HQ09). $X^TX$ chéo vì các nút đối xứng: $\sum u_i=0$. Kiểm tra: $\sum y_i=0$, $\sum u_iy_i=0{,}9+0{,}35+0+0{,}2+1=2{,}45$.
- **Hình:** không.
- **Liên kết:** kế thừa phương trình chuẩn Bài 01; cho công cụ tính bảng HQ03.
- **Quyết định:** thêm; nhắc lại có tính toán để cả mạch dùng chung một công cụ.
- **Hành trình:** tiên quyết nhắc lại (Bài 01), không tính vào sáu bước; công cụ chung của KN1 và KN2.
- **Thời lượng:** 0,06 tiết LT + 0,06 tiết BT (phép tính thủ công $d=2$).

#### HQ03 — Sai số huấn luyện theo số chiều

- **Điểm trung tâm:** sai số huấn luyện không tăng theo $d$ và bằng $0$ khi $d=n$.
- **Mặt trang:** bảng MSE huấn luyện $\frac1n\lVert Xw-y\rVert^2$: $d=1$: $\tfrac12$; $d=2$: $\tfrac{99}{5000}=0{,}0198$; $d=3$: $\tfrac{86}{4375}\approx0{,}01966$; $d=4$: $\tfrac1{56}\approx0{,}01786$; $d=5$: $0$. Một dòng lý do: tập mô hình lồng nhau.
- **Sửa sau rà soát năm vai (2026-10-12):** bảng làm tròn ba chữ số có nghĩa $0{,}0197$, $0{,}0179$ như HQ04, HQ11 (N7); alt dùng "điểm ngoài mẫu" (M6).
- **Ghi chú:** với $d'>d$, đặt các hệ số thêm bằng $0$ cho lại mô hình bậc thấp, nên cực tiểu trên tập lớn hơn không lớn hơn. Đây là trực giác; số $0$ tại $d=5$ là nhu cầu của HQ06. MSE huấn luyện $=2F(w)$.
- **Hình:** `hq-fits-d2-d5.svg` (đường $0{,}98u$ và đa thức bậc 4 nội suy).
- **Liên kết:** sai số huấn luyện giảm chưa cho biết khả năng dự đoán trên điểm ngoài mẫu; giới hạn này tạo nhu cầu của HQ04.
- **Quyết định:** thêm.
- **Hành trình:** KN1 trực quan; KN2 nhu cầu.
- **Thời lượng:** 0,04 tiết LT.

#### HQ04 — Sai số ngoài mẫu theo số chiều

- **Điểm trung tâm:** trên bốn điểm ngoài mẫu, sai số tăng gần 400 lần khi $d$ đi từ $2$ lên $5$.
- **Mặt trang:** bảng hai cột huấn luyện / ngoài mẫu cho $d=1,\dots,5$; bốn điểm ngoài mẫu $u=\pm\tfrac14,\pm\tfrac34$ về sau được dùng làm tập xác thực. Ngoài mẫu: $0{,}3125$; $0{,}000125$; $0{,}000205$; $0{,}00107$; $0{,}0487$. Một dòng: cực tiểu chính xác ở $d=5$ có sai số ngoài mẫu gấp $389$ lần $d=2$.
- **Sửa sau rà soát năm vai (2026-10-12):** thêm "(không nhiễu)" sau nhãn của bốn điểm (M7).
- **Ghi chú:** dự đoán của đa thức nội suy tại $u=-\tfrac34$ là $-\tfrac{1373}{1280}\approx-1{,}073$ trong khi giá trị đúng là $-0{,}75$. Nhãn của bốn điểm không nhiễu nên con số đo khoảng cách tới quan hệ thật; với nhãn có nhiễu, sai số cộng thêm phương sai nhiễu. Không suy rộng ví dụ năm điểm thành quy luật định lượng.
- **Hình:** `hq-errors-vs-d.svg`.
- **Liên kết:** giới hạn của HQ03 (huấn luyện không đo được dự đoán) tạo nhu cầu định nghĩa $R$ và tập xác thực. Tiêu đề dùng "ngoài mẫu" vì thuật ngữ "tập xác thực" được định nghĩa ở trang sau; mặt trang báo trước vai trò này.
- **Quyết định:** thêm; ví dụ phải đi trước định nghĩa hình thức.
- **Hành trình:** KN1 ví dụ.
- **Thời lượng:** 0,05 tiết LT.

#### HQ05 — Rủi ro thực nghiệm và rủi ro kỳ vọng

- **Điểm trung tâm:** đại lượng tối ưu là $F$; đại lượng cần nhỏ là $R$; tập xác thực dùng để chọn, tập kiểm thử dùng để báo cáo ước lượng của $R$.
- **Mặt trang:**
  - Định nghĩa: $F(w)=\frac1n\sum_i\ell(w;u_i,y_i)$; $R(w)=\mathbb E_{(u,y)\sim P}\,\ell(w;u,y)$, giả thiết mẫu huấn luyện và mẫu mới cùng phân phối $P$.
  - Định nghĩa: tập xác thực (validation set) là mẫu tách khỏi tập huấn luyện, dùng để chọn $d$, $\lambda$ và bước dừng; tập kiểm thử (test set) là mẫu không tham gia bất kỳ lựa chọn nào, dùng để báo cáo ước lượng của $R$.
  - Với $w$ cố định, trung bình mất mát trên tập kiểm thử độc lập là ước lượng không chệch của $R(w)$.
  - Nhận xét: $\arg\min F$ nói chung khác $\arg\min R$; quá khớp (overfitting) là trạng thái $F(w)$ nhỏ nhưng khoảng cách $R(w)-F(w)$ lớn.
- **Sửa sau rà soát năm vai (2026-10-12):** quá khớp mang nhãn Định nghĩa (M14); ghi chú: bốn điểm là quy ước minh họa, nhãn không nhiễu nên sai số xác thực ước lượng $R(w)-s^2$, thứ tự chọn không đổi (M7); dẫn Định lý 05c.52.
- **Ghi chú:** đây là lý do thứ hai của MD03c. Nếu dùng chính tập kiểm thử để chọn $d$ hoặc $\lambda$, $w$ được chọn phụ thuộc vào tập đó và ước lượng không còn không chệch; vì vậy hai tập phải tách nhau. Trong ví dụ năm điểm, bốn điểm $u=\pm\tfrac14,\pm\tfrac34$ là tập xác thực (chọn $\lambda$ ở HQ10, chọn bước dừng ở KL01); ví dụ thu nhỏ không có tập kiểm thử riêng, nên các con số trên bốn điểm này không phải báo cáo cuối về $R$. Tính không chệch dùng kỳ vọng của trung bình mẫu (Bài 05c). Nguồn: Goodfellow et al. §5.2 (tr. 110–117), §5.3.1, §8.1 (tr. 275–277).
- **Hình:** không.
- **Liên kết:** kế thừa kỳ vọng và trung bình mẫu (Bài 05c); đầu ra là tiêu chí đánh giá và quy tắc chọn dùng đến cuối bài. Bài 06 (F05) chỉ dẫn lại định nghĩa này, không định nghĩa lại (điểm hòa giải 5).
- **Quyết định:** thêm; tập xác thực và tập kiểm thử được định nghĩa trên mặt trang theo điểm hòa giải 5.
- **Hành trình:** KN1 hình thức.
- **Thời lượng:** 0,06 tiết LT.

#### HQ06 — Nội suy khi số chiều bằng kích thước mẫu

- **Điểm trung tâm:** khi $d=n=5$, $X$ vuông khả nghịch, nên $Xw=y$ có nghiệm đúng và $F=0$.
- **Mặt trang:** đếm năm phương trình và năm ẩn; $X$ là ma trận Vandermonde với các nút phân biệt; $w=X^{-1}y=(\tfrac15,\tfrac{23}{20},-\tfrac{109}{60},-\tfrac15,\tfrac53)$; kiểm tra tại $u=1$ bằng tổng các hệ số ở dạng phân số, $\tfrac15+\tfrac{23}{20}-\tfrac{109}{60}-\tfrac15+\tfrac53=1$ (dạng thập phân $0{,}2+1{,}15-1{,}8167-0{,}2+1{,}6667=1{,}0$ ở ghi chú, vì dòng thập phân vượt bề rộng cột).
- **Sửa sau rà soát năm vai (2026-10-12):** alt dùng "điểm ngoài mẫu" (M6).
- **Ghi chú:** đa thức nội suy đi qua cả năm điểm nhiễu, nên đi theo nhiễu. Đây là trường hợp riêng của mệnh đề ở trang sau.
- **Hình:** dùng lại `hq-fits-d2-d5.svg`.
- **Liên kết:** từ số $0$ của HQ03; dẫn tới trường hợp $d>n$ ở HQ07.
- **Quyết định:** thêm.
- **Hành trình:** KN2 trực quan + ví dụ.
- **Thời lượng:** 0,03 tiết LT + 0,04 tiết BT (kiểm tra nghiệm tại các nút).

#### HQ07 — Chế độ nội suy và tập nghiệm

- **Điểm trung tâm:** khi $\operatorname{rank}X=n$ (cần $d\ge n$), mọi $y$ được nội suy, và tập nghiệm là một tập affine chiều $d-n$; dữ liệu huấn luyện không phân biệt được các nghiệm.
- **Mặt trang:**
  - **Mệnh đề 1.** Giả thiết $X\in\mathbb R^{n\times d}$, $\operatorname{rank}X=n$. Kết luận: $\min F=0$; tập nghiệm $\{w_0+v: v\in\ker X\}$, $\dim\ker X=d-n$. Chứng minh: ảnh của $X$ là $\mathbb R^n$; định lý hạng–số chiều.
  - Ví dụ $d=6$: $z=(0,\tfrac14,0,-\tfrac54,0,1)$ là hệ số của $u(u^2-1)(u^2-\tfrac14)$, $Xz=0$. Bảng $w_{\rm mn}+tz$ với $t=-5,0,5$: MSE xác thực $0{,}2244$; $0{,}0492$; $0{,}1852$.
  - Huấn luyện bằng $0$ ở cả ba nghiệm.
- **Sửa sau rà soát năm vai (2026-10-12):** mặt trang định nghĩa $w_{\rm mn}=X^T(XX^T)^{-1}y$ và thêm dòng kết luận dưới bảng: dữ liệu huấn luyện không phân biệt được các nghiệm, cần tiêu chí ngoài dữ liệu huấn luyện (S3). Nguồn định lý hạng–số chiều dẫn Strang (N2).
- **Ghi chú:** $w_{\rm mn}=X^T(XX^T)^{-1}y$ là nghiệm chuẩn nhỏ nhất ($t=0$ trong bảng); Chọn một nghiệm cần tiêu chí ngoài dữ liệu huấn luyện: chuẩn nhỏ nhất, chính quy hóa (HQ10) hoặc chính thuật toán (KL01: hạ gradient từ $0$ hội tụ tới $w_{\rm mn}$; ở $d=8$ cả hai cho MSE xác thực $0{,}0759$). Mệnh đề này dùng lại ở LG04. Liên hệ Bài 01, Mệnh đề 01.6(b): tập nghiệm $w^*+\ker X$.
- **Hình:** không.
- **Liên kết:** kế thừa Mệnh đề 01.6; đầu ra (KQ2) cho LG04 (mọi cách gán nhãn tách được).
- **Quyết định:** thêm; chế độ $d\ge n$ là nội dung mới, theo thiết kế của người dùng.
- **Hành trình:** KN2 hình thức + ứng dụng.
- **Thời lượng:** 0,07 tiết LT.

#### HQ08 — Độ nhạy của nghiệm

- **Điểm trung tâm:** cùng một thay đổi nhỏ ở một nhãn làm nghiệm đổi $0{,}002$ ở $d=2$ nhưng $0{,}0648$ ở $d=5$; đường mức của $F$ dẹt dần khi $d$ tăng.
- **Mặt trang:**
  - Thí nghiệm: đổi $y_3$ thêm $0{,}01$; $d=2$: $\delta w=(0{,}002;\,0)$, $\lVert\delta w\rVert=0{,}002$; $d=5$: $\delta w=0{,}01\cdot(1,0,-5,0,4)$, $\lVert\delta w\rVert=0{,}0648$.
  - Hình đường mức của hai hàm bậc hai: elip gần tròn và elip dẹt (tỉ lệ bán trục $\sqrt2$ và $\sqrt{50}$).
  - Nhu cầu: một đại lượng của $X$ đo được độ nhạy này trước khi giải.
- **Sửa sau rà soát năm vai (2026-10-12):** thêm chú thích dưới hình: minh họa với hai giá trị $\kappa$, định nghĩa ở trang sau, ở $d=5$ $\kappa=553{,}7$ (M8).
- **Ghi chú:** $\delta w$ ở $d=5$ là $0{,}01$ nhân hệ số của đa thức Lagrange $4u^4-5u^2+1$ (bằng $1$ tại $u=0$, bằng $0$ tại bốn nút còn lại). Elip dẹt nghĩa là theo một hướng $F$ gần như phẳng: dữ liệu ít ràng buộc $w$ theo hướng đó, nên nhiễu nhỏ dịch nghiệm xa, và hạ gradient với một bước chung tiến chậm theo hướng đó (dùng lại ở CP01, CP04). Nguồn: Boyd §9.1.2 (tr. 461, số điều kiện tập mức dưới).
- **Hình:** `hq-level-sets-kappa.svg`.
- **Liên kết:** từ hệ quả không duy nhất ở HQ07 (khi $d>n$ có hướng hoàn toàn phẳng) sang trường hợp $d\le n$ có hướng gần phẳng; tạo nhu cầu định nghĩa $\kappa$ ở HQ09.
- **Quyết định:** thêm; tách từ HQ08 của kế hoạch theo cổng storyboard, để nhu cầu và trực quan của KN3 đứng trước định nghĩa.
- **Hành trình:** KN3 nhu cầu + trực quan.
- **Thời lượng:** 0,04 tiết LT + 0,04 tiết BT (tính $\delta w$ ở $d=2$).

#### HQ09 — Số điều kiện

- **Điểm trung tâm:** $\kappa(X^TX)$ đo độ nhạy của nghiệm và bằng $\kappa=L/\mu$ của $F$; với đặc trưng lồng nhau, $\kappa$ không giảm khi thêm đặc trưng và bằng $\infty$ khi $d>n$.
- **Mặt trang** (thứ tự: bảng số trước, định nghĩa và nhận xét sau):
  - Bảng: $d=1$: $1$; $2$: $2$; $3$: $9{,}50$; $4$: $50{,}5$; $5$: $553{,}7$; $d\ge6$: $\infty$ (quy ước $\kappa=\infty$ khi $\lambda_{\min}=0$).
  - Định nghĩa $\kappa(X^TX)=\lambda_{\max}/\lambda_{\min}$; với $F$ của HQ02: $L=\lambda_{\max}(X^TX)/n$, $\mu=\lambda_{\min}(X^TX)/n$, nên $\kappa_F=\kappa(X^TX)$.
  - Cận độ nhạy: $\lVert\delta w\rVert\le\lVert\delta y\rVert/\sqrt{\lambda_{\min}(X^TX)}$, hệ số $0{,}632$ ở $d=2$ và $8{,}39$ ở $d=5$.
  - Nhận xét: $X_d^TX_d$ là ma trận con chính của $X_{d+1}^TX_{d+1}$, nên theo định lý xen kẽ Cauchy $\lambda_{\min}$ không tăng và $\lambda_{\max}$ không giảm; vì vậy $\kappa$ không giảm theo $d$.
- **Sửa sau rà soát năm vai (2026-10-12):** cận độ nhạy ghi điều kiện $\operatorname{rank}X=d$ và đẳng thức $1/\sqrt{\lambda_{\min}}=\sqrt{\kappa/\lambda_{\max}}$ nối cận với $\kappa$ (M8).
- **Ghi chú:** cận độ nhạy suy từ $\delta w=(X^TX)^{-1}X^T\delta y$ và $\lVert(X^TX)^{-1}X^T\rVert=1/\sqrt{\lambda_{\min}(X^TX)}$. Số liệu VD-A1 khớp nhận xét: $\lambda_{\min}=5;\,2{,}5;\,0{,}679;\,0{,}128;\,0{,}0142$, $\lambda_{\max}=5;\,5;\,6{,}45;\,6{,}45;\,7{,}86$. Chiều tăng là chung cho mọi họ đặc trưng lồng nhau; mức tăng phụ thuộc cách chọn đặc trưng: đơn thức trên $[-1,1]$ cho $\kappa$ tăng rất nhanh, cơ sở trực giao cho $\kappa$ tăng chậm hơn nhiều. Nguồn: Boyd §9.1.2; Goodfellow §8.2.1.
- **Hình:** không; bảng HTML.
- **Liên kết:** nhận nhu cầu từ HQ08; đầu ra $\kappa$ được dùng ở HQ10, LG09 và CP03–CP04.
- **Quyết định:** thêm; tách từ HQ08 của kế hoạch theo cổng storyboard; thiết kế của người dùng yêu cầu nêu hạng và điều kiện hóa.
- **Hành trình:** KN3 ví dụ + hình thức (bảng số làm ví dụ, đặt trước định nghĩa).
- **Thời lượng:** 0,04 tiết LT.

#### HQ10 — Chính quy hóa bậc hai và chọn mô hình

- **Điểm trung tâm:** thêm $\frac\lambda2\lVert w\rVert^2$ cho nghiệm duy nhất với mọi $d$, giảm $\kappa$, và $\lambda$ chọn bằng tập xác thực.
- **Mặt trang:**
  - $(\frac1nX^TX+\lambda I)w=\frac1nX^Ty$; nhắc lại Bài 02, Mệnh đề 02.21(c): nghiệm duy nhất khi $\lambda>0$.
  - Bảng $d=5$ (huấn luyện; xác thực; $\kappa$): $\lambda=0{,}1$: $0{,}0349$; $0{,}0189$; $16{,}3$; $\lambda=0{,}01$: $0{,}0123$; $0{,}00261$; $123{,}2$; $\lambda=0{,}001$: $0{,}00121$; $0{,}0264$; $409{,}7$; $\lambda=0$: $0$; $0{,}0487$; $553{,}7$.
  - $d=8$, $\lambda=0{,}01$: $\kappa=189{,}5$ thay cho $\infty$; xác thực $0{,}007635$.
- **Sửa sau rà soát năm vai (2026-10-12):** cột $\kappa$ ghi $\kappa(X^TX+n\lambda I)$; thêm "mọi trị riêng tăng thêm $n\lambda$, nên $\kappa$ hữu hạn" (M8).
- **Ghi chú:** $\kappa=(\lambda_{\max}/n+\lambda)/(\lambda_{\min}/n+\lambda)$. Chọn $\lambda=0{,}01$ theo cột xác thực. Sai số xác thực của giá trị được chọn là số nhỏ nhất trong bảng, nên có xu hướng thấp hơn $R$; báo cáo cuối cần một tập kiểm thử riêng, mà ví dụ thu nhỏ không có. Với bình phương nhỏ nhất, nghiệm luôn tồn tại và chính quy hóa chỉ sửa tính duy nhất; với phân loại, vấn đề tồn tại xuất hiện trước.
- **Hình:** không; bảng HTML.
- **Liên kết:** kế thừa Bài 02, Mệnh đề 02.21; dùng HQ05 (tiêu chí và quy tắc chọn) và HQ09 ($\kappa$).
- **Quyết định:** thêm; bước ứng dụng của KN1 và KN3.
- **Hành trình:** KN1 ứng dụng; KN3 ứng dụng.
- **Thời lượng:** 0,06 tiết LT + 0,05 tiết BT (đọc bảng và chọn $\lambda$).

#### HQ11 — Câu hỏi về hồi quy nhiều chiều

- **Điểm trung tâm:** kiểm tra hạng, nội suy, số điều kiện và quy tắc chọn mô hình.
- **Mặt trang (nhãn "Câu hỏi:"):**
  - (a) Cùng năm nút $u$, $d=7$: tính $\operatorname{rank}X$, $\dim\ker X$, $\min F$.
  - (b) $d=2$, nhãn mới $y'=y+0{,}1\cdot\mathbf 1$: tính $w$.
  - (c) $X^TX=\begin{pmatrix}2&1\\1&2\end{pmatrix}$: tính $\kappa(X^TX)$.
  - (d) Bảng MSE huấn luyện / xác thực: $d=1$: $0{,}5$ / $0{,}3125$; $d=2$: $0{,}0198$ / $0{,}000125$; $d=3$: $0{,}0197$ / $0{,}000205$; $d=4$: $0{,}0179$ / $0{,}00107$; $d=5$: $0$ / $0{,}0487$. Chọn $d$; nêu tập dùng để báo cáo sai số cuối.
- **Ghi chú (đáp án):** (a) $5$, $2$, $0$. (b) $X^Ty'=(0{,}5;\,2{,}45)$, $w=(0{,}1;\,0{,}98)$. (c) Trị riêng $3$ và $1$, $\kappa=3$. (d) Chọn $d=2$, giá trị nhỏ nhất của cột xác thực; cột huấn luyện sẽ chọn $d=5$, đúng mô hình quá khớp. Sai số cuối báo cáo trên một tập kiểm thử riêng không tham gia lựa chọn, vì $0{,}000125$ là giá trị nhỏ nhất được chọn ra từ năm số nên có xu hướng thấp hơn $R$ (HQ05).
- **Hình:** không.
- **Liên kết:** kiểm tra đầu ra HQ04–HQ10 trước khi tổng kết mạch.
- **Quyết định:** thêm; trang bài tập của mạch. Câu (d) thêm sau cổng storyboard để đo đúng sản phẩm của KN1.
- **Hành trình:** KN1 bài tập (d); KN2 bài tập (a); KN3 bài tập (c); câu (b) luyện công cụ phương trình chuẩn.
- **Thời lượng:** 0,15 tiết BT.

#### HQ12 — Ba hệ quả của việc tăng số chiều

- **Điểm trung tâm:** khi $d$ tăng so với $n$: (a) nghiệm không duy nhất khi $d>n$; (b) sai số huấn luyện giảm trong khi sai số xác thực tăng; (c) $\kappa$ không giảm, và bằng $\infty$ khi $d>n$.
- **Mặt trang:** ba dòng (a)–(c), mỗi dòng một số đã tính: $\dim\ker X=d-n$; $0{,}000125\to0{,}0487$; $2\to553{,}7\to\infty$. Một dòng giới hạn: với bình phương nhỏ nhất, nghiệm luôn tồn tại (Bài 01, Mệnh đề 01.6); với mất mát logistic thì không.
- **Sửa sau rà soát năm vai (2026-10-12):** giới hạn viết "với mất mát logistic, nghiệm không phải lúc nào cũng tồn tại" (M12).
- **Ghi chú:** bình phương nhỏ nhất luôn có nghiệm vì $Xw^*$ là hình chiếu trực giao của $y$ lên $\operatorname{range}X$, và hình chiếu lên một không gian con hữu hạn chiều luôn tồn tại. Mất mát logistic không có cấu trúc chiếu này; giá trị nhỏ nhất có thể chỉ đạt ở giới hạn khi $\lVert w\rVert\to\infty$. Hệ quả (c) dựa trên định lý xen kẽ Cauchy (HQ09) và quyết định số bước của hạ gradient khi tính nghiệm.
- **Hình:** không.
- **Liên kết:** giới hạn "tồn tại" tạo nhu cầu cho LG01; hệ quả (c) mở nhu cầu của CP. Theo giao diện A–B, đây là đầu ra (a) của phiên A1.
- **Quyết định:** thêm; mạch cần đầu ra rõ cho mạch sau.
- **Hành trình:** chuyển KN2 sang KN4.
- **Thời lượng:** 0,07 tiết LT.

### LG. Hồi quy logistic và chính quy hóa (phiên A2)

**Nhu cầu của mạch:** giải thích vì sao một bài toán học lồi có thể không có cực tiểu, và sửa bài toán để cực tiểu tồn tại và duy nhất. 0,67 tiết LT + 0,33 tiết BT.

Dữ liệu dẫn (VD-A2a, mục Ví dụ số): $u=(-1,0,1)$, $y=(-1,+1,-1)$.

#### LG01 — Ba điểm với hai bộ đặc trưng

- **Điểm trung tâm:** với đặc trưng $(1,u)$ không biên tuyến tính nào phân loại đúng cả ba điểm; thêm $u^2$ thì có.
- **Mặt trang:** hình ba điểm; hai dòng: $(1,u)$: điểm số $w_0+w_1u$ đổi dấu nhiều nhất một lần, mẫu nhãn $-,+,-$ đổi dấu hai lần; $(1,u,u^2)$: $\bar w=(1,0,-2)$ cho điểm số $1-2u^2$, đúng dấu tại cả ba điểm. Nhu cầu: biết bài toán logistic nào có nghiệm.
- **Sửa sau rà soát năm vai (2026-10-12):** "biên quyết định tuyến tính" thay "biên tuyến tính" (M19).
- **Ghi chú:** $\bar w=X^{-1}y$ vì $d=n=3$, đúng chế độ nội suy của HQ07. Mẫu nhãn $-,+,-$ là dạng một chiều của bài toán XOR, sẽ trở lại ở KL03.
- **Hình:** `lg-three-points.svg`.
- **Liên kết:** kế thừa HQ07, HQ12; mở nhu cầu của mạch.
- **Quyết định:** thêm; ví dụ dẫn nhập nối A1 với A2.
- **Hành trình:** KN4 nhu cầu + ví dụ dẫn nhập.
- **Thời lượng:** 0,04 tiết LT.

#### LG02 — Mất mát logistic trung bình

- **Điểm trung tâm:** $F(w)=\frac1n\sum_i\log(1+e^{-m_i(w)})$ lồi, dương, có gradient và Hessian dạng ma trận.
- **Mặt trang:**
  - $m_i=y_ix_i^Tw$; $F(w)>0$ với mọi $w$; $F(0)=\log2$.
  - $\nabla F(w)=-\frac1n\sum_i\sigma(-m_i)\,y_ix_i$.
  - $\nabla^2F(w)=\frac1nX^TSX$, $S=\operatorname{diag}\big(\sigma(m_i)\sigma(-m_i)\big)$, $0<S_{ii}\le\tfrac14$.
- **Sửa sau rà soát năm vai (2026-10-12):** "biên có dấu (margin)", phân biệt với biên quyết định $\{x:\ x^Tw=0\}$ (M19).
- **Ghi chú:** nhắc lại Bài 01, Định nghĩa 01.8 và Mệnh đề 01.9 ở dạng trung bình (Bài 01 dùng tổng). Cận $\tfrac14$ đạt tại $m_i=0$, dùng ở LG09. Nguồn: Boyd §7.1.1 (tr. 354), Goodfellow §5.7.1 (tr. 140).
- **Hình:** không.
- **Liên kết:** cung cấp công cụ cho LG03, LG09, CP06.
- **Quyết định:** thêm; nhắc lại có chủ đích vì dạng ma trận là mới.
- **Hành trình:** tiên quyết nhắc lại (Bài 01), không tính vào sáu bước; công cụ chung của KN4–KN6.
- **Thời lượng:** 0,04 tiết LT.

#### LG03 — Mất mát dọc một tia

- **Điểm trung tâm:** trên dữ liệu tách được, $F(t\bar w)$ giảm về $0$ khi $t\to\infty$ mà không đạt; trên dữ liệu không tách được, $F$ có cực tiểu hữu hạn.
- **Mặt trang:**
  - $(1,u,u^2)$: mọi biên của $\bar w$ bằng $1$, nên $F(t\bar w)=\log(1+e^{-t})$: $t=0$: $0{,}6931$; $1$: $0{,}3133$; $5$: $0{,}00672$; $10$: $4{,}54\cdot10^{-5}$.
  - $(1,u)$: cực tiểu $w=(-\log2,0)$, $F^*=\tfrac13\log\tfrac{27}4\approx0{,}6365$; $\sigma(w_0)=\tfrac13$.
- **Ghi chú:** kiểm tra cực tiểu $(1,u)$: theo đối xứng $u\mapsto-u$, $w_1=0$; điều kiện $2\sigma(w_0)=\sigma(-w_0)$ cho $\sigma(w_0)=\tfrac13$. Hessian tại đó là $\tfrac13\cdot\tfrac29\cdot\operatorname{diag}(3,2)\succ0$. Giá trị $\log\tfrac{27}4$ trùng cấu trúc với Bài 01 VD 01.7.
- **Hình:** `lg-loss-along-ray.svg` (đường $\log(1+e^{-t})$, $t\in[0,10]$, đánh dấu $t=0,1,5,10$).
- **Liên kết:** dẫn tới định nghĩa tách được.
- **Quyết định:** thêm; ví dụ tính được trước định lý.
- **Hành trình:** KN4 trực quan + ví dụ.
- **Thời lượng:** 0,05 tiết LT + 0,05 tiết BT (giá trị dọc tia, điều kiện $\sigma(w_0)=\tfrac13$).

#### LG04 — Tách được tuyến tính

- **Điểm trung tâm:** dữ liệu tách được tuyến tính khi có $\bar w$ với mọi $m_i(\bar w)>0$; khi $\operatorname{rank}X=n$, mọi cách gán nhãn đều tách được.
- **Mặt trang:**
  - **Định nghĩa.** Dữ liệu $\{(x_i,y_i)\}$ tách được tuyến tính (linearly separable) nếu tồn tại $\bar w\in\mathbb R^d$ với $y_ix_i^T\bar w>0$ với mọi $i$.
  - **Mệnh đề 2.** Nếu $\operatorname{rank}X=n$ thì với mọi $y\in\{-1,+1\}^n$ dữ liệu tách được. Chứng minh: giải $X\bar w=y$ (Mệnh đề 1), khi đó $y_ix_i^T\bar w=y_i^2=1$.
- **Ghi chú:** mệnh đề nối hồi quy nhiều chiều với hồi quy logistic: chế độ nội suy của bình phương nhỏ nhất là chế độ mà mất mát logistic mất cực tiểu, với mọi nhãn. Điều kiện $\operatorname{rank}X=n$ đủ, không cần: dữ liệu LG11(a) tách được với $d=2<n=4$.
- **Hình:** không.
- **Liên kết:** kế thừa KQ2 (HQ07); đầu vào của định lý LG05.
- **Quyết định:** thêm.
- **Hành trình:** KN4 hình thức (định nghĩa).
- **Thời lượng:** 0,04 tiết LT.

#### LG05 — Định lý không tồn tại cực tiểu

- **Điểm trung tâm:** trên dữ liệu tách được, $\inf F=0$ không đạt, và mọi dãy có $F(w_k)\to0$ phải có $\lVert w_k\rVert\to\infty$.
- **Mặt trang:**
  - **Định lý 1.** Giả thiết: dữ liệu tách được bởi $\bar w$. Kết luận: $\inf_wF(w)=0$ và không có $w$ nào đạt; nếu $F(w_k)\to0$ thì $\lVert w_k\rVert\to\infty$.
  - **Chứng minh**, ba bước trên ba dòng: (1) mỗi số hạng dương nên $F>0$; (2) với $\gamma=\min_im_i(\bar w)>0$, $F(t\bar w)\le\log(1+e^{-t\gamma})\to0$; (3) trên hình cầu $\lVert w\rVert\le r$, $F$ liên tục và dương nên có cực tiểu dương $c_r$, vì vậy $F(w_k)<c_r$ buộc $\lVert w_k\rVert>r$.
- **Sửa sau rà soát năm vai (2026-10-12):** ghi chú: $\lVert w_k\rVert\to\infty$ suy từ $F(w_k)\to0$ (Bài 05b, Hệ quả 05b.17) và bước 3, không từ tính giảm đơn điệu (M13).
- **Ghi chú:** bước (3) giải thích hiện tượng mà Goodfellow §7.3 (tr. 239–240) mô tả: thủ tục lặp tiếp tục tăng $\lVert w\rVert$. Tính lồi không bảo đảm tồn tại (Bài 01, Nhận xét 01.43); điều quyết định là hình học của dữ liệu. Liên hệ Bài 01 VD 01.6 (trường hợp $d=1$).
- **Hình:** không.
- **Liên kết:** kế thừa Định lý Weierstrass (Bài 01, Định lý 01.36) ở bước (3); tạo nhu cầu sửa bài toán. Kết quả KQ5.
- **Quyết định:** thêm; thiết kế của người dùng đặt câu hỏi về sự không tồn tại cực tiểu, nên chứng minh nằm trên trang.
- **Hành trình:** KN4 hình thức (định lý); KN5 nhu cầu (giới hạn tạo nhu cầu sửa bài toán).
- **Thời lượng:** 0,07 tiết LT.

#### LG06 — Dữ liệu không tách được

- **Điểm trung tâm:** nếu với mọi $w\ne0$ có một mẫu bị biên âm, thì $F$ cưỡng bức và có cực tiểu.
- **Mặt trang:**
  - **Định nghĩa** (nhắc lại Định nghĩa 01.37, thêm 2026-10-12 theo yêu cầu người dùng). $F$ cưỡng bức (coercive) nếu $F(w)\to+\infty$ khi $\lVert w\rVert\to\infty$.
  - **Mệnh đề 3.** Giả thiết: với mọi $w\ne0$ tồn tại $i$ với $m_i(w)<0$. Kết luận: $F$ cưỡng bức, nên có cực tiểu (Bài 01, Định lý 01.38).
  - Ý chứng minh: $c=\min_{\lVert v\rVert=1}\max_i(-m_i(v))>0$; $F(w)\ge\frac1n\log(1+e^{c\lVert w\rVert})\ge\frac cn\lVert w\rVert$.
  - Ví dụ: đặc trưng $(1,u)$ của LG01 thỏa giả thiết, cực tiểu đã tính ở LG03.
- **Sửa sau rà soát năm vai (2026-10-12):** ví dụ dẫn "đã tính ở trang mất mát dọc một tia" (M16).
- **Ghi chú:** giữa hai trường hợp còn trường hợp biên (có $w\ne0$ với mọi $m_i(w)\ge0$, có dấu bằng); không xét trên trang. Kiểm tra giả thiết cho $(1,u)$: $m_1\ge0,m_2\ge0,m_3\ge0$ buộc $w_1\ge w_0\ge0$ và $w_1\le-w_0\le0$, tức $w=0$.
- **Hình:** không.
- **Liên kết:** đối chứng với LG05 (KQ6); kết quả: sự tồn tại do dữ liệu quyết định, không kiểm soát được khi $d$ lớn, nên cần sửa mục tiêu.
- **Quyết định:** thêm; cần trường hợp đối chứng có điều kiện đủ cụ thể.
- **Hành trình:** KN4 hình thức (kết quả thứ hai, đối chứng với Định lý 1). Bước ứng dụng của KN4 chuyển sang LG10 theo cổng storyboard.
- **Thời lượng:** 0,04 tiết LT.

#### LG07 — Số hạng phạt dọc một tia

- **Điểm trung tâm:** cộng $\frac\lambda2\lVert w\rVert^2$ làm mục tiêu dọc tia tăng trở lại, nên có cực tiểu hữu hạn.
- **Mặt trang:** **Định nghĩa** (thêm 2026-10-12 theo yêu cầu người dùng, để $F_\lambda$ có định nghĩa trước lần dùng đầu). Mất mát có chính quy hóa bậc hai: $F_\lambda(w)=F(w)+\frac\lambda2\lVert w\rVert^2$, $\lambda>0$. Dọc tia: $F_\lambda(t\bar w)=\log(1+e^{-t})+\tfrac{5\lambda}2t^2$ vì $\lVert\bar w\rVert^2=5$; với $\lambda=0{,}01$, cực tiểu tại $t^*=2{,}128$, giá trị $0{,}2257$; với $\lambda=0{,}1$: $t^*=0{,}6748$, giá trị $0{,}5255$.
- **Ghi chú:** hình vẽ hai đường trên cùng trục. Cực tiểu dọc tia chỉ là trực giác; cực tiểu của $F_\lambda$ trên $\mathbb R^3$ tính ở LG10 và không nằm trên tia $\bar w$. Các số $2{,}128$ và $0{,}6748$ trùng nghiệm một chiều của LG08 vì $5\lambda$ đóng vai hệ số chính quy hóa của bài toán một chiều; đây là trùng hợp cấu trúc, không phải kết quả chung.
- **Hình:** `lg-penalty-along-ray.svg` (ba đường $\lambda=0;\ 0{,}01;\ 0{,}1$ trên $t\in[0,6]$, đánh dấu $t^*=2{,}128$ và $0{,}6748$; tách khỏi hình của LG03 khi dựng deck để LG03 không hiện số hạng phạt trước khi nó được đưa vào).
- **Liên kết:** từ giới hạn LG05; tạo nhu cầu phát biểu tổng quát ở LG08.
- **Quyết định:** thêm.
- **Hành trình:** KN5 nhu cầu + trực quan + ví dụ.
- **Thời lượng:** 0,05 tiết LT.

#### LG08 — Chính quy hóa bậc hai và tính lồi mạnh

- **Điểm trung tâm:** $F_\lambda$ lồi mạnh với hằng số $\lambda$, có đúng một nghiệm $w_\lambda$ với mọi dữ liệu, và $\lVert w_\lambda\rVert_2\le\sqrt{2F(0)/\lambda}$, với mất mát logistic là $\sqrt{2\log2/\lambda}$.
- **Mặt trang:**
  - **Định lý 2.** Giả thiết: mất mát bình phương hoặc logistic, $\lambda>0$. Kết luận: $\nabla^2F_\lambda\succeq\lambda I$; có đúng một $w_\lambda$; $\lambda w_\lambda=-\nabla F(w_\lambda)$; $\lVert w_\lambda\rVert^2\le2F(0)/\lambda$, với mất mát logistic là $2\log2/\lambda$ (sửa khi dựng deck: cận $2\log2/\lambda$ chỉ đúng cho mất mát logistic, vì với mất mát bình phương $F(0)=\lVert y\rVert^2/(2n)$).
  - Chứng minh hai dòng: tồn tại và duy nhất theo Bài 01, Hệ quả 01.41; cận chuẩn từ $\frac\lambda2\lVert w_\lambda\rVert^2\le F_\lambda(w_\lambda)\le F_\lambda(0)=F(0)$, với mất mát logistic $F(0)=\log2$.
  - Bảng kiểm tra trên một mẫu $x_1=1$, $y_1=+1$ ($n=d=1$, dữ liệu Bài 01 VD 01.6; $F_\lambda(w)=\log(1+e^{-w})+\frac\lambda2w^2$): $\lambda=0{,}5;0{,}05;0{,}005;0{,}0005$ cho $w_\lambda=0{,}6748;\,2{,}1280;\,3{,}9140;\,5{,}8342$; cận $1{,}665;\,5{,}266;\,16{,}65;\,52{,}66$.
- **Ghi chú:** ba giá trị đầu trùng bảng Tình huống 01.1 của Bài 01 vì $\lambda=\mu/2$. Kiểm tra: $0{,}05\cdot2{,}128=0{,}1064=1/(1+e^{2{,}128})$. Khi $\lambda\to0$, $\lVert w_\lambda\rVert\to\infty$ trên dữ liệu tách được (bài tập về nhà, dùng LG05 bước 3). Nghiệm $w_\lambda$ là nghiệm của bài toán khác bài toán gốc. Nguồn: Boyd §6.3.2 (tr. 306), §7.1.2; Goodfellow §7.1.1 (tr. 231), §7.3.
- **Hình:** không.
- **Liên kết:** kế thừa Hệ quả 01.41 (phát biểu lại, không chứng minh lại); kết quả KQ7a; đầu ra $\mu=\lambda$ cho LG09.
- **Quyết định:** thêm.
- **Hành trình:** KN5 hình thức; KN6 nhu cầu (đã có $\mu$, còn thiếu $L$).
- **Thời lượng:** 0,08 tiết LT.

#### LG09 — Hằng số trơn và số điều kiện của $F_\lambda$

- **Điểm trung tâm:** $\lambda I\preceq\nabla^2F_\lambda\preceq\big(\tfrac{\lambda_{\max}(X^TX)}{4n}+\lambda\big)I$, nên $\kappa\le1+\frac{\lambda_{\max}(X^TX)}{4n\lambda}$, và $\kappa\le1+\frac{r^2}{4\lambda}$ khi $\lVert x_i\rVert\le r$; $\lambda$ nhỏ làm $\kappa$ lớn.
- **Mặt trang** (thứ tự: ví dụ một chiều trước, mệnh đề sau):
  - Ví dụ một chiều (một mẫu $x_1=1$, $y_1=+1$ của LG08): $F_\lambda''(w)=\sigma(w)\sigma(-w)+\lambda\in(\lambda,\tfrac14+\lambda]$, lớn nhất tại $w=0$; $\kappa=\frac{1/4+\lambda}{\lambda}=1{,}5;\,6;\,51;\,501$ với $\lambda=0{,}5;\,0{,}05;\,0{,}005;\,0{,}0005$.
  - **Mệnh đề 4.** $\mu=\lambda$, $L=\frac{\lambda_{\max}(X^TX)}{4n}+\lambda$, $\kappa=L/\mu$. Nếu $\lVert x_i\rVert\le r$ với mọi $i$ thì $L\le\frac{r^2}4+\lambda$ và $\kappa\le1+\frac{r^2}{4\lambda}$.
  - Chứng minh: $S\preceq\tfrac14I$; $\lambda_{\max}(X^TX)\le\operatorname{tr}X^TX=\sum\lVert x_i\rVert^2\le nr^2$.
  - Vì $x_i$ có tọa độ hằng $1$ nên $r\ge1$; khi phần đặc trưng còn lại có chuẩn $\le1$, $r^2=2$.
- **Ghi chú:** $F_\lambda$ thỏa H2 và H3 của Bài 05b với $L$, $\mu$ ở trên, nên Định lý T2a, T2b của Bài 05b (hạ gradient bước $1/L$ hội tụ tuyến tính, $e_k\le(1-1/\kappa)^ke_0$) áp dụng; trường hợp này là bậc 2 của bảng "sợi chỉ chứng minh" Bài 05b. $\kappa$ ở đây là cận toàn cục; độ cong tại nghiệm có thể lớn hơn $\lambda$ nhiều (CP03). Không thể giả thiết $\lVert x_i\rVert\le1$ vì tọa độ hằng $1$ đã cho $\lVert x_i\rVert\ge1$, dấu bằng chỉ ở mô hình chỉ có hệ số chặn (ví dụ một chiều ở trên); vì vậy mệnh đề dùng bán kính $r$.
- **Hình:** `lg-curvature-1d.svg` (độ cong $\sigma(w)\sigma(-w)+\lambda$ với $\lambda=0{,}05$, hai mức $L=\tfrac14+\lambda$ và $\mu=\lambda$; thêm khi dựng deck để bước trực quan mà storyboard ghi, "đồ thị độ cong một chiều", có hình).
- **Liên kết:** kế thừa HQ09 ($\kappa$ của bình phương nhỏ nhất); kết quả KQ7b; đầu ra $\kappa$ cho CP.
- **Quyết định:** thêm; chiều chuyển giao A2 → A3 của giao diện.
- **Hành trình:** KN6 trực quan + ví dụ (đồ thị độ cong một chiều, đặt đầu trang) + hình thức (Mệnh đề 4); nhu cầu nhận từ LG08.
- **Thời lượng:** 0,10 tiết LT.

#### LG10 — Ví dụ ba điểm có chính quy hóa

- **Điểm trung tâm:** trên dữ liệu tách được của LG01, $F$ không có cực tiểu vì $\operatorname{rank}X=n$, còn $F_\lambda$ có nghiệm hữu hạn, xác suất dự đoán không còn tiến về $0$ hoặc $1$, và bước $1/L$ có cận tốc độ tính được.
- **Mặt trang:**
  - $\lambda=0$: $\operatorname{rank}X=n=3$, nên dữ liệu tách được (Mệnh đề 2) và $F$ không có cực tiểu (Định lý 1); cùng kết luận cho mọi cách gán nhãn $\pm1$ của năm mẫu VD-A1 với $d=5$.
  - $X^TX=\begin{pmatrix}3&0&2\\0&2&0\\2&0&2\end{pmatrix}$, $\lambda_{\max}=\frac{5+\sqrt{17}}2\approx4{,}5616$.
  - $\lambda=0{,}1$: $w_\lambda=(0{,}1298;\,0;\,-1{,}4288)$, $P(y=+1\mid u)=(0{,}214;\,0{,}532;\,0{,}214)$, $L=0{,}4801$, $\kappa\le4{,}80$.
  - $\lambda=0{,}01$: $w_\lambda=(1{,}5571;\,0;\,-4{,}2452)$, $P=(0{,}064;\,0{,}826;\,0{,}064)$, $L=0{,}3901$, $\kappa\le39{,}0$.
- **Sửa sau rà soát năm vai (2026-10-12):** ghi chú như LG05 (M13).
- **Ghi chú:** dòng đầu là ứng dụng của Mệnh đề 2 và Định lý 1 vào chế độ $d\ge n$: khi số đặc trưng đạt kích thước mẫu, hồi quy logistic không chính quy hóa mất cực tiểu với mọi nhãn, và hạ gradient cho $\lVert w_k\rVert\to\infty$ (Goodfellow §7.3). $w_1=0$ do đối xứng và tính duy nhất. Kiểm tra cận chuẩn: $1{,}435\le3{,}723$ và $4{,}522\le11{,}77$. Chọn $\lambda$ là quyết định mô hình (tập xác thực, HQ05), không suy ra từ định lý. Với $\lambda=0{,}01$, T2b cho $e_k\le(1-1/39)^ke_0$.
- **Hình:** không; bảng HTML.
- **Liên kết:** áp dụng LG08–LG09 cho chính ví dụ dẫn nhập.
- **Quyết định:** thêm; bước ứng dụng phải dùng kết quả vừa xây.
- **Hành trình:** KN4 ứng dụng (dòng $\lambda=0$); KN5 ứng dụng; KN6 ứng dụng.
- **Thời lượng:** 0,10 tiết LT + 0,05 tiết BT (tính $L$, $\kappa$, kiểm tra cận chuẩn).

#### LG11 — Câu hỏi về tách được và chính quy hóa

- **Điểm trung tâm:** kiểm tra khả năng nhận dạng dữ liệu tách được, kết luận về sự tồn tại cực tiểu và tính các hằng số của $F_\lambda$.
- **Mặt trang (nhãn "Câu hỏi:"):**
  - (a) $u=(-2,-1,1,2)$, $y=(-1,-1,+1,+1)$, đặc trưng $(1,u)$: dữ liệu có tách được không; $F$ có cực tiểu không.
  - (b) Cùng $u$, $y=(-1,+1,-1,+1)$: trả lời như (a).
  - (c) $\lambda=0{,}02$; mỗi $x_i$ gồm tọa độ hằng $1$ và phần đặc trưng có chuẩn $\le1$: cho $\mu$, cận trên của $L$ và $\kappa$, cận trên của $\lVert w_\lambda\rVert$.
- **Ghi chú (đáp án):** (a) $\bar w=(0,1)$, biên $(2,1,1,2)$; tách được, không có cực tiểu (LG05). (b) Điểm số affine đổi dấu nhiều nhất một lần, mẫu $-,+,-,+$ đổi dấu ba lần: không tách được; với $w\ne0$ luôn có biên âm (kiểm tra như LG06), nên có cực tiểu. (c) $\lVert x_i\rVert^2\le2$, nên $\mu=0{,}02$, $L\le\frac24+0{,}02=0{,}52$, $\kappa\le26$, $\lVert w_\lambda\rVert\le\sqrt{2\log2/0{,}02}\approx8{,}33$.
- **Hình:** không.
- **Liên kết:** kiểm tra đầu ra LG04–LG10 trước khi tổng kết mạch.
- **Quyết định:** thêm; trang bài tập của mạch.
- **Hành trình:** KN4, KN5, KN6 bài tập.
- **Thời lượng:** 0,23 tiết BT.

#### LG12 — Hệ số chính quy hóa và số điều kiện

- **Điểm trung tâm:** chính quy hóa làm bài toán đặt chỉnh, nhưng $\kappa$ tăng theo $1/\lambda$; nghiệm gần bài toán gốc hơn thì khó tính hơn.
- **Mặt trang:** bảng ba hàng của ví dụ một mẫu ($\lambda=0{,}5;\,0{,}05;\,0{,}005;\,0{,}0005$; $\sigma(w_\lambda)=0{,}663;\,0{,}894;\,0{,}980;\,0{,}997$; $\kappa=1{,}5;\,6;\,51;\,501$, số của VD-A2b); hai dòng: $\lambda\downarrow$ ⇒ $w_\lambda$ gần hành vi không chính quy hóa, $\kappa$ tăng theo $1/\lambda$. Một dòng: chính quy hóa làm bài toán đặt chỉnh (well-posed: nghiệm tồn tại, duy nhất, phụ thuộc liên tục vào dữ liệu) nhưng nghiệm càng gần bài toán gốc càng khó tính; chọn phương pháp tính $w_\lambda$ phụ thuộc $\kappa$, $n$, $d$.
- **Sửa sau rà soát năm vai (2026-10-12):** $\sigma(w_{0,5})=0{,}663$ (N1); "đặt chỉnh (well-posed: nghiệm tồn tại và duy nhất)"; dòng $\lambda$ giảm viết "$\sigma(w_\lambda)\to1$ và $\lVert w_\lambda\rVert$ tăng không bị chặn" (M19); ghi chú dùng "chi phí" (N8).
- **Ghi chú:** khi $\lambda$ giảm, $w_\lambda$ tiến gần hành vi của bài toán gốc trên dữ liệu tách được: $\sigma(w_\lambda)\to1$ và $\lVert w_\lambda\rVert$ tăng không bị chặn. Đồng thời cận $\kappa\le1+r^2/(4\lambda)$ tăng theo $1/\lambda$, và số bước hạ gradient trong định lý hội tụ tuyến tính tỉ lệ với $\kappa$. Độ gần bài toán gốc và chi phí tính toán vì vậy kéo ngược nhau; phương pháp Newton dùng độ cong có một giai đoạn hội tụ bậc hai mà số bước không chứa $\kappa$, còn giai đoạn tắt dần vẫn phụ thuộc độ cong qua $m$, $M$, $L_H$; mỗi bước Newton có giá phải đếm.
- **Hình:** không.
- **Liên kết:** giới hạn tạo nhu cầu cho CP01. Theo giao diện A–B, đây là đầu ra (b) của phiên A2.
- **Quyết định:** thêm; đầu ra rõ cho mạch sau. Tiêu đề đổi theo cổng storyboard (tên khái niệm thay cho cụm khẩu ngữ).
- **Hành trình:** chuyển KN6 sang KN7.
- **Thời lượng:** 0,06 tiết LT.

### CP. Độ cong và chi phí tính toán (phiên A3)

**Nhu cầu của mạch:** xác định chi phí tính toán của một bước cập nhật hội tụ nhanh hơn. 0,53 tiết LT + 0,25 tiết BT.

Ví dụ xuyên mạch (VD-A3, mục Ví dụ số): $F_\lambda(w)=\log(1+e^{-w})+\frac\lambda2w^2$ (dữ liệu Bài 01 VD 01.6, dạng trung bình), $w_0=0$, dừng khi $F_\lambda(w_k)-F_\lambda(w_\lambda)\le10^{-8}$.

#### CP01 — Hai quy tắc cập nhật

- **Điểm trung tâm:** hạ gradient dùng một độ dài bước $1/L$ cho mọi hướng; Newton chia mỗi hướng cho độ cong của chính nó.
- **Mặt trang:**
  - Hạ gradient: $w_{k+1}=w_k-\frac1L\nabla F_\lambda(w_k)$.
  - Newton: $w_{k+1}=w_k-[\nabla^2F_\lambda(w_k)]^{-1}\nabla F_\lambda(w_k)$.
  - Hình: hàm bậc hai minh họa, trị riêng $1$ và $10$, trục xoay $30^\circ$, xuất phát $(6,4)$: 12 bước hạ gradient còn ở $(1{,}76;\,1{,}02)$; Newton tới $0$ sau một bước.
- **Sửa sau rà soát năm vai (2026-10-12):** nhãn "sau 12 bước" trên hình dời khỏi nét đứt (N3); ghi chú dùng "chi phí" (N8).
- **Ghi chú:** nhắc lại từ Bài 04 (RG, RN). Trên hàm bậc hai, Newton đúng sau một bước; trên $F_\lambda$ thì không, vì Hessian thay đổi. Câu nối: Newton cần ít bước hơn; chi phí của mỗi bước là phần cần đếm.
- **Hình:** `cp-gd-newton-paths.svg`.
- **Liên kết:** kế thừa Bài 04; nhu cầu từ LG12.
- **Quyết định:** thêm.
- **Hành trình:** KN7 nhu cầu + trực quan.
- **Thời lượng:** 0,05 tiết LT.

#### CP02 — Hai phương pháp trên ví dụ một chiều

- **Điểm trung tâm:** với $\lambda=0{,}005$ ($\kappa=51$), Newton đạt sai số $10^{-8}$ sau 5 bước, hạ gradient sau 71 bước.
- **Mặt trang:** bảng $k=0..5$: Newton $w_k=0;\,1{,}9608;\,2{,}9645;\,3{,}6273;\,3{,}8841;\,3{,}9137$, $e_k=0{,}635;\,8{,}3\cdot10^{-2};\,1{,}4\cdot10^{-2};\,1{,}1\cdot10^{-3};\,1{,}1\cdot10^{-5};\,1{,}4\cdot10^{-9}$. Hạ gradient $w_k=0;\,1{,}9608;\,2{,}4062;\,2{,}6833;\,2{,}8816;\,3{,}0332$; $e_{71}=8{,}9\cdot10^{-9}$.
- **Sửa sau rà soát năm vai (2026-10-12):** ghi chú bỏ lời về việc đã kiểm (N9).
- **Ghi chú:** bước đầu trùng nhau vì $F_\lambda''(0)=\tfrac14+\lambda=L$. Ở giai đoạn cuối, số chữ số đúng của Newton tăng gấp đôi mỗi bước ($10^{-5}\to10^{-9}$). Phép tính thủ công: $g(0)=-0{,}5$, $h(0)=0{,}255$, $w_1=0{,}5/0{,}255=1{,}9608$. Trên ví dụ này, quay lui Armijo với $\alpha=0{,}25$ nhận bước đầy đủ $t=1$ ở mọi bước (đã kiểm cho cả ba giá trị $\lambda$ của CP03), nên bảng là đúng dãy lặp của định lý ở CP05.
- **Hình:** `cp-error-vs-iteration.svg` (trục log của $e_k$).
- **Liên kết:** dùng $F_\lambda$, $\kappa$ của LG09.
- **Quyết định:** thêm; ví dụ trước định lý.
- **Hành trình:** KN7 ví dụ.
- **Thời lượng:** 0,05 tiết LT + 0,05 tiết BT (bước Newton đầu tiên tính thủ công).

#### CP03 — Số bước theo số điều kiện

- **Điểm trung tâm:** số bước của hạ gradient tăng theo $\kappa$ nhưng chậm hơn $\kappa$: $\kappa$ tăng $83{,}5$ lần ($6\to501$), số bước tăng $37$ lần ($12\to446$), gần với mức tăng $35{,}5$ lần của tỉ số $L/F''_\lambda(w_\lambda)$; cận theo $\kappa$ là cận trên. Số bước Newton gần như không đổi.
- **Mặt trang:** bảng ba dòng:

  | $\lambda$ | $\kappa$ | Hạ gradient (thực tế) | Cận $\lceil\kappa\log(e_0/\varepsilon)\rceil$ | Newton |
  |---|---|---|---|---|
  | $0{,}05$ | $6$ | $12$ | $106$ | $4$ |
  | $0{,}005$ | $51$ | $71$ | $917$ | $5$ |
  | $0{,}0005$ | $501$ | $446$ | $9037$ | $7$ |

  Một dòng dưới bảng: số bước hạ gradient theo sát $L/F''_\lambda(w_\lambda)=2{,}07;\,10{,}5;\,73{,}5$ (độ cong tại nghiệm), tăng chậm hơn $\kappa$; cận theo $\kappa$ lớn hơn số bước thực 9–20 lần; số bước Newton chỉ tăng nhẹ ($4$, $5$, $7$).

- **Sửa sau rà soát năm vai (2026-10-12):** bảng thêm cột $e_0=0{,}4674;\ 0{,}6351;\ 0{,}6817$; cột cận ghi "(Định lý 3, trang sau)"; gọi tên "tỉ số độ cong toàn cục trên độ cong tại nghiệm"; ghi chú bỏ câu "không vì $\kappa$", thay bằng ngưỡng $m^2/L_H$ của giai đoạn bậc hai (M3).
- **Ghi chú:** cận lớn hơn số bước thực 9–20 lần vì $\mu=\lambda$ là cận dưới toàn cục của độ cong, trong khi tại nghiệm $F_\lambda''(w_\lambda)=0{,}1451;\,0{,}02419;\,0{,}003409$ lớn hơn nhiều. Gần nghiệm, hạ gradient co khoảng cách $\lvert w_k-w_\lambda\rvert$ theo hệ số khoảng $1-F''_\lambda(w_\lambda)/L$, nên co sai số giá trị $e_k$ theo hệ số khoảng $\big(1-F''_\lambda(w_\lambda)/L\big)^2=0{,}267;\,0{,}819;\,0{,}973$ (khớp tỉ số đo được $0{,}2667;\,0{,}8193;\,0{,}9727$). Vì vậy số bước tỉ lệ gần với số điều kiện cục bộ $L/F''_\lambda(w_\lambda)$ chứ không với $\kappa=L/\lambda$. Dấu $\propto$ chỉ dùng cho quan hệ với số điều kiện cục bộ. Số bước Newton tăng nhẹ vì $w_\lambda$ xa điểm đầu hơn (giai đoạn tắt dần dài hơn), không vì $\kappa$.
- **Hình:** không; bảng HTML.
- **Liên kết:** dẫn tới hai phát biểu hình thức CP04, CP05.
- **Quyết định:** thêm.
- **Hành trình:** KN7 ví dụ (đối chứng theo $\kappa$). (Nhu cầu của KN8 chuyển sang CP05 sau rà soát 2026-10-12.)
- **Thời lượng:** 0,05 tiết LT.

#### CP04 — Số bước của hạ gradient

- **Điểm trung tâm:** dưới H2, H3, bước $1/L$: $e_k\le(1-1/\kappa)^ke_0$, nên $k\ge\kappa\log(e_0/\varepsilon)$ bước là đủ.
- **Mặt trang:**
  - **Định lý 3** (Bài 05b, T2b; phát biểu lại). Giả thiết: $f$ $L$-trơn, $\mu$-lồi mạnh, có cực tiểu; $\eta=1/L$. Kết luận: $e_k\le(1-\mu/L)^ke_0$.
  - Hệ quả: vì $\log\frac1{1-1/\kappa}\ge\frac1\kappa$, điều kiện $k\ge\kappa\log\frac{e_0}\varepsilon$ đủ cho $e_k\le\varepsilon$.
  - Áp dụng: $F_\lambda$ thỏa giả thiết với $L$, $\mu$ của LG09.
- **Sửa sau rà soát năm vai (2026-10-12):** ghi chú thay câu chỉ thứ tự trình bày bằng quan hệ suy luận: so sánh với Newton cần cả số bước và chi phí một bước.
- **Ghi chú:** chứng minh ở Bài 05b (C05–C06) và Bài 04 (RG17); không chứng minh lại. Ánh xạ ký hiệu: $x_k$ (05b) là $w_k$. Mỗi bước dùng $\nabla F_\lambda$ trên toàn bộ $n$ mẫu. Nguồn: Boyd §9.3.1 (tr. 466–468).
- **Hình:** không.
- **Liên kết:** dùng LG09; đối chứng với CP05. Kết quả KQ8.
- **Quyết định:** thêm; nêu rõ kết quả nào được dùng lại.
- **Hành trình:** KN7 hình thức (hạ gradient); KN6 ứng dụng.
- **Thời lượng:** 0,05 tiết LT.

#### CP05 — Hội tụ bậc hai của Newton

- **Điểm trung tâm:** Newton có hai giai đoạn; giai đoạn hội tụ bậc hai cần không quá $\log_2\log_2(\varepsilon_0/\varepsilon)$ bước, con số không chứa $\kappa$.
- **Mặt trang:**
  - **Định lý 4** (Boyd §9.5.3; hội tụ bậc hai của Newton, Bài 04; phát biểu lại). Giả thiết: $\mu I\preceq\nabla^2f\preceq LI$ trên tập mức dưới (sublevel set) $C_0=\{w:\ f(w)\le f(w_0)\}$; Hessian Lipschitz hằng số $L_H$ (mặt trang có dòng "Nhắc lại:"); quay lui Armijo (Bài 04). Kết luận: số bước để $f-f^*\le\varepsilon$ không quá $\frac{f(x_0)-f^*}{\gamma}+\log_2\log_2\frac{\varepsilon_0}{\varepsilon}$, $\varepsilon_0=2\mu^3/L_H^2$; "Ý nghĩa:" số hạng đầu đếm giai đoạn tắt dần, số hạng sau đếm giai đoạn bậc hai, không chứa $\kappa$.
  - Ánh xạ (chỉ trong ghi chú; mặt trang viết $\mu$, $L$ theo quyết định chung 2026-10-12): $m=\mu$, $M=L$ (Boyd dùng $L$ cho hằng số Lipschitz của Hessian; ở đây viết $L_H$).
  - Nhận xét: bước Newton bất biến dưới phép đổi biến tuyến tính khả nghịch (Boyd §9.5.1, tr. 486); hạ gradient thì không.
- **Sửa sau rà soát năm vai (2026-10-12):** tập mức viết $C_0$ để không trùng ma trận trọng số $S$ (M17); "Số bước của giai đoạn bậc hai".
- **Ghi chú:** $\gamma$ và $\varepsilon_0$ phụ thuộc $m,M,L_H$, nên toàn bộ cận không độc lập với độ cong; phần độc lập với $\kappa$ chỉ là giai đoạn bậc hai. Sáu bước bậc hai cho độ chính xác khoảng $5\cdot10^{-20}\varepsilon_0$ (Boyd tr. 489). Không phát biểu "Newton không phụ thuộc $\kappa$" một cách vô điều kiện (điểm hòa giải 2; Bài 06 dùng cùng cách phát biểu).
- **Hình:** không.
- **Liên kết:** kế thừa Bài 04 RN07; kết quả KQ9; câu nối: ít bước, nhưng mỗi bước cần $\nabla^2F_\lambda$ và một hệ tuyến tính.
- **Quyết định:** thêm.
- **Hành trình:** KN7 hình thức (Newton); KN8 nhu cầu (ghi chú: mỗi bước Newton cần $\nabla^2F_\lambda$ và một hệ $d\times d$, chi phí chưa đếm).
- **Thời lượng:** 0,05 tiết LT.

#### CP06 — Các phép tính trong một bước

- **Điểm trung tâm:** một bước hạ gradient là hai phép nhân ma trận–vector với $X$; một bước Newton thêm việc lập $X^TSX$ và giải hệ $d\times d$.
- **Mặt trang:** giả mã hai cột, mỗi dòng ghi số phép nhân–cộng tại $n=10^5$, $d=10^3$:
  - $z=Xw$: $nd=10^8$; $r_i=-y_i\sigma(-y_iz_i)$: $O(n)$; $g=\frac1nX^Tr+\lambda w$: $10^8$.
  - Newton thêm: $H=\frac1nX^TSX+\lambda I$: $nd^2=10^{11}$; giải $Hp=-g$ bằng Cholesky: bậc $d^3=10^9$; quay lui: mỗi lần thử $O(n)$ sau khi tính sẵn $Xp$.
  - Tiêu chuẩn dừng: $\lVert\nabla F_\lambda\rVert\le\varepsilon_g$ (hạ gradient), $\frac12\delta_N^2\le\varepsilon$ (Newton, Bài 04).
- **Sửa sau rà soát năm vai (2026-10-12):** giải nghĩa $\varepsilon_g$ và $\delta_N$ (độ giảm Newton, Bài 04) trên mặt trang; khung "Phần thêm của một bước Newton" (M18); nguồn Boyd §9.7.1 tr. 508 (N4).
- **Ghi chú:** hằng số bị bỏ (G5): Cholesky tốn khoảng $d^3/3$ phép tính dấu phẩy động (Boyd §9.7, tr. 509–510); lập $X^TSX$ dùng tính đối xứng tốn khoảng $nd^2/2$ phép nhân–cộng. Đây là dạng bình phương nhỏ nhất có trọng số lặp (iteratively reweighted least squares, IRLS) của Newton cho hồi quy logistic. Nguồn: Boyd §9.7.1–9.7.2.
- **Hình:** không; giả mã HTML.
- **Liên kết:** từ CP05; cho số liệu để phát biểu tổng quát ở CP07.
- **Quyết định:** thêm; thuật toán cần giả mã, tiêu chuẩn dừng và chi phí chính (AGENTS.md).
- **Hành trình:** KN8 nhu cầu + trực quan + ví dụ.
- **Thời lượng:** 0,06 tiết LT.

#### CP07 — Chi phí một bước

- **Điểm trung tâm:** với $n\ge d$ và ma trận dày đặc, một bước hạ gradient tốn $O(nd)$, một bước Newton tốn $O(nd^2+d^3)$; bộ nhớ thêm $O(n+d)$ và $O(d^2+n)$.
- **Mặt trang:**
  - **Mệnh đề 5.** Hạ gradient: thời gian $O(nd)$, bộ nhớ thêm $O(n+d)$. Newton: thời gian $O(nd^2+d^3)$, bộ nhớ thêm $O(d^2+n)$.
  - Tỉ số một bước Newton / một bước hạ gradient: bậc $d+d^2/n$.
  - Cả hai đều có thừa số $n$.
- **Sửa sau rà soát năm vai (2026-10-12):** bộ nhớ thêm $O(n+d)$ (hạ gradient), $O(d^2+n)$ (Newton) (M2); thêm Nhận xét $d>n$: $H=\lambda I+$ ma trận hạng $\le n$, giải qua hệ $n\times n$ với chi phí $O(n^2d+n^3)$ (S2); nguồn tr. 508–512 (N4).
- **Ghi chú:** khi $d>n$, Hessian là $\lambda I$ cộng một ma trận hạng $n$; giải qua hệ $n\times n$ tốn $O(n^2d+n^3)$ (Boyd §9.7.2, "đường chéo cộng hạng thấp", tr. 511–512). Công thức chung: $O(nd\min(n,d)+\min(n,d)^3)$. Với dữ liệu thưa, $nd$ được thay bằng số phần tử khác $0$ của $X$. Gradient liên hợp và BFGS (Bài 06c, LLO15) giảm chi phí $d^3$; không trình bày trong bài này.
- **Hình:** không.
- **Liên kết:** tổng quát hóa CP06 (KQ10); đầu vào cho CP08.
- **Quyết định:** thêm; phát biểu chi phí là đầu ra (c) của giao diện.
- **Hành trình:** KN8 hình thức.
- **Thời lượng:** 0,06 tiết LT.

#### CP08 — Tổng chi phí và ngưỡng hòa vốn

- **Điểm trung tâm:** Newton rẻ hơn khi $\kappa\log(e_0/\varepsilon)$ vượt $N_{\rm N}(d+d^2/n)$, với $N_{\rm N}$ là số bước Newton.
- **Mặt trang:**
  - Hạ gradient: $\approx nd\cdot\kappa\log(e_0/\varepsilon)$; Newton: $\approx(nd^2+d^3)\,N_{\rm N}$.
  - Ví dụ $n=10^5$, $d=10^3$, $e_0/\varepsilon=10^8$ ($\log=18{,}42$), $N_{\rm N}=10$: Newton $\approx1{,}01\cdot10^{12}$; hạ gradient $\approx1{,}84\cdot10^9\,\kappa$; hòa vốn khi $\kappa$ có bậc vài trăm ($548$ khi bỏ hằng số; $137$ khi tính hằng số của giả mã).
  - Với $\lVert x_i\rVert^2\le r^2=2$ (tọa độ hằng cộng phần đặc trưng có chuẩn $\le1$): $\lambda=10^{-3}$ cho $\kappa\le501$, cận hạ gradient $\approx9{,}2\cdot10^{11}$; $\lambda=10^{-5}$ cho $\kappa\le50\,001$, cận hạ gradient $\approx9{,}2\cdot10^{13}$.
- **Sửa sau rà soát năm vai (2026-10-12):** ngưỡng hòa vốn viết "$\kappa$ cỡ vài trăm ($548$ khi bỏ hằng số)"; ở $\lambda=10^{-3}$ hai cận cùng bậc, không kết luận; ở $\lambda=10^{-5}$ Newton có lợi theo cận khoảng $90$ lần; ghi chú nêu ngưỡng $137$ khi tính hằng số của giả mã (M1).
- **Ghi chú:** đây là so sánh cận, không phải số bước thực; CP03 cho thấy cận của hạ gradient có thể bi quan 10 lần. Kết luận đúng có điều kiện: Newton có lợi khi $\kappa$ rất lớn và $d$ vừa phải; khi $d$ lớn, $d^2$ và $d^3$ chiếm ưu thế. Nguồn đối chiếu: Bottou–Bousquet, SNW ch. 13, Bảng 13.2 (tr. 362): GD $O(nd)$ mỗi bước, $O(\kappa\log\frac1\rho)$ bước; 2GD $O(d^2+nd)$ mỗi bước, $O(\log\log\frac1\rho)$ bước.
- **Hình:** không.
- **Liên kết:** gộp CP04, CP05, CP07.
- **Quyết định:** thêm.
- **Hành trình:** KN8 hình thức (tổng chi phí) + ứng dụng; KN7 ứng dụng.
- **Thời lượng:** 0,07 tiết LT.

#### CP09 — Chi phí theo ba quy mô

- **Điểm trung tâm:** khi $(n,d)$ tăng, một bước Newton đắt hơn một bước hạ gradient từ $10^2$ tới $5\cdot10^4$ lần, và chỉ riêng Hessian đã cần 17,8 GB.
- **Mặt trang:** bảng

  | $(n,d)$ | $nd$ | $nd^2$ | $d^3$ | Bộ nhớ Hessian $8d^2$ byte | $d+d^2/n$ |
  |---|---|---|---|---|---|
  | $(10^3,10^2)$ | $10^5$ | $10^7$ | $10^6$ | 80 kB | 110 |
  | $(10^5,10^3)$ | $10^8$ | $10^{11}$ | $10^9$ | 8 MB | 1010 |
  | $(781\,265;\,47\,152)$ | $3{,}68\cdot10^{10}$ | $1{,}74\cdot10^{15}$ | $1{,}05\cdot10^{14}$ | 17,8 GB | $\approx5{,}0\cdot10^4$ |

- **Sửa sau rà soát năm vai (2026-10-12):** dòng ba ghi tên RCV1 (M11).
- **Ghi chú:** dòng ba lấy kích thước tập RCV1 trong thí nghiệm của Bottou–Bousquet (SNW §13.4.1, tr. 363): 781 265 mẫu huấn luyện, 47 152 đặc trưng tần suất từ – nghịch đảo tần suất văn bản (TF-IDF). Dữ liệu này thưa; con số tính như ma trận dày đặc chỉ để so bậc. Không giả định tốc độ máy.
- **Hình:** không; bảng HTML.
- **Liên kết:** áp dụng CP07–CP08; dòng ba dùng lại ở KL02.
- **Quyết định:** thêm; thiết kế của người dùng đặt câu hỏi về chi phí tính toán, bảng ba quy mô cho câu trả lời định lượng.
- **Hành trình:** KN8 ứng dụng.
- **Thời lượng:** 0,04 tiết LT (nhường $0{,}02$ cho KL03).

#### CP10 — Câu hỏi về chi phí và số bước

- **Điểm trung tâm:** kiểm tra bước Newton tính thủ công, so sánh tổng chi phí và chi phí khi $d>n$.
- **Mặt trang (nhãn "Câu hỏi:"):**
  - (a) $F_\lambda(w)=\log(1+e^{-w})+0{,}025w^2$ ($\lambda=0{,}05$), $w_0=0$: tính hai bước Newton.
  - (b) $n=10^6$, $d=10^4$, $\kappa=1000$, $e_0/\varepsilon=10^8$, $N_{\rm N}=10$: so tổng chi phí hai phương pháp; bộ nhớ Hessian.
  - (c) $n=10^4$, $d=10^5$: chi phí một bước Newton khi tận dụng cấu trúc hạng thấp.
- **Ghi chú (đáp án):** (a) $g(0)=-0{,}5$, $h(0)=0{,}3$, $w_1=1{,}6667$; $g(w_1)=-0{,}07554$, $h(w_1)=0{,}18363$, $w_2=2{,}0780$ (nghiệm $2{,}1280$). (b) Hạ gradient $\approx1000\cdot18{,}42\cdot10^{10}=1{,}84\cdot10^{14}$; Newton $\approx10\cdot(10^{14}+10^{12})=1{,}01\cdot10^{15}$; bỏ hằng số, cận hạ gradient nhỏ hơn khoảng 5 lần; tính cả hằng số của giả mã, hai cận là $3{,}7\cdot10^{14}$ và $5{,}0\cdot10^{14}$, cùng bậc, nên chỉ kết luận về bậc độ lớn (sửa 2026-10-12); Hessian 800 MB. (c) $n^2d+n^3=1{,}1\cdot10^{13}$ so với $nd^2+d^3=1{,}1\cdot10^{15}$.
- **Hình:** không.
- **Liên kết:** kiểm tra đầu ra CP02–CP09 trước khi tổng kết mạch.
- **Quyết định:** thêm; trang bài tập của mạch.
- **Hành trình:** KN7, KN8 bài tập.
- **Thời lượng:** 0,20 tiết BT.

#### CP11 — Thừa số $n$ trong mọi bước

- **Điểm trung tâm:** mọi phương pháp của bài trả chi phí tỉ lệ với $n$ ở mỗi bước; Newton đổi số bước lấy chi phí $d^2$, $d^3$, không bỏ được thừa số $n$.
- **Mặt trang:** hai dòng: hạ gradient $O(nd)$ nhân $O(\kappa\log\frac1\varepsilon)$; Newton $O(nd^2+d^3)$ nhân $O(\log\log\frac1\varepsilon)$ cộng giai đoạn tắt dần. Một dòng: với RCV1, một gradient đầy đủ (hai tích $Xw$, $X^Tr$) cần $\approx7{,}4\cdot10^{10}$ phép nhân–cộng, một bước Newton với Hessian dày đặc cần $nd^2+d^3\approx1{,}8\cdot10^{15}$ phép nhân–cộng và 17,8 GB cho Hessian; panel: với ngân sách tính toán cố định, số lần cập nhật giảm theo $1/n$ (sửa sau rà soát 2026-10-12).
- **Ghi chú:** tổng chi phí là chi phí một bước nhân số bước; Newton giảm thừa số thứ hai nhưng tăng thừa số thứ nhất từ $nd$ lên $nd^2+d^3$, và cả hai thừa số thứ nhất đều chứa $n$ vì mỗi bước đọc toàn bộ dữ liệu. Một lượt qua dữ liệu (một gradient đầy đủ) là đơn vị chi phí nhỏ nhất mà mọi phương pháp của bài phải trả cho mỗi lần cập nhật; khi $n$ tăng, số lần cập nhật làm được trong một ngân sách cố định giảm theo $1/n$.
- **Hình:** không.
- **Liên kết:** giới hạn tạo nhu cầu cho KL; KL03(i) dẫn lại kết quả này, không phát biểu lại. Theo giao diện A–B, đây là đầu ra (c) của phiên A3 và giới hạn (i).
- **Quyết định:** thêm; mạch cần đầu ra rõ cho mạch kết luận.
- **Hành trình:** KN8, trang kết của cụm.
- **Thời lượng:** 0,05 tiết LT.

### KL. Giới hạn của tối ưu tất định

Chức năng: tổng hợp đầu ra ba phiên thành luận đề; nêu hai giới hạn chuyển sang Bài 06. 0,14 tiết LT + 0,08 tiết BT.

#### KL01 — Nghiệm chính xác và nghiệm dừng sớm

- **Điểm trung tâm:** trên dữ liệu A1 với $d=5$, hạ gradient đạt sai số xác thực nhỏ nhất ở bước 79; khi $k\to\infty$ sai số xác thực tiến tới $0{,}0487$, gấp 45 lần, trong khi MSE huấn luyện $\le10^{-6}$ chỉ đạt từ bước 2701 (MSE xác thực $0{,}0480$; $F\le10^{-6}$ từ bước 2509); dừng ở bước 79 tốn ít hơn khoảng 34 lần số lượt qua dữ liệu.
- **Mặt trang:**
  - Định nghĩa: dừng sớm (early stopping) là chạy hạ gradient, theo dõi sai số trên tập xác thực và trả về $w_k$ tại bước có sai số xác thực nhỏ nhất.
  - Bảng MSE xác thực: $k=0$: $0{,}3125$; $10$: $0{,}0107$; $50$: $0{,}00200$; $79$: $0{,}00108$; $200$: $0{,}00487$; $1000$: $0{,}0341$; giới hạn khi $k\to\infty$: $0{,}0487$.
  - Một dòng dữ liệu: bình phương nhỏ nhất với $\lambda=0$, $d=5$, $w_0=0$, bước $1/L$, $\kappa=553{,}7$ ($L=1{,}5715$ ở ghi chú); khung nhu cầu: MSE huấn luyện $\le10^{-6}$ từ bước 2701, dừng ở bước 79 tốn ít hơn khoảng 34 lần số lượt qua dữ liệu, sai số xác thực nhỏ hơn 45 lần, cần quy tắc chọn bước dừng theo sai số xác thực.
- **Sửa sau rà soát năm vai (2026-10-12):** thứ tự ví dụ → nhu cầu → định nghĩa: câu dữ liệu và bảng lên đầu, khung nhu cầu (dừng ở bước 79 thay vì 2701, ít hơn khoảng 34 lần số lượt qua dữ liệu, sai số xác thực nhỏ hơn 45 lần), rồi định nghĩa; ngưỡng thống nhất theo MSE huấn luyện $\le10^{-6}$ từ bước $2701$ như hình ($F\le10^{-6}$ từ bước 2509 nêu trong ghi chú) (M9).
- **Ghi chú:** dừng sớm có vai trò gần với chính quy hóa bậc hai (Goodfellow §7.8, tr. 246–250, chứng minh cho hàm bậc hai). Hạ gradient không đạt cực tiểu chính xác sau hữu hạn bước; $0{,}0487$ là giới hạn, còn tại bước 2701 (MSE huấn luyện $\le10^{-6}$) sai số xác thực là $0{,}0480$; $F\le10^{-6}$ đạt từ bước 2509, khi đó sai số xác thực là $0{,}0476$. Bốn điểm $u=\pm\tfrac14,\pm\tfrac34$ là tập xác thực, nên con số $0{,}00108$ không phải báo cáo cuối về $R$; báo cáo cuối cần tập kiểm thử riêng. Kết luận dùng cả ba phần: quá khớp ở hồi quy nhiều chiều, vai trò của chính quy hóa, và $\kappa$ quyết định số bước. Đây là lý do thứ hai của vấn đề trung tâm ở dạng định lượng.
- **Hình:** `kl-early-stopping.svg`.
- **Liên kết:** từ CP11; chuẩn bị KL02. Phân công nguồn chung với Bài 06 (quyết định của điều phối viên 2026-10-11): KL01 chỉ nêu quan sát số trên dữ liệu A1 và gọi tên Goodfellow §7.8 trong ghi chú; phép so sánh định lượng về độ co của nghiệm thuộc F05 của Bài 06.
- **Quyết định:** thêm; luận đề yêu cầu dừng sớm là thành phần của phương pháp. Dòng định nghĩa thêm sau cổng storyboard.
- **Hành trình:** khái niệm hỗ trợ "dừng sớm": nhu cầu + ví dụ + định nghĩa, chu trình rút gọn (storyboard).
- **Thời lượng:** 0,05 tiết LT.

#### KL02 — Số liệu trên tập RCV1

- **Điểm trung tâm:** trong thí nghiệm hồi quy logistic có chính quy hóa của Bottou–Bousquet, hạ gradient ngẫu nhiên (SGD), với chi phí mỗi bước không phụ thuộc $n$, đạt cùng mức lỗi kiểm thử (5,66–5,70 %) với thời gian nhỏ hơn một bậc độ lớn so với một phương pháp kiểu Newton.
- **Mặt trang:** bảng ba dòng (SNW, Bảng 13.3, tr. 363; mất mát logistic, $\lambda=10^{-5}$): TRON $\rho=10^{-2}$: 30 s, mục tiêu $0{,}18907$, lỗi kiểm thử 5,68 %; TRON $\rho=10^{-3}$: 44 s, $0{,}18890$, 5,70 %; SGD: 2,3 s, $0{,}18893$, 5,66 %.
- **Sửa sau rà soát năm vai (2026-10-12):** mặt trang giải nghĩa TRON, $\rho$, SGD; ghi chú bỏ hai khái quát quá mức và sửa "chữ số thứ tư" thành hiệu $1{,}7\cdot10^{-4}$ (M11).
- **Ghi chú:** TRON là phương pháp Newton miền tin cậy giải hệ bằng gradient liên hợp, không lập Hessian dày đặc; không đồng nhất với Newton thuần đã đếm chi phí. SGD chỉ được gọi tên ở đây; định nghĩa và tốc độ thuộc Bài 06. Hai quan sát: chi phí theo $n$ của mỗi bước quyết định thời gian, nên việc dùng SGD bị buộc bởi chi phí mỗi bước; chênh lệch mục tiêu ở chữ số thứ tư đi cùng lỗi kiểm thử chênh nhau không quá 0,04 điểm phần trăm. Số liệu thuộc phần cứng và phần mềm năm 2008–2011, chỉ dùng để so bậc.
- **Hình:** không; bảng HTML.
- **Liên kết:** dùng dòng ba của CP09; đầu ra cho E02 của Bài 06. Phân công nguồn chung với Bài 06 (quyết định của điều phối viên 2026-10-11): KL02 chỉ trình bày các hàng mất mát logistic của SNW Bảng 13.3; E02 của Bài 06 trình bày các hàng mất mát hinge và dẫn lại KL02.
- **Quyết định:** thêm; bằng chứng có nguồn cho hai lý do của MD03c.
- **Hành trình:** khái niệm hỗ trợ.
- **Thời lượng:** 0,01 tiết LT (nhường $0{,}01$ cho KL03).

#### KL03 — Giới hạn của mô hình tuyến tính và phương pháp tất định

- **Điểm trung tâm:** (i) mọi phương pháp trong bài trả chi phí của toàn bộ $n$ mẫu ở mỗi bước; (ii) dự đoán tuyến tính theo đặc trưng không biểu diễn được một số quan hệ, XOR là trường hợp điển hình, và mở rộng đặc trưng thủ công làm $d$ tăng nhanh; (i) chốt luận đề: $n$ lớn với ngân sách cố định buộc thay gradient đầy đủ bằng SGD.
- **Mặt trang:**
  - (i) Thừa số $n$ ở mỗi bước của cả hai phương pháp, như đã đếm.
  - (ii) XOR trên bốn điểm $u\in\{0,1\}^2$: nhãn $+1$ tại $(0,1)$, $(1,0)$; nhãn $-1$ tại $(0,0)$, $(1,1)$. Không điểm số affine $g$ nào phân loại đúng, vì $g(1,0)+g(0,1)=g(0,0)+g(1,1)$. Thêm đặc trưng $u_1u_2$ thì tách được.
  - Số đơn thức bậc $\le q$ của $d_0$ biến đầu vào: $\binom{d_0+q}q$; $d_0=100$: $5151$ ($q=2$), $176\,851$ ($q=3$).
- **Sửa sau rà soát năm vai (2026-10-12):** bậc đơn thức viết $q$ (N10); "với một bộ đặc trưng cố định"; "làm $d$ tăng nhanh" thay cách nói cũ (N8).
- **Ghi chú:** đẳng thức đúng vì cả hai vế bằng $2w_0+w_1+w_2$; phân loại đúng đòi vế trái dương và vế phải âm. Bài 06 mở đầu phần mạng hai lớp bằng bài toán XOR, nhắc lại và dùng kết quả này. Với đặc trưng $(1,u_1,u_2,u_1u_2)$, $\bar w=(-\tfrac12,1,1,-2)$ cho điểm số $-\tfrac12,\tfrac12,\tfrac12,-\tfrac12$ tại $(0,0),(1,0),(0,1),(1,1)$, nên mọi biên bằng $\tfrac12$. Ba điểm $-,+,-$ trên một trục ở phần hồi quy logistic là dạng một chiều của XOR. Phần hồi quy nhiều chiều cho thấy hệ quả của $d$ lớn (quá khớp, $\kappa$ không giảm); phần chi phí cho thấy Newton tốn theo $d^2$, $d^3$. Đầu vào thô $u$ ở đây là $x$ của Bài 06.
- **Hình:** không.
- **Liên kết:** dòng (i) dẫn kết quả của CP11, không phát biểu lại; dòng (ii) là đầu vào của B1–B2 (XOR, mạng hai lớp), dòng (i) là đầu vào của B3 (nhóm nhỏ) của Bài 06. Bốn điểm và nhãn trùng với B01 của Bài 06 (điểm hòa giải 4), viết theo quy ước nhãn $\pm1$; chứng minh đầy đủ ở B02 của Bài 06.
- **Quyết định:** thêm; giao diện A–B bắt buộc. Tiêu đề đổi và nội dung rút về phát biểu cộng một đẳng thức theo cổng storyboard.
- **Hành trình:** nhu cầu mở cho Bài 06.
- **Thời lượng:** 0,05 tiết LT (nhận $0{,}02$ từ CP09 và $0{,}01$ từ KL02).

#### KL04 — Điều không còn giữ được và điều còn giữ được

- **Điểm trung tâm:** khi chuyển sang dữ liệu và mô hình lớn, phải bỏ tính chính xác của nghiệm làm đích, bảo đảm tất định và gradient đầy đủ; còn giữ tính giảm mỗi bước của hạ gradient với gradient đầy đủ khi còn tính được, bất đẳng thức một bước có số hạng nhiễu và tốc độ theo kỳ vọng của SGD, và hội tụ tới điểm dừng.
- **Mặt trang** (bản sau tái kiểm 2026-10-12): một dòng "Mất khi (i) chi phí buộc dùng SGD, hoặc (ii) mục tiêu không lồi (Bài 06): hai giới hạn ở trang trước", kèm giải nghĩa $K$ (số bước), $\eta$ (bước), $\Delta_0=F(w_0)-\inf F$, $\tau^2$ (chặn phương sai nhiễu của gradient ngẫu nhiên; Bài 05b viết $\sigma^2$, ở đây đổi vì $\sigma$ là sigmoid). Bảng hai cột "Mất (khi nào)" / "Còn giữ được":
  - đích là nghiệm chính xác (mất ngay trong bài, vì $F$ chỉ đại diện cho $R$) ↔ đích là $R$ nhỏ; dừng sớm và chính quy hóa thuộc phương pháp;
  - bảo đảm tất định của Định lý 3, $e_k\le(1-1/\kappa)^ke_0$ (tốc độ tuyến tính, mất khi (i) hoặc (ii); dưới (ii) với gradient đầy đủ, bổ đề giảm và T7 vẫn là bảo đảm tất định) ↔ gradient đầy đủ, khi còn tính được: $F$ giảm mỗi bước (bổ đề giảm); SGD với $F_\lambda$ lồi mạnh: bước hằng tới lân cận với $\mathbb E\lVert w_k-w^*\rVert^2$ có bậc $\eta\tau^2/\mu$ (T5), bước giảm dần tới cực tiểu, $O(1/k)$ (T6);
  - cực tiểu toàn cục (mất khi (ii)) ↔ điểm dừng xấp xỉ: $\min_{k<K}\lVert\nabla F\rVert^2\le2L\Delta_0/K$ (T7); SGD bước hằng: trung bình $\mathbb E\lVert\nabla F\rVert^2\le\frac{2\Delta_0}{\eta K}+L\eta\tau^2$, mức nhiễu nền tỉ lệ với $\eta$ (T8);
  - chi phí $O(nd)$ mỗi bước (mất khi (i)) ↔ gradient nhóm nhỏ: không chệch, chi phí không phụ thuộc $n$ (Định lý 05c.53).
  Câu luận đề "$n$ lớn với ngân sách cố định buộc thay gradient đầy đủ bằng SGD" đặt ở KL03 (i).
- **Sửa sau rà soát năm vai (2026-10-12):** xem mục Mặt trang (S1; tái kiểm R1, R2: T5 bước hằng chỉ tới lân cận với $\mathbb E\lVert w_k-w^*\rVert^2$ cỡ $\eta\tau^2/\mu$, nhãn (i), (ii) thay (A), (B)).
- **Ghi chú:** chỉ nêu tên các kết quả T5, T6, T7, T8; phát biểu thuộc Bài 05b và Bài 06 (điểm hòa giải 3). SGD không bảo đảm $F$ giảm theo kỳ vọng ở mỗi bước: Bài 06 cho một ví dụ bốn điểm trong đó một bước SGD xuất phát từ chính cực tiểu cho $\mathbb E\,F(\theta_1)=\tfrac{69}{128}>\tfrac12=F(\theta_0)$. Điều còn lại là bất đẳng thức một bước có số hạng nhiễu tỉ lệ với $\eta^2$, đủ để suy ra tốc độ theo kỳ vọng khi bước đủ nhỏ hoặc giảm dần. Mất mát lồi không còn bảo đảm mục tiêu lồi khi tham số vào phi tuyến; điều này thuộc Bài 06.
- **Hình:** không; bảng HTML.
- **Liên kết:** gộp MD03c với KL01–KL03. Cột "còn giữ được" chính xác hóa theo cổng storyboard Bài 06 (2026-10-11).
- **Quyết định:** thêm; luận đề yêu cầu phát biểu điều không còn giữ được và điều còn giữ được ở kết luận.
- **Hành trình:** tổng hợp.
- **Thời lượng:** 0,02 tiết LT.

#### KL05 — Tổng kết, bài tập và tài liệu đọc

- **Điểm trung tâm:** đối chiếu kết quả của bài với ba mục tiêu và kiểm tra khả năng chuyển giao sang một tình huống $d>n$.
- **Mặt trang:** ba dòng tổng kết theo mục tiêu 1–3; "Câu hỏi:" chuyển giao cho $n=200$ mẫu, $d=500$ đặc trưng đa thức, phân loại hai lớp: (a) nêu ba hệ quả; (b) nêu phương án tính; (c) nếu huấn luyện bằng hạ gradient và dừng sớm, chọn bước dừng bằng tập nào và vì sao sai số trên tập đó không phải ước lượng cuối của $R$. Bài tập về nhà: chứng minh $\lVert w_\lambda\rVert\to\infty$ khi $\lambda\to0$ trên dữ liệu tách được; chứng minh đầy đủ Mệnh đề 3 (danh sách bài tập trong `exercises.md` thêm khi học liệu được viết lại); tài liệu đọc: Goodfellow §5.2, §7.1, §7.3, §7.8, §8.1; Boyd §6.3.2, §7.1.1, §9.3, §9.5, §9.7; SNW ch. 13.
- **Ghi chú (đáp án):** (a) $d>n$: $\operatorname{rank}X\le200$; nếu $\operatorname{rank}X=200$ thì mọi nhãn tách được và $F$ không có cực tiểu; cần $\lambda>0$; $\kappa\le1+\lambda_{\max}(X^TX)/(800\lambda)$. (b) Newton qua hệ $200\times200$ ($O(n^2d+n^3)=2{,}8\cdot10^7$) rẻ hơn hệ $500\times500$. (c) Bước dừng chọn bằng tập xác thực; sai số xác thực tại bước được chọn là giá trị nhỏ nhất trên cả quỹ đạo nên có xu hướng thấp hơn $R$; ước lượng cuối lấy trên tập kiểm thử riêng.
- **Hình:** không.
- **Liên kết:** khép vấn đề trung tâm của MD03c; tài liệu đọc dẫn sang Bài 05b, 05c và Bài 06.
- **Quyết định:** thêm; cấu trúc mặc định mục 6 của AGENTS.md. Câu (c) thêm sau cổng storyboard để có bước kiểm tra thật của khái niệm dừng sớm.
- **Hành trình:** bài tập tổng hợp; bài tập của khái niệm dừng sớm (câu c).
- **Thời lượng:** 0,01 tiết LT + 0,08 tiết BT.

Kiểm tra cộng thời lượng theo trang (sau cổng storyboard). MD: $0{,}01+0{,}02+0{,}04+0{,}03=0{,}10$. HQ LT: $0{,}04+0{,}06+0{,}04+0{,}05+0{,}06+0{,}03+0{,}07+0{,}04+0{,}04+0{,}06+0+0{,}07=0{,}56$; HQ BT: $0{,}06+0{,}04+0{,}04+0{,}05+0{,}15=0{,}34$. LG LT: $0{,}04+0{,}04+0{,}05+0{,}04+0{,}07+0{,}04+0{,}05+0{,}08+0{,}10+0{,}10+0+0{,}06=0{,}67$; LG BT: $0{,}05+0{,}05+0{,}23=0{,}33$. CP LT: $5\cdot0{,}05+0{,}06+0{,}06+0{,}07+0{,}04+0+0{,}05=0{,}53$; CP BT: $0{,}05+0{,}20=0{,}25$. KL LT: $0{,}05+0{,}01+0{,}05+0{,}02+0{,}01=0{,}14$; KL BT: $0{,}08$. Tổng LT $2{,}00$, BT $1{,}00$.

## Ví dụ số

Mọi số liệu dưới đây do tác tử lập kế hoạch tính bằng Python thuần (phân số chính xác khi có thể) và được điều phối viên tính lại độc lập ngày 2026-10-11 (review-log, vòng lập lại kế hoạch). Ngoại lệ: lời giải XOR ở KL03 do tác tử soạn bổ sung theo điểm hòa giải 4, kiểm tra tay ở mục 6.4.

### 6.1. VD-A1: hồi quy đa thức với năm mẫu

Dữ liệu: $u=(-1,-\tfrac12,0,\tfrac12,1)$, $\varepsilon=(\tfrac1{10},-\tfrac15,\tfrac15,-\tfrac1{10},0)$, $y=u+\varepsilon=(-\tfrac9{10},-\tfrac7{10},\tfrac15,\tfrac25,1)$. Tập xác thực (bốn điểm ngoài mẫu; ví dụ không có tập kiểm thử riêng): $u^{\rm t}=(-\tfrac34,-\tfrac14,\tfrac14,\tfrac34)$, $y^{\rm t}=u^{\rm t}$. Mục tiêu $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$; bảng ghi MSE $=\frac1n\lVert Xw-y\rVert^2$.

**$d=1$.** $w_0=\bar y=0$; MSE huấn luyện $=\frac{0{,}81+0{,}49+0{,}04+0{,}16+1}5=0{,}5$; MSE xác thực $=\frac{0{,}5625+0{,}0625+0{,}0625+0{,}5625}4=0{,}3125$.

**$d=2$.** $X^TX=\begin{pmatrix}5&\sum u_i\\\sum u_i&\sum u_i^2\end{pmatrix}=\begin{pmatrix}5&0\\0&\tfrac52\end{pmatrix}$, $X^Ty=(\sum y_i,\sum u_iy_i)=(0,\tfrac{49}{20})$, $w=(0,\tfrac{49}{50})$. Phần dư $0{,}98u_i-y_i=(-0{,}08;\,0{,}21;\,-0{,}2;\,0{,}09;\,-0{,}02)$, tổng bình phương $0{,}099$, MSE $=\frac{99}{5000}=0{,}0198$. Xác thực: sai số $-0{,}02u^{\rm t}$, MSE $=0{,}0004\cdot0{,}3125=0{,}000125=\frac1{8000}$.

**$d=3,4,5$** (giải phương trình chuẩn bằng phân số):

| $d$ | $w$ | MSE huấn luyện | MSE xác thực | $\lambda_{\min}(X^TX)$ | $\lambda_{\max}(X^TX)$ | $\kappa$ |
|---|---|---|---|---|---|---|
| 1 | $(0)$ | $1/2$ | $5/16=0{,}3125$ | 5 | 5 | 1 |
| 2 | $(0,\frac{49}{50})$ | $99/5000=0{,}0198$ | $1/8000=0{,}000125$ | 2,5 | 5 | 2 |
| 3 | $(-\frac1{70},\frac{49}{50},\frac1{35})$ | $86/4375\approx0{,}019657$ | $321/1568000\approx0{,}000205$ | 0,67868 | 6,44632 | 9,498 |
| 4 | $(-\frac1{70},\frac{23}{20},\frac1{35},-\frac15)$ | $1/56\approx0{,}017857$ | $5349/5017600\approx0{,}001066$ | 0,127739 | 6,44632 | 50,46 |
| 5 | $(\frac15,\frac{23}{20},-\frac{109}{60},-\frac15,\frac53)$ | $0$ | $79761/1638400\approx0{,}048682$ | 0,0141907 | 7,85744 | 553,7 |
| 6 (chuẩn nhỏ nhất) | $\approx(0{,}2;\,1{,}0988;\,-1{,}8167;\,0{,}0560;\,1{,}6667;\,-0{,}2048)$ | $0$ | $0{,}049224$ | $0$ | — | $\infty$ |
| 8 (chuẩn nhỏ nhất) | $\approx(0{,}2;\,1{,}0751;\,-1{,}575;\,0{,}1346;\,0{,}4583;\,-0{,}1005;\,0{,}9667;\,-0{,}1593)$ | $0$ | $0{,}075928$ | $0$ | — | $\infty$ |

Tỉ số xác thực $d=5$ so với $d=2$: $0{,}048682/0{,}000125=389{,}5$.

**Kiểm tra $d=5$.** $p(u)=\frac15+\frac{23}{20}u-\frac{109}{60}u^2-\frac15u^3+\frac53u^4$: $p(0)=0{,}2$; $p(1)=0{,}2+1{,}15-1{,}8167-0{,}2+1{,}6667=1{,}0$; $p(-1)=0{,}2-1{,}15-1{,}8167+0{,}2+1{,}6667=-0{,}9$. Dự đoán trên tập xác thực: $-\frac{1373}{1280},-\frac{49}{256},\frac{483}{1280},\frac{619}{1280}$; sai số $-0{,}32266;\,0{,}05859;\,0{,}12734;\,-0{,}26641$; tổng bình phương $0{,}194733$; MSE $0{,}048683$.

**Họ nghiệm $d=6$.** $z=(0,\frac14,0,-\frac54,0,1)$ ứng với $u(u^2-1)(u^2-\frac14)$, bằng $0$ tại năm nút, nên $Xz=0$; $z^Tw_{\rm mn}=0$. Giá trị tại bốn điểm xác thực: $\frac{105}{1024},-\frac{45}{1024},\frac{45}{1024},-\frac{105}{1024}$.

| $t$ | MSE huấn luyện | MSE xác thực | $\lVert w_{\rm mn}+tz\rVert^2$ |
|---|---|---|---|
| $-5$ | 0 | 0,22440 | 72,995 |
| $-1$ | 0 | 0,05937 | 9,995 |
| $0$ | 0 | 0,04922 | 7,370 |
| $1$ | 0 | 0,05153 | 9,995 |
| $5$ | 0 | 0,18518 | 72,995 |

**Độ nhạy.** $\delta y=(0,0,0{,}01,0,0)$. $d=2$: $\delta w=(\frac1{500},0)$, $\lVert\delta w\rVert=0{,}002$; $1/\sqrt{\lambda_{\min}}=0{,}632$. $d=5$: $\delta w=0{,}01\cdot(1,0,-5,0,4)$ (đa thức Lagrange $4u^4-5u^2+1$), $\lVert\delta w\rVert=0{,}0648$; $1/\sqrt{\lambda_{\min}}=8{,}395$.

**Ridge** ($F+\frac\lambda2\lVert w\rVert^2$, hệ $(\frac1nX^TX+\lambda I)w=\frac1nX^Ty$):

| $d$ | $\lambda$ | MSE huấn luyện | MSE xác thực | $\mu$ | $L$ | $\kappa$ |
|---|---|---|---|---|---|---|
| 5 | 0,1 | 0,034856 | 0,018885 | 0,10284 | 1,6715 | 16,25 |
| 5 | 0,01 | 0,012287 | 0,002613 | 0,012838 | 1,5815 | 123,2 |
| 5 | 0,001 | 0,001209 | 0,026435 | 0,0038381 | 1,5725 | 409,7 |
| 5 | 0 | 0 | 0,048682 | 0,0028381 | 1,5715 | 553,7 |
| 8 | 0,1 | 0,039360 | 0,029303 | 0,1 | 1,9849 | 19,85 |
| 8 | 0,01 | 0,009104 | 0,007635 | 0,01 | 1,8949 | 189,5 |
| 8 | 0,001 | 0,000549 | 0,051742 | 0,001 | 1,8859 | 1886 |

Kiểm tra $d=5$, $\lambda=0{,}01$: $L=7{,}85744/5+0{,}01=1{,}5815$; $\mu=0{,}0141907/5+0{,}01=0{,}012838$.

**Dừng sớm (KL01).** Hạ gradient trên $F$, $d=5$, $w_0=0$, $\eta=1/L=0{,}63634$, $L=1{,}571488$, $\mu=0{,}0028381$:

| $k$ | $F(w_k)$ | MSE huấn luyện | MSE xác thực |
|---|---|---|---|
| 0 | 0,25 | 0,5 | 0,3125 |
| 1 | 0,063727 | 0,127454 | 0,096847 |
| 10 | 0,016106 | 0,032213 | 0,010729 |
| 50 | 0,009326 | 0,018651 | 0,002001 |
| 79 | 0,007327 | 0,014654 | 0,001084 (nhỏ nhất) |
| 100 | 0,006450 | 0,012900 | 0,001342 |
| 200 | 0,004227 | 0,008453 | 0,004867 |
| 1000 | 0,000234 | 0,000467 | 0,034110 |
| 2509 | $\le10^{-6}$ (lần đầu) | | |
| 10000 | $\approx0$ | $\approx0$ | 0,048682 |

Tỉ số $0{,}048682/0{,}001084=44{,}9$. Với $d=8$, hạ gradient từ $0$ hội tụ tới nghiệm chuẩn nhỏ nhất (MSE xác thực giới hạn $0{,}075928$, trùng bảng trên); xác thực nhỏ nhất $\approx0{,}0016$ quanh bước 50. Mọi cột "MSE xác thực" ở mục này (bảng $d$, họ nghiệm $d=6$, ridge, dừng sớm) tính trên cùng bốn điểm, là tập xác thực theo HQ05; ví dụ thu nhỏ không có tập kiểm thử riêng. Tại $k=2509$, MSE xác thực là $0{,}0476$ (số do cổng storyboard tính). MSE huấn luyện $\le10^{-6}$ lần đầu tại $k=2701$, khi đó MSE xác thực $0{,}0480$ (tính lại khi sửa sau rà soát 2026-10-12).

### 6.2. VD-A2: hồi quy logistic

**VD-A2a (ba điểm).** $u=(-1,0,1)$, $y=(-1,+1,-1)$.

- Đặc trưng $(1,u)$: không tách được (LG06). Đối xứng cho $w_1=0$; $\partial F/\partial w_0=\frac13[2\sigma(w_0)-\sigma(-w_0)]=0$ ⇔ $\sigma(w_0)=\frac13$ ⇔ $w_0=-\log2=-0{,}693147$. $F^*=\frac13[2\log\frac32+\log3]=\frac13\log\frac{27}4=0{,}636514$. Gradient tại đó bằng $0$ (kiểm tra số: $(0,0)$). $S_{ii}=\frac13\cdot\frac23=\frac29$.
- Đặc trưng $(1,u,u^2)$: $X=\begin{pmatrix}1&-1&1\\1&0&0\\1&1&1\end{pmatrix}$ khả nghịch; $X\bar w=y$ cho $w_0=1$ (từ $u=0$), $1\pm w_1+w_2=-1$ cho $w_1=0$, $w_2=-2$. Mọi biên bằng $1$; $F(t\bar w)=\log(1+e^{-t})$: $t=0$: $0{,}693147$; $1$: $0{,}313262$; $2$: $0{,}126928$; $5$: $0{,}006715$; $10$: $4{,}540\cdot10^{-5}$; $20$: $2{,}06\cdot10^{-9}$.
- Dọc tia có chính quy hóa: $F_\lambda(t\bar w)=\log(1+e^{-t})+\frac{5\lambda}2t^2$; $\lambda=0{,}01$: $t^*=2{,}1280$, giá trị $0{,}2257$; $\lambda=0{,}1$: $t^*=0{,}6748$, giá trị $0{,}5255$.
- Cực tiểu thật của $F_\lambda$ trên $\mathbb R^3$ (Newton tới $\lVert\nabla\rVert<10^{-16}$): $X^TX=\begin{pmatrix}3&0&2\\0&2&0\\2&0&2\end{pmatrix}$, trị riêng $\frac{5-\sqrt{17}}2=0{,}43845$, $2$, $\frac{5+\sqrt{17}}2=4{,}56155$.

| $\lambda$ | $w_\lambda$ | $F_\lambda(w_\lambda)$ | $F(w_\lambda)$ | $P(y=+1\mid u=-1,0,1)$ | $L=\frac{4{,}56155}{12}+\lambda$ | $\kappa\le$ | $\lVert w_\lambda\rVert$ | cận $\sqrt{2\log2/\lambda}$ |
|---|---|---|---|---|---|---|---|---|
| 0,1 | $(0{,}1298;\,0;\,-1{,}4288)$ | 0,4738 | 0,3709 | $(0{,}2143;\,0{,}5324;\,0{,}2143)$ | 0,48013 | 4,801 | 1,435 | 3,723 |
| 0,01 | $(1{,}5571;\,0;\,-4{,}2452)$ | 0,2098 | 0,1076 | $(0{,}0637;\,0{,}8259;\,0{,}0637)$ | 0,39013 | 39,01 | 4,522 | 11,774 |

**VD-A2b (đường nghiệm một chiều).** Dữ liệu Bài 01 VD 01.6 dạng trung bình: $F_\lambda(w)=\log(1+e^{-w})+\frac\lambda2w^2$; điều kiện $\lambda w=1/(1+e^w)$; $L=\frac14+\lambda$, $\mu=\lambda$.

| $\lambda$ | $w_\lambda$ | $\lambda w_\lambda=1/(1+e^{w_\lambda})$ | $\sigma(w_\lambda)$ | $F(w_\lambda)$ | $F_\lambda(w_\lambda)$ | $\sqrt{2\log2/\lambda}$ | $\kappa$ |
|---|---|---|---|---|---|---|---|
| 0,5 | 0,6748 | 0,337416 | 0,6626 | 0,4116 | 0,5255 | 1,665 | 1,5 |
| 0,05 | 2,1280 | 0,106402 | 0,8936 | 0,1125 | 0,2257 | 5,266 | 6 |
| 0,005 | 3,9140 | 0,019570 | 0,9804 | 0,0198 | 0,0581 | 16,651 | 51 |
| 0,0005 | 5,8342 | 0,002917 | 0,9971 | 0,0029 | 0,0114 | 52,655 | 501 |

Đối chiếu Bài 01 Tình huống 01.1 (dạng tổng, $\mu=2\lambda$): $w^*_\mu=0{,}6748;\,2{,}1280;\,3{,}9140$ và $L(w^*)=2F(w_\lambda)$: $0{,}8232=2\cdot0{,}4116$.

### 6.3. VD-A3: hạ gradient và Newton trên $F_\lambda$ một chiều

$g(w)=-\sigma(-w)+\lambda w$, $h(w)=\sigma(w)\sigma(-w)+\lambda$, $w_0=0$, $\eta=1/L$, $L=\frac14+\lambda$; dừng khi $e_k\le10^{-8}$.

**$\lambda=0{,}005$ ($\kappa=51$), $w_\lambda=3{,}914$, $F^*=0{,}05806$, $e_0=0{,}63508$.**

| $k$ | Newton $w_k$ | Newton $e_k$ | $g(w_k)$ | $h(w_k)$ | Hạ gradient $w_k$ | Hạ gradient $e_k$ |
|---|---|---|---|---|---|---|
| 0 | 0 | 0,6351 | $-0{,}5$ | 0,255 | 0 | 0,6351 |
| 1 | 1,960784 | $8{,}32\cdot10^{-2}$ | $-0{,}11358$ | 0,113159 | 1,960784 | $8{,}32\cdot10^{-2}$ |
| 2 | 2,964489 | $1{,}42\cdot10^{-2}$ | $-0{,}034234$ | 0,051650 | 2,406189 | $4{,}27\cdot10^{-2}$ |
| 3 | 3,627295 | $1{,}07\cdot10^{-3}$ | $-0{,}0077629$ | 0,030229 | 2,683330 | $2{,}60\cdot10^{-2}$ |
| 4 | 3,884102 | $1{,}09\cdot10^{-5}$ | $-7{,}31\cdot10^{-4}$ | 0,024746 | 2,881556 | $1{,}72\cdot10^{-2}$ |
| 5 | 3,913656 | $1{,}39\cdot10^{-9}$ | | | 3,033184 | $1{,}20\cdot10^{-2}$ |
| 20 | | | | | 3,767362 | $2{,}70\cdot10^{-4}$ |
| 50 | | | | | 3,907038 | $5{,}86\cdot10^{-7}$ |
| 71 | | | | | 3,913139 | $8{,}86\cdot10^{-9}$ |

**Theo $\kappa$:**

| $\lambda$ | $\kappa$ | $w_\lambda$ | $e_0$ | Hạ gradient | $\kappa\log(e_0/10^{-8})$ | Cận nguyên $\lceil\log(e_0/\varepsilon)/\log\frac1{1-1/\kappa}\rceil$ | Newton | $F''_\lambda(w_\lambda)$ | $L/F''_\lambda(w_\lambda)$ |
|---|---|---|---|---|---|---|---|---|---|
| 0,05 | 6 | 2,1280 | 0,46743 | 12 | 105,96 → 106 | 97 | 4 | 0,14508 | 2,068 |
| 0,005 | 51 | 3,9140 | 0,63508 | 71 | 916,30 → 917 | 908 | 5 | 0,024187 | 10,54 |
| 0,0005 | 501 | 5,8342 | 0,68172 | 446 | 9036,8 → 9037 | 9028 | 7 | 0,003409 | 73,49 |

Cột $F''_\lambda(w_\lambda)=\sigma(w_\lambda)\sigma(-w_\lambda)+\lambda$ tính trực tiếp; cột cuối là tỉ số $L/F''_\lambda(w_\lambda)$.

**CP10(a).** $\lambda=0{,}05$: $w_0=0$, $g=-0{,}5$, $h=0{,}3$, $w_1=1{,}666667$; $g(w_1)=-0{,}0755358$, $h(w_1)=0{,}1836297$, $w_2=2{,}078015$; $g(w_2)=-0{,}0073513$, $h(w_2)=0{,}1488751$, $w_3\approx2{,}1274$.

**Hình CP01 (hàm bậc hai minh họa).** $H=R\operatorname{diag}(1,10)R^T$, $R$ xoay $30^\circ$: $H=\begin{pmatrix}3{,}25&-3{,}8971\\-3{,}8971&7{,}75\end{pmatrix}$; $w_0=(6,4)$, $f(w_0)=26{,}969$; hạ gradient $\eta=0{,}1$: $(5{,}609;3{,}238)$, $(5{,}048;2{,}914)$, $(4{,}543;2{,}623)$, $(4{,}089;2{,}361)$, $(3{,}680;2{,}125)$, …, $k=12$: $(1{,}760;1{,}016)$; $f$: $k=10$: $3{,}148$; $k=20$: $0{,}383$; $k=50$: $6{,}9\cdot10^{-4}$. Newton: $(0,0)$ sau một bước.

### 6.4. Chi phí và tổ hợp

| $(n,d)$ | $nd$ | $nd^2$ | $d^3$ | $8d^2$ byte | $d+d^2/n$ |
|---|---|---|---|---|---|
| $(10^3,10^2)$ | $10^5$ | $10^7$ | $10^6$ | $8\cdot10^4$ | 110 |
| $(10^5,10^3)$ | $10^8$ | $10^{11}$ | $10^9$ | $8\cdot10^6$ | 1010 |
| $(781\,265;\,47\,152)$ | $3{,}6838\cdot10^{10}$ | $1{,}7370\cdot10^{15}$ | $1{,}0483\cdot10^{14}$ | $1{,}7786\cdot10^{10}$ | $47\,152+2845{,}8=49\,998$ |

Ngưỡng hòa vốn CP08: $n=10^5$, $d=10^3$, $\log10^8=18{,}4207$; Newton $10\cdot(10^{11}+10^9)=1{,}01\cdot10^{12}$; hạ gradient $18{,}4207\cdot10^8\cdot\kappa=1{,}842\cdot10^9\kappa$; hòa vốn $\kappa=548{,}3$. Với $\lVert x_i\rVert^2\le r^2=2$ (sửa sau cổng storyboard; bản kế hoạch dùng $\lVert x_i\rVert\le1$, mâu thuẫn với tọa độ hằng $1$): $\lambda=10^{-3}$: $\kappa\le1+\frac{2}{0{,}004}=501$, $1{,}842\cdot10^9\cdot501\approx9{,}23\cdot10^{11}$; $\lambda=10^{-5}$: $\kappa\le1+\frac2{4\cdot10^{-5}}=50\,001$, $1{,}842\cdot10^9\cdot50\,001\approx9{,}21\cdot10^{13}$.

LG11(c): $r^2=2$, $\lambda=0{,}02$: $L\le\frac24+0{,}02=0{,}52$, $\kappa\le\frac{0{,}52}{0{,}02}=26$; $\lVert w_\lambda\rVert\le\sqrt{2\log2/0{,}02}=\sqrt{69{,}31}\approx8{,}33$.

CP10(b): $1000\cdot18{,}42\cdot10^{10}=1{,}842\cdot10^{14}$ so với $10\cdot(10^{14}+10^{12})=1{,}01\cdot10^{15}$; Hessian $8\cdot10^8$ byte. CP10(c): $n^2d+n^3=10^{13}+10^{12}=1{,}1\cdot10^{13}$; $nd^2+d^3=10^{14}+10^{15}=1{,}1\cdot10^{15}$.

KL03, XOR (trên mặt trang chỉ phát biểu và đẳng thức; chứng minh đầy đủ thuộc B02 của Bài 06): với $g(u)=w_0+w_1u_1+w_2u_2$, $g(1,0)+g(0,1)=(w_0+w_1)+(w_0+w_2)=2w_0+w_1+w_2$ và $g(0,0)+g(1,1)=w_0+(w_0+w_1+w_2)=2w_0+w_1+w_2$. Phân loại đúng đòi $g(1,0)>0$, $g(0,1)>0$ nên vế trái dương, và $g(0,0)<0$, $g(1,1)<0$ nên vế phải âm; mâu thuẫn. Với đặc trưng $(1,u_1,u_2,u_1u_2)$ và $\bar w=(-\tfrac12,1,1,-2)$: $(0,0)\mapsto-\tfrac12$, $(1,0)\mapsto\tfrac12$, $(0,1)\mapsto\tfrac12$, $(1,1)\mapsto-\tfrac12+1+1-2=-\tfrac12$; nhân với nhãn, mọi biên bằng $\tfrac12$.

KL03, số đơn thức: $\binom{102}2=5151$, $\binom{103}3=176\,851$.

KL05: $n=200$, $d=500$: $n^2d+n^3=2\cdot10^7+8\cdot10^6=2{,}8\cdot10^7$.

## Danh sách hình SVG

Mọi hình đặt tại `2627-1/img/lec-05/` với tiền tố `hq-`, `lg-`, `cp-`, `kl-` để không đè tệp của deck hiện hành (D2). Mỗi hình có nhãn trục, chú giải, `alt`; dữ liệu tính từ mục Ví dụ số, không vẽ tay ước lượng.

| Tệp | Nội dung | Dữ liệu | Trang |
|---|---|---|---|
| `hq-data-points.svg` | Năm điểm huấn luyện, bốn điểm ngoài mẫu (rỗng; chú giải "điểm ngoài mẫu" từ sau rà soát 2026-10-12), đường đúng $y=u$ | 6.1 | HQ01 |
| `hq-fits-d2-d5.svg` | Hai đường khớp: $0{,}98u$ và $p(u)$ bậc 4 trên $[-1{,}1;\,1{,}1]$, cùng các điểm | Hệ số 6.1 | HQ03, HQ06 |
| `hq-errors-vs-d.svg` | MSE huấn luyện và xác thực theo $d=1..5$, trục tung logarit | Bảng 6.1 | HQ04 |
| `hq-level-sets-kappa.svg` | Đường mức của hai hàm bậc hai với $\kappa=2$ và $\kappa=50$, tỉ lệ bán trục $\sqrt\kappa$ | Tham số cho trước | HQ08 |
| `lg-three-points.svg` | Ba điểm trên trục $u$ với nhãn; đường điểm số $1-2u^2$, hai nghiệm $\pm1/\sqrt2$ | 6.2 | LG01 |
| `lg-loss-along-ray.svg` | $\log(1+e^{-t})$ với $t\in[0,10]$, đánh dấu $t=0,1,5,10$, mức $\inf F=0$ | 6.2 | LG03 |
| `lg-penalty-along-ray.svg` (thêm khi dựng deck) | $\log(1+e^{-t})$, cộng $0{,}025t^2$ ($\lambda=0{,}01$) và cộng $0{,}25t^2$ ($\lambda=0{,}1$) với $t\in[0,6]$, đánh dấu $t^*=2{,}128$, $0{,}6748$ | 6.2 | LG07 |
| `lg-curvature-1d.svg` (thêm khi dựng deck) | $\sigma(w)\sigma(-w)+\lambda$, $\lambda=0{,}05$, $w\in[-8,8]$, hai mức $L$ và $\mu$ | 6.2 (VD-A2b) | LG09 |
| `cp-gd-newton-paths.svg` | Đường mức hàm bậc hai minh họa, 12 bước hạ gradient, một bước Newton | 6.3 | CP01 |
| `cp-error-vs-iteration.svg` | $e_k$ theo $k$ (trục tung logarit) cho Newton và hạ gradient, $\lambda=0{,}005$ | 6.3 | CP02 |
| `kl-early-stopping.svg` | MSE huấn luyện và xác thực theo $k$ (trục hoành logarit $1..10^4$), đánh dấu $k=79$ | 6.1 | KL01 |

Bảng, công thức và giả mã dựng bằng HTML/KaTeX, không làm hình.

## Nguồn đã tham khảo

Chỉ lấy thứ tự trình bày và cách tạo động cơ; không dịch, không chép đoạn văn. Mọi dữ liệu ví dụ tự xây dựng, trừ số liệu RCV1 lấy từ SNW Bảng 13.3.

| Nguồn | Vị trí đã đọc | Lấy gì |
|---|---|---|
| Đề cương `sources/đề cương-cơ sở toán học của AI-v2.docx` | Buổi 5, Buổi 6 (LLO11–LLO16), bảng CLO | Phạm vi, LLO, CLO, 2 LT + 1 BT |
| Boyd, Vandenberghe (2004), `sources/bv_cvxbook.pdf` | §6.3.1–6.3.2 (tr. 305–307); §7.1.1 hồi quy logistic (tr. 354–355); §9.1.2 (tr. 459–461); §9.3.1 (tr. 466–468); §9.5.1 bất biến affine (tr. 486); §9.5.3 (tr. 488–490); §9.7.1–9.7.2 (tr. 509–512) | Chính quy hóa như vô hướng hóa song tiêu chí; mô hình logistic; số điều kiện tập mức dưới; cận số bước hạ gradient và Newton hai giai đoạn; chi phí $(1/3)n^3$ và cấu trúc đường chéo cộng hạng thấp |
| Goodfellow, Bengio, Courville (2016), `sources/Deep Learning … (z-lib.org).pdf` | §5.2 (tr. 110–117, hình 5.2 tr. 112); §5.2.2 (tr. 118); §5.7.1 (tr. 140); §7.1.1 (tr. 231); §7.3 (tr. 239–240); §7.8 (tr. 246–250); §8.1 (tr. 275–277); §8.2.1 | Thứ tự dung lượng → quá khớp → chính quy hóa; $X^TX$ suy biến khi $d>n$ và logistic trên dữ liệu tách được (§7.3) là động cơ trực tiếp nối A1 với A2; dừng sớm; rủi ro và đại lượng thay thế |
| Sra, Nowozin, Wright (2011), ch. 13 Bottou, Bousquet, "The Tradeoffs of Large-Scale Learning" (`sources/(Neural Information Processing series) …pdf`; bản `MIT-Optimization-for-Machine-Learning.2012.pdf` có cùng chương) | §13.1–13.2 (tr. 351–354); §13.3 Bảng 13.2 (tr. 360–362); §13.4.1 Bảng 13.3 (tr. 363) | Đánh đổi xấp xỉ–ước lượng–tối ưu (luận đề); bảng chi phí GD/2GD/SGD; số liệu RCV1 |
| Giáo trình *Học máy thống kê* của người dùng (`../SML-textbook-main.zip`, giải nén vào thư mục nháp riêng) | `chapters/05_regression/sec_linear_regression.tex`; `chapters/01_classification/sec_logistic_regression.tex` (mục mô hình, hợp lý cực đại, thuật toán huấn luyện) | Thứ tự: mô hình → lỗi trên tập huấn luyện → phương trình chuẩn → chi phí nghịch đảo $X^TX$ khi số chiều lớn → hạ gradient với điều kiện bước theo $\lambda_{\max}$. Không chạy mã nào trong gói |
| Bài 01 (`planning/lec-01/outline.md`, `materials/lec-01/lecture-note.md`) | MĐ 01.5, 01.6, 01.9, 01.45, 01.46; VD 01.6, 01.7; HQ 01.41; ĐN 01.42; Tình huống 01.1 | Kết quả dùng lại, số liệu đối chiếu |
| Bài 02 (`planning/lec-02/outline.md`, `materials/lec-02/lecture-note.md`) | Phần 3; MĐ 02.21 | Ridge, nghiệm duy nhất |
| Bài 04 (`planning/lec-04/outline.md` §1, §5.3, §5.7, ghi chép 2026-10-01; deck RG17, RN07) | | Hạ gradient, Newton, hội tụ tuyến tính, hội tụ bậc hai |
| Bài 05b (`planning/lec-05b/outline.md`) | Ký hiệu, Giả thiết có tên, Khung lý thuyết chung, Sổ định lý | H2, H3, T2a, T2b; quy tắc chuyển ký hiệu |
| Bài 05c (`planning/lec-05c/outline.md`) | Khung lý thuyết chung, Ký hiệu | Trung bình mẫu, tập kiểm thử ước lượng $R$; $N$, $b$ |

Nocedal–Wright không có trong `sources/`; dàn bài không cần đến. Không dùng nguồn MIT OCW bổ sung.

## Kết quả dùng lại

Cột "Nhãn trên trang" là nhãn hiển thị trên mặt trang; mã KQ chỉ dùng trong kế hoạch.

| Mã | Nhãn trên trang | Kết quả | Nơi có sẵn | Cách dùng trong Bài 05 | Trang |
|---|---|---|---|---|---|
| KQ1 | "Nhắc lại (Bài 01, Mệnh đề 01.6)" | Bình phương nhỏ nhất luôn có nghiệm; duy nhất ⇔ $\operatorname{rank}X=d$; tập nghiệm $w^*+\ker X$ | Bài 01 Mệnh đề 01.6, 01.45 | Phát biểu lại | HQ02, HQ07 |
| KQ2 | Mệnh đề 1 | $\operatorname{rank}X=n$ ⇒ nội suy, $\dim$ tập nghiệm $=d-n$ | Mới | Chứng minh trên trang | HQ07 |
| KQ3 | Định nghĩa và nhận xét, không đánh số | $\kappa_F=\kappa(X^TX)$ với $F=\frac1{2n}\lVert Xw-y\rVert^2$; cận độ nhạy; $\kappa(X^TX)$ không giảm khi thêm đặc trưng lồng nhau (xen kẽ Cauchy) | Mới (tính trực tiếp); định lý xen kẽ Cauchy | Chứng minh một dòng | HQ09 |
| KQ4 | Mệnh đề 2 | $\operatorname{rank}X=n$ ⇒ mọi nhãn tách được | Mới | Chứng minh trên trang | LG04 |
| KQ5 | Định lý 1 | Tách được ⇒ $\inf F=0$ không đạt; dãy cực tiểu hóa phân kỳ | Bài 01 VD 01.6 (trường hợp $d=1$) | Chứng minh tổng quát trên trang | LG05; ứng dụng ở LG10 |
| KQ6 | Mệnh đề 3 | Không tách được chặt ⇒ $F$ cưỡng bức, có cực tiểu | Bài 01 Định lý 01.38 (công cụ) | Phác chứng minh trên trang | LG06 |
| KQ7a | Định lý 2 | $F_\lambda$ lồi mạnh hằng số $\lambda$, nghiệm duy nhất, $\lVert w_\lambda\rVert\le\sqrt{2F(0)/\lambda}$, với mất mát logistic $\sqrt{2\log2/\lambda}$ | Bài 01 Hệ quả 01.41, Định nghĩa 01.42, Mệnh đề 01.46(b) | Phát biểu lại; cận $\lVert w_\lambda\rVert$ chứng minh mới | LG08 |
| KQ7b | Mệnh đề 4 | $L=\lambda_{\max}(X^TX)/(4n)+\lambda$, $\kappa\le1+\lambda_{\max}/(4n\lambda)$; nếu $\lVert x_i\rVert\le r$ thì $L\le r^2/4+\lambda$, $\kappa\le1+r^2/(4\lambda)$ ($r\ge1$ vì có tọa độ hằng) | Mới | Chứng minh trên trang | LG09 |
| KQ8 | Định lý 3 (Bài 05b, T2b) | Hạ gradient bước $1/L$: $e_k\le(1-1/\kappa)^ke_0$ | Bài 05b T2b (C05–C06); Bài 04 RG17 | Phát biểu lại, trích dẫn | CP04, LG09 |
| KQ9 | Định lý 4 | Newton hai giai đoạn, $\log_2\log_2(\varepsilon_0/\varepsilon)$ | Bài 04 RN07; Boyd §9.5.3 | Phát biểu lại, trích dẫn | CP05 |
| KQ10 | Mệnh đề 5 | Chi phí một bước $O(nd)$, $O(nd^2+d^3)$; trường hợp $d>n$ | Mới (đếm); Boyd §9.7 | Suy ra trên trang | CP06–CP07 |
| KQ11 | không lên trang | Tách được ⇒ $\lVert w_\lambda\rVert\to\infty$ khi $\lambda\to0$ | Mới | Bài tập về nhà | ghi chú LG08 |
| KQ12 | "Nhắc lại (Bài 02, Mệnh đề 02.21(c))" | Ridge có nghiệm duy nhất với mọi $d$ | Bài 02 Mệnh đề 02.21 | Phát biểu lại | HQ10 |
| — | không đánh số | Trung bình mẫu ước lượng không chệch kỳ vọng | Bài 05c §E | Trích dẫn | HQ05 |
| — | T5, T6, T7, T8 (Bài 05b) | SGD lồi mạnh: bước hằng tới lân cận với $\mathbb E\lVert w_k-w^*\rVert^2$ có bậc $\eta\tau^2/\mu$ (T5), bước giảm dần tới cực tiểu (T6); điểm dừng xấp xỉ (T7, T8, có mức nhiễu nền) | Bài 05b | Chỉ nêu tên | KL04 |

## Rủi ro và điểm cần người dùng quyết

### Quyết định cần người dùng

| Mã | Nội dung | Phương án đang dùng trong dàn bài | Trạng thái |
|---|---|---|---|
| D1 | Phụ đề. Phụ đề gốc "From convex regression to the limits of deterministic optimization" dịch sát sẽ thành dạng "Từ … đến …", bị quy tắc tiêu đề cấm | "Hồi quy lồi và giới hạn của tối ưu tất định", tạm dùng theo điểm hòa giải 7 | mở |
| D2 | Deck và học liệu Bài 05 cũ (từ ngày 2026-10-12 là `lecture-06b-toi-uu-bac-nhat-cho-hoc-may.html`, `materials/lec-06b/`, `img/lec-06b/`) đang được `index.html` liên kết. Phương án: (a) đổi tên thành bài bổ trợ (ví dụ "06b") và giữ để phủ LLO12–LLO13; (b) lưu trữ, gỡ khỏi chỉ mục; (c) xóa | Kế hoạch đề xuất (a), cùng với deck Bài 06 hiện hành cho LLO14–LLO16; hình mới đặt vào `img/lec-05/` với tiền tố `hq-`, `lg-`, `cp-`, `kl-`. Vòng này không đụng tới deck và học liệu hiện hành (điểm hòa giải 9) | mở |
| D3 | LLO không được phủ (mục Nội dung đề cương không còn) | Điều phối viên trình bảng cho người dùng | mở |
| D4 | Ký hiệu hệ số chặn | Gộp hệ số chặn vào $w$; không dùng $b$ (điểm hòa giải 1, đã thống nhất với Bài 06) | mở, chờ người dùng xác nhận |
| D5 | "Hạ gradient" hay "giảm gradient" (Bài 04 và deck Bài 06 cũ viết "giảm gradient"; Bài 05 cũ, 05b, 05c viết "hạ gradient") | "hạ gradient" ở cả hai bài (điểm hòa giải 6) | mở, chờ người dùng xác nhận |

### Rủi ro nội dung

| Mã | Rủi ro | Cách xử lý trong dàn bài | Trạng thái |
|---|---|---|---|
| R1 | Phát biểu về Newton và $\kappa$. Chỉ số bước của giai đoạn bậc hai, $\log_2\log_2(\varepsilon_0/\varepsilon)$, không chứa $\kappa$; $\varepsilon_0=2m^3/L_H^2$ và giai đoạn tắt dần phụ thuộc $m,M,L_H$ | CP05 dùng cách phát biểu này; Bài 06 dùng cùng câu (điểm hòa giải 2) | mở |
| R2 | Công thức chi phí Newton $O(nd^2+d^3)$ chỉ đúng với ma trận dày đặc và $n\ge d$ | CP07 nêu đủ ba trường hợp: $d>n$ dùng $O(n^2d+n^3)$; dữ liệu thưa thay $nd$ bằng số phần tử khác $0$ | mở |
| R3 | Số liệu RCV1: TRON là Newton miền tin cậy với gradient liên hợp, không phải Newton thuần; phần cứng khoảng năm 2008–2011 | KL02 dùng để so bậc, có chú thích | mở |
| R4 | Ví dụ năm điểm chỉ cho kết luận định tính; mức tăng $\kappa$ phụ thuộc cơ sở đơn thức (chiều tăng thì chung, theo xen kẽ Cauchy) | Ghi chú HQ09 nêu giới hạn này | mở |
| R5 | Cận số bước bi quan: $\kappa\log(e_0/\varepsilon)$ lớn hơn số bước thực 9–20 lần trên ví dụ | CP03, CP08 nêu rõ để tránh kết luận sai rằng Newton luôn rẻ hơn khi $\kappa$ vượt ngưỡng tính từ cận | mở |
| R6 | Trùng lặp với Bài 01 (VD 01.6, 01.7, Tình huống 01.1, HQ 01.41) | LG chỉ phát biểu lại các kết quả này; phần mới là trường hợp $d$ tổng quát, nối với chế độ nội suy, và cận $L$, $\kappa$ | mở |
| R7 | Quá tải trang: khối 1 có 16 trang (gồm tiêu đề, mục tiêu; HQ08 đã tách thành hai trang), khối 3 có 16 trang (gồm 5 trang kết luận) | Nếu kiểm tra thời lượng cho thấy quá tải, cắt theo thứ tự: chuyển cận độ nhạy của HQ09 vào ghi chú; gộp KL02 vào ghi chú KL01; chuyển CP10(c) sang bài tập về nhà | mở |
| R8 | Trang dày công thức: LG05, LG09, LG10, CP05 có định lý kèm chứng minh, ví dụ hoặc ánh xạ ký hiệu, có nguy cơ vượt khung 16:9 | Người soạn deck tách chứng minh LG05 sang trang kế nếu cần (45 trang, vẫn trong khoảng 36–45); ở LG10 chuyển dòng $\lambda=0$ hoặc dòng $X^TX$ xuống ghi chú trước khi tách trang; ghi vào storyboard | mở |

### Giai đoạn triển khai tiếp theo

1. Hỏi người dùng D1–D5.
2. Cổng storyboard (chỉ đọc) trên `outline.md` và `storyboard.md` này; tác tử toán tính lại mục Ví dụ số bằng mã riêng (chỉ đọc, chạy song song với cổng).
3. Soạn deck và SVG (một tác tử ghi); kiểm tra hình ở 1600×900 và 390×844. Đã làm ngày 2026-10-12 (mười một SVG).
4. Năm vai rà soát độc lập (song song, chỉ đọc); chỉnh sửa; tái kiểm; kiểm định cuối.
5. Ghi chú bài giảng và bài tập viết lại sau khi deck ổn định.

## Cập nhật 2026-10-12: trang tiêu đề mạch và trần mật độ

Đợt sửa theo AGENTS.md (mục "Trang tiêu đề mạch", "Văn phong và mật độ mặt trang chiếu") đổi cấu trúc trang như sau; mặt trang hiện hành của các trang tách nằm trong deck, còn đặc tả của mục "Dàn bài từng trang" ở trên giữ cho trang gốc. Lý do và số âm tiết trước/sau ghi ở storyboard (dòng "Sửa 2026-10-12" của từng trang), nhật ký ở review-log.

| Mạch | Trang tiêu đề | Trang theo thứ tự |
|---|---|---|
| 1. Bài toán trung tâm và khung chung | MD01 (bìa) | MD01, MD02, MD03a "Nội dung", MD03b "Ngữ cảnh", MD03c "Chi phí tính toán và đích của tối ưu", MD04 "Ký hiệu chung" |
| 2. Hồi quy nhiều chiều | HQ00 | HQ00, HQ01–HQ05, HQ05a, HQ06, HQ07, HQ07a, HQ08–HQ11, HQ11a, HQ12 |
| 3. Hồi quy logistic và chính quy hóa | LG00 | LG00, LG01–LG05, LG05a, LG06–LG08, LG08a, LG09–LG11, LG11a, LG12 |
| 4. Độ cong và chi phí tính toán | CP00 | CP00, CP01–CP05, CP05a, CP06, CP06a, CP07, CP07a, CP08, CP08a, CP09, CP10, CP10a, CP11 |
| 5. Giới hạn của tối ưu tất định | KL00 | KL00, KL01, KL01a, KL02, KL03, KL03a, KL04, KL04a, KL05, KL05a, KL05b, KL05c |

Thay đổi nội dung so với đặc tả trang gốc:

- MD03 tách ba trang; danh sách ba phần A–C thay bằng trang "Nội dung" đánh số 1–5. MD04 đổi tiêu đề thành "Ký hiệu chung"; dòng $w_k$ xuống ghi chú.
- HQ04 chỉ giữ hàng ngoài mẫu trong bảng (hàng huấn luyện ở HQ03 và trên hình). HQ11, LG11, CP10 đổi tiêu đề thành "Bài tập: …" trùng tên Bài tập 1, 4, 8 của `materials/lec-05/exercises.md`; lời giải mẫu trên mặt trang ở HQ11a, LG11a, CP10a.
- LG10 đổi tiêu đề thành "Ví dụ: ba điểm có chính quy hóa"; LG08 tách ví dụ một mẫu sang LG08a; LG05 tách chứng minh sang LG05a.
- CP02 bỏ hàng $k=0$ của bảng ($e_0=0{,}635$ nêu ở dòng dữ kiện). CP05 tách nhận xét bất biến affine sang CP05a, trang này mang nhu cầu của KN8; ánh xạ ký hiệu Boyd–Vandenberghe xuống ghi chú.
- KL04 bỏ công thức khỏi bảng; bốn công thức chuyển sang KL04a kèm số hiệu Định lý 05b.36, 05b.39, 05b.41, 05b.43 thay cho T5–T8. KL05 tách thành hai bảng tổng kết "kết quả | giả thiết không được bỏ | công thức", một trang bài tập tự kiểm tra và một trang tài liệu đọc và bài tập về nhà.
- Vòng 2 (sau tái kiểm toán và mạch kể): MD04 chỉ giữ ký hiệu dùng ngay ở mạch 2 ($F$, $R$, $F_\lambda$, $L$, $\mu$, $\kappa$ và năm giả thiết xuống ghi chú); CP04 đứng trước CP03 trên deck (mã giữ nguyên); KL03 nêu (ii) bằng bài toán XOR và hệ quả "đặc trưng học được làm mục tiêu không lồi", KL04 dùng nhãn (ii) cùng nghĩa; KL04a ghi giả thiết trơn, chặn dưới và điều kiện bước của từng bảo đảm; KL05, KL05a ghi loại mất mát và đủ hai giai đoạn của cận Newton; LG12 một câu kết luận về $\lambda$ và cận $\kappa$.
- Mã T2b, T5–T8, H2, H3 không còn trên mặt trang và trong ghi chú; dùng Định lý 05b.18(b), 05b.36, 05b.39, 05b.41, 05b.43, Hệ quả 05b.17.
