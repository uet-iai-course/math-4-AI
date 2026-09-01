# Nhật ký rà soát Bài giảng 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

## 1. Trạng thái bản nháp

- Bản nháp triển khai có 40 trang, đúng 7 section ngoài P/A/B/C/D/E/Z; số trang và thứ tự không đổi sau vòng sửa storyboard ngày 2026-08-28.
- Đã khóa toán trong `math-spec.md`, đồng bộ `outline.md`, `storyboard.md`, RevealJS và năm SVG cục bộ.
- Báo cáo kiểm định storyboard vòng 1 và đủ năm báo cáo độc lập đã được hợp nhất vào HTML, SVG, `math-spec.md`, outline và storyboard. Vòng kiểm định lại độc lập, Chromium rộng/hẹp và Codex Slides do điều phối viên thực hiện; chưa sẵn sàng cập nhật chỉ mục, commit hoặc push.

## 2. Nguồn và quyết định sử dụng

| Nguồn/tài sản | Vai trò | Quyết định |
|---|---|---|
| Đề cương UET.AI2012 | Buổi 4, LLO6–10/CLO1–2, 2 LT + 1 BT | nguồn thẩm quyền phạm vi |
| `sources/part1.docx` | Tuần 4 và yêu cầu nghiêm ngặt | khung học thuật, không dùng làm nguồn công thức |
| `sources/bv_cvxbook.pdf`, Chương 9–10 | định nghĩa, thuật toán, hội tụ, Newton–KKT | nguồn toán học chính |
| MIT 6.079/6.975 Lecture 16 | thứ tự tối ưu không ràng buộc | dùng một bản chuẩn; không tính ba bản trùng độc lập |
| MIT 6.079/6.975 Lecture 17 | thứ tự tối ưu đẳng thức | dùng bản chuẩn hiện có |
| `sources/Chương 5.pdf` | thuật ngữ tiếng Việt | đối chiếu; mọi công thức kiểm lại bằng Boyd/MIT |
| Hai PDF Chương 6 viết tay | thuật ngữ và ghi chú bổ sung | không dùng làm thẩm quyền hoặc tài sản hình |
| `img/lec-04/*.svg` | đường mức, Armijo, mô hình Newton, hai pha, không gian rỗng | tự vẽ; không dùng raster nguồn |

Danh mục và quyền Lecture 16–17 đã được ghi tại `sources/MIT/README.md` và `source-provenance.md`. Giấy phép MIT OCW là CC BY-NC-SA 4.0; không dùng trực tiếp tài sản bên thứ ba.

## 3. Quy ước toán đã khóa

- Gradient là steepest descent theo chuẩn Euclid; chuẩn tổng quát phải đi cùng chuẩn đối ngẫu.
- Backtracking dùng $\alpha\in(0,1/2)$, $\beta\in(0,1)$ và điều kiện Armijo không nghiêm.
- Newton giải $H\Delta=-g$; không lập $H^{-1}$.
- Newton decrement dùng $\delta_N$, không dùng $\lambda$.
- Hội tụ tuyến tính hoặc bậc hai chỉ phát biểu cùng giả thiết lồi mạnh, chặn Hessian hoặc Hessian Lipschitz và line search thích hợp.
- Hệ Newton–KKT khóa $A\in\mathbb R^{p\times n}$, $\operatorname{rank}A=p<n$, và $H$ xác định dương trên $\operatorname{null}A$.
- Chế độ khả thi dùng biến phụ $\eta$; chế độ primal–dual dùng $\Delta\nu$; không trộn hai đại lượng.

## 4. Sai khác có chủ ý so với mẫu

- Dùng hai ví dụ xuyên suốt để giảm chuyển ngữ cảnh.
- Đảo ví dụ trước định nghĩa tại B03, C03 và D03 theo yêu cầu hành trình khái niệm.
- Đặt C07 trước mạch D thay vì để phần triển khai ở cuối Lecture 16 như MIT. Mục đích là đóng LLO8 về thực hiện Newton trước khi chuyển sang LLO7; phần đếm phép toán được lược và thời lượng chuyển sang Newton–KKT.
- Lược các đồ thị thực nghiệm và ứng dụng dài của MIT; vẽ lại năm hình cục bộ từ công thức.
- Lược trust-region, quasi-Newton, điểm trong và bài toán bất đẳng thức tổng quát vì ngoài phạm vi Buổi 4.

## 5. Codex Slides

- Dự án Codex Slides và trạng thái nguồn do điều phối viên quản lý; tác tử triển khai này không có bề mặt Browser tích hợp để xác minh trực quan.
- RevealJS dùng `source-map.md` và `math-spec.md` làm thẩm quyền. Chỉ tuyên bố đồng bộ Codex Slides sau khi điều phối viên render và kiểm tra dự án bền vững.

## 6. Kiểm tra kỹ thuật bản nháp

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| 40 ID duy nhất, đúng thứ tự | đạt | kiểm tra lại sau sửa: P00–Z03, không thêm/bỏ/đổi thứ tự |
| 40 ghi chú, mỗi ghi chú hai đoạn | đạt | kiểm tra lại sau sửa: 40 notes, tập số đoạn là `{2}` |
| 7 section ngoài | đạt | P/A/B/C/D/E/Z |
| HTML và đường dẫn cục bộ | đạt | bộ phân tích HTML chuẩn kiểm tra cân bằng section; 17 tham chiếu cục bộ đều tồn tại |
| KaTeX | đạt | 239 công thức được `renderToString` phân tích, 0 lỗi |
| SVG/XML và văn bản thay thế | đạt | 5 SVG phân tích XML thành công; 7 lần nhúng đều có `alt` |
| `git diff --check` | đạt | kiểm tra `--no-index --check` cho HTML/outline/storyboard/review-log, không có lỗi khoảng trắng |
| Chromium 1600×900 và màn hình hẹp | đạt | xem thêm kiểm định bàn giao ở Mục 11 |

## 7. Kiểm định storyboard

| Mức độ | Trang/cụm | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| trung bình | P03 | Bản đồ cũ tách hướng và bước nhưng không có chặng riêng cho mạch D | Năm ô trên mặt trang không ánh xạ một-một A–E | Sửa thành phương pháp giảm; gradient/chuẩn; Newton/độ cong; bảo đảm/tự điều chỉnh; khả thi/đẳng thức | đã sửa; chờ rà lại |
| trung bình | D03 | Dấu bằng công thức đúng nhưng trực quan “độ cong tự khống chế” chưa được lượng hóa | Chưa hiển thị tỷ số không thứ nguyên dẫn tới hằng số 2 | Thêm $|\phi'''|/(\phi'')^{3/2}=2$ và vai trò tử số–mẫu số | đã sửa; chờ rà lại |
| nghiêm trọng | E06 | Thuật toán không khả thi chưa đủ để sinh viên thực hiện độc lập | Chỉ ghi “backtracking theo $\|r\|_2$”, thiếu nhu cầu, đầu vào, điều kiện nhận bước và cập nhật | Mở bằng khó tìm điểm khả thi; thêm đầu vào, hai phần dư, hệ, điều kiện co residual, cập nhật và hai ngưỡng dừng | đã sửa; chờ rà lại |
| trung bình | D04 | Phép tính đóng chỉ được liệt kê, chưa tạo sản phẩm ứng dụng LLO7 | Không có hàm nhiều chiều được nhận dạng hoặc dựng | Dựng $-\sum_i\log(b_i-a_i^Tx)$ bằng hợp affine và lấy tổng; khóa hệ số chuẩn $c\ge1$ | đã sửa; chờ rà lại |
| trung bình | Z02 | Bài tổng hợp gắn LLO6–10 nhưng chưa có câu đo riêng LLO7 | Các câu chỉ đo gradient, Newton, hội tụ và đẳng thức | Thêm câu kiểm tra trực tiếp điều kiện đạo hàm bậc ba của $\phi(s)=s-\log s$ và giả thiết dùng decrement; kèm đáp án trong notes | đã sửa |
| trung bình | Hành trình A–B | Một hàng gộp che khuất đầu ra riêng của phương pháp giảm và lựa chọn chuẩn | Storyboard không cho thấy A07 là sản phẩm để B dùng | Tách thành hai hàng A và B, giữ dữ kiện A04 truyền sang B | đã sửa; chờ rà lại |
| trung bình | Hành trình E | Một hàng gộp che hai chế độ khả thi và không khả thi | $\eta$ và $\Delta\nu$ có vai trò khác nhưng chưa có hai tuyến kiểm tra riêng | Tách hai hàng; ghi E01–E02 là phần dùng chung và khóa sản phẩm từng nhánh | đã sửa; chờ rà lại |
| nhẹ | C07→D | Sai khác thứ tự với MIT chưa được truy nguyên | C07 nằm trước D dù phần triển khai ở cuối Lecture 16 | Ghi khác biệt có chủ ý trong HTML notes, outline, storyboard và nhật ký; lý do là đóng LLO8 | đã sửa; chờ rà lại |
| trung bình | C/D/E | Thời lượng E chưa phản ánh tải của hai thuật toán Newton–KKT | E có ít LT hơn C dù gồm khử và hai chế độ | Chuyển 0,05 LT từ C và 0,05 LT từ D sang E; tổng giữ 2 LT + 1 BT | đã sửa; chờ rà lại |

Phạm vi rà lại bắt buộc: P03; C07–D05; E04–E07; Z02; hai trang lân cận mỗi phía và toàn bộ ranh giới C→D, D→E, E→Z. Vòng sửa không thêm, bỏ hoặc đổi thứ tự trang.

## 8. Năm báo cáo rà soát độc lập và quyết định chỉnh sửa

### 8.1. Góc nhìn sinh viên

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| nghiêm trọng | C01 và `newton-model.svg` | Hai đường cũ không tiếp xúc nên hình không thể hiện đúng Taylor cùng giá trị, dốc và độ cong tại $x$ | Vẽ lại từ $m(v)=2-2v+v^2$ và $f(x+v)=m(v)+0{,}08v^4$; khóa $H>0$, $v=0$, cực tiểu $v=\Delta x_N=1$ | đã sửa |
| trung bình | A04/B03 | A04 lộ toàn quỹ đạo trước khi mạch B tạo nhu cầu về điều kiện hóa | A04 dùng SVG nội dòng chỉ có đường mức, điểm đầu và gradient; B03 mới dùng quỹ đạo đầy đủ lấy mẫu đúng | đã sửa |
| trung bình | C08/D05 | Đáp án hiện sẵn làm mất vai trò kiểm tra | Chuyển toàn bộ kết quả vào ghi chú diễn giả; mặt trang chỉ giữ yêu cầu và dữ kiện | đã sửa |
| trung bình | E06/Z02 | Tải chữ quá cao, khó đọc và khó thao tác | E06 giữ phần dư, hệ, khuôn chọn bước/cập nhật/dừng; bất đẳng thức quay lui chuyển notes. Z02 còn bốn nhiệm vụ đại diện | đã sửa |

### 8.2. Góc nhìn chuyên gia

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| nghiêm trọng | D04–D05/Z01 | Định nghĩa tự điều chỉnh chưa trả lời bảo đảm Newton nào nhận được | Thêm phát biểu có điều kiện theo decrement: pha giảm bước, bước đầy đủ gần nghiệm và cận $\omega_*$; thu hồi ở Z01, không biến thành thuật toán mới | đã sửa |
| trung bình | B04–B05 | Chuẩn đối ngẫu và kết luận hội tụ tuyến tính chưa được phát biểu đủ | Thêm $\|g\|_*=\max_{\|v\|\le1}g^Tv$; khóa $\mu I\preceq H\preceq MI$, bước phù hợp và $\kappa=M/\mu$ | đã sửa |
| trung bình | E02/Z02 | Liên kết AI còn chung chung | Thêm hồi quy trơn $\frac12\|Xw-y\|^2$ với $\mathbf1^Tw=1$, phân loại lồi trơn/đẳng thức affine, chọn Newton–KKT và dừng phù hợp | đã sửa |
| nhẹ | A05 | Thuật ngữ tiếng Anh xuất hiện trước cách gọi Việt | Dùng “tìm kiếm đường chính xác (exact line search)” ở lần đầu | đã sửa |

### 8.3. Độ chính xác toán học

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| nghiêm trọng | A06 và `armijo-backtracking.svg` | Đường cong cũ không khớp các giá trị $405$, $92{,}5$, $39{,}375$ | Vẽ lại đúng $q(t)=55-200t+550t^2$, đường $55-20t$, đáy $2/11$ và ba quyết định bước | đã sửa |
| nghiêm trọng | E04/Z01 | Decrement có ràng buộc chưa có đẳng thức và tiêu chuẩn dừng | Khóa $\delta_{\rm eq}^2=\Delta x^TH\Delta x=-g^T\Delta x$; dừng $\delta_{\rm eq}^2/2\le\varepsilon$ | đã sửa |
| trung bình | D04 | Thiếu kiểu $a_i,b_i,m$ và giả thiết miền trong | Thêm $a_i\in\mathbb R^n$, $b_i\in\mathbb R$, $m\in\mathbb N$ và miền trong khác rỗng | đã sửa |
| trung bình | E03–E06 | Thiếu kích thước $F,z,\eta,\nu,\Delta\nu$ và điều kiện điểm thử thuộc miền | Khóa đầy đủ kiểu đại lượng trên mặt hoặc notes; thêm $x+t\Delta x\in\operatorname{dom}f$ | đã sửa |
| trung bình | `quadratic-zigzag.svg`, `newton-phases.svg` | Tọa độ quỹ đạo và hình pha hội tụ chưa chứng minh đúng đại lượng | Lấy mẫu đúng $(10\rho^k,(-\rho)^k)$; chỉnh điểm pha bậc hai trên trục log sai số để độ dốc tăng | đã sửa |

### 8.4. Phản biện học thuật và giảng dạy

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| trung bình | C06 | Chỉ gọi “hội tụ bậc hai” mà chưa nêu đại lượng/truy hồi | Thêm $\|x^{(k+1)}-x^*\|\le C\|x^{(k)}-x^*\|^2$ cùng giả thiết | đã sửa |
| trung bình | C07/E07 | Tên bộ giải chưa thành quy tắc lựa chọn | C07 giữ Cholesky khi Hessian xác định dương; E07 dùng LDLT có pivot cho hệ bất định, bổ Schur khi cấu trúc/điều kiện hóa phù hợp | đã sửa |
| trung bình | Z02 | Bảy nhiệm vụ trên mặt trang tạo tải đánh giá quá mức | Giữ bốn nhiệm vụ đại diện, chuyển phép tính phụ và phân biệt ký hiệu sang notes/tự học | đã sửa |
| nhẹ | C07→D | Đề xuất chuyển C07 về cuối phần tự điều chỉnh theo thứ tự mẫu MIT | Không áp dụng: giữ C07 trước D để đóng LLO8 về triển khai Newton trước khi chuyển sang LLO7; sai khác đã ghi trong outline/storyboard | giữ có lý do |

### 8.5. Mạch kể chuyện và điểm kết nối

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| nghiêm trọng | D05→E01 | Cầu nối cũ chỉ đổi chủ đề, chưa nói kết quả nào không còn đủ | Ghi rõ tự điều chỉnh kiểm soát độ cong nhưng không giữ $Ax=b$; E kết hợp mô hình Newton C với KKT | đã sửa |
| trung bình | E07→Z01 | Ghi chú chưa chỉ đầu ra nào được bảng quyết định thu hồi | Nối trực tiếp nghiệm hệ/phần dư sang hàng Newton–KKT trong Z01 | đã sửa |
| trung bình | Z03 | Chuyển tiếp Bài 05 chưa nêu thay đổi khái niệm | Làm nổi cảnh quan phi lồi, gradient nhiễu và minibatch; giữ khuôn hướng–bước–dừng | đã sửa |
| nhẹ | 7 mạch/40 trang | Có đề xuất thêm một trang riêng cho bảo đảm tự điều chỉnh | Không áp dụng: gộp vào D04 và thu hồi Z01 vì vẫn một luận điểm trung tâm, tránh tạo mạch/trang để bù số lượng | giữ 40 trang, 7 mạch |

## 9. Quyết định tài sản

- `quadratic-zigzag.svg` chỉ dùng ở B03; A04 dùng SVG nội dòng riêng trên mặt trang để không tạo tệp tài sản thứ sáu và không lộ quỹ đạo sớm.
- `armijo-backtracking.svg`, `newton-model.svg`, `newton-phases.svg` được vẽ lại từ công thức; `equality-nullspace.svg` được giữ vì quan hệ $A\Delta x=0$ đúng và không dùng dữ liệu định lượng.
- Không áp dụng đề xuất sao chụp hình từ MIT: toàn bộ hình vẫn là SVG tự vẽ, có `title`/`desc` hoặc `alt`, và nguồn được truy nguyên trong notes.

## 10. Việc còn lại trước bàn giao

### Hậu kiểm toán vòng cuối

| Mức độ | Trang/tài sản | Vấn đề | Quyết định | Trạng thái |
|---|---|---|---|---|
| trung bình | E02 và hồ sơ toán | Ca hồi quy chưa bảo đảm Hessian dương trên không gian rỗng của ràng buộc | Thêm $\operatorname{null}X\cap\operatorname{null}(\mathbf1^T)=\{0\}$ và nêu hệ quả $X^TX\succ0$ trên $\operatorname{null}(\mathbf1^T)$ | đã đóng |
| trung bình | E06 | Chuẩn $\|r\|_2$ được dùng trước khi vector ghép $r$ được định nghĩa | Thêm $r=(r_d^T,r_p^T)^T\in\mathbb R^{n+p}$ trong ghi chú trước bất đẳng thức quay lui | đã đóng |
| nhẹ | `quadratic-zigzag.svg` | Nét cuối nối điểm hữu hạn vào đúng nghiệm gây hiểu nhầm đạt nghiệm sau hữu hạn vòng | Bỏ đoạn nối tới gốc; dùng mũi tên đứt và nhãn $k\to\infty$ | đã đóng |
| nhẹ | `newton-phases.svg` | Điểm cuối sát đáy làm đoạn cuối có thể bị đọc như tốc độ phẳng dần | Dừng chuỗi trước đáy và ghi ký hiệu phần cắt | đã đóng |
| nhẹ | P03, A04, A06, A07, B03, B06, C03, C08, D03, E02, E05, E07, Z02, Z03 | Ghi chú nguồn còn lộ tên tệp nội bộ; P03 và C07 còn mô tả quy trình biên tập | Thay bằng nguồn học thuật hoặc mô tả phép kiểm; loại mã mạch và quyết định thứ tự khỏi notes | đã đóng |
| trung bình | Z01–Z02 | Bảo đảm giảm dốc nhất chưa gắn rõ giả thiết B04; chứng nhận dừng đẳng thức chưa viết đủ ngưỡng | Gắn bảo đảm với giả thiết lồi mạnh, trơn, bước phù hợp; giữ chuẩn dừng $\|g\|_*$; sửa thành $\delta_{\rm eq}^2/2\le\varepsilon$ | đã đóng |
| nhẹ | E06; `2627-1/index.html` | Nhu cầu chế độ không khả thi chưa hiện rõ; tiêu đề chỉ mục lệch tiêu đề deck | Thêm nhu cầu khó tìm điểm đầu khả thi; đồng bộ thành “Tối ưu không ràng buộc và ràng buộc đẳng thức” | đã đóng |
| trung bình | A02, A04, E02, E04–E05, Z02 | Giả thiết $S$ đóng chưa được gọi rõ là bổ sung; điểm ví dụ lệch đường mức; hai chế độ dừng và hai ký hiệu phụ còn dễ lẫn; câu tự kiểm tra chưa đủ dữ kiện | Làm rõ giả thiết; đặt lại điểm/hướng trên SVG; tách decrement khỏi hai chuẩn phần dư; đổi biến phụ khả thi thành $\eta$ nhưng giữ $\Delta\nu$ ở chế độ chưa khả thi; viết lại hai câu tự kiểm tra | đã đóng |

- **Cổng toán học cuối:** đạt; không còn lỗi chặn bàn giao, nghiêm trọng hoặc trung bình. Tác tử toán xác nhận lại quỹ đạo chỉ hội tụ khi $k\to\infty$, điều kiện khả nghịch của ca hồi quy, định nghĩa vector phần dư ghép và hình hai pha Newton.
- **Cổng storyboard, chuyên gia, học thuật và mạch kể chuyện:** đạt; đúng 40 trang và 7 mạch P/A/B/C/D/E/Z, không còn lỗi từ trung bình trở lên trong phạm vi hậu kiểm.
- **Chromium r4:** duyệt đủ 40/40 trang tại 1600×900 và 720×1280; 0 trang tràn, 0 phần tử vượt khung, 0 lỗi KaTeX. Contact sheet được xem trực tiếp; không phát hiện chồng lấn. Lỗi console duy nhất là favicon 404, không ảnh hưởng bộ trang chiếu.
- **Codex Slides:** dự án bền vững `20260828120744-lecture-04-t-i-u-tr-n-v-r-ng-bu-c-ng-th--d4es` chứa 6 nguồn đúng vai trò và dàn ý 40 trang đồng nhất thứ tự với RevealJS. Browser tích hợp không khả dụng trong phiên này, nên không tuyên bố đã rà trực quan bằng Codex Slides; cổng trực quan dùng Chromium cục bộ.
- Chỉ mục học kỳ đã đồng bộ tiêu đề và giữ nguyên liên kết; commit riêng và push do điều phối viên thực hiện sau kiểm tra HTTP cuối.

## 11. Kiểm định bàn giao cục bộ

- Tái kiểm độc lập bằng GLM 5.3 Flash qua OpenRouter đạt ở năm phạm vi bị ảnh hưởng: chuyên gia, sinh viên, độ chính xác toán học, học thuật–giảng dạy và mạch kể chuyện. Vòng toán xác nhận lại đạo hàm của $\phi$, cận theo decrement và hệ Newton–KKT; $\delta_{\rm eq}=0$ sau bước đầy đủ vì phần dư KKT chiếu bằng không và lần giải kế tiếp cho $\Delta x=0$, không phải vì gradient không ràng buộc bằng không.
- Chromium duyệt đủ 40/40 trang tại 1280×720, 800×600 và 720×900 qua máy chủ tạm `127.0.0.1:8876`; cổng 8765 đang thuộc tiến trình khác nên không bị thay đổi. Không có lỗi console, lỗi trang, yêu cầu tải thất bại hoặc tài nguyên cục bộ thiếu.
- Lần chạy đầu phát hiện E01 tràn thật ở 1280×720. Tiêu đề được rút thành “Newton với đẳng thức”; lần chạy lại không còn tràn. Cảnh báo hình học 7,7 px của A04 tại 720×900 có `scrollWidth` và `scrollHeight` bằng vùng hiển thị; ảnh chụp xác nhận toàn bộ hình, công thức và năm gạch đầu dòng đều hiện, nên đây là sai báo do hộp đo trực tiếp của RevealJS.
- Ảnh chụp P03, A04, E01, E02, E06 và Z02 đã được xem trực tiếp. Hình A04 đặt đúng điểm, vector và nhãn; E06, Z02 đọc được, không chồng lấn.
- Đã bỏ khóa phóng to khỏi thẻ viewport và thêm favicon dữ liệu rỗng. Bộ trang chiếu giữ 7 section ngoài, 40 ID duy nhất, 40 ghi chú, 40 đoạn nguồn và 17/17 tham chiếu cục bộ hợp lệ.
- Codex Slides không thể chạy ổn định trong môi trường hiện tại do runtime cục bộ không tương thích và bề mặt Browser không khả dụng. Không tuyên bố đã kiểm định trực quan vòng này bằng Codex Slides; cổng hiển thị cuối dùng Chromium cục bộ theo phương án dự phòng trong `AGENTS.md`.

## 12. Ghi chú bài giảng và SVG ngày 2026-08-31

- Ghi chú công khai gồm 6 mạch A–F và 13 chủ đề. Các cầu nối bổ sung là chứng minh hướng giảm, sự kết thúc của quay lui Armijo, chuẩn đối ngẫu, bất biến affine của Newton, điều kiện không suy biến của hệ KKT và tuyến tính hóa phần dư.
- Mỗi chủ đề có đủ tám thành phần đọc hiểu. Phần định lý và chứng minh được tách khỏi tuyến giải thích chính; nội dung dừng trước gradient ngẫu nhiên, momentum, quasi-Newton và tối ưu phi lồi của các bài sau.
- Vòng biên tập `no-ai-slop` đã bỏ các câu chỉ dẫn nội bộ, phần giải lặp và thuật ngữ Anh không cần thiết. Thuật ngữ `độ giảm Newton`, `quay lui` và `không gian hạt nhân` được dùng nhất quán.
- Sáu SVG được đối chiếu với công thức và raster hóa ở 900 px cùng 600 px. Đã sửa tỷ lệ ellipse–quỹ đạo, nhãn Armijo, mức giảm mô hình, hai pha Newton và hai chế độ Newton–KKT. Cả sáu hình phân tích XML thành công, có `role`, `title`, `desc`, không dùng script, `foreignObject`, ảnh nhúng hoặc tài nguyên mạng.
- Hai vòng rà soát độc lập đã sửa định nghĩa hàm tự điều chỉnh nhiều biến thành hàm lồi $C^3$ trên miền mở, lồi; hậu kiểm toán học và mạch đọc đều đạt.
- Máy chủ HTTP cục bộ tại cổng tạm 8878 trả 200 cho viewer, Markdown và sáu SVG. Không có Browser tích hợp trong lượt này, nên cổng hình dùng raster cục bộ và kiểm tra HTTP.
- Liên kết ghi chú Bài 04 chỉ được mở trên trang chỉ mục sau khi các cổng nội dung, công thức, khối Markdown, tài sản và HTTP đều đạt.

## 13. Vòng chỉnh sửa theo phản hồi ngày 2026-09-01

| Mức độ | Trang/tệp | Lý do thay đổi | Thay đổi | Trạng thái |
|---|---|---|---|---|
| trung bình | A07 | Cụm “chứng nhận phù hợp” mơ hồ, không nói rõ đại lượng kiểm | Ở đây dùng chuẩn gradient; độ giảm Newton và phần dư chỉ xuất hiện sau khi được định nghĩa | đã đóng |
| trung bình | B03 | Thiếu cầu nối giải thích vì sao quỹ đạo zigzag dẫn tới khái niệm chuẩn | Mặt slide gọi rõ quỹ đạo theo chuẩn Euclid; notes nối sang khung chuẩn ở B02 | đã đóng |
| trung bình | B05 | Bảo đảm tuyến tính chưa nêu đủ giả thiết và dễ lẫn với số điều kiện phổ của bậc hai | Nêu $\mu$-lồi mạnh, gradient $M$-Lipschitz, bước $t=1/M$, hệ số co $1-\mu/M$ và phân biệt hai số điều kiện | đã đóng |
| trung bình | D04 | Phép hợp affine và tổng bảo toàn tính tự điều chỉnh chuẩn chưa được truy nguyên | Deck và ghi chú cùng dựng $\Phi(x)=-\sum_i\log(b_i-a_i^Tx)$ với miền, kiểu đại lượng và nguồn Boyd §9.6 | đã đóng |
| trung bình | E02 | Ký hiệu $\delta_{\rm eq}$, $r_d$, $r_p$ xuất hiện trên mặt slide trước khi được định nghĩa | Bỏ ký hiệu và tiêu chuẩn dừng khỏi mặt slide; E04 và E06 định nghĩa chúng đúng vị trí | đã đóng |
| nhẹ | E06 | Bất đẳng thức quay lui theo chuẩn phần dư cần được giữ đúng vị trí | Notes và Chủ đề 12 dùng thống nhất $r$, $\Delta x$, $\Delta\nu$, điều kiện giảm đủ và điểm thử thuộc miền | đã đóng |
| nhẹ | lecture note nhóm F | Thuật ngữ “hàm cưỡng bức” thiếu thuật ngữ Anh chuẩn | Sửa thành “hàm cưỡng bức (coercive)” | đã đóng |
| nhẹ | lecture note tài liệu tham khảo | Tài liệu MIT ghi thiếu giảng viên thứ hai | Ghi Stephen Boyd và Pablo Parrilo theo danh mục nguồn MIT của kho | đã đóng |

Vòng này không thêm, bỏ hoặc đổi thứ tự trang; giữ nguyên 40 slide, 7 mạch và thứ tự DOM. Chỉ sửa `lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html`, `materials/lec-04/lecture-note.md`, `planning/lec-04/outline.md`, `planning/lec-04/storyboard.md`, `planning/lec-04/source-map.md` (không thay đổi nội dung vì đã xác nhận giảng viên Boyd–Parrilo) và `planning/lec-04/review-log.md`.

### Phản biện độc lập và xử lý

- Rà soát sư phạm và kiểm định toán học: đạt, không có lỗi chặn.
- Rà soát sinh viên phát hiện `decrement` xuất hiện sớm ở A07 và ký hiệu bước E06 lệch với ghi chú. A07 nay chỉ dùng chuẩn gradient và báo trước các tiêu chuẩn sau; E06 thống nhất $\Delta x,\Delta\nu$ với Chủ đề 12.
- Rà soát chuyên gia phát hiện cụm “trong ca khả vi hai lần”; đã sửa thành “trong trường hợp khả vi hai lần”. Mục nguồn `§§6.5, 10.1` được giữ vì §6.5 là nguồn cho mô hình hồi quy trơn, còn nghiệm KKT được ghi rõ là phép kiểm tra trực tiếp; siêu dữ liệu Boyd–Parrilo được giữ theo `sources/MIT/README.md` và `source-map.md`.
- Rà soát mạch kể chuyện đề nghị làm lộ cầu B03→B02; mặt B03 nay gọi rõ đây là quỹ đạo theo chuẩn Euclid. Không thêm hộp điều phối lên A07/E02 để tránh tải chữ và nhãn quy trình; cầu nối vẫn hiện ở nội dung B01, E01 và ghi chú diễn giả.

### Cổng bàn giao

- Năm phạm vi rà soát độc lập đã hoàn tất: chuyên gia, sinh viên, toán học, sư phạm và mạch kể chuyện. Các phát hiện nhỏ đã được xử lý; hậu kiểm toán học và mạch kể chuyện đều `PASS`.
- Kiểm tra tĩnh đạt: 40 ID duy nhất, 40 ghi chú diễn giả, 7 section ngoài; thẻ `section`, `div`, `aside`, `ol`, `ul`, `table` cân bằng; Markdown bắt đầu bằng heading cấp một, không dùng delimiter LaTeX ngoài `$...$` và `$$...$$`; `git diff --check` sạch.
- Máy chủ HTTP cục bộ tại cổng tạm 8884 trả 200 cho deck, viewer, Markdown, CSS, RevealJS, plugin, KaTeX và sáu SVG. Máy chủ đã dừng sau kiểm tra.
- Codex Slides xác nhận dự án `20260828120744-lecture-04-t-i-u-tr-n-v-r-ng-bu-c-ng-th--d4es` ở trạng thái draft, có đúng 40 trang, 40 mục outline và sáu nguồn đúng vai trò. Browser tích hợp và trình duyệt headless cục bộ không khả dụng trong phiên này, nên không tuyên bố đã rà trực quan lại sau các thay đổi chữ; cổng hình học trước đó vẫn được ghi ở Mục 11.

## Rà văn phong ngày 2026-09-01

- Đã bỏ 13 dòng `Đầu ra` lặp mục tiêu đọc hiểu trong lecture note; toàn bộ định nghĩa, ví dụ, suy diễn, chứng minh và câu hỏi kiểm tra được giữ nguyên.
- Ghi chú diễn giả A07, B03, D05 và E01 được viết lại bằng quan hệ thuật toán, phổ Hessian, chuẩn đối ngẫu và hệ KKT; không còn nhãn mạch hay lời điều phối “trang sau”.
- Deck giữ đúng 40 mã duy nhất, 40 ghi chú và 7 section ngoài; `git diff --check` đạt. Các sửa chỉ rút gọn chữ, không đổi công thức, hình, số trang hoặc thứ tự.
