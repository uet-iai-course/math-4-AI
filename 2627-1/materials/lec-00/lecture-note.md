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

**Định nghĩa.** Véc-tơ là một danh sách có thứ tự gồm $n$ số vô hướng. Trong học phần này, $\mathbf x\in\mathbb R^n$ thường được viết theo chiều dọc dưới dạng véc-tơ cột, có kích thước $n\times1$:

$$
\mathbf x=
\begin{bmatrix}
x_1\\
x_2\\
\vdots\\
x_n
\end{bmatrix}.
$$

Chuyển vị của nó được viết theo chiều ngang dưới dạng véc-tơ hàng, có kích thước $1\times n$:

$$
\mathbf x^T=[x_1,x_2,\ldots,x_n].
$$

**Ví dụ.** Căn nhà thứ nhất được biểu diễn bởi véc-tơ đặc trưng $\boldsymbol\phi_1=[1,-1{,}5,-1]^T$: thành phần đầu dành cho hệ số chặn, hai thành phần sau lần lượt là diện tích và số phòng ngủ đã biến đổi.

**Điểm dễ nhầm.** Véc-tơ không phải là một tập hợp không có thứ tự. Nếu đổi vị trí hai thành phần của $\boldsymbol\phi_1$, ý nghĩa của các đặc trưng thay đổi và phép tính với trọng số tương ứng không còn biểu diễn cùng một mô hình.

**Ý nghĩa và vai trò trong AI.** Một véc-tơ có thể biểu diễn đặc trưng của một mẫu hoặc các tham số của mô hình. Với véc-tơ trọng số $\mathbf w=[w_0,w_1,w_2]^T$, dự đoán tuyến tính là số vô hướng $\hat y_1=\boldsymbol\phi_1^T\mathbf w$.

### Ma trận

**Định nghĩa.** Ma trận là một bảng chữ nhật gồm các số vô hướng. Ký hiệu $\mathbf A=[a_{ij}]\in\mathbb R^{m\times n}$ cho biết $\mathbf A$ có $m$ hàng, $n$ cột và $a_{ij}$ là phần tử ở hàng $i$, cột $j$.

**Ví dụ.** Bốn căn nhà được ghép thành ma trận thiết kế

$$
\mathbf X=
\begin{bmatrix}
1&-1{,}5&-1\\
1&-0{,}5&0\\
1&0{,}5&0\\
1&1{,}5&1
\end{bmatrix}
\in\mathbb R^{4\times3}.
$$

Mỗi hàng biểu diễn một căn nhà; ba cột lần lượt chứa hệ số chặn, diện tích biến đổi và số phòng ngủ biến đổi.

**Điểm dễ nhầm.** Trong kích thước $m\times n$, số hàng được viết trước số cột. Vì vậy, $\mathbf X\in\mathbb R^{4\times3}$ có bốn hàng và ba cột, không phải ngược lại.

**Ý nghĩa và vai trò trong AI.** Ma trận thường biểu diễn một tập dữ liệu hoặc một phép biến đổi tuyến tính. Với $\mathbf w\in\mathbb R^3$, phép nhân $\hat{\mathbf y}=\mathbf X\mathbf w\in\mathbb R^4$ tính đồng thời dự đoán cho bốn căn nhà.

### Chuyển vị

**Định nghĩa.** Chuyển vị của $\mathbf A=[a_{ij}]\in\mathbb R^{m\times n}$ là ma trận $\mathbf A^T\in\mathbb R^{n\times m}$ thỏa $(\mathbf A^T)_{ij}=a_{ji}$; các hàng của $\mathbf A$ trở thành các cột của $\mathbf A^T$. Với véc-tơ cột $\mathbf x$, $\mathbf x^T$ là véc-tơ hàng.

**Ví dụ.** Với

$$
\mathbf A=\begin{bmatrix}1&-1&0\\0&-1&1\end{bmatrix},
\qquad
\mathbf A^T=\begin{bmatrix}1&0\\-1&-1\\0&1\end{bmatrix}.
$$

Ma trận $\mathbf A$ có kích thước $2\times3$, còn $\mathbf A^T$ có kích thước $3\times2$.

**Điểm dễ nhầm.** Chuyển vị không phải là nghịch đảo. Nói chung, $\mathbf A^T\mathbf A$ không bằng ma trận đơn vị.

**Ý nghĩa và vai trò trong AI.** Chuyển vị giúp đổi hướng biểu diễn để các kích thước khớp nhau; nó xuất hiện trong tích vô hướng, ma trận Gram $\mathbf X^T\mathbf X$ và công thức gradient của mô hình tuyến tính.

### Phép toán cơ bản

#### Cộng véc-tơ

**Định nghĩa.** Với $\mathbf u,\mathbf v\in\mathbb R^n$, tổng $\mathbf u+\mathbf v$ được tính theo từng thành phần: $(\mathbf u+\mathbf v)_i=u_i+v_i$.

**Ví dụ.** Với $\mathbf u=[1,2]^T$ và $\mathbf v=[-1,3]^T$, ta có $\mathbf u+\mathbf v=[0,5]^T$.

**Điểm dễ nhầm.** Hai véc-tơ phải có cùng số thành phần và các vị trí tương ứng phải mang cùng ý nghĩa; không thể cộng trực tiếp hai véc-tơ chỉ vì chúng có cùng kích thước.

**Ý nghĩa và vai trò trong AI.** Phép cộng véc-tơ dùng để cộng phần cập nhật vào tham số, cộng nhiễu vào dữ liệu hoặc kết hợp các biểu diễn có cùng hệ tọa độ.

#### Cộng ma trận

**Định nghĩa.** Với $\mathbf A,\mathbf B\in\mathbb R^{m\times n}$, tổng $\mathbf A+\mathbf B$ được tính theo từng phần tử: $(\mathbf A+\mathbf B)_{ij}=a_{ij}+b_{ij}$.

**Ví dụ.** Ta có

$$
\begin{bmatrix}1&0\\2&1\end{bmatrix}
+
\begin{bmatrix}2&1\\0&-1\end{bmatrix}
=
\begin{bmatrix}3&1\\2&0\end{bmatrix}.
$$

**Điểm dễ nhầm.** Hai ma trận phải có cùng kích thước; phép cộng ma trận không phải là ghép thêm hàng hoặc cột.

**Ý nghĩa và vai trò trong AI.** Phép cộng ma trận xuất hiện khi cập nhật một ma trận trọng số, chẳng hạn $\mathbf W^+=\mathbf W+\Delta\mathbf W$, hoặc cộng các ma trận gradient có cùng kích thước.

#### Chuẩn véc-tơ

**Định nghĩa.** Hai chuẩn véc-tơ thường dùng là chuẩn $\ell_1$ và chuẩn Euclid $\ell_2$:

$$
\|\mathbf x\|_1=\sum_{i=1}^{n}|x_i|,
\qquad
\|\mathbf x\|_2=\sqrt{\sum_{i=1}^{n}x_i^2}.
$$

**Ví dụ.** Với $\boldsymbol\phi_1=[1,-1{,}5,-1]^T$, ta có $\|\boldsymbol\phi_1\|_1=1+1{,}5+1=3{,}5$ và $\|\boldsymbol\phi_1\|_2=\sqrt{1+2{,}25+1}=\sqrt{4{,}25}$.

**Điểm dễ nhầm.** $\|\mathbf x\|_1$ và $\|\mathbf x\|_2$ đều là số vô hướng không âm, không phải véc-tơ thu được bằng cách lấy trị tuyệt đối hoặc bình phương từng thành phần.

**Ý nghĩa và vai trò trong AI.** Chuẩn $\ell_1$ thường dùng để khuyến khích tham số thưa; chuẩn $\ell_2$ dùng để đo độ dài Euclid, chuẩn hóa biểu diễn và kiểm soát độ lớn của bước cập nhật.

#### Chuẩn ma trận

**Định nghĩa.** Chuẩn Frobenius của $\mathbf A=[a_{ij}]\in\mathbb R^{m\times n}$ là

$$
\|\mathbf A\|_F=\sqrt{\sum_{i=1}^{m}\sum_{j=1}^{n}a_{ij}^2}.
$$

**Ví dụ.** Với $\mathbf A=\begin{bmatrix}1&0\\2&1\end{bmatrix}$, ta có $\|\mathbf A\|_F=\sqrt{1+0+4+1}=\sqrt6$.

**Điểm dễ nhầm.** Chuẩn Frobenius không phải là chuẩn toán tử; hai chuẩn đo những đặc tính khác nhau dù cùng nhận đầu vào là ma trận.

**Ý nghĩa và vai trò trong AI.** Chuẩn Frobenius dùng để đo độ lớn của ma trận trọng số, đo khoảng cách $\|\mathbf A-\mathbf B\|_F$ giữa hai ma trận tham số và xây dựng thành phần điều chuẩn.

#### Tích vô hướng của hai véc-tơ

**Định nghĩa.** Với $\mathbf u,\mathbf v\in\mathbb R^n$, tích vô hướng là số

$$
\mathbf u^T\mathbf v=\sum_{i=1}^{n}u_iv_i.
$$

**Ví dụ.** Với $\boldsymbol\phi_1=[1,-1{,}5,-1]^T$ và $\mathbf w^{(0)}=[14,1,1]^T$, ta có $\boldsymbol\phi_1^T\mathbf w^{(0)}=14-1{,}5-1=11{,}5$.

**Điểm dễ nhầm.** Tích vô hướng trả về một số vô hướng; nó không phải phép nhân theo từng thành phần, vốn trả về một véc-tơ.

**Ý nghĩa và vai trò trong AI.** Tích vô hướng tạo điểm số, dự đoán tuyến tính hoặc độ tương đồng giữa hai biểu diễn có cùng kích thước.

#### Tích trong Frobenius của hai ma trận

**Định nghĩa.** Với $\mathbf A,\mathbf B\in\mathbb R^{m\times n}$, tích trong Frobenius là số

$$
\langle\mathbf A,\mathbf B\rangle_F
=\operatorname{tr}(\mathbf A^T\mathbf B)
=\sum_{i=1}^{m}\sum_{j=1}^{n}a_{ij}b_{ij}.
$$

**Ví dụ.** Với $\mathbf A=\begin{bmatrix}1&0\\2&1\end{bmatrix}$ và $\mathbf B=\begin{bmatrix}2&1\\0&-1\end{bmatrix}$, ta có $\langle\mathbf A,\mathbf B\rangle_F=1$.

**Điểm dễ nhầm.** Tích trong Frobenius trả về một số vô hướng và khác với tích ma trận $\mathbf A\mathbf B$.

**Ý nghĩa và vai trò trong AI.** Tích trong Frobenius dùng để đo độ tương đồng giữa hai ma trận, viết gọn đạo hàm theo ma trận và phân tích cập nhật của các lớp có trọng số dạng ma trận.

#### Tích ma trận–véc-tơ

**Định nghĩa.** Với $\mathbf A\in\mathbb R^{m\times n}$ và $\mathbf x\in\mathbb R^n$, tích $\mathbf A\mathbf x\in\mathbb R^m$ có thành phần thứ $i$ là tích vô hướng giữa hàng thứ $i$ của $\mathbf A$ và $\mathbf x$.

**Ví dụ.** Với

$$
\mathbf A=\begin{bmatrix}1&-1&0\\0&-1&1\end{bmatrix},
\qquad
\mathbf x=\begin{bmatrix}1\\2\\-1\end{bmatrix},
$$

ta có $\mathbf A\mathbf x=[-1,-3]^T$.

**Điểm dễ nhầm.** Phép nhân chỉ hợp lệ khi số cột của $\mathbf A$ bằng số thành phần của $\mathbf x$; kết quả có số thành phần bằng số hàng của $\mathbf A$.

**Ý nghĩa và vai trò trong AI.** Tích ma trận–véc-tơ mô tả một lớp tuyến tính, biến đổi một biểu diễn đầu vào hoặc tính đồng thời nhiều tổ hợp tuyến tính của cùng một véc-tơ.

#### Tích ma trận–ma trận

**Định nghĩa.** Với $\mathbf A\in\mathbb R^{m\times n}$ và $\mathbf B\in\mathbb R^{n\times p}$, tích $\mathbf C=\mathbf A\mathbf B\in\mathbb R^{m\times p}$ có phần tử

$$
c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}.
$$

Mỗi $c_{ij}$ là tích vô hướng giữa hàng thứ $i$ của $\mathbf A$ và cột thứ $j$ của $\mathbf B$.

**Ví dụ.** Ta có

$$
\begin{bmatrix}1&-1&0\\0&-1&1\end{bmatrix}
\begin{bmatrix}1&2\\0&1\\2&-1\end{bmatrix}
=
\begin{bmatrix}1&1\\2&-2\end{bmatrix}.
$$

**Điểm dễ nhầm.** Thứ tự nhân có ý nghĩa: nói chung $\mathbf A\mathbf B\ne\mathbf B\mathbf A$, ngay cả khi cả hai tích đều tồn tại.

**Ý nghĩa và vai trò trong AI.** Tích ma trận–ma trận dùng để ghép các phép biến đổi tuyến tính, xử lý đồng thời một lô véc-tơ và tạo các ma trận như $\mathbf X^T\mathbf X$ trong bài toán bình phương tối thiểu.

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

- Goodfellow, Ian; Bengio, Yoshua; Courville, Aaron (2016), *Deep Learning*, Chương 2, Mục 2.1–2.2 và 2.5.
