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
- Chế độ khả thi dùng biến phụ $w$; chế độ primal–dual dùng $\Delta\nu$; không trộn hai đại lượng.

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
| Chromium 1600×900 và màn hình hẹp | chờ kiểm định riêng | — |

## 7. Kiểm định storyboard

| Mức độ | Trang/cụm | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| trung bình | P03 | Bản đồ cũ tách hướng và bước nhưng không có chặng riêng cho mạch D | Năm ô trên mặt trang không ánh xạ một-một A–E | Sửa thành phương pháp giảm; gradient/chuẩn; Newton/độ cong; bảo đảm/tự điều chỉnh; khả thi/đẳng thức | đã sửa; chờ rà lại |
| trung bình | D03 | Dấu bằng công thức đúng nhưng trực quan “độ cong tự khống chế” chưa được lượng hóa | Chưa hiển thị tỷ số không thứ nguyên dẫn tới hằng số 2 | Thêm $|\phi'''|/(\phi'')^{3/2}=2$ và vai trò tử số–mẫu số | đã sửa; chờ rà lại |
| nghiêm trọng | E06 | Thuật toán không khả thi chưa đủ để sinh viên thực hiện độc lập | Chỉ ghi “backtracking theo $\|r\|_2$”, thiếu nhu cầu, đầu vào, điều kiện nhận bước và cập nhật | Mở bằng khó tìm điểm khả thi; thêm đầu vào, hai phần dư, hệ, điều kiện co residual, cập nhật và hai ngưỡng dừng | đã sửa; chờ rà lại |
| trung bình | D04 | Phép tính đóng chỉ được liệt kê, chưa tạo sản phẩm ứng dụng LLO7 | Không có hàm nhiều chiều được nhận dạng hoặc dựng | Dựng $-\sum_i\log(b_i-a_i^Tx)$ bằng hợp affine và lấy tổng; khóa hệ số chuẩn $c\ge1$ | đã sửa; chờ rà lại |
| trung bình | Z02 | Bài tổng hợp gắn LLO6–10 nhưng chưa có câu đo riêng LLO7 | Các câu chỉ đo gradient, Newton, hội tụ và đẳng thức | Thêm câu dựng hàm chắn log tự điều chỉnh bằng phép tính đóng, kèm đáp án trong notes | đã sửa; chờ rà lại |
| trung bình | Hành trình A–B | Một hàng gộp che khuất đầu ra riêng của phương pháp giảm và lựa chọn chuẩn | Storyboard không cho thấy A07 là sản phẩm để B dùng | Tách thành hai hàng A và B, giữ dữ kiện A04 truyền sang B | đã sửa; chờ rà lại |
| trung bình | Hành trình E | Một hàng gộp che hai chế độ khả thi và không khả thi | $w$ và $\Delta\nu$ có vai trò khác nhưng chưa có hai tuyến kiểm tra riêng | Tách hai hàng; ghi E01–E02 là phần dùng chung và khóa sản phẩm từng nhánh | đã sửa; chờ rà lại |
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
| trung bình | E03–E06 | Thiếu kích thước $F,z,w,\nu,\Delta\nu$ và điều kiện điểm thử thuộc miền | Khóa đầy đủ kiểu đại lượng trên mặt hoặc notes; thêm $x+t\Delta x\in\operatorname{dom}f$ | đã sửa |
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

- **Cổng toán học cuối:** đạt; không còn lỗi chặn bàn giao, nghiêm trọng hoặc trung bình. Tác tử toán xác nhận lại quỹ đạo chỉ hội tụ khi $k\to\infty$, điều kiện khả nghịch của ca hồi quy, định nghĩa vector phần dư ghép và hình hai pha Newton.
- **Cổng storyboard, chuyên gia, học thuật và mạch kể chuyện:** đạt; đúng 40 trang và 7 mạch P/A/B/C/D/E/Z, không còn lỗi từ trung bình trở lên trong phạm vi hậu kiểm.
- **Chromium r4:** duyệt đủ 40/40 trang tại 1600×900 và 720×1280; 0 trang tràn, 0 phần tử vượt khung, 0 lỗi KaTeX. Contact sheet được xem trực tiếp; không phát hiện chồng lấn. Lỗi console duy nhất là favicon 404, không ảnh hưởng bộ trang chiếu.
- **Codex Slides:** dự án bền vững `20260828120744-lecture-04-t-i-u-tr-n-v-r-ng-bu-c-ng-th--d4es` chứa 6 nguồn đúng vai trò và dàn ý 40 trang đồng nhất thứ tự với RevealJS. Browser tích hợp không khả dụng trong phiên này, nên không tuyên bố đã rà trực quan bằng Codex Slides; cổng trực quan dùng Chromium cục bộ.
- Hai trang chỉ mục, commit riêng và push do điều phối viên thực hiện sau kiểm tra HTTP cuối.
