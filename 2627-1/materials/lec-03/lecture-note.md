# Bài 03 — Đối ngẫu Lagrange

Bài 02 chứng nhận nghiệm của từng lớp bài toán bằng một lập luận riêng: tổ hợp không âm các ràng buộc cho quy hoạch tuyến tính (Mệnh đề 02.11), điều kiện bậc nhất cho bài toán lồi khả vi (Hệ quả 02.4), bất đẳng thức trung bình cộng – trung bình nhân cho quy hoạch hình học. Câu hỏi cuối buổi của Bài 02 cho thấy phép cộng một bội không âm của ràng buộc vẫn sinh cận dưới khi mục tiêu không tuyến tính, và để lại hai câu hỏi: tìm hệ số đó một cách có hệ thống, và biết khi nào có hệ số cho cận bằng giá trị tối ưu. Câu hỏi trung tâm của Bài 03 là: **với một bài toán tối ưu có ràng buộc, làm thế nào sinh cận dưới cho giá trị tối ưu từ chính các hàm của bài toán, khi nào cận tốt nhất bằng giá trị tối ưu, và hệ điều kiện nào cho nghiệm cùng nhân tử mà không cần tính cận đó.** Để trả lời, chúng ta xây dựng bốn nhóm đối tượng, bao gồm:

- hàm Lagrange, hàm đối ngẫu và bài toán đối ngẫu, cùng đối ngẫu yếu;
- đối ngẫu mạnh và điều kiện Slater;
- tập giá trị, đường cận và hàm giá trị, cho nghĩa hình học và nghĩa độ nhạy của nhân tử;
- hệ điều kiện Karush–Kuhn–Tucker, với tính cần và tính đủ.

## Câu hỏi mở đầu

Xét bài toán một biến

$$
\begin{aligned}
&\min_{x\in\mathbb R}\ x^2+1\\
&\text{với}\ \ (x-2)(x-4)\le0 .
\end{aligned}
$$

Tập khả thi là đoạn $[2,4]$. Trên đoạn này $x^2+1$ tăng, nên nghiệm là $x^*=2$ và giá trị tối ưu là $p^*=5$. Lập luận đó dựa vào tính đơn điệu trên một đoạn và không dùng được cho bài toán nhiều biến. Một cách khác là cộng vào mục tiêu một bội không âm của hàm ràng buộc: với $\lambda\ge0$ và $x$ khả thi, $(x-2)(x-4)\le0$, nên hàm $x^2+1+\lambda(x-2)(x-4)$ không vượt $x^2+1$ tại mọi điểm khả thi, và giá trị nhỏ nhất của nó trên $\mathbb R$ không vượt $p^*$.

**Câu hỏi.** Với những giá trị $\lambda\ge0$ nào thì giá trị nhỏ nhất trên $\mathbb R$ của $x^2+1+\lambda(x-2)(x-4)$ bằng $p^*=5$?

Một câu trả lời hấp dẫn là: mọi $\lambda$ đủ lớn để điểm cực tiểu của hàm này nằm trong đoạn $[2,4]$, vì khi đó giá trị nhỏ nhất đạt tại một phương án khả thi, nên không thể nhỏ hơn $p^*$. Lập luận này chỉ so sánh vị trí của điểm cực tiểu với tập khả thi; để kiểm tra nó, cần tính giá trị nhỏ nhất đó như một hàm của $\lambda$.

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Lập hàm Lagrange và hàm đối ngẫu của một bài toán có ràng buộc, tính hàm đối ngẫu đến công thức tường minh trên bài toán nhỏ, và dùng giá trị của nó làm cận dưới cho giá trị tối ưu.
2. Chứng minh đối ngẫu yếu, lập và giải bài toán đối ngẫu, và phân biệt khoảng đối ngẫu của một cặp phương án với khoảng đối ngẫu tối ưu.
3. Kiểm tra điều kiện Slater, nêu đúng các kết luận mà định lý Slater bảo đảm, và phân biệt chúng với sự đạt nghiệm của bài toán gốc.
4. Biểu diễn bài toán và hàm đối ngẫu trên mặt phẳng giá trị, đọc nhân tử từ độ dốc của đường cận, và đọc độ nhạy của giá trị tối ưu theo mức ràng buộc.
5. Lập và giải hệ điều kiện Karush–Kuhn–Tucker theo từng trường hợp của điều kiện bù trừ, và nêu giả thiết cho tính cần và cho tính đủ của hệ.
6. Vận dụng đối ngẫu vào hồi quy có ràng buộc chuẩn, máy vector hỗ trợ lề mềm, bài toán chọn dữ liệu rời rạc, và chỉ ra kết luận nào mất khi một giả thiết bị vi phạm.

## Kiến thức tiên quyết

Bài 03 dùng các kết quả sau của Bài 00, Bài 01 và Bài 02.

- **Cận dưới đúng và bài toán tối ưu** (Định nghĩa 01.9, Định nghĩa 01.11). Cận dưới đúng $\inf_{x\in C}f(x)$ là số lớn nhất không vượt mọi $f(x)$, $x\in C$; nó có thể không đạt và bằng $-\infty$. Giá trị tối ưu $p^*=\inf_{x\in C}f_0(x)$ bằng $+\infty$ khi $C=\varnothing$.
- **Miền lồng nhau** (Mệnh đề 01.15(a)). Nếu $C'\subseteq C$ thì $\inf_Cf_0\le\inf_{C'}f_0$.
- **Tập lồi, hàm lồi, hàm lõm** (Định nghĩa 01.17, Định nghĩa 01.21). Hàm $f$ lồi trên tập lồi $C$ nếu $f(\vartheta x+(1-\vartheta)x')\le\vartheta f(x)+(1-\vartheta)f(x')$ với mọi $x,x'\in C$, $\vartheta\in[0,1]$; $f$ lõm nếu $-f$ lồi.
- **Điều kiện bậc nhất và bậc hai** (Định lý 01.25, Hệ quả 01.26, Định lý 01.29).
  - Hàm khả vi $f$ trên tập mở lồi là lồi khi và chỉ khi $f(x')\ge f(x)+\nabla f(x)^T(x'-x)$ với mọi $x,x'$.
  - Nếu $f$ lồi, khả vi trên một tập mở lồi chứa $C$ và $x^*\in C$ thỏa $\nabla f(x^*)^T(x-x^*)\ge0$ với mọi $x\in C$, thì $x^*$ là điểm cực tiểu toàn cục của $f$ trên $C$; nói riêng, $\nabla f(x^*)=0$ cho cực tiểu toàn cục trên cả tập mở đó.
  - Hàm lớp $C^2$ trên tập mở lồi là lồi khi và chỉ khi Hessian nửa xác định dương tại mọi điểm, và lồi chặt nếu Hessian xác định dương tại mọi điểm.
- **Phép toán bảo toàn tính lồi** (Định lý 01.30(a)–(c)). Tổng có hệ số không âm, hợp với ánh xạ affine và cực đại từng điểm của hữu hạn hàm lồi là hàm lồi.
- **Điều kiện cần bậc nhất** (Định lý 00.42; Nhận xét 01.14). Nếu $f$ khả vi tại một điểm trong $x^*$ của miền và $x^*$ là điểm cực tiểu địa phương thì $\nabla f(x^*)=0$.
- **Tồn tại và duy nhất** (Định lý 01.35, Định lý 01.34). Hàm liên tục trên tập không rỗng, đóng, bị chặn của $\mathbb R^n$ đạt giá trị nhỏ nhất; hàm lồi chặt có nhiều nhất một điểm cực tiểu. Bài 01 cũng dùng định lý giá trị trung gian và *phép chia đôi khoảng* (bisection method) cho một hàm liên tục đổi dấu ở hai đầu khoảng.
- **Dạng phổ biến và biến đổi tương đương** (Định nghĩa 02.1, Định nghĩa 02.5, Mệnh đề 02.6). Dạng phổ biến có miền lồi, mục tiêu và các hàm $f_i$ của ràng buộc $f_i(x)\le0$ lồi, ràng buộc đẳng thức $Ax=b$. Hai bài toán tương đương cho nghiệm của nhau qua một cặp ánh xạ. Miền giới hạn số đặc trưng không lồi (Mệnh đề 02.46).
- **Chứng nhận quy hoạch tuyến tính** (Mệnh đề 02.11). Với $\min c^Tx$, $a_i^Tx\ge\beta_i$, nếu có $\mu\ge0$ với $c=\sum_i\mu_ia_i$ thì mọi điểm khả thi có $c^Tx\ge\sum_i\mu_i\beta_i$. Một điểm khả thi đạt cận đó là nghiệm, và mọi ràng buộc có $\mu_i>0$ chặt tại mọi nghiệm.
- **Số hạng phạt và ràng buộc chặn** (Mệnh đề 02.26). Nếu $\hat w$ là nghiệm của $\min_wf_0(w)+\rho R(w)$ với $\rho\ge0$ thì $\hat w$ là nghiệm của $\min f_0(w)$ với $R(w)\le R(\hat w)$.
- **Máy vector hỗ trợ lề mềm** (Định nghĩa 02.38, Mệnh đề 02.39). Bài toán $\min_{w,w_0}\tfrac\rho2\lVert w\rVert_2^2+\sum_i\max\bigl(0,1-y_i(w^Tz_i+w_0)\bigr)$, $\rho>0$, là một quy hoạch bậc hai có biến phụ $\xi$; khi mỗi nhãn có ít nhất một mẫu, nó có nghiệm với $w$ duy nhất.
- **Bình phương nhỏ nhất** (Định nghĩa 01.4, Định lý 00.22, Mệnh đề 00.45, Mệnh đề 00.20). Hàm $J(w)=\lVert Xw-y\rVert_2^2$ có $\nabla J(w)=2X^T(Xw-y)$; $w$ là nghiệm khi và chỉ khi $X^TXw=X^Ty$; $X^TX\succ0$ khi $X$ có hạng cột đầy đủ.
- **Đại số tuyến tính** (Mệnh đề 00.5, Định nghĩa 00.6, Hệ quả 00.19). Bất đẳng thức Cauchy–Schwarz $\lvert v^Tv'\rvert\le\lVert v\rVert_2\lVert v'\rVert_2$; nếu các hàng của $A$ độc lập tuyến tính thì $A^T\nu=0$ kéo theo $\nu=0$; ma trận xác định dương khả nghịch.
- **Ví dụ và tình huống của Bài 02 dùng lại.** Ví dụ 02.1(a) (năm quan sát hồi quy), Ví dụ 02.6 và 02.8 (bài toán pha trộn), Ví dụ 02.27 và 02.28 (bài toán chọn gói), Ví dụ 02.18 (hồi quy ridge với hệ số $10$), Tình huống 02.2 (máy vector hỗ trợ trên bốn khung hình), Tình huống 02.3 (chọn dữ liệu để gán nhãn).

**Câu hỏi ôn nhanh.**

1. Xác định $\inf_{x\in\mathbb R}e^x$ và cho biết cận dưới đúng này có đạt không.
2. Hoàn thành bình phương cho $2x^2-8x+3$ và nêu giá trị nhỏ nhất trên $\mathbb R$.
3. Cho $\bar c\in\mathbb R^n$ và $\beta_0\in\mathbb R$. Chứng minh hàm $x\mapsto\bar c^Tx+\beta_0$ bị chặn dưới trên $\mathbb R^n$ khi và chỉ khi $\bar c=0$.

::: hint Lời giải câu hỏi ôn nhanh
1. $\inf_xe^x=0$, vì $e^x>0$ và $e^{-s}\to0$ khi $s\to\infty$; cận này không đạt vì $e^x>0$ với mọi $x$ (Định nghĩa 01.9).
2. $2x^2-8x+3=2(x-2)^2-5$, nên giá trị nhỏ nhất là $-5$, đạt tại $x=2$.
3. Nếu $\bar c=0$, hàm là hằng số $\beta_0$. Nếu $\bar c\ne0$, lấy $x=-s\bar c$ với $s>0$: giá trị $\beta_0-s\lVert\bar c\rVert_2^2\to-\infty$ khi $s\to\infty$.
:::

## 1. Thiết lập bài toán

Bài 03 xét bài toán gốc (primal problem) sau. Cho tập không rỗng $D\subseteq\mathbb R^n$, các hàm $f_0,f_1,\ldots,f_m:D\to\mathbb R$, ma trận $A\in\mathbb R^{p\times n}$ và vector $b\in\mathbb R^p$:

$$
\begin{aligned}
&\underset{x\in D}{\operatorname{minimize}}\quad f_0(x)\\
&\text{subject to}\\
&\quad f_i(x)\le0,\quad i=1,\ldots,m,\\
&\quad Ax=b,
\end{aligned}
\tag{1.1}
$$

với tập khả thi $C=\{x\in D\mid f_i(x)\le0,\ i=1,\ldots,m;\ Ax=b\}$ và giá trị tối ưu $p^*=\inf_{x\in C}f_0(x)$. Bài toán (1.1) có dạng của Định nghĩa 01.11 với ràng buộc đẳng thức affine; $D$ và các $f_i$ không cần lồi hay khả vi. Miền $D$ chứa các điều kiện không được gán nhân tử. Ràng buộc có dấu $\ge$, như $x\ge1$, được viết lại thành $1-x\le0$.

Các thành phần của bài toán chứng nhận gồm:

1. **Phương án.** Mỗi điểm khả thi $\hat x$ cho cận trên $p^*\le f_0(\hat x)$.
2. **Cận dưới.** Một số $\ell$ với $f_0(x)\ge\ell$ cho mọi $x\in C$; khi $\ell=f_0(\hat x)$, phương án $\hat x$ là nghiệm.
3. **Nhân tử.** Mỗi bất đẳng thức nhận một hệ số không âm, mỗi đẳng thức một hệ số tùy ý; tổ hợp với mục tiêu sinh cận dưới.
4. **Câu hỏi chọn nhân tử.** Nhân tử nào cho cận lớn nhất, và cận đó có bằng $p^*$ không.
5. **Câu hỏi điều kiện.** Giả thiết nào trên dữ liệu bảo đảm có nhân tử cho cận bằng $p^*$, và hệ phương trình nào cho nghiệm cùng nhân tử.
6. **Đối tượng so sánh.** Bài toán một biến của Câu hỏi mở đầu, bài toán pha trộn và bài toán chọn gói của Bài 02, hồi quy có ràng buộc chuẩn và máy vector hỗ trợ lề mềm.

## 2. Ký hiệu và giả thiết

Vô hướng và vector viết chữ thường, ma trận viết chữ hoa, không in đậm; mọi vector là vector cột. Bất đẳng thức giữa hai vector, như $\lambda\ge0$ hay $f(x)\le u$, hiểu theo từng tọa độ; $\succeq$ và $\succ$ chỉ dùng cho ma trận. Ký hiệu chỉ dùng trong một ví dụ, một chứng minh hoặc một bài tập được giới thiệu tại chỗ. Như Boyd và Vandenberghe (2004), bài toán tổng quát có $n$ biến, $m$ ràng buộc bất đẳng thức và $p$ ràng buộc đẳng thức; dữ liệu có $N$ mẫu và $d$ đặc trưng.

| Ký hiệu | Ý nghĩa | Phạm vi, giả thiết |
|---|---|---|
| $x\in\mathbb R^n$, $x^*$ | biến quyết định; một nghiệm của bài toán gốc | — |
| $D$; $f_0$; $f_i$, $f=(f_1,\ldots,f_m)$ | miền; hàm mục tiêu; hàm ràng buộc $f_i(x)\le0$ | $D\ne\varnothing$ |
| $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$ | ma trận và vế phải của ràng buộc đẳng thức $Ax=b$ | — |
| $C$; $p^*$ | tập khả thi; giá trị tối ưu | có thể bằng $\pm\infty$ |
| $\hat x$; $\ell$ | một phương án khả thi; một cận dưới | — |
| $\lambda\in\mathbb R^m$, $\nu\in\mathbb R^p$ | nhân tử của bất đẳng thức, của đẳng thức | khả thi đối ngẫu khi $\lambda\ge0$ và $(\lambda,\nu)\in\operatorname{dom}g$ |
| $L(x,\lambda,\nu)$ | hàm Lagrange | — |
| $x(\lambda)$ | điểm cực tiểu của $L(\cdot,\lambda)$ khi nó duy nhất | — |
| $g$; $\operatorname{dom}g$ | hàm đối ngẫu; miền hữu hiệu | $g$ có thể bằng $-\infty$ |
| $d^*$; $(\lambda^*,\nu^*)$ | giá trị tối ưu đối ngẫu; một nghiệm đối ngẫu | — |
| $f_0(x)-g(\lambda,\nu)$; $p^*-d^*$ | khoảng đối ngẫu của một cặp; khoảng đối ngẫu tối ưu | — |
| $\bar x$ | điểm Slater | — |
| $(u,v,t)$ | mức ràng buộc bất đẳng thức, mức ràng buộc đẳng thức, mức mục tiêu | $u\in\mathbb R^m$, $v\in\mathbb R^p$, $t\in\mathbb R$ |
| $G$; $\mathcal A$ | tập giá trị; tập trên | — |
| $p^*(u,v)$ | hàm giá trị của bài toán nhiễu | $p^*(0,0)=p^*$ |
| $c$; $a_i$, $\beta_i$ | vector chi phí; hàng và vế phải của ràng buộc $a_i^Tx\ge\beta_i$ | quy hoạch tuyến tính |
| $\mu$ | hệ số chứng nhận của Mệnh đề 02.11 | chỉ khi dẫn Bài 02 |
| $X$, $y$, $w$; $J(w)$ | ma trận thiết kế, vector đầu ra, vector tham số; $\lVert Xw-y\rVert_2^2$ | như Bài 02 |
| $R$; $\tau$; $\rho$ | hàm phạt; mức chặn của ràng buộc $R(w)\le\tau$; hệ số phạt | $\rho\ge0$; Bài 02 viết $\lambda$ cho $\rho$ |
| $w(\rho)$; $\varphi(\rho)$ | nghiệm của $\min_wJ(w)+\rho\lVert w\rVert_2^2$; $\lVert w(\rho)\rVert_2^2$ | $w(0)$: nghiệm bình phương nhỏ nhất |
| $z_i$, $y_i$; $(w,w_0)$; $\xi$ | đặc trưng và nhãn của mẫu $i$; tham số của điểm số $w^Tz+w_0$; biến phụ | máy vector hỗ trợ; Bài 02 viết $u_i$ cho $z_i$ |
| $\omega_i$ | biên có dấu $y_i(w^Tz_i+w_0)$ | Bài 01, Bài 02 viết $m_i$ |
| $\alpha_i$, $\eta_i$; $\Psi$ | nhân tử của ràng buộc lề, của $-\xi_i\le0$; mục tiêu của bài toán đối ngẫu máy vector hỗ trợ | — |
| $\vartheta$ | trọng số của tổ hợp lồi | $\vartheta\in[0,1]$ |
| $\mathbf 1$ | vector có mọi tọa độ bằng $1$ (in đậm để phân biệt với số $1$) | kích thước theo ngữ cảnh |
| $\nabla f$; $\nabla_xL$ | gradient; gradient của $L$ theo riêng biến $x$ | — |

Giả thiết của bài toán gốc gồm:

- **(Đ1) Dạng chung.** Bài toán (1.1) với $D\ne\varnothing$, các $f_i:D\to\mathbb R$ tùy ý và đẳng thức affine $Ax=b$.
- **(Đ2) Tính lồi.** Bài toán (1.1) ở dạng phổ biến của Định nghĩa 02.1 với $D=\mathbb R^n$, hoặc với $D$ mở và lồi khi kết quả nêu rõ.
- **(Đ3) Độ dư.** Có một điểm thỏa $Ax=b$ và làm mọi bất đẳng thức âm cùng lúc.
- **(Đ4) Tính khả vi.** $f_0,\ldots,f_m$ khả vi trên $D$ mở.
- **(Đ5) Giá trị hữu hạn.** $p^*$ hữu hạn.

Giả thiết về dữ liệu gồm: với hồi quy, $X$ có hạng cột đầy đủ và $X^Ty\ne0$ khi kết quả nêu rõ; với máy vector hỗ trợ, $y_i\in\{-1,+1\}$, $\rho>0$ và mỗi nhãn có ít nhất một mẫu.

## 3. Ví dụ xuyên suốt: bài toán một biến trên đoạn $[2,4]$

Bài toán của Câu hỏi mở đầu đủ nhỏ để giải trực tiếp, nên mọi công cụ của bài được kiểm tra lại trên một nghiệm đã biết. Hai ứng dụng học máy của bài dùng lại dữ liệu của Bài 02: năm quan sát hồi quy của Ví dụ 02.1(a) cho hồi quy có ràng buộc chuẩn, và bốn khung hình của Tình huống 02.2 cho máy vector hỗ trợ lề mềm.

::: example Ví dụ 03.1 (Bài toán một biến trên đoạn $[2,4]$)
**Dữ kiện.** Bài toán

$$
\begin{aligned}
&\underset{x\in\mathbb R}{\operatorname{minimize}}\\
&\quad f_0(x)\\
&\text{subject to}\\
&\quad f_1(x)\le0,
\end{aligned}
\tag{3.1}
$$

với $f_0(x)=x^2+1$ và $f_1(x)=(x-2)(x-4)$.

**Tập khả thi.** Tích $(x-2)(x-4)$ không dương khi và chỉ khi hai thừa số trái dấu hoặc một thừa số bằng $0$, tức $2\le x\le4$. Vậy $C=[2,4]$.

**Giải.** Đạo hàm $f_0'(x)=2x$ dương trên $[2,4]$, nên $f_0$ tăng chặt trên đoạn này và đạt giá trị nhỏ nhất tại đầu mút trái. Nghiệm là $x^*=2$, giá trị tối ưu là $p^*=f_0(2)=5$.

**Kiểm tra lại.** $f_0(3)=10>5$ và $f_0(4)=17>5$. Điểm $x=0$ cho $f_0(0)=1<5$ nhưng $f_1(0)=8>0$, nên không khả thi: điểm cực tiểu không ràng buộc của $f_0$ nằm ngoài $C$.
:::

![Đồ thị parabol t bằng x bình phương cộng 1 trên trục x. Đoạn khả thi từ 2 đến 4 được tô; trên đoạn này đồ thị đi lên từ điểm (2, 5) tới điểm (4, 17). Điểm (2, 5) được đánh dấu là nghiệm tối ưu nằm ở biên trái của đoạn khả thi; đỉnh parabol tại (0, 1) nằm ngoài đoạn.](img/lec-03/intro-feasible.svg)

Trên hình, nghiệm nằm ở biên của tập khả thi, nơi $f_0'(2)=4\ne0$, nên điều kiện $\nabla f_0(x^*)=0$ của bài toán không ràng buộc không dùng được.

## 4. Chứng nhận tối ưu và cận dưới

### 4.1. Cận trên và cận dưới của giá trị tối ưu

Điểm $x=2$ thỏa ràng buộc của bài toán (3.1) và cho giá trị $5$. Mỗi điểm khả thi cho một cận trên của giá trị tối ưu, vì theo Định nghĩa 01.9, $p^*\le f_0(x)$ với mọi $x$ khả thi. Để khẳng định $x=2$ là nghiệm, cần bất đẳng thức $f_0(x)\ge5$ đúng đồng thời tại mọi điểm khả thi. Mệnh đề 02.11 không cho bất đẳng thức đó, vì $x^2+1$ không là tổ hợp tuyến tính của các vế trái ràng buộc. Do đó, chúng ta cần một cách sinh cận dưới chỉ dùng phép tính trên các hàm $f_0$, $f_1$, không cần mô tả tập khả thi.

### 4.2. Bội không âm của ràng buộc và cận dưới

Một cách trực quan, ràng buộc có thể được chuyển thành một khoản cộng vào mục tiêu. Trên tập khả thi, $f_1(x)\le0$, nên với một số $\lambda\ge0$, tích $\lambda f_1(x)$ không dương và hàm $f_0+\lambda f_1$ không vượt $f_0$ tại mọi điểm khả thi. Do đó, nếu một số $\ell$ không vượt $f_0+\lambda f_1$ tại mọi điểm của $\mathbb R$ thì $\ell$ cũng không vượt $f_0$ tại mọi điểm khả thi. Tìm một số như vậy là một bài toán không ràng buộc. Để làm rõ, xem ví dụ sau với hai giá trị của $\lambda$.

::: example Ví dụ 03.2 (Hai cận dưới cho bài toán (3.1))
**Dữ kiện.** Bài toán (3.1): $f_0(x)=x^2+1$, $f_1(x)=(x-2)(x-4)\le0$, với $C=[2,4]$, $x^*=2$, $p^*=5$ (Ví dụ 03.1).

**Với $\lambda=1$.** Khai triển $f_1(x)=x^2-6x+8$ và cộng vào $f_0$:

$$
\begin{aligned}
f_0(x)+f_1(x)&=2x^2-6x+9\\
&=2\Bigl(x-\tfrac32\Bigr)^2+\tfrac92 ,
\end{aligned}
$$

trong đó bước hoàn thành bình phương dùng $2(x^2-3x)=2(x-\tfrac32)^2-\tfrac92$. Bình phương không âm, nên $f_0(x)+f_1(x)\ge4{,}5$ với mọi $x\in\mathbb R$. Với $x$ khả thi, $f_1(x)\le0$, nên $f_0(x)\ge f_0(x)+f_1(x)\ge4{,}5$. Vậy $4{,}5$ là một cận dưới của $p^*$. Cận này đạt dấu bằng tại $x=1{,}5$, một điểm không khả thi vì $f_1(1{,}5)=(-0{,}5)(-2{,}5)=1{,}25>0$.

**Với $\lambda=2$.** Tương tự,

$$
\begin{aligned}
f_0(x)+2f_1(x)&=3x^2-12x+17\\
&=3(x-2)^2+5\\
&\ge5\qquad\forall x\in\mathbb R .
\end{aligned}
$$

Dòng đầu khai triển $2(x^2-6x+8)$ rồi cộng $x^2+1$; dòng thứ hai hoàn thành bình phương; dòng thứ ba dùng $3(x-2)^2\ge0$. Với $x$ khả thi, $f_0(x)\ge f_0(x)+2f_1(x)\ge5$. Điểm $x=2$ khả thi và có $f_0(2)=5$, nên $x=2$ là nghiệm.

**Kiểm tra lại.** Tại $x=2$: $3\cdot0+5=5=f_0(2)$ và $f_1(2)=0$, nên hai vế của $f_0(2)\ge f_0(2)+2f_1(2)$ bằng nhau.
:::

![Ba đường cong trên trục x. Đường xám là t bằng x bình phương cộng 1 (nhân tử 0) với cực tiểu 1 tại x bằng 0. Đường cam là L với nhân tử 1, bằng 2x bình phương trừ 6x cộng 9, cực tiểu 4,5 tại x bằng 1,5, nằm ngoài đoạn khả thi. Đường xanh đậm là L với nhân tử 2, bằng 3x bình phương trừ 12x cộng 17, cực tiểu 5 tại x bằng 2. Cả ba đường đi qua hai điểm (2, 5) và (4, 17), là hai đầu mút của đoạn khả thi [2, 4] được tô nền; trên đoạn đó hai đường cam và xanh nằm dưới đường xám.](img/lec-03/lagrangian-family.svg)

Ba hàm $f_0+\lambda f_1$ với $\lambda=0,1,2$ trùng nhau tại hai đầu mút $x=2$ và $x=4$, nơi $f_1=0$, và nằm dưới $f_0$ trên đoạn khả thi. Giá trị nhỏ nhất của mỗi đường là một cận dưới, lần lượt bằng $1$, $4{,}5$ và $5$; chỉ đường $\lambda=2$ có điểm thấp nhất nằm trong đoạn khả thi và trùng với $f_0$ tại đó.

### 4.3. Cận dưới và chứng nhận tối ưu

Ví dụ 03.2 dùng hai đối tượng: một số không vượt $f_0$ trên tập khả thi, và một điểm khả thi có giá trị bằng số đó. Với bài toán tối ưu tổng quát của Định nghĩa 01.11, hai đối tượng này được đặt tên theo định nghĩa sau.

::: definition Định nghĩa 03.1 (Cận dưới, cận khít, khoảng chứng nhận, chứng nhận tối ưu)
Cho bài toán tối ưu với tập khả thi $C\subseteq\mathbb R^n$, mục tiêu $f_0:C\to\mathbb R$ và giá trị tối ưu $p^*=\inf_{x\in C}f_0(x)$.

- **Cận dưới.** Một số thực $\ell$ là một *cận dưới* (lower bound) của bài toán nếu $f_0(x)\ge\ell$ với mọi $x\in C$.
- **Cận khít, cận lỏng.** Cận dưới $\ell=p^*$ gọi là *cận khít* (tight bound); cận dưới $\ell<p^*$ gọi là *cận lỏng* (loose bound).
- **Khoảng chứng nhận.** Với một điểm khả thi $\hat x\in C$ và một cận dưới $\ell$, hiệu $f_0(\hat x)-\ell\ge0$ gọi là *khoảng chứng nhận* của cặp $(\hat x,\ell)$.
- **Chứng nhận tối ưu.** Khi khoảng chứng nhận bằng $0$, cận dưới $\ell$ gọi là một *chứng nhận tối ưu* (optimality certificate) cho $\hat x$.
:::

Theo Định nghĩa 01.9, $p^*$ là cận dưới lớn nhất, nên mọi cận dưới thỏa $\ell\le p^*$, và chỉ cận khít có thể là chứng nhận tối ưu. Chẳng hạn, với bài toán (3.1), số $4{,}5$ là một cận lỏng, cặp $(\hat x,\ell)=(2;\,4{,}5)$ có khoảng chứng nhận $0{,}5$, còn số $5$ là cận khít và là chứng nhận tối ưu cho $\hat x=2$. Số $5{,}5$ không là cận dưới, vì điểm khả thi $x=2$ có giá trị $5<5{,}5$.

Mệnh đề sau nêu thông tin mà một cặp (phương án, cận dưới) cho về giá trị tối ưu chưa biết.

::: proposition Mệnh đề 03.2 (Cận dưới chặn sai số tối ưu; chứng nhận tối ưu) — chứng minh đầy đủ
**Giả thiết.** Bài toán có tập khả thi $C\ne\varnothing$, $\hat x\in C$ và $\ell$ là một cận dưới theo Định nghĩa 03.1.

**Kết luận.**

- (a) $\ell\le p^*\le f_0(\hat x)$, nên *sai số tối ưu* (suboptimality) $f_0(\hat x)-p^*$ của phương án $\hat x$ không vượt khoảng chứng nhận $f_0(\hat x)-\ell$.
- (b) Nếu $f_0(\hat x)=\ell$ thì $\hat x$ là nghiệm và $p^*=\ell$.
:::

::: proof Chứng minh Mệnh đề 03.2
**Lộ trình.** So sánh $\ell$ và $f_0(\hat x)$ với cận dưới lớn nhất $p^*$ của tập giá trị $\{f_0(x)\mid x\in C\}$.

**Bước 1 (phần (a)).** Vì $\ell\le f_0(x)$ với mọi $x\in C$, số $\ell$ là một cận dưới của tập $\{f_0(x)\mid x\in C\}$, nên không vượt cận dưới lớn nhất $p^*$ (Định nghĩa 01.9). Vì $\hat x\in C$, $p^*\le f_0(\hat x)$ theo cùng định nghĩa. Trừ hai vế của $\ell\le p^*$ khỏi $f_0(\hat x)$ cho $f_0(\hat x)-p^*\le f_0(\hat x)-\ell$.

**Bước 2 (phần (b)).** Nếu $f_0(\hat x)=\ell$ thì chuỗi ở (a) thành $\ell\le p^*\le\ell$, nên $p^*=\ell=f_0(\hat x)$; một điểm khả thi có giá trị bằng $p^*$ là nghiệm theo Định nghĩa 01.11. $\square$
:::

Mệnh đề 03.2 tách việc chứng nhận tối ưu thành hai việc độc lập: tìm một phương án tốt và tìm một cận dưới tốt. Phần (a) dùng được cả khi chưa có chứng nhận: khi một bộ giải trả về phương án $\hat x$ và cận $\ell$, sai số tối ưu không quá $f_0(\hat x)-\ell$ mà không cần biết $p^*$. Với Ví dụ 03.2, cặp $(2;\,4{,}5)$ cho sai số của phương án $x=2$ không quá $0{,}5$, còn cặp $(2;\,5)$ cho sai số bằng $0$.

::: remark Nhận xét 03.3 (Chứng nhận của Bài 02 là một cận dưới)
Trong Mệnh đề 02.11, số $\sum_i\mu_i\beta_i$ là một cận dưới theo Định nghĩa 03.1, và phần (b) của mệnh đề đó là Mệnh đề 03.2(b). Ví dụ 03.2 dùng cùng ý nhưng không cần tuyến tính: cộng bội không âm $\lambda f_1$ rồi lấy cực tiểu trên toàn $\mathbb R$.
:::

::: exercise Bài tập 03.1 (Hai cận dưới cho một bài toán có ràng buộc chặn dưới)
Xét bài toán $\min_{x\in\mathbb R}x^2+2x$ với ràng buộc $x\ge1$, viết thành $f_1(x)=1-x\le0$.

- (a) Với $\lambda=2$ và $\lambda=4$, tính giá trị nhỏ nhất trên $\mathbb R$ của $x^2+2x+\lambda(1-x)$.
- (b) Xác định mỗi giá trị đó có là cận dưới của bài toán theo Định nghĩa 03.1 không.
- (c) Tính khoảng chứng nhận của phương án $\hat x=1$ với từng cận và kết luận về tính tối ưu của $\hat x=1$.
:::

::: hint
Viết $x^2+(2-\lambda)x+\lambda$ thành $\bigl(x-\frac{\lambda-2}2\bigr)^2+\lambda-\frac{(2-\lambda)^2}4$. Lập luận cận dưới giống Ví dụ 03.2.
:::

::: solution
**Câu (a).** Hàm $x^2+2x+\lambda(1-x)=x^2+(2-\lambda)x+\lambda$ đạt cực tiểu trên $\mathbb R$ tại $x=\frac{\lambda-2}2$ với giá trị $\lambda-\frac{(2-\lambda)^2}4$. Với $\lambda=2$: điểm $x=0$, giá trị $2$. Với $\lambda=4$: điểm $x=1$, giá trị $4-1=3$.

**Câu (b).** Cả hai đều là cận dưới. Với $x$ khả thi, $1-x\le0$ và $\lambda\ge0$, nên $x^2+2x\ge x^2+2x+\lambda(1-x)$, và vế phải không nhỏ hơn giá trị nhỏ nhất vừa tính.

**Câu (c).** $f_0(1)=3$. Với cận $2$, khoảng chứng nhận bằng $1$; với cận $3$, bằng $0$. Theo Mệnh đề 03.2(b), $\hat x=1$ là nghiệm và $p^*=3$.

**Kiểm tra lại.** Trên tập khả thi $[1,\infty)$, $f_0'(x)=2x+2>0$, nên $f_0$ tăng và nhỏ nhất tại $x=1$ với giá trị $3$, khớp kết luận.
:::

## 5. Hàm và bài toán đối ngẫu Lagrange

Ví dụ 03.2 dùng một ràng buộc và một giá trị $\lambda$ chọn trước. Bài toán pha trộn của Bài 02 có bốn bất đẳng thức, nên mỗi ràng buộc cần một nhân tử riêng, và phép lấy cực tiểu theo $x$ cần được viết thành một hàm của các nhân tử.

### 5.1. Hàm Lagrange

Với nhiều ràng buộc, mỗi bất đẳng thức $f_i\le0$ nhận một trọng số $\lambda_i\ge0$. Với đẳng thức thứ $j$ của $Ax=b$, tọa độ $(Ax-b)_j$ bằng $0$ tại mọi điểm khả thi, nên cộng $\nu_j(Ax-b)_j$ với $\nu_j$ âm hay dương đều không đổi giá trị tại điểm khả thi. Về mặt ý tưởng, hàm cần xây dựng là mục tiêu cộng tổng có trọng số các vế trái ràng buộc, với trọng số không âm cho bất đẳng thức và trọng số tự do cho đẳng thức. Để làm rõ, xem định nghĩa sau.

::: definition Định nghĩa 03.4 (Hàm Lagrange và nhân tử)
Cho bài toán (1.1). *Hàm Lagrange* (Lagrangian) của bài toán là $L:D\times\mathbb R^m\times\mathbb R^p\to\mathbb R$,

$$
\begin{aligned}
&L(x,\lambda,\nu)\\
&\quad=f_0(x)+\sum_{i=1}^m\lambda_if_i(x)\\
&\qquad+\nu^T(Ax-b).
\end{aligned}
\tag{5.1}
$$

Số $\lambda_i$ là *nhân tử Lagrange* (Lagrange multiplier; còn gọi là biến đối ngẫu, dual variable) của ràng buộc $f_i(x)\le0$, số $\nu_j$ là nhân tử của ràng buộc đẳng thức thứ $j$; $\lambda\in\mathbb R^m$ và $\nu\in\mathbb R^p$ gọi là các vector nhân tử.
:::

Hàm $L$ có ba nhóm số hạng, bao gồm:

- mục tiêu gốc $f_0(x)$;
- các số hạng $\lambda_if_i(x)$: khi $\lambda_i\ge0$ và $x$ thỏa ràng buộc, số hạng này không dương; khi $\lambda_i>0$ và $x$ vi phạm ($f_i(x)>0$), nó dương và tăng theo mức vi phạm;
- số hạng $\nu^T(Ax-b)$, bằng $0$ tại mọi $x$ thỏa đẳng thức, với mọi $\nu$.

Định nghĩa cho phép mọi $\lambda\in\mathbb R^m$; dấu $\lambda\ge0$ chỉ cần khi dùng $L$ để lấy cận dưới. Với bài toán (3.1), ta có $m=1$, $p=0$ và

$$
\begin{aligned}
L(x,\lambda)&=x^2+1+\lambda(x-2)(x-4)\\
&=(1+\lambda)x^2-6\lambda x+1+8\lambda
\end{aligned}
$$

có được bằng cách khai triển $(x-2)(x-4)=x^2-6x+8$, nhân với $\lambda$ rồi gom hệ số theo lũy thừa của $x$. Với $\lambda=1$ và $\lambda=2$, biểu thức này trùng với hai hàm của Ví dụ 03.2.

Hàm Lagrange tổng quát hóa phép tổ hợp không âm của Mệnh đề 02.11: với quy hoạch tuyến tính $\min c^Tx$, $\beta_i-a_i^Tx\le0$, ta có $L(x,\lambda)=c^Tx+\sum_i\lambda_i(\beta_i-a_i^Tx)$, và hệ số $\mu_i$ của Bài 02 đóng vai trò của $\lambda_i$. So với hàm có phạt $f_0(w)+\rho R(w)$ của Mệnh đề 02.26, hệ số phạt được chọn trước, còn các nhân tử là biến của một bài toán tối ưu khác.

Nhầm lẫn thường gặp là cho rằng $L(x,\lambda,\nu)\le f_0(x)$ với mọi $x$. Bất đẳng thức này chỉ đúng tại $x$ khả thi và $\lambda\ge0$. Chẳng hạn, với bài toán (3.1), $\lambda=1$ và $x=0$ cho $L(0,1)=9>1=f_0(0)$.

### 5.2. Hàm đối ngẫu

Ở Ví dụ 03.2, cận dưới là giá trị nhỏ nhất của $L(\cdot,\lambda)$ trên toàn $\mathbb R$. Khi $L$ không đạt cực tiểu, giá trị nhỏ nhất không tồn tại, nhưng cận dưới đúng vẫn tồn tại (Định nghĩa 01.9). Do đó, đối tượng cần định nghĩa là cận dưới đúng của $L$ theo $x$, coi như một hàm của nhân tử.

::: definition Định nghĩa 03.5 (Hàm đối ngẫu và miền hữu hiệu)
Cho bài toán (1.1) với hàm Lagrange (5.1). *Hàm đối ngẫu Lagrange* (Lagrange dual function) là $g:\mathbb R^m\times\mathbb R^p\to\mathbb R\cup\{-\infty\}$,

$$
g(\lambda,\nu)=\inf_{x\in D}L(x,\lambda,\nu).
\tag{5.2}
$$

Giá trị $g(\lambda,\nu)=-\infty$ khi $L(\cdot,\lambda,\nu)$ không bị chặn dưới trên $D$. Tập $\operatorname{dom}g=\{(\lambda,\nu)\mid g(\lambda,\nu)>-\infty\}$ gọi là *miền hữu hiệu* (effective domain) của $g$.
:::

Công thức (5.2) cố định nhân tử rồi lấy cận dưới đúng theo $x$ trên toàn miền $D$. Các ràng buộc $f_i\le0$ và $Ax=b$ không được áp lại, vì chúng đã nằm trong $L$ dưới dạng các số hạng có trọng số. Hàm $g$ không nhận giá trị $+\infty$: vì $D$ không rỗng, với một điểm $x_0\in D$, $g(\lambda,\nu)\le L(x_0,\lambda,\nu)<+\infty$. Với bài toán (3.1) và $\lambda=-1$, hàm $L(x,-1)=6x-7$ không bị chặn dưới, nên $g(-1)=-\infty$ và $-1\notin\operatorname{dom}g$.

::: example Ví dụ 03.3 (Hàm đối ngẫu của bài toán (3.1))
**Dữ kiện.** Bài toán (3.1) với $D=\mathbb R$ và $L(x,\lambda)=(1+\lambda)x^2-6\lambda x+1+8\lambda$. Ta xét ba trường hợp theo dấu của hệ số $1+\lambda$ của $x^2$.

**Trường hợp $\lambda>-1$.** Đặt $1+\lambda$ ra ngoài hai số hạng chứa $x$ và thêm bớt bình phương của nửa hệ số $x$ trong ngoặc, là $\frac{3\lambda}{1+\lambda}$:

$$
\begin{aligned}
L(x,\lambda)={}&(1+\lambda)\Bigl(x-\frac{3\lambda}{1+\lambda}\Bigr)^2\\
&+1+8\lambda-\frac{9\lambda^2}{1+\lambda}.
\end{aligned}
$$

Số hạng bình phương không âm và bằng $0$ tại $x(\lambda)=\frac{3\lambda}{1+\lambda}$, nên cận dưới đúng đạt tại đó. Dùng $\frac{9\lambda^2}{1+\lambda}=9(\lambda-1)+\frac9{1+\lambda}$, đúng vì $9(\lambda-1)(1+\lambda)+9=9\lambda^2$,

$$
g(\lambda)=10-\lambda-\frac9{1+\lambda}.
$$

**Trường hợp $\lambda=-1$.** $L(x,-1)=6x-7$ không bị chặn dưới, nên $g(-1)=-\infty$.

**Trường hợp $\lambda<-1$.** Hệ số của $x^2$ âm, nên $L(x,\lambda)\to-\infty$ khi $x\to\infty$, và $g(\lambda)=-\infty$.

Vậy $\operatorname{dom}g=(-1,\infty)$. Một số giá trị:

- $g(0)=10-0-9=1$;
- $g(1)=10-1-4{,}5=4{,}5$;
- $g(2)=10-2-3=5$;
- $g(3)=10-3-2{,}25=4{,}75$;
- $g(8)=10-8-1=1$.

**Kiểm tra lại.** $g(1)$ và $g(2)$ trùng với hai cận của Ví dụ 03.2, và các điểm đạt $x(1)=1{,}5$, $x(2)=2$ cũng trùng. Tại $\lambda=0$, $g(0)=\inf_xx^2+1=1$, cận dưới đúng của mục tiêu khi bỏ ràng buộc.
:::

![Đồ thị hàm g theo nhân tử lambda. Đường cong tiến về âm vô cực khi lambda giảm về âm 1, có tiệm cận đứng tại âm 1. Phần lambda lớn hơn hoặc bằng 0 được tô nền. Đồ thị đi qua g(0) bằng 1, tăng tới cực đại 5 tại lambda bằng 2 rồi giảm. Một đường nét đứt nằm ngang ở mức 5 đi qua đỉnh; khoảng cách từ g(0) tới 5 được ghi là 4.](img/lec-03/dual-function.svg)

Trên đồ thị của $g$, phần nền tô là các nhân tử thỏa $\lambda\ge0$. Phần $-1<\lambda<0$ thuộc miền hữu hiệu, nhưng giá trị ở đó không được dùng làm cận dưới, vì lập luận của Ví dụ 03.2 cần $\lambda\ge0$. Đỉnh của đồ thị tại $\lambda=2$ có độ cao $5=p^*$, và đồ thị lõm. Mệnh đề sau cho thấy tính lõm đúng với mọi bài toán (1.1), theo lập luận của Boyd và Vandenberghe (2004), §5.1.2, tr. 216.

::: proposition Mệnh đề 03.6 (Hàm đối ngẫu lõm) — chứng minh đầy đủ
**Giả thiết.** Bài toán (1.1) với $D$ và các hàm $f_0,\ldots,f_m$ bất kỳ.

**Kết luận.** Với mọi $(\lambda,\nu)$, $(\lambda',\nu')$ thuộc $\operatorname{dom}g$ và mọi $\vartheta\in[0,1]$, đặt $(\lambda_\vartheta,\nu_\vartheta)=\vartheta(\lambda,\nu)+(1-\vartheta)(\lambda',\nu')$; khi đó

$$
\begin{aligned}
g(\lambda_\vartheta,\nu_\vartheta)\ge{}&\vartheta g(\lambda,\nu)\\
&+(1-\vartheta)g(\lambda',\nu').
\end{aligned}
$$

Do đó $\operatorname{dom}g$ là tập lồi và $g$ là hàm lõm trên $\operatorname{dom}g$.
:::

::: proof Chứng minh Mệnh đề 03.6
**Lộ trình.** Với mỗi $x$ cố định, $L$ là hàm affine của nhân tử; một cận dưới chung của các hàm affine bảo toàn bất đẳng thức tổ hợp lồi. Với $\vartheta\in\{0,1\}$, khẳng định là đẳng thức; xét $\vartheta\in(0,1)$.

**Bước 1 (với $x$ cố định, $L$ affine theo nhân tử).** Khi $x\in D$ cố định, $f_0(x)$, $f_i(x)$ và $Ax-b$ là các hằng số, nên $L(x,\lambda,\nu)$ là một hằng số cộng một tổ hợp tuyến tính của các tọa độ của $\lambda$ và $\nu$. Một hàm như vậy bảo toàn tổ hợp lồi:

$$
\begin{aligned}
&L(x,\lambda_\vartheta,\nu_\vartheta)\\
&\quad=\vartheta L(x,\lambda,\nu)\\
&\qquad+(1-\vartheta)L(x,\lambda',\nu').
\end{aligned}
$$

**Bước 2 (so với các cận dưới đúng).** Theo Định nghĩa 03.5, $L(x,\lambda,\nu)\ge g(\lambda,\nu)$ và $L(x,\lambda',\nu')\ge g(\lambda',\nu')$ với mọi $x\in D$, và hai vế phải hữu hạn vì hai cặp thuộc $\operatorname{dom}g$. Nhân hai bất đẳng thức với $\vartheta>0$ và $1-\vartheta>0$, rồi cộng và dùng Bước 1:

$$
\begin{aligned}
&L(x,\lambda_\vartheta,\nu_\vartheta)\\
&\quad\ge\vartheta g(\lambda,\nu)\\
&\qquad+(1-\vartheta)g(\lambda',\nu')\\
&\qquad\forall x\in D.
\end{aligned}
$$

**Bước 3 (lấy cận dưới đúng).** Vế phải là một số không phụ thuộc $x$ và là một cận dưới của $\{L(x,\lambda_\vartheta,\nu_\vartheta)\mid x\in D\}$, nên không vượt cận dưới lớn nhất $g(\lambda_\vartheta,\nu_\vartheta)$ (Định nghĩa 01.9). Đó là bất đẳng thức cần chứng minh. Vế phải hữu hạn, nên $g(\lambda_\vartheta,\nu_\vartheta)>-\infty$, tức $(\lambda_\vartheta,\nu_\vartheta)\in\operatorname{dom}g$: $\operatorname{dom}g$ lồi (Định nghĩa 01.17), và $-g$ thỏa định nghĩa hàm lồi trên tập lồi này. $\square$
:::

Hàm $g$ là cận dưới đúng từng điểm của họ hàm affine $\{L(x,\cdot,\cdot)\mid x\in D\}$, họ này có thể vô hạn. Mệnh đề 03.6 mở rộng Định lý 01.30(c) (cực đại từng điểm của hữu hạn hàm lồi là lồi) sang họ tùy ý các hàm affine, ở dạng hàm lõm (Boyd và Vandenberghe (2004), §5.1.2, tr. 216). Với bài toán (3.1), Mệnh đề 03.6 khớp với phép tính trực tiếp $g''(\lambda)=-\frac{18}{(1+\lambda)^3}<0$ trên $(-1,\infty)$.

::: remark Nhận xét 03.7 (Ba nhầm lẫn khi tính hàm đối ngẫu)
1. **Thay cận dưới đúng bằng giá trị nhỏ nhất.** Với bài toán $\min e^x$ trên $\mathbb R$ không có ràng buộc, $g=\inf_xe^x=0$ dù không có $x$ đạt $0$. Viết "$g$ không xác định vì không có cực tiểu" là sai.
2. **Áp lại ràng buộc khi lấy cận dưới đúng.** Với bài toán (3.1) và $\lambda=1$, cực tiểu của $L(\cdot,1)$ trên $[2,4]$ là $5$ tại $x=2$, khác $g(1)=4{,}5$. Con số $5$ vẫn không vượt $p^*$, nhưng nó là giá trị của một bài toán có ràng buộc khác, và tính nó cần giải lại bài toán có ràng buộc.
3. **Đồng nhất "lõm" với "dễ tính".** Mệnh đề 03.6 cho cấu trúc của bài toán chọn nhân tử, còn mỗi giá trị $g(\lambda,\nu)$ là một bài toán cực tiểu trên $D$. Với $D=\{0,1\}^n$ và $L$ có dạng $\sum_j\sigma_jx_j$ cộng hằng số, cực tiểu tách theo từng biến và bằng hằng số cộng $\sum_j\min(0,\sigma_j)$; khi $L$ chứa tích $x_ix_j$, việc tính cực tiểu trên $\{0,1\}^n$ bằng liệt kê cần xét $2^n$ điểm.
:::

### 5.3. Đối ngẫu yếu

Ở Ví dụ 03.2, ta chứng minh riêng từng cận. Định lý sau cho biết mọi giá trị của $g$ tại nhân tử có $\lambda\ge0$ đều là cận dưới, và chỉ rõ bước dùng dấu của nhân tử.

::: theorem Định lý 03.8 (Đối ngẫu yếu, weak duality) — chứng minh đầy đủ
**Giả thiết.** Bài toán (1.1) với $D$ và $f_0,\ldots,f_m$ bất kỳ; $\lambda\in\mathbb R^m$ với $\lambda\ge0$; $\nu\in\mathbb R^p$ bất kỳ.

**Kết luận.** Với mọi $x$ khả thi,

$$
\begin{aligned}
g(\lambda,\nu)&\le L(x,\lambda,\nu)\\
&\le f_0(x),
\end{aligned}
\tag{5.3}
$$

do đó $g(\lambda,\nu)\le p^*$. Khi $g(\lambda,\nu)>-\infty$, số $g(\lambda,\nu)$ là một cận dưới của bài toán theo Định nghĩa 03.1.
:::

::: proof Chứng minh Định lý 03.8
**Lộ trình.** Bất đẳng thức thứ nhất của (5.3) là tính chất của cận dưới đúng trên $D\supseteq C$; bất đẳng thức thứ hai dùng tính khả thi và dấu nhân tử. Lấy $x\in C$.

**Bước 1 (bất đẳng thức thứ nhất).** Theo Định nghĩa 03.5, $g(\lambda,\nu)$ là cận dưới đúng của $L(\cdot,\lambda,\nu)$ trên $D$, nên không vượt giá trị tại điểm $x\in C\subseteq D$.

**Bước 2 (bất đẳng thức thứ hai).** Vì $x$ khả thi, $f_i(x)\le0$ với mọi $i$; vì $\lambda_i\ge0$, mỗi tích $\lambda_if_i(x)\le0$. Đây là chỗ duy nhất dùng giả thiết $\lambda\ge0$. Vì $Ax=b$, $\nu^T(Ax-b)=0$ với mọi $\nu$. Cộng lại, $L(x,\lambda,\nu)=f_0(x)+\sum_i\lambda_if_i(x)\le f_0(x)$.

**Bước 3 (kết luận về $p^*$).** Theo (5.3), $g(\lambda,\nu)$ không vượt $f_0(x)$ với mọi $x\in C$, nên là một cận dưới của $\{f_0(x)\mid x\in C\}$ và không vượt cận dưới lớn nhất $p^*$ (Định nghĩa 01.9). Nếu $C=\varnothing$, $p^*=+\infty$ và bất đẳng thức đúng vì $g(\lambda,\nu)<+\infty$. $\square$
:::

Kết quả không cần tính lồi, tính khả vi hay sự tồn tại nghiệm. Khi tập khả thi rỗng, $p^*=+\infty$ và kết luận không cho thông tin. Nếu bỏ giả thiết $\lambda\ge0$ thì Bước 2 không còn đúng. Với bài toán (3.1) và $\lambda=-\tfrac12\in\operatorname{dom}g$, giá trị $g(-\tfrac12)=10+\tfrac12-18=-7{,}5$ không vượt $5$, nhưng tại điểm khả thi $x=3$ ta có $L(3,-\tfrac12)=10+\tfrac12=10{,}5>f_0(3)=10$, nên bất đẳng thức thứ hai của (5.3) sai.

Trong học máy, đối ngẫu yếu là cơ sở của *nới lỏng Lagrange* (Lagrangian relaxation) cho các bài toán chọn rời rạc, như chọn tập dữ liệu để gán nhãn (Tình huống 02.3): tập khả thi rời rạc không lồi, nhưng $g$ vẫn là cận dưới và bài toán chọn nhân tử vẫn lõm. Khi một thuật toán tạo ở mỗi lần lặp một phương án khả thi $x^{(k)}$ và một nhân tử khả thi đối ngẫu $(\lambda^{(k)},\nu^{(k)})$, hiệu $f_0(x^{(k)})-g(\lambda^{(k)},\nu^{(k)})$ chặn trên sai số tối ưu (Mệnh đề 03.2(a)) và dùng làm điều kiện dừng (Boyd và Vandenberghe (2004), §5.5.1, tr. 241–242).

### 5.4. Bài toán đối ngẫu

Mỗi $(\lambda,\nu)$ với $\lambda\ge0$ cho một cận dưới, và ta cần cận lớn nhất trong số đó. Ở Ví dụ 03.3, $g(0)=1$, $g(1)=4{,}5$, $g(2)=5$. Chọn nhân tử tối ưu là cực đại $g$ trên tập $\lambda\ge0$, theo định nghĩa sau.

::: definition Định nghĩa 03.9 (Bài toán đối ngẫu)
Cho bài toán (1.1) với hàm đối ngẫu $g$. *Bài toán đối ngẫu Lagrange* (Lagrange dual problem) là

$$
\begin{aligned}
\underset{\lambda\in\mathbb R^m,\ \nu\in\mathbb R^p}{\operatorname{maximize}}\quad&g(\lambda,\nu)\\
\text{subject to}\quad&\lambda\ge0 .
\end{aligned}
\tag{5.4}
$$

Cặp $(\lambda,\nu)$ là *khả thi đối ngẫu* (dual feasible) nếu $\lambda\ge0$ và $(\lambda,\nu)\in\operatorname{dom}g$. *Giá trị tối ưu đối ngẫu* là $d^*=\sup\{g(\lambda,\nu)\mid\lambda\ge0\}$, với quy ước $d^*=-\infty$ khi không có cặp khả thi đối ngẫu. Một cặp khả thi đối ngẫu $(\lambda^*,\nu^*)$ với $g(\lambda^*,\nu^*)=d^*$ là một *nghiệm đối ngẫu* (dual optimal); khi có nghiệm như vậy, ta nói bài toán đối ngẫu đạt nghiệm.
:::

Bài toán (5.4) có biến là nhân tử, mục tiêu là hàm đối ngẫu, và ràng buộc duy nhất là dấu của $\lambda$. Theo Mệnh đề 03.6, đó là bài toán cực đại một hàm lõm trên tập lồi $\{\lambda\ge0\}\cap\operatorname{dom}g$, tương đương với cực tiểu hàm lồi $-g$ trên một tập lồi, kể cả khi bài toán gốc không lồi.

Lấy cận trên đúng theo nhân tử ở vế trái của (5.3), ta được ngay hệ quả sau.

::: corollary Hệ quả 03.10 (Đối ngẫu yếu cho giá trị tối ưu; chứng nhận từ một cặp) — chứng minh đầy đủ
**Giả thiết.** Bài toán (1.1) và bài toán đối ngẫu (5.4).

**Kết luận.**

- (a) $d^*\le p^*$.
- (b) Nếu $x$ khả thi và $(\lambda,\nu)$ khả thi đối ngẫu thì $g(\lambda,\nu)\le d^*\le p^*\le f_0(x)$, nên $p^*$ và $d^*$ cùng nằm trong đoạn $[g(\lambda,\nu),f_0(x)]$.
- (c) Nếu thêm $f_0(x)=g(\lambda,\nu)$ thì $x$ là nghiệm của bài toán gốc, $(\lambda,\nu)$ là nghiệm đối ngẫu và $p^*=d^*$.
:::

::: proof Chứng minh Hệ quả 03.10
**Lộ trình.** Lấy cận trên đúng của bất đẳng thức $g\le p^*$ theo nhân tử, rồi đọc chuỗi khi hai đầu bằng nhau.

**Bước 1 (phần (a)).** Theo Định lý 03.8, $g(\lambda,\nu)\le p^*$ với mọi $\lambda\ge0$, nên $p^*$ là một cận trên của tập $\{g(\lambda,\nu)\mid\lambda\ge0\}$ và không nhỏ hơn cận trên nhỏ nhất $d^*$.

**Bước 2 (phần (b)).** Bất đẳng thức $g(\lambda,\nu)\le d^*$ là định nghĩa cận trên đúng, $d^*\le p^*$ là phần (a), và $p^*\le f_0(x)$ vì $x$ khả thi.

**Bước 3 (phần (c)).** Khi hai đầu của chuỗi (b) bằng nhau, mọi bất đẳng thức trong chuỗi là đẳng thức: $f_0(x)=p^*$ nên $x$ là nghiệm, và $g(\lambda,\nu)=d^*$ nên $(\lambda,\nu)$ là nghiệm đối ngẫu. $\square$
:::

Phần (c) là Mệnh đề 03.2(b) với cận dưới $\ell=g(\lambda,\nu)$, cộng thêm một kết luận về phía đối ngẫu: một cặp có $f_0(x)=g(\lambda,\nu)$ chứng nhận đồng thời cả hai phía. Theo phần (b), độ dài $f_0(x)-g(\lambda,\nu)$ của đoạn chặn cả sai số tối ưu của $x$ lẫn hiệu $p^*-d^*$.

::: example Ví dụ 03.4 (Bài toán đối ngẫu của (3.1))
**Dữ kiện.** Bài toán (3.1), với $g(\lambda)=10-\lambda-\frac9{1+\lambda}$ trên $\lambda>-1$ (Ví dụ 03.3) và $x^*=2$, $p^*=5$ (Ví dụ 03.1).

**Lập bài toán đối ngẫu.** Bài toán đối ngẫu của (3.1) là $\max_{\lambda\ge0}\ 10-\lambda-\frac9{1+\lambda}$.

**Giải.** Đạo hàm $g'(\lambda)=-1+\frac9{(1+\lambda)^2}$ dương khi $(1+\lambda)^2<9$, tức $0\le\lambda<2$, và âm khi $\lambda>2$. Vậy $g$ tăng trên $[0,2]$, giảm trên $[2,\infty)$, và $\lambda^*=2$, $d^*=g(2)=5$.

**Chứng nhận.** Điểm $x=2$ khả thi với $f_0(2)=5=g(2)$. Theo Hệ quả 03.10(c), $x^*=2$ là nghiệm của bài toán gốc, $\lambda^*=2$ là nghiệm đối ngẫu và $p^*=d^*=5$.

**Kiểm tra lại.** Từ (5.3) với $\lambda=2$, $x=2$: $L(2,2)=4+1+2\cdot0=5$, nên cả hai bất đẳng thức của (5.3) là đẳng thức. Với $\lambda=3$: $g(3)=4{,}75<5$, đúng với tính chất cực đại tại $\lambda=2$.
:::

![Đồ thị hàm đối ngẫu g theo lambda không âm. Đường cong đi lên từ g(0) bằng 1, đạt đỉnh 5 tại lambda bằng 2 rồi đi xuống. Một đường nằm ngang ở mức 5 ghi p sao. Điểm ứng với lambda bằng 1 cho g bằng 4,5 được đánh dấu như một cận lỏng.](img/lec-03/dual-bound.svg)

Mọi điểm của đồ thị $g$ nằm dưới đường ngang $p^*=5$, đúng với Định lý 03.8, và $g$ đạt giá trị $5$ tại đúng một nhân tử. Hệ quả 03.10 không bảo đảm có nhân tử như vậy.

Để thấy quan hệ giữa đối ngẫu và chứng nhận của Bài 02, ta tính bài toán đối ngẫu của một quy hoạch tuyến tính, theo Boyd và Vandenberghe (2004), §5.1.5, tr. 218–219 (dạng chuẩn) và §5.2.1, tr. 225 (dạng bất đẳng thức). Mệnh đề sau dùng Định nghĩa 03.5 và câu hỏi ôn nhanh thứ ba: hàm affine $x\mapsto\bar c^Tx+\beta_0$ trên $\mathbb R^n$ bị chặn dưới khi và chỉ khi $\bar c=0$.

::: proposition Mệnh đề 03.11 (Đối ngẫu của quy hoạch tuyến tính) — chứng minh đầy đủ
**Giả thiết.** Quy hoạch tuyến tính $\min_{x\in\mathbb R^n}c^Tx$ với các ràng buộc $\beta_i-a_i^Tx\le0$, $i=1,\ldots,m$, trong đó $a_i\in\mathbb R^n$, $\beta_i\in\mathbb R$; đặt $\beta=(\beta_1,\ldots,\beta_m)$. Mọi ràng buộc, kể cả $x_j\ge0$, được viết dưới dạng này, và $D=\mathbb R^n$.

**Kết luận.** Hàm đối ngẫu nhận hai loại giá trị:

- nếu $\sum_{i=1}^m\lambda_ia_i=c$ thì $g(\lambda)=\beta^T\lambda$;
- ngược lại, $g(\lambda)=-\infty$.

Bài toán đối ngẫu là quy hoạch tuyến tính

$$
\begin{aligned}
&\underset{\lambda}{\operatorname{maximize}}\quad\beta^T\lambda\\
&\text{subject to}\\
&\quad\textstyle\sum_{i=1}^m\lambda_ia_i=c,\quad\lambda\ge0 .
\end{aligned}
$$

Một nhân tử khả thi đối ngẫu chính là một bộ hệ số $\mu$ của Mệnh đề 02.11, và Định lý 03.8 cho lại Mệnh đề 02.11(a).
:::

::: proof Chứng minh Mệnh đề 03.11
**Lộ trình.** Viết $L$ thành hằng số cộng một hàm tuyến tính của $x$, rồi dùng tính chất hàm affine bị chặn dưới khi và chỉ khi phần tuyến tính bằng $0$.

**Bước 1 (gom số hạng).** Đặt $\bar c=c-\sum_i\lambda_ia_i$. Theo (5.1), gom các số hạng chứa $x$:

$$
\begin{aligned}
L(x,\lambda)&=c^Tx\\
&\quad+\textstyle\sum_i\lambda_i(\beta_i-a_i^Tx)\\
&=\beta^T\lambda+\bar c^Tx .
\end{aligned}
$$

**Bước 2 (hai trường hợp).** Nếu $\bar c=0$, $L(\cdot,\lambda)$ là hằng số $\beta^T\lambda$, nên $g(\lambda)=\beta^T\lambda$. Nếu $\bar c\ne0$, chọn $x=-s\bar c$ với $s>0$:

$$
\begin{aligned}
L(-s\bar c,\lambda)&=\beta^T\lambda-s\lVert\bar c\rVert_2^2\\
&\to-\infty\quad(s\to\infty),
\end{aligned}
$$

nên $g(\lambda)=-\infty$ theo Định nghĩa 03.5.

**Bước 3 (bài toán đối ngẫu và Mệnh đề 02.11).** Bài toán (5.4) chỉ có ý nghĩa trên $\operatorname{dom}g$, nên điều kiện $\bar c=0$ trở thành ràng buộc của bài toán đối ngẫu. Với $\lambda\ge0$ thỏa $\sum_i\lambda_ia_i=c$, Định lý 03.8 cho $c^Tx\ge g(\lambda)=\sum_i\lambda_i\beta_i$ với mọi $x$ khả thi, là Mệnh đề 02.11(a) với $\mu=\lambda$. $\square$
:::

Mệnh đề 03.11 trả lời câu hỏi thứ nhất mà Bài 02 để lại: các hệ số $\mu$ của Mệnh đề 02.11 là các điểm khả thi của một quy hoạch tuyến tính khác, và nghiệm của quy hoạch đó cho cận lớn nhất.

::: example Ví dụ 03.5 (Đối ngẫu của bài toán pha trộn)
**Dữ kiện.** Bài toán pha trộn của Ví dụ 02.6, có nghiệm ở Ví dụ 02.8: $\min3x_1+2x_2$ với $2x_1+x_2\ge4$, $x_1+2x_2\ge5$, $x_1\ge0$, $x_2\ge0$; chi phí tính theo đơn vị $10$ nghìn đồng.

**Lập bài toán đối ngẫu.** Viết bốn ràng buộc ở dạng của Mệnh đề 03.11:

- $a_1=(2,1)$, $\beta_1=4$;
- $a_2=(1,2)$, $\beta_2=5$;
- $a_3=(1,0)$, $\beta_3=0$;
- $a_4=(0,1)$, $\beta_4=0$.

Điều kiện $\sum_i\lambda_ia_i=c=(3,2)$ là $2\lambda_1+\lambda_2+\lambda_3=3$ và $\lambda_1+2\lambda_2+\lambda_4=2$. Vì $\lambda_3=3-2\lambda_1-\lambda_2\ge0$ và $\lambda_4=2-\lambda_1-2\lambda_2\ge0$, bài toán đối ngẫu là

$$
\begin{aligned}
&\underset{\lambda_1,\lambda_2}{\operatorname{maximize}}\quad4\lambda_1+5\lambda_2\\
&\text{subject to}\\
&\quad2\lambda_1+\lambda_2\le3,\\
&\quad\lambda_1+2\lambda_2\le2,\\
&\quad\lambda_1,\lambda_2\ge0 .
\end{aligned}
$$

**Giải.** Thử điểm mà hai ràng buộc đầu thỏa với dấu bằng: hệ $2\lambda_1+\lambda_2=3$, $\lambda_1+2\lambda_2=2$ cho $\lambda_1=\tfrac43$, $\lambda_2=\tfrac13$, giá trị $\tfrac{16}3+\tfrac53=7$.

**Chứng nhận.** Điểm gốc $(1,2)$ khả thi với chi phí $3+4=7$. Theo Hệ quả 03.10(c), $x^*=(1,2)$, $\lambda^*=(\tfrac43,\tfrac13,0,0)$ và $p^*=d^*=7$.

**Kiểm tra lại.** $\lambda_3=3-\tfrac83-\tfrac13=0$ và $\lambda_4=2-\tfrac43-\tfrac23=0$, không âm. Đây đúng là bộ hệ số $\mu$ của Ví dụ 02.8. Một điểm khả thi đối ngẫu khác, $\lambda=(0,1,2,0)$, cho $g=5\le7$, đúng với Định lý 03.8.
:::

::: example Ví dụ 03.6 (Bài toán hai chiều: hai nhân tử)
**Dữ kiện.** Bài toán $\min_{x\in\mathbb R^2}\tfrac12(x_1^2+x_2^2)$ với $f_1(x)=1-x_1\le0$ và $f_2(x)=2-x_2\le0$.

**Lập hàm Lagrange.** Theo (5.1),

$$
\begin{aligned}
&L(x,\lambda)=\tfrac12(x_1^2+x_2^2)\\
&\quad+\lambda_1(1-x_1)+\lambda_2(2-x_2)\\
&\ =\tfrac12(x_1-\lambda_1)^2+\tfrac12(x_2-\lambda_2)^2\\
&\quad+\lambda_1+2\lambda_2-\tfrac12(\lambda_1^2+\lambda_2^2),
\end{aligned}
$$

trong đó đẳng thức thứ hai hoàn thành bình phương riêng cho từng biến: $\tfrac12x_1^2-\lambda_1x_1=\tfrac12(x_1-\lambda_1)^2-\tfrac12\lambda_1^2$.

**Tính hàm đối ngẫu.** Hai bình phương đồng thời bằng $0$ tại $x=(\lambda_1,\lambda_2)$, nên

$$
\begin{aligned}
&g(\lambda_1,\lambda_2)\\
&\quad=\lambda_1+2\lambda_2-\tfrac12(\lambda_1^2+\lambda_2^2)\\
&\quad=\tfrac52-\tfrac12(\lambda_1-1)^2\\
&\qquad-\tfrac12(\lambda_2-2)^2.
\end{aligned}
$$

**Giải và chứng nhận.** Biểu thức cuối không vượt $\tfrac52$ và bằng $\tfrac52$ tại $\lambda^*=(1,2)\ge0$, nên $d^*=\tfrac52$. Điểm $x=(1,2)$ khả thi với $f_0=\tfrac12(1+4)=\tfrac52$; Hệ quả 03.10(c) cho $x^*=(1,2)$, $p^*=d^*=\tfrac52$.

**Kiểm tra lại.** Khai triển $\tfrac52-\tfrac12[(\lambda_1-1)^2+(\lambda_2-2)^2]=\tfrac52-\tfrac12\lambda_1^2+\lambda_1-\tfrac12-\tfrac12\lambda_2^2+2\lambda_2-2$, bằng biểu thức trước đó. Một nhân tử chung $\lambda_1=\lambda_2=s$ cho $g=3s-s^2$, lớn nhất $\tfrac94<\tfrac52$ tại $s=\tfrac32$, nên một hệ số chung không đủ.
:::

::: exercise Bài tập 03.2 (Đối ngẫu của bài toán hàm tuyến tính trên hình tròn)
Xét bài toán của Bài tập 02.6: $\min_{x\in\mathbb R^2}x_1+x_2$ với $f_1(x)=x_1^2+x_2^2-2\le0$.

- (a) Lập $L(x,\lambda)$ và tính $g(\lambda)$ với mọi $\lambda\in\mathbb R$; xác định $\operatorname{dom}g$.
- (b) Giải bài toán đối ngẫu.
- (c) Tìm một điểm khả thi đạt cận và kết luận bằng Hệ quả 03.10.
:::

::: hint
Với $\lambda>0$, $L$ tách thành tổng hai hàm một biến dạng $x_i+\lambda x_i^2$, mỗi hàm có cực tiểu tại $x_i=-\frac1{2\lambda}$. Với $\lambda=0$, $L=x_1+x_2$ affine; với $\lambda<0$, hệ số bậc hai âm.
:::

::: solution
**Câu (a).** $L=x_1+x_2+\lambda(x_1^2+x_2^2-2)$. Với $\lambda>0$, mỗi số hạng $x_i+\lambda x_i^2=\lambda(x_i+\frac1{2\lambda})^2-\frac1{4\lambda}$ có cận dưới đúng $-\frac1{4\lambda}$, nên $g(\lambda)=-\frac1{2\lambda}-2\lambda$. Với $\lambda=0$, $L=x_1+x_2$ không bị chặn dưới, $g(0)=-\infty$. Với $\lambda<0$, $L\to-\infty$ khi $x_1\to\infty$. Vậy $\operatorname{dom}g=(0,\infty)$.

**Câu (b).** $g'(\lambda)=\frac1{2\lambda^2}-2=0$ khi $\lambda^2=\frac14$, tức $\lambda^*=\frac12$ trên $(0,\infty)$; $g'>0$ trước và $g'<0$ sau, nên $d^*=g(\tfrac12)=-1-1=-2$.

**Câu (c).** Điểm cực tiểu của $L(\cdot,\tfrac12)$ là $x=(-1,-1)$, có $f_1=1+1-2=0\le0$, khả thi, và $f_0=-2=g(\tfrac12)$. Theo Hệ quả 03.10(c), $x^*=(-1,-1)$, $p^*=d^*=-2$.

**Kiểm tra lại.** Kết quả khớp nghiệm $x^*=(-1,-1)$, $p^*=-2$ của Bài tập 02.6, tìm bằng điều kiện bậc nhất.
:::

::: exercise Bài tập 03.3 (Đối ngẫu của một quy hoạch tuyến tính hai biến)
Xét quy hoạch tuyến tính $\min x_1+2x_2$ với $x_1+x_2\ge2$, $x_1\ge0$, $x_2\ge0$.

- (a) Dùng Mệnh đề 03.11 viết bài toán đối ngẫu.
- (b) Giải bài toán đối ngẫu và tìm điểm gốc chứng nhận.
- (c) Xác định nhân tử nào bằng $0$, và ràng buộc tương ứng có xảy ra dấu bằng tại nghiệm không.
:::

::: hint
Ba ràng buộc dạng $\beta_i-a_i^Tx\le0$ có $a_1=(1,1)$, $\beta_1=2$, $a_2=(1,0)$, $a_3=(0,1)$, $\beta_2=\beta_3=0$. Điều kiện $\sum_i\lambda_ia_i=c$ cho hai phương trình.
:::

::: solution
**Câu (a).** $g(\lambda)=2\lambda_1$ khi $\lambda_1+\lambda_2=1$, $\lambda_1+\lambda_3=2$, và $-\infty$ trong trường hợp khác. Khử $\lambda_2=1-\lambda_1\ge0$, $\lambda_3=2-\lambda_1\ge0$: bài toán đối ngẫu là $\max2\lambda_1$ với $0\le\lambda_1\le1$.

**Câu (b).** $\lambda_1^*=1$, nên $\lambda^*=(1,0,1)$ và $d^*=2$. Điểm $x=(2,0)$ khả thi với $f_0=2$. Theo Hệ quả 03.10(c), $x^*=(2,0)$ và $p^*=d^*=2$.

**Câu (c).** $\lambda_2^*=0$ ứng với $x_1\ge0$, còn dư tại $x^*$ ($x_1^*=2>0$). Hai nhân tử dương ứng với $x_1+x_2\ge2$ và $x_2\ge0$, cả hai xảy ra dấu bằng tại $x^*$.

**Kiểm tra lại.** Mọi điểm khả thi có $x_1+2x_2=(x_1+x_2)+x_2\ge2+0$, đúng là tổ hợp với hệ số $\lambda_1^*=1$, $\lambda_3^*=1$.
:::

Mọi ví dụ trên có $p^*=d^*$, còn đối ngẫu yếu chỉ bảo đảm $d^*\le p^*$.

## 6. Đối ngẫu mạnh và điều kiện Slater

Bài toán chọn gói của Bài 02 (Ví dụ 02.27), viết với miền rời rạc $D=\{0,1\}^3$, có $p^*=4$, và ví dụ sau tính được $d^*=3$. Do đó, mọi nhân tử chỉ chứng nhận được rằng chi phí ít nhất là $3$. Chúng ta cần một điều kiện kiểm tra được trên dữ liệu của bài toán, trước khi giải, bảo đảm $d^*=p^*$ và có một nhân tử đạt cận đó.

### 6.1. Bài toán có khoảng đối ngẫu dương

::: example Ví dụ 03.7 (Khoảng đối ngẫu dương: bài toán chọn gói)
**Dữ kiện.** Bài toán của Ví dụ 02.27: $\min2(x_1+x_2+x_3)$ trên $D=\{0,1\}^3$ với ba ràng buộc phủ:

- ngày khô: $1-x_1-x_3\le0$;
- đêm khô: $1-x_1-x_2\le0$;
- trời mưa: $1-x_2-x_3\le0$.

Ví dụ 02.27 đã liệt kê tám phương án và cho $p^*=4$. Điều kiện nhị phân nằm trong miền $D$ và không nhận nhân tử.

**Hàm Lagrange.** Theo (5.1), gom theo từng biến:

$$
\begin{aligned}
L(x,\lambda)={}&\lambda_1+\lambda_2+\lambda_3\\
&+\sigma_1x_1+\sigma_2x_2+\sigma_3x_3
\end{aligned}
$$

với $\sigma_1=2-\lambda_1-\lambda_2$, $\sigma_2=2-\lambda_2-\lambda_3$, $\sigma_3=2-\lambda_1-\lambda_3$: hệ số của $x_1$ gồm $2$ từ mục tiêu, $-\lambda_1$ từ ràng buộc ngày khô và $-\lambda_2$ từ ràng buộc đêm khô, tương tự cho $x_2$, $x_3$.

**Hàm đối ngẫu.** $L$ tách theo từng biến, và $\min_{x_j\in\{0,1\}}\sigma_jx_j=\min(0,\sigma_j)$. Vì vậy

$$
\begin{aligned}
g(\lambda)={}&\lambda_1+\lambda_2+\lambda_3\\
&+\textstyle\sum_{j=1}^3\min(0,\sigma_j).
\end{aligned}
$$

**Giá trị đối ngẫu.** Với mọi số thực $\sigma$, $\min(0,\sigma)\le\tfrac\sigma2$: nếu $\sigma\ge0$ thì $0\le\tfrac\sigma2$, nếu $\sigma<0$ thì $\sigma<\tfrac\sigma2$. Do đó, với mọi $\lambda$,

$$
\begin{aligned}
g(\lambda)&\le\lambda_1+\lambda_2+\lambda_3\\
&\ +\tfrac12(\sigma_1+\sigma_2+\sigma_3)\\
&=\lambda_1+\lambda_2+\lambda_3\\
&\ +\tfrac12\bigl(6-2(\lambda_1+\lambda_2+\lambda_3)\bigr)\\
&=3 .
\end{aligned}
$$

Đẳng thức thứ nhất dùng $\sigma_1+\sigma_2+\sigma_3=6-2(\lambda_1+\lambda_2+\lambda_3)$, vì mỗi $\lambda_i$ xuất hiện trong đúng hai hệ số. Tại $\lambda=(1,1,1)$, $\sigma_1=\sigma_2=\sigma_3=0$ và $g=3$. Vậy $d^*=3<p^*=4$.

**Kiểm tra lại.** Con số $3$ trùng với giá trị của nới lỏng tuyến tính ở Ví dụ 02.28. Tại $\lambda=(1,1,1)$, $L(x,\lambda)=3$ với mọi $x\in\{0,1\}^3$, trong đó có ba nghiệm $(1,1,0)$, $(1,0,1)$, $(0,1,1)$ với chi phí $4$; không phương án khả thi nào có chi phí $3$, nên không cặp nào có $f_0(x)=g(\lambda)$.
:::

Trong Ví dụ 03.7, tập $D$ không lồi và hai giá trị tối ưu khác nhau. Sự bằng nhau của hai giá trị này, cùng độ chênh giữa chúng, được đặt tên theo định nghĩa sau.

::: definition Định nghĩa 03.12 (Đối ngẫu mạnh và khoảng đối ngẫu)
Cho bài toán (1.1) với giá trị tối ưu $p^*$ và bài toán đối ngẫu (5.4) với giá trị tối ưu $d^*$.

- Khi $p^*$ và $d^*$ hữu hạn, hiệu $p^*-d^*\ge0$ gọi là *khoảng đối ngẫu tối ưu* (optimal duality gap).
- Bài toán có *đối ngẫu mạnh* (strong duality) nếu $d^*=p^*$.
- Với một điểm khả thi $x$ và một cặp khả thi đối ngẫu $(\lambda,\nu)$, hiệu $f_0(x)-g(\lambda,\nu)\ge0$ gọi là *khoảng đối ngẫu của cặp* (duality gap).
:::

Khoảng đối ngẫu của cặp là khoảng chứng nhận của Định nghĩa 03.1 với $\ell=g(\lambda,\nu)$. Nó phụ thuộc vào phương án và nhân tử đang có, và không nhỏ hơn khoảng tối ưu, vì $f_0(x)-g(\lambda,\nu)\ge p^*-d^*$ theo Hệ quả 03.10(b). Theo Boyd và Vandenberghe (2004), §5.2.3, tr. 226, đối ngẫu mạnh nghĩa là cận tốt nhất lấy từ hàm đối ngẫu là cận khít. Với bài toán (3.1), cặp $(x,\lambda)=(2,1)$ có khoảng $5-4{,}5=0{,}5$, còn khoảng tối ưu bằng $0$.

Ví dụ 03.7 có miền rời rạc, nên tính không lồi có thể là nguyên nhân của khoảng dương. Ví dụ sau là một bài toán lồi có khoảng đối ngẫu dương.

::: example Ví dụ 03.8 (Bài toán lồi có khoảng đối ngẫu dương)
**Dữ kiện.** Miền $D=\{(x,y)\in\mathbb R^2\mid y>0\}$; bài toán $\min e^{-x}$ với $f_1(x,y)=\frac{x^2}y\le0$.

**Tính lồi.** $D$ là nửa mặt phẳng mở, lồi. Hàm $e^{-x}$ có đạo hàm bậc hai $e^{-x}>0$, nên lồi. Hàm $\frac{x^2}y$ có Hessian

$$
\begin{aligned}
&\frac2{y^3}\begin{pmatrix}y^2&-xy\\-xy&x^2\end{pmatrix}\\
&\quad=\frac2{y^3}\begin{pmatrix}y\\-x\end{pmatrix}\begin{pmatrix}y&-x\end{pmatrix}\succeq0
\end{aligned}
$$

trên $D$, nên lồi theo Định lý 01.29. Bài toán ở dạng phổ biến (Định nghĩa 02.1).

**Giá trị gốc.** Vì $y>0$, $\frac{x^2}y\le0$ khi và chỉ khi $x=0$. Tập khả thi là $\{(0,y)\mid y>0\}$ và $p^*=e^0=1$.

**Giá trị đối ngẫu.** Với $\lambda\ge0$, $L=e^{-x}+\lambda\frac{x^2}y\ge0$ trên $D$. Chọn $x=s$, $y=s^3$ với $s>0$: $L=e^{-s}+\frac\lambda s\to0$ khi $s\to\infty$. Vậy $g(\lambda)=0$ với mọi $\lambda\ge0$, và $d^*=0<1=p^*$.

**Kiểm tra lại.** Với $\lambda=1$ và $s=10$, điểm $(10,1000)\in D$ cho $L=e^{-10}+0{,}1\approx0{,}10005$, nhỏ hơn mọi giá trị $f_0=1$ trên tập khả thi.
:::

### 6.2. Độ dư tại một điểm

Trong bài toán (3.1), ta viết lại ràng buộc thành $f_1(x)=(x-3)^2-1\le0$, với cùng tập khả thi $[2,4]$ vì $(x-2)(x-4)=(x-3)^2-1$. Tại $\bar x=3$, $f_1(3)=-1<0$, tức ràng buộc còn dư một đơn vị. Mọi điểm gần $3$ cũng làm ràng buộc âm: nếu $\lvert x-3\rvert\le0{,}5$ thì $f_1(x)\le0{,}25-1=-0{,}75<0$. Bài toán $\min x_1+x_2$ với $x_1^2+x_2^2\le0$ thì khác: tập khả thi chỉ gồm gốc tọa độ, và không điểm nào làm ràng buộc âm.

![Trục số với đoạn khả thi từ 2 đến 4 được tô. Điểm dư 3 nằm giữa đoạn; một dải con từ 2,5 đến 3,5 quanh điểm 3 được tô đậm hơn, ghi chú rằng mọi điểm trong dải vẫn làm (x trừ 3) bình phương trừ 1 âm. Nghiệm tối ưu 2 nằm ở biên trái của đoạn, khác điểm dư.](img/lec-03/slater-interior-note.svg)

Trên trục số, điểm dư $\bar x=3$ và nghiệm $x^*=2$ là hai điểm khác nhau: $f_0(3)=10$, $f_0(2)=5$, và nghiệm nằm trên biên, nơi ràng buộc không còn dư. Điểm dư dùng để kiểm tra một giả thiết về ràng buộc.

### 6.3. Điều kiện Slater

Một cách trực quan, khi tập khả thi có một điểm mà mọi bất đẳng thức đều còn dư, nhiễu nhỏ trên ràng buộc không làm tập khả thi trở thành rỗng. Để làm rõ điều kiện này, xem định nghĩa sau.

::: definition Định nghĩa 03.13 (Điều kiện Slater và dạng yếu)
Cho bài toán (1.1) ở dạng phổ biến (Định nghĩa 02.1) với $D=\mathbb R^n$. Bài toán thỏa *điều kiện Slater* (Slater's condition) nếu tồn tại $\bar x\in\mathbb R^n$ với

$$
\begin{aligned}
&f_i(\bar x)<0,\ \ i=1,\ldots,m,\\
&A\bar x=b .
\end{aligned}
\tag{6.1}
$$

Điểm $\bar x$ gọi là *điểm Slater*, hay *điểm khả thi ngặt* (strictly feasible point). Khi các $f_i$ với $i$ thuộc một tập chỉ số $\mathcal I$ là hàm affine, bài toán thỏa *dạng yếu* của điều kiện Slater (refined Slater condition) nếu tồn tại $\bar x$ với $f_i(\bar x)\le0$ cho $i\in\mathcal I$, $f_i(\bar x)<0$ cho $i\notin\mathcal I$ và $A\bar x=b$.
:::

Điều kiện (6.1) đòi một điểm làm mọi bất đẳng thức âm cùng lúc; mỗi bất đẳng thức âm tại một điểm riêng chưa đủ, vì các tập $\{x\mid f_i(x)<0\}$ có thể không giao nhau. Đẳng thức không cần độ dư. Dạng yếu bỏ yêu cầu độ dư cho các bất đẳng thức affine, nên khi mọi ràng buộc đều affine, dạng yếu chỉ đòi bài toán khả thi. Với miền $D$ mở, điểm Slater được tìm trong $D$ (Boyd và Vandenberghe (2004), §5.2.3, tr. 226); bài toán của Ví dụ 03.8 không có điểm như vậy, vì không điểm nào của $D$ có $\frac{x^2}y<0$.

Điều kiện Slater là một *điều kiện chính quy của ràng buộc* (constraint qualification). Điều kiện này chỉ đặt lên các hàm ràng buộc và được kiểm tra bằng cách chỉ ra một điểm.

Để chứng minh định lý Slater, chúng ta cần phép tách hai tập lồi rời nhau bằng một siêu phẳng, gọi là *siêu phẳng tách* (separating hyperplane). Về mặt ý tưởng, trong $\mathbb R$, hai đoạn rời nhau $[1,2]$ và $[-2,0]$ được tách bởi điểm $\tfrac12$: $\zeta\ge\tfrac12\ge\zeta'$ với mọi $\zeta\in[1,2]$, $\zeta'\in[-2,0]$. Trong $\mathbb R^k$, điểm tách được thay bằng siêu phẳng $\{x\mid q^Tx=\gamma\}$ với pháp tuyến $q\ne0$. Bổ đề sau chỉ cần dạng yếu của phép tách, với bất đẳng thức không chặt.

::: lemma Bổ đề 03.14 (Tách hai tập lồi, dạng yếu) — chứng minh đầy đủ ở Phụ lục A
**Giả thiết.** $\mathcal S_1,\mathcal S_2\subseteq\mathbb R^k$, $k\ge1$, là hai tập lồi, không rỗng, rời nhau.

**Kết luận.** Tồn tại $q\in\mathbb R^k$, $q\ne0$, và $\gamma\in\mathbb R$ sao cho

$$
\begin{aligned}
q^T\zeta&\ge\gamma\quad\forall\zeta\in\mathcal S_1,\\
q^T\zeta'&\le\gamma\quad\forall\zeta'\in\mathcal S_2 .
\end{aligned}
$$
:::

Đây là định lý siêu phẳng tách của Boyd và Vandenberghe (2004), §2.5.1, tr. 46–49; giáo trình chứng minh trường hợp hai tập có khoảng cách dương đạt được, và để trường hợp tổng quát thành Bài tập 2.22 (tr. 63).

Bất đẳng thức $q^T\zeta\ge\gamma$ trên tập thứ nhất có đúng dạng của một cận dưới; định lý Slater dùng nó để sinh ra nhân tử.

Định lý sau trả lời câu hỏi khi nào $d^*=p^*$ và có nhân tử đạt cận, theo cấu trúc chứng minh của Boyd và Vandenberghe (2004), §5.3.2, tr. 234–236.

::: theorem Định lý 03.15 (Định lý Slater) — chứng minh phần (a); phần (b) ngoài phạm vi học phần, phát biểu ở Boyd và Vandenberghe (2004), §5.2.3, tr. 226–227, chứng minh được dẫn ở tr. 272
**Giả thiết.** Bài toán (1.1) ở dạng phổ biến (Định nghĩa 02.1) với $D=\mathbb R^n$: các hàm $f_0,f_1,\ldots,f_m:\mathbb R^n\to\mathbb R$ lồi, ràng buộc đẳng thức $Ax=b$; giá trị tối ưu $p^*$ hữu hạn.

**Kết luận.**

- (a) Nếu bài toán thỏa điều kiện Slater (6.1) thì $d^*=p^*$ và bài toán đối ngẫu đạt nghiệm: có $\lambda^*\ge0$, $\nu^*$ với $g(\lambda^*,\nu^*)=p^*$.
- (b) Kết luận của (a) vẫn đúng nếu chỉ thỏa dạng yếu của điều kiện Slater.
:::

::: proof Chứng minh Định lý 03.15(a)
**Lộ trình.** Tách tập các bộ mức (ràng buộc, đẳng thức, mục tiêu) đạt được khỏi nửa đường thẳng nằm dưới $(0,0,p^*)$ bằng Bổ đề 03.14, dùng điểm Slater để chứng minh siêu phẳng tách không thẳng đứng, rồi chia cho hệ số của mục tiêu để được nhân tử.

**Chuẩn bị (rút gọn hệ đẳng thức).** Vì $A\bar x=b$, hệ $Ax=b$ có nghiệm. Giữ một tập tối đại các hàng độc lập tuyến tính của $A$ cùng các tọa độ tương ứng của $b$; mỗi hàng bỏ đi là tổ hợp tuyến tính của các hàng giữ lại, và vì hệ có nghiệm, tọa độ tương ứng của $b$ là cùng tổ hợp đó của các tọa độ giữ lại, nên tập khả thi không đổi. Trong chứng minh, $A\in\mathbb R^{p\times n}$ ký hiệu ma trận đã rút gọn, có các hàng độc lập tuyến tính.

**Bước 1 (hai tập lồi rời nhau).** Xét trong $\mathbb R^m\times\mathbb R^p\times\mathbb R$ hai tập

$$
\begin{aligned}
\mathcal A=\{&(u,v,t)\mid\exists x\in\mathbb R^n:\\
&f(x)\le u,\ Ax-b=v,\\
&f_0(x)\le t\},\\
\mathcal B=\{&(0,0,t)\mid t<p^*\}.
\end{aligned}
$$

Tập $\mathcal A$ gồm các bộ mức mà một điểm $x$ đáp ứng được. $\mathcal A$ không rỗng (chứa $(f(x),Ax-b,f_0(x))$ với mọi $x$) và lồi: lấy $(u_1,v_1,t_1)$, $(u_2,v_2,t_2)$ trong $\mathcal A$ với các điểm $x_1$, $x_2$, và $\vartheta\in[0,1]$; đặt $x_\vartheta=\vartheta x_1+(1-\vartheta)x_2$. Tính lồi của từng $f_i$ cho $f_i(x_\vartheta)\le\vartheta f_i(x_1)+(1-\vartheta)f_i(x_2)\le\vartheta u_{1,i}+(1-\vartheta)u_{2,i}$; tương tự $f_0(x_\vartheta)\le\vartheta t_1+(1-\vartheta)t_2$; tính affine cho $Ax_\vartheta-b=\vartheta v_1+(1-\vartheta)v_2$. Vậy tổ hợp lồi của hai bộ thuộc $\mathcal A$ với điểm $x_\vartheta$. $\mathcal B$ là một nửa đường thẳng mở, không rỗng (vì $p^*$ hữu hạn) và lồi. Hai tập rời nhau: một điểm chung $(0,0,t)$ cho $x$ với $f(x)\le0$, $Ax=b$, $f_0(x)\le t<p^*$, tức một điểm khả thi có giá trị nhỏ hơn $p^*$, trái với định nghĩa cận dưới đúng.

**Bước 2 (áp dụng bổ đề tách).** Bổ đề 03.14 trong $\mathbb R^{m+p+1}$ cho $(\tilde\lambda,\tilde\nu,\kappa)\ne0$ và $\gamma$ với

$$
\begin{aligned}
&\tilde\lambda^Tu+\tilde\nu^Tv+\kappa t\ge\gamma\\
&\qquad\forall(u,v,t)\in\mathcal A,\\
&\kappa t\le\gamma\quad\forall t<p^*.
\end{aligned}
$$

Nếu một $(u,v,t)\in\mathcal A$ thì mọi $(u',v,t')$ với $u'\ge u$, $t'\ge t$ cũng thuộc $\mathcal A$ (cùng điểm $x$). Nếu $\tilde\lambda_i<0$, tăng riêng $u_i$ làm vế trái tiến tới $-\infty$, trái với cận $\gamma$; vậy $\tilde\lambda\ge0$. Tương tự, tăng $t$ cho $\kappa\ge0$. Cho $t\to p^*$ từ dưới trong bất đẳng thức thứ hai: $\kappa p^*\le\gamma$. Thay điểm $(f(x),Ax-b,f_0(x))\in\mathcal A$:

$$
\begin{aligned}
&\textstyle\sum_{i=1}^m\tilde\lambda_if_i(x)\\
&\quad+\tilde\nu^T(Ax-b)\\
&\quad+\kappa f_0(x)\\
&\quad\ge\kappa p^*\ \ \forall x\in\mathbb R^n .
\end{aligned}
\tag{6.2}
$$

**Bước 3 (điều kiện Slater buộc $\kappa>0$).** Giả sử $\kappa=0$. Thay $x=\bar x$ vào (6.2): $A\bar x=b$ nên $\sum_i\tilde\lambda_if_i(\bar x)\ge0$. Mỗi số hạng $\tilde\lambda_if_i(\bar x)\le0$ vì $\tilde\lambda_i\ge0$, $f_i(\bar x)<0$; nếu có $\tilde\lambda_j>0$ thì số hạng thứ $j$ âm và tổng âm, mâu thuẫn. Vậy $\tilde\lambda=0$. Đây là chỗ dùng bất đẳng thức ngặt $f_i(\bar x)<0$: với $f_i(\bar x)=0$, số hạng bằng $0$ dù $\tilde\lambda_i>0$. Khi $\tilde\lambda=0$ và $\kappa=0$, (6.2) thành $\tilde\nu^T(Ax-b)\ge0$ với mọi $x$. Chọn $x=\bar x-A^T\tilde\nu$: $\tilde\nu^T(A\bar x-b-AA^T\tilde\nu)=-\lVert A^T\tilde\nu\rVert_2^2\ge0$, nên $A^T\tilde\nu=0$, và vì các hàng của $A$ độc lập tuyến tính, $\tilde\nu=0$. Khi đó $(\tilde\lambda,\tilde\nu,\kappa)=0$, trái với Bước 2. Vậy $\kappa>0$.

**Bước 4 (dựng nhân tử).** Đặt $\lambda^*=\tilde\lambda/\kappa\ge0$, $\nu^*=\tilde\nu/\kappa$. Chia (6.2) cho $\kappa>0$: $L(x,\lambda^*,\nu^*)\ge p^*$ với mọi $x$, nên $g(\lambda^*,\nu^*)\ge p^*$ theo Định nghĩa 03.5. Cùng với Hệ quả 03.10(b),

$$
\begin{aligned}
p^*&\le g(\lambda^*,\nu^*)\\
&\le d^*\\
&\le p^* .
\end{aligned}
$$

Dòng đầu vừa chứng minh, dòng thứ hai là định nghĩa của $d^*$, dòng thứ ba là đối ngẫu yếu. Hai đầu bằng nhau, nên mọi dấu là đẳng thức: $d^*=p^*$ và $(\lambda^*,\nu^*)$ là nghiệm đối ngẫu. Với hệ đẳng thức ban đầu, gán nhân tử $0$ cho các hàng đã bỏ; hàm Lagrange không đổi. $\square$
:::

Ví dụ 03.7 vi phạm tính lồi và có khoảng $1$; Ví dụ 03.8, với $D$ mở, không có điểm Slater trong $D$ theo nghĩa của Boyd và Vandenberghe (2004), §5.2.3, tr. 226, và có khoảng $1$. Với quy hoạch tuyến tính khả thi có $p^*$ hữu hạn, mọi ràng buộc đều affine, nên phần (b) cho một bộ hệ số $\mu$ của Mệnh đề 02.11 với cận $\sum_i\mu_i\beta_i$ bằng $p^*$; đó là câu trả lời cho câu hỏi thứ hai mà Bài 02 để lại.

::: example Ví dụ 03.9 (Kiểm tra điều kiện Slater cho hai bài toán đã giải)
**Dữ kiện.** Bài toán (3.1): $f_0(x)=x^2+1$, $f_1(x)=(x-2)(x-4)$, với $p^*=5$, $\lambda^*=2$ (Ví dụ 03.1, 03.4); bài toán hai chiều của Ví dụ 03.6, $\min\tfrac12(x_1^2+x_2^2)$ với $1-x_1\le0$, $2-x_2\le0$, có $p^*=\tfrac52$.

**Bài toán (3.1).** $f_0''(x)=2>0$ và $f_1''(x)=2>0$, nên hai hàm lồi trên $\mathbb R$ (Định lý 01.29). Điểm $\bar x=3$ cho $f_1(3)=1\cdot(-1)=-1<0$. Giá trị $p^*=5$ hữu hạn. Định lý 03.15(a) cho $d^*=5$ và có $\lambda^*$; Ví dụ 03.4 đã tìm được $\lambda^*=2$.

**Bài toán hai chiều.** Mục tiêu có Hessian $I\succ0$, hai ràng buộc affine. Điểm $\bar x=(2,3)$ cho $f_1=1-2=-1<0$ và $f_2=2-3=-1<0$. Mục tiêu không âm, nên $0\le p^*\le f_0(\bar x)=\tfrac{13}2$: hữu hạn. Định lý cho $d^*=p^*$.

**Kiểm tra lại.** $L(x,2)=3(x-2)^2+5\ge5$ cho $g(2)=5=p^*$; ở bài toán hai chiều, $\tfrac52-\tfrac12(\lambda_1-1)^2-\tfrac12(\lambda_2-2)^2$ đạt $\tfrac52=p^*$ tại $(1,2)$.
:::

### 6.4. Giới hạn của điều kiện Slater

Khi điều kiện Slater không thỏa, bài toán đối ngẫu có thể đạt hoặc không đạt nghiệm.

::: example Ví dụ 03.10 (Thiếu điều kiện Slater: nghiệm đối ngẫu đạt hoặc không đạt)
**Bài toán thứ nhất.** $\min_{x\in\mathbb R^2}x_1+x_2$ với $f_1(x)=x_1^2+x_2^2\le0$. Tập khả thi là $\{(0,0)\}$, nên $p^*=0$; không điểm nào có $f_1<0$, nên điều kiện Slater không thỏa. Với $\lambda=0$, $L=x_1+x_2$ không bị chặn dưới, $g(0)=-\infty$. Với $\lambda>0$, $L=\sum_{i=1}^2\bigl(\lambda(x_i+\frac1{2\lambda})^2-\frac1{4\lambda}\bigr)$, nên $g(\lambda)=-\frac1{2\lambda}$. Khi $\lambda\to\infty$, $g(\lambda)\to0$, nên $d^*=0=p^*$; nhưng $g(\lambda)<0$ với mọi $\lambda$ hữu hạn, nên bài toán đối ngẫu không đạt nghiệm.

**Bài toán thứ hai.** Cùng ràng buộc, mục tiêu $x_1^2+x_2^2$. Vẫn $p^*=0$ và không có điểm Slater. Hàm $L=(1+\lambda)(x_1^2+x_2^2)$ có cận dưới đúng $0$ với mọi $\lambda\ge0$, nên $g\equiv0$ trên $[0,\infty)$, $d^*=0=p^*$ và mọi $\lambda\ge0$ là nghiệm đối ngẫu.

**Kiểm tra lại.** Bài toán thứ nhất: $g(1)=-0{,}5$, $g(100)=-0{,}005$, tăng về $0$. Bài toán thứ hai: tại $\lambda=5$, $L(x,5)=6\lVert x\rVert_2^2\ge0$, bằng $0$ tại gốc.
:::

Ví dụ sau có điểm Slater, và bài toán gốc không đạt nghiệm.

::: example Ví dụ 03.11 (Điều kiện Slater thỏa nhưng bài toán gốc không đạt nghiệm)
**Bài toán và giả thiết.** Bài toán $\min_{x\in\mathbb R}e^x$ với $f_1(x)=x\le0$. Hai hàm lồi, và $\bar x=-1$ cho $f_1=-1<0$. Giá trị $p^*=\inf_{x\le0}e^x=0$ hữu hạn nhưng không đạt, vì $e^x>0$.

**Hàm đối ngẫu.** $g(0)=\inf_xe^x=0$. Với $\lambda>0$, $e^x+\lambda x\to-\infty$ khi $x\to-\infty$, nên $g(\lambda)=-\infty$.

**Kết luận.** $d^*=0=p^*$ và $\lambda^*=0$ là nghiệm đối ngẫu, như Định lý 03.15(a) bảo đảm, còn bài toán gốc không có nghiệm.

**Kiểm tra lại.** $\operatorname{dom}g\cap[0,\infty)=\{0\}$, nên bài toán đối ngẫu chỉ có một điểm khả thi, và giá trị tại đó bằng $p^*$.
:::

::: remark Nhận xét 03.16 (Ba mệnh đề cần tách biệt)
Ba mệnh đề "$d^*=p^*$", "bài toán đối ngẫu đạt nghiệm" và "bài toán gốc đạt nghiệm" phải được tách biệt, vì đối ngẫu mạnh không kéo theo một trong hai mệnh đề còn lại:

- Ví dụ 03.10, bài toán thứ nhất, có mệnh đề thứ nhất và thứ ba mà không có mệnh đề thứ hai;
- Ví dụ 03.11 có mệnh đề thứ nhất và thứ hai mà không có mệnh đề thứ ba.

Chứng nhận tối ưu theo Hệ quả 03.10(c) cần cả ba. Nhầm lẫn thường gặp là đọc "đối ngẫu mạnh" thành "có nhân tử chứng nhận nghiệm".
:::

::: remark Nhận xét 03.17 (Khi bỏ giả thiết: cách viết ràng buộc và tính lồi)
**Cách viết quyết định điều kiện Slater.** Viết ràng buộc $x_1^2+x_2^2\le0$ của Ví dụ 03.10 thành hai đẳng thức affine $x_1=0$, $x_2=0$ cho một biến đổi tương đương theo Định nghĩa 02.5. Cách viết mới thỏa điều kiện Slater, vì đẳng thức không cần độ dư. Với nó, $L=x_1+x_2+\nu_1x_1+\nu_2x_2$, và $\nu=(-1,-1)$ cho $g=0=p^*$, đạt.

**Đối ngẫu mạnh không đòi tính lồi.** Bài toán $\min-x^2$ với $x^2-1\le0$ không lồi, có $p^*=-1$; $L=(\lambda-1)x^2-\lambda$ cho $g(\lambda)=-\lambda$ khi $\lambda\ge1$ và $-\infty$ khi $\lambda<1$, nên $d^*=g(1)=-1=p^*$. Bài toán có mục tiêu bậc hai và một ràng buộc bất đẳng thức bậc hai có đối ngẫu mạnh khi thỏa điều kiện Slater (Boyd và Vandenberghe (2004), §5.2.4, tr. 229); bài toán trên có điểm Slater $x=0$.
:::

Trong học máy, hồi quy có ràng buộc chuẩn $\lVert w\rVert_2^2\le\tau$ với $\tau>0$ có điểm Slater $w=0$, nên Định lý 03.15 áp dụng khi mục tiêu lồi. Khi hàm ràng buộc không lồi theo $w$, chẳng hạn khi ràng buộc đặt trên đầu ra của một mạng sâu, giả thiết của Định lý 03.15 bị vi phạm. Định lý 03.8 vẫn đúng, nhưng tính $g(\lambda)$ đòi cực tiểu toàn cục của $L(\cdot,\lambda)$ theo $w$; một bộ tối ưu lặp chỉ cho một điểm $w^{(k)}$ với $L(w^{(k)},\lambda)\ge g(\lambda)$, tức một ước lượng trên của $g(\lambda)$.

::: exercise Bài tập 03.4 (Kiểm tra điều kiện Slater cho ba bài toán)
Với mỗi bài toán sau, xác định bài toán có ở dạng phổ biến không, có thỏa điều kiện Slater (6.1) không, có thỏa dạng yếu không, và Định lý 03.15 kết luận được gì.

- (a) $\min x_1^2+x_2^2$ với $1-x_1-x_2\le0$ và $x_1-x_2=0$.
- (b) $\min x_1$ với $x_1+x_2\le0$ và $-x_1-x_2\le0$.
- (c) $\min x$ với $x^3\le0$, $x\in\mathbb R$.
:::

::: hint
Với (b), cộng hai ràng buộc. Với (c), xét dấu của đạo hàm bậc hai của $x^3$.
:::

::: solution
**Câu (a).** Mục tiêu lồi, ràng buộc affine: dạng phổ biến. Điểm $\bar x=(1,1)$ cho $1-2=-1<0$ và $1-1=0$. Điều kiện Slater thỏa; $p^*\ge0$ hữu hạn, nên $d^*=p^*$ và bài toán đối ngẫu đạt nghiệm.

**Câu (b).** Hai ràng buộc cho $x_1+x_2=0$, nên không điểm nào làm cả hai âm: (6.1) không thỏa. Mọi ràng buộc affine và bài toán khả thi, nên dạng yếu thỏa. Trên tập khả thi $\{(s,-s)\}$, mục tiêu $x_1=s$ không bị chặn dưới, $p^*=-\infty$; Định lý 03.15 không áp dụng, và đối ngẫu yếu cho $d^*=-\infty$.

**Câu (c).** $(x^3)''=6x$ âm khi $x<0$, nên $x^3$ không lồi: bài toán không ở dạng phổ biến dù tập khả thi $(-\infty,0]$ lồi, và Định lý 03.15 không áp dụng. Ở đây $p^*=-\infty$. Viết lại ràng buộc thành $x\le0$ cho dạng phổ biến, và điều kiện Slater thỏa với $\bar x=-1$, nhưng $p^*=-\infty$ vẫn chặn kết luận.

**Kiểm tra lại.** Ở (a), giải trực tiếp: $x_1=x_2=s$ với $2s\ge1$, mục tiêu $2s^2$ nhỏ nhất tại $s=\tfrac12$, $p^*=\tfrac12$, hữu hạn.
:::

::: exercise Bài tập 03.5 (Hai hình tròn tiếp xúc)
Xét $\min_{x\in\mathbb R^2}x_1$ với $f_1(x)=(x_1-1)^2+x_2^2-1\le0$ và $f_2(x)=(x_1+1)^2+x_2^2-1\le0$.

- (a) Tìm tập khả thi, $p^*$, và chứng minh điều kiện Slater không thỏa.
- (b) Tính $g(\lambda_1,\lambda_2)$ khi $\lambda_1+\lambda_2>0$.
- (c) Chứng minh $d^*=p^*$ và bài toán đối ngẫu đạt nghiệm, rồi rút ra kết luận về chiều ngược của Định lý 03.15.
:::

::: hint
Hai hình tròn đóng bán kính $1$, tâm $(1,0)$ và $(-1,0)$, chỉ chung một điểm. Khai triển $L$ và gom theo $x_1$, $x_2$.
:::

::: solution
**Câu (a).** Điểm khả thi nằm trong cả hai hình tròn; khoảng cách giữa hai tâm bằng $2$, tổng hai bán kính, nên giao chỉ gồm $(0,0)$: cộng hai ràng buộc cho $2x_1^2+2x_2^2\le0$. Vậy $p^*=0$. Một điểm Slater thỏa $f_1<0$ và $f_2<0$; cộng lại được $2x_1^2+2x_2^2<0$, vô lý.

**Câu (b).** Khai triển hai ràng buộc; các hằng số $\lambda_1(1-1)$ và $\lambda_2(1-1)$ triệt tiêu:

$$
\begin{aligned}
L={}&x_1+(\lambda_1+\lambda_2)(x_1^2+x_2^2)\\
&+2(\lambda_2-\lambda_1)x_1 .
\end{aligned}
$$

Với $\lambda_1+\lambda_2>0$, cực tiểu theo $x_2$ tại $0$ và theo $x_1$ tại $x_1=-\frac{1+2(\lambda_2-\lambda_1)}{2(\lambda_1+\lambda_2)}$. Thay vào:

$$
g(\lambda)=-\frac{(1+2\lambda_2-2\lambda_1)^2}{4(\lambda_1+\lambda_2)} .
$$

**Câu (c).** $g\le0=p^*$ khi $\lambda_1+\lambda_2>0$, và $g(\tfrac12,0)=-\frac{(1-1)^2}{2}=0$. Vậy $d^*=0=p^*$, đạt tại $\lambda=(\tfrac12,0)$. Điều kiện Slater không thỏa mà đối ngẫu mạnh vẫn đúng và bài toán đối ngẫu đạt nghiệm: điều kiện Slater là điều kiện đủ, không là điều kiện cần.

**Kiểm tra lại.** Tại $\lambda=(\tfrac12,0)$, $L=x_1+\tfrac12(x_1^2+x_2^2)-x_1=\tfrac12\lVert x\rVert_2^2\ge0$, bằng $0$ tại $(0,0)$, đúng điểm khả thi duy nhất.
:::

Trong chứng minh Định lý 03.15, nhân tử là hệ số của siêu phẳng tách. Để thấy quan hệ này, xét tập $\mathcal A$ trên mặt phẳng giá trị.

## 7. Hình học của đối ngẫu

Với bài toán (3.1), có một ràng buộc và không có đẳng thức, tập $\mathcal A$ của chứng minh Định lý 03.15 nằm trong mặt phẳng và vẽ được.

### 7.1. Ảnh của phương án trên mặt phẳng giá trị

Hàm Lagrange $L(x,\lambda)=f_0(x)+\lambda f_1(x)$ chỉ phụ thuộc vào $x$ qua hai số, mức ràng buộc $u=f_1(x)$ và mức mục tiêu $t=f_0(x)$. Nếu biểu diễn mỗi phương án $x$ bằng điểm $(u,t)$ thì hàm Lagrange và hàm đối ngẫu trở thành đại lượng hình học trên mặt phẳng $(u,t)$. Bảng sau ghi năm phương án của bài toán (3.1), với $u=(x-2)(x-4)$ và $t=x^2+1$.

| $x$ | $u=f_1(x)$ | $t=f_0(x)$ | Khả thi |
|---|---|---|---|
| $0$ | $8$ | $1$ | không |
| $1{,}5$ | $1{,}25$ | $3{,}25$ | không |
| $2$ | $0$ | $5$ | có |
| $3$ | $-1$ | $10$ | có |
| $4$ | $0$ | $17$ | có |

Một phương án khả thi khi và chỉ khi điểm của nó có $u\le0$, nên $p^*=\min\{t\mid(u,t)=(f_1(x),f_0(x)),\ u\le0\}=5$, đạt tại $(0,5)$ (Ví dụ 03.1). Về mặt hình học, bài toán gốc là tìm điểm thấp nhất của đường cong trong nửa mặt phẳng $u\le0$, còn mỗi giá trị $L=t+\lambda u$ là tung độ gốc (giao điểm với trục $u=0$) của đường thẳng có độ dốc $-\lambda$ đi qua điểm $(u,t)$.

![Mặt phẳng với trục ngang u bằng f1(x) và trục đứng t bằng f0(x). Đường cong G là một parabol mở theo hướng chéo lên phải, là tập các điểm (f1(x), f0(x)) khi x chạy trên trục số. Các điểm ứng với x bằng 2, 3, 4 lần lượt là (0, 5), (âm 1, 10), (0, 17), nằm ở nửa mặt phẳng u không dương, được tô nền là vùng khả thi. Điểm ứng với x bằng 0 là (8, 1), nằm ở nửa mặt phẳng u dương.](img/lec-03/value-plane-mapping.svg)

Đường cong $G$ là ảnh của trục số qua ánh xạ $x\mapsto(f_1(x),f_0(x))$; phần của $G$ trong vùng tô nền ứng với đoạn khả thi $[2,4]$, đi từ $(0,5)$ qua $(-1,10)$ tới $(0,17)$. Cùng hoành độ $u=0$ có hai điểm $(0,5)$ và $(0,17)$, và trung điểm $(0,11)$ của chúng không thuộc $G$, vì $u=0$ chỉ xảy ra tại $x=2$ và $x=4$. Do đó, $G$ không lồi dù bài toán (3.1) lồi.

### 7.2. Tập giá trị, tập trên và hàm đối ngẫu

Với bài toán (1.1) tổng quát, ta ghi mỗi phương án thành một bộ gồm các mức ràng buộc và mức mục tiêu theo định nghĩa sau.

::: definition Định nghĩa 03.18 (Tập giá trị và tập trên)
Cho bài toán (1.1). *Tập giá trị* (set of values) của bài toán là

$$
\begin{aligned}
G=\{&(f(x),\,Ax-b,\,f_0(x))\\
&\mid x\in D\}\\
\subseteq{}&\mathbb R^m\times\mathbb R^p\times\mathbb R .
\end{aligned}
$$

*Tập trên* của bài toán là

$$
\begin{aligned}
\mathcal A=\{&(u,v,t)\mid\exists x\in D:\\
&f(x)\le u,\ Ax-b=v,\\
&f_0(x)\le t\}.
\end{aligned}
$$

Một điểm của các tập này viết là $(u,v,t)$, với $u\in\mathbb R^m$ là mức ràng buộc bất đẳng thức, $v\in\mathbb R^p$ là mức ràng buộc đẳng thức và $t\in\mathbb R$ là mức mục tiêu.
:::

Tập $\mathcal A$ thêm vào $G$ mọi bộ kém hơn một bộ của $G$: nếu $(u,v,t)\in G$ thì $(u',v,t')\in\mathcal A$ với mọi $u'\ge u$, $t'\ge t$; do đó $G\subseteq\mathcal A$. Với $D=\mathbb R^n$, $\mathcal A$ là tập dùng trong chứng minh Định lý 03.15; trong mặt phẳng của bài toán (3.1), $\mathcal A$ là phần nằm bên phải và phía trên đường cong $G$. Chẳng hạn, điểm $(8,1)$ thuộc $G$, còn điểm $(9,2)$ thuộc $\mathcal A$ mà không thuộc $G$. Nhầm lẫn thường gặp là coi $\mathcal A$ chứa nửa mặt phẳng $u\le0$; điểm $(-2,5)$ có $u\le0$ mà không thuộc $\mathcal A$, vì mọi $x$ có $f_1(x)\ge-1>-2$.

Mệnh đề sau dịch giá trị tối ưu và hàm đối ngẫu sang ngôn ngữ của hai tập này, theo Boyd và Vandenberghe (2004), §5.3.1, tr. 232–234.

::: proposition Mệnh đề 03.19 (Bài toán gốc và hàm đối ngẫu trên mặt phẳng giá trị) — chứng minh đầy đủ
**Giả thiết.** Bài toán (1.1) với $D$ và các hàm bất kỳ; $\lambda\ge0$, $\nu\in\mathbb R^p$.

**Kết luận.**

1. $p^*=\inf\{t\mid(0,0,t)\in\mathcal A\}$.
2. $g(\lambda,\nu)=\inf\{\lambda^Tu+\nu^Tv+t\mid(u,v,t)\in G\}=\inf\{\lambda^Tu+\nu^Tv+t\mid(u,v,t)\in\mathcal A\}$.
3. Khi $g(\lambda,\nu)$ hữu hạn, siêu phẳng $\{(u,v,t)\mid\lambda^Tu+\nu^Tv+t=g(\lambda,\nu)\}$ để toàn bộ $\mathcal A$ ở phía $\lambda^Tu+\nu^Tv+t\ge g(\lambda,\nu)$ và cắt trục $u=0$, $v=0$ tại $t=g(\lambda,\nu)$.
4. Nếu bài toán ở dạng phổ biến với $D=\mathbb R^n$ thì $\mathcal A$ lồi.
:::

::: proof Chứng minh Mệnh đề 03.19
**Lộ trình.** Đọc định nghĩa của $p^*$ và $g$ trên các điểm của $G$, rồi dùng $\lambda\ge0$ để chuyển cận dưới đúng từ $G$ sang $\mathcal A$.

**Bước 1 (giá trị tối ưu).** Điểm $(0,0,t)$ thuộc $\mathcal A$ khi và chỉ khi có $x\in D$ với $f(x)\le0$, $Ax=b$ và $f_0(x)\le t$, tức có một điểm khả thi với giá trị không vượt $t$. Cận dưới đúng của tập các $t$ như vậy bằng cận dưới đúng của $\{f_0(x)\mid x\in C\}$, tức $p^*$.

**Bước 2 (hàm đối ngẫu trên $G$).** Mỗi điểm của $G$ có dạng $(f(x),Ax-b,f_0(x))$, và tại điểm đó $\lambda^Tu+\nu^Tv+t=L(x,\lambda,\nu)$ theo (5.1). Lấy cận dưới đúng theo $x\in D$ cho đẳng thức thứ nhất của phần 2, theo Định nghĩa 03.5.

**Bước 3 (hàm đối ngẫu trên $\mathcal A$).** Vì $G\subseteq\mathcal A$, cận dưới đúng trên $\mathcal A$ không vượt cận dưới đúng trên $G$. Ngược lại, lấy $(u,v,t)\in\mathcal A$ với điểm $x$ tương ứng. Vì $\lambda\ge0$ và $u\ge f(x)$, ta có $\lambda^Tu\ge\lambda^Tf(x)$; cùng với $v=Ax-b$ và $t\ge f_0(x)$,

$$
\begin{aligned}
&\lambda^Tu+\nu^Tv+t\\
&\quad\ge\lambda^Tf(x)+\nu^T(Ax-b)\\
&\qquad+f_0(x)\\
&\quad=L(x,\lambda,\nu)\\
&\quad\ge g(\lambda,\nu).
\end{aligned}
$$

Bất đẳng thức thứ nhất dùng ba quan hệ vừa nêu, đẳng thức là (5.1), bất đẳng thức cuối là Định nghĩa 03.5. Do đó cận dưới đúng trên $\mathcal A$ không nhỏ hơn $g(\lambda,\nu)$, và hai cận dưới đúng bằng nhau.

**Bước 4 (siêu phẳng).** Phần 2 cho $\lambda^Tu+\nu^Tv+t\ge g(\lambda,\nu)$ với mọi điểm của $\mathcal A$, là khẳng định thứ nhất của phần 3. Thay $u=0$, $v=0$ vào phương trình siêu phẳng cho $t=g(\lambda,\nu)$.

**Bước 5 (tính lồi của $\mathcal A$).** Đây là Bước 1 của chứng minh Định lý 03.15, chỉ dùng tính lồi của các $f_i$ và tính affine của $Ax-b$. $\square$
:::

Theo phần 2, tính $g(\lambda,\nu)$ là cực tiểu hàm tuyến tính $(\lambda,\nu,1)^T(u,v,t)$ trên tập giá trị. Với một ràng buộc và $\lambda\ge0$ cố định, $g(\lambda)=\inf_{(u,t)\in G}(t+\lambda u)$. Khi $g(\lambda)$ hữu hạn, đường thẳng $t=g(\lambda)-\lambda u$ gọi là *đường cận* ứng với nhân tử $\lambda$: đó là đường cao nhất có độ dốc $-\lambda$ vẫn nằm không cao hơn mọi điểm của $G$, và tung độ gốc của nó là $g(\lambda)$. Khi cận dưới đúng của $L(\cdot,\lambda)$ đạt, đường cận tiếp xúc với $G$ và là một *đường đỡ* (supporting line) của $G$, trường hợp $m=1$, $p=0$ của *siêu phẳng đỡ* (supporting hyperplane) trong Boyd và Vandenberghe (2004), §5.3.1, tr. 232.

Đối ngẫu yếu đọc được trên hình: mọi điểm khả thi có $u\le0$, nên với $\lambda\ge0$, tung độ của nó thỏa $t\ge g(\lambda)-\lambda u\ge g(\lambda)$.

::: example Ví dụ 03.12 (Hai đường cận của bài toán (3.1))
**Dữ kiện.** Bài toán (3.1): $f_0(x)=x^2+1$, $f_1(x)=(x-2)(x-4)$, với tập giá trị $G=\{(f_1(x),f_0(x))\mid x\in\mathbb R\}$; $g(1)=4{,}5$ đạt tại $x=1{,}5$ và $g(2)=5$ đạt tại $x=2$ (Ví dụ 03.3); $f_0(x)+2f_1(x)=3(x-2)^2+5$ (Ví dụ 03.2).

**Đường với $\lambda=1$.** Đường cận là $t=4{,}5-u$. Điểm tiếp xúc ứng với điểm đạt $x(1)=1{,}5$:

$$
\begin{aligned}
(u,t)&=(f_1(1{,}5),\,f_0(1{,}5))\\
&=(1{,}25;\ 3{,}25).
\end{aligned}
$$

Điểm này có $u>0$, không khả thi. Mọi điểm khả thi của $G$ vẫn nằm trên đường: chẳng hạn $(0,5)$ cho $5\ge4{,}5$ và $(-1,10)$ cho $10\ge5{,}5$.

**Đường với $\lambda=2$.** Đường cận là $t=5-2u$. Trên $G$, $t+2u-5=f_0(x)+2f_1(x)-5$, và theo đẳng thức của Ví dụ 03.2,

$$
t+2u-5=3(x-2)^2\ge0,
$$

nên đường nằm dưới $G$ và chỉ tiếp xúc tại $x=2$, tức điểm $(0,5)$. Điểm tiếp xúc khả thi và có tung độ bằng tung độ gốc.

**Diễn giải.** Đường $\lambda=1$ cho cận lỏng: tung độ gốc $4{,}5<5$, và điểm tiếp xúc $(1{,}25;\,3{,}25)$ không khả thi. Đường $\lambda=2$ tiếp xúc với $G$ đúng tại điểm thấp nhất của phần khả thi, nằm trên trục $u=0$; đó là hình ảnh của chứng nhận trong Ví dụ 03.4.

**Kiểm tra lại.** Tại $(1{,}25;\,3{,}25)$: $3{,}25+1{,}25=4{,}5$, nên điểm nằm trên đường thứ nhất. Tại $x=3$, điểm $(-1,10)$ cho $10+2\cdot(-1)-5=3=3(3-2)^2$.
:::

![Mặt phẳng (u, t) với đường cong G và vùng khả thi u không dương được tô nền. Đường thẳng t bằng 4,5 trừ u cắt trục tung tại 4,5 và tiếp xúc G tại một điểm có u dương, ứng với x bằng 1,5, nằm ngoài vùng khả thi. Điểm (0, 5) của G nằm phía trên đường thẳng.](img/lec-03/value-plane-1.svg)

![Mặt phẳng (u, t) với đường cong G và vùng khả thi u không dương được tô nền. Đường thẳng t bằng 5 trừ 2u có độ dốc âm 2, nằm dưới G và tiếp xúc G đúng tại điểm (0, 5), ứng với x bằng 2, điểm khả thi thấp nhất.](img/lec-03/value-plane-2.svg)

Trên hình thứ nhất, khoảng cách theo chiều đứng từ tung độ gốc $4{,}5$ tới điểm $(0,5)$ là khoảng đối ngẫu $0{,}5$ của cặp $(x,\lambda)=(2,1)$. Trên hình thứ hai, đường $\lambda=2$ tiếp xúc với $G$ tại một điểm của trục tung, dấu hiệu hình học của đối ngẫu mạnh có nghiệm đối ngẫu. Mệnh đề sau phát biểu chính xác điều đó cho tập $\mathcal A$.

::: proposition Mệnh đề 03.20 (Đối ngẫu mạnh có nghiệm đối ngẫu tương đương một siêu phẳng đỡ không thẳng đứng tại $(0,0,p^*)$) — chứng minh đầy đủ
**Giả thiết.** Bài toán (1.1) với $p^*$ hữu hạn.

**Kết luận.** Hai khẳng định sau tương đương.

1. $d^*=p^*$ và bài toán đối ngẫu đạt nghiệm.
2. Có $\lambda\ge0$ và $\nu$ sao cho $\lambda^Tu+\nu^Tv+t\ge p^*$ với mọi $(u,v,t)\in\mathcal A$.

Khi đó $(\lambda,\nu)$ ở khẳng định 2 là một nghiệm đối ngẫu, và siêu phẳng $\lambda^Tu+\nu^Tv+t=p^*$ đi qua $(0,0,p^*)$.
:::

::: proof Chứng minh Mệnh đề 03.20
**Lộ trình.** Mỗi chiều là một lần dùng phần 2 của Mệnh đề 03.19, cùng chuỗi đối ngẫu yếu.

**Bước 1 (từ 1 sang 2).** Gọi $(\lambda^*,\nu^*)$ là nghiệm đối ngẫu, $g(\lambda^*,\nu^*)=d^*=p^*$. Theo Mệnh đề 03.19 phần 2, $\lambda^{*T}u+\nu^{*T}v+t\ge g(\lambda^*,\nu^*)=p^*$ với mọi $(u,v,t)\in\mathcal A$.

**Bước 2 (từ 2 sang 1).** Theo Mệnh đề 03.19 phần 2, khẳng định 2 cho $g(\lambda,\nu)\ge p^*$. Cùng Hệ quả 03.10(b),

$$
\begin{aligned}
p^*&\le g(\lambda,\nu)\\
&\le d^*\\
&\le p^* .
\end{aligned}
$$

Dòng thứ hai là định nghĩa của $d^*$, dòng thứ ba là đối ngẫu yếu. Hai đầu bằng nhau, nên mọi dấu là đẳng thức: $d^*=p^*$ và $(\lambda,\nu)$ đạt $d^*$.

**Bước 3 (siêu phẳng đi qua $(0,0,p^*)$).** Thay $u=0$, $v=0$, $t=p^*$ vào phương trình siêu phẳng cho $p^*=p^*$. $\square$
:::

Siêu phẳng ở khẳng định 2 có hệ số của $t$ bằng $1$, tức không thẳng đứng; một siêu phẳng thẳng đứng (hệ số của $t$ bằng $0$) không cho nhân tử. Bước 3 của chứng minh Định lý 03.15 loại đúng trường hợp hệ số $\kappa$ của $t$ bằng $0$, và Mệnh đề 03.20 cho thấy loại trừ được trường hợp đó là đủ để có nghiệm đối ngẫu.

![Mặt phẳng (u, t). Đường cong G và tập trên A bằng G cộng góc phần tư không âm, tô nhạt, trải sang phải và lên trên. Vùng u không dương ghi khả thi gốc. Điểm (0, p sao) bằng (0, 5) được đánh dấu; đường thẳng t bằng 5 trừ 2u đi qua điểm đó và nằm dưới toàn bộ A. Một mũi tên pháp tuyến (2, 1) xuất phát từ (0, 5), vuông góc với đường thẳng và hướng vào trong A.](img/lec-03/dual-geometry.svg)

Trên hình của tập $\mathcal A$ của bài toán (3.1), pháp tuyến $(2,1)=(\lambda^*,1)$ của đường cận có thành phần thứ hai bằng $1$, đúng dạng của khẳng định 2 trong Mệnh đề 03.20. Tập $\mathcal A$ lồi dù $G$ không lồi, như Mệnh đề 03.19 phần 4 bảo đảm, nên chứng minh Định lý 03.15 tách $\mathcal A$ chứ không tách $G$. Ví dụ sau xét trường hợp không có siêu phẳng đỡ không thẳng đứng nào tại $(0,p^*)$.

::: example Ví dụ 03.13 (Đường cận tại $(0,p^*)$ chỉ có thể thẳng đứng)
**Dữ kiện.** Bài toán thứ nhất của Ví dụ 03.10: $\min x_1+x_2$ với $x_1^2+x_2^2\le0$, có $p^*=0$, $d^*=0$, $g(\lambda)=-\frac1{2\lambda}$ với $\lambda>0$, và không có nghiệm đối ngẫu.

**Tập trên.** Điểm $(u,t)$ thuộc $\mathcal A$ khi có $x$ với $\lVert x\rVert_2^2\le u$ và $x_1+x_2\le t$. Theo Cauchy–Schwarz, $x_1+x_2\ge-\sqrt2\,\lVert x\rVert_2$, với dấu bằng tại $x=-\sqrt{u/2}\,(1,1)$. Do đó

$$
\mathcal A=\{(u,t)\mid u\ge0,\ t\ge-\sqrt{2u}\}.
$$

**Đường cận.** Biên dưới $t=-\sqrt{2u}$ có độ dốc $-\frac1{\sqrt{2u}}$, tiến tới $-\infty$ khi $u\to0^+$. Đường cận với độ dốc $-\lambda$ tiếp xúc với biên tại $u=\frac1{2\lambda^2}$, $t=-\frac1\lambda$, và có tung độ gốc

$$
-\frac1\lambda+\lambda\cdot\frac1{2\lambda^2}=-\frac1{2\lambda},
$$

đúng bằng $g(\lambda)$. Khi $\lambda\to\infty$, điểm tiếp xúc tiến về $(0,0)$ và đường dựng đứng dần. Tại $(0,p^*)=(0,0)$, đường đỡ duy nhất là trục $u=0$, thẳng đứng.

**Diễn giải.** Đối ngẫu mạnh vẫn đúng vì tung độ gốc của các đường cận tiến tới $0$, còn nghiệm đối ngẫu không tồn tại vì đường đỡ tại $(0,0)$ thẳng đứng.

**Kiểm tra lại.** Với $\lambda=1$: điểm tiếp xúc $(\tfrac12,-1)$ thỏa $-1=-\sqrt{2\cdot\tfrac12}$, và tung độ gốc $-1+\tfrac12=-\tfrac12=g(1)$.
:::

::: remark Nhận xét 03.21 (Ba nhầm lẫn khi đọc hình đối ngẫu)
1. **Coi điểm tiếp xúc là ứng viên nghiệm.** Với $\lambda=1$, điểm tiếp xúc không khả thi. Chứng nhận cần điểm tiếp xúc khả thi và có tung độ bằng tung độ gốc.
2. **Quên điều kiện "tung độ bằng tung độ gốc".** Nếu đường cận với $\lambda>0$ tiếp xúc với $G$ tại một điểm khả thi có $u<0$, tung độ $t=g(\lambda)-\lambda u$ lớn hơn $g(\lambda)$, nên cặp tương ứng có khoảng dương. Chứng nhận cần $\lambda u=0$ tại điểm tiếp xúc.
3. **Kết luận tính lồi của bài toán từ hình.** $G$ của bài toán (3.1) không lồi dù bài toán lồi. Điều quyết định là $\mathcal A$ có một siêu phẳng đỡ không thẳng đứng tại $(0,p^*)$ hay không.
:::

### 7.3. Nhân tử như độ nhạy của giá trị tối ưu

Với một mức ràng buộc $u$ cố định, điểm thấp nhất của $\mathcal A$ trên đường thẳng đứng qua $u$ là giá trị tối ưu của bài toán khi ràng buộc được đổi thành $f_1(x)\le u$. Trong ứng dụng, ta cần biết giá trị tối ưu giảm bao nhiêu khi ràng buộc được nới thêm một lượng nhỏ. Để trả lời, ta xét bài toán có ràng buộc được nới theo định nghĩa sau.

::: definition Định nghĩa 03.22 (Bài toán nhiễu và hàm giá trị)
Cho bài toán (1.1). Với $u\in\mathbb R^m$ và $v\in\mathbb R^p$, *bài toán nhiễu* (perturbed problem) là

$$
\begin{aligned}
&\underset{x\in D}{\operatorname{minimize}}\quad f_0(x)\\
&\text{subject to}\\
&\quad f_i(x)\le u_i\ \ \forall i,\\
&\quad Ax-b=v .
\end{aligned}
\tag{7.1}
$$

Giá trị tối ưu của (7.1), ký hiệu $p^*(u,v)\in\mathbb R\cup\{\pm\infty\}$, gọi là *hàm giá trị* (value function); $p^*(0,0)=p^*$.
:::

Thành phần $u_i>0$ nới ràng buộc $i$, còn $u_i<0$ thắt chặt ràng buộc đó. Nới ràng buộc mở rộng tập khả thi, nên theo Mệnh đề 01.15(a), $u\le u'$ kéo theo $p^*(u',v)\le p^*(u,v)$. Theo Định nghĩa 03.18, $p^*(u,v)=\inf\{t\mid(u,v,t)\in\mathcal A\}$, tức đồ thị của hàm giá trị là biên dưới của $\mathcal A$; $p^*(u,v)$ là hàm của mức ràng buộc, còn $g(\lambda,\nu)$ là hàm của nhân tử.

Khi có đối ngẫu mạnh và nghiệm đối ngẫu, giá trị tối ưu của bài toán nhiễu được chặn cho mọi nhiễu theo mệnh đề sau (Boyd và Vandenberghe (2004), §5.6.2, tr. 250).

::: proposition Mệnh đề 03.23 (Bất đẳng thức độ nhạy toàn cục) — chứng minh đầy đủ
**Giả thiết.** Bài toán (1.1) với $p^*$ hữu hạn, $d^*=p^*$, và $(\lambda^*,\nu^*)$ là một nghiệm đối ngẫu.

**Kết luận.** Với mọi $u\in\mathbb R^m$, $v\in\mathbb R^p$,

$$
\begin{aligned}
p^*(u,v)\ge{}&p^*-\lambda^{*T}u\\
&-\nu^{*T}v .
\end{aligned}
\tag{7.2}
$$
:::

::: proof Chứng minh Mệnh đề 03.23
**Lộ trình.** Đánh giá $g(\lambda^*,\nu^*)$ tại một điểm khả thi của bài toán nhiễu, rồi lấy cận dưới đúng theo các điểm đó.

**Bước 1 (bài toán nhiễu không khả thi).** Khi đó $p^*(u,v)=+\infty$ và (7.2) đúng vì vế phải hữu hạn.

**Bước 2 (một điểm khả thi của bài toán nhiễu).** Lấy $x$ khả thi cho (7.1), tức $f_i(x)\le u_i$ và $Ax-b=v$. Khi đó

$$
\begin{aligned}
p^*&=g(\lambda^*,\nu^*)\\
&\le f_0(x)+\textstyle\sum_{i=1}^m\lambda_i^*f_i(x)\\
&\quad+\nu^{*T}(Ax-b)\\
&\le f_0(x)+\lambda^{*T}u+\nu^{*T}v .
\end{aligned}
$$

Dòng đầu là giả thiết $g(\lambda^*,\nu^*)=d^*=p^*$. Bất đẳng thức thứ nhất là định nghĩa cận dưới đúng (Định nghĩa 03.5). Bất đẳng thức thứ hai dùng $\lambda_i^*\ge0$ cùng $f_i(x)\le u_i$, và $Ax-b=v$.

**Bước 3 (lấy cận dưới đúng).** Chuyển vế cho $f_0(x)\ge p^*-\lambda^{*T}u-\nu^{*T}v$ với mọi $x$ khả thi của (7.1). Lấy cận dưới đúng theo các $x$ đó cho (7.2) theo Định nghĩa 01.9. $\square$
:::

Với một ràng buộc, vế phải $p^*-\lambda^*u$ của (7.2) là đường cận qua $(0,p^*)$, và biên dưới của $\mathcal A$ nằm trên đường đó. Xét nhiễu chỉ trên ràng buộc $i$, các nhiễu khác bằng $0$. Bất đẳng thức (7.2) cho hai kết luận:

- thắt chặt ràng buộc $i$ một lượng $\lvert u_i\rvert$, với $u_i<0$, làm giá trị tối ưu tăng ít nhất $\lambda_i^*\lvert u_i\rvert$;
- nới ràng buộc $i$ một lượng $u_i>0$ làm giá trị tối ưu giảm không quá $\lambda_i^*u_i$.

Tốc độ thay đổi tại nhiễu bằng $0$ là nội dung của hệ quả sau, thu được bằng cách chia (7.2) cho nhiễu và lấy giới hạn hai phía khi hàm giá trị khả vi.

::: corollary Hệ quả 03.24 (Độ nhạy địa phương: nhân tử là giá bóng) — chứng minh đầy đủ
**Giả thiết.** Như Mệnh đề 03.23, và thêm: $p^*(u,v)$ khả vi tại $(0,0)$.

**Kết luận.** Với mọi $i$ và $j$,

$$
\begin{aligned}
\lambda_i^*&=-\frac{\partial p^*}{\partial u_i}(0,0),\\
\nu_j^*&=-\frac{\partial p^*}{\partial v_j}(0,0).
\end{aligned}
\tag{7.3}
$$
:::

::: proof Chứng minh Hệ quả 03.24
**Lộ trình.** Chia (7.2) tại nhiễu $\delta e_i$ cho $\delta$, với $\delta>0$ và $\delta<0$, để được hai bất đẳng thức ngược chiều cho đạo hàm riêng.

**Bước 1 (đạo hàm theo $u_i$ không nhỏ hơn $-\lambda_i^*$).** Gọi $e_i$ là vector đơn vị thứ $i$ của $\mathbb R^m$. Với $\delta>0$, (7.2) tại $(\delta e_i,0)$ cho $p^*(\delta e_i,0)-p^*\ge-\lambda_i^*\delta$. Chia cho $\delta>0$ giữ chiều, rồi cho $\delta\to0^+$: $\frac{\partial p^*}{\partial u_i}(0,0)\ge-\lambda_i^*$.

**Bước 2 (đạo hàm theo $u_i$ không lớn hơn $-\lambda_i^*$).** Với $\delta<0$, cùng bất đẳng thức chia cho $\delta<0$ đổi chiều: $\frac{p^*(\delta e_i,0)-p^*}{\delta}\le-\lambda_i^*$. Cho $\delta\to0^-$: $\frac{\partial p^*}{\partial u_i}(0,0)\le-\lambda_i^*$.

**Bước 3 (kết luận).** Hai bước cho đẳng thức thứ nhất của (7.3); đẳng thức thứ hai chứng minh như vậy với $(0,\delta e_j)$, vì (7.2) đúng với mọi dấu của $v$. $\square$
:::

Hệ quả 03.24 cho nhân tử một nghĩa đo được: $\lambda_i^*$ là mức giảm của giá trị tối ưu trên mỗi đơn vị nới ràng buộc $i$, tính tại nhiễu bằng $0$, và cho xấp xỉ $p^*(u,v)\approx p^*-\lambda^{*T}u-\nu^{*T}v$ khi nhiễu nhỏ. Trong kinh tế, đại lượng này gọi là *giá bóng* (shadow price) của ràng buộc (Boyd và Vandenberghe (2004), §5.4.4, tr. 240–241; §5.6.3, tr. 251). Dấu $\lambda_i^*\ge0$ khớp với tính đơn điệu: nới một bất đẳng thức không làm giá trị tối ưu tăng; dịch vế phải của một đẳng thức có thể làm giá trị tối ưu giảm theo một chiều và tăng theo chiều kia, khớp với dấu tùy ý của $\nu_j^*$.

::: example Ví dụ 03.14 (Hàm giá trị của bài toán (3.1))
**Dữ kiện.** Bài toán (3.1), với $p^*=5$, $\lambda^*=2$ (Ví dụ 03.4). Bài toán nhiễu có ràng buộc $(x-2)(x-4)\le u$, tức $(x-3)^2\le1+u$.

**Tính hàm giá trị.** Xét ba trường hợp.

1. Nếu $u<-1$: vế phải âm, không có $x$ khả thi, $p^*(u)=+\infty$.
2. Nếu $-1\le u\le8$: tập khả thi là $[3-\sqrt{1+u},\,3+\sqrt{1+u}]$, có đầu mút trái không âm vì $\sqrt{1+u}\le3$. Mục tiêu $x^2+1$ tăng trên $[0,\infty)$, nên nhỏ nhất tại đầu mút trái: $p^*(u)=(3-\sqrt{1+u})^2+1=11+u-6\sqrt{1+u}$.
3. Nếu $u>8$: tập khả thi chứa $0$, nên $p^*(u)=f_0(0)=1$.

**Kiểm tra bất đẳng thức (7.2).** Với $\lambda^*=2$, cần $p^*(u)\ge5-2u$. Trên $[-1,8]$,

$$
\begin{aligned}
&p^*(u)-(5-2u)\\
&\quad=6+3u-6\sqrt{1+u}\\
&\quad=3\bigl(\sqrt{1+u}-1\bigr)^2\\
&\quad\ge0,
\end{aligned}
$$

trong đó đẳng thức thứ hai dùng $(\sqrt{1+u}-1)^2=2+u-2\sqrt{1+u}$. Với $u>8$, $5-2u<-11<1$.

**Kiểm tra (7.3).** Trên $(-1,8)$, $p^{*\prime}(u)=1-\frac3{\sqrt{1+u}}$, nên $p^{*\prime}(0)=1-3=-2=-\lambda^*$.

**Diễn giải.** Nới ràng buộc một lượng nhỏ $u$ làm giá trị tối ưu giảm khoảng $2u$. Với $u=1$, giá trị thật là $p^*(1)=12-6\sqrt2\approx3{,}5147$, còn xấp xỉ bậc nhất cho $3$; (7.2) vẫn đúng.

**Kiểm tra lại.** $p^*(0)=11-6=5$. $p^*(-0{,}75)=11-0{,}75-6\cdot0{,}5=7{,}25\ge6{,}5=5+1{,}5$. $p^*(8)=11+8-18=1$, khớp trường hợp 3 tại biên.
:::

![Đồ thị hàm giá trị p sao theo u trên đoạn từ âm 1 tới 8 rồi nằm ngang ở mức 1 khi u lớn hơn 8. Đường cong giảm, đi qua điểm (0, 5). Một đường nét đứt 5 trừ 2u tiếp xúc đường cong tại (0, 5) và nằm dưới đường cong. Ghi chú: u nhỏ hơn âm 1 thì bài toán nhiễu không khả thi; tại u bằng 8 ràng buộc thỏa với dấu bằng và nhân tử bằng 0; u lớn hơn 8 ràng buộc còn dư.](img/lec-03/sensitivity-value.svg)

Đường $5-2u$ vừa là tiếp tuyến của $p^*(u)$ tại $u=0$, như Hệ quả 03.24 nói, vừa nằm dưới toàn bộ đồ thị, như Mệnh đề 03.23 nói. Tại $u=8$, đầu mút trái của tập khả thi trùng với đỉnh parabol $x=0$, nơi $f_0'(0)=0$: ràng buộc của bài toán nhiễu vẫn thỏa với dấu bằng, nhưng nhân tử của nó bằng $0$.

::: example Ví dụ 03.15 (Giá bóng của yêu cầu dinh dưỡng trong bài toán pha trộn)
**Dữ kiện.** Bài toán pha trộn của Ví dụ 03.5: $\min3x_1+2x_2$ với $2x_1+x_2\ge4$, $x_1+2x_2\ge5$, $x\ge0$; nghiệm $x^*=(1,2)$, $p^*=7$, nhân tử $\lambda^*=(\tfrac43,\tfrac13,0,0)$.

**Bài toán nhiễu và cận.** Tăng yêu cầu nitơ từ $4$ lên $4+\delta$ gam, tức $u_1=-\delta$ trong ràng buộc $4-(2x_1+x_2)\le u_1$. Với $\lambda_1^*=\tfrac43$, (7.2) cho $p^*(u)\ge7+\tfrac43\delta$.

**Tính trực tiếp.** Đỉnh mới giải hệ $2x_1+x_2=4+\delta$, $x_1+2x_2=5$:

$$
\begin{aligned}
x_1&=\frac{3+2\delta}3,\\
x_2&=\frac{6-\delta}3,\\
3x_1+2x_2&=7+\frac43\delta .
\end{aligned}
$$

Nhân tử $(\tfrac43,\tfrac13,0,0)$ vẫn khả thi đối ngẫu, vì điều kiện $\sum_i\lambda_ia_i=c$ của Mệnh đề 03.11 không chứa vế phải, và cho $g=\tfrac43(4+\delta)+\tfrac53=7+\tfrac43\delta$. Theo Hệ quả 03.10(c), đỉnh mới tối ưu khi nó khả thi, tức $-1{,}5\le\delta\le6$; trên đoạn đó (7.2) là đẳng thức.

**Diễn giải.** Mỗi gam nitơ yêu cầu thêm làm chi phí tối ưu tăng $\tfrac43$ đơn vị, khoảng $13{,}3$ nghìn đồng.

**Kiểm tra lại.** Với $\delta=3$: $x=(3,1)$, nitơ $2\cdot3+1=7$, phốtpho $3+2=5$, chi phí $9+2=11=7+4$.
:::

::: remark Nhận xét 03.25 (Ba nhầm lẫn về độ nhạy)
1. **Dùng (7.3) như đẳng thức cho nhiễu lớn.** Ở Ví dụ 03.14 với $u=1$, giá trị thật khác xấp xỉ bậc nhất $5-2=3$.
2. **Áp (7.3) cho miền rời rạc.** Với $D=\{0,1\}^n$, tập khả thi của bài toán nhiễu chỉ đổi khi $u$ vượt qua một trong hữu hạn mức, nên $p^*(u)$ là hàm bậc thang: đạo hàm bằng $0$ giữa các bước nhảy và không tồn tại tại bước nhảy. Cận (7.2) cần $d^*=p^*$ và một nghiệm đối ngẫu, điều mà Ví dụ 03.7 không có.
3. **Đổi dấu.** Nhân tử dương nghĩa là nới ràng buộc làm giá trị tối ưu giảm, thắt chặt ràng buộc làm giá trị tối ưu tăng. Với ràng buộc $x_1+2x_2\ge5$ viết thành $5-x_1-2x_2\le0$, nới là giảm vế phải $5$.
:::

Trong học máy, với hồi quy có ràng buộc chuẩn $\lVert w\rVert_2^2\le\tau$, nhân tử $\lambda^*$ của ràng buộc chuẩn là tốc độ giảm của mất mát tối ưu khi mức chặn tăng: khi hàm giá trị khả vi tại $\tau$, $\frac{dp^*}{d\tau}=-\lambda^*$ theo (7.3), vì nới ràng buộc một lượng $u$ là đặt mức chặn $\tau+u$. Một lần giải cho cả nghiệm lẫn ảnh hưởng của mức chặn lên mất mát tối ưu.

::: exercise Bài tập 03.6 (Mặt phẳng giá trị và hàm giá trị của một bài toán một biến)
Xét $\min_{x\in\mathbb R}x^2$ với $f_1(x)=1-x\le0$.

- (a) Mô tả tập giá trị $G$ bằng một phương trình giữa $u$ và $t$.
- (b) Tính $g(\lambda)$ với mọi $\lambda\in\mathbb R$ và, với $\lambda\ge0$, tìm điểm tiếp xúc của đường cận độ dốc $-\lambda$ với $G$.
- (c) Tính hàm giá trị $p^*(u)$ và kiểm tra (7.2), (7.3) với nhân tử tối ưu.
:::

::: hint
Từ $u=1-x$ suy ra $x=1-u$. Bài toán nhiễu là $\min x^2$ với $x\ge1-u$.
:::

::: solution
**Câu (a).** $u=1-x$ và $t=x^2$, nên $G=\{(u,t)\mid t=(1-u)^2\}$, một parabol.

**Câu (b).** $L=x^2+\lambda(1-x)$ đạt cực tiểu tại $x=\frac\lambda2$, nên $g(\lambda)=\lambda-\frac{\lambda^2}4$ với mọi $\lambda$, $\operatorname{dom}g=\mathbb R$. Điểm tiếp xúc ứng với $x=\frac\lambda2$:

$$
(u,t)=\Bigl(1-\frac\lambda2,\ \frac{\lambda^2}4\Bigr).
$$

Trên $\lambda\ge0$, $g$ cực đại tại $\lambda^*=2$ với $g(2)=1$; điểm tiếp xúc là $(0,1)$, khả thi.

**Câu (c).** Bài toán nhiễu là $\min x^2$ với $x\ge1-u$. Hai trường hợp:

1. nếu $u\le1$: $1-u\ge0$, nghiệm $x=1-u$, $p^*(u)=(1-u)^2$;
2. nếu $u>1$: $x=0$ khả thi, $p^*(u)=0$.

Kiểm tra (7.2): với $u\le1$, $(1-u)^2-(1-2u)=u^2\ge0$; với $u>1$, $1-2u<0$. Kiểm tra (7.3): $p^{*\prime}(0)=-2(1-0)=-2=-\lambda^*$.

**Kiểm tra lại.** $p^*=1$ tại $x=1$, bằng $g(2)$; tại $\lambda=1$, điểm tiếp xúc $(\tfrac12,\tfrac14)$ thỏa $\tfrac14=(1-\tfrac12)^2$.
:::

Mọi chứng nhận cho đến đây đều dựa trên hàm $g$, tức một bài toán cực tiểu theo $x$ cho mỗi nhân tử, rồi một bài toán cực đại theo nhân tử.

## 8. Điều kiện Karush–Kuhn–Tucker

Tại cặp tối ưu $(x^*,\lambda^*)=(2,2)$ của bài toán (3.1), hai bất đẳng thức của (5.3) là đẳng thức (Ví dụ 03.4), và hai đẳng thức đó là các phương trình trên $(x,\lambda)$, giải được mà không cần biết $g$. Chúng ta viết chúng thành điều kiện bù trừ và điều kiện dừng.

### 8.1. Điều kiện bù trừ

Trong Ví dụ 03.5, ràng buộc $x_1\ge0$ còn dư tại nghiệm $(1,2)$ và có nhân tử $0$, còn hai ràng buộc dinh dưỡng thỏa với dấu bằng và có nhân tử dương. Một cách trực quan, theo nghĩa giá bóng của Hệ quả 03.24, nới một ràng buộc còn dư không làm thay đổi nghiệm, nên giá bóng của nó bằng $0$; một ràng buộc có giá bóng dương phải thỏa với dấu bằng tại nghiệm. Để làm rõ, xem định nghĩa sau.

::: definition Định nghĩa 03.26 (Ràng buộc hoạt động và điều kiện bù trừ)
Cho bài toán (1.1) và một điểm khả thi $x$.

- Ràng buộc $f_i(x)\le0$ *hoạt động* (active; còn gọi là chặt, tight) tại $x$ nếu $f_i(x)=0$, *không hoạt động* nếu $f_i(x)<0$.
- Cặp $(x,\lambda)$ với $x$ khả thi và $\lambda\ge0$ thỏa *điều kiện bù trừ* (complementary slackness) nếu $\lambda_if_i(x)=0$ với mọi $i=1,\ldots,m$.

Mỗi tích $\lambda_if_i(x)$ là tích của một số không âm và một số không dương, nên điều kiện bù trừ tương đương hai phép kéo theo

$$
\begin{aligned}
\lambda_i>0\ &\Longrightarrow\ f_i(x)=0,\\
f_i(x)<0\ &\Longrightarrow\ \lambda_i=0 .
\end{aligned}
$$
:::

Chẳng hạn, cặp $(x,\lambda)=(2,2)$ của bài toán (3.1) thỏa điều kiện bù trừ vì $f_1(2)=0$, còn cặp $(3,2)$ không thỏa vì $\lambda f_1(3)=-2$. Mệnh đề 02.11(c) nói ràng buộc có $\mu_i>0$ chặt tại nghiệm; điều kiện bù trừ là phần này viết thành điều kiện trên cặp.

Mệnh đề sau đọc hai dấu bằng trong (5.3) tại một cặp tối ưu có khoảng bằng $0$, theo Boyd và Vandenberghe (2004), §5.5.2, tr. 242–243.

::: proposition Mệnh đề 03.27 (Bù trừ và cực tiểu hóa hàm Lagrange tại nghiệm) — chứng minh đầy đủ
**Giả thiết.** Bài toán (1.1); $x^*$ là nghiệm của bài toán gốc, $(\lambda^*,\nu^*)$ là nghiệm đối ngẫu, và $f_0(x^*)=g(\lambda^*,\nu^*)$.

**Kết luận.**

1. $(x^*,\lambda^*)$ thỏa điều kiện bù trừ: $\lambda_i^*f_i(x^*)=0$ với mọi $i$.
2. $x^*$ là một điểm cực tiểu của $L(\cdot,\lambda^*,\nu^*)$ trên $D$.
3. Ngược lại, nếu $x$ khả thi, $\lambda\ge0$, $(x,\lambda)$ thỏa bù trừ và $x$ cực tiểu hóa $L(\cdot,\lambda,\nu)$ trên $D$, thì $f_0(x)=g(\lambda,\nu)$, nên $x$ là nghiệm gốc và $(\lambda,\nu)$ là nghiệm đối ngẫu.
:::

::: proof Chứng minh Mệnh đề 03.27
**Lộ trình.** Viết chuỗi (5.3) tại $x^*$; hai đầu bằng nhau buộc cả hai bất đẳng thức thành đẳng thức, và mỗi đẳng thức là một phần của kết luận.

**Bước 1 (chuỗi bất đẳng thức).** Theo (5.3) với $x=x^*$ và giả thiết,

$$
\begin{aligned}
f_0(x^*)&=g(\lambda^*,\nu^*)\\
&\le L(x^*,\lambda^*,\nu^*)\\
&=f_0(x^*)+\sum_{i=1}^m\lambda_i^*f_i(x^*)\\
&\le f_0(x^*).
\end{aligned}
$$

Dòng thứ hai là định nghĩa cận dưới đúng. Dòng thứ ba dùng $Ax^*=b$. Dòng thứ tư dùng $\lambda_i^*\ge0$ và $f_i(x^*)\le0$. Hai đầu bằng nhau, nên cả hai bất đẳng thức là đẳng thức.

**Bước 2 (bù trừ).** Đẳng thức thứ hai cho $\sum_i\lambda_i^*f_i(x^*)=0$. Mỗi số hạng không dương, và một tổng các số không dương bằng $0$ chỉ khi mọi số hạng bằng $0$. Đây là phần 1.

**Bước 3 (cực tiểu hóa $L$).** Đẳng thức thứ nhất cho $L(x^*,\lambda^*,\nu^*)=\inf_{x\in D}L(x,\lambda^*,\nu^*)$, tức $x^*$ đạt cận dưới đúng. Đây là phần 2.

**Bước 4 (chiều ngược).** Nếu $x$ cực tiểu hóa $L(\cdot,\lambda,\nu)$ thì $g(\lambda,\nu)=L(x,\lambda,\nu)$. Bù trừ và $Ax=b$ cho $L(x,\lambda,\nu)=f_0(x)$. Vậy $f_0(x)=g(\lambda,\nu)$, và Hệ quả 03.10(c) cho kết luận của phần 3. $\square$
:::

Giả thiết $f_0(x^*)=g(\lambda^*,\nu^*)$ tương đương đối ngẫu mạnh cùng sự đạt nghiệm ở cả hai phía. Mệnh đề tách điều kiện tối ưu thành hai phần kiểm tra riêng được: bù trừ là điều kiện tổ hợp, đòi mỗi ràng buộc hoặc có nhân tử $0$, hoặc hoạt động; cực tiểu hóa $L$ là một bài toán không ràng buộc theo $x$.

Câu trả lời cho Câu hỏi mở đầu là: chỉ $\lambda=2$. Nếu giá trị nhỏ nhất $g(\lambda)$ của $L(\cdot,\lambda)$ bằng $p^*=5$ thì $\lambda$ là nghiệm đối ngẫu và $f_0(2)=g(\lambda)$, nên theo Mệnh đề 03.27 phần 2, $x^*=2$ cực tiểu hóa $L(\cdot,\lambda)$. Điểm cực tiểu duy nhất của $L(\cdot,\lambda)$ là $x(\lambda)=\frac{3\lambda}{1+\lambda}$, nên $x(\lambda)=2$, tức $\lambda=2$. Với $\lambda>2$, điểm cực tiểu $x(\lambda)\in(2,3)$ khả thi, nhưng giá trị nhỏ nhất $f_0(x(\lambda))+\lambda f_1(x(\lambda))$ nhỏ hơn $f_0(x(\lambda))$ vì $\lambda f_1(x(\lambda))<0$. Chẳng hạn, với $\lambda=8$: $x(8)=\tfrac83$, $\lambda f_1(\tfrac83)=8\cdot(-\tfrac89)=-\tfrac{64}9\ne0$, và $g(8)=f_0(\tfrac83)-\tfrac{64}9=\tfrac{73}9-\tfrac{64}9=1<5$.

::: example Ví dụ 03.16 (Bù trừ trong hai bài toán đã giải)
**Dữ kiện.** Bài toán (3.1): $x^*=2$, $\lambda^*=2$, $L(x,2)=3(x-2)^2+5$ (Ví dụ 03.2). Bài toán pha trộn (Ví dụ 03.5): ràng buộc $2x_1+x_2\ge4$, $x_1+2x_2\ge5$, $x_1\ge0$, $x_2\ge0$, nghiệm $x^*=(1,2)$, $\lambda^*=(\tfrac43,\tfrac13,0,0)$.

**Bài toán (3.1).** $\lambda^*=2>0$, nên theo phần 1 ràng buộc phải hoạt động tại $x^*$: $f_1(2)=0$, đúng. Theo phần 2, $x^*=2$ cực tiểu hóa $L(\cdot,2)=3(x-2)^2+5$, đúng.

**Bài toán pha trộn.** Hai nhân tử dương ứng với hai ràng buộc dinh dưỡng, cả hai hoạt động: $2+2=4$ và $1+4=5$. Hai ràng buộc $x_j\ge0$ không hoạt động ($x_1^*=1>0$, $x_2^*=2>0$) và có nhân tử $0$.

**Kiểm tra lại.** Mọi tích bằng $0$: $\tfrac43\cdot(4-4)=0$, $\tfrac13\cdot(5-5)=0$, $0\cdot(-1)=0$, $0\cdot(-2)=0$.
:::

::: remark Nhận xét 03.28 (Hoạt động không kéo theo nhân tử dương)
Xét $\min(x-1)^2$ với $f_1(x)=x-1\le0$. Nghiệm $x^*=1$, ràng buộc hoạt động. Hàm $L=(x-1)^2+\lambda(x-1)$ đạt cực tiểu tại $x=1-\frac\lambda2$, nên $g(\lambda)=\frac{\lambda^2}4-\frac{\lambda^2}2=-\frac{\lambda^2}4$, cực đại tại $\lambda^*=0$. Ràng buộc hoạt động nhưng nhân tử bằng $0$, vì điểm cực tiểu không ràng buộc của $(x-1)^2$ nằm trên biên. Kết luận "hoạt động khi và chỉ khi nhân tử dương" vì vậy sai; chỉ có hai phép kéo theo của Định nghĩa 03.26. Ví dụ 03.14 tại $u=8$ là một trường hợp khác của hiện tượng này.
:::

### 8.2. Hệ điều kiện Karush–Kuhn–Tucker

Theo Mệnh đề 03.27 phần 2, $x^*$ là điểm cực tiểu của $L(\cdot,\lambda^*,\nu^*)$ trên $D$. Khi $D$ mở và các hàm khả vi, điều kiện cần bậc nhất (Định lý 00.42) biến khẳng định này thành một phương trình gradient. Về mặt ý tưởng, tại nghiệm của bài toán (3.1), $f_0'(2)=4$ và $\lambda^*f_1'(2)=2\cdot(2\cdot2-6)=-4$: gradient của mục tiêu và gradient của ràng buộc nhân với nhân tử cân bằng nhau. Gộp phương trình đó với điều kiện bù trừ và hai điều kiện khả thi, ta có hệ điều kiện theo định nghĩa sau.

::: definition Định nghĩa 03.29 (Hệ điều kiện KKT)
Cho bài toán (1.1) với $D$ mở (nói riêng $D=\mathbb R^n$) và $f_0,\ldots,f_m$ khả vi trên $D$. Bộ $(x,\lambda,\nu)\in D\times\mathbb R^m\times\mathbb R^p$ thỏa *hệ điều kiện Karush–Kuhn–Tucker* (Karush–Kuhn–Tucker conditions, viết tắt KKT) nếu bốn nhóm sau đúng.

1. Khả thi gốc (primal feasibility): $f_i(x)\le0$ với mọi $i$, và $Ax=b$.
2. Khả thi đối ngẫu (dual feasibility): $\lambda\ge0$.
3. Bù trừ: $\lambda_if_i(x)=0$ với mọi $i$.
4. *Dừng* (stationarity):

$$
\begin{aligned}
&\nabla_xL(x,\lambda,\nu)\\
&\quad=\nabla f_0(x)\\
&\qquad+\textstyle\sum_{i=1}^m\lambda_i\nabla f_i(x)\\
&\qquad+A^T\nu=0 .
\end{aligned}
\tag{8.1}
$$
:::

Hệ KKT có $n+m+p$ ẩn và $n+m+p$ phương trình: $n$ phương trình dừng, $m$ phương trình bù trừ và $p$ phương trình $Ax=b$; các bất đẳng thức của nhóm 1 và 2 dùng để loại nghiệm. Khi $m=p=0$, hệ chỉ còn $\nabla f_0(x)=0$; khi chỉ có đẳng thức, hệ là phương trình Lagrange $\nabla f_0(x)+A^T\nu=0$, $Ax=b$.

Định lý sau cho biết khi nào một nghiệm bắt buộc phải thỏa KKT, theo Boyd và Vandenberghe (2004), §5.5.3, tr. 243.

::: theorem Định lý 03.30 (KKT là điều kiện cần khi có đối ngẫu mạnh) — chứng minh đầy đủ
**Giả thiết.** Bài toán (1.1) với $D$ mở và $f_0,\ldots,f_m$ khả vi trên $D$; $x^*$ là nghiệm gốc; $(\lambda^*,\nu^*)$ là nghiệm đối ngẫu; $p^*=d^*$ hữu hạn.

**Kết luận.** $(x^*,\lambda^*,\nu^*)$ thỏa hệ KKT.
:::

::: proof Chứng minh Định lý 03.30
**Lộ trình.** Ba nhóm đầu có từ tính khả thi và Mệnh đề 03.27 phần 1; nhóm dừng là điều kiện cần bậc nhất cho điểm cực tiểu của $L$ ở Mệnh đề 03.27 phần 2.

**Bước 1 (khả thi).** Nhóm 1 đúng vì $x^*$ là nghiệm, nên khả thi. Nhóm 2 đúng vì nghiệm đối ngẫu khả thi đối ngẫu (Định nghĩa 03.9).

**Bước 2 (bù trừ).** Vì $f_0(x^*)=p^*=d^*=g(\lambda^*,\nu^*)$, Mệnh đề 03.27 phần 1 cho nhóm 3.

**Bước 3 (dừng).** Mệnh đề 03.27 phần 2 cho $x^*$ cực tiểu hóa hàm khả vi $L(\cdot,\lambda^*,\nu^*)$ trên tập mở $D$, nên $x^*$ là một điểm trong của miền. Theo điều kiện cần bậc nhất (Định lý 00.42; Nhận xét 01.14), gradient tại $x^*$ bằng $0$; đó là (8.1). $\square$
:::

Kết hợp với Định lý 03.15 cho bài toán lồi, ta được hệ quả sau.

::: corollary Hệ quả 03.31 (Bài toán lồi có điểm Slater: mọi nghiệm có nhân tử KKT) — chứng minh đầy đủ
**Giả thiết.** Bài toán ở dạng phổ biến với $D=\mathbb R^n$, $f_0,\ldots,f_m$ khả vi, thỏa điều kiện Slater; $x^*$ là một nghiệm.

**Kết luận.** Có $(\lambda^*,\nu^*)$ để $(x^*,\lambda^*,\nu^*)$ thỏa hệ KKT; mọi nghiệm đối ngẫu đều dùng được.
:::

::: proof Chứng minh Hệ quả 03.31
**Lộ trình.** Định lý 03.15 cho nghiệm đối ngẫu, rồi Định lý 03.30 cho bộ KKT.

**Bước 1 (nghiệm đối ngẫu).** $p^*=f_0(x^*)$ hữu hạn. Định lý 03.15(a) cho $d^*=p^*$ và một nghiệm đối ngẫu $(\lambda^*,\nu^*)$.

**Bước 2 (KKT).** Các giả thiết của Định lý 03.30 thỏa với mọi nghiệm đối ngẫu, nên $(x^*,\lambda^*,\nu^*)$ thỏa KKT. $\square$
:::

Chiều ngược, tức khi nào một bộ thỏa KKT là chứng nhận tối ưu, được phát biểu trong định lý sau (Boyd và Vandenberghe (2004), §5.5.3, tr. 244).

::: theorem Định lý 03.32 (KKT là điều kiện đủ cho bài toán lồi) — chứng minh đầy đủ
**Giả thiết.** Bài toán ở dạng phổ biến với $D$ mở, lồi (nói riêng $D=\mathbb R^n$): $f_0,\ldots,f_m$ lồi, khả vi trên $D$; $(\tilde x,\tilde\lambda,\tilde\nu)$ thỏa hệ KKT.

**Kết luận.** $\tilde x$ là nghiệm gốc, $(\tilde\lambda,\tilde\nu)$ là nghiệm đối ngẫu, và $f_0(\tilde x)=g(\tilde\lambda,\tilde\nu)$, nên $p^*=d^*$.
:::

::: proof Chứng minh Định lý 03.32
**Lộ trình.** Với $\tilde\lambda\ge0$, hàm $L(\cdot,\tilde\lambda,\tilde\nu)$ lồi, nên điều kiện dừng cho cực tiểu toàn cục trên $D$; Mệnh đề 03.27 phần 3 cho kết luận.

**Bước 1 (hàm Lagrange lồi theo $x$).** $L(\cdot,\tilde\lambda,\tilde\nu)=f_0+\sum_i\tilde\lambda_if_i+\tilde\nu^T(A\,\cdot-b)$ là tổng của hàm lồi $f_0$, các hàm lồi $f_i$ nhân hệ số $\tilde\lambda_i\ge0$, và một hàm affine. Theo Định lý 01.30(a), hàm này lồi trên $D$. Bước này dùng nhóm 2 và tính affine của đẳng thức.

**Bước 2 (dừng kéo theo cực tiểu toàn cục).** Nhóm 4 nói gradient của hàm lồi khả vi $L(\cdot,\tilde\lambda,\tilde\nu)$ bằng $0$ tại $\tilde x$. Theo Hệ quả 01.26 trên tập mở lồi $D$, $\tilde x$ là điểm cực tiểu toàn cục của nó trên $D$.

**Bước 3 (kết luận).** Bốn điều kiện của Mệnh đề 03.27 phần 3 đều có:

- $\tilde x$ khả thi, theo nhóm 1;
- $\tilde\lambda\ge0$, theo nhóm 2;
- bù trừ đúng, theo nhóm 3;
- $\tilde x$ cực tiểu hóa $L(\cdot,\tilde\lambda,\tilde\nu)$ trên $D$, theo Bước 2.

Mệnh đề đó cho kết luận. $\square$
:::

Định lý không cần điều kiện Slater và không bảo đảm có bộ KKT; điều đó cần Hệ quả 03.31. Hai định lý có vai trò bổ sung cho nhau:

- Định lý 03.30 đi từ nghiệm tới nhân tử, cần đối ngẫu mạnh có nghiệm đối ngẫu, không cần lồi;
- Định lý 03.32 đi từ một bộ KKT tới nghiệm, cần lồi, không cần điều kiện Slater.

Với bài toán lồi khả vi thỏa điều kiện Slater, $x^*$ là nghiệm khi và chỉ khi có $(\lambda,\nu)$ để $(x^*,\lambda,\nu)$ thỏa KKT. So với Hệ quả 01.26, kết quả này thay điều kiện "$\nabla f_0(x^*)^T(x-x^*)\ge0$ với mọi $x$ khả thi", phải kiểm tra trên vô số điểm, bằng một hệ hữu hạn phương trình và bất phương trình. Trong học máy, hồi quy có ràng buộc chuẩn và máy vector hỗ trợ là bài toán lồi, nên một bộ KKT là chứng nhận toàn cục; theo Boyd và Vandenberghe (2004), §5.5.3, tr. 244, nhiều thuật toán tối ưu lồi được xây dựng như phương pháp giải hệ KKT.

::: example Ví dụ 03.17 (Giải bài toán (3.1) bằng hệ KKT)
**Dữ kiện.** Bài toán (3.1): $f_0(x)=x^2+1$, $f_1(x)=(x-2)(x-4)$, nên $f_0'(x)=2x$, $f_1'(x)=2x-6$.

**Lập hệ.** Hệ KKT gồm $(x-2)(x-4)\le0$, $\lambda\ge0$, $\lambda(x-2)(x-4)=0$ và

$$
2x+\lambda(2x-6)=0 .
$$

**Giải theo các trường hợp của điều kiện bù trừ.**

1. Trường hợp $\lambda=0$: dừng cho $x=0$; nhưng $f_1(0)=8>0$, vi phạm khả thi gốc. Loại.
2. Trường hợp $f_1(x)=0$, tức $x=2$ hoặc $x=4$.
   - $x=2$: dừng cho $4-2\lambda=0$, $\lambda=2\ge0$. Hợp lệ.
   - $x=4$: dừng cho $8+2\lambda=0$, $\lambda=-4<0$, vi phạm khả thi đối ngẫu. Loại.

**Kết luận.** Bộ KKT duy nhất là $(x,\lambda)=(2,2)$. Bài toán lồi, nên Định lý 03.32 cho $x^*=2$, $\lambda^*=2$, $p^*=d^*=5$, không cần tính $g$.

**Kiểm tra lại.** Kết quả khớp Ví dụ 03.4; với $\lambda=2$, $L(x,2)=3(x-2)^2+5\ge5$, bằng $5$ tại $x=2$.
:::

![Hai khung. Khung trái: đoạn khả thi từ 2 đến 4 với điểm Slater 3; hai ô so sánh ứng viên x bằng 2 (4 trừ 2 lambda bằng 0 cho lambda bằng 2, không âm, thỏa đủ bốn nhóm) và ứng viên x bằng 4 (8 cộng 2 lambda bằng 0 cho lambda bằng âm 4, sai dấu, bị loại). Khung phải: bài toán cực tiểu x1 bình phương cộng x2 bình phương với x1 cộng x2 lớn hơn hoặc bằng 1; nghiệm (1/2, 1/2) là hình chiếu của gốc tọa độ lên đường biên, nơi ràng buộc hoạt động với nhân tử 1; tại đó gradient của mục tiêu (1, 1) và gradient của ràng buộc nhân với nhân tử (âm 1, âm 1) là hai vector ngược chiều. Hàng dưới: bốn ô ghi bốn nhóm điều kiện khả thi gốc, khả thi đối ngẫu, bù trừ, dừng.](img/lec-03/kkt-active-projection.svg)

Khung trái của hình tóm tắt Ví dụ 03.17. Khung phải là bài toán $\min x_1^2+x_2^2$ với $x_1+x_2\ge1$: tại $x^*=(\tfrac12,\tfrac12)$, $\nabla f_0(x^*)=(1,1)$ và $\lambda^*\nabla f_1(x^*)=1\cdot(-1,-1)$ có tổng bằng $0$, đúng (8.1).

::: example Ví dụ 03.18 (Chiếu lên nửa mặt phẳng và lên đường thẳng)
**(a) Bất đẳng thức.** $\min x_1^2+x_2^2$ với $f_1(x)=5-x_1-2x_2\le0$. Dừng: $2x_1-\lambda=0$ và $2x_2-2\lambda=0$, nên $x=(\frac\lambda2,\lambda)$. Theo các trường hợp của điều kiện bù trừ:

1. trường hợp $\lambda=0$: $x=(0,0)$, có $f_1=5>0$, loại;
2. trường hợp $x_1+2x_2=5$: thay $x=(\frac\lambda2,\lambda)$ cho $\frac{5\lambda}2=5$, nên $\lambda=2$, $x=(1,2)$, $p^*=1+4=5$.

Bài toán lồi, nên Định lý 03.32 cho đây là nghiệm.

**(b) Đẳng thức.** $\min x_1^2+x_2^2$ với $x_1+2x_2=5$. Không có bất đẳng thức, nên hệ KKT là hệ tuyến tính ba ẩn

$$
\begin{aligned}
2x_1+\nu&=0,\\
2x_2+2\nu&=0,\\
x_1+2x_2&=5 .
\end{aligned}
$$

Hai phương trình đầu cho $x=(-\frac\nu2,-\nu)$; thay vào phương trình thứ ba: $-\frac{5\nu}2=5$, nên $\nu=-2$ và $x=(1,2)$.

**Diễn giải.** Cùng nghiệm, với $\lambda=2\ge0$ ở (a) và $\nu=-2$ ở (b). Nhân tử đẳng thức được phép âm; dấu của nó phụ thuộc cách viết $x_1+2x_2-5=0$ hay $5-x_1-2x_2=0$. Với đẳng thức và mục tiêu bậc hai, hệ KKT là một hệ phương trình tuyến tính.

**Kiểm tra lại.** Ở (a), thay điểm cực tiểu $x=(\frac\lambda2,\lambda)$ của $L(\cdot,\lambda)$ vào $L$:

$$
\begin{aligned}
g(\lambda)&=\tfrac{\lambda^2}4+\lambda^2+\lambda\bigl(5-\tfrac\lambda2-2\lambda\bigr)\\
&=5\lambda-\tfrac54\lambda^2 .
\end{aligned}
$$

Hàm này cực đại tại $\lambda=2$ với $g=10-5=5=p^*$. Điểm khả thi $(5,0)$ có $f_0=25>5$. Điểm $(1,2)$ cùng phương với pháp tuyến $(1,2)$ của đường $x_1+2x_2=5$, nên là hình chiếu của gốc lên đường đó.
:::

::: remark Nhận xét 03.33 (Khi bỏ giả thiết: tính cần và tính đủ của KKT)
**KKT không đủ khi bài toán không lồi.** Xét $\min-x^2$ với $x-1\le0$ và $-x-1\le0$. Dừng: $-2x+\lambda_1-\lambda_2=0$. Bộ $(x,\lambda)=(0,0,0)$ thỏa cả bốn nhóm với giá trị $0$, nhưng $x=\pm1$ cho $-1<0$. Hàm $-x^2$ không lồi, nên Định lý 03.32 không áp dụng. Với mọi $\lambda$, $L=-x^2+\lambda_1(x-1)-\lambda_2(x+1)$ có hệ số của $x^2$ bằng $-1$, nên $g\equiv-\infty$ và $d^*=-\infty<p^*=-1$.

**KKT không cần khi thiếu nghiệm đối ngẫu.** Bài toán thứ nhất của Ví dụ 03.10, $\min x_1+x_2$ với $x_1^2+x_2^2\le0$, có nghiệm $x^*=0$, nhưng dừng đòi $(1,1)+2\lambda(0,0)=0$, vô nghiệm. Bài toán lồi và có nghiệm, nhưng không có điểm Slater, và bài toán đối ngẫu không đạt nghiệm.

**Bài toán không lồi vẫn có thể có bộ KKT tại nghiệm.** Trong bài toán $\min-x^2$ với $x-1\le0$, $-x-1\le0$ ở trên, $x=1$ với $\lambda=(2,0)$ thỏa KKT dù đối ngẫu mạnh không đúng; Nhận xét 03.17 có một hiện tượng cùng loại cho đối ngẫu mạnh.
:::

::: exercise Bài tập 03.7 (Hệ KKT của một bài toán hai biến)
Giải $\min x_1^2+2x_2^2$ với $x_1+x_2\ge3$ bằng hệ KKT, xét đủ các trường hợp. Kiểm tra kết quả bằng cách tính $g(\lambda)$ và giải bài toán đối ngẫu.
:::

::: hint
Ràng buộc viết thành $3-x_1-x_2\le0$; xét hai trường hợp $\lambda=0$ và ràng buộc hoạt động.
:::

::: solution
**Hệ KKT.** Dừng: $2x_1-\lambda=0$, $4x_2-\lambda=0$.

1. Trường hợp $\lambda=0$: $x=(0,0)$, có $3-0>0$. Loại.
2. Trường hợp $x_1+x_2=3$: $\frac\lambda2+\frac\lambda4=3$, nên $\lambda=4$ và $x=(2,1)$, giá trị $4+2=6$.

Bài toán lồi, nên Định lý 03.32 cho $x^*=(2,1)$, $\lambda^*=4$, $p^*=6$.

**Đối ngẫu.** Thay $x(\lambda)=(\frac\lambda2,\frac\lambda4)$ vào $L=x_1^2+2x_2^2+\lambda(3-x_1-x_2)$:

$$
\begin{aligned}
g(\lambda)={}&\frac{\lambda^2}4+\frac{\lambda^2}8+3\lambda\\
&-\frac{\lambda^2}2-\frac{\lambda^2}4\\
={}&3\lambda-\frac{3\lambda^2}8 .
\end{aligned}
$$

$g'(\lambda)=3-\frac{3\lambda}4=0$ tại $\lambda=4$, với $g(4)=12-6=6$.

**Kiểm tra lại.** Điểm khả thi $(1{,}5;\,1{,}5)$ cho $2{,}25+4{,}5=6{,}75>6$.
:::

::: exercise Bài tập 03.8 (Bốn trường hợp bù trừ)
Xét $\min(x_1-1)^2+(x_2-1)^2$ với $x_1+x_2-4\le0$ và $x_1-\tfrac12\le0$.

- (a) Viết hệ KKT.
- (b) Xét bốn trường hợp của điều kiện bù trừ và tìm bộ KKT.
- (c) Xác định ràng buộc hoạt động, nhân tử dương, và nghiệm khi nới ràng buộc thứ hai thành $x_1\le\tfrac12+u$ với $u$ nhỏ.
:::

::: hint
Dừng: $2(x_1-1)+\lambda_1+\lambda_2=0$ và $2(x_2-1)+\lambda_1=0$. Trường hợp cả hai nhân tử bằng $0$ cho điểm cực tiểu không ràng buộc $(1,1)$.
:::

::: solution
**Câu (a).** Khả thi gốc: $x_1+x_2\le4$, $x_1\le\tfrac12$. Khả thi đối ngẫu: $\lambda_1,\lambda_2\ge0$. Bù trừ: $\lambda_1(x_1+x_2-4)=0$, $\lambda_2(x_1-\tfrac12)=0$. Dừng như trong gợi ý.

**Câu (b).**

1. $\lambda_1=\lambda_2=0$: $x=(1,1)$, vi phạm $x_1\le\tfrac12$. Loại.
2. $\lambda_1=0$, $x_1=\tfrac12$: dừng cho $x_2=1$ và $2(-\tfrac12)+\lambda_2=0$, $\lambda_2=1$. Khả thi: $\tfrac12+1=1{,}5\le4$. Hợp lệ.
3. $x_1+x_2=4$, $\lambda_2=0$: dừng cho $x_1=x_2=1-\frac{\lambda_1}2$, tổng $2-\lambda_1=4$, $\lambda_1=-2<0$. Loại.
4. Cả hai hoạt động: $x=(\tfrac12,\tfrac72)$; dừng thứ hai cho $\lambda_1=-5<0$. Loại.

Bộ KKT duy nhất là $x=(\tfrac12,1)$, $\lambda=(0,1)$; bài toán lồi nên đây là nghiệm, $p^*=\tfrac14$.

**Câu (c).** Ràng buộc $x_1\le\tfrac12$ hoạt động với $\lambda_2=1$; ràng buộc tổng không hoạt động và $\lambda_1=0$. Với $u$ nhỏ, nghiệm là $(\tfrac12+u,1)$ và $p^*(u)=(\tfrac12-u)^2$, đạo hàm tại $0$ bằng $-1=-\lambda_2$.

**Kiểm tra lại.** Dừng tại $(\tfrac12,1)$ với $\lambda=(0,1)$: $2(-\tfrac12)+0+1=0$ và $0+0=0$.
:::

### 8.3. Hồi quy có ràng buộc chuẩn: ràng buộc chặn và số hạng phạt

Theo Mệnh đề 02.26, nghiệm của bài toán có phạt $f_0(w)+\rho R(w)$ là nghiệm của bài toán với mức chặn $R(w)\le R(\hat w)$. Chiều ngược, tức mỗi mức chặn ứng với một hệ số phạt, được cho bởi mệnh đề sau.

::: proposition Mệnh đề 03.34 (Ràng buộc chặn sinh ra hệ số phạt bằng nhân tử) — chứng minh đầy đủ
**Giả thiết.** $f_0,R:\mathbb R^d\to\mathbb R$ lồi; $\tau\in\mathbb R$ và có $\bar w$ với $R(\bar w)<\tau$; $w^*$ là nghiệm của $\min f_0(w)$ với $R(w)-\tau\le0$.

**Kết luận.** Có $\lambda^*\ge0$ sao cho:

1. $w^*$ là nghiệm của bài toán có phạt $\min_wf_0(w)+\lambda^*R(w)$;
2. $\lambda^*\bigl(R(w^*)-\tau\bigr)=0$;
3. với mọi mức chặn $\tau'$, giá trị tối ưu $p^*(\tau')$ của bài toán với mức chặn $\tau'$ thỏa $p^*(\tau')\ge p^*(\tau)-\lambda^*(\tau'-\tau)$.
:::

::: proof Chứng minh Mệnh đề 03.34
**Lộ trình.** Định lý Slater cho nhân tử, Mệnh đề 03.27 cho bù trừ và tính cực tiểu của hàm Lagrange, Mệnh đề 03.23 cho độ nhạy.

**Bước 1 (nhân tử).** Bài toán có ràng buộc chặn ở dạng phổ biến với $D=\mathbb R^d$, có điểm Slater $\bar w$, và $p^*=f_0(w^*)$ hữu hạn. Định lý 03.15(a) cho một nghiệm đối ngẫu $\lambda^*\ge0$ với $g(\lambda^*)=p^*$.

**Bước 2 (bù trừ và cực tiểu hóa).** Mệnh đề 03.27 cho phần 2, và cho $w^*$ cực tiểu hóa $L(w,\lambda^*)=f_0(w)+\lambda^*R(w)-\lambda^*\tau$ trên $\mathbb R^d$. Hằng số $-\lambda^*\tau$ không đổi điểm cực tiểu, nên $w^*$ là nghiệm của bài toán có phạt.

**Bước 3 (độ nhạy).** Bài toán với mức chặn $\tau'$ là bài toán nhiễu (7.1) với $u=\tau'-\tau$. Mệnh đề 03.23 cho phần 3. $\square$
:::

Khi ràng buộc chặn không hoạt động, $\lambda^*=0$ và bài toán có phạt là bài toán không phạt. Mệnh đề 03.34 cùng Mệnh đề 02.26 cho quan hệ hai chiều giữa ràng buộc chặn và số hạng phạt khi bài toán lồi có điểm Slater: hệ số phạt ứng với một mức chặn là nhân tử của ràng buộc đó, và khi hàm giá trị khả vi theo mức chặn, theo Hệ quả 03.24, nó đo tốc độ giảm của mất mát khi nới ràng buộc chặn. Khi miền không lồi, như miền giới hạn số đặc trưng của Mệnh đề 02.46, Mệnh đề 03.34 không áp dụng.

::: example Ví dụ 03.19 (Hồi quy hai trọng số với ràng buộc chuẩn)
**Dữ kiện.** Ma trận thiết kế $X=I_2$, đầu ra $y=(3,4)$, mức chặn $\tau=1$:

$$
\begin{aligned}
\min_{w\in\mathbb R^2}\quad&\tfrac12\lVert w-y\rVert_2^2\\
\text{subject to}\quad&\lVert w\rVert_2^2-1\le0 .
\end{aligned}
$$

**Kiểm tra giả thiết.** Mục tiêu và ràng buộc lồi, khả vi; $w=0$ là điểm Slater; tập khả thi đóng, bị chặn, nên có nghiệm (Định lý 01.35). Theo Hệ quả 03.31 và Định lý 03.32, giải hệ KKT là đủ.

**Giải hệ KKT.** Dừng: $(w-y)+2\lambda w=0$, nên $w=\frac{y}{1+2\lambda}$.

1. Trường hợp $\lambda=0$: $w=y$, $\lVert y\rVert_2^2=25>1$. Loại.
2. Trường hợp $\lVert w\rVert_2^2=1$: $\frac{5}{1+2\lambda}=1$, nên $\lambda^*=2$ và $w^*=(0{,}6;\,0{,}8)$.

Mất mát tối ưu: $\tfrac12\bigl(2{,}4^2+3{,}2^2\bigr)=\tfrac12(5{,}76+10{,}24)=8$.

**Diễn giải.** Theo Mệnh đề 03.34, $w^*$ cũng là nghiệm của bài toán có phạt $\tfrac12\lVert w-y\rVert_2^2+2\lVert w\rVert_2^2$. Hàm giá trị là $p^*(\tau)=\tfrac12(5-\sqrt\tau)^2$ với $\tau\le25$, vì nghiệm là điểm của hình tròn bán kính $\sqrt\tau$ gần $y$ nhất. Đạo hàm tại $\tau=1$ là $-\frac{5-1}{2}=-2=-\lambda^*$, đúng (7.3).

**Kiểm tra lại.** Bài toán có phạt: dừng $(w-y)+4w=0$ cho $w=\frac y5=(0{,}6;\,0{,}8)$. Bốn nhóm KKT: $\lVert w^*\rVert_2^2=0{,}36+0{,}64=1$; $\lambda^*=2\ge0$; $2\cdot0=0$; $(0{,}6-3)+4\cdot0{,}6=0$ và $(0{,}8-4)+4\cdot0{,}8=0$.
:::

Với $X$ tổng quát, ta dùng mục tiêu $J(w)=\lVert Xw-y\rVert_2^2$, không có hệ số $\tfrac12$. Với ràng buộc $\lVert w\rVert_2^2\le\tau$ và nhân tử $\lambda$, phương trình dừng của hệ KKT là $(X^TX+\lambda I)w=X^Ty$, cũng là phương trình dừng của bài toán có phạt $J+\rho\lVert w\rVert_2^2$ với $\rho=\lambda$. Với mục tiêu có hệ số $\tfrac12$ như Ví dụ 03.19, phương trình dừng là $(X^TX+2\lambda I)w=X^Ty$, nên nhân tử của cách viết không có $\tfrac12$ bằng hai lần nhân tử của cách viết có $\tfrac12$. Vì vậy, khi $0<\tau<\lVert w(0)\rVert_2^2$, bài toán có nghiệm $w^*$ (tập khả thi đóng, bị chặn) và điểm Slater $w=0$, nên Mệnh đề 03.34 cho $\lambda^*\ge0$ với $w^*$ cực tiểu hóa $J+\lambda^*\lVert w\rVert_2^2$, tức $w^*=w(\lambda^*)$. Nếu $\lambda^*=0$ thì $w^*=w(0)$, không khả thi; do đó $\lambda^*>0$, và bù trừ cho $\lVert w(\lambda^*)\rVert_2^2=\tau$. Mệnh đề sau cho thấy $\lambda^*$ là nghiệm duy nhất của phương trình một ẩn $\lVert w(\rho)\rVert_2^2=\tau$, giải được bằng phép chia đôi khoảng.

::: proposition Mệnh đề 03.35 (Chuẩn của nghiệm hồi quy ridge giảm theo hệ số phạt) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{N\times d}$ có hạng cột đầy đủ, $y\in\mathbb R^N$ với $X^Ty\ne0$, $J(w)=\lVert Xw-y\rVert_2^2$. Với $\rho\ge0$, $w(\rho)$ là nghiệm của $\min_wJ(w)+\rho\lVert w\rVert_2^2$.

**Kết luận.**

1. $w(\rho)=(X^TX+\rho I)^{-1}X^Ty$, liên tục theo $\rho\ge0$.
2. $\varphi(\rho)=\lVert w(\rho)\rVert_2^2$ giảm chặt trên $[0,\infty)$.
3. $\varphi(\rho)\le\frac{\lVert X^Ty\rVert_2^2}{\rho^2}$ với $\rho>0$, nên $\varphi(\rho)\to0$ khi $\rho\to\infty$.

Do đó với mọi $0<\tau<\varphi(0)$, phương trình $\varphi(\rho)=\tau$ có đúng một nghiệm $\rho^*>0$.
:::

::: proof Chứng minh Mệnh đề 03.35
**Lộ trình.** Công thức đóng cho tính liên tục; so sánh tính tối ưu của hai nghiệm cho tính đơn điệu; Cauchy–Schwarz cho giới hạn; định lý giá trị trung gian cho nghiệm duy nhất.

**Bước 1 (công thức và tính liên tục).** Gradient của $J+\rho\lVert\cdot\rVert_2^2$ là $2(X^TX+\rho I)w-2X^Ty$. Ma trận $X^TX+\rho I\succ0$ vì $X^TX\succ0$ khi hạng cột đầy đủ, nên khả nghịch, và phương trình gradient bằng $0$ có đúng một nghiệm. Hàm có Hessian $2(X^TX+\rho I)\succ0$ nên lồi chặt (Định lý 01.29); theo Hệ quả 01.26, nghiệm của phương trình gradient là điểm cực tiểu toàn cục, và là nghiệm duy nhất (Định lý 01.34). Theo quy tắc Cramer, các phần tử của $(X^TX+\rho I)^{-1}$ là tỷ số của các đa thức theo $\rho$ với mẫu $\det(X^TX+\rho I)>0$, nên liên tục.

**Bước 2 (đơn điệu).** Lấy $0\le\rho_1<\rho_2$, $w_k=w(\rho_k)$. Tính tối ưu của từng nghiệm cho

$$
\begin{aligned}
&J(w_1)+\rho_1\lVert w_1\rVert_2^2\\
&\quad\le J(w_2)+\rho_1\lVert w_2\rVert_2^2,\\
&J(w_2)+\rho_2\lVert w_2\rVert_2^2\\
&\quad\le J(w_1)+\rho_2\lVert w_1\rVert_2^2 .
\end{aligned}
$$

Cộng hai bất đẳng thức và rút gọn $J(w_1)+J(w_2)$ cho $(\rho_2-\rho_1)\bigl(\lVert w_2\rVert_2^2-\lVert w_1\rVert_2^2\bigr)\le0$, nên $\varphi(\rho_2)\le\varphi(\rho_1)$.

**Bước 3 (đơn điệu chặt).** Nếu $\varphi(\rho_2)=\varphi(\rho_1)$, bất đẳng thức thứ nhất cho $J(w_1)\le J(w_2)$ và bất đẳng thức thứ hai cho $J(w_2)\le J(w_1)$, nên $w_2$ cũng đạt giá trị tối ưu của bài toán với $\rho_1$. Tính duy nhất cho $w_1=w_2$. Trừ hai phương trình gradient: $(\rho_2-\rho_1)w_1=0$, nên $w_1=0$ và $X^Ty=(X^TX+\rho_1I)\cdot0=0$, trái giả thiết.

**Bước 4 (giới hạn).** Nhân phương trình $(X^TX+\rho I)w=X^Ty$ với $w^T$: $\lVert Xw\rVert_2^2+\rho\lVert w\rVert_2^2=w^TX^Ty\le\lVert w\rVert_2\lVert X^Ty\rVert_2$ theo Cauchy–Schwarz. Bỏ số hạng không âm $\lVert Xw\rVert_2^2$ và chia cho $\rho\lVert w\rVert_2$ (khi $w\ne0$) cho $\lVert w\rVert_2\le\frac{\lVert X^Ty\rVert_2}\rho$.

**Bước 5 (nghiệm duy nhất).** $\varphi$ liên tục, giảm chặt từ $\varphi(0)>\tau$ về giới hạn $0<\tau$, nên định lý giá trị trung gian cho đúng một $\rho^*>0$ với $\varphi(\rho^*)=\tau$. $\square$
:::

Ghép tính đơn điệu chặt của $\varphi$ với phép chia đôi, ta được thuật toán sau giải phương trình $\varphi(\rho)=\tau$; theo Mệnh đề 03.34, nghiệm $\rho^*$ là nhân tử $\lambda^*$ của ràng buộc chuẩn.

::: algorithm Thuật toán 03.36 (Chia đôi hệ số phạt cho hồi quy có ràng buộc chuẩn)
**Đầu vào.** $X$ có hạng cột đầy đủ, $y$ với $X^Ty\ne0$, mức chặn $\tau>0$, sai số $\varepsilon>0$.

**Đầu ra.** Hệ số phạt $\rho$, xấp xỉ nhân tử $\lambda^*$ với $\lvert\rho-\lambda^*\rvert\le\varepsilon$, và trọng số khả thi $w=w(\rho)$.

1. Giải $X^TXw=X^Ty$, được $w(0)$. Nếu $\lVert w(0)\rVert_2^2\le\tau$, trả về $\rho=0$, $w=w(0)$ và dừng.
2. Đặt $\rho_{\mathrm{lo}}=0$, $\rho_{\mathrm{hi}}=1$. Trong khi $\varphi(\rho_{\mathrm{hi}})>\tau$, đặt $\rho_{\mathrm{hi}}\leftarrow2\rho_{\mathrm{hi}}$.
3. Lặp: đặt $\rho_{\mathrm{mid}}=\frac{\rho_{\mathrm{lo}}+\rho_{\mathrm{hi}}}2$ và giải $(X^TX+\rho_{\mathrm{mid}}I)w=X^Ty$. Nếu $\lVert w\rVert_2^2>\tau$, đặt $\rho_{\mathrm{lo}}=\rho_{\mathrm{mid}}$; ngược lại đặt $\rho_{\mathrm{hi}}=\rho_{\mathrm{mid}}$.

**Điều kiện dừng.** Dừng bước 3 khi $\rho_{\mathrm{hi}}-\rho_{\mathrm{lo}}\le\varepsilon$; trả về $\rho=\rho_{\mathrm{hi}}$ và $w=w(\rho_{\mathrm{hi}})$.

**Chi phí.** Mỗi lần tính $\varphi$ giải một hệ $d\times d$ xác định dương, khoảng $\tfrac13d^3$ phép tính bằng phân rã Cholesky (Định nghĩa 00.25). Bước 3 cần khoảng $\log_2(\rho_0/\varepsilon)$ lần lặp, với $\rho_0$ là giá trị $\rho_{\mathrm{hi}}$ sau bước 2.

**Bảo đảm.** Theo Mệnh đề 03.35, $\varphi(\rho_{\mathrm{lo}})>\tau\ge\varphi(\rho_{\mathrm{hi}})$ được giữ ở mọi lần lặp, nên $\lambda^*\in(\rho_{\mathrm{lo}},\rho_{\mathrm{hi}}]$. Trọng số trả về khả thi vì $\varphi(\rho_{\mathrm{hi}})\le\tau$. Nó cực tiểu hóa $J+\rho_{\mathrm{hi}}\lVert w\rVert_2^2$, tức hàm Lagrange của bài toán với mức chặn $\varphi(\rho_{\mathrm{hi}})$ tại nhân tử $\rho_{\mathrm{hi}}$, và ràng buộc đó hoạt động; theo Mệnh đề 03.27 phần 3, nó là nghiệm của bài toán với mức chặn $\varphi(\rho_{\mathrm{hi}})$. Theo (7.2) áp cho bài toán đó, mất mát của trọng số trả về vượt giá trị tối ưu của bài toán với mức chặn $\tau$ không quá $\rho_{\mathrm{hi}}\bigl(\tau-\varphi(\rho_{\mathrm{hi}})\bigr)$.
:::

::: exercise Bài tập 03.9 (Hồi quy ba trọng số với ràng buộc chuẩn)
Xét hồi quy $\min_{w\in\mathbb R^3}\tfrac12\lVert w-y\rVert_2^2$ với $\lVert w\rVert_2^2\le1$ và $y=(1,2,2)$.

- (a) Giải bằng hệ KKT.
- (b) Theo Mệnh đề 03.34, xác định bài toán có phạt nhận nghiệm này làm nghiệm, rồi kiểm tra trực tiếp.
- (c) Tính $\frac{dp^*}{d\tau}$ tại $\tau=1$ từ công thức hàm giá trị và so với nhân tử.
:::

::: hint
Như Ví dụ 03.19, dừng cho $w=\frac y{1+2\lambda}$; $\lVert y\rVert_2=3$.
:::

::: solution
**Câu (a).** Dừng cho $w=\frac y{1+2\lambda}$.

1. Trường hợp $\lambda=0$: $w=y$ với $\lVert y\rVert_2^2=9>1$. Loại.
2. Trường hợp ràng buộc chuẩn hoạt động: $\frac3{1+2\lambda}=1$, nên $\lambda^*=1$ và $w^*=\frac y3=(\tfrac13,\tfrac23,\tfrac23)$.

Mất mát $\tfrac12\lVert(\tfrac23,\tfrac43,\tfrac43)\rVert_2^2=\tfrac12\cdot\tfrac{4+16+16}9=2$.

**Câu (b).** Bài toán $\min\tfrac12\lVert w-y\rVert_2^2+\lVert w\rVert_2^2$: dừng $(w-y)+2w=0$ cho $w=\frac y3$, trùng $w^*$.

**Câu (c).** Giải lại (a) với mức $\tau\le9$: $\frac3{1+2\lambda}=\sqrt\tau$, $w=\frac{\sqrt\tau}3y$, nên $p^*(\tau)=\tfrac12\lVert w-y\rVert_2^2=\tfrac12(3-\sqrt\tau)^2$, nên $\frac{dp^*}{d\tau}=-\frac{3-\sqrt\tau}{2\sqrt\tau}$, bằng $-1$ tại $\tau=1$, đúng $-\lambda^*$.

**Kiểm tra lại.** $\lVert w^*\rVert_2^2=\tfrac{1+4+4}9=1$; dừng ở tọa độ thứ nhất: $(\tfrac13-1)+2\cdot\tfrac13=0$.
:::

### 8.4. Máy vector hỗ trợ lề mềm và vector hỗ trợ

Mệnh đề 02.39 đưa máy vector hỗ trợ lề mềm về quy hoạch bậc hai. Để xác định mẫu nào quyết định nghiệm, ta lập bài toán đối ngẫu và hệ KKT của quy hoạch đó, với dạng bài toán của Mệnh đề 02.39(a) và Murphy (2022), §17.3.2–17.3.3.

::: proposition Mệnh đề 03.37 (Bài toán đối ngẫu và điều kiện KKT của máy vector hỗ trợ lề mềm) — chứng minh đầy đủ
**Giả thiết.** Dữ liệu $(z_i,y_i)\in\mathbb R^d\times\{-1,+1\}$, $i=1,\ldots,N$; $\rho>0$. Bài toán gốc là quy hoạch bậc hai

$$
\begin{aligned}
&\underset{w,w_0,\xi}{\operatorname{minimize}}\\
&\ \ \tfrac\rho2\lVert w\rVert_2^2+\mathbf 1^T\xi\\
&\text{subject to}\\
&\ 1-y_i(w^Tz_i+w_0)\\
&\quad\ -\xi_i\le0,\\
&\ \ -\xi_i\le0,\quad\forall i,
\end{aligned}
\tag{8.2}
$$

với nhân tử $\alpha_i$ cho ràng buộc lề và $\eta_i$ cho $-\xi_i\le0$. Ký hiệu biên $\omega_i=y_i(w^Tz_i+w_0)$.

**Kết luận.** Đặt

$$
\begin{aligned}
&\Psi(\alpha)=\textstyle\sum_{i=1}^N\alpha_i\\
&\quad-\tfrac1{2\rho}\bigl\lVert\textstyle\sum_i\alpha_iy_iz_i\bigr\rVert_2^2 .
\end{aligned}
\tag{8.3}
$$

1. Với $\alpha,\eta\ge0$: $g(\alpha,\eta)=\Psi(\alpha)$ nếu $\sum_i\alpha_iy_i=0$ và $\alpha_i+\eta_i=1$ với mọi $i$, ngược lại $g=-\infty$. Bài toán đối ngẫu là cực đại $\Psi(\alpha)$ với $\sum_i\alpha_iy_i=0$ và $0\le\alpha_i\le1$.
2. Đối ngẫu mạnh đúng và bài toán đối ngẫu đạt nghiệm.
3. $(w,w_0,\xi)$ là nghiệm khi và chỉ khi có $\alpha$ với $0\le\alpha_i\le1$, $\sum_i\alpha_iy_i=0$, $w=\frac1\rho\sum_i\alpha_iy_iz_i$, $\xi_i=\max(0,1-\omega_i)$, và với mọi $i$:
   - $\omega_i>1\Rightarrow\alpha_i=0$;
   - $\omega_i<1\Rightarrow\alpha_i=1$;
   - $0<\alpha_i<1\Rightarrow \omega_i=1$.
:::

::: proof Chứng minh Mệnh đề 03.37
**Lộ trình.** Tính $g$ bằng cách cực tiểu riêng theo $w$, $w_0$, $\xi$; dùng điểm Slater cho đối ngẫu mạnh; đọc ba trường hợp của bù trừ cho chiều thuận, kiểm bốn nhóm KKT cho chiều ngược.

**Bước 1 (hàm Lagrange).** Gom theo từng biến:

$$
\begin{aligned}
L={}&\frac\rho2\lVert w\rVert_2^2\\
&-w^T\bigl(\textstyle\sum_i\alpha_iy_iz_i\bigr)\\
&-w_0\textstyle\sum_i\alpha_iy_i\\
&+\textstyle\sum_i(1-\alpha_i-\eta_i)\xi_i\\
&+\textstyle\sum_i\alpha_i .
\end{aligned}
$$

**Bước 2 (hàm đối ngẫu).** $L$ affine theo $w_0$ và theo từng $\xi_i$, nên bị chặn dưới chỉ khi các hệ số $\sum_i\alpha_iy_i$ và $1-\alpha_i-\eta_i$ bằng $0$, như trong chứng minh Mệnh đề 03.11. Khi đó, cực tiểu theo $w$ của hàm bậc hai lồi chặt đạt tại $w=\frac1\rho\sum_i\alpha_iy_iz_i$, với giá trị $-\frac1{2\rho}\lVert\sum_i\alpha_iy_iz_i\rVert_2^2$. Điều kiện $\eta_i=1-\alpha_i\ge0$ cho $\alpha_i\le1$. Đây là phần 1.

**Bước 3 (đối ngẫu mạnh).** Điểm $w=0$, $w_0=0$, $\xi_i=2$ cho $1-0-2=-1<0$ và $-\xi_i=-2<0$ với mọi $i$, nên là điểm Slater. Mục tiêu lồi và $p^*\ge0$ hữu hạn. Định lý 03.15(a) cho phần 2.

**Bước 4 (KKT).** Bài toán lồi, khả vi và thỏa điều kiện Slater. Nếu $(w,w_0,\xi)$ là nghiệm, Hệ quả 03.31 cho một bộ $(\alpha,\eta)$ thỏa KKT. Dừng theo $w$, $w_0$, $\xi_i$ cho $w=\frac1\rho\sum_i\alpha_iy_iz_i$, $\sum_i\alpha_iy_i=0$, $\eta_i=1-\alpha_i$; khả thi đối ngẫu cho $0\le\alpha_i\le1$.

**Bước 5 (đọc bù trừ).** Hai điều kiện bù trừ là $\alpha_i(1-\omega_i-\xi_i)=0$ và $\eta_i\xi_i=0$.

- Nếu $\omega_i>1$: $1-\omega_i-\xi_i<0$ vì $\xi_i\ge0$, nên $\alpha_i=0$.
- Nếu $\omega_i<1$: $\xi_i\ge1-\omega_i>0$, nên $\eta_i=0$ và $\alpha_i=1$.
- Nếu $0<\alpha_i<1$: $\eta_i>0$ cho $\xi_i=0$, và $\alpha_i>0$ cho $1-\omega_i-\xi_i=0$, nên $\omega_i=1$.

Với $w,w_0$ cố định, mục tiêu tăng theo $\xi_i$, nên tại nghiệm $\xi_i$ nhận giá trị nhỏ nhất cho phép, $\max(0,1-\omega_i)$. Bốn bước trên cho chiều thuận của phần 3.

**Bước 6 (chiều ngược của phần 3).** Cho $(w,w_0,\xi)$ và $\alpha$ thỏa các điều kiện của phần 3. Đặt $\eta_i=1-\alpha_i\ge0$ và kiểm tra bốn nhóm KKT.

- Khả thi gốc: $\xi_i=\max(0,1-\omega_i)$ thỏa $\xi_i\ge0$ và $\xi_i\ge1-\omega_i$.
- Khả thi đối ngẫu: $\alpha_i\ge0$ và $\eta_i\ge0$.
- Dừng: đúng ba đẳng thức của Bước 4.
- Bù trừ, theo ba trường hợp của $\omega_i$:
   - $\omega_i>1$: $\alpha_i=0$, và $\xi_i=0$ nên $\eta_i\xi_i=0$;
   - $\omega_i=1$: $\xi_i=0$ và $1-\omega_i-\xi_i=0$, nên cả hai tích bằng $0$;
   - $\omega_i<1$: $\alpha_i=1$, $\eta_i=0$, và $\xi_i=1-\omega_i$ nên $1-\omega_i-\xi_i=0$.

Bài toán lồi và khả vi, nên Định lý 03.32 cho $(w,w_0,\xi)$ là nghiệm. $\square$
:::

Kết quả không cần dữ liệu tách được. Khi có $i$ với $0<\alpha_i<1$, hệ số chặn $w_0$ suy ra từ $\omega_i=1$. Mẫu có $\alpha_i=0$ có biên $\omega_i\ge1$ và không xuất hiện trong $w$. Nếu bỏ mẫu đó khỏi tập huấn luyện và dữ liệu còn lại có cả hai nhãn, nghiệm cũ vẫn thỏa các điều kiện của phần 3 cho dữ liệu mới, nên vẫn là nghiệm; $w$ không đổi vì $w$ duy nhất (Mệnh đề 02.39(c)). Mẫu có $\alpha_i>0$ gọi là *vector hỗ trợ* (support vector). Các mẫu này thuộc một trong hai loại:

- nằm đúng trên lề: $0<\alpha_i<1$ và $\omega_i=1$;
- vi phạm lề hoặc nằm trên lề với nhân tử tối đa: $\alpha_i=1$ và $\omega_i\le1$.

Vector $w$ là tổ hợp tuyến tính của riêng các vector hỗ trợ.

::: remark Nhận xét 03.38 (Ba điểm về vector hỗ trợ và hệ số $\rho$)
1. **Mẫu trên lề có thể không là vector hỗ trợ.** Hoạt động không kéo theo nhân tử dương (Nhận xét 03.28): một mẫu có $\omega_i=1$ có thể có $\alpha_i=0$.
2. **Dữ liệu chỉ vào bài toán đối ngẫu qua tích vô hướng.** Theo (8.3), $\Psi$ chứa $z_i$ qua các tích $z_i^Tz_j$. Bài toán đối ngẫu có $N$ biến $\alpha_i$, một biến cho mỗi ràng buộc lề, còn (8.2) có $d+1+N$ biến $w$, $w_0$, $\xi$; Murphy (2022), §17.3.2 cho cùng số biến đối ngẫu $N$ ở máy lề cứng.
3. **Vai trò của $\rho$.** Với bốn khung hình của Tình huống 02.2, $\rho=4$ cho $w$ bằng nửa $w$ của $\rho=1$ và lề rộng gấp đôi.
:::

Hệ KKT thay việc tính $g$ bằng việc giải một hệ hữu hạn điều kiện, với giả thiết được chỉ rõ cho mỗi chiều. Với một bài toán mới, chúng ta cần một trình tự: điều kiện nào kiểm tra trước, khi nào dùng hàm đối ngẫu, khi nào dùng hệ KKT, và kết luận nào được bảo đảm.

## 9. Tổng hợp: quy trình chứng nhận bằng đối ngẫu

Xét bài toán chiếu điểm $(3,2)$ lên miền $\{x\in\mathbb R^2\mid x_1+x_2\le2,\ x_2\ge0\}$. Bài toán có hai ràng buộc, một trong hai có thể không hoạt động, và ta cần một chứng nhận cho nghiệm cùng giá bóng của từng ràng buộc. Thuật toán sau sắp các kết quả về đối ngẫu, điều kiện Slater và hệ KKT theo thứ tự dùng.

::: algorithm Thuật toán 03.39 (Chứng nhận tối ưu bằng đối ngẫu)
**Đầu vào.** Bài toán tối ưu có ràng buộc.

**Đầu ra.** Một phương án $\hat x$, một nhân tử $(\hat\lambda,\hat\nu)$ và khoảng $f_0(\hat x)-g(\hat\lambda,\hat\nu)$; khi khoảng bằng $0$, một chứng nhận tối ưu.

1. Viết bài toán ở dạng (1.1): mọi bất đẳng thức thành $f_i(x)\le0$, đẳng thức thành $Ax=b$, điều kiện còn lại vào miền $D$.
2. Lập hàm Lagrange (5.1) và ghi dấu: $\lambda\ge0$, $\nu$ tự do.
3. Kiểm tra tính lồi (Đ2) với $D=\mathbb R^n$ và tìm một điểm Slater (Đ3). Nếu cả hai có và (Đ5) đúng, Định lý 03.15 cho một nghiệm đối ngẫu $(\lambda^*,\nu^*)$ với $g(\lambda^*,\nu^*)=p^*$; khi bài toán gốc có nghiệm, cặp tương ứng là một chứng nhận tối ưu (Hệ quả 03.10(c)).
4. Nếu các hàm khả vi: lập hệ KKT (Định nghĩa 03.29) và giải theo từng trường hợp của điều kiện bù trừ, loại trường hợp vi phạm khả thi gốc hoặc dấu nhân tử.
5. Nếu bài toán lồi và bước 4 cho một bộ KKT, Định lý 03.32 chứng nhận bộ đó. Nếu bài toán không lồi, bộ KKT chỉ là ứng viên; tính $g$ tại nhân tử tìm được và báo khoảng.
6. Nếu không giải được hệ KKT: tính $g$ theo (5.2), giải hoặc giải gần đúng bài toán đối ngẫu (5.4), lấy phương án khả thi tốt nhất có được và báo khoảng theo Hệ quả 03.10(b).
7. Đọc nhân tử như giá bóng (Hệ quả 03.24), khi hàm giá trị khả vi.

**Điều kiện dừng.** Dừng khi khoảng đối ngẫu của cặp bằng $0$ (chứng nhận tối ưu) hoặc nhỏ hơn ngưỡng sai số cho trước (chứng nhận gần tối ưu theo Mệnh đề 03.2(a)).

**Chi phí.** Bước 4 có tối đa $2^m$ trường hợp bù trừ; với $m$ lớn, bước 4 được thay bằng một bộ giải lặp, và khoảng đối ngẫu của cặp là điều kiện dừng.
:::

Bảng sau ghi cho mỗi kết luận các giả thiết cần, kết quả cung cấp nó, và điều không được suy ra.

| Kết luận | Giả thiết cần | Kết quả | Không được suy ra |
|---|---|---|---|
| $g(\lambda,\nu)\le p^*$ | $\lambda\ge0$ | Định lý 03.8 | $g$ đạt $p^*$ |
| $g$ lõm | không | Mệnh đề 03.6 | $g$ dễ tính |
| $d^*=p^*$, có nghiệm đối ngẫu | (Đ2) với $D=\mathbb R^n$, (Đ3), (Đ5) | Định lý 03.15 | bài toán gốc có nghiệm |
| Bù trừ tại nghiệm | $f_0(x^*)=g(\lambda^*,\nu^*)$ | Mệnh đề 03.27 | hoạt động kéo theo $\lambda_i>0$ |
| Nghiệm thỏa KKT | (Đ4), đối ngẫu mạnh có nghiệm đối ngẫu | Định lý 03.30 | mọi bộ KKT là nghiệm |
| Bộ KKT là nghiệm | (Đ2), (Đ4) | Định lý 03.32 | có bộ KKT |
| $p^*(u,v)\ge p^*-\lambda^{*T}u-\nu^{*T}v$ | đối ngẫu mạnh có nghiệm đối ngẫu | Mệnh đề 03.23 | đẳng thức với nhiễu lớn |

::: example Ví dụ 03.20 (Thuật toán 03.39 cho bài toán chiếu)
**Dữ kiện.** Chiếu $(3,2)$ lên $\{x\mid x_1+x_2\le2,\ x_2\ge0\}$.

**Bước 1–2.** $\min(x_1-3)^2+(x_2-2)^2$ với $f_1=x_1+x_2-2\le0$, $f_2=-x_2\le0$. Hàm Lagrange $L=(x_1-3)^2+(x_2-2)^2+\lambda_1(x_1+x_2-2)-\lambda_2x_2$.

**Bước 3.** Mục tiêu lồi chặt, ràng buộc affine. Điểm $\bar x=(\tfrac12,\tfrac12)$ cho $f_1=-1<0$, $f_2=-\tfrac12<0$. Mục tiêu không âm nên $p^*$ hữu hạn.

**Bước 4.** Dừng: $2(x_1-3)+\lambda_1=0$ và $2(x_2-2)+\lambda_1-\lambda_2=0$.

1. $\lambda_1=\lambda_2=0$: $x=(3,2)$, $f_1=3>0$. Loại.
2. $f_1=0$, $\lambda_2=0$: $x_1=3-\frac{\lambda_1}2$, $x_2=2-\frac{\lambda_1}2$, tổng $5-\lambda_1=2$, $\lambda_1=3$, $x=(1{,}5;\,0{,}5)$; $x_2\ge0$ đúng. Hợp lệ.
3. $\lambda_1=0$, $x_2=0$: dừng thứ hai cho $\lambda_2=-4<0$. Loại.
4. $f_1=0$, $x_2=0$: $x=(2,0)$; dừng thứ nhất cho $\lambda_1=2$, dừng thứ hai cho $\lambda_2=-4+2=-2<0$. Loại.

**Bước 5.** Bộ KKT $x^*=(1{,}5;\,0{,}5)$, $\lambda^*=(3,0)$; bài toán lồi nên đây là nghiệm, $p^*=1{,}5^2+1{,}5^2=4{,}5$.

**Bước 6 (đối chiếu bằng hàm đối ngẫu).** Cực tiểu theo $x$ của $L$ tại $x_1=3-\frac{\lambda_1}2$, $x_2=2-\frac{\lambda_1-\lambda_2}2$ cho

$$
\begin{aligned}
g(\lambda)={}&3\lambda_1-2\lambda_2-\frac{\lambda_1^2}4\\
&-\frac{(\lambda_1-\lambda_2)^2}4 ,
\end{aligned}
$$

và $g(3,0)=9-\tfrac94-\tfrac94=4{,}5=p^*$.

**Bước 7.** Nới ràng buộc thứ nhất thành $x_1+x_2\le2+u$ cho $p^*(u)=\tfrac12(3-u)^2$ với $-1\le u\le3$, đạo hàm tại $0$ bằng $-3=-\lambda_1^*$. Ràng buộc $x_2\ge0$ không hoạt động và có giá bóng $0$.

**Kiểm tra lại.** $x^*$ là hình chiếu của $(3,2)$ lên đường $x_1+x_2=2$: $(3,2)-\tfrac{3}{2}(1,1)=(1{,}5;\,0{,}5)$. Tại $\lambda=(3,0)$: $\frac{\partial g}{\partial\lambda_2}=-2+\frac{3}{2}=-\tfrac12<0$, nên tăng $\lambda_2$ làm $g$ giảm, khớp $\lambda_2^*=0$.
:::

::: exercise Bài tập 03.10 (Quy trình chứng nhận cho một bài toán chiếu)
Chạy Thuật toán 03.39 cho $\min(x_1-2)^2+x_2^2$ với $x_1+x_2\le1$: lập $L$, kiểm tra điều kiện Slater, giải hệ KKT, tính $g$ và kiểm tra khoảng bằng $0$, đọc giá bóng của ràng buộc.
:::

::: hint
Nghiệm là hình chiếu của $(2,0)$ lên đường $x_1+x_2=1$.
:::

::: solution
**Lập mô hình và kiểm tra giả thiết.** $L=(x_1-2)^2+x_2^2+\lambda(x_1+x_2-1)$. Bài toán lồi; $\bar x=(0,0)$ cho $0+0-1=-1<0$.

**Giải hệ KKT.** Dừng: $2(x_1-2)+\lambda=0$, $2x_2+\lambda=0$, nên $x_1=2-\frac\lambda2$, $x_2=-\frac\lambda2$.

1. Trường hợp $\lambda=0$: $x=(2,0)$, vi phạm vì $2>1$. Loại.
2. Trường hợp ràng buộc hoạt động: tổng $2-\lambda=1$, nên $\lambda^*=1$, $x^*=(1{,}5;\,-0{,}5)$ và $p^*=0{,}25+0{,}25=0{,}5$.

**Hàm đối ngẫu.** Thay $x(\lambda)$: $g(\lambda)=\frac{\lambda^2}4+\frac{\lambda^2}4+\lambda\bigl(2-\lambda-1\bigr)=\lambda-\frac{\lambda^2}2$, và $g(1)=0{,}5=p^*$.

**Giá bóng.** $\lambda^*=1$: nới ràng buộc thêm $u$ nhỏ giảm $p^*$ khoảng $u$; thật vậy $p^*(u)=\tfrac12(1-u)^2$ có đạo hàm $-1$ tại $0$.

**Kiểm tra lại.** Dừng tại $x^*$: $2(1{,}5-2)+1=0$ và $2(-0{,}5)+1=0$.
:::

## 10. Ý nghĩa, tác động và giới hạn

Ba bài toán học máy sau được giải theo Thuật toán 03.39; bài toán thứ ba vi phạm giả thiết lồi ở bước 3.

### 10.1. Máy vector hỗ trợ lề mềm: đọc vector hỗ trợ từ nhân tử

::: application Tình huống 03.1 (Máy vector hỗ trợ lề mềm: đọc vector hỗ trợ từ nhân tử)
**Bài toán và dữ liệu.** Bốn khung hình của Tình huống 02.2 có đặc trưng $z=(-2,-1,1,2)$ và nhãn $y=(-1,-1,+1,+1)$. Tình huống 02.2 tìm nghiệm $(w,w_0)=(1,0)$ với $\rho=1$ và $(\tfrac12,0)$ với $\rho=4$ bằng lập luận đối xứng. Câu hỏi mới: mẫu nào quyết định nghiệm, và chứng nhận tối ưu bằng gì.

**Mô hình hóa.** Quy hoạch bậc hai (8.2) với $d=1$: $\min\frac\rho2w^2+\sum_i\xi_i$ với $1-y_i(wz_i+w_0)-\xi_i\le0$, $-\xi_i\le0$; nhân tử $\alpha_i$ cho ràng buộc lề.

**Xác minh giả thiết.** Mệnh đề 03.37 áp dụng: bài toán lồi, có điểm Slater, và có nghiệm vì mỗi nhãn có hai mẫu; điều kiện của phần 3 là cần và đủ.

**Áp dụng với $\rho=1$.** Giả thiết thử: hai mẫu trong ($z=\pm1$) nằm đúng trên lề với $0<\alpha_i<1$, hai mẫu ngoài có $\alpha_i=0$. Lề bằng $1$ tại $z=1$ và $z=-1$ cho $w+w_0=1$ và $w-w_0=1$, nên $w=1$, $w_0=0$. Dừng theo $w$ và $w_0$:

$$
\begin{aligned}
\rho w&=\alpha_2(-1)(-1)+\alpha_3(1)(1),\\
0&=-\alpha_2+\alpha_3,
\end{aligned}
$$

cho $\alpha_2=\alpha_3=\tfrac12\in(0,1)$. Hai mẫu ngoài có biên $\omega=2>1$, đúng với $\alpha=0$. Mọi điều kiện của Mệnh đề 03.37 phần 3 thỏa, nên $(w,w_0)=(1,0)$ là nghiệm, với $\alpha^*=(0,\tfrac12,\tfrac12,0)$.

**Áp dụng với $\rho=4$.** Giả thiết thử của $\rho=1$ cho $\alpha_2=\alpha_3=\frac{\rho w}2=2>1$, vi phạm khả thi đối ngẫu, nên bị loại. Giả thiết thử thứ hai: hai mẫu trong vi phạm lề với $\alpha=1$, hai mẫu ngoài nằm trên lề. Lề bằng $1$ tại $z=\pm2$ cho $2w+w_0=1$, $2w-w_0=1$, nên $w=\tfrac12$, $w_0=0$. Dừng theo $w$: $4\cdot\tfrac12=2\alpha_1+1+1+2\alpha_4$, nên $\alpha_1+\alpha_4=0$, tức $\alpha_1=\alpha_4=0$; dừng theo $w_0$: $-\alpha_1-\alpha_2+\alpha_3+\alpha_4=0-1+1+0=0$. Hai mẫu trong có $\omega=\tfrac12<1$, đúng với $\alpha=1$, và $\xi=\tfrac12$. Nghiệm $(w,w_0)=(\tfrac12,0)$, $\alpha^*=(0,1,1,0)$.

**Kiểm tra lại.** Theo (8.3): với $\rho=1$, $\Psi(\alpha^*)=1-\tfrac12\cdot1^2=\tfrac12$; với $\rho=4$, $\Psi(\alpha^*)=2-\tfrac18\cdot2^2=\tfrac32$. Hai số trùng giá trị gốc $\tfrac12$ và $\tfrac32$ của Tình huống 02.2, nên khoảng bằng $0$.

**Diễn giải và giới hạn.** Trong cả hai trường hợp, vector hỗ trợ là hai khung hình $z=\pm1$, gần biên quyết định nhất; bỏ hai khung $z=\pm2$ thì nghiệm cũ vẫn là nghiệm của bài toán mới và $w$ không đổi. Với $\rho=4$, hai khung ngoài nằm đúng trên lề nhưng có $\alpha=0$, trường hợp hoạt động mà nhân tử bằng $0$ của Nhận xét 03.28. Cách đoán trước cấu trúc hoạt động rồi kiểm tra chỉ khả thi với ít mẫu: có $3^N$ cách gán ba loại cho $N$ mẫu.

**Dẫn ngược lý thuyết.** Mệnh đề 03.37; Định lý 03.15, Hệ quả 03.31, Định lý 03.32; Hệ quả 03.10(c); Nhận xét 03.28.
:::

### 10.2. Hồi quy có ràng buộc chuẩn: hệ số phạt ứng với mức chặn

::: application Tình huống 03.2 (Hồi quy có ràng buộc chuẩn trên năm quan sát: hệ số phạt ứng với mức chặn)
**Bài toán và dữ liệu.** Năm quan sát của Ví dụ 02.1(a): ma trận thiết kế $X$ có cột thứ nhất là vector đặc trưng $(-2,-1,0,1,2)$ (Ví dụ 02.1(a) viết là $u$) và cột thứ hai là $\mathbf 1$, đầu ra $y=(-2,-1,3,1,2)$, $w=(w_1,w_0)$, với $X^TX=\operatorname{diag}(10,5)$ và $X^Ty=(10,3)$, nên

$$
\begin{aligned}
J(w)={}&10w_1^2+5w_0^2\\
&-20w_1-6w_0+19 .
\end{aligned}
$$

Nghiệm bình phương nhỏ nhất $w(0)=(1;\,0{,}6)$ có $\lVert w(0)\rVert_2^2=1{,}36$. Yêu cầu: với ràng buộc $\lVert w\rVert_2^2\le\tau$, $\tau=0{,}29$ và $\tau=0{,}5$, tìm hệ số phạt tương ứng và đo giá bóng của ràng buộc.

**Mô hình hóa và xác minh giả thiết.** $\min J(w)$ với $\lVert w\rVert_2^2-\tau\le0$. Mục tiêu lồi chặt, ràng buộc lồi, $w=0$ là điểm Slater, tập khả thi đóng và bị chặn. Mệnh đề 03.34, 03.35 và Thuật toán 03.36 áp dụng.

**Áp dụng với $\tau=0{,}29$.** Dừng $(X^TX+\lambda I)w=X^Ty$ cho $w=\bigl(\frac{10}{10+\lambda},\frac3{5+\lambda}\bigr)$. Trường hợp $\lambda=0$ bị loại vì $1{,}36>0{,}29$. Với $\lambda=10$, $w=(0{,}5;\,0{,}2)$ và $\lVert w\rVert_2^2=0{,}25+0{,}04=0{,}29$; theo Mệnh đề 03.35, nghiệm của $\varphi(\rho)=0{,}29$ là duy nhất, nên $\lambda^*=10$. Đây là nghiệm ridge của Ví dụ 02.18, với $J^*=\tfrac{21}2$.

**Áp dụng với $\tau=0{,}5$.** Chọn sai số $\varepsilon=0{,}05$. Bước 2 của Thuật toán 03.36: $\rho_{\mathrm{hi}}$ nhân đôi qua $1,2,4,8$, với $\varphi(\rho_{\mathrm{hi}})-\tau$ lần lượt $0{,}5764$; $0{,}3781$; $0{,}1213$; $-0{,}1381$. Bước 3, ba trong tám lần lặp:

| Lần | $\rho_{\mathrm{lo}}$ | $\rho_{\mathrm{hi}}$ | $\rho_{\mathrm{mid}}$ | $\varphi-\tau$ |
|---|---|---|---|---|
| 1 | $0$ | $8$ | $4$ | $0{,}12132$ |
| 2 | $4$ | $8$ | $6$ | $-0{,}03499$ |
| 8 | $5{,}4375$ | $5{,}5$ | $5{,}46875$ | $0{,}00004$ |

Các lần 3 đến 7 lần lượt thử $\rho_{\mathrm{mid}}=5$; $5{,}5$; $5{,}25$; $5{,}375$; $5{,}4375$. Sau tám lần, $\rho_{\mathrm{hi}}-\rho_{\mathrm{lo}}=0{,}03125\le\varepsilon$ và $\lambda^*\in(5{,}46875;\,5{,}5]$. Thuật toán trả về $\rho_{\mathrm{hi}}=5{,}5$: $w\approx(0{,}64516;\,0{,}28571)$, $\lVert w\rVert_2^2\approx0{,}49787$, $J\approx8{,}95298$. Cận sai số của thuật toán là $5{,}5\cdot(0{,}5-0{,}49787)\approx0{,}0117$; giải chính xác cho $\lambda^*\approx5{,}4693$, $J^*\approx8{,}94128$, chênh $0{,}0117$.

**Kiểm tra lại.** Tại $\tau=0{,}29$, dừng: $(10+10)\cdot0{,}5=10$ và $(5+10)\cdot0{,}2=3$, đúng $X^Ty$. Gọi $J^*(\tau)$ là giá trị tối ưu với mức chặn $\tau$. Theo (7.2) với $\lambda^*=10$ tại $\tau=0{,}29$: $J^*(0{,}5)\ge10{,}5-10\cdot0{,}21=8{,}4$, đúng với $8{,}941$.

**Diễn giải và giới hạn.** Mức chặn $0{,}29$ tương đương số hạng phạt ridge $J+10\lVert w\rVert_2^2$; Mệnh đề 03.34 cho chiều ngược của Mệnh đề 02.26. Giá bóng $10$ nghĩa là tăng mức chặn từ $0{,}29$ thêm $0{,}01$ giảm tổng bình phương sai số khoảng $0{,}1$; ở mức chặn $0{,}5$, giá bóng khoảng $5{,}47$. Cận $8{,}4$ thấp hơn $J^*(0{,}5)\approx8{,}941$ một lượng $0{,}54$.

**Dẫn ngược lý thuyết.** Định lý 03.15 với điểm Slater $w=0$; Định lý 03.32; Mệnh đề 03.34, 03.35; Thuật toán 03.36; Mệnh đề 03.23, Hệ quả 03.24.
:::

### 10.3. Chọn dữ liệu để gán nhãn: giả thiết lồi không thỏa

::: application Tình huống 03.3 (Chọn dữ liệu để gán nhãn: giả thiết lồi không thỏa)
**Bài toán và dữ liệu.** Tình huống 02.3: ba tập dữ liệu $\mathrm A$, $\mathrm B$, $\mathrm C$ với số mẫu hữu ích $8$, $5$, $5$ nghìn, chi phí gán nhãn $4$, $3$, $3$ triệu đồng và ngân sách $6$ triệu đồng. Phương án tối ưu, tìm bằng liệt kê, là $\{\mathrm B,\mathrm C\}$ với $10$ nghìn mẫu. Câu hỏi: nới lỏng Lagrange cho gì khi bài toán không lồi.

**Mô hình hóa.** Bài toán cực tiểu trên $D=\{0,1\}^3$: $\min-8x_{\mathrm A}-5x_{\mathrm B}-5x_{\mathrm C}$ với $f_1=4x_{\mathrm A}+3x_{\mathrm B}+3x_{\mathrm C}-6\le0$; $p^*=-10$.

**Xác minh giả thiết.** $D$ rời rạc, không lồi. Định lý 03.15 và Định lý 03.32 không áp dụng; Định lý 03.8 và Mệnh đề 03.6 vẫn áp dụng.

**Áp dụng.** Gom theo biến: $L=-6\lambda+(4\lambda-8)x_{\mathrm A}+(3\lambda-5)(x_{\mathrm B}+x_{\mathrm C})$. Cực tiểu trên $\{0,1\}$ từng biến cho

$$
\begin{aligned}
g(\lambda)={}&-6\lambda+\min(0,4\lambda-8)\\
&+2\min(0,3\lambda-5).
\end{aligned}
$$

Hàm này tuyến tính từng khúc:

1. $0\le\lambda\le\tfrac53$: $g=4\lambda-18$;
2. $\tfrac53\le\lambda\le2$: $g=-2\lambda-8$;
3. $\lambda\ge2$: $g=-6\lambda$.

Cực đại tại $\lambda^*=\tfrac53$: $d^*=\tfrac{20}3-18=-\tfrac{34}3$. Khoảng đối ngẫu tối ưu là $-10+\tfrac{34}3=\tfrac43>0$.

**Đọc trên mặt phẳng giá trị.** Tám phương án cho tám điểm $(u,t)=(f_1,f_0)$:

- $\varnothing\mapsto(-6,0)$, $\{\mathrm A\}\mapsto(-2,-8)$;
- $\{\mathrm B\}$ và $\{\mathrm C\}\mapsto(-3,-5)$, $\{\mathrm B,\mathrm C\}\mapsto(0,-10)$;
- $\{\mathrm A,\mathrm B\}$ và $\{\mathrm A,\mathrm C\}\mapsto(1,-13)$, $\{\mathrm A,\mathrm B,\mathrm C\}\mapsto(4,-18)$.

Đường cận $t=-\tfrac{34}3-\tfrac53u$ đi qua ba điểm $(-2,-8)$, $(1,-13)$, $(4,-18)$ và cắt trục tung tại $-11{,}33$, thấp hơn điểm tối ưu $(0,-10)$. Vì $d^*=-\tfrac{34}3<-10=p^*$, theo Mệnh đề 03.20 không có siêu phẳng đỡ không thẳng đứng nào của $\mathcal A$ tại $(0,-10)$, và không có nhân tử chứng nhận.

**Hậu quả của giả thiết bị vi phạm.**

1. Không nhân tử nào chứng nhận được $\{\mathrm B,\mathrm C\}$: mọi $g(\lambda)\le-\tfrac{34}3<-10$.
2. Các điểm cực tiểu của $L(\cdot,\tfrac53)$ có $x_{\mathrm A}=1$ và $x_{\mathrm B},x_{\mathrm C}$ tùy ý; trong đó chỉ $\{\mathrm A\}$ khả thi, với $8$ nghìn mẫu, kém tối ưu $20\%$. Phương án tối ưu $\{\mathrm B,\mathrm C\}$ cho $L=-10>-\tfrac{34}3$, nên không cực tiểu hóa $L$: đọc nghiệm từ hàm Lagrange dẫn sai hướng, như nghiệm nới lỏng của Tình huống 02.3.
3. Hệ quả 03.24 không áp dụng vì $d^*<p^*$, và hàm giá trị gián đoạn tại $u=0$: $p^*(u)=-8$ với $-2\le u<0$, $p^*(u)=-10$ với $0\le u<1$; $\lambda^*=\tfrac53$ không là giá bóng theo nghĩa đạo hàm.

**Kiểm tra lại.** Cận $-\tfrac{34}3$ trùng giá trị nới lỏng tuyến tính $\tfrac{34}3$ của Tình huống 02.3 sau khi đổi dấu. $g(2)=-12$ và $g(1)=-14$, đều nhỏ hơn $g(\tfrac53)\approx-11{,}33$.

**Diễn giải và giới hạn.** Cận đối ngẫu bằng cận của nới lỏng tuyến tính, nên cho cùng kết luận với Tình huống 02.3: số mẫu tối ưu không vượt $11$ nghìn. Chứng nhận chính xác cần liệt kê các phương án.

**Dẫn ngược lý thuyết.** Định lý 03.8, Mệnh đề 03.6 (áp dụng được); Định nghĩa 03.18, Mệnh đề 03.20 (đọc hình); Định lý 03.15, 03.32, Hệ quả 03.24 (giả thiết bị vi phạm).
:::

### 10.4. Ứng dụng trong học máy

Các công cụ của bài áp dụng cho các nhóm bài toán học máy sau:

- **Chính quy hóa.** Mỗi ràng buộc chuẩn của bài toán lồi có điểm Slater tương đương một hệ số phạt bằng nhân tử của ràng buộc chuẩn (Mệnh đề 03.34, Tình huống 03.2); chọn $\rho$ bằng *kiểm định chéo* (cross-validation) vì vậy tương đương chọn mức chặn, với hồi quy ridge là trường hợp riêng.
- **Máy vector hỗ trợ.** Bài toán đối ngẫu và vector hỗ trợ xuất phát từ Mệnh đề 03.37 (Tình huống 03.1).
- **Phân phối *entropy cực đại* (maximum entropy) và softmax.** Điều kiện KKT của bài toán entropy cực đại với ràng buộc kỳ vọng cho dạng mũ của phân phối (Murphy (2022), §3.4.4), với hồi quy logistic đa lớp là trường hợp riêng (Murphy (2022), §10.3.6).
- **Nới lỏng Lagrange cho bài toán rời rạc.** Chọn dữ liệu để gán nhãn có ngân sách: đối ngẫu cho cận nhưng có thể có khoảng dương (Tình huống 03.3).

### 10.5. Tóm tắt

Cận dưới đúng theo $x$ của hàm Lagrange là hàm đối ngẫu, luôn lõm, và tại mọi $\lambda\ge0$ là cận dưới của $p^*$; bài toán đối ngẫu chọn cận tốt nhất. Với bài toán lồi có điểm Slater và $p^*$ hữu hạn, cận tốt nhất bằng $p^*$ và đạt tại một nhân tử. Trên mặt phẳng giá trị, nhân tử là số đối của độ dốc của đường cận, và khi hàm giá trị khả vi, nó là giá bóng của ràng buộc. Các dấu bằng trong chuỗi đối ngẫu yếu cho hệ KKT, cần khi có đối ngẫu mạnh với cả hai phía đạt nghiệm, đủ khi bài toán lồi.

Do đó, Câu hỏi mở đầu có câu trả lời $\lambda=2$: $g$ đạt giá trị $5$ tại đúng $\lambda=2$ (Ví dụ 03.4); với $\lambda>2$, điểm cực tiểu của $L(\cdot,\lambda)$ khả thi nhưng khác $x^*=2$, nên không thỏa điều kiện của Mệnh đề 03.27 phần 2.

| Nội dung | Kết quả cần tra lại |
|---|---|
| Cận dưới và chứng nhận tối ưu | Định nghĩa 03.1; Mệnh đề 03.2; Nhận xét 03.3 |
| Hàm và bài toán đối ngẫu | Định nghĩa 03.4, 03.5, 03.9; Mệnh đề 03.6, 03.11; Định lý 03.8; Hệ quả 03.10; Nhận xét 03.7 |
| Đối ngẫu mạnh và điều kiện Slater | Định nghĩa 03.12, 03.13; Bổ đề 03.14; Định lý 03.15; Nhận xét 03.16, 03.17 |
| Hình học và độ nhạy | Định nghĩa 03.18, 03.22; Mệnh đề 03.19, 03.20, 03.23; Hệ quả 03.24; Nhận xét 03.21, 03.25 |
| Điều kiện KKT | Định nghĩa 03.26, 03.29; Mệnh đề 03.27; Định lý 03.30, 03.32; Hệ quả 03.31; Nhận xét 03.28, 03.33 |
| Hồi quy có ràng buộc chuẩn, máy vector hỗ trợ | Mệnh đề 03.34, 03.35, 03.37; Thuật toán 03.36; Nhận xét 03.38 |
| Quy trình chứng nhận | Thuật toán 03.39 |

Các công thức cần nhớ gồm:

- hàm Lagrange (5.1), hàm đối ngẫu (5.2) và đối ngẫu yếu (5.3);
- điều kiện dừng (8.1) và điều kiện bù trừ $\lambda_if_i(x)=0$;
- độ nhạy toàn cục (7.2) và độ nhạy địa phương (7.3).

Các giả thiết cần nhớ là (Đ1)–(Đ5), dấu $\lambda\ge0$ trong đối ngẫu yếu, và cột "Không được suy ra" của bảng ở §9.

## 11. Bài tập

Các bài tập trong thân bài và mục tiêu học tập mà mỗi bài kiểm tra:

1. **Bài tập 03.1** (Hai cận dưới cho một bài toán có ràng buộc chặn dưới): mục tiêu 1; cận dưới và khoảng chứng nhận.
2. **Bài tập 03.2** (Đối ngẫu của bài toán hàm tuyến tính trên hình tròn): mục tiêu 1, 2; hàm đối ngẫu, miền hữu hiệu và chứng nhận từ một cặp.
3. **Bài tập 03.3** (Đối ngẫu của một quy hoạch tuyến tính hai biến): mục tiêu 2; Mệnh đề 03.11 và nhân tử bằng $0$.
4. **Bài tập 03.4** (Kiểm tra điều kiện Slater cho ba bài toán): mục tiêu 3; điều kiện Slater, dạng yếu và $p^*$ hữu hạn.
5. **Bài tập 03.5** (Hai hình tròn tiếp xúc): mục tiêu 3; đối ngẫu mạnh khi không có điểm Slater.
6. **Bài tập 03.6** (Mặt phẳng giá trị và hàm giá trị của một bài toán một biến): mục tiêu 4; đường cận và độ nhạy.
7. **Bài tập 03.7** (Hệ KKT của một bài toán hai biến): mục tiêu 5; giải KKT và đối chiếu với bài toán đối ngẫu.
8. **Bài tập 03.8** (Bốn trường hợp bù trừ): mục tiêu 5, 4; bù trừ và giá bóng.
9. **Bài tập 03.9** (Hồi quy ba trọng số với ràng buộc chuẩn): mục tiêu 6; ràng buộc chặn và số hạng phạt.
10. **Bài tập 03.10** (Quy trình chứng nhận cho một bài toán chiếu): mục tiêu 5, 6; Thuật toán 03.39.

Các bài tập tiếp theo củng cố toàn bài, chia theo ba mức.

### 11.1. Mức nhận biết

::: exercise Bài tập 03.11 (Đúng hay sai)
Xác định mỗi khẳng định đúng hay sai, và nêu căn cứ hoặc phản ví dụ.

- (i) Hàm đối ngẫu có thể nhận giá trị $+\infty$.
- (ii) Bài toán đối ngẫu của một bài toán không lồi là bài toán cực đại một hàm lõm trên một tập lồi.
- (iii) Điều kiện Slater bảo đảm bài toán gốc có nghiệm.
- (iv) Nếu $d^*=p^*$ thì mọi nghiệm gốc thỏa KKT với một nhân tử nào đó.
- (v) Nhân tử của một ràng buộc đẳng thức phải không âm.
- (vi) Nếu $(x^*,\lambda^*)$ là cặp tối ưu với khoảng $0$ và $\lambda_i^*>0$ thì ràng buộc $i$ hoạt động tại $x^*$.
- (vii) Một bài toán có một ràng buộc bất đẳng thức có tập giá trị $G$ nằm phía trên đường $t=3-u$, tức $t+u\ge3$ trên $G$, và tiếp xúc với đường đó. Khi đó $g(1)=3$, và mọi phương án khả thi có giá trị mục tiêu ít nhất $3$.
- (viii) Nếu $x$ khả thi, $\lambda$ khả thi đối ngẫu và $f_0(x)-g(\lambda)=0{,}5$ thì khoảng đối ngẫu tối ưu bằng $0{,}5$.
:::

::: hint
Với mỗi khẳng định, xét giả thiết của kết quả tương ứng: Mệnh đề 03.6, Định nghĩa 03.9, 03.12, Định lý 03.15, 03.30, Mệnh đề 03.19, 03.27.
:::

::: solution
- **(i) Sai.** Với $x_0\in D$, $g(\lambda,\nu)\le L(x_0,\lambda,\nu)<\infty$.
- **(ii) Đúng.** Theo Mệnh đề 03.6, $g$ lõm và $\operatorname{dom}g$ lồi, kể cả khi bài toán gốc không lồi.
- **(iii) Sai.** Ví dụ 03.11: $\min e^x$ với $x\le0$ có điểm Slater nhưng không có nghiệm.
- **(iv) Sai.** Ví dụ 03.10, bài toán thứ nhất: $d^*=p^*=0$, nghiệm $x^*=0$ không thỏa điều kiện dừng; bài toán đối ngẫu không đạt nghiệm.
- **(v) Sai.** Ví dụ 03.18(b) có $\nu=-2$.
- **(vi) Đúng.** Mệnh đề 03.27 phần 1: $\lambda_i^*f_i(x^*)=0$ với $\lambda_i^*>0$ cho $f_i(x^*)=0$.
- **(vii) Đúng.** Đường có độ dốc $-1$, nên $\lambda=1$. Theo Mệnh đề 03.19, tung độ gốc của đường cận tiếp xúc với tập giá trị là $g(1)=3$, và Định lý 03.8 cho $3\le p^*$.
- **(viii) Sai.** Theo Hệ quả 03.10(b), khoảng đối ngẫu của cặp là cận trên của khoảng tối ưu: $p^*-d^*\le0{,}5$. Ở bài toán (3.1), điểm $x=2$ khả thi với $f_0(2)=5$ và $g(1)=4{,}5$ (Ví dụ 03.3), nên cặp $(2,1)$ có khoảng $0{,}5$, trong khi $p^*=d^*=5$.

**Kiểm tra lại.** Ở (i), với bài toán (3.1) và $x_0=0$: $g(1)=4{,}5\le L(0,1)=9$. Ở (iii), $e^x$ tại $x=-10$ bằng khoảng $4{,}5\cdot10^{-5}>0$, nên giá trị $0$ không đạt. Ở (viii), khoảng của cặp $0{,}5$ không nhỏ hơn khoảng tối ưu $0$.
:::

::: exercise Bài tập 03.12 (Tìm lỗi trong một lời giải)
Một lời giải cho $\min x^2$ với $x\ge2$ viết: "$L=x^2+\lambda(x-2)$, $\lambda\ge0$. Cực tiểu theo $x$ trên tập $x\ge2$ đạt tại $x=2$, nên $g(\lambda)=4$ với mọi $\lambda$, và $d^*=4=p^*$." Chỉ ra hai lỗi, sửa lại và tính đúng $g$, $d^*$.
:::

::: hint
Viết lại ràng buộc về dạng $f_1\le0$; kiểm tra miền lấy cận dưới đúng.
:::

::: solution
**Lỗi thứ nhất.** Ràng buộc $x\ge2$ phải viết $2-x\le0$; với $x-2$, dấu sai và cận không còn hợp lệ.

**Lỗi thứ hai.** Cận dưới đúng phải lấy trên toàn $\mathbb R$, không áp lại $x\ge2$ (Nhận xét 03.7).

**Sửa lại.** $L=x^2+\lambda(2-x)$ cực tiểu tại $x=\frac\lambda2$, nên $g(\lambda)=2\lambda-\frac{\lambda^2}4$. Cực đại tại $\lambda=4$, $d^*=8-4=4=p^*$.

**Kiểm tra lại.** Với $\lambda=4$, $L=(x-2)^2+4\ge4$, bằng $4$ tại $x=2$ khả thi.
:::

### 11.2. Mức tính toán hoặc chứng minh

::: exercise Bài tập 03.13 (Cách viết ràng buộc thay đổi bài toán đối ngẫu)
Xét $\min x^2$ với ràng buộc $x\ge1$, viết theo hai cách:

- (a) $1-x\le0$;
- (b) $(1-x)^3\le0$.

Chứng minh hai cách có cùng tập khả thi, tính $d^*$ cho từng cách, và giải thích sự khác biệt bằng các giả thiết của Định lý 03.15.
:::

::: hint
Với (b), xét $L$ khi $x\to+\infty$ và $\lambda>0$.
:::

::: solution
**Tập khả thi.** $s\mapsto s^3$ tăng chặt, nên $(1-x)^3\le0$ khi và chỉ khi $1-x\le0$.

**Cách (a).** $L=x^2+\lambda(1-x)$ cho $g(\lambda)=\lambda-\frac{\lambda^2}4$, $d^*=g(2)=1=p^*$.

**Cách (b).** Với $\lambda>0$, $L=x^2+\lambda(1-x)^3\to-\infty$ khi $x\to+\infty$ vì số hạng bậc ba chiếm ưu thế, nên $g(\lambda)=-\infty$; $g(0)=\inf x^2=0$. Vậy $d^*=0<1$.

**Giải thích.** Cách (b) có điểm $\bar x=2$ với $(1-2)^3=-1<0$, nhưng $(1-x)^3$ có đạo hàm bậc hai $6(1-x)<0$ khi $x>1$, nên không lồi; giả thiết lồi của Định lý 03.15 bị vi phạm. Bài toán đối ngẫu phụ thuộc cách viết ràng buộc, không chỉ phụ thuộc tập khả thi.

**Kiểm tra lại.** Ở (a) với $\lambda=2$: $L=x^2+2(1-x)=(x-1)^2+1\ge1$, bằng $1$ tại $x=1$ khả thi. Ở (b) với $\lambda=1$ và $x=10$: $L=100-729=-629$.
:::

::: exercise Bài tập 03.14 (Bài toán nghiệm chuẩn nhỏ nhất)
Cho $A\in\mathbb R^{p\times n}$ có các hàng độc lập tuyến tính và $b\in\mathbb R^p$.

- (a) Chứng minh hàm đối ngẫu của $\min\lVert x\rVert_2^2$ với $Ax=b$ là $g(\nu)=-\tfrac14\nu^TAA^T\nu-b^T\nu$.
- (b) Áp dụng cho $A=\mathbf 1^T\in\mathbb R^{1\times3}$, $b=3$: giải bài toán đối ngẫu, khôi phục $x^*$ và kiểm tra khoảng bằng $0$.
:::

::: hint
Dừng theo $x$: $2x+A^T\nu=0$.
:::

::: solution
**Câu (a).** $L=x^Tx+\nu^T(Ax-b)$ lồi chặt theo $x$, cực tiểu tại $x=-\tfrac12A^T\nu$. Thay vào: $\tfrac14\nu^TAA^T\nu-\tfrac12\nu^TAA^T\nu-b^T\nu=-\tfrac14\nu^TAA^T\nu-b^T\nu$.

**Câu (b).** $AA^T=\mathbf 1^T\mathbf 1=3$, nên $g(\nu)=-\tfrac34\nu^2-3\nu$. $g'(\nu)=-\tfrac32\nu-3=0$ tại $\nu^*=-2$, $d^*=-3+6=3$. Khôi phục $x=-\tfrac12A^T\nu^*=(1,1,1)$, thỏa $\mathbf 1^Tx=3$, với $\lVert x\rVert_2^2=3=d^*$.

**Kiểm tra lại.** Theo Cauchy–Schwarz, $3=\mathbf 1^Tx\le\sqrt3\lVert x\rVert_2$, nên $\lVert x\rVert_2^2\ge3$ trên tập khả thi.
:::

### 11.3. Mức vận dụng

::: exercise Bài tập 03.15 (Entropy cực đại và softmax)
Tìm phân phối $\pi\in\mathbb R^k$, $\pi_i>0$, cực tiểu $\sum_i\pi_i\log\pi_i$ (tức cực đại entropy) với $\sum_i\pi_i=1$ và $\sum_i\pi_i\theta_i=\bar\theta$ cho trước. Gọi $\nu_1$, $\nu_2$ là nhân tử của hai đẳng thức.

- (a) Chứng minh bài toán lồi và mọi bộ KKT là nghiệm.
- (b) Từ điều kiện dừng, chứng minh $\pi_i=\frac{e^{-\nu_2\theta_i}}{\sum_je^{-\nu_2\theta_j}}$.
- (c) Với $k=3$, $\theta=(0,1,2)$, $\bar\theta=\tfrac47$, tìm $\pi$, $\nu_2$ và $\nu_1$.
:::

::: hint
Miền $D=\{\pi\in\mathbb R^k\mid\pi_i>0\ \forall i\}$ mở, lồi; $(\pi_i\log\pi_i)''=\frac1{\pi_i}>0$. Với (c), đặt $s=e^{-\nu_2}$.
:::

::: solution
**Câu (a).** Mục tiêu là tổng các hàm lồi chặt một biến trên $D$ mở, lồi; hai ràng buộc affine. Theo Định lý 03.32 với $D$ mở, lồi, một bộ KKT là nghiệm.

**Câu (b).** Dừng: $\log\pi_i+1+\nu_1+\nu_2\theta_i=0$, nên $\pi_i=e^{-1-\nu_1}e^{-\nu_2\theta_i}$. Ràng buộc tổng cho $e^{-1-\nu_1}=\bigl(\sum_je^{-\nu_2\theta_j}\bigr)^{-1}$, ra dạng softmax.

**Câu (c).** Với $s=e^{-\nu_2}>0$, theo (b), $\pi=\frac{(1,s,s^2)}{1+s+s^2}$, và ràng buộc kỳ vọng là

$$
\frac{s+2s^2}{1+s+s^2}=\frac47 .
$$

Nhân chéo: $7s+14s^2=4+4s+4s^2$, tức $10s^2+3s-4=0$, có nghiệm dương duy nhất $s=\frac{-3+13}{20}=\tfrac12$. Vậy $\pi=(\tfrac47,\tfrac27,\tfrac17)$ và $\nu_2=\log2\approx0{,}6931$. Từ $\pi_1=e^{-1-\nu_1}=\tfrac47$: $\nu_1=-1+\log\tfrac74\approx-0{,}4404$.

**Diễn giải.** Lớp softmax là phân phối entropy cực đại thỏa ràng buộc kỳ vọng; logit $-\nu_2\theta_i$ là nhân tử nhân với đặc trưng.

**Kiểm tra lại.** $\tfrac47+\tfrac27+\tfrac17=1$ và $0\cdot\tfrac47+1\cdot\tfrac27+2\cdot\tfrac17=\tfrac47$. Tỷ số giữa hai xác suất liên tiếp bằng $\tfrac12=e^{-\nu_2}$.
:::

::: exercise Bài tập 03.16 (Máy vector hỗ trợ trên ba mẫu)
Xét bài toán (8.2) với $d=1$ trên ba mẫu một chiều $z=(0,2,3)$ với nhãn $y=(-1,+1,+1)$.

- (a) Với $\rho=1$, chứng minh $(w,w_0)=(1,-1)$ là nghiệm của (8.2) bằng cách tìm $\alpha$ thỏa Mệnh đề 03.37 phần 3.
- (b) Xác định vector hỗ trợ.
- (c) Tìm mọi $\rho>0$ để $(1,-1)$ vẫn là nghiệm.
:::

::: hint
Biên tại ba mẫu là $1$, $1$, $2$. Dừng theo $w$: $\rho w=\sum_i\alpha_iy_iz_i$.
:::

::: solution
**Câu (a).** Biên $\omega=(-(0-1),\,2-1,\,3-1)=(1,1,2)$. Mẫu thứ ba có $\omega>1$, nên $\alpha_3=0$. Dừng theo $w$: $1=2\alpha_2$, $\alpha_2=\tfrac12$. Dừng theo $w_0$: $-\alpha_1+\alpha_2=0$, $\alpha_1=\tfrac12$. Hai mẫu đầu có $0<\alpha<1$ và $\omega=1$, đúng. Mọi điều kiện thỏa, nên $(1,-1)$ là nghiệm.

**Câu (b).** Vector hỗ trợ là $z=0$ và $z=2$.

**Câu (c).** Chiều đủ: với $(w,w_0)=(1,-1)$, các biên vẫn là $(1,1,2)$ với mọi $\rho$, nên $\alpha_3=0$; dừng cho $\alpha_1=\alpha_2=\frac\rho2$, hợp lệ khi $\frac\rho2\le1$. Vậy $(1,-1)$ là nghiệm khi $0<\rho\le2$. Chiều cần: nếu $\rho>2$ mà $(1,-1)$ là nghiệm, chiều thuận của Mệnh đề 03.37 phần 3 cho một $\alpha$ với $\alpha_3=0$, vì $\omega_3=2>1$. Dừng theo $w$ cho $\rho=2\alpha_2$, tức $\alpha_2=\frac\rho2>1$, trái với $\alpha_2\le1$. Vậy tập các $\rho$ cần tìm là $(0,2]$.

**Kiểm tra lại.** Với $\rho=1$, giá trị gốc $\tfrac12\cdot1^2+0=\tfrac12$ và giá trị đối ngẫu $\Psi(\alpha)=1-\tfrac12\cdot1^2=\tfrac12$.
:::

::: exercise Bài tập 03.17 (Giá bóng của ngân sách tính toán)
Ba mô-đun của một hệ thống nhận được $x_i>0$ giờ trên *đơn vị xử lý đồ họa* (graphics processing unit, GPU). Giả sử sai số của mô-đun $i$ là $c_i/x_i$ với $c=(1,4,9)$, và tổng ngân sách là $\sum_ix_i\le12$.

- (a) Giải bằng hệ KKT.
- (b) Tính giá bóng của ngân sách.
- (c) So sánh xấp xỉ bậc nhất và giá trị đúng khi ngân sách tăng lên $13$.
:::

::: hint
Dừng: $-\frac{c_i}{x_i^2}+\lambda=0$, nên $x_i=\sqrt{c_i/\lambda}$.
:::

::: solution
**Câu (a).**

1. Trường hợp $\lambda=0$: dừng đòi $-\frac{c_i}{x_i^2}=0$, vô nghiệm. Loại.
2. Trường hợp ngân sách hoạt động: $\sum_i\sqrt{c_i}/\sqrt\lambda=12$ với $\sum_i\sqrt{c_i}=6$, nên $\sqrt\lambda=\tfrac12$, $\lambda^*=\tfrac14$ và $x=(2,4,6)$.

Sai số tổng là $\tfrac12+1+\tfrac32=3$. Bài toán lồi trên miền mở, lồi $\{x\mid x_i>0\ \forall i\}$, nên theo Định lý 03.32, đây là nghiệm.

**Câu (b).** Giải lại (a) với ngân sách $B$: $\sqrt\lambda=\frac6B$, $x_i=\frac{\sqrt{c_i}B}6$, nên $p^*(B)=\sum_i\frac{6\sqrt{c_i}}B=\frac{36}B$, đạo hàm $-\frac{36}{B^2}=-\tfrac14$ tại $B=12$, đúng $-\lambda^*$: thêm một giờ GPU giảm tổng sai số khoảng $0{,}25$.

**Câu (c).** Xấp xỉ: $3-0{,}25=2{,}75$; đúng: $\frac{36}{13}\approx2{,}7692$, không nhỏ hơn $2{,}75$, như (7.2) bảo đảm.

**Kiểm tra lại.** Dừng tại $x_1=2$: $-\tfrac14+\tfrac14=0$; tại $x_3=6$: $-\tfrac9{36}+\tfrac14=0$.
:::

Mục tiêu học tập mà các bài tập củng cố kiểm tra:

11. **Bài tập 03.11** (Đúng hay sai): mục tiêu 2, 3, 5; giả thiết của các kết quả chính.
12. **Bài tập 03.12** (Tìm lỗi trong một lời giải): mục tiêu 1; dấu của ràng buộc và miền lấy cận dưới đúng.
13. **Bài tập 03.13** (Cách viết ràng buộc thay đổi bài toán đối ngẫu): mục tiêu 2, 3; tính lồi của cách viết.
14. **Bài tập 03.14** (Bài toán nghiệm chuẩn nhỏ nhất): mục tiêu 1, 2; đối ngẫu với ràng buộc đẳng thức.
15. **Bài tập 03.15** (Entropy cực đại và softmax): mục tiêu 5, 6; hệ KKT trên miền mở.
16. **Bài tập 03.16** (Máy vector hỗ trợ trên ba mẫu): mục tiêu 5, 6; vector hỗ trợ và miền của $\rho$.
17. **Bài tập 03.17** (Giá bóng của ngân sách tính toán): mục tiêu 4, 5, 6; giá bóng và xấp xỉ bậc nhất.

## 12. Câu hỏi cuối buổi và cầu nối

**Câu hỏi.** Xét bài toán $\min_{x\in\mathbb R^2}\ x_1^2+x_2^2$ với ràng buộc $x_1+x_2\ge2$.

- (a) Lập hàm đối ngẫu, giải bài toán đối ngẫu và kết luận về $d^*$.
- (b) Kiểm tra điều kiện Slater và nêu kết luận mà Định lý 03.15 bảo đảm.
- (c) Giải hệ KKT và tính độ nhạy của $p^*$ khi ràng buộc đổi thành $x_1+x_2\ge2-u$; so sánh nhân tử với hệ số $2$ trong lời giải câu hỏi cuối buổi của Bài 02.

::: solution Lời giải câu hỏi cuối buổi
**Câu (a).** Với $f_1(x)=2-x_1-x_2$, hàm $L=x_1^2+x_2^2+\lambda(2-x_1-x_2)$ cực tiểu tại $x=(\tfrac\lambda2,\tfrac\lambda2)$, nên $g(\lambda)=2\lambda-\tfrac{\lambda^2}2$, cực đại tại $\lambda^*=2$ với $d^*=2$.

**Câu (b).** Hai hàm lồi, $\bar x=(2,2)$ cho $f_1(\bar x)=-2<0$, và $p^*\ge0$ hữu hạn. Định lý 03.15 cho $d^*=p^*$ và bài toán đối ngẫu đạt nghiệm.

**Câu (c).** Dừng: $2x=\lambda\mathbf 1$. Trường hợp $\lambda=0$ cho $x=0$, không khả thi. Trường hợp ràng buộc hoạt động cho $\lambda=2$, $x^*=(1,1)$, $p^*=2=d^*$. Với $u\le2$, $p^*(u)=\tfrac12(2-u)^2$, đạo hàm tại $0$ bằng $-2=-\lambda^*$. Hệ số $2$ của Bài 02 là nhân tử $\lambda^*$.

**Kiểm tra lại.** $L(x,2)=(x_1-1)^2+(x_2-1)^2+2\ge2$, bằng $2$ tại $(1,1)$.
:::

Hệ KKT của Bài 03 được giải theo từng trường hợp của điều kiện bù trừ; cách giải này khả thi khi có ít ràng buộc và khi điều kiện dừng có nghiệm dạng đóng, như Ví dụ 03.18(b) và Ví dụ 03.19. Khi mục tiêu không bậc hai, điều kiện dừng là một hệ phi tuyến. Bài 04 xây dựng phương pháp Newton cho bài toán không ràng buộc và bài toán có ràng buộc đẳng thức, trong đó mỗi bước giải một hệ KKT tuyến tính. Bài 07 trở lại quy hoạch tuyến tính: phương pháp đơn hình tìm đỉnh tối ưu, và điều kiện dừng của nó cho một nghiệm đối ngẫu của Mệnh đề 03.11 cùng giá bóng của từng ràng buộc.

## 13. Tài liệu đọc

- **Trước buổi học:** Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press: §5.1 (tr. 215–222: hàm Lagrange, hàm đối ngẫu, đối ngẫu của quy hoạch tuyến tính), §5.2.1–5.2.3 (tr. 223–227: bài toán đối ngẫu, đối ngẫu yếu, đối ngẫu mạnh và điều kiện Slater).
- **Sau buổi học:**
  - Boyd và Vandenberghe (2004): §2.5.1 (tr. 46–49: siêu phẳng tách) và Bài tập 2.22 (tr. 63); §5.2.4 (tr. 227–229: ví dụ đối ngẫu mạnh không lồi); §5.3 (tr. 232–236: cách nhìn hình học, chứng minh đối ngẫu mạnh); §5.4.4 (tr. 240–241: giá bóng); §5.5 (tr. 241–248: điều kiện tối ưu, bù trừ, KKT); §5.6 (tr. 249–252: nhiễu và độ nhạy); §8.6.1 (tr. 423–427: máy vector hỗ trợ, với $\lVert a\rVert_2$ không bình phương); Bài tập 5.1 (tr. 273), 5.13 (tr. 276) và 5.21 (tr. 280), nguồn của bài toán (3.1), của nới lỏng Lagrange cho bài toán nhị phân và của Ví dụ 03.8.
  - Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả: §3.4.4 (entropy cực đại), §8.5.1–8.5.2 (nhân tử Lagrange, điều kiện KKT), §10.3.6 (bộ phân loại entropy cực đại), §17.3.2–17.3.3 (bài toán đối ngẫu và lề mềm của máy vector hỗ trợ).
- **Mở rộng:**
  - Boyd, Stephen, slide bài giảng cho MIT OpenCourseWare 6.079 *Introduction to Convex Optimization* (Fall 2009), Lecture 5 *Duality* (tr. 5–2 đến 5–23); tài liệu theo giấy phép CC BY-NC-SA 4.0, các hình của bài được vẽ lại.
  - Rudin, Walter (1976), *Principles of Mathematical Analysis*, ấn bản 3, McGraw-Hill: Định nghĩa 2.32, Định lý 2.41 (tr. 40) và Định lý 4.14 (tr. 89), dùng trong chứng minh Bổ đề 03.14.

## Phụ lục

### A. Chứng minh Bổ đề 03.14

Chứng minh dùng ba tính chất của tập compact trong $\mathbb R^k$, theo Rudin (1976):

1. trong $\mathbb R^k$, tập đóng, bị chặn là compact, tức mọi họ tập mở phủ nó có một họ con hữu hạn vẫn phủ nó (Định nghĩa 2.32 và Định lý 2.41, tr. 40, định lý Heine–Borel);
2. ảnh của tập compact qua ánh xạ liên tục là compact (Định lý 4.14, tr. 89);
3. hàm liên tục trên tập compact không rỗng đạt giá trị nhỏ nhất (Định lý 01.35).

::: proof Chứng minh Bổ đề 03.14
**Lộ trình.** Tách gốc tọa độ khỏi tập hiệu $\mathcal E=\mathcal S_1-\mathcal S_2$: trước hết cho mỗi tập con hữu hạn của $\mathcal E$ bằng điểm gần gốc nhất của bao lồi, rồi cho toàn bộ $\mathcal E$ bằng tính compact của mặt cầu đơn vị, cuối cùng chọn hằng số $\gamma$.

**Bước 1 (tập hiệu).** Đặt $\mathcal E=\{\zeta-\zeta'\mid\zeta\in\mathcal S_1,\ \zeta'\in\mathcal S_2\}$. $\mathcal E$ không rỗng vì hai tập không rỗng. $\mathcal E$ lồi: với $r_1=\zeta_1-\zeta_1'$, $r_2=\zeta_2-\zeta_2'$ thuộc $\mathcal E$ và $\vartheta\in[0,1]$, $\vartheta r_1+(1-\vartheta)r_2=\zeta_\vartheta-\zeta'_\vartheta$ với $\zeta_\vartheta=\vartheta\zeta_1+(1-\vartheta)\zeta_2\in\mathcal S_1$ và $\zeta'_\vartheta=\vartheta\zeta_1'+(1-\vartheta)\zeta_2'\in\mathcal S_2$ do tính lồi (Định nghĩa 01.17). $0\notin\mathcal E$: nếu $0=\zeta-\zeta'$ thì $\zeta=\zeta'\in\mathcal S_1\cap\mathcal S_2$, trái giả thiết rời nhau.

**Bước 2 (một tập con hữu hạn).** Lấy tập hữu hạn không rỗng $F=\{r_1,\ldots,r_M\}\subseteq\mathcal E$ và đặt $K=\{\sum_{j=1}^M\vartheta_jr_j\mid\vartheta_j\ge0,\ \sum_j\vartheta_j=1\}$. Tập trọng số $\Delta_M=\{\vartheta\in\mathbb R^M\mid\vartheta\ge0,\ \mathbf 1^T\vartheta=1\}$ đóng và bị chặn, nên compact; $K$ là ảnh của $\Delta_M$ qua ánh xạ tuyến tính, liên tục $\vartheta\mapsto\sum_j\vartheta_jr_j$, nên compact. Mỗi phần tử của $K$ là tổ hợp lồi của các điểm thuộc tập lồi $\mathcal E$, nên thuộc $\mathcal E$ (quy nạp theo $M$ trên Định nghĩa 01.17); do đó $0\notin K$.

**Bước 3 (điểm gần gốc nhất).** Hàm $x\mapsto\lVert x\rVert_2$ liên tục trên tập compact không rỗng $K$, nên đạt giá trị nhỏ nhất tại một $\bar r\in K$, và $\bar r\ne0$ vì $0\notin K$. Với $r\in K$ và $\vartheta\in(0,1]$, điểm $(1-\vartheta)\bar r+\vartheta r=\bar r+\vartheta(r-\bar r)$ thuộc $K$ vì $K$ lồi, nên $\lVert\bar r+\vartheta(r-\bar r)\rVert_2^2\ge\lVert\bar r\rVert_2^2$. Khai triển vế trái, trừ $\lVert\bar r\rVert_2^2$ và chia cho $\vartheta>0$:

$$
\begin{aligned}
&2\bar r^T(r-\bar r)+\vartheta\lVert r-\bar r\rVert_2^2\ge0\\
&\qquad\forall\vartheta\in(0,1].
\end{aligned}
$$

Cho $\vartheta\to0^+$, giới hạn giữ chiều bất đẳng thức: $\bar r^Tr\ge\lVert\bar r\rVert_2^2>0$. Đặt $q_F=\bar r/\lVert\bar r\rVert_2$, có $\lVert q_F\rVert_2=1$ và $q_F^Tr\ge\lVert\bar r\rVert_2>0$ với mọi $r\in K$, nói riêng với mọi $r\in F$.

**Bước 4 (từ hữu hạn sang toàn bộ $\mathcal E$).** Gọi $\mathcal U=\{q\in\mathbb R^k\mid\lVert q\rVert_2=1\}$, đóng và bị chặn nên compact. Với mỗi $r\in\mathcal E$, đặt $\mathcal O_r=\{q\in\mathbb R^k\mid q^Tr<0\}$, là nghịch ảnh của $(-\infty,0)$ qua hàm liên tục $q\mapsto q^Tr$, nên mở trong $\mathbb R^k$. Theo Bước 3, với mọi tập hữu hạn $\{r_1,\ldots,r_M\}\subseteq\mathcal E$, vector $q_F\in\mathcal U$ thỏa $q_F^Tr_j>0$ với mọi $j$, nên không thuộc $\mathcal O_{r_1}\cup\cdots\cup\mathcal O_{r_M}$; tức không họ hữu hạn nào trong các $\mathcal O_r$ phủ $\mathcal U$. Giả sử mọi $q\in\mathcal U$ có một $r\in\mathcal E$ với $q^Tr<0$. Khi đó họ tập mở $\{\mathcal O_r\mid r\in\mathcal E\}$ phủ $\mathcal U$, và tính compact cho một họ con hữu hạn $\mathcal O_{r_1},\ldots,\mathcal O_{r_M}$ vẫn phủ $\mathcal U$, mâu thuẫn. Vậy có $q\in\mathcal U$, nên $q\ne0$, với $q^Tr\ge0$ cho mọi $r\in\mathcal E$.

**Bước 5 (chọn $\gamma$).** Với $\zeta\in\mathcal S_1$, $\zeta'\in\mathcal S_2$: $\zeta-\zeta'\in\mathcal E$ nên $q^T\zeta\ge q^T\zeta'$. Cố định $\zeta_0\in\mathcal S_1$, $\zeta_0'\in\mathcal S_2$. Số $\gamma_2=\sup_{\zeta'\in\mathcal S_2}q^T\zeta'$ thỏa $\gamma_2\le q^T\zeta_0<\infty$, số $\gamma_1=\inf_{\zeta\in\mathcal S_1}q^T\zeta$ thỏa $\gamma_1\ge q^T\zeta_0'>-\infty$, và $\gamma_2\le\gamma_1$ vì mọi $q^T\zeta'$ không vượt mọi $q^T\zeta$. Chọn $\gamma\in[\gamma_2,\gamma_1]$: $q^T\zeta\ge\gamma_1\ge\gamma$ với mọi $\zeta\in\mathcal S_1$ và $q^T\zeta'\le\gamma_2\le\gamma$ với mọi $\zeta'\in\mathcal S_2$. $\square$
:::
