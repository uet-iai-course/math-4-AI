# Storyboard Bài giảng 04 — mạch KKT đã duyệt

**Trạng thái ngày 2026-09-26: đã hoàn tất biên tập và kiểm định.** Đặc tả hiện hành có đúng 46 mục RP/RG/RN/RE/RR/RS/RZ, giữ bảy mạch, thứ tự, bố cục và ví dụ. Hậu kiểm xác nhận 46 tiêu đề khớp HTML, đủ quan hệ đầu vào–đầu ra, 45 cạnh nối và sáu ranh giới phần. Các bằng chứng và giới hạn của bản phát hành nằm trong [review-log.md](review-log.md).

> Trạng thái lịch sử trước biên tập: **Trạng thái ngày 2026-09-25: đặc tả chính đã triển khai và kiểm định.** Phần 46 mã RP/RG/RN/RE/RR/RS/RZ bên dưới khớp HTML hiện hành và tài liệu công khai. Các quyết định biên tập được giữ để truy nguyên bản cũ; phần lịch sử cuối tệp không phải đặc tả hiện hành. Các sửa sau rà soát, bằng chứng kiểm định và giới hạn được ghi trong [review-log.md](review-log.md).

Hai điều chỉnh hiển thị cuối giữ nguyên bố cục và nội dung: bảng RG03 có vùng cuộn ngang bằng bàn phím ở màn hình hẹp; khoảng trắng quanh công thức kết RG10 giảm trên màn hình rộng để công thức nằm gọn trên chân trang. Không giảm cỡ chữ.

## Cấu trúc 7 mạch và thời lượng nội bộ

KKT là điều kiện Karush–Kuhn–Tucker đã học ở Bài 03; LLO là chuẩn đầu ra bài học, CLO là chuẩn đầu ra học phần. Các phần LT/BT là số giờ lý thuyết/bài tập theo cột “Số giờ/buổi” của đề cương DOCX chính thức. Tổng là 2 giờ LT + 1 giờ BT; không quy đổi sang phút. Đây là đính chính đơn vị của bản kế hoạch cũ; các tỷ phần dự toán giữ nguyên, chưa phải kết quả diễn tập. Mỗi mạch có trang kiểm tra riêng. Dự toán dành phần BT của mạch cho trang kiểm tra: 2/5 để suy nghĩ, 3/5 để chữa; các ví dụ làm mẫu nằm trong LT. Phân bổ theo từng trang dưới đây là dự toán ban đầu, cần hiệu chỉnh khi diễn tập.

| Mạch | Trang | Chức năng, đầu vào | Đầu ra cho mạch sau | LT + BT | Kiểm tra |
|---|---|---|---|---|---|
| Mở đầu: dùng lại điều kiện tối ưu | RP00–RP04 (5) | KKT và hồi quy Bài 03 | Hai dạng KKT và nhiệm vụ tạo bước | 0.15 + 0.10 | RP04 |
| Hướng giảm, bước và thước đo | RG01–RG11 (11) | Điều kiện dừng không ràng buộc | Bài con chọn hướng, thuật toán gradient và giới hạn W cố định | 0.50 + 0.15 | RG11 |
| Newton từ mô hình và phương trình tối ưu | RN01–RN07 (7) | Hướng theo W và quy tắc nhận bước | Hướng Newton, phân biệt mô hình và bài gốc; câu hỏi về cận sai số | 0.40 + 0.15 | RN07 |
| Newton giữ đẳng thức | RE01–RE08 (8) | Mô hình Newton có thể phá tính khả thi | KKT bài con, hệ khối và khử biến tương đương | 0.35 + 0.15 | RE08 |
| Newton phục hồi điều kiện KKT | RR01–RR07 (7) | Thuật toán trước cần điểm đầu khả thi | Tuyến tính hóa phần dư, cập nhật hai biến, nhận bước theo phần dư | 0.35 + 0.20 | RR07 |
| Tính tự điều chỉnh và cận sai số (tự học từ 2026-10-01) | RS01–RS05 (5) | Câu hỏi RN07 còn mở sau khi đã có các phương pháp | Cận sai số có giả thiết cho bài không ràng buộc và bài khử | 0.20 + 0.10 | RS05 |
| Tổng hợp và chuyển giao | RZ01–RZ03 (3) | Các hệ cập nhật và tiêu chí đã suy ra | Tự lập hệ cho mô hình học, nhận diện chứng nhận và dung sai | 0.05 + 0.15 | RZ02 |

Đổi riêng điểm đầu khả thi VD3 thành (16,−2), giữ F,A,b và nghiệm. Các hình RE02/RE05 cần cả phần tọa độ âm; không thêm ràng buộc dấu. Cả hệ khối và hệ rút gọn dùng cùng điểm mới.

Số trang: 5 + 11 + 7 + 8 + 7 + 5 + 3 = **46**. Gộp mạch A/B cũ vì cùng xây dựng hướng và bước; tách E cũ vì giữ khả thi và phục hồi KKT có điều kiện đầu vào, ẩn và tiêu chí tiến triển khác nhau. Dời D cũ sau hai loại Newton để không ngắt chuỗi suy ra phương pháp. Kết luận vẫn là ứng dụng kiến thức đã học, không mở mạch mới.

## Bản đồ hành trình khái niệm

| Cụm, chuẩn đo | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Dữ kiện truyền và câu nối |
|---|---|---|---|---|---|---|---|
| Gradient và bước, LLO6/8 | RG01 cần chọn hướng | RG01 đường mức, RG03 tia cập nhật | VD1 tại RG01, RG03 | RG02 bài con; RG03 điều kiện hướng; RG04 Armijo | RG05 một lượt, RG06 vòng lặp | RG11 | Giữ x,g,d; chọn hướng chưa quyết định t. RG01 gộp nhu cầu + ví dụ dẫn nhập + trực quan vì đều giải thích tác dụng của gᵀd; từ 2026-09-30 RG01 cũng nêu định nghĩa đạo hàm hướng theo chu trình rút gọn cho kiến thức tiên quyết (Bài giảng 00, B05). |
| Chuẩn bậc hai, LLO6/8 | RG07 đường đi phụ thuộc cách đo | RG07, elip RG08 | VD1: W, elip và đường tuyến tính RG08 trước Lagrange | RG08–RG09 KKT | RG10 đổi độ dài và giải hệ | RG11 | Giữ g từ VD1, thêm W trước chỗ dùng; nghiệm chuẩn hóa phải được đổi độ dài để cập nhật. |
| Newton, LLO6/8 | RN01 W cố định chưa dùng độ cong hiện tại | RN01 hàm thật và parabol | RN01 dữ kiện φ; RN02 phép tính g,H,d | RN02 KKT bài con, RN03 tuyến tính hóa, RN04 độ giảm | RN05 nhận bước; RN06 thuật toán | RN07 | φ,g,H,d giữ nguyên; ≈ của phương trình thật dẫn đến phân biệt sai số. Ví dụ dẫn nhập RN01 làm cụ thể nhu cầu xấp xỉ, phép tính RN02 đặt cạnh hình thức hóa cùng một thao tác. |
| Newton khả thi, LLO9/10 | RE01 phải giữ tổng; RE02 hướng cũ phá tổng | RE01–RE02 đường khả thi | RE01 mốc nghiệm, RE02 điểm đầu VD3 | RE03 Lagrange, RE04 hệ | RE05 giải bước, RE06 giải bằng khử, RE07 thuật toán | RE08 | Truyền F,u,A,b,g,H; thêm η khi lập bài con. RE01 gộp nhu cầu, hình và KKT bài gốc đã học, không giới thiệu phương pháp trước nhu cầu. |
| Newton phần dư, LLO9/10 | RR01 điểm đầu không thỏa KKT | RR01 hai phương trình và độ lệch đặt cùng hàng | RR01 tính hai phần dư VD3 | RR02 tuyến tính hóa; RR03 hệ | RR04 giải số; RR05 biện minh thước đo; RR06 thuật toán | RR07 | Truyền F,A,b, đổi rõ u,ν; r_d,r_p là vế trái của KKT, không phải ký hiệu tùy ý. RR05 là kết quả hỗ trợ theo chu trình nhu cầu → phản ví dụ → lập luận đạo hàm → dùng ở RR06. |
| Tự điều chỉnh, LLO7 (tự học từ 2026-10-01) | RS01 thu hồi RN07 | RS01 độ cong gần biên, RS02 tỷ số tương đối | RS02 tính φ toàn miền | RS02 định nghĩa, RS03 cận có giả thiết | RS03 cận số, RS04 bài khử đẳng thức | RS05 | Giữ φ,s,δ từ RN; không đổi δ thành δ² trong công thức cận. RS02 hiện ví dụ trước định nghĩa. Theo yêu cầu người dùng ngày 2026-10-01, cả cụm là phần tự học, đánh dấu "Tự học" trên RS01–RS05; tuyến trình chiếu vẫn liên tục và phần tổng hợp chỉ dùng cận ở RS03 cùng giả thiết của nó. |

Mở đầu và kết luận dùng chu trình rút gọn nhắc điều kiện/nhu cầu → tổ chức → kiểm tra vì không giới thiệu khái niệm toán mới; kiểm ở RP04 và RZ02. Khử biến ở RE06 là cách giải cùng hệ đã học: nhu cầu giảm chiều → khử nhân tử → kiểm cùng hướng → RE08; không cần dựng một chu trình sáu trang riêng. Cận hội tụ trong ghi chú là kết quả hỗ trợ đánh giá, không phải một thuật toán mới; phát biểu đầy đủ giả thiết ở dàn ý §5.7, kiểm không suy quá mức qua RN07/RZ02.

Cụm gradient và chọn bước gồm RG01–RG06: 0.30 giờ LT + 0.075 giờ BT cho nhiệm vụ Armijo ở RG11. Cụm chuẩn bậc hai gồm RG07–RG10: 0.20 giờ LT + 0.075 giờ BT cho nhiệm vụ hướng theo chuẩn ở RG11. Hai nhiệm vụ của RG11 chia đều 0.15 giờ BT; tổng mạch RG vẫn là 0.50 giờ LT + 0.15 giờ BT, không cộng hai lần trang kiểm tra. Cụm khả thi gồm khử biến dùng chung thời lượng RE; các cụm còn lại bằng thời lượng mạch tương ứng. Câu nối và đầu ra từng trang được ghi dưới đây.

## Quy tắc đọc đặc tả từng trang

- Mã trang trong mọi mô tả, kể cả trường “Nội dung”, chỉ dùng để truy nguyên khi biên tập; không in mã trên mặt trang hoặc đưa vào ghi chú diễn giả.
- **Nội dung** là luận điểm và biểu thức dự kiến cần nhìn thấy; dàn ý §5 là bản toán đầy đủ để triển khai, không được bỏ giả thiết quyết định tính đúng.
- **Lý do** chỉ khoảng trống nhận thức và thao tác sinh viên cần làm; **bố cục** chỉ vùng đặt nội dung, hướng đọc và thứ tự hiện. Tất cả kế thừa màu, thẻ, khoảng cách của mẫu hiện tại; quyết định sửa bố cục nhằm hỗ trợ phép suy luận, không tạo hệ giao diện mới.
- Giữ thân bài từ 0.75em; mỗi trang suy diễn tối đa 3 dòng chính ngoài dữ kiện/giả thiết, đại số dài vào ghi chú. Công thức và bảng vẫn là chữ/KaTeX; hình kỹ thuật dự kiến SVG có alt, trục, nhãn và nguồn. Các hình VD1–VD3 tự dựng từ công thức, không dùng raster hay dữ liệu thực nghiệm.
- Ghi chú diễn giả phải nêu giả thiết, giải thích phép tính, phân biệt các đại lượng và kết nối bằng quan hệ toán học; không chép mã trang/thời lượng nội bộ vào ghi chú. Đáp án các trang kiểm tra ở dàn ý §7.

## Đặc tả hiện hành của 46 trang

### RP00 — Tối ưu không ràng buộc và ràng buộc đẳng thức

- **Quyết định:** sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: giữ; đối chiếu P00. Đặt đích học tập trước các tên phương pháp.
- **Nội dung trên trang:** Giữ tên bài và đơn vị; dòng phụ nêu ba cơ sở của bước lặp: điều kiện KKT, mô hình cục bộ và quy tắc chọn bước.
- **Bố cục chọn:** Một cột; tên học phần trên, tên bài giữa, nhiệm vụ dưới; không công thức.
- **Lý do bố cục cho sinh viên năm 3:** Đặt đích học tập trước các tên phương pháp.
- **Vào → ra:** Đầu vào: KKT đủ để chứng nhận nghiệm của bài toán lồi; chiều cần sử dụng điều kiện chính quy thích hợp. Đầu ra: Mô hình cục bộ và quy tắc chọn bước xác định phép cập nhật hướng tới các điều kiện đó.
- **Chuẩn và minh chứng:** LLO6, LLO9 / CLO1; chuẩn bị thao tác được đo tại RP04.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** Bài 03 S02-04, S05-03, S05-05b, S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 3/80 LT + 0 BT (LT xấp xỉ 0.0375; dùng phân số để cộng chính xác).

### RP01 — Điều kiện tối ưu và bước lặp

- **Quyết định:** sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: gộp và sửa; đối chiếu P01, P03. Sinh viên nhận ra kết quả cũ sẽ được dùng, thay vì học thêm một danh sách thuật toán.
- **Nội dung trên trang:** Nhắc kết quả bài 03 S05-03/S05-05b: KKT chứng nhận một ứng viên trong bài toán lồi. Hệ hồi quy ở S05-06a là ví dụ đã giải; bài 04 tổ chức cách tạo ứng viên khi phải giải hệ lớn hoặc phi tuyến.
- **Bố cục chọn:** Hai cột 45/55: trái kết quả đã biết và ví dụ hồi quy; phải ba thao tác lập mô hình → giải bước → kiểm điểm mới. Hiện trái trước, phải sau.
- **Lý do bố cục cho sinh viên năm 3:** Sinh viên nhận ra kết quả cũ sẽ được dùng, thay vì học thêm một danh sách thuật toán.
- **Vào → ra:** Đầu vào: Trong bài hồi quy giới hạn chuẩn, điều kiện dừng cho hệ $(X^TX+2\lambda I)w=X^Ty$. Đầu ra: Với bài không ràng buộc hoặc chỉ có đẳng thức, các nhóm KKT rút gọn thành những phương trình tương ứng.
- **Chuẩn và minh chứng:** LLO6, LLO9 / CLO1; chuẩn bị thao tác được đo tại RP04.
- **Số liệu:** Ví dụ Bài 03 hoặc VD3 có nhãn nguồn/đổi bối cảnh; dàn ý §4 và §7. Không thay dữ kiện Bài 03.
- **Nguồn, ghi chú soạn:** Bài 03 S02-04, S05-03, S05-05b, S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 3/80 LT + 0 BT (LT xấp xỉ 0.0375; dùng phân số để cộng chính xác).

### RP02 — Điều kiện KKT cho hai lớp bài toán

- **Quyết định:** `sửa` ngày 2026-09-30 theo yêu cầu người dùng: phát biểu hai bài toán trước khi nêu điều kiện dừng. Khoảng trống được xử lý: bản trước nêu hệ KKT khi người học chưa thấy bài toán tối ưu mà hệ đó mô tả, nên biến $x,u$, ma trận $A$ và ràng buộc $Au=b$ xuất hiện trước đối tượng chứa chúng. Các lần sửa trước: sửa văn phong và liên kết toán học ngày 2026-09-26; quyết định cấu trúc đã triển khai: tách và sửa; đối chiếu P03. Thực hiện phép chuyên biệt hóa ngay trên trang; tránh học thuộc ma trận khối mà chưa biết nguồn gốc.
- **Nội dung trên trang:** Dòng giả thiết "Giả thiết cho hai bài toán dưới đây": $f,F$ lồi, khả vi trên miền mở lồi trong $\mathbb R^n$; $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$. Cột một: bài toán $\min_x f(x)$, điều kiện dừng $\nabla f(x^*)=0$. Cột hai: bài toán $\min_u F(u)$ với ràng buộc $Au=b$, điều kiện dừng và khả thi gốc $\nabla F(u^*)+A^T\nu^*=0,\ Au^*=b$ với $\nu\in\mathbb R^p$ tự do dấu. Dòng rút gọn: không có bất đẳng thức nên không có nhân tử $\lambda$; trong bốn nhóm KKT của Bài 03 chỉ còn khả thi gốc và dừng. Ghi chú nêu $p$ là số ràng buộc đẳng thức (số hàng của $A$, số thành phần của $b,\nu$) và tính cần và đủ của KKT cho hai bài toán lồi có ràng buộc affine trên miền mở.
- **Bố cục chọn:** Dòng giả thiết gộp miền, tính lồi, khả vi và kích thước $A,b$. Hai cột song song, mỗi cột theo thứ tự tên lớp → `Bài toán:` → nhãn điều kiện → hệ điều kiện. Dòng dưới hai cột nêu phép rút gọn từ bốn nhóm KKT của Bài 03. Bỏ chân trang $g=\nabla f(x)$ ngày 2026-09-30: RP02 không dùng $g$; quy ước chuyển tới RG01, nơi $g=\nabla f(x^0)$ được dùng lần đầu.
- **Lý do bố cục cho sinh viên năm 3:** Thực hiện phép chuyên biệt hóa ngay trên trang; tránh học thuộc ma trận khối mà chưa biết nguồn gốc.
- **Vào → ra:** Đầu vào: KKT đủ cho bài lồi (RP01); thu hẹp về lớp không có bất đẳng thức. Đầu ra: Hệ điều kiện xác định nghiệm cần đạt; các phương pháp sau thay bài gốc bằng mô hình theo bước $d$ và giải KKT của mô hình để lấy hướng.
- **Chuẩn và minh chứng:** LLO6, LLO9 / CLO1; chuẩn bị thao tác được đo tại RP04.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** Bài 03 S02-04, S05-03, S05-05b, S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 3/80 LT + 0 BT (LT xấp xỉ 0.0375; dùng phân số để cộng chính xác).

### RP03 — Mục tiêu học tập

- **Quyết định:** `sửa` ngày 2026-09-30 theo rà soát cuối: đổi tiêu đề thành "Mục tiêu học tập" (tiêu đề cũ 946 px đè nút điều hướng). Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: gộp và sửa; đối chiếu P01, P03. Bản đồ thể hiện quan hệ phụ thuộc; ngăn hiểu nhầm rằng KKT tự cho một thuật toán duy nhất.
- **Nội dung trên trang:** Mục tiêu diễn đạt bằng động từ theo MT1–MT5; mã MT chỉ ở kế hoạch và tuyến: KKT → mô hình chọn hướng → Newton → giữ/phục hồi đẳng thức → bảo đảm sai số. KKT xác định đích; lựa chọn mô hình và quy tắc bước là thiết kế thêm.
- **Bố cục chọn:** Một sơ đồ ngang ở nửa trên; dưới là ba đầu ra đánh giá: tự suy ra hệ, thực hiện một bước, kiểm đúng tiêu chí. Thời lượng và mã chỉ nằm trong kế hoạch.
- **Lý do bố cục cho sinh viên năm 3:** Bản đồ thể hiện quan hệ phụ thuộc; ngăn hiểu nhầm rằng KKT tự cho một thuật toán duy nhất.
- **Vào → ra:** Đầu vào: Cấu trúc mỗi phương pháp gồm mô hình chọn hướng, quy tắc nhận bước và tiêu chuẩn dừng. Đầu ra: Việc lập mô hình có đẳng thức sử dụng trực tiếp hàm Lagrange và điều kiện $Ad=0$.
- **Chuẩn và minh chứng:** LLO6, LLO9 / CLO1; chuẩn bị thao tác được đo tại RP04.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** Bài 03 S02-04, S05-03, S05-05b, S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 3/80 LT + 0 BT (LT xấp xỉ 0.0375; dùng phân số để cộng chính xác).

### RP04 — KKT với ràng buộc đẳng thức

- **Quyết định:** `sửa` ngày 2026-09-30 theo rà soát cuối: đổi tiêu đề thành "KKT với ràng buộc đẳng thức" (tiêu đề cũ 986 px đè nút điều hướng; nguồn ghi "Bài giảng 03"; ghi chú "Số hạng $A^T\nu$"). Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: sửa; đối chiếu P04. Kiểm trực tiếp kết quả bài 03 trước khi dùng vào bài con, đồng thời giữ kiểm tra đại số cần thiết.
- **Nội dung trên trang:** Câu hỏi: với bài lồi chỉ có $Au=b$, viết Lagrange và hai phương trình KKT; có cần $\nu\ge0$ không? Với $A=[1\;1]$, $d=(d_1,d_2)^T$, tính $Ad$ và tìm điều kiện trên $d$ để giữ tính khả thi. Chưa cho hướng số sẽ suy ra ở phần Newton khả thi.
- **Bố cục chọn:** Hai ô: trái điền công thức KKT, phải phép nhân ngắn; chừa vùng dưới để tính. Đáp án trong ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Kiểm trực tiếp kết quả bài 03 trước khi dùng vào bài con, đồng thời giữ kiểm tra đại số cần thiết.
- **Vào → ra:** Đầu vào: Với $Au=b$, tính khả thi của điểm cập nhật phụ thuộc vào $Ad$. Đầu ra: Khi chưa có ràng buộc, việc chọn $d$ dựa trên đạo hàm hướng $g^Td$.
- **Chuẩn và minh chứng:** LLO6, LLO9 / CLO1; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** Dùng $A=[1\;1]$ và hướng tổng quát $d=(d_1,d_2)^T$; điều kiện cần tìm là $d_1+d_2=0$. Không thêm bộ số hoặc làm lộ hướng Newton sẽ tính ở RE05.
- **Nguồn, ghi chú soạn:** Bài 03 S02-04, S05-03, S05-05b, S05-06a/b; đề cương buổi 4. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 1/10 BT; suy nghĩ 1/25 BT, chữa 3/50 BT.

### RG01 — Đạo hàm hướng

- **Quyết định:** `sửa` ngày 2026-09-30 theo yêu cầu người dùng: người dùng hỏi trang muốn nói gì; luận điểm trung tâm (dấu của $g^Td$ quyết định $f$ giảm hay tăng khi bước dương đủ nhỏ) không hiển thị trên mặt trang, chỉ nằm trong ghi chú, còn bảng dữ kiện chiếm nửa trang mà không có phép tính $g^Td$ nào. Đổi tiêu đề thành tên khái niệm, thay bảng bằng định nghĩa, ba trường hợp dấu và một ví dụ tính. Trước đó cùng ngày: nhận quy ước $g$ chuyển từ RP02. Ngày 2026-09-26: sửa văn phong và liên kết toán học; quyết định cấu trúc gốc: gộp và sửa, đối chiếu A01, A02, P02.
- **Nội dung trên trang:** Trái: hình ba hướng và dòng **Ví dụ** VD1: $f=\tfrac12(3x_1^2+7x_2^2)$, $x^0=(2,4)^T$, $g=(6,28)^T$; $d=(-1,0)^T$ cho $g^Td=-6<0$. Phải: khung gồm **Định nghĩa** (với hướng $d\in\mathbb R^n$, $f'(x^0;d)\triangleq\lim_{t\downarrow0}[f(x^0+td)-f(x^0)]/t$) và **Tính chất** (khi $f$ khả vi tại $x^0$, $f'(x^0;d)=g^Td$ với $g=\nabla f(x^0)$, không phải $g(\lambda,\nu)$ của Bài giảng 03); dưới khung ba trường hợp dấu: $g^Td<0$ cho $f(x^0+td)<f(x^0)$ khi $t>0$ đủ nhỏ và $d$ gọi là hướng giảm tại $x^0$; $g^Td>0$ cho $f(x^0+td)>f(x^0)$; $g^Td=0$ thông tin bậc một chưa đủ kết luận. Không có khung kết luận: tên "hướng giảm" nằm trong trường hợp thứ nhất. Hình ba hướng giữ nguyên; tỷ lệ hai trục khác nhau, không dùng góc hiển thị làm chứng cứ trực giao, không đồng nhất mũi tên giảm với $-g$. $f(x^0)=62$ rời khỏi RG01; RG05 đã tự nêu "Cho $f(x^0)=62$" ở chỗ Armijo cần.
- **Bố cục chọn:** `lec-grid--45-55`: trái 45% hình và dòng ví dụ; phải 55% khung định nghĩa–tính chất và danh sách ba trường hợp dấu. Khung kết luận dưới hình bị bỏ để trang vừa khung sau khi tách định nghĩa và tính chất (vòng rà 2026-09-30); dòng ví dụ chuyển vào chỗ đó. Chuyển từ `ratio55` vì công thức định nghĩa tràn ngang ở cột 45%. Các cụm ví dụ và $f'(x^0;d)=g^Td$, $g=\nabla f(x^0)$ đặt trong `math-nowrap`. Đo ở 1600×900: nội dung 674/674, đáy nội dung 812 px so với đáy trang 829 px, không tràn ngang. Ở 390×844, dòng tính chất hiển thị đủ, không cuộn ngang; riêng công thức định nghĩa (376 px trong khung 308 px) cuộn ngang trong `.formula` có `tabindex="0"`.
- **Lý do bố cục cho sinh viên năm 3:** Luận điểm và công cụ kiểm tra dấu đứng trên mặt trang; hình và ví dụ đi trước định nghĩa theo thứ tự đọc, định nghĩa tách khỏi tính chất khả vi.
- **Vào → ra:** Đầu vào: điều kiện dừng $\nabla f(x^*)=0$ của lớp không ràng buộc (RP02, gọi lại ở RP04); khi $\nabla f(x^0)\ne0$, $x^0$ chưa thỏa điều kiện dừng nên bước lặp cần một hướng làm $f$ giảm (câu mở ghi chú); đạo hàm theo hướng với vectơ đơn vị đã ôn ở Bài giảng 00, B05. Đầu ra: công cụ kiểm tra một hướng cho trước bằng dấu $g^Td$; tối thiểu hóa riêng $g^Td$ theo $d$ không có nghiệm hữu hạn khi $g\ne0$ (ghi chú), nên RG02 thêm số hạng bậc hai để có bài toán chọn hướng.
- **Hành trình khái niệm:** đạo hàm hướng là kiến thức tiên quyết (đạo hàm theo hướng ở Bài giảng 00, B05), nên dùng chu trình rút gọn trên một trang theo thứ tự đọc: nhu cầu (ghi chú: $\nabla f(x^0)\ne0$ nên cần hướng làm $f$ giảm) → trực quan (hình) → ví dụ (cột trái) → hình thức (định nghĩa, tính chất) → kiểm tra dấu (ba trường hợp).
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1, dàn ý §6: giữ $x,g$; ghi riêng $W$ khi dùng; phân biệt $v,d,t$ và các cấu hình bước. Ghi chú kiểm thêm $d=(1,0)^T$ cho $+6$ và $d=(-28,6)^T$ cho $0$.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16; Bài giảng 00, B05. Đại số của khai triển bậc một và lý do dấu chiếm ưu thế nằm trong ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG02 — Hướng gradient

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang của người dùng: đổi tiêu đề từ "Hướng gradient từ mô hình bậc hai" thành "Hướng gradient" (gọi tên khái niệm, không kể tiến trình); nêu $x$ là điểm hiện tại cố định (bước đầu $x=x^0$), đóng phát hiện S9 của lượt rà RG01; gọi tên vai trò của số hạng $\tfrac12\|d\|_2^2$ là phạt độ dài bước để mô hình bậc hai không xuất hiện đột ngột. Trước đó: sửa văn phong ngày 2026-09-26; quyết định cấu trúc đã triển khai: thêm.
- **Nội dung trên trang:** Xấp xỉ tuyến tính tại $x$ không có cực tiểu hữu hạn khi $g\ne0$. Thêm số hạng phạt độ dài bước: $Q_I(d)=f(x)+g^Td+\tfrac12\|d\|_2^2$; KKT không ràng buộc theo $d$ cho $g+d=0$, nên $d_G=-g$. Khung bên: bài con có $x$ là điểm hiện tại cố định, biến $d\in\mathbb R^n$; $\nabla^2Q_I=I\succ0$ nên lồi chặt, nghiệm duy nhất.
- **Bố cục chọn:** Một cột ba dòng biến đổi, mỗi lần hiện một dòng; bên phải 25% ghi vai trò của $x$ và $d$ cùng lý do nghiệm duy nhất. Đo ở 1600×900: đáy nội dung 739 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Bước toán mới được suy ra từ điều kiện dừng đã học; phân biệt bài gốc theo $x$ và bài con theo $d$.
- **Vào → ra:** Đầu vào: từ RG01, cực tiểu riêng $g^Td$ không bị chặn dưới khi $g\ne0$; xấp xỉ tuyến tính chỉ đáng tin khi $d$ nhỏ. Đầu ra: $d_G=-g$ thỏa $g^Td_G=-\|g\|_2^2<0$ khi $g\ne0$, là hướng giảm; độ dài bước còn phải chọn (RG03).
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1: $d_G=(-6,-28)^T$ (trong ghi chú).
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; Bài 03 S05-03, S05-05b/c; MIT lec16.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG03 — Độ dài bước

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Hướng giảm và độ dài bước" thành "Độ dài bước" vì luận điểm mới của trang là nhu cầu chọn $t$; bỏ bảng xét dấu hai hướng (lặp phép xét dấu của RG01, hướng thử $\tilde d=(-2,1)^T$ không dùng về sau); đưa bằng chứng "bước xa làm $f$ tăng" lên mặt trang bằng hàm một biến trên tia. Trước đó: sửa văn phong ngày 2026-09-26; quyết định cấu trúc đã triển khai: gộp và sửa. Sửa theo rà soát phần G ngày 2026-09-30 (G-S5, G-S6): dòng cập nhật chuyển thành đoạn văn; hình `descent-ray.svg` sửa vạch trục tung thành $-12,-8,-4,0,4$ và dời ba nhãn khỏi tia, dữ liệu không đổi.
- **Nội dung trên trang:** Cập nhật $x^+=x+td$ với hướng giảm $d$ và độ dài bước $t>0$. VD1 với $d_G=(-6,-28)^T$, $g^Td_G=-820<0$: $f(x^0+td_G)=62-820t+2798t^2$, nhỏ hơn $62$ khi và chỉ khi $0<t<410/1399\approx0{,}29$. Kết luận: hướng giảm chỉ bảo đảm $f$ giảm khi $t$ đủ nhỏ; độ dài bước cần một quy tắc chọn.
- **Bố cục chọn:** Trái: công thức cập nhật, hàm trên tia, khoảng giảm, khung kết luận; phải: hình tia $x^0+td_G$ với $t=1/4$ ($f=255/8<62$) và $t=1/2$ ($f=703/2>62$). Đo ở 1600×900: đáy nội dung 666 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Luận điểm "bước xa có thể làm tăng" được kiểm bằng một đa thức bậc hai theo $t$, không chỉ khẳng định bằng lời.
- **Vào → ra:** Đầu vào: RG02 cho $d_G=-g$ với $g^Td_G=-\|g\|_2^2<0$; RG01 cho tiêu chuẩn dấu. Đầu ra: khoảng bước làm giảm $f$ bị giới hạn bởi độ cong và nói chung không tính được dạng đóng, nên cần phép kiểm chỉ dùng $f$ tại điểm thử và $g^Td$ (Armijo, RG04).
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RG11.
- **Số liệu:** VD1: $\varphi(t)=62-820t+2798t^2$, $2798=\tfrac12d_G^T\operatorname{diag}(3,7)d_G$; $\varphi(1/4)=255/8$, $\varphi(1/2)=703/2$, $\varphi(410/1399)=62$ (tính lại bằng phân số).
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4.1; MIT lec16.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG04 — Quay lui Armijo

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: giữ tiêu đề (tên thuật toán); đặt điều kiện giảm đủ lên trước thủ tục vì các bước cũ nhắc "ngưỡng bên dưới" trước khi điều kiện xuất hiện; thêm câu diễn giải "giảm đủ" để điều kiện không xuất hiện đột ngột; gộp thủ tục còn ba bước; sửa ghi chú nhắc tới tiếp tuyến không có trên hình. Trước đó: sửa văn phong ngày 2026-09-26. Sửa theo rà soát phần G (G-S7): thêm khoảng trắng trong `<desc>` của `armijo-window.svg`.
- **Nội dung trên trang:** Điều kiện giảm đủ (Armijo) với $0<\alpha<1/2$: $f(x+td)\le f(x)+\alpha t\,g^Td$; mức giảm thật đạt ít nhất phần $\alpha$ của mức giảm dự báo tuyến tính $-t\,g^Td$. Thủ tục: với hướng giảm $d$, đặt $t=1$; nếu $x+td$ thuộc miền và thỏa điều kiện thì nhận $t$; nếu không, $t\leftarrow\beta t$ ($0<\beta<1$) và kiểm lại.
- **Bố cục chọn:** Trái 60%: điều kiện, diễn giải, khung thủ tục; phải: hình VD1 với $\alpha=1/10$. Đo ở 1600×900: đáy nội dung 757 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Điều kiện được đọc trước, thủ tục dùng điều kiện đó; hình kiểm vùng nhận bước bằng số của VD1.
- **Vào → ra:** Đầu vào: RG03 cho thấy khoảng bước làm giảm $f$ bị giới hạn và nói chung không tính được dạng đóng. Đầu ra: thủ tục dừng sau hữu hạn lần co (vì $\alpha<1$); RG05 chạy thủ tục trên VD1 với $\beta=1/2$.
- **Chuẩn và minh chứng:** LLO8 / CLO2; đo tại RG05, RG11.
- **Số liệu:** VD1, $d=d_G$, $\alpha=1/10$: ngưỡng $62-82t$; vùng nhận $0<t\le369/1399\approx0{,}26$ (tính lại bằng phân số). Với hàm bậc hai lồi chặt và hướng Newton, $t=1$ được nhận khi và chỉ khi $\alpha\le1/2$ (ghi chú).
- **Nguồn, ghi chú soạn:** BV §9.2; MIT lec16.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG05 — Ví dụ quay lui Armijo

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: giữ tiêu đề; dòng dữ kiện nêu đủ $x^0$ và hướng $d=d_G$; cột ngưỡng viết cụ thể $62-82t$; thêm dòng kết quả $x^1$, $f(x^1)$ là đầu ra của bước lặp. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** VD1: $x^0=(2,4)^T$, $d=d_G=(-6,-28)^T$, $f(x^0)=62$, $g^Td=-820$, $\alpha=1/10$, $\beta=1/2$. Bảng ba lần thử $t=1,1/2,1/4$ với điểm thử $x^0+td$, giá trị $f$, ngưỡng $62-82t$: $2040>-20$ loại; $703/2>21$ loại; $255/8\le83/2$ nhận. Dòng kết quả: $x^1=(1/2,-3)^T$, $f(x^1)=255/8$; lượt sau tính lại gradient tại $x^1$.
- **Bố cục chọn:** Dòng dữ kiện, bảng hiện từng hàng, dòng kết quả hiện sau cùng. Đo ở 1600×900: đáy nội dung 583 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Mỗi lần thử so hai số cụ thể; ngưỡng không cần tự thay tham số.
- **Vào → ra:** Đầu vào: thủ tục và điều kiện Armijo (RG04); vùng nhận $0<t\le369/1399$. Đầu ra: bước $t=1/4$, điểm $x^1$ và $g(x^1)=(3/2,-21)^T$ cho lượt sau; các thành phần được ghép thành thuật toán ở RG06.
- **Chuẩn và minh chứng:** LLO8 / CLO2; đo tại RG11.
- **Số liệu:** Tính lại bằng phân số: $f(-4,-24)=2040$, $f(-1,-10)=703/2$, $f(1/2,-3)=255/8$; ngưỡng $-20,21,83/2$.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.3; MIT lec16.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG06 — Thuật toán giảm gradient

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: giữ tiêu đề; thêm đầu ra; thay khung kết luận về bước $1/L$ (đưa hằng số Lipschitz $L$ lên mặt trang đột ngột, chưa định nghĩa trên mặt trang nào) bằng câu nối tiêu chí dừng với điều kiện KKT $\nabla f(x^*)=0$ của sườn chung; chuyển định nghĩa $L$ và các cận hội tụ bước cố định vào ghi chú. Trước đó: sửa văn phong ngày 2026-09-26. Sửa theo rà soát phần G (G-M1–G-M3): đầu vào ghi $x^0\in\operatorname{dom}f$ (miền mở); ghi chú sửa phạm vi cận hội tụ (bước cố định $1/L$; BV §9.3.1 cho cận tuyến tính với quay lui khi lồi mạnh) và nêu "Hessian chéo như VD1".
- **Nội dung trên trang:** Năm bước: tính $g=\nabla f(x)$; dừng nếu $\|g\|_2\le\varepsilon_g$; $d=-g$; chọn $t$ bằng quay lui Armijo; cập nhật $x\leftarrow x+td$. Khung phải: đầu vào ($x^0$ trong miền mở, $\varepsilon_g>0$, $\alpha,\beta$), đầu ra (điểm $x$ với $\|\nabla f(x)\|_2\le\varepsilon_g$), chi phí mỗi lượt. Kết luận: tiêu chí dừng là dạng xấp xỉ của KKT $\nabla f(x^*)=0$; với $f$ lồi, điểm thỏa đúng điều kiện là nghiệm tối ưu toàn cục.
- **Bố cục chọn:** Trái 65% khung thủ tục; phải khung đầu vào–đầu ra–chi phí; khung kết luận dưới. Đo ở 1600×900: đáy nội dung 755 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Thủ tục đầy đủ đặt cạnh đầu vào–đầu ra; tiêu chí dừng được nối với điều kiện tối ưu đã học thay vì một khái niệm mới.
- **Vào → ra:** Đầu vào: hướng $d_G=-g$ (RG02), quay lui Armijo (RG04–RG05). Đầu ra: thuật toán hoàn chỉnh; ghi chú nêu kết quả hội tụ thuộc cấu hình bước cố định, và giữ $t$ cố định tách hệ số cập nhật theo tọa độ, làm cơ sở cho RG07.
- **Chuẩn và minh chứng:** LLO8 / CLO2; đo tại RG11.
- **Số liệu:** VD1: $L=7$ (ghi chú); lượt đầu cho $x^1=(1/2,-3)^T$.
- **Nguồn, ghi chú soạn:** BV §§9.2–9.3; MIT lec16; KKT trong Bài giảng 03.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG07 — Độ cong không đồng đều

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Ảnh hưởng của thước đo" thành "Độ cong không đồng đều" vì trang chưa bàn tới thước đo mà cho thấy hệ số co khác nhau do độ cong; nêu lý do chọn $t=1/4$ (bước Armijo đã nhận ở lượt đầu); viết hệ số co dạng $1-3t$, $1-7t$; bỏ câu "cấu hình bước cố định tách ảnh hưởng của độ cong khỏi quy tắc quay lui"; khung kết luận nối nguyên nhân với số hạng phạt $\tfrac12\|d\|_2^2$ của RG02 thay cho câu "chuẩn bậc hai phản ánh độ cong" xuất hiện đột ngột. Trước đó: sửa văn phong ngày 2026-09-26. Sửa theo rà soát phần G (G-S1): khung kết luận thêm "cần đo độ dài bằng chuẩn có trọng số".
- **Nội dung trên trang:** Hình đường đi với bước cố định $t=1/4$ trên VD1. Khung: giữ bước $t=1/4$ đã nhận ở lượt đầu; $d_G=-(3x_1,7x_2)^T$; $x_1^+=(1-3t)x_1=\tfrac14x_1$, $x_2^+=(1-7t)x_2=-\tfrac34x_2$. Kết luận: cùng một bước $t$, hai tọa độ co theo $1-3t$ và $1-7t$; số hạng phạt $\tfrac12\|d\|_2^2$ đo mọi phương như nhau nên hướng $-g$ không tính đến độ cong khác nhau.
- **Bố cục chọn:** Trái 65% hình; phải khung cập nhật; khung kết luận dưới. Đo ở 1600×900: đáy nội dung 761 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Hai hệ số co được đọc trực tiếp từ đường đi trên hình; nguyên nhân được quy về đúng thành phần của bài con đã học.
- **Vào → ra:** Đầu vào: thuật toán giảm gradient (RG06), bước $t=1/4$ (RG05), bài con $Q_I$ (RG02). Đầu ra: nhu cầu thay chuẩn Euclid trong bài con chọn hướng bằng chuẩn có trọng số theo độ cong (RG08).
- **Chuẩn và minh chứng:** LLO6 / CLO1.
- **Số liệu:** VD1: $x_2$: $4\to-3\to9/4\to\cdots$; bước cố định tối ưu $t=1/5$ cho hệ số $2/5=(\kappa-1)/(\kappa+1)$, $\kappa=7/3$ (ghi chú, tính lại).
- **Nguồn, ghi chú soạn:** BV §§9.3–9.4.1; MIT lec16.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG08 — Bài toán hướng giảm dốc nhất

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Hướng giảm dốc nhất có chuẩn đơn vị" thành "Bài toán hướng giảm dốc nhất" (ngắn hơn, không trùng RG10, nêu đúng việc trang làm là lập bài toán); thêm câu định nghĩa "dốc nhất" để ràng buộc độ dài không xuất hiện đột ngột; sắp lại thứ tự: chuẩn → định nghĩa → bài toán → hàm Lagrange ở cột phải, ví dụ VD1 dưới hình ở cột trái; bỏ dòng giả thiết đứng rời. Trước đó: sửa văn phong ngày 2026-09-26. Sửa theo rà soát phần G (G-S1, G-S3, G-M5): mặt trang ghi "Chuẩn có trọng số", câu VD1 ghi "$W=\operatorname{diag}(3,7)$ theo độ cong" (rút gọn để vừa khung, đáy 790/829 px); ghi chú định nghĩa "hướng giảm dốc nhất (gọi tắt: hướng dốc nhất)" và lý do dùng dạng ràng buộc chuẩn hóa.
- **Nội dung trên trang:** Chuẩn theo độ cong $\|v\|_W=\sqrt{v^TWv}$, $W\succ0$. Hướng giảm dốc nhất chuẩn hóa ($g\ne0$): $g^Tv$ nhỏ nhất trên các hướng có độ dài không quá 1; $\min_v g^Tv$ với $v^TWv\le1$. Hàm Lagrange với $\zeta\ge0$: $L_s(v,\zeta)=g^Tv+\zeta(v^TWv-1)$. VD1, $W=\operatorname{diag}(3,7)$: nghiệm là điểm tiếp xúc của elip $3v_1^2+7v_2^2=1$ với đường mức $6v_1+28v_2=c$ thấp nhất.
- **Bố cục chọn:** Trái 45%: hình elip–đường mức và câu VD1; phải: chuẩn, định nghĩa, bài toán, hàm Lagrange. Đo ở 1600×900: đáy nội dung 793 px, đáy trang 829 px (bản nháp đặt VD1 trong khung ở cột phải bị tràn 44 px nên chuyển sang cột trái).
- **Lý do bố cục cho sinh viên năm 3:** Bài toán được phát biểu sau khi đã có chuẩn và nghĩa của "dốc nhất"; hình và ví dụ đứng cạnh nhau.
- **Vào → ra:** Đầu vào: RG07 cho thấy chuẩn Euclid trong bài con đo mọi phương như nhau. Đầu ra: bài con lồi có ràng buộc bất đẳng thức, hàm Lagrange $L_s$ để lập KKT ở RG09; ghi chú nêu $W=I$ cho lại $v=-g/\|g\|_2$.
- **Chuẩn và minh chứng:** LLO6 / CLO1; đo tại RG11.
- **Số liệu:** VD1: $g=(6,28)^T$, $W=\operatorname{diag}(3,7)$.
- **Nguồn, ghi chú soạn:** BV §9.4; MIT lec16.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG09 — Hệ KKT của hướng dốc nhất

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Điều kiện KKT của hướng chuẩn hóa" thành "Hệ KKT của hướng dốc nhất" (ngắn hơn, không chạm nút điều hướng, dùng cùng thuật ngữ với RG08); đặt khung bốn nhóm KKT ở cột trái để các bước giải đọc sau; bước 3 nêu $v$ rút từ nhóm dừng; nhãn bước dùng ngoặc thay gạch dài; khung kết luận nêu kết quả số VD1. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Khung trái: bốn nhóm KKT của bài con (dừng $g+2\zeta Wv=0$, khả thi gốc $v^TWv\le1$, khả thi đối ngẫu $\zeta\ge0$, bù trừ $\zeta(v^TWv-1)=0$). Cột phải: bước 1 (dừng) $\zeta=0\Rightarrow g=0$, trái giả thiết, nên $\zeta>0$; bước 2 (bù trừ) $v^TWv=1$; bước 3 (giải) $v=-\tfrac1{2\zeta}W^{-1}g$, thay vào ràng buộc cho $\zeta=\tfrac12\sqrt{g^TW^{-1}g}$, $v=-W^{-1}g/\sqrt{g^TW^{-1}g}$. Kết luận VD1: $W^{-1}g=(2,4)^T$, $g^TW^{-1}g=124$, $v=-(2,4)^T/\sqrt{124}$ nằm trên biên elip.
- **Bố cục chọn:** `lec-grid--40-60`: trái khung KKT, phải ba bước và công thức; khung kết luận dưới. Đo ở 1600×900: đáy nội dung 736 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Hệ điều kiện được đọc trước khi dùng; mỗi bước ghi rõ nhóm KKT được dùng.
- **Vào → ra:** Đầu vào: bài con và hàm Lagrange $L_s$ ở RG08. Đầu ra: nghiệm chuẩn hóa $v$ và nhân tử $\zeta$; ghi chú nêu hướng dùng trong cập nhật cần quy ước độ dài (RG10).
- **Chuẩn và minh chứng:** LLO6 / CLO1; đo tại RG11.
- **Số liệu:** VD1: $W^{-1}g=(2,4)^T$, $g^TW^{-1}g=124$, $v^TWv=(12+112)/124=1$ (tính lại).
- **Nguồn, ghi chú soạn:** BV §9.4; MIT lec16.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG10 — Hướng dốc nhất có trọng số

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Hướng giảm dốc nhất theo chuẩn bậc hai" thành "Hướng dốc nhất theo chuẩn bậc hai" (ngắn hơn, cùng thuật ngữ với RG09); nêu lý do của quy ước độ dài (với $W=I$ cho $d=-g$) để chuẩn đối ngẫu không xuất hiện như quy ước tùy ý; đưa kết nối $Q_W$ từ dòng chân trang lên khung kết luận; chuyển dòng "$v$ có chuẩn 1…" (bị ngắt giữa công thức) vào ghi chú. Trước đó: sửa văn phong ngày 2026-09-26. Sửa theo rà soát phần G (G-S4, G-M4, G-S8): đổi tiêu đề thành "Hướng dốc nhất có trọng số" để không chạm nút điều hướng; ghi chú bỏ tham chiếu trước tới $\delta_N^2$, dùng "quy ước thông dụng".
- **Nội dung trên trang:** Quy ước độ dài: nhân $v$ với chuẩn đối ngẫu $\|g\|_{W,*}=\max_{\|v\|_W\le1}g^Tv=\sqrt{g^TW^{-1}g}$; $d=\|g\|_{W,*}v=-W^{-1}g$, tức $Wd=-g$; với $W=I$, $d=-g$. Khung VD1: $3d_1=-6$, $7d_2=-28$, $d=(-2,-4)^T$, $d^TWd=124$, $v=d/\sqrt{124}$. Kết luận: $Q_W(d)=f(x)+g^Td+\tfrac12d^TWd$ cho cùng hệ $g+Wd=0$; hướng dốc nhất theo $\|\cdot\|_W$ là nghiệm của mô hình bậc hai với $I$ thay bằng $W$.
- **Bố cục chọn:** `ratio55`: trái quy ước và hai công thức, phải khung VD1; khung kết luận dưới. Đo ở 1600×900: đáy nội dung 730 px, đáy trang 829 px (trước sửa 822 px).
- **Lý do bố cục cho sinh viên năm 3:** Quy ước độ dài được kiểm bằng trường hợp đã biết $W=I$; kết nối với mô hình bậc hai được đọc như kết luận chính.
- **Vào → ra:** Đầu vào: nghiệm chuẩn hóa $v$ và $g^TW^{-1}g$ ở RG09. Đầu ra: $Wd=-g$ và mô hình $Q_W$; ghi chú nêu $W$ trùng Hessian ở VD1, chuẩn bị Newton (RN01–RN02).
- **Chuẩn và minh chứng:** LLO6 / CLO1; đo tại RG11.
- **Số liệu:** VD1: $d=(-2,-4)^T$, $d^TWd=124$, $Q_W(0)-Q_W(d)=62$ (ghi chú).
- **Nguồn, ghi chú soạn:** BV §9.4; MIT lec16.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RG11 — Hướng và độ dài bước

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Kiểm tra hướng theo chuẩn và quy tắc bước" thành "Hướng và độ dài bước" (gọi tên hai khái niệm được kiểm); thay hai câu hỏi chỉ đọc lại số liệu RG10 và quy tắc dừng thử bằng hai câu trên dữ kiện mới để đo khả năng chuyển giao: giải $Q_W$ tại $x^1$ và chạy quay lui với $\alpha=3/10$. Trước đó: sửa văn phong ngày 2026-09-26. Sửa theo rà soát phần G (G-S2): ghi chú kết bằng nhu cầu hàm không bậc hai cho phần Newton.
- **Nội dung trên trang:** Câu hỏi 1: tại $x^1=(1/2,-3)^T$ của VD1, với $W=\operatorname{diag}(3,7)$, viết điều kiện dừng của $Q_W$, giải $d$, tính $x^1+d$ và $\|d\|_W^2$. Câu hỏi 2: quay lui trên VD1 từ $x^0$ theo $d_G$, với $\beta=1/2$ và $\alpha=3/10$; xác định bước được nhận.
- **Bố cục chọn:** Hai khung câu hỏi `lec-grid--60-40`. Đo ở 1600×900: đáy nội dung 450 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Mỗi câu đo một thành phần của bước lặp (hướng từ điều kiện dừng của mô hình; bước từ điều kiện Armijo) trên dữ kiện chưa được giải sẵn.
- **Vào → ra:** Đầu vào: hệ $g+Wd=0$ (RG10), điểm $x^1$ (RG05), điều kiện Armijo và hàm trên tia (RG03–RG04). Đầu ra: câu 1 cho $x^1+d=(0,0)^T$ vì $W$ trùng Hessian, chuẩn bị mô hình Newton dùng Hessian tại mỗi điểm (RN01).
- **Chuẩn và minh chứng:** LLO6 / CLO1 (câu 1); LLO8 / CLO2 (câu 2).
- **Số liệu:** Câu 1: $g(x^1)=(3/2,-21)^T$, $d=(-1/2,3)^T$, $x^1+d=(0,0)^T$, $\|d\|_W^2=255/4$. Câu 2: ngưỡng $62-246t$; $t=1$: $2040>-184$; $t=1/2$: $703/2>-61$; $t=1/4$: $255/8>1/2$; $t=1/8$: $103/32\le125/4$, nhận (tính lại bằng phân số).
- **Nguồn, ghi chú soạn:** BV §§9.2–9.4; MIT lec16.
- **Dự toán nội bộ:** 0.15 BT (giữ theo điều chỉnh RZ02).

### RN01 — Mô hình bậc hai cục bộ

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: giữ tiêu đề; thêm dòng nhu cầu nhận đầu ra của RG11 (VD1 bậc hai, $W=\nabla^2f$ cho nghiệm sau một bước) và nêu phép đổi ký hiệu $W\to H=\nabla^2f(x)$; khung VD2 nêu lý do đổi ví dụ (không bậc hai, độ cong $1/s^2$ đổi theo $s$, một biến $s$ thay $x$, nghiệm $s^\star=1$); khung kết luận nêu cụ thể tính cục bộ của parabol. Trước đó: sửa văn phong ngày 2026-09-26. Sửa theo rà soát phần N (2026-09-30): đổi tiêu đề thành "Mô hình bậc hai cục bộ" để không chạm nút điều hướng; dòng mở nêu $W=H=\nabla^2f(x)$ tại điểm hiện tại.
- **Nội dung trên trang:** Dòng mở: VD1 bậc hai, $W=\nabla^2f$ cho nghiệm sau một bước; tổng quát $W=H=\nabla^2f(x)$. Hình $\varphi$, tiếp tuyến và parabol tại $s^0=1/4$. Khung VD2: $\varphi(s)=s-\log s$, $s>0$, $\varphi''(s)=1/s^2$, $s^\star=1$; tại $s^0=1/4$: $g=-3$, $H=16$. Kết luận: parabol dùng $H$ tại $s^0$ khớp $\varphi$ gần $s^0$ rồi tách xa dần.
- **Bố cục chọn:** Dòng nhu cầu; `ratio60`: trái hình, phải khung VD2; khung kết luận dưới. Đo ở 1600×900: đáy nội dung 778 px, đáy trang 829 px (bản nháp đầu tràn 1 px do công thức khối và dòng mở hai dòng; đã rút gọn).
- **Lý do bố cục cho sinh viên năm 3:** Nhu cầu Newton được lấy từ bài tập vừa giải; ví dụ mới được giới thiệu cùng lý do cần nó.
- **Vào → ra:** Đầu vào: câu hỏi 1 của RG11 ($x^1+d=0$ với $W=\nabla^2f$). Đầu ra: mô hình $q(s)=\varphi(1/4)-3(s-1/4)+8(s-1/4)^2$; cực tiểu của nó cho hướng Newton (RN02).
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2; chuẩn bị thao tác được đo tại RN07.
- **Số liệu:** VD2: $\varphi'(1/4)=-3$, $\varphi''(1/4)=16$; cực tiểu parabol tại $7/16$.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN02 — Hướng Newton

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Hướng Newton từ điều kiện dừng" thành "Hướng Newton" (gọi tên khái niệm); nêu giả thiết $H\succ0$ và phép đặt $W=H$ trong dòng mở, trước phép giải; thêm tính giảm $g^Td=-d^THd<0$ để nối với tiêu chuẩn dấu và Armijo; nêu bước đầy đủ $t=1$ khi tính $s^+$. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Với $g=\nabla f(x)\in\mathbb R^n$, $H=\nabla^2f(x)\succ0$, dùng $Q_W$ với $W=H$: $Q_H(d)=f(x)+g^Td+\tfrac12d^THd$; $\nabla_dQ_H=g+Hd=0\Rightarrow Hd=-g$. VD2: $16d=3$, $d=3/16$; bước đầy đủ $t=1$ cho $s^+=7/16$. Khung: $H\succ0$ cho nghiệm duy nhất; $g^Td=-d^THd<0$ khi $g\ne0$ nên $d$ là hướng giảm.
- **Bố cục chọn:** Dòng giả thiết, công thức mô hình; `lec-grid--65-35`: trái phép giải và VD2, phải khung tính chất. Đo ở 1600×900: đáy nội dung 574 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Giả thiết đọc trước phép giải; hướng Newton được đặt vào cùng khuôn mẫu $Q_W$ và cùng tiêu chuẩn hướng giảm của phần gradient.
- **Vào → ra:** Đầu vào: parabol tại $s^0$ (RN01), mô hình $Q_W$ (RG10), tiêu chuẩn dấu (RG01). Đầu ra: $d=3/16$, $s^+=7/16$; câu hỏi $s^+$ có thỏa $\varphi'(s)=0$ không (RN03).
- **Chuẩn và minh chứng:** LLO6 / CLO1; đo tại RN07.
- **Số liệu:** VD2: $g\,d=-9/16$, $d^THd=9/16$.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN03 — Tuyến tính hóa điều kiện dừng

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Tuyến tính hóa phương trình tối ưu" thành "Tuyến tính hóa điều kiện dừng" (dùng thuật ngữ đã có của bài); thêm phép tuyến tính hóa trên VD2 cho cùng $d=3/16$; ghi chú nêu lý do cần cách nhìn thứ hai (áp dụng cho hệ KKT có ràng buộc). Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Khung 1: điều kiện dừng của bài gốc tại điểm mới $\nabla f(x+d)=0$. Khung 2: $\nabla f(x+d)\approx g+Hd\Rightarrow g+Hd=0$; VD2: $\varphi'(1/4+d)\approx-3+16d=0$, cùng $d=3/16$. Kết luận: $\varphi'(7/16)=-9/7\ne0$; điểm cực tiểu của mô hình chưa thỏa điều kiện dừng của hàm gốc.
- **Bố cục chọn:** Hai khung xếp dọc, khung kết luận dưới. Đo ở 1600×900: đáy nội dung 810 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Phương trình phi tuyến và bản tuyến tính hóa đặt liền nhau; ví dụ số cho thấy hai cách suy ra trùng nhau và giới hạn của một bước.
- **Vào → ra:** Đầu vào: $d=3/16$, $s^+=7/16$ và câu hỏi về điều kiện dừng (RN02). Đầu ra: một bước Newton giải hệ tuyến tính thay hệ phi tuyến; cách nhìn này dùng lại cho hệ KKT (RR02); nhu cầu đo mức giảm mô hình dự báo (RN04).
- **Chuẩn và minh chứng:** LLO6 / CLO1; đo tại RN07.
- **Số liệu:** VD2: $\varphi'(7/16)=-9/7$.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN04 — Độ giảm Newton

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Độ giảm của mô hình Newton" thành "Độ giảm Newton" (thống nhất với RS03); đặt phép tính mức giảm mô hình trước định nghĩa để định nghĩa có nhu cầu; nêu thuật ngữ gốc (Newton decrement) ở lần đầu; bảng VD2 và khung VD1 ghi rõ đại lượng. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Mức giảm mô hình dự báo, dùng $Hd=-g$: $Q_H(0)-Q_H(d)=-g^Td-\tfrac12d^THd=\tfrac12d^THd$. Định nghĩa: độ giảm Newton $\delta_N=\sqrt{d^THd}=\sqrt{-g^Td}\ge0$. Bảng VD2: $\delta_N^2=9/16$, giảm mô hình $9/32$. Khung VD1: $W=H$, giảm mô hình $124/2$ và giảm thật đều bằng $62$.
- **Bố cục chọn:** `ratio60`: trái phép tính và định nghĩa, phải bảng VD2; khung VD1 dưới. Đo ở 1600×900: đáy nội dung 733 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Đại lượng được đặt tên sau khi đã tính ra; VD1 là trường hợp mô hình trùng hàm.
- **Vào → ra:** Đầu vào: hệ $Hd=-g$ (RN02) và giới hạn của một bước (RN03). Đầu ra: $\delta_N^2/2$ là mức giảm mô hình, cần so với mức giảm thật và sai số tối ưu (RN05).
- **Chuẩn và minh chứng:** LLO8 / CLO2; đo tại RN07.
- **Số liệu:** VD2: $\delta_N^2=16\cdot(3/16)^2=9/16$; VD1: $d^THd=124$.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN05 — Giảm mô hình và sai số tối ưu

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Mức giảm hàm mục tiêu và sai số tối ưu" thành "Giảm mô hình và sai số tối ưu" (ngắn hơn, nêu đúng cặp đại lượng được so); đưa luận điểm trung tâm (giảm mô hình không phải cận sai số khi thiếu giả thiết) từ ghi chú lên khung kết luận, hiện sau bảng; rút gọn dòng Armijo. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Bảng ba phép trừ trên VD2 ($s^0=1/4$, $d=3/16$, $s^+=7/16$): giảm mô hình $9/32\approx0{,}28125$; giảm thật một bước $\log(7/4)-3/16\approx0{,}37212$; sai số tối ưu tại điểm đầu $\log4-3/4\approx0{,}63629$. Armijo, $\alpha=1/10$, $t=1$: ngưỡng $9/160<0{,}37212$, nhận bước đầy đủ. Kết luận: $\delta_N^2/2=9/32<\log4-3/4$; nếu không có giả thiết thêm về độ cong, giảm mô hình không phải cận sai số tối ưu.
- **Bố cục chọn:** Dòng dữ kiện, bảng hiện từng hàng, dòng Armijo, khung kết luận hiện sau cùng. Đo ở 1600×900: đáy nội dung 732 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Ba số được so trực tiếp; kết luận đọc từ bảng, không từ ghi chú.
- **Vào → ra:** Đầu vào: $\delta_N^2/2$ (RN04), bước $s^+$ (RN02). Đầu ra: tiêu chí dừng theo $\delta_N^2/2$ tính được nhưng chưa là chứng nhận sai số (RN06); nhu cầu giả thiết kiểm soát độ cong (RS).
- **Chuẩn và minh chứng:** LLO8 / CLO2; đo tại RN07.
- **Số liệu:** Tính lại: $\log(7/4)-3/16=0{,}372116$, $\log4-3/4=0{,}636294$, $9/32=0{,}28125$; $9/160=0{,}05625$.
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN06 — Thuật toán Newton

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Thuật toán Newton và điều kiện áp dụng" thành "Thuật toán Newton" (song song RG06); thêm đầu ra; đặt tên dung sai $\varepsilon_{\mathrm{model}}$ trong đầu vào; gộp ba khung bên thành một khung đầu vào–đầu ra–điều kiện–chi phí; thay câu "hội tụ bậc hai cần giả thiết cục bộ" (khái niệm chưa định nghĩa) bằng kết luận về tiêu chí dừng có số liệu VD2; định nghĩa hội tụ bậc hai và giả thiết cục bộ chuyển vào ghi chú. Trước đó: sửa văn phong ngày 2026-09-26. Sửa theo rà soát phần N (2026-09-30): ghi chú nêu bước đầy đủ được nhận với $\alpha<1/2$ (BV §9.5.3).
- **Nội dung trên trang:** Năm bước: tính $g,H$; giải $Hd=-g$; tính $\delta_N^2=d^THd$; dừng nếu $\delta_N^2/2\le\varepsilon_{\mathrm{model}}$; nếu chưa, chọn $t$ bằng Armijo và cập nhật. Khung: đầu vào $x^0\in\operatorname{dom}f$, $\varepsilon_{\mathrm{model}}>0$, $\alpha,\beta$; đầu ra $x$ với $\delta_N^2/2\le\varepsilon_{\mathrm{model}}$; điều kiện $f$ hai lần khả vi, $H\succ0$ tại điểm lặp; chi phí mỗi lượt Hessian và hệ $n\times n$, $O(n^3)$ khi đặc. Kết luận: tiêu chí $\delta_N^2/2$ tính được tại điểm hiện tại nhưng chưa chứng nhận sai số tối ưu (VD2: $9/32$ so với $0{,}636$).
- **Bố cục chọn:** `lec-grid--60-40`: trái thủ tục, phải một khung bốn mục; khung kết luận dưới. Đo ở 1600×900: đáy nội dung 778 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Cùng khuôn với thuật toán giảm gradient để thấy hai phương pháp chỉ khác hướng và tiêu chí dừng.
- **Vào → ra:** Đầu vào: hướng Newton (RN02), độ giảm Newton (RN04), so sánh ba phép trừ (RN05), Armijo (RG04). Đầu ra: thuật toán hoàn chỉnh; tiêu chí dừng chưa là cận sai số, dẫn tới câu hỏi RN07 và phần cận sai số (RS).
- **Chuẩn và minh chứng:** LLO8 / CLO2; đo tại RN07.
- **Số liệu:** VD2: $9/32$, $\log4-3/4\approx0{,}636$; $\delta_N^2=g^TH^{-1}g$ (ghi chú).
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16.
- **Dự toán nội bộ:** 1/15 LT + 0 BT (LT xấp xỉ 0.0667; dùng phân số để cộng chính xác).

### RN07 — Bước Newton và tốc độ hội tụ

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề từ "Kiểm tra mô hình và điều kiện tối ưu" thành "Bước Newton và tốc độ hội tụ"; bỏ khung chép đáp số và các ô trống đã có sẵn trên RN03, RN05 (và trong Bài 3 của tập bài tập); thay bằng hai câu trên dữ kiện mới: bước Newton thứ hai từ $s^1=7/16$ và chứng minh $1-s^+=(1-s)^2$; giữ dòng vấn đề mở về cận sai số, viết gọn. Trước đó: sửa văn phong ngày 2026-09-26. Sửa theo rà soát phần N (2026-09-30): định nghĩa hội tụ bậc hai trên mặt trang; câu 2 không in sẵn dãy số; $1-s^k$ gọi là khoảng cách tới nghiệm; ghi chú thêm trường hợp $s^0\ge2$ và câu nối về cận sai số.
- **Nội dung trên trang:** Câu hỏi 1: với VD2, bước Newton đầy đủ thứ hai từ $s^1=7/16$: tính $g,H,d,s^2$, $\delta_N^2/2$ và so với $\varphi(s^1)-\varphi(1)$. Câu hỏi 2: chứng minh bước Newton đầy đủ cho $1-s^+=(1-s)^2$; nhận xét dãy sai số $3/4, 9/16, 81/256$. Vấn đề: điều kiện để $\delta_N^2$ cho cận sai số mục tiêu.
- **Bố cục chọn:** Hai khung câu hỏi `lec-grid--60-40`, dòng vấn đề dưới. Đo ở 1600×900: đáy nội dung 516 px, đáy trang 829 px.
- **Lý do bố cục cho sinh viên năm 3:** Câu 1 đo khả năng thực hiện thuật toán trên điểm mới; câu 2 đo khả năng suy ra quy luật hội tụ từ công thức bước.
- **Vào → ra:** Đầu vào: thuật toán Newton (RN06), VD2 và $s^1=7/16$ (RN02), định nghĩa hội tụ bậc hai (ghi chú RN06). Đầu ra: hội tụ nhanh nhưng $\delta_N^2/2$ vẫn chưa là cận sai số (nhu cầu cho RS); hướng Newton không ràng buộc có thể phá tính khả thi khi có đẳng thức (RE01).
- **Chuẩn và minh chứng:** LLO6 / CLO1; LLO8 / CLO2.
- **Số liệu:** Câu 1: $g=-9/7$, $H=256/49$, $d=63/256$, $s^2=175/256$, $\delta_N^2/2=81/512\approx0{,}158$, $\varphi(7/16)-\varphi(1)=\log(16/7)-9/16\approx0{,}264$. Câu 2: $s^+=2s-s^2$ (tính lại bằng phân số).
- **Nguồn, ghi chú soạn:** BV §§9.5.1–9.5.3; MIT lec16; VD2 tự xây dựng.
- **Dự toán nội bộ:** giữ như trước.

### RE01 — Bài toán có ràng buộc đẳng thức

- **Quyết định:** `sửa` ngày 2026-09-30 theo yêu cầu duyệt từng trang: tiêu đề cũ dài, gần trùng tiêu đề RP02 và vượt nút điều hướng; mặt trang chưa nêu dạng tổng quát của lớp bài toán và điểm đầu khả thi; ghi chú chưa nêu nhu cầu và lý do chọn VD3. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26; đối chiếu E01, E02, P02.
- **Nội dung trên trang:** Bài toán $\min_u F(u)$ với $Au=b$, $A\in\mathbb R^{p\times n}$ (lớp thứ hai của RP02). VD3 $F=\tfrac12(2u_1^2+5u_2^2)$, $A=[1\ 1]$, $b=14$, điểm đầu khả thi $(16,-2)^T$. $L=F+\nu(u_1+u_2-14)$; KKT $2u_1+\nu=0$, $5u_2+\nu=0$, $u_1+u_2=14$; ứng viên $(10,4)^T$, $\nu=-20$, $F^*=140$; kết luận lồi chặt + KKT cho nghiệm duy nhất. Ghi chú: nhu cầu (Newton không ràng buộc đã hoàn chỉnh, lớp thứ hai cần giữ $Au=b$), đổi ký hiệu $F,u$, lý do chọn VD3 (giải KKT bằng tay làm mốc kiểm).
- **Bố cục chọn:** Trái 45% hình đường khả thi, đường mức, điểm đầu và nghiệm; phải: dạng bài toán → VD3 và điểm đầu → Lagrange → ba phương trình → ứng viên; kết luận ở chân. Đo 1600×900: nội dung 674/674, tiêu đề kết thúc trước nút điều hướng; 390×844: chỉ hàng ba phương trình cuộn ngang trong `.formula`.
- **Lý do bố cục cho sinh viên năm 3:** Khôi phục cân bằng gradient của bài 03 trước khi xây dựng thuật toán giữ ràng buộc.
- **Vào → ra:** Đầu vào: Newton không ràng buộc đã hoàn chỉnh (RN01–RN07); lớp bài toán đẳng thức và hệ KKT của nó từ RP02. Đầu ra: nghiệm tham chiếu $(10,4)^T$, $\nu=-20$, $F^*=140$ và điểm đầu khả thi $(16,-2)^T$; câu hỏi hướng bước nào giữ $Au=b$.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** VD3 khả thi, dàn ý §6: F, u, A, b; g, H ở RE02; d, η ở RE05; N, Δz ở RE06. Chỉ đưa ký hiệu đã dùng trên trang, chưa đưa phần dư hoặc số gia nhân tử.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Liên kết ghi chú: hướng Newton cần nằm trong không gian hạt nhân để bảo toàn đẳng thức. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE02 — Hướng khả thi

- **Quyết định:** `sửa` ngày 2026-09-30 theo yêu cầu duyệt từng trang: tiêu đề dài vượt nút điều hướng; bước Newton không ràng buộc được tính trước khi nêu dữ kiện $g,H$; khung kết luận dùng $\ker A$ chưa định nghĩa trên mặt trang; ghi chú chưa mở bằng đầu vào từ RE01. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26.
- **Nội dung trên trang:** Dữ kiện VD3 tại $u=(16,-2)^T$: $g=(32,-10)^T$, $H=\operatorname{diag}(2,5)$. Bước Newton không ràng buộc $-H^{-1}g=(-16,2)^T$ có $Ad=-14$, tới gốc, vi phạm đẳng thức. $A(u+td)=b+tAd$; giữ $Au=b$ với mọi $t$ khi và chỉ khi $Ad=0$. Kết luận: hướng khả thi $d\in\ker A=\{d:Ad=0\}$, với $A=[1\ 1]$ là $d_1+d_2=0$.
- **Bố cục chọn:** Trái 60% hình bước vi phạm từ $(16,-2)$ về gốc; phải: dữ kiện → bước Newton tự do và $Ad=-14$ → $A(u+td)=b+tAd$ → điều kiện $Ad=0$; định nghĩa hướng khả thi ở chân. Đo 1600×900: đáy nội dung 744/829, tiêu đề kết thúc ở 346 px; 390×844: vừa khi cuộn, công thức cuộn ngang nhẹ trong `.formula`.
- **Lý do bố cục cho sinh viên năm 3:** Nhìn thấy hạn chế của công cụ Newton vừa học trước khi thêm nhân tử vào bài con.
- **Vào → ra:** Đầu vào: điểm đầu khả thi $(16,-2)^T$ và nghiệm tham chiếu $(10,4)^T$ (RE01); hướng Newton $-H^{-1}g$ của phần Newton. Đầu ra: điều kiện hướng khả thi $Ad=0$, $d\in\ker A$, dùng làm ràng buộc của mô hình bậc hai ở RE03.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** VD3 khả thi, dàn ý §6: F, u, A, b; g, H ở RE02; d, η ở RE05; N, Δz ở RE06. Chỉ đưa ký hiệu đã dùng trên trang, chưa đưa phần dư hoặc số gia nhân tử.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE03 — Bài toán con có đẳng thức

- **Quyết định:** `sửa` ngày 2026-09-30 theo yêu cầu duyệt từng trang: tiêu đề dài vượt nút điều hướng và cụm "mô hình có đẳng thức" tối nghĩa; bài con chưa được nối với mô hình $Q_H$ của phần Newton và điều kiện $Ad=0$ của RE02; chưa nêu $g,H$ tại điểm khả thi; nhãn đạo hàm chưa gọi tên nhóm KKT. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Dòng mở: tại $u$ khả thi, $g=\nabla F(u)$, $H=\nabla^2F(u)$; mô hình $Q_H$ của phần Newton thêm ràng buộc $Ad=0$. Khung: bài con $\min_d g^Td+\tfrac12d^THd$ với $Ad=0$, nhân tử $\eta\in\mathbb R^p$; $L_m(d,\eta)$; Dừng $g+Hd+A^T\eta=0$; Khả thi $Ad=0$. Ghi chú: bỏ hằng số $F(u)$, hai nhóm KKT của bài con affine, phân biệt $\eta$ với $\nu$.
- **Bố cục chọn:** Dòng mở toàn chiều rộng; khung panel: bài con → $L_m$ → Dừng → Khả thi. Đo 1600×900: đáy nội dung 787/829, tiêu đề kết thúc ở 600 px; 390×844: vừa khi cuộn, $L_m$ cuộn ngang trong `.formula`.
- **Lý do bố cục cho sinh viên năm 3:** Sinh viên tự tái tạo hai hàng hệ Newton bằng thao tác đã dùng ở bài 03.
- **Vào → ra:** Đầu vào: điều kiện hướng khả thi $Ad=0$ (RE02); mô hình $Q_H$ và hệ $Hd=-g$ của phần Newton. Đầu ra: hai phương trình KKT tuyến tính theo $(d,\eta)$, xếp thành hệ khối ở RE04.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE04 — Hệ Newton có đẳng thức

- **Quyết định:** `sửa` ngày 2026-09-30 theo yêu cầu duyệt từng trang: tiêu đề kể cách suy ra và chạm nút điều hướng (802 px); cột trái chép lại hai phương trình mà không gắn hàng ma trận với nhóm KKT; điều kiện khả nghịch thiếu lý do; câu kết luận khó đọc. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Trái: Hàng 1 nhóm dừng $g+Hd+A^T\eta=0$; Hàng 2 nhóm khả thi $Ad=0$. Phải: hệ khối cỡ $(n+p)\times(n+p)$. Dòng giả thiết: $H\succ0$, $A$ đủ hạng hàng nên ma trận khối khả nghịch, $(d,\eta)$ duy nhất. Kết luận: $d$ là bước tối ưu của mô hình; với $F$ không bậc hai, $u+d$ chưa là nghiệm bài gốc. Ghi chú: chứng minh khả nghịch qua $d^THd=0$ và đủ hạng hàng; ma trận không xác định dương.
- **Bố cục chọn:** Trái 45% hai hàng có nhãn nhóm KKT; phải hệ khối nhấn mạnh; dòng giả thiết và kết luận toàn chiều rộng. Đo 1600×900: đáy nội dung 669/829, tiêu đề kết thúc ở 571 px; 390×844: vừa khi cuộn, không cuộn ngang.
- **Lý do bố cục cho sinh viên năm 3:** Bố cục thể hiện nguồn gốc từng khối, thay việc đưa ma trận hoàn chỉnh rồi yêu cầu nhớ.
- **Vào → ra:** Đầu vào: hai phương trình KKT của bài con (RE03). Đầu ra: hệ khối khả nghịch dưới $H\succ0$ và $A$ đủ hạng hàng; giải trên VD3 ở RE05.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE05 — Ví dụ Newton khả thi

- **Quyết định:** `sửa` ngày 2026-09-30 theo yêu cầu duyệt từng trang: giữ tiêu đề; bỏ câu "Đặt $\delta_{eq}$" xuất hiện đột ngột trên mặt trang (định nghĩa chuyển sang RE07, nối với $\delta_N$); dòng kiểm nêu mức giảm thật bằng $\tfrac12d^THd$; dữ kiện nêu điểm và $H$; ghi chú nêu $\eta=\nu^*$. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Dữ kiện VD3 tại $(16,-2)^T$, $g=(32,-10)^T$, $H=\operatorname{diag}(2,5)$; hệ ba phương trình; thế $d_2=-d_1$, $7d_1=-42$, $d=(-6,6)^T$, $\eta=-20$; kiểm $Ad=0$, bước $t=1$ tới $(10,4)^T$, $F$ giảm $266-140=126=\tfrac12d^THd$. Kết luận: một bước tới nghiệm vì hàm bậc hai. Ghi chú: $\eta=-20=\nu^*$; mức giảm thật bằng mức giảm mô hình, khác VD2.
- **Bố cục chọn:** Trái 60% dữ kiện → hệ → phép thế → nghiệm → dòng kiểm; phải hình bước dọc đường khả thi; kết luận ở chân. Đo 1600×900: đáy nội dung 822/829, tiêu đề kết thúc ở 492 px; 390×844: vừa khi cuộn, hàng nghiệm cuộn ngang trong `.formula`.
- **Lý do bố cục cho sinh viên năm 3:** Giải ra hướng trước khi kiểm, để ví dụ không chỉ là thế nghiệm được cho sẵn.
- **Vào → ra:** Đầu vào: hệ khối và điều kiện khả nghịch (RE04); điểm đầu và nghiệm tham chiếu (RE01). Đầu ra: $d=(-6,6)^T$, $\eta=-20$ để đối chiếu với cách giải rút gọn ở RE06.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** VD3 khả thi, dàn ý §6: F, u, A, b; g, H ở RE02; d, η ở RE05; N, Δz ở RE06. Chỉ đưa ký hiệu đã dùng trên trang, chưa đưa phần dư hoặc số gia nhân tử.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RE06 — Hệ Newton rút gọn

- **Quyết định:** `sửa` ngày 2026-09-30 theo yêu cầu duyệt từng trang: mặt trang chưa nêu vì sao cần cách giải thứ hai; tiêu đề gộp phương pháp với kết quả; ghi chú chưa mở bằng nghiệm RE05 và chưa nối sang thuật toán. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Dòng nhu cầu: hệ khối cỡ $n+p$ không xác định dương; tham số hóa tập khả thi cho hệ cỡ $n-p$ không chứa nhân tử. $u=\hat u+Nz$, $d=N\Delta z$; khử nhân tử bằng $N^TA^T=0$, được $N^THN\Delta z=-N^Tg$. VD3: $N=(-1,1)^T$, $N^THN=7$, $N^Tg=-42$, $\Delta z=6$. Kết luận: cùng $d=(-6,6)^T$; với $H\succ0$, $N^THN\succ0$. Ghi chú: chứng minh $N^THN\succ0$, $\psi(z)=196-28z+7z^2/2$.
- **Bố cục chọn:** Hai dòng mở toàn chiều rộng (nhu cầu, tham số hóa); lưới hai cột: khử nhân tử | khung VD3; kết luận ở chân. Đo 1600×900: đáy nội dung 707/829, tiêu đề kết thúc ở 450 px; 390×844: vừa khi cuộn.
- **Lý do bố cục cho sinh viên năm 3:** Đặt khử biến như cách giải cùng một hệ, thay vì một nhánh xuất hiện trước rồi bị bỏ lại.
- **Vào → ra:** Đầu vào: nghiệm $d=(-6,6)^T$, $\eta=-20$ của hệ khối (RE05); $\ker A$ (RE02). Đầu ra: hệ rút gọn cỡ $n-p$, xác định dương, cho cùng bước; thuật toán ở RE07 dùng một trong hai cách giải.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** VD3 khả thi, dàn ý §6: F, u, A, b; g, H ở RE02; d, η ở RE05; N, Δz ở RE06. Chỉ đưa ký hiệu đã dùng trên trang, chưa đưa phần dư hoặc số gia nhân tử.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).
- **Cập nhật theo rà soát phần E (`2d750fc`):** dòng nhu cầu thêm "nên không giải được bằng phân rã Cholesky"; chỗ đưa $N\in\mathbb R^{n\times(n-p)}$ ghi "($A$ đủ hạng hàng)"; dòng thứ hai của khối căn mở bằng $\Rightarrow$ để thể hiện phép suy ra.

### RE07 — Thuật toán Newton khả thi

- **Quyết định:** `sửa` ngày 2026-09-30 theo yêu cầu duyệt từng trang: giữ tiêu đề (song song với "Thuật toán Newton"); $\delta_{eq}$ chưa được định nghĩa và chưa nối với $\delta_N$; thiếu đầu vào, đầu ra, điều kiện áp dụng trên mặt trang; hai công thức cột phải chưa có nhãn vai trò. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Trái: năm bước (tính $g,H$; giải hệ KKT bài con; $\delta_{eq}^2=d^THd$ là độ giảm Newton của bài con; dừng khi $\delta_{eq}^2/2\le\varepsilon_{\mathrm{model}}$; Armijo trên $F$ và cập nhật). Phải: Đầu vào $u^0$ với $Au^0=b$, $\varepsilon_{\mathrm{model}}$, $\alpha,\beta$; Đầu ra $u$ khả thi với $\delta_{eq}^2/2\le\varepsilon_{\mathrm{model}}$; Điều kiện $H\succ0$, $A$ đủ hạng hàng; Mỗi bước: giữ khả thi $A(u+td)=b$, hướng giảm $g^Td=-d^THd<0$. Kết luận: $\delta_{eq}^2/2$ chưa chứng nhận sai số tối ưu.
- **Bố cục chọn:** Lưới 50–50: panel năm bước | panel đầu vào, đầu ra, điều kiện, tính chất mỗi bước; kết luận ở chân. Bản nháp 60–40 với hai dòng tính chất riêng tràn 67 px ở 16:9; gộp hai tính chất thành một dòng và đổi lưới 50–50. Đo 1600×900: đáy nội dung 723/829, tiêu đề kết thúc ở 623 px; 390×844: vừa khi cuộn.
- **Lý do bố cục cho sinh viên năm 3:** Sinh viên hiểu vì sao được tái dùng Armijo trên F và khi nào lập luận không còn đúng.
- **Vào → ra:** Đầu vào: hệ khối (RE04) và hệ rút gọn (RE06) cho cùng bước; độ giảm Newton $\delta_N$ và thuật toán Newton của phần không ràng buộc. Đầu ra: thuật toán Newton khả thi với tiêu chí dừng theo mô hình; câu hỏi cận sai số còn mở; kiểm tra tái tạo hệ ở RE08.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RE08.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).
- **Cập nhật theo rà soát phần E (`2d750fc`):** khung điều kiện ghi "Điều kiện (đủ): $H\succ0$, $A$ đủ hạng hàng".

### RE08 — Bước Newton khả thi

- **Quyết định:** `sửa` ngày 2026-09-30 theo yêu cầu duyệt từng trang: tiêu đề kể nhiệm vụ; câu hỏi chép lại chuỗi RE03–RE06 với cùng dữ kiện nên chỉ đo khả năng đọc lại; ba ô trang trí không có nội dung. Trước đó: sửa văn phong ngày 2026-09-26.
- **Nội dung trên trang:** Câu 1 (tính toán, dữ kiện mới): VD3 tại điểm khả thi $u=(8,6)^T$, lập hệ khối, giải $d,\eta$, kiểm $Ad=0$, tính $u+d$ và mức giảm $F$ (đáp án $g=(16,30)^T$, $d=(2,-2)^T$, $\eta=-20$, $u+d=(10,4)^T$, giảm $154-140=14=\tfrac12d^THd$). Câu 2: hệ rút gọn với $N=(-1,1)^T$ ($7\Delta z=-14$, $\Delta z=-2$), giải thích $\eta=\nu^*=-20$. Lời giải trong ghi chú; ghi chú kết bằng nhu cầu điểm đầu chưa khả thi.
- **Bố cục chọn:** Hai khung câu hỏi xếp dọc; bỏ ba ô trang trí. Đo 1600×900: đáy nội dung 514/829, tiêu đề kết thúc ở 492 px; 390×844: vừa khung.
- **Lý do bố cục cho sinh viên năm 3:** Đo khả năng suy ra phương pháp, không chỉ nhận ra dạng ma trận hay nhớ vế phải0.
- **Vào → ra:** Đầu vào: thuật toán Newton khả thi (RE07), hệ khối (RE04), hệ rút gọn (RE06), nghiệm tham chiếu (RE01). Đầu ra: minh chứng tái tạo và chuyển giao hệ bước khả thi sang điểm đầu mới; nhu cầu xử lý điểm đầu chưa khả thi ở RR01.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §§10.1–10.2.1; Bài 03 S02-04, S05-03; MIT lec17. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 3/20 BT; suy nghĩ 3/50 BT, chữa 9/100 BT.
- **Cập nhật theo rà soát phần E (`2d750fc`):** câu hỏi vì sao $\eta$ trùng nhân tử $\nu^*$ của nghiệm chuyển vào cuối câu 1; câu 2 chỉ còn hệ rút gọn.

### RR01 — Phần dư KKT

- **Quyết định:** `sửa` ngày 2026-09-30 (duyệt từng trang theo yêu cầu người dùng): đổi tiêu đề từ "Hai phần dư của điều kiện KKT" thành "Phần dư KKT"; đưa nhu cầu từ RE08 lên mặt trang, định nghĩa hai phần dư và tương đương với KKT trước số liệu. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26.
- **Nội dung trên trang:** Dòng nhu cầu: Newton khả thi cần $Au^0=b$; tại điểm chưa khả thi, $Ad=0$ giữ nguyên $Au-b$. Định nghĩa $r_d=\nabla F(u)+A^T\nu$, $r_p=Au-b$; $(u,\nu)$ thỏa KKT khi và chỉ khi $r_d=0$, $r_p=0$. VD3 tại $u=(1,8)^T$, $\nu=4$: $g=(2,40)^T$, $r_d=(6,44)^T$, $r_p=-5$. Kết luận: bước mới phải đưa đồng thời hai phần dư về 0.
- **Bố cục chọn:** Dòng nhu cầu trên cùng; trái 55% khung định nghĩa; phải số liệu VD3; kết luận dưới. Đo ở 1600×900: nội dung 674/674, tiêu đề kết thúc ở 319 px.
- **Lý do bố cục cho sinh viên năm 3:** Mỗi phần dư có nguồn gốc và nhiệm vụ cụ thể, tránh tạo ký hiệu mới không gắn điều kiện cũ.
- **Vào → ra:** Đầu vào: nhu cầu điểm đầu chưa khả thi ở RE08 ($Ad=0$ không sửa được $Au-b$). Đầu ra: hai phần dư làm thước đo KKT; RR02 tuyến tính hóa cả hai phương trình như cách nhìn ở RN03.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** VD3 đổi điểm đầu: chỉ u, ν, g, r_d, r_p; chưa đưa Δν vào mặt trang. Các số 2/40 và 6/44 phải ở hai hàng gradient/phần dư khác nhau.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR02 — Tuyến tính hóa hệ KKT

- **Quyết định:** `sửa` ngày 2026-09-30 (duyệt từng trang theo yêu cầu người dùng): giữ tiêu đề; thêm dòng nối với phép tuyến tính hóa điều kiện dừng của Newton không ràng buộc; gắn nhãn "Xấp xỉ bậc một" và "Đúng (ràng buộc affine)" cho hai công thức. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26.
- **Nội dung trên trang:** r_d(u+d,ν+Δν)≈r_d+Hd+AᵀΔν; r_p(u+d)=r_p+Ad chính xác. Đặt hai biểu thức mô hình bằng 0.
- **Bố cục chọn:** Dòng mở nối RN03 và khai báo số gia; khung hai công thức có nhãn vai trò; khung nhấn hai biểu thức mô hình bằng 0. Đo ở 1600×900: nội dung 674/674, tiêu đề kết thúc ở 525 px.
- **Lý do bố cục cho sinh viên năm 3:** Dùng lại RN03 cho một hệ hai nhóm, làm rõ hàng nào là xấp xỉ và hàng nào đúng chính xác.
- **Vào → ra:** Đầu vào: hai phần dư $r_d$, $r_p$ của RR01 và cách tuyến tính hóa điều kiện dừng ở RN03. Đầu ra: hai nhóm phương trình tuyến tính theo $(d,\Delta\nu)$ với vế phải $-r_d$, $-r_p$; RR03 viết dạng ma trận.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR03 — Hệ Newton cho phần dư KKT

- **Quyết định:** `sửa` ngày 2026-09-30 (duyệt từng trang theo yêu cầu người dùng): đổi tiêu đề từ "Hệ Newton cho hai phần dư" thành "Hệ Newton cho phần dư KKT" cho khớp RR01; cột bảng đổi thành "Điểm khả thi"/"Điểm chưa khả thi"; thay dòng "bài con mở rộng" bằng phép thay $r_d=g+A^T\nu$; thêm kết luận trường hợp $r_p=0$. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26.
- **Nội dung trên trang:** [H Aᵀ;A0][d;Δν]=−[r_d;r_p]. So với RE04: ma trận giữ nguyên, ẩn thứ hai là số gia, vế phải gồm cả hai sai lệch. Với bài con mở rộng Ad=−r_p, nhân tử η=ν+Δν.
- **Bố cục chọn:** Hệ khối trên cùng; bảng đối chiếu ba hàng; dòng thay $r_d$ vào hàng 1; kết luận trường hợp $r_p=0$. Đo ở 1600×900: nội dung 674/674, tiêu đề kết thúc ở 659 px.
- **Lý do bố cục cho sinh viên năm 3:** Tránh đồng nhất η với Δν khi hình dạng ma trận giống nhau; nói rõ cùng điểm và cùng mô hình khi so sánh.
- **Vào → ra:** Đầu vào: hai phương trình tuyến tính hóa của RR02. Đầu ra: hệ khối theo $(d,\Delta\nu)$, trùng hệ Newton có đẳng thức khi $r_p=0$ với $\eta=\nu+\Delta\nu$; RR04 giải hệ trên VD3.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR04 — Cập nhật điểm và nhân tử

- **Quyết định:** `sửa` ngày 2026-09-30 (duyệt từng trang theo yêu cầu người dùng): đổi tiêu đề từ "Bước Newton của điểm và nhân tử" (chạm nút điều hướng) thành "Cập nhật điểm và nhân tử"; dòng mở nêu nguồn của vế phải từ $r_d$, $r_p$; phép kiểm $r_d^+$ viết một dòng; thêm kết luận $F$ bậc hai và $\nu^+=\nu+\Delta\nu=\nu^*$. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26.
- **Nội dung trên trang:** VD3:2d1+Δν=−6,5d2+Δν=−44,d1+d2=5. Giải được(9,−4,−24); u+=(10,4),ν+=4−24=−20. Thế lại cả ba phương trình và hai phần dư mới.
- **Bố cục chọn:** Dòng mở nêu vế phải; trái 60% hệ ba phương trình và phép khử; phải khung bước đầy đủ và phép kiểm; kết luận dưới. Đo ở 1600×900: nội dung 674/674, tiêu đề kết thúc ở 599 px.
- **Lý do bố cục cho sinh viên năm 3:** Phép giải và cập nhật phân biệt số gia nhân tử −24 với nhân tử mới −20; việc triệt tiêu phần dư trong trường hợp bậc hai dẫn tới nhu cầu kiểm tiến triển cho hàm tổng quát ở RR05.
- **Vào → ra:** Đầu vào: hệ khối của RR03 tại $u=(1,8)^T$, $\nu=4$. Đầu ra: $d=(9,-4)^T$, $\Delta\nu=-24$, $(u^+,\nu^+)=((10,4)^T,-20)$ là nghiệm vì $F$ bậc hai; nhu cầu một đại lượng đo tiến triển khi $F$ không bậc hai hoặc $t<1$ (RR05).
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** VD3 phần dư, dàn ý §6: ghi rõ điểm đầu, g, r_d, r_p, η và Δν theo thứ tự đã định nghĩa. RR05 đổi điểm đầu có chủ ý để kiểm giới hạn.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR05 — Chuẩn phần dư

- **Quyết định:** `sửa` ngày 2026-09-30 (duyệt từng trang theo yêu cầu người dùng): đổi tiêu đề từ "Chuẩn phần dư và điều kiện nhận bước" (đè nút điều hướng) thành "Chuẩn phần dư"; nêu $J_r$ là ma trận khối của hệ Newton; gộp phép tính đạo hàm vào một khung; kết luận nêu quy tắc nhận bước dùng $\|r\|_2$ thay cho $F$. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26.
- **Nội dung trên trang:** Trường hợp biên của VD3: $u=(0,0)^T$, $\nu=0$ có $F=0<140$ nhưng không khả thi. Đặt $\Delta=(d,\Delta\nu)$, $J_r$ là Jacobian của vectơ phần dư; hệ RR03 chính là $J_r\Delta=-r$. Với $r\ne0$, đạo hàm của $\|r((u,\nu)+t\Delta)\|_2$ tại $t=0$ bằng $-\|r\|_2$. Vì vậy dùng chuẩn phần dư để nhận bước.
- **Bố cục chọn:** Trái 40% khung trường hợp $F$ phải tăng; phải 60% định nghĩa $r$, $\Delta$, $J_r\Delta=-r$ và phép tính đạo hàm một khung; kết luận dưới. Đo ở 1600×900: nội dung 674/674, tiêu đề kết thúc ở 371 px.
- **Lý do bố cục cho sinh viên năm 3:** Thấy trực tiếp lý do bỏ F làm thước đo, rồi có lập luận cho thước đo thay thế.
- **Vào → ra:** Đầu vào: nhu cầu đo tiến triển từ RR04 khi $F$ không bậc hai hoặc $t<1$. Đầu ra: $\|r\|_2$ giảm theo hướng Newton với $t>0$ đủ nhỏ, nên quay lui trên $\|r\|_2$ (RR06).
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** VD3 phần dư, dàn ý §6: ghi rõ điểm đầu, g, r_d, r_p, η và Δν theo thứ tự đã định nghĩa. RR05 đổi điểm đầu có chủ ý để kiểm giới hạn.
- **Nguồn, ghi chú soạn:** Độ giảm chuẩn phần dư ghép không suy ra chuẩn của từng thành phần giảm đơn điệu.  BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR06 — Newton từ điểm chưa khả thi

- **Quyết định:** `sửa` ngày 2026-09-30 (duyệt từng trang theo yêu cầu người dùng): đổi tiêu đề từ "Thuật toán Newton từ điểm chưa khả thi" (đè nút điều hướng) thành "Newton từ điểm chưa khả thi"; gộp dòng dừng vào bước 1, định nghĩa rõ phần dư sau bước trong tiêu chí quay lui, bốn bước thay năm; thêm khung đầu vào, đầu ra, điều kiện (đủ) theo mẫu RE07; kết luận nối với Newton khả thi. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26.
- **Nội dung trên trang:** Tính hai phần dư; giải hệ; quay lui bằng cách kiểm miền và tiêu chí $\|r_{new}\|_2\le(1-\alpha t)\|r\|_2$; cập nhật $u+td$, $\nu+t\Delta\nu$. Dừng khi cả hai chuẩn phần dư đạt dung sai. Đạo hàm âm bảo đảm có bước dương đủ nhỏ thỏa tiêu chí, không bảo đảm mọi t đều được nhận. $r_p^+=(1-t)r_p$ và $\nu^+=(1-t)\nu+t\eta$; với $t=1$ ta có $\nu^+=\eta$.
- **Bố cục chọn:** Lưới 50–50: trái khung bốn bước; phải khung đầu vào, đầu ra, điều kiện và tính chất sau bước $t$; kết luận dưới. Đo ở 1600×900: nội dung 674/674, tiêu đề kết thúc ở 666 px.
- **Lý do bố cục cho sinh viên năm 3:** Làm rõ ảnh hưởng của giảm bước và tránh dùng giá trị nhân tử đầy đủ khi chỉ đi một phần bước.
- **Vào → ra:** Đầu vào: tiêu chí $\|r\|_2$ của RR05 và hệ Newton RR03. Đầu ra: thuật toán với hai dung sai; $r_p$ co theo $1-t$, sau bước đầy đủ thuật toán trùng Newton khả thi; RR07 kiểm tra lập hệ và điều kiện dừng.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; chuẩn bị thao tác được đo tại RR07.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 7/120 LT + 0 BT (LT xấp xỉ 0.0583; dùng phân số để cộng chính xác).

### RR07 — Bước Newton cho phần dư KKT

- **Quyết định:** `sửa` ngày 2026-09-30 (duyệt từng trang theo yêu cầu người dùng): đổi tiêu đề từ "Kiểm tra hai dạng hệ Newton" (kể nhiệm vụ) thành "Bước Newton cho phần dư KKT"; hai câu hỏi dùng dữ kiện mới thay cho đọc lại RR01/RR04; bỏ hai khung "Lỗi cần sửa" in sẵn đáp án, chuyển lỗi thường gặp vào ghi chú. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26.
- **Nội dung trên trang:** Câu 1: VD3 tại $u=(4,2)^T$, $\nu=2$: tính $r_d$, $r_p$, giải hệ Newton, tính $(u^+,\nu^+)$ với $t=1$, xác định nhân tử của nghiệm. Đáp án: $r_d=(10,12)^T$, $r_p=-8$, $d=(6,2)^T$, $\Delta\nu=-22$, $u^+=(10,4)^T$, $\nu^+=-20=\nu^*$. Câu 2: bước $t=1/2$: $r^+=(5,6,-4)^T=\tfrac12r$, so với $0{,}95\|r\|_2$ nên nhận; hai điều kiện dừng.
- **Bố cục chọn:** Hai khung câu hỏi; lời giải và lỗi thường gặp trong ghi chú. Đo ở 1600×900: nội dung 674/674, tiêu đề kết thúc ở 708 px (phương án "Bước Newton từ điểm chưa khả thi" kết thúc ở 786 px nên không dùng).
- **Lý do bố cục cho sinh viên năm 3:** Kiểm các nhầm lẫn có đáp số khác nhau thật sự; buộc dùng KKT chứ không chỉ nhớ số.
- **Vào → ra:** Đầu vào: hệ Newton RR03, cập nhật RR04, tiêu chí $\|r\|_2$ RR05–RR06. Đầu ra: người học tự lập và giải hệ tại điểm mới, phân biệt $\Delta\nu$ với $\nu^+$, áp dụng tiêu chí nhận bước; vấn đề cận sai số chuyển sang phần tự điều chỉnh.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** VD3 phần dư, dàn ý §6: ghi rõ điểm đầu, g, r_d, r_p, η và Δν theo thứ tự đã định nghĩa. RR05 đổi điểm đầu có chủ ý để kiểm giới hạn.
- **Nguồn, ghi chú soạn:** BV §10.3.1; Bài 03 S05-03; MIT lec17. Dung sai phần dư đo mức thỏa KKT; cận sai số từ độ giảm Newton của bài không ràng buộc cần điều kiện riêng về độ cong. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 1/5 BT; suy nghĩ 2/25 BT, chữa 3/25 BT.

### RS01 — Biến thiên độ cong

- **Quyết định:** `sửa` ngày 2026-10-01: người dùng yêu cầu đánh dấu Tự học cho phần tự điều chỉnh; thêm nhãn "Tự học" (lớp chung `.self-study-badge`), đặt bằng nhãn nội dòng cuối tiêu đề. Đây là ngoại lệ có chủ ý theo chỉ dẫn cụ thể của người dùng đối với quy định AGENTS.md không hiển thị nhãn quy trình; không đổi nội dung toán, thứ tự hay điều hướng. Trước đó: `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề "Độ cong và sai số của mô hình Newton" thành "Biến thiên độ cong"; đưa vấn đề mở từ RN05/RN07/RR07 lên mặt trang; kết luận nêu rõ đại lượng được so sánh ($|arphi'''|$ với $(arphi'')^{3/2}$); ghi chú giải thích vì sao cận cổ điển cần hằng số $m,L$ và vì sao tỷ số với số mũ $3/2$ không đổi khi đổi thang. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: gộp và sửa; đối chiếu D01, C08. Phần tự điều chỉnh trả lời một vấn đề đã giữ lại, thay vì cắt ngang giữa hai loại Newton.
- **Nội dung trên trang:** (2026-09-30) Vấn đề: VD2 tại $s=1/4$ có giảm mô hình $9/32$ nhỏ hơn sai số $\log4-3/4$; ký hiệu $\delta=\delta_N$, VD2 $\delta=3/4$; $\varphi''=1/s^2\to\infty$ khi $s\to0^+$; kết luận: cần giả thiết so $|\varphi'''|$ với $(\varphi'')^{3/2}$. Mô tả trước: Trở lại phân biệt giảm mô hình và sai số thật. Từ đây viết $\delta=\delta_N=\sqrt{d^THd}\ge0$; VD2 có $\delta_N^2=9/16$ nên $\delta=3/4$. Với $\varphi(s)=s-\log s$, $\varphi''=1/s^2$ không bị chặn trên toàn miền $s>0$. Cần kiểm biến thiên độ cong tương đối để có một cận sai số.
- **Bố cục chọn:** Trái 60% đồ thị $\varphi''$ có biên $s=0$; phải ba số đã biết và câu hỏi còn mở; không tạo ví dụ mới.
- **Lý do bố cục cho sinh viên năm 3:** Phần tự điều chỉnh trả lời một vấn đề đã giữ lại, thay vì cắt ngang giữa hai loại Newton.
- **Vào → ra:** (2026-09-30) Đầu vào: vấn đề mở từ RN05, RN07, RR07. Đầu ra: nhu cầu một giả thiết độ cong không phụ thuộc hệ tọa độ, định nghĩa ở RS02. Mô tả trước: Đầu vào: Trong VD2, $\delta_N^2/2=9/32$ nhỏ hơn sai số mục tiêu $\log4-3/4$. Đầu ra: Vì $\varphi''(s)=1/s^2$ không bị chặn trên toàn miền, điều kiện tự điều chỉnh kiểm soát độ biến thiên tương đối của độ cong.
- **Chuẩn và minh chứng:** LLO7 / CLO1; chuẩn bị thao tác được đo tại RS05.
- **Số liệu:** VD2 và hàm biên −log s; dàn ý §6–§7. Cận bằng sai số thật chỉ trong ví dụ đã tính.
- **Nguồn, ghi chú soạn:** Ghi chú gọi rõ độ giảm Newton của bài toán không ràng buộc và đối chiếu $9/32$ với $\log4-3/4$; phép khử chuyển cận sang điểm khả thi, không dùng chuẩn phần dư tại điểm chưa khả thi. Hessian không bị chặn toàn miền không loại trừ phân tích trên tập mức có cận riêng.  BV §§9.6.1, 9.6.3 (9.49); MIT lec16; nối phép khử BV §10.1. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RS02 — Hàm tự điều chỉnh

- **Quyết định:** `sửa` ngày 2026-10-01: người dùng yêu cầu đánh dấu Tự học cho phần tự điều chỉnh; thêm nhãn "Tự học" (lớp chung `.self-study-badge`), đặt bằng nhãn nội dòng cuối tiêu đề. Đây là ngoại lệ có chủ ý theo chỉ dẫn cụ thể của người dùng đối với quy định AGENTS.md không hiển thị nhãn quy trình; không đổi nội dung toán, thứ tự hay điều hướng. Trước đó: `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề thành "Hàm tự điều chỉnh"; dòng mở nêu tỷ số $|\varphi'''|/(\varphi'')^{3/2}$ đo gì; định nghĩa có đủ lượng từ $x\in\operatorname{dom}f$, $v\in\mathbb R^n$, $x+tv\in\operatorname{dom}f$ và thuật ngữ gốc self-concordant; phép thử tại $s=1/4$ chuyển vào ghi chú. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: gộp và sửa; đối chiếu D02, D03. Tách chứng minh cho mọi s khỏi kiểm tra tại một điểm; không để con số128 thay lập luận.
- **Nội dung trên trang:** Bắt đầu từ VD2: $\varphi^{\prime\prime}=1/s^2$, $|\varphi^{\prime\prime\prime}|=2/s^3$ nên tỷ số bằng 2 trên toàn miền; tại $1/4$ có $128=2\cdot16^{3/2}$. Khái quát: hàm lồi $C^3$ trên miền mở lồi là tự điều chỉnh khi mọi hạn chế lên đường thẳng thỏa $|h^{\prime\prime\prime}|\le2(h^{\prime\prime})^{3/2}$.
- **Bố cục chọn:** Trái 45% tỷ số độ cong tương đối của ví dụ; phải định nghĩa tổng quát, hiện sau phép kiểm toàn miền. Một dòng kiểm số ở chân; không dùng số 128 làm chứng minh.
- **Lý do bố cục cho sinh viên năm 3:** Tách chứng minh cho mọi s khỏi kiểm tra tại một điểm; không để con số128 thay lập luận.
- **Vào → ra:** (2026-09-30) Đầu vào: nhu cầu so tốc độ thay đổi độ cong với chính độ cong (RS01). Đầu ra: lớp hàm tự điều chỉnh, VD2 đạt tỷ số 2, dùng cho cận ở RS03. Mô tả trước: Đầu vào: Với $s-\log s$, tỷ số $|\varphi'''|/(\varphi'')^{3/2}$ bằng $2$ với mọi $s>0$. Đầu ra: Bất đẳng thức này cho phép chặn sai số mục tiêu bằng độ giảm Newton khi thỏa thêm các giả thiết của cận.
- **Chuẩn và minh chứng:** LLO7 / CLO1; chuẩn bị thao tác được đo tại RS05.
- **Số liệu:** VD2 và hàm biên −log s; dàn ý §6–§7. Cận bằng sai số thật chỉ trong ví dụ đã tính.
- **Nguồn, ghi chú soạn:** BV §§9.6.1, 9.6.3 (9.49); MIT lec16; nối phép khử BV §10.1. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RS03 — Cận sai số theo độ giảm Newton

- **Quyết định:** `sửa` ngày 2026-10-01: người dùng yêu cầu đánh dấu Tự học cho phần tự điều chỉnh; thêm nhãn "Tự học" (lớp chung `.self-study-badge`), đặt bằng hàng nhãn `.slide-badge-row` phía trên tiêu đề, vì nhãn nội dòng kết thúc ở 854 px, đè nút điều hướng; trang còn dư 71 px nên vẫn vừa khung. Đây là ngoại lệ có chủ ý theo chỉ dẫn cụ thể của người dùng đối với quy định AGENTS.md không hiển thị nhãn quy trình; không đổi nội dung toán, thứ tự hay điều hướng. Trước đó: `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề thành "Cận sai số theo độ giảm Newton"; kết quả gắn nhãn "Định lý", bỏ giả thiết thừa "lồi chặt" (đã kéo theo từ $\nabla^2f\succ0$), dùng $f^*$; VD2 gọn một dòng; kết luận mới dùng khai triển $-\delta-\log(1-\delta)=\delta^2/2+\delta^3/3+\cdots$ để trả lời vấn đề tiêu chí dừng; bỏ hai khung lặp kết luận RN05. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: tách và sửa; đối chiếu D04. Có một đầu ra thực dụng cho phần tự điều chỉnh và thu hồi câu hỏi RN07 bằng đúng ví dụ cũ.
- **Nội dung trên trang:** Kết quả cho hàm tự điều chỉnh lồi chặt (còn gọi là lồi nghiêm ngặt), $H\succ0$, có nghiệm cực tiểu trong miền: nếu $\delta<1$ thì $f-f^*\le-\delta-\log(1-\delta)$. Với $\varphi$ tại $1/4$, $\delta=3/4$, cận $=\log4-3/4\approx0{,}63629$; $9/32$ chỉ là giảm mô hình. Sự bằng nhau giữa cận và sai số thật chỉ được xác nhận cho ví dụ log này.
- **Bố cục chọn:** Trên là hộp giả thiết và một bất đẳng thức; dưới thayδ=3/4 rồi so hai đại lượng bằng nhãn; chứng minh cận để ghi chú/tài liệu.
- **Lý do bố cục cho sinh viên năm 3:** Có một đầu ra thực dụng cho phần tự điều chỉnh và thu hồi câu hỏi RN07 bằng đúng ví dụ cũ.
- **Vào → ra:** (2026-09-30) Đầu vào: lớp hàm tự điều chỉnh (RS02) và $\delta$ của VD2. Đầu ra: cận sai số; khi $\delta$ nhỏ tiêu chí $\delta^2/2\le\varepsilon$ gần đúng chứng nhận sai số; câu hỏi dùng cận cho bài có đẳng thức (RS04). Mô tả trước: Đầu vào: Với hàm tự điều chỉnh có Hessian xác định dương và đạt cực tiểu, điều kiện $\delta<1$ cho cận $-\delta-\log(1-\delta)$. Đầu ra: Phép khử đẳng thức tạo hàm hợp affine; tính tự điều chỉnh của hàm rút gọn cho phép xét cùng cận trên các điểm khả thi.
- **Chuẩn và minh chứng:** LLO7 / CLO1; chuẩn bị thao tác được đo tại RS05.
- **Số liệu:** VD2 và hàm biên −log s; dàn ý §6–§7. Cận bằng sai số thật chỉ trong ví dụ đã tính.
- **Nguồn, ghi chú soạn:** BV §§9.6.1, 9.6.3 (9.49); MIT lec16; nối phép khử BV §10.1. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RS04 — Cận sai số với đẳng thức

- **Quyết định:** `sửa` ngày 2026-10-01: người dùng yêu cầu đánh dấu Tự học cho phần tự điều chỉnh; thêm nhãn "Tự học" (lớp chung `.self-study-badge`), đặt bằng nhãn nội dòng cuối tiêu đề. Đây là ngoại lệ có chủ ý theo chỉ dẫn cụ thể của người dùng đối với quy định AGENTS.md không hiển thị nhãn quy trình; không đổi nội dung toán, thứ tự hay điều hướng. Trước đó: `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề thành "Cận sai số với đẳng thức" (tiêu đề cũ đè nút điều hướng); thêm mắt xích độ giảm Newton của $\psi$ bằng $\delta_{eq}$ ($\Delta z^TN^THN\Delta z=d^THd$) và phát biểu cận cho $F(u)-F^*$; kết luận nối tiêu chí dừng của Newton khả thi và nêu cận không dùng cho $\|r\|_2$; câu về bất biến affine chuyển vào ghi chú; bố cục một cột với sơ đồ ngang. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: gộp và sửa; đối chiếu D03, D04. Kết nối phần bảo đảm với phép khử đã dùng, tránh định nghĩa tự điều chỉnh đứng riêng.
- **Nội dung trên trang:** Nếu $F$ tự điều chỉnh thì $\psi(z)=F(\hat u+Nz)$ cũng tự điều chỉnh trên miền tiền ảnh; đây chính là bài rút gọn đã học. Cận sai số chỉ dùng khi độ giảm Newton của hàm rút gọn nhỏ hơn 1 và thỏa các giả thiết của cận ở RS03: hàm rút gọn lồi chặt, Hessian xác định dương, đạt cực tiểu trong miền; tham chiếu dàn ý §5.7. Phân biệt bảo toàn lớp hàm qua hợp thành affine với tính bất biến của Newton dưới phép đổi tọa độ affine khả nghịch; tính bất biến sau không chỉ có ở hàm tự điều chỉnh.
- **Bố cục chọn:** Trái 45% sơ đồ z→u=û+Nz→F; phải điều kiện hàm rút gọn và liên hệ tiêu chí dừng khả thi; không đưa hệ số hội tụ mới.
- **Lý do bố cục cho sinh viên năm 3:** Kết nối phần bảo đảm với phép khử đã dùng, tránh định nghĩa tự điều chỉnh đứng riêng.
- **Vào → ra:** (2026-09-30) Đầu vào: định lý cận sai số (RS03), phép khử biến (RE06) và $\delta_{eq}$ (RE07). Đầu ra: cận $F(u)-F^*\le-\delta_{eq}-\log(1-\delta_{eq})$ tại điểm khả thi; câu hỏi kiểm giả thiết (RS05). Mô tả trước: Đầu vào: Hàm rút gọn $\psi(z)=F(\hat u+Nz)$ kế thừa tính tự điều chỉnh từ $F$. Đầu ra: Tính tự điều chỉnh chưa bảo đảm tồn tại nghiệm; các giả thiết về Hessian, nghiệm và độ giảm phải được kiểm riêng.
- **Chuẩn và minh chứng:** LLO7 / CLO1; chuẩn bị thao tác được đo tại RS05.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** Bất biến Newton cần điều kiện khả nghịch của Hessian hoặc hệ tính bước; hợp affine bảo toàn lớp hàm là kết quả riêng.  BV §§9.6.1, 9.6.3 (9.49); MIT lec16; nối phép khử BV §10.1. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/20 LT + 0 BT (LT xấp xỉ 0.0500; dùng phân số để cộng chính xác).

### RS05 — Giả thiết của cận sai số

- **Quyết định:** `sửa` ngày 2026-10-01: người dùng yêu cầu đánh dấu Tự học cho phần tự điều chỉnh; thêm nhãn "Tự học" (lớp chung `.self-study-badge`), đặt bằng nhãn nội dòng cuối tiêu đề. Đây là ngoại lệ có chủ ý theo chỉ dẫn cụ thể của người dùng đối với quy định AGENTS.md không hiển thị nhãn quy trình; không đổi nội dung toán, thứ tự hay điều hướng. Trước đó: `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề thành "Giả thiết của cận sai số"; giữ câu hỏi về tồn tại cực tiểu ($-\log s$ và $s-\log s$); thay hai câu đọc lại ($9/32$, thay $\delta$ bằng $\delta^2$) bằng câu chuyển giao tại điểm mới $s=3/2$ ($\delta=1/2$, cận $\log2-1/2$, sai số $1/2-\log\tfrac32$, giảm mô hình $1/8$); bỏ hai ô trang trí lặp tên hàm. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: sửa; đối chiếu D05. Chống đồng nhất tính tự điều chỉnh với tồn tại nghiệm và phân biệtδ vớiδ².
- **Nội dung trên trang:** Câu hỏi: $-\log s$ và $s-\log s$ có cùng đạo hàm bậc hai, ba; hàm nào đạt cực tiểu hữu hạn? Có được dùng $9/32$ làm cận sai số hoặc thay $\delta$ bằng $\delta^2$ trong biểu thức cận không?
- **Bố cục chọn:** Hai cột hai hàm, dưới là hai kết luận cần kiểm; đáp án nêu miền và tính đơn điệu của−log s.
- **Lý do bố cục cho sinh viên năm 3:** Chống đồng nhất tính tự điều chỉnh với tồn tại nghiệm và phân biệtδ vớiδ².
- **Vào → ra:** (2026-09-30) Đầu vào: định lý cận sai số (RS03) và VD2. Đầu ra: phân biệt giả thiết tồn tại nghiệm với tính tự điều chỉnh; cận đúng nhưng không chặt khi $s>1$; dẫn sang phần tổng hợp (RZ01). Mô tả trước: Đầu vào: Hai hàm $-\log s$ và $s-\log s$ có cùng đạo hàm bậc hai, bậc ba nhưng khác tính đạt cực tiểu. Đầu ra: Mỗi kết luận về bước lặp hoặc sai số phải đi kèm bài toán, đại lượng đo và giả thiết áp dụng.
- **Chuẩn và minh chứng:** LLO7 / CLO1; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** VD2 và hàm biên −log s; dàn ý §6–§7. Cận bằng sai số thật chỉ trong ví dụ đã tính.
- **Nguồn, ghi chú soạn:** BV §§9.6.1, 9.6.3 (9.49); MIT lec16; nối phép khử BV §10.1. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 1/10 BT; suy nghĩ 1/25 BT, chữa 3/50 BT.

### RZ01 — Khung chung của bước lặp

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề thành "Khung chung của bước lặp" (tiêu đề cũ chung chung, 817 px đè nút điều hướng); dòng mở nêu khung mô hình → KKT bài con → nhận bước → dừng; bảng bốn phương pháp với cột Dừng, gộp hàng chuẩn $W$ vào nhãn $W=I$, $W=H$; kết luận phân biệt cận theo độ giảm Newton (không cần hằng số), cận $\|g\|_2^2/(2\mu)$ (cần $\mu$) và $\|r\|_2$ (chỉ đo mức thỏa KKT). Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: sửa; đối chiếu Z01. Thu hồi chung một cách xây dựng phương pháp, thay bảng tên phương pháp như các lựa chọn rời nhau.
- **Nội dung trên trang:** Bảng: điều kiện tối ưu/bài con được chọn/hệ giải/đại lượng nhận bước. Các hàng gradient, chuẩn W, Newton, Newton khả thi, Newton phần dư; KKT đủ để chứng nhận nghiệm tối ưu trong lớp lồi. Dung sai mô hình hoặc phần dư chưa tự cho cận sai số; các giả thiết tự điều chỉnh đã nêu cho phép suy cận từ độ giảm Newton.
- **Bố cục chọn:** Bảng toàn chiều ngang, chỉ một công thức ngắn mỗi ô; giả thiết chi tiết tham chiếu lại nội dung đã học trong ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Thu hồi chung một cách xây dựng phương pháp, thay bảng tên phương pháp như các lựa chọn rời nhau.
- **Vào → ra:** (2026-09-30) Đầu vào: bốn phương pháp và cận sai số của phần tự điều chỉnh. Đầu ra: trả lời vấn đề trung tâm (bước lặp từ KKT bài con; tiêu chí dừng nào chứng nhận sai số); dẫn sang ứng dụng mô hình học (RZ02). Mô tả trước: Đầu vào: Gradient, giảm dốc nhất và Newton khác nhau ở bài toán chọn hướng; hai dạng Newton đẳng thức khác nhau ở ẩn và vế phải. Đầu ra: Với mô hình bình phương tối thiểu có điều chuẩn và đẳng thức, gradient và Hessian cung cấp trực tiếp các khối của hệ KKT.
- **Chuẩn và minh chứng:** LLO6–10 / CLO1–2; chuẩn bị thao tác được đo tại RZ02.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §5.5.3, §§9.2–9.6, 10.1–10.3; Bài 03 S05-06a/b; đề cương buổi 4. Ghi chú thu hồi cận $-\delta-\log(1-\delta)$ với $\delta<1$ và đủ giả thiết: hàm lồi chặt $C^3$, tự điều chỉnh chuẩn trên miền mở lồi, Hessian xác định dương trên miền, đạt cực tiểu hữu hạn trong miền. Cận dùng độ giảm Newton của bài không ràng buộc hoặc hàm rút gọn khả thi đúng giả thiết; không chuyển trực tiếp chuẩn phần dư thành cận sai số.
- **Dự toán nội bộ:** 1/40 LT + 0 BT (LT xấp xỉ 0.0250; dùng phân số để cộng chính xác).

### RZ02 — Hồi quy ridge có ràng buộc

- **Quyết định:** `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: đổi tiêu đề thành "Hồi quy ridge có ràng buộc"; thêm ý nghĩa AI của $M$, $y$, $\rho$, $Aw=b$; câu 1 hỏi thêm vì sao $H\succ0$; câu 2 dùng điểm đầu chưa khả thi $w=0$, $\nu=0$ và hỏi vì sao một bước đầy đủ cho nghiệm ($J$ bậc hai), thay mẫu điền ô; bỏ mũi tên trang trí; ghi chú dùng $^*$ và "Bài giảng 03". Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: gộp và sửa; đối chiếu E11, Z02. Đo chuyển giao quy trình suy ra sang AI và nối ứng dụng bài03, không chỉ thế công thức đã cho sẵn.
- **Nội dung trên trang:** Câu hỏi: $\min_w\frac12\|Mw-y\|_2^2+\frac\rho2\|w\|_2^2$ với $Aw=b$, $\rho>0$. Cho $M\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, $A\in\mathbb R^{p\times n}$ đủ hạng hàng, $b\in\mathbb R^p$. Mốc 1: tính $g,H$ và viết KKT. Mốc 2: dùng kết quả đó điền $r_d,r_p$ vào vế phải của mẫu hệ Newton đã học; không suy lại Jacobian. Trong phần chữa, phân biệt $\rho$ cho trước, $\nu$ là nhân tử của $Aw=b$ hiện tại và $\lambda$ là nhân tử ràng buộc chuẩn $\|w\|_2^2\le\tau$ ở Bài 03.
- **Bố cục chọn:** Trái 40% mô hình và kích thước; phải hai mốc nối bằng mũi tên trên cùng trang: mốc 1 tính $g,H$ và KKT, mốc 2 điền $r_d,r_p$ vào mẫu hệ Newton đã học; lời giải và VD3 phục hồi bằng $M=\operatorname{diag}(1,2)$, $y=0$, $\rho=1$ ở ghi chú.
- **Lý do bố cục cho sinh viên năm 3:** Đo chuyển giao quy trình suy ra sang AI và nối ứng dụng bài03, không chỉ thế công thức đã cho sẵn.
- **Vào → ra:** (2026-09-30) Đầu vào: khung chung (RZ01), hệ Newton cho phần dư KKT. Đầu ra: áp dụng khung vào mô hình học; kiểm số trùng VD3 ($d=(10,4)^T$, $\Delta\nu=-20$ từ $w=0$); dẫn sang bài tập (RZ03). Mô tả trước: Đầu vào: Số hạng $\rho\|w\|_2^2/2$ với $\rho>0$ cho $H=M^TM+\rho I\succ0$. Đầu ra: KKT và hai phần dư của mô hình học được lập bằng cùng phép đạo hàm và tuyến tính hóa đã dùng cho VD3.
- **Chuẩn và minh chứng:** LLO9 / CLO1; LLO10 / CLO2; sản phẩm và đáp án kiểm tra ở dàn ý §7.
- **Số liệu:** Ví dụ Bài 03 hoặc VD3 có nhãn nguồn/đổi bối cảnh; dàn ý §4 và §7. Không thay dữ kiện Bài 03.
- **Nguồn, ghi chú soạn:** BV §§9.4–9.6, 10.2–10.3; Bài 03 S05-06a/b; đề cương buổi 4. Đáp án chỉ trong ghi chú; mặt trang dùng nhãn “Câu hỏi:”.
- **Dự toán nội bộ:** 0 LT + 3/20 BT; suy nghĩ 3/50 BT, chữa 9/100 BT.

### RZ03 — Bài tập và tài liệu đọc

- **Quyết định:** `sửa` ngày 2026-10-01: người dùng yêu cầu đánh dấu Tự học; hàng "Tự điều chỉnh và cận sai số" ghi "Bài 7 (tự học)". Trước đó: `sửa` ngày 2026-09-30 theo lượt duyệt từng trang: giữ tiêu đề; thay bảng ba nhiệm vụ chung chung bằng bảng ánh xạ sáu phần của bài sang Bài 1–8 của tệp bài tập chính thức; tài liệu đọc thêm ghi chú bài giảng; ghi chú nêu bước đo của từng bài và câu nối sang Bài giảng 05. Trước đó: sửa văn phong và liên kết toán học ngày 2026-09-26, giữ cấu trúc và dữ kiện; quyết định cấu trúc đã triển khai: sửa; đối chiếu Z03. Kết thúc bằng năng lực quan sát được và nguồn để tự lấp chi tiết chứng minh.
- **Nội dung trên trang:** Giao ba sản phẩm: tự suy ra hướng từ bài con; tái tạo một lượt quay lui; suy ra và kiểm hai hệ Newton có đẳng thức. Boyd–Vandenberghe §5.5.3, §§9.2–9.6, 10.1–10.3; MIT lec16 rồi lec17.
- **Bố cục chọn:** Bảng nhiệm vụ/sản phẩm ba hàng; dưới tài liệu ngắn; không thêm chủ đề hoặc sơ đồ mới.
- **Lý do bố cục cho sinh viên năm 3:** Kết thúc bằng năng lực quan sát được và nguồn để tự lấp chi tiết chứng minh.
- **Vào → ra:** (2026-09-30) Đầu vào: khung chung (RZ01) và ứng dụng (RZ02). Đầu ra: bài tập khớp tệp `exercises.md` (Bài 1–8) và tài liệu đọc; nối sang tối ưu bậc nhất cho học máy ở Bài giảng 05. Mô tả trước: Đầu vào: Các bài tập yêu cầu suy ra hướng, thực hiện quay lui và lập hai hệ Newton có đẳng thức. Đầu ra: Nguồn đọc tương ứng là Boyd–Vandenberghe §5.5.3, §§9.2–9.6, 10.1–10.3 và MIT 6.079, bài giảng 16 rồi 17.
- **Chuẩn và minh chứng:** LLO6–10 / CLO1–2; củng cố kết quả đã kiểm tại RZ02 và giao nhiệm vụ tự học tương ứng LLO6–10.
- **Số liệu:** Không áp dụng: trang tổ chức/khái quát không dùng ví dụ số; ký hiệu và giả thiết vẫn phải được định nghĩa.
- **Nguồn, ghi chú soạn:** BV §5.5.3, §§9.2–9.6, 10.1–10.3; Bài 03 S05-06a/b; đề cương buổi 4. Giải thích phép tính/giả thiết và câu nối bằng lời; đại số dài theo dàn ý §5 chuyển vào ghi chú.
- **Dự toán nội bộ:** 1/40 LT + 0 BT (LT xấp xỉ 0.0250; dùng phân số để cộng chính xác).

## Các giới hạn bố cục đã duyệt và kiểm khi triển khai

| Trang | Quyết định giới hạn nội dung trên màn chiếu |
|---|---|
| RP02 | Bài toán đứng trước điều kiện trong từng cột; phép rút gọn từ bốn nhóm KKT là một dòng dưới hai cột; không còn chân trang $g$. Giữ hai hệ rút gọn ở vùng chính. Tính cần và đủ cùng giả thiết đầy đủ nằm trong ghi chú, không lặp chứng minh Bài 03. Đo 2026-09-30 ở 1600×900: đáy nội dung 820 px, đáy trang 829 px. |
| RG01 | Mặt trang có định nghĩa, tính chất $f'(x^0;d)=g^Td$ tách riêng, ba trường hợp dấu và một ví dụ tính; không đặt bảng dữ kiện và không đặt khung kết luận. Khai triển bậc một, hai hướng kiểm thêm, liên hệ Bài giảng 00 và ý "tối thiểu hóa riêng $g^Td$ không bị chặn dưới" nằm trong ghi chú. Đo 2026-09-30 ở 1600×900: 674/674, đáy nội dung 812 px so với 829 px; ở 390×844 chỉ công thức định nghĩa cuộn ngang trong `.formula`. |
| RG09 | Dải phụ bốn nhóm KKT có cỡ chữ thân bài; vùng chính chỉ ba bước: ζ>0 → biên hoạt động → v. Phép tính 4ζ² nằm trong ghi chú hoặc hiện thay dòng giữa, không thêm cả đoạn suy diễn. |
| RG10 | Vùng chính đổi độ dài từ v sang d; vùng dưới định nghĩa Q_W bằng một công thức và điều kiện dừng. Nếu hiện theo bước, thay nội dung cùng vùng sau khi đã đọc; không dồn hai chuỗi vào một thẻ hẹp. |
| RE01 | Hiện nhu cầu và hình trước; Lagrange, ba phương trình và mốc nghiệm hiện lần lượt, không bày đồng thời mọi phép giải. Phép giải mốc nghiệm trong ghi chú; RE05 mới tập trung giải bước. |
| RE04 | Hai phương trình chuyển vào ma trận theo hàng; kích thước trong một dòng nhãn riêng. Chứng minh khả nghịch ở ghi chú. |
| RE06 | Chỉ hiện d=NΔz, phương trình sau khử, và ba phép tính số ngắn. Đa thức ψ không lên mặt trang. |
| RR03 | Bảng đối chiếu ba hàng chỉ là ẩn/vế phải/điểm đầu; không lặp toàn bộ hai ma trận. Quan hệ η=ν+Δν một dòng. |
| RR05 | Mặt trang dùng đạo hàm của chuẩn phần dư, hiện phép chia cho chuẩn và điều kiện phần dư khác không. Ghi chú giải thích phép suy ra qua đạo hàm của nửa bình phương chuẩn. |
| RS03 | Một hộp giả thiết, một bất đẳng thức, một phép thay δ; chứng minh cận và điều kiện dừng theo ε ở tài liệu, không nhồi lên trang. |
| RZ01 | Dùng năm hàng, bốn cột; mỗi ô nhiều nhất một công thức hoặc một cụm từ. Giả thiết chi tiết ở ghi chú, không dùng bảng thay định lý. |

Bố cục và SVG đã tồn tại từ bản triển khai trước. Bản nháp biên tập ngày 2026-09-26 giữ cấu trúc đó nhưng chưa được kiểm định thị giác trong nhật ký này; cần kiểm lại 16:9 và màn hình hẹp sau khi chữ thay đổi.

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
