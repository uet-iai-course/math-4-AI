# Storyboard bộ trang chiếu Bài 10 — Xác suất: ngôn ngữ biểu diễn bất định trong AI

Storyboard của bộ trang chiếu `2627-1/lecture-10-xac-suat-bieu-dien-bat-dinh.html` (soạn 2026-11-05, giai đoạn A; sửa theo cổng storyboard cùng ngày). Mã trang chỉ dùng trong tài liệu planning, không xuất hiện trên mặt trang hay trong ghi chú diễn giả. Số dòng "L…" là dòng của `materials/lec-10/lecture-note.md`; "BT L…" là dòng của `materials/lec-10/exercises.md`. Danh sách trang và ánh xạ sang khối ghi chú: `outline.md`, mục "Danh sách trang". Kế hoạch ghi chú cũ nằm ở cuối tệp, mục "Phụ lục".

Âm tiết được đếm bằng số từ tách theo khoảng trắng, không tính tiêu đề, KaTeX, ô số của bảng và nhãn trong hình. Các số trong mục (c) là ước lượng trên phác thảo; số đo thật được ghi lại sau khi dựng HTML. Mỗi dòng chữ trên mặt trang ≤20 âm tiết; mỗi khối công thức hiển thị tính là một dòng. Số hiệu công thức của ghi chú chỉ xuất hiện trên mặt trang khi công thức đó hiển thị ở chính trang ấy (trừ ô công thức của bảng tổng kết TK01).

Trường "Mẫu (chỉ planning)" ghi trang MAT1101 hay Murphy dùng làm mẫu diễn đạt; các tham chiếu này không đưa vào ghi chú diễn giả (ghi chú diễn giả chỉ dẫn nguồn nội dung ở `<p class="note-source">`, như Murphy và số hiệu ghi chú 05c, 10).

## (a) Bảng chức năng và ranh giới mạch

| # | Mạch | Trang tiêu đề | Câu hỏi trung tâm (một câu) và phân rã | Dòng dẫn (≤25 âm tiết) | Từ khóa (≤5) | Đầu vào | Đầu ra | Thời lượng |
|---|---|---|---|---|---|---|---|---|
| 1 | Mở đầu | MD00 (bìa, `id="mach-1"`) | Một sản phẩm bị cảnh báo khi thiếu hồ sơ nguồn hàng có xác suất lỗi bao nhiêu và nên được xử lý thế nào. | (bìa, không có dòng dẫn) | — | Bài 05c (xác suất rời rạc, chỉ dẫn trong ghi chú diễn giả) | Bài toán, ký hiệu $S,Y,A$, giả thiết, đầu ra cần tính | 6 phút |
| 2 | Mô hình xác suất | MH00 (`id="mach-2"`) | Gán xác suất cho các kết quả của camera thế nào để mọi phép tính trên biến cố nhất quán; phân rã: kết quả → biến cố → tiên đề → quy tắc tính. | Muốn tính xác suất cảnh báo sai của camera, cần gán xác suất nhất quán cho mọi biến cố. (18) | Không gian mẫu · Biến cố · Tiên đề · Phần bù và hợp | Bài toán MD03 | Mô hình hữu hạn (bảng trọng số), quy tắc phần bù, hợp; xác suất đồng thời $0{,}18$ | 14 phút |
| 3 | Xác suất có điều kiện và định lý Bayes | BY00 (`id="mach-3"`) | Xác suất sản phẩm lỗi sau một cảnh báo bằng bao nhiêu; phân rã: tỉ lệ cảnh báo trong từng nhóm × tỉ lệ của nhóm, rồi chuẩn hóa (trên mặt trang, sau BY09: hậu nghiệm ∝ tiên nghiệm × hợp lý). | Muốn biết xác suất lỗi sau một cảnh báo, nhân tỉ lệ lỗi với tỉ lệ cảnh báo trong từng nhóm rồi chuẩn hóa. (24) | Xác suất có điều kiện · Quy tắc nhân · Xác suất toàn phần · Định lý Bayes | Độ đo $\mathbb P$, bảng camera; khoảng trống: xác suất đồng thời chưa cho tỉ lệ trong nhóm | $\mathbb P(\cdot\mid F)$, quy tắc nhân, Bayes; $198/437$ | 22 phút + Bài tập 10.1 (10 phút) |
| 4 | Biến ngẫu nhiên, phân phối và độc lập | PP00 (`id="mach-4"`) | Phân phối của nhãn, nguồn hàng, tín hiệu đo là gì và các biến được ghép theo quy tắc nào; phân rã: biến → hàm khối, hàm phân phối tích lũy, mật độ → họ phân phối → độc lập có điều kiện. | Muốn mô tả nhãn, nguồn hàng, tín hiệu đo và ghép chúng, cần phân phối của từng biến và quy tắc độc lập. (23) | Hàm khối xác suất · Hàm phân phối tích lũy · Mật độ · Họ phân phối · Độc lập có điều kiện | Bayes cho biến cố; giả thiết "nguồn hàng không đổi xác suất cảnh báo khi biết tình trạng lỗi" mới nêu bằng lời | $S,Y,A$ là biến ngẫu nhiên; $A\perp S\mid Y$ và Mệnh đề 10.17 | 22 phút + Bài tập 10.2, 10.3 (20 phút) |
| 5 | Kỳ vọng, phương sai và hiệp phương sai | KV00 (`id="mach-5"`) | Những con số nào tóm tắt phân phối của chi phí và nhãn lỗi: kỳ vọng, phương sai, hiệp phương sai, trung bình theo nhóm. | Muốn tóm tắt chi phí và nhãn lỗi bằng vài con số, cần kỳ vọng, phương sai, hiệp phương sai và trung bình theo nhóm. (25) | Kỳ vọng · Tính tuyến tính · Phương sai · Hiệp phương sai · Kỳ vọng toàn phần | Phân phối của $Y$, $A$; quy tắc nhân | $\mathbb E[L]=0{,}0698$; $\mathbb E[\mathbf 1_E]=\mathbb P(E)$ (dùng ở SL12); $\operatorname{Var}(Y)$; trung bình theo nhóm | 24 phút (rủi ro thời lượng, xem `review-log.md`); nhánh phương sai KV05–KV10 phục vụ mục tiêu 4, khép trong mạch qua tổng số lỗi (KV07 → KV08); không có đầu ra cho mạch 6; TK01b tổng kết |
| 6 | Phân phối đồng thời và phép lấy biên | SL00 (`id="mach-6"`) | Khi thiếu hồ sơ nguồn hàng, hậu nghiệm của nguồn hàng $\mathbb P(S=s\mid A=1)$ và của nhãn lỗi theo từng nguồn $\mathbb P(Y=1\mid A=1,S=s)$ cần một mô hình chung của $(S,Y,A)$; hậu nghiệm $198/437$ của mạch 3 được tính lại như tổng theo $s$; quyết định theo chi phí; phân rã: phân phối đồng thời (tích ba nhân tử) → lấy biên → chuẩn hóa → chi phí. | Muốn tính hậu nghiệm của nguồn hàng và nhãn lỗi từ một mô hình chung, rồi quyết định theo chi phí. (21) | Phân phối đồng thời · Lấy biên · Phân phối có điều kiện · Suy luận · Quyết định | $A\perp S\mid Y$, Mệnh đề 10.17, $\mathbb E[\mathbf 1_E]=\mathbb P(E)$, chi phí $5$ và $1$ | $198/437$, $236/437$, $22/4563$, ngưỡng $1/6$ | 24 phút |
| 7 | Tổng kết và chuyển tiếp | TK00 (`id="mach-7"`) | Kết quả nào dùng được dưới giả thiết nào. | Muốn dùng đúng các kết quả của bài, cần ghi kèm giả thiết mà mỗi kết quả đòi hỏi. (19) | Giả thiết · Hậu nghiệm · Quyết định · Tham số chưa biết | Mọi kết quả của mạch 2–6 | Bảng kết quả và giả thiết, bài tổng hợp có $2/13$, nhu cầu chọn tham số từ dữ liệu (Bài 11) | 8 phút |

Tổng: 120 phút lý thuyết + 30 phút cho ba bài trên lớp (kế hoạch của người dùng, phụ lục). Các bài có lời giải trên mặt trang khác (MH10, KV13, SL11, TK02–TK03) nằm trong thời lượng lý thuyết của mạch.

Bảy mạch nằm trong khoảng 5–7 của AGENTS.md. Tên mỗi mạch khác tiêu đề trang nội dung đầu tiên của mạch (MH01, BY01, PP01, KV01, SL01, TK01).

## (b) Bản đồ hành trình khái niệm

Thứ tự trang trong mạch 2 là MH00–MH06, MH09, MH07, MH08, MH10; trong mạch 4 là PP00–PP10, PP12, PP11, PP13 (mã giữ nguyên khi đổi thứ tự; PP12 đứng trước PP11 vì ví dụ PP11 dùng dạng tương đương). Trong mạch 3, BY04 là cây xác suất và BY05 là quy tắc nhân (cây đứng trước, làm bước trực quan của quy tắc nhân).

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức | Ứng dụng | Bài tập | Đầu vào → sản phẩm học tập; CLO2 (mục tiêu) | Ký hiệu, dữ kiện truyền từ ví dụ sang hình thức | Gộp, không áp dụng; câu nối; thời lượng |
|---|---|---|---|---|---|---|---|---|---|
| Mô hình xác suất (không gian mẫu, biến cố, tiên đề, mô hình hữu hạn) | MH00 (dòng dẫn), MH01 ("Nhu cầu:" gán xác suất cho các kết quả) | MH02 (lưới, hình `camera-event-grid.svg`); MH04 ("Trực quan.": tỉ lệ khung hình rơi vào tập ô) | MH01 (ví dụ dẫn nhập: danh sách bốn kết quả của camera); MH09 | MH03, MH04, MH05, MH06 | MH09 (bảng camera là mô hình theo Mệnh đề 10.5) | MH10 (lời giải trên mặt trang) | Bài toán → mô hình hữu hạn kiểm được; mục tiêu 1 | Bốn kết quả và $H$, $C$ của MH01–MH02 trở thành $\Omega$, $E\subseteq\Omega$ ở MH03; bảng trọng số MH09 là $p(\omega)$ của MH06 | Ví dụ dẫn nhập đứng cùng nhu cầu (chuỗi hợp lệ nhu cầu + ví dụ dẫn nhập → trực quan → hình thức). Câu nối MH02→MH03: "các tập ô vừa vẽ là biến cố"; MH04→MH05: "(P3) nói về dãy vô hạn, bài cần hai, ba biến cố"; MH06→MH09: "một bảng trọng số cụ thể". 9 phút. |
| Quy tắc phần bù và hợp | MH07 ("Nhu cầu:" tính xác suất của phần bù và của hợp từ xác suất từng biến cố) | MH07 ("Trực quan.": cộng $\mathbb P(H)$ và $\mathbb P(C)$ đếm ô chung hai lần, $0{,}46$ so với $0{,}28$) | MH09 (ví dụ dẫn nhập: $\mathbb P(H\cup C)=0{,}28$ tính trực tiếp từ trọng số; MH09 không còn ghi $0{,}46$) | MH07, MH08 (P1) | ghi chú diễn giả MH07: (4.9) trên camera, $0{,}20+0{,}26-0{,}18=0{,}28$ (L415–417), và Bài tập 10.5 (tự học); MH10 (phản hồi sai tính bằng phần bù) | MH10 | Tiên đề → hai công thức có chứng minh; mục tiêu 1 | $H\cup C$ và số $0{,}28$ của MH09 là $E\cup F$ của MH07; $0{,}46$ xuất hiện ở trực quan của MH07 | Ví dụ dẫn nhập MH09 cho $0{,}28$ trực tiếp; nhu cầu và trực quan ($0{,}46$ so với $0{,}28$) ở MH07. Câu nối MH09→MH07: "cộng hai xác suất đếm kết quả chung hai lần"; MH08→MH10: "áp dụng cho hệ thống sản phẩm". 4 phút. |
| Xác suất có điều kiện | BY00 (dòng dẫn), BY01 ("Nhu cầu:", nối tới xác suất lỗi của sản phẩm bị cảnh báo) | BY01 (giữ cột $C$, chia cho $0{,}26$; hình `camera-conditioning.svg`) | BY01 (ví dụ dẫn nhập $0{,}18$, $0{,}26$), BY03 | BY02 | BY03 (phép đảo điều kiện), BY10 | BY11 (lời giải trên mặt trang) | $\mathbb P$ → $\mathbb P(\cdot\mid F)$ là độ đo mới; mục tiêu 2 | Cột $C$ và tổng $0{,}26$ của BY01 thành $F$ và $\mathbb P(F)$ của (5.1) | Nhu cầu, ví dụ dẫn nhập và trực quan gộp ở BY01 (một luận điểm: chuẩn hóa trong nhóm). Câu nối BY01→BY02: "phép chia vừa làm là định nghĩa sau"; BY03→BY04: "dữ kiện sản phẩm lại cho theo chiều ngược, tỉ lệ trong từng nhóm". 7 phút + Bài tập 10.1. |
| Quy tắc nhân, xác suất toàn phần, định lý Bayes | BY00 (dòng dẫn), BY04 ("Nhu cầu:" thiếu hồ sơ nguồn hàng, tính xác suất lỗi từ tỉ lệ lỗi của từng nhà cung cấp) | BY04 (cây `supplier-tree-deck.svg`: tích dọc đường, cộng lá) | BY04 (xác suất lỗi trước quan sát $0{,}044$) | BY05, BY06, BY07–BY08 (P2), BY09 | BY10 ($198/437$) | BY11 (câu (b) và dòng "Cách khác:": toàn phần rồi Bayes trên bảng mới) | Tỉ lệ trong nhóm → hậu nghiệm; mục tiêu 2, 6 | Tích dọc đường của BY04 là quy tắc nhân BY05; nhánh $0{,}6/0{,}4$ và lá lỗi là $B_j$, $\mathbb P(E\mid B_j)\mathbb P(B_j)$ của (5.3); $E=\{A=1\}$ ở BY10 | Quy tắc nhân là kết quả phụ trợ (phát biểu + "Chứng minh." một dòng). Câu nối BY04→BY05: "mỗi đường của cây là một tích; quy tắc nhân phát biểu phép nhân đó"; BY05→BY06: "cộng các lá là công thức toàn phần"; BY08→BY09: "đọc các thành phần của định lý"; BY10→PP00: "giả thiết về cảm biến mới nêu bằng lời". 15 phút. |
| Biến ngẫu nhiên, hàm khối xác suất, hàm phân phối tích lũy | PP00 (dòng dẫn), PP01 ("Nhu cầu:"); PP03 ("Nhu cầu:" xác suất không vượt ngưỡng $t$) | PP01 ("Trực quan.": hàm cố định, $\omega$ chưa biết); PP03 ("Trực quan.": cộng dồn khối đến $t$) | PP01 ($S,Y,A$ là ba hàm, ví dụ dẫn nhập), PP04 | PP02, PP03 | PP04 (xác suất vượt ngưỡng), PP07 | PP06 câu (c) và Bài tập 10.7 (tự học, ghi chú diễn giả) | Biến cố → biến và phân phối; mục tiêu 3 | $Y(\omega)=1$ khi sản phẩm lỗi (PP01) là $\mathbf 1_E$ của PP02; $S\in\{a,b\}$ là ví dụ biến phân loại của PP02 | Nhu cầu, ví dụ dẫn nhập và trực quan gộp ở PP01. Bài tập trên mặt trang của mạch dành cho mật độ và độc lập có điều kiện; bài hàm phân phối tích lũy là tự học. Câu nối PP03→PP04: "hàm phân phối tích lũy bậc thang của một biến ba mức". 6 phút. |
| Mật độ | PP05 ("Nhu cầu:" tín hiệu đo thực) | PP05 (diện tích, hình `density-area.svg`) | PP05 (đều cao $10$ trên $[0;\,0{,}1]$) | PP05 (Định nghĩa 10.18) | PP08 (mật độ Gaussian) | PP06 (Bài tập 10.2, lời giải trên mặt trang) | Xác suất điểm bằng $0$ → xác suất bằng tích phân; mục tiêu 3 | Diện tích $10\cdot0{,}1=1$ là $\int f_X=1$; khoảng độ rộng $\delta$ trong hình là xấp xỉ $f_X(x)\,\delta$ | Bốn bước đầu gộp trên một trang theo Q-H; thứ tự trên trang giữ nhu cầu → trực quan → định nghĩa. Câu nối PP05→PP06: "kiểm tra một mật độ lớn hơn $1$". 4 phút + Bài tập 10.2. |
| Họ phân phối Bernoulli, phân loại, Gaussian (khái niệm phụ) | PP07 ("Nhu cầu:" nhãn hai giá trị, loại lỗi $K$ giá trị), PP08 ("Nhu cầu:" số đo cảm biến khi biết $Y=y$) | PP08 ("Trực quan.": hình chuông, tâm và độ rộng) | ghi chú diễn giả PP07 ($\operatorname{Bernoulli}(0{,}044)$, $\operatorname{Bernoulli}(0{,}02)$) | PP07, PP08 | KV13 (dùng $\operatorname{Var}(Y)=\theta(1-\theta)$); TK05 (mô hình Gaussian cho số đo cảm biến trong cầu nối Bài 11) | KV13 | Kiểu dữ liệu → họ phân phối có tham số; mục tiêu 3 | $\theta=0{,}044$ của $Y$ | Chu trình rút gọn nhu cầu → hình thức → kiểm tra: các họ là từ vựng gọi tên phân phối đã có hàm khối hoặc mật độ, không mang kết quả mới. **Lý do giữ PP08 trên mặt trang:** mục tiêu 3 của ghi chú (L27) yêu cầu chọn mô hình Gaussian theo kiểu dữ liệu; PP08 là trang duy nhất có họ mật độ cho tín hiệu đo của câu hỏi mạch 4; ghi chú diễn giả TK05 dùng $X\mid Y=y\sim\mathcal N(\mu_y,\sigma_y^2)$ (L2081) để nêu nhu cầu của Bài 11. Gaussian nhiều chiều chỉ ở ghi chú diễn giả PP08 (rà soát v1). 4 phút. |
| Độc lập và độc lập có điều kiện | PP09 ("Nhu cầu:" bỏ một điều kiện trong quy tắc nhân) | PP09 ("Trực quan.": biết $F$ không đổi xác suất của $E$); PP10 ("Trực quan." trong nhóm cùng tình trạng lỗi, nguồn hàng không đổi xác suất cảnh báo) | PP11 (cảnh báo và nguồn hàng, sau PP12) | PP09, PP10, PP12 | SL06 (P9 dùng Mệnh đề 10.17) | PP13 (Bài tập 10.3, lời giải trên mặt trang) | Giả thiết bằng lời → $A\perp S\mid Y$ và dạng tương đương; mục tiêu 2 | $E=\{A=1\}$, $F=\{S=s\}$, $G=\{Y=y\}$ (L741); $U=A$, $V=S$, $W=Y$ ở PP12 | Ví dụ đứng sau hai định nghĩa vì nó cần cả hai khái niệm để cho thấy "độc lập có điều kiện nhưng phụ thuộc". Thứ tự PP10 → PP12 → PP11 → PP13 (rà soát v1): "Ý nghĩa:" của PP12 cho đẳng thức bỏ điều kiện $S$ mà PP11 dùng. 8 phút + Bài tập 10.3. |
| Kỳ vọng và tính tuyến tính | KV00 (dòng dẫn), KV01 ("Nhu cầu:" tóm tắt phân phối của nhãn lỗi bằng một con số) | KV01 ("Trực quan.": trung bình có trọng số) | KV01 (ví dụ dẫn nhập $Y$ với $0{,}044$), KV04 | KV01, KV02, KV03 (P3), KV03b (P4) | KV04 ($\mathbb E[L]=0{,}0698$) | KV13 | Phân phối → một con số; mục tiêu 4 | $\mathbf 1_{\{Y=1,A=0\}}$ của KV04 dùng $\mathbb E[\mathbf 1_E]=\mathbb P(E)$ của KV02 | Nhu cầu, ví dụ dẫn nhập, trực quan và định nghĩa gộp ở KV01. Câu nối KV03→KV03b: "tính tuyến tính là kỳ vọng của hàm áp cho cặp $(X,Z)$"; KV03b→KV04: "chi phí là tổ hợp tuyến tính của hai biến chỉ thị". 10 phút. |
| Phương sai | KV05 ("Nhu cầu:" cùng kỳ vọng, khác dao động) | KV05 ("Trực quan.": bình phương độ lệch) | KV05 (ví dụ dẫn nhập: chi phí $1$ so với $0$ hoặc $2$) | KV05, KV06 (P5) | KV10 ($\operatorname{Var}(X)=0{,}576$, ghi chú diễn giả) | KV13 (phần $\operatorname{Var}(Y)$) | Kỳ vọng → độ dao động; mục tiêu 4 | $\mu=\mathbb E[X]$ của KV01 | Nhu cầu, ví dụ dẫn nhập, trực quan, định nghĩa và mệnh đề trên KV05. Câu nối KV06→KV07: "phương sai của tổng số lỗi cần một đại lượng cho hai biến". 4 phút. |
| Hiệp phương sai; độc lập kéo theo không tương quan | KV07 ("Nhu cầu:" lỗi cùng xuất hiện) | KV07 ("Trực quan.": hai biến cùng lệch) | KV10 (phản ví dụ, hình `uncorrelated-dependent.svg`) | KV07 (định nghĩa; "Mệnh đề." phương sai của tổng hai biến, "Chứng minh." một dòng), KV08 (định nghĩa không tương quan; mệnh đề), KV09 (P6) | KV10 ("Diễn giải:" chọn đặc trưng theo tương quan) | Bài tập 10.9, 10.11 (tự học, ghi chú diễn giả) | Độc lập ↔ hiệp phương sai; mục tiêu 4 | $\mathbb E[XY]$ của KV10 là $\mathbb E[XZ]$ của KV09 | Bài tập trên mặt trang của mạch đặt ở KV13; phản ví dụ KV10 là trường hợp biên bắt buộc (AGENTS.md). Câu nối KV09→KV10: "chiều ngược lại sai". 5 phút. |
| Kỳ vọng toàn phần | KV11 ("Nhu cầu:" trung bình chung của chi phí, số lỗi từ trung bình theo nhóm nguồn hàng) | KV11 ("Trực quan." ngay sau "Nhu cầu:": trung bình chung là trung bình các trung bình nhóm, trọng số là xác suất nhóm) | KV11 (ví dụ dẫn nhập $0{,}02$, $0{,}08$) | KV11 (định lý cho $X$ rời rạc), KV12 (P7) | KV13 (tính lại $0{,}044$) | KV13 | Trung bình theo nhóm → trung bình chung; mục tiêu 4, 5 | $\psi(a)=0{,}02$, $\psi(b)=0{,}08$ | Ứng dụng và bài tập cùng ở KV13 vì phép tính lại $0{,}044$ là thao tác học sinh cần tái tạo. Câu nối KV13→SL00: "mọi phép tính của mạch dựa trên phân phối một hoặc hai biến đã cho sẵn". 5 phút. |
| Phân phối đồng thời và lấy biên | SL00 (dòng dẫn), SL01 ("Nhu cầu:" hậu nghiệm của nguồn hàng và nhãn lỗi trong cùng một mô hình) | SL01 (chuỗi sinh dữ liệu, hình `generation-chain.svg`); SL03 ("Ý nghĩa:" cộng hai lá lỗi của cây là lấy biên theo $S$) | ghi chú diễn giả SL02 (hai biến $\operatorname{Bernoulli}(1/2)$ cùng biên), SL09 | SL02, SL03 (P8 trong "Chứng minh.") | SL09 | SL11 (lời giải trên mặt trang) | Biến riêng lẻ → mô hình của cả bộ; mục tiêu 5 | Bộ $(S,Y,A)$ của SL01 là $(X,Z)$ của SL02 với $X=(Y,A)$, $Z=S$ ở SL07 | Câu nối SL01→SL02: "mô hình cho nhiều biến cùng lúc"; SL03→SL04: "lấy biên trả lời câu hỏi khi chưa biết $Z$; đã biết $Z=z$ thì chuẩn hóa". 6 phút. |
| Phân phối có điều kiện từ phân phối đồng thời (khái niệm phụ) | SL04 (dòng "Ý nghĩa:" nối với BY01) | (đã có ở BY01) | SL09, SL10 | SL04 | SL07 (bước chuẩn hóa) | SL11 | Có điều kiện của biến cố → của biến; mục tiêu 5 | $p_{X\mid Z}$ là (5.1) với $E=\{X=x\}$, $F=\{Z=z\}$ | Chu trình rút gọn nhu cầu → hình thức → kiểm tra: cùng phép chuẩn hóa đã có trực quan ở BY01, áp cho biến. 2 phút. |
| Phân tích nhân tử và thuật toán suy luận (kết quả trung tâm) | SL00 (dòng dẫn, phân rã bốn phần), SL01 | SL01 (mỗi mũi tên là một nhân tử; nút $S$ nét đứt) | SL09, SL10 | SL05, SL06–SL07 (P9), SL08 | SL12 (quyết định) | SL11; TK02–TK03 | Ba nhân tử + quan sát → hậu nghiệm; mục tiêu 5, 6 | $q(s,y)$ của SL05 là ô của bảng SL09; $p_{Y,A}(y,a')$ của SL08 là tổng theo $s$ trong cột | Câu nối SL05→SL06: "chứng minh theo thứ tự nhân tử → lấy biên → chuẩn hóa"; SL08→SL09: "chạy thuật toán với $a'=1$". 13 phút. |
| Quyết định theo chi phí (khái niệm phụ) | SL12 (dòng đầu: chấp nhận hay loại; "Ý nghĩa:" bộ phân loại xác suất trả về $p(y\mid x)$, quyết định cần thêm chi phí) | SL12 (hình `decision-threshold.svg`) | SL12 | SL12 (ngưỡng $r>1/6$) | SL12 | TK03 câu (c) | Hậu nghiệm → hành động; mục tiêu 6 | $r=198/437$ (SL09), $22/4563$ (SL11), chi phí $5$, $1$ (KV04) | Chu trình rút gọn nhu cầu → hình thức → kiểm tra: phép so hai chi phí kỳ vọng dưới $\mathbb P(\cdot\mid A=a')$ dùng lại $\mathbb E[\mathbf 1_E]=\mathbb P(E)$ (KV02) và chi phí của KV04. 3 phút. |

Tổng thời lượng các cụm khớp bảng (a): mạch 2: 13 phút + trang tiêu đề; mạch 3: 22 phút; mạch 4: 22 phút; mạch 5: 24 phút (sau khi tách KV03b: 10 + 4 + 5 + 5); mạch 6: 24 phút (gồm trang tiêu đề).

## (c) Mục từng trang

Mỗi mục ghi: tiêu đề dự kiến; lý do tồn tại; nhu cầu hoặc khoảng trống; đầu vào → đầu ra; vị trí trong sườn và phần việc của câu hỏi trung tâm mạch; CLO2 (mục tiêu học tập của ghi chú, L25–30); quyết định; loại bài tập; phác thảo mặt trang (dòng đánh số theo thứ tự trên trang) và ghi chú diễn giả dự kiến. Mọi trang là `thêm` vì bộ trang chiếu mới; các thay đổi của cổng storyboard ghi ở trường "Sửa (cổng)".

### Mạch 1 · Mở đầu

#### MD00 — Xác suất: ngôn ngữ biểu diễn bất định trong AI (bìa, `id="mach-1"`)
- **Lý do tồn tại:** định danh bài, học phần, đơn vị; là trang tiêu đề của mạch mở đầu (AGENTS.md).
- **Nhu cầu/khoảng trống:** người học cần biết bài giải quyết suy luận khi thông tin thiếu hoặc nhiễu.
- **Đầu vào → đầu ra:** không → tên bài và hai công cụ (Bayes, lấy biên) trong ghi chú diễn giả.
- **Vị trí:** điểm vào mạch 1; ngoài hành trình khái niệm. **CLO2:** phạm vi chung.
- **Quyết định:** `thêm` — trang bắt buộc. **Bài tập:** không.
- **Phác thảo:** h1 tên bài; h3 "Biến cố, định lý Bayes, phân phối, kỳ vọng và lấy biên · Bài 10"; hai dòng học phần, học kỳ, đơn vị. ≈30 âm tiết, 4 dòng.
- **Ghi chú diễn giả (40–100 âm tiết):** hai việc của bài: cập nhật xác suất của nhãn chưa quan sát sau một tín hiệu bằng định lý Bayes; loại biến không quan sát được bằng phép lấy biên (L3–6). Bài 05c đã định nghĩa xác suất có điều kiện và chứng minh công thức Bayes trên không gian rời rạc. Nguồn: Murphy (2022), §2.1–2.3.

#### MD01 — Mục tiêu học tập
- **Lý do tồn tại:** chuyển sáu mục tiêu L23–30 thành sản phẩm đánh giá được.
- **Nhu cầu/khoảng trống:** người học cần biết mỗi mạch đo gì.
- **Đầu vào → đầu ra:** MD00 → sáu mục tiêu.
- **Vị trí:** mạch 1; ngoài hành trình khái niệm. **CLO2:** cả sáu mục tiêu (L32).
- **Quyết định:** `thêm`. **Sửa (cổng):** viết đủ tên tiếng Việt thay PMF, CDF; giữ trần 80. **Bài tập:** không.
- **Phác thảo:** danh sách đánh số: (1) Lập mô hình xác suất hữu hạn; chứng minh quy tắc phần bù, hợp. (13) (2) Chứng minh quy tắc nhân, công thức toàn phần, định lý Bayes; kiểm tra độc lập có điều kiện. (19) (3) Mô tả biến bằng hàm khối xác suất, hàm phân phối tích lũy, mật độ. (15) (4) Chứng minh công thức kỳ vọng, phương sai, hiệp phương sai. (10) (5) Tính phân phối biên, phân phối có điều kiện khi thiếu nguồn hàng. (13) (6) Phân biệt hậu nghiệm với quyết định theo chi phí. (10) ≈80 âm tiết (trần 80), 6 dòng, dòng dài nhất 19.
- **Ghi chú diễn giả:** các mục tiêu cụ thể hóa CLO2 của đề cương; mục tiêu 3 gồm chọn Bernoulli, phân loại hay Gaussian theo kiểu dữ liệu; mục tiêu 4 gồm kỳ vọng toàn phần và phản ví dụ hai biến không tương quan nhưng phụ thuộc.

#### MD02 — Nội dung
- **Lý do tồn tại:** trang "Nội dung" bắt buộc; số và tên khớp bảy trang tiêu đề mạch và `#/N`.
- **Nhu cầu/khoảng trống:** người tự học cần bản đồ bài.
- **Đầu vào → đầu ra:** MD01 → danh sách bảy mạch.
- **Vị trí:** mạch 1; ngoài hành trình khái niệm. **CLO2:** không trực tiếp.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** danh sách 1–7: Mở đầu; Mô hình xác suất; Xác suất có điều kiện và định lý Bayes; Biến ngẫu nhiên, phân phối và độc lập; Kỳ vọng, phương sai và hiệp phương sai; Phân phối đồng thời và phép lấy biên; Tổng kết và chuyển tiếp. ≈38 âm tiết, 7 dòng. **Ngoại lệ trần sáu dòng:** trang "Nội dung" phải liệt kê mọi mạch (AGENTS.md), tiền lệ Bài 07.
- **Ghi chú diễn giả:** tài liệu đọc trước: Murphy (2022), §2.1 và §2.2.1–2.2.2 (L2087); một câu nói mạch 2–3 làm việc với biến cố, mạch 4–6 với biến ngẫu nhiên.

#### MD03 — Sản phẩm bị cảnh báo khi thiếu hồ sơ nguồn hàng
- **Lý do tồn tại:** đặt bài toán trung tâm bằng số trước mọi công cụ; câu hỏi mở đầu L8–19.
- **Nhu cầu/khoảng trống:** hai cách trả lời sai thường gặp ($90\%$; $5\%$, L19) cho thấy cần phân biệt tỉ lệ trong các nhóm khác nhau.
- **Đầu vào → đầu ra:** không → tham số bằng phần trăm và câu hỏi được trả lời ở BY10, SL09–SL10, SL12, TK03.
- **Vị trí:** bài toán trung tâm của sườn; nêu câu hỏi trung tâm của mạch 1. **CLO2:** mục tiêu 2, 5, 6.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) Nhà cung cấp $a$: $60\%$ sản phẩm, $2\%$ lỗi. (2) Nhà cung cấp $b$: $40\%$ sản phẩm, $8\%$ lỗi. (3) Cảm biến cảnh báo $90\%$ sản phẩm lỗi, $5\%$ sản phẩm đạt. (4) Một sản phẩm vừa bị cảnh báo; hồ sơ nguồn hàng bị thiếu. (5) **Câu hỏi:** Xác suất sản phẩm này bị lỗi bằng bao nhiêu? ≈51 âm tiết, 5 dòng.
- **Ghi chú diễn giả:** con số $90\%$ là tỉ lệ cảnh báo trong nhóm sản phẩm lỗi, còn câu hỏi cần tỉ lệ sản phẩm lỗi trong nhóm bị cảnh báo; trung bình cộng $5\%$ của hai tỉ lệ lỗi bỏ qua việc $a$ giao nhiều hàng hơn (L19). Không nêu đáp số.

#### MD04 — Ngữ cảnh
- **Lý do tồn tại:** cố định đối tượng, ký hiệu, giả thiết và đầu ra của khung chung (≤4 dòng).
- **Nhu cầu/khoảng trống:** mọi mạch sau dùng $S,Y,A$.
- **Đầu vào → đầu ra:** MD03 → ký hiệu, giả thiết bằng lời, đầu ra; ví dụ tính tay camera.
- **Vị trí:** đối tượng, ký hiệu và giả thiết của sườn. **CLO2:** mục tiêu 6.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ nhãn "Ví dụ." ở dòng 4. **Bài tập:** không.
- **Phác thảo:** (1) **Ký hiệu:** nhà cung cấp $S\in\{a,b\}$, nhãn lỗi $Y\in\{0,1\}$, cảnh báo $A\in\{0,1\}$. (2) **Giả thiết:** tham số cho trước; khi biết $Y$, nguồn hàng không đổi xác suất cảnh báo. (3) **Đầu ra:** $\mathbb P(Y=1\mid A=1)$ và quyết định chấp nhận hay loại theo chi phí. (4) Bảng bốn ô của một camera phát hiện người đi bộ dùng làm ví dụ tính tay. ≈56 âm tiết, 4 dòng.
- **Ghi chú diễn giả:** thí nghiệm là chọn ngẫu nhiên một sản phẩm từ luồng hàng rồi đưa qua cảm biến; xác suất mô tả cách chọn sản phẩm, không mô tả cảm biến (L57–64); mọi biến cố làm điều kiện có xác suất dương, kỳ vọng chỉ dùng cho biến khả tích (L98–99); bảng ký hiệu đầy đủ ở ghi chú bài giảng, mục 2.

### Mạch 2 · Mô hình xác suất (thứ tự: MH00–MH06, MH09, MH07, MH08, MH10)

#### MH00 — 2. Mô hình xác suất (trang tiêu đề mạch, `id="mach-2"`)
- **Lý do tồn tại:** mở mạch 2 và nêu câu hỏi trung tâm.
- **Nhu cầu/khoảng trống:** bài toán MD03 cần xác suất của biến cố, chưa có quy tắc gán.
- **Đầu vào → đầu ra:** MD03–MD04 → nhiệm vụ: mô hình hữu hạn của camera.
- **Vị trí:** điểm vào mạch 2; đảm nhận bước nhu cầu của cụm mô hình xác suất. **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** h2 "2. Mô hình xác suất"; dòng dẫn "Muốn tính xác suất cảnh báo sai của camera, cần gán xác suất nhất quán cho mọi biến cố." (18); từ khóa "Không gian mẫu · Biến cố · Tiên đề · Phần bù và hợp".
- **Ghi chú diễn giả (≈60 âm tiết):** kế thừa bài toán và ví dụ camera; nhiệm vụ là liệt kê kết quả, gọi tên biến cố, gán trọng số thỏa tiên đề và rút ra quy tắc phần bù, hợp; mạch giao cho mạch sau xác suất đồng thời $0{,}18$ của "có người và cảnh báo".

#### MH01 — Kết quả của một khung hình camera
- **Lý do tồn tại:** nhu cầu và ví dụ dẫn nhập của cụm mô hình xác suất.
- **Nhu cầu/khoảng trống:** cần gán xác suất cho các kết quả của camera; trước hết phải liệt kê các kết quả.
- **Đầu vào → đầu ra:** MH00 → danh sách bốn kết quả tình trạng × phản hồi.
- **Vị trí:** đối tượng camera của sườn; phần việc: "kết quả". **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm`. **Sửa (cổng):** bốn kết quả thành danh sách; "Nhu cầu:" nêu nhiệm vụ gán xác suất; lưới chỉ ở MH02. **Bài tập:** không.
- **Phác thảo:** (1) **Nhu cầu:** gán xác suất cho các kết quả của camera để tính tần suất cảnh báo sai. (18) (2) Mỗi kết quả ghi tình trạng thực và phản hồi của bộ phát hiện: (11) (3)–(6) danh sách bốn mục: (có người, cảnh báo); (có người, không cảnh báo); (không có người, cảnh báo); (không có người, không cảnh báo). ≈50 âm tiết, 6 dòng. Không dùng nhãn chữ đứng (Q-F).
- **Ghi chú diễn giả:** bộ phát hiện tất định trên mỗi khung hình, nhưng khung hình kế tiếp chưa biết trước (L117); mô hình gộp mọi khung hình cùng tình trạng và phản hồi; cần vị trí người thì phải mở rộng không gian mẫu (L162); ví dụ hai lần tung đồng xu (Ví dụ 10.1) cho thấy thứ tự kết quả phải được giữ.

#### MH02 — Biến cố trên lưới camera
- **Lý do tồn tại:** bước trực quan: một phát biểu về khung hình là một tập ô.
- **Nhu cầu/khoảng trống:** "có người", "cảnh báo sai" đúng với nhiều kết quả; cần biểu diễn chúng trước khi định nghĩa.
- **Đầu vào → đầu ra:** MH01 → $H$, $C$, $H^c\cap C$, $H\cap C^c$, $H\cup C$ dạng tập ô.
- **Vị trí:** đối tượng $H$, $C$; phần việc: "biến cố". **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm` — hình `camera-event-grid.svg`. **Bài tập:** không.
- **Phác thảo:** (1) **Trực quan.** Mỗi phát biểu về khung hình là một tập ô của lưới. (2) hình lưới 2×2. (3) $H$: hàng "có người"; $C$: cột "cảnh báo". (4) Cảnh báo sai: $H^c\cap C$; bỏ sót: $H\cap C^c$. (5) $H\cup C$: mọi ô trừ (không có người, không cảnh báo). ≈40 âm tiết, 4 dòng chữ + hình.
- **Ghi chú diễn giả:** "hoặc" trong $H\cup C$ là hoặc bao hàm; ô (có người, cảnh báo) thuộc cả hàng $H$ lẫn cột $C$ (L192).

#### MH03 — Không gian mẫu và biến cố
- **Lý do tồn tại:** phát biểu hình thức Định nghĩa 10.1–10.2.
- **Nhu cầu/khoảng trống:** lưới MH02 chỉ là một trường hợp; cần định nghĩa cho mọi thí nghiệm.
- **Đầu vào → đầu ra:** MH01–MH02 → $\Omega$, $\omega$, $E\subseteq\Omega$, các phép toán, xung khắc.
- **Vị trí:** đầu chuỗi định nghĩa. **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm`. **Sửa (cổng):** dòng 3 nêu rõ trường hợp $\Omega$ hữu hạn. **Bài tập:** không.
- **Phác thảo:** (1) **Định nghĩa.** Thí nghiệm ngẫu nhiên (random experiment) là quy trình xác định trước, kết quả chưa biết trước. (17) (2) Không gian mẫu (sample space) $\Omega$ là tập mọi kết quả; $\omega\in\Omega$ là kết quả sơ cấp. (3) Với $\Omega$ hữu hạn, biến cố (event) là tập $E\subseteq\Omega$; $E$ xảy ra nếu $\omega\in E$. (4) Phần bù $E^c$, giao $E\cap F$, hợp $E\cup F$; $E,F$ xung khắc nếu $E\cap F=\varnothing$. ≈57 âm tiết, 4 dòng.
- **Ghi chú diễn giả:** thí nghiệm không đòi cơ chế bên trong ngẫu nhiên; một thuật toán tất định chạy trên đầu vào chưa biết vẫn cho kết quả chưa biết (L133); Murphy dùng *sample space* cho tập giá trị của một biến, còn ở đây $\Omega$ là không gian mẫu của thí nghiệm (L2085); Định nghĩa 05c.1.

#### MH04 — Không gian xác suất
- **Lý do tồn tại:** Định nghĩa 10.3, ba tiên đề.
- **Nhu cầu/khoảng trống:** bốn kết quả chưa đủ để tính tần suất; ngã tư đông người và đường vắng có tỉ lệ khác nhau (L196).
- **Đầu vào → đầu ra:** MH03 → $(\Omega,\mathcal F,\mathbb P)$, (P1)–(P3).
- **Vị trí:** chuỗi định nghĩa; phần việc: "tiên đề". **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) **Định nghĩa.** Không gian xác suất là bộ ba $(\Omega,\mathcal F,\mathbb P)$. (2) $\mathcal F$ là sigma-đại số (σ-algebra) các biến cố; $\mathbb P:\mathcal F\to[0,1]$ thỏa: (3) (P1) $\mathbb P(E)\ge0$; (P2) $\mathbb P(\Omega)=1$; (4) (P3) display (4.4) với $E_1,E_2,\ldots$ đôi một xung khắc. (5) Với $\Omega$ hữu hạn, $\mathcal F=2^\Omega$. ≈40 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** sigma-đại số chứa $\Omega$, đóng dưới phần bù và hợp đếm được (L202); với $\Omega$ không đếm được, $\mathcal F$ nhỏ hơn $2^\Omega$ (L217); Định nghĩa 05c.1.

#### MH05 — Cộng tính hữu hạn và tính đơn điệu
- **Lý do tồn tại:** Bổ đề 10.4; P1 (MH08) dùng phần 2.
- **Nhu cầu/khoảng trống:** (P3) nói về dãy vô hạn; bài cần hai, ba biến cố (L219).
- **Đầu vào → đầu ra:** (P1)–(P3) → $\mathbb P(\varnothing)=0$, cộng tính hữu hạn, đơn điệu.
- **Vị trí:** kết quả đầu tiên của chuỗi; phần việc: "quy tắc tính". **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm`. **Sửa (cổng):** dòng chứng minh thêm bước $\mathbb P(\varnothing)=0$. **Bài tập:** không.
- **Phác thảo:** (1) **Bổ đề.** Trên mọi không gian xác suất (Bổ đề 10.4): (2) $\mathbb P(\varnothing)=0$; (3) $E_1,\ldots,E_n$ đôi một xung khắc thì display $\mathbb P\bigl(\bigcup_{i=1}^nE_i\bigr)=\sum_{i=1}^n\mathbb P(E_i)$; (4) $E\subseteq F$ thì $\mathbb P(E)\le\mathbb P(F)$. (5) **Chứng minh.** Dãy $\Omega,\varnothing,\varnothing,\ldots$ xung khắc nên (P3) cho $\mathbb P(\varnothing)=0$; bổ sung tập rỗng vào dãy hữu hạn; đơn điệu: $F=E\cup(F\setminus E)$. ≈33 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $1=1+\sum_{i\ge2}\mathbb P(\varnothing)$ nên chuỗi các số hạng bằng nhau có tổng $0$ (L234–244); $F\setminus E=(F^c\cup E)^c$ thuộc $\mathcal F$ (L255); Mệnh đề 05c.2.

#### MH06 — Mô hình xác suất hữu hạn
- **Lý do tồn tại:** Mệnh đề 10.5: một bảng trọng số đã là mô hình (L289).
- **Nhu cầu/khoảng trống:** tiên đề không cho xác suất của từng kết quả; cần cách dựng mô hình từ trọng số.
- **Đầu vào → đầu ra:** MH04–MH05 → (4.6).
- **Vị trí:** phương pháp dựng mô hình của sườn. **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) **Mệnh đề.** $\Omega$ hữu hạn; trọng số $p(\omega)\ge0$ với $\sum_{\omega\in\Omega}p(\omega)=1$. (2) display (4.6), là độ đo xác suất trên $2^\Omega$. (3) Ngược lại, mọi độ đo trên $2^\Omega$ có dạng này với $p(\omega)=\mathbb P(\{\omega\})$. (4) **Chứng minh.** Kiểm tra ba tiên đề; chiều ngược dùng cộng tính hữu hạn. (5) **Lưu ý:** chỉ khi các kết quả đồng khả năng thì $\mathbb P(E)=|E|/|\Omega|$. ≈50 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** với $\Omega$ hữu hạn chỉ có hữu hạn tập khác rỗng trong một dãy xung khắc (L285); bốn kết quả camera không có lý do đồng xác suất (L299). Câu nối: một bảng trọng số cụ thể của camera.

#### MH09 — Ví dụ: bảng tình huống của camera (đứng sau MH06)
- **Lý do tồn tại:** áp dụng Mệnh đề 10.5 trên số; ví dụ dẫn nhập của công thức hợp; trang duy nhất có bảng camera đầy đủ.
- **Nhu cầu/khoảng trống:** câu hỏi mạch cần một mô hình cụ thể và xác suất cảnh báo sai.
- **Đầu vào → đầu ra:** MH06 → $\mathbb P(H)=0{,}20$, $\mathbb P(C)=0{,}26$, $\mathbb P(H\cup C)=0{,}28$, $\mathbb P(H)+\mathbb P(C)=0{,}46$, $\mathbb P(M)=0{,}10$; $\mathbb P(H\cap C)=0{,}18$ giao cho mạch 3.
- **Vị trí:** ví dụ xuyên suốt camera; phần việc: trả lời câu hỏi mạch cho camera. **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm`. **Sửa (cổng):** đặt trước MH07; tính $\mathbb P(H\cup C)$ trực tiếp từ trọng số và so với $\mathbb P(H)+\mathbb P(C)$; "Diễn giải:" khẳng định. **Bài tập:** không.
- **Phác thảo:** (1) bảng bốn hàng "tình trạng | phản hồi | xác suất": $0{,}18$; $0{,}02$; $0{,}08$; $0{,}72$. (2) **Tính** $\mathbb P(H)$, $\mathbb P(C)$, $\mathbb P(H\cup C)$ và xác suất phản hồi sai. (3) display `aligned`: $\mathbb P(H)=0{,}18+0{,}02=0{,}20$; $\mathbb P(C)=0{,}18+0{,}08=0{,}26$; $\mathbb P(H\cup C)=0{,}18+0{,}02+0{,}08=0{,}28$. (4) $\mathbb P(H)+\mathbb P(C)=0{,}20+0{,}26=0{,}46\ne0{,}28$. (5) **Diễn giải:** xác suất phản hồi sai $0{,}08+0{,}02=0{,}10$ đọc trực tiếp từ bốn trọng số. ≈45 âm tiết (gồm chữ trong bảng), 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** bảng hợp lệ vì bốn trọng số không âm, tổng bằng $1$; phản hồi sai là hợp của hai biến cố xung khắc $H^c\cap C$ và $H\cap C^c$ (L395); $0{,}08$ là xác suất đồng thời, khác tỉ lệ cảnh báo trong nhóm không có người (L421); xác suất ở đây đến từ cách lấy khung hình (Nhận xét 10.8). Câu nối: cộng hai xác suất đếm kết quả chung hai lần, nên cần một quy tắc cho hợp.

#### MH07 — Phần bù và hợp hai biến cố
- **Lý do tồn tại:** Mệnh đề 10.6, phát biểu tách khỏi chứng minh.
- **Nhu cầu/khoảng trống:** hệ thống AI cần xác suất "ít nhất một lỗi", "không có lỗi nào" (L303); MH09 cho thấy cộng thẳng sai.
- **Đầu vào → đầu ra:** MH05, MH09 → (4.8), (4.9).
- **Vị trí:** kết quả của sườn; phần việc: "quy tắc tính". **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm`. **Sửa (cổng):** thêm "Trực quan." trước mệnh đề; bỏ "Ý nghĩa:". **Sửa (rà lại):** thêm dòng kiểm tra (4.9) trên camera (L415–417), là bước ứng dụng của công thức hợp. **Bài tập:** không.
- **Phác thảo:** (1) **Nhu cầu:** xác suất "ít nhất một lỗi" hoặc "không có lỗi nào". (2) **Trực quan.** $\mathbb P(H)+\mathbb P(C)=0{,}46$ đếm ô chung hai lần; $\mathbb P(H\cup C)=0{,}28$. (3) **Mệnh đề.** Với mọi $E,F\in\mathcal F$: (4) display `gathered` (4.8), (4.9). (5) Trên bảng camera: $\mathbb P(H\cup C)=0{,}20+0{,}26-0{,}18=0{,}28$, khớp phép cộng trực tiếp. ≈38 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** công thức không cần giả thiết về quan hệ giữa $E$ và $F$; khi $E,F$ xung khắc, nó thành công thức cộng (L345); bất đẳng thức hợp $\mathbb P(E\cup F)\le\mathbb P(E)+\mathbb P(F)$ (Hệ quả 10.7) suy ra bằng cách bỏ số hạng giao; Mệnh đề 05c.2.

#### MH08 — Chứng minh: phần bù và hợp hai biến cố
- **Lý do tồn tại:** P1 (Q-C).
- **Nhu cầu/khoảng trống:** chứng minh cho thấy số hạng giao bị trừ ở đâu.
- **Đầu vào → đầu ra:** MH05 (cộng tính hữu hạn), (P2) → (4.8), (4.9) đã chứng minh.
- **Vị trí:** kết quả của sườn. **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ nhãn "Ý tưởng:"; tên bước theo kết quả. **Bài tập:** không.
- **Phác thảo:** (1) Mỗi biến cố được viết thành hợp các mảnh xung khắc, rồi áp dụng cộng tính hữu hạn. (2) **Công thức phần bù.** $E$, $E^c$ xung khắc, hợp bằng $\Omega$, nên $1=\mathbb P(E)+\mathbb P(E^c)$. (3) **Ba mảnh xung khắc.** $E\cup F$ là hợp của $E\setminus F$, $E\cap F$, $F\setminus E$. (4) display `aligned` ba dòng $\mathbb P(E\cup F)=\ldots$, $\mathbb P(E)=\ldots$, $\mathbb P(F)=\ldots$. (5) **Công thức hợp.** Thế $\mathbb P(E\setminus F)=\mathbb P(E)-\mathbb P(E\cap F)$ và tương tự cho $F\setminus E$ vào dòng đầu. ≈45 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** ba mảnh thuộc $\mathcal F$ vì $E\setminus F=(E^c\cup F)^c$ và $E\cap F=(E^c\cup F^c)^c$ (L329); bước phần bù dùng (P2); mọi bước cộng dùng Bổ đề 10.4, phần 2.

#### MH10 — Bài tập: bảng của hệ thống sản phẩm
- **Lý do tồn tại:** bài có lời giải trên mặt trang của mạch 2 (Q-B); trang duy nhất có bảng giai đoạn 1 đầy đủ.
- **Nhu cầu/khoảng trống:** chuyển kỹ năng từ camera sang hệ thống sản phẩm có cùng cấu trúc (L431); dùng công thức phần bù.
- **Đầu vào → đầu ra:** MH06–MH08 → $\mathbb P(Y=1)=0{,}044$, $\mathbb P(A=1)=0{,}0874$, xác suất phản hồi sai $0{,}0522$ (hai cách).
- **Vị trí:** ví dụ xuyên suốt sản phẩm, giai đoạn 1; kiểm tra câu hỏi mạch trên đối tượng thứ hai. **CLO2:** mục tiêu 1.
- **Quyết định:** `thêm`. **Sửa (cổng):** biến cố phản hồi sai viết $(\{Y=1\}\cap\{A=0\})\cup(\{Y=0\}\cap\{A=1\})$; thêm cách tính bằng phần bù (L440); "Diễn giải:" khẳng định; không thêm phép tính hợp $0{,}0918$ (Q-B). **Bài tập:** có lời giải trên mặt trang (fragment).
- **Phác thảo:** (1) bảng bốn ô: lỗi và cảnh báo $0{,}0396$; lỗi, không cảnh báo $0{,}0044$; đạt và cảnh báo $0{,}0478$; đạt, không cảnh báo $0{,}9082$. (2) **Câu hỏi:** Kiểm tra bảng là một mô hình xác suất; tính $\mathbb P(Y=1)$, $\mathbb P(A=1)$ và xác suất phản hồi sai. (16) (3) fragment **Lời giải:** bốn số không âm, tổng bằng $1$. (4) display `aligned`: $\mathbb P(Y=1)=0{,}0396+0{,}0044=0{,}044$; $\mathbb P(A=1)=0{,}0396+0{,}0478=0{,}0874$; $\mathbb P\bigl((\{Y=1\}\cap\{A=0\})\cup(\{Y=0\}\cap\{A=1\})\bigr)=0{,}0044+0{,}0478=0{,}0522$. (5) **Cách khác:** phần bù của hai phản hồi đúng cho $1-(0{,}0396+0{,}9082)=0{,}0522$. (6) **Diễn giải:** bảng cho xác suất đồng thời; tỉ lệ lỗi trong nhóm bị cảnh báo cần thêm một phép chia. ≈50 âm tiết (gồm chữ trong bảng), 6 dòng, 1 công thức hiển thị. Ký hiệu $\{Y=1\}$, $\{A=1\}$ dùng như tên biến cố, như ghi chú L610.
- **Ghi chú diễn giả:** bảng cho sẵn tỉ lệ lỗi $0{,}044$ mà không nêu nguồn gốc của nó; mạch sau dựng con số này từ tỉ lệ lỗi của từng nhà cung cấp (L440).

### Mạch 3 · Xác suất có điều kiện và định lý Bayes

#### BY00 — 3. Xác suất có điều kiện và định lý Bayes (trang tiêu đề mạch, `id="mach-3"`)
- **Lý do tồn tại:** mở mạch 3, nêu câu hỏi trung tâm và phân rã.
- **Nhu cầu/khoảng trống:** $0{,}18$ và bảng giai đoạn 1 chưa cho tỉ lệ trong nhóm bị cảnh báo.
- **Đầu vào → đầu ra:** MH09–MH10 → nhiệm vụ: xác suất lỗi sau cảnh báo.
- **Vị trí:** điểm vào mạch 3; đảm nhận bước nhu cầu của cụm Bayes. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Sửa (cổng):** dòng dẫn không dùng "tiên nghiệm", "hợp lý" (chưa giới thiệu). **Bài tập:** không.
- **Phác thảo:** h2 "3. Xác suất có điều kiện và định lý Bayes"; dòng dẫn "Muốn biết xác suất lỗi sau một cảnh báo, nhân tỉ lệ lỗi với tỉ lệ cảnh báo trong từng nhóm rồi chuẩn hóa." (24); từ khóa "Xác suất có điều kiện · Quy tắc nhân · Xác suất toàn phần · Định lý Bayes".
- **Ghi chú diễn giả (≈70 âm tiết):** kế thừa độ đo $\mathbb P$ và xác suất đồng thời $0{,}18$; nhiệm vụ là chuẩn hóa trong một nhóm, ghép tỉ lệ trong nhóm bằng phép nhân, rồi đảo chiều điều kiện; mạch giao cho mạch sau xác suất lỗi $198/437$ sau một cảnh báo và giả thiết về cảm biến phát biểu bằng lời.

#### BY01 — Khung hình có cảnh báo
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập và trực quan của xác suất có điều kiện.
- **Nhu cầu/khoảng trống:** người dùng hệ thống cần tỉ lệ có người trong các khung hình bị cảnh báo; sản phẩm bị cảnh báo cần cùng phép tính (L421, L442).
- **Đầu vào → đầu ra:** bảng camera (nêu lại $0{,}18$, $0{,}08$, $0{,}26$) → phép "giữ cột rồi chia".
- **Vị trí:** chuỗi "có điều kiện"; phần việc: chuẩn hóa sau quan sát. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm` — hình `camera-conditioning.svg`. **Sửa (cổng):** "Nhu cầu:" nối tới xác suất lỗi của sản phẩm bị cảnh báo. **Bài tập:** không.
- **Phác thảo:** (1) **Nhu cầu:** tỉ lệ có người trong các khung hình bị cảnh báo. (2) Xác suất lỗi của một sản phẩm bị cảnh báo cần cùng phép tính. (3) $\mathbb P(H\cap C)=0{,}18$ là xác suất đồng thời trên mọi khung hình. (4) **Trực quan.** Biết $C$ xảy ra: bỏ cột $C^c$, chia hai ô còn lại cho $\mathbb P(C)=0{,}26$. (5) hình. (6) Tổng trọng số trong cột $C$ sau khi chia bằng $1$. ≈55 âm tiết, 5 dòng chữ + hình.
- **Ghi chú diễn giả:** biết $C$ đã xảy ra nghĩa là loại mọi kết quả ngoài $C$ và chia trọng số còn lại cho tổng của chúng (L450). Tỉ lệ cụ thể được tính ở trang ví dụ.
- **Mẫu (chỉ planning):** MAT1101 Bài 2 S5–S7 (điều kiện như không gian mẫu mới).

#### BY02 — Xác suất có điều kiện
- **Lý do tồn tại:** Định nghĩa 10.9 và tính chất "là một độ đo".
- **Nhu cầu/khoảng trống:** phép chia ở BY01 cần phát biểu cho mọi $E,F$ và điều kiện $\mathbb P(F)>0$.
- **Đầu vào → đầu ra:** BY01 → (5.1); mọi kết quả cho $\mathbb P$ đúng cho $\mathbb P(\cdot\mid F)$.
- **Vị trí:** chuỗi định nghĩa; phần việc: công cụ chuẩn hóa. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) **Định nghĩa.** Cho $E,F\in\mathcal F$ với $\mathbb P(F)>0$. (2) Xác suất có điều kiện (conditional probability) của $E$ khi biết $F$ là (3) display (5.1). (4) **Ý nghĩa:** với $F$ cố định, $\mathbb P(\cdot\mid F)$ là một độ đo xác suất gán xác suất $1$ cho $F$. (5) Do đó các quy tắc phần bù, hợp đúng cho $\mathbb P(\cdot\mid F)$. ≈45 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** kiểm tra ba tiên đề cho $\mathbb P(\cdot\mid F)$: không âm, $\mathbb P(\Omega\mid F)=1$, các $E_i\cap F$ xung khắc (L463–464); Định nghĩa 05c.8.

#### BY03 — Ví dụ: đọc lại cảnh báo của camera
- **Lý do tồn tại:** ví dụ của định nghĩa; đổi chỗ hai biến cố làm đổi đại lượng.
- **Nhu cầu/khoảng trống:** ngộ nhận "$90\%$" ở MD03 là sự nhầm $\mathbb P(H\mid C)$ với $\mathbb P(C\mid H)$.
- **Đầu vào → đầu ra:** BY02, dữ kiện camera → $9/13\approx0{,}6923$, $0{,}90$, $0{,}10$.
- **Vị trí:** ví dụ xuyên suốt camera; phần việc: phân biệt hai chiều điều kiện. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Sửa (cổng):** "Diễn giải:" khẳng định, ≤20 âm tiết. **Bài tập:** không.
- **Phác thảo:** (1) Theo bảng camera: $\mathbb P(H\cap C)=0{,}18$, $\mathbb P(H^c\cap C)=0{,}08$, $\mathbb P(H)=0{,}20$, $\mathbb P(C)=0{,}26$. (2) **Tính** $\mathbb P(H\mid C)$, $\mathbb P(C\mid H)$, $\mathbb P(C\mid H^c)$. (3) display `aligned` ba dòng. (4) Phần bù: $\mathbb P(H^c\mid C)=4/13$, và $9/13+4/13=1$. (5) **Diễn giải:** $\mathbb P(C\mid H)$ chuẩn hóa trong nhóm có người, $\mathbb P(H\mid C)$ chuẩn hóa trong nhóm bị cảnh báo. (15) ≈40 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** câu hỏi đặt trước khi tính: trong các khung hình có cảnh báo, tỉ lệ có người có bằng tỉ lệ cảnh báo trong các khung hình có người không (L468); $\mathbb P(C\mid H^c)=0{,}10$ là tỉ lệ cảnh báo nhầm của camera.

#### BY04 — Cây xác suất của nguồn hàng và lỗi
- **Lý do tồn tại:** nhu cầu, trực quan và ví dụ của quy tắc nhân và công thức toàn phần; trả lời ngộ nhận "$5\%$" của MD03.
- **Nhu cầu/khoảng trống:** dữ kiện sản phẩm là tỉ lệ trong từng nhóm; xác suất lỗi của một sản phẩm chọn ngẫu nhiên chưa có (L494).
- **Đầu vào → đầu ra:** BY02, tham số $0{,}6/0{,}4$, $0{,}02/0{,}08$ → $\mathbb P(Y=1)=0{,}044$; trực quan "tích dọc đường".
- **Vị trí:** ví dụ xuyên suốt sản phẩm, giai đoạn 2; phần việc: "nhân tỉ lệ lỗi với tỉ lệ nhóm". **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm` — hình `supplier-tree-deck.svg` (vẽ cho trang chiếu ở rà soát v1; `supplier-probability-tree.svg` giữ cho ghi chú bài giảng). **Sửa (cổng):** đổi chỗ với trang quy tắc nhân (cây trước); dùng "xác suất lỗi trước quan sát" thay "tiên nghiệm". **Bài tập:** không.
- **Phác thảo:** (1) **Nhu cầu:** dữ kiện là tỉ lệ trong nhóm, như $\mathbb P(Y=1\mid S=a)=0{,}02$. (2) **Trực quan.** Mỗi đường từ gốc tới lá là một tích; cộng các lá lỗi. (3) hình cây. (4) display $\mathbb P(Y=1)=0{,}6\cdot0{,}02+0{,}4\cdot0{,}08=0{,}044$. (5) Sau một quan sát: giữ các đường phù hợp quan sát, chia cho tổng của chúng. (6) **Diễn giải:** xác suất lỗi trước quan sát là $4{,}4\%$, trung bình của hai tỉ lệ lỗi với trọng số $0{,}6$ và $0{,}4$. (18) ≈55 âm tiết, 5 dòng chữ + hình, 1 công thức hiển thị.
- **Ghi chú diễn giả:** các nhánh không đồng xác suất (L681); trung bình cộng $5\%$ bỏ qua việc $a$ giao nhiều hàng hơn; dòng cuối là phép chuẩn hóa của trang khung hình có cảnh báo, áp trên cây.

#### BY05 — Quy tắc nhân
- **Lý do tồn tại:** Mệnh đề 10.10 (kết quả phụ trợ, "Chứng minh." một dòng, Q-C).
- **Nhu cầu/khoảng trống:** tích dọc mỗi đường của cây cần phát biểu cho mọi biến cố.
- **Đầu vào → đầu ra:** BY02, BY04 → $\mathbb P(E\cap F)=\mathbb P(E\mid F)\mathbb P(F)$, (5.2).
- **Vị trí:** chuỗi kết quả; phần việc: phép nhân của phân rã. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Sửa (cổng):** đặt sau cây; không nhắc số hiệu công thức không hiển thị. **Bài tập:** không.
- **Phác thảo:** (1) Tích dọc một đường của cây là xác suất đồng thời của các nhánh. (2) **Mệnh đề.** Nếu $\mathbb P(F)>0$ thì $\mathbb P(E\cap F)=\mathbb P(E\mid F)\,\mathbb P(F)$. (3) Nếu $\mathbb P(E\cap F)>0$ thì display (5.2). (4) **Chứng minh.** Nhân hai vế của định nghĩa xác suất có điều kiện với mẫu số; với ba biến cố, áp dụng hai lần. (19) (5) **Ý nghĩa:** (5.2) còn gọi là quy tắc chuỗi (chain rule); không cần giả thiết độc lập. (16) ≈46 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** thứ tự nhân theo cơ chế sinh dữ liệu: nhà cung cấp, tình trạng lỗi, phản hồi cảm biến (L533); $\mathbb P(E)\ge\mathbb P(E\cap F)>0$ theo tính đơn điệu nên mọi xác suất có điều kiện trong (5.2) xác định; quy tắc chuỗi không giả thiết độc lập (L536); Mệnh đề 05c.9; Murphy (2022), §2.2.3.

#### BY06 — Xác suất toàn phần và định lý Bayes
- **Lý do tồn tại:** phát biểu Định lý 10.11 với đủ giả thiết.
- **Nhu cầu/khoảng trống:** phép cộng lá và phép chuẩn hóa trên cây cần phát biểu cho phân hoạch bất kỳ.
- **Đầu vào → đầu ra:** BY04–BY05 → (5.3), (5.4).
- **Vị trí:** kết quả trung tâm của mạch 3. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) **Định lý.** $B_1,\ldots,B_m$ là một phân hoạch (partition) của $\Omega$: đôi một xung khắc, hợp bằng $\Omega$; $\mathbb P(B_j)>0$; $E\in\mathcal F$. (2) Công thức xác suất toàn phần (law of total probability): (3) display (5.3). (4) Nếu thêm $\mathbb P(E)>0$, định lý Bayes (Bayes' rule) cho, với $k=1,\ldots,m$: (5) display (5.4). ≈40 âm tiết, 5 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** nhóm có xác suất $0$ góp $0$ vào mọi tổng nên có thể bỏ (L538); Mệnh đề 05c.10, Định lý 05c.11.
- **Mẫu (chỉ planning):** MAT1101 Bài 2 S19, S25 (khuôn "Nếu … thì …").

#### BY07 — Chứng minh: xác suất toàn phần
- **Lý do tồn tại:** P2, bước 1.
- **Nhu cầu/khoảng trống:** chỉ ra chỗ dùng cộng tính và chỗ dùng $\mathbb P(B_j)>0$.
- **Đầu vào → đầu ra:** BY06, MH05, BY05 → (5.3) đã chứng minh.
- **Vị trí:** kết quả của sườn; phần việc: mẫu số của định lý Bayes. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ nhãn "Ý tưởng:". **Bài tập:** không.
- **Phác thảo:** (1) Biến cố $E$ được chia theo các nhóm $B_j$ rồi cộng lại. (2) **Các mảnh xung khắc.** Các $E\cap B_j$ đôi một xung khắc, hợp bằng $E\cap\Omega=E$. (3) display `aligned` $\mathbb P(E)=\sum_j\mathbb P(E\cap B_j)=\sum_j\mathbb P(E\mid B_j)\,\mathbb P(B_j)$. (4) Đẳng thức thứ nhất: cộng tính hữu hạn; thứ hai: quy tắc nhân, dùng $\mathbb P(B_j)>0$. ≈35 âm tiết, 4 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** các $E\cap B_j$ xung khắc vì các $B_j$ xung khắc; công thức đi từ các nhóm tới xác suất của quan sát (L596).

#### BY08 — Chứng minh: định lý Bayes
- **Lý do tồn tại:** P2, bước 2.
- **Nhu cầu/khoảng trống:** hậu nghiệm tính được mà không cần biết trước $\mathbb P(E)$ (L586).
- **Đầu vào → đầu ra:** BY02, BY05, BY07 → (5.4) đã chứng minh.
- **Vị trí:** kết quả trung tâm của mạch 3; phần việc: phép chuẩn hóa. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ nhãn "Ý tưởng:"; gọi công thức toàn phần bằng tên. **Bài tập:** không.
- **Phác thảo:** (1) Viết $\mathbb P(B_k\mid E)$ theo định nghĩa, rồi đổi chiều điều kiện ở tử số. (2) display `aligned` $\mathbb P(B_k\mid E)=\dfrac{\mathbb P(B_k\cap E)}{\mathbb P(E)}=\dfrac{\mathbb P(E\mid B_k)\,\mathbb P(B_k)}{\mathbb P(E)}$. (3) Đẳng thức thứ nhất: định nghĩa, cần $\mathbb P(E)>0$; thứ hai: quy tắc nhân. (4) **Công thức Bayes.** Thay mẫu số bằng công thức xác suất toàn phần. ≈32 âm tiết, 4 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** công thức toàn phần đi từ các nhóm tới quan sát, định lý Bayes đi theo chiều ngược lại (L596).

#### BY09 — Tiên nghiệm, hợp lý và hậu nghiệm
- **Lý do tồn tại:** đọc các thành phần của (5.4) và dạng tỉ lệ (5.5).
- **Nhu cầu/khoảng trống:** định lý cần tên cho từng thành phần trước khi áp vào sản phẩm.
- **Đầu vào → đầu ra:** BY06–BY08 → prior, likelihood, posterior, marginal likelihood; (5.5).
- **Vị trí:** phương pháp của sườn; phần việc: phân rã "hậu nghiệm ∝ tiên nghiệm × hợp lý". **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) $\mathbb P(B_k)$ là xác suất tiên nghiệm (prior), trước quan sát. (2) $\mathbb P(E\mid B_k)$, xem như hàm của $k$, là hàm hợp lý (likelihood); tổng theo $k$ không nhất thiết bằng $1$. (17) (3) $\mathbb P(B_k\mid E)$ là xác suất hậu nghiệm (posterior), sau quan sát. (4) $\mathbb P(E)$ ở mẫu số là hợp lý biên (marginal likelihood). (5) display (5.5). (6) $\propto$: hai vế bằng nhau sai khác một hằng số dương không phụ thuộc $k$. ≈55 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** hằng số tỉ lệ được xác định bằng điều kiện tổng các hậu nghiệm bằng $1$ (L603); Bài 05c gọi hàm hợp lý là độ hợp lý; Murphy (2022), §2.3.

#### BY10 — Ví dụ: cập nhật xác suất sản phẩm lỗi
- **Lý do tồn tại:** áp dụng Bayes vào bài toán trung tâm; trả lời câu hỏi MD03 cho xác suất lỗi.
- **Nhu cầu/khoảng trống:** xác suất lỗi trước quan sát $0{,}044$ và đặc tính cảm biến chưa được ghép.
- **Đầu vào → đầu ra:** BY04, BY09 → $\mathbb P(A=1)=0{,}0874$, $\mathbb P(Y=1\mid A=1)=198/437\approx0{,}4531$.
- **Vị trí:** ví dụ xuyên suốt sản phẩm, giai đoạn 3; trả lời câu hỏi trung tâm của mạch. **CLO2:** mục tiêu 2, 6.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) Tiên nghiệm $\mathbb P(Y=1)=0{,}044$; độ nhạy (sensitivity) $\mathbb P(A=1\mid Y=1)=0{,}9$. (2) Tỉ lệ cảnh báo nhầm (false positive rate, FPR) $\mathbb P(A=1\mid Y=0)=0{,}05$. (3) **Tính** $\mathbb P(Y=1\mid A=1)$. (4) display `aligned`: $\mathbb P(A=1)=0{,}9\cdot0{,}044+0{,}05\cdot0{,}956=0{,}0874$; $\mathbb P(Y=1\mid A=1)=0{,}0396/0{,}0874=198/437\approx0{,}4531$. (5) **Diễn giải:** sau cảnh báo, xác suất lỗi tăng từ $0{,}044$ lên khoảng $0{,}45$, thấp hơn nhiều so với $0{,}9$. (18) ≈40 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** kiểm tra bằng $10\,000$ sản phẩm: $440$ lỗi, $396$ bị cảnh báo; $9560$ đạt, $478$ bị cảnh báo nhầm; $396/874=198/437$ (L671–676); phép tính chỉ dùng $\mathbb P(A=1\mid Y=y)$; giả thiết về nguồn hàng chỉ cần khi tính xác suất có cả $S$ và $A$ (L669); tỉ lệ cảnh báo nhầm là xác suất có điều kiện, khác xác suất đồng thời của biến cố cảnh báo sai (L624); khi cơ cấu nguồn hàng đổi, hậu nghiệm đổi dù cảm biến giữ nguyên (L685); Murphy (2022), §2.3.1.

#### BY11 — Bài tập: đọc điều kiện trên bảng camera
- **Lý do tồn tại:** Bài tập 10.1 trên lớp, bài có lời giải trên mặt trang của mạch 3 (Q-B).
- **Nhu cầu/khoảng trống:** đo khả năng đọc đúng mẫu số, tránh đảo điều kiện và dùng toàn phần rồi Bayes trên một bảng mới (tuyến đường vắng).
- **Đầu vào → đầu ra:** BY02–BY08 → $\mathbb P(C\mid H)=0{,}9$, $\mathbb P(C\mid H^c)=0{,}2$, $\mathbb P(H\mid C)=1/3$.
- **Vị trí:** bài tập của cụm có điều kiện và Bayes; kiểm tra phần "đảo chiều" của câu hỏi mạch. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Sửa (cổng):** thêm dòng "Cách khác:" tính bằng toàn phần rồi Bayes (số đã kiểm với BT L11–19, L32–48: $\mathbb P(H)=0{,}10$, $\mathbb P(C\mid H)=0{,}90$, $\mathbb P(C\mid H^c)=0{,}20$, $\mathbb P(H^c)=0{,}90$; $0{,}09+0{,}18=0{,}27$; $0{,}09/0{,}27=1/3$). **Bài tập:** có lời giải trên mặt trang (fragment); câu (b) của Bài tập 10.1 là tự học, đáp án trong ghi chú diễn giả.
- **Phác thảo:** (1) bảng 2×2 hàng $H$, $H^c$, cột $C$, $C^c$: $0{,}09$; $0{,}01$; $0{,}18$; $0{,}72$. (2) **Câu hỏi:** (a) Tính $\mathbb P(C\mid H)$, $\mathbb P(C\mid H^c)$, $\mathbb P(H\mid C)$; (b) kiểm tra phát biểu "$90\%$ cảnh báo ứng với khung hình có người". (17) (3) fragment **Lời giải:** display `aligned` $0{,}09/0{,}10=0{,}9$; $0{,}18/0{,}90=0{,}2$; $0{,}09/0{,}27=1/3$. (4) (b) Phát biểu sai vì đảo điều kiện: $\mathbb P(C\mid H)=0{,}9$ nhưng $\mathbb P(H\mid C)=1/3$. (5) **Cách khác:** $\mathbb P(H\mid C)=0{,}9\cdot0{,}1/(0{,}9\cdot0{,}1+0{,}2\cdot0{,}9)=1/3$ (toàn phần rồi Bayes). ≈42 âm tiết, 5 dòng, 1 công thức hiển thị. Câu (b) trên trang là câu (c) của Bài tập 10.1.
- **Ghi chú diễn giả:** câu (b) của tệp bài tập: $\mathbb P(H^c\cap C)=0{,}18$ tính trên mọi khung hình, $\mathbb P(C\mid H^c)=0{,}20$ tính trong nhóm không có người (BT L44); trên $100$ khung hình có $10$ khung hình có người, $9$ bị cảnh báo, và $18$ trong $90$ khung hình không có người bị cảnh báo, nên tỉ lệ có người trong $27$ cảnh báo là $9/27$ (BT L48); nhầm lẫn này còn gọi là ngụy biện của công tố viên (prosecutor's fallacy, Murphy (2022), Bài tập 2.10).

### Mạch 4 · Biến ngẫu nhiên, phân phối và độc lập

#### PP00 — 4. Biến ngẫu nhiên, phân phối và độc lập (trang tiêu đề mạch, `id="mach-4"`)
- **Lý do tồn tại:** mở mạch 4, nêu câu hỏi trung tâm và phân rã.
- **Nhu cầu/khoảng trống:** mạch 3 xử lý từng biến cố; giả thiết về cảm biến mới nêu bằng lời; tín hiệu đo liên tục chưa mô tả được.
- **Đầu vào → đầu ra:** BY10 → nhiệm vụ: phân phối của $S,Y,A$, mật độ, $A\perp S\mid Y$.
- **Vị trí:** điểm vào mạch 4; đảm nhận bước nhu cầu của cụm biến ngẫu nhiên (cùng PP01). **CLO2:** mục tiêu 2, 3.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** h2 "4. Biến ngẫu nhiên, phân phối và độc lập"; dòng dẫn "Muốn ghép nguồn hàng, nhãn lỗi và cảnh báo thành một mô hình, cần phân phối của từng biến và quy tắc độc lập." (23); từ khóa "Hàm khối xác suất · Hàm phân phối tích lũy · Mật độ · Họ phân phối · Độc lập có điều kiện".
- **Ghi chú diễn giả (≈80 âm tiết):** kế thừa định lý Bayes cho biến cố và hậu nghiệm $198/437$; nhiệm vụ là xem nhà cung cấp, nhãn lỗi và cảnh báo như ba hàm của một kết quả kiểm định, mô tả phân phối bằng hàm khối xác suất, hàm phân phối tích lũy, mật độ, gọi tên các họ phân phối và phát biểu độc lập có điều kiện; mạch giao cho mạch sau phân phối của $Y$ và giả thiết $A\perp S\mid Y$ ở dạng dùng được trong phép nhân.

#### PP01 — Đại lượng quan sát của một lần kiểm định
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập và trực quan của biến ngẫu nhiên.
- **Nhu cầu/khoảng trống:** một lần kiểm định cho cùng lúc nhà cung cấp, tình trạng lỗi và cảnh báo (L796).
- **Đầu vào → đầu ra:** $\{S=a\}$, $\{Y=1\}$, $\{A=1\}$ của BY10 → $S,Y,A$ là ba hàm trên cùng $\omega$.
- **Vị trí:** đối tượng $S,Y,A$; phần việc: "phân phối của nhãn, nguồn hàng". **CLO2:** mục tiêu 3.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) **Nhu cầu:** một lần kiểm định cho cùng lúc nhà cung cấp, tình trạng lỗi và cảnh báo. (2) Mỗi đại lượng gán một giá trị cho mỗi kết quả $\omega$. (3) **Ví dụ.** $S(\omega)\in\{a,b\}$; $Y(\omega)=1$ nếu sản phẩm lỗi; $A(\omega)=1$ nếu có cảnh báo. (4) **Trực quan.** Hàm cố định; giá trị chưa biết vì $\omega$ chưa biết. ≈51 âm tiết, 4 dòng.
- **Ghi chú diễn giả:** hai biến có thể cùng phân phối mà vẫn là hai hàm khác nhau trên $\Omega$ (L818); $\{Y=1\}$ giữ nguyên nghĩa biến cố của các phần trước.
- **Mẫu (chỉ planning):** MAT1101 Bài 3 S5–S9.

#### PP02 — Biến ngẫu nhiên và phân phối
- **Lý do tồn tại:** Định nghĩa 10.14; biến chỉ thị, biến phân loại và vector ngẫu nhiên, dùng ở các trang sau ($S$ ở PP07–PP11, $X\in\mathbb R^d$ ở PP08, KV02).
- **Nhu cầu/khoảng trống:** PP01 mô tả bằng lời; cần điều kiện đo được, khái niệm phân phối và các kiểu giá trị.
- **Đầu vào → đầu ra:** PP01 → $X:\Omega\to\mathbb R$, $\mathbb P(X\in B)$, $\mathbf 1_E$, biến phân loại, vector ngẫu nhiên.
- **Vị trí:** chuỗi định nghĩa; phần việc: "phân phối". **CLO2:** mục tiêu 3.
- **Quyết định:** `thêm`. **Sửa (cổng):** thay "Lưu ý:" bằng hai dòng biến phân loại và vector ngẫu nhiên (L815); "Lưu ý:" cũ vào ghi chú diễn giả. **Bài tập:** không.
- **Phác thảo:** (1) **Định nghĩa.** Biến ngẫu nhiên (random variable) thực là ánh xạ $X:\Omega\to\mathbb R$ với $\{X\le t\}\in\mathcal F$ cho mọi $t$. (2) Phân phối (distribution) của $X$ gán cho tập Borel $B$ xác suất (3) display (6.1). (4) Biến chỉ thị (indicator) $\mathbf 1_E$ bằng $1$ trên $E$, bằng $0$ ngoài $E$. (5) Biến phân loại nhận giá trị trong một tập nhãn hữu hạn, như $S\in\{a,b\}$. (6) Vector ngẫu nhiên trong $\mathbb R^d$ là bộ $d$ biến thực trên cùng $\Omega$. ≈55 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** với $\mathcal F=2^\Omega$ hữu hạn, mọi hàm đều đo được (measurable) (L818); tập Borel gồm các khoảng, tập đơn điểm và mọi tập thu được bằng phần bù, hợp đếm được (L815); $Y$ là biến chỉ thị của biến cố sản phẩm lỗi (L820); cùng một hàm có phân phối khác khi $\mathbb P$ đổi, chẳng hạn khi cơ cấu nguồn hàng đổi (L818).

#### PP03 — Hàm khối xác suất và hàm phân phối tích lũy
- **Lý do tồn tại:** Định nghĩa 10.15.
- **Nhu cầu/khoảng trống:** nhãn lỗi, nguồn hàng, mức xử lý nhận hữu hạn giá trị (L824); phát biểu vượt ngưỡng cần hàm phân phối tích lũy.
- **Đầu vào → đầu ra:** PP02 → $p_X$, $F_X$, công thức hiệu.
- **Vị trí:** chuỗi định nghĩa; phần việc: "phân phối của nhãn". **CLO2:** mục tiêu 3.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) **Định nghĩa.** $X$ nhận giá trị trong tập đếm được $\mathcal X$: hàm khối xác suất (probability mass function, PMF) là (2) display $p_X(x)=\mathbb P(X=x)$, $\sum_xp_X(x)=1$. (3) $X$ thực: hàm phân phối tích lũy (cumulative distribution function, CDF) là $F_X(t)=\mathbb P(X\le t)$. (4) $F_X$ không giảm, liên tục phải, tiến về $0$ và $1$ ở hai đầu. (5) display $\mathbb P(t_1<X\le t_2)=F_X(t_2)-F_X(t_1)$. ≈45 âm tiết, 5 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** không giảm vì $\{X\le s\}\subseteq\{X\le t\}$ (L850); liên tục phải và hai giới hạn được dùng không chứng minh; với phân phối rời rạc, thay $X>t_1$ bằng $X\ge t_1$ có thể thêm một khối xác suất dương (L856); Định nghĩa 05c.17–05c.18.
- **Mẫu (chỉ planning):** MAT1101 Bài 5 S16–S17.

#### PP04 — Ví dụ: mức xử lý sản phẩm
- **Lý do tồn tại:** ví dụ hàm phân phối tích lũy bậc thang và xác suất vượt ngưỡng (Ví dụ 10.7).
- **Nhu cầu/khoảng trống:** hàm phân phối tích lũy của biến rời rạc có bước nhảy; dấu bằng ở đầu khoảng làm đổi kết quả.
- **Đầu vào → đầu ra:** PP03 → $F_X$ bậc thang, $\mathbb P(X\le1)=0{,}90$, $\mathbb P(X\ge1)=0{,}30$.
- **Vị trí:** ví dụ của chuỗi; phần việc: "phân phối của một nhãn có thứ tự". **CLO2:** mục tiêu 3.
- **Quyết định:** `thêm` — hình `cdf-three-levels.svg`. **Bài tập:** không (Bài tập 10.7 tự học, ghi chú diễn giả).
- **Phác thảo:** (1) Mức xử lý $X\in\{0;1;2\}$ (không can thiệp, kiểm tra lại, sửa chữa) với $p_X(0)=0{,}70$, $p_X(1)=0{,}20$, $p_X(2)=0{,}10$. (2) **Tính** $F_X$, $\mathbb P(X\le1)$, $\mathbb P(X\ge1)$. (3) hai cột: hình bậc thang | display `cases` của $F_X$. (4) $\mathbb P(X\le1)=F_X(1)=0{,}90$; $\mathbb P(X\ge1)=1-p_X(0)=0{,}30$. (5) **Diễn giải:** $\{X\ge1\}$ là biến cố sản phẩm cần can thiệp; $\mathbb P(X\ge1)$ lớn hơn $\mathbb P(X>1)$ đúng một khối $0{,}20$. ≈40 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** kiểm tra $F_X(2)-F_X(0)=0{,}30$ (L875); các mức $0,1,2$ là mã quy ước (L877); Bài tập 10.7 (phân phối rời rạc ba giá trị) để tự học.

#### PP05 — Mật độ xác suất
- **Lý do tồn tại:** nhu cầu, trực quan, ví dụ và Định nghĩa 10.18 gộp một trang (Q-H).
- **Nhu cầu/khoảng trống:** tín hiệu đo nhận mọi giá trị trong một khoảng, không có khối xác suất dương tại từng điểm (L977).
- **Đầu vào → đầu ra:** PP03 → $f_X$, (6.7), $\mathbb P(X=x)=0$, $f_X$ có thể lớn hơn $1$.
- **Vị trí:** chuỗi định nghĩa; phần việc: "phân phối của tín hiệu đo". **CLO2:** mục tiêu 3.
- **Quyết định:** `thêm` (đã `gộp`) — hình `density-area.svg`. **Bài tập:** không (bài ở PP06).
- **Phác thảo:** (1) **Nhu cầu:** tín hiệu đo như điện áp nhận mọi giá trị trong một khoảng; xác suất tại mỗi điểm bằng $0$. (19) (2) **Trực quan.** Xác suất trên một khoảng là diện tích dưới đường mật độ; hình cạnh dòng. (3) **Định nghĩa.** $X$ có hàm mật độ xác suất (probability density function, PDF) $f_X\ge0$, $\int f_X=1$, nếu với mọi tập Borel $B$: (4) display (6.7). (5) **Lưu ý:** mật độ đều trên $[0;\,0{,}1]$ bằng $10>1$; $\mathbb P(x\le X\le x+\delta)\approx f_X(x)\,\delta$. ≈57 âm tiết, 5 dòng + hình, 1 công thức hiển thị. `tách` lại nếu số đo thật vượt 60 hoặc tràn khung.
- **Ghi chú diễn giả:** $F_X(t)=\int_{-\infty}^tf_X$ và $F_X'=f_X$ tại điểm liên tục; mật độ có đơn vị nghịch đảo đơn vị đo, xác suất không có đơn vị (L1000); thiết bị làm tròn số đo ghi nhận cả một khoảng (L1002); có phân phối vừa có khối tại $0$ vừa có phần liên tục (L1004); Định nghĩa 05c.22; Murphy (2022), §2.2.2, §2.6.2.
- **Mẫu (chỉ planning):** MAT1101 Bài 5 S5–S9.

#### PP06 — Bài tập: mật độ đều trên một đoạn
- **Lý do tồn tại:** Bài tập 10.2 trên lớp; phân biệt giá trị mật độ với xác suất.
- **Nhu cầu/khoảng trống:** ngộ nhận "mật độ $2$ là xác suất $2$".
- **Đầu vào → đầu ra:** PP05 → $\int f_T=1$, $\mathbb P(T=0{,}2)=0$, $\mathbb P(0{,}1\le T\le0{,}3)=0{,}4$.
- **Vị trí:** bài tập của cụm mật độ; phần việc: "tín hiệu đo". **CLO2:** mục tiêu 3.
- **Quyết định:** `thêm`. **Bài tập:** có lời giải trên mặt trang (fragment) cho (a), (b); câu (c) tự học, đáp án trong ghi chú diễn giả.
- **Phác thảo:** (1) Thời gian xử lý $T$ (giây): $f_T(t)=2$ khi $0\le t\le0{,}5$, bằng $0$ ngoài đoạn này. (2) **Câu hỏi:** (a) Kiểm tra $f_T$ là một mật độ dù $f_T>1$. (3) (b) Tính $\mathbb P(T=0{,}2)$ và $\mathbb P(0{,}1\le T\le0{,}3)$. (4) fragment **Lời giải:** display `aligned` $\int_0^{0{,}5}2\,dt=1$; $\mathbb P(T=0{,}2)=0$; $\mathbb P(0{,}1\le T\le0{,}3)=2\cdot0{,}2=0{,}4$. (5) **Diễn giải:** $f_T(0{,}2)=2$ là mật độ, có đơn vị nghịch đảo của giây. ≈40 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** câu (c): $F_T(t)=0$ khi $t<0$, $2t$ khi $0\le t\le0{,}5$, $1$ khi $t>0{,}5$; kiểm tra $F_T(0{,}3)-F_T(0{,}1)=0{,}4$ (BT L83–96).

#### PP07 — Phân phối Bernoulli và phân phối phân loại
- **Lý do tồn tại:** Định nghĩa 10.19; gọi tên phân phối của nhãn lỗi và nhãn nhiều lớp.
- **Nhu cầu/khoảng trống:** nhãn lỗi hai giá trị, loại lỗi $K$ giá trị (L1008) cần họ có tham số.
- **Đầu vào → đầu ra:** PP02–PP03 → $\operatorname{Bernoulli}(\theta)$, $\operatorname{Cat}(\pi)$.
- **Vị trí:** chuỗi định nghĩa; phần việc: "phân phối của nhãn". **CLO2:** mục tiêu 3.
- **Quyết định:** `thêm`. **Sửa (cổng):** "Ý nghĩa:" đọc tham số. **Bài tập:** không (kiểm tra ở KV13).
- **Phác thảo:** (1) **Định nghĩa.** $Y\in\{0,1\}$ có phân phối Bernoulli tham số $\theta\in[0,1]$ nếu (2) display (6.9) gọn một dòng. (3) $Z\in\{1,\ldots,K\}$ có phân phối phân loại (categorical distribution) tham số $\pi=(\pi_1,\ldots,\pi_K)$ nếu (4) display (6.10). (5) **Ý nghĩa:** $\theta=\mathbb P(Y=1)$; phân phối Bernoulli là phân phối phân loại với $K=2$, mã hóa $0$ và $1$. ≈42 âm tiết, 5 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** $Y\sim\operatorname{Bernoulli}(0{,}044)$ khi chưa biết nhà cung cấp; khi biết $S=a$, phân phối có điều kiện của $Y$ là $\operatorname{Bernoulli}(0{,}02)$ (L1034); phân phối phân loại có $K-1$ tham số tự do; Murphy (2022), §2.4.1, §2.5.1.

#### PP08 — Phân phối Gaussian
- **Lý do tồn tại:** Định nghĩa 10.20; họ mật độ cho tín hiệu đo (mục tiêu 3, L27; lý do giữ ghi ở bản đồ hành trình).
- **Nhu cầu/khoảng trống:** số đo thực cần một họ mật độ có tham số tâm và độ rộng.
- **Đầu vào → đầu ra:** PP05 → $\mathcal N(\mu,\sigma^2)$, $\mathcal N(\mu,\Sigma)$ với $\Sigma$ đối xứng xác định dương.
- **Vị trí:** chuỗi định nghĩa; phần việc: "phân phối của tín hiệu đo". **CLO2:** mục tiêu 3.
- **Quyết định:** `thêm`; không có hình (Q-H). **Bài tập:** không.
- **Phác thảo:** (1) **Định nghĩa.** $X$ có phân phối Gaussian (còn gọi là phân phối chuẩn) $\mathcal N(\mu,\sigma^2)$, $\mu\in\mathbb R$, $\sigma^2>0$, nếu có mật độ (2) display (6.11) viết cho $f_X(x)$. (3) Vector $X\in\mathbb R^d$ có phân phối $\mathcal N(\mu,\Sigma)$, $\Sigma$ đối xứng xác định dương, nếu (4) display (6.12) với $\Delta(x)=(x-\mu)^\top\Sigma^{-1}(x-\mu)$. (5) **Ý nghĩa:** $\mu$ là tâm; tăng $\sigma$ làm đỉnh thấp xuống và trải diện tích rộng ra. ≈45 âm tiết, 5 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** hệ số chuẩn hóa dùng $\int e^{-u^2/2}du=\sqrt{2\pi}$ (L1057); $\mathbb E[X]=\mu$, $\operatorname{Var}(X)=\sigma^2$ (ghi chú bài giảng, Phụ lục C); với $\Sigma$ chỉ nửa xác định dương, phân phối tập trung trên một không gian con và không có mật độ (L1061); Bài 05c gọi là phân phối Gauss; Murphy (2022), §2.6.1, §3.2.1.
- **Mẫu (chỉ planning):** MAT1101 Bài 5 S25.

#### PP09 — Độc lập của biến cố và của biến ngẫu nhiên
- **Lý do tồn tại:** Định nghĩa 10.12 và 10.16 phần 1 (chuyển từ ghi chú §5.4 sang mạch 4 theo Q-A).
- **Nhu cầu/khoảng trống:** quy tắc nhân luôn mang điều kiện; bỏ một điều kiện cần giả thiết độc lập phát biểu rõ (L689).
- **Đầu vào → đầu ra:** BY05, PP02 → độc lập của biến cố, $X\perp Z$.
- **Vị trí:** chuỗi định nghĩa; phần việc: "quy tắc ghép các biến". **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Sửa (cổng):** ≤6 dòng, gộp "Trực quan." với "Dạng khác:". **Bài tập:** không.
- **Phác thảo:** (1) **Nhu cầu:** bỏ một điều kiện trong quy tắc nhân cần một giả thiết phát biểu rõ. (2) **Trực quan.** Biết $F$ không đổi xác suất của $E$: khi $\mathbb P(F)>0$, $\mathbb P(E\mid F)=\mathbb P(E)$. (3) **Định nghĩa.** $E,F$ độc lập (independent) nếu (4) display (5.10). (5) $X\perp Z$ nếu $\mathbb P(X\in B_1,Z\in B_2)=\mathbb P(X\in B_1)\,\mathbb P(Z\in B_2)$ với mọi $B_1,B_2$; rời rạc: $\mathbb P(X=x,Z=z)=p_X(x)\,p_Z(z)$. (6) **Lưu ý:** hai biến cố xung khắc có xác suất dương thì phụ thuộc. ≈52 âm tiết, 6 dòng, 1 công thức hiển thị. Không dùng $p_{X,Z}$ (định nghĩa ở SL02).
- **Ghi chú diễn giả:** trên bảng camera, $\mathbb P(H)\,\mathbb P(C)=0{,}052\ne0{,}18$, nên cảnh báo phụ thuộc sự có mặt của người, đúng yêu cầu đối với một bộ phát hiện có ích (Ví dụ 10.5); độc lập đồng thời của một họ biến cố (L699); xung khắc là tính chất của phép giao, độc lập là tính chất của độ đo (L704); Định nghĩa 05c.12, 05c.23; Murphy (2022), §2.2.4.
- **Mẫu (chỉ planning):** MAT1101 Bài 2 S28.

#### PP10 — Độc lập có điều kiện
- **Lý do tồn tại:** Định nghĩa 10.13 và 10.16 phần 2; viết giả thiết của bài thành $A\perp S\mid Y$.
- **Nhu cầu/khoảng trống:** hệ thống sản phẩm cần độc lập bên trong từng nhóm có cùng tình trạng lỗi (L718).
- **Đầu vào → đầu ra:** PP09 → (5.11), (6.5), $A\perp S\mid Y$.
- **Vị trí:** giả thiết của sườn; phần việc: "quy tắc ghép các biến". **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ số hiệu công thức không hiển thị ở dòng giả thiết. **Bài tập:** không.
- **Phác thảo:** (1) **Định nghĩa.** Với $\mathbb P(G)>0$, $E,F$ độc lập có điều kiện (conditionally independent) khi biết $G$ nếu (2) display (5.11). (3) Biến rời rạc: $U\perp V\mid W$ nếu với mọi $w$ có $p_W(w)>0$ và mọi $u,v$: (4) display (6.5). (5) **Giả thiết:** $A\perp S\mid Y$: trong nhóm cùng tình trạng lỗi, nguồn hàng không đổi xác suất cảnh báo. (16) ≈46 âm tiết, 5 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** (5.11) là định nghĩa độc lập áp cho độ đo $\mathbb P(\cdot\mid G)$; khi $\mathbb P(F\cap G)>0$ nó tương đương $\mathbb P(E\mid F\cap G)=\mathbb P(E\mid G)$ (L732–741); mỗi giả thiết độc lập có điều kiện cần một lý do mô hình hóa, ở đây là đáp ứng của cảm biến chỉ phụ thuộc tình trạng lỗi (L790); Định nghĩa 05c.15.

#### PP12 — Dạng tương đương của độc lập có điều kiện
- **Lý do tồn tại:** Mệnh đề 10.17, P9 (SL06) dùng để bỏ điều kiện $S$.
- **Nhu cầu/khoảng trống:** dùng $A\perp S\mid Y$ trong phép nhân cần dạng "biết thêm $V$ không đổi phân phối của $U$" (L919).
- **Đầu vào → đầu ra:** PP10 → (6.6).
- **Vị trí:** kết quả của sườn; phần việc: "quy tắc ghép" ở dạng dùng được. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Sửa (cổng):** phát biểu (i) bằng công thức, không bằng số hiệu. **Bài tập:** không.
- **Phác thảo:** (1) **Mệnh đề.** $U,V,W$ rời rạc, $p_W(w)>0$. Hai phát biểu sau tương đương: (2) (i) $\mathbb P(U=u,V=v\mid W=w)=\mathbb P(U=u\mid W=w)\,\mathbb P(V=v\mid W=w)$ với mọi $u,v$; (3) (ii) với mọi $u$ và mọi $v$ có $\mathbb P(V=v,W=w)>0$: display (6.6). (4) **Chứng minh.** Viết mỗi xác suất có điều kiện thành tỉ số; khi $\mathbb P(V=v,W=w)=0$, hai vế của (i) bằng $0$. (17) (5) **Ý nghĩa:** với $U=A$, $V=S$, $W=Y$: thay $\mathbb P(A=a'\mid S=s,Y=y)$ bằng $\mathbb P(A=a'\mid Y=y)$ trong mọi phép nhân. ≈52 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** ba bước chứng minh viết gọn bằng $p(u\mid v,w)$: từ (i) suy ra (ii) bằng cách chia; từ (ii) suy ra (i) bằng quy tắc nhân cho $\mathbb P(\cdot\mid W=w)$; trường hợp xác suất $0$ dùng tính đơn điệu (L941–970); giả thiết này giảm số tham số của mô hình (L972).

#### PP11 — Ví dụ: cảnh báo và nguồn hàng
- **Lý do tồn tại:** độc lập có điều kiện không kéo theo độc lập (Ví dụ 10.6 phần 1).
- **Nhu cầu/khoảng trống:** sinh viên dễ đọc $A\perp S\mid Y$ thành "cảnh báo không liên quan nguồn hàng".
- **Đầu vào → đầu ra:** PP10 → $\mathbb P(A=1\mid S=a)=0{,}067$, $\mathbb P(A=1\mid S=b)=0{,}118$.
- **Vị trí:** ví dụ xuyên suốt sản phẩm; phần việc: "quy tắc ghép" và giới hạn của nó. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Sửa (cổng):** dòng trung bình theo nguồn hàng đặt trước "Diễn giải:"; không nhắc số hiệu tham số. **Bài tập:** không.
- **Phác thảo:** (1) Mô hình sản phẩm với $A\perp S\mid Y$: tỉ lệ lỗi $0{,}02$ ở $a$, $0{,}08$ ở $b$; độ nhạy $0{,}9$; tỉ lệ cảnh báo nhầm $0{,}05$. (2) **Tính** $\mathbb P(A=1\mid S=a)$ và $\mathbb P(A=1\mid S=b)$. (3) display $\mathbb P(A=1\mid S=s)=\sum_y\mathbb P(A=1\mid Y=y)\,\mathbb P(Y=y\mid S=s)$. (4) display `aligned` $0{,}9\cdot0{,}02+0{,}05\cdot0{,}98=0{,}067$; $0{,}9\cdot0{,}08+0{,}05\cdot0{,}92=0{,}118$. (5) Trung bình theo nguồn hàng: $0{,}6\cdot0{,}067+0{,}4\cdot0{,}118=0{,}0874=\mathbb P(A=1)$. (6) **Diễn giải:** $A$ và $S$ phụ thuộc dù $A\perp S\mid Y$; nguồn hàng ảnh hưởng cảnh báo qua tình trạng lỗi. (17) ≈45 âm tiết, 6 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** dòng (3) là công thức toàn phần cho độ đo $\mathbb P(\cdot\mid S=s)$ với phân hoạch theo $Y$, rồi bỏ điều kiện $S$ nhờ giả thiết (L748); hiện tượng ngược lại, độc lập nhưng phụ thuộc khi có điều kiện, xuất hiện ở bài tập cuối mạch.

#### PP13 — Bài tập: độc lập trước và sau khi quan sát
- **Lý do tồn tại:** Bài tập 10.3 trên lớp, bài có lời giải trên mặt trang của cụm độc lập (Q-B).
- **Nhu cầu/khoảng trống:** đo khả năng kiểm độc lập có điều kiện trên một phân phối cụ thể; hiện tượng ngược với PP11.
- **Đầu vào → đầu ra:** PP10, PP12 → $\mathbb P(U=1\mid W=0)=\mathbb P(V=1\mid W=0)=1/3$, $\mathbb P(U=1,V=1\mid W=0)=0\ne1/9$.
- **Vị trí:** bài tập của cụm; phần việc: "quy tắc ghép" và giới hạn của nó. **CLO2:** mục tiêu 2.
- **Quyết định:** `thêm`. **Bài tập:** có lời giải trên mặt trang (fragment).
- **Phác thảo:** (1) $U,V\in\{0,1\}$ độc lập, mỗi giá trị có xác suất $1/2$; dây chuyền chạy khi và chỉ khi $W=UV=1$. (2) **Câu hỏi:** Tính $\mathbb P(U=1\mid W=0)$, $\mathbb P(V=1\mid W=0)$, $\mathbb P(U=1,V=1\mid W=0)$; kiểm tra $U\perp V\mid W$. (3) fragment **Lời giải:** $W=0$ giữ ba cặp $(U,V)=(0,0),(0,1),(1,0)$, mỗi cặp $1/4$; $\mathbb P(W=0)=3/4$. (4) display $\mathbb P(U=1\mid W=0)=\mathbb P(V=1\mid W=0)=1/3$, $\mathbb P(U=1,V=1\mid W=0)=0\ne1/9$. (5) **Diễn giải:** khi dây chuyền dừng, biết bộ phận thứ nhất hoạt động thì bộ phận thứ hai hỏng. (17) ≈50 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $U=1$ khi bộ phận thứ nhất hoạt động, $V=1$ khi bộ phận thứ hai hoạt động (BT L104); kiểm tra bằng dạng tương đương: $\mathbb P(V=1\mid U=1,W=0)=0\ne1/3$ (BT L148); hai nguyên nhân độc lập trở nên phụ thuộc khi quan sát một hệ quả chung (BT L144).

### Mạch 5 · Kỳ vọng, phương sai và hiệp phương sai

#### KV00 — 5. Kỳ vọng, phương sai và hiệp phương sai (trang tiêu đề mạch, `id="mach-5"`)
- **Lý do tồn tại:** mở mạch 5, nêu câu hỏi trung tâm.
- **Nhu cầu/khoảng trống:** một phân phối là cả một hàm; đơn vị vận hành cần vài con số (L1063).
- **Đầu vào → đầu ra:** PP07, BY10 → nhiệm vụ: kỳ vọng, phương sai, hiệp phương sai, trung bình theo nhóm.
- **Vị trí:** điểm vào mạch 5; đảm nhận bước nhu cầu của cụm kỳ vọng. **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Sửa (cổng):** câu hỏi trung tâm và dòng dẫn mới. **Bài tập:** không.
- **Phác thảo:** h2 "5. Kỳ vọng, phương sai và hiệp phương sai"; dòng dẫn "Muốn tóm tắt chi phí và nhãn lỗi bằng vài con số, cần kỳ vọng, phương sai, hiệp phương sai và trung bình theo nhóm." (25); từ khóa "Kỳ vọng · Tính tuyến tính · Phương sai · Hiệp phương sai · Kỳ vọng toàn phần".
- **Ghi chú diễn giả (≈70 âm tiết):** kế thừa phân phối của nhãn lỗi và cảnh báo cùng quy tắc nhân; nhiệm vụ là trung bình có trọng số, quy tắc tính cho hàm và tổng, đại lượng đo dao động và quan hệ hai biến, trung bình qua hai mức thông tin; mạch giao cho mạch sau đẳng thức $\mathbb E[\mathbf 1_E]=\mathbb P(E)$ và chi phí kỳ vọng $0{,}0698$ của bộ cảnh báo.

#### KV01 — Kỳ vọng
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập, trực quan và Định nghĩa 10.21.
- **Nhu cầu/khoảng trống:** cần tóm tắt phân phối của nhãn lỗi bằng một con số; $Y$ nhận $0$, $1$ không cùng trọng số (L1071).
- **Đầu vào → đầu ra:** PP03, PP05 → (7.1), (7.2), khả tích.
- **Vị trí:** chuỗi định nghĩa; phần việc: "kỳ vọng". **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Sửa (cổng):** "Nhu cầu:" khớp câu hỏi trung tâm mới. **Bài tập:** không.
- **Phác thảo:** (1) **Nhu cầu:** tóm tắt phân phối của nhãn lỗi bằng một con số; $Y\in\{0,1\}$, $\mathbb P(Y=1)=0{,}044$. (14) (2) **Trực quan.** Lấy trung bình các giá trị, mỗi giá trị nhân với xác suất của nó; $\mathbb E[Y]$ gần $0$ hơn $1$. (19) (3) **Định nghĩa.** Kỳ vọng (expectation) của $X$ là (4) display `gathered` (7.1) khi $X$ rời rạc, (7.2) khi $X$ có mật độ. (5) Mỗi công thức cần $\mathbb E|X|<\infty$; khi đó $X$ khả tích (integrable). ≈50 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $\mathbb E[Y]=0{,}044$ không phải một giá trị mà $Y$ nhận (L1095); trung bình mẫu là số tính từ dữ liệu, còn luật số lớn yếu (Định lý 05c.41) nối hai đại lượng; khả tích bảo đảm chuỗi hội tụ tuyệt đối, không phụ thuộc thứ tự cộng (L1093); Định nghĩa 05c.26.
- **Mẫu (chỉ planning):** MAT1101 Bài 3 S24–S25.

#### KV02 — Kỳ vọng của hàm và tính tuyến tính
- **Lý do tồn tại:** phát biểu Mệnh đề 10.22 và hệ quả cho biến chỉ thị.
- **Nhu cầu/khoảng trống:** chi phí $g(X)$ cần tính trực tiếp trên phân phối của $X$; chi phí tổng cần tách (L1099).
- **Đầu vào → đầu ra:** KV01 → (7.3), (7.4), (7.5), $\mathbb E[\mathbf 1_E]=\mathbb P(E)$.
- **Vị trí:** kết quả của sườn; phần việc: "kỳ vọng của hàm → tính tuyến tính". **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Sửa (cổng):** ghi "$X$ rời rạc trên $\mathcal X\subseteq\mathbb R^d$". **Bài tập:** không.
- **Phác thảo:** (1) **Mệnh đề.** $X$ rời rạc trên $\mathcal X\subseteq\mathbb R^d$, $\sum_x|g(x)|\,p_X(x)<\infty$; hoặc $X$ thực có mật độ, $\int|g|f_X<\infty$: (2) display `gathered` (7.3), (7.4). (3) $X,Z$ thực, rời rạc, khả tích; $\alpha,\beta,\gamma\in\mathbb R$: (4) display (7.5). (5) **Hệ quả.** Với biến chỉ thị, $\mathbb E[\mathbf 1_E]=\mathbb P(E)$. (6) **Lưu ý:** với $g$ phi tuyến, nói chung $\mathbb E[g(X)]\ne g(\mathbb E[X])$. ≈42 âm tiết, 6 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** tính tuyến tính còn đúng cho mọi cặp biến khả tích và mở rộng cho $n$ biến (L1201); không cần độc lập; ví dụ $\mathbb E[X^2]=3{,}5$ khác $(\mathbb E[X])^2=1{,}21$ (Ví dụ 10.9); Mệnh đề 05c.27, Định lý 05c.28.

#### KV03 — Chứng minh: kỳ vọng của hàm
- **Lý do tồn tại:** P3.
- **Nhu cầu/khoảng trống:** chỉ ra thao tác nhóm các giá trị cùng ảnh, cơ sở của mọi phép tính chi phí kỳ vọng.
- **Đầu vào → đầu ra:** KV01–KV02, MH04 (cộng tính đếm được) → (7.3) đã chứng minh (rời rạc).
- **Vị trí:** kết quả của sườn; phần việc: "kỳ vọng của hàm". **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Sửa (cổng):** `tách` khỏi chứng minh tính tuyến tính; bỏ nhãn "Ý tưởng:". **Bài tập:** không.
- **Phác thảo:** (1) Các $x$ có cùng ảnh $u=g(x)$ được gom thành một nhóm. (2) **Phân phối của $g(X)$.** Cộng tính đếm được cho $\mathbb P(g(X)=u)=\sum_{x:\,g(x)=u}p_X(x)$. (3) **Công thức kỳ vọng của hàm.** display `aligned` $\mathbb E[g(X)]=\sum_uu\,\mathbb P(g(X)=u)=\sum_u\sum_{x:\,g(x)=u}g(x)\,p_X(x)=\sum_xg(x)\,p_X(x)$. (4) Đẳng thức thứ nhất: định nghĩa kỳ vọng; thứ hai: phân phối của $g(X)$; thứ ba: mỗi $x$ thuộc đúng một nhóm. (19) (5) Gom nhóm hợp lệ vì chuỗi $\sum_x|g(x)|\,p_X(x)$ hữu hạn. ≈45 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** cùng phép gom cho các trị tuyệt đối cho thấy $g(X)$ khả tích (L1142–1150); trường hợp có mật độ được phác thảo ở ghi chú bài giảng, Phụ lục B.1.

#### KV03b — Chứng minh: tính tuyến tính của kỳ vọng
- **Lý do tồn tại:** P4, tách thành trang riêng (cổng storyboard).
- **Nhu cầu/khoảng trống:** chỉ ra tính tuyến tính không cần độc lập: chỉ dùng tổng theo một biến.
- **Đầu vào → đầu ra:** KV03 → (7.5) đã chứng minh (rời rạc).
- **Vị trí:** kết quả của sườn; phần việc: "tính tuyến tính" dùng cho $\mathbb E[L]$. **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm` (`tách` từ KV03). **Bài tập:** không.
- **Phác thảo:** (1) Áp dụng kỳ vọng của hàm cho cặp $(X,Z)$ và $g(x,z)=\alpha x+\beta z+\gamma$. (2) **Tổng theo một biến.** Cộng tính đếm được cho $\sum_z\mathbb P(X=x,Z=z)=p_X(x)$ và $\sum_x\mathbb P(X=x,Z=z)=p_Z(z)$. (3) **Tách tổng.** display `aligned` $\mathbb E[\alpha X+\beta Z+\gamma]=\sum_{x,z}(\alpha x+\beta z+\gamma)\,\mathbb P(X=x,Z=z)=\alpha\sum_xx\sum_z\mathbb P(X=x,Z=z)+\beta\sum_zz\sum_x\mathbb P(X=x,Z=z)+\gamma=\alpha\sum_xx\,p_X(x)+\beta\sum_zz\,p_Z(z)+\gamma=\alpha\,\mathbb E[X]+\beta\,\mathbb E[Z]+\gamma$. (4) Tách tổng hợp lệ vì $|\alpha x+\beta z+\gamma|\le|\alpha||x|+|\beta||z|+|\gamma|$ và $X,Z$ khả tích. (15) ≈38 âm tiết, 4 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** dòng cuối dùng thêm tổng các xác suất đồng thời bằng $1$ (L1196); không giả thiết gì về quan hệ giữa $X$ và $Z$, nên kỳ vọng của tổng chi phí bằng tổng các kỳ vọng kể cả khi các thành phần phụ thuộc (L1198).

#### KV04 — Ví dụ: chi phí kỳ vọng của bộ cảnh báo
- **Lý do tồn tại:** áp dụng tính tuyến tính và $\mathbb E[\mathbf 1_E]=\mathbb P(E)$; con số tóm tắt chi phí của bộ cảnh báo.
- **Nhu cầu/khoảng trống:** hai loại lỗi có chi phí khác nhau; xác suất phản hồi sai chưa đủ.
- **Đầu vào → đầu ra:** KV02–KV03b, BY05 → $\mathbb E[L]=0{,}0698$; chi phí $5$, $1$ dùng lại ở SL12.
- **Vị trí:** ví dụ xuyên suốt sản phẩm; trả lời phần "chi phí" của câu hỏi mạch. **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Sửa (cổng):** dòng "Diễn giải:" ≤20 âm tiết. **Bài tập:** không.
- **Phác thảo:** (1) Bỏ sót sản phẩm lỗi tốn $5$; cảnh báo sản phẩm đạt tốn $1$; phản hồi đúng tốn $0$. (16) (2) display $L=5\cdot\mathbf 1_{\{Y=1,A=0\}}+1\cdot\mathbf 1_{\{Y=0,A=1\}}$. (3) **Tính** $\mathbb E[L]$. Quy tắc nhân: $\mathbb P(Y=1,A=0)=0{,}1\cdot0{,}044=0{,}0044$, $\mathbb P(Y=0,A=1)=0{,}05\cdot0{,}956=0{,}0478$. (4) display $\mathbb E[L]=5\cdot0{,}0044+1\cdot0{,}0478=0{,}0698$. (5) **Diễn giải:** chi phí kỳ vọng $0{,}0698$ lớn hơn xác suất phản hồi sai $0{,}0522$ vì bỏ sót tốn gấp năm lần. (17) ≈42 âm tiết, 5 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** kiểm tra: $L$ nhận $0$, $1$, $5$ với xác suất $0{,}9478$, $0{,}0478$, $0{,}0044$ (L1237); với $n$ sản phẩm, tổng chi phí có kỳ vọng $n\cdot0{,}0698$ kể cả khi các sản phẩm phụ thuộc (L1239); trong học máy, đại lượng cần nhỏ là kỳ vọng của mất mát theo phân phối dữ liệu (L1242).

#### KV05 — Phương sai
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập, trực quan, Định nghĩa 10.23 và phát biểu Mệnh đề 10.24.
- **Nhu cầu/khoảng trống:** hai chi phí cùng kỳ vọng $1$ có phân phối khác nhau (L1246).
- **Đầu vào → đầu ra:** KV01–KV02 → (7.6), (7.7).
- **Vị trí:** chuỗi định nghĩa và kết quả; phần việc: "phương sai". **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) **Nhu cầu:** chi phí luôn bằng $1$ và chi phí bằng $0$ hoặc $2$ với xác suất $1/2$ có cùng kỳ vọng $1$. (20) (2) **Trực quan.** Bình phương độ lệch để độ lệch dương và âm không triệt tiêu nhau. (14) (3) **Định nghĩa.** Với $\mathbb E[X^2]<\infty$, $\mu=\mathbb E[X]$, phương sai (variance) là display (7.6); độ lệch chuẩn là $\sqrt{\operatorname{Var}(X)}$. (4) **Mệnh đề.** display `aligned` (7.7). ≈50 âm tiết, 4 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** $\mathbb E[X^2]<\infty$ kéo theo khả tích vì $|x|\le1+x^2$ (L1259); phương sai có đơn vị bình phương, độ lệch chuẩn cùng đơn vị với $X$; Định nghĩa 05c.30, Mệnh đề 05c.31.
- **Mẫu (chỉ planning):** MAT1101 Bài 3 S28–S34.

#### KV06 — Chứng minh: công thức tính phương sai
- **Lý do tồn tại:** P5.
- **Nhu cầu/khoảng trống:** công thức $\mathbb E[X^2]-\mu^2$ được dùng ở KV13; nó đến từ tính tuyến tính.
- **Đầu vào → đầu ra:** KV02–KV03b → (7.7) đã chứng minh.
- **Vị trí:** kết quả của sườn; phần việc: "phương sai". **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ nhãn "Ý tưởng:"; tên bước theo kết quả. **Bài tập:** không.
- **Phác thảo:** (1) Kỳ vọng của hàm áp cho đa thức bậc hai của $X$, rồi tách tổng. (2) **Công thức hai mômen.** display `aligned` $\mathbb E[(X-\mu)^2]=\sum_x(x^2-2\mu x+\mu^2)\,p_X(x)=\mathbb E[X^2]-2\mu^2+\mu^2=\mathbb E[X^2]-\mu^2$. (3) **Không âm.** $(x-\mu)^2\ge0$ với mọi $x$. (4) **Biến đổi affine.** $\mathbb E[\alpha X+\beta]=\alpha\mu+\beta$, độ lệch bằng $\alpha(X-\mu)$, nên $\operatorname{Var}(\alpha X+\beta)=\alpha^2\operatorname{Var}(X)$. ≈32 âm tiết, 4 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $(X-\mu)^2$ khả tích vì $|g(x)|\le x^2+2|\mu||x|+\mu^2$ (L1279); trường hợp có mật độ giống hệt, với tích phân thay tổng (L1292); đổi đơn vị nhân phương sai với $\alpha^2$, dịch gốc không đổi phương sai (L1306).

#### KV07 — Hiệp phương sai
- **Lý do tồn tại:** Định nghĩa 10.25, dạng tính và phương sai của tổng hai biến.
- **Nhu cầu/khoảng trống:** phương sai của tổng số lỗi trong một lô phụ thuộc việc các lỗi cùng xuất hiện (L1341).
- **Đầu vào → đầu ra:** KV05 → (7.9), (7.10), $\operatorname{Cov}=\mathbb E[XZ]-\mu_X\mu_Z$, $\operatorname{Var}(X+Z)$.
- **Vị trí:** chuỗi định nghĩa; phần việc: "hiệp phương sai". **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Sửa (cổng):** thêm "Ý nghĩa:" phương sai của tổng. **Bài tập:** không.
- **Phác thảo:** (1) **Nhu cầu:** phương sai của tổng số lỗi phụ thuộc việc các lỗi cùng xuất hiện. (14) (2) **Trực quan.** Đo mức hai biến cùng lệch khỏi kỳ vọng của chúng. (3) **Định nghĩa.** Với $\mathbb E[X^2],\mathbb E[Z^2]<\infty$, hiệp phương sai (covariance) là $\operatorname{Cov}(X,Z)=\mathbb E[(X-\mu_X)(Z-\mu_Z)]$. (4) Không tương quan (uncorrelated) nếu $\operatorname{Cov}(X,Z)=0$; hệ số tương quan (correlation coefficient) $\rho_{XZ}=\operatorname{Cov}(X,Z)/\sqrt{\operatorname{Var}(X)\operatorname{Var}(Z)}$. (5) **Dạng khác:** $\operatorname{Cov}(X,Z)=\mathbb E[XZ]-\mu_X\mu_Z$. (6) **Ý nghĩa:** phương sai của tổng có thêm số hạng $2\operatorname{Cov}(X,Z)$: $\operatorname{Var}(X+Z)=\operatorname{Var}(X)+\operatorname{Var}(Z)+2\operatorname{Cov}(X,Z)$. ≈42 âm tiết, 6 dòng, không công thức hiển thị (công thức viết trong dòng).
- **Ghi chú diễn giả:** $XZ$ khả tích vì $2|xz|\le x^2+z^2$; $\operatorname{Cov}(X,X)=\operatorname{Var}(X)$; dòng (6) là Mệnh đề 10.26 với $n=2$, dạng tổng quát có thêm $2\sum_{i<j}\operatorname{Cov}(X_i,X_j)$; $\rho_{XZ}\in[-1,1]$ (Bài tập 10.12, tự học); với Gaussian nhiều chiều, $\Sigma_{ij}$ là hiệp phương sai của hai thành phần; Mệnh đề 05c.33; Murphy (2022), §3.1.1–3.1.2.

#### KV08 — Độc lập kéo theo không tương quan
- **Lý do tồn tại:** phát biểu Mệnh đề 10.27, tách khỏi chứng minh.
- **Nhu cầu/khoảng trống:** điều kiện đủ để mọi hiệp phương sai bằng $0$ (L1425).
- **Đầu vào → đầu ra:** PP09, KV07 → $\mathbb E[XZ]=\mathbb E[X]\mathbb E[Z]$.
- **Vị trí:** kết quả của sườn; nối độc lập với hiệp phương sai. **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) **Mệnh đề.** $X,Z$ rời rạc, $X\perp Z$, $\mathbb E[X^2],\mathbb E[Z^2]<\infty$. Khi đó (2) display $\mathbb E[XZ]=\mathbb E[X]\,\mathbb E[Z]$, do đó $\operatorname{Cov}(X,Z)=0$. (3) **Ý nghĩa:** các đặc trưng độc lập đôi một có ma trận hiệp phương sai đường chéo. (4) **Lưu ý:** chiều ngược lại sai. ≈32 âm tiết, 4 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** nếu các chỉ thị lỗi $Y_1,\ldots,Y_n$ độc lập, cùng phân phối $\operatorname{Bernoulli}(\theta)$ thì số lỗi của lô có phương sai $n\theta(1-\theta)$; khi các sản phẩm chung một lô nguyên liệu, hiệp phương sai có thể dương và công thức này đánh giá thấp dao động (L1459); Mệnh đề 05c.32; trường hợp có mật độ ở ghi chú bài giảng, Phụ lục B.2.

#### KV09 — Chứng minh: độc lập kéo theo không tương quan
- **Lý do tồn tại:** P6.
- **Nhu cầu/khoảng trống:** chỉ ra đúng chỗ dùng độc lập và chỗ dùng mômen bậc hai.
- **Đầu vào → đầu ra:** KV03, PP09 → Mệnh đề 10.27 đã chứng minh.
- **Vị trí:** kết quả của sườn. **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ nhãn "Ý tưởng:"; gọi kỳ vọng của hàm bằng tên. **Bài tập:** không.
- **Phác thảo:** (1) $\mathbb E[XZ]$ được viết thành chuỗi kép, rồi tách xác suất đồng thời nhờ độc lập. (2) display `aligned` $\mathbb E[XZ]=\sum_{x,z}xz\,\mathbb P(X=x,Z=z)=\sum_{x,z}xz\,p_X(x)p_Z(z)=\bigl(\sum_xx\,p_X(x)\bigr)\bigl(\sum_zz\,p_Z(z)\bigr)$. (3) Dòng 1: kỳ vọng của hàm cho cặp $(X,Z)$, hợp lệ vì $\mathbb E|XZ|\le\tfrac12(\mathbb E[X^2]+\mathbb E[Z^2])$. (4) Dòng 2: độc lập; dòng 3: chuỗi kép hội tụ tuyệt đối bằng tích hai chuỗi. (5) **Không tương quan.** Thế vào $\operatorname{Cov}(X,Z)=\mathbb E[XZ]-\mathbb E[X]\,\mathbb E[Z]$ được $0$. ≈42 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** chuỗi kép của các trị tuyệt đối bằng $\mathbb E|X|\,\mathbb E|Z|$, hữu hạn (L1444).

#### KV10 — Ví dụ: độ lệch kích thước và nhãn lỗi
- **Lý do tồn tại:** phản ví dụ bắt buộc (AGENTS.md), trang riêng theo Q-C.
- **Nhu cầu/khoảng trống:** chiều ngược của Mệnh đề 10.27 sai; cần một cặp biến của dây chuyền minh họa.
- **Đầu vào → đầu ra:** KV08–KV09 → $\operatorname{Cov}(X,Y)=0$ nhưng $\mathbb P(Y=1\mid X=2)=1$.
- **Vị trí:** giới hạn áp dụng của sườn. **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm` — hình `uncorrelated-dependent.svg`. **Bài tập:** không (Bài tập 10.9, 10.11 tự học, ghi chú diễn giả).
- **Phác thảo:** (1) Độ lệch $X\in\{-2,-1,0,1,2\}$: $p_X(\pm2)=0{,}022$, $p_X(\pm1)=0{,}2$, $p_X(0)=0{,}556$; nhãn lỗi $Y=\mathbf 1_{\{|X|=2\}}$. (2) hình cột PMF. (3) **Tính** $\operatorname{Cov}(X,Y)$. Đối xứng: $\mathbb E[X]=0$, $\mathbb E[XY]=-2\cdot0{,}022+2\cdot0{,}022=0$, nên $\operatorname{Cov}(X,Y)=0$. (4) Phụ thuộc: $\mathbb P(Y=1\mid X=2)=1$, còn $\mathbb P(Y=1)=0{,}044$. (5) **Diễn giải:** chọn đặc trưng theo tương quan sẽ loại $X$, dù $|X|$ xác định đúng nhãn. (15) ≈35 âm tiết, 4 dòng + hình.
- **Ghi chú diễn giả:** tổng các khối bằng $1$; $\mathbb P(Y=1)=0{,}044$ trùng tỉ lệ lỗi chung; $\operatorname{Var}(X)=0{,}576$ và $\operatorname{Var}(Y)=0{,}042064$ đều dương, nên hiệp phương sai bằng $0$ không đến từ một biến hằng (L1499); quan hệ không tuyến tính: lệch về hai phía đều gây lỗi; Murphy (2022), §3.1.3 dùng bản liên tục với $X$ đều trên $(-1,1)$ và $X^2$ (Bài tập 10.11).

#### KV11 — Kỳ vọng toàn phần
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập, trực quan, Định nghĩa 10.28 (phần $\psi$) và phát biểu Định lý 10.29 cho $X$ rời rạc.
- **Nhu cầu/khoảng trống:** khi chưa biết nhà cung cấp, số lỗi dự kiến là trung bình các dự kiến theo nhóm (L1508).
- **Đầu vào → đầu ra:** BY02, KV01 → $\psi(s)$, $\mathbb E[X\mid S]$, (7.13).
- **Vị trí:** kết quả của sườn; phần việc: "trung bình theo nhóm", cầu sang lấy biên. **CLO2:** mục tiêu 4, 5.
- **Quyết định:** `thêm`. **Sửa (cổng):** định lý chỉ phát biểu $X$ rời rạc (khớp KV12); trường hợp có mật độ có điều kiện vào ghi chú diễn giả; "Trực quan." ngay sau "Nhu cầu:" thay cho "Ý nghĩa:". **Bài tập:** không (bài ở KV13).
- **Phác thảo:** (1) **Nhu cầu:** tỉ lệ lỗi $0{,}02$ ở $a$, $0{,}08$ ở $b$; khi chưa biết nguồn hàng, cần một tỉ lệ chung. (17) (2) **Trực quan.** Trung bình chung là trung bình các trung bình nhóm, trọng số là xác suất nhóm. (17) (3) **Định nghĩa.** Với $\mathbb P(S=s)>0$, kỳ vọng có điều kiện (conditional expectation) $\psi(s)=\mathbb E[X\mid S=s]$ là kỳ vọng của $X$ dưới $\mathbb P(\cdot\mid S=s)$; $\mathbb E[X\mid S]=\psi(S)$. (4) **Định lý.** $X$ rời rạc, khả tích; $S$ rời rạc. Khi đó (5) display (7.13), tổng trên các $s$ có $\mathbb P(S=s)>0$. ≈52 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $\psi(s)$ là một số khi $s$ cố định, $\psi(S)$ là một biến ngẫu nhiên (L1544); với biến chỉ thị, $\mathbb E[Y\mid S=s]=\mathbb P(Y=1\mid S=s)$ (L1546); định lý còn đúng khi mỗi phân phối $\mathbb P(X\in\cdot\mid S=s)$ có mật độ (L1555; phác thảo ở ghi chú bài giảng, Phụ lục B.3); phân rã phương sai (Mệnh đề 10.30) tách phương sai thành phần trong nhóm và giữa các nhóm; Mệnh đề 05c.38; Murphy (2022), §2.2.5 (ví dụ bóng đèn hai nhà máy).

#### KV12 — Chứng minh: kỳ vọng toàn phần
- **Lý do tồn tại:** P7.
- **Nhu cầu/khoảng trống:** kỳ vọng toàn phần là công thức toàn phần cộng một phép đổi thứ tự tổng.
- **Đầu vào → đầu ra:** BY07, KV03 → (7.13) đã chứng minh (rời rạc).
- **Vị trí:** kết quả của sườn. **CLO2:** mục tiêu 4, 5.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ nhãn "Ý tưởng:"; ghi căn cứ bước phân hoạch "(P3) và quy tắc nhân". **Bài tập:** không.
- **Phác thảo:** (1) Biến cố $\{X=x\}$ được chia theo giá trị của $S$, rồi đổi thứ tự hai tổng. (2) **Phân hoạch theo $S$.** Tiên đề (P3) và quy tắc nhân cho display $p_X(x)=\sum_s\mathbb P(X=x\mid S=s)\,\mathbb P(S=s)$. (3) **Đổi thứ tự tổng.** display `aligned` $\mathbb E[X]=\sum_xx\sum_s\cdots=\sum_s\mathbb P(S=s)\sum_xx\,\mathbb P(X=x\mid S=s)=\sum_s\psi(s)\,\mathbb P(S=s)$. (4) Đổi thứ tự hợp lệ vì $\sum_{x,s}|x|\,\mathbb P(X=x,S=s)=\mathbb E|X|<\infty$. (5) **Kỳ vọng của $\psi(S)$.** Kỳ vọng của hàm cho $S$ và $g=\psi$: tổng cuối là $\mathbb E[\psi(S)]$. ≈45 âm tiết, 5 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** $\psi(s)$ hữu hạn vì $\mathbb P(X=x,S=s)\le p_X(x)$ (L1574–1585); các $s$ có xác suất $0$ góp $0$ vào phân hoạch (L1587); $\psi(S)$ khả tích (L1610–1618).

#### KV13 — Bài tập: tỉ lệ lỗi và phương sai của nhãn lỗi
- **Lý do tồn tại:** bài có lời giải trên mặt trang của mạch 5 (Q-B), dùng hai đại lượng ghi chú đã tính.
- **Nhu cầu/khoảng trống:** đo việc dùng kỳ vọng toàn phần và công thức phương sai trên ví dụ xuyên suốt.
- **Đầu vào → đầu ra:** KV05, KV11, PP07 → $\mathbb E[Y]=0{,}044$, $\operatorname{Var}(Y)=0{,}042064$.
- **Vị trí:** ví dụ xuyên suốt sản phẩm; phần việc: "trung bình theo nhóm" và "phương sai". **CLO2:** mục tiêu 4.
- **Quyết định:** `thêm`. **Sửa (cổng):** ≤6 dòng (gộp hai câu hỏi một dòng). **Bài tập:** có lời giải trên mặt trang (fragment).
- **Phác thảo:** (1) $\mathbb P(S=a)=0{,}6$, $\mathbb P(Y=1\mid S=a)=0{,}02$, $\mathbb P(Y=1\mid S=b)=0{,}08$. (2) **Câu hỏi:** (a) Tính $\mathbb E[Y]$ bằng kỳ vọng toàn phần theo $S$. (b) Tính $\operatorname{Var}(Y)$. (14) (3) fragment **Lời giải:** (a) $\mathbb E[Y\mid S=s]=\mathbb P(Y=1\mid S=s)$, nên (4) display $\mathbb E[Y]=0{,}02\cdot0{,}6+0{,}08\cdot0{,}4=0{,}044$. (5) (b) $Y^2=Y$ nên $\mathbb E[Y^2]=0{,}044$ và $\operatorname{Var}(Y)=0{,}044\cdot0{,}956=0{,}042064$. (6) **Diễn giải:** khi tỉ trọng nhóm đổi, $\mathbb E[Y]$ đổi dù tỉ lệ lỗi trong từng nhóm giữ nguyên. (17) ≈42 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $\operatorname{Var}(Y)=\theta(1-\theta)$ với $\theta=0{,}044$ (L1309–1316); với biến chỉ thị, kỳ vọng toàn phần chính là công thức xác suất toàn phần, nên (a) lặp lại phép tính của cây bằng một công cụ khác (L1636); phương sai $0{,}042064$ tách thành $0{,}0412$ trong nhóm và $0{,}000864$ giữa các nhóm (Ví dụ 10.11); Bài tập 10.7 để tự học.

### Mạch 6 · Phân phối đồng thời và phép lấy biên

#### SL00 — 6. Phân phối đồng thời và phép lấy biên (trang tiêu đề mạch, `id="mach-6"`)
- **Lý do tồn tại:** mở mạch 6, nêu câu hỏi trung tâm và phân rã bốn phần.
- **Nhu cầu/khoảng trống:** mọi phép tính của mạch 5 dựa trên phân phối một hoặc hai biến đã cho; quan sát chỉ gồm $A$ (L1692).
- **Đầu vào → đầu ra:** PP10–PP12, KV02, KV04 → nhiệm vụ: hậu nghiệm khi thiếu nguồn hàng và quyết định.
- **Vị trí:** điểm vào mạch 6; đảm nhận bước nhu cầu của cụm phân tích nhân tử. **CLO2:** mục tiêu 5, 6.
- **Quyết định:** `thêm`. **Sửa (cổng):** dòng dẫn và từ khóa không dùng "nhân tử" trước định nghĩa. **Bài tập:** không.
- **Phác thảo:** h2 "6. Phân phối đồng thời và phép lấy biên"; dòng dẫn "Muốn suy luận khi thiếu hồ sơ nguồn hàng: dựng phân phối đồng thời, lấy biên, chuẩn hóa, rồi so chi phí." (21); từ khóa "Phân phối đồng thời · Lấy biên · Phân phối có điều kiện · Suy luận · Quyết định".
- **Ghi chú diễn giả (≈80 âm tiết):** kế thừa giả thiết $A\perp S\mid Y$ ở dạng dùng được trong phép nhân và chi phí của bộ cảnh báo; nhiệm vụ là dựng phân phối của bộ ba nhà cung cấp, tình trạng lỗi, cảnh báo, loại nhà cung cấp bằng một tổng, chuẩn hóa theo cảnh báo, rồi so hai chi phí kỳ vọng; mạch giao cho phần tổng kết các hậu nghiệm và quy tắc quyết định.

#### SL01 — Ba biến của hệ thống sản phẩm
- **Lý do tồn tại:** nhu cầu và trực quan của phân phối đồng thời; ví dụ dẫn nhập là chính bài toán MD03.
- **Nhu cầu/khoảng trống:** cảnh báo $A=1$ chưa cho biết $S$ hay $Y$; ba phân phối riêng không xác định cách các biến phụ thuộc nhau (L1696).
- **Đầu vào → đầu ra:** MD03, PP10 → chuỗi sinh dữ liệu ba bước.
- **Vị trí:** bài toán trung tâm; phần việc: "phân phối đồng thời". **CLO2:** mục tiêu 5.
- **Quyết định:** `thêm` — hình `generation-chain.svg`. **Bài tập:** không.
- **Phác thảo:** (1) **Nhu cầu:** cảm biến báo $A=1$, nhưng $S$ và $Y$ chưa được quan sát. (2) Ba phân phối riêng không cho biết các biến phụ thuộc nhau thế nào. (14) (3) **Trực quan.** Dữ liệu sinh theo chuỗi: chọn nhà cung cấp, rồi tình trạng lỗi, rồi phản hồi cảm biến. (19) (4) hình chuỗi ba nút. (5) Cần một mô hình cho cả bộ $(S,Y,A)$, rồi cộng theo biến chưa quan sát. ≈57 âm tiết, 4 dòng chữ + hình.
- **Ghi chú diễn giả:** nếu kích thước hay bề mặt sản phẩm làm xác suất cảnh báo khác nhau giữa hai nhà cung cấp khi cùng tình trạng lỗi, mô hình phải dùng $p_{A\mid S,Y}$ thay cho $p_{A\mid Y}$ (L1827).

#### SL02 — Phân phối đồng thời
- **Lý do tồn tại:** Định nghĩa 10.31; phân phối biên.
- **Nhu cầu/khoảng trống:** SL01 cần một đối tượng cho nhiều biến cùng lúc.
- **Đầu vào → đầu ra:** SL01 → $p_{X,Z}$, $f_{X,Z}$, phân phối biên.
- **Vị trí:** chuỗi định nghĩa; phần việc: "phân phối đồng thời". **CLO2:** mục tiêu 5.
- **Quyết định:** `thêm`. **Sửa (cổng):** "Lưu ý:" tổng quát; ví dụ hai biến Bernoulli vào ghi chú diễn giả; không nhắc số hiệu (8.2). **Bài tập:** không.
- **Phác thảo:** (1) **Định nghĩa.** $X,Z$ rời rạc: hàm khối xác suất đồng thời (joint PMF) là (2) display (8.1) dạng $p_{X,Z}(x,z)=\mathbb P(X=x,Z=z)\ge0$, $\sum_{x,z}p_{X,Z}(x,z)=1$. (3) $(X,Z)$ có mật độ đồng thời (joint density) $f_{X,Z}$ nếu $\mathbb P(X\in B_1,Z\in B_2)=\int_{B_1}\int_{B_2}f_{X,Z}$ với mọi tập Borel $B_1,B_2$. (4) Phân phối của từng biến, suy ra từ phân phối đồng thời, là phân phối biên (marginal distribution). (15) (5) **Lưu ý:** các phân phối biên nói chung không xác định phân phối đồng thời. (12) ≈50 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** hai biến $\operatorname{Bernoulli}(1/2)$ độc lập và hai biến bằng nhau tại mọi kết quả có cùng phân phối biên, nhưng xác suất cả hai bằng $1$ là $1/4$ và $1/2$; ghép hai phân phối biên bằng phép nhân là một giả thiết độc lập (L1782); Bài 05c gọi hàm khối của phân phối biên là PMF lề; Định nghĩa 05c.23; Murphy (2022), §2.2.3.

#### SL03 — Lấy biên
- **Lý do tồn tại:** Mệnh đề 10.32 với "Chứng minh." phần rời rạc (P8, đã quyết định: một dòng trên trang).
- **Nhu cầu/khoảng trống:** loại một biến chưa quan sát khỏi mô hình.
- **Đầu vào → đầu ra:** SL02 → (8.3), (8.4).
- **Vị trí:** kết quả của sườn; phần việc: "lấy biên". **CLO2:** mục tiêu 5.
- **Quyết định:** `thêm`. **Sửa (cổng):** P8 là dòng "Chứng minh." (điều phối viên duyệt); gọi tiên đề bằng tên. **Bài tập:** không.
- **Phác thảo:** (1) **Mệnh đề.** Rời rạc: display (8.3). (2) Có mật độ: $f_X(x)=\int f_{X,Z}(x,z)\,dz$ là mật độ của $X$. (3) Phép tính này gọi là lấy biên (marginalization), còn gọi là quy tắc tổng (sum rule). (4) **Chứng minh.** Rời rạc: $\{X=x\}$ là hợp đếm được của các biến cố xung khắc $\{X=x,Z=z\}$; áp dụng cộng tính đếm được. (19) (5) **Ý nghĩa:** lấy biên loại một biến chưa quan sát bằng tổng hoặc tích phân theo mọi giá trị của nó. (19) ≈57 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** phần có mật độ dùng định lý Fubini–Tonelli, và $f_X$ được sửa trên một tập có độ dài $0$ khi cần (L1761–1773); trong bảng hai chiều, lấy biên là cộng theo hàng hoặc cột; viết $p_{X,Z}(x,z)=\mathbb P(X=x\mid Z=z)\,p_Z(z)$ thì lấy biên thành công thức xác suất toàn phần (L1780).

#### SL04 — Phân phối có điều kiện từ phân phối đồng thời
- **Lý do tồn tại:** Mệnh đề 10.33; bước chuẩn hóa của P9 cần nó.
- **Nhu cầu/khoảng trống:** lấy biên trả lời câu hỏi khi chưa biết $Z$; khi đã biết $Z=z$, cần chuẩn hóa (L1786).
- **Đầu vào → đầu ra:** SL03, BY02 → (8.5), (8.6).
- **Vị trí:** kết quả của sườn; phần việc: "chuẩn hóa". **CLO2:** mục tiêu 5.
- **Quyết định:** `thêm`. **Sửa (cổng):** dòng "Ý nghĩa:" rút ≤20 âm tiết; gọi công thức lấy biên bằng tên. **Bài tập:** không.
- **Phác thảo:** (1) **Mệnh đề.** $X,Z$ rời rạc, $p_Z(z)>0$: (2) display (8.5). (3) Có mật độ, $0<f_Z(z)<\infty$: $f_{X\mid Z}(x\mid z)=f_{X,Z}(x,z)/f_Z(z)$ là mật độ có điều kiện (conditional density). (4) **Chứng minh.** Định nghĩa xác suất có điều kiện với $\{X=x\}$, $\{Z=z\}$; cộng theo $x$ rồi dùng công thức lấy biên. (17) (5) **Ý nghĩa:** tử số là đồng thời, mẫu số là biên. (11) ≈42 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** phân phối có điều kiện là phân phối đồng thời cắt tại giá trị quan sát rồi chuẩn hóa (L1818); mật độ có điều kiện không phải phép chia cho $\mathbb P(Z=z)=0$ (L1821); đại lượng $p(y\mid x)$ mà một bộ phân loại xác suất trả về là phân phối có điều kiện theo nghĩa này (L1818, L1823).
- **Mẫu (chỉ planning):** MAT1101 Bài 4 S16, Bài 6 S19.

#### SL05 — Phân tích nhân tử và lấy biên trên biến chưa quan sát
- **Lý do tồn tại:** phát biểu Mệnh đề 10.34, kết quả trung tâm của bài.
- **Nhu cầu/khoảng trống:** ghép ba bước sinh dữ liệu (SL01) thành phân phối đồng thời và loại $S$.
- **Đầu vào → đầu ra:** PP10, PP12, SL03–SL04 → (8.7), (8.8) với $q(s,y)$.
- **Vị trí:** phương pháp trung tâm của sườn; phần việc: "phân phối đồng thời → lấy biên → chuẩn hóa". **CLO2:** mục tiêu 5.
- **Quyết định:** `thêm`. **Sửa (cổng):** ký hiệu $q(s,y)$ như ghi chú; mọi dòng ≤20 âm tiết; số tham số vào ghi chú diễn giả. **Bài tập:** không.
- **Phác thảo:** (1) **Mệnh đề.** $S,Y,A$ rời rạc, $A\perp S\mid Y$. Với $p_S(s)>0$, $p_Y(y)>0$: (2) display (8.7). (3) Quan sát $A=a'$ với $p_A(a')>0$; $q(s,y)$ là vế phải của đẳng thức trên. (12) (4) display (8.8) $p_{Y\mid A}(y\mid a')=\sum_sq(s,y)\big/\sum_{y'}\sum_sq(s,y')$. (5) **Ý nghĩa:** cộng theo $s$ vì nguồn hàng chưa quan sát; chia để chuẩn hóa theo cảnh báo. (16) ≈42 âm tiết, 5 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** các tổng chạy trên các $s$, $y'$ có xác suất dương; nếu $p_Y(y)=0$ thì hậu nghiệm bằng $0$ (L1853); bảng đồng thời của ba biến có $7$ tham số tự do, còn phân tích nhân tử chỉ cần $1+2+2=5$ (L1880); thay tổng bằng việc chọn nhà cung cấp có xác suất lớn nhất là một phép xấp xỉ khác và có thể cho hậu nghiệm khác (L1880).

#### SL06 — Chứng minh: phân tích nhân tử
- **Lý do tồn tại:** P9, phần (8.7).
- **Nhu cầu/khoảng trống:** chỉ ra đúng chỗ dùng $A\perp S\mid Y$.
- **Đầu vào → đầu ra:** BY05 (quy tắc chuỗi), PP12 → (8.7) đã chứng minh.
- **Vị trí:** phương pháp trung tâm; phần việc: "phân phối đồng thời". **CLO2:** mục tiêu 5.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ nhãn "Ý tưởng:"; dòng ô xác suất $0$ nêu cả hai vế. **Bài tập:** không.
- **Phác thảo:** (1) Quy tắc chuỗi theo thứ tự sinh dữ liệu, rồi bỏ điều kiện $S$ nhờ $A\perp S\mid Y$. (16) (2) **Quy tắc chuỗi.** Với $p_{S,Y}(s,y)>0$: (3) display $p_{S,Y,A}(s,y,a')=p_S(s)\,p_{Y\mid S}(y\mid s)\,\mathbb P(A=a'\mid S=s,Y=y)$. (4) **Bỏ điều kiện $S$.** Mệnh đề 10.17 với $U=A$, $V=S$, $W=Y$: $\mathbb P(A=a'\mid S=s,Y=y)=p_{A\mid Y}(a'\mid y)$. (5) **Ô xác suất $0$.** Nếu $p_{S,Y}(s,y)=0$: vế phải bằng $0$ vì $p_{Y\mid S}(y\mid s)=0$; vế trái bằng $0$ vì $p_{S,Y,A}\le p_{S,Y}$. ≈45 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $p_{Y\mid S}(y\mid s)=p_{S,Y}(s,y)/p_S(s)$; bất đẳng thức của vế trái là tính đơn điệu (L1871).

#### SL07 — Chứng minh: lấy biên và chuẩn hóa
- **Lý do tồn tại:** P9, phần (8.8).
- **Nhu cầu/khoảng trống:** hai thao tác khác nhau: cộng theo biến chưa quan sát, chia theo biến đã quan sát.
- **Đầu vào → đầu ra:** SL03, SL04, SL06 → (8.8) đã chứng minh.
- **Vị trí:** phương pháp trung tâm; phần việc: "lấy biên → chuẩn hóa". **CLO2:** mục tiêu 5.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ nhãn "Ý tưởng:"; bỏ dòng "Nhận xét." số tham số (chuyển sang ghi chú SL05); gọi công thức bằng tên. **Bài tập:** không.
- **Phác thảo:** (1) Phân tích nhân tử được cộng theo biến chưa quan sát, rồi chia cho xác suất của quan sát. (16) (2) **Lấy biên theo $s$.** Mệnh đề lấy biên cho cặp $((Y,A),S)$: display $p_{Y,A}(y,a')=\sum_sq(s,y)$. (3) **Lấy biên theo $y$.** $p_A(a')=\sum_{y'}p_{Y,A}(y',a')$. (4) **Công thức hậu nghiệm.** $p_{Y\mid A}(y\mid a')=p_{Y,A}(y,a')/p_A(a')$ theo phân phối có điều kiện từ phân phối đồng thời; thế hai tổng vào. (20) ≈42 âm tiết, 4 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** các $s$, $y'$ có xác suất $0$ góp $0$ vào tổng; nếu $p_Y(y)=0$ thì $p_{Y,A}(y,a')\le p_Y(y)=0$ (L1873–1875); hậu nghiệm tính được từ ba nhân tử nhỏ mà không cần lập trước bảng đầy đủ (L1877).

#### SL08 — Thuật toán suy luận bằng lấy biên và chuẩn hóa
- **Lý do tồn tại:** Thuật toán 10.35: đầu vào, bước, đầu ra, chi phí (AGENTS.md).
- **Nhu cầu/khoảng trống:** công thức hậu nghiệm cần một quy trình tính lặp lại được.
- **Đầu vào → đầu ra:** SL05–SL07 → bốn bước, chi phí $2|\mathcal S||\mathcal Y|$ phép nhân.
- **Vị trí:** phương pháp của sườn. **CLO2:** mục tiêu 5.
- **Quyết định:** `thêm`. **Sửa (cổng):** không đặt tên $r(y)$; bước 2 và 3 viết bằng $p_{Y,A}$, $p_A$. **Bài tập:** không.
- **Phác thảo:** (1) **Thuật toán.** **Đầu vào:** $p_S$, $p_{Y\mid S}$, $p_{A\mid Y}$ trên tập hữu hạn $\mathcal S$, $\mathcal Y$; quan sát $a'$. (2) 1. Với mọi $(s,y)$: $q(s,y)=p_S(s)\,p_{Y\mid S}(y\mid s)\,p_{A\mid Y}(a'\mid y)$. (3) 2. Với mọi $y$: $p_{Y,A}(y,a')=\sum_sq(s,y)$. (4) 3. $p_A(a')=\sum_yp_{Y,A}(y,a')$; nếu bằng $0$ thì dừng. (5) 4. Trả về $p_{Y\mid A}(y\mid a')=p_{Y,A}(y,a')/p_A(a')$ với mọi $y$. (6) **Đầu ra:** $p_{Y\mid A}(\cdot\mid a')$; chi phí $2|\mathcal S||\mathcal Y|$ phép nhân. ≈38 âm tiết, 6 dòng.
- **Ghi chú diễn giả:** dừng ở bước 3 nghĩa là quan sát có xác suất $0$ dưới mô hình; bước 2–3 tốn khoảng $|\mathcal S||\mathcal Y|$ phép cộng, bước 4 tốn $|\mathcal Y|$ phép chia (L1894); bảng của $k$ biến nhị phân có $2^k$ ô, nên lấy biên có thể tốn kém khi số biến lớn (L1964); trong học máy, mô hình có biến ẩn tính xác suất của dữ liệu bằng cách lấy biên theo biến đó (L2019).

#### SL09 — Ví dụ: bảng đồng thời của hệ thống sản phẩm
- **Lý do tồn tại:** chạy Thuật toán 10.35 với $a'=1$; trang duy nhất có bảng 8 ô.
- **Nhu cầu/khoảng trống:** trả lời câu hỏi MD03 khi thiếu nguồn hàng.
- **Đầu vào → đầu ra:** SL08 → bảng 8 ô, $\mathbb P(Y=1\mid A=1)=198/437$.
- **Vị trí:** ví dụ xuyên suốt sản phẩm; trả lời phần hậu nghiệm lỗi của câu hỏi mạch. **CLO2:** mục tiêu 5.
- **Quyết định:** `thêm`. **Sửa (cổng):** bỏ vế báo trước trang hậu nghiệm nguồn hàng; dòng ≤20 âm tiết; không nhắc số hiệu tham số. **Bài tập:** không.
- **Phác thảo:** (1) Tham số của bài toán, $A\perp S\mid Y$; mỗi ô là tích ba nhân tử. (12) (2) bảng năm hàng "$S$ | $Y$ | $A=0$ | $A=1$ | tổng" (L1902–1908). (3) Chẳng hạn ô $S=b$, $Y=1$, $A=1$: $0{,}4\cdot0{,}08\cdot0{,}9=0{,}0288$. (4) display $\mathbb P(Y=1\mid A=1)=(0{,}0108+0{,}0288)/0{,}0874=198/437\approx0{,}4531$. (5) **Diễn giải:** khớp hậu nghiệm tính bằng định lý Bayes. (8) ≈30 âm tiết (gồm tiêu đề cột), 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** cộng hai hàng của mỗi nhà cung cấp cho $0{,}6$ và $0{,}4$; cộng hai hàng $Y=1$ cho $0{,}044$; tổng tám ô bằng $1$ (L1910, L1959); định lý Bayes và phân tích nhân tử là hai cách tính cùng một hậu nghiệm (L1961).

#### SL10 — Ví dụ: hậu nghiệm của nguồn hàng
- **Lý do tồn tại:** phần thứ hai của câu hỏi mạch: cảnh báo đổi phân phối của nguồn hàng; trọng số trộn đúng là hậu nghiệm.
- **Nhu cầu/khoảng trống:** nhầm lẫn dùng tiên nghiệm $0{,}6$, $0{,}4$ làm trọng số sau quan sát (L2037).
- **Đầu vào → đầu ra:** SL09 (bốn ô và tổng của cột $A=1$, nêu lại) → $236/437$, $201/437$, $18/67$, $36/59$.
- **Vị trí:** ví dụ xuyên suốt; phần việc: "hậu nghiệm của nguồn hàng". **CLO2:** mục tiêu 5, 6.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** (1) Cột $A=1$: $(a,0)$ $0{,}0294$; $(a,1)$ $0{,}0108$; $(b,0)$ $0{,}0184$; $(b,1)$ $0{,}0288$; tổng $0{,}0874$. (2) **Tính** $\mathbb P(S=b\mid A=1)$ và $\mathbb P(Y=1\mid A=1,S=s)$. (3) display `aligned`: $\mathbb P(S=b\mid A=1)=0{,}0472/0{,}0874=236/437\approx0{,}54$; $\mathbb P(Y=1\mid A=1,S=a)=0{,}0108/0{,}0402=18/67$; $\mathbb P(Y=1\mid A=1,S=b)=0{,}0288/0{,}0472=36/59$. (4) display $\frac{18}{67}\cdot\frac{201}{437}+\frac{36}{59}\cdot\frac{236}{437}=\frac{198}{437}$. (5) **Diễn giải:** trọng số trộn là hậu nghiệm $201/437$ và $236/437$ của nguồn hàng. (11) ≈28 âm tiết, 5 dòng, 2 công thức hiển thị.
- **Ghi chú diễn giả:** $0{,}0294+0{,}0108=0{,}0402$ và $0{,}0184+0{,}0288=0{,}0472$; sau cảnh báo xác suất của $b$ tăng từ $0{,}4$ lên khoảng $0{,}54$ vì hàng của $b$ có tỉ lệ lỗi cao hơn nên dễ bị cảnh báo hơn (L1935); dùng tiên nghiệm $0{,}6$, $0{,}4$ làm trọng số là một nhầm lẫn thường gặp (L1961, L2037).

#### SL11 — Bài tập: hậu nghiệm khi không có cảnh báo
- **Lý do tồn tại:** bài có lời giải trên mặt trang của mạch 6 (Q-B); số do ghi chú tính (L1988); cho SL12 hậu nghiệm thứ hai.
- **Nhu cầu/khoảng trống:** đo việc chạy thuật toán với quan sát khác ($a'=0$).
- **Đầu vào → đầu ra:** SL08–SL09 (hai ô và tổng cột $A=0$, nêu lại) → $22/4563\approx0{,}0048$.
- **Vị trí:** bài tập của cụm trung tâm. **CLO2:** mục tiêu 5.
- **Quyết định:** `thêm`. **Bài tập:** có lời giải trên mặt trang (fragment).
- **Phác thảo:** (1) Cột $A=0$ của bảng đồng thời: ô $Y=1$ là $0{,}0012$ ($S=a$) và $0{,}0032$ ($S=b$); tổng cột $0{,}9126$. (14) (2) **Câu hỏi:** Tính $\mathbb P(Y=1\mid A=0)$ bằng thuật toán suy luận. (3) fragment **Lời giải:** display $\mathbb P(Y=1\mid A=0)=(0{,}0012+0{,}0032)/0{,}9126=0{,}0044/0{,}9126=22/4563\approx0{,}0048$. (4) **Cách khác:** định lý Bayes cho $0{,}1\cdot0{,}044/(1-0{,}0874)$. (5) **Diễn giải:** không cảnh báo làm xác suất lỗi giảm từ $0{,}044$ xuống khoảng $0{,}005$. (14) ≈40 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $1-0{,}0874=0{,}9126$ khớp tổng cột $A=0$.

#### SL12 — Quyết định theo hậu nghiệm và chi phí
- **Lý do tồn tại:** trang cuối của mạch nội dung cuối nối kết quả với ứng dụng bằng một quyết định cụ thể (AGENTS.md); Tình huống 10.1.
- **Nhu cầu/khoảng trống:** hậu nghiệm cần thêm chi phí mới thành quyết định (L1970).
- **Đầu vào → đầu ra:** KV02, KV04 (chi phí), SL09, SL11 → quy tắc "loại khi $r>1/6$", tức "loại khi và chỉ khi có cảnh báo".
- **Vị trí:** ứng dụng và giới hạn của sườn; phần việc: "chi phí", phần cuối của phân rã. **CLO2:** mục tiêu 6.
- **Quyết định:** `thêm` — hình `decision-threshold.svg` (trục $r$). **Sửa (cổng):** hậu nghiệm ký hiệu $r$; nói rõ chi phí kỳ vọng dưới $\mathbb P(\cdot\mid A=a')$; mọi dòng ≤20 âm tiết. **Bài tập:** không (kiểm tra ở TK03 câu (c)).
- **Phác thảo:** (1) Chấp nhận sản phẩm lỗi tốn $5$; loại sản phẩm đạt tốn $1$. (10) (2) Đặt $r=\mathbb P(Y=1\mid A=a')$; dưới $\mathbb P(\cdot\mid A=a')$, chấp nhận tốn trung bình $5r$, loại tốn $1-r$. (15) (3) Loại khi và chỉ khi $5r>1-r$, tức $r>1/6$. (7) (4) hình hai đường cắt nhau. (5) Có cảnh báo: $r=198/437\approx0{,}453>1/6$, nên loại. (6) (6) Không cảnh báo: $r=22/4563\approx0{,}0048<1/6$, nên chấp nhận. (6) (7) **Diễn giải:** quy tắc thu được là loại khi và chỉ khi có cảnh báo; chi phí kỳ vọng $0{,}0698$. (16) ≈60 âm tiết, 6 dòng chữ + hình. Ở trần 60: nếu số đo vượt, chuyển dòng (1) vào dòng (2) dưới dạng "chi phí $5$ và $1$" (`sửa`).
- **Ghi chú diễn giả:** chi phí kỳ vọng có điều kiện tính bằng kỳ vọng của biến chỉ thị dưới $\mathbb P(\cdot\mid A=a')$; khi có cảnh báo, chấp nhận tốn trung bình $990/437\approx2{,}2654$, loại tốn $239/437\approx0{,}5469$; khi không cảnh báo, chấp nhận tốn $110/4563\approx0{,}0241$, loại tốn $4541/4563\approx0{,}9952$ (L1987–1988); chi phí kỳ vọng của quy tắc là $5\cdot0{,}0044+1\cdot0{,}0478=0{,}0698$, đúng chi phí kỳ vọng của bộ cảnh báo đã tính (L1990); ngưỡng $1/6$ đến từ tỉ số chi phí, nên với chi phí khác, cùng hậu nghiệm có thể dẫn tới quyết định khác (L1992).
- **Mẫu (chỉ planning):** MAT1101 Bài 3 S49–S51.

### Mạch 7 · Tổng kết và chuyển tiếp

#### TK00 — 7. Tổng kết và chuyển tiếp (trang tiêu đề mạch, `id="mach-7"`)
- **Lý do tồn tại:** mở mạch kết luận tách khỏi mạch nội dung.
- **Nhu cầu/khoảng trống:** các kết quả của mạch 2–6 cần được đặt cạnh giả thiết của chúng.
- **Đầu vào → đầu ra:** SL12 → bảng kết quả và giả thiết, bài tổng hợp, tài liệu.
- **Vị trí:** điểm vào mạch 7; ngoài hành trình khái niệm. **CLO2:** cả sáu mục tiêu.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Phác thảo:** h2 "7. Tổng kết và chuyển tiếp"; dòng dẫn "Muốn dùng đúng các kết quả của bài, cần ghi kèm giả thiết mà mỗi kết quả đòi hỏi." (19); từ khóa "Giả thiết · Hậu nghiệm · Quyết định · Tham số chưa biết".
- **Ghi chú diễn giả (≈60 âm tiết):** kế thừa hậu nghiệm $198/437$, $236/437$ và ngưỡng $1/6$; nhiệm vụ là đặt mỗi kết quả cạnh giả thiết không được bỏ và giải lại bài toán mở đầu khi xác suất lỗi của luồng hàng đổi; phần này để lại câu hỏi chọn tham số từ dữ liệu.

#### TK01 — Kết quả và giả thiết: suy luận xác suất
- **Lý do tồn tại:** nửa đầu bảng tổng kết "kết quả | giả thiết không được bỏ | công thức" (AGENTS.md): bốn kết quả về biến cố và phân phối đồng thời.
- **Nhu cầu/khoảng trống:** tránh dùng một công thức ngoài giả thiết (các nhầm lẫn L2033–2037).
- **Đầu vào → đầu ra:** mạch 2, 3, 6 → bảng bốn hàng.
- **Vị trí:** tổng hợp sườn. **CLO2:** mục tiêu 1, 2, 5.
- **Quyết định:** `tách` (soạn HTML 2026-11-05): bảng tám hàng của phác thảo cao khoảng 1000 px so với khung 720 px ở cỡ chữ của học phần; không thu nhỏ chữ, nên tách thành TK01 và TK01b. **Sửa (cổng):** đổi tên trang (khác tên mạch). **Sửa (rà lại):** ô công thức dùng KaTeX ngắn. **Bài tập:** không.
- **Mặt trang (đã dựng):** bảng bốn hàng: phần bù, hợp | không gian xác suất | $\mathbb P(E\cup F)=\mathbb P(E)+\mathbb P(F)-\mathbb P(E\cap F)$; có điều kiện, quy tắc nhân | mẫu số dương | $\mathbb P(E\cap F)=\mathbb P(E\mid F)\mathbb P(F)$; toàn phần, Bayes | phân hoạch, $\mathbb P(B_j)>0$, $\mathbb P(E)>0$ | $\mathbb P(B_k\mid E)\propto\mathbb P(E\mid B_k)\mathbb P(B_k)$; nhân tử và lấy biên | $A\perp S\mid Y$ | $p_{Y\mid A}\propto\sum_sp_Sp_{Y\mid S}p_{A\mid Y}$. Cột công thức không cần số hiệu (không ô nào tràn).
- **Ghi chú diễn giả:** đoạn tổng kết L2021 cho phần biến cố và lấy biên; ba nhầm lẫn: Bayes với mẫu số $0$, nhân khi chưa có độc lập, dùng tiên nghiệm làm trọng số sau quan sát.

#### TK01b — Kết quả và giả thiết: phân phối, kỳ vọng và quyết định
- **Lý do tồn tại:** nửa sau bảng tổng kết: các kết quả về mật độ, mômen và quyết định.
- **Nhu cầu/khoảng trống:** như TK01, cho mật độ, mômen và quyết định.
- **Đầu vào → đầu ra:** mạch 4–6 → bảng sáu hàng "kết quả | giả thiết không được bỏ | công thức".
- **Vị trí:** tổng hợp sườn. **CLO2:** mục tiêu 3, 4, 6.
- **Quyết định:** `thêm` (`tách` từ TK01 khi soạn HTML); `sửa` ở rà soát v1: bỏ "Kết luận:" (đáp số chỉ ở TK03), thêm hàng mật độ và không tương quan. **Bài tập:** không.
- **Mặt trang (đã dựng, 39 âm tiết):** bảng sáu hàng: mật độ | $X$ có mật độ $f_X$ | $\mathbb P(X\in B)=\int_Bf_X$; tính tuyến tính | khả tích, không cần độc lập | $\mathbb E[\alpha X+\beta Z]=\alpha\mathbb E[X]+\beta\mathbb E[Z]$; phương sai | $\mathbb E[X^2]<\infty$ | $\operatorname{Var}(X)=\mathbb E[X^2]-(\mathbb E[X])^2$; không tương quan | $X\perp Z$, $\mathbb E[X^2],\mathbb E[Z^2]<\infty$ | $\operatorname{Cov}(X,Z)=0$; kỳ vọng toàn phần | $X$ khả tích, $S$ rời rạc | $\mathbb E[X]=\mathbb E[\mathbb E[X\mid S]]$; quyết định | chi phí cho trước | loại khi $r>1/6$. Ở màn hẹp bảng xếp thành khối.
- **Ghi chú diễn giả:** mật độ cho xác suất bằng diện tích; hiệp phương sai bằng $0$ vẫn cho phép phụ thuộc (độ lệch kích thước); hậu nghiệm cần chi phí để thành quyết định; hai nhầm lẫn: đọc mật độ như xác suất, dùng công thức phương sai khi chưa kiểm mômen bậc hai.

#### TK02 — Bài tập: sản phẩm bị cảnh báo khi thiếu hồ sơ nguồn hàng (đề)
- **Lý do tồn tại:** bài tổng hợp của mạch kết luận (câu hỏi cuối buổi, L2063–2069), thêm sự thay đổi tiên nghiệm của Tình huống 10.2.
- **Nhu cầu/khoảng trống:** đo khả năng ghép Bayes, lấy biên và quyết định trên chính bài toán mở đầu, và phản ứng khi tiên nghiệm đổi.
- **Đầu vào → đầu ra:** mạch 3–6 → ba câu hỏi.
- **Vị trí:** tổng hợp sườn; giới hạn "tiên nghiệm đổi thì tính lại". **CLO2:** mục tiêu 2, 5, 6.
- **Quyết định:** `thêm`. **Sửa (cổng):** câu (b) yêu cầu giải thích vì sao trọng số của $b$ khác $0{,}4$; không nhắc số hiệu tham số. **Bài tập:** có lời giải trên mặt trang, ở trang kế tiếp TK03.
- **Phác thảo:** (1) Sản phẩm bị cảnh báo, thiếu hồ sơ nguồn hàng; $\mathbb P(S=a)=0{,}6$; tỉ lệ lỗi $0{,}02$, $0{,}08$; độ nhạy $0{,}9$; tỉ lệ cảnh báo nhầm $0{,}05$; chi phí $5$ và $1$. (≈25, tách hai dòng khi dựng) (2) **Câu hỏi:** (a) Nêu đại lượng cần tính và giá trị của nó. (3) (b) Tính trọng số của nhà cung cấp $b$ trong phép trộn; giải thích vì sao nó khác $0{,}4$. (17) (4) display $\mathbb P(Y=1\mid A=1)=\sum_s\mathbb P(Y=1\mid A=1,S=s)\,\mathbb P(S=s\mid A=1)$. (5) (c) Nêu quyết định; tính lại khi tỉ lệ lỗi của luồng hàng giảm còn $0{,}01$, cảm biến giữ nguyên. (18) ≈58 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** ba ý cần trả lời: đại lượng và giá trị; trọng số của $b$; quyết định và điều xảy ra khi tỉ lệ lỗi giảm (L2065–2069). Không ghi lời giải ở trang này.

#### TK03 — Bài tập: sản phẩm bị cảnh báo khi thiếu hồ sơ nguồn hàng (lời giải)
- **Lý do tồn tại:** lời giải trên mặt trang của bài tổng hợp (trang kế tiếp cùng tiêu đề).
- **Nhu cầu/khoảng trống:** câu (c) cho kết quả mới $2/13$.
- **Đầu vào → đầu ra:** TK02 → $198/437$; $236/437$; loại; $2/13<1/6$ nên chấp nhận.
- **Vị trí:** tổng hợp sườn; trả lời câu hỏi trung tâm của mạch 1. **CLO2:** mục tiêu 2, 5, 6.
- **Quyết định:** `thêm`. **Sửa (cổng):** "Diễn giải:" ≤20 âm tiết, có điều kiện, gắn $2/13$; dòng ≤20 âm tiết. **Bài tập:** lời giải trên mặt trang.
- **Phác thảo:** (1) **Lời giải:** (a) $\mathbb P(Y=1\mid A=1)=198/437\approx0{,}4531$; con số $0{,}9$ là $\mathbb P(A=1\mid Y=1)$. (10) (2) (b) $\mathbb P(S=b\mid A=1)=236/437\approx0{,}54$: hàng của $b$ lỗi nhiều hơn nên dễ bị cảnh báo hơn. (13) (3) (c) $0{,}4531>1/6$ nên loại. Với tỉ lệ lỗi $0{,}01$: (10) (4) display $\mathbb P(Y=1\mid A=1)=\dfrac{0{,}9\cdot0{,}01}{0{,}9\cdot0{,}01+0{,}05\cdot0{,}99}=\dfrac{2}{13}\approx0{,}1538$. (5) **Diễn giải:** khi tỉ lệ lỗi giảm còn $0{,}01$, cùng một cảnh báo cho hậu nghiệm $2/13<1/6$, nên chấp nhận. (18) ≈52 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** giữ quy tắc cũ thì mỗi sản phẩm bị cảnh báo tốn thêm trung bình $1/13\approx0{,}0769$ đơn vị ($11/13$ so với $10/13$, L2010); hợp lý (đặc tính cảm biến) và tiên nghiệm (tỉ lệ lỗi của luồng hàng) là hai thành phần riêng của định lý Bayes, nên khi chỉ tiên nghiệm đổi, hậu nghiệm được tính lại mà không cần đánh giá lại cảm biến (L2012); xác suất biểu diễn cái chưa biết, kết hợp nhiều nguồn thông tin và cập nhật khi có quan sát mới (L2078); Murphy (2022), §2.3.1.

#### TK04 — Câu hỏi tự kiểm tra
- **Lý do tồn tại:** câu hỏi tự kiểm tra của mạch kết luận (AGENTS.md).
- **Nhu cầu/khoảng trống:** các nhầm lẫn thường gặp của ghi chú (L2033–2037).
- **Đầu vào → đầu ra:** TK01, TK01b → bốn câu, lời giải trong ghi chú diễn giả.
- **Vị trí:** tổng hợp sườn. **CLO2:** mục tiêu 2, 3, 4.
- **Quyết định:** `thêm`; `sửa` ở rà soát v1: câu 4 đổi (câu cũ trùng TK02 (b)), bỏ khung `.check` ở đợt 2. **Bài tập:** tự học (lời giải trong ghi chú diễn giả).
- **Mặt trang (đã dựng):** **Câu hỏi:** (1) Khi nào không dùng được định lý Bayes cho một quan sát? (2) Vì sao không được thay $\mathbb P(E\cap F)$ bằng $\mathbb P(E)\,\mathbb P(F)$ khi chưa có giả thiết? (3) Một mật độ bằng $10$ tại một điểm có mâu thuẫn với tiên đề không? (4) Hai biến có hiệp phương sai bằng $0$ có độc lập không?
- **Ghi chú diễn giả:** "Lời giải:": khi quan sát có xác suất $0$; đẳng thức tích là định nghĩa độc lập; mật độ không phải xác suất, ví dụ mật độ đều bằng $10$ trên $[0;\,0{,}1]$; không nhất thiết, phản ví dụ độ lệch kích thước $X$ và $Y=\mathbf 1_{\{|X|=2\}}$.

#### TK05 — Tài liệu đọc và chuyển tiếp
- **Lý do tồn tại:** tài liệu đọc và cầu nối Bài 11 bằng lời (master-brief, mạch 7).
- **Nhu cầu/khoảng trống:** mọi tham số của bài được cho trước; thực tế phải chọn từ dữ liệu (L2081).
- **Đầu vào → đầu ra:** TK01–TK04 → danh mục đọc theo §12 của ghi chú; nhu cầu chọn tham số.
- **Vị trí:** giới hạn "tham số cho trước" của sườn. **CLO2:** không trực tiếp.
- **Quyết định:** `thêm`. **Bài tập:** bài tự học 10.4–10.12 được nhắc tên.
- **Phác thảo:** (1) Murphy (2022), *Probabilistic Machine Learning: An Introduction*, §2.1–§2.3. (2) §2.2.4–§2.2.5, §2.4.1, §2.5.1, §2.6.1–§2.6.2, §3.1.1–§3.1.3, §3.2.1. (3) Bài tập tự học 10.4–10.12 trong tệp bài tập của Bài 10. (4) **Nhu cầu:** mọi tham số của bài được cho trước; trong thực tế phải chọn chúng từ dữ liệu. (17) ≈40 âm tiết, 4 dòng. Không có địa chỉ web và không có thuật ngữ của Bài 11 trên mặt trang (Q-D).
- **Ghi chú diễn giả:** các tỉ lệ $0{,}6$, $0{,}4$, $0{,}02$, $0{,}08$, $0{,}9$, $0{,}05$ phải được ước lượng từ một mẫu sản phẩm đã kiểm định, và ước lượng có sai số; nếu cảm biến trả về số đo liên tục với $T\mid Y=y\sim\mathcal N(\mu_y,\sigma_y^2)$, các tham số $\mu_y,\sigma_y^2$ cũng chưa biết; Bài 11 giữ cấu trúc mô hình của bài này và chọn tham số từ dữ liệu (L2081); đọc mở rộng: Murphy (2022), §4.2.

## Trang dự kiến gần hoặc vượt trần mật độ

| Mã | Ước lượng | Trần | Quyết định |
|---|---|---|---|
| MD01 | ≈80 âm tiết, 6 dòng | 80 (mục tiêu) | giữ ở trần; đo lại sau khi dựng |
| MD02 | 7 dòng | 6 dòng | ngoại lệ: trang "Nội dung" liệt kê đủ bảy mạch (tiền lệ Bài 07) |
| PP05 | ≈57 âm tiết, 5 dòng + hình | 60 | gộp theo Q-H; `tách` lại nếu số đo vượt 60 hoặc tràn khung |
| MH03, SL01, SL03 | ≈57 âm tiết | 60 | đo lại; chuyển một mệnh đề phụ sang ghi chú nếu vượt |
| SL12 | ≈60 âm tiết, 6 dòng + hình | 60 | `sửa` (gộp dòng chi phí) nếu vượt |
| TK01, TK01b | đo mới: 30 và 39 âm tiết; TK01 năm hàng, TK01b sáu hàng | 80 (tổng kết) | `tách` khi soạn HTML (bảng tám hàng không vừa khung) |
| TK04 | ≈60 âm tiết | 60 | giữ ở trần, hoặc dồn vào ghi chú TK01 nếu cần giảm số trang |

KV03 không còn trong bảng: đã `tách` thành KV03 và KV03b theo cổng storyboard.

## Lệch giữa phác thảo và deck đã dựng (soạn HTML 2026-11-05)

Deck dựng xong có 77 trang. Kích thước được đo bằng `deck_check.py` (âm tiết, dòng, công thức, tràn ngang) và một phép đo chiều cao nội dung trong khung $1280\times720$ (tràn dọc). Với cỡ chữ chuẩn của học phần (lớp cơ sở `section[data-slide-id]{font-size:.8em}` như Bài 07), một dòng mặt trang chứa khoảng 14–16 âm tiết, nên nhiều dòng 17–20 âm tiết của phác thảo xuống dòng. Để mọi trang vừa khung mà không thu nhỏ chữ, các thay đổi sau được thực hiện; nội dung bị dời đi đều nằm trong ghi chú diễn giả của chính trang.

| Trang | Thay đổi so với phác thảo | Lý do |
|---|---|---|
| MD01 | "Tính phân phối biên, có điều kiện khi thiếu nguồn hàng" | trần 80 âm tiết (đo: 80) |
| MH09 | bảng 2×2 (hàng $H$, cột $C$) thay bảng bốn hàng; ba phép tính viết trong dòng | khung 16:9 |
| MH10 | tiêu đề rút thành "Bài tập: bảng của hệ thống sản phẩm"; bảng 2×2; công thức phản hồi sai hai dòng | tràn ngang và dọc |
| BY03 | dòng phần bù $4/13$ vào ghi chú; ba xác suất có điều kiện xếp hai dòng (`gathered`) | khung |
| BY04, BY05 | dòng "Sau quan sát" và "Diễn giải:" rút gọn; mệnh đề quy tắc nhân tách hai dòng | trần 60 âm tiết, dòng ≤20 |
| BY11 | lời giải (a) viết trong một dòng chữ; "Cách khác:" dùng dấu "/" | khung |
| PP04 | dòng "Tính" gộp vào dòng dữ kiện; hình thu còn cao 230 px | khung |
| PP05 | "Trực quan." và "Định nghĩa." đặt cột phải cạnh hình; "Lưu ý:" ($10>1$, xấp xỉ $f_X(x)\,\delta$) vào ghi chú | khung |
| PP08 | "Ý nghĩa:" (tâm, độ rộng) vào ghi chú; mật độ viết $(2\pi\sigma^2)^{-1/2}$; $\Delta(x)$ định nghĩa trong dòng chữ | khung, tràn ngang |
| PP09 | $X\perp Z$ viết trong dòng chữ thay công thức hiển thị | tràn ngang |
| PP11 | công thức toàn phần theo $S$ viết trong dòng "Tính"; hai giá trị xếp `aligned` | khung |
| PP12 | "Ý nghĩa:" rút thành "bỏ được điều kiện $S$ trong mọi phép nhân"; dạng thay thế cụ thể vào ghi chú | khung |
| PP13 | $\mathbb P(W=0)=3/4$ vào ghi chú; lời giải xếp hai dòng | khung |
| KV01 | hai công thức kỳ vọng đặt cạnh nhau (lưới hai cột), không dùng chữ tiếng Việt trong KaTeX | cảnh báo KaTeX, tràn ngang |
| KV02 | "Lưu ý:" $\mathbb E[g(X)]\ne g(\mathbb E[X])$ vào ghi chú | khung |
| KV03 | dòng "Gom nhóm hợp lệ" vào ghi chú | khung |
| KV03b | dòng "Tổng theo một biến" gộp vào nhãn "Tách tổng" (căn cứ khả tích và tổng theo một biến); chi tiết vào ghi chú | khung |
| KV05 | độ lệch chuẩn viết $\operatorname{Var}(X)^{1/2}$; mệnh đề xếp hai dòng | tràn ngang |
| KV07 | hệ số tương quan $\rho_{XZ}$ vào ghi chú (không trang nào sau dùng); dạng $\mathbb E[XZ]-\mu_X\mu_Z$ gộp vào định nghĩa; "Ý nghĩa:" giữ lời trước công thức | khung, tràn ngang ở màn hẹp |
| KV09 | căn cứ của ba đẳng thức gộp một dòng (đẳng thức 2 dùng độc lập; đẳng thức 1 cần mômen bậc hai); phần còn lại vào ghi chú | khung |
| KV11 | điều kiện $\mathbb P(S=s)>0$ của tổng vào ghi chú | trần 60 âm tiết |
| KV12 | câu mở đầu vào ghi chú; khối đổi thứ tự tổng hai dòng | khung |
| SL01 | dòng "Ba phân phối riêng…" vào ghi chú; hình cao 230 px | khung |
| SL03 | "Chứng minh." và "Ý nghĩa:" rút gọn | trần 60 âm tiết, dòng ≤20 |
| SL09 | tiêu đề rút thành "Ví dụ: bảng đồng thời của hệ thống sản phẩm"; bảng đặt cạnh hai dòng chữ và "Diễn giải:"; công thức hậu nghiệm dưới lưới | khung, tràn ngang |
| SL10 | phép trộn kiểm tra viết trong dòng "Diễn giải:" ($\tfrac{18}{67}\cdot\tfrac{201}{437}+\tfrac{36}{59}\cdot\tfrac{236}{437}=\tfrac{198}{437}$) | khung |
| SL11 | bỏ bước trung gian $0{,}0044/0{,}9126$ trong công thức | tràn ngang |
| SL12 | dòng chi phí gộp với định nghĩa $r$; hình cao 230 px | khung |
| TK01 | `tách` thành TK01 và TK01b (mục riêng ở trên) | bảng tám hàng không vừa khung |
| TK02 | tham số tách hai dòng ngắn; phép trộn viết trong câu (b); "cảm biến giữ nguyên" vào ghi chú | trần 60 âm tiết, tràn ngang |
| TK03 | dòng (b), (c) và "Diễn giải:" rút gọn | khung |

Số đo cuối (deck_check): không có lỗi bảng điều khiển, lỗi trang, yêu cầu hỏng, lỗi KaTeX, tràn ngang ở 1600×900 hay tràn ngang ở 390×844. Cờ còn lại: MD02 7 dòng (ngoại lệ đã ghi). TK01 đo 30 âm tiết, TK01b 39 âm tiết (đo lại sau rà soát); MD01 80 âm tiết (trần 80). Chiều cao nội dung lớn nhất 725 px (PP07), ngang mức của Bài 07 (727 px).

## Chỉnh sửa sau năm rà soát độc lập (2026-11-05)

Tác tử chỉnh sửa áp dụng các quyết định của `scratchpad/review-merge-lec10.md` (bản đóng băng sha256 85cc1470…). Khi mục (c) ở trên khác bảng dưới đây, bảng dưới đây mô tả deck hiện hành. Số trang giữ nguyên 77; thứ tự mạch 4 đổi thành PP00–PP10, PP12, PP11, PP13.

### Phân bổ phút cho trang chứng minh (trong thời lượng của mạch, bảng (a))

| Trang | Kết quả | Phút |
|---|---|---|
| MH05 (cột "Chứng minh" của bảng), MH08 | Bổ đề 10.4; Mệnh đề 10.6 | 1 + 2 |
| BY07, BY08 | Định lý 10.11 (toàn phần; Bayes) | 1,5 + 1,5 |
| PP12 | Mệnh đề 10.17 (một dòng "Chứng minh.") | 1,5 |
| KV03, KV03b | Mệnh đề 10.22 (kỳ vọng của hàm; tuyến tính) | 2 + 2 |
| KV06 | Mệnh đề 10.24 | 2 |
| KV09 | Mệnh đề 10.27 | 2 |
| KV12 | Định lý 10.29 | 2 |
| SL06, SL07 | Mệnh đề 10.34 | 2 + 2 |

Tổng khoảng 24 phút trong 120 phút lý thuyết. Không gộp trang chứng minh (yêu cầu người dùng); Gaussian nhiều chiều chuyển vào ghi chú diễn giả PP08 để giảm tải mạch 4.

### Thay đổi theo trang

| Trang | Thay đổi (quyết định `sửa`) |
|---|---|
| MD00 | ghi chú: mở bằng đối tượng, không lấy bài làm chủ ngữ |
| MD01 | sáu mục tiêu viết đủ, thêm kỳ vọng toàn phần, phân biệt không tương quan với độc lập, giả thiết độc lập có điều kiện, chi phí kỳ vọng (80 âm tiết); ghi chú không còn mã CLO2 |
| MD03 | ghi chú: bỏ câu chỉ đường, thay bằng hai thao tác cần làm |
| MD04 | "Đầu ra:" thêm $\mathbb P(S=b\mid A=1)$; dòng camera viết như mô tả đối tượng; ghi chú khẳng định, bỏ chỉ dẫn mục ghi chú |
| MH00, BY00, PP00, KV00, SL00, TK00 | ghi chú ≤100 âm tiết, không lấy "phần này" làm chủ ngữ; BY00 giao hậu nghiệm $198/437$ và quy tắc nhân; PP00, SL00 dòng dẫn mới (bảng (a)) |
| MH02 | `camera-event-grid.svg` vẽ lại (viewBox 420×252, chữ 20–21); chú giải viền vào ghi chú |
| MH04 | thêm "Trực quan." (tỉ lệ khung hình: không âm, bằng $1$ trên cả lưới, cộng được trên tập rời); (P1)–(P3) một dòng; "Với $\Omega$ hữu hạn, $\mathcal F=2^\Omega$" chỉ ở ghi chú |
| MH05 | bảng hai cột "Phát biểu", "Chứng minh", mỗi phần một hàng; $1=1+\sum_{i\ge2}\mathbb P(\varnothing)$ viết rõ |
| MH06 | ghi chú bỏ câu lặp MH04 |
| MH09 | ký hiệu trong tiêu đề hàng, cột của bảng; ba bước một dòng mỗi bước, thêm $H^c$; "Diễn giải:" đọc $10\%$, $8\%$ |
| MH07 | "Nhu cầu:" mới; công thức `aligned`; dòng camera và Bài tập 10.5 vào ghi chú (ứng dụng của (4.9)) |
| MH10 | phản hồi sai một dòng (hai cách); "Diễn giải:" $5{,}2\%$; câu nối vào ghi chú |
| BY01 | `camera-conditioning.svg` vẽ lại; ghi chú bỏ chỉ đường |
| BY03 | "Câu hỏi:" so sánh $\mathbb P(H\mid C)$ với $\mathbb P(C\mid H)$ trên mặt trang; khối tính và "Diễn giải:" là fragment; ghi chú phân biệt hai số $0{,}10$ |
| BY04 | hình mới `supplier-tree-deck.svg` (không tiêu đề, phụ đề, công thức trong hình); "Nhu cầu:" thiếu hồ sơ; bỏ dòng "Sau quan sát"; công thức `aligned` cạnh hình |
| BY05 | "Mệnh đề (quy tắc nhân, product rule)"; dạng ba biến cố "còn gọi là quy tắc chuỗi (chain rule)"; "Ý nghĩa:" không cần giả thiết nào thêm |
| BY06, BY07, BY08 | công thức `aligned` cho màn hẹp; ghi chú BY06 "bỏ khỏi tổng"; ghi chú BY07, BY08 nói điều mặt trang không có |
| BY09 | "Định nghĩa."; tiên nghiệm và hậu nghiệm một mục; "Ký hiệu:" giải thích $\propto$ (hằng số dương không phụ thuộc $k$, ở đây $1/\mathbb P(E)$) |
| BY10 | dòng phân hoạch $\{Y=1\},\{Y=0\}$ và tiên nghiệm từ cây; lưới chữ ↔ công thức; ghi chú $239/437$; Murphy vào nguồn |
| BY11 | tiêu đề bảng "Camera trên tuyến đường vắng"; lời giải tách dòng; ghi chú nêu camera khác (tiên nghiệm $0{,}10$, cảnh báo nhầm $0{,}2$) |
| PP01 | "Nhu cầu:" thêm giá trị đo |
| PP02 | "categorical variable" |
| PP03 | lưới: định nghĩa hàm khối ↔ "Nhu cầu:" và "Trực quan." của hàm phân phối tích lũy; "với $t_1<t_2$"; tính chất của $F_X$ vào ghi chú; nguồn §2.2.1, §2.2.2.1 |
| PP04 | $\{0,1,2\}$; `cdf-three-levels.svg` vẽ lại (+0,70, +0,20, +0,10); hai dòng xác suất cạnh hàm $F_X$ |
| PP05 | lưới: hình ↔ "Nhu cầu:", "Trực quan."; định nghĩa tách hai dòng; `density-area.svg` vẽ lại; ghi chú "đo được", bỏ hai nhận xét bên lề |
| PP06 | "$f_T(t)=2>1$ trên $[0;\,0{,}5]$"; lời giải ba dòng |
| PP07 | "Nhu cầu:"; Bernoulli trong dòng định nghĩa; tham số $\boldsymbol\pi$ |
| PP08 | "Nhu cầu:", "Trực quan."; Gaussian nhiều chiều (có $\mu\in\mathbb R^d$, $\Sigma\in\mathbb R^{d\times d}$, ma trận hiệp phương sai) vào ghi chú; nguồn §2.6.2, §3.2.1 |
| PP09, SL02 | tập Borel ký hiệu $B,B'$ (lệch ghi chú bài giảng: $B_1,B_2$) để $B_j$ chỉ là phân hoạch |
| PP10 | "Trực quan." lên đầu; "Giả thiết:" chỉ còn ký hiệu |
| PP12 | đứng trước PP11; "(Mệnh đề 10.17)" sau phát biểu; "Ý nghĩa:" ghi đẳng thức bỏ điều kiện $S$ |
| PP11 | đứng sau PP12; ghi chú dẫn dạng tương đương; bỏ câu chỉ đường |
| PP13 | nghĩa của $U$, $V$ trên mặt trang; ghi chú "có thể trở nên phụ thuộc" (sửa cả `exercises.md`) |
| KV01 | khả tích viết bằng $\sum\lvert x\rvert p_X(x)$, $\int\lvert x\rvert f_X$; trực quan khép bằng $\mathbb E[Y]=0{,}044$; ghi chú luật số lớn với mọi $\varepsilon>0$ |
| KV02 | $g:\mathcal X\to\mathbb R$, $\mathcal X$ đếm được (số, vector hoặc nhãn); hai khối `gathered`/`aligned` |
| KV03 | bỏ nhãn bước thừa |
| KV03b | thứ tự: điểm xuất phát → khối tính → căn cứ từng đẳng thức (gồm $\sum_{x,z}\mathbb P=1$ cho $\gamma$); ghi chú bỏ tên $W$ |
| KV04 | "Sản phẩm bị cảnh báo thì bị loại"; ba xác suất và $\mathbb E[L]$ trong một khối `aligned` |
| KV05 | "Nhu cầu:" hai chi phí; dòng phương sai $0$ và $1$; "standard deviation" |
| KV06 | dòng đầu "Trường hợp rời rạc (có mật độ: thay tổng bằng tích phân)"; nhãn bước theo kết quả |
| KV07 | tiêu đề "Hiệp phương sai"; $\mu_X,\mu_Z$; "Mệnh đề." $\operatorname{Var}(X+Z)$ + "Chứng minh." một dòng; ví dụ $\operatorname{Cov}=0{,}128$ (camera) trong ghi chú |
| KV08 | định nghĩa không tương quan chuyển từ KV07; "Ý nghĩa:" phương sai tổng số lỗi; ma trận hiệp phương sai và đặc trưng (feature) trong ghi chú |
| KV09 | căn cứ "Đẳng thức thứ nhất…; thứ hai…; thứ ba…"; ghi chú nêu Bài tập 10.12 (tự học, mức chứng minh) |
| KV10 | dòng tính tách ba dòng; `uncorrelated-dependent.svg` vẽ lại; Murphy vào nguồn |
| KV11 | "Nhu cầu:" mới; điều kiện $\mathbb P(S=s)>0$ trong định nghĩa và định lý; "law of total expectation"; ghi chú: toàn phần cho xác suất và cho kỳ vọng |
| KV12 | dòng ý tưởng; khối ba dòng `aligned` ↔ căn cứ; nhãn bước theo kết quả |
| SL01 | "Nhu cầu:" hai đại lượng mới cần phân phối của $(S,Y,A)$; `generation-chain.svg` với $p_S(s)$, $p_{Y\mid S}(y\mid s)$, $p_{A\mid Y}(a'\mid y)$; ghi chú giải thích vì sao Bayes đã cho $198/437$ |
| SL03 | "Ý nghĩa:" cộng hai lá lỗi của cây là lấy biên theo $S$ |
| SL04 | mật độ có điều kiện: không âm, tích phân theo $x$ bằng $1$; dòng chứng minh cho trường hợp mật độ |
| SL05 | "Ký hiệu:" $a'\in\{0,1\}$; "Đặt $q(s,y)=\ldots$"; miền của tổng trong ghi chú |
| SL06, SL07 | nhãn bước theo kết quả; SL06 dẫn bằng lời (dạng tương đương của độc lập có điều kiện) |
| SL09 | "Chẳng hạn ô $(b,1,1)$ …"; "Tính" và công thức trong cột phải; "Diễn giải:" hậu nghiệm là tổng theo $s$ trong cột $A=1$, khớp Bayes |
| SL10 | "Tính" một dòng; công thức cạnh dòng trộn có $\mathbb P(S=a\mid A=1)=201/437$; "Diễn giải:" nguồn $b$ tăng từ $0{,}4$ lên khoảng $0{,}54$ |
| SL11 | "Cách khác:" vào ghi chú |
| SL12 | tiêu đề mới; "Ý nghĩa:" bộ phân loại xác suất trả về $p(y\mid x)$; `decision-threshold.svg` vẽ lại (miền "chấp nhận, $r<1/6$", "loại, $r>1/6$" dưới trục) |
| TK01 | tách hàng "Lấy biên" (không thêm giả thiết) và "Phân tích nhân tử" ($A\perp S\mid Y$, $p_A(a')>0$; $\propto$ theo $y$); bảng xếp khối ở màn hẹp (`stack-table`) |
| TK01b | tiêu đề mới; thêm hàng "Mật độ" và "Không tương quan"; bỏ "Kết luận:" |
| TK02 | trọng tâm Tình huống 10.2 (tiên nghiệm chung $0{,}01$, quyết định, chi phí thêm); (a), (b) là câu nhắc; cả đề trong một khung |
| TK03 | lời giải (c) với chi phí thêm $1/13$; ghi chú bỏ câu khẩu hiệu, Murphy vào nguồn |
| TK04 | câu 4 về hiệp phương sai bằng $0$; cả đề trong một khung; "Lời giải:" |
| TK05 | dòng đọc thứ hai "Đọc sau buổi học: Murphy (2022), phân phối và mômen: …"; ghi chú $T\to X$, bỏ câu lặp MH03 |

CSS (chỉ phạm vi Bài 10): `white-space:nowrap` cho `.katex` khi `min-width:761px`; lề đoạn và lề công thức hiển thị gọn hơn ở màn rộng; lưới KV10, SL12; chiều cao hình PP05, KV10, SL12 (300 px), SL01 (270 px); `stack-table` xếp bảng thành khối ở `max-width:760px`.

### Chỉnh sửa đợt 2 (sau ba vòng rà lại, 2026-11-05)

| Trang | Thay đổi (`sửa`) |
|---|---|
| MH06 | "trên họ mọi tập con $2^\Omega$" |
| MH09 | "Diễn giải:" $8\%$ cảnh báo sai, $2\%$ bỏ sót |
| PP03 | lưới: trái hàm khối; phải "Nhu cầu:", "Trực quan." rồi định nghĩa hàm phân phối tích lũy |
| PP04 | mô tả ba mức vào ghi chú; "Diễn giải:" rút gọn; nhãn "0" của hình không chồng chấm |
| PP05 | hình cao 276 px, nhãn $x_0$, $x_0+\delta$ |
| PP06 | lời giải và "Diễn giải:" đặt cạnh nhau |
| PP12 | "Ý nghĩa:" với $A=1$, mọi $(s,y)$ có $\mathbb P(S=s,Y=y)>0$ |
| KV02 | "$g:\mathbb R\to\mathbb R$ đo được"; hai công thức đặt cạnh nhau |
| KV03b | `aligned` bảy dòng cho màn hẹp, căn cứ ở cột phải |
| KV04 | ba dữ kiện chi phí một dòng; "Diễn giải:" rút gọn |
| KV07 | "Mệnh đề." nêu giả thiết ("Với $X,Z$ như trên") |
| KV10 | cột $\pm2$ đúng tỉ lệ |
| SL01 | thêm `generation-chain-narrow.svg` (xếp dọc) cho màn hẹp |
| SL09 | gộp hai dòng thành một; "tham số, $A\perp S\mid Y$" vào ghi chú; màn hẹp ẩn cột "Tổng" |
| SL10 | "Tính" nêu công cụ (lấy biên theo $y$ trong cột $A=1$, rồi chuẩn hóa), đặt ở cột phải; ghi chú nối ví dụ cảnh báo và nguồn hàng |
| SL11, SL12, TK03 | dòng dữ kiện hoặc "Ý nghĩa:" rút gọn; SL12 thêm nhãn $0{,}0048$ trên hình |
| TK01, TK01b | đối số có điều kiện trong `{}` (không ngắt trong ngoặc ở màn hẹp); TK01b hàng mật độ "$X$ có mật độ $f_X$", hàng không tương quan có mômen bậc hai |
| TK02 | "nếu vẫn loại khi có cảnh báo"; không khung; dữ kiện nguồn hàng ở ghi chú |
| TK04 | không khung |
| ghi chú MD00, MH00, BY00, PP00, KV00, SL00, TK00, MH04, PP08, SL01, SL12, BY10, KV01, KV07, KV08 | thống nhất "phần"; rút câu bên lề; luật số lớn "khi $n\to\infty$"; KV08 dẫn Mệnh đề 10.26 |

### Sửa theo rà soát độc lập các trang chứng minh (2026-11-05)

| Trang | Thay đổi (`sửa`) |
|---|---|
| BY08 | căn cứ: "thứ hai: quy tắc nhân, dùng $\mathbb P(B_k)>0$" |
| KV05 | "Mệnh đề. Với $X$ như trên, $\alpha,\beta\in\mathbb R$:" |
| SL04 | trường hợp mật độ: $f_Z(z)=\int f_{X,Z}(x,z)\,dx\in(0,\infty)$ |
| SL07 | bước hậu nghiệm: "dùng $p_A(a')>0$" |
| KV07, KV08, KV11 | chỉ ghi chú: tuyến tính tổng quát thừa nhận (KV07); dẫn Mệnh đề 10.26 (KV08); nguồn Murphy theo mục và công thức |

## Phụ lục: kế hoạch ghi chú bài giảng (2026-11-02)

Nội dung dưới đây là `storyboard.md` của kế hoạch ghi chú, giữ nguyên văn; chỉ hạ cấp tiêu đề hai bậc.

### Mạch khái niệm của ghi chú Bài 10

Đây là storyboard của ghi chú, không phải kế hoạch tạo slide.

| Mục | Nhu cầu, dữ kiện đầu vào | Công cụ và kết quả | Ví dụ, kiểm tra và giới hạn |
|---|---|---|---|
| 1 | Camera có bốn loại kết quả, cần xác suất lỗi | Không gian mẫu → biến cố → tiên đề → hợp/phần bù | Camera: đồng thời khác có điều kiện; BT10.1–10.2 |
| 2 | Đã có cảnh báo nhưng chưa biết nhãn | Điều kiện → nhân → toàn phần → Bayes; độc lập có điều kiện | Hai nhà cung cấp, lỗi và cảnh báo; BT10.3,10.5,10.6 |
| 3 | Cần mô tả nhãn và tín hiệu số | Biến ngẫu nhiên → PMF/CDF/PDF → Bernoulli/phân loại/Gaussian | Ngưỡng CDF, mật độ trên khoảng; BT10.4,10.7 |
| 4 | Cần trung bình chi phí và độ phân tán | Kỳ vọng và hàm biến → tuyến tính → phương sai/covariance → kỳ vọng toàn phần | Chỉ báo lỗi, phụ thuộc phi tuyến; BT10.7–10.9 |
| 5 | Nhà cung cấp không được quan sát | Đồng thời → lấy biên → có điều kiện → tổng trên biến ẩn | P(S,Y,A), hậu nghiệm nguồn hàng; BT10.6,10.8 |
| Cuối chương | Cần trả lời hai câu hỏi suy luận và chuẩn bị ước lượng | Tổng hợp Bayes và lấy biên, phân biệt mô hình/ước lượng/quyết định | Ba bài trên lớp, bốn bài tự học, lời giải phụ lục |

Các chứng minh và phép tính được đặt ngay sau kết quả. Giữ camera ở phần đã có, chuyển minh bạch sang sản phẩm lỗi ở Mục 2; không đổi bảng số của phần hiện có. Hình SVG tự tạo minh họa nhân theo nhánh và cộng lấy biên, không sao chép hình Murphy. Phần Gaussian nhiều chiều chỉ nêu mật độ và giả thiết, không chứng minh hình học của Bài11. Kết quả concentration Bài05c được dẫn và phát biểu lại chỗ cần dùng, không tái tạo chương đó.
