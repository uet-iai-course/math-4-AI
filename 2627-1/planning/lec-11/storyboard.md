# Storyboard bộ trang chiếu Bài 11 — Học từ dữ liệu qua ước lượng thống kê

Storyboard của bộ trang chiếu `2627-1/lecture-11-hoc-tu-du-lieu-uoc-luong-thong-ke.html` (soạn 2026-11-07, giai đoạn A). Mã trang chỉ dùng trong tài liệu planning, không xuất hiện trên mặt trang hay trong ghi chú diễn giả. Số dòng "L…" là dòng của `materials/lec-11/lecture-note.md`; "BT L…" là dòng của `materials/lec-11/exercises.md`. Danh sách trang và ánh xạ sang khối ghi chú: `outline.md`, mục "Danh sách trang". Bảng mạch lập luận cũ của ghi chú nằm ở cuối tệp, mục "Phụ lục".

Âm tiết được đếm bằng số từ tách theo khoảng trắng, không tính tiêu đề, KaTeX, ô số của bảng và nhãn trong hình. Các số trong mục (c) là ước lượng trên phác thảo; số đo thật được ghi lại sau khi dựng HTML. Mỗi dòng chữ trên mặt trang ≤20 âm tiết; mỗi khối công thức hiển thị tính là một dòng. Sau năm rà soát độc lập (D1, D2 của `review-log.md`): deck không dùng `\tag`, mặt trang gọi công thức và kết quả của Bài 11 bằng tên ("hàm hợp lý Bernoulli", "đẳng thức tách tâm", "định lý ước lượng Bernoulli"); số hiệu của ghi chú chỉ nằm trong `p.note-source`. Các số (4.1), (5.1), … trong storyboard và dàn ý là số công thức của ghi chú bài giảng.

Trường "Nguồn" ghi dòng ghi chú và mục Murphy (công thức, trang PDF = trang in + 30); trên deck, nguồn chỉ nằm trong `<p class="note-source">` của ghi chú diễn giả. Trường "Mẫu (chỉ planning)" ghi trang MAT1101 dùng làm mẫu diễn đạt; tham chiếu này không đưa vào ghi chú diễn giả.

## (a) Bảng chức năng và ranh giới mạch

| # | Mạch | Trang tiêu đề | Câu hỏi trung tâm (một câu) và phân rã | Dòng dẫn (≤25 âm tiết) | Từ khóa (≤5) | Đầu vào | Đầu ra | Thời lượng |
|---|---|---|---|---|---|---|---|---|
| 1 | Mở đầu | MD00 (bìa, `id="mach-1"`) | Sản phẩm mới nào lệch khỏi chế độ vận hành bình thường nhiều hơn, và cần ước lượng gì từ dữ liệu nền để trả lời. | (bìa, không có dòng dẫn) | — | Bài 10 (họ phân phối, tham số cho trước; chỉ dẫn trong ghi chú diễn giả) | Bài toán hai sản phẩm $a$, $b$; khung dữ liệu, mô hình, nhiệm vụ, đầu ra | 5 phút |
| 2 | Mô hình thống kê và hàm hợp lý | HL00 (`id="mach-2"`) | Biến yêu cầu "tham số phù hợp với dữ liệu" thành một bài toán tối ưu trên $\Theta$ thế nào; phân rã: mô hình và cơ chế lấy mẫu → hàm hợp lý dạng tích → log → rủi ro thực nghiệm. | Muốn chọn tham số phù hợp với dữ liệu, cần viết xác suất của dữ liệu thành hàm của tham số rồi tối ưu. (24) | Mô hình thống kê · Mẫu i.i.d. · Hàm hợp lý · Rủi ro thực nghiệm | Họ Bernoulli, phân loại, Gaussian (Bài 10) | (4.1)–(4.3): mục tiêu $\hat R_n$ với mất mát âm log-hợp lý; vai trò của giả thiết độc lập | 14 phút |
| 3 | Ước lượng xác suất từ số đếm | TS00 (`id="mach-3"`) | Xác suất nào cực đại hợp lý khi dữ liệu là số đếm, kể cả khi có số đếm bằng $0$; phân rã: một tham số trên đoạn đóng (dấu đạo hàm, hai đầu mút) → $K$ tham số trên đơn hình (nhân tử Lagrange tìm ứng viên, $\log t\le t-1$ chứng minh cực đại). | Muốn ước lượng xác suất từ số đếm, cần cực đại hợp lý với ràng buộc tổng bằng một, kể cả số đếm bằng không. (25) | Bernoulli · Nghiệm biên · Đơn hình xác suất · Nhân tử Lagrange · Entropy chéo | (4.2), (4.3) | $\hat p=s/n$, $\hat\pi_k=n_k/n$; entropy chéo nhị phân; miền đóng quyết định sự tồn tại nghiệm; công cụ $\log t\le t-1$ | 26 phút (không kể hai bài trên lớp) |
| 4 | Gaussian một chiều và độ chệch | G100 (`id="mach-4"`) | Với số đo liên tục, $(\mu,\sigma^2)$ nào cực đại hợp lý, khi nào nghiệm tồn tại, và chia $Q$ cho $n$ hay $n-1$; phân rã: tối ưu $\mu$ với mọi $v$ → tối ưu $v$ → trường hợp $Q=0$ → tiêu chuẩn không chệch. | Muốn ước lượng vị trí và độ phân tán của số đo liên tục, cần cực đại hợp lý Gaussian và chọn mẫu số. (24) | Log-hợp lý Gaussian · Trung bình mẫu · Phương sai mẫu · Độ chệch · Mất mát bình phương | Mệnh đề 11.3; phương pháp "tìm ứng viên, chứng minh cực đại toàn cục" | (7.2), (7.3), (7.4); mất mát bình phương; hai mẫu số | 24 phút |
| 5 | Ước lượng Gaussian nhiều chiều | GN00 (`id="mach-5"`) | Từ bốn vector nền, ước lượng $\mu$ và $\Sigma$ thế nào và khi nào nghiệm tồn tại; phân rã: hiệp phương sai mẫu → tối ưu $\mu$ với mọi $\Sigma$ → tối ưu $\Sigma$ qua trị riêng → $S_n$ suy biến → bản không chệch. | Muốn ước lượng trung bình và ma trận hiệp phương sai từ dữ liệu nền, cần biết khi nào nghiệm tồn tại. (22) | Ma trận hiệp phương sai · Hiệp phương sai mẫu · Ma trận độ chính xác · Điều kiện tồn tại | (7.3), Định lý 11.9, Mệnh đề 11.11; $\log t\le t-1$ (mạch 3) | $\hat\mu=(10,20)^\top$, $\hat\Sigma=S_4$, $\hat\Sigma^{-1}$; điều kiện $S_n\succ0$; $\mathbb E[S_{n-1}]=\Sigma$ | 26 phút |
| 6 | Khoảng cách Mahalanobis và hình học Gaussian | HH00 (`id="mach-6"`) | Đo độ lệch của $a$, $b$ theo mức phân tán của từng hướng thế nào, và sản phẩm nào lệch hơn; phân rã: trị riêng và vector riêng → trục, bán trục → $d^2_\Sigma=\sum_jz_j^2/\lambda_j$ → so sánh và quyết định. | Muốn so độ lệch của hai sản phẩm mới, cần đo theo mức phân tán của từng hướng riêng. (19) | Phân rã trị riêng · Tọa độ riêng · Đường đồng mức · Khoảng cách Mahalanobis | $\hat\mu$, $\hat\Sigma$, $\hat\Sigma^{-1}$ (mạch 5) | $d^2(a)=9/2$, $d^2(b)=8$; tỉ số mật độ $e^{7/4}$; với ngưỡng $6$ chỉ $b$ bị gắn cờ | 15 phút (không kể bài trên lớp) |
| 7 | Tổng kết và chuyển tiếp | TK00 (`id="mach-7"`) | Công thức ước lượng nào dùng được dưới giả thiết nào. | Muốn dùng đúng các công thức ước lượng, cần ghi kèm giả thiết mà mỗi công thức đòi hỏi. (19) | Giả thiết · Miền tham số · Không suy biến · Hàm mất mát | Mọi kết quả của mạch 2–6 | Bảng kết quả và giả thiết; bài tổng hợp về hàm mất mát và nghiệm biên; câu hỏi tự kiểm tra; nhu cầu của Bài 12 bằng lời | 10 phút |

Tổng: 120 phút lý thuyết + 30 phút cho ba bài trên lớp (TS08–TS09, TS16–TS17, HH07–HH08; kế hoạch ghi chú, Phụ lục của `outline.md`). Các bài có lời giải trên mặt trang khác (HL08, G112, GN14, TK02–TK03) nằm trong thời lượng lý thuyết của mạch.

Bảy mạch nằm trong khoảng 5–7 của AGENTS.md. Tên mỗi mạch khác tiêu đề trang nội dung đầu tiên của mạch (HL01, TS01, G101, GN01, HH01, TK01). Câu hỏi trung tâm của mỗi mạch nội dung xuất hiện ở dòng dẫn của trang tiêu đề và ở dòng "Nhu cầu:" của trang nội dung đầu tiên (HL01, TS01, G101, GN01, HH01).

## (b) Bản đồ hành trình khái niệm

Thứ tự trang trong mạch 3: TS00, TS01, TS03–TS17 (mã TS02 không dùng; hàm hợp lý Bernoulli gộp vào TS01).

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức | Ứng dụng | Bài tập | Đầu vào → sản phẩm học tập; CLO2 (mục tiêu) | Ký hiệu, dữ kiện truyền từ ví dụ sang hình thức | Gộp, không áp dụng; câu nối; thời lượng |
|---|---|---|---|---|---|---|---|---|---|
| Mô hình thống kê, mẫu và bộ ước lượng | HL00 (dòng dẫn), HL01 ("Nhu cầu:" xác định tham số của mô hình dây chuyền từ dữ liệu) | HL01 ("Trực quan.": mỗi giá trị tham số cho một phân phối trên các bộ dữ liệu) | HL02 (sáu cờ, hai cơ chế lấy mẫu) | HL03 (Định nghĩa 11.1) | HL05 (dạng tích của hàm hợp lý dùng giả thiết độc lập) | HL08 (câu (b): bước cần giả thiết độc lập) | Tham số cho trước (Bài 10) → mô hình, mẫu i.i.d., bộ ước lượng; mục tiêu 1 | Cờ $X_i\sim\operatorname{Bernoulli}(p)$ của HL02 là $P_\theta$ với $\theta=p$ ở HL03; $\bar x=1/2$ là giá trị ước lượng | Nhu cầu và trực quan gộp ở HL01. Câu nối HL02→HL03: "xác suất của dữ liệu cần phân phối đồng thời, nên mô hình phải nêu cả cách lấy mẫu". 5 phút. |
| Hàm hợp lý và ước lượng hợp lý cực đại | HL04 ("Nhu cầu:" so hai giá trị của $p$ khi dữ liệu cố định) | HL04 ("Trực quan.": giữ $D$ cố định, xem xác suất của $D$ là hàm của $p$) | HL04 (ví dụ dẫn nhập $1/64$ so với $0{,}0093$) | HL05 (Định nghĩa 11.2) | TS06, G106 (nghiệm cụ thể) | HL08 (câu (a)) | Hai số xác suất → hàm $L(\theta;D)$, tập argmax; mục tiêu 1 | $p^3(1-p)^3$ của HL04 là $L(p;D)$ ở HL05 | Nhu cầu, ví dụ dẫn nhập và trực quan gộp ở HL04 (một phép so sánh). Câu nối HL04→HL05: "đặt tên cho hàm $p\mapsto p^3(1-p)^3$, cho mô hình bất kỳ". 3 phút. |
| Hợp lý cực đại tương đương rủi ro thực nghiệm với mất mát log | HL06 ("Nhu cầu:" đổi tích của $n$ hợp lý thành trung bình mất mát) | HL06 ("Trực quan.": log biến tích thành tổng, giữ thứ tự; đổi dấu đổi cực đại thành cực tiểu) | TS07 (entropy chéo nhị phân là $\hat R_n$ của Bernoulli) | HL06, HL07 (P1) | TS07, G107 | HL08; TK02–TK03 | Hàm hợp lý → bài toán cực tiểu trung bình mất mát; mục tiêu 6 | $\hat R_n$ của HL06 là entropy chéo ở TS07 và tổng bình phương ở G107 | Ví dụ đứng sau phát biểu (ngoại lệ Q-K): mệnh đề là phép đổi thứ tự, ví dụ cụ thể cần một họ phân phối. Câu nối HL07→HL08: "mục tiêu tối ưu viết được cho mọi mô hình i.i.d.". 4 phút. |
| Ước lượng Bernoulli, kể cả nghiệm biên | TS00 (dòng dẫn), TS01 ("Nhu cầu:" ước lượng xác suất từ số đếm, hai nhóm rồi nhiều nhóm; mười cờ, chứng minh $7/10$; mẫu toàn $0$ hoặc toàn $1$) | TS01 ("Trực quan.": tăng $p$ lợi cho số $1$, hại cho số $0$) | TS01 (ví dụ dẫn nhập: mười cờ, $s=7$), TS06 | TS01 ((5.1)), TS03, TS04–TS05 (P2) | TS06 (dự đoán thế tham số), TS07 (entropy chéo nhị phân) | TS08–TS09 (Bài tập 11.1, trên lớp, lời giải trên mặt trang) | (4.2) → $\hat p=s/n$ trên $[0,1]$, vai trò của miền đóng; mục tiêu 2, 6 | $s=7$, $n=10$ của TS01 là $s$, $n$ của (5.1) và (5.2) | Nhu cầu, trực quan, ví dụ dẫn nhập và (5.1) gộp ở TS01. Câu nối TS05→TS06: "áp dụng cho mười cờ, $0<s<n$". 13 phút. |
| Ước lượng phân loại trên đơn hình | TS10 ("Nhu cầu:" ba xác suất chế độ tải; cực đại từng thừa số đẩy mỗi $\pi_k$ tới $1$) | TS10 ("Trực quan.": tổng khối lượng $1$ chia cho ba nhóm) | TS10 (ví dụ dẫn nhập $(2,3,5)$), TS15 | TS11 (Định nghĩa 11.6), TS12, TS13–TS14 (P3) | TS15 (kiểm điều kiện dừng; ghi chú diễn giả: entropy chéo nhiều lớp) | TS16–TS17 (Bài tập 11.2, trên lớp) | Đoạn $[0,1]$ → đơn hình $\Delta_{K-1}$; Lagrange cho ứng viên, $\log t\le t-1$ cho cực đại; mục tiêu 3 | $(n_1,n_2,n_3)=(2,3,5)$ của TS10 là $n_k$ của (6.1), (6.2) | Nhu cầu, ví dụ dẫn nhập và trực quan gộp ở TS10. Câu nối TS12→TS13: "điều kiện dừng chỉ cho ứng viên; tính cực đại cần một bất đẳng thức". 13 phút. |
| Ước lượng Gaussian một chiều | G100 (dòng dẫn), G101 ("Nhu cầu:" vị trí, mức dao động của năm độ lệch nhiệt độ) | G101 ("Trực quan.": dịch $\mu$, thu hẹp $\sigma^2$) | G101 (ví dụ dẫn nhập $(0,1,2,3,4)$), G106 | G102 ((7.1)), G103, G104–G105 (P4) | G107 (mất mát bình phương; so với nhiễu Laplace) | G112 (bài có lời giải trên mặt trang, số của Ví dụ 11.7) | Họ có mật độ → $\hat\mu=\bar x$, $\hat\sigma^2=Q/n$, điều kiện $Q>0$; mục tiêu 4, 6 | $\bar x=2$, $Q=10$ của G106 là $\bar x$, $Q$ của (7.2) | Nhu cầu, ví dụ dẫn nhập và trực quan gộp ở G101. Câu nối G105→G106: "áp dụng cho năm độ lệch, $Q=10>0$". 14 phút. |
| Độ chệch và tính không chệch | G108 ("Nhu cầu:" đánh giá $Q/n$ qua các lần lấy mẫu lặp lại) | G108 ("Trực quan.": tổng bình phương sai lệch quanh $\bar x$ không vượt tổng quanh $\mu$ thật) | G108 (ví dụ dẫn nhập: $n=1$ cho $Q/n=0$ với mọi dữ liệu) | G109 (Định nghĩa 11.10), G110, G111 (P5) | G112; GN12–GN13 (dạng ma trận) | G112 | Một mẫu cố định → hành vi qua các lần lấy mẫu; mục tiêu 4 | $Q$ của (7.3) thành $Q_X$ ngẫu nhiên ở G110 | Nhu cầu, ví dụ dẫn nhập và trực quan gộp ở G108. G112 vừa là ứng dụng vừa là bài tập: phép chia hai mẫu số trên cùng $Q$ là thao tác người học cần tái tạo. Câu nối G111→G112: "hai mẫu số trên cùng năm độ lệch". 10 phút. |
| Ma trận hiệp phương sai và hiệp phương sai mẫu | GN00 (dòng dẫn), GN01 ("Nhu cầu:" mức phân tán theo mọi hướng) | GN01 ("Trực quan.": đám điểm kéo dài theo $(1,1)^\top$) | GN01 (ví dụ dẫn nhập: phương sai từng tọa độ đều $5/2$), GN04 | GN02 (Định nghĩa 11.12, (8.2)), GN03 (Định nghĩa 11.13, (8.4)) | GN04 (phần tử ngoài đường chéo $3/2$) | GN14 | Phương sai → ma trận; điều kiện $S_n\succ0$; mục tiêu 4 | Các sai lệch $(2,-2,1,-1)$, $(2,-2,-1,1)$ của GN01 là $\tilde x_i$ của GN04 | Nhu cầu, ví dụ dẫn nhập và trực quan gộp ở GN01. Câu nối GN01→GN02: "một đại lượng ghi cả xu hướng hai tọa độ cùng biến động". 7 phút. |
| Ước lượng Gaussian nhiều chiều và điều kiện tồn tại (kết quả trung tâm) | GN00, GN01 | GN01; GN03 ("Trực quan.": $S_n$ là ứng viên cho $\Sigma$ như $Q/n$ cho $\sigma^2$) | GN04, GN10, GN11 (trường hợp suy biến) | GN05, GN06–GN09 (P6) | GN10 (nghiệm duy nhất $\mathcal N((10,20)^\top,S_4)$; $\hat\Sigma^{-1}$ cho mạch 6; mật độ tại tâm trong ghi chú diễn giả) | GN14 (bài có lời giải trên mặt trang, số của Ví dụ 11.10) | $S_n$ → $\hat\Sigma=S_n$ khi $S_n\succ0$; không có nghiệm khi suy biến; mục tiêu 4 | $S_4$ của GN04 là $S_n$ của (8.6); $\Lambda$, $C$ chỉ trong chứng minh | Câu nối GN05→GN06: "chứng minh theo bốn bước: trung bình, đổi biến, trị riêng, suy biến"; GN09→GN10: "dữ liệu cảm biến có $S_4\succ0$". 15 phút. |
| Hiệp phương sai mẫu không chệch (khái niệm phụ) | GN12 (dòng "Ý nghĩa:" nối với Mệnh đề 11.11) | (đã có ở G108) | ghi chú diễn giả GN12 ($S_{n-1}=\tfrac43S_4$) | GN12, GN13 (P7) | GN11 (nhân $3/2$ không đổi hạng) | Bài tập 11.7 (tự học, ghi chú diễn giả GN13) | Mẫu số $n-1$ → ma trận; mục tiêu 4 | $Y_i=w^\top X_i$ đưa ma trận về trường hợp một chiều | Chu trình rút gọn nhu cầu → hình thức → kiểm tra: cùng trực quan của G108 áp cho từng hướng. 4 phút. |
| Khoảng cách Mahalanobis và hình học Gaussian | HH00 (dòng dẫn), HH01 ("Nhu cầu:" so độ lệch của $a$, $b$ theo $\hat\Sigma$) | HH01 ("Trực quan.": quay trục, chia độ lệch chuẩn; hình `gaussian-geometry-deck.svg`) | HH05 | HH02 (Định nghĩa 11.16), HH03, HH04 (P8) | HH06 (trả lời câu hỏi mở đầu), HH09 (quyết định với ngưỡng $6$) | HH07–HH08 (Bài tập 11.3, trên lớp) | $\hat\Sigma$ → hướng, bán trục, $d^2_{\hat\Sigma}$; mục tiêu 5 | $\lambda_\pm=4,1$, $u_\pm$ của HH05 là $\lambda_j$, $u_j$ của (8.9) | Nhu cầu và trực quan gộp ở HH01. Ứng dụng HH09 đứng sau bài tập theo tiền lệ Bài 10 (Q-K). Câu nối HH04→HH05: "áp dụng cho $\hat\Sigma=S_4$". 15 phút. |

Tổng thời lượng các cụm khớp bảng (a): mạch 2: 12 phút + trang tiêu đề và HL08; mạch 3: 26 phút; mạch 4: 24 phút; mạch 5: 26 phút; mạch 6: 15 phút.

## (c) Mục từng trang

Các mục sửa theo cổng storyboard (2026-11-07, `review-log.md`, "Cổng storyboard") có trường "Sửa (cổng)" ghi số phát hiện. Mỗi mục ghi: tiêu đề dự kiến; lý do tồn tại; nhu cầu hoặc khoảng trống; đầu vào → đầu ra; vị trí trong sườn và phần việc của câu hỏi trung tâm mạch; mục tiêu học tập (CLO2); quyết định; loại bài tập; nguồn; mẫu (chỉ planning); phác thảo mặt trang (dòng đánh số theo thứ tự trên trang); ghi chú diễn giả dự kiến. Mọi trang là `thêm` vì bộ trang chiếu mới.

### Mạch 1 · Mở đầu

#### MD00 — Học từ dữ liệu qua ước lượng thống kê (bìa, `id="mach-1"`)
- **Lý do tồn tại:** định danh bài, học phần, đơn vị; là trang tiêu đề của mạch mở đầu (AGENTS.md).
- **Nhu cầu/khoảng trống:** người học cần biết bài chuyển từ tham số cho trước sang tham số xác định từ dữ liệu.
- **Đầu vào → đầu ra:** không → tên bài và nguyên lý chung (hợp lý cực đại) trong ghi chú diễn giả.
- **Vị trí:** điểm vào mạch 1; ngoài hành trình khái niệm. **Mục tiêu:** phạm vi chung, CLO2.
- **Quyết định:** `thêm` — trang bắt buộc. **Bài tập:** không.
- **Nguồn:** L1–10; Murphy §4.1, PDF 137. **Mẫu (chỉ planning):** bìa deck 10.
- **Phác thảo:** h1 "Học từ dữ liệu qua ước lượng thống kê"; h3 "Hàm hợp lý, ước lượng hợp lý cực đại, hiệp phương sai và khoảng cách Mahalanobis · Bài 11"; hai dòng học phần, học kỳ, đơn vị như deck 10. ≈30 âm tiết, 4 dòng.
- **Ghi chú diễn giả (40–100 âm tiết):** Bài 10 tính xác suất với các tham số đã biết, chẳng hạn tỉ lệ lỗi của từng nhà cung cấp. Trong thực tế các tham số này chưa biết và phải xác định từ dữ liệu (L3). Bài này dùng lại các họ Bernoulli, phân loại, Gaussian và chọn tham số bằng một nguyên lý chung: tham số làm dữ liệu đã quan sát có xác suất hoặc mật độ lớn nhất (L10). Nguồn: Murphy (2022), §4.1–4.2.

#### MD01 — Mục tiêu học tập
- **Lý do tồn tại:** chuyển sáu mục tiêu L37–42 thành sản phẩm đánh giá được.
- **Nhu cầu/khoảng trống:** người học cần biết mỗi mạch đo gì.
- **Đầu vào → đầu ra:** MD00 → sáu mục tiêu.
- **Vị trí:** mạch 1; ngoài hành trình khái niệm. **Mục tiêu:** cả sáu (L44, CLO2).
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Nguồn:** L33–44.
- **Phác thảo:** danh sách đánh số: (1) Phát biểu mô hình thống kê, viết hàm hợp lý theo cách lấy mẫu. (14) (2) Chứng minh ước lượng hợp lý cực đại (maximum likelihood estimation, MLE) Bernoulli, kể cả nghiệm biên. (17) (3) Dùng nhân tử Lagrange cho phân loại; chứng minh cực đại toàn cục. (13) (4) Ước lượng trung bình, hiệp phương sai Gaussian; xét tồn tại, độ chệch. (13) (5) Đọc đường đồng mức Gaussian bằng trị riêng, khoảng cách Mahalanobis. (11) (6) Suy ra mất mát từ giả thiết phân phối. (9) ≈77 âm tiết (trần 80), 6 dòng, dòng dài nhất 17. Thuật ngữ tiếng Anh và viết tắt MLE ở lần dùng đầu (Q-G).
- **Ghi chú diễn giả:** các mục tiêu cụ thể hóa CLO2 của đề cương (L44); mục tiêu 4 gồm phân biệt nghiệm hợp lý cực đại (mẫu số $n$) với ước lượng không chệch (mẫu số $n-1$); mục tiêu 6 gồm giải thích vì sao đổi mô hình xác suất thì đổi mục tiêu học tham số (L42).

#### MD02 — Nội dung
- **Lý do tồn tại:** trang "Nội dung" bắt buộc; số và tên khớp bảy trang tiêu đề mạch và `#/N`.
- **Nhu cầu/khoảng trống:** người tự học cần bản đồ bài.
- **Đầu vào → đầu ra:** MD01 → danh sách bảy mạch.
- **Vị trí:** mạch 1; ngoài hành trình khái niệm. **Mục tiêu:** không trực tiếp.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Nguồn:** L1505 (đọc trước).
- **Phác thảo:** danh sách 1–7: Mở đầu; Mô hình thống kê và hàm hợp lý; Ước lượng xác suất từ số đếm; Gaussian một chiều và độ chệch; Ước lượng Gaussian nhiều chiều; Khoảng cách Mahalanobis và hình học Gaussian; Tổng kết và chuyển tiếp. ≈42 âm tiết, 7 dòng. **Ngoại lệ trần sáu dòng (Q-K):** trang "Nội dung" phải liệt kê mọi mạch (AGENTS.md), tiền lệ Bài 07, Bài 10.
- **Ghi chú diễn giả:** đọc trước Murphy (2022), §2.4–2.6 (Bernoulli, phân loại, Gaussian một chiều) và §3.2.1–3.2.2 (Gaussian nhiều chiều, khoảng cách Mahalanobis) (L1505); mạch 2 dựng nguyên lý chung, mạch 3–5 giải bài toán tối ưu cho từng họ, mạch 6 đọc kết quả thành hình học.

#### MD03 — Hai sản phẩm mới của dây chuyền
- **Lý do tồn tại:** đặt bài toán trung tâm bằng số trước mọi công cụ (Câu hỏi mở đầu L12–31).
- **Nhu cầu/khoảng trống:** câu trả lời theo khoảng cách Euclid ($a$ xa hơn) bỏ qua mức phân tán theo từng hướng; cần ước lượng trung bình và ma trận hiệp phương sai từ dữ liệu nền.
- **Đầu vào → đầu ra:** không → dữ liệu và câu hỏi, được trả lời ở HH06, HH09.
- **Vị trí:** bài toán trung tâm của sườn; nêu câu hỏi trung tâm của mạch 1. **Mục tiêu:** 4, 5.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #21: $\bar x$ được gọi tên "trung bình bốn vector" trước khi dùng.
- **Nguồn:** L12–31. Murphy §3.2.2, PDF 113 (Mahalanobis, chỉ trong ghi chú diễn giả).
- **Phác thảo:** (1) Bốn sản phẩm vận hành bình thường cho các vector số đo (9) (2) display `aligned` hai dòng: $x_1=(12,22)^\top,\ x_2=(8,18)^\top,$ / $x_3=(11,19)^\top,\ x_4=(9,21)^\top.$ (3) Hai sản phẩm mới: $a=(13,23)^\top$, $b=(12,18)^\top$. (4) (4) **Câu hỏi:** Sản phẩm nào lệch khỏi chế độ vận hành bình thường nhiều hơn? (13) (5) fragment: Trung bình bốn vector $\bar x=(10,20)^\top$; $\lVert a-\bar x\rVert^2=18$, $\lVert b-\bar x\rVert^2=8$. (1) (6) fragment: Khoảng cách Euclid xếp $a$ xa hơn. (7) ≈37 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** hai số đo đã đưa về cùng một đơn vị quy ước (L14). Khoảng cách Euclid coi mọi hướng có cùng mức phân tán. Các độ lệch nền $(2,2)^\top$, $(-2,-2)^\top$, $(1,-1)^\top$, $(-1,1)^\top$ cho thấy dữ liệu nền dao động mạnh theo hướng $(1,1)^\top$ và yếu theo hướng $(1,-1)^\top$; $a-\bar x=(3,3)^\top$ nằm trọn theo hướng thứ nhất, $b-\bar x=(2,-2)^\top$ theo hướng thứ hai (L31). Để so sánh theo mức phân tán của từng hướng, cần ước lượng từ dữ liệu nền cả trung bình lẫn ma trận hiệp phương sai. Không nêu đáp số.

#### MD04 — Ngữ cảnh
- **Lý do tồn tại:** cố định dữ liệu, mô hình, nhiệm vụ và đầu ra của khung chung (≤4 dòng).
- **Nhu cầu/khoảng trống:** mọi mạch sau dùng cùng khung $D$, $P_\theta$, $\hat\theta(D)$.
- **Đầu vào → đầu ra:** MD03 → khung chung; thuật ngữ i.i.d. và phát hiện bất thường.
- **Vị trí:** đối tượng, giả thiết và đầu ra của sườn. **Mục tiêu:** 1.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Nguồn:** L71–78; L117–126; L134. Murphy §4.2.1 (4.3), PDF 138.
- **Phác thảo:** (1) **Đầu vào:** dữ liệu $D=(x_1,\ldots,x_n)$ của mẫu độc lập cùng phân phối (independent and identically distributed, i.i.d.) theo $P_\theta$. (18) (2) **Giả thiết:** $P_\theta$ thuộc họ Bernoulli, phân loại hoặc Gaussian chọn trước; $\theta$ chưa biết. (14) (3) **Đầu ra:** $\hat\theta(D)$ cực đại hợp lý, điều kiện tồn tại, điểm lệch của quan sát mới. (15) (4) Điểm lệch dùng trong phát hiện bất thường (anomaly detection). (9) ≈56 âm tiết, 4 dòng.
- **Ghi chú diễn giả:** dây chuyền ghi cho mỗi sản phẩm một cờ cảnh báo, một trong ba chế độ tải và các số đo liên tục (L71); tham số cố định nhưng chưa biết, các $X_i$ và bộ ước lượng là ngẫu nhiên, các $x_i$ và giá trị ước lượng là số (L82–87); tiêu chuẩn thứ hai là tính không chệch, đo hành vi qua các lần lấy mẫu lặp lại (L78); bảng ký hiệu đầy đủ ở ghi chú bài giảng, mục 2.

### Mạch 2 · Mô hình thống kê và hàm hợp lý

#### HL00 — 2. Mô hình thống kê và hàm hợp lý (trang tiêu đề mạch, `id="mach-2"`)
- **Lý do tồn tại:** mở mạch 2 và nêu câu hỏi trung tâm.
- **Nhu cầu/khoảng trống:** "phù hợp với dữ liệu" chưa có nghĩa toán học.
- **Đầu vào → đầu ra:** MD03–MD04 → nhiệm vụ: đổi ước lượng thành bài toán tối ưu.
- **Vị trí:** điểm vào mạch 2; đảm nhận bước nhu cầu của cụm mô hình thống kê; phần việc: đặt câu hỏi trung tâm của mạch 2. **Mục tiêu:** 1, 6.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #22: thêm trường "Nguồn" và phần việc.
- **Sửa (rà soát):** D1/#2: ghi chú diễn giả gọi đầu ra bằng công thức $\hat R_n$ thay cho số (4.3).
- **Nguồn:** L136–140; L287. Murphy §4.1–4.2.1, PDF 137–138.
- **Phác thảo:** (1) Muốn chọn tham số phù hợp với dữ liệu, cần viết xác suất của dữ liệu thành hàm của tham số rồi tối ưu. (24) (2) Mô hình thống kê · Mẫu i.i.d. · Hàm hợp lý · Rủi ro thực nghiệm (13) Số đo sau rà lại vòng 1: 37 âm tiết, 2 dòng, 0 công thức hiển thị, dòng dài nhất 24.
- **Ghi chú diễn giả (≈70 âm tiết):** mạch kế thừa các họ phân phối của Bài 10 và khung $D$, $P_\theta$ của trang ngữ cảnh. Nhiệm vụ: nêu rõ dữ liệu được sinh ra thế nào, viết xác suất của cả bộ dữ liệu thành hàm của tham số, rồi đổi bài toán cực đại thành cực tiểu một trung bình mất mát. Mạch giao cho các mạch sau mục tiêu tối ưu (4.3).

#### HL01 — Tham số chưa biết của dây chuyền
- **Lý do tồn tại:** nhu cầu và trực quan của cụm mô hình thống kê; nêu câu hỏi trung tâm của mạch trên trang nội dung đầu tiên.
- **Nhu cầu/khoảng trống:** tham số của dây chuyền chưa biết; cần một tiêu chuẩn chọn tham số từ dữ liệu.
- **Đầu vào → đầu ra:** HL00 → ba họ phân phối với tham số chưa biết; ý "chọn tham số làm dữ liệu có khả năng xảy ra cao nhất".
- **Vị trí:** đối tượng của sườn; phần việc: "mô hình". **Mục tiêu:** 1.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #2: "Nhu cầu:" nêu đủ câu hỏi trung tâm (bài toán tối ưu trên $\Theta$).
- **Sửa (rà soát):** #27: "Nhu cầu:" viết "bài toán tối ưu theo $\theta$" ($\Theta$ chưa định nghĩa). #46: bỏ câu so ký hiệu với deck Bài 10 khỏi ghi chú diễn giả.
- **Nguồn:** L3–8; L49; L138–140 (không chép câu rào đón L140, Q-J). Murphy §4.1 (4.1), PDF 137. **Mẫu (chỉ planning):** MAT1101 b10.1 S7.
- **Phác thảo:** (1) Nhu cầu: xác định tham số của mô hình dây chuyền bằng một bài toán tối ưu theo $\theta$. (18) (2) Nhắc lại: $\operatorname{Bernoulli}(p)$: $\mathbb P(X=1)=p$; $\operatorname{Cat}(\boldsymbol\pi)$: $\mathbb P(X=k)=\pi_k$; $\mathcal N(\mu,\sigma^2)$, $\mathcal N(\mu,\Sigma)$. (2) (3) Trực quan. Mỗi giá trị tham số cho một phân phối trên các bộ dữ liệu có thể. (18) (4) Chọn giá trị làm dữ liệu đã thấy có khả năng xảy ra cao nhất. (15) Số đo sau rà soát: 53 âm tiết, 4 dòng, 0 công thức hiển thị, dòng dài nhất 18.
- **Ghi chú diễn giả:** Các tham số $p$, $\boldsymbol\pi$, $\mu$, $\sigma^2$, $\Sigma$ cố định nhưng chưa biết, và dữ liệu là căn cứ duy nhất để xác định chúng. Bài 10 cập nhật xác suất sản phẩm lỗi khi tỉ lệ lỗi và độ nhạy của cảm biến đã cho trước (Định lý 10.11). Các tham số $\mu_y,\sigma_y^2$ của mô hình $T\mid Y=y\sim\mathcal N(\mu_y,\sigma_y^2)$ cho số đo liên tục cũng chưa biết. Trong bài này, $\theta$ là ký hiệu chung cho tham số của mô hình, nên tham số Bernoulli được viết là $p$. Vector xác suất phân loại viết đậm $\boldsymbol\pi$ để phân biệt với hằng số $\pi$ trong mật độ Gaussian. Để câu trực quan thành một tiêu chuẩn tính được, cần nói rõ xác suất của cả bộ dữ liệu được tính từ phân phối của từng quan sát thế nào. Ví dụ sau cho thấy điều đó phụ thuộc cơ chế lấy mẫu.

#### HL02 — Ví dụ: sáu cờ cảnh báo dưới hai cơ chế lấy mẫu
- **Lý do tồn tại:** ví dụ của cụm mô hình thống kê: cùng phân phối biên, hai phân phối đồng thời.
- **Nhu cầu/khoảng trống:** "cùng phân phối" chưa đủ để viết xác suất của dữ liệu thành tích.
- **Đầu vào → đầu ra:** HL01 → $p^3(1-p)^3$ (lấy độc lập) và $0$ (một cờ chép sáu lần).
- **Vị trí:** ví dụ xuyên suốt một chiều (sáu cờ); phần việc: "cơ chế lấy mẫu". **Mục tiêu:** 1.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** #26: cơ chế chép viết bằng công thức $X_1=\cdots=X_6=Z$.
- **Nguồn:** Ví dụ 11.1 L166–188. Murphy §4.2.1 (4.3), PDF 138.
- **Phác thảo:** (1) Sáu cờ $D=(1,0,1,1,0,0)$; mỗi $X_i\sim\operatorname{Bernoulli}(p)$. (3) (2) Tính xác suất của $D$ dưới hai cơ chế. (8) (3) Sáu sản phẩm lấy độc lập: $p\,(1-p)\,p\,p\,(1-p)\,(1-p)=p^3(1-p)^3$. (6) (4) Một cờ $Z$ chép sáu lần, $X_1=\cdots=X_6=Z$: mọi chuỗi có cả $0$ lẫn $1$ có xác suất $0$. (13) (5) Hai cơ chế cùng phân phối biên $\mathbb P(X_i=1)=p$. (7) (6) Diễn giải: xác suất của dữ liệu do phân phối đồng thời quyết định, phụ thuộc cơ chế lấy mẫu. (20) Số đo sau rà soát: 57 âm tiết, 6 dòng, 0 công thức hiển thị, dòng dài nhất 20.
- **Ghi chú diễn giả:** Cơ chế thứ hai: thiết bị đọc một cờ $Z\sim\operatorname{Bernoulli}(p)$ rồi ghi $X_1=\cdots=X_6=Z$. Chuỗi $D$ có cả số $0$ lẫn số $1$ nên không thể xảy ra. Trung bình mẫu $\bar x=1/2$ như nhau dưới hai cơ chế, nên nó không cho biết giả thiết nào đúng; giả thiết độc lập phải dựa vào quy trình thu thập dữ liệu. Trước khi lấy mẫu, $\bar X$ là biến ngẫu nhiên; sau khi quan sát, $\bar x$ là một số.

#### HL03 — Mô hình thống kê, mẫu và bộ ước lượng
- **Lý do tồn tại:** bước hình thức của cụm (Định nghĩa 11.1).
- **Nhu cầu/khoảng trống:** HL02 cần tên cho họ phân phối, mẫu, hàm của mẫu.
- **Đầu vào → đầu ra:** HL02 → mô hình, mẫu i.i.d., thống kê, bộ ước lượng, giá trị ước lượng.
- **Vị trí:** đối tượng và giả thiết lấy mẫu của sườn. **Mục tiêu:** 1.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Nguồn:** Định nghĩa 11.1 L144–164. Murphy §4.1 (4.1), PDF 137; §4.2.1 (4.3), PDF 138; §4.7.6, PDF 189 (Murphy gọi $\hat\theta(D)$ là "estimand"; deck theo ghi chú).
- **Phác thảo:** (1) **Định nghĩa.** *Mô hình thống kê tham số* (parametric statistical model) là họ $\{P_\theta:\theta\in\Theta\}$, $P_\theta$ có hàm khối hoặc mật độ $p_\theta$. (19) (2) *Mẫu i.i.d.* cỡ $n$ là $X_1,\ldots,X_n$ độc lập, cùng phân phối $P_\theta$; *dữ liệu* $D=(x_1,\ldots,x_n)$ là giá trị quan sát. (16) (3) *Thống kê* (statistic) là hàm $T(X_1,\ldots,X_n)$ không chứa $\theta$. (7) (4) Dùng $T$ ước lượng $\theta$ thì gọi $T$ là *bộ ước lượng* (estimator), $T(x_1,\ldots,x_n)$ là *giá trị ước lượng* (estimate). (16) ≈58 âm tiết, 4 dòng. Nếu số đo thật vượt 60, `sửa`: chuyển "*dữ liệu* … là giá trị quan sát" vào ghi chú diễn giả.
- **Ghi chú diễn giả:** không gian quan sát $\mathcal X$ là tập hữu hạn hoặc $\mathbb R^d$ (L147). Khi mỗi $X_i$ có hàm khối hoặc mật độ $p_\theta$, tính độc lập tương đương với việc hàm khối hoặc mật độ đồng thời bằng $\prod_ip_\theta(x_i)$ (L164); đây là chỗ HL05 dùng. Tham số cố định nhưng chưa biết; $X_i$ và $T(X_1,\ldots,X_n)$ ngẫu nhiên; $x_i$ và $T(x_1,\ldots,x_n)$ là số. Phân phối của $T$ qua các lần lấy mẫu lặp lại gọi là phân phối mẫu (sampling distribution) (L162; Murphy §4.7.1). Nếu $g$ đo được thì $g(X_1),\ldots,g(X_n)$ độc lập (L164). Nguồn: ghi chú bài giảng, Định nghĩa 11.1; Murphy (2022), §4.1, §4.2.1.

#### HL04 — Ví dụ: so sánh hai giá trị tham số trên sáu cờ
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập và trực quan của hàm hợp lý.
- **Nhu cầu/khoảng trống:** cần so hai giá trị của $p$ khi dữ liệu đã cố định.
- **Đầu vào → đầu ra:** HL02 ($p^3(1-p)^3$) → hai số $1/64$ và $0{,}009261$, tỉ số $1{,}69$; cách đọc "hàm của $p$".
- **Vị trí:** ví dụ xuyên suốt một chiều; phần việc: "hàm hợp lý". **Mục tiêu:** 1.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #20: thay "theo tiêu chuẩn này" bằng tiêu chuẩn cụ thể.
- **Sửa (rà soát):** #19: "Trực quan." chuyển lên ngay sau "Nhu cầu:".
- **Nguồn:** L190–217. Murphy §4.2.1 (4.2), PDF 137.
- **Phác thảo:** (1) Nhu cầu: so sánh hai giá trị của $p$ khi dữ liệu đã cố định. (14) (2) Trực quan. Giữ $D$ cố định, xem xác suất của $D$ là hàm của $p$. (12) (3) Sáu cờ $D=(1,0,1,1,0,0)$ lấy độc lập; xác suất của $D$ là $p^3(1-p)^3$. (9) (4) display $$\begin{aligned}p=1/2:&\quad(1/2)^6=1/64\approx0{,}0156,\\ p=0{,}3:&\quad0{,}3^3\cdot0{,}7^3=0{,}009261\approx0{,}0093.\end{aligned}$$ (5) Tỉ số: $0{,}015625/0{,}009261\approx1{,}69$. (2) (6) Diễn giải: theo xác suất của $D$, $p=1/2$ phù hợp với $D$ hơn $p=0{,}3$. (10) Số đo sau rà soát: 47 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 14.
- **Ghi chú diễn giả:** Chuỗi ba cờ trong sáu sản phẩm có khả năng xảy ra dưới $p=1/2$ cao gấp khoảng $1{,}69$ lần so với dưới $p=0{,}3$. Hàm $p^3(1-p)^3$ không đổi khi thay $p$ bằng $1-p$, nên $p=0{,}7$ cũng cho $0{,}009261$. Hàm $p\mapsto p^3(1-p)^3$ là hàm hợp lý của sáu cờ; định nghĩa của hàm hợp lý viết nó cho một mô hình bất kỳ.

#### HL05 — Hàm hợp lý và ước lượng hợp lý cực đại
- **Lý do tồn tại:** bước hình thức của hàm hợp lý (Định nghĩa 11.2).
- **Nhu cầu/khoảng trống:** HL04 cần tên và dạng tổng quát cho mọi mô hình i.i.d.
- **Đầu vào → đầu ra:** HL03, HL04 → $L$, $\ell$ (4.1), tập argmax (4.2).
- **Vị trí:** định nghĩa trung tâm của sườn. **Mục tiêu:** 1.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** #40: tiên nghiệm trong ghi chú diễn giả viết $q(\theta)$, hậu nghiệm $q(\theta\mid D)$.
- **Nguồn:** Định nghĩa 11.2 L219–242. Murphy §4.2.1 (4.2)–(4.4), PDF 137–138 (Murphy coi argmax duy nhất; ghi chú xét tập). **Mẫu (chỉ planning):** MAT1101 b10.1 S7–S8.
- **Phác thảo:** (1) Định nghĩa. Với dữ liệu $D$ của mẫu i.i.d., hàm hợp lý (likelihood) và log-hợp lý (log-likelihood) là (17) (2) display $$\begin{aligned}L(\theta;D)&=\prod_{i=1}^np_\theta(x_i),\\ \ell(\theta;D)&=\sum_{i=1}^n\log p_\theta(x_i),\qquad\theta\in\Theta,\end{aligned}$$ (3) với quy ước $\log0=-\infty$. Một ước lượng hợp lý cực đại là một phần tử của tập $\operatorname{argmax}_{\theta\in\Theta}L(\theta;D)$. (16) (4) Tập này có thể rỗng hoặc nhiều phần tử. (9) (5) Ý nghĩa: $L(\theta;D)$ là xác suất hoặc mật độ của $D$ dưới tham số $\theta$, với $D$ cố định. (15) Số đo sau rà soát: 57 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 17.
- **Ghi chú diễn giả:** Cùng biểu thức $\prod_ip_\theta(x_i)$: khi $\theta$ cố định và dữ liệu thay đổi, đó là hàm khối hoặc mật độ đồng thời của mẫu; khi $D$ cố định và $\theta$ thay đổi, đó là hàm hợp lý. Dạng tích dùng giả thiết độc lập; với cờ chép sáu lần ở ví dụ trước, dạng tích sai. Với dữ liệu liên tục, $L$ là tích các giá trị mật độ. Ký hiệu $\hat\theta_{\mathrm{MLE}}$ chỉ dùng khi tập argmax có đúng một phần tử. Hàm hợp lý so sánh xác suất của dữ liệu dưới từng giá trị tham số. Phát biểu về xác suất của chính tham số cần thêm một mật độ tiên nghiệm $q(\theta)$, cho hậu nghiệm $q(\theta\mid D)\propto L(\theta;D)\,q(\theta)$; với tiên nghiệm đều, điểm lớn nhất của hậu nghiệm trùng ước lượng hợp lý cực đại.

#### HL06 — Hợp lý cực đại và rủi ro thực nghiệm
- **Lý do tồn tại:** kết quả trung tâm của mạch (Mệnh đề 11.3), nối ước lượng với tối ưu hàm mất mát của Bài 05.
- **Nhu cầu/khoảng trống:** tích của nhiều số nhỏ khó tối ưu; học máy cực tiểu trung bình mất mát.
- **Đầu vào → đầu ra:** HL05 → ba tập nghiệm bằng nhau (4.3); mất mát âm log-hợp lý.
- **Vị trí:** chuỗi định nghĩa → kết quả của sườn; phần việc: "log → rủi ro thực nghiệm". **Mục tiêu:** 1, 6.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #1 (nghiêm trọng): thêm "Nhu cầu:" và "Trực quan." trước phát biểu; "Ý nghĩa:" thay bằng dòng đặt tên rủi ro thực nghiệm và NLL. Bản đồ hành trình: trực quan ở HL06.
- **Sửa (rà soát):** #37: ghi chú diễn giả bỏ câu "trở nên khó tính" không có nguồn.
- **Nguồn:** Mệnh đề 11.3 L252–271; L283–285. Murphy §4.2.1 (4.4)–(4.7), PDF 138; §4.3 (4.60), PDF 145 (NLL của Murphy (4.6) là tổng; ghi chú chia $n$). **Mẫu (chỉ planning):** MAT1101 b10.1 S9.
- **Phác thảo:** (1) Nhu cầu: đổi tích hợp lý thành trung bình mất mát cần cực tiểu. (14) (2) Trực quan. $\log$ biến tích thành tổng và giữ thứ tự; đổi dấu biến cực đại thành cực tiểu. (18) (3) Mệnh đề. Với mẫu i.i.d. $D$, $n\ge1$, ba tập nghiệm bằng nhau: (10) (4) display $$\begin{aligned}&\underset{\theta\in\Theta}{\operatorname{argmax}}\,L(\theta;D)=\underset{\theta\in\Theta}{\operatorname{argmax}}\,\ell(\theta;D)=\underset{\theta\in\Theta}{\operatorname{argmin}}\,\hat R_n(\theta),\\ &\hat R_n(\theta)=-\frac1n\sum_{i=1}^n\log p_\theta(x_i).\end{aligned}$$ (5) $\hat R_n$ là rủi ro thực nghiệm (empirical risk) với mất mát âm log-hợp lý (negative log-likelihood, NLL) $-\log p_\theta(x)$. (16) Số đo sau rà soát: 58 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 18.
- **Ghi chú diễn giả:** Với nhiều quan sát, log đổi tích thành tổng, và học máy làm việc với trung bình của các mất mát. Mệnh đề nói hai phép đổi, lấy log rồi nhân với $-1/n$, không đổi tập nghiệm. $\hat R_n$ là rủi ro thực nghiệm của Định nghĩa 05c.51 với mất mát $-\log p_\theta(x)$ cho mỗi quan sát. Với mật độ, mất mát này âm khi $p_\theta(x)>1$, nhưng phép tương đương không dùng dấu của mất mát. Mỗi giả thiết phân phối cho một mất mát riêng, nên đổi giả thiết thì đổi mất mát. Mệnh đề chỉ nói về dữ liệu đã thấy; nó không cho biết tham số tìm được dự đoán tốt đến đâu trên quan sát mới.

#### HL07 — Chứng minh: hợp lý cực đại và rủi ro thực nghiệm
- **Lý do tồn tại:** P1 (Q-C).
- **Nhu cầu/khoảng trống:** người học cần thấy phép đổi giữ đúng tập nghiệm, kể cả khi hợp lý bằng $0$.
- **Đầu vào → đầu ra:** HL06 → (4.3) đã chứng minh.
- **Vị trí:** kết quả của sườn. **Mục tiêu:** 1, 6.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** D1: dòng cuối viết dạng tích $L=\prod_ip_\theta(x_i)$ thay cho "(4.1)". #48: ghi chú diễn giả bỏ câu kết lặp.
- **Nguồn:** L273–281. Murphy §4.2.1, PDF 138 (không có chứng minh). **Mẫu (chỉ planning):** MAT1101 b10.1 S9.
- **Phác thảo:** (1) Log giữ thứ tự các giá trị hợp lý; nhân với số âm đảo thứ tự. (16) (2) $L$ và $\ell$ cùng điểm cực đại. $\log$ tăng chặt trên $(0,\infty)$; $\log0=-\infty$ nhỏ hơn mọi số thực: (13) (3) display $$L(\theta;D)\ge L(\theta';D)\iff\ell(\theta;D)\ge\ell(\theta';D),$$ (4) vì $\log L(\theta;D)=\ell(\theta;D)$. (1) (5) $\ell$ và $\hat R_n$ đảo thứ tự. $\hat R_n(\theta)=-\ell(\theta;D)/n$; nhân với $-1/n<0$ đảo chiều mọi bất đẳng thức. (12) (6) Giả thiết i.i.d. cho dạng tích $L=\prod_ip_\theta(x_i)$, nên $\ell$ là tổng theo từng quan sát. (13) Số đo sau rà soát: 55 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 16.
- **Ghi chú diễn giả:** Log của một tích bằng tổng các log. Nếu một thừa số bằng $0$ thì cả $\log L$ và $\ell$ bằng $-\infty$, nên đẳng thức $\log L=\ell$ vẫn đúng với quy ước $\log0=-\infty$.

#### HL08 — Bài tập: bài toán tối ưu của ước lượng hợp lý cực đại
- **Lý do tồn tại:** bài có lời giải trên mặt trang của mạch 2 (Q-B); đo đúng câu hỏi trung tâm của mạch.
- **Nhu cầu/khoảng trống:** người học phải tự viết mục tiêu và chỉ chỗ dùng giả thiết độc lập.
- **Đầu vào → đầu ra:** HL05–HL07 → mục tiêu $\hat R_n$; vai trò của độc lập.
- **Vị trí:** kiểm tra cuối mạch 2. **Mục tiêu:** 1, 6.
- **Quyết định:** `thêm`. **Bài tập:** có lời giải trên mặt trang (fragment); câu 1 của câu hỏi cuối buổi.
- **Sửa (rà soát):** D2: lời giải (a) gọi tên "rủi ro thực nghiệm" thay cho "Mệnh đề 11.3"; (b) viết $L=\prod_ip_\theta(x_i)$. #47: ghi chú diễn giả bỏ câu chỉ đường.
- **Nguồn:** L1485–1487; L1492.
- **Phác thảo:** (1) Câu hỏi: Cho dữ liệu $D$ của mẫu i.i.d. dưới mô hình $\{p_\theta:\theta\in\Theta\}$. (11) (2) (a) Viết ước lượng hợp lý cực đại thành bài toán cực tiểu trung bình mất mát. (17) (3) (b) Chỉ ra bước cần giả thiết độc lập. (9) (4) Lời giải: (a) cực tiểu rủi ro thực nghiệm $\hat R_n(\theta)=-\frac1n\sum_i\log p_\theta(x_i)$ trên $\Theta$. (10) (5) (b) Bước viết $L=\prod_ip_\theta(x_i)$; với cờ chép sáu lần, dạng tích sai. (11) Số đo sau rà soát: 57 âm tiết, 5 dòng, 0 công thức hiển thị, dòng dài nhất 17.
- **Ghi chú diễn giả:** Khi các quan sát là bản chép của nhau, xác suất của dữ liệu không còn là tích, và mục tiêu không còn là tổng trên từng quan sát.

### Mạch 3 · Ước lượng xác suất từ số đếm (thứ tự: TS00, TS01, TS03–TS17)

#### TS00 — 3. Ước lượng xác suất từ số đếm (trang tiêu đề mạch, `id="mach-3"`)
- **Lý do tồn tại:** mở mạch 3 và nêu câu hỏi trung tâm cùng phân rã (đoạn đóng → đơn hình).
- **Nhu cầu/khoảng trống:** (4.3) chưa cho công thức nghiệm và chưa cho biết nghiệm có tồn tại.
- **Đầu vào → đầu ra:** HL06–HL08 → nhiệm vụ: giải (4.2) cho Bernoulli và phân loại.
- **Vị trí:** điểm vào mạch 3; đảm nhận bước nhu cầu của cụm Bernoulli; phần việc: đặt câu hỏi trung tâm của mạch 3 và phân rã hai bài toán. **Mục tiêu:** 2, 3.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #3: dòng dẫn không dùng "đơn hình" trước định nghĩa; số viết bằng chữ vì trang tiêu đề mạch không có công thức. #22: thêm "Nguồn" và phần việc.
- **Sửa (rà soát):** #23: dòng dẫn thêm "ràng buộc" (25 âm tiết). D1, #50: ghi chú diễn giả thay "(4.3)" bằng tên bài toán và thêm giới hạn tạo nhu cầu (nghiệm có thể nằm trên biên).
- **Sửa (rà lại vòng 1):** R9: ghi chú diễn giả bỏ vế lặp, còn "Nguyên lý đó không tự cho công thức nghiệm." R13: bảng (a) chép dòng dẫn mới.
- **Nguồn:** L287–293; L419. Murphy §4.2.3–4.2.4, PDF 140–141.
- **Phác thảo:** (1) Muốn ước lượng xác suất từ số đếm, cần cực đại hợp lý với ràng buộc tổng bằng một, kể cả số đếm bằng không. (25) (2) Bernoulli · Nghiệm biên · Đơn hình xác suất · Nhân tử Lagrange · Entropy chéo (12) Số đo sau rà lại vòng 1: 37 âm tiết, 2 dòng, 0 công thức hiển thị, dòng dài nhất 25.
- **Ghi chú diễn giả (≈80 âm tiết):** mạch kế thừa mục tiêu (4.3). Bài toán đầu tiên có một tham số trên đoạn đóng $[0,1]$, nơi cực đại có thể nằm ở đầu mút; bài toán thứ hai có ba xác suất chịu ràng buộc tổng bằng $1$, giải bằng nhân tử Lagrange. Mạch giao cho mạch sau hai công thức tần suất, entropy chéo nhị phân và công cụ $\log t\le t-1$ dùng lại cho Gaussian nhiều chiều (L287, L419).

#### TS01 — Mười cờ cảnh báo
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập, trực quan và hàm hợp lý (5.1) của cụm Bernoulli.
- **Nhu cầu/khoảng trống:** tỉ lệ $7/10$ là ứng viên tự nhiên nhưng cần chứng minh; mẫu toàn $0$ không có điểm dừng trong $(0,1)$.
- **Đầu vào → đầu ra:** HL05 → (5.1), $s$ là thống kê đủ.
- **Vị trí:** ví dụ xuyên suốt một chiều (mười cờ); phần việc: "một tham số trên đoạn đóng". **Mục tiêu:** 2.
- **Quyết định:** `thêm`; gộp trang hàm hợp lý Bernoulli (mã TS02 của kế hoạch) vào đây. **Bài tập:** không.
- **Sửa (cổng):** #19: bỏ "Nhắc lại:" Bernoulli (đã có ở HL01); "thống kê đủ" chuyển vào ghi chú diễn giả.
- **Sửa (rà soát):** #8: "Nhu cầu:" nêu phân rã hai nhóm → nhiều nhóm; dữ liệu mười cờ thành dòng riêng. #34: "toàn $0$ hoặc toàn $1$". D1: bỏ `\tag{5.1}`.
- **Nguồn:** L291–308 (không chép câu rào đón L293, Q-J). Murphy §4.2.3 (4.20)–(4.22), PDF 140. **Mẫu (chỉ planning):** MAT1101 b10.1 S12.
- **Phác thảo:** (1) Nhu cầu: ước lượng xác suất từ số đếm, với hai nhóm rồi với nhiều nhóm. (16) (2) Mười cờ $(1,0,1,1,0,1,1,0,1,1)$ có $s=7$; chứng minh $7/10$ cực đại hợp lý. (9) (3) Mẫu toàn $0$ hoặc toàn $1$ xét riêng: hàm hợp lý không có điểm dừng trong $(0,1)$. (14) (4) Trực quan. Tăng $p$ lợi cho các số $1$, hại cho các số $0$; nghiệm cân bằng hai tác động. (17) (5) display $$\begin{aligned}L(p;D)&=p^s(1-p)^{n-s},\\ \ell(p;D)&=s\log p+(n-s)\log(1-p),\end{aligned}\qquad s=\sum_{i=1}^nx_i,\ p\in[0,1].$$ Số đo sau rà soát: 56 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 17.
- **Ghi chú diễn giả:** Mỗi cờ có $\mathbb P(X=x)=p^x(1-p)^{1-x}$, $x\in\{0,1\}$, với quy ước $0^0=1$; nhân theo dạng tích của hàm hợp lý được hai công thức trên trang. Số hạng có hệ số $0$ được hiểu bằng $0$. Hàm hợp lý chỉ phụ thuộc dữ liệu qua $s$; một đại lượng như vậy gọi là thống kê đủ (sufficient statistic). $L$ là xác suất của chuỗi có thứ tự. Nếu chỉ quan sát tổng $s$, xác suất có thêm hệ số $\binom ns$ không phụ thuộc $p$, nên tập nghiệm không đổi. Khi chỉ một trong hai giá trị xuất hiện, chỉ một tác động có mặt, nên mẫu toàn $0$ hoặc toàn $1$ cần xét riêng.

#### TS03 — Ước lượng Bernoulli
- **Lý do tồn tại:** phát biểu Định lý 11.4, kể cả nghiệm biên.
- **Nhu cầu/khoảng trống:** TS01 cần nghiệm trên toàn đoạn $[0,1]$.
- **Đầu vào → đầu ra:** TS01 → (5.2) với ba trường hợp của $s$.
- **Vị trí:** kết quả của sườn (họ thứ nhất). **Mục tiêu:** 2.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** D1: "hàm hợp lý Bernoulli" thay cho "(5.1)"; bỏ `\tag{5.2}`.
- **Sửa (rà lại vòng 1):** R12: "Kết luận:" viết hàm hợp lý $L(p;D)=p^s(1-p)^{n-s}$ thay cho tên "hàm hợp lý Bernoulli" chưa được đặt.
- **Nguồn:** L310–326. Murphy §4.2.3 (4.23)–(4.25), PDF 140 (chỉ giải đạo hàm bằng $0$).
- **Phác thảo:** (1) Định lý. Giả thiết: $x_1,\ldots,x_n\in\{0,1\}$, $n\ge1$, mẫu i.i.d. Bernoulli$(p)$, $s=\sum_ix_i$; miền $p\in[0,1]$. (8) (2) Kết luận: hàm hợp lý $L(p;D)=p^s(1-p)^{n-s}$ có đúng một điểm cực đại trên $[0,1]$: (12) (3) display $$\hat p_{\mathrm{MLE}}=\frac sn=\bar x.$$ (4) Nghiệm thuộc $(0,1)$ khi $0<s<n$, bằng $0$ khi $s=0$, bằng $1$ khi $s=n$. (7) (5) Ý nghĩa: tần suất mẫu là nghiệm cả khi $s=0$ hoặc $s=n$, nhờ miền đóng. (13) Số đo sau rà lại vòng 1: 40 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 13.
- **Ghi chú diễn giả:** Định lý dùng hai giả thiết. Giả thiết i.i.d. cho dạng tích $L(p;D)=p^s(1-p)^{n-s}$. Miền đóng $[0,1]$ bảo đảm nghiệm tồn tại khi $s\in\{0,n\}$. Murphy chỉ giải phương trình đạo hàm bằng $0$, không xét đầu mút. Chứng minh ở đây xét ba trường hợp theo $s$.

#### TS04 — Chứng minh: ước lượng Bernoulli, nghiệm trong
- **Lý do tồn tại:** P2, trường hợp $0<s<n$ (Q-C).
- **Nhu cầu/khoảng trống:** điểm dừng chỉ là ứng viên; cần dấu của đạo hàm và so với đầu mút.
- **Đầu vào → đầu ra:** TS03 → $s/n$ là cực đại duy nhất khi $0<s<n$.
- **Vị trí:** kết quả của sườn; phương pháp "dấu đạo hàm + đầu mút". **Mục tiêu:** 2.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Nguồn:** L328–344.
- **Phác thảo:** (1) Trường hợp $0<s<n$: xét dấu $\ell'$ trên $(0,1)$, rồi so với hai đầu mút. (13) (2) **$\ell$ tăng rồi giảm.** Trên $(0,1)$: (3) (3) display `aligned`: $\ell'(p)=\frac sp-\frac{n-s}{1-p}=\frac{s(1-p)-(n-s)p}{p(1-p)}=\frac{s-np}{p(1-p)}$. (4) Do $p(1-p)>0$: $\ell'>0$ khi $p<s/n$, $\ell'<0$ khi $p>s/n$; $s/n$ là cực đại duy nhất trên $(0,1)$. (13) (5) **Hai đầu mút có hợp lý $0$.** $s\ge1$ cho $L(0;D)=0$; $n-s\ge1$ cho $L(1;D)=0$; cả hai nhỏ hơn $L(s/n;D)$. (17) ≈46 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $\ell$ tăng chặt trên $(0,s/n]$ và giảm chặt trên $[s/n,1)$ (L342). Bước đầu mút dùng giả thiết $0<s<n$: cả hai thừa số $p^s$ và $(1-p)^{n-s}$ đều có số mũ dương. Nguồn: ghi chú bài giảng, chứng minh Định lý 11.4, Bước 1–2.

#### TS05 — Chứng minh: ước lượng Bernoulli, nghiệm biên
- **Lý do tồn tại:** P2, trường hợp $s\in\{0,n\}$; chỗ miền đóng được dùng.
- **Nhu cầu/khoảng trống:** khi $s=0$ hoặc $s=n$, phương trình $\ell'=0$ vô nghiệm trong $(0,1)$.
- **Đầu vào → đầu ra:** TS04 → (5.2) đúng trong cả ba trường hợp; điều kiện tồn tại theo miền.
- **Vị trí:** giới hạn áp dụng của sườn (miền tham số). **Mục tiêu:** 2.
- **Quyết định:** `thêm`; dòng "Lưu ý:" đọc lại giả thiết miền đóng ngay chỗ nó được dùng (ghi lý do tại đây vì AGENTS.md không đặt nhận xét phạm vi cùng trang chứng minh: dòng này chỉ nêu điều xảy ra khi bỏ giả thiết vừa dùng, phần nhận xét đầy đủ ở ghi chú diễn giả). **Bài tập:** không.
- **Sửa (rà soát):** #39: "quá khớp (overfitting)" trong ghi chú diễn giả.
- **Nguồn:** L346–353; Nhận xét 11.5 L396–400. Murphy §4.5, PDF 150; §4.5.1 (4.96), PDF 152 (miền mở không có trong Murphy).
- **Phác thảo:** (1) Trường hợp $s\in\{0,n\}$: hợp lý đơn điệu. (6) (2) $s=0$: hợp lý giảm chặt. $L(p;D)=(1-p)^n$, $n\ge1$; cực đại duy nhất tại $p=0=s/n$. (9) (3) $s=n$: hợp lý tăng chặt. $L(p;D)=p^n$; cực đại duy nhất tại $p=1=s/n$. (9) (4) Hai bước dùng đầu mút $0$ và $1$ của miền đóng $[0,1]$. (9) (5) Lưu ý: trên $(0,1)$, mẫu toàn $0$ có cận trên $1$ của hợp lý không đạt được, nên không có nghiệm. (18) Số đo sau rà soát: 51 âm tiết, 5 dòng, 0 công thức hiển thị, dòng dài nhất 18.
- **Ghi chú diễn giả:** Nghiệm $\hat p=0$ chỉ nói dữ liệu đã thấy có hợp lý lớn nhất khi $p=0$. Xác suất thật vẫn có thể dương: với mọi $0<p<1$, xác suất quan sát $n$ số $0$ là $(1-p)^n>0$. Mô hình đã khớp gán xác suất $0$ cho mọi cờ bằng $1$ về sau; Murphy xem đây là một dạng quá khớp (overfitting) và gọi nó là bài toán số đếm bằng không (zero-count problem). Một cách tránh nghiệm $\hat p=0$ là thêm tiên nghiệm Beta cho $p$; đó là một phương pháp ước lượng khác (ghi chú bài giảng, mục 5.2).

#### TS06 — Ví dụ: mười cờ cảnh báo
- **Lý do tồn tại:** ví dụ áp dụng Định lý 11.4 và dự đoán thế tham số.
- **Nhu cầu/khoảng trống:** chuyển nghiệm thành con số và quyết định dự đoán.
- **Đầu vào → đầu ra:** TS01, TS03 → $\hat p=0{,}7$; tỉ số hợp lý $2{,}28$; xác suất gắn cờ của sản phẩm tiếp theo theo mô hình đã khớp.
- **Vị trí:** ví dụ xuyên suốt một chiều; ứng dụng của cụm Bernoulli. **Mục tiêu:** 2.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #20: bỏ vế rào đón "xác suất thật có thể khác" (giữ trong ghi chú diễn giả).
- **Sửa (rà soát):** #35: dự đoán thế tham số thêm "theo mô hình đã khớp"; ghi chú diễn giả bỏ vế lặp (#48).
- **Nguồn:** Ví dụ 11.3 L368–392. Murphy §4.2.3, PDF 140. **Mẫu (chỉ planning):** MAT1101 b10.1 S12.
- **Phác thảo:** (1) Mười cờ $(1,0,1,1,0,1,1,0,1,1)$ của mười sản phẩm lấy độc lập; mô hình i.i.d. Bernoulli$(p)$. (13) (2) Tính $\hat p$; so với $p=1/2$. (3) (3) $s=7$, $n=10$, $0<s<n$: $\hat p=7/10=0{,}7$. (0) (4) display $$\begin{aligned}L(1/2;D)&=1/1024\approx0{,}000977,\\ L(0{,}7;D)&=0{,}7^7\cdot0{,}3^3\approx0{,}002224,\\ L(0{,}7;D)/L(1/2;D)&\approx2{,}28.\end{aligned}$$ (5) Dự đoán thế tham số (plug-in prediction): theo mô hình đã khớp, cờ tiếp theo bằng $1$ với xác suất $0{,}7$. (19) (6) Diễn giải: $0{,}7$ là giá trị phù hợp nhất với mười cờ đã thấy. (13) Số đo sau rà soát: 48 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 19.
- **Ghi chú diễn giả:** Kiểm tra lại bằng bước đầu của chứng minh: $\ell'(p)=(7-10p)/[p(1-p)]$ dương khi $p<0{,}7$, bằng $0$ tại $p=0{,}7$ và âm khi $p>0{,}7$. Tỉ số hai hợp lý là $2^{10}\cdot0{,}7^7\cdot0{,}3^3\approx2{,}277$. Dự đoán thế tham số thay $\hat p$ vào mô hình để tính xác suất của quan sát mới. Xác suất gắn cờ thật của dây chuyền có thể khác $0{,}7$.

#### TS07 — Entropy chéo nhị phân
- **Lý do tồn tại:** ứng dụng của Mệnh đề 11.3 cho Bernoulli; ví dụ cụ thể của $\hat R_n$ (Q-K).
- **Nhu cầu/khoảng trống:** nối nghiệm Bernoulli với hàm mất mát của phân loại nhị phân.
- **Đầu vào → đầu ra:** HL06, TS03 → entropy chéo nhị phân; cực tiểu theo $p$ cho (5.2).
- **Vị trí:** ứng dụng AI của sườn. **Mục tiêu:** 2, 6.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #13: nghiệm $s/n$ dẫn từ cả Mệnh đề 11.3 và định lý ước lượng Bernoulli.
- **Sửa (rà soát):** D1: "âm log-hợp lý Bernoulli". D2: dòng cuối không dẫn số Mệnh đề 11.3. #36: thêm "log loss"; ghi chú diễn giả: mất mát log, Murphy §4.3.2.
- **Sửa (rà lại vòng 1):** R12: "Chia $-\ell(p;D)$ cho $n$:" thay "Chia âm log-hợp lý Bernoulli cho $n$:".
- **Nguồn:** L355–364. Murphy §4.2.3 (4.20)–(4.21), PDF 140; §4.3, PDF 145.
- **Phác thảo:** (1) Nhu cầu: hàm mất mát cho nhãn nhị phân khi mọi quan sát dùng chung một xác suất $p$. (18) (2) Chia $-\ell(p;D)$ cho $n$: (2) (3) display $$\hat R_n(p)=-\frac1n\sum_{i=1}^n\bigl[x_i\log p+(1-x_i)\log(1-p)\bigr].$$ (4) Hàm này gọi là entropy chéo nhị phân (binary cross-entropy, log loss). (12) (5) Cực tiểu $\hat R_n$ tương đương cực đại hợp lý, nên nghiệm là $\hat p=s/n$ của định lý ước lượng Bernoulli. (17) Số đo sau rà lại vòng 1: 49 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 18.
- **Ghi chú diễn giả:** Đây là cách học xác suất của một nhãn nhị phân khi chưa dùng đặc trưng đầu vào. Entropy chéo nhị phân là mất mát log của bài toán phân loại nhị phân có đầu ra xác suất (Murphy (2022), §4.3.2). Mệnh đề 11.3 của ghi chú bài giảng đổi bài toán cực đại hợp lý thành cực tiểu mất mát này, nên hai bài toán có cùng nghiệm; định lý ước lượng Bernoulli cho nghiệm đó.

#### TS08 — Bài tập: nghiệm trong và nghiệm biên (a)
- **Lý do tồn tại:** bài trên lớp 11.1 (Q-B); lời giải (a) trên mặt trang.
- **Nhu cầu/khoảng trống:** người học tự tái tạo chứng minh trường hợp trong.
- **Đầu vào → đầu ra:** TS03–TS05 → $\hat p=1/4$.
- **Vị trí:** kiểm tra cụm Bernoulli. **Mục tiêu:** 2.
- **Quyết định:** `thêm`. **Bài tập:** trên lớp, lời giải trên mặt trang (fragment).
- **Sửa (rà soát):** #32: nhãn "(a)" trong tiêu đề giữ chữ thường (`span.nocase`).
- **Nguồn:** BT L7–41.
- **Phác thảo:** (1) Câu hỏi: $8$ cờ của $8$ sản phẩm lấy độc lập, có $2$ cờ bằng $1$; mô hình i.i.d. Bernoulli$(p)$, $p\in[0,1]$. (16) (2) (a) Viết log-hợp lý, tìm ước lượng hợp lý cực đại, chứng minh đó là cực đại trên $[0,1]$. (18) (3) (b) Thay bằng tám cờ đều bằng $0$: tìm nghiệm trên $[0,1]$; xét sự tồn tại nghiệm trên $(0,1)$. (16) (4) Lời giải: (a) $\ell(p)=2\log p+6\log(1-p)$ và (4) (5) display $$\ell'(p)=\frac{2-8p}{p(1-p)}.$$ (6) $\ell'>0$ khi $p<1/4$, $\ell'<0$ khi $p>1/4$; $L(0)=L(1)=0<L(1/4)$, nên $\hat p=1/4=s/n$. (3) Số đo sau rà soát: 57 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 18.
- **Ghi chú diễn giả:** Gợi ý: tính $\ell'(p)$ trên $(0,1)$, xét dấu, rồi so với giá trị của $L$ ở hai đầu mút. Chi tiết: $\ell'(p)=2/p-6/(1-p)=[2(1-p)-6p]/[p(1-p)]$. Kiểm tra lại: tại $p=1/4$, tử số $2-8p$ bằng $0$.

#### TS09 — Bài tập: nghiệm trong và nghiệm biên (b)
- **Lý do tồn tại:** lời giải (b) của bài 11.1; kiểm tra giả thiết miền đóng.
- **Nhu cầu/khoảng trống:** lỗi thường gặp là kết luận "không có nghiệm" khi $\ell'=0$ vô nghiệm.
- **Đầu vào → đầu ra:** TS05 → $\hat p=0$ trên $[0,1]$; không có nghiệm trên $(0,1)$.
- **Vị trí:** kiểm tra cụm Bernoulli (trường hợp biên). **Mục tiêu:** 2.
- **Quyết định:** `thêm`. **Bài tập:** trên lớp, lời giải trên mặt trang.
- **Sửa (rà soát):** #32: nhãn "(b)" trong tiêu đề giữ chữ thường (`span.nocase`).
- **Nguồn:** BT L25–43.
- **Phác thảo:** (1) Câu hỏi: (b) tám cờ đều bằng $0$; nghiệm trên $[0,1]$ và trên $(0,1)$. (11) (2) Lời giải: $L(p)=(1-p)^8$ giảm chặt trên $[0,1]$, nên $\hat p=0$ trên $[0,1]$. (7) (3) Trên $(0,1)$: với mỗi $p$ có $p'\in(0,p)$ cho $L(p')>L(p)$. (5) (4) $L\to1$ khi $p\downarrow0$ nhưng không đạt; không tồn tại ước lượng hợp lý cực đại trên $(0,1)$. (14) (5) Lưu ý: $\ell'(p)=0$ vô nghiệm trên $(0,1)$; nghiệm trên $[0,1]$ nằm ở đầu mút $p=0$. (11) Số đo sau rà soát: 48 âm tiết, 5 dòng, 0 công thức hiển thị, dòng dài nhất 14.
- **Ghi chú diễn giả:** Gợi ý: phương trình $\ell'(p)=0$ không có nghiệm trong $(0,1)$; xét trực tiếp tính đơn điệu của $(1-p)^8$. Một lỗi thường gặp là giải $\ell'(p)=0$, không thấy nghiệm, rồi kết luận không có nghiệm trên $[0,1]$. Câu (b) là trường hợp $n=8$ của hiện tượng miền mở đã nêu ở chứng minh nghiệm biên.

#### TS10 — Ba chế độ tải
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập và trực quan của cụm phân loại.
- **Nhu cầu/khoảng trống:** cực đại riêng từng thừa số $\pi_k^{n_k}$ cho kết quả không còn là phân phối; cần giữ ràng buộc chuẩn hóa.
- **Đầu vào → đầu ra:** TS03 → ràng buộc $\sum_k\pi_k=1$, ứng viên tần suất.
- **Vị trí:** ví dụ xuyên suốt một chiều (chế độ tải); phần việc: "$K$ tham số trên đơn hình". **Mục tiêu:** 3.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** #14: hàm hợp lý $\pi_1^2\pi_2^3\pi_3^5$ viết ra trước khi nói về từng thừa số.
- **Sửa (rà lại vòng 1):** R5: "Hàm hợp lý là $\pi_1^2\pi_2^3\pi_3^5$; cực đại từng thừa số …" (bỏ "riêng" để dòng còn 20 âm tiết).
- **Nguồn:** L423–425 (không chép câu rào đón L425, Q-J). Murphy §4.2.4, PDF 141.
- **Phác thảo:** (1) Nhu cầu: ước lượng ba xác suất chế độ tải từ số đếm $(2,3,5)$ của mười bản ghi. (17) (2) Hàm hợp lý là $\pi_1^2\pi_2^3\pi_3^5$; cực đại từng thừa số đẩy mỗi $\pi_k$ tới $1$, và kết quả không còn là phân phối. (20) (3) Ràng buộc: $\pi_1+\pi_2+\pi_3=1$, $\pi_k\ge0$. (2) (4) Trực quan. Tổng khối lượng xác suất bằng $1$ chia cho ba nhóm; tăng một nhóm thì bớt nhóm khác. (19) Số đo sau rà lại vòng 1: 58 âm tiết, 4 dòng, 0 công thức hiển thị, dòng dài nhất 20.
- **Ghi chú diễn giả:** Ba chế độ tải là thấp, trung bình, cao. Các tần suất $(0{,}2;\ 0{,}3;\ 0{,}5)$ là ứng viên tự nhiên. Còn hai câu hỏi: cách chia nào cho hợp lý lớn nhất, và nhóm có số đếm bằng $0$ nhận bao nhiêu. Với hai nhóm, bài toán trở lại mô hình Bernoulli, ràng buộc chỉ để lại một bậc tự do; với ba nhóm trở lên, ràng buộc tổng liên kết mọi tọa độ cùng lúc.

#### TS11 — Đơn hình xác suất và hàm hợp lý phân loại
- **Lý do tồn tại:** bước hình thức: miền tham số và hàm hợp lý (Định nghĩa 11.6).
- **Nhu cầu/khoảng trống:** TS10 cần tên cho miền ràng buộc và dạng (6.1).
- **Đầu vào → đầu ra:** TS10 → $\Delta_{K-1}$, $n_k$, (6.1).
- **Vị trí:** đối tượng của sườn (họ thứ hai). **Mục tiêu:** 3.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #19: bỏ "Nhắc lại:" lặp (đã có ở HL01).
- **Sửa (rà soát):** #24: "Định nghĩa." mở trang; câu mẫu i.i.d. $\operatorname{Cat}(\boldsymbol\pi)$ đưa vào câu số đếm. D1: bỏ `\tag{6.1}`.
- **Sửa (đồng bộ materials):** `p.note-source` thêm "vector xác suất viết $\pi$, không đậm" (lệch ký hiệu duy nhất còn lại so với ghi chú).
- **Nguồn:** Định nghĩa 11.6 L429–456. Murphy §4.2.4 (4.26), PDF 141; §4.6.3.2 (4.151), PDF 168.
- **Phác thảo:** (1) Định nghĩa. Với $K\ge2$ nhóm, đơn hình xác suất (probability simplex) là tập (12) (2) display $$\Delta_{K-1}=\Bigl\{\boldsymbol\pi\in\mathbb R^K:\ \pi_k\ge0,\ \sum_{k=1}^K\pi_k=1\Bigr\}.$$ (3) Với dữ liệu $D$ của mẫu i.i.d. $\operatorname{Cat}(\boldsymbol\pi)$, $\mathbb P(X=k)=\pi_k$, số đếm của nhóm $k$ là $n_k=\sum_i\mathbf 1[x_i=k]$; $\sum_kn_k=n$. (11) (4) Hàm hợp lý phân loại trên $\Delta_{K-1}$, quy ước $\pi_k^0=1$: (8) (5) display $$L(\boldsymbol\pi;D)=\prod_{k=1}^K\pi_k^{n_k},\qquad\ell(\boldsymbol\pi;D)=\sum_{k:\,n_k>0}n_k\log\pi_k.$$ Số đo sau rà soát: 31 âm tiết, 5 dòng, 2 công thức hiển thị, dòng dài nhất 12.
- **Ghi chú diễn giả:** Mỗi quan sát $x_i=k$ góp một thừa số $\pi_k$; nhóm $k$ góp $n_k$ thừa số như vậy, nên hàm hợp lý phân loại suy từ dạng tích $\prod_ip_\theta(x_i)$, và các số đếm là thống kê đủ. Các xác suất trong $\Delta_{K-1}$ mô tả một biến nhận đúng một trong $K$ giá trị. Chúng khác $K$ tham số Bernoulli của $K$ chỉ báo có thể đồng thời bằng $1$: các tham số đó không chịu ràng buộc tổng bằng $1$.

#### TS12 — Ước lượng phân loại
- **Lý do tồn tại:** phát biểu Định lý 11.7.
- **Nhu cầu/khoảng trống:** nghiệm trên đơn hình đóng, kể cả nhóm vắng mặt.
- **Đầu vào → đầu ra:** TS11 → (6.2).
- **Vị trí:** kết quả của sườn (họ thứ hai). **Mục tiêu:** 3.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** D1: "hàm hợp lý phân loại" thay cho "(6.1)"; bỏ `\tag{6.2}`.
- **Nguồn:** L460–479. Murphy §4.2.4 (4.27)–(4.31), PDF 141.
- **Phác thảo:** (1) Định lý. Giả thiết: $n\ge1$ quan sát của mẫu i.i.d. $\operatorname{Cat}(\boldsymbol\pi)$, số đếm $n_1,\ldots,n_K$; miền $\Delta_{K-1}$ đóng, cho phép $\pi_k=0$. (15) (2) Kết luận: hàm hợp lý phân loại có đúng một điểm cực đại trên $\Delta_{K-1}$: (14) (3) display $$\hat\pi_k=\frac{n_k}n,\qquad k=1,\ldots,K.$$ (4) Nhóm chưa xuất hiện ($n_k=0$) nhận $\hat\pi_k=0$. (5) (5) Ý nghĩa: dành khối lượng cho nhóm chưa thấy làm giảm hợp lý. (13) Số đo sau rà soát: 47 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 15.
- **Ghi chú diễn giả:** Với hai nhóm và $\boldsymbol\pi=(1-p,p)$, công thức $\hat\pi_k=n_k/n$ cho $\hat p=n_2/n$, đúng công thức Bernoulli. Miền đóng quyết định sự tồn tại nghiệm: nếu đòi mọi $\pi_k>0$ mà có $n_k=0$, cận trên của hợp lý không đạt được. Chứng minh dùng nhân tử Lagrange để tìm ứng viên, rồi bất đẳng thức $\log t\le t-1$ để chứng minh ứng viên là cực đại toàn cục.

#### TS13 — Chứng minh: ước lượng phân loại, ứng viên
- **Lý do tồn tại:** P3, bước 1 (Q-C, Q-C1).
- **Nhu cầu/khoảng trống:** ràng buộc tổng cần nhân tử Lagrange; điều kiện dừng không viết được cho nhóm có $n_k=0$.
- **Đầu vào → đầu ra:** TS12 → ứng viên $\hat\pi_k=n_k/n$ (điều kiện cần).
- **Vị trí:** phương pháp của sườn (ứng viên). **Mục tiêu:** 3.
- **Quyết định:** `thêm`. Theo Q-C1: Lagrange chỉ cho ứng viên; không viện dẫn tính đủ của Mệnh đề 04.2(b). **Bài tập:** không.
- **Sửa (cổng):** #12: nêu lý do tọa độ ngoài $\mathcal K_+$ của ứng viên bằng $0$ và vai trò của bước so sánh.
- **Sửa (rà soát):** #25: lý do ràng buộc trên $\mathcal K_+$ nêu ngay khi đặt bài toán; dòng cuối bỏ mệnh đề lặp.
- **Sửa (rà lại vòng 1):** R2: "Nhắc lại:" viết thành câu không đặt tên vế phải ("hàm Lagrange cộng vào hàm mục tiêu tích của nhân tử $\nu$ với ràng buộc đẳng thức; điểm dừng: $\nabla_{\boldsymbol\pi}\mathcal L=0$"), vì $b$ là sản phẩm mới và $e$ trùng số $e$, $e_j$ (quyết định của điều phối viên). Gradient viết $\nabla_{\boldsymbol\pi}\mathcal L$ vì $\boldsymbol\pi$ (định nghĩa ở TS11) là biến của bài toán trên trang, còn $u$ không còn được giới thiệu (quyết định của điều phối viên).
- **Sửa (kiểm định cuối):** tên bước 2 và 3 có câu dẫn "Từ …", "Thế vào: …"; dòng cuối bỏ "trên $\mathcal K_+$" (đã nêu "đặt $\pi_k=0$ ngoài $\mathcal K_+$") để trang không chạm chân trang ở 1600×900. Số đo: 58 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 20.
- **Nguồn:** L481–499. Murphy §4.2.4 (4.27)–(4.31), PDF 141; Lagrange §8.5.1, PDF 332 (Murphy viết $-\lambda(1-\sum_k\theta_k)$, ghi chú $+\nu(\sum_k\pi_k-1)$).
- **Phác thảo:** (1) Lagrange tìm ứng viên; $\log t\le t-1$ chứng minh cực đại toàn cục. (10) (2) Nhắc lại: hàm Lagrange cộng vào hàm mục tiêu tích của nhân tử $\nu$ với ràng buộc đẳng thức; điểm dừng: $\nabla_{\boldsymbol\pi}\mathcal L=0$. (20) (3) Hợp lý dương cần $\pi_k>0$ trên $\mathcal K_+=\{k:n_k>0\}$. Cực tiểu $F=-\sum_{k\in\mathcal K_+}n_k\log\pi_k$ với $\sum_{k\in\mathcal K_+}\pi_k=1$ (đặt $\pi_k=0$ ngoài $\mathcal K_+$; bước sau so với mọi điểm): (16) (4) display $$\mathcal L=-\sum_{k\in\mathcal K_+}n_k\log\pi_k+\nu\Bigl(\sum_{k\in\mathcal K_+}\pi_k-1\Bigr).$$ (5) Điều kiện dừng cho $\pi_k=n_k/\nu$. Từ $-n_k/\pi_k+\nu=0$. (5) (6) Ràng buộc cho $\nu=n$. Thế vào: $1=\sum_{k\in\mathcal K_+}n_k/\nu=n/\nu$; ứng viên $\hat\pi_k=n_k/n$. (7) Số đo sau kiểm định cuối: 58 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 20.
- **Ghi chú diễn giả:** Điều kiện dừng chỉ là điều kiện cần. Nhóm có $n_k=0$ không có số hạng $n_k\log\pi_k$, nên điều kiện dừng $n_k/\pi_k=\nu$ không viết được tại $\pi_k=0$, vì nó thành phép chia $0/0$; nhóm đó được xử lý ở bước so sánh với mọi điểm của đơn hình. Tổng các tọa độ thuộc $\mathcal K_+$ của ứng viên đã bằng $1$, nên các tọa độ còn lại phải bằng $0$ để ứng viên thuộc $\Delta_{K-1}$.

#### TS14 — Chứng minh: ước lượng phân loại, cực đại toàn cục
- **Lý do tồn tại:** P3, bước 2–3: cực đại toàn cục và duy nhất trên đơn hình đóng.
- **Nhu cầu/khoảng trống:** điểm dừng chỉ thỏa điều kiện cần; nhóm vắng mặt cần xử lý không qua đạo hàm.
- **Đầu vào → đầu ra:** TS13 → (6.2) đã chứng minh; công cụ $\log t\le t-1$ cho GN08.
- **Vị trí:** phương pháp của sườn (bất đẳng thức cho cực đại toàn cục). **Mục tiêu:** 3.
- **Quyết định:** `thêm`; `tách` thành hai trang (so sánh; dấu bằng) nếu khối `aligned` sáu dòng tràn ở 390 px. **Bài tập:** không.
- **Sửa (rà soát):** #39: "(Kullback–Leibler divergence, KL)" trong ghi chú diễn giả.
- **Nguồn:** L501–518 (Murphy không có bước này).
- **Phác thảo:** (1) Nhắc lại: $\log t\le t-1$ với $t>0$, dấu bằng khi và chỉ khi $t=1$. (9) (2) $\ell(\boldsymbol\pi)\le\ell(\hat{\boldsymbol\pi})$ trên $\Delta_{K-1}$. Nếu $\pi_k=0$ với một $k\in\mathcal K_+$ thì $L(\boldsymbol\pi;D)=0$; ngược lại: (7) (3) display $$\begin{aligned}&\ell(\boldsymbol\pi;D)-\ell(\hat{\boldsymbol\pi};D)\\ &=\sum_{k\in\mathcal K_+}n_k\log\frac{\pi_k}{\hat\pi_k}\\ &\le\sum_{k\in\mathcal K_+}n_k\Bigl(\frac{\pi_k}{\hat\pi_k}-1\Bigr)\\ &=n\Bigl(\sum_{k\in\mathcal K_+}\pi_k-1\Bigr)\le0.\end{aligned}$$ (4) Do $n_k/\hat\pi_k=n$, $\sum_{k\in\mathcal K_+}n_k=n$ và $\sum_{k\in\mathcal K_+}\pi_k\le1$. (2) (5) Dấu bằng chỉ tại $\hat{\boldsymbol\pi}$. Cần $\pi_k=\hat\pi_k$ trên $\mathcal K_+$ và $\pi_k=0$ ngoài $\mathcal K_+$. (8) Số đo sau rà soát: 26 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 9.
- **Ghi chú diễn giả:** Bất đẳng thức thứ nhất dùng $\log t\le t-1$ với $t=\pi_k/\hat\pi_k>0$. Đẳng thức tiếp theo dùng $n_k/\hat\pi_k=n$ và $\sum_{k\in\mathcal K_+}n_k=n$. Bất đẳng thức cuối dùng $\sum_{k\in\mathcal K_+}\pi_k\le\sum_k\pi_k=1$. Dấu bằng ở bất đẳng thức thứ nhất cần mọi $t=1$, tức $\pi_k=\hat\pi_k$ trên $\mathcal K_+$; ở bất đẳng thức cuối cần $\boldsymbol\pi$ không đặt khối lượng ngoài $\mathcal K_+$. Hai điều kiện cùng cho $\boldsymbol\pi=\hat{\boldsymbol\pi}$. Cùng bất đẳng thức cho tính không âm của phân kỳ Kullback–Leibler (Kullback–Leibler divergence, KL); đó là một chứng minh thứ hai của định lý (ghi chú bài giảng, mục 6.2).

#### TS15 — Ví dụ: ba chế độ tải trong mười bản ghi
- **Lý do tồn tại:** ví dụ và ứng dụng của Định lý 11.7 trên ví dụ xuyên suốt.
- **Nhu cầu/khoảng trống:** chuyển (6.2) thành số và kiểm tra bằng điều kiện dừng.
- **Đầu vào → đầu ra:** TS10, TS12 → $\hat{\boldsymbol\pi}=(0{,}2;\ 0{,}3;\ 0{,}5)$.
- **Vị trí:** ví dụ xuyên suốt một chiều. **Mục tiêu:** 3.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #7: ứng dụng (entropy chéo nhiều lớp) lên mặt trang thay dòng diễn giả 18 âm tiết; diễn giải vào ghi chú diễn giả.
- **Sửa (rà soát):** #15: gộp dòng nhiệm vụ, thêm "Diễn giải:" (6 dòng). #36: "log loss". #1 (nghiêm trọng): ghi chú diễn giả sửa add-one thành MAP với tiên nghiệm Dirichlet$(2,2,2)$, Beta$(2,2)$ khi hai nhóm; nguồn Murphy §4.5.1 (4.96), §4.6.3.4.
- **Nguồn:** Ví dụ 11.4 L536–553. Murphy §4.2.4, PDF 141.
- **Phác thảo:** (1) Mười bản ghi lấy độc lập, số đếm $(n_1,n_2,n_3)=(2,3,5)$; mô hình i.i.d. $\operatorname{Cat}(\boldsymbol\pi)$ trên $\Delta_2$. (12) (2) Tính $\hat{\boldsymbol\pi}$; mọi số đếm dương, $\mathcal K_+=\{1,2,3\}$, $n=10$. (5) (3) display $$\hat{\boldsymbol\pi}=\Bigl(\frac2{10},\frac3{10},\frac5{10}\Bigr)=(0{,}2;\ 0{,}3;\ 0{,}5).$$ (4) Kiểm tra điều kiện dừng: $2/0{,}2=3/0{,}3=5/0{,}5=10=n$. (5) (5) Chia âm log-hợp lý cho $n$ được entropy chéo nhiều lớp (categorical cross-entropy, log loss) $-\sum_k\frac{n_k}n\log\pi_k$. (14) (6) Diễn giải: chế độ tải cao có xác suất ước lượng lớn nhất, $0{,}5$; ba xác suất có tổng bằng $1$. (19) Số đo sau rà soát: 55 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 19.
- **Ghi chú diễn giả:** Ba xác suất cùng mô tả một bản ghi có đúng một chế độ, nên tăng một xác suất buộc phải giảm các xác suất còn lại. Entropy chéo nhiều lớp là mất mát log của phân loại nhiều lớp; tổng chỉ chạy trên các nhóm có $n_k>0$. Với số đếm $(3,0,7)$, định lý cho $(0{,}3;\ 0;\ 0{,}7)$, và mô hình đã khớp gán xác suất $0$ cho nhóm thứ hai về sau. Cộng thêm một vào mỗi số đếm (add-one smoothing) là ước lượng hậu nghiệm cực đại (maximum a posteriori, MAP) với tiên nghiệm Dirichlet$(2,2,2)$; khi chỉ có hai nhóm, tiên nghiệm này là Beta$(2,2)$. Ước lượng này khác nghiệm hợp lý cực đại ở trên. Khi các xác suất được tính bằng một mô hình có tham số dùng chung cho nhiều đầu vào, các $\pi_k$ không chọn tự do được trên đơn hình, nên công thức tần suất chỉ áp dụng cho mô hình phân loại không có ràng buộc thêm.

#### TS16 — Bài tập: Lagrange khi có nhóm vắng mặt (a)
- **Lý do tồn tại:** bài trên lớp 11.2 (Q-B); đề và lời giải (a).
- **Nhu cầu/khoảng trống:** xử lý nhóm vắng mặt mà không chia cho $0$.
- **Đầu vào → đầu ra:** TS12–TS14 → mọi điểm cực đại có $\pi_2=0$.
- **Vị trí:** kiểm tra cụm phân loại. **Mục tiêu:** 3.
- **Quyết định:** `thêm`. **Bài tập:** trên lớp, lời giải trên mặt trang (fragment); câu (d) trong ghi chú diễn giả.
- **Sửa (rà soát):** #31: tiêu đề "Lagrange khi có nhóm vắng mặt (a)". #6: lời giải (a) thêm $L>0\Rightarrow\pi_1,\pi_3>0$, tách hai dòng. #32: `span.nocase`.
- **Nguồn:** BT L45–80.
- **Phác thảo:** (1) Câu hỏi: số đếm $(n_1,n_2,n_3)=(4,0,6)$ trong $n=10$ quan sát i.i.d. $\operatorname{Cat}(\boldsymbol\pi)$, $\boldsymbol\pi\in\Delta_2$. (8) (2) (a) Chứng minh mọi điểm cực đại có $\pi_2=0$, không dùng điều kiện dừng theo $\pi_2$. (14) (3) (b) Dùng nhân tử Lagrange với $\pi_1+\pi_3=1$ tìm nghiệm; chứng minh đó là cực đại. (14) (4) (c) Tính tỉ số hợp lý giữa nghiệm và $(0{,}3;\ 0{,}1;\ 0{,}6)$. (9) (5) Lời giải: (a) $L=\pi_1^4\pi_3^6$; điểm cực đại có $L>0$, nên $\pi_1,\pi_3>0$. (8) (6) Nếu $m=\pi_1+\pi_3<1$, đặt $\boldsymbol\pi'=(\pi_1/m,\ 0,\ \pi_3/m)$: $L(\boldsymbol\pi')=m^{-10}L(\boldsymbol\pi)>L(\boldsymbol\pi)$, nên $m=1$ và $\pi_2=0$. (4) Số đo sau rà soát: 56 âm tiết, 6 dòng, 0 công thức hiển thị, dòng dài nhất 14.
- **Ghi chú diễn giả:** Do $\pi_1,\pi_3>0$, $m\in(0,1]$. Gợi ý: chuẩn hóa hai tọa độ đã thấy lên tổng bằng $1$ và so sánh hai hàm hợp lý. Câu (d) của đề: xác suất thế tham số để hai quan sát mới đều thuộc nhóm $3$ là $\hat\pi_3^2=0{,}36$. Phép tính dùng hai giả thiết: hai quan sát mới có phân phối $\operatorname{Cat}(\hat{\boldsymbol\pi})$ của mô hình đã khớp, và chúng độc lập với nhau.

#### TS17 — Bài tập: Lagrange khi có nhóm vắng mặt (b), (c)
- **Lý do tồn tại:** lời giải (b), (c) của bài 11.2.
- **Nhu cầu/khoảng trống:** người học áp dụng Lagrange trên mặt $\pi_2=0$ và đo mất mát hợp lý khi dành khối lượng cho nhóm vắng mặt.
- **Đầu vào → đầu ra:** TS16 → $\hat{\boldsymbol\pi}=(0{,}4;\ 0;\ 0{,}6)$; tỉ số $256/81$.
- **Vị trí:** kiểm tra cụm phân loại. **Mục tiêu:** 3.
- **Quyết định:** `thêm`. Lời giải (b) theo `exercises.md` dùng Mệnh đề 04.2(b) cho bài toán lồi trên mặt; xem mục "Điểm cần điều phối viên quyết định" của `review-log.md`. **Bài tập:** trên lớp, lời giải trên mặt trang.
- **Sửa (rà soát):** #31: tiêu đề "… (b), (c)"; "(b) với $\pi_2=0$", bỏ chữ "mặt". #30: thêm dòng "Câu hỏi:" nhắc đề (b), (c). #32: `span.nocase`.
- **Sửa (rà lại vòng 1):** R6: ghi chú diễn giả "câu (a) cho một điểm có $\pi_2=0$ và hợp lý lớn hơn".
- **Nguồn:** BT L82–99.
- **Phác thảo:** (1) Câu hỏi: (b) Lagrange với $\pi_1+\pi_3=1$, chứng minh cực đại; (c) tỉ số hợp lý với $(0{,}3;\ 0{,}1;\ 0{,}6)$. (15) (2) Lời giải: (b) với $\pi_2=0$: $\mathcal L=-4\log\pi_1-6\log\pi_3+\nu(\pi_1+\pi_3-1)$. (4) (3) Điều kiện dừng $4/\pi_1=6/\pi_3=\nu$; ràng buộc cho $\nu=10$, $\hat{\boldsymbol\pi}=(0{,}4;\ 0;\ 0{,}6)$. (6) (4) $F$ lồi trên tập mở $\{\pi_1>0,\pi_3>0\}$, nên điểm dừng là nghiệm khi $\pi_2=0$ (Mệnh đề 04.2(b)); cùng (a), $\hat{\boldsymbol\pi}$ cực đại trên $\Delta_2$. (18) (5) display $$\text{(c)}\quad\frac{L(\hat{\boldsymbol\pi})}{L(0{,}3;\,0{,}1;\,0{,}6)}=\frac{0{,}4^4}{0{,}3^4}=\frac{256}{81}\approx3{,}16.$$ (6) Diễn giải: dành khối lượng $0{,}1$ cho nhóm vắng mặt làm hợp lý giảm hơn ba lần. (16) Số đo sau rà lại vòng 1: 59 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 18.
- **Ghi chú diễn giả:** Ở đây $F(\pi_1,\pi_3)=-4\log\pi_1-6\log\pi_3$; $-\log$ lồi, ma trận ràng buộc $(1,1)$ có hàng khác $0$. Với mọi $\boldsymbol\pi$ có hợp lý dương: nếu $m<1$, câu (a) cho một điểm có $\pi_2=0$ và hợp lý lớn hơn; nếu $m=1$ thì $\pi_2=0$. Ở câu (c), hai vector có cùng $\pi_3=0{,}6$, nên thừa số $0{,}6^6$ triệt tiêu. Kiểm tra lại: $4/0{,}4=6/0{,}6=10=n$. Cách khác cho tính cực đại: bất đẳng thức $\log t\le t-1$ như chứng minh định lý ước lượng phân loại, với $\mathcal K_+=\{1,3\}$.

### Mạch 4 · Gaussian một chiều và độ chệch

#### G100 — 4. Gaussian một chiều và độ chệch (trang tiêu đề mạch, `id="mach-4"`)
- **Lý do tồn tại:** mở mạch 4 và nêu câu hỏi trung tâm cùng phân rã.
- **Nhu cầu/khoảng trống:** mạch 3 chỉ xét dữ liệu hữu hạn giá trị; số đo liên tục cần tham số vị trí và mức phân tán (L599).
- **Đầu vào → đầu ra:** TS14 (phương pháp "ứng viên, rồi cực đại toàn cục") → nhiệm vụ: cực đại (7.1) và chọn mẫu số.
- **Vị trí:** điểm vào mạch 4; đảm nhận bước nhu cầu của cụm Gaussian một chiều; phần việc: đặt câu hỏi trung tâm của mạch 4 và phân rã. **Mục tiêu:** 4, 6.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #22: thêm trường "Nguồn" và phần việc.
- **Sửa (rà soát):** D1, #50: ghi chú diễn giả thay "(4.3)", "(7.3)" bằng tên; thêm giới hạn của hai mô hình rời rạc.
- **Sửa (rà lại vòng 1):** R8: ghi chú diễn giả "số đo liên tục cần một mô hình mật độ; với mật độ Gaussian, …"; kết quả giao thêm mất mát bình phương suy từ nhiễu Gaussian (G107).
- **Nguồn:** L599–605; L872. Murphy §4.2.5, PDF 141–142; §4.7.6.1, PDF 190.
- **Phác thảo:** (1) Muốn ước lượng vị trí và độ phân tán của số đo liên tục, cần cực đại hợp lý Gaussian và chọn mẫu số. (24) (2) Log-hợp lý Gaussian · Trung bình mẫu · Phương sai mẫu · Độ chệch · Mất mát bình phương (15) Số đo sau rà lại vòng 1: 39 âm tiết, 2 dòng, 0 công thức hiển thị, dòng dài nhất 24.
- **Ghi chú diễn giả (≈80 âm tiết):** mạch kế thừa (4.3) và cách chứng minh hai bước của mạch trước. Khác hai mô hình rời rạc, phương sai nằm cả trong số mũ lẫn trong hệ số chuẩn hóa của mật độ. Mạch giao cho mạch sau công thức $\hat\mu=\bar x$, $\hat\sigma^2=Q/n$, đẳng thức tách tâm (7.3), điều kiện $Q>0$ và lý do của mẫu số $n-1$.

#### G101 — Năm độ lệch nhiệt độ
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập và trực quan của cụm Gaussian một chiều.
- **Nhu cầu/khoảng trống:** ước lượng vị trí và mức dao động của năm độ lệch.
- **Đầu vào → đầu ra:** G100 → dữ liệu $(0,1,2,3,4)$, mật độ cần cực đại, hai tác động của $\mu$ và $\sigma^2$.
- **Vị trí:** ví dụ xuyên suốt một chiều (độ lệch nhiệt độ). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #2: "Nhu cầu:" thêm sự tồn tại nghiệm và lựa chọn mẫu số.
- **Sửa (rà soát):** #48: "cực tiểu" thay "tối thiểu hóa" trong ghi chú diễn giả.
- **Nguồn:** L603–616 (không chép câu rào đón L605, Q-J). Murphy §4.2.5, PDF 141.
- **Phác thảo:** (1) Nhu cầu: ước lượng vị trí, mức dao động của $(0,1,2,3,4)$; xét tồn tại nghiệm, chọn mẫu số. (17) (2) Nhắc lại: với $\mu\in\mathbb R$, $\sigma^2>0$, mật độ của $\mathcal N(\mu,\sigma^2)$ là (7) (3) display $$f_{\mu,\sigma^2}(x)=\frac1{\sqrt{2\pi\sigma^2}}\exp\Bigl[-\frac{(x-\mu)^2}{2\sigma^2}\Bigr],\qquad x\in\mathbb R.$$ (4) Trực quan. Dịch $\mu$ về gần dữ liệu làm giảm tổng bình phương sai lệch. (14) (5) Giảm $\sigma^2$ nâng mật độ quanh tâm, phạt nặng hơn các điểm xa tâm. (13) Số đo sau rà soát: 51 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 17.
- **Ghi chú diễn giả:** Một nhiệt kế đo độ lệch nhiệt độ của năm sản phẩm so với giá trị danh định. Mô hình giả thiết nhiễu Gaussian. Phương sai xuất hiện cả trong số mũ lẫn trong hệ số chuẩn hóa $1/\sqrt{2\pi\sigma^2}$, nên không thể chỉ cực tiểu phần số mũ. Điểm cân bằng giữa hai tác động của $\sigma^2$ được xác định bằng dấu của đạo hàm trong chứng minh.

#### G102 — Log-hợp lý Gaussian
- **Lý do tồn tại:** bước hình thức: (7.1) và hai thống kê $\bar x$, $Q$.
- **Nhu cầu/khoảng trống:** G101 cần hàm mục tiêu cụ thể.
- **Đầu vào → đầu ra:** G101, HL05 → (7.1); $\bar x$, $Q$.
- **Vị trí:** đối tượng của sườn (họ thứ ba). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** D1: bỏ `\tag{7.1}`; ghi chú diễn giả không dẫn "(4.1)", "(7.1)".
- **Nguồn:** L618–629. Murphy §4.2.5 (4.32)–(4.33), PDF 141.
- **Phác thảo:** (1) Đặt $v=\sigma^2$. Dữ liệu $D$ của mẫu i.i.d. $\mathcal N(\mu,v)$ cho log-hợp lý (9) (2) display $$\begin{aligned}\ell(\mu,v;D)&=-\frac n2\log(2\pi)-\frac n2\log v\\ &\quad-\frac1{2v}\sum_{i=1}^n(x_i-\mu)^2.\end{aligned}$$ (3) Số hạng $-\frac n2\log v$ đến từ hệ số chuẩn hóa; số hạng cuối đến từ số mũ. (15) (4) Ký hiệu: trung bình mẫu $\bar x=\frac1n\sum_ix_i$; tổng bình phương sai lệch $Q=\sum_i(x_i-\bar x)^2$. (10) Số đo sau rà soát: 34 âm tiết, 4 dòng, 1 công thức hiển thị, dòng dài nhất 15.
- **Ghi chú diễn giả:** Viết $v=\sigma^2$ để lấy đạo hàm trực tiếp theo phương sai. Log của mật độ một quan sát là $-\frac12\log(2\pi v)-(x-\mu)^2/(2v)$; cộng theo dạng tích của hàm hợp lý cho log-hợp lý Gaussian.

#### G103 — Ước lượng Gaussian một chiều
- **Lý do tồn tại:** phát biểu Định lý 11.9 cùng điều kiện tồn tại.
- **Nhu cầu/khoảng trống:** nghiệm của (7.1) và trường hợp dữ liệu trùng nhau.
- **Đầu vào → đầu ra:** G102 → (7.2); không có nghiệm khi $Q=0$.
- **Vị trí:** kết quả của sườn (họ thứ ba). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #15: "Ý nghĩa:" nêu cơ chế (hợp lý tăng vô hạn, $v=0$ ngoài miền) thay vì suy từ tính mở.
- **Sửa (rà soát):** D1: "log-hợp lý Gaussian" thay cho "(7.1)"; bỏ `\tag{7.2}`. #16: "Ý nghĩa:" nêu nghiệm duy nhất khi $Q>0$, không lặp dòng $Q=0$.
- **Nguồn:** L631–651. Murphy §4.2.5 (4.34)–(4.38), PDF 141–142 (chỉ điểm dừng; $Q=0$ không có ở Murphy). **Mẫu (chỉ planning):** MAT1101 b10.1 S15.
- **Phác thảo:** (1) Định lý. Giả thiết: $x_1,\ldots,x_n\in\mathbb R$, $n\ge1$, mẫu i.i.d. $\mathcal N(\mu,v)$; miền $\mu\in\mathbb R$, $v>0$. (7) (2) Kết luận: nếu $Q>0$, log-hợp lý Gaussian có đúng một điểm cực đại (12) (3) display $$\hat\mu=\bar x,\qquad\hat\sigma^2_{\mathrm{MLE}}=\frac Qn.$$ (4) Nếu $Q=0$, tức mọi $x_i$ bằng nhau, log-hợp lý không bị chặn trên; không có nghiệm với $v>0$. (15) (5) Ý nghĩa: khi $Q>0$, trung bình mẫu và trung bình bình phương sai lệch là nghiệm duy nhất. (17) Số đo sau rà soát: 51 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 17.
- **Ghi chú diễn giả:** Cấu trúc giống định lý ước lượng Bernoulli: tham số tối ưu là một trung bình của dữ liệu, và có một trường hợp dữ liệu suy biến. Khác biệt nằm ở miền tham số: $[0,1]$ chứa hai đầu mút nên mô hình Bernoulli luôn có nghiệm, còn $v>0$ là tập mở. Chứng minh tách tổng bình phương để thấy trung bình tối ưu không phụ thuộc phương sai, rồi tối ưu phương sai bằng dấu của đạo hàm.

#### G104 — Chứng minh: Gaussian một chiều, trung bình tối ưu
- **Lý do tồn tại:** P4, bước 1 (Q-C); đẳng thức (7.3) dùng lại ở G108, G111, GN06.
- **Nhu cầu/khoảng trống:** tối ưu hai biến cần tách: $\mu$ trước, với mọi $v$.
- **Đầu vào → đầu ra:** G103 → (7.3); $\ell(\mu,v)\le\ell(\bar x,v)$.
- **Vị trí:** phương pháp của sườn (tách tâm). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** #20: tên bước 1 ở đầu dòng, "Do $\sum_i(x_i-\bar x)=0$" vào câu dẫn; bước 2 dòng riêng. D1: bỏ `\tag{7.3}`, gọi "đẳng thức tách tâm"; dòng lộ trình đặt tên đẳng thức. Đo lại: khối tách tâm viết một dòng để hết tràn 26 px ở 1600×900.
- **Sửa (rà lại vòng 1):** R1: "Viết $x_i-\mu=(x_i-\bar x)+(\bar x-\mu)$; số hạng chéo bằng $0$ vì $\sum_i(x_i-\bar x)=0$:".
- **Nguồn:** L653–680. Murphy §4.2.5, PDF 141–142.
- **Phác thảo:** (1) Đẳng thức tách tâm cho trung bình tối ưu không phụ thuộc $v$; sau đó tối ưu $v$. (16) (2) Tổng bình phương tách thành $Q+n(\mu-\bar x)^2$. Viết $x_i-\mu=(x_i-\bar x)+(\bar x-\mu)$; số hạng chéo bằng $0$ vì $\sum_i(x_i-\bar x)=0$: (11) (3) display $$\sum_{i=1}^n(x_i-\mu)^2=Q+2(\bar x-\mu)\sum_{i=1}^n(x_i-\bar x)+n(\bar x-\mu)^2=Q+n(\mu-\bar x)^2.$$ (4) $\ell(\mu,v)\le\ell(\bar x,v)$ với mọi $v>0$. Thế đẳng thức tách tâm vào log-hợp lý Gaussian: (11) (5) display $$\ell(\mu,v;D)=-\frac n2\log(2\pi v)-\frac Q{2v}-\frac{n(\mu-\bar x)^2}{2v}.$$ (6) Số hạng cuối $\le0$, bằng $0$ khi và chỉ khi $\mu=\bar x$. (8) Số đo sau rà lại vòng 1: 46 âm tiết, 6 dòng, 2 công thức hiển thị, dòng dài nhất 16.
- **Ghi chú diễn giả:** Đẳng thức tách tâm đúng với mọi số thực $x_1,\ldots,x_n$ và mọi $\mu$. Nó được dùng lại cho biến ngẫu nhiên trong chứng minh hiệu chỉnh phương sai mẫu, và cho dạng toàn phương trong Gaussian nhiều chiều. Với $v$ cố định, cực tiểu âm log-hợp lý theo $\mu$ là cực tiểu tổng bình phương sai lệch $\sum_i(x_i-\mu)^2$: đó là nguồn gốc xác suất của mất mát bình phương.

#### G105 — Chứng minh: Gaussian một chiều, phương sai tối ưu
- **Lý do tồn tại:** P4, bước 2–4: phương sai tối ưu, ghép, trường hợp $Q=0$.
- **Nhu cầu/khoảng trống:** sau khi thế $\mu=\bar x$, còn bài toán một biến $v>0$ trên tập mở.
- **Đầu vào → đầu ra:** G104 → (7.2) đã chứng minh; hợp lý không bị chặn khi $Q=0$.
- **Vị trí:** kết quả và giới hạn của sườn (không suy biến). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #10: $g(v)$ đổi thành $\varphi(v)$ vì $g(\theta)$ là đại lượng cần ước lượng ở G109. #16: tên bước theo kết quả.
- **Sửa (rà soát):** #46: lý do đổi $g\to\varphi$ chuyển sang `review-log.md`; `p.note-source` ghi "ghi chú bài giảng viết $g$".
- **Sửa (đồng bộ materials):** `p.note-source` bỏ "ghi chú bài giảng viết $g$ cho $\varphi$": ghi chú nay viết $\varphi(v)$.
- **Nguồn:** L682–704. Murphy §4.2.5 (4.36)–(4.38), PDF 142.
- **Phác thảo:** (1) $Q/n$ cực đại $\varphi(v)=-\frac n2\log v-\frac Q{2v}$. Đạo hàm: (4) (2) display $$\varphi'(v)=-\frac n{2v}+\frac Q{2v^2}=\frac{Q-nv}{2v^2}.$$ (3) $\varphi'>0$ khi $v<Q/n$, $\varphi'<0$ khi $v>Q/n$; giả thiết $Q>0$ cho $Q/n$ thuộc miền $v>0$. (7) (4) Cực đại duy nhất tại $(\bar x,Q/n)$. $\ell(\mu,v;D)\le\ell(\bar x,v;D)\le\ell(\bar x,Q/n;D)$; dấu bằng chỉ khi $\mu=\bar x$, $v=Q/n$. (9) (5) $Q=0$: hợp lý không bị chặn. $\ell(\bar x,v;D)=-\frac n2\log(2\pi v)\to+\infty$ khi $v\downarrow0$; không điểm nào đạt cực đại. (12) Số đo sau rà soát: 32 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 12.
- **Ghi chú diễn giả:** Sau khi thế $\mu=\bar x$, $\ell(\bar x,v;D)=-\frac n2\log(2\pi)+\varphi(v)$. Hàm $\varphi$ tăng chặt trên $(0,Q/n]$ và giảm chặt trên $[Q/n,\infty)$. Khi $Q=0$, với mọi $(\mu,v)$ có $v'>0$ đủ nhỏ cho $\ell(\bar x,v';D)>\ell(\mu,v;D)$. Khi học cả $v$, số hạng $\frac n2\log v$ của âm log-hợp lý phải được giữ: bỏ nó, phần còn lại $Q/(2v)$ giảm về $0$ khi $v\to\infty$ và không có điểm cực tiểu.

#### G106 — Ví dụ: năm độ lệch nhiệt độ
- **Lý do tồn tại:** ví dụ áp dụng Định lý 11.9 trên ví dụ xuyên suốt; so sánh với Gaussian hẹp hơn.
- **Nhu cầu/khoảng trống:** con số $\hat\sigma^2=2$ và lý do $\mathcal N(2,1)$ kém hơn.
- **Đầu vào → đầu ra:** G101, G103 → $\hat\mu=2$, $\hat\sigma^2=2$; $\ell(2,2)$, $\ell(2,1)$.
- **Vị trí:** ví dụ xuyên suốt một chiều. **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #20: bỏ dấu hai chấm lộ, viết thành câu có "vì". #6 (phương án A): trang chỉ tính $\hat\mu$, $\hat\sigma^2$ và so hai hợp lý; phương sai không chệch để G112.
- **Nguồn:** Ví dụ 11.5 L712–741.
- **Phác thảo:** (1) $D=(0,1,2,3,4)$, năm sản phẩm lấy độc lập; mô hình i.i.d. $\mathcal N(\mu,v)$. (6) (2) Tính $\hat\mu$, $\hat\sigma^2$; so log-hợp lý với $v=1$. (7) (3) $\bar x=10/5=2$; sai lệch $(-2,-1,0,1,2)$, $Q=10>0$; $\hat\mu=2$, $\hat\sigma^2=10/5=2$. (2) (4) display `aligned`: $\ell(2,2;D)=-\tfrac52\log(4\pi)-\tfrac{10}4\approx-8{,}828$; $\ell(2,1;D)=-\tfrac52\log(2\pi)-\tfrac{10}2\approx-9{,}595$. (5) **Diễn giải:** $\mathcal N(2,1)$ cao hơn ở tâm nhưng kém khoảng $0{,}77$ log-hợp lý vì hai điểm $0$ và $4$ bị phạt nặng hơn. (20) ≈35 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** mật độ đã khớp $\hat f(x)=\frac1{\sqrt{4\pi}}\exp[-(x-2)^2/4]$, độ lệch chuẩn $\sqrt2\approx1{,}41$ (L719–722, L740). Kiểm tra lại: tổng các sai lệch bằng $0$ và $Q-n\hat\sigma^2=0$, đúng hai điều kiện $\partial\ell/\partial\mu=0$, $\partial\ell/\partial v=0$ (L738).

#### G107 — Mất mát từ giả thiết nhiễu
- **Lý do tồn tại:** ứng dụng của Mệnh đề 11.3 cho số đo liên tục; so hai mô hình nhiễu trên cùng số liệu (Q-K); bằng chứng cho mục tiêu 6 và cho cầu nối cuối bài (L1497).
- **Nhu cầu/khoảng trống:** người học cần thấy đổi giả thiết phân phối thì đổi mất mát và đổi tham số học được.
- **Đầu vào → đầu ra:** HL06, G104 → bảng hai mô hình: bình phương/trung bình $3$; trị tuyệt đối/trung vị $0$.
- **Vị trí:** ứng dụng AI của sườn. **Mục tiêu:** 6.
- **Quyết định:** `thêm`; bảng so sánh có trần 80 âm tiết; phép tính từng khúc của $h(\mu)$ trong ghi chú diễn giả (Q-K). Ứng viên cắt thứ ba (Q-H). **Bài tập:** không.
- **Sửa (cổng):** #20: dòng "Diễn giải:" cụ thể hóa bằng hai con số; câu chung "đổi giả thiết thì đổi mất mát" chuyển vào ghi chú diễn giả.
- **Sửa (rà soát):** #7: tham số Laplace đổi thành $\beta$. #17: "Diễn giải:" nêu nguyên lý và hai con số. #18: ghi chú diễn giả dùng $\psi(\mu)$.
- **Sửa (đồng bộ materials):** `p.note-source` bỏ câu về tham số Laplace $b$: ghi chú nay viết $\beta$ và $\psi(\mu)$.
- **Nguồn:** L706–708; Ví dụ 11.6 L743–773. Murphy §2.7.3 (2.134)–(2.135), PDF 93 (mật độ Laplace; ý trung vị không có trong mục đã đọc, chỉ dựa vào ghi chú).
- **Phác thảo:** (1) Nhu cầu: chọn mất mát cho $\mu$ từ giả thiết về nhiễu $x_i=\mu+\varepsilon_i$, $\varepsilon_i$ độc lập. (13) (2) bảng (3) Diễn giải: đổi giả thiết nhiễu thì đổi mất mát; số đo $9$ kéo trung bình lên $3$, trung vị ở lại $0$. (20) Số đo sau rà soát: 54 âm tiết, 3 dòng, 0 công thức hiển thị, dòng dài nhất 20.
- **Ghi chú diễn giả:** Mỗi mất mát là âm log-hợp lý, theo tương đương giữa hợp lý cực đại và rủi ro thực nghiệm, sau khi bỏ hằng số và hệ số dương. Với nhiễu Gaussian: $\frac n2\log(2\pi v)+\frac1{2v}\sum_i(x_i-\mu)^2$; với nhiễu Laplace: $\sum_i[\log(2\beta)+|x_i-\mu|/\beta]$. Nghiệm Gaussian là $\bar x=(0+0+9)/3=3$, theo bước tách tâm. Với Laplace, $\psi(\mu)=2|\mu|+|9-\mu|$ bằng $9-3\mu$ khi $\mu<0$, $9+\mu$ khi $0\le\mu\le9$, $3\mu-9$ khi $\mu>9$, nên cực tiểu duy nhất tại $\mu=0$, $\psi(0)=9$. Kiểm tra: $\psi(3)=12>9$; với Gaussian, $81>54$. Dưới mô hình Laplace, mật độ giảm theo $|\varepsilon|$ thay vì $\varepsilon^2$, nên số đo $9$ ít ảnh hưởng tới nghiệm hơn.

#### G108 — Hai mẫu số của phương sai
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập và trực quan của cụm độ chệch; đặt "Câu hỏi:" mà G110 trả lời.
- **Nhu cầu/khoảng trống:** $Q/n$ tối ưu trên một mẫu, nhưng chưa biết hành vi qua các lần lấy mẫu.
- **Đầu vào → đầu ra:** G104 ((7.3)) → câu hỏi $n$ hay $n-1$.
- **Vị trí:** tiêu chuẩn thứ hai của sườn. **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** #4: "Nhu cầu:" đặt $Q_X$; ghi chú diễn giả nói "bộ ước lượng $Q_X/n$". #5: dòng so tổng bình phương sai lệch viết lại cho đúng nghĩa. D1: "đẳng thức tách tâm" thay "(7.3)".
- **Nguồn:** L775–779. Murphy §4.7.6.1, PDF 190. **Mẫu (chỉ planning):** MAT1101 b10.1 S16.
- **Phác thảo:** (1) Nhu cầu: đánh giá bộ ước lượng $Q_X/n$, $Q_X=\sum_i(X_i-\bar X)^2$, qua các lần lấy mẫu lặp lại. (14) (2) Với $n=1$: $Q=0$, nên $Q/n=0$ với mọi dữ liệu. (6) (3) Trực quan. Theo đẳng thức tách tâm, $\sum_i(x_i-\mu)^2=Q+n(\mu-\bar x)^2\ge Q$. (7) (4) Tổng bình phương sai lệch quanh $\bar x$ không vượt tổng quanh $\mu$ thật, nên $Q_X/n$ có xu hướng nhỏ hơn $\sigma^2$. (17) (5) Câu hỏi: Khi ước lượng phương sai, chia $Q$ cho $n$ hay cho $n-1$? (11) Số đo sau rà soát: 55 âm tiết, 5 dòng, 0 công thức hiển thị, dòng dài nhất 17.
- **Ghi chú diễn giả:** Bộ ước lượng $Q_X/n$ cho nghiệm hợp lý cực đại trên mỗi mẫu cố định. Với $n=1$ nó cho $0$ bất kể phương sai thật. Để trả lời câu hỏi, cần đo hành vi của bộ ước lượng qua các lần lấy mẫu, tức kỳ vọng dưới phân phối của mô hình.

#### G109 — Độ chệch và tính không chệch
- **Lý do tồn tại:** bước hình thức của cụm độ chệch (Định nghĩa 11.10).
- **Nhu cầu/khoảng trống:** G108 cần tiêu chuẩn đúng với mọi giá trị tham số.
- **Đầu vào → đầu ra:** G108 → $\operatorname{Bias}_\theta(T)$, tính không chệch.
- **Vị trí:** tiêu chuẩn thứ hai của sườn. **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #10: khai báo $g:\Theta\to\mathbb R$.
- **Sửa (rà soát):** #41: nguồn thêm Murphy §4.7.6.2.
- **Nguồn:** Định nghĩa 11.10 L781–794. Murphy §4.7.6.1 (4.232), PDF 189–190.
- **Phác thảo:** (1) Nhắc lại: ước lượng $\hat\mu$ của $\mu$ là không chệch nếu $\mathbb E\hat\mu=\mu$. (9) (2) Định nghĩa. Cho mô hình $\{P_\theta\}$, mẫu i.i.d. theo $P_\theta$, bộ ước lượng $T$ của $g(\theta)$, với $g:\Theta\to\mathbb R$ và $\mathbb E_\theta|T|<\infty$. (14) (3) Độ chệch (bias) của $T$ tại $\theta$ là $\operatorname{Bias}_\theta(T)=\mathbb E_\theta[T]-g(\theta)$. (6) (4) $T$ là không chệch (unbiased) nếu $\operatorname{Bias}_\theta(T)=0$ với mọi $\theta\in\Theta$. (7) (5) Lưu ý: hợp lý cực đại xét một mẫu cố định; độ chệch xét $T$ qua các lần lấy mẫu. (19) Số đo sau rà soát: 55 âm tiết, 5 dòng, 0 công thức hiển thị, dòng dài nhất 19.
- **Ghi chú diễn giả:** $\mathbb E_\theta$ là kỳ vọng khi $X_1,\ldots,X_n$ i.i.d. theo $P_\theta$. Khi $T$ và $g(\theta)$ là vector hoặc ma trận, kỳ vọng và đẳng thức hiểu theo từng phần tử. So với Định nghĩa 05c.34, định nghĩa thêm hai điều: kỳ vọng lấy dưới từng phân phối của mô hình, và tính không chệch phải đúng với mọi giá trị tham số, vì tham số thật chưa biết. Một bộ ước lượng không chệch vẫn có thể xa tham số thật trên một mẫu: khi $\mathbb EX_i=\mu$, quan sát đầu tiên $X_1$ không chệch nhưng bỏ qua $n-1$ quan sát còn lại.

#### G110 — Hiệu chỉnh phương sai mẫu
- **Lý do tồn tại:** phát biểu Mệnh đề 11.11, trả lời "Câu hỏi:" của G108.
- **Nhu cầu/khoảng trống:** độ chệch của $Q/n$ cần một công thức chính xác.
- **Đầu vào → đầu ra:** G109 → (7.4).
- **Vị trí:** kết quả của sườn (tiêu chuẩn thứ hai). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #20: thay động từ giả "phục vụ" bằng phát biểu cụ thể.
- **Sửa (rà soát):** #4: "Ý nghĩa:" phân biệt $Q$ (số, dưới mô hình Gaussian) và $Q_X$ (biến ngẫu nhiên); ghi chú diễn giả bỏ nhãn "Nghĩa vận hành:". D1: bỏ `\tag{7.4}`.
- **Nguồn:** L796–817; L854. Murphy §4.7.6.1 (4.233)–(4.236), PDF 190. **Mẫu (chỉ planning):** MAT1101 b10.1 S16, S21 (không chép lỗi S16).
- **Phác thảo:** (1) Mệnh đề. Giả thiết: $X_1,\ldots,X_n$ mẫu i.i.d., $n\ge2$, $\mathbb EX_i=\mu$, $\operatorname{Var}X_i=\sigma^2<\infty$; $Q_X=\sum_i(X_i-\bar X)^2$. (6) (2) Kết luận: (2) (3) display $$\mathbb E[Q_X]=(n-1)\sigma^2,\qquad\mathbb E\Bigl[\frac{Q_X}n\Bigr]=\frac{n-1}n\sigma^2,\qquad\mathbb E\Bigl[\frac{Q_X}{n-1}\Bigr]=\sigma^2.$$ (4) $Q_X/n$ có độ chệch $-\sigma^2/n$; $Q_X/(n-1)$ không chệch; không cần giả thiết Gaussian. (10) (5) Ý nghĩa: dưới mô hình Gaussian, $Q/n$ cực đại hợp lý; qua các lần lấy mẫu, $Q_X/(n-1)$ có kỳ vọng bằng $\sigma^2$. (19) Số đo sau rà soát: 37 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 19.
- **Ghi chú diễn giả:** Mẫu số phụ thuộc tiêu chuẩn: cần nghiệm hợp lý cực đại của mô hình Gaussian thì chia cho $n$; cần bộ ước lượng không chệch của phương sai thì chia cho $n-1$. Độ chệch $-\sigma^2/n$ tiến về $0$ khi $n$ tăng, nên với mẫu lớn hai ước lượng gần nhau. Khi lặp lại việc lấy mẫu $n$ sản phẩm nhiều lần, kỳ vọng của $Q_X/(n-1)$ qua các lần lấy mẫu đúng bằng $\sigma^2$, còn kỳ vọng của $Q_X/n$ là $\frac{n-1}n\sigma^2$.

#### G111 — Chứng minh: hiệu chỉnh phương sai mẫu
- **Lý do tồn tại:** P5 (Q-C).
- **Nhu cầu/khoảng trống:** người học cần thấy lượng $\sigma^2$ bị mất khi đo quanh $\bar X$.
- **Đầu vào → đầu ra:** G104 ((7.3)), Bài 10 ($\operatorname{Var}\bar X$) → (7.4) đã chứng minh.
- **Vị trí:** kết quả của sườn. **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** D1: "đẳng thức tách tâm" thay "(7.3)"; "được hai kỳ vọng còn lại" thay "được (7.4)".
- **Nguồn:** L819–852. Murphy §4.7.6.1 (4.233)–(4.236), PDF 190 (không chứng minh).
- **Phác thảo:** (1) Tách $Q_X$ quanh $\mu$, rồi lấy kỳ vọng từng phần. (8) (2) $Q_X=\sum_i(X_i-\mu)^2-n(\bar X-\mu)^2$. Đẳng thức tách tâm đúng với mọi số thực; áp dụng cho $X_i(\omega)$ và $\mu=\mathbb EX_i$. (13) (3) $\mathbb E(\bar X-\mu)^2=\sigma^2/n$. Độc lập, mômen hữu hạn cho không tương quan; $\operatorname{Var}\bar X=\sigma^2/n$ (Mệnh đề 10.26). (12) (4) $\mathbb EQ_X=(n-1)\sigma^2$. (0) (5) display $$\mathbb EQ_X=\sum_{i=1}^n\mathbb E(X_i-\mu)^2-n\,\mathbb E(\bar X-\mu)^2=n\sigma^2-\sigma^2.$$ (6) Chia cho $n$ và cho $n-1\ge1$ được hai kỳ vọng còn lại; không bước nào dùng giả thiết Gaussian. (17) Số đo sau rà soát: 49 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 17.
- **Ghi chú diễn giả:** $\mathbb E[(X_i-\mu)^2]=\operatorname{Var}X_i=\sigma^2$ theo định nghĩa phương sai. Các $X_i$ độc lập và có mômen bậc hai hữu hạn nên không tương quan đôi một (Mệnh đề 10.27; Phụ lục B.2 của Bài 10 cho biến có mật độ). Mệnh đề 10.26 với mọi hiệp phương sai bằng $0$ cho $\operatorname{Var}\bigl(\sum_iX_i\bigr)=n\sigma^2$, rồi Mệnh đề 10.24 cho $\operatorname{Var}\bar X=\sigma^2/n$. Vì $\mathbb E\bar X=\mu$, $\mathbb E[(\bar X-\mu)^2]=\operatorname{Var}\bar X$. Bước lấy kỳ vọng dùng tính tuyến tính (Mệnh đề 10.22). Đo sai lệch quanh trung bình mẫu thay vì trung bình thật làm mất đúng một lượng $\sigma^2$ trong kỳ vọng của tổng bình phương, và mẫu số $n-1$ bù lại lượng đó.

#### G112 — Bài tập: hai mẫu số trên năm độ lệch nhiệt độ
- **Lý do tồn tại:** bài có lời giải trên mặt trang của mạch 4 (Q-B), dùng số của Ví dụ 11.7; ứng dụng của cụm độ chệch.
- **Nhu cầu/khoảng trống:** người học tự tính hai mẫu số trên cùng $Q$ và kiểm tra hệ số $(n-1)/n$.
- **Đầu vào → đầu ra:** G106, G110 → $2$ và $2{,}5$; tỉ số $0{,}8$.
- **Vị trí:** kiểm tra mạch 4; ví dụ xuyên suốt một chiều. **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** có lời giải trên mặt trang (fragment).
- **Sửa (cổng):** #6 (phương án A): đề chỉ cho dữ liệu; người học tự tính lại $\bar x$, $Q$ và hai ước lượng; một dòng diễn giải.
- **Sửa (rà soát):** D1: "kiểm tra tỉ số $(n-1)/n$" thay "với (7.4)" (dòng 21 → 18 âm tiết).
- **Nguồn:** L856–870.
- **Phác thảo:** (1) Câu hỏi: Năm độ lệch nhiệt độ $D=(0,1,2,3,4)$. (7) (2) Tính $\bar x$, $Q$, phương sai hợp lý cực đại, phương sai không chệch; kiểm tra tỉ số $(n-1)/n$. (15) (3) Lời giải: $\bar x=2$; sai lệch $(-2,-1,0,1,2)$, $Q=10$. (4) (4) $Q/n=10/5=2$; $Q/(n-1)=10/4=2{,}5$; tỉ số $2/2{,}5=0{,}8=(n-1)/n$. (2) (5) Diễn giải: $2$ là phương sai của Gaussian khớp dữ liệu nhất; $2{,}5$ là giá trị của bộ ước lượng không chệch. (20) Số đo sau rà soát: 48 âm tiết, 5 dòng, 0 công thức hiển thị, dòng dài nhất 20.
- **Ghi chú diễn giả:** Hai số tính từ cùng $Q=10$. Số $2$ là phương sai của mô hình Gaussian khớp dữ liệu tốt nhất; số $2{,}5$ là giá trị trên mẫu này của bộ ước lượng có kỳ vọng đúng bằng phương sai thật qua các lần lấy mẫu. Cả hai mẫu số đều được dùng trong tính toán: NumPy mặc định tính phương sai với mẫu số $n$, pandas mặc định dùng $n-1$. Khi so phương sai từ hai công cụ trên cùng dữ liệu, cần biết công cụ dùng mẫu số nào. Bài tập tự học 11.6 luyện thêm phần này.

### Mạch 5 · Ước lượng Gaussian nhiều chiều

#### GN00 — 5. Ước lượng Gaussian nhiều chiều (trang tiêu đề mạch, `id="mach-5"`)
- **Lý do tồn tại:** mở mạch 5 và nêu câu hỏi trung tâm cùng phân rã.
- **Nhu cầu/khoảng trống:** hai số đo của cùng sản phẩm có thể cùng tăng hoặc cùng giảm; phương sai từng tọa độ không ghi được điều đó (L872).
- **Đầu vào → đầu ra:** G104, G105, G111 → nhiệm vụ: ước lượng $(\mu,\Sigma)$ và điều kiện tồn tại.
- **Vị trí:** điểm vào mạch 5; đảm nhận bước nhu cầu của cụm hiệp phương sai; phần việc: đặt câu hỏi trung tâm của mạch 5 và phân rã. **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #22: thêm trường "Nguồn" và phần việc.
- **Nguồn:** L872–880. Murphy §4.2.6, PDF 142–144.
- **Phác thảo:** h2 "5. Ước lượng Gaussian nhiều chiều"; dòng dẫn "Muốn ước lượng trung bình và ma trận hiệp phương sai từ dữ liệu nền, cần biết khi nào nghiệm tồn tại." (22); từ khóa "Ma trận hiệp phương sai · Hiệp phương sai mẫu · Ma trận độ chính xác · Điều kiện tồn tại".
- **Ghi chú diễn giả (≈80 âm tiết):** mạch kế thừa phép tách tâm và điều kiện $Q>0$ của Gaussian một chiều, cùng bất đẳng thức $\log t\le t-1$ của ước lượng phân loại. Nhiệm vụ: thay phương sai bằng ma trận hiệp phương sai, thay bình phương bằng tích ngoài, rồi tìm cực đại trên tập ma trận xác định dương. Mạch giao cho mạch sau $\hat\mu=(10,20)^\top$, $\hat\Sigma=S_4$ và $\hat\Sigma^{-1}$ của dữ liệu cảm biến nền.

#### GN01 — Phương sai từng tọa độ của dữ liệu cảm biến nền
- **Lý do tồn tại:** nhu cầu, ví dụ dẫn nhập và trực quan của cụm hiệp phương sai; nối lại bài toán trung tâm.
- **Nhu cầu/khoảng trống:** áp dụng Định lý 11.9 cho từng tọa độ cho hai phương sai bằng nhau, không phân biệt hướng $(1,1)^\top$ với $(1,-1)^\top$.
- **Đầu vào → đầu ra:** MD03, G103 → nhu cầu một đại lượng ghi xu hướng cùng biến động.
- **Vị trí:** ví dụ xuyên suốt cảm biến; phần việc: "mức phân tán theo mọi hướng". **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #2: "Nhu cầu:" thêm điều kiện tồn tại nghiệm.
- **Sửa (rà soát):** #13: tiêu đề và dòng "Trực quan." dùng "phương sai từng tọa độ".
- **Nguồn:** L876–880 (không chép câu rào đón L880, Q-J). Murphy §4.2.6, PDF 142.
- **Phác thảo:** (1) Nhu cầu: ước lượng $\mu$, $\Sigma$ từ bốn vector nền; xác định khi nào nghiệm tồn tại. (15) (2) $x_1=(12,22)^\top$, $x_2=(8,18)^\top$, $x_3=(11,19)^\top$, $x_4=(9,21)^\top$. (0) (3) Tọa độ 1: trung bình $10$, sai lệch $(2,-2,1,-1)$; tọa độ 2: trung bình $20$, sai lệch $(2,-2,-1,1)$. (14) (4) Cả hai tọa độ có phương sai hợp lý cực đại $(4+4+1+1)/4=5/2$. (11) (5) Trực quan. Đám điểm kéo dài theo $(1,1)^\top$, hẹp theo $(1,-1)^\top$; phương sai từng tọa độ không ghi hướng này. (18) Số đo sau rà soát: 56 âm tiết, 5 dòng, 0 công thức hiển thị, dòng dài nhất 18.
- **Ghi chú diễn giả:** Áp dụng định lý Gaussian một chiều cho từng tọa độ cho hai phương sai bằng nhau, nên không phân biệt được hướng $(1,1)^\top$, dọc theo đó dữ liệu trải rộng, với hướng $(1,-1)^\top$, dọc theo đó dữ liệu tập trung. Để trả lời câu hỏi mở đầu cần một đại lượng ghi cả mức phân tán của từng tọa độ lẫn xu hướng hai tọa độ cùng biến động. Ma trận hiệp phương sai ghi hướng đó qua các phần tử ngoài đường chéo; trị riêng và vector riêng của nó cho hướng và độ dài các trục phân tán.

#### GN02 — Ma trận hiệp phương sai
- **Lý do tồn tại:** bước hình thức (Định nghĩa 11.12) và phương sai theo hướng (8.2).
- **Nhu cầu/khoảng trống:** GN01 cần một ma trận chứa mọi hiệp phương sai giữa các tọa độ.
- **Đầu vào → đầu ra:** GN01, Bài 10 (hiệp phương sai hai biến) → $\operatorname{Cov}(X)$, $\operatorname{Cov}(X)\succeq0$.
- **Vị trí:** đối tượng của sườn (họ thứ tư). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** D1: bỏ `\tag{8.1}`, `\tag{8.2}`; ghi chú diễn giả gọi tên đẳng thức. #46: bỏ "deck" làm chủ ngữ.
- **Sửa (rà lại vòng 1):** R10: ghi chú diễn giả "sự kiện này được thừa nhận (Murphy (2022), §3.2.1)".
- **Nguồn:** Định nghĩa 11.12 L882–917; L929. Murphy §3.2.1 (3.12)–(3.15), PDF 111. **Mẫu (chỉ planning):** MAT1101 b11 S20.
- **Phác thảo:** (1) Định nghĩa. Cho $X\in\mathbb R^d$ có $\mathbb E[(X^{(j)})^2]<\infty$; vector kỳ vọng $\mathbb EX$ lấy theo từng tọa độ. (12) (2) Ma trận hiệp phương sai (covariance matrix) của $X$ là ma trận $d\times d$ (11) (3) display $$\operatorname{Cov}(X)=\mathbb E\bigl[(X-\mathbb EX)(X-\mathbb EX)^\top\bigr].$$ (4) Phần tử $(j,k)$ là $\operatorname{Cov}(X^{(j)},X^{(k)})$; đường chéo là các phương sai; ma trận đối xứng. (13) (5) display $$\operatorname{Var}(w^\top X)=w^\top\operatorname{Cov}(X)\,w\ge0.$$ (6) Đẳng thức đúng với mọi $w\in\mathbb R^d$, nên $\operatorname{Cov}(X)\succeq0$. (6) Số đo sau rà lại vòng 1: 42 âm tiết, 6 dòng, 2 công thức hiển thị, dòng dài nhất 13.
- **Ghi chú diễn giả:** Phần tử ngoài đường chéo dương khi hai tọa độ có xu hướng cùng lệch về một phía so với kỳ vọng. Khi $d=1$, ma trận hiệp phương sai là phương sai. Đẳng thức $\operatorname{Var}(w^\top X)=w^\top\operatorname{Cov}(X)\,w$ suy từ tính tuyến tính của kỳ vọng: $\operatorname{Var}(w^\top X)=\mathbb E[(w^\top(X-\mathbb EX))^2]=\mathbb E[w^\top(X-\mathbb EX)(X-\mathbb EX)^\top w]$. Dạng khác: $\operatorname{Cov}(X)=\mathbb E[XX^\top]-\mathbb EX\,(\mathbb EX)^\top$. Nếu $X\sim\mathcal N(\mu,\Sigma)$ thì $\mathbb EX=\mu$ và $\operatorname{Cov}(X)=\Sigma$; sự kiện này được thừa nhận (Murphy (2022), §3.2.1).

#### GN03 — Hiệp phương sai mẫu
- **Lý do tồn tại:** bước hình thức (Định nghĩa 11.13), (8.4) và điều kiện $S_n\succ0$.
- **Nhu cầu/khoảng trống:** khi tham số chưa biết, thay kỳ vọng bằng trung bình trên dữ liệu; cần biết khi nào $S_n$ khả nghịch.
- **Đầu vào → đầu ra:** GN02 → $S_n$ (8.3), $S_n\succeq0$, điều kiện $S_n\succ0$.
- **Vị trí:** đối tượng và giả thiết không suy biến của sườn. **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #4: thêm "Trực quan." trước định nghĩa ($S_n$ là ứng viên cho $\Sigma$ như $Q/n$ cho $\sigma^2$).
- **Sửa (rà soát):** #22: "cần nhưng không đủ". D1: bỏ `\tag{8.3}`; ghi chú diễn giả không dẫn "(8.4)".
- **Nguồn:** Định nghĩa 11.13 L931–957. Murphy §4.2.6.2 (4.46), (4.51), PDF 143–144 (ma trận phân tán $S_y$ không chia $N$; $\hat\Sigma=S_y/N$).
- **Phác thảo:** (1) Trực quan. Thay kỳ vọng trong $\operatorname{Cov}(X)$ bằng trung bình trên dữ liệu, như $Q/n$ thay cho $\sigma^2$. (15) (2) Định nghĩa. Với $x_1,\ldots,x_n\in\mathbb R^d$, $\bar x=\frac1n\sum_ix_i$; hiệp phương sai mẫu (sample covariance) mẫu số $n$ là (12) (3) display $$S_n=\frac1n\sum_{i=1}^n(x_i-\bar x)(x_i-\bar x)^\top.$$ (4) Mỗi số hạng là một tích ngoài (outer product); khi $d=1$, $S_n=Q/n$; $S_n$ là ứng viên cho $\Sigma$. (14) (5) $S_n\succ0$ khi và chỉ khi các $\tilde x_i=x_i-\bar x$ sinh ra $\mathbb R^d$; điều kiện $n>d$ cần nhưng không đủ. (13) Số đo sau rà soát: 54 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 15.
- **Ghi chú diễn giả:** Với mọi $w\in\mathbb R^d$, $w^\top S_nw=\frac1n\sum_i(w^\top\tilde x_i)^2\ge0$, nên $S_n\succeq0$, và $w^\top S_nw$ là phương sai mẫu, mẫu số $n$, của các hình chiếu $w^\top x_i$. Mỗi tích ngoài là ma trận $d\times d$ có hạng không quá $1$. Theo đẳng thức này, $w^\top S_nw=0$ khi và chỉ khi $w$ vuông góc với mọi $\tilde x_i$. Vì $\sum_i\tilde x_i=0$, các $\tilde x_i$ sinh ra không gian có số chiều không quá $\min(d,n-1)$; ba điểm thẳng hàng trong $\mathbb R^2$ có $n=3>2$ mà các $\tilde x_i$ chỉ sinh ra một đường thẳng.

#### GN04 — Ví dụ: hiệp phương sai mẫu của dữ liệu cảm biến nền
- **Lý do tồn tại:** ví dụ của cụm hiệp phương sai trên ví dụ xuyên suốt; kiểm tra $S_4\succ0$.
- **Nhu cầu/khoảng trống:** tính $S_4$ và đọc phần tử ngoài đường chéo.
- **Đầu vào → đầu ra:** GN01, GN03 → $S_4$, trị riêng $4$ và $1$.
- **Vị trí:** ví dụ xuyên suốt cảm biến. **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** #45: "Diễn giải:" viết thành câu ("nghĩa là"). #13: ghi chú diễn giả "phương sai từng tọa độ".
- **Nguồn:** Ví dụ 11.8 L959–999.
- **Phác thảo:** (1) Bốn vector nền $(12,22)^\top$, $(8,18)^\top$, $(11,19)^\top$, $(9,21)^\top$; tính $S_4$, kiểm tra $S_4\succ0$. (6) (2) $\bar x=(10,20)^\top$; $\tilde x_1=(2,2)^\top$, $\tilde x_2=(-2,-2)^\top$, $\tilde x_3=(1,-1)^\top$, $\tilde x_4=(-1,1)^\top$. (0) (3) display $$\tilde x_1\tilde x_1^\top=\tilde x_2\tilde x_2^\top=\begin{pmatrix}4&4\\4&4\end{pmatrix},\qquad\tilde x_3\tilde x_3^\top=\tilde x_4\tilde x_4^\top=\begin{pmatrix}1&-1\\-1&1\end{pmatrix},$$ (4) display $$S_4=\frac14\begin{pmatrix}10&6\\6&10\end{pmatrix}=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}.$$ (5) Trị riêng $4$ và $1$, đều dương, nên $S_4\succ0$. (6) (6) Diễn giải: phần tử $3/2>0$ nghĩa là hai số đo có xu hướng cùng tăng hoặc cùng giảm. (17) Số đo sau rà soát: 29 âm tiết, 6 dòng, 2 công thức hiển thị, dòng dài nhất 17.
- **Ghi chú diễn giả:** Hai phần tử đường chéo bằng $5/2$, trùng phương sai hợp lý cực đại của từng tọa độ. Trị riêng: $S_4(1,1)^\top=(4,4)^\top$ và $S_4(1,-1)^\top=(1,-1)^\top$. Cũng vậy, $\tilde x_1$ và $\tilde x_3$ độc lập tuyến tính nên các $\tilde x_i$ sinh ra $\mathbb R^2$. Phần tử ngoài đường chéo ghi điều mà phương sai từng tọa độ không ghi. Vì $S_4\succ0$, ma trận này là một ứng viên hợp lệ cho $\Sigma$; định lý tiếp theo cho biết nó cực đại hợp lý.

#### GN05 — Ước lượng hợp lý cực đại Gaussian nhiều chiều
- **Lý do tồn tại:** phát biểu Định lý 11.14, kết quả trung tâm của mạch.
- **Nhu cầu/khoảng trống:** nghiệm của bài toán cực đại trên tập ma trận xác định dương và điều kiện tồn tại.
- **Đầu vào → đầu ra:** GN03, GN04 → (8.6); không có nghiệm khi $S_n$ suy biến.
- **Vị trí:** kết quả của sườn (họ thứ tư). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #22: tiêu đề đổi thành "Ước lượng hợp lý cực đại Gaussian nhiều chiều", khác tên mạch 5. #4: trực quan ở GN03, câu nối từ GN04.
- **Sửa (rà soát):** D1: bỏ `\tag{8.6}`.
- **Nguồn:** L919–927; L1001–1038. Murphy §4.2.6 (4.39), PDF 142; §4.2.6.1–4.2.6.2 (4.40)–(4.51), PDF 143–144.
- **Phác thảo:** (1) Nhắc lại: với $\mu\in\mathbb R^d$, $\Sigma\succ0$ đối xứng, mật độ của $\mathcal N(\mu,\Sigma)$ là (9) (2) display $$f_{\mu,\Sigma}(x)=\frac1{(2\pi)^{d/2}(\det\Sigma)^{1/2}}\exp\Bigl[-\frac12(x-\mu)^\top\Sigma^{-1}(x-\mu)\Bigr].$$ (3) Định lý. Giả thiết: $x_1,\ldots,x_n\in\mathbb R^d$ mẫu i.i.d. $\mathcal N(\mu,\Sigma)$; miền $\mu\in\mathbb R^d$, $\Sigma\succ0$ đối xứng. (9) (4) Kết luận: nếu $S_n\succ0$, log-hợp lý có đúng một điểm cực đại (11) (5) display $$\hat\mu=\bar x,\qquad\hat\Sigma_{\mathrm{MLE}}=S_n.$$ (6) Nếu $S_n$ suy biến, log-hợp lý không bị chặn trên; không có nghiệm với $\Sigma\succ0$. (13) Số đo sau rà soát: 42 âm tiết, 6 dòng, 2 công thức hiển thị, dòng dài nhất 13.
- **Ghi chú diễn giả:** Khi $d=1$, $S_n=Q/n$ và định lý trở lại định lý Gaussian một chiều; điều kiện $S_n\succ0$ trở thành $Q>0$. Điều kiện $S_n\succ0$ là điều kiện trên dữ liệu. Kết quả không áp dụng cho các mô hình ràng buộc $\Sigma$ là ma trận đường chéo hoặc bội của $I_d$: mỗi ràng buộc đổi miền tham số và cho nghiệm khác. Murphy tìm điểm dừng bằng đạo hàm theo ma trận; chứng minh ở đây cho cực đại toàn cục bằng $\log t\le t-1$ áp dụng cho trị riêng, cùng công cụ với ước lượng phân loại.

#### GN06 — Chứng minh: Gaussian nhiều chiều, trung bình tối ưu
- **Lý do tồn tại:** P6, bước 1/4 (Q-C, Q-C2).
- **Nhu cầu/khoảng trống:** như một chiều, cần tách phần chỉ phụ thuộc $\mu$.
- **Đầu vào → đầu ra:** GN05, G104 → $\ell(\mu,\Sigma)\le\ell(\bar x,\Sigma)$; hàm $h(\Lambda)$.
- **Vị trí:** phương pháp của sườn (tách tâm). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #5: dòng lộ trình thay bằng (8.5) hiển thị trên mặt trang; lộ trình bốn bước chuyển vào ghi chú diễn giả.
- **Sửa (rà soát):** #11: dòng lộ trình lên mặt trang (6 dòng, đo 1600×900 không tràn sau khi rút dòng giải thích còn một dòng bằng $\iff$). D1: bỏ `\tag{8.5}`.
- **Sửa (rà lại vòng 1):** R11: thử "khi và chỉ khi" thay "$\iff$": trang tràn khung 1600×900 (dòng giải thích thành hai dòng), nên giữ "$\iff$".
- **Nguồn:** L1040–1068. Murphy §4.2.6.1 (4.40)–(4.43), PDF 143; mẹo vết (7.36), PDF 266.
- **Phác thảo:** (1) Tách tâm; đổi biến $C$; $\log c\le c-1$ trên trị riêng; xét $S_n$ suy biến. (10) (2) Trung bình tối ưu với mọi $\Sigma$. Đặt $\Lambda=\Sigma^{-1}\succ0$, ma trận độ chính xác (precision matrix): (14) (3) display $$\ell(\mu,\Sigma;D)=-\frac{nd}2\log(2\pi)+\frac n2\log\det\Lambda-\frac12\sum_{i=1}^n(x_i-\mu)^\top\Lambda(x_i-\mu).$$ (4) display $$\sum_{i=1}^n(x_i-\mu)^\top\Lambda(x_i-\mu)=n\operatorname{tr}(\Lambda S_n)+n(\bar x-\mu)^\top\Lambda(\bar x-\mu).$$ (5) Do $\sum_i\tilde x_i=0$ và $w^\top Aw=\operatorname{tr}(Aww^\top)$; số hạng cuối $\ge0$, bằng $0$ $\iff$ $\mu=\bar x$. (6) (6) Suy ra $\ell(\mu,\Sigma;D)\le\ell(\bar x,\Sigma;D)=-\tfrac{nd}2\log(2\pi)+\tfrac n2h(\Lambda)$, với $h(\Lambda)=\log\det\Lambda-\operatorname{tr}(\Lambda S_n)$. (3) Số đo sau rà lại vòng 1: 33 âm tiết, 6 dòng, 2 công thức hiển thị, dòng dài nhất 14.
- **Ghi chú diễn giả:** Bước tách tâm làm như trường hợp một chiều. Log-hợp lý Gaussian viết theo $\Sigma$ có số hạng $-\frac n2\log\det\Sigma$; vì $\det\Sigma\det\Lambda=\det I_d=1$, số hạng đó bằng $\frac n2\log\det\Lambda$. Khai triển $x_i-\mu=\tilde x_i+(\bar x-\mu)$: hai số hạng chéo bằng nhau vì $\Lambda$ đối xứng, và tổng của chúng bằng $0$ vì $\sum_i\tilde x_i=0$. Mỗi $\tilde x_i^\top\Lambda\tilde x_i=\operatorname{tr}(\Lambda\tilde x_i\tilde x_i^\top)$; tính tuyến tính của vết và định nghĩa của $S_n$ cho $n\operatorname{tr}(\Lambda S_n)$. Vì $\Lambda\succ0$, số hạng cuối không âm.

#### GN07 — Chứng minh: Gaussian nhiều chiều, $h$ chỉ phụ thuộc $C$
- **Lý do tồn tại:** P6, bước 2/4: đưa $h$ về hàm của một ma trận xác định dương duy nhất (Phụ lục A dạng gọn).
- **Nhu cầu/khoảng trống:** $h(\Lambda)$ chứa cả $\Lambda$ và $S_n$; cần một biến mà trị riêng của nó tách được.
- **Đầu vào → đầu ra:** GN06 → $h(\Lambda)=\log\det C-\operatorname{tr}C-\log\det S_n$, $C\succ0$.
- **Vị trí:** phương pháp của sườn (đổi biến). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. Theo Q-C2: không dùng ý "song ánh"; chỉ cần $C\succ0$ và $S_n^{1/2}$ khả nghịch. Q-C2 cho phép gộp GN07 với GN08 nếu số đo thật vừa trần. **Bài tập:** không.
- **Sửa (cổng):** #11: tách "Nhắc lại:" (phân rã trị riêng) khỏi định nghĩa mới "Đặt $S_n^{1/2}$".
- **Sửa (rà soát):** #21: tiêu đề theo kết quả "$h$ chỉ phụ thuộc $C$". #46: lý do đổi $a_j\to\alpha_j$ chuyển sang `review-log.md`.
- **Sửa (kiểm định cuối):** F1: ký hiệu KaTeX trong tiêu đề không còn bị viết hoa (luật `.reveal h2 .katex` trong khối CSS Bài 11).
- **Sửa (đồng bộ materials):** `p.note-source` bỏ câu về $a_j$: ghi chú nay viết $\alpha_j$.
- **Nguồn:** L1070–1077; Phụ lục A L1514–1548 (bỏ đoạn "Song ánh", L1524).
- **Phác thảo:** (1) $h$ chỉ phụ thuộc $C=S_n^{1/2}\Lambda S_n^{1/2}$ khi $S_n\succ0$. (4) (2) Nhắc lại: $S_n=W\operatorname{diag}(\alpha_j)W^\top$, $\alpha_j>0$, $W$ trực giao. (4) (3) Đặt $S_n^{1/2}=W\operatorname{diag}(\sqrt{\alpha_j})W^\top$: đối xứng, khả nghịch, $S_n^{1/2}S_n^{1/2}=S_n$. (5) (4) $C$ đối xứng; với $w\ne0$, $y=S_n^{1/2}w\ne0$ cho $w^\top Cw=y^\top\Lambda y>0$, nên $C\succ0$. (5) (5) display $$\begin{aligned}\det C&=\det\Lambda\,\det S_n,\\ \operatorname{tr}C&=\operatorname{tr}(\Lambda S_n^{1/2}S_n^{1/2})=\operatorname{tr}(\Lambda S_n).\end{aligned}$$ (6) Theo $\det(AB)=\det A\det B$ và $\operatorname{tr}(AB)=\operatorname{tr}(BA)$; suy ra $h(\Lambda)=\log\det C-\operatorname{tr}C-\log\det S_n$. (4) Số đo sau rà soát: 22 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 5.
- **Ghi chú diễn giả:** Căn bậc hai $S_n^{1/2}$ có các trị riêng $\sqrt{\alpha_j}>0$ nên xác định dương; $S_n^{-1/2}=W\operatorname{diag}(1/\sqrt{\alpha_j})W^\top$ là nghịch đảo của nó, và $S_n^{-1/2}S_n^{-1/2}=S_n^{-1}$. Các định thức dương vì các ma trận xác định dương, nên lấy log được.

#### GN08 — Chứng minh: Gaussian nhiều chiều, cực đại tại $\Sigma=S_n$
- **Lý do tồn tại:** P6, bước 3/4: cực đại duy nhất qua trị riêng của $C$; ghép với bước 1.
- **Nhu cầu/khoảng trống:** $\log\det C-\operatorname{tr}C$ là tổng theo trị riêng; cần cận trên và điều kiện dấu bằng.
- **Đầu vào → đầu ra:** GN07, TS14 ($\log t\le t-1$) → (8.6) đã chứng minh khi $S_n\succ0$.
- **Vị trí:** kết quả của sườn (họ thứ tư). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #16: tên bước theo kết quả.
- **Sửa (kiểm định cuối):** F1: ký hiệu KaTeX trong tiêu đề không còn bị viết hoa (luật `.reveal h2 .katex` trong khối CSS Bài 11).
- **Nguồn:** L1079–1100.
- **Phác thảo:** (1) **$\log\det C-\operatorname{tr}C\le-d$.** $C=V\operatorname{diag}(c_j)V^\top$, $c_j>0$, $V$ trực giao: $\det C=\prod_jc_j$, $\operatorname{tr}C=\sum_jc_j$. (2) (2) display: $\log\det C-\operatorname{tr}C=\sum_{j=1}^d(\log c_j-c_j)\le-d$, theo $\log c_j\le c_j-1$. (3) **Dấu bằng khi và chỉ khi $\Sigma=S_n$.** Mọi $c_j=1$, tức $C=I_d$; $S_n^{1/2}$ khả nghịch nên $\Lambda=S_n^{-1}$. (12) (4) Suy ra $h(\Lambda)\le-d-\log\det S_n$, dấu bằng chỉ khi $\Sigma=S_n$. (10) (5) **Cực đại duy nhất tại $(\bar x,S_n)$.** $\ell(\mu,\Sigma;D)\le\ell(\bar x,\Sigma;D)\le\ell(\bar x,S_n;D)$; dấu bằng chỉ khi $\mu=\bar x$, $\Sigma=S_n$. (7) ≈33 âm tiết (chưa kể tên bước), 5 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $\det C=\det V\cdot\prod_jc_j\cdot\det V^\top=\prod_jc_j$ và $\operatorname{tr}C=\operatorname{tr}(\operatorname{diag}(c_j)V^\top V)=\sum_jc_j$ (L1079). $C=I_d$ cho $\Lambda=S_n^{-1/2}CS_n^{-1/2}=S_n^{-1}$; ngược lại, $\Lambda=S_n^{-1}$ cho $C=I_d$ (L1089). Bất đẳng thức là cùng công cụ đã chứng minh tính cực đại toàn cục của ước lượng phân loại. Nguồn: ghi chú bài giảng, chứng minh Định lý 11.14, Bước 3–4.

#### GN09 — Chứng minh: Gaussian nhiều chiều, $S_n$ suy biến
- **Lý do tồn tại:** P6, bước 4/4: không có nghiệm khi $S_n$ suy biến.
- **Nhu cầu/khoảng trống:** phần thứ hai của kết luận cần một dãy $\Sigma_\varepsilon$ làm hợp lý tăng vô hạn.
- **Đầu vào → đầu ra:** GN06 → log-hợp lý không bị chặn trên khi hạng $S_n<d$.
- **Vị trí:** giới hạn áp dụng của sườn (không suy biến). **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** #39: "ước lượng co (shrinkage estimate)"; "khác $\hat\Sigma=S_n$" thay "(8.6)".
- **Sửa (kiểm định cuối):** F1: ký hiệu KaTeX trong tiêu đề không còn bị viết hoa (luật `.reveal h2 .katex` trong khối CSS Bài 11).
- **Nguồn:** L1102–1126. Murphy §4.2.6.2, PDF 144 ("singular if $N<D$").
- **Phác thảo:** (1) Hợp lý không bị chặn khi $S_n$ suy biến. $S_n=\sum_{j\le r}\alpha_ju_ju_j^\top$, hạng $r<d$, $u_1,\ldots,u_d$ trực chuẩn. Với $\varepsilon>0$: (12) (2) display $$\Sigma_\varepsilon=\sum_{j\le r}\alpha_ju_ju_j^\top+\varepsilon\sum_{j>r}u_ju_j^\top\succ0.$$ (3) $\operatorname{tr}(\Sigma_\varepsilon^{-1}S_n)=r$; $\log\det\Sigma_\varepsilon=\sum_{j\le r}\log\alpha_j+(d-r)\log\varepsilon$. (0) (4) display $$\begin{aligned}\ell(\bar x,\Sigma_\varepsilon;D)&=-\frac{nd}2\log(2\pi)-\frac n2\sum_{j\le r}\log\alpha_j-\frac{nr}2\\ &\quad-\frac{n(d-r)}2\log\varepsilon\ \longrightarrow\ +\infty\quad(\varepsilon\downarrow0).\end{aligned}$$ (5) Do $d-r\ge1$, không $(\mu,\Sigma)$ nào với $\Sigma\succ0$ đạt cực đại. (7) Số đo sau rà soát: 19 âm tiết, 5 dòng, 2 công thức hiển thị, dòng dài nhất 12.
- **Ghi chú diễn giả:** $\Sigma_\varepsilon^{-1}=\sum_{j\le r}\alpha_j^{-1}u_ju_j^\top+\varepsilon^{-1}\sum_{j>r}u_ju_j^\top$. Do $u_j^\top u_k=0$ khi $j\ne k$ và $u_j^\top u_j=1$, $\Sigma_\varepsilon^{-1}S_n=\sum_{j\le r}u_ju_j^\top$, có vết $r$. Công thức của $\ell(\bar x,\Sigma_\varepsilon;D)$ là bước tách tâm với $\Lambda=\Sigma_\varepsilon^{-1}$. Lập luận đúng cả khi $r=0$, với tổng rỗng bằng $0$. Khi số chiều lớn so với cỡ mẫu, $S_n$ suy biến hoặc có trị riêng rất nhỏ. Murphy (§4.5.2) thay $S_n$ bằng ước lượng co (shrinkage estimate) $\rho\Sigma_0+(1-\rho)S_n$; đó là ước lượng dùng thêm giả thiết tiên nghiệm, khác $\hat\Sigma=S_n$.

#### GN10 — Ví dụ: Gaussian đã khớp cho dữ liệu cảm biến nền
- **Lý do tồn tại:** ứng dụng Định lý 11.14 trên ví dụ xuyên suốt; cho $\hat\Sigma^{-1}$ mà mạch 6 dùng.
- **Nhu cầu/khoảng trống:** viết mô hình nền đã khớp bằng số.
- **Đầu vào → đầu ra:** GN04, GN05 → $\hat\mu$, $\hat\Sigma$, $\hat\Sigma^{-1}$; $\hat f(\hat\mu)=1/(4\pi)$ trong ghi chú diễn giả (rà soát #9).
- **Vị trí:** ví dụ xuyên suốt cảm biến. **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** #9: khối mật độ tại tâm và câu ô vuông cạnh $\delta$ chuyển vào ghi chú diễn giả; nhiệm vụ "Tính $\hat\Sigma^{-1}$; kiểm tra $S_4\hat\Sigma^{-1}=I_2$"; "Diễn giải:" trả lời câu hỏi mạch (nghiệm duy nhất, $\hat\Sigma^{-1}$ cho mạch 6). #46: lý do $\delta$ chỉ ở `review-log.md`.
- **Sửa (rà lại vòng 1):** R4: "Diễn giải:" viết $(\hat\mu,\hat\Sigma)=((10,20)^\top,S_4)$ là nghiệm duy nhất và $\hat\Sigma^{-1}$ tồn tại.
- **Sửa (đồng bộ materials):** `p.note-source` bỏ câu về cạnh ô vuông $h$: ghi chú nay viết $\delta$.
- **Nguồn:** Ví dụ 11.9 L1132–1162.
- **Phác thảo:** (1) Bốn vector nền: $\bar x=(10,20)^\top$, $S_4=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}\succ0$, $\det S_4=4$. (3) (2) Tính $\hat\Sigma^{-1}$; kiểm tra $S_4\hat\Sigma^{-1}=I_2$. (3) (3) display $$\hat\Sigma^{-1}=\frac14\begin{pmatrix}5/2&-3/2\\-3/2&5/2\end{pmatrix}=\frac18\begin{pmatrix}5&-3\\-3&5\end{pmatrix},\qquad S_4\hat\Sigma^{-1}=I_2.$$ (4) Diễn giải: $S_4\succ0$, nên $(\hat\mu,\hat\Sigma)=\bigl((10,20)^\top,S_4\bigr)$ là nghiệm hợp lý cực đại duy nhất, và $\hat\Sigma^{-1}$ tồn tại. (14) Số đo sau rà lại vòng 1: 20 âm tiết, 4 dòng, 1 công thức hiển thị, dòng dài nhất 14.
- **Ghi chú diễn giả:** Nghịch đảo của ma trận đối xứng $2\times2$ khả nghịch: $\begin{pmatrix}\kappa_1&\kappa_2\\\kappa_2&\kappa_3\end{pmatrix}^{-1}=\frac1{\kappa_1\kappa_3-\kappa_2^2}\begin{pmatrix}\kappa_3&-\kappa_2\\-\kappa_2&\kappa_1\end{pmatrix}$. Kiểm tra: phần tử $(1,1)$ của $S_4\hat\Sigma^{-1}$ là $\frac18(\frac52\cdot5-\frac32\cdot3)=1$, phần tử $(1,2)$ bằng $0$. Mật độ đã khớp tại tâm là $\hat f(\hat\mu)=1/[2\pi(\det\hat\Sigma)^{1/2}]=1/(4\pi)\approx0{,}0796$, vì với $d=2$ hệ số chuẩn hóa là $(2\pi)^{d/2}(\det\hat\Sigma)^{1/2}=2\pi\cdot2=4\pi$. Số này là độ cao của mật độ tại tâm, có đơn vị nghịch đảo của diện tích: ô vuông nhỏ cạnh $\delta$ quanh tâm có xác suất xấp xỉ $0{,}0796\,\delta^2$.

#### GN11 — Ví dụ: hai đặc trưng trùng thông tin
- **Lý do tồn tại:** trường hợp biên của Định lý 11.14 (AGENTS.md: có trường hợp biên hoặc phản ví dụ khi phù hợp).
- **Nhu cầu/khoảng trống:** người học cần thấy giả thiết $S_n\succ0$ bị vi phạm trên dữ liệu thật.
- **Đầu vào → đầu ra:** GN09 → $S_3$ suy biến; không có nghiệm, không có $S_3^{-1}$.
- **Vị trí:** giới hạn áp dụng của sườn. **Mục tiêu:** 4.
- **Quyết định:** `thêm`; ứng viên cắt thứ năm (chuyển vào ghi chú diễn giả GN09) (Q-H). **Bài tập:** không.
- **Sửa (cổng):** #21: "cột" đổi thành "tọa độ".
- **Nguồn:** Tình huống 11.2 L1412–1436. Murphy §4.2.6.2, PDF 144; §4.5.2.1 (4.97), PDF 152.
- **Phác thảo:** (1) Ba sản phẩm, tọa độ thứ hai bằng hai lần tọa độ thứ nhất: $(0,0)^\top$, $(1,2)^\top$, $(2,4)^\top$. (16) (2) Kiểm tra có khớp được Gaussian hai chiều không ràng buộc. (11) (3) $\bar x=(1,2)^\top$; sai lệch $(-1,-2)^\top$, $(0,0)^\top$, $(1,2)^\top$. (2) (4) display: $S_3=\frac23\begin{pmatrix}1&2\\2&4\end{pmatrix}$, $\det S_3=0$. (5) $S_3(-2,1)^\top=0$: phương sai mẫu theo hướng $(-2,1)^\top$ bằng $0$. (10) (6) **Diễn giải:** $S_3$ suy biến, nên không có ước lượng hợp lý cực đại với $\Sigma\succ0$. (14) ≈53 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** mỗi số đo thỏa $-2x^{(1)}+x^{(2)}=0$; trị riêng còn lại bằng $\operatorname{tr}S_3=10/3$ (L1427). $S_3$ không khả nghịch, nên khoảng cách theo $S_3^{-1}$ không tính được; nhân $S_3$ với $3/2$ để có ước lượng không chệch không đổi hạng (L1429). Ba cách đổi mô hình, mỗi cách là một giả thiết mới: giữ một đặc trưng và dùng Gaussian một chiều; thêm mô hình nhiễu đo cho từng đặc trưng; dùng ước lượng co (L1431–1435).

#### GN12 — Hiệp phương sai mẫu không chệch
- **Lý do tồn tại:** phát biểu Hệ quả 11.15; tách tiêu chuẩn không chệch khỏi tiêu chuẩn hợp lý cho ma trận.
- **Nhu cầu/khoảng trống:** mẫu số $n-1$ của G110 cần dạng ma trận.
- **Đầu vào → đầu ra:** G110, GN03 → (8.7).
- **Vị trí:** tiêu chuẩn thứ hai của sườn (họ thứ tư). **Mục tiêu:** 4.
- **Quyết định:** `thêm`; chu trình rút gọn nhu cầu → hình thức → kiểm tra (khái niệm phụ). **Bài tập:** không.
- **Sửa (rà soát):** #42: ghi chú diễn giả "giá trị của $S_{n-1}$ là $\frac43S_4$". D1: bỏ `\tag{8.7}`.
- **Nguồn:** L1193–1214; L1235 (Murphy không có dạng ma trận).
- **Phác thảo:** (1) Hệ quả. Giả thiết: $X_1,\ldots,X_n\in\mathbb R^d$ mẫu i.i.d., $n\ge2$, $\mathbb EX_i=\mu$, $\operatorname{Cov}(X_i)=\Sigma$, mômen bậc hai hữu hạn. (11) (2) Kết luận: (2) (3) display $$\mathbb E[S_n]=\frac{n-1}n\Sigma,\qquad S_{n-1}=\frac n{n-1}S_n,\qquad\mathbb E[S_{n-1}]=\Sigma.$$ (4) Ý nghĩa: hiệu chỉnh $n-1$ của phương sai đúng cho cả ma trận; không cần giả thiết Gaussian. (17) (5) Nhân với $n/(n-1)$ không đổi hạng: $S_n$ suy biến thì $S_{n-1}$ cũng suy biến. (11) Số đo sau rà soát: 41 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 17.
- **Ghi chú diễn giả:** Với dữ liệu cảm biến nền ($n=4$), giá trị của $S_{n-1}$ là $\frac43S_4=\begin{pmatrix}10/3&2\\2&10/3\end{pmatrix}$; hai ma trận có cùng vector riêng, và trị riêng của $S_{n-1}$ là $16/3$ và $4/3$. Hệ quả tách tiêu chuẩn không chệch khỏi tiêu chuẩn hợp lý cho ma trận, như hiệu chỉnh phương sai mẫu làm cho phương sai. Chứng minh áp dụng kết quả một chiều cho từng hình chiếu $w^\top X_i$.

#### GN13 — Chứng minh: hiệp phương sai mẫu không chệch
- **Lý do tồn tại:** P7 (Q-C).
- **Nhu cầu/khoảng trống:** chuyển kết quả một chiều thành kết quả ma trận.
- **Đầu vào → đầu ra:** G110, GN02 ((8.2)), GN03 ((8.4)) → (8.7) đã chứng minh.
- **Vị trí:** kết quả của sườn. **Mục tiêu:** 4.
- **Quyết định:** `thêm`; ứng viên cắt thứ tư: gộp vào một dòng "Chứng minh." trên GN12 (Q-H). **Bài tập:** không.
- **Sửa (rà soát):** D1: "theo định nghĩa của $S_n$" với đẳng thức viết đủ. D2: "Hiệu chỉnh phương sai mẫu cho" thay "Mệnh đề 11.11 cho".
- **Nguồn:** L1216–1233.
- **Phác thảo:** (1) Áp dụng hiệu chỉnh phương sai cho mọi hình chiếu $w^\top X_i$, rồi khôi phục ma trận. (15) (2) $w^\top S_nw=Q_Y/n$. Đặt $Y_i=w^\top X_i$: các $Y_i$ i.i.d., $\operatorname{Var}Y_i=w^\top\Sigma w$; theo định nghĩa của $S_n$, $w^\top S_nw=\frac1n\sum_i(w^\top X_i-w^\top\bar X)^2=\frac1n\sum_i(Y_i-\bar Y)^2$. (7) (3) $w^\top\mathbb E[S_n]w=\frac{n-1}nw^\top\Sigma w$. Hiệu chỉnh phương sai mẫu cho $\mathbb EQ_Y=(n-1)w^\top\Sigma w$; kỳ vọng tuyến tính. (10) (4) Đặt $M=\mathbb E[S_n]-\frac{n-1}n\Sigma$, đối xứng, $w^\top Mw=0$ với mọi $w$. (5) (5) Dạng toàn phương bằng $0$ thì $M=0$. $w=e_j$ cho $M_{jj}=0$; $w=e_j+e_k$ cho $M_{jj}+M_{kk}+2M_{jk}=0$, nên $M_{jk}=0$. (8) Số đo sau rà soát: 45 âm tiết, 5 dòng, 0 công thức hiển thị, dòng dài nhất 15.
- **Ghi chú diễn giả:** Các $Y_i$ độc lập vì là hàm đo được của các $X_i$ độc lập; cùng phân phối vì là cùng một hàm của các $X_i$ cùng phân phối. $\operatorname{Var}Y_i=w^\top\Sigma w$ theo đẳng thức $\operatorname{Var}(w^\top X)=w^\top\operatorname{Cov}(X)\,w$. Nhân $\mathbb E[S_n]=\frac{n-1}n\Sigma$ với $\frac n{n-1}$ cho $\mathbb E[S_{n-1}]=\Sigma$. Bài tập tự học 11.7 luyện thêm phần này.

#### GN14 — Bài tập: bốn điểm hai chiều với phương sai khác nhau
- **Lý do tồn tại:** bài có lời giải trên mặt trang của mạch 5 (Q-B), dùng số của Ví dụ 11.10; đo đúng câu hỏi trung tâm (tính $\bar x$, $S_n$, kiểm tra tồn tại).
- **Nhu cầu/khoảng trống:** người học tự áp dụng Định lý 11.14 trên dữ liệu có hai phương sai khác nhau.
- **Đầu vào → đầu ra:** GN03–GN05 → $\bar x=(2,3)^\top$, $S_4=\begin{pmatrix}1&1\\1&2\end{pmatrix}\succ0$.
- **Vị trí:** kiểm tra mạch 5. **Mục tiêu:** 4.
- **Quyết định:** `thêm`. **Bài tập:** có lời giải trên mặt trang (fragment).
- **Nguồn:** L1164–1186.
- **Phác thảo:** (1) **Câu hỏi:** Bốn vector $(1,1)^\top$, $(3,3)^\top$, $(1,3)^\top$, $(3,5)^\top$, mẫu i.i.d. Gaussian hai chiều. (8) (2) Tính $\bar x$, $S_4$; kiểm tra nghiệm hợp lý cực đại tồn tại. (10) (3) fragment **Lời giải:** $\bar x=(2,3)^\top$; sai lệch $(-1,-2)^\top$, $(1,0)^\top$, $(-1,0)^\top$, $(1,2)^\top$. (4) (4) fragment display: $\sum_i\tilde x_i\tilde x_i^\top=2\begin{pmatrix}1&2\\2&4\end{pmatrix}+2\begin{pmatrix}1&0\\0&0\end{pmatrix}=\begin{pmatrix}4&4\\4&8\end{pmatrix}$, $S_4=\begin{pmatrix}1&1\\1&2\end{pmatrix}$. (5) fragment $\operatorname{tr}S_4=3$, $\det S_4=1$: trị riêng $(3\pm\sqrt5)/2\approx2{,}618$ và $0{,}382$, đều dương. (6) (6) fragment $S_4\succ0$, nên $\hat\mu=(2,3)^\top$, $\hat\Sigma=S_4$. (2) ≈30 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** kiểm tra lại: tổng hai trị riêng bằng $3$, tích bằng $(9-5)/4=1$; mật độ đã khớp tại tâm $1/(2\pi)\approx0{,}159$ (L1186). Hướng phân tán chính $(1,\varphi)^\top\approx(1;\ 1{,}618)^\top$ với $\varphi=(1+\sqrt5)/2$ nghiêng về trục thứ hai, vì tọa độ thứ hai có phương sai mẫu $2$, gấp đôi tọa độ thứ nhất (L1188–1190).

### Mạch 6 · Khoảng cách Mahalanobis và hình học Gaussian

#### HH00 — 6. Khoảng cách Mahalanobis và hình học Gaussian (trang tiêu đề mạch, `id="mach-6"`)
- **Lý do tồn tại:** mở mạch 6 và nêu câu hỏi trung tâm cùng phân rã.
- **Nhu cầu/khoảng trống:** $\hat\Sigma$ đã có nhưng chưa được đọc thành hướng và độ dài; câu hỏi mở đầu chưa được trả lời.
- **Đầu vào → đầu ra:** GN10 → nhiệm vụ: đo độ lệch theo từng hướng riêng và so sánh $a$, $b$.
- **Vị trí:** điểm vào mạch 6; đảm nhận bước nhu cầu của cụm Mahalanobis; phần việc: đặt câu hỏi trung tâm của mạch 6 và phân rã. **Mục tiêu:** 5.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #22: thêm trường "Nguồn" và phần việc.
- **Nguồn:** L1237–1241. Murphy §3.2.2, PDF 113.
- **Phác thảo:** h2 "6. Khoảng cách Mahalanobis và hình học Gaussian"; dòng dẫn "Muốn so độ lệch của hai sản phẩm mới, cần đo theo mức phân tán của từng hướng riêng." (19); từ khóa "Phân rã trị riêng · Tọa độ riêng · Đường đồng mức · Khoảng cách Mahalanobis".
- **Ghi chú diễn giả (≈70 âm tiết):** mạch kế thừa Gaussian đã khớp với tâm $(10,20)^\top$ và $\hat\Sigma=S_4$. Nhiệm vụ: dùng phân rã trị riêng để đọc $\hat\Sigma$ thành các hướng phân tán, định nghĩa một khoảng cách theo mức phân tán của từng hướng, rồi trả lời câu hỏi mở đầu. Mạch kết thúc bằng quy tắc chấm điểm lệch cho quan sát mới.

#### HH01 — Độ lệch của hai sản phẩm mới
- **Lý do tồn tại:** nhu cầu và trực quan của cụm Mahalanobis; hình học bằng SVG.
- **Nhu cầu/khoảng trống:** khoảng cách Euclid bỏ qua $\hat\Sigma$.
- **Đầu vào → đầu ra:** MD03, GN10 → ý "quay trục, chia độ lệch chuẩn"; vị trí của $a$, $b$ so với các elip.
- **Vị trí:** ví dụ xuyên suốt cảm biến; phần việc: "đo theo hướng riêng". **Mục tiêu:** 5.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** #12: thêm dòng giải thích elip $1$, $2$, $3$; SVG: nhãn 22–24 đơn vị, viền trắng, dời "1", "2", "3", "tâm" khỏi nét trục. #29: "(bình phương $18$ so với $8$)".
- **Sửa (rà lại vòng 1):** R3: "Elip ghi $1$, $2$, $3$ gồm các điểm cách tâm … sau phép quay trục và chia độ lệch chuẩn."
- **Nguồn:** L1239–1241; L1368–1372. Murphy §3.2.2, PDF 113; làm trắng §7.4.5, PDF 286–287. **Mẫu (chỉ planning):** MAT1101 b6 S32–S33 (không chép lỗi $(x-\mu_y)^2$ của S33).
- **Phác thảo:** (1) hình `gaussian-geometry-deck.svg` (2) Nhu cầu: so độ lệch của $a=(13,23)^\top$, $b=(12,18)^\top$ khỏi $\hat\mu=(10,20)^\top$ theo $\hat\Sigma$. (8) (3) Khoảng cách Euclid xếp $a$ xa hơn (bình phương $18$ so với $8$) và bỏ qua $\hat\Sigma$. (13) (4) Trực quan. Quay trục theo hướng phân tán chính, chia mỗi tọa độ cho độ lệch chuẩn theo hướng đó. (20) (5) Elip ghi $1$, $2$, $3$ gồm các điểm cách tâm $1$, $2$, $3$ sau phép quay trục và chia độ lệch chuẩn. (16) Số đo sau rà lại vòng 1: 57 âm tiết, 4 dòng, 0 công thức hiển thị, dòng dài nhất 20.
- **Ghi chú diễn giả:** Dữ liệu nền trải rộng theo hướng $(1,1)^\top$ và hẹp theo hướng $(1,-1)^\top$. Với hai tọa độ Gaussian độc lập, đường đồng mức là elip có trục song song trục tọa độ; khi có hiệp phương sai, elip quay theo các vector riêng. Sau phép quay và phép chia cho độ lệch chuẩn, mọi hướng có cùng mức phân tán, và khoảng cách Euclid đo độ lệch theo đúng mức phân tán; Murphy gọi phép biến đổi này là làm trắng dữ liệu (whitening). Trong hình, $a$ nằm trên trục dài, giữa hai elip $2$ và $3$, còn $b$ nằm trên trục ngắn, gần elip $3$. Elip được phân biệt bằng kiểu nét; $a$ là tam giác, $b$ là hình vuông.

#### HH02 — Khoảng cách Mahalanobis
- **Lý do tồn tại:** bước hình thức (Định nghĩa 11.16) và quan hệ với mật độ.
- **Nhu cầu/khoảng trống:** HH01 cần một công thức không phải thực hiện phép quay.
- **Đầu vào → đầu ra:** HH01 → $d_\Sigma$ (8.8); mật độ viết theo $d^2_\Sigma$.
- **Vị trí:** định nghĩa của sườn (hình học). **Mục tiêu:** 5.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** D1: bỏ `\tag{8.8}`; ghi chú diễn giả gọi "dạng toàn phương dưới dấu căn".
- **Nguồn:** Định nghĩa 11.16 L1243–1264. Murphy §3.2.2 (3.20), PDF 113 (Murphy viết $\Delta^2$).
- **Phác thảo:** (1) Định nghĩa. Cho $\Sigma\in\mathbb R^{d\times d}$ đối xứng xác định dương và $x,\mu\in\mathbb R^d$. Khoảng cách Mahalanobis (Mahalanobis distance) là (15) (2) display $$d_\Sigma(x,\mu)=\sqrt{(x-\mu)^\top\Sigma^{-1}(x-\mu)}.$$ (3) $\Sigma=I_d$ cho khoảng cách Euclid; $\Sigma=\sigma^2I_d$ cho khoảng cách Euclid chia $\sigma$. (9) (4) display $$f_{\mu,\Sigma}(x)=\frac1{(2\pi)^{d/2}(\det\Sigma)^{1/2}}\exp\Bigl[-\frac12d_\Sigma^2(x,\mu)\Bigr].$$ (5) Ý nghĩa: với $\mu$, $\Sigma$ cố định, $d_\Sigma$ nhỏ hơn thì mật độ lớn hơn. (12) Số đo sau rà soát: 36 âm tiết, 5 dòng, 2 công thức hiển thị, dòng dài nhất 15.
- **Ghi chú diễn giả:** Vì $\Sigma^{-1}\succ0$, biểu thức dưới dấu căn không âm và chỉ bằng $0$ khi $x=\mu$. Dạng toàn phương dưới dấu căn, nhân với $-\frac12$, chính là số mũ của mật độ Gaussian. So sánh hai Gaussian có ma trận hiệp phương sai khác nhau còn phải tính hệ số $(\det\Sigma)^{-1/2}$. Khoảng cách Euclid phụ thuộc đơn vị đo; khoảng cách Mahalanobis không đổi dưới phép đổi biến khả nghịch $y=Ax+\eta$ nếu trung bình và ma trận được đổi cùng dữ liệu, thành $A\mu+\eta$ và $A\Sigma A^\top$. Nếu chỉ đổi đơn vị của dữ liệu mà giữ ma trận cũ, kết quả không còn ý nghĩa này.

#### HH03 — Hướng và độ dài của đường đồng mức Gaussian
- **Lý do tồn tại:** phát biểu Mệnh đề 11.17: (8.9), trục và bán trục, phương sai theo hướng riêng.
- **Nhu cầu/khoảng trống:** nối $d_\Sigma$ với trị riêng và vector riêng.
- **Đầu vào → đầu ra:** HH02, phân rã trị riêng (Bài 00) → (8.9), ellipsoid với bán trục $\sqrt{c\lambda_j}$.
- **Vị trí:** kết quả của sườn (hình học). **Mục tiêu:** 5.
- **Quyết định:** `thêm`; `tách` phần (c) sang HH04 nếu số đo thật vượt trần. **Bài tập:** không.
- **Sửa (rà soát):** D1: bỏ `\tag{8.9}`. #44: câu về lỗi in của Murphy viết đủ.
- **Nguồn:** L1266–1283. Murphy §3.2.2 (3.21)–(3.25), PDF 113–114; (7.159), PDF 285; §7.4.4 (7.161)–(7.163), PDF 286.
- **Phác thảo:** (1) Mệnh đề. Giả thiết: $\Sigma=U\operatorname{diag}(\lambda_1,\ldots,\lambda_d)U^\top\succ0$, $U=[u_1\cdots u_d]$ trực giao; tọa độ riêng $z=U^\top(x-\mu)$. (9) (2) display $$\text{(a)}\quad d_\Sigma^2(x,\mu)=\sum_{j=1}^d\frac{z_j^2}{\lambda_j}.$$ (3) (b) Với $c>0$, tập $\{x:d_\Sigma^2(x,\mu)=c\}$ là ellipsoid tâm $\mu$, trục theo $u_j$, bán trục $\sqrt{c\lambda_j}$. (10) (4) Tập này là mặt đồng mức của $f_{\mu,\Sigma}$; khi $d=2$ là elip. (10) (5) (c) Nếu $\operatorname{Cov}(X)=\Sigma$ thì $\operatorname{Var}(u_j^\top X)=\lambda_j$. (3) Số đo sau rà soát: 32 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 10.
- **Ghi chú diễn giả:** Độ lệch $z_j$ theo hướng có $\lambda_j$ lớn bị chia cho một số lớn nên đóng góp ít; độ lệch theo hướng có $\lambda_j$ nhỏ đóng góp nhiều. Bán trục tỉ lệ với $\sqrt{\lambda_j}$, tức độ lệch chuẩn theo hướng đó. Murphy §3.2.2 in $z=U(y-\mu)$; khi các cột của $U$ là $u_j$, như ở đây, công thức đúng là $z=U^\top(y-\mu)$. Với $d>2$, tập đồng mức là mặt ellipsoid.

#### HH04 — Chứng minh: hướng và độ dài của đường đồng mức
- **Lý do tồn tại:** P8 (Q-C).
- **Nhu cầu/khoảng trống:** người học cần thấy (8.9) suy từ phân rã trị riêng của $\Sigma^{-1}$ và phép dời hình.
- **Đầu vào → đầu ra:** HH03 → (8.9), (b), (c) đã chứng minh.
- **Vị trí:** kết quả của sườn. **Mục tiêu:** 5.
- **Quyết định:** `thêm`; `tách` thành hai trang ((a) | (b), (c)) nếu tràn. **Bài tập:** không.
- **Sửa (cổng):** #14: "hướng $u_j$ về $e_j$".
- **Sửa (rà soát):** D1: "(c)" dẫn đẳng thức $\operatorname{Var}(w^\top X)=w^\top\Sigma w$ thay "(8.2)".
- **Nguồn:** L1285–1320. Murphy §3.2.2, PDF 113 (phác thảo (a)).
- **Phác thảo:** (1) Viết $\Sigma^{-1}$ theo cùng phân rã, đổi sang tọa độ $z$. (9) (2) $\Sigma^{-1}=U\operatorname{diag}(1/\lambda_j)U^\top$. Do $U^\top U=UU^\top=I_d$, tích với $\Sigma$ bằng $I_d$. (4) (3) (a) Tổng có trọng số. (5) (4) display $$d_\Sigma^2=(x-\mu)^\top U\operatorname{diag}(1/\lambda_j)U^\top(x-\mu)=z^\top\operatorname{diag}(1/\lambda_j)\,z=\sum_jz_j^2/\lambda_j.$$ (5) (b) Phép dời hình giữ ellipsoid. $d_\Sigma^2=c\iff\sum_jz_j^2/(c\lambda_j)=1$; $x\mapsto U^\top(x-\mu)$ đưa $\mu$ về $0$, hướng $u_j$ về $e_j$, bảo toàn độ dài. (14) (6) (c) Phương sai theo $u_j$ bằng $\lambda_j$. $\operatorname{Var}(u_j^\top X)=u_j^\top\Sigma u_j=\lambda_j$, theo $\operatorname{Var}(w^\top X)=w^\top\Sigma w$. (6) Số đo sau rà soát: 38 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 14.
- **Ghi chú diễn giả:** Trong tọa độ $z$, phương trình $\sum_jz_j^2/(c\lambda_j)=1$ là ellipsoid tâm $0$, các trục theo $e_j$, bán trục $\sqrt{c\lambda_j}$. Phép đổi tọa độ bảo toàn độ dài vì $\lVert U^\top y\rVert^2=y^\top UU^\top y=\lVert y\rVert^2$, và $U^\top u_j=e_j$. Mật độ phụ thuộc $x$ chỉ qua $d_\Sigma^2$, nên không đổi trên tập đồng mức. Khi có trị riêng lặp, vector riêng trong không gian riêng tương ứng không duy nhất, nhưng tổng $\sum_jz_j^2/\lambda_j$ không phụ thuộc lựa chọn đó: tổng $\sum z_j^2$ trên một không gian riêng là bình phương độ dài hình chiếu của $x-\mu$ lên không gian đó.

#### HH05 — Ví dụ: hai quan sát mới, tọa độ riêng
- **Lý do tồn tại:** ví dụ của cụm Mahalanobis trên ví dụ xuyên suốt (phần 1).
- **Nhu cầu/khoảng trống:** chuyển $\hat\Sigma$ thành hướng, bán trục và tọa độ riêng của $a$, $b$.
- **Đầu vào → đầu ra:** GN10, HH03 → $\lambda_\pm$, $u_\pm$, bán trục $2$ và $1$, $z$ của $a$, $b$.
- **Vị trí:** ví dụ xuyên suốt cảm biến. **Mục tiêu:** 5.
- **Quyết định:** `thêm`; ứng viên cắt thứ hai: gộp với HH06 (Q-H). **Bài tập:** không.
- **Nguồn:** Ví dụ 11.11 L1324–1342.
- **Phác thảo:** (1) $\hat\mu=(10,20)^\top$, $\hat\Sigma=\begin{pmatrix}5/2&3/2\\3/2&5/2\end{pmatrix}$; $a=(13,23)^\top$, $b=(12,18)^\top$. (0) (2) Tính trị riêng, bán trục và tọa độ riêng của $a$, $b$. (12) (3) display: $u_+=\frac1{\sqrt2}(1,1)^\top,\ \lambda_+=4$; $u_-=\frac1{\sqrt2}(1,-1)^\top,\ \lambda_-=1$. (4) Elip $d^2_{\hat\Sigma}=1$: bán trục $2$ theo $u_+$, bán trục $1$ theo $u_-$. (10) (5) $a-\hat\mu=(3,3)^\top$: $z_+=3\sqrt2$, $z_-=0$; $b-\hat\mu=(2,-2)^\top$: $z_+=0$, $z_-=2\sqrt2$. (0) (6) **Diễn giải:** $a$ lệch trọn theo hướng phương sai $4$, $b$ lệch trọn theo hướng phương sai $1$. (16) ≈38 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Ghi chú diễn giả:** $\hat\Sigma(1,1)^\top=(4,4)^\top$ và $\hat\Sigma(1,-1)^\top=(1,-1)^\top$; $u_\pm$ trực giao, độ dài $1$ (L1338). Tỉ số hai bán trục là $2$, tỉ số hai phương sai là $4$ (L1340). $z_+=u_+^\top(3,3)^\top=6/\sqrt2$, $z_-=u_-^\top(2,-2)^\top=4/\sqrt2$ (L1342).

#### HH06 — Ví dụ: hai quan sát mới, hai khoảng cách
- **Lý do tồn tại:** ứng dụng trả lời câu hỏi mở đầu (phần 2 của ví dụ); so hai công cụ trên cùng số liệu.
- **Nhu cầu/khoảng trống:** so khoảng cách Euclid và Mahalanobis, và tỉ số mật độ.
- **Đầu vào → đầu ra:** HH05 → $d^2(a)=9/2$, $d^2(b)=8$; $\hat f(a)/\hat f(b)=e^{7/4}$; $b$ lệch hơn.
- **Vị trí:** bài toán trung tâm được trả lời. **Mục tiêu:** 5.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** D1: nhiệm vụ viết $d_{\hat\Sigma}^2=\sum_jz_j^2/\lambda_j$ thay "(8.9)".
- **Nguồn:** L1344–1368.
- **Phác thảo:** (1) Tính $d_{\hat\Sigma}^2=\sum_jz_j^2/\lambda_j$ và so với khoảng cách Euclid. (7) (2) bảng (3) Kiểm tra bằng $\hat\Sigma^{-1}$: $\frac18(18+18)=\frac92$ và $\frac18(32+32)=8$. (4) (4) display $$\frac{\hat f(a)}{\hat f(b)}=\exp\Bigl[-\frac12\Bigl(\frac92-8\Bigr)\Bigr]=e^{7/4}\approx5{,}755.$$ (5) Diễn giải: $b$ lệch khỏi chế độ vận hành bình thường nhiều hơn $a$; mật độ của $a$ lớn gấp khoảng $5{,}8$ lần. (19) Số đo sau rà soát: 30 âm tiết, 5 dòng, 1 công thức hiển thị, dòng dài nhất 19.
- **Ghi chú diễn giả:** Hai quan sát được đánh giá dưới cùng một Gaussian, nên hệ số chuẩn hóa triệt tiêu trong tỉ số mật độ. Kiểm tra trực tiếp: $\hat\Sigma^{-1}(3,3)^\top=\frac18(6,6)^\top$ và $\hat\Sigma^{-1}(2,-2)^\top=\frac18(16,-16)^\top$. $z_+^2+z_-^2$ bằng $18$ cho $a$ và $8$ cho $b$, đúng bình phương độ dài Euclid, vì phép đổi tọa độ bảo toàn độ dài. $a$ xa tâm hơn theo khoảng cách Euclid nhưng có khoảng cách Mahalanobis nhỏ hơn, vì độ lệch của nó nằm theo hướng phân tán rộng. Đây là câu trả lời cho câu hỏi mở đầu.

#### HH07 — Bài tập: hình học Gaussian theo hướng riêng (a)
- **Lý do tồn tại:** bài trên lớp 11.3 (Q-B); đề và lời giải (a).
- **Nhu cầu/khoảng trống:** người học tự đọc trị riêng thành bán trục trên một ma trận khác.
- **Đầu vào → đầu ra:** HH03–HH06 → $\lambda_+=9$, $\lambda_-=1$, bán trục $3$ và $1$.
- **Vị trí:** kiểm tra cụm Mahalanobis. **Mục tiêu:** 5.
- **Quyết định:** `thêm`. Bài tập dùng lại tên $a$, $b$ cho hai điểm khác; trang nêu lại dữ kiện và ghi "hai điểm". **Bài tập:** trên lớp, lời giải trên mặt trang (fragment).
- **Sửa (rà soát):** #28: "hai điểm $a$, $b$ của bài tập này" (giữ tên của `exercises.md`). #32: `span.nocase`.
- **Sửa (rà lại vòng 1):** R7: ghi chú diễn giả bỏ vế "tên giữ như trong tệp bài tập" (lý do ở `review-log.md`).
- **Nguồn:** BT L101–124.
- **Phác thảo:** (1) Câu hỏi: Gaussian hai chiều, $\mu=(0,0)^\top$, $\Sigma=\begin{pmatrix}5&4\\4&5\end{pmatrix}$; hai điểm $a=(3,1)^\top$, $b=(1,-1)^\top$ của bài tập này. (11) (2) (a) Tìm trị riêng, vector riêng đơn vị và bán trục của elip $d_\Sigma^2=1$. (13) (3) (b) So sánh bình phương khoảng cách Euclid và Mahalanobis của $a$, $b$ tới $\mu$. (12) (4) (c) Tính $f_{\mu,\Sigma}(a)/f_{\mu,\Sigma}(b)$; giải thích bằng hướng phân tán. (8) (5) Lời giải: (a) $\Sigma(1,1)^\top=(9,9)^\top$, $\Sigma(1,-1)^\top=(1,-1)^\top$: $\lambda_+=9$, $u_+=(1,1)^\top/\sqrt2$; $\lambda_-=1$, $u_-=(1,-1)^\top/\sqrt2$. (3) (6) Bán trục $\sqrt9=3$ theo $u_+$ và $1$ theo $u_-$. (5) Số đo sau rà lại vòng 1: 51 âm tiết, 6 dòng, 0 công thức hiển thị, dòng dài nhất 13.
- **Ghi chú diễn giả:** Hai điểm $a$, $b$ của bài tập khác hai sản phẩm của bài toán mở đầu. Gợi ý: thử các vector $(1,1)^\top$ và $(1,-1)^\top$, chuẩn hóa chúng trước khi chiếu; dùng $d_\Sigma^2=\sum_jz_j^2/\lambda_j$: chiếu độ lệch lên từng vector riêng đơn vị, bình phương, rồi chia cho trị riêng tương ứng. Kiểm tra: tổng hai trị riêng $10=\operatorname{tr}\Sigma$, tích $9=25-16=\det\Sigma$.

#### HH08 — Bài tập: hình học Gaussian theo hướng riêng (b), (c)
- **Lý do tồn tại:** lời giải (b), (c) của bài 11.3.
- **Nhu cầu/khoảng trống:** người học so hai tỉ số khoảng cách và giải thích bằng hướng.
- **Đầu vào → đầu ra:** HH07 → $26/9$, $2$; tỉ số mật độ $e^{-4/9}\approx0{,}641$.
- **Vị trí:** kiểm tra cụm Mahalanobis. **Mục tiêu:** 5.
- **Quyết định:** `thêm`. **Bài tập:** trên lớp, lời giải trên mặt trang.
- **Sửa (rà soát):** #30: thêm dòng "Câu hỏi:" nhắc đề (b), (c). #29: so sánh viết theo bình phương khoảng cách, $13/9\approx1{,}44$. #32: `span.nocase`.
- **Nguồn:** BT L126–149.
- **Phác thảo:** (1) Câu hỏi: (b) bình phương khoảng cách Euclid, Mahalanobis của $a$, $b$; (c) $f_{\mu,\Sigma}(a)/f_{\mu,\Sigma}(b)$. (11) (2) Lời giải: (b) $a$: $\lVert a\rVert^2=10$, $z_+=2\sqrt2$, $z_-=\sqrt2$, $d_\Sigma^2(a,\mu)=\frac89+2=\frac{26}9\approx2{,}89$. (3) (3) $b$: $\lVert b\rVert^2=2$, $z_+=0$, $z_-=\sqrt2$, $d_\Sigma^2(b,\mu)=2$. (0) (4) display $$\text{(c)}\quad\frac{f_{\mu,\Sigma}(a)}{f_{\mu,\Sigma}(b)}=\exp\Bigl[-\frac12\Bigl(\frac{26}9-2\Bigr)\Bigr]=e^{-4/9}\approx0{,}641.$$ (5) Bình phương khoảng cách của $a$ gấp $5$ lần của $b$ theo Euclid, chỉ gấp $13/9\approx1{,}44$ lần theo Mahalanobis. (15) (6) Diễn giải: phần $z_+^2=8$ của $a$ nằm theo hướng phương sai $9$, chỉ góp $8/9$. (11) Số đo sau rà soát: 40 âm tiết, 6 dòng, 1 công thức hiển thị, dòng dài nhất 15.
- **Ghi chú diễn giả:** Phần $z_-^2=2$ theo hướng có phương sai $1$ đóng góp đủ $2$, bằng toàn bộ đóng góp của $b$. Mật độ tại $a$ bằng khoảng $64\%$ mật độ tại $b$. Kiểm tra trực tiếp bằng $\Sigma^{-1}=\frac19\begin{pmatrix}5&-4\\-4&5\end{pmatrix}$: $\Sigma^{-1}(3,1)^\top=\frac19(11,-7)^\top$, nên $d_\Sigma^2(a,\mu)=\frac19(33-7)=\frac{26}9$; $\Sigma^{-1}(1,-1)^\top=(1,-1)^\top$, nên $d_\Sigma^2(b,\mu)=2$.

#### HH09 — Chấm điểm lệch cho quan sát cảm biến
- **Lý do tồn tại:** ứng dụng cuối mạch nội dung cuối (AGENTS.md, "Mở bài và kết bài"): nối kết quả với một quyết định cụ thể; đứng sau bài tập theo tiền lệ Bài 10 (Q-K).
- **Nhu cầu/khoảng trống:** chuyển điểm $d^2_{\hat\Sigma}$ thành quyết định gắn cờ.
- **Đầu vào → đầu ra:** HH06 → với ngưỡng $6$, chỉ $b$ bị gắn cờ; giới hạn của ngưỡng.
- **Vị trí:** ứng dụng (phát hiện bất thường) và giới hạn áp dụng của sườn. **Mục tiêu:** 5.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (rà soát):** #38: "Nhu cầu:" nêu quyết định; ghi chú diễn giả về ngưỡng $c$ viết khẳng định (đường đồng mức, dữ liệu kiểm tra, sai số ước lượng).
- **Nguồn:** Tình huống 11.1 L1398–1410; Nhận xét 11.18 L1376–1390; L1322.
- **Phác thảo:** (1) Nhu cầu: quyết định gắn cờ sản phẩm nào theo quy tắc $d_{\hat\Sigma}^2>6$. (12) (2) Mô hình nền i.i.d. $\mathcal N(\mu,\Sigma)$ trên bốn vector nền; $S_4\succ0$ nên $\hat\mu=(10,20)^\top$, $\hat\Sigma=S_4$. (9) (3) Quan sát cần chấm điểm không được ghép vào mẫu ước lượng. (12) (4) $d_{\hat\Sigma}^2(a,\hat\mu)=4{,}5\le6$, $d_{\hat\Sigma}^2(b,\hat\mu)=8>6$: chỉ $b$ bị gắn cờ. (4) (5) Lưu ý: tỉ lệ báo động sai của ngưỡng $6$ cần dữ liệu kiểm tra riêng. (15) Số đo sau rà soát: 52 âm tiết, 5 dòng, 0 công thức hiển thị, dòng dài nhất 15.
- **Ghi chú diễn giả:** Tính độc lập giữa các sản phẩm không đòi hỏi hai đặc trưng trong cùng một sản phẩm độc lập với nhau; quan hệ giữa chúng nằm trong $\Sigma$. Quan sát $b$ lệch theo hướng ít biến động nên có mật độ thấp hơn, dù gần tâm hơn theo khoảng cách Euclid. Phát hiện bất thường dựa trên Gaussian dùng đúng quan hệ giữa mật độ và dạng toàn phương này. Ngưỡng $c=6$ chọn một đường đồng mức của mật độ đã khớp. Tỉ lệ báo động sai của ngưỡng này được ước lượng trên dữ liệu kiểm tra lấy từ chế độ vận hành bình thường; cùng dữ liệu đó dùng để kiểm tra giả thiết Gaussian. Vì $\hat\mu$, $\hat\Sigma$ được ước lượng từ bốn điểm, ngưỡng trên $d_{\hat\Sigma}^2$ còn chịu sai số ước lượng.

### Mạch 7 · Tổng kết và chuyển tiếp

#### TK00 — 7. Tổng kết và chuyển tiếp (trang tiêu đề mạch, `id="mach-7"`)
- **Lý do tồn tại:** mở mạch kết luận (tách khỏi mạch nội dung theo AGENTS.md).
- **Nhu cầu/khoảng trống:** các công thức nghiệm chỉ đúng dưới giả thiết riêng của từng kết quả.
- **Đầu vào → đầu ra:** HH09 → nhiệm vụ: gắn mỗi công thức với giả thiết của nó.
- **Vị trí:** điểm vào mạch 7; ngoài hành trình khái niệm; phần việc: đặt câu hỏi của mạch kết luận. **Mục tiêu:** cả sáu.
- **Quyết định:** `thêm`. **Bài tập:** không.
- **Sửa (cổng):** #22: thêm trường "Nguồn" và phần việc.
- **Nguồn:** L1445–1499.
- **Phác thảo:** h2 "7. Tổng kết và chuyển tiếp"; dòng dẫn "Muốn dùng đúng các công thức ước lượng, cần ghi kèm giả thiết mà mỗi công thức đòi hỏi." (19); từ khóa "Giả thiết · Miền tham số · Không suy biến · Hàm mất mát".
- **Ghi chú diễn giả (≈70 âm tiết):** mạch kế thừa mọi kết quả của mạch 2–6. Nhiệm vụ: xếp các kết quả cùng giả thiết không được bỏ, luyện lại phép suy ra hàm mất mát và trường hợp nghiệm biên, rồi nêu nhu cầu của bài sau: tham số phụ thuộc đầu vào và chất lượng dự đoán trên quan sát mới (L1445, L1499).

#### TK01 — Kết quả và giả thiết: mô hình một chiều
- **Lý do tồn tại:** bảng tổng kết "kết quả | giả thiết không được bỏ | công thức" (AGENTS.md, "Mở bài và kết bài").
- **Nhu cầu/khoảng trống:** người học cần một trang tra cứu điều kiện dùng công thức.
- **Đầu vào → đầu ra:** mạch 2–6 → bảng bốn hàng (mô hình rời rạc và một chiều); ba hàng còn lại ở TK01b.
- **Vị trí:** tổng hợp sườn. **Mục tiêu:** cả sáu.
- **Quyết định:** `thêm`; bảng có trần 80 âm tiết; `tách` thành TK01 (mô hình rời rạc và một chiều) và TK01b (nhiều chiều và hình học) nếu bảng cao quá khung 16:9 ở cỡ chữ chuẩn (tiền lệ Bài 10). **Bài tập:** không.
- **Sửa (cổng):** #9: $\mathbb E[S_{n-1}]=\Sigma$ chuyển sang hàng hiệu chỉnh (không cần $S_n\succ0$); hàng 1 ghi công thức thay cho số hiệu (4.3). #8: câu hỏi tự kiểm tra chuyển sang trang riêng TK04.
- **Nguồn:** L1447–1463.
- **Phác thảo:** bảng ba cột "Kết quả | Giả thiết không được bỏ | Công thức": (1) Hợp lý cực đại tương đương rủi ro thực nghiệm | mẫu i.i.d. | $\operatorname{argmax}L=\operatorname{argmin}\hat R_n$ (2) Ước lượng Bernoulli | miền đóng $[0,1]$ | $\hat p=s/n$ (3) Ước lượng phân loại | đơn hình đóng | $\hat\pi_k=n_k/n$ (4) Gaussian một chiều | $Q>0$ | $\hat\mu=\bar x$, $\hat\sigma^2=Q/n$ (5) Hiệu chỉnh phương sai và hiệp phương sai mẫu | $n\ge2$, mômen bậc hai hữu hạn | $\mathbb E[Q_X/(n-1)]=\sigma^2$, $\mathbb E[S_{n-1}]=\Sigma$ (6) Gaussian nhiều chiều | $S_n\succ0$ | $\hat\mu=\bar x$, $\hat\Sigma=S_n$ (7) Đường đồng mức Gaussian | $\Sigma\succ0$ | $d^2_\Sigma=\sum_jz_j^2/\lambda_j$. ≈48 âm tiết chữ trong bảng, 7 hàng (bảng tính là một khối).
- **Ghi chú diễn giả:** mỗi hàng ghi giả thiết mà bỏ đi thì công thức sai hoặc nghiệm không tồn tại: mẫu chép từ một cờ làm hỏng dạng tích; miền mở và mẫu toàn $0$ không có nghiệm Bernoulli; $Q=0$ hoặc $S_n$ suy biến làm hợp lý không bị chặn. Các ứng dụng: phân phối nhãn (Định lý 11.7), trung bình tín hiệu dưới nhiễu Gaussian (Định lý 11.9), mô hình chung cho đặc trưng tương quan (Định lý 11.14), chọn mất mát qua mô hình nhiễu (Mệnh đề 11.3) (L1440–1443).

#### TK01b — Kết quả và giả thiết: độ chệch, nhiều chiều, hình học
- **Lý do tồn tại:** phần thứ hai của bảng tổng kết, tách khỏi TK01 khi dựng HTML vì bảng bảy hàng tràn khung 16:9 ở cỡ chữ chuẩn.
- **Nhu cầu/khoảng trống:** như TK01.
- **Đầu vào → đầu ra:** TK01 → ba hàng còn lại của bảng.
- **Vị trí:** tổng hợp sườn; phần việc: giả thiết của tiêu chuẩn không chệch, Gaussian nhiều chiều và hình học. **Mục tiêu:** 4, 5.
- **Quyết định:** `tách` (từ TK01, giai đoạn B) — bảng bảy hàng cao hơn khung 298 px; quy tắc học phần cấm thu nhỏ chữ.
- **Sửa (rà soát):** #49: ứng dụng trong ghi chú diễn giả thành danh sách. #51: ghi chú diễn giả trở lại câu hỏi mở đầu ($9/2<8$).
- **Bài tập:** không.
- **Nguồn:** L1449–1463.
- **Phác thảo:** (1) bảng Số đo sau rà soát: 28 âm tiết, 1 dòng, 0 công thức hiển thị, dòng dài nhất 0.
- **Ghi chú diễn giả:** Hiệu chỉnh phương sai không cần giả thiết Gaussian; $S_n$ suy biến làm hợp lý Gaussian nhiều chiều không bị chặn; khoảng cách Mahalanobis cần $\Sigma$ khả nghịch. Với dữ liệu cảm biến nền, $d^2_{\hat\Sigma}(a,\hat\mu)=9/2<8=d^2_{\hat\Sigma}(b,\hat\mu)$: $b$ lệch hơn dù gần tâm hơn theo khoảng cách Euclid. Các bài toán khác của học máy dùng cùng công cụ, bao gồm:ước lượng phân phối nhãn của một tập dữ liệu phân loại; học trung bình của một tín hiệu dưới nhiễu Gaussian; học một mô hình chung cho các đặc trưng tương quan; chọn hàm mất mát qua việc chọn mô hình nhiễu.

#### TK02 — Bài tập: hàm mất mát từ giả thiết phân phối
- **Lý do tồn tại:** bài tổng hợp của mạch kết luận (Q-B): câu 2–3 của câu hỏi cuối buổi.
- **Nhu cầu/khoảng trống:** người học ghép mất mát từ hai giả thiết và nghiệm biên trong một bài.
- **Đầu vào → đầu ra:** HL06, TS03, TS07, G104 → đề.
- **Vị trí:** kiểm tra tổng hợp. **Mục tiêu:** 2, 6.
- **Quyết định:** `thêm`. **Bài tập:** có lời giải trên mặt trang (TK03).
- **Sửa (rà soát):** #47: ghi chú diễn giả bỏ câu chỉ đường; gợi ý gọi tên kết quả.
- **Nguồn:** L1483–1489.
- **Phác thảo:** (1) Câu hỏi: Dữ liệu $D=(x_1,\ldots,x_n)$ của mẫu i.i.d. (7) (2) (a) Viết hàm mất mát của ước lượng hợp lý cực đại cho Bernoulli$(p)$ và cho $\mathcal N(\mu,v)$, $v$ đã biết. (18) (3) (b) Năm lần kiểm tra liên tiếp đều cho cờ $0$: tìm nghiệm cho Bernoulli trên $[0,1]$. (15) (4) (c) Xét kết luận "thiết bị không bao giờ gắn cờ". (11) Số đo sau rà soát: 49 âm tiết, 4 dòng, 0 công thức hiển thị, dòng dài nhất 18.
- **Ghi chú diễn giả:** Gợi ý: (a) dùng tương đương giữa hợp lý cực đại và rủi ro thực nghiệm với từng mô hình; (b) dùng định lý ước lượng Bernoulli với $s=0$; (c) tính xác suất năm cờ đều bằng $0$ dưới một giá trị $p>0$.

#### TK03 — Bài tập: hàm mất mát từ giả thiết phân phối, lời giải
- **Lý do tồn tại:** lời giải bài tổng hợp trên mặt trang (cùng tiêu đề, trang kế tiếp; AGENTS.md "Trang bài tập").
- **Nhu cầu/khoảng trống:** đối chiếu lời giải.
- **Đầu vào → đầu ra:** TK02 → entropy chéo nhị phân, tổng bình phương, $\hat p=0$, $(4/5)^5\approx0{,}328$.
- **Vị trí:** kiểm tra tổng hợp. **Mục tiêu:** 2, 6.
- **Quyết định:** `thêm`. **Bài tập:** lời giải trên mặt trang.
- **Sửa (cổng):** #20: dòng "Diễn giải:" (kết luận không điều kiện) chuyển vào ghi chú diễn giả; trang kết bằng con số $0{,}328$.
- **Sửa (rà soát):** #33: tiêu đề "…, lời giải". #43: "bỏ hằng số và hệ số dương $\frac1{2vn}$". D2: "(định lý ước lượng Bernoulli)". #49: ghi chú diễn giả thành danh sách.
- **Nguồn:** L1491–1495.
- **Phác thảo:** (1) Lời giải: (a) Bernoulli: entropy chéo nhị phân $-\frac1n\sum_i[x_i\log p+(1-x_i)\log(1-p)]$. (8) (2) Gaussian: $\frac12\log(2\pi v)+\frac1{2vn}\sum_i(x_i-\mu)^2$; bỏ hằng số và hệ số dương $\frac1{2vn}$, còn tổng bình phương sai lệch, nghiệm $\hat\mu=\bar x$. (15) (3) (b) $s=0$, $n=5$: $\hat p=0$ (định lý ước lượng Bernoulli). (6) (4) (c) Không kết luận được: với $p=1/5$, xác suất năm cờ $0$ là $(4/5)^5\approx0{,}328$. (11) Số đo sau rà soát: 40 âm tiết, 4 dòng, 0 công thức hiển thị, dòng dài nhất 15.
- **Ghi chú diễn giả:** $(4/5)^5=1024/3125$: một mẫu năm cờ $0$ xảy ra khá thường xuyên dù xác suất gắn cờ dương. Nghiệm tối ưu trên mẫu đã thấy chưa cho biết chất lượng dự đoán trên quan sát mới. Một hàm mất mát được suy ra từ một giả thiết phân phối bằng cách lấy âm log-hợp lý, bao gồm:giả thiết Gaussian cho tổng bình phương sai lệch; giả thiết Bernoulli cho entropy chéo nhị phân; giả thiết phân loại cho entropy chéo nhiều lớp.Trên cùng dữ liệu $(0,0,9)$, nhiễu Gaussian cho ước lượng $3$, nhiễu Laplace cho ước lượng $0$.

#### TK04 — Câu hỏi tự kiểm tra
- **Lý do tồn tại:** câu hỏi tự kiểm tra thuộc mạch kết luận (AGENTS.md, "Mở bài và kết bài"); tiền lệ TK04 của Bài 10.
- **Nhu cầu/khoảng trống:** bốn giả thiết hay bị quên khi dùng các công thức (L1458–1463).
- **Đầu vào → đầu ra:** TK01–TK03 → bốn câu hỏi; đáp án trong ghi chú diễn giả.
- **Vị trí:** tổng hợp sườn (giới hạn áp dụng); phần việc: kiểm tra giả thiết. **Mục tiêu:** 1, 2, 4.
- **Quyết định:** `thêm`.
- **Sửa (cổng):** #8: trang mới (75 trang).
- **Sửa (rà soát):** #10: câu 1 "sáu cờ" (khớp HL02); câu 2 thay bằng ba điểm thẳng hàng (mạch 5); câu 4 bỏ ý tiên nghiệm; danh sách vào trong khung `.check`; mọi câu kết bằng "?". #40: ghi chú diễn giả dùng $q(\theta)$.
- **Bài tập:** tự kiểm tra, đáp án trong ghi chú diễn giả.
- **Nguồn:** L1458–1463.
- **Phác thảo:** (1) Câu hỏi: (2) (2) Sáu cờ được chép từ một cờ: hàm hợp lý có dạng tích không? (14) (3) Ba điểm thẳng hàng trong $\mathbb R^2$: có ước lượng Gaussian hai chiều với $\Sigma\succ0$ không? (13) (4) Năm số đo bằng nhau: có ước lượng Gaussian với $v>0$ không? (11) (5) Hàm hợp lý là hàm của biến nào khi dữ liệu cố định? (13) Số đo sau rà soát: 53 âm tiết, 5 dòng, 0 công thức hiển thị, dòng dài nhất 14.
- **Ghi chú diễn giả:** (1) Không: dạng tích dùng giả thiết độc lập; với cờ chép, mọi chuỗi có cả $0$ lẫn $1$ có xác suất $0$. (2) Không: các $\tilde x_i$ nằm trên một đường thẳng, $S_3$ suy biến, log-hợp lý không bị chặn trên. (3) Không: $Q=0$, log-hợp lý tăng vô hạn khi $v\downarrow0$. (4) Hàm của tham số $\theta$. Phát biểu về xác suất của tham số cần thêm một mật độ tiên nghiệm $q(\theta)$, cho hậu nghiệm $q(\theta\mid D)\propto L(\theta;D)\,q(\theta)$.

#### TK05 — Tài liệu đọc và chuyển tiếp
- **Lý do tồn tại:** tài liệu đọc và cầu nối sang bài sau bằng lời (AGENTS.md: không xem trước bài sau trên mặt trang).
- **Nhu cầu/khoảng trống:** người học cần biết đọc gì và giới hạn nào của bài dẫn tới bài sau.
- **Đầu vào → đầu ra:** TK03 → nhu cầu: tham số phụ thuộc đầu vào, chất lượng trên quan sát mới.
- **Vị trí:** giới hạn áp dụng của sườn. **Mục tiêu:** cả sáu.
- **Quyết định:** `thêm`; mã TK05 như kế hoạch; TK04 là trang câu hỏi tự kiểm tra (cổng #8). **Bài tập:** tự học 11.4–11.8 (gợi ý trong tệp bài tập).
- **Nguồn:** L1497–1510.
- **Phác thảo:** (1) Murphy (2022), *Probabilistic Machine Learning: An Introduction*, §4.1, §4.2.1–4.2.6, §4.3, §4.7.6.1. (6) (2) Mở rộng: Murphy (2022), §4.5–4.5.2, §4.6.2, §6.2, §7.4.4–7.4.5. (2) (3) Bài tập tự học 11.4–11.8 trong tệp bài tập của Bài 11. (12) (4) **Nhu cầu:** cho tham số phụ thuộc đầu vào và đo chất lượng dự đoán trên quan sát mới. (19) ≈45 âm tiết, 4 dòng.
- **Ghi chú diễn giả:** trước buổi học: Murphy §2.4–2.6 và §3.2.1–3.2.2; sau buổi học: §4.1, §4.2.1–4.2.6, §4.3, §4.7.6.1; Bài tập 4.1, 4.7, 4.8 của Murphy luyện thêm Định lý 11.9 và Mệnh đề 11.11 (L1505–1506). Đọc thêm §4.7.1–4.7.4 về phân phối mẫu và khoảng tin cậy (L1508). Ở các mô hình của bài, mọi quan sát dùng chung một tham số, và chất lượng của tham số chỉ được đo trên mẫu đã thấy. Bài 12 cho tham số phụ thuộc đầu vào, dưới dạng mô hình có điều kiện $p_\theta(y\mid x)$, và xét câu hỏi: tham số khớp tốt trên tập huấn luyện dự đoán quan sát mới tốt đến đâu (L1499).

## (d) Trang có nguy cơ vượt trần và quyết định

| Trang | Ước lượng | Nguy cơ | Quyết định nếu số đo thật vượt |
|---|---|---|---|
| MD01 | ≈77/80 âm tiết | gần trần trang mục tiêu | `sửa`: rút mục (4) |
| MD02 | 7 dòng | ngoại lệ trần sáu dòng (Q-K) | giữ |
| HL03 | ≈58/60 | bốn định nghĩa trên một trang | `sửa`: chuyển "*dữ liệu* … là giá trị quan sát" vào ghi chú diễn giả |
| HL07 | ≈56/60 | tên bước dài | `sửa`: dòng cuối vào ghi chú diễn giả |
| TS01 | ≈56/60, 6 dòng | gộp bốn bước | `tách` (5.1) sang TS03 |
| TS05 | ≈59/60 | dòng "Lưu ý:" | `sửa`: "Lưu ý:" vào ghi chú diễn giả |
| TS08, TS09, TS10, TS16 | ≈56–59/60 | đề bài dài | `sửa`: rút đề; lời giải sang trang kế tiếp |
| TS14 | khối `aligned` bốn dòng | tràn ở 390 px | `tách` thành hai trang |
| G108, G109 | ≈55–56/60 | — | `sửa`: dòng "Lưu ý:"/"Trực quan." thứ hai vào ghi chú diễn giả |
| GN04, GN14 | ma trận $2\times2$ trong `aligned` | tràn ở 390 px | ngắt dòng `aligned`, đo bằng Playwright |
| GN06 | 6 dòng, 2 khối `aligned` dài | tràn ở 390 px | dòng lộ trình vào ghi chú diễn giả |
| GN09 | công thức $\ell(\bar x,\Sigma_\varepsilon)$ dài | tràn ở 390 px | ngắt `aligned` bốn dòng |
| HH07 | ≈54/60, 6 dòng | đề và lời giải cùng trang | lời giải (a) sang HH08 |
| TK01 | bảng bảy hàng | cao quá khung | `tách` TK01, TK01b |
| HL05, G102, G104, TS04, GN05, HH02, HH04 | khối `aligned` hai đến bốn dòng | tràn ở 390 px (cổng #18) | mỗi dòng một quan hệ; đo bằng Playwright |
| GN03 | ≈63/60 sau khi thêm "Trực quan." | vượt trần | `sửa`: dòng (8.4) vào ghi chú diễn giả |

Theo cổng #17, số âm tiết trong mục (c) tính cả tên bước in đậm; số đo thật sau khi dựng HTML ghi ở mục (e).


## (e) Số đo thật sau khi dựng HTML (giai đoạn B, 2026-11-07)

Đo bằng `deck_check.py` (Playwright, 1600×900 và 390×844) trên deck 76 trang: 0 lỗi console, 0 lỗi trang, 0 yêu cầu hỏng, 0 `.katex-error`; mọi trang nội dung ≤ 60 âm tiết, MD01 77/80; mọi dòng ≤ 20 âm tiết (trừ dòng dẫn của trang tiêu đề mạch, trần 25); mọi trang ≤ 6 dòng trừ MD02; ≤ 3 công thức hiển thị. Cờ "tràn" của bộ kiểm tra ở G101, GN07, GN14, HH02, HH03, HH05–HH08 đều là phần đuôi SVG của dấu căn KaTeX (`span.hide-tail`, `overflow:hidden`, kiểm bằng Playwright); không phần tử hiển thị nào ra ngoài khung. Ở 390 px không trang nào cuộn ngang toàn trang; công thức rộng cuộn trong vùng `.formula` có dấu ↔, như Bài 10. Âm tiết đếm như AGENTS.md (không tính tiêu đề, KaTeX, ô số của bảng).

| Mã | Âm tiết | Dòng | Công thức hiển thị | Dòng dài nhất | Ghi chú |
|---|---|---|---|---|---|
| MD00 | 36 | 3 | 0 | 17 |  |
| MD01 | 77 | 6 | 0 | 17 |  |
| MD02 | 40 | 7 | 0 | 8 | ngoại lệ 7 dòng (Q-K) |
| MD03 | 41 | 6 | 1 | 15 |  |
| MD04 | 56 | 4 | 0 | 17 |  |
| HL00 | 37 | 2 | 0 | 24 | trang tiêu đề mạch; dòng dẫn ≤25 |
| HL01 | 53 | 4 | 0 | 18 |  |
| HL02 | 57 | 6 | 0 | 20 |  |
| HL03 | 58 | 4 | 0 | 19 |  |
| HL04 | 47 | 6 | 1 | 14 |  |
| HL05 | 57 | 5 | 1 | 17 |  |
| HL06 | 58 | 5 | 1 | 18 |  |
| HL07 | 55 | 6 | 1 | 16 |  |
| HL08 | 57 | 5 | 0 | 17 |  |
| TS00 | 35 | 2 | 0 | 23 | trang tiêu đề mạch; dòng dẫn ≤25 |
| TS01 | 40 | 4 | 1 | 17 |  |
| TS03 | 40 | 5 | 1 | 13 |  |
| TS04 | 36 | 5 | 1 | 12 |  |
| TS05 | 51 | 5 | 0 | 18 |  |
| TS06 | 46 | 6 | 1 | 17 |  |
| TS07 | 47 | 5 | 1 | 18 |  |
| TS08 | 57 | 6 | 1 | 18 |  |
| TS09 | 48 | 5 | 0 | 14 |  |
| TS10 | 54 | 4 | 0 | 19 |  |
| TS11 | 30 | 5 | 2 | 13 |  |
| TS12 | 45 | 5 | 1 | 15 |  |
| TS13 | 47 | 6 | 1 | 14 |  |
| TS14 | 26 | 5 | 1 | 9 |  |
| TS15 | 40 | 6 | 1 | 12 |  |
| TS16 | 51 | 5 | 0 | 14 |  |
| TS17 | 46 | 5 | 1 | 19 |  |
| G100 | 39 | 2 | 0 | 24 | trang tiêu đề mạch; dòng dẫn ≤25 |
| G101 | 51 | 5 | 1 | 17 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| G102 | 34 | 4 | 1 | 15 |  |
| G103 | 46 | 5 | 1 | 15 |  |
| G104 | 33 | 6 | 2 | 14 |  |
| G105 | 32 | 5 | 1 | 12 |  |
| G106 | 35 | 5 | 1 | 19 |  |
| G107 | 43 | 3 | 0 | 13 |  |
| G108 | 52 | 5 | 0 | 18 |  |
| G109 | 55 | 5 | 0 | 19 |  |
| G110 | 29 | 5 | 1 | 11 |  |
| G111 | 40 | 6 | 1 | 12 |  |
| G112 | 49 | 5 | 0 | 20 |  |
| GN00 | 40 | 2 | 0 | 22 | trang tiêu đề mạch; dòng dẫn ≤25 |
| GN01 | 55 | 5 | 0 | 17 |  |
| GN02 | 42 | 6 | 2 | 13 |  |
| GN03 | 54 | 5 | 1 | 15 |  |
| GN04 | 27 | 6 | 2 | 15 |  |
| GN05 | 42 | 6 | 2 | 13 |  |
| GN06 | 27 | 5 | 2 | 14 |  |
| GN07 | 22 | 6 | 1 | 5 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| GN08 | 25 | 4 | 1 | 13 |  |
| GN09 | 19 | 5 | 2 | 12 |  |
| GN10 | 27 | 5 | 2 | 13 |  |
| GN11 | 47 | 6 | 1 | 14 |  |
| GN12 | 41 | 5 | 1 | 17 |  |
| GN13 | 39 | 5 | 0 | 15 |  |
| GN14 | 29 | 5 | 1 | 19 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH00 | 32 | 2 | 0 | 19 | trang tiêu đề mạch; dòng dẫn ≤25 |
| HH01 | 39 | 3 | 0 | 20 |  |
| HH02 | 36 | 5 | 2 | 15 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH03 | 32 | 5 | 1 | 10 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH04 | 38 | 6 | 1 | 14 |  |
| HH05 | 31 | 6 | 1 | 14 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH06 | 31 | 5 | 1 | 19 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH07 | 48 | 6 | 0 | 13 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH08 | 27 | 5 | 1 | 13 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH09 | 51 | 5 | 0 | 15 |  |
| TK00 | 30 | 2 | 0 | 19 | trang tiêu đề mạch; dòng dẫn ≤25 |
| TK01 | 31 | 1 | 0 | 0 |  |
| TK01b | 28 | 1 | 0 | 0 |  |
| TK02 | 49 | 4 | 0 | 18 |  |
| TK03 | 33 | 4 | 0 | 11 |  |
| TK04 | 54 | 5 | 0 | 16 |  |
| TK05 | 38 | 4 | 0 | 19 |  |

Thay đổi so với mục (c) khi dựng HTML:
- **TK01 `tách`** thành TK01 (bốn hàng: tương đương rủi ro thực nghiệm, Bernoulli, phân loại, Gaussian một chiều) và TK01b (ba hàng: hiệu chỉnh phương sai và hiệp phương sai mẫu, Gaussian nhiều chiều, đường đồng mức): bảng bảy hàng tràn 298 px ở 1600×900 (tiền lệ Bài 10). Deck có 76 trang; mạch 7 có 7 trang.
- **HL01 `sửa`:** 64 → 53 âm tiết; dòng "Các tham số … cố định nhưng chưa biết" chuyển vào ghi chú diễn giả; "Nhu cầu:" rút còn 17 âm tiết.
- **HL06 `sửa`:** 62 → 57 âm tiết ("Nhu cầu:" và dòng "Mệnh đề." rút gọn).
- **TS14 `sửa`:** khối `aligned` đặt cạnh hai dòng giải thích (`grid2`, như KV12 của Bài 10), hết tràn 29 px; không cần tách.
- **GN06 `sửa`:** dòng kết luận $\ell(\mu,\Sigma;D)\le\ell(\bar x,\Sigma;D)$ viết trong dòng chữ thay cho khối hiển thị; hết tràn 93 px; trang còn 2 khối hiển thị.
- **GN02, GN07, GN08, TS06, TS08, TS16 `sửa`:** bỏ `\text{…}` có chữ Việt trong KaTeX (gây cảnh báo phông); lời dẫn chuyển ra dòng chữ.
- **Trang bài tập:** đề nhiều phần đặt trong khung `.check` gồm nhiều đoạn, mỗi đoạn một phần (a), (b), … để mỗi dòng ≤ 20 âm tiết (HL08, TS08, TS16, G112, HH07, TK02).
- **HH01:** hình `gaussian-geometry-deck.svg` (bỏ nhãn vạch trục để không lẫn với nhãn elip $1$, $2$, $3$), cột hình rộng hơn cột chữ (luật theo trang trong `lecture-course.css`); không làm hình tùy chọn `bernoulli-loglik.svg`.
- GN07 và GN08 không gộp (Q-C2): mỗi trang đã có 5–6 dòng.
- Công thức dài ở 390 px (GN06, GN09, HH04, …) giữ một dòng ở màn rộng và cuộn ngang trong vùng `.formula` ở màn hẹp: ngắt thêm dòng `aligned` làm GN06, GN09 tràn 73–120 px ở 1600×900 (đã thử và hoàn lại).

## (f) Số đo sau chỉnh sửa theo năm rà soát (2026-11-07)

Đo lại bằng `deck_check.py` (1600×900 và 390×844) sau khi editor-lec11 áp dụng D1, D2 và các mục 1–52 (`review-log.md`, "Năm rà soát độc lập"): 76 trang; 0 lỗi console, 0 lỗi trang, 0 yêu cầu hỏng, 0 `.katex-error`; 0 `\tag`. Mọi trang nội dung ≤ 60 âm tiết (MD01 77/80), ≤ 6 dòng (trừ MD02), ≤ 3 công thức hiển thị, mọi dòng ≤ 20 âm tiết (dòng dẫn của trang tiêu đề mạch ≤ 25). Ở 1600×900 không trang nào tràn khung; cờ còn lại chỉ do đuôi SVG của dấu căn KaTeX, như mục (e). Cột ghi chú nêu bộ số cũ (âm tiết, dòng, công thức, dòng dài nhất) của các trang đổi số đo.

| Mã | Âm tiết | Dòng | Công thức hiển thị | Dòng dài nhất | Ghi chú |
|---|---|---|---|---|---|
| MD00 | 36 | 3 | 0 | 17 |  |
| MD01 | 77 | 6 | 0 | 17 |  |
| MD02 | 40 | 7 | 0 | 8 | ngoại lệ 7 dòng (Q-K) |
| MD03 | 41 | 6 | 1 | 15 |  |
| MD04 | 56 | 4 | 0 | 17 |  |
| HL00 | 37 | 2 | 0 | 24 | trang tiêu đề mạch; dòng dẫn ≤25 |
| HL01 | 53 | 4 | 0 | 18 |  |
| HL02 | 57 | 6 | 0 | 20 |  |
| HL03 | 58 | 4 | 0 | 19 |  |
| HL04 | 47 | 6 | 1 | 14 |  |
| HL05 | 57 | 5 | 1 | 17 |  |
| HL06 | 58 | 5 | 1 | 18 |  |
| HL07 | 55 | 6 | 1 | 16 |  |
| HL08 | 57 | 5 | 0 | 17 |  |
| TS00 | 37 | 2 | 0 | 25 | trang tiêu đề mạch; dòng dẫn ≤25; đổi so với (e): (35, 2, 0, 23) |
| TS01 | 56 | 5 | 1 | 17 | đổi so với (e): (40, 4, 1, 17) |
| TS03 | 41 | 5 | 1 | 13 | đổi so với (e): (40, 5, 1, 13) |
| TS04 | 36 | 5 | 1 | 12 |  |
| TS05 | 51 | 5 | 0 | 18 |  |
| TS06 | 48 | 6 | 1 | 19 | đổi so với (e): (46, 6, 1, 17) |
| TS07 | 53 | 5 | 1 | 18 | đổi so với (e): (47, 5, 1, 18) |
| TS08 | 57 | 6 | 1 | 18 |  |
| TS09 | 48 | 5 | 0 | 14 |  |
| TS10 | 57 | 4 | 0 | 19 | đổi so với (e): (54, 4, 0, 19) |
| TS11 | 31 | 5 | 2 | 12 | đổi so với (e): (30, 5, 2, 13) |
| TS12 | 47 | 5 | 1 | 15 | đổi so với (e): (45, 5, 1, 15) |
| TS13 | 47 | 6 | 1 | 16 | đổi so với (e): (47, 6, 1, 14) |
| TS14 | 26 | 5 | 1 | 9 |  |
| TS15 | 55 | 6 | 1 | 19 | đổi so với (e): (40, 6, 1, 12) |
| TS16 | 56 | 6 | 0 | 14 | đổi so với (e): (51, 5, 0, 14) |
| TS17 | 59 | 6 | 1 | 18 | đổi so với (e): (46, 5, 1, 19) |
| G100 | 39 | 2 | 0 | 24 | trang tiêu đề mạch; dòng dẫn ≤25 |
| G101 | 51 | 5 | 1 | 17 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| G102 | 34 | 4 | 1 | 15 |  |
| G103 | 51 | 5 | 1 | 17 | đổi so với (e): (46, 5, 1, 15) |
| G104 | 42 | 6 | 2 | 16 | đổi so với (e): (33, 6, 2, 14) |
| G105 | 32 | 5 | 1 | 12 |  |
| G106 | 35 | 5 | 1 | 19 |  |
| G107 | 54 | 3 | 0 | 20 | đổi so với (e): (43, 3, 0, 13) |
| G108 | 55 | 5 | 0 | 17 | đổi so với (e): (52, 5, 0, 18) |
| G109 | 55 | 5 | 0 | 19 |  |
| G110 | 37 | 5 | 1 | 19 | đổi so với (e): (29, 5, 1, 11) |
| G111 | 49 | 6 | 1 | 17 | đổi so với (e): (40, 6, 1, 12) |
| G112 | 48 | 5 | 0 | 20 | đổi so với (e): (49, 5, 0, 20) |
| GN00 | 40 | 2 | 0 | 22 | trang tiêu đề mạch; dòng dẫn ≤25 |
| GN01 | 56 | 5 | 0 | 18 | đổi so với (e): (55, 5, 0, 17) |
| GN02 | 42 | 6 | 2 | 13 |  |
| GN03 | 54 | 5 | 1 | 15 |  |
| GN04 | 29 | 6 | 2 | 17 | đổi so với (e): (27, 6, 2, 15) |
| GN05 | 42 | 6 | 2 | 13 |  |
| GN06 | 33 | 6 | 2 | 14 | đổi so với (e): (27, 5, 2, 14) |
| GN07 | 22 | 6 | 1 | 5 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| GN08 | 25 | 4 | 1 | 13 |  |
| GN09 | 19 | 5 | 2 | 12 |  |
| GN10 | 23 | 4 | 1 | 17 | đổi so với (e): (27, 5, 2, 13) |
| GN11 | 47 | 6 | 1 | 14 |  |
| GN12 | 41 | 5 | 1 | 17 |  |
| GN13 | 45 | 5 | 0 | 15 | đổi so với (e): (39, 5, 0, 15) |
| GN14 | 29 | 5 | 1 | 19 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH00 | 32 | 2 | 0 | 19 | trang tiêu đề mạch; dòng dẫn ≤25 |
| HH01 | 56 | 4 | 0 | 20 | đổi so với (e): (39, 3, 0, 20) |
| HH02 | 36 | 5 | 2 | 15 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH03 | 32 | 5 | 1 | 10 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH04 | 38 | 6 | 1 | 14 |  |
| HH05 | 31 | 6 | 1 | 14 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX |
| HH06 | 30 | 5 | 1 | 19 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX; đổi so với (e): (31, 5, 1, 19) |
| HH07 | 51 | 6 | 0 | 13 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX; đổi so với (e): (48, 6, 0, 13) |
| HH08 | 40 | 6 | 1 | 15 | cờ tràn chỉ do đuôi SVG của dấu căn KaTeX; đổi so với (e): (27, 5, 1, 13) |
| HH09 | 52 | 5 | 0 | 15 | đổi so với (e): (51, 5, 0, 15) |
| TK00 | 30 | 2 | 0 | 19 | trang tiêu đề mạch; dòng dẫn ≤25 |
| TK01 | 31 | 1 | 0 | 0 |  |
| TK01b | 28 | 1 | 0 | 0 |  |
| TK02 | 49 | 4 | 0 | 18 |  |
| TK03 | 40 | 4 | 0 | 15 | đổi so với (e): (33, 4, 0, 11) |
| TK04 | 53 | 5 | 0 | 14 | đổi so với (e): (54, 5, 0, 16) |
| TK05 | 38 | 4 | 0 | 19 |  |

Điều chỉnh khi đo:
- **G104:** khối tách tâm viết một dòng (bỏ `aligned`) vì câu dẫn dài thêm "Do $\sum_i(x_i-\bar x)=0$" làm trang tràn 26 px ở 1600×900; ở 390 px khối này cuộn ngang trong `.formula` như các khối dài khác.
- **GN06:** dòng lộ trình (#11) làm trang tràn 33 px; dòng "Do … số hạng cuối $\ge0$, bằng $0$ $\iff$ $\mu=\bar x$" rút còn một dòng, hết tràn. Không cần dời lộ trình sang GN05.
- **HL08:** lần đo đầu sau chỉnh sửa 68 âm tiết, sau khi rút 57: lời giải (a) gọi tên "rủi ro thực nghiệm" thay cho câu dẫn tên kết quả; (b) viết $L=\prod_ip_\theta(x_i)$.
- **G112:** dòng nhiệm vụ 21 → 18 âm tiết ("kiểm tra tỉ số $(n-1)/n$").

## (g) Số đo sau chỉnh sửa đợt 2 (rà lại vòng 1, 2026-11-07)

`deck_check.py` (1600×900 và 390×844, `check-edit2/` trong scratchpad điều phối): 76 trang; 0 lỗi console, 0 lỗi trang, 0 yêu cầu hỏng, 0 `.katex-error`; không trang nào tràn khung thật; mật độ trong trần (MD01 77/80, MD02 7 dòng như trước). Các trang có mặt trang đổi trong đợt 2 (các trang khác giữ số đo ở mục (f)):

| Mã | Âm tiết | Dòng | Công thức hiển thị | Dòng dài nhất |
|---|---|---|---|---|
| TS03 | 40 | 5 | 1 | 13 |
| TS07 | 49 | 5 | 1 | 18 |
| TS10 | 58 | 4 | 0 | 20 |
| TS13 | 58 | 6 | 1 | 20 |
| G104 | 46 | 6 | 2 | 16 |
| GN06 | 33 | 6 | 2 | 14 |
| GN10 | 20 | 4 | 1 | 14 |
| HH01 | 57 | 4 | 0 | 20 |

GN06: thử "khi và chỉ khi" (R11) làm trang tràn khung 1600×900, nên giữ "$\iff$". TS10: lần đo đầu dòng hai 21 âm tiết; bỏ chữ "riêng" còn 20. TS13: đo lại sau khi thay "Nhắc lại:" bằng câu không ký hiệu (quyết định R2 của điều phối viên, `check-edit3/`).

## (h) Bố cục mũi tên điều hướng (2026-11-07)

Kiểm định cuối (mức nhẹ): ở 1600×900, nút `controlsLayout:"edges"` giao chữ. Nút trái 8–44 px giao chữ bắt đầu ở x = 32 px; nút lên (782–818 × 8–44) giao tiêu đề hai dòng; nút xuống (782–818 × 853–911) giao dòng cuối. Đo hộp chữ (Range trên nút văn bản, cả `img`/`svg`) của 76 trang, fragment hiện hết: 90 giao nhau trên 60 trang.

Luật thêm trong `lecture-course.css`, khối Bài 11, `@media screen and (min-width:761px)` (màn hẹp giữ nguyên):

- trang `section[data-slide-id]`: `padding-inline:16px; box-sizing:border-box`;
- `.controls[data-controls-layout=edges]`: `--r-controls-spacing:0px` (nút trái/phải sát mép cửa sổ);
- nút lên, xuống dời vào cột lề phải: lên ở `top:50%`, `margin-top:-6.2em`; xuống ở `top:50%`, `margin-top:2.6em`, `padding-bottom:0`;
- GN06 (`p` lề .08em) và HH08 (`p` lề .06em), `.katex-display` lề 0: lề mới làm một dòng xuống dòng; thu khoảng cách khối, giữ cỡ chữ.

Số đo sau: hộp nút ở 1600×900 là trái −10–26 (bật: 0–36), phải 1564–1600 × 432–468, lên 1564–1600 × 388–424, xuống 1564–1600 × 476–512 (nhích theo hiệu ứng nhấp nháy); chữ nằm trong x = 51–1549. Giao nhau: 0 trên 76 trang ở 1600×900, 1280×720, 1366×768, 1920×1080. Ở 1024×768 (4:3) còn 48 giao nhau với mũi tên trái/phải, ngoài phạm vi kiểm. Đáy chữ GN06 856 px, HH08 858 px, trên chân trang (863 px). `deck_check.py` (`check-layout/`): 0 lỗi console, 0 lỗi trang, 0 yêu cầu hỏng, 0 `.katex-error`; không trang tràn khung thật (chỉ cờ `path` dấu căn KaTeX đã biết trên 9 trang như trước); mật độ và số đo 390×844 của cả 76 trang trùng `check-edit5/`.

## Phụ lục: bảng mạch lập luận của ghi chú bài giảng

Nội dung dưới đây là `storyboard.md` của giai đoạn ghi chú, giữ nguyên văn; chỉ hạ cấp tiêu đề hai bậc.

### Mạch lập luận của ghi chú Bài 11

Tài liệu chỉ có ghi chú; đây là bảng kiểm mạch khái niệm, không phải storyboard trang chiếu.

| Mạch | Nhu cầu và trực giác | Ví dụ trước/đi cùng hình thức hóa | Đầu ra toán học | Diễn giải AI và giới hạn |
|---|---|---|---|---|
| 11.1 | Tham số ở Bài10 được cho trước; nay phải xác định từ dữ liệu | Rút có hoàn lại, bảy lần thành công trên mười | Mô hình, mẫu, ước lượng, likelihood, log-likelihood, MLE | Hàm mục tiêu tối ưu xuất phát từ mô hình; phụ thuộc làm tích likelihood sai |
| 11.2 | Một tần suất cần được biện minh | Bernoulli7/10 và các mẫu toàn0/toàn1 | Đạo hàm, độ cong, cực đại biên | Mất mát logarit; xác suất0 là nghiệm mẫu, không phải kết luận bất khả |
| 11.3 | Nhiều xác suất phải tổng bằng1 | Counts(2,3,5) | Lagrange, nghiệm trên mặt simplex | Phân loại nhiều nhóm và hiện tượng nhóm chưa thấy |
| 11.4 | Cảm biến có giá trị thực và độ phân tán chưa biết | Dữ liệu(0,1,2,3,4) | Phân rã tổng bình phương, mean/variance MLE, không chệch | Mất mát bình phương có nguồn gốc Gaussian; mẫu hằng làm likelihood không bị chặn |
| 11.5 | Hai cảm biến tương quan cần mô hình chung | Mean(10,20), covariance[[2.5,1.5],[1.5,2.5]] | Covariance MLE, kiểm hạng, eigenpairs, Mahalanobis | Euclid và Mahalanobis xếp hạng khác nhau; mẫu thẳng hàng và sai mô hình |

Bài10 cung cấp các họ phân phối và hiệp phương sai. Bài03 cung cấp nhân tử Lagrange; Bài05 cung cấp góc nhìn tối ưu hàm mất mát. Bài11 dùng các công cụ này để xây dựng nguyên lý ước lượng. Giới hạn còn lại là khớp mẫu chưa bảo đảm dự đoán tốt trên mẫu mới; Bài12 trong kế hoạch xử lý rủi ro và tổng quát hóa.

Mỗi mạch có chứng minh, ví dụ tính tay, giới hạn giả thiết và bài củng cố có gợi ý/lời giải. Hai tình huống áp dụng cuối phần nội dung nêu cả mô hình phù hợp và trường hợp giả thiết bị vi phạm. Mở rộng Bayes/KL được tách khỏi tuyến chính.
