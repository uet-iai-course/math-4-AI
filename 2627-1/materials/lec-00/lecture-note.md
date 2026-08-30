# Bài 00 — Ôn tập nền tảng toán học cho AI

Tài liệu này bổ sung cho bộ trang chiếu **Bài 00 — Ôn tập nền tảng toán học cho AI**. Nội dung được phát triển dần từ các yêu cầu về khái niệm, ví dụ, định lý, chứng minh và bài tập.

## Mục tiêu và kiến thức tiên quyết

Ghi chú bám theo mục tiêu của buổi ôn tập: dùng đại số tuyến tính, giải tích nhiều biến và xác suất để biểu diễn dữ liệu, học tham số và diễn giải bất định trong một mô hình AI đơn giản.

Kiến thức tiên quyết gồm đại số phổ thông, hàm một biến, đạo hàm cơ bản và các phép tính xác suất sơ cấp.

## Quy ước ký hiệu

- Vô hướng dùng chữ thường, chẳng hạn $x$ hoặc $y$.
- Véc-tơ dùng chữ thường in đậm, chẳng hạn $\mathbf x$ hoặc $\mathbf w$.
- Ma trận dùng chữ hoa in đậm, chẳng hạn $\mathbf X$.
- Dự đoán của mẫu thứ $i$ là $\hat y_i$.
- Phần dư dùng quy ước $r_i=\hat y_i-y_i$.

## Ví dụ xuyên suốt: mô hình giá nhà

Phần này sẽ mở rộng ví dụ giá nhà dùng xuyên suốt bộ trang chiếu, gồm cách biểu diễn một mẫu, ghép nhiều mẫu thành ma trận thiết kế, tính dự đoán và phân tích phần dư.

## Đại số tuyến tính

Phần này dành cho các khái niệm, ví dụ và chứng minh về vô hướng, véc-tơ, ma trận, kích thước, hạng, dạng toàn phương, ma trận thiết kế, phép chiếu và phương trình chuẩn.

### Số vô hướng

**Định nghĩa.** Số vô hướng là một giá trị đơn; trong học phần này, số vô hướng thường thuộc tập số thực, chẳng hạn $\alpha\in\mathbb R$.

**Ví dụ.** Trong dữ liệu giá nhà, $y_1=11$ là giá quan sát của căn nhà thứ nhất, với một đơn vị bằng 100 triệu đồng. Vì $y_1$ chỉ nhận một giá trị nên đây là một số vô hướng.

**Điểm dễ nhầm.** “Vô hướng” mô tả kiểu của đại lượng, không có nghĩa đại lượng không có đơn vị. Trong ví dụ trên, $y_1$ là số vô hướng nhưng vẫn mang đơn vị giá.

### Véc-tơ

**Định nghĩa.** Véc-tơ là một danh sách có thứ tự gồm $n$ số vô hướng. Trong học phần này, véc-tơ thường được viết dạng cột, chẳng hạn $\mathbf x=[x_1,\ldots,x_n]^T\in\mathbb R^n$.

**Ví dụ.** Căn nhà thứ nhất được biểu diễn bởi véc-tơ đặc trưng $\boldsymbol\phi_1=[1,-1{,}5,-1]^T$: thành phần đầu dành cho hệ số chặn, hai thành phần sau lần lượt là diện tích và số phòng ngủ đã biến đổi.

**Điểm dễ nhầm.** Véc-tơ không phải là một tập hợp không có thứ tự. Nếu đổi vị trí hai thành phần của $\boldsymbol\phi_1$, ý nghĩa của các đặc trưng thay đổi và phép tính với trọng số tương ứng không còn biểu diễn cùng một mô hình.

**Ý nghĩa và vai trò trong AI.** Một véc-tơ có thể biểu diễn đặc trưng của một mẫu hoặc các tham số của mô hình. Với véc-tơ trọng số $\mathbf w=[w_0,w_1,w_2]^T$, dự đoán tuyến tính là số vô hướng $\hat y_1=\boldsymbol\phi_1^T\mathbf w$.

## Giải tích nhiều biến

Phần này dành cho các suy diễn về gradient, đạo hàm theo hướng, vi phân, ma trận Jacobian, ma trận Hessian, khai triển Taylor và đạo hàm của hàm mất mát bình phương tối thiểu.

## Xác suất một biến

Phần này dành cho biến ngẫu nhiên, hàm khối xác suất, hàm mật độ xác suất, hàm phân phối tích lũy, kỳ vọng, phương sai và mô hình nhiễu Gauss.

## Xác suất nhiều biến

Phần này dành cho phân phối đồng thời, phân phối biên, xác suất có điều kiện, công thức Bayes, độc lập, hiệp phương sai, tương quan, Gauss nhiều biến và bình phương tối thiểu tổng quát.

## Ghép các công cụ vào mô hình giá nhà

Phần này sẽ nối các kết quả đại số, giải tích và xác suất để giải thích nghiệm bình phương tối thiểu, phần dư sau khi khớp, dự đoán kèm bất định và nguy cơ quá khớp.

## Bài tập tổng hợp

Các bài tập sẽ được bổ sung cùng với từng cụm nội dung. Gợi ý và lời giải được đặt trong khối gập để người học có thể thử giải trước.

## Tài liệu tham khảo

Danh mục nguồn sẽ được cập nhật đồng thời với từng phần nội dung mới.
