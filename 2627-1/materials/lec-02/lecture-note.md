# Bài 02 — Các bài toán tối ưu lồi

Bài 01 cho một quy trình chứng nhận các kết luận về nghiệm của một mô hình đã viết sẵn (Thuật toán 01.47) và gọi bài toán cực tiểu một hàm lồi trên một tập lồi là bài toán lồi. Các công cụ đó kiểm tra một tập hay một hàm cho trước. Một mô hình thực tế được cho bằng một danh sách ràng buộc, có thể chứa trị tuyệt đối, cực đại, tích của các đại lượng dương hay biến nhị phân. Câu hỏi trung tâm của Bài 02 là: **khi nào một mô hình như vậy viết được thành một bài toán lồi tương đương thuộc một lớp đã biết, và khi không viết được, bài toán lồi thay thế cho bảo đảm gì về bài toán gốc.** Để trả lời, chúng ta xây dựng ba nhóm đối tượng, bao gồm:

- dạng phổ biến của bài toán tối ưu lồi và phép biến đổi tương đương giữ nghiệm;
- bốn lớp bài toán: quy hoạch tuyến tính, quy hoạch bậc hai, quy hoạch bậc hai có ràng buộc bậc hai và quy hoạch hình học;
- ba phép đổi bài toán khi không có biến đổi tương đương (hàm thay thế, số hạng phạt, nới lỏng) cùng bảo đảm một chiều của từng phép.

## Câu hỏi mở đầu

Một bộ phân loại ảnh dùng một đặc trưng đã chuẩn hóa $u$ và một ngưỡng $\theta$: ảnh được xếp vào nhóm $+1$ khi $u>\theta$ và vào nhóm $-1$ khi $u<\theta$; ảnh có $u=\theta$ được tính là xếp sai. Giả sử bốn ảnh huấn luyện có đặc trưng và nhãn

- $(u_1,y_1)=(-2,-1)$,
- $(u_2,y_2)=(-1,+1)$,
- $(u_3,y_3)=(1,-1)$,
- $(u_4,y_4)=(2,+1)$.

Gọi $m_i=y_i(u_i-\theta)$ là biên có dấu (signed margin, Định nghĩa 01.7) của ảnh $i$; ảnh $i$ được xếp đúng khi và chỉ khi $m_i>0$. Số ảnh bị xếp sai $E(\theta)$ là một hàm bậc thang theo $\theta$. Thay mỗi lỗi bằng mất mát bản lề (hinge loss) $\ell_{\mathrm{hinge}}(m)=\max(0,1-m)$, ta được hàm $H(\theta)=\sum_{i=1}^4\ell_{\mathrm{hinge}}(m_i)$. Hàm $H$ lồi, và $\ell_{\mathrm{hinge}}(m)\ge1$ khi $m\le0$, nên $E(\theta)\le H(\theta)$ với mọi $\theta$.

**Câu hỏi.** Một ngưỡng làm $H$ nhỏ nhất có làm số ảnh bị xếp sai nhỏ nhất không?

Một câu trả lời hấp dẫn là: có, vì $H$ lồi nên mọi cực tiểu địa phương của nó là toàn cục, và $H$ nằm trên $E$ nên kéo $H$ xuống thì $E$ cũng xuống theo. Lập luận này chỉ dùng hai thông tin, tính lồi của $H$ và bất đẳng thức $E\le H$; để kiểm tra nó, cần so sánh tập nghiệm của hai bài toán $\min_\theta H(\theta)$ và $\min_\theta E(\theta)$.

Để trả lời cho một mô hình bất kỳ, chúng ta tách hai loại phép xử lý: biến đổi tương đương, cho nghiệm của bài toán gốc qua một ánh xạ khôi phục, và phép đổi bài toán, cho một bài toán khác mà nghiệm phải được kiểm tra lại trên bài toán gốc.

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Chứng nhận một mô hình là bài toán tối ưu lồi bằng cách kiểm tra từng dòng, và phân biệt kết luận "bài toán lồi" với kết luận "bài toán có nghiệm".
2. Lập một quy hoạch tuyến tính, đưa về dạng chuẩn, chứng nhận nghiệm, và đưa các mục tiêu chứa trị tuyệt đối hoặc cực đại của hàm affine về quy hoạch tuyến tính bằng biến phụ.
3. Nhận dạng quy hoạch bậc hai và quy hoạch bậc hai có ràng buộc bậc hai, giải các bài toán hồi quy có chính quy hóa trên dữ liệu nhỏ, và phân biệt số hạng phạt với ràng buộc chặn chuẩn.
4. Đưa một bài toán chứa tích và tỷ số của các đại lượng dương về quy hoạch hình học, rồi đổi biến logarit để được một bài toán lồi tương đương.
5. Phân biệt biến đổi tương đương với hàm thay thế, số hạng phạt và nới lỏng, và dùng nới lỏng tuyến tính để lấy cận cho giá trị tối ưu.
6. Áp dụng quy trình nhận dạng cho một mô hình học máy mới và chỉ ra kết luận nào mất khi một giả thiết bị vi phạm.

## Kiến thức tiên quyết

Bài 02 dùng các kết quả sau của Bài 00 và Bài 01.

- **Bài toán tối ưu và miền lồng nhau** (Định nghĩa 01.11, Mệnh đề 01.15). Giá trị tối ưu là $p^*=\inf_{x\in C}f_0(x)$, bằng $+\infty$ khi $C$ rỗng. Nếu $C'\subseteq C$ thì $\inf_Cf_0\le\inf_{C'}f_0$, và một nghiệm trên $C$ thuộc $C'$ là nghiệm trên $C'$.
- **Tập lồi** (Định nghĩa 01.17, Mệnh đề 01.18, Mệnh đề 01.19). Tập affine, nửa không gian, hộp và quả cầu Euclid lồi; giao và nghịch ảnh affine của các tập lồi là lồi.
- **Hàm lồi** (Định nghĩa 01.21, Nhận xét 01.22, Mệnh đề 01.24). $f(\vartheta x+(1-\vartheta)x')\le\vartheta f(x)+(1-\vartheta)f(x')$ với $\vartheta\in[0,1]$; lồi chặt (còn gọi là lồi nghiêm ngặt) khi bất đẳng thức chặt với $x\ne x'$, $\vartheta\in(0,1)$. Hàm lồi trên $D$ lồi trên mọi tập con lồi của $D$; tập mức dưới của hàm lồi là tập lồi.
- **Điều kiện bậc nhất, bậc hai và phép toán bảo toàn tính lồi** (Hệ quả 01.26, Định lý 01.29, Định lý 01.30). Nếu $f$ lồi, khả vi trên một tập mở lồi chứa $C$ và $x^*\in C$ thỏa $\nabla f(x^*)^T(x-x^*)\ge0$ với mọi $x\in C$, thì $x^*$ là nghiệm của $\min_{x\in C}f(x)$. Hàm lớp $C^2$ trên tập mở lồi là lồi khi và chỉ khi Hessian nửa xác định dương tại mọi điểm, và lồi chặt nếu Hessian xác định dương tại mọi điểm. Tổng có hệ số không âm, hợp với ánh xạ affine và cực đại từng điểm của các hàm lồi là hàm lồi.
- **Toàn cục, tồn tại, duy nhất** (Định lý 01.32, Hệ quả 01.33, Định lý 01.34, Định lý 01.35, Định lý 01.38).
  - Với miền lồi và mục tiêu lồi, cực tiểu địa phương là toàn cục và tập nghiệm lồi.
  - Mục tiêu lồi chặt có nhiều nhất một nghiệm.
  - Hàm liên tục đạt cực tiểu trên tập không rỗng, đóng, bị chặn, và trên tập không rỗng, đóng nếu hàm cưỡng bức (coercive), tức $f(x)\to+\infty$ khi $\lVert x\rVert_2\to\infty$.
- **Bình phương nhỏ nhất** (least squares; Định nghĩa 01.4, Hệ quả 01.5, Định nghĩa 01.42; Định lý 00.22). Hàm $J(w)=\lVert Xw-y\rVert_2^2$ có Hessian $2X^TX\succeq0$; $w^*$ là nghiệm khi và chỉ khi $X^TXw^*=X^Ty$. Hạng $\lambda\lVert w\rVert_2^2$ của Bài 02 là hạng $\tfrac\mu2\lVert w\rVert_2^2$ của Định nghĩa 01.42 với $\mu=2\lambda$.
- **Mất mát phân loại** (Định nghĩa 01.7, Mệnh đề 01.8(c), Ví dụ 01.11(b), Ví dụ 01.15(c), Bài tập 01.18). Biên có dấu của mẫu $i$ là $y_i$ nhân điểm số; hàm $m\mapsto\log(1+e^{-m})$ có đạo hàm bậc hai $e^m/(1+e^m)^2>0$; tập $\{w\mid y_iu_i^Tw\ge1\ \forall i\}$ của máy vector hỗ trợ (support vector machine, SVM) lề cứng là giao của các nửa không gian; mất mát bản lề $\ell_{\mathrm{hinge}}(m)=\max(0,1-m)$ lồi; khi không có hệ số chặn, tổng mất mát bản lề cộng $\tfrac\mu2\lVert w\rVert_2^2$ có đúng một nghiệm.
- **Đại số tuyến tính** (Mệnh đề 00.18, Mệnh đề 00.5). Với $Q$ đối xứng có giá trị riêng nhỏ nhất $\lambda_{\min}$, $v^TQv\ge\lambda_{\min}\lVert v\rVert_2^2$; bất đẳng thức Cauchy–Schwarz $\lvert v^Tv'\rvert\le\lVert v\rVert_2\lVert v'\rVert_2$ và bất đẳng thức tam giác.
- **Bất đẳng thức sơ cấp và logarit.** Bất đẳng thức trung bình cộng – trung bình nhân cho ba số dương, $\tfrac13(s_1+s_2+s_3)\ge(s_1s_2s_3)^{1/3}$, có dấu bằng khi ba số bằng nhau. Ký hiệu $\log$ là logarit tự nhiên, tăng chặt trên $(0,\infty)$.

**Câu hỏi ôn nhanh.**

1. Xác định hàm $f(x)=\max(x-2,\,2-x)$ có lồi trên $\mathbb R$ không, và nêu kết quả dùng.
2. Cho $Q=\begin{bmatrix}2&1\\1&2\end{bmatrix}$. Tính các giá trị riêng của $Q$ và xác định $Q$ có xác định dương không.
3. So sánh $\min_{x\in[0,2]}x^2$ với $\min_{x\in[1,2]}x^2$, và nêu kết quả dùng.

::: hint Lời giải câu hỏi ôn nhanh
1. Hàm $f$ là cực đại từng điểm của hai hàm affine, nên lồi theo Định lý 01.30(c); $f(x)=\lvert x-2\rvert$.
2. Đa thức đặc trưng $\det(Q-sI)=(2-s)^2-1$ có hai nghiệm $1$ và $3$, đều dương, nên $Q\succ0$, và $v^TQv\ge\lVert v\rVert_2^2$ theo Mệnh đề 00.18.
3. Hai giá trị là $0$ và $1$, và $0\le1$: thu hẹp miền không làm giá trị tối ưu giảm (Mệnh đề 01.15(a)).
:::

## 1. Thiết lập bài toán

Một mô hình tối ưu của Bài 02 gồm các thành phần sau.

1. **Dữ kiện.** Các đại lượng cố định: dữ liệu $(u_i,y_i)$, giá, thành phần, giới hạn tài nguyên, hệ số của các hàm.
2. **Biến quyết định.** $x\in\mathbb R^n$, có thể kèm điều kiện dấu ($x\ge0$, $x>0$) hoặc điều kiện nhị phân ($x\in\{0,1\}^n$).
3. **Mô hình gốc.** Một hàm mục tiêu và một danh sách ràng buộc, có thể chứa trị tuyệt đối, cực đại, tích và tỷ số của các đại lượng dương, phép đếm.
4. **Câu hỏi nhận dạng.** Mô hình gốc có viết được thành một bài toán tương đương thuộc một trong bốn lớp đã biết không, và ánh xạ nào đưa nghiệm của bài toán mới về nghiệm của mô hình gốc.
5. **Câu hỏi thay thế.** Khi không có cách viết tương đương, bài toán lồi nào được giải thay, và giá trị hay nghiệm của nó cho bảo đảm gì về mô hình gốc.
6. **Đối tượng so sánh.** Bốn phép xử lý (biến đổi tương đương, hàm thay thế, số hạng phạt thay ràng buộc, nới lỏng), so trên hai bộ dữ liệu chung, một bài toán chọn gói nhị phân và một bài toán giới hạn số đặc trưng.

## 2. Ký hiệu và giả thiết

Vô hướng và vector viết chữ thường, ma trận viết chữ hoa, không in đậm; mọi vector là vector cột. Bất đẳng thức giữa hai vector, như $Gx\le h$, hiểu theo từng tọa độ; $x>0$ nghĩa là mọi tọa độ dương; $\succeq$ và $\succ$ chỉ dùng cho ma trận. Ký hiệu chỉ dùng trong một ví dụ, một chứng minh hoặc một bài tập được giới thiệu tại chỗ. Như Boyd và Vandenberghe (2004), bài toán tổng quát có $n$ biến, $m$ ràng buộc bất đẳng thức và $p$ ràng buộc đẳng thức; dữ liệu có $N$ mẫu.

| Ký hiệu | Ý nghĩa | Phạm vi, giả thiết |
|---|---|---|
| $x\in\mathbb R^n$, $x^*$ | biến quyết định, một nghiệm | — |
| $D$; $f_0$; $f_i$, $i=1,\ldots,m$ | miền của bài toán; hàm mục tiêu; hàm ràng buộc $f_i(x)\le0$ | — |
| $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$ | ma trận và vế phải của ràng buộc đẳng thức $Ax=b$ | — |
| $C$; $p^*$; $S^*$ | tập khả thi; giá trị tối ưu $\inf_{x\in C}f_0(x)$; tập nghiệm | $p^*\in\mathbb R\cup\{-\infty,+\infty\}$ |
| $f_{\mathrm P}$, $f_{\mathrm Q}$; $\varphi$, $\psi$, $T$ | mục tiêu của bài toán gốc $(\mathrm P)$ và bài toán mới $(\mathrm Q)$; ánh xạ đưa sang, ánh xạ khôi phục, hàm tăng chặt đổi giá trị | §4.3 |
| $c$; $G$, $h$; $\zeta$ | vector chi phí; ma trận và vế phải của ràng buộc $Gx\le h$; biến của bài toán $\min\tilde c^T\zeta$ với $B\zeta=\tilde b$, $\zeta\ge0$ | quy hoạch tuyến tính |
| $\mu$ | hệ số $\mu\ge0$ nhân với các ràng buộc khi cộng chúng | — |
| $P$, $q$, $\rho_0$; $P_i$, $q_i$, $\rho_i$ | dữ liệu của mục tiêu $\tfrac12x^TPx+q^Tx+\rho_0$; của ràng buộc $\tfrac12x^TP_ix+q_i^Tx+\rho_i\le0$ | $P$, $P_i$ đối xứng |
| $u_i$, $y_i$ | đặc trưng và đầu ra hoặc nhãn của mẫu $i$ | $y_i\in\mathbb R$ hoặc $\{-1,+1\}$ |
| $X\in\mathbb R^{N\times d}$; $w\in\mathbb R^d$; $r=Xw-y$ | ma trận thiết kế; vector tham số; vector phần dư | hồi quy (§5–§6): $d$ là số cột của $X$, kể cả cột hằng |
| $w_1$, $w_0$ | hệ số góc và hệ số chặn khi $\hat y=w_1u+w_0$ | $w=(w_1,w_0)$, hàng $i$ của $X$ là $(u_i,1)$ |
| $(w,w_0)$ | tham số của bộ phân loại tuyến tính với điểm số $w^Tu+w_0$ | phân loại (§8–§10) và hồi quy có hệ số chặn tách riêng (§10.1, §11): $w\in\mathbb R^d$ không chứa $w_0$, $d$ là số đặc trưng |
| $J(w)=\lVert Xw-y\rVert_2^2$ | tổng bình phương phần dư | như Định nghĩa 01.4 |
| $L$, $R$, $\lambda$ | hàm sai số, hàm phạt, hệ số phạt | $\lambda\ge0$ |
| $\lVert\cdot\rVert_1$, $\lVert\cdot\rVert_2$, $\lVert\cdot\rVert_\infty$, $\lVert\cdot\rVert_0$ | tổng trị tuyệt đối, chuẩn Euclid, trị tuyệt đối lớn nhất, số tọa độ khác $0$ | $\lVert\cdot\rVert_0$ không là chuẩn |
| $\eta$; $s_0$ | độ cong và tâm của bài toán một biến $\eta(s-s_0)^2+\lambda\lvert s\rvert$ | §6.3–§6.4, §10.1 |
| $\mathbf 1$ | vector có mọi tọa độ bằng $1$ (in đậm để phân biệt với số $1$) | kích thước theo ngữ cảnh |
| $g$; $f$; $z$ | $g(x)=c\,x_1^{\alpha_1}\cdots x_n^{\alpha_n}$ với $c>0$; tổng hữu hạn các hàm dạng $g$; $z=\log x$ theo từng tọa độ | §7, $x>0$ |
| $\theta$; $m_i$ | ngưỡng; biên có dấu $y_i(u_i-\theta)$, hoặc $y_i(w^Tu_i+w_0)$ | $\theta\in\mathbb R$ |
| $\ell_{01}$; $\ell_{\mathrm{hinge}}$; $\ell$ | $\ell_{01}(m)=1$ khi $m\le0$, $0$ khi $m>0$; $\max(0,1-m)$; một hàm lồi $\ell\ge\ell_{01}$ | — |
| $E$; $H$; $H_\ell$; $H_\lambda$ | $\sum_i\ell_{01}(m_i)$; $\sum_i\ell_{\mathrm{hinge}}(m_i)$; $\sum_i\ell(m_i)$; $\tfrac\lambda2\lVert w\rVert_2^2+H$ | — |
| $\mathcal F\subseteq\tilde{\mathcal F}$; $p^*_{\mathcal F}$, $p^*_{\tilde{\mathcal F}}$ | hai tập khả thi lồng nhau của cùng một mục tiêu; hai giá trị tối ưu | — |

Giả thiết về dữ liệu gồm:

- $X$ và $y$ tùy ý; hạng của $X$ chỉ được giả thiết khi kết quả nêu rõ;
- nhãn $y_i\in\{-1,+1\}$ trong các bài toán phân loại;
- khi cực tiểu $H_\lambda$, mỗi nhãn có ít nhất một mẫu và $\lambda>0$.

## 3. Ví dụ xuyên suốt: dữ liệu chung

Hai bộ dữ liệu được dùng ở nhiều mục của bài: năm quan sát hồi quy một đặc trưng (bốn điểm thẳng hàng và một điểm lệch) và bốn ảnh của Câu hỏi mở đầu.

![Năm điểm dữ liệu (−2, −2), (−1, −1), (0, 3), (1, 1), (2, 2), đường thử y mũ bằng u cộng 1 và năm đoạn thẳng đứng biểu diễn phần dư: đoạn tại u bằng 0 dài 2, các đoạn khác dài 1.](img/lec-02/lp-data.svg)

![Bốn điểm trên trục đặc trưng u tại −2, −1, 1, 2 với nhãn −1, +1, −1, +1, vẽ bằng hai ký hiệu xen kẽ.](img/lec-02/ap-data.svg)

Trên hình thứ nhất, độ dài các đoạn thẳng đứng là $\lvert r_i\rvert$. Trên hình thứ hai, mọi ngưỡng chia trục thành hai nửa, còn hai nhóm đan xen, nên không ngưỡng nào xếp đúng cả bốn ảnh. Ví dụ sau cố định dữ kiện số và các tổng dùng lại.

::: example Ví dụ 02.1 (Dữ liệu chung)
**(a) Năm quan sát hồi quy.** Giả sử năm quan sát đã chuẩn hóa là

| $u_i$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|---:|---:|---:|---:|---:|
| $y_i$ | $-2$ | $-1$ | $3$ | $1$ | $2$ |

Mô hình dự đoán $\hat y_i=w_1u_i+w_0$. Ma trận thiết kế $X\in\mathbb R^{5\times2}$ có hàng $i$ là $(u_i,1)$, vector tham số là $w=(w_1,w_0)$, và phần dư $r=Xw-y$ có tọa độ $r_i=w_1u_i+w_0-y_i$. Các tổng dùng lại là
$$
\begin{aligned}
\textstyle\sum_iu_i&=0, & \textstyle\sum_iu_i^2&=10,\\
\textstyle\sum_iy_i&=3, & \textstyle\sum_iu_iy_i&=10,\\
\textstyle\sum_iy_i^2&=19,
\end{aligned}
$$
nên $X^TX=\operatorname{diag}(10,5)$, $X^Ty=(10,3)$ và $y^Ty=19$. Với $\delta=w_1-1$, phần dư là
$$
\begin{aligned}
r_1&=w_0-2\delta, & r_2&=w_0-\delta,\\
r_3&=w_0-3, & r_4&=w_0+\delta,\\
r_5&=w_0+2\delta .
\end{aligned}
$$

**(b) Bốn ảnh.** Bốn ảnh của Câu hỏi mở đầu có $u=(-2,-1,1,2)$ và $y=(-1,+1,-1,+1)$. Với ngưỡng $\theta$, biên có dấu của ảnh $i$ là $m_i=y_i(u_i-\theta)$, và ảnh $i$ bị tính là lỗi khi $m_i\le0$.

**Kiểm tra lại.** Tổng $\sum_iu_iy_i=4+1+0+1+4=10$. Đường thử $\hat y=u+1$ có $r=(1,1,-2,1,1)$, nên $\lVert r\rVert_1=6$, $\lVert r\rVert_\infty=2$ và $\lVert r\rVert_2^2=8$. Ngưỡng $\theta=0$ cho $m=(2,-1,-1,2)$: ảnh $2$ và ảnh $3$ bị xếp sai.
:::

## 4. Bài toán tối ưu lồi và biến đổi tương đương

Xét bài toán hai biến

$$
\begin{aligned}
&\underset{x\in\mathbb R^2}{\operatorname{minimize}}\quad x_1^2+x_2^2\\
&\text{subject to}\\
&\quad\frac{x_1}{1+x_2^2}\le0,\\
&\quad(x_1+x_2)^2=0 .
\end{aligned}
$$

Tập khả thi chỉ là một nửa đường thẳng: điểm $(-1,1)$ thỏa cả hai ràng buộc, điểm $(1,-1)$ thì không. Do đó, chúng ta cần một định nghĩa "bài toán lồi" kiểm tra được trên từng dòng của mô hình. Chúng ta cũng cần biết chính xác tính lồi bảo đảm điều gì, vì bài toán $\min_{x>0}1/x$ có hàm mục tiêu lồi trên một khoảng nhưng không có nghiệm.

### 4.1. Nhiều biểu diễn của cùng một tập khả thi

Hai ràng buộc trên là cách viết phức tạp của hai điều kiện affine.

![Ba khung: hai ràng buộc x1/(1 + x2 bình phương) ≤ 0 và (x1 + x2) bình phương = 0; dạng affine tương đương x1 ≤ 0, x1 + x2 = 0; tập khả thi chung là tia từ (0, 0) qua (−1, 1). Dải dưới nhắc ba phép biến đổi khác: thêm biến bù, khử đẳng thức, chuyển sang tập trên đồ thị.](img/lec-02/reformulation-equivalence.svg)

Hai biểu diễn trên hình mô tả cùng một tia khả thi, nhưng chỉ dạng affine ở khung giữa cho thấy ngay tập đó lồi.

Một cách trực quan, một bài toán nên được gọi là lồi khi mỗi dòng của nó đã mang chứng nhận riêng, gồm mục tiêu lồi, bất đẳng thức dạng "hàm lồi không vượt quá $0$" và đẳng thức affine. Khi đó, tính lồi của toàn bài toán suy ra từ các chứng nhận từng dòng. Để làm rõ cách viết lại một dòng, xem ví dụ sau.

::: example Ví dụ 02.2 (Viết lại hai ràng buộc thành dạng affine)
**Dữ kiện.** Bài toán trên là $\min_{x\in\mathbb R^2}x_1^2+x_2^2$ với hai ràng buộc $\frac{x_1}{1+x_2^2}\le0$ và $(x_1+x_2)^2=0$.

Gọi $C_1$ là tập khả thi theo biểu diễn ban đầu và $C_2=\{x\in\mathbb R^2\mid x_1\le0,\ x_1+x_2=0\}$.

**Hai biểu diễn cho cùng một tập.**

- Với mọi $x\in\mathbb R^2$, mẫu số $1+x_2^2\ge1>0$, nên chia cho nó không đổi chiều bất đẳng thức: $x_1/(1+x_2^2)\le0$ khi và chỉ khi $x_1\le0$.
- Một số thực có bình phương bằng $0$ khi và chỉ khi nó bằng $0$, nên $(x_1+x_2)^2=0$ khi và chỉ khi $x_1+x_2=0$.

Hai tương đương cho $C_1=C_2=\{(-s,s)\mid s\ge0\}$.

**Nghiệm.** Trên $C_2$, mục tiêu bằng $(-s)^2+s^2=2s^2$ với $s\ge0$, nhỏ nhất tại $s=0$. Nghiệm là $x^*=(0,0)$ và $p^*=0$.

**Kiểm tra lại.**

- Điểm $(-1,1)$: ràng buộc thứ nhất cho $-1/2\le0$, ràng buộc thứ hai cho $0^2=0$, nên khả thi, với giá trị mục tiêu $2>0$.
- Điểm $(1,-1)$: ràng buộc thứ nhất cho $1/2>0$, không khả thi theo cả hai biểu diễn, vì $x_1=1>0$.
:::

### 4.2. Dạng phổ biến của bài toán tối ưu lồi

Ví dụ 02.2 giải được vì sau khi viết lại, mỗi ràng buộc có dạng mà Bài 01 đã chứng nhận được. Dạng đó được cố định theo định nghĩa sau.

::: definition Định nghĩa 02.1 (Bài toán tối ưu lồi dạng phổ biến)
Cho tập lồi $D\subseteq\mathbb R^n$, gọi là miền của bài toán; các hàm lồi $f_0,f_1,\ldots,f_m:D\to\mathbb R$; ma trận $A\in\mathbb R^{p\times n}$ và vector $b\in\mathbb R^p$. *Bài toán tối ưu lồi* (convex optimization problem) ở *dạng phổ biến* là

$$
\begin{aligned}
&\underset{x\in D}{\operatorname{minimize}}\ f_0(x)\\
&\text{subject to}\\
&\ \ f_i(x)\le0,\ i=1,\ldots,m,\\
&\ \ Ax=b,
\end{aligned}
\tag{4.1}
$$

với tập khả thi $C=\{x\in D\mid f_i(x)\le0,\ i=1,\ldots,m;\ Ax=b\}$. Có thể $m=0$ (không có bất đẳng thức) hoặc $p=0$ (không có đẳng thức).

Tổng quát hơn, bài toán $\min_{x\in C}f_0(x)$ với $C$ là tập lồi và $f_0$ lồi trên $C$ được gọi là bài toán tối ưu lồi.
:::

Chiều "$\le0$" của bất đẳng thức và tính affine của đẳng thức là một phần của định nghĩa. Định nghĩa 02.1 là trường hợp riêng của Định nghĩa 01.11, trong đó các $f_i$ lồi và các hàm đẳng thức có dạng $a_j^Tx-b_j$, với $a_j^T$ là hàng $j$ của $A$. Boyd và Vandenberghe (2004, §4.2.1, tr. 136–137) gọi (4.1) là dạng chuẩn (standard form); trong bài này, "dạng chuẩn" chỉ dùng cho quy hoạch tuyến tính và quy hoạch hình học.

Bài toán đầu mục có tập khả thi lồi nhưng không ở dạng (4.1): Hessian của $x_1/(1+x_2^2)$ có định thức $-4x_2^2/(1+x_2^2)^4<0$ khi $x_2\ne0$, nên hàm này không lồi (Định lý 01.29(a)), và $(x_1+x_2)^2$ không affine.

Mệnh đề sau khẳng định kiểm tra từng dòng là đủ.

::: proposition Mệnh đề 02.2 (Tập khả thi của dạng phổ biến là tập lồi) — chứng minh đầy đủ
**Giả thiết.** Bài toán (4.1) thỏa Định nghĩa 02.1.

**Kết luận.** Tập khả thi $C$ lồi, và (4.1) là một bài toán tối ưu lồi theo nghĩa tổng quát: cực tiểu hàm lồi $f_0$ trên tập lồi $C$.
:::

::: proof Chứng minh Mệnh đề 02.2
**Lộ trình.** Viết $C$ thành giao của các tập mức dưới và một tập affine, rồi dùng tính lồi của từng tập.

**Bước 1 (từng ràng buộc cho một tập lồi).** Với mỗi $i=1,\ldots,m$, đặt $C_i=\{x\in D\mid f_i(x)\le0\}$. Vì $D$ lồi và $f_i$ lồi trên $D$, Mệnh đề 01.24 áp dụng với mức $0$ cho $C_i$ lồi. Tập $\mathcal H=\{x\in\mathbb R^n\mid Ax=b\}$ là tập affine, lồi theo Mệnh đề 01.18(b).

**Bước 2 (giao).** Theo định nghĩa của $C$,

$$
C=D\cap C_1\cap\cdots\cap C_m\cap\mathcal H,
$$

là giao của hữu hạn tập lồi, nên lồi theo Mệnh đề 01.19(a).

**Bước 3 (mục tiêu).** Hàm $f_0$ lồi trên $D$, nên lồi trên tập con lồi $C$ theo Nhận xét 01.22: bất đẳng thức của Định nghĩa 01.21 đúng cho mọi cặp điểm của $D$ thì đúng cho mọi cặp điểm của $C$. $\square$
:::

Theo Mệnh đề 02.2, câu hỏi về cả tập khả thi được thay bằng $m+1$ câu hỏi về từng hàm, mỗi câu trả lời được bằng Định nghĩa 01.21, Định lý 01.29 hoặc Định lý 01.30.

::: remark Nhận xét 02.3 (Khi bỏ giả thiết: biểu diễn, chiều bất đẳng thức, đẳng thức không affine)
Dạng phổ biến gọi tên một cách viết mô hình. Ba nhầm lẫn thường gặp là:

1. kết luận "tập khả thi không lồi" từ việc một $f_i$ không lồi: bài toán đầu mục là phản ví dụ;
2. đổi chiều bất đẳng thức: $\lVert x\rVert_2^2\le1$ cho hình tròn, lồi; $\lVert x\rVert_2^2\ge1$ cho phần ngoài hình tròn, không lồi, vì $(1,0)$ và $(-1,0)$ thuộc tập mà trung điểm $(0,0)$ không thuộc;
3. coi một đẳng thức của hàm lồi là chấp nhận được: $\lVert x\rVert_2^2=1$ cho đường tròn, không lồi vì cùng cặp điểm trên.
:::

Khi một bài toán ở dạng (4.1), các kết luận toàn cục của Bài 01 áp dụng ngay. Hệ quả sau tập hợp chúng.

::: corollary Hệ quả 02.4 (Các bảo đảm của tính lồi cho dạng phổ biến) — chứng minh đầy đủ
**Giả thiết.** Bài toán (4.1) thỏa Định nghĩa 02.1, với tập khả thi $C$ và giá trị tối ưu $p^*$.

**Kết luận.** (a) Mọi cực tiểu địa phương của $f_0$ trên $C$ là cực tiểu toàn cục.

(b) Tập nghiệm $S^*=\{x\in C\mid f_0(x)=p^*\}$ là tập lồi, có thể rỗng.

(c) Nếu $f_0$ lồi và khả vi trên một tập mở lồi chứa $C$ và $x^*\in C$ thỏa

$$
\begin{aligned}
&\nabla f_0(x^*)^T(x-x^*)\ge0\\
&\forall x\in C,
\end{aligned}
\tag{4.2}
$$

thì $x^*$ là nghiệm của (4.1).
:::

::: proof Chứng minh Hệ quả 02.4
**Lộ trình.** Mệnh đề 02.2 đặt bài toán vào giả thiết của ba kết quả của Bài 01.

Theo Mệnh đề 02.2, $C$ lồi và $f_0$ lồi trên $C$. Do đó, ba phần của hệ quả là ba kết quả của Bài 01.

- (a) là Định lý 01.32 áp dụng cho $f_0$ trên $C$.
- (b) là Hệ quả 01.33.
- (c) là Hệ quả 01.26 với $f=f_0$. $\square$
:::

Phần (a) và (b) không cần khả vi; phần (c) cần giả thiết của Hệ quả 01.26. Hệ quả không khẳng định nghiệm tồn tại hay duy nhất; hai kết luận đó cần Định lý 01.34, 01.35 hoặc 01.38. Khi $C$ lồi và $f_0$ khả vi, (4.2) cũng là điều kiện cần; chứng minh nằm ngoài phạm vi học phần (Boyd và Vandenberghe (2004), §4.2.3, tr. 139–140).

### 4.3. Biến đổi tương đương

Phép viết lại trong Ví dụ 02.2 giữ nguyên tập khả thi và không gian biến. Nhiều mô hình cần thêm biến, đổi biến hoặc lấy logarit mục tiêu; khi đó bài toán mới có biến trong $\mathbb R^{n'}$, với $n'$ có thể khác $n$.

Về mặt ý tưởng, hai bài toán tương đương khi mỗi điểm khả thi của bài toán thứ nhất cho một điểm khả thi của bài toán thứ hai có giá trị mục tiêu không lớn hơn, và ngược lại. Cách sinh điểm mới cần được chỉ rõ. Chẳng hạn, xét bài toán $\min_x\lvert x-2\rvert$ và bài toán $\min_{(x,t)}t$ với $t\ge x-2$, $t\ge2-x$.

- Từ $x$, chọn $t=\lvert x-2\rvert$.
- Từ $(x,t)$ khả thi, giữ lại $x$, và $\lvert x-2\rvert\le t$.

Để làm rõ cách hai điểm khả thi tương ứng với nhau, xem định nghĩa sau.

::: definition Định nghĩa 02.5 (Biến đổi tương đương)
Cho hai bài toán $(\mathrm P)$: $\min_{x\in C}f_{\mathrm P}(x)$ với $C\subseteq\mathbb R^n$, và $(\mathrm Q)$: $\min_{\zeta\in C'}f_{\mathrm Q}(\zeta)$ với $C'\subseteq\mathbb R^{n'}$. Bài toán $(\mathrm Q)$ là một *biến đổi tương đương* (equivalent reformulation) của $(\mathrm P)$ nếu có ánh xạ $\varphi:C\to C'$, ánh xạ $\psi:C'\to C$ và một hàm tăng chặt $T$ xác định trên một khoảng chứa các giá trị $f_{\mathrm P}(x)$, $x\in C$, sao cho

$$
\begin{aligned}
&f_{\mathrm Q}(\varphi(x))\le T\bigl(f_{\mathrm P}(x)\bigr)\\
&\quad\forall x\in C,\\
&T\bigl(f_{\mathrm P}(\psi(\zeta))\bigr)\le f_{\mathrm Q}(\zeta)\\
&\quad\forall\zeta\in C'.
\end{aligned}
\tag{4.3}
$$

Ánh xạ $\varphi$ đưa phương án gốc sang bài toán mới; ánh xạ $\psi$ khôi phục phương án gốc từ phương án của bài toán mới. Mọi biến đổi tương đương của bài dùng $T(s)=s$, trừ các phép đổi biến logarit, dùng $T=\log$.
:::

Trong định nghĩa trên, $\varphi$ và $\psi$ không cần là nghịch đảo của nhau. Với ví dụ trước định nghĩa, ta có $\varphi(x)=(x,\lvert x-2\rvert)$, $\psi(x,t)=x$, $T(s)=s$.

- Điều kiện thứ nhất của (4.3) là một đẳng thức.
- Điều kiện thứ hai là $\lvert x-2\rvert\le t$.

Ánh xạ hợp $\varphi(\psi(x,t))=(x,\lvert x-2\rvert)$ có thể khác $(x,t)$. Nghiệm chuyển được qua lại giữa hai bài toán theo mệnh đề sau.

::: proposition Mệnh đề 02.6 (Biến đổi tương đương giữ nghiệm) — chứng minh đầy đủ
**Giả thiết.** $(\mathrm Q)$ là biến đổi tương đương của $(\mathrm P)$ theo Định nghĩa 02.5, với $\varphi$, $\psi$, $T$.

**Kết luận.**

- (a) Nếu $x^*$ là nghiệm của $(\mathrm P)$ thì $\varphi(x^*)$ là nghiệm của $(\mathrm Q)$ và $f_{\mathrm Q}(\varphi(x^*))=T(f_{\mathrm P}(x^*))$.
- (b) Nếu $\zeta^*$ là nghiệm của $(\mathrm Q)$ thì $\psi(\zeta^*)$ là nghiệm của $(\mathrm P)$.
- (c) Khi $T(s)=s$, hai bài toán có cùng giá trị tối ưu, kể cả khi giá trị đó là $\pm\infty$.
:::

::: proof Chứng minh Mệnh đề 02.6
**Lộ trình.** Ghép hai bất đẳng thức của (4.3) với tính tối ưu của nghiệm đã có; tính tăng chặt của $T$ cho phép bỏ $T$ ở hai vế.

**Bước 1 (phần (a)).** Lấy $\zeta\in C'$ tùy ý.

- Vì $\psi(\zeta)\in C$ và $x^*$ là nghiệm, $f_{\mathrm P}(x^*)\le f_{\mathrm P}(\psi(\zeta))$.
- Vì $T$ tăng, $T(f_{\mathrm P}(x^*))\le T(f_{\mathrm P}(\psi(\zeta)))$.
- Theo vế phải của (4.3), $T(f_{\mathrm P}(\psi(\zeta)))\le f_{\mathrm Q}(\zeta)$.
- Theo vế trái của (4.3) tại $x^*$, $f_{\mathrm Q}(\varphi(x^*))\le T(f_{\mathrm P}(x^*))$.

Ghép bốn bất đẳng thức trên, ta có

$$
\begin{aligned}
f_{\mathrm Q}(\varphi(x^*))&\le T(f_{\mathrm P}(x^*))\\
&\le f_{\mathrm Q}(\zeta)\qquad\forall\zeta\in C'.
\end{aligned}
$$

Vì $\varphi(x^*)\in C'$, đây là định nghĩa nghiệm của $(\mathrm Q)$. Chọn $\zeta=\varphi(x^*)$ trong chuỗi trên cho $f_{\mathrm Q}(\varphi(x^*))=T(f_{\mathrm P}(x^*))$.

**Bước 2 (phần (b)).** Lấy $x\in C$ tùy ý. Áp dụng lần lượt vế phải của (4.3) tại $\zeta^*$, tính tối ưu của $\zeta^*$ tại điểm $\varphi(x)\in C'$, rồi vế trái của (4.3) tại $x$, ta có

$$
\begin{aligned}
T\bigl(f_{\mathrm P}(\psi(\zeta^*))\bigr)&\le f_{\mathrm Q}(\zeta^*)\\
&\le f_{\mathrm Q}(\varphi(x))\\
&\le T\bigl(f_{\mathrm P}(x)\bigr).
\end{aligned}
$$

Vì $T$ tăng chặt, $T(s_1)\le T(s_2)$ kéo theo $s_1\le s_2$: nếu $s_1>s_2$ thì $T(s_1)>T(s_2)$. Vậy $f_{\mathrm P}(\psi(\zeta^*))\le f_{\mathrm P}(x)$ với mọi $x\in C$, và $\psi(\zeta^*)\in C$ là nghiệm của $(\mathrm P)$.

**Bước 3 (phần (c)).** Với $T(s)=s$, ta có hai chiều sau:

- với mọi $x\in C$, $p^*_{\mathrm Q}\le f_{\mathrm Q}(\varphi(x))\le f_{\mathrm P}(x)$, nên $p^*_{\mathrm Q}$ là một cận dưới của $f_{\mathrm P}$ trên $C$ và $p^*_{\mathrm Q}\le p^*_{\mathrm P}$;
- đối xứng, với mọi $\zeta\in C'$, $p^*_{\mathrm P}\le f_{\mathrm P}(\psi(\zeta))\le f_{\mathrm Q}(\zeta)$, nên $p^*_{\mathrm P}\le p^*_{\mathrm Q}$.

Nếu $C$ rỗng thì $C'$ cũng rỗng, vì $\psi$ ánh xạ $C'$ vào $C$; khi đó cả hai giá trị bằng $+\infty$. $\square$
:::

Nếu $(\mathrm P)$ có nghiệm, phần (a) cho $p^*_{\mathrm Q}=T(p^*_{\mathrm P})$.

::: remark Nhận xét 02.7 (Tương đương là tính chất của cặp ánh xạ)
Nếu cả $(\mathrm P)$ lẫn $(\mathrm Q)$ đều có nghiệm $x^*$, $\zeta^*$ với giá trị hữu hạn $p^*$, $q^*$, thì các ánh xạ hằng $\varphi\equiv\zeta^*$, $\psi\equiv x^*$ cùng $T(s)=s+q^*-p^*$ thỏa (4.3). Thật vậy, $f_{\mathrm Q}(\zeta^*)=q^*\le f_{\mathrm P}(x)+q^*-p^*$ vì $f_{\mathrm P}(x)\ge p^*$, và $T(f_{\mathrm P}(x^*))=q^*\le f_{\mathrm Q}(\zeta)$. Cặp ánh xạ này mã hóa sẵn nghiệm, nên không cho thông tin gì.

Trong bài, "tương đương" luôn được hiểu là tương đương qua $\varphi$, $\psi$, $T$ cho bằng công thức dựng từ cấu trúc bài toán, không dùng nghiệm.

Một phép thay mục tiêu bằng một hàm khác, như cộng số hạng phạt hay thay mất mát, không có ánh xạ khôi phục cho bằng công thức: nghiệm của bài toán mới nói chung không là nghiệm của bài toán gốc.
:::

::: exercise Bài tập 02.1 (Biến đổi tương đương bằng đổi biến logarit)
Cho $(\mathrm P)$: $\min_{x>0}\ x+1/x$ và $(\mathrm Q)$: $\min_{z\in\mathbb R}\ \log(e^z+e^{-z})$.

(a) Chỉ ra $\varphi$, $\psi$ và một hàm tăng chặt $T$ cho bằng công thức thỏa (4.3), với $f_{\mathrm P}$, $f_{\mathrm Q}$ là hai hàm mục tiêu.

(b) Giải $(\mathrm Q)$ và suy ra nghiệm, giá trị tối ưu của $(\mathrm P)$ bằng Mệnh đề 02.6.
:::

::: hint
Đặt $z=\log x$ và lấy $T=\log$, tăng chặt trên $(0,\infty)$.
:::

::: solution
**(a)** $\varphi(x)=\log x$, $\psi(z)=e^z$, $T=\log$.

- Với $x>0$: $f_{\mathrm Q}(\varphi(x))=\log(x+1/x)=T(f_{\mathrm P}(x))$.
- Với $z\in\mathbb R$: $T(f_{\mathrm P}(\psi(z)))=\log(e^z+e^{-z})=f_{\mathrm Q}(z)$.

Cả hai bất đẳng thức của (4.3) đúng với dấu bằng.

**(b) Giải $(\mathrm Q)$.** $f_{\mathrm Q}'(z)=(e^z-e^{-z})/(e^z+e^{-z})$ bằng $0$ khi và chỉ khi $z=0$, và $f_{\mathrm Q}''(z)=1-f_{\mathrm Q}'(z)^2>0$. Do đó $f_{\mathrm Q}$ lồi chặt (Định lý 01.29(b)) và $z^*=0$ là nghiệm toàn cục (Hệ quả 01.26), $f_{\mathrm Q}(0)=\log2$.

**(b) Chuyển về $(\mathrm P)$.** Theo Mệnh đề 02.6(b), $x^*=e^0=1$ là nghiệm của $(\mathrm P)$. Theo (a) của mệnh đề, $\log f_{\mathrm P}(x^*)=\log2$, tức $f_{\mathrm P}(x^*)=2$.

**Kiểm tra lại.** $x+1/x-2=(\sqrt x-1/\sqrt x)^2\ge0$, dấu bằng tại $x=1$.
:::

### 4.4. Ba ví dụ một biến

Ba ví dụ sau có mục tiêu lồi trên miền lồi nhưng cho ba kết luận khác nhau về nghiệm.

::: example Ví dụ 02.3 (Hàm bậc hai trên đoạn: nghiệm trên biên)
Một thông số kỹ thuật có giá trị lý tưởng bằng $2$, nhưng thiết bị chỉ cho phép đặt trong đoạn $[0,1]$. Đo độ lệch bằng bình phương, ta có bài toán $\min_{0\le x\le1}(x-2)^2$.

**Chứng nhận.** Miền $D=\mathbb R$; $f_0''(x)=2>0$ nên $f_0$ lồi chặt (Định lý 01.29(b)); hai ràng buộc $-x\le0$, $x-1\le0$ affine. Bài toán ở dạng phổ biến (4.1).

Tập khả thi $[0,1]$ không rỗng, đóng, bị chặn và $f_0$ liên tục, nên nghiệm tồn tại (Định lý 01.35) và duy nhất (Định lý 01.34).

**Tìm nghiệm.** Nghiệm của bài toán không ràng buộc là $x=2\notin[0,1]$. Ứng viên là đầu mút gần $2$ nhất, $x^*=1$. Kiểm tra (4.2), ở đây là $f_0'(x^*)(x-x^*)\ge0$ với mọi $x$ khả thi: $f_0'(1)=2(1-2)=-2$, và với mọi $x\in[0,1]$,

$$
\begin{aligned}
f_0'(1)(x-1)&=-2(x-1)\\
&=2(1-x)\ge0 .
\end{aligned}
$$

Theo Hệ quả 02.4(c), $x^*=1$ là nghiệm, với $p^*=f_0(1)=1$.

**Kiểm tra lại.** $f_0(0)=4$ và $f_0(\tfrac12)=\tfrac94$, đều lớn hơn $1$. Trực tiếp: với $x\le1$, $2-x\ge1>0$ nên $(x-2)^2=(2-x)^2\ge1$, dấu bằng khi $x=1$.
:::

![Parabol (x − 2) bình phương; phần trên đoạn khả thi [0, 1] vẽ nét liền, nghiệm (1, 1) ở đầu mút phải, đỉnh (2, 0) nằm ngoài đoạn.](img/lec-02/note-quadratic.svg)

Trên đồ thị, phần khả thi của parabol nằm bên trái đỉnh, nơi hàm giảm, nên điểm thấp nhất là đầu mút phải, nơi đạo hàm bằng $-2\ne0$; như Nhận xét 01.3, điều kiện (4.2) thay cho phương trình $f_0'(x)=0$.

::: example Ví dụ 02.4 (Hàm giá trị tuyệt đối: nghiệm tại điểm không khả vi)
Cùng giá trị lý tưởng $2$, nhưng đo độ lệch bằng trị tuyệt đối và cho phép $x$ tùy ý: $\min_{x\in\mathbb R}\lvert x-2\rvert$.

**Chứng nhận.** Viết $\lvert x-2\rvert=\max(x-2,\ 2-x)$, cực đại từng điểm của hai hàm affine, lồi theo Định lý 01.30(c). Bài toán không có ràng buộc, $D=\mathbb R$.

**Tìm nghiệm.** $\lvert x-2\rvert\ge0$ với mọi $x$ và bằng $0$ khi và chỉ khi $x=2$. Vậy $x^*=2$, $p^*=0$, nghiệm duy nhất.

Hàm không khả vi tại $x^*$ (đạo hàm trái $-1$, đạo hàm phải $+1$), nên Hệ quả 02.4(c) không dùng được và nghiệm được chứng nhận bằng bất đẳng thức trực tiếp.

**Kiểm tra lại.** $\lvert1-2\rvert=\lvert3-2\rvert=1>0$. Bài toán sau biến đổi $\min t$ với $t\ge x-2$, $t\ge2-x$ có nghiệm $(x,t)=(2,0)$: cộng hai ràng buộc cho $2t\ge0$, nên $t\ge0$, và $(2,0)$ khả thi.
:::

![Đồ thị chữ V của trị tuyệt đối của (x − 2), đỉnh tại (2, 0); tập khả thi là toàn trục số.](img/lec-02/note-absolute.svg)

Đồ thị có một góc nhọn tại đỉnh: tính lồi không đòi hỏi hàm trơn.

::: example Ví dụ 02.5 (Hàm nghịch đảo: bài toán lồi không có nghiệm)
Xét $\min_{x>0}1/x$, với miền $D=(0,\infty)$ và không có ràng buộc. Miền không thể thay bằng $x\ge0$, vì $1/x$ không xác định tại $0$.

**Chứng nhận.** $D$ là một khoảng, lồi. Trên $D$, $f_0'(x)=-1/x^2$ và $f_0''(x)=2/x^3>0$, nên $f_0$ lồi chặt theo Định lý 01.29(b), áp dụng trên miền mở $D$.

**Giá trị tối ưu.** Với mọi $x>0$, $1/x>0$, nên $0$ là một cận dưới. Dãy $x_k=k$, $k=1,2,\ldots$ khả thi và $1/x_k=1/k\to0$, nên không cận dưới nào lớn hơn $0$: $p^*=0$. Không điểm khả thi nào có $1/x=0$, nên bài toán không có nghiệm.

**Các định lý tồn tại không áp dụng.**

- Định lý 01.35 không áp dụng vì $D$ không bị chặn và không đóng.
- Định lý 01.38 không áp dụng vì $1/x\to0$, không tăng ra vô cực, khi $x\to\infty$.

**Kiểm tra lại.** Với $x=10$ và $x=1000$, $1/x$ bằng $0{,}1$ và $0{,}001$, đều dương.
:::

![Đường cong 1/x trên x > 0, luôn nằm trên trục hoành và tiến sát trục khi x tăng; tại 0 có vòng rỗng.](img/lec-02/note-reciprocal.svg)

Trên hình, đường cong tiệm cận trục hoành nhưng không cắt trục hoành: cận dưới đúng $p^*=0$ không đạt tại điểm nào.

::: remark Nhận xét 02.8 (Bốn trạng thái của một bài toán lồi)
Một bài toán dạng (4.1) thuộc đúng một trong bốn trạng thái:

1. không khả thi ($p^*=+\infty$), chẳng hạn $x\le-1$ và $-x\le-1$;
2. không bị chặn dưới ($p^*=-\infty$), như $\min_{x>0}(-\log x)$;
3. bị chặn dưới nhưng không đạt (Ví dụ 02.5);
4. có nghiệm (Ví dụ 02.3, 02.4).

Ở trạng thái thứ ba, kết quả phải ghi "cận dưới đúng $p^*$, không đạt", không ghi $x^*=+\infty$.
:::

::: exercise Bài tập 02.2 (Hình tròn và điều kiện bậc nhất)
Cho bài toán $\min\ (x_1-3)^2+x_2^2$ với ràng buộc $x_1^2+x_2^2\le4$.

(a) Đưa bài toán về dạng phổ biến (4.1) và chứng nhận từng thành phần.

(b) Chứng minh bài toán có đúng một nghiệm.

(c) Chứng minh $x^*=(2,0)$ là nghiệm bằng điều kiện (4.2) và tính $p^*$.
:::

::: hint
Ở (c), tính $\nabla f_0(2,0)$ và dùng $x_1\le\lVert x\rVert_2\le2$ với mọi điểm khả thi.
:::

::: solution
**(a) Chứng nhận.**

- Miền $D=\mathbb R^2$.
- Mục tiêu $f_0(x)=(x_1-3)^2+x_2^2$ có Hessian $2I_2\succ0$, nên lồi chặt (Định lý 01.29(b)).
- Ràng buộc viết thành $f_1(x)=x_1^2+x_2^2-4\le0$, với Hessian $2I_2\succeq0$, nên $f_1$ lồi.
- Không có đẳng thức.

Bài toán ở dạng (4.1) với $n=2$, $m=1$, $p=0$.

**(b) Tồn tại và duy nhất.** Tập khả thi là hình tròn đóng bán kính $2$, không rỗng (chứa gốc), đóng và bị chặn; $f_0$ liên tục. Định lý 01.35 cho nghiệm tồn tại, Định lý 01.34 cho nghiệm duy nhất vì $f_0$ lồi chặt.

**(c) Kiểm tra (4.2).** $\nabla f_0(x)=(2(x_1-3),\ 2x_2)$, nên $\nabla f_0(2,0)=(-2,0)$. Điểm $(2,0)$ khả thi vì $4\le4$. Với mọi $x$ khả thi,

$$
\begin{aligned}
\nabla f_0(2,0)^T&(x-(2,0))\\
&=-2(x_1-2)\\
&=2(2-x_1),
\end{aligned}
$$

và $x_1\le\sqrt{x_1^2+x_2^2}\le2$, nên biểu thức không âm. Theo Hệ quả 02.4(c), $x^*=(2,0)$ là nghiệm, với $p^*=(2-3)^2+0=1$.

**Kiểm tra lại.** Điểm khả thi $(0,2)$ cho $9+4=13>1$. Điểm $(\sqrt2,\sqrt2)$ cho $(\sqrt2-3)^2+2\approx2{,}51+2=4{,}51>1$.
:::

Định nghĩa 02.1 không giả thiết gì về cấu trúc của các $f_i$, nên không cho một cách chứng nhận nghiệm cụ thể. Khi mọi hàm của mô hình affine, một phép cộng các ràng buộc với hệ số không âm đủ để chứng nhận nghiệm.

## 5. Quy hoạch tuyến tính

Giả sử một vườn ươm trộn hai nguyên liệu I và II để bón cho một luống cây cần ít nhất $4$ g nitơ và $5$ g phốtpho, và có thể mua lượng lẻ. Bài toán là tìm phương án trộn có chi phí nhỏ nhất và chứng minh tính tối ưu của nó mà không liệt kê mọi phương án.

### 5.1. Bài toán pha trộn

Gọi $x_1$, $x_2$ là số kilôgam nguyên liệu I và II. Chi phí, lượng nitơ và lượng phốtpho đều tuyến tính theo $x$, vì thành phần cộng được và giá tỷ lệ với khối lượng.

::: example Ví dụ 02.6 (Mô hình pha trộn)
**Dữ kiện.** Giá theo đơn vị $10$ nghìn đồng mỗi kilôgam và thành phần của hai nguyên liệu:

| Nguyên liệu | Giá | Nitơ (g/kg) | Phốtpho (g/kg) |
|---|---:|---:|---:|
| I | $3$ | $2$ | $1$ |
| II | $2$ | $1$ | $2$ |

**Lập mô hình.** Mô hình là

$$
\begin{aligned}
&\underset{x\in\mathbb R^2}{\operatorname{minimize}}\ 3x_1+2x_2\\
&\text{subject to}\\
&\ \ 2x_1+x_2\ge4,\\
&\ \ x_1+2x_2\ge5,\\
&\ \ x_1\ge0,\ x_2\ge0 .
\end{aligned}
\tag{5.1}
$$

**Ba phương án khả thi.**

- Chỉ dùng II, $(0,4)$: nitơ $4$, phốtpho $8$, chi phí $8$.
- Chỉ dùng I, $(5,0)$: nitơ $10$, phốtpho $5$, chi phí $15$.
- Trộn $(1,2)$: nitơ $2+2=4$, phốtpho $1+4=5$, chi phí $3+4=7$, tức $70$ nghìn đồng.

**Kiểm tra lại.** Phương án $(1,1)$ có nitơ $3<4$, không khả thi, dù chi phí $5$ thấp hơn.
:::

![Miền khả thi không bị chặn trong góc phần tư không âm, giới hạn bởi 2x1 + x2 ≥ 4 (nét liền) và x1 + 2x2 ≥ 5 (nét đứt); hai biên cắt nhau tại (1, 2), nơi đường chi phí 3x1 + 2x2 = 7 tiếp xúc miền.](img/lec-02/lp-mixture.svg)

Trên hình, miền khả thi là giao của bốn nửa mặt phẳng, tức một đa giác lồi không bị chặn. Các đường chi phí $3x_1+2x_2=\text{hằng số}$ song song với nhau, và khi hằng số giảm, đường chi phí tịnh tiến về phía gốc.

Một cách trực quan, phương án có chi phí nhỏ nhất là điểm cuối cùng của miền khả thi mà đường chi phí còn đi qua khi hằng số giảm, ở đây là đỉnh $(1,2)$. Tính tối ưu của đỉnh này cần một lập luận trên mọi điểm khả thi, chẳng hạn một phép cộng các ràng buộc.

### 5.2. Định nghĩa, dạng tổng quát và dạng chuẩn

Một định nghĩa chung cần bao quát ràng buộc "$\ge$", "$\le$", đẳng thức và biến tự do; phương pháp đơn hình (simplex method) lại làm việc với dạng gồm đẳng thức và điều kiện không âm. Hai dạng được định nghĩa như sau.

::: definition Định nghĩa 02.9 (Quy hoạch tuyến tính)
Cho $c\in\mathbb R^n$, $G\in\mathbb R^{m\times n}$, $h\in\mathbb R^m$, $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$. *Quy hoạch tuyến tính* (linear programming, LP) ở *dạng tổng quát* (general form) là

$$
\begin{aligned}
&\underset{x\in\mathbb R^n}{\operatorname{minimize}}\ c^Tx\\
&\text{subject to}\\
&\ \ Gx\le h,\ Ax=b,
\end{aligned}
\tag{5.2}
$$

trong đó $Gx\le h$ nghĩa là $(Gx)_i\le h_i$ với mọi $i$. Khi không có ràng buộc đẳng thức ($p=0$), (5.2) được gọi là *dạng bất đẳng thức* (inequality form).

Quy hoạch tuyến tính ở *dạng chuẩn* (standard form) là

$$
\begin{aligned}
&\underset{\zeta\in\mathbb R^{n'}}{\operatorname{minimize}}\ \tilde c^T\zeta\\
&\text{subject to}\\
&\ \ B\zeta=\tilde b,\ \zeta\ge0,
\end{aligned}
\tag{5.3}
$$

với dữ liệu $\tilde c\in\mathbb R^{n'}$, $B\in\mathbb R^{p'\times n'}$, $\tilde b\in\mathbb R^{p'}$.
:::

Mỗi hàng của $G$ cùng tọa độ tương ứng của $h$ mô tả một giới hạn, mỗi hàng của $A$ mô tả một cân bằng; hằng số cộng vào mục tiêu không đổi nghiệm. Bài toán (5.1) thuộc dạng (5.2) sau khi đổi dấu, chẳng hạn $2x_1+x_2\ge4$ thành $-2x_1-x_2\le-4$.

So với Định nghĩa 02.1, quy hoạch tuyến tính là trường hợp mọi $f_i$ affine và $D=\mathbb R^n$. Hàm affine vừa lồi vừa lõm (Ví dụ 01.12(b)), nên cực đại $c^Tx$ cũng là bài toán lồi sau khi đổi thành cực tiểu $-c^Tx$.

Quy hoạch tuyến tính không bao gồm bài toán có biến nguyên, do tập điểm nguyên không lồi, chẳng hạn $(1,2)$ và $(2,2)$ nguyên mà trung điểm $(\tfrac32,2)$ thì không.

Quan hệ giữa hai dạng được phát biểu trong mệnh đề sau.

::: proposition Mệnh đề 02.10 (Tính lồi của quy hoạch tuyến tính và phép đưa về dạng chuẩn) — chứng minh đầy đủ
**Giả thiết.** Bài toán (5.2) với dữ liệu như Định nghĩa 02.9.

**Kết luận.** (a) (5.2) là bài toán tối ưu lồi dạng phổ biến, và tập khả thi của nó là một *đa diện* (polyhedron), tức tập nghiệm của hữu hạn bất đẳng thức và đẳng thức tuyến tính.

(b) Đặt $\zeta=(x^+,x^-,\sigma)\in\mathbb R^{2n+m}$ và

$$
\begin{aligned}
B&=\begin{bmatrix}G&-G&I_m\\A&-A&0\end{bmatrix},\\
\tilde b&=\begin{bmatrix}h\\b\end{bmatrix},\qquad \tilde c=\begin{bmatrix}c\\-c\\0\end{bmatrix}.
\end{aligned}
$$

Bài toán dạng chuẩn (5.3) với dữ liệu này là một biến đổi tương đương của (5.2) theo Định nghĩa 02.5, với $T(s)=s$, $\varphi(x)=(\max(x,0),\max(-x,0),h-Gx)$ (lấy $\max$ theo từng thành phần) và $\psi(x^+,x^-,\sigma)=x^+-x^-$.
:::

::: proof Chứng minh Mệnh đề 02.10
**Lộ trình.** Phần (a) kiểm từng dòng theo Định nghĩa 02.1; phần (b) kiểm hai bất đẳng thức của (4.3) cho $\varphi$, $\psi$ rồi dùng Mệnh đề 02.6.

**Bước 1 (phần (a)).** Mục tiêu $c^Tx$ và các hàm $(Gx)_i-h_i$ là affine, nên lồi; các đẳng thức affine. Bài toán ở dạng (4.1) với $D=\mathbb R^n$, và tập khả thi là tập nghiệm của $m$ bất đẳng thức tuyến tính $(Gx)_i\le h_i$ cùng tập affine $\{x\mid Ax=b\}$.

**Bước 2 (phần (b), chiều thứ nhất của (4.3)).** Lấy $x$ khả thi cho (5.2), đặt $x^+=\max(x,0)$, $x^-=\max(-x,0)$ theo từng thành phần và $\sigma=h-Gx$.

- $x^+,x^-\ge0$, và $x^+-x^-=x$, vì với mỗi $j$, một trong hai số bằng $0$ và hiệu bằng $x_j$.
- $\sigma\ge0$ vì $Gx\le h$.
- Hàng khối trên của $B\zeta$ là $G(x^+-x^-)+\sigma=Gx+h-Gx=h$; hàng khối dưới là $A(x^+-x^-)=Ax=b$.

Vậy $\zeta=\varphi(x)$ khả thi cho (5.3), và $\tilde c^T\zeta=c^Tx^+-c^Tx^-=c^Tx$.

**Bước 3 (phần (b), chiều thứ hai của (4.3)).** Lấy $\zeta=(x^+,x^-,\sigma)$ khả thi cho (5.3) và đặt $x=x^+-x^-$. Hàng khối trên cho $Gx=h-\sigma\le h$ vì $\sigma\ge0$; hàng khối dưới cho $Ax=b$. Vậy $\psi(\zeta)$ khả thi cho (5.2), và $c^T\psi(\zeta)=c^Tx^+-c^Tx^-=\tilde c^T\zeta$.

**Bước 4 (kết luận).** Hai chiều cho (4.3) với dấu bằng, và Mệnh đề 02.6 cho kết luận. $\square$
:::

Mệnh đề 02.10 cho phép coi hai dạng (5.2) và (5.3) như một lớp: mọi kết quả chứng minh cho một dạng chuyển được sang dạng kia qua Mệnh đề 02.6. Biến nào đã có ràng buộc không âm thì không cần tách thành hiệu.

Biến $\sigma$ được gọi là *biến bù* (slack variable). Thành phần $\sigma_i$ đo khoảng cách còn lại tới giới hạn thứ $i$, và $\sigma_i=0$ nghĩa là ràng buộc $i$ là *ràng buộc hoạt động* (còn gọi là ràng buộc chặt, active constraint).

::: example Ví dụ 02.7 (Dạng chuẩn của bài toán pha trộn)
**Dữ kiện.** Bài toán pha trộn (5.1): $\min3x_1+2x_2$ với $2x_1+x_2\ge4$, $x_1+2x_2\ge5$, $x_1\ge0$, $x_2\ge0$.

**Lập dạng chuẩn.** Trong (5.1), hai biến đã không âm nên không cần tách. Thêm *biến dư* (surplus variable) $\sigma_1,\sigma_2\ge0$ cho hai ràng buộc dinh dưỡng, viết ở dạng "$\ge$": $2x_1+x_2-\sigma_1=4$ và $x_1+2x_2-\sigma_2=5$. Với $\zeta=(x_1,x_2,\sigma_1,\sigma_2)$, dạng chuẩn là

$$
\begin{aligned}
&\underset{\zeta\ge0}{\operatorname{minimize}}\quad 3x_1+2x_2\\
&\text{subject to}\\
&\quad\begin{bmatrix}2&1&-1&0\\1&2&0&-1\end{bmatrix}\zeta=\begin{bmatrix}4\\5\end{bmatrix}.
\end{aligned}
$$

**Diễn giải.**

- Phương án $(1,2)$ ứng với $\zeta=(1,2,0,0)$: cả hai ràng buộc dinh dưỡng chặt.
- Phương án $(0,4)$ ứng với $\zeta=(0,4,0,3)$: phốtpho dư $3$ g.

**Kiểm tra lại.** Hàng thứ nhất tại $\zeta=(0,4,0,3)$: $0+4-0=4$; hàng thứ hai: $0+8-3=5$. Chi phí $8$ bằng chi phí của $(0,4)$ trong (5.1).
:::

### 5.3. Chứng nhận nghiệm bằng tổ hợp không âm các ràng buộc

Để chứng minh không phương án nào có chi phí thấp hơn $7$, ta viết chi phí thành một tổ hợp của các vế trái của ràng buộc:

$$
\begin{aligned}
3x_1+2x_2&=\tfrac43(2x_1+x_2)\\
&\quad+\tfrac13(x_1+2x_2),
\end{aligned}
$$

Mỗi ngoặc không nhỏ hơn vế phải của ràng buộc tương ứng, và hai hệ số $\tfrac43,\tfrac13$ không âm, nên chi phí không nhỏ hơn $\tfrac43\cdot4+\tfrac13\cdot5=7$. Mệnh đề sau tổng quát hóa phép tính này.

::: proposition Mệnh đề 02.11 (Cận dưới từ tổ hợp không âm của các ràng buộc) — chứng minh đầy đủ
**Giả thiết.** Xét quy hoạch tuyến tính $\min c^Tx$ với các ràng buộc $a_i^Tx\ge\beta_i$, $i=1,\ldots,k$ (mọi ràng buộc bất đẳng thức tuyến tính, kể cả $x_j\ge0$, đều viết được ở dạng này). Giả sử có $\mu\in\mathbb R^k$ với $\mu\ge0$ và $c=\sum_{i=1}^k\mu_ia_i$.

**Kết luận.**

- (a) Với mọi $x$ khả thi, $c^Tx\ge\sum_{i=1}^k\mu_i\beta_i$.
- (b) Nếu một điểm khả thi $\hat x$ có $c^T\hat x=\sum_i\mu_i\beta_i$ thì $\hat x$ là nghiệm.
- (c) Khi đó, mọi ràng buộc có $\mu_i>0$ đều chặt tại mọi nghiệm: $a_i^Tx^*=\beta_i$.
:::

::: proof Chứng minh Mệnh đề 02.11
**Lộ trình.** Nhân mỗi ràng buộc với hệ số không âm của nó và cộng lại; phần (c) dùng tổng các số hạng không âm bằng $0$.

**Bước 1 (phần (a): cộng các ràng buộc với hệ số không âm).** Với $x$ khả thi, $a_i^Tx-\beta_i\ge0$ với mọi $i$. Nhân với $\mu_i\ge0$ giữ chiều bất đẳng thức, và cộng lại:

$$
\begin{aligned}
&c^Tx-\textstyle\sum_i\mu_i\beta_i\\
&\quad=\textstyle\sum_i\mu_ia_i^Tx-\sum_i\mu_i\beta_i\\
&\quad=\textstyle\sum_i\mu_i\bigl(a_i^Tx-\beta_i\bigr)\\
&\quad\ge0,
\end{aligned}
$$

trong đó đẳng thức đầu dùng giả thiết $c=\sum_i\mu_ia_i$.

**Bước 2 (phần (b)).** Theo (a), mọi điểm khả thi có giá trị không nhỏ hơn $\sum_i\mu_i\beta_i=c^T\hat x$, nên $\hat x$ là nghiệm.

**Bước 3 (phần (c)).** Tại một nghiệm $x^*$, giá trị tối ưu bằng $c^T\hat x=\sum_i\mu_i\beta_i$, nên tổng $\sum_i\mu_i(a_i^Tx^*-\beta_i)$ ở (a) bằng $0$. Đây là tổng của các số hạng không âm, nên mỗi số hạng bằng $0$. Với $\mu_i>0$, điều đó cho $a_i^Tx^*=\beta_i$. $\square$
:::

Theo Mệnh đề 02.11, việc chứng minh tối ưu quy về việc tìm các hệ số $\mu_i\ge0$; tổng của chúng không cần bằng $1$. So với điều kiện (4.2), cách chứng nhận này không cần gradient, và phần (c) cho thêm các ràng buộc chặt tại mọi nghiệm.

::: example Ví dụ 02.8 (Nghiệm của bài toán pha trộn)
**Dữ kiện.** Bài toán pha trộn (5.1): $\min3x_1+2x_2$ với $2x_1+x_2\ge4$, $x_1+2x_2\ge5$, $x_1\ge0$, $x_2\ge0$.

**Tìm ứng viên.** Ứng viên là giao của hai biên dinh dưỡng: hệ $2x_1+x_2=4$, $x_1+2x_2=5$. Nhân phương trình đầu với $2$ rồi trừ phương trình sau: $3x_1=3$, nên $x_1=1$ và $x_2=4-2=2$.

**Tìm hệ số $\mu$.** Viết bốn ràng buộc ở dạng $a_i^Tx\ge\beta_i$:

- $a_1=(2,1)$, $\beta_1=4$;
- $a_2=(1,2)$, $\beta_2=5$;
- $a_3=(1,0)$, $\beta_3=0$;
- $a_4=(0,1)$, $\beta_4=0$.

Giải $c=(3,2)=\mu_1(2,1)+\mu_2(1,2)$ với $\mu_3=\mu_4=0$: $2\mu_1+\mu_2=3$, $\mu_1+2\mu_2=2$, cho $\mu_1=\tfrac43$, $\mu_2=\tfrac13$, cả hai không âm.

**Chứng nhận.** Theo Mệnh đề 02.11(a), mọi phương án khả thi có chi phí ít nhất

$$
\tfrac43\cdot4+\tfrac13\cdot5=\tfrac{21}3=7 .
$$

Điểm $(1,2)$ khả thi và đạt $7$, nên là nghiệm theo (b): chi phí tối ưu $70$ nghìn đồng. Theo (c), mọi nghiệm đều dùng đúng $4$ g nitơ và $5$ g phốtpho, vì $\mu_1,\mu_2>0$.

**Kiểm tra lại.** Tại $(1,2)$: $2+2=4$, $1+4=5$, $x\ge0$. Điểm khả thi $(0,4)$ cho $8\ge7$, điểm $(5,0)$ cho $15\ge7$, đúng với (a). Từ hai đẳng thức chặt ở (c), mọi nghiệm thỏa hệ $2x_1+x_2=4$, $x_1+2x_2=5$, có nghiệm duy nhất $(1,2)$; vậy nghiệm duy nhất.
:::

::: remark Nhận xét 02.12 (Nhiều nghiệm, biến nguyên và đỉnh của đa diện)
**Nhiều nghiệm.** Nếu giá nguyên liệu I tăng lên $4$, thì $4x_1+2x_2=2(2x_1+x_2)\ge8$ với $\mu=(2,0,0,0)$. Cả $(0,4)$ và $(1,2)$ đạt $8$, nên mọi điểm của đoạn nối chúng là nghiệm (Hệ quả 02.4(b)). Nghiệm của quy hoạch tuyến tính có thể không duy nhất vì mục tiêu tuyến tính không lồi chặt.

**Đỉnh của đa diện.** Nếu đa diện khả thi có ít nhất một đỉnh thì giá trị tối ưu bằng $-\infty$ hoặc có một đỉnh là nghiệm (Bertsimas (2009), Bài giảng 2).

**Biến nguyên.** Nếu buộc $x$ nguyên, Mệnh đề 02.11 vẫn cho cận dưới $7$, nhưng nghiệm nguyên phải tìm riêng.
:::

### 5.4. Kỹ thuật biến phụ: hồi quy sai số tuyệt đối và hồi quy minimax

Bài toán khớp đường thẳng trên năm quan sát của Ví dụ 02.1(a) theo tiêu chí trị tuyệt đối có mục tiêu không tuyến tính, nhưng đưa được về quy hoạch tuyến tính nhờ thêm *biến phụ* (auxiliary variable). Định nghĩa sau xét hai tiêu chí đo độ khớp: tổng các độ lệch $\lvert r_i\rvert$ và độ lệch lớn nhất.

::: definition Định nghĩa 02.13 (Hồi quy sai số tuyệt đối và hồi quy minimax)
Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$ và $r=Xw-y$.

*Hồi quy sai số tuyệt đối* (least absolute deviations, còn gọi là xấp xỉ chuẩn một, $\ell_1$-norm approximation) là bài toán $\min_{w\in\mathbb R^d}\lVert Xw-y\rVert_1$, với $\lVert r\rVert_1=\sum_{i=1}^N\lvert r_i\rvert$.

*Hồi quy minimax* (còn gọi là xấp xỉ Chebyshev; minimax approximation, Chebyshev approximation) là bài toán $\min_{w\in\mathbb R^d}\lVert Xw-y\rVert_\infty$, với $\lVert r\rVert_\infty=\max_i\lvert r_i\rvert$.
:::

Cả hai mục tiêu lồi theo $w$ (Định lý 01.30). Hàm $\lVert r\rVert_1$ nói chung không khả vi tại điểm có một phần dư bằng $0$, như Ví dụ 02.4; hàm $\lVert r\rVert_\infty$ nói chung không khả vi tại điểm có hai phần dư cùng đạt trị tuyệt đối lớn nhất. Cùng với bình phương nhỏ nhất (Định nghĩa 01.4), ba hàm gộp $\lVert r\rVert_1$, $\lVert r\rVert_\infty$, $\lVert r\rVert_2^2$ cho ba bài toán khác nhau.

![Miền tô t ≥ |r| trong mặt phẳng (r, t), phía trên đồ thị chữ V, là giao của hai nửa mặt phẳng t ≥ r và t ≥ −r.](img/lec-02/lp-epigraph.svg)

Trên hình, tập các điểm nằm trên đồ thị của $\lvert r\rvert$, gọi là *tập trên đồ thị* (epigraph), là giao của hai nửa mặt phẳng, và tại nghiệm của bài toán cực tiểu $t$ trên tập đó, $t$ bằng $\lvert r\rvert$. Bổ đề và định lý sau làm chính xác nhận xét này cho tổng và cực đại của nhiều hàm.

::: lemma Bổ đề 02.14 (Chặn trên một cực đại bằng các bất đẳng thức) — chứng minh đầy đủ
**Giả thiết.** $s_1,\ldots,s_K\in\mathbb R$ và $t\in\mathbb R$.

**Kết luận.** $t\ge\max_ks_k$ khi và chỉ khi $t\ge s_k$ với mọi $k=1,\ldots,K$. Đặc biệt, $t\ge\lvert r\rvert$ khi và chỉ khi $t\ge r$ và $t\ge-r$.
:::

::: proof Chứng minh Bổ đề 02.14
**Lộ trình.** Hai chiều suy trực tiếp từ định nghĩa của giá trị lớn nhất.

**Bước 1 (chiều thuận).** Nếu $t\ge\max_ks_k$ thì $t\ge s_k$ với mọi $k$, vì mỗi $s_k\le\max_ks_k$.

**Bước 2 (chiều đảo).** Nếu $t\ge s_k$ với mọi $k$ thì $t$ không nhỏ hơn số lớn nhất trong các $s_k$, vì số lớn nhất đó là một trong các $s_k$.

**Bước 3 (trường hợp đặc biệt).** Đó là $K=2$ với $s_1=r$, $s_2=-r$, vì $\lvert r\rvert=\max(r,-r)$. $\square$
:::

Bổ đề 02.14 và Mệnh đề 02.6 cho định lý sau, tổng quát hóa cách Boyd và Vandenberghe (2004, tr. 150) đưa cực tiểu một hàm tuyến tính từng khúc về quy hoạch tuyến tính; phép thay một hạng của mục tiêu bằng biến $t$ cùng ràng buộc hạng đó $\le t$ gọi là *dạng trên đồ thị* (epigraph form, Boyd và Vandenberghe (2004), §4.1.3, tr. 134).

::: theorem Định lý 02.15 (Biến đổi bằng biến phụ) — chứng minh đầy đủ
**Giả thiết.** $C\subseteq\mathbb R^n$ và $f_0:C\to\mathbb R$ tùy ý. Với $i=1,\ldots,M$ và $k=1,\ldots,K_i$, cho các hàm affine $s_{ik}(x)=a_{ik}^Tx+\beta_{ik}$, và trọng số $\gamma_i\ge0$. Xét

$$
\begin{aligned}
(\mathrm P):\ &\min_{x\in C}\ f_0(x)\\
&\quad+\sum_{i=1}^M\gamma_i\max_ks_{ik}(x),\\
(\mathrm Q):\ &\min_{(x,t)}\ f_0(x)+\sum_{i=1}^M\gamma_it_i\\
&\text{subject to}\ \ x\in C,\\
&\quad s_{ik}(x)\le t_i\ \ \forall i,k .
\end{aligned}
$$

**Kết luận.** (a) $(\mathrm Q)$ là biến đổi tương đương của $(\mathrm P)$ theo Định nghĩa 02.5 với $T(s)=s$, $\varphi(x)=(x,(\max_ks_{ik}(x))_{i})$ và $\psi(x,t)=x$; do đó hai bài toán có cùng giá trị tối ưu và nghiệm của bài toán này cho nghiệm của bài toán kia.

(b) Nếu $\gamma_i>0$ thì mọi nghiệm $(x^*,t^*)$ của $(\mathrm Q)$ có $t_i^*=\max_ks_{ik}(x^*)$.

(c) Tương tự, $\min_{x\in C}\max_i\max_ks_{ik}(x)$ tương đương với $\min_{(x,t)}t$ với $x\in C$, $s_{ik}(x)\le t$ với mọi $i,k$, dùng một biến phụ chung $t\in\mathbb R$.
:::

::: proof Chứng minh Định lý 02.15
**Lộ trình.** Kiểm hai bất đẳng thức của (4.3) bằng Bổ đề 02.14, rồi dùng Mệnh đề 02.6; phần (b) dùng phản chứng.

Đặt $\bar s_i(x)=\max_ks_{ik}(x)$.

**Bước 1 (phần (a), chiều thứ nhất của (4.3), $T(s)=s$).** Với $x\in C$, điểm $\varphi(x)=(x,t)$ với $t_i=\bar s_i(x)$ thỏa $s_{ik}(x)\le t_i$ với mọi $k$ theo Bổ đề 02.14, nên khả thi cho $(\mathrm Q)$. Giá trị mục tiêu của $(\mathrm Q)$ tại đó bằng $f_0(x)+\sum_i\gamma_i\bar s_i(x)$, đúng giá trị của $(\mathrm P)$ tại $x$.

**Bước 2 (phần (a), chiều thứ hai).** Với $(x,t)$ khả thi cho $(\mathrm Q)$, $x\in C$ và Bổ đề 02.14 cho $t_i\ge \bar s_i(x)$. Nhân với $\gamma_i\ge0$ giữ chiều, nên

$$
\begin{aligned}
f_0(x)&+\textstyle\sum_i\gamma_i\bar s_i(x)\\
&\le f_0(x)+\textstyle\sum_i\gamma_it_i .
\end{aligned}
$$

Đây là vế phải của (4.3) với $\psi(x,t)=x$, nên Mệnh đề 02.6 cho kết luận.

**Bước 3 (phần (b)).** Giả sử $(x^*,t^*)$ là nghiệm và $t_i^*>\bar s_i(x^*)$ với một $i$ có $\gamma_i>0$. Thay $t_i^*$ bằng $\bar s_i(x^*)$, giữ nguyên các thành phần khác. Điểm mới vẫn khả thi theo Bổ đề 02.14, và mục tiêu giảm một lượng $\gamma_i(t_i^*-\bar s_i(x^*))>0$, mâu thuẫn với tính tối ưu.

**Bước 4 (phần (c)).** Áp dụng cùng lập luận với $f_0=0$, một cực đại duy nhất $\max_{i,k}s_{ik}$ và trọng số $1$: theo Bổ đề 02.14, $t\ge\max_{i,k}s_{ik}(x)$ khi và chỉ khi $s_{ik}(x)\le t$ với mọi $i,k$. $\square$
:::

Khi $f_0(x)=c^Tx$ và $C$ là một đa diện, $(\mathrm Q)$ là quy hoạch tuyến tính. Định lý 02.15 đổi hình thức của bài toán mà không làm nó lồi hơn. Mục tiêu không khả vi được thay bằng mục tiêu tuyến tính cộng các ràng buộc tuyến tính để bộ giải nhận được, với chi phí là thêm $M$ biến và $\sum_iK_i$ ràng buộc.

Chiều cực tiểu và giả thiết $\gamma_i\ge0$ được dùng khi suy từ $t_i\ge\max_ks_{ik}(x)$ ra $\gamma_it_i\ge\gamma_i\max_ks_{ik}(x)$. Nếu $\gamma_i<0$, bài toán $(\mathrm Q)$ cho $t_i\to+\infty$ và giá trị $-\infty$. Với bài toán cực đại, hoặc với mục tiêu chứa $\min_ks_{ik}(x)$ (một hàm lõm), Bổ đề 02.14 chỉ cho một chiều.

Với hồi quy sai số tuyệt đối trên $N$ mẫu và $d$ tham số, Định lý 02.15 cho một quy hoạch tuyến tính có $d+N$ biến và $2N$ ràng buộc. Một thư viện mô hình hóa tối ưu lồi biến đổi mô hình chứa chuẩn một hay hàm cực đại sang quy hoạch tuyến tính hoặc quy hoạch bậc hai, rồi trả về giá trị của các biến ban đầu, tức áp dụng $\psi$; theo Mệnh đề 02.6, đó là nghiệm của bài toán người dùng viết.

Hồi quy sai số tuyệt đối ít nhạy với ngoại lai hơn bình phương nhỏ nhất (Murphy (2022), §11.6.1). Hồi quy minimax ứng với tiêu chí trường hợp xấu nhất, như sai số trên nhóm người dùng chịu thiệt nhất.

Hai ví dụ sau giải hai bài toán này trên dữ liệu chung.

::: example Ví dụ 02.9 (Nghiệm hồi quy sai số tuyệt đối)
**Dữ kiện.** Dữ liệu chung (Ví dụ 02.1(a)): $u=(-2,-1,0,1,2)$, $y=(-2,-1,3,1,2)$, $w=(w_1,w_0)$; với $\delta=w_1-1$, phần dư là $r=(w_0-2\delta,\,w_0-\delta,\,w_0-3,\,w_0+\delta,\,w_0+2\delta)$.

**Lập mô hình.** Theo Định lý 02.15, bài toán $\min_w\lVert Xw-y\rVert_1$ trên dữ liệu chung tương đương với quy hoạch tuyến tính

$$
\begin{aligned}
&\underset{w\in\mathbb R^2,\ t\in\mathbb R^5}{\operatorname{minimize}}\quad\mathbf 1^Tt\\
&\text{subject to}\quad -t\le Xw-y\le t,
\end{aligned}
$$

có $7$ biến và $10$ ràng buộc. Ta chứng minh $w^*=(1,0)$ là nghiệm duy nhất, với giá trị $3$.

**Bước 1 (cận dưới).** Bất đẳng thức tam giác cho hai cặp đối xứng

$$
\begin{aligned}
&\lvert w_0-\delta\rvert+\lvert w_0+\delta\rvert\\
&\quad\ge\lvert(w_0-\delta)+(w_0+\delta)\rvert\\
&\quad=2\lvert w_0\rvert,\\
&\lvert w_0-2\delta\rvert+\lvert w_0+2\delta\rvert\ge2\lvert w_0\rvert,
\end{aligned}
$$

và cho điểm giữa $\lvert w_0-3\rvert=\lvert3-w_0\rvert\ge3-\lvert w_0\rvert$. Cộng ba bất đẳng thức, ta có

$$
\begin{aligned}
\lVert r\rVert_1&\ge2\lvert w_0\rvert+2\lvert w_0\rvert+3-\lvert w_0\rvert\\
&=3+3\lvert w_0\rvert\ge3 .
\end{aligned}
$$

**Bước 2 (cận đạt).** Tại $w=(1,0)$, $r=(0,0,-3,0,0)$ và $\lVert r\rVert_1=3$, nên cận đạt và $w^*=(1,0)$ là nghiệm.

**Bước 3 (duy nhất).** Nếu $\lVert r\rVert_1=3$ thì $3+3\lvert w_0\rvert\le3$, nên $w_0=0$. Khi đó

$$
\begin{aligned}
\lVert r\rVert_1&=2\lvert\delta\rvert+\lvert\delta\rvert+3+\lvert\delta\rvert+2\lvert\delta\rvert\\
&=3+6\lvert\delta\rvert,
\end{aligned}
$$

nên $\delta=0$. Theo Định lý 02.15(b), nghiệm của quy hoạch tuyến tính là $(w^*,t^*)$ với $t^*=(0,0,3,0,0)$.

**Kiểm tra lại.** Đường thử $\hat y=u+1$ cho $6\ge3$. Sai số lớn nhất của nghiệm là $3$, đạt tại điểm $(0,3)$.
:::

![Năm điểm dữ liệu và đường y mũ bằng u đi qua bốn điểm; đoạn phần dư duy nhất nối (0, 3) với đường, dài 3.](img/lec-02/lp-lad.svg)

Trên hình, nghiệm khớp chính xác bốn điểm và chấp nhận sai số $3$ tại $(0,3)$.

::: example Ví dụ 02.10 (Nghiệm hồi quy minimax)
**Dữ kiện.** Dữ liệu chung (Ví dụ 02.1(a)), $w=(w_1,w_0)$; với $\delta=w_1-1$, phần dư là $r=(w_0-2\delta,\,w_0-\delta,\,w_0-3,\,w_0+\delta,\,w_0+2\delta)$.

**Lập mô hình.** Theo Định lý 02.15(c), bài toán $\min_w\lVert Xw-y\rVert_\infty$ tương đương với quy hoạch tuyến tính $\min_{w,t}t$ với $-t\mathbf 1\le Xw-y\le t\mathbf 1$, có $3$ biến và $10$ ràng buộc. Ta chứng minh nghiệm duy nhất là $w^*=(1,\tfrac32)$ với $t^*=\tfrac32$.

**Bước 1 (cận dưới).** Với $\delta=w_1-1$ như trên, nếu mọi $\lvert r_i\rvert\le t$ thì

$$
\begin{aligned}
2\lvert w_0\rvert&=\bigl\lvert(w_0-\delta)+(w_0+\delta)\bigr\rvert\\
&\le\lvert r_2\rvert+\lvert r_4\rvert\le2t,\\
\lvert w_0-3\rvert&=\lvert r_3\rvert\le t,
\end{aligned}
$$

nên

$$
\begin{aligned}
3&=\lvert w_0+(3-w_0)\rvert\\
&\le\lvert w_0\rvert+\lvert3-w_0\rvert\le2t,
\end{aligned}
$$

tức $t\ge\tfrac32$.

**Bước 2 (cận đạt).** Tại $w=(1,\tfrac32)$, phần dư là $r=(\tfrac32,\tfrac32,-\tfrac32,\tfrac32,\tfrac32)$, từng thành phần tính như sau: $-2+\tfrac32+2$, $-1+\tfrac32+1$, $0+\tfrac32-3$, $1+\tfrac32-1$, $2+\tfrac32-2$. Vậy $\lVert r\rVert_\infty=\tfrac32$ và cận đạt.

**Bước 3 (duy nhất).** Nếu $t=\tfrac32$ thì chuỗi trên chặt, nên $\lvert w_0\rvert+\lvert3-w_0\rvert=3$ với $\lvert w_0\rvert\le\tfrac32$ và $\lvert3-w_0\rvert\le\tfrac32$, buộc $w_0=\tfrac32$. Khi đó $\lvert\tfrac32-\delta\rvert\le\tfrac32$ và $\lvert\tfrac32+\delta\rvert\le\tfrac32$ cho $\delta\ge0$ và $\delta\le0$, tức $\delta=0$.

**Kiểm tra lại.** Tổng trị tuyệt đối của nghiệm minimax là $5\cdot\tfrac32=\tfrac{15}2>3$, còn sai số lớn nhất của nghiệm Ví dụ 02.9 là $3>\tfrac32$. Mỗi nghiệm tốt hơn theo tiêu chí của chính nó và kém hơn theo tiêu chí kia.
:::

![Năm điểm dữ liệu, đường y mũ bằng u cộng 1,5 và dải nửa độ rộng 1,5 quanh đường; cả năm điểm nằm trên mép dải.](img/lec-02/lp-minimax.svg)

Trên hình, nghiệm minimax dời đường lên $1{,}5$ đơn vị để chia đều sai số giữa điểm $(0,3)$ và bốn điểm còn lại.

::: remark Nhận xét 02.16 (Các lỗi thường gặp khi dùng biến phụ)
1. Chỉ viết một phía $t_i\ge r_i$: với dữ liệu chung, $w=(0,-\Lambda)$ và $t_i=r_i=-\Lambda-y_i$ cho $\mathbf 1^Tt=-5\Lambda-\sum_iy_i=-5\Lambda-3\to-\infty$ khi $\Lambda\to+\infty$.
2. Coi $t_i=\lvert r_i\rvert$ tại mọi điểm khả thi: điểm $(w,t)=((1,0),(1,1,3,1,1))$ khả thi mà $t_1>\lvert r_1\rvert=0$. Tại một điểm khả thi bất kỳ chỉ có $t_i\ge\lvert r_i\rvert$; đẳng thức đúng tại mọi nghiệm (Định lý 02.15(b)).
3. Dùng biến phụ cho bài toán cực đại: $\max_{-1\le x\le1}\lvert x\rvert=1$, còn "$\max t$ với $t\ge\pm x$" không bị chặn trên.
4. Gọi việc chuyển từ $\lVert r\rVert_1$ sang $\lVert r\rVert_\infty$ là biến đổi tương đương: đổi hàm gộp là đổi bài toán.
:::

::: exercise Bài tập 02.3 (Thuê máy tiền xử lý dữ liệu)
Giả sử một nhóm thuê hai loại máy để tiền xử lý dữ liệu huấn luyện. Mỗi giờ, máy loại I xử lý $3$ nghìn ảnh và $1$ nghìn đoạn âm thanh với giá $4$ trăm nghìn đồng; máy loại II xử lý $1$ nghìn ảnh và $2$ nghìn đoạn âm thanh với giá $3$ trăm nghìn đồng. Cần xử lý ít nhất $6$ nghìn ảnh và $7$ nghìn đoạn âm thanh; số giờ thuê là số thực không âm.

(a) Lập quy hoạch tuyến tính và viết dạng chuẩn (5.3) của nó.

(b) Chứng minh phương án $x^*=(1,3)$ là nghiệm duy nhất bằng Mệnh đề 02.11, và tính chi phí.
:::

::: hint
Tìm $\mu_1,\mu_2\ge0$ với $(4,3)=\mu_1(3,1)+\mu_2(1,2)$.
:::

::: solution
**(a) Lập mô hình.** Gọi $x_1,x_2$ là số giờ thuê máy I, II; chi phí tính theo trăm nghìn đồng. Mô hình:

$$
\begin{aligned}
&\min\ 4x_1+3x_2\\
&\text{subject to}\quad 3x_1+x_2\ge6,\\
&\quad x_1+2x_2\ge7,\quad x_1,x_2\ge0,
\end{aligned}
$$

trong đó ràng buộc thứ nhất cho ảnh, ràng buộc thứ hai cho âm thanh. Dạng chuẩn với biến dư $\sigma_1,\sigma_2\ge0$ và $\zeta=(x_1,x_2,\sigma_1,\sigma_2)\ge0$: $\min4x_1+3x_2$ với $3x_1+x_2-\sigma_1=6$, $x_1+2x_2-\sigma_2=7$.

**(b) Tìm $\mu$.** Hệ $3\mu_1+\mu_2=4$, $\mu_1+2\mu_2=3$ cho $\mu_1=1$, $\mu_2=1$, không âm.

**(b) Chứng nhận.** Theo Mệnh đề 02.11(a), mọi phương án khả thi có chi phí ít nhất $1\cdot6+1\cdot7=13$. Phương án $(1,3)$ khả thi ($3+3=6$, $1+6=7$) và có chi phí $4+9=13$, tức $1{,}3$ triệu đồng, nên là nghiệm.

**(b) Duy nhất.** Vì $\mu_1,\mu_2>0$, mọi nghiệm làm hai ràng buộc hoạt động (Mệnh đề 02.11(c)). Hệ $3x_1+x_2=6$, $x_1+2x_2=7$ có nghiệm duy nhất $(1,3)$, nên nghiệm duy nhất.

**Kiểm tra lại.** Hai đỉnh khác của miền, $(0,6)$ và $(7,0)$, cho chi phí $18$ và $28$.
:::

::: exercise Bài tập 02.4 (Trung vị và trung điểm)
Một mô hình hằng $\hat y=w_0$ được khớp với ba quan sát $y=(1,2,6)$.

(a) Viết bài toán $\min_{w_0}\sum_i\lvert w_0-y_i\rvert$ thành quy hoạch tuyến tính và chứng minh nghiệm là $w_0^*=2$ (trung vị) với giá trị $5$.

(b) Viết bài toán $\min_{w_0}\max_i\lvert w_0-y_i\rvert$ thành quy hoạch tuyến tính và chứng minh nghiệm là $w_0^*=\tfrac72$ (trung điểm của giá trị nhỏ nhất và lớn nhất) với giá trị $\tfrac52$. Giải thích vì sao hai nghiệm khác nhau.
:::

::: hint
Ở (a), dùng $\lvert w_0-1\rvert+\lvert w_0-6\rvert\ge\lvert(w_0-1)-(w_0-6)\rvert$. Ở (b), dùng $\max(\lvert w_0-1\rvert,\lvert w_0-6\rvert)\ge\tfrac12(\lvert w_0-1\rvert+\lvert6-w_0\rvert)$.
:::

::: solution
**(a) Lập mô hình.** Theo Định lý 02.15: $\min_{w_0,t}t_1+t_2+t_3$ với $-t_i\le w_0-y_i\le t_i$, $i=1,2,3$.

**(a) Cận và nghiệm.** $\lvert w_0-1\rvert+\lvert w_0-6\rvert\ge\lvert(w_0-1)-(w_0-6)\rvert=5$ và $\lvert w_0-2\rvert\ge0$, nên tổng $\ge5$. Tại $w_0=2$: $1+0+4=5$. Duy nhất: tổng bằng $5$ đòi $\lvert w_0-2\rvert=0$.

**(b) Lập mô hình.** Theo Định lý 02.15(c): $\min_{w_0,t}t$ với $-t\le w_0-y_i\le t$.

**(b) Cận.**

$$
\begin{aligned}
&\max_i\lvert w_0-y_i\rvert\\
&\ \ge\max(\lvert w_0-1\rvert,\lvert6-w_0\rvert)\\
&\ \ge\tfrac12(\lvert w_0-1\rvert+\lvert6-w_0\rvert)\\
&\ \ge\tfrac12\lvert(w_0-1)+(6-w_0)\rvert=\tfrac52 .
\end{aligned}
$$

**(b) Nghiệm.** Tại $w_0=\tfrac72$: $\lvert w_0-1\rvert=\tfrac52$, $\lvert w_0-2\rvert=\tfrac32$, $\lvert w_0-6\rvert=\tfrac52$, nên giá trị $\tfrac52$. Duy nhất: đẳng thức đòi $\lvert w_0-1\rvert=\lvert6-w_0\rvert$, tức $w_0=\tfrac72$.

**Diễn giải.** Hai tiêu chí là hai bài toán khác nhau: trung vị không phụ thuộc độ lớn của quan sát $6$, còn trung điểm dịch về phía giá trị đó.

**Kiểm tra lại.** Với $w_0=3$, tổng trị tuyệt đối là $2+1+3=6>5$ và độ lệch lớn nhất là $3>\tfrac52$.
:::

## 6. Quy hoạch bậc hai và ràng buộc bậc hai

Quy hoạch tuyến tính, cùng kỹ thuật biến phụ, xử lý được tổng và cực đại của các hàm affine, nhưng không biểu diễn được tổng bình phương phần dư, một hàm bậc hai của tham số. Do đó, chúng ta cần một lớp bài toán cho phép mục tiêu bậc hai, cùng hai cách kiểm soát độ lớn của tham số là phạt trong mục tiêu và chặn chuẩn trong ràng buộc.

### 6.1. Tổng bình phương phần dư

Với dữ liệu chung, ma trận thiết kế $X$ có hàng $(u_i,1)$ và $w=(w_1,w_0)$, tổng bình phương phần dư (Định nghĩa 01.4) là

$$
\begin{aligned}
J(w)&=\sum_{i=1}^5(w_1u_i+w_0-y_i)^2\\
&=\lVert Xw-y\rVert_2^2 .
\end{aligned}
$$

Hàm $J$ cộng bình phương của từng độ lệch, nên một độ lệch lớn bị phạt nặng hơn nhiều so với vài độ lệch nhỏ. Ví dụ sau so sánh hai đường ứng viên theo tiêu chí này.

::: example Ví dụ 02.11 (Hai đường ứng viên dưới tiêu chí bình phương)
**Dữ kiện.** Dữ liệu chung (Ví dụ 02.1(a)): $u=(-2,-1,0,1,2)$, $y=(-2,-1,3,1,2)$; phần dư $r_i=w_1u_i+w_0-y_i$ và $J(w)=\sum_ir_i^2$.

**Đường thứ nhất.** Đường $\hat y=u$ ($w_1=1$, $w_0=0$) có $r=(0,0,-3,0,0)$ và $J=9$.

**Đường thứ hai.** Đường $\hat y=u+\tfrac35$ ($w_1=1$, $w_0=\tfrac35$) có

$$
\begin{aligned}
r_1&=-2+\tfrac35+2=\tfrac35,\\
r_2&=-1+\tfrac35+1=\tfrac35,\\
r_3&=\tfrac35-3=-\tfrac{12}5,\\
r_4&=1+\tfrac35-1=\tfrac35,\\
r_5&=2+\tfrac35-2=\tfrac35,
\end{aligned}
$$

nên

$$
J=4\cdot\tfrac9{25}+\tfrac{144}{25}=\tfrac{180}{25}=\tfrac{36}5 .
$$

**Kiểm tra lại.** Tổng phần dư của đường thứ hai là $4\cdot\tfrac35-\tfrac{12}5=0$, trong khi đường thứ nhất có tổng phần dư $-3$.
:::

![Năm điểm dữ liệu, đường nét đứt y mũ bằng u và đường nét liền y mũ bằng u cộng 0,6; phần dư của đường nét liền gồm bốn đoạn dài 0,6 và một đoạn dài 2,4 tại (0, 3).](img/lec-02/qp-ls.svg)

Trên hình, đường nét liền chấp nhận bốn sai số nhỏ để giảm sai số tại $(0,3)$ từ $3$ xuống $2{,}4$.

Về mặt hình học, $J$ là đa thức bậc hai theo $(w_1,w_0)$ với phần bậc hai xác định dương ($X^TX=\operatorname{diag}(10,5)\succ0$, Ví dụ 02.1(a)), nên tập mức là các elip đồng tâm. Lớp bài toán cần tìm cho phép mục tiêu bậc hai, nhưng chỉ loại có phần bậc hai nửa xác định dương.

### 6.2. Quy hoạch bậc hai

Để làm rõ lớp bài toán này, xem định nghĩa sau.

::: definition Định nghĩa 02.17 (Quy hoạch bậc hai)
Cho ma trận đối xứng $P\in\mathbb R^{n\times n}$ với $P\succeq0$, vector $q\in\mathbb R^n$, số $\rho_0\in\mathbb R$, và $G,h,A,b$ như Định nghĩa 02.9. *Quy hoạch bậc hai* (quadratic programming, QP) là

$$
\begin{aligned}
&\underset{x\in\mathbb R^n}{\operatorname{minimize}}\\
&\ \ \tfrac12x^TPx+q^Tx+\rho_0\\
&\text{subject to}\\
&\ \ Gx\le h,\ Ax=b .
\end{aligned}
\tag{6.1}
$$
:::

Hệ số $\tfrac12$ là quy ước để gradient bằng $Px+q$. Điều kiện $P\succeq0$ là một phần của định nghĩa: với $P$ không nửa xác định dương, mục tiêu không lồi. Tập khả thi là một đa diện, và quy hoạch tuyến tính là trường hợp $P=0$ của (6.1).

Bình phương nhỏ nhất không ràng buộc là trường hợp $x=w$, $P=2X^TX$, $q=-2X^Ty$, $\rho_0=y^Ty$, không có $G$ và $A$, vì $\lVert Xw-y\rVert_2^2=w^TX^TXw-2y^TXw+y^Ty$. Do $v^T(2X^TX)v=2\lVert Xv\rVert_2^2\ge0$, bình phương nhỏ nhất luôn là quy hoạch bậc hai, kể cả khi $X$ không có hạng cột đầy đủ.

Mệnh đề sau cho điều kiện để quy hoạch bậc hai có đúng một nghiệm.

::: proposition Mệnh đề 02.18 (Tính lồi, tồn tại và duy nhất của quy hoạch bậc hai) — chứng minh đầy đủ
**Giả thiết.** Bài toán (6.1) với $P\succeq0$.

**Kết luận.**

- (a) (6.1) là bài toán tối ưu lồi dạng phổ biến.
- (b) Nếu thêm $P\succ0$ và tập khả thi không rỗng thì (6.1) có đúng một nghiệm.
:::

::: proof Chứng minh Mệnh đề 02.18
**Lộ trình.** Hessian hằng $P$ cho tính lồi; với $P\succ0$, một chặn dưới bậc hai cho tính cưỡng bức, rồi Định lý 01.38 và Định lý 01.34 cho tồn tại và duy nhất.

**Bước 1 (phần (a)).** Hàm $f_0(x)=\tfrac12x^TPx+q^Tx+\rho_0$ thuộc lớp $C^2$ trên $\mathbb R^n$ với $\nabla f_0(x)=Px+q$ và $\nabla^2f_0(x)=P\succeq0$, nên lồi theo Định lý 01.29(a). Các ràng buộc affine, nên bài toán ở dạng (4.1).

**Bước 2 (phần (b): chặn dưới bậc hai).** Theo Mệnh đề 00.18, $x^TPx\ge\lambda_{\min}\lVert x\rVert_2^2$, với $\lambda_{\min}>0$ là giá trị riêng nhỏ nhất của $P\succ0$. Bất đẳng thức Cauchy–Schwarz cho $q^Tx\ge-\lVert q\rVert_2\lVert x\rVert_2$, nên

$$
\begin{aligned}
f_0(x)&\ge\tfrac{\lambda_{\min}}2\lVert x\rVert_2^2-\lVert q\rVert_2\lVert x\rVert_2\\
&\quad+\rho_0 .
\end{aligned}
$$

**Bước 3 (phần (b): tính cưỡng bức và tồn tại).** Vế phải là một đa thức bậc hai theo $\lVert x\rVert_2$ với hệ số bậc hai dương, dần tới $+\infty$ khi $\lVert x\rVert_2\to\infty$, tức $f_0$ cưỡng bức. Tập khả thi là tập nghiệm của hữu hạn bất đẳng thức tuyến tính không chặt và đẳng thức tuyến tính, nên đóng, và không rỗng theo giả thiết; $f_0$ liên tục. Định lý 01.38 cho nghiệm tồn tại.

**Bước 4 (phần (b): duy nhất).** Vì $P\succ0$, $f_0$ lồi chặt theo Định lý 01.29(b), và Định lý 01.34 cho nghiệm duy nhất. $\square$
:::

::: example Ví dụ 02.12 (Nghiệm bình phương nhỏ nhất trên dữ liệu chung)
**Dữ kiện.** Dữ liệu chung (Ví dụ 02.1(a)): $X^TX=\operatorname{diag}(10,5)$, $X^Ty=(10,3)$, $y^Ty=19$, $w=(w_1,w_0)$, $J(w)=\lVert Xw-y\rVert_2^2$.

**Kiểm tra giả thiết.** Bài toán là quy hoạch bậc hai với $P=2X^TX=\operatorname{diag}(20,10)\succ0$, $q=-2X^Ty=(-20,-6)$, $\rho_0=19$, nên có đúng một nghiệm theo Mệnh đề 02.18(b).

**Tính.** Khai triển và bù bình phương, ta có

$$
\begin{aligned}
&J(w)=10w_1^2+5w_0^2\\
&\ \ -20w_1-6w_0+19\\
&=10(w_1-1)^2\\
&\ \ +5\bigl(w_0-\tfrac35\bigr)^2+\tfrac{36}5,
\end{aligned}
\tag{6.2}
$$

với hằng số $19-10-\tfrac95=\tfrac{36}5$. Hai bình phương không âm và bằng $0$ khi $w_1=1$, $w_0=\tfrac35$, nên $w^*=(1,\tfrac35)$ và $J(w^*)=\tfrac{36}5$.

**Kiểm tra lại.** Phương trình chuẩn $X^TXw=X^Ty$ cho $10w_1=10$, $5w_0=3$, cùng nghiệm. Theo (6.2), $J(1,0)=5\cdot\tfrac9{25}+\tfrac{36}5=\tfrac95+\tfrac{36}5=9$, khớp với Ví dụ 02.11.
:::

::: example Ví dụ 02.13 (Bình phương nhỏ nhất với ràng buộc hệ số góc)
**Dữ kiện.** Dữ liệu chung, $w=(w_1,w_0)$: $J(w)=10(w_1-1)^2+5(w_0-\tfrac35)^2+\tfrac{36}5$ theo (6.2); nghiệm không ràng buộc là $(1,\tfrac35)$ với $J=\tfrac{36}5$ (Ví dụ 02.12).

**Lập mô hình.** Giả sử hệ số góc bị chặn bởi $w_1\le\tfrac12$. Bài toán vẫn là quy hoạch bậc hai với $G=[1\ \ 0]$, $h=\tfrac12$. Nghiệm không ràng buộc $(1,\tfrac35)$ vi phạm ràng buộc.

**Tìm ứng viên.** Theo (6.2), với mỗi $w_1$ cố định, hạng $5(w_0-\tfrac35)^2$ nhỏ nhất tại $w_0=\tfrac35$. Hạng $10(w_1-1)^2$ giảm khi $w_1$ tăng về $1$, nên trên $w_1\le\tfrac12$ nhỏ nhất tại $w_1=\tfrac12$. Ứng viên $w^*=(\tfrac12,\tfrac35)$, với

$$
\begin{aligned}
J(w^*)&=10\cdot\tfrac14+\tfrac{36}5\\
&=\tfrac52+\tfrac{36}5=\tfrac{97}{10}.
\end{aligned}
$$

**Chứng nhận bằng (4.2).** $\nabla J(w)=(20(w_1-1),\ 10(w_0-\tfrac35))$ theo (6.2), nên $\nabla J(w^*)=(-10,0)$. Với mọi $w$ khả thi, $\nabla J(w^*)^T(w-w^*)=-10(w_1-\tfrac12)\ge0$ vì $w_1\le\tfrac12$. Theo Hệ quả 02.4(c), $w^*$ là nghiệm; nó duy nhất theo Mệnh đề 02.18(b).

**Kiểm tra lại.** Điểm khả thi $(0,\tfrac35)$ cho $J=10+\tfrac{36}5=\tfrac{86}5=17{,}2>9{,}7$. Theo Mệnh đề 01.15, thêm ràng buộc làm giá trị tối ưu tăng từ $7{,}2$ lên $9{,}7$, không giảm.
:::

![Mặt phẳng (hệ số góc, hệ số chặn): các elip đồng tâm của tổng bình phương phần dư quanh nghiệm tự do (1; 0,6), nửa mặt phẳng hệ số góc ≤ 0,5 tô nhạt, nghiệm có ràng buộc (0,5; 0,6) là điểm tiếp xúc của một elip với biên.](img/lec-02/qp-geometry.svg)

Trên hình, nghiệm có ràng buộc là điểm tiếp xúc giữa miền và đường mức elip có giá trị $J$ nhỏ nhất còn giao với miền.

Tại đó, gradient $(-10,0)$ vuông góc với biên $w_1=\tfrac12$ và $-\nabla J$ chỉ ra ngoài miền, nên không dịch chuyển khả thi nào làm $J$ giảm theo xấp xỉ bậc nhất. Đó là nội dung hình học của điều kiện (4.2).

::: remark Nhận xét 02.19 (Vai trò của giả thiết $P\succ0$)
So với Hệ quả 01.5, vốn không cho ràng buộc, Mệnh đề 02.18(b) cho phép ràng buộc tuyến tính tùy ý nhưng cần thêm giả thiết $P\succ0$, tức $\operatorname{rank}X=d$ với bình phương nhỏ nhất.

Nhầm lẫn thường gặp là suy ra có nghiệm chỉ từ $P\succeq0$: bài toán $\min_{x\in\mathbb R^2}x_1^2+x_2$ có $P=\operatorname{diag}(2,0)\succeq0$ và giá trị $-\infty$ khi $x_2\to-\infty$.
:::

### 6.3. Chính quy hóa: bốn tổ hợp sai số và số hạng phạt

Khi $\operatorname{rank}X<d$, hệ số bình phương nhỏ nhất không duy nhất (Hệ quả 01.5). Một cách kiểm soát hiện tượng này là cộng vào mục tiêu một *số hạng phạt* (penalty term) đo độ lớn của $w$, như $\lVert w\rVert_1=\lvert w_1\rvert+\lvert w_0\rvert$ hoặc $\lVert w\rVert_2^2=w_1^2+w_0^2$.

![Hình thoi có tổng trị tuyệt đối hai tọa độ bằng 0,8, đỉnh nằm trên hai trục, và đường tròn bán kính 0,8.](img/lec-02/qp-penalties.svg)

Về mặt hình học, tập mức của $\lVert w\rVert_1$ trên hình là hình thoi có đỉnh nằm trên các trục: khi một đường mức elip của sai số tiếp xúc với hình thoi tại một đỉnh, một tọa độ của điểm tiếp xúc bằng $0$. Tập mức của $\lVert w\rVert_2^2$ là đường tròn, không có đỉnh (Murphy (2022), §11.4.2). Do đó, chính quy hóa chuẩn một có thể cho một hệ số bằng đúng $0$, còn chính quy hóa bậc hai thu nhỏ hệ số. Để kiểm tra trực giác này trên một hệ số, xem ví dụ sau.

::: example Ví dụ 02.14 (Phạt một hệ số: thu nhỏ và triệt tiêu)
**Dữ kiện.** Dữ liệu chung; hệ số góc giữ cố định $w_1=1$. Theo (6.2), sai số theo hệ số chặn là $5(w_0-\tfrac35)^2+\tfrac{36}5$, nhỏ nhất tại $w_0=\tfrac35$.

**Phạt bình phương.** Cực tiểu $5(w_0-\tfrac35)^2+\lambda w_0^2$: đạo hàm $10(w_0-\tfrac35)+2\lambda w_0=0$ cho $w_0=\tfrac3{5+\lambda}$, bằng $\tfrac3{10}$ khi $\lambda=5$ và $\tfrac15$ khi $\lambda=10$, luôn dương.

**Phạt trị tuyệt đối.** Cực tiểu $5(w_0-\tfrac35)^2+\lambda\lvert w_0\rvert$.

- Trên $w_0>0$, đạo hàm $10(w_0-\tfrac35)+\lambda=0$ cho $w_0=\tfrac35-\tfrac\lambda{10}$, dương khi $\lambda<6$.
- Khi $\lambda\ge6$, hàm tăng trên $w_0>0$ (đạo hàm $\ge10w_0>0$) và giảm trên $w_0<0$ (đạo hàm $10(w_0-\tfrac35)-\lambda<0$), nên nghiệm là $w_0=0$.

**Kiểm tra lại.** Với $\lambda=5$ và phạt bình phương: $10(\tfrac3{10}-\tfrac35)+10\cdot\tfrac3{10}=-3+3=0$. Với $\lambda=4$ và phạt trị tuyệt đối: $w_0=\tfrac15$ và $10(\tfrac15-\tfrac35)+4=0$.

**Diễn giải.** Hai phép phạt cùng làm $w_0$ dịch về $0$; chỉ phép phạt trị tuyệt đối đặt $w_0$ bằng đúng $0$, từ $\lambda=6$.
:::

Bài toán tổng quát, với hai lựa chọn cho sai số và hai cho số hạng phạt, được phát biểu theo định nghĩa sau.

::: definition Định nghĩa 02.20 (Bài toán hồi quy có chính quy hóa)
Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$, $r=Xw-y$ và $\lambda\ge0$. *Bài toán hồi quy có chính quy hóa* (regularized regression) là

$$
\underset{w\in\mathbb R^d}{\operatorname{minimize}}\quad L(w)+\lambda R(w),
$$

với hàm sai số $L(w)\in\{\lVert r\rVert_1,\ \lVert r\rVert_2^2\}$ và hàm phạt $R(w)\in\{\lVert w\rVert_1,\ \lVert w\rVert_2^2\}$.

Bốn tổ hợp được ký hiệu $\ell_1+\ell_1$, $\ell_1+\ell_2^2$, $\ell_2^2+\ell_1$, $\ell_2^2+\ell_2^2$, theo thứ tự (sai số, số hạng phạt). Tổ hợp $\ell_2^2+\ell_1$ là *LASSO* (least absolute shrinkage and selection operator); tổ hợp $\ell_2^2+\ell_2^2$ là *hồi quy ridge* (còn gọi là chính quy hóa Tikhonov; ridge regression).
:::

Trong định nghĩa trên, $\lambda$ là dữ liệu do người lập mô hình chọn, và $\lambda=0$ cho lại bài toán không chính quy hóa.

Nghiệm của $L+\lambda R$ nói chung khác nghiệm của $L$ (Ví dụ 02.14), và hai giá trị mục tiêu không cùng thước đo.

Các ví dụ trên dữ liệu chung phạt cả hệ số chặn $w_0$; hồi quy ridge trong thực hành không phạt hệ số chặn (Murphy (2022), §11.3).

Bốn tổ hợp được phân lớp và chứng nhận nghiệm theo mệnh đề sau.

::: proposition Mệnh đề 02.21 (Phân lớp và nghiệm của bốn tổ hợp) — chứng minh đầy đủ
**Giả thiết.** Bài toán của Định nghĩa 02.20 với $\lambda>0$.

**Kết luận.**

- (a) Sau khi thêm biến phụ theo Định lý 02.15 cho mỗi hạng chuẩn một, tổ hợp $\ell_1+\ell_1$ là quy hoạch tuyến tính, ba tổ hợp còn lại là quy hoạch bậc hai; tổ hợp $\ell_2^2+\ell_2^2$ không cần biến phụ và có $P=2(X^TX+\lambda I_d)\succ0$.
- (b) Cả bốn bài toán có nghiệm.
- (c) Hai tổ hợp có số hạng phạt $\ell_2^2$ có đúng một nghiệm; tổ hợp $\ell_2^2+\ell_1$ có đúng một nghiệm nếu $\operatorname{rank}X=d$.
:::

::: proof Chứng minh Mệnh đề 02.21
**Lộ trình.** Định lý 02.15 thay các hạng chuẩn một bằng biến phụ; tính cưỡng bức của hàm phạt cho sự tồn tại, và một hạng lồi chặt cho tính duy nhất.

**Bước 1 (phần (a): thêm biến phụ).** Viết $\lVert r\rVert_1=\sum_i\max(r_i,-r_i)$ và $\lVert w\rVert_1=\sum_j\max(w_j,-w_j)$, tổng các cực đại của hàm affine theo $w$. Định lý 02.15 với $C=\mathbb R^d$ thay mỗi hạng bằng một biến phụ $t_i$ (cho phần dư) hoặc $v_j$ (cho hệ số) cùng hai ràng buộc tuyến tính, và giữ nguyên phần còn lại $f_0$.

**Bước 2 (phần (a): phân lớp từng tổ hợp).**

- Với $\ell_1+\ell_1$, $f_0=0$ và mục tiêu mới $\mathbf 1^Tt+\lambda\mathbf 1^Tv$ tuyến tính, nên bài toán là quy hoạch tuyến tính.
- Với $\ell_1+\ell_2^2$, $f_0(w)=\lambda w^Tw$, và mục tiêu mới theo biến $(w,t)$ có ma trận bậc hai $\operatorname{diag}(2\lambda I_d,0)\succeq0$.
- Với $\ell_2^2+\ell_1$, $f_0(w)=\lVert Xw-y\rVert_2^2$, và ma trận bậc hai theo $(w,v)$ là $\operatorname{diag}(2X^TX,0)\succeq0$.
- Với $\ell_2^2+\ell_2^2$, khai triển cho $w^T(X^TX+\lambda I)w-2y^TXw+y^Ty$, nên $P=2(X^TX+\lambda I)$. Ngoài ra $v^T(X^TX+\lambda I)v=\lVert Xv\rVert_2^2+\lambda\lVert v\rVert_2^2>0$ khi $v\ne0$, nên $P\succ0$.

**Bước 3 (phần (b): tồn tại).** Mục tiêu liên tục trên $\mathbb R^d$ và không nhỏ hơn $\lambda R(w)$, vì $L\ge0$. Hàm phạt $R$ là hàm cưỡng bức, do $\lVert w\rVert_2^2\to\infty$ khi $\lVert w\rVert_2\to\infty$ và $\lVert w\rVert_1\ge\lVert w\rVert_2$. Bất đẳng thức thứ hai đúng vì

$$
\begin{aligned}
\lVert w\rVert_1^2&=\textstyle\sum_jw_j^2+\sum_{j\ne k}\lvert w_j\rvert\lvert w_k\rvert\\
&\ge\lVert w\rVert_2^2 .
\end{aligned}
$$

Vậy mục tiêu cưỡng bức, và Định lý 01.38 với $C=\mathbb R^d$ cho nghiệm tồn tại.

**Bước 4 (phần (c): duy nhất).**

- Hàm $\lambda\lVert w\rVert_2^2$ có Hessian $2\lambda I\succ0$ nên lồi chặt; cộng với hàm lồi $L$ cho hàm lồi chặt theo Định lý 01.30(a).
- Với $\ell_2^2+\ell_1$ và $\operatorname{rank}X=d$, $J$ có Hessian $2X^TX\succ0$ nên lồi chặt, và cộng với hàm lồi $\lambda\lVert w\rVert_1$ cho hàm lồi chặt.

Trong các trường hợp này, Định lý 01.34 cho nhiều nhất một nghiệm, và (b) cho ít nhất một. $\square$
:::

Tổ hợp $\ell_1+\ell_1$ có thể có vô số nghiệm, chẳng hạn trên dữ liệu chung với $\lambda=6$. Công thức dạng đóng có cho $\ell_2^2+\ell_2^2$, và cho $\ell_2^2+\ell_1$ khi $X^TX$ chéo.

Với $\ell_2^2+\ell_1$, khi hai cột của $X$ trùng nhau và tổng hệ số của chúng tại nghiệm khác $0$, có thể chia hệ số cùng dấu giữa hai cột theo vô số cách mà không đổi sai số lẫn $\lVert w\rVert_1$.

Với dữ liệu chung, $X^TX=\operatorname{diag}(10,5)$ chéo, và theo (6.2) mục tiêu của LASSO tách thành hai bài toán một biến độc lập, mỗi bài toán có dạng $a(s-s_0)^2+\lambda\lvert s\rvert$. Bổ đề sau giải bài toán một biến đó.

::: lemma Bổ đề 02.22 (Ngưỡng mềm, soft thresholding) — chứng minh đầy đủ
**Giả thiết.** $\eta>0$, $\lambda\ge0$, $s_0\in\mathbb R$; $\mathcal Q(s)=\eta(s-s_0)^2+\lambda\lvert s\rvert$ trên $\mathbb R$.

**Kết luận.** $\mathcal Q$ có đúng một điểm cực tiểu

$$
\begin{aligned}
&s^*=\operatorname{sign}(s_0)\\
&\ \times\max\Bigl(\lvert s_0\rvert-\frac{\lambda}{2\eta},0\Bigr),
\end{aligned}
\tag{6.3}
$$

trong đó $\operatorname{sign}(s_0)$ bằng $1$, $0$, $-1$ khi $s_0>0$, $s_0=0$, $s_0<0$. Đặc biệt $s^*=0$ khi và chỉ khi $\lvert s_0\rvert\le\lambda/(2\eta)$.
:::

::: proof Chứng minh Bổ đề 02.22
**Lộ trình.** Trên mỗi nửa trục, $\mathcal Q$ là một parabol hướng lên; so sánh hai cực tiểu trên hai nửa trục theo vị trí của $s_0$.

**Bước 1 (bù bình phương trên mỗi nửa trục).** Đặt $\kappa=\lambda/(2\eta)\ge0$. Bù bình phương cho $\eta(s-s_0)^2\pm\lambda s=\eta s^2-2\eta(s_0\mp\kappa)s+\eta s_0^2$, nên

$$
\mathcal Q(s)=\begin{cases}\eta\bigl(s-(s_0-\kappa)\bigr)^2+c_+,\\ \qquad s\in[0,\infty),\\[2pt] \eta\bigl(s-(s_0+\kappa)\bigr)^2+c_-,\\ \qquad s\in(-\infty,0],\end{cases}
$$

với các hằng số $c_\pm$ không phụ thuộc $s$. Trên mỗi nửa trục, $\mathcal Q$ là parabol hướng lên, nên đạt cực tiểu duy nhất tại điểm của nửa trục gần đỉnh nhất.

**Bước 2 (xét ba trường hợp).**

- Trường hợp $s_0>\kappa$. Đỉnh $s_0-\kappa>0$ thuộc $[0,\infty)$, nên cực tiểu trên nửa trục phải tại $s_0-\kappa$. Đỉnh $s_0+\kappa>0$ nằm ngoài $(-\infty,0]$, nên cực tiểu trên nửa trục trái tại $s=0$. Điểm này cũng thuộc nửa trục phải, nên giá trị đó không nhỏ hơn cực tiểu trên nửa trục phải. Vậy $s^*=s_0-\kappa$, khớp (6.3).
- Trường hợp $\lvert s_0\rvert\le\kappa$. Đỉnh $s_0-\kappa\le0$ nên cực tiểu trên nửa trục phải tại $0$; đỉnh $s_0+\kappa\ge0$ nên cực tiểu trên nửa trục trái tại $0$. Vậy $s^*=0$.
- Trường hợp $s_0<-\kappa$ đối xứng với trường hợp đầu, cho $s^*=s_0+\kappa=-(\lvert s_0\rvert-\kappa)$.

**Bước 3 (duy nhất).** Trong mọi trường hợp, cực tiểu trên mỗi nửa trục duy nhất (parabol hướng lên với $\eta>0$). Hai ứng viên hoặc trùng nhau tại $0$, hoặc cho giá trị khác nhau với ứng viên tại $0$ bị loại, nên $s^*$ duy nhất. $\square$
:::

Bổ đề áp dụng cho nhiều biến khi mục tiêu tách thành tổng các bài toán một biến, như khi $X^TX$ chéo. Khi $X^TX$ không chéo, các tọa độ liên kết với nhau, và áp dụng (6.3) cho từng tọa độ của nghiệm bình phương nhỏ nhất không cho nghiệm LASSO.

Trong khi đó, với chính quy hóa bậc hai, bài toán một biến $\eta(s-s_0)^2+\lambda s^2$ có nghiệm $\eta s_0/(\eta+\lambda)$, khác $0$ khi $s_0\ne0$.

Hồi quy ridge và *suy giảm trọng số* (weight decay) trong huấn luyện mạng dùng cùng số hạng phạt; Mệnh đề 02.21(c) cho nghiệm duy nhất kể cả khi các đặc trưng phụ thuộc tuyến tính, như Ví dụ 01.16. LASSO được dùng để chọn đặc trưng: khi các cột của $X$ trực giao, Bổ đề 02.22 cho hệ số của một đặc trưng bằng đúng $0$ khi tương quan của nó với đầu ra yếu so với $\lambda$.

Bốn ví dụ sau giải lần lượt bốn tổ hợp trên dữ liệu chung.

::: example Ví dụ 02.15 (Tổ hợp $\ell_1+\ell_1$: nghiệm và tập nghiệm)
**Dữ kiện.** Dữ liệu chung (Ví dụ 02.1(a)); với $\delta=w_1-1$, $r=(w_0-2\delta,\,w_0-\delta,\,w_0-3,\,w_0+\delta,\,w_0+2\delta)$; $\lVert y\rVert_1=9$.

**Bước 1 (cận dưới chung).** Xét $\min_w\lVert r\rVert_1+\lambda(\lvert w_1\rvert+\lvert w_0\rvert)$ trên dữ liệu chung. Với $\delta=w_1-1$, bất đẳng thức tam giác áp dụng cho hiệu của hai cặp đối xứng cho

$$
\begin{aligned}
&\lvert w_0-\delta\rvert+\lvert w_0+\delta\rvert\\
&\quad\ge\lvert(w_0+\delta)-(w_0-\delta)\rvert\\
&\quad=2\lvert\delta\rvert,\\
&\lvert w_0-2\delta\rvert+\lvert w_0+2\delta\rvert\ge4\lvert\delta\rvert,
\end{aligned}
$$

và $\lvert w_0-3\rvert\ge3-\lvert w_0\rvert$. Cộng lại, $\lVert r\rVert_1\ge6\lvert w_1-1\rvert+3-\lvert w_0\rvert$, nên mục tiêu không nhỏ hơn

$$
\begin{aligned}
&\bigl(6\lvert w_1-1\rvert+\lambda\lvert w_1\rvert\bigr)\\
&\quad+3+(\lambda-1)\lvert w_0\rvert .
\end{aligned}
$$

**Bước 2 ($\lambda=4$).** Hàm $6\lvert w_1-1\rvert+4\lvert w_1\rvert$ bằng

- $6-10w_1$ khi $w_1\le0$;
- $6-2w_1$ khi $0\le w_1\le1$;
- $10w_1-6$ khi $w_1\ge1$;

nhỏ nhất bằng $4$ duy nhất tại $w_1=1$. Hạng $3\lvert w_0\rvert\ge0$ bằng $0$ duy nhất tại $w_0=0$. Mục tiêu $\ge7$, đạt tại $(1,0)$ (sai số $3$, phạt $4$), nên $w^*=(1,0)$ là nghiệm duy nhất.

**Bước 3 ($\lambda=8$).** $6\lvert w_1-1\rvert+8\lvert w_1\rvert$ nhỏ nhất bằng $6$ tại $w_1=0$. Mục tiêu $\ge9$, đạt tại $(0,0)$ với sai số $\lVert y\rVert_1=9$ và phạt $0$.

**Bước 4 ($\lambda=6$: tập nghiệm là một đoạn).** $6\lvert w_1-1\rvert+6\lvert w_1\rvert=6$ với mọi $w_1\in[0,1]$, nên mục tiêu $\ge9$. Tại $(w_1,0)$ với $w_1\in[0,1]$, $\delta=w_1-1\le0$ và $\lvert w_0\rvert=0\le\lvert\delta\rvert$, nên hai bất đẳng thức cặp chặt và $\lVert r\rVert_1=6(1-w_1)+3$. Mục tiêu bằng $6(1-w_1)+3+6w_1=9$. Mọi điểm của đoạn nối $(0,0)$ và $(1,0)$ là nghiệm.

Ngược lại, một nghiệm có mục tiêu $9$ phải làm cận chặt, tức $6\lvert w_1-1\rvert+6\lvert w_1\rvert=6$ và $5\lvert w_0\rvert=0$, nên $w_1\in[0,1]$, $w_0=0$: tập nghiệm nằm trong đoạn đó.

**Kiểm tra lại.** Với $\lambda=6$ và $w=(\tfrac12,0)$: $r=(1,\tfrac12,-3,-\tfrac12,-1)$, $\lVert r\rVert_1=6$, phạt $3$, tổng $9$. Tập nghiệm là một đoạn, lồi, đúng với Hệ quả 02.4(b), và không duy nhất.
:::

::: example Ví dụ 02.16 (Tổ hợp $\ell_1+\ell_2^2$ với $\lambda=4$)
**Dữ kiện.** Dữ liệu chung; với $\delta=w_1-1$, $r=(w_0-2\delta,\,w_0-\delta,\,w_0-3,\,w_0+\delta,\,w_0+2\delta)$. Hai bất đẳng thức cặp của Ví dụ 02.15 cho $\lVert r\rVert_1\ge6\lvert w_1-1\rvert+\lvert w_0-3\rvert$.

**Kiểm tra giả thiết.** Mục tiêu $V(w)=\lVert r\rVert_1+4(w_1^2+w_0^2)$ lồi chặt, nên có đúng một nghiệm (Mệnh đề 02.21(c)).

**Bước 1 (cận dưới).** Từ Ví dụ 02.15, $\lVert r\rVert_1\ge6\lvert w_1-1\rvert+\lvert w_0-3\rvert\ge6\lvert w_1-1\rvert+3-w_0$, nên

$$
\begin{aligned}
V(w)&\ge\bigl(6\lvert w_1-1\rvert+4w_1^2\bigr)\\
&\quad+\bigl(4w_0^2-w_0\bigr)+3 .
\end{aligned}
$$

**Bước 2 (cực tiểu từng phần).**

- Phần theo $w_0$: $4w_0^2-w_0=4(w_0-\tfrac18)^2-\tfrac1{16}\ge-\tfrac1{16}$, dấu bằng tại $w_0=\tfrac18$.
- Phần theo $w_1$: với $w_1\le1$, $6(1-w_1)+4w_1^2=4(w_1-\tfrac34)^2+\tfrac{15}4\ge\tfrac{15}4$, dấu bằng tại $w_1=\tfrac34$; với $w_1\ge1$, $4w_1^2+6w_1-6$ tăng và $\ge4>\tfrac{15}4$.

Vậy $V\ge\tfrac{15}4-\tfrac1{16}+3=\tfrac{107}{16}$.

**Bước 3 (cận đạt).** Tại $w=(\tfrac34,\tfrac18)$:

$$
\begin{aligned}
r_1&=-\tfrac32+\tfrac18+2=\tfrac58,\\
r_2&=-\tfrac34+\tfrac18+1=\tfrac38,\\
r_3&=\tfrac18-3=-\tfrac{23}8,\\
r_4&=\tfrac34+\tfrac18-1=-\tfrac18,\\
r_5&=\tfrac32+\tfrac18-2=-\tfrac38 .
\end{aligned}
$$

Tổng trị tuyệt đối $\tfrac{5+3+23+1+3}8=\tfrac{35}8$, phạt $4(\tfrac9{16}+\tfrac1{64})=\tfrac{37}{16}$, và $V=\tfrac{70}{16}+\tfrac{37}{16}=\tfrac{107}{16}$. Cận đạt, nên $w^*=(\tfrac34,\tfrac18)$.

**Kiểm tra lại.** $V(1,0)=3+4=7=\tfrac{112}{16}>\tfrac{107}{16}$. Ba bất đẳng thức tạo cận đều chặt tại $w^*$: $\lvert w_0\rvert=\tfrac18\le\lvert\delta\rvert=\tfrac14$ cho hai bất đẳng thức cặp, và $w_0\le3$ cho $\lvert w_0-3\rvert=3-w_0$.
:::

::: example Ví dụ 02.17 (Tổ hợp $\ell_2^2+\ell_1$: LASSO trên dữ liệu chung)
**Dữ kiện.** Dữ liệu chung, $w=(w_1,w_0)$: $J(w)=10(w_1-1)^2+5(w_0-\tfrac35)^2+\tfrac{36}5$ theo (6.2).

**Tách biến.** Theo (6.2),

$$
\begin{aligned}
&J(w)+\lambda(\lvert w_1\rvert+\lvert w_0\rvert)\\
&\ =\bigl[10(w_1-1)^2+\lambda\lvert w_1\rvert\bigr]\\
&\ \ +\bigl[5(w_0-\tfrac35)^2+\lambda\lvert w_0\rvert\bigr]\\
&\ \ +\tfrac{36}5,
\end{aligned}
$$

tổng của hai bài toán một biến độc lập. Bổ đề 02.22 với $(\eta,s_0)=(10,1)$ và $(5,\tfrac35)$ cho

$$
\begin{aligned}
w_1(\lambda)&=\max\Bigl(1-\frac{\lambda}{20},0\Bigr),\\
w_0(\lambda)&=\max\Bigl(\frac35-\frac{\lambda}{10},0\Bigr).
\end{aligned}
$$

**Tính.**

- Với $\lambda=4$: $w^*=(\tfrac45,\tfrac15)$, $J=10\cdot\tfrac1{25}+5\cdot\tfrac4{25}+\tfrac{36}5=\tfrac{10+20+180}{25}=\tfrac{42}5$, phạt $4$, mục tiêu $\tfrac{62}5$.
- Với $\lambda=8$: $w^*=(\tfrac35,0)$, hệ số chặn bằng đúng $0$.
- Ngưỡng triệt tiêu: $w_0(\lambda)=0$ khi $\lambda\ge6$, $w_1(\lambda)=0$ khi $\lambda\ge20$.

**Kiểm tra lại.** Với $\lambda=4$, đạo hàm của phần theo $w_1$ tại $w_1=\tfrac45>0$ là $20(\tfrac45-1)+4=0$, và của phần theo $w_0$ tại $w_0=\tfrac15>0$ là $10(\tfrac15-\tfrac35)+4=0$.

**Diễn giải.** Hệ số chặn về $0$ trước hệ số góc vì $\lvert s_0\rvert$ của nó ($\tfrac35$) nhỏ hơn và độ cong $\eta$ của nó ($5$) nhỏ hơn. Do đó ngưỡng $2\eta\lvert s_0\rvert$ của nó ($6$) nhỏ hơn ngưỡng của hệ số góc ($20$).
:::

::: example Ví dụ 02.18 (Tổ hợp $\ell_2^2+\ell_2^2$: hồi quy ridge với $\lambda=10$)
**Dữ kiện.** Dữ liệu chung: $X^TX=\operatorname{diag}(10,5)$, $X^Ty=(10,3)$, $J(w)$ theo (6.2); nghiệm bình phương nhỏ nhất là $(1,\tfrac35)$ (Ví dụ 02.12).

**Tính nghiệm.** Mục tiêu $J(w)+10\lVert w\rVert_2^2$ có gradient $2(X^TX+10I)w-2X^Ty$, bằng $0$ khi $(X^TX+10I)w=X^Ty$; theo Hệ quả 02.4(c) và Mệnh đề 02.21(c), đây là nghiệm duy nhất, tức $20w_1=10$ và $15w_0=3$: $w^*=(\tfrac12,\tfrac15)$.

**Tính giá trị.** Theo (6.2),

$$
\begin{aligned}
J(w^*)&=10\cdot\tfrac14+5\cdot\tfrac4{25}+\tfrac{36}5\\
&=\tfrac52+\tfrac45+\tfrac{36}5=\tfrac{21}2 .
\end{aligned}
$$

Phạt bằng $10(\tfrac14+\tfrac1{25})=\tfrac{29}{10}$, và mục tiêu bằng $\tfrac{21}2+\tfrac{29}{10}=\tfrac{67}5$.

**Kiểm tra lại.** So với nghiệm bình phương nhỏ nhất $(1,\tfrac35)$, mỗi hệ số bị nhân với $\eta/(\eta+\lambda)$ theo công thức một biến: $10/20=\tfrac12$ cho $w_1$ và $5/15=\tfrac13$ cho $w_0$. Không hệ số nào bằng $0$.
:::

Bảng sau đặt bốn nghiệm cạnh nhau; mỗi giá trị ở cột cuối tính theo mục tiêu của chính dòng đó, nên các giá trị này không so sánh được với nhau.

| Sai số + phạt | $\lambda$ | $w^*$ | Lớp sau biến đổi | Giá trị mục tiêu |
|---|---:|---|---|---:|
| $\ell_1+\ell_1$ | $4$ | $(1,0)$ | quy hoạch tuyến tính | $7$ |
| $\ell_1+\ell_2^2$ | $4$ | $(\tfrac34,\tfrac18)$ | quy hoạch bậc hai | $\tfrac{107}{16}$ |
| $\ell_2^2+\ell_1$ | $4$ | $(\tfrac45,\tfrac15)$ | quy hoạch bậc hai | $\tfrac{62}5$ |
| $\ell_2^2+\ell_2^2$ | $10$ | $(\tfrac12,\tfrac15)$ | quy hoạch bậc hai | $\tfrac{67}5$ |

![Năm điểm dữ liệu chung và bốn đường hồi quy có chính quy hóa theo chú giải: (hệ số góc, hệ số chặn) bằng (1; 0), (0,75; 0,125), (0,8; 0,2) và (0,5; 0,2).](img/lec-02/qp-regularized.svg)

Trên hình, chỉ đường $\ell_1+\ell_1$ đi qua đúng bốn điểm thẳng hàng $(-2,-2)$, $(-1,-1)$, $(1,1)$, $(2,2)$. Ba đường còn lại có hệ số góc nhỏ hơn $1$ và hệ số chặn dương.

::: remark Nhận xét 02.23 (Ba nhầm lẫn về chính quy hóa)
1. Coi chính quy hóa là biến đổi tương đương (Nhận xét 02.7).
2. Cho rằng số hạng phạt chuẩn một luôn làm hệ số bằng $0$: với $\lambda=4$, Ví dụ 02.17 cho cả hai hệ số khác $0$; Bổ đề 02.22 cho đúng ngưỡng.
3. Bỏ qua thang đo: đổi đơn vị một đặc trưng từ mét sang centimét chia hệ số của nó cho $100$ và đổi kết quả chọn đặc trưng của LASSO, nên cần chuẩn hóa đặc trưng trước khi giải (Murphy (2022), §10.2.8, nêu cùng lý do cho số hạng phạt $\ell_2$).
:::

### 6.4. Chặn độ lớn hệ số và quy hoạch bậc hai có ràng buộc bậc hai

Số hạng phạt $\lambda\lVert w\rVert_2^2$ làm tăng giá trị mục tiêu khi hệ số lớn nhưng không loại các hệ số đó. Yêu cầu chuẩn hệ số không vượt một mức cố định là một *ràng buộc chặn chuẩn* (norm constraint). Trên dữ liệu chung, ràng buộc chặn chuẩn $\lVert w\rVert_2^2\le\tfrac{29}{100}$ loại nghiệm bình phương nhỏ nhất, vốn có $\lVert w\rVert_2^2=\tfrac{34}{25}$.

Về mặt hình học, tập $\{w\mid\lVert w\rVert_2^2\le\Delta^2\}$ là hình tròn, lồi, nên chúng ta cần một lớp bài toán cho phép ràng buộc bậc hai lồi. Để làm rõ lớp bài toán này, xem định nghĩa sau.

::: definition Định nghĩa 02.24 (Quy hoạch bậc hai có ràng buộc bậc hai)
Cho các ma trận đối xứng $P_0,P_1,\ldots,P_m\in\mathbb R^{n\times n}$ với $P_i\succeq0$, các vector $q_i\in\mathbb R^n$, các số $\rho_i\in\mathbb R$, và $A,b$ như Định nghĩa 02.1. *Quy hoạch bậc hai có ràng buộc bậc hai* (quadratically constrained quadratic programming, QCQP) là

$$
\begin{aligned}
&\underset{x\in\mathbb R^n}{\operatorname{minimize}}\\
&\ \ \tfrac12x^TP_0x+q_0^Tx+\rho_0\\
&\text{subject to}\\
&\ \ \tfrac12x^TP_ix+q_i^Tx+\rho_i\le0,\\
&\ \ i=1,\ldots,m,\quad Ax=b .
\end{aligned}
\tag{6.4}
$$
:::

Trong định nghĩa trên, mỗi ràng buộc của (6.4) là một hàm bậc hai lồi không vượt $0$, và khi $P_i\succ0$, tập ứng với nó là một elip đặc (có thể rỗng hoặc suy biến thành một điểm).

Quy hoạch bậc hai là trường hợp $P_1=\cdots=P_m=0$. Ràng buộc chặn chuẩn $\lVert w\rVert_2^2\le\Delta^2$ có $P_1=2I$, $q_1=0$, $\rho_1=-\Delta^2$.

Thiếu điều kiện $P_i\succeq0$, tập khả thi có thể không lồi: $x_1^2-x_2^2\le1$ chứa $(2,\sqrt3)$ và $(2,-\sqrt3)$ (cả hai cho $4-3=1$) mà không chứa trung điểm $(2,0)$ (cho $4>1$).

Áp dụng Định lý 01.29 cho từng hàm và Mệnh đề 02.2 cho tập khả thi, ta được tính lồi của lớp này trong mệnh đề sau.

::: proposition Mệnh đề 02.25 (Tính lồi của quy hoạch bậc hai có ràng buộc bậc hai) — chứng minh đầy đủ
**Giả thiết.** Bài toán (6.4) với $P_i\succeq0$, $i=0,\ldots,m$.

**Kết luận.**

- (a) (6.4) là bài toán tối ưu lồi dạng phổ biến; tập khả thi là giao của $m$ tập mức dưới lồi với một tập affine.
- (b) Nếu thêm $P_i\succ0$ với một $i\ge1$ thì tập khả thi đóng và bị chặn; khi tập này không rỗng, Định lý 01.35 cho nghiệm tồn tại.
:::

::: proof Chứng minh Mệnh đề 02.25
**Lộ trình.** Điều kiện bậc hai cho tính lồi của từng hàm; một chặn dưới bậc hai cho tính bị chặn.

**Bước 1 (phần (a)).** Mỗi hàm $f_i(x)=\tfrac12x^TP_ix+q_i^Tx+\rho_i$ có Hessian $P_i\succeq0$, nên lồi theo Định lý 01.29(a). Các đẳng thức affine, nên bài toán ở dạng (4.1), và Mệnh đề 02.2 cho tập khả thi lồi.

**Bước 2 (phần (b)).** Nếu $P_i\succ0$ với giá trị riêng nhỏ nhất $\lambda_{\min}>0$ thì $x^TP_ix\ge\lambda_{\min}\lVert x\rVert_2^2$ theo Mệnh đề 00.18, và $q_i^Tx\ge-\lVert q_i\rVert_2\lVert x\rVert_2$ theo Cauchy–Schwarz. Do đó

$$
\begin{aligned}
f_i(x)&\ge\tfrac{\lambda_{\min}}2\lVert x\rVert_2^2-\lVert q_i\rVert_2\lVert x\rVert_2\\
&\quad+\rho_i,
\end{aligned}
$$

nên $f_i(x)\le0$ kéo theo $\lVert x\rVert_2$ bị chặn. Tập khả thi đóng vì các $f_i$ liên tục và $\{x\mid Ax=b\}$ đóng; $f_0$ là đa thức nên liên tục, và Định lý 01.35 cho phần còn lại. $\square$
:::

Mệnh đề 02.25 cần $P_i\succeq0$ cho mọi $i$, kể cả $i=0$. Số hạng phạt và ràng buộc chặn chuẩn liên hệ với nhau theo mệnh đề sau; mệnh đề này không cần tính lồi.

::: proposition Mệnh đề 02.26 (Nghiệm của bài toán có phạt là nghiệm của bài toán có ràng buộc chặn chuẩn) — chứng minh đầy đủ
**Giả thiết.** $L,R:\mathbb R^d\to\mathbb R$ tùy ý, $\lambda\ge0$, và $w_\lambda$ là một nghiệm của $\min_w L(w)+\lambda R(w)$.

**Kết luận.** $w_\lambda$ là nghiệm của $\min_wL(w)$ với ràng buộc $R(w)\le R(w_\lambda)$.
:::

::: proof Chứng minh Mệnh đề 02.26
**Lộ trình.** So sánh giá trị của bài toán có phạt tại $w_\lambda$ với giá trị tại mọi điểm thỏa ràng buộc.

**Bước 1 (khả thi).** $w_\lambda$ thỏa ràng buộc vì $R(w_\lambda)\le R(w_\lambda)$.

**Bước 2 (tối ưu).** Với mọi $w$ thỏa $R(w)\le R(w_\lambda)$, tính tối ưu của $w_\lambda$ cho $L(w)+\lambda R(w)\ge L(w_\lambda)+\lambda R(w_\lambda)$, nên

$$
\begin{aligned}
L(w)&\ge L(w_\lambda)\\
&\quad+\lambda\bigl(R(w_\lambda)-R(w)\bigr)\\
&\ge L(w_\lambda),
\end{aligned}
$$

trong đó bất đẳng thức cuối dùng $\lambda\ge0$ và $R(w_\lambda)-R(w)\ge0$. $\square$
:::

Mệnh đề 02.26 đi một chiều: từ một $\lambda$ cho trước suy ra một mức chặn. Chiều ngược, mỗi mức chặn ứng với một $\lambda$, cần thêm tính lồi (Boyd và Vandenberghe (2004), §4.7.4, tr. 179) và một điều kiện chính quy, như điều kiện Slater (§5.2.3, tr. 226).

::: example Ví dụ 02.19 (Ràng buộc chặn chuẩn $\lVert w\rVert_2^2\le\tfrac{29}{100}$)
**Dữ kiện.** Dữ liệu chung: $X^TX=\operatorname{diag}(10,5)$, $X^Ty=(10,3)$, $y^Ty=19$, $J(w)$ theo (6.2). Nghiệm của $\min_wJ(w)+10\lVert w\rVert_2^2$ là $w_{10}=(\tfrac12,\tfrac15)$, với $J(w_{10})=\tfrac{21}2$ (Ví dụ 02.18).

**Lập mô hình.** Bài toán $\min_wJ(w)$ với $\lVert w\rVert_2^2\le\tfrac{29}{100}$ là QCQP với $P_0=2X^TX=\operatorname{diag}(20,10)$, $q_0=(-20,-6)$, $\rho_0=19$, $P_1=2I$, $q_1=0$, $\rho_1=-\tfrac{29}{100}$. Mọi $P_i\succ0$ và $w=0$ khả thi, nên bài toán lồi và có nghiệm (Mệnh đề 02.25).

**Chứng nhận.** Theo Ví dụ 02.18, $w_{10}=(\tfrac12,\tfrac15)$ là nghiệm của bài toán có phạt với $\lambda=10$, và $\lVert w_{10}\rVert_2^2=\tfrac14+\tfrac1{25}=\tfrac{29}{100}$. Mệnh đề 02.26 với $L=J$, $R=\lVert\cdot\rVert_2^2$ cho $w^*=(\tfrac12,\tfrac15)$ là nghiệm của bài toán có ràng buộc chặn chuẩn, với $J(w^*)=\tfrac{21}2$. Nghiệm duy nhất vì $J$ lồi chặt.

**Kiểm tra lại bằng (4.2).** $\nabla J(w^*)=(20(\tfrac12-1),\ 10(\tfrac15-\tfrac35))=(-10,-4)$. Với mọi $w$ khả thi,

$$
\begin{aligned}
&\nabla J(w^*)^T(w-w^*)\\
&\quad=5+\tfrac45-(10w_1+4w_0)\ge0,
\end{aligned}
$$

vì bất đẳng thức Cauchy–Schwarz cho $10w_1+4w_0\le\sqrt{116}\cdot\sqrt{0{,}29}=\sqrt{33{,}64}=5{,}8$.

**Kiểm tra một điểm biên.** Điểm $(\sqrt{0{,}29},0)\approx(0{,}5385;0)$ cho $J\approx10\cdot0{,}2130+1{,}8+7{,}2=11{,}13>10{,}5$.
:::

![Hình tròn tâm gốc có tổng bình phương hai hệ số ≤ 0,29; nghiệm tự do (1; 0,6) nằm ngoài, đường mức 10,5 của tổng bình phương phần dư tiếp xúc hình tròn tại nghiệm (0,5; 0,2).](img/lec-02/qp-bound.svg)

Nghiệm nằm trên biên của hình tròn, tại chỗ đường mức elip $J=10{,}5$ tiếp xúc biên.

::: remark Nhận xét 02.27 (Số hạng phạt và ràng buộc chặn chuẩn)
**Phạt và ràng buộc chặn chuẩn.** Hệ số phạt $\lambda$ là giá của độ lớn, mức chặn $\Delta^2$ là giới hạn cứng. Khi $\Delta^2\ge\tfrac{34}{25}$, nghiệm bình phương nhỏ nhất khả thi nên là nghiệm của bài toán có ràng buộc chặn chuẩn (Mệnh đề 01.15(b)).

**Ràng buộc chặn chuẩn một.** Ràng buộc $\lVert w\rVert_1\le\Delta$ cho hình thoi, lồi. Với biến phụ $-v\le w\le v$, $\mathbf 1^Tv\le\Delta$ (chọn $v_j=\lvert w_j\rvert$; ngược lại $\lVert w\rVert_1\le\mathbf 1^Tv\le\Delta$ theo Bổ đề 02.14), bài toán là quy hoạch bậc hai.
:::

::: exercise Bài tập 02.5 (Ba quan sát: bình phương nhỏ nhất, ridge và LASSO)
Cho ba quan sát $u=(-1,0,1)$, $y=(0,1,5)$, mô hình $\hat y=w_1u+w_0$, $X$ với hàng $(u_i,1)$ và $J(w)=\lVert Xw-y\rVert_2^2$.

(a) Tính $X^TX$, $X^Ty$, viết $J$ ở dạng bù bình phương như (6.2), và tìm nghiệm bình phương nhỏ nhất.

(b) Giải hồi quy ridge với $\lambda=1$.

(c) Giải LASSO với $\lambda=6$ và $\lambda=12$; tìm ngưỡng $\lambda$ để mỗi hệ số bằng $0$.
:::

::: hint
$X^TX$ chéo. Áp dụng Bổ đề 02.22 cho từng hệ số với $(\eta,s_0)$ đọc từ dạng bù bình phương.
:::

::: solution
**(a) Các tổng.** $\sum u_i^2=2$, $\sum u_i=0$, $\sum y_i=6$, $\sum u_iy_i=0+0+5=5$, $\sum y_i^2=26$. Vậy $X^TX=\operatorname{diag}(2,3)$, $X^Ty=(5,6)$ và

$$
\begin{aligned}
J&=2w_1^2+3w_0^2-10w_1\\
&\quad-12w_0+26\\
&=2(w_1-\tfrac52)^2+3(w_0-2)^2\\
&\quad+\tfrac32,
\end{aligned}
$$

với hằng số $26-\tfrac{25}2-12=\tfrac32$.

**(a) Nghiệm.** Nghiệm $(\tfrac52,2)$, $J=\tfrac32$.

**(a) Kiểm tra lại.** Phần dư $(-\tfrac52+2-0,\ 2-1,\ \tfrac52+2-5)=(-\tfrac12,1,-\tfrac12)$, tổng bình phương $\tfrac14+1+\tfrac14=\tfrac32$.

**(b)** $(X^TX+I)w=X^Ty$ cho $3w_1=5$, $4w_0=6$: $w=(\tfrac53,\tfrac32)$.

**(b) Kiểm tra lại.** $2\cdot\tfrac53+\tfrac53=5$ và $3\cdot\tfrac32+\tfrac32=6$, đúng với $X^Ty=(5,6)$; hai hệ số nhỏ hơn nghiệm $(\tfrac52,2)$.

**(c) Tách biến.** Mục tiêu tách thành $[2(w_1-\tfrac52)^2+\lambda\lvert w_1\rvert]+[3(w_0-2)^2+\lambda\lvert w_0\rvert]+\tfrac32$. Bổ đề 02.22 cho $w_1(\lambda)=\max(\tfrac52-\tfrac\lambda4,0)$, $w_0(\lambda)=\max(2-\tfrac\lambda6,0)$.

**(c) Tính.**

- Với $\lambda=6$: $w=(1,1)$, $J=2\cdot\tfrac94+3+\tfrac32=9$, mục tiêu $9+12=21$.
- Với $\lambda=12$: $w=(0,0)$, $J=\lVert y\rVert_2^2=26$, mục tiêu $26$.
- Ngưỡng: $w_1=0$ khi $\lambda\ge10$, $w_0=0$ khi $\lambda\ge12$.

**(c) Kiểm tra lại.** Với $\lambda=6$: đạo hàm phần $w_1$ tại $w_1=1$ là $4(1-\tfrac52)+6=0$, phần $w_0$ tại $w_0=1$ là $6(1-2)+6=0$.
:::

::: exercise Bài tập 02.6 (Hàm tuyến tính trên hình tròn)
Chứng nhận bài toán $\min x_1+x_2$ với $x_1^2+x_2^2\le2$ là quy hoạch bậc hai có ràng buộc bậc hai lồi, và chứng minh nghiệm là $x^*=(-1,-1)$ với $p^*=-2$.
:::

::: hint
Dùng (4.2) và bất đẳng thức $x_1+x_2\ge-\sqrt2\,\lVert x\rVert_2$.
:::

::: solution
**Chứng nhận.** $P_0=0$, $q_0=(1,1)$; $P_1=2I\succeq0$, $q_1=0$, $\rho_1=-2$: bài toán lồi theo Mệnh đề 02.25. Tập khả thi là đĩa đóng bán kính $\sqrt2$, không rỗng và bị chặn, nên nghiệm tồn tại.

**Kiểm tra (4.2).** $\nabla f_0=(1,1)$, và với mọi $x$ khả thi,

$$
\begin{aligned}
&(1,1)^T(x-(-1,-1))\\
&\quad=x_1+x_2+2\ge0,
\end{aligned}
$$

vì Cauchy–Schwarz cho $x_1+x_2\ge-\sqrt2\lVert x\rVert_2\ge-\sqrt2\cdot\sqrt2=-2$. Điểm $(-1,-1)$ khả thi ($1+1=2$). Theo Hệ quả 02.4(c), nó là nghiệm, $p^*=-2$.

**Kiểm tra lại.** Điểm khả thi $(\sqrt2,0)$ cho $\sqrt2>-2$, điểm $(1,-1)$ cho $0>-2$.
:::

Các lớp quy hoạch tuyến tính, quy hoạch bậc hai và quy hoạch bậc hai có ràng buộc bậc hai nhận ra tính lồi theo biến ban đầu. Bài toán chứa tích và tỷ số của các kích thước không lồi theo biến ban đầu, và kỹ thuật biến phụ không khắc phục được điều này; chúng ta cần một phép đổi biến.

## 7. Quy hoạch hình học

Xét bài toán thiết kế một hộp kín có thể tích $8\,\mathrm{dm}^3$, với chi phí vật liệu tỷ lệ với diện tích bề mặt, bỏ qua độ dày và mép ghép. Hộp $1\times2\times4$ (dm) có diện tích $28\,\mathrm{dm}^2$, hộp $2\times2\times2$ có $24\,\mathrm{dm}^2$.

### 7.1. Bài toán thiết kế hộp

Ta lấy $1\,\mathrm{dm}$ làm đơn vị và gọi $x=(x_1,x_2,x_3)>0$ là số đo của ba cạnh; nhờ đó các đại lượng là số không thứ nguyên và lấy logarit được. Diện tích là $\mathcal S(x)=2(x_1x_2+x_1x_3+x_2x_3)$ và thể tích là $x_1x_2x_3$.

::: example Ví dụ 02.20 (Mô hình hộp không lồi theo kích thước)
**Dữ kiện.** Hộp kín có ba cạnh $x_1,x_2,x_3>0$ (đơn vị dm), thể tích $x_1x_2x_3=8$, diện tích $\mathcal S(x)=2(x_1x_2+x_1x_3+x_2x_3)$. Hai hộp $1\times2\times4$ và $2\times2\times2$.

Mô hình là $\min_{x>0}2(x_1x_2+x_1x_3+x_2x_3)$ với $x_1x_2x_3=8$.

**Tập khả thi không lồi.** Hai hộp $(1,2,4)$ và $(4,2,1)$ khả thi vì tích bằng $8$. Trung điểm $(\tfrac52,2,\tfrac52)$ có tích $\tfrac52\cdot2\cdot\tfrac52=\tfrac{25}2\ne8$, nên không khả thi. Đẳng thức $x_1x_2x_3=8$ không affine, nên không thỏa Định nghĩa 02.1.

**Mục tiêu không lồi.** Hessian của $\mathcal S$ là

$$
\nabla^2\mathcal S=\begin{bmatrix}0&2&2\\2&0&2\\2&2&0\end{bmatrix},
$$

với $\nabla^2\mathcal S\,(1,-1,0)^T=(-2,2,0)^T=-2\,(1,-1,0)^T$, nên $-2$ là một giá trị riêng. Theo Định lý 01.29(a), $\mathcal S$ không lồi trên miền mở $\{x\in\mathbb R^3\mid x>0\}$.

**Kiểm tra lại.** Một giá trị riêng khác ứng với $(1,1,1)$: $\nabla^2\mathcal S\,(1,1,1)^T=(4,4,4)^T$, giá trị riêng $4$. Tổng ba giá trị riêng $4-2-2=0$ bằng vết của ma trận. Diện tích của hai hộp: $2(2+4+8)=28$ và $2(4+4+4)=24$.
:::

![Hộp chữ nhật kín có ba cạnh x1, x2, x3 và thể tích 8 đề-xi-mét khối.](img/lec-02/gp-box-note.svg)

Về mặt ý tưởng, logarit biến tích thành tổng, nên ràng buộc thể tích trở thành $\log x_1+\log x_2+\log x_3=\log8$, tuyến tính theo các logarit. Mỗi hạng $x_1x_2$ của diện tích trở thành $e^{\log x_1+\log x_2}$, hàm mũ của một hàm tuyến tính. Phép đổi biến chỉ dùng được khi các đại lượng và các hệ số đều dương.

### 7.2. Đơn thức, tổng đơn thức dương và dạng chuẩn

Các hàm xuất hiện trong bài toán hộp có một cấu trúc đại số riêng, được gọi tên theo định nghĩa sau.

::: definition Định nghĩa 02.28 (Đơn thức và tổng đơn thức dương)
Trên $\mathbb R^n_{++}=\{x\in\mathbb R^n\mid x_i>0,\ i=1,\ldots,n\}$, một *đơn thức* (monomial) là hàm

$$
\begin{aligned}
g(x)&=c\,x_1^{\alpha_1}x_2^{\alpha_2}\cdots x_n^{\alpha_n},\\
c&>0,\quad\alpha_i\in\mathbb R .
\end{aligned}
$$

Một *tổng đơn thức dương* (posynomial) là tổng hữu hạn của các đơn thức, $f(x)=\sum_{k=1}^Kc_k\,x_1^{\alpha_{1k}}\cdots x_n^{\alpha_{nk}}$ với $c_k>0$.
:::

Định nghĩa trên khác với đơn thức của đại số ở hai điểm: số mũ là số thực tùy ý, và hệ số phải dương.

- $2x_1^{-1}x_2^{1/2}$ và hằng số $3$ là đơn thức.
- $x_1+2x_2/x_1$ và $(x_1+x_2)^2$ là tổng đơn thức dương.
- $x_1-x_2$ và $1/(x_1+x_2)$ thì không.

Các quy tắc sau kiểm tra được trực tiếp từ định nghĩa (Boyd và Vandenberghe (2004), §4.5.1, tr. 160–161).

- Tích, thương và lũy thừa thực của đơn thức là đơn thức.
- Tổng và tích của tổng đơn thức dương là tổng đơn thức dương.
- Thương của tổng đơn thức dương cho một đơn thức là tổng đơn thức dương.

Trong bài toán hộp, $2x_1x_2+2x_1x_3+2x_2x_3$ là tổng ba đơn thức và $x_1x_2x_3/8$ là đơn thức. Với hai loại hàm này, quy hoạch hình học được định nghĩa như sau.

::: definition Định nghĩa 02.29 (Quy hoạch hình học)
Cho các tổng đơn thức dương $f_0,f_1,\ldots,f_m$ và các đơn thức $g_1,\ldots,g_p$ trên $\mathbb R^n_{++}$. *Quy hoạch hình học* (geometric programming, GP) ở *dạng chuẩn* là

$$
\begin{aligned}
&\underset{x\in\mathbb R^n_{++}}{\operatorname{minimize}}\ f_0(x)\\
&\text{subject to}\\
&\ \ f_i(x)\le1,\ i=1,\ldots,m,\\
&\ \ g_j(x)=1,\ j=1,\ldots,p .
\end{aligned}
\tag{7.1}
$$
:::

Mệnh đề sau đưa một bài toán về dạng (7.1).

::: proposition Mệnh đề 02.30 (Đưa về dạng chuẩn của quy hoạch hình học) — chứng minh đầy đủ
**Giả thiết.** $f$ là tổng đơn thức dương; $g,g_1,g_2$ là đơn thức; mọi biến dương.

**Kết luận.**

- (a) $f(x)\le g(x)$ khi và chỉ khi $f(x)/g(x)\le1$, và $f/g$ là tổng đơn thức dương.
- (b) $g_1(x)=g_2(x)$ khi và chỉ khi $g_1(x)/g_2(x)=1$, và $g_1/g_2$ là đơn thức.
- (c) Cực đại $g$ trên một tập không rỗng $C\subseteq\mathbb R^n_{++}$ có cùng tập nghiệm với cực tiểu $1/g$ trên $C$, và $1/g$ là đơn thức; hai giá trị tối ưu liên hệ bởi $\inf_C(1/g)=1/\sup_Cg$, với quy ước $1/(+\infty)=0$.
:::

::: proof Chứng minh Mệnh đề 02.30
**Lộ trình.** Chia hai vế cho một đơn thức dương giữ chiều; hàm $s\mapsto1/s$ giảm chặt đổi cực đại thành cực tiểu.

**Bước 1 (phần (a)).** Vì $g(x)>0$, chia hai vế cho $g(x)$ giữ chiều bất đẳng thức, và nhân lại cho chiều ngược. Mỗi hạng của $f/g$ có dạng

$$
\dfrac{c_k\prod_ix_i^{\alpha_{ik}}}{\bar c\prod_ix_i^{\bar\alpha_i}}=\dfrac{c_k}{\bar c}\prod_ix_i^{\alpha_{ik}-\bar\alpha_i}
$$

với $g(x)=\bar c\prod_ix_i^{\bar\alpha_i}$ và $c_k/\bar c>0$, là đơn thức.

**Bước 2 (phần (b)).** Tương tự với đẳng thức, chia cho $g_2(x)>0$.

**Bước 3 (phần (c), khi có nghiệm).** Hàm $s\mapsto1/s$ giảm chặt trên $(0,\infty)$, nên $g(x^*)\ge g(x)$ với mọi $x\in C$ khi và chỉ khi $1/g(x^*)\le1/g(x)$ với mọi $x\in C$. Hai bài toán có cùng nghiệm, và giá trị tối ưu của bài toán cực tiểu là $1/g(x^*)$.

**Bước 4 (phần (c), giá trị tối ưu nói chung).** Khi không có nghiệm, đặt $S=\sup_Cg\in(0,+\infty]$, hữu hạn hoặc không, với $C\ne\varnothing$. Hàm $s\mapsto1/s$ giảm chặt và liên tục trên $(0,\infty)$ (với quy ước $1/(+\infty)=0$), nên $1/g(x)\ge1/S$ với mọi $x\in C$. Với dãy $x_k\in C$ có $g(x_k)\to S$ thì $1/g(x_k)\to1/S$, tức cận trên đúng $S$ thành cận dưới đúng $1/S$. Hàm $1/g=\bar c^{-1}\prod_ix_i^{-\bar\alpha_i}$ là đơn thức. $\square$
:::

Vế được chia phải là đơn thức. Không có quy tắc tương tự cho $f(x)\ge g(x)$ với $f$ có nhiều hơn một hạng, cho đẳng thức giữa hai tổng đơn thức dương, hay cho cực đại một tổng đơn thức dương: $1/(x_1+x_2)$ không là tổng đơn thức dương.

Với bài toán hộp, ràng buộc $x_1x_2x_3=8$ trở thành $x_1x_2x_3/8=1$ theo (b), và mục tiêu đã là tổng đơn thức dương, nên bài toán hộp là quy hoạch hình học dạng chuẩn.

Một cận dưới $g(x)\ge\underline c$ với hằng số $\underline c>0$ viết thành $\underline c/g(x)\le1$, và một cận trên $f(x)\le\overline c$ viết thành $f(x)/\overline c\le1$.

### 7.3. Phép đổi biến logarit và dạng lồi

Ta đặt $z_i=\log x_i$, tức $x_i=e^{z_i}$, theo từng thành phần. Phép đổi biến là song ánh giữa $\mathbb R^n_{++}$ và $\mathbb R^n$, với ánh xạ ngược $x=e^z$ lấy theo từng thành phần.

::: lemma Bổ đề 02.31 (Đơn thức và tổng đơn thức dương sau đổi biến logarit) — chứng minh đầy đủ
**Giả thiết.** $g(x)=c\prod_ix_i^{\alpha_i}$ là đơn thức, $f(x)=\sum_{k=1}^Kc_k\prod_ix_i^{\alpha_{ik}}$ là tổng đơn thức dương; $\alpha=(\alpha_1,\ldots,\alpha_n)$ và $\alpha_k=(\alpha_{1k},\ldots,\alpha_{nk})$.

**Kết luận.** Với mọi $z\in\mathbb R^n$,

$$
\begin{aligned}
&\log g(e^z)=\alpha^Tz+\log c,\\
&\log f(e^z)\\
&\ \ =\log\textstyle\sum_{k=1}^Ke^{\alpha_k^Tz+\beta_k},\\
&\beta_k=\log c_k .
\end{aligned}
\tag{7.2}
$$
:::

::: proof Chứng minh Bổ đề 02.31
**Lộ trình.** Viết mỗi hệ số dương thành $e^{\log c}$ và dùng $e^{s+s'}=e^se^{s'}$.

**Bước 1 (đơn thức).** Ta có

$$
\begin{aligned}
g(e^z)&=c\prod_ie^{\alpha_iz_i}\\
&=c\,e^{\sum_i\alpha_iz_i}\\
&=e^{\log c}e^{\alpha^Tz}\\
&=e^{\alpha^Tz+\log c},
\end{aligned}
$$

và lấy logarit cho vế đầu của (7.2).

**Bước 2 (tổng đơn thức dương).** Áp dụng Bước 1 cho từng hạng của $f$, ta có $f(e^z)=\sum_ke^{\alpha_k^Tz+\beta_k}$. Lấy logarit của tổng dương này cho vế sau. $\square$
:::

Bổ đề cần hệ số dương để $\log c$, $\log c_k$ xác định. Vế phải thứ hai của (7.2) là logarit của một tổng, không tách được thành tổng các logarit. Hàm $\operatorname{lse}(s)=\log\sum_ke^{s_k}$ được gọi là *hàm log-sum-exp*.

Để thấy vì sao hàm này lồi, xét trường hợp $n=1$, $K=2$, $\alpha=(1,-1)$, $\beta=0$, khi hàm $F(z)=\log(e^z+e^{-z})$, mục tiêu $f_{\mathrm Q}$ của Bài tập 02.1, tính thủ công được. Đặt $\pi_1=e^z/(e^z+e^{-z})$, $\pi_2=1-\pi_1$, ta có

$$
\begin{aligned}
F'(z)&=\pi_1-\pi_2,\\
F''(z)&=1-(\pi_1-\pi_2)^2\\
&=4\pi_1\pi_2>0 .
\end{aligned}
$$

Số $1-(\pi_1-\pi_2)^2$ là phương sai của biến nhận giá trị $\alpha_1=1$ với xác suất $\pi_1$ và $\alpha_2=-1$ với xác suất $\pi_2$.

Định lý sau tổng quát hóa cách đọc này.

::: theorem Định lý 02.32 (Hàm log-sum-exp lồi) — chứng minh đầy đủ
**Giả thiết.** $\alpha_1,\ldots,\alpha_K\in\mathbb R^n$, $\beta_1,\ldots,\beta_K\in\mathbb R$, và $F(z)=\log\sum_{k=1}^Ke^{\alpha_k^Tz+\beta_k}$ trên $\mathbb R^n$.

**Kết luận.** $F$ thuộc lớp $C^2$, với

$$
\begin{aligned}
&\nabla F(z)=\textstyle\sum_k\pi_k\alpha_k,\\
&\nabla^2F(z)=\textstyle\sum_k\pi_k\\
&\ \times(\alpha_k-\hat\alpha)(\alpha_k-\hat\alpha)^T\\
&\ \succeq0,
\end{aligned}
\tag{7.3}
$$

trong đó $\pi_k=e^{\alpha_k^Tz+\beta_k}\big/\sum_le^{\alpha_l^Tz+\beta_l}$ và $\hat\alpha=\sum_k\pi_k\alpha_k$. Do đó $F$ lồi trên $\mathbb R^n$.
:::

::: proof Chứng minh Định lý 02.32
**Lộ trình.** Tính gradient và Hessian bằng quy tắc dây chuyền, rồi viết Hessian thành một tổng có trọng số dương của các ma trận $vv^T$.

Đặt $Z(z)=\sum_ke^{\alpha_k^Tz+\beta_k}>0$, nên $F=\log Z$ và $\pi_k=e^{\alpha_k^Tz+\beta_k}/Z$, với $\pi_k>0$ và $\sum_k\pi_k=1$.

**Bước 1 (gradient).** Quy tắc dây chuyền cho $\nabla e^{\alpha_k^Tz+\beta_k}=e^{\alpha_k^Tz+\beta_k}\alpha_k$, nên $\nabla Z=\sum_ke^{\alpha_k^Tz+\beta_k}\alpha_k$ và

$$
\nabla F=\nabla Z/Z=\sum_k\pi_k\alpha_k=\hat\alpha .
$$

**Bước 2 (đạo hàm của trọng số).** Theo quy tắc đạo hàm thương,

$$
\begin{aligned}
\nabla\pi_k&=\frac{e^{\alpha_k^Tz+\beta_k}\bigl(\alpha_kZ-\nabla Z\bigr)}{Z^2}\\
&=\pi_k\Bigl(\alpha_k-\frac{\nabla Z}{Z}\Bigr)\\
&=\pi_k(\alpha_k-\hat\alpha).
\end{aligned}
$$

**Bước 3 (Hessian).** Vì $\nabla F=\sum_k\alpha_k\pi_k$ với $\alpha_k$ hằng, và $\sum_k\pi_k\hat\alpha(\alpha_k-\hat\alpha)^T=\hat\alpha(\hat\alpha-\hat\alpha)^T=0$,

$$
\begin{aligned}
&\nabla^2F=\textstyle\sum_k\alpha_k(\nabla\pi_k)^T\\
&\ =\textstyle\sum_k\pi_k\alpha_k(\alpha_k-\hat\alpha)^T\\
&\ =\textstyle\sum_k\pi_k(\alpha_k-\hat\alpha)\\
&\qquad\cdot(\alpha_k-\hat\alpha)^T,
\end{aligned}
$$

đó là (7.3).

**Bước 4 (dấu).** Với mọi $v\in\mathbb R^n$,

$$
\begin{aligned}
&v^T\nabla^2F(z)v\\
&\quad=\textstyle\sum_k\pi_k\bigl(v^T(\alpha_k-\hat\alpha)\bigr)^2\ge0,
\end{aligned}
$$

vì $\pi_k>0$ và các bình phương không âm. Vậy $\nabla^2F(z)\succeq0$ tại mọi $z$, và Định lý 01.29(a) trên miền mở $\mathbb R^n$ cho $F$ lồi. $\square$
:::

Hàm $F$ nói chung không lồi chặt: theo hướng $v$ với $v^T\alpha_k$ như nhau cho mọi $k$, $F$ là hàm affine. Logarit của một hàm lồi bất kỳ không nhất thiết lồi: $\log(x^2+1)$ có đạo hàm bậc hai $2(1-x^2)/(1+x^2)^2<0$ khi $\lvert x\rvert>1$; định lý dùng cấu trúc riêng của tổng các hàm mũ.

Trong (7.3), $\pi$ là một phân phối trên $K$ chỉ số, $\nabla F$ là kỳ vọng của $\alpha_k$ và $\nabla^2F$ là ma trận hiệp phương sai của nó.

Hàm log-sum-exp là logarit của hằng số chuẩn hóa trong hàm softmax (Murphy (2022), §2.5.2, §2.5.4). Với điểm số $s\in\mathbb R^K$, xác suất softmax là $\pi_k=e^{s_k}/\sum_le^{s_l}$, và mất mát entropy chéo (cross-entropy) của lớp đúng $k^\star$ là $\operatorname{lse}(s)-s_{k^\star}$.

Với $s=Wu$, Định lý 02.32 cùng Định lý 01.30(b) cho tính lồi của hồi quy logistic đa lớp (multinomial logistic regression) theo $W$, nên nó có các bảo đảm của Hệ quả 02.4. Công thức (7.3) cho $\nabla\operatorname{lse}=\pi$.

Ghép Bổ đề 02.31, Định lý 02.32 và Mệnh đề 02.6 với $T=\log$, ta được dạng lồi của quy hoạch hình học trong định lý sau.

::: theorem Định lý 02.33 (Dạng lồi của quy hoạch hình học) — chứng minh đầy đủ
**Giả thiết.** Bài toán (7.1), với $f_i(x)=\sum_{k=1}^{K_i}c_{ik}\prod_lx_l^{\alpha_{lik}}$, $i=0,\ldots,m$, và $g_j(x)=\bar c_j\prod_lx_l^{\bar\alpha_{lj}}$; đặt $\alpha_{ik}=(\alpha_{1ik},\ldots,\alpha_{nik})$, $\beta_{ik}=\log c_{ik}$, $\bar\beta_j=\log\bar c_j$ và $\bar\alpha_j=(\bar\alpha_{1j},\ldots,\bar\alpha_{nj})$.

**Kết luận.** (a) Bài toán

$$
\begin{aligned}
&\underset{z\in\mathbb R^n}{\operatorname{minimize}}\\
&\ \ F_0(z)\\
&\text{subject to}\\
&\ \ F_i(z)\le0,\\
&\ \ i=1,\ldots,m,\\
&\ \ \bar\alpha_j^Tz+\bar\beta_j=0,\\
&\ \ j=1,\ldots,p,
\end{aligned}
\tag{7.4}
$$

với $F_i(z)=\log\sum_ke^{\alpha_{ik}^Tz+\beta_{ik}}$, là bài toán tối ưu lồi dạng phổ biến.

(b) (7.4) là biến đổi tương đương của (7.1) theo Định nghĩa 02.5 với $\varphi(x)=\log x$, $\psi(z)=e^z$ và $T=\log$.

(c) Nếu $z^*$ là nghiệm của (7.4) thì $x^*=e^{z^*}$ là nghiệm của (7.1), và $f_0(x^*)=e^{F_0(z^*)}$.

(d) Nếu mọi $f_i$, $i=0,\ldots,m$, là đơn thức thì (7.4) là quy hoạch tuyến tính.
:::

::: proof Chứng minh Định lý 02.33
**Lộ trình.** Bổ đề 02.31 chuyển từng dòng của (7.1) sang $z=\log x$; Định lý 02.32 cho tính lồi, Mệnh đề 02.6 với $T=\log$ cho tương đương.

**Bước 1 (phần (a)).** Mỗi $F_i$ là hàm log-sum-exp của các hàm affine theo $z$, lồi theo Định lý 02.32. Các đẳng thức $\bar\alpha_j^Tz+\bar\beta_j=0$ affine và miền $\mathbb R^n$ lồi, nên bài toán thỏa Định nghĩa 02.1.

**Bước 2 (phần (b): ràng buộc tương ứng).** Với $x\in\mathbb R^n_{++}$ và $z=\log x$, Bổ đề 02.31 cho $\log f_i(x)=F_i(z)$ và $\log g_j(x)=\bar\alpha_j^Tz+\bar\beta_j$. Vì $\log$ tăng chặt trên $(0,\infty)$ và $\log1=0$, ta có hai tương đương sau.

- $f_i(x)\le1$ khi và chỉ khi $F_i(z)\le0$;
- $g_j(x)=1$ khi và chỉ khi $\bar\alpha_j^Tz+\bar\beta_j=0$.

Vậy $\varphi$ ánh xạ tập khả thi của (7.1) vào tập khả thi của (7.4), và $\psi$ ánh xạ theo chiều ngược.

**Bước 3 (phần (b): mục tiêu tương ứng).** Ta có $F_0(\varphi(x))=\log f_0(x)=T(f_0(x))$ và $T(f_0(\psi(z)))=\log f_0(e^z)=F_0(z)$. Hai bất đẳng thức của (4.3) đúng với dấu bằng, và $T=\log$ tăng chặt trên $(0,\infty)$, khoảng chứa mọi giá trị của $f_0$.

**Bước 4 (phần (c) và (d)).** Theo Mệnh đề 02.6(b), $\psi(z^*)=e^{z^*}$ là nghiệm của (7.1); theo phần (a) của cùng mệnh đề, $F_0(z^*)=\log f_0(x^*)$. Nếu mọi $f_i$ là đơn thức thì mọi $F_i$ affine theo Bổ đề 02.31, và (7.4) là quy hoạch tuyến tính. $\square$
:::

Định lý 02.33 cần mọi biến và mọi hệ số dương, và không bảo đảm nghiệm tồn tại. So với Định lý 02.15, định lý này đổi biến thay vì thêm biến, và giá trị tối ưu biến đổi qua $T=\log$.

Giả thiết biến dương làm phép đổi biến song ánh, còn hệ số dương cho phép lấy logarit. Nếu bỏ giả thiết biến dương, bài toán $\min x$ trên $[0,1]$ có nghiệm $0$, nhưng sau khi đặt $x=e^z$ thì cận dưới $0$ không đạt. Ví dụ sau áp dụng định lý này cho bài toán hộp.

::: example Ví dụ 02.21 (Bài toán hộp sau đổi biến logarit)
**Dữ kiện.** Bài toán hộp (Ví dụ 02.20): $\min_{x>0}2(x_1x_2+x_1x_3+x_2x_3)$ với $x_1x_2x_3=8$.

**Đổi biến.** Đặt $z_1=\log x_1$, $z_2=\log x_2$, $z_3=\log x_3$. Theo Định lý 02.33, bài toán hộp tương đương với

$$
\begin{aligned}
&\underset{z_1,z_2,z_3\in\mathbb R}{\operatorname{minimize}}\\
&\ \ \log\bigl(2e^{z_1+z_2}+2e^{z_1+z_3}\\
&\ \ \qquad+2e^{z_2+z_3}\bigr)\\
&\text{subject to}\ \ z_1+z_2+z_3=\log8,
\end{aligned}
$$

với mục tiêu lồi (log-sum-exp của ba hàm affine, các hệ số $2$ vào số mũ dưới dạng $\log2$) và ràng buộc là một mặt phẳng.

**Khử ràng buộc.** Thay $z_3=\log8-z_1-z_2$: $2e^{z_1+z_3}=2e^{\log8-z_2}=16e^{-z_2}$ và $2e^{z_2+z_3}=16e^{-z_1}$, nên mục tiêu trên $\mathbb R^2$ là

$$
\begin{aligned}
&\Phi(z_1,z_2)=\log Z(z_1,z_2),\\
&Z(z_1,z_2)\\
&\quad=2e^{z_1+z_2}+16e^{-z_1}+16e^{-z_2}.
\end{aligned}
$$

Hàm $\Phi$ lồi theo Định lý 02.32.

**Tìm điểm dừng.** Vì $Z>0$, $\nabla\Phi=\nabla Z/Z$ bằng $0$ khi và chỉ khi $\nabla Z=0$:

$$
\begin{aligned}
2e^{z_1+z_2}-16e^{-z_1}&=0,\\
2e^{z_1+z_2}-16e^{-z_2}&=0 .
\end{aligned}
$$

Trừ hai phương trình, ta được $e^{-z_1}=e^{-z_2}$, tức $z_1=z_2$. Khi đó $2e^{2z_1}=16e^{-z_1}$, $e^{3z_1}=8$, $z_1=\log2$.

**Kết luận.** Theo Hệ quả 01.26 trên toàn $\mathbb R^2$, $(z_1^*,z_2^*)=(\log2,\log2)$ là nghiệm, và $z_3^*=\log8-2\log2=\log2$. Khôi phục: $x^*=(2,2,2)$, diện tích $\mathcal S_{\min}=24\,\mathrm{dm}^2$, và $\Phi(z_1^*,z_2^*)=\log(8+8+8)=\log24$.

**Kiểm tra lại.** Chứng nhận độc lập bằng bất đẳng thức trung bình cộng – trung bình nhân cho ba số dương $x_1x_2,x_1x_3,x_2x_3$:

$$
\begin{aligned}
&x_1x_2+x_1x_3+x_2x_3\\
&\quad\ge3\bigl((x_1x_2)(x_1x_3)(x_2x_3)\bigr)^{1/3}\\
&\quad=3(x_1x_2x_3)^{2/3}\\
&\quad=3\cdot8^{2/3}=12,
\end{aligned}
$$

nên $\mathcal S\ge24$, dấu bằng khi $x_1x_2=x_1x_3=x_2x_3$, tức $x_1=x_2=x_3=2$. Hộp $(1,2,4)$ cho $28>24$.
:::

![Mặt phẳng (z1, z2) = (log x1, log x2) sau khi khử z3 = log 8 − z1 − z2: các đường mức lồng nhau của logarit diện tích quanh nghiệm (log 2, log 2); hai đường trong khép kín, hai đường ngoài bị khung cắt.](img/lec-02/gp-box-contour-note.svg)

Trong tọa độ logarit trên hình, các tập mức dưới của $\Phi$ là các tập lồi lồng nhau quanh $(\log2,\log2)$, đúng với Mệnh đề 01.24.

::: remark Nhận xét 02.34 (Giới hạn của phép đổi biến logarit)
1. Giá trị của (7.4) là $\log$ của giá trị (7.1): ở Ví dụ 02.21, $\log24\approx3{,}18$ không là diện tích.
2. Hàm có hệ số âm, hoặc biến được bằng $0$, không thuộc dạng (7.1).
3. Đẳng thức giữa hai tổng đơn thức dương không được phép: $x_1+x_2=1$ affine theo $x$ nhưng thành $\log(e^{z_1}+e^{z_2})=0$, không affine.
:::

::: exercise Bài tập 02.7 (Nhận dạng ràng buộc của quy hoạch hình học)
Với các biến dương $x_1,x_2,x_3$, xác định ràng buộc nào đưa được về dạng của (7.1) và viết dạng đó:

(a) $x_1^2+3x_2/x_3\le\sqrt{x_2}$;

(b) $x_1-x_2\le1$;

(c) $(x_1+x_2)^2\le x_3$;

(d) cực đại $x_1/x_2$ với các ràng buộc khác đã ở dạng chuẩn;

(e) $x_1+x_2\ge x_3$.
:::

::: hint
Dùng Mệnh đề 02.30: với $f$ là tổng đơn thức dương và $g$ là đơn thức, $f\le g$ tương đương $f/g\le1$; cực đại đơn thức $g$ tương đương cực tiểu $1/g$. Khai triển $(x_1+x_2)^2$ trước khi chia.
:::

::: solution
- **(a)** Chia cho đơn thức $\sqrt{x_2}$: $x_1^2x_2^{-1/2}+3x_2^{1/2}x_3^{-1}\le1$, dạng chuẩn.
- **(b)** Có hệ số âm, không đưa được về dạng (7.1). Ràng buộc này affine nên vẫn lồi theo $(x_1,x_2)$, nhưng không thuộc lớp quy hoạch hình học.
- **(c)** $(x_1+x_2)^2=x_1^2+2x_1x_2+x_2^2$ là tổng đơn thức dương; chia cho $x_3$: $x_1^2x_3^{-1}+2x_1x_2x_3^{-1}+x_2^2x_3^{-1}\le1$.
- **(d)** Theo Mệnh đề 02.30(c), cực tiểu đơn thức $x_2/x_1=x_1^{-1}x_2$.
- **(e)** Chiều "tổng đơn thức dương $\ge$ đơn thức" không đưa được về dạng chuẩn: chia cho $x_3$ cho $x_1/x_3+x_2/x_3\ge1$, sai chiều.

**Kiểm tra lại.** Tại $(x_1,x_2,x_3)=(\tfrac12,4,24)$, ràng buộc (a) cho $\tfrac14+\tfrac12=\tfrac34\le2$, và dạng chuẩn cho $\tfrac18+\tfrac14=\tfrac38\le1$: cả hai đúng. Tại $(1,1,1)$, hai dạng cho $4\le1$ và $4\le1$: cả hai sai.
:::

### 7.4. Đọc thêm: phân bổ công suất cho hai đường truyền

Hai cặp phát – thu dùng chung một kênh; tăng công suất phát của một đường làm tín hiệu của nó mạnh lên và gây nhiễu cho đường kia. Bài toán là cải thiện đường yếu hơn.

![Hai cặp phát – thu: tín hiệu chính hệ số 1 (nét liền), nhiễu từ bộ phát 2 tới bộ thu 1 hệ số 1/4 và từ bộ phát 1 tới bộ thu 2 hệ số 3/2 (nét đứt), tạp âm nền bằng 1 ở mỗi bộ thu.](img/lec-02/gp-wireless.svg)

Giả sử dữ liệu của bài toán, ghi trên hình, gồm:

- *độ lợi đường truyền* (path gain) từ bộ phát $j$ tới bộ thu $i$: $\chi_{11}=\chi_{22}=1$, $\chi_{12}=\tfrac14$, $\chi_{21}=\tfrac32$;
- tạp âm nền $\varepsilon_1=\varepsilon_2=1$;
- ngân sách tổng công suất $6$.

Chất lượng đường $i$ đo bằng *tỷ số tín hiệu trên nhiễu và tạp âm* (signal-to-interference-plus-noise ratio, SINR):

$$
\begin{aligned}
\Gamma_1(p)&=\frac{p_1}{1+p_2/4},\\
\Gamma_2(p)&=\frac{p_2}{1+3p_1/2}.
\end{aligned}
$$

::: example Ví dụ 02.22 (Mô hình phân bổ công suất và dạng lồi)
**Dữ kiện.** Công suất phát $p=(p_1,p_2)\in\mathbb R^2_{++}$, ngân sách $p_1+p_2\le6$; chất lượng hai đường là $\Gamma_1(p)=\frac{p_1}{1+p_2/4}$ và $\Gamma_2(p)=\frac{p_2}{1+3p_1/2}$.

**Lập mô hình.** Bài toán là cực đại $\min\{\Gamma_1(p),\Gamma_2(p)\}$ theo $p\in\mathbb R^2_{++}$ với $p_1+p_2\le6$. Chia đều $(3,3)$ cho $\Gamma_1=3/(1+\tfrac34)=\tfrac{12}7$ và $\Gamma_2=3/(1+\tfrac92)=\tfrac6{11}$: đường $2$ yếu vì chịu nhiễu với hệ số $\tfrac32$.

**Biến đổi bằng ngưỡng.** Thêm biến $t>0$ đóng vai chặn dưới của chất lượng. Ta có $t\le \Gamma_1(p)$ khi và chỉ khi $t(1+p_2/4)\le p_1$, và chia cho $p_1>0$ cho $tp_1^{-1}+\tfrac14tp_2p_1^{-1}\le1$; tương tự với đường $2$. Theo Mệnh đề 02.30(c), cực đại $t$ thành cực tiểu $t^{-1}$. Bài toán

$$
\begin{aligned}
&\underset{p_1,p_2,t>0}{\operatorname{minimize}}\quad t^{-1}\\
&\text{subject to}\\
&\quad tp_1^{-1}+\tfrac14tp_2p_1^{-1}\le1,\\
&\quad tp_2^{-1}+\tfrac32tp_1p_2^{-1}\le1,\\
&\quad\tfrac16p_1+\tfrac16p_2\le1
\end{aligned}
\tag{7.5}
$$

là quy hoạch hình học: mục tiêu là đơn thức, mỗi vế trái là tổng đơn thức dương.

**Tương đương với bài toán gốc.** Vì $\min\{\Gamma_1,\Gamma_2\}>0$ và $s\mapsto1/s$ giảm chặt trên $(0,\infty)$, bài toán gốc có cùng tập nghiệm với $\min1/\min\{\Gamma_1,\Gamma_2\}$; bài toán (7.5) là biến đổi tương đương của bài toán này với $\varphi(p)=(p,\min\{\Gamma_1(p),\Gamma_2(p)\})$, $\psi(p,t)=p$, $T(s)=s$, vì $t\le\min\{\Gamma_1,\Gamma_2\}$ kéo theo $1/\min\{\Gamma_1,\Gamma_2\}\le1/t$.

**Dạng lồi.** Với $z_i=\log p_i$, $\tau=\log t$, Định lý 02.33 cho bài toán $\min-\tau$ với các ràng buộc

$$
\begin{aligned}
\log(e^{\tau-z_1}+\tfrac14e^{\tau+z_2-z_1})&\le0,\\
\log(e^{\tau-z_2}+\tfrac32e^{\tau+z_1-z_2})&\le0,\\
\log(e^{z_1}+e^{z_2})&\le\log6 .
\end{aligned}
$$

Mục tiêu affine, ba ràng buộc log-sum-exp lồi.

**Kiểm tra lại.** Tại $(p,t)=(3,3,\tfrac6{11})$:

- vế trái thứ nhất $\tfrac6{11}\cdot\tfrac13+\tfrac14\cdot\tfrac6{11}\cdot1=\tfrac2{11}+\tfrac3{22}=\tfrac7{22}\le1$;
- vế trái thứ hai $\tfrac6{11}\cdot\tfrac13+\tfrac32\cdot\tfrac6{11}\cdot1=\tfrac2{11}+\tfrac9{11}=1$, chặt, đúng vì $t=\Gamma_2$.
:::

::: example Ví dụ 02.23 (Nghiệm phân bổ công suất)
**Dữ kiện.** Bài toán cực đại $t=\min\{\Gamma_1(p),\Gamma_2(p)\}$ theo $p\in\mathbb R^2_{++}$ với $p_1+p_2\le6$, trong đó $\Gamma_i(p)=\frac{\chi_{ii}p_i}{\varepsilon_i+\sum_{j\ne i}\chi_{ij}p_j}$, $\chi_{11}=\chi_{22}=1$, $\chi_{12}=\tfrac14$, $\chi_{21}=\tfrac32$, $\varepsilon_1=\varepsilon_2=1$; dạng lồi của Ví dụ 02.22.

Ta chứng minh nghiệm là $p^{\mathrm{opt}}=(2,4)$ với chất lượng tối ưu $t^*=1$.

**Bước 1 (không phương án nào đạt chất lượng lớn hơn $1$).** Giả sử $t>1$ và $(p,t)$ khả thi. Từ $t\le \Gamma_1$ và $1+p_2/4>0$: $p_1\ge t(1+p_2/4)>1+p_2/4$; tương tự $p_2>1+\tfrac32p_1$. Thế bất đẳng thức thứ hai vào thứ nhất, ta có

$$
p_1>1+\tfrac14(1+\tfrac32p_1)=\tfrac54+\tfrac38p_1,
$$

nên $\tfrac58p_1>\tfrac54$, $p_1>2$, và $p_2>1+\tfrac32\cdot2=4$. Khi đó $p_1+p_2>6$, vi phạm ngân sách.

**Bước 2 (chất lượng $1$ đạt duy nhất tại $(2,4)$).** Với $t=1$, cùng phép thế với bất đẳng thức không chặt cho $p_1\ge2$, $p_2\ge4$, và ngân sách $p_1+p_2\le6$ buộc $p=(2,4)$. Tại đó $\Gamma_1=2/(1+1)=1$ và $\Gamma_2=4/(1+3)=1$.

**Kiểm tra lại.** Trong dạng lồi, nghiệm là $(z_1,z_2,\tau)=(\log2,\log4,0)$ với giá trị $-\tau=0=\log(1/t^*)$.

**Diễn giải.** So với chia đều, chất lượng của đường yếu tăng từ $\tfrac6{11}$ lên $1$; đường $2$ chịu nhiễu mạnh hơn và nhận nhiều công suất hơn.
:::

![Theo p1 từ 0 đến 6 với p2 = 6 − p1: SINR1 tăng, SINR2 giảm, cắt nhau tại (2; 1), nơi giá trị nhỏ nhất của hai SINR đạt đỉnh; điểm (3; 6/11) ứng với chia đều.](img/lec-02/gp-power.svg)

Trên hình, giá trị nhỏ nhất của hai SINR dọc đường ngân sách đạt đỉnh tại giao điểm $p_1=2$.

## 8. Xấp xỉ lồi và nới lỏng

Số lỗi phân loại là hàm bậc thang, còn quyết định mua một gói dữ liệu là biến nhị phân; với các bài toán này, không cách viết nào đã gặp cho một bài toán lồi tương đương. Hai cách xử lý được xét gồm:

- thay mục tiêu bằng một hàm thay thế lồi, trên bốn ảnh của Ví dụ 02.1(b);
- mở rộng miền của một bài toán nhị phân thành một quy hoạch tuyến tính, trên bài toán chọn gói dữ liệu.

Với mỗi cách, chúng ta chỉ ra điều được bảo đảm và điều phải kiểm tra lại trên bài toán gốc.

### 8.1. Mất mát đếm lỗi không lồi

Với ngưỡng $\theta$, điểm số của ảnh $i$ là $u_i-\theta$, và biên có dấu của nó là $m_i(\theta)=y_i(u_i-\theta)$: dương khi điểm số cùng dấu với nhãn, tức khi ảnh được xếp đúng. Theo quy ước của Câu hỏi mở đầu, ảnh có biên bằng $0$ được tính là lỗi. Số lỗi là $E(\theta)=\sum_{i=1}^4\ell_{01}(m_i(\theta))$, với *mất mát đếm lỗi* (0–1 loss) $\ell_{01}(m)=1$ khi $m\le0$ và $\ell_{01}(m)=0$ khi $m>0$. Ví dụ sau lập bảng số lỗi theo ngưỡng.

::: example Ví dụ 02.24 (Bảng số lỗi theo ngưỡng)
**Dữ kiện.** Bốn ảnh của Ví dụ 02.1(b): $u=(-2,-1,1,2)$, $y=(-1,+1,-1,+1)$; biên có dấu $m_i(\theta)=y_i(u_i-\theta)$; số lỗi $E(\theta)=\sum_i\ell_{01}(m_i(\theta))$.

**Biên có dấu.** Bốn biên có dấu là $m_1=(-1)(-2-\theta)=2+\theta$, $m_2=-1-\theta$, $m_3=(-1)(1-\theta)=\theta-1$, $m_4=2-\theta$. Do đó:

- ảnh $1$ sai khi $\theta\le-2$;
- ảnh $2$ sai khi $\theta\ge-1$;
- ảnh $3$ sai khi $\theta\le1$;
- ảnh $4$ sai khi $\theta\ge2$.

**Bảng số lỗi.** Ghép lại:

| Khoảng $\theta$ | Ảnh sai | $E(\theta)$ |
|---|---|---:|
| $\theta\le-2$ | 1, 3 | $2$ |
| $-2<\theta<-1$ | 3 | $1$ |
| $-1\le\theta\le1$ | 2, 3 | $2$ |
| $1<\theta<2$ | 2 | $1$ |
| $\theta\ge2$ | 2, 4 | $2$ |

**Kết luận.** Giá trị tối ưu là $1$, đạt trên hai khoảng mở $(-2,-1)$ và $(1,2)$. Hàm $E$ không lồi: $E(-\tfrac32)=E(\tfrac32)=1$ nhưng tại trung điểm, $E(0)=2>\tfrac12\cdot1+\tfrac12\cdot1$, vi phạm bất đẳng thức của Định nghĩa 01.21 với trọng số $\tfrac12$.

**Kiểm tra lại.** Tại $\theta=-\tfrac32$: $m=(\tfrac12,\tfrac12,-\tfrac52,\tfrac72)$, chỉ $m_3\le0$. Tại $\theta=0$: $m=(2,-1,-1,2)$, hai lỗi. Tập nghiệm $(-2,-1)\cup(1,2)$ không lồi, nên theo Hệ quả 02.4(b), không bài toán nào thỏa Định nghĩa 02.1 theo biến $\theta$ có tập nghiệm này.
:::

Liệt kê các khoảng như trên là đủ cho bốn ảnh. Nói chung, cực tiểu số lỗi phân loại tuyến tính là một bài toán tối ưu tổ hợp khó (Boyd và Vandenberghe (2004), §8.6.1, tr. 425).

### 8.2. Hàm thay thế lồi và mất mát bản lề

Về mặt ý tưởng, chúng ta thay hàm bậc thang $\ell_{01}$ bằng một hàm lồi nằm trên nó. Tổng của các hàm lồi theo $\theta$ là lồi, nên bài toán mới thuộc các lớp đã học, và do hàm mới nằm trên $\ell_{01}$, giá trị của nó chặn trên số lỗi.

![Theo biên có dấu m từ −2 đến 2: mất mát đếm lỗi là bậc thang bằng 1 khi m ≤ 0; mất mát bản lề max(0, 1 − m) giảm tuyến tính tới 0 tại m = 1 và luôn nằm trên mất mát đếm lỗi.](img/lec-02/ap-hinge.svg)

Trên hình, mất mát bản lề phạt cả những mẫu đúng nhưng có biên nhỏ hơn $1$, và phạt tuyến tính các mẫu sai theo mức độ sai. Hai khái niệm được định nghĩa như sau.

::: definition Định nghĩa 02.35 (Hàm thay thế lồi và mất mát bản lề)
Một *hàm thay thế lồi* (convex surrogate) của mất mát đếm lỗi là một hàm lồi $\ell:\mathbb R\to\mathbb R$ thỏa $\ell(m)\ge\ell_{01}(m)$ với mọi $m$.

*Mất mát bản lề* (hinge loss) là $\ell_{\mathrm{hinge}}(m)=\max(0,1-m)$.

Với bộ phân loại tuyến tính có tham số $(w,w_0)\in\mathbb R^d\times\mathbb R$, điểm số $w^Tu+w_0$ và dữ liệu $(u_i,y_i)$, $i=1,\ldots,N$, tổng mất mát bản lề là $H(w,w_0)=\sum_{i=1}^N\ell_{\mathrm{hinge}}\bigl(y_i(w^Tu_i+w_0)\bigr)$. Mô hình ngưỡng một chiều là trường hợp $d=1$, $w=1$, $w_0=-\theta$, với $H(\theta)=\sum_i\ell_{\mathrm{hinge}}(m_i(\theta))$.
:::

Hàm bản lề lồi vì là cực đại của hai hàm affine (Ví dụ 01.15(c)). Hàm thay thế và mất mát bản lề được trình bày ở Murphy (2022), §4.3.2.

Bảo đảm của hàm thay thế được phát biểu trong mệnh đề sau.

::: proposition Mệnh đề 02.36 (Bảo đảm và giới hạn của hàm thay thế) — chứng minh đầy đủ
**Giả thiết.** $\ell$ là hàm thay thế lồi; $H_\ell(w,w_0)=\sum_i\ell(y_i(w^Tu_i+w_0))$ và $E(w,w_0)=\sum_i\ell_{01}(y_i(w^Tu_i+w_0))$.

**Kết luận.**

- (a) $\ell_{\mathrm{hinge}}$ là một hàm thay thế lồi.
- (b) $H_\ell$ lồi theo $(w,w_0)$, và $E(w,w_0)\le H_\ell(w,w_0)$ với mọi $(w,w_0)$; do đó $\inf E\le\inf H_\ell$, và $H_\ell(w,w_0)=0$ kéo theo $E(w,w_0)=0$.
- (c) Bài toán $\min_{w,w_0}H(w,w_0)$ với mất mát bản lề tương đương với quy hoạch tuyến tính $\min_{w,w_0,\xi}\mathbf 1^T\xi$ với $\xi_i\ge1-y_i(w^Tu_i+w_0)$, $\xi_i\ge0$.
:::

::: proof Chứng minh Mệnh đề 02.36
**Lộ trình.** Kiểm $\ell_{\mathrm{hinge}}\ge\ell_{01}$ theo dấu của biên; cộng các bất đẳng thức từng mẫu; Định lý 02.15 cho phần (c).

**Bước 1 (phần (a)).** $\ell_{\mathrm{hinge}}$ lồi theo Ví dụ 01.15(c). Xét hai trường hợp.

- Nếu $m\le0$ thì $1-m\ge1$, nên $\ell_{\mathrm{hinge}}(m)\ge1=\ell_{01}(m)$.
- Nếu $m>0$ thì $\ell_{\mathrm{hinge}}(m)\ge0=\ell_{01}(m)$.

**Bước 2 (phần (b): tính lồi).** Mỗi hạng $(w,w_0)\mapsto\ell(y_i(w^Tu_i+w_0))$ là hợp của hàm lồi $\ell$ với ánh xạ affine $(w,w_0)\mapsto y_i(w^Tu_i+w_0)$, lồi theo Định lý 01.30(b); tổng lồi theo Định lý 01.30(a).

**Bước 3 (phần (b): chặn trên số lỗi).** Cộng các bất đẳng thức $\ell_{01}(m_i)\le\ell(m_i)$ theo $i$ cho $E\le H_\ell$ tại mọi điểm. Với mọi $(w,w_0)$, $\inf E\le E(w,w_0)\le H_\ell(w,w_0)$, nên $\inf E$ là một cận dưới của $H_\ell$ và không lớn hơn $\inf H_\ell$. Nếu $H_\ell(w,w_0)=0$ thì $0\le E(w,w_0)\le0$.

**Bước 4 (phần (c)).** $\ell_{\mathrm{hinge}}(y_i(w^Tu_i+w_0))=\max(0,\ 1-y_i(w^Tu_i+w_0))$ là cực đại của hai hàm affine theo $(w,w_0)$. Định lý 02.15 với $f_0=0$, $C=\mathbb R^{d+1}$, $\gamma_i=1$ thay mỗi cực đại bằng một biến phụ $\xi_i$ và hai ràng buộc tuyến tính. $\square$
:::

Mệnh đề 02.36 chỉ cho bảo đảm một chiều: từ $E\le H$ không suy ra được điểm cực tiểu của $H$ là điểm cực tiểu của $E$, và ví dụ sau cho một phản ví dụ. Bảo đảm chỉ liên quan đến số lỗi trên tập huấn luyện.

::: example Ví dụ 02.25 (Nghiệm của hàm thay thế và số lỗi tại nghiệm)
**Dữ kiện.** Bốn ảnh của Ví dụ 02.1(b), biên có dấu $m_i(\theta)=y_i(u_i-\theta)$; theo Ví dụ 02.24, $E=1$ trên $(-2,-1)\cup(1,2)$ và $E=2$ ở các ngưỡng còn lại.

**Lập hàm thay thế.** Với dữ liệu của Ví dụ 02.24, $1-m_1=-1-\theta$, $1-m_2=2+\theta$, $1-m_3=2-\theta$, $1-m_4=\theta-1$, nên

$$
\begin{aligned}
H(\theta)&=\max(0,-1-\theta)\\
&\quad+\max(0,2+\theta)\\
&\quad+\max(0,2-\theta)\\
&\quad+\max(0,\theta-1).
\end{aligned}
$$

**Cực tiểu $H$.**

- Hai hạng giữa: khi $\lvert\theta\rvert\le2$, tổng của chúng là $(2+\theta)+(2-\theta)=4$; khi $\theta>2$ là $2+\theta>4$; khi $\theta<-2$ là $2-\theta>4$.
- Hai hạng ngoài bằng $0$ khi $\theta\in[-1,1]$, và có ít nhất một hạng dương khi $\theta\notin[-1,1]$.

Vậy $\min_\theta H=4$, đạt đúng trên đoạn $[-1,1]$. Theo Mệnh đề 02.36(c), quy hoạch tuyến tính $\min\sum_i\xi_i$ với $\xi_i\ge1-m_i(\theta)$, $\xi_i\ge0$ có cùng giá trị $4$.

**Số lỗi tại các nghiệm của $H$.** Theo bảng của Ví dụ 02.24, $E(\theta)=2$ với mọi $\theta\in[-1,1]$. Số lỗi nhỏ nhất là $1$, đạt chẳng hạn tại $\theta=-\tfrac32$, nơi $H(-\tfrac32)=\tfrac12+\tfrac12+\tfrac72+0=\tfrac92$. Vậy mọi nghiệm của bài toán thay thế có số lỗi gấp đôi số lỗi tối ưu.

**Kiểm tra lại.** $H(0)=0+2+2+0=4$, và $E(0)=2\le4$; $H(-\tfrac32)=4{,}5\ge E(-\tfrac32)=1$. Hai cặp đều thỏa $E\le H$ của Mệnh đề 02.36(b). Cận $\inf E=1\le\inf H=4$ đúng nhưng cách xa.
:::

![Theo ngưỡng từ −2 đến 2: tổng bản lề H nằm ngang ở mức 4 trên [−1, 1] và tăng ở hai bên; số lỗi bằng 1 trên (−2, −1) và (1, 2), bằng 2 ở các chỗ còn lại.](img/lec-02/ap-threshold.svg)

Trên hình, hai mục tiêu có tập nghiệm rời nhau.

Nghiệm của tổng bản lề là các ngưỡng ở giữa, nơi không ảnh nào có biên âm lớn. Nghiệm của số lỗi là các ngưỡng lệch về một phía, chấp nhận một ảnh bị phân loại sai với biên âm lớn, chẳng hạn ảnh $3$ với biên $-\tfrac52$ tại $\theta=-\tfrac32$.

::: remark Nhận xét 02.37 (Hàm thay thế trong thiết kế phương pháp học)
Mục đích của bộ phân loại là dự đoán đúng trên dữ liệu chưa thấy; số lỗi huấn luyện chỉ là đại diện. Dùng hàm thay thế dựa trên hai căn cứ:

1. toán học: Mệnh đề 02.36 cho bài toán lồi kèm bảo đảm một chiều;
2. tính toán: bài toán thay thế giải được bằng quy hoạch tuyến tính hoặc bậc hai.

Ví dụ 02.25 cho thấy số lỗi phải được tính lại tại nghiệm của bài toán thay thế. Vì mục đích là dự đoán trên dữ liệu chưa thấy, số lỗi đó được đo trên tập kiểm định. Nhầm lẫn thường gặp là báo cáo giá trị $H$ như số lỗi.
:::

Mất mát bản lề, logistic và entropy chéo là các hàm thay thế lồi dùng trong học máy. Với điểm số tuyến tính theo tham số $(w,w_0)$, mất mát huấn luyện $H_\ell$ lồi theo Mệnh đề 02.36(b), còn $E$ là độ đo đánh giá. Khi điểm số là đầu ra của mạng nơ-ron, ánh xạ từ tham số tới điểm số không affine, giả thiết của Định lý 01.30(b) bị vi phạm và $H_\ell$ không còn lồi. Bảo đảm $E\le H_\ell$ thì vẫn đúng, vì nó chỉ dùng $\ell\ge\ell_{01}$.

### 8.3. Máy vector hỗ trợ lề mềm

Mất mát bản lề áp dụng được cho bộ phân loại tuyến tính nhiều đặc trưng, nhưng cực tiểu riêng $H(w,w_0)$ có một nhược điểm. Khi dữ liệu tách được, nhân một nghiệm có $H=0$ với một số lớn hơn $1$ vẫn giữ $H=0$, nên tập nghiệm không bị chặn và nghiệm không duy nhất.

Số hạng phạt bậc hai đặt lên $w$ chọn nghiệm có $\lVert w\rVert_2$ nhỏ, tức khoảng cách $1/\lVert w\rVert_2$ từ *biên quyết định* (decision boundary) $w^Tu+w_0=0$ tới các mặt $w^Tu+w_0=\pm1$ lớn. Ví dụ sau xét cả hai điều này với một đặc trưng.

::: example Ví dụ 02.26 (Mất mát bản lề có vô số nghiệm trên dữ liệu tách được)
**Dữ kiện.** Với một đặc trưng, tổng mất mát bản lề là $H(w,w_0)=\sum_i\max\bigl(0,1-y_i(wu_i+w_0)\bigr)$ (Định nghĩa 02.35).

**Không có số hạng phạt.** Với hai mẫu $u=-1$ (nhãn $-1$) và $u=1$ (nhãn $+1$), Câu hỏi cuối buổi của Bài 01 cho $H(w,0)=2\max(0,1-w)$, với tập nghiệm $\{w\ge1\}$.

**Thêm số hạng phạt.** Thêm $\tfrac\lambda2w^2$ với $0<\lambda\le2$.

- Trên $w<1$, đạo hàm $\lambda w-2<\lambda-2\le0$.
- Trên $w\ge1$, mục tiêu $\tfrac\lambda2w^2$ tăng.

Do đó nghiệm theo $w$ (với $w_0=0$) là $w=1$, giá trị $\tfrac\lambda2$.

**Kiểm tra lại.** Với $\lambda=2$ và $w=1$, mục tiêu bằng $1=\tfrac\lambda2$; với $w=0{,}8$, nó bằng $0{,}64+0{,}4=1{,}04>1$.
:::

Ghép tổng mất mát bản lề với số hạng phạt bậc hai, ta được mô hình theo định nghĩa sau.

::: definition Định nghĩa 02.38 (Máy vector hỗ trợ lề mềm)
Cho dữ liệu $(u_i,y_i)\in\mathbb R^d\times\{-1,+1\}$, $i=1,\ldots,N$, và $\lambda>0$. *Máy vector hỗ trợ lề mềm* (soft-margin support vector machine, soft-margin SVM; Murphy (2022), §17.3.3) là bài toán

$$
\begin{aligned}
&\underset{w\in\mathbb R^d,\ w_0\in\mathbb R}{\operatorname{minimize}}\\
&\ \ H_\lambda(w,w_0)=\frac\lambda2\lVert w\rVert_2^2\\
&\ +\textstyle\sum_{i=1}^N\max\bigl(0,\\
&\qquad1-y_i(w^Tu_i+w_0)\bigr).
\end{aligned}
\tag{8.1}
$$
:::

Trong khi máy vector hỗ trợ lề cứng đòi mọi mẫu thỏa ràng buộc lề thì mô hình lề mềm cho phép vi phạm và phạt nó bằng mất mát bản lề. Máy lề cứng ở Ví dụ 01.11(b) được viết không có hệ số chặn, $y_iu_i^Tw\ge1$, còn ở đây có thêm $w_0$; khi bỏ hệ số chặn, Bài tập 01.18 cho mục tiêu lồi chặt và đúng một nghiệm.

Mệnh đề sau xếp lớp (8.1) và nêu tính chất nghiệm.

::: proposition Mệnh đề 02.39 (Máy vector hỗ trợ lề mềm là quy hoạch bậc hai) — chứng minh đầy đủ
**Giả thiết.** Bài toán (8.1) với $\lambda>0$, và dữ liệu có ít nhất một mẫu mỗi nhãn.

**Kết luận.** (a) (8.1) tương đương với quy hoạch bậc hai

$$
\begin{aligned}
&\underset{w,w_0,\xi}{\operatorname{minimize}}\ \frac\lambda2w^Tw+\mathbf 1^T\xi\\
&\text{subject to}\\
&\ \ \xi_i\ge1-y_i(w^Tu_i+w_0),\\
&\ \ \xi_i\ge0,\quad i=1,\ldots,N .
\end{aligned}
$$

(b) (8.1) có nghiệm.

(c) Thành phần $w$ của nghiệm là duy nhất.
:::

::: proof Chứng minh Mệnh đề 02.39
**Lộ trình.** Định lý 02.15 cho phần (a); một tập mức dưới đóng, bị chặn cho sự tồn tại; tính lồi chặt của $\tfrac\lambda2\lVert w\rVert_2^2$ cho phần (c).

**Bước 1 (phần (a)).** Áp dụng Định lý 02.15 với $f_0(w,w_0)=\tfrac\lambda2\lVert w\rVert_2^2$, $C=\mathbb R^{d+1}$, $\gamma_i=1$. Theo thứ tự biến $(w,w_0,\xi)$, mục tiêu có ma trận bậc hai $\operatorname{diag}(\lambda I_d,0,0_N)\succeq0$, các ràng buộc affine, nên bài toán là quy hoạch bậc hai theo Định nghĩa 02.17.

**Bước 2 (phần (b): chặn dưới theo $w_0$ và $w$).** Gọi $i_+$, $i_-$ là chỉ số của một mẫu nhãn $+1$ và một mẫu nhãn $-1$, và $U=\max_i\lVert u_i\rVert_2$. Mỗi hạng bản lề không nhỏ hơn biểu thức bên trong, và Cauchy–Schwarz cho $\lvert w^Tu_i\rvert\le U\lVert w\rVert_2$, nên

$$
\begin{aligned}
H_\lambda(w,w_0)&\ge1-w^Tu_{i_+}-w_0\\
&\ge1-w_0-U\lVert w\rVert_2,\\
H_\lambda(w,w_0)&\ge1+w^Tu_{i_-}+w_0\\
&\ge1+w_0-U\lVert w\rVert_2,
\end{aligned}
$$

và $H_\lambda(w,w_0)\ge\tfrac\lambda2\lVert w\rVert_2^2$.

**Bước 3 (phần (b): tồn tại).** Nếu $H_\lambda(w,w_0)\le\bar H$ thì $\lVert w\rVert_2\le\sqrt{2\bar H/\lambda}$ và $\lvert w_0\rvert\le\bar H-1+U\sqrt{2\bar H/\lambda}$. Với $\bar H=H_\lambda(0,0)$, tập $\{H_\lambda\le\bar H\}$ không rỗng, bị chặn, và đóng vì $H_\lambda$ liên tục; Định lý 01.35 cho một điểm cực tiểu trên tập này, và điểm đó là nghiệm trên $\mathbb R^{d+1}$.

**Bước 4 (phần (c)).** Giả sử $(w,w_0)$ và $(w',w_0')$ là hai nghiệm với $w\ne w'$, cùng giá trị $p^*$. Tại trung điểm, hàm $\tfrac\lambda2\lVert\cdot\rVert_2^2$ lồi chặt cho

$$
\begin{aligned}
\tfrac\lambda2\lVert\tfrac{w+w'}2\rVert_2^2&<\tfrac12\cdot\tfrac\lambda2\lVert w\rVert_2^2\\
&\quad+\tfrac12\cdot\tfrac\lambda2\lVert w'\rVert_2^2,
\end{aligned}
$$

còn tổng bản lề lồi theo $(w,w_0)$ cho bất đẳng thức không chặt cùng chiều. Cộng lại, $H_\lambda$ tại trung điểm nhỏ hơn $\tfrac12p^*+\tfrac12p^*=p^*$, mâu thuẫn. $\square$
:::

Hệ số chặn $w_0$ có thể không duy nhất: với $N=2$, $u_1=u_2=0$, $y_1=+1$, $y_2=-1$, mục tiêu là $\tfrac\lambda2w^2+\max(0,1-w_0)+\max(0,1+w_0)$, bằng $2$ với $w=0$ và mọi $w_0\in[-1,1]$.

Khác Mệnh đề 02.21, số hạng phạt chỉ đặt lên $w$, nên tính duy nhất chỉ còn cho $w$.

Khi $\lambda=0$, quy hoạch bậc hai suy biến thành quy hoạch tuyến tính của Mệnh đề 02.36(c).

::: remark Nhận xét 02.40 (Giả thiết hai nhãn không cần cho sự tồn tại)
Nếu mọi nhãn bằng $+1$, thì $w=0$ và mọi $w_0\ge1$ cho $H_\lambda=0$, giá trị nhỏ nhất có thể vì $H_\lambda\ge0$. Nghiệm vẫn tồn tại, và tập nghiệm $\{(0,w_0)\mid w_0\ge1\}$ không bị chặn.
:::

Theo Mệnh đề 02.39, huấn luyện máy vector hỗ trợ lề mềm là quy hoạch bậc hai lồi với $d+1+N$ biến, có nghiệm và có $w$ duy nhất, nên mọi bộ giải trả về cùng một hướng của biên quyết định. Hệ số $\lambda$ điều khiển đánh đổi giữa lề rộng và tổng vi phạm.

### 8.4. Nới lỏng bài toán nhị phân

Cách xử lý thứ hai giữ mục tiêu và thay đổi miền.

Giả sử một nhóm phát triển mô hình nhận diện người đi bộ cần mua ảnh đã gán nhãn cho ba bối cảnh: ngày khô, đêm khô, trời mưa. Ảnh được bán theo ba gói nguyên, mỗi gói chứa hai bối cảnh. Phương án mua cả ba gói có chi phí $6$ triệu đồng; bài toán là tìm phương án có chi phí nhỏ nhất.

::: example Ví dụ 02.27 (Mô hình nhị phân của bài toán chọn gói)
**Dữ kiện.** Ba gói bán nguyên gói, mỗi gói $2$ triệu đồng:

- gói $1$ gồm ngày khô và đêm khô;
- gói $2$ gồm đêm khô và trời mưa;
- gói $3$ gồm ngày khô và trời mưa.

Cần tìm cách mua có chi phí nhỏ nhất sao cho mỗi bối cảnh có trong ít nhất một gói.

**Lập mô hình.** Biến $x_j=1$ nếu mua gói $j$ và $x_j=0$ nếu không. Mỗi bối cảnh phải có ít nhất một gói chứa nó:

$$
\begin{aligned}
&\underset{x}{\operatorname{minimize}}\ 2(x_1+x_2+x_3)\\
&\text{subject to}\\
&\ \ x_1+x_3\ge1,\\
&\ \ x_1+x_2\ge1,\\
&\ \ x_2+x_3\ge1,\\
&\ \ x\in\{0,1\}^3,
\end{aligned}
\tag{8.2}
$$

lần lượt cho ngày khô, đêm khô và trời mưa.

**Liệt kê tám phương án.**

- Không mua hoặc mua đúng một gói luôn thiếu một bối cảnh.
- $(1,1,0)$, $(1,0,1)$, $(0,1,1)$ khả thi với chi phí $4$.
- $(1,1,1)$ khả thi với chi phí $6$.

Tập khả thi $\mathcal F=\{(1,1,0),(1,0,1),(0,1,1),(1,1,1)\}$ và giá trị tối ưu $p^*=4$.

**Kiểm tra lại.** $\mathcal F$ không lồi: trung điểm của $(1,1,0)$ và $(1,0,1)$ là $(1,\tfrac12,\tfrac12)\notin\{0,1\}^3$. Mục tiêu và các ràng buộc phủ đều affine, nên (8.2) không lồi chỉ vì điều kiện nhị phân.
:::

Với ba gói, liệt kê là đủ, nhưng với $n$ gói, có $2^n$ phương án.

Một cách trực quan, ta bỏ điều kiện nguyên và cho phép $x_j$ nhận mọi giá trị trong $[0,1]$. Bài toán mới là quy hoạch tuyến tính có tập khả thi chứa $\mathcal F$, nên giá trị tối ưu của nó không lớn hơn $p^*$. Để làm rõ quan hệ giữa hai bài toán, xem định nghĩa sau.

::: definition Định nghĩa 02.41 (Nới lỏng)
Cho bài toán $(\mathrm P_{\mathcal F})$: $\min_{x\in\mathcal F}f_0(x)$. Một bài toán $(\mathrm P_{\tilde{\mathcal F}})$: $\min_{x\in\tilde{\mathcal F}}f_0(x)$ với cùng mục tiêu và $\mathcal F\subseteq\tilde{\mathcal F}$ được gọi là một *nới lỏng* (relaxation) của $(\mathrm P_{\mathcal F})$.

Với bài toán nhị phân có ràng buộc tuyến tính, $\mathcal F=\{x\in\{0,1\}^n\mid Gx\le h\}$, *nới lỏng tuyến tính* (LP relaxation) là bài toán trên $\tilde{\mathcal F}=\{x\in[0,1]^n\mid Gx\le h\}$.
:::

Nới lỏng khác biến đổi tương đương ở chỗ tập khả thi được mở rộng, và khác hàm thay thế ở chỗ mục tiêu giữ nguyên.

Nới lỏng tuyến tính của một bài toán nhị phân có mục tiêu tuyến tính là quy hoạch tuyến tính, vì $x_j\in[0,1]$ là hai bất đẳng thức tuyến tính. Ký hiệu $p^*_{\mathcal F}$ và $p^*_{\tilde{\mathcal F}}$ cho hai giá trị tối ưu.

Từ Mệnh đề 01.15 về hai bài toán có miền lồng nhau, ta suy ra các cận và chứng nhận sau cho nới lỏng.

::: proposition Mệnh đề 02.42 (Cận và chứng nhận từ nới lỏng) — chứng minh đầy đủ
**Giả thiết.** $(\mathrm P_{\tilde{\mathcal F}})$ là nới lỏng của $(\mathrm P_{\mathcal F})$.

**Kết luận.**

- (a) $p^*_{\tilde{\mathcal F}}\le p^*_{\mathcal F}$.
- (b) Nếu $\tilde{\mathcal F}$ rỗng thì $\mathcal F$ rỗng.
- (c) Nếu một nghiệm $\tilde x$ của $(\mathrm P_{\tilde{\mathcal F}})$ thuộc $\mathcal F$ thì $\tilde x$ là nghiệm của $(\mathrm P_{\mathcal F})$ và $p^*_{\mathcal F}=p^*_{\tilde{\mathcal F}}$.
- (d) Với mọi $\hat x\in\mathcal F$, $p^*_{\tilde{\mathcal F}}\le p^*_{\mathcal F}\le f_0(\hat x)$, nên khoảng cách từ $f_0(\hat x)$ tới giá trị tối ưu không vượt $f_0(\hat x)-p^*_{\tilde{\mathcal F}}$.
:::

::: proof Chứng minh Mệnh đề 02.42
**Lộ trình.** Mỗi phần là Mệnh đề 01.15 cho hai miền lồng nhau $\mathcal F\subseteq\tilde{\mathcal F}$.

**Bước 1 (phần (a)).** Đây là Mệnh đề 01.15(a) với $C=\tilde{\mathcal F}$ và $C'=\mathcal F$.

**Bước 2 (phần (b)).** $\mathcal F\subseteq\tilde{\mathcal F}=\varnothing$.

**Bước 3 (phần (c)).** Vì $\tilde x\in\mathcal F\subseteq\tilde{\mathcal F}$ là nghiệm trên $\tilde{\mathcal F}$, Mệnh đề 01.15(b) cho $\tilde x$ là nghiệm trên $\mathcal F$ và hai giá trị bằng nhau.

**Bước 4 (phần (d)).** Vế trái là (a). Vế phải đúng vì $\hat x\in\mathcal F$ và $p^*_{\mathcal F}$ là cận dưới đúng của $f_0$ trên $\mathcal F$. Trừ $p^*_{\mathcal F}\ge p^*_{\tilde{\mathcal F}}$ khỏi $f_0(\hat x)$ cho $f_0(\hat x)-p^*_{\mathcal F}\le f_0(\hat x)-p^*_{\tilde{\mathcal F}}$. $\square$
:::

Với bài toán cực đại, giá trị của nới lỏng là cận trên. Nghiệm của nới lỏng có thể không thuộc $\mathcal F$, và làm tròn nó có thể cho phương án không khả thi hoặc không tối ưu.

Trong thực hành, người ta dùng phần (d), vì bộ giải trả về phương án khả thi $\hat x$ cùng cận $p^*_{\tilde{\mathcal F}}$, và hiệu $f_0(\hat x)-p^*_{\tilde{\mathcal F}}$ đo mức có thể còn cải thiện. Ví dụ sau áp dụng mệnh đề này cho bài toán chọn gói.

::: example Ví dụ 02.28 (Nghiệm của nới lỏng tuyến tính và chứng nhận $p^*=4$)
**Dữ kiện.** Bài toán chọn gói (8.2): $\min2(x_1+x_2+x_3)$ với $x_1+x_3\ge1$, $x_1+x_2\ge1$, $x_2+x_3\ge1$, $x\in\{0,1\}^3$; liệt kê cho $p^*=4$ (Ví dụ 02.27).

**Giải nới lỏng.** Nới lỏng tuyến tính của (8.2) thay $x\in\{0,1\}^3$ bằng $0\le x_j\le1$. Cộng ba ràng buộc phủ: $(x_1+x_3)+(x_1+x_2)+(x_2+x_3)\ge3$, tức

$$
2(x_1+x_2+x_3)\ge3 .
$$

Mọi điểm khả thi của nới lỏng có chi phí ít nhất $3$, và $\tilde x=(\tfrac12,\tfrac12,\tfrac12)$ khả thi (mỗi ràng buộc phủ cho $\tfrac12+\tfrac12=1$) với chi phí $3$. Vậy $p^*_{\tilde{\mathcal F}}=3$, đạt tại một điểm không nhị phân; đây cũng là Mệnh đề 02.11 với $\mu=(1,1,1)$.

**Khôi phục phương án.**

- Làm tròn xuống cho $(0,0,0)$, không khả thi.
- Làm tròn lên cho $(1,1,1)$, khả thi với chi phí $6$.
- Bỏ một gói khỏi $(1,1,1)$, chẳng hạn gói $3$, cho $(1,1,0)$, khả thi với chi phí $4$.

**Ghép cận.** Theo Mệnh đề 02.42(d), $3\le p^*\le4$. Mọi chi phí khả thi là bội của $2$, và trong $[3,4]$ chỉ có $4$ là bội của $2$, nên $p^*=4$ và $(1,1,0)$ là nghiệm.

**Kiểm tra lại.** Kết luận khớp với liệt kê ở Ví dụ 02.27. Cận dưới $3$ không đạt được bởi phương án nhị phân nào, và chi phí $6$ của phương án làm tròn lên chỉ là một cận trên.
:::

![Ba thanh ứng với ba gói, mỗi thanh tô một nửa chiều cao, biểu diễn nghiệm phân số x1 = x2 = x3 = 1/2 của nới lỏng; chú thích ghi mỗi gói chỉ bán nguyên.](img/lec-02/ap-cover.svg)

Trên hình là nghiệm phân số của nới lỏng. Lập luận "bội của $2$" là bước riêng của bài toán này: với giá khác nhau, khoảng $[p^*_{\tilde{\mathcal F}},f_0(\hat x)]$ có thể chứa nhiều giá trị khả dĩ, và cần liệt kê hoặc một phương pháp khác.

::: remark Nhận xét 02.43 (Bốn phép xử lý và ý nghĩa của nghiệm)
Bảng sau phân biệt bốn phép xử lý của bài theo quan hệ giữa nghiệm của bài toán mới và bài toán gốc.

| Phép xử lý | Quan hệ với bài toán gốc | Việc phải làm sau khi giải |
|---|---|---|
| Biến đổi tương đương (Định nghĩa 02.5): biến phụ, biến bù, đổi biến logarit | ánh xạ $\psi$ cho bằng công thức chuyển mọi nghiệm thành nghiệm của bài toán gốc (Nhận xét 02.7) | áp dụng $\psi$ |
| Thay mất mát (Định nghĩa 02.35): số lỗi thành bản lề | chỉ có $E\le H$; nghiệm nói chung không là nghiệm của bài toán gốc (Ví dụ 02.25) | đo lại mục tiêu gốc tại nghiệm |
| Thay ràng buộc bằng số hạng phạt: ràng buộc chặn chuẩn hay giới hạn số đặc trưng thành số hạng phạt | từ số hạng phạt chỉ suy ra một mức chặn (Mệnh đề 02.26); ràng buộc gốc có thể bị vi phạm | kiểm tra lại ràng buộc gốc |
| Nới lỏng (Định nghĩa 02.41): nhị phân thành khoảng | mục tiêu giữ nguyên, miền mở rộng; giá trị chỉ cho cận | khôi phục phương án khả thi, ghép cận |

Ba nhầm lẫn thường gặp:

1. gọi một phép ở ba dòng dưới là biến đổi tương đương;
2. đọc giá trị của nới lỏng như giá trị của bài toán gốc;
3. coi một điểm khả thi của nới lỏng, như $(1,1,1)$ với chi phí $6$, là một cận dưới.
:::

::: exercise Bài tập 02.8 (Mất mát logistic cơ số hai)
Cho $\ell(m)=\log_2(1+e^{-m})$ và bốn ảnh của Ví dụ 02.1(b), với biên có dấu $m_i(\theta)=y_i(u_i-\theta)$.

(a) Chứng minh $\ell$ là hàm thay thế lồi của $\ell_{01}$.

(b) Đặt $H_\ell(\theta)=\sum_i\ell(m_i(\theta))$. Tính $H_\ell(0)$ và $H_\ell(-\tfrac32)$ (bốn chữ số thập phân).

(c) Chứng minh $H_\ell(-\theta)=H_\ell(\theta)$ và suy ra $\theta=0$ là nghiệm của $\min_\theta H_\ell$. So sánh với số lỗi $E(0)=2$ và $E(-\tfrac32)=1$ của Ví dụ 02.24.
:::

::: hint
Ở (a), $\ell(m)=\log(1+e^{-m})/\log2$; dùng Mệnh đề 01.8(c). Ở (c), phép đổi $(u,y)\mapsto(-u,-y)$ hoán vị bốn mẫu.
:::

::: solution
**(a) Tính lồi.** $\ell(m)=\log(1+e^{-m})/\log2$, và theo Mệnh đề 01.8(c), $\ell''(m)=e^m/\bigl((1+e^m)^2\log2\bigr)>0$, nên $\ell$ lồi.

**(a) Nằm trên $\ell_{01}$.**

- Nếu $m\le0$ thì $e^{-m}\ge1$, $1+e^{-m}\ge2$ và $\ell(m)\ge\log_22=1$.
- Nếu $m>0$ thì $\ell(m)>0$.

Vậy $\ell\ge\ell_{01}$.

**(b) Tại $\theta=0$.** $m=(2,-1,-1,2)$, $\ell(2)=\log_2(1+e^{-2})\approx0{,}1831$, $\ell(-1)=\log_2(1+e)\approx1{,}8946$, nên

$$
\begin{aligned}
H_\ell(0)&\approx2(0{,}1831)+2(1{,}8946)\\
&\approx4{,}1555 .
\end{aligned}
$$

**(b) Tại $\theta=-\tfrac32$.** $m=(\tfrac12,\tfrac12,-\tfrac52,\tfrac72)$, $\ell(\tfrac12)\approx0{,}6839$, $\ell(-\tfrac52)\approx3{,}7206$, $\ell(\tfrac72)\approx0{,}0429$, nên

$$
\begin{aligned}
&H_\ell(-\tfrac32)\\
&\ \approx2(0{,}6839)+3{,}7206+0{,}0429\\
&\ \approx5{,}1314 .
\end{aligned}
$$

**(c) Tính đối xứng.** Biên của mẫu $(-u,-y)$ tại $-\theta$ là $(-y)(-u+\theta)=y(u-\theta)$, biên của mẫu $(u,y)$ tại $\theta$. Phép đổi $(u,y)\mapsto(-u,-y)$ hoán vị bốn mẫu, nên $H_\ell(-\theta)=H_\ell(\theta)$.

**(c) Nghiệm.** Vì $H_\ell$ lồi (Mệnh đề 02.36(b)), $H_\ell(0)\le\tfrac12H_\ell(\theta)+\tfrac12H_\ell(-\theta)=H_\ell(\theta)$ với mọi $\theta$. Vậy $\theta=0$ là nghiệm, với $E(0)=2$, trong khi $E(-\tfrac32)=1$: mất mát logistic cho cùng hiện tượng như mất mát bản lề ở Ví dụ 02.25.

**Kiểm tra lại.** $H_\ell(1)=H_\ell(-1)\approx4{,}5905$ và $H_\ell(\tfrac12)\approx4{,}2643$, đều lớn hơn $H_\ell(0)\approx4{,}1555$.
:::

::: exercise Bài tập 02.9 (Phủ bốn bối cảnh)
Bốn bối cảnh A, B, C, D và bốn gói giá $1$: gói $1$ có A và B, gói $2$ có B và C, gói $3$ có C và D, gói $4$ có D và A. Viết nới lỏng tuyến tính của bài toán chọn gói có chi phí nhỏ nhất phủ đủ bốn bối cảnh, chứng minh giá trị của nó là $2$, và kết luận về bài toán nhị phân bằng Mệnh đề 02.42.
:::

::: hint
Cộng hai ràng buộc của bối cảnh B và D.
:::

::: solution
**Lập nới lỏng.** $\min\sum_jx_j$ với $x_4+x_1\ge1$, $x_1+x_2\ge1$, $x_2+x_3\ge1$, $x_3+x_4\ge1$, $0\le x_j\le1$.

**Cận dưới.** Cộng ràng buộc của bối cảnh B và D: $\sum_jx_j\ge2$.

**Nghiệm.** Điểm $(1,0,1,0)$ khả thi (mỗi ràng buộc có đúng một hạng bằng $1$) với giá trị $2$, nên là nghiệm của nới lỏng. Nó nhị phân, nên theo Mệnh đề 02.42(c) nó là nghiệm của bài toán nhị phân và $p^*=2$.

**So sánh.** Điểm $(\tfrac12,\tfrac12,\tfrac12,\tfrac12)$ cũng là nghiệm của nới lỏng. Với chu trình ba bối cảnh của Ví dụ 02.28, cận $3$ nhỏ hơn $p^*=4$.

**Kiểm tra lại.** Tại $(1,0,1,0)$, bốn ràng buộc cho $x_4+x_1=1$, $x_1+x_2=1$, $x_2+x_3=1$, $x_3+x_4=1$, đều thỏa; phương án $(1,1,1,0)$ khả thi với giá trị $3>2$.
:::

## 9. Nhận dạng lớp bài toán và kiểm tra phép xử lý

Giả sử một bộ phân loại tuyến tính hai đặc trưng được huấn luyện bằng mất mát bản lề trên bốn mẫu $u_1=(1,0)$, $u_2=(-1,0)$, $u_3=(0,1)$, $u_4=(0,-1)$ với nhãn $y=(+1,-1,+1,-1)$. Để giảm chi phí khi triển khai, bộ phân loại chỉ được dùng tối đa một đặc trưng, tức $w\in\mathbb R^2$ có nhiều nhất một tọa độ khác $0$. Mất mát lồi; ràng buộc số đặc trưng cần được xếp loại. Chúng ta lập một bảng nhận dạng các lớp bài toán và một thuật toán nhận dạng, rồi áp dụng cho ràng buộc này.

### 9.1. Bảng nhận dạng và quy trình

Bảng sau xếp các lớp đã gặp, theo biến $x\in\mathbb R^n$ và với $f_i(x)=\tfrac12x^TP_ix+q_i^Tx+\rho_i$.

| Lớp | Mục tiêu | Ràng buộc | Chứng nhận tính lồi | Kết quả |
|---|---|---|---|---|
| Quy hoạch tuyến tính | $c^Tx$ | $Gx\le h$, $Ax=b$ | mọi hàm affine | Định nghĩa 02.9, Mệnh đề 02.10 |
| Quy hoạch bậc hai | $f_0(x)$ | $Gx\le h$, $Ax=b$ | $P_0\succeq0$ | Định nghĩa 02.17, Mệnh đề 02.18 |
| Quy hoạch bậc hai có ràng buộc bậc hai | $f_0(x)$ | $f_i(x)\le0$, $Ax=b$ | $P_i\succeq0$ với mọi $i=0,\ldots,m$ | Định nghĩa 02.24, Mệnh đề 02.25 |
| Quy hoạch hình học | tổng đơn thức dương | tổng đơn thức dương $\le1$, đơn thức $=1$, $x>0$ | lồi sau đổi biến $z=\log x$ | Định nghĩa 02.29, Định lý 02.33 |
| Dạng phổ biến (4.1) | $f_0$ lồi | $f_i\le0$ với $f_i$ lồi, $Ax=b$ | từng dòng | Định nghĩa 02.1, Mệnh đề 02.2 |

Trong bảng trên, ba lớp đầu lồng nhau và cùng nằm trong dạng phổ biến (4.1), còn quy hoạch hình học tương đương với một bài toán dạng phổ biến sau đổi biến.

Các mục tiêu có tổng hoặc cực đại của hàm affine, như $\lVert r\rVert_1$, $\lVert r\rVert_\infty$ hay mất mát bản lề, thuộc các lớp trên sau khi thêm biến phụ.

Giả thiết của các lớp trong bảng và của hai phép xử lý (biến phụ, nới lỏng) gồm:

- (L1) dạng phổ biến: miền lồi, mục tiêu và mọi hàm ràng buộc bất đẳng thức lồi trên miền, mọi ràng buộc đẳng thức affine;
- (L2) quy hoạch bậc hai và quy hoạch bậc hai có ràng buộc bậc hai: mọi ma trận của phần bậc hai, kể cả của mục tiêu, nửa xác định dương;
- (L3) quy hoạch hình học: mọi biến dương, mọi hệ số dương, ràng buộc có dạng "tổng đơn thức dương $\le1$" hoặc "đơn thức $=1$";
- (L4) biến phụ: bài toán cực tiểu, mọi hệ số trước một cực đại không âm;
- (L5) nới lỏng: cùng mục tiêu, tập khả thi gốc nằm trong tập nới lỏng.

Quy trình đã dùng trong các ví dụ được viết lại thành thuật toán sau. Thuật toán này mở rộng Thuật toán 01.47, vốn chứng nhận một mô hình đã cho, bằng các bước biến đổi tương đương và đổi bài toán.

::: algorithm Thuật toán 02.44 (Nhận dạng và đưa một mô hình về bài toán lồi)
**Đầu vào.** Một mô hình tối ưu: dữ kiện, biến quyết định, mục tiêu, các ràng buộc.

**Đầu ra.** Một bài toán thuộc một lớp của bảng trên cùng ánh xạ khôi phục nghiệm; hoặc một bài toán lồi thay thế hay nới lỏng cùng bảo đảm của nó; hoặc kết luận rằng không phép xử lý nào của bài áp dụng được.

1. Ghi miền $D$, kiểu và chiều của mọi biến; đổi bài toán cực đại thành cực tiểu bằng cách đổi dấu mục tiêu, hoặc nghịch đảo một mục tiêu đơn thức (Mệnh đề 02.30(c)).
2. Kiểm tra từng dòng theo Định nghĩa 02.1: mục tiêu lồi; mỗi bất đẳng thức có dạng $f_i\le0$ với $f_i$ lồi; mỗi đẳng thức affine. Công cụ: Định lý 01.29, Định lý 01.30, Định lý 02.32.
3. Với mỗi dòng không đạt, thử viết lại thành một dòng tương đương có cùng tập nghiệm, như Ví dụ 02.2.
4. Nếu mục tiêu chứa tổng hoặc cực đại của hàm affine với hệ số không âm, thêm biến phụ theo Định lý 02.15.
5. Nếu mọi biến dương và các hàm là đơn thức hoặc tổng đơn thức dương, chuẩn hóa theo Mệnh đề 02.30 và đổi biến theo Định lý 02.33.
6. Nhận dạng lớp bằng bảng trên; kiểm tra tồn tại và duy nhất (Mệnh đề 02.18, 02.21, 02.25, 02.39, Định lý 01.34, 01.35, 01.38).
7. Nếu bước 2 đến bước 5 không cho dạng lồi, chọn một trong ba phép đổi bài toán của Nhận xét 02.43: thay mất mát bằng hàm thay thế lồi (Định nghĩa 02.35); thay ràng buộc bằng số hạng phạt; hoặc nới lỏng miền (Định nghĩa 02.41). Ghi rõ bảo đảm của phép đã chọn (Mệnh đề 02.36, 02.26 hoặc 02.42).
8. Kiểm tra từng phép đã dùng trước khi báo cáo kết quả:
   - biến phụ (L4): bài toán là cực tiểu, mọi hệ số trước cực đại không âm, ràng buộc biến phụ có đủ mọi nhánh của cực đại (Định lý 02.15, Nhận xét 02.16);
   - đổi biến logarit (L3): mọi biến và mọi hệ số dương, bất đẳng thức đúng chiều, giá trị tối ưu được đổi lại qua hàm mũ (Định lý 02.33, Nhận xét 02.34);
   - biến dư, tách biến tự do: nêu ánh xạ khôi phục $\psi$ (Mệnh đề 02.10);
   - sau khi giải: thực hiện việc ở cột cuối của bảng Nhận xét 02.43.

**Điều kiện dừng.** Quy trình dừng sau bước 8; hoặc ở bước 7 nếu không có hàm thay thế hay nới lỏng nào chấp nhận được với người dùng mô hình.

**Chi phí.** Các bước 1 đến 7 là kiểm tra trên công thức. Bước 4 thêm một biến và $K_i$ ràng buộc cho mỗi hạng cực đại; bước 5 không đổi số biến.
:::

Trong thuật toán trên, bước 3 giữ tập nghiệm, còn bước 7 cố ý đổi bài toán, nên bước 8 bắt buộc sau mọi phép đổi bài toán.

### 9.2. Ràng buộc số đặc trưng

Với yêu cầu ở đầu mục, ta ký hiệu $\lVert w\rVert_0$ cho số thành phần khác $0$ của $w$ và phát biểu bài toán theo định nghĩa sau.

::: definition Định nghĩa 02.45 (Ràng buộc số đặc trưng)
Với $w\in\mathbb R^d$, $\lVert w\rVert_0=\#\{j\mid w_j\ne0\}$. Cho dữ liệu $(u_i,y_i)\in\mathbb R^d\times\{-1,+1\}$ và số nguyên $k$ với $0\le k\le d$, bài toán phân loại bản lề với giới hạn số đặc trưng là

$$
\begin{aligned}
&\underset{w\in\mathbb R^d,\ w_0\in\mathbb R}{\operatorname{minimize}}\quad H(w,w_0)\\
&\text{subject to}\quad\lVert w\rVert_0\le k,
\end{aligned}
\tag{9.1}
$$

với $H$ như Định nghĩa 02.35. Hệ số chặn $w_0$ không bị đếm.
:::

Hàm $\lVert\cdot\rVert_0$ không là một chuẩn, vì với $w=(1,0,\ldots,0)$, $\lVert2w\rVert_0=1\ne2\lVert w\rVert_0$. Chuẩn một đo độ lớn, còn $\lVert w\rVert_0$ đếm số thành phần được dùng: $(2,0)$ và $(1,1)$ có cùng $\lVert\cdot\rVert_1=2$ nhưng $\lVert\cdot\rVert_0$ là $1$ và $2$.

Ràng buộc trong (9.1) đặt lên miền, nên theo Thuật toán 02.44, câu hỏi đầu tiên là miền có lồi không. Mệnh đề sau trả lời câu hỏi này.

::: proposition Mệnh đề 02.46 (Miền giới hạn số đặc trưng không lồi) — chứng minh đầy đủ
**Giả thiết.** $d\ge2$ và $\mathcal W_k=\{w\in\mathbb R^d\mid\lVert w\rVert_0\le k\}$.

**Kết luận.** $\mathcal W_k$ không lồi khi $1\le k\le d-1$. $\mathcal W_0=\{0\}$ và $\mathcal W_d=\mathbb R^d$ lồi.
:::

::: proof Chứng minh Mệnh đề 02.46
**Lộ trình.** Chỉ ra hai điểm của miền có trung điểm nằm ngoài miền.

**Bước 1 (hai điểm thuộc $\mathcal W_k$).** Với $1\le k\le d-1$, gọi $e_j$ là vector đơn vị thứ $j$. Đặt

$$
\begin{aligned}
w&=e_1+\cdots+e_{k-1}+e_k,\\
w'&=e_1+\cdots+e_{k-1}+e_{k+1}.
\end{aligned}
$$

Khi $k=1$, phần chung rỗng, $w=e_1$, $w'=e_2$; chỉ số $k+1\le d$ hợp lệ. Mỗi vector có đúng $k$ thành phần khác $0$, nên thuộc $\mathcal W_k$.

**Bước 2 (trung điểm không thuộc $\mathcal W_k$).** Trung điểm $\tfrac12(w+w')$ có thành phần $1$ tại $k-1$ chỉ số chung và $\tfrac12$ tại hai chỉ số $k$, $k+1$. Tổng cộng có $k+1$ thành phần khác $0$, nên trung điểm không thuộc $\mathcal W_k$.

**Bước 3 (hai trường hợp biên).** Với $k=0$, $\mathcal W_0=\{0\}$ là một điểm; với $k=d$, mọi vector thỏa ràng buộc. Cả hai lồi. $\square$
:::

![Mặt phẳng (w1, w2): tập vector có tối đa một hệ số khác không là hợp của hai trục; A = (1, 0) và B = (0, 1) thuộc tập, trung điểm M = (0,5; 0,5) không thuộc.](img/lec-02/feature-cardinality.svg)

Trên hình là trường hợp $d=2$, $k=1$ của Mệnh đề 02.46. Mục tiêu $H$ lồi nhưng miền không lồi, nên (9.1) không ở dạng phổ biến.

Cách giải trực tiếp là liệt kê mọi tập chỉ số có tối đa $k$ phần tử và giải bài toán lồi trên mỗi tập. Tuy nhiên, số bài toán con $\sum_{j=0}^k\binom dj$ tăng nhanh, chẳng hạn $\binom{100}{5}\approx7{,}5\cdot10^7$.

Theo bước 7 của Thuật toán 02.44, ta cũng có thể thay ràng buộc đếm bằng số hạng phạt chuẩn một. Số hạng phạt này lồi và có thể cho hệ số bằng đúng $0$, như Bổ đề 02.22 cho sai số bình phương. Ta được bài toán

$$
\begin{aligned}
&\underset{w,w_0}{\operatorname{minimize}}\\
&\quad H(w,w_0)+\lambda\lVert w\rVert_1 .
\end{aligned}
\tag{9.2}
$$

Theo Định lý 02.15, (9.2) là quy hoạch tuyến tính với biến $(w,w_0,\xi,v)$: $\min\mathbf 1^T\xi+\lambda\mathbf 1^Tv$ với $\xi_i\ge1-y_i(w^Tu_i+w_0)$, $\xi_i\ge0$, $-v\le w\le v$. Do đây là phép thay ràng buộc bằng số hạng phạt của Nhận xét 02.43, ta cần kiểm tra lại ràng buộc gốc tại nghiệm, như ví dụ sau cho thấy.

::: example Ví dụ 02.29 (Số hạng phạt chuẩn một không bảo đảm số đặc trưng)
**Dữ kiện.** Bốn mẫu ở đầu mục: $u_1=(1,0)$, $u_2=(-1,0)$, $u_3=(0,1)$, $u_4=(0,-1)$, nhãn $y=(+1,-1,+1,-1)$; bài toán (9.1) với $k=1$ và bài toán (9.2) với $\lambda=1$.

Ta chứng minh (9.2) có nghiệm duy nhất $w=(1,1)$, $w_0=0$, giá trị $2$.

**Bước 1 (cận cho từng cặp mẫu).** Mẫu $1$ và $2$ cho tổng hai hạng bản lề $\max(0,1-w_1-w_0)+\max(0,1-w_1+w_0)$, với tổng hai đối số bằng $2(1-w_1)$. Vì $\max(0,s)\ge0$ và $\max(0,s)\ge s$ với mọi $s$, tổng hai hạng không nhỏ hơn $2\max(0,1-w_1)$. Tương tự, mẫu $3$ và $4$ cho tổng không nhỏ hơn $2\max(0,1-w_2)$. Vậy

$$
\begin{aligned}
&H(w,w_0)+\lVert w\rVert_1\\
&\ \ge\textstyle\sum_{j=1}^2\bigl[2\max(0,1-w_j)\\
&\qquad+\lvert w_j\rvert\bigr].
\end{aligned}
$$

**Bước 2 (cận cho từng tọa độ).** Với $s\in\mathbb R$:

- nếu $s<0$, $2(1-s)+(-s)=2-3s>2$;
- nếu $0\le s\le1$, $2(1-s)+s=2-s\ge1$, dấu bằng khi $s=1$;
- nếu $s>1$, $0+s>1$.

Vậy $2\max(0,1-s)+\lvert s\rvert\ge1$, dấu bằng khi và chỉ khi $s=1$. Mục tiêu $\ge2$, và mọi nghiệm (nếu cận đạt) có $w=(1,1)$.

**Bước 3 (đạt cận).** Với $w=(1,1)$: mẫu $1$ cho $\max(0,-w_0)$, mẫu $2$ cho $\max(0,w_0)$, tổng $\lvert w_0\rvert$; mẫu $3$, $4$ cũng cho $\lvert w_0\rvert$. Mục tiêu là $2\lvert w_0\rvert+2$, nhỏ nhất duy nhất tại $w_0=0$ với giá trị $2$.

**Kiểm tra lại.** Phương án $w=(1,0)$, $w_0=0$ dùng một đặc trưng: mẫu $1$, $2$ cho bản lề $0$, mẫu $3$, $4$ cho $\max(0,1-0)=1$ mỗi mẫu, nên $H=2$ và mục tiêu của (9.2) là $3>2$.

**Diễn giải.** Nghiệm của (9.2) dùng hai đặc trưng, vi phạm yêu cầu $k=1$ của (9.1).
:::

::: remark Nhận xét 02.47 (Kiểm tra ràng buộc gốc sau khi thay thế)
Ví dụ 02.29 bác bỏ mệnh đề "số hạng phạt chuẩn một với $\lambda>0$ bảo đảm số đặc trưng không vượt $k$". Số thành phần khác $0$ của nghiệm phải được đếm lại.

Nếu vượt $k$, Boyd và Vandenberghe (2004, tr. 310) tăng $\lambda$ tới giá trị nhỏ nhất cho đúng $k$ hệ số khác $0$, rồi giải lại bài toán chỉ với các đặc trưng đó. Cách này không bảo đảm tối ưu cho (9.1).

Tương đương giữa (9.2) và quy hoạch tuyến tính của nó là chính xác (Định lý 02.15); quan hệ giữa (9.2) và (9.1) thì không. Nguyên lý dùng chuẩn một thay phép đếm có trong Boyd và Vandenberghe (2004), §6.3.2, tr. 306–310.
:::

::: exercise Bài tập 02.10 (Xếp lớp bốn bài toán)
Dùng bảng nhận dạng để xếp lớp, sau các phép xử lý cần thiết, cho mỗi bài toán sau; nêu phép xử lý và kết quả được dùng.

(a) $\min_w\lVert Xw-y\rVert_\infty$ với $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$.

(b) $\min_w\lVert Xw-y\rVert_2^2$ với $-\mathbf 1\le w\le\mathbf 1$.

(c) $\min_x x^Tx$ với $x^TQx\le4$, $Q=\operatorname{diag}(1,-4)$.

(d) $\max x_1x_2x_3$ với $x_1+x_2+x_3\le3$, $x>0$.
:::

::: hint
Với (c), thử hai điểm đối xứng trên biên. Với (d), dùng Mệnh đề 02.30(c): cực đại đơn thức $g$ có cùng tập nghiệm với cực tiểu đơn thức $1/g$.
:::

::: solution
**(a)** Quy hoạch tuyến tính sau khi thêm một biến phụ chung $t$: $\min t$ với $-t\mathbf 1\le Xw-y\le t\mathbf 1$ (Định lý 02.15(c)).

**(b)** Quy hoạch bậc hai với $P=2X^TX\succeq0$ và $2d$ ràng buộc tuyến tính; có nghiệm vì miền là hộp đóng, bị chặn (Định lý 01.35).

**(c)** Không lồi: $P_1=2Q$ không nửa xác định dương, và miền $\{x_1^2-4x_2^2\le4\}$ chứa $(4,\sqrt3)$, $(4,-\sqrt3)$ (vì $16-12=4$) nhưng không chứa trung điểm $(4,0)$ (vì $16>4$). Bài toán vẫn có nghiệm $x=0$, nhưng không thuộc lớp nào của bảng.

**(d)** Quy hoạch hình học: cực tiểu đơn thức $x_1^{-1}x_2^{-1}x_3^{-1}$ với $\tfrac13x_1+\tfrac13x_2+\tfrac13x_3\le1$. Dạng lồi theo Định lý 02.33 là $\min-(z_1+z_2+z_3)$ với $\log\sum_je^{z_j-\log3}\le0$. Nghiệm $x=(1,1,1)$, vì bất đẳng thức trung bình cộng – trung bình nhân cho $x_1x_2x_3\le(\tfrac13\sum x_j)^3\le1$.

**Kiểm tra lại.** Ở (c), $(4,\sqrt3)$ cho $16-4\cdot3=4$, đúng trên biên. Ở (d), điểm khả thi $(\tfrac12,1,\tfrac32)$ cho tích $\tfrac34<1$.
:::

## 10. Ý nghĩa, tác động và giới hạn

Ba bài toán học máy sau có dữ liệu cụ thể và được giải theo Thuật toán 02.44; bài toán thứ ba vi phạm một giả thiết.

### 10.1. Chọn thiết lập huấn luyện bằng LASSO

::: application Tình huống 02.1 (LASSO chọn thiết lập huấn luyện có ảnh hưởng)
**Bài toán và dữ liệu.** Một nhóm muốn biết thiết lập nào trong ba thiết lập ảnh hưởng tới độ chính xác kiểm định của một mô hình phân loại ảnh: tăng cường dữ liệu (cột $s^{(1)}$), lịch tốc độ học (cột $s^{(2)}$), dropout (cột $s^{(3)}$). Mỗi thiết lập có hai mức, mã hóa $-1$ và $+1$. Giả sử nhóm chạy bốn lần huấn luyện theo một thiết kế thí nghiệm có các cột trực giao, và ghi mức thay đổi độ chính xác $y$ (điểm phần trăm) so với một cấu hình tham chiếu:

| Lần chạy | $s^{(1)}$ | $s^{(2)}$ | $s^{(3)}$ | $y$ |
|---|---:|---:|---:|---:|
| 1 | $+1$ | $+1$ | $+1$ | $3$ |
| 2 | $+1$ | $-1$ | $-1$ | $1{,}5$ |
| 3 | $-1$ | $+1$ | $-1$ | $-1{,}5$ |
| 4 | $-1$ | $-1$ | $+1$ | $-2$ |

Mô hình $\hat y=w_0\mathbf 1+w_1s^{(1)}+w_2s^{(2)}+w_3s^{(3)}$ có bốn tham số cho bốn quan sát, nên bình phương nhỏ nhất khớp chính xác mà không chọn ra thiết lập nào.

**Mô hình hóa.** Gọi $X\in\mathbb R^{4\times3}$ là ma trận ba cột $s^{(1)},s^{(2)},s^{(3)}$ và $\mathbf 1\in\mathbb R^4$. LASSO với hệ số chặn không bị phạt:

$$
\begin{aligned}
&\underset{w_0\in\mathbb R,\ w\in\mathbb R^3}{\operatorname{minimize}}\\
&\ \ \lVert y-w_0\mathbf 1-Xw\rVert_2^2+\lambda\lVert w\rVert_1,\\
&\ \ \lambda>0 .
\end{aligned}
$$

**Xác minh giả thiết: tính lồi và lớp bài toán.** Mục tiêu lồi: bình phương chuẩn của một hàm affine cộng một chuẩn với hệ số dương (Định lý 01.30). Theo Định lý 02.15 (bước 4), thêm $v\in\mathbb R^3$ với $-v\le w\le v$ cho quy hoạch bậc hai với mục tiêu $\lVert y-w_0\mathbf 1-Xw\rVert_2^2+\lambda\mathbf 1^Tv$, như Mệnh đề 02.21(a).

**Xác minh giả thiết: tách biến nhờ trực giao.** Các cột $\mathbf 1,s^{(1)},s^{(2)},s^{(3)}$ đôi một trực giao, mỗi cột có bình phương chuẩn $4$. Kiểm tra trực tiếp, $y=\tfrac14\mathbf 1+2s^{(1)}+\tfrac12s^{(2)}+\tfrac14s^{(3)}$; chẳng hạn lần chạy $2$ cho $\tfrac14+2-\tfrac12-\tfrac14=1{,}5$. Do đó $y-w_0\mathbf 1-Xw=(\tfrac14-w_0)\mathbf 1+X(\hat w-w)$ với $\hat w=(2,\tfrac12,\tfrac14)$, và theo tính trực giao,

$$
\begin{aligned}
&\lVert y-w_0\mathbf 1-Xw\rVert_2^2+\lambda\lVert w\rVert_1\\
&\ =4\bigl(w_0-\tfrac14\bigr)^2\\
&\ \ +\sum_{j=1}^3\Bigl[4(w_j-\hat w_j)^2+\lambda\lvert w_j\rvert\Bigr].
\end{aligned}
$$

Mục tiêu là tổng của bốn hàm một biến, mỗi hàm có đúng một điểm cực tiểu (parabol cho $w_0$, Bổ đề 02.22 cho $w_j$), nên bài toán có đúng một nghiệm.

**Áp dụng.** Bổ đề 02.22 với $\eta=4$, $s_0=\hat w_j$ cho $w_j=\max(\hat w_j-\lambda/8,0)$, và $w_0=\tfrac14$.

| $\lambda$ | $w_1$ | $w_2$ | $w_3$ | Số thiết lập giữ lại |
|---:|---:|---:|---:|---:|
| $0$ (bình phương nhỏ nhất) | $2$ | $0{,}5$ | $0{,}25$ | $3$ |
| $1$ | $1{,}875$ | $0{,}375$ | $0{,}125$ | $3$ |
| $2$ | $1{,}75$ | $0{,}25$ | $0$ | $2$ |
| $4$ | $1{,}5$ | $0$ | $0$ | $1$ |

Với $\lambda=4$, giá trị mục tiêu là

$$
\begin{aligned}
&4(0{,}25+0{,}25+0{,}0625)+4\cdot1{,}5\\
&\quad=2{,}25+6=8{,}25,
\end{aligned}
$$

và dự đoán là $\hat y=0{,}25\mathbf 1+1{,}5s^{(1)}$, tức $1{,}75$ cho hai lần chạy có tăng cường dữ liệu và $-1{,}25$ cho hai lần chạy không có.

**Kiểm tra lại.** Với $\lambda=4$, đạo hàm của phần theo $w_1$ tại $1{,}5$ là $8(1{,}5-2)+4=0$; các phần theo $w_2$, $w_3$ có $\lvert\hat w_j\rvert\le\lambda/8=0{,}5$, nên bằng $0$. Nghiệm bình phương nhỏ nhất cho mục tiêu LASSO là $4\cdot2{,}75=11>8{,}25$.

**Diễn giải và giới hạn.** Với $\lambda=4$, chỉ tăng cường dữ liệu được giữ: bật nó ước tính tăng $2\cdot1{,}5=3$ điểm phần trăm. Kết quả này có ba giới hạn:

- hai thiết lập còn lại có hiệu ứng nhỏ hơn ngưỡng $\lambda/8$ và bị đặt bằng $0$, còn hiệu ứng được giữ bị số hạng phạt thu nhỏ từ $2$ xuống $1{,}5$;
- công thức đóng có được nhờ thiết kế trực giao, và bốn lần chạy không đủ để chọn $\lambda$ bằng *kiểm định chéo* (cross-validation);
- cột $s^{(3)}$ bằng tích từng thành phần của $s^{(1)}$ và $s^{(2)}$, nên hiệu ứng của dropout không tách được khỏi tương tác của hai thiết lập kia.

**Dẫn ngược lý thuyết.** Định nghĩa 02.20; Định lý 02.15 và Mệnh đề 02.21(a) cho dạng quy hoạch bậc hai (bước 4, 6); Bổ đề 02.22, với giả thiết tách được ứng với tính trực giao của các cột; Nhận xét 02.23.
:::

### 10.2. Máy vector hỗ trợ lề mềm trên một đặc trưng

::: application Tình huống 02.2 (Máy vector hỗ trợ lề mềm trên một đặc trưng)
**Bài toán và dữ liệu.** Mỗi khung hình có một điểm đặc trưng chuẩn hóa $u$. Giả sử bốn khung hình có nhãn: $u=-2$ và $u=-1$ không có vật thể ($y=-1$), $u=1$ và $u=2$ có vật thể ($y=+1$). Dữ liệu có cùng đặc trưng với Ví dụ 02.1(b) nhưng nhãn tách được bởi ngưỡng $0$. Cần một bộ phân loại $\operatorname{sign}(wu+w_0)$ và cần xác định ảnh hưởng của hệ số chính quy hóa $\lambda$ tới nghiệm.

**Mô hình hóa.** Máy vector hỗ trợ lề mềm (8.1) với $d=1$:

$$
\begin{aligned}
&H_\lambda(w,w_0)=\frac\lambda2w^2\\
&\ +\textstyle\sum_{i=1}^4\max\bigl(0,1-m_i\bigr),\\
&m_i=y_i(wu_i+w_0).
\end{aligned}
$$

**Xác minh giả thiết.** Theo Mệnh đề 02.39 với $\lambda>0$ và dữ liệu có cả hai nhãn: bài toán là quy hoạch bậc hai lồi, có nghiệm, và $w$ của nghiệm duy nhất (bước 6 của Thuật toán 02.44).

**Áp dụng: rút gọn theo đối xứng.** Phép đổi $(u,y)\mapsto(-u,-y)$ hoán vị bốn mẫu. Hạng bản lề của mẫu $(-u,-y)$ tại $(w,w_0)$ là $\max(0,1+y(-wu+w_0))=\max(0,1-y(wu-w_0))$, hạng của mẫu $(u,y)$ tại $(w,-w_0)$. Vậy $H_\lambda(w,w_0)=H_\lambda(w,-w_0)$. Vì $H_\lambda$ lồi (Định nghĩa 01.21),

$$
\begin{aligned}
H_\lambda(w,0)&\le\tfrac12H_\lambda(w,w_0)\\
&\quad+\tfrac12H_\lambda(w,-w_0)\\
&=H_\lambda(w,w_0),
\end{aligned}
$$

nên chỉ cần cực tiểu $H_\lambda(w,0)=\tfrac\lambda2w^2+2\max(0,1-w)+2\max(0,1-2w)$ theo $w$. Hàm này bằng

- $\tfrac\lambda2w^2-6w+4$ khi $w\le\tfrac12$;
- $\tfrac\lambda2w^2-2w+2$ khi $\tfrac12\le w\le1$;
- $\tfrac\lambda2w^2$ khi $w\ge1$.

**Áp dụng: hai giá trị $\lambda$.**

- Với $\lambda=1$: đạo hàm trên ba khúc là $w-6<0$, $w-2<0$ và $w>0$, nên $H_\lambda(\cdot,0)$ giảm tới $w=1$ rồi tăng. Nghiệm $w^*=1$, $H_\lambda=\tfrac12$.
- Với $\lambda=4$: đạo hàm $4w-6<0$ trên khúc đầu, $4w-2\ge0$ trên khúc giữa (bằng $0$ tại $w=\tfrac12$), $4w>0$ trên khúc cuối. Nghiệm $w^*=\tfrac12$, $H_\lambda=\tfrac12+2\cdot\tfrac12=\tfrac32$.

**Áp dụng: hệ số chặn duy nhất.**

- Với $\lambda=1$, $w=1$: tổng bản lề là $\max(0,-w_0)+\max(0,w_0)+\max(0,-1-w_0)+\max(0,w_0-1)\ge\lvert w_0\rvert$, bằng $0$ chỉ khi $w_0=0$.
- Với $\lambda=4$, $w=\tfrac12$: hai mẫu $u=\pm1$ cho $\max(0,\tfrac12-w_0)+\max(0,\tfrac12+w_0)\ge1$, hai mẫu $u=\pm2$ cho $\max(0,-w_0)+\max(0,w_0)=\lvert w_0\rvert$. Tổng $\ge1+\lvert w_0\rvert$, bằng $1$ chỉ khi $w_0=0$.

Trong cả hai trường hợp, $w_0^*=0$.

**Kiểm tra lại.**

- Với $\lambda=1$: $H_\lambda(0{,}9;0)=0{,}405+0{,}2+0=0{,}605$ và $H_\lambda(1{,}1;0)=0{,}605$, đều lớn hơn $0{,}5$.
- Với $\lambda=4$: $H_\lambda(0{,}4;0)=0{,}32+1{,}2+0{,}4=1{,}92$ và $H_\lambda(0{,}6;0)=0{,}72+0{,}8=1{,}52$, đều lớn hơn $1{,}5$.

**Diễn giải và giới hạn.** Cả hai nghiệm cho bộ phân loại $\operatorname{sign}(u)$, đúng cả bốn khung hình, và chỉ khác nhau ở lề.

- Với $\lambda=1$, các mặt $wu+w_0=\pm1$ nằm tại $u=\pm1$ và tổng bản lề bằng $0$.
- Với $\lambda=4$, chúng nằm tại $u=\pm2$, lề rộng gấp đôi, và hai khung hình $u=\pm1$ nằm trong lề với vi phạm $\tfrac12$ mỗi khung.

Hệ số $\lambda$ lớn hơn đổi tổng vi phạm lấy lề rộng hơn. Lời giải thủ công dựa vào tính đối xứng của dữ liệu; với dữ liệu tổng quát và $d$ lớn, cần một bộ giải quy hoạch bậc hai.

**Dẫn ngược lý thuyết.** Định nghĩa 02.38; Mệnh đề 02.39; tính lồi (Định nghĩa 01.21) cho phép rút gọn đối xứng; Mệnh đề 02.36(b).
:::

### 10.3. Nới lỏng cho nghiệm không nguyên

::: application Tình huống 02.3 (Chọn dữ liệu để gán nhãn: nới lỏng cho nghiệm không nguyên)
**Bài toán và dữ liệu.** Giả sử một nhóm có ngân sách $6$ triệu đồng để thuê gán nhãn ba tập dữ liệu chưa gán nhãn. Mỗi tập phải được gán nhãn trọn vẹn hoặc bỏ qua. Ước lượng số mẫu hữu ích (nghìn mẫu) và chi phí (triệu đồng) như sau:

| Tập | Số mẫu hữu ích | Chi phí | Tỷ số |
|---|---:|---:|---:|
| A | $8$ | $4$ | $2$ |
| B | $5$ | $3$ | $\tfrac53$ |
| C | $5$ | $3$ | $\tfrac53$ |

**Mô hình hóa.** Với $x_j\in\{0,1\}$ cho quyết định chọn tập $j$, bài toán là $\max\ 8x_{\mathrm A}+5x_{\mathrm B}+5x_{\mathrm C}$ với $4x_{\mathrm A}+3x_{\mathrm B}+3x_{\mathrm C}\le6$, một *bài toán ba lô* (knapsack problem) nhị phân. Tập khả thi không lồi, nên theo bước 7 của Thuật toán 02.44, ta dùng nới lỏng tuyến tính $0\le x_j\le1$.

**Xác minh giả thiết.** Nới lỏng có cùng mục tiêu và miền chứa miền nhị phân, nên Mệnh đề 02.42 áp dụng, với chiều cận đảo lại cho bài toán cực đại. Giả thiết của Mệnh đề 02.42(c), nghiệm nới lỏng là nhị phân, bị vi phạm như phần sau cho thấy.

**Áp dụng: giải nới lỏng.** Với mọi $x$ khả thi của nới lỏng,

$$
\begin{aligned}
&8x_{\mathrm A}+5x_{\mathrm B}+5x_{\mathrm C}\\
&\ =\tfrac53\bigl(4x_{\mathrm A}+3x_{\mathrm B}+3x_{\mathrm C}\bigr)+\tfrac43x_{\mathrm A}\\
&\ \le\tfrac53\cdot6+\tfrac43\cdot1=\tfrac{34}3,
\end{aligned}
$$

dùng ràng buộc ngân sách với hệ số $\tfrac53\ge0$ và $x_{\mathrm A}\le1$ với hệ số $\tfrac43\ge0$, như Mệnh đề 02.11 với chiều bất đẳng thức đảo. Điểm $\tilde x=(1,\tfrac23,0)$ khả thi (chi phí $4+2=6$) và đạt $8+\tfrac{10}3=\tfrac{34}3\approx11{,}33$, nên là nghiệm của nới lỏng. Nghiệm này không nhị phân.

**Áp dụng: khôi phục phương án.**

- Làm tròn xuống cho $(1,0,0)$: chi phí $4$, giá trị $8$.
- Làm tròn lên cho $(1,1,0)$: chi phí $7>6$, không khả thi.

Liệt kê tám phương án nhị phân:

- $\varnothing$ cho $0$;
- $\{\mathrm A\}$ cho $8$;
- $\{\mathrm B\}$, $\{\mathrm C\}$ cho $5$;
- $\{\mathrm B,\mathrm C\}$ cho $10$ với chi phí $6$;
- mọi tập chứa A và một tập khác có chi phí ít nhất $7$, không khả thi.

Giá trị tối ưu $p^*=10$, đạt tại $\{\mathrm B,\mathrm C\}$.

**Kiểm tra lại.** Theo Mệnh đề 02.42(d) cho bài toán cực đại, $8\le p^*\le\tfrac{34}3$; vì giá trị nhị phân là số nguyên, $p^*\le11$. Liệt kê cho $p^*=10$, nằm trong khoảng đó.

**Hậu quả của giả thiết bị vi phạm.** Nghiệm nới lỏng không nguyên nên không cho nghiệm bài toán gốc.

- Phương án làm tròn xuống, trùng với quy tắc tham lam theo tỷ số, cho $8$ nghìn mẫu, ít hơn tối ưu $20\%$.
- Phương án tối ưu $\{\mathrm B,\mathrm C\}$ không chứa tập A, tập có trọng số $1$ trong nghiệm nới lỏng, nên thông tin đọc từ nghiệm phân số dẫn sai hướng.

Cận $\tfrac{34}3$ vẫn đúng, nhưng chứng nhận $p^*=10$ cần liệt kê hoặc *quy hoạch động* (dynamic programming) cho bài toán ba lô. Khi chi phí là số nguyên, quy hoạch động cần $O(n\mathcal K)$ phép tính với $n$ tập và ngân sách $\mathcal K$ (Bertsimas (2009), Bài giảng 16).

**Diễn giải và giới hạn.** Gán nhãn hai tập B và C cho $10$ nghìn mẫu hữu ích và dùng hết ngân sách; chọn tập A để lại $2$ triệu đồng không dùng được. Số mẫu hữu ích là ước lượng, và phương án tối ưu đổi khi ước lượng đổi. Với hàng trăm tập, liệt kê không khả thi.

**Dẫn ngược lý thuyết.** Định nghĩa 02.41; Mệnh đề 02.42 cho cận trên, phần (c) không áp dụng vì nghiệm không nhị phân; Mệnh đề 02.11 chứng nhận nghiệm nới lỏng; Nhận xét 02.43.
:::

### 10.4. Ứng dụng trong học máy

Các công cụ của bài áp dụng cho các nhóm bài toán học máy sau:

- **Huấn luyện mô hình tuyến tính.** Hồi quy tuyến tính, hồi quy logistic và máy vector hỗ trợ là các bài toán dạng (4.1), với $f_0$ là tổng mất mát cộng số hạng chính quy hóa; khi không có ràng buộc, một điểm có gradient bằng $0$ là nghiệm toàn cục (Hệ quả 02.4(c)).
- **Chính quy hóa.** Ridge là quy hoạch bậc hai với $P\succ0$ (Mệnh đề 02.21); với cột trực giao, nghiệm LASSO là ngưỡng mềm (Bổ đề 02.22). Hồi quy với hệ số không âm và hồi quy với tổng hệ số bằng $1$ (trộn dự đoán của nhiều mô hình, Tình huống 01.2) là quy hoạch bậc hai.
- **Công bằng giữa các nhóm.** Khi lỗi của mỗi nhóm là hàm affine của biến quyết định, cực tiểu lỗi của nhóm chịu thiệt nhất là quy hoạch tuyến tính (Định lý 02.15(c)).
- **Chọn dữ liệu, chọn đặc trưng.** Nới lỏng tuyến tính cho cận và tiêu chí dừng: khi $f_0(\hat x)-p^*_{\tilde{\mathcal F}}$ nhỏ, phương án $\hat x$ đã gần tối ưu (Mệnh đề 02.42, Tình huống 02.3). Ràng buộc số đặc trưng, dùng khi mô hình chạy trên thiết bị hạn chế tài nguyên hoặc cần dễ diễn giải, có miền không lồi (Mệnh đề 02.46); trong mạng sâu, phiên bản tương ứng là *cắt tỉa* (pruning) trọng số.

### 10.5. Tóm tắt

Dạng phổ biến (4.1) cho phép chứng nhận tính lồi trên từng dòng, và biến đổi tương đương qua cặp ánh xạ tường minh chuyển nghiệm giữa hai cách viết. Quy hoạch tuyến tính, quy hoạch bậc hai, quy hoạch bậc hai có ràng buộc bậc hai và quy hoạch hình học được nhận dạng theo cấu trúc của các hàm; khi không có biến đổi tương đương, hàm thay thế, số hạng phạt và nới lỏng cho một bài toán lồi khác với bảo đảm một chiều.

Do đó, với Câu hỏi mở đầu, một ngưỡng làm $H$ nhỏ nhất không làm số ảnh bị xếp sai nhỏ nhất. Hàm $H$ đạt giá trị nhỏ nhất $4$ trên đoạn $[-1,1]$, và mọi ngưỡng trong đoạn này xếp sai hai ảnh, trong khi số lỗi nhỏ nhất bằng $1$, đạt trên $(-2,-1)\cup(1,2)$ (Ví dụ 02.24, Ví dụ 02.25). Lập luận mở đầu có ba lỗ hổng:

- bất đẳng thức $E\le H$ chỉ so sánh giá trị của hai hàm tại cùng một ngưỡng, nên không cho biết hai hàm có cùng điểm cực tiểu;
- tính lồi là của bài toán đã thay, còn $E$ là hàm bậc thang;
- từ $E\le H$ chỉ suy ra $\inf_\theta E\le\inf_\theta H$, một cận trên cho số lỗi nhỏ nhất, ở đây $1\le4$.

Phép thay $\ell_{01}$ bằng $\ell_{\mathrm{hinge}}$ là một phép đổi bài toán, nên số lỗi phải được đo lại tại nghiệm của bài toán thay thế (Mệnh đề 02.36, Nhận xét 02.43).

| Nội dung | Kết quả cần tra lại |
|---|---|
| Dạng phổ biến và biến đổi tương đương | Định nghĩa 02.1, 02.5; Mệnh đề 02.2, 02.6; Hệ quả 02.4; Nhận xét 02.7, 02.8 |
| Quy hoạch tuyến tính và biến phụ | Định nghĩa 02.9, 02.13; Mệnh đề 02.10, 02.11; Bổ đề 02.14; Định lý 02.15 |
| Quy hoạch bậc hai, chính quy hóa, ràng buộc bậc hai | Định nghĩa 02.17, 02.20, 02.24; Mệnh đề 02.18, 02.21, 02.25, 02.26; Bổ đề 02.22 |
| Quy hoạch hình học | Định nghĩa 02.28, 02.29; Mệnh đề 02.30; Bổ đề 02.31; Định lý 02.32, 02.33 |
| Hàm thay thế, máy vector hỗ trợ, nới lỏng | Định nghĩa 02.35, 02.38, 02.41; Mệnh đề 02.36, 02.39, 02.42; Nhận xét 02.43 |
| Nhận dạng | Thuật toán 02.44; Định nghĩa 02.45; Mệnh đề 02.46 |

Các công thức cần nhớ gồm:

- quy hoạch tuyến tính (5.2) và quy hoạch bậc hai (6.1), với $P\succeq0$;
- biến phụ: $t\ge\lvert r\rvert$ khi và chỉ khi $t\ge r$ và $t\ge-r$ (Bổ đề 02.14);
- ngưỡng mềm (6.3);
- Hessian của hàm log-sum-exp (7.3);
- hai bảo đảm một chiều: $E\le H$ của hàm thay thế, và $p^*_{\tilde{\mathcal F}}\le p^*_{\mathcal F}\le f_0(\hat x)$ với $\hat x\in\mathcal F$ của nới lỏng.

Các giả thiết cần nhớ là (L1)–(L5) ở §9.1, cùng Nhận xét 02.3, 02.8, 02.16, 02.34 và 02.43.

## 11. Bài tập

Các bài tập trong thân bài và mục tiêu học tập mà mỗi bài kiểm tra:

1. **Bài tập 02.1** (Biến đổi tương đương bằng đổi biến logarit): mục tiêu 4, 5; dựng $\varphi$, $\psi$, $T$.
2. **Bài tập 02.2** (Hình tròn và điều kiện bậc nhất): mục tiêu 1; chứng nhận, tồn tại, duy nhất.
3. **Bài tập 02.3** (Thuê máy tiền xử lý dữ liệu): mục tiêu 2; dạng chuẩn và chứng nhận bằng tổ hợp không âm.
4. **Bài tập 02.4** (Trung vị và trung điểm): mục tiêu 2; biến phụ cho hai tiêu chí.
5. **Bài tập 02.5** (Ba quan sát: bình phương nhỏ nhất, ridge và LASSO): mục tiêu 3; ngưỡng mềm.
6. **Bài tập 02.6** (Hàm tuyến tính trên hình tròn): mục tiêu 3; điều kiện (4.2) trên ràng buộc bậc hai.
7. **Bài tập 02.7** (Nhận dạng ràng buộc của quy hoạch hình học): mục tiêu 4; chuẩn hóa hoặc phản ví dụ.
8. **Bài tập 02.8** (Mất mát logistic cơ số hai): mục tiêu 5; hàm thay thế và số lỗi.
9. **Bài tập 02.9** (Phủ bốn bối cảnh): mục tiêu 5; nới lỏng có nghiệm nhị phân.
10. **Bài tập 02.10** (Xếp lớp bốn bài toán): mục tiêu 1, 6; bảng nhận dạng.

Các bài tập tiếp theo củng cố toàn bài, chia theo ba mức.

### 11.1. Mức nhận biết

::: exercise Bài tập 02.11 (Đúng hay sai)
Xác định mỗi khẳng định đúng hay sai, và nêu căn cứ hoặc phản ví dụ.

(a) Nếu $f_0$ và mọi $f_i$ lồi thì bài toán $\min f_0(x)$ với $f_i(x)\ge0$ là bài toán lồi.

(b) Mọi quy hoạch tuyến tính có tập khả thi không rỗng đều có nghiệm.

(c) Nếu nghiệm của nới lỏng tuyến tính của một bài toán nhị phân là vector nhị phân thì nó là nghiệm của bài toán nhị phân.

(d) Hàm $x_1x_2$ lồi trên $\mathbb R^2_{++}$.

(e) Nếu tổng mất mát bản lề trên tập huấn luyện bằng $0$ thì bộ phân loại không sai mẫu huấn luyện nào.
:::

::: hint
Với (a), xét $x^2\ge1$. Với (d), tính Hessian.
:::

::: solution
- **(a) Sai.** Với $f_1(x)=x^2-1$ lồi, ràng buộc $f_1(x)\ge0$ cho $(-\infty,-1]\cup[1,\infty)$, không lồi.
- **(b) Sai.** $\min x$ với $x\le0$ có tập khả thi không rỗng và giá trị $-\infty$.
- **(c) Đúng**, theo Mệnh đề 02.42(c).
- **(d) Sai.** Hessian $\begin{bmatrix}0&1\\1&0\end{bmatrix}$ có giá trị riêng $-1$. Trực tiếp, với $x=(1,3)$, $x'=(3,1)$, $\vartheta=\tfrac12$, giá trị tại trung điểm $(2,2)$ là $4>\tfrac12(3+3)=3$. Sau đổi biến logarit, $x_1x_2=e^{z_1+z_2}$ lồi theo $z$.
- **(e) Đúng**, theo Mệnh đề 02.36(b): $0\le E\le H=0$.

**Kiểm tra lại.** Ở (a), hai điểm $\pm2$ thỏa $x^2-1\ge0$ còn trung điểm $0$ cho $-1<0$. Ở (b), $x=-5$ và $x=-50$ khả thi với giá trị $-5$ và $-50$.
:::

::: exercise Bài tập 02.12 (Kiểm tra một biến đổi tương đương sai)
Một người lập mô hình đưa ra hai biến đổi được cho là tương đương.

(i) Hồi quy không hệ số chặn $\hat y=w_1u$ với dữ liệu $u=(0,1)$, $y=(0,2)$ và mục tiêu $\sum_i\lvert w_1u_i-y_i\rvert$ được viết thành $\min_{w_1,t}t_1+t_2$ với $t_i\ge w_1u_i-y_i$.

(ii) Bài toán $\min_{-1\le x\le1}x^2-\lvert x\rvert$ được viết thành $\min_{x,t}x^2-t$ với $t\ge x$, $t\ge-x$, $-1\le x\le1$.

(a) Giải hai bài toán gốc. (b) Chỉ ra hai bài toán sau biến đổi không bị chặn. (c) Với mỗi trường hợp, chỉ ra điều kiện nào của bước 8 trong Thuật toán 02.44 (mục biến phụ) bị vi phạm và sửa lại.
:::

::: hint
Ở (i), cho $w_1\to-\infty$. Ở (ii), $t$ không bị chặn trên.
:::

::: solution
**(a) Giải hai bài toán gốc.**

- (i) Mục tiêu $\lvert0\rvert+\lvert w_1-2\rvert$, nhỏ nhất tại $w_1=2$ với giá trị $0$.
- (ii) Với $s=\lvert x\rvert\in[0,1]$, mục tiêu là $s^2-s$, nhỏ nhất tại $s=\tfrac12$; giá trị $-\tfrac14$, đạt tại $x=\pm\tfrac12$.

**(b) Hai bài toán mới không bị chặn.**

- (i) Với $w_1=-\Lambda$, chọn $t_1=0$, $t_2=-\Lambda-2$: khả thi và $t_1+t_2=-\Lambda-2\to-\infty$ khi $\Lambda\to+\infty$.
- (ii) Với $x=0$ và $t=\Lambda$, mọi ràng buộc thỏa và mục tiêu $-\Lambda\to-\infty$ khi $\Lambda\to+\infty$.

**(c) Sửa (i).** Biến đổi (i) vi phạm điều kiện "đủ mọi nhánh của cực đại": cần thêm $t_i\ge y_i-w_1u_i$. Khi đó bài toán là $\min t_1+t_2$ với $\lvert0\rvert\le t_1$, $\lvert w_1-2\rvert\le t_2$, giá trị $0$ tại $w_1=2$.

**(c) Sửa (ii).** Biến đổi (ii) vi phạm điều kiện "mọi hệ số trước cực đại không âm": $-\lvert x\rvert=-\max(x,-x)$ có hệ số $-1$, và mục tiêu gốc không lồi. Sửa bằng cách tách hai trường hợp $0\le x\le1$ và $-1\le x\le0$. Mỗi trường hợp là quy hoạch bậc hai lồi ($\min x^2-x$, $\min x^2+x$) với nghiệm $\tfrac12$, $-\tfrac12$, giá trị $-\tfrac14$.

**Kiểm tra lại.** Ở (i) sau khi sửa, $w_1=2$, $t=(0,0)$ khả thi với giá trị $0$, còn $w_1=0$ cho $t_2\ge2$. Ở (ii), $x=\pm\tfrac12$ cho $\tfrac14-\tfrac12=-\tfrac14$, còn $x=1$ cho $0>-\tfrac14$.
:::

### 11.2. Mức tính toán hoặc chứng minh

::: exercise Bài tập 02.13 (Máy vector hỗ trợ với bản lề bình phương)
Cho $\ell(m)=\max(0,1-m)^2$.

(a) Chứng minh $\ell$ lồi và là hàm thay thế của $\ell_{01}$.

(b) Chứng minh bài toán $\min_{w,w_0}\tfrac\lambda2\lVert w\rVert_2^2+\sum_i\ell(y_i(w^Tu_i+w_0))$ tương đương với quy hoạch bậc hai $\min\tfrac\lambda2w^Tw+\sum_i\xi_i^2$ với $\xi_i\ge1-y_i(w^Tu_i+w_0)$, $\xi_i\ge0$, và chỉ ra ma trận $P$.
:::

::: hint
Nếu $g\ge0$ lồi thì $g^2$ lồi: bình phương hai vế không âm của bất đẳng thức $g(\vartheta x+(1-\vartheta)x')\le\vartheta g(x)+(1-\vartheta)g(x')$ (Định nghĩa 01.21), rồi dùng tính lồi của $s\mapsto s^2$.
:::

::: solution
**(a) Tính lồi.** Đặt $g(m)=\max(0,1-m)$, lồi và không âm. Với $\vartheta\in[0,1]$ và $\bar m=\vartheta m+(1-\vartheta)m'$: $0\le g(\bar m)\le\vartheta g(m)+(1-\vartheta)g(m')$. Vì $s\mapsto s^2$ tăng trên $[0,\infty)$,

$$
\begin{aligned}
&g(\bar m)^2\\
&\ \le\bigl(\vartheta g(m)+(1-\vartheta)g(m')\bigr)^2\\
&\ \le\vartheta g(m)^2+(1-\vartheta)g(m')^2,
\end{aligned}
$$

bước cuối dùng tính lồi của $s^2$ (Ví dụ 01.12(a)).

**(a) Nằm trên $\ell_{01}$.**

- Nếu $m\le0$ thì $g(m)\ge1$ và $\ell(m)\ge1$.
- Nếu $m>0$ thì $\ell(m)\ge0$.

**(b) Hai chiều của (4.3).** Dùng Mệnh đề 02.6 với $T(s)=s$. Đặt $m_i=y_i(w^Tu_i+w_0)$.

- Ánh xạ $\varphi(w,w_0)=(w,w_0,\xi)$ với $\xi_i=\max(0,1-m_i)$ cho điểm khả thi với cùng giá trị.
- Ngược lại, nếu $(w,w_0,\xi)$ khả thi thì $\xi_i\ge\max(0,1-m_i)\ge0$, và vì bình phương tăng trên $[0,\infty)$, $\xi_i^2\ge\ell(m_i)$. Vậy giá trị của bài toán gốc tại $\psi(w,w_0,\xi)=(w,w_0)$ không lớn hơn.

**(b) Lớp bài toán.** Theo thứ tự $(w,w_0,\xi)$, $P=\operatorname{diag}(\lambda I_d,0,2I_N)\succeq0$ và các ràng buộc affine: quy hoạch bậc hai. Khác với bản lề thường, $\ell$ khả vi tại $m=1$.

**Kiểm tra lại.** $\ell(-1)=4\ge1=\ell_{01}(-1)$, $\ell(\tfrac12)=\tfrac14\ge0$ và $\ell(2)=0=\ell_{01}(2)$.
:::

::: exercise Bài tập 02.14 (Đường đi nghiệm của LASSO, solution path)
**Dữ kiện.** Theo Tình huống 02.1, mục tiêu LASSO với hệ số chặn không bị phạt bằng $4(w_0-\tfrac14)^2+\sum_j\bigl[4(w_j-\hat w_j)^2+\lambda\lvert w_j\rvert\bigr]$ với $\hat w=(2,\tfrac12,\tfrac14)$.

Với dữ liệu của Tình huống 02.1:

(a) xác định các khoảng của $\lambda>0$ ứng với mô hình giữ lại $3$, $2$, $1$ và $0$ thiết lập;

(b) giải hồi quy ridge (số hạng phạt $\lambda\lVert w\rVert_2^2$, hệ số chặn không phạt) với $\lambda=4$ và so sánh số hệ số khác $0$ với LASSO cùng $\lambda$.
:::

::: hint
Theo Tình huống 02.1, $w_j=\max(\hat w_j-\lambda/8,0)$. Với ridge, mỗi tọa độ cực tiểu $4(w_j-\hat w_j)^2+\lambda w_j^2$.
:::

::: solution
**(a) Ngưỡng.** $w_j=0$ khi và chỉ khi $\lambda\ge8\hat w_j$, tức $\lambda\ge16$, $\lambda\ge4$, $\lambda\ge2$ lần lượt cho $j=1,2,3$. Vậy:

- giữ $3$ thiết lập khi $0<\lambda<2$;
- giữ $2$ khi $2\le\lambda<4$;
- giữ $1$ khi $4\le\lambda<16$;
- giữ $0$ khi $\lambda\ge16$.

**(b) Ridge.** Đạo hàm $8(w_j-\hat w_j)+2\lambda w_j=0$ cho $w_j=\tfrac{4\hat w_j}{4+\lambda}=\tfrac{\hat w_j}2$ khi $\lambda=4$: $w=(1;\ 0{,}25;\ 0{,}125)$, $w_0=\tfrac14$.

**(b) So sánh.** Ridge thu nhỏ mọi hệ số theo cùng tỷ lệ và giữ cả ba thiết lập; LASSO cùng $\lambda=4$ giữ một thiết lập. Hai mô hình có cùng $\lambda$ nhưng số hạng phạt khác nhau nên $\lambda$ không có cùng ý nghĩa.

**Kiểm tra lại.** Với $\lambda=3$, LASSO cho $w=(1{,}625;\ 0{,}125;\ 0)$, giữ $2$ thiết lập, đúng khoảng $2\le\lambda<4$. Với ridge và $\lambda=4$, đạo hàm theo $w_1$ tại $1$ là $8(1-2)+8=0$.
:::

### 11.3. Mức vận dụng

::: exercise Bài tập 02.15 (Hồi quy với một ngoại lai)
Giả sử bốn quan sát $u=(0,1,2,3)$, $y=(0,1,2,9)$; quan sát cuối bị ghi sai. Mô hình $\hat y=w_1u+w_0$.

(a) Giải bình phương nhỏ nhất.

(b) Chứng minh $w=(1,0)$ là nghiệm của hồi quy sai số tuyệt đối với giá trị $6$, bằng chứng nhận $\sum_i\lvert r_i\rvert\ge\sum_i\nu_ir_i$ với $\nu=(-1,1,1,-1)$, $\lvert\nu_i\rvert\le1$.

(c) So sánh dự đoán tại $u=2$ của nghiệm bình phương nhỏ nhất với nghiệm $w=(1,0)$ ở (b).
:::

::: hint
Kiểm tra $\sum_i\nu_i=0$ và $\sum_i\nu_iu_i=0$; khi đó $\sum_i\nu_ir_i$ không phụ thuộc $(w_1,w_0)$.
:::

::: solution
**(a) Các tổng.** $\sum u_i=6$, $\sum u_i^2=14$, $\sum y_i=12$, $\sum u_iy_i=0+1+4+27=32$.

**(a) Giải.** Phương trình chuẩn $14w_1+6w_0=32$, $6w_1+4w_0=12$ cho $w_0=3-\tfrac32w_1$, $14w_1+18-9w_1=32$, $w_1=\tfrac{14}5=2{,}8$, $w_0=-1{,}2$. Phần dư $(-1{,}2;\ 0{,}6;\ 2{,}4;\ -1{,}8)$, và

$$
\begin{aligned}
J&=1{,}44+0{,}36+5{,}76+3{,}24\\
&=10{,}8 .
\end{aligned}
$$

**(b) Cận dưới.** Với $\lvert\nu_i\rvert\le1$, $\lvert r_i\rvert\ge\nu_ir_i$. Với $\nu=(-1,1,1,-1)$: $\sum\nu_i=0$, $\sum\nu_iu_i=0+1+2-3=0$, nên

$$
\begin{aligned}
\textstyle\sum_i\nu_ir_i&=w_1\textstyle\sum\nu_iu_i+w_0\sum\nu_i\\
&\quad-\textstyle\sum\nu_iy_i\\
&=-(0+1+2-9)=6 .
\end{aligned}
$$

Vậy $\sum\lvert r_i\rvert\ge6$ với mọi $(w_1,w_0)$.

**(b) Cận đạt.** $w=(1,0)$ cho $r=(0,0,0,-6)$, tổng $6$. Đây là một chứng nhận kiểu Mệnh đề 02.11 cho quy hoạch tuyến tính của Định lý 02.15.

**(c) So sánh.** Bình phương nhỏ nhất dự đoán $2{,}8\cdot2-1{,}2=4{,}4$, còn nghiệm $(1,0)$ của hồi quy sai số tuyệt đối dự đoán $2$, đúng với quan sát. Nghiệm sai số tuyệt đối không duy nhất ở đây: $(\tfrac{17}6,-\tfrac53)$ cũng cho tổng $6$ và dự đoán $4$ tại $u=2$.

**Kiểm tra lại.** Ở (a), tổng phần dư $-1{,}2+0{,}6+2{,}4-1{,}8=0$. Ở (c), nghiệm $(\tfrac{17}6,-\tfrac53)$ có phần dư $(-\tfrac53,\tfrac16,2,-\tfrac{13}6)$, tổng trị tuyệt đối $\tfrac{10+1+12+13}6=6$.
:::

::: exercise Bài tập 02.16 (Tổng hai đơn thức với tích bị chặn)
Với $\mathcal A,\mathcal B,\mathcal K>0$, xét $\min\mathcal A/x_1+\mathcal B/x_2$ với $x_1x_2\le\mathcal K$, $x_1,x_2>0$.

(a) Viết dạng lồi theo Định lý 02.33.

(b) Chứng minh nghiệm là $x_1^*=\sqrt{\mathcal A\mathcal K/\mathcal B}$, $x_2^*=\sqrt{\mathcal B\mathcal K/\mathcal A}$, giá trị $2\sqrt{\mathcal A\mathcal B/\mathcal K}$.

(c) Với $\mathcal A=4$, $\mathcal B=1$, $\mathcal K=16$, tính nghiệm và so với $x_1=x_2=4$.
:::

::: hint
Ràng buộc chặt tại nghiệm; thay $x_2=\mathcal K/x_1$ và đặt $z=\log x_1$.
:::

::: solution
**(a)** Với $z_1=\log x_1$, $z_2=\log x_2$: $\min\log(\mathcal Ae^{-z_1}+\mathcal Be^{-z_2})$ với $z_1+z_2\le\log\mathcal K$. Mục tiêu lồi (Định lý 02.32), ràng buộc tuyến tính.

**(b) Ràng buộc chặt.** Với mọi điểm khả thi có $x_1x_2<\mathcal K$, điểm $(\mathcal K/x_2,x_2)$ khả thi và có mục tiêu nhỏ hơn, nên chỉ cần cực tiểu trên $x_1x_2=\mathcal K$, tức $x_2=\mathcal K/x_1$.

**(b) Tính.** Mục tiêu theo $z=\log x_1$ là $\Theta(z)=\mathcal Ae^{-z}+(\mathcal B/\mathcal K)e^z$, với $\Theta''>0$, nên điểm dừng là nghiệm (Hệ quả 01.26). Ta có

$$
\Theta'(z)=-\mathcal Ae^{-z}+(\mathcal B/\mathcal K)e^z=0
$$

cho $e^{2z}=\mathcal A\mathcal K/\mathcal B$. Vậy $x_1^*=\sqrt{\mathcal A\mathcal K/\mathcal B}$, $x_2^*=\mathcal K/x_1^*=\sqrt{\mathcal B\mathcal K/\mathcal A}$, và hai hạng của mục tiêu bằng nhau, mỗi hạng $\sqrt{\mathcal A\mathcal B/\mathcal K}$.

**(c)** $x_1^*=8$, $x_2^*=2$, giá trị $\tfrac48+\tfrac12=1$; điểm $(4,4)$ cho $1+\tfrac14=1{,}25$.

**Kiểm tra lại.** Công thức (b) cho giá trị $2\sqrt{4\cdot1/16}=1$, khớp (c); điểm khả thi $(16,1)$ cho $\tfrac4{16}+1=1{,}25>1$.
:::

::: exercise Bài tập 02.17 (Cực tiểu hóa mất mát của nhóm chịu thiệt nhất)
Giả sử hai mô hình phân loại có tỷ lệ lỗi trên nhóm người dùng A và B như sau: mô hình 1 có $0{,}2$ trên A và $0{,}6$ trên B; mô hình 2 có $0{,}5$ trên A và $0{,}1$ trên B. Hệ thống chọn mô hình 1 với xác suất $\omega\in[0,1]$ cho mỗi yêu cầu, nên tỷ lệ lỗi kỳ vọng trên A là $0{,}5-0{,}3\omega$ và trên B là $0{,}1+0{,}5\omega$.

(a) Viết bài toán cực tiểu theo $\omega$ của tỷ lệ lỗi lớn hơn trong hai nhóm thành quy hoạch tuyến tính.

(b) Chứng minh nghiệm là $\omega^*=\tfrac12$ với giá trị $0{,}35$, bằng một tổ hợp không âm của hai ràng buộc.

(c) So với nghiệm cực tiểu lỗi trung bình hai nhóm.
:::

::: hint
Tìm $\mu_A,\mu_B\ge0$, $\mu_A+\mu_B=1$, sao cho hệ số của $\omega$ trong $\mu_A(0{,}5-0{,}3\omega)+\mu_B(0{,}1+0{,}5\omega)$ bằng $0$.
:::

::: solution
**(a)** Theo Định lý 02.15(c): $\min_{\omega,t}t$ với $t\ge0{,}5-0{,}3\omega$, $t\ge0{,}1+0{,}5\omega$, $0\le\omega\le1$.

**(b) Tìm hệ số.** $-0{,}3\mu_A+0{,}5\mu_B=0$ và $\mu_A+\mu_B=1$ cho $\mu_A=\tfrac58$, $\mu_B=\tfrac38$.

**(b) Cận dưới.** Với mọi điểm khả thi,

$$
\begin{aligned}
t&=\tfrac58t+\tfrac38t\\
&\ge\tfrac58(0{,}5-0{,}3\omega)\\
&\quad+\tfrac38(0{,}1+0{,}5\omega)\\
&=0{,}3125+0{,}0375=0{,}35 .
\end{aligned}
$$

**(b) Cận đạt.** Tại $\omega=\tfrac12$, hai nhóm có lỗi $0{,}35$ và $0{,}35$, nên $t=0{,}35$ đạt cận.

**(c)** Lỗi trung bình $\tfrac12(0{,}6+0{,}2\omega)$ nhỏ nhất tại $\omega=0$, bằng $0{,}3$, nhưng nhóm A chịu lỗi $0{,}5$. Tiêu chí minimax đổi $0{,}05$ lỗi trung bình lấy việc giảm lỗi nhóm chịu thiệt nhất xuống $0{,}35$.

**Kiểm tra lại.** Với $\omega=0{,}4$, hai nhóm có lỗi $0{,}38$ và $0{,}3$; với $\omega=0{,}6$, có lỗi $0{,}32$ và $0{,}4$. Cả hai giá trị lớn nhất đều vượt $0{,}35$.
:::

Mục tiêu học tập mà các bài tập củng cố kiểm tra:

11. **Bài tập 02.11** (Đúng hay sai): mục tiêu 1, 5; tính lồi, tồn tại nghiệm, nới lỏng và hàm thay thế.
12. **Bài tập 02.12** (Kiểm tra một biến đổi tương đương sai): mục tiêu 2, 5, 6; điều kiện của biến phụ ở bước 8 của Thuật toán 02.44.
13. **Bài tập 02.13** (Máy vector hỗ trợ với bản lề bình phương): mục tiêu 3, 5; hàm thay thế và quy hoạch bậc hai tương đương.
14. **Bài tập 02.14** (Đường đi nghiệm của LASSO, solution path): mục tiêu 3; ngưỡng mềm theo $\lambda$ và so sánh với ridge.
15. **Bài tập 02.15** (Hồi quy với một ngoại lai): mục tiêu 2; chứng nhận nghiệm hồi quy sai số tuyệt đối bằng tổ hợp $\nu$ với $\lvert\nu_i\rvert\le1$.
16. **Bài tập 02.16** (Tổng hai đơn thức với tích bị chặn): mục tiêu 4; dạng lồi và nghiệm của quy hoạch hình học.
17. **Bài tập 02.17** (Cực tiểu hóa mất mát của nhóm chịu thiệt nhất): mục tiêu 2, 6; biến phụ cho cực đại và chứng nhận bằng tổ hợp không âm.

Bài tập 02.18–02.32, lấy từ Boyd và Vandenberghe (2004) và Murphy (2022), có gợi ý và lời giải, nằm trong [tệp bài tập của Bài 02](material-viewer.html?doc=materials/lec-02/exercises.md&deck=lecture-02-cac-bai-toan-toi-uu-loi.html).

## 12. Câu hỏi cuối buổi và cầu nối

**Câu hỏi.** Xét bài toán $\min_{x\in\mathbb R^2}\ x_1^2+x_2^2$ với ràng buộc $x_1+x_2\ge2$.

- (a) Xếp bài toán vào một lớp của bảng nhận dạng và kết luận về sự tồn tại, tính duy nhất của nghiệm.
- (b) Chứng minh $x^*=(1,1)$ là nghiệm và tính $p^*$.
- (c) Xác định Mệnh đề 02.11 có chứng nhận được nghiệm này không, và nêu một cận dưới của mục tiêu dùng chính ràng buộc.

::: solution Lời giải câu hỏi cuối buổi
**(a) Lớp bài toán.** Bài toán là quy hoạch bậc hai với $P=2I_2\succ0$, $q=0$, $\rho_0=0$, $G=\begin{bmatrix}-1&-1\end{bmatrix}$, $h=-2$. Tập khả thi không rỗng, nên bài toán có đúng một nghiệm (Mệnh đề 02.18(b)).

**(b) Nghiệm.** $\nabla f_0(1,1)=(2,2)$, và với mọi $x$ khả thi,
$$
\begin{aligned}
&\nabla f_0(1,1)^T\bigl(x-(1,1)\bigr)\\
&\quad=2(x_1+x_2-2)\ge0,
\end{aligned}
$$
nên $x^*=(1,1)$ là nghiệm theo Hệ quả 02.4(c), với $p^*=2$.

**(c) Cận dưới.** Mệnh đề 02.11 cần mục tiêu tuyến tính, nên không áp dụng. Từ $(x_1-1)^2+(x_2-1)^2\ge0$, với mọi $x$ khả thi,
$$
\begin{aligned}
x_1^2+x_2^2&\ge2(x_1+x_2)-2\\
&\ge2\cdot2-2=2 .
\end{aligned}
$$
Cận dưới này bằng $p^*$; nó có được bằng cách cộng $2$ lần ràng buộc vào một cận dưới affine của mục tiêu.

**Kiểm tra lại.** Điểm khả thi $(2,0)$ cho $4>2$, điểm $(\tfrac32,\tfrac12)$ cho $\tfrac52>2$.
:::

Các nghiệm của Bài 02 được chứng nhận bằng lập luận riêng cho từng bài: tổ hợp không âm các ràng buộc, điều kiện (4.2), bất đẳng thức trung bình cộng – trung bình nhân. Câu (c) cho thấy phép cộng một bội không âm của ràng buộc vẫn dùng được khi mục tiêu không tuyến tính. Hai câu hỏi còn mở là tìm hệ số đó một cách có hệ thống và biết khi nào nó tồn tại. Bài 03 trả lời bằng hàm Lagrange, bài toán đối ngẫu, điều kiện Slater và điều kiện Karush–Kuhn–Tucker.

## 13. Tài liệu đọc

- **Trước buổi học:** Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press: §4.1.1 (tr. 127–128: bài toán tối ưu, Ví dụ 4.1 về $\min_{x>0}1/x$), §4.1.3 (tr. 134: dạng trên đồ thị), §4.2.1 (tr. 136–137: bài toán tối ưu lồi ở dạng chuẩn), §4.3 (tr. 146–152: quy hoạch tuyến tính, dạng tổng quát tr. 146, bài toán khẩu phần tr. 148, đưa về dạng chuẩn tr. 147, hàm tuyến tính từng khúc tr. 150).
- **Sau buổi học:**
  - Boyd và Vandenberghe (2004): §3.1.5 (tr. 74: Hessian của log-sum-exp), §4.2.3 (tr. 139–140: điều kiện tối ưu), §4.4 (tr. 152–160: quy hoạch bậc hai, quy hoạch bậc hai có ràng buộc bậc hai), §4.5.1–4.5.3 (tr. 160–162: đơn thức, tổng đơn thức dương, quy hoạch hình học và dạng lồi), §4.7.4 (tr. 178–179: vô hướng hóa), §5.2.3 (tr. 226: điều kiện Slater), §6.1 (tr. 291–295: xấp xỉ chuẩn một và chuẩn vô cùng), §6.3.1–6.3.2 (tr. 305–310: chính quy hóa, chuẩn một thay phép đếm), §8.6.1 (tr. 423–427: phân loại tuyến tính, máy vector hỗ trợ, bài toán cực tiểu số lỗi); Bài tập 4.15 (tr. 194: nới lỏng quy hoạch tuyến tính nhị phân) và Bài tập 4.20 (tr. 196: bối cảnh phân bổ công suất).
  - Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả: §2.5.2 và §2.5.4 (softmax, log-sum-exp), §4.3.2 (hàm thay thế, mất mát bản lề), §10.2.8 (chuẩn hóa đặc trưng), §11.3 (hồi quy ridge, hệ số chặn không phạt), §11.4.2 (vì sao chuẩn một cho nghiệm thưa), §11.6.1 (hồi quy sai số tuyệt đối), §17.3.3 (máy vector hỗ trợ lề mềm, dạng $\tfrac12\lVert w\rVert_2^2+C\sum_n\xi_n$, tương đương (8.1) với $\lambda=1/C$).
- **Mở rộng:**
  - Boyd, Stephen, slide bài giảng cho MIT OpenCourseWare 6.079 *Introduction to Convex Optimization* (Fall 2009): lec04 *Convex optimization problems* (tr. 4–2 đến 4–30), lec02 (tr. 2–9), lec03 (tr. 3–10 đến 3–15); tài liệu theo giấy phép CC BY-NC-SA 4.0, các hình của bài được vẽ lại.
  - Bertsimas, Dimitris (2009), slide bài giảng MIT OpenCourseWare 15.093J *Optimization Methods*: Bài giảng 2 *The Geometry of LO* (slide 23: tính tối ưu của đỉnh), Bài giảng 16 *Dynamic Programming* (mục 2: bài toán ba lô).
