# Bài 00 — Ôn tập nền tảng toán học cho AI

Bài 00 nối ba nền tảng toán học dùng xuyên suốt học phần: đại số tuyến tính để biểu diễn dữ liệu, giải tích nhiều biến để học tham số và xác suất để mô tả bất định.

## Mục tiêu và kiến thức tiên quyết

Kiến thức phổ thông (đại số phổ thông, hàm một biến, đạo hàm cơ bản và các phép tính xác suất sơ cấp) là đầu vào để đọc bài này. Tài liệu ôn lại ba học phần tiên quyết chính thức của học phần: Giải tích 1, Xác suất thống kê và Đại số tuyến tính cho kỹ thuật.

## Quy ước ký hiệu

- Vô hướng dùng chữ thường, chẳng hạn $x$ hoặc $y$.
- Véc-tơ dùng chữ thường in đậm, chẳng hạn $\mathbf x$ hoặc $\mathbf w$.
- Ma trận dùng chữ hoa in đậm, chẳng hạn $\mathbf X$.
- Dự đoán của mẫu thứ $i$ là $\hat y_i$.
- Phần dư dùng quy ước $r_i=\hat y_i-y_i$.

## Đại số tuyến tính

Đại số tuyến tính cung cấp các đối tượng và phép toán để đi từ một mẫu dữ liệu tới ma trận thiết kế, phép chiếu và phương trình chuẩn.

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

**Ý nghĩa và vai trò trong AI.** Với ma trận thiết kế $\mathbf X$, $\operatorname{Col}(\mathbf X)$ chứa các véc-tơ dự đoán tuyến tính có thể tạo ra, còn một véc-tơ khác véc-tơ không, thuộc $\operatorname{Ker}(\mathbf X)$, thay đổi trọng số nhưng không thay đổi dự đoán.

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

**Điểm dễ nhầm.** Độc lập tuyến tính không kéo theo trực giao, và trực giao không kéo theo trực chuẩn. Một hệ trực giao không chứa véc-tơ không và có ít hơn $n$ véc-tơ là một cơ sở trực giao của không gian con mà nó sinh ra. Véc-tơ không trực giao với mọi véc-tơ, nhưng không thể thuộc một hệ trực giao dùng để suy ra độc lập tuyến tính.

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

> **Phần mở rộng ngoài phạm vi bộ trang chiếu.**

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

**Ý nghĩa và vai trò trong AI.** Cắt SVD tại vài giá trị kỳ dị lớn nhất tạo xấp xỉ hạng thấp dùng trong nén và khử nhiễu. SVD cũng là nền tảng của PCA và giả nghịch đảo:

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

Ba ví dụ nối các khái niệm trong phần này: hàm vô hướng $h(u,v)=u^2+uv+2v^2+u-2v$, ánh xạ véc-tơ $\mathbf F(u,v)=[u+v,uv,u-v]^T$ và bài toán bình phương tối thiểu của mô hình giá nhà.

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

![Bề mặt của h, parabol lát cắt v bằng 2 và elip tập mức h bằng 0.](img/lec-00/calculus-graph-slice-level-set.svg)

*Hình tự vẽ từ công thức của ví dụ; các khung lần lượt cho toàn bộ bề mặt, một lát cắt và một tập mức.*

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

![Gradient và hướng d tại điểm 1,2 trên đường mức, cùng tuyến tính hóa gần điểm đó.](img/lec-00/calculus-gradient-direction-tangent.svg)

**Điểm dễ nhầm.** $\mathrm dh$ là thay đổi tuyến tính dự đoán, không phải luôn bằng thay đổi hữu hạn $h(\mathbf x+\boldsymbol\Delta)-h(\mathbf x)$.

**Ý nghĩa và vai trò trong AI.** Tuyến tính hóa giúp xấp xỉ ảnh hưởng của nhiễu đầu vào, lan truyền sai số và suy ra các công thức gradient theo ma trận.

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

![Sơ đồ truyền tiếp JVP từ R2 sang R3 và truyền ngược VJP từ R3 về R2 qua Jacobian.](img/lec-00/calculus-jacobian-chain-jvp-vjp.svg)

*Tuyến màu xanh truyền hướng theo chiều thuận; tuyến màu cam có nét và nhãn riêng để biểu diễn truyền độ nhạy theo chiều ngược.*

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

> **Phần mở rộng ngoài phạm vi bộ trang chiếu.**

**Định nghĩa.** Điểm $\mathbf x^*$ là điểm dừng nếu $\nabla h(\mathbf x^*)=\mathbf0$. Nếu $h$ khả vi và đạt cực tiểu hoặc cực đại địa phương tại một điểm nằm trong miền mở thì điểm đó phải là điểm dừng.

**Ý nghĩa hình học.** Tại điểm dừng, mô hình tuyến tính bậc nhất là một mặt phẳng ngang; mọi đạo hàm theo hướng đều bằng $0$.

**Ví dụ.** Giải $2u+v+1=0$ và $u+4v-2=0$ cho $h$ thu được điểm dừng duy nhất $(-6/7,5/7)$.

**Điểm dễ nhầm.** Gradient bằng $0$ chỉ là điều kiện cần, không đủ để kết luận cực tiểu. Chẳng hạn, $s(u,v)=u^2-v^2$ có gradient bằng $0$ tại gốc nhưng gốc là điểm yên ngựa.

**Ý nghĩa và vai trò trong AI.** Điều kiện gradient bằng $0$ tạo hệ phương trình xác định nghiệm tối ưu và giúp định nghĩa trạng thái mà thuật toán huấn luyện không còn hướng giảm bậc nhất.

### Phân loại điểm dừng bằng Hessian

**Định nghĩa.** Tại điểm dừng $\mathbf x^*$ của hàm $C^2$: nếu $\mathbf H_h(\mathbf x^*)\succ\mathbf0$ thì $\mathbf x^*$ là cực tiểu địa phương chặt; nếu $\mathbf H_h(\mathbf x^*)\prec\mathbf0$ thì đó là cực đại địa phương chặt; nếu Hessian bất định dấu thì đó là điểm yên ngựa.

**Ý nghĩa hình học.** Hessian xác định dương tạo một chiếc bát cong lên theo mọi hướng; xác định âm tạo một mái vòm; Hessian bất định dấu cong lên ở một số hướng và cong xuống ở hướng khác.

**Ví dụ.** Hessian của $h$ có hai giá trị riêng $3+\sqrt2$ và $3-\sqrt2$, đều dương, nên điểm dừng $(-6/7,5/7)$ là cực tiểu địa phương chặt.

![Đường mức quanh cực tiểu, hai lát có độ cong khác nhau và hiệu chỉnh Taylor bậc hai từ 7,8 lên 7,82.](img/lec-00/calculus-hessian-curvature-taylor.svg)

**Điểm dễ nhầm.** Hessian nửa xác định dương hoặc nửa xác định âm chưa đủ để phân loại. Ví dụ, $t^4$ có đạo hàm bậc hai bằng $0$ tại gốc nhưng gốc vẫn là cực tiểu.

**Ý nghĩa và vai trò trong AI.** Phép thử Hessian giúp phân biệt cực tiểu với điểm yên ngựa và cho biết các hướng phẳng hoặc có độ cong lớn trong không gian tham số.

### Tích phân một biến và tích phân nhiều biến

**Định nghĩa.** Với $\psi$ khả tích trên $[a,b]$, tích phân $\int_a^b\psi(x)\,\mathrm dx$ cộng tích lũy đại lượng trên đoạn đó. Với miền $D\subset\mathbb R^2$, $\iint_D\psi(x,y)\,\mathrm dA$ cộng giá trị trên toàn miền. Nếu $\psi$ liên tục trên một miền chữ nhật thì tích phân kép có thể viết thành tích phân lặp theo một trong hai thứ tự.

**Ý nghĩa hình học.** Tích phân một biến là diện tích có dấu dưới đường cong; tích phân hai biến là thể tích có dấu dưới một bề mặt.

**Ví dụ.** Tính trực tiếp được

$$
\int_0^1(2x+1)\,\mathrm dx=2,
\qquad
\int_0^1\int_0^2(x+y)\,\mathrm dy\,\mathrm dx=3.
$$

![Diện tích dưới đường 2x cộng 1 và thể tích dưới mặt x cộng y trên một miền chữ nhật.](img/lec-00/calculus-integrals-1d-2d.svg)

*Vùng tô biểu diễn miền được cộng tích lũy; hình bên phải dùng một dải tô có viền riêng để minh họa thứ tự tích phân theo $y$ rồi theo $x$.*

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

**Ý nghĩa và vai trò trong AI.** Quy tắc dây chuyền biến sai số dự đoán thành gradient tham số; ma trận $\mathbf X^T\mathbf X$ cho biết độ cong và mức điều kiện của bài toán học.

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

![Phần dư vuông góc không gian cột và một bước gradient làm mất mát giảm từ 4,5 xuống 2,265.](img/lec-00/calculus-least-squares-projection-step.svg)

*Khung trái nằm trong không gian dữ liệu; khung phải là lát $w_0=14$ của không gian tham số.*

**Điểm dễ nhầm.** Hướng đối gradient chỉ bảo đảm giảm đối với bước đủ nhỏ; một $\eta$ quá lớn có thể làm mất mát tăng hoặc gây dao động. Việc một bước giảm hàm không chứng minh thuật toán đã hội tụ.

**Ý nghĩa và vai trò trong AI.** Hạ gradient và các biến thể của nó là cơ chế cập nhật tham số phổ biến trong học máy; chuẩn hóa đặc trưng và độ cong của mất mát ảnh hưởng mạnh đến lựa chọn kích thước bước.

## Xác suất một biến

### Phép thử, không gian mẫu, biến cố và không gian xác suất

**Định nghĩa.** Phép thử ngẫu nhiên là một quy trình có kết quả chưa biết trước. Không gian mẫu $\Omega$ chứa mọi kết quả có thể; biến cố là một phần tử $E$ của sigma-đại số $\mathcal F$. Không gian xác suất là bộ ba $(\Omega,\mathcal F,\Pr)$, trong đó $\Pr:\mathcal F\to[0,1]$ thỏa $\Pr(\Omega)=1$ và tính cộng đếm được trên các biến cố đôi một rời nhau.

**Trực quan.** $\Omega$ là danh sách những gì có thể xảy ra, $E$ chọn các kết quả ta quan tâm, còn $\Pr$ phân bổ một đơn vị khối lượng xác suất trên toàn bộ không gian mẫu.

**Ví dụ.** Khi gieo một xúc xắc đều, $\Omega=\{1,2,3,4,5,6\}$ và biến cố ra số chẵn là $E=\{2,4,6\}$, nên $\Pr(E)=1/2$. Tính ngẫu nhiên nằm ở việc không thể biết trước mặt nào xuất hiện trong một lần gieo, dù phân phối của phép thử đã biết.

**Điểm dễ nhầm.** Không được tính xác suất bằng tỉ lệ số phần tử nếu các kết quả không đồng khả năng. Biến cố không phải một kết quả đơn lẻ; nó có thể chứa nhiều kết quả.

**Ý nghĩa và ứng dụng trong AI.** Không gian xác suất mô tả nhiễu dữ liệu, nhãn không chắc chắn và quá trình lấy mẫu. Việc xác định $(\Omega,\mathcal F,\Pr)$ làm rõ nguồn bất định trước khi gán xác suất.

### Biến ngẫu nhiên và luật phân phối

**Định nghĩa.** Biến ngẫu nhiên là một hàm đo được $X:\Omega\to\mathbb R$. Luật phân phối của $X$ gán cho mỗi tập đo được $A\subseteq\mathbb R$ xác suất $\Pr(X\in A)$; chữ hoa $X$ chỉ biến ngẫu nhiên, còn chữ thường $x$ chỉ một giá trị quan sát.

**Trực quan.** $X$ là một dụng cụ đo: nó bỏ qua phần chi tiết không cần thiết của kết quả $\omega$ và chỉ giữ lại một con số phục vụ bài toán. Luật phân phối mô tả tần suất tương đối dài hạn của các giá trị đó, không cho biết lần kế tiếp sẽ nhận giá trị nào.

**Ví dụ.** Với xúc xắc, đặt $X=1$ nếu mặt xuất hiện là số chẵn và $X=0$ nếu là số lẻ. Sáu kết quả ban đầu được nén thành hai giá trị, và $X\sim\operatorname{Bernoulli}(1/2)$.

![Không gian mẫu, biến cố và ánh xạ từ kết quả ngẫu nhiên sang giá trị của biến ngẫu nhiên.](img/lec-00/probability-space-random-variable.svg)

*Một kết quả $\omega$ được sinh trong $\Omega$; biến cố gom nhiều kết quả, còn biến ngẫu nhiên biến mỗi kết quả thành một giá trị số.*

**Điểm dễ nhầm.** Tên “biến ngẫu nhiên” không có nghĩa bản thân hàm $X$ thay đổi ngẫu nhiên; sau khi định nghĩa, $X$ là một hàm cố định, còn đối số $\omega$ chưa biết trước. Một giá trị quan sát $x$ cũng không phải toàn bộ phân phối.

**Ý nghĩa và ứng dụng trong AI.** Nhãn, dự đoán, mất mát trên một mẫu và nhiễu quan sát đều có thể được mô hình hóa bằng biến ngẫu nhiên. Luật phân phối cho phép chuyển từ một dự đoán điểm sang dự đoán kèm mức độ bất định.

### Biến rời rạc và hàm khối xác suất

**Định nghĩa.** Với biến rời rạc $X$, hàm khối xác suất (PMF) là

$$
p_X(x)=\Pr(X=x),\qquad p_X(x)\ge0,\qquad \sum_x p_X(x)=1.
$$

Phân phối Bernoulli với tham số $\pi\in[0,1]$ có $p_X(1)=\pi$ và $p_X(0)=1-\pi$.

**Trực quan.** PMF đặt các “cục” xác suất lên những giá trị riêng biệt; chiều cao tại $x$ chính là xác suất quan sát đúng giá trị đó.

**Ví dụ.** Nếu một bộ phân loại phát hiện thư rác có xác suất dương tính $0{,}3$ trên quần thể đang xét và $X$ là chỉ báo dương tính, thì $X\sim\operatorname{Bernoulli}(0{,}3)$. Một email cụ thể vẫn cho nhãn $0$ hoặc $1$; giá trị $0{,}3$ mô tả sự biến thiên giữa các email, không phải một “nhãn phân số”.

**Điểm dễ nhầm.** Tham số $\pi$ là xác suất nhận giá trị $1$, không phải giá trị quan sát của $X$. Tổng PMF được lấy trên toàn bộ miền giá trị có thể, kể cả các giá trị chưa xuất hiện trong mẫu hữu hạn.

**Ý nghĩa và ứng dụng trong AI.** Bernoulli mô hình hóa phân loại nhị phân; phân phối phân loại tổng quát hóa nó cho nhiều lớp. Đầu ra xác suất của bộ phân loại thường là tham số của PMF có điều kiện theo đầu vào.

### Biến liên tục và hàm mật độ xác suất

**Định nghĩa.** Nếu $U$ có phân phối tuyệt đối liên tục thì một hàm mật độ xác suất (PDF) của $U$ là hàm $p_U(u)\ge0$ thỏa

$$
\int_{-\infty}^{\infty}p_U(u)\,du=1,
\qquad
\Pr(U\in A)=\int_A p_U(u)\,du.
$$

**Trực quan.** Xác suất là diện tích dưới đường mật độ, không phải chiều cao của đường tại một điểm. Mật độ cao quanh $u$ cho biết một khoảng nhỏ quanh $u$ tương đối dễ xuất hiện hơn một khoảng cùng độ dài ở nơi có mật độ thấp.

**Ví dụ.** Nếu $U\sim\operatorname{Unif}(0,2)$ thì $p_U(u)=1/2$ trên $[0,2]$. Do đó $\Pr(0{,}5\le U\le1{,}5)=1/2$, nhưng $\Pr(U=1)=0$. Dù mọi điểm riêng lẻ đều có xác suất bằng $0$, một lần lấy mẫu vẫn trả về một giá trị cụ thể trong đoạn.

**Điểm dễ nhầm.** Không phải mọi phân phối có CDF liên tục đều có PDF; điều kiện phù hợp ở đây là tính liên tục tuyệt đối. PDF có thể lớn hơn $1$; chỉ tích phân của nó trên toàn miền mới phải bằng $1$. Giá trị $p_U(u)$ có đơn vị nghịch đảo với đơn vị của $U$, còn xác suất không có đơn vị.

**Ý nghĩa và ứng dụng trong AI.** PDF được dùng để mô hình hóa đặc trưng liên tục, nhiễu, sai số dự đoán và biến ẩn. So sánh mật độ tại dữ liệu quan sát là cơ sở của hàm hợp lý và nhiều phương pháp học tham số.

### Hàm phân phối tích lũy và quan hệ PMF–PDF–CDF

**Định nghĩa.** Hàm phân phối tích lũy (CDF) của mọi biến ngẫu nhiên $X$ là $F_X(t)=\Pr(X\le t)$. Nó không giảm, liên tục phải, có giới hạn $0$ khi $t\to-\infty$ và $1$ khi $t\to\infty$. Với biến rời rạc, độ nhảy tại $x$ bằng $p_X(x)$; với PDF khả tích, $F_X(t)=\int_{-\infty}^t p_X(x)\,dx$ và $F_X'(t)=p_X(t)$ gần khắp nơi. Đặc biệt, đẳng thức đúng tại mọi điểm $t$ mà $p_X$ liên tục.

**Trực quan.** CDF là đồng hồ cộng dồn khối lượng xác suất từ trái sang phải. PMF tạo các bước nhảy; PDF quyết định độ dốc của đường tích lũy.

**Ví dụ.** Với $U\sim\operatorname{Unif}(0,2)$, $F_U(t)=0$ khi $t<0$, bằng $t/2$ khi $0\le t\le2$, và bằng $1$ khi $t>2$. Vì vậy

$$
\Pr(0{,}5<U\le1{,}5)=F_U(1{,}5)-F_U(0{,}5)=0{,}5.
$$

![So sánh hàm khối xác suất, hàm mật độ xác suất và hàm phân phối tích lũy.](img/lec-00/probability-pmf-pdf-cdf.svg)

*PMF đặt khối lượng tại các điểm; PDF phân bố mật độ liên tục; CDF tích lũy xác suất từ trái sang phải.*

**Điểm dễ nhầm.** CDF là xác suất nên luôn nằm trong $[0,1]$, còn PDF thì không bị chặn bởi $1$. Với phân phối có mật độ, $F'=p$ nói chung chỉ đúng gần khắp nơi; muốn dùng đẳng thức tại một điểm cụ thể, một điều kiện đủ là $p$ liên tục tại điểm đó. Công thức đạo hàm không áp dụng tại các điểm nhảy của biến rời rạc.

**Ý nghĩa và ứng dụng trong AI.** CDF cho phép tính phân vị, hiệu chỉnh khoảng dự đoán và lấy mẫu bằng phép biến đổi ngược. Nó cũng cung cấp một cách so sánh toàn bộ phân phối thay vì chỉ so sánh trung bình.

### Kỳ vọng và kỳ vọng của một hàm

**Định nghĩa.** Khi $\mathbb E[|X|]<\infty$, kỳ vọng là trung bình theo xác suất:

$$
\mathbb E[X]=\sum_x x p_X(x)
\quad\text{hoặc}\quad
\mathbb E[X]=\int x p_X(x)\,dx.
$$

Tổng quát hơn, nếu khả tích thì $\mathbb E[g(X)]=\sum_x g(x)p_X(x)$ hoặc $\int g(x)p_X(x)\,dx$; không cần tìm phân phối của $g(X)$ trước.

**Trực quan.** Kỳ vọng là tâm cân bằng khi mỗi giá trị được đặt trọng số bằng xác suất của nó. Với $g(X)$, ta biến đổi từng kết quả rồi mới lấy trung bình có trọng số.

**Ví dụ.** Với $X\sim\operatorname{Bernoulli}(0{,}3)$ và chi phí $g(1)=10$, $g(0)=1$, chi phí kỳ vọng là $0{,}3\cdot10+0{,}7\cdot1=3{,}7$. Quyết định chỉ theo trường hợp thường gặp $X=0$ sẽ bỏ qua tác động lớn của sự kiện ít gặp hơn.

**Điểm dễ nhầm.** Kỳ vọng không nhất thiết là giá trị mà biến có thể nhận: kỳ vọng của xúc xắc đều là $3{,}5$. Nói “mất mát kỳ vọng nhỏ” không có nghĩa mất mát của mọi mẫu đều nhỏ.

**Ý nghĩa và ứng dụng trong AI.** Huấn luyện bằng rủi ro kỳ vọng tối thiểu hóa trung bình mất mát trên phân phối dữ liệu; trung bình mẫu là xấp xỉ thực nghiệm của đại lượng này. Kỳ vọng của hàm còn xuất hiện trong entropy, log-hợp lý và học tăng cường.

### Phương sai, độ lệch chuẩn và biến đổi affine

**Định nghĩa.** Khi $\mathbb E[X^2]<\infty$,

$$
\operatorname{Var}(X)=\mathbb E[(X-\mathbb E[X])^2]
=\mathbb E[X^2]-\mathbb E[X]^2.
$$

Độ lệch chuẩn là $\operatorname{Std}(X)=\sqrt{\operatorname{Var}(X)}$. Với $Y=aX+b$, $\mathbb E[Y]=a\mathbb E[X]+b$ và $\operatorname{Var}(Y)=a^2\operatorname{Var}(X)$.

**Trực quan.** Phương sai đo mức trải rộng bình phương quanh tâm; độ lệch chuẩn đưa mức trải rộng về cùng đơn vị với biến. Phép tịnh tiến đổi vị trí nhưng không đổi độ phân tán, còn phép co giãn nhân độ lệch chuẩn với $|a|$.

**Ví dụ.** Với $U\sim\operatorname{Unif}(0,2)$, $\mathbb E[U]=1$ và $\operatorname{Var}(U)=1/3$. Nếu đổi thang $Y=100U+20$, thì $\mathbb E[Y]=120$ và $\operatorname{Std}(Y)=100/\sqrt3$.

![Kỳ vọng như tâm cân bằng và phương sai như độ phân tán quanh tâm.](img/lec-00/probability-expectation-variance.svg)

*Kỳ vọng định vị tâm, còn phương sai đo độ phân tán; hai đại lượng này chỉ tóm tắt một phần của phân phối.*

**Điểm dễ nhầm.** $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$ chứ không phải $a\operatorname{Var}(X)+b$. Phương sai bằng $0$ nghĩa biến bằng một hằng số gần chắc chắn, không chỉ đơn thuần là “ít nhiễu”.

**Ý nghĩa và ứng dụng trong AI.** Phương sai đo độ bất định của dự đoán, độ biến thiên của gradient ngẫu nhiên và độ ổn định của bộ ước lượng. Chuẩn hóa đặc trưng dùng trung bình và độ lệch chuẩn để đưa các tọa độ về thang so sánh được.

### Nhiễu Gauss, hàm hợp lý và bình phương tối thiểu

**Định nghĩa.** Phân phối Gauss một biến với $\sigma>0$ có mật độ

$$
p(x)=\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right).
$$

Nếu $X\sim\mathcal N(\mu,\sigma^2)$ thì $\mathbb E[X]=\mu$, $\operatorname{Var}(X)=\sigma^2$ và $(X-\mu)/\sigma\sim\mathcal N(0,1)$. Khoảng $[\mu-\sigma,\mu+\sigma]$ chứa xác suất xấp xỉ $0{,}6827$.

Trong mô hình $Y_i=\mathbf w^T\boldsymbol\phi_i+\varepsilon_i$, giả sử các $\varepsilon_i$ độc lập và cùng phân phối $\mathcal N(0,\sigma^2)$ với $\sigma^2$ dương, cố định. Hàm hợp lý là $L(\mathbf w)=\prod_i p(y_i\mid\boldsymbol\phi_i,\mathbf w)$ và

$$
-\log L(\mathbf w)=C+\frac{1}{2\sigma^2}\sum_i r_i(\mathbf w)^2,
\qquad r_i(\mathbf w)=\mathbf w^T\boldsymbol\phi_i-y_i.
$$

**Trực quan.** Nhiễu biểu diễn biến thiên chưa quan sát được quanh giá trị trung tâm của mô hình. Cực đại hàm hợp lý chọn tham số làm dữ liệu đã quan sát ít “bất ngờ” nhất; dưới nhiễu Gauss, sai lệch lớn bị phạt theo bình phương.

**Ví dụ.** Ở căn nhà thứ hai, giả sử giá trung tâm thật là $13$ nhưng quan sát được $12$, nên nhiễu ẩn là $\varepsilon_2=-1$. Nếu dùng đúng trọng số thật thì phần dư theo quy ước trên là $r_2=1=-\varepsilon_2$; với trọng số ước lượng khác, phần dư còn chứa sai số mô hình và không thể đồng nhất với nhiễu.

![Nhiễu Gauss quanh giá trị trung tâm, hàm hợp lý của nhiều quan sát và liên hệ với tổng bình phương phần dư.](img/lec-00/probability-noise-gaussian-likelihood.svg)

*Các quan sát phân tán quanh giá trị trung tâm của mô hình; tích các mật độ có điều kiện tạo hàm hợp lý của tham số.*

**Điểm dễ nhầm.** Gauss là giả thiết mô hình, không phải kết luận suy ra từ bốn mẫu. Cực đại $L$ và cực tiểu tổng bình phương có cùng nghiệm dưới các giả thiết trên, nhưng hai hàm mục tiêu không bằng nhau. Hàm hợp lý là hàm của tham số khi dữ liệu đã cố định; nó không phải phân phối xác suất của tham số.

**Ý nghĩa và ứng dụng trong AI.** Mô hình Gauss giải thích bình phương tối thiểu như một phương pháp ước lượng hợp lý cực đại và cho phép tạo khoảng dự đoán. Việc thay phân phối nhiễu sẽ dẫn đến mất mát khác, chẳng hạn nhiễu đuôi dày làm giảm ảnh hưởng của ngoại lệ.

## Xác suất nhiều biến

### Véc-tơ ngẫu nhiên và phân phối đồng thời

**Định nghĩa.** Véc-tơ ngẫu nhiên $\mathbf Z=(U,V)^T:\Omega\to\mathbb R^2$ gom nhiều biến ngẫu nhiên đo trên cùng một kết quả. Với biến rời rạc, phân phối đồng thời là $p_{U,V}(u,v)=\Pr(U=u,V=v)$, không âm và có tổng trên mọi cặp bằng $1$; trường hợp liên tục dùng mật độ đồng thời và tích phân hai lớp.

**Trực quan.** Một quan sát không tạo hai kết quả tách rời mà tạo một điểm $(u,v)$ trong không gian nhiều chiều. Phân phối đồng thời cho biết khối lượng nằm ở đâu và hai tọa độ có xu hướng xuất hiện cùng nhau như thế nào.

**Ví dụ.** Xét bảng

| $U\backslash V$ | $0$ | $1$ |
|---:|---:|---:|
| $0$ | $0{,}30$ | $0{,}20$ |
| $1$ | $0{,}10$ | $0{,}40$ |

Xác suất quan sát đồng thời $U=1,V=1$ là $0{,}40$. Việc ô này lớn không được suy ra chỉ từ hai xác suất riêng lẻ; nó chứa thông tin ghép cặp của hai biến.

**Điểm dễ nhầm.** Véc-tơ ngẫu nhiên $\mathbf Z$ khác với một giá trị quan sát $\mathbf z$. Biết hai phân phối riêng của $U$ và $V$ chưa đủ xác định phân phối đồng thời.

**Ý nghĩa và ứng dụng trong AI.** Dữ liệu nhiều đặc trưng, chuỗi trạng thái–hành động và cặp đầu vào–nhãn đều là véc-tơ ngẫu nhiên. Phân phối đồng thời là đối tượng mà mô hình sinh và mô hình xác suất cố gắng biểu diễn.

### Phân phối biên, có điều kiện, xác suất toàn phần và Bayes

**Định nghĩa.** Từ phân phối đồng thời rời rạc,

$$
p_U(u)=\sum_v p_{U,V}(u,v),
\qquad
p(V=v\mid U=u)=\frac{p_{U,V}(u,v)}{p_U(u)}
$$

khi $p_U(u)>0$. Quy tắc nhân là $p_{U,V}(u,v)=p(V=v\mid U=u)p_U(u)$. Nếu $\{U=u\}$ tạo một phân hoạch, xác suất toàn phần cho $p_V(v)=\sum_u p(V=v\mid U=u)p_U(u)$; công thức Bayes đảo chiều điều kiện:

$$
p(U=u\mid V=v)=\frac{p(V=v\mid U=u)p_U(u)}{p_V(v)},
$$

với $p_V(v)>0$.

**Trực quan.** Lấy biên cộng bỏ một tọa độ; điều kiện hóa phóng to và chuẩn hóa lại một lát của bảng; Bayes dùng bằng chứng mới để đổi trọng số giữa các khả năng ban đầu.

**Ví dụ.** Từ bảng trên, $p_U(1)=0{,}50$, $p_V(1)=0{,}60$ và $p(V=1\mid U=1)=0{,}40/0{,}50=0{,}80$. Bayes cho $p(U=1\mid V=1)=0{,}80\cdot0{,}50/0{,}60=2/3$. Quan sát $V=1$ đã nâng xác suất của $U=1$ từ $1/2$ lên $2/3$.

![Bảng phân phối đồng thời với thao tác lấy biên, điều kiện hóa và cập nhật Bayes.](img/lec-00/probability-joint-marginal-bayes.svg)

*Cộng theo hàng hoặc cột tạo phân phối biên; chuẩn hóa một lát tạo phân phối có điều kiện.*

**Điểm dễ nhầm.** $p(U\mid V)$ và $p(V\mid U)$ thường khác nhau. Mẫu số trong xác suất có điều kiện phải dương; công thức Bayes không biến $p(U)$ thành xác suất “chủ quan tùy ý” mà cập nhật nó bằng mô hình hợp lý và bằng chứng.

**Ý nghĩa và ứng dụng trong AI.** Phân loại xác suất ước lượng $p(Y\mid X)$; mô hình sinh thường mô tả $p(X\mid Y)p(Y)$. Bayes nối hai cách nhìn, còn lấy biên là phép loại biến ẩn trong suy diễn xác suất.

### Độc lập và độc lập có điều kiện

**Định nghĩa.** $U$ và $V$ độc lập nếu $p_{U,V}(u,v)=p_U(u)p_V(v)$ với mọi cặp trong trường hợp rời rạc. Hai biến độc lập có điều kiện theo $W$ nếu $p(u,v\mid w)=p(u\mid w)p(v\mid w)$ với mọi $w$ có xác suất dương.

**Trực quan.** Độc lập nghĩa là biết một biến không làm thay đổi phân phối của biến kia. Độc lập có điều kiện nghĩa là sự phụ thuộc biến mất sau khi đã biết một biến giải thích chung.

**Ví dụ.** Trong bảng trên, $p(1,1)=0{,}40\ne0{,}50\cdot0{,}60$, nên $U,V$ phụ thuộc. Một ví dụ không tầm thường: hai kết quả xét nghiệm có thể phụ thuộc trong toàn dân vì cùng bị chi phối bởi trạng thái bệnh $W$, nhưng gần độc lập khi đã điều kiện trên $W$ nếu sai số của hai máy đo riêng biệt.

**Điểm dễ nhầm.** Không tương quan không suy ra độc lập nói chung; nếu $U\sim\operatorname{Unif}[-1,1]$ và $V=U^2$ thì $\operatorname{Cov}(U,V)=0$ dù $V$ hoàn toàn do $U$ quyết định. Độc lập có điều kiện cũng không kéo theo độc lập không điều kiện.

**Ý nghĩa và ứng dụng trong AI.** Các giả thiết độc lập giúp phân rã phân phối lớn thành các thừa số nhỏ, làm suy diễn và học tham số khả thi. Naive Bayes, mô hình đồ thị xác suất và mô hình chuỗi đều dựa vào các dạng độc lập có điều kiện cụ thể.

### Kỳ vọng véc-tơ, hiệp phương sai, tương quan và biến đổi affine

**Định nghĩa.** Nếu các mômen tồn tại,

$$
\boldsymbol\mu=\mathbb E[\mathbf Z],
\qquad
\boldsymbol\Sigma_Z
=\mathbb E[(\mathbf Z-\boldsymbol\mu)(\mathbf Z-\boldsymbol\mu)^T].
$$

Phần tử đường chéo là phương sai; phần tử ngoài đường chéo là hiệp phương sai. Tương quan $\rho_{ij}=\Sigma_{ij}/\sqrt{\Sigma_{ii}\Sigma_{jj}}$ được xác định khi hai phương sai dương. Với $\mathbf Y=\mathbf A\mathbf Z+\mathbf b$,

$$
\mathbb E[\mathbf Y]=\mathbf A\boldsymbol\mu+\mathbf b,
\qquad
\operatorname{Cov}(\mathbf Y)=\mathbf A\boldsymbol\Sigma_Z\mathbf A^T.
$$

**Trực quan.** Trung bình xác định tâm của đám mây điểm; hiệp phương sai mô tả mức trải rộng và xu hướng hai tọa độ cùng tăng hoặc biến đổi ngược chiều. Ma trận hiệp phương sai luôn đối xứng và nửa xác định dương vì $\mathbf a^T\boldsymbol\Sigma_Z\mathbf a=\operatorname{Var}(\mathbf a^T\mathbf Z)\ge0$.

**Ví dụ.** Với bảng đã cho,

$$
\boldsymbol\mu=\begin{bmatrix}0{,}50\\0{,}60\end{bmatrix},
\qquad
\boldsymbol\Sigma_Z=
\begin{bmatrix}0{,}25&0{,}10\\0{,}10&0{,}24\end{bmatrix},
\qquad
\rho_{UV}\approx0{,}408.
$$

Giá trị dương cho biết $U=1$ và $V=1$ có xu hướng xuất hiện cùng nhau nhiều hơn mức do hai phân phối biên riêng lẻ dự đoán.

**Điểm dễ nhầm.** Hiệp phương sai phụ thuộc đơn vị đo, còn tương quan không có đơn vị nhưng chỉ mô tả liên hệ tuyến tính. Tương quan không chứng minh quan hệ nhân quả.

**Ý nghĩa và ứng dụng trong AI.** Ma trận hiệp phương sai mô tả nhiễu giữa nhiều đầu ra, là đầu vào của phân tích thành phần chính, làm trắng dữ liệu và Gauss nhiều biến. Công thức affine cho phép truyền bất định qua một lớp tuyến tính.

### Gauss nhiều biến

**Định nghĩa.** Với $\boldsymbol\mu\in\mathbb R^d$ và $\boldsymbol\Sigma\in\mathbb S_{++}^d$, phân phối Gauss nhiều biến có mật độ

$$
p(\mathbf z)=\frac{1}{(2\pi)^{d/2}\det(\boldsymbol\Sigma)^{1/2}}
\exp\left[-\frac12(\mathbf z-\boldsymbol\mu)^T
\boldsymbol\Sigma^{-1}(\mathbf z-\boldsymbol\mu)\right].
$$

**Trực quan.** Các điểm có cùng mật độ nằm trên những elip hoặc ellipsoid. Hướng và độ dài các trục phản ánh những hướng biến thiên do ma trận hiệp phương sai mô tả.

**Ví dụ.** Với

$$
\mathbf G\sim\mathcal N\left(\mathbf0,
\begin{bmatrix}1&0{,}8\\0{,}8&1\end{bmatrix}\right),
$$

đám mây kéo dài theo hướng hai tọa độ cùng tăng. Hai điểm có cùng khoảng cách Euclid tới gốc có thể có mật độ rất khác nếu một điểm nằm dọc hướng biến thiên lớn còn điểm kia nằm ngang hướng biến thiên nhỏ.

![Ba đường đồng mật độ hình elip của phân phối Gauss hai biến có tương quan dương.](img/lec-00/probability-gaussian-ellipse.svg)

**Điểm dễ nhầm.** Đường đồng mật độ không phải đường chứa một lượng xác suất cố định; xác suất thuộc về một miền có diện tích hoặc thể tích. Công thức mật độ thông thường cần $\boldsymbol\Sigma$ xác định dương; ma trận suy biến tạo phân phối nằm trên một không gian con và cần xử lý riêng.

**Ý nghĩa và ứng dụng trong AI.** Gauss nhiều biến được dùng cho mô hình nhiễu, phân tích biệt thức, phát hiện bất thường và mô hình biến ẩn.

#### Khoảng cách Mahalanobis và làm trắng

> **Phần mở rộng ngoài phạm vi bộ trang chiếu.**

Khoảng cách Mahalanobis bình phương là $d_M^2=(\mathbf z-\boldsymbol\mu)^T\boldsymbol\Sigma^{-1}(\mathbf z-\boldsymbol\mu)$. Một phép làm trắng véc-tơ ngẫu nhiên có dạng $\widetilde{\mathbf Z}=\boldsymbol\Sigma^{-1/2}(\mathbf Z-\boldsymbol\mu)$, khi đó $\operatorname{Cov}(\widetilde{\mathbf Z})=\mathbf I$.

![Elip hiệp phương sai, các hướng riêng và tác dụng của phép làm trắng.](img/lec-00/probability-covariance-gaussian.svg)

*Mahalanobis chuẩn hóa khoảng cách theo hiệp phương sai; làm trắng đưa các hướng về phương sai bằng một.*

**Điểm dễ nhầm.** Làm trắng loại tương quan bậc hai nhưng không làm các tọa độ độc lập nói chung; kết luận độc lập đúng trong những trường hợp đặc biệt như Gauss nhiều biến.

**Ý nghĩa và ứng dụng trong AI.** Khoảng cách Mahalanobis tránh coi mọi hướng đặc trưng là có cùng độ tin cậy; làm trắng chuẩn hóa cấu trúc hiệp phương sai trước một số thuật toán học máy.

### Nhiễu tương quan và bình phương tối thiểu tổng quát

**Định nghĩa.** Với mô hình véc-tơ $\mathbf y=\mathbf X\mathbf w+\boldsymbol\varepsilon$ và $\boldsymbol\varepsilon\sim\mathcal N(\mathbf0,\boldsymbol\Sigma_\varepsilon)$, giả sử $\boldsymbol\Sigma_\varepsilon\in\mathbb S_{++}^m$ đã biết và cố định. Ước lượng hợp lý cực đại tương ứng với bình phương tối thiểu tổng quát (GLS):

$$
\min_{\mathbf w}\frac12\mathbf r^T
\boldsymbol\Sigma_\varepsilon^{-1}\mathbf r,
\qquad
\mathbf r=\mathbf X\mathbf w-\mathbf y.
$$

**Trực quan.** GLS không phạt mọi hướng phần dư như nhau. Một sai lệch dọc hướng nhiễu vốn biến thiên mạnh ít bất ngờ hơn sai lệch cùng chuẩn Euclid dọc hướng ổn định; làm trắng phần dư biến bài toán GLS thành bình phương tối thiểu thông thường trong tọa độ mới.

**Ví dụ.** Với

$$
\boldsymbol\Sigma_2=
\begin{bmatrix}1&0{,}5\\0{,}5&1\end{bmatrix},
$$

hai phần dư $\mathbf r_+=(1,1)^T$ và $\mathbf r_-=(1,-1)^T$ có cùng chuẩn Euclid. Tuy nhiên, mục tiêu $J_2=\tfrac12\mathbf r^T\boldsymbol\Sigma_2^{-1}\mathbf r$ lần lượt bằng $2/3$ và $2$: sai lệch ngược chiều hiếm hơn dưới nhiễu tương quan dương nên bị phạt mạnh hơn.

![So sánh cách bình phương tối thiểu thông thường và bình phương tối thiểu tổng quát cân các hướng phần dư.](img/lec-00/probability-gls-weighting.svg)

*OLS dùng đường tròn mức; GLS dùng elip mức thích nghi với hiệp phương sai của nhiễu.*

**Điểm dễ nhầm.** Không thể ước lượng đáng tin cậy một ma trận hiệp phương sai lớn chỉ từ vài phần dư rồi coi nó là đã biết. Khi $\boldsymbol\Sigma_\varepsilon=\sigma^2\mathbf I$, GLS và bình phương tối thiểu thông thường có cùng nghiệm vì hai mục tiêu chỉ khác một hệ số dương.

**Ý nghĩa và ứng dụng trong AI.** GLS phù hợp với dữ liệu chuỗi thời gian, cảm biến hoặc nhiều đầu ra có sai số tương quan. Hàm mất mát khi đó cân sai lệch theo cấu trúc nhiễu thay vì mặc định mọi sai lệch độc lập và có cùng độ tin cậy.

## Ghép các công cụ vào mô hình giá nhà

Chín bước dưới đây dùng cùng một bộ dữ liệu, trong đó đầu ra của bước trước trở thành đầu vào của bước sau. Giá được đo theo đơn vị $100$ triệu đồng; dữ liệu là ví dụ tổng hợp phục vụ tính toán, không phải số liệu thị trường.

### Bước 1 — Xác định dữ liệu quan sát

**Đầu vào.** Bốn căn nhà với diện tích, số phòng ngủ và giá quan sát:

| Căn | Diện tích $a_i$ | Phòng ngủ $b_i$ | Giá $y_i$ |
|---:|---:|---:|---:|
| 1 | $40\,\mathrm{m}^2$ | $1$ | $11$ |
| 2 | $50\,\mathrm{m}^2$ | $2$ | $12$ |
| 3 | $60\,\mathrm{m}^2$ | $2$ | $14$ |
| 4 | $70\,\mathrm{m}^2$ | $3$ | $19$ |

**Thao tác.** Chọn giá làm biến đích và diện tích, số phòng làm đặc trưng ban đầu. Giữ nguyên từng hàng như một mẫu quan sát duy nhất.

Bốn bộ ba $(a_i,b_i,y_i)$ dùng cùng quy ước đơn vị.

**Công cụ tái sử dụng.** Khái niệm vô hướng, véc-tơ dữ liệu và biến ngẫu nhiên giúp phân biệt giá trị đã quan sát $y_i$ với giá ngẫu nhiên $Y_i$ trước khi quan sát.

**Diễn giải và giới hạn.** Bảng chỉ cho biết quan hệ quan sát được trên bốn căn. Nó chưa xác định quan hệ nhân quả và quá nhỏ để đại diện cho thị trường nhà ở.

### Bước 2 — Tạo đặc trưng và chọn dạng mô hình

**Đầu vào.** Các giá trị thô $a_i,b_i$ của bước 1.

**Thao tác.** Dịch tâm và đổi thang đặc trưng:

$$
a_i'=\frac{a_i-55}{10},
\qquad
b_i'=b_i-2,
\qquad
\boldsymbol\phi_i=\begin{bmatrix}1\\a_i'\\b_i'\end{bmatrix}.
$$

Chọn mô hình tuyến tính theo trọng số

$$
\hat y_i=\mathbf w^T\boldsymbol\phi_i
=w_0+w_1a_i'+w_2b_i'.
$$

Bốn cặp đặc trưng biến đổi là $(-1{,}5,-1)$, $(-0{,}5,0)$, $(0{,}5,0)$ và $(1{,}5,1)$; véc-tơ trọng số có kích thước $\mathbf w\in\mathbb R^3$.

**Công cụ tái sử dụng.** Véc-tơ cột, chuyển vị và tích vô hướng biến một mẫu thành một dự đoán vô hướng.

**Diễn giải và giới hạn.** $w_0$ là giá nền tại $55\,\mathrm{m}^2$ và $2$ phòng; $w_1$ là mức đổi giá mỗi $10\,\mathrm{m}^2$ khi giữ số phòng cố định; $w_2$ là mức đổi giá mỗi phòng khi giữ diện tích cố định. Đây là diễn giải của mô hình, không tự động là hiệu ứng nhân quả.

### Bước 3 — Ghép các mẫu thành ma trận thiết kế

**Đầu vào.** Bốn véc-tơ đặc trưng $\boldsymbol\phi_i$ và bốn giá $y_i$.

**Thao tác.** Xếp mỗi $\boldsymbol\phi_i^T$ thành một hàng của ma trận thiết kế và ghép các giá thành véc-tơ:

$$
\mathbf X=
\begin{bmatrix}
1&-1{,}5&-1\\
1&-0{,}5&0\\
1&0{,}5&0\\
1&1{,}5&1
\end{bmatrix}
\in\mathbb R^{4\times3},
\qquad
\mathbf y=
\begin{bmatrix}11\\12\\14\\19\end{bmatrix}
\in\mathbb R^4.
$$

Toàn bộ mô hình trên bốn mẫu được viết gọn thành $\hat{\mathbf y}=\mathbf X\mathbf w$ và $\mathbf r=\hat{\mathbf y}-\mathbf y$.

**Công cụ tái sử dụng.** Tích ma trận–véc-tơ xử lý đồng thời một lô mẫu; kiểm tra kích thước xác nhận $(4\times3)(3\times1)=(4\times1)$.

**Diễn giải và giới hạn.** Mỗi hàng tương ứng một căn nhà, còn mỗi cột tương ứng một đặc trưng. Đổi thứ tự hàng không đổi bài toán nếu $\mathbf X$ và $\mathbf y$ được đổi cùng nhau; đổi thứ tự cột mà không đổi $\mathbf w$ sẽ làm thay đổi mô hình.

![Quy trình từ dữ liệu thô qua đặc trưng và ma trận thiết kế đến dự đoán, phần dư và bất định.](img/lec-00/housing-model-pipeline.svg)

*Mỗi mũi tên chỉ một đầu ra được tái sử dụng ở bước kế tiếp; ba nhánh đại số, giải tích và xác suất gặp nhau trong cùng một quy trình.*

### Bước 4 — Đánh giá trọng số ban đầu và nhận ra hệ không tương thích

**Đầu vào.** $\mathbf X$, $\mathbf y$ và bộ trọng số thử $\mathbf w^{(0)}=(14,1,1)^T$.

**Thao tác.** Tính dự đoán, phần dư và mất mát:

$$
\hat{\mathbf y}^{(0)}=\mathbf X\mathbf w^{(0)}
=\begin{bmatrix}11{,}5\\13{,}5\\14{,}5\\16{,}5\end{bmatrix},
\qquad
\mathbf r^{(0)}=
\begin{bmatrix}0{,}5\\1{,}5\\0{,}5\\-2{,}5\end{bmatrix},
$$

$$
f(\mathbf w^{(0)})
=\frac12\lVert\mathbf r^{(0)}\rVert_2^2
=4{,}5.
$$

Kiểm tra khả năng khớp chính xác: căn 2–3 cho $w_1=2$, căn 1–2 cho $w_1+w_2=1$, còn căn 3–4 cho $w_1+w_2=5$. Ba điều kiện mâu thuẫn, nên $\mathbf X\mathbf w=\mathbf y$ vô nghiệm.

Hệ không tương thích dẫn đến bài toán xấp xỉ với một thước đo sai số có thể tối ưu.

**Công cụ tái sử dụng.** Phần dư, chuẩn $\ell_2$, hạng và tính tương thích của hệ tuyến tính.

**Diễn giải và giới hạn.** Phần dư có thể đến từ trọng số chưa phù hợp, đặc trưng bị bỏ sót, sai số đo hoặc biến thiên ngẫu nhiên. Bình phương phần dư ngăn sai số trái dấu triệt tiêu nhau, nhưng làm các ngoại lệ có ảnh hưởng lớn.

### Bước 5 — Chọn mô hình nhiễu và hàm mục tiêu

**Đầu vào.** Mô hình trung bình $\mathbf X\mathbf w$, phần dư và giả thiết về cấu trúc nhiễu.

**Thao tác.** Chọn một trong hai nhánh:

- Nếu $\boldsymbol\varepsilon\sim\mathcal N(\mathbf0,\sigma^2\mathbf I)$, các nhiễu độc lập và cùng phương sai, dùng bình phương tối thiểu thông thường (OLS): $\tfrac12\mathbf r^T\mathbf r$.
- Nếu $\boldsymbol\varepsilon\sim\mathcal N(\mathbf0,\boldsymbol\Sigma_\varepsilon)$ với $\boldsymbol\Sigma_\varepsilon\in\mathbb S_{++}^4$ đã biết và cố định, dùng bình phương tối thiểu tổng quát (GLS): $\tfrac12\mathbf r^T\boldsymbol\Sigma_\varepsilon^{-1}\mathbf r$.

Với giả thiết nhiễu độc lập và cùng phương sai, chọn OLS:

$$
\min_{\mathbf w}f(\mathbf w)
=\min_{\mathbf w}\frac12\lVert\mathbf X\mathbf w-\mathbf y\rVert_2^2.
$$

**Công cụ tái sử dụng.** Mô hình Gauss, hàm hợp lý, ma trận hiệp phương sai và khoảng cách Mahalanobis giải thích vì sao hai giả thiết nhiễu dẫn đến hai dạng mất mát.

![OLS cân mọi hướng phần dư như nhau, còn GLS cân theo hiệp phương sai của nhiễu.](img/lec-00/probability-gls-weighting.svg)

*GLS chỉ nên dùng khi cấu trúc hiệp phương sai có cơ sở; trong trường hợp $\boldsymbol\Sigma_\varepsilon=\sigma^2\mathbf I$, hai phương pháp cho cùng nghiệm.*

**Diễn giải và giới hạn.** Việc chọn OLS ở đây là giả thiết minh họa, không phải kết luận thống kê từ bốn quan sát. Không thể ước lượng đáng tin cậy một ma trận hiệp phương sai lớn từ vài phần dư rồi coi nó là đã biết.

### Bước 6 — Tìm trọng số làm mất mát nhỏ nhất

**Đầu vào.** Hàm OLS $f(\mathbf w)=\tfrac12\lVert\mathbf X\mathbf w-\mathbf y\rVert_2^2$.

**Thao tác.** Tính các đại lượng của phương trình chuẩn:

$$
\mathbf X^T\mathbf X=
\begin{bmatrix}
4&0&0\\
0&5&3\\
0&3&2
\end{bmatrix},
\qquad
\mathbf X^T\mathbf y=
\begin{bmatrix}56\\13\\8\end{bmatrix}.
$$

Vì $\operatorname{rank}(\mathbf X)=3$, nghiệm OLS là duy nhất và thỏa

$$
\mathbf X^T\mathbf X\mathbf w=\mathbf X^T\mathbf y,
\qquad
\mathbf w_{\mathrm{LS}}=(14,2,1)^T.
$$

Một cách lặp để tiến về nghiệm là hạ gradient. Tại $\mathbf w^{(0)}$, $\nabla f=(0,-5,-3)^T$; với $\eta=0{,}1$,

$$
\mathbf w^+=\mathbf w^{(0)}-\eta\nabla f
=(14,1{,}5,1{,}3)^T,
\qquad
f(\mathbf w^+)=2{,}265<4{,}5.
$$

Kết quả gồm trọng số tối ưu $\mathbf w_{\mathrm{LS}}$ và một bước gradient minh họa cơ chế cập nhật; bước này chưa phải nghiệm tối ưu.

**Công cụ tái sử dụng.** Chuyển vị, tích ma trận, hạng, gradient, Hessian $\nabla^2f=\mathbf X^T\mathbf X$ và điều kiện dừng bậc nhất.

![Hình chiếu bình phương tối thiểu và một bước gradient làm giảm mất mát.](img/lec-00/calculus-least-squares-projection-step.svg)

*Trong không gian dữ liệu, OLS chiếu $\mathbf y$ lên $\operatorname{Col}(\mathbf X)$; trong không gian tham số, đối gradient chỉ hướng giảm cục bộ.*

**Diễn giải và giới hạn.** Hạng cột đầy đủ làm trọng số tối ưu duy nhất. Trong bài toán lớn thường giải hệ hoặc dùng thuật toán lặp thay vì tạo $(\mathbf X^T\mathbf X)^{-1}$ tường minh; kích thước bước quá lớn có thể làm mất mát tăng.

### Bước 7 — Kiểm tra mô hình sau khi khớp

**Đầu vào.** $\mathbf w_{\mathrm{LS}}=(14,2,1)^T$, $\mathbf X$ và $\mathbf y$.

**Thao tác.** Tính lại dự đoán và phần dư:

$$
\hat{\mathbf y}_{\mathrm{LS}}
=\begin{bmatrix}10\\13\\15\\18\end{bmatrix},
\qquad
\mathbf r_{\mathrm{LS}}
=\begin{bmatrix}-1\\1\\1\\-1\end{bmatrix}.
$$

Khi đó $\operatorname{SSE}=\lVert\mathbf r_{\mathrm{LS}}\rVert_2^2=4$, $f(\mathbf w_{\mathrm{LS}})=2$ và $\mathbf X^T\mathbf r_{\mathrm{LS}}=\mathbf0$.

Bảng dự đoán sau khớp cho biết phần dư còn lại và cho phép kiểm tra điều kiện tối ưu.

**Công cụ tái sử dụng.** Phần dư, chuẩn, tích vô hướng và trực giao giữa phần dư với không gian cột.

![So sánh phần dư của trọng số ban đầu và phần dư sau khi khớp OLS trên bốn căn nhà.](img/lec-00/housing-residuals-before-after.svg)

*Mất mát giảm từ $4{,}5$ xuống $2$, nhưng bốn phần dư sau khớp vẫn khác không vì hệ dữ liệu không tương thích.*

**Diễn giải và giới hạn.** Gradient bằng $0$ không có nghĩa từng phần dư bằng $0$. Phần dư sau khớp là đại lượng tính từ mô hình và dữ liệu; nó không đồng nhất với nhiễu ẩn, và sai số huấn luyện nhỏ chưa đo được khả năng dự đoán ngoài mẫu.

### Bước 8 — Dự đoán cho căn nhà mới kèm bất định

**Đầu vào.** Căn nhà mới có diện tích $65\,\mathrm{m}^2$, $2$ phòng; $\mathbf w_{\mathrm{LS}}$ và giả thiết minh họa $\varepsilon\sim\mathcal N(0,1)$.

**Thao tác.** Biến đổi đặc trưng thành $a'=1$, $b'=0$, nên $\boldsymbol\phi_{\mathrm{new}}=(1,1,0)^T$. Dự đoán điểm là

$$
\hat y_{\mathrm{new}}
=\mathbf w_{\mathrm{LS}}^T\boldsymbol\phi_{\mathrm{new}}
=16.
$$

Giá trị này tương ứng $1{,}6$ tỷ đồng.

Với quy tắc Gauss $\Pr(|G|\le1{,}96)\approx0{,}95$, dải nhiễu có điều kiện là

$$
16\pm1{,}96
=[14{,}04;17{,}96],
$$

tức $[1{,}404;1{,}796]$ tỷ đồng.

Kết quả là một dự đoán điểm và dải 95% cho biến thiên nhiễu quan sát dưới giả thiết Gauss đã nêu.

**Công cụ tái sử dụng.** Tích vô hướng, biến đổi đặc trưng, phân phối Gauss, CDF và phân vị.

![Dự đoán giá căn nhà mới với đường trung tâm và dải nhiễu Gauss 95 phần trăm.](img/lec-00/housing-prediction-uncertainty.svg)

*Dải được đặt quanh dự đoán $1{,}6$ tỷ đồng và chỉ biểu diễn thành phần nhiễu đã giả định.*

**Diễn giải và giới hạn.** $\sigma=1$ được cho để minh họa, không được ước lượng từ bốn mẫu. Dải trên điều kiện theo đặc trưng và coi trọng số là cố định; nó chưa gồm bất định trọng số, sai đặc tả, dịch chuyển phân phối hoặc sai số đo đặc trưng.

### Bước 9 — So sánh mô hình và nhận diện nguy cơ quá khớp

**Đầu vào.** Mô hình ba trọng số với $\boldsymbol\phi=[1,a',b']^T$ và mô hình mở rộng với $\widetilde{\boldsymbol\phi}=[1,a',b',(a')^2]^T$.

**Thao tác.** Khớp hai mô hình trên cùng bốn mẫu. Mô hình thứ nhất có

$$
\mathbf w_{\mathrm{LS}}=(14,2,1)^T,
\qquad \operatorname{SSE}=4,
\qquad \hat y_{\mathrm{new}}=16.
$$

Mô hình mở rộng có

$$
\widetilde{\mathbf w}=(12{,}75,2,1,1)^T,
\qquad \operatorname{SSE}=0,
\qquad \widetilde{\hat y}_{\mathrm{new}}=15{,}75.
$$

Hai mô hình có độ khớp huấn luyện và dự đoán ngoài bốn điểm khác nhau.

**Công cụ tái sử dụng.** Đặc trưng phi tuyến, hạng, bình phương tối thiểu, phần dư và phân biệt rủi ro thực nghiệm với rủi ro trên phân phối dữ liệu.

![So sánh mô hình ba trọng số với mô hình mở rộng nội suy đúng bốn mẫu.](img/lec-00/housing-model-comparison.svg)

*Mô hình mở rộng đạt SSE bằng $0$ trên dữ liệu huấn luyện nhưng thay đổi dự đoán tại căn nhà mới.*

**Diễn giải và giới hạn.** Lỗi huấn luyện thấp hơn không chứng minh dự đoán ngoài mẫu tốt hơn. Với chỉ bốn quan sát, chưa thể chọn mô hình bằng đánh giá ngoài mẫu đáng tin cậy; ví dụ chỉ minh họa rằng tăng độ linh hoạt làm tăng nguy cơ học cả biến thiên riêng của dữ liệu.

## Tài liệu tham khảo

- Goodfellow, Ian; Bengio, Yoshua; Courville, Aaron (2016), *Deep Learning*, Chương 2, Mục 2.1–2.9 và 2.11; Chương 3, Mục 3.1–3.9; Chương 4, Mục 4.3–4.5; Chương 5, Mục 5.5; Chương 6, Mục 6.5.
- Koller, Daphne; Friedman, Nir (2009), *Probabilistic Graphical Models: Principles and Techniques*, Chương 2, phần biểu diễn phân phối xác suất, điều kiện hóa, công thức Bayes và độc lập.
- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Phụ lục A.4–A.5, phần vi phân, đạo hàm bậc hai và bình phương tối thiểu.
- Stewart, James (2016), *Calculus*, ấn bản thứ 8, Mục 5.2–5.3, 14.1–14.7 và 15.1–15.2, phần tích phân một biến, hàm nhiều biến, đạo hàm và tích phân nhiều biến.
- Strang, Gilbert (2016), *Introduction to Linear Algebra*, ấn bản thứ 5, Mục 2.6 và 4.4, phần phân rã LU, hệ trực chuẩn, Gram–Schmidt và phân rã QR.
- Roe, David (2013), *Linear Methods (Math 211) — Lecture 2*, tr. 5–8, phần tính tương thích, hạng của ma trận mở rộng và số tham số của tập nghiệm: <https://math.mit.edu/~roed/courses/211/lectures/Sep-11.pdf>.
- Mattuck, Arthur, *D. Determinants*, trong *18.02 Supplementary Notes and Problems*, MIT OpenCourseWare 18.02 (học phần do Denis Auroux giảng dạy, Fall 2007), tr. 2–5, phần khai triển Laplace và diễn giải diện tích, thể tích: <https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/60d63f4aa52f7cc54ba6b12a0c7c6080_determinants.pdf>.
