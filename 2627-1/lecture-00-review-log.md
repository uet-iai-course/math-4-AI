# Nhật ký rà soát Bài 00

## Phạm vi bản tái cấu trúc

- Quy mô: 72 trang, bảy phần, một tuyến đầy đủ liên tục trong 150 phút.
- Thứ tự: P00–P02, H01–H04, A01–A15, B01–B19, C01–C14, D01–D11, E01–E06.
- Ví dụ xuyên suốt: dự đoán giá bốn căn nhà từ diện tích và số phòng ngủ.
- Bốn tệp phải đồng bộ: dàn ý, storyboard, RevealJS và nhật ký này.
- Mẫu ngôn ngữ, nhịp trình bày và giao diện: Bài 01; nền kỹ thuật RevealJS và CSS dùng chung không thay đổi.

## Thay đổi có chủ ý so với bản trước tái cấu trúc

1. Thêm phần H gồm bốn trang mô tả dữ liệu, dự đoán từng mẫu, ý nghĩa trọng số, phần dư và nguồn sai lệch trước khi dùng ma trận.
2. Chỉ từ A08–A09 mới chuyển từng véc-tơ đặc trưng thành các hàng của $\mathbf X$.
3. Thay các bộ số rời rạc bằng một bộ bốn căn nhà xuyên suốt.
4. Bỏ ví dụ phát hiện bất thường bằng khoảng cách Mahalanobis; thay bằng phân phối giá có điều kiện.
5. Gộp phần kết Z cũ vào E01 và E06; các câu chẩn đoán được chuyển về bài tập từng cụm.
6. Tách lát cắt, Jacobian, quy tắc dây chuyền, Hessian, độ cong, Taylor và bước gradient để mỗi trang giữ một khái niệm.
7. Xây lại C01–C14 theo nền tảng trước ứng dụng: phép thử, tiên đề xác suất, biến ngẫu nhiên, PMF/PDF/CDF, kỳ vọng/phương sai, rồi nhiễu, phần dư và hàm hợp lý Gauss.

## Chỉnh sửa sau kiểm định storyboard

| Mức độ ban đầu | Trang | Xử lý đã áp dụng |
|---|---|---|
| Chặn bàn giao | C04–C05 | Bỏ bài dùng mốc $1{,}96$ chưa chuẩn bị; thay bằng xác suất suy trực tiếp từ tính đối xứng của Gauss. |
| Chặn bàn giao | D04 | Định nghĩa $\mathbf Z=(A,B,Y)^T\in\mathbb R^3$, $\boldsymbol\mu=\mathbb E[\mathbf Z]$ và $\boldsymbol\Sigma_Z\in\mathbb R^{3\times3}$ trước khi dùng. **[Lịch sử, đã được thay]** Cấu trúc D04/D05–D06 này thuộc bản cũ; bản hiện tại dùng bảng phân phối $2\times2$ chung cho D02–D08 và D04 chỉ tính xác suất có điều kiện và quy tắc nhân. |
| Chặn bàn giao | D05–D06 | Thiết lập $\boldsymbol\varepsilon\sim\mathcal N(\mathbf0,\boldsymbol\Sigma_\varepsilon)$, $\boldsymbol\Sigma_\varepsilon\succ0$, giữ $\mathbf r=\mathbf X\mathbf w-\mathbf y$ và mục tiêu $\frac12\mathbf r^T\boldsymbol\Sigma_\varepsilon^{-1}\mathbf r$ trước câu hỏi về nhiễu tương quan. **[Lịch sử, đã được thay]** Cấu trúc này thuộc bản cũ; bản hiện tại tách D05 (Bayes) và D06 (độc lập) trên bảng $2\times2$, còn GLS chuyển về D10. |
| Nghiêm trọng | B01–B04 | Thêm ví dụ $w_1:1\to1{,}1$, $f:4{,}5\to4{,}025$ tại B01; đổi B04 từ ví dụ dẫn nhập thành kiểm chứng và ứng dụng công thức gradient. |
| Nghiêm trọng | H04 | Nêu ba lý do dùng bình phương và thống nhất thuật ngữ “tổng bình phương phần dư”. |
| Trung bình | C04 | Mở rộng lần đầu “độc lập và cùng phân phối” (iid) và diễn giải hai vế trong ghi chú. |
| Trung bình | D03 | Lấy biên bằng tích phân theo diện tích liên tục và tổng theo số phòng rời rạc. |
| Trung bình | Toàn tuyến | Bổ sung phân bổ thời gian nội bộ cho tuyến giảng liên tục. |
| Chặn bàn giao | D05 | Sửa mô hình sinh thành $\mathbf y=\mathbf X\mathbf w_{\mathrm{true}}+\boldsymbol\varepsilon$; định nghĩa $\mathbf r(\mathbf w)=\mathbf X\mathbf w-\mathbf y$ và chỉ khẳng định $\mathbf r(\mathbf w_{\mathrm{true}})=-\boldsymbol\varepsilon$. Phân biệt thiết kế cố định với quần thể ngẫu nhiên trong ghi chú để chuẩn bị D06 câu 5. |
| Chặn bàn giao | C04–C05 | Đổi tiêu đề và câu hỏi từ “bình phương sai số” sang “bình phương phần dư”, nhất quán với đại lượng quan sát được sau khi chọn $\mathbf w$. |

Các quyết định 37–45 mã thuộc những vòng trước. Vòng hiện tại bổ sung nền tảng giải tích nhiều biến và có 55 mã.

## Hợp nhất ba báo cáo độc lập

- Nghiêm trọng: H02–H03 nay hiển thị đủ chuỗi từng mẫu; C02–C04 có ví dụ Gauss số kiểm tra được; D02 có phân phối thực nghiệm với xác suất $1/2$ và $2/3$ cùng cảnh báo phạm vi; D05 đã rút gọn và chuyển chi tiết sang ghi chú.
- Toán và ký hiệu: thêm $\mathbf X_{i:}=\boldsymbol\phi_i^T$, $Df(\mathbf w)[\mathbf d]$, bước giải phương trình chuẩn, điều kiện mômen ở C03, $\boldsymbol\Sigma_\varepsilon$ cố định theo $\mathbf w$ và phản ví dụ $U\sim\operatorname{Unif}[-1,1]$. Điều kiện bước theo $\lambda_{\max}$ được bỏ ở vòng kiểm định sau.
- Khả năng học và đọc: cỡ bảng tăng từ $0{,}84$ lên $0{,}92$ lần cỡ thân trang, lưới chuyển một cột trên màn hình hẹp; bài tập tách “Câu trên lớp” và “Tự kiểm”.
- Thuật ngữ và ứng dụng: dùng “dịch tâm và đổi thang”; E04 gọi đúng “dải nhiễu Gauss có điều kiện” và đổi sang tỷ đồng; E06 so sánh nghiệm đóng với gradient descent khi quy mô tăng.
- Thời lượng: chuyển thêm thời gian sang C03–C04 và D02; giảm C05 và D05, giữ tổng 150 phút.

## Sửa sau kiểm định cuối

- D04: định nghĩa $\sigma_i=\sqrt{(\boldsymbol\Sigma_Z)_{ii}}$ trước khi dùng trong $\rho_{ij}$.
- C03 và E04: dùng lần lượt $F_\varepsilon$ và $G\sim\mathcal N(0,1)$ để tránh ký hiệu mơ hồ hoặc xung đột với $\mathbf Z=(A,B,Y)^T$.
- A09 là ví dụ kiểm chứng; nội dung hạng và dạng toàn phương nay được chuẩn bị riêng tại A05.
- D05: chuyển phân biệt thiết kế cố định/quần thể sang ghi chú và giữ tổng thời lượng 150 phút.

## Sửa sau vòng sinh viên cuối

- H04: gộp bốn nguồn thành ba nhóm và rút hộp kết luận; giữ nguyên cỡ chữ, giảm chiều cao bố cục 16:9.
- Kiểm tra Chromium cuối H04: bỏ `underbrace` và chuyển nhãn “tổng bình phương phần dư” vào hộp, tạo thêm khoảng an toàn ở đáy tại 1280×720.
- Kiểm tra Chromium A08 ở 720×900: chuyển dòng $\mathbf X_{i:}\mathbf w=\boldsymbol\phi_i^T\mathbf w$ vào ghi chú; giữ nguyên ma trận, kích thước và ý chính, loại bỏ chồng chân trang.
- P00 theo yêu cầu mới: bỏ dòng và hộp chi tiết về đoán giá nhà; chỉ giữ tiêu đề cùng phạm vi “Đại số tuyến tính · Giải tích nhiều biến · Xác suất”. Ví dụ giá nhà bắt đầu từ P02/H01.
- P01 theo yêu cầu mới: đổi tiêu đề thành “Mục tiêu bài học”; thay danh sách thao tác và câu chẩn đoán bằng ba vai trò chung cùng mục tiêu sử dụng một ví dụ AI xuyên suốt.
- P02 theo yêu cầu mới: thay vấn đề trung tâm về trọng số giá nhà bằng pipeline AI chung; nêu rõ vai trò của ba lĩnh vực và ghi giá nhà chỉ là bối cảnh minh họa cho việc ôn tập công cụ toán.
- H02 theo yêu cầu mới: thay tuyến cặp đặc trưng bằng bảng sáu cột $a_i,b_i,a'_i,b'_i,y_i$; mọi số dùng KaTeX. Các cột $a'_i,b'_i,y_i$ dùng màu đỏ tương phản, chữ đậm và nhãn “Dữ liệu dùng cho mô hình”. Nhãn “Mô hình giá nhà tuyến tính:” đứng ngay trước công thức.
- Ký hiệu đặc trưng biến đổi xuyên suốt là $a'_i,b'_i$ và $a',b'$; đặc trưng phi tuyến dùng $(a')^2$. Giữ nguyên $A,B,Y$ trong ngữ cảnh biến ngẫu nhiên và giữ trọng số chữ thường $w_0,w_1,w_2$.
- H04 theo yêu cầu mới: hộp giải thích $f(\mathbf w)$ là thước đo độ phù hợp của mô hình trên dữ liệu giá quan sát và giá trị nhỏ hơn nghĩa dự đoán nhìn chung gần dữ liệu hơn. Lý do bình phương cùng hệ số $1/2$ chuyển vào ghi chú.
- Kiểm tra 1280×720 H02: gộp ba thẻ $w_0,w_1,w_2$ thành một hộp ngắn và giảm padding của riêng bảng H02; giữ nguyên cỡ chữ, bảng, nhãn mô hình và công thức, tạo khoảng an toàn trên chân trang.
- Kiểm tra 1280×720 H02 lần cuối: rút hộp thành đúng một dòng “$w_0$: giá nền; $w_1$: đổi giá mỗi $10\,\mathrm{m}^2$; $w_2$: đổi giá mỗi phòng.” và giảm padding riêng hộp; điều kiện giữ đặc trưng còn lại không đổi nằm trong ghi chú.
- A07–A08: A07 định nghĩa $\boldsymbol\Phi=[\boldsymbol\phi_1\ \boldsymbol\phi_2\ \boldsymbol\phi_3\ \boldsymbol\phi_4]\in\mathbb R^{3\times4}$; A08 định nghĩa trực tiếp $\mathbf X=\boldsymbol\Phi^T\in\mathbb R^{4\times3}$. Loại bỏ câu chỉ dẫn kiểu “trang sau”.
- A09: thay sơ đồ kết quả bằng ba hàng phép tính có điền số đầy đủ cho $\mathbf X\mathbf w^{(0)}=\hat{\mathbf y}$, $\mathbf r=\hat{\mathbf y}-\mathbf y$ và $f(\mathbf w^{(0)})=4{,}5$; dùng cỡ cục bộ $0{,}8\,\mathrm{em}$, không thấp hơn chuẩn thân bài.
- D06: thay câu thiết kế cố định/quần thể bằng phép rút gọn khi $\boldsymbol\Sigma_\varepsilon=\sigma^2\mathbf I$; bổ sung đáp án đầy đủ trong ghi chú.
- Nội dung hạng/Gram cũ được thay bằng A05 hiện tại: hạng, dạng toàn phương và đẳng thức $\mathbf d^T\mathbf A^T\mathbf A\mathbf d=\|\mathbf A\mathbf d\|_2^2$. A10 trình bày đặc trưng phi tuyến; A11 chỉ xét hệ dữ liệu không tương thích. C03 phân biệt PMF/PDF và xác suất khoảng; D05 thêm trường hợp iid.
- A10–A11 thiết lập đặc trưng phi tuyến, tính không tương thích và mục tiêu bình phương tối thiểu. A12 giữ hình học phép chiếu, A13 suy phương trình chuẩn và bài tập ứng dụng là A14. Thời lượng phần A được tăng lên 25/38 phút.
- Vòng kiểm định toán và ảnh 16:9: A10 và E05 dùng $(\boldsymbol\phi,\mathbf w)\in\mathbb R^3\times\mathbb R^3$ cho mô hình hiện tại, $(\widetilde{\boldsymbol\phi},\widetilde{\mathbf w})\in\mathbb R^4\times\mathbb R^4$ cho mô hình mở rộng. A11 dùng bố cục gọn cho kiểm tra mâu thuẫn và mục tiêu xấp xỉ, không giảm cỡ chữ. Nội dung hiện ở B16 thay toàn bộ nhánh hạng/Gram/xác định dương/nghiệm duy nhất bằng Hessian số, đẳng thức $\mathbf d^T\mathbf H\mathbf d=\|\mathbf X\mathbf d\|_2^2\ge0$ và phép kiểm tra $f:4{,}5\to2{,}265$ tại $\eta=0{,}1$; bỏ $\lambda_{\max}$. B17/E06 thay câu hỏi nghiệm duy nhất bằng kiểm tra bước gradient và nhu cầu tối ưu khi hệ không tương thích.
- Kiểm tra ảnh 1280×720 nội dung hiện ở B16: rút hộp dưới thành đúng một dòng “Với $\eta=0{,}1$: $f$ giảm $4{,}5\to2{,}265$; cần kiểm tra $f$ khi đổi bước.”; chuyển diễn giải về bước thử khác vào ghi chú, giữ nguyên cỡ chữ và các nội dung còn lại.
- Chuẩn hóa ký hiệu: ma trận và véc-tơ dùng chữ đậm KaTeX, vô hướng giữ nghiêng thường. A07 chuyển nhãn $\boldsymbol\phi_1,\ldots,\boldsymbol\phi_4$ khỏi `h3` sang `.vector-label` với `text-transform:none` để phi luôn hiển thị thường; $\boldsymbol\Phi$ chỉ ma trận ghép. A11 giữ một kiểm tra mâu thuẫn số và một công thức mục tiêu ngắn.
- A08 bổ sung quy ước mỗi hàng là một mẫu, mỗi cột là một đặc trưng, tên ba cột và khoảng trắng cục bộ trong ma trận số. A12 “Bình phương tối thiểu là phép chiếu” giữ SVG code-native cùng ba hệ thức hình học; A13 “Phương trình chuẩn từ phép chiếu” suy riêng phương trình chuẩn và nghiệm đóng dưới điều kiện cột độc lập, với Moore--Penrose trong ghi chú. Bài tập ứng dụng đổi mã thành A14.
- A08: hộp miền được thay bằng $\mathbf w=[w_0,w_1,w_2]^T\in\mathbb R^3$ và $\mathbf y=[y_1,y_2,y_3,y_4]^T\in\mathbb R^4$ trên một dòng; ký hiệu véc-tơ đậm, các thành phần vô hướng giữ nghiêng thường.
- Lịch sử bản cũ: vòng ảnh Chromium $1280\times720$ từng dùng 17/24 phút cho phần A. Bản hiện tại đã tái cân thành 25/38 phút; A14 chỉ còn một câu trên lớp và hai câu tự kiểm.
- Lịch sử bản cũ: A14 từng đánh số câu 4–6. Bản hiện tại gộp dự đoán–phần dư–mất mát thành câu 2 và dùng hình chiếu ở câu 3.
- A12 SVG: di chuyển nhãn $\hat{\mathbf y}$ từ tọa độ $(202,179)$ sang $(158,170)$, tách nhãn khỏi điểm chiếu tại $(190,177)$ và dấu vuông góc; hình học và kích thước khung giữ nguyên.
- Vòng 45 trang: thêm A01–A06 cho loại và kích thước, phép toán véc-tơ, phép nhân ma trận, hệ và nghịch đảo, hạng và dạng toàn phương, rồi bài tập nền tảng. Tám trang ứng dụng cũ đổi thành A07–A14; A11 chỉ xử lý hệ dữ liệu không tương thích để tránh lặp A04.
- C04 điều kiện trên các $\boldsymbol\phi_i$ đã cho trước giả thiết nhiễu iid. H02 ghi rõ bốn mẫu có trung bình mẫu 0 sau dịch tâm nhưng chia 10 không đưa phương sai về 1.
- Bản trung gian giữ tổng 150 phút trước khi tiếp tục tách các khái niệm nền tảng.
- B03 cũ được tách thành B03–B05; Jacobian và quy tắc dây chuyền tách thành B06–B07; Hessian, độ cong theo hướng và Taylor đặt riêng tại B08–B10.
- B11–B12 ôn tích phân một biến và nhiều biến; hai ví dụ lần lượt cho kết quả $2$ và $3$, rồi nối tích phân mật độ với xác suất.
- B02 hiển thị SVG bề mặt 3D toàn chiều ngang để định vị $u=1,v=2$; B03 giữ hai lát cắt 2D và tiếp tuyến chính xác để đọc các độ dốc $4,5$. Các hình có nhãn và aria-label, không chỉ dựa vào màu.
- Đóng lỗi validator: A05 định nghĩa $\operatorname{Col}(\mathbf A)$ trước rank; A14 còn một câu trên lớp; B02 thêm định nghĩa đạo hàm lát cắt; B04 nêu giả thiết khả vi; B07 dùng $\ell=g\circ\mathbf F$ theo bốn bước; B08 định nghĩa từng phần tử Hessian; B10 nêu giả thiết Taylor cục bộ; B11–B12 dùng $\psi$.
- Thêm B09 để suy $\varphi''(0)=\mathbf d^T\mathbf H_h\mathbf d$ từ lát cắt một chiều. B11 có SVG vùng tích phân; B12 có SVG miền $D$ và thể tích dưới mặt, đều có aria-label và nhãn văn bản.
- Bỏ trang “Hàm mất mát và đường mức” vì trực quan lặp và không cần cho phép suy gradient. Ứng dụng bắt đầu trực tiếp ở B13 bằng quy tắc dây chuyền cho phần dư.

## Bộ số khóa

| Hạng mục | Giá trị cần giữ |
|---|---|
| Đơn vị | Giá theo $100$ triệu đồng |
| Biến đổi | $a'=(a-55)/10$, $b'=b-2$ |
| Bốn mẫu $(a,b,a',b',y)$ | $(40,1,-1{,}5,-1,11)$; $(50,2,-0{,}5,0,12)$; $(60,2,0{,}5,0,14)$; $(70,3,1{,}5,1,19)$ |
| Trọng số thử | $\mathbf w^{(0)}=(14,1,1)^T$ |
| Dự đoán thử | $(11{,}5,13{,}5,14{,}5,16{,}5)^T$ |
| Phần dư thử | $(0{,}5,1{,}5,0{,}5,-2{,}5)^T$ |
| Mất mát thử | $\mathrm{SSE}=9$, $f=4{,}5$ |
| Gradient thử | $(0,-5,-3)^T$ |
| Ma trận chuẩn | $\mathbf X^T\mathbf X=[[4,0,0],[0,5,3],[0,3,2]]$, $\mathbf X^T\mathbf y=(56,13,8)^T$ |
| Nghiệm | $\mathbf w_{\mathrm{LS}}=(14,2,1)^T$ |
| Sau khi khớp | $\hat{\mathbf y}=(10,13,15,18)^T$, $\mathbf r=(-1,1,1,-1)^T$, $\mathrm{SSE}=4$, $f=2$, $\mathbf X^T\mathbf r=\mathbf0$ |
| Một bước gradient | $\eta=0{,}1$, $\mathbf w^+=(14,1{,}5,1{,}3)^T$, $f(\mathbf w^+)=2{,}265$ |
| Nhà mới | $65\,\mathrm{m}^2$, 2 phòng: $(a',b')=(1,0)$, $\hat y=16$, tức 1,6 tỷ đồng |
| Đặc trưng mở rộng | $[1,a',b',(a')^2]^T$, trọng số nội suy $(12{,}75,2,1,1)^T$, SSE bằng 0, dự đoán mới 15,75 |

## Quy ước nghĩa phải kiểm tra

- $r_i=\hat y_i-y_i$: dương là dự đoán cao, âm là dự đoán thấp.
- $\varepsilon_i$ là nhiễu ngẫu nhiên không quan sát trực tiếp; $r_i$ là phần dư quan sát được sau khi chọn mô hình và trọng số.
- Tại tham số sinh dữ liệu thật và đúng dạng mô hình, $r_i=-\varepsilon_i$; nói chung phần dư còn chứa sai đặc tả và sai số ước lượng.
- Bốn phần dư không đủ chứng minh giả thiết Gauss.
- $\nabla f=\mathbf0$ không có nghĩa từng phần dư bằng không; tại nghiệm chỉ có $\mathbf X^T\mathbf r=\mathbf0$.
- $w_1$ ứng với tăng $10\,\mathrm{m}^2$, không phải một mét vuông; diễn giải hệ số phải giữ biến còn lại cố định.
- Thêm $(a')^2$ làm mô hình phi tuyến theo diện tích nhưng vẫn tuyến tính theo trọng số.
- SSE huấn luyện bằng không không chứng minh mô hình mở rộng dự đoán ngoài mẫu tốt hơn.
- Khoảng tại E04 chỉ minh họa nhiễu quan sát với $\sigma=1$, không bao gồm bất định trọng số hoặc sai đặc tả.

## Kiểm tra triển khai bản nháp

| Kiểm tra | Trạng thái bản soạn |
|---|---|
| Đúng 67 mã duy nhất theo thứ tự khóa | Đã tự kiểm bằng script cục bộ sau khi chỉnh sửa |
| Bảy `section` ngoài | Đã tự kiểm bằng bộ phân tích HTML |
| Mỗi trang có một ghi chú diễn giả | Đã tự kiểm số lượng |
| H01–H04 không dùng $\mathbf X$ hoặc $\mathbf X\mathbf w$ | Đã rà chuỗi trong bốn trang |
| Nguồn trong ghi chú | Đã thêm cho 72 trang |
| Công thức Markdown chỉ dùng `$...$`, `$$...$$` | Đã rà mẫu phân cách cấm |
| CSS và plugin cục bộ | Giữ nguyên đường dẫn của bản đã chạy |

Kết quả tự kiểm bản soạn: 67 mã duy nhất đúng thứ tự; 67 ghi chú và 67 nguồn; bảy phần ngoài cân bằng; không có tham chiếu mạng cho thành phần cốt lõi. **[Lịch sử]** Số liệu "67 mã" thuộc vòng trước; bản hiện tại có 72 mã duy nhất (xác nhận ở mục "Tự kiểm tĩnh sau sửa" và "Trạng thái kiểm định vòng 72 trang"). Tính lại xác nhận $f(\mathbf w^{(0)})=4{,}5$, $\nabla f(\mathbf w^{(0)})=(0,-5,-3)^T$, $f(\mathbf w^+)=2{,}265$, nghiệm $\mathbf w_{\mathrm{LS}}=(14,2,1)^T$ và các ví dụ xác suất mới.

## Các vòng rà soát cần thực hiện sau bản nháp

- Kiểm định storyboard: rà đủ 72 trang và bản đồ sáu bước.
- Góc nhìn sinh viên: tải nhận thức, khả năng đọc, hiểu mẫu, trọng số và phần dư.
- Góc nhìn chuyên gia: độ bao phủ, liên kết AI, CLO và thời lượng.
- Độ chính xác toán học: tính lại toàn bộ bộ số, gradient, Hessian, nghiệm và ví dụ phi tuyến.
- Tác tử chỉnh sửa: hợp nhất báo cáo và xử lý mọi lỗi chặn bàn giao hoặc nghiêm trọng.
- Kiểm thử kỹ thuật: KaTeX, tài nguyên, tràn 16:9, màn hình hẹp, điều hướng và cổng 8765.
- Codex Slides: đồng bộ Design Files và kiểm tra bề mặt hiển thị sau chỉnh sửa.

## Quyết định vòng hợp nhất ba review

- A05–A06: tách hạng/phụ thuộc tuyến tính khỏi dạng toàn phương/PSD/PD; thêm ví dụ số trực tiếp trước điều kiện $\mathbf A^T\mathbf A$.
- B02–B03: tách hình bề mặt 3D và hình lát cắt 2D. B03 dùng polyline lấy mẫu từ đúng hàm; tiếp tuyến chỉ vẽ cục bộ và đi qua đúng điểm tiếp xúc.
- B02 bỏ quy tắc CSS ẩn phần tử cuối và hiển thị SVG 3D đơn ở chiều ngang lớn. C12 dùng cùng các điểm mẫu cho đường chuông và biên trên vùng tô $[-\sigma,\sigma]$.
- A13: dời nhãn $\hat{\mathbf y}$ lên-trái 20 px, tăng lên 22 px, thêm nền trắng mờ và bỏ ký hiệu vuông góc rời vì dấu góc vuông đã đủ.
- B10 hiển thị hai hướng có độ cong 2 và 1; B17–B18 tách Hessian khỏi bước gradient; B19 chỉ giữ một câu ứng dụng trên lớp và dùng dữ kiện mới ở tự kiểm.
- B07–B08 giữ cấu trúc vì ảnh Chromium $1280\times720$ xác nhận hàng thế số không chồng lấn; đề xuất “sửa chồng lấn” không áp dụng.
- C01–C14 thay cụm tạm, hoàn thành chu trình nền tảng xác suất một biến trước khi quay lại giá nhà. C02 bổ sung không gian xác suất và ba tiên đề; PMF, PDF, CDF và iid đều được mở rộng ở lần đầu.
- D01–D11 thay cụm ứng dụng cũ bằng bảng phân phối $2\times2$ xuyên suốt: véc-tơ ngẫu nhiên, phân phối chung, biên, điều kiện, Bayes, độc lập, mômen, Gauss nhiều biến, rồi mới áp dụng GLS cho nhiễu giá nhà tại D10.
- Validator cuối: B02 chỉ giữ trực quan và B03 mới tính/chốt định nghĩa; C01–C13 bổ sung sigma-đại số, tính đo được, quan hệ PDF–xác suất, mật độ Gauss và bước đổi dấu phần dư; D09 dùng $\mathbf G,\boldsymbol\Sigma_G$, D10 tách ví dụ $2$ chiều khỏi mô hình nhiễu $4$ chiều.
- Phân bổ 150 phút chỉ tính các mục “Câu hỏi:” trên lớp; toàn bộ mục “Tự kiểm” chuyển ra ngoài lớp.
- Tự kiểm tĩnh sau sửa: 72 mã duy nhất, 72 ghi chú, 72 nguồn; outline và storyboard cùng đủ 72 hàng; không có công thức với số dấu `$` lẻ. Các phép tính $\rho\approx0{,}408$, $J_2(\mathbf r_+)=2/3$ và $J_2(\mathbf r_-)=2$ được tính lại.
- Render $1280\times720$ cuối: B03 rút hai hộp độ dốc và giảm khoảng cách cục bộ; C12 nhóm dấu âm trong số mũ bằng `{−}` và thêm $\sigma>0$; D09 tách hai display; D10 giảm padding và rút hộp kết luận. C11 khai báo tâm thật của căn 2 trước khi tính nhiễu.
- D08 tách hiệp phương sai/tương quan khỏi D06 về độc lập; D09 chuẩn bị Gauss nhiều biến trước khi D10 khai báo kích thước, điều kiện PD và mục tiêu GLS.
- E05 đổi tiêu đề thành “nguy cơ quá khớp”; E06 chỉ hỏi công thức nghiệm đóng, một bước gradient và giới hạn của SSE huấn luyện.
- Tuyến duy nhất là 150 phút và bao phủ toàn bộ 72 trang.

## Trạng thái kiểm định vòng 72 trang

### Đã kiểm cục bộ

- 72/72 mã khớp HTML và tài liệu truy nguyên; mỗi trang có ghi chú và nguồn.
- Kiểu và kích thước tại B07: $(2\times3)(3\times1)=(2\times1)$; $\mathbf J_F^T\mathbf F=(6,6)^T$.
- B02 giữ một SVG 3D; B03 dùng các điểm mẫu đúng từ $p(u)=u^2+2u+4$ và $q(v)=v^2+v+1$. Hai tiếp tuyến $4u+3$ và $5v-3$ đi qua đúng $(1,7)$ và $(2,7)$.
- B10–B13 đã tự tính: độ cong theo $\mathbf e_1$ bằng $2$, theo $(1,-1)^T/\sqrt2$ bằng $1$; Taylor cho $6{,}91$; hai tích phân bằng $2$ và $3$.
- B18: phần dư $(-0{,}55,1{,}25,0{,}75,-1{,}45)^T$ cho $f=2{,}265$. B19 tại $\eta=0{,}05$ cho $f=3{,}09125$.
- C03–C07 đã kiểm Bernoulli$(0{,}3)$: kỳ vọng $0{,}3$, phương sai $0{,}21$; Uniform$(0,2)$: xác suất khoảng $0{,}5$, kỳ vọng $1$, phương sai $1/3$.
- Render Chromium $1280\times720$ đã phát hiện và đóng ba lỗi khoảng an toàn: B02 đưa định nghĩa vào hộp có lề ngang; B11–B12 tách phép tính tích phân thành hai dòng và thêm khoảng phải. Hình 3D B02 không còn bị quy tắc CSS ẩn; không giảm cỡ chữ.
- A05 khai báo $\mathbf A\in\mathbb R^{m\times n}$ trước $\operatorname{Col}(\mathbf A)$; B03 nêu đúng hướng tăng nhanh nhất cục bộ theo chuẩn Euclid khi gradient khác không.
- Tổng thời lượng là 150 phút cho một tuyến duy nhất.

### Kiểm định cuối

- Đã render lại các trang có rủi ro cao ở $1280\times720$: B02–B03, C02, C12, D02, D05, D08–D10. Không còn công thức bị cắt, hình bị che hoặc nội dung chồng chân trang.
- Đã render ở màn hình hẹp $720\times900$: A08, C02, C12 và D10. Quy tắc lưới riêng cho A08/C02 giữ đủ nội dung; các trang C12/D10 không tràn.
- Máy chủ `reloadserver` trên cổng 8765 trả HTTP 200 cho tệp bài giảng. Tiến trình chạy dưới người dùng `tqlong` bằng lệnh `.venv/bin/python3 -m reloadserver 8765`.
- Dự án Codex Slides bền vững `20260819175143-b-i-00-n-t-p-n-n-t-ng-to-n-h-c-cho-ai-ma-lzb6` đã đồng bộ bốn Design Files; cấu hình và outline của dự án đã cập nhật thành 72 trang.
- Rà toán cuối không còn lỗi `chặn bàn giao` hoặc `nghiêm trọng`; đã tự tính lại likelihood–SSE, Bayes, hiệp phương sai, tương quan, Gauss nhiều biến và GLS.

- Render C12 $1280\times720$: rút hộp cuối thành một dòng “Gauss là giả thiết mô hình, không phải kết luận từ bốn mẫu.” và giảm riêng padding/margin, giữ nguyên cỡ chữ.
- Render hẹp: giữ A08 `.grid4` bốn cột và C02 `.grid3` ba cột trong media query; C03 chuyển $\mathcal B(\mathbb R)$ vào ghi chú; D01 thêm marker SVG cục bộ; D09 tăng hình lên 240 px; D10 bỏ `compact` và rút tiêu đề.

## Nguồn chính

- Goodfellow, Bengio & Courville (2016), *Deep Learning*, Chương 2–6.
- Boyd & Vandenberghe (2004), *Convex Optimization*, Phụ lục A.
- Stewart (2016), *Calculus*, 8th ed., §§5.2–5.3, 15.1–15.2.
- Koller & Friedman (2009), *Probabilistic Graphical Models*, Chương 2.
- Đề cương UET.AI2012 và Bài 01 trong thư mục `2627-1/`.

## Rà soát ngày 2026-08-30

### Nguồn phát hiện

- Rà soát đồng bộ bốn tệp (HTML, outline, storyboard, review-log) theo yêu cầu điều phối; phát hiện từ đối chiếu trực tiếp giữa mặt trang, ghi chú và tài liệu truy nguyên.

### Quyết định và phạm vi

1. **P01:** bỏ lưới ba thẻ trùng P02; thay bằng một luận điểm trung tâm về năng lực cuối buổi (biến dữ liệu thành mô hình và dự đoán kèm bất định) cùng bốn mục tiêu quan sát được M0.1–M0.4 nhóm gọn trong một hộp. Phạm vi: chỉ mặt trang và ghi chú P01.
2. **P02:** bỏ lưới ba thẻ; chỉ giữ pipeline, hộp bối cảnh và thêm hộp vấn đề trung tâm viết dạng vấn đề cần giải quyết, không đặt tiêu đề câu hỏi. Phạm vi: chỉ mặt trang và ghi chú P02.
3. **H01:** đổi bốn ô giá từ dạng "11 = 1,1 tỷ" thành "11 (1,1 tỷ đồng)" tương ứng. Không đổi số liệu.
4. **H02 và A08:** xóa khỏi ghi chú mọi câu metadata về padding, render, cỡ chữ hay quyết định dựng trang; các quyết định này được ghi lại tại mục này của review-log (quyết định padding hộp H02 một dòng và giảm padding cục bộ bảng H02 để tạo khoảng đáy an toàn 1280×720, không giảm cỡ chữ; quy ước nhãn `.vector-label` với `text-transform:none` ở A08 để hiển thị phi thường).
5. **B12:** thêm một câu nối rằng tích phân là phép cộng tích lũy cần để chuyển từ mật độ sang xác suất. Storyboard tách B12–B13 thành cụm phụ "Tích phân chuẩn bị cho xác suất liên tục" dùng chu trình rút gọn nhu cầu → hình thức → kiểm tra, nêu lý do và câu nối; không còn gán chúng là trực quan của cụm Giải tích nhiều biến.
6. **E04:** làm rõ $1{,}96$ là phân vị chuẩn được cung cấp, nối lại kết quả $0{,}6827$ ở C12 và ghi rõ không yêu cầu người học tự suy ra phân vị; giữ nguyên dải số $[1{,}404;1{,}796]$ tỷ đồng.
7. **C12:** thống nhất số $0{,}6827$ (bỏ dạng $0{,}68270$); thay bản vá JavaScript đường SVG bằng hình tĩnh tương đương trong markup (đường chuông và vùng tô lấy đúng các điểm mẫu của bản vá) rồi xóa đúng khối JS chỉ vá C12; không chạm JavaScript khác.
8. **Outline/storyboard/review-log:** đồng bộ với trạng thái sau sửa; ghi rõ Bài 00 không có LLO chính thức riêng, M0.1–M0.4 là mục tiêu bổ trợ suy ra từ tiên quyết và hỗ trợ CLO1–CLO2; đề cương xác nhận cấu trúc 2 tiết lý thuyết + 1 tiết bài tập, còn gộp thành tuyến 150 phút là quyết định biên soạn dựa trên quy ước 50 phút/tiết; Bài 00 là ôn bổ trợ trước Bài 01, không phải Buổi 1 chính thức.
9. **Lịch sử:** thống kê "67 mã" và cấu trúc D04/D05–D06 cũ được đánh dấu là lịch sử đã được thay.

### Giới hạn

- Codex Slides không chạy được trong phiên này do môi trường Node 18 và thiếu `node-polyfill-crypto`; chưa đồng bộ Design Files của dự án Codex Slides sau các sửa đổi trên. Cần chạy lại khi môi trường đáp ứng.

## Hợp nhất năm rà soát độc lập — 2026-08-30

### Bảng truy nguyên theo vai

| Vai | Phạm vi rà | Kết quả |
|---|---|---|
| Sinh viên | Tải nhận thức, khả năng đọc, thứ tự trực quan → hình thức, tính tự kiểm | Không có lỗi chặn; các đề xuất về tải và bố cục đã được xử lý ở các vòng trước (rút hộp H02/H04/C12/D10, tách khái niệm B03–B11). |
| Chuyên gia | Độ bao phủ, liên kết AI, CLO, thời lượng, định vị Bài 00 | Không có lỗi chặn; M0.1–M0.4 bổ trợ CLO1–CLO2; 150 phút là quyết định biên soạn từ 2 tiết lý thuyết + 1 tiết bài tập. |
| Toán học | Tính lại bộ số, gradient, Hessian, Taylor, tích phân, xác suất, GLS | Không có lỗi chặn; các phép tính $\rho\approx0{,}408$, $J_2(\mathbf r_+)=2/3$, $J_2(\mathbf r_-)=2$, $f(\mathbf w^+)=2{,}265$ được xác nhận lại. |
| Học thuật–sư phạm | Chuỗi nhu cầu → trực quan → hình thức → kiểm tra; phân biệt nhiễu/phần dư | Không có lỗi chặn; C05 định nghĩa chính thức mật độ→xác suất; D10 nêu điều kiện $\boldsymbol\Sigma_\varepsilon$ đã biết/cố định, không ước lượng từ bốn mẫu. |
| Mạch kể chuyện | Tính liền mạch của câu nối giữa các cụm | Hai lỗi nghiêm trọng đã sửa: B13→C05 (C05 mới là nơi định nghĩa chính thức mật độ→xác suất, không phải B12) và D10→E (đầu ra GLS của D10 được E01/E04/E06 tiêu thụ rõ ràng). |

### Kết luận chung

- Không có lỗi chặn bàn giao.
- Hai lỗi nghiêm trọng của mạch kể chuyện (B13→C05 và D10→E) đã được sửa và phản ánh trong storyboard.
- Các đề xuất trung bình/nhẹ đã áp dụng: cập nhật hàng D10 của storyboard nêu rõ nhu cầu nhiễu tương quan làm OLS đánh trọng số sai cùng điều kiện $\boldsymbol\Sigma_\varepsilon$ đã biết/cố định; cập nhật E01/E04/E06 của storyboard đúng trạng thái HTML hiện tại (E01 có hộp nhánh nhiễu OLS/GLS, E04 ghi $\sigma=1$ là giả định minh họa và $1{,}96$ là phân vị cho sẵn, E06 thu hồi M0.1–M0.4 và có tự kiểm chọn OLS/GLS); sửa câu mục 8 về nguồn thời lượng 150 phút.

### Đề xuất không áp dụng và lý do

- Không tách D10 thành hai trang: đã rút tải bằng tiêu đề gọn, bỏ `compact` và tách ví dụ 2D khỏi mô hình nhiễu 4D.
- Không thêm SVG cho E04: công thức và dải số $[1{,}404;1{,}796]$ tỷ đồng đã đủ cho luận điểm về bất định dự đoán.
- Không chuyển B10/B11 sang tự học: độ cong theo hướng và Taylor là nền tảng cần cho gradient, Hessian và xấp xỉ bậc hai trong mạch B.
- Không di chuyển ba tệp quy trình cũ: chỉ dẫn hiện hành cấm tự di chuyển tệp.
- Không làm tròn xác suất ở C12 thành $0{,}68$: giá trị $0{,}6827$ nhất quán với xác suất chuẩn $\Pr(|G|\le1)$ và được nối lại ở E04.

### Giới hạn Codex Slides (giữ nguyên)

- Codex Slides không chạy được trong phiên này do môi trường Node 18 (lỗi `File is not defined`) và standalone thiếu `./node-polyfill-crypto`. Chưa tuyên bố đã kiểm định bằng Codex Slides; cần chạy lại khi môi trường đáp ứng.

### Bổ sung hợp nhất (2026-08-30)

- Tái kiểm định toán học và mạch kể chuyện đều PASS ngày 2026-08-30.
- Lỗi nhẹ E04 về thuật ngữ ("mô hình Sigma/GLS ở D10") đã sửa thành "mô hình GLS với $\boldsymbol\Sigma_\varepsilon$ ở D10" trong lecture-00-on-tap-nen-tang-toan-hoc.html.
- requested_model và observed_model của cả hai worker đều là z-ai/glm-5.3-flash qua OpenRouter.

## Sửa tràn hiển thị sau render Chromium 1280×720

- Phạm vi: chỉ HTML, outline, storyboard và review-log của Bài 00; không đổi số trang, thứ tự hay luận điểm; không giảm thân bài dưới 0,75em.
- A02: tách phép tính chuẩn thành hai dòng ngắn — bình phương chuẩn $\|\boldsymbol\phi_1\|_2^2=4{,}25$ rồi suy chuẩn $\|\boldsymbol\phi_1\|_2=\sqrt{4{,}25}$ — để không vượt thẻ phải.
- A04: tách công thức nghịch đảo $\mathbf A^{-1}$ và $\mathbf x=\mathbf A^{-1}\mathbf b$ thành hai dòng/khối riêng.
- A05: tách ma trận và rank thành các dòng riêng trong mỗi thẻ (cả $\mathbf A_1$ và $\mathbf A_2$).
- B12: rút hộp chỉ giữ công thức nguyên hàm; câu về đơn vị chuyển sang ghi chú; câu nối rút thành "Tích phân là phép cộng tích lũy. Ở C05, cùng phép tính chuyển mật độ thành xác suất của một miền."; giảm riêng chiều cao SVG B12/B13 xuống 250 px, giữ nhãn 21 px đọc được.
- B13: rút hộp thành "Với đại lượng trên miền hai chiều, tổng tích lũy phải cộng trên toàn miền $D$."; câu nối rút thành "C05 dùng lại phép tích lũy này để biến mật độ thành xác suất của một miền."; giữ ví dụ bằng $3$ và neo hai chiều.
- B19: đổi tiêu đề thành "Bài tập tích hợp giải tích"; rút tự kiểm thành ba câu gọn: (1) gradient, đạo hàm hướng và Taylor với $\boldsymbol\Delta=(0,1,0)^T$ tại $\mathbf x=(0,1)^T,\mathbf u=(1,0)^T$; (2) gradient của $g\circ\mathbf F$ tại $(0,1)$ bằng Jacobian; (3) tính lại hai tích phân ở B12–B13; chi tiết liên hệ C05 chuyển sang ghi chú.
- Outline và storyboard đã đồng bộ các hàng A02, A04, A05, B12, B13, B19 tương ứng; ghi chú thuần Việt, không metadata điều phối.
- Tự kiểm tĩnh sau sửa: 72 `data-slide-id` duy nhất; 7 `section` ngoài; không có công thức Markdown dùng delimiter khác `$...$`/`$$...$$`.

## Sửa tràn hiển thị còn lại sau render Chromium 1280×720 (lần 2)

- Phạm vi: chỉ A02 và A05 của Bài 00 cùng outline, storyboard, review-log; không đổi trang khác, không giảm cỡ chữ.
- A02: thay dòng bình phương chuẩn dài bằng tổng số ngắn $\|\boldsymbol\phi_1\|_2^2=1+2{,}25+1=4{,}25$, giữ dòng suy ra $\|\boldsymbol\phi_1\|_2=\sqrt{4{,}25}$; thêm ghi chú "Ba số là bình phương ba thành phần của $\boldsymbol\phi_1$". Mục tiêu không cắt ngang ở 1280×720.
- A05: giữ $\operatorname{Col}(\mathbf A)$ được định nghĩa trước rank nhưng rút câu đầu (bỏ cụm "là số cột độc lập tuyến tính tối đa"); thêm CSS riêng A05 giảm margin KaTeX display và padding thẻ/hộp, không giảm font-size; rút hộp kết luận thành "Hạng thấp báo hiệu đặc trưng trùng lặp; hệ có thể nhiều nghiệm hoặc vô nghiệm."; giữ hai ma trận, rank 2/rank 1 và câu "Cột 2 bằng hai lần cột 1". Mục tiêu đáy nội dung nằm trên chân trang ở 1280×720.
- Outline và storyboard đã đồng bộ mô tả A02/A05 tương ứng.
- Tự kiểm tĩnh sau sửa: 72 `data-slide-id` duy nhất; 7 `section` ngoài.
- A02: câu phụ "Ba số là bình phương ba thành phần của $\boldsymbol\phi_1$" đã chuyển khỏi thẻ phải vào ghi chú diễn giả, tạo khoảng an toàn với chân trang ở 1280×720; outline và storyboard đồng bộ mô tả A02.
- A02: khóa kích thước tối thiểu hai cột bằng CSS nội dòng riêng — `.grid2` dùng `grid-template-columns:minmax(0,1fr) minmax(0,1fr)` và `.card` có `min-width:0` — để loại tràn ngang 51 px.

## Tăng cỡ chữ compact/route/a03-calc (yêu cầu điều phối)

- Phạm vi: chỉ CSS nội dòng trong lecture-00-on-tap-nen-tang-toan-hoc.html và review-log này; không đổi nội dung, outline, storyboard.
- Lý do: section nội dung có `font-size:.82em` (media query màn hẹp), nên `.compact` và `.route` ở `0.88em` cho cỡ hiệu dụng `0.88×0.82≈0.72em`, thấp hơn ngưỡng ~0.75em; `.a03-calc` của A10 ở `0.8em` còn thấp hơn nữa.
- Quyết định: đổi `.compact{font-size:.88em}` → `.92em`; `.route{font-size:.88em}` → `.92em`; `.reveal section[data-slide-id="A10"] .a03-calc{font-size:.8em}` → `.92em`. Cỡ hiệu dụng mới `0.92×0.82≈0.754em`, đạt ngưỡng.
- Giữ nguyên media query màn hẹp hiện tại (bao gồm quy tắc `.compact,.a03-calc{font-size:1em}` trong media query).
- Tự kiểm tĩnh sau sửa: 72 `data-slide-id` duy nhất; 7 `section` ngoài; không đổi nội dung trang.
- Yêu cầu render lại để kiểm tra tràn ở 1280×720 và màn hình hẹp 720×900 sau khi tăng cỡ.

## Kiểm định cuối 2026-08-30

### Bằng chứng trình duyệt

- Chromium headless duyệt đủ 72 trang ở hai kích thước $1280\times720$ và $720\times900$, sau khi tắt hiệu ứng chuyển trang.
- Cả hai kích thước: 0 trang tràn, 0 console error, 0 page error, 0 request failed.

### Kiểm tĩnh

- 72 mã duy nhất; 7 `section` ngoài; 72 aside notes; 0 tài sản cục bộ thiếu; index đã liên kết đúng.

### Giới hạn máy chủ

- Lệnh `.venv/bin/python3 -m reloadserver 8765` khả dụng nhưng không thể khởi động vì cổng 8765 đang bị tiến trình `python3 -m http.server` của kho deep-learning chiếm. Không dừng tiến trình ngoài phạm vi và không đổi cổng.
- Vì vậy phiên này không tuyên bố HTTP 200 qua reloadserver; kiểm định trình duyệt dùng tệp cục bộ và không có request failed.

### Giới hạn Codex Slides

- Codex Slides vẫn chưa khả dụng như mục giới hạn đã ghi trước đó; chưa tuyên bố đã kiểm định bằng Codex Slides.
