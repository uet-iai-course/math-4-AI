# Kế hoạch Bài giảng 03 — Đối ngẫu Lagrange

## 1. Căn cứ và trạng thái kế hoạch

- Bài thuộc Buổi 3 của học phần **Cơ sở toán học cho AI**, học kỳ 1 năm học 2026–2027.
- `sources/part1.docx` xác định Tuần 3 là `Duality`, thuộc bảy tuần nền tảng tối ưu nghiêm ngặt. Bài phải phân biệt kết quả được chứng minh, giả thiết cần có và giới hạn của kết luận.
- Đề cương chính thức xác định nội dung Chương 4: hàm và bài toán đối ngẫu Lagrange, minh họa hình học, điều kiện tối ưu, phân tích nhiễu và độ nhạy, ví dụ, bất đẳng thức tổng quát.
- Chuẩn đầu ra bài học là LLO4–5, liên kết CLO1. Thời lượng là 2 tiết lý thuyết và 1 tiết bài tập. Kế hoạch không tự quy đổi tiết thành phút.
- Kế hoạch đã được khóa sau triển khai ở 41 trang và 7 mạch; thứ tự DOM cuối được ghi tại Mục 7.
- Kế hoạch không sửa tệp trình chiếu và không cho phép cập nhật chỉ mục trước khi bộ trang chiếu vượt kiểm định cuối.

## 2. Sản phẩm và tên tệp

- Tệp RevealJS: `2627-1/lecture-03-doi-ngau-lagrange.html`.
- Tài sản riêng: `2627-1/img/lec-03/`, ưu tiên SVG tự vẽ.
- Tệp quy trình bắt buộc khi triển khai:
  - `2627-1/planning/lec-03/outline.md`;
  - `2627-1/planning/lec-03/storyboard.md`;
  - `2627-1/planning/lec-03/review-log.md`.
- Dự án Codex Slides bền vững phải được tạo trước khi soạn, với đề cương, `part1.docx`, nguồn đối ngẫu và mẫu HTML ở đúng vai trò. RevealJS trong kho là bản có thẩm quyền cuối cùng.

## 3. Đối tượng, đầu vào và mục tiêu đánh giá được

### Đối tượng và kiến thức đầu vào

- Sinh viên đã hoàn thành các học phần tiên quyết Giải tích 1, Xác suất thống kê và Đại số tuyến tính cho kỹ thuật.
- Từ Bài giảng 01: tập lồi, hàm lồi, gradient, Hessian, tập affine và nón đối ngẫu ở mức nhập môn.
- Từ Bài giảng 02: dạng chuẩn của bài toán tối ưu, miền xác định, tập khả thi, giá trị tối ưu, LP, QP, QCQP, SDP và bất đẳng thức tổng quát.
- Sinh viên phải đọc được $f_i(x)\leq 0$, $h_i(x)=0$, $p^\star$, phép lấy infimum và gradient theo $x$ trước khi dùng trong bài.

### Mục tiêu

Kết thúc bài, người học có thể:

1. Lập đúng hàm Lagrange $L(x,\lambda,\nu)$, hàm đối ngẫu $g(\lambda,\nu)$ và bài toán đối ngẫu từ một bài toán gốc ở dạng chuẩn; nêu đúng miền và điều kiện $\lambda\succeq 0$.
2. Chứng minh và sử dụng đối ngẫu yếu để tạo cận dưới cho bài toán cực tiểu; tính và diễn giải khoảng đối ngẫu.
3. Phân biệt đối ngẫu yếu, đối ngẫu mạnh và điều kiện đủ Slater; không biến điều kiện đủ thành điều kiện cần.
4. Thể hiện hình học của hàm đối ngẫu bằng siêu phẳng đỡ và giải thích vì sao tung độ cắt là một cận dưới, trực tiếp đo LLO5.
5. Viết và kiểm tra bốn nhóm điều kiện Karush–Kuhn–Tucker (KKT); phân biệt tính cần và tính đủ theo giả thiết lồi, khả vi và điều kiện chính quy.
6. Diễn giải nhân tử tối ưu như độ nhạy cục bộ khi hàm giá trị khả vi, đồng thời đọc được dạng đối ngẫu với bất đẳng thức tổng quát theo nón.

LLO4 được đo chủ yếu bằng mục tiêu 1–3 và 5–6. LLO5 được đo bằng mục tiêu 4. Toàn bộ bài hỗ trợ CLO1 qua việc hiểu, đánh giá và vận dụng chứng nhận tối ưu vào bài toán cụ thể.

## 4. Phạm vi nội dung

### Nội dung bắt buộc

- Bài toán gốc dạng chuẩn, quy ước dấu và miền xác định.
- Hàm Lagrange, hàm đối ngẫu, tính lõm của hàm đối ngẫu và tính chất cận dưới.
- Bài toán đối ngẫu, khả thi đối ngẫu, giá trị $d^\star$, khoảng $p^\star-d^\star$.
- Đối ngẫu yếu, đối ngẫu mạnh, điều kiện Slater và điều kiện đạt nghiệm đối ngẫu trong phạm vi kết luận của nguồn chuẩn.
- Minh họa hình học bằng tập giá trị và siêu phẳng đỡ.
- Bù trừ, bốn nhóm điều kiện KKT, điều kiện cần và đủ trong bài toán lồi.
- Phân tích nhiễu và độ nhạy ở mức toàn cục và cục bộ; điều kiện khả vi khi đồng nhất đạo hàm với nhân tử.
- Mở rộng sang bất đẳng thức tổng quát theo nón ở mức nối tiếp Bài giảng 01–02.
- Ít nhất một ví dụ số xuyên suốt và bài tập kiểm tra sau mỗi cụm trọng tâm.

### Nội dung không đưa vào tuyến chính

- Không dạy lại định nghĩa tập lồi, hàm lồi, LP, QP, QCQP hoặc SDP.
- Không triển khai thuật toán gradient, Newton, phương pháp điểm trong hoặc phương pháp nhân tử; các thuật toán này thuộc các bài sau.
- Không trình bày chứng minh đầy đủ của định lý Slater bằng định lý siêu phẳng tách nếu làm đứt mạch; chỉ nêu ý tưởng hình học và chuyển chi tiết sang ghi chú hoặc tài liệu đọc.
- Không đưa hàng loạt đối ngẫu chuyên biệt của mọi lớp bài toán. Chỉ giữ ví dụ cần cho mạch và một bài tập chuyển giao.
- Không gắn KKT với mọi bài toán phi lồi. Trường hợp phi lồi chỉ dùng như phản ví dụ về giới hạn bảo đảm nếu còn dung lượng.

## 5. Nguồn và vai trò

| Nguồn | Loại | Vai trò trong Bài giảng 03 | Quyết định |
|---|---|---|---|
| `sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx` | Đề cương chính thức | Buổi 3, LLO4–5/CLO1, 2 tiết lý thuyết và 1 tiết bài tập, phạm vi Chương 4 | Nguồn thẩm quyền về phạm vi và chuẩn đầu ra |
| `sources/part1.docx` | Tài liệu bổ sung của người dùng | Đặt bài trong lõi tối ưu nghiêm ngặt và yêu cầu làm rõ giả thiết, bảo đảm, giới hạn | Giữ vai trò khung học thuật, không dùng làm nguồn công thức chi tiết |
| `sources/bv_cvxbook.pdf`, Chương 5 | Giáo trình bắt buộc | Nguồn chuẩn cho định nghĩa, định lý, Slater, hình học, KKT, độ nhạy và bất đẳng thức tổng quát | Nguồn chính để kiểm chứng toán học; chỉ diễn giải và tự vẽ hình |
| `sources/dual.pdf` | Trang chiếu mẫu MIT 6.079, Lecture 5 | Thứ tự nội dung, mức chi tiết và ví dụ đối ngẫu | Chọn làm bản chuẩn trong ba tệp trùng; không cắt ảnh trực tiếp |
| `sources/Lecture5MIT-duality.pdf` | Bản trùng | Cùng nội dung với `dual.pdf` | Không dùng song song; SHA-256 trùng `a0c0b4340ae358e9254ae63a6fa08f68692fdb811932353e136a5c99f6ab6020` |
| `sources/c3e06e62a1d59d8c61efe93dd7ec9e12_MIT6_079F09_lec05.pdf` | Bản trùng | Cùng nội dung với `dual.pdf` | Không dùng song song; SHA-256 trùng bản chuẩn |
| `sources/Bài tập chương 4.pdf` | Bài tập | Bài toán vô hướng, đối ngẫu LP, giảm nhẹ Lagrange, phạt bậc hai và KKT | Chọn bài phù hợp; tự giải lại trước khi dùng |
| `sources/Bài tập chương 4-solution.pdf` | Lời giải tham khảo | Kiểm tra phép tính và gợi ý ghi chú diễn giả | Không sao chép máy móc; đối chiếu với nguồn chuẩn |
| `sources/Bài tập chương 4-solution.docx` | Lời giải tham khảo thứ hai | Phát hiện khác biệt với bản PDF | Tác tử phân tích nguồn phải đối chiếu hai bản trước khi chọn kết quả |

Nguồn hiện có đủ để lập kế hoạch, vì vậy chưa cần tải thêm MIT OpenCourseWare. Nếu phân tích nguồn phát hiện một khoảng trống cụ thể, việc tải bổ sung phải tuân thủ URL chính thức, quyền sử dụng, tệp tạm, checksum, chống ghi đè và cập nhật `sources/MIT/README.md` trước khi dùng.

## 6. Vấn đề trung tâm và ví dụ xuyên suốt

### Vấn đề trung tâm

Khi chưa biết hoặc chưa thể tính trực tiếp nghiệm tối ưu, làm thế nào xây dựng một cận có thể kiểm chứng, xác định khi cận đó khít, rồi chuyển cận thành điều kiện tối ưu và thông tin độ nhạy?

### Ví dụ xuyên suốt dự kiến

Sử dụng cùng một bài toán vô hướng từ nguồn chuẩn và bài tập:

$$
\begin{aligned}
\operatorname{minimize}\quad & x^2+1\\
\text{subject to}\quad & (x-2)(x-4)\leq 0.
\end{aligned}
$$

- Tập khả thi là $[2,4]$, nghiệm gốc là $x^\star=2$ và $p^\star=5$.
- Hàm Lagrange là $L(x,\lambda)=x^2+1+\lambda(x^2-6x+8)$ với $\lambda\geq 0$.
- Ví dụ được dùng liên tục để tính $g(\lambda)$, xác định $\lambda^\star=2$, kiểm tra Slater tại $x=3$, minh họa siêu phẳng đỡ, kiểm tra KKT và nối $\lambda^\star$ với độ nhạy.
- Mọi giá trị phải được tác tử toán học tự tính lại. Hình đường cong, tập giá trị và siêu phẳng phải được vẽ lại thành SVG cục bộ với nhãn và mô tả thay thế.

Ví dụ này là xương sống, không phải nội dung duy nhất. Một ví dụ LP hoặc QP ngắn được dùng ở bài tập chuyển giao để kiểm tra khả năng lập đối ngẫu trong nhiều biến.

## 7. Bảy mạch nội dung lớn

Bài dùng đúng 7 `<section>` ngoài, gồm mở đầu và kết luận, với 41 trang đã khóa.

| Mạch | Mã dự kiến | Chức năng trong câu chuyện | Kết nối vào | Đầu ra cho mạch sau | Điểm nhấn |
|---|---|---|---|---|---|
| 1. Mở đầu: nhu cầu chứng nhận | P00–P03 | Nêu mục tiêu, đầu vào, vấn đề trung tâm và bài toán chưa có chứng nhận | Kế thừa dạng chuẩn và giá trị tối ưu từ Bài giảng 02 | Câu hỏi cần một cận dưới có thể tính mà chưa biết nghiệm gốc | Nghiệm ứng viên chưa phải là chứng nhận |
| 2. Từ ràng buộc đến cận đối ngẫu | A01–A08 | Xây dựng Lagrange, hàm đối ngẫu, bài toán đối ngẫu và đối ngẫu yếu | Nhận bài toán gốc cùng quy ước dấu từ mạch mở đầu | Có cận tốt nhất $d^\star\leq p^\star$ và khoảng đối ngẫu | Phép lấy infimum biến nhân tử thành chứng nhận cận |
| 3. Khi cận trở thành giá trị tối ưu | B01–B06 | Phân biệt đối ngẫu yếu, mạnh và dùng Slater đúng phạm vi | Nhận cặp giá trị $d^\star,p^\star$ từ mạch 2 | Biết khi nào khoảng đối ngẫu bằng không và nghiệm đối ngẫu đạt được | Slater là điều kiện đủ, không phải định nghĩa đối ngẫu mạnh |
| 4. Hình học của đối ngẫu | C01–C07 | Làm rõ LLO5 bằng tập giá trị, đường mức, siêu phẳng đỡ và điểm yên ngựa của $L$ | Nhận kết luận về cận và khoảng đối ngẫu từ mạch 3 | Hiểu hình học vì sao có cận, khi nào siêu phẳng đỡ không thẳng đứng, và khi nào tồn tại điểm yên ngựa | Tung độ cắt $g(\lambda)$, điểm $(0,p^\star)$ và điểm yên ngựa nối đại số với hình học |
| 5. KKT như chứng nhận tối ưu | D01–D07 | Chuyển đối ngẫu mạnh thành hệ điều kiện có thể kiểm tra | Nhận nghiệm gốc–đối ngẫu và hình học pháp tuyến từ mạch 3–4 | Có quy trình kiểm tra khả thi, bù trừ và dừng | Bốn nhóm điều kiện phải được kiểm tra cùng nhau và đúng giả thiết |
| 6. Nhân tử như thông tin về bài toán | E01–E06 | Dùng nhân tử để phân tích độ nhạy và nối sang bất đẳng thức tổng quát | Nhận nhân tử tối ưu từ KKT | Có diễn giải giá biên và dạng chứng nhận theo nón, sẵn sàng cho bài tập tổng hợp | Độ nhạy cần giả thiết; nhân tử không tự động là đạo hàm trong mọi trường hợp |
| 7. Kết luận và chuyển giao | Z01–Z03 | Thu hồi vấn đề trung tâm, tự kiểm tra LLO4–5, giao bài tập và nguồn đọc | Nhận chuỗi cận → khít → hình học → KKT → độ nhạy | Người học có bản đồ quyết định và bài tập chuẩn bị Bài giảng 04 | Kết luận phải trả lời đúng vấn đề mở đầu, không chỉ liệt kê công thức |

Thứ tự DOM cuối gồm đúng 41 ID:

`P00, P01, P02, P03, A01, A02, A03, A04, A05, A06, A07, A08, B01, B03, B02, B04, B05, B06, C01, C03, C02, C04, C05, C06, C07, D01, D05, D02, D03, D04, D06, D07, E01, E02, E03, E04, E05, E06, Z01, Z02, Z03`.

### Câu nối bắt buộc giữa các mạch

1. Mạch 1 → 2: từ thiếu chứng nhận cho nghiệm ứng viên sang việc hấp thụ ràng buộc bằng nhân tử.
2. Mạch 2 → 3: từ một họ cận dưới sang câu hỏi cận tốt nhất có đạt $p^\star$ hay không.
3. Mạch 3 → 4: từ kết luận đại số $d^\star=p^\star$ sang cơ chế hình học của siêu phẳng đỡ.
4. Mạch 4 → 5: từ tiếp xúc hình học và điểm yên ngựa của $L$ sang cân bằng gradient và pháp tuyến trong KKT.
5. Mạch 5 → 6: từ nhân tử như biến chứng nhận sang nhân tử như thông tin về thay đổi giá trị tối ưu.
6. Mạch 6 → 7: từ các công cụ riêng lẻ về một quy trình lập, kiểm tra và diễn giải đối ngẫu.

## 8. Bản đồ hành trình sáu bước

### Khái niệm trọng tâm A — Hàm và bài toán đối ngẫu

| Bước | Trang dự kiến | Nội dung và sản phẩm |
|---|---|---|
| Nhu cầu | P03, A01 | Cần cận dưới khi chưa giải trực tiếp bài toán gốc |
| Ví dụ | A02 | Dùng bài toán vô hướng, khóa cùng $x$, $f_0$, $f_1$ và giá trị $p^*$ |
| Trực quan | A03 | Nhân tử tạo một họ Lagrangian có infimum là cận dưới |
| Hình thức/toán học | A04–A07 | Định nghĩa $L$, $g$, miền, tính lõm và chứng minh đối ngẫu yếu |
| Ứng dụng | A08 | Chọn cận tốt nhất bằng bài toán đối ngẫu |
| Bài tập | A08 | Gộp ứng dụng với bài tập QP vì cùng một phép tối đa hóa $g$ và vẫn giữ một luận điểm trung tâm |

Đầu vào là dạng chuẩn từ Bài giảng 02; sản phẩm là khả năng lập đối ngẫu theo LLO4. Câu nối: cận đã có nhưng chưa biết khi nào cận khít.

### Khái niệm trọng tâm B — Đối ngẫu mạnh và Slater

| Bước | Trang dự kiến | Nội dung và sản phẩm |
|---|---|---|
| Nhu cầu | B01 | Một cận lỏng chưa chứng nhận được chất lượng tối ưu |
| Trực quan | B03 | Quan sát trực tiếp $g(\lambda)$ đạt $p^*$ trước khi đặt tên kết luận |
| Ví dụ | B03 | Ví dụ xuyên suốt có cận khít tại $\lambda^*=2$ |
| Hình thức/toán học | B02, B04 | Đặt tên yếu/mạnh/khoảng sau ví dụ, rồi nêu Slater và kết luận đạt nghiệm |
| Ứng dụng | B05 | Kết luận khoảng đối ngẫu bằng không và chứng nhận nghiệm |
| Bài tập | B06 | Phân loại trường hợp chỉ có đối ngẫu yếu, có Slater hoặc chưa đủ dữ kiện |

Đầu vào là đối ngẫu yếu; sản phẩm là phân biệt giả thiết, điều kiện đủ và kết luận. Câu nối: hình học giải thích vì sao khả thi chặt loại siêu phẳng đỡ thẳng đứng.

### Khái niệm trọng tâm C — Minh họa hình học của hàm đối ngẫu

| Bước | Trang dự kiến | Nội dung và sản phẩm |
|---|---|---|
| Nhu cầu | C01 | Công thức $g(\lambda)$ chưa cho thấy vì sao đó là cận hoặc vì sao cận có thể khít |
| Trực quan | C03 | Nhìn đường $t+\lambda u=g(\lambda)$ và tung độ cắt trước khi định nghĩa tập |
| Ví dụ | C03 | Vẽ lại tập giá trị của ví dụ xuyên suốt với ba giá trị $\lambda$ |
| Hình thức/toán học | C02, C04, C07 | Định nghĩa tập giá trị, tập mở rộng, siêu phẳng đỡ, điểm yên ngựa và quan hệ với $p^\star$, $d^\star$ |
| Ứng dụng | C05 | Dùng hình để nhận biết cận lỏng, cận khít và vai trò khả thi chặt |
| Bài tập | C06 | Đọc một hình mới, xác định $g(\lambda)$, $p^\star$ và trạng thái đối ngẫu mạnh |

Đầu vào là kết luận Slater; sản phẩm là minh họa và giải thích hình học theo LLO5. Không sao chụp hình nguồn; phải vẽ lại SVG có trục, nhãn và văn bản thay thế.

### Khái niệm trọng tâm D — Điều kiện KKT

| Bước | Trang dự kiến | Nội dung và sản phẩm |
|---|---|---|
| Nhu cầu | D01 | Cần một hệ điều kiện kiểm tra được thay cho so sánh trực tiếp mọi điểm khả thi |
| Trực quan | D05 | Hai ứng viên biên cho thấy khả thi và hoạt động chưa đủ để chứng nhận |
| Ví dụ | D05 | Tính dấu nhân tử tại $x^\star=2$ và loại ứng viên $x=4$ |
| Hình thức/toán học | D02–D04 | Bù trừ; bốn nhóm KKT với $0\in\nabla_xL+N_D$; điều kiện cần và đủ theo giả thiết |
| Ứng dụng | D06 | Chứng nhận nghiệm và diễn giải ràng buộc hoạt động |
| Bài tập | D07 | Giải hệ KKT cho bài toán hai biến, kiểm tra từng giả thiết trước khi kết luận |

Đầu vào là đối ngẫu mạnh và đạo hàm; sản phẩm là dùng KKT đúng phạm vi. Phải có phản ví dụ hoặc trường hợp biên cho nhận định “điểm KKT luôn là tối ưu toàn cục”.

### Khái niệm trọng tâm E — Độ nhạy và nhân tử

| Bước | Trang dự kiến | Nội dung và sản phẩm |
|---|---|---|
| Nhu cầu | E01 | Sau khi có nghiệm, cần biết giá trị tối ưu thay đổi thế nào khi nới ràng buộc |
| Trực quan | E02 | Hàm giá trị thay đổi khi nới vế phải, với dấu phụ thuộc quy ước |
| Ví dụ | E02 | Nhiễu vế phải trong ví dụ xuyên suốt và ba giá trị tính được |
| Hình thức/toán học | E03–E04 | Cận toàn cục; dưới gradient $(-\lambda^*,-\nu^*)$ và gradient duy nhất khi khả vi |
| Ứng dụng | E05 | Tính hàm giá trị, nhân tử và hai trường hợp biên $u=8$, $u>8$ |
| Bài tập | Z02 | Tính đạo hàm và xấp xỉ bậc nhất của hàm giá trị |

Phần bất đẳng thức tổng quát dùng chu trình rút gọn `nhu cầu → hình thức → kiểm tra` tại E01 và E06 vì nón và thứ tự theo nón đã là đầu vào bắt buộc từ Bài giảng 01–02. Storyboard giữ rõ lý do này, không coi đây là một khái niệm mới đầy đủ.

## 9. Trình tự công việc, phụ thuộc và vai tác tử

1. **Điều phối:** xác nhận tên tệp, LLO4–5/CLO1, 7 mạch và dự án Codex Slides. Điều kiện qua cổng: nguồn được gán đúng vai trò và không dùng cả ba bản MIT trùng.
2. **Phân tích nguồn và mẫu:** lập ánh xạ theo trang/cụm giữa `dual.pdf`, Chương 5 và đề cương; đối chiếu hai bản lời giải; xác minh ví dụ xuyên suốt. Không sửa HTML.
3. **Soạn:** tạo đồng bộ `outline.md`, `storyboard.md`, `review-log.md`, HTML, ghi chú và SVG. Chỉ chốt số trang khi hành trình sáu bước và vai trò từng trang đã đầy đủ.
4. **Kiểm định storyboard:** rà từng trang, năm hành trình ở Mục 8 và các ranh giới mạch. Không sửa tệp.
5. **Năm rà soát độc lập:** góc nhìn sinh viên, chuyên gia, độ chính xác toán học, học thuật–giảng dạy, mạch kể chuyện và điểm kết nối. Các báo cáo chỉ đọc và được lưu có truy nguyên trong `review-log.md`.
6. **Chỉnh sửa tuần tự:** một tác tử riêng hợp nhất báo cáo, sửa HTML/tài sản/tệp quy trình và ghi quyết định. Mọi thay đổi toán học phải được rà lại; mọi thay đổi cấu trúc, câu nối hoặc điểm nhấn phải được tác tử mạch kể chuyện rà lại đúng phạm vi.
7. **Kiểm định kỹ thuật và trực quan:** chạy cổng 8765, rà tất cả trang ở 16:9 và màn hình hẹp, KaTeX, tài sản, bàn phím, ghi chú, tràn và tương phản; đồng bộ và kiểm tra lại Codex Slides.
8. **Công bố:** chỉ sau khi đạt mọi cổng mới thêm Bài 3 vào `2627-1/index.html`, staging tường minh, tạo commit riêng `feat(slides): ...`, đẩy nhánh hiện tại lên upstream và xác minh commit từ xa.

Các việc chỉ đọc về nguồn, toán và quyền tài sản có thể chạy song song sau khi kế hoạch được duyệt. Mọi tác tử sửa tệp phải chạy tuần tự.

## 10. Rủi ro và kiểm soát

| Rủi ro | Mức | Kiểm soát |
|---|---|---|
| Sai quy ước dấu làm đảo điều kiện của $\lambda$ hoặc dấu độ nhạy | Chặn bàn giao | Chốt một dạng chuẩn; tự suy diễn lại đối ngẫu và độ nhạy; rà toán độc lập |
| Đồng nhất đối ngẫu mạnh với mọi bài toán lồi | Chặn bàn giao | Nêu điều kiện chính quy và phân biệt định nghĩa, điều kiện đủ, kết luận |
| Dùng KKT như điều kiện đủ cho bài toán phi lồi | Chặn bàn giao | Ghi bảng giả thiết cần/đủ và thêm trường hợp biên |
| Hình học không nối được với $g(\lambda)$ hoặc thiếu trục/nhãn | Nghiêm trọng | Dùng cùng ví dụ, cùng ký hiệu; SVG tự vẽ; tác tử LLO5 và mạch kể chuyện rà độc lập |
| Phần độ nhạy khẳng định đạo hàm khi hàm giá trị không khả vi | Nghiêm trọng | Phân biệt cận toàn cục, đạo hàm một phía hoặc dưới gradient, và kết luận cục bộ có điều kiện |
| Bất đẳng thức tổng quát thành một chương rời khỏi câu chuyện | Trung bình | Dùng chu trình rút gọn và nối trực tiếp nhân tử với nón đối ngẫu đã học |
| Quá tải vì cố giữ mọi ví dụ của Chương 5 | Nghiêm trọng | Một ví dụ xuyên suốt, một bài chuyển giao; chi tiết bổ sung vào ghi chú hoặc tài liệu đọc |
| Ba tệp MIT trùng bị tính như ba nguồn độc lập | Trung bình | Chọn `dual.pdf`; ghi checksum và bỏ hai bản trùng khỏi ánh xạ |
| Lời giải PDF và DOCX khác nhau | Nghiêm trọng | Đối chiếu công thức và tự tính lại; không dùng kết quả chưa xác minh |
| Sao chụp hình từ nguồn có quyền thay vì vẽ lại | Nghiêm trọng | Vẽ SVG cục bộ, truy nguyên nguồn ý tưởng và quyền trong `review-log.md` |
| Bảy mạch chỉ đủ số nhưng không tạo tiến triển | Chặn bàn giao | Mỗi mạch phải giữ chức năng, kết nối vào–ra và điểm nhấn tại Mục 7; tác tử mạch kể chuyện kiểm định |
| Công thức và đồ thị tràn khung | Nghiêm trọng | Tách suy diễn, thân bài đủ cỡ, kiểm tra 16:9 và màn hình hẹp |

## 11. Điều kiện hoàn thành Bài giảng 03

- Tệp HTML, SVG và ba tệp quy trình tồn tại đúng đường dẫn; không phụ thuộc runtime hoặc mạng bên ngoài cho thành phần cốt lõi.
- Có đúng 5–7 `<section>` ngoài; kế hoạch hiện dùng 7, gồm mở đầu và kết luận. Mỗi mạch có chức năng riêng và kết nối vào–ra được phản ánh trong HTML, storyboard và review-log.
- Mỗi trang có đúng một mã `data-slide-id`, một luận điểm trung tâm và một mục tương ứng trong storyboard.
- Năm hành trình ở Mục 8 hoàn thành đúng thứ tự; ngoại lệ rút gọn của bất đẳng thức tổng quát được tác tử storyboard chấp nhận.
- LLO4 và LLO5 đều có minh chứng đánh giá: lập đối ngẫu, kiểm tra cận/Slater/KKT và đọc hoặc dựng minh họa hình học.
- Ví dụ xuyên suốt, bài tập số, công thức, dấu, miền, giả thiết và kết luận được tác tử toán học tính lại.
- Có đủ năm báo cáo rà soát, gồm vai mạch kể chuyện; mọi lỗi `chặn bàn giao` và `nghiêm trọng` đã đóng với bằng chứng kiểm tra lại.
- Tên mạch, câu nối và điểm nhấn tạo thành tuyến `chưa có chứng nhận → cận đối ngẫu → cận khít → hình học → KKT → độ nhạy → kết luận`.
- HTML qua kiểm tra cú pháp, đường dẫn, KaTeX, ghi chú diễn giả, bàn phím, 16:9 và màn hình hẹp tại `http://localhost:8765/2627-1/lecture-03-doi-ngau-lagrange.html`.
- Bản RevealJS và dự án Codex Slides phản ánh cùng nội dung đã duyệt, hoặc giới hạn Codex Slides được ghi đúng sự thật.
- `2627-1/index.html` chỉ được cập nhật sau kiểm định; commit riêng của Bài giảng 03 chỉ chứa đúng phạm vi, đã được đẩy lên upstream và xác minh.
