# Nhật ký rà soát Bài giảng 03 — Đối ngẫu Lagrange

## Hậu kiểm mạch khái niệm và phạm vi định lý — 2026-09-01

- P01, A04, B02, C06, D05, E01, E06 và Z03 đã bỏ tham chiếu mã trang, “trang kế” và mô tả tuyến nội bộ; câu nối hiện dựa trên quan hệ toán học được truyền sang khái niệm sau.
- B01 dùng khoảng $p^*-d^*$ thay cho cặp nhãn “cận lỏng/cận khít”, đồng thời nêu rõ tính lồi chưa tự bảo đảm đối ngẫu mạnh.
- C03 chỉ gọi $t+\lambda u=g(\lambda)$ là đường cận trước khi định nghĩa tập mở rộng. C04 mới gọi nó là đường đỡ và dùng $\operatorname{cl}\mathcal A$ để đúng cả khi infimum không đạt.
- D04 giới hạn rõ ở KKT khả vi. Nhánh không trơn bị bỏ vì dưới gradient của hàm giá trị ở E04 không phải là điều kiện dừng KKT tổng quát.
- Số trang, thứ tự DOM và tài sản không thay đổi. Bộ phân tích xác nhận 41 trang, 41 ghi chú, 7 section ngoài; năm SVG phân tích XML và raster hóa thành công. Contact sheet cho thấy nhãn, trục, đường và điểm cần đọc đều hiển thị đầy đủ.

## 1. Trạng thái bản nháp

- Bản hiện tại gồm 41 trang, đúng 7 section ngoài P/A/B/C/D/E/Z.
- Outline, storyboard, RevealJS và năm SVG cục bộ đã đồng bộ.
- Đã hợp nhất đủ năm báo cáo rà soát độc lập và áp dụng các quyết định trong Mục 8; thứ tự DOM đã qua cổng storyboard được giữ nguyên.
- Trạng thái hiện tại: hậu kiểm toán học, storyboard, mạch kể chuyện và raster SVG đạt; không còn lỗi chặn hoặc nghiêm trọng. Lượt này không có Browser hoặc Chromium, nên không dùng kết quả trực quan cũ để khẳng định bố cục HTML sau sửa.

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
- Với miền $D$ lồi, điều kiện dừng tổng quát là $0\in\nabla_xL(x^*,\lambda^*,\nu^*)+N_D(x^*)$; khi $D=\mathbb R^n$ thì $N_D(x^*)=\{0\}$ và thu về $\nabla_xL=0$.
- Đối ngẫu mạnh và đạt nghiệm đối ngẫu cho $(-\lambda^*,-\nu^*)\in\partial p^*(0,0)$; chỉ khi $p^*$ khả vi mới đồng nhất cặp này với gradient duy nhất.
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

## 10. Hậu kiểm bổ sung sau phản biện điều kiện miền

- D03, D04 và ghi chú D05 đã được đồng bộ theo điều kiện dừng tổng quát trên miền $D$: dùng nón pháp tuyến, nêu trường hợp $D=\mathbb R^n$, và khóa đủ giả thiết của bài toán lồi gồm miền lồi, bất đẳng thức lồi, đẳng thức affine, cùng dạng khả vi hoặc dưới vi phân phù hợp.
- E04 đã được sửa để nêu đủ đối ngẫu mạnh và đạt nghiệm đối ngẫu trước quan hệ dưới gradient; chỉ trường hợp khả vi mới dùng gradient duy nhất.
- `math-spec.md` phân biệt đúng $u=8$ là ràng buộc hoạt động suy biến với $\lambda^*(8)=0$, còn chỉ $u>8$ mới không hoạt động.
- `plan.md`, outline, storyboard, source map và HTML giữ nguyên thứ tự DOM cuối gồm 40 ID, 7 section ngoài và 40 khối ghi chú. Mục Lecture 5 trong `sources/MIT/README.md` được ghi là trạng thái do điều phối viên xác minh; tác tử GLM không đọc tệp đó.
- Lượt chỉnh sửa này chưa chạy lại Chromium hoặc Codex Slides. Các trang D03, D04, D05 và E04 cần được điều phối viên kiểm tra hiển thị ở cổng trực quan cuối; không dùng kết quả Chromium r4 trước chỉnh sửa làm bằng chứng cho bố cục mới.

## 11. Hợp nhất phản biện về tiên quyết và mã nội bộ

- Phần mở đầu báo trước nội tương đối và dưới gradient là khái niệm sẽ được định nghĩa tại chỗ. Trang Slater định nghĩa $\operatorname{relint}D$ là nội trong bao affine; trang độ nhạy định nghĩa dưới gradient bằng bất đẳng thức đường đỡ trước khi dùng nhân tử.
- Ví dụ KKT một biến dùng $\nabla_xL=0$ và không nhắc nón pháp tuyến trước khi khái niệm này được định nghĩa. Điều kiện bù trừ nêu rõ nghiệm gốc, nghiệm đối ngẫu, tính đạt và $p^*=d^*$.
- Ghi chú QP phân biệt $\operatorname{dom}g=\mathbb R$ với miền khả thi đối ngẫu $\lambda\ge0$. Ghi chú hình học nối Slater với siêu phẳng đỡ có hệ số mục tiêu khác 0 và hệ số góc hữu hạn sau chuẩn hóa.
- Mọi mã vị trí nội bộ đã được loại khỏi mặt trang chiếu và ghi chú diễn giả; mã chỉ còn trong `data-slide-id` và tài liệu planning.
- Mục 8 của kế hoạch đã khớp DOM: ví dụ A02 đi trước trực quan A03; B01→B03→B02 và C01→C03→C02 là thứ tự có chủ ý; A08 gộp ứng dụng với bài tập.

## 12. Kiểm định kỹ thuật cuối ngày 2026-08-30

- Bỏ `maximum-scale` và `user-scalable` khỏi viewport để không chặn phóng đại hỗ trợ tiếp cận; thêm favicon dữ liệu rỗng để loại lỗi 404 không liên quan.
- Cổng 8765 đang được một kho khác sử dụng nên không bị dừng hoặc thay đổi. Kiểm định HTTP dùng cổng tạm 8876; HTML, bốn SVG cục bộ, RevealJS, plugin, KaTeX và phông đều trả 200 hoặc 304.
- Chromium duyệt đúng 40 cặp chỉ số RevealJS ở 1280 × 720, 800 × 600 và 720 × 900. Không có lỗi bảng điều khiển, lỗi trang hoặc yêu cầu thất bại.
- Kiểm tra trực quan riêng P01, B04, C05, D03, D04, D05, E04, E05, E06 và Z02. Các định nghĩa mới tại B04/E04 nằm trọn khung; E05 hiển thị đủ ba miền; E06 sát đáy nhưng không cắt nội dung.
- Cảnh báo hộp đo hình học tại B04/E06 đến từ phần điều khiển/biên thẻ gần đáy; `scrollWidth` và `scrollHeight` đều không vượt vùng chứa, ảnh chụp xác nhận nội dung nhìn thấy không tràn.
- Tái kiểm sinh viên, toán học và mạch kể chuyện sau sửa đều đạt bằng GLM 5.3 Flash qua OpenRouter. Codex Slides vẫn không khả dụng; không dùng nó làm bằng chứng kiểm định.

## 13. Ghi chú bài giảng và SVG ngày 2026-08-31

- Ghi chú công khai được xây thành 6 mạch A–F và 15 chủ đề. Hai chủ đề bổ sung là điểm yên ngựa của hàm Lagrange và nón pháp tuyến; chúng nối lần lượt đối ngẫu mạnh với KKT và điều kiện dừng với miền biến tổng quát.
- Mỗi chủ đề có mục tiêu đọc hiểu, định nghĩa và giả thiết, trực quan, ví dụ tính được, ứng dụng trong AI, điểm dễ nhầm, câu hỏi kiểm tra và đầu ra. Phần định lý và chứng minh được tách khỏi tuyến giải thích chính.
- Rà soát toán học đã sửa miền $x\in D$ trong hàm giá trị, giả thiết hữu hạn trước khi dùng dưới vi phân, phiên bản Slater tinh chỉnh, dấu độ nhạy và giả thiết nón proper. Hậu kiểm toán học đạt.
- Rà soát mạch đọc đã bỏ một tiêu đề tạo mạch thứ bảy, rút phần QP lặp lại thành phép tái sử dụng kết quả và chỉ nhúng hình KKT một lần. Hậu kiểm mạch kể chuyện và văn phong đạt.
- Năm SVG của bài được đối chiếu với công thức và raster hóa ở 900 px và 600 px. Đã sửa nhãn độ nhạy bị cắt, bổ sung tập mở rộng trong hình học đối ngẫu, sửa phía tô của nửa không gian KKT và đồng nhất tỉ lệ hai trục. Cả năm hình phân tích XML thành công, có `role`, `title`, `desc`, không dùng script, `foreignObject`, ảnh nhúng hoặc tài nguyên mạng.
- Máy chủ HTTP cục bộ tại cổng tạm 8877 trả 200 cho viewer, Markdown và năm SVG. Không có Browser tích hợp trong lượt này, nên không tuyên bố đã kiểm tra bề mặt bằng Codex Slides; cổng hình dùng raster cục bộ và kiểm tra HTTP.
- Liên kết ghi chú Bài 03 chỉ được mở trên trang chỉ mục sau khi các cổng nội dung, công thức, khối Markdown, tài sản và HTTP đều đạt.

## 14. Đồng bộ slide với ghi chú và bổ sung điểm yên ngựa ngày 2026-09-01

- Hai lượt đọc trước soạn phát hiện khoảng trống chính: ghi chú đã có định nghĩa, ví dụ và định lý về điểm yên ngựa của hàm Lagrange nhưng deck chuyển thẳng từ hình học đường đỡ sang KKT. Quyết định thêm đúng một trang C07 sau C06, giữ 7 mạch và mọi trang cũ.
- Tác tử soạn OpenRouter được gọi với mô hình yêu cầu z-ai/glm-5.3-flash, phạm vi sáu tệp Bài 03 và khóa từ .env. API trả HTTP 200 nhưng worker kết thúc mà không trả JSON hoàn tất; nó sửa dở năm tệp. Điều phối viên kiểm tra diff, sửa lỗi gạch chéo kép và hoàn thiện bằng bản vá cục bộ. Không có api_transport_error.
- Deck hiện có 41 ID duy nhất, 41 khối ghi chú và 7 section ngoài. Thứ tự DOM là P00–P03, A01–A08, B01→B03→B02→B04–B06, C01→C03→C02→C04–C07, D01→D05→D02–D04→D06–D07, E01–E06 và Z01–Z03.
- C07 định nghĩa đúng hai phía của điểm yên ngựa, dùng ví dụ $(x^*,\lambda^*)=(2,2)$ với $L(2,\lambda)=5$ và $L(x,2)=3(x-2)^2+5$, rồi nối định lý tương đương nghiệm đạt và $p^*=d^*$ sang KKT. Chứng minh đầy đủ tiếp tục nằm trong ghi chú bài giảng.
- Các sửa tiên quyết cục bộ: A04 chỉ định nghĩa $L$ và báo A05 mới định nghĩa $g$; A07 giải nghĩa khả thi đối ngẫu bằng $\lambda\ge0$; C03 gọi tên đường đỡ; C05 dùng $\lambda_i^*\nabla f_i(x^*)$ cho ràng buộc hoạt động; D04 báo trước trường hợp không khả vi và chỉ tới định nghĩa dưới gradient ở E04; E06 định nghĩa $\mathbb S^r$, $\mathbb S_+^r$ và $K^*$ trước khi dùng.
- Năm phản biện độc lập đều dùng z-ai/glm-5.3-flash qua OpenRouter. Vai chuyên gia và toán học PASS ngay. Vai sinh viên, sư phạm và mạch kể chuyện yêu cầu các sửa nhỏ về câu nối C05→C06→C07, E06→Z01, ký hiệu ma trận, cụm “khả thi đối ngẫu”, đường đỡ và câu D01 trong outline; mọi mục đã được áp dụng.
- Hậu kiểm toán học sau sửa PASS cho A05, A07, C03, C05, C07 và E06. Hậu kiểm mạch kể chuyện sau sửa PASS cho 41 ID, 7 mạch và sáu nối A04→A05, C05→C06, C06→C07, C07→D01, D04→E04, E06→Z01.
- Cổng tĩnh đạt: git diff --check sạch; bộ phân tích HTML xác nhận thẻ cân bằng; không còn chuỗi LaTeX bị gạch chéo kép; HTML, CSS, RevealJS, bốn plugin, KaTeX đúng đường dẫn vendor/katex/dist/ và bốn SVG của deck đều trả HTTP 200 trên máy chủ chỉ gắn 127.0.0.1. Một lần dò nhầm vendor/katex/katex.min.js trả 404; đây không phải URL mà plugin tải và lần kiểm tra đúng vendor/katex/dist/katex.min.js trả 200.
- Dự án Codex Slides bền vững 20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls đã được mở lại và thay dàn ý bằng đúng 41 tiêu đề theo thứ tự RevealJS. Hậu kiểm canonical bằng get_project trả 41 slide, trạng thái draft và handoff tại checkpoint outline. Bề mặt Browser tích hợp và trình duyệt headless không có trong môi trường hiện tại, nên không tuyên bố đã xem trực quan C07/E06 hoặc kiểm tràn bằng Codex Slides/Chromium trong lượt này. Các bằng chứng trực quan cũ không được dùng thay cho kiểm tra sau sửa.

## 14. Chỉnh sửa theo AGENTS.md — thêm C07 và các sửa cục bộ

- **Lý do thay đổi:** đưa khái niệm điểm yên ngựa của hàm Lagrange từ lecture note vào deck và nối đối ngẫu mạnh với KKT; đồng thời áp dụng các sửa cục bộ đã chốt. Giữ nguyên 7 mạch P/A/B/C/D/E/Z và thứ tự mọi slide hiện có; chỉ chèn đúng một slide C07 sau C06, trước D01. Tổng số trang tăng từ 40 lên 41.
- **C07 (mới):** tiêu đề "Điểm yên ngựa của hàm Lagrange"; định nghĩa $L(x^*,\lambda,\nu)\le L(x^*,\lambda^*,\nu^*)\le L(x,\lambda^*,\nu^*)$ với mọi $x\in D$, $\lambda\ge0$, $\nu\in\mathbb R^p$; giải thích cực đại theo nhân tử và cực tiểu theo biến gốc; ví dụ xuyên suốt $x^*=2$, $\lambda^*=2$ với $L(2,\lambda)=5$ và $L(x,2)=3(x-2)^2+5$; định lý ngắn: điểm yên ngựa tương đương nghiệm gốc và đối ngẫu đều đạt cùng $p^*=d^*$. Notes giải thích hai phía và nối sang KKT. Nguồn: Boyd & Vandenberghe (2004), Ch. 5, §5.4; lecture note. Một luận điểm duy nhất, không quá tải.
- **Sửa cục bộ đã áp dụng:**
  - A04: không nhắc $g$ như đã định nghĩa; nói $g$ xuất hiện ở trang kế tiếp.
  - A05: notes thêm chứng minh lõm một câu bằng bất đẳng thức infimum của tổ hợp lồi.
  - B04: notes nói đường chứng minh Slater dùng định lý tách cho tập mở rộng lồi, chi tiết ở lecture note.
  - C05: notes nói $\lambda^*\nabla f$ sẽ được hình thức hóa bởi điều kiện dừng ở mạch D.
  - D04: mặt trang không dùng dưới vi phân như kiến thức đã biết; nói trường hợp không khả vi cần điều kiện dừng tổng quát và dưới gradient được định nghĩa ở E04; notes thêm phản ví dụ phi lồi $\min_{[-1,1]}-x^2$ với $x=0$ dừng nhưng không tối ưu toàn cục.
  - E04: notes thêm ví dụ $q(u)=|u|$, $\partial q(0)=[-1,1]$.
  - E06: định nghĩa rõ $K^*=\{z:\langle z,y\rangle\ge0\text{ với mọi }y\in K\}$; dùng $\lambda\in K^*$; notes chứng minh $\langle\lambda,f(x)\rangle\le0$ cho $x$ khả thi và nêu nón PSD tự đối ngẫu, không tuyên bố nón đối ngẫu đã là tiên quyết.
  - Z01: thêm điểm yên ngựa vào bước Giải thích và notes.
- **Đồng bộ planning:** plan.md, outline.md, storyboard.md và source-map.md đã cập nhật từ 40 thành 41 trang, dải C01–C07, danh sách DOM chèn C07, bản đồ hành trình/định lý, câu nối C06→C07→D01 và nguồn C07 (Boyd §5.4, lecture note). Không xóa lịch sử cũ trong nhật ký này.
- **Trạng thái:** chờ 5 phản biện độc lập (sinh viên, chuyên gia, độ chính xác toán học, học thuật–giảng dạy, mạch kể chuyện) và kiểm định kỹ thuật (Chromium 16:9 và màn hình hẹp, KaTeX, ghi chú, tràn hiển thị) trước khi đóng cổng bàn giao.

## 15. Rà văn phong và mạch khái niệm ngày 2026-09-01

- Đã đọc lại toàn bộ 41 trang và ghi chú bài giảng theo tiêu chí `no-ai-slop`. Ghi chú diễn giả không còn các cụm `Chuyển ý:`, tham chiếu mã mạch, lời mô tả “trang này/trang sau”, hay chỉ dẫn tới lecture note và `math-spec.md`.
- Các cầu nối được viết bằng quan hệ toán học: cận trên từ điểm khả thi dẫn tới nhu cầu cận dưới; Slater dẫn tới tiếp xúc đường đỡ; pháp tuyến dẫn tới KKT; điểm yên ngựa liên kết nghiệm gốc và đối ngẫu.
- Dòng nguồn trên slide chỉ giữ nguồn truy nguyên. Các câu xác nhận “được tính/kiểm tra trong math-spec” được chuyển về hồ sơ kiểm định thay vì lặp trên từng trang.
- Ghi chú bài giảng bỏ các dòng `Đầu ra` lặp mục tiêu đọc hiểu và bỏ tham chiếu tới tệp planning nội bộ. Định nghĩa, ví dụ, định lý, chứng minh, ứng dụng AI và câu hỏi kiểm tra được giữ nguyên.
- Kiểm định tĩnh đạt: 41 mã duy nhất, 41 ghi chú, 7 section ngoài; thẻ `section` và `aside` cân bằng; mọi tài sản tồn tại; SVG hợp lệ theo XML; `git diff --check` đạt.
- Codex Slides xác nhận dự án `20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls` ở trạng thái draft với đúng 41 trang. Phiên hiện tại không có Browser hoặc trình duyệt headless nên không tuyên bố có vòng rà trực quan mới.
- Hậu kiểm toàn khóa thay câu mô tả “mạch đo LLO5” bằng quan hệ giữa biến quyết định và không gian giá trị; nội dung toán và thứ tự trang không đổi.
