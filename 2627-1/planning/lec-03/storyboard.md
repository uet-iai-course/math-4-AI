# Storyboard Bài 03 — Bản nội dung 59 trang

Bản này thay bản 57 trang sau đợt sửa deck theo bảng phát hiện 2026-11-13 và lượt sửa sau kiểm lại cùng ngày (`review-log.md`, mục "Sửa deck theo bảng phát hiện 2026-11-13"). Chuẩn nội dung là `materials/lec-03/lecture-note.md` viết lại ngày 2026-11-12: ký hiệu $p$ cho số đẳng thức, $\hat x$ cho phương án khả thi, $\vartheta$ cho trọng số tổ hợp lồi, $(\tilde\lambda,\tilde\nu,\kappa)$ và $\mathcal A,\mathcal B$ trong chứng minh Slater, $J(w)=\|Xw-y\|_2^2$ và $w(\rho)$, $w(0)$ cho hồi quy.

## Chức năng, câu hỏi trung tâm và thời lượng của sáu mạch

Phân bổ nội bộ theo tổng 3 tiết của đề cương; không giả định số phút cho một tiết. Mạch 5 nhận thêm 0,05 tiết cho trang vector hỗ trợ, lấy từ mạch 2.

| Mạch | Trang tiêu đề | Câu hỏi trung tâm | Đầu vào | Đầu ra | Số tiết |
|---|---|---|---|---|---|
| 1. Mở đầu | S01-01 (bìa) | Đối ngẫu Lagrange chứng nhận một nghiệm theo cơ chế nào và bài học gồm những công cụ nào. | Một phương án khả thi chưa chứng nhận tối ưu | Sáu mục tiêu, sáu mạch | 0,10 |
| 2. Hàm và bài toán đối ngẫu Lagrange | S02-00 | Làm thế nào sinh cận dưới cho $p^*$ từ chính các hàm của bài toán, và chọn cận tốt nhất. | Nhu cầu chặn sai số của một phương án | $L$, $g$, đối ngẫu yếu, bài toán đối ngẫu, chứng nhận bằng một cặp | 0,80 |
| 3. Đối ngẫu mạnh và điều kiện Slater | S03-00 | Điều kiện nào kiểm tra được trên dữ liệu bảo đảm $d^*=p^*$ và có nhân tử đạt $d^*$. | $d^*\le p^*$ và ba ví dụ có $d^*=p^*$ | Khoảng đối ngẫu, phản ví dụ khoảng dương, định lý Slater, giới hạn | 0,45 |
| 4. Hình học của đối ngẫu | S04-00 | Nhân tử và cận dưới đọc được như độ dốc và tung độ gốc của một đường thẳng trên mặt phẳng giá trị như thế nào. | $g(1)=4{,}5$, $g(2)=5$, đối ngẫu mạnh | Đường cận, điểm tiếp xúc khả thi, $\lambda u=0$ | 0,35 |
| 5. Điều kiện Karush–Kuhn–Tucker | S05-00 | Hệ điều kiện nào cho nghiệm và nhân tử mà không cần công thức của $g$, và hệ đó cần hay đủ dưới giả thiết nào. | Hai điều kiện tại điểm tiếp xúc (mạch 4) | Hệ KKT, chiều đủ, chiều cần, hồi quy có ràng buộc chuẩn, vector hỗ trợ | 1,05 |
| 6. Tổng hợp và vận dụng | S07-00 | Ghép cận dưới, Slater và KKT thành một quy trình chứng nhận có giả thiết rõ. | Các công cụ của mạch 2–5 | Bảng ba bước, bài tập tổng hợp, tài liệu đọc | 0,25 |

Mã mạch 6 vẫn là S07 để giữ mã trang ổn định; `id` của trang tiêu đề là `mach-6`. Số mạch 6, nằm trong giới hạn 5–7.

## Bản đồ hành trình khái niệm

| Cụm | Sáu bước, gán nhãn theo trang | Đầu vào, đầu ra, ký hiệu và câu nối |
|---|---|---|
| Hàm và bài toán đối ngẫu (0,80 tiết) | nhu cầu S02-00, S02-01 → ví dụ dẫn nhập S02-02 → trực quan S02-03 (họ hàm tạo cận, $\lambda=1,2$) → hình thức S02-04, S02-05, S02-05c–05d → ví dụ tính $g$ S02-05a–b → hình thức S02-06 (đối ngẫu yếu), S02-07 (bài toán đối ngẫu) → ví dụ S02-07c (giải bài toán đối ngẫu một biến) → ứng dụng S02-07a–b (hai nhân tử) → bài tập S02-08, lời giải S02-08b (Bài tập 03.2) | Truyền $f_0,f_1,x,\lambda$ từ ví dụ sang $L,g$. S02-07 chỉ còn định nghĩa; số liệu một biến chuyển sang S02-07c. Câu nối sang mạch 3: mọi ví dụ của mạch 2 có $d^*=p^*$, đối ngẫu yếu chỉ bảo đảm $d^*\le p^*$. |
| Đối ngẫu mạnh và Slater (0,45 tiết) | nhu cầu S03-00, S03-01 (Nhu cầu: và định nghĩa khoảng, đối ngẫu mạnh) → ví dụ S03-01b (khoảng dương, bài toán chọn gói) → hình thức S03-03 (định nghĩa và định lý Slater, có dạng yếu; đứng trước trực quan theo yêu cầu người dùng trước đây, ngoại lệ có chủ ý) → trực quan S03-02b → chứng minh S03-03a–03c → ứng dụng S03-04, giới hạn S03-05 → bài tập S03-06, lời giải S03-06b (Bài tập 03.4) | Ví dụ khoảng dương đứng trước định lý để cho thấy đẳng thức $d^*=p^*$ cần giả thiết. Truyền $x^*=2$ nhưng phân biệt $\bar x=3$. Câu nối sang mạch 4: định lý cho điều kiện đủ; hình học giải thích $\lambda=1$ lỏng, $\lambda=2$ khít. |
| Hình học (0,35 tiết) | nhu cầu S04-00, S04-01 → trực quan và ví dụ S04-01a (bốn điểm của $G$) → hình thức S04-01b (đường cận) → ứng dụng S04-02–03 ($\lambda=1$, $\lambda=2$) → bài tập S04-04, lời giải S04-04b (Bài tập 03.6, câu (a), (b)) | Truyền $u=f_1(x)$, $t=f_0(x)$, rồi $L=t+\lambda u$. Độ nhạy và giá bóng (Định nghĩa 03.22, Mệnh đề 03.23, Hệ quả 03.24, Ví dụ 03.14) chỉ trong ghi chú diễn giả S04-04b, theo quyết định người dùng 2026-11-13; không phải khái niệm của mặt trang. Câu nối sang mạch 5: điểm tiếp xúc khả thi và $\lambda u=0$. |
| KKT (1,05 tiết) | nhu cầu S05-00, S05-01 (Nhu cầu: và Mệnh đề 03.27) → trực quan và ví dụ S05-02 (bù trừ; $\min(x-1)^2$, $x-1\le0$) → hình thức S05-03 → ví dụ S05-04 → hình thức S05-05, S05-05b–05c, giới hạn S05-05a → ứng dụng S05-06–06b (hồi quy có ràng buộc chuẩn), S05-06c (vector hỗ trợ, Tình huống 03.1) → bài tập S05-07, lời giải S05-07b (Bài tập 03.9) | Đầu vào cận khít, gradient của hàm lồi; đầu ra giải theo từng trường hợp của điều kiện bù trừ và chứng nhận hồi quy. Quy ước hồi quy theo ghi chú: $J=\|Xw-y\|_2^2$ cho $(X^TX+\lambda I)w=X^Ty$; ví dụ và bài tập dùng mục tiêu có $\tfrac12$ như Ví dụ 03.19, Bài tập 03.9, và S05-06a nêu quan hệ hệ số 2. |

Mở đầu và tổng hợp không phải khái niệm toán mới: chu trình rút gọn nhu cầu → bản đồ → đánh giá. Đối ngẫu quy hoạch tuyến tính (Mệnh đề 03.11) và ví dụ khoảng dương của bài toán lồi trên miền mở (Ví dụ 03.8) nằm trong ghi chú diễn giả S02-07 và S03-01b; máy vector hỗ trợ lề mềm có một trang ví dụ S05-06c (Tình huống 03.1), phần đối ngẫu đầy đủ (Mệnh đề 03.37) là đọc thêm ở S07-03. Lý do: giữ sáu mạch và trần mật độ; quy hoạch tuyến tính đã có chứng nhận ở Bài 02.

## Quyết định theo từng trang

LLO4/CLO1 dùng cho cận và điều kiện tối ưu; LLO5/CLO1 cho hình học; CLO1 cho vận dụng vào hồi quy. "Âm tiết" là số token của `deck_check.py` (bỏ tiêu đề, KaTeX, ô số, ghi chú). Quyết định ghi trạng thái sau đợt 2026-11-13; lịch sử trước đó ở mục cuối và trong `review-log.md`.

| Mã | Tiêu đề | Lý do tồn tại, khoảng trống, đầu vào → đầu ra | Trước → sau | Chuẩn | Quyết định |
|---|---|---|---|---|---|
| S01-01 | Bài 03: Đối ngẫu Lagrange | Đặt vấn đề chứng nhận nghiệm bằng cận dưới trước mọi ký hiệu. | — → S01-02 | LLO4/CLO1 | sửa — ghi chú: $\hat x$, các công cụ gồm cả hàm giá trị, sáu mục tiêu |
| S01-02 | Mục tiêu học tập | Sáu dòng mục tiêu gộp từ sáu mục tiêu của ghi chú (G3), trừ phần độ nhạy của mục tiêu 4. | S01-01 → S01-03 | LLO4–5/CLO1 | sửa — 4 → 6 mục tiêu; bỏ hộp tiên quyết (chuyển vào ghi chú diễn giả); lượt sửa sau kiểm lại: bỏ phần độ nhạy theo quyết định người dùng 2026-11-13 (ngoại lệ G3, ghi trong ghi chú diễn giả), gộp mục 1–2, thêm máy vector hỗ trợ vào mục vận dụng; cắt câu "Mỗi mục tiêu ứng với…"; 75 âm tiết (trang mục tiêu, trần 80) |
| S01-03 | Nội dung | Sáu mạch đánh số, trùng tên trang tiêu đề mạch. | S01-02 → S02-00 | LLO4/CLO1 | sửa — mục 4 "Hình học của đối ngẫu"; ghi chú bỏ câu dẫn "tài liệu bài tập" và câu về hàm giá trị |
| S02-00 | 2. Hàm và bài toán đối ngẫu Lagrange | Trang tiêu đề mạch; nhu cầu cận dưới. Đầu vào: phương án chỉ cho cận trên; đầu ra: nhiệm vụ cho S02-01. | S01-03 → S02-01 | LLO4/CLO1 | giữ — ghi chú $\hat x$ |
| S02-01 | Cận dưới cho giá trị tối ưu | Nêu nhu cầu cận dưới; tập khả thi, $p^*$, nghiệm tối ưu chỉ còn là "Nhắc lại:". | S02-00 → S02-02 | LLO4/CLO1 | sửa — thêm "Nhắc lại:" và "Nhu cầu:", bỏ phần dạy lại; $\hat x$; 55 → 37 âm tiết |
| S02-02 | Ví dụ: bài toán một biến trên đoạn [2,4] | Ví dụ dẫn nhập xuyên suốt: $x^*=2$, $p^*=5$. | S02-01 → S02-03 | LLO4/CLO1 | sửa — ghi chú "dạng $f_i(x)\le0$" thay "dạng chuẩn"; công thức hiển thị trong `div` (7 → 6 dòng) |
| S02-03 | Họ hàm tạo cận dưới | Trực quan: cộng $\lambda f_1$ không vượt $f_0$ trên miền khả thi; cận 4,5 và 5. | S02-02 → S02-04 | LLO4/CLO1 | giữ — thuật ngữ tiếng Anh cận khít/cận lỏng chuyển lên lần dùng đầu ở S02-01 |
| S02-04 | Hàm Lagrange | Định nghĩa tổng quát; dấu và kích thước nhân tử. | S02-03 → S02-05 | LLO4/CLO1 | sửa — $A\in\mathbb R^{p\times n}$, $\nu\in\mathbb R^p$ (ghi chú dùng $p$); thuật ngữ mới in nghiêng |
| S02-05 | Hàm đối ngẫu | Định nghĩa $g$; inf thay min, không áp lại ràng buộc, $g=-\infty$. | S02-04 → S02-05c | LLO4/CLO1 | sửa — thuật ngữ in nghiêng |
| S02-05c | Tính lõm của hàm đối ngẫu | Cấu trúc của $g$: bài toán đối ngẫu là bài toán lồi. | S02-05 → S02-05d | LLO4/CLO1 | sửa — $\vartheta$ thay $\alpha$; ghi chú bỏ câu "chưa cho biết" và câu chỉ đường |
| S02-05d | Chứng minh: tính lõm của hàm đối ngẫu | Hai bước: affine theo nhân tử, rồi lấy inf. | S02-05c → S02-05a | LLO4/CLO1 | sửa — $\vartheta$; $\mathbb R^m\times\mathbb R^p$ |
| S02-05a | Ví dụ: bài toán một biến, lập hàm Lagrange | Thay $f_0$, $f_1$, gom hệ số theo $x$. | S02-05d → S02-05b | LLO4/CLO1 | giữ |
| S02-05b | Ví dụ: bài toán một biến, tính hàm đối ngẫu | Hoàn thành bình phương, $g(\lambda)=10-\lambda-\frac9{1+\lambda}$. | S02-05a → S02-06 | LLO4/CLO1 | giữ |
| S02-06 | Đối ngẫu yếu | $g\le L\le f_0$ trên miền khả thi, không cần tính lồi. | S02-05b → S02-07 | LLO4/CLO1 | giữ |
| S02-07 | Bài toán đối ngẫu | Định nghĩa bài toán đối ngẫu, nghiệm đối ngẫu, $d^*\le p^*$. | S02-06 → S02-07c | LLO4/CLO1 | sửa — tách: chỉ giữ phát biểu chung, số liệu một biến và hình chuyển sang S02-07c; hộp chỉ còn $d^*\le p^*$ (bỏ câu lặp "Ý nghĩa:" của S02-05c); ghi chú thêm đối ngẫu quy hoạch tuyến tính (Mệnh đề 03.11) |
| S02-07c | Ví dụ: bài toán một biến, giải bài toán đối ngẫu | Ví dụ 03.4: cực đại $g$, $\lambda^*=2$, $d^*=5$, chứng nhận cả hai phía, kèm "Diễn giải:". | S02-07 → S02-07a | LLO4/CLO1 | thêm (tách từ S02-07) — trang "Ví dụ:" riêng cho số liệu; 16 âm tiết |
| S02-07a | Ví dụ: bài toán hai biến, tính hàm đối ngẫu | Ví dụ 03.6: hai nhân tử, inf theo từng biến. | S02-07c → S02-07b | LLO4/CLO1 | sửa — bỏ `\text{với}` trong KaTeX (cảnh báo console); 9 → 5 dòng; ghi chú "dạng $f_i(x)\le0$", bỏ "ví dụ tính trực tiếp" |
| S02-07b | Ví dụ: bài toán hai biến, giải bài toán đối ngẫu | Giải đối ngẫu hai nhân tử, chứng nhận $x^*=(1,2)$. | S02-07a → S02-08 | LLO4/CLO1 | sửa — 7 → 6 dòng; ghi chú trỏ Ví dụ 03.6 |
| S02-08 | Bài tập: đối ngẫu của hàm tuyến tính trên hình tròn | Bài tập trên lớp của cụm: Bài tập 03.2 của ghi chú ($g=-\infty$ trên một phần trục nhân tử). | S02-07b → S02-08b | LLO4/CLO1 | sửa — thay bài tự dựng $\min(x-2)^2$, $x\le1$ bằng Bài tập 03.2 (G5; dẫn chiếu cũ "bài 2 của tài liệu bài tập" không còn); id giữ |
| S02-08b | Bài tập: đối ngẫu của hàm tuyến tính trên hình tròn | Lời giải trên mặt trang: $g(\lambda)=-\frac1{2\lambda}-2\lambda$, $\lambda^*=\frac12$, $x^*=(-1,-1)$, $p^*=d^*=-2$. | S02-08 → S03-00 | LLO4/CLO1 | sửa — theo Bài tập 03.2; 24 âm tiết |
| S03-00 | 3. Đối ngẫu mạnh và điều kiện Slater | Trang tiêu đề mạch; nhu cầu điều kiện bảo đảm $d^*=p^*$. | S02-08b → S03-01 | LLO4/CLO1 | sửa — ghi chú nêu bài toán chọn gói và phản ví dụ hai biến |
| S03-01 | Khoảng đối ngẫu và đối ngẫu mạnh | "Nhu cầu:" và định nghĩa ba đại lượng với $\hat x$ khả thi, $(\lambda,\nu)$ khả thi đối ngẫu. | S03-00 → S03-01b | LLO4/CLO1 | gộp — nhận định nghĩa đối ngẫu mạnh từ S03-02; số liệu ví dụ chuyển vào ghi chú; 42 âm tiết |
| S03-01b | Ví dụ: khoảng đối ngẫu dương | Ví dụ 03.7: bài toán chọn gói trên $D=\{0,1\}^3$ có $d^*=3<4=p^*$; "Lưu ý:" $g$ lấy infimum trên $D$; tạo nhu cầu cho giả thiết. | S03-01 → S03-03 | LLO4/CLO1 | thêm — bảng phát hiện yêu cầu ví dụ khoảng dương; lượt sau kiểm lại: dòng "Lưu ý:" về miền $D$, ràng buộc gộp vào "Nhắc lại:"; ghi chú nêu Ví dụ 03.8 (bài toán lồi vẫn có thể có khoảng dương); 40 âm tiết |
| S03-03 | Điều kiện Slater | Định nghĩa và định lý Slater (Định lý 03.15(a)), dạng yếu (03.15(b)) trong câu thứ hai của hộp. | S03-01b → S03-02b | LLO4/CLO1 | sửa — thêm dạng yếu; giả thiết $p^*$ hữu hạn lên dòng "Giả thiết:"; 54 âm tiết |
| S03-02b | Trực quan của điều kiện Slater | Độ dư quanh $\bar x=3$; điểm Slater khác nghiệm. | S03-03 → S03-03a | LLO4/CLO1 | sửa — "thỏa ngặt" thay "thỏa chặt" (nghĩa $f_i<0$); ghi chú bỏ "Hình minh họa giả thiết…", "Hình tự vẽ…"; thứ tự sau định lý giữ theo yêu cầu người dùng trước đây |
| S03-03a | Chứng minh: định lý Slater | Bốn bước theo ghi chú: tách $\mathcal A$, $\mathcal B$; $(\tilde\lambda,\tilde\nu,\kappa)$; $\kappa>0$; dựng nhân tử. | S03-02b → S03-03b | LLO4/CLO1 | sửa — ký hiệu và đánh số bước theo chứng minh Định lý 03.15(a); 50 âm tiết, 6 dòng |
| S03-03b | Chứng minh: định lý Slater, hệ số bất đẳng thức | Khai triển bước 3: dấu chặt buộc $\tilde\lambda=0$. | S03-03a → S03-03c | LLO4/CLO1 | sửa — $\tilde\lambda$, $\kappa$ |
| S03-03c | Chứng minh: định lý Slater, hệ số đẳng thức | Khai triển bước 3: các hàng độc lập buộc $\tilde\nu=0$. | S03-03b → S03-04 | LLO4/CLO1 | sửa — $\tilde\nu$, $\kappa$ |
| S03-04 | Ví dụ: điều kiện Slater cho bài toán một biến | Kiểm tra ba giả thiết trên bài toán một biến (Ví dụ 03.9). | S03-03c → S03-05 | LLO4/CLO1 | sửa — $p^*$ hữu hạn suy từ $f_0\ge1$; hộp "Diễn giải:" |
| S03-05 | Ví dụ: bài toán không có điểm Slater | Ví dụ 03.10: $\min x_1+x_2$, $x_1^2+x_2^2\le0$; đối ngẫu mạnh còn, đạt nghiệm đối ngẫu mất. | S03-04 → S03-06 | LLO4/CLO1 | sửa — đổi sang bài toán hai biến của ghi chú, $g(\lambda)=-\frac1{2\lambda}$; tiêu đề "Ví dụ: …"; hộp "Diễn giải:" |
| S03-06 | Bài tập: điều kiện Slater cho ba bài toán | Bài tập 03.4: Slater, dạng yếu, $p^*=-\infty$, hàm không lồi. | S03-05 → S03-06b | LLO4/CLO1 | sửa — thay bài tự dựng bằng Bài tập 03.4 (G5); id giữ |
| S03-06b | Bài tập: điều kiện Slater cho ba bài toán | Lời giải trên mặt trang. | S03-06 → S04-00 | LLO4/CLO1 | sửa — theo Bài tập 03.4; 48 âm tiết |
| S04-00 | 4. Hình học của đối ngẫu | Trang tiêu đề mạch; lead "Nhu cầu:" (19 âm tiết): nhân tử và cận dưới là độ dốc và tung độ gốc của một đường thẳng. | S03-06b → S04-01 | LLO5/CLO1 | sửa — lượt sau kiểm lại: trả tên mạch và dòng dẫn về câu hỏi không có độ nhạy (quyết định người dùng 2026-11-13) |
| S04-01 | Mặt phẳng giá trị | "Nhu cầu:" đọc nhân tử trên một hình gồm tính khả thi, chi phí và cận dưới; hai trục. | S04-00 → S04-01a | LLO5/CLO1 | sửa — thêm "Nhu cầu:"; 48 âm tiết |
| S04-01a | Điểm và tập giá trị | Bốn điểm của $G$; phần khả thi. | S04-01 → S04-01b | LLO5/CLO1 | sửa — ghi chú bỏ "Hình tự vẽ…", thêm lý do $G$ không lồi |
| S04-01b | Hàm Lagrange trong mặt phẳng giá trị | Định nghĩa đường cận. | S04-01a → S04-02 | LLO5/CLO1 | giữ — công thức hiển thị trong `div` (8 → 6 dòng) |
| S04-02 | Đường cận trong mặt phẳng giá trị | $\lambda=1$: điểm tiếp xúc không khả thi. | S04-01b → S04-03 | LLO5/CLO1 | giữ — 7 → 6 dòng (`div`) |
| S04-03 | Tiếp xúc và đối ngẫu mạnh | $\lambda=2$: tiếp xúc tại $(0,5)$. | S04-02 → S04-04 | LLO5/CLO1 | sửa — ghi chú: phản ví dụ hai biến; câu nối sang bài tập |
| S04-04 | Bài tập: tập giá trị và đường cận | Bài tập 03.6, câu (a), (b) và kiểm tra điểm tiếp xúc tại $\lambda^*$. | S04-03 → S04-04b | LLO5/CLO1 | sửa — thay bài tự dựng bằng Bài tập 03.6; câu (c) về bài toán nhiễu chuyển vào ghi chú diễn giả S04-04b theo quyết định người dùng; id giữ |
| S04-04b | Bài tập: tập giá trị và đường cận | Lời giải trên mặt trang: $G$, $g=\lambda-\frac{\lambda^2}4$, điểm tiếp xúc, $\lambda^*=2$. Ghi chú diễn giả (trang cuối mạch 4) nêu bài toán nhiễu, Định nghĩa 03.22, Mệnh đề 03.23, Hệ quả 03.24, giá bóng, Ví dụ 03.14 và câu (c). | S04-04 → S05-00 | LLO5/CLO1 | sửa — theo Bài tập 03.6; nơi duy nhất trình bày độ nhạy, theo quyết định người dùng 2026-11-13 |
| S05-00 | 5. Điều kiện Karush–Kuhn–Tucker | Trang tiêu đề mạch; nhu cầu tìm nghiệm không cần $g$. | S04-04b → S05-01 | LLO4/CLO1 | giữ |
| S05-01 | Dấu bằng trong chuỗi đối ngẫu yếu | "Nhu cầu:" và Mệnh đề 03.27 (hai chiều). | S05-00 → S05-02 | LLO4/CLO1 | sửa — thêm "Nhu cầu:"; số của bài toán một biến chuyển vào ghi chú (bảng phát hiện: trộn phát biểu với số); hộp nêu chiều ngược; ghi chú trả lời câu hỏi mở đầu của ghi chú ($\lambda=2$ duy nhất, $g(8)=1$) |
| S05-02 | Ràng buộc hoạt động và bù trừ | Định nghĩa bù trừ; hoạt động không kéo theo nhân tử dương. | S05-01 → S05-03 | LLO4/CLO1 | sửa — thẻ một dòng; lượt sau kiểm lại: bỏ dòng "Ví dụ." khỏi trang định nghĩa, ví dụ Nhận xét 03.28 trong ghi chú; trực quan giá bóng dẫn tới ghi chú diễn giả cuối mạch 4 |
| S05-03 | Bốn nhóm điều kiện KKT | Định nghĩa hệ KKT. | S05-02 → S05-04 | LLO4/CLO1 | sửa — bỏ nhãn ngoài danh sách ("Khả thi gốc:", "Dừng:"), tên nhóm in nghiêng trong ngoặc; ghi chú bỏ câu "Định nghĩa chưa nói gì về tối ưu" |
| S05-04 | Ví dụ: hệ KKT của bài toán một biến | Ba ứng viên, lọc theo khả thi. | S05-03 → S05-05 | LLO4/CLO1 | giữ |
| S05-05 | Điều kiện cần và điều kiện đủ | Bảng giả thiết – kết luận. | S05-04 → S05-05b | LLO4/CLO1 | sửa — ghi chú thêm Định lý 03.30 (chiều cần khi có đối ngẫu mạnh và nghiệm đối ngẫu) |
| S05-05b | Chứng minh: điều kiện đủ của KKT | Tính lồi biến dừng thành cực tiểu toàn cục. | S05-05 → S05-05c | LLO4/CLO1 | giữ |
| S05-05c | Chứng minh: điều kiện cần của KKT | Slater cho nghiệm đối ngẫu, rồi bù trừ và dừng. | S05-05b → S05-05a | LLO4/CLO1 | sửa — bỏ nhãn "Bù trừ:", "Dừng:" trong danh sách; câu nối dẫn bài toán $\min x_1+x_2$ với $x_1^2+x_2^2\le0$ |
| S05-05a | Ví dụ: nghiệm tối ưu không có nhân tử KKT | Bài toán của S03-05: dừng $(1,1)\ne0$. | S05-05c → S05-06 | LLO4/CLO1 | sửa — đổi sang bài toán hai biến của ghi chú; bỏ `\text{với mọi}`; hộp "Diễn giải:"; ghi chú bỏ "ví dụ tính trực tiếp" |
| S05-06 | KKT trong hồi quy có ràng buộc chuẩn | Mô hình $\min J(w)$, $\|w\|_2^2\le\tau$; hệ KKT. | S05-05a → S05-06a | CLO1 | sửa — quy ước theo ghi chú: $J=\|Xw-y\|_2^2$ không có $\tfrac12$, điều kiện dừng $X^T(Xw-y)+\lambda w=0$ |
| S05-06a | Giải hệ KKT của hồi quy | Hai trường hợp; $w(\rho)$, $w(0)$; nhân tử duy nhất (Mệnh đề 03.35). | S05-06 → S05-06b | CLO1 | sửa — $w(0)$ thay $w_0$; giả thiết hạng cột đầy đủ như ghi chú; $(X^TX+\lambda I)$; "Lưu ý:" quan hệ hệ số 2 với mục tiêu có $\tfrac12$; bỏ nhãn "Nếu …:" |
| S05-06b | Ví dụ: hồi quy hai trọng số | Ví dụ 03.19 (mục tiêu có $\tfrac12$): $\lambda^*=2$, $w^*=(0{,}6;0{,}8)$, mất mát 8, bài toán có phạt tương ứng. | S05-06a → S05-07 | CLO1 | sửa — $w(0)$; hộp "Diễn giải:"; ghi chú thêm $dp^*/d\tau=-2$ |
| S05-06c | Ví dụ: vector hỗ trợ đọc từ nhân tử | Tình huống 03.1 với $\rho=1$: bốn khung hình, KKT của Mệnh đề 03.37, $\alpha^*=(0,\frac12,\frac12,0)$, vector hỗ trợ $z=\pm1$; phục vụ mục tiêu vận dụng (máy vector hỗ trợ). | S05-06b → S05-07 | CLO1 | thêm — lượt sau kiểm lại (mục 8 của danh sách đã duyệt); số kiểm lại: $\alpha_2+\alpha_3=\rho w=1$, $\Psi(\alpha^*)=1-\frac12=\frac12=p^*$; 41 âm tiết |
| S05-07 | Bài tập: hồi quy ba trọng số với ràng buộc chuẩn | Bài tập 03.9, câu (a), (b). | S05-06c → S05-07b | CLO1 | sửa — thay bài tự dựng bằng Bài tập 03.9; câu (c) về $dp^*/d\tau$ chuyển vào ghi chú diễn giả S05-07b theo quyết định người dùng; id giữ |
| S05-07b | Bài tập: hồi quy ba trọng số với ràng buộc chuẩn | Lời giải: $\lambda^*=1$, $w^*=\frac y3$, mất mát 2, bài toán có phạt; câu (c) trong ghi chú với $\sqrt\tau$. | S05-07 → S07-00 | CLO1 | sửa — theo Bài tập 03.9; bỏ nhãn "Dừng:", "Hoạt động:", "Có phạt:" |
| S07-00 | 6. Tổng hợp và vận dụng | Trang tiêu đề mạch, `id="mach-6"`. | S05-07b → S07-01 | LLO4/CLO1 | sửa — từ khóa "chứng nhận cận khít"; ghi chú theo câu hỏi mạch 4 mới |
| S07-01 | Ba bước chứng nhận | Bảng kết quả – giả thiết – công thức; ba vai trò của $\lambda^*=2$ trên mặt trang. | S07-00 → S07-02 | LLO4/CLO1 | sửa — hộp: cực đại $g$, độ dốc đường cận, nhân tử KKT; giá bóng chỉ trong ghi chú; ngoại lệ mật độ: trang tổng kết, 69 âm tiết dưới trần 80 |
| S07-02 | Bài tập: quy trình chứng nhận cho một bài toán chiếu | Bài tập 03.10: Slater, KKT, $g$, khoảng bằng 0; giá bóng là phần đọc thêm trong lời giải ở ghi chú diễn giả. | S07-01 → S07-03 | LLO4/CLO1 | sửa — thay bài hai biến lặp lại S03-06 bằng Bài tập 03.10; id giữ |
| S07-03 | Tài liệu và nội dung mở rộng | Nguồn, đọc thêm máy vector hỗ trợ (ghi chú §8.4, §10.1), chủ đề mở rộng. | S07-02 → — | LLO4/CLO1 | sửa — thêm dòng máy vector hỗ trợ, §5.6; ghi chú bỏ "Các hình … tự vẽ" |

Số trang: 3 + 17 + 12 + 8 + 15 + 4 = 59.

Trang bỏ: S03-02 "Cận khít và đối ngẫu mạnh" — quyết định **bỏ/gộp**. Định nghĩa đối ngẫu mạnh gộp vào S03-01; ví dụ $L(x,2)=3(x-2)^2+5$ đã có ở S02-07c (giải bài toán đối ngẫu) và S04-03 (tiếp xúc), nên giữ trang sẽ lặp một ví dụ trong deck.

## Mật độ và ngoại lệ

Đo bằng `deck_check.py` ngày 2026-11-13: mọi trang ≤ 6 dòng, ≤ 3 công thức hiển thị, mỗi dòng ≤ 20 âm tiết (dòng dẫn trang tiêu đề mạch ≤ 25), không OVERFLOW ở 16:9. Công thức hiển thị nay nằm trong `div` thay vì `p`, nên mỗi công thức tính một dòng. Hai trang trên 60 âm tiết, cả hai thuộc loại có trần 80:

- S01-02 (mục tiêu): 75 âm tiết.
- S07-01 (bảng tổng kết): 69 âm tiết.

## Lịch sử quyết định trước 2026-11-13

- Bỏ năm trang độ nhạy S06-01–05 theo yêu cầu người dùng (bản 47 trang). Đợt 2026-11-13 đưa lại độ nhạy ở dạng gọn (S04-05, S04-05b); lượt sửa sau kiểm lại bỏ hai trang này theo quyết định người dùng 2026-11-13: độ nhạy và giá bóng chỉ nêu trong ghi chú diễn giả (S04-04b). Mục tiêu đọc độ nhạy của ghi chú không có trên S01-02 (ngoại lệ G3 theo quyết định người dùng).
- Thứ tự S03-03 (định lý) trước S03-02b (trực quan) theo yêu cầu người dùng; giữ.
- Đợt sửa văn phong 2026-10-12: trang tiêu đề mạch, tách chứng minh S02-05d, bốn trang lời giải mẫu, bảng tổng kết S07-01 (47 → 57 trang).
- Đợt rà soát thuật ngữ 2026-10-12: "khoảng đối ngẫu của cặp", "sai số tối ưu", "vector", "trường hợp" thay "nhánh", "điểm Slater", "hồi quy có ràng buộc chuẩn".

Chi tiết từng đợt trong `review-log.md`.
