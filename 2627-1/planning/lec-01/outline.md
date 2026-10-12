# Dàn ý Bài 01: Giới thiệu tối ưu, tập lồi và hàm lồi

## Trạng thái

Dàn ý triển khai ngày 2026-09-05. Bài được tổ chức theo hướng ứng dụng trước lý thuyết: ba nhu cầu cụ thể tạo dữ kiện và câu hỏi, sau đó mới trừu tượng hóa và xây công cụ chứng nhận. Bộ trang chiếu gồm đúng bảy mạch, tạo thành một tuyến trình chiếu liên tục.

## Phạm vi theo đề cương chính thức

- Học phần: UET.AI2012, Cơ sở toán học của Trí tuệ nhân tạo.
- Bài 01: giới thiệu tối ưu; tập lồi; hàm lồi.
- Phân bổ theo đề cương: 2 tiết lý thuyết và 1 tiết bài tập. Dàn ý không quy đổi tiết sang phút.
- Kiến thức tiên quyết: Giải tích 1, Xác suất thống kê, Đại số tuyến tính cho kỹ thuật.
- LLO1: trình bày được các khái niệm cơ bản của tối ưu toán học, gồm tối ưu lồi và ứng dụng.
- LLO2: trình bày được khái niệm, tính chất của tập lồi và hàm lồi; dùng chúng trong bài toán tối ưu.
- LLO1 và LLO2 cùng hỗ trợ CLO1. Minh chứng của Bài 01 là câu hỏi ngắn trên lớp và bài tập cá nhân hoặc nhóm.

## Vấn đề trung tâm và sản phẩm học tập

Vấn đề trung tâm: từ một nhu cầu cụ thể, xây dựng mô hình tối ưu và xác định điều kiện để kết luận về nghiệm toàn cục, sự tồn tại và tính duy nhất.

Sau bài học, sinh viên phải làm được bốn việc:

1. Tách dữ kiện, biến quyết định, hàm mục tiêu và miền khả thi.
2. Lập mô hình cho điều khiển một bước, hồi quy tuyến tính và hồi quy logistic.
3. Kiểm tra tính lồi của miền và mục tiêu bằng định nghĩa hoặc đạo hàm.
4. Chứng nhận ba kết luận về nghiệm: cực tiểu toàn cục, tồn tại, duy nhất.

Bốn mục tiêu trùng nguyên văn trang `M02` (đồng bộ 2026-10-12).

## Bảy mạch và 52 trang lá

Trạng thái sau đợt sửa văn phong 2026-10-12. Mỗi mạch trừ mạch mở đầu mở bằng một trang tiêu đề mạch (`id="mach-N"`); tên mạch trùng trang "Nội dung" `M02B`.

1. **Mở đầu và ba bài toán tối ưu — M01, M01A, M01B, M02, M02B, M03 (6 trang):** bìa, hai phần học phần, kiểm tra đánh giá, mục tiêu, nội dung, nhu cầu trung tâm với ba quyết định cần tối ưu.
2. **Điều khiển một bước — D00–D04 (5 trang):** mô hình động lực, hàm chi phí bám đích–năng lượng, ví dụ nghiệm trên biên, bài tập chứng minh nghiệm biên.
3. **Hồi quy tuyến tính — L00, L01, L01B, L02–L04 (6 trang):** dự đoán chiều cao từ cân nặng, khái quát sang nhiều đặc trưng, bình phương nhỏ nhất, ví dụ ba điểm, bài tập cột trùng.
4. **Hồi quy logistic — GT, G00–G04 (6 trang):** phân loại cam, biên có dấu, mất mát logistic, ví dụ hai mẫu tách tuyến tính, bài tập dãy tốt dần.
5. **Dạng tổng quát của bài toán tối ưu — T00–T04 (5 trang):** ba thành phần, ba bài toán trong dạng tổng quát, bốn loại kết luận, sáu bước kiểm tra.
6. **Tập lồi và hàm lồi — F00–F05, H01–H07, H07B (14 trang):** tập lồi, hàm lồi, điều kiện vi phân, phép giữ tính lồi, định lý địa phương–toàn cục, tồn tại và duy nhất, bài tập hàm mũ.
7. **Chứng nhận ba bài toán — K00–K04, K06, K05, K05B, K07, K08 (10 trang):** chứng nhận từng trường hợp, so sánh, quy trình chứng nhận, bài tập chiếu sáng có lời giải, tổng kết theo kết quả, tài liệu đọc.

## Phân bổ nội bộ theo tiết

| Mạch | Phân bổ dự kiến | Vai trò |
|---|---:|---|
| 1. Mở đầu và ba bài toán tối ưu | 0,15 tiết lý thuyết | Đặt vấn đề và chuẩn đầu ra |
| 2. Điều khiển một bước | 0,30 tiết lý thuyết | Ca có ràng buộc và nghiệm biên |
| 3. Hồi quy tuyến tính | 0,30 tiết lý thuyết | Ca bậc hai trong học máy |
| 4. Hồi quy logistic | 0,30 tiết lý thuyết | Ca lồi có thể không đạt nghiệm |
| 5. Dạng tổng quát của bài toán tối ưu | 0,20 tiết lý thuyết | Trừu tượng hóa ba trường hợp |
| 6. Tập lồi và hàm lồi | 0,75 tiết lý thuyết | Xây công cụ chứng nhận |
| 7. Chứng nhận ba bài toán | 1,00 tiết bài tập | Chứng nhận, diễn giải và chuyển giao |

Tổng phân bổ là 2 tiết lý thuyết và 1 tiết bài tập, đúng đề cương; đây là dữ liệu điều phối nội bộ, không hiển thị trên trang chiếu hoặc ghi chú diễn giả.

## Ba ca xuyên suốt

### Điều khiển một bước

- Dữ kiện: $x_0,t\in\mathbb R$, trong đó $t$ là đích (target); $u_{\max}\ge 0$, $\lambda\ge 0$.
- Biến quyết định: $u\in[-u_{\max},u_{\max}]$; trạng thái kế tiếp $x_1=x_0+u$.
- Mục tiêu: $q(u)=(x_0+u-t)^2+\lambda u^2$.
- Ví dụ số: $x_0=0$, $t=3$, $\lambda=1/2$, $u_{\max}=1$; $u_{\mathrm{free}}=2$, $u^*=1$, $q(u^*)=9/2$.
- Kết luận cuối bài: miền đóng, bị chặn và lồi; $q$ lồi chặt (còn gọi là lồi nghiêm ngặt) khi $\lambda\ge0$; nghiệm tồn tại và duy nhất. Nghiệm biên không cần thỏa $q'(u^*)=0$.

### Hồi quy tuyến tính

- Dữ kiện: $X\in\mathbb R^{n\times d}$, $y\in\mathbb R^n$.
- Biến quyết định: $w\in\mathbb R^d$.
- Mục tiêu: $J(w)=\lVert Xw-y\rVert_2^2$.
- Ví dụ số: $X=[(1,0);(1,1);(1,2)]$, $y=(1,2,2)^T$; $w^*=(7/6,1/2)^T$, tổng bình phương sai số bằng $1/6$.
- Kết luận cuối bài: $J$ lồi; luôn có ít nhất một nghiệm; nghiệm duy nhất khi và chỉ khi $X$ có hạng cột đầy đủ.

### Hồi quy logistic

- Dữ kiện: $a_i\in\mathbb R^d$, $y_i\in\{-1,+1\}$, $i=1,\ldots,n$.
- Biến quyết định: $w\in\mathbb R^d$.
- Mục tiêu: $L(w)=\sum_i\log(1+\exp(-y_i a_i^Tw))$.
- Ví dụ số tách tuyến tính: $(a_1,y_1)=(1,+1)$, $(a_2,y_2)=(-1,-1)$; $L(w)=2\log(1+e^{-w})\downarrow0$ khi $w\to+\infty$ nhưng không có nghiệm hữu hạn.
- Kết luận cuối bài: $L$ lồi; tính lồi không tự bảo đảm tồn tại. Thêm $\mu\lVert w\rVert_2^2/2$ với $\mu>0$ tạo mục tiêu lồi mạnh, bức và có nghiệm duy nhất.

## Công cụ lý thuyết được giữ

- Tổ hợp lồi và định nghĩa tập lồi.
- Các tập trực tiếp phục vụ ba ca: $\mathbb R^d$, đoạn hoặc hộp, tập affine và nửa không gian.
- Giao của các tập lồi và ảnh ngược affine.
- Định nghĩa hàm lồi; `lồi chặt (còn gọi là lồi nghiêm ngặt)` ở lần xuất hiện đầu.
- Định lý: cực tiểu địa phương của hàm lồi trên tập lồi là cực tiểu toàn cục.
- Điều kiện bậc nhất và bậc hai trên miền mở, lồi; cách áp dụng cho hàm xác định trên $\mathbb R$ rồi hạn chế lên đoạn đóng.
- Tổng không âm và hợp với ánh xạ affine.
- Phân biệt tồn tại và duy nhất; định lý Weierstrass trên miền đóng, bị chặn; vai trò của tính bức.

Không đưa nón lồi, nón nửa xác định dương, epigraph, tập mức, Jensen, liên hợp, tựa lồi, log-lồi hoặc log-lõm vào tuyến chính vì chúng không cần để chứng nhận ba ca.

## Nguồn và thứ tự sử dụng

1. Đề cương chính thức UET.AI2012 xác định phạm vi, LLO/CLO, kiến thức tiên quyết và hình thức đánh giá.
2. MIT 6.079 lec01: mô hình tối ưu, bình phương nhỏ nhất, phân lớp bài toán, tối ưu lồi và ca chiếu sáng dùng làm bài chuyển giao.
3. MIT 6.079 lec02: định nghĩa tập lồi, nửa không gian, giao và ảnh affine.
4. MIT 6.079 lec03: định nghĩa hàm lồi, điều kiện bậc nhất/bậc hai, hàm bậc hai, tổng không âm và hợp affine.
5. Boyd và Vandenberghe (2004), Chương 1–3, dùng để kiểm tra giả thiết và phát biểu.

Thứ tự khai thác nguồn vẫn là lec01 → lec02 → lec03. Thứ tự trình bày khác mẫu vì chỉ dẫn của người dùng yêu cầu ứng dụng trước lý thuyết.

## Tài sản trực quan

- Giữ và dùng: `optimization-model-anatomy.svg`, `convex-set-and-combination.svg`, `convex-concave-strict.svg`, `local-versus-global-minimum.svg`, `first-second-order-convexity.svg`, `existence-and-uniqueness.svg`.
- Sửa: `logistic-loss-convex-case.svg` để ca chính dùng miền $\mathbb R$ và làm rõ cận dưới đúng không đạt; phần ràng buộc đóng, bị chặn được chuyển thành đối chiếu trong mạch kết luận.
- Tạo mới mười SVG: `one-step-control.svg`, `height-weight-regression.svg`, `linear-regression-fit.svg`, `d03-cost-parabola-feasible.svg`, `g00-orange-quality-pipeline.svg`, `g01-linear-boundary-2d.svg`, `lighting-distribution.svg` và ba hình khái quát ở M03 (`m03-control-target.svg`, `m03-linear-fit-sketch.svg`, `m03-logistic-classes.svg`).
- Không dùng trong tuyến chính: `basic-convex-set-library.svg`, `convex-hull-and-conic-hull.svg`, `convex-set-preservation-map.svg`, `epigraph-levelset-indicator.svg`, `convex-preservation-and-jensen.svg`, `line-restriction-convex-library.svg`, `psd-cone-and-quadratic-directions.svg`.

## Tiêu chí hoàn thành

- HTML có đúng 7 `<section>` ngoài, 52 trang lá, 52 mã `data-slide-id` duy nhất, sáu trang tiêu đề mạch `mach-2`…`mach-7` và ghi chú diễn giả có nội dung trên mọi trang nội dung.
- Mỗi ca có nhu cầu, trực quan, ví dụ tính được, mô hình, chứng nhận và bài tập kiểm tra.
- Mọi giả thiết của kết luận về lồi, tồn tại và duy nhất đều hiện diện trước khi dùng.
- Ghi chú học tập mở rộng lập luận; bài tập có mức nhận biết, tính toán hoặc chứng minh và vận dụng AI.
- Trang chỉ mục chỉ công bố các tệp đã tồn tại và đã kiểm định.
- Bộ trang chiếu, viewer và tài liệu chạy hoàn toàn bằng tài sản cục bộ; không có liên kết runtime chéo hoặc tài nguyên hỏng.

## Bổ sung định hướng học phần ngày 2026-09-07

- Thêm M01A và M01B sau tiêu đề, trước mục tiêu bài; tăng 39 lên 41 trang, giữ bảy mạch và thứ tự các trang toán học.
- M01A đối chiếu mục I và III của đề cương chính thức: tối ưu hóa; xác suất và mô hình xác suất, trọng tâm đồ thị, suy diễn và học tham số. Không biến phần giới thiệu thành bài giảng xác suất mới.
- M01B dùng mục IV.1 và chỉ dẫn cụ thể của người dùng: kiểm tra thường xuyên 20%, giữa kỳ 20%, cuối kỳ 60%; cuối kỳ có một buổi tuần 15 và một buổi theo lịch thi. Không suy diễn tỷ trọng từng buổi.
- Nguồn mới chỉ là đề cương hiện có và chỉ dẫn người dùng; không tải thêm MIT. Hai trang định hướng không kế thừa mẫu nội dung MIT; dùng thẻ và bảng sẵn có của RevealJS.
- Giữ tổng 2 tiết lý thuyết và 1 tiết bài tập. Phần mở đầu vẫn phân bổ nội bộ 0,15 tiết, trình bày ngắn và đưa chi tiết vào tài liệu học tập.

## Sửa văn phong và trang tiêu đề mạch ngày 2026-10-12

- Theo yêu cầu người dùng 2026-10-12 và các mục "Trang tiêu đề mạch", "Văn phong và mật độ mặt trang chiếu" của `AGENTS.md`: thêm sáu trang tiêu đề mạch D00, L00, GT, T00, F00, K00; thêm trang "Nội dung" M02B; tách H07B khỏi H07, K05B khỏi K05, K07 và K08 khỏi K06. Tổng 41 → 52 trang, vẫn bảy mạch.
- Đổi tên bốn mạch cho khớp trang "Nội dung" (lý do ở `storyboard.md`). Đổi tiêu đề D01, D02, D03, L03, L04, G03, G04, T01, T02, T03, T04, F05, K05 theo mẫu trang ví dụ, bài tập và quy tắc tiêu đề.
- Mỗi cụm khái niệm lớn có một bài tập có "Lời giải:" trên mặt trang: D04, L04, G04, F05, H07B, K05B. Lời giải K05B trùng Bài 9 (phần 1–4) của `materials/lec-01/exercises.md`.
- Mạch kết luận có bảng tổng kết theo kết quả K07 và trang tài liệu đọc K08. Thời lượng theo đề cương không đổi.
