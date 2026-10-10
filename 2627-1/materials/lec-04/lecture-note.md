# Bài 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

## Mục tiêu học tập

Các mục tiêu sau là minh chứng bộ phận của năm chuẩn đầu ra bài học (LLO) của buổi 4:

- LLO6, LLO7, LLO9 đóng góp chuẩn đầu ra học phần CLO1: hiểu và vận dụng giảm gradient, hướng dốc nhất, Newton, hàm tự điều chỉnh và Newton cho ràng buộc đẳng thức;
- LLO8, LLO10 đóng góp CLO2: thực hiện từng bước một thuật toán không ràng buộc và một thuật toán có ràng buộc đẳng thức.

Sau chương này, người học có thể:

1. Viết hệ điều kiện Karush–Kuhn–Tucker (KKT) rút gọn cho bài toán không ràng buộc và bài toán chỉ có ràng buộc đẳng thức, nêu vì sao hệ đó vừa cần vừa đủ (LLO6, LLO9; CLO1).
2. Lập bài toán con bậc hai tại điểm lặp, viết điều kiện tối ưu của bài con và suy ra hướng gradient, hướng giảm dốc nhất theo chuẩn có trọng số và hướng Newton (LLO6; CLO1).
3. Thực hiện bằng số một lượt giảm gradient và một lượt Newton: tính hướng, chạy quay lui Armijo, kiểm tiêu chí dừng, phân biệt mức giảm của mô hình, mức giảm thật và sai số mục tiêu (LLO8; CLO2).
4. Phát biểu và chứng minh các cận hội tụ của giảm gradient, nêu tốc độ hội tụ của Newton cùng giả thiết của từng kết quả (LLO8; CLO2).
5. Kiểm tra tính tự điều chỉnh của một hàm và dùng cận sai số theo độ giảm Newton đúng với giả thiết của nó (LLO7; CLO1).
6. Lập và giải hệ Newton khả thi bằng hệ khối và bằng khử biến, lập và giải hệ Newton cho phần dư KKT từ điểm chưa khả thi, cập nhật điểm và nhân tử (LLO9, LLO10; CLO1, CLO2).
7. Vận dụng các phương pháp vào hồi quy logistic có chính quy hóa, ước lượng trọng số trộn có tổng bằng 1 và một mạng tuyến tính hai lớp, nêu giả thiết nào được bảo đảm và giả thiết nào bị vi phạm (LLO6–LLO10; CLO1, CLO2).

## Kiến thức tiên quyết

Chương dùng các kết quả sau. Số hiệu `01.k` chỉ ghi chú Bài 01, số hiệu `03.k` chỉ ghi chú Bài 03; Bài 00 không đánh số nên các kết quả của nó được phát biểu lại đầy đủ.

- **Gradient, Hessian và khai triển Taylor** (Bài 00). Với $f:\mathbb R^n\to\mathbb R$ khả vi hai lần liên tục trên một tập mở chứa đoạn $[x,x+d]$, ta có $f(x+d)=f(x)+\nabla f(x)^Td+\tfrac12d^T\nabla^2f(x)d+o(\lVert d\rVert_2^2)$ khi $d\to0$. Gradient thỏa $\nabla f(x+d)-\nabla f(x)=\int_0^1\nabla^2f(x+\tau d)\,d\,d\tau$. Quy tắc dây chuyền cho $\frac{d}{dt}f(x+td)=\nabla f(x+td)^Td$.
- **Điều kiện cần bậc nhất** (Bài 00, nhắc lại ở Nhận xét 01.15). Nếu $f$ khả vi tại một điểm trong $x^*$ của miền và $x^*$ là cực tiểu địa phương thì $\nabla f(x^*)=0$.
- **Tập lồi, hàm lồi, tập mức dưới** (Định nghĩa 01.18, 01.22, 01.24). Hàm $f$ lồi chặt (còn gọi là lồi nghiêm ngặt) nếu bất đẳng thức lồi là chặt với mọi $x\ne y$ và $\theta\in(0,1)$. Tập mức dưới của $f$ ứng với mức $c$ là $\{x\mid f(x)\le c\}$.
- **Điều kiện bậc nhất và bậc hai** (Định lý 01.26, Hệ quả 01.27, Định lý 01.30). Hàm khả vi $f$ trên tập mở lồi là lồi khi và chỉ khi $f(y)\ge f(x)+\nabla f(x)^T(y-x)$ với mọi $x,y$. Nếu $f$ lồi, khả vi trên tập mở lồi $D$ và $\nabla f(x^*)=0$ thì $x^*$ là cực tiểu toàn cục trên $D$. Hàm khả vi hai lần trên tập mở lồi là lồi khi và chỉ khi Hessian nửa xác định dương mọi nơi, và lồi chặt nếu Hessian xác định dương mọi nơi.
- **Hạn chế lên đường thẳng** (Bổ đề 01.28). Tính lồi của $f$ tương đương tính lồi của mọi hàm một biến $t\mapsto f(x+tv)$ trên khoảng các $t$ mà $x+tv$ thuộc miền.
- **Phép bảo toàn tính lồi** (Định lý 01.31). Tổng có hệ số không âm của các hàm lồi là lồi; hợp với ánh xạ affine là lồi.
- **Cực tiểu, tính duy nhất và sự tồn tại** (Định lý 01.33, 01.35, 01.36). Cực tiểu địa phương của hàm lồi trên tập lồi là cực tiểu toàn cục; hàm lồi chặt có nhiều nhất một điểm cực tiểu; hàm liên tục trên tập không rỗng, đóng, bị chặn đạt giá trị nhỏ nhất.
- **Hàm lồi mạnh** (Định nghĩa 01.39, Nhận xét 01.40, Hệ quả 01.41). Hàm $f$ lồi mạnh với hằng số $\mu>0$ nếu $f-\tfrac\mu2\lVert\cdot\rVert_2^2$ lồi; với $f$ khả vi hai lần, điều này tương đương $\nabla^2f(x)\succeq\mu I$ mọi nơi. Hàm lồi mạnh khả vi trên $\mathbb R^n$ có đúng một điểm cực tiểu.
- **Hồi quy logistic và chính quy hóa** (Định nghĩa 01.8, Mệnh đề 01.9, Định nghĩa 01.42, Mệnh đề 01.46, Ví dụ 01.7). Mất mát logistic của biên $m$ là $\ell(m)=\log(1+e^{-m})$, với $\ell''(m)=\sigma(m)(1-\sigma(m))\in(0,\tfrac14]$, trong đó $\sigma(z)=1/(1+e^{-z})$. Bài có chính quy hóa $L(w)+\tfrac\mu2\lVert w\rVert_2^2$ với $\mu>0$ có đúng một nghiệm với mọi dữ liệu.
- **Hàm Lagrange và hệ KKT** (Định nghĩa 03.4, 03.29). Với bài $\min f_0(x)$, $f_i(x)\le0$, $Ax=b$, hàm Lagrange là $L(x,\lambda,\nu)=f_0(x)+\sum_i\lambda_if_i(x)+\nu^T(Ax-b)$. Hệ KKT gồm bốn nhóm: khả thi gốc, khả thi đối ngẫu $\lambda\succeq0$, bù trừ $\lambda_if_i(x)=0$, và dừng $\nabla f_0(x)+\sum_i\lambda_i\nabla f_i(x)+A^T\nu=0$.
- **KKT và độ nhạy** (Định lý 03.32, Hệ quả 03.31, 03.24). Với bài lồi khả vi, một bộ thỏa hệ KKT cho nghiệm gốc, kể cả khi miền là tập mở lồi. Với bài lồi có điểm Slater, mọi nghiệm có nhân tử KKT. Gọi hàm giá trị $p^*(v)$ là giá trị tối ưu khi vế phải bị nhiễu thành $Ax-b=v$; khi $p^*$ khả vi tại $0$, $\nu_j^*=-\partial p^*/\partial v_j(0)$. Ví dụ 03.18(b) giải bài $\min x_1^2+x_2^2$ với $x_1+2x_2=5$ bằng hệ KKT tuyến tính, được $x=(1,2)$, $\nu=-2$. Ví dụ 03.19 giải bài hồi quy có trần $\min\tfrac12\lVert w-y\rVert_2^2$, $\lVert w\rVert_2^2\le1$ với $y=(3,4)$, được $w^*=(0{,}6;\,0{,}8)$, $\lambda^*=2$ và mất mát tối ưu $8$.
- **Đại số tuyến tính.** Ma trận đối xứng $Q\succ0$ khả nghịch, có căn bậc hai đối xứng $Q^{1/2}\succ0$ và phân rã Cholesky $Q=R^TR$. Bất đẳng thức Cauchy–Schwarz: $\lvert a^Tb\rvert\le\lVert a\rVert_2\lVert b\rVert_2$. Với $A\in\mathbb R^{p\times n}$, phần bù trực giao của không gian hạt nhân $\ker A=\{d\mid Ad=0\}$ là không gian hàng $\{A^T\eta\mid\eta\in\mathbb R^p\}$; nếu các hàng của $A$ độc lập tuyến tính thì $A^T\eta=0$ kéo theo $\eta=0$ và $\dim\ker A=n-p$.

## Bảng ký hiệu

Bảng chỉ gồm ký hiệu dùng xuyên suốt chương; ký hiệu của một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ. Bài không ràng buộc dùng cặp $(f,x)$; bài có đẳng thức dùng cặp $(F,u)$ để hai lớp bài không lẫn nhau.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $n$, $p$, $N_s$ | số biến; số ràng buộc đẳng thức; số mẫu dữ liệu trong các ví dụ học máy | số nguyên dương, $p<n$ |
| $f$, $\operatorname{dom}f$ | hàm mục tiêu của bài không ràng buộc; miền của nó | $\operatorname{dom}f\subseteq\mathbb R^n$ mở, lồi |
| $x$, $x^*$, $f^*$ | điểm lặp; một nghiệm; giá trị tối ưu $f^*=\inf f$ | $\mathbb R^n$; $\mathbb R^n$; $\mathbb R$ |
| $g$, $H$ | gradient $\nabla f(x)$ và Hessian $\nabla^2f(x)$ tại điểm lặp hiện tại | $\mathbb R^n$; ma trận đối xứng $n\times n$ |
| $d$, $t$, $x^+$ | hướng (bước) của bài con; độ dài bước; điểm mới $x+td$ | $\mathbb R^n$; $t>0$; $\mathbb R^n$ |
| $h(t)$ | hàm một biến $f(x+td)$ dọc tia cập nhật hoặc dọc một đường thẳng | $\mathbb R\to\mathbb R$ |
| $\alpha$, $\beta$ | tham số quay lui Armijo | $0<\alpha<\tfrac12$, $0<\beta<1$ |
| $W$, $Q_W(d)$ | ma trận trọng số; mô hình bậc hai $f(x)+g^Td+\tfrac12d^TWd$ | $W\succ0$; $\mathbb R^n\to\mathbb R$ |
| $\lVert v\rVert_W$, $\lVert g\rVert_{W,*}$ | chuẩn có trọng số $\sqrt{v^TWv}$; chuẩn đối ngẫu $\sqrt{g^TW^{-1}g}$ | số không âm |
| $L$, $\mu$, $\kappa$ | hằng số Lipschitz của gradient; hằng số lồi mạnh, cũng là hệ số chính quy hóa của hồi quy logistic; số điều kiện $L/\mu$ | $0<\mu\le L$; $\kappa\ge1$ |
| $\rho$ | hệ số chính quy hóa của hồi quy ridge | $\rho>0$ |
| $L_H$ | hằng số Lipschitz của Hessian | $L_H>0$ |
| $\delta_N$, viết gọn $\delta$ | độ giảm Newton $\sqrt{d^THd}$ với $d$ là hướng Newton | $\delta\ge0$ |
| $F$, $u$, $u^*$, $F^*$ | mục tiêu, biến, nghiệm, giá trị tối ưu của bài có đẳng thức | $\operatorname{dom}F\subseteq\mathbb R^n$ mở, lồi |
| $A$, $b$ | ma trận và vế phải của ràng buộc $Au=b$ | $\mathbb R^{p\times n}$ đủ hạng hàng; $\mathbb R^p$ |
| $\nu$, $\nu^*$ | nhân tử của đẳng thức trong bài gốc, tự do dấu | $\mathbb R^p$ |
| $\eta$ | nhân tử của bài con Newton khả thi | $\mathbb R^p$ |
| $\delta_{eq}$ | độ giảm Newton của bài con có đẳng thức, $\sqrt{d^THd}$ | $\delta_{eq}\ge0$ |
| $N$, $\hat u$, $z$, $\psi$ | ma trận có cột là cơ sở của $\ker A$; một điểm khả thi; tọa độ trên tập khả thi; hàm rút gọn $\psi(z)=F(\hat u+Nz)$ | $\mathbb R^{n\times(n-p)}$; $\mathbb R^n$; $\mathbb R^{n-p}$ |
| $r_d$, $r_p$, $r$ | phần dư đối ngẫu $\nabla F(u)+A^T\nu$; phần dư khả thi $Au-b$; phần dư ghép | $\mathbb R^n$; $\mathbb R^p$; $\mathbb R^{n+p}$ |
| $\Delta\nu$ | số gia của nhân tử trong Newton từ điểm chưa khả thi | $\mathbb R^p$ |
| $\varepsilon_g$, $\varepsilon_{\mathrm{model}}$, $\varepsilon_p$, $\varepsilon_d$ | dung sai dừng theo chuẩn gradient, theo mô hình, theo hai phần dư | số dương |

Ba ví dụ xuyên suốt được giới thiệu tại chỗ và dùng lại trong nhiều mục:

- **VD1** là hàm bậc hai $f(x)=\tfrac12(3x_1^2+7x_2^2)$ trên $\mathbb R^2$ với điểm đầu $x^0=(2,4)^T$, dùng cho giảm gradient và hướng dốc nhất (Mục 2);
- **VD2** là hàm một biến $\varphi(s)=s-\log s$ trên $s>0$ với điểm đầu $s^0=\tfrac14$, dùng cho Newton (Mục 3) và tính tự điều chỉnh (Mục 6);
- **VD3** là bài $\min\tfrac12(2u_1^2+5u_2^2)$ với $u_1+u_2=14$, dùng cho Newton khả thi (Mục 4) và Newton từ điểm chưa khả thi (Mục 5).

Trong cả chương, $\log$ là logarit tự nhiên. Mọi bộ số của ba ví dụ là số liệu sư phạm tự xây dựng.

## 1. Điều kiện tối ưu và nhiệm vụ tạo bước lặp

Bài 03 kết thúc với một công cụ chứng nhận: theo Định lý 03.32, với bài lồi khả vi, một bộ thỏa hệ KKT cho nghiệm toàn cục. Ví dụ 03.19 dùng công cụ này để giải bài hồi quy có trần bằng tay: điều kiện dừng $(w-y)+2\lambda w=0$ cho $w=y/(1+2\lambda)$, rồi bù trừ cho $\lambda^*=2$ và $w^*=(0{,}6;\,0{,}8)$. Phép giải thành công vì điều kiện dừng là một hệ tuyến tính theo $w$ khi $\lambda$ cố định. Với hồi quy logistic có chính quy hóa trên dữ liệu của Ví dụ 01.7, tham số là một số thực $w$, hệ số chính quy hóa là $\mu>0$, và điều kiện dừng là phương trình

$$
\frac{e^w-2}{1+e^w}+\mu w=0,
$$

trong đó số hạng thứ nhất là đạo hàm của mất mát logistic trên ba mẫu và số hạng thứ hai là đạo hàm của $\tfrac\mu2w^2$. Phương trình chứa cả $e^w$ lẫn $w$, nên không giải được bằng biến đổi đại số thông thường.

Mục này viết lại hệ KKT cho hai lớp bài toán của chương, chứng minh rằng ở hai lớp này hệ đó vừa cần vừa đủ, và nêu cấu trúc chung của một phương pháp lặp sinh ra dãy điểm tiến tới nghiệm của hệ.

### 1.1 Nhu cầu: biết đích nhưng chưa có cách tới

Hệ KKT mô tả nghiệm bằng phương trình. Khi phương trình phi tuyến, cần một dãy điểm $x^0,x^1,x^2,\ldots$ mà mỗi điểm được tính từ điểm trước bằng phép tính hữu hạn và dãy tiến dần tới nghiệm. Ví dụ sau đo khoảng cách giữa hai việc này trên một bài cụ thể.

::: example Ví dụ 04.1 (Điều kiện dừng không có nghiệm dạng đóng)
**Dữ kiện.**

Dữ liệu của Ví dụ 01.7 có ba mẫu một chiều: $(a,y)=(1,+1)$, $(-1,-1)$ và $(1,-1)$. Biên có dấu là $w$, $w$ và $-w$, nên mất mát logistic là $L(w)=2\log(1+e^{-w})+\log(1+e^{w})$ và $L'(w)=\frac{e^w-2}{1+e^w}$. Thêm chính quy hóa với $\mu=1$ cho $J(w)=L(w)+\tfrac12w^2$.

**Điều kiện dừng.**

$J'(w)=\frac{e^w-2}{1+e^w}+w$. Theo Mệnh đề 01.46(b), $J$ có đúng một nghiệm, và vì $J''(w)=3\sigma(w)(1-\sigma(w))+1>0$, nghiệm đó là nghiệm duy nhất của $J'(w)=0$.

**Khoanh vùng nghiệm.**

$J'(0)=\frac{1-2}{2}=-\tfrac12<0$ và $J'(1)=\frac{e-2}{e+1}+1\approx0{,}1932+1=1{,}1932>0$. Hàm $J'$ liên tục và tăng chặt, nên nghiệm nằm trong $(0,1)$. Phương trình chứa đồng thời $e^w$ và $w$, nên không có biểu thức đóng cho nghiệm theo các hàm sơ cấp; vị trí của nó chỉ có thể xác định xấp xỉ.

**Kiểm tra lại.**

Tại $w=0{,}2865$: $e^{0{,}2865}\approx1{,}3318$, nên $J'(0{,}2865)\approx\frac{-0{,}6682}{2{,}3318}+0{,}2865\approx-0{,}2866+0{,}2865\approx-0{,}0001$. Giá trị này gần $0$. Phương pháp Newton của Mục 3 xuất phát từ $w=0$, với $J'(0)=-\tfrac12$ và $J''(0)=\tfrac74$, cho $w^1=\tfrac27\approx0{,}2857$ rồi $w^2\approx0{,}286548$, đúng tới sáu chữ số.
:::

Ví dụ 04.1 cho thấy hai việc khác nhau. Định lý 03.32 trả lời câu hỏi "điểm nào là nghiệm" bằng một phép kiểm. Câu hỏi "làm sao tìm điểm đó" cần một quy tắc sinh điểm mới từ điểm cũ, và quy tắc đó là chủ đề của cả chương.

### 1.2 Hai lớp bài toán và hệ KKT rút gọn

Chương xét hai lớp bài toán không có ràng buộc bất đẳng thức. Khi đó hai nhóm khả thi đối ngẫu và bù trừ của Định nghĩa 03.29 biến mất, và hệ KKT chỉ còn phương trình.

::: definition Định nghĩa 04.1 (Bài toán không ràng buộc và bài toán có ràng buộc đẳng thức)
**Bài toán không ràng buộc.** Cho tập mở lồi $\operatorname{dom}f\subseteq\mathbb R^n$ và hàm $f:\operatorname{dom}f\to\mathbb R$ lồi, khả vi hai lần liên tục. Bài toán là

$$
\underset{x\in\operatorname{dom}f}{\operatorname{minimize}}\quad f(x),
$$

với giá trị tối ưu $f^*=\inf_{x\in\operatorname{dom}f}f(x)$.

**Bài toán có ràng buộc đẳng thức.** Cho tập mở lồi $\operatorname{dom}F\subseteq\mathbb R^n$, hàm $F:\operatorname{dom}F\to\mathbb R$ lồi, khả vi hai lần liên tục, ma trận $A\in\mathbb R^{p\times n}$ có các hàng độc lập tuyến tính và $b\in\mathbb R^p$. Bài toán là

$$
\underset{u\in\operatorname{dom}F}{\operatorname{minimize}}\quad F(u)\qquad\text{subject to}\quad Au=b,
$$

với giá trị tối ưu $F^*=\inf\{F(u)\mid u\in\operatorname{dom}F,\ Au=b\}$.
:::

Định nghĩa đặt ba loại giả thiết. Miền mở làm mọi điểm của miền là điểm trong, nên gradient xác định ở mọi nơi và không có điều kiện riêng tại biên. Tính lồi làm điều kiện dừng thành điều kiện đủ. Giả thiết các hàng của $A$ độc lập tuyến tính, gọi là $A$ đủ hạng hàng, loại các ràng buộc thừa: nếu một hàng là tổ hợp của các hàng khác thì hoặc nó thừa, hoặc hệ $Au=b$ vô nghiệm.

Bài toán tổng quát (2.1) của Bài 03 có miền $D$, $m$ ràng buộc bất đẳng thức $f_i(x)\le0$ và ràng buộc đẳng thức $Ax=b$. Định nghĩa 04.1 là trường hợp $m=0$ với $D$ là tập mở lồi. Bài không ràng buộc là trường hợp riêng $p=0$ của bài có đẳng thức.

Ví dụ: $f(x)=\tfrac12(3x_1^2+7x_2^2)$ trên $\mathbb R^2$ là bài không ràng buộc; $\varphi(s)=s-\log s$ có miền mở $(0,\infty)$, nên điều kiện $s>0$ là miền chứ không phải ràng buộc bất đẳng thức. Phản ví dụ là bài $\min x$ với $x\ge0$: nó không thuộc hai lớp này vì nghiệm $x=0$ nằm trên biên của tập khả thi và đạo hàm tại đó bằng $1\ne0$.

Kết quả sau chỉ cần điều kiện cần bậc nhất của Bài 00, Hệ quả 01.27 và một sự kiện đại số tuyến tính về không gian hạt nhân. Nó cho biết mọi phương pháp của chương nhắm tới hệ phương trình nào.

::: proposition Mệnh đề 04.2 (Hệ KKT rút gọn là điều kiện cần và đủ)
**Giả thiết.** Hai bài toán của Định nghĩa 04.1.

**Kết luận.**

- (a) Điểm $x^*\in\operatorname{dom}f$ là nghiệm của bài không ràng buộc khi và chỉ khi

$$
\nabla f(x^*)=0.
\tag{1.1}
$$

- (b) Điểm $u^*\in\operatorname{dom}F$ là nghiệm của bài có đẳng thức khi và chỉ khi tồn tại $\nu^*\in\mathbb R^p$ thỏa

$$
\nabla F(u^*)+A^T\nu^*=0,\qquad Au^*=b.
\tag{1.2}
$$

Vector $\nu^*$ khi đó là duy nhất.

**Điều kiện áp dụng.** Chiều "nghiệm thì thỏa hệ" chỉ cần khả vi và miền mở. Chiều "thỏa hệ thì là nghiệm" cần tính lồi. Tính duy nhất của $\nu^*$ cần $A$ đủ hạng hàng.

**Phạm vi.** Mệnh đề không khẳng định nghiệm tồn tại và không cho cách tìm nghiệm. Nó không áp dụng khi có ràng buộc bất đẳng thức, nơi nghiệm có thể nằm trên biên.
:::

::: proof Chứng minh Mệnh đề 04.2
**Bước 1 (phần a).**

Nếu $x^*$ là nghiệm thì nó là cực tiểu địa phương tại một điểm trong của miền mở, nên $\nabla f(x^*)=0$ theo điều kiện cần bậc nhất. Ngược lại, nếu $\nabla f(x^*)=0$ thì $x^*$ là cực tiểu toàn cục trên $\operatorname{dom}f$ theo Hệ quả 01.27, vì $f$ lồi, khả vi trên tập mở lồi.

**Bước 2 (phần b, chiều đủ).**

Giả sử $(u^*,\nu^*)$ thỏa (1.2) và $u$ là một điểm khả thi bất kỳ. Hàm $F$ lồi nên theo Định lý 01.26,

$$
\begin{aligned}
F(u)&\ge F(u^*)+\nabla F(u^*)^T(u-u^*)\\
&=F(u^*)-\nu^{*T}A(u-u^*)\\
&=F(u^*)-\nu^{*T}(b-b)\\
&=F(u^*).
\end{aligned}
$$

Dòng thứ hai thay $\nabla F(u^*)=-A^T\nu^*$ từ phương trình dừng; dòng thứ ba dùng $Au=b$ và $Au^*=b$. Vậy $u^*$ là nghiệm.

**Bước 3 (phần b, chiều cần).**

Giả sử $u^*$ là nghiệm và lấy $d\in\ker A$ bất kỳ. Vì miền mở, $u^*+td\in\operatorname{dom}F$ với mọi $\lvert t\rvert$ đủ nhỏ, và $A(u^*+td)=b$. Hàm một biến $t\mapsto F(u^*+td)$ đạt cực tiểu địa phương tại $t=0$, nên đạo hàm của nó tại $0$ bằng $0$: $\nabla F(u^*)^Td=0$. Như vậy $\nabla F(u^*)$ trực giao với mọi vector của $\ker A$, nên nằm trong không gian hàng của $A$: có $\eta$ với $\nabla F(u^*)=A^T\eta$, và $\nu^*=-\eta$ thỏa (1.2).

**Bước 4 (tính duy nhất của nhân tử).**

Nếu $\nu_1$, $\nu_2$ cùng thỏa (1.2) thì $A^T(\nu_1-\nu_2)=0$, và vì các hàng của $A$ độc lập tuyến tính, $\nu_1=\nu_2$. $\square$
:::

Mệnh đề 04.2 nói rằng ở hai lớp bài của chương, giải bài tối ưu và giải hệ (1.1) hoặc (1.2) là một. Hệ (1.1) gồm $n$ phương trình theo $n$ ẩn. Hệ (1.2) gồm $n$ phương trình dừng và $p$ phương trình khả thi theo $n+p$ ẩn $(u^*,\nu^*)$.

Mỗi giả thiết có vai trò riêng:

- bỏ tính lồi thì chiều đủ hỏng: $f(x)=x^3$ có $f'(0)=0$ nhưng $0$ không là cực tiểu;
- bỏ miền mở thì chiều cần hỏng, như phản ví dụ $\min x$ với $x\ge0$ ở trên;
- bỏ giả thiết $A$ đủ hạng hàng thì $\nu^*$ không duy nhất: với hai hàng trùng nhau $u_1+u_2=14$ và $u_1+u_2=14$, mọi cặp $(\nu_1,\nu_2)$ có cùng tổng đều dùng được.

Chiều đủ của Mệnh đề 04.2(b) là trường hợp riêng của Định lý 03.32. Chiều cần ở Bài 03 đi qua đối ngẫu mạnh và điều kiện Slater (Hệ quả 03.31); ở đây nó được chứng minh trực tiếp bằng hướng khả thi, vì ràng buộc affine cho phép đi theo mọi hướng của $\ker A$ mà vẫn khả thi. Cùng lập luận hướng khả thi này là nền của phương pháp Newton khả thi ở Mục 4.

**Trong học máy.** Huấn luyện một mô hình không có ràng buộc, như hồi quy logistic có chính quy hóa, là bài không ràng buộc với biến là vector tham số $w$ và $f$ là mất mát huấn luyện. Mệnh đề 04.2(a) đặt đích của thuật toán huấn luyện là $\nabla f=0$ khi mất mát lồi; việc dừng khi gradient đủ nhỏ còn cần giả thiết về độ cong để chặn sai số (Mục 2.6). Ràng buộc đẳng thức xuất hiện khi tham số phải thỏa một đẳng thức tuyến tính, như trọng số trộn của nhiều mô hình có tổng bằng 1 (Tình huống 04.2). Với mạng sâu, mất mát không lồi, nên $\nabla f=0$ chỉ là điều kiện cần (Tình huống 04.3).

::: example Ví dụ 04.2 (Hệ KKT rút gọn của hai bài nhỏ)
**Bài không ràng buộc (VD1).**

$f(x)=\tfrac12(3x_1^2+7x_2^2)$ có $\nabla f(x)=(3x_1,7x_2)^T$. Hệ (1.1) là $3x_1=0$, $7x_2=0$, nên $x^*=(0,0)^T$ và $f^*=0$. Hessian $\operatorname{diag}(3,7)\succ0$, nên $f$ lồi và Mệnh đề 04.2(a) cho $x^*$ là nghiệm.

**Bài có đẳng thức (Ví dụ 03.18(b)).**

$F(u)=u_1^2+u_2^2$, $A=[1\ \ 2]$, $b=5$. Hệ (1.2) là

$$
2u_1+\nu=0,\qquad2u_2+2\nu=0,\qquad u_1+2u_2=5 .
$$

Hai phương trình đầu cho $u=(-\tfrac\nu2,-\nu)^T$; thay vào phương trình thứ ba: $-\tfrac{5\nu}2=5$, nên $\nu^*=-2$ và $u^*=(1,2)^T$.

**Kiểm tra lại.**

$\nabla F(u^*)=(2,4)^T$ và $A^T\nu^*=(-2,-4)^T$, tổng bằng $0$. Điểm khả thi $(5,0)^T$ cho $F=25>5=F(u^*)$, khớp với chiều đủ.
:::

::: remark Nhận xét 04.3 (Nhân tử của đẳng thức tự do dấu)
Trong (1.2) không có điều kiện $\nu^*\succeq0$. Một đẳng thức $a^Tu=\beta$ tương đương cặp bất đẳng thức $a^Tu-\beta\le0$ và $\beta-a^Tu\le0$. Nếu gán cho chúng hai nhân tử không âm $\lambda_+$ và $\lambda_-$ như Bài 03, số hạng trong điều kiện dừng là $(\lambda_+-\lambda_-)a$, và hiệu $\lambda_+-\lambda_-$ nhận mọi giá trị thực. Ở Ví dụ 04.2, $\nu^*=-2<0$ vẫn hợp lệ.

Số hạng $A^T\nu^*$ là tổ hợp tuyến tính các hàng của $A$, tức các vector pháp tuyến của các siêu phẳng ràng buộc. Phương trình dừng nói rằng tại nghiệm, gradient của mục tiêu bị một tổ hợp pháp tuyến cân bằng hết; theo Bước 3 của chứng minh trên, điều này tương đương với việc gradient trực giao với mọi hướng khả thi.

Nhầm lẫn thường gặp là đòi $\nu^*\succeq0$ theo thói quen của ràng buộc bất đẳng thức, rồi kết luận sai rằng hệ (1.2) vô nghiệm.
:::

### 1.3 Cấu trúc một bước lặp

Hệ (1.1) và (1.2) xác định đích. Một phương pháp lặp cần thêm ba thành phần do người thiết kế chọn, và định nghĩa sau đặt tên cho chúng.

::: definition Định nghĩa 04.4 (Phương pháp giảm)
Cho bài không ràng buộc của Định nghĩa 04.1 và điểm đầu $x^0\in\operatorname{dom}f$. Một phương pháp giảm (descent method) sinh dãy

$$
x^{k+1}=x^k+t_kd^k,\qquad k=0,1,2,\ldots
$$

trong đó:

- **hướng** $d^k\in\mathbb R^n$ là nghiệm của một bài toán con lập tại $x^k$;
- **độ dài bước** $t_k>0$ được chọn bởi một quy tắc nhận bước sao cho $x^{k+1}\in\operatorname{dom}f$ và $f(x^{k+1})<f(x^k)$ khi $x^k$ chưa thỏa (1.1);
- **tiêu chí dừng** là một bất đẳng thức tính được tại $x^k$ đo mức vi phạm của (1.1).
:::

Ba thành phần độc lập với nhau. Bài con quyết định phương, quy tắc nhận bước quyết định đi bao xa theo phương đó, tiêu chí dừng quyết định khi nào trả kết quả. Mục 2 và Mục 3 thay đổi bài con và giữ quy tắc nhận bước; Mục 4 và Mục 5 thêm ràng buộc vào bài con và thay quy tắc nhận bước khi cần.

Hướng $d^k$ là nghiệm của bài con, không phải nghiệm của bài gốc: bài con có biến là bước $d$ và được lập tại một điểm cố định. Nhận xét sau nêu quan hệ giữa hai bài.

::: remark Nhận xét 04.5 (Bài con và bài gốc)
Trong một bước lặp có hai bài tối ưu. Bài gốc có biến $x$ và hệ điều kiện (1.1). Bài con có biến $d$, được lập tại điểm $x^k$ cố định, và có hệ điều kiện tối ưu riêng; ở Mục 2 và Mục 3, đó là hệ KKT của một bài con không ràng buộc, ở Mục 4 là hệ KKT của một bài con có đẳng thức.

Nghiệm của bài con chỉ là ứng viên cho bước. Điểm $x^k+d^k$ thỏa (1.1) khi bài con trùng bài gốc, như khi $f$ bậc hai và bài con dùng đúng Hessian. Trong trường hợp tổng quát thì không, và phép kiểm tiêu chí dừng tại điểm mới là bắt buộc.
:::

::: exercise Bài tập 04.1
- (a) Viết hệ (1.1) cho $f(x)=x_1^2+x_1x_2+x_2^2-3x_1$ trên $\mathbb R^2$, giải và chứng minh nghiệm thu được là cực tiểu toàn cục.
- (b) Viết hàm Lagrange và hệ (1.2) cho bài $\min\tfrac12(u_1^2+4u_2^2)$ với $u_1+u_2=5$; giải hệ.
- (c) Nghiệm $\nu^*$ ở câu (b) có dấu gì; điều đó có mâu thuẫn với Mệnh đề 04.2 không.
:::

::: hint
Ở (a), Hessian là ma trận hằng; kiểm tra nó xác định dương bằng hai định thức con chính. Ở (b), hai phương trình dừng cho $u_1$ và $u_2$ theo $\nu$.
:::

::: solution
**Câu (a).**

$\nabla f(x)=(2x_1+x_2-3,\ x_1+2x_2)^T$. Hệ $2x_1+x_2=3$, $x_1+2x_2=0$ cho $x_1=-2x_2$, rồi $-4x_2+x_2=3$, nên $x_2=-1$, $x_1=2$. Hessian $\begin{bmatrix}2&1\\1&2\end{bmatrix}$ có định thức con chính $2>0$ và $3>0$, nên xác định dương; $f$ lồi chặt (Định lý 01.30(b)) và theo Mệnh đề 04.2(a), $x^*=(2,-1)^T$ là cực tiểu toàn cục, với $f^*=4-2+1-6=-3$.

**Câu (b).**

$L(u,\nu)=\tfrac12(u_1^2+4u_2^2)+\nu(u_1+u_2-5)$. Hệ (1.2): $u_1+\nu=0$, $4u_2+\nu=0$, $u_1+u_2=5$. Từ hai phương trình đầu, $u_1=-\nu$ và $u_2=-\nu/4$; thay vào phương trình thứ ba: $-\tfrac54\nu=5$, nên $\nu^*=-4$, $u^*=(4,1)^T$, $F^*=8+2=10$.

**Câu (c).**

$\nu^*=-4<0$. Không mâu thuẫn: theo Nhận xét 04.3, nhân tử của đẳng thức tự do dấu.

**Kiểm tra lại.**

Điểm khả thi $(5,0)^T$ cho $F=12{,}5>10$, và $(3,2)^T$ cho $F=4{,}5+8=12{,}5>10$.
:::

**Chuỗi suy luận của mục.** Mục đi từ nhu cầu tìm nghiệm của một phương trình phi tuyến tới ba kết quả:

1. Định nghĩa 04.1 cố định hai lớp bài toán và giả thiết chung;
2. Mệnh đề 04.2 chứng minh hệ (1.1) và (1.2) vừa cần vừa đủ, và Nhận xét 04.3 giải thích vì sao nhân tử tự do dấu;
3. Định nghĩa 04.4 tách một phương pháp lặp thành bài con, quy tắc nhận bước và tiêu chí dừng.

**Kết mục.** Mục này xác định đích của mọi phương pháp trong chương là hệ (1.1) hoặc (1.2), và cấu trúc ba thành phần của một bước lặp. Chưa có bài con cụ thể nào, chưa có quy tắc nhận bước, và chưa biết một hướng $d$ phải thỏa điều gì để $f$ giảm. Mục 2 trả lời câu hỏi cuối bằng đạo hàm hướng, rồi lập bài con đơn giản nhất và quy tắc nhận bước Armijo.

## 2. Hướng giảm, độ dài bước và thước đo

Mục 1 để lại câu hỏi: tại một điểm chưa thỏa (1.1), đi theo hướng nào thì $f$ giảm. Xét VD1, $f(x)=\tfrac12(3x_1^2+7x_2^2)$, tại $x^0=(2,4)^T$ với $f(x^0)=\tfrac12(12+112)=62$. Gradient $g=\nabla f(x^0)=(6,28)^T\ne0$, nên $x^0$ chưa là nghiệm.

Mục này xây dựng ba công cụ: đạo hàm hướng để kiểm một hướng có làm $f$ giảm, mô hình bậc hai để chọn hướng, và quay lui Armijo để chọn độ dài bước. Ghép ba công cụ cho thuật toán giảm gradient. Cuối mục chứng minh các cận hội tụ của thuật toán và chỉ ra giới hạn của nó khi độ cong khác nhau theo từng phương.

### 2.1 Đạo hàm hướng và hướng giảm

Tại $x^0$ của VD1 có vô số hướng để đi. Trực giác, chưa phải định nghĩa: một hướng tốt là hướng mà dọc theo nó, đồ thị của $f$ đi xuống ngay khi rời $x^0$. Độ dốc của đồ thị dọc một hướng được đo bằng một giới hạn một phía.

::: definition Định nghĩa 04.6 (Đạo hàm hướng và hướng giảm)
Cho $f:\operatorname{dom}f\to\mathbb R$ với $\operatorname{dom}f\subseteq\mathbb R^n$ mở, một điểm $x\in\operatorname{dom}f$ và một vector $d\in\mathbb R^n$.

- **Đạo hàm hướng** (directional derivative) của $f$ tại $x$ theo $d$ là

$$
f'(x;d)=\lim_{t\downarrow0}\frac{f(x+td)-f(x)}{t},
$$

khi giới hạn tồn tại.

- Khi $f$ khả vi tại $x$, vector $d$ gọi là một **hướng giảm** (descent direction) của $f$ tại $x$ nếu $\nabla f(x)^Td<0$.
:::

Giới hạn lấy theo $t>0$ vì bước lặp chỉ đi về phía trước theo $d$. Vector $d$ không cần chuẩn hóa. Bài 00 dùng đạo hàm theo vector đơn vị $\mathbf u$; ở đây độ dài của $d$ được giữ nguyên vì về sau độ dài đó mang thông tin về bước.

Đạo hàm hướng tổng quát hóa đạo hàm riêng: với $d=e_i$, vector cơ sở thứ $i$, ta có $f'(x;e_i)=\partial f/\partial x_i$. Nó khác gradient ở chỗ gradient là một vector, còn đạo hàm hướng là một số gắn với một hướng cho trước. Mệnh đề sau nối hai đối tượng này và cho thấy định nghĩa hướng giảm bằng dấu của $\nabla f(x)^Td$ là hợp lý.

::: proposition Mệnh đề 04.7 (Đạo hàm hướng của hàm khả vi và tiêu chuẩn dấu)
**Giả thiết.** $f$ khả vi tại $x\in\operatorname{dom}f$, $\operatorname{dom}f$ mở, $g=\nabla f(x)$, $d\in\mathbb R^n$.

**Kết luận.**

- (a) $f'(x;d)=g^Td$, và $f'(x;sd)=s\,f'(x;d)$ với mọi $s>0$.
- (b) Nếu $g^Td<0$ thì có $\bar t>0$ sao cho $f(x+td)<f(x)$ với mọi $t\in(0,\bar t]$.
- (c) Nếu $g^Td>0$ thì có $\bar t>0$ sao cho $f(x+td)>f(x)$ với mọi $t\in(0,\bar t]$.

**Điều kiện áp dụng.** Chỉ cần khả vi tại một điểm; không cần tính lồi.

**Phạm vi.** Khi $g^Td=0$, thông tin bậc một không kết luận được: $f$ có thể tăng, giảm hoặc không đổi dọc $d$. Mệnh đề không cho biết $\bar t$ lớn bao nhiêu.
:::

::: proof Chứng minh Mệnh đề 04.7
**Bước 1 (khai triển bậc một).**

Vì $f$ khả vi tại $x$, $f(x+td)=f(x)+t\,g^Td+\xi(t)$ với $\xi(t)/t\to0$ khi $t\downarrow0$. Chia cho $t>0$ và cho $t\downarrow0$ được $f'(x;d)=g^Td$. Thay $d$ bằng $sd$ được $g^T(sd)=s\,g^Td$.

**Bước 2 (dấu).**

Giả sử $g^Td<0$. Vì $\xi(t)/t\to0$, có $\bar t>0$ sao cho $\lvert\xi(t)\rvert/t<\tfrac12\lvert g^Td\rvert$ với mọi $t\in(0,\bar t]$, và $x+td\in\operatorname{dom}f$ vì miền mở. Khi đó

$$
\begin{aligned}
f(x+td)-f(x)&=t\Bigl(g^Td+\frac{\xi(t)}t\Bigr)\\
&<t\Bigl(g^Td+\tfrac12\lvert g^Td\rvert\Bigr)\\
&=\tfrac12t\,g^Td<0 .
\end{aligned}
$$

Dòng thứ hai dùng cận của $\xi(t)/t$; dòng thứ ba dùng $g^Td=-\lvert g^Td\rvert$. Phần (c) chứng minh tương tự với dấu ngược. $\square$
:::

Mệnh đề 04.7 nói rằng dấu của một tích vô hướng quyết định $f$ tăng hay giảm ngay khi rời $x$ theo $d$. Hệ số $s>0$ không đổi dấu, nên tính chất "là hướng giảm" thuộc về phương và chiều của $d$, không phụ thuộc độ dài.

Trường hợp $g^Td=0$ thật sự không xác định:

- với $f(x)=x_1^2-x_2^2$ tại $x=(1,0)^T$, $g=(2,0)^T$, hướng $d=(0,1)^T$ có $g^Td=0$ và $f(x+td)=1-t^2<f(x)$;
- với $f(x)=x_1^2+x_2^2$, cùng điểm và hướng cho $f(x+td)=1+t^2>f(x)$.

::: example Ví dụ 04.3 (Ba hướng tại điểm đầu của VD1)
**Dữ kiện.**

$f(x)=\tfrac12(3x_1^2+7x_2^2)$, $\nabla f(x)=(3x_1,7x_2)^T$, $x^0=(2,4)^T$, $g=(6,28)^T$.

**Tính.**

- $d=(-1,0)^T$: $g^Td=-6<0$, hướng giảm.
- $d=(1,0)^T$: $g^Td=6>0$, $f$ tăng ngay khi rời $x^0$.
- $d=(-28,6)^T$: $g^Td=-168+168=0$; hướng này tiếp xúc với đường mức qua $x^0$.

**Kiểm tra lại.**

Theo hướng thứ nhất, $f(x^0+td)=\tfrac12(3(2-t)^2+112)$, giảm khi $0<t<4$, khớp phần (b). Theo hướng thứ ba, $f(x^0+td)=\tfrac12\bigl(3(2-28t)^2+7(4+6t)^2\bigr)=62+1302t^2$: hệ số bậc nhất bằng $0$ đúng như $g^Td=0$, và $f$ tăng nhờ số hạng bậc hai.
:::

![Các đường mức f bằng 15, 35 và 62 của hàm một nửa của 3x1 bình phương cộng 7x2 bình phương là các elip tâm gốc tọa độ, dẹt theo trục x2; đường mức 62 đi qua điểm x0 bằng (2, 4). Từ x0 có ba mũi tên: một mũi tên hướng vào trong elip, ghi g chuyển vị d âm; một mũi tên tiếp xúc với đường mức, ghi g chuyển vị d bằng 0; một mũi tên hướng ra ngoài, ghi g chuyển vị d dương. Hai trục có tỷ lệ khác nhau.](img/lec-04/descent-directions.svg)

Trên hình, các hướng có $g^Td<0$ chỉ vào phía trong elip qua $x^0$, nơi $f<62$. Hướng có $g^Td=0$ tiếp xúc với elip. Hai trục được vẽ với tỷ lệ khác nhau, nên góc nhìn thấy giữa mũi tên và đường mức không dùng để kết luận tính trực giao; dấu được xác định bằng phép tính của Ví dụ 04.3.

Có vô số hướng giảm, và tiêu chuẩn dấu không chọn được hướng nào. Cực tiểu hóa riêng $g^Td$ theo $d$ không có nghiệm: với $d=-sg$, $g^Td=-s\lVert g\rVert_2^2\to-\infty$ khi $s\to\infty$. Bài con chọn hướng vì vậy cần thêm một số hạng ngăn bước dài vô hạn.

### 2.2 Hướng gradient từ một bài con bậc hai

Xấp xỉ bậc một $f(x+d)\approx f(x)+g^Td$ chỉ đáng tin khi $d$ nhỏ. Trực giác: cộng vào xấp xỉ này một số hạng phạt độ dài bước, để bài con cân bằng giữa mức giảm dự báo và độ tin cậy của dự báo. Số hạng phạt đơn giản nhất là $\tfrac12\lVert d\rVert_2^2$; định nghĩa sau cho phép một ma trận trọng số tổng quát, vì Mục 2.5 và Mục 3 sẽ thay ma trận đơn vị bằng ma trận khác.

::: definition Định nghĩa 04.8 (Mô hình bậc hai và hướng gradient)
Cho $x\in\operatorname{dom}f$ cố định, $g=\nabla f(x)$ và ma trận đối xứng $W\in\mathbb R^{n\times n}$, $W\succ0$. Mô hình bậc hai của $f$ tại $x$ với ma trận $W$ là hàm của bước $d\in\mathbb R^n$:

$$
Q_W(d)=f(x)+g^Td+\tfrac12d^TWd .
$$

Với $W=I$, mô hình là $Q_I(d)=f(x)+g^Td+\tfrac12\lVert d\rVert_2^2$, và nghiệm của bài con $\min_dQ_I(d)$ gọi là **hướng gradient**, ký hiệu $d_G$.
:::

Trong bài con, điểm $x$ được giữ cố định, nên $f(x)$ và $g$ là hằng số; biến duy nhất là $d$. Ba số hạng của $Q_W$ có ba vai trò: $f(x)$ là giá trị hiện tại, $g^Td$ là thay đổi bậc một dự báo, $\tfrac12d^TWd$ là cái giá của việc đi xa. Chỉ số dưới của $Q$ ghi ma trận của số hạng bậc hai.

Mô hình $Q_W$ khác khai triển Taylor bậc hai ở chỗ $W$ là một ma trận được chọn, không nhất thiết bằng Hessian. Khi $W=\nabla^2f(x)$, $Q_W$ trùng khai triển Taylor bậc hai; đó là mô hình Newton của Mục 3. Mệnh đề sau giải bài con cho mọi $W\succ0$ cùng một lúc.

::: proposition Mệnh đề 04.9 (Nghiệm của mô hình bậc hai)
**Giả thiết.** $W$ đối xứng, $W\succ0$; $g\in\mathbb R^n$.

**Kết luận.**

- (a) $Q_W$ lồi chặt và có nghiệm duy nhất $d$, là nghiệm của hệ tuyến tính

$$
Wd=-g .
\tag{2.1}
$$

- (b) $g^Td=-d^TWd$, nên $d$ là hướng giảm khi $g\ne0$.
- (c) Mức giảm của mô hình là $Q_W(0)-Q_W(d)=\tfrac12d^TWd=\tfrac12g^TW^{-1}g$.

Với $W=I$: $d_G=-g$, $g^Td_G=-\lVert g\rVert_2^2$ và mức giảm mô hình là $\tfrac12\lVert g\rVert_2^2$.

**Điều kiện áp dụng.** Cần $W\succ0$; không cần gì về $f$ ngoài sự tồn tại của $g$.

**Phạm vi.** Mệnh đề nói về bài con. Nó không khẳng định $f(x+d)<f(x)$, cũng không khẳng định $x+d$ là nghiệm của bài gốc.
:::

::: proof Chứng minh Mệnh đề 04.9
**Bước 1 (lồi chặt và điều kiện tối ưu).**

Gradient của $Q_W$ theo $d$ là $g+Wd$, vì $W$ đối xứng; Hessian là $W\succ0$. Theo Định lý 01.30(b), $Q_W$ lồi chặt trên $\mathbb R^n$. Theo Mệnh đề 04.2(a) áp cho bài con không ràng buộc theo $d$, $d$ là nghiệm khi và chỉ khi $g+Wd=0$, tức (2.1). Ma trận $W\succ0$ khả nghịch, nên hệ có đúng một nghiệm $d=-W^{-1}g$.

**Bước 2 (hướng giảm).**

Nhân (2.1) bên trái với $d^T$: $d^TWd=-d^Tg$, tức $g^Td=-d^TWd$. Khi $g\ne0$ thì $d\ne0$, và $d^TWd>0$, nên $g^Td<0$.

**Bước 3 (mức giảm của mô hình).**

$$
\begin{aligned}
Q_W(0)-Q_W(d)&=-g^Td-\tfrac12d^TWd\\
&=d^TWd-\tfrac12d^TWd\\
&=\tfrac12d^TWd .
\end{aligned}
$$

Dòng thứ hai dùng Bước 2. Thay $d=-W^{-1}g$ được $d^TWd=g^TW^{-1}WW^{-1}g=g^TW^{-1}g$. $\square$
:::

Mệnh đề 04.9 biến việc chọn hướng thành việc giải hệ tuyến tính (2.1). Hệ này là điều kiện KKT của một bài con không ràng buộc, đúng khuôn của Nhận xét 04.5: bài gốc theo $x$, bài con theo $d$, và hệ của bài con giải được bằng một phép giải hệ tuyến tính. Với $W=I$, hướng gradient là $-g$, ngược chiều gradient. Phần (c) cho mức giảm mà mô hình dự báo; đại lượng này sẽ trở thành tiêu chí dừng của Newton ở Mục 3.

::: example Ví dụ 04.4 (Hướng gradient của VD1 và độ tin cậy của mô hình)
**Tính hướng.**

Với $g=(6,28)^T$, hệ (2.1) với $W=I$ cho $d_G=(-6,-28)^T$. Theo Mệnh đề 04.9(b), $g^Td_G=-\lVert g\rVert_2^2=-(36+784)=-820<0$.

**Mô hình dự báo và giá trị thật.**

Mô hình dự báo $Q_I(d_G)=62-820+\tfrac12\cdot820=-348$. Giá trị thật tại $x^0+d_G=(-4,-24)^T$ là $f=\tfrac12(3\cdot16+7\cdot576)=\tfrac12(48+4032)=2040$.

**Kiểm tra lại.**

Mô hình $Q_I$ dùng độ cong $1$ theo mọi phương, trong khi độ cong thật của VD1 là $3$ theo $x_1$ và $7$ theo $x_2$. Với $d=d_G$: $\tfrac12d_G^T\operatorname{diag}(3,7)d_G=\tfrac12(108+5488)=2798$, nên $f(x^0+d_G)=62-820+2798=2040$, khớp phép tính trực tiếp.
:::

Ví dụ 04.4 là một trường hợp của Nhận xét 04.5: nghiệm của bài con là một hướng tốt, nhưng bước đầy đủ $t=1$ theo hướng đó làm $f$ tăng từ $62$ lên $2040$. Độ dài bước cần một quy tắc riêng.

### 2.3 Độ dài bước và quay lui Armijo

Hướng giảm chỉ bảo đảm $f$ giảm khi $t$ đủ nhỏ (Mệnh đề 04.7(b)). Trên VD1 có thể tính chính xác "đủ nhỏ" là bao nhiêu, và phép tính đó gợi ra một phép kiểm dùng được cho hàm tổng quát.

::: example Ví dụ 04.5 (VD1 trên tia cập nhật)
**Lập hàm một biến.**

Đặt $h(t)=f(x^0+td_G)$ với $d_G=(-6,-28)^T$:

$$
\begin{aligned}
h(t)&=\tfrac12\bigl[3(2-6t)^2+7(4-28t)^2\bigr]\\
&=62-820t+2798t^2 .
\end{aligned}
$$

Hệ số bậc nhất $-820$ là $g^Td_G$; hệ số bậc hai $2798=\tfrac12d_G^T\operatorname{diag}(3,7)d_G$ đến từ độ cong của $f$ dọc tia.

**Vùng giảm.**

$h(t)<62$ khi và chỉ khi $2798t^2<820t$, tức $0<t<\frac{820}{2798}=\frac{410}{1399}\approx0{,}293$.

**Kiểm tra lại.**

$t=\tfrac14$ cho điểm $(\tfrac12,-3)^T$ và $f=\tfrac12(\tfrac34+63)=\tfrac{255}8<62$. $t=\tfrac12$ cho điểm $(-1,-10)^T$ và $f=\tfrac12(3+700)=\tfrac{703}2>62$. Hai giá trị nằm hai phía của $\frac{410}{1399}$, khớp vùng giảm.
:::

![Tia x0 cộng t nhân dG trên các đường mức của VD1, với mũi tên chỉ chiều t tăng. Điểm đầu x0 bằng (2, 4) có f bằng 62. Điểm ứng với t bằng 1/4 là (1/2, âm 3) với f bằng 255/8, nhỏ hơn 62. Điểm ứng với t bằng 1/2 là (âm 1, âm 10) với f bằng 703/2, lớn hơn 62.](img/lec-04/descent-ray.svg)

Hình cho thấy tia cập nhật đi vào vùng $f<62$ rồi ra khỏi nó. Điểm ứng với $t=\tfrac14$ còn ở trong vùng, điểm ứng với $t=\tfrac12$ đã vượt sang phía bên kia của elip. Với hàm tổng quát, vùng giảm không tính được dạng đóng, nên cần một phép kiểm chỉ dùng giá trị $f$ tại điểm thử và số $g^Td$ đã có.

Trực giác cho phép kiểm đó: so mức giảm thật $f(x)-f(x+td)$ với mức giảm mà xấp xỉ tuyến tính dự báo, $-t\,g^Td$, và nhận bước nếu mức giảm thật đạt ít nhất một phần cố định của dự báo.

::: definition Định nghĩa 04.10 (Điều kiện Armijo và quay lui)
Cho $x\in\operatorname{dom}f$, hướng giảm $d$ với $g^Td<0$ và hai tham số $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

- Bước $t>0$ thỏa **điều kiện Armijo** (điều kiện giảm đủ, sufficient decrease condition) nếu $x+td\in\operatorname{dom}f$ và

$$
f(x+td)\le f(x)+\alpha t\,g^Td .
\tag{2.2}
$$

- **Quay lui Armijo** (backtracking line search) là thủ tục: đặt $t=1$; trong khi $x+td\notin\operatorname{dom}f$ hoặc (2.2) sai, gán $t\leftarrow\beta t$; trả về $t$.
:::

Vế phải của (2.2) là một đường thẳng theo $t$, đi qua điểm $(0,f(x))$ với hệ số góc $\alpha g^Td$. Đường này thoải hơn tiếp tuyến của $h(t)=f(x+td)$ tại $0$, có hệ số góc $g^Td$, vì $0<\alpha<1$. Bước được nhận khi đồ thị $h$ nằm dưới đường thẳng đó. Quay lui thử lần lượt $t=1,\beta,\beta^2,\ldots$ và dừng ở giá trị đầu tiên được nhận; điểm thử nằm ngoài miền bị loại trước khi tính $f$.

Điều kiện (2.2) đòi nhiều hơn tính giảm của Mệnh đề 04.7(b): mức giảm phải tỷ lệ với $t\lvert g^Td\rvert$. Một quy tắc chỉ đòi $f(x+td)<f(x)$ có thể nhận những bước làm $f$ giảm rất ít, và dãy lặp có thể dừng lại ở một điểm không phải nghiệm. Kết quả sau bảo đảm quay lui luôn kết thúc.

::: proposition Mệnh đề 04.11 (Quay lui Armijo kết thúc sau hữu hạn lần co)
**Giả thiết.** $f$ khả vi trên miền mở $\operatorname{dom}f$; $x\in\operatorname{dom}f$; $g^Td<0$; $\alpha\in(0,1)$, $\beta\in(0,1)$.

**Kết luận.** Có $\bar t>0$ sao cho mọi $t\in(0,\bar t]$ thỏa (2.2). Do đó quay lui dừng sau hữu hạn lần co, với bước trả về $t\ge\min\{1,\beta\bar t\}$.

**Điều kiện áp dụng.** Chỉ cần khả vi tại $x$ và miền mở.

**Phạm vi.** Mệnh đề không cho giá trị của $\bar t$; cận dưới định lượng cho bước được nhận cần giả thiết gradient Lipschitz (Bổ đề 04.23).
:::

::: proof Chứng minh Mệnh đề 04.11
**Bước 1 (mọi bước đủ nhỏ được nhận).**

Như Bước 1 của chứng minh Mệnh đề 04.7, $f(x+td)=f(x)+t\,g^Td+\xi(t)$ với $\xi(t)/t\to0$. Vì $(1-\alpha)g^Td<0$, có $\bar t>0$ sao cho với mọi $t\in(0,\bar t]$: $x+td\in\operatorname{dom}f$ và $\xi(t)/t\le-(1-\alpha)g^Td$. Khi đó $f(x+td)\le f(x)+t\,g^Td-(1-\alpha)t\,g^Td=f(x)+\alpha t\,g^Td$.

**Bước 2 (quay lui dừng).**

Dãy thử $\beta^j$ giảm về $0$, nên có chỉ số nhỏ nhất $j$ với $\beta^j\le\bar t$, và $\beta^j$ thỏa (2.2) theo Bước 1. Thủ tục dừng ở lần thử thứ $j$ hoặc sớm hơn. Nếu nó dừng ở $t=\beta^i$ với $i\ge1$ thì $\beta^{i-1}$ đã bị loại, nên $\beta^{i-1}>\bar t$, và $t=\beta\cdot\beta^{i-1}>\beta\bar t$. $\square$
:::

::: example Ví dụ 04.6 (Quay lui Armijo trên VD1)
**Dữ kiện.**

$x^0=(2,4)^T$, $d=d_G=(-6,-28)^T$, $f(x^0)=62$, $g^Td=-820$, $\alpha=\tfrac1{10}$, $\beta=\tfrac12$. Ngưỡng Armijo là $62+\tfrac1{10}t(-820)=62-82t$.

**Các lần thử.**

| Lần thử | $t$ | Điểm thử | $f$ tại điểm thử | Ngưỡng $62-82t$ | Kết luận |
|---|---|---|---|---|---|
| 1 | $1$ | $(-4,-24)^T$ | $2040$ | $-20$ | loại |
| 2 | $\tfrac12$ | $(-1,-10)^T$ | $\tfrac{703}2$ | $21$ | loại |
| 3 | $\tfrac14$ | $(\tfrac12,-3)^T$ | $\tfrac{255}8$ | $\tfrac{83}2$ | nhận |

Thủ tục nhận $t=\tfrac14$ và dừng, không thử $t=\tfrac18$. Điểm mới là $x^1=(\tfrac12,-3)^T$ với $f(x^1)=\tfrac{255}8\approx31{,}9$.

**Kiểm tra lại.**

Theo Ví dụ 04.5, (2.2) tương đương $2798t^2\le820t-82t=738t$, tức $0<t\le\frac{738}{2798}=\frac{369}{1399}\approx0{,}264$. Bước $1$ và $\tfrac12$ nằm ngoài khoảng này, bước $\tfrac14$ nằm trong.
:::

![Đồ thị theo t trên đoạn từ 0 đến khoảng 0,42 của hai đường: đường cong liền 62 trừ 820t cộng 2798t bình phương là giá trị hàm trên tia, và đường thẳng nét đứt 62 trừ 82t là ngưỡng Armijo với alpha bằng 1/10. Hai đường cắt nhau gần t bằng 0,26. Điểm t bằng 1/4 được đánh dấu, nằm dưới ngưỡng.](img/lec-04/armijo-window.svg)

Hình vẽ cả hai vế của (2.2) theo $t$. Phần đường cong nằm dưới đường thẳng là tập các bước được nhận, ở đây là đoạn $(0;\,0{,}264]$. Ba bước thử $1$, $\tfrac12$, $\tfrac14$ là ba lũy thừa của $\beta$; bước đầu tiên rơi vào đoạn được nhận là $\tfrac14$.

::: remark Nhận xét 04.12 (Vai trò của tham số $\alpha$ và ba nhầm lẫn)
**Lý do của cận $\alpha<\tfrac12$.** Xét hàm bậc hai lồi chặt có Hessian $H$ và hướng $d=-H^{-1}g$, là hướng Newton của Mục 3. Hướng này cực tiểu hóa đúng hàm bậc hai, và theo Mệnh đề 04.9(c) với $W=H$, $f(x+d)=f(x)-\tfrac12d^THd=f(x)+\tfrac12g^Td$. Bước đầy đủ $t=1$ thỏa (2.2) khi và chỉ khi $\tfrac12g^Td\le\alpha g^Td$, tức $\alpha\le\tfrac12$ vì $g^Td<0$.

Cận $\alpha<\tfrac12$ của Boyd và Vandenberghe (2004, mục 9.2, tr. 464) bảo đảm bước đầy đủ của Newton được nhận gần nghiệm.

**Ảnh hưởng của $\alpha$.** Tham số $\alpha$ lớn làm ngưỡng chặt hơn: với $\alpha=\tfrac3{10}$ trên VD1, ngưỡng là $62-246t$ và bước $\tfrac14$ bị loại vì $\tfrac{255}8>\tfrac12$.

**Ba nhầm lẫn.**

1. Bước được nhận không phải bước tối ưu trên tia: bước tối ưu của $h$ ở Ví dụ 04.5 là $t=\frac{820}{2\cdot2798}\approx0{,}147$, khác $\tfrac14$; quay lui chỉ tìm một bước đủ tốt.
2. Bước của lượt trước không dùng lại được: mỗi lượt có $g$ và $d$ mới, nên quay lui chạy lại từ $t=1$.
3. Giá trị $f$ tại điểm thử ngoài miền không được tính: với $f$ chứa $-\log$, điểm thử như vậy bị loại trước khi đánh giá.
:::

Ghép tính gradient, đặt $d=-g$, quay lui và cập nhật cho thuật toán hoàn chỉnh.

::: algorithm Thuật toán 04.1 (Giảm gradient với quay lui Armijo)
**Đầu vào.** Điểm đầu $x^0\in\operatorname{dom}f$; dung sai $\varepsilon_g>0$; tham số $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Lặp** với $k=0,1,2,\ldots$:

1. Tính $g=\nabla f(x^k)$.
2. Nếu $\lVert g\rVert_2\le\varepsilon_g$: dừng, trả về $x^k$.
3. Đặt $d=-g$.
4. Chọn $t$ bằng quay lui Armijo (Định nghĩa 04.10).
5. Cập nhật $x^{k+1}=x^k+td$.

**Đầu ra.** Điểm $x$ với $\lVert\nabla f(x)\rVert_2\le\varepsilon_g$.

**Chi phí mỗi lượt.** Một lần tính gradient và một số lần tính $f$ khi thử bước.
:::

Tiêu chí dừng $\lVert g\rVert_2\le\varepsilon_g$ được kiểm trước khi tính hướng, nên nếu điểm đầu đã đạt dung sai thì thuật toán dừng mà không cập nhật. Tiêu chí này đo mức vi phạm của (1.1): theo Mệnh đề 04.2(a), với $f$ lồi, điểm có $\nabla f=0$ là nghiệm. Chuẩn gradient nhỏ chưa cho cận của $f(x)-f^*$; cận đó cần giả thiết về độ cong và được chứng minh ở Mục 2.6 (Mệnh đề 04.25(b)).

**Trong học máy.** Thuật toán 04.1 là giảm gradient toàn lô: mỗi lượt tính gradient của mất mát trên toàn bộ dữ liệu huấn luyện. Độ dài bước $t$ là tốc độ học (learning rate); quay lui chọn nó tự động, với điều kiện giá trị mất mát tính được chính xác tại mỗi điểm thử. Khi dữ liệu lớn, Bài 05 thay gradient đầy đủ bằng gradient trên một nhóm nhỏ mẫu; giá trị mất mát lúc đó chỉ là ước lượng, nên phép kiểm (2.2) không áp dụng nguyên dạng và tốc độ học thường được chọn theo lịch cố định.

### 2.4 Độ cong không đồng đều

Quay lui chọn được bước, nhưng hướng $-g$ chưa tính đến hình dạng của $f$. Trên VD1, độ cong theo $x_2$ gấp $\tfrac73$ lần độ cong theo $x_1$. Ví dụ sau giữ bước cố định để tách riêng tác động của hướng.

::: example Ví dụ 04.7 (Giảm gradient với bước cố định trên VD1)
**Công thức lặp.**

Với $g=(3x_1,7x_2)^T$ và bước cố định $t$, cập nhật $x^+=x-tg$ cho

$$
x_1^+=(1-3t)x_1,\qquad x_2^+=(1-7t)x_2 .
$$

**Với $t=\tfrac14$, bước Armijo của Ví dụ 04.6.**

$x_1$ nhân $\tfrac14$ và giữ dấu; $x_2$ nhân $-\tfrac34$, đổi dấu ở mỗi lượt. Năm điểm đầu là $(2,4)$, $(\tfrac12,-3)$, $(\tfrac18,\tfrac94)$, $(\tfrac1{32},-\tfrac{27}{16})$, $(\tfrac1{128},\tfrac{81}{64})$, với $f$ lần lượt $62$, $\tfrac{255}8$, $\tfrac{2271}{128}\approx17{,}7$, $\tfrac{20415}{2048}\approx9{,}97$, $\tfrac{183711}{32768}\approx5{,}61$.

**Bước cố định tốt nhất.**

Tốc độ co chậm nhất là $\max\{\lvert1-3t\rvert,\lvert1-7t\rvert\}$. Hàm này nhỏ nhất khi $1-3t=7t-1$, tức $t=\tfrac15$, với giá trị $\tfrac25$.

**Kiểm tra lại.**

Tại $(\tfrac12,-3)$: $f=\tfrac12(\tfrac34+63)=\tfrac{255}8$, khớp Ví dụ 04.6. Tại $t=\tfrac15$: $1-\tfrac35=\tfrac25$ và $1-\tfrac75=-\tfrac25$, cùng trị tuyệt đối.
:::

![Đường đi của giảm gradient với bước cố định t bằng 1/4 trên các đường mức của VD1, gồm năm điểm k bằng 0 đến 4 xuất phát từ x0 bằng (2, 4). Đường đi gần như về ngay trục x2, rồi dao động qua lại hai phía trục x1 theo phương x2 với biên độ co dần theo hệ số 3/4.](img/lec-04/gradient-fixed-step.svg)

Hình cho thấy thành phần $x_1$ gần như triệt tiêu sau hai bước, còn thành phần $x_2$ dao động hai phía trục $x_1$ và chỉ co theo hệ số $\tfrac34$. Không có bước cố định nào làm cả hai thành phần co nhanh: bước đủ nhỏ để $x_2$ không dao động thì làm $x_1$ co chậm. Tỷ số giữa độ cong lớn nhất và nhỏ nhất quyết định giới hạn này.

::: remark Nhận xét 04.13 (Số điều kiện)
Với hàm bậc hai lồi chặt có Hessian $P$, các giá trị riêng $\lambda_{\min}\le\cdots\le\lambda_{\max}$ của $P$ là độ cong theo các vector riêng. Bước cố định $t$ nhân thành phần theo vector riêng thứ $i$ với $1-t\lambda_i$. Giá trị lớn nhất của $\lvert1-t\lambda_i\rvert$ nhỏ nhất tại $t=2/(\lambda_{\min}+\lambda_{\max})$ và bằng $(\kappa-1)/(\kappa+1)$, với $\kappa=\lambda_{\max}/\lambda_{\min}$ là số điều kiện (condition number). VD1 có $\kappa=\tfrac73$ và hệ số $\frac{4/3}{10/3}=\tfrac25$, khớp Ví dụ 04.7.

Khi $\kappa$ lớn, hệ số này gần $1$ và giảm gradient chậm. Nguyên nhân nằm ở bài con: số hạng $\tfrac12\lVert d\rVert_2^2$ phạt bước như nhau theo mọi phương, trong khi hàm cong khác nhau theo từng phương. Nhầm lẫn thường gặp là quy sự chậm cho quy tắc chọn bước; ví dụ sau dùng bước tối ưu trên tia và vẫn chậm.
:::

::: example Ví dụ 04.8 (Tìm kiếm đường chính xác trên một hàm có số điều kiện 10)
Ví dụ theo Boyd và Vandenberghe (2004, mục 9.3.2, tr. 469–470); mọi con số được tính lại.

**Dữ kiện.**

$f(x)=\tfrac12(x_1^2+10x_2^2)$, Hessian $\operatorname{diag}(1,10)$, $\kappa=10$, điểm đầu $x^{(0)}=(10,1)^T$ với $f=55$. Tại mỗi lượt, $d=-g$ và $t$ cực tiểu hóa $f(x+td)$ trên $t>0$.

**Lượt đầu.**

$g=(10,10)^T$, bước chính xác $t=\frac{g^Tg}{g^T\operatorname{diag}(1,10)g}=\frac{200}{1100}=\frac2{11}$, điểm mới $x^{(1)}=(\tfrac{90}{11},-\tfrac9{11})^T$.

**Dạng đóng.**

Với $c=\tfrac9{11}$, mọi lượt dùng cùng bước $\tfrac2{11}$ và cho $x^{(k)}=(10c^k,(-c)^k)^T$, $f(x^{(k)})=55c^{2k}$. Phép kiểm bằng quy nạp: tại $x^{(k)}$, $g=(10c^k,10(-c)^k)^T$, nên bước chính xác là $\frac{g^Tg}{g^T\operatorname{diag}(1,10)g}=\frac{200c^{2k}}{1100c^{2k}}=\frac2{11}$.

**Kiểm tra lại.**

$f(x^{(1)})=\tfrac12\bigl(\tfrac{8100}{121}+\tfrac{810}{121}\bigr)=\tfrac{4455}{121}=55\cdot\tfrac{81}{121}$. Hệ số $c=\frac{\kappa-1}{\kappa+1}=\tfrac9{11}$.
:::

![Các elip là đường mức của một nửa của x1 bình phương cộng 10 x2 bình phương. Quỹ đạo giảm gradient với tìm kiếm đường chính xác xuất phát từ (10, 1), qua (90/11, âm 9/11), đi zích zắc giữa hai phía trục x1 và tiến chậm về gốc; tọa độ thỏa x1 bằng 10 nhân rho mũ k, x2 bằng âm rho mũ k với rho bằng 9/11. Một chú thích ghi rằng hệ Newton H d bằng âm g đưa tới gốc sau một bước.](img/lec-04/quadratic-zigzag.svg)

Hình vẽ quỹ đạo zích zắc của Ví dụ 04.8, với hệ số $c$ ký hiệu là $\rho$ trên hình: mỗi bước tối ưu trên tia nhưng hướng $-g$ gần vuông góc với phương tới gốc. Sai số mục tiêu chỉ giảm theo hệ số $c^2=\tfrac{81}{121}\approx0{,}67$ mỗi lượt, và cần $k\ge\log(5500)/\log(121/81)\approx21{,}5$, tức $22$ lượt, để $f(x^{(k)})\le0{,}01$.

::: exercise Bài tập 04.2
Cho $f(x)=x_1^2+4x_2^2$ trên $\mathbb R^2$ và $x^0=(2,1)^T$.

- (a) Tính $g=\nabla f(x^0)$, hướng gradient $d_G$ và $g^Td_G$.
- (b) Với $\alpha=\tfrac14$, $\beta=\tfrac12$, chạy quay lui Armijo theo $d_G$: lập bảng các lần thử, nêu bước được nhận và điểm mới.
- (c) Xác định chính xác tập các bước thỏa (2.2) và đối chiếu với kết quả (b).
:::

::: hint
Viết $f(x^0+td_G)$ thành đa thức bậc hai theo $t$. Ngưỡng Armijo là $f(x^0)-\alpha t\lVert g\rVert_2^2$.
:::

::: solution
**Câu (a).**

$\nabla f(x)=(2x_1,8x_2)^T$, nên $g=(4,8)^T$, $d_G=(-4,-8)^T$, $g^Td_G=-80$, $f(x^0)=4+4=8$.

**Câu (b).**

Ngưỡng là $8-\tfrac14\cdot80t=8-20t$.

| $t$ | Điểm thử | $f$ | Ngưỡng | Kết luận |
|---|---|---|---|---|
| $1$ | $(-2,-7)^T$ | $4+196=200$ | $-12$ | loại |
| $\tfrac12$ | $(0,-3)^T$ | $36$ | $-2$ | loại |
| $\tfrac14$ | $(1,-1)^T$ | $5$ | $3$ | loại |
| $\tfrac18$ | $(\tfrac32,0)^T$ | $\tfrac94$ | $\tfrac{11}2$ | nhận |

Bước được nhận là $t=\tfrac18$, điểm mới $x^1=(\tfrac32,0)^T$.

**Câu (c).**

$f(x^0+td_G)=(2-4t)^2+4(1-8t)^2=8-80t+272t^2$. Điều kiện (2.2) là $272t^2\le60t$, tức $0<t\le\tfrac{15}{68}\approx0{,}221$.

**Kiểm tra lại.**

$\tfrac14=0{,}25>0{,}221$ bị loại và $\tfrac18=0{,}125<0{,}221$ được nhận, khớp bảng. Tọa độ thứ hai về $0$ vì $1-8\cdot\tfrac18=0$: bước $\tfrac18$ trùng nghịch đảo độ cong $8$ theo phương $x_2$.
:::

### 2.5 Hướng giảm dốc nhất theo chuẩn có trọng số

Ví dụ 04.7 và 04.8 cho thấy hướng $-g$ đo độ dài bước bằng chuẩn Euclid, một thước đo như nhau theo mọi phương. Trực giác, chưa phải định nghĩa: nếu đo độ dài bằng một thước có trọng số lớn theo phương có độ cong lớn, thì một bước "dài một đơn vị" theo thước mới sẽ ngắn theo phương cong nhiều và dài theo phương cong ít. Câu hỏi "hướng nào giảm $f$ nhanh nhất trên mỗi đơn vị độ dài" có câu trả lời phụ thuộc vào thước đo được chọn.

![Hình tròn đơn vị v1 bình phương cộng v2 bình phương không quá 1 trong mặt phẳng (v1, v2), cùng một đường thẳng có pháp tuyến g bằng (6, 28) tiếp xúc với hình tròn. Tiếp điểm là hướng làm g chuyển vị v nhỏ nhất trên hình tròn, nằm ngược chiều g.](img/lec-04/euclidean-unit.svg)

![Elip 3 v1 bình phương cộng 7 v2 bình phương không quá 1, dẹt theo trục v2, cùng một đường thẳng 6 v1 cộng 28 v2 bằng hằng số tiếp xúc với elip. Tiếp điểm là hướng làm g chuyển vị v nhỏ nhất trên elip; hướng này không ngược chiều g mà lệch về phía trục v1.](img/lec-04/weighted-unit.svg)

Hai hình đặt cùng gradient $g=(6,28)^T$ của VD1 lên hai tập đơn vị. Trên hình tròn, tiếp điểm với đường mức thấp nhất của hàm tuyến tính $g^Tv$ nằm ngược chiều $g$. Trên elip $3v_1^2+7v_2^2\le1$, tiếp điểm lệch về phía trục $v_1$, phương mà VD1 cong ít. Định nghĩa sau làm chính xác thước đo và bài toán chọn hướng.

::: definition Định nghĩa 04.14 (Chuẩn có trọng số, hướng dốc nhất và chuẩn đối ngẫu)
Cho ma trận đối xứng $W\in\mathbb R^{n\times n}$, $W\succ0$, và $g\in\mathbb R^n$, $g\ne0$.

- **Chuẩn có trọng số** của $v\in\mathbb R^n$ là $\lVert v\rVert_W=\sqrt{v^TWv}$.
- **Hướng giảm dốc nhất chuẩn hóa** (normalized steepest descent direction) theo $\lVert\cdot\rVert_W$ là nghiệm $v_W$ của bài con

$$
\underset{v\in\mathbb R^n}{\operatorname{minimize}}\quad g^Tv\qquad\text{subject to}\quad v^TWv\le1 .
$$

- **Chuẩn đối ngẫu** (dual norm) của $g$ là $\lVert g\rVert_{W,*}=\max\{g^Tv\mid\lVert v\rVert_W\le1\}$.
- **Hướng giảm dốc nhất** theo $\lVert\cdot\rVert_W$ là $d=\lVert g\rVert_{W,*}\,v_W$.
:::

Chuẩn $\lVert\cdot\rVert_W$ là một chuẩn vì $\lVert v\rVert_W=\lVert W^{1/2}v\rVert_2$; quả cầu đơn vị của nó là một elip, ngắn theo phương có trọng số lớn. Bài con có ràng buộc $v^TWv\le1$ vì không có ràng buộc độ dài thì $g^Tv$ không bị chặn dưới (Mục 2.1). Hướng chuẩn hóa có độ dài $1$ và chỉ cho phương; hướng $d$ được nhân thêm hệ số $\lVert g\rVert_{W,*}$ để có độ dài dùng được trong phép cập nhật.

Với $W=I$, chuẩn có trọng số là chuẩn Euclid, chuẩn đối ngẫu là $\lVert g\rVert_2$ theo Cauchy–Schwarz, và hướng chuẩn hóa là $-g/\lVert g\rVert_2$; khi đó $d=-g=d_G$. Khái niệm vì vậy tổng quát hóa hướng gradient của Định nghĩa 04.8.

Boyd và Vandenberghe (2004, mục 9.4, tr. 475–481) định nghĩa hướng dốc nhất cho một chuẩn bất kỳ; với chuẩn $\ell_1$, nghiệm là một vector đơn vị tọa độ và phương pháp thành giảm theo tọa độ. Chương chỉ dùng chuẩn bậc hai, trường hợp mà bài con có nghiệm dạng đóng.

Kết quả sau giải bài con bằng hệ KKT của Bài 03. Bài con có một ràng buộc bất đẳng thức, nên đây là chỗ duy nhất trong chương dùng đủ bốn nhóm điều kiện.

::: proposition Mệnh đề 04.15 (Hướng dốc nhất theo chuẩn có trọng số)
**Giả thiết.** $W$ đối xứng, $W\succ0$; $g\ne0$.

**Kết luận.**

- (a) Bài con của Định nghĩa 04.14 có nghiệm duy nhất

$$
v_W=-\frac{W^{-1}g}{\sqrt{g^TW^{-1}g}} .
$$

- (b) $\lVert g\rVert_{W,*}=\sqrt{g^TW^{-1}g}$.
- (c) Hướng dốc nhất là $d=-W^{-1}g$, tức nghiệm của $Wd=-g$, và trùng nghiệm của mô hình $Q_W$ (Mệnh đề 04.9).

**Điều kiện áp dụng.** Cần $W\succ0$ và $g\ne0$. Khi $g=0$, mọi $v$ khả thi đều cho $g^Tv=0$, công thức (a) chia cho $0$, và điểm hiện tại đã thỏa (1.1).

**Phạm vi.** Công thức đóng chỉ đúng cho chuẩn bậc hai. Mệnh đề không nói gì về việc chọn $W$.
:::

::: proof Chứng minh Mệnh đề 04.15
**Bước 1 (tồn tại nghiệm và hệ KKT).**

Tập khả thi $\{v\mid v^TWv\le1\}$ đóng, bị chặn và không rỗng, mục tiêu tuyến tính liên tục, nên bài con có nghiệm theo Định lý 01.36. Bài con lồi và $v=0$ thỏa chặt ràng buộc ($0<1$), nên theo Hệ quả 03.31 và Định lý 03.32, $v$ là nghiệm khi và chỉ khi có $\zeta$ thỏa hệ KKT. Với hàm Lagrange $L_s(v,\zeta)=g^Tv+\zeta(v^TWv-1)$, bốn nhóm là:

1. dừng: $g+2\zeta Wv=0$;
2. khả thi gốc: $v^TWv\le1$;
3. khả thi đối ngẫu: $\zeta\ge0$;
4. bù trừ: $\zeta(v^TWv-1)=0$.

Nhân tử $\zeta$ của bài con khác nhân tử $\lambda$ của Bài 03.

**Bước 2 (nhân tử dương).**

Nếu $\zeta=0$ thì nhóm dừng cho $g=0$, trái giả thiết. Vậy $\zeta>0$.

**Bước 3 (ràng buộc hoạt động).**

$\zeta>0$ và nhóm bù trừ buộc $v^TWv=1$: nghiệm nằm trên biên elip.

**Bước 4 (giải).**

Từ nhóm dừng, $v=-\frac1{2\zeta}W^{-1}g$. Thay vào $v^TWv=1$:

$$
\frac{g^TW^{-1}WW^{-1}g}{4\zeta^2}=\frac{g^TW^{-1}g}{4\zeta^2}=1,
$$

nên $\zeta=\tfrac12\sqrt{g^TW^{-1}g}$, chọn căn dương vì $\zeta>0$. Thay ngược lại được công thức (a). Nghiệm duy nhất vì $\zeta$ và $v$ được xác định duy nhất từ hệ.

**Bước 5 (chuẩn đối ngẫu).**

Quả cầu $\lVert v\rVert_W\le1$ đối xứng qua gốc, nên

$$
\begin{aligned}
\max_{\lVert v\rVert_W\le1}g^Tv&=-\min_{\lVert v\rVert_W\le1}g^Tv\\
&=-g^Tv_W\\
&=\frac{g^TW^{-1}g}{\sqrt{g^TW^{-1}g}}\\
&=\sqrt{g^TW^{-1}g}.
\end{aligned}
$$

Dòng thứ hai dùng (a); dòng thứ ba thay công thức của $v_W$.

**Bước 6 (hướng không chuẩn hóa).**

$$
\begin{aligned}
d&=\lVert g\rVert_{W,*}\,v_W\\
&=\sqrt{g^TW^{-1}g}\cdot\Bigl(-\frac{W^{-1}g}{\sqrt{g^TW^{-1}g}}\Bigr)\\
&=-W^{-1}g .
\end{aligned}
$$

Dòng đầu là Định nghĩa 04.14; dòng thứ hai thay kết quả của Bước 4 và Bước 5.

Theo Mệnh đề 04.9(a), đây là nghiệm duy nhất của $\min Q_W$. $\square$
:::

Có một cách kiểm khác cho phần (b) không dùng KKT. Viết $g^Tv=(W^{-1/2}g)^T(W^{1/2}v)$; theo Cauchy–Schwarz, $\lvert g^Tv\rvert\le\lVert W^{-1/2}g\rVert_2\lVert W^{1/2}v\rVert_2=\sqrt{g^TW^{-1}g}\,\lVert v\rVert_W$. Vế phải bằng $\sqrt{g^TW^{-1}g}$ khi $\lVert v\rVert_W=1$, và $v=-v_W$ đạt dấu bằng. Chuẩn đối ngẫu vì vậy là hằng số tốt nhất trong bất đẳng thức Cauchy–Schwarz suy rộng $\lvert g^Tv\rvert\le\lVert g\rVert_{W,*}\lVert v\rVert_W$.

Mệnh đề 04.15 nối hai cách nhìn của cùng một hướng: hướng dốc nhất theo chuẩn $\lVert\cdot\rVert_W$ là nghiệm của mô hình bậc hai $Q_W$. Mọi hướng của Mục 2 và Mục 3 vì vậy có chung một khuôn: chọn $W\succ0$, giải $Wd=-g$. Với $W=I$ được hướng gradient; với $W$ cố định khác được hướng dốc nhất có trọng số; với $W$ bằng Hessian tại điểm hiện tại được hướng Newton.

::: example Ví dụ 04.9 (Hướng dốc nhất trên VD1 với trọng số theo độ cong)
**Dữ kiện.**

$g=(6,28)^T$ tại $x^0=(2,4)^T$; chọn $W=\operatorname{diag}(3,7)$, trùng Hessian của VD1. Lựa chọn này là một quyết định mô hình; hệ KKT không bắt buộc nó.

**Tính.**

Giải $Wd=-g$ theo từng tọa độ: $3d_1=-6$, $7d_2=-28$, nên $d=(-2,-4)^T$. Khi đó $W^{-1}g=(2,4)^T$, $g^TW^{-1}g=12+112=124$, $\lVert g\rVert_{W,*}=\sqrt{124}$ và $v_W=-(2,4)^T/\sqrt{124}$.

**Bước đầy đủ.**

$x^0+d=(0,0)^T$, đúng nghiệm của VD1. Mức giảm mô hình là $\tfrac12d^TWd=\tfrac12\cdot124=62$, bằng mức giảm thật $f(x^0)-f(0)=62$.

**Kiểm tra lại.**

$v_W^TWv_W=\frac{3\cdot4+7\cdot16}{124}=1$, nên $v_W$ nằm trên biên elip. Hệ được giải bằng hai phép chia, không lập $W^{-1}$ tường minh.
:::

![Hai khung cạnh nhau. Khung trái: elip 3 v1 bình phương cộng 7 v2 bình phương bằng 1 trong tọa độ (v1, v2), với một mũi tên chỉ hướng tối ưu. Khung phải: sau phép đổi biến z bằng (căn 3 nhân v1, căn 7 nhân v2), elip thành đường tròn đơn vị z1 bình phương cộng z2 bình phương bằng 1, và mũi tên tương ứng là cùng hướng tối ưu biểu diễn trong tọa độ mới.](img/lec-04/metric-transform.svg)

Hình giải thích vì sao Ví dụ 04.9 kết thúc sau một bước. Phép đổi biến $z=W^{1/2}v$ biến elip đơn vị thành hình tròn đơn vị. Trong tọa độ $z$, hàm VD1 trở thành $\tfrac12\lVert z\rVert_2^2$, có cùng độ cong $1$ theo mọi phương, và hướng gradient trỏ thẳng vào nghiệm.

::: remark Nhận xét 04.16 (Ba đại lượng, phép đổi biến và giới hạn của trọng số cố định)
**Ba đại lượng không hoán đổi được.** Trong Ví dụ 04.9, $\lVert v_W\rVert_W=1$ là độ dài của hướng chuẩn hóa; $d^TWd=124$ là bình phương độ dài của hướng không chuẩn hóa theo $W$; $t$ là độ dài bước do quay lui chọn sau đó. Nhầm $v_W$ với $d$ làm bước ngắn đi $\sqrt{124}$ lần.

**Đổi biến.** Đặt $x=W^{-1/2}y$ và $\tilde f(y)=f(W^{-1/2}y)$. Theo quy tắc dây chuyền, $\nabla\tilde f(y)=W^{-1/2}g$. Một bước gradient trên $\tilde f$ là $y^+=y-tW^{-1/2}g$; quay về biến $x$: $x^+=W^{-1/2}y^+=x-tW^{-1}g$. Vậy hướng dốc nhất theo $\lVert\cdot\rVert_W$ là giảm gradient trong hệ tọa độ đã đổi biến; phép đổi biến này gọi là tiền điều kiện (preconditioning).

**Giới hạn.** VD1 có Hessian không đổi, nên một $W$ cố định trùng Hessian ở mọi điểm. Với hàm không bậc hai, Hessian thay đổi theo điểm và không ma trận cố định nào trùng nó ở mọi điểm lặp. Mục 3 thay $W$ bằng Hessian tính lại tại từng điểm.
:::

**Trong học máy.** Với mô hình tuyến tính $Xw$, chia mỗi cột đặc trưng cho độ lệch chuẩn của nó tạo ra dữ liệu mới $XS^{-1}$ với $S$ đường chéo dương, tức đổi biến $\tilde w=Sw$. Theo Nhận xét 04.16 với $W=S^2$, giảm gradient trên dữ liệu đã chia là phương pháp dốc nhất có trọng số đường chéo trên dữ liệu gốc. Số điều kiện giảm khi các cột khác nhau chủ yếu về thang đo; Tình huống 04.1 cho thấy tương quan giữa các cột vẫn giữ $\kappa$ lớn.

Phép trừ trung bình của từng cột thì kéo theo một phép đổi biến affine giữa trọng số và hệ số chặn, nên chỉ cho bài tương đương khi mô hình có hệ số chặn không bị chính quy hóa. Với mô hình phi tuyến như mạng sâu, chuẩn hóa dữ liệu không còn là một phép đổi biến của tham số, và các bộ tối ưu có tốc độ học thích nghi theo từng tham số dùng một ma trận đường chéo thay đổi theo lượt (Goodfellow, Bengio và Courville 2016, mục 8.5, tr. 306–310).

::: exercise Bài tập 04.3
Tại điểm $x^1=(\tfrac12,-3)^T$ của VD1, nhận được sau lượt quay lui ở Ví dụ 04.6:

- (a) tính $g=\nabla f(x^1)$;
- (b) với $W=\operatorname{diag}(3,7)$, viết điều kiện dừng của $Q_W$, giải $d$, tính $x^1+d$ và $\lVert d\rVert_W^2$;
- (c) tính $\lVert g\rVert_{W,*}$ và $v_W$.
:::

::: hint
Điều kiện dừng của $Q_W$ là (2.1).
:::

::: solution
**Câu (a).**

$g=(3\cdot\tfrac12,\,7\cdot(-3))^T=(\tfrac32,-21)^T$.

**Câu (b).**

$Wd=-g$: $3d_1=-\tfrac32$ và $7d_2=21$, nên $d=(-\tfrac12,3)^T$. Điểm mới $x^1+d=(0,0)^T$, nghiệm của VD1. $\lVert d\rVert_W^2=3\cdot\tfrac14+7\cdot9=\tfrac34+63=\tfrac{255}4$.

**Câu (c).**

$W^{-1}g=(\tfrac12,-3)^T$ và $g^TW^{-1}g=\tfrac34+63=\tfrac{255}4$, nên $\lVert g\rVert_{W,*}=\tfrac{\sqrt{255}}2$ và $v_W=-\frac{W^{-1}g}{\lVert g\rVert_{W,*}}=\frac{(-1,6)^T}{\sqrt{255}}$. Kiểm: $v_W^TWv_W=\frac{3+7\cdot36}{255}=1$.

**Kiểm tra lại.**

Theo Mệnh đề 04.9(c), mức giảm mô hình ở (b) là $\tfrac12\cdot\tfrac{255}4=\tfrac{255}8=f(x^1)-0$, khớp mức giảm thật vì $W$ trùng Hessian của hàm bậc hai.
:::

### 2.6 Hội tụ của giảm gradient

Thuật toán 04.1 dừng khi $\lVert g\rVert_2\le\varepsilon_g$, nhưng chưa có bảo đảm nào rằng nó dừng, cũng chưa biết sau $k$ lượt thì $f(x^k)-f^*$ nhỏ đến đâu. Ví dụ 04.7 cho thấy bước cố định quá lớn làm dãy phân kỳ: với $t>\tfrac27$, $\lvert1-7t\rvert>1$ và $\lvert x_2^k\rvert\to\infty$. Ngưỡng $\tfrac27$ do độ cong lớn nhất $7$ quyết định. Mục này phát biểu giả thiết chặn trên độ cong, chứng minh ba cận hội tụ, và đọc chúng trên VD1.

Trực giác cho giả thiết: nếu độ cong của $f$ không vượt $L$ ở mọi nơi, thì tại mỗi điểm, đồ thị của $f$ nằm dưới một parabol độ cong $L$ tiếp xúc với nó. Cực tiểu hóa parabol đó cho một bước có mức giảm bảo đảm.

::: definition Định nghĩa 04.17 (Gradient Lipschitz)
Hàm $f:\mathbb R^n\to\mathbb R$ khả vi có gradient $L$-Lipschitz, với hằng số $L>0$, nếu

$$
\lVert\nabla f(x)-\nabla f(y)\rVert_2\le L\lVert x-y\rVert_2\qquad\forall x,y\in\mathbb R^n .
$$
:::

Định nghĩa nói rằng gradient thay đổi không nhanh hơn $L$ lần khoảng cách. Đây là một giả thiết toàn cục, trên cả $\mathbb R^n$.

Ví dụ: $f(x)=\tfrac12x^TPx$ với $P$ đối xứng có $\nabla f(x)-\nabla f(y)=P(x-y)$, nên $L=\lVert P\rVert_2$, giá trị riêng có trị tuyệt đối lớn nhất. Phản ví dụ là $\varphi(s)=s-\log s$ trên $s>0$, với $\varphi''(s)=1/s^2$ không bị chặn khi $s\to0$, nên không có hằng số $L$ nào dùng được trên cả miền.

Gradient Lipschitz là giả thiết chặn trên độ cong, khác với tính lồi mạnh (Định nghĩa 01.39) là giả thiết chặn dưới độ cong. Bổ đề sau chuyển giả thiết thành cận trên của chính $f$.

::: lemma Bổ đề 04.18 (Cận trên bậc hai)
**Giả thiết.** $f:\mathbb R^n\to\mathbb R$ khả vi, gradient $L$-Lipschitz.

**Kết luận.** Với mọi $x,y\in\mathbb R^n$,

$$
f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac L2\lVert y-x\rVert_2^2 .
\tag{2.3}
$$

**Điều kiện áp dụng.** Không cần tính lồi.

**Phạm vi.** Bổ đề cho cận trên; cận dưới tương ứng cần tính lồi (Định lý 01.26) hoặc lồi mạnh (Mệnh đề 04.25).
:::

::: proof Chứng minh Bổ đề 04.18
**Bước 1 (biểu diễn tích phân).**

Đặt $\Delta=y-x$. Hàm một biến $\tau\mapsto f(x+\tau\Delta)$ có đạo hàm $\nabla f(x+\tau\Delta)^T\Delta$ theo quy tắc dây chuyền, nên

$$
f(y)-f(x)-\nabla f(x)^T\Delta=\int_0^1\bigl(\nabla f(x+\tau\Delta)-\nabla f(x)\bigr)^T\Delta\,d\tau .
$$

**Bước 2 (chặn biểu thức dưới dấu tích phân).**

Theo Cauchy–Schwarz rồi Định nghĩa 04.17,

$$
\bigl(\nabla f(x+\tau\Delta)-\nabla f(x)\bigr)^T\Delta\le\lVert\nabla f(x+\tau\Delta)-\nabla f(x)\rVert_2\lVert\Delta\rVert_2\le L\tau\lVert\Delta\rVert_2^2 .
$$

**Bước 3 (tích phân).**

$\int_0^1L\tau\lVert\Delta\rVert_2^2\,d\tau=\frac L2\lVert\Delta\rVert_2^2$. Thay vào Bước 1 được (2.3). $\square$
:::

Bổ đề 04.18 nói rằng parabol $q(y)=f(x)+\nabla f(x)^T(y-x)+\tfrac L2\lVert y-x\rVert_2^2$, tiếp xúc với $f$ tại $x$, nằm trên đồ thị của $f$. Khi $f$ lồi, tiếp tuyến tại $x$ nằm dưới đồ thị (Định lý 01.26), nên $f$ bị kẹp giữa một hàm affine và một parabol tại mỗi điểm.

::: remark Nhận xét 04.19 (Kiểm tra gradient Lipschitz qua Hessian)
**Tiêu chuẩn.** Nếu $f$ khả vi hai lần và $-LI\preceq\nabla^2f(x)\preceq LI$ với mọi $x$, thì gradient $L$-Lipschitz. Thật vậy, $\nabla f(y)-\nabla f(x)=\int_0^1\nabla^2f(x+\tau(y-x))(y-x)\,d\tau$, và một ma trận đối xứng có mọi giá trị riêng trong $[-L,L]$ có chuẩn phổ không vượt $L$. Khi $f$ lồi, cận dưới tự đúng vì $\nabla^2f\succeq0$, nên chỉ cần $\nabla^2f\preceq LI$.

**Hai ví dụ.** VD1 có $\nabla^2f=\operatorname{diag}(3,7)$, nên $L=7$. Hàm $s\mapsto\log(1+e^s)$, mất mát logistic viết theo $s=-m$, có đạo hàm bậc hai $\sigma(s)(1-\sigma(s))\le\tfrac14$ theo Mệnh đề 01.9(c), nên $L=\tfrac14$.

**Dữ liệu nhiều mẫu.** Cho $N_s$ mẫu với đặc trưng $a_i\in\mathbb R^n$, xếp thành các hàng $a_i^T$ của ma trận $X\in\mathbb R^{N_s\times n}$, và nhãn $y_i\in\{-1,+1\}$. Mất mát logistic là tổng $\sum_{i=1}^{N_s}\ell(m_i)$ theo các biên $m_i=y_ia_i^Tw$. Hessian của tổng là $\sum_i\ell''(m_i)a_ia_i^T\preceq\tfrac14X^TX$, vì $y_i^2=1$, nên có thể lấy $L=\tfrac14\lambda_{\max}(X^TX)$.
:::

![Đồ thị hàm f của s bằng log của 1 cộng e mũ s trên đoạn từ âm 4 đến 4 (nét liền), parabol cận trên q với L bằng 1/4 dựng tại s bằng 1 (nét đứt) và tiếp tuyến tại s bằng 1 (nét chấm). Ba đường chạm nhau tại s bằng 1, nơi f bằng khoảng 1,313 và độ dốc bằng khoảng 0,731. Parabol nằm trên f, tiếp tuyến nằm dưới f.](img/lec-04/lipschitz-upper-bound.svg)

Hình vẽ cho $f(s)=\log(1+e^s)$ cả hai cận tại $s=1$, với $f(1)\approx1{,}3133$ và $f'(1)=\sigma(1)\approx0{,}7311$. Tại $s=-3$: $f(-3)\approx0{,}0486$, parabol cho $1{,}3133-4\cdot0{,}7311+\tfrac18\cdot16\approx0{,}3890$, tiếp tuyến cho $\approx-1{,}6110$. Thứ tự $-1{,}6110\le0{,}0486\le0{,}3890$ khớp với hai cận.

Thay $y$ bằng một bước gradient trong (2.3) cho mức giảm bảo đảm mà không cần quay lui.

::: lemma Bổ đề 04.20 (Bổ đề giảm)
**Giả thiết.** $f$ khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz; $x\in\mathbb R^n$, $g=\nabla f(x)$; $t\in(0,\tfrac1L]$.

**Kết luận.**

$$
f(x-tg)\le f(x)-t\Bigl(1-\frac{Lt}2\Bigr)\lVert g\rVert_2^2\le f(x)-\frac t2\lVert g\rVert_2^2 .
$$

Nói riêng, với $t=\tfrac1L$: $f\bigl(x-\tfrac1Lg\bigr)\le f(x)-\frac1{2L}\lVert g\rVert_2^2$.

**Điều kiện áp dụng.** Không cần tính lồi.

**Phạm vi.** Bổ đề so $f(x^+)$ với $f(x)$, không so với $f^*$.
:::

::: proof Chứng minh Bổ đề 04.20
**Bước 1 (thế vào cận trên).**

Thay $y=x-tg$ vào (2.3): số hạng bậc nhất là $g^T(-tg)=-t\lVert g\rVert_2^2$, số hạng bậc hai là $\tfrac L2t^2\lVert g\rVert_2^2$. Cộng lại được bất đẳng thức thứ nhất.

**Bước 2 (dùng $t\le\tfrac1L$).**

Khi $t\le\tfrac1L$, $Lt\le1$, nên $1-\tfrac{Lt}2\ge\tfrac12$, cho bất đẳng thức thứ hai. Với $t=\tfrac1L$: $\tfrac1L\cdot\tfrac12\lVert g\rVert_2^2=\frac1{2L}\lVert g\rVert_2^2$. $\square$
:::

Bước $t=\tfrac1L$ cực tiểu hóa vế phải $f(x)-t\lVert g\rVert_2^2+\tfrac{Lt^2}2\lVert g\rVert_2^2$ theo $t$, vì đạo hàm $(-1+Lt)\lVert g\rVert_2^2$ triệt tiêu tại đó.

Bổ đề 04.20 có hai hệ quả trực tiếp:

1. dãy $f(x^k)$ của giảm gradient với bước $\tfrac1L$ không tăng, và giảm thật sự khi $g\ne0$;
2. với $d=-g$, vế phải của (2.2) là $f(x)-\alpha t\lVert g\rVert_2^2$, nên mọi bước $t\le\tfrac1L$ thỏa (2.2) khi $\alpha\le\tfrac12$, điều Bổ đề 04.23 dùng.

::: example Ví dụ 04.10 (Bước cố định $1/L$ trên VD1)
**Tính.**

$L=7$, $g=(6,28)^T$, $\lVert g\rVert_2^2=820$. Bước $x^1=x^0-\tfrac17g=(2-\tfrac67,\,4-4)^T=(\tfrac87,0)^T$, với $f(x^1)=\tfrac12\cdot3\cdot\tfrac{64}{49}=\tfrac{96}{49}\approx1{,}96$.

**Đối chiếu với bổ đề.**

Cận của Bổ đề 04.20 là $62-\frac{820}{14}=\frac{24}7\approx3{,}43$.

**Kiểm tra lại.**

$\tfrac{96}{49}\le\tfrac{24}7=\tfrac{168}{49}$. Tọa độ thứ hai về $0$ sau một bước vì $L=7$ trùng độ cong theo $x_2$; tọa độ thứ nhất nhân $1-\tfrac37=\tfrac47$.
:::

Bổ đề giảm cho biết $f$ giảm ít nhất bao nhiêu, nhưng chưa cho biết $f(x^k)$ tới $f^*$ nhanh đến đâu. Để so với $f^*$ cần thêm tính lồi, dưới dạng tiếp tuyến nằm dưới đồ thị, và sự tồn tại một điểm cực tiểu.

::: lemma Bổ đề 04.21 (Bất đẳng thức một bước)
**Giả thiết.** $f$ lồi, khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz; $f$ đạt cực tiểu tại $x^*$, $f^*=f(x^*)$; $x\in\mathbb R^n$, $g=\nabla f(x)$, $x^+=x-\tfrac1Lg$.

**Kết luận.**

$$
f(x^+)-f^*\le\frac L2\Bigl(\lVert x-x^*\rVert_2^2-\lVert x^+-x^*\rVert_2^2\Bigr).
$$

Nói riêng, $\lVert x^+-x^*\rVert_2\le\lVert x-x^*\rVert_2$.

**Điều kiện áp dụng.** $x^*$ là một điểm cực tiểu bất kỳ; nghiệm không cần duy nhất.

**Phạm vi.** Bất đẳng thức cho một bước; cận theo số bước là Định lý 04.22.
:::

::: proof Chứng minh Bổ đề 04.21
**Bước 1 (bổ đề giảm).**

Theo Bổ đề 04.20 với $t=\tfrac1L$: $f(x^+)\le f(x)-\frac1{2L}\lVert g\rVert_2^2$.

**Bước 2 (tính lồi).**

Theo Định lý 01.26 với hai điểm $x$ và $x^*$: $f^*\ge f(x)+g^T(x^*-x)$, tức $f(x)\le f^*+g^T(x-x^*)$. Ghép với Bước 1:

$$
f(x^+)-f^*\le g^T(x-x^*)-\frac1{2L}\lVert g\rVert_2^2 .
$$

**Bước 3 (đại số).**

Khai triển bình phương:

$$
\begin{aligned}
\lVert x^+-x^*\rVert_2^2&=\Bigl\lVert x-x^*-\tfrac1Lg\Bigr\rVert_2^2\\
&=\lVert x-x^*\rVert_2^2-\tfrac2Lg^T(x-x^*)+\tfrac1{L^2}\lVert g\rVert_2^2 .
\end{aligned}
$$

Nhân hai vế với $\tfrac L2$ và chuyển vế: $g^T(x-x^*)-\frac1{2L}\lVert g\rVert_2^2=\tfrac L2\bigl(\lVert x-x^*\rVert_2^2-\lVert x^+-x^*\rVert_2^2\bigr)$. Thay vào Bước 2 được kết luận.

**Bước 4 (khoảng cách không tăng).**

Vế trái của kết luận không âm vì $f^*\le f(x^+)$, nên hiệu trong ngoặc không âm. $\square$
:::

Vế phải của Bổ đề 04.21 là hiệu của hai số hạng liên tiếp cùng dạng. Cộng các bất đẳng thức này theo $k$ bước làm các số hạng giữa triệt tiêu; phép cộng như vậy gọi là tổng lồng (telescoping sum).

::: theorem Định lý 04.22 (Tốc độ $O(1/k)$ của giảm gradient với bước $1/L$)
**Giả thiết.** $f$ lồi, khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz; $f$ đạt cực tiểu tại $x^*$. Dãy $x^{k+1}=x^k-\tfrac1L\nabla f(x^k)$ xuất phát từ $x^0\in\mathbb R^n$.

**Kết luận.** Với mọi $k\ge1$,

$$
f(x^k)-f^*\le\frac{L\lVert x^0-x^*\rVert_2^2}{2k} .
\tag{2.4}
$$

Do đó $f(x^k)-f^*\le\varepsilon$ khi $k\ge\frac{LR^2}{2\varepsilon}$, với $R=\lVert x^0-x^*\rVert_2$.

**Điều kiện áp dụng.** Cần biết $L$ để đặt bước; cần tính lồi và sự tồn tại của một điểm cực tiểu.

**Phạm vi.** Cận đúng cho mọi hàm của lớp, nên có thể rất bi quan cho một hàm cụ thể. Định lý không nói gì về $\lVert x^k-x^*\rVert_2$ ngoài tính không tăng.
:::

::: proof Chứng minh Định lý 04.22
**Bước 1 (cộng các bất đẳng thức một bước).**

Áp Bổ đề 04.21 cho $x=x^j$, $x^+=x^{j+1}$ với $j=0,\ldots,k-1$ rồi cộng:

$$
\begin{aligned}
\sum_{j=1}^{k}\bigl(f(x^j)-f^*\bigr)&\le\frac L2\Bigl(\lVert x^0-x^*\rVert_2^2-\lVert x^k-x^*\rVert_2^2\Bigr)\\
&\le\frac L2\lVert x^0-x^*\rVert_2^2 .
\end{aligned}
$$

Dòng đầu là tổng lồng; dòng sau bỏ số hạng không dương $-\tfrac L2\lVert x^k-x^*\rVert_2^2$.

**Bước 2 (tính đơn điệu).**

Theo Bổ đề 04.20, $f(x^1)\ge f(x^2)\ge\cdots\ge f(x^k)$, nên mỗi số hạng của tổng ở Bước 1 không nhỏ hơn $f(x^k)-f^*$, và tổng không nhỏ hơn $k\bigl(f(x^k)-f^*\bigr)$.

**Bước 3 (kết luận).**

Ghép hai bước và chia cho $k$ được (2.4). Điều kiện $\frac{LR^2}{2k}\le\varepsilon$ tương đương $k\ge\frac{LR^2}{2\varepsilon}$. $\square$
:::

Định lý 04.22 cần ba giả thiết, mỗi giả thiết dùng ở một bước: gradient Lipschitz trong bổ đề giảm, tính lồi trong bước tiếp tuyến của Bổ đề 04.21, và sự tồn tại của $x^*$ để định nghĩa $f^*$ và khoảng cách ban đầu. Tốc độ $O(1/k)$ gọi là dưới tuyến tính (sublinear): giảm sai số mười lần cần tăng số bước khoảng mười lần.

Bổ đề 04.20 so $f(x^{k+1})$ với $f(x^k)$; định lý so $f(x^k)$ với $f^*$, nhờ thêm tính lồi và sự tồn tại của $x^*$. Cận cùng dạng có trong Beck (2017, Định lý 10.21); Boyd và Vandenberghe (2004, mục 9.3.1) chỉ chứng minh trường hợp lồi mạnh.

::: example Ví dụ 04.11 (Cận $O(1/k)$ trên VD1)
**Cận.**

$x^*=0$, $\lVert x^0-x^*\rVert_2^2=4+16=20$, $L=7$. Cận (2.4) là $\frac{7\cdot20}{2k}=\frac{70}k$; để sai số không quá $0{,}01$, cận yêu cầu $k\ge7000$.

**Giá trị thật.**

Với $t=\tfrac17$, Ví dụ 04.10 cho $x^1=(\tfrac87,0)^T$; từ đó tọa độ thứ nhất nhân $\tfrac47$ mỗi bước và tọa độ thứ hai giữ bằng $0$. Vậy $x^k=(2(\tfrac47)^k,0)^T$ và $f(x^k)=\tfrac32\cdot4(\tfrac47)^{2k}=6(\tfrac{16}{49})^k$ với $k\ge1$.

**Số bước thật.**

$6(\tfrac{16}{49})^k\le0{,}01$ khi $k\ge\frac{\log600}{\log(49/16)}\approx5{,}72$, tức $k=6$.

**Kiểm tra lại.**

$k=5$ cho $6(\tfrac{16}{49})^5\approx0{,}0223>0{,}01$; $k=6$ cho $\approx0{,}0073\le0{,}01$. Với $k=1$: $6\cdot\tfrac{16}{49}=\tfrac{96}{49}$, khớp Ví dụ 04.10.
:::

Định lý 04.22 cần biết $L$. Khi không biết $L$, bước được chọn bằng quay lui, và chứng minh cần một chặn dưới cho bước được nhận.

::: lemma Bổ đề 04.23 (Bước được nhận của quay lui)
**Giả thiết.** $f$ khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz; $d=-g$ với $g\ne0$; quay lui theo Định nghĩa 04.10 với $\alpha\in(0,\tfrac12]$ và $\beta\in(0,1)$.

**Kết luận.** Mọi $t\in(0,\tfrac1L]$ thỏa (2.2). Bước được nhận thỏa

$$
t\ge t_{\min}=\min\Bigl\{1,\frac\beta L\Bigr\},\qquad f(x-tg)\le f(x)-\alpha t\lVert g\rVert_2^2 .
$$

**Điều kiện áp dụng.** Đây là cùng thủ tục của Định nghĩa 04.10 với tham số mở rộng $\alpha\in(0,\tfrac12]$; Mệnh đề 04.11 chỉ cần $\alpha<1$, và lý do của cận $\alpha<\tfrac12$ trong Nhận xét 04.12 không áp dụng cho hướng $-g$.

**Phạm vi.** Chặn $t_{\min}$ phụ thuộc $L$ dù thuật toán không dùng $L$.
:::

::: proof Chứng minh Bổ đề 04.23
**Bước 1 (các bước nhỏ được nhận).**

Với $t\le\tfrac1L$, Bổ đề 04.20 cho $f(x-tg)\le f(x)-\tfrac t2\lVert g\rVert_2^2\le f(x)-\alpha t\lVert g\rVert_2^2$, vì $\alpha\le\tfrac12$. Đây là (2.2) với $g^Td=-\lVert g\rVert_2^2$.

**Bước 2 (chặn dưới).**

Quay lui thử $1,\beta,\beta^2,\ldots$ và dừng ở giá trị đầu tiên thỏa (2.2). Nếu bước trả về là $t=1$ thì $t\ge t_{\min}$. Nếu không, giá trị thử trước đó $t/\beta$ đã bị loại, nên theo Bước 1, $t/\beta>\tfrac1L$, tức $t>\tfrac\beta L\ge t_{\min}$. Bất đẳng thức của bước được nhận là chính (2.2). $\square$
:::

::: theorem Định lý 04.24 (Tốc độ $O(1/k)$ với quay lui)
**Giả thiết.** Như Định lý 04.22, nhưng bước $t_k$ được chọn bằng quay lui với $d=-\nabla f(x^k)$, $\alpha=\tfrac12$, $\beta\in(0,1)$.

**Kết luận.** Với mọi $k\ge1$,

$$
f(x^k)-f^*\le\frac{\lVert x^0-x^*\rVert_2^2}{2\,t_{\min}\,k},\qquad t_{\min}=\min\Bigl\{1,\frac\beta L\Bigr\}.
$$

**Điều kiện áp dụng.** Thuật toán không cần biết $L$. Khi $L\ge\beta$, $t_{\min}=\beta/L$ và hằng số của cận lớn hơn hằng số của (2.4) đúng $1/\beta$ lần.

**Phạm vi.** Chứng minh dùng $\alpha=\tfrac12$. Với $\alpha<\tfrac12$, chặn $t\ge t_{\min}$ của Bổ đề 04.23 vẫn đúng, nhưng bất đẳng thức một bước dưới đây không còn suy ra trực tiếp.
:::

::: proof Chứng minh Định lý 04.24
**Bước 1 (bất đẳng thức một bước với bước $t$).**

Với $\alpha=\tfrac12$, Bổ đề 04.23 cho $f(x^+)\le f(x)-\tfrac t2\lVert g\rVert_2^2$, có dạng của Bổ đề 04.20 với $\tfrac1L$ thay bằng $t$. Lặp lại Bước 2 và Bước 3 của chứng minh Bổ đề 04.21 với $x^+=x-tg$:

$$
f(x^+)-f^*\le\frac1{2t}\Bigl(\lVert x-x^*\rVert_2^2-\lVert x^+-x^*\rVert_2^2\Bigr).
$$

**Bước 2 (thay $t$ bằng $t_{\min}$).**

Hiệu trong ngoặc không âm vì vế trái không âm, và $\frac1{2t}\le\frac1{2t_{\min}}$ theo Bổ đề 04.23. Vậy bất đẳng thức của Bước 1 vẫn đúng khi thay $\tfrac1{2t}$ bằng $\tfrac1{2t_{\min}}$.

**Bước 3 (tổng lồng và tính đơn điệu).**

Cộng theo $j=0,\ldots,k-1$ và dùng $f(x^{j+1})\le f(x^j)$, từ (2.2), như Bước 1 đến Bước 3 của chứng minh Định lý 04.22, với $L$ thay bằng $\tfrac1{t_{\min}}$. $\square$
:::

::: example Ví dụ 04.12 (Quay lui với $\alpha=\beta=\tfrac12$ trên VD1)
**Bước được nhận tại $x^0$.**

Ngưỡng là $62-\tfrac12\cdot820t=62-410t$. Các lần thử: $t=1$ cho $2040>-348$; $t=\tfrac12$ cho $\tfrac{703}2>-143$; $t=\tfrac14$ cho $\tfrac{255}8>-\tfrac{81}2$; ba bước bị loại. $t=\tfrac18$ cho điểm $(\tfrac54,\tfrac12)^T$ với $f=\tfrac12(\tfrac{75}{16}+\tfrac74)=\tfrac{103}{32}$, không vượt ngưỡng $\tfrac{43}4$, được nhận.

**Cận.**

$t_{\min}=\min\{1,\tfrac1{14}\}=\tfrac1{14}$, và cận là $\frac{20\cdot14}{2k}=\frac{140}k$, gấp đôi cận $\frac{70}k$ của bước $\tfrac17$, đúng bằng $1/\beta$.

**Kiểm tra lại.**

Điều kiện (2.2) tương đương $2798t^2\le410t$, tức $t\le\frac{205}{1399}\approx0{,}147$. Bước $\tfrac18=0{,}125$ nằm trong và $\tfrac14$ nằm ngoài. Bước được nhận $\tfrac18\ge t_{\min}=\tfrac1{14}$, khớp Bổ đề 04.23.
:::

Hai cận $O(1/k)$ chỉ dùng tính lồi và gradient Lipschitz, nên chúng không phân biệt VD1 với những hàm lồi có độ cong tiến về $0$, như $\log(1+e^s)$ khi $s\to-\infty$. VD1 còn có độ cong dương tối thiểu $3$. Giả thiết đó cho tốc độ nhanh hơn.

::: proposition Mệnh đề 04.25 (Lồi mạnh: dạng bậc nhất và cận theo chuẩn gradient)
**Giả thiết.** $f:\mathbb R^n\to\mathbb R$ khả vi, lồi mạnh với hằng số $\mu>0$ theo Định nghĩa 01.39.

**Kết luận.**

- (a) Với mọi $x,y$: $f(y)\ge f(x)+\nabla f(x)^T(y-x)+\tfrac\mu2\lVert y-x\rVert_2^2$.
- (b) $f$ có đúng một điểm cực tiểu $x^*$, và với mọi $x$:

$$
f(x)-f^*\le\frac1{2\mu}\lVert\nabla f(x)\rVert_2^2 .
\tag{2.5}
$$

- (c) Nếu gradient còn $L$-Lipschitz thì $\mu\le L$.

**Điều kiện áp dụng.** Cần $\mu>0$ và miền $\mathbb R^n$.

**Phạm vi.** Bất đẳng thức (2.5) cho một tiêu chí dừng có bảo đảm khi biết $\mu$; giá trị của $\mu$ thường chỉ ước lượng được.
:::

::: proof Chứng minh Mệnh đề 04.25
**Bước 1 (phần a).**

Hàm $h=f-\tfrac\mu2\lVert\cdot\rVert_2^2$ lồi, khả vi, với $\nabla h(x)=\nabla f(x)-\mu x$. Theo Định lý 01.26, $h(y)\ge h(x)+(\nabla f(x)-\mu x)^T(y-x)$. Chuyển các số hạng chứa $\mu$ sang vế phải:

$$
\begin{aligned}
f(y)&\ge f(x)+\nabla f(x)^T(y-x)+\tfrac\mu2\bigl(\lVert y\rVert_2^2-\lVert x\rVert_2^2-2x^T(y-x)\bigr)\\
&=f(x)+\nabla f(x)^T(y-x)+\tfrac\mu2\lVert y-x\rVert_2^2 .
\end{aligned}
$$

Dòng thứ hai dùng $\lVert y\rVert_2^2-2x^Ty+\lVert x\rVert_2^2=\lVert y-x\rVert_2^2$.

**Bước 2 (phần b).**

Sự tồn tại và duy nhất của $x^*$ là Hệ quả 01.41. Với $x$ cố định, vế phải của (a) là hàm bậc hai lồi chặt theo $y$, đạt cực tiểu tại $y=x-\tfrac1\mu\nabla f(x)$ với giá trị $f(x)-\frac1{2\mu}\lVert\nabla f(x)\rVert_2^2$. Vế phải là cận dưới của $f(y)$ với mọi $y$, nên $f^*\ge f(x)-\frac1{2\mu}\lVert\nabla f(x)\rVert_2^2$, tức (2.5).

**Bước 3 (phần c).**

Ghép (a) với (2.3) cho cùng $x,y$: $\tfrac\mu2\lVert y-x\rVert_2^2\le\tfrac L2\lVert y-x\rVert_2^2$; chọn $y\ne x$ được $\mu\le L$. $\square$
:::

Phần (a) nói rằng tại mỗi điểm, đồ thị của $f$ nằm trên một parabol độ cong $\mu$ tiếp xúc với nó; cùng với Bổ đề 04.18, $f$ bị kẹp giữa hai parabol độ cong $\mu$ và $L$. Với $f$ khả vi hai lần, theo Nhận xét 01.40, điều kiện tương đương $\nabla^2f\succeq\mu I$. VD1 có $\nabla^2f=\operatorname{diag}(3,7)\succeq3I$, nên $\mu=3$, $L=7$ và số điều kiện $\kappa=L/\mu=\tfrac73$.

::: theorem Định lý 04.26 (Hội tụ tuyến tính của giảm gradient)
**Giả thiết.** $f$ lồi mạnh với hằng số $\mu$, khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz; $x^{k+1}=x^k-\tfrac1L\nabla f(x^k)$; $e_k=f(x^k)-f^*$.

**Kết luận.** Với mọi $k\ge0$,

$$
e_k\le\Bigl(1-\frac\mu L\Bigr)^ke_0 .
\tag{2.6}
$$

Do đó $e_k\le\varepsilon$ khi $k\ge\kappa\log(e_0/\varepsilon)$, với $\kappa=L/\mu$.

**Điều kiện áp dụng.** Cần cả hai hằng số; hệ số co $1-1/\kappa$ chỉ nhỏ khi $\kappa$ nhỏ.

**Phạm vi.** Với quay lui, sai số cũng co theo một hệ số $c<1$ phụ thuộc $\alpha,\beta,\mu,L$ (Boyd và Vandenberghe 2004, mục 9.3.1, tr. 468–469); chương không chứng minh trường hợp đó.
:::

::: proof Chứng minh Định lý 04.26
**Bước 1 (một bước).**

Theo Bổ đề 04.20 rồi (2.5) với $x=x^k$:

$$
\begin{aligned}
e_{k+1}&\le e_k-\frac1{2L}\lVert\nabla f(x^k)\rVert_2^2\\
&\le e_k-\frac\mu L\,e_k\\
&=\Bigl(1-\frac\mu L\Bigr)e_k .
\end{aligned}
$$

Dòng thứ hai dùng $\lVert\nabla f(x^k)\rVert_2^2\ge2\mu e_k$.

**Bước 2 (quy nạp).**

Lặp Bước 1 $k$ lần được (2.6); hệ số $1-\mu/L\in[0,1)$ theo Mệnh đề 04.25(c).

**Bước 3 (số bước).**

Vì $1-u\le e^{-u}$ với mọi $u$, $(1-1/\kappa)^k\le e^{-k/\kappa}$. Khi $k\ge\kappa\log(e_0/\varepsilon)$, $e^{-k/\kappa}e_0\le\varepsilon$. $\square$
:::

Tốc độ (2.6) gọi là hội tụ tuyến tính (linear convergence): sai số nhân với một hằng số nhỏ hơn $1$ ở mỗi bước, nên số bước tăng theo $\log(1/\varepsilon)$ thay vì $1/\varepsilon$. Mục 3 phát biểu chính xác khái niệm này cùng khái niệm hội tụ bậc hai (Định nghĩa 04.33).

Thêm giả thiết lồi mạnh, Định lý 04.26 đổi cận $O(1/k)$ của Định lý 04.22 thành $O(c^k)$, với hệ số co $c=1-1/\kappa$ phụ thuộc số điều kiện.

::: remark Nhận xét 04.27 (Ba cận trên VD1 và độ chặt)
Với VD1, $e_0=62$ và hệ số $1-\tfrac37=\tfrac47$. Cận (2.6) cho $62(\tfrac47)^k\le0{,}01$ khi $k\ge\frac{\log6200}{\log(7/4)}\approx15{,}6$, tức $16$ bước; điều kiện đủ $k\ge\kappa\log(e_0/\varepsilon)=\tfrac73\log6200\approx20{,}4$ cho $21$ bước. Hai cận $O(1/k)$ cho $7000$ và $14000$ bước. Số bước thật với $t=\tfrac17$ là $6$ (Ví dụ 04.11).

Cận tuyến tính gần thực tế hơn vì dùng thêm $\mu=3$, nhưng mọi cận đều bi quan vì đúng cho mọi hàm của lớp. Một cận trên số bước chỉ nói thuật toán không chậm hơn mức đó, không phải dự báo số bước.
:::

**Trong học máy.** Với hồi quy logistic trên dữ liệu $X\in\mathbb R^{N_s\times n}$ của Nhận xét 04.19 và chính quy hóa $\tfrac\mu2\lVert w\rVert_2^2$, nhận xét đó cho $L=\tfrac14\lambda_{\max}(X^TX)+\mu$, và mất mát lồi mạnh với hằng số $\mu$. Định lý 04.26 áp dụng với $\kappa\le1+\lambda_{\max}(X^TX)/(4\mu)$, nên chính quy hóa yếu hoặc đặc trưng có thang đo lớn làm giảm gradient chậm (Tình huống 04.1). Tốc độ học $\tfrac1L$ an toàn theo Bổ đề 04.20; tốc độ học lớn hơn $\tfrac2L$ có thể làm dãy phân kỳ như $x_2$ ở Ví dụ 04.7.

Với mạng sâu, mất mát không lồi và gradient thường không Lipschitz trên toàn không gian tham số, nên các định lý của mục này không áp dụng; Bài 05b xét các dạng hội tụ yếu hơn cho trường hợp đó.

::: exercise Bài tập 04.4
Trên VD1 với bước cố định $t$:

- (a) chứng minh rằng với $t>\tfrac27$ dãy $x^k$ phân kỳ, và với $\tfrac23<t$ cả hai tọa độ phân kỳ;
- (b) với $t=\tfrac15$, bước tối ưu theo Nhận xét 04.13, tính $f(x^k)$ theo $k$ và số bước để $f(x^k)\le0{,}01$; so với $6$ bước của $t=\tfrac17$ ở Ví dụ 04.11.
:::

::: hint
Mỗi tọa độ nhân với $1-3t$ hoặc $1-7t$.
:::

::: solution
**Câu (a).**

$x_2^k=(1-7t)^k\cdot4$. Với $t>\tfrac27$, $1-7t<-1$, nên $\lvert x_2^k\rvert\to\infty$ và $f(x^k)\ge\tfrac72(x_2^k)^2\to\infty$. Tọa độ thứ nhất có $\lvert1-3t\rvert>1$ khi $t>\tfrac23$.

**Câu (b).**

Với $t=\tfrac15$: $x_1^k=2(\tfrac25)^k$, $x_2^k=4(-\tfrac25)^k$, nên $f(x^k)=\tfrac12(3\cdot4+7\cdot16)(\tfrac4{25})^k=62(\tfrac4{25})^k$. Điều kiện $62(0{,}16)^k\le0{,}01$ tương đương $k\ge\frac{\log6200}{\log6{,}25}\approx4{,}77$, tức $k=5$.

Bước $\tfrac15$ nhanh hơn $t=\tfrac17$ một bước; lợi thế nhỏ vì $t=\tfrac17$ triệt tiêu tọa độ thứ hai ngay ở bước đầu.

**Kiểm tra lại.**

$k=4$: $62\cdot0{,}16^4\approx0{,}0406>0{,}01$; $k=5$: $\approx0{,}0065\le0{,}01$.
:::

**Chuỗi suy luận của mục.**

1. Định nghĩa 04.6 và Mệnh đề 04.7: dấu của $g^Td$ quyết định hướng giảm.
2. Định nghĩa 04.8 và Mệnh đề 04.9: bài con bậc hai $Q_W$ cho hướng $Wd=-g$; với $W=I$ là hướng gradient.
3. Định nghĩa 04.10 và Mệnh đề 04.11: quay lui Armijo luôn tìm được bước; ghép thành Thuật toán 04.1.
4. Nhận xét 04.13: số điều kiện làm hướng $-g$ chậm; Định nghĩa 04.14 và Mệnh đề 04.15 đổi thước đo, cho hướng dốc nhất $Wd=-g$.
5. Định nghĩa 04.17, Bổ đề 04.18, 04.20, 04.21: từ gradient Lipschitz tới bất đẳng thức một bước; Định lý 04.22 và 04.24 cho tốc độ $O(1/k)$; Mệnh đề 04.25 và Định lý 04.26 cho tốc độ tuyến tính khi lồi mạnh.

Đích của mục là Thuật toán 04.1 cùng ba bảo đảm của nó.

**Kết mục.** Mục này cho thuật toán giảm gradient và ba cận hội tụ (Định lý 04.22, 04.24, 04.26). Mọi cận phụ thuộc số điều kiện $\kappa$ hoặc hằng số $L$, và Ví dụ 04.9 cho thấy chọn $W$ trùng Hessian xóa hẳn ảnh hưởng của $\kappa$ trên hàm bậc hai. Với hàm không bậc hai, Hessian thay đổi theo điểm nên không có $W$ cố định nào làm được điều đó. Mục 3 dùng Hessian tại điểm hiện tại làm ma trận của bài con, tức phương pháp Newton.

## 3. Phương pháp Newton không ràng buộc

Mục 2 kết thúc với nhận xét rằng một ma trận trọng số cố định không theo kịp độ cong khi Hessian thay đổi theo điểm. Xét VD2, $\varphi(s)=s-\log s$ trên $s>0$. Ta có $\varphi'(s)=1-\tfrac1s$ và $\varphi''(s)=\tfrac1{s^2}>0$, nên $\varphi$ lồi chặt và có nghiệm duy nhất $s^*=1$, với $\varphi^*=1$. Độ cong $\tfrac1{s^2}$ bằng $16$ tại $s=\tfrac14$, bằng $1$ tại nghiệm, và không bị chặn khi $s\to0$; do đó không có hằng số $L$ của Định nghĩa 04.17, và các cận của Mục 2.6 không áp dụng.

Mục này dùng Hessian tại điểm hiện tại làm ma trận của bài con, đọc hướng thu được theo hai cách, định nghĩa độ giảm Newton, và phát biểu tốc độ hội tụ của phương pháp.

### 3.1 Mô hình bậc hai cục bộ và hướng Newton

Trực giác, chưa phải định nghĩa: tại mỗi điểm, thay $f$ bằng parabol có cùng giá trị, cùng độ dốc và cùng độ cong với $f$ tại điểm đó, rồi nhảy tới đáy parabol. Parabol khớp $f$ tốt gần điểm hiện tại và tách dần khi đi xa.

::: example Ví dụ 04.13 (Mô hình bậc hai của VD2 tại $s^0=\tfrac14$)
**Dữ kiện.**

$\varphi(\tfrac14)=\tfrac14-\log\tfrac14=\tfrac14+\log4\approx1{,}6363$; $g=\varphi'(\tfrac14)=1-4=-3$; $H=\varphi''(\tfrac14)=16$.

**Mô hình.**

$q(s)=\varphi(\tfrac14)-3(s-\tfrac14)+8(s-\tfrac14)^2$. Đạo hàm $q'(s)=-3+16(s-\tfrac14)$ triệt tiêu tại $s=\tfrac14+\tfrac3{16}=\tfrac7{16}$.

**So mô hình với hàm thật.**

| $s$ | $\varphi(s)$ | $q(s)$ |
|---|---|---|
| $\tfrac14$ | $1{,}6363$ | $1{,}6363$ |
| $\tfrac7{16}$ | $1{,}2642$ | $1{,}3550$ |
| $1$ | $1$ | $3{,}8863$ |

**Kiểm tra lại.**

$\varphi(\tfrac7{16})=\tfrac7{16}-\log\tfrac7{16}\approx0{,}4375+0{,}8267=1{,}2642$. $q(1)=1{,}6363-2{,}25+8\cdot0{,}5625=3{,}8863$. Tại $s=\tfrac14$ hai hàm trùng nhau; tại $s=1$ chúng lệch nhau gần $2{,}9$.
:::

![Đồ thị hàm phi của s bằng s trừ log s trên đoạn từ 0 đến khoảng 1,5 (nét liền), parabol bậc hai q dựng tại s0 bằng 1/4 (nét đứt) và tiếp tuyến tại s0 (nét chấm, dốc âm). Tại s0, g bằng âm 3 và H bằng 16. Parabol khớp hàm thật gần s0 rồi tách xa dần khi s tăng, vì độ cong thật 1 chia s bình phương giảm còn độ cong của parabol giữ bằng 16.](img/lec-04/phi-local-model.svg)

Hình cho thấy parabol bám $\varphi$ quanh $s^0=\tfrac14$ và nằm cao hơn hẳn $\varphi$ khi $s$ tiến về $1$. Lý do là độ cong của parabol giữ bằng $16$, còn độ cong thật giảm từ $16$ xuống $1$. Đáy của parabol tại $\tfrac7{16}$ vì vậy nằm giữa điểm đầu và nghiệm.

::: definition Định nghĩa 04.28 (Hướng Newton)
Cho $f$ khả vi hai lần tại $x\in\operatorname{dom}f$, với $g=\nabla f(x)$ và $H=\nabla^2f(x)\succ0$. Mô hình Newton của $f$ tại $x$ là mô hình bậc hai $Q_H(d)=f(x)+g^Td+\tfrac12d^THd$ của Định nghĩa 04.8 với $W=H$. Hướng Newton (Newton step) tại $x$ là nghiệm $d$ của hệ Newton

$$
Hd=-g .
\tag{3.1}
$$
:::

Định nghĩa là trường hợp $W=H$ của Định nghĩa 04.8, với một khác biệt: $H$ thay đổi theo điểm, nên mỗi lượt lặp có một mô hình mới. Mô hình $Q_H$ trùng khai triển Taylor bậc hai của $f$ tại $x$. Giả thiết $H\succ0$ bảo đảm hệ (3.1) có nghiệm duy nhất; với $f$ lồi chặt có Hessian suy biến tại một điểm, như $x^4$ tại $0$, hướng Newton không xác định ở điểm đó.

Kết quả sau cho bốn cách đọc của cùng một hướng. Ba cách đầu dùng lại Mệnh đề 04.9 và 04.15; cách thứ tư dùng khai triển Taylor của gradient.

::: proposition Mệnh đề 04.29 (Bốn cách đọc hướng Newton)
**Giả thiết.** $f$ khả vi hai lần liên tục trên miền mở, $x\in\operatorname{dom}f$, $H=\nabla^2f(x)\succ0$, $d$ là hướng Newton.

**Kết luận.**

- (a) $d$ là nghiệm duy nhất của $\min_dQ_H(d)$.
- (b) $g^Td=-d^THd$, nên $d$ là hướng giảm khi $g\ne0$.
- (c) Khi $g\ne0$, $d$ là hướng giảm dốc nhất theo chuẩn $\lVert\cdot\rVert_H$ của Định nghĩa 04.14.
- (d) $d$ là nghiệm của phương trình thu được khi thay $\nabla f(x+d)$ trong điều kiện dừng $\nabla f(x+d)=0$ bằng xấp xỉ bậc một $g+Hd$.

**Điều kiện áp dụng.** Cần $H\succ0$ tại điểm đang xét.

**Phạm vi.** Mệnh đề nói về mô hình. Điểm $x+d$ nói chung không thỏa $\nabla f(x+d)=0$, và có thể nằm ngoài miền.
:::

::: proof Chứng minh Mệnh đề 04.29
**Bước 1 (phần a, b, c).**

Áp Mệnh đề 04.9 với $W=H$ được (a) và (b). Khi $g\ne0$, áp Mệnh đề 04.15(c) với $W=H$ được (c).

**Bước 2 (phần d).**

Ánh xạ $y\mapsto\nabla f(y)$ có ma trận Jacobi (Jacobian) tại $x$ là $H$, nên $\nabla f(x+d)=g+Hd+o(\lVert d\rVert_2)$. Bỏ số hạng $o(\lVert d\rVert_2)$ và đặt phần còn lại bằng $0$ được $g+Hd=0$, tức (3.1). $\square$
:::

Hai cách đọc (a) và (d) là hai con đường tới cùng một hệ. Cách (a) xấp xỉ hàm mục tiêu bằng parabol rồi cực tiểu hóa. Cách (d) xấp xỉ phương trình tối ưu (1.1) bằng phương trình tuyến tính rồi giải. Cách (d) dùng được cho mọi hệ phương trình, không chỉ cho điều kiện dừng của một hàm; Mục 5 áp nó cho hệ KKT (1.2).

Hướng Newton giữ hai tính chất của hướng gradient ở Mệnh đề 04.9, tính duy nhất và tính giảm, nhưng dùng ma trận thay đổi theo điểm thay cho ma trận cố định. Mỗi lượt vì vậy phải tính Hessian và giải một hệ $n\times n$.

::: example Ví dụ 04.14 (Một bước Newton trên VD2)
**Hệ Newton.**

$16d=3$, nên $d=\tfrac3{16}$ và $s^1=s^0+d=\tfrac7{16}$, đúng đáy parabol của Ví dụ 04.13.

**Hướng giảm.**

$g\,d=-3\cdot\tfrac3{16}=-\tfrac9{16}=-Hd^2<0$.

**Cách đọc tuyến tính hóa.**

$\varphi'(\tfrac14+d)\approx-3+16d$; đặt bằng $0$ được cùng $d=\tfrac3{16}$.

**Kiểm tra lại.**

$\varphi'(\tfrac7{16})=1-\tfrac{16}7=-\tfrac97\ne0$: điểm mới chưa thỏa điều kiện dừng của bài gốc, vì chỉ vế trái của phương trình được xấp xỉ.
:::

![Đồ thị phi của s bằng s trừ log s (nét liền) và mô hình bậc hai tại s0 bằng 1/4 (nét đứt). Ba điểm được đánh dấu trên trục s: điểm đầu s0 bằng 1/4, đáy của mô hình s1 bằng 7/16, và nghiệm của hàm thật s sao bằng 1.](img/lec-04/phi-newton.svg)

Hình đặt ba điểm $s^0=\tfrac14$, $s^1=\tfrac7{16}$ và $s^*=1$ trên cùng trục. Bước Newton đi đúng tới đáy mô hình, đi được $\tfrac3{16}$ trong khoảng cách $\tfrac34$ tới nghiệm. Ví dụ 04.16 cho thấy khoảng cách còn lại co rất nhanh ở các bước sau.

**Trong học máy.** Xét hồi quy logistic có chính quy hóa $J(w)=\sum_i\ell(m_i)+\tfrac\mu2\lVert w\rVert_2^2$ trên dữ liệu $X\in\mathbb R^{N_s\times n}$ với các hàng $a_i^T$, nhãn $y_i\in\{-1,+1\}$ và biên $m_i=y_ia_i^Tw$ (Nhận xét 04.19). Gradient là $\sum_i\ell'(m_i)y_ia_i+\mu w$ và Hessian là $X^TDX+\mu I$, với $D=\operatorname{diag}(\ell''(m_i))$; Hessian xác định dương vì $\mu>0$, nên hướng Newton luôn xác định. Hệ (3.1) có dạng một bài bình phương nhỏ nhất có trọng số $D$, nên phương pháp này còn gọi là bình phương nhỏ nhất có trọng số lặp (iteratively reweighted least squares). Tình huống 04.1 chạy phương pháp này trên dữ liệu cụ thể.

### 3.2 Độ giảm Newton

Mô hình Newton cho một đại lượng tính được ngay tại điểm hiện tại: mức giảm nó dự báo khi đi từ $d=0$ tới đáy. Đại lượng này là ứng viên tự nhiên cho tiêu chí dừng.

::: definition Định nghĩa 04.30 (Độ giảm Newton)
Với $H=\nabla^2f(x)\succ0$ và hướng Newton $d$, độ giảm Newton (Newton decrement) tại $x$ là

$$
\delta_N(x)=\sqrt{d^THd}=\sqrt{-g^Td}=\sqrt{g^TH^{-1}g}\ \ge0 .
$$

Khi không gây nhầm lẫn, viết gọn $\delta=\delta_N(x)$.
:::

Ba biểu thức bằng nhau theo Mệnh đề 04.29(b) và $d=-H^{-1}g$. Biểu thức đầu là độ dài của bước Newton theo chuẩn $\lVert\cdot\rVert_H$; biểu thức cuối là chuẩn đối ngẫu $\lVert g\rVert_{H,*}$ của gradient. Độ giảm Newton vì vậy là một chuẩn của gradient, với ma trận trọng số là nghịch đảo Hessian.

Chuẩn gradient $\lVert g\rVert_2$ của Thuật toán 04.1 đo gradient bằng thước Euclid; $\delta$ đo nó bằng thước của chính độ cong tại điểm đó. Hai đại lượng cùng bằng $0$ đúng khi $g=0$, nhưng chỉ $\delta$ không đổi khi đổi hệ tọa độ, theo mệnh đề sau.

::: proposition Mệnh đề 04.31 (Tính chất của độ giảm Newton)
**Giả thiết.** $f$ khả vi hai lần tại $x$, $H=\nabla^2f(x)\succ0$, $d$ là hướng Newton.

**Kết luận.**

- (a) $Q_H(0)-Q_H(d)=\tfrac12\delta^2$.
- (b) $\delta=0$ khi và chỉ khi $g=0$.
- (c) Cho $T\in\mathbb R^{n\times n}$ khả nghịch, $c\in\mathbb R^n$ và $\tilde f(y)=f(Ty+c)$ tại $y$ với $x=Ty+c$. Hướng Newton $\tilde d$ của $\tilde f$ tại $y$ thỏa $T\tilde d=d$, và độ giảm Newton của $\tilde f$ tại $y$ bằng $\delta$.

**Điều kiện áp dụng.** Cần $H\succ0$; phép đổi biến phải affine và khả nghịch.

**Phạm vi.** Phần (a) nói về mô hình, không về $f(x)-f(x+d)$ hay $f(x)-f^*$.
:::

::: proof Chứng minh Mệnh đề 04.31
**Bước 1 (phần a, b).**

Phần (a) là Mệnh đề 04.9(c) với $W=H$. Vì $H^{-1}\succ0$, $\delta^2=g^TH^{-1}g=0$ khi và chỉ khi $g=0$.

**Bước 2 (đạo hàm sau khi đổi biến).**

Theo quy tắc dây chuyền, $\nabla\tilde f(y)=T^Tg$ và $\nabla^2\tilde f(y)=T^THT$, ma trận này xác định dương vì $T$ khả nghịch.

**Bước 3 (hướng Newton tương ứng).**

Hệ Newton theo $y$ là $T^THT\tilde d=-T^Tg$. Nhân bên trái với $(T^T)^{-1}$ được $H(T\tilde d)=-g$, nên $T\tilde d$ là nghiệm của (3.1), và theo tính duy nhất, $T\tilde d=d$.

**Bước 4 (độ giảm Newton).**

Theo Định nghĩa 04.30 áp cho $\tilde f$:

$$
\begin{aligned}
\tilde\delta^2&=-(T^Tg)^T\tilde d\\
&=-g^T(T\tilde d)\\
&=-g^Td\\
&=\delta^2 .
\end{aligned}
$$

Dòng thứ ba dùng Bước 3. $\square$
:::

Phần (c) gọi là tính bất biến affine của phương pháp Newton. Nếu ta đổi đơn vị của các biến, hay xoay hệ tọa độ, rồi chạy Newton, các điểm lặp chính là ảnh của các điểm lặp cũ qua phép đổi biến.

Giảm gradient không có tính chất này: Ví dụ 04.9 và Nhận xét 04.16 cho thấy đổi biến $x=W^{-1/2}y$ biến giảm gradient thành một phương pháp khác. Tính bất biến affine là lý do Mục 6 tìm một giả thiết về độ cong không phụ thuộc hệ tọa độ.

::: example Ví dụ 04.15 (Ba phép trừ trên VD2)
**Giảm mô hình.**

$\delta^2=Hd^2=16\cdot\tfrac9{256}=\tfrac9{16}$, nên $\delta=\tfrac34$ và giảm mô hình $\tfrac12\delta^2=\tfrac9{32}=0{,}28125$.

**Giảm thật một bước.**

$\varphi(\tfrac14)-\varphi(\tfrac7{16})=\bigl(\tfrac14+\log4\bigr)-\bigl(\tfrac7{16}+\log\tfrac{16}7\bigr)=\log\tfrac74-\tfrac3{16}\approx0{,}37212$.

**Sai số mục tiêu tại điểm đầu.**

$\varphi(\tfrac14)-\varphi(1)=\log4-\tfrac34\approx0{,}63629$.

**Nhận bước.**

Với $\alpha=\tfrac1{10}$ và $t=1$, điều kiện (2.2) đòi mức giảm ít nhất $\alpha(-g\,d)=\tfrac1{10}\cdot\tfrac9{16}=\tfrac9{160}=0{,}05625$. Mức giảm thật $0{,}37212$ vượt ngưỡng, nên bước đầy đủ được nhận.

**Kiểm tra lại.**

Ba số $0{,}28125<0{,}37212<0{,}63629$ khác nhau. Với VD1 và $W=H$ ở Ví dụ 04.9, giảm mô hình $62$ bằng cả giảm thật lẫn sai số, vì mô hình trùng hàm bậc hai.
:::

::: remark Nhận xét 04.32 (Ba đại lượng không được đồng nhất)
Ví dụ 04.15 tách ba phép trừ có hai vế khác nhau:

1. giảm mô hình $Q_H(0)-Q_H(d)=\tfrac12\delta^2$, tính trên parabol;
2. giảm thật $f(x)-f(x+td)$, tính trên hàm thật sau một bước;
3. sai số mục tiêu $f(x)-f^*$, so với giá trị tối ưu chưa biết.

Ba đại lượng chỉ trùng nhau khi $f$ bậc hai và $t=1$. Ngưỡng của điều kiện Armijo tính từ $g^Td=-\delta^2$, không từ $\tfrac12\delta^2$.

Trên VD2, sai số mục tiêu lớn hơn hai lần giảm mô hình. Vậy nếu không có giả thiết thêm về sự thay đổi của độ cong, $\tfrac12\delta^2$ không phải cận trên của sai số mục tiêu. Mục 6 đưa ra giả thiết đó và chứng minh một cận sai số theo $\delta$.
:::

Thuật toán Newton dùng $\tfrac12\delta^2$ làm tiêu chí dừng vì nó tính được ngay tại điểm hiện tại từ hướng vừa giải.

::: algorithm Thuật toán 04.2 (Newton với quay lui Armijo)
**Đầu vào.** Điểm đầu $x^0\in\operatorname{dom}f$; dung sai $\varepsilon_{\mathrm{model}}>0$; tham số $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Lặp** với $k=0,1,2,\ldots$:

1. Tính $g=\nabla f(x^k)$ và $H=\nabla^2f(x^k)$.
2. Giải hệ $Hd=-g$, chẳng hạn bằng phân rã Cholesky $H=R^TR$.
3. Tính $\delta^2=-g^Td$.
4. Nếu $\tfrac12\delta^2\le\varepsilon_{\mathrm{model}}$: dừng, trả về $x^k$.
5. Chọn $t$ bằng quay lui Armijo theo hướng $d$, loại các điểm thử ngoài miền.
6. Cập nhật $x^{k+1}=x^k+td$.

**Đầu ra.** Điểm $x$ với $\tfrac12\delta_N(x)^2\le\varepsilon_{\mathrm{model}}$.

**Điều kiện.** $f$ khả vi hai lần và $\nabla^2f\succ0$ tại mọi điểm lặp.

**Chi phí mỗi lượt.** Tính Hessian và giải hệ $n\times n$: khoảng $\tfrac13n^3$ phép nhân với ma trận đặc, so với một vector gradient ở Thuật toán 04.1.
:::

Thuật toán 04.2 có cùng khung với Thuật toán 04.1; hai chỗ khác là hướng và tiêu chí dừng. Hệ được giải trực tiếp, không lập $H^{-1}$, vì giải hệ bằng phân rã Cholesky rẻ và ổn định hơn nghịch đảo ma trận.

### 3.3 Tốc độ hội tụ của Newton

Thuật toán 04.2 chưa có phát biểu về số bước. Trước khi phát biểu, cần đặt tên cho các tốc độ hội tụ.

::: definition Định nghĩa 04.33 (Hội tụ tuyến tính và hội tụ bậc hai)
Cho dãy $x^k\to x^*$ trong $\mathbb R^n$.

- Dãy hội tụ tuyến tính (linear convergence) nếu có $c\in(0,1)$ và $k_0$ sao cho $\lVert x^{k+1}-x^*\rVert_2\le c\lVert x^k-x^*\rVert_2$ với mọi $k\ge k_0$.
- Dãy hội tụ bậc hai (quadratic convergence) nếu có $C>0$ và $k_0$ sao cho $\lVert x^{k+1}-x^*\rVert_2\le C\lVert x^k-x^*\rVert_2^2$ với mọi $k\ge k_0$.

Hai khái niệm dùng cùng cách khi thay khoảng cách $\lVert x^k-x^*\rVert_2$ bằng sai số mục tiêu $f(x^k)-f^*$.
:::

Định lý 04.26 cho hội tụ tuyến tính của sai số mục tiêu với $c=1-\mu/L$. Với hội tụ bậc hai, nếu $C\lVert x^{k_0}-x^*\rVert_2\le\tfrac12$ thì sau $j$ bước, $C\lVert x^{k_0+j}-x^*\rVert_2\le(\tfrac12)^{2^j}$. Số chữ số đúng vì vậy xấp xỉ gấp đôi sau mỗi bước: $j=5$ bước đã cho $(\tfrac12)^{32}\approx2{,}3\cdot10^{-10}$. Hội tụ bậc hai kéo theo hội tụ tuyến tính, chiều ngược lại sai.

Kết quả sau cần hai giả thiết địa phương: Hessian xác định dương đều và thay đổi Lipschitz gần nghiệm. Hằng số Lipschitz của Hessian được ký hiệu $L_H$ để phân biệt với $L$ của gradient.

::: theorem Định lý 04.34 (Hội tụ bậc hai cục bộ của Newton)
**Giả thiết.** $f$ khả vi hai lần liên tục trên một tập mở lồi chứa hình cầu đóng $B=\{x\mid\lVert x-x^*\rVert_2\le\vartheta\}$, với $\nabla f(x^*)=0$. Trên $B$: $\nabla^2f(x)\succeq\mu I$ với $\mu>0$, và $\lVert\nabla^2f(x)-\nabla^2f(y)\rVert_2\le L_H\lVert x-y\rVert_2$.

**Kết luận.** Với mọi $x\in B$, bước Newton đầy đủ $x^+=x+d$ thỏa

$$
\lVert x^+-x^*\rVert_2\le\frac{L_H}{2\mu}\lVert x-x^*\rVert_2^2 .
\tag{3.2}
$$

Nếu thêm $\lVert x^0-x^*\rVert_2\le\min\{\vartheta,\mu/L_H\}$ thì dãy Newton với bước đầy đủ ở lại trong $B$, hội tụ về $x^*$ và hội tụ bậc hai.

**Điều kiện áp dụng.** Điểm đầu đủ gần nghiệm; không cần tính lồi toàn cục.

**Phạm vi.** Định lý là cục bộ. Nó không nói gì khi điểm đầu xa nghiệm, khi bước $t<1$ được dùng, hay khi Hessian suy biến tại nghiệm.
:::

::: proof Chứng minh Định lý 04.34
**Bước 1 (biểu diễn sai số).**

Đặt $e=x-x^*$ và $H=\nabla^2f(x)$. Vì $\nabla f(x^*)=0$ và đoạn $[x^*,x]$ nằm trong $B$,

$$
\nabla f(x)=\nabla f(x)-\nabla f(x^*)=\int_0^1\nabla^2f(x^*+\tau e)\,e\,d\tau .
$$

Từ $x^+=x-H^{-1}\nabla f(x)$:

$$
\begin{aligned}
x^+-x^*&=e-H^{-1}\int_0^1\nabla^2f(x^*+\tau e)\,e\,d\tau\\
&=H^{-1}\int_0^1\bigl(H-\nabla^2f(x^*+\tau e)\bigr)e\,d\tau .
\end{aligned}
$$

Dòng thứ hai viết $e=H^{-1}He=H^{-1}\int_0^1He\,d\tau$. Nghịch đảo chỉ dùng để viết đẳng thức; khi tính, hướng vẫn lấy từ hệ (3.1).

**Bước 2 (chặn từng nhân tử).**

$H\succeq\mu I$ cho $\lVert H^{-1}\rVert_2\le\tfrac1\mu$. Tính Lipschitz của Hessian cho $\lVert H-\nabla^2f(x^*+\tau e)\rVert_2\le L_H\lVert x-x^*-\tau e\rVert_2=L_H(1-\tau)\lVert e\rVert_2$.

**Bước 3 (tích phân).**

$$
\lVert x^+-x^*\rVert_2\le\frac1\mu\int_0^1L_H(1-\tau)\lVert e\rVert_2^2\,d\tau=\frac{L_H}{2\mu}\lVert e\rVert_2^2 .
$$

**Bước 4 (dãy lặp).**

Nếu $\lVert e\rVert_2\le\min\{\vartheta,\mu/L_H\}$ thì (3.2) cho $\lVert x^+-x^*\rVert_2\le\tfrac12\lVert e\rVert_2$, nên $x^+\in B$ và điều kiện được giữ ở bước sau. Theo quy nạp, khoảng cách giảm ít nhất một nửa mỗi bước, nên dãy hội tụ về $x^*$, và (3.2) cho hội tụ bậc hai với $C=\frac{L_H}{2\mu}$. $\square$
:::

Định lý 04.34 cần ba giả thiết:

1. Hessian xác định dương đều cho $\lVert H^{-1}\rVert_2\le\tfrac1\mu$; bỏ nó thì hệ có thể suy biến;
2. Hessian Lipschitz cho số hạng bình phương; với Hessian chỉ liên tục, Newton vẫn hội tụ nhanh hơn tuyến tính nhưng không chắc bậc hai;
3. điểm đầu đủ gần nghiệm giữ dãy trong vùng mà hai giả thiết trên đúng.

Định lý 04.34 đổi phạm vi lấy tốc độ: tốc độ bậc hai thay cho tốc độ tuyến tính của Định lý 04.26, nhưng chỉ khi điểm đầu gần nghiệm. Để có tốc độ đó, phương pháp phải tính Hessian ở mỗi bước, và định lý cần thêm tính Lipschitz của Hessian, một giả thiết về đạo hàm bậc ba.

::: example Ví dụ 04.16 (Hội tụ bậc hai trên VD2)
**Công thức một bước.**

Với $\varphi'(s)=1-\tfrac1s$ và $\varphi''(s)=\tfrac1{s^2}$, bước đầy đủ là

$$
\begin{aligned}
s^+&=s-\frac{1-1/s}{1/s^2}\\
&=s-(s^2-s)\\
&=2s-s^2 .
\end{aligned}
$$

Do đó

$$
1-s^+=1-2s+s^2=(1-s)^2 .
$$

**Dãy khoảng cách.**

Từ $s^0=\tfrac14$: $1-s^k$ bằng $\tfrac34$, $\tfrac9{16}$, $\tfrac{81}{256}$, $\tfrac{6561}{65536}\approx0{,}100$; mỗi bước bình phương khoảng cách trước, đúng Định nghĩa 04.33 với $C=1$.

**Bước thứ hai chi tiết.**

Tại $s^1=\tfrac7{16}$: $g=-\tfrac97$, $H=\tfrac{256}{49}$, $d=\tfrac97\cdot\tfrac{49}{256}=\tfrac{63}{256}$, $s^2=\tfrac{112}{256}+\tfrac{63}{256}=\tfrac{175}{256}$. Độ giảm Newton $\delta^2=g^2/H=\tfrac{81}{256}$, giảm mô hình $\tfrac{81}{512}\approx0{,}158$, sai số mục tiêu $\varphi(\tfrac7{16})-1=\log\tfrac{16}7-\tfrac9{16}\approx0{,}264$.

**Miền hội tụ.**

Với $s^0\in(0,2)$, $\lvert1-s^0\rvert<1$, nên $\lvert1-s^k\rvert=\lvert1-s^0\rvert^{2^k}\to0$. Với $s^0\ge2$, bước đầy đủ cho $s^+=s^0(2-s^0)\le0$, ngoài miền; quay lui loại điểm thử đó (Bài tập 04.5).

**Kiểm tra lại.**

$1-\tfrac{175}{256}=\tfrac{81}{256}=(\tfrac9{16})^2$. Định lý 04.34 trên $B=[\tfrac7{16},\tfrac{25}{16}]$, hình cầu bán kính $\tfrac9{16}$ quanh $1$, có $\mu=(\tfrac{16}{25})^2\approx0{,}41$ và $L_H=\max2/s^3=2(\tfrac{16}7)^3\approx23{,}9$, nên $C\approx29$: cận (3.2) đúng nhưng rất bi quan so với $C=1$ thực tế.
:::

Định lý 04.34 cần điểm đầu gần nghiệm. Kết quả toàn cục dưới đây ghép quay lui với hội tụ bậc hai; chứng minh dài và được dẫn nguồn.

::: theorem Định lý 04.35 (Hội tụ hai pha của Newton với quay lui)
**Giả thiết.** $f$ khả vi hai lần liên tục; tập mức dưới $S=\{x\mid f(x)\le f(x^0)\}$ đóng, và trên $S$: $\mu I\preceq\nabla^2f(x)\preceq LI$, Hessian $L_H$-Lipschitz. Thuật toán 04.2 với $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Kết luận.** Đặt ngưỡng $\bar g=\min\{1,3(1-2\alpha)\}\mu^2/L_H$ và mức giảm $\gamma_1=\alpha\beta\bar g^2\mu/L^2$.

- (a) Pha tắt dần (damped phase): khi $\lVert\nabla f(x^k)\rVert_2\ge\bar g$, $f(x^{k+1})\le f(x^k)-\gamma_1$.
- (b) Pha bậc hai: khi $\lVert\nabla f(x^k)\rVert_2<\bar g$, quay lui nhận $t=1$ ở mọi bước sau, và $\frac{L_H}{2\mu^2}\lVert\nabla f(x^{k+1})\rVert_2\le\Bigl(\frac{L_H}{2\mu^2}\lVert\nabla f(x^k)\rVert_2\Bigr)^2$.
- (c) Số bước để $f(x^k)-f^*\le\varepsilon$ không vượt

$$
\frac{f(x^0)-f^*}{\gamma_1}+\log_2\log_2\frac{\varepsilon_0}{\varepsilon},\qquad\varepsilon_0=\frac{2\mu^3}{L_H^2}.
$$

**Điều kiện áp dụng.** Cần cả ba hằng số $\mu$, $L$, $L_H$ trên $S$, dù thuật toán không dùng chúng.

**Phạm vi.** Chứng minh nằm ngoài phạm vi học phần; xem Boyd và Vandenberghe (2004, mục 9.5.3, tr. 488–491), nơi $m$, $M$, $L$ là $\mu$, $L$, $L_H$ của chương này. Các hằng số $\gamma_1$, $\varepsilon_0$ thường không tính được trong thực tế.
:::

Chứng minh có hai phần. Ở pha tắt dần, Hessian bị chặn trên cho một chặn dưới của bước được nhận, giống Bổ đề 04.23, nên mỗi bước giảm $f$ một lượng cố định và pha này có không quá $(f(x^0)-f^*)/\gamma_1$ bước. Ở pha bậc hai, tính Lipschitz của Hessian cho bước $t=1$ thỏa (2.2) và cho bất đẳng thức bình phương tương tự (3.2).

![Sơ đồ log của sai số theo vòng lặp k. Ở pha tắt dần bên trái, quay lui chọn bước nhỏ hơn 1 và log sai số giảm gần tuyến tính. Sau điểm bước t bằng 1 được nhận, ở pha bậc hai bên phải, khoảng giảm của log sai số tăng nhanh theo truy hồi sai số k cộng 1 không quá C nhân bình phương sai số k. Chú thích ghi sơ đồ áp dụng dưới giả thiết lồi mạnh, Hessian Lipschitz và quay lui phù hợp.](img/lec-04/newton-phases.svg)

Hình là sơ đồ định tính của Định lý 04.35, không vẽ từ một ví dụ số. Trên thang log, pha tắt dần là một đoạn gần thẳng, pha bậc hai là một đường dốc dần vì mỗi bước nhân đôi số chữ số đúng.

Bảng sau gom các trường hợp đã biết về số bước Newton. Lớp hàm tự điều chỉnh được định nghĩa ở Mục 6; ở đây bảng chỉ ghi kết luận, phát biểu đầy đủ là Định lý 04.53.

| Lớp hàm | Giả thiết | Kết luận |
|---|---|---|
| Bậc hai lồi chặt | $\nabla^2f\equiv H\succ0$ | một bước đầy đủ tới $x^*$ |
| Cục bộ | $\nabla^2f\succeq\mu I$, Hessian Lipschitz gần $x^*$ | bậc hai từ điểm đầu đủ gần (Định lý 04.34) |
| Lồi mạnh trên tập mức dưới | thêm $\nabla^2f\preceq LI$ | tắt dần rồi bậc hai (Định lý 04.35) |
| Tự điều chỉnh | Định nghĩa 04.47, tập mức dưới đóng | tắt dần rồi bậc hai, hằng số chỉ phụ thuộc $\alpha,\beta$ (Định lý 04.53) |

::: remark Nhận xét 04.36 (Khi Hessian không xác định dương)
**Hessian không xác định dương.** Nếu $H$ có giá trị riêng âm, mô hình $Q_H$ không bị chặn dưới và hệ (3.1), nếu giải được, có thể cho $g^Td=-g^TH^{-1}g>0$, tức hướng Newton là hướng tăng. Quay lui Armijo chỉ được định nghĩa cho $g^Td<0$; với $g^Td\ge0$, thủ tục có thể không kết thúc vì mọi bước đủ nhỏ bị loại, hoặc nhận một bước làm $f$ tăng. Tình huống 04.3 tính một trường hợp như vậy. Nocedal và Wright (2006, mục 3.4) sửa Hessian thành $H+\tau I\succ0$ trước khi giải.

**Nhầm lẫn thường gặp.** Một nhầm lẫn là coi hội tụ bậc hai là tính chất từ mọi điểm đầu, trong khi Định lý 04.34 là cục bộ; trên VD2, điểm đầu $s^0=3$ cho bước đầy đủ $s^+=-3$ ngoài miền.
:::

**Trong học máy.** Newton phù hợp khi số tham số vừa phải và mất mát lồi, khả vi hai lần, như hồi quy logistic có chính quy hóa với vài nghìn đặc trưng: vài bước Newton đạt độ chính xác mà giảm gradient cần hàng trăm bước (Tình huống 04.1).

Với mạng sâu, số tham số lên tới hàng triệu hoặc hơn, nên không lưu được Hessian; mất mát không lồi nên Hessian có giá trị riêng âm gần các điểm yên ngựa (Goodfellow, Bengio và Courville 2016, mục 8.2.3, tr. 285–288).

Phương pháp không lập Hessian (Hessian-free) của Martens (2010) giải gần đúng một hệ dạng (3.1) bằng gradient liên hợp (conjugate gradient). Phương pháp này chỉ cần tích của ma trận Gauss–Newton, một xấp xỉ nửa xác định dương của Hessian, với vector; Goodfellow, Bengio và Courville (2016, mục 8.6, tr. 310–317) trình bày nhóm phương pháp này.

::: exercise Bài tập 04.5
Chạy Thuật toán 04.2 trên VD2 từ $s^0=3$ với $\alpha=\tfrac1{10}$, $\beta=\tfrac12$.

- (a) Tính $g$, $H$, hướng Newton $d$ và $\delta^2$ tại $s^0$.
- (b) Chạy quay lui: nêu các điểm thử bị loại vì ngoài miền và bước được nhận.
- (c) Tính $1-s^1$ và giải thích vì sao từ $s^1$ trở đi bước đầy đủ cho hội tụ bậc hai.
:::

::: hint
$s^0+td$ phải dương trước khi tính $\varphi$. Dùng công thức $1-s^+=(1-s)^2$ của Ví dụ 04.16 cho bước đầy đủ.
:::

::: solution
**Câu (a).**

$g=1-\tfrac13=\tfrac23$, $H=\tfrac19$, $d=-g/H=-6$, $\delta^2=-g\,d=4$, $\delta=2$.

**Câu (b).**

$t=1$: $s=3-6=-3\notin\operatorname{dom}\varphi$, loại. $t=\tfrac12$: $s=0\notin\operatorname{dom}\varphi$, loại. $t=\tfrac14$: $s=\tfrac32$; ngưỡng là $\varphi(3)+\alpha t\,g\,d=(3-\log3)-\tfrac1{10}\cdot\tfrac14\cdot4\approx1{,}9014-0{,}1=1{,}8014$, và $\varphi(\tfrac32)=\tfrac32-\log\tfrac32\approx1{,}0945\le1{,}8014$, nhận. Vậy $s^1=\tfrac32$.

**Câu (c).**

$1-s^1=-\tfrac12$, $\lvert1-s^1\rvert<1$. Bước đầy đủ từ $\tfrac32$ cho $s^2=2\cdot\tfrac32-\tfrac94=\tfrac34$ và $1-s^2=\tfrac14=(-\tfrac12)^2$. Theo Ví dụ 04.16, từ mọi $s\in(0,2)$ bước đầy đủ cho $\lvert1-s^k\rvert=\lvert1-s\rvert^{2^k}$.

Bước đầy đủ còn được nhận. Tại $s^1=\tfrac32$, $\delta^2=\tfrac14$ và mức giảm thật $\varphi(\tfrac32)-\varphi(\tfrac34)\approx1{,}0945-1{,}0377=0{,}0568$, lớn hơn ngưỡng $\tfrac1{10}\cdot\tfrac14=0{,}025$. Mọi điểm lặp sau có $\lvert1-s\rvert\le\tfrac12$, và trên đoạn $[\tfrac12,\tfrac32]$ bước đầy đủ thỏa (2.2) vì $\varphi(s)-\varphi(2s-s^2)\ge0{,}1(1-s)^2=\alpha\delta^2$.

Căn cứ của bất đẳng thức cuối: đặt $u=1-s\in[-\tfrac12,\tfrac12]$, khi đó $2s-s^2=1-u^2$ và

$$
\begin{aligned}
D(u)&=\varphi(1-u)-\varphi(1-u^2)-0{,}1u^2\\
&=0{,}9u^2-u+\log(1+u),\\
D'(u)&=\frac{u(0{,}8+1{,}8u)}{1+u}.
\end{aligned}
$$

$D(0)=0$; $D$ giảm trên $(-\tfrac49,0)$, tăng trên $(0,\tfrac12]$ và tăng trên $[-\tfrac12,-\tfrac49]$. Vì $D(-\tfrac12)=0{,}225+0{,}5-\log2\approx0{,}032>0$, ta có $D\ge0$ trên $[-\tfrac12,\tfrac12]$.

**Kiểm tra lại.**

$\varphi(\tfrac34)=0{,}75+0{,}2877=1{,}0377$. Dãy $1-s^k$: $-2$, $-\tfrac12$, $\tfrac14$, $\tfrac1{16}$.
:::

::: exercise Bài tập 04.6
Với mất mát logistic không chính quy hóa của Ví dụ 01.7, $L(w)=2\log(1+e^{-w})+\log(1+e^w)$, nghiệm là $w^*=\log2$.

- (a) Chứng minh $L''(w)=\frac{3e^w}{(1+e^w)^2}$.
- (b) Từ $w^0=0$, tính hướng Newton, $\delta^2$, giảm mô hình và sai số mục tiêu $L(0)-L(\log2)$.
- (c) Biết $w^1=\tfrac23$ và $w^2\approx0{,}693033$, tính các khoảng cách $\lvert w^k-w^*\rvert$ với $k=0,1,2$ và tỷ số $\lvert w^{k+1}-w^*\rvert/\lvert w^k-w^*\rvert^2$.
:::

::: hint
$\ell''(m)=\frac{e^m}{(1+e^m)^2}$ là hàm chẵn; $L$ là tổng ba số hạng $\ell(w)$, $\ell(w)$, $\ell(-w)$. $L(\log2)=\log\tfrac{27}4$ theo Ví dụ 01.7.
:::

::: solution
**Câu (a).**

$L(w)=2\ell(w)+\ell(-w)$ với $\ell(m)=\log(1+e^{-m})$. Theo quy tắc dây chuyền, đạo hàm bậc hai của $\ell(-w)$ theo $w$ là $\ell''(-w)=\ell''(w)$ vì $\ell''$ chẵn. Vậy $L''(w)=3\ell''(w)=\frac{3e^w}{(1+e^w)^2}$.

**Câu (b).**

$L'(0)=\frac{1-2}{2}=-\tfrac12$, $L''(0)=\tfrac34$. Hướng Newton $d=\frac{1/2}{3/4}=\tfrac23$; $\delta^2=\frac{(1/2)^2}{3/4}=\tfrac13$; giảm mô hình $\tfrac16\approx0{,}1667$. Sai số mục tiêu $L(0)-\log\tfrac{27}4=3\log2-\log\tfrac{27}4=\log\tfrac{32}{27}\approx0{,}1699$.

**Câu (c).**

$\lvert w^0-w^*\rvert\approx0{,}6931$, $\lvert w^1-w^*\rvert\approx0{,}02648$, $\lvert w^2-w^*\rvert\approx0{,}000114$. Tỷ số: $\frac{0{,}02648}{0{,}6931^2}\approx0{,}055$ và $\frac{0{,}000114}{0{,}02648^2}\approx0{,}162$. Tỷ số bị chặn, đúng hội tụ bậc hai; khoảng cách giảm từ $2{,}6\cdot10^{-2}$ xuống $1{,}1\cdot10^{-4}$ trong một bước.

**Kiểm tra lại.**

$\log\tfrac{32}{27}=\log32-\log27\approx3{,}4657-3{,}2958=0{,}1699$. Ở bài này giảm mô hình $0{,}1667$ gần sai số mục tiêu $0{,}1699$, khác với VD2 ở Ví dụ 04.15.
:::

**Chuỗi suy luận của mục.**

1. Định nghĩa 04.28 lấy $W=H$ trong mô hình $Q_W$; Mệnh đề 04.29 đọc hướng Newton như cực tiểu mô hình, hướng giảm, hướng dốc nhất theo $\lVert\cdot\rVert_H$ và nghiệm của điều kiện dừng đã tuyến tính hóa.
2. Định nghĩa 04.30 và Mệnh đề 04.31 cho độ giảm Newton, mức giảm mô hình $\tfrac12\delta^2$ và tính bất biến affine; Nhận xét 04.32 tách ba phép trừ.
3. Thuật toán 04.2 ghép các phần trên với quay lui của Mục 2.
4. Định nghĩa 04.33, Định lý 04.34 và 04.35 cho tốc độ hội tụ bậc hai cục bộ và hai pha.

**Kết mục.** Mục này cho thuật toán Newton (Thuật toán 04.2) với tốc độ bậc hai gần nghiệm (Định lý 04.34). Còn hai thiếu hụt:

1. tiêu chí dừng $\tfrac12\delta^2$ chưa chặn được sai số mục tiêu (Nhận xét 04.32), và Mục 6 giải quyết bằng tính tự điều chỉnh;
2. phương pháp chỉ áp dụng cho bài không ràng buộc, vì với ràng buộc $Au=b$ hướng Newton không ràng buộc có thể đưa điểm lặp ra khỏi tập khả thi; Mục 4 thêm ràng buộc vào bài con Newton.

## 4. Newton khả thi cho ràng buộc đẳng thức

Mục 3 xây phương pháp Newton cho bài không ràng buộc. Lớp bài thứ hai của Định nghĩa 04.1 có thêm ràng buộc $Au=b$, và Mệnh đề 04.2(b) cho đích là hệ (1.2) gồm $n+p$ phương trình. Xét VD3:

$$
\underset{u\in\mathbb R^2}{\operatorname{minimize}}\quad F(u)=\tfrac12(2u_1^2+5u_2^2)\qquad\text{subject to}\quad u_1+u_2=14,
$$

tức $A=[1\ \ 1]$, $b=14$, $n=2$, $p=1$. Bài này bậc hai, nên hệ (1.2) giải được bằng tay và nghiệm của nó làm mốc để kiểm các bước Newton. Bài toán thật sự là trường hợp $F$ không bậc hai, nơi (1.2) phi tuyến. Mục này chỉ ra rằng hướng Newton của Mục 3 phá ràng buộc, thêm điều kiện giữ khả thi vào bài con, giải bài con bằng hệ khối và bằng khử biến, và ghép thành thuật toán Newton khả thi.

### 4.1 Hướng khả thi

::: example Ví dụ 04.17 (VD3: nghiệm tham chiếu và hướng Newton không ràng buộc)
**Nghiệm tham chiếu.**

Hàm Lagrange $F(u)+\nu(u_1+u_2-14)$ cho hệ (1.2):

$$
2u_1+\nu=0,\qquad5u_2+\nu=0,\qquad u_1+u_2=14 .
$$

Trừ hai phương trình đầu: $2u_1-5u_2=0$. Cùng $u_1+u_2=14$ cho $u_2=4$, $u_1=10$, rồi $\nu^*=-2u_1=-20$ và $F^*=\tfrac12(200+80)=140$. Hessian $\operatorname{diag}(2,5)\succ0$, nên $F$ lồi chặt và theo Mệnh đề 04.2(b), $u^*=(10,4)^T$ là nghiệm duy nhất.

**Hướng Newton không ràng buộc từ điểm khả thi.**

Điểm $u^0=(16,-2)^T$ thỏa $16-2=14$; tọa độ âm hợp lệ vì bài không có điều kiện dấu. Tại đó $g=\nabla F(u^0)=(2u_1,5u_2)^T=(32,-10)^T$, $H=\operatorname{diag}(2,5)$, và $F(u^0)=\tfrac12(512+20)=266$. Hướng Newton của Mục 3 là $d=-H^{-1}g=(-16,2)^T$.

**Kiểm tra ràng buộc.**

$Ad=-16+2=-14\ne0$. Bước đầy đủ cho $(0,0)^T$, cực tiểu không ràng buộc của $F$, với tổng tọa độ bằng $0$ thay vì $14$.

**Kiểm tra lại.**

Tại $u^*$: $\nabla F(u^*)=(20,20)^T=-\nu^*A^T$, gradient vuông góc với đường khả thi.
:::

![Hai trục u1, u2 với đường thẳng u1 cộng u2 bằng 14. Điểm đầu khả thi (16, âm 2) nằm trên đường mức F bằng 266, nghiệm (10, 4) nằm trên đường mức F bằng 140; đường mức 140 tiếp xúc với đường khả thi tại nghiệm. Bài toán không có điều kiện không âm.](img/lec-04/equality-start-new.svg)

![Hai trục u1, u2 với đường u1 cộng u2 bằng 14 và miền nhìn từ âm 3 tới 17. Mũi tên d bằng (âm 16, 2) đi từ điểm (16, âm 2) về gốc (0, 0), rời khỏi đường khả thi; nhãn ghi A d bằng âm 14, khác 0.](img/lec-04/equality-violation.svg)

Hình thứ nhất cho thấy tại nghiệm, đường mức của $F$ tiếp xúc với đường khả thi. Hình thứ hai cho thấy hướng Newton không ràng buộc chỉ thẳng về gốc, bỏ qua ràng buộc. Hướng cần tìm phải nằm dọc theo đường khả thi.

::: proposition Mệnh đề 04.37 (Hướng khả thi)
**Giả thiết.** $A\in\mathbb R^{p\times n}$, $Au=b$, $d\in\mathbb R^n$.

**Kết luận.** $A(u+td)=b$ với mọi $t\in\mathbb R$ khi và chỉ khi $Ad=0$, tức $d\in\ker A$.

**Điều kiện áp dụng.** Ràng buộc affine; điểm hiện tại khả thi.

**Phạm vi.** Mệnh đề chỉ nói về ràng buộc; $u+td$ còn phải thuộc $\operatorname{dom}F$.
:::

::: proof Chứng minh Mệnh đề 04.37
$A(u+td)=Au+tAd=b+tAd$. Vế phải bằng $b$ với mọi $t$ khi và chỉ khi $Ad=0$; chiều thuận lấy $t=1$. $\square$
:::

Hướng khả thi chỉ bị ràng buộc về phương; độ dài bước $t$ vẫn tự do. Với $A=[1\ \ 1]$, $\ker A$ là đường $d_1+d_2=0$, song song với đường khả thi: tọa độ này tăng bao nhiêu thì tọa độ kia giảm bấy nhiêu. Tập hướng khả thi $\ker A$ đã xuất hiện ở Bước 3 của chứng minh Mệnh đề 04.2; ở đó, gradient trực giao với $\ker A$ tại nghiệm.

### 4.2 Bài con có đẳng thức và hệ Newton khả thi

Trực giác: giữ mô hình Newton của Mục 3, nhưng chỉ cho phép bước đi theo các hướng khả thi. Bài con trở thành một bài bậc hai có ràng buộc đẳng thức, và hệ KKT của nó là hệ tuyến tính.

::: definition Định nghĩa 04.38 (Bước Newton khả thi)
Cho bài có đẳng thức của Định nghĩa 04.1, một điểm khả thi $u\in\operatorname{dom}F$ với $Au=b$, $g=\nabla F(u)$ và $H=\nabla^2F(u)$. Bài con Newton khả thi là

$$
\underset{d\in\mathbb R^n}{\operatorname{minimize}}\quad g^Td+\tfrac12d^THd\qquad\text{subject to}\quad Ad=0 .
$$

Với hàm Lagrange $L_m(d,\eta)=g^Td+\tfrac12d^THd+\eta^TAd$, nhân tử $\eta\in\mathbb R^p$ tự do dấu, hệ KKT của bài con là

$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\eta\end{bmatrix}=-\begin{bmatrix}g\\0\end{bmatrix}.
\tag{4.1}
$$

Nghiệm $d$ gọi là bước Newton khả thi tại $u$. Số $\delta_{eq}=\sqrt{d^THd}$ gọi là độ giảm Newton của bài con.
:::

Mục tiêu của bài con là mô hình $Q_H$ bỏ hằng số $F(u)$, nên có cùng nghiệm. Hàng trên của (4.1) là nhóm dừng: đạo hàm của $L_m$ theo $d$ gồm $g$ từ $g^Td$, $Hd$ từ $\tfrac12d^THd$ vì $H$ đối xứng, và $A^T\eta$ từ $\eta^TAd$. Hàng dưới là nhóm khả thi $Ad=0$, đạo hàm của $L_m$ theo $\eta$. Không có nhóm khả thi đối ngẫu hay bù trừ vì không có bất đẳng thức.

Ký hiệu $\eta$ dành cho nhân tử của bài con, $\nu$ dành cho nhân tử của bài gốc. Hệ (4.1) có cùng dạng với (1.2): gradient của mô hình $g+Hd$ thay cho $\nabla F$, và ràng buộc thuần nhất $Ad=0$ thay cho $Au=b$. Khi $p=0$, (4.1) trở lại hệ Newton (3.1).

Kết quả sau nêu điều kiện để hệ có nghiệm duy nhất và các tính chất của bước, theo đúng thứ tự của Mệnh đề 04.29 cho bài không ràng buộc.

::: theorem Định lý 04.39 (Hệ KKT của bước Newton khả thi)
**Giả thiết.** $A$ đủ hạng hàng; $u$ khả thi; $d^THd>0$ với mọi $d\in\ker A$, $d\ne0$; điều này đúng khi $H\succ0$.

**Kết luận.**

- (a) Ma trận khối của (4.1) khả nghịch, nên (4.1) có nghiệm duy nhất $(d,\eta)$.
- (b) $d$ là nghiệm duy nhất của bài con Newton khả thi.
- (c) $g^Td=-\delta_{eq}^2$, và mức giảm mô hình là $\tfrac12\delta_{eq}^2$.
- (d) $\delta_{eq}=0$ khi và chỉ khi $(u,\eta)$ thỏa (1.2), tức $u$ là nghiệm của bài gốc với $\nu^*=\eta$.
- (e) $A(u+td)=b$ với mọi $t$.

**Điều kiện áp dụng.** Chỉ cần $H$ xác định dương trên $\ker A$, yếu hơn $H\succ0$; cần $A$ đủ hạng hàng.

**Phạm vi.** Định lý nói về bài con. Với $F$ không bậc hai, $u+d$ chưa là nghiệm bài gốc, và có thể nằm ngoài $\operatorname{dom}F$.
:::

::: proof Chứng minh Định lý 04.39
**Bước 1 (khả nghịch).**

Giả sử $Hd+A^T\eta=0$ và $Ad=0$. Nhân hàng đầu với $d^T$ và dùng $d^TA^T\eta=(Ad)^T\eta=0$ được $d^THd=0$. Vì $d\in\ker A$ và $H$ xác định dương trên $\ker A$, $d=0$.

Khi đó $A^T\eta=0$, và $A$ đủ hạng hàng cho $\eta=0$. Hệ thuần nhất chỉ có nghiệm không, nên ma trận vuông cỡ $(n+p)\times(n+p)$ khả nghịch.

**Bước 2 (cực tiểu của bài con).**

Lấy $d'\in\ker A$ bất kỳ và đặt $e=d'-d\in\ker A$. Khai triển mô hình $m(d)=g^Td+\tfrac12d^THd$:

$$
\begin{aligned}
m(d')-m(d)&=(g+Hd)^Te+\tfrac12e^THe\\
&=-\eta^TAe+\tfrac12e^THe\\
&=\tfrac12e^THe .
\end{aligned}
$$

Dòng thứ hai dùng hàng đầu của (4.1); dòng thứ ba dùng $Ae=0$. Vế phải dương khi $e\ne0$, nên $d$ là nghiệm duy nhất.

**Bước 3 (hướng giảm và mức giảm).**

Nhân hàng đầu của (4.1) với $d^T$: $g^Td+d^THd+(Ad)^T\eta=0$, và $Ad=0$, nên $g^Td=-d^THd=-\delta_{eq}^2$. Mức giảm mô hình là $-g^Td-\tfrac12d^THd=\tfrac12\delta_{eq}^2$.

**Bước 4 (phần d).**

Nếu $\delta_{eq}=0$ thì $d=0$ vì $d\in\ker A$ và $H$ xác định dương trên $\ker A$; hàng đầu của (4.1) thành $g+A^T\eta=0$, cùng với $Au=b$ là (1.2). Ngược lại, nếu $(u,\nu^*)$ thỏa (1.2) thì $(d,\eta)=(0,\nu^*)$ thỏa (4.1), và theo tính duy nhất ở Bước 1, $d=0$.

**Bước 5 (phần e).**

Mệnh đề 04.37 với $Ad=0$. $\square$
:::

Định lý 04.39 là phiên bản có ràng buộc của Mệnh đề 04.29. Phần (c) cho hướng giảm nên quay lui Armijo trên $F$ dừng sau hữu hạn lần co (Mệnh đề 04.11); phần (e) cho mọi bước $t$ giữ khả thi. Giả thiết $H$ xác định dương trên $\ker A$ là điều kiện bậc hai của bài con: kết luận chỉ dùng độ cong theo các hướng khả thi.

**Trong học máy.** Khi các tham số của một mô hình phải thỏa một đẳng thức tuyến tính, như trọng số trộn $w_1+\cdots+w_K=1$ hay một ràng buộc cân bằng giữa các nhóm dữ liệu, mỗi bước Newton khả thi giải hệ (4.1) với $H$ là Hessian của mất mát. Về lý thuyết, ràng buộc được giữ chính xác ở mọi bước, không phải phạt hay chiếu lại sau mỗi bước; Nhận xét 04.42 bàn ảnh hưởng của sai số máy. Nhân tử $\eta$ hội tụ về $\nu^*$, đo độ nhạy của mất mát tối ưu theo vế phải $b$ (Hệ quả 03.24); Tình huống 04.2 đọc nhân tử này cho bài trọng số trộn.

::: example Ví dụ 04.18 (Một bước Newton khả thi trên VD3)
**Lập hệ.**

Tại $u^0=(16,-2)^T$: $g=(32,-10)^T$, $H=\operatorname{diag}(2,5)$. Hệ (4.1) gồm ba phương trình:

$$
\begin{aligned}
2d_1+\eta&=-32,\\
5d_2+\eta&=10,\\
d_1+d_2&=0 .
\end{aligned}
$$

**Giải.**

Trừ hàng hai khỏi hàng một: $2d_1-5d_2=-42$. Thay $d_2=-d_1$: $7d_1=-42$, nên $d=(-6,6)^T$, và từ hàng đầu $\eta=-32-2d_1=-20$.

**Bước đầy đủ.**

$u^0+d=(10,4)^T=u^*$. Mức giảm thật $266-140=126$; mức giảm mô hình $\tfrac12\delta_{eq}^2=\tfrac12(2\cdot36+5\cdot36)=126$.

**Kiểm tra lại.**

$Ad=-6+6=0$. Tại điểm mới, $\nabla F=(20,20)^T$ và $\nabla F+A^T\eta=(0,0)^T$: hàng dừng của bài con trùng hàng dừng (1.2) của bài gốc, nên $\eta=\nu^*=-20$.
:::

![Hai trục u1, u2 với đường u1 cộng u2 bằng 14 và miền nhìn từ âm 3 tới 17. Mũi tên d bằng (âm 6, 6) đi từ điểm (16, âm 2) tới điểm (10, 4) dọc theo đường khả thi; nhãn ghi A d bằng 0 và t bằng 1. Hai đường mức F bằng 266 và F bằng 140 đi qua hai điểm này.](img/lec-04/equality-feasible-step.svg)

Hình cho thấy bước Newton khả thi nằm trên đường khả thi và đi đúng tới nghiệm. Điều này xảy ra vì $F$ bậc hai: mô hình trùng hàm, nên $g+Hd=\nabla F(u+d)$, và hàng dừng của bài con là hàng dừng của bài gốc tại $u+d$. Với $F$ không bậc hai, mức giảm mô hình và mức giảm thật khác nhau như ở VD2, và một bước không kết thúc bài toán.

::: remark Nhận xét 04.40 (Cấu trúc của ma trận khối)
**Không xác định dương.** Ma trận khối của (4.1) đối xứng nhưng không xác định dương: với $d=0$ và $\eta\ne0$, dạng toàn phương của nó bằng $2\eta^TA\cdot0+0=0$. Khi $A$ đủ hạng hàng và $H$ xác định dương trên $\ker A$, nó có đúng $p$ giá trị riêng âm (Nocedal và Wright 2006, mục 16.2). Do đó không áp dụng phân rã Cholesky cho cả ma trận; các bộ giải dùng phân rã đối xứng $LDL^T$ hoặc khử khối (Boyd và Vandenberghe 2004, mục 10.4, tr. 542–546).

**Chỉ cần xác định dương trên $\ker A$.** Với $H=\operatorname{diag}(1,-1)$ và $A=[0\ \ 1]$, $H$ không nửa xác định dương, nhưng $\ker A=\{(d_1,0)\}$ và $d^THd=d_1^2>0$ trên đó. Hệ (4.1) khả nghịch theo Định lý 04.39 (Bài tập 04.13).
:::

### 4.3 Khử biến và hệ rút gọn

Hệ (4.1) có cỡ $n+p$ và không xác định dương. Trực giác cho cách khác: tập khả thi là một mặt phẳng affine số chiều $n-p$; nếu dùng tọa độ trên chính mặt phẳng đó, ràng buộc biến mất và bài toán trở thành không ràng buộc với $n-p$ biến.

::: proposition Mệnh đề 04.41 (Khử biến và hệ Newton rút gọn)
**Giả thiết.** $A$ đủ hạng hàng; $\hat u$ thỏa $A\hat u=b$; $N\in\mathbb R^{n\times(n-p)}$ có các cột là một cơ sở của $\ker A$; $u=\hat u+Nz$ khả thi; $H$ xác định dương trên $\ker A$.

**Kết luận.**

- (a) Tập $\{u\mid Au=b\}$ bằng $\{\hat u+Nz\mid z\in\mathbb R^{n-p}\}$, và mỗi điểm khả thi ứng với đúng một $z$.
- (b) $N^THN\succ0$.
- (c) Hệ rút gọn

$$
N^THN\,\Delta z=-N^Tg
\tag{4.2}
$$

có nghiệm duy nhất, và $d=N\Delta z$ là bước Newton khả thi của (4.1).
- (d) $\Delta z$ là hướng Newton tại $z$ của hàm rút gọn $\psi(z)=F(\hat u+Nz)$, và độ giảm Newton của $\psi$ tại $z$ bằng $\delta_{eq}$.

**Điều kiện áp dụng.** Cần một điểm khả thi $\hat u$ và một cơ sở của $\ker A$.

**Phạm vi.** Hệ rút gọn không cho $\eta$; khi cần, $\eta$ được tính lại từ hàng dừng. Việc tính $N$ có chi phí riêng và có thể phá cấu trúc thưa của $H$.
:::

::: proof Chứng minh Mệnh đề 04.41
**Bước 1 (phần a).**

Nếu $Au=b$ thì $A(u-\hat u)=0$, nên $u-\hat u\in\ker A$ là tổ hợp các cột của $N$: $u-\hat u=Nz$. Ngược lại $A(\hat u+Nz)=b+ANz=b$. Các cột của $N$ độc lập tuyến tính nên $z$ duy nhất.

**Bước 2 (phần b).**

Với $v\ne0$, $Nv\ne0$ vì các cột của $N$ độc lập, và $Nv\in\ker A$. Do đó $v^TN^THNv=(Nv)^TH(Nv)>0$.

**Bước 3 (phần c).**

Theo (b), (4.2) có nghiệm duy nhất. Đặt $d=N\Delta z$; ta có $Ad=0$. Hệ (4.2) nói $N^T(g+Hd)=0$, tức $g+Hd$ trực giao với mọi cột của $N$, nên trực giao với $\ker A$.

Theo sự kiện đại số tuyến tính trong Kiến thức tiên quyết, $g+Hd=-A^T\eta$ với một $\eta\in\mathbb R^p$. Vậy $(d,\eta)$ thỏa (4.1), và theo Định lý 04.39(a), đó là nghiệm duy nhất.

**Bước 4 (phần d).**

Theo quy tắc dây chuyền, $\nabla\psi(z)=N^Tg$ và $\nabla^2\psi(z)=N^THN$, nên (4.2) là hệ Newton của $\psi$. Bình phương độ giảm Newton của $\psi$ là

$$
\begin{aligned}
\Delta z^TN^THN\Delta z&=(N\Delta z)^TH(N\Delta z)\\
&=d^THd&&(d=N\Delta z)\\
&=\delta_{eq}^2 .
\end{aligned}
$$

Dòng cuối là Định nghĩa 04.38.

$\square$
:::

Mệnh đề 04.41 cho hai cách tính cùng một bước. Hệ khối (4.1) giữ nguyên cấu trúc của $H$ và $A$, cho cả $\eta$. Hệ rút gọn (4.2) nhỏ hơn và xác định dương, giải được bằng Cholesky, nhưng cần tính $N$.

Phần (d) còn cho một kết luận lý thuyết: Newton khả thi chính là Newton không ràng buộc trên hàm rút gọn $\psi$. Mọi kết quả của Mục 3 cho bài không ràng buộc, như Định lý 04.34, áp dụng được cho bài có đẳng thức qua $\psi$; Mục 6 dùng điều này cho cận sai số.

::: example Ví dụ 04.19 (Khử biến trên VD3)
**Tham số hóa.**

$\hat u=(14,0)^T$ thỏa $A\hat u=14$; $N=(-1,1)^T$ thỏa $AN=0$. Điểm khả thi $u(z)=(14-z,z)^T$, và $u^0=(16,-2)^T$ ứng với $z^0=-2$.

**Hệ rút gọn.**

$N^THN=(-1)^2\cdot2+1^2\cdot5=7$ và $N^Tg=-32-10=-42$. Hệ (4.2): $7\Delta z=42$, nên $\Delta z=6$ và $d=N\Delta z=(-6,6)^T$, trùng Ví dụ 04.18.

**Hàm rút gọn.**

$\psi(z)=\tfrac12\bigl(2(14-z)^2+5z^2\bigr)=196-28z+\tfrac72z^2$, với $\psi'(z)=-28+7z$ và cực tiểu tại $z^*=4$, tức $u^*=(10,4)^T$. Bước $\Delta z=z^*-z^0=6$.

**Kiểm tra lại.**

$\psi(-2)=196+56+14=266=F(u^0)$ và $\psi(4)=196-112+56=140=F^*$. Bình phương độ giảm Newton của $\psi$ tại $z^0$ là $\frac{\psi'(-2)^2}{\psi''}=\frac{42^2}7=252=\delta_{eq}^2$.
:::

![Hai trục u1, u2 với đường u1 cộng u2 bằng 14. Điểm u mũ bằng (14, 0) ứng với z bằng 0; vector N bằng (âm 1, 1) chỉ dọc đường khả thi. Điểm đầu ứng với z0 bằng âm 2 là (16, âm 2); nghiệm ứng với z sao bằng 4 là (10, 4). Số gia Delta z bằng 6 cho hướng d bằng N nhân Delta z bằng (âm 6, 6).](img/lec-04/equality-nullspace.svg)

Hình đặt tọa độ $z$ lên đường khả thi: gốc tại $\hat u=(14,0)^T$, đơn vị là vector $N$. Trong tọa độ này, bài toán là cực tiểu hàm một biến $\psi$, và bước Newton của $\psi$ đi từ $z^0=-2$ tới $z^*=4$.

Ghép bài con, quy tắc nhận bước trên $F$ và tiêu chí dừng theo $\delta_{eq}$ cho thuật toán.

::: algorithm Thuật toán 04.3 (Newton khả thi)
**Đầu vào.** Điểm đầu $u^0\in\operatorname{dom}F$ với $Au^0=b$; dung sai $\varepsilon_{\mathrm{model}}>0$; tham số $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Lặp** với $k=0,1,2,\ldots$:

1. Tính $g=\nabla F(u^k)$ và $H=\nabla^2F(u^k)$.
2. Giải hệ (4.1) để được $(d,\eta)$, hoặc hệ (4.2) rồi đặt $d=N\Delta z$.
3. Tính $\delta_{eq}^2=d^THd$.
4. Nếu $\tfrac12\delta_{eq}^2\le\varepsilon_{\mathrm{model}}$: dừng, trả về $u^k$ và $\eta$.
5. Chọn $t$ bằng quay lui Armijo trên $F$ theo hướng $d$, loại các điểm thử ngoài $\operatorname{dom}F$.
6. Cập nhật $u^{k+1}=u^k+td$.

**Đầu ra.** Điểm khả thi $u$ với $\tfrac12\delta_{eq}^2\le\varepsilon_{\mathrm{model}}$ và ước lượng nhân tử $\eta$.

**Điều kiện đủ.** $A$ đủ hạng hàng, $H$ xác định dương trên $\ker A$ tại mọi điểm lặp.

**Chi phí mỗi lượt.** Hệ khối đặc cỡ $n+p$: cỡ $(n+p)^3$ phép nhân; hệ rút gọn cỡ $n-p$ sau khi đã có $N$.
:::

::: remark Nhận xét 04.42 (Tính khả thi khi tính bằng số thực dấu phẩy động)
**Sai số máy.** Về lý thuyết, mọi điểm lặp thỏa $Au^k=b$ (Định lý 04.39(e)). Khi tính bằng số thực dấu phẩy động, $Au^k-b$ có thể tích lũy sai lệch nhỏ qua nhiều bước, nên cần kiểm và, nếu cần, chiếu lại lên tập khả thi.
:::

**Trong học máy.** Bài phân bổ tài nguyên $\min\sum_if_i(x_i)$ với $\sum_ix_i=b$, ví dụ phân bổ một ngân sách tính toán cho các mô hình con, có $A=\mathbf 1^T$ và Hessian đường chéo với phần tử $h_i=f_i''(x_i)$ (MIT 6.079, bài giảng 17, tr. 5). Khi mỗi $f_i$ có $f_i''>0$, thì $h_i>0$ và hệ (4.1) giải được bằng một phép khử khối: $d_i=-(g_i+\eta)/h_i$, rồi $\eta$ xác định từ $\sum_id_i=0$. Chi phí tỷ lệ với $n$ thay vì $n^3$.

::: exercise Bài tập 04.7
Với VD3 tại điểm khả thi $u=(8,6)^T$:

- (a) lập hệ (4.1), giải $d$ và $\eta$, kiểm $Ad=0$, tính $u+d$ và mức giảm của $F$;
- (b) với $N=(-1,1)^T$, giải (4.2) và so với (a);
- (c) giải thích vì sao $\eta$ ở (a) bằng $\eta$ của Ví dụ 04.18, dù điểm đầu khác.
:::

::: hint
$g=(16,30)^T$. Ở (c), dùng lập luận cuối của Ví dụ 04.18 về hàng dừng tại $u+d$.
:::

::: solution
**Câu (a).**

Hệ: $2d_1+\eta=-16$, $5d_2+\eta=-30$, $d_1+d_2=0$. Trừ hai hàng đầu: $2d_1-5d_2=14$; thay $d_2=-d_1$: $7d_1=14$, nên $d=(2,-2)^T$, $\eta=-16-4=-20$. $Ad=0$; $u+d=(10,4)^T$; $F(8,6)=\tfrac12(128+180)=154$, nên $F$ giảm $14=\tfrac12(2\cdot4+5\cdot4)$.

**Câu (b).**

$N^THN=7$, $N^Tg=-16+30=14$, nên $7\Delta z=-14$, $\Delta z=-2$, $d=(2,-2)^T$, trùng (a).

**Câu (c).**

$F$ bậc hai nên $g+Hd=\nabla F(u+d)$, và hàng dừng của (4.1) là $\nabla F(u+d)+A^T\eta=0$. Bước đầy đủ từ mọi điểm khả thi tới đúng $u^*$, nên hàng này là (1.2) tại $u^*$, và $\eta=\nu^*=-20$ theo tính duy nhất của nhân tử (Mệnh đề 04.2).

**Kiểm tra lại.**

$\nabla F(10,4)-20(1,1)^T=(20-20,20-20)^T=0$.
:::

::: exercise Bài tập 04.8
Xét $\min F(u)=\tfrac12(u_1^2+2u_2^2+2u_3^2)$ với $u_1+u_2+u_3=5$, điểm đầu khả thi $u^0=(5,0,0)^T$.

- (a) Giải hệ (4.1) tại $u^0$.
- (b) Với $N=\begin{bmatrix}-1&-1\\1&0\\0&1\end{bmatrix}$, kiểm $AN=0$, lập và giải (4.2), so với (a).
- (c) Tính $F(u^0)$, $F(u^0+d)$ và $\tfrac12\delta_{eq}^2$.
:::

::: hint
Ở (a), hai hàng dừng cuối cho $d_2=d_3$. Ở (b), $N^THN$ là ma trận $2\times2$.
:::

::: solution
**Câu (a).**

$g=(5,0,0)^T$, $H=\operatorname{diag}(1,2,2)$. Hệ: $d_1+\eta=-5$, $2d_2+\eta=0$, $2d_3+\eta=0$, $d_1+d_2+d_3=0$. Từ hai hàng giữa, $d_2=d_3=-\eta/2$; hàng cuối cho $d_1=\eta$; hàng đầu cho $2\eta=-5$. Vậy $\eta=-\tfrac52$, $d=(-\tfrac52,\tfrac54,\tfrac54)^T$.

**Câu (b).**

$AN=(-1+1+0,\,-1+0+1)=(0,0)$. $N^THN=\begin{bmatrix}1+2&1\\1&1+2\end{bmatrix}=\begin{bmatrix}3&1\\1&3\end{bmatrix}$ và $N^Tg=(-5,-5)^T$. Hệ $3\Delta z_1+\Delta z_2=5$, $\Delta z_1+3\Delta z_2=5$ cho $\Delta z=(\tfrac54,\tfrac54)^T$, nên $d=N\Delta z=(-\tfrac52,\tfrac54,\tfrac54)^T$, trùng (a).

**Câu (c).**

$F(u^0)=\tfrac{25}2$. $u^0+d=(\tfrac52,\tfrac54,\tfrac54)^T$ và $F=\tfrac12(\tfrac{25}4+\tfrac{25}8+\tfrac{25}8)=\tfrac{25}4$. $\delta_{eq}^2=\tfrac{25}4+2\cdot\tfrac{25}{16}+2\cdot\tfrac{25}{16}=\tfrac{25}2$, nên $\tfrac12\delta_{eq}^2=\tfrac{25}4=F(u^0)-F(u^0+d)$.

**Kiểm tra lại.**

Tại $u^0+d$: $\nabla F=(\tfrac52,\tfrac52,\tfrac52)^T$ và $\nabla F+\eta\mathbf1=0$, nên điểm mới thỏa (1.2) với $\nu^*=-\tfrac52$.
:::

**Chuỗi suy luận của mục.**

1. Ví dụ 04.17 và Mệnh đề 04.37: hướng Newton không ràng buộc phá ràng buộc; hướng khả thi là $\ker A$.
2. Định nghĩa 04.38 và Định lý 04.39: bài con Newton có ràng buộc $Ad=0$, hệ KKT (4.1) khả nghịch, cho hướng giảm giữ khả thi.
3. Mệnh đề 04.41: khử biến cho hệ rút gọn (4.2) cùng bước, và Newton khả thi là Newton trên hàm rút gọn $\psi$.
4. Thuật toán 04.3 ghép các phần trên.

**Kết mục.** Mục này cho Thuật toán 04.3, giữ tính khả thi ở mọi bước và thừa hưởng các kết quả của Mục 3 qua hàm rút gọn. Thuật toán đòi điểm đầu thỏa $Au^0=b$ và nằm trong $\operatorname{dom}F$. Tại một điểm chưa khả thi, mọi hướng $d\in\ker A$ giữ nguyên sai lệch $Au-b$, nên phương pháp không bao giờ tới tập khả thi. Mục 5 thay bài con bằng phép tuyến tính hóa toàn bộ hệ (1.2), hiệu chỉnh đồng thời điều kiện dừng và sai lệch ràng buộc.

## 5. Newton từ điểm chưa khả thi

Thuật toán 04.3 cần một điểm vừa thỏa $Au=b$ vừa thuộc $\operatorname{dom}F$, và điểm như vậy không phải lúc nào cũng có sẵn. Với $F$ chứa $-\log u_i$, nghiệm của $Au=b$ tìm được bằng đại số tuyến tính có thể có thành phần âm, ngoài miền. Khi vế phải $b$ thay đổi, như khi cập nhật ngân sách, điểm tối ưu cũ không còn khả thi nhưng vẫn là một điểm đầu tốt.

Tại VD3 với $u=(1,8)^T$, tổng tọa độ bằng $9\ne14$, và mọi bước theo $\ker A$ giữ tổng bằng $9$. Mục này đo mức vi phạm của cả hai nhóm phương trình (1.2), tuyến tính hóa chúng theo cách đọc (d) của Mệnh đề 04.29, và thay quy tắc nhận bước trên $F$ bằng quy tắc trên chuẩn phần dư.

### 5.1 Phần dư KKT

Trực giác: thay vì đòi điểm lặp thỏa sẵn một nhóm phương trình, đo xem mỗi nhóm đang lệch bao nhiêu, rồi tìm bước làm cả hai độ lệch về $0$.

::: definition Định nghĩa 04.43 (Phần dư KKT)
Cho bài có đẳng thức của Định nghĩa 04.1, $u\in\operatorname{dom}F$ và $\nu\in\mathbb R^p$.

- **Phần dư đối ngẫu** (dual residual): $r_d(u,\nu)=\nabla F(u)+A^T\nu\in\mathbb R^n$.
- **Phần dư khả thi** (primal residual): $r_p(u)=Au-b\in\mathbb R^p$.
- **Phần dư ghép**: $r(u,\nu)=(r_d,r_p)\in\mathbb R^{n+p}$.
:::

Hai phần dư là vế trái của hai nhóm phương trình (1.2): $r_d$ ứng với nhóm dừng, $r_p$ ứng với nhóm khả thi. Theo Mệnh đề 04.2(b), $u$ là nghiệm với nhân tử $\nu$ khi và chỉ khi $r(u,\nu)=0$. Chỉ số $d$ trong $r_d$ viết tắt "đối ngẫu" (dual), khác hướng $d$; chỉ số $p$ viết tắt "gốc" (primal), khác số ràng buộc $p$.

Khác với Mục 4, nhân tử $\nu$ ở đây là một phần của điểm lặp: $r_d$ phụ thuộc cả $u$ và $\nu$, nên $\nu$ được cập nhật cùng $u$. Tại điểm khả thi, $r_p=0$ và $r_d=g+A^T\nu$; Mục 4 không cần $\nu$ vì nhân tử $\eta$ được giải lại từ đầu ở mỗi bước.

::: example Ví dụ 04.20 (Phần dư của VD3 tại một điểm chưa khả thi)
**Dữ kiện.**

$u=(1,8)^T$, ước lượng ban đầu $\nu=4$.

**Tính.**

$\nabla F(u)=(2u_1,5u_2)^T=(2,40)^T$; $A^T\nu=(4,4)^T$; $r_d=(6,44)^T$. $r_p=1+8-14=-5$.

**Kiểm tra lại.**

Số $40$ thuộc gradient, số $44$ thuộc phần dư; bỏ $A^T\nu$ khi lập $r_d$ là lỗi thường gặp. Dấu $r_p<0$ cho biết tổng tọa độ nhỏ hơn $14$.
:::

![Hai trục u1, u2 với đường khả thi u1 cộng u2 bằng 14 và nghiệm (10, 4) có F sao bằng 140. Điểm đầu chưa khả thi (1, 8) nằm dưới đường khả thi; nhãn ghi r p bằng 9 trừ 14 bằng âm 5.](img/lec-04/equality-infeasible-start.svg)

Hình đặt điểm $(1,8)^T$ ở phía dưới đường khả thi, cách đường đó một lượng đo bởi $r_p=-5$. Bước cần tìm phải vừa đưa điểm về đường khả thi, vừa giảm phần dư đối ngẫu.

### 5.2 Tuyến tính hóa hệ KKT

Áp cách đọc (d) của Mệnh đề 04.29 cho hệ $r(u,\nu)=0$: thay mỗi phần dư tại điểm mới $(u+d,\nu+\Delta\nu)$ bằng xấp xỉ bậc một của nó, rồi đặt xấp xỉ bằng $0$.

::: proposition Mệnh đề 04.44 (Hệ Newton cho phần dư KKT)
**Giả thiết.** $F$ khả vi hai lần tại $u\in\operatorname{dom}F$, $H=\nabla^2F(u)$; $A$ đủ hạng hàng; $H$ xác định dương trên $\ker A$.

**Kết luận.**

- (a) Xấp xỉ bậc một của hai phần dư theo số gia $d\in\mathbb R^n$, $\Delta\nu\in\mathbb R^p$ là

$$
r_d(u+d,\nu+\Delta\nu)\approx r_d+Hd+A^T\Delta\nu,\qquad r_p(u+d)=r_p+Ad,
$$

trong đó hệ thức thứ hai là đẳng thức. Đặt hai vế phải bằng $0$ được hệ

$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\Delta\nu\end{bmatrix}=-\begin{bmatrix}r_d\\r_p\end{bmatrix},
\tag{5.1}
$$

có nghiệm duy nhất.
- (b) Đặt $\eta=\nu+\Delta\nu$. Hàng đầu của (5.1) là $g+Hd+A^T\eta=0$. Khi $r_p=0$, nghiệm $(d,\eta)$ của (5.1) là nghiệm của (4.1).
- (c) Với mọi $t$: $r_p(u+td)=(1-t)r_p$ và $\nu+t\Delta\nu=(1-t)\nu+t\eta$.
- (d) Nếu $F$ bậc hai thì $r(u+td,\nu+t\Delta\nu)=(1-t)\,r(u,\nu)$ với mọi $t$; nói riêng, bước $t=1$ cho nghiệm KKT.

**Điều kiện áp dụng.** Cùng điều kiện khả nghịch với Định lý 04.39; không cần $u$ khả thi.

**Phạm vi.** Với $F$ không bậc hai, xấp xỉ ở (a) chỉ đúng tới bậc một và bước $t=1$ không đưa $r_d$ về $0$.
:::

::: proof Chứng minh Mệnh đề 04.44
**Bước 1 (tuyến tính hóa).**

Trong $r_d=\nabla F(u)+A^T\nu$, chỉ $\nabla F$ phi tuyến: $\nabla F(u+d)=\nabla F(u)+Hd+o(\lVert d\rVert_2)$, còn $A^T(\nu+\Delta\nu)=A^T\nu+A^T\Delta\nu$ đúng chính xác. Cộng lại được xấp xỉ thứ nhất.

Ràng buộc affine cho $A(u+d)-b=r_p+Ad$ chính xác. Đặt hai vế phải bằng $0$ và xếp thành ma trận được (5.1). Ma trận của (5.1) là ma trận của (4.1), khả nghịch theo Định lý 04.39(a); chứng minh khả nghịch không dùng vế phải.

**Bước 2 (phần b).**

Thay $r_d=g+A^T\nu$ vào hàng đầu: $g+A^T\nu+Hd+A^T\Delta\nu=g+Hd+A^T(\nu+\Delta\nu)=0$. Khi $r_p=0$, hàng sau là $Ad=0$, nên $(d,\eta)$ thỏa (4.1).

**Bước 3 (phần c).**

Dùng hàng sau của (5.1), $Ad=-r_p$:

$$
\begin{aligned}
r_p(u+td)&=Au+tAd-b\\
&=r_p-tr_p\\
&=(1-t)r_p .
\end{aligned}
$$

Với nhân tử, $\nu+t\Delta\nu=\nu+t(\eta-\nu)=(1-t)\nu+t\eta$.

**Bước 4 (phần d).**

Khi $F$ bậc hai, $\nabla F$ affine với ma trận $H$ không đổi. Dùng hàng đầu của (5.1), $Hd+A^T\Delta\nu=-r_d$:

$$
\begin{aligned}
r_d(u+td,\nu+t\Delta\nu)&=r_d+t(Hd+A^T\Delta\nu)\\
&=r_d-tr_d\\
&=(1-t)r_d .
\end{aligned}
$$

Cùng với (c), $r$ co theo hệ số $1-t$. $\square$
:::

Mệnh đề 04.44 nói rằng phương pháp mới chứa Newton khả thi làm trường hợp riêng. Bảng sau đối chiếu hai hệ.

| Đối chiếu | Điểm khả thi, hệ (4.1) | Điểm chưa khả thi, hệ (5.1) |
|---|---|---|
| Ẩn thứ hai | nhân tử $\eta$ của bài con | số gia $\Delta\nu$ của nhân tử hiện tại |
| Vế phải | $-(g,0)$ | $-(r_d,r_p)$ |
| Điều kiện khả nghịch | $A$ đủ hạng hàng, $H$ xác định dương trên $\ker A$ | giữ nguyên |

Phần (c) cho thấy sai lệch ràng buộc co đúng theo hệ số $1-t$, bất kể $F$. Nếu một bước $t=1$ được nhận, điểm lặp khả thi từ đó về sau, và theo (b) hướng trùng hướng Newton khả thi.

::: example Ví dụ 04.21 (Một bước Newton cho phần dư trên VD3)
**Lập hệ.**

Tại $u=(1,8)^T$, $\nu=4$: $r_d=(6,44)^T$, $r_p=-5$ (Ví dụ 04.20). Hệ (5.1):

$$
\begin{aligned}
2d_1+\Delta\nu&=-6,\\
5d_2+\Delta\nu&=-44,\\
d_1+d_2&=5 .
\end{aligned}
$$

**Giải.**

Trừ hàng hai khỏi hàng một: $2d_1-5d_2=38$. Thay $d_2=5-d_1$: $7d_1-25=38$, nên $d_1=9$, $d_2=-4$, và $\Delta\nu=-6-18=-24$.

**Bước đầy đủ.**

$u^+=(10,4)^T$, $\nu^+=4-24=-20$.

**Kiểm tra lại.**

$r_p^+=10+4-14=0$; $r_d^+=(20,20)^T+(-20)(1,1)^T=(0,0)^T$. Điểm mới là nghiệm với $F^*=140$, đúng Mệnh đề 04.44(d). Với $\alpha=0{,}1$, $\lVert r^+\rVert_2=0\le(1-\alpha)\lVert r\rVert_2=0{,}9\sqrt{1997}$, nên quay lui của Thuật toán 04.4 nhận $t=1$. Số $-24$ là số gia; nhân tử của nghiệm là $\nu^+=\nu+\Delta\nu=-20=\nu^*$.
:::

### 5.3 Chuẩn phần dư làm thước đo tiến triển

Tại điểm khả thi, quy tắc Armijo đòi $F$ giảm. Tại điểm chưa khả thi, quy tắc đó không dùng được, như ví dụ sau cho thấy.

::: example Ví dụ 04.22 (Mục tiêu phải tăng trên đường tới nghiệm)
**Dữ kiện.**

VD3 tại $u=(0,0)^T$, $\nu=0$.

**Tính.**

$F(0,0)=0<140=F^*$, $r_p=-14$, $r_d=(0,0)^T$. Hệ (5.1): $2d_1+\Delta\nu=0$, $5d_2+\Delta\nu=0$, $d_1+d_2=14$, cho $d=(10,4)^T$, $\Delta\nu=-20$.

**Kết luận.**

Mọi điểm khả thi có $F\ge140>0=F(0,0)$, nên mọi quỹ đạo tới tập khả thi làm $F$ tăng ít nhất $140$. Một quy tắc đòi $F$ giảm sẽ loại cả bước đúng $d=(10,4)^T$.

**Kiểm tra lại.**

Với $t=\tfrac12$: $u=(5,2)^T$, $\nu=-10$, $r_d=(10-10,10-10)^T=0$ và $r_p(5,2)=7-14=-7=\tfrac12r_p(0,0)$, khớp Mệnh đề 04.44(d).
:::

Thước đo thay thế là chuẩn của phần dư ghép, bằng $0$ đúng tại nghiệm KKT. Mệnh đề sau cho thấy hướng Newton luôn làm thước đo này giảm khi bước đủ nhỏ.

::: proposition Mệnh đề 04.45 (Chuẩn phần dư giảm dọc hướng Newton)
**Giả thiết.** $F$ khả vi hai lần liên tục; $(u,\nu)$ với $r=r(u,\nu)\ne0$; $(d,\Delta\nu)$ là nghiệm của (5.1); $\Phi(t)=\lVert r(u+td,\nu+t\Delta\nu)\rVert_2$.

**Kết luận.**

- (a) $\Phi'(0)=-\lVert r\rVert_2<0$.
- (b) Với mọi $\alpha\in(0,1)$, có $\bar t>0$ sao cho $\Phi(t)\le(1-\alpha t)\lVert r\rVert_2$ với mọi $t\in(0,\bar t]$.

**Điều kiện áp dụng.** Không cần tính lồi, không cần điểm khả thi.

**Phạm vi.** Mệnh đề không nói từng thành phần $\lVert r_d\rVert_2$ hay $\lVert r_p\rVert_2$ giảm đơn điệu, và không nói mọi bước đều được nhận.
:::

::: proof Chứng minh Mệnh đề 04.45
**Bước 1 (ma trận Jacobi của phần dư).**

Theo biến $(u,\nu)$, đạo hàm của $r_d$ là $[H\ \ A^T]$, của $r_p$ là $[A\ \ 0]$. Ma trận Jacobi $J_r$ của $r$ vì vậy là ma trận khối của (5.1), và (5.1) viết gọn là $J_r\Delta=-r$ với $\Delta=(d,\Delta\nu)$.

**Bước 2 (đạo hàm của bình phương chuẩn).**

Theo quy tắc dây chuyền:

$$
\begin{aligned}
\frac{d}{dt}\tfrac12\Phi(t)^2\Big|_{t=0}&=r^TJ_r\Delta&&\text{(quy tắc dây chuyền)}\\
&=-r^Tr&&(J_r\Delta=-r)\\
&=-\lVert r\rVert_2^2 .
\end{aligned}
$$

Vì $\Phi(0)=\lVert r\rVert_2>0$, $\Phi$ khả vi tại $0$ và $\Phi'(0)=\frac{-\lVert r\rVert_2^2}{\lVert r\rVert_2}=-\lVert r\rVert_2$.

**Bước 3 (phần b).**

$\Phi(t)=\lVert r\rVert_2-t\lVert r\rVert_2+o(t)$. Vì $(1-\alpha)\lVert r\rVert_2>0$, có $\bar t$ sao cho $o(t)\le(1-\alpha)t\lVert r\rVert_2$ trên $(0,\bar t]$, cho $\Phi(t)\le(1-\alpha t)\lVert r\rVert_2$. $\square$
:::

Mệnh đề 04.45 đóng vai của Mệnh đề 04.11 cho phương pháp mới: hướng Newton là hướng giảm của $\lVert r\rVert_2$, và quy tắc dạng Armijo trên $\lVert r\rVert_2$ luôn tìm được bước. Hệ số $-\lVert r\rVert_2$ của đạo hàm đóng vai $g^Td$ trong (2.2).

::: algorithm Thuật toán 04.4 (Newton từ điểm chưa khả thi)
**Đầu vào.** $u^0\in\operatorname{dom}F$, $\nu^0\in\mathbb R^p$; dung sai $\varepsilon_p,\varepsilon_d>0$; tham số $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Lặp** với $k=0,1,2,\ldots$:

1. Tính $r_d=\nabla F(u^k)+A^T\nu^k$ và $r_p=Au^k-b$.
2. Nếu $\lVert r_p\rVert_2\le\varepsilon_p$ và $\lVert r_d\rVert_2\le\varepsilon_d$: dừng.
3. Giải (5.1) để được $(d,\Delta\nu)$.
4. Quay lui từ $t=1$: trong khi $u^k+td\notin\operatorname{dom}F$ hoặc $\lVert r(u^k+td,\nu^k+t\Delta\nu)\rVert_2>(1-\alpha t)\lVert r\rVert_2$, gán $t\leftarrow\beta t$.
5. Cập nhật $u^{k+1}=u^k+td$, $\nu^{k+1}=\nu^k+t\Delta\nu$.

**Đầu ra.** $(u,\nu)$ đạt hai dung sai.

**Điều kiện đủ.** $A$ đủ hạng hàng, $H$ xác định dương trên $\ker A$ tại mọi điểm lặp.

**Chi phí mỗi lượt.** Như Thuật toán 04.3, cộng các lần tính $r$ khi thử bước.
:::

Hai dung sai được kiểm đồng thời vì mỗi phần dư ứng với một nhóm của (1.2); một phần dư nhỏ không thay cho phần dư kia. Điểm và nhân tử được cập nhật với cùng bước $t$. Theo Mệnh đề 04.44(c), sau bước $t$ phần dư khả thi là $(1-t)r_p$, nên ngay khi một bước $t=1$ được nhận, mọi điểm lặp sau đó khả thi và thuật toán chạy như Newton khả thi với quy tắc nhận bước trên $\lVert r\rVert_2$.

::: remark Nhận xét 04.46 (Số gia, nhân tử mới và ý nghĩa của phần dư nhỏ)
**Số gia và nhân tử.** Trong (5.1), $\Delta\nu$ là số gia; nhân tử sau bước đầy đủ là $\nu+\Delta\nu$. Ở Ví dụ 04.21, $\Delta\nu=-24$ còn $\nu^+=-20=\nu^*$.

**Phần dư nhỏ.** $\lVert r\rVert_2$ nhỏ chứng nhận điểm lặp gần thỏa (1.2) theo dung sai, chưa chứng nhận $F(u)-F^*$ nhỏ. Tại điểm chưa khả thi, hiệu $F(u)-F^*$ có thể âm, như ở Ví dụ 04.22, nên không phải sai số theo nghĩa của Mục 2 và Mục 3.

**Tốc độ.** Hội tụ bậc hai của Thuật toán 04.4 là phát biểu cục bộ, khi ma trận Jacobi $J_r$ khả nghịch tại nghiệm, Lipschitz gần nghiệm và điểm đầu đủ gần (Boyd và Vandenberghe 2004, mục 10.3.3, tr. 536–540).

**Hai lỗi lập hệ thường gặp.** Lỗi thứ nhất là bỏ $A^T\nu$ khi lập $r_d$; lỗi thứ hai là lấy vế phải của hàng ràng buộc là $r_p$ thay vì $-r_p$.
:::

**Trong học máy.** Thuật toán 04.4 cho phép khởi đầu huấn luyện một mô hình có ràng buộc đẳng thức từ một điểm bất kỳ thuộc miền của mất mát, chẳng hạn trọng số khởi tạo không thỏa $\sum_iw_i=1$, mà không cần bước chiếu riêng. Việc cập nhật đồng thời tham số và nhân tử là dạng đơn giản nhất của phương pháp gốc – đối ngẫu (primal-dual method). Phương pháp này là nền của các phương pháp điểm trong trong bộ giải tối ưu lồi; xem Boyd và Vandenberghe (2004, mục 10.3.1, tr. 532–533, và chương 11).

::: exercise Bài tập 04.9
Với VD3 tại $u=(4,2)^T$, $\nu=2$:

- (a) tính $r_d$, $r_p$; giải (5.1); tính $(u^+,\nu^+)$ với $t=1$ và chỉ ra số nào là nhân tử của nghiệm;
- (b) với $t=\tfrac12$, tính phần dư tại điểm thử và so với ngưỡng $(1-\alpha t)\lVert r\rVert_2$ khi $\alpha=0{,}1$.
:::

::: hint
$r_d=(8,10)^T+(2,2)^T$. Vế phải của (5.1) là $(-r_d,-r_p)$.
:::

::: solution
**Câu (a).**

$r_d=(10,12)^T$, $r_p=4+2-14=-8$. Hệ: $2d_1+\Delta\nu=-10$, $5d_2+\Delta\nu=-12$, $d_1+d_2=8$. Trừ hai hàng đầu: $2d_1-5d_2=2$; thay $d_2=8-d_1$: $7d_1=42$, nên $d=(6,2)^T$, $\Delta\nu=-10-12=-22$.

Bước đầy đủ: $u^+=(10,4)^T$, $\nu^+=2-22=-20$. Nhân tử của nghiệm là $\nu^+=-20$, không phải $\Delta\nu=-22$.

**Câu (b).**

$u=(7,3)^T$, $\nu=2-11=-9$; $\nabla F=(14,15)^T$, $r_d=(5,6)^T$, $r_p=10-14=-4$. Vậy $r^+=(5,6,-4)=\tfrac12r$. $\lVert r\rVert_2=\sqrt{100+144+64}=\sqrt{308}\approx17{,}55$; ngưỡng $0{,}95\cdot17{,}55\approx16{,}67$; $\lVert r^+\rVert_2\approx8{,}77$, nhận.

**Kiểm tra lại.**

$r_d^+$ tại $u^+=(10,4)^T$: $(20-20,20-20)^T=0$. Hệ số co $\tfrac12=1-t$ đúng Mệnh đề 04.44(d).
:::

**Chuỗi suy luận của mục.**

1. Định nghĩa 04.43 đo vi phạm của hai nhóm (1.2) bằng $r_d$ và $r_p$.
2. Mệnh đề 04.44 tuyến tính hóa hai phần dư thành hệ (5.1), chứa Newton khả thi làm trường hợp riêng và cho $r_p$ co theo $1-t$.
3. Ví dụ 04.22 cho thấy $F$ không dùng được làm thước đo; Mệnh đề 04.45 cho thấy $\lVert r\rVert_2$ giảm dọc hướng Newton.
4. Thuật toán 04.4 ghép các phần trên.

**Kết mục.** Mục 4 và Mục 5 hoàn tất phương pháp Newton cho bài có đẳng thức, từ điểm khả thi (Thuật toán 04.3) và từ điểm chưa khả thi (Thuật toán 04.4). Mọi tiêu chí dừng đến lúc này, $\lVert g\rVert_2$, $\tfrac12\delta^2$, $\tfrac12\delta_{eq}^2$, $\lVert r\rVert_2$, chỉ đo khoảng cách tới hệ KKT. Câu hỏi để ngỏ từ Nhận xét 04.32 vẫn còn: khi nào độ giảm Newton cho một cận trên của sai số mục tiêu. Mục 6 trả lời bằng tính tự điều chỉnh.

## 6. Tính tự điều chỉnh và cận sai số

Nhận xét 04.32 để ngỏ một câu hỏi: trên VD2 tại $s=\tfrac14$, giảm mô hình $\tfrac12\delta^2=\tfrac9{32}\approx0{,}281$ nhỏ hơn sai số mục tiêu $\log4-\tfrac34\approx0{,}636$, nên tiêu chí dừng của Thuật toán 04.2 chưa chứng nhận điều gì về sai số. Định lý 04.35 dùng các hằng số $\mu$, $L$, $L_H$ trên tập mức dưới $S$. Với VD2 từ $s^0=\tfrac14$, $S=\{s\mid\varphi(s)\le\varphi(\tfrac14)\}\approx[0{,}25;\,2{,}587]$, nên $\mu=1/2{,}587^2\approx0{,}149$, $L=16$ và $L_H=2\cdot4^3=128$. Các hằng số này tồn tại nhưng cho cận rất bi quan, và chúng thay đổi khi đổi hệ tọa độ, trong khi bước Newton thì không (Mệnh đề 04.31(c)).

Mục này tìm một giả thiết về độ cong không phụ thuộc hệ tọa độ, chứng minh dưới giả thiết đó cận sai số $f(x)-f^*\le-\delta-\log(1-\delta)$, và chuyển cận sang bài có đẳng thức qua hàm rút gọn.

### 6.1 Hàm tự điều chỉnh

![Đồ thị độ cong phi hai phẩy của s bằng 1 chia s bình phương trên s lớn hơn 0. Đường cong tăng vô hạn khi s tiến về biên s bằng 0, điểm không thuộc miền, và giảm về 0 khi s lớn; điểm s bằng 1/4 được đánh dấu với độ cong bằng 16.](img/lec-04/log-curvature.svg)

Hình cho thấy độ cong của VD2 không bị chặn trên miền, nên không có giả thiết dạng $\varphi''\le L$ nào đúng trên cả miền. Trực giác cho một giả thiết khác: thay vì chặn độ cong bằng một hằng số, chặn tốc độ thay đổi của độ cong theo thang của chính độ cong. Gần biên $s=0$, độ cong lớn và thay đổi nhanh, nhưng thay đổi "chậm" so với độ lớn của nó.

Số mũ của thang được chọn để giả thiết không phụ thuộc đơn vị đo. Đổi biến $s=a\tau$ với $a>0$ và đặt $\tilde\varphi(\tau)=\varphi(a\tau)$: $\tilde\varphi''=a^2\varphi''$ và $\tilde\varphi'''=a^3\varphi'''$. Tỷ số $\lvert\tilde\varphi'''\rvert/(\tilde\varphi'')^{3/2}=a^3\lvert\varphi'''\rvert/(a^3(\varphi'')^{3/2})$ không đổi; số mũ $\tfrac32$ là số mũ duy nhất làm $a$ triệt tiêu.

::: example Ví dụ 04.23 (Tỷ số độ cong của VD2)
**Tính.**

$\varphi''(s)=s^{-2}$, $\varphi'''(s)=-2s^{-3}$, nên $\lvert\varphi'''(s)\rvert=2s^{-3}$ và $\varphi''(s)^{3/2}=s^{-3}$. Tỷ số bằng $2$ với mọi $s>0$.

**Kiểm tra lại.**

Tại $s=\tfrac14$: $\lvert\varphi'''\rvert=2\cdot64=128$ và $2\cdot16^{3/2}=2\cdot64=128$. Một phép thử tại một điểm không thay cho phép tính trên cả miền; ở đây phép tính trên cả miền cho tỷ số không đổi.
:::

![Đồ thị tỷ số trị tuyệt đối đạo hàm bậc ba chia lũy thừa ba phần hai của đạo hàm bậc hai của s trừ log s trên s lớn hơn 0: đường nằm ngang tại mức 2 trên toàn miền.](img/lec-04/self-concordance-ratio.svg)

Hình vẽ tỷ số của Ví dụ 04.23 theo $s$: một đường ngang ở mức $2$. Hai vế của bất đẳng thức sắp định nghĩa vì vậy bằng nhau trên toàn miền, và VD2 đạt dấu bằng ở mọi điểm.

::: definition Định nghĩa 04.47 (Hàm tự điều chỉnh)
Cho tập mở lồi $\operatorname{dom}f\subseteq\mathbb R^n$ và $f:\operatorname{dom}f\to\mathbb R$ lồi, khả vi ba lần liên tục. Hàm $f$ là tự điều chỉnh (self-concordant) nếu với mọi $x\in\operatorname{dom}f$ và mọi $v\in\mathbb R^n$, hàm một biến $h(t)=f(x+tv)$ thỏa

$$
\lvert h'''(t)\rvert\le2\,h''(t)^{3/2}
$$

tại mọi $t$ mà $x+tv\in\operatorname{dom}f$.
:::

Định nghĩa đòi bất đẳng thức trên mọi đường thẳng qua miền, theo cách Bổ đề 01.28 đưa tính lồi về một chiều. Biến $t$ ở đây là tham số trên đường thẳng, không phải độ dài bước. Hằng số $2$ là quy ước chuẩn hóa để hàm $-\log s$ đạt đúng dấu bằng.

Ví dụ: hàm tuyến tính và hàm bậc hai lồi có $h'''=0$ trên mọi đường thẳng, nên tự điều chỉnh. Hàm $-\log s$ và $s-\log s$ khác nhau một số hạng tuyến tính, có cùng đạo hàm bậc hai và bậc ba, nên cả hai tự điều chỉnh. Phản ví dụ:

1. $e^s$ có tỷ số $e^s/e^{3s/2}=e^{-s/2}$, không bị chặn khi $s\to-\infty$;
2. $s^4$ có tỷ số $\frac{24\lvert s\rvert}{(12s^2)^{3/2}}=\frac{24}{12^{3/2}s^2}$, không bị chặn khi $s\to0$;
3. mất mát logistic $\ell(m)=\log(1+e^{-m})$ có $\ell''=\sigma(1-\sigma)$ và $\ell'''=\sigma(1-\sigma)(1-2\sigma)$ với $\sigma=\sigma(m)$, nên tỷ số $\lvert1-2\sigma\rvert/\sqrt{\sigma(1-\sigma)}$ không bị chặn khi $\lvert m\rvert\to\infty$.

Tự điều chỉnh khác lồi mạnh và gradient Lipschitz: nó không chặn độ cong, mà chặn biến thiên tương đối của độ cong. Hai lớp tự điều chỉnh và lồi mạnh không chứa nhau. VD2 tự điều chỉnh nhưng không lồi mạnh trên miền, vì $\varphi''(s)=s^{-2}\to0$ khi $s\to\infty$; nó cũng không có gradient Lipschitz, vì $\varphi''$ không bị chặn khi $s\to0$.

Ngược lại, $f(s)=s^4+\tfrac1{100}s^2$ lồi mạnh vì $f''(s)=12s^2+0{,}02\ge0{,}02$, nhưng không tự điều chỉnh. Tại $s=0{,}05$: $f''=12\cdot0{,}0025+0{,}02=0{,}05$, $f''^{3/2}=0{,}05^{3/2}\approx0{,}01118$ và $\lvert f'''\rvert=24\cdot0{,}05=1{,}2$, nên tỷ số $\lvert f'''\rvert/f''^{3/2}\approx107>2$.

Kết quả sau là phiên bản tự điều chỉnh của các phép bảo toàn tính lồi ở Định lý 01.31, với một hạn chế mới ở phép nhân hệ số.

::: proposition Mệnh đề 04.48 (Phép bảo toàn tính tự điều chỉnh)
**Giả thiết.** $f$, $f_1$, $f_2$ tự điều chỉnh; $a\ge1$; $B\in\mathbb R^{n\times m}$, $c\in\mathbb R^n$.

**Kết luận.**

- (a) $af$ tự điều chỉnh.
- (b) $f_1+f_2$ tự điều chỉnh trên $\operatorname{dom}f_1\cap\operatorname{dom}f_2$.
- (c) $y\mapsto f(By+c)$ tự điều chỉnh trên $\{y\mid By+c\in\operatorname{dom}f\}$.

**Điều kiện áp dụng.** Phần (a) cần $a\ge1$; với $0<a<1$ kết luận có thể sai.

**Phạm vi.** Mệnh đề không nói gì về sự tồn tại của cực tiểu.
:::

::: proof Chứng minh Mệnh đề 04.48
**Bước 1 (phần a).**

Với $h$ là hạn chế của $f$ lên một đường thẳng:

$$
\begin{aligned}
\lvert ah'''\rvert&\le2ah''^{3/2}\\
&\le2a^{3/2}h''^{3/2}\\
&=2(ah'')^{3/2}.
\end{aligned}
$$

Dòng đầu là giả thiết; dòng thứ hai dùng $a\le a^{3/2}$ khi $a\ge1$.

**Bước 2 (phần b).**

Với $h_1$, $h_2$ là hạn chế của $f_1$, $f_2$ lên cùng một đường thẳng, $h_1'',h_2''\ge0$ và

$$
\lvert h_1'''+h_2'''\rvert\le2\bigl(h_1''^{3/2}+h_2''^{3/2}\bigr)\le2(h_1''+h_2'')^{3/2}.
$$

Bất đẳng thức thứ hai là $p^{3/2}+q^{3/2}\le(p+q)^{3/2}$ với $p,q\ge0$: khi $p+q>0$, chia hai vế cho $(p+q)^{3/2}$ và dùng $\theta^{3/2}\le\theta$ với $\theta=\tfrac p{p+q}$ và $\theta=\tfrac q{p+q}$ thuộc $[0,1]$.

**Bước 3 (phần c).**

Hạn chế của $y\mapsto f(By+c)$ lên đường thẳng $y+tw$ là $t\mapsto f(By+c+tBw)$, hạn chế của $f$ lên một đường thẳng; khi $Bw=0$, hàm này hằng và hai vế của bất đẳng thức bằng $0$. $\square$
:::

Theo Mệnh đề 04.48, hàm chắn log $-\sum_i\log(b_i-a_i^Tx)$ và hàm $-\sum_j\log(c_j^Tw)$ của Tình huống 04.2 là tự điều chỉnh: mỗi số hạng là $-\log$ hợp với một hàm affine. Hàm rút gọn $\psi(z)=F(\hat u+Nz)$ của Mục 4 tự điều chỉnh khi $F$ tự điều chỉnh, theo phần (c).

### 6.2 Cận sai số theo độ giảm Newton

Cận sai số cần một cận dưới của $f$ quanh điểm hiện tại. Bổ đề sau cho cận dưới của độ cong dọc một đường thẳng, chỉ từ giá trị độ cong tại một điểm. Nó đóng vai đối xứng với Bổ đề 04.18: ở đó một hằng số $L$ chặn trên độ cong ở mọi nơi, ở đây tính tự điều chỉnh chặn dưới độ cong theo khoảng cách tới điểm đầu.

::: lemma Bổ đề 04.49 (Cận dưới của độ cong dọc đường thẳng)
**Giả thiết.** $h$ khả vi ba lần liên tục trên một khoảng chứa $[0,\bar t]$, $h''>0$ trên khoảng đó, và $\lvert h'''\rvert\le2h''^{3/2}$.

**Kết luận.** Với mọi $t\in[0,\bar t]$,

$$
h''(t)\ge\frac1{\bigl(h''(0)^{-1/2}+t\bigr)^2}.
$$

**Điều kiện áp dụng.** Cần $h''>0$ để $h''^{-1/2}$ xác định.

**Phạm vi.** Bổ đề chỉ cho cận dưới khi $t\ge0$ tăng.
:::

::: proof Chứng minh Bổ đề 04.49
**Bước 1 (đạo hàm của $h''^{-1/2}$).**

Đặt $k(t)=h''(t)^{-1/2}$. Theo quy tắc dây chuyền, $k'(t)=-\tfrac12h''(t)^{-3/2}h'''(t)$, nên giả thiết $\lvert h'''\rvert\le2h''^{3/2}$ cho $\lvert k'(t)\rvert\le1$.

**Bước 2 (tích phân).**

Tích phân từ $0$ đến $t$: $k(t)\le k(0)+t$, tức $h''(t)^{-1/2}\le h''(0)^{-1/2}+t$.

**Bước 3 (kết luận).**

Hai vế dương; bình phương rồi nghịch đảo được kết luận. $\square$
:::

::: theorem Định lý 04.50 (Cận sai số theo độ giảm Newton)
**Giả thiết.** $f$ tự điều chỉnh, $\nabla^2f(y)\succ0$ với mọi $y\in\operatorname{dom}f$; $f^*=\inf f>-\infty$; tại $x$, độ giảm Newton thỏa $\delta=\delta_N(x)<1$.

**Kết luận.**

$$
f(x)-f^*\le-\delta-\log(1-\delta).
\tag{6.1}
$$

**Điều kiện áp dụng.** Cận chỉ dùng $\delta$, tính được tại $x$; không chứa hằng số nào của $f$.

**Phạm vi.** Không áp dụng khi $\delta\ge1$. Trong công thức là $\delta$, không phải $\delta^2$.
:::

::: proof Chứng minh Định lý 04.50
**Bước 1 (chọn đường thẳng).**

Đặt $g=\nabla f(x)$, $H=\nabla^2f(x)$ và lấy $y\in\operatorname{dom}f$, $y\ne x$. Đặt $\bar t=\lVert y-x\rVert_H=\sqrt{(y-x)^TH(y-x)}>0$ và $v=(y-x)/\bar t$, nên $v^THv=1$ và $y=x+\bar tv$. Hàm $h(t)=f(x+tv)$ xác định trên một khoảng chứa $[0,\bar t]$ vì miền lồi.

**Bước 2 (giá trị đầu).**

$h''(0)=v^THv=1$. Theo Cauchy–Schwarz như ở Mục 2.5:

$$
\begin{aligned}
\lvert g^Tv\rvert&=\lvert(H^{-1/2}g)^T(H^{1/2}v)\rvert\\
&\le\lVert H^{-1/2}g\rVert_2\,\lVert H^{1/2}v\rVert_2&&\text{(Cauchy–Schwarz)}\\
&=\sqrt{g^TH^{-1}g}\cdot1&&(v^THv=1)\\
&=\delta,
\end{aligned}
$$

theo Định nghĩa 04.30 ở dòng cuối,

nên $h'(0)=g^Tv\ge-\delta$.

**Bước 3 (tích phân hai lần).**

Theo Bổ đề 04.49 với $h''(0)=1$: $h''(\tau)\ge(1+\tau)^{-2}$ trên $[0,\bar t]$. Tích phân từ $0$:

$$
\begin{aligned}
h'(\tau)&\ge h'(0)+1-\frac1{1+\tau},\\
h(\bar t)&\ge h(0)+\bar t\,h'(0)+\bar t-\log(1+\bar t)\\
&\ge f(x)+\bar t(1-\delta)-\log(1+\bar t).
\end{aligned}
$$

Dòng thứ ba dùng Bước 2.

**Bước 4 (cực tiểu theo độ dài).**

Hàm $\omega(\tau)=\tau(1-\delta)-\log(1+\tau)$ trên $\tau\ge0$ có $\omega'(\tau)=(1-\delta)-\frac1{1+\tau}$, triệt tiêu tại $\tau=\frac\delta{1-\delta}$, với giá trị $\omega=\delta+\log(1-\delta)$. Hàm $\omega$ lồi, nên đây là giá trị nhỏ nhất. Vậy $f(y)=h(\bar t)\ge f(x)+\delta+\log(1-\delta)$ với mọi $y$.

**Bước 5 (kết luận).**

Với $y=x$, bất đẳng thức của Bước 4 cũng đúng vì $\delta+\log(1-\delta)\le0$. Lấy cận dưới đúng theo $y$: $f^*\ge f(x)+\delta+\log(1-\delta)$, tức (6.1). $\square$
:::

Định lý không đòi cực tiểu đạt được: Bước 5 chỉ dùng $f^*=\inf f$. Giả thiết $f^*>-\infty$ thực ra suy ra từ $\delta<1$, vì Bước 4 cho $f$ bị chặn dưới. Với $f=-\log s$: $g=-\tfrac1s$, $H=\tfrac1{s^2}$, nên $\delta^2=1$ tại mọi $s$, giả thiết $\delta<1$ không bao giờ thỏa, khớp với việc $-\log s$ không bị chặn dưới.

Khai triển $-\log(1-\delta)=\sum_{k\ge1}\delta^k/k$ cho

$$
-\delta-\log(1-\delta)=\frac{\delta^2}2+\frac{\delta^3}3+\frac{\delta^4}4+\cdots .
$$

Số hạng đầu là giảm mô hình $\tfrac12\delta^2$. Khi $\delta$ nhỏ, các số hạng sau nhỏ hơn nhiều so với số hạng đầu và tiêu chí dừng của Thuật toán 04.2 gần đúng chứng nhận sai số.

Cận (2.5) của Mệnh đề 04.25(b) cần hằng số lồi mạnh $\mu$; cận (6.1) không cần hằng số nào, đổi lại phải kiểm tính tự điều chỉnh. Boyd và Vandenberghe (2004, mục 9.6.3, tr. 501–502, công thức 9.49) chứng minh cùng cận theo cùng ý, tham số hóa theo hướng thay vì theo điểm.

::: example Ví dụ 04.24 (Cận sai số trên VD2 tại hai điểm)
**Tại $s=\tfrac14$.**

$\delta=\tfrac34$ (Ví dụ 04.15). Cận (6.1): $-\tfrac34-\log\tfrac14=\log4-\tfrac34\approx0{,}63629$, đúng bằng sai số $\varphi(\tfrac14)-1$. Giảm mô hình $0{,}28125$ chỉ bằng khoảng $44\%$ cận.

**Tại $s=\tfrac32$.**

$g=1-\tfrac23=\tfrac13$, $H=\tfrac49$, $\delta^2=\frac{1/9}{4/9}=\tfrac14$, $\delta=\tfrac12$. Cận: $-\tfrac12+\log2\approx0{,}19315$. Sai số thật: $\tfrac32-\log\tfrac32-1\approx0{,}09453$. Giảm mô hình: $\tfrac18=0{,}125$.

**Kiểm tra lại.**

Với VD2, $\delta^2=g^2/H=(1-s)^2$ với mọi $s$. Khi $s<1$, $\delta=1-s$ và cận $-(1-s)-\log s=\varphi(s)-1$ trùng sai số; sự trùng nhau là tính chất riêng của ví dụ. Khi $s=\tfrac32$, thứ tự $0{,}0945<0{,}125<0{,}193$ cho thấy cận đúng nhưng không chặt, và ở đây giảm mô hình lại lớn hơn sai số.
:::

Hệ quả sau thay cận (6.1) bằng một biểu thức đơn giản hơn khi $\delta$ không quá lớn.

::: corollary Hệ quả 04.51 (Cận theo bình phương độ giảm Newton)
**Giả thiết.** Như Định lý 04.50, thêm $\delta\le0{,}68$.

**Kết luận.** $f(x)-f^*\le\delta^2$. Do đó tiêu chí $\delta^2\le\varepsilon$ với $\varepsilon\le0{,}68^2\approx0{,}46$ bảo đảm $f(x)-f^*\le\varepsilon$.

**Điều kiện áp dụng.** Mọi giả thiết của Định lý 04.50.

**Phạm vi.** Hệ số $0{,}68$ không tối ưu; điều cần là $-\delta-\log(1-\delta)\le\delta^2$.
:::

::: proof Chứng minh Hệ quả 04.51
**Bước 1 (đạo hàm).**

Đặt $q(\delta)=\delta^2+\delta+\log(1-\delta)$ trên $[0,1)$, với $q(0)=0$. Đạo hàm:

$$
\begin{aligned}
q'(\delta)&=2\delta+1-\frac1{1-\delta}\\
&=\frac{(2\delta+1)(1-\delta)-1}{1-\delta}\\
&=\frac{\delta(1-2\delta)}{1-\delta}.
\end{aligned}
$$

Vậy $q$ tăng trên $[0,\tfrac12]$ và giảm trên $[\tfrac12,1)$.

**Bước 2 (dấu tại đầu mút).**

$q(0)=0$. Tại $0{,}68$: $q=0{,}4624+0{,}68+\log0{,}32\approx1{,}1424-1{,}1394=0{,}0030>0$.

**Bước 3 (kết luận).**

Hàm $q$ không âm tại hai đầu mút của $[0;\,0{,}68]$, tăng rồi giảm trên đoạn này, nên $q\ge0$ trên cả đoạn, tức $-\delta-\log(1-\delta)\le\delta^2$; ghép với (6.1). Phần cuối: $\delta^2\le\varepsilon\le0{,}68^2$ kéo theo $\delta\le0{,}68$. $\square$
:::

Hệ quả 04.51 nói rằng với hàm tự điều chỉnh, nhân đôi ước lượng $\tfrac12\delta^2$ của mô hình cho một cận có chứng minh, khi $\delta\le0{,}68$. Trên VD2 tại $s=\tfrac32$: $\delta^2=0{,}25\ge0{,}0945$.

### 6.3 Cận sai số cho bài có đẳng thức

Định lý 04.50 phát biểu cho bài không ràng buộc. Mệnh đề 04.41(d) nói Newton khả thi là Newton trên hàm rút gọn, nên cận chuyển được.

::: corollary Hệ quả 04.52 (Cận sai số tại điểm khả thi)
**Giả thiết.** Bài có đẳng thức của Định nghĩa 04.1 với $F$ tự điều chỉnh; $\hat u$, $N$ như Mệnh đề 04.41; $N^T\nabla^2F(u)N\succ0$ tại mọi điểm khả thi của miền; $F^*>-\infty$; $u$ khả thi và $\delta_{eq}<1$.

**Kết luận.** $F(u)-F^*\le-\delta_{eq}-\log(1-\delta_{eq})$.

**Điều kiện áp dụng.** Tại điểm khả thi. Tại điểm chưa khả thi, $F(u)-F^*$ không phải sai số và $\lVert r\rVert_2$ không phải độ giảm Newton.

**Phạm vi.** Như Định lý 04.50.
:::

::: proof Chứng minh Hệ quả 04.52
**Bước 1 (hàm rút gọn thỏa giả thiết).**

$\psi(z)=F(\hat u+Nz)$ tự điều chỉnh theo Mệnh đề 04.48(c), có Hessian $N^T\nabla^2FN\succ0$ trên miền của nó, và $\inf\psi=F^*>-\infty$, vì theo Mệnh đề 04.41(a) các điểm khả thi là đúng các $\hat u+Nz$.

**Bước 2 (cùng độ giảm Newton).**

Với $u=\hat u+Nz$, Mệnh đề 04.41(d) cho độ giảm Newton của $\psi$ tại $z$ bằng $\delta_{eq}$.

**Bước 3 (áp dụng).**

Định lý 04.50 cho $\psi$ tại $z$: $\psi(z)-F^*\le-\delta_{eq}-\log(1-\delta_{eq})$, và $\psi(z)=F(u)$. $\square$
:::

Trên VD3 tại $u=(16,-2)^T$, $\delta_{eq}^2=252$ (Ví dụ 04.19), nên $\delta_{eq}>1$ và hệ quả không áp dụng tại điểm này. VD3 bậc hai, nên mô hình trùng hàm và $F(u)-F^*=\tfrac12\delta_{eq}^2=126$ chính xác. Tình huống 04.2 áp dụng Hệ quả 04.52 cho một hàm không bậc hai.

Cận (6.1) còn là thành phần của kết quả về số bước Newton cho hàm tự điều chỉnh, kết quả mà Mục 3 đã đặt trong bảng tốc độ.

::: theorem Định lý 04.53 (Số bước Newton cho hàm tự điều chỉnh)
**Giả thiết.** $f$ tự điều chỉnh, lồi chặt, tập mức dưới $\{x\mid f(x)\le f(x^0)\}$ đóng, $f$ bị chặn dưới; Thuật toán 04.2 với $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$.

**Kết luận.** Số bước để $f(x^k)-f^*\le\varepsilon$ không vượt

$$
\frac{20-8\alpha}{\alpha\beta(1-2\alpha)^2}\bigl(f(x^0)-f^*\bigr)+\log_2\log_2\frac1\varepsilon .
$$

**Điều kiện áp dụng.** Hằng số chỉ phụ thuộc $\alpha$, $\beta$; không phụ thuộc hệ tọa độ hay hằng số nào của $f$.

**Phạm vi.** Chứng minh nằm ngoài phạm vi học phần; xem Boyd và Vandenberghe (2004, mục 9.6.4, tr. 503–505, công thức 9.56). Hằng số rất bi quan; với $\alpha=0{,}1$ và $\beta=0{,}8$, hệ số bằng $375$.
:::

Định lý 04.53 thay ba hằng số $\mu$, $L$, $L_H$ của Định lý 04.35 bằng giả thiết tự điều chỉnh. Chứng minh chia hai trường hợp theo độ giảm Newton: khi $\delta>\bar\delta=(1-2\alpha)/4$, mỗi bước giảm $f$ ít nhất $\gamma_2=\alpha\beta\bar\delta^2/(1+\bar\delta)$; khi $\delta\le\bar\delta$, bước đầy đủ được nhận và $\delta$ co theo bậc hai.

::: remark Nhận xét 04.54 (Giả thiết của cận sai số phải kiểm riêng)
**Tự điều chỉnh không bảo đảm nghiệm.** $-\log s$ và $s-\log s$ có cùng $\varphi''$, $\varphi'''$, cùng tự điều chỉnh; chỉ hàm thứ hai bị chặn dưới. Giả thiết $\delta<1$, kéo theo $f$ bị chặn dưới, phải kiểm riêng tại điểm đang xét.

**Không đổi $\delta$ thành $\delta^2$.** Với $\delta=\tfrac34$, cận đúng là $\log4-\tfrac34\approx0{,}636$; thay $\delta$ bằng $\delta^2=\tfrac9{16}$ cho $-\tfrac9{16}-\log\tfrac7{16}\approx0{,}264$, nhỏ hơn sai số thật $0{,}636$, nên không còn là cận trên.

**Phạm vi của lớp hàm.** Mất mát logistic không tự điều chỉnh theo Định nghĩa 04.47, nên Định lý 04.50 không áp dụng trực tiếp cho hồi quy logistic; Bach (2010) phát triển một biến thể của khái niệm cho trường hợp này.
:::

**Trong học máy.** Lớp hàm tự điều chỉnh chứa các hàm chắn log $-\sum\log(\cdot)$ của phương pháp điểm trong, cách mà các bộ giải tối ưu lồi xử lý ràng buộc bất đẳng thức, chẳng hạn khi giải quy hoạch bậc hai của máy vector hỗ trợ (Bài 03). Với các mô hình có mất mát dạng $-\log$ của một biểu thức tuyến tính theo tham số, như trọng số trộn của Tình huống 04.2, cận (6.1) cho một tiêu chí dừng có chứng nhận mà không cần ước lượng hằng số nào.

::: exercise Bài tập 04.10
Xét $f(s)=-\log s-\log(1-s)$ trên $(0,1)$.

- (a) Dùng Mệnh đề 04.48 chứng minh $f$ tự điều chỉnh; tìm $s^*$ và $f^*$.
- (b) Tại $s=\tfrac14$, tính $g$, $H$, $\delta$ và cận (6.1).
- (c) So cận với sai số thật $f(\tfrac14)-f^*$ và với giảm mô hình $\tfrac12\delta^2$.
:::

::: hint
$s\mapsto1-s$ là hàm affine. Do đối xứng, $s^*=\tfrac12$.
:::

::: solution
**Câu (a).**

$-\log s$ tự điều chỉnh; $-\log(1-s)$ là $-\log$ hợp với ánh xạ affine $s\mapsto1-s$, tự điều chỉnh theo Mệnh đề 04.48(c); tổng tự điều chỉnh theo (b). $f'(s)=-\tfrac1s+\tfrac1{1-s}=0$ tại $s^*=\tfrac12$; $f''>0$ nên đó là cực tiểu, $f^*=2\log2$.

**Câu (b).**

$g=-4+\tfrac43=-\tfrac83$, $H=16+\tfrac{16}9=\tfrac{160}9$, $\delta^2=\frac{64/9}{160/9}=\tfrac25$, $\delta\approx0{,}6325$. Cận: $-0{,}6325-\log0{,}3675\approx-0{,}6325+1{,}0009=0{,}3685$.

**Câu (c).**

Sai số thật: $-\log\tfrac14-\log\tfrac34-2\log2=\log\tfrac43\approx0{,}2877$. Giảm mô hình: $0{,}2$. Thứ tự $0{,}2<0{,}2877<0{,}3685$: cận đúng, giảm mô hình nhỏ hơn sai số.

**Kiểm tra lại.**

$\delta\le0{,}68$, nên Hệ quả 04.51 cũng cho $\delta^2=0{,}4\ge0{,}2877$.
:::

**Chuỗi suy luận của mục.**

1. Định nghĩa 04.47 đặt giả thiết bất biến theo đơn vị đo; Mệnh đề 04.48 cho các phép dựng.
2. Bổ đề 04.49 chặn dưới độ cong dọc đường thẳng; Định lý 04.50 cho cận (6.1); Hệ quả 04.51 cho cận $\delta^2$.
3. Hệ quả 04.52 chuyển cận sang bài có đẳng thức tại điểm khả thi; Định lý 04.53 cho số bước Newton.

**Kết mục.** Mục này trả lời câu hỏi của Nhận xét 04.32: với hàm tự điều chỉnh bị chặn dưới, độ giảm Newton $\delta<1$ chặn sai số mục tiêu bằng $-\delta-\log(1-\delta)$ (Định lý 04.50), và tại điểm khả thi của bài có đẳng thức, $\delta_{eq}$ làm được điều tương tự (Hệ quả 04.52). Thiếu hụt còn lại là phạm vi: mất mát logistic không thuộc lớp tự điều chỉnh, và không có cận sai số nào theo $\lVert r\rVert_2$ dùng chung cho mọi bài, nếu không có giả thiết thêm. Mục 7 đặt bốn tiêu chí dừng cạnh nhau, nêu tiêu chí nào chứng nhận gì dưới giả thiết nào, và áp dụng khung vào một mô hình học có ràng buộc.

## 7. Tổng hợp: khung chung của bước lặp

Mục 6 để lại câu hỏi tiêu chí dừng nào chứng nhận điều gì. Xét một mô hình hồi quy ridge hai hệ số trên ba mẫu, với ma trận dữ liệu $M=\begin{bmatrix}1&0\\1&1\\0&1\end{bmatrix}$, nhãn $y=(1,2,0)^T$, hệ số chính quy hóa $\rho=1$ và ràng buộc tổng hệ số $w_1+w_2=1$. Người huấn luyện khởi đầu từ $w=0$, một điểm không khả thi, nên cần chọn giữa Thuật toán 04.3 và 04.4, lập hệ của bước từ gradient và Hessian của mất mát, và biết khi dừng thì phần dư nhỏ nói gì về mất mát.

Mọi phương pháp của chương đi qua cùng bốn bước: lập mô hình bậc hai tại điểm hiện tại, viết KKT của bài con thành hệ tuyến tính, chọn bước, kiểm tiêu chí dừng. Mục này đặt các phương pháp trong một bảng, phát biểu điều mỗi tiêu chí dừng chứng nhận (Mệnh đề 04.55), rồi giải bài ridge trên (Ví dụ 04.25).

| Phương pháp | Hệ của bước | Nhận bước | Dừng |
|---|---|---|---|
| Giảm gradient (Thuật toán 04.1) | $d=-g$, tức $W=I$ | Armijo trên $f$ | $\lVert g\rVert_2\le\varepsilon_g$ |
| Dốc nhất theo $\lVert\cdot\rVert_W$ (Mệnh đề 04.15) | $Wd=-g$, $W$ cố định | Armijo trên $f$ | $\lVert g\rVert_2\le\varepsilon_g$ |
| Newton (Thuật toán 04.2) | $Hd=-g$ | Armijo trên $f$ | $\tfrac12\delta^2\le\varepsilon_{\mathrm{model}}$ |
| Newton khả thi (Thuật toán 04.3) | hệ (4.1) theo $(d,\eta)$ | Armijo trên $F$ | $\tfrac12\delta_{eq}^2\le\varepsilon_{\mathrm{model}}$ |
| Newton từ điểm chưa khả thi (Thuật toán 04.4) | hệ (5.1) theo $(d,\Delta\nu)$ | Armijo trên $\lVert r\rVert_2$ | $\lVert r_p\rVert_2\le\varepsilon_p$, $\lVert r_d\rVert_2\le\varepsilon_d$ |

::: proposition Mệnh đề 04.55 (Điều mà mỗi tiêu chí dừng chứng nhận)
**Giả thiết.** Các bài của Định nghĩa 04.1.

**Kết luận.**

- (a) Nếu $f$ lồi mạnh với hằng số $\mu$ trên $\mathbb R^n$ và $\lVert\nabla f(x)\rVert_2\le\varepsilon_g$ thì $f(x)-f^*\le\varepsilon_g^2/(2\mu)$.
- (b) Nếu $f$ thỏa giả thiết của Định lý 04.50 và $\delta\le0{,}68$ thì $f(x)-f^*\le\delta^2$; nếu chỉ $\delta<1$ thì $f(x)-f^*\le-\delta-\log(1-\delta)$.
- (c) Tại điểm khả thi, dưới giả thiết của Hệ quả 04.52, cùng các cận với $\delta_{eq}$.
- (d) $r(u,\nu)=0$ khi và chỉ khi $u$ là nghiệm với nhân tử $\nu$. Khi $r\ne0$:
    - tại điểm chưa khả thi, $F(u)-F^*$ có thể âm, nên không phải sai số;
    - không có hàm $\omega$ với $\omega(0)=0$ sao cho $F(u)-F^*\le\omega(\lVert r\rVert_2)$ cho mọi bài lồi có đẳng thức, kể cả tại điểm khả thi.

**Điều kiện áp dụng.** Mỗi phần có giả thiết riêng; không có giả thiết thì tiêu chí chỉ đo mức vi phạm của (1.1) hoặc (1.2).

**Phạm vi.** Không phần nào áp dụng cho mất mát không lồi.
:::

::: proof Chứng minh Mệnh đề 04.55
**Bước 1 (phần a, b, c).**

Phần (a) là (2.5) của Mệnh đề 04.25(b). Phần (b) là Định lý 04.50 và Hệ quả 04.51. Phần (c) là Hệ quả 04.52, cùng phép chứng minh của Hệ quả 04.51 áp cho $\psi$.

**Bước 2 (phần d, chiều tương đương).**

$r=0$ nghĩa là $(u,\nu)$ thỏa (1.2); theo Mệnh đề 04.2(b), điều đó tương đương $u$ là nghiệm với nhân tử $\nu$.

**Bước 3 (phần d, giá trị âm).**

Ví dụ 04.22 cho điểm $u=(0,0)^T$ của VD3 với $r\ne0$ và $F(u)-F^*=0-140<0$.

**Bước 4 (phần d, không có cận trên theo phần dư).**

Xét bài $F(u)=\tfrac\varepsilon2u_1^2+\tfrac12u_2^2$ với $\varepsilon>0$ và ràng buộc $u_2=0$, tức $n=2$, $p=1$, $A=[0\ \ 1]$, $b=0$. Hệ (1.2) là $\varepsilon u_1=0$, $u_2+\nu=0$, $u_2=0$, nên $u^*=0$, $\nu^*=0$ và $F^*=0$.

Tại điểm khả thi $u=(u_1,0)$ với $\nu=0$: $r_d=(\varepsilon u_1,0)$, $r_p=0$, nên $\lVert r\rVert_2=\varepsilon\lvert u_1\rvert$ và $F(u)-F^*=\frac{\varepsilon u_1^2}2=\frac{\lVert r\rVert_2^2}{2\varepsilon}$. Với $\lVert r\rVert_2=1$ cố định, sai số bằng $\frac1{2\varepsilon}$, không bị chặn khi $\varepsilon\to0$. Một hàm $\omega$ dùng chung cho mọi bài sẽ phải có $\omega(1)\ge\frac1{2\varepsilon}$ với mọi $\varepsilon>0$, điều không thể. $\square$
:::

Các tiêu chí dừng khác nhau ở thông tin cần biết thêm. Chuẩn gradient cần hằng số $\mu$; độ giảm Newton cần tính tự điều chỉnh nhưng không cần hằng số; chuẩn phần dư chỉ đo mức thỏa KKT. Trong lớp lồi, mọi tiêu chí đều đo khoảng cách tới hệ KKT, vì điểm thỏa KKT là nghiệm.

Bước 4 của chứng minh cũng giải thích vì sao cận theo chuẩn gradient ở phần (a) cần $\mu$: hàm rút gọn $\tfrac\varepsilon2u_1^2$ lồi mạnh với $\mu=\varepsilon$, và cận $\frac{\lVert g\rVert_2^2}{2\mu}$ bằng đúng sai số.

::: example Ví dụ 04.25 (Hồi quy ridge với tổng hệ số bằng 1)
**Bài toán.**

Ma trận dữ liệu $M\in\mathbb R^{N_s\times n}$ chứa $N_s$ mẫu và $n$ đặc trưng, nhãn $y\in\mathbb R^{N_s}$, hệ số chính quy hóa $\rho>0$, ràng buộc $Aw=b$ với $A\in\mathbb R^{p\times n}$ đủ hạng hàng:

$$
\underset{w}{\operatorname{minimize}}\quad J(w)=\tfrac12\lVert Mw-y\rVert_2^2+\tfrac\rho2\lVert w\rVert_2^2\qquad\text{subject to}\quad Aw=b .
$$

**Gradient, Hessian và giả thiết.**

$\nabla J(w)=M^T(Mw-y)+\rho w$ và $\nabla^2J=M^TM+\rho I$. Với $v\ne0$, $v^T(M^TM+\rho I)v=\lVert Mv\rVert_2^2+\rho\lVert v\rVert_2^2>0$, nên $H\succ0$ với mọi dữ liệu, kể cả khi $M^TM$ suy biến vì $N_s<n$. Ví dụ dùng chữ $M$ cho ma trận dữ liệu, để chữ $X$ của Nhận xét 04.19 dành cho dữ liệu phân loại.

**Một bước từ $w=0$, $\nu=0$.**

$r_d=-M^Ty$, $r_p=-b$, và hệ (5.1) là $\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\Delta\nu\end{bmatrix}=\begin{bmatrix}M^Ty\\b\end{bmatrix}$. Vì $J$ bậc hai, Mệnh đề 04.44(d) cho bước $t=1$ tới đúng nghiệm KKT.

**Số liệu.**

Dữ liệu của mở đầu mục: $M=\begin{bmatrix}1&0\\1&1\\0&1\end{bmatrix}$, $y=(1,2,0)^T$, $\rho=1$, $A=[1\ \ 1]$, $b=1$.

- $M^TM=\begin{bmatrix}2&1\\1&2\end{bmatrix}$, nên $H=\begin{bmatrix}3&1\\1&3\end{bmatrix}$.
- $M^Ty=(1+2,\,2+0)^T=(3,2)^T$.
- Hệ (5.1): $3d_1+d_2+\Delta\nu=3$, $d_1+3d_2+\Delta\nu=2$, $d_1+d_2=1$.
- Trừ hai hàng đầu: $2d_1-2d_2=1$; cùng $d_1+d_2=1$ cho $d=(\tfrac34,\tfrac14)^T$.
- Hàng đầu: $\Delta\nu=3-\tfrac94-\tfrac14=\tfrac12$.

**Kiểm tra lại.**

$w^*=(\tfrac34,\tfrac14)^T$, $\nu^*=\tfrac12$. $\nabla J(w^*)=M^T(Mw^*-y)+w^*$ với $Mw^*-y=(-\tfrac14,-1,\tfrac14)^T$, nên $M^T(Mw^*-y)=(-\tfrac54,-\tfrac34)^T$ và $\nabla J(w^*)=(-\tfrac12,-\tfrac12)^T$. Cộng $A^T\nu^*=(\tfrac12,\tfrac12)^T$ được $0$, và $\tfrac34+\tfrac14=1$.

**Diễn giải.**

- Thuật toán 04.4 được chọn vì điểm đầu $w=0$ không thỏa $w_1+w_2=1$; Thuật toán 04.3 cần điểm đầu khả thi.
- Sau một bước, $r=0$, nên theo Mệnh đề 04.55(d) điểm thu được là nghiệm.
- Tại một điểm khả thi, $J$ bậc hai lồi chặt nên tự điều chỉnh, và Mệnh đề 04.55(c) cho cận theo $\delta_{eq}$ qua hàm rút gọn $\psi$; vì $\nabla^2J\succeq\rho I$, $\psi$ còn lồi mạnh, nên cận (2.5) áp cho $\psi$ cũng dùng được.
- Riêng $\lVert r\rVert_2$ nhỏ tại một điểm chưa khả thi không cho cận của $J-J^*$ (Mệnh đề 04.55(d)).
:::

**Chuỗi suy luận của mục.**

1. Bảng các phương pháp gom Thuật toán 04.1–04.4 theo hệ của bước, quy tắc nhận bước và tiêu chí dừng.
2. Mệnh đề 04.55 nêu điều mỗi tiêu chí chứng nhận, dựa trên Mệnh đề 04.25, Định lý 04.50, Hệ quả 04.51, 04.52 và Mệnh đề 04.2.
3. Ví dụ 04.25 chạy khung trên hồi quy ridge có ràng buộc, với hệ (5.1) lập từ gradient và Hessian của mất mát.

**Kết mục.** Mục này cho cách lập hệ của bước từ một mô hình học có ràng buộc đẳng thức (Ví dụ 04.25) và bảng chứng nhận của các tiêu chí dừng (Mệnh đề 04.55). Hai thiếu hụt còn lại: một tiêu chí dừng chỉ chứng nhận sai số khi giả thiết tương ứng đã được kiểm, và mọi kết quả cần mất mát lồi. Ba tình huống dưới đây áp dụng khung vào hai mô hình lồi và cho thấy điều xảy ra với một mô hình không lồi; giới hạn về tính lồi được chuyển cho Bài 05b, còn Bài 05 xử lý gradient trên nhóm nhỏ mẫu.

## Tình huống áp dụng và ứng dụng

::: application Tình huống 04.1 (Hồi quy logistic có chính quy hóa: Newton và giảm gradient)
**Bài toán và dữ liệu.**

Sáu sinh viên có số giờ ôn tập $a=(1,2,3,4,5,6)$ và kết quả $y=(-1,-1,+1,-1,+1,+1)$, với $+1$ là đạt (số liệu giả lập sư phạm). Mô hình dự báo xác suất đạt là $\sigma(w_1a+w_2)$, với tham số $w=(w_1,w_2)$ gồm hệ số và hệ số chặn. Dữ liệu không tách được tuyến tính vì sinh viên thứ ba đạt còn sinh viên thứ tư không đạt.

**Mô hình hóa.**

Với $\tilde a_i=(a_i,1)^T$ và $\mu=0{,}1$:

$$
J(w)=\sum_{i=1}^6\log\bigl(1+e^{-y_i\tilde a_i^Tw}\bigr)+\frac\mu2\lVert w\rVert_2^2 .
$$

Đây là bài không ràng buộc của Định nghĩa 04.1 trên $\mathbb R^2$.

**Xác minh giả thiết.**

Hessian $\nabla^2J(w)=\sum_i\ell''(m_i)\tilde a_i\tilde a_i^T+\mu I\succeq\mu I$, nên $J$ lồi mạnh với hằng số $0{,}1$ và có nghiệm duy nhất (Mệnh đề 01.46(b)); Mệnh đề 04.2(a) áp dụng. Vì $\ell''\le\tfrac14$, với giá trị lớn nhất khi biên bằng $0$, $\nabla^2J(w)\preceq\nabla^2J(0)$, nên theo Nhận xét 04.19, $L=\lambda_{\max}(\nabla^2J(0))$.

**Bước Newton đầu tiên, tính tay.**

Tại $w=0$, mọi biên bằng $0$, $\ell'(0)=-\tfrac12$, $\ell''(0)=\tfrac14$. Gradient: $g=-\tfrac12\sum_iy_i\tilde a_i=-\tfrac12(7,0)^T=(-3{,}5;\,0)^T$, vì $\sum_iy_ia_i=-1-2+3-4+5+6=7$ và $\sum_iy_i=0$. Hessian:

$$
H=\frac14\begin{bmatrix}\sum a_i^2&\sum a_i\\\sum a_i&6\end{bmatrix}+0{,}1I=\begin{bmatrix}22{,}85&5{,}25\\5{,}25&1{,}6\end{bmatrix},
$$

với $\sum a_i^2=91$, $\sum a_i=21$.

- Định thức: $22{,}85\cdot1{,}6-5{,}25^2=8{,}9975$.
- Hệ (3.1): $d=H^{-1}(3{,}5;\,0)^T=\frac{(1{,}6\cdot3{,}5;\,-5{,}25\cdot3{,}5)}{8{,}9975}\approx(0{,}6224;\,-2{,}0422)^T$.
- Độ giảm Newton: $\tfrac12\delta^2=\tfrac12\cdot3{,}5\cdot0{,}6224\approx1{,}0892$.
- Nhận bước với $\alpha=0{,}1$: ngưỡng là $J(0)+0{,}1g^Td\approx4{,}1589-0{,}2178=3{,}9410$, và $J(d)\approx3{,}0064$ không vượt ngưỡng, nên $t=1$ được nhận.

**Áp dụng Thuật toán 04.2.**

| $k$ | $w^k$ | $J(w^k)-J^*$ | $\lVert\nabla J(w^k)\rVert_2$ | $\tfrac12\delta^2$ |
|---|---|---|---|---|
| 0 | $(0;\,0)$ | $1{,}17$ | $3{,}50$ | $1{,}09$ |
| 1 | $(0{,}6224;\,-2{,}0422)$ | $2{,}0\cdot10^{-2}$ | $0{,}525$ | $1{,}9\cdot10^{-2}$ |
| 2 | $(0{,}7190;\,-2{,}3121)$ | $6{,}6\cdot10^{-5}$ | $3{,}6\cdot10^{-2}$ | $6{,}6\cdot10^{-5}$ |
| 3 | $(0{,}72456;\,-2{,}32486)$ | $1{,}1\cdot10^{-9}$ | $1{,}6\cdot10^{-4}$ | $1{,}1\cdot10^{-9}$ |
| 4 | $(0{,}724584;\,-2{,}324903)$ | $<10^{-15}$ | $2{,}9\cdot10^{-9}$ | $3{,}4\cdot10^{-19}$ |

Mọi bước dùng $t=1$. Từ $k=1$, số chữ số đúng của sai số gần gấp đôi mỗi bước, đúng Định lý 04.34; $J^*\approx2{,}98627$.

**Đối chiếu với giảm gradient.**

$L=\lambda_{\max}\approx24{,}08$, $\kappa=L/\mu\approx241$. Giảm gradient với bước $\tfrac1L$ cần $580$ bước để $J-J^*\le10^{-6}$; cận $\kappa\log(e_0/\varepsilon)$ của Định lý 04.26 là khoảng $3365$ bước. Hai giá trị riêng của $\nabla^2J(0)$ là $24{,}08$ và $0{,}37$: cột giờ ôn tập và cột hệ số chặn tương quan mạnh, nên độ cong theo hai phương chênh nhau gần $65$ lần.

**Diễn giải.**

Nghiệm $w^*\approx(0{,}7246;\,-2{,}3249)$ cho xác suất đạt $0{,}5$ tại $a\approx3{,}21$ giờ. Theo (2.5), tại $k=3$ sai số không vượt $\lVert\nabla J\rVert_2^2/(2\mu)\approx1{,}3\cdot10^{-7}$, nên dừng ở đây có chứng nhận; sai số thật là $1{,}1\cdot10^{-9}$.

**Kiểm tra lại.**

Tại $w^4$, $\lVert\nabla J\rVert_2\approx3\cdot10^{-9}$, và theo (2.5), $J(w^4)-J^*\le(3\cdot10^{-9})^2/0{,}2<10^{-16}$.

**Giới hạn.**

Với $n$ đặc trưng, mỗi bước Newton giải hệ $n\times n$ với chi phí cỡ $n^3$, nên khi $n$ lớn các phương pháp bậc nhất của Bài 05 rẻ hơn. Mất mát logistic không tự điều chỉnh (Nhận xét 04.54), nên chứng nhận dùng (2.5) thay cho Định lý 04.50.

**Dẫn ngược lý thuyết.**

Mệnh đề 04.2(a) và 04.25 ở bước xác minh; Nhận xét 04.19 cho $L$; Mệnh đề 04.29 và Thuật toán 04.2 ở bước áp dụng; Định lý 04.34 cho tốc độ quan sát được; Định lý 04.26 cho phép so với giảm gradient; Mệnh đề 04.55(a) cho chứng nhận.
:::

::: application Tình huống 04.2 (Trọng số trộn hai mô hình có tổng bằng 1)
**Bài toán và dữ liệu.**

Hai mô hình ngôn ngữ, gọi là mô hình 1 và mô hình 2, cho xác suất của hai câu kiểm định: mô hình 1 cho $0{,}6$ và $0{,}2$; mô hình 2 cho $0{,}2$ và $0{,}4$. Đây là số liệu giả lập sư phạm. Mô hình trộn gán cho câu $j$ xác suất $w_1p_{1j}+w_2p_{2j}$. Cần chọn trọng số $w=(w_1,w_2)$ với $w_1+w_2=1$ để cực đại hợp lý của dữ liệu kiểm định.

**Mô hình hóa.**

Với $c_1=(0{,}6;\,0{,}2)$, $c_2=(0{,}2;\,0{,}4)$:

$$
F(w)=-\log(c_1^Tw)-\log(c_2^Tw)\qquad\text{subject to}\quad w_1+w_2=1,
$$

trên miền mở lồi $\{w\mid c_1^Tw>0,\ c_2^Tw>0\}$. Đây là bài có đẳng thức với $A=[1\ \ 1]$, $b=1$.

**Xác minh giả thiết.**

Gradient và Hessian của $F$ là

$$
\nabla F(w)=-\frac{c_1}{c_1^Tw}-\frac{c_2}{c_2^Tw},\qquad\nabla^2F(w)=\frac{c_1c_1^T}{(c_1^Tw)^2}+\frac{c_2c_2^T}{(c_2^Tw)^2}.
$$

1. Hessian xác định dương vì $c_1$, $c_2$ độc lập tuyến tính.
2. $F$ tự điều chỉnh theo Mệnh đề 04.48(b), (c).
3. Trên đường khả thi $w=(\theta,1-\theta)$, hàm rút gọn là $\psi(\theta)=-\log(0{,}2(1+2\theta))-\log(0{,}2(2-\theta))$ với $\theta\in(-\tfrac12,2)$; nó tiến tới $+\infty$ ở hai đầu, nên đạt cực tiểu.
4. $\psi'(\theta)=-\frac2{1+2\theta}+\frac1{2-\theta}=0$ cho $\theta^*=\tfrac34$, nên $w^*=(\tfrac34,\tfrac14)$ và $F^*=-\log\tfrac12-\log\tfrac14=\log8\approx2{,}0794$.

**Một bước Newton khả thi từ $w^0=(\tfrac12,\tfrac12)$.**

Tại $w^0$: $c_1^Tw^0=0{,}4$ và $c_2^Tw^0=0{,}3$.

Gradient: $g=-(1{,}5;\,0{,}5)-(\tfrac23,\tfrac43)=(-\tfrac{13}6,-\tfrac{11}6)$.

Hessian:

$$
H=\begin{bmatrix}2{,}25&0{,}75\\0{,}75&0{,}25\end{bmatrix}+\begin{bmatrix}\tfrac49&\tfrac89\\\tfrac89&\tfrac{16}9\end{bmatrix}=\frac1{36}\begin{bmatrix}97&59\\59&73\end{bmatrix}.
$$

Hệ rút gọn với $N=(-1,1)^T$:

- $N^THN=\frac{97-2\cdot59+73}{36}=\tfrac{13}9$;
- $N^Tg=\tfrac{13}6-\tfrac{11}6=\tfrac13$;
- hệ (4.2) cho $\Delta z=-\tfrac13\cdot\tfrac9{13}=-\tfrac3{13}$, nên $d=(\tfrac3{13},-\tfrac3{13})$;
- $w^1=(\tfrac{19}{26},\tfrac7{26})\approx(0{,}7308;\,0{,}2692)$.

Nhân tử lấy từ hàng đầu của (4.1): $(Hd)_1=\tfrac3{13}\cdot\tfrac{97-59}{36}=\tfrac3{13}\cdot\tfrac{38}{36}$, nên $\eta=-g_1-(Hd)_1=\tfrac{13}6-\tfrac{19}{78}=\tfrac{25}{13}$.

**Cận sai số.**

$\delta_{eq}^2=\frac{(1/3)^2}{13/9}=\tfrac1{13}$, $\delta_{eq}\approx0{,}2774$. Hệ quả 04.52: $F(w^0)-F^*\le-0{,}2774-\log0{,}7226\approx0{,}0475$. Sai số thật $\log\frac{25}{24}\approx0{,}0408$; giảm mô hình $\tfrac1{26}\approx0{,}0385$.

**Khởi đầu chưa khả thi.**

Từ $w=(1,1)$, $\nu=0$:

1. phần dư: $r_d=(-\tfrac{13}{12},-\tfrac{11}{12})$, $r_p=1$, $\lVert r\rVert_2\approx1{,}736$;
2. bước: hệ (5.1) cho $d=(\tfrac5{26},-\tfrac{31}{26})$;
3. nhận bước với $\alpha=0{,}1$: $t=1$ cho $\lVert r^+\rVert_2\approx1{,}494\le0{,}9\cdot1{,}736\approx1{,}562$, và $r_p^+=0$ theo Mệnh đề 04.44(c);
4. miền: điểm mới $(1{,}192;\,-0{,}192)$ có $c_1^Tw\approx0{,}677>0$ và $c_2^Tw\approx0{,}162>0$, nên thuộc miền; trọng số âm xuất hiện vì bài chỉ có đẳng thức, và các bước sau là Newton khả thi, hội tụ về $w^*$.

**Diễn giải.**

Mô hình trộn đặt $75\%$ trọng số cho mô hình 1. Nhân tử $\nu^*=2$ là số câu kiểm định: vì $w^T\nabla F(w)=-2$ với mọi $w$, phương trình dừng $\nabla F=-\nu\mathbf 1$ nhân với $w^{*T}$ cho $\nu^*=2$. Theo Hệ quả 03.24, đó là tốc độ giảm của $F^*$ khi nới ràng buộc thành $w_1+w_2=b$: thật vậy $F^*(b)=\log8-2\log b$.

**Kiểm tra lại.**

Tại $w^*$: $c_1^Tw^*=0{,}5$, $c_2^Tw^*=0{,}25$, $\nabla F=-(1{,}2;\,0{,}4)-(0{,}8;\,1{,}6)=(-2,-2)$, và $\nabla F+2\mathbf 1=0$.

**Giới hạn.**

Bài toán không có ràng buộc $w\ge0$; ở đây nghiệm tự thỏa, nhưng với dữ liệu khác nghiệm có thể có trọng số âm, khi đó cần ràng buộc bất đẳng thức và phương pháp điểm trong.

**Dẫn ngược lý thuyết.**

Mệnh đề 04.2(b) và 04.48 ở bước xác minh; Mệnh đề 04.41 và Thuật toán 04.3 ở bước áp dụng; Hệ quả 04.52 cho cận sai số; Mệnh đề 04.44 và Thuật toán 04.4 cho khởi đầu chưa khả thi; Hệ quả 03.24 cho nghĩa của nhân tử.
:::

::: application Tình huống 04.3 (Mạng tuyến tính hai lớp: giả thiết không thỏa)
**Bài toán và dữ liệu.**

Mạng có một nơ ron ở mỗi lớp, không có hàm kích hoạt: đầu vào $x$ qua trọng số $b$ rồi $a$, dự báo $abx$. Một mẫu $(x,y)=(1,1)$ với mất mát bình phương cho

$$
f(a,b)=\tfrac12(ab-1)^2 .
$$

Đây là mô hình nhỏ nhất có tính không lồi của mạng sâu: tham số xuất hiện dưới dạng tích.

**Kiểm giả thiết.**

$\nabla f=(ab-1)(b,a)^T$ và $\nabla^2f=\begin{bmatrix}b^2&2ab-1\\2ab-1&a^2\end{bmatrix}$.

1. Tính lồi bị vi phạm: tại $(0,0)$, Hessian $\begin{bmatrix}0&-1\\-1&0\end{bmatrix}$ có giá trị riêng $\pm1$.
2. Gradient Lipschitz toàn cục bị vi phạm: các phần tử $a^2$, $b^2$ của Hessian không bị chặn.
3. Tập nghiệm $\{ab=1\}$, với $f^*=0$, gồm hai nhánh hyperbol, không lồi.

Do đó Mệnh đề 04.2(a) chỉ còn chiều cần, và các Định lý 04.22, 04.26 không áp dụng.

**Giảm gradient từ $(1,-1)$, bước $t=\tfrac14$.**

Trên đường chéo $a=-b$, $\nabla f=(a^2+1)(a,-a)$, nên cập nhật giữ $a=-b$ và $a^+=a\bigl(1-\tfrac14(1+a^2)\bigr)$.

| $k$ | $a_k=-b_k$ | $f$ | $\lVert\nabla f\rVert_2$ |
|---|---|---|---|
| 0 | $1$ | $2$ | $2{,}83$ |
| 1 | $0{,}5$ | $0{,}781$ | $0{,}884$ |
| 2 | $0{,}344$ | $0{,}625$ | $0{,}544$ |
| 5 | $0{,}135$ | $0{,}518$ | $0{,}194$ |
| 7 | $0{,}075$ | $0{,}506$ | $0{,}107$ |

Dãy tiến về điểm yên ngựa $(0,0)$: chuẩn gradient về $0$ trong khi $f\to\tfrac12$, xa $f^*=0$. Tiêu chí dừng $\lVert g\rVert_2\le\varepsilon_g$ của Thuật toán 04.1 sẽ dừng tại một điểm không phải nghiệm.

**Newton tại $(0{,}2;\,0{,}2)$.**

$g=(0{,}04-1)(0{,}2;\,0{,}2)=-0{,}192(1,1)$. Hessian $\begin{bmatrix}0{,}04&-0{,}92\\-0{,}92&0{,}04\end{bmatrix}$ có giá trị riêng $-0{,}88$ theo $(1,1)$ và $0{,}96$ theo $(1,-1)$. Vì $g$ song song $(1,1)$, $d=-H^{-1}g=-\tfrac{0{,}192}{0{,}88}(1,1)=-\tfrac{12}{55}(1,1)$, và $g^Td=2\cdot0{,}192\cdot\tfrac{12}{55}\approx0{,}0838>0$: hướng Newton là hướng tăng.

Với $t=1,\tfrac12,\tfrac14,\tfrac18,\tfrac1{16}$, $f$ tại điểm thử là $0{,}4997$; $0{,}4918$; $0{,}4791$; $0{,}4706$; $0{,}4659$, đều lớn hơn $f(0{,}2;\,0{,}2)=0{,}4608$.

Mọi bước $t\in(0,1]$ đều bị loại với $\alpha=0{,}1$. Trên tia, $a=b=a(t)=0{,}2-\tfrac{12}{55}t$ và $f=\tfrac12(1-a(t)^2)^2$, nên

$$
\begin{aligned}
f(x+td)-f(x)&=\tfrac12\bigl(0{,}04-a(t)^2\bigr)\bigl(1{,}96-a(t)^2\bigr)\\
&=\tfrac12\cdot\tfrac{12}{55}t\Bigl(0{,}4-\tfrac{12}{55}t\Bigr)\bigl(1{,}96-a(t)^2\bigr)\\
&\ge\tfrac12\cdot\tfrac{12}{55}t\cdot0{,}18\cdot1{,}92\approx0{,}0377\,t .
\end{aligned}
$$

Dòng thứ hai dùng $0{,}04-a^2=(0{,}2-a)(0{,}2+a)$; dòng thứ ba dùng $\tfrac{12}{55}t\le0{,}22$ và $\lvert a(t)\rvert<0{,}2$ khi $t\in(0,1]$. Ngưỡng Armijo chỉ tăng $\alpha t\,g^Td\approx0{,}0084\,t$, nên mọi bước thử bị loại. Một thủ tục quay lui chạy trên hướng này không kết thúc; quay lui chỉ được định nghĩa cho $g^Td<0$.

![Các đường mức của f bằng một nửa của ab trừ 1 bình phương trên hình vuông từ âm 2,3 đến 2,3. Hai nhánh hyperbol ab bằng 1 (nét đậm xanh lá) là tập cực tiểu với f bằng 0. Hai trục tọa độ và hyperbol ab bằng 2 là đường mức f bằng 1/2; gốc là điểm yên ngựa. Đường nét đứt là mức f bằng 2, gồm ab bằng âm 1 và ab bằng 3. Quỹ đạo giảm gradient màu đỏ đi từ (1, âm 1) dọc đường chéo về gốc. Mũi tên tím tại (0,2; 0,2) là hướng Newton, chỉ về gốc.](img/lec-04/deep-linear-saddle.svg)

Hình cho thấy cả hai hiện tượng. Quỹ đạo giảm gradient nằm trên đường chéo $a=-b$, nơi mọi điểm có $ab\le0$, và trượt về điểm yên ngựa. Mũi tên Newton tại $(0{,}2;\,0{,}2)$ chỉ về gốc, tức đi lên mặt mất mát, vì theo phương $(1,1)$ hàm bị cong xuống.

**Diễn giải.**

Hai hậu quả quan sát được tương ứng hai giả thiết bị vi phạm:

1. không lồi: điểm dừng không phải nghiệm, và Newton bị hút về điểm dừng bất kỳ, kể cả điểm yên ngựa;
2. Hessian không xác định dương: hướng Newton có thể là hướng tăng (Nhận xét 04.36).

Đối xứng $a=-b$ của điểm đầu được bảo toàn bởi giảm gradient; điểm đầu ngẫu nhiên như $(1;\,0{,}5)$ phá đối xứng đó và giảm gradient cùng bước $\tfrac14$ đưa $f$ từ $0{,}125$ xuống dưới $2{,}1\cdot10^{-5}$ sau $7$ bước.

**Kiểm tra lại.**

Tại $(0{,}5;\,-0{,}5)$: $ab-1=-1{,}25$, $f=\tfrac12\cdot1{,}5625=0{,}78125$, $\nabla f=-1{,}25\,(-0{,}5;\,0{,}5)=(0{,}625;\,-0{,}625)$ với chuẩn $0{,}884$, khớp bảng. Tại $(0{,}2;\,0{,}2)$: $f=\tfrac12\cdot0{,}96^2=0{,}4608$.

**Giới hạn.**

Mạng thật có hàng triệu tham số và nhiều lớp phi tuyến, nhưng điểm yên ngựa và Hessian không xác định dương vẫn xuất hiện (Goodfellow, Bengio và Courville 2016, mục 8.2.3, tr. 285–288). Bài 05 xét khởi tạo ngẫu nhiên để phá đối xứng.

**Dẫn ngược lý thuyết.**

Mệnh đề 04.2(a) và Định lý 04.22, 04.26 là các kết quả có giả thiết bị vi phạm; Mệnh đề 04.7(c), 04.29(b) và Nhận xét 04.36 giải thích hướng tăng; Định nghĩa 04.17 cho giả thiết Lipschitz bị vi phạm.
:::

Các khái niệm của chương xuất hiện trong học máy ở những chỗ sau.

- **Mô hình tuyến tính tổng quát.** Hồi quy logistic được huấn luyện bằng Newton, tức bình phương nhỏ nhất có trọng số lặp (Tình huống 04.1).
- **Tốc độ học.** Bước $\tfrac1L$ của Bổ đề 04.20 bảo đảm mất mát giảm; với hàm bậc hai, bước lớn hơn $\tfrac2L$ làm dãy phân kỳ (Ví dụ 04.7, Nhận xét 04.13).
- **Chuẩn hóa đặc trưng.** Với mô hình tuyến tính, chia theo độ lệch chuẩn là một tiền điều kiện đường chéo (Nhận xét 04.16).
- **Ràng buộc trên tham số.** Trọng số trộn và phân bổ ngân sách tính toán là bài có đẳng thức (Mục 4, 5, Tình huống 04.2).
- **Bộ giải tối ưu lồi.** Hàm chắn log và hệ (5.1) là hai thành phần của phương pháp điểm trong (Mục 5, 6).
- **Mạng sâu.** Điểm yên ngựa và Hessian không xác định dương hạn chế phương pháp Newton (Tình huống 04.3).

## Tóm tắt chương

**Định nghĩa.**

- Bài không ràng buộc và bài có đẳng thức (Định nghĩa 04.1); phương pháp giảm (04.4);
- Đạo hàm hướng và hướng giảm (04.6); mô hình bậc hai và hướng gradient (04.8); điều kiện Armijo và quay lui (04.10);
- Chuẩn có trọng số, hướng dốc nhất, chuẩn đối ngẫu (04.14); gradient Lipschitz (04.17);
- Hướng Newton (04.28); độ giảm Newton (04.30); hội tụ tuyến tính và bậc hai (04.33);
- Bước Newton khả thi (04.38); phần dư KKT (04.43); hàm tự điều chỉnh (04.47).

**Kết quả chính.**

- Mệnh đề 04.2: hệ KKT rút gọn vừa cần vừa đủ.
- Mệnh đề 04.7, 04.9, 04.11: tiêu chuẩn dấu, nghiệm của mô hình bậc hai, quay lui kết thúc.
- Mệnh đề 04.15: hướng dốc nhất theo $\lVert\cdot\rVert_W$ là nghiệm của $Wd=-g$.
- Bổ đề 04.18, 04.20, 04.21, 04.23; Định lý 04.22, 04.24, 04.26; Mệnh đề 04.25: cận trên bậc hai, bổ đề giảm, các tốc độ $O(1/k)$ và tuyến tính.
- Mệnh đề 04.29, 04.31: bốn cách đọc hướng Newton, độ giảm Newton, bất biến affine.
- Định lý 04.34, 04.35: hội tụ bậc hai cục bộ và hai pha.
- Mệnh đề 04.37, Định lý 04.39, Mệnh đề 04.41: hướng khả thi, hệ KKT của bước Newton khả thi, khử biến.
- Mệnh đề 04.44, 04.45: hệ Newton cho phần dư, chuẩn phần dư giảm.
- Mệnh đề 04.48, Bổ đề 04.49, Định lý 04.50, Hệ quả 04.51, 04.52, Định lý 04.53: tự điều chỉnh và cận sai số.
- Mệnh đề 04.55: điều mà mỗi tiêu chí dừng chứng nhận.

**Công thức cần nhớ.**

$$
Wd=-g,\qquad f(x+td)\le f(x)+\alpha t\,g^Td,\qquad f(y)\le f(x)+\nabla f(x)^T(y-x)+\tfrac L2\lVert y-x\rVert_2^2;
$$

$$
f(x^k)-f^*\le\frac{L\lVert x^0-x^*\rVert_2^2}{2k},\qquad f(x^k)-f^*\le\Bigl(1-\frac\mu L\Bigr)^k\bigl(f(x^0)-f^*\bigr),\qquad f(x)-f^*\le\frac{\lVert\nabla f(x)\rVert_2^2}{2\mu};
$$

$$
Hd=-g,\qquad\delta^2=-g^Td,\qquad\begin{bmatrix}H&A^T\\A&0\end{bmatrix}\begin{bmatrix}d\\\Delta\nu\end{bmatrix}=-\begin{bmatrix}r_d\\r_p\end{bmatrix},\qquad f(x)-f^*\le-\delta-\log(1-\delta).
$$

Dòng đầu: hệ của bước, điều kiện Armijo, cận trên bậc hai. Dòng hai: ba cận của giảm gradient. Dòng ba: Newton, độ giảm Newton, hệ Newton cho phần dư (với $r_p=0$ và $\eta=\nu+\Delta\nu$ là hệ Newton khả thi), cận sai số.

**Giả thiết hay bị bỏ quên.**

- Hướng giảm chỉ bảo đảm $f$ giảm với bước đủ nhỏ.
- Các cận của giảm gradient cần gradient Lipschitz trên cả $\mathbb R^n$ và tính lồi; cận tuyến tính cần thêm lồi mạnh.
- Hướng Newton cần $H\succ0$, hoặc $H$ xác định dương trên $\ker A$ khi có đẳng thức; hội tụ bậc hai là cục bộ.
- Giảm mô hình $\tfrac12\delta^2$ không chặn sai số nếu không có tính tự điều chỉnh; cận (6.1) dùng $\delta$, không dùng $\delta^2$, và cần $\delta<1$ cùng $f^*>-\infty$.
- Tại điểm chưa khả thi, $F(u)-F^*$ có thể âm.

**Chuỗi suy luận của toàn chương.**

1. Mệnh đề 04.2 đặt đích: hệ (1.1) hoặc (1.2).
2. Mệnh đề 04.7, 04.9, 04.11 và Thuật toán 04.1 xây giảm gradient; Mệnh đề 04.15 tổng quát hóa thành $Wd=-g$; Định lý 04.22, 04.24, 04.26 cho bảo đảm.
3. Mệnh đề 04.29, 04.31, Thuật toán 04.2 và Định lý 04.34, 04.35 lấy $W=H$.
4. Định lý 04.39, Mệnh đề 04.41 và Thuật toán 04.3 thêm ràng buộc $Ad=0$ vào bài con.
5. Mệnh đề 04.44, 04.45 và Thuật toán 04.4 tuyến tính hóa cả hệ (1.2) từ điểm chưa khả thi.
6. Định lý 04.50 và Hệ quả 04.52 biến độ giảm Newton thành cận sai số; Mệnh đề 04.55 tổng hợp các chứng nhận.

**Giới hạn còn lại và bài sau.** Chương xây các phương pháp lặp cho hai lớp bài lồi của Định nghĩa 04.1 từ hệ KKT của Bài 03. Ba giới hạn còn lại được các bài sau xử lý.

1. Mọi phương pháp dùng gradient trên toàn bộ dữ liệu. Bài 05 (các phương pháp tối ưu trong huấn luyện mô hình học sâu) dùng gradient trên nhóm nhỏ mẫu cùng momentum và Nesterov, khi mất mát chỉ còn là ước lượng và quay lui Armijo không áp dụng nguyên dạng.
2. Mất mát của mạng sâu không lồi, nên $\nabla f=0$ chỉ là điều kiện cần (Tình huống 04.3). Bài 05b (hội tụ của hạ gradient và hạ gradient ngẫu nhiên) chứng minh các dạng hội tụ cho hàm không lồi và gradient ngẫu nhiên, kế thừa Bổ đề 04.20 và Định lý 04.22, 04.26.
3. Ràng buộc bất đẳng thức chưa được xử lý; hàm chắn log của Mục 6 là điểm xuất phát của phương pháp điểm trong (Boyd và Vandenberghe 2004, chương 11), ngoài phạm vi học phần.

## Bài tập củng cố

Bảng sau ánh xạ bài tập trong mục và bài tập củng cố tới bảy mục tiêu học tập. Các bài không trùng đề với bộ bài giao chính thức trong tệp bài tập của Bài 04.

| Mục tiêu | Bài tập trong mục | Bài tập củng cố |
|---|---|---|
| 1. Hệ KKT rút gọn | 04.1 | 04.11 |
| 2. Bài con và các hướng | 04.3 | 04.11, 04.13 |
| 3. Thực hiện một lượt, nhận bước, dừng | 04.2, 04.5, 04.6 | 04.12 |
| 4. Cận hội tụ | 04.4, 04.6 | 04.14 |
| 5. Tự điều chỉnh và cận sai số | 04.10 | 04.11, 04.12 |
| 6. Hai hệ Newton có đẳng thức | 04.7, 04.8, 04.9 | 04.12, 04.13 |
| 7. Vận dụng vào mô hình học | 04.6 | 04.12, 04.14, 04.15 |

### Mức nhận biết

::: exercise Bài tập 04.11 (Nhận biết: đúng hay sai)
Xác định đúng hay sai, giải thích hoặc cho phản ví dụ.

- (i) Nếu $g^Td<0$ thì $f(x+d)<f(x)$.
- (ii) Nhân tử $\nu^*$ của bài có đẳng thức phải không âm.
- (iii) Hướng dốc nhất theo $\lVert\cdot\rVert_I$ là $-g$.
- (iv) Mọi hàm tự điều chỉnh đều đạt cực tiểu.
- (v) Với $F$ bậc hai lồi chặt, một bước Newton khả thi đầy đủ từ mọi điểm khả thi cho nghiệm.
- (vi) Trong (5.1), $\Delta\nu$ là nhân tử của nghiệm sau bước đầy đủ.
- (vii) Nếu $\delta=\tfrac12$ và $f$ thỏa giả thiết của Định lý 04.50 thì $f(x)-f^*\le\tfrac18$.
:::

::: hint
Mỗi câu đối chiếu với một kết quả có số hiệu: 04.7, 04.3, 04.15, 04.54, 04.39, 04.44, 04.50.
:::

::: solution
**Đáp án.**

- (i) Sai. Mệnh đề 04.7 chỉ cho $t$ đủ nhỏ; Ví dụ 04.4 có $g^Td_G=-820$ nhưng $f(x^0+d_G)=2040>62$.
- (ii) Sai. Nhận xét 04.3; Ví dụ 04.17 có $\nu^*=-20$.
- (iii) Đúng, với quy ước độ dài $d=\lVert g\rVert_*v$ (Mệnh đề 04.15 với $W=I$).
- (iv) Sai. $-\log s$ tự điều chỉnh, không bị chặn dưới.
- (v) Đúng. Mô hình trùng hàm, nên bước giải đúng (1.2) (Ví dụ 04.18, Bài tập 04.7).
- (vi) Sai. Nhân tử mới là $\nu+\Delta\nu$ (Nhận xét 04.46).
- (vii) Sai. Cận là $-\tfrac12-\log\tfrac12\approx0{,}193$, không phải $\tfrac12\delta^2=\tfrac18$. Phản ví dụ: VD2 tại $s=\tfrac12$ có $\delta=1-s=\tfrac12$ và sai số $\tfrac12+\log2-1\approx0{,}193>\tfrac18$.

**Kiểm tra lại.**

Câu (vii): Hệ quả 04.51 cho cận $\delta^2=\tfrac14$, cũng không phải $\tfrac18$.
:::

### Mức tính toán hoặc chứng minh

::: exercise Bài tập 04.12 (Tính toán: Newton khả thi cho bài tâm giải tích)
Xét $\min F(u)=-\log u_1-\log u_2$ với $u_1+2u_2=4$, trên miền $u>0$.

- (a) Giải (1.2) để tìm $u^*$, $\nu^*$, $F^*$.
- (b) Từ $u^0=(3,\tfrac12)^T$, giải (4.1); tính $u^0+d$ và $\delta_{eq}$.
- (c) Áp dụng Hệ quả 04.52 và so với sai số thật.
:::

::: hint
$\nabla F=(-\tfrac1{u_1},-\tfrac1{u_2})^T$, $\nabla^2F=\operatorname{diag}(u_1^{-2},u_2^{-2})$. $F$ tự điều chỉnh theo Mệnh đề 04.48.
:::

::: solution
**Câu (a).**

$-\tfrac1{u_1}+\nu=0$, $-\tfrac1{u_2}+2\nu=0$ cho $u_1=\tfrac1\nu$, $u_2=\tfrac1{2\nu}$; ràng buộc: $\tfrac2\nu=4$, $\nu^*=\tfrac12$, $u^*=(2,1)^T$, $F^*=-\log2$.

**Câu (b).**

$g=(-\tfrac13,-2)^T$, $H=\operatorname{diag}(\tfrac19,4)$. Hệ: $\tfrac19d_1+\eta=\tfrac13$, $4d_2+2\eta=2$, $d_1+2d_2=0$. Thay $d_1=-2d_2$ vào hàng đầu: $\eta=\tfrac13+\tfrac29d_2$; hàng hai: $4d_2+\tfrac23+\tfrac49d_2=2$, nên $\tfrac{40}9d_2=\tfrac43$, $d_2=\tfrac3{10}$, $d_1=-\tfrac35$, $\eta=\tfrac25$.

Điểm mới $(\tfrac{12}5,\tfrac45)^T$. $\delta_{eq}^2=\tfrac19\cdot\tfrac9{25}+4\cdot\tfrac9{100}=\tfrac25$, $\delta_{eq}\approx0{,}632$.

**Câu (c).**

$F$ tự điều chỉnh, Hessian xác định dương, cực tiểu đạt, $\delta_{eq}<1$: cận $-0{,}632-\log0{,}368\approx0{,}368$. Sai số thật $F(u^0)-F^*=-\log\tfrac32+\log2=\log\tfrac43\approx0{,}288$.

**Kiểm tra lại.**

$A d=-\tfrac35+\tfrac35=0$. $\delta_{eq}\le0{,}68$ nên Hệ quả 04.51 cho thêm cận $\tfrac25=0{,}4$.
:::

::: exercise Bài tập 04.13 (Chứng minh: ma trận khối khi $H$ không xác định dương)
- (a) Với $H=\operatorname{diag}(1,-1)$, $A=[0\ \ 1]$ và $g=(1,1)^T$, chứng minh ma trận của (4.1) khả nghịch và giải (4.1).
- (b) Với cùng $H$, $g$ nhưng $A=[1\ \ 0]$, chứng minh ma trận vẫn khả nghịch, nhưng nghiệm $d$ không cực tiểu hóa mô hình trên $\ker A$.
- (c) Rút ra vai trò của giả thiết "$H$ xác định dương trên $\ker A$" trong Định lý 04.39.
:::

::: hint
Ở (b), $\ker A=\{(0,s)\}$; viết mô hình như hàm của $s$.
:::

::: solution
**Câu (a).**

$\ker A=\{(s,0)\}$ và $d^THd=s^2>0$, nên Định lý 04.39(a) cho khả nghịch. Hệ: $d_1=-1$, $-d_2+\eta=-1$, $d_2=0$, nên $d=(-1,0)^T$, $\eta=-1$.

**Câu (b).**

Ma trận $\begin{bmatrix}1&0&1\\0&-1&0\\1&0&0\end{bmatrix}$ có định thức $1\cdot0-0+1\cdot(0\cdot0-(-1)\cdot1)=1\ne0$. Hệ: $d_1+\eta=-1$, $-d_2=-1$, $d_1=0$, nên $d=(0,1)^T$, $\eta=-1$. Trên $\ker A$, mô hình là $m(0,s)=s-\tfrac12s^2$, không bị chặn dưới; $s=1$ là điểm cực đại.

**Câu (c).**

Khả nghịch chỉ cho nghiệm duy nhất của hệ KKT bài con; tính cực tiểu ở Định lý 04.39(b) và tính giảm ở (c) cần độ cong dương theo các hướng khả thi.

**Kiểm tra lại.**

Ở (b), $g^Td=1>0$: hướng thu được là hướng tăng.
:::

::: exercise Bài tập 04.14 (Chứng minh: giảm gradient không cần tính lồi)
Cho $f$ khả vi trên $\mathbb R^n$, gradient $L$-Lipschitz, bị chặn dưới bởi $f^*$, và $x^{k+1}=x^k-\tfrac1L\nabla f(x^k)$. Chứng minh

$$
\min_{0\le j<k}\lVert\nabla f(x^j)\rVert_2^2\le\frac{2L\bigl(f(x^0)-f^*\bigr)}k .
$$

Giải thích vì sao kết luận này áp dụng được cho Tình huống 04.3 trên một tập bị chặn, nhưng không cho biết $f(x^k)-f^*$.
:::

::: hint
Cộng bổ đề giảm theo $j=0,\ldots,k-1$.
:::

::: solution
**Chứng minh.**

Bổ đề 04.20 không dùng tính lồi: $\frac1{2L}\lVert\nabla f(x^j)\rVert_2^2\le f(x^j)-f(x^{j+1})$. Cộng theo $j$:

$$
\begin{aligned}
\frac k{2L}\min_{j<k}\lVert\nabla f(x^j)\rVert_2^2&\le\frac1{2L}\sum_{j=0}^{k-1}\lVert\nabla f(x^j)\rVert_2^2\\
&\le f(x^0)-f(x^k)\\
&\le f(x^0)-f^* .
\end{aligned}
$$

**Áp dụng.**

Quỹ đạo giảm gradient của Tình huống 04.3 nằm trên đường chéo $a=-b$ với $a_k\in(0,1]$, tức trong hình vuông $\lvert a\rvert,\lvert b\rvert\le1$. Trên hình vuông đó, mỗi hàng của Hessian có tổng trị tuyệt đối không quá $b^2+\lvert2ab-1\rvert\le1+3=4$, nên gradient $4$-Lipschitz trên đoạn nối hai điểm lặp bất kỳ, và lập luận trên áp dụng với $L=4$. Kết luận chỉ nói chuẩn gradient nhỏ; ở Tình huống 04.3, $\lVert\nabla f\rVert_2\to0$ trong khi $f\to\tfrac12\ne f^*$.

**Kiểm tra lại.**

Với VD1, $L=7$, $f(x^0)-f^*=62$, $k=1$: $\lVert\nabla f(x^0)\rVert_2^2=820\le868=2\cdot7\cdot62$.
:::

### Mức vận dụng vào AI

::: exercise Bài tập 04.15 (Vận dụng: thang đo đặc trưng và số điều kiện)
Hồi quy ridge $J(w)=\tfrac12\lVert Xw-y\rVert_2^2+\tfrac\rho2\lVert w\rVert_2^2$ với $\rho=0{,}1$ và $X$ có bốn hàng $(1,1)$, $(1,-1)$, $(-1,1)$, $(-1,-1)$.

- (a) Tính $\nabla^2J$, $L$, $\mu$, $\kappa$.
- (b) Đặc trưng thứ hai được đo lại theo đơn vị nhỏ hơn $10$ lần, nên cột thứ hai của $X$ nhân $10$. Tính lại $\kappa$ và so hệ số $\kappa$ trong cận số bước $\kappa\log(e_0/\varepsilon)$ của Định lý 04.26 với (a).
- (c) Giải thích vì sao Newton không chịu ảnh hưởng của việc đổi thang đo này nếu bỏ chính quy hóa, và vì sao khi có chính quy hóa thì phép đổi thang làm thay đổi chính bài toán.
:::

::: hint
$X^TX$ là ma trận đường chéo. Dữ liệu mới là $\tilde X=X\operatorname{diag}(1,10)$; dùng Mệnh đề 04.31(c) với $T=\operatorname{diag}(1,10)$.
:::

::: solution
**Câu (a).**

$X^TX=\operatorname{diag}(4,4)$, $\nabla^2J=\operatorname{diag}(4{,}1;\,4{,}1)$, $L=\mu=4{,}1$, $\kappa=1$: giảm gradient với bước $\tfrac1L$ tới nghiệm sau một bước.

**Câu (b).**

$X^TX=\operatorname{diag}(4,400)$, $\nabla^2J=\operatorname{diag}(4{,}1;\,400{,}1)$, $\kappa\approx97{,}6$. Hệ số $\kappa$ của cận tăng khoảng $98$ lần; số bước của cận còn phụ thuộc $e_0$, đại lượng cũng đổi theo thang đo.

**Câu (c).**

Không chính quy hóa, dữ liệu mới $\tilde X=X\operatorname{diag}(1,10)$ cho $\tilde X\tilde w=X(T\tilde w)$ với $T=\operatorname{diag}(1,10)$, nên bài mới là $\tilde J(\tilde w)=J(T\tilde w)$. Theo Mệnh đề 04.31(c), các điểm lặp Newton tương ứng qua $w=T\tilde w$, và với hàm bậc hai Newton tới nghiệm sau một bước trong cả hai hệ tọa độ. Có chính quy hóa, $\tfrac\rho2\lVert\tilde w\rVert_2^2$ không phải ảnh của $\tfrac\rho2\lVert w\rVert_2^2$ qua $T$, nên nghiệm của bài mới khác: việc chuẩn hóa đặc trưng trước khi chính quy hóa là một quyết định mô hình.

**Kiểm tra lại.**

$\kappa=400{,}1/4{,}1\approx97{,}6$.
:::

## Hướng dẫn đọc thêm và tài liệu tham khảo

- Boyd, S. và Vandenberghe, L. (2004), *Convex Optimization*, Cambridge University Press. Mục 9.1–9.3 (tr. 457–475) cho Mục 2; mục 9.4 (tr. 475–484) cho Mục 2.5; mục 9.5 (tr. 484–496) cho Mục 3; mục 9.6 (tr. 496–508) cho Mục 6; mục 10.1–10.2 (tr. 521–531) cho Mục 4; mục 10.3 (tr. 531–541) cho Mục 5; mục 10.4 (tr. 542–548) cho Nhận xét 04.40; mục 5.5.3 (tr. 243–244) cho Mục 1.
- Nocedal, J. và Wright, S. J. (2006), *Numerical Optimization*, ấn bản 2, Springer. Mục 3.1 cho Mục 2.3; mục 3.3–3.4 cho Mục 3 và Nhận xét 04.36; mục 16.1–16.2 cho Mục 4 và Nhận xét 04.40.
- Boyd, S. (2009), MIT 6.079 *Introduction to Convex Optimization*, Lecture 16: Unconstrained minimization và Lecture 17: Equality constrained minimization, MIT OpenCourseWare, giấy phép CC BY-NC-SA 4.0. Bài 16 cho Mục 2, 3, 6; bài 17 cho Mục 4, 5 và bài phân bổ tài nguyên ở Mục 4.
- Goodfellow, I., Bengio, Y. và Courville, A. (2016), *Deep Learning*, MIT Press. Mục 4.3 (tr. 82–93), 8.2 (tr. 282–294) và 8.5–8.6 (tr. 306–317) cho Mục 2, Mục 3 và Tình huống 04.3.
- Beck, A. (2017), *First-Order Methods in Optimization*, SIAM, Định lý 10.21: cận $O(1/k)$ của phương pháp gradient, đối chiếu với Định lý 04.22 và 04.24.
- Martens, J. (2010), "Deep learning via Hessian-free optimization", *Proceedings of the 27th International Conference on Machine Learning*: phương pháp Newton không lập Hessian cho mạng sâu, nhắc ở Mục 3.3.
- Bach, F. (2010), "Self-concordant analysis for logistic regression", *Electronic Journal of Statistics* 4, tr. 384–414: biến thể của tính tự điều chỉnh cho mất mát logistic, nhắc ở Nhận xét 04.54.
- Strang, G. (2016), *Introduction to Linear Algebra*, ấn bản 5, Wellesley-Cambridge Press. Mục 4.1 cho quan hệ trực giao giữa không gian hạt nhân và không gian hàng dùng ở Mệnh đề 04.2 và 04.41.
