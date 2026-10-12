# Dàn bài Bài 06 — Mở rộng mô hình và dữ liệu

Kế hoạch nội bộ lập ngày 2026-10-11 từ kế hoạch đã được điều phối viên duyệt (`plan-lec-06.md` trong thư mục nháp của phiên) và mười điểm hòa giải với kế hoạch Bài 05. Vai trò của từng trang, bản đồ hành trình khái niệm và quyết định theo trang nằm trong [storyboard.md](storyboard.md); nhật ký duyệt nằm trong `review-log.md`, mục “Vòng lập lại kế hoạch theo Lecture B (2026-10-11)”. Mã trang, thời lượng và nhãn quy trình chỉ dùng trong kế hoạch, không đưa lên mặt trang hay vào ghi chú diễn giả.

## 1. Phạm vi và quyết định thiết kế

Ngày 2026-10-11, người dùng thiết kế lại Bài 05 và Bài 06 thành hai bài nối tiếp. Bài 05 nhận thiết kế Lecture A (*Scaling the Feature Space*); Bài 06 nhận thiết kế Lecture B (*Scaling Models and Data*, 150 phút). Lecture B gồm ba khối, mỗi khối có một câu hỏi trung tâm. Kế hoạch chuyển mỗi câu hỏi thành nhu cầu của mạch tương ứng; câu hỏi không trở thành tiêu đề trang.

| Khối | Chủ đề | Câu hỏi trung tâm (người dùng) | Nhu cầu trong kế hoạch | Mạch | Thời lượng |
|---|---|---|---|---|---|
| B1 | XOR và mạng hai tầng | “Why is linear prediction insufficient?” | Dự đoán tuyến tính theo đặc trưng có giới hạn biểu diễn; cần mô hình có đặc trưng học được và biết chi phí của nó | A, B | 1,00 tiết |
| B2 | Lan truyền ngược và tính không lồi | “What can gradients certify now?” | Tính $\nabla F(\theta)\in\mathbb R^p$ với chi phí cùng bậc truyền xuôi; xác định điều mà gradient bằng 0 hoặc gradient nhỏ chứng nhận khi $F$ không lồi | C, D | 1,00 tiết |
| B3 | SGD nhóm nhỏ | “What convergence rate remains when gradients are noisy?” | Tốc độ hội tụ còn lại khi gradient đầy đủ được thay bằng ước lượng ngẫu nhiên, và lý do tốc độ đó đủ dưới ngân sách tính toán cố định với mục tiêu thay thế | E, F, G | 1,00 tiết |

| Mục | Nội dung |
|---|---|
| Tên bài | **Mở rộng mô hình và dữ liệu** |
| Phụ đề trên trang tiêu đề | Tạm dùng cụm danh từ “Khả năng biểu diễn của mạng nơ ron và tối ưu ngẫu nhiên”. Phụ đề gốc (“From neural-network expressiveness to stochastic optimization”) có dạng “Từ … đến …”, trái quy tắc tiêu đề của CLAUDE.md. Chờ người dùng xác nhận (Q1; điểm hòa giải 7) |
| Tệp deck đề xuất | `2627-1/lecture-06-mo-rong-mo-hinh-va-du-lieu.html`; hình mới ở `2627-1/img/lec-06/`; kế hoạch ở `2627-1/planning/lec-06/` |
| Đối tượng | Sinh viên năm ba đã học Bài 00–04 và Bài 05 mới; Bài 05b, 05c là học liệu bổ trợ được dẫn |
| Thời lượng | Buổi 6 theo đề cương: 2 tiết lý thuyết + 1 tiết bài tập = 3 tiết, chia ba khối B1, B2, B3, mỗi khối 1,00 tiết. Mạch mở đầu A tính vào khối B1; mạch kết luận G tính vào khối B3 |
| Quy mô | **45 trang, 7 mạch** (A 4, B 10, C 7, D 7, E 6, F 8, G 3). Khối B1 = A + B = 14 trang; B2 = C + D = 14 trang; B3 = E + F + G = 17 trang. Bản đầu có 43 trang; kiểm định storyboard 2026-10-11 tách F02 và F05 cũ, chuyển câu hỏi của G02 sang G03 (mục 1.5) |
| Tiên quyết dùng ngay | Quy tắc dây chuyền dạng Jacobian chuyển vị (Bài 00); hàm lồi, điểm dừng của hàm lồi là cực tiểu toàn cục (Bài 01–02); hạ gradient, gradient $L$-Lipschitz, bổ đề giảm, Newton và chi phí giải hệ (Bài 04); kết luận Bài 05 (mục 1.2) |

### 1.1. Luận đề xuyên suốt

Chỉ dẫn người dùng ngày 2026-10-11 áp dụng cho cả Bài 05 và Bài 06. Bài 01–04 làm việc với một bức tranh gọn: mục tiêu lồi có nghiệm chính xác, phương pháp tất định có bảo đảm hội tụ tới nghiệm đó. Khi mô hình và dữ liệu lớn, bức tranh này không còn phù hợp vì hai lý do. Bài 06 nêu hai lý do ở A03, dùng lại ở E01–E02 và F05, khép lại ở G01.

- **Lý do tính toán.** Một gradient đầy đủ tốn $O(np)$ phép nhân–cộng, một bước Newton tốn $O(np^2+p^3)$. Với $n,p$ lớn, ngay một bước như vậy cho mỗi lần cập nhật đã vượt ngân sách; SGD nhóm nhỏ là phương pháp còn lại khi ngân sách mỗi bước cố định. Nhiễu và tốc độ chậm hơn là chi phí phải trả, không phải mục tiêu thiết kế.
- **Lý do thống kê.** Rủi ro thực nghiệm $F$ là đại lượng thay thế cho rủi ro kỳ vọng $R$. Tại $\theta$ cố định, $F$ lệch $R$ cỡ $1/\sqrt n$ (Định lý 05c.52 của Bài 05c); theo phân tích của Bottou–Bousquet cho bài toán lồi, giảm sai số tối ưu dưới bậc của sai số ước lượng không làm thay đổi bậc của cận sai số dư. Vì vậy giảm $F$ tới cực tiểu chính xác không cần thiết, và có thể không mong muốn (Bài 05, khối A1: khớp kém dần trên dữ liệu mới khi $d$ tăng; khối A2: trên dữ liệu tách được, cực tiểu không tồn tại nếu không chính quy hóa). Dừng sớm và chính quy hóa là một phần của phương pháp.

Trên mặt trang A03, hai lý do gắn với nhãn dòng của bảng đối chiếu: lý do thống kê là dòng **Đích**, lý do tính toán là dòng **Chi phí** (giới hạn (i)); dòng **Biểu diễn** là giới hạn (ii). E01, E02 dùng lại hai nhãn này.

Hệ quả cho trình bày: SGD được trình bày là phương án bị buộc bởi chi phí và đủ cho mục tiêu thay thế, không phải phương pháp “nhanh hơn”. Mở đầu (A03) và kết luận (G01) dùng cùng dạng đối chiếu: mất tính chính xác, bảo đảm tất định và gradient đầy đủ; giữ tính giảm mỗi bước của hạ gradient đầy đủ (bổ đề giảm), bất đẳng thức một bước của SGD $\mathbb E[F(\theta_{k+1})\mid\theta_k]\le F(\theta_k)-\eta\big(1-\tfrac{L\eta}2\big)\lVert\nabla F(\theta_k)\rVert^2+\tfrac{L\eta^2}2\sigma^2$ (có số hạng nhiễu, nên SGD không giảm theo kỳ vọng ở mọi bước; phản ví dụ $\tfrac{69}{128}>\tfrac12$ ở F01), bảo đảm điểm dừng và tốc độ theo kỳ vọng (T5, T6, T8). Phạm vi của luận đề: luận điểm “tốc độ của SGD là đủ” dựa trên lập luận đại lượng thay thế (E02), không phải hệ quả của T8; với mạng, mức chính xác đủ dùng được quyết định bằng tập xác thực (F06).

### 1.2. Giao diện với Bài 05

Đầu vào của Bài 06 là đầu ra của mạch kết luận Bài 05 (mã KL trong kế hoạch Bài 05):

- Giới hạn (i): mọi phương pháp của Bài 05 trả chi phí của toàn bộ $n$ mẫu ở mỗi bước; khối A3 so sánh $O(nd)$ của một bước hạ gradient với $O(nd^2+d^3)$ của một bước Newton.
- Giới hạn (ii): dự đoán tuyến tính theo đặc trưng không biểu diễn được một số hàm đích, XOR là trường hợp điển hình; mở rộng đặc trưng thủ công làm $d$ tăng, với các hệ quả khối A1 đã chỉ ra.
- Kết quả được dẫn: khớp quá khi $d$ tăng và rủi ro kiểm thử (A1); chính quy hóa $\ell_2$ cho lồi mạnh và nghiệm duy nhất (A2); chi phí và số bước của hạ gradient và Newton theo $(n,d,\kappa,\varepsilon)$ (A3); tập xác thực và tập kiểm thử được định nghĩa ở HQ05 của Bài 05.

Quy ước gọi tên trong tệp này: “Bài 05” là bài mới theo Lecture A, đang được lập kế hoạch song song trong `planning/lec-05/`. A1, A2, A3 (một chữ số) là ba khối của Bài 05; A01–A04 (hai chữ số) là mã trang của Bài 06. Mã trang của Bài 05 là MD, HQ, LG, CP, KL.

Ký hiệu hệ số chặn (điểm hòa giải 1): Bài 05 gộp hệ số chặn vào $w$ qua tọa độ hằng 1 của $x_i$, nên ở đó $\theta=w\in\mathbb R^d$. Bài 06 viết hệ số chặn của mô hình tuyến tính riêng là $c$ (B01, E03), nên $p=d+1$; độ lệch của mạng luôn có chỉ số ($b_1,b_2$); $b$ không chỉ số là kích thước nhóm, như Bài 05b, 05c. A04 ghi một câu ánh xạ hai quy ước.

### 1.3. Tệp lưu trữ và trạng thái

- `outline.old-2026-10-02.md` và `storyboard.old-2026-10-02.md` (đổi tên bằng `git mv` ngày 2026-10-11) là kế hoạch của deck Bài 06 cũ, từ ngày 2026-10-12 là Bài 06c (bổ trợ) `lecture-06c-toi-uu-mang-sau.html` (“Các phương pháp tối ưu trong học sâu”, 45 trang, 7 mạch); hai tệp nay là `planning/lec-06c/outline.md` và `storyboard.md`. Hai tệp được giữ để truy nguyên và làm đầu vào cho quyết định về bài bổ trợ (Q2).
- `review-log.md` giữ nguyên; vòng lập lại kế hoạch được nối vào cuối tệp. `review-log-lecture-note.md` giữ nguyên.
- Deck Bài 06 đã được dựng theo kế hoạch này ngày 2026-10-12 (mục 1.6, 1.7); ghi chú bài giảng và bài tập Bài 06 chưa được dựng. Deck cũ và học liệu cũ (từ ngày 2026-10-12 là `lecture-06c-toi-uu-mang-sau.html` và `materials/lec-06c/`) vẫn được `index.html` liên kết và không bị sửa trong vòng này (điểm hòa giải 9).

### 1.4. Điều chỉnh so với kế hoạch đã duyệt

Các thay đổi dưới đây áp dụng mười điểm hòa giải của điều phối viên hoặc thống nhất cách gọi trong kho. Nội dung toán học và số liệu của kế hoạch giữ nguyên; số mới duy nhất là phép kiểm tra với mất mát logistic trong ghi chú B07 ($\approx0{,}503$ và $\log2\approx0{,}693$), cần tác tử rà toán kiểm lại. Cách ánh xạ bước hành trình của KN1 và KN3 được làm rõ trong storyboard.md để thứ tự sáu bước không bị đảo.

- A04: thêm câu ánh xạ quy ước hệ số chặn của Bài 05 (điểm 1).
- A03, E01, G02: phát biểu về Newton theo Bài 05 CP05: chỉ giai đoạn hội tụ bậc hai, $\log_2\log_2(\varepsilon_0/\varepsilon)$ bước, không chứa $\kappa$; $\varepsilon_0$ và giai đoạn tắt dần phụ thuộc các hằng số Hessian, viết $m_H,M_H,L_H$ để không trùng số đơn vị ẩn $m$ (điểm 2).
- B01: nêu trên mặt trang rằng nhãn $\{0,1\}$ và mất mát bình phương là lựa chọn để tính thủ công; ghi chú nêu quan hệ với nhãn $\pm1$ của Bài 05 KL03. B07: ghi chú nêu kết luận không lồi giữ nguyên với mất mát logistic, kèm phép kiểm tra số (điểm 4).
- F06 (F05 trong bản 43 trang): dẫn tập xác thực của Bài 05 HQ05, không định nghĩa lại; rủi ro R3 không kích hoạt; lý do gộp chu trình KN9 trong storyboard viết lại theo đó (điểm 5).
- F01, F02, F04, F06 (theo mã 45 trang): hình dùng lại được sao chép vào `img/lec-06/` ở giai đoạn dựng deck; cột hình ghi đường dẫn gốc (điểm 8).
- Tiêu đề B02 và E02 viết lại thành cụm danh từ (“Tính không tách được tuyến tính của XOR”, “Rủi ro thực nghiệm như đại lượng thay thế”) vì tiêu đề dạng mệnh đề trái quy tắc tiêu đề của CLAUDE.md; điểm trung tâm của hai trang không đổi.
- G01 đổi tiêu đề thành “Điều không còn giữ được và điều còn giữ được”, cùng cách diễn đạt với Bài 05 KL04 (quyết định của điều phối viên khi duyệt). E02 và F07 (F05 trong bản 43 trang) ghi phân chia nguồn với Bài 05 KL01, KL02 (cùng quyết định).
- Cách gọi: bài trước được gọi là “Bài 05” (kế hoạch gốc viết theo tên thiết kế Lecture A); deck và học liệu hiện có của Bài 05, Bài 06 được gọi là “deck Bài 05 hiện hành”, “deck Bài 06 hiện hành”; chính tả “vector” theo quy ước đã thống nhất của Bài 06 (nhật ký 2026-10-11).

### 1.5. Sửa theo kiểm định storyboard (2026-10-11)

Báo cáo kiểm định storyboard (`gate-lec-06.md` trong thư mục nháp của phiên; đạt có điều kiện: 0 chặn, 4 nghiêm trọng, 9 trung bình, 13 nhẹ). Điều phối viên xác nhận bốn phát hiện nghiêm trọng và quyết định cách sửa; danh sách đầy đủ kèm trạng thái nằm trong `review-log.md`.

- **Tính giảm của SGD.** SGD không giữ tính giảm mỗi bước theo kỳ vọng. Điều được giữ là tính giảm mỗi bước của hạ gradient đầy đủ (bổ đề giảm) và, với SGD, bất đẳng thức một bước có số hạng nhiễu $\tfrac{L\eta^2}2\sigma^2$ (F02), cùng các tốc độ theo kỳ vọng T5, T6, T8. Phản ví dụ trên dữ liệu E03: từ $\theta^*$, $\mathbb EF(\theta_1)=\tfrac{69}{128}>\tfrac12$ (F01). Sửa ở mục 1.1, A03, F01, F02, G01 và storyboard.
- **Giả thiết trơn với ReLU.** $\nabla F$ gián đoạn tại điểm gãy, nên H2 không đúng trên vùng nào chứa điểm gãy. T7, T8 áp dụng cho mạng có hàm kích hoạt trơn (tanh, softplus) hoặc mạng tuyến tính (D02); với ReLU, các cận chỉ dùng làm định hướng, và điều này được nêu trên mặt trang D05, F04, G02. Sửa M1, giới hạn ở mục 4.3, D04, D05, F04, G02, R5.
- **Quy ước $\sigma'(0)=0$.** Ghi chú C04 không còn khẳng định vector thu được thuộc tập đạo hàm suy rộng (phản ví dụ $\sigma(z)-\sigma(-z)=z$). Mặt trang C04 nêu quy ước.
- **Phạm vi của luận đề.** E02: tại $\theta$ cố định, $F$ ước lượng $R$ với sai số cỡ $1/\sqrt n$ (05c.52); theo Bottou–Bousquet, giảm sai số tối ưu dưới sai số ước lượng không đổi bậc của cận. F05: cận $O(1/\sqrt K)$ trên $\lVert\nabla F\rVert^2$ là bảo đảm có được; luận điểm rằng nó đủ dựa trên E02, không dựa trên T8.
- **Tách trang.** F02 cũ tách thành F02 (mức nhiễu nền, T5) và F03 (bước giảm dần, T6); F05 cũ tách thành F06 (quy tắc dừng sớm) và F07 (dừng sớm và chính quy hóa $\ell_2$); câu hỏi vận dụng của G02 chuyển sang G03 kèm dữ kiện $\kappa=10$, $\rho=10^{-6}$. F03, F04, F06 cũ đổi mã thành F04, F05, F08. Tổng 45 trang, vẫn trong khoảng 36–45.
- **Ký hiệu.** Giữ $\sigma^2$ cho chặn phương sai (như Bài 05b) và thêm câu nhắc ở A04, E04: $\sigma$ ở mạch B–C là hàm kích hoạt, $\sigma^2$ ở mạch E–F là chặn phương sai. Ở F07, trị riêng viết $\alpha$, hệ số chính quy hóa viết $\lambda$ như Bài 05. Hằng số Hessian của Newton viết $m_H,M_H,L_H$.
- **Các sửa khác.** A04 thêm dòng ánh xạ với Bài 05 (đầu vào thô $u$, đặc trưng $x=\varphi(u)\in\mathbb R^d$ có tọa độ hằng 1; $d$ của Bài 05 bằng $p=d+1$ của Bài 06), đối xứng với MD04 của Bài 05 (bổ sung của điều phối viên). G02 dòng (2) ghi “lồi mạnh và trơn” cho tốc độ tuyến tính (T2), ghi chú nêu tốc độ $O(1/k)$ của trường hợp lồi trơn (T1). F01 ghi rõ hình dùng Ví dụ A của Bài 05b và lý do đổi dữ liệu. A03 thêm “dừng sớm và chính quy hóa là một phần của phương pháp”, thay nhãn “Câu hỏi của bài” bằng “Vấn đề của bài” và không dùng $p$ trước A04. A04 thêm ánh xạ ký hiệu của 05c. E05, F04, F06 nêu T8 bảo đảm cho dãy lặp còn thuật toán trả về tham số tốt nhất theo tập xác thực. D04 sửa nhãn dẫn 05b (BĐ1 là cận trên bậc hai, bổ đề giảm ở phần B). B08 đặt bảng $\theta_A,\theta_B$ trước Mệnh đề 2; B09 bỏ câu kết đối xứng; D03 ghi mệnh đề là nhắc lại Bài 00; D05 bỏ cụm “điều duy nhất được chứng nhận”; D06 viết lại câu về cận T7; E02 đổi nhãn thành “Số liệu thực nghiệm”; F05 ghi đủ cận hệ quả T8. Mục 6 thêm quy ước chuyển mã trang của bài khác trong ghi chú diễn giả thành tên kết quả.

### 1.6. Điều chỉnh khi dựng deck (2026-10-12)

Deck `lecture-06-mo-rong-mo-hinh-va-du-lieu.html` giữ 45 trang, 7 mạch, mã và tiêu đề như mục 6. Không đổi số liệu. Các điều chỉnh, ghi đủ trong `review-log.md`, vòng “Dựng deck (2026-10-12)”:

- Nhãn kết quả của Bài 05c theo số hiệu hiện hành của ghi chú Bài 05c: G.2 → Định lý 05c.52, G.3 → Định lý 05c.53, G.5 → Mệnh đề 05c.56, G.6 → Nhận xét 05c.58, G.7 → Mục 6.7 và Nhận xét 05c.59; đã thay trong tệp này và storyboard.md.
- F07 và F08(c): điều kiện để hai tỉ lệ giữ gần nhau là $\lambda\approx1/(\eta k)$, $\eta\alpha\ll1$ và $\alpha\ll\lambda$ (DL §7.8, điều kiện cho (7.44)); đáp án F08(c) giải thích sai khác bằng $\alpha/\lambda=1$, không bằng $\eta\alpha$. Số liệu không đổi.
- Hình: B02 dùng tệp riêng `xor-diagonals.svg`; B05 không có hình, sơ đồ mạng ở B06; F02, F04, F05 không có hình; bốn hình rộng có bản cho màn hẹp; bản chép `risk-curves.svg` tăng cỡ chữ dòng ghi chú.
- Mặt trang: C03 thay bảng bảy dòng bằng hình truyền ngược cộng một dòng $\nabla_{W_1}\ell$; E03 bảng sáu nhóm xoay thành ba hàng; G03 rút gọn danh mục đọc (đầy đủ trong ghi chú diễn giả); A02 không dùng $(n,p)$ trước khi $p$ được định nghĩa.

### 1.7. Sửa sau vòng rà soát năm vai (2026-10-12)

Năm vai rà soát (sinh viên, chuyên gia, kiểm toán, sư phạm, mạch kể) và danh sách quyết định của điều phối viên (S1–S5, M1–M18, N1–N5, B1) dẫn tới các sửa ghi chi tiết trong `review-log.md`, vòng “Sửa sau vòng rà soát năm vai”. Các mục Mặt trang của A02, A03, B02, E02, E06, F01, F02, F04, F05, F06, F07, G01, G02, G03 trong mục 6 đã viết lại theo deck. Năm tiêu đề đổi: A03 “Giả thiết lồi của Bài 01–04 và hai giới hạn khi mở rộng quy mô”, E01 “Chi phí một bước của ba phương pháp ở ba quy mô”, F02 “Mức nhiễu nền của bước hằng”, G02 “Lựa chọn giữa hạ gradient đầy đủ, Newton và SGD”, G03 “Tổng kết, câu hỏi tự kiểm tra và tài liệu đọc”. Thuật ngữ theo bảng người dùng ngày 2026-10-11: mức nhiễu nền, tính thủ công, phép kiểm tra, kích thước nhóm, mất mát bản lề (hinge loss). Số liệu SNW Bảng 13.3: lỗi kiểm thử của SVMPerf là 6,03 %. Hessian ở E01 tính 8 byte mỗi số như Bài 05.

## 2. Đối chiếu LLO

Đề cương: Buổi 5 có LLO11 (khác biệt tối ưu học máy và tối ưu thuần túy; thách thức: điều kiện hóa kém, nhiều cực trị địa phương, độ sâu đồ thị tính toán; CLO1), LLO12 (SGD, momentum, Nesterov; CLO2), LLO13 (khởi tạo; CLO2). Buổi 6 có LLO14 (AdaGrad, RMSProp, Adam; CLO4+CLO5), LLO15 (Newton, gradient liên hợp, BFGS; CLO4+CLO5), LLO16 (chuẩn hóa theo lô, hạ theo tọa độ, trung bình Polyak, tiền huấn luyện có giám sát, tiếp diễn, học theo chương trình; CLO4+CLO5).

| Khối | LLO được hỗ trợ | Mức | Bằng chứng trong bài |
|---|---|---|---|
| B1 (mạch A, B) | LLO11 (thách thức: nhiều cực tiểu do đối xứng, không lồi) | Một phần | B08–B10 |
| B1 | CLO2 (xây dựng mô hình học máy: chọn đặc trưng thủ công hay đặc trưng học được) | Có | B03, B06, B10 |
| B2 (mạch C, D) | LLO11 (độ sâu đồ thị tính toán ở mức đồ thị và lan truyền ngược; điểm yên ngựa, bình nguyên) | Một phần | C02–C05, D01–D06 |
| B2 | CLO1 (đánh giá điều thuật toán bảo đảm) | Có | D04–D07 |
| B3 (mạch E, F, G) | LLO11 (tối ưu học máy khác tối ưu thuần túy: mục tiêu thay thế, dừng sớm) | Có | E02, F06, F07, G01 |
| B3 | LLO12 (SGD nhóm nhỏ, lịch bước) | Một phần: không có momentum, Nesterov | E03–E06, F01–F05 |
| B3 | LLO15 (Newton) | Chỉ ở mức so sánh chi phí, không dạy thuật toán | E01, G02 |
| Toàn bài | CLO4 (nhận dạng bài toán tối ưu và chọn thuật toán theo $(n,p)$ và tính lồi) | Có | G02 |

LLO13, LLO14, LLO16 không được bài này hỗ trợ. LLO13 chỉ xuất hiện như hệ quả trong ghi chú B08 (khởi tạo đối xứng giữ nguyên đối xứng); không thêm trang.

## 3. Nội dung đề cương không còn trong Bài 05 và Bài 06

| Nội dung | LLO | Hiện đang ở | Đề xuất nơi đặt |
|---|---|---|---|
| Momentum, Nesterov | LLO12 | Deck Bài 05 cũ, mạch C (C01–C08) | Bài bổ trợ **06b** (deck Bài 05 cũ, đổi tên ngày 2026-10-12) |
| Khởi tạo (đối xứng, Glorot, phương sai qua lớp) | LLO13 | Deck Bài 05 cũ, mạch D (D03–D11) | 06b; ghi chú B08 của bài này dẫn tới |
| AdaGrad, RMSProp, Adam | LLO14 | Deck Bài 06 cũ, mạch B | 06c (deck Bài 06 cũ, đổi tên ngày 2026-10-12) |
| Newton trong huấn luyện, gradient liên hợp, BFGS | LLO15 | Deck Bài 06 cũ, mạch C–D; Newton tổng quát ở Bài 04 và A3 | 06c; Bài 05 (A3) giữ phần chi phí Newton |
| Chuẩn hóa theo lô, hạ theo tọa độ, trung bình Polyak, tiền huấn luyện, tiếp diễn, học theo chương trình | LLO16 | Deck Bài 06 cũ, mạch E–F | 06c; trung bình Polyak có thể dẫn T3, T4 của Bài 05b |
| Bất đẳng thức tập trung cho gradient nhóm | (nền cho LLO12) | Bài 05c | Giữ ở 05c, chỉ dẫn |

Quyết định ngày 2026-10-12: deck Bài 05 cũ thành Bài 06b, deck Bài 06 cũ thành Bài 06c (bổ trợ), không xóa; `index.html` liên kết hai bài bổ trợ.

## 4. Khung lý thuyết chung

### 4.1. Vấn đề trung tâm

Bài 05 kết thúc với hai giới hạn: (i) mọi phương pháp của Bài 05 trả chi phí của toàn bộ $n$ mẫu ở mỗi bước; (ii) dự đoán tuyến tính theo đặc trưng không biểu diễn được một số hàm đích, XOR là trường hợp điển hình, và mở rộng đặc trưng thủ công làm $d$ tăng, với các hệ quả khối A1 của Bài 05 đã chỉ ra. Bài 06 giải quyết bài toán sau: khi mô hình phải có đặc trưng học được và dữ liệu lớn đến mức một gradient đầy đủ vượt ngân sách tính toán, cần xác định (1) gradient theo tham số được tính với chi phí bao nhiêu, (2) một phương pháp dựa trên gradient còn chứng nhận được điều gì khi mục tiêu không lồi, (3) tốc độ nào còn lại khi gradient được thay bằng ước lượng ngẫu nhiên, và vì sao tốc độ đó đủ cho mục tiêu thay thế $F$ của rủi ro $R$.

Luận đề ở mục 1.1 trả lời phần “vì sao” của bài toán này: SGD nhóm nhỏ bị buộc bởi chi phí. Cận $O(1/\sqrt K)$ của T8 trên $\lVert\nabla F\rVert^2$ là bảo đảm có được; luận điểm rằng mức đó đủ dựa trên lập luận đại lượng thay thế (E02, cho bài toán lồi) và trên tập xác thực (F06, cho mạng), không dựa trên T8, như dòng kết luận của F05.

### 4.2. Đối tượng và ký hiệu chung

| Ký hiệu | Nghĩa, kích thước | Đối chiếu |
|---|---|---|
| $(x_i,y_i)$, $i=1,\dots,n$; $x_i\in\mathbb R^d$ | Dữ liệu huấn luyện | Giao diện chung Bài 05–06. 05b, 05c viết $N$ cho số mẫu; nêu một lần ở A04 |
| $m$ | Số đơn vị ẩn | Mới |
| $W_1\in\mathbb R^{m\times d}$, $b_1\in\mathbb R^m$, $w_2\in\mathbb R^m$, $b_2\in\mathbb R$ | Tham số mạng hai tầng đầu ra vô hướng | DL (6.3) viết $W,c,w,b$ |
| $\sigma$ | Hàm kích hoạt áp theo từng thành phần; mặc định $\sigma(z)=\max\{0,z\}$ (ReLU), quy ước $\sigma'(0)=0$ | deck Bài 05 hiện hành dùng $\phi$; Bài 05 mới dùng $\sigma$ cho hàm sigmoid. A04 và E04 nhắc: $\sigma$ ở mạch B–C là hàm kích hoạt, $\sigma^2$ ở mạch E–F là chặn phương sai |
| $z=W_1x+b_1$, $h=\sigma(z)$, $f(x;\theta)=w_2^\top h+b_2$ | Tiền kích hoạt, kích hoạt, đầu ra | |
| $\theta\in\mathbb R^p$ | Toàn bộ tham số; mạng hai tầng: $p=md+2m+1$; mô hình tuyến tính có hệ số chặn $c$: $p=d+1$ | 05c dùng $d$ cho số chiều tham số; Bài 05 gộp hệ số chặn vào $w$ nên $p=d$; nêu ánh xạ ở A04 |
| $\ell(f,y)=\tfrac12(f-y)^2$, $\ell_i(\theta)=\ell(f(x_i;\theta),y_i)$ | Mất mát bình phương (lồi theo $f$) | DL §6.1 dùng MSE cho XOR |
| $F(\theta)=\frac1n\sum_{i=1}^n\ell_i(\theta)$ | Rủi ro thực nghiệm | 05b viết $f$; 05c viết $J$ |
| $R(\theta)=\mathbb E\,\ell(f(X;\theta),Y)$ | Rủi ro kỳ vọng | 05c Định nghĩa 05c.51; Bài 05 |
| $e=f-y$; $\delta_h=\partial\ell/\partial h$, $\delta_z=\partial\ell/\partial z$ | Sai số dự đoán, các đại lượng truyền ngược | deck Bài 05 hiện hành dùng $e$ |
| $\theta_k$, $\eta$ hoặc $\eta_k$, $K$ | Dãy lặp, bước, số bước | 05b viết $x_k$; deck Bài 05 hiện hành viết $T$. Nêu một lần ở A04: dùng $\theta_k$ để không trùng dữ liệu $x_i$ |
| $B_k\subset\{1,\dots,n\}$, $\lvert B_k\rvert=b$; $\widehat g_k=\frac1b\sum_{i\in B_k}\nabla\ell_i(\theta_k)$ | Nhóm nhỏ, kích thước nhóm, gradient nhóm | 05b viết $g_k$. Độ lệch mạng luôn có chỉ số ($b_1,b_2$); kích thước nhóm $b$ không chỉ số. Ví dụ tuyến tính ở E03 viết hệ số chặn là $c$ để tránh trùng |
| $\Sigma(\theta)$, $\operatorname{tr}\Sigma(\theta)$ | Hiệp phương sai và phương sai tổng của gradient một mẫu chọn đều | 05c.53 |
| $L,\mu,\sigma^2,\Delta_0,D$ | Hằng số trơn, lồi mạnh, chặn phương sai (H6b), $F(\theta_0)-F_{\inf}$, $\lVert\theta_0-\theta^*\rVert$ | 05b |
| $m_H,M_H,L_H$ | Chặn dưới, chặn trên trị riêng của Hessian và hằng số Lipschitz của Hessian trong phân tích Newton | Bài 05 viết $m,M,L_H$; ở đây có chỉ số $H$ để không trùng số đơn vị ẩn $m$ |
| $\alpha$ (chỉ ở F07) | Trị riêng của Hessian của mục tiêu bậc hai | DL §7.8 viết $\lambda$; ở đây $\lambda$ giữ cho hệ số chính quy hóa như Bài 05 |

### 4.3. Giả thiết

Dùng nguyên nhãn 05b: H0 ($F$ khả vi, bị chặn dưới), H2 ($L$-trơn), H3 ($\mu$-lồi mạnh), H4 (đạt cực tiểu), H6 (không chệch có điều kiện), H6a, H6b. Thêm ba giả thiết cục bộ của bài, đặt tên trong outline, không cần nhãn trên mặt trang:

- **M1 (mô hình).** Mạng hai tầng như bảng trên, $\sigma$ là ReLU. $F$ liên tục, khả vi ngoài tập các $\theta$ có tiền kích hoạt bằng 0 tại một mẫu nào đó; tại đó lan truyền ngược dùng quy ước tính toán $\sigma'(0)=0$. Tại các điểm gãy, $\nabla F$ gián đoạn, nên với ReLU giả thiết H2 không đúng trên bất kỳ vùng nào chứa điểm gãy.
- **M2 (mất mát).** $\ell(\cdot,y)$ lồi, khả vi theo $f$; mặc định bình phương.
- **M3 (lấy mẫu).** Ở bước $k$, $B_k$ là tập con $b$ phần tử chọn đều, độc lập với $B_0,\dots,B_{k-1}$. Khi đó H6 đúng, và $\mathbb E\lVert\widehat g_k-\nabla F(\theta_k)\rVert^2=\frac{\operatorname{tr}\Sigma(\theta_k)}{b}\cdot\frac{n-b}{n-1}$ (05c.53). Xáo trộn theo lượt trong thực hành vi phạm M3; nêu trong ghi chú E05.

Giới hạn bắt buộc phải nói: T7, T8 áp dụng cho mạng có hàm kích hoạt trơn (tanh, softplus) hoặc mạng tuyến tính như D02, với H2 trên một tập lồi bị chặn chứa mọi dãy lặp (D02 cho thấy H2 không đúng toàn cục: Hessian không bị chặn). Với ReLU, $\nabla F$ gián đoạn tại điểm gãy, nên các cận chỉ dùng làm định hướng; điều này được nói trên mặt trang D05, F04, G02. H6b với $\sigma^2$ hữu hạn cũng chỉ đúng trên vùng bị chặn.

### 4.4. Chuỗi định nghĩa → kết quả → phương pháp

1. Định nghĩa tách được tuyến tính → Mệnh đề 1: XOR không tách được tuyến tính (chứng minh trên trang, B02).
2. Định nghĩa mạng hai tầng (B06) → Mệnh đề 2: hoán vị đơn vị ẩn giữ nguyên hàm (B08) → Mệnh đề 3: nếu một cực tiểu toàn cục có hai đơn vị ẩn khác nhau thì có ít nhất hai cực tiểu toàn cục phân biệt; nếu $F$ lồi thì cả đoạn nối là cực tiểu; giá trị tại trung điểm bác bỏ tính lồi (B09).
3. Thuật toán lan truyền ngược (C04) → Nhận xét về chi phí: cùng bậc với truyền xuôi (C05).
4. Định nghĩa điểm dừng, điểm yên ngựa; điều kiện bậc hai (D01, D03) → bổ đề giảm dưới H2 (D04, nhắc Bài 04 và 05b B03) → T7 của 05b (D05).
5. Định lý 05c.53 của 05c (E04) → thuật toán SGD nhóm nhỏ (E05) → bất đẳng thức một bước có số hạng nhiễu và T5 (F02), T6 (F03), T8 (F04) của 05b → so sánh dưới ngân sách cố định (F05) → quy tắc dừng sớm (F06) và quan hệ với chính quy hóa $\ell_2$ (F07).
6. Bảng lựa chọn phương pháp theo $(n,p)$ và tính lồi (G02).

### 4.5. Giới hạn áp dụng

- Mọi bảo đảm của bài là về điểm dừng hoặc kỳ vọng; không có bảo đảm cực tiểu toàn cục cho mạng. SGD không giảm $F$ theo kỳ vọng ở mọi bước (F01).
- T7, T8 cần $F$ trơn: áp dụng cho hàm kích hoạt trơn hoặc mạng tuyến tính; với ReLU chỉ là định hướng.
- T8 bảo đảm cho dãy lặp; tham số trả về theo tập xác thực không được T8 chặn trực tiếp.
- T7, T8 chặn **bình phương** chuẩn gradient (cực tiểu theo $k$, hoặc trung bình kỳ vọng), không chặn khoảng cách tới một điểm cực tiểu, không chứng minh dãy hội tụ.
- Các cận là cận trên, có thể bi quan nhiều bậc (D07, F01–F02 có đối chiếu số).
- Tương đương dừng sớm và chính quy hóa $\ell_2$ chỉ đúng cho mục tiêu bậc hai và gần đúng khi $\eta\alpha\ll1$ và $\alpha\ll\lambda$, $\alpha$ là trị riêng (DL §7.8).
- Bảng chi phí đếm phép nhân–cộng, bỏ hằng số và song song phần cứng.

## 5. Bản đồ mạch

| Mạch | Chức năng | Đầu vào | Đầu ra | Trang | Tiết LT | Tiết BT | Trang kiểm tra |
|---|---|---|---|---|---|---|---|
| A. Bài toán huấn luyện khi mô hình và dữ liệu lớn | Nhận hai giới hạn của Bài 05, nêu luận đề “mất gì, giữ gì”, cố định ký hiệu | Kết luận Bài 05: chi phí $O(nd)$ và $O(nd^2+d^3)$; XOR; chính quy hóa $\ell_2$ | Ba câu hỏi của bài (biểu diễn, chứng nhận, tốc độ dưới nhiễu) và khung ký hiệu | A01–A04 | 0,12 | 0,00 | (không) |
| B. Biểu diễn phi tuyến và mạng hai tầng (khối B1) | **Nhu cầu:** dự đoán tuyến tính không đủ cho XOR. Xây mạng hai tầng và chỉ ra chi phí: rủi ro thực nghiệm không lồi | Giới hạn (ii) của Bài 05 | Mô hình $f(x;\theta)$, $F(\theta)$ không lồi, nhiều cực tiểu đối xứng | B01–B10 | 0,55 | 0,33 | B10 |
| C. Lan truyền ngược trên đồ thị tính toán (khối B2, phần 1) | **Nhu cầu:** mọi phương pháp bậc nhất cần $\nabla F(\theta)\in\mathbb R^p$; tính nó với chi phí cùng bậc truyền xuôi | Mô hình và $F$ của mạch B; dây chuyền của Bài 00 | Thuật toán và chi phí; gradient chính xác của một mẫu; một bước hạ gradient | C01–C07 | 0,36 | 0,14 | C07 |
| D. Điểm dừng và bảo đảm của gradient khi không lồi (khối B2, phần 2) | **Nhu cầu:** xác định điều mà gradient bằng 0 hoặc gradient nhỏ chứng nhận khi $F$ không lồi | Gradient từ C; tính không lồi từ B | Phân loại điểm dừng; bổ đề giảm và T7: bảo đảm có được là điểm dừng xấp xỉ | D01–D07 | 0,32 | 0,18 | D07 |
| E. Gradient nhóm nhỏ và chi phí mỗi bước (khối B3, phần 1) | **Nhu cầu:** một gradient đầy đủ vượt ngân sách; $F$ chỉ là đại lượng thay thế | Thuật toán GD và T7 của D; chi phí của C | Ước lượng không chệch, phương sai, thuật toán SGD, chi phí mỗi bước độc lập với $n$ | E01–E06 | 0,30 | 0,14 | E06 |
| F. Tốc độ hội tụ dưới nhiễu và dừng sớm (khối B3, phần 2) | **Nhu cầu:** xác định tốc độ hội tụ còn lại khi gradient có nhiễu, và lý do tốc độ đó đủ dưới ngân sách cố định với mục tiêu thay thế | SGD và phương sai của E | Bất đẳng thức một bước có nhiễu; T5, T6, T8 phát biểu lại với phạm vi; so sánh dưới ngân sách cố định; dừng sớm | F01–F08 | 0,30 | 0,13 | F08 |
| G. Tổng hợp và lựa chọn phương pháp | Khép luận đề: những gì mất, những gì giữ; chọn phương pháp theo $(n,p)$ và tính lồi | Kết quả của B–F | Bảng quyết định có điều kiện áp dụng | G01–G03 | 0,05 | 0,08 | G03 |
| **Tổng** | | | | **45** | **2,00** | **1,00** | |

Kiểm tổng: LT $0{,}12+0{,}55+0{,}36+0{,}32+0{,}30+0{,}30+0{,}05=2{,}00$; BT $0{,}33+0{,}14+0{,}18+0{,}14+0{,}13+0{,}08=1{,}00$. Khối B1 = $0{,}12+0{,}55+0{,}33=1{,}00$; B2 = $0{,}36+0{,}14+0{,}32+0{,}18=1{,}00$; B3 = $0{,}30+0{,}14+0{,}30+0{,}13+0{,}05+0{,}08=1{,}00$.

Ranh giới cần giữ: B10→C01 chuyển từ “mô hình nào” sang “tính gradient của nó thế nào”; C06→D01 chuyển từ “tính được” sang “chứng nhận được gì”; D07→E01 giữ T7 nhưng thay giả thiết gradient đầy đủ bằng ngân sách cố định; E06→F01 chuyển từ “một bước” sang “tốc độ sau $K$ bước”.

## 6. Dàn bài từng trang

Quy ước mỗi mục: **Điểm trung tâm** (một câu); **Mặt trang**; **Ghi chú diễn giả**; **Hình**; **Liên kết**; **Quyết định** (mọi trang là `thêm` vì bài được dựng mới); **Hành trình** (khái niệm KN và bước); **LLO/CLO**; **Thời lượng** (tiết LT + BT). Số trong mặt trang lấy từ mục 8.

Quy ước cho tác tử soạn deck: mã trang (của bài này hay bài khác) không xuất hiện trên mặt trang và trong ghi chú diễn giả. Trên mặt trang, mọi tham chiếu chéo dùng tên kết quả (Mệnh đề 1–3, T5–T8, 05c.52, 05c.53 là tên kết quả, được giữ) hoặc từ chỉ nội dung (“ví dụ mạng tuyến tính một đơn vị”, “dữ liệu bốn điểm”, “mạng của ví dụ đồ thị tính toán”); mã còn sót trong mục Mặt trang của tệp này chỉ là chỉ dẫn nội bộ và phải được chuyển như vậy. Trong mục Ghi chú diễn giả, mã trang của bài khác (05b F03, Bài 05 KL02, HQ05, CP05…), mã Q, R, số hiệu điểm hòa giải và các lời dặn người soạn chỉ là chỉ dẫn nội bộ. Khi viết ghi chú diễn giả thật, chuyển mã trang thành tên kết quả hoặc tên phần (ví dụ “Bài 05b, Định lý T7”, “Bài 05, phần hồi quy nhiều chiều”) và bỏ mọi chỉ dẫn điều phối.

### Mạch A. Bài toán huấn luyện khi mô hình và dữ liệu lớn

#### A01. Mở rộng mô hình và dữ liệu

- **Điểm trung tâm:** Nhận diện bài, học phần, đơn vị.
- **Mặt trang:** Tên học phần; “Bài 06”; tên bài; phụ đề danh từ tạm dùng “Khả năng biểu diễn của mạng nơ ron và tối ưu ngẫu nhiên”, chờ người dùng xác nhận (Q1); Trường Đại học Công nghệ, ĐHQGHN.
- **Ghi chú diễn giả:** Bài 06 tiếp tục từ kết luận Bài 05 (hai giới hạn); bốn vấn đề của bài.
- **Hình:** không.
- **Liên kết:** dẫn A02.
- **Quyết định:** thêm; trang nhận diện bắt buộc.
- **Hành trình:** không áp dụng. **LLO/CLO:** chung. **Thời lượng:** 0,01 + 0,00.

#### A02. Mục tiêu học tập và bản đồ bài

- **Điểm trung tâm:** Ba nhóm năng lực tương ứng ba khối nội dung.
- **Mặt trang:** Ba mục tiêu như trước (mục tiêu 3: “chọn phương pháp theo số mẫu, số tham số và tính lồi, kèm bảo đảm hội tụ dưới nhiễu”); bản đồ năm phần 2–6; khung “Vấn đề trung tâm”: huấn luyện bằng gradient một mô hình có đặc trưng học được, đủ để biểu diễn XOR, khi một gradient đầy đủ vượt ngân sách mỗi bước. (bản sau vòng rà soát năm vai, 2026-10-12)
- **Ghi chú diễn giả:** Ánh xạ mục tiêu → mạch; tiên quyết: dây chuyền (Bài 00), bổ đề giảm (Bài 04), kết luận Bài 05; các định lý hội tụ được dẫn từ Bài 05b, phương sai gradient nhóm từ 05c.
- **Hình:** không (bản đồ dạng thẻ HTML).
- **Liên kết:** A01 → A03.
- **Quyết định:** thêm; người học cần biết sản phẩm học tập trước nội dung.
- **Hành trình:** không áp dụng. **LLO/CLO:** LLO11, LLO12 (một phần); CLO1, CLO2, CLO4. **Thời lượng:** 0,03 + 0,00.

#### A03. Giả thiết lồi của Bài 01–04 và hai giới hạn khi mở rộng quy mô

- **Điểm trung tâm:** Khi mô hình và dữ liệu lớn, bài toán mất tính chính xác, bảo đảm tất định và gradient đầy đủ; còn giữ được bất đẳng thức giảm (có số hạng nhiễu với SGD), bảo đảm điểm dừng và tốc độ theo kỳ vọng.
- **Mặt trang:** Bảng bốn dòng “Bài 01–04 | Mô hình và dữ liệu lớn”, mỗi dòng có nhãn theo cách gọi của Bài 05 MD03 và hai giới hạn: **Đích** (lý do thống kê): nghiệm chính xác / rủi ro thực nghiệm: đại lượng thay thế; bảo đảm tất định, giảm mỗi bước / SGD: bảo đảm theo kỳ vọng, có số hạng nhiễu; **Biểu diễn** (ii): điểm dừng là cực tiểu toàn cục / không lồi: chỉ còn điểm dừng xấp xỉ; **Chi phí** (lý do tính toán; (i)): $n$ mẫu mỗi bước / nhóm nhỏ: chi phí mỗi bước độc lập với $n$. “Hai giới hạn của Bài 05”: (i) chi phí, (ii) biểu diễn (XOR). “Vấn đề của bài”: (1) biểu diễn XOR và hệ quả; (2) chi phí tính gradient; (3) điều gradient chứng nhận khi không lồi; (4) tốc độ hội tụ dưới nhiễu. Nhãn dòng là chỗ dựa cho nhãn “Lý do tính toán” (E01) và “Lý do thống kê” (E02) (bản sau tái kiểm, 2026-10-12)
- **Ghi chú diễn giả:** Nhắc hai giới hạn từ kết luận Bài 05: (i) A3 so sánh $O(nd)$ và $O(nd^2+d^3)$ mỗi bước nhưng cả hai đều quét toàn bộ $n$ mẫu; (ii) XOR không biểu diễn được bằng dự đoán tuyến tính. Lý do thống kê nhắc A1 (khớp kém dần khi $d$ tăng) và A2 (không có cực tiểu trên dữ liệu tách được, chính quy hóa $\ell_2$ làm bài toán đặt đúng). Không gọi SGD là “nhanh hơn”: nó là phương án dùng được khi một bước đủ $n$ mẫu vượt ngân sách mỗi bước. Về Newton, dùng đúng phát biểu của Bài 05 CP05: chỉ giai đoạn hội tụ bậc hai, gồm $\log_2\log_2(\varepsilon_0/\varepsilon)$ bước, không chứa $\kappa$; $\varepsilon_0$ và giai đoạn tắt dần phụ thuộc các hằng số Hessian $m_H,M_H,L_H$. Không viết “Newton không phụ thuộc $\kappa$” vô điều kiện. SGD không giảm $F$ theo kỳ vọng ở mọi bước; G01 nêu đúng điều được giữ.
- **Hình:** không (bảng HTML).
- **Liên kết:** Giới hạn (ii) tạo nhu cầu của mạch B; giới hạn (i) được trả lời ở E–F. G01 quay lại đúng bảng này với nhãn kết quả.
- **Quyết định:** thêm; chỉ dẫn người dùng bắt buộc nêu luận đề sớm, theo dạng “mất gì, giữ gì”.
- **Hành trình:** nhu cầu của toàn bài. **LLO/CLO:** LLO11; CLO1. **Thời lượng:** 0,05 + 0,00.

#### A04. Bài toán huấn luyện và ký hiệu chung

- **Điểm trung tâm:** Huấn luyện là cực tiểu hóa $F(\theta)=\frac1n\sum_i\ell_i(\theta)$ trên $\theta\in\mathbb R^p$, với $F$ là ước lượng của $R$.
- **Mặt trang:** Dữ liệu $(x_i,y_i)$, $x_i\in\mathbb R^d$; mô hình $f(x;\theta)$, $\theta\in\mathbb R^p$; $\ell_i$, $F$, $R$; dãy lặp $\theta_{k+1}=\theta_k-\eta_k g_k$ với $g_k$ là gradient đầy đủ hoặc gradient nhóm. Một dòng ánh xạ: “Bài 05b viết $x_k$, $f$, $N$; Bài 05c viết $J$, $N$ và $d$ cho số chiều tham số; Bài 05 viết $w_k$ và gộp hệ số chặn vào $w$; ở đây $\theta_k$, $F$, $n$, $p$, hệ số chặn $c$.” Dòng ánh xạ với Bài 05: “Bài 05 viết đầu vào thô là $u$ và vector đặc trưng $x=\varphi(u)\in\mathbb R^d$ có tọa độ hằng 1, hệ số chặn nằm trong $w$; ở đây đầu vào thô là $x\in\mathbb R^d$ và số tham số là $p$. Với mô hình tuyến tính, $d$ của Bài 05 bằng $p=d+1$ của Bài 06.”
- **Ghi chú diễn giả:** Dòng ánh xạ với Bài 05 đối xứng với dòng trên trang ký hiệu của Bài 05 (MD04 trong kế hoạch Bài 05). Lý do đổi $x_k\to\theta_k$: $x_i$ đã là dữ liệu. $p=d+1$ cho mô hình tuyến tính; mạng có $p$ riêng (B06). Mất mát bình phương được chọn cho phép tính thủ công; mất mát logistic của Bài 05 cũng lồi theo $f$, và kết luận về tính không lồi giữ nguyên (ghi chú B07). Ánh xạ hệ số chặn: Bài 05 gộp hệ số chặn vào $w$ qua tọa độ hằng 1 của vector đặc trưng $x_i=\varphi(u_i)$, nên số chiều $d$ của Bài 05 chính là số tham số; với mô hình tuyến tính trên đầu vào thô $x\in\mathbb R^d$ của Bài 06, số đó bằng $p=d+1$; ở bài này hệ số chặn của mô hình tuyến tính viết riêng là $c$, độ lệch mạng là $b_1,b_2$, còn $b$ không chỉ số là kích thước nhóm. Ký hiệu $\sigma$ ở mạch B–C là hàm kích hoạt (Bài 05 dùng $\sigma$ cho hàm sigmoid); $\sigma^2$ ở mạch E–F là chặn phương sai của gradient.
- **Hình:** không.
- **Liên kết:** A03 nêu câu hỏi; A04 cho đối tượng; B01 mở bằng một dữ liệu cụ thể.
- **Quyết định:** thêm; khung ký hiệu phải cố định trước khi dẫn định lý từ 05b, 05c có ký hiệu khác.
- **Hành trình:** nền cho mọi KN. **LLO/CLO:** CLO1. **Thời lượng:** 0,03 + 0,00.

### Mạch B. Biểu diễn phi tuyến và mạng hai tầng (khối B1)

Nhu cầu của mạch (câu hỏi trung tâm B1 viết lại): dự đoán tuyến tính theo đặc trưng có giới hạn biểu diễn; cần mô hình có đặc trưng học được và biết chi phí của nó.

#### B01. Bài toán XOR

- **Điểm trung tâm:** Bốn điểm XOR là một nhiệm vụ phân lớp cụ thể mà mô hình tuyến tính phải giải.
- **Mặt trang:** Bảng chân trị: $x=(0,0),(0,1),(1,0),(1,1)$; $y=0,1,1,0$. Nhãn $\{0,1\}$ và mất mát bình phương $\ell=\tfrac12(f-y)^2$ là lựa chọn để tính thủ công. **Ví dụ dẫn nhập.** Mô hình tuyến tính $f(x;w,c)=w^\top x+c$, $w\in\mathbb R^2$, $c\in\mathbb R$; dự đoán lớp 1 khi $f>\tfrac12$. Hình bốn điểm trên mặt phẳng.
- **Ghi chú diễn giả:** XOR là phép “hoặc loại trừ”: đầu ra 1 khi đúng một đầu vào bằng 1. Đây là ví dụ dẫn nhập cho nhu cầu của mạch: mô hình tuyến tính với hai đặc trưng gốc. Không bàn tổng quát hóa: cả bốn điểm đều là dữ liệu huấn luyện (DL §6.1). Hệ số chặn viết $c$ để không trùng kích thước nhóm $b$ về sau. Bài 05 (KL03) dùng cùng bốn điểm với nhãn $\pm1$ ($+1$ cho $(0,1),(1,0)$; $-1$ cho $(0,0),(1,1)$), tức $y_{\pm}=2y-1$; lập luận tổng $g(1,0)+g(0,1)=g(0,0)+g(1,1)$ ở B02 không phụ thuộc cách mã hóa nhãn. Mất mát bình phương cho nghiệm bình phương nhỏ nhất và $F(\theta_A)=0$ tính được thủ công (DL §6.1 cũng dùng MSE cho XOR).
- **Hình:** `xor-points.svg`.
- **Liên kết:** Nhận giới hạn (ii) của A03; B02 chứng minh không có $w,c$ nào phân lớp đúng.
- **Quyết định:** thêm; cần một dữ liệu tính thủ công được trước định nghĩa.
- **Hành trình:** KN1 nhu cầu + ví dụ dẫn nhập + trực quan. **LLO/CLO:** CLO2. **Thời lượng:** 0,05 + 0,00.

#### B02. Tính không tách được tuyến tính của XOR

- **Điểm trung tâm:** Không hàm affine nào phân lớp đúng cả bốn điểm XOR; nghiệm bình phương nhỏ nhất affine là hằng $\tfrac12$.
- **Mặt trang:** **Nhắc lại (Bài 05)**: tách được tuyến tính nếu có $w,c$ với $y_{\pm,i}g(x_i)>0$, $g(x)=w^\top x+c$; với mô hình B01, $g=f-\tfrac12$. **Mệnh đề 1** (đánh số của Bài 06) và **Chứng minh** (nhắc lại phần kết luận của Bài 05) bằng đẳng thức tổng. Hình `xor-diagonals.svg`. **Ví dụ** (bình phương nhỏ nhất): $w=(0,0)$, $c=\tfrac12$, $F=\tfrac18$ (bản sau tái kiểm, 2026-10-12)
- **Ghi chú diễn giả:** Ngưỡng $\tfrac12$ ở B01 là trường hợp $g=f-\tfrac12$. Hệ phương trình chuẩn: ma trận $\begin{psmallmatrix}2&1&2\\1&2&2\\2&2&4\end{psmallmatrix}$, vế phải $(1,1,2)$, nghiệm $(0,0,\tfrac12)$; phần dư $\pm\tfrac12$ ở cả bốn điểm, $F=\tfrac14\cdot\tfrac12\cdot4\cdot\tfrac14=\tfrac18$. Mô hình tuyến tính “tốt nhất” trả về cùng một giá trị cho mọi đầu vào. Đẳng thức tổng là lý do hình học: hai đường chéo của hình vuông có cùng trung điểm.
- **Hình:** `xor-diagonals.svg` (bốn điểm XOR, hai đường chéo, trung điểm chung $(\tfrac12,\tfrac12)$; tệp riêng, cùng bộ sinh với `xor-points.svg`).
- **Liên kết:** B01 cho dữ liệu; B03 hỏi cách khắc phục bằng đặc trưng mới.
- **Quyết định:** thêm; chứng minh ngắn đủ đặt trên trang, theo yêu cầu.
- **Hành trình:** KN1 ví dụ (bình phương nhỏ nhất) + hình thức. **LLO/CLO:** CLO1. **Thời lượng:** 0,07 + 0,02 (kiểm tra thủ công hệ phương trình chuẩn).

#### B03. Đặc trưng thủ công và chi phí theo số chiều

- **Điểm trung tâm:** Thêm đặc trưng $x_1x_2$ làm XOR biểu diễn được tuyến tính, nhưng số đặc trưng đa thức tăng theo $\binom{d+q}{q}$.
- **Mặt trang:** Với $\varphi(x)=(x_1,x_2,x_1x_2)$: $f=x_1+x_2-2x_1x_2$ khớp đúng bốn điểm. Bảng số đơn thức bậc $\le q$ trong $d$ biến, $\binom{d+q}{q}$: $d=2$: 6 ($q=2$), 10 ($q=3$); $d=100$: 5 151; 176 851; $d=1000$: 501 501; 167 668 501. Dòng nối: chi phí mỗi bước tỉ lệ số đặc trưng (A3).
- **Ghi chú diễn giả:** Đây là ứng dụng của KN1 (sửa giới hạn bằng cách đổi không gian đặc trưng) và nhu cầu của KN2. Với $p=501\,501$, một bước Newton cần cỡ $p^3\approx1{,}26\cdot10^{17}$ phép tính chỉ cho phần giải hệ; A1 đã chỉ ra hệ quả thống kê khi $d$ tăng. Đặc trưng thủ công đòi hỏi biết trước dạng tương tác. Ký hiệu $q$ cho bậc để không trùng $p$.
- **Hình:** không (bảng HTML).
- **Liên kết:** Chi phí theo $d$ của đặc trưng thủ công là giới hạn dẫn tới đặc trưng học được ở B04.
- **Quyết định:** thêm; nối trực tiếp “đặc trưng thủ công tốn $d$” với A1, A3 theo yêu cầu.
- **Hành trình:** KN1 ứng dụng; KN2 nhu cầu. **LLO/CLO:** CLO2, CLO4. **Thời lượng:** 0,06 + 0,02.

#### B04. Lớp ẩn như một phép biến đổi đặc trưng

- **Điểm trung tâm:** Một lớp ẩn phi tuyến đưa bốn điểm XOR sang không gian mới, nơi chúng tách được tuyến tính.
- **Mặt trang:** **Trực quan.** $h_1=\max\{0,x_1-x_2\}$, $h_2=\max\{0,x_2-x_1\}$ đưa $(0,0),(1,1)\mapsto(0,0)$, $(1,0)\mapsto(1,0)$, $(0,1)\mapsto(0,1)$. Trong không gian $h$, đường thẳng $h_1+h_2=\tfrac12$ tách hai lớp. Hình hai khung $x$ và $h$.
- **Ghi chú diễn giả:** Hai điểm lớp 0 bị gộp vào cùng một điểm; đó là việc mà đặc trưng tuyến tính không làm được (DL Hình 6.1 dùng một phép biến đổi khác cùng ý). Phép biến đổi có tham số và sẽ được học; trang này chỉ cho thấy tồn tại.
- **Hình:** `xor-feature-map.svg`; bản cho màn hẹp `xor-feature-map-narrow.svg` (hai khung xếp dọc), chọn bằng thẻ `<picture>`.
- **Liên kết:** Nhu cầu ở B03 → trực quan; B05 viết đầy đủ trọng số.
- **Quyết định:** thêm; cần trực quan trước định nghĩa mạng.
- **Hành trình:** KN2 trực quan. **LLO/CLO:** CLO2. **Thời lượng:** 0,05 + 0,00.

#### B05. Mạng hai đơn vị ẩn biểu diễn XOR

- **Điểm trung tâm:** Với trọng số cụ thể, mạng hai tầng hai đơn vị ẩn ReLU tính đúng XOR tại cả bốn đầu vào.
- **Mặt trang:** **Ví dụ.** $W_1=\begin{psmallmatrix}1&-1\\-1&1\end{psmallmatrix}$, $b_1=(0,0)^\top$, $w_2=(1,1)^\top$, $b_2=0$. Bảng truyền xuôi: $x$ | $z=W_1x+b_1$ | $h$ | $f$: $(0,0)$ | $(0,0)$ | $(0,0)$ | 0; $(0,1)$ | $(-1,1)$ | $(0,1)$ | 1; $(1,0)$ | $(1,-1)$ | $(1,0)$ | 1; $(1,1)$ | $(0,0)$ | $(0,0)$ | 0. Kết luận: $f(x;\theta_A)=\lvert x_1-x_2\rvert$ trên $\{0,1\}^2$, $F(\theta_A)=0$.
- **Ghi chú diễn giả:** Gọi tham số này là $\theta_A$. Hàm ReLU (rectified linear unit) là tên tiếng Anh lần đầu. Tại $(0,0)$ và $(1,1)$ tiền kích hoạt bằng 0; giá trị hàm vẫn xác định, chỉ đạo hàm cần quy ước (dùng ở C). DL (6.4)–(6.6) cho một nghiệm khác, dùng ở bài tập B10.
- **Hình:** không trên mặt trang (dựng deck 2026-10-12: trang đã có ma trận và bảng truyền xuôi bốn dòng; sơ đồ `two-layer-network.svg` đặt ở B06).
- **Liên kết:** B04 cho phép biến đổi; B06 trừu tượng hóa thành định nghĩa.
- **Quyết định:** thêm; yêu cầu trọng số tường minh và truyền xuôi cho bốn đầu vào.
- **Hành trình:** KN2 ví dụ. **LLO/CLO:** CLO2. **Thời lượng:** 0,06 + 0,04 (điền bảng).

#### B06. Mạng nơ ron hai tầng

- **Điểm trung tâm:** Mạng hai tầng là hàm $f(x;\theta)=w_2^\top\sigma(W_1x+b_1)+b_2$ với $p=md+2m+1$ tham số, và $\sigma$ phải phi tuyến.
- **Mặt trang:** **Định nghĩa.** Cho $d,m\in\mathbb N_{>0}$, $W_1\in\mathbb R^{m\times d}$, $b_1\in\mathbb R^m$, $w_2\in\mathbb R^m$, $b_2\in\mathbb R$, $\sigma:\mathbb R\to\mathbb R$ áp theo thành phần. $f(x;\theta)=w_2^\top\sigma(W_1x+b_1)+b_2$, $\theta=(W_1,b_1,w_2,b_2)\in\mathbb R^p$, $p=md+2m+1$. **Nhận xét.** Nếu $\sigma(z)=z$ thì $f=(W_1^\top w_2)^\top x+(w_2^\top b_1+b_2)$ là affine, nên Mệnh đề 1 (XOR không tách được tuyến tính) vẫn áp dụng.
- **Ghi chú diễn giả:** B05 là trường hợp $d=m=2$, $p=9$. Thuật ngữ: đơn vị ẩn (hidden unit), tiền kích hoạt (pre-activation), truyền xuôi (forward pass). Mạng sâu lặp lại cấu trúc này; bài chỉ cần hai tầng. Ví dụ quy mô: $d=784$, $m=100$ cho $p=78\,601$.
- **Hình:** `two-layer-network.svg` (sơ đồ 2–2–1 có nhãn $W_1,b_1,w_2,b_2$, $z$, $h$, $f$).
- **Liên kết:** Kế thừa B05; B07 đặt câu hỏi về $F$ như hàm của $\theta$.
- **Quyết định:** thêm; định nghĩa có miền, kích thước theo tiêu chuẩn nội dung.
- **Hành trình:** KN2 hình thức. **LLO/CLO:** CLO2. **Thời lượng:** 0,07 + 0,00.

#### B07. Rủi ro thực nghiệm theo tham số mạng

- **Điểm trung tâm:** Mất mát lồi theo đầu ra $f$ không làm $F$ lồi theo $\theta$, vì $f$ phụ thuộc phi tuyến vào $\theta$.
- **Mặt trang:** $F(\theta)=\frac1n\sum_i\tfrac12(f(x_i;\theta)-y_i)^2$. Hai dòng đối chiếu: mô hình tuyến tính: $f$ affine theo $\theta$ ⇒ $F$ lồi (Bài 02); mạng: $f$ chứa tích $w_2\cdot W_1$ và $\sigma$ ⇒ tính lồi không còn được bảo đảm. **Ứng dụng.** Huấn luyện mạng hai đơn vị ẩn biểu diễn XOR là cực tiểu hóa $F$ trên $\mathbb R^9$ với bốn mẫu XOR; $\theta_A$ đạt $F=0$.
- **Ghi chú diễn giả:** Quy tắc hợp thành lồi của Bài 02 đòi hỏi hàm trong affine; ở đây hàm trong là $\theta\mapsto f(x_i;\theta)$, không affine. Câu hỏi còn mở: “không được bảo đảm” chưa phải “không lồi”; B08–B09 đưa phản ví dụ cụ thể. Kết luận không lồi không phụ thuộc việc chọn mất mát bình phương: với nhãn $\pm1$ và mất mát logistic $\log(1+e^{-yf})$, $F(\theta_A)=F(\theta_B)=\tfrac12\big(\log2+\log(1+e^{-1})\big)\approx0{,}503$, còn trung điểm cho $f\equiv0$ và $F=\log2\approx0{,}693$, lớn hơn trung bình hai đầu mút (Q5).
- **Hình:** không.
- **Liên kết:** Kế thừa định nghĩa B06; tạo nhu cầu cho KN3.
- **Quyết định:** thêm; tách bước “quy tắc lồi không áp dụng” khỏi bước “phản ví dụ” để không nhảy kết luận.
- **Hành trình:** KN2 ứng dụng; KN3 nhu cầu. **LLO/CLO:** LLO11; CLO1. **Thời lượng:** 0,05 + 0,00.

#### B08. Đối xứng hoán vị các đơn vị ẩn

- **Điểm trung tâm:** Đổi chỗ hai đơn vị ẩn, cùng với hàng của $W_1$, phần tử của $b_1$ và $w_2$, cho một tham số khác biểu diễn cùng một hàm.
- **Mặt trang:** **Ví dụ.** Đổi chỗ hai đơn vị của $\theta_A$: $\theta_B$ có $W_1=\begin{psmallmatrix}-1&1\\1&-1\end{psmallmatrix}$, $b_1=0$, $w_2=(1,1)$, $b_2=0$; $\theta_B\neq\theta_A$, $F(\theta_B)=0$. **Mệnh đề 2.** Với ma trận hoán vị $P\in\mathbb R^{m\times m}$: $f(x;PW_1,Pb_1,Pw_2,b_2)=f(x;W_1,b_1,w_2,b_2)$ với mọi $x$.
- **Ghi chú diễn giả:** Chứng minh: $\sigma$ áp theo thành phần nên $\sigma(Pz)=P\sigma(z)$, và $(Pw_2)^\top P\sigma(z)=w_2^\top\sigma(z)$ vì $P^\top P=I$. Một mạng $m$ đơn vị có $m!$ cách sắp xếp (DL §8.2.2, tr. 283–284, đối xứng không gian trọng số). Hệ quả cho khởi tạo: hai đơn vị khởi tạo giống hệt nhau nhận cùng cập nhật và giữ giống nhau (deck Bài 05 hiện hành, HT8); nội dung khởi tạo thuộc bài bổ trợ, chỉ nêu ở đây.
- **Hình:** không (bảng hai cột $\theta_A$, $\theta_B$).
- **Liên kết:** B07 hỏi về tính lồi; B09 dùng hai cực tiểu này.
- **Quyết định:** thêm; nguồn gốc cụ thể của nhiều cực tiểu phải được chỉ ra trước khi kết luận không lồi.
- **Hành trình:** KN3 trực quan + ví dụ. **LLO/CLO:** LLO11. **Thời lượng:** 0,06 + 0,02.

#### B09. Tính không lồi của rủi ro thực nghiệm

- **Điểm trung tâm:** Hai cực tiểu đối xứng cùng giá trị 0 mà trung điểm có $F=\tfrac14$ chứng tỏ $F$ không lồi.
- **Mặt trang:** **Mệnh đề 3.** Giả sử $F$ đạt cực tiểu toàn cục tại $\theta^*$ mà hai đơn vị ẩn có tham số khác nhau. Khi đó $P\theta^*\neq\theta^*$ cũng là cực tiểu toàn cục. Nếu $F$ lồi, mọi điểm của đoạn $[\theta^*,P\theta^*]$ là cực tiểu toàn cục. **Trên XOR.** Dọc $\theta(t)=(1-t)\theta_A+t\theta_B$: $f=\lvert1-2t\rvert\,\lvert x_1-x_2\rvert$ và $F(\theta(t))=t^2$ với $t\le\tfrac12$, $(1-t)^2$ với $t\ge\tfrac12$. Tại $t=\tfrac12$: $W_1=0$, $f\equiv0$, $F=\tfrac14>0$. Kết luận: $F$ không lồi. Dòng cuối: lớp ẩn thay cho việc tăng số đặc trưng thủ công; đổi lại, $F$ không lồi (Mệnh đề 3).
- **Ghi chú diễn giả:** Tập cực tiểu của hàm lồi là tập lồi (Bài 01). Mệnh đề 3 không khẳng định mọi mạng trên mọi dữ liệu đều không lồi; nó cho một phép kiểm tra, và trên XOR phép kiểm tra cho kết quả không lồi. Mạng tuyến tính hai tầng (bỏ $\sigma$) cũng không lồi: ví dụ D02. Đây là chi phí của giới hạn (ii) trong A03, đối xứng với chi phí $d$ ở B03.
- **Hình:** `xor-symmetric-path.svg` (đồ thị $F(\theta(t))$ trên $[0,1]$, hai cực tiểu tại $t=0,1$, đỉnh $\tfrac14$ tại $t=\tfrac12$, dây cung nối hai cực tiểu nằm dưới đồ thị).
- **Liên kết:** Dùng B08; mạch C tính gradient của $F$ này, mạch D xét gradient chứng nhận được gì khi $F$ không lồi.
- **Quyết định:** thêm; lập luận trung điểm theo yêu cầu, có đường $F(\theta(t))$ tính được tường minh.
- **Hành trình:** KN3 hình thức. **LLO/CLO:** LLO11; CLO1. **Thời lượng:** 0,08 + 0,03.

#### B10. Biểu diễn XOR và đối xứng của mạng

- **Điểm trung tâm:** Kiểm khả năng tái tạo ba kết quả của mạch trên dữ liệu mới.
- **Mặt trang:** **Câu hỏi:** (a) Tìm $w_0,\dots,w_3$ để $w_0+w_1x_1+w_2x_2+w_3x_1x_2$ khớp XOR. (b) Với $W_1=\begin{psmallmatrix}1&1\\1&1\end{psmallmatrix}$, $b_1=(0,-1)$, $w_2=(1,-2)$, $b_2=0$, tính $z,h,f$ tại bốn đầu vào. (c) Viết bản hoán đổi hai đơn vị của (b) và tính $F$ tại trung điểm. (d) Tính $p$ khi $d=784$, $m=100$.
- **Ghi chú diễn giả (đáp án):** (a) $(0,1,1,-2)$, duy nhất. (b) $z$: $(0,-1),(1,0),(1,0),(2,1)$; $h$: $(0,0),(1,0),(1,0),(2,1)$; $f$: $0,1,1,0$ (DL (6.7)–(6.11)). (c) Bản hoán đổi: $W_1$ không đổi (hai hàng bằng nhau), $b_1=(-1,0)$, $w_2=(-2,1)$; trung điểm $b_1=(-\tfrac12,-\tfrac12)$, $w_2=(-\tfrac12,-\tfrac12)$ cho $f=0,-\tfrac12,-\tfrac12,-\tfrac32$, $F=\tfrac{27}{32}$; vì $\tfrac{27}{32}>0$, ví dụ thứ hai cũng bác bỏ tính lồi. (d) $78\,601$.
- **Hình:** không.
- **Liên kết:** Khép mạch B; câu (d) chuẩn bị nhu cầu tính gradient theo $p$ tham số ở C01.
- **Quyết định:** thêm; trang kiểm tra riêng của mạch.
- **Hành trình:** KN1, KN2, KN3 bài tập. **LLO/CLO:** LLO11; CLO1, CLO2. **Thời lượng:** 0,00 + 0,20.

### Mạch C. Lan truyền ngược trên đồ thị tính toán (khối B2, phần 1)

Nhu cầu của mạch (câu hỏi B2, nửa đầu): mọi phương pháp bậc nhất cần $\nabla F(\theta)\in\mathbb R^p$; chi phí tính nó quyết định phương pháp có dùng được không.

#### C01. Chi phí của gradient theo mọi tham số

- **Điểm trung tâm:** Sai phân hữu hạn cần $p+1$ lần truyền xuôi cho một gradient, quá đắt khi $p$ lớn.
- **Mặt trang:** $\partial\ell/\partial\theta_j\approx[\ell(\theta+\varepsilon e_j)-\ell(\theta)]/\varepsilon$, $j=1,\dots,p$: $p+1$ lần truyền xuôi, mỗi lần cỡ $p$ phép nhân–cộng, tổng cỡ $p^2$. Ví dụ $p=78\,601$ với $d=784$, $m=100$. Mục tiêu: gradient chính xác với chi phí cùng bậc một lần truyền xuôi.
- **Ghi chú diễn giả:** Sai phân còn có sai số làm tròn và sai số cắt. Gradient đầy đủ của $F$ nhân thêm $n$ (dùng lại ở E01).
- **Hình:** không.
- **Liên kết:** Nhận $p$ từ B10; C02 xây đồ thị để dùng lại các giá trị trung gian.
- **Quyết định:** thêm; nhu cầu phải xuất phát từ một chi phí đo được.
- **Hành trình:** KN4 nhu cầu. **LLO/CLO:** LLO11 (độ sâu đồ thị tính toán); CLO1. **Thời lượng:** 0,05 + 0,00.

#### C02. Đồ thị tính toán và truyền xuôi

- **Điểm trung tâm:** Truyền xuôi tính và lưu các giá trị trung gian $z,h,f,\ell$ trên đồ thị tính toán.
- **Mặt trang:** **Ví dụ.** Một mẫu $x=(1,1)$, $y=0$. $W_1=\begin{psmallmatrix}1&\tfrac12\\\tfrac12&-1\end{psmallmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$. Đồ thị $x\to z\to h\to f\to\ell$ với giá trị: $z=(1,\tfrac12)$, $h=(1,\tfrac12)$, $f=\tfrac12$, $\ell=\tfrac18$.
- **Ghi chú diễn giả:** Đồ thị tính toán (computational graph): nút là đại lượng, cạnh là phép toán (DL §6.5.1, tr. 205). Cả hai đơn vị hoạt động ($z>0$), nên không gặp điểm gãy. Ghi nhớ: các giá trị $z,h$ phải được lưu cho bước ngược. Lưu ý cho bài tập về sau: với tham số này, đầu vào $(0,1)$ cho $z=(0,0)$, nằm đúng điểm gãy.
- **Hình:** `backprop-forward.svg` (đồ thị 2–2–1, giá trị truyền xuôi trên nút); bản cho màn hẹp `backprop-forward-narrow.svg` (chuỗi nút xếp dọc).
- **Liên kết:** C01 đặt nhu cầu; C03 đi ngược trên cùng đồ thị.
- **Quyết định:** thêm; gộp trực quan (đồ thị) với phần truyền xuôi của ví dụ vì cùng một luận điểm.
- **Hành trình:** KN4 trực quan + ví dụ (phần xuôi). **LLO/CLO:** CLO1. **Thời lượng:** 0,06 + 0,02.

#### C03. Truyền ngược trên ví dụ

- **Điểm trung tâm:** Đi từ $\ell$ về $\theta$, mỗi đạo hàm là tích của đạo hàm phía sau với một đạo hàm cục bộ đã có từ truyền xuôi.
- **Mặt trang:** Hình truyền ngược ghi $e=f-y=\tfrac12$, $\delta_h=e\,w_2=(\tfrac12,-1)$, $\delta_z=\delta_h\odot\sigma'(z)=(\tfrac12,-1)$ và gradient theo $b_2$ ($e=\tfrac12$), $w_2$ ($e\,h=(\tfrac12,\tfrac14)$), $b_1$ ($\delta_z$), $W_1$ ($\delta_zx^\top$); một dòng dưới hình: $\nabla_{W_1}\ell=\delta_zx^\top=\begin{psmallmatrix}\tfrac12&\tfrac12\\-1&-1\end{psmallmatrix}$. **Kiểm.** Sai phân trung tâm theo $[W_1]_{22}$ với $\varepsilon=10^{-3}$ cho đúng $-1$. (Dựng deck 2026-10-12: bảng bảy dòng thay bằng hình cộng một dòng vì bảng và hình cùng trang vượt khung 16:9; giá trị không đổi.)
- **Ghi chú diễn giả:** $\lVert\nabla\ell\rVert^2=\tfrac{69}{16}$. Mỗi dòng dùng một kết quả của dòng trên; không dòng nào tính lại truyền xuôi. Sai phân trung tâm cho đúng $-1$ vì $\ell$ là hàm bậc hai theo riêng $[W_1]_{22}$ tại điểm khả vi này.
- **Hình:** `backprop-backward.svg` (cùng đồ thị, giá trị $\delta$ trên cạnh, khác kiểu nét với truyền xuôi, không chỉ khác màu); bản cho màn hẹp `backprop-backward-narrow.svg`.
- **Liên kết:** Dùng giá trị C02; C04 viết thành thuật toán tổng quát.
- **Quyết định:** thêm; yêu cầu ví dụ số đầy đủ mọi đại lượng trung gian.
- **Hành trình:** KN4 ví dụ (phần ngược). **LLO/CLO:** CLO1. **Thời lượng:** 0,07 + 0,03.

#### C04. Thuật toán lan truyền ngược

- **Điểm trung tâm:** Lan truyền ngược (backpropagation) là quy tắc dây chuyền áp theo thứ tự ngược của đồ thị, nhân Jacobian chuyển vị với vector.
- **Mặt trang:** **Thuật toán** (một mẫu, mạng hai tầng). Đầu vào: $x,y,\theta$. Truyền xuôi: $z=W_1x+b_1$, $h=\sigma(z)$, $f=w_2^\top h+b_2$, lưu $z,h$. Truyền ngược: $e=\partial\ell/\partial f$; $\nabla_{b_2}=e$; $\nabla_{w_2}=e\,h$; $\delta_z=\sigma'(z)\odot(e\,w_2)$, với quy ước $\sigma'(0)=0$; $\nabla_{W_1}=\delta_z x^\top$; $\nabla_{b_1}=\delta_z$. Đầu ra: $\nabla_\theta\ell(\theta)\in\mathbb R^p$ tại mọi $\theta$ không có tiền kích hoạt bằng 0. Dạng tổng quát: $\delta_{\text{trước}}=J^\top\delta_{\text{sau}}$.
- **Ghi chú diễn giả:** Bài 00 đã có $\nabla(g\circ r)=J_r^\top\nabla g$; ở đây áp lần lượt cho $f\to h\to z$. Gradient của $F$ là trung bình gradient các mẫu. Phân biệt: lan truyền ngược tính gradient, không phải thuật toán tối ưu (DL §6.5, tr. 204). Vector thu được bằng gradient tại mọi điểm $F$ khả vi; tại điểm gãy, quy ước $\sigma'(0)=0$ chỉ là một quy ước tính toán, và vector thu được nói chung không phải gradient (ví dụ $\sigma(z)-\sigma(-z)=z$ có đạo hàm 1 tại 0, còn lan truyền ngược với quy ước này cho 0). Các ví dụ của bài tránh điểm gãy.
- **Hình:** không (giả mã HTML).
- **Liên kết:** Tổng quát hóa C03; C05 đếm chi phí.
- **Quyết định:** thêm; thuật toán phải có đầu vào, đầu ra và điều kiện.
- **Hành trình:** KN4 hình thức. **LLO/CLO:** LLO11; CLO1. **Thời lượng:** 0,08 + 0,00.

#### C05. Chi phí của lan truyền ngược

- **Điểm trung tâm:** Truyền ngược tốn cùng bậc phép tính với truyền xuôi, nên gradient của một mẫu tốn cỡ $O(p)$ thay vì $O(p^2)$.
- **Mặt trang:** Đếm phép nhân cho mạng hai tầng: truyền xuôi $md+m$; truyền ngược $md+2m$ (gồm $\nabla_{w_2}$, $e\,w_2$, $\nabla_{W_1}$; nhân với $\sigma'\in\{0,1\}$ chỉ là chọn). Với $d=784$, $m=100$: $78\,500$ và $78\,600$. So sánh: sai phân hữu hạn $p+1=78\,602$ lần truyền xuôi. **Nhận xét.** Bộ nhớ: phải lưu $z$ (và $h$) của mỗi mẫu trong nhóm, cỡ $O(bm)$.
- **Ghi chú diễn giả:** DL tr. 209 (Thuật toán 6.2: chi phí tỉ lệ số cạnh, cùng bậc với truyền xuôi) và tr. 220–221 (với MLP: $O(w)$ phép nhân–cộng cho cả hai chiều, $w$ là số trọng số). Hằng số chính xác phụ thuộc cách cài đặt; bài chỉ dùng kết luận cùng bậc. Gradient đầy đủ của $F$ vì vậy tốn $O(np)$, con số dùng ở E01.
- **Hình:** không (bảng HTML).
- **Liên kết:** C04 cho thuật toán; C06 dùng gradient để thực hiện một bước.
- **Quyết định:** thêm; yêu cầu “chi phí lan truyền ngược ≈ hằng số × truyền xuôi”.
- **Hành trình:** KN4 ứng dụng (phân tích độ phức tạp). **LLO/CLO:** CLO1, CLO4. **Thời lượng:** 0,05 + 0,01.

#### C06. Một bước hạ gradient trên mạng

- **Điểm trung tâm:** Cùng một gradient, bước $\eta=0{,}02$ giảm mất mát còn bước $\eta=0{,}25$ làm mất mát tăng; độ dài bước phải gắn với độ cong.
- **Mặt trang:** Với mạng và gradient của ví dụ đồ thị tính toán, $\theta^+=\theta-\eta\nabla\ell$. $\eta=0{,}02$: $W_1=\begin{psmallmatrix}0{,}99&0{,}49\\0{,}52&-0{,}98\end{psmallmatrix}$, $b_1=(-0{,}51;\,1{,}02)$, $w_2=(0{,}99;\,-2{,}005)$, $b_2=0{,}49$; $z=(0{,}97;\,0{,}56)$, $f=0{,}3275$, $\ell=0{,}0536$ (giảm từ $0{,}125$). $\eta=0{,}25$: $f=-\tfrac{53}{32}$, $\ell=\tfrac{2809}{2048}\approx1{,}372$ (tăng).
- **Ghi chú diễn giả:** Xấp xỉ bậc nhất dự báo giảm $\eta\lVert\nabla\ell\rVert^2=0{,}02\cdot\tfrac{69}{16}=0{,}08625$; giảm thực tế $0{,}0714$. Với $\eta=0{,}25$ xấp xỉ bậc nhất không còn đúng. Bài 04 đã có điều kiện $\eta\le1/L$; D04 phát biểu lại cho trường hợp không lồi. Với $\eta=0{,}5$, $\ell=\tfrac{3721}{512}\approx7{,}27$ (chỉ ghi chú).
- **Hình:** không.
- **Liên kết:** Gradient từ C03; câu hỏi “bước nào luôn giảm, và giảm tới đâu” dẫn sang mạch D.
- **Quyết định:** thêm; ứng dụng phải dùng chính gradient vừa tính.
- **Hành trình:** KN4 ứng dụng; KN6 nhu cầu. **LLO/CLO:** LLO12 (một phần); CLO1. **Thời lượng:** 0,05 + 0,02.

#### C07. Lan truyền ngược khi một đơn vị không hoạt động

- **Điểm trung tâm:** Kiểm thuật toán trên một mẫu có đơn vị ẩn không hoạt động.
- **Mặt trang:** **Câu hỏi:** Cùng mạng của ví dụ đồ thị tính toán, mẫu $x=(0,0)$, $y=0$. (a) Tính $z,h,f,\ell$. (b) Tính $\nabla_{b_2},\nabla_{w_2},\delta_z,\nabla_{W_1},\nabla_{b_1}$. (c) Giải thích vì sao hàng một của $\nabla_{W_1}$ và $[\nabla_{b_1}]_1$ bằng 0, và vì sao cả $\nabla_{W_1}$ bằng 0. (d) Với $x=(0,1)$, xác định tiền kích hoạt và nêu quy ước cần dùng.
- **Ghi chú diễn giả (đáp án):** (a) $z=(-\tfrac12,1)$, $h=(0,1)$, $f=-\tfrac32$, $\ell=\tfrac98$. (b) $e=-\tfrac32$; $\nabla_{b_2}=-\tfrac32$; $\nabla_{w_2}=(0,-\tfrac32)$; $e\,w_2=(-\tfrac32,3)$; $\delta_z=(0,3)$; $\nabla_{W_1}=\delta_zx^\top=0$; $\nabla_{b_1}=(0,3)$. (c) Đơn vị 1 có $z_1<0$ nên $\sigma'(z_1)=0$ chặn tín hiệu; $x=0$ làm mọi $\partial\ell/\partial[W_1]_{ji}=\delta_{z,j}x_i$ bằng 0. (d) $z=(0,0)$: cả hai đơn vị ở điểm gãy; với $\sigma'(0)=0$ thì $\delta_z=0$.
- **Hình:** không.
- **Liên kết:** Khép mạch C; điểm gãy và gradient bằng 0 cục bộ là chỗ nối sang câu hỏi “gradient bằng 0 nghĩa là gì” ở D01.
- **Quyết định:** thêm; trang kiểm tra riêng của mạch.
- **Hành trình:** KN4 bài tập. **LLO/CLO:** CLO1. **Thời lượng:** 0,00 + 0,06.

### Mạch D. Điểm dừng và bảo đảm của gradient khi không lồi (khối B2, phần 2)

Nhu cầu của mạch (câu hỏi B2, nửa sau): khi $F$ không lồi, cần biết gradient bằng 0 hay gradient nhỏ chứng nhận được điều gì.

#### D01. Điểm dừng khi mục tiêu không lồi

- **Điểm trung tâm:** Với $F$ lồi, $\nabla F(\theta)=0$ chứng nhận cực tiểu toàn cục; khi $F$ không lồi, nó chỉ chứng nhận một điểm dừng.
- **Mặt trang:** **Định nghĩa.** $\theta$ là điểm dừng (stationary point) nếu $\nabla F(\theta)=0$; là điểm dừng $\varepsilon$-xấp xỉ nếu $\lVert\nabla F(\theta)\rVert\le\varepsilon$. Điểm dừng có thể là cực tiểu địa phương, cực đại địa phương hoặc điểm yên ngựa (saddle point: điểm dừng không là cực trị địa phương). Đối chiếu: Bài 02, 04: lồi + khả vi ⇒ điểm dừng là cực tiểu toàn cục.
- **Ghi chú diễn giả:** Điều kiện bậc nhất cần cho cực tiểu địa phương vẫn đúng; chỉ chiều ngược lại mất đi. B09 đã cho thấy cực tiểu toàn cục không duy nhất. Tiêu chí dừng $\lVert\nabla F\rVert\le\varepsilon$ của Bài 04 vẫn được dùng, nhưng ý nghĩa của nó thay đổi.
- **Hình:** không.
- **Liên kết:** Từ C06–C07 (gradient có thể bằng 0 cục bộ); D02 cho ví dụ có cả ba loại hiện tượng.
- **Quyết định:** thêm; nhu cầu và định nghĩa phải đi trước phân loại.
- **Hành trình:** KN5 nhu cầu + hình thức (định nghĩa). **LLO/CLO:** LLO11; CLO1. **Thời lượng:** 0,05 + 0,00.

#### D02. Mạng tuyến tính một đơn vị: điểm yên ngựa và cực tiểu đối xứng

- **Điểm trung tâm:** Mạng $f(x;u,v)=v\,u\,x$ trên một mẫu cho một hàm hai biến có điểm yên ngựa tại gốc và một đường cực tiểu đối xứng.
- **Mặt trang:** **Ví dụ.** Mẫu $x=1$, $y=1$: $F(u,v)=\tfrac12(uv-1)^2$. $\nabla F=\big((uv-1)v,\,(uv-1)u\big)$; $\nabla^2F=\begin{psmallmatrix}v^2&2uv-1\\2uv-1&u^2\end{psmallmatrix}$. Tại $(0,0)$: $F=\tfrac12$, $\nabla F=0$, $\nabla^2F=\begin{psmallmatrix}0&-1\\-1&0\end{psmallmatrix}$, trị riêng $\pm1$: điểm yên ngựa. Tập cực tiểu $\{uv=1\}$, $F=0$; $(1,1)$ và $(-1,-1)$ đối xứng qua $(u,v)\mapsto(-u,-v)$, trung điểm $(0,0)$ có $F=\tfrac12$. Hình đường mức.
- **Ghi chú diễn giả:** Đây là mạng hai tầng với $d=m=1$, $\sigma(z)=z$, không độ lệch: không lồi chỉ do tích tham số, không cần ReLU. Đối xứng ở đây là đổi dấu và co giãn $(u,v)\mapsto(cu,v/c)$, tương ứng với đối xứng co giãn của mạng ReLU (DL §8.2.2, tr. 284). Tại $(1,1)$: trị riêng $0$ và $2$; trị riêng 0 ứng với hướng dọc đường cực tiểu.
- **Hình:** `product-landscape.svg` (đường mức $F(u,v)$ trên $[-2,2]^2$, hyperbol $uv=1$, gốc đánh dấu yên ngựa, hai điểm $(\pm1,\pm1)$).
- **Liên kết:** Thể hiện cả ba khái niệm D01; D03 cho công cụ phân loại tổng quát.
- **Quyết định:** thêm; ví dụ 2 chiều có trị riêng Hessian theo yêu cầu, gắn trực tiếp với mạng.
- **Hành trình:** KN5 trực quan + ví dụ; KN3 ứng dụng. **LLO/CLO:** LLO11. **Thời lượng:** 0,06 + 0,03.

#### D03. Phân loại điểm dừng bằng Hessian

- **Điểm trung tâm:** Trị riêng của Hessian tại điểm dừng phân loại được cực tiểu chặt và điểm yên ngựa, nhưng không quyết định khi có trị riêng bằng 0.
- **Mặt trang:** **Mệnh đề** (nhắc lại Bài 00). $F\in C^2$, $\nabla F(\theta)=0$. (i) $\nabla^2F(\theta)\succ0$ ⇒ cực tiểu địa phương chặt. (ii) $\nabla^2F(\theta)$ có trị riêng âm và trị riêng dương ⇒ điểm yên ngựa. (iii) Cực tiểu địa phương ⇒ $\nabla^2F(\theta)\succeq0$ (điều kiện cần). Áp vào ví dụ mạng tuyến tính một đơn vị: $(0,0)$ thuộc (ii); $(1,1)$ có trị riêng $0,2$: phép kiểm tra không kết luận, dù đó là cực tiểu toàn cục.
- **Ghi chú diễn giả:** Chứng minh phác qua khai triển Taylor bậc hai (Bài 00): $F(\theta+s)=F(\theta)+\tfrac12s^\top\nabla^2F(\theta)s+o(\lVert s\rVert^2)$. Với mạng thật, Hessian có $p^2$ phần tử ($p=78\,601$ cho $6{,}2\cdot10^9$ phần tử), nên phép phân loại này chỉ là công cụ phân tích, không là quy tắc dừng thực hành. Đường cực tiểu không cô lập làm trị riêng 0 xuất hiện thường xuyên trong mạng có đối xứng.
- **Hình:** không.
- **Liên kết:** D02 cho số; giới hạn “không tính được Hessian ở quy mô lớn” tạo nhu cầu cho bảo đảm chỉ dùng gradient ở D04.
- **Quyết định:** thêm; tách công cụ phân loại khỏi ví dụ để một trang một luận điểm.
- **Hành trình:** KN5 hình thức. **LLO/CLO:** LLO11; CLO1. **Thời lượng:** 0,05 + 0,01.

#### D04. Bổ đề giảm khi không lồi

- **Điểm trung tâm:** Bổ đề giảm chỉ dùng tính trơn, không dùng tính lồi, nên mỗi bước $\eta\le1/L$ vẫn giảm $F$ ít nhất $\tfrac{\eta}{2}\lVert\nabla F\rVert^2$.
- **Mặt trang:** **Bổ đề** (Bài 04; 05b, bổ đề giảm). Nếu $\nabla F$ là $L$-Lipschitz trên một tập lồi chứa $\theta$ và $\theta-\eta\nabla F(\theta)$, thì $F(\theta-\eta\nabla F(\theta))\le F(\theta)-\eta\big(1-\tfrac{L\eta}{2}\big)\lVert\nabla F(\theta)\rVert^2$. Với $\eta=1/L$: giảm ít nhất $\lVert\nabla F\rVert^2/(2L)$. **Trên ví dụ mạng tuyến tính một đơn vị**, vùng $[0,1]^2$, $L=2$, $\theta_0=(\tfrac12,\tfrac12)$: $\lVert\nabla F\rVert^2=0{,}28125$, bảo đảm giảm $\ge0{,}0703$; thực tế $F$: $0{,}28125\to0{,}13905$ (giảm $0{,}1422$).
- **Ghi chú diễn giả:** Chứng minh ở Bài 04 (cận trên bậc hai) và Bài 05b, phần B (cận trên bậc hai BĐ1, rồi bổ đề giảm) không dùng H1. Với D02, $\max\lVert\nabla^2F\rVert$ trên $[0,1]^2$ bằng 2, đạt tại $(1,1)$; trên $[-1,1]^2$ là 4, trên $[-2,2]^2$ là 13: $L$ toàn cục không tồn tại. Với hàm kích hoạt trơn hoặc mạng tuyến tính như D02, chính quy hóa $\ell_2$ (A2) làm tập mức bị chặn, nên tồn tại $L$ trên tập mức; với ReLU thì không, vì $\nabla F$ gián đoạn tại điểm gãy. Đối chiếu C06: với $\eta\le2/L$ bổ đề cho $F$ không tăng; bước $0{,}25$ ở C06 làm mất mát tăng, nên trên đoạn nối $\theta$ và $\theta-0{,}25\nabla\ell$ hằng số Lipschitz của gradient phải lớn hơn $2/0{,}25=8$; dọc đoạn này mọi tiền kích hoạt của mẫu $(1,1)$ đều $\ge\tfrac12$, nên $\ell$ trơn dọc đoạn và lập luận hợp lệ.
- **Hình:** `descent-bound-product.svg` (hàm $\varphi(\eta)=F(\theta_0-\eta\nabla F(\theta_0))$ trên $[0,1]$ và parabol chặn trên $F(\theta_0)-\eta\lVert g\rVert^2+\tfrac{L\eta^2}{2}\lVert g\rVert^2$ với $L=2$; điểm $\eta=\tfrac12$).
- **Liên kết:** Nhận $L$-trơn từ Bài 04; D05 cộng bất đẳng thức này theo $k$.
- **Quyết định:** thêm; yêu cầu “bổ đề giảm vẫn cho giảm mỗi bước”.
- **Hành trình:** KN6 nhu cầu + hình thức (bổ đề) + ví dụ. **LLO/CLO:** CLO1. **Thời lượng:** 0,05 + 0,00.

#### D05. Hội tụ của chuẩn gradient

- **Điểm trung tâm:** Không cần lồi, hạ gradient bước $1/L$ bảo đảm $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le2L\Delta_0/K$; đây là bảo đảm về điểm dừng mà hạ gradient cho khi không lồi.
- **Mặt trang:** **Định lý (T7, Bài 05b).** Giả thiết H0; H2 trên một tập lồi chứa mọi dãy lặp; $\theta_0$ cho trước; $\theta_{k+1}=\theta_k-\tfrac1L\nabla F(\theta_k)$. Kết luận: $\min_{0\le k<K}\lVert\nabla F(\theta_k)\rVert^2\le\dfrac{2L\Delta_0}{K}$, $\Delta_0=F(\theta_0)-F_{\inf}$. Chứng minh một dòng: cộng bổ đề giảm, $\tfrac1{2L}\sum_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le F(\theta_0)-F(\theta_K)\le\Delta_0$. **Không khẳng định:** $\theta_k$ hội tụ; điểm giới hạn là cực tiểu; giá trị $F$ gần $F_{\inf}$. **Phạm vi:** mạng có hàm kích hoạt trơn hoặc mạng tuyến tính; với ReLU, $\nabla F$ gián đoạn tại điểm gãy, cận chỉ dùng làm định hướng.
- **Ghi chú diễn giả:** Tốc độ $O(1/K)$ cho bình phương chuẩn, tức $O(1/\sqrt K)$ cho chuẩn. Dẫn đúng nhãn: 05b, mạch F, trang F03, định lý T7. Không chứng minh lại. H2 chỉ đúng trên vùng, nên cần dãy lặp ở trong vùng (đúng với ví dụ D06). Với ReLU, H2 không đúng trên vùng nào chứa điểm gãy vì $\nabla F$ gián đoạn.
- **Hình:** không.
- **Liên kết:** D04 → D05; D06 cho thấy điểm được chứng nhận có thể nằm gần điểm yên ngựa.
- **Quyết định:** thêm; yêu cầu dẫn T7 với nhãn và phát biểu lại.
- **Hành trình:** KN6 hình thức. **LLO/CLO:** CLO1. **Thời lượng:** 0,06 + 0,00.

#### D06. Bình nguyên gần điểm yên ngựa

- **Điểm trung tâm:** Gradient nhỏ có thể xuất hiện xa cực tiểu: từ gần điểm yên ngựa, hạ gradient đứng gần như yên nhiều bước trước khi thoát.
- **Mặt trang:** Ví dụ mạng tuyến tính một đơn vị với $\theta_0=(0{,}01;\,0{,}01)$, $\eta=\tfrac12$. Trên đường chéo $u=v=t$: $t_{k+1}=t_k+\tfrac12t_k(1-t_k^2)$. Dòng bốn giá trị (dựng deck 2026-10-12, thay cho bảng) cùng hình: $k=0$: $F=0{,}4999$, $\lVert\nabla F\rVert^2=2{,}0\cdot10^{-4}$; $k=5$: $t=0{,}0758$, $F=0{,}4943$; $k=10$: $t=0{,}529$, $F=0{,}259$; $k=13$: $t=0{,}984$, $F=5{,}3\cdot10^{-4}$; $k=15$: $t\approx1$. Với $\varepsilon^2=2\cdot10^{-4}$, $\theta_0$ đã là điểm dừng $\varepsilon$-xấp xỉ trong khi $F(\theta_0)\approx0{,}4999$, gần giá trị tại điểm yên ngựa.
- **Ghi chú diễn giả:** Dãy nằm trong $[0,1]^2$ (hàm $t\mapsto t+\tfrac12t(1-t^2)$ tăng trên $[0,1]$ và giữ $[0,1]$), nên $L=2$ hợp lệ. Từ đúng $(0,0)$, hạ gradient đứng yên mãi. Bình nguyên (plateau) và điểm yên ngựa: DL §8.2.3, tr. 285–287. T7 chứng nhận “có một bước có gradient nhỏ”, và bước đó có thể là $k=0$.
- **Hình:** `saddle-plateau.svg`, bản cho màn hẹp `saddle-plateau-narrow.svg` (hai đồ thị xếp dọc) (hai đồ thị theo $k=0..15$: $F(\theta_k)$ và $\lVert\nabla F(\theta_k)\rVert^2$ thang logarit; dữ liệu mục 8.4).
- **Liên kết:** Ứng dụng D05 cho thấy giới hạn của chứng nhận; D07 kiểm. Ở E, gradient đầy đủ được thay bằng gradient nhóm.
- **Quyết định:** thêm; cần một phép tính chứng tỏ điểm dừng xấp xỉ không phải cực tiểu.
- **Hành trình:** KN5 ứng dụng; KN6 ứng dụng. **LLO/CLO:** LLO11; CLO1. **Thời lượng:** 0,05 + 0,02.

#### D07. Phân loại điểm dừng và số bước theo T7

- **Điểm trung tâm:** Kiểm phân loại điểm dừng và đọc cận T7.
- **Mặt trang:** **Câu hỏi:** Với $F(u,v)=\tfrac12(uv-1)^2$: (a) Xác định mọi điểm dừng. (b) Tính Hessian tại $(2,\tfrac12)$, các trị riêng, và kết luận phép kiểm tra bậc hai. (c) Với $L=2$, $\theta_0=(\tfrac12,\tfrac12)$, tìm $K$ nhỏ nhất để cận T7 bảo đảm $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le0{,}01$; so với bảng thực tế. (d) Nêu một kết luận mà T7 không cho.
- **Ghi chú diễn giả (đáp án):** (a) $(0,0)$ và mọi điểm $uv=1$. (b) $\begin{psmallmatrix}0{,}25&1\\1&4\end{psmallmatrix}$, trị riêng $0$ và $4{,}25$; không kết luận được bằng phép kiểm tra, nhưng $F=0$ là cực tiểu toàn cục. (c) $\Delta_0=0{,}28125$, $K\ge2\cdot2\cdot0{,}28125/0{,}01=112{,}5$, $K=113$; thực tế $\lVert\nabla F(\theta_3)\rVert^2=0{,}0045$, tức $K=4$ đã đủ. (d) Ví dụ: không cho biết $\theta_k$ tới cực tiểu nào, không chặn $F(\theta_k)-0$.
- **Hình:** không.
- **Liên kết:** Khép mạch D và khối B2.
- **Quyết định:** thêm; trang kiểm tra riêng của mạch.
- **Hành trình:** KN5, KN6 bài tập. **LLO/CLO:** LLO11; CLO1. **Thời lượng:** 0,00 + 0,12.

### Mạch E. Gradient nhóm nhỏ và chi phí mỗi bước (khối B3, phần 1)

Nhu cầu của mạch (câu hỏi B3, nửa đầu): T7 cần $\nabla F(\theta_k)$ ở mỗi bước, chi phí $O(np)$; cần biết bỏ gradient đầy đủ thì mất gì.

#### E01. Chi phí một bước của ba phương pháp ở ba quy mô

- **Điểm trung tâm:** Ở quy mô lớn, ngay một bước gradient đầy đủ cũng vượt ngân sách; một bước Newton không thực hiện được.
- **Mặt trang:** Bảng (đơn vị: phép nhân–cộng; giả định máy $10^{12}$ phép mỗi giây): $(n,p,b)=(10^3,10^2,10)$: GD $10^5$; Newton $1{,}1\cdot10^7$; SGD $10^3$. $(10^5,10^5,100)$: GD $10^{10}$ (0,01 s); Newton $2\cdot10^{15}$ (2000 s); SGD $10^7$. $(10^9,10^9,10^3)$: GD $10^{18}$ ($10^6$ s ≈ 11,6 ngày); Newton $2\cdot10^{27}$ (≈ $6{,}3\cdot10^7$ năm); SGD $10^{12}$ (1 s). **Lý do tính toán** (chi phí, giới hạn (i)).
- **Ghi chú diễn giả:** Mô hình chi phí: GD $np$ (C05), Newton $np^2+p^3$ (khối A3 của Bài 05, Bài 04), SGD $bp$; bỏ hằng số, không tính song song. Bảng chỉ so chi phí một bước; số bước của Newton vẫn phụ thuộc các hằng số Hessian $m_H,M_H,L_H$ qua giai đoạn tắt dần (Bài 05 CP05), nên không viết Newton “không phụ thuộc $\kappa$”. Ma trận Hessian ở quy mô ba cần $8\cdot10^{18}$ byte với số 8 byte, cùng quy ước với bảng chi phí ba quy mô của Bài 05 (sửa 2026-10-12). Một lượt dữ liệu (epoch) tốn $np$ cho cả GD (một cập nhật) và SGD ($n/b$ cập nhật). Quy mô là minh họa, không gán cho một mô hình cụ thể.
- **Hình:** không (bảng HTML).
- **Liên kết:** Giới hạn (i) của A03 có số cụ thể; E02 nêu lý do thứ hai.
- **Quyết định:** thêm; yêu cầu so sánh chi phí ba quy mô và luận đề “bị buộc bởi chi phí”.
- **Hành trình:** KN7 nhu cầu. **LLO/CLO:** LLO11, LLO15 (chi phí Newton); CLO4. **Thời lượng:** 0,06 + 0,01.

#### E02. Rủi ro thực nghiệm như đại lượng thay thế

- **Điểm trung tâm:** Tại $\theta$ cố định, $F$ ước lượng $R$ với sai số cỡ $1/\sqrt n$ (05c.52); theo Bottou–Bousquet, với bài toán lồi, giảm sai số tối ưu dưới sai số ước lượng không làm thay đổi bậc của cận sai số dư.
- **Mặt trang:** Hai cột. Trái: Định lý 05c.52 (thêm “mất mát có phương sai hữu hạn”); lý do thống kê kèm Bottou–Bousquet. Phải: số liệu SNW Bảng 13.3, máy vector hỗ trợ (SVM), mất mát bản lề (hinge loss), bảng ba phương pháp × (thời gian, mục tiêu, lỗi kiểm thử): SVMLight 23 642 s, 0,2275, 6,02 %; SVMPerf 66 s, 0,2278, 6,03 %; SGD 1,4 s, 0,2275, 6,02 %; dòng kết luận “lỗi kiểm thử gần như nhau trong khi thời gian chênh bốn bậc”. Phần nhắc Bài 05 chuyển vào ghi chú. (bản sau vòng rà soát năm vai, 2026-10-12)
- **Ghi chú diễn giả:** Bottou và Bousquet tách sai số dư thành xấp xỉ, ước lượng và tối ưu (05c Nhận xét 05c.58; SNW §13.2.3, tr. 354–355): với bài toán lồi, khi thời gian là ràng buộc chính, giảm sai số tối ưu dưới bậc sai số ước lượng không cải thiện bậc của cận. Thí nghiệm RCV1 dùng bước $\eta_t=1/(\lambda(t+t_0))$: đúng dạng bước của T6, với $\lambda$ là hệ số chính quy hóa $\ell_2$ đóng vai $\mu$ (A2). Một thí nghiệm không chứng minh quy luật chung; trang dùng nó như minh họa có nguồn. Phân chia nguồn với Bài 05 (quyết định của điều phối viên): E02 trình bày các hàng mất mát bản lề (hinge loss) của Bảng 13.3; các hàng mất mát logistic (TRON 30 s / 44 s, SGD 2,3 s) được trình bày ở Bài 05 KL02, ghi chú E02 chỉ dẫn tới KL02.
- **Hình:** không.
- **Liên kết:** Kết hợp với E01 thành luận đề; Định lý 05c.52 chỉ áp dụng tại $\theta$ cố định, nên trang không khẳng định cực tiểu chính xác “không cải thiện $R$”. E03 xét điều gì xảy ra khi thay gradient đầy đủ bằng gradient nhóm.
- **Quyết định:** thêm; luận đề yêu cầu lý do thứ hai được nêu lại với số liệu.
- **Hành trình:** KN7 nhu cầu; KN9 nhu cầu. **LLO/CLO:** LLO11; CLO1. **Thời lượng:** 0,06 + 0,00.

#### E03. Gradient nhóm nhỏ trên dữ liệu bốn điểm

- **Điểm trung tâm:** Sáu nhóm hai mẫu cho sáu gradient khác nhau, trung bình đúng bằng gradient đầy đủ; một nhóm làm $F$ tăng sau bước cập nhật.
- **Mặt trang:** **Ví dụ.** $x=(-1,0,1,2)$, $y=(1,0,1,4)$, $f(x;w,c)=wx+c$, $\theta_0=(0,0)$, $F(\theta_0)=\tfrac94$. Gradient mẫu $\nabla\ell_i=(wx_i+c-y_i)(x_i,1)$: $(1,-1),(0,0),(-1,-1),(-8,-4)$; $\nabla F(\theta_0)=(-2;\,-1{,}5)$. Bảng sáu nhóm $b=2$, $\eta=\tfrac14$: $\{1,2\}$: $\widehat g=(\tfrac12,-\tfrac12)$, $F(\theta_1)=2{,}324$; $\{1,3\}$: $(0,-1)$, $1{,}906$; $\{1,4\}$: $(-\tfrac72,-\tfrac52)$, $0{,}605$; $\{2,3\}$: $(-\tfrac12,-\tfrac12)$, $1{,}840$; $\{2,4\}$: $(-4,-2)$, $0{,}625$; $\{3,4\}$: $(-\tfrac92,-\tfrac52)$, $0{,}559$. Trung bình $\widehat g$: $(-2;\,-1{,}5)$. Bước đầy đủ: $\theta=(\tfrac12,\tfrac38)$, $F=1{,}039$.
- **Ghi chú diễn giả:** Nghiệm $\theta^*=(1,1)$, $F^*=\tfrac12$; Hessian $\begin{psmallmatrix}1{,}5&0{,}5\\0{,}5&1\end{psmallmatrix}$, $\mu\approx0{,}691$, $L\approx1{,}809$, $\kappa\approx2{,}62$; $\eta=\tfrac14\le1/L$. Kỳ vọng của $F(\theta_1)$ theo sáu nhóm là $\tfrac{503}{384}\approx1{,}310$, lớn hơn $1{,}039$ của bước đầy đủ: nhiễu làm giảm kỳ vọng ít hơn, đổi lại mỗi bước chỉ dùng hai gradient mẫu thay vì bốn. Hệ số chặn viết $c$ vì $b$ là kích thước nhóm.
- **Hình:** `batch-gradients.svg` (mặt phẳng gradient: sáu mũi tên $\widehat g$ của sáu nhóm, mũi tên $\nabla F(\theta_0)$ đậm tại trọng tâm; dữ liệu bảng trên).
- **Liên kết:** E01–E02 cho lý do; E04 phát biểu tổng quát tính không chệch và phương sai.
- **Quyết định:** thêm; yêu cầu một bước số trên 3–4 điểm với $b=2$; ví dụ đặt trước phát biểu hình thức.
- **Hành trình:** KN7 trực quan + ví dụ. **LLO/CLO:** LLO12; CLO1. **Thời lượng:** 0,06 + 0,03.

#### E04. Tính không chệch và phương sai của gradient nhóm

- **Điểm trung tâm:** Gradient nhóm chọn đều là ước lượng không chệch của $\nabla F(\theta)$ với sai số bình phương trung bình $\operatorname{tr}\Sigma(\theta)/b$, nhân $\tfrac{n-b}{n-1}$ khi chọn không hoàn lại.
- **Mặt trang:** **Định lý 05c.53 (Bài 05c, phát biểu lại).** $\theta$ cố định; $B$ gồm $b$ chỉ số chọn đều. Có hoàn lại: $\mathbb E\widehat g=\nabla F(\theta)$, $\mathbb E\lVert\widehat g-\nabla F(\theta)\rVert^2=\operatorname{tr}\Sigma(\theta)/b$. Không hoàn lại: cùng kỳ vọng, phương sai nhân $\frac{n-b}{n-1}$. Kiểm trên dữ liệu bốn điểm: $\operatorname{tr}\Sigma(\theta_0)=\tfrac{59}{4}$; trung bình sáu giá trị $\lVert\widehat g-\nabla F\rVert^2$ bằng $\tfrac{59}{12}=\tfrac{59}{4}\cdot\tfrac12\cdot\tfrac23$.
- **Ghi chú diễn giả:** Chứng minh ở 05c (Định lý 05c.53, dùng E.3, E.7–E.10). Ở dãy lặp, $\theta_k$ phụ thuộc các nhóm trước; điều kiện thay thế là M3 (nhóm mới độc lập với lịch sử), cho H6 của 05b, và H6b với $\sigma^2=\sup\operatorname{tr}\Sigma/b\cdot\frac{n-b}{n-1}$ trên vùng chứa dãy lặp (05c Mục 6.7, Nhận xét 05c.59). Sai số chuẩn giảm theo $1/\sqrt b$ trong khi chi phí tăng theo $b$ (05c Mệnh đề 05c.56). Ký hiệu $\sigma^2$ từ đây là chặn phương sai, không liên quan hàm kích hoạt $\sigma$ của mạch B–C.
- **Hình:** không.
- **Liên kết:** E03 cho số; E05 dùng ước lượng này trong thuật toán.
- **Quyết định:** thêm; yêu cầu dẫn 05c với nhãn, phát biểu lại, không chứng minh lại.
- **Hành trình:** KN7 hình thức. **LLO/CLO:** LLO12; CLO1. **Thời lượng:** 0,06 + 0,00.

#### E05. Thuật toán hạ gradient ngẫu nhiên nhóm nhỏ

- **Điểm trung tâm:** SGD nhóm nhỏ cập nhật bằng $\widehat g_k$ với chi phí mỗi bước $O(bp)$, độc lập với $n$.
- **Mặt trang:** **Thuật toán.** Đầu vào: dữ liệu, $\theta_0$, $b$, lịch bước $(\eta_k)$, số bước $K$, tập xác thực. Với $k=0,\dots,K-1$: chọn $B_k$ ($b$ chỉ số đều, độc lập với lịch sử); tính $\widehat g_k$ bằng lan truyền ngược trên $B_k$; $\theta_{k+1}=\theta_k-\eta_k\widehat g_k$; định kỳ đánh giá trên tập xác thực và lưu tham số tốt nhất. Đầu ra: tham số có lỗi xác thực nhỏ nhất đã lưu. Chi phí: mỗi bước $O(bp)$; một lượt dữ liệu $n/b$ bước, tổng $O(np)$.
- **Ghi chú diễn giả:** Thuật ngữ: hạ gradient ngẫu nhiên (stochastic gradient descent, SGD), nhóm nhỏ (minibatch), lượt (epoch). Thực hành thường xáo trộn rồi chia nhóm theo lượt; khi đó các nhóm trong một lượt phụ thuộc nhau, H6 không đúng chính xác (05c §H.2; DL tr. 280–281). Quy tắc lưu tham số tốt nhất được phân tích ở F06. T8 (F04) bảo đảm cho dãy lặp, còn thuật toán trả về tham số tốt nhất theo tập xác thực, nhắm tới $R$; hai tiêu chí bổ sung cho nhau. Thuật toán 8.1 của DL (tr. 294) là nguồn đối chiếu.
- **Hình:** không (giả mã HTML).
- **Liên kết:** Ghép E03–E04 với lan truyền ngược C04; F01 hỏi dãy lặp này hội tụ theo nghĩa nào.
- **Quyết định:** thêm; thuật toán phải có đầu vào, đầu ra, chi phí.
- **Hành trình:** KN7 hình thức (thuật toán) + ứng dụng (chi phí mỗi lượt). **LLO/CLO:** LLO12; CLO2. **Thời lượng:** 0,06 + 0,02.

#### E06. Một bước SGD trên mạng XOR

- **Điểm trung tâm:** Kiểm tính gradient nhóm bằng lan truyền ngược và một bước cập nhật trên mạng.
- **Mặt trang:** Bốn câu như trước, câu 4 viết lại (tiền kích hoạt tại $(0,1)$ và quy ước $\sigma'(0)$); thêm câu 5: dữ liệu bốn điểm tại $\theta^*$, tính $\operatorname{tr}\Sigma(\theta^*)=\tfrac52$ và $\mathbb E\lVert\widehat g-\nabla F\rVert^2=\tfrac5{18}$ với $b=3$ không hoàn lại. (bản sau vòng rà soát năm vai, 2026-10-12)
- **Ghi chú diễn giả (đáp án):** (a) $z=(\tfrac12,\tfrac32)$, $h=(\tfrac12,\tfrac32)$, $f=-2$, $e=-3$, $\ell=\tfrac92$; $\nabla_{b_2}=-3$, $\nabla_{w_2}=(-\tfrac32,-\tfrac92)$, $\delta_z=(-3,6)$, $\nabla_{W_1}=\begin{psmallmatrix}-3&0\\6&0\end{psmallmatrix}$, $\nabla_{b_1}=(-3,6)$. (b) $\nabla_{W_1}=\begin{psmallmatrix}-\tfrac54&\tfrac14\\\tfrac52&-\tfrac12\end{psmallmatrix}$, $\nabla_{b_1}=(-\tfrac54,\tfrac52)$, $\nabla_{w_2}=(-\tfrac12,-\tfrac{17}8)$, $\nabla_{b_2}=-\tfrac54$. (c) $W_1=\begin{psmallmatrix}1{,}025&0{,}495\\0{,}45&-0{,}99\end{psmallmatrix}$, $b_1=(-0{,}475;\,0{,}95)$, $w_2=(1{,}01;\,-1{,}9575)$, $b_2=0{,}525$; mất mát nhóm $\tfrac{37}{16}=2{,}3125\to1{,}9202$. (d) Tại $(0,1)$ cả hai tiền kích hoạt bằng 0 (C07).
- **Hình:** không.
- **Liên kết:** Khép mạch E; nối KN4 với KN7.
- **Quyết định:** thêm; bài tập chuyển giao giữa lan truyền ngược và SGD.
- **Hành trình:** KN7 bài tập; KN4 bài tập chuyển giao. **LLO/CLO:** LLO12; CLO2. **Thời lượng:** 0,00 + 0,08.

### Mạch F. Tốc độ hội tụ dưới nhiễu và dừng sớm (khối B3, phần 2)

Nhu cầu của mạch (câu hỏi trung tâm B3): xác định tốc độ hội tụ còn lại khi gradient có nhiễu, phạm vi của bảo đảm đó, và quy tắc dừng khi cực tiểu chính xác của $F$ không phải mục tiêu.

Sau kiểm định storyboard 2026-10-11, mạch F có 8 trang: F02 cũ (T5 và T6) tách thành F02, F03; F05 cũ (dừng sớm) tách thành F06, F07; F03, F04, F06 cũ đổi mã thành F04, F05, F08.

#### F01. Nhiễu của gradient nhóm tại nghiệm

- **Điểm trung tâm:** Tại $\theta^*$, $\nabla F=0$ nhưng gradient nhóm vẫn khác 0, nên SGD bước hằng không dừng ở $\theta^*$ mà dao động quanh nó, và một bước từ $\theta^*$ làm $F$ tăng theo kỳ vọng.
- **Mặt trang:** Như trước, câu kết có điều kiện: “Khi $\operatorname{tr}\Sigma(\theta^*)>0$, dãy SGD bước hằng dao động quanh $\theta^*$ và không dừng ở đó.” Chú thích hình tự chứa Ví dụ A: $F(\theta)=\tfrac16\sum(\theta-y_i)^2$, $y=(-1,1,3)$, mỗi bước rút một $y_i$, $\widehat g=\theta-y_i$, $\sigma^2=\tfrac83$, bước $0{,}1$; nét đứt là cận của T5. (bản sau vòng rà soát năm vai, 2026-10-12)
- **Ghi chú diễn giả:** So sánh Bài 04: gradient đầy đủ tiến về 0 khi tới nghiệm nên bước hằng hội tụ; gradient nhóm thì không (DL tr. 294). Phản ví dụ cho “giảm theo kỳ vọng”: sáu nhóm cho $F(\theta_1)=\tfrac{131}{256},\tfrac{35}{64},\tfrac{143}{256},\tfrac{143}{256},\tfrac{35}{64},\tfrac{131}{256}$, trung bình $\tfrac{69}{128}$. Điều SGD giữ được là bất đẳng thức một bước có số hạng nhiễu (F02); ghi chú F02 kiểm bất đẳng thức này trên cùng dữ liệu. Hình dùng Ví dụ A thay cho dữ liệu E03 vì trên dữ liệu E03, $\operatorname{tr}\Sigma(\theta)$ tăng không bị chặn theo $\theta$, nên H6b chỉ đúng trên vùng; Ví dụ A có $\sigma^2=\tfrac83$ không đổi, H6b đúng trên toàn trục. Trên hình: kỳ vọng chính xác giảm về $\tfrac8{57}\approx0{,}140$, cận định lý giảm về $0{,}267$.
- **Hình:** dùng lại `img/lec-05b/vda-sgd-bound-vs-exact.svg` (Ví dụ A); ở giai đoạn dựng deck sao chép vào `img/lec-06/` cùng tên, ghi xuất xứ trong review-log (Q4, điểm hòa giải 8). Chú thích hình ghi rõ dữ liệu là Ví dụ A.
- **Liên kết:** Từ E05; F02 phát biểu định lượng trên Ví dụ A.
- **Quyết định:** thêm; nhu cầu của định lý phải là một hiện tượng tính được trên ví dụ đã có.
- **Hành trình:** KN8 nhu cầu + trực quan + ví dụ. **LLO/CLO:** LLO12; CLO1. **Thời lượng:** 0,06 + 0,01.

#### F02. Mức nhiễu nền của bước hằng

- **Điểm trung tâm:** Với lồi mạnh và bước hằng, kỳ vọng sai số co tuyến tính về mức nhiễu nền $\eta\sigma^2/\mu$; bất đẳng thức một bước có thêm số hạng nhiễu $\tfrac{L\eta^2}{2}\sigma^2$.
- **Mặt trang:** Bất đẳng thức một bước (H2, H6, H6b), ghi rõ là một bước trong chứng minh T8 và giải thích phản ví dụ tại nghiệm. Định lý T5 (Định lý 05b.36), thêm $\theta_0$ tất định và lời nhắc $\sigma^2$ không phải hàm kích hoạt. Ví dụ A với truy hồi $\mathbb E(\theta_{k+1}-1)^2=0{,}81\,\mathbb E(\theta_k-1)^2+0{,}01\cdot\tfrac83$; cận T5 là đường nét đứt ở hình F01. (bản sau vòng rà soát năm vai, 2026-10-12)
- **Ghi chú diễn giả:** Bất đẳng thức một bước suy từ cận trên bậc hai và $\mathbb E\lVert\widehat g\rVert^2\le\lVert\nabla F\rVert^2+\sigma^2$; nó chỉ cho giảm theo kỳ vọng khi $\big(1-\tfrac{L\eta}2\big)\lVert\nabla F\rVert^2>\tfrac{L\eta}{2}\sigma^2$, nên gần nghiệm có thể tăng (F01). Phát biểu dẫn từ Bài 05b, phần SGD cho hàm lồi mạnh (Định lý T5), không chứng minh lại. Dưới H3 gradient không bị chặn trên $\mathbb R^p$; ở đây chỉ cần H6b. Mạng không thỏa H3; T5 áp dụng cho các bài toán của Bài 05 sau chính quy hóa. $\sigma$ ở mạch B–C là hàm kích hoạt; $\sigma^2$ ở mạch E–F là chặn phương sai của H6b. Kiểm trên dữ liệu bốn điểm với $b=2$ không hoàn lại, $\eta=\tfrac14$, $L=\tfrac{5+\sqrt5}4\approx1{,}809$: tại $\theta^*$, $\nabla F=0$ và cần $\sigma^2\ge\tfrac56$, vế phải $\tfrac12+\tfrac{L\eta^2}2\cdot\tfrac56\approx0{,}547\ge\tfrac{69}{128}\approx0{,}539$; tại $\theta_0=(0,0)$, cần $\sigma^2\ge\tfrac{59}{12}$, vế phải $\approx1{,}3188\ge\tfrac{503}{384}\approx1{,}3099$.
- **Hình:** không (dựng deck 2026-10-12: trang đã có bất đẳng thức một bước, T5 và số của Ví dụ A; hình tùy chọn `step-halving-schedule.svg` không dùng, không sao chép; lịch theo pha nêu trong ghi chú F03).
- **Liên kết:** Định lượng hiện tượng F01; giới hạn “mức nhiễu nền không giảm theo $k$” dẫn tới bước giảm dần ở F03.
- **Quyết định:** thêm (tách từ F02 cũ theo kiểm định storyboard); một định lý mỗi trang.
- **Hành trình:** KN8 hình thức + ví dụ (đối chiếu cận với giá trị chính xác). **LLO/CLO:** LLO12; CLO1. **Thời lượng:** 0,03 + 0,01.

#### F03. Bước giảm dần cho hàm lồi mạnh

- **Điểm trung tâm:** Bước $\eta_k=\tfrac1{\mu(k+1)}$ bỏ mức nhiễu nền với tốc độ $O(1/k)$ theo kỳ vọng.
- **Mặt trang:** **Định lý (T6, Bài 05b).** H3, H4; H6, H6a trên vùng chứa dãy lặp; $\eta_k=\dfrac1{\mu(k+1)}$: $\mathbb E\lVert\theta_k-\theta^*\rVert^2\le\dfrac{G^2}{\mu^2k}$, $k\ge1$. **Ví dụ A:** bước $\tfrac1{k+1}$ cho giá trị chính xác $\tfrac8{3k}$; nhỏ hơn quỹ đạo bước hằng $0{,}1$ từ $k=16$.
- **Ghi chú diễn giả:** Phát biểu dẫn từ Bài 05b, phần SGD cho hàm lồi mạnh (Định lý T6 và trang đối chiếu với Ví dụ A); không chứng minh lại. Các lịch bước khác: chia đôi theo pha (biến thể theo pha của T5: tổng số bước $O\big(\tfrac1{\mu\eta_0}\log\tfrac{D^2}\varepsilon+\tfrac{\sigma^2}{\mu^2\varepsilon}\big)$), giảm tuyến tính (DL (8.14)); điều kiện đủ $\sum\eta_k=\infty$, $\sum\eta_k^2<\infty$ (DL (8.12)–(8.13)). H6a chỉ hợp lý trên vùng vì dưới H3 gradient không bị chặn trên $\mathbb R^p$.
- **Hình:** không.
- **Liên kết:** F02 → F03; F04 bỏ H3 để áp vào mục tiêu không lồi.
- **Quyết định:** thêm (tách từ F02 cũ theo kiểm định storyboard); cần phát biểu lại tốc độ lồi mạnh $O(1/k)$ với $\eta_k\propto1/k$ kèm giả thiết và hằng số.
- **Hành trình:** KN8 hình thức + ví dụ. **LLO/CLO:** LLO12; CLO1. **Thời lượng:** 0,03 + 0,00.

#### F04. Hạ gradient ngẫu nhiên cho hàm không lồi

- **Điểm trung tâm:** Không cần lồi, với $F$ trơn, SGD bước cỡ $1/\sqrt K$ cho trung bình kỳ vọng bình phương chuẩn gradient giảm theo $O(1/\sqrt K)$; bảo đảm này thuộc về dãy lặp.
- **Mặt trang:** Định lý T8 (Định lý 05b.43), thêm $\theta_0$ tất định; dòng chứng minh “cộng bất đẳng thức một bước”; hệ quả chọn $\eta$ với câu cân bằng hai số hạng; ba giá trị cận $0{,}303$; $0{,}0285$; $0{,}00283$ (giả định $L=\Delta_0=\sigma^2=1$) viết thành một dòng; dòng phạm vi. (bản sau vòng rà soát năm vai, 2026-10-12)
- **Ghi chú diễn giả:** Phát biểu dẫn từ Bài 05b, phần hạ gradient cho hàm không lồi (Định lý T8 và chứng minh); không chứng minh lại. So với T7: thêm số hạng nhiễu $L\eta\sigma^2$; bước phải nhỏ dần theo ngân sách $K$. Tăng $K$ 100 lần chỉ giảm cận khoảng 10 lần. Cận là về **bình phương** chuẩn; với chuẩn, Jensen cho $O(K^{-1/4})$. Như T7, định lý không phân biệt điểm yên ngựa với cực tiểu (D06). Với SGD, dãy lặp là ngẫu nhiên, nên tập lồi trong H2 phải chứa mọi dãy lặp có thể; điều kiện này không kiểm được trước. T8 bảo đảm cho một dãy lặp (giá trị nhỏ nhất hoặc một chỉ số chọn đều trong $k<K$); thuật toán E05 trả về tham số tốt nhất theo tập xác thực, nhắm tới $R$ và không được T8 chặn trực tiếp; hai tiêu chí bổ sung cho nhau.
- **Hình:** không (dựng deck 2026-10-12: hình tùy chọn `rates-log-error.svg` không dùng, không sao chép; bảng ba giá trị của cận đọc được bậc $O(1/\sqrt K)$).
- **Liên kết:** Thay gradient đầy đủ của T7 (D05) bằng gradient nhóm; F05 đặt hai cận vào cùng ngân sách.
- **Quyết định:** thêm; cần phát biểu lại tốc độ không lồi kèm giả thiết, hằng số và phạm vi áp dụng.
- **Hành trình:** KN8 hình thức. **LLO/CLO:** LLO12; CLO1. **Thời lượng:** 0,06 + 0,00.

#### F05. Tốc độ dưới ngân sách tính toán cố định

- **Điểm trung tâm:** Trên cùng tổng ngân sách $\mathcal B$ gradient mẫu, cận hệ quả T8 của SGD nhỏ hơn cận T7 của hạ gradient đầy đủ khi $\mathcal B<(n-b)^2/2$, tức số lượt dữ liệu $\mathcal B/n$ nhỏ hơn cỡ $n/2$; mức chính xác đủ dùng dựa trên lập luận đại lượng thay thế ở E02 và tập xác thực, không dựa trên T8.
- **Mặt trang:** Câu mở: so sánh hai cận trên (không phải sai số thật) khi tổng số gradient mẫu là $\mathcal B$ (tổng ngân sách, khác ngân sách mỗi bước). Hai mô tả cận, bảng hai quy mô ($\mathcal B=10n$). **Kết luận.** Cận SGD nhỏ hơn khi $\mathcal B<(n-b)^2/2$, tức số lượt $\mathcal B/n$ nhỏ hơn cỡ $n/2$ (cả hai hàng: 10 lượt); với $n=10^3$, hạ gradient đầy đủ có cận nhỏ hơn khi $\mathcal B>490\,050$ (khoảng 490 lượt); mức chính xác đủ dùng do tập xác thực quyết định. Ghi chú: điều kiện tương đương $n-b>\sqrt{2\mathcal B}$; ví dụ $n=10^4$, $b=10$, $\mathcal B=10^6$ (100 lượt): cận GD $0{,}02$, cận SGD $0{,}00285$, ngưỡng $4{,}99\cdot10^7$ (bản sau tái kiểm, 2026-10-12)
- **Ghi chú diễn giả:** Số hạng chính của cận SGD là $2\sqrt{2L\Delta_0\sigma_1^2/\mathcal B}$, không phụ thuộc $b$: theo cận này, $b$ được chọn theo phần cứng và bộ nhớ (Bài 05c, Mệnh đề 05c.56 và Nhận xét 05c.58). Đây là so sánh cận trên, không phải thời gian chạy thật. Với hàm lồi mạnh, SNW Bảng 13.2 (tr. 362) cho thời gian đạt độ chính xác $\rho$: GD $O(nd\kappa\log\tfrac1\rho)$, SGD $O(d\nu\kappa^2/\rho)$; với $\kappa=10$, $\rho=10^{-6}$, $\nu=1$: GD cần $n\cdot138$ đơn vị, SGD $10^8$, điểm chuyển cỡ $10^5$–$10^6$ (bậc độ lớn từ kết quả tiệm cận; chỉ báo bổ sung ở G03). Phạm vi của luận đề: với bài toán lồi, lập luận Bottou–Bousquet (E02) cho thấy độ chính xác tối ưu cỡ sai số thống kê là đủ cho bậc của cận; với mạng, T8 chỉ bảo đảm điểm dừng xấp xỉ, và mức đủ được quyết định bằng tập xác thực.
- **Hình:** không (hình tùy chọn `budget-bounds.svg` không vẽ khi dựng deck 2026-10-12; bảng hai quy mô đủ cho luận điểm).
- **Liên kết:** Tổng hợp E01 (chi phí), E02 (đại lượng thay thế), F04 (tốc độ): đây là điểm trung tâm của khối B3. F06 xử lý phần “không cần cực tiểu chính xác” bằng quy tắc dừng.
- **Quyết định:** thêm; luận đề yêu cầu trình bày SGD là phương án bị buộc bởi chi phí, với phạm vi của lập luận “đủ” được nêu rõ.
- **Hành trình:** KN7 ứng dụng; KN8 ứng dụng; KN9 nhu cầu. **LLO/CLO:** LLO11, LLO12; CLO1, CLO4. **Thời lượng:** 0,06 + 0,02.

#### F06. Dừng sớm theo tập xác thực

- **Điểm trung tâm:** Dừng sớm chọn tham số có lỗi xác thực nhỏ nhất; đây là một phần của phương pháp, không phải dấu hiệu chưa hội tụ.
- **Mặt trang:** Hình `risk-curves.svg` với chú thích “mất mát huấn luyện có xu hướng giảm”; dòng “Bài 05 đã định nghĩa dừng sớm; quy tắc dưới đây thêm chu kỳ đánh giá và điều kiện dừng”; quy tắc bốn bước với $\widehat R$ (mất mát trung bình trên tập xác thực) và ngưỡng kiên nhẫn $r$. (bản sau vòng rà soát năm vai, 2026-10-12)
- **Ghi chú diễn giả:** Tập xác thực và tập kiểm thử đã được định nghĩa ở Bài 05, phần hồi quy nhiều chiều (tập xác thực chọn $d$, $\lambda$, bước dừng; tập kiểm thử báo cáo $R$); trang này chỉ dẫn lại, không định nghĩa lại. Tập xác thực ước lượng $R$ không chệch tại $\theta$ cố định (Bài 05c, Định lý 05c.52), lệch lạc quan sau khi đã dùng để chọn; tập kiểm thử giữ riêng. Bài 05 đã có quan sát số về dừng sớm trên dữ liệu hồi quy nhiều chiều. Tham số trả về được chọn theo $R$ ước lượng, không phải dãy lặp mà T8 bảo đảm (F04). Đường trong hình là định tính.
- **Hình:** dùng lại `img/lec-06b/risk-curves.svg` (định tính), sao chép vào `img/lec-06/risk-curves.svg`; trong bản chép, dòng ghi chú “Sơ đồ minh họa; không phải quy luật cho mọi bài toán.” tách hai dòng và tăng cỡ chữ từ 17 lên 24 để đọc được ở nửa trang; nội dung không đổi.
- **Liên kết:** E02 và F05 cho lý do; F06 cho quy tắc vận hành; F07 giải thích tác dụng của quy tắc trên mục tiêu bậc hai.
- **Quyết định:** thêm (tách từ F05 cũ theo kiểm định storyboard); quy tắc vận hành và phép so sánh định lượng là hai luận điểm.
- **Hành trình:** KN9 trực quan + hình thức (quy tắc). **LLO/CLO:** LLO11; CLO1, CLO2. **Thời lượng:** 0,03 + 0,00.

#### F07. Dừng sớm và chính quy hóa $\ell_2$ trên mục tiêu bậc hai

- **Điểm trung tâm:** Trên mục tiêu bậc hai, dừng sớm sau $k$ bước giữ thành phần nghiệm theo cùng kiểu với chính quy hóa $\ell_2$ hệ số $\lambda\approx1/(\eta k)$.
- **Mặt trang:** **Thiết lập** (mục tiêu bậc hai, định nghĩa tỉ lệ giữ) → **Ví dụ** (bảng $\eta=0{,}5$, $k=20$, $\lambda=0{,}1$) cạnh hình → **Nhận xét**: hai tỉ lệ $1-(1-\eta\alpha)^k$ và $\alpha/(\alpha+\lambda)$ gần nhau khi $\lambda\approx1/(\eta k)$, $\eta\alpha\ll1$, $\alpha\ll\lambda$. (bản sau vòng rà soát năm vai, 2026-10-12)
- **Ghi chú diễn giả:** Cả hai cách đều giữ hướng độ cong lớn, nén hướng độ cong nhỏ; khớp tốt khi $\eta\alpha$ nhỏ và $\alpha$ nhỏ so với $\lambda$, như DL nêu điều kiện cho (7.44). DL viết $\lambda$ cho trị riêng và $\alpha$ cho hệ số chính quy hóa; bài đổi chỗ để $\lambda$ thống nhất với hệ số chính quy hóa của Bài 05. Nối Bài 05, phần hồi quy logistic: chính quy hóa làm bài toán đặt đúng; dừng sớm cho tác dụng tương tự mà không đổi mục tiêu. Bài 05 chỉ nêu quan sát số và tên DL §7.8; phép so sánh định lượng thuộc trang này (quyết định phân chia nguồn của điều phối viên, ghi trong review-log).
- **Hình:** mới `early-stopping-shrinkage.svg` (đường $1-(1-\eta\alpha)^k$ theo $k$ cho $\alpha=1;\,0{,}1;\,0{,}01$, $\eta=0{,}5$, cùng mức $\alpha/(\alpha+1/(\eta k))$ nét đứt).
- **Liên kết:** F06 cho quy tắc; F07 cho lý do quy tắc tác động như chính quy hóa. G01 dùng để khép luận đề.
- **Quyết định:** thêm (tách từ F05 cũ theo kiểm định storyboard); phép so sánh định lượng cần trang riêng để mỗi trang một luận điểm.
- **Hành trình:** KN9 ví dụ + hình thức (nhận xét) + ứng dụng. **LLO/CLO:** LLO11; CLO1, CLO2. **Thời lượng:** 0,03 + 0,01.

#### F08. Lịch bước, cận không lồi và dừng sớm

- **Điểm trung tâm:** Kiểm khả năng đọc và dùng ba kết quả của mạch.
- **Mặt trang:** **Câu hỏi:** (a) Ví dụ A (ba quan sát $-1,1,3$; $\mu=L=1$; $\sigma^2=\tfrac83$; $\theta_0=0$): tính $\mathbb E(\theta_k-1)^2$ tại $k=10$ và $k=20$ cho bước hằng $0{,}1$ (dùng $0{,}81^k+\tfrac8{57}(1-0{,}81^k)$) và cho $\eta_k=\tfrac1{k+1}$. Lịch nào tốt hơn ở mỗi $k$. (b) Với $L=\Delta_0=\sigma^2=1$, tìm $K$ nhỏ nhất để cận hệ quả của T8 không vượt $0{,}01$. (c) Với $\eta=0{,}5$, $k=20$, trị riêng $\alpha=0{,}1$: tính tỉ lệ giữ của dừng sớm và của chính quy hóa hệ số $\lambda=0{,}1$; giải thích sai khác.
- **Ghi chú diễn giả (đáp án):** (a) $k=10$: $0{,}2449$ và $0{,}2667$ (bước hằng tốt hơn); $k=20$: $0{,}1531$ và $0{,}1333$ (bước giảm tốt hơn). (b) $K=80\,400$ (cận $0{,}0099999\ldots$; với $K=80\,399$ cận vượt $0{,}01$). (c) $0{,}6415$ và $0{,}5$; xấp xỉ cần $\eta\alpha\ll1$ và $\alpha\ll\lambda$; ở đây $\eta\alpha=0{,}05$ nhỏ ($(0{,}95)^{20}\approx0{,}358$ gần $e^{-1}\approx0{,}368$) nhưng $\alpha/\lambda=1$ không nhỏ, nên $\lambda/(\alpha+\lambda)=0{,}5$ khác $e^{-\alpha/\lambda}\approx0{,}368$ (sửa khi dựng deck 2026-10-12).
- **Hình:** không.
- **Liên kết:** Khép mạch F.
- **Quyết định:** thêm; trang kiểm tra riêng của mạch.
- **Hành trình:** KN8, KN9 bài tập. **LLO/CLO:** LLO12; CLO1. **Thời lượng:** 0,00 + 0,08.

### Mạch G. Tổng hợp và lựa chọn phương pháp

#### G01. Điều không còn giữ được và điều còn giữ được

- **Điểm trung tâm:** So với Bài 01–04, bài toán học quy mô lớn mất tính chính xác, bảo đảm tất định và gradient đầy đủ; giữ được tính giảm mỗi bước của hạ gradient đầy đủ, bất đẳng thức giảm có số hạng nhiễu của SGD, bảo đảm điểm dừng và tốc độ theo kỳ vọng.
- **Mặt trang:** Dòng “Mất khi (i) chi phí: gradient nhóm nhỏ thay gradient đầy đủ, hoặc (ii) biểu diễn: mô hình phi tuyến, mục tiêu không lồi”. Bảng “Mất (khi nào) | Còn giữ được (kết quả của bài)”, bốn dòng cùng thứ tự với A03 và cùng câu chữ với Bài 05 KL04 hiện hành: đích là nghiệm chính xác (đã mất ở Bài 05) / $R$ nhỏ là đích (Định lý 05c.52), dừng theo tập xác thực; tốc độ tuyến tính (Định lý 3, Bài 05; khi (i) hoặc (ii)) / gradient đầy đủ: $F$ giảm mỗi bước (bổ đề giảm); SGD với $F_\lambda=F+\tfrac\lambda2\lVert\theta\rVert^2$ lồi mạnh: bước hằng tới lân cận cỡ $\eta\sigma^2/\mu$ (T5), bước giảm dần tới cực tiểu, $O(1/k)$ (T6); cực tiểu toàn cục (khi (ii), Mệnh đề 3) / T7 với $\min_{k<K}$, T8 bước hằng với $L\eta\sigma^2$; chi phí $O(np)$ (khi (i)) / gradient nhóm nhỏ, Định lý 05c.53. Ghi chú định nghĩa $e_k=F_\lambda(\theta_k)-\min F_\lambda$, nêu Bài 05 viết $\tau^2$ cho chặn phương sai (bản sau tái kiểm, 2026-10-12)
- **Ghi chú diễn giả:** Đây là câu trả lời cho các vấn đề nêu ở A03. Không có kết luận mới; mọi dòng dẫn một kết quả đã có trong bài.
- **Hình:** không.
- **Liên kết:** Quay lại A03; G02 biến bảng thành quy tắc chọn.
- **Quyết định:** thêm; luận đề yêu cầu kết luận ở dạng “mất gì, giữ gì” có nhãn kết quả.
- **Hành trình:** tổng hợp. **LLO/CLO:** LLO11; CLO1. **Thời lượng:** 0,02 + 0,00.

#### G02. Lựa chọn giữa hạ gradient đầy đủ, Newton và SGD

- **Điểm trung tâm:** Phương pháp được chọn theo $n$, $p$ và tính lồi, với điều kiện áp dụng của từng bảo đảm.
- **Mặt trang:** Bảng năm dòng: dòng 2 “tuyến tính (T2)”; dòng 3 bước $\eta_k=\tfrac1{\mu(k+1)}$; dòng 4 “SGD nhóm nhỏ, bước theo $K$”; dòng 5 “không lồi, $\mathcal B>(n-b)^2/2$ (so sánh dưới ngân sách cố định)”, tức ngân sách đủ cho cỡ $n/2$ lượt dữ liệu trở lên. (bản sau vòng rà soát năm vai, 2026-10-12)
- **Ghi chú diễn giả:** Dòng (1): giai đoạn hội tụ bậc hai cần $\log_2\log_2(\varepsilon_0/\varepsilon)$ bước, không chứa $\kappa$; $\varepsilon_0$ và giai đoạn tắt dần phụ thuộc các hằng số Hessian $m_H$, $M_H$ (chặn dưới, chặn trên của trị riêng) và hằng số Lipschitz $L_H$ của Hessian (Bài 04; Bài 05, phần độ cong và chi phí). Dòng (2): với hàm lồi trơn không lồi mạnh, hạ gradient chỉ có tốc độ $O(1/k)$ (Bài 05b, Định lý T1); tốc độ tuyến tính cần thêm H3 (Định lý T2). Các ngưỡng chỉ là bậc độ lớn. Nội dung momentum, Adam, BFGS thuộc bài bổ trợ (Q2). Câu hỏi vận dụng của bảng nằm ở G03.
- **Hình:** không (bảng HTML).
- **Liên kết:** Dùng G01; G03 vận dụng bảng và tổng kết.
- **Quyết định:** thêm; yêu cầu bảng quyết định theo $(n,p)$ và tính lồi; câu hỏi vận dụng chuyển sang G03 theo kiểm định storyboard để trang chỉ còn bảng.
- **Hành trình:** ứng dụng tổng hợp KN7, KN8, KN9. **LLO/CLO:** LLO15 (chi phí Newton), LLO12; CLO4. **Thời lượng:** 0,02 + 0,02.

#### G03. Tổng kết, câu hỏi tự kiểm tra và tài liệu đọc

- **Điểm trung tâm:** Vận dụng bảng lựa chọn, đối chiếu ba mục tiêu với kết quả, và chỉ tài liệu đọc.
- **Mặt trang:** Ba dòng tổng kết; danh mục đọc (Goodfellow, Bengio và Courville; SNW chương 13; Bài 05b; Bài 05c Mục 6) ở cột trái; bốn câu hỏi, câu 1(b) bỏ $\kappa$, $\rho$ và trả lời được bằng bảng chi phí. (bản sau vòng rà soát năm vai, 2026-10-12)
- **Ghi chú diễn giả (đáp án và gợi ý):** (1) Newton (một bước $np^2+p^3\approx2{,}6\cdot10^6$ phép tính); SGD với $\eta_k=1/(\lambda(k+k_0))$ vì một bước GD đã tốn $np=10^{14}$; chỉ báo bổ sung: $n$ vượt xa bậc $10^5$–$10^6$ của điểm chuyển theo SNW Bảng 13.2 với $\kappa=10$, $\rho=10^{-6}$ (một bước GD $10^{14}$); SGD nhóm nhỏ, dừng sớm, T8 làm định hướng. (2) Mệnh đề 3 chỉ là phép kiểm tra tại một cặp cực tiểu; trên dữ liệu khác, cực tiểu có thể có các đơn vị trùng nhau. (3) Trung bình kỳ vọng bình phương chuẩn gradient của dãy lặp; không chặn khoảng cách tới cực tiểu, giá trị $F$ hay $R$ của tham số trả về. (4) Khi ngân sách $K$ cố định trước và mức nhiễu nền $\eta\sigma^2/\mu$ nhỏ hơn sai số thống kê cần đạt.
- **Hình:** không.
- **Liên kết:** Khép bài.
- **Quyết định:** thêm; cấu trúc mặc định yêu cầu tổng kết, câu hỏi tự kiểm tra, tài liệu đọc; nhận câu hỏi vận dụng từ G02.
- **Hành trình:** bài tập vận dụng tổng hợp KN7, KN8, KN9; bài tập tự kiểm. **LLO/CLO:** LLO11, LLO12, LLO15; CLO4. **Thời lượng:** 0,01 + 0,06.

## 7. Bảng kiểm thời lượng từng trang (tiết LT + BT)

| Mạch | Phân bổ | Tổng |
|---|---|---|
| A | A01 0,01; A02 0,03; A03 0,05; A04 0,03 | 0,12 + 0,00 |
| B | B01 0,05; B02 0,07+0,02; B03 0,06+0,02; B04 0,05; B05 0,06+0,04; B06 0,07; B07 0,05; B08 0,06+0,02; B09 0,08+0,03; B10 0+0,20 | 0,55 + 0,33 |
| C | C01 0,05; C02 0,06+0,02; C03 0,07+0,03; C04 0,08; C05 0,05+0,01; C06 0,05+0,02; C07 0+0,06 | 0,36 + 0,14 |
| D | D01 0,05; D02 0,06+0,03; D03 0,05+0,01; D04 0,05; D05 0,06; D06 0,05+0,02; D07 0+0,12 | 0,32 + 0,18 |
| E | E01 0,06+0,01; E02 0,06; E03 0,06+0,03; E04 0,06; E05 0,06+0,02; E06 0+0,08 | 0,30 + 0,14 |
| F | F01 0,06+0,01; F02 0,03+0,01; F03 0,03; F04 0,06; F05 0,06+0,02; F06 0,03; F07 0,03+0,01; F08 0+0,08 | 0,30 + 0,13 |
| G | G01 0,02; G02 0,02+0,02; G03 0,01+0,06 | 0,05 + 0,08 |

Kiểm tổng theo khối: B1 = A + B = $0{,}12+0{,}55+0{,}33=1{,}00$; B2 = C + D = $0{,}36+0{,}14+0{,}32+0{,}18=1{,}00$; B3 = E + F + G = $0{,}30+0{,}14+0{,}30+0{,}13+0{,}05+0{,}08=1{,}00$. Tổng 2,00 tiết lý thuyết + 1,00 tiết bài tập.

## 8. Ví dụ số (đã tính lại)

Mọi số dưới đây do tác tử lập kế hoạch tính bằng Python (phân số chính xác khi có thể; tập lệnh trong `scratchpad/replan/calc06/` của phiên) và được điều phối viên tính lại độc lập (review-log, vòng 2026-10-11).

### 8.1. XOR và mô hình tuyến tính (B01–B03, B10a)

- Dữ liệu: $X=\{(0,0),(0,1),(1,0),(1,1)\}$, $y=(0,1,1,0)$.
- Đẳng thức affine: $g(1,0)+g(0,1)=w_1+w_2+2c=g(0,0)+g(1,1)$.
- Bình phương nhỏ nhất affine: ma trận chuẩn $A^\top A=\begin{psmallmatrix}2&1&2\\1&2&2\\2&2&4\end{psmallmatrix}$, $A^\top y=(1,1,2)$, nghiệm $(w_1,w_2,c)=(0,0,\tfrac12)$, phần dư $\pm\tfrac12$, $F=\tfrac18$ (với $\ell=\tfrac12(f-y)^2$, $F$ là trung bình).
- Đặc trưng $x_1x_2$: hệ $w_0=0$, $w_0+w_2=1$, $w_0+w_1=1$, $w_0+w_1+w_2+w_3=0$ ⇒ $(0,1,1,-2)$.
- $\binom{d+q}{q}$: $d=2$: 3, 6, 10 ($q=1,2,3$); $d=10$: 11, 66, 286; $d=100$: 101, 5 151, 176 851; $d=1000$: 1 001, 501 501, 167 668 501. $501\,501^3\approx1{,}26\cdot10^{17}$.

### 8.2. Mạng XOR, đối xứng, không lồi (B05, B08–B10)

- $\theta_A$: $W_1=\begin{psmallmatrix}1&-1\\-1&1\end{psmallmatrix}$, $b_1=0$, $w_2=(1,1)$, $b_2=0$. Truyền xuôi: $(0,0)$: $z=(0,0)$, $h=(0,0)$, $f=0$; $(0,1)$: $z=(-1,1)$, $h=(0,1)$, $f=1$; $(1,0)$: $z=(1,-1)$, $h=(1,0)$, $f=1$; $(1,1)$: $z=(0,0)$, $h=(0,0)$, $f=0$. $F(\theta_A)=0$.
- $\theta_B$ (đổi hai đơn vị): $W_1=\begin{psmallmatrix}-1&1\\1&-1\end{psmallmatrix}$, còn lại như $\theta_A$; $F(\theta_B)=0$.
- $\theta(t)=(1-t)\theta_A+t\theta_B$: $W_1(t)=(1-2t)\begin{psmallmatrix}1&-1\\-1&1\end{psmallmatrix}$, $f=\lvert1-2t\rvert\lvert x_1-x_2\rvert$, $F(\theta(t))=\tfrac14\cdot\tfrac12\cdot2(1-\lvert1-2t\rvert)^2=\tfrac14(1-\lvert1-2t\rvert)^2$, tức $t^2$ trên $[0,\tfrac12]$, $(1-t)^2$ trên $[\tfrac12,1]$; $F(\theta(\tfrac12))=\tfrac14$.
- Mạng DL (6.4)–(6.6): $W_1=\begin{psmallmatrix}1&1\\1&1\end{psmallmatrix}$, $b_1=(0,-1)$, $w_2=(1,-2)$, $b_2=0$; $z$: $(0,-1),(1,0),(1,0),(2,1)$; $h$: $(0,0),(1,0),(1,0),(2,1)$; $f=(0,1,1,0)$. Bản hoán đổi $b_1=(-1,0)$, $w_2=(-2,1)$. Trung điểm $b_1=w_2=(-\tfrac12,-\tfrac12)$: $f=(0,-\tfrac12,-\tfrac12,-\tfrac32)$, $F=\tfrac14\cdot\tfrac12(0+\tfrac94+\tfrac94+\tfrac94)=\tfrac{27}{32}$.
- $p=md+2m+1$: $d=m=2$: 9; $d=784$, $m=100$: $78\,400+100+100+1=78\,601$.

### 8.3. Lan truyền ngược (C02–C07, E06)

Tham số chung: $W_1=\begin{psmallmatrix}1&\tfrac12\\\tfrac12&-1\end{psmallmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$.

- Mẫu $x=(1,1)$, $y=0$: $z=(1+\tfrac12-\tfrac12,\ \tfrac12-1+1)=(1,\tfrac12)$; $h=(1,\tfrac12)$; $f=1\cdot1-2\cdot\tfrac12+\tfrac12=\tfrac12$; $\ell=\tfrac18$. Ngược: $e=\tfrac12$; $\nabla_{b_2}=\tfrac12$; $\nabla_{w_2}=(\tfrac12,\tfrac14)$; $e\,w_2=(\tfrac12,-1)$; $\sigma'(z)=(1,1)$; $\delta_z=(\tfrac12,-1)$; $\nabla_{W_1}=\begin{psmallmatrix}\tfrac12&\tfrac12\\-1&-1\end{psmallmatrix}$; $\nabla_{b_1}=(\tfrac12,-1)$. $\lVert\nabla\ell\rVert^2=\tfrac14+\tfrac14+\tfrac1{16}+\tfrac14+\tfrac14+1+1+\tfrac14+1=\tfrac{69}{16}$. Sai phân trung tâm theo $[W_1]_{22}$, $\varepsilon=10^{-3}$: $-1$ (chính xác).
- Bước $\eta=0{,}02$: $W_1=\begin{psmallmatrix}0{,}99&0{,}49\\0{,}52&-0{,}98\end{psmallmatrix}$, $b_1=(-0{,}51;\,1{,}02)$, $w_2=(0{,}99;\,-2{,}005)$, $b_2=0{,}49$; $z=(0{,}97;\,0{,}56)$; $f=0{,}9603-1{,}1228+0{,}49=0{,}3275$; $\ell=0{,}053628125$. Dự báo bậc nhất $0{,}125-0{,}08625=0{,}03875$.
- Bước $\eta=0{,}25$: $\ell=\tfrac{2809}{2048}\approx1{,}3716$ ($f=-\tfrac{53}{32}$). Bước $\eta=0{,}5$: $\ell=\tfrac{3721}{512}\approx7{,}268$.
- Mẫu $x=(0,0)$, $y=0$: $z=(-\tfrac12,1)$, $h=(0,1)$, $f=-\tfrac32$, $\ell=\tfrac98$, $e=-\tfrac32$; $\nabla_{b_2}=-\tfrac32$, $\nabla_{w_2}=(0,-\tfrac32)$, $\delta_z=(0,3)$, $\nabla_{W_1}=0$, $\nabla_{b_1}=(0,3)$.
- Mẫu $x=(0,1)$: $z=(0+\tfrac12-\tfrac12,\ 0-1+1)=(0,0)$, điểm gãy của cả hai đơn vị.
- Mẫu $x=(1,0)$, $y=1$: $z=(\tfrac12,\tfrac32)$, $h=(\tfrac12,\tfrac32)$, $f=\tfrac12-3+\tfrac12=-2$, $e=-3$, $\ell=\tfrac92$; $\nabla_{b_2}=-3$, $\nabla_{w_2}=(-\tfrac32,-\tfrac92)$, $e\,w_2=(-3,6)$, $\delta_z=(-3,6)$, $\nabla_{W_1}=\begin{psmallmatrix}-3&0\\6&0\end{psmallmatrix}$, $\nabla_{b_1}=(-3,6)$.
- Nhóm $\{(1,1),(1,0)\}$: trung bình $\nabla_{W_1}=\begin{psmallmatrix}-\tfrac54&\tfrac14\\\tfrac52&-\tfrac12\end{psmallmatrix}$, $\nabla_{b_1}=(-\tfrac54,\tfrac52)$, $\nabla_{w_2}=(-\tfrac12,-\tfrac{17}8)$, $\nabla_{b_2}=-\tfrac54$. $\eta=0{,}02$: $W_1=\begin{psmallmatrix}1{,}025&0{,}495\\0{,}45&-0{,}99\end{psmallmatrix}$, $b_1=(-0{,}475;\,0{,}95)$, $w_2=(1{,}01;\,-1{,}9575)$, $b_2=0{,}525$. Mất mát nhóm $\tfrac12(\tfrac18+\tfrac92)=\tfrac{37}{16}=2{,}3125\to1{,}92017$.
- Đếm phép nhân ($d=784$, $m=100$): xuôi $md+m=78\,500$; ngược $md+2m=78\,600$.

### 8.4. Mạng tuyến tính một đơn vị (D02–D07)

- $F(u,v)=\tfrac12(uv-1)^2$; $\nabla F=((uv-1)v,(uv-1)u)$; $\nabla^2F=\begin{psmallmatrix}v^2&2uv-1\\2uv-1&u^2\end{psmallmatrix}$.
- $(0,0)$: $F=\tfrac12$, Hessian $\begin{psmallmatrix}0&-1\\-1&0\end{psmallmatrix}$, trị riêng $-1,1$. $(1,1)$ và $(-1,-1)$: $F=0$, Hessian $\begin{psmallmatrix}1&1\\1&1\end{psmallmatrix}$, trị riêng $0,2$. $(2,\tfrac12)$: Hessian $\begin{psmallmatrix}0{,}25&1\\1&4\end{psmallmatrix}$, trị riêng $0;\,4{,}25$.
- $\max$ trị riêng tuyệt đối của Hessian (lưới 201×201): trên $[0,1]^2$: 2; $[-1,1]^2$: 4; $[-1{,}5;1{,}5]^2$: 7,75; $[-2,2]^2$: 13.
- Bổ đề giảm tại $\theta_0=(\tfrac12,\tfrac12)$, $L=2$, $\eta=\tfrac12$: $\nabla F=(-0{,}375;\,-0{,}375)$, $\lVert\nabla F\rVert^2=0{,}28125$; bảo đảm giảm $\ge0{,}0703125$; $\theta_1=(0{,}6875;\,0{,}6875)$, $F_1=0{,}139046$, giảm thực $0{,}142204$.
- GD từ $(\tfrac12,\tfrac12)$, $\eta=\tfrac12$: $\lVert\nabla F\rVert^2$ theo $k=0..4$: $0{,}28125$; $0{,}26288$; $0{,}09078$; $0{,}00453$; $7\cdot10^{-6}$. T7: $K\ge113$ để cận $\le0{,}01$.
- Bình nguyên, $\theta_0=(0{,}01;0{,}01)$, $\eta=\tfrac12$, $t_{k+1}=t_k+\tfrac12t_k(1-t_k^2)$, $\lVert\nabla F\rVert^2=2t^2(1-t^2)^2$:

| $k$ | $t_k$ | $F$ | $\lVert\nabla F\rVert^2$ |
|---|---|---|---|
| 0 | 0,0100 | 0,49990 | $2{,}00\cdot10^{-4}$ |
| 1 | 0,0150 | 0,49978 | $4{,}50\cdot10^{-4}$ |
| 2 | 0,0225 | 0,49949 | $1{,}01\cdot10^{-3}$ |
| 3 | 0,0337 | 0,49886 | $2{,}27\cdot10^{-3}$ |
| 4 | 0,0506 | 0,49744 | $5{,}09\cdot10^{-3}$ |
| 5 | 0,0758 | 0,49427 | $1{,}14\cdot10^{-2}$ |
| 6 | 0,1135 | 0,48720 | $2{,}51\cdot10^{-2}$ |
| 7 | 0,1695 | 0,47167 | $5{,}42\cdot10^{-2}$ |
| 8 | 0,2519 | 0,43857 | 0,1113 |
| 9 | 0,3698 | 0,37258 | 0,2038 |
| 10 | 0,5295 | 0,25897 | 0,2904 |
| 11 | 0,7200 | 0,11599 | 0,2405 |
| 12 | 0,8934 | 0,02039 | 0,0651 |
| 13 | 0,9835 | 0,00053 | $2{,}06\cdot10^{-3}$ |
| 14 | 0,9996 | $\approx0$ | $1{,}3\cdot10^{-6}$ |

### 8.5. Hồi quy bốn điểm và gradient nhóm (E03–E04, F01)

- $x=(-1,0,1,2)$, $y=(1,0,1,4)$ $=1+x+\varepsilon$, $\varepsilon=(1,-1,-1,1)$ trực giao với $(1,1,1,1)$ và $x$. Nghiệm $\theta^*=(w,c)=(1,1)$, $F^*=\tfrac12$.
- Hessian $\begin{psmallmatrix}1{,}5&0{,}5\\0{,}5&1\end{psmallmatrix}$, trị riêng $\tfrac{5\mp\sqrt5}{4}$: $0{,}6910$ và $1{,}8090$; $\kappa=2{,}618$.
- Tại $\theta_0=(0,0)$: $F=\tfrac94$; gradient mẫu $(1,-1),(0,0),(-1,-1),(-8,-4)$; $\nabla F=(-2;-1{,}5)$; $\operatorname{tr}\Sigma(\theta_0)=\tfrac{59}4$.
- Sáu nhóm $b=2$: $\{1,2\}$: $(\tfrac12,-\tfrac12)$; $\{1,3\}$: $(0,-1)$; $\{1,4\}$: $(-\tfrac72,-\tfrac52)$; $\{2,3\}$: $(-\tfrac12,-\tfrac12)$; $\{2,4\}$: $(-4,-2)$; $\{3,4\}$: $(-\tfrac92,-\tfrac52)$; trung bình $(-2;-1{,}5)$; $\mathbb E\lVert\widehat g-\nabla F\rVert^2=\tfrac{59}{12}$ (không hoàn lại) $=\tfrac{59}{4}\cdot\tfrac12\cdot\tfrac{4-2}{4-1}$; có hoàn lại sẽ là $\tfrac{59}8$.
- Bước $\eta=\tfrac14$: $\theta_1$ và $F(\theta_1)$: $\{1,2\}$: $(-\tfrac18,\tfrac18)$, $2{,}32422$; $\{1,3\}$: $(0,\tfrac14)$, $1{,}90625$; $\{1,4\}$: $(\tfrac78,\tfrac58)$, $\tfrac{155}{256}=0{,}60547$; $\{2,3\}$: $(\tfrac18,\tfrac18)$, $1{,}83984$; $\{2,4\}$: $(1,\tfrac12)$, $0{,}625$; $\{3,4\}$: $(\tfrac98,\tfrac58)$, $0{,}55859$. Kỳ vọng $\tfrac{503}{384}=1{,}30990$. GD: $(\tfrac12,\tfrac38)$, $\tfrac{133}{128}=1{,}03906$.
- Tại $\theta^*$: gradient mẫu $(1,-1),(0,1),(1,1),(-2,-1)$; $\operatorname{tr}\Sigma(\theta^*)=\tfrac{2+1+2+5}4=\tfrac52$; $\mathbb E\lVert\widehat g\rVert^2=\tfrac52\cdot\tfrac12\cdot\tfrac23=\tfrac56$ (kiểm bằng liệt kê sáu nhóm: $0{,}25;1;1{,}25;1{,}25;1;0{,}25$, trung bình $\tfrac56$); $\eta^2\cdot\tfrac56=\tfrac5{96}$ với $\eta=\tfrac14$. Một bước $\eta=\tfrac14$ từ $\theta^*$: $F(\theta_1)$ theo sáu nhóm $\tfrac{131}{256},\tfrac{35}{64},\tfrac{143}{256},\tfrac{143}{256},\tfrac{35}{64},\tfrac{131}{256}$, trung bình $\tfrac{69}{128}=0{,}5391>F^*=\tfrac12$ (phản ví dụ cho giảm theo kỳ vọng; điều phối viên đã tính lại).

### 8.6. Chi phí, tốc độ và ngân sách (E01, F02–F05, G03)

- Chi phí (phép nhân–cộng; $10^{12}$ phép/s): $(10^3,10^2,10)$: GD $10^5$, Newton $1{,}1\cdot10^7$, SGD $10^3$, $n/b=100$ bước mỗi lượt. $(10^5,10^5,100)$: GD $10^{10}$ (0,01 s), Newton $2\cdot10^{15}$ (2 000 s), SGD $10^7$ ($10^{-5}$ s), 1 000 bước mỗi lượt, Hessian $8\cdot10^{10}$ byte (8 byte mỗi số). $(10^9,10^9,10^3)$: GD $10^{18}$ ($10^6$ s = 11,57 ngày), Newton $2\cdot10^{27}$ ($2\cdot10^{15}$ s = $6{,}34\cdot10^7$ năm, với 1 năm = $3{,}156\cdot10^7$ s), SGD $10^{12}$ (1 s), $10^6$ bước mỗi lượt, Hessian $8\cdot10^{18}$ byte (8 byte mỗi số).
- Ví dụ A của 05b: $a_k=0{,}81^k+\tfrac8{57}(1-0{,}81^k)$ (bước 0,1, $\theta_0=0$, $b=1$): $k=10$: 0,2449; $k=16$: 0,1699; $k=19$: 0,1560; $k=20$: 0,1531. Bước $\tfrac1{k+1}$: $\tfrac8{3k}$: 0,2667; 0,1667; 0,1404; 0,1333. Cận T5: $0{,}9^k+0{,}2667$: 0,6153 ($k=10$); 0,3882 ($k=20$). Giới hạn $\tfrac8{57}=0{,}14035$.
- T8 với $L=\Delta_0=\sigma^2=1$: $K=10^2$: 0,30284 ($\eta=0{,}1414$); $10^4$: 0,028484 ($\eta=0{,}01414$); $10^6$: 0,0028304. $K$ nhỏ nhất cho cận $\le0{,}01$: 80 400.
- Ngân sách $\mathcal B=10n$, $L=\Delta_0=\sigma_1^2=1$: $n=10^9$, $b=10^3$: GD $K=10$, cận $0{,}2$; SGD $K=10^7$, $\sigma^2=10^{-3}$, $\eta=0{,}01414$, cận $2\cdot10^{-7}+2{,}828\cdot10^{-5}=2{,}848\cdot10^{-5}$. $n=10^3$, $b=10$: GD $0{,}2$; SGD $K=10^3$, $\sigma^2=0{,}1$, $\eta=0{,}1414$, cận $0{,}002+0{,}02828=0{,}03028$.
- SNW Bảng 13.2 (đơn vị gradient mẫu, bỏ hệ số $d$ chung): GD $n\kappa\ln(1/\rho)$, SGD $\nu\kappa^2/\rho$. $\kappa=10$, $\rho=10^{-6}$, $\nu=1$: $\ln10^6=13{,}82$; GD $138{,}2\,n$; SGD $10^8$; bằng nhau tại $n\approx7{,}2\cdot10^5$ (log tự nhiên; với $\log_{10}$ là $1{,}7\cdot10^6$); chỉ dùng như bậc $10^5$–$10^6$.
- G03, câu hỏi 1: Newton $n=10^3$, $p=50$: $np^2+p^3=2{,}5\cdot10^6+1{,}25\cdot10^5\approx2{,}6\cdot10^6$. GD $n=10^8$, $p=10^6$: $np=10^{14}$ mỗi bước.

### 8.7. Dừng sớm và chính quy hóa (F07, F08c)

$\eta=0{,}5$; trị riêng $\alpha$, hệ số chính quy hóa $\lambda=1/(\eta k)$; tỉ lệ giữ của dừng sớm $1-(1-\eta\alpha)^k$, của chính quy hóa $\alpha/(\alpha+\lambda)$:

| $k$ ($\lambda$) | $\alpha=1$ | $\alpha=0{,}1$ | $\alpha=0{,}01$ |
|---|---|---|---|
| 10 (0,2) | 0,9990 / 0,8333 | 0,4013 / 0,3333 | 0,0489 / 0,0476 |
| 20 (0,1) | 1,0000 / 0,9091 | 0,6415 / 0,5000 | 0,0954 / 0,0909 |
| 100 (0,02) | 1,0000 / 0,9804 | 0,9941 / 0,8333 | 0,3942 / 0,3333 |

## 9. Danh sách hình SVG

Hình mới đặt ở `2627-1/img/lec-06/` (thư mục tạo mới ngày 2026-10-12; 15 SVG của deck cũ đã chuyển sang `img/lec-06c/`). Tập lệnh sinh hình nằm trong thư mục nháp của phiên (`scratchpad/build/lec-06/svg/gen.py`), không trong kho; mọi tọa độ tính từ số liệu mục 8.

| Tệp | Trang | Nội dung | Dữ liệu |
|---|---|---|---|
| `xor-points.svg` | B01 | Bốn điểm XOR trên $[0,1]^2$, nhãn lớp bằng hình dạng và chữ (không chỉ màu); biến thể hai đường chéo là tệp riêng `xor-diagonals.svg` (B02), trung điểm $(\tfrac12,\tfrac12)$ | 8.1 |
| `xor-feature-map.svg` | B04 | Hai khung: không gian $x$ và không gian $h$; ảnh của bốn điểm; đường $h_1+h_2=\tfrac12$ | 8.2 |
| `two-layer-network.svg` | B06 | Mạng 2–2–1, nhãn $W_1,b_1,w_2,b_2$, ReLU | Cấu trúc |
| `xor-symmetric-path.svg` | B09 | $F(\theta(t))$, $t\in[0,1]$: $t^2$ rồi $(1-t)^2$; dây cung $F=0$ giữa hai cực tiểu | 8.2 |
| `backprop-forward.svg` | C02 | Đồ thị tính toán với giá trị truyền xuôi trên nút | 8.3 |
| `backprop-backward.svg` | C03 | Cùng đồ thị, giá trị $\delta$ trên cạnh, kiểu nét khác | 8.3 |
| `product-landscape.svg` | D02 | Đường mức $\tfrac12(uv-1)^2$ trên $[-2,2]^2$, hyperbol cực tiểu, điểm yên ngựa, $(\pm1,\pm1)$ | 8.4 |
| `descent-bound-product.svg` | D04 | $\varphi(\eta)=F(\theta_0-\eta g)$ và parabol chặn trên với $L=2$, $\theta_0=(\tfrac12,\tfrac12)$ | 8.4 |
| `saddle-plateau.svg` | D06 | $F(\theta_k)$ và $\lVert\nabla F(\theta_k)\rVert^2$ (log) theo $k=0..15$ | Số liệu bảng mục 8.4 |
| `batch-gradients.svg` | E03 | Sáu vector $\widehat g$ và $\nabla F(\theta_0)$ tại trọng tâm | 8.5 |
| `early-stopping-shrinkage.svg` | F07 | Tỉ lệ giữ theo $k$ cho ba trị riêng $\alpha$, mức chính quy hóa nét đứt | 8.7 |
| `budget-bounds.svg` (tùy chọn) | F05 | Không vẽ khi dựng deck (2026-10-12) | — |
| `xor-diagonals.svg` (thêm khi dựng deck) | B02 | Bốn điểm XOR, hai đường chéo, trung điểm chung $(\tfrac12,\tfrac12)$ | 8.1 |
| `xor-feature-map-narrow.svg`, `backprop-forward-narrow.svg`, `backprop-backward-narrow.svg`, `saddle-plateau-narrow.svg` (thêm khi dựng deck) | B04, C02, C03, D06 | Bản xếp dọc của bốn hình rộng, chọn bằng `<picture>` khi màn hẹp hơn 760 px | như bản rộng |

Dùng lại (không vẽ lại): `img/lec-05b/vda-sgd-bound-vs-exact.svg` (F01, dữ liệu Ví dụ A, ghi rõ trên chú thích), `img/lec-05b/step-halving-schedule.svg` (F02, tùy chọn), `img/lec-05b/rates-log-error.svg` (F04, tùy chọn), `img/lec-06b/risk-curves.svg` (F06, định tính). Quyết định Q4 của điều phối viên (điểm hòa giải 8): ở giai đoạn dựng deck, sao chép các tệp được dùng vào `img/lec-06/` với cùng tên (đã kiểm: không trùng 15 tệp hiện có), ghi một dòng xuất xứ cho mỗi tệp trong `review-log.md`; storyboard ghi đường dẫn gốc. Khi dựng deck (2026-10-12) chỉ hai tệp được dùng và sao chép: `vda-sgd-bound-vs-exact.svg` (F01) và `risk-curves.svg` (F06, bản chép có dòng ghi chú tăng cỡ chữ); `step-halving-schedule.svg` và `rates-log-error.svg` không dùng.

Không vẽ: bảng chân trị, bảng chi phí, bảng sáu nhóm, bảng quyết định (HTML/KaTeX).

## 10. Nguồn đã tham khảo

| Tệp | Mục, trang | Đã dùng cho |
|---|---|---|
| `sources/Deep Learning by Ian Goodfellow, Yoshua Bengio, Aaron Courville (z-lib.org).pdf` (DL) | §6.1 tr. 171–177 (XOR, (6.1)–(6.11), Hình 6.1–6.2) | Thứ tự: mô hình tuyến tính thất bại → học không gian đặc trưng → nghiệm tường minh. Nghiệm DL dùng ở bài tập B10; nghiệm chính B05 tự xây dựng |
| DL | §6.5 tr. 204–224; §6.5.1 tr. 205; Thuật toán 6.2 tr. 209; §6.5.7 tr. 218–221 | Đồ thị tính toán; chi phí cùng bậc truyền xuôi; chi phí MLP $O(w)$ hai chiều; bộ nhớ lưu kích hoạt |
| DL | §7.8 tr. 246–252, (7.35)–(7.45) | Dừng sớm tương đương $\ell_2$ cho hàm bậc hai |
| DL | §8.1 tr. 275–281 (8.1.1–8.1.3) | Đại lượng thay thế, dừng sớm, gradient nhóm; xáo trộn theo lượt |
| DL | §8.2.2 tr. 283–285; §8.2.3 tr. 285–287 | Đối xứng không gian trọng số, đối xứng co giãn ReLU; điểm yên ngựa, bình nguyên |
| DL | §8.3.1 tr. 294–296, Thuật toán 8.1, (8.12)–(8.14) | SGD, điều kiện bước, lịch giảm tuyến tính, nhiễu không mất ở cực tiểu, luận điểm Bottou–Bousquet |
| `sources/(Neural Information Processing series) Suvrit Sra, ... Optimization for Machine Learning ... (2011).pdf` (SNW; cùng sách với `MIT-Optimization-for-Machine-Learning.2012.pdf`) | ch. 13 §13.2.3 tr. 354–355; §13.3.2 tr. 359–362, Bảng 13.2 tr. 362; §13.4.1, Bảng 13.3 tr. 363–364 | Sai số xấp xỉ–ước lượng–tối ưu; chi phí và số vòng của GD, 2GD, SGD; thí nghiệm RCV1 |
| `sources/Chapter7-full1.pdf` (bài giảng tiếng Việt, Nguyễn Bích Vân) | tr. 3–12 (§7.1), 13–17 (§7.2), 18–23 (§7.3.1) | Thứ tự và cách gọi tiếng Việt cho khác biệt tối ưu học máy/thuần túy, thách thức, SGD |
| `../SML-textbook-main.zip`, `chapters/02_multilayer_perceptron/` (`sec_mlp.tex`, `sec_training_mlp.tex`, `sec_optimizer.tex`, `sec_convergence_analysis.tex`); `chapters/01_classification/sec_classification_definition.tex` (bảng XOR) | Thứ tự: nơ ron đơn → lớp → MLP → lan truyền ngược bằng Jacobian chuyển vị → GD, SGD theo lô → các câu hỏi hội tụ (đầy đủ, tốc độ, tối ưu, tổng quát hóa) | Chỉ thứ tự kể và thuật ngữ (“lan truyền ngược”, lô dữ liệu). Không chép câu, không chạy mã |
| `sources/bv_cvxbook.pdf` | §3.2 (bảo toàn tính lồi, hợp thành) | Lý do B07: hợp thành với hàm trong không affine không giữ tính lồi |
| Đề cương `sources/đề cương-cơ sở toán học của AI-v2.docx` | Buổi 5, 6; LLO11–16; CLO1–5 | Bảng 1.1, 1.2 |
| Kế hoạch trong kho | `planning/lec-05b/outline.md` (Ký hiệu, Giả thiết, Khung, Sổ định lý, mạch E–F); `planning/lec-05c/outline.md` (Khung, mạch G, Danh mục kết quả G.1–G.7); `planning/lec-05/outline.md` bản trước vòng lập lại kế hoạch (mạch A, B, D); `planning/lec-04/outline.md` (mục 1, 3, 5.7); `planning/lec-06/outline.md`, `storyboard.md` bản 2026-10-02, nay là `outline.old-2026-10-02.md`, `storyboard.old-2026-10-02.md` (định dạng) | Nhãn kết quả, ký hiệu, ví dụ A, định dạng mục từng trang |

Nocedal–Wright không có trong `sources/`; không cần cho bài này. Không tải nguồn mới.

## 11. Kết quả dùng lại từ Bài 00–05, 05b, 05c

| Kết quả | Nơi ở | Bài 06: nhắc lại / chứng minh / dẫn |
|---|---|---|
| Quy tắc dây chuyền $\nabla(g\circ r)=J_r^\top\nabla g$ | Bài 00 | Nhắc lại (C04) |
| Taylor bậc hai | Bài 00 | Nhắc lại (D03 ghi chú) |
| Tập cực tiểu của hàm lồi là tập lồi; hợp thành affine giữ tính lồi | Bài 01–02; BV §3.2 | Nhắc lại (B07, B09) |
| Hàm lồi khả vi: điểm dừng là cực tiểu toàn cục | Bài 02, 04 | Nhắc lại (D01) |
| Bình phương nhỏ nhất, hệ phương trình chuẩn | Bài 00, Bài 05 (A1) | Nhắc lại, tính trên XOR (B02) |
| Hạ gradient, $L$-trơn, bổ đề giảm | Bài 04 (RG12–RG14); 05b B02–B03 | Nhắc lại phát biểu, không chứng minh (D04) |
| Newton, chi phí $O(np^2+p^3)$, hội tụ bậc hai cục bộ | Bài 04; Bài 05 (A3) | Dẫn (E01, G02) |
| Chính quy hóa $\ell_2$ cho lồi mạnh, nghiệm duy nhất | Bài 05 (A2) | Dẫn (D04 ghi chú, E02, F07, G02) |
| Khớp quá khi $d$ tăng; rủi ro kiểm thử | Bài 05 (A1) | Dẫn (A03, E02, F06) |
| Tập xác thực (chọn $d$, $\lambda$, bước dừng) và tập kiểm thử (báo cáo $R$) | Bài 05 HQ05 | Dẫn, không định nghĩa lại (F06) |
| H0, H2, H3, H4, H6, H6a, H6b | 05b “Giả thiết có tên” | Dùng nguyên nhãn, phát biểu lại khi dùng |
| T2 (GD lồi mạnh tuyến tính) | 05b C05 | Dẫn (G02) |
| T5 (SGD lồi mạnh bước hằng, mức nhiễu nền) | 05b E06–E07 | Phát biểu lại (F02) |
| Bất đẳng thức một bước của SGD có số hạng nhiễu (từ cận trên bậc hai và H6b) | 05b, chứng minh T5 và T8 | Phát biểu lại, không chứng minh (F02) |
| T5-pha (chia đôi bước) | 05b E09 | Dẫn trong ghi chú (F03) |
| T6 (SGD lồi mạnh $\eta_k=\tfrac1{\mu(k+1)}$) | 05b E10 | Phát biểu lại (F03) |
| T7 (GD không lồi, chuẩn gradient) | 05b F03 | Phát biểu lại, chứng minh một dòng (D05) |
| T8 và hệ quả chọn bước (SGD không lồi) | 05b F04–F05 | Phát biểu lại (F04) |
| Ví dụ A (ba quan sát) và các số $\tfrac8{57}$, $\tfrac8{3k}$ | 05b “Ví dụ dẫn”, E08, E10 | Dẫn số (F01 hình, F02, F03, F08) |
| Định lý 05c.52 ($\mathbb EF=R$, $\operatorname{Var}F=\operatorname{Var}\ell/n$) | 05c §6.1 | Phát biểu lại (E02) |
| Định lý 05c.53 (gradient nhóm không chệch, phương sai, hệ số không hoàn lại) | 05c §6.2 | Phát biểu lại, kiểm trên ví dụ (E04) |
| Mệnh đề 05c.56 (hiệu suất giảm dần theo $b$), Nhận xét 05c.58 (Bottou–Bousquet), Mục 6.7, Nhận xét 05c.59 ($\sigma^2$ của H6b) | 05c §6.5–6.7 | Dẫn trong ghi chú (E02, E04, F05) |
| Định nghĩa tách được tuyến tính, XOR không tách được (Mệnh đề 1) | Bài 05 (phần hồi quy logistic, phần kết luận) | Nhắc lại, thêm đối chiếu mã hóa nhãn (B02) |
| Mệnh đề 2, 3; thuật toán lan truyền ngược hai tầng; phân loại điểm dừng của $F(u,v)$ | Mới | Chứng minh trên trang hoặc tính tường minh (B08–B09, C04, D02–D03) |
| Tương đương dừng sớm và $\ell_2$ | DL §7.8 | Nhận xét có nguồn, không chứng minh (F07) |

## 12. Rủi ro và điểm cần người dùng quyết

Mọi mục dưới đây đang ở trạng thái **mở**. Cột “Hướng tạm” ghi cách kế hoạch xử lý cho tới khi người dùng quyết định, theo mười điểm hòa giải của điều phối viên.

### 12.1. Quyết định cần người dùng

| Mã | Nội dung | Trạng thái | Hướng tạm |
|---|---|---|---|
| Q1 | **Phụ đề.** Phụ đề gốc có dạng “Từ … đến …”, bị CLAUDE.md cấm cho tiêu đề. Đề xuất cụm danh từ “Khả năng biểu diễn của mạng nơ ron và tối ưu ngẫu nhiên”. Phương án khác: giữ ý “từ … đến …” chỉ trong ghi chú | mở | Tạm dùng cụm danh từ đề xuất ở A01 (điểm 7) |
| Q2 | **Nội dung đề cương bị bỏ.** LLO12 (momentum, Nesterov), LLO13, LLO14, LLO15 (gradient liên hợp, BFGS), LLO16 không còn trong Bài 05 và Bài 06. Đề xuất giữ hai deck hiện hành làm bài bổ trợ (ví dụ 06b “Các phương pháp tối ưu trong học sâu”, gồm mạch C–D của deck Bài 05 hiện hành và toàn bộ deck Bài 06 hiện hành), không xóa. Cần quyết định tên tệp, vị trí trong `index.html`, và việc ghi chú bài giảng 05, 06 hiện có được giữ hay viết lại | mở | Không đụng deck và học liệu hiện hành; `index.html` không đổi (điểm 9) |
| Q3 | **Phát biểu tốc độ không lồi.** Đặc tả viết “$O(1/\sqrt T)$ cho chuẩn gradient nhỏ nhất”. T8 của 05b chặn **trung bình kỳ vọng bình phương** chuẩn gradient; với chính chuẩn, tốc độ là $O(K^{-1/4})$. Kế hoạch dùng phát biểu đúng của T8 trên mặt trang và ghi chú chuyển sang chuẩn | mở (điều phối viên đã chấp nhận, chờ người dùng xác nhận) | Phát biểu theo bình phương chuẩn ở D05, F04, G02 (điểm 3) |
| Q4 | **Vị trí hình dùng lại.** Bài 05 mới sẽ thay deck Bài 05 hiện hành; nếu `img/lec-05/*.svg` bị bỏ khỏi deck Bài 05 mới, tham chiếu chéo thư mục dễ gãy. Phương án: sao chép các hình dùng lại vào `img/lec-06/`, hoặc tham chiếu trực tiếp `img/lec-05b/`, `img/lec-05/` | mở | Sao chép vào `img/lec-06/` ở giai đoạn dựng deck, ghi xuất xứ trong review-log; storyboard ghi đường dẫn gốc (điểm 8) |
| Q5 | **Mất mát cho XOR.** Kế hoạch dùng mất mát bình phương (như DL §6.1) để tính thủ công; Bài 05 (A2) dùng mất mát logistic. Nếu thống nhất mất mát logistic, các số ở mục 8.2 (trừ lập luận không lồi) phải tính lại và $F(\theta_A)$ không còn bằng 0 | mở (điều phối viên đã chấp nhận mất mát bình phương) | B01 nêu lựa chọn trên mặt trang; ghi chú B07 kiểm kết luận không lồi với mất mát logistic (điểm 4) |
| Q6 | **Thời lượng mạch mở đầu.** Mạch A (0,12 tiết) tính vào khối B1, nên XOR và mạng còn 0,88 tiết. Nếu khối B1 phải trọn 1,00 tiết cho mạng, cần chuyển một phần sang B3 (ví dụ rút F07 vào ghi chú) | mở | Giữ phân bổ ở mục 5 và 7 |

### 12.2. Rủi ro

| Mã | Nội dung | Trạng thái | Ghi chú sau hòa giải |
|---|---|---|---|
| R1 | **Phụ thuộc Bài 05.** Kế hoạch giả định kết luận Bài 05 đúng như giao diện chung (hai giới hạn, chi phí $O(nd)$ và $O(nd^2+d^3)$, chính quy hóa $\ell_2$, rủi ro kiểm thử ở A1). Cần đối chiếu với kế hoạch Bài 05 trước khi chốt A03, E01, E02, F06, G02 | mở | Điều phối viên đã đối chiếu hai kế hoạch (mười điểm hòa giải); cần đối chiếu lại khi `planning/lec-05/` được chốt |
| R2 | **Ký hiệu $b$.** Kích thước nhóm $b$ trùng chữ với độ lệch $b_1,b_2$. Kế hoạch giữ $b$ cho kích thước nhóm (khớp 05b, 05c), độ lệch luôn có chỉ số, hệ số chặn của mô hình tuyến tính viết $c$ | mở | Bài 05 gộp hệ số chặn vào $w$, không dùng $b$ cho hệ số chặn; A04 ghi câu ánh xạ (điểm 1) |
| R3 | **Tập xác thực.** Nếu Bài 05 không định nghĩa tập xác thực, trang dừng sớm (F06) cần thêm một trang định nghĩa | mở | Không kích hoạt: Bài 05 HQ05 định nghĩa tập xác thực và tập kiểm thử trên mặt trang; F06 chỉ dẫn lại (điểm 5) |
| R4 | **Điểm gãy ReLU.** $\theta_A$ có tiền kích hoạt bằng 0 tại $(0,0)$ và $(1,1)$; tham số của C02 có điểm gãy tại $(0,1)$. Lập luận không lồi chỉ dùng giá trị hàm nên không bị ảnh hưởng; các bài tính gradient tránh điểm gãy và C07(d) nêu quy ước. Tác tử rà toán phải kiểm không trang nào lấy gradient tại điểm gãy mà không nói quy ước | mở | |
| R5 | **Giả thiết $L$-trơn với mạng.** Ví dụ D02 chứng tỏ H2 không đúng toàn cục. Mọi trang dẫn T7, T8 cho mạng phải nói “trên vùng chứa dãy lặp”. D06 thỏa điều kiện này (đã kiểm). Nếu tác tử soạn đưa ví dụ khác, phải kiểm lại | mở | Kiểm định storyboard: với ReLU, H2 không đúng trên vùng nào chứa điểm gãy. Đã sửa: T7, T8 áp dụng cho hàm kích hoạt trơn hoặc mạng tuyến tính; với ReLU là định hướng, ghi trên mặt trang D05, F04, G02 |
| R6 | **Tải nội dung.** Các trang dày nhất: E03 (bảng sáu nhóm có bốn cột), F02 (hai định lý và số Ví dụ A), G02 (bảng năm dòng năm cột kèm câu hỏi). Nguy cơ tràn khung 16:9. Phương án tách: F02 thành “Mức nhiễu nền của bước hằng (T5)” và “Bước giảm dần (T6)”; G02 đưa câu hỏi sang G03. Nếu tách, tổng 44–45 trang, vẫn trong khoảng 36–45 | mở | Đã tách theo kiểm định storyboard: F02, F03 (T5, T6); F06, F07 (dừng sớm); câu hỏi G02 sang G03; tổng 45 trang. Nguy cơ còn lại ở E03 và bảng G02 được kiểm khi dựng deck |
| R7 | **Số liệu nguồn ngoài.** Bảng 13.3 của SNW (RCV1) là kết quả thực nghiệm năm 2011 với phần cứng khi đó; trang chỉ dùng tỉ lệ thời gian và sự trùng lỗi kiểm thử, ghi nguồn đầy đủ trong ghi chú | mở | Điều phối viên đã đối chiếu Bảng 13.3 tr. 363 bằng `pdftotext`: khớp |
| R8 | **Quy mô minh họa.** Bộ $(n,p)=(10^9,10^9)$ và tốc độ máy $10^{12}$ phép/s là giả định; phải ghi là minh họa trên mặt trang hoặc ghi chú, không gán cho mô hình thực | mở | |
| R9 | **Hằng số giả định.** F04, F05, F08 dùng $L=\Delta_0=\sigma^2=1$ để đọc bậc; phải ghi rõ là giả định | mở | |
| R10 | **Tải trang G03.** Sau khi nhận câu hỏi vận dụng của G02, G03 gồm ba dòng tổng kết, bốn câu hỏi (câu 1 có ba tình huống) và danh mục đọc; nguy cơ tràn khung 16:9 | mở | Khi dựng deck, nếu tràn: chuyển danh mục đọc vào ghi chú diễn giả hoặc chuyển câu hỏi tự kiểm tra (2)–(4) sang ghi chú bài giảng; không giảm cỡ chữ |

### 12.3. Giai đoạn tiếp theo

1. Điều phối viên chốt Q1–Q6 với người dùng và đối chiếu lại giao diện khi kế hoạch Bài 05 được chốt (R1).
2. Cổng storyboard (chỉ đọc): kiểm lý do tồn tại từng trang và chín hành trình, đặc biệt ngoại lệ thứ tự KN5 và chu trình gộp KN9.
3. Tác tử rà toán (chỉ đọc) tính lại mục 8 độc lập trước khi soạn deck.
4. Soạn deck và các SVG mới ở mục 9, sao chép hình dùng lại; năm vai rà soát; chỉnh sửa; kiểm cuối theo CLAUDE.md.
