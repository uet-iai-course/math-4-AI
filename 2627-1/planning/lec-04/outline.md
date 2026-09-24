# Dàn bài Bài giảng 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

## Phạm vi bản lập kế hoạch ngày 2026-09-24

Bản này thay thế dàn ý 40 trang trước đó và đặc tả **46 trang, 7 mạch**, dành cho sinh viên năm 3. Bản này đã được triển khai vào RevealJS và đồng bộ với ghi chú, bài tập của Bài 04. Mã trang khớp 46 trang trong HTML; storyboard là căn cứ chính cho bố cục và mạch nối. Kết quả kiểm định và các điều chỉnh cục bộ được ghi trong review-log.md.

Thời lượng đúng đề cương: **2 tiết lý thuyết + 1 tiết bài tập**, đã gồm hoạt động kiểm tra và chữa bài. Chưa có căn cứ về số phút của một tiết nên không quy đổi; không dùng mặc định120 phút của skill. Các phần tiết dưới đây là dự toán nội bộ theo hoạt động, cần hiệu chỉnh khi diễn tập. Không đưa thời lượng, mã nội bộ hoặc nhãn quy trình lên trang chiếu/ghi chú diễn giả.

Vấn đề trung tâm: biến điều kiện tối ưu thành quy trình tạo dãy lặp, chọn bước và dừng có căn cứ; khi có đẳng thức, giữ hoặc phục hồi tính khả thi. Phạm vi gồm hàm khả vi lồi, gradient, giảm dốc nhất theo chuẩn, Newton, tính tự điều chỉnh và đẳng thức affine. Không giảng thuật toán điểm trong, tối ưu ngẫu nhiên, Newton cho đẳng thức phi tuyến hay chứng minh đầy đủ mọi cận độ phức tạp.

Nguồn phạm vi là đề cương DOCX chính thức (DC), bảng6 và bảng25, buổi4. Chương6–7 trong đề cương tương ứng chương9–10 của giáo trình Boyd–Vandenberghe (BV), không phải lỗi đánh số. Tiên quyết chính thức: Giải tích1, Xác suất thống kê, Đại số tuyến tính cho kỹ thuật; kiến thức dùng ngay được nhắc ở P03–P04. Xem [phân tích và ánh xạ nguồn](source-map.md), [đặc tả toán và sổ số](math-spec.md), [storyboard](storyboard.md), [nhật ký rà soát](review-log.md).

Mã HT1–HT13 chỉ các mục hình thức hóa trong [math-spec.md](math-spec.md); VD1–VD3 chỉ các ví dụ tự xây dựng ở cùng tệp. “Ghi chú soạn” chứa cả chỉ dẫn nội bộ; khi triển khai chỉ chuyển phần diễn giải và đáp án sang ghi chú diễn giả, loại mã trang và tỷ lệ thời gian hoạt động.

## Mục tiêu có thể đánh giá

| Mục tiêu | Chuẩn chính thức | Minh chứng trong bài |
|---|---|---|
| MT1: chọn hướng, tính bước và giải thích ảnh hưởng của chuẩn/độ cong | LLO6/CLO1 | A07,B06,C08 |
| MT2: kiểm tra điều kiện tự điều chỉnh và phân biệt với tồn tại nghiệm | LLO7/CLO1 | D05 |
| MT3: thực hiện đúng vòng gradient/Newton, chọn bước và mô tả tiêu chí dừng | LLO8/CLO2 | A07,C08,Z02 |
| MT4: lập hệ Newton cho đẳng thức và phân biệt hai chế độ khởi đầu | LLO9/CLO1 | E12,Z02 |
| MT5: tính phần dư, bước nguyên thủy–đối ngẫu và kiểm tra kết quả | LLO10/CLO2 | E09,E12,Z02 |

## Bản đồ các phần

| Phần | Đầu vào | Đầu ra dùng tiếp | Số trang | Tiết lý thuyết | Tiết bài tập | Trang kiểm tra riêng |
|---|---|---|---:|---:|---:|---|
| P. Mở đầu | Gradient, tích vô hướng, ma trận | Nhu cầu chọn hướng, bước, dừng và khả thi | 5 | 0.15 | 0.10 | P04 |
| A. Hướng giảm và chọn bước | Nhu cầu và dữ kiện VD1 | Một bước được Armijo chấp nhận | 7 | 0.30 | 0.15 | A07 |
| B. Gradient và chuẩn | Hướng giảm và cách chọn bước | Vai trò thước đo và độ cong | 6 | 0.25 | 0.10 | B06 |
| C. Newton không ràng buộc | Chuẩn bậc hai và hệ tuyến tính | Bước mô hình và giới hạn sai số mô hình | 8 | 0.40 | 0.15 | C08 |
| D. Hàm tự điều chỉnh | Hessian và VD2 | Điều kiện đạo hàm và giới hạn bảo đảm | 5 | 0.25 | 0.10 | D05 |
| E. Newton với đẳng thức | Newton và điều kiện KKT | Giữ hoặc phục hồi tính khả thi, áp dụng mô hình học | 12 | 0.55 | 0.30 | E12 |
| Z. Tổng hợp và kết luận | Kết quả của năm cụm kiến thức | Chọn quy trình kèm điều kiện và tiêu chí kiểm | 3 | 0.10 | 0.10 | Z02 |
| Tổng | | | 46 | 2.00 | 1.00 | 7 trang |

Không tách một phần thực hành riêng: tính tay, kiểm lỗi và vận dụng mô hình học gắn ngay vào khái niệm cần đo. Sáu trang tăng so với bản cũ dành cho động lực/kiểm tra mở đầu và các bước suy luận còn dồn trong phần đẳng thức; không thêm trang chia phần trang trí. Mỗi trang dưới đây có nội dung đủ để triển khai, quyết định bố cục và lý do riêng cho sinh viên năm3.

## Dàn bài chi tiết

### P00 — Tối ưu không ràng buộc và ràng buộc đẳng thức

- **Vai trò và mục tiêu:** định danh; LLO6–10
- **Luận điểm trung tâm:** Bài 04 xây dựng quy trình tính từ điều kiện tối ưu.
- **Nội dung cụ thể:** Cơ sở toán học cho AI; Bài 04; Trường Đại học Công nghệ, ĐHQGHN. Ghi đúng chủ đề; không đưa ký hiệu thuật toán lên trang mở đầu.
- **Hình và dữ kiện cần biểu diễn:** Không cần hình: tên học phần và chủ đề đủ để định hướng.
- **Quyết định bố cục:** Một cột; tên bài ở giữa, tên học phần phía trên, đơn vị phía dưới.
- **Lý do phù hợp sinh viên năm 3:** Sinh viên nhận ra phạm vi bài ngay trước khi gặp các nhánh phương pháp.
- **Ghi chú soạn và đáp án:** Nêu nhiệm vụ tính được một bước lặp và biết kiểm tra bước đó. Không hứa một phương pháp giải mọi bài toán.
- **Nguồn:** DC, buổi 4
- **Thời lượng nội bộ:** 0.01 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ mở bài; đầu ra là “Bài 04 xây dựng quy trình tính từ điều kiện tối ưu.”; chuyển sang P01 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### P01 — Nội dung bài học

- **Vai trò và mục tiêu:** bản đồ; LLO6–10
- **Luận điểm trung tâm:** Năm cụm kiến thức cùng phục vụ việc chọn và kiểm tra một bước lặp.
- **Nội dung cụ thể:** Hướng giảm và chọn bước → gradient và chuẩn → Newton → hàm tự điều chỉnh → ràng buộc đẳng thức; mở đầu và kết luận bao quanh năm cụm này.
- **Hình và dữ kiện cần biểu diễn:** Sơ đồ năm nút có mũi tên; mỗi nút ghi kết quả: hướng, thước đo, mô hình, bảo đảm, tính khả thi.
- **Quyết định bố cục:** Một dải ngang năm nút; câu nhiệm vụ nằm dưới, tối đa hai dòng.
- **Lý do phù hợp sinh viên năm 3:** Cho sinh viên thấy kết quả của từng cụm được dùng ở đâu, thay vì ghi nhớ một danh sách thuật toán.
- **Ghi chú soạn và đáp án:** Đọc mũi tên theo phụ thuộc: hướng giảm cần chọn bước; chọn chuẩn thay đổi hướng; chuẩn bậc hai dẫn tới Newton; sai số mô hình cần bảo đảm; ràng buộc buộc sửa hệ Newton. Không dùng mã trang hay thời lượng trên mặt trang.
- **Nguồn:** DC; M16 10–1; M17 11–1
- **Thời lượng nội bộ:** 0.02 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ P00; đầu ra là “Năm cụm kiến thức cùng phục vụ việc chọn và kiểm tra một bước lặp.”; chuyển sang P02 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### P02 — Bước lặp và điều kiện chấp nhận

- **Vai trò và mục tiêu:** nhu cầu; LLO6,8,9,10
- **Luận điểm trung tâm:** Biết nghiệm phải thỏa điều kiện gì chưa đủ để tạo một dãy lặp dùng được.
- **Nội dung cụ thể:** Hai nhiệm vụ: giảm $f(x)=\tfrac12(3x_1^2+7x_2^2)$ từ $(2,4)$; giảm $F(u)=\tfrac12(2u_1^2+5u_2^2)$ khi $u_1+u_2=14$. Cần chọn hướng, độ dài bước và tiêu chí dừng; bài thứ hai còn phải giữ hoặc phục hồi ràng buộc.
- **Hình và dữ kiện cần biểu diễn:** Hai miền: đường đồng mức của f; đường thẳng tổng cố định cắt đường đồng mức của F. Chưa hiện nghiệm hoặc hệ KKT.
- **Quyết định bố cục:** Hai cột 1:1 với cùng thứ tự dữ kiện → nhiệm vụ; một câu kết ở đáy.
- **Lý do phù hợp sinh viên năm 3:** Đối chiếu hai nhiệm vụ cụ thể tạo nhu cầu trước khi giới thiệu công thức tổng quát.
- **Ghi chú soạn và đáp án:** Đây là dữ liệu minh họa tự xây dựng, không phải thực nghiệm. Chỉ nhận dạng khác biệt; phép tính chi tiết bắt đầu ở phần A và E.
- **Nguồn:** VD1, VD3 tự xây dựng; BV §9.1, §10.1
- **Thời lượng nội bộ:** 0.06 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ P01; đầu ra là “Biết nghiệm phải thỏa điều kiện gì chưa đủ để tạo một dãy lặp dùng được.”; chuyển sang P03 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### P03 — Mục tiêu và kiến thức sử dụng

- **Vai trò và mục tiêu:** tiên quyết; LLO6–10/CLO1,2
- **Luận điểm trung tâm:** Mỗi mục tiêu được kiểm bằng thao tác hoặc giải thích có điều kiện.
- **Nội dung cụ thể:** Tính hướng và chọn bước; giải thích vai trò độ cong; kiểm tra tính tự điều chỉnh; giải một bước Newton có đẳng thức. Nhắc $x,g,d\in\mathbb R^n$, $H\in\mathbb R^{n\times n}$; gradient, Hessian, chuẩn, xác định dương và hệ tuyến tính; điều kiện Karush–Kuhn–Tucker (KKT) đã học.
- **Hình và dữ kiện cần biểu diễn:** Bảng hai cột thao tác cần làm / kiến thức đã có; ký hiệu đặt sát thao tác tương ứng.
- **Quyết định bố cục:** Hai cột 3:2: bên trái bốn mục tiêu, bên phải khung ký hiệu.
- **Lý do phù hợp sinh viên năm 3:** Tách mục tiêu khỏi bảng ký hiệu giúp sinh viên biết điều phải làm trước khi đọc các đại lượng.
- **Ghi chú soạn và đáp án:** LLO là chuẩn đầu ra bài học; CLO là chuẩn đầu ra học phần. Không giả định đã học hàm tự điều chỉnh hoặc Newton khởi đầu không khả thi. Nhắc tích vô hướng khi chữa trang kế.
- **Nguồn:** DC T6R5, T25R30–39; BV §9.1
- **Thời lượng nội bộ:** 0.06 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ P02; đầu ra là “Mỗi mục tiêu được kiểm bằng thao tác hoặc giải thích có điều kiện.”; chuyển sang P04 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### P04 — Kiểm tra tiên quyết

- **Vai trò và mục tiêu:** bài tập; tiên quyết cho LLO6,9; không chứng nhận hoàn thành LLO
- **Luận điểm trung tâm:** Tích vô hướng và phép nhân ma trận đủ để kiểm tra hai tính chất cơ bản.
- **Nội dung cụ thể:** Câu hỏi: Cho $g=(6,28)^T$, $d=(-2,1)^T$, $A=[1\;1]$, $v=(7,-7)^T$. Tính $g^Td$ và $Av$; giải thích $Av=0$ có nghĩa gì đối với tổng hai tọa độ.
- **Hình và dữ kiện cần biểu diễn:** Hai phép tính đặt độc lập; chưa gọi d là hướng giảm.
- **Quyết định bố cục:** Hai khung câu hỏi ngang hàng; chừa nửa dưới để người học tự tính.
- **Lý do phù hợp sinh viên năm 3:** Kiểm tra đúng tiên quyết, không đòi hỏi định nghĩa sẽ được dạy ở phần A.
- **Ghi chú soạn và đáp án:** Đáp án: $g^Td=16$, $Av=0$; cộng $tv$ không đổi tổng tọa độ. Tiêu chí: đúng hai tích và giải thích bảo toàn tổng; chưa chấm thuật ngữ hướng giảm. Thời gian bài tập gồm suy nghĩ 50%, trao đổi 20%, chữa 30%.
- **Nguồn:** Câu hỏi tự xây dựng từ VD1, VD3
- **Thời lượng nội bộ:** 0.00 tiết lý thuyết + 0.10 tiết bài tập
- **Kết nối:** nhận kết quả từ P03; đầu ra là “Tích vô hướng và phép nhân ma trận đủ để kiểm tra hai tính chất cơ bản.”; chuyển sang A01 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### A01 — Mục tiêu giảm hàm

- **Vai trò và mục tiêu:** nhu cầu + ví dụ dẫn nhập; LLO6,8
- **Luận điểm trung tâm:** Một điểm khởi đầu và một hàm cụ thể cho phép quan sát tác động của bước lặp.
- **Nội dung cụ thể:** VD1: $f(x)=\tfrac12(3x_1^2+7x_2^2)$ trên $\mathbb R^2$, $x^0=(2,4)^T$; $g^0=(6,28)^T$, $H=\operatorname{diag}(3,7)$, $f(x^0)=62$. Nhu cầu: tìm điểm mới có giá trị nhỏ hơn 62.
- **Hình và dữ kiện cần biểu diễn:** Đường đồng mức 15, 35, 62; đánh dấu x0, g0 bằng mũi tên có nhãn. Trục x1,x2 không có đơn vị vật lý.
- **Quyết định bố cục:** Hình 60% bên trái; bảng năm dữ kiện 40% bên phải.
- **Lý do phù hợp sinh viên năm 3:** Mỗi đại lượng có tên và số riêng; hình nối dữ kiện đại số với vị trí trong mặt phẳng.
- **Ghi chú soạn và đáp án:** Tính gradient theo từng tọa độ. Hệ số 3 và 7 khác nhau; tọa độ 2 và 4 khác nhau; hai thành phần gradient không trùng nhau. Không gọi mức chênh này là kém điều kiện nghiêm trọng.
- **Nguồn:** M16 10–2,10–8; BV §9.1,9.3; VD1
- **Thời lượng nội bộ:** 0.03 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ P04; đầu ra là “Một điểm khởi đầu và một hàm cụ thể cho phép quan sát tác động của bước lặp.”; chuyển sang A02 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### A02 — Trực quan hướng giảm

- **Vai trò và mục tiêu:** trực quan; LLO6
- **Luận điểm trung tâm:** Chiếu hướng đi lên gradient dự báo biến thiên bậc nhất.
- **Nội dung cụ thể:** Giữ điểm $x^0$; vẽ ba hướng có tích $g^Td$ âm, bằng 0 và dương. Giải thích dự báo chỉ có ý nghĩa cục bộ; bước dài vẫn có thể tăng hàm.
- **Hình và dữ kiện cần biểu diễn:** Một hình đồng mức; ba mũi tên dùng nhãn âm/0/dương và kiểu nét khác nhau, không chỉ dùng màu.
- **Quyết định bố cục:** Hình chiếm 2/3 trang; bên phải ba nhãn; câu giới hạn ở dưới.
- **Lý do phù hợp sinh viên năm 3:** Sinh viên đối chiếu cùng một điểm và cùng gradient, chỉ thay hướng nên dễ nhận ra cơ chế.
- **Ghi chú soạn và đáp án:** Hướng vuông góc gradient có đạo hàm hướng bằng 0, không suy ra hàm không đổi trên cả đường. Chưa đưa Armijo.
- **Nguồn:** M16 10–5; BV §9.2
- **Thời lượng nội bộ:** 0.04 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ A01; đầu ra là “Chiếu hướng đi lên gradient dự báo biến thiên bậc nhất.”; chuyển sang A03 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### A03 — Kiểm tra hướng bằng số

- **Vai trò và mục tiêu:** ví dụ; LLO6,8
- **Luận điểm trung tâm:** Dấu của tích vô hướng kiểm tra được bằng một phép tính ngắn.
- **Nội dung cụ thể:** Với $g=(6,28)^T$, chọn $d=-g=(-6,-28)^T$: $g^Td=-820$. So sánh $v=(-2,1)^T$ cho $g^Tv=16$. Cùng điểm nhưng chỉ hướng thứ nhất có dự báo giảm.
- **Hình và dữ kiện cần biểu diễn:** Bảng hướng / tích vô hướng / dự báo; hiện từng hàng sau câu trả lời.
- **Quyết định bố cục:** Bảng ba cột ở trung tâm; g được cố định trong một dòng phía trên.
- **Lý do phù hợp sinh viên năm 3:** Cố định dữ kiện chung và đổi đúng một yếu tố giúp phân biệt gradient với hướng di chuyển.
- **Ghi chú soạn và đáp án:** Nhắc lại đáp án P04 để biến kiểm tra tiên quyết thành ý nghĩa mới. Hỏi dấu trước khi nhân số; không lẫn -820 với bình phương chuẩn 820.
- **Nguồn:** VD1; BV §9.2
- **Thời lượng nội bộ:** 0.03 tiết lý thuyết + 0.03 tiết bài tập
- **Kết nối:** nhận kết quả từ A02; đầu ra là “Dấu của tích vô hướng kiểm tra được bằng một phép tính ngắn.”; chuyển sang A04 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### A04 — Hướng giảm và độ dài bước

- **Vai trò và mục tiêu:** hình thức; LLO6,8
- **Luận điểm trung tâm:** Hướng xác định đường đi; độ dài bước xác định điểm được chấp nhận.
- **Nội dung cụ thể:** Định nghĩa: với $f$ khả vi, $d$ là hướng giảm tại $x$ nếu $\nabla f(x)^Td<0$. Do đạo hàm âm, tồn tại bước dương đủ nhỏ làm giảm hàm. Cập nhật $x^+=x+td$. Tìm chính xác tối thiểu hóa $f(x+td)$ trên miền hợp lệ; quay lui tìm bước thỏa mức giảm đủ.
- **Hình và dữ kiện cần biểu diễn:** Một tia từ x; điểm t lớn và t nhỏ; biểu đồ một biến f(x+td) phía dưới nếu đủ chỗ.
- **Quyết định bố cục:** Trên: công thức cập nhật lớn; dưới: hai cột hướng / độ dài bước.
- **Lý do phù hợp sinh viên năm 3:** Chia hai quyết định trước khi trình bày vòng lặp giúp sinh viên không coi d và t là một tham số.
- **Ghi chú soạn và đáp án:** Phác thảo chứng minh từ khai triển bậc nhất và phần dư nhỏ hơn bậc một. Điều kiện dấu âm không bảo đảm mọi t>0. Không cần công thức nghiệm của tìm bước chính xác.
- **Nguồn:** HT1; M16 10–5,10–6; BV §9.2
- **Thời lượng nội bộ:** 0.06 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ A03; đầu ra là “Hướng xác định đường đi; độ dài bước xác định điểm được chấp nhận.”; chuyển sang A05 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### A05 — Quay lui Armijo

- **Vai trò và mục tiêu:** thuật toán; LLO8
- **Luận điểm trung tâm:** Quay lui kiểm tra miền xác định và mức giảm đủ trước khi cập nhật.
- **Nội dung cụ thể:** Đầu vào $x,d$, $g^Td<0$, $0<\alpha<1/2$, $0<\beta<1$. Khởi tạo $t=1$; khi $x+td\notin\operatorname{dom}f$ hoặc $f(x+td)>f(x)+\alpha t g^Td$, đặt $t\leftarrow\beta t$. Trả t đầu tiên thỏa cả hai kiểm tra.
- **Hình và dữ kiện cần biểu diễn:** Sơ đồ thử → kiểm tra miền → kiểm tra Armijo → nhận hoặc co bước; nhãn t quay lại.
- **Quyết định bố cục:** Giả mã bên trái 60%; đồ thị hàm theo t và đường Armijo bên phải 40%.
- **Lý do phù hợp sinh viên năm 3:** Đặt điều kiện toán cạnh đúng nhánh xử lý giúp người học chuyển từ tính tay sang thực hiện thuật toán.
- **Ghi chú soạn và đáp án:** Số lần đánh giá hàm phụ thuộc số lần co. Với hướng giảm và hàm khả vi quanh x, bước đủ nhỏ được nhận. Khi lập trình thêm giới hạn vòng lặp và báo thất bại, không nhận tùy tiện một bước không đạt.
- **Nguồn:** HT2; M16 10–6; BV §9.2.1
- **Thời lượng nội bộ:** 0.06 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ A04; đầu ra là “Quay lui kiểm tra miền xác định và mức giảm đủ trước khi cập nhật.”; chuyển sang A06 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### A06 — Một lượt quay lui

- **Vai trò và mục tiêu:** ứng dụng; LLO6,8
- **Luận điểm trung tâm:** Armijo chọn bước đầu tiên đạt điều kiện, không nhất thiết là bước tốt nhất trên tia.
- **Nội dung cụ thể:** VD1 dùng $d=-g=(-6,-28)^T$, $\alpha=0{,}1$, $\beta=0{,}5$. Bảng có cột t, điểm thử, giá trị hàm và **ngưỡng Armijo** $f(x^0)+\alpha t g^Td=62-82t$: $1;(-4,-24);2040;-20$; $1/2;(-1,-10);703/2;21$; $1/4;(1/2,-3);255/8;83/2$. Nhận $t=1/4$.
- **Hình và dữ kiện cần biểu diễn:** Bảng ba hàng thử; đánh dấu loại/loại/nhận bằng chữ. Đường đi chỉ hiện từ x0 tới điểm được nhận.
- **Quyết định bố cục:** Bảng rộng toàn trang; nhấn một hàng cuối, kết luận một dòng phía dưới.
- **Lý do phù hợp sinh viên năm 3:** Cùng một bảng chứa giá trị thực và ngưỡng nên sinh viên không phải nhớ số giữa hai trang.
- **Ghi chú soạn và đáp án:** Làm rõ đây là hướng gradient; với hướng Newton của cùng ví dụ, t=1 lại được nhận ngay. Phần lý thuyết giải thích quy tắc và làm mẫu một hàng; phần bài tập kiểm hai hàng đã cho, không yêu cầu tính lại toàn bảng từ đầu.
- **Nguồn:** VD1; HT2
- **Thời lượng nội bộ:** 0.08 tiết lý thuyết + 0.03 tiết bài tập
- **Kết nối:** nhận kết quả từ A05; đầu ra là “Armijo chọn bước đầu tiên đạt điều kiện, không nhất thiết là bước tốt nhất trên tia.”; chuyển sang A07 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### A07 — Kiểm tra quy tắc nhận bước

- **Vai trò và mục tiêu:** bài tập; LLO6,8
- **Luận điểm trung tâm:** Một bước đã đạt Armijo kết thúc vòng quay lui.
- **Nội dung cụ thể:** Câu hỏi: Dùng bảng vừa tính: tại $t=1/4$, giá trị hàm là $255/8$, ngưỡng Armijo là $83/2$. Mã tiếp tục thử $t=1/8$ vì mong giá trị hàm nhỏ hơn. Chỉ ra dòng sai và điểm phải trả về.
- **Hình và dữ kiện cần biểu diễn:** Đoạn giả mã ba dòng: kiểm tra, co, trả; sinh viên gạch dòng đặt sai vị trí.
- **Quyết định bố cục:** Câu hỏi trên 1/3 trang; giả mã lớn bên dưới; đáp án chỉ trong ghi chú.
- **Lý do phù hợp sinh viên năm 3:** Phát hiện lỗi thao tác đo khả năng thực hiện quy tắc, vượt việc chép lại phép tính A06.
- **Ghi chú soạn và đáp án:** Đáp án: $255/8=31{,}875\le41{,}5=83/2$, phải dừng và trả $(1/2,-3)^T$; chỉ co khi điều kiện chưa đạt. Tiêu chí: đúng bất đẳng thức và vị trí cập nhật; 50% tự làm,20% trao đổi,30% chữa.
- **Nguồn:** Câu hỏi tự xây dựng; HT2
- **Thời lượng nội bộ:** 0.00 tiết lý thuyết + 0.09 tiết bài tập
- **Kết nối:** nhận kết quả từ A06; đầu ra là “Một bước đã đạt Armijo kết thúc vòng quay lui.”; chuyển sang B01 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### B01 — Độ cong và đường đi

- **Vai trò và mục tiêu:** nhu cầu + trực quan; LLO6
- **Luận điểm trung tâm:** Độ cong khác nhau theo tọa độ làm cùng một bước gradient co khác nhau theo mỗi trục.
- **Nội dung cụ thể:** VD1 với bước cố định $t=1/4$ cho $x_1^+=x_1/4$, $x_2^+=-3x_2/4$. Đường đi đổi dấu theo trục thứ hai. Nhu cầu: đo độ dài hướng theo hình học phù hợp với hàm.
- **Hình và dữ kiện cần biểu diễn:** Đường đồng mức với bốn điểm của quỹ đạo cố định, đánh số k; nhãn hệ số co 1/4 và -3/4 ở hai trục.
- **Quyết định bố cục:** Hình 65% bên trái; hai công thức co bên phải.
- **Lý do phù hợp sinh viên năm 3:** Hình giải thích sự đổi hướng từ phép tính đã biết mà chưa cần định lý hội tụ tổng quát.
- **Ghi chú soạn và đáp án:** Quỹ đạo này dùng bước cố định minh họa, không tuyên bố mọi lần quay lui đều trả 1/4. Số điều kiện 7/3 chỉ ở mức vừa; không phóng đại hiện tượng.
- **Nguồn:** M16 10–8; BV §9.3; VD1
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ A07; đầu ra là “Độ cong khác nhau theo tọa độ làm cùng một bước gradient co khác nhau theo mỗi trục.”; chuyển sang B02 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### B02 — Hai thước đo độ dài

- **Vai trò và mục tiêu:** trực quan + ví dụ; LLO6
- **Luận điểm trung tâm:** Hướng dốc nhất phụ thuộc tập hướng được coi là dài không quá một.
- **Nội dung cụ thể:** Giữ $g=(6,28)^T$. Với cầu Euclid, hướng đơn vị cực tiểu là $(-6,-28)^T/\sqrt{820}$. Với $W=\operatorname{diag}(3,7)$ và $d^TWd\le1$, hướng tương ứng là $(-2,-4)^T/\sqrt{124}$. Kiểm tra mỗi hướng nằm trên biên tập của nó.
- **Hình và dữ kiện cần biểu diễn:** Hai hình cùng g: đường tròn và elip d^TWd=1; tiếp tuyến có cùng pháp tuyến g; ghi rõ hai chuẩn khác nhau.
- **Quyết định bố cục:** Hai hình 1:1; dưới mỗi hình là hướng và chuẩn của nó.
- **Lý do phù hợp sinh viên năm 3:** So sánh cùng gradient nhưng khác tập đơn vị làm rõ vai trò của chuẩn, tránh đồng nhất dốc nhất với âm gradient.
- **Ghi chú soạn và đáp án:** Không so trực tiếp độ lớn g^Td để kết luận thuật toán nào nhanh hơn: ngân sách độ dài thuộc hai chuẩn khác nhau. Dùng kiểm tra bình phương chuẩn để tránh tính căn gần đúng.
- **Nguồn:** M16 10–11,10–12; BV §9.4; VD1
- **Thời lượng nội bộ:** 0.04 tiết lý thuyết + 0.02 tiết bài tập
- **Kết nối:** nhận kết quả từ B01; đầu ra là “Hướng dốc nhất phụ thuộc tập hướng được coi là dài không quá một.”; chuyển sang B03 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### B03 — Giảm dốc nhất theo chuẩn

- **Vai trò và mục tiêu:** hình thức; LLO6
- **Luận điểm trung tâm:** Giảm dốc nhất tối thiểu hóa mô hình tuyến tính dưới một giới hạn độ dài đã chọn.
- **Nội dung cụ thể:** Với $g\ne0$, $v\in\arg\min_{\|v\|\le1}g^Tv$ là hướng chuẩn hóa. Quy ước hướng không chuẩn hóa $d=\|g\|_*v$ với chuẩn đối ngẫu $\|g\|_*=\max_{\|v\|\le1}g^Tv$. Với chuẩn Euclid: $v=-g/\|g\|_2$, $d=-g$.
- **Hình và dữ kiện cần biểu diễn:** Khung định nghĩa và trường hợp Euclid; mũi tên chỉ hai dạng cùng tia nhưng khác độ dài.
- **Quyết định bố cục:** Định nghĩa ở nửa trên; hai ô chuẩn hóa / không chuẩn hóa ở dưới.
- **Lý do phù hợp sinh viên năm 3:** Ghi quy ước trước ví dụ tiếp theo giúp sinh viên không tưởng hai công thức hướng mâu thuẫn.
- **Ghi chú soạn và đáp án:** Chỉ phát biểu chuẩn đối ngẫu đủ dùng; phác thảo bằng bất đẳng thức Cauchy–Schwarz cho Euclid, không chứng minh lý thuyết chuẩn tổng quát. Khi g=0 thì dừng thay vì chia cho chuẩn.
- **Nguồn:** HT3; M16 10–11; BV §9.4.1
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ B02; đầu ra là “Giảm dốc nhất tối thiểu hóa mô hình tuyến tính dưới một giới hạn độ dài đã chọn.”; chuyển sang B04 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### B04 — Chuẩn bậc hai và tiền điều kiện

- **Vai trò và mục tiêu:** ứng dụng; LLO6,8
- **Luận điểm trung tâm:** Một ma trận xác định dương biến việc chọn hướng thành giải hệ tuyến tính.
- **Nội dung cụ thể:** Với $W\succ0$, $\|v\|_W=\sqrt{v^TWv}$, hướng không chuẩn hóa thỏa $Wd=-g$. VD1 chọn W cố định bằng diag(3,7), được $d=(-2,-4)^T$. Trong bài toán bình phương tối thiểu, W chéo xấp xỉ độ cong giúp cân bằng các tọa độ.
- **Hình và dữ kiện cần biểu diễn:** Bảng g → hệ Wd=-g → d; cạnh đó hình elip thành hình tròn qua đổi tọa độ.
- **Quyết định bố cục:** Bên trái hệ và nghiệm chiếm 55%; bên phải sơ đồ đổi thước đo 45%.
- **Lý do phù hợp sinh viên năm 3:** Liên hệ chuẩn với phép giải hệ quen thuộc chuẩn bị trực tiếp cho Newton ở phần C.
- **Ghi chú soạn và đáp án:** Tính d bằng giải hệ; ký hiệu W^-1 chỉ dùng để suy luận. W cố định là tiền điều kiện, H(x) sẽ thay theo điểm trong Newton tổng quát.
- **Nguồn:** HT3; M16 10–13; BV §9.4.2
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ B03; đầu ra là “Một ma trận xác định dương biến việc chọn hướng thành giải hệ tuyến tính.”; chuyển sang B05 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### B05 — Hội tụ của giảm gradient

- **Vai trò và mục tiêu:** giới hạn và bảo đảm; LLO6,8
- **Luận điểm trung tâm:** Tốc độ tuyến tính cần giả thiết về độ cong, không suy ra chỉ từ hình đường đi.
- **Nội dung cụ thể:** Giả sử f lồi mạnh với hằng số $\mu>0$, gradient Lipschitz với hằng số L, có nghiệm tối ưu. Bước cố định $1/L$ cho $f(x^k)-f^*\le(1-\mu/L)^k(f(x^0)-f^*)$. VD1: $\mu=3,L=7$, hệ số chặn $4/7$. Dừng thực hành khi chuẩn gradient nhỏ; mỗi vòng cần gradient và đánh giá hàm khi tìm bước.
- **Hình và dữ kiện cần biểu diễn:** Một bảng giả thiết → bước → bảo đảm; không vẽ số liệu thực nghiệm giả.
- **Quyết định bố cục:** Công thức chặn ở giữa; giả thiết trên, ý nghĩa của hệ số dưới.
- **Lý do phù hợp sinh viên năm 3:** Giữ giả thiết sát kết luận để sinh viên không mang bảo đảm lồi mạnh sang bài phi lồi.
- **Ghi chú soạn và đáp án:** Đây là chặn lý thuyết cho bước 1/L, không gán cho mọi bước Armijo. Phác thảo: bổ đề giảm trơn rồi dùng chuẩn gradient bình phương ≥2μ lần sai số. Chi phí phụ thuộc hàm, không mặc định O(n) cho mọi gradient.
- **Nguồn:** HT4; BV §9.3.1–9.3.2
- **Thời lượng nội bộ:** 0.06 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ B04; đầu ra là “Tốc độ tuyến tính cần giả thiết về độ cong, không suy ra chỉ từ hình đường đi.”; chuyển sang B06 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### B06 — Kiểm tra lựa chọn chuẩn

- **Vai trò và mục tiêu:** bài tập; LLO6,8
- **Luận điểm trung tâm:** So sánh hướng cần nêu chuẩn và quy ước chuẩn hóa.
- **Nội dung cụ thể:** Câu hỏi: Với $g=(6,28)^T$, $W=\operatorname{diag}(3,7)$, hai báo cáo ghi $d_a=(-6,-28)^T$, $d_b=(-2,-4)^T$. Báo cáo nào là giảm dốc nhất Euclid không chuẩn hóa? Báo cáo nào giải $Wd=-g$? Có thể so số vòng hội tụ chỉ từ độ dài hai vectơ không?
- **Hình và dữ kiện cần biểu diễn:** Hai vectơ và W trong một bảng dữ kiện, câu trả lời cần gắn nhãn cho từng vectơ.
- **Quyết định bố cục:** Dữ kiện trên; ba yêu cầu đánh số ở dưới; không dùng hình mới.
- **Lý do phù hợp sinh viên năm 3:** Kiểm tra đúng hai ranh giới: chuẩn lựa chọn và bằng chứng về tốc độ.
- **Ghi chú soạn và đáp án:** Đáp án: da thuộc Euclid; db thuộc W; không kết luận tốc độ từ hai độ dài, còn phụ thuộc bước, hàm và điểm đầu. Tiêu chí: đúng hai nhãn và lý do; 50/20/30% cho tự làm/trao đổi/chữa.
- **Nguồn:** Câu hỏi tự xây dựng; HT3,HT4
- **Thời lượng nội bộ:** 0.00 tiết lý thuyết + 0.08 tiết bài tập
- **Kết nối:** nhận kết quả từ B05; đầu ra là “So sánh hướng cần nêu chuẩn và quy ước chuẩn hóa.”; chuyển sang C01 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### C01 — Mô hình bậc hai cục bộ

- **Vai trò và mục tiêu:** nhu cầu + trực quan; LLO6
- **Luận điểm trung tâm:** Hessian cung cấp thước đo thay đổi theo điểm khi độ cong không cố định.
- **Nội dung cụ thể:** Giảm gradient chỉ dùng tiếp tuyến; một mô hình bậc hai còn mô tả độ cong quanh x. Với VD1, mô hình bậc hai trùng hàm thật, nên có thể tìm nghiệm mô hình bằng giải một hệ.
- **Hình và dữ kiện cần biểu diễn:** Hình một biến minh họa hàm, tiếp tuyến và parabol tại cùng điểm; ghi đây là sơ đồ khái niệm, không thay đồ thị VD1.
- **Quyết định bố cục:** Hình chiếm 70%; bên phải hai dòng tiếp tuyến / độ cong.
- **Lý do phù hợp sinh viên năm 3:** Động cơ hình học có trước hệ Newton để sinh viên hiểu tại sao cần Hessian.
- **Ghi chú soạn và đáp án:** Không nói parabol trùng hàm thật với hàm bất kỳ; đó là tính chất riêng của hàm bậc hai. Chuyển từ W cố định sang H(x).
- **Nguồn:** M16 10–14; BV §9.5.1
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ B06; đầu ra là “Hessian cung cấp thước đo thay đổi theo điểm khi độ cong không cố định.”; chuyển sang C02 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### C02 — Nghiệm mô hình trong ví dụ bậc hai

- **Vai trò và mục tiêu:** ví dụ; LLO6,8
- **Luận điểm trung tâm:** Hai phép chia theo độ cong cho một bước đến nghiệm của VD1.
- **Nội dung cụ thể:** Tại $(2,4)$, mô hình theo d có phần biến thiên $6d_1+28d_2+\tfrac12(3d_1^2+7d_2^2)$. Lấy đạo hàm theo d: $3d_1=-6$, $7d_2=-28$, nên $d=(-2,-4)$ và $x+d=(0,0)$.
- **Hình và dữ kiện cần biểu diễn:** Ba hàng: mô hình → hai phương trình → điểm mới; nối điểm đầu và nghiệm trên hình nhỏ.
- **Quyết định bố cục:** Phép tính căn dọc 2/3 trang; hình xác nhận ở 1/3 bên phải.
- **Lý do phù hợp sinh viên năm 3:** Tính tay trong hai chiều tạo điểm tựa trước khi thay hai phương trình bằng ký hiệu ma trận.
- **Ghi chú soạn và đáp án:** Nhấn bước Newton không bằng âm gradient. Bước đầy đủ được Armijo nhận với α<1/2. Nghiệm sau một bước là do mô hình chính xác, không phải tính chất phổ quát.
- **Nguồn:** VD1; M16 10–14; BV §9.5.1
- **Thời lượng nội bộ:** 0.04 tiết lý thuyết + 0.03 tiết bài tập
- **Kết nối:** nhận kết quả từ C01; đầu ra là “Hai phép chia theo độ cong cho một bước đến nghiệm của VD1.”; chuyển sang C03 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### C03 — Hướng Newton

- **Vai trò và mục tiêu:** hình thức; LLO6,8
- **Luận điểm trung tâm:** Hướng Newton cực tiểu hóa mô hình bậc hai khi Hessian xác định dương.
- **Nội dung cụ thể:** Cho $g=\nabla f(x)$, $H=\nabla^2f(x)\succ0$. Mô hình $q_x(d)=f(x)+g^Td+\tfrac12d^THd$ có nghiệm duy nhất $Hd_N=-g$. Nếu $g\ne0$, $g^Td_N=-d_N^THd_N<0$.
- **Hình và dữ kiện cần biểu diễn:** Bảng nối hai phương trình C02 sang ma trận H d=-g; dùng cùng vị trí g,H,d.
- **Quyết định bố cục:** Mô hình ở trên; hệ Newton trong khung trung tâm; kiểm tra hướng giảm ở dưới.
- **Lý do phù hợp sinh viên năm 3:** Một chuỗi ngắn đủ chứng minh cả nguồn gốc lẫn tính hướng giảm mà không phải học công thức nghịch đảo.
- **Ghi chú soạn và đáp án:** Chứng minh đầy đủ bằng đạo hàm q và H xác định dương. Nếu H suy biến hoặc bất định, không áp dụng kết luận này; biến thể điều chỉnh Hessian để đọc thêm. Ở VD1, W của chuẩn bậc hai trùng H nên hai hướng trùng nhau; với hàm khác, W cố định không mặc nhiên bằng H(x).
- **Nguồn:** HT5; M16 10–14,10–15; BV §9.5.1
- **Thời lượng nội bộ:** 0.07 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ C02; đầu ra là “Hướng Newton cực tiểu hóa mô hình bậc hai khi Hessian xác định dương.”; chuyển sang C04 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### C04 — Độ giảm Newton và sai số mô hình

- **Vai trò và mục tiêu:** hình thức; LLO6,8
- **Luận điểm trung tâm:** Độ giảm của mô hình và sai số thật là hai đại lượng khác nhau.
- **Nội dung cụ thể:** Định nghĩa $\delta_N=\sqrt{d_N^THd_N}$; $q_x(0)-q_x(d_N)=\delta_N^2/2$. Với VD1, $\delta_N^2=124$ và giảm mô hình 62 trùng sai số thật vì hàm đúng là bậc hai. Với hàm khác, cần bảo đảm bổ sung để suy ra sai số thật.
- **Hình và dữ kiện cần biểu diễn:** Hai hộp mô hình / hàm thật; chỉ trong VD1 nối bằng dấu bằng và ghi lý do.
- **Quyết định bố cục:** Công thức trung tâm lớn; hai cột phân biệt đại lượng ở dưới.
- **Lý do phù hợp sinh viên năm 3:** Tách hai vai trò ngay khi giới thiệu tiêu chí dừng để tránh học thuộc δ²/2 là sai số chính xác.
- **Ghi chú soạn và đáp án:** Từ Hd=-g suy ra g^Td=-δ² rồi thay vào q. Giá trị trùng 62 là đẳng thức có cấu trúc, phải nêu rõ; không cố thay số để phá tính chất này.
- **Nguồn:** HT6; M16 10–16; BV §9.5.1
- **Thời lượng nội bộ:** 0.06 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ C03; đầu ra là “Độ giảm của mô hình và sai số thật là hai đại lượng khác nhau.”; chuyển sang C05 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### C05 — Thuật toán Newton với quay lui

- **Vai trò và mục tiêu:** thuật toán và ứng dụng; LLO8
- **Luận điểm trung tâm:** Newton dùng hệ tuyến tính để chọn hướng và Armijo để kiểm soát bước.
- **Nội dung cụ thể:** Đầu vào $x^0\in\operatorname{dom}f$, dung sai mô hình $\varepsilon$, α,β. Lặp: tính g,H; giải $Hd=-g$; tính $\delta^2=-g^Td$; nếu $\delta^2/2\le\varepsilon$ thì trả x kèm trạng thái dừng theo mô hình; nếu chưa, tìm t bằng Armijo và cập nhật. Chi phí giải hệ đặc dương tổng quát bậc $n^3$ bằng Cholesky cho H, chưa kể tính đạo hàm.
- **Hình và dữ kiện cần biểu diễn:** Giả mã sáu dòng; nhãn giải hệ cạnh bước tốn chi phí; không hiển thị phép lấy nghịch đảo.
- **Quyết định bố cục:** Giả mã sáu dòng đặt bên trái theo thứ tự xuất hiện, bảng đầu vào/đầu ra/điều kiện dừng thu gọn thành ba hàng bên phải; nhãn "giải hệ" gắn trực tiếp dòng tốn chi phí thay vì chú thích dưới màn.
- **Lý do phù hợp sinh viên năm 3:** Sinh viên đã giải hệ ở C02–C03; đặt hệ tại đúng dòng giả mã giúp theo dõi thứ tự thao tác. Bảng đầu vào tách khỏi giả mã giúp giảm lượng chữ cần đọc đồng thời.
- **Ghi chú soạn và đáp án:** Dung sai mô hình không tự chứng nhận sai số thật. Kiểm tra sai số giải hệ, miền xác định và giới hạn vòng; báo lỗi nếu H không xác định dương. Cấu trúc thưa có thể giảm chi phí.
- **Nguồn:** HT7; M16 10–17,10–29,10–30; BV §9.5.2,9.7
- **Thời lượng nội bộ:** 0.07 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ C04; đầu ra là “Newton dùng hệ tuyến tính để chọn hướng và Armijo để kiểm soát bước.”; chuyển sang C06 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### C06 — Hội tụ Newton có điều kiện

- **Vai trò và mục tiêu:** bảo đảm; LLO6
- **Luận điểm trung tâm:** Bước đầy đủ và hội tụ bậc hai xuất hiện gần nghiệm dưới các giả thiết cụ thể.
- **Nội dung cụ thể:** Giả sử f hai lần khả vi, tập mức ban đầu đóng nằm trong miền; $\mu I\preceq H(x)\preceq LI$ trên vùng đang xét, Hessian Lipschitz với hằng số $L_H$. Newton quay lui có pha giảm được kiểm soát; đủ gần nghiệm, nhận t=1 và sai số bước sau bị chặn bởi hằng số nhân bình phương sai số bước trước.
- **Hình và dữ kiện cần biểu diễn:** Đồ thị khái niệm hai vùng xa/gần nghiệm; không vẽ đường hội tụ định lượng không có dữ liệu.
- **Quyết định bố cục:** Bảng giả thiết 45% trái; sơ đồ hai pha 55% phải.
- **Lý do phù hợp sinh viên năm 3:** Sinh viên nhìn thấy bảo đảm gắn với miền và tính đều của Hessian, thay vì chỉ nhớ “Newton nhanh”.
- **Ghi chú soạn và đáp án:** Phác thảo ý tưởng: H^-1 bị chặn và sai số tuyến tính hóa gradient có bậc hai. Phân biệt cận tốc độ theo sai số điểm với ví dụ giảm mô hình. Chi tiết chứng minh chuyển đọc BV §9.5.3.
- **Nguồn:** HT8; M16 10–18 đến10–20; BV §9.5.3
- **Thời lượng nội bộ:** 0.06 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ C05; đầu ra là “Bước đầy đủ và hội tụ bậc hai xuất hiện gần nghiệm dưới các giả thiết cụ thể.”; chuyển sang C07 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### C07 — Newton cho hàm một biến

- **Vai trò và mục tiêu:** ứng dụng + ví dụ dẫn sang D; LLO6,8
- **Luận điểm trung tâm:** Ngoài hàm bậc hai, một bước Newton không xóa hết sai số.
- **Nội dung cụ thể:** VD2 tự xây dựng: $\varphi(s)=s-\log s$, $s>0$, $s^0=1/4$. $\varphi^\prime=-3$, $\varphi^{\prime\prime}=16$, $d_N=3/16$, $s^1=7/16$. $\delta_N^2=9/16$; giảm mô hình $9/32$; sai số thật tại s0 là $\log4-3/4\approx0{,}6363$.
- **Hình và dữ kiện cần biểu diễn:** Đồ thị φ trên s>0 với s0=1/4, s1=7/16 và nghiệm s*=1; bảng có nhãn riêng cho d,δ²,giảm mô hình.
- **Quyết định bố cục:** Hình 50% trái; bảng số 50% phải; hạn chế hiện một lúc quá ba hàng bằng xuất hiện từng bước.
- **Lý do phù hợp sinh viên năm 3:** Điểm đầu được chọn để d,δ² và δ²/2 đều khác nhau, trong khi phép tính vẫn là phân số đơn giản.
- **Ghi chú soạn và đáp án:** Armijo α=.1 β=.5 nhận t=1: mức giảm thật từ s0 tới s1 là log(7/4)-3/16≈.3721, lớn hơn .05625 yêu cầu. Số .6363 là sai số tới nghiệm tại điểm đầu, không phải mức giảm của một bước.
- **Nguồn:** VD2; BV §9.5,9.6
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.04 tiết bài tập
- **Kết nối:** nhận kết quả từ C06; đầu ra là “Ngoài hàm bậc hai, một bước Newton không xóa hết sai số.”; chuyển sang C08 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### C08 — Kiểm tra ý nghĩa độ giảm Newton

- **Vai trò và mục tiêu:** bài tập; LLO6,8
- **Luận điểm trung tâm:** Dừng theo mô hình phải được mô tả đúng loại bảo đảm.
- **Nội dung cụ thể:** Câu hỏi: Với VD2 tại $s^0=1/4$, một báo cáo ghi “sai số thật bằng $9/32$ nên đã biết chính xác khoảng cách tới tối ưu”. Cho $\varphi(1)=1$. Sửa báo cáo bằng cách tính sai số thật và chỉ ra ý nghĩa đúng của $9/32$.
- **Hình và dữ kiện cần biểu diễn:** Dữ kiện φ,s0 và báo cáo sai trong hai khung; không cần hình mới.
- **Quyết định bố cục:** Báo cáo cần sửa nằm giữa; dữ kiện phía trên, ô giải thích phía dưới.
- **Lý do phù hợp sinh viên năm 3:** Phát hiện sai loại đại lượng đo hiểu biết về mô hình, không chỉ thao tác thế công thức.
- **Ghi chú soạn và đáp án:** Đáp án: sai số thật $\log4-3/4\approx0{,}6363$; $9/32=0{,}28125$ là độ giảm của mô hình bậc hai. Tiêu chí: đúng cả hai vai trò và không đồng nhất sai số hàm với khoảng cách điểm. Hoạt động 50/20/30%.
- **Nguồn:** Câu hỏi tự xây dựng; HT6
- **Thời lượng nội bộ:** 0.00 tiết lý thuyết + 0.08 tiết bài tập
- **Kết nối:** nhận kết quả từ C07; đầu ra là “Dừng theo mô hình phải được mô tả đúng loại bảo đảm.”; chuyển sang D01 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### D01 — Kiểm soát biến thiên độ cong

- **Vai trò và mục tiêu:** nhu cầu; LLO7
- **Luận điểm trung tâm:** Cần so tốc độ thay đổi độ cong với chính độ cong để có phân tích phù hợp phép đổi tọa độ.
- **Nội dung cụ thể:** Phân tích Newton cổ điển dùng các hằng số μ,L,L_H có thể khó ước lượng. VD2 có độ cong $1/s^2$ tăng gần biên 0. Nhu cầu: một quan hệ giữa đạo hàm bậc ba và bậc hai, thay cho một cận tuyệt đối chung trên cả miền.
- **Hình và dữ kiện cần biểu diễn:** Trục s>0, đường độ cong 1/s²; tô biên s=0 bằng vùng cấm có nhãn.
- **Quyết định bố cục:** Hình 60%; câu nhu cầu và hai đại lượng cần so ở bên phải.
- **Lý do phù hợp sinh viên năm 3:** Dựa trên hàm vừa tính tránh đưa một lớp hàm trừu tượng khi sinh viên chưa thấy vấn đề cần giải.
- **Ghi chú soạn và đáp án:** Không hứa bỏ mọi giả thiết; tính tự điều chỉnh chỉ hỗ trợ một kiểu phân tích khác. Thuật ngữ theo đề cương là hàm tự điều chỉnh (self-concordant).
- **Nguồn:** M16 10–24; BV §9.6
- **Thời lượng nội bộ:** 0.04 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ C08; đầu ra là “Cần so tốc độ thay đổi độ cong với chính độ cong để có phân tích phù hợp phép đổi tọa độ.”; chuyển sang D02 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### D02 — Tỷ số đạo hàm trong ví dụ log

- **Vai trò và mục tiêu:** trực quan + ví dụ; LLO7
- **Luận điểm trung tâm:** Ở VD2, đạo hàm bậc ba được kiểm soát đúng theo lũy thừa ba phần hai của độ cong.
- **Nội dung cụ thể:** Với mọi $s>0$: $\varphi^{\prime\prime}=1/s^2$, $\varphi^{\prime\prime\prime}=-2/s^3$, nên $|\varphi^{\prime\prime\prime}|=2(\varphi^{\prime\prime})^{3/2}$. Tại $1/4$: hai vế đều 128; đây là đẳng thức do công thức, không phải kết luận từ một điểm.
- **Hình và dữ kiện cần biểu diễn:** Hai đường giá trị trùng nhau theo s, ký hiệu nét khác nhau và ghi lý do; bảng kiểm tại1/4 làm xác nhận.
- **Quyết định bố cục:** Suy luận ký hiệu ở nửa trên; một hàng số kiểm tra ở nửa dưới.
- **Lý do phù hợp sinh viên năm 3:** Phân biệt chứng minh mọi s với kiểm tra số giúp sinh viên tránh suy rộng từ vài phép thử.
- **Ghi chú soạn và đáp án:** Bắt đầu từ đạo hàm đã có ở C07 rồi lấy thêm một đạo hàm. Nhãn φ″=16 khác |φ‴|=128 nên không lẫn độ cong với tốc độ biến thiên.
- **Nguồn:** VD2; M16 10–25; BV §9.6.1
- **Thời lượng nội bộ:** 0.06 tiết lý thuyết + 0.02 tiết bài tập
- **Kết nối:** nhận kết quả từ D01; đầu ra là “Ở VD2, đạo hàm bậc ba được kiểm soát đúng theo lũy thừa ba phần hai của độ cong.”; chuyển sang D03 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### D03 — Định nghĩa hàm tự điều chỉnh

- **Vai trò và mục tiêu:** hình thức; LLO7
- **Luận điểm trung tâm:** Tính tự điều chỉnh là điều kiện tương đối trên biến thiên độ cong.
- **Nội dung cụ thể:** Định nghĩa một biến: f lồi, ba lần khả vi trên miền mở lồi và $|f^{\prime\prime\prime}(s)|\le2(f^{\prime\prime}(s))^{3/2}$. Đa biến: mọi hạn chế trên đường $\psi(t)=f(x+tv)$ phải thỏa điều kiện một biến trong miền của nó. Tính chất bảo toàn dưới hợp thành affine trên miền hợp lệ.
- **Hình và dữ kiện cần biểu diễn:** Khung định nghĩa một biến; mũi tên “xét dọc từng đường” sang hình miền hai chiều và một đường cắt.
- **Quyết định bố cục:** Định nghĩa 60% trái; hình đường cắt 40% phải; tính chất affine là một dòng dưới.
- **Lý do phù hợp sinh viên năm 3:** Định nghĩa qua đường cắt dùng đạo hàm một biến quen thuộc, không bắt sinh viên tiếp nhận ngay tensor bậc ba.
- **Ghi chú soạn và đáp án:** Chứng minh affine một biến: đạo hàm bậc ba nhân a³ và vế phải nhân |a|³. Miền không rỗng; tính tự điều chỉnh không tự bảo đảm Hessian khả nghịch hay có nghiệm tối ưu.
- **Nguồn:** HT9; M16 10–25,10–26; BV §9.6.1–9.6.2
- **Thời lượng nội bộ:** 0.08 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ D02; đầu ra là “Tính tự điều chỉnh là điều kiện tương đối trên biến thiên độ cong.”; chuyển sang D04 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### D04 — Áp dụng cho hàm chứa log

- **Vai trò và mục tiêu:** ứng dụng và giới hạn; LLO7
- **Luận điểm trung tâm:** Điều kiện tự điều chỉnh có thể kiểm bằng cấu trúc hàm thay vì thử nhiều điểm.
- **Nội dung cụ thể:** Hàm $-\log s$ tự điều chỉnh trên s>0; thêm hàm affine s giữ bất đẳng thức vì không đổi đạo hàm bậc hai, ba. Khi áp dụng Newton cần thêm H xác định dương, nghiệm đạt được, tập mức phù hợp và chọn bước đúng; tính tự điều chỉnh đơn lẻ chưa chứng nhận hội tụ hay nghiệm tồn tại.
- **Hình và dữ kiện cần biểu diễn:** Bảng hai hàng -log s / s-log s, các cột điều kiện đạo hàm và nghiệm hữu hạn; chưa đi vào thuật toán điểm trong.
- **Quyết định bố cục:** Bảng chiếm 2/3 phía trên; khung điều kiện dùng Newton ở dưới.
- **Lý do phù hợp sinh viên năm 3:** Cặp hàm gần giống nhau giữ cơ chế đạo hàm nhưng tách rõ thuộc tính hàm và tồn tại nghiệm.
- **Ghi chú soạn và đáp án:** Với -log s, giá trị đi về -∞ khi s→∞; với φ nghiệm s=1. Nêu phân tích tự điều chỉnh không phụ thuộc điều kiện theo tọa độ như cách cổ điển; không đưa cận số vòng thiếu hằng số/giả thiết. Bài phương pháp điểm trong ở ngoài phạm vi.
- **Nguồn:** M16 10–26,10–27; BV §9.6.2–9.6.4
- **Thời lượng nội bộ:** 0.07 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ D03; đầu ra là “Điều kiện tự điều chỉnh có thể kiểm bằng cấu trúc hàm thay vì thử nhiều điểm.”; chuyển sang D05 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### D05 — Kiểm tra điều kiện và tồn tại nghiệm

- **Vai trò và mục tiêu:** bài tập; LLO7
- **Luận điểm trung tâm:** Một điều kiện đạo hàm không thay thế kiểm tra tồn tại nghiệm.
- **Nội dung cụ thể:** Câu hỏi: Hai hàm $h(s)=-\log s$ và $\varphi(s)=s-\log s$ trên s>0 đều tự điều chỉnh. Hàm nào có cực tiểu đạt được? Chỉ ra lý do và sửa phát biểu “tự điều chỉnh nên Newton luôn tìm được nghiệm hữu hạn”.
- **Hình và dữ kiện cần biểu diễn:** Hai hàm trên cùng bảng; yêu cầu kết luận bằng đạo hàm hoặc hành vi khi s→∞.
- **Quyết định bố cục:** Hai cột tương ứng hai hàm; kết luận cần sửa đặt dưới.
- **Lý do phù hợp sinh viên năm 3:** Phản ví dụ dùng đúng tri thức vừa học, đo khả năng phân biệt giả thiết với kết luận.
- **Ghi chú soạn và đáp án:** Đáp án: φ có nghiệm1 vì $\varphi^\prime(1)=0$ tại điểm trong miền và $\varphi^{\prime\prime}(s)>0$ với mọi s>0; h không có nghiệm cực tiểu hữu hạn, không bị chặn dưới. Cần các giả thiết giải tích và tồn tại nghiệm bổ sung. Chấm lý do, không chỉ chọn hàm. Hoạt động50/20/30%.
- **Nguồn:** VD2 và phản ví dụ tự xây dựng; HT9
- **Thời lượng nội bộ:** 0.00 tiết lý thuyết + 0.08 tiết bài tập
- **Kết nối:** nhận kết quả từ D04; đầu ra là “Một điều kiện đạo hàm không thay thế kiểm tra tồn tại nghiệm.”; chuyển sang E01 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E01 — Hướng đi trong tập đẳng thức

- **Vai trò và mục tiêu:** nhu cầu; LLO9
- **Luận điểm trung tâm:** Hướng tốt cho hàm mục tiêu có thể đưa điểm ra khỏi tập khả thi.
- **Nội dung cụ thể:** VD3: $F(u)=\tfrac12(2u_1^2+5u_2^2)$, $u_1+u_2=14$. Từ $(3,11)$, bước Newton không ràng buộc là $(-3,-11)$, đưa tới0 và vi phạm tổng14. Nhu cầu: cực tiểu hóa mô hình trong các hướng giữ tổng.
- **Hình và dữ kiện cần biểu diễn:** Đường u1+u2=14; điểm đầu, gốc0 và mũi tên sai ràng buộc; không tô gốc thành nghiệm bài có đẳng thức.
- **Quyết định bố cục:** Hình 65% trái; dữ kiện và kiểm tra tổng 35% phải.
- **Lý do phù hợp sinh viên năm 3:** Một bước quen thuộc tạo xung đột cụ thể trước khi thêm khối ma trận KKT.
- **Ghi chú soạn và đáp án:** Đẳng thức xét ở đây là affine Au=b, không phải đẳng thức phi tuyến tổng quát. Thuật toán Newton tổng quát trong LLO9 được triển khai theo phạm vi này.
- **Nguồn:** M17 11–2; BV §10.1; VD3
- **Thời lượng nội bộ:** 0.04 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ D05; đầu ra là “Hướng tốt cho hàm mục tiêu có thể đưa điểm ra khỏi tập khả thi.”; chuyển sang E02 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E02 — Ví dụ tổng cố định

- **Vai trò và mục tiêu:** trực quan + ví dụ; LLO9
- **Luận điểm trung tâm:** Tối ưu phải tìm trên đường khả thi, nơi đường đồng mức tiếp xúc với đường ràng buộc.
- **Nội dung cụ thể:** Giữ VD3; $A=[1\;1]$, $b=14$, $H=\operatorname{diag}(2,5)$; điểm đầu $(3,11)$ có $F=623/2$. Hình cho điểm ứng viên $(10,4)$ và mức140; ở trang kế kiểm chứng bằng khử một biến.
- **Hình và dữ kiện cần biểu diễn:** Đường thẳng khả thi và đường đồng mức; đánh dấu (3,11),(10,4); nhãn F không lẫn tọa độ.
- **Quyết định bố cục:** Hình lớn 70%; thẻ dữ kiện 30%; một dòng “ứng viên cần kiểm chứng”.
- **Lý do phù hợp sinh viên năm 3:** Phân biệt quan sát hình với chứng minh tối ưu; các tọa độ bất đối xứng tránh nghiệm trung điểm quá dễ đoán.
- **Ghi chú soạn và đáp án:** Không gọi140 là dữ liệu thực nghiệm. Điểm ứng viên chưa là chứng minh; phép khử cho xác nhận ở E03. Tên u phân biệt ví dụ đẳng thức với x ở VD1.
- **Nguồn:** VD3; M17 11–3,11–5
- **Thời lượng nội bộ:** 0.04 tiết lý thuyết + 0.03 tiết bài tập
- **Kết nối:** nhận kết quả từ E01; đầu ra là “Tối ưu phải tìm trên đường khả thi, nơi đường đồng mức tiếp xúc với đường ràng buộc.”; chuyển sang E03 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E03 — Khử một biến trong ví dụ

- **Vai trò và mục tiêu:** ví dụ; LLO9,10
- **Luận điểm trung tâm:** Tham số hóa đường khả thi chuyển VD3 thành bài một biến không ràng buộc.
- **Nội dung cụ thể:** Đặt $u_1=14-z,u_2=z$. Khi đó $\psi(z)=196-28z+\tfrac72z^2$, $\psi^\prime=7z-28$, $\psi^{\prime\prime}=7>0$; nghiệm $z^*=4$, $u^*=(10,4)$ và $F^*=140$.
- **Hình và dữ kiện cần biểu diễn:** Sơ đồ z → (14-z,z) → F; phép đạo hàm ba dòng; không đưa N ngay.
- **Quyết định bố cục:** Bên trái phép thế 40%; bên phải suy luận cực tiểu 60%.
- **Lý do phù hợp sinh viên năm 3:** Phép thế đã quen ở đại số tạo nền để hiểu không gian rỗng ở trang sau.
- **Ghi chú soạn và đáp án:** Chứng minh đủ bằng hệ số bậc hai dương. Từ z0=11 sẽ có bước -7, ứng với du=(7,-7); giữ dữ kiện này cho Newton khả thi.
- **Nguồn:** VD3; M17 11–4,11–5; BV §10.1.2
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.02 tiết bài tập
- **Kết nối:** nhận kết quả từ E02; đầu ra là “Tham số hóa đường khả thi chuyển VD3 thành bài một biến không ràng buộc.”; chuyển sang E04 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E04 — Khử đẳng thức bằng không gian rỗng

- **Vai trò và mục tiêu:** hình thức + ứng dụng; LLO9,10
- **Luận điểm trung tâm:** Một cơ sở của không gian rỗng biểu diễn mọi biến thiên khả thi.
- **Nội dung cụ thể:** $A\in\mathbb R^{p\times n}$ hạng hàng đầy đủ, $p<n$; $A\hat u=b$. Chọn $N\in\mathbb R^{n\times(n-p)}$ có cột là cơ sở ker A. Mọi điểm khả thi viết duy nhất $u=\hat u+Nz$; $\nabla\psi=N^Tg$, $\nabla^2\psi=N^THN$. VD3: $\hat u=(14,0)^T$, $N=(-1,1)^T$.
- **Hình và dữ kiện cần biểu diễn:** Bảng cụ thể / tổng quát:14-z,z ↔ uhat+Nz; -7 bước z ↔ Nd_z.
- **Quyết định bố cục:** Hai cột ví dụ / công thức, các hàng căn ngang theo cùng vai trò.
- **Lý do phù hợp sinh viên năm 3:** Ánh xạ trực tiếp giúp sinh viên đọc kích thước ma trận thay vì ghi nhớ công thức rời rạc.
- **Ghi chú soạn và đáp án:** Chứng minh biểu diễn từ A(u-uhat)=0. Ứng dụng: nếu N nhỏ và dễ dựng thì dùng thuật toán không ràng buộc; N có thể đặc gây tốn bộ nhớ nên cần cách trực tiếp tiếp theo.
- **Nguồn:** HT10; M17 11–4,11–9; BV §10.1.2
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ E03; đầu ra là “Một cơ sở của không gian rỗng biểu diễn mọi biến thiên khả thi.”; chuyển sang E05 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E05 — Bước khả thi trong ví dụ

- **Vai trò và mục tiêu:** ví dụ trước hệ tổng quát; LLO9,10
- **Luận điểm trung tâm:** Tối ưu mô hình trên đường khả thi cho hướng có tổng bằng0.
- **Nội dung cụ thể:** Từ $u^0=(3,11)$, $g=(6,55)$; bước theo z là -7 nên $d=(7,-7)$ và $Ad=0$. Tính $Hd+g=(20,20)$, do đó nhân tử mô hình $\eta=-20$ làm $Hd+g+A^T\eta=0$.
- **Hình và dữ kiện cần biểu diễn:** Ba cột kiểm Ad=0 / kiểm phương trình dừng / điểm mới; hình mũi tên d nằm trên đường.
- **Quyết định bố cục:** Phép kiểm dạng bảng ở trên; một hình đường khả thi dưới.
- **Lý do phù hợp sinh viên năm 3:** Tìm từng khối phương trình qua dữ kiện cụ thể trước khi ghép thành ma trận lớn.
- **Ghi chú soạn và đáp án:** η là nhân tử của mô hình cục bộ, không được gọi là bước thay đổi nhân tử. Với bài bậc hai này η trùng ν*=-20 là đẳng thức có cấu trúc.
- **Nguồn:** VD3; M17 11–6; BV §10.2.1
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.03 tiết bài tập
- **Kết nối:** nhận kết quả từ E04; đầu ra là “Tối ưu mô hình trên đường khả thi cho hướng có tổng bằng0.”; chuyển sang E06 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E06 — Hệ Newton tại điểm khả thi

- **Vai trò và mục tiêu:** hình thức; LLO9,10
- **Luận điểm trung tâm:** Ràng buộc lên hướng được ghép vào điều kiện cực tiểu của mô hình bậc hai.
- **Nội dung cụ thể:** Với $Au=b$, $H\succ0$, A hạng hàng đầy đủ, giải $\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\eta\end{bmatrix}=-\begin{bmatrix}g\\0\end{bmatrix}$. Khi đó $Ad=0$, $g^Td=-d^THd$. Ma trận khối kích thước $(n+p)\times(n+p)$ khả nghịch nhưng không xác định dương.
- **Hình và dữ kiện cần biểu diễn:** Hệ khối lớn; ngoặc nhãn hàng trên điều kiện dừng, hàng dưới bảo toàn ràng buộc.
- **Quyết định bố cục:** Ma trận chiếm giữa trang; hai nhãn hai bên; giả thiết trong một dòng trên.
- **Lý do phù hợp sinh viên năm 3:** Nhìn rõ ý nghĩa hai hàng trước khi thao tác giúp giảm tải khi gặp ma trận yên ngựa lần đầu.
- **Ghi chú soạn và đáp án:** Chứng minh khả nghịch ngắn: Hd+Aᵀη=0,Ad=0⇒dᵀHd=0⇒d=0⇒Aᵀη=0; do A hạng hàng đầy đủ nên η=0. Khi H chỉ dương trên ker A cũng đủ trong trường hợp phù hợp, để đọc thêm; tuyến chính giữ giả thiết H≻0.
- **Nguồn:** HT11; M17 11–6,11–7; BV §10.2.1
- **Thời lượng nội bộ:** 0.06 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ E05; đầu ra là “Ràng buộc lên hướng được ghép vào điều kiện cực tiểu của mô hình bậc hai.”; chuyển sang E07 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E07 — Thuật toán Newton khả thi

- **Vai trò và mục tiêu:** ứng dụng; LLO9,10
- **Luận điểm trung tâm:** Giải hệ, dừng theo mô hình và chọn bước trên đường khả thi tạo một vòng lặp hoàn chỉnh.
- **Nội dung cụ thể:** Đầu vào $u^0$ khả thi trong miền, α,β,ε. Mỗi vòng tính g,H; giải hệ E06; tính $\delta_{eq}^2=d^THd$; dừng theo mô hình khi $\delta_{eq}^2/2\le\varepsilon$; nếu chưa, dùng Armijo trên F rồi cập nhật. VD3: $\delta_{eq}^2=343$, giảm mô hình $343/2$; t=1 tới $(10,4)$.
- **Hình và dữ kiện cần biểu diễn:** Sơ đồ vòng lặp năm ô; gắn kiểm Au=b sau cập nhật và dẫn xuất Au+tAd=b.
- **Quyết định bố cục:** Vòng lặp trái 60%; chứng minh giữ ràng buộc phải 40%.
- **Lý do phù hợp sinh viên năm 3:** Đặt kiểm tra ràng buộc cạnh cập nhật giúp sinh viên nhận ra mọi t đều giữ khả thi trong số học chính xác.
- **Ghi chú soạn và đáp án:** Không dùng gᵀH^-1g cho độ giảm có ràng buộc. Kiểm tra sai số số học Au-b; giải hệ đối xứng bất định bằng phân tích LDLᵀ có chọn chốt hoặc khử thích hợp, không Cholesky toàn hệ KKT.
- **Nguồn:** HT12; M17 11–7,11–8,11–12; BV §10.2
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ E06; đầu ra là “Giải hệ, dừng theo mô hình và chọn bước trên đường khả thi tạo một vòng lặp hoàn chỉnh.”; chuyển sang E08 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E08 — Phần dư khi điểm đầu chưa khả thi

- **Vai trò và mục tiêu:** nhu cầu + trực quan + ví dụ dẫn nhập; LLO9,10
- **Luận điểm trung tâm:** Khi chưa thỏa đẳng thức, cần đo đồng thời sai lệch ràng buộc và điều kiện dừng.
- **Nội dung cụ thể:** VD3 khởi đầu mới $u^0=(1,8)$, $\nu^0=4$. Phần dư nguyên thủy $r_p=Au-b=-5$; phần dư đối ngẫu $r_d=\nabla F(u)+A^T\nu=(6,44)^T$. Một số đo F riêng lẻ không mô tả đủ hai sai lệch.
- **Hình và dữ kiện cần biểu diễn:** Điểm u0 ngoài đường tổng14; ba thanh số có nhãn rd1,rd2,rp để biểu diễn hai loại phần dư.
- **Quyết định bố cục:** Hình miền 50% trái; phép tính hai phần dư 50% phải.
- **Lý do phù hợp sinh viên năm 3:** Các giá trị 6,44,-5 và nhân tử4 khác nhau; vị trí tách biệt làm rõ số nào đưa vào hàng nào của hệ.
- **Ghi chú soạn và đáp án:** Gradient ở u0 là(2,40), sau cộng Aᵀν mới thành(6,44). Nhấn 44 là phần dư thứ hai, không40. Trực quan độ dài rp chỉ tỷ lệ khoảng cách đường khi A cố định.
- **Nguồn:** VD3; M17 11–10; BV §10.3
- **Thời lượng nội bộ:** 0.04 tiết lý thuyết + 0.03 tiết bài tập
- **Kết nối:** nhận kết quả từ E07; đầu ra là “Khi chưa thỏa đẳng thức, cần đo đồng thời sai lệch ràng buộc và điều kiện dừng.”; chuyển sang E09 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E09 — Hiệu chỉnh nguyên thủy và đối ngẫu

- **Vai trò và mục tiêu:** ví dụ; LLO9,10
- **Luận điểm trung tâm:** Một bước khử cả ba thành phần phần dư trong bài bậc hai.
- **Nội dung cụ thể:** Giải $2d_1+\Delta\nu=-6$, $5d_2+\Delta\nu=-44$, $d_1+d_2=5$. Nghiệm $d=(9,-4)$, $\Delta\nu=-24$; cập nhật đầy đủ $u^1=(10,4)$, $\nu^1=-20$. Thế lại cho $r_p=r_d=0$.
- **Hình và dữ kiện cần biểu diễn:** Bảng ba phương trình / phép thế xác nhận; phía dưới hai hàng cập nhật u và ν.
- **Quyết định bố cục:** Hệ phương trình 55% trái; phép kiểm 45% phải, cập nhật ở chân trang.
- **Lý do phù hợp sinh viên năm 3:** Tách ν cũ, Δν và ν mới thành ba ô giúp tránh nhầm nhân tử mô hình η của chế độ khả thi.
- **Ghi chú soạn và đáp án:** Không dùng -40 ở vế phải thứ hai: đó là âm thành phần gradient, chưa có Aᵀν. Đẳng thức d1+d2=5 sửa vi phạm -5. Bài bậc hai làm phần dư affine, nên bước đầy đủ xóa phần dư chính xác.
- **Nguồn:** VD3; M17 11–10; BV §10.3.1
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.03 tiết bài tập
- **Kết nối:** nhận kết quả từ E08; đầu ra là “Một bước khử cả ba thành phần phần dư trong bài bậc hai.”; chuyển sang E10 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E10 — Newton cho hệ phần dư

- **Vai trò và mục tiêu:** hình thức và thuật toán; LLO9,10
- **Luận điểm trung tâm:** Newton không khả thi chọn bước theo độ giảm phần dư.
- **Nội dung cụ thể:** Đặt $r=(r_d,r_p)$, $r_d=g+A^T\nu$, $r_p=Au-b$. Giải $\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\Delta\nu\end{bmatrix}=-\begin{bmatrix}r_d\\r_p\end{bmatrix}$. Từ t=1 quay lui đến khi điểm mới trong miền và $\|r(u+td,\nu+t\Delta\nu)\|_2\le(1-\alpha t)\|r(u,\nu)\|_2$; cập nhật cả hai biến. Dừng khi cả chuẩn rd và rp đạt dung sai tương ứng.
- **Hình và dữ kiện cần biểu diễn:** Ma trận với nhãn hai vế phải; bên dưới chuỗi giải → thử phần dư → cập nhật.
- **Quyết định bố cục:** Hệ khối đặt nửa trên với hai vế phải được tô nhãn ngay cạnh khối; giả mã bốn bước xếp dọc nửa dưới theo đúng thứ tự giải → thử phần dư → cập nhật, ghi chú hội tụ chuyển hết sang ghi chú soạn.
- **Lý do phù hợp sinh viên năm 3:** Sinh viên đã đọc hệ khối khả thi ở E06; giữ vị trí các khối và chỉ làm nổi vế phải mới giúp nhận ra phần thay đổi. Thứ tự xuất hiện hệ rồi thủ tục nối phép tính ở E09 với vòng lặp tổng quát.
- **Ghi chú soạn và đáp án:** Giả thiết tuyến chính: f hai lần khả vi lồi, H≻0 và A hạng hàng đầy đủ; điểm đầu thuộc miền, hệ có nghiệm tối ưu khi nêu hội tụ. Điều kiện cục bộ thêm tính đều của Jacobian; không khẳng định mọi điểm đầu luôn hội tụ. Khi miền và đơn vị khác nhau cần chuẩn hóa phần dư; giới hạn vòng phải báo thất bại, không báo tối ưu. Ở đây không dùng Armijo chỉ trên F. Có thể chọn cùng giá trị α như trước, nhưng đây là điều kiện trên chuẩn phần dư; phải thử đồng thời u mới và ν mới trong r.
- **Nguồn:** HT13; M17 11–10,11–11; BV §10.3.1–10.3.2
- **Thời lượng nội bộ:** 0.07 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ E09; đầu ra là “Newton không khả thi chọn bước theo độ giảm phần dư.”; chuyển sang E11 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E11 — Bình phương tối thiểu có đẳng thức

- **Vai trò và mục tiêu:** ứng dụng vào AI; LLO9,10
- **Luận điểm trung tâm:** Mô hình học có ràng buộc tuyến tính dùng trực tiếp hệ Newton đã xây dựng.
- **Nội dung cụ thể:** Cho $M\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, $\rho>0$, $Aw=b$. Tối thiểu hóa $\tfrac12\|Mw-y\|_2^2+\tfrac\rho2\|w\|_2^2$: $g=M^T(Mw-y)+\rho w$, $H=M^TM+\rho I\succ0$. Thay g,H,A,b vào hệ phần dư; ví dụ tổng hệ số bằng hằng số là ràng buộc mô hình, không phải xác suất.
- **Hình và dữ kiện cần biểu diễn:** Sơ đồ dữ liệu M,y → g,H → hệ KKT → kiểm rd,rp. VD3 là trường hợp M=diag(1,2), y=0,ρ=1,b=14.
- **Quyết định bố cục:** Sơ đồ bốn bước ngang; công thức g,H đặt trong một dải riêng ngay dưới sơ đồ để giữ cỡ chữ.
- **Lý do phù hợp sinh viên năm 3:** Ánh xạ một mô hình học cụ thể sang các khối đã biết đo được khả năng vận dụng, tránh chỉ nêu tên ứng dụng.
- **Ghi chú soạn và đáp án:** Chứng minh H≻0: vᵀHv=||Mv||²+ρ||v||²>0 với v≠0. Bộ số minh họa không phải bộ dữ liệu thật; giới hạn thống kê và lựa chọnρ ngoài phạm vi. Không suy ra n lớn nên Newton luôn rẻ.
- **Nguồn:** VD3 mở rộng tự xây dựng; BV §10.1,10.3
- **Thời lượng nội bộ:** 0.05 tiết lý thuyết + 0.03 tiết bài tập
- **Kết nối:** nhận kết quả từ E10; đầu ra là “Mô hình học có ràng buộc tuyến tính dùng trực tiếp hệ Newton đã xây dựng.”; chuyển sang E12 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### E12 — Kiểm tra hai chế độ Newton

- **Vai trò và mục tiêu:** bài tập; LLO9,10
- **Luận điểm trung tâm:** Tính khả thi quyết định vế phải và tiêu chí chọn bước.
- **Nội dung cụ thể:** Câu hỏi: VD3 có hai khởi đầu: I là $u=(3,11)$; II là $u=(1,8),\nu=4$. Cho thêm $N=(-1,1)^T$: tính $N^THN$ cho cách khử. Với mỗi khởi đầu, viết hàng ràng buộc của hệ bước. Ở II, điền vế phải phương trình dừng theo tọa độ $u_2$ và giải thích phải kiểm phần dư nào sau cập nhật. Phát hiện lỗi nếu mã dùng $-40$ thay $-44$.
- **Hình và dữ kiện cần biểu diễn:** Hai bảng tình huống I/II; chừa ô Ad=?, vế phải=?, điều kiện nhận bước=? để người học điền.
- **Quyết định bố cục:** Hai cột cân bằng, dữ kiện cố định trên; đáp án không hiện trước.
- **Lý do phù hợp sinh viên năm 3:** Bài chuyển chế độ dùng cùng hàm nên sai khác chỉ đến từ khả thi và phần dư, tránh nhiễu do đổi toàn bộ dữ kiện.
- **Ghi chú soạn và đáp án:** Đáp án: $N^THN=7$; I $Ad=0$, Armijo trên F; II hàng ràng buộc $Ad=d_1+d_2=-r_p=5$; phương trình dừng theo $u_2$ là $5d_2+\Delta\nu=-44$, theo dõi cả rd và rp, nhận bước theo chuẩn phần dư. -40 quên thành phần ν=4. Tiêu chí: đúng hai hàng ràng buộc, đúng vế phải và tiêu chí; 50/20/30% hoạt động.
- **Nguồn:** Câu hỏi tự xây dựng; HT11–13
- **Thời lượng nội bộ:** 0.00 tiết lý thuyết + 0.13 tiết bài tập
- **Kết nối:** nhận kết quả từ E11; đầu ra là “Tính khả thi quyết định vế phải và tiêu chí chọn bước.”; chuyển sang Z01 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### Z01 — Lựa chọn phương pháp và điều kiện

- **Vai trò và mục tiêu:** tổng hợp; LLO6–10
- **Luận điểm trung tâm:** Chọn phương pháp bằng thông tin đạo hàm, ràng buộc và bảo đảm cần dùng.
- **Nội dung cụ thể:** Không ràng buộc: gradient khi chỉ dùng đạo hàm bậc nhất; chuẩn W khi có tiền điều kiện; Newton khi có H và giải hệ phù hợp. Au=b: khử nếu dễ dựng N; Newton khả thi nếu đã có điểm khả thi; phần dư nếu chưa có. Mọi nhánh ghi rõ dừng đo gì.
- **Hình và dữ kiện cần biểu diễn:** Bảng năm hàng phương pháp / thông tin cần / đại lượng kiểm; không xếp hạng tuyệt đối.
- **Quyết định bố cục:** Bảng toàn chiều ngang, ba cột thông tin cần / phương pháp / đại lượng kiểm. Gộp gradient và chuẩn W trong một hàng để còn năm hàng; câu kết một dòng phía dưới.
- **Lý do phù hợp sinh viên năm 3:** Sinh viên tổng hợp theo tiêu chí ra quyết định thay vì phải nhớ thứ tự tên thuật toán.
- **Ghi chú soạn và đáp án:** Trở lại hai nhiệm vụ P02 và giải thích đủ hướng, bước, dừng, khả thi. Gộp gradient/chuẩn W trong một hàng để bảng không quá dày. Không khẳng định Newton luôn nhanh hơn về thời gian.
- **Nguồn:** Tổng hợp HT1–13; DC
- **Thời lượng nội bộ:** 0.06 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ E12; đầu ra là “Chọn phương pháp bằng thông tin đạo hàm, ràng buộc và bảo đảm cần dùng.”; chuyển sang Z02 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### Z02 — Kiểm tra lựa chọn quy trình

- **Vai trò và mục tiêu:** bài tập tổng hợp; LLO6–10
- **Luận điểm trung tâm:** Một lựa chọn hợp lệ phải kèm điều kiện, hướng, bước và kiểm tra dừng.
- **Nội dung cụ thể:** Câu hỏi: Mô hình ở E11 có $\rho>0$, A hạng hàng đầy đủ, điểm đầu trong miền nhưng $Aw^0\ne b$. Chọn quy trình để tạo một bước; nêu hai phần dư, hệ cần giải và tiêu chí nhận bước. Nếu bỏ ràng buộc nhưng chỉ tính được gradient, lựa chọn nào vẫn làm được?
- **Hình và dữ kiện cần biểu diễn:** Hai tình huống nối tiếp, bảng sản phẩm cần nộp gồm hướng/bước/dừng; không yêu cầu tính ma trận mới.
- **Quyết định bố cục:** Tình huống chính chiếm 2/3 trang; biến thể một dòng ở dưới.
- **Lý do phù hợp sinh viên năm 3:** Kiểm tra chuyển giao từ ví dụ số sang mô hình học và quay lại phương pháp tối giản khi dữ kiện thay đổi.
- **Ghi chú soạn và đáp án:** Đáp án: Newton phần dư với rd=g+Aᵀν,rp=Aw-b, hệ khối $[H\ A^T;\ A\ 0]$ với vế phải $-(r_d,r_p)^T$, quay lui theo ||r||, dừng cả hai chuẩn; khi bỏ ràng buộc và chỉ có gradient dùng d=-g với Armijo. Chấm đủ lựa chọn và lý do, không chấm chỉ tên. Dành50/20/30% hoạt động.
- **Nguồn:** Câu hỏi tự xây dựng; HT2,HT13
- **Thời lượng nội bộ:** 0.00 tiết lý thuyết + 0.10 tiết bài tập
- **Kết nối:** nhận kết quả từ Z01; đầu ra là “Một lựa chọn hợp lệ phải kèm điều kiện, hướng, bước và kiểm tra dừng.”; chuyển sang Z03 để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

### Z03 — Bài tập và tài liệu đọc

- **Vai trò và mục tiêu:** kết luận; LLO6–10
- **Luận điểm trung tâm:** Người học hoàn tất bài bằng tái tạo phép tính và giải thích giới hạn bảo đảm.
- **Nội dung cụ thể:** Ba bài giao dự kiến: (1) tái tạo bảng Armijo VD1 và giải thích nhận bước đầu tiên; (2) chứng minh $g^Td_N=-d_N^THd_N$ và phản biện sai số mô hình bằng VD2; (3) lập g,H,rd,rp cho mô hình E11 rồi kiểm hai chế độ Newton. Đọc Boyd–Vandenberghe chương9–10; MIT6.079 bài16 rồi17. Phương pháp điểm trong và tối ưu ngẫu nhiên để bài sau.
- **Hình và dữ kiện cần biểu diễn:** Ba hàng nhiệm vụ / sản phẩm; tài liệu đọc ghi ngắn bên dưới, URL đầy đủ trong ghi chú.
- **Quyết định bố cục:** Bảng hai cột nhiệm vụ / sản phẩm, ba hàng ngắn; dải tài liệu đọc ở cuối trang.
- **Lý do phù hợp sinh viên năm 3:** Kết thúc bằng sản phẩm quan sát được và nguồn đọc đúng phạm vi, không thêm khái niệm mới.
- **Ghi chú soạn và đáp án:** Bài1 nhận biết và tính; bài2 chứng minh; bài3 vận dụng AI. Đây là kế hoạch bài tập; chưa sửa tệp bài tập công khai. Khi triển khai phải đồng bộ ghi chú, bài tập và dữ liệu đóng gói cùng các ví dụ mới.
- **Nguồn:** DC; BV chương9–10; M16,M17
- **Thời lượng nội bộ:** 0.04 tiết lý thuyết + 0.00 tiết bài tập
- **Kết nối:** nhận kết quả từ Z02; đầu ra là “Người học hoàn tất bài bằng tái tạo phép tính và giải thích giới hạn bảo đảm.”; chuyển sang tự học và bài tiếp để tiếp tục nhiệm vụ theo bản đồ khái niệm trong storyboard.

## Quy ước triển khai và giới hạn bàn giao

Kế thừa nền sáng, màu, lưới, chân trang và kiểu chữ của mẫu RevealJS trong `2526-2-another-course/`. Các hình mô tả ở đây là đặc tả để vẽ SVG, chưa phải tài sản đã dựng. Thân bài mục tiêu từ0.75em; không thu nhỏ để giữ bảng quá tải. Hình có nhãn, mô tả thay thế, không chỉ phân biệt bằng màu. Đáp án hiện sau trao đổi hoặc trong ghi chú; nguồn đầy đủ trong ghi chú/tài liệu đọc, không gắn dòng MIT ở chân mọi trang.

Chưa kiểm định hiển thị16:9, màn hình hẹp, KaTeX hay bàn phím vì yêu cầu hiện tại là lập dàn bài. Lần triển khai phải đồng bộ các ví dụ mới với HTML, ghi chú và bài tập công khai rồi chạy kiểm định theo AGENTS.md. Các kiểm tra đã thực hiện cho bản lập kế hoạch được ghi riêng trong review-log.md; không kế thừa nhãn “đã duyệt HTML” của các vòng cũ.


## Điều chỉnh cục bộ khi triển khai

Giữ nguyên 46 trang và thứ tự. B04 bổ sung SVG đổi tọa độ đúng vai trò đã chốt. E11 giữ sơ đồ bốn bước nhưng đặt hai công thức dài g,H trong một dải chung bên dưới để đọc được ở cỡ chữ thân bài; dữ kiện ràng buộc được nêu rõ. Z03 trình bày ba nhiệm vụ thành bảng nhiệm vụ/sản phẩm để đối chiếu trực tiếp. C07 giảm khoảng đệm bảng và rút nhãn, không giảm cỡ chữ hoặc thêm hàng. E05 tăng cỡ nhãn trong SVG. Các thay đổi này giữ vai trò và kết nối của từng trang.
