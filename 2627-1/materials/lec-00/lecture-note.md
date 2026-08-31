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

### Không gian cột và hạt nhân

**Định nghĩa.** Với $\mathbf A\in\mathbb R^{m\times n}$, không gian cột và hạt nhân của $\mathbf A$ là

$$
\operatorname{Col}(\mathbf A)
=\{\mathbf A\mathbf x:\mathbf x\in\mathbb R^n\}
\subseteq\mathbb R^m,
\qquad
\operatorname{Ker}(\mathbf A)
=\{\mathbf x\in\mathbb R^n:\mathbf A\mathbf x=\mathbf0\}
\subseteq\mathbb R^n.
$$

Không gian cột gồm mọi đầu ra mà phép biến đổi $\mathbf A$ có thể tạo ra; hạt nhân gồm mọi đầu vào bị $\mathbf A$ ánh xạ về véc-tơ không.

**Ví dụ.** Với

$$
\mathbf A=
\begin{bmatrix}
1&2\\
2&4
\end{bmatrix},
$$

ta có

$$
\operatorname{Col}(\mathbf A)
=\operatorname{span}\!\left\{\begin{bmatrix}1\\2\end{bmatrix}\right\},
\qquad
\operatorname{Ker}(\mathbf A)
=\operatorname{span}\!\left\{\begin{bmatrix}-2\\1\end{bmatrix}\right\}.
$$

Với một véc-tơ $\mathbf v$, $\operatorname{span}\{\mathbf v\}=\{t\mathbf v:t\in\mathbb R\}$ là không gian gồm mọi bội vô hướng của $\mathbf v$.

**Điểm dễ nhầm.** $\operatorname{Col}(\mathbf A)$ là không gian của các đầu ra trong $\mathbb R^m$, còn $\operatorname{Ker}(\mathbf A)$ là không gian của các đầu vào trong $\mathbb R^n$; hai không gian không nhất thiết nằm trong cùng một không gian nền.

**Ý nghĩa và vai trò trong AI.** Với ma trận thiết kế $\mathbf X$, $\operatorname{Col}(\mathbf X)$ chứa các véc-tơ dự đoán tuyến tính có thể tạo ra, còn một hướng khác không trong $\operatorname{Ker}(\mathbf X)$ thay đổi trọng số nhưng không thay đổi dự đoán.

### Hạng của ma trận

**Định nghĩa.** Hạng của $\mathbf A\in\mathbb R^{m\times n}$, ký hiệu $\operatorname{rank}(\mathbf A)$, là số cột độc lập tuyến tính lớn nhất của $\mathbf A$, hay tương đương $\dim\operatorname{Col}(\mathbf A)$. Giá trị này cũng bằng số hàng độc lập tuyến tính lớn nhất và không vượt quá $\min(m,n)$.

**Ví dụ.** Với

$$
\mathbf A=
\begin{bmatrix}
1&2\\
2&4
\end{bmatrix},
$$

cột thứ hai bằng hai lần cột thứ nhất nên $\operatorname{rank}(\mathbf A)=1$.

**Điểm dễ nhầm.** Hạng không phải là số phần tử khác không. Ma trận trên có bốn phần tử khác không nhưng chỉ có hạng bằng $1$.

### Hệ phương trình tuyến tính

**Định nghĩa.** Hệ $m$ phương trình tuyến tính theo $n$ ẩn được viết dưới dạng

$$
\mathbf A\mathbf x=\mathbf b,
\qquad
\mathbf A\in\mathbb R^{m\times n},\quad
\mathbf x\in\mathbb R^n,\quad
\mathbf b\in\mathbb R^m.
$$

Ma trận mở rộng $[\mathbf A\mid\mathbf b]\in\mathbb R^{m\times(n+1)}$ được tạo bằng cách ghép $\mathbf b$ làm cột cuối của $\mathbf A$. Đặt $r=\operatorname{rank}(\mathbf A)$ và $r_b=\operatorname{rank}([\mathbf A\mid\mathbf b])$. Hệ vô nghiệm khi $r<r_b$, có nghiệm duy nhất khi $r=r_b=n$, và có vô số nghiệm khi $r=r_b<n$.

**Ví dụ về các trường hợp nghiệm.**

1. **Ma trận vuông, hạng đầy đủ — nghiệm duy nhất.** Với $\mathbf A=\begin{bmatrix}1&1\\1&-1\end{bmatrix}$ và $\mathbf b=[3,1]^T$, ta có $m=n=r=2$ và nghiệm duy nhất $\mathbf x=[2,1]^T$.
2. **Ma trận cao, hạng cột đầy đủ và hệ tương thích — nghiệm duy nhất.** Với $\mathbf A=\begin{bmatrix}1&0\\0&1\\1&1\end{bmatrix}$ và $\mathbf b=[1,2,3]^T$, ta có $m=3>n=2$, $r=r_b=2$ và $\mathbf x=[1,2]^T$.
3. **Ma trận cao, hạng cột đầy đủ nhưng hệ không tương thích — vô nghiệm.** Giữ $\mathbf A$ ở trường hợp 2 nhưng lấy $\mathbf b=[1,2,4]^T$, ta có $r=2<r_b=3$.
4. **Ma trận rộng, hạng hàng đầy đủ — vô số nghiệm.** Với $\mathbf A=\begin{bmatrix}1&0&1\\0&1&1\end{bmatrix}$ và $\mathbf b=[1,2]^T$, ta có $m=r=r_b=2<n=3$ và $\mathbf x=[1-t,2-t,t]^T$ với mọi $t\in\mathbb R$.
5. **Ma trận thiếu hạng nhưng hệ tương thích — vô số nghiệm.** Với $\mathbf A=\begin{bmatrix}1&2\\2&4\end{bmatrix}$ và $\mathbf b=[3,6]^T$, ta có $r=r_b=1<n=2$ và $\mathbf x=[3-2t,t]^T$ với mọi $t\in\mathbb R$.

**Điểm dễ nhầm.** Chỉ so sánh số phương trình $m$ với số ẩn $n$ chưa đủ để kết luận số nghiệm; còn phải kiểm tra hạng của $\mathbf A$ và tính tương thích thông qua hạng của $[\mathbf A\mid\mathbf b]$.

### Định thức

**Định nghĩa.** Cho $\mathbf A=[a_{ij}]\in\mathbb R^{n\times n}$. Định thức $\det(\mathbf A)$ được định nghĩa đệ quy theo kích thước. Với $n=1$, $\det([a_{11}])=a_{11}$. Với $n\ge2$, gọi $\mathbf A_{1j}$ là ma trận $(n-1)\times(n-1)$ thu được bằng cách bỏ hàng thứ nhất và cột thứ $j$ của $\mathbf A$; khi đó

$$
\det(\mathbf A)
=\sum_{j=1}^{n}(-1)^{1+j}a_{1j}\det(\mathbf A_{1j}).
$$

Đây là khai triển Laplace theo hàng thứ nhất. Có thể khai triển theo bất kỳ hàng hoặc cột nào và nhận cùng một giá trị.

Với ma trận vuông $\mathbf A\in\mathbb R^{n\times n}$,

$$
\det(\mathbf A)=0
\iff \operatorname{rank}(\mathbf A)<n
\iff \operatorname{Ker}(\mathbf A)\ne\{\mathbf0\}.
$$

Khi đó $\mathbf A$ được gọi là **suy biến** hoặc **không đủ hạng**, và $\mathbf A^{-1}$ không tồn tại.

**Ví dụ.** Với $\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix}$, định nghĩa trên cho $\det(\mathbf A)=a\det([d])-b\det([c])=ad-bc$. Đặc biệt, nếu $\mathbf A=\begin{bmatrix}1&1\\1&-1\end{bmatrix}$ thì $\det(\mathbf A)=-2$.

**Điểm dễ nhầm.** Định thức không phải là tích các phần tử trên đường chéo chính đối với ma trận bất kỳ; quy tắc đó chỉ đúng cho ma trận tam giác.

**Ý nghĩa hình học và vai trò trong AI.** Phép biến đổi $\mathbf x\mapsto\mathbf A\mathbf x$ nhân thể tích $n$ chiều với hệ số $|\det(\mathbf A)|$. Định thức dương bảo toàn hướng, định thức âm đảo hướng, còn $\det(\mathbf A)=0$ làm không gian sụp xuống một tập có thể tích $n$ chiều bằng không. Trong AI, định thức của ma trận hiệp phương sai và logarit định thức xuất hiện trong mật độ Gauss nhiều biến và các phép đổi biến xác suất.

### Ma trận nghịch đảo

**Định nghĩa.** Với ma trận vuông $\mathbf A\in\mathbb R^{n\times n}$, ma trận nghịch đảo $\mathbf A^{-1}$ thỏa

$$
\mathbf A^{-1}\mathbf A=\mathbf A\mathbf A^{-1}=\mathbf I_n.
$$

Nghịch đảo tồn tại khi và chỉ khi $\operatorname{rank}(\mathbf A)=n$, hay tương đương $\det(\mathbf A)\ne0$.

**Ví dụ.** Với $\mathbf A=\begin{bmatrix}1&1\\1&-1\end{bmatrix}$,

$$
\mathbf A^{-1}
=\frac12
\begin{bmatrix}
1&1\\
1&-1
\end{bmatrix}.
$$

Do đó, với $\mathbf b=[3,1]^T$, nghiệm của $\mathbf A\mathbf x=\mathbf b$ là $\mathbf x=\mathbf A^{-1}\mathbf b=[2,1]^T$.

**Điểm dễ nhầm.** $\mathbf A^{-1}$ không được tạo bằng cách lấy nghịch đảo từng phần tử của $\mathbf A$.

**Ý nghĩa và vai trò trong AI.** Ma trận nghịch đảo giúp biểu diễn nghiệm của hệ tuyến tính và ma trận độ chính xác $\boldsymbol\Sigma^{-1}$ trong mô hình Gauss. Khi tính toán thực tế, thường nên giải hệ tuyến tính thay vì tạo nghịch đảo tường minh.

### Hệ cơ sở, hệ trực giao và hệ trực chuẩn

**Định nghĩa.** Một hệ có thứ tự $\mathcal B=(\mathbf b_1,\ldots,\mathbf b_n)$ trong $\mathbb R^n$ là một **cơ sở** nếu các véc-tơ vừa độc lập tuyến tính, vừa sinh ra $\mathbb R^n$. Tương đương, mỗi $\mathbf x\in\mathbb R^n$ có duy nhất một biểu diễn

$$
\mathbf x=\sum_{i=1}^n\alpha_i\mathbf b_i.
$$

Một hệ $(\mathbf b_1,\ldots,\mathbf b_k)$ là **trực giao** nếu $\mathbf b_i^T\mathbf b_j=0$ với mọi $i\ne j$. Hệ đó là **trực chuẩn** nếu còn thỏa $\lVert\mathbf b_i\rVert_2=1$ với mọi $i$.

**Quan hệ giữa ba khái niệm.** Hệ trực chuẩn luôn trực giao. Một hệ trực giao không chứa véc-tơ không luôn độc lập tuyến tính; nếu có đúng $n$ véc-tơ trong $\mathbb R^n$ thì hệ đó là một cơ sở.

**Ví dụ.** Trong $\mathbb R^2$, đặt $\mathbf b_1=[1,1]^T$ và $\mathbf b_2=[1,-1]^T$. Ta có $\mathbf b_1^T\mathbf b_2=0$ và $\lVert\mathbf b_1\rVert_2=\lVert\mathbf b_2\rVert_2=\sqrt2$, nên $(\mathbf b_1,\mathbf b_2)$ là một cơ sở trực giao nhưng chưa trực chuẩn. Hai véc-tơ $\mathbf q_i=\mathbf b_i/\sqrt2$ tạo thành một cơ sở trực chuẩn. Chẳng hạn,

$$
\begin{bmatrix}3\\1\end{bmatrix}
=2\mathbf b_1+\mathbf b_2.
$$

**Ý nghĩa hình học.** Cơ sở chọn các trục tọa độ; cơ sở trực giao làm các trục vuông góc; cơ sở trực chuẩn còn chuẩn hóa độ dài trục. Với cơ sở trực chuẩn $(\mathbf q_1,\ldots,\mathbf q_n)$, tọa độ được lấy trực tiếp bằng $\alpha_i=\mathbf q_i^T\mathbf x$, nên độ dài và góc được bảo toàn khi đổi giữa véc-tơ và tọa độ.

**Điểm dễ nhầm.** Độc lập tuyến tính không kéo theo trực giao, và trực giao không kéo theo trực chuẩn. Một hệ trực giao không chứa véc-tơ không và có ít hơn $n$ véc-tơ là một cơ sở trực giao của không gian con mà nó sinh ra. Véc-tơ không trực giao với mọi véc-tơ nhưng không thể thuộc một hệ trực giao dùng để suy ra độc lập tuyến tính.

**Ý nghĩa và vai trò trong AI.** Thuật toán Gram–Schmidt biến một hệ độc lập thành hệ trực chuẩn sinh cùng không gian. Các cột của $\mathbf Q$ trong phân rã QR là trực chuẩn; các hướng của phân tích thành phần chính có thể được chọn thành một cơ sở trực chuẩn. Cơ sở trực chuẩn giúp tính phép chiếu, biểu diễn đặc trưng và các thuật toán số ổn định hơn.

### Véc-tơ riêng và giá trị riêng

**Định nghĩa.** Cho $\mathbf A\in\mathbb R^{n\times n}$. Nếu tồn tại $\lambda\in\mathbb R$ và $\mathbf v\in\mathbb R^n\setminus\{\mathbf0\}$ sao cho

$$
\mathbf A\mathbf v=\lambda\mathbf v,
$$

thì $\mathbf v$ là một véc-tơ riêng của $\mathbf A$ ứng với giá trị riêng $\lambda$. Với ma trận thực tổng quát, giá trị riêng không nhất thiết đều là số thực; ma trận đối xứng thực có các giá trị riêng thực và có thể chọn một cơ sở véc-tơ riêng trực chuẩn.

**Cách tìm.** Từ phương trình riêng,

$$
(\mathbf A-\lambda\mathbf I_n)\mathbf v=\mathbf0.
$$

Vì $\mathbf v\ne\mathbf0$, ma trận $\mathbf A-\lambda\mathbf I_n$ phải suy biến, nên

$$
\det(\mathbf A-\lambda\mathbf I_n)=0.
$$

Giải phương trình đặc trưng này để tìm $\lambda$, rồi tìm một véc-tơ khác không trong $\operatorname{Ker}(\mathbf A-\lambda\mathbf I_n)$ để thu được $\mathbf v$.

**Ý nghĩa hình học.** Đường thẳng sinh bởi $\mathbf v$ là một hướng bất biến dưới phép biến đổi $\mathbf x\mapsto\mathbf A\mathbf x$: trên hướng đó, phép biến đổi chỉ nhân với $\lambda$. Nếu $|\lambda|>1$, độ dài bị kéo giãn; nếu $0<|\lambda|<1$, độ dài bị co lại; nếu $\lambda<0$, hướng đồng thời bị đảo; nếu $\lambda=0$, hướng đó sụp về véc-tơ không.

**Ví dụ.** Cho

$$
\mathbf A=
\begin{bmatrix}
2&1\\
1&2
\end{bmatrix}.
$$

Ta có


$$
\det(\mathbf A-\lambda\mathbf I_2)
=(2-\lambda)^2-1
=(\lambda-1)(\lambda-3),
$$

nên các giá trị riêng là $\lambda_1=3$ và $\lambda_2=1$. Chọn $\mathbf v_1=[1,1]^T$ và $\mathbf v_2=[1,-1]^T$; kiểm tra trực tiếp cho

$$
\mathbf A\mathbf v_1=3\mathbf v_1,
\qquad
\mathbf A\mathbf v_2=\mathbf v_2.
$$

**Điểm dễ nhầm.** Véc-tơ riêng không bao giờ là $\mathbf0$, nhưng giá trị riêng có thể bằng $0$. Nếu $\lambda=0$ thì tồn tại $\mathbf v\ne\mathbf0$ thuộc $\operatorname{Ker}(\mathbf A)$, nên $\mathbf A$ suy biến. Ngoài ra, mọi bội khác không của một véc-tơ riêng vẫn là véc-tơ riêng, vì vậy véc-tơ riêng không duy nhất theo độ dài hoặc dấu.

**Ý nghĩa và vai trò trong AI.** Phân tích thành phần chính (principal component analysis, PCA) dùng các véc-tơ riêng của ma trận hiệp phương sai làm các hướng chính và dùng giá trị riêng để đo phương sai trên từng hướng. Với ma trận Hessian đối xứng, véc-tơ riêng cho các hướng độ cong còn giá trị riêng cho độ lớn và dấu của độ cong; phổ giá trị riêng vì thế ảnh hưởng đến điều kiện hóa và tốc độ của thuật toán tối ưu.

### Các phép phân rã ma trận

#### Phân rã LU

**Định nghĩa.** Với $\mathbf A\in\mathbb R^{n\times n}$, phân rã LU có chọn phần tử trụ (LU decomposition with pivoting) viết

$$
\mathbf P\mathbf A=\mathbf L\mathbf U,
$$

trong đó $\mathbf P$ là ma trận hoán vị, $\mathbf L$ là ma trận tam giác dưới có đường chéo bằng $1$, và $\mathbf U$ là ma trận tam giác trên. Đổi hàng giúp tránh phần tử trụ bằng $0$ hoặc quá nhỏ.

**Ví dụ.** Với

$$
\mathbf A=\begin{bmatrix}1&1\\2&1\end{bmatrix},\quad
\mathbf P=\begin{bmatrix}0&1\\1&0\end{bmatrix},\quad
\mathbf L=\begin{bmatrix}1&0\\1/2&1\end{bmatrix},\quad
\mathbf U=\begin{bmatrix}2&1\\0&1/2\end{bmatrix},
$$

ta kiểm tra được $\mathbf P\mathbf A=\mathbf L\mathbf U=\begin{bmatrix}2&1\\1&1\end{bmatrix}$.

**Điểm dễ nhầm.** Khi có đổi hàng, công thức đúng là $\mathbf P\mathbf A=\mathbf L\mathbf U$, không được bỏ $\mathbf P$. Không phải ma trận nào cũng có phân rã $\mathbf A=\mathbf L\mathbf U$ mà không cần đổi hàng.

**Ý nghĩa và vai trò trong AI.** Sau khi phân rã một lần, có thể giải nhiều hệ cùng ma trận $\mathbf A$ bằng hai phép thế tam giác thay vì tính $\mathbf A^{-1}$. Vì $\det(\mathbf L)=1$,

$$
\det(\mathbf A)=\det(\mathbf P)\prod_{i=1}^n u_{ii}.
$$

Khi $\mathbf A$ khả nghịch, $\log|\det(\mathbf A)|=\sum_{i=1}^n\log|u_{ii}|$. Các đại lượng này thường gặp trong mô hình Gauss.

#### Phân rã QR

**Định nghĩa.** Cho $\mathbf A\in\mathbb R^{m\times n}$ với $m\ge n$ và $\operatorname{rank}(\mathbf A)=n$. Phân rã QR rút gọn (reduced QR decomposition) có dạng

$$
\mathbf A=\mathbf Q\mathbf R,
$$

trong đó $\mathbf Q\in\mathbb R^{m\times n}$ có các cột trực chuẩn, $\mathbf Q^T\mathbf Q=\mathbf I_n$, và $\mathbf R\in\mathbb R^{n\times n}$ là ma trận tam giác trên khả nghịch.

**Ví dụ.** Với

$$
\mathbf A=\begin{bmatrix}1&0\\0&1\\1&0\end{bmatrix},\quad
\mathbf Q=\begin{bmatrix}1/\sqrt2&0\\0&1\\1/\sqrt2&0\end{bmatrix},\quad
\mathbf R=\begin{bmatrix}\sqrt2&0\\0&1\end{bmatrix},
$$

ta có $\mathbf Q^T\mathbf Q=\mathbf I_2$ và $\mathbf Q\mathbf R=\mathbf A$.

**Điểm dễ nhầm.** Trong QR rút gọn, $\mathbf Q$ không vuông khi $m>n$, nên $\mathbf Q\mathbf Q^T$ không nhất thiết bằng $\mathbf I_m$. Ma trận thiếu hạng cần QR có chọn cột trụ hoặc cách xử lý riêng.

**Ý nghĩa và vai trò trong AI.** Bài toán bình phương tối thiểu $\min_{\mathbf w}\lVert\mathbf A\mathbf w-\mathbf y\rVert_2^2$ được đưa về hệ tam giác $\mathbf R\mathbf w=\mathbf Q^T\mathbf y$. Cách này thường ổn định số hơn việc lập phương trình chuẩn $\mathbf A^T\mathbf A\mathbf w=\mathbf A^T\mathbf y$.

#### Phân rã trị riêng

**Định nghĩa.** Nếu $\mathbf A\in\mathbb R^{n\times n}$ có $n$ véc-tơ riêng thực độc lập tuyến tính thì

$$
\mathbf A=\mathbf V\boldsymbol\Lambda\mathbf V^{-1},
$$

trong đó $\mathbf V,\boldsymbol\Lambda\in\mathbb R^{n\times n}$, các cột của $\mathbf V$ là véc-tơ riêng và $\boldsymbol\Lambda$ chứa các giá trị riêng trên đường chéo. Với $\mathbf A$ đối xứng thực, phân rã trị riêng (eigenvalue decomposition, EVD) có dạng $\mathbf A=\mathbf Q\boldsymbol\Lambda\mathbf Q^T$ với $\mathbf Q$ trực giao.

**Ví dụ.** Với $\mathbf A=\begin{bmatrix}2&1\\1&2\end{bmatrix}$, đặt

$$
\mathbf Q=\frac1{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix},
\qquad
\boldsymbol\Lambda=\begin{bmatrix}3&0\\0&1\end{bmatrix}.
$$

Hai cột của $\mathbf Q$ là các véc-tơ riêng trực chuẩn đã tìm ở trên, và phép nhân cho $\mathbf A=\mathbf Q\boldsymbol\Lambda\mathbf Q^T$.

**Điểm dễ nhầm.** EVD chỉ áp dụng cho ma trận vuông và không phải ma trận vuông nào cũng khả chéo hóa. Dạng $\mathbf Q\boldsymbol\Lambda\mathbf Q^T$ cần giả thiết ma trận thực đối xứng.

**Ý nghĩa và vai trò trong AI.** EVD cung cấp các trục chính và mức co giãn trên từng trục. Nó được dùng trong PCA của ma trận hiệp phương sai và trong phân tích phổ của Hessian để khảo sát độ cong, điều kiện hóa và tốc độ tối ưu.

#### Phân rã giá trị kỳ dị

**Định nghĩa.** Mọi $\mathbf A\in\mathbb R^{m\times n}$ đều có phân rã giá trị kỳ dị (singular value decomposition, SVD)

$$
\mathbf A=\mathbf U\boldsymbol\Sigma\mathbf V^T,
$$

trong đó $\mathbf U\in\mathbb R^{m\times m}$ và $\mathbf V\in\mathbb R^{n\times n}$ trực giao, còn $\boldsymbol\Sigma\in\mathbb R^{m\times n}$ chỉ có các giá trị kỳ dị $\sigma_1\ge\cdots\ge\sigma_r>0$ trên đường chéo, với $r=\operatorname{rank}(\mathbf A)$. Dạng SVD rút gọn giữ $\mathbf U_r\in\mathbb R^{m\times r}$, $\boldsymbol\Sigma_r\in\mathbb R^{r\times r}$ và $\mathbf V_r\in\mathbb R^{n\times r}$.

**Ví dụ.** Với

$$
\mathbf A=\begin{bmatrix}3&0\\0&2\\0&0\end{bmatrix}
=\mathbf I_3
\begin{bmatrix}3&0\\0&2\\0&0\end{bmatrix}
\mathbf I_2^T,
$$

ta có $\sigma_1=3$, $\sigma_2=2$ và $\sigma_i^2$ là các giá trị riêng của $\mathbf A^T\mathbf A=\operatorname{diag}(9,4)$.

**Điểm dễ nhầm.** Giá trị kỳ dị luôn không âm, tồn tại cả với ma trận chữ nhật và không đồng nhất với giá trị riêng. EVD và SVD chỉ trùng về các hướng trong một số trường hợp đặc biệt.

**Ý nghĩa và vai trò trong AI.** Cắt SVD tại một số ít giá trị kỳ dị lớn tạo xấp xỉ hạng thấp dùng trong nén và khử nhiễu. SVD cũng là nền tảng của PCA và giả nghịch đảo

$$
\mathbf A^\dagger
=\mathbf V_r\boldsymbol\Sigma_r^{-1}\mathbf U_r^T,
$$

dùng để mô tả nghiệm bình phương tối thiểu kể cả khi ma trận chữ nhật hoặc thiếu hạng.

### Dạng toàn phương

**Định nghĩa.** Cho ma trận đối xứng $\mathbf Q\in\mathbb R^{n\times n}$ và $\mathbf x\in\mathbb R^n$. Hàm vô hướng

$$
q(\mathbf x)=\mathbf x^T\mathbf Q\mathbf x
$$

được gọi là dạng toàn phương sinh bởi $\mathbf Q$.

**Xác định dương và nửa xác định dương.** Ma trận $\mathbf Q$ là **nửa xác định dương** (positive semidefinite, PSD), ký hiệu $\mathbf Q\succeq\mathbf0$, nếu $q(\mathbf x)\ge0$ với mọi $\mathbf x\in\mathbb R^n$. Ma trận $\mathbf Q$ là **xác định dương** (positive definite, PD), ký hiệu $\mathbf Q\succ\mathbf0$, nếu $q(\mathbf x)>0$ với mọi $\mathbf x\ne\mathbf0$. Vì vậy, PD kéo theo PSD; với PD, dấu bằng chỉ xảy ra tại $\mathbf x=\mathbf0$.

**Ý nghĩa hình học.** Nếu $\mathbf Q\succ\mathbf0$ thì $\sqrt{q(\mathbf x)}$ là một chuẩn và $q(\mathbf x)$ là bình phương của chuẩn đó. Tập mức $q(\mathbf x)=c$ với $c>0$ là một ellipsoid tâm tại gốc; theo các hướng riêng của $\mathbf Q$, trị riêng lớn hơn tương ứng với bán trục ngắn hơn. Nếu $\mathbf Q\succeq\mathbf0$ nhưng không xác định dương thì $\sqrt{q(\mathbf x)}$ chỉ là một nửa chuẩn và có thể bằng $0$ tại véc-tơ khác không.

**Ví dụ.** Với $\mathbf Q=\begin{bmatrix}1&0\\0&4\end{bmatrix}$,

$$
q(\mathbf x)=x_1^2+4x_2^2.
$$

Ta có $q(\mathbf x)>0$ với mọi $\mathbf x\ne\mathbf0$, nên $\mathbf Q\succ\mathbf0$. Tại $\mathbf x=[2,-1]^T$, $q(\mathbf x)=2^2+4(-1)^2=8$.

**Trường hợp biên.** Với $\mathbf Q=\begin{bmatrix}1&0\\0&0\end{bmatrix}$, ta có $q(\mathbf x)=x_1^2\ge0$, nên $\mathbf Q\succeq\mathbf0$. Tuy nhiên, $q([0,1]^T)=0$ dù $[0,1]^T\ne\mathbf0$, nên $\mathbf Q$ không xác định dương. Tập mức dương khi đó không nhất thiết là ellipsoid bị chặn.

**Điểm dễ nhầm.** Nửa xác định dương cho phép một véc-tơ khác không có giá trị dạng toàn phương bằng $0$. Ngoài ra, các phần tử trên đường chéo đều dương chưa đủ để kết luận một ma trận đối xứng là xác định dương.

**Ý nghĩa và vai trò trong AI.** Với $\mathbf A\in\mathbb R^{m\times n}$, ma trận $\mathbf A^T\mathbf A$ là nửa xác định dương vì

$$
\mathbf x^T\mathbf A^T\mathbf A\mathbf x
=\lVert\mathbf A\mathbf x\rVert_2^2\ge0.
$$

Hơn nữa,

$$
\mathbf A^T\mathbf A\succ\mathbf0
\iff \operatorname{rank}(\mathbf A)=n
\iff \operatorname{Ker}(\mathbf A)=\{\mathbf0\}.
$$

Dạng toàn phương mô tả độ cong của hàm mất mát qua ma trận Hessian, xuất hiện trong bình phương tối thiểu với $\mathbf X^T\mathbf X$, và tạo hạng phạt trong điều chuẩn bậc hai.

## Giải tích nhiều biến

Phần này dùng ba ví dụ xuyên suốt: hàm vô hướng $h(u,v)=u^2+uv+2v^2+u-2v$, ánh xạ véc-tơ $\mathbf F(u,v)=[u+v,uv,u-v]^T$ và bài toán bình phương tối thiểu của mô hình giá nhà.

### Hàm vô hướng và ánh xạ véc-tơ

**Định nghĩa.** Hàm vô hướng $h:\mathbb R^n\to\mathbb R$ nhận một véc-tơ và trả về một số. Ánh xạ véc-tơ $\mathbf F:\mathbb R^n\to\mathbb R^m$ trả về một véc-tơ; $n$ và $m$ không nhất thiết bằng nhau. Miền xác định chứa các đầu vào hợp lệ, đối miền được chọn để chứa đầu ra, còn ảnh là tập các đầu ra thực sự đạt được.

**Ý nghĩa hình học.** Hàm vô hướng có thể được xem như một trường độ cao trên không gian đầu vào. Ánh xạ véc-tơ biến mỗi điểm đầu vào thành một điểm trong một không gian khác.

**Ví dụ.** Tại $(u,v)=(1,2)$, $h(1,2)=8$ là một vô hướng, còn $\mathbf F(1,2)=[3,2,-1]^T\in\mathbb R^3$.

**Điểm dễ nhầm.** Đối miền không nhất thiết bằng ảnh. Ngoài ra, cần phân biệt số chiều đầu vào với số chiều đầu ra trước khi viết đạo hàm.

**Ý nghĩa và vai trò trong AI.** Hàm mất mát thường là hàm vô hướng của nhiều tham số; một tầng mạng nơ-ron thường là ánh xạ véc-tơ giữa hai không gian đặc trưng.

### Đồ thị, lát cắt và tập mức

**Định nghĩa.** Đồ thị của $h:\mathbb R^n\to\mathbb R$ là tập các điểm $(\mathbf x,h(\mathbf x))\in\mathbb R^{n+1}$. Lát cắt thu được khi giữ cố định một số biến. Tập mức ứng với $c\in\mathbb R$ là $L_c=\{\mathbf x:h(\mathbf x)=c\}$.

**Ý nghĩa hình học.** Đồ thị cho toàn bộ bề mặt, lát cắt cho một đường quan sát theo hướng chọn trước, còn tập mức nối các đầu vào có cùng giá trị hàm.

**Ví dụ.** Với $h(u,v)=u^2+uv+2v^2+u-2v$, giữ $v=2$ cho lát cắt $p(u)=u^2+3u+4$. Tập mức $L_0$ có phương trình $u^2+uv+2v^2+u-2v=0$ và là một elip vừa xoay vừa tịnh tiến so với các trục tọa độ.

**Điểm dễ nhầm.** Đồ thị nằm trong $\mathbb R^{n+1}$, còn tập mức nằm trong $\mathbb R^n$. Một lát cắt không mô tả hết hành vi của hàm theo mọi hướng.

**Ý nghĩa và vai trò trong AI.** Đường mức của hàm mất mát giúp quan sát độ dốc, độ điều kiện và quỹ đạo của thuật toán tối ưu trong không gian tham số thấp chiều.

### Đạo hàm riêng qua lát cắt một biến

**Định nghĩa.** Đạo hàm riêng theo biến $x_i$ tại $\mathbf x$ là đạo hàm của lát cắt khi chỉ thay đổi $x_i$ và giữ các biến còn lại cố định:

$$
\frac{\partial h}{\partial x_i}(\mathbf x)
=\lim_{t\to0}\frac{h(\mathbf x+t\mathbf e_i)-h(\mathbf x)}{t},
$$

nếu giới hạn tồn tại.

**Ý nghĩa hình học.** Đạo hàm riêng là độ dốc của tiếp tuyến trên lát cắt song song với một trục tọa độ.

**Ví dụ.** Với $h(u,v)=u^2+uv+2v^2+u-2v$, ta có $\partial h/\partial u=2u+v+1$ và $\partial h/\partial v=u+4v-2$. Tại $(1,2)$, hai độ dốc lần lượt là $5$ và $7$.

**Điểm dễ nhầm.** Khi lấy đạo hàm riêng theo một biến, các biến khác được giữ cố định chứ không đặt bằng $0$. Sự tồn tại của tất cả đạo hàm riêng tại một điểm chưa đủ để kết luận hàm khả vi tại đó.

**Ý nghĩa và vai trò trong AI.** Mỗi đạo hàm riêng đo độ nhạy cục bộ của mất mát đối với một tham số khi các tham số khác tạm thời được giữ cố định.

### Khả vi của hàm nhiều biến

**Định nghĩa.** Hàm $h:\mathbb R^n\to\mathbb R$ khả vi tại $\mathbf x$ nếu tồn tại một ánh xạ tuyến tính $L$ sao cho

$$
h(\mathbf x+\boldsymbol\Delta)
=h(\mathbf x)+L(\boldsymbol\Delta)+o(\lVert\boldsymbol\Delta\rVert_2),
$$

trong đó $o(\lVert\boldsymbol\Delta\rVert_2)/\lVert\boldsymbol\Delta\rVert_2\to0$ khi $\boldsymbol\Delta\to\mathbf0$. Với hàm vô hướng khả vi, $L(\boldsymbol\Delta)=\nabla h(\mathbf x)^T\boldsymbol\Delta$.

**Ý nghĩa hình học.** Gần $\mathbf x$, đồ thị của hàm khả vi được xấp xỉ bởi một siêu phẳng; phần sai khác nhỏ hơn bậc nhất so với độ dài dịch chuyển.

**Ví dụ.** Với $h(u,v)=u^2+uv+2v^2+u-2v$, phần còn lại sau xấp xỉ tuyến tính là $\Delta u^2+\Delta u\Delta v+2\Delta v^2$, có bậc hai nên thỏa điều kiện khả vi tại mọi điểm.

**Điểm dễ nhầm.** Có các đạo hàm riêng không đồng nghĩa với khả vi. Một điều kiện đủ thường dùng là các đạo hàm riêng tồn tại và liên tục trong một lân cận của điểm đang xét.

**Ý nghĩa và vai trò trong AI.** Khả vi bảo đảm thay đổi nhỏ của tham số có thể được mô tả bằng một mô hình tuyến tính cục bộ, là nền tảng của lan truyền ngược và tối ưu dựa trên gradient.

### Gradient và quy ước véc-tơ cột

**Định nghĩa.** Với $h:\mathbb R^n\to\mathbb R$ khả vi, gradient được quy ước là véc-tơ cột

$$
\nabla h(\mathbf x)
=\begin{bmatrix}
\partial h/\partial x_1&\cdots&\partial h/\partial x_n
\end{bmatrix}^T\in\mathbb R^n.
$$

**Ý nghĩa hình học.** Nếu $h$ thuộc lớp $C^1$ trong một lân cận của $\mathbf x$ và $\nabla h(\mathbf x)\ne\mathbf0$, tập mức qua $\mathbf x$ là một siêu mặt trơn cục bộ và gradient là véc-tơ pháp tuyến của siêu mặt đó. Gradient cũng hướng về phía hàm tăng nhanh nhất theo chuẩn Euclid.

**Ví dụ.** $\nabla h(1,2)=[5,7]^T$, có độ dài $\sqrt{74}$; hướng tăng nhanh nhất là $[5,7]^T/\sqrt{74}$.

**Điểm dễ nhầm.** Gradient là một véc-tơ, không phải một đạo hàm vô hướng. Công thức chuyển vị trong quy tắc dây chuyền phụ thuộc vào quy ước gradient cột được dùng nhất quán ở đây.

**Ý nghĩa và vai trò trong AI.** Gradient gom độ nhạy theo tất cả tham số và cung cấp hướng cập nhật cơ bản cho quá trình huấn luyện mô hình.

### Đạo hàm theo hướng

**Định nghĩa.** Với $\lVert\mathbf d\rVert_2=1$, đạo hàm theo hướng là

$$
D_{\mathbf d}h(\mathbf x)
=\lim_{t\to0}\frac{h(\mathbf x+t\mathbf d)-h(\mathbf x)}{t}.
$$

Nếu $h$ khả vi thì $D_{\mathbf d}h(\mathbf x)=\nabla h(\mathbf x)^T\mathbf d$.

**Ý nghĩa hình học.** Đây là độ dốc của lát cắt theo đường thẳng $\mathbf x+t\mathbf d$. Nếu $\nabla h(\mathbf x)\ne\mathbf0$, giá trị lớn nhất trên các hướng đơn vị là $\lVert\nabla h(\mathbf x)\rVert_2$, đạt theo hướng gradient; giá trị nhỏ nhất đạt theo hướng đối gradient. Nếu gradient bằng $\mathbf0$, mọi đạo hàm theo hướng đều bằng $0$.

**Ví dụ.** Với $\mathbf d=[3/5,4/5]^T$, $D_{\mathbf d}h(1,2)=[5,7]\mathbf d=43/5$.

**Điểm dễ nhầm.** Nếu $\mathbf d$ không có chuẩn bằng $1$, kết quả còn bị nhân theo độ dài của $\mathbf d$. Sự tồn tại của mọi đạo hàm theo hướng vẫn chưa đủ để suy ra khả vi.

**Ý nghĩa và vai trò trong AI.** Đạo hàm theo hướng đo ảnh hưởng của một nhiễu hoặc một hướng cập nhật cụ thể lên mất mát, chẳng hạn khi phân tích độ nhạy hoặc nhiễu đối kháng.

### Vi phân, tuyến tính hóa và mặt phẳng tiếp xúc

**Định nghĩa.** Vi phân của hàm vô hướng khả vi là ánh xạ tuyến tính $\mathrm dh=\nabla h(\mathbf x)^T\mathrm d\mathbf x$. Tuyến tính hóa quanh $\mathbf x$ là

$$
h(\mathbf x+\boldsymbol\Delta)
\approx h(\mathbf x)+\nabla h(\mathbf x)^T\boldsymbol\Delta.
$$

**Ý nghĩa hình học.** Với hàm hai biến, tuyến tính hóa tạo mặt phẳng tiếp xúc $z=h(u_0,v_0)+h_u(u_0,v_0)(u-u_0)+h_v(u_0,v_0)(v-v_0)$.

**Ví dụ.** Tại $(1,2)$, mặt phẳng tiếp xúc là $z=8+5(u-1)+7(v-2)$. Với $\boldsymbol\Delta=[0{,}1,-0{,}1]^T$, tuyến tính hóa dự đoán $7{,}8$, còn giá trị đúng là $h(1{,}1,1{,}9)=7{,}82$.

**Điểm dễ nhầm.** $\mathrm dh$ là thay đổi tuyến tính dự đoán, không phải luôn bằng thay đổi hữu hạn $h(\mathbf x+\boldsymbol\Delta)-h(\mathbf x)$.

**Ý nghĩa và vai trò trong AI.** Tuyến tính hóa giúp xấp xỉ ảnh hưởng của nhiễu đầu vào, lan truyền sai số và suy các công thức gradient theo ma trận.

### Ma trận Jacobian

**Định nghĩa.** Với $\mathbf F:\mathbb R^n\to\mathbb R^m$ khả vi, Jacobian là

$$
(\mathbf J_F)_{ij}=\frac{\partial F_i}{\partial x_j},
\qquad
\mathbf J_F\in\mathbb R^{m\times n},
$$

và $\mathrm d\mathbf F=\mathbf J_F\mathrm d\mathbf x$.

**Ý nghĩa hình học.** Jacobian là phép biến đổi tuyến tính tốt nhất mô tả cách một dịch chuyển nhỏ ở đầu vào được ánh xạ thành dịch chuyển đầu ra.

**Ví dụ.** Với $\mathbf F(u,v)=[u+v,uv,u-v]^T$,

$$
\mathbf J_F(1,2)=
\begin{bmatrix}
1&1\\2&1\\1&-1
\end{bmatrix}
\in\mathbb R^{3\times2}.
$$

**Điểm dễ nhầm.** Jacobian không nhất thiết vuông. Hàng tương ứng với thành phần đầu ra và cột tương ứng với biến đầu vào; đảo quy ước sẽ làm sai kích thước trong quy tắc dây chuyền.

**Ý nghĩa và vai trò trong AI.** Jacobian mô tả độ nhạy của một tầng véc-tơ, một biểu diễn ẩn hoặc đầu ra mô hình đối với đầu vào và tham số.

### Quy tắc dây chuyền

**Định nghĩa.** Nếu $\mathbf F:\mathbb R^n\to\mathbb R^m$ và $\mathbf G:\mathbb R^m\to\mathbb R^p$ khả vi thì

$$
\mathbf J_{G\circ F}(\mathbf x)
=\mathbf J_G(\mathbf F(\mathbf x))\mathbf J_F(\mathbf x).
$$

Nếu $g:\mathbb R^m\to\mathbb R$ thì $\nabla(g\circ\mathbf F)=\mathbf J_F^T\nabla g(\mathbf F)$.

**Ý nghĩa hình học.** Mỗi hàm hợp biến đổi một dịch chuyển nhỏ qua nhiều không gian; các Jacobian được ghép theo đúng thứ tự thực hiện các phép biến đổi.

**Ví dụ.** Đặt $g(\mathbf z)=\frac12\lVert\mathbf z\rVert_2^2$ và $\ell=g\circ\mathbf F$. Tại $(1,2)$, $\mathbf F=[3,2,-1]^T$ nên

$$
\nabla\ell(1,2)
=\mathbf J_F(1,2)^T\mathbf F(1,2)
=\begin{bmatrix}6\\6\end{bmatrix}.
$$

**Điểm dễ nhầm.** Thứ tự nhân Jacobian không được đảo vì phép nhân ma trận không giao hoán. Kiểm tra kích thước là cách phát hiện nhiều lỗi quy tắc dây chuyền.

**Ý nghĩa và vai trò trong AI.** Lan truyền ngược áp dụng quy tắc dây chuyền nhiều lần để đưa độ nhạy của mất mát qua các tầng của mô hình.

### Tích Jacobian–véc-tơ và véc-tơ–Jacobian

**Định nghĩa.** Với $\mathbf J_F\in\mathbb R^{m\times n}$, tích Jacobian–véc-tơ (Jacobian–vector product, JVP) là $\mathbf J_F\mathbf d\in\mathbb R^m$. Theo quy ước véc-tơ cột, tích véc-tơ–Jacobian (vector–Jacobian product, VJP) được biểu diễn tương đương bởi $\mathbf J_F^T\mathbf a\in\mathbb R^n$.

**Ý nghĩa hình học.** JVP đẩy một hướng tiếp tuyến từ đầu vào sang đầu ra; VJP kéo một độ nhạy từ đầu ra ngược về đầu vào.

**Ví dụ.** Với Jacobian trên, $\mathbf d=[1,0]^T$ cho $\mathbf J_F\mathbf d=[1,2,1]^T$. Với $\mathbf a=\mathbf F(1,2)=[3,2,-1]^T$, ta có $\mathbf J_F^T\mathbf a=[6,6]^T$.

**Điểm dễ nhầm.** VJP thường được viết dạng hàng $\mathbf a^T\mathbf J_F$; chuyển sang quy ước cột phải lấy chuyển vị. JVP và VJP không yêu cầu tạo tường minh toàn bộ Jacobian.

**Ý nghĩa và vai trò trong AI.** Vi phân tự động chế độ thuận tính JVP, còn chế độ ngược dùng VJP; lan truyền ngược hiệu quả vì mất mát thường chỉ có một đầu ra vô hướng.

### Đạo hàm riêng bậc hai và ma trận Hessian

**Định nghĩa.** Với $h:\mathbb R^n\to\mathbb R$ khả vi hai lần, Hessian là

$$
\mathbf H_h(\mathbf x)=\nabla^2h(\mathbf x),
\qquad
(\mathbf H_h)_{ij}=\frac{\partial^2h}{\partial x_i\partial x_j}.
$$

Nếu các đạo hàm riêng bậc hai liên tục quanh điểm đang xét thì Hessian đối xứng.

**Ý nghĩa hình học.** Hessian mô tả cách gradient thay đổi và chứa thông tin độ cong cục bộ của đồ thị theo các hướng khác nhau.

**Ví dụ.** Với $h(u,v)=u^2+uv+2v^2+u-2v$,

$$
\mathbf H_h=
\begin{bmatrix}
2&1\\1&4
\end{bmatrix}.
$$

**Điểm dễ nhầm.** Hessian được định nghĩa cho hàm đầu ra vô hướng. Không được tự động đổi thứ tự hai đạo hàm hỗn hợp nếu thiếu giả thiết bảo đảm tính liên tục thích hợp.

**Ý nghĩa và vai trò trong AI.** Hessian được dùng để phân tích độ cong của mất mát, độ điều kiện và hành vi của các thuật toán tối ưu bậc hai.

### Độ cong theo hướng và dạng toàn phương

**Định nghĩa.** Với $\varphi(t)=h(\mathbf x+t\mathbf d)$ và $h$ khả vi hai lần,

$$
\varphi''(0)
=\mathbf d^T\mathbf H_h(\mathbf x)\mathbf d.
$$

Đây là độ cong của lát cắt một chiều theo hướng $\mathbf d$.

**Ý nghĩa hình học.** Giá trị dương biểu thị lát cắt cong lên, giá trị âm biểu thị cong xuống. Trên một véc-tơ riêng đơn vị của Hessian, độ cong bằng giá trị riêng tương ứng.

**Ví dụ.** Với Hessian của $h$, hướng $\mathbf e_1$ cho độ cong $2$, còn $\mathbf d=[1,1]^T/\sqrt2$ cho độ cong $4$.

**Điểm dễ nhầm.** Nếu nhân $\mathbf d$ với $c$ thì dạng toàn phương bị nhân với $c^2$; muốn so sánh độ cong giữa các hướng phải chuẩn hóa véc-tơ hướng.

**Ý nghĩa và vai trò trong AI.** Độ cong theo hướng giúp giải thích vì sao cùng một kích thước bước có thể phù hợp theo hướng này nhưng quá lớn theo hướng khác.

### Khai triển Taylor bậc nhất và bậc hai

**Định nghĩa.** Nếu $h$ thuộc lớp $C^2$ trong một lân cận của $\mathbf x$ thì mô hình Taylor bậc hai là

$$
h(\mathbf x+\boldsymbol\Delta)
=h(\mathbf x)
+\nabla h(\mathbf x)^T\boldsymbol\Delta
+\frac12\boldsymbol\Delta^T\mathbf H_h(\mathbf x)\boldsymbol\Delta
+o(\lVert\boldsymbol\Delta\rVert_2^2).
$$

Bỏ hạng chứa Hessian cho mô hình Taylor bậc nhất.

**Ý nghĩa hình học.** Taylor bậc nhất thay đồ thị bằng mặt phẳng tiếp xúc; Taylor bậc hai bổ sung một mặt cong dạng toàn phương.

**Ví dụ.** Tại $(1,2)$ với $\boldsymbol\Delta=[0{,}1,-0{,}1]^T$, Taylor bậc hai cho $8-0{,}2+0{,}02=7{,}82$. Đây là giá trị chính xác vì $h$ là đa thức bậc hai.

**Điểm dễ nhầm.** Công thức Taylor nói chung là xấp xỉ cục bộ, không phải đẳng thức toàn cục. Hệ số $1/2$ trước hạng Hessian không được bỏ.

**Ý nghĩa và vai trò trong AI.** Taylor giải thích các mô hình cục bộ của mất mát, điều kiện giảm của một bước cập nhật và động cơ của phương pháp Newton.

### Điểm dừng và điều kiện tối ưu bậc nhất

**Định nghĩa.** Điểm $\mathbf x^*$ là điểm dừng nếu $\nabla h(\mathbf x^*)=\mathbf0$. Nếu $h$ khả vi và đạt cực tiểu hoặc cực đại địa phương tại một điểm nằm trong miền mở thì điểm đó phải là điểm dừng.

**Ý nghĩa hình học.** Tại điểm dừng, mô hình tuyến tính bậc nhất là một mặt phẳng ngang; mọi đạo hàm theo hướng đều bằng $0$.

**Ví dụ.** Giải $2u+v+1=0$ và $u+4v-2=0$ cho $h$ thu được điểm dừng duy nhất $(-6/7,5/7)$.

**Điểm dễ nhầm.** Gradient bằng $0$ chỉ là điều kiện cần, không đủ để kết luận cực tiểu. Chẳng hạn, $s(u,v)=u^2-v^2$ có gradient bằng $0$ tại gốc nhưng gốc là điểm yên ngựa.

**Ý nghĩa và vai trò trong AI.** Điều kiện gradient bằng $0$ tạo phương trình đặc trưng cho nghiệm tối ưu và giúp định nghĩa trạng thái mà thuật toán huấn luyện không còn hướng giảm bậc nhất.

### Phân loại điểm dừng bằng Hessian

**Định nghĩa.** Tại điểm dừng $\mathbf x^*$ của hàm $C^2$: nếu $\mathbf H_h(\mathbf x^*)\succ\mathbf0$ thì $\mathbf x^*$ là cực tiểu địa phương chặt; nếu $\mathbf H_h(\mathbf x^*)\prec\mathbf0$ thì đó là cực đại địa phương chặt; nếu Hessian bất định dấu thì đó là điểm yên ngựa.

**Ý nghĩa hình học.** Hessian xác định dương tạo một chiếc bát cong lên theo mọi hướng; xác định âm tạo một mái vòm; Hessian bất định dấu cong lên ở một số hướng và cong xuống ở hướng khác.

**Ví dụ.** Hessian của $h$ có hai giá trị riêng $3+\sqrt2$ và $3-\sqrt2$, đều dương, nên điểm dừng $(-6/7,5/7)$ là cực tiểu địa phương chặt.

**Điểm dễ nhầm.** Hessian nửa xác định dương hoặc nửa xác định âm chưa đủ để phân loại. Ví dụ, $t^4$ có đạo hàm bậc hai bằng $0$ tại gốc nhưng gốc vẫn là cực tiểu.

**Ý nghĩa và vai trò trong AI.** Phép thử Hessian giúp phân biệt cực tiểu với điểm yên ngựa và cho biết các hướng phẳng hoặc có độ cong lớn trong không gian tham số.

### Tích phân một biến và tích phân nhiều biến

**Định nghĩa.** Với $\psi$ khả tích trên $[a,b]$, tích phân $\int_a^b\psi(x)\,\mathrm dx$ cộng tích lũy đại lượng trên đoạn đó. Với miền $D\subset\mathbb R^2$, $\iint_D\psi(x,y)\,\mathrm dA$ cộng giá trị trên toàn miền. Nếu $\psi$ liên tục trên một miền chữ nhật thì tích phân kép có thể viết thành tích phân lặp theo một trong hai thứ tự.

**Ý nghĩa hình học.** Tích phân một biến là diện tích có dấu dưới đường cong; tích phân hai biến là thể tích có dấu dưới một bề mặt.

**Ví dụ.** Hai phép tính trong slide cho

$$
\int_0^1(2x+1)\,\mathrm dx=2,
\qquad
\int_0^1\int_0^2(x+y)\,\mathrm dy\,\mathrm dx=3.
$$

**Điểm dễ nhầm.** Cận phải đi cùng đúng biến tích phân. Khi tích phân một mật độ xác suất, mật độ phải không âm và tích phân trên toàn miền phải bằng $1$.

**Ý nghĩa và vai trò trong AI.** Tích phân biến mật độ thành xác suất, tạo kỳ vọng và xuất hiện khi lấy trung bình trên các biến ẩn hoặc nhiễu liên tục.

### Gradient, Hessian và phương trình chuẩn của bình phương tối thiểu

**Định nghĩa.** Cho $\mathbf X\in\mathbb R^{m\times n}$, $\mathbf w\in\mathbb R^n$, $\mathbf y\in\mathbb R^m$, đặt

$$
\mathbf r(\mathbf w)=\mathbf X\mathbf w-\mathbf y,
\qquad
f(\mathbf w)=\frac12\mathbf r(\mathbf w)^T\mathbf r(\mathbf w).
$$

Từ $\mathrm d\mathbf r=\mathbf X\,\mathrm d\mathbf w$ suy ra

$$
\nabla f=\mathbf X^T\mathbf r,
\qquad
\nabla^2f=\mathbf X^T\mathbf X,
\qquad
\nabla f=\mathbf0
\iff \mathbf X^T\mathbf X\mathbf w=\mathbf X^T\mathbf y.
$$

**Ý nghĩa hình học.** Cực tiểu hóa $f$ là chiếu $\mathbf y$ lên $\operatorname{Col}(\mathbf X)$; tại nghiệm, phần dư vuông góc với mọi cột của $\mathbf X$.

**Ví dụ.** Với dữ liệu giá nhà và $\mathbf w^{(0)}=[14,1,1]^T$, ta có $\mathbf r=[0{,}5,1{,}5,0{,}5,-2{,}5]^T$ và $\nabla f(\mathbf w^{(0)})=[0,-5,-3]^T$. Hessian là

$$
\mathbf X^T\mathbf X=
\begin{bmatrix}
4&0&0\\0&5&3\\0&3&2
\end{bmatrix}\succeq\mathbf0.
$$

**Điểm dễ nhầm.** Gradient bằng $0$ không có nghĩa từng phần dư bằng $0$. Hessian nửa xác định dương không tự động bảo đảm trọng số tối ưu là duy nhất.

**Ý nghĩa và vai trò trong AI.** Đây là ví dụ cơ bản cho cách quy tắc dây chuyền biến sai số dự đoán thành gradient tham số và cách độ cong quyết định độ khó của bài toán học.

### Điều kiện tồn tại và tính duy nhất của nghiệm bình phương tối thiểu

**Định nghĩa.** Nghiệm bình phương tối thiểu là phần tử của $\operatorname*{arg\,min}_{\mathbf w}\lVert\mathbf X\mathbf w-\mathbf y\rVert_2^2$. Trong không gian hữu hạn chiều, nghiệm luôn tồn tại. Trọng số tối ưu duy nhất khi và chỉ khi $\operatorname{rank}(\mathbf X)=n$, tương đương $\operatorname{Ker}(\mathbf X)=\{\mathbf0\}$.

**Ý nghĩa hình học.** Hình chiếu $\hat{\mathbf y}$ của $\mathbf y$ lên $\operatorname{Col}(\mathbf X)$ là duy nhất. Nếu $\mathbf X$ thiếu hạng, nhiều véc-tơ trọng số có thể tạo cùng một hình chiếu.

**Ví dụ.** Ma trận thiết kế giá nhà có hạng cột đầy đủ, nên nghiệm duy nhất là $\mathbf w_{\mathrm{LS}}=[14,2,1]^T$. Khi đó có thể viết

$$
\mathbf w_{\mathrm{LS}}
=(\mathbf X^T\mathbf X)^{-1}\mathbf X^T\mathbf y.
$$

**Điểm dễ nhầm.** Hệ $\mathbf X\mathbf w=\mathbf y$ vô nghiệm chính xác không có nghĩa bài toán bình phương tối thiểu vô nghiệm. Công thức dùng nghịch đảo chỉ hợp lệ khi $\mathbf X$ có hạng cột đầy đủ; trường hợp thiếu hạng có thể dùng giả nghịch đảo hoặc SVD.

**Ý nghĩa và vai trò trong AI.** Điều kiện hạng phản ánh khả năng nhận dạng tham số. Các cột đặc trưng phụ thuộc tuyến tính làm trọng số không duy nhất và thường báo hiệu đa cộng tuyến hoặc nhu cầu điều chuẩn.

### Một bước gradient và ảnh hưởng của kích thước bước

**Định nghĩa.** Một bước hạ gradient với kích thước bước $\eta>0$ là

$$
\mathbf w^+
=\mathbf w-\eta\nabla f(\mathbf w).
$$

**Ý nghĩa hình học.** Khi gradient khác $0$, hướng $-\nabla f$ là hướng giảm nhanh nhất cục bộ theo chuẩn Euclid; $\eta$ quyết định khoảng cách di chuyển trên hướng đó.

**Ví dụ.** Với $\eta=0{,}1$ và gradient tại $\mathbf w^{(0)}$ ở trên,

$$
\mathbf w^+=[14,1{,}5,1{,}3]^T,
\qquad
f(\mathbf w^+)=2{,}265<4{,}5=f(\mathbf w^{(0)}).
$$

**Điểm dễ nhầm.** Hướng đối gradient chỉ bảo đảm giảm đối với bước đủ nhỏ; một $\eta$ quá lớn có thể làm mất mát tăng hoặc gây dao động. Việc một bước giảm hàm không chứng minh thuật toán đã hội tụ.

**Ý nghĩa và vai trò trong AI.** Hạ gradient và các biến thể của nó là cơ chế cập nhật tham số phổ biến trong học máy; chuẩn hóa đặc trưng và độ cong của mất mát ảnh hưởng mạnh đến lựa chọn kích thước bước.

## Xác suất một biến

Phần này dành cho biến ngẫu nhiên, hàm khối xác suất, hàm mật độ xác suất, hàm phân phối tích lũy, kỳ vọng, phương sai và mô hình nhiễu Gauss.

## Xác suất nhiều biến

Phần này dành cho phân phối đồng thời, phân phối biên, xác suất có điều kiện, công thức Bayes, độc lập, hiệp phương sai, tương quan, Gauss nhiều biến và bình phương tối thiểu tổng quát.

## Ghép các công cụ vào mô hình giá nhà

Phần này sẽ nối các kết quả đại số, giải tích và xác suất để giải thích nghiệm bình phương tối thiểu, phần dư sau khi khớp, dự đoán kèm bất định và nguy cơ quá khớp.

## Bài tập tổng hợp

Các bài tập sẽ được bổ sung cùng với từng cụm nội dung. Gợi ý và lời giải được đặt trong khối gập để người học có thể thử giải trước.

## Tài liệu tham khảo

- Goodfellow, Ian; Bengio, Yoshua; Courville, Aaron (2016), *Deep Learning*, Chương 2, Mục 2.1–2.9 và 2.11; Chương 4, Mục 4.3–4.5; Chương 6, Mục 6.5.
- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Phụ lục A.4–A.5, phần vi phân, đạo hàm bậc hai và bình phương tối thiểu.
- Stewart, James (2016), *Calculus*, ấn bản thứ 8, Mục 5.2–5.3, 14.1–14.7 và 15.1–15.2, phần tích phân một biến, hàm nhiều biến, đạo hàm và tích phân nhiều biến.
- Strang, Gilbert (2016), *Introduction to Linear Algebra*, ấn bản thứ 5, Mục 2.6 và 4.4, phần phân rã LU, hệ trực chuẩn, Gram–Schmidt và phân rã QR.
- Roe, David (2013), *Linear Methods (Math 211) — Lecture 2*, tr. 5–8, phần tính tương thích, hạng của ma trận mở rộng và số tham số của tập nghiệm: <https://math.mit.edu/~roed/courses/211/lectures/Sep-11.pdf>.
- Mattuck, Arthur, *D. Determinants*, trong *18.02 Supplementary Notes and Problems*, MIT OpenCourseWare 18.02 (học phần do Denis Auroux giảng dạy, Fall 2007), tr. 2–5, phần khai triển Laplace và diễn giải diện tích, thể tích: <https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/60d63f4aa52f7cc54ba6b12a0c7c6080_determinants.pdf>.
