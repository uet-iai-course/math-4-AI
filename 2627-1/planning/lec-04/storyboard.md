# Storyboard Bài giảng 04 — mạch KKT đã duyệt

**Trạng thái ngày 2026-09-25: đặc tả chính đã triển khai và kiểm định.** Phần 46 mã RP/RG/RN/RE/RR/RS/RZ bên dưới khớp HTML hiện hành và tài liệu công khai. Các quyết định biên tập được giữ để truy nguyên bản cũ; phần lịch sử cuối tệp không phải đặc tả hiện hành. Các sửa sau rà soát, bằng chứng kiểm định và giới hạn được ghi trong [review-log.md](review-log.md).

Hai điều chỉnh hiển thị cuối giữ nguyên bố cục và nội dung: bảng RG03 có vùng cuộn ngang bằng bàn phím ở màn hình hẹp; khoảng trắng quanh công thức kết RG10 giảm trên màn hình rộng để công thức nằm gọn trên chân trang. Không giảm cỡ chữ.

## Cấu trúc 7 mạch và thời lượng nội bộ

KKT là điều kiện Karush–Kuhn–Tucker đã học ở Bài 03; LLO là chuẩn đầu ra bài học, CLO là chuẩn đầu ra học phần. Các phần LT/BT là số tiết lý thuyết/bài tập. Tổng đúng 2 LT + 1 BT từ đề cương, không quy đổi phút. Mỗi mạch có trang kiểm tra riêng. Dự toán dành phần BT của mạch cho trang kiểm tra: 2/5 để suy nghĩ, 3/5 để chữa; các ví dụ làm mẫu nằm trong LT. Phân bổ theo từng trang dưới đây là dự toán ban đầu, cần hiệu chỉnh khi diễn tập.

| Mạch | Trang | Chức năng, đầu vào | Đầu ra cho mạch sau | LT + BT | Kiểm tra |
|---|---|---|---|---|---|
| Mở đầu: dùng lại điều kiện tối ưu | RP00–RP04 (5) | KKT và hồi quy Bài 03 | Hai dạng KKT và nhiệm vụ tạo bước | 0.15 + 0.10 | RP04 |
| Hướng giảm, bước và thước đo | RG01–RG11 (11) | Điều kiện dừng không ràng buộc | Bài con chọn hướng, thuật toán gradient và giới hạn W cố định | 0.50 + 0.15 | RG11 |
| Newton từ mô hình và phương trình tối ưu | RN01–RN07 (7) | Hướng theo W và quy tắc nhận bước | Hướng Newton, phân biệt mô hình và bài gốc; câu hỏi về cận sai số | 0.40 + 0.15 | RN07 |
| Newton giữ đẳng thức | RE01–RE08 (8) | Mô hình Newton có thể phá tính khả thi | KKT bài con, hệ khối và khử biến tương đương | 0.35 + 0.15 | RE08 |
| Newton phục hồi điều kiện KKT | RR01–RR07 (7) | Thuật toán trước cần điểm đầu khả thi | Tuyến tính hóa phần dư, cập nhật hai biến, nhận bước theo phần dư | 0.35 + 0.20 | RR07 |
| Tính tự điều chỉnh và cận sai số | RS01–RS05 (5) | Câu hỏi RN07 còn mở sau khi đã có các phương pháp | Cận sai số có giả thiết cho bài không ràng buộc và bài khử | 0.20 + 0.10 | RS05 |
| Tổng hợp và chuyển giao | RZ01–RZ03 (3) | Các hệ cập nhật và tiêu chí đã suy ra | Tự lập hệ cho mô hình học, nhận diện chứng nhận và dung sai | 0.05 + 0.15 | RZ02 |

Đổi riêng điểm đầu khả thi VD3 thành (16,−2), giữ F,A,b và nghiệm. Các hình RE02/RE05 cần cả phần tọa độ âm; không thêm ràng buộc dấu. Cả hệ khối và hệ rút gọn dùng cùng điểm mới.

Số trang: 5 + 11 + 7 + 8 + 7 + 5 + 3 = **46**. Gộp mạch A/B cũ vì cùng xây dựng hướng và bước; tách E cũ vì giữ khả thi và phục hồi KKT có điều kiện đầu vào, ẩn và tiêu chí tiến triển khác nhau. Dời D cũ sau hai loại Newton để không ngắt chuỗi suy ra phương pháp. Kết luận vẫn là ứng dụng kiến thức đã học, không mở mạch mới.

## Bản đồ hành trình khái niệm

| Cụm, chuẩn đo | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Dữ kiện truyền và câu nối |
|---|---|---|---|---|---|---|---|
| Gradient và bước, LLO6/8 | RG01 cần chọn hướng | RG01 đường mức, RG03 tia cập nhật | VD1 tại RG01, RG03 | RG02 bài con; RG03 điều kiện hướng; RG04 Armijo | RG05 một lượt, RG06 vòng lặp | RG11 | Giữ x,g,d; chọn hướng chưa quyết định t. RG01 gộp nhu cầu + ví dụ dẫn nhập + trực quan vì đều giải thích tác dụng của gᵀd. |
| Chuẩn bậc hai, LLO6/8 | RG07 đường đi phụ thuộc cách đo | RG07, elip RG08 | VD1: W, elip và đường tuyến tính RG08 trước Lagrange | RG08–RG09 KKT | RG10 đổi độ dài và giải hệ | RG11 | Giữ g từ VD1, thêm W trước chỗ dùng; nghiệm chuẩn hóa phải được đổi độ dài để cập nhật. |
| Newton, LLO6/8 | RN01 W cố định chưa dùng độ cong hiện tại | RN01 hàm thật và parabol | RN01 dữ kiện φ; RN02 phép tính g,H,d | RN02 KKT bài con, RN03 tuyến tính hóa, RN04 độ giảm | RN05 nhận bước; RN06 thuật toán | RN07 | φ,g,H,d giữ nguyên; ≈ của phương trình thật dẫn đến phân biệt sai số. Ví dụ dẫn nhập RN01 làm cụ thể nhu cầu xấp xỉ, phép tính RN02 đặt cạnh hình thức hóa cùng một thao tác. |
| Newton khả thi, LLO9/10 | RE01 phải giữ tổng; RE02 hướng cũ phá tổng | RE01–RE02 đường khả thi | RE01 mốc nghiệm, RE02 điểm đầu VD3 | RE03 Lagrange, RE04 hệ | RE05 giải bước, RE06 giải bằng khử, RE07 thuật toán | RE08 | Truyền F,u,A,b,g,H; thêm η khi lập bài con. RE01 gộp nhu cầu, hình và KKT bài gốc đã học, không giới thiệu phương pháp trước nhu cầu. |
| Newton phần dư, LLO9/10 | RR01 điểm đầu không thỏa KKT | RR01 hai phương trình và độ lệch đặt cùng hàng | RR01 tính hai phần dư VD3 | RR02 tuyến tính hóa; RR03 hệ | RR04 giải số; RR05 biện minh thước đo; RR06 thuật toán | RR07 | Truyền F,A,b, đổi rõ u,ν; r_d,r_p là vế trái của KKT, không phải ký hiệu tùy ý. RR05 là kết quả hỗ trợ theo chu trình nhu cầu → phản ví dụ → lập luận đạo hàm → dùng ở RR06. |
| Tự điều chỉnh, LLO7 | RS01 thu hồi RN07 | RS01 độ cong gần biên, RS02 tỷ số tương đối | RS02 tính φ toàn miền | RS02 định nghĩa, RS03 cận có giả thiết | RS03 cận số, RS04 bài khử đẳng thức | RS05 | Giữ φ,s,δ từ RN; không đổi δ thành δ² trong công thức cận. RS02 hiện ví dụ trước định nghĩa. |

Mở đầu và kết luận dùng chu trình rút gọn nhắc điều kiện/nhu cầu → tổ chức → kiểm tra vì không giới thiệu khái niệm toán mới; kiểm ở RP04 và RZ02. Khử biến ở RE06 là cách giải cùng hệ đã học: nhu cầu giảm chiều → khử nhân tử → kiểm cùng hướng → RE08; không cần dựng một chu trình sáu trang riêng. Cận hội tụ trong ghi chú là kết quả hỗ trợ đánh giá, không phải một thuật toán mới; phát biểu đầy đủ giả thiết ở dàn ý §5.7, kiểm không suy quá mức qua RN07/RZ02.

Thời lượng hai cụm trong mạch RG dùng chung 0.50 LT + 0.15 BT, không cộng hai lần RG11. Cụm khả thi gồm khử biến dùng chung thời lượng RE; các cụm còn lại bằng thời lượng mạch tương ứng. Câu nối và đầu ra từng trang được ghi dưới đây.

## Quy tắc đọc đặc tả từng trang

- Mã trang trong mọi mô tả, kể cả trường “Nội dung”, chỉ dùng để truy nguyên khi biên tập; không in mã trên mặt trang hoặc đưa vào ghi chú diễn giả.
- **Nội dung** là luận điểm và biểu thức dự kiến cần nhìn thấy; dàn ý §5 là bản toán đầy đủ để triển khai, không được bỏ giả thiết quyết định tính đúng.
- **Lý do** chỉ khoảng trống nhận thức và thao tác sinh viên cần làm; **bố cục** chỉ vùng đặt nội dung, hướng đọc và thứ tự hiện. Tất cả kế thừa màu, thẻ, khoảng cách của mẫu hiện tại; quyết định sửa bố cục nhằm hỗ trợ phép suy luận, không tạo hệ giao diện mới.
- Giữ thân bài từ 0.75em; mỗi trang suy diễn tối đa 3 dòng chính ngoài dữ kiện/giả thiết, đại số dài vào ghi chú. Công thức và bảng vẫn là chữ/KaTeX; hình kỹ thuật dự kiến SVG có alt, trục, nhãn và nguồn. Các hình VD1–VD3 tự dựng từ công thức, không dùng raster hay dữ liệu thực nghiệm.
- Mọi ghi chú khi triển khai phải có giải thích, điểm dễ nhầm và câu chuyển tương ứng; không chép mã trang/thời lượng nội bộ vào ghi chú. Đáp án các trang kiểm tra ở dàn ý §7.

## Đặc tả hiện hành của 46 trang

### RP00 — Tối ưu không ràng buộc và ràng buộc đẳng thức

- **Quyết định:** giữ; đối chiếu P00. Đặt đích học tập trước các tên phương pháp.
- **Nội dung trên trang:** Giữ tên bài và đơn vị; dòng phụ nêu nhiệm vụ: xây dựng bước lặp từ điều kiện tối ưu.
- **Bố cục chọn:** Một cột; tên học phần trên, tên bài giữa, nhiệm vụ dưới; không công thức.
- **Lý do bố cục cho sinh viên năm 3:** Đặt đích học tập trước các tên phương pháp.
- **Vào → ra:** Bài 03 → RP00 → RP01. Đặt tên nhiệm vụ cho RP01: đã biết cách chứng nhận, cần cách tìm ứng viên.
- **Chuẩn và minh chứng:** LLO6, LLO9 / CLO1; chuẩn bị thao tác được đo tại RP04.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** Bài 03 S02-04, S05-03, S05-05b, S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 3/80 LT + 0 BT (LT xấp xỉ 0.0375; dùng phân số để cộng chính xác).

### RP01 — Điều kiện tối ưu và nhiệm vụ tính

- **Quyết định:** gộp và sửa; đối chiếu P01, P03. Sinh viên nhận ra kết quả cũ sẽ được dùng, thay vì học thêm một danh sách thuật toán.
- **Nội dung trên trang:** Nhắc kết quả bài 03 S05-03/S05-05b: KKT chứng nhận một ứng viên trong bài toán lồi. Hệ hồi quy ở S05-06a là ví dụ đã giải; bài 04 tổ chức cách tạo ứng viên khi phải giải hệ lớn hoặc phi tuyến.
- **Bố cục chọn:** Hai cột 45/55: trái kết quả đã biết và ví dụ hồi quy; phải ba thao tác lập mô hình → giải bước → kiểm điểm mới. Hiện trái trước, phải sau.
- **Lý do bố cục cho sinh viên năm 3:** Sinh viên nhận ra kết quả cũ sẽ được dùng, thay vì học thêm một danh sách thuật toán.
- **Vào → ra:** RP00 → RP01 → RP02. Nhận KKT của bài trước; RP02 giữ lại đúng các nhóm tương ứng hai lớp bài toán.
- **Chuẩn và minh chứng:** LLO6, LLO9 / CLO1; chuẩn bị thao tác được đo tại RP04.
- **Số liệu:** Ví dụ Bài 03 hoặc VD3 có nhãn nguồn/đổi bối cảnh; dàn ý §4 và §7. Không thay dữ kiện Bài 03.
- **Nguồn, ghi chú soạn:** Bài 03 S02-04, S05-03, S05-05b, S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 3/80 LT + 0 BT (LT xấp xỉ 0.0375; dùng phân số để cộng chính xác).

### RP02 — Hai dạng rút gọn của KKT

- **Quyết định:** tách và sửa; đối chiếu P03. Thực hiện phép chuyên biệt hóa ngay trên trang; tránh học thuộc ma trận khối mà chưa biết nguồn gốc.
- **Nội dung trên trang:** Từ Lagrange bài 03: không ràng buộc còn $\nabla f(x^*)=0$; chỉ đẳng thức còn $\nabla F(u^*)+A^T\nu^*=0,\ Au^*=b$. Không còn $\lambda\ge0$ hay bù trừ vì không có bất đẳng thức trong bài gốc. Chốt miền mở lồi, khả vi; $\nu$ tự do dấu. Ghi $x,u\in\mathbb R^n$, $A\in\mathbb R^{p\times n}$, $b,\nu\in\mathbb R^p$; p là số hàng, ứng với r trong Bài 03.
- **Bố cục chọn:** Dải trên là bốn nhóm KKT; hai cột dưới chỉ giữ các nhóm còn dùng, nối bằng đường dẫn có nhãn. Chân trang nội dung định nghĩa $g=\nabla f(x)$ và phân biệt với hàm đối ngẫu $g$ của bài 03.
- **Lý do bố cục cho sinh viên năm 3:** Thực hiện phép chuyên biệt hóa ngay trên trang; tránh học thuộc ma trận khối mà chưa biết nguồn gốc.
- **Vào → ra:** RP01 → RP02 → RP03. Hai phương trình đích sẽ được biến thành bài con trong RG02 và RE03; RP03 xác lập quy trình chung.
- **Chuẩn và minh chứng:** LLO6, LLO9 / CLO1; chuẩn bị thao tác được đo tại RP04.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** Bài 03 S02-04, S05-03, S05-05b, S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 3/80 LT + 0 BT (LT xấp xỉ 0.0375; dùng phân số để cộng chính xác).

### RP03 — Mục tiêu và quy trình xây dựng phương pháp

- **Quyết định:** gộp và sửa; đối chiếu P01, P03. Bản đồ thể hiện quan hệ phụ thuộc; ngăn hiểu nhầm rằng KKT tự cho một thuật toán duy nhất.
- **Nội dung trên trang:** Mục tiêu diễn đạt bằng động từ theo MT1–MT5; mã MT chỉ ở kế hoạch và tuyến: KKT → mô hình chọn hướng → Newton → giữ/phục hồi đẳng thức → bảo đảm sai số. KKT xác định đích; lựa chọn mô hình và quy tắc bước là thiết kế thêm.
- **Bố cục chọn:** Một sơ đồ ngang ở nửa trên; dưới là ba đầu ra đánh giá: tự suy ra hệ, thực hiện một bước, kiểm đúng tiêu chí. Thời lượng và mã chỉ nằm trong kế hoạch.
- **Lý do bố cục cho sinh viên năm 3:** Bản đồ thể hiện quan hệ phụ thuộc; ngăn hiểu nhầm rằng KKT tự cho một thuật toán duy nhất.
- **Vào → ra:** RP02 → RP03 → RP04. RP04 kiểm người học có viết được điều kiện vừa dùng trong bản đồ hay chưa.
- **Chuẩn và minh chứng:** LLO6, LLO9 / CLO1; chuẩn bị thao tác được đo tại RP04.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** Bài 03 S02-04, S05-03, S05-05b, S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 3/80 LT + 0 BT (LT xấp xỉ 0.0375; dùng phân số để cộng chính xác).

### RP04 — Kiểm tra điều kiện cần dùng

- **Quyết định:** sửa; đối chiếu P04. Kiểm trực tiếp kết quả bài 03 trước khi dùng vào bài con, đồng thời giữ kiểm tra đại số cần thiết.
- **Nội dung trên trang:** Câu hỏi: với bài lồi chỉ có $Au=b$, viết Lagrange và hai phương trình KKT; có cần $\nu\ge0$ không? Với $A=[1\;1]$, $d=(d_1,d_2)^T$, tính $Ad$ và tìm điều kiện trên $d$ để giữ tính khả thi. Chưa cho hướng số sẽ suy ra ở phần Newton khả thi.
- **Bố cục chọn:** Hai ô: trái điền công thức KKT, phải phép nhân ngắn; chừa vùng dưới để tính. Đáp án trong ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Kiểm trực tiếp kết quả bài 03 trước khi dùng vào bài con, đồng thời giữ kiểm tra đại số cần thiết.
- **Vào → ra:** RP03 → RP04 → RG01. Điều kiện dừng dẫn ngay vào việc chọn hướng ở RG01; điều kiện $Ad=0$ chuẩn bị cho mạch Newton giữ đẳng thức ở RE01–RE02.
- **Chuẩn và minh chứng:** LLO6, LLO9 / CLO1; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** Dùng $A=[1\;1]$ và hướng tổng quát $d=(d_1,d_2)^T$; điều kiện cần tìm là $d_1+d_2=0$. Không thêm bộ số hoặc làm lộ hướng Newton sẽ tính ở RE05.
- **Nguồn, ghi chú soạn:** Bài 03 S02-04, S05-03, S05-05b, S05-06a/b; đề cương buổi 4. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 1/10 BT; suy nghĩ 1/25 BT, chữa 3/50 BT.

### RG01 — Bài toán và độ dốc cục bộ

- **Quyết định:** gộp và sửa; đối chiếu A01, A02, P02. Giảm lượng dữ kiện chưa dùng và gắn tích vô hướng với bài toán đang giải.
- **Nội dung trên trang:** Giữ VD1 $f=\tfrac12(3x_1^2+7x_2^2),x^0=(2,4)^T,g=(6,28)^T,f_0=62$. Đường mức và tiếp tuyến cho ý nghĩa $g^Td$. Nhu cầu: chọn một hướng thay vì chỉ kiểm một hướng được cho.
- **Bố cục chọn:** Trái 55% đường mức và một hướng thử; phải bảng bốn dữ kiện; kết luận dưới hình. Chưa đặt Hessian vào bảng.
- **Lý do bố cục cho sinh viên năm 3:** Giảm lượng dữ kiện chưa dùng và gắn tích vô hướng với bài toán đang giải.
- **Vào → ra:** RP04 → RG01 → RG02. Dấu đạo hàm cho phép so hướng; RG02 phải giải bài toán chọn hướng thay vì đoán một vectơ.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1, dàn ý §6: giữ x, g; ghi riêng W khi dùng; phân biệt v, d, t và các cấu hình bước.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG02 — Hướng gradient từ mô hình chọn bước

- **Quyết định:** thêm; đối chiếu khoảng trống chưa có trang riêng. Bước toán mới được suy ra từ điều kiện dừng đã học; phân biệt bài gốc theo x và bài con theo d.
- **Nội dung trên trang:** Mô hình tuyến tính $g^Td$ không có cực tiểu hữu hạn khi $g\ne0$. Chọn $Q_I(d)=f(x)+g^Td+\tfrac12\|d\|_2^2$; KKT không ràng buộc theo biến $d$ cho $g+d=0$, nên $d_G=-g$. $I\succ0$ bảo đảm nghiệm duy nhất của bài con.
- **Bố cục chọn:** Một cột ba dòng biến đổi, mỗi lần hiện một dòng; bên phải 25% ghi rõ “biến của bài con: d; x cố định”.
- **Lý do bố cục cho sinh viên năm 3:** Bước toán mới được suy ra từ điều kiện dừng đã học; phân biệt bài gốc theo x và bài con theo d.
- **Vào → ra:** RG01 → RG02 → RG03. Từ nghiệm bài con d=-g, RG03 kiểm nó giảm theo đạo hàm nhưng chưa chốt độ dài bước.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1, dàn ý §6: giữ x, g; ghi riêng W khi dùng; phân biệt v, d, t và các cấu hình bước.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG03 — Hướng giảm và độ dài bước

- **Quyết định:** gộp và sửa; đối chiếu A03, A04. Nối kết quả RG02 với việc chọn t, đồng thời giữ phân biệt hướng và điểm mới.
- **Nội dung trên trang:** Với VD1: $d_G=(-6,-28)^T$, $g^Td_G=-820<0$. Một hướng thử khác là $\tilde d=(-2,1)^T$, có $g^T\tilde d=16>0$. Cập nhật $x^+=x+td$; đạo hàm hướng âm chỉ bảo đảm giảm với bước dương đủ nhỏ.
- **Bố cục chọn:** Trái bảng hai hướng và phép tính; phải tia $x+td$ có hai vị trí gần/xa; công thức cập nhật ở chân.
- **Lý do bố cục cho sinh viên năm 3:** Nối kết quả RG02 với việc chọn t, đồng thời giữ phân biệt hướng và điểm mới.
- **Vào → ra:** RG02 → RG03 → RG04. Phân biệt hướng với bước dẫn trực tiếp đến quy tắc nhận t ở RG04.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1, dàn ý §6: giữ x, g; ghi riêng W khi dùng; phân biệt v, d, t và các cấu hình bước.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG04 — Quay lui Armijo

- **Quyết định:** sửa; đối chiếu A05. Người học theo cùng một thứ tự khi đọc quy tắc và tính tay.
- **Nội dung trên trang:** Giả thiết $g^Td<0$, $0<\alpha<1/2$, $0<\beta<1$. Thử $t=1$, kiểm miền rồi $f(x+td)\le f(x)+\alpha t g^Td$; chưa đạt thì co t.
- **Bố cục chọn:** Trái 60% lưu đồ bốn bước; phải đồ thị giá trị thật/ngưỡng; bất đẳng thức chung dưới.
- **Lý do bố cục cho sinh viên năm 3:** Người học theo cùng một thứ tự khi đọc quy tắc và tính tay.
- **Vào → ra:** RG03 → RG04 → RG05. Quy tắc tổng quát được thực thi đúng thứ tự trong bảng số RG05.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG05 — Một lượt nhận bước

- **Quyết định:** sửa; đối chiếu A06. Thứ tự nhìn trùng thứ tự thực thi; các vai trò số nằm trong các cột cố định.
- **Nội dung trên trang:** Cho $f_0=62$, $g^Td=-820$, $\alpha=1/10$, $\beta=1/2$. Với $t=1,1/2,1/4$, các điểm thử lần lượt là $(-4,-24)^T$, $(-1,-10)^T$, $(1/2,-3)^T$; giá trị hàm $2040,703/2,255/8$; ngưỡng $-20,21,83/2$. Nhận ngay $t=1/4$, không thử tiếp.
- **Bố cục chọn:** Bảng toàn chiều ngang, từng hàng xuất hiện theo lần thử; hàng nhận có chữ “nhận”, không chỉ đổi màu.
- **Lý do bố cục cho sinh viên năm 3:** Thứ tự nhìn trùng thứ tự thực thi; các vai trò số nằm trong các cột cố định.
- **Vào → ra:** RG04 → RG05 → RG06. Một vòng tính tay trở thành vòng lặp đầy đủ ở RG06; không chuyển ngầm sang bước cố định.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1, dàn ý §6: giữ x, g; ghi riêng W khi dùng; phân biệt v, d, t và các cấu hình bước.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG06 — Thuật toán giảm gradient

- **Quyết định:** tách và sửa; đối chiếu B05. Đặt thuật toán đầy đủ trước khi bàn về đường đi; không để sinh viên ghép thuật toán từ nhiều phần rời.
- **Nội dung trên trang:** Lặp: tính g → nếu $\|g\|\le\varepsilon_g$ thì dừng → đặt d=-g → Armijo → cập nhật. Đầu vào x trong miền, dung sai và tham số quay lui; chi phí chính gradient/đánh giá hàm. Một ô riêng nhắc: bước cố định $1/L$ dùng hằng số Lipschitz $L$ của gradient và là cấu hình khác. Ghi chú định nghĩa $L>0$ qua $\|\nabla f(x)-\nabla f(y)\|_2\le L\|x-y\|_2$ trước khi nêu định lý.
- **Bố cục chọn:** Trái 65% giả mã năm dòng; phải đầu vào, tiêu chí dừng và chi phí; chân trang chỉ ghi tên cấu hình hội tụ, giả thiết/cận ở ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Đặt thuật toán đầy đủ trước khi bàn về đường đi; không để sinh viên ghép thuật toán từ nhiều phần rời.
- **Vào → ra:** RG05 → RG06 → RG07. Có thuật toán hoàn chỉnh rồi mới giữ t cố định ở RG07 để cô lập ảnh hưởng của hình học.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG07 — Ảnh hưởng của thước đo

- **Quyết định:** sửa; đối chiếu B01. Nhãn cấu hình xuất hiện trên mặt trang, khắc phục chuyển quy tắc ngầm của bản cũ.
- **Nội dung trên trang:** Minh họa riêng bước cố định $t=1/4$: $x_1^+=x_1/4$, $x_2^+=-3x_2/4$. Đây là thí nghiệm giữ t cố định, không phải chuỗi bước của quay lui. Nhu cầu: đo độ dài phù hợp các tọa độ.
- **Bố cục chọn:** Trái 65% đường đi; phải hai công thức co tọa độ, phía trên ghi “bước cố định t=1/4”; không đặt nhiều quy tắc t cạnh nhau.
- **Lý do bố cục cho sinh viên năm 3:** Nhãn cấu hình xuất hiện trên mặt trang, khắc phục chuyển quy tắc ngầm của bản cũ.
- **Vào → ra:** RG06 → RG07 → RG08. Đường đi đổi dấu chậm theo tọa độ tạo nhu cầu chọn cách đo độ dài ở RG08.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1, dàn ý §6: giữ x, g; ghi riêng W khi dùng; phân biệt v, d, t và các cấu hình bước.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG08 — Bài toán chọn hướng có chuẩn đơn vị

- **Quyết định:** gộp và sửa; đối chiếu B02, B03. Dùng lại một mẫu bài toán quen thuộc để sinh viên tự viết Lagrange; không đưa công thức hướng chuẩn hóa trước bài toán.
- **Nội dung trên trang:** Trên VD1, chọn $W=\operatorname{diag}(3,7)$ theo hai hệ số độ cong $3,7$; ghi rõ đây là quyết định chọn thước đo, không do KKT tự xác định; hình elip $3v_1^2+7v_2^2=1$ và các đường $6v_1+28v_2=c$ làm rõ việc tìm điểm tiếp xúc. Sau ví dụ hình học, giới thiệu $W\succ0$, $g\ne0$, $\min_v g^Tv$ với $v^TWv\le1$. Nhắc dạng giới hạn chuẩn ở S05-06 của bài 03, nhưng biến bây giờ là v và mục tiêu tuyến tính. Lập $L_s(v,\zeta)=g^Tv+\zeta(v^TWv-1)$, $\zeta\ge0$.
- **Bố cục chọn:** Trái 45% elip và các đường mức tuyến tính; phải bài con và Lagrange, cùng thứ tự màu/nhãn; biểu thức W được định nghĩa trước hình.
- **Lý do bố cục cho sinh viên năm 3:** Dùng lại một mẫu bài toán quen thuộc để sinh viên tự viết Lagrange; không đưa công thức hướng chuẩn hóa trước bài toán.
- **Vào → ra:** RG07 → RG08 → RG09. Bài con đã có mục tiêu, biến và ràng buộc; RG09 dùng bốn nhóm KKT của RP02 để giải.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1, dàn ý §6: giữ x, g; ghi riêng W khi dùng; phân biệt v, d, t và các cấu hình bước.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG09 — Giải KKT của hướng chuẩn hóa

- **Quyết định:** tách và sửa; đối chiếu B03. Sinh viên nhìn thấy điểm dùng dừng, dấu nhân tử và bù trừ; mỗi dòng trả lời một bước còn thiếu ở bản cũ.
- **Nội dung trên trang:** Hiện đủ bốn nhóm KKT. Từ $g+2\zeta Wv=0$ và $g\ne0$ suy ra $\zeta>0$; bù trừ cho $v^TWv=1$. Suy ra $\zeta=\tfrac12\sqrt{g^TW^{-1}g}$ và $v=-W^{-1}g/\sqrt{g^TW^{-1}g}$.
- **Bố cục chọn:** Một cột suy diễn ba bước; bốn nhóm KKT ở dải bên 30%; mỗi bước có nhãn nhóm được sử dụng. Đại số thay chuẩn vào bình phương để trong ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Sinh viên nhìn thấy điểm dùng dừng, dấu nhân tử và bù trừ; mỗi dòng trả lời một bước còn thiếu ở bản cũ.
- **Vào → ra:** RG08 → RG09 → RG10. Nghiệm chuẩn hóa v cần đổi độ dài trước khi thành d dùng trong cập nhật ở RG10.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1, dàn ý §6: giữ x, g; ghi riêng W khi dùng; phân biệt v, d, t và các cấu hình bước.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG10 — Hướng không chuẩn hóa theo W

- **Quyết định:** gộp và sửa; đối chiếu B04, B02. Ghi rõ bước đổi độ dài, tránh sự xuất hiện đột ngột của Wd=-g; giải hệ thay lập nghịch đảo khi tính.
- **Nội dung trên trang:** Giới thiệu chuẩn đối ngẫu bằng độ dốc hướng lớn nhất trên quả cầu đơn vị: $\|g\|_{W,*}=\max_{\|v\|_W\le1}g^Tv=\sqrt{g^TW^{-1}g}$. Tính đối xứng nối giá trị lớn nhất với âm giá trị nhỏ nhất vừa tìm; đổi độ dài $d=\|g\|_{W,*}v$ cho $Wd=-g$. VD1 với $W=\operatorname{diag}(3,7)$: $d=(-2,-4)^T$, $v=d/\sqrt{124}$. Mô hình tương ứng $Q_W(d)=f(x)+g^Td+\tfrac12d^TWd$, thu được bằng thay $I$ của RG02 bằng $W$; điều kiện dừng của mô hình cũng là $g+Wd=0$.
- **Bố cục chọn:** Trái 55%: định nghĩa chuẩn đối ngẫu trên các dòng toán riêng, rồi chuỗi v → nhân độ dài → d → hệ tuyến tính; phải phép thế hai phương trình. Mô hình $Q_W$ hiện tường minh trước khi sang RG11; giữ cỡ chữ, không dồn định nghĩa vào dòng dài.
- **Lý do bố cục cho sinh viên năm 3:** Ghi rõ bước đổi độ dài, tránh sự xuất hiện đột ngột của Wd=-g; giải hệ thay lập nghịch đảo khi tính.
- **Vào → ra:** RG09 → RG10 → RG11. RG11 kiểm lại phép suy ra Wd=-g và sự khác nhau giữa v,d,t; W cố định chuẩn bị nhu cầu Hessian.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1, dàn ý §6: giữ x, g; ghi riêng W khi dùng; phân biệt v, d, t và các cấu hình bước.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG11 — Kiểm tra bài con và bước cập nhật

- **Quyết định:** gộp và sửa; đối chiếu A07, B06. Kiểm cả nguồn gốc hướng và cách nhận bước, không chỉ gắn tên thuật toán cho một vectơ.
- **Nội dung trên trang:** Câu hỏi: VD1, $W=\operatorname{diag}(3,7)$. Viết điều kiện dừng của $Q_W$; phân biệt $d=(-2,-4)^T$ với $v=d/\sqrt{124}$. Nếu dùng hướng gradient trong bảng RG05, đã nhận $t=1/4$ thì có thử tiếp $t=1/8$ không?
- **Bố cục chọn:** Hai vùng câu hỏi 60/40, mỗi vùng tối đa hai ý; đáp án và tiêu chí ở ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Kiểm cả nguồn gốc hướng và cách nhận bước, không chỉ gắn tên thuật toán cho một vectơ.
- **Vào → ra:** RG10 → RG11 → RN01. Sau khi biết chọn thước đo, RN01 dùng độ cong đang biến thiên để chọn H(x) thay W.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** VD1, dàn ý §6: giữ x, g; ghi riêng W khi dùng; phân biệt v, d, t và các cấu hình bước.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 3/20 BT; suy nghĩ 3/50 BT, chữa 9/100 BT.

### RN01 — Mô hình độ cong tại điểm đang xét

- **Quyết định:** gộp và sửa; đối chiếu C01, C07. Hàm không bậc hai tạo nhu cầu xấp xỉ trước công thức Newton và giúp phân biệt mô hình với hàm thật.
- **Nội dung trên trang:** Đưa VD2 lên đầu Newton: $\varphi(s)=s-\log s$, $s>0$, $s^0=1/4$, $g=-3,H=16$. Hình tiếp tuyến và parabol cho nhu cầu thay W cố định bằng H tại điểm hiện tại.
- **Bố cục chọn:** Trái 60% hàm thật/mô hình có nhãn rõ; phải dữ kiện s0,g,H; chưa hiện nghiệm mô hình.
- **Lý do bố cục cho sinh viên năm 3:** Hàm không bậc hai tạo nhu cầu xấp xỉ trước công thức Newton và giúp phân biệt mô hình với hàm thật.
- **Vào → ra:** RG11 → RN01 → RN02. Parabol gần điểm hiện tại tạo bài con; RN02 tự giải điều kiện dừng của nó.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RN07.
- **Số liệu:** VD2, dàn ý §6; riêng RN04 so lại VD1 phải ghi rõ đổi ví dụ. Phân biệt δ, δ² và ba phép trừ.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN02 — Hướng Newton từ điều kiện dừng

- **Quyết định:** gộp và sửa; đối chiếu C02, C03. Dùng lại đúng thao tác RG02 và thay I/W bằng H, làm rõ lý do thống nhất các phương pháp.
- **Nội dung trên trang:** $Q_H(d)=f(x)+g^Td+\tfrac12d^THd$; H≻0. Lấy đạo hàm theo d: $g+Hd=0$. Với VD2, $16d=3$, nên d=3/16 và s+=7/16. Đây là KKT của bài con không ràng buộc.
- **Bố cục chọn:** Trên là Q_H, giữa ba dòng biến đổi căn dấu bằng, dưới phép thế VD2; bên lề chỉ ghi giả thiết H≻0.
- **Lý do bố cục cho sinh viên năm 3:** Dùng lại đúng thao tác RG02 và thay I/W bằng H, làm rõ lý do thống nhất các phương pháp.
- **Vào → ra:** RN01 → RN02 → RN03. Hướng vừa tìm cũng giải mô hình tuyến tính của điều kiện tối ưu; RN03 chứng minh mối nối này.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RN07.
- **Số liệu:** VD2, dàn ý §6; riêng RN04 so lại VD1 phải ghi rõ đổi ví dụ. Phân biệt δ, δ² và ba phép trừ.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN03 — Newton cho phương trình tối ưu

- **Quyết định:** tách và sửa; đối chiếu C03. Chuẩn bị chính xác thao tác tuyến tính hóa hệ KKT ở phần R; không đánh đồng giải mô hình với giải xong bài gốc.
- **Nội dung trên trang:** Đích bài gốc: $\nabla f(x+d)=0$. Tuyến tính hóa $\nabla f(x+d)\approx g+Hd$, rồi giải mô hình $g+Hd=0$. VD2 sau bước có $\varphi'(7/16)=-9/7\ne0$.
- **Bố cục chọn:** Hai hàng “phương trình thật” và “mô hình tuyến tính”; ký hiệu ≈ nổi rõ; ô kiểm đạo hàm thật đặt dưới.
- **Lý do bố cục cho sinh viên năm 3:** Chuẩn bị chính xác thao tác tuyến tính hóa hệ KKT ở phần R; không đánh đồng giải mô hình với giải xong bài gốc.
- **Vào → ra:** RN02 → RN03 → RN04. Mô hình chưa giải xong phương trình thật; RN04 xác định đại lượng mô hình thực sự đo được.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RN07.
- **Số liệu:** VD2, dàn ý §6; riêng RN04 so lại VD1 phải ghi rõ đổi ví dụ. Phân biệt δ, δ² và ba phép trừ.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN04 — Độ giảm của mô hình Newton

- **Quyết định:** sửa; đối chiếu C04. Nguồn gốc tiêu chí dừng được tính ra, còn trùng số trong hàm bậc hai được giải thích bằng cấu trúc.
- **Nội dung trên trang:** Định nghĩa độ giảm Newton $\delta_N=\sqrt{d^THd}\ge0$. Từ $Hd=-g$ suy ra $\delta_N^2=d^THd=-g^Td$ và $Q_H(0)-Q_H(d)=\delta_N^2/2$. VD2: $\delta_N^2=9/16$, giảm mô hình $9/32$. Hộp đối chiếu VD1 ghi $W=H$ có chủ ý, nên hướng W trùng Newton và độ giảm của mô hình và độ giảm thật đều bằng 62.
- **Bố cục chọn:** Trái 60% hai phép biến đổi ngắn; phải bảng “mô hình/đại lượng/giá trị”; hộp riêng dưới cùng ghi đối chiếu VD1, không trộn số 62 vào bảng VD2.
- **Lý do bố cục cho sinh viên năm 3:** Nguồn gốc tiêu chí dừng được tính ra, còn trùng số trong hàm bậc hai được giải thích bằng cấu trúc.
- **Vào → ra:** RN03 → RN04 → RN05. Biết giảm mô hình rồi mới đặt nó cạnh hai phép trừ của hàm thật ở RN05.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RN07.
- **Số liệu:** VD2, dàn ý §6; riêng RN04 so lại VD1 phải ghi rõ đổi ví dụ. Phân biệt δ, δ² và ba phép trừ.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN05 — Mức giảm thật và sai số thật

- **Quyết định:** tách và sửa; đối chiếu C07. Các số đi cùng định nghĩa phép trừ, tránh chỉ phân biệt bằng tên hoặc màu.
- **Nội dung trên trang:** VD2: giảm mô hình $9/32\approx0{,}28125$; giảm thật một bước $\log(7/4)-3/16\approx0{,}37212$; sai số tại $s^0$ là $\log4-3/4\approx0{,}63629$. Với $\alpha=1/10$, bước đầy đủ cần giảm ít nhất $\alpha(-g^Td)=9/160$ nên được nhận.
- **Bố cục chọn:** Bảng ba hàng, cột “hai giá trị được trừ” và “kết quả”; lần lượt hiện từng hàng, dòng Armijo dưới.
- **Lý do bố cục cho sinh viên năm 3:** Các số đi cùng định nghĩa phép trừ, tránh chỉ phân biệt bằng tên hoặc màu.
- **Vào → ra:** RN04 → RN05 → RN06. Phép nhận bước cụ thể đi vào quy trình Newton và giới hạn của tiêu chí dừng ở RN06.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RN07.
- **Số liệu:** VD2, dàn ý §6; riêng RN04 so lại VD1 phải ghi rõ đổi ví dụ. Phân biệt δ, δ² và ba phép trừ.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN06 — Thuật toán Newton và điều kiện dùng

- **Quyết định:** gộp và sửa; đối chiếu C05, C06. Phân biệt cơ chế đã suy ra với điều kiện bảo đảm hoạt động; đủ đầu vào để sinh viên thực hiện lại một vòng.
- **Nội dung trên trang:** Tính $g,H$; giải $Hd=-g$; tính $\delta_N^2$; nếu $\delta_N^2/2\le\varepsilon_{\mathrm{model}}$ thì dừng theo dung sai mô hình, nếu chưa thì quay lui và cập nhật. Điều này chưa chứng nhận sai số mục tiêu. Yêu cầu $H\succ0$ tại điểm lặp; chi phí giải hệ đặc $O(n^3)$. Hội tụ bậc hai chỉ cục bộ với Hessian Lipschitz gần nghiệm, Hessian tại nghiệm xác định dương và điểm đầu đủ gần; phát biểu đầy đủ ở ghi chú.
- **Bố cục chọn:** Trái 65% giả mã năm bước; phải ba ô đầu vào/điều kiện/chi phí. Chỉ một câu về hội tụ ở chân; không nhồi định lý dài.
- **Lý do bố cục cho sinh viên năm 3:** Phân biệt cơ chế đã suy ra với điều kiện bảo đảm hoạt động; đủ đầu vào để sinh viên thực hiện lại một vòng.
- **Vào → ra:** RN05 → RN06 → RN07. RN07 kiểm sự khác nhau giữa chạy đúng thuật toán, giải mô hình và đạt điều kiện tối ưu thật.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RN07.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN07 — Kiểm tra mô hình và điều kiện tối ưu

- **Quyết định:** tách và sửa; đối chiếu C08. Buộc đối chiếu KKT thật sau bước mô hình; tạo câu hỏi sẽ được phần S trả lời.
- **Nội dung trên trang:** Câu hỏi: giải $16d=3$ được $s^+=7/16$; có suy ra đã đạt nghiệm không? Tính $\varphi^{\prime}(s^+)$ và giải thích vì sao $9/32$ không phải sai số thật.
- **Bố cục chọn:** Trái 55% dữ kiện; phải hai chỗ điền; cuối trang giữ câu hỏi về giả thiết cần thêm để có cận sai số.
- **Lý do bố cục cho sinh viên năm 3:** Buộc đối chiếu KKT thật sau bước mô hình; tạo câu hỏi sẽ được phần S trả lời.
- **Vào → ra:** RN06 → RN07 → RE01. Giữ câu hỏi về cận sai số cho RS01; chuyển sang hạn chế khác: bước Newton có thể vi phạm đẳng thức.
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** VD2, dàn ý §6; riêng RN04 so lại VD1 phải ghi rõ đổi ví dụ. Phân biệt δ, δ² và ba phép trừ.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 3/20 BT; suy nghĩ 3/50 BT, chữa 9/100 BT.

### RE01 — KKT của bài toán có đẳng thức

- **Quyết định:** gộp và sửa; đối chiếu E01, E02, P02. Khôi phục cân bằng gradient của bài 03 trước khi xây dựng thuật toán giữ ràng buộc.
- **Nội dung trên trang:** Nhu cầu: tối ưu trong khi giữ tổng $u_1+u_2=14$; đường mức chỉ được dịch tới điểm trên đường khả thi. VD3 $F=\tfrac12(2u_1^2+5u_2^2)$, $u_1+u_2=14$. L=F+ν(u1+u2−14). KKT: 2u1+ν=0,5u2+ν=0,u1+u2=14; nghiệm(10,4),ν=−20,F*=140. Nêu đây là mốc kiểm cho ví dụ bậc hai.
- **Bố cục chọn:** Trái 45% đường khả thi/đường mức; phải Lagrange → ba phương trình → ứng viên; chứng nhận lồi+KKT ở chân.
- **Lý do bố cục cho sinh viên năm 3:** Khôi phục cân bằng gradient của bài 03 trước khi xây dựng thuật toán giữ ràng buộc.
- **Vào → ra:** RN07 → RE01 → RE02. Sau khi xác định đích KKT và mốc nghiệm, RE02 tìm điều kiện để bước không rời đường khả thi.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** VD3 khả thi, dàn ý §6: F, u, A, b; g, H ở RE02; d, η ở RE05; N, Δz ở RE06. Chỉ đưa ký hiệu đã dùng trên trang, chưa đưa phần dư hoặc số gia nhân tử.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Câu chuyển ghi chú: Câu hỏi về cận sai số vẫn còn mở. Trước khi trả lời, ta xây dựng bước Newton khi phải giữ một đẳng thức. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE02 — Hướng khả thi tại điểm hiện tại

- **Quyết định:** gộp và sửa; đối chiếu E01, E02. Nhìn thấy hạn chế của công cụ Newton vừa học trước khi thêm nhân tử vào bài con.
- **Nội dung trên trang:** Tại điểm khả thi $u=(16,-2)^T$, bước Newton không ràng buộc $(-16,2)^T$ đi về gốc và phá tổng. $u\in\mathbb R^2$, không có điều kiện không âm. Muốn $u+td$ giữ đẳng thức khi $Au=b$ cần $Ad=0$. Dữ kiện: $g=(32,-10)^T$, $H=\operatorname{diag}(2,5)$.
- **Bố cục chọn:** Trái 60% hình hai trục $u_1,u_2$, đường tổng $u_1+u_2=14$, miền nhìn từ $-3$ tới $17$ để hiện điểm $(16,-2)$ và nghiệm $(10,4)$; ghi rõ không có điều kiện không âm. Phải phép tính $A(u+td)=b+tAd$.
- **Lý do bố cục cho sinh viên năm 3:** Nhìn thấy hạn chế của công cụ Newton vừa học trước khi thêm nhân tử vào bài con.
- **Vào → ra:** RE01 → RE02 → RE03. Điều kiện Ad=0 trở thành ràng buộc của mô hình Newton ở RE03.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** VD3 khả thi, dàn ý §6: F, u, A, b; g, H ở RE02; d, η ở RE05; N, Δz ở RE06. Chỉ đưa ký hiệu đã dùng trên trang, chưa đưa phần dư hoặc số gia nhân tử.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE03 — Lagrange của mô hình có đẳng thức

- **Quyết định:** tách và sửa; đối chiếu E05. Sinh viên tự tái tạo hai hàng hệ Newton bằng thao tác đã dùng ở bài 03.
- **Nội dung trên trang:** Chọn min_d g^Td+1/2d^THd với Ad=0. L_m(d,η)=g^Td+1/2d^THd+η^TAd. Điều kiện dừng theo d là g+Hd+A^Tη=0; theo η là Ad=0.
- **Bố cục chọn:** Một cột ba tầng bài con → Lagrange → hai đạo hàm; nhãn biến d và nhân tử η đặt cạnh biểu thức.
- **Lý do bố cục cho sinh viên năm 3:** Sinh viên tự tái tạo hai hàng hệ Newton bằng thao tác đã dùng ở bài 03.
- **Vào → ra:** RE02 → RE03 → RE04. Hai đạo hàm Lagrange là hai hàng được xếp thành ma trận ở RE04.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE04 — Hệ Newton từ KKT của bài con

- **Quyết định:** sửa; đối chiếu E06. Bố cục thể hiện nguồn gốc từng khối, thay việc đưa ma trận hoàn chỉnh rồi yêu cầu nhớ.
- **Nội dung trên trang:** Xếp hai phương trình của RE03 thành [H Aᵀ;A0][d;η]=−[g;0]. H n×n,A p×n,η∈R^p; H≻0 và A đủ hạng hàng bảo đảm hệ khả nghịch. KKT chứng nhận nghiệm của mô hình, chưa của F.
- **Bố cục chọn:** Trái 45% hai phương trình; phải cùng các hạng được xếp vào ma trận; nối từng hàng bằng nhãn văn bản.
- **Lý do bố cục cho sinh viên năm 3:** Bố cục thể hiện nguồn gốc từng khối, thay việc đưa ma trận hoàn chỉnh rồi yêu cầu nhớ.
- **Vào → ra:** RE03 → RE04 → RE05. Hệ đã có nguồn gốc và giả thiết; RE05 giải hệ trên ví dụ thay vì chỉ kiểm hướng cho sẵn.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE05 — Một bước Newton khả thi

- **Quyết định:** tách và sửa; đối chiếu E05. Giải ra hướng trước khi kiểm, để ví dụ không chỉ là thế nghiệm được cho sẵn.
- **Nội dung trên trang:** Thế $g=(32,-10)^T$ vào hệ: $2d_1+\eta=-32$, $5d_2+\eta=10$, $d_1+d_2=0$. Thế $d_2=-d_1$ và trừ hai hàng được $7d_1=-42$, nên $d=(-6,6)^T$, $\eta=-20$. Kiểm $Ad=0$, $\delta_{eq}^2=252$; bước $t=1$ tới $(10,4)^T$, giảm $266-140=126$.
- **Bố cục chọn:** Trái 60% ba phương trình và hai bước giải; phải đồ thị hai trục $u_1,u_2$, đường tổng $14$, miền nhìn $-3$ tới $17$, mũi tên từ $(16,-2)$ tới $(10,4)$; phép kiểm tổng và mục tiêu ở chân.
- **Lý do bố cục cho sinh viên năm 3:** Giải ra hướng trước khi kiểm, để ví dụ không chỉ là thế nghiệm được cho sẵn.
- **Vào → ra:** RE04 → RE05 → RE06. RE06 phải cho cùng hướng khi khử nhân tử; sự trùng nghiệm là kiểm tra tương đương hai cách giải.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** VD3 khả thi, dàn ý §6: F, u, A, b; g, H ở RE02; d, η ở RE05; N, Δz ở RE06. Chỉ đưa ký hiệu đã dùng trên trang, chưa đưa phần dư hoặc số gia nhân tử.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE06 — Khử biến và hệ Newton rút gọn

- **Quyết định:** gộp và sửa; đối chiếu E03, E04. Đặt khử biến như cách giải cùng một hệ, thay vì một nhánh xuất hiện trước rồi bị bỏ lại.
- **Nội dung trên trang:** Chọn $A\hat u=b$, các cột của $N\in\mathbb R^{n\times(n-p)}$ là cơ sở $\ker A$, nên mọi hướng khả thi có dạng $d=N\Delta z$. Nhân $N^T$ vào hàng dừng KKT được $N^THN\Delta z=-N^Tg$. VD3: $N=(-1,1)^T$, $N^THN=7$, $N^Tg=-42$, $\Delta z=6$, nên $d=(-6,6)^T$. $\psi(z)=196-28z+7z^2/2$ đặt trong ghi chú.
- **Bố cục chọn:** Hai cột 50/50: trái khử nhân tử trong hệ KKT, phải phép tính giảm chiều; d ở chân nối hai cách.
- **Lý do bố cục cho sinh viên năm 3:** Đặt khử biến như cách giải cùng một hệ, thay vì một nhánh xuất hiện trước rồi bị bỏ lại.
- **Vào → ra:** RE05 → RE06 → RE07. Có thể giải hệ khối hoặc hệ giảm chiều; RE07 đặt một cách giải vào vòng lặp giữ khả thi.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** VD3 khả thi, dàn ý §6: F, u, A, b; g, H ở RE02; d, η ở RE05; N, Δz ở RE06. Chỉ đưa ký hiệu đã dùng trên trang, chưa đưa phần dư hoặc số gia nhân tử.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE07 — Thuật toán Newton khả thi

- **Quyết định:** sửa; đối chiếu E07. Sinh viên hiểu vì sao được tái dùng Armijo trên F và khi nào lập luận không còn đúng.
- **Nội dung trên trang:** Điểm đầu thỏa $Au=b$; lặp giải hệ KKT bài con, tính $\delta_{eq}^2=d^THd$. Nếu $\delta_{eq}^2/2\le\varepsilon_{\mathrm{model}}$ thì dừng theo mô hình, nếu chưa thì Armijo trên $F$ rồi cập nhật $u$. Phép chứng minh $g^Td=-d^THd$ dùng $Ad=0$; khi tính số kiểm thêm sai lệch $Au-b$. Dung sai mô hình chưa tự cho cận sai số mục tiêu.
- **Bố cục chọn:** Trái 60% giả mã; phải hai đẳng thức bảo toàn khả thi và hướng giảm; ghi chú tách lý thuyết chính xác khỏi dung sai máy.
- **Lý do bố cục cho sinh viên năm 3:** Sinh viên hiểu vì sao được tái dùng Armijo trên F và khi nào lập luận không còn đúng.
- **Vào → ra:** RE06 → RE07 → RE08. RE08 yêu cầu tự dựng lại hệ và giải thích vì sao được dùng Armijo trên mục tiêu.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE08 — Kiểm tra phép suy ra có đẳng thức

- **Quyết định:** tách và sửa; đối chiếu E12. Đo khả năng suy ra phương pháp, không chỉ nhận ra dạng ma trận hay nhớ vế phải0.
- **Nội dung trên trang:** Câu hỏi: từ Q(d) với Ad=0, viết L_m, lấy hai đạo hàm rồi xếp ma trận; nhân Nᵀ cho hệ nào? Dữ kiện VD3 để kiểm d nếu cần.
- **Bố cục chọn:** Trên là đề bài con; dưới ba ô trống có nhãn Lagrange/điều kiện/hệ rút gọn; đáp án trong ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Đo khả năng suy ra phương pháp, không chỉ nhận ra dạng ma trận hay nhớ vế phải0.
- **Vào → ra:** RE07 → RE08 → RR01. Điều kiện điểm đầu khả thi còn là giới hạn; RR01 đổi điểm đầu để làm rõ điều cần phục hồi.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 3/20 BT; suy nghĩ 3/50 BT, chữa 9/100 BT.

### RR01 — Hai sai lệch của điều kiện KKT

- **Quyết định:** sửa; đối chiếu E08. Mỗi phần dư có nguồn gốc và nhiệm vụ cụ thể, tránh tạo ký hiệu mới không gắn điều kiện cũ.
- **Nội dung trên trang:** Giữ VD3 nhưng u=(1,8),ν=4. r_d=∇F(u)+Aᵀν=(6,44),r_p=Au−b=−5. Mỗi phần dư ứng với một phương trình RP02; không thể dùng Ad=0 để sửa r_p.
- **Bố cục chọn:** Trái 55% hai phương trình KKT với vế trái đóng khung; phải thay số ở đúng hai hàng; nhãn “điểm đầu mới” trên cùng.
- **Lý do bố cục cho sinh viên năm 3:** Mỗi phần dư có nguồn gốc và nhiệm vụ cụ thể, tránh tạo ký hiệu mới không gắn điều kiện cũ.
- **Vào → ra:** RE08 → RR01 → RR02. Đã biết hai sai lệch cụ thể; RR02 tuyến tính hóa đúng hai phương trình tạo ra chúng.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** VD3 đổi điểm đầu: chỉ u, ν, g, r_d, r_p; chưa đưa Δν vào mặt trang. Các số 2/40 và 6/44 phải ở hai hàng gradient/phần dư khác nhau.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR02 — Tuyến tính hóa hệ KKT

- **Quyết định:** tách và sửa; đối chiếu E10. Dùng lại RN03 cho một hệ hai nhóm, làm rõ hàng nào là xấp xỉ và hàng nào đúng chính xác.
- **Nội dung trên trang:** r_d(u+d,ν+Δν)≈r_d+Hd+AᵀΔν; r_p(u+d)=r_p+Ad chính xác. Đặt hai biểu thức mô hình bằng 0.
- **Bố cục chọn:** Một cột hai cặp dòng thật/mô hình; dấu≈ chỉ ở hàng gradient, dấu= ở hàng đẳng thức; số gia Δν nhấn bằng chữ.
- **Lý do bố cục cho sinh viên năm 3:** Dùng lại RN03 cho một hệ hai nhóm, làm rõ hàng nào là xấp xỉ và hàng nào đúng chính xác.
- **Vào → ra:** RR01 → RR02 → RR03. Đặt hai mô hình bằng 0 cho vế phải và các ẩn của hệ RR03.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR03 — Hệ Newton cho hai phần dư

- **Quyết định:** tách và sửa; đối chiếu E10. Tránh đồng nhất η với Δν khi hình dạng ma trận giống nhau; nói rõ cùng điểm và cùng mô hình khi so sánh.
- **Nội dung trên trang:** [H Aᵀ;A0][d;Δν]=−[r_d;r_p]. So với RE04: ma trận giữ nguyên, ẩn thứ hai là số gia, vế phải gồm cả hai sai lệch. Với bài con mở rộng Ad=−r_p, nhân tử η=ν+Δν.
- **Bố cục chọn:** Trên ma trận toàn chiều ngang; dưới bảng ba hàng đối chiếu hệ khả thi/hệ phần dư về ẩn, vế phải và giả thiết.
- **Lý do bố cục cho sinh viên năm 3:** Tránh đồng nhất η với Δν khi hình dạng ma trận giống nhau; nói rõ cùng điểm và cùng mô hình khi so sánh.
- **Vào → ra:** RR02 → RR03 → RR04. RR04 giải số để thấy nhân tử cuối khác số gia, dù ma trận có cùng dạng.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR04 — Giải bước nguyên thủy và đối ngẫu

- **Quyết định:** sửa; đối chiếu E09. Các giá trị g2=40,rd2=44,Δν=−24,ν+=−20 luôn có nhãn và vị trí ổn định.
- **Nội dung trên trang:** VD3:2d1+Δν=−6,5d2+Δν=−44,d1+d2=5. Giải được(9,−4,−24); u+=(10,4),ν+=4−24=−20. Thế lại cả ba phương trình và hai phần dư mới.
- **Bố cục chọn:** Trái 60% hai bước khử ra d; phải cập nhật u vàν theo hai hàng riêng; phép kiểm đặt dưới tương ứng.
- **Lý do bố cục cho sinh viên năm 3:** Các giá trị g2=40,rd2=44,Δν=−24,ν+=−20 luôn có nhãn và vị trí ổn định.
- **Vào → ra:** RR03 → RR04 → RR05. Một bước giải được ví dụ bậc hai; RR05 cần thước đo tiến triển cho bước chưa đầy đủ/hàm tổng quát.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** VD3 phần dư, dàn ý §6: ghi rõ điểm đầu, g, r_d, r_p, η và Δν theo thứ tự đã định nghĩa. RR05 đổi điểm đầu có chủ ý để kiểm giới hạn.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR05 — Đại lượng đo tiến triển khi chưa khả thi

- **Quyết định:** tách và sửa; đối chiếu E10. Thấy trực tiếp lý do bỏ F làm thước đo, rồi có lập luận cho thước đo thay thế.
- **Nội dung trên trang:** Trường hợp biên của VD3: $u=(0,0)^T$, $\nu=0$ có $F=0<140$ nhưng không khả thi. Đặt $\Delta=(d,\Delta\nu)$, $J_r$ là Jacobian của vectơ phần dư; hệ RR03 chính là $J_r\Delta=-r$. Với $r\ne0$, đạo hàm của $\|r((u,\nu)+t\Delta)\|_2$ tại $t=0$ bằng $-\|r\|_2$. Vì vậy dùng chuẩn phần dư để nhận bước.
- **Bố cục chọn:** Trái 40% phản ví dụ0→140 có nhãn “đổi điểm đầu để kiểm giới hạn”; phải chuỗi J_rΔ=−r → đạo hàm âm; không thêm đồ thị trang trí.
- **Lý do bố cục cho sinh viên năm 3:** Thấy trực tiếp lý do bỏ F làm thước đo, rồi có lập luận cho thước đo thay thế.
- **Vào → ra:** RR04 → RR05 → RR06. Đạo hàm chuẩn phần dư âm biện minh phép quay lui trong RR06, không ép F giảm.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** VD3 phần dư, dàn ý §6: ghi rõ điểm đầu, g, r_d, r_p, η và Δν theo thứ tự đã định nghĩa. RR05 đổi điểm đầu có chủ ý để kiểm giới hạn.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR06 — Thuật toán Newton từ điểm chưa khả thi

- **Quyết định:** tách và sửa; đối chiếu E10. Làm rõ ảnh hưởng của giảm bước và tránh dùng giá trị nhân tử đầy đủ khi chỉ đi một phần bước.
- **Nội dung trên trang:** Tính hai phần dư; giải hệ; quay lui bằng cách kiểm miền và tiêu chí $\|r_{new}\|_2\le(1-\alpha t)\|r\|_2$; cập nhật $u+td$, $\nu+t\Delta\nu$. Dừng khi cả hai chuẩn phần dư đạt dung sai. Đạo hàm âm bảo đảm có bước dương đủ nhỏ thỏa tiêu chí, không bảo đảm mọi t đều được nhận. $r_p^+=(1-t)r_p$ và $\nu^+=(1-t)\nu+t\eta$; với $t=1$ ta có $\nu^+=\eta$.
- **Bố cục chọn:** Trái 65% giả mã năm bước; phải hai công thức cập nhật phần dư/nhân tử, t=1 được đánh dấu bằng chữ.
- **Lý do bố cục cho sinh viên năm 3:** Làm rõ ảnh hưởng của giảm bước và tránh dùng giá trị nhân tử đầy đủ khi chỉ đi một phần bước.
- **Vào → ra:** RR05 → RR06 → RR07. RR07 kiểm việc cập nhật đồng thời, dấu vế phải và điều kiện dừng của cả hai nhóm KKT.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR07 — Kiểm tra hai hệ Newton

- **Quyết định:** tách và sửa; đối chiếu E12. Kiểm các nhầm lẫn có đáp số khác nhau thật sự; buộc dùng KKT chứ không chỉ nhớ số.
- **Nội dung trên trang:** Câu hỏi: với u=(1,8),ν=4, giải thích vì sao vế phải tọa độ hai là−44, hàng ràng buộc là 5; η=−20 có phải Δν không? Nêu hai điều kiện phải kiểm để dừng.
- **Bố cục chọn:** Hai cột lỗi cần sửa/giải thích bằng công thức; đáp án−24,−20 nằm trong ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Kiểm các nhầm lẫn có đáp số khác nhau thật sự; buộc dùng KKT chứ không chỉ nhớ số.
- **Vào → ra:** RR06 → RR07 → RS01. Đã hoàn thành các phương pháp; RS01 trở lại câu hỏi RN07 về ý nghĩa định lượng của dừng theo mô hình.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** VD3 phần dư, dàn ý §6: ghi rõ điểm đầu, g, r_d, r_p, η và Δν theo thứ tự đã định nghĩa. RR05 đổi điểm đầu có chủ ý để kiểm giới hạn.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Câu chuyển sau chữa: Đã có cách tạo bước cho cả hai loại điểm đầu. Ta quay lại xác định khi nào đại lượng của mô hình cho một cận sai số mục tiêu. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 1/5 BT; suy nghĩ 2/25 BT, chữa 3/25 BT.

### RS01 — Giới hạn của tiêu chí dừng theo mô hình

- **Quyết định:** gộp và sửa; đối chiếu D01, C08. Phần tự điều chỉnh trả lời một vấn đề đã giữ lại, thay vì cắt ngang giữa hai loại Newton.
- **Nội dung trên trang:** Trở lại phân biệt giảm mô hình và sai số thật. Từ đây viết $\delta=\delta_N=\sqrt{d^THd}\ge0$; VD2 có $\delta_N^2=9/16$ nên $\delta=3/4$. Với $\varphi(s)=s-\log s$, $\varphi''=1/s^2$ không bị chặn trên toàn miền $s>0$. Cần kiểm biến thiên độ cong tương đối để có một cận sai số.
- **Bố cục chọn:** Trái 60% đồ thị $\varphi''$ có biên $s=0$; phải ba số đã biết và câu hỏi còn mở; không tạo ví dụ mới.
- **Lý do bố cục cho sinh viên năm 3:** Phần tự điều chỉnh trả lời một vấn đề đã giữ lại, thay vì cắt ngang giữa hai loại Newton.
- **Vào → ra:** RR07 → RS01 → RS02. Hessian không bị chặn toàn miền tạo nhu cầu kiểm biến thiên tương đối; RS02 có phép kiểm và định nghĩa.
- **Chuẩn và minh chứng:** LLO7 / CLO1; chuẩn bị thao tác được đo tại RS05.
- **Số liệu:** VD2 và hàm biên −log s; dàn ý §6–§7. Cận bằng sai số thật chỉ trong ví dụ đã tính.
- **Nguồn, ghi chú soạn:** BV §§9.6.1, 9.6.3 (9.49); MIT lec16; nối phép khử BV §10.1. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RS02 — Định nghĩa và phép kiểm tự điều chỉnh

- **Quyết định:** gộp và sửa; đối chiếu D02, D03. Tách chứng minh cho mọi s khỏi kiểm tra tại một điểm; không để con số128 thay lập luận.
- **Nội dung trên trang:** Bắt đầu từ VD2: $\varphi^{\prime\prime}=1/s^2$, $|\varphi^{\prime\prime\prime}|=2/s^3$ nên tỷ số bằng 2 trên toàn miền; tại $1/4$ có $128=2\cdot16^{3/2}$. Khái quát: hàm lồi $C^3$ trên miền mở lồi là tự điều chỉnh khi mọi hạn chế lên đường thẳng thỏa $|h^{\prime\prime\prime}|\le2(h^{\prime\prime})^{3/2}$.
- **Bố cục chọn:** Trái 45% tỷ số độ cong tương đối của ví dụ; phải định nghĩa tổng quát, hiện sau phép kiểm toàn miền. Một dòng kiểm số ở chân; không dùng số 128 làm chứng minh.
- **Lý do bố cục cho sinh viên năm 3:** Tách chứng minh cho mọi s khỏi kiểm tra tại một điểm; không để con số128 thay lập luận.
- **Vào → ra:** RS01 → RS02 → RS03. Lớp hàm được xác lập; RS03 dùng nó để biến độ giảm Newton thành cận sai số có điều kiện.
- **Chuẩn và minh chứng:** LLO7 / CLO1; chuẩn bị thao tác được đo tại RS05.
- **Số liệu:** VD2 và hàm biên −log s; dàn ý §6–§7. Cận bằng sai số thật chỉ trong ví dụ đã tính.
- **Nguồn, ghi chú soạn:** BV §§9.6.1, 9.6.3 (9.49); MIT lec16; nối phép khử BV §10.1. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RS03 — Cận sai số từ độ giảm Newton

- **Quyết định:** tách và sửa; đối chiếu D04. Có một đầu ra thực dụng cho phần tự điều chỉnh và thu hồi câu hỏi RN07 bằng đúng ví dụ cũ.
- **Nội dung trên trang:** Kết quả cho hàm tự điều chỉnh lồi chặt (còn gọi là lồi nghiêm ngặt), $H\succ0$, có nghiệm cực tiểu trong miền: nếu $\delta<1$ thì $f-f^*\le-\delta-\log(1-\delta)$. Với $\varphi$ tại $1/4$, $\delta=3/4$, cận $=\log4-3/4\approx0{,}63629$; $9/32$ chỉ là giảm mô hình. Sự bằng nhau giữa cận và sai số thật chỉ được xác nhận cho ví dụ log này.
- **Bố cục chọn:** Trên là hộp giả thiết và một bất đẳng thức; dưới thayδ=3/4 rồi so hai đại lượng bằng nhãn; chứng minh cận để ghi chú/tài liệu.
- **Lý do bố cục cho sinh viên năm 3:** Có một đầu ra thực dụng cho phần tự điều chỉnh và thu hồi câu hỏi RN07 bằng đúng ví dụ cũ.
- **Vào → ra:** RS02 → RS03 → RS04. Cận có ích cho bài rút gọn đẳng thức; RS04 kiểm điều kiện lớp hàm qua phép khử đã học.
- **Chuẩn và minh chứng:** LLO7 / CLO1; chuẩn bị thao tác được đo tại RS05.
- **Số liệu:** VD2 và hàm biên −log s; dàn ý §6–§7. Cận bằng sai số thật chỉ trong ví dụ đã tính.
- **Nguồn, ghi chú soạn:** BV §§9.6.1, 9.6.3 (9.49); MIT lec16; nối phép khử BV §10.1. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RS04 — Khử đẳng thức và tính tự điều chỉnh

- **Quyết định:** gộp và sửa; đối chiếu D03, D04. Kết nối phần bảo đảm với phép khử đã dùng, tránh định nghĩa tự điều chỉnh đứng riêng.
- **Nội dung trên trang:** Nếu $F$ tự điều chỉnh thì $\psi(z)=F(\hat u+Nz)$ cũng tự điều chỉnh trên miền tiền ảnh; đây chính là bài rút gọn đã học. Cận sai số chỉ dùng khi độ giảm Newton của hàm rút gọn nhỏ hơn 1 và thỏa các giả thiết của cận ở RS03: hàm rút gọn lồi chặt, Hessian xác định dương, đạt cực tiểu trong miền; tham chiếu dàn ý §5.7. Phân biệt bảo toàn lớp hàm qua hợp thành affine với tính bất biến của Newton dưới phép đổi tọa độ affine khả nghịch; tính bất biến sau không chỉ có ở hàm tự điều chỉnh.
- **Bố cục chọn:** Trái 45% sơ đồ z→u=û+Nz→F; phải điều kiện hàm rút gọn và liên hệ tiêu chí dừng khả thi; không đưa hệ số hội tụ mới.
- **Lý do bố cục cho sinh viên năm 3:** Kết nối phần bảo đảm với phép khử đã dùng, tránh định nghĩa tự điều chỉnh đứng riêng.
- **Vào → ra:** RS03 → RS04 → RS05. RS05 kiểm giả thiết tồn tại nghiệm và đọc đúng delta trước khi dùng cận.
- **Chuẩn và minh chứng:** LLO7 / CLO1; chuẩn bị thao tác được đo tại RS05.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§9.6.1, 9.6.3 (9.49); MIT lec16; nối phép khử BV §10.1. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RS05 — Kiểm tra giả thiết của cận sai số

- **Quyết định:** sửa; đối chiếu D05. Chống đồng nhất tính tự điều chỉnh với tồn tại nghiệm và phân biệtδ vớiδ².
- **Nội dung trên trang:** Câu hỏi: $-\log s$ và $s-\log s$ có cùng đạo hàm bậc hai, ba; hàm nào đạt cực tiểu hữu hạn? Có được dùng $9/32$ làm cận sai số hoặc thay $\delta$ bằng $\delta^2$ trong biểu thức cận không?
- **Bố cục chọn:** Hai cột hai hàm, dưới là hai kết luận cần kiểm; đáp án nêu miền và tính đơn điệu của−log s.
- **Lý do bố cục cho sinh viên năm 3:** Chống đồng nhất tính tự điều chỉnh với tồn tại nghiệm và phân biệtδ vớiδ².
- **Vào → ra:** RS04 → RS05 → RZ01. RZ01 thu hồi cả phép tạo bước và ý nghĩa chứng nhận, không chỉ liệt kê tên thuật toán.
- **Chuẩn và minh chứng:** LLO7 / CLO1; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** VD2 và hàm biên −log s; dàn ý §6–§7. Cận bằng sai số thật chỉ trong ví dụ đã tính.
- **Nguồn, ghi chú soạn:** BV §§9.6.1, 9.6.3 (9.49); MIT lec16; nối phép khử BV §10.1. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 1/10 BT; suy nghĩ 1/25 BT, chữa 3/50 BT.

### RZ01 — Tổng hợp nguồn gốc các phương pháp

- **Quyết định:** sửa; đối chiếu Z01. Thu hồi chung một cách xây dựng phương pháp, thay bảng tên phương pháp như các lựa chọn rời nhau.
- **Nội dung trên trang:** Bảng: điều kiện tối ưu/bài con được chọn/hệ giải/đại lượng nhận bước. Các hàng gradient, chuẩn W, Newton, Newton khả thi, Newton phần dư; KKT chính xác là chứng nhận đích trong lớp lồi, còn dung sai cần được diễn giải.
- **Bố cục chọn:** Bảng toàn chiều ngang, chỉ một công thức ngắn mỗi ô; giả thiết chi tiết tham chiếu lại nội dung đã học trong ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Thu hồi chung một cách xây dựng phương pháp, thay bảng tên phương pháp như các lựa chọn rời nhau.
- **Vào → ra:** RS05 → RZ01 → RZ02. RZ02 dùng bảng tổng hợp để sinh viên tự chọn và lập hệ cho mô hình học.
- **Chuẩn và minh chứng:** LLO6–10 / CLO1–2; chuẩn bị thao tác được đo tại RZ02.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§9.4–9.6, 10.2–10.3; Bài 03 S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/40 LT + 0 BT (LT xấp xỉ 0.0250; dùng phân số để cộng chính xác).

### RZ02 — Kiểm tra KKT trong mô hình học

- **Quyết định:** gộp và sửa; đối chiếu E11, Z02. Đo chuyển giao quy trình suy ra sang AI và nối ứng dụng bài03, không chỉ thế công thức đã cho sẵn.
- **Nội dung trên trang:** Câu hỏi: $\min_w\frac12\|Mw-y\|_2^2+\frac\rho2\|w\|_2^2$ với $Aw=b$, $\rho>0$. Cho $M\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, $A\in\mathbb R^{p\times n}$ đủ hạng hàng, $b\in\mathbb R^p$. Mốc 1: tính $g,H$ và viết KKT. Mốc 2: dùng kết quả đó điền $r_d,r_p$ vào vế phải của mẫu hệ Newton đã học; không suy lại Jacobian. Trong phần chữa, phân biệt $\rho$ cho trước, $\nu$ là nhân tử của $Aw=b$ hiện tại và $\lambda$ là nhân tử ràng buộc chuẩn $\|w\|_2^2\le\tau$ ở Bài 03.
- **Bố cục chọn:** Trái 40% mô hình và kích thước; phải hai mốc nối bằng mũi tên trên cùng trang: mốc 1 tính $g,H$ và KKT, mốc 2 điền $r_d,r_p$ vào mẫu hệ Newton đã học; lời giải và VD3 phục hồi bằng $M=\operatorname{diag}(1,2)$, $y=0$, $\rho=1$ ở ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Đo chuyển giao quy trình suy ra sang AI và nối ứng dụng bài03, không chỉ thế công thức đã cho sẵn.
- **Vào → ra:** RZ01 → RZ02 → RZ03. Lời giải cho thấy kỹ năng có thể chuyển giao; RZ03 giao sản phẩm tự học tương ứng.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** Ví dụ Bài 03 hoặc VD3 có nhãn nguồn/đổi bối cảnh; dàn ý §4 và §7. Không thay dữ kiện Bài 03.
- **Nguồn, ghi chú soạn:** BV §§9.4–9.6, 10.2–10.3; Bài 03 S05-06a/b; đề cương buổi 4. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 3/20 BT; suy nghĩ 3/50 BT, chữa 9/100 BT.

### RZ03 — Bài tập và tài liệu đọc

- **Quyết định:** sửa; đối chiếu Z03. Kết thúc bằng năng lực quan sát được và nguồn để tự lấp chi tiết chứng minh.
- **Nội dung trên trang:** Giao ba sản phẩm: tự suy ra hướng từ bài con; tái tạo một lượt quay lui; suy ra và kiểm hai hệ Newton có đẳng thức. Boyd–Vandenberghe §§5.5.3,9.4–9.6,10.2–10.3; MIT lec16 rồi lec17.
- **Bố cục chọn:** Bảng nhiệm vụ/sản phẩm ba hàng; dưới tài liệu ngắn; không thêm chủ đề hoặc sơ đồ mới.
- **Lý do bố cục cho sinh viên năm 3:** Kết thúc bằng năng lực quan sát được và nguồn để tự lấp chi tiết chứng minh.
- **Vào → ra:** RZ02 → RZ03 → tài liệu/bài tập sau buổi. Kết thúc bằng các phép suy ra có thể tự tái tạo; không giới thiệu phương pháp mới.
- **Chuẩn và minh chứng:** LLO6–10 / CLO1–2; chuẩn bị thao tác được đo tại RZ02.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§9.4–9.6, 10.2–10.3; Bài 03 S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/40 LT + 0 BT (LT xấp xỉ 0.0250; dùng phân số để cộng chính xác).

## Các giới hạn bố cục đã duyệt và kiểm khi triển khai

| Trang | Quyết định giới hạn nội dung trên màn chiếu |
|---|---|
| RP02 | Bốn nhóm KKT ở dải trên chỉ là nhãn và ký hiệu ngắn; giữ hai hệ rút gọn ở vùng chính. Giả thiết đầy đủ được nói/ghi đúng nguồn, không lặp chứng minh Bài 03. |
| RG09 | Dải phụ bốn nhóm KKT có cỡ chữ thân bài; vùng chính chỉ ba bước: ζ>0 → biên hoạt động → v. Phép tính 4ζ² nằm trong ghi chú hoặc hiện thay dòng giữa, không thêm cả đoạn suy diễn. |
| RG10 | Vùng chính đổi độ dài từ v sang d; vùng dưới định nghĩa Q_W bằng một công thức và điều kiện dừng. Nếu hiện theo bước, thay nội dung cùng vùng sau khi đã đọc; không dồn hai chuỗi vào một thẻ hẹp. |
| RE01 | Hiện nhu cầu và hình trước; Lagrange, ba phương trình và mốc nghiệm hiện lần lượt, không bày đồng thời mọi phép giải. Phép giải mốc nghiệm trong ghi chú; RE05 mới tập trung giải bước. |
| RE04 | Hai phương trình chuyển vào ma trận theo hàng; kích thước trong một dòng nhãn riêng. Chứng minh khả nghịch ở ghi chú. |
| RE06 | Chỉ hiện d=NΔz, phương trình sau khử, và ba phép tính số ngắn. Đa thức ψ không lên mặt trang. |
| RR03 | Bảng đối chiếu ba hàng chỉ là ẩn/vế phải/điểm đầu; không lặp toàn bộ hai ma trận. Quan hệ η=ν+Δν một dòng. |
| RR05 | Mặt trang dùng chuỗi đạo hàm của bình phương chuẩn để tránh chia phức tạp; kết quả đạo hàm chuẩn đặt ở chân cùng điều kiện r≠0. Ghi chú chứa phép chia cho chuẩn. |
| RS03 | Một hộp giả thiết, một bất đẳng thức, một phép thay δ; chứng minh cận và điều kiện dừng theo ε ở tài liệu, không nhồi lên trang. |
| RZ01 | Dùng năm hàng, bốn cột; mỗi ô nhiều nhất một công thức hoặc một cụm từ. Giả thiết chi tiết ở ghi chú, không dùng bảng thay định lý. |

Chưa dựng hình hoặc kiểm tràn của các bố cục đề xuất. Khi triển khai phải thử 16:9 và màn hình hẹp; không coi đặc tả tỷ lệ cột là bằng chứng đã đọc được.

## Ánh xạ toàn bộ mã trước sửa sang bản triển khai mới

Mọi trang hiện hành đều có quyết định. Mã mới ở nhiều dòng thể hiện việc gộp/tách, không có nghĩa nhân đôi nội dung. Các định lý hội tụ dài chuyển sang ghi chú vẫn được bảo toàn trong dàn ý §5.7.

| Mã hiện tại | Mã đề xuất sử dụng lại | Quyết định và thay đổi chính |
|---|---|---|
| P00 | RP00 | Giữ tên và vai trò. |
| P01 | RP01, RP03 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| P02 | RG01, RE01 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| P03 | RP01, RP02, RP03 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| P04 | RP04 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| A01 | RG01 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| A02 | RG01 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| A03 | RG03 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| A04 | RG03 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| A05 | RG04 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| A06 | RG05 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| A07 | RG11 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| B01 | RG07 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| B02 | RG08, RG10 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| B03 | RG08, RG09 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| B04 | RG10 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| B05 | RG06 | Chuyển cận tốc độ và giả thiết vào ghi chú RG06, dàn ý §5.7; mặt trang ưu tiên vòng lặp đầy đủ. |
| B06 | RG11 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| C01 | RN01 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| C02 | RN02 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| C03 | RN02, RN03 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| C04 | RN04 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| C05 | RN06 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| C06 | RN06 | Gộp điều kiện hội tụ/chi phí vào RN06; chi tiết cận đặt trong ghi chú, không bỏ giả thiết. |
| C07 | RN01, RN05 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| C08 | RN07, RS01 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| D01 | RS01 | Chuyển sau hai hệ Newton, sửa vai trò thành bảo đảm sai số; giữ định nghĩa và kiểm điều kiện. |
| D02 | RS02 | Chuyển sau hai hệ Newton, sửa vai trò thành bảo đảm sai số; giữ định nghĩa và kiểm điều kiện. |
| D03 | RS02, RS04 | Chuyển sau hai hệ Newton, sửa vai trò thành bảo đảm sai số; giữ định nghĩa và kiểm điều kiện. |
| D04 | RS03, RS04 | Chuyển sau hai hệ Newton, sửa vai trò thành bảo đảm sai số; giữ định nghĩa và kiểm điều kiện. |
| D05 | RS05 | Chuyển sau hai hệ Newton, sửa vai trò thành bảo đảm sai số; giữ định nghĩa và kiểm điều kiện. |
| E01 | RE01, RE02 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E02 | RE01, RE02 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E03 | RE06 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E04 | RE06 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E05 | RE03, RE05 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E06 | RE04 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E07 | RE07 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E08 | RR01 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E09 | RR04 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E10 | RR02, RR03, RR05, RR06 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E11 | RZ02 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| E12 | RE08, RR07 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| Z01 | RZ01 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| Z02 | RZ02 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |
| Z03 | RZ03 | Tách/gộp hoặc viết lại theo vai trò, nội dung và bố cục ghi ở các mục đích; không giữ thứ tự cũ mặc định. |

---


## Điều chỉnh cụ thể khi ghép bản triển khai

- RG01 giữ hình ba hướng tại cùng điểm để phân biệt dấu đạo hàm; RG03 dùng hình tia mới với hai điểm thử xa/gần. RG08 giữ hình chuẩn W đã có. Các hình được chọn bằng nội dung thực tế, không suy từ tên tệp.
- RN01 dùng phi-local-model.svg với hàm thật, tiếp tuyến và mô hình tại1/4, chưa đánh dấu7/16; nghiệm mô hình được tự giải ở RN02.
- RG05 và RN05 hiện từng hàng bảng bằng fragment; RG02 và RN02 hiện các bước suy ra tuần tự. Đáp án câu kiểm tra nằm trong ghi chú.
- RE03 giữ ba tầng bài con → Lagrange → đạo hàm; bỏ câu kết lặp để đủ chiều cao, giữ cỡ chữ. RE06 khai báo N trên đầu trước hai cột khử nhân tử và phép tính số.
- RR06 kiểm hai dung sai ngay đầu vòng trước giải hệ; dòng thứ năm trở về đầu vòng. Điều này tránh giải bước bằng không khi đã đạt. Viết $t=1$ kéo theo $\nu^+=\eta$, không viết chiều đảo tuyệt đối vì $\Delta\nu=0$ cũng có thể cho đẳng thức đó.
- RS02 dùng đồ thị tỷ số bằng 2 trên toàn miền, không dùng hình cũ với điểm Newton khác sổ số. RS04 dùng sơ đồ HTML $z\to u=\hat u+Nz\to F(u)$, công thức vẫn là chữ.
- Mọi thay đổi trên giữ nguyên 46 trang, 7 mạch, thứ tự, LLO/CLO và tổng 2 LT + 1 BT. Chi tiết tự rà và kết quả các lượt độc lập nằm trong nhật ký; chưa suy đạt hiển thị từ đặc tả.

## Bản đang triển khai trước đề xuất — lưu để đối chiếu

Phần dưới mô tả HTML hiện hành, chưa được thay bằng đề xuất trên. Các tuyên bố đã triển khai/đã đạt trong phần này chỉ thuộc lần bàn giao trước.

## Storyboard Bài giảng 04 — Bản lập kế hoạch 2026-09-24

### Trạng thái và nguyên tắc

Đã triển khai và kiểm định 46 trang trong 7 mạch P/A/B/C/D/E/Z. Mọi mã trong tài liệu này thuộc bản mới. [Dàn bài](outline.md) chứa nội dung, hình, đáp án, tiêu chí và phân bổ từng trang; [đặc tả toán](math-spec.md) khóa ký hiệu và số. Bảng dưới quyết định vai trò và bố cục của từng trang; bằng chứng kiểm định hình ảnh được ghi trong review-log.md.

Mỗi mạch có điểm vào, sản phẩm dùng tiếp và trang kiểm tra riêng trong bản đồ phần của outline.md. Bố cục kế thừa mẫu RevealJS hiện có, không dựng hệ giao diện mới. Mục lý do giải thích cách bố cục giải quyết tải nhận thức cho sinh viên năm3; không dùng lý do chung “đẹp” hoặc “trực quan”.

### Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức | Ứng dụng dùng kết quả | Bài tập | Đầu vào → sản phẩm; ký hiệu truyền tiếp | Thời lượng |
|---|---|---|---|---|---|---|---|---|
| Hướng giảm và chọn bước | A01 | A02 | A01 dẫn nhập, A03 tính hướng | A04,A05 | A06 nhận bước thật | A07 | Gradient/tích vô hướng → kiểm d,t; truyền x,g,d từVD1 | 0.30LT+0.15BT |
| Gradient và chuẩn | B01 | B01, đầuB02 | B02 | B03 | B04 giải Wd=-g | B06 | Hướng giảm → phân biệt chuẩn hóa và không chuẩn hóa; cùng g và W | 0.25LT+0.10BT |
| Newton không ràng buộc | C01 | C01 | C02 | C03,C04 | C05 thuật toán; C07 hàm mới | C08 | H và mô hình → một bước và giới hạn sai số; cùng g,H,d,δ | 0.40LT+0.15BT |
| Hàm tự điều chỉnh | D01 | D01,D02 | D02 | D03 | D04 kiểm hai hàm log | D05 | Đạo hàmVD2 → kiểm mọi s, không suy tồn tại nghiệm; cùng φ,s | 0.25LT+0.10BT |
| Khử đẳng thức | E01 | E02 | E03 | E04 | E04 áp dụng công thức rút gọn | E12 với N đã cho | Phép thế → cơ sởkerA và Hessian rút gọn; uhat,N,z | 0.18LT+0.05BT, cộng một phần E12 |
| Newton khả thi | cuốiE04: N có thể đặc | E02 dùng lại đường khả thi | E05 | E06 | E07 vòng lặp và giảm mô hình | E12 | KKT/mô hình → hướng giữ tổng; d,η phân biệt ν | 0.16LT+0.03BT, cộng một phần E12 |
| Newton phần dư | E08 | E08 | E08,E09 | E10 | E11 mô hình học | E12 | Phần dư cụ thể → quy trình phục hồi; rd,rp,Δν | 0.21LT+0.09BT, cộng một phần E12 |

E12 có0.13tiết bài tập dùng chung ba cụm, tính đúng một lần; toàn phầnE là0.55LT+0.30BT. Các thời lượng con gồm hoạt động đã phân vào từng trang, không cộng thêm một tiết ngoài tổng. Mở đầu0.15LT+0.10BT và kết luận0.10LT+0.10BT không phải khái niệm toán mới nên dùng chu trình định hướng/nhắc lại → kiểm tra ởP04/Z02, không ép sáu bước nhân tạo.

Ví dụ dẫn nhập A01 cụ thể hóa nhu cầu làm giảm62; E08 cụ thể hóa nhu cầu sửa tổng đang thiếu5 và điều kiện dừng còn sai. Hai trang này cho phép ví dụ cùng nhu cầu trước trực quan theo quy ước của kho. B02 gộp trực quan và ví dụ vì chỉ thay tập đơn vị; D02 gộp tỷ số và phép tính vì cùng một luận điểm. E04 gộp định nghĩa và áp dụng khử vì bảng đặt mỗi ký hiệu cạnh trường hợp đã tính ởE03. E10 ghép hệ phần dư với quy tắc bước vì cùng mục tiêu xóa phần dư; không đưa chứng minh hội tụ đầy đủ lên mặt trang.

B05 (cận tốc độ) và C06 (hai pha) là kết quả hỗ trợ: nhu cầu đánh giá phương pháp → phát biểu có giả thiết → kiểm việc suy diễn quá mức ởB06/C08/Z02. Chỉ phác thảo chứng minh và nêu rõ giới hạn, không mở một chu trình đầy đủ riêng vì LLO ưu tiên vận dụng thuật toán. Không bỏ ngầm trực quan hay ví dụ của các khái niệm chính.

Các câu nối giữa bước: dấu của gᵀd tạo nhu cầu chọn t; một bước hợp lệ nhưng đường đi phụ thuộc hình học tạo nhu cầu chọn chuẩn; W cố định tạo nhu cầu dùng H(x); sai số mô hình khác sai số thật tạo nhu cầu về bảo đảm; hướng Newton ra ngoài đường tổng tạo nhu cầu khử/KKT; không tìm sẵn được điểm khả thi tạo nhu cầu theo dõi hai phần dư. E11 dùng chính các công thức g,H,rd,rp vừa học, không chỉ nêu tên một ứng dụng.

### Quyết định từng trang

Cột quyết định là biên tập so với bản cũ và nguồn, không phải trạng thái lỗi sau rà. Vì vậy Z02 ghi sửa dù đáp án của bản mới đã đủ; E12 ghi tách vì tách kiểm tra khỏi các trang ví dụ/thuật toán cũ, không yêu cầu tách thêm trang mới.

| Trang; vai trò; chuẩn | Lý do tồn tại và khoảng trống nhận thức | Luận điểm trang trước → luận điểm trang sau | Quyết định và lý do | Bố cục cụ thể | Lý do phù hợp năm3 | Thời lượng LT/BT |
|---|---|---|---|---|---|---|
| P00; định danh; LLO6–10 | Bài 04 xây dựng quy trình tính từ điều kiện tối ưu. Khoảng trống: Sinh viên nhận ra phạm vi bài ngay trước khi gặp các nhánh phương pháp. | Sinh viên bước vào buổi4. → Năm cụm kiến thức cùng phục vụ việc chọn và kiểm tra một bước lặp. | giữ: giữ chức năng định danh, không đổi nội dung toán | Một cột; tên bài ở giữa, tên học phần phía trên, đơn vị phía dưới. | Sinh viên nhận ra phạm vi bài ngay trước khi gặp các nhánh phương pháp. | 0.01/0.00 |
| P01; bản đồ; LLO6–10 | Năm cụm kiến thức cùng phục vụ việc chọn và kiểm tra một bước lặp. Khoảng trống: Cho sinh viên thấy kết quả của từng cụm được dùng ở đâu, thay vì ghi nhớ một danh sách thuật toán. | Bài 04 xây dựng quy trình tính từ điều kiện tối ưu. → Biết nghiệm phải thỏa điều kiện gì chưa đủ để tạo một dãy lặp dùng được. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Một dải ngang năm nút; câu nhiệm vụ nằm dưới, tối đa hai dòng. | Cho sinh viên thấy kết quả của từng cụm được dùng ở đâu, thay vì ghi nhớ một danh sách thuật toán. | 0.02/0.00 |
| P02; nhu cầu; LLO6,8,9,10 | Biết nghiệm phải thỏa điều kiện gì chưa đủ để tạo một dãy lặp dùng được. Khoảng trống: Đối chiếu hai nhiệm vụ cụ thể tạo nhu cầu trước khi giới thiệu công thức tổng quát. | Năm cụm kiến thức cùng phục vụ việc chọn và kiểm tra một bước lặp. → Mỗi mục tiêu được kiểm bằng thao tác hoặc giải thích có điều kiện. | thêm: lấp khoảng trống động lực hoặc kiểm tra tiên quyết | Hai cột 1:1 với cùng thứ tự dữ kiện → nhiệm vụ; một câu kết ở đáy. | Đối chiếu hai nhiệm vụ cụ thể tạo nhu cầu trước khi giới thiệu công thức tổng quát. | 0.06/0.00 |
| P03; tiên quyết; LLO6–10/CLO1,2 | Mỗi mục tiêu được kiểm bằng thao tác hoặc giải thích có điều kiện. Khoảng trống: Tách mục tiêu khỏi bảng ký hiệu giúp sinh viên biết điều phải làm trước khi đọc các đại lượng. | Biết nghiệm phải thỏa điều kiện gì chưa đủ để tạo một dãy lặp dùng được. → Tích vô hướng và phép nhân ma trận đủ để kiểm tra hai tính chất cơ bản. | gộp: đưa kiến thức cần dùng sát mục tiêu thay hai trang rời | Hai cột 3:2: bên trái bốn mục tiêu, bên phải khung ký hiệu. | Tách mục tiêu khỏi bảng ký hiệu giúp sinh viên biết điều phải làm trước khi đọc các đại lượng. | 0.06/0.00 |
| P04; bài tập; tiên quyết cho LLO6,9; không chứng nhận hoàn thành LLO | Tích vô hướng và phép nhân ma trận đủ để kiểm tra hai tính chất cơ bản. Khoảng trống: Kiểm tra đúng tiên quyết, không đòi hỏi định nghĩa sẽ được dạy ở phần A. | Mỗi mục tiêu được kiểm bằng thao tác hoặc giải thích có điều kiện. → Một điểm khởi đầu và một hàm cụ thể cho phép quan sát tác động của bước lặp. | thêm: lấp khoảng trống động lực hoặc kiểm tra tiên quyết | Hai khung câu hỏi ngang hàng; chừa nửa dưới để người học tự tính. | Kiểm tra đúng tiên quyết, không đòi hỏi định nghĩa sẽ được dạy ở phần A. | 0.00/0.10 |
| A01; nhu cầu + ví dụ dẫn nhập; LLO6,8 | Một điểm khởi đầu và một hàm cụ thể cho phép quan sát tác động của bước lặp. Khoảng trống: Mỗi đại lượng có tên và số riêng; hình nối dữ kiện đại số với vị trí trong mặt phẳng. | Tích vô hướng và phép nhân ma trận đủ để kiểm tra hai tính chất cơ bản. → Chiếu hướng đi lên gradient dự báo biến thiên bậc nhất. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hình 60% bên trái; bảng năm dữ kiện 40% bên phải. | Mỗi đại lượng có tên và số riêng; hình nối dữ kiện đại số với vị trí trong mặt phẳng. | 0.03/0.00 |
| A02; trực quan; LLO6 | Chiếu hướng đi lên gradient dự báo biến thiên bậc nhất. Khoảng trống: Sinh viên đối chiếu cùng một điểm và cùng gradient, chỉ thay hướng nên dễ nhận ra cơ chế. | Một điểm khởi đầu và một hàm cụ thể cho phép quan sát tác động của bước lặp. → Dấu của tích vô hướng kiểm tra được bằng một phép tính ngắn. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hình chiếm 2/3 trang; bên phải ba nhãn; câu giới hạn ở dưới. | Sinh viên đối chiếu cùng một điểm và cùng gradient, chỉ thay hướng nên dễ nhận ra cơ chế. | 0.04/0.00 |
| A03; ví dụ; LLO6,8 | Dấu của tích vô hướng kiểm tra được bằng một phép tính ngắn. Khoảng trống: Cố định dữ kiện chung và đổi đúng một yếu tố giúp phân biệt gradient với hướng di chuyển. | Chiếu hướng đi lên gradient dự báo biến thiên bậc nhất. → Hướng xác định đường đi; độ dài bước xác định điểm được chấp nhận. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Bảng ba cột ở trung tâm; g được cố định trong một dòng phía trên. | Cố định dữ kiện chung và đổi đúng một yếu tố giúp phân biệt gradient với hướng di chuyển. | 0.03/0.03 |
| A04; hình thức; LLO6,8 | Hướng xác định đường đi; độ dài bước xác định điểm được chấp nhận. Khoảng trống: Chia hai quyết định trước khi trình bày vòng lặp giúp sinh viên không coi d và t là một tham số. | Dấu của tích vô hướng kiểm tra được bằng một phép tính ngắn. → Quay lui kiểm tra miền xác định và mức giảm đủ trước khi cập nhật. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Trên: công thức cập nhật lớn; dưới: hai cột hướng / độ dài bước. | Chia hai quyết định trước khi trình bày vòng lặp giúp sinh viên không coi d và t là một tham số. | 0.06/0.00 |
| A05; thuật toán; LLO8 | Quay lui kiểm tra miền xác định và mức giảm đủ trước khi cập nhật. Khoảng trống: Đặt điều kiện toán cạnh đúng nhánh xử lý giúp người học chuyển từ tính tay sang thực hiện thuật toán. | Hướng xác định đường đi; độ dài bước xác định điểm được chấp nhận. → Armijo chọn bước đầu tiên đạt điều kiện, không nhất thiết là bước tốt nhất trên tia. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Giả mã bên trái 60%; đồ thị hàm theo t và đường Armijo bên phải 40%. | Đặt điều kiện toán cạnh đúng nhánh xử lý giúp người học chuyển từ tính tay sang thực hiện thuật toán. | 0.06/0.00 |
| A06; ứng dụng; LLO6,8 | Armijo chọn bước đầu tiên đạt điều kiện, không nhất thiết là bước tốt nhất trên tia. Khoảng trống: Cùng một bảng chứa giá trị thực và ngưỡng nên sinh viên không phải nhớ số giữa hai trang. | Quay lui kiểm tra miền xác định và mức giảm đủ trước khi cập nhật. → Một bước đã đạt Armijo kết thúc vòng quay lui. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Bảng rộng toàn trang; nhấn một hàng cuối, kết luận một dòng phía dưới. | Cùng một bảng chứa giá trị thực và ngưỡng nên sinh viên không phải nhớ số giữa hai trang. | 0.08/0.03 |
| A07; bài tập; LLO6,8 | Một bước đã đạt Armijo kết thúc vòng quay lui. Khoảng trống: Phát hiện lỗi thao tác đo khả năng thực hiện quy tắc, vượt việc chép lại phép tính A06. | Armijo chọn bước đầu tiên đạt điều kiện, không nhất thiết là bước tốt nhất trên tia. → Độ cong khác nhau theo tọa độ làm cùng một bước gradient co khác nhau theo mỗi trục. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Câu hỏi trên 1/3 trang; giả mã lớn bên dưới; đáp án chỉ trong ghi chú. | Phát hiện lỗi thao tác đo khả năng thực hiện quy tắc, vượt việc chép lại phép tính A06. | 0.00/0.09 |
| B01; nhu cầu + trực quan; LLO6 | Độ cong khác nhau theo tọa độ làm cùng một bước gradient co khác nhau theo mỗi trục. Khoảng trống: Hình giải thích sự đổi hướng từ phép tính đã biết mà chưa cần định lý hội tụ tổng quát. | Một bước đã đạt Armijo kết thúc vòng quay lui. → Hướng dốc nhất phụ thuộc tập hướng được coi là dài không quá một. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hình 65% bên trái; hai công thức co bên phải. | Hình giải thích sự đổi hướng từ phép tính đã biết mà chưa cần định lý hội tụ tổng quát. | 0.05/0.00 |
| B02; trực quan + ví dụ; LLO6 | Hướng dốc nhất phụ thuộc tập hướng được coi là dài không quá một. Khoảng trống: So sánh cùng gradient nhưng khác tập đơn vị làm rõ vai trò của chuẩn, tránh đồng nhất dốc nhất với âm gradient. | Độ cong khác nhau theo tọa độ làm cùng một bước gradient co khác nhau theo mỗi trục. → Giảm dốc nhất tối thiểu hóa mô hình tuyến tính dưới một giới hạn độ dài đã chọn. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hai hình 1:1; dưới mỗi hình là hướng và chuẩn của nó. | So sánh cùng gradient nhưng khác tập đơn vị làm rõ vai trò của chuẩn, tránh đồng nhất dốc nhất với âm gradient. | 0.04/0.02 |
| B03; hình thức; LLO6 | Giảm dốc nhất tối thiểu hóa mô hình tuyến tính dưới một giới hạn độ dài đã chọn. Khoảng trống: Ghi quy ước trước ví dụ tiếp theo giúp sinh viên không tưởng hai công thức hướng mâu thuẫn. | Hướng dốc nhất phụ thuộc tập hướng được coi là dài không quá một. → Một ma trận xác định dương biến việc chọn hướng thành giải hệ tuyến tính. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Định nghĩa ở nửa trên; hai ô chuẩn hóa / không chuẩn hóa ở dưới. | Ghi quy ước trước ví dụ tiếp theo giúp sinh viên không tưởng hai công thức hướng mâu thuẫn. | 0.05/0.00 |
| B04; ứng dụng; LLO6,8 | Một ma trận xác định dương biến việc chọn hướng thành giải hệ tuyến tính. Khoảng trống: Liên hệ chuẩn với phép giải hệ quen thuộc chuẩn bị trực tiếp cho Newton ở phần C. | Giảm dốc nhất tối thiểu hóa mô hình tuyến tính dưới một giới hạn độ dài đã chọn. → Tốc độ tuyến tính cần giả thiết về độ cong, không suy ra chỉ từ hình đường đi. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Bên trái hệ và nghiệm chiếm 55%; bên phải sơ đồ đổi thước đo 45%. | Liên hệ chuẩn với phép giải hệ quen thuộc chuẩn bị trực tiếp cho Newton ở phần C. | 0.05/0.00 |
| B05; giới hạn và bảo đảm; LLO6,8 | Tốc độ tuyến tính cần giả thiết về độ cong, không suy ra chỉ từ hình đường đi. Khoảng trống: Giữ giả thiết sát kết luận để sinh viên không mang bảo đảm lồi mạnh sang bài phi lồi. | Một ma trận xác định dương biến việc chọn hướng thành giải hệ tuyến tính. → So sánh hướng cần nêu chuẩn và quy ước chuẩn hóa. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Công thức chặn ở giữa; giả thiết trên, ý nghĩa của hệ số dưới. | Giữ giả thiết sát kết luận để sinh viên không mang bảo đảm lồi mạnh sang bài phi lồi. | 0.06/0.00 |
| B06; bài tập; LLO6,8 | So sánh hướng cần nêu chuẩn và quy ước chuẩn hóa. Khoảng trống: Kiểm tra đúng hai ranh giới: chuẩn lựa chọn và bằng chứng về tốc độ. | Tốc độ tuyến tính cần giả thiết về độ cong, không suy ra chỉ từ hình đường đi. → Hessian cung cấp thước đo thay đổi theo điểm khi độ cong không cố định. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Dữ kiện trên; ba yêu cầu đánh số ở dưới; không dùng hình mới. | Kiểm tra đúng hai ranh giới: chuẩn lựa chọn và bằng chứng về tốc độ. | 0.00/0.08 |
| C01; nhu cầu + trực quan; LLO6 | Hessian cung cấp thước đo thay đổi theo điểm khi độ cong không cố định. Khoảng trống: Động cơ hình học có trước hệ Newton để sinh viên hiểu tại sao cần Hessian. | So sánh hướng cần nêu chuẩn và quy ước chuẩn hóa. → Hai phép chia theo độ cong cho một bước đến nghiệm của VD1. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hình chiếm 70%; bên phải hai dòng tiếp tuyến / độ cong. | Động cơ hình học có trước hệ Newton để sinh viên hiểu tại sao cần Hessian. | 0.05/0.00 |
| C02; ví dụ; LLO6,8 | Hai phép chia theo độ cong cho một bước đến nghiệm của VD1. Khoảng trống: Tính tay trong hai chiều tạo điểm tựa trước khi thay hai phương trình bằng ký hiệu ma trận. | Hessian cung cấp thước đo thay đổi theo điểm khi độ cong không cố định. → Hướng Newton cực tiểu hóa mô hình bậc hai khi Hessian xác định dương. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Phép tính căn dọc 2/3 trang; hình xác nhận ở 1/3 bên phải. | Tính tay trong hai chiều tạo điểm tựa trước khi thay hai phương trình bằng ký hiệu ma trận. | 0.04/0.03 |
| C03; hình thức; LLO6,8 | Hướng Newton cực tiểu hóa mô hình bậc hai khi Hessian xác định dương. Khoảng trống: Một chuỗi ngắn đủ chứng minh cả nguồn gốc lẫn tính hướng giảm mà không phải học công thức nghịch đảo. | Hai phép chia theo độ cong cho một bước đến nghiệm của VD1. → Độ giảm của mô hình và sai số thật là hai đại lượng khác nhau. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Mô hình ở trên; hệ Newton trong khung trung tâm; kiểm tra hướng giảm ở dưới. | Một chuỗi ngắn đủ chứng minh cả nguồn gốc lẫn tính hướng giảm mà không phải học công thức nghịch đảo. | 0.07/0.00 |
| C04; hình thức; LLO6,8 | Độ giảm của mô hình và sai số thật là hai đại lượng khác nhau. Khoảng trống: Tách hai vai trò ngay khi giới thiệu tiêu chí dừng để tránh học thuộc δ²/2 là sai số chính xác. | Hướng Newton cực tiểu hóa mô hình bậc hai khi Hessian xác định dương. → Newton dùng hệ tuyến tính để chọn hướng và Armijo để kiểm soát bước. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Công thức trung tâm lớn; hai cột phân biệt đại lượng ở dưới. | Tách hai vai trò ngay khi giới thiệu tiêu chí dừng để tránh học thuộc δ²/2 là sai số chính xác. | 0.06/0.00 |
| C05; thuật toán và ứng dụng; LLO8 | Newton dùng hệ tuyến tính để chọn hướng và Armijo để kiểm soát bước. Khoảng trống: Sinh viên đã giải hệ ở C02–C03; đặt hệ tại đúng dòng giả mã giúp theo dõi thứ tự thao tác. Bảng đầu vào tách khỏi giả mã giúp giảm lượng chữ cần đọc đồng thời. | Độ giảm của mô hình và sai số thật là hai đại lượng khác nhau. → Bước đầy đủ và hội tụ bậc hai xuất hiện gần nghiệm dưới các giả thiết cụ thể. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Giả mã sáu dòng đặt bên trái theo thứ tự xuất hiện, bảng đầu vào/đầu ra/điều kiện dừng thu gọn thành ba hàng bên phải; nhãn "giải hệ" gắn trực tiếp dòng tốn chi phí thay vì chú thích dưới màn. | Sinh viên đã giải hệ ở C02–C03; đặt hệ tại đúng dòng giả mã giúp theo dõi thứ tự thao tác. Bảng đầu vào tách khỏi giả mã giúp giảm lượng chữ cần đọc đồng thời. | 0.07/0.00 |
| C06; bảo đảm; LLO6 | Bước đầy đủ và hội tụ bậc hai xuất hiện gần nghiệm dưới các giả thiết cụ thể. Khoảng trống: Sinh viên nhìn thấy bảo đảm gắn với miền và tính đều của Hessian, thay vì chỉ nhớ “Newton nhanh”. | Newton dùng hệ tuyến tính để chọn hướng và Armijo để kiểm soát bước. → Ngoài hàm bậc hai, một bước Newton không xóa hết sai số. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Bảng giả thiết 45% trái; sơ đồ hai pha 55% phải. | Sinh viên nhìn thấy bảo đảm gắn với miền và tính đều của Hessian, thay vì chỉ nhớ “Newton nhanh”. | 0.06/0.00 |
| C07; ứng dụng + ví dụ dẫn sang D; LLO6,8 | Ngoài hàm bậc hai, một bước Newton không xóa hết sai số. Khoảng trống: Điểm đầu được chọn để d,δ² và δ²/2 đều khác nhau, trong khi phép tính vẫn là phân số đơn giản. | Bước đầy đủ và hội tụ bậc hai xuất hiện gần nghiệm dưới các giả thiết cụ thể. → Dừng theo mô hình phải được mô tả đúng loại bảo đảm. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hình 50% trái; bảng số 50% phải; hạn chế hiện một lúc quá ba hàng bằng xuất hiện từng bước. | Điểm đầu được chọn để d,δ² và δ²/2 đều khác nhau, trong khi phép tính vẫn là phân số đơn giản. | 0.05/0.04 |
| C08; bài tập; LLO6,8 | Dừng theo mô hình phải được mô tả đúng loại bảo đảm. Khoảng trống: Phát hiện sai loại đại lượng đo hiểu biết về mô hình, không chỉ thao tác thế công thức. | Ngoài hàm bậc hai, một bước Newton không xóa hết sai số. → Cần so tốc độ thay đổi độ cong với chính độ cong để có phân tích phù hợp phép đổi tọa độ. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Báo cáo cần sửa nằm giữa; dữ kiện phía trên, ô giải thích phía dưới. | Phát hiện sai loại đại lượng đo hiểu biết về mô hình, không chỉ thao tác thế công thức. | 0.00/0.08 |
| D01; nhu cầu; LLO7 | Cần so tốc độ thay đổi độ cong với chính độ cong để có phân tích phù hợp phép đổi tọa độ. Khoảng trống: Dựa trên hàm vừa tính tránh đưa một lớp hàm trừu tượng khi sinh viên chưa thấy vấn đề cần giải. | Dừng theo mô hình phải được mô tả đúng loại bảo đảm. → Ở VD2, đạo hàm bậc ba được kiểm soát đúng theo lũy thừa ba phần hai của độ cong. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hình 60%; câu nhu cầu và hai đại lượng cần so ở bên phải. | Dựa trên hàm vừa tính tránh đưa một lớp hàm trừu tượng khi sinh viên chưa thấy vấn đề cần giải. | 0.04/0.00 |
| D02; trực quan + ví dụ; LLO7 | Ở VD2, đạo hàm bậc ba được kiểm soát đúng theo lũy thừa ba phần hai của độ cong. Khoảng trống: Phân biệt chứng minh mọi s với kiểm tra số giúp sinh viên tránh suy rộng từ vài phép thử. | Cần so tốc độ thay đổi độ cong với chính độ cong để có phân tích phù hợp phép đổi tọa độ. → Tính tự điều chỉnh là điều kiện tương đối trên biến thiên độ cong. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Suy luận ký hiệu ở nửa trên; một hàng số kiểm tra ở nửa dưới. | Phân biệt chứng minh mọi s với kiểm tra số giúp sinh viên tránh suy rộng từ vài phép thử. | 0.06/0.02 |
| D03; hình thức; LLO7 | Tính tự điều chỉnh là điều kiện tương đối trên biến thiên độ cong. Khoảng trống: Định nghĩa qua đường cắt dùng đạo hàm một biến quen thuộc, không bắt sinh viên tiếp nhận ngay tensor bậc ba. | Ở VD2, đạo hàm bậc ba được kiểm soát đúng theo lũy thừa ba phần hai của độ cong. → Điều kiện tự điều chỉnh có thể kiểm bằng cấu trúc hàm thay vì thử nhiều điểm. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Định nghĩa 60% trái; hình đường cắt 40% phải; tính chất affine là một dòng dưới. | Định nghĩa qua đường cắt dùng đạo hàm một biến quen thuộc, không bắt sinh viên tiếp nhận ngay tensor bậc ba. | 0.08/0.00 |
| D04; ứng dụng và giới hạn; LLO7 | Điều kiện tự điều chỉnh có thể kiểm bằng cấu trúc hàm thay vì thử nhiều điểm. Khoảng trống: Cặp hàm gần giống nhau giữ cơ chế đạo hàm nhưng tách rõ thuộc tính hàm và tồn tại nghiệm. | Tính tự điều chỉnh là điều kiện tương đối trên biến thiên độ cong. → Một điều kiện đạo hàm không thay thế kiểm tra tồn tại nghiệm. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Bảng chiếm 2/3 phía trên; khung điều kiện dùng Newton ở dưới. | Cặp hàm gần giống nhau giữ cơ chế đạo hàm nhưng tách rõ thuộc tính hàm và tồn tại nghiệm. | 0.07/0.00 |
| D05; bài tập; LLO7 | Một điều kiện đạo hàm không thay thế kiểm tra tồn tại nghiệm. Khoảng trống: Phản ví dụ dùng đúng tri thức vừa học, đo khả năng phân biệt giả thiết với kết luận. | Điều kiện tự điều chỉnh có thể kiểm bằng cấu trúc hàm thay vì thử nhiều điểm. → Hướng tốt cho hàm mục tiêu có thể đưa điểm ra khỏi tập khả thi. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hai cột tương ứng hai hàm; kết luận cần sửa đặt dưới. | Phản ví dụ dùng đúng tri thức vừa học, đo khả năng phân biệt giả thiết với kết luận. | 0.00/0.08 |
| E01; nhu cầu; LLO9 | Hướng tốt cho hàm mục tiêu có thể đưa điểm ra khỏi tập khả thi. Khoảng trống: Một bước quen thuộc tạo xung đột cụ thể trước khi thêm khối ma trận KKT. | Một điều kiện đạo hàm không thay thế kiểm tra tồn tại nghiệm. → Tối ưu phải tìm trên đường khả thi, nơi đường đồng mức tiếp xúc với đường ràng buộc. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hình 65% trái; dữ kiện và kiểm tra tổng 35% phải. | Một bước quen thuộc tạo xung đột cụ thể trước khi thêm khối ma trận KKT. | 0.04/0.00 |
| E02; trực quan + ví dụ; LLO9 | Tối ưu phải tìm trên đường khả thi, nơi đường đồng mức tiếp xúc với đường ràng buộc. Khoảng trống: Phân biệt quan sát hình với chứng minh tối ưu; các tọa độ bất đối xứng tránh nghiệm trung điểm quá dễ đoán. | Hướng tốt cho hàm mục tiêu có thể đưa điểm ra khỏi tập khả thi. → Tham số hóa đường khả thi chuyển VD3 thành bài một biến không ràng buộc. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hình lớn 70%; thẻ dữ kiện 30%; một dòng “ứng viên cần kiểm chứng”. | Phân biệt quan sát hình với chứng minh tối ưu; các tọa độ bất đối xứng tránh nghiệm trung điểm quá dễ đoán. | 0.04/0.03 |
| E03; ví dụ; LLO9,10 | Tham số hóa đường khả thi chuyển VD3 thành bài một biến không ràng buộc. Khoảng trống: Phép thế đã quen ở đại số tạo nền để hiểu không gian rỗng ở trang sau. | Tối ưu phải tìm trên đường khả thi, nơi đường đồng mức tiếp xúc với đường ràng buộc. → Một cơ sở của không gian rỗng biểu diễn mọi biến thiên khả thi. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Bên trái phép thế 40%; bên phải suy luận cực tiểu 60%. | Phép thế đã quen ở đại số tạo nền để hiểu không gian rỗng ở trang sau. | 0.05/0.02 |
| E04; hình thức + ứng dụng; LLO9,10 | Một cơ sở của không gian rỗng biểu diễn mọi biến thiên khả thi. Khoảng trống: Ánh xạ trực tiếp giúp sinh viên đọc kích thước ma trận thay vì ghi nhớ công thức rời rạc. | Tham số hóa đường khả thi chuyển VD3 thành bài một biến không ràng buộc. → Tối ưu mô hình trên đường khả thi cho hướng có tổng bằng0. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hai cột ví dụ / công thức, các hàng căn ngang theo cùng vai trò. | Ánh xạ trực tiếp giúp sinh viên đọc kích thước ma trận thay vì ghi nhớ công thức rời rạc. | 0.05/0.00 |
| E05; ví dụ trước hệ tổng quát; LLO9,10 | Tối ưu mô hình trên đường khả thi cho hướng có tổng bằng0. Khoảng trống: Tìm từng khối phương trình qua dữ kiện cụ thể trước khi ghép thành ma trận lớn. | Một cơ sở của không gian rỗng biểu diễn mọi biến thiên khả thi. → Ràng buộc lên hướng được ghép vào điều kiện cực tiểu của mô hình bậc hai. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Phép kiểm dạng bảng ở trên; một hình đường khả thi dưới. | Tìm từng khối phương trình qua dữ kiện cụ thể trước khi ghép thành ma trận lớn. | 0.05/0.03 |
| E06; hình thức; LLO9,10 | Ràng buộc lên hướng được ghép vào điều kiện cực tiểu của mô hình bậc hai. Khoảng trống: Nhìn rõ ý nghĩa hai hàng trước khi thao tác giúp giảm tải khi gặp ma trận yên ngựa lần đầu. | Tối ưu mô hình trên đường khả thi cho hướng có tổng bằng0. → Giải hệ, dừng theo mô hình và chọn bước trên đường khả thi tạo một vòng lặp hoàn chỉnh. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Ma trận chiếm giữa trang; hai nhãn hai bên; giả thiết trong một dòng trên. | Nhìn rõ ý nghĩa hai hàng trước khi thao tác giúp giảm tải khi gặp ma trận yên ngựa lần đầu. | 0.06/0.00 |
| E07; ứng dụng; LLO9,10 | Giải hệ, dừng theo mô hình và chọn bước trên đường khả thi tạo một vòng lặp hoàn chỉnh. Khoảng trống: Đặt kiểm tra ràng buộc cạnh cập nhật giúp sinh viên nhận ra mọi t đều giữ khả thi trong số học chính xác. | Ràng buộc lên hướng được ghép vào điều kiện cực tiểu của mô hình bậc hai. → Khi chưa thỏa đẳng thức, cần đo đồng thời sai lệch ràng buộc và điều kiện dừng. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Vòng lặp trái 60%; chứng minh giữ ràng buộc phải 40%. | Đặt kiểm tra ràng buộc cạnh cập nhật giúp sinh viên nhận ra mọi t đều giữ khả thi trong số học chính xác. | 0.05/0.00 |
| E08; nhu cầu + trực quan + ví dụ dẫn nhập; LLO9,10 | Khi chưa thỏa đẳng thức, cần đo đồng thời sai lệch ràng buộc và điều kiện dừng. Khoảng trống: Các giá trị 6,44,-5 và nhân tử4 khác nhau; vị trí tách biệt làm rõ số nào đưa vào hàng nào của hệ. | Giải hệ, dừng theo mô hình và chọn bước trên đường khả thi tạo một vòng lặp hoàn chỉnh. → Một bước khử cả ba thành phần phần dư trong bài bậc hai. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hình miền 50% trái; phép tính hai phần dư 50% phải. | Các giá trị 6,44,-5 và nhân tử4 khác nhau; vị trí tách biệt làm rõ số nào đưa vào hàng nào của hệ. | 0.04/0.03 |
| E09; ví dụ; LLO9,10 | Một bước khử cả ba thành phần phần dư trong bài bậc hai. Khoảng trống: Tách ν cũ, Δν và ν mới thành ba ô giúp tránh nhầm nhân tử mô hình η của chế độ khả thi. | Khi chưa thỏa đẳng thức, cần đo đồng thời sai lệch ràng buộc và điều kiện dừng. → Newton không khả thi chọn bước theo độ giảm phần dư. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hệ phương trình 55% trái; phép kiểm 45% phải, cập nhật ở chân trang. | Tách ν cũ, Δν và ν mới thành ba ô giúp tránh nhầm nhân tử mô hình η của chế độ khả thi. | 0.05/0.03 |
| E10; hình thức và thuật toán; LLO9,10 | Newton không khả thi chọn bước theo độ giảm phần dư. Khoảng trống: Sinh viên đã đọc hệ khối khả thi ở E06; giữ vị trí các khối và chỉ làm nổi vế phải mới giúp nhận ra phần thay đổi. Thứ tự xuất hiện hệ rồi thủ tục nối phép tính ở E09 với vòng lặp tổng quát. | Một bước khử cả ba thành phần phần dư trong bài bậc hai. → Mô hình học có ràng buộc tuyến tính dùng trực tiếp hệ Newton đã xây dựng. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Hệ khối đặt nửa trên với hai vế phải được tô nhãn ngay cạnh khối; giả mã bốn bước xếp dọc nửa dưới theo đúng thứ tự giải → thử phần dư → cập nhật, ghi chú hội tụ chuyển hết sang ghi chú soạn. | Sinh viên đã đọc hệ khối khả thi ở E06; giữ vị trí các khối và chỉ làm nổi vế phải mới giúp nhận ra phần thay đổi. Thứ tự xuất hiện hệ rồi thủ tục nối phép tính ở E09 với vòng lặp tổng quát. | 0.07/0.00 |
| E11; ứng dụng vào AI; LLO9,10 | Mô hình học có ràng buộc tuyến tính dùng trực tiếp hệ Newton đã xây dựng. Khoảng trống: Ánh xạ một mô hình học cụ thể sang các khối đã biết đo được khả năng vận dụng, tránh chỉ nêu tên ứng dụng. | Newton không khả thi chọn bước theo độ giảm phần dư. → Tính khả thi quyết định vế phải và tiêu chí chọn bước. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Sơ đồ bốn bước ngang; công thức g,H đặt trong một dải riêng ngay dưới sơ đồ để giữ cỡ chữ. | Ánh xạ một mô hình học cụ thể sang các khối đã biết đo được khả năng vận dụng, tránh chỉ nêu tên ứng dụng. | 0.05/0.03 |
| E12; bài tập; LLO9,10 | Tính khả thi quyết định vế phải và tiêu chí chọn bước. Khoảng trống: Bài chuyển chế độ dùng cùng hàm nên sai khác chỉ đến từ khả thi và phần dư, tránh nhiễu do đổi toàn bộ dữ kiện. | Mô hình học có ràng buộc tuyến tính dùng trực tiếp hệ Newton đã xây dựng. → Chọn phương pháp bằng thông tin đạo hàm, ràng buộc và bảo đảm cần dùng. | tách: tách việc kiểm tra khỏi trang đang giảng nhiều bước | Hai cột cân bằng, dữ kiện cố định trên; đáp án không hiện trước. | Bài chuyển chế độ dùng cùng hàm nên sai khác chỉ đến từ khả thi và phần dư, tránh nhiễu do đổi toàn bộ dữ kiện. | 0.00/0.13 |
| Z01; tổng hợp; LLO6–10 | Chọn phương pháp bằng thông tin đạo hàm, ràng buộc và bảo đảm cần dùng. Khoảng trống: Sinh viên tổng hợp theo tiêu chí ra quyết định thay vì phải nhớ thứ tự tên thuật toán. | Tính khả thi quyết định vế phải và tiêu chí chọn bước. → Một lựa chọn hợp lệ phải kèm điều kiện, hướng, bước và kiểm tra dừng. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Bảng toàn chiều ngang, ba cột thông tin cần / phương pháp / đại lượng kiểm. Gộp gradient và chuẩn W trong một hàng để còn năm hàng; câu kết một dòng phía dưới. | Sinh viên tổng hợp theo tiêu chí ra quyết định thay vì phải nhớ thứ tự tên thuật toán. | 0.06/0.00 |
| Z02; bài tập tổng hợp; LLO6–10 | Một lựa chọn hợp lệ phải kèm điều kiện, hướng, bước và kiểm tra dừng. Khoảng trống: Kiểm tra chuyển giao từ ví dụ số sang mô hình học và quay lại phương pháp tối giản khi dữ kiện thay đổi. | Chọn phương pháp bằng thông tin đạo hàm, ràng buộc và bảo đảm cần dùng. → Người học hoàn tất bài bằng tái tạo phép tính và giải thích giới hạn bảo đảm. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Tình huống chính chiếm 2/3 trang; biến thể một dòng ở dưới. | Kiểm tra chuyển giao từ ví dụ số sang mô hình học và quay lại phương pháp tối giản khi dữ kiện thay đổi. | 0.00/0.10 |
| Z03; kết luận; LLO6–10 | Người học hoàn tất bài bằng tái tạo phép tính và giải thích giới hạn bảo đảm. Khoảng trống: Kết thúc bằng sản phẩm quan sát được và nguồn đọc đúng phạm vi, không thêm khái niệm mới. | Một lựa chọn hợp lệ phải kèm điều kiện, hướng, bước và kiểm tra dừng. → Tái tạo phép tính và tự học theo tài liệu đọc. | sửa: làm rõ bước suy luận và dùng số đã kiểm theo bản mới | Bảng hai cột nhiệm vụ / sản phẩm, ba hàng ngắn; dải tài liệu đọc ở cuối trang. | Kết thúc bằng sản phẩm quan sát được và nguồn đọc đúng phạm vi, không thêm khái niệm mới. | 0.04/0.00 |

### Quyết định so với bản40trang và mẫu nguồn

Giữ7mạch nội dung; bỏ chức năng trang chỉ mở phần và dùng chính trang đầu mỗi mạch đặt vấn đề. Mở đầu theo skill được gọi: tiêu đề → nội dung → động lực; gộp mục tiêu/tiên quyết và thêm kiểm tra riêng. PhầnA chuyển ví dụ trước định nghĩa, cùng g,d đi tới Armijo. PhầnB bỏ yêu cầu tính phân số tìm bước chính xác; dùng quỹ đạo bước cố định có nhãn và so hai chuẩn để bảo toàn cơ chế. PhầnC giữ mô hình, bước, độ giảm, thuật toán, hội tụ; chi phí giải hệ đưa vàoC05 và ghi chú, mở một trang ứng dụng trước trang kiểmC08. PhầnD giữ nhu cầu trước định nghĩa. PhầnE mở7trang thành12trang để tách ví dụ khử, hệ khả thi, thuật toán khả thi, hai phần dư, bước số và thuật toán phần dư; thêm ứng dụngAI có phép thế và kiểm tra chung.

M16 được dùng trước M17. Điều chỉnh có chủ ý trong từng nguồn: dữ kiện dễ tính được đặt trước phát biểu tổng quát; các hình nhiều đường và phân tích độ phức tạp đầy đủ chuyển đọc thêm; không đưa ứng dụng mạng hoặc bất đẳng thức ma trận tuyến tính làm khái niệm mới trong phầnE. Mẫu nguồn vẫn quyết định trục gradient → chuẩn → Newton → tự điều chỉnh → đẳng thức. Bảng đầy đủ trang nguồn và đối chiếu đại học nằm ởsource-map.md.

### Các điểm cần kiểm ở bước triển khai

Ưu tiên xem A06,B02,C05,C07,E06,E10,E12 vì có bảng, hệ khối hoặc nhiều dữ kiện. Nội dung hình, giả thiết, đáp án và lời nói đã tách trong outline; nếu mặt trang vẫn quá tải, dùng xuất hiện từng bước hoặc tách sau khi cập nhật lại bản đồ/thời lượng, không thu nhỏ chữ. Hình được tự dựng từ công thức, không phải ảnh kết quả thực nghiệm. Chỉ sau khi triển khai mới kiểm khả năng đọc, tràn, bàn phím, KaTeX và đồng bộ tài liệu học tập.


### Điều chỉnh cục bộ khi triển khai

Giữ nguyên 46 trang và thứ tự. B04 bổ sung SVG đổi tọa độ đúng vai trò đã chốt. E11 giữ sơ đồ bốn bước nhưng đặt hai công thức dài g,H trong một dải chung bên dưới để đọc được ở cỡ chữ thân bài; dữ kiện ràng buộc được nêu rõ. Z03 trình bày ba nhiệm vụ thành bảng nhiệm vụ/sản phẩm để đối chiếu trực tiếp. C07 giảm khoảng đệm bảng và rút nhãn, không giảm cỡ chữ hoặc thêm hàng. E05 tăng cỡ nhãn trong SVG. Các thay đổi này giữ vai trò và kết nối của từng trang.
