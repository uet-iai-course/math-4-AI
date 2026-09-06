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

1. Tách dữ kiện, biến quyết định, hàm mục tiêu và miền khả thi trong một tình huống đơn giản.
2. Viết mô hình cho điều khiển một bước, hồi quy tuyến tính và hồi quy logistic.
3. Kiểm tra tính lồi của miền và mục tiêu bằng định nghĩa hoặc điều kiện vi phân phù hợp.
4. Phân biệt ba kết luận: cực tiểu địa phương là toàn cục, nghiệm tồn tại, nghiệm duy nhất.

## Bảy mạch và 39 trang lá

1. **Mở đầu và một số bài toán tối ưu — M01–M03:** mục tiêu, vấn đề trung tâm và ba quyết định cần tối ưu.
2. **Điều khiển một bước — D01–D04:** mô hình động lực, đánh đổi bám đích–năng lượng, nghiệm bị chặn và câu hỏi về nghiệm biên.
3. **Hồi quy tuyến tính — L01, L01B–L04:** dự đoán chiều cao từ cân nặng, khái quát sang nhiều đặc trưng, bình phương nhỏ nhất, ví dụ số và câu hỏi về hạng của ma trận thiết kế.
4. **Hồi quy logistic — G00–G04:** phân loại chất lượng cam bằng hai đặc trưng đo từ ảnh, khái quát thành bài toán biên tuyến tính, mất mát logistic, dữ liệu tách tuyến tính và câu hỏi về sự tồn tại nghiệm.
5. **Khuôn chung của bài toán tối ưu — T01–T04:** giải phẫu mô hình, ánh xạ ba ca, các loại kết luận và danh sách điều cần chứng nhận.
6. **Công cụ lồi vừa đủ — F01–F05 và H01–H07:** tập lồi, hàm lồi, điều kiện vi phân, phép bảo toàn, định lý địa phương–toàn cục, tồn tại và duy nhất.
7. **Trở lại ba ca — K01–K06:** chứng nhận riêng từng ca, so sánh kết luận, bài tập chuyển giao và tài liệu.

## Phân bổ nội bộ theo tiết

| Mạch | Phân bổ dự kiến | Vai trò |
|---|---:|---|
| 1. Mở đầu và một số bài toán tối ưu | 0,15 tiết lý thuyết | Đặt vấn đề và chuẩn đầu ra |
| 2. Điều khiển một bước | 0,30 tiết lý thuyết | Ca có ràng buộc và nghiệm biên |
| 3. Hồi quy tuyến tính | 0,30 tiết lý thuyết | Ca bậc hai trong học máy |
| 4. Hồi quy logistic | 0,30 tiết lý thuyết | Ca lồi có thể không đạt nghiệm |
| 5. Khuôn chung | 0,20 tiết lý thuyết | Trừu tượng hóa ba ca |
| 6. Công cụ lồi vừa đủ | 0,75 tiết lý thuyết | Xây công cụ chứng nhận |
| 7. Trở lại ba ca | 1,00 tiết bài tập | Chứng nhận, diễn giải và chuyển giao |

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

- HTML có đúng 7 `<section>` ngoài, 39 trang lá, 39 mã `data-slide-id` duy nhất và ghi chú diễn giả có nội dung trên mọi trang nội dung.
- Mỗi ca có nhu cầu, trực quan, ví dụ tính được, mô hình, chứng nhận và bài tập kiểm tra.
- Mọi giả thiết của kết luận về lồi, tồn tại và duy nhất đều hiện diện trước khi dùng.
- Ghi chú học tập mở rộng lập luận; bài tập có mức nhận biết, tính toán hoặc chứng minh và vận dụng AI.
- Trang chỉ mục chỉ công bố các tệp đã tồn tại và đã kiểm định.
- Bộ trang chiếu, viewer và tài liệu chạy hoàn toàn bằng tài sản cục bộ; không có liên kết runtime chéo hoặc tài nguyên hỏng.
