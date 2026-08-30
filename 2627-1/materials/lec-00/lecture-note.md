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

- Goodfellow, Ian; Bengio, Yoshua; Courville, Aaron (2016), *Deep Learning*, Chương 2, Mục 2.1–2.7 và 2.11.
- Roe, David (2013), *Linear Methods (Math 211) — Lecture 2*, tr. 5–8, phần tính tương thích, hạng của ma trận mở rộng và số tham số của tập nghiệm: <https://math.mit.edu/~roed/courses/211/lectures/Sep-11.pdf>.
- Mattuck, Arthur, *D. Determinants*, trong *18.02 Supplementary Notes and Problems*, MIT OpenCourseWare 18.02 (học phần do Denis Auroux giảng dạy, Fall 2007), tr. 2–5, phần khai triển Laplace và diễn giải diện tích, thể tích: <https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/60d63f4aa52f7cc54ba6b12a0c7c6080_determinants.pdf>.
