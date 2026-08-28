# Nhật ký rà soát Bài giảng 03 — Đối ngẫu Lagrange

## 1. Trạng thái bản nháp

- Bản nháp triển khai gồm 40 trang, đúng 7 section ngoài P/A/B/C/D/E/Z.
- Đã tạo đồng bộ outline, storyboard, RevealJS và bốn SVG cục bộ.
- Đã hợp nhất đủ năm báo cáo rà soát độc lập và áp dụng các quyết định trong Mục 8; thứ tự DOM đã qua cổng storyboard được giữ nguyên.
- Trạng thái hiện tại: hậu kiểm toán học, storyboard/mạch kể chuyện và Chromium r3 đã đạt; không còn lỗi chặn hoặc nghiêm trọng. Chưa cập nhật chỉ mục, commit hoặc push vì các việc đó nằm ngoài phạm vi lượt này.

## 2. Nguồn và quyết định sử dụng

| Nguồn/tài sản | Vai trò | Quyết định |
|---|---|---|
| Đề cương UET.AI2012 | Buổi 3, LLO4–5/CLO1, 2 tiết LT + 1 tiết BT | nguồn thẩm quyền phạm vi |
| `sources/part1.docx` | Tuần 3 `Duality`, chế độ nghiêm ngặt | khung học thuật, không dùng làm nguồn công thức |
| `sources/bv_cvxbook.pdf`, Chương 5 | Định nghĩa, định lý, Slater, hình học, KKT, độ nhạy, nón | nguồn kiểm chứng toán học chính |
| `sources/dual.pdf` | Mẫu thứ tự MIT Lecture 5 | dùng một bản chuẩn; không dùng hai bản trùng như nguồn độc lập |
| `sources/Bài tập chương 4.pdf` và lời giải PDF | Ví dụ xuyên suốt, đối chiếu bài tập | tự tính lại theo `math-spec.md` |
| `sources/MIT/README.md` | URL, giấy phép, checksum, vai trò MIT | đã có mục Lecture 5; không tải thêm |
| `img/lec-03/*.svg` | Họ Lagrangian, $g$, hình học đường đỡ, hàm giá trị | tự vẽ; không dùng raster nguồn |

MIT 6.079/6.975, *Lecture 5: Duality*, Stephen Boyd, 2009, được phát hành theo CC BY-NC-SA 4.0 trên MIT OpenCourseWare. Deck diễn giải bằng tiếng Việt và vẽ lại hình; không sao chụp tài sản bên thứ ba.

## 3. Quy ước toán đã khóa

- Ví dụ xuyên suốt có $x^*=2$, $p^*=5$, $\lambda^*=2$, $d^*=5$.
- $\operatorname{dom}g=(-1,\infty)$; miền khả thi của bài toán đối ngẫu là $\lambda\ge0$.
- Nhiễu dùng $f_i(x)\le u_i$, do đó $p'(0)=-\lambda^*=-2$.
- Slater tại $x=3$ là điều kiện đủ, không được phát biểu là điều kiện cần.
- KKT phải gồm khả thi gốc, khả thi đối ngẫu, bù trừ và dừng; ngoài bài toán lồi và giả thiết thích hợp, KKT không chứng nhận tối ưu toàn cục.
- QP chuyển giao có $x^*=(1/2,1/2)$, $\lambda^*=1$ và $p^*=d^*=1/2$; giá trị $1$ này không thuộc ví dụ xuyên suốt.

## 4. Sai khác có chủ ý so với mẫu

- Giữ thứ tự khái niệm của MIT nhưng thay chuỗi ví dụ rời bằng Bài 1 xuyên suốt.
- Lược các đối ngẫu chuyên biệt, hàm liên hợp, chuẩn đối ngẫu, phân hoạch và trust-region không trực tiếp đo LLO4–5.
- Thêm ứng dụng hồi quy có ràng buộc tại D06 và QP chuyển giao tại D07.
- Vẽ lại mọi hình bằng SVG cục bộ; không sao chụp PDF/PPTX.

## 5. Codex Slides

- Dự án bền vững đã được tạo với mã `20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls` và đã gắn nguồn theo vai trò.
- Codex Slides đã sinh outline 30 trang, nhưng outline này ghi sai $\lambda^*=1$ cho ví dụ xuyên suốt. Bản RevealJS dùng `source-map.md` và `math-spec.md` làm thẩm quyền, nên giữ kết quả đã kiểm chứng $\lambda^*=2$.
- Browser tích hợp không khả dụng và dự án chưa render. Vì vậy chưa tuyên bố đã rà trực quan bằng Codex Slides.
- Sau khi nội dung RevealJS vượt các vòng rà soát độc lập, điều phối viên phải đồng bộ lại outline Codex Slides, render và kiểm tra trạng thái bền vững cùng bề mặt hiển thị nếu công cụ cho phép.

## 6. Kiểm tra kỹ thuật bản nháp

- Kiểm tra cấu trúc đạt: 40 ID duy nhất theo đúng thứ tự P00–Z03, 40 khối ghi chú, 7 section ngoài; mỗi ghi chú có đúng hai đoạn và bộ phân tích HTML không phát hiện thẻ mở hoặc đóng sai.
- Sau hậu kiểm cuối, KaTeX cục bộ đã phân tích 279 công thức, gồm 21 công thức khối và 258 công thức nội dòng, với 0 lỗi. Cả bốn SVG được `xml.etree.ElementTree` phân tích thành công; mọi đường dẫn CSS, JS và ảnh đều tồn tại.
- Kiểm tra dữ kiện SVG đạt: ba đường Lagrangian cùng qua $(2,5)$ và $(4,17)$; mẫu $g$ có đỉnh duy nhất tại $(2,5)$; đường $t=5-2u$ đi qua điểm $(0,5)$ trên nhánh dưới; đường độ nhạy $5-2u$ đi qua $(0,5)$ của hàm giá trị.
- `git diff --check --no-index` không báo lỗi khoảng trắng ở HTML và ba tệp planning. Lệnh `xmllint` không có trong môi trường, nên kiểm tra XML dùng bộ phân tích chuẩn của Python.
- Kiểm tra Chromium ở khung 1600×900 phát hiện công thức Slater tại B04 và công thức từng đoạn tại E05 bị cắt bên phải.
- B04 dùng công thức `aligned` ba dòng để tách khả thi affine, bất đẳng thức phi affine và bất đẳng thức affine. E05 đặt công thức từng đoạn toàn chiều rộng và chia kết quả thành ba thẻ.
- Chromium r3 đã duyệt đủ 40/40 trang ở cả khung rộng và hẹp: không có tràn hiển thị hoặc lỗi KaTeX. Contact sheet đã được xem trực tiếp và không phát hiện chồng lấn; lỗi mạng duy nhất là favicon 404, không ảnh hưởng bộ trang chiếu.

## 7. Kiểm định storyboard

| Mức độ | Trang/cụm | Vấn đề | Bằng chứng | Quyết định | Trạng thái/bằng chứng sửa |
|---|---|---|---|---|---|
| nghiêm trọng | P02 | LLO4 bị mở rộng bằng KKT và độ nhạy thay vì trích đúng đề cương | Bản cũ ghép “kiểm tra điều kiện tối ưu và độ nhạy” vào LLO4 | Trích nguyên LLO4–5; tách sản phẩm bổ trợ | đã sửa trong HTML, outline, storyboard |
| nghiêm trọng | B01–B04 | Hình thức xuất hiện trước ví dụ khít nên nhu cầu chưa được cụ thể hóa | Thứ tự cũ B01→B02→B03 | Đổi thành B01→B03→B02→B04→B05→B06 | đã sửa; thứ tự DOM được kiểm tra lại |
| nghiêm trọng | C01–C04 | Tập $\mathcal G$ được định nghĩa trước trực quan đường đỡ | Thứ tự cũ C01→C02→C03 | Đổi thành C01→C03→C02→C04→C05→C06 | đã sửa; C03 dẫn trực tiếp sang C02 |
| nghiêm trọng | D01–D05 | KKT bắt đầu bằng bù trừ/hình thức, thiếu ví dụ tạo nhu cầu | D05 đứng sau toàn bộ phát biểu | Đổi thành D01→D05→D02→D03→D04→D06→D07; viết D05 thành so sánh ứng viên | đã sửa; D05 dẫn vào bốn phép kiểm tra |
| trung bình | E02–E05 | Hành trình độ nhạy mở bằng định nghĩa, ví dụ đến quá muộn | Thứ tự vai trò cũ: hình thức → định lý → local → ví dụ | E02 ví dụ/trực quan; E03 định nghĩa+cận; E04 local; E05 áp dụng đủ | đã sửa đồng bộ |
| trung bình | Z02 | Hành trình E thiếu bài tập tính toán | Z02 cũ chỉ hỏi dấu | Thêm tính $p^{*\prime}(0)$ và xấp xỉ $p^*(0{,}1)$; ánh xạ bài tập E sang Z02 | đã sửa; đáp án ở notes |
| trung bình | C06 | Bài đọc hình không hiển thị hình tại điểm đánh giá | Chỉ có bảng phương trình | Nhúng `dual-geometry.svg` thu nhỏ và giữ bảng | đã sửa; có `alt` cụ thể |
| trung bình | D07 | Lặp lại nhiệm vụ lập $L,g$ đã làm ở A08 | Câu hỏi cũ yêu cầu làm lại toàn tuyến | Dùng kết quả A08; chỉ đo Slater, bốn nhóm KKT và giả thiết kết luận | đã sửa |
| trung bình | E06 | Mở rộng theo nón thiếu nhu cầu và cầu nối từ bài trước | Trang cũ mở ngay bằng ký hiệu nón | Mở bằng giới hạn nhân tử vô hướng; nối SDP Bài 02 và nhân tử ma trận $Z$ | đã sửa |
| nhẹ | A08 | Điều kiện $\lambda\ge0$ chưa được nhắc ngay trong câu hỏi QP | Chỉ xuất hiện ở công thức tổng quát phía trên | Ghi rõ miền trong câu hỏi và notes | đã sửa |
| nghiêm trọng | B04, E05 | Công thức bị cắt phải ở Chromium 1600×900 | Quan sát trực quan của điều phối viên | Ngắt B04; chuyển E05 sang toàn chiều rộng | đã sửa mã; chờ chụp kiểm tra lại |

Sau thay đổi thứ tự, storyboard và outline đã dùng cùng thứ tự vật lý. Kiểm định storyboard phải chạy lại các trang bị ảnh hưởng, hai trang lân cận mỗi phía và toàn bộ ranh giới B/C/D/E trước khi đóng cổng này.

## 8. Năm báo cáo rà soát độc lập

### 8.1. Góc nhìn sinh viên

| Mức độ | Trang | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| trung bình | toàn bài, màn hình hẹp | Footer và controls có thể chồng nội dung khi lưới xếp một cột | CSS cũ vẫn hiển thị hai lớp cố định dưới 760 px | Ẩn footer và controls dưới 760 px; giữ điều hướng bàn phím và swipe của RevealJS | đã áp dụng; Chromium r3 hẹp đạt |
| nhẹ | h3 có KaTeX | Quy tắc viết hoa tiêu đề có thể đổi chữ thường trong công thức | KaTeX nằm bên trong h3 kế thừa `text-transform` | Thêm override cục bộ cho KaTeX trong h3 | đã áp dụng |
| trung bình | B04, E05 | Công thức từng bị cắt ở 1600×900 | Lượt Chromium trước vòng hợp nhất | Giữ bố cục compact/toàn chiều rộng và rà lại sau các bổ sung mới | đã sửa; Chromium r3 rộng và hẹp đều đạt |

### 8.2. Góc nhìn chuyên gia

| Mức độ | Trang | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| nghiêm trọng | A04–A08 | Lẫn miền định nghĩa của $L,g$ với miền khả thi đối ngẫu | A04 cũ ghi $\lambda\in\mathbb R_+^m$, trong khi A06 xét $-1<\lambda<0$ | Định nghĩa cho $\lambda\in\mathbb R^m$; chỉ A07–A08 yêu cầu $\lambda\ge0$ | đã áp dụng |
| nghiêm trọng | C03, E05 | Hình đường đỡ/tiếp tuyến không qua điểm được công bố | SVG Bézier cũ không đi qua $(0,5)$ | Vẽ lại từ công thức bằng polyline lấy mẫu và phép đổi tọa độ cố định | đã áp dụng |
| trung bình | P02 | Báo cáo đề nghị trích lại LLO4–5 | P02 hiện đã ghi “Trích đề cương” và tách sản phẩm bổ trợ | Không áp dụng thêm; nội dung hiện tại đã đúng trước vòng hợp nhất | giữ |
| trung bình | A08, D07 | QP chuyển giao có nguy cơ bị hiểu là lặp | D07 hiện đã ghi dùng kết quả A08, nhưng A08 cũ chưa thực sự tối đa hóa $g$ | Bổ sung kết quả $\lambda^*=1$, $x^*=(1/2,1/2)$ ở A08; giữ D07 chỉ kiểm tra Slater/KKT | đã áp dụng |

### 8.3. Độ chính xác toán học

| Mức độ | Trang | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| nghiêm trọng | B04, B06 | Slater tinh chỉnh thiếu điều kiện cho bất đẳng thức affine | Công thức cũ chỉ ghi phi affine chặt | Thêm $x\in\operatorname{relint}D$, $Ax=b$, phi affine chặt và affine không dương; sửa bài tập | đã áp dụng |
| nghiêm trọng | A03, B03, C03, E05 | Bốn SVG dùng đường Bézier ước lượng | Không bảo toàn chính xác giao điểm, cực đại hoặc tiếp xúc | Lấy mẫu trực tiếp $L_0,L_1,L_2$, $g(\lambda)$, $(f_1(x),f_0(x))$ và $p^*(u)$ | đã áp dụng; chờ kiểm tra hình |
| trung bình | C05 | Cầu nối từ hệ số góc sang KKT thiếu pháp tuyến | Chỉ nói $-\lambda^*$ “xuất hiện lại” | Nêu pháp tuyến $(\lambda^*,1)$ và hạng $\lambda^*\nabla f(x^*)$ | đã áp dụng |
| trung bình | D05 | Thế $x=2,4$ trước khi nêu phương trình dừng chung | Hai phương trình số thiếu nguồn đạo hàm | Thêm $\partial_xL=2x+\lambda(2x-6)=0$ | đã áp dụng |
| trung bình | E05 | Ký hiệu $\lambda^*$ không chỉ rõ bài nhiễu | Nhân tử bằng 2 tại $u=0$ nhưng bằng 0 khi $u\ge8$ | Dùng $\lambda^*(0)=2$ và $\lambda^*(u)=0$ khi $u\ge8$ | đã áp dụng |
| trung bình | E06 | Mở rộng SDP chưa đo được nón chứa nhân tử | Trang chỉ nêu công thức | Thêm câu hỏi về $Z\in\mathbb S_+^r$ và $\operatorname{tr}(ZF(x))$ | đã áp dụng |

### 8.4. Phản biện học thuật và giảng dạy

| Mức độ | Trang/cụm | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| nghiêm trọng | C, D | Báo cáo đọc thứ tự theo mã và đề nghị đổi ví dụ lên trước hình thức | DOM hiện là C01→C03→C02→C04 và D01→D05→D02→D03→D04 | Không đổi DOM; cổng storyboard đã đặt trực quan/ví dụ trước hình thức | không áp dụng |
| nghiêm trọng | E | Báo cáo cho rằng E mở bằng ba trang hình thức trước ví dụ | E02 hiện đã đảm nhiệm ví dụ/trực quan trước E03–E04; storyboard ghi rõ vai | Không đổi DOM; giữ tuyến đã qua cổng storyboard | không áp dụng |
| trung bình | toàn bài | Lo ngại tải nội dung cho 2 tiết LT + 1 tiết BT | 40 trang nhưng có phân bổ nội bộ và các trang bài tập đóng cụm | Giữ 40 trang theo đặc tả; tiếp tục rà tràn và nhịp bằng Chromium | giữ; Chromium r3 không phát hiện tràn |
| trung bình | A08–D07 | Bài tập lặp có thể làm mờ tiến triển | A08 và D07 dùng cùng QP | Giữ chiến lược giàn giáo; A08 giải đối ngẫu, D07 dùng kết quả để kiểm tra KKT | đã làm rõ |

### 8.5. Mạch kể chuyện và điểm kết nối

| Mức độ | Trang/cụm | Vai trò | Kết nối vào | Kết nối ra | Điểm nhấn | Quyết định và trạng thái |
|---|---|---|---|---|---|---|
| trung bình | C05→D01 | Chuyển từ hình học sang KKT | Đường đỡ khít | Cân bằng gradient | Cùng nhân tử trong ba biểu diễn | Nêu hệ số góc, pháp tuyến và $\lambda^*\nabla f$; đã áp dụng |
| trung bình | E06→Z01 | Mở rộng chứng nhận từ vô hướng sang nón | Độ nhạy của nhân tử vô hướng | Tổng kết toàn pipeline | SDP dùng nhân tử trong nón đối ngẫu | Thêm câu hỏi ở E06 và thu hồi trong notes Z01; đã áp dụng |
| nhẹ | A08→D07 | Dữ kiện chuyển giao chưa được đóng tại A08 | Hàm đối ngẫu của QP | Kiểm tra Slater/KKT | $\lambda^*=1$, $x^*=(1/2,1/2)$ | Bổ sung tối đa hóa ở A08; đã áp dụng |
| nhẹ | toàn bộ ranh giới | Hai báo cáo đề nghị đổi thứ tự dựa trên thứ tự ID | ID truy nguyên không phản ánh DOM sau cổng storyboard | Giữ các câu nối đã đồng bộ | DOM là bằng chứng trình chiếu | Không đổi thứ tự; hậu kiểm storyboard/mạch kể chuyện đạt |

## 9. Hậu kiểm cuối

- **Toán học:** không còn lỗi chặn hoặc nghiêm trọng. Một lỗi trung bình tại E05 đã được sửa bằng cách phân biệt điểm suy biến $u=8$ — ràng buộc vẫn hoạt động nhưng $\lambda^*(8)=0$ — với miền $u>8$, nơi ràng buộc không hoạt động. Hai lỗi nhẹ đã được sửa: A04 nêu $D\ne\varnothing$ trước khi dùng; E06 nêu $F(x)\in\mathbb S^r$ và $Z\in\mathbb S_+^r$ cùng cấp $r$ trước công thức ghép.
- **Storyboard và mạch kể chuyện:** đạt. Outline, storyboard và HTML thống nhất vai trò A04, trường hợp biên E05 và kiểu/kích thước ở E06; thứ tự DOM và các câu nối không đổi.
- **Chromium r4:** sau ba sửa đổi hậu kiểm, đã duyệt lại đủ 40/40 trang ở 1600×900 và 720×1280; 0 trang tràn hiển thị, 0 lỗi KaTeX. Lỗi duy nhất là favicon 404 vô hại.
- **Codex Slides:** dự án bền vững `20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls` đã được thay dàn ý bằng đúng 40 trang và thứ tự của RevealJS. Lệnh kết xuất 40 trang không trả trạng thái sau hơn bốn phút nên đã dừng; Browser tích hợp vẫn không khả dụng. Vì vậy, không tuyên bố đã rà trực quan bằng Codex Slides; cổng trực quan dùng Chromium cục bộ và contact sheet.
- Hai trang chỉ mục đã được bổ sung liên kết Bài 03; commit và push do điều phối viên thực hiện sau cổng cuối.
