# Bài 02 — Các bài toán tối ưu lồi

## Mục tiêu học tập

Mọi mục tiêu sau là minh chứng bộ phận của chuẩn đầu ra bài học LLO3 (buổi 2), gắn với CLO1: hiểu và đánh giá các thuật toán tối ưu, vận dụng kiến thức tối ưu để giải quyết bài toán thực tế.

1. Chứng nhận từng dòng rằng một bài toán thuộc dạng chuẩn của tối ưu lồi, và tách kết luận "bài toán lồi" khỏi "bài toán có nghiệm" (LLO3, CLO1).
2. Lập, chuẩn hóa và chứng nhận nghiệm quy hoạch tuyến tính; cải dạng hồi quy sai số tuyệt đối và minimax bằng biến phụ (LLO3, CLO1).
3. Nhận dạng quy hoạch bậc hai và quy hoạch bậc hai có ràng buộc bậc hai, giải bốn tổ hợp sai số – hình phạt trên dữ liệu nhỏ, và phân biệt hình phạt với trần (LLO3, CLO1).
4. Đưa bài toán chứa tích và tỷ số của đại lượng dương về quy hoạch hình học và đổi biến logarit để được bài lồi tương đương (LLO3, CLO1).
5. Phân biệt cải dạng tương đương với hàm thay thế, hình phạt và nới lỏng; dùng nới lỏng tuyến tính để lấy cận (LLO3, CLO1).
6. Vận dụng quy trình nhận dạng vào mô hình học máy mới và nêu hậu quả khi một giả thiết bị vi phạm (LLO3, CLO1).

## Kiến thức tiên quyết

Chương dùng các kết quả sau của Bài 01 (ghi chú `lec-01b`, số hiệu dạng `01.k`), mỗi kết quả được phát biểu lại đủ để dùng ngay.

- **Bài toán tối ưu** (Định nghĩa 01.12) và **miền lồng nhau** (Mệnh đề 01.16). Giá trị tối ưu là $p^*=\inf_{x\in C}f_0(x)$, bằng $+\infty$ khi $C$ rỗng và $-\infty$ khi $f_0$ không bị chặn dưới; $x^*\in C$ là nghiệm khi $f_0(x^*)=p^*$. Nếu $C'\subseteq C$ thì $\inf_Cf_0\le\inf_{C'}f_0$, và một nghiệm trên $C$ nằm trong $C'$ cũng là nghiệm trên $C'$.
- **Tập lồi** (Định nghĩa 01.18, Mệnh đề 01.19, 01.20). Tập affine, nửa không gian, hộp, quả cầu Euclid đều lồi; giao của các tập lồi và nghịch ảnh của tập lồi qua ánh xạ affine đều lồi.
- **Hàm lồi** (Định nghĩa 01.22). Trên tập lồi $C$, $f$ lồi nếu $f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y)$ với mọi $x,y\in C$, $\theta\in[0,1]$, bất đẳng thức (7.1) của Bài 01; $f$ lồi chặt (còn gọi là lồi nghiêm ngặt) khi bất đẳng thức chặt với $x\ne y$, $\theta\in(0,1)$. Hàm $f$ lõm nếu $-f$ lồi. Tập mức dưới $\{x\in C\mid f(x)\le\alpha\}$ của hàm lồi là lồi (Mệnh đề 01.25).
- **Điều kiện bậc nhất, bậc hai, phép ghép** (Định lý 01.26, Hệ quả 01.27, Định lý 01.30, 01.31). Hàm khả vi $f$ trên tập mở lồi là lồi khi và chỉ khi $f(y)\ge f(x)+\nabla f(x)^T(y-x)$; nếu $f$ lồi, khả vi trên một tập mở chứa $C$ và $x^*\in C$ thỏa $\nabla f(x^*)^T(x-x^*)\ge0$ với mọi $x\in C$ (điều kiện (7.3) của Bài 01) thì $x^*$ là nghiệm. Hàm khả vi hai lần lồi khi và chỉ khi Hessian $\succeq0$ mọi nơi, và lồi chặt nếu Hessian $\succ0$ mọi nơi. Tổng có hệ số không âm, hợp với ánh xạ affine và cực đại từng điểm của các hàm lồi là lồi.
- **Toàn cục, tồn tại, duy nhất** (Định lý 01.33, Hệ quả 01.34, Định lý 01.35, 01.36, 01.38). Với miền lồi và mục tiêu lồi, cực tiểu địa phương là toàn cục và tập nghiệm lồi; mục tiêu lồi chặt có nhiều nhất một nghiệm; hàm liên tục đạt cực tiểu trên tập không rỗng, đóng, bị chặn (Weierstrass), hoặc trên tập không rỗng, đóng nếu hàm bức, tức $f(x)\to+\infty$ khi $\lVert x\rVert_2\to\infty$.
- **Bình phương nhỏ nhất và mất mát phân loại** (Mệnh đề 01.5, 01.6, 01.9, Ví dụ 01.14(c)). Hàm $\lVert Xw-y\rVert_2^2$ có gradient $2X^T(Xw-y)$, Hessian $2X^TX\succeq0$, luôn đạt cực tiểu, và $w^*$ là nghiệm khi và chỉ khi $X^TXw^*=X^Ty$. Hàm bản lề $\max(0,1-m)$ lồi; hàm $\log(1+e^{-m})$ có đạo hàm bậc hai $e^m/(1+e^m)^2>0$.
- **Đại số tuyến tính** (Bài 00, mục "Phân rã trị riêng"). Ma trận đối xứng $P$ viết được thành $P=V\Lambda V^T$ với $V$ trực giao và $\Lambda$ chéo chứa các giá trị riêng; bất đẳng thức Cauchy–Schwarz $\lvert a^Tb\rvert\le\lVert a\rVert_2\lVert b\rVert_2$.
- **Bất đẳng thức sơ cấp và logarit.** Bất đẳng thức tam giác $\lvert s+t\rvert\le\lvert s\rvert+\lvert t\rvert$; bất đẳng thức trung bình cộng – trung bình nhân cho ba số dương, $\tfrac13(s_1+s_2+s_3)\ge(s_1s_2s_3)^{1/3}$ với dấu bằng khi ba số bằng nhau. Ký hiệu $\log$ là logarit tự nhiên, tăng chặt trên $(0,\infty)$.

## Bảng ký hiệu

Bảng chỉ gồm ký hiệu dùng xuyên suốt chương; ký hiệu của một ví dụ hay chứng minh được giới thiệu tại chỗ.

Bài toán tổng quát có $n$ biến, $m$ ràng buộc bất đẳng thức, $p$ ràng buộc đẳng thức, theo Boyd và Vandenberghe (2004); dữ liệu học máy có $N$ mẫu và $d$ đặc trưng. Chữ cái mang nghĩa khác nhau ở các mục khác nhau được ghi rõ phạm vi.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $x$, $x^*$ | biến quyết định của bài toán tổng quát và một nghiệm tối ưu | $\mathbb R^n$ |
| $f_0$; $f_i$, $i=1,\ldots,m$ | hàm mục tiêu; hàm ràng buộc bất đẳng thức $f_i(x)\le0$ | hàm thực trên một tập con của $\mathbb R^n$ |
| $A$, $b$ | ma trận và vế phải của ràng buộc đẳng thức $Ax=b$ (ở Mục 2–3, $b$ còn là hệ số chặn của đường hồi quy; ở Mục 5–6 và các tình huống, hệ số chặn của bộ phân loại hoặc mô hình) | $\mathbb R^{p\times n}$, $\mathbb R^p$ |
| $C$, $p^*$ | tập khả thi và giá trị tối ưu $\inf_{x\in C}f_0(x)$ | tập con của $\mathbb R^n$; $\mathbb R\cup\{\pm\infty\}$ |
| $c$, $G$, $h$ | vector chi phí, ma trận và vế phải của ràng buộc $Gx\preceq h$ trong quy hoạch tuyến tính (ở Mục 4, $c$ còn là một cạnh của hộp) | $\mathbb R^n$, $\mathbb R^{m\times n}$, $\mathbb R^m$ |
| $\preceq$, $\mathbf 1$ | so sánh từng thành phần giữa hai vector; vector có mọi thành phần bằng $1$ | quan hệ trên $\mathbb R^k$; $\mathbb R^k$ |
| $P$, $q$, $s$ | ma trận, vector và hằng số của mục tiêu bậc hai $\tfrac12x^TPx+q^Tx+s$; chỉ số $i$ ($P_i,q_i,s_i$) cho ràng buộc bậc hai | $P$ đối xứng $n\times n$; $\mathbb R^n$; $\mathbb R$ |
| $Q\succeq0$, $Q\succ0$ | ma trận đối xứng nửa xác định dương, xác định dương | $\mathbb R^{k\times k}$ |
| $t$, $t_i$, $v_j$, $\xi_i$ | biến phụ (biến chặn trên) thêm vào khi cải dạng | $\mathbb R$ |
| $u_i$, $y_i$, $N$, $d$ | đặc trưng và nhãn hoặc đầu ra của mẫu $i$; số mẫu; số đặc trưng | $\mathbb R^d$ hoặc $\mathbb R$; $\mathbb R$ hoặc $\{-1,+1\}$ |
| $X$, $w$ | ma trận thiết kế với hàng $i$ là đặc trưng của mẫu $i$; vector tham số (ở Mục 2–3, $w=(a,b)$ gồm hệ số góc và hệ số chặn) | $\mathbb R^{N\times d}$; $\mathbb R^d$ |
| $r$ | vector phần dư $Xw-y$ | $\mathbb R^N$ |
| $E(w)$ | tổng bình phương phần dư $\lVert Xw-y\rVert_2^2$ | $\mathbb R^d\to\mathbb R$ |
| $L(w)$, $R(w)$, $\lambda$ | hàm sai số, hình phạt và hệ số của hạng chính quy hóa (Mục 3) | $\mathbb R^d\to\mathbb R$; $\lambda\ge0$ |
| $\lVert\cdot\rVert_1$, $\lVert\cdot\rVert_2$, $\lVert\cdot\rVert_\infty$, $\lVert\cdot\rVert_0$ | tổng trị tuyệt đối, chuẩn Euclid, trị tuyệt đối lớn nhất, số thành phần khác không | hàm trên $\mathbb R^k$ |
| $\varphi$, $\psi$, $T$ | ánh xạ đưa phương án gốc sang bài mới, ánh xạ khôi phục, hàm tăng chặt đổi giá trị trong một cải dạng tương đương | ánh xạ |
| $\mu$ | hệ số không âm trong chứng nhận bằng tổ hợp ràng buộc (Mục 2, 5, các bài tập) | $\mathbb R^k$, $\mu\succeq0$ |
| $\operatorname{err}$, $H$ | số lỗi phân loại và tổng mất mát bản lề trên tập huấn luyện (Mục 5–6) | hàm thực |

## 1. Bài toán tối ưu lồi và chứng nhận

Bài 01 cho định nghĩa tập lồi (Định nghĩa 01.18), hàm lồi (Định nghĩa 01.22) và quy trình chứng nhận một mô hình (Thuật toán 01.1). Các công cụ đó kiểm tra một tập hay một hàm cho trước. Chúng không cho biết cách đọc tính lồi từ một danh sách ràng buộc, trong khi cùng một tập khả thi viết được theo nhiều cách. Xét bài toán hai biến

$$
\begin{aligned}
\underset{x\in\mathbb R^2}{\operatorname{minimize}}\quad & x_1^2+x_2^2\\
\text{subject to}\quad & \frac{x_1}{1+x_2^2}\le0,\qquad (x_1+x_2)^2=0 .
\end{aligned}
$$

Hàm ràng buộc thứ nhất không lồi trên $\mathbb R^2$, và hàm ràng buộc thứ hai không affine. Dù vậy, tập khả thi chỉ là một nửa đường thẳng: điểm $(-1,1)$ thỏa cả hai ràng buộc, điểm $(1,-1)$ thì không. Cần một định nghĩa "bài toán lồi" kiểm tra được trên từng dòng của mô hình.

Cũng cần biết chính xác tính lồi bảo đảm điều gì: bài toán $\min_{x>0}1/x$ có hàm mục tiêu lồi trên một khoảng nhưng không có nghiệm.

Mục này cho dạng chuẩn của bài toán tối ưu lồi, chứng minh tập khả thi của nó lồi, liệt kê các kết luận của Bài 01 áp dụng ngay cho dạng chuẩn, và định nghĩa phép cải dạng tương đương dùng xuyên suốt chương.

### 1.1 Nhu cầu và trực giác

Hai ràng buộc ở đầu mục là cách viết phức tạp của hai điều kiện affine, như hình sau minh họa.

![Hai khung nối bằng chữ tương đương. Khung trái: hai ràng buộc x1 chia (1 cộng x2 bình phương) nhỏ hơn hoặc bằng 0 và (x1 cộng x2) bình phương bằng 0, chú thích mẫu số luôn dương và bình phương bằng 0 khi cơ số bằng 0. Khung phải: dạng affine x1 nhỏ hơn hoặc bằng 0 và x1 cộng x2 bằng 0. Phía dưới: tập khả thi chung là tia (âm s, s), s không âm, qua (âm 1, 1) và (âm 2, 2). Dải cuối nhắc hai phép cải dạng khác: thêm biến dư và khử ràng buộc đẳng thức.](img/lec-02/reformulation-equivalence.svg)

Hai biểu diễn trên hình mô tả cùng một tia khả thi, nhưng chỉ biểu diễn bên phải cho thấy ngay tập đó lồi.

Trực giác dẫn tới định nghĩa của mục, chưa phải định nghĩa: một bài toán được gọi là lồi khi mỗi dòng của nó đã mang chứng nhận riêng, gồm mục tiêu lồi, bất đẳng thức dạng "hàm lồi không vượt quá $0$" và đẳng thức affine. Khi đó tính lồi của toàn bài suy ra từ các chứng nhận từng dòng.

::: example Ví dụ 02.1 (Viết lại hai ràng buộc thành dạng affine)
Ví dụ phỏng theo Boyd và Vandenberghe (2004, mục 4.2.1) và MIT 6.079, Bài giảng 4, tr. 4–7. Xét bài toán ở đầu mục. Gọi $C_1$ là tập khả thi theo biểu diễn ban đầu và $C_2=\{x\in\mathbb R^2\mid x_1\le0,\ x_1+x_2=0\}$.

**Chứng minh $C_1=C_2$.**

- Với mọi $x\in\mathbb R^2$, mẫu số $1+x_2^2\ge1>0$, nên chia cho nó không đổi chiều bất đẳng thức: $x_1/(1+x_2^2)\le0$ khi và chỉ khi $x_1\le0$.
- Một số thực có bình phương bằng $0$ khi và chỉ khi nó bằng $0$, nên $(x_1+x_2)^2=0$ khi và chỉ khi $x_1+x_2=0$.

Hai tương đương cho $C_1=C_2=\{(-s,s)\mid s\ge0\}$.

**Giải.** Trên $C_2$, mục tiêu bằng $(-s)^2+s^2=2s^2$ với $s\ge0$, nhỏ nhất tại $s=0$. Nghiệm là $x^*=(0,0)$ và $p^*=0$.

**Kiểm tra lại.**

- Điểm $(-1,1)$: ràng buộc thứ nhất cho $-1/2\le0$, ràng buộc thứ hai cho $0^2=0$, nên khả thi, với giá trị mục tiêu $2>0$.
- Điểm $(1,-1)$: ràng buộc thứ nhất cho $1/2>0$, không khả thi theo cả hai biểu diễn, vì $x_1=1>0$.
:::

### 1.2 Dạng chuẩn của bài toán tối ưu lồi

Ví dụ 02.1 giải được vì sau khi viết lại, mỗi ràng buộc có dạng mà Bài 01 đã chứng nhận được. Định nghĩa sau cố định dạng đó.

::: definition Định nghĩa 02.1 (Bài toán tối ưu lồi dạng chuẩn)
Cho tập lồi $D\subseteq\mathbb R^n$, gọi là miền của bài toán; các hàm lồi $f_0,f_1,\ldots,f_m:D\to\mathbb R$; ma trận $A\in\mathbb R^{p\times n}$ và vector $b\in\mathbb R^p$. Bài toán tối ưu lồi dạng chuẩn là

$$
\begin{aligned}
\underset{x\in D}{\operatorname{minimize}}\quad & f_0(x)\\
\text{subject to}\quad & f_i(x)\le0,\quad i=1,\ldots,m,\\
& Ax=b,
\end{aligned}
\tag{1.1}
$$

với tập khả thi $C=\{x\in D\mid f_i(x)\le0,\ i=1,\ldots,m;\ Ax=b\}$. Có thể $m=0$ (không có bất đẳng thức) hoặc $p=0$ (không có đẳng thức).

Tổng quát hơn, bài toán $\min_{x\in C}f_0(x)$ với $C$ là tập lồi và $f_0$ lồi trên $C$ được gọi là bài toán tối ưu lồi.
:::

Định nghĩa có bốn thành phần, mỗi thành phần mang một điều kiện riêng.

- Miền $D$ là nơi mọi hàm xác định, thường là $\mathbb R^n$ (Mục 4 dùng $\mathbb R^n_{++}$).
- Hàm mục tiêu $f_0$ phải lồi.
- Mỗi ràng buộc bất đẳng thức phải có dạng $f_i(x)\le0$ với $f_i$ lồi. Chiều của bất đẳng thức là một phần của điều kiện, vì ràng buộc $f_i(x)\ge0$ với $f_i$ lồi nói chung cho tập không lồi, chẳng hạn $x^2\ge1$ cho $(-\infty,-1]\cup[1,\infty)$.
- Mỗi ràng buộc đẳng thức phải affine. Một đẳng thức $h(x)=0$ với $h$ lồi nhưng không affine, chẳng hạn $x_1^2+x_2^2=1$, cho đường tròn, không lồi.

Định nghĩa 02.1 là trường hợp riêng của Định nghĩa 01.12, trong đó các $f_i$ lồi và các hàm đẳng thức có dạng $a_j^Tx-b_j$, với $a_j^T$ là hàng $j$ của $A$.

Bài toán ở đầu mục có tập khả thi lồi nhưng không ở dạng (1.1), vì hai lý do.

- $x_1/(1+x_2^2)$ không lồi trên $\mathbb R^2$. Hessian của nó có định thức $-4x_2^2/(1+x_2^2)^4<0$ khi $x_2\ne0$, nên có hai giá trị riêng trái dấu và không nửa xác định dương (Định lý 01.30(a)).
- $(x_1+x_2)^2$ không affine.

Mọi bài dạng (1.1) là bài toán tối ưu lồi (Mệnh đề 02.2 dưới đây), nhưng chiều ngược lại sai.

Kết quả sau cần Mệnh đề 01.25 (tập mức dưới của hàm lồi là lồi), Mệnh đề 01.19(b) (tập affine lồi) và Mệnh đề 01.20(a) (giao của các tập lồi là lồi). Nó cho thấy kiểm tra từng dòng là đủ.

::: proposition Mệnh đề 02.2 (Tập khả thi của dạng chuẩn là tập lồi)
**Giả thiết.** Bài toán (1.1) thỏa Định nghĩa 02.1.

**Kết luận.** Tập khả thi $C$ lồi, và (1.1) là một bài toán tối ưu lồi theo nghĩa tổng quát: cực tiểu hàm lồi $f_0$ trên tập lồi $C$.

**Điều kiện áp dụng.** Cần cả ba điều kiện: $D$ lồi, các $f_i$ lồi với ràng buộc dạng $f_i\le0$, các đẳng thức affine.

**Phạm vi.** Mệnh đề chỉ cho điều kiện đủ. Một tập lồi có thể được mô tả bằng hàm không lồi (bài toán ở đầu mục), nên một ràng buộc không thỏa dạng chuẩn chưa chứng tỏ tập khả thi không lồi.
:::

::: proof Chứng minh Mệnh đề 02.2
**Bước 1 (từng ràng buộc cho một tập lồi).** Với mỗi $i=1,\ldots,m$, đặt $C_i=\{x\in D\mid f_i(x)\le0\}$. Vì $D$ lồi và $f_i$ lồi trên $D$, Mệnh đề 01.25 áp dụng với mức $\alpha=0$ cho $C_i$ lồi. Tập $\mathcal H=\{x\in\mathbb R^n\mid Ax=b\}$ là tập affine, lồi theo Mệnh đề 01.19(b).

**Bước 2 (giao).** Theo định nghĩa của $C$,

$$
C=D\cap C_1\cap\cdots\cap C_m\cap\mathcal H,
$$

là giao của hữu hạn tập lồi, nên lồi theo Mệnh đề 01.20(a).

**Bước 3 (mục tiêu).** Hàm $f_0$ lồi trên $D$, nên lồi trên tập con lồi $C$. Căn cứ là Nhận xét 01.23 của Bài 01: bất đẳng thức (7.1) đúng cho mọi cặp điểm của $D$ thì đúng cho mọi cặp điểm của $C$. $\square$
:::

Mệnh đề 02.2 thay câu hỏi về cả tập khả thi bằng $m+1$ câu hỏi về từng hàm, mỗi câu trả lời được bằng định nghĩa (7.1) của Bài 01, Định lý 01.30 hoặc Định lý 01.31.

Giả thiết "$f_i\le0$ với $f_i$ lồi" dùng ở chỗ áp dụng Mệnh đề 01.25. Bỏ nó thì $C_i$ có thể không lồi, như $\{x\mid1-x^2\le0\}$.

Khi một bài toán đã ở dạng chuẩn, các kết luận của Mục 7 và Mục 8 của Bài 01 áp dụng ngay. Kết quả sau gom chúng lại; nó là hệ quả của Mệnh đề 02.2 cùng các kết quả được dẫn.

::: corollary Hệ quả 02.3 (Các bảo đảm của tính lồi cho dạng chuẩn)
**Giả thiết.** Bài toán (1.1) thỏa Định nghĩa 02.1, với tập khả thi $C$ và giá trị tối ưu $p^*$.

**Kết luận.** (a) Mọi cực tiểu địa phương của $f_0$ trên $C$ là cực tiểu toàn cục.

(b) Tập nghiệm $S^*=\{x\in C\mid f_0(x)=p^*\}$ là tập lồi, có thể rỗng.

(c) Nếu $f_0$ lồi và khả vi trên một tập mở lồi chứa $C$ và $x^*\in C$ thỏa

$$
\nabla f_0(x^*)^T(x-x^*)\ge0\qquad\forall x\in C,
\tag{1.2}
$$

thì $x^*$ là nghiệm của (1.1).

**Điều kiện áp dụng.** (a) và (b) không cần khả vi; (c) cần giả thiết của Hệ quả 01.27.

**Phạm vi.** Hệ quả không khẳng định nghiệm tồn tại hay duy nhất; hai kết luận đó cần giả thiết riêng (Định lý 01.35, 01.36, 01.38). Điều kiện (1.2) còn là điều kiện cần khi $C$ lồi và $f_0$ khả vi (Boyd và Vandenberghe 2004, mục 4.2.3, trang 139–140); chiều cần không được chứng minh trong chương này.
:::

::: proof Chứng minh Hệ quả 02.3
Theo Mệnh đề 02.2, $C$ lồi và $f_0$ lồi trên $C$. Ba phần là ba kết quả của Bài 01.

- (a) là Định lý 01.33 áp dụng cho $f_0$ trên $C$.
- (b) là Hệ quả 01.34.
- (c) là Hệ quả 01.27 với $f=f_0$. $\square$
:::

Hệ quả 02.3 không mạnh hơn các kết quả của Bài 01; nó chỉ ra rằng dạng chuẩn bảo đảm giả thiết của các kết quả đó. Nhờ vậy một thuật toán cục bộ dừng ở cực tiểu địa phương là đã có nghiệm toàn cục.

**Trong học máy.** Huấn luyện hồi quy tuyến tính, hồi quy logistic và máy vector hỗ trợ là các bài dạng (1.1) với $x$ là vector tham số và $f_0$ là tổng mất mát cộng hạng chính quy hóa. Hệ quả 02.3(c) với $C=\mathbb R^n$ nói rằng điểm có gradient bằng không là nghiệm toàn cục, nên hạ gradient (gradient descent, Bài 05) dừng ở đó là đủ.

Với dữ liệu tách được tuyến tính, mất mát logistic của Ví dụ 01.6 (Bài 01) lồi nhưng tập nghiệm rỗng, như Ví dụ 02.4. Với mạng nơ-ron nhiều tầng, mất mát không lồi theo tham số và các kết luận (a), (b) không còn được bảo đảm.

::: remark Nhận xét 02.4 (Tính lồi thuộc về cách biểu diễn)
Thuật ngữ "bài toán lồi dạng chuẩn" gọi tên một cách viết mô hình, và có ba nhầm lẫn thường gặp.

1. Kết luận "tập khả thi không lồi" từ việc một $f_i$ không lồi: bài toán ở đầu mục là phản ví dụ.
2. Đổi chiều bất đẳng thức: $\lVert x\rVert_2^2\le1$ cho hình tròn, lồi; $\lVert x\rVert_2^2\ge1$ cho phần ngoài hình tròn, không lồi, vì $(1,0)$ và $(-1,0)$ thuộc tập mà trung điểm $(0,0)$ không thuộc.
3. Coi một đẳng thức của hàm lồi là chấp nhận được: $\lVert x\rVert_2^2=1$ cho đường tròn, không lồi vì cùng cặp điểm trên.
:::

### 1.3 Cải dạng tương đương

Ví dụ 02.1 giữ nguyên tập khả thi. Các mục sau cần phép biến đổi mạnh hơn: thêm biến (Mục 2), đổi biến và lấy logarit mục tiêu (Mục 4). Khi đó bài mới có biến trong $\mathbb R^{n'}$ với $n'$ có thể khác $n$.

Trực giác: hai bài toán tương đương khi mỗi điểm khả thi của bài này sinh ra một điểm khả thi của bài kia không tồi hơn, theo cả hai chiều. Chẳng hạn, xét bài $\min_x\lvert x-2\rvert$ và bài $\min_{(x,t)}t$ với $t\ge x-2$, $t\ge2-x$.

- Từ $x$, chọn $t=\lvert x-2\rvert$.
- Từ $(x,t)$ khả thi, giữ lại $x$, và $\lvert x-2\rvert\le t$.

::: definition Định nghĩa 02.5 (Cải dạng tương đương)
Cho hai bài toán $(\mathrm P)$: $\min_{x\in C}f(x)$ với $C\subseteq\mathbb R^n$, và $(\mathrm Q)$: $\min_{\zeta\in C'}g(\zeta)$ với $C'\subseteq\mathbb R^{n'}$. Bài $(\mathrm Q)$ là một cải dạng tương đương của $(\mathrm P)$ nếu có ánh xạ $\varphi:C\to C'$, ánh xạ $\psi:C'\to C$ và một hàm tăng chặt $T$ xác định trên một khoảng chứa các giá trị $f(x)$, $x\in C$, sao cho

$$
g(\varphi(x))\le T\bigl(f(x)\bigr)\quad\forall x\in C,\qquad T\bigl(f(\psi(\zeta))\bigr)\le g(\zeta)\quad\forall\zeta\in C'.
\tag{1.3}
$$

Ánh xạ $\varphi$ đưa phương án gốc sang bài mới; ánh xạ $\psi$ khôi phục phương án gốc từ phương án của bài mới. Trường hợp thường gặp nhất là $T(s)=s$.
:::

Định nghĩa không đòi $\varphi$ và $\psi$ là nghịch đảo của nhau. Với ví dụ trước định nghĩa, $\varphi(x)=(x,\lvert x-2\rvert)$, $\psi(x,t)=x$, $T(s)=s$.

- Điều kiện thứ nhất của (1.3) là một đẳng thức.
- Điều kiện thứ hai là $\lvert x-2\rvert\le t$.

Ánh xạ hợp $\varphi(\psi(x,t))=(x,\lvert x-2\rvert)$ có thể khác $(x,t)$. Hàm $T=\log$ xuất hiện ở Mục 4.

::: proposition Mệnh đề 02.6 (Cải dạng tương đương giữ nghiệm)
**Giả thiết.** $(\mathrm Q)$ là cải dạng tương đương của $(\mathrm P)$ theo Định nghĩa 02.5, với $\varphi$, $\psi$, $T$.

**Kết luận.**

- (a) Nếu $x^*$ là nghiệm của $(\mathrm P)$ thì $\varphi(x^*)$ là nghiệm của $(\mathrm Q)$ và $g(\varphi(x^*))=T(f(x^*))$.
- (b) Nếu $\zeta^*$ là nghiệm của $(\mathrm Q)$ thì $\psi(\zeta^*)$ là nghiệm của $(\mathrm P)$.
- (c) Khi $T(s)=s$, hai bài có cùng giá trị tối ưu, kể cả khi giá trị đó là $\pm\infty$.

**Điều kiện áp dụng.** Cần cả hai bất đẳng thức của (1.3); một chiều không đủ.

**Phạm vi.** Mệnh đề không khẳng định bài nào có nghiệm; nó chỉ chuyển nghiệm qua lại khi nghiệm có. Khi $T$ không phải hàm đồng nhất, giá trị tối ưu của hai bài liên hệ qua $T$, không bằng nhau.
:::

::: proof Chứng minh Mệnh đề 02.6
**Bước 1 (phần (a)).** Lấy $\zeta\in C'$ tùy ý.

- Vì $\psi(\zeta)\in C$ và $x^*$ là nghiệm, $f(x^*)\le f(\psi(\zeta))$.
- Vì $T$ tăng, $T(f(x^*))\le T(f(\psi(\zeta)))$.
- Theo vế phải của (1.3), $T(f(\psi(\zeta)))\le g(\zeta)$.
- Theo vế trái của (1.3) tại $x^*$, $g(\varphi(x^*))\le T(f(x^*))$.

Ghép lại:

$$
g(\varphi(x^*))\le T(f(x^*))\le g(\zeta)\qquad\forall\zeta\in C'.
$$

Vì $\varphi(x^*)\in C'$, đây là định nghĩa nghiệm của $(\mathrm Q)$. Chọn $\zeta=\varphi(x^*)$ trong chuỗi trên cho $g(\varphi(x^*))=T(f(x^*))$.

**Bước 2 (phần (b)).** Lấy $x\in C$ tùy ý. Vế phải của (1.3) tại $\zeta^*$, tính tối ưu của $\zeta^*$ tại điểm $\varphi(x)\in C'$, rồi vế trái của (1.3) tại $x$ cho

$$
\begin{aligned}
T\bigl(f(\psi(\zeta^*))\bigr)&\le g(\zeta^*)\\
&\le g(\varphi(x))\\
&\le T\bigl(f(x)\bigr).
\end{aligned}
$$

Vì $T$ tăng chặt, $T(s_1)\le T(s_2)$ kéo theo $s_1\le s_2$: nếu $s_1>s_2$ thì $T(s_1)>T(s_2)$. Vậy $f(\psi(\zeta^*))\le f(x)$ với mọi $x\in C$, và $\psi(\zeta^*)\in C$ là nghiệm của $(\mathrm P)$.

**Bước 3 (phần (c)).** Với $T(s)=s$:

- với mọi $x\in C$, $p^*_{\mathrm Q}\le g(\varphi(x))\le f(x)$, nên $p^*_{\mathrm Q}$ là một cận dưới của $f$ trên $C$ và $p^*_{\mathrm Q}\le p^*_{\mathrm P}$;
- đối xứng, với mọi $\zeta\in C'$, $p^*_{\mathrm P}\le f(\psi(\zeta))\le g(\zeta)$, nên $p^*_{\mathrm P}\le p^*_{\mathrm Q}$.

Nếu $C$ rỗng thì $C'$ cũng rỗng, vì $\psi$ ánh xạ $C'$ vào $C$; khi đó cả hai giá trị bằng $+\infty$. $\square$
:::

Mệnh đề 02.6 là công cụ cho mọi chứng minh "tương đương hai chiều" trong chương: chỉ cần chỉ ra $\varphi$, $\psi$, $T$ và kiểm tra (1.3).

So với Mệnh đề 01.16 của Bài 01, vốn so sánh hai bài có cùng mục tiêu trên hai miền lồng nhau, nó so sánh hai bài trên hai không gian khác nhau và cho kết luận mạnh hơn (cùng nghiệm). Cái giá là phải xây được hai ánh xạ.

::: remark Nhận xét 02.7 (Tương đương là tính chất của cặp ánh xạ)
Nếu cả $(\mathrm P)$ lẫn $(\mathrm Q)$ đều có nghiệm $x^*$, $\zeta^*$ với giá trị hữu hạn $p^*$, $q^*$, thì các ánh xạ hằng $\varphi\equiv\zeta^*$, $\psi\equiv x^*$ cùng $T(s)=s+q^*-p^*$ thỏa (1.3). Thật vậy, $g(\zeta^*)=q^*\le f(x)+q^*-p^*$ vì $f(x)\ge p^*$, và $T(f(x^*))=q^*\le g(\zeta)$. Cặp ánh xạ này mã hóa sẵn nghiệm, nên không cho thông tin gì.

Định nghĩa 02.5 chỉ có ích khi $\varphi$, $\psi$, $T$ được cho bằng công thức dựng từ cấu trúc bài toán mà không dùng nghiệm, như tách $x=x^+-x^-$ (Mục 2.2), đặt $t_i=\max_kg_{ik}(x)$ (Mục 2.4) hay $z=\log x$ (Mục 4.3). Trong chương, "tương đương" luôn được hiểu là tương đương qua một cặp ánh xạ tường minh như vậy.

Các phép thay mục tiêu (chính quy hóa ở Mục 3.3, hàm thay thế ở Mục 5) khác ở chỗ chứng minh được: nghiệm của bài mới nói chung không là nghiệm của bài gốc, và không có công thức khôi phục biết trước. Ví dụ 02.25 cho một trường hợp: mọi nghiệm của bài thay thế có số lỗi $2$ trong khi số lỗi tối ưu là $1$. Nhận xét 02.43 so sánh các phép xử lý theo tiêu chí này.
:::

**Trong học máy.** Các thư viện mô hình hóa tối ưu lồi như CVXPY nhận mô hình viết gần với bài gốc, chẳng hạn chứa chuẩn một hay hàm cực đại. Thư viện tự động cải dạng sang quy hoạch tuyến tính hoặc quy hoạch bậc hai, rồi trả về giá trị của các biến gốc, tức áp dụng $\psi$. Mệnh đề 02.6 là lý do kết quả trả về là nghiệm của bài người dùng viết.

Khi người dùng thay mất mát đếm lỗi bằng mất mát bản lề, không có công thức khôi phục như vậy (Nhận xét 02.7).

::: exercise Bài tập 02.1
Cho $(\mathrm P)$: $\min_{x>0}\ x+1/x$ và $(\mathrm Q)$: $\min_{z\in\mathbb R}\ \log(e^z+e^{-z})$.

(a) Chỉ ra $\varphi$, $\psi$, $T$ cho bằng công thức thỏa (1.3).

(b) Giải $(\mathrm Q)$ và suy ra nghiệm, giá trị tối ưu của $(\mathrm P)$ bằng Mệnh đề 02.6.
:::

::: hint
Đặt $z=\log x$ và lấy $T=\log$, tăng chặt trên $(0,\infty)$.
:::

::: solution
**(a)** $\varphi(x)=\log x$, $\psi(z)=e^z$, $T=\log$.

- Với $x>0$: $g(\varphi(x))=\log(x+1/x)=T(f(x))$.
- Với $z\in\mathbb R$: $T(f(\psi(z)))=\log(e^z+e^{-z})=g(z)$.

Cả hai bất đẳng thức của (1.3) đúng với dấu bằng.

**(b) Giải $(\mathrm Q)$.** $g'(z)=(e^z-e^{-z})/(e^z+e^{-z})$ bằng $0$ khi và chỉ khi $z=0$, và $g''(z)=1-g'(z)^2>0$. Do đó $g$ lồi chặt (Định lý 01.30(b)) và $z^*=0$ là nghiệm toàn cục (Hệ quả 01.27), $g(0)=\log2$.

**(b) Chuyển về $(\mathrm P)$.** Theo Mệnh đề 02.6(b), $x^*=e^0=1$ là nghiệm của $(\mathrm P)$. Theo (a) của mệnh đề, $\log f(x^*)=\log2$, tức $f(x^*)=2$.

**Kiểm tra lại.** $x+1/x-2=(\sqrt x-1/\sqrt x)^2\ge0$, dấu bằng tại $x=1$.
:::

### 1.4 Ba ví dụ một biến

Ba ví dụ sau có mục tiêu lồi trên miền lồi nhưng cho ba kết luận khác nhau về nghiệm, minh họa phần Phạm vi của Hệ quả 02.3.

::: example Ví dụ 02.2 (Hàm bậc hai trên đoạn: nghiệm trên biên)
Một thông số kỹ thuật có giá trị lý tưởng bằng $2$, nhưng thiết bị chỉ cho phép đặt trong đoạn $[0,1]$. Đo độ lệch bằng bình phương, ta có bài toán $\min_{0\le x\le1}(x-2)^2$.

**Chứng nhận.** Miền $D=\mathbb R$; $f_0''(x)=2>0$ nên $f_0$ lồi chặt (Định lý 01.30(b)); hai ràng buộc $-x\le0$, $x-1\le0$ affine. Bài toán ở dạng (1.1).

Tập khả thi $[0,1]$ không rỗng, đóng, bị chặn và $f_0$ liên tục, nên nghiệm tồn tại (Định lý 01.36) và duy nhất (Định lý 01.35).

**Tìm nghiệm.** Nghiệm của bài không ràng buộc là $x=2\notin[0,1]$. Ứng viên là đầu mút gần $2$ nhất, $x^*=1$. Kiểm tra (1.2): $f_0'(1)=2(1-2)=-2$, và với mọi $x\in[0,1]$,

$$
f_0'(1)(x-1)=-2(x-1)=2(1-x)\ge0 .
$$

Theo Hệ quả 02.3(c), $x^*=1$ là nghiệm, với $p^*=f_0(1)=1$.

**Kiểm tra lại.** $f_0(0)=4$ và $f_0(\tfrac12)=\tfrac94$, đều lớn hơn $1$. Trực tiếp: với $x\le1$, $2-x\ge1>0$ nên $(x-2)^2=(2-x)^2\ge1$, dấu bằng khi $x=1$.
:::

![Đồ thị parabol (x trừ 2) bình phương. Phần ứng với 0 nhỏ hơn hoặc bằng x nhỏ hơn hoặc bằng 1 vẽ nét liền đậm, phần ngoài vẽ nét đứt. Thanh dưới trục hoành biểu diễn đoạn khả thi có hai đầu đóng. Điểm tối ưu (1, 1) được đánh dấu trên đồ thị; đỉnh của parabol tại (2, 0) nằm ngoài đoạn khả thi.](img/lec-02/note-quadratic.svg)

Trên hình, phần khả thi của parabol nằm bên trái đỉnh, nơi hàm giảm, nên điểm thấp nhất là đầu mút phải. Tại đó đạo hàm bằng $-2\ne0$, và (1.2) thay cho phương trình $f_0'(x)=0$.

::: example Ví dụ 02.3 (Hàm giá trị tuyệt đối: nghiệm tại điểm không khả vi)
Cùng giá trị lý tưởng $2$, nhưng đo độ lệch bằng trị tuyệt đối và cho phép $x$ tùy ý: $\min_{x\in\mathbb R}\lvert x-2\rvert$.

**Chứng nhận.** Viết $\lvert x-2\rvert=\max(x-2,\ 2-x)$, cực đại từng điểm của hai hàm affine, lồi theo Định lý 01.31(c). Bài toán không có ràng buộc, $D=\mathbb R$.

**Tìm nghiệm.** $\lvert x-2\rvert\ge0$ với mọi $x$ và bằng $0$ khi và chỉ khi $x=2$. Vậy $x^*=2$, $p^*=0$, nghiệm duy nhất.

Hàm không khả vi tại $x^*$: đạo hàm trái bằng $-1$, đạo hàm phải bằng $+1$. Vì vậy Hệ quả 02.3(c) không dùng được, và nghiệm được chứng nhận bằng bất đẳng thức trực tiếp.

**Kiểm tra lại.** $\lvert1-2\rvert=\lvert3-2\rvert=1>0$. Bài cải dạng $\min t$ với $t\ge x-2$, $t\ge2-x$ có nghiệm $(x,t)=(2,0)$: cộng hai ràng buộc cho $2t\ge0$, nên $t\ge0$, và $(2,0)$ khả thi.
:::

![Đồ thị hình chữ V của hàm trị tuyệt đối của (x trừ 2), đỉnh tại (2, 0). Thanh mũi tên hai chiều dưới trục hoành biểu diễn tập khả thi là toàn trục số.](img/lec-02/note-absolute.svg)

Hình trên có một góc nhọn tại đỉnh. Tính lồi không đòi hàm trơn; điều Ví dụ 02.3 cần là một cách xử lý điểm gãy mà không dùng đạo hàm.

Phép cải dạng ở dòng kiểm tra lại, thay trị tuyệt đối bằng hai bất đẳng thức tuyến tính, là trường hợp riêng của Định lý 02.15 ở Mục 2.

::: example Ví dụ 02.4 (Hàm nghịch đảo: bài toán lồi không có nghiệm)
Ví dụ lấy từ Boyd và Vandenberghe (2004), Ví dụ 4.1, tr. 128. Xét $\min_{x>0}1/x$, với miền $D=(0,\infty)$ và không có ràng buộc. Miền không thể thay bằng $x\ge0$, vì $1/x$ không xác định tại $0$.

**Chứng nhận.** $D$ là một khoảng, lồi. Trên $D$, $f_0'(x)=-1/x^2$ và $f_0''(x)=2/x^3>0$, nên $f_0$ lồi chặt theo Định lý 01.30(b), áp dụng trên miền mở $D$.

**Giá trị tối ưu.** Với mọi $x>0$, $1/x>0$, nên $0$ là một cận dưới. Dãy $x_k=k$, $k=1,2,\ldots$ khả thi và $1/x_k=1/k\to0$, nên không cận dưới nào lớn hơn $0$: $p^*=0$. Không điểm khả thi nào có $1/x=0$, nên bài toán không có nghiệm.

**Vì sao các định lý tồn tại không áp dụng.**

- Định lý 01.36 không áp dụng vì $D$ không bị chặn và không đóng.
- Định lý 01.38 không áp dụng vì $1/x\to0$, không tăng ra vô cực, khi $x\to\infty$.

**Kiểm tra lại.** Với $x=10$ và $x=1000$, $1/x$ bằng $0{,}1$ và $0{,}001$, đều dương. Nếu thêm ràng buộc $x\le M$ với $M>0$, hàm giảm trên $(0,M]$ và nghiệm là $x^*=M$ với giá trị $1/M$. Điều này khớp với Mệnh đề 01.16(a): thu hẹp miền làm giá trị tối ưu tăng từ $0$ lên $1/M$.
:::

![Đồ thị hàm 1 chia x trên miền x dương. Đường cong luôn nằm trên trục hoành và tiến sát trục khi x tăng. Thanh miền dương dưới trục hoành có vòng rỗng tại 0 và mũi tên sang phải.](img/lec-02/note-reciprocal.svg)

Trên hình, đường cong tiến sát trục hoành mà không chạm: cận dưới đúng $p^*=0$ không đạt tại điểm nào, đúng tình huống Nhận xét 02.8 mô tả.

::: remark Nhận xét 02.8 (Bốn trạng thái của một bài toán lồi)
Một bài dạng (1.1) rơi vào đúng một trong bốn trạng thái:

1. không khả thi ($p^*=+\infty$), chẳng hạn $x\le-1$ và $-x\le-1$;
2. không bị chặn dưới ($p^*=-\infty$), như $\min_{x>0}(-\log x)$;
3. bị chặn dưới nhưng không đạt (Ví dụ 02.4);
4. có nghiệm (Ví dụ 02.2, 02.3).

Ở trạng thái thứ ba, kết quả phải ghi "cận dưới đúng $p^*$, không đạt", không ghi $x^*=+\infty$. Tính lồi không loại trừ trạng thái nào; sự tồn tại cần Định lý 01.36, Định lý 01.38 hoặc một lập luận đạt cận trực tiếp.
:::

::: exercise Bài tập 02.2
Cho bài toán $\min\ (x_1-3)^2+x_2^2$ với ràng buộc $x_1^2+x_2^2\le4$.

(a) Đưa bài toán về dạng (1.1) và chứng nhận từng thành phần.

(b) Chứng minh bài toán có đúng một nghiệm.

(c) Chứng minh $x^*=(2,0)$ là nghiệm bằng điều kiện (1.2), và tính $p^*$.
:::

::: hint
Ở (c), tính $\nabla f_0(2,0)$ và dùng $x_1\le\lVert x\rVert_2\le2$ với mọi điểm khả thi.
:::

::: solution
**(a) Chứng nhận.**

- Miền $D=\mathbb R^2$.
- Mục tiêu $f_0(x)=(x_1-3)^2+x_2^2$ có Hessian $2I_2\succ0$, nên lồi chặt (Định lý 01.30(b)).
- Ràng buộc viết thành $f_1(x)=x_1^2+x_2^2-4\le0$, với Hessian $2I_2\succeq0$, nên $f_1$ lồi.
- Không có đẳng thức.

Bài toán ở dạng (1.1) với $n=2$, $m=1$, $p=0$.

**(b) Tồn tại và duy nhất.** Tập khả thi là hình tròn đóng bán kính $2$, không rỗng (chứa gốc), đóng và bị chặn; $f_0$ liên tục. Định lý 01.36 cho nghiệm tồn tại, Định lý 01.35 cho nghiệm duy nhất vì $f_0$ lồi chặt.

**(c) Kiểm (1.2).** $\nabla f_0(x)=(2(x_1-3),\ 2x_2)$, nên $\nabla f_0(2,0)=(-2,0)$. Điểm $(2,0)$ khả thi vì $4\le4$. Với mọi $x$ khả thi,

$$
\nabla f_0(2,0)^T(x-(2,0))=-2(x_1-2)=2(2-x_1),
$$

và $x_1\le\sqrt{x_1^2+x_2^2}\le2$, nên biểu thức không âm. Theo Hệ quả 02.3(c), $x^*=(2,0)$ là nghiệm, với $p^*=(2-3)^2+0=1$.

**Kiểm tra lại.** Điểm khả thi $(0,2)$ cho $9+4=13>1$. Điểm $(\sqrt2,\sqrt2)$ cho $(\sqrt2-3)^2+2\approx2{,}51+2=4{,}51>1$.
:::

Chuỗi suy luận và kết quả của mục:

1. Định nghĩa 02.1 và Mệnh đề 02.2 cho dạng chuẩn và tính lồi của tập khả thi;
2. Hệ quả 02.3 chuyển các kết quả của Bài 01 sang dạng chuẩn;
3. Mệnh đề 02.6 và Nhận xét 02.7 cho phép cải dạng qua ánh xạ tường minh;
4. Nhận xét 02.8 tách tính lồi khỏi sự tồn tại nghiệm.

Định nghĩa 02.1 không nói gì về cấu trúc của $f_i$, nên chưa cho cách chứng nhận nghiệm cụ thể. Mục 2 xét lớp con nơi mọi hàm đều affine.

## 2. Quy hoạch tuyến tính

Mục 1 chưa xét lớp cụ thể nào có cách chứng nhận nghiệm tường minh.

Một vườn ươm trộn hai nguyên liệu bón cho một luống cây.

- Mỗi kilôgam nguyên liệu I giá $30$ nghìn đồng, chứa $2$ g nitơ và $1$ g phốtpho.
- Mỗi kilôgam nguyên liệu II giá $20$ nghìn đồng, chứa $1$ g nitơ và $2$ g phốtpho.

Luống cây cần ít nhất $4$ g nitơ và $5$ g phốtpho, và có thể mua lượng lẻ (số liệu minh họa tự tạo). Chỉ dùng nguyên liệu II tốn $80$ nghìn đồng. Cần tìm cách trộn rẻ hơn và chứng minh nó rẻ nhất mà không thử mọi cách.

Mục này định nghĩa quy hoạch tuyến tính (linear programming, LP), chứng nhận nghiệm bằng tổ hợp không âm của các ràng buộc, và xây kỹ thuật biến phụ.

### 2.1 Nhu cầu và trực giác: bài toán pha trộn

Gọi $x_1$, $x_2$ là số kilôgam nguyên liệu I và II. Chi phí, tính theo đơn vị $10$ nghìn đồng, là $3x_1+2x_2$. Lượng nitơ là $2x_1+x_2$ gam và lượng phốtpho là $x_1+2x_2$ gam. Cả ba đều tuyến tính, vì thành phần cộng được và giá tỷ lệ với khối lượng.

::: example Ví dụ 02.5 (Mô hình pha trộn)
Bài toán phỏng theo bài toán khẩu phần của Boyd và Vandenberghe (2004, tr. 148). Bảng dữ liệu (giá theo đơn vị $10$ nghìn đồng mỗi kilôgam):

| Nguyên liệu | Giá | Nitơ (g/kg) | Phốtpho (g/kg) |
|---|---:|---:|---:|
| I | $3$ | $2$ | $1$ |
| II | $2$ | $1$ | $2$ |

**Lập mô hình.** Mô hình là

$$
\begin{aligned}
\underset{x\in\mathbb R^2}{\operatorname{minimize}}\quad & 3x_1+2x_2\\
\text{subject to}\quad & 2x_1+x_2\ge4,\qquad x_1+2x_2\ge5,\qquad x_1\ge0,\ x_2\ge0 .
\end{aligned}
\tag{2.1}
$$

**Ba phương án khả thi.**

- Chỉ dùng II, $(0,4)$: nitơ $4$, phốtpho $8$, chi phí $8$.
- Chỉ dùng I, $(5,0)$: nitơ $10$, phốtpho $5$, chi phí $15$.
- Trộn $(1,2)$: nitơ $2+2=4$, phốtpho $1+4=5$, chi phí $3+4=7$, tức $70$ nghìn đồng.

**Kiểm tra lại.** Phương án $(1,1)$ có nitơ $3<4$, không khả thi, dù chi phí $5$ thấp hơn.
:::

![Mặt phẳng x1, x2. Miền khả thi tô màu là giao của góc phần tư không âm với 2 x1 cộng x2 lớn hơn hoặc bằng 4 (biên nét liền) và x1 cộng 2 x2 lớn hơn hoặc bằng 5 (biên nét đứt), kéo dài vô hạn lên trên và sang phải. Hai biên cắt nhau tại (1, 2), nơi đường chi phí 3 x1 cộng 2 x2 bằng 7 chạm miền.](img/lec-02/lp-mixture.svg)

Miền khả thi trên hình là giao của bốn nửa mặt phẳng, một đa giác lồi không bị chặn. Các đường chi phí $3x_1+2x_2=\alpha$ song song; giảm $\alpha$ đẩy đường về phía gốc.

**Trực giác (chưa phải định nghĩa).** Phương án rẻ nhất nằm ở chỗ đường chi phí rời miền khả thi lần cuối, ở đây là đỉnh $(1,2)$. Trực giác này cho ứng viên; tính tối ưu cần một lập luận riêng.

### 2.2 Định nghĩa và dạng chuẩn

Bài (2.1) có ràng buộc "$\ge$" và biến không âm; bài khác có thể có đẳng thức, ràng buộc "$\le$" và biến tự do. Một định nghĩa chung cần bao mọi cách viết đó.

Ngoài ra, phương pháp đơn hình (simplex method, Bài 07) chỉ làm việc với một dạng chuẩn gồm đẳng thức và điều kiện không âm, nên cần cả dạng đó và phép chuyển giữa hai dạng.

::: definition Định nghĩa 02.9 (Quy hoạch tuyến tính)
Cho $c\in\mathbb R^n$, $G\in\mathbb R^{m\times n}$, $h\in\mathbb R^m$, $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$. Quy hoạch tuyến tính dạng bất đẳng thức là

$$
\underset{x\in\mathbb R^n}{\operatorname{minimize}}\quad c^Tx\qquad\text{subject to}\quad Gx\preceq h,\quad Ax=b,
\tag{2.2}
$$

trong đó $Gx\preceq h$ nghĩa là $g_i^Tx\le h_i$ với mọi $i$, $g_i^T$ là hàng $i$ của $G$.

Quy hoạch tuyến tính dạng chuẩn là

$$
\underset{z\in\mathbb R^{n'}}{\operatorname{minimize}}\quad \tilde c^Tz\qquad\text{subject to}\quad Bz=e,\quad z\succeq0,
\tag{2.3}
$$

với dữ liệu $\tilde c\in\mathbb R^{n'}$, $B\in\mathbb R^{p'\times n'}$, $e\in\mathbb R^{p'}$.
:::

Trong (2.2), $c$ chứa chi phí trên một đơn vị của từng biến. Mỗi hàng của $G$ cùng thành phần tương ứng của $h$ mô tả một giới hạn, mỗi hàng của $A$ mô tả một cân bằng. Hằng số cộng vào mục tiêu không đổi nghiệm. Bài (2.1) thuộc dạng (2.2) sau khi đổi dấu, chẳng hạn $2x_1+x_2\ge4$ thành $-2x_1-x_2\le-4$.

So với Định nghĩa 02.1, quy hoạch tuyến tính là trường hợp mọi $f_i$ affine và $D=\mathbb R^n$. Hàm affine vừa lồi vừa lõm (Ví dụ 01.11(b) của Bài 01), nên cực đại $c^Tx$ cũng là bài lồi sau khi đổi thành cực tiểu $-c^Tx$.

Quy hoạch tuyến tính không bao gồm bài có biến nguyên: $(1,2)$ và $(2,2)$ nguyên mà trung điểm $(\tfrac32,2)$ thì không.

Kết quả sau dùng Định nghĩa 02.1 cho phần (a) và Mệnh đề 02.6 cho phần (b).

::: proposition Mệnh đề 02.10 (Tính lồi của quy hoạch tuyến tính và phép đưa về dạng chuẩn)
**Giả thiết.** Bài toán (2.2) với dữ liệu như Định nghĩa 02.9.

**Kết luận.** (a) (2.2) là bài toán tối ưu lồi dạng chuẩn, và tập khả thi của nó là một đa diện, tức tập nghiệm của hữu hạn bất đẳng thức và đẳng thức tuyến tính.

(b) Đặt $z=(x^+,x^-,\sigma)\in\mathbb R^{2n+m}$ và

$$
B=\begin{bmatrix}G&-G&I_m\\A&-A&0\end{bmatrix},\qquad e=\begin{bmatrix}h\\b\end{bmatrix},\qquad \tilde c=\begin{bmatrix}c\\-c\\0\end{bmatrix}.
$$

Bài toán dạng chuẩn (2.3) với dữ liệu này là một cải dạng tương đương của (2.2) theo Định nghĩa 02.5, với $T(s)=s$, $\varphi(x)=(\max(x,0),\max(-x,0),h-Gx)$ (lấy $\max$ theo từng thành phần) và $\psi(x^+,x^-,\sigma)=x^+-x^-$.

**Điều kiện áp dụng.** Mọi dữ liệu. Biến nào đã có ràng buộc không âm thì không cần tách thành hiệu.

**Phạm vi.** Cải dạng ở (b) không một-một: cộng cùng một số dương vào $x^+_j$ và $x^-_j$ cho điểm khác của (2.3) mà $\psi$ ánh xạ về cùng $x$.
:::

::: proof Chứng minh Mệnh đề 02.10
**Bước 1 (phần (a)).** Mục tiêu $c^Tx$ và các hàm $g_i^Tx-h_i$ là affine, nên lồi; các đẳng thức affine. Bài toán ở dạng (1.1) với $D=\mathbb R^n$, và tập khả thi là tập nghiệm của $m$ bất đẳng thức tuyến tính $g_i^Tx\le h_i$ cùng tập affine $\{x\mid Ax=b\}$.

**Bước 2 (phần (b), chiều thứ nhất của (1.3)).** Lấy $x$ khả thi cho (2.2), đặt $x^+=\max(x,0)$, $x^-=\max(-x,0)$ theo từng thành phần và $\sigma=h-Gx$.

- $x^+,x^-\succeq0$, và $x^+-x^-=x$, vì với mỗi $j$, một trong hai số bằng $0$ và hiệu bằng $x_j$.
- $\sigma\succeq0$ vì $Gx\preceq h$.
- Hàng khối trên của $Bz$ là $G(x^+-x^-)+\sigma=Gx+h-Gx=h$; hàng khối dưới là $A(x^+-x^-)=Ax=b$.

Vậy $z=\varphi(x)$ khả thi cho (2.3), và $\tilde c^Tz=c^Tx^+-c^Tx^-=c^Tx$.

**Bước 3 (phần (b), chiều thứ hai của (1.3)).** Lấy $z=(x^+,x^-,\sigma)$ khả thi cho (2.3) và đặt $x=x^+-x^-$. Hàng khối trên cho $Gx=h-\sigma\preceq h$ vì $\sigma\succeq0$; hàng khối dưới cho $Ax=b$. Vậy $\psi(z)$ khả thi cho (2.2), và $c^T\psi(z)=c^Tx^+-c^Tx^-=\tilde c^Tz$.

**Bước 4 (kết luận).** Hai chiều cho (1.3) với dấu bằng, và Mệnh đề 02.6 cho kết luận. $\square$
:::

Mệnh đề 02.10 cho phép coi hai dạng (2.2) và (2.3) như một lớp: mọi kết quả chứng minh cho một dạng chuyển được sang dạng kia qua Mệnh đề 02.6.

Biến $\sigma$ được gọi là biến dư (slack variable). Thành phần $\sigma_i$ đo khoảng cách còn lại tới giới hạn thứ $i$, và $\sigma_i=0$ nghĩa là ràng buộc $i$ đang chặt.

::: example Ví dụ 02.6 (Dạng chuẩn của bài pha trộn)
**Lập dạng chuẩn.** Trong (2.1), hai biến đã không âm nên không cần tách. Thêm biến dư $\sigma_1,\sigma_2\ge0$ cho hai ràng buộc dinh dưỡng, viết ở dạng "$\ge$": $2x_1+x_2-\sigma_1=4$ và $x_1+2x_2-\sigma_2=5$. Với $z=(x_1,x_2,\sigma_1,\sigma_2)$, dạng chuẩn là

$$
\underset{z\succeq0}{\operatorname{minimize}}\quad 3x_1+2x_2\qquad\text{subject to}\quad\begin{bmatrix}2&1&-1&0\\1&2&0&-1\end{bmatrix}z=\begin{bmatrix}4\\5\end{bmatrix}.
$$

**Diễn giải.**

- Phương án $(1,2)$ ứng với $z=(1,2,0,0)$: cả hai ràng buộc dinh dưỡng chặt.
- Phương án $(0,4)$ ứng với $z=(0,4,0,3)$: phốtpho dư $3$ g.

**Kiểm tra lại.** Hàng thứ nhất tại $z=(0,4,0,3)$: $0+4-0=4$; hàng thứ hai: $0+8-3=5$. Chi phí $8$ bằng chi phí của $(0,4)$ trong (2.1).
:::

### 2.3 Chứng nhận nghiệm bằng tổ hợp không âm các ràng buộc

Trực giác ở Mục 2.1 cho ứng viên $(1,2)$ với chi phí $7$. Muốn chứng minh không phương án nào rẻ hơn, có thể viết chi phí thành một tổ hợp của các vế trái của ràng buộc. Với bài pha trộn,

$$
3x_1+2x_2=\tfrac43(2x_1+x_2)+\tfrac13(x_1+2x_2),
$$

vì hệ số của $x_1$ ở vế phải là $\tfrac83+\tfrac13=3$ và hệ số của $x_2$ là $\tfrac43+\tfrac23=2$.

Mỗi ngoặc không nhỏ hơn vế phải của ràng buộc tương ứng, và hai hệ số $\tfrac43,\tfrac13$ không âm, nên chi phí không nhỏ hơn $\tfrac43\cdot4+\tfrac13\cdot5=7$. Mệnh đề sau tổng quát hóa phép tính này.

::: proposition Mệnh đề 02.11 (Cận dưới từ tổ hợp không âm của các ràng buộc)
**Giả thiết.** Xét quy hoạch tuyến tính $\min c^Tx$ với các ràng buộc $a_i^Tx\ge\beta_i$, $i=1,\ldots,k$ (mọi ràng buộc bất đẳng thức tuyến tính, kể cả $x_j\ge0$, đều viết được ở dạng này). Giả sử có $\mu\in\mathbb R^k$ với $\mu\succeq0$ và $c=\sum_{i=1}^k\mu_ia_i$.

**Kết luận.**

- (a) Với mọi $x$ khả thi, $c^Tx\ge\sum_{i=1}^k\mu_i\beta_i$.
- (b) Nếu một điểm khả thi $\hat x$ có $c^T\hat x=\sum_i\mu_i\beta_i$ thì $\hat x$ là nghiệm.
- (c) Khi đó, mọi ràng buộc có $\mu_i>0$ đều chặt tại mọi nghiệm: $a_i^Tx^*=\beta_i$.

**Điều kiện áp dụng.** Hệ số $\mu_i$ phải không âm; tổng của chúng không cần bằng $1$.

**Phạm vi.** Mệnh đề không khẳng định luôn có $\mu$ như vậy khi bài toán có nghiệm; khẳng định đó là định lý đối ngẫu mạnh (strong duality) của quy hoạch tuyến tính, trình bày ở Bài 03.
:::

::: proof Chứng minh Mệnh đề 02.11
**Bước 1 (phần (a): cộng các ràng buộc với hệ số không âm).** Với $x$ khả thi, $a_i^Tx-\beta_i\ge0$ với mọi $i$. Nhân với $\mu_i\ge0$ giữ chiều bất đẳng thức, và cộng lại:

$$
\begin{aligned}
c^Tx-\sum_i\mu_i\beta_i&=\sum_i\mu_ia_i^Tx-\sum_i\mu_i\beta_i\\
&=\sum_i\mu_i\bigl(a_i^Tx-\beta_i\bigr)\\
&\ge0,
\end{aligned}
$$

trong đó đẳng thức đầu dùng giả thiết $c=\sum_i\mu_ia_i$.

**Bước 2 (phần (b)).** Theo (a), mọi điểm khả thi có giá trị không nhỏ hơn $\sum_i\mu_i\beta_i=c^T\hat x$, nên $\hat x$ là nghiệm.

**Bước 3 (phần (c)).** Tại một nghiệm $x^*$, giá trị tối ưu bằng $c^T\hat x=\sum_i\mu_i\beta_i$, nên tổng $\sum_i\mu_i(a_i^Tx^*-\beta_i)$ ở (a) bằng $0$. Đây là tổng của các số hạng không âm, nên mỗi số hạng bằng $0$. Với $\mu_i>0$, điều đó cho $a_i^Tx^*=\beta_i$. $\square$
:::

Mệnh đề 02.11 biến việc chứng minh tối ưu thành việc tìm các hệ số $\mu_i$. So với điều kiện (1.2), nó không cần gradient hay xét mọi điểm khả thi, và cho thêm thông tin ở (c). Đổi lại, nó chỉ là điều kiện đủ và phải đoán đúng $\mu$.

Các $\mu_i$ là nhân tử Lagrange của Bài 03, nơi chúng được tìm có hệ thống qua bài toán đối ngẫu.

::: example Ví dụ 02.7 (Nghiệm của bài pha trộn)
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

Điểm $(1,2)$ khả thi và đạt $7$, nên là nghiệm theo (b): chi phí tối ưu $70$ nghìn đồng, tiết kiệm $10$ nghìn đồng so với chỉ dùng nguyên liệu II. Theo (c), mọi nghiệm đều dùng đúng $4$ g nitơ và $5$ g phốtpho, vì $\mu_1,\mu_2>0$.

**Kiểm tra lại.** Tại $(1,2)$: $2+2=4$, $1+4=5$, $x\succeq0$. Điểm khả thi $(0,4)$ cho $8\ge7$, điểm $(5,0)$ cho $15\ge7$, đúng với (a). Từ hai đẳng thức chặt ở (c), mọi nghiệm thỏa hệ $2x_1+x_2=4$, $x_1+2x_2=5$, có nghiệm duy nhất $(1,2)$; vậy nghiệm duy nhất.
:::

::: remark Nhận xét 02.12 (Nhiều nghiệm, biến nguyên và đỉnh của đa diện)
**Nhiều nghiệm.** Nếu giá nguyên liệu I tăng lên $4$, thì $4x_1+2x_2=2(2x_1+x_2)\ge8$ với $\mu=(2,0,0,0)$. Cả $(0,4)$ và $(1,2)$ đạt $8$, nên mọi điểm của đoạn nối chúng là nghiệm (Hệ quả 02.3(b)). Nghiệm của quy hoạch tuyến tính có thể không duy nhất vì mục tiêu tuyến tính không lồi chặt.

**Đỉnh của đa diện.** Khi có nghiệm và đa diện có đỉnh, luôn có một nghiệm tại đỉnh (Bertsimas và Tsitsiklis 1997, mục 2.6). Đó là cơ sở của phương pháp đơn hình ở Bài 07.

**Biến nguyên.** Nếu buộc $x$ nguyên, Mệnh đề 02.11 vẫn cho cận dưới $7$, nhưng nghiệm nguyên phải tìm riêng (Mục 5).
:::

**Trong học máy.** Quy hoạch tuyến tính xuất hiện trong ba loại tình huống:

- phân bổ tài nguyên dưới ngân sách, như chia giờ máy tính toán giữa các tác vụ (Bài tập 02.3);
- khớp mô hình với tiêu chí tuyến tính từng khúc: hồi quy sai số tuyệt đối, minimax, máy vector hỗ trợ với hình phạt chuẩn một;
- nới lỏng bài toán rời rạc (Mục 5).

Mệnh đề 02.11 cho phép kiểm tra bằng tay phương án và các hệ số $\mu$ do bộ giải trả về.

### 2.4 Kỹ thuật biến phụ: hồi quy sai số tuyệt đối và hồi quy minimax

Quy hoạch tuyến tính đòi mục tiêu tuyến tính. Bài toán khớp đường thẳng sau có mục tiêu không tuyến tính mà vẫn đưa được về quy hoạch tuyến tính. Năm quan sát đã chuẩn hóa (số liệu minh họa tự tạo) là

| $u_i$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|---:|---:|---:|---:|---:|
| $y_i$ | $-2$ | $-1$ | $3$ | $1$ | $2$ |

Mô hình dự đoán $\hat y_i=au_i+b$ với hệ số góc $a$ và hệ số chặn $b$. Ma trận thiết kế $X\in\mathbb R^{5\times2}$ có hàng $i$ là $(u_i,1)$, vector tham số $w=(a,b)$, và phần dư $r=Xw-y\in\mathbb R^5$ có thành phần $r_i=au_i+b-y_i$.

Điểm $(0,3)$ lệch hẳn khỏi bốn điểm còn lại, vốn nằm trên đường $y=u$. Đường thử $\hat y=u+1$ có phần dư $(1,1,-2,1,1)$, tổng trị tuyệt đối bằng $6$.

![Năm điểm dữ liệu (âm 2, âm 2), (âm 1, âm 1), (0, 3), (1, 1), (2, 2) và đường dự đoán thử y mũ bằng u cộng 1. Tại mỗi giá trị u có một đoạn thẳng đứng nối điểm dữ liệu với đường, biểu diễn phần dư; đoạn tại u bằng 0 dài 2, các đoạn còn lại dài 1.](img/lec-02/lp-data.svg)

Trên hình, độ dài các đoạn thẳng đứng là $\lvert r_i\rvert$. Hai tiêu chí đo độ khớp được xét: tổng các độ dài, và độ dài lớn nhất.

::: definition Định nghĩa 02.13 (Hồi quy sai số tuyệt đối và hồi quy minimax)
Theo Boyd và Vandenberghe (2004, mục 6.1). Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$ và $r=Xw-y$.

Hồi quy sai số tuyệt đối là bài toán $\min_{w\in\mathbb R^d}\lVert Xw-y\rVert_1$, với $\lVert r\rVert_1=\sum_{i=1}^N\lvert r_i\rvert$.

Hồi quy minimax (còn gọi là xấp xỉ Chebyshev) là bài toán $\min_{w\in\mathbb R^d}\lVert Xw-y\rVert_\infty$, với $\lVert r\rVert_\infty=\max_i\lvert r_i\rvert$.
:::

Hai bài toán chỉ khác cách gộp $N$ độ lệch: cộng lại hay lấy cái lớn nhất. Cả hai mục tiêu lồi theo $w$ (Định lý 01.31) và không khả vi tại điểm có phần dư bằng $0$, như Ví dụ 02.3.

Cùng với bình phương nhỏ nhất của Bài 01 (Định nghĩa 01.4), ba bài dùng chung $X$, $y$, $r$ và khác hàm gộp $\lVert r\rVert_1$, $\lVert r\rVert_\infty$, $\lVert r\rVert_2^2$. Đổi hàm gộp là đổi bài toán: ba nghiệm nói chung khác nhau (Ví dụ 02.8, 02.9, 02.11), và không có công thức chuyển nghiệm của bài này thành nghiệm bài kia.

![Mặt phẳng (r, t). Miền tô là tập các điểm thỏa t lớn hơn hoặc bằng trị tuyệt đối của r, nằm phía trên đồ thị hình chữ V của trị tuyệt đối. Miền này là giao của hai nửa mặt phẳng t lớn hơn hoặc bằng r và t lớn hơn hoặc bằng âm r.](img/lec-02/lp-epigraph.svg)

Hình trên cho trực giác của kỹ thuật biến phụ: tập các điểm nằm trên đồ thị của $\lvert r\rvert$ là giao của hai nửa mặt phẳng, và cực tiểu $t$ trên tập đó đẩy $t$ xuống chạm đồ thị. Bổ đề và định lý sau làm chính xác nhận xét này cho tổng và cực đại của nhiều hàm.

::: lemma Bổ đề 02.14 (Chặn trên một cực đại bằng các bất đẳng thức)
**Giả thiết.** $s_1,\ldots,s_K\in\mathbb R$ và $t\in\mathbb R$.

**Kết luận.** $t\ge\max_ks_k$ khi và chỉ khi $t\ge s_k$ với mọi $k=1,\ldots,K$. Đặc biệt, $t\ge\lvert r\rvert$ khi và chỉ khi $t\ge r$ và $t\ge-r$.

**Điều kiện áp dụng.** $K$ hữu hạn.

**Phạm vi.** Bổ đề nói về chặn trên. Điều kiện chặn dưới $t\le\max_ks_k$ tương đương với "có ít nhất một $k$ để $t\le s_k$", một phép "hoặc" không viết được thành một hệ bất đẳng thức tuyến tính chung.
:::

::: proof Chứng minh Bổ đề 02.14
**Bước 1 (chiều thuận).** Nếu $t\ge\max_ks_k$ thì $t\ge s_k$ với mọi $k$, vì mỗi $s_k\le\max_ks_k$.

**Bước 2 (chiều đảo).** Nếu $t\ge s_k$ với mọi $k$ thì $t$ không nhỏ hơn số lớn nhất trong các $s_k$, vì số lớn nhất đó là một trong các $s_k$.

**Bước 3 (trường hợp đặc biệt).** Đó là $K=2$ với $s_1=r$, $s_2=-r$, vì $\lvert r\rvert=\max(r,-r)$. $\square$
:::

Định lý sau cần Bổ đề 02.14 và Mệnh đề 02.6; nó tổng quát hóa cách Boyd và Vandenberghe (2004, tr. 150) đưa cực tiểu một hàm tuyến tính từng khúc về quy hoạch tuyến tính.

Định lý được phát biểu cho một hàm $f$ tùy ý cộng với một tổng có trọng số của các cực đại affine, để dùng lại ở Mục 3 (hình phạt chuẩn một), Mục 5 (mất mát bản lề) và Mục 6.

::: theorem Định lý 02.15 (Cải dạng bằng biến phụ)
**Giả thiết.** $C\subseteq\mathbb R^n$ và $f:C\to\mathbb R$ tùy ý. Với $i=1,\ldots,M$ và $k=1,\ldots,K_i$, cho các hàm affine $g_{ik}(x)=\alpha_{ik}^Tx+\beta_{ik}$, và trọng số $\gamma_i\ge0$. Xét

$$
\begin{aligned}
(\mathrm P):&\quad\min_{x\in C}\ f(x)+\sum_{i=1}^M\gamma_i\max_kg_{ik}(x),\\
(\mathrm Q):&\quad\min_{(x,t)}\ f(x)+\sum_{i=1}^M\gamma_it_i\quad\text{subject to}\quad x\in C,\ g_{ik}(x)\le t_i\ \ \forall i,k .
\end{aligned}
$$

**Kết luận.** (a) $(\mathrm Q)$ là cải dạng tương đương của $(\mathrm P)$ theo Định nghĩa 02.5 với $T(s)=s$, $\varphi(x)=(x,(\max_kg_{ik}(x))_{i})$ và $\psi(x,t)=x$; do đó hai bài có cùng giá trị tối ưu và nghiệm của bài này cho nghiệm của bài kia.

(b) Nếu $\gamma_i>0$ thì mọi nghiệm $(x^*,t^*)$ của $(\mathrm Q)$ có $t_i^*=\max_kg_{ik}(x^*)$.

(c) Tương tự, $\min_{x\in C}\max_i\max_kg_{ik}(x)$ tương đương với $\min_{(x,t)}t$ với $x\in C$, $g_{ik}(x)\le t$ với mọi $i,k$, dùng một biến phụ chung $t\in\mathbb R$.

**Điều kiện áp dụng.** Bài toán là cực tiểu, và mỗi cực đại có hệ số không âm. Khi $f(x)=c^Tx$ và $C$ là một đa diện, $(\mathrm Q)$ là quy hoạch tuyến tính.

**Phạm vi.** Định lý không áp dụng cho cực đại một tổng các cực đại, cho cực tiểu một tổng có hệ số âm trước cực đại, hay cho cực tiểu của các hàm affine (hàm lõm); trong các trường hợp đó Bổ đề 02.14 chỉ cho một chiều.
:::

::: proof Chứng minh Định lý 02.15
Ký hiệu cục bộ $m_i(x)=\max_kg_{ik}(x)$ (không phải số ràng buộc $m$).

**Bước 1 (phần (a), chiều thứ nhất của (1.3), $T(s)=s$).** Với $x\in C$, điểm $\varphi(x)=(x,t)$ với $t_i=m_i(x)$ thỏa $g_{ik}(x)\le t_i$ với mọi $k$ theo Bổ đề 02.14, nên khả thi cho $(\mathrm Q)$. Giá trị mục tiêu của $(\mathrm Q)$ tại đó bằng $f(x)+\sum_i\gamma_im_i(x)$, đúng giá trị của $(\mathrm P)$ tại $x$.

**Bước 2 (phần (a), chiều thứ hai).** Với $(x,t)$ khả thi cho $(\mathrm Q)$, $x\in C$ và Bổ đề 02.14 cho $t_i\ge m_i(x)$. Nhân với $\gamma_i\ge0$ giữ chiều, nên

$$
f(x)+\sum_i\gamma_im_i(x)\le f(x)+\sum_i\gamma_it_i .
$$

Đó là vế phải của (1.3) với $\psi(x,t)=x$. Mệnh đề 02.6 cho kết luận.

**Bước 3 (phần (b)).** Giả sử $(x^*,t^*)$ là nghiệm và $t_i^*>m_i(x^*)$ với một $i$ có $\gamma_i>0$. Thay $t_i^*$ bằng $m_i(x^*)$, giữ nguyên các thành phần khác. Điểm mới vẫn khả thi theo Bổ đề 02.14, và mục tiêu giảm một lượng $\gamma_i(t_i^*-m_i(x^*))>0$, mâu thuẫn với tính tối ưu.

**Bước 4 (phần (c)).** Áp dụng cùng lập luận với $f=0$, một cực đại duy nhất $\max_{i,k}g_{ik}$ và trọng số $1$: theo Bổ đề 02.14, $t\ge\max_{i,k}g_{ik}(x)$ khi và chỉ khi $g_{ik}(x)\le t$ với mọi $i,k$. $\square$
:::

Định lý 02.15 không làm bài toán lồi hơn; nó đổi hình thức. Mục tiêu không khả vi được thay bằng mục tiêu tuyến tính cộng các ràng buộc tuyến tính để bộ giải nhận được, với giá thêm $M$ biến và $\sum_iK_i$ ràng buộc.

Chiều cực tiểu và $\gamma_i\ge0$ dùng ở chỗ suy từ $t_i\ge\max_kg_{ik}(x)$ ra $\gamma_it_i\ge\gamma_i\max_kg_{ik}(x)$. Nếu $\gamma_i<0$, bài $(\mathrm Q)$ cho $t_i\to+\infty$ và giá trị $-\infty$.

**Trong học máy.** Với hồi quy sai số tuyệt đối trên $N$ mẫu và $d$ tham số, Định lý 02.15 cho một quy hoạch tuyến tính có $d+N$ biến và $2N$ ràng buộc. Hồi quy sai số tuyệt đối ước lượng trung vị có điều kiện, ít nhạy với ngoại lai hơn bình phương nhỏ nhất.

Hồi quy minimax ứng với tiêu chí trường hợp xấu nhất, như sai số trên mọi nhóm người dùng (Bài tập 02.17).

::: example Ví dụ 02.8 (Nghiệm hồi quy sai số tuyệt đối)
**Lập mô hình.** Theo Định lý 02.15, bài $\min_w\lVert Xw-y\rVert_1$ trên dữ liệu chung tương đương với quy hoạch tuyến tính

$$
\underset{w\in\mathbb R^2,\ t\in\mathbb R^5}{\operatorname{minimize}}\quad\mathbf 1^Tt\qquad\text{subject to}\quad -t\preceq Xw-y\preceq t,
$$

có $7$ biến và $10$ ràng buộc. Ta chứng minh $w^*=(1,0)$ là nghiệm duy nhất, với giá trị $3$.

**Bước 1 (viết phần dư theo $\delta$).** Đặt $\delta=a-1$. Phần dư tại năm điểm là

$$
\begin{aligned}
r_1&=-2a+b+2=b-2\delta, & r_2&=-a+b+1=b-\delta, & r_3&=b-3,\\
r_4&=a+b-1=b+\delta, & r_5&=2a+b-2=b+2\delta .
\end{aligned}
$$

**Bước 2 (cận dưới).** Bất đẳng thức tam giác cho hai cặp đối xứng

$$
\lvert b-\delta\rvert+\lvert b+\delta\rvert\ge\lvert(b-\delta)+(b+\delta)\rvert=2\lvert b\rvert,\qquad
\lvert b-2\delta\rvert+\lvert b+2\delta\rvert\ge2\lvert b\rvert,
$$

và cho điểm giữa $\lvert b-3\rvert=\lvert3-b\rvert\ge3-\lvert b\rvert$. Cộng ba bất đẳng thức:

$$
\lVert r\rVert_1\ge2\lvert b\rvert+2\lvert b\rvert+3-\lvert b\rvert=3+3\lvert b\rvert\ge3 .
$$

**Bước 3 (cận đạt).** Tại $w=(1,0)$, $r=(0,0,-3,0,0)$ và $\lVert r\rVert_1=3$, nên cận đạt và $w^*=(1,0)$ là nghiệm.

**Bước 4 (duy nhất).** Nếu $\lVert r\rVert_1=3$ thì $3+3\lvert b\rvert\le3$, nên $b=0$. Khi đó

$$
\lVert r\rVert_1=2\lvert\delta\rvert+\lvert\delta\rvert+3+\lvert\delta\rvert+2\lvert\delta\rvert=3+6\lvert\delta\rvert,
$$

nên $\delta=0$. Theo Định lý 02.15(b), nghiệm của quy hoạch tuyến tính là $(w^*,t^*)$ với $t^*=(0,0,3,0,0)$.

**Kiểm tra lại.** Đường thử $\hat y=u+1$ cho $6\ge3$. Sai số lớn nhất của nghiệm là $3$, đạt tại điểm $(0,3)$. Lập luận dùng tính đối xứng riêng của bộ dữ liệu ($u_i$ đối xứng quanh $0$); với dữ liệu khác cần một chứng nhận khác, chẳng hạn Mệnh đề 02.11 áp dụng cho quy hoạch tuyến tính tương đương.
:::

![Năm điểm dữ liệu và đường hồi quy sai số tuyệt đối y mũ bằng u. Đường đi qua đúng bốn điểm (âm 2, âm 2), (âm 1, âm 1), (1, 1), (2, 2); đoạn thẳng đứng duy nhất nối điểm (0, 3) với đường, dài 3.](img/lec-02/lp-lad.svg)

Trên hình, nghiệm khớp chính xác bốn điểm và chấp nhận sai số $3$ tại $(0,3)$.

::: example Ví dụ 02.9 (Nghiệm hồi quy minimax)
**Lập mô hình.** Theo Định lý 02.15(c), bài $\min_w\lVert Xw-y\rVert_\infty$ tương đương với quy hoạch tuyến tính $\min_{w,t}t$ với $-t\mathbf 1\preceq Xw-y\preceq t\mathbf 1$, có $3$ biến và $10$ ràng buộc. Ta chứng minh nghiệm duy nhất là $w^*=(1,\tfrac32)$ với $t^*=\tfrac32$.

**Bước 1 (cận dưới).** Với $\delta=a-1$ như trên, nếu mọi $\lvert r_i\rvert\le t$ thì

$$
\lvert b\rvert=\tfrac12\bigl\lvert(b-\delta)+(b+\delta)\bigr\rvert\le\tfrac12\bigl(\lvert r_2\rvert+\lvert r_4\rvert\bigr)\le t,\qquad \lvert b-3\rvert=\lvert r_3\rvert\le t,
$$

nên

$$
3=\lvert b+(3-b)\rvert\le\lvert b\rvert+\lvert3-b\rvert\le2t,
$$

tức $t\ge\tfrac32$.

**Bước 2 (cận đạt).** Tại $w=(1,\tfrac32)$, phần dư là $r=(\tfrac32,\tfrac32,-\tfrac32,\tfrac32,\tfrac32)$, từng thành phần tính như sau: $-2+\tfrac32+2$, $-1+\tfrac32+1$, $0+\tfrac32-3$, $1+\tfrac32-1$, $2+\tfrac32-2$. Vậy $\lVert r\rVert_\infty=\tfrac32$ và cận đạt.

**Bước 3 (duy nhất).** Nếu $t=\tfrac32$ thì chuỗi trên chặt, nên $\lvert b\rvert+\lvert3-b\rvert=3$ với $\lvert b\rvert\le\tfrac32$ và $\lvert3-b\rvert\le\tfrac32$, buộc $b=\tfrac32$. Khi đó $\lvert\tfrac32-\delta\rvert\le\tfrac32$ và $\lvert\tfrac32+\delta\rvert\le\tfrac32$ cho $\delta\ge0$ và $\delta\le0$, tức $\delta=0$.

**Kiểm tra lại.** Tổng trị tuyệt đối của nghiệm minimax là $5\cdot\tfrac32=\tfrac{15}2>3$, còn sai số lớn nhất của nghiệm Ví dụ 02.8 là $3>\tfrac32$. Mỗi nghiệm tốt hơn theo tiêu chí của chính nó và kém hơn theo tiêu chí kia.
:::

![Năm điểm dữ liệu và đường hồi quy minimax y mũ bằng u cộng 1,5, cùng một dải tô có nửa độ rộng 1,5 quanh đường. Cả năm điểm nằm đúng trên mép dải: bốn điểm nằm dưới đường một khoảng 1,5, điểm (0, 3) nằm trên đường một khoảng 1,5.](img/lec-02/lp-minimax.svg)

Trên hình, nghiệm minimax dời đường lên $1{,}5$ đơn vị để chia đều sai số giữa điểm $(0,3)$ và bốn điểm còn lại. Việc mọi sai số bằng $1{,}5$ là tính chất riêng của bộ dữ liệu này.

::: remark Nhận xét 02.16 (Các lỗi thường gặp khi dùng biến phụ)
1. Chỉ viết một phía $t_i\ge r_i$: với dữ liệu chung, $w=(0,-M)$ và $t_i=r_i=-M-y_i$ cho $\mathbf 1^Tt=-5M-3\to-\infty$.
2. Coi $t_i=\lvert r_i\rvert$ tại mọi điểm khả thi: điểm $(w,t)=((1,0),(1,1,3,1,1))$ khả thi mà $t_1>\lvert r_1\rvert=0$. Đẳng thức chỉ đúng tại nghiệm (Định lý 02.15(b)).
3. Dùng biến phụ cho bài cực đại: $\max_{-1\le x\le1}\lvert x\rvert=1$, còn "$\max t$ với $t\ge\pm x$" không bị chặn trên.
4. Gọi việc chuyển từ $\lVert r\rVert_1$ sang $\lVert r\rVert_\infty$ là cải dạng (xem đoạn sau Định nghĩa 02.13).
:::

::: exercise Bài tập 02.3
Một nhóm thuê hai loại máy để tiền xử lý dữ liệu huấn luyện. Mỗi giờ, máy loại I xử lý $3$ nghìn ảnh và $1$ nghìn đoạn âm thanh với giá $4$ trăm nghìn đồng; máy loại II xử lý $1$ nghìn ảnh và $2$ nghìn đoạn âm thanh với giá $3$ trăm nghìn đồng. Cần xử lý ít nhất $6$ nghìn ảnh và $7$ nghìn đoạn âm thanh; số giờ thuê là số thực không âm (số liệu minh họa).

(a) Lập quy hoạch tuyến tính và viết dạng chuẩn (2.3) của nó.

(b) Chứng minh phương án $x^*=(1,3)$ là nghiệm duy nhất bằng Mệnh đề 02.11, và tính chi phí.
:::

::: hint
Tìm $\mu_1,\mu_2\ge0$ với $(4,3)=\mu_1(3,1)+\mu_2(1,2)$.
:::

::: solution
**(a) Lập mô hình.** Gọi $x_1,x_2$ là số giờ thuê máy I, II; chi phí tính theo trăm nghìn đồng. Mô hình:

$$
\min\ 4x_1+3x_2\quad\text{subject to}\quad 3x_1+x_2\ge6,\quad x_1+2x_2\ge7,\quad x_1,x_2\ge0,
$$

trong đó ràng buộc thứ nhất cho ảnh, ràng buộc thứ hai cho âm thanh. Dạng chuẩn với biến dư $\sigma_1,\sigma_2\ge0$ và $z=(x_1,x_2,\sigma_1,\sigma_2)\succeq0$: $\min4x_1+3x_2$ với $3x_1+x_2-\sigma_1=6$, $x_1+2x_2-\sigma_2=7$.

**(b) Tìm $\mu$.** Hệ $3\mu_1+\mu_2=4$, $\mu_1+2\mu_2=3$ cho $\mu_1=1$, $\mu_2=1$, không âm.

**(b) Chứng nhận.** Theo Mệnh đề 02.11(a), mọi phương án khả thi có chi phí ít nhất $1\cdot6+1\cdot7=13$. Phương án $(1,3)$ khả thi ($3+3=6$, $1+6=7$) và có chi phí $4+9=13$, tức $1{,}3$ triệu đồng, nên là nghiệm.

**(b) Duy nhất.** Vì $\mu_1,\mu_2>0$, mọi nghiệm làm hai ràng buộc chặt (Mệnh đề 02.11(c)). Hệ $3x_1+x_2=6$, $x_1+2x_2=7$ có nghiệm duy nhất $(1,3)$, nên nghiệm duy nhất.

**Kiểm tra lại.** Hai đỉnh khác của miền, $(0,6)$ và $(7,0)$, cho chi phí $18$ và $28$.
:::

::: exercise Bài tập 02.4
Một mô hình hằng $\hat y=b$ được khớp với ba quan sát $y=(1,2,6)$.

(a) Viết bài toán $\min_b\sum_i\lvert b-y_i\rvert$ thành quy hoạch tuyến tính và chứng minh nghiệm là $b^*=2$ (trung vị) với giá trị $5$.

(b) Viết bài toán $\min_b\max_i\lvert b-y_i\rvert$ thành quy hoạch tuyến tính và chứng minh nghiệm là $b^*=\tfrac72$ (trung điểm của giá trị nhỏ nhất và lớn nhất) với giá trị $\tfrac52$. Giải thích vì sao hai nghiệm khác nhau.
:::

::: hint
Ở (a), dùng $\lvert b-1\rvert+\lvert b-6\rvert\ge\lvert(b-1)-(b-6)\rvert$. Ở (b), dùng $\max(\lvert b-1\rvert,\lvert b-6\rvert)\ge\tfrac12(\lvert b-1\rvert+\lvert6-b\rvert)$.
:::

::: solution
**(a) Lập mô hình.** Theo Định lý 02.15: $\min_{b,t}t_1+t_2+t_3$ với $-t_i\le b-y_i\le t_i$, $i=1,2,3$.

**(a) Cận và nghiệm.** $\lvert b-1\rvert+\lvert b-6\rvert\ge\lvert(b-1)-(b-6)\rvert=5$ và $\lvert b-2\rvert\ge0$, nên tổng $\ge5$. Tại $b=2$: $1+0+4=5$. Duy nhất: tổng bằng $5$ đòi $\lvert b-2\rvert=0$.

**(b) Lập mô hình.** Theo Định lý 02.15(c): $\min_{b,t}t$ với $-t\le b-y_i\le t$.

**(b) Cận.**

$$
\begin{aligned}
\max_i\lvert b-y_i\rvert&\ge\max(\lvert b-1\rvert,\lvert6-b\rvert)\\
&\ge\tfrac12(\lvert b-1\rvert+\lvert6-b\rvert)\\
&\ge\tfrac12\lvert(b-1)+(6-b)\rvert=\tfrac52 .
\end{aligned}
$$

**(b) Nghiệm.** Tại $b=\tfrac72$: $\lvert b-1\rvert=\tfrac52$, $\lvert b-2\rvert=\tfrac32$, $\lvert b-6\rvert=\tfrac52$, nên giá trị $\tfrac52$. Duy nhất: đẳng thức đòi $\lvert b-1\rvert=\lvert6-b\rvert$, tức $b=\tfrac72$.

**Diễn giải.** Hai tiêu chí là hai bài toán khác nhau: trung vị không phụ thuộc độ lớn của quan sát $6$, còn trung điểm bị kéo về phía nó.
:::

Chuỗi suy luận và kết quả của mục:

1. Định nghĩa 02.9 và Mệnh đề 02.10 cho hai dạng của quy hoạch tuyến tính;
2. Mệnh đề 02.11 chứng nhận nghiệm;
3. Định lý 02.15, đích của mục, đưa tổng và cực đại của hàm affine về quy hoạch tuyến tính.

Lớp này không biểu diễn được tổng bình phương sai số. Mục 3 giữ dữ liệu hồi quy và cho phép mục tiêu bậc hai lồi.

## 3. Quy hoạch bậc hai, chính quy hóa và ràng buộc bậc hai

Mục 2 khớp đường thẳng cho năm điểm dữ liệu bằng hai tiêu chí tuyến tính từng khúc. Tiêu chí thông dụng nhất, tổng bình phương phần dư, không thuộc lớp quy hoạch tuyến tính: trên cùng dữ liệu, đường $\hat y=u$ có tổng bình phương phần dư $9$, đường $\hat y=u+\tfrac35$ có $\tfrac{36}5$.

Cần một lớp bài toán cho phép mục tiêu bậc hai, và hai cách kiểm soát độ lớn của tham số: phạt trong mục tiêu và trần trong ràng buộc.

Mục này định nghĩa quy hoạch bậc hai (quadratic programming, QP), so sánh bốn tổ hợp sai số và hình phạt, rồi định nghĩa quy hoạch bậc hai có ràng buộc bậc hai (quadratically constrained quadratic programming, QCQP).

### 3.1 Nhu cầu và trực giác: tổng bình phương phần dư

Giữ dữ liệu $u=(-2,-1,0,1,2)$, $y=(-2,-1,3,1,2)$, ma trận thiết kế $X$ với hàng $(u_i,1)$ và $w=(a,b)$ của Mục 2.4. Tổng bình phương phần dư là

$$
E(w)=\sum_{i=1}^5(au_i+b-y_i)^2=\lVert Xw-y\rVert_2^2 .
$$

Hàm $E$ cộng bình phương của từng độ lệch, nên một độ lệch lớn bị phạt nặng hơn nhiều so với vài độ lệch nhỏ.

::: example Ví dụ 02.10 (Hai đường ứng viên dưới tiêu chí bình phương)
**Đường thứ nhất.** Đường $\hat y=u$ ($a=1$, $b=0$) có $r=(0,0,-3,0,0)$ và $E=9$.

**Đường thứ hai.** Đường $\hat y=u+\tfrac35$ ($a=1$, $b=\tfrac35$) có

$$
\begin{aligned}
r_1&=-2+\tfrac35+2=\tfrac35, & r_2&=-1+\tfrac35+1=\tfrac35, & r_3&=\tfrac35-3=-\tfrac{12}5,\\
r_4&=1+\tfrac35-1=\tfrac35, & r_5&=2+\tfrac35-2=\tfrac35,
\end{aligned}
$$

nên

$$
E=4\cdot\tfrac9{25}+\tfrac{144}{25}=\tfrac{180}{25}=\tfrac{36}5 .
$$

**Kiểm tra lại.** Tổng phần dư của đường thứ hai là $4\cdot\tfrac35-\tfrac{12}5=0$, đúng với tính chất của nghiệm bình phương nhỏ nhất có hệ số chặn (phương trình chuẩn theo $b$ cho $\sum_ir_i=0$). Ví dụ 02.11 dưới đây chứng minh đường này là nghiệm.
:::

![Năm điểm dữ liệu với hai đường dự đoán: đường nét đứt y mũ bằng u đi qua bốn điểm, và đường nét liền y mũ bằng u cộng 0,6 nằm cao hơn 0,6 đơn vị. Các đoạn thẳng đứng là phần dư của đường nét liền: bốn đoạn ngắn dài 0,6 và một đoạn dài 2,4 tại điểm (0, 3).](img/lec-02/qp-ls.svg)

Đường nét liền chấp nhận bốn sai số nhỏ để giảm sai số tại $(0,3)$ từ $3$ xuống $2{,}4$. Với bình phương, đổi này có lợi vì $9>4\cdot0{,}36+5{,}76=7{,}2$.

**Trực giác (chưa phải định nghĩa).** $E$ là đa thức bậc hai theo $(a,b)$ với phần bậc hai xác định dương ($X^TX=\operatorname{diag}(10,5)\succ0$, Ví dụ 02.11), nên tập mức là các elip đồng tâm. Lớp bài toán cần tìm cho phép mục tiêu bậc hai, nhưng chỉ loại có phần bậc hai nửa xác định dương.

### 3.2 Quy hoạch bậc hai

::: definition Định nghĩa 02.17 (Quy hoạch bậc hai)
Cho ma trận đối xứng $P\in\mathbb R^{n\times n}$ với $P\succeq0$, vector $q\in\mathbb R^n$, số $s\in\mathbb R$, và $G,h,A,b$ như Định nghĩa 02.9. Quy hoạch bậc hai là

$$
\underset{x\in\mathbb R^n}{\operatorname{minimize}}\quad\tfrac12x^TPx+q^Tx+s\qquad\text{subject to}\quad Gx\preceq h,\quad Ax=b .
\tag{3.1}
$$
:::

Trong (3.1), phần bậc hai $\tfrac12x^TPx$ xác định độ cong; hệ số $\tfrac12$ là quy ước để gradient bằng $Px+q$. Điều kiện $P\succeq0$ là một phần của định nghĩa: một bài cùng hình thức với $P$ không nửa xác định dương không lồi và không thuộc Định nghĩa 02.17. Tập khả thi là một đa diện, như ở quy hoạch tuyến tính.

Quy hoạch tuyến tính là trường hợp $P=0$ của (3.1).

Bình phương nhỏ nhất không ràng buộc là trường hợp $x=w$, $P=2X^TX$, $q=-2X^Ty$, $s=y^Ty$, không có $G$ và $A$. Căn cứ là đẳng thức (3.2) của Bài 01 (Mệnh đề 01.5),

$$
J(w+v)=J(w)+2v^TX^T(Xw-y)+\lVert Xv\rVert_2^2,\qquad J(w)=\lVert Xw-y\rVert_2^2 .
$$

Áp dụng tại $w=0$ với $v$ thay bằng $w$, đẳng thức này cho $\lVert Xw-y\rVert_2^2=w^TX^TXw-2y^TXw+y^Ty$.

Ma trận $2X^TX$ luôn nửa xác định dương vì $v^T(2X^TX)v=2\lVert Xv\rVert_2^2\ge0$. Vì vậy bình phương nhỏ nhất luôn là quy hoạch bậc hai, kể cả khi $X$ không có hạng cột đầy đủ.

Kết quả sau dùng Định lý 01.30 (điều kiện bậc hai), Định lý 01.38 (tồn tại với hàm bức) và Định lý 01.35 (duy nhất). Nó trả lời khi nào quy hoạch bậc hai có đúng một nghiệm.

::: proposition Mệnh đề 02.18 (Tính lồi, tồn tại và duy nhất của quy hoạch bậc hai)
**Giả thiết.** Bài toán (3.1) với $P\succeq0$.

**Kết luận.**

- (a) (3.1) là bài toán tối ưu lồi dạng chuẩn.
- (b) Nếu thêm $P\succ0$ và tập khả thi không rỗng thì (3.1) có đúng một nghiệm.

**Điều kiện áp dụng.** (b) cần $P\succ0$; với $P\succeq0$ suy biến, nghiệm có thể không tồn tại hoặc không duy nhất.

**Phạm vi.** Với $P$ suy biến, bài toán có thể không bị chặn dưới: $\min_{x\in\mathbb R^2}x_1^2+x_2$ có $P=\operatorname{diag}(2,0)\succeq0$ và giá trị $-\infty$ khi $x_2\to-\infty$.
:::

::: proof Chứng minh Mệnh đề 02.18
**Bước 1 (phần (a)).** Hàm $f_0(x)=\tfrac12x^TPx+q^Tx+s$ khả vi hai lần trên $\mathbb R^n$ với $\nabla f_0(x)=Px+q$ và $\nabla^2f_0(x)=P\succeq0$, nên lồi theo Định lý 01.30(a). Các ràng buộc affine. Bài toán ở dạng (1.1).

**Bước 2 (phần (b): chặn dưới bậc hai).** Theo phân rã trị riêng $P=V\Lambda V^T$ với $V$ trực giao và $\Lambda$ chéo (Bài 00, mục "Phân rã trị riêng"),

$$
x^TPx=(V^Tx)^T\Lambda(V^Tx)\ge\lambda_{\min}\lVert V^Tx\rVert_2^2=\lambda_{\min}\lVert x\rVert_2^2,
$$

với $\lambda_{\min}>0$ là giá trị riêng nhỏ nhất của $P\succ0$. Bất đẳng thức Cauchy–Schwarz cho $q^Tx\ge-\lVert q\rVert_2\lVert x\rVert_2$, nên

$$
f_0(x)\ge\tfrac{\lambda_{\min}}2\lVert x\rVert_2^2-\lVert q\rVert_2\lVert x\rVert_2+s .
$$

**Bước 3 (phần (b): tính bức và tồn tại).** Vế phải là một đa thức bậc hai theo $\lVert x\rVert_2$ với hệ số bậc hai dương, dần tới $+\infty$ khi $\lVert x\rVert_2\to\infty$: $f_0$ bức. Tập khả thi là tập nghiệm của hữu hạn bất đẳng thức tuyến tính không chặt và đẳng thức tuyến tính, nên đóng, và không rỗng theo giả thiết; $f_0$ liên tục. Định lý 01.38 cho nghiệm tồn tại.

**Bước 4 (phần (b): duy nhất).** Vì $P\succ0$, $f_0$ lồi chặt theo Định lý 01.30(b), và Định lý 01.35 cho nghiệm duy nhất. $\square$
:::

**Trong học máy.** Hồi quy với hệ số không âm và hồi quy với tổng hệ số bằng $1$ (trộn dự đoán của nhiều mô hình, Tình huống 01.2 của Bài 01) là quy hoạch bậc hai. Các bước con của phương pháp Newton có ràng buộc đẳng thức (Bài 04) cũng vậy.

Giả thiết $P\succ0$ bị vi phạm khi đặc trưng phụ thuộc tuyến tính; Mục 3.3 khôi phục nó bằng chính quy hóa.

::: example Ví dụ 02.11 (Nghiệm bình phương nhỏ nhất trên dữ liệu chung)
**Các tổng cần thiết.**

$$
\begin{aligned}
\textstyle\sum_iu_i^2&=4+1+0+1+4=10, & \textstyle\sum_iu_i&=0,\\
\textstyle\sum_iy_i&=-2-1+3+1+2=3, & \textstyle\sum_iu_iy_i&=4+1+0+1+4=10,\\
\textstyle\sum_iy_i^2&=4+1+9+1+4=19 .
\end{aligned}
$$

Vì cột thứ hai của $X$ toàn số $1$,

$$
X^TX=\begin{bmatrix}\sum u_i^2&\sum u_i\\ \sum u_i&5\end{bmatrix}=\begin{bmatrix}10&0\\0&5\end{bmatrix},\qquad X^Ty=\begin{bmatrix}\sum u_iy_i\\ \sum y_i\end{bmatrix}=\begin{bmatrix}10\\3\end{bmatrix},\qquad y^Ty=19 .
$$

**Kiểm giả thiết.** Bài toán là quy hoạch bậc hai với $P=2X^TX=\operatorname{diag}(20,10)\succ0$, $q=-2X^Ty=(-20,-6)$, $s=19$, nên có đúng một nghiệm theo Mệnh đề 02.18(b).

**Tính.** Khai triển và bù bình phương:

$$
E(w)=10a^2+5b^2-20a-6b+19=10(a-1)^2+5\bigl(b-\tfrac35\bigr)^2+\tfrac{36}5,
\tag{3.2}
$$

với hằng số $19-10-\tfrac95=\tfrac{36}5$. Hai bình phương không âm và bằng $0$ khi $a=1$, $b=\tfrac35$, nên $w^*=(1,\tfrac35)$ và $E(w^*)=\tfrac{36}5$.

**Kiểm tra lại.** Phương trình chuẩn $X^TXw=X^Ty$ cho $10a=10$, $5b=3$, cùng nghiệm. Theo (3.2), $E(1,0)=5\cdot\tfrac9{25}+\tfrac{36}5=\tfrac95+\tfrac{36}5=9$, khớp với Ví dụ 02.10.
:::

::: example Ví dụ 02.12 (Bình phương nhỏ nhất với ràng buộc hệ số góc)
**Lập mô hình.** Thêm ràng buộc $a\le\tfrac12$, chẳng hạn vì một hiểu biết chuyên môn cho rằng đầu ra không tăng nhanh hơn một nửa đầu vào. Bài toán vẫn là quy hoạch bậc hai với $G=[1\ \ 0]$, $h=\tfrac12$. Nghiệm không ràng buộc $(1,\tfrac35)$ vi phạm ràng buộc.

**Tìm ứng viên.** Theo (3.2), với mỗi $a$ cố định, hạng $5(b-\tfrac35)^2$ nhỏ nhất tại $b=\tfrac35$. Hạng $10(a-1)^2$ giảm khi $a$ tăng về $1$, nên trên $a\le\tfrac12$ nhỏ nhất tại $a=\tfrac12$. Ứng viên $w^*=(\tfrac12,\tfrac35)$, với

$$
E(w^*)=10\cdot\tfrac14+\tfrac{36}5=\tfrac52+\tfrac{36}5=\tfrac{97}{10}.
$$

**Chứng nhận bằng (1.2).** $\nabla E(w)=(20(a-1),\ 10(b-\tfrac35))$ theo (3.2), nên $\nabla E(w^*)=(-10,0)$. Với mọi $w$ khả thi, $\nabla E(w^*)^T(w-w^*)=-10(a-\tfrac12)\ge0$ vì $a\le\tfrac12$. Theo Hệ quả 02.3(c), $w^*$ là nghiệm; nó duy nhất theo Mệnh đề 02.18(b).

**Kiểm tra lại.** Điểm khả thi $(0,\tfrac35)$ cho $E=10+\tfrac{36}5=\tfrac{86}5=17{,}2>9{,}7$. Theo Mệnh đề 01.16, thêm ràng buộc làm giá trị tối ưu tăng từ $7{,}2$ lên $9{,}7$, không giảm.
:::

![Các đường đồng mức hình elip của E(a, b) bằng 10 (a trừ 1) bình phương cộng 5 (b trừ 0,6) bình phương cộng 7,2, có tâm chung tại nghiệm tự do (1; 0,6). Nửa mặt phẳng a nhỏ hơn hoặc bằng 0,5 được tô nhạt. Nghiệm có ràng buộc (0,5; 0,6) nằm trên biên a bằng 0,5, tại chỗ một elip tiếp xúc với biên.](img/lec-02/qp-geometry.svg)

Trên hình, nghiệm có ràng buộc là điểm của miền nằm trên elip thấp nhất còn chạm miền.

Tại đó gradient $(-10,0)$ vuông góc với biên $a=\tfrac12$ và $-\nabla E$ chỉ ra ngoài miền, nên không dịch chuyển khả thi nào làm $E$ giảm theo xấp xỉ bậc nhất. Đó là nội dung hình học của (1.2).

::: remark Nhận xét 02.19 (Vai trò của giả thiết $P\succ0$)
So với Mệnh đề 01.6 của Bài 01, vốn không cho ràng buộc, Mệnh đề 02.18(b) cho phép ràng buộc tuyến tính tùy ý và trả giá bằng giả thiết $P\succ0$, tức $\operatorname{rank}X=d$ với bình phương nhỏ nhất. Giả thiết đó dùng hai lần: cho tính bức (tồn tại) và tính lồi chặt (duy nhất).

Nhầm lẫn thường gặp là suy ra có nghiệm chỉ từ $P\succeq0$; phản ví dụ ở phần Phạm vi.
:::

### 3.3 Chính quy hóa: bốn tổ hợp sai số và hình phạt

Khi có nhiều đặc trưng và ít mẫu, hệ số bình phương nhỏ nhất có thể lớn, thay đổi mạnh theo dữ liệu, hoặc không duy nhất (Mệnh đề 01.6 của Bài 01). Một cách kiểm soát là cộng vào mục tiêu một hạng phạt độ lớn của $w$, thường là $\lVert w\rVert_1=\lvert a\rvert+\lvert b\rvert$ hoặc $\lVert w\rVert_2^2=a^2+b^2$.

![Mặt phẳng (a, b) với hai trục cùng tỷ lệ. Hình thoi là tập trị tuyệt đối của a cộng trị tuyệt đối của b bằng 0,8, có bốn đỉnh nằm trên hai trục. Đường tròn là tập a bình phương cộng b bình phương bằng 0,64, bán kính 0,8.](img/lec-02/qp-penalties.svg)

**Trực giác (chưa phải định nghĩa).** Tập mức của $\lVert w\rVert_1$ trên hình có đỉnh nằm trên các trục, nên khi một elip đồng mức của sai số chạm hình thoi, điểm chạm thường là một đỉnh, nơi một tọa độ bằng $0$. Tập mức của $\lVert w\rVert_2^2$ tròn đều, nên điểm chạm nói chung có mọi tọa độ khác $0$.

Chính quy hóa chuẩn một có xu hướng cho hệ số bằng $0$, chính quy hóa bậc hai chỉ thu nhỏ hệ số.

::: example Ví dụ 02.13 (Phạt một hệ số: thu nhỏ và triệt tiêu)
**Lập mô hình.** Giữ hệ số góc $a=1$ cố định trên dữ liệu chung. Theo (3.2), sai số theo hệ số chặn là $5(b-\tfrac35)^2+\tfrac{36}5$, nhỏ nhất tại $b=\tfrac35$.

**Phạt bình phương.** Cực tiểu $5(b-\tfrac35)^2+\lambda b^2$: đạo hàm $10(b-\tfrac35)+2\lambda b=0$ cho $b=\tfrac3{5+\lambda}$, bằng $\tfrac3{10}$ khi $\lambda=5$ và $\tfrac15$ khi $\lambda=10$, luôn dương.

**Phạt trị tuyệt đối.** Cực tiểu $5(b-\tfrac35)^2+\lambda\lvert b\rvert$.

- Trên $b>0$, đạo hàm $10(b-\tfrac35)+\lambda=0$ cho $b=\tfrac35-\tfrac\lambda{10}$, dương khi $\lambda<6$.
- Khi $\lambda\ge6$, hàm tăng trên $b>0$ (đạo hàm $\ge10b>0$) và giảm trên $b<0$ (đạo hàm $10(b-\tfrac35)-\lambda<0$), nên nghiệm là $b=0$.

**Kiểm tra lại.** Với $\lambda=5$ và phạt bình phương: $10(\tfrac3{10}-\tfrac35)+10\cdot\tfrac3{10}=-3+3=0$. Với $\lambda=4$ và phạt trị tuyệt đối: $b=\tfrac15$ và $10(\tfrac15-\tfrac35)+4=0$.

**Diễn giải.** Hai phép phạt cùng kéo $b$ về $0$; chỉ phép phạt trị tuyệt đối đặt $b$ bằng đúng $0$, từ $\lambda=6$.
:::

::: definition Định nghĩa 02.20 (Bài toán hồi quy có chính quy hóa)
Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$, $r=Xw-y$ và $\lambda\ge0$. Bài toán hồi quy có chính quy hóa là

$$
\underset{w\in\mathbb R^d}{\operatorname{minimize}}\quad L(w)+\lambda R(w),
$$

với hàm sai số $L(w)\in\{\lVert r\rVert_1,\ \lVert r\rVert_2^2\}$ và hình phạt $R(w)\in\{\lVert w\rVert_1,\ \lVert w\rVert_2^2\}$.

Bốn tổ hợp được ký hiệu $\ell_1+\ell_1$, $\ell_1+\ell_2^2$, $\ell_2^2+\ell_1$, $\ell_2^2+\ell_2^2$, theo thứ tự (sai số, hình phạt). Tổ hợp $\ell_2^2+\ell_1$ là LASSO (least absolute shrinkage and selection operator); tổ hợp $\ell_2^2+\ell_2^2$ là hồi quy ridge (chính quy hóa Tikhonov).
:::

Trong định nghĩa, $\lambda$ là dữ liệu do người lập mô hình chọn; $\lambda=0$ cho lại bài không chính quy hóa.

Chính quy hóa đổi bài toán (Nhận xét 02.7): nghiệm của $L+\lambda R$ nói chung khác nghiệm của $L$ (Ví dụ 02.13), và hai giá trị không cùng thước đo.

Tổ hợp $\ell_2^2+\ell_2^2$ là chính quy hóa bậc hai của Định nghĩa 01.42 trong Bài 01. Các ví dụ của mục phạt cả hệ số chặn $b$ để tính tay; trong thực hành hệ số chặn thường không bị phạt (Tình huống 02.1).

Kết quả sau phân lớp bốn tổ hợp. Nó dùng Định lý 02.15 cho các hạng chuẩn một, Mệnh đề 02.18 cho phần bậc hai, Định lý 01.38 cho sự tồn tại và Định lý 01.35 cho tính duy nhất.

::: proposition Mệnh đề 02.21 (Phân lớp và nghiệm của bốn tổ hợp)
**Giả thiết.** Bài toán của Định nghĩa 02.20 với $\lambda>0$.

**Kết luận.**

- (a) Sau khi thêm biến phụ theo Định lý 02.15 cho mỗi hạng chuẩn một, tổ hợp $\ell_1+\ell_1$ là quy hoạch tuyến tính, ba tổ hợp còn lại là quy hoạch bậc hai; tổ hợp $\ell_2^2+\ell_2^2$ không cần biến phụ và có $P=2(X^TX+\lambda I_d)\succ0$.
- (b) Cả bốn bài toán có nghiệm.
- (c) Hai tổ hợp có hình phạt $\ell_2^2$ có đúng một nghiệm; tổ hợp $\ell_2^2+\ell_1$ có đúng một nghiệm nếu $\operatorname{rank}X=d$.

**Điều kiện áp dụng.** $\lambda>0$ dùng cho (b) và (c).

**Phạm vi.** Tổ hợp $\ell_1+\ell_1$ có thể có vô số nghiệm (Ví dụ 02.14). Mệnh đề không cho công thức nghiệm; công thức dạng đóng chỉ có cho $\ell_2^2+\ell_2^2$, và cho $\ell_2^2+\ell_1$ khi $X^TX$ chéo (Bổ đề 02.22).
:::

::: proof Chứng minh Mệnh đề 02.21
**Bước 1 (phần (a): thêm biến phụ).** Viết $\lVert r\rVert_1=\sum_i\max(r_i,-r_i)$ và $\lVert w\rVert_1=\sum_j\max(w_j,-w_j)$, tổng các cực đại của hàm affine theo $w$. Định lý 02.15 với $C=\mathbb R^d$ thay mỗi hạng bằng một biến phụ $t_i$ (cho phần dư) hoặc $v_j$ (cho hệ số) cùng hai ràng buộc tuyến tính, và giữ nguyên phần còn lại $f$.

**Bước 2 (phần (a): phân lớp từng tổ hợp).**

- Với $\ell_1+\ell_1$, $f=0$ và mục tiêu mới $\mathbf 1^Tt+\lambda\mathbf 1^Tv$ tuyến tính: quy hoạch tuyến tính.
- Với $\ell_1+\ell_2^2$, $f(w)=\lambda w^Tw$, và mục tiêu mới theo biến $(w,t)$ có ma trận bậc hai $\operatorname{diag}(2\lambda I_d,0)\succeq0$.
- Với $\ell_2^2+\ell_1$, $f(w)=\lVert Xw-y\rVert_2^2$, và ma trận bậc hai theo $(w,v)$ là $\operatorname{diag}(2X^TX,0)\succeq0$.
- Với $\ell_2^2+\ell_2^2$, khai triển cho $w^T(X^TX+\lambda I)w-2y^TXw+y^Ty$, nên $P=2(X^TX+\lambda I)$. Ngoài ra $v^T(X^TX+\lambda I)v=\lVert Xv\rVert_2^2+\lambda\lVert v\rVert_2^2>0$ khi $v\ne0$, nên $P\succ0$.

**Bước 3 (phần (b): tồn tại).** Mục tiêu liên tục trên $\mathbb R^d$ và không nhỏ hơn $\lambda R(w)$, vì $L\ge0$. Hình phạt bức: $\lVert w\rVert_2^2\to\infty$ khi $\lVert w\rVert_2\to\infty$, và $\lVert w\rVert_1\ge\lVert w\rVert_2$ vì

$$
\lVert w\rVert_1^2=\sum_jw_j^2+\sum_{j\ne k}\lvert w_j\rvert\lvert w_k\rvert\ge\lVert w\rVert_2^2 .
$$

Vậy mục tiêu bức, và Định lý 01.38 với $C=\mathbb R^d$ cho nghiệm tồn tại.

**Bước 4 (phần (c): duy nhất).**

- Hàm $\lambda\lVert w\rVert_2^2$ có Hessian $2\lambda I\succ0$ nên lồi chặt; cộng với hàm lồi $L$ cho hàm lồi chặt theo Định lý 01.31(a).
- Với $\ell_2^2+\ell_1$ và $\operatorname{rank}X=d$, $E$ có Hessian $2X^TX\succ0$ nên lồi chặt, và cộng với hàm lồi $\lambda\lVert w\rVert_1$ cho hàm lồi chặt.

Trong các trường hợp này, Định lý 01.35 cho nhiều nhất một nghiệm, và (b) cho ít nhất một. $\square$
:::

Mệnh đề 02.21 mở rộng Mệnh đề 02.18 theo hai hướng: mục tiêu được chứa hạng không khả vi (nhờ Định lý 02.15), và sự tồn tại đến từ tính bức của hình phạt thay cho $P\succ0$.

Đổi lại, (c) chỉ cho tính duy nhất với ba tổ hợp. Với $\ell_2^2+\ell_1$, khi hai cột của $X$ trùng nhau, có thể chia hệ số cùng dấu giữa hai cột theo vô số cách mà không đổi sai số lẫn $\lVert w\rVert_1$.

Với dữ liệu chung, $X^TX=\operatorname{diag}(10,5)$ chéo, và theo (3.2) mục tiêu của LASSO tách thành hai bài toán một biến độc lập, mỗi bài có dạng $\alpha(s-m)^2+\lambda\lvert s\rvert$. Bổ đề sau giải bài toán một biến đó.

::: lemma Bổ đề 02.22 (Ngưỡng mềm)
**Giả thiết.** $\alpha>0$, $\lambda\ge0$, $m\in\mathbb R$ (ký hiệu cục bộ cho tâm của ngưỡng mềm, không phải số ràng buộc); $\phi(s)=\alpha(s-m)^2+\lambda\lvert s\rvert$ trên $\mathbb R$.

**Kết luận.** $\phi$ có đúng một điểm cực tiểu

$$
s^*=\operatorname{sign}(m)\max\Bigl(\lvert m\rvert-\frac{\lambda}{2\alpha},\ 0\Bigr),
\tag{3.3}
$$

trong đó $\operatorname{sign}(m)$ bằng $1$, $0$, $-1$ khi $m>0$, $m=0$, $m<0$. Đặc biệt $s^*=0$ khi và chỉ khi $\lvert m\rvert\le\lambda/(2\alpha)$.

**Điều kiện áp dụng.** Bài toán một biến; áp dụng cho nhiều biến khi mục tiêu tách thành tổng các bài một biến, như khi $X^TX$ chéo.

**Phạm vi.** Khi $X^TX$ không chéo, các tọa độ liên kết với nhau, và áp dụng (3.3) cho từng tọa độ của nghiệm bình phương nhỏ nhất không cho nghiệm LASSO.
:::

::: proof Chứng minh Bổ đề 02.22
**Bước 1 (bù bình phương trên mỗi nửa trục).** Đặt $\kappa=\lambda/(2\alpha)\ge0$. Bù bình phương cho $\alpha(s-m)^2\pm\lambda s=\alpha s^2-2\alpha(m\mp\kappa)s+\alpha m^2$, nên

$$
\phi(s)=\begin{cases}\alpha\bigl(s-(m-\kappa)\bigr)^2+c_+, & s\in[0,\infty),\\[2pt] \alpha\bigl(s-(m+\kappa)\bigr)^2+c_-, & s\in(-\infty,0],\end{cases}
$$

với các hằng số $c_\pm$ không phụ thuộc $s$. Trên mỗi nửa trục, $\phi$ là parabol hướng lên, nên đạt cực tiểu duy nhất tại điểm của nửa trục gần đỉnh nhất.

**Bước 2 (xét ba trường hợp).**

- Trường hợp $m>\kappa$. Đỉnh $m-\kappa>0$ thuộc $[0,\infty)$, nên cực tiểu trên nửa trục phải tại $m-\kappa$. Đỉnh $m+\kappa>0$ nằm ngoài $(-\infty,0]$, nên cực tiểu trên nửa trục trái tại $s=0$. Điểm này cũng thuộc nửa trục phải, nên giá trị đó không nhỏ hơn cực tiểu trên nửa trục phải. Vậy $s^*=m-\kappa$, khớp (3.3).
- Trường hợp $\lvert m\rvert\le\kappa$. Đỉnh $m-\kappa\le0$ nên cực tiểu trên nửa trục phải tại $0$; đỉnh $m+\kappa\ge0$ nên cực tiểu trên nửa trục trái tại $0$. Vậy $s^*=0$.
- Trường hợp $m<-\kappa$ đối xứng với trường hợp đầu, cho $s^*=m+\kappa=-(\lvert m\rvert-\kappa)$.

**Bước 3 (duy nhất).** Trong mọi trường hợp, cực tiểu trên mỗi nửa trục duy nhất (parabol hướng lên với $\alpha>0$). Hai ứng viên hoặc trùng nhau tại $0$, hoặc cho giá trị khác nhau với ứng viên tại $0$ bị loại, nên $s^*$ duy nhất. $\square$
:::

Công thức (3.3) kéo nghiệm không phạt $m$ về phía $0$ một đoạn $\lambda/(2\alpha)$ và dừng ở $0$ nếu kéo qua. Đó là cơ chế làm hệ số bằng $0$ của LASSO.

Với chính quy hóa bậc hai, bài một biến $\alpha(s-m)^2+\lambda s^2$ có nghiệm $\alpha m/(\alpha+\lambda)$, khác $0$ khi $m\ne0$.

**Trong học máy.** Hồi quy ridge ($\ell_2^2+\ell_2^2$) và suy giảm trọng số (weight decay) trong huấn luyện mạng dùng cùng hạng phạt, và Mệnh đề 02.21(c) cho nghiệm duy nhất kể cả khi đặc trưng phụ thuộc tuyến tính.

LASSO ($\ell_2^2+\ell_1$) dùng để chọn đặc trưng: Bổ đề 02.22 cho hệ số bằng đúng $0$ khi tương quan của đặc trưng với đầu ra yếu so với $\lambda$ (Tình huống 02.1). Các mệnh đề của mục chỉ bảo đảm bài toán với một $\lambda$ đã chọn là lồi và có nghiệm.

::: example Ví dụ 02.14 (Tổ hợp $\ell_1+\ell_1$: nghiệm và tập nghiệm)
**Bước 1 (cận dưới chung).** Xét $\min_w\lVert r\rVert_1+\lambda(\lvert a\rvert+\lvert b\rvert)$ trên dữ liệu chung. Với $\delta=a-1$ như Ví dụ 02.8, bất đẳng thức tam giác áp dụng cho hiệu của hai cặp đối xứng cho

$$
\lvert b-\delta\rvert+\lvert b+\delta\rvert\ge\lvert(b+\delta)-(b-\delta)\rvert=2\lvert\delta\rvert,\qquad\lvert b-2\delta\rvert+\lvert b+2\delta\rvert\ge4\lvert\delta\rvert,
$$

và $\lvert b-3\rvert\ge3-\lvert b\rvert$. Cộng lại, $\lVert r\rVert_1\ge6\lvert a-1\rvert+3-\lvert b\rvert$, nên mục tiêu không nhỏ hơn

$$
\bigl(6\lvert a-1\rvert+\lambda\lvert a\rvert\bigr)+3+(\lambda-1)\lvert b\rvert .
$$

**Bước 2 ($\lambda=4$).** Hàm $6\lvert a-1\rvert+4\lvert a\rvert$ bằng

- $6-10a$ khi $a\le0$;
- $6-2a$ khi $0\le a\le1$;
- $10a-6$ khi $a\ge1$;

nhỏ nhất bằng $4$ duy nhất tại $a=1$. Hạng $3\lvert b\rvert\ge0$ bằng $0$ duy nhất tại $b=0$. Mục tiêu $\ge7$, đạt tại $(1,0)$ (sai số $3$, phạt $4$), nên $w^*=(1,0)$ là nghiệm duy nhất.

**Bước 3 ($\lambda=8$).** $6\lvert a-1\rvert+8\lvert a\rvert$ nhỏ nhất bằng $6$ tại $a=0$. Mục tiêu $\ge9$, đạt tại $(0,0)$ với sai số $\lVert y\rVert_1=9$ và phạt $0$.

**Bước 4 ($\lambda=6$: tập nghiệm là một đoạn).** $6\lvert a-1\rvert+6\lvert a\rvert=6$ với mọi $a\in[0,1]$, nên mục tiêu $\ge9$. Tại $(a,0)$ với $a\in[0,1]$, $\delta=a-1\le0$ và $\lvert b\rvert=0\le\lvert\delta\rvert$, nên hai bất đẳng thức cặp chặt và $\lVert r\rVert_1=6(1-a)+3$. Mục tiêu bằng $6(1-a)+3+6a=9$. Mọi điểm của đoạn nối $(0,0)$ và $(1,0)$ là nghiệm.

Ngược lại, một nghiệm có mục tiêu $9$ phải làm cận chặt, tức $6\lvert a-1\rvert+6\lvert a\rvert=6$ và $5\lvert b\rvert=0$, nên $a\in[0,1]$, $b=0$: tập nghiệm nằm trong đoạn đó.

**Kiểm tra lại.** Với $\lambda=6$ và $w=(\tfrac12,0)$: $r=(1,\tfrac12,-3,-\tfrac12,-1)$, $\lVert r\rVert_1=6$, phạt $3$, tổng $9$. Tập nghiệm là một đoạn, lồi, đúng với Hệ quả 02.3(b), và không duy nhất, đúng với Phạm vi của Mệnh đề 02.21.
:::

::: example Ví dụ 02.15 (Tổ hợp $\ell_1+\ell_2^2$ với $\lambda=4$)
**Kiểm giả thiết.** Mục tiêu $\Phi(w)=\lVert r\rVert_1+4(a^2+b^2)$ lồi chặt, nên có đúng một nghiệm (Mệnh đề 02.21(c)).

**Bước 1 (cận dưới).** Từ Ví dụ 02.14, $\lVert r\rVert_1\ge6\lvert a-1\rvert+\lvert b-3\rvert\ge6\lvert a-1\rvert+3-b$, nên

$$
\Phi(w)\ge\bigl(6\lvert a-1\rvert+4a^2\bigr)+\bigl(4b^2-b\bigr)+3 .
$$

**Bước 2 (cực tiểu từng phần).**

- Phần theo $b$: $4b^2-b=4(b-\tfrac18)^2-\tfrac1{16}\ge-\tfrac1{16}$, dấu bằng tại $b=\tfrac18$.
- Phần theo $a$: với $a\le1$, $6(1-a)+4a^2=4(a-\tfrac34)^2+\tfrac{15}4\ge\tfrac{15}4$, dấu bằng tại $a=\tfrac34$; với $a\ge1$, $4a^2+6a-6$ tăng và $\ge4>\tfrac{15}4$.

Vậy $\Phi\ge\tfrac{15}4-\tfrac1{16}+3=\tfrac{107}{16}$.

**Bước 3 (cận đạt).** Tại $w=(\tfrac34,\tfrac18)$:

$$
\begin{aligned}
r_1&=-\tfrac32+\tfrac18+2=\tfrac58, & r_2&=-\tfrac34+\tfrac18+1=\tfrac38, & r_3&=\tfrac18-3=-\tfrac{23}8,\\
r_4&=\tfrac34+\tfrac18-1=-\tfrac18, & r_5&=\tfrac32+\tfrac18-2=-\tfrac38 .
\end{aligned}
$$

Tổng trị tuyệt đối $\tfrac{5+3+23+1+3}8=\tfrac{35}8$, phạt $4(\tfrac9{16}+\tfrac1{64})=\tfrac{37}{16}$, và $\Phi=\tfrac{70}{16}+\tfrac{37}{16}=\tfrac{107}{16}$. Cận đạt, nên $w^*=(\tfrac34,\tfrac18)$.

**Kiểm tra lại.** $\Phi(1,0)=3+4=7=\tfrac{112}{16}>\tfrac{107}{16}$. Ba bất đẳng thức tạo cận đều chặt tại $w^*$: $\lvert b\rvert=\tfrac18\le\lvert\delta\rvert=\tfrac14$ cho hai bất đẳng thức cặp, và $b\le3$ cho $\lvert b-3\rvert=3-b$.
:::

::: example Ví dụ 02.16 (Tổ hợp $\ell_2^2+\ell_1$: LASSO trên dữ liệu chung)
**Tách biến.** Theo (3.2),

$$
E(w)+\lambda(\lvert a\rvert+\lvert b\rvert)=\bigl[10(a-1)^2+\lambda\lvert a\rvert\bigr]+\bigl[5(b-\tfrac35)^2+\lambda\lvert b\rvert\bigr]+\tfrac{36}5,
$$

tổng của hai bài một biến độc lập. Bổ đề 02.22 với $(\alpha,m)=(10,1)$ và $(5,\tfrac35)$ cho

$$
a_\lambda=\max\Bigl(1-\frac{\lambda}{20},0\Bigr),\qquad b_\lambda=\max\Bigl(\frac35-\frac{\lambda}{10},0\Bigr).
$$

**Tính.**

- Với $\lambda=4$: $w^*=(\tfrac45,\tfrac15)$, $E=10\cdot\tfrac1{25}+5\cdot\tfrac4{25}+\tfrac{36}5=\tfrac{10+20+180}{25}=\tfrac{42}5$, phạt $4$, mục tiêu $\tfrac{62}5$.
- Với $\lambda=8$: $w^*=(\tfrac35,0)$, hệ số chặn bằng đúng $0$.
- Ngưỡng triệt tiêu: $b_\lambda=0$ khi $\lambda\ge6$, $a_\lambda=0$ khi $\lambda\ge20$.

**Kiểm tra lại.** Với $\lambda=4$, đạo hàm của phần theo $a$ tại $a=\tfrac45>0$ là $20(\tfrac45-1)+4=0$, và của phần theo $b$ tại $b=\tfrac15>0$ là $10(\tfrac15-\tfrac35)+4=0$.

**Diễn giải.** Hệ số chặn về $0$ trước hệ số góc vì $\lvert m\rvert$ của nó ($\tfrac35$) nhỏ hơn và độ cong $\alpha$ của nó ($5$) nhỏ hơn. Do đó ngưỡng $2\alpha\lvert m\rvert$ của nó ($6$) nhỏ hơn ngưỡng của hệ số góc ($20$).
:::

::: example Ví dụ 02.17 (Tổ hợp $\ell_2^2+\ell_2^2$: hồi quy ridge với $\lambda=10$)
**Tính nghiệm.** Mục tiêu $E(w)+10\lVert w\rVert_2^2$ có gradient $2(X^TX+10I)w-2X^Ty$. Theo Mệnh đề 02.21, nghiệm duy nhất thỏa $(X^TX+10I)w=X^Ty$, tức $20a=10$ và $15b=3$: $w^*=(\tfrac12,\tfrac15)$.

**Tính giá trị.** Theo (3.2),

$$
E(w^*)=10\cdot\tfrac14+5\cdot\tfrac4{25}+\tfrac{36}5=\tfrac52+\tfrac45+\tfrac{36}5=\tfrac{21}2 .
$$

Phạt bằng $10(\tfrac14+\tfrac1{25})=\tfrac{29}{10}$, và mục tiêu bằng $\tfrac{21}2+\tfrac{29}{10}=\tfrac{67}5$.

**Kiểm tra lại.** So với nghiệm bình phương nhỏ nhất $(1,\tfrac35)$, mỗi hệ số bị nhân với $\alpha/(\alpha+\lambda)$ theo công thức một biến: $10/20=\tfrac12$ cho $a$ và $5/15=\tfrac13$ cho $b$. Với $b$, $\tfrac13\cdot\tfrac35=\tfrac15$ trùng công thức $b=\tfrac3{5+\lambda}$ của Ví dụ 02.13 tại $\lambda=10$. Không hệ số nào bằng $0$.
:::

Bảng sau đặt bốn nghiệm cạnh nhau. Mỗi giá trị mục tiêu được tính theo mục tiêu của chính dòng đó; các con số ở cột cuối không cùng thước đo và không được so sánh với nhau.

| Sai số + phạt | $\lambda$ | $w^*$ | Lớp sau cải dạng | Giá trị mục tiêu |
|---|---:|---|---|---:|
| $\ell_1+\ell_1$ | $4$ | $(1,0)$ | quy hoạch tuyến tính | $7$ |
| $\ell_1+\ell_2^2$ | $4$ | $(\tfrac34,\tfrac18)$ | quy hoạch bậc hai | $\tfrac{107}{16}$ |
| $\ell_2^2+\ell_1$ | $4$ | $(\tfrac45,\tfrac15)$ | quy hoạch bậc hai | $\tfrac{62}5$ |
| $\ell_2^2+\ell_2^2$ | $10$ | $(\tfrac12,\tfrac15)$ | quy hoạch bậc hai | $\tfrac{67}5$ |

![Bốn khung, mỗi khung vẽ năm điểm dữ liệu chung và một đường hồi quy có chính quy hóa: sai số chuẩn một với phạt chuẩn một (lambda 4, a bằng 1, b bằng 0); sai số chuẩn một với phạt bình phương chuẩn hai (lambda 4, a bằng 0,75, b bằng 0,125); bình phương sai số với phạt chuẩn một (lambda 4, a bằng 0,8, b bằng 0,2); bình phương sai số với phạt bình phương chuẩn hai (lambda 10, a bằng 0,5, b bằng 0,2).](img/lec-02/qp-regularized.svg)

Trên hình, hai đường có sai số chuẩn một đi sát bốn điểm thẳng hàng; hai đường có sai số bình phương bị điểm $(0,3)$ kéo lên. Các giá trị $\lambda$ chọn để minh họa, không qua kiểm định.

::: remark Nhận xét 02.23 (Ba nhầm lẫn về chính quy hóa)
1. Coi chính quy hóa là một phép cải dạng (xem Nhận xét 02.7).
2. Cho rằng hình phạt chuẩn một luôn làm hệ số bằng $0$: với $\lambda=4$, Ví dụ 02.16 cho cả hai hệ số khác $0$; Bổ đề 02.22 cho đúng ngưỡng.
3. Bỏ qua thang đo: đổi đơn vị một đặc trưng từ mét sang centimét chia hệ số của nó cho $100$ và đổi kết quả chọn đặc trưng của LASSO, nên đặc trưng thường được chuẩn hóa trước.
:::

### 3.4 Trần độ lớn hệ số và quy hoạch bậc hai có ràng buộc bậc hai

Hình phạt $\lambda\lVert w\rVert_2^2$ làm hệ số lớn trở nên đắt nhưng không cấm. Yêu cầu chuẩn hệ số không vượt một mức cố định, chẳng hạn để chạy trên phần cứng có biên độ số giới hạn, là một ràng buộc cứng. Trên dữ liệu chung, trần $\lVert w\rVert_2^2\le\tfrac{29}{100}$ loại nghiệm bình phương nhỏ nhất, có $\lVert w\rVert_2^2=\tfrac{34}{25}$.

Trực giác: tập $\{w\mid\lVert w\rVert_2^2\le R^2\}$ là hình tròn, lồi, nên cần một lớp cho phép ràng buộc bậc hai lồi.

::: definition Định nghĩa 02.24 (Quy hoạch bậc hai có ràng buộc bậc hai)
Cho các ma trận đối xứng $P_0,P_1,\ldots,P_m\in\mathbb R^{n\times n}$ với $P_i\succeq0$, các vector $q_i\in\mathbb R^n$, các số $s_i\in\mathbb R$, và $A,b$ như trước. Quy hoạch bậc hai có ràng buộc bậc hai là

$$
\begin{aligned}
\underset{x\in\mathbb R^n}{\operatorname{minimize}}\quad & \tfrac12x^TP_0x+q_0^Tx+s_0\\
\text{subject to}\quad & \tfrac12x^TP_ix+q_i^Tx+s_i\le0,\quad i=1,\ldots,m,\\
& Ax=b .
\end{aligned}
\tag{3.4}
$$
:::

Mỗi ràng buộc của (3.4) là một hàm bậc hai lồi không vượt $0$. Khi $P_i\succ0$, tập ứng với nó là một elip đặc (có thể rỗng hoặc suy biến thành một điểm).

Quy hoạch bậc hai là trường hợp $P_1=\cdots=P_m=0$. Trần $\lVert w\rVert_2^2\le R^2$ có $P_1=2I$, $q_1=0$, $s_1=-R^2$.

Điều kiện $P_i\succeq0$ không bỏ được: bỏ thì tập khả thi có thể không lồi. Chẳng hạn $x_1^2-x_2^2\le1$ chứa $(2,\sqrt3)$ và $(2,-\sqrt3)$ (cả hai cho $4-3=1$) mà không chứa trung điểm $(2,0)$ (cho $4>1$).

Kết quả sau dùng Định lý 01.30 cho từng hàm và Mệnh đề 02.2 cho tập khả thi.

::: proposition Mệnh đề 02.25 (Tính lồi của QCQP)
**Giả thiết.** Bài toán (3.4) với $P_i\succeq0$, $i=0,\ldots,m$.

**Kết luận.** (3.4) là bài toán tối ưu lồi dạng chuẩn; tập khả thi là giao của $m$ tập mức dưới lồi với một tập affine.

**Điều kiện áp dụng.** Cần $P_i\succeq0$ cho mọi $i$, kể cả $i=0$.

**Phạm vi.** Mệnh đề không cho sự tồn tại; nếu thêm một $P_i\succ0$ với $i\ge1$ thì tập khả thi bị chặn, và khi nó không rỗng, Định lý 01.36 cho nghiệm tồn tại.
:::

::: proof Chứng minh Mệnh đề 02.25
**Bước 1 (tính lồi).** Mỗi hàm $f_i(x)=\tfrac12x^TP_ix+q_i^Tx+s_i$ có Hessian $P_i\succeq0$, nên lồi theo Định lý 01.30(a). Các đẳng thức affine. Bài toán ở dạng (1.1), và Mệnh đề 02.2 cho tập khả thi lồi.

**Bước 2 (phần Phạm vi: tập khả thi bị chặn).** Nếu $P_i\succ0$ với giá trị riêng nhỏ nhất $\lambda_{\min}>0$ thì $x^TP_ix\ge\lambda_{\min}\lVert x\rVert_2^2$ theo phân rã trị riêng, và $q_i^Tx\ge-\lVert q_i\rVert_2\lVert x\rVert_2$ theo Cauchy–Schwarz. Do đó

$$
f_i(x)\ge\tfrac{\lambda_{\min}}2\lVert x\rVert_2^2-\lVert q_i\rVert_2\lVert x\rVert_2+s_i,
$$

nên $f_i(x)\le0$ kéo theo $\lVert x\rVert_2$ bị chặn. Tập khả thi đóng vì các $f_i$ liên tục. $\square$
:::

Kết quả sau nối hình phạt với trần. Nó không cần tính lồi.

::: proposition Mệnh đề 02.26 (Nghiệm của bài có phạt là nghiệm của bài có trần)
**Giả thiết.** $L,R:\mathbb R^d\to\mathbb R$ tùy ý, $\lambda\ge0$, và $w_\lambda$ là một nghiệm của $\min_w L(w)+\lambda R(w)$.

**Kết luận.** $w_\lambda$ là nghiệm của $\min_wL(w)$ với ràng buộc $R(w)\le R(w_\lambda)$.

**Điều kiện áp dụng.** $\lambda\ge0$.

**Phạm vi.** Mệnh đề chỉ đi một chiều: từ một $\lambda$ cho trước suy ra một mức trần. Chiều ngược, mỗi mức trần ứng với một $\lambda$, cần thêm tính lồi và một điều kiện chính quy, và nằm ngoài phạm vi học phần (Boyd và Vandenberghe 2004, mục 4.7.4 về vô hướng hóa và mục 6.3.1–6.3.2).
:::

::: proof Chứng minh Mệnh đề 02.26
**Bước 1 (khả thi).** $w_\lambda$ thỏa ràng buộc vì $R(w_\lambda)\le R(w_\lambda)$.

**Bước 2 (tối ưu).** Với mọi $w$ thỏa $R(w)\le R(w_\lambda)$, tính tối ưu của $w_\lambda$ cho $L(w)+\lambda R(w)\ge L(w_\lambda)+\lambda R(w_\lambda)$, nên

$$
L(w)\ge L(w_\lambda)+\lambda\bigl(R(w_\lambda)-R(w)\bigr)\ge L(w_\lambda),
$$

trong đó bất đẳng thức cuối dùng $\lambda\ge0$ và $R(w_\lambda)-R(w)\ge0$. $\square$
:::

::: example Ví dụ 02.18 (Trần $\lVert w\rVert_2^2\le\tfrac{29}{100}$)
**Lập mô hình.** Bài toán $\min_wE(w)$ với $\lVert w\rVert_2^2\le\tfrac{29}{100}$ là QCQP với $P_0=2X^TX=\operatorname{diag}(20,10)$, $q_0=(-20,-6)$, $s_0=19$, $P_1=2I$, $q_1=0$, $s_1=-\tfrac{29}{100}$. Mọi $P_i\succ0$, nên bài lồi và có nghiệm (Mệnh đề 02.25).

**Chứng nhận.** Theo Ví dụ 02.17, $w_{10}=(\tfrac12,\tfrac15)$ là nghiệm của bài có phạt với $\lambda=10$, và $\lVert w_{10}\rVert_2^2=\tfrac14+\tfrac1{25}=\tfrac{29}{100}$. Mệnh đề 02.26 với $L=E$, $R=\lVert\cdot\rVert_2^2$ cho $w^*=(\tfrac12,\tfrac15)$ là nghiệm của bài có trần, với $E(w^*)=\tfrac{21}2$. Nghiệm duy nhất vì $E$ lồi chặt.

**Kiểm tra lại bằng (1.2).** $\nabla E(w^*)=(20(\tfrac12-1),\ 10(\tfrac15-\tfrac35))=(-10,-4)$. Với mọi $w$ khả thi,

$$
\nabla E(w^*)^T(w-w^*)=5+\tfrac45-(10a+4b)\ge0,
$$

vì bất đẳng thức Cauchy–Schwarz cho $10a+4b\le\sqrt{116}\cdot\sqrt{0{,}29}=\sqrt{33{,}64}=5{,}8$.

**Kiểm tra một điểm biên.** Điểm $(\sqrt{0{,}29},0)\approx(0{,}5385;0)$ cho $E\approx10\cdot0{,}2130+1{,}8+7{,}2=11{,}13>10{,}5$.
:::

![Mặt phẳng (a, b) với hai trục cùng tỷ lệ. Hình tròn tâm gốc, a bình phương cộng b bình phương nhỏ hơn hoặc bằng 0,29, là miền khả thi. Nghiệm tự do (1; 0,6) nằm ngoài hình tròn. Đường đồng mức E bằng 10,5 tiếp xúc hình tròn tại điểm (0,5; 0,2), là nghiệm tối ưu.](img/lec-02/qp-bound.svg)

Hình trên cho thấy nghiệm nằm trên biên của hình tròn, tại chỗ elip đồng mức $E=10{,}5$ tiếp xúc biên.

Bán kính được chọn bằng chuẩn của nghiệm ridge với $\lambda=10$ để có thể chứng nhận bằng Mệnh đề 02.26. Với một bán kính tùy ý, việc tìm $\lambda$ tương ứng nằm ngoài phạm vi học phần.

::: remark Nhận xét 02.27 (Hình phạt, trần và các biến thể không lồi)
**Phạt và trần.** Hình phạt $\lambda$ là giá của độ lớn, trần $R^2$ là giới hạn cứng. Khi $R^2\ge\tfrac{34}{25}$, nghiệm bình phương nhỏ nhất khả thi nên là nghiệm của bài có trần (Mệnh đề 01.16(b)).

**Đổi chiều trần.** Đổi chiều thành $\lVert w\rVert_2^2\ge R^2$ cho phần ngoài hình tròn, không lồi: $(R,0)$ và $(-R,0)$ khả thi mà trung điểm $0$ thì không.

**Trần chuẩn một.** Trần $\lVert w\rVert_1\le R$ cho hình thoi, lồi. Với biến phụ $-v\preceq w\preceq v$, $\mathbf 1^Tv\le R$, bài là quy hoạch bậc hai.
:::

**Trong học máy.** QCQP xuất hiện khi tham số bị giới hạn chuẩn, chẳng hạn chuẩn của vector trọng số đi vào mỗi nơ-ron. Nó cũng xuất hiện trong bài toán con miền tin cậy (trust region) của các phương pháp bậc hai: cực tiểu một mô hình bậc hai trên quả cầu $\lVert d\rVert_2\le\Delta$ (Bài 06).

Bài con này lồi khi Hessian của mô hình nửa xác định dương, và không lồi khi Hessian có giá trị riêng âm, trường hợp thường gặp với mạng sâu. Mệnh đề 02.26 nối "phạt" với "giới hạn" theo một chiều.

::: exercise Bài tập 02.5
Cho ba quan sát $u=(-1,0,1)$, $y=(0,1,5)$, mô hình $\hat y=au+b$, $X$ với hàng $(u_i,1)$ và $E(w)=\lVert Xw-y\rVert_2^2$.

(a) Tính $X^TX$, $X^Ty$, viết $E$ ở dạng bù bình phương như (3.2), và tìm nghiệm bình phương nhỏ nhất.

(b) Giải hồi quy ridge với $\lambda=1$.

(c) Giải LASSO với $\lambda=6$ và $\lambda=12$; tìm ngưỡng $\lambda$ để mỗi hệ số bằng $0$.
:::

::: hint
$X^TX$ chéo. Áp dụng Bổ đề 02.22 cho từng hệ số với $(\alpha,m)$ đọc từ dạng bù bình phương.
:::

::: solution
**(a) Các tổng.** $\sum u_i^2=2$, $\sum u_i=0$, $\sum y_i=6$, $\sum u_iy_i=0+0+5=5$, $\sum y_i^2=26$. Vậy $X^TX=\operatorname{diag}(2,3)$, $X^Ty=(5,6)$ và

$$
E=2a^2+3b^2-10a-12b+26=2(a-\tfrac52)^2+3(b-2)^2+\tfrac32,
$$

với hằng số $26-\tfrac{25}2-12=\tfrac32$.

**(a) Nghiệm.** Nghiệm $(\tfrac52,2)$, $E=\tfrac32$.

**(a) Kiểm tra lại.** Phần dư $(-\tfrac52+2-0,\ 2-1,\ \tfrac52+2-5)=(-\tfrac12,1,-\tfrac12)$, tổng bình phương $\tfrac14+1+\tfrac14=\tfrac32$.

**(b)** $(X^TX+I)w=X^Ty$ cho $3a=5$, $4b=6$: $w=(\tfrac53,\tfrac32)$.

**(c) Tách biến.** Mục tiêu tách thành $[2(a-\tfrac52)^2+\lambda\lvert a\rvert]+[3(b-2)^2+\lambda\lvert b\rvert]+\tfrac32$. Bổ đề 02.22 cho $a_\lambda=\max(\tfrac52-\tfrac\lambda4,0)$, $b_\lambda=\max(2-\tfrac\lambda6,0)$.

**(c) Tính.**

- Với $\lambda=6$: $w=(1,1)$, $E=2\cdot\tfrac94+3+\tfrac32=9$, mục tiêu $9+12=21$.
- Với $\lambda=12$: $w=(0,0)$, $E=\lVert y\rVert_2^2=26$, mục tiêu $26$.
- Ngưỡng: $a=0$ khi $\lambda\ge10$, $b=0$ khi $\lambda\ge12$.

**(c) Kiểm tra lại.** Với $\lambda=6$: đạo hàm phần $a$ tại $a=1$ là $4(1-\tfrac52)+6=0$, phần $b$ tại $b=1$ là $6(1-2)+6=0$.
:::

::: exercise Bài tập 02.6
Chứng nhận bài toán $\min x_1+x_2$ với $x_1^2+x_2^2\le2$ là QCQP lồi, và chứng minh nghiệm là $x^*=(-1,-1)$ với $p^*=-2$.
:::

::: hint
Dùng (1.2) và bất đẳng thức $x_1+x_2\ge-\sqrt2\,\lVert x\rVert_2$.
:::

::: solution
**Chứng nhận.** $P_0=0$, $q_0=(1,1)$; $P_1=2I\succeq0$, $q_1=0$, $s_1=-2$: QCQP lồi theo Mệnh đề 02.25. Tập khả thi là đĩa đóng bán kính $\sqrt2$, không rỗng và bị chặn, nên nghiệm tồn tại.

**Kiểm (1.2).** $\nabla f_0=(1,1)$, và với mọi $x$ khả thi,

$$
(1,1)^T(x-(-1,-1))=x_1+x_2+2\ge0,
$$

vì Cauchy–Schwarz cho $x_1+x_2\ge-\sqrt2\lVert x\rVert_2\ge-\sqrt2\cdot\sqrt2=-2$. Điểm $(-1,-1)$ khả thi ($1+1=2$). Theo Hệ quả 02.3(c), nó là nghiệm, $p^*=-2$.
:::

Chuỗi suy luận và kết quả của mục:

1. Định nghĩa 02.17, Mệnh đề 02.18 và Nhận xét 02.19 cho lớp quy hoạch bậc hai và điều kiện có đúng một nghiệm;
2. Định nghĩa 02.20, Mệnh đề 02.21 và Bổ đề 02.22 giải bốn tổ hợp chính quy hóa;
3. Mệnh đề 02.25 và 02.26 đưa trần độ lớn hệ số vào khung lồi.

Đích là Mệnh đề 02.21: mỗi mô hình hồi quy có chính quy hóa thông dụng là quy hoạch tuyến tính hoặc quy hoạch bậc hai.

Các lớp này nhận ra tính lồi theo biến ban đầu; bài toán có tích và tỷ số của các kích thước thì không, và biến phụ không sửa được điều đó. Mục 4 dùng phép đổi biến.

## 4. Quy hoạch hình học

Ba lớp của Mục 2 và Mục 3 nhận ra tính lồi theo biến ban đầu; bài thiết kế sau thì không.

Cần một hộp kín thể tích $8\,\mathrm{dm}^3$, giá vật liệu tỷ lệ với diện tích bề mặt, bỏ qua độ dày và mép ghép. Hộp $1\times2\times4$ (dm) có diện tích $28\,\mathrm{dm}^2$, hộp $2\times2\times2$ có $24\,\mathrm{dm}^2$. Muốn chứng minh một thiết kế tốt nhất, công cụ của Bài 01 không dùng trực tiếp được, vì cả tập khả thi lẫn mục tiêu đều không lồi theo kích thước.

Mục này định nghĩa quy hoạch hình học (geometric programming, GP), chứng minh phép đổi biến logarit biến nó thành bài toán lồi tương đương, và áp dụng cho ba bài thiết kế.

### 4.1 Nhu cầu và trực giác: bài toán thiết kế hộp

Lấy $1\,\mathrm{dm}$ làm đơn vị và gọi $a,b,c>0$ là số đo của ba cạnh; nhờ đó các đại lượng là số không thứ nguyên và lấy logarit được. Diện tích là $S(a,b,c)=2(ab+ac+bc)$ và thể tích là $abc$.

::: example Ví dụ 02.19 (Mô hình hộp không lồi theo kích thước)
Mô hình là $\min_{a,b,c>0}2(ab+ac+bc)$ với $abc=8$.

**Tập khả thi không lồi.** Hai hộp $(1,2,4)$ và $(4,2,1)$ khả thi vì tích bằng $8$. Trung điểm $(\tfrac52,2,\tfrac52)$ có tích $\tfrac52\cdot2\cdot\tfrac52=\tfrac{25}2\ne8$, nên không khả thi. Đẳng thức $abc=8$ không affine, nên không thỏa Định nghĩa 02.1.

**Mục tiêu không lồi.** Hessian của $S$ là

$$
\nabla^2S=\begin{bmatrix}0&2&2\\2&0&2\\2&2&0\end{bmatrix},
$$

với $\nabla^2S\,(1,-1,0)^T=(-2,2,0)^T=-2\,(1,-1,0)^T$, nên $-2$ là một giá trị riêng. Theo Định lý 01.30(a), $S$ không lồi trên miền mở $\mathbb R^3_{++}$.

**Kiểm tra lại.** Một giá trị riêng khác ứng với $(1,1,1)$: $\nabla^2S\,(1,1,1)^T=(4,4,4)^T$, giá trị riêng $4$. Tổng ba giá trị riêng $4-2-2=0$ bằng vết của ma trận. Diện tích của hai hộp đầu mục: $2(2+4+8)=28$ và $2(4+4+4)=24$.
:::

![Sơ đồ một hộp chữ nhật kín có ba cạnh ký hiệu a, b, c và thể tích 8 đề-xi-mét khối; độ dày thành hộp và mép ghép được bỏ qua.](img/lec-02/gp-box.svg)

Cả mục tiêu và ràng buộc trên hình đều chứa tích của các cạnh.

**Trực giác (chưa phải định nghĩa).** Logarit biến tích thành tổng, nên ràng buộc thể tích trở thành $\log a+\log b+\log c=\log8$, tuyến tính theo các logarit. Mỗi hạng $ab$ của diện tích trở thành $e^{\log a+\log b}$, hàm mũ của một hàm tuyến tính. Phép đổi biến này chỉ dùng được khi các đại lượng và các hệ số đều dương.

![Hai khung nối bằng mũi tên đổi biến y1 bằng log x, y2 bằng log y. Khung trái: cực tiểu nghịch đảo của tích xy với x cộng y nhỏ hơn hoặc bằng 4, nghiệm (2; 2). Khung phải: mục tiêu âm y1 trừ y2 là affine, ràng buộc log của (e mũ y1 cộng e mũ y2) nhỏ hơn hoặc bằng log 4 cho tập lồi, nghiệm (log 2; log 2). Dòng dưới: đơn thức thành hàm affine, tổng đơn thức thành hàm log của tổng các hàm mũ.](img/lec-02/gp-log-transform.svg)

Hình trên minh họa trực giác trên một bài hai biến. Trong không gian ban đầu, các đường mức của tích $xy$ là các hyperbol. Trong không gian logarit, chúng thành đường thẳng, và ràng buộc $x+y\le4$ thành một tập lồi có biên cong.

Ký hiệu $y_1,y_2$ trên hình là biến logarit, không liên quan tới vector đầu ra $y$ của các mục trước.

### 4.2 Đơn thức, tổng đơn thức dương và dạng chuẩn

::: definition Định nghĩa 02.28 (Đơn thức và tổng đơn thức dương)
Trên $\mathbb R^n_{++}=\{x\in\mathbb R^n\mid x_i>0,\ i=1,\ldots,n\}$, một đơn thức (monomial) là hàm

$$
g(x)=c\,x_1^{\alpha_1}x_2^{\alpha_2}\cdots x_n^{\alpha_n},\qquad c>0,\quad\alpha_i\in\mathbb R .
$$

Một tổng đơn thức dương (posynomial) là tổng hữu hạn của các đơn thức, $f(x)=\sum_{k=1}^Kc_k\,x_1^{\alpha_{1k}}\cdots x_n^{\alpha_{nk}}$ với $c_k>0$.
:::

Định nghĩa khác với đơn thức của đại số ở hai điểm: số mũ là số thực tùy ý, và hệ số phải dương.

- $2x_1^{-1}x_2^{1/2}$ và hằng số $3$ là đơn thức.
- $x_1+2x_2/x_1$ và $(x_1+x_2)^2$ là tổng đơn thức dương.
- $x_1-x_2$ và $1/(x_1+x_2)$ thì không.

Các quy tắc sau kiểm tra được trực tiếp từ định nghĩa (xem Boyd và Vandenberghe 2004, tr. 160–161).

- Tích, thương và lũy thừa thực của đơn thức là đơn thức.
- Tổng và tích của tổng đơn thức dương là tổng đơn thức dương.
- Thương của tổng đơn thức dương cho một đơn thức là tổng đơn thức dương.

Trong bài hộp, $2ab+2ac+2bc$ là tổng ba đơn thức và $abc/8$ là đơn thức.

::: definition Định nghĩa 02.29 (Quy hoạch hình học)
Theo Boyd và Vandenberghe (2004, mục 4.5). Cho các tổng đơn thức dương $f_0,f_1,\ldots,f_m$ và các đơn thức $g_1,\ldots,g_p$ trên $\mathbb R^n_{++}$. Quy hoạch hình học dạng chuẩn là

$$
\underset{x\in\mathbb R^n_{++}}{\operatorname{minimize}}\quad f_0(x)\qquad\text{subject to}\quad f_i(x)\le1,\ i=1,\ldots,m;\qquad g_j(x)=1,\ j=1,\ldots,p .
\tag{4.1}
$$
:::

Quy hoạch hình học nói chung không lồi theo $x$: Ví dụ 02.19 là một quy hoạch hình học không lồi.

Khác Định nghĩa 02.1, Định nghĩa 02.29 nhận biết bài toán qua cấu trúc đại số. Định lý 02.33 ở Mục 4.3 nối hai cách nhận biết.

Kết quả sau chỉ dùng hai tính chất: đơn thức nhận giá trị dương, và nhân hay chia hai vế cho một số dương giữ chiều bất đẳng thức.

::: proposition Mệnh đề 02.30 (Đưa về dạng chuẩn của quy hoạch hình học)
**Giả thiết.** $f$ là tổng đơn thức dương; $g,g_1,g_2$ là đơn thức; mọi biến dương.

**Kết luận.**

- (a) $f(x)\le g(x)$ khi và chỉ khi $f(x)/g(x)\le1$, và $f/g$ là tổng đơn thức dương.
- (b) $g_1(x)=g_2(x)$ khi và chỉ khi $g_1(x)/g_2(x)=1$, và $g_1/g_2$ là đơn thức.
- (c) Cực đại $g$ trên một tập không rỗng $C\subseteq\mathbb R^n_{++}$ có cùng tập nghiệm với cực tiểu $1/g$ trên $C$, và $1/g$ là đơn thức; hai giá trị tối ưu liên hệ bởi $\inf_C(1/g)=1/\sup_Cg$, với quy ước $1/(+\infty)=0$.

**Điều kiện áp dụng.** Vế được chia phải là đơn thức; mọi giá trị dương.

**Phạm vi.** Không có quy tắc tương tự cho $f(x)\ge g(x)$ với $f$ có nhiều hơn một hạng, cho đẳng thức giữa hai tổng đơn thức dương, hay cho cực đại một tổng đơn thức dương: $1/(x_1+x_2)$ không là tổng đơn thức dương.
:::

::: proof Chứng minh Mệnh đề 02.30
**Bước 1 (phần (a)).** Vì $g(x)>0$, chia hai vế cho $g(x)$ giữ chiều bất đẳng thức, và nhân lại cho chiều ngược. Mỗi hạng của $f/g$ có dạng

$$
\dfrac{c_k\prod_ix_i^{\alpha_{ik}}}{c\prod_ix_i^{\beta_i}}=\dfrac{c_k}{c}\prod_ix_i^{\alpha_{ik}-\beta_i}
$$

với $c_k/c>0$, là đơn thức.

**Bước 2 (phần (b)).** Tương tự với đẳng thức, chia cho $g_2(x)>0$.

**Bước 3 (phần (c), khi có nghiệm).** Hàm $s\mapsto1/s$ giảm chặt trên $(0,\infty)$, nên $g(x^*)\ge g(x)$ với mọi $x\in C$ khi và chỉ khi $1/g(x^*)\le1/g(x)$ với mọi $x\in C$. Hai bài có cùng nghiệm, và giá trị tối ưu của bài cực tiểu là $1/g(x^*)$.

**Bước 4 (phần (c), giá trị tối ưu nói chung).** Khi không có nghiệm, đặt $S=\sup_Cg\in(0,+\infty]$, hữu hạn hoặc không, với $C\ne\varnothing$. Hàm $s\mapsto1/s$ giảm chặt và liên tục trên $(0,\infty)$ (với quy ước $1/(+\infty)=0$), nên $1/g(x)\ge1/S$ với mọi $x\in C$. Với dãy $x_k\in C$ có $g(x_k)\to S$ thì $1/g(x_k)\to1/S$: cận trên đúng $S$ thành cận dưới đúng $1/S$. Hàm $1/g=c^{-1}\prod_ix_i^{-\alpha_i}$ là đơn thức. $\square$
:::

Với bài hộp, ràng buộc $abc=8$ trở thành $abc/8=1$ theo (b), và mục tiêu đã là tổng đơn thức dương: bài hộp là quy hoạch hình học dạng chuẩn.

Một cận dưới đơn thức $g(x)\ge\ell$ với $\ell>0$ viết thành $\ell/g(x)\le1$, và một cận trên $f(x)\le U$ viết thành $f(x)/U\le1$.

### 4.3 Phép đổi biến logarit và dạng lồi

Đặt $z_i=\log x_i$, tức $x_i=e^{z_i}$, theo từng thành phần. Phép đổi biến là song ánh giữa $\mathbb R^n_{++}$ và $\mathbb R^n$, với ánh xạ ngược $x=e^z$ lấy theo từng thành phần. Bổ đề sau chỉ dùng $e^{s+t}=e^se^t$ và $c=e^{\log c}$ với $c>0$.

::: lemma Bổ đề 02.31 (Đơn thức và tổng đơn thức dương sau đổi biến logarit)
**Giả thiết.** $g(x)=c\prod_ix_i^{\alpha_i}$ là đơn thức, $f(x)=\sum_{k=1}^Kc_k\prod_ix_i^{\alpha_{ik}}$ là tổng đơn thức dương; $\alpha=(\alpha_1,\ldots,\alpha_n)$ và $\alpha_k=(\alpha_{1k},\ldots,\alpha_{nk})$.

**Kết luận.** Với mọi $z\in\mathbb R^n$,

$$
\log g(e^z)=\alpha^Tz+\log c,\qquad \log f(e^z)=\log\sum_{k=1}^Ke^{\alpha_k^Tz+\beta_k},\quad\beta_k=\log c_k .
\tag{4.2}
$$

**Điều kiện áp dụng.** Hệ số dương để $\log c$, $\log c_k$ xác định.

**Phạm vi.** Logarit của một tổng không bằng tổng các logarit; vế phải thứ hai của (4.2) không tách được thành tổng.
:::

::: proof Chứng minh Bổ đề 02.31
**Bước 1 (đơn thức).** Ta có

$$
\begin{aligned}
g(e^z)&=c\prod_ie^{\alpha_iz_i}\\
&=c\,e^{\sum_i\alpha_iz_i}\\
&=e^{\log c}e^{\alpha^Tz}\\
&=e^{\alpha^Tz+\log c},
\end{aligned}
$$

và lấy logarit cho vế đầu của (4.2).

**Bước 2 (tổng đơn thức dương).** Áp dụng Bước 1 cho từng hạng của $f$: $f(e^z)=\sum_ke^{\alpha_k^Tz+\beta_k}$. Lấy logarit của tổng dương này cho vế sau. $\square$
:::

Theo Bổ đề 02.31, đơn thức thành hàm affine, còn tổng đơn thức dương thành hàm $\log\sum_ke^{\alpha_k^Tz+\beta_k}$. Hàm $\operatorname{lse}(s)=\log\sum_ke^{s_k}$ được gọi là hàm log-sum-exp.

Với $n=1$, $K=2$, $\alpha=(1,-1)$, $\beta=0$, hàm $F(z)=\log(e^z+e^{-z})$ tính được bằng tay. Đặt $\pi_1=e^z/(e^z+e^{-z})$, $\pi_2=1-\pi_1$, thì

$$
F'(z)=\pi_1-\pi_2,\qquad F''(z)=1-(\pi_1-\pi_2)^2=4\pi_1\pi_2>0 .
$$

Số $1-(\pi_1-\pi_2)^2$ là phương sai của biến nhận giá trị $\alpha_1=1$ với xác suất $\pi_1$ và $\alpha_2=-1$ với xác suất $\pi_2$.

Định lý sau tổng quát hóa cách đọc này và chứng minh hàm log-sum-exp lồi. Boyd và Vandenberghe (2004, mục 3.1.5, trang 74) dùng bất đẳng thức Cauchy–Schwarz, còn chứng minh dưới đây đọc Hessian như một ma trận hiệp phương sai.

::: theorem Định lý 02.32 (Hàm log-sum-exp lồi)
**Giả thiết.** $\alpha_1,\ldots,\alpha_K\in\mathbb R^n$, $\beta_1,\ldots,\beta_K\in\mathbb R$, và $F(z)=\log\sum_{k=1}^Ke^{\alpha_k^Tz+\beta_k}$ trên $\mathbb R^n$.

**Kết luận.** $F$ khả vi hai lần, với

$$
\nabla F(z)=\sum_k\pi_k\alpha_k,\qquad\nabla^2F(z)=\sum_k\pi_k(\alpha_k-\bar\alpha)(\alpha_k-\bar\alpha)^T\succeq0,
\tag{4.3}
$$

trong đó $\pi_k=e^{\alpha_k^Tz+\beta_k}\big/\sum_le^{\alpha_l^Tz+\beta_l}$ và $\bar\alpha=\sum_k\pi_k\alpha_k$. Do đó $F$ lồi trên $\mathbb R^n$.

**Điều kiện áp dụng.** Mọi dữ liệu $\alpha_k,\beta_k$; $K$ hữu hạn.

**Phạm vi.** $F$ không lồi chặt nói chung: theo hướng $v$ với $v^T\alpha_k$ như nhau cho mọi $k$, $F$ là hàm affine. Logarit của một hàm lồi bất kỳ không nhất thiết lồi, ví dụ $\log(x^2+1)$ có đạo hàm bậc hai $2(1-x^2)/(1+x^2)^2<0$ khi $\lvert x\rvert>1$; định lý dùng cấu trúc riêng của tổng các hàm mũ.
:::

::: proof Chứng minh Định lý 02.32
Đặt $Z(z)=\sum_ke^{\alpha_k^Tz+\beta_k}>0$, nên $F=\log Z$ và $\pi_k=e^{\alpha_k^Tz+\beta_k}/Z$, với $\pi_k>0$ và $\sum_k\pi_k=1$.

**Bước 1 (gradient).** Quy tắc dây chuyền cho $\nabla e^{\alpha_k^Tz+\beta_k}=e^{\alpha_k^Tz+\beta_k}\alpha_k$, nên $\nabla Z=\sum_ke^{\alpha_k^Tz+\beta_k}\alpha_k$ và

$$
\nabla F=\nabla Z/Z=\sum_k\pi_k\alpha_k=\bar\alpha .
$$

**Bước 2 (đạo hàm của trọng số).** Theo quy tắc đạo hàm thương,

$$
\begin{aligned}
\nabla\pi_k&=\frac{e^{\alpha_k^Tz+\beta_k}\alpha_kZ-e^{\alpha_k^Tz+\beta_k}\nabla Z}{Z^2}\\
&=\pi_k\Bigl(\alpha_k-\frac{\nabla Z}{Z}\Bigr)\\
&=\pi_k(\alpha_k-\bar\alpha).
\end{aligned}
$$

**Bước 3 (Hessian).** Vì $\nabla F=\sum_k\alpha_k\pi_k$ với $\alpha_k$ hằng,

$$
\begin{aligned}
\nabla^2F&=\sum_k\alpha_k(\nabla\pi_k)^T\\
&=\sum_k\pi_k\alpha_k(\alpha_k-\bar\alpha)^T\\
&=\sum_k\pi_k\alpha_k\alpha_k^T-\bar\alpha\bar\alpha^T,
\end{aligned}
$$

dùng $\sum_k\pi_k\alpha_k=\bar\alpha$. Mặt khác, khai triển

$$
\begin{aligned}
\sum_k\pi_k(\alpha_k-\bar\alpha)(\alpha_k-\bar\alpha)^T&=\sum_k\pi_k\alpha_k\alpha_k^T-\bar\alpha\bar\alpha^T-\bar\alpha\bar\alpha^T+\bar\alpha\bar\alpha^T\\
&=\sum_k\pi_k\alpha_k\alpha_k^T-\bar\alpha\bar\alpha^T,
\end{aligned}
$$

dùng $\sum_k\pi_k\alpha_k=\bar\alpha$ cho hai hạng giữa và $\sum_k\pi_k=1$ cho hạng cuối. Hai biểu thức bằng nhau, đó là (4.3).

**Bước 4 (dấu).** Với mọi $v\in\mathbb R^n$,

$$
v^T\nabla^2F(z)v=\sum_k\pi_k\bigl(v^T(\alpha_k-\bar\alpha)\bigr)^2\ge0,
$$

vì $\pi_k>0$ và các bình phương không âm. Vậy $\nabla^2F(z)\succeq0$ tại mọi $z$, và Định lý 01.30(a) trên miền mở $\mathbb R^n$ cho $F$ lồi. $\square$
:::

Trong (4.3), $\pi$ là một phân phối trên $K$ chỉ số, $\nabla F$ là kỳ vọng của $\alpha_k$ và $\nabla^2F$ là ma trận hiệp phương sai của nó. Ví dụ trước định lý là trường hợp $n=1$, $K=2$. Khi mọi $\alpha_k$ bằng nhau, $F$ affine: trường hợp một đơn thức.

**Trong học máy.** Hàm log-sum-exp là logarit của hằng số chuẩn hóa trong softmax. Với điểm số $s\in\mathbb R^K$, xác suất softmax là $\pi_k=e^{s_k}/\sum_le^{s_l}$, và mất mát entropy chéo (cross-entropy) của lớp đúng $k^\star$ là $\operatorname{lse}(s)-s_{k^\star}$.

Với $s=Wu$, Định lý 02.32 cùng Định lý 01.31(b) cho tính lồi của hồi quy logistic đa lớp theo $W$, nên nó có các bảo đảm của Hệ quả 02.3. Công thức (4.3) cho $\nabla\operatorname{lse}=\pi$.

Định lý sau ghép Bổ đề 02.31, Định lý 02.32 và Mệnh đề 02.6 với $T=\log$.

::: theorem Định lý 02.33 (Dạng lồi của quy hoạch hình học)
**Giả thiết.** Bài toán (4.1), với $f_i(x)=\sum_{k=1}^{K_i}c_{ik}\prod_lx_l^{\alpha_{lik}}$ và $g_j(x)=d_j\prod_lx_l^{\gamma_{lj}}$; đặt $\beta_{ik}=\log c_{ik}$, $\delta_j=\log d_j$ và $\gamma_j=(\gamma_{1j},\ldots,\gamma_{nj})$.

**Kết luận.** (a) Bài toán

$$
\begin{aligned}
\underset{z\in\mathbb R^n}{\operatorname{minimize}}\quad & F_0(z)\\
\text{subject to}\quad & F_i(z)\le0,\ i=1,\ldots,m;\qquad\gamma_j^Tz+\delta_j=0,\ j=1,\ldots,p,
\end{aligned}
\tag{4.4}
$$

với $F_i(z)=\log\sum_ke^{\alpha_{ik}^Tz+\beta_{ik}}$, là bài toán tối ưu lồi dạng chuẩn.

(b) (4.4) là cải dạng tương đương của (4.1) theo Định nghĩa 02.5 với $\varphi(x)=\log x$, $\psi(z)=e^z$ và $T=\log$.

(c) Nếu $z^*$ là nghiệm của (4.4) thì $x^*=e^{z^*}$ là nghiệm của (4.1), và $f_0(x^*)=e^{F_0(z^*)}$.

**Điều kiện áp dụng.** Mọi biến dương; mọi hệ số của các tổng đơn thức dương và đơn thức dương; các ràng buộc ở đúng chiều của (4.1).

**Phạm vi.** Định lý không bảo đảm nghiệm tồn tại. Nếu mọi $f_i$ là đơn thức, (4.4) là quy hoạch tuyến tính.
:::

::: proof Chứng minh Định lý 02.33
**Bước 1 (phần (a)).** Mỗi $F_i$ là hàm log-sum-exp của các hàm affine theo $z$, lồi theo Định lý 02.32. Các đẳng thức $\gamma_j^Tz+\delta_j=0$ affine. Miền $\mathbb R^n$ lồi. Bài toán thỏa Định nghĩa 02.1.

**Bước 2 (phần (b): ràng buộc tương ứng).** Với $x\in\mathbb R^n_{++}$ và $z=\log x$, Bổ đề 02.31 cho $\log f_i(x)=F_i(z)$ và $\log g_j(x)=\gamma_j^Tz+\delta_j$. Vì $\log$ tăng chặt trên $(0,\infty)$ và $\log1=0$:

- $f_i(x)\le1$ khi và chỉ khi $F_i(z)\le0$;
- $g_j(x)=1$ khi và chỉ khi $\gamma_j^Tz+\delta_j=0$.

Vậy $\varphi$ ánh xạ tập khả thi của (4.1) vào tập khả thi của (4.4), và $\psi$ ánh xạ theo chiều ngược.

**Bước 3 (phần (b): mục tiêu tương ứng).** Ta có $F_0(\varphi(x))=\log f_0(x)=T(f_0(x))$ và $T(f_0(\psi(z)))=\log f_0(e^z)=F_0(z)$. Hai bất đẳng thức của (1.3) đúng với dấu bằng, và $T=\log$ tăng chặt trên $(0,\infty)$, khoảng chứa mọi giá trị của $f_0$.

**Bước 4 (phần (c) và phần Phạm vi).** Theo Mệnh đề 02.6(b), $\psi(z^*)=e^{z^*}$ là nghiệm của (4.1); theo phần (a) của cùng mệnh đề, $F_0(z^*)=\log f_0(x^*)$. Nếu mọi $f_i$ là đơn thức thì mọi $F_i$ affine theo Bổ đề 02.31, và (4.4) là quy hoạch tuyến tính. $\square$
:::

Định lý 02.33 cho một lớp bài toán không lồi theo biến ban đầu nhưng tương đương với một bài lồi. Khác Định lý 02.15, nó đổi biến thay vì thêm biến, và giá trị tối ưu biến đổi qua $T=\log$.

Biến dương làm phép đổi biến song ánh, hệ số dương cho phép lấy logarit. Bỏ biến dương, bài $\min x$ trên $[0,1]$ có nghiệm $0$, nhưng sau khi đặt $x=e^z$ thì cận dưới $0$ không đạt.

::: example Ví dụ 02.20 (Bài hộp sau đổi biến logarit)
**Đổi biến.** Đặt $z_a=\log a$, $z_b=\log b$, $z_c=\log c$. Theo Định lý 02.33, bài hộp tương đương với

$$
\underset{z_a,z_b,z_c\in\mathbb R}{\operatorname{minimize}}\quad\log\bigl(2e^{z_a+z_b}+2e^{z_a+z_c}+2e^{z_b+z_c}\bigr)\qquad\text{subject to}\quad z_a+z_b+z_c=\log8,
$$

với mục tiêu lồi (log-sum-exp của ba hàm affine, các hệ số $2$ vào số mũ dưới dạng $\log2$) và ràng buộc là một mặt phẳng.

**Khử ràng buộc.** Thay $z_c=\log8-z_a-z_b$: $2e^{z_a+z_c}=2e^{\log8-z_b}=16e^{-z_b}$ và $2e^{z_b+z_c}=16e^{-z_a}$, nên mục tiêu trên $\mathbb R^2$ là

$$
\Phi(z_a,z_b)=\log Z(z_a,z_b),\qquad Z(z_a,z_b)=2e^{z_a+z_b}+16e^{-z_a}+16e^{-z_b}.
$$

Hàm $\Phi$ lồi theo Định lý 02.32.

**Tìm điểm dừng.** Vì $Z>0$, $\nabla\Phi=\nabla Z/Z$ bằng $0$ khi và chỉ khi $\nabla Z=0$:

$$
2e^{z_a+z_b}-16e^{-z_a}=0,\qquad 2e^{z_a+z_b}-16e^{-z_b}=0 .
$$

Trừ hai phương trình được $e^{-z_a}=e^{-z_b}$, tức $z_a=z_b$. Khi đó $2e^{2z_a}=16e^{-z_a}$, $e^{3z_a}=8$, $z_a=\log2$.

**Kết luận.** Theo Hệ quả 01.27 trên toàn $\mathbb R^2$, $(z_a^*,z_b^*)=(\log2,\log2)$ là nghiệm, và $z_c^*=\log8-2\log2=\log2$. Khôi phục: $(a^*,b^*,c^*)=(2,2,2)$, diện tích $S_{\min}=24\,\mathrm{dm}^2$, và $\Phi(z_a^*,z_b^*)=\log(8+8+8)=\log24$.

**Kiểm tra lại.** Chứng nhận độc lập bằng bất đẳng thức trung bình cộng – trung bình nhân cho ba số dương $ab,ac,bc$:

$$
ab+ac+bc\ge3\bigl((ab)(ac)(bc)\bigr)^{1/3}=3(abc)^{2/3}=3\cdot8^{2/3}=12,
$$

nên $S\ge24$, dấu bằng khi $ab=ac=bc$, tức $a=b=c=2$. Hộp $(1,2,4)$ cho $28>24$.
:::

![Mặt phẳng tọa độ log, trục hoành A bằng ln a, trục tung B bằng ln b, sau khi thay C bằng ln 8 trừ A trừ B. Các đường đồng mức của log diện tích là các đường cong khép kín lồng nhau quanh điểm (ln 2, ln 2), là nghiệm.](img/lec-02/gp-box-contour.svg)

Trong tọa độ logarit trên hình, với trục $A$, $B$ là $z_a$, $z_b$ của Ví dụ 02.20, các tập mức dưới của $\Phi$ là các tập lồi lồng nhau quanh $(\log2,\log2)$, đúng với Mệnh đề 01.25.

::: remark Nhận xét 02.34 (Những điều phép đổi biến không làm được)
1. Giá trị của (4.4) là $\log$ của giá trị (4.1): ở Ví dụ 02.20, $\log24\approx3{,}18$ không phải diện tích.
2. Bài có hiệu hoặc biến được bằng $0$ không thuộc dạng (4.1): $x_1-x_2\le1$ affine, lồi theo $x$, mà không là quy hoạch hình học.
3. Đẳng thức giữa hai tổng đơn thức dương không được phép: $x_1+x_2=1$ affine theo $x$ nhưng thành $\log(e^{z_1}+e^{z_2})=0$, không affine.

Một ràng buộc có thể lồi theo $x$ mà không thuộc lớp quy hoạch hình học; hai cách nhận biết bổ sung cho nhau.
:::

### 4.4 Phân bổ công suất cho hai đường truyền

Hai cặp phát – thu dùng chung một kênh vô tuyến. Tăng công suất phát của một đường làm tín hiệu có ích của nó mạnh lên, đồng thời gây nhiễu cho đường kia. Mục tiêu là cải thiện đường yếu hơn.

![Hai cặp phát – thu. Bộ phát 1 truyền tới bộ thu 1 và bộ phát 2 truyền tới bộ thu 2 với hệ số tín hiệu chính bằng 1 (đường liền). Bộ phát 2 gây nhiễu cho bộ thu 1 với hệ số 1/4 và bộ phát 1 gây nhiễu cho bộ thu 2 với hệ số 3/2 (đường đứt). Mỗi bộ thu có tạp âm nền bằng 1.](img/lec-02/gp-wireless.svg)

Theo hình, dữ liệu của bài là:

- hệ số truyền từ bộ phát $j$ tới bộ thu $i$: $\eta_{11}=\eta_{22}=1$, $\eta_{12}=\tfrac14$, $\eta_{21}=\tfrac32$;
- tạp âm nền $\nu_1=\nu_2=1$;
- ngân sách tổng công suất $6$.

Số liệu tự xây dựng, phỏng theo bối cảnh Bài tập 4.20 của Boyd và Vandenberghe 2004, trang 196. Chất lượng đường $i$ đo bằng tỷ số tín hiệu trên nhiễu và tạp âm (signal-to-interference-plus-noise ratio, SINR):

$$
S_1(p)=\frac{p_1}{1+p_2/4},\qquad S_2(p)=\frac{p_2}{1+3p_1/2}.
$$

::: example Ví dụ 02.21 (Mô hình phân bổ công suất và cải dạng)
**Lập mô hình.** Bài toán là cực đại $\min\{S_1(p),S_2(p)\}$ theo $p\in\mathbb R^2_{++}$ với $p_1+p_2\le6$. Chia đều $(3,3)$ cho $S_1=3/(1+\tfrac34)=\tfrac{12}7$ và $S_2=3/(1+\tfrac92)=\tfrac6{11}$: đường $2$ yếu vì chịu nhiễu với hệ số $\tfrac32$.

**Cải dạng bằng ngưỡng.** Thêm biến $t>0$ đóng vai chặn dưới của chất lượng. Ta có $t\le S_1(p)$ khi và chỉ khi $t(1+p_2/4)\le p_1$, và chia cho $p_1>0$ cho $tp_1^{-1}+\tfrac14tp_2p_1^{-1}\le1$; tương tự với đường $2$. Theo Mệnh đề 02.30(c), cực đại $t$ thành cực tiểu $t^{-1}$. Bài toán

$$
\begin{aligned}
\underset{p_1,p_2,t>0}{\operatorname{minimize}}\quad & t^{-1}\\
\text{subject to}\quad & tp_1^{-1}+\tfrac14tp_2p_1^{-1}\le1,\qquad tp_2^{-1}+\tfrac32tp_1p_2^{-1}\le1,\qquad\tfrac16p_1+\tfrac16p_2\le1
\end{aligned}
\tag{4.5}
$$

là quy hoạch hình học: mục tiêu là đơn thức, mỗi vế trái là tổng đơn thức dương.

**Tương đương với bài gốc.** Theo Mệnh đề 02.6, bài gốc viết thành $\min1/\min\{S_1,S_2\}$, với $\varphi(p)=(p,\min\{S_1(p),S_2(p)\})$, $\psi(p,t)=p$, $T(s)=s$. Chiều thứ nhất là đẳng thức. Chiều thứ hai đúng vì $t\le\min\{S_1,S_2\}$ kéo theo $1/\min\{S_1,S_2\}\le1/t$.

**Dạng lồi.** Với $z_i=\log p_i$, $\tau=\log t$, Định lý 02.33 cho bài $\min-\tau$ với các ràng buộc

$$
\log(e^{\tau-z_1}+\tfrac14e^{\tau+z_2-z_1})\le0,\qquad\log(e^{\tau-z_2}+\tfrac32e^{\tau+z_1-z_2})\le0,\qquad\log(e^{z_1}+e^{z_2})\le\log6 .
$$

Mục tiêu affine, ba ràng buộc log-sum-exp lồi.

**Kiểm tra lại.** Tại $(p,t)=(3,3,\tfrac6{11})$:

- vế trái thứ nhất $\tfrac6{11}\cdot\tfrac13+\tfrac14\cdot\tfrac6{11}\cdot1=\tfrac2{11}+\tfrac3{22}=\tfrac7{22}\le1$;
- vế trái thứ hai $\tfrac6{11}\cdot\tfrac13+\tfrac32\cdot\tfrac6{11}\cdot1=\tfrac2{11}+\tfrac9{11}=1$, chặt, đúng vì $t=S_2$.
:::

::: example Ví dụ 02.22 (Nghiệm phân bổ công suất)
Chứng minh nghiệm là $p^*=(2,4)$ với chất lượng tối ưu $t^*=1$.

**Bước 1 (không phương án nào đạt chất lượng lớn hơn $1$).** Giả sử $t>1$ và $(p,t)$ khả thi. Từ $t\le S_1$ và $1+p_2/4>0$: $p_1\ge t(1+p_2/4)>1+p_2/4$; tương tự $p_2>1+\tfrac32p_1$. Thế bất đẳng thức thứ hai vào thứ nhất:

$$
p_1>1+\tfrac14(1+\tfrac32p_1)=\tfrac54+\tfrac38p_1,
$$

nên $\tfrac58p_1>\tfrac54$, $p_1>2$, và $p_2>1+\tfrac32\cdot2=4$. Khi đó $p_1+p_2>6$, vi phạm ngân sách.

**Bước 2 (chất lượng $1$ đạt duy nhất tại $(2,4)$).** Với $t=1$, cùng phép thế với bất đẳng thức không chặt cho $p_1\ge2$, $p_2\ge4$, và ngân sách $p_1+p_2\le6$ buộc $p=(2,4)$. Tại đó $S_1=2/(1+1)=1$ và $S_2=4/(1+3)=1$.

**Bước 3 (nghiệm dùng hết ngân sách, với mọi dữ liệu dương).** Với $\rho>1$, thay $p$ bằng $\rho p$:

$$
S_i(\rho p)=\dfrac{\eta_{ii}p_i}{\nu_i/\rho+\sum_{j\ne i}\eta_{ij}p_j}>S_i(p),
$$

vì $\nu_i/\rho<\nu_i$. Nếu một phương án chưa dùng hết ngân sách, chọn $\rho=6/(p_1+p_2)>1$ làm mọi SINR tăng chặt, nên phương án đó không tối ưu.

**Kiểm tra lại.** Trong dạng lồi, nghiệm là $(z_1,z_2,\tau)=(\log2,\log4,0)$ với giá trị $-\tau=0=\log(1/t^*)$.

**Diễn giải.** So với chia đều, chất lượng của đường yếu tăng từ $\tfrac6{11}\approx0{,}55$ lên $1$. Đường $2$, chịu nhiễu mạnh hơn, nhận nhiều công suất hơn.
:::

![Đồ thị theo p1 từ 0 đến 6 với p2 bằng 6 trừ p1. Đường SINR1 tăng và đường SINR2 giảm khi p1 tăng; hai đường cắt nhau tại p1 bằng 2 với giá trị 1, đánh dấu (2; 1). Đường giá trị nhỏ nhất của hai SINR đạt đỉnh tại đó. Điểm (3; 6/11) đánh dấu chất lượng nhỏ nhất của phương án chia đều.](img/lec-02/gp-power.svg)

Trên hình, giá trị nhỏ nhất của hai SINR dọc đường ngân sách đạt đỉnh tại giao điểm $p_1=2$, nơi hai đường có chất lượng bằng nhau.

### 4.5 Chia ngân sách tính toán giữa kích thước mô hình và dữ liệu

Với mô hình ngôn ngữ lớn, sai số kiểm định thường được mô tả bằng luật tỷ lệ (scaling law)

$$
\mathcal L(N_p,N_d)=\mathcal E+\mathcal AN_p^{-\alpha}+\mathcal BN_d^{-\beta}.
$$

Trong đó $N_p$ là số tham số, $N_d$ là số token huấn luyện, và các hằng số dương được ước lượng từ thí nghiệm. Token là đơn vị văn bản mà mô hình xử lý, thường là một từ hoặc một phần của từ. Chi phí tính toán xấp xỉ tỷ lệ với $N_pN_d$ (Hoffmann và cộng sự 2022, mục 3.3).

Đây là tổng đơn thức dương với một ràng buộc đơn thức, nên bài chia ngân sách là quy hoạch hình học.

::: example Ví dụ 02.23 (Chia ngân sách theo luật tỷ lệ, số liệu giả lập)
**Lập mô hình.** Lấy $\alpha=\beta=\tfrac12$, $\mathcal A=2$, $\mathcal B=1$ và ngân sách $N_pN_d\le100$ theo đơn vị chuẩn hóa; hằng số $\mathcal E$ không đổi nghiệm nên được bỏ. Bài toán là $\min2N_p^{-1/2}+N_d^{-1/2}$ với $\tfrac1{100}N_pN_d\le1$, một quy hoạch hình học. Chia đều $N_p=N_d=10$ cho $3/\sqrt{10}\approx0{,}949$.

**Khử ràng buộc.** Tại nghiệm ngân sách dùng hết, vì nếu $N_pN_d<100$ thì tăng $N_p$ làm mục tiêu giảm. Với $N_d=100/N_p$, mục tiêu $2N_p^{-1/2}+\tfrac1{10}N_p^{1/2}$ không lồi theo $N_p$: đạo hàm bậc hai $\tfrac32N_p^{-5/2}-\tfrac1{40}N_p^{-3/2}$ âm khi $N_p>60$.

**Đổi biến và tính.** Theo $z=\log N_p$, mục tiêu $\phi(z)=2e^{-z/2}+\tfrac1{10}e^{z/2}$ lồi vì $\phi''>0$, và

$$
\phi'(z)=-e^{-z/2}+\tfrac1{20}e^{z/2}=0
$$

cho $e^z=20$. Vậy $N_p^*=20$, $N_d^*=5$, giá trị $2/\sqrt{20}+1/\sqrt5=2/\sqrt5\approx0{,}894$.

**Kiểm tra lại.** Tại nghiệm, hai hạng bằng nhau, $2/\sqrt{20}=1/\sqrt5$. Đây là điều kiện tối ưu của hai đơn thức có cùng số mũ khi tích bị cố định, tương tự hai SINR bằng nhau ở Ví dụ 02.22. Phương án $(40,\tfrac52)$ cho $2/\sqrt{40}+\sqrt{0{,}4}\approx0{,}316+0{,}632=0{,}949>0{,}894$.
:::

**Trong học máy.** Ví dụ 02.23 là phiên bản thu nhỏ của bài chọn kích thước mô hình tối ưu theo tính toán. Khi các hằng số của luật tỷ lệ dương, Định lý 02.33 bảo đảm bài toán lồi sau khi lấy logarit, nên nghiệm tìm bằng phương pháp cục bộ là toàn cục. Luật tỷ lệ chỉ là xấp xỉ thực nghiệm trong một phạm vi kích thước.

::: exercise Bài tập 02.7
Với $x,y,z>0$, xác định ràng buộc nào đưa được về dạng (4.1) và viết dạng đó:

(a) $x^2+3y/z\le\sqrt y$ (phỏng theo Boyd và Vandenberghe 2004, tr. 161);

(b) $x-y\le1$;

(c) $(x+y)^2\le z$;

(d) cực đại $x/y$ với các ràng buộc khác đã ở dạng chuẩn (phỏng theo Boyd và Vandenberghe 2004, tr. 161);

(e) $x+y\ge z$.
:::

::: hint
Dùng Mệnh đề 02.30; khai triển $(x+y)^2$ trước khi chia.
:::

::: solution
- **(a)** Chia cho đơn thức $\sqrt y$: $x^2y^{-1/2}+3y^{1/2}z^{-1}\le1$, dạng chuẩn.
- **(b)** Có hệ số âm, không đưa được về dạng (4.1). Ràng buộc này affine nên vẫn lồi theo $(x,y)$, nhưng không thuộc lớp quy hoạch hình học.
- **(c)** $(x+y)^2=x^2+2xy+y^2$ là tổng đơn thức dương; chia cho $z$: $x^2z^{-1}+2xyz^{-1}+y^2z^{-1}\le1$.
- **(d)** Theo Mệnh đề 02.30(c), cực tiểu đơn thức $y/x=x^{-1}y$.
- **(e)** Chiều "tổng đơn thức dương $\ge$ đơn thức" không đưa được về dạng chuẩn: chia cho $z$ cho $x/z+y/z\ge1$, sai chiều.
:::

Chuỗi suy luận và kết quả của mục:

1. Định nghĩa 02.28, 02.29 và Mệnh đề 02.30 cho lớp quy hoạch hình học;
2. Bổ đề 02.31, Định lý 02.32 và Mệnh đề 02.6 cho Định lý 02.33, đích của mục;
3. ba ví dụ thiết kế áp dụng nó.

Bốn mục đầu cho bốn lớp bài toán và hai cách cải dạng giữ nghiệm: thêm biến và đổi biến.

Số lỗi phân loại là hàm bậc thang, quyết định mua một gói dữ liệu là biến nhị phân: các bài này có miền hoặc tập nghiệm không lồi theo mọi cách viết đã gặp. Mục 5 thay mục tiêu hoặc mở rộng miền, và đo cái giá của sự thay thế.

## 5. Xấp xỉ lồi và nới lỏng bài toán không lồi

Bài toán phân loại sau có tập nghiệm không lồi, nên không có cách viết nào của nó ở dạng chuẩn (Ví dụ 02.24).

Một bộ phân loại ảnh dùng một đặc trưng đã chuẩn hóa $u$ và một ngưỡng $\theta$: ảnh được xếp vào nhóm cần tìm khi $u>\theta$. Bốn ảnh có $u=(-2,-1,1,2)$ với nhãn $y=(-1,+1,-1,+1)$, trong đó $+1$ là nhóm cần tìm. Nhãn xen kẽ nên không ngưỡng nào đúng cả bốn ảnh (số liệu minh họa tự xây dựng). Số ảnh bị phân loại sai là hàm bậc thang theo $\theta$, không lồi.

Mục này xét hai cách xử lý: thay mục tiêu bằng một hàm thay thế lồi, và mở rộng miền của một bài nhị phân thành quy hoạch tuyến tính. Với mỗi cách, mục chỉ ra cái được bảo đảm và cái phải kiểm tra lại trên bài gốc.

### 5.1 Nhu cầu: mất mát đếm lỗi không lồi

Với ngưỡng $\theta$, điểm số của ảnh $i$ là $u_i-\theta$, và biên có dấu của nó là $r_i(\theta)=y_i(u_i-\theta)$: dương khi điểm số cùng dấu với nhãn, tức khi ảnh được phân loại đúng. Theo quy ước của mục, điểm số bằng $0$ (ảnh nằm đúng trên ngưỡng) được tính là lỗi.

Số lỗi là $\operatorname{err}(\theta)=\sum_{i=1}^4\ell_{01}(r_i(\theta))$, với $\ell_{01}(r)=1$ khi $r\le0$ và $\ell_{01}(r)=0$ khi $r>0$.

::: example Ví dụ 02.24 (Bảng số lỗi theo ngưỡng)
**Biên có dấu.** Bốn biên có dấu là $r_1=(-1)(-2-\theta)=2+\theta$, $r_2=-1-\theta$, $r_3=(-1)(1-\theta)=\theta-1$, $r_4=2-\theta$. Do đó:

- ảnh $1$ sai khi $\theta\le-2$;
- ảnh $2$ sai khi $\theta\ge-1$;
- ảnh $3$ sai khi $\theta\le1$;
- ảnh $4$ sai khi $\theta\ge2$.

**Bảng số lỗi.** Ghép lại:

| Khoảng $\theta$ | Ảnh sai | $\operatorname{err}(\theta)$ |
|---|---|---:|
| $\theta\le-2$ | 1, 3 | $2$ |
| $-2<\theta<-1$ | 3 | $1$ |
| $-1\le\theta\le1$ | 2, 3 | $2$ |
| $1<\theta<2$ | 2 | $1$ |
| $\theta\ge2$ | 2, 4 | $2$ |

**Kết luận.** Giá trị tối ưu là $1$, đạt trên hai khoảng mở $(-2,-1)$ và $(1,2)$. Hàm $\operatorname{err}$ không lồi: $\operatorname{err}(-\tfrac32)=\operatorname{err}(\tfrac32)=1$ nhưng tại trung điểm, $\operatorname{err}(0)=2>\tfrac12\cdot1+\tfrac12\cdot1$, vi phạm (7.1) của Bài 01.

**Kiểm tra lại.** Tại $\theta=-\tfrac32$: $r=(\tfrac12,\tfrac12,-\tfrac52,\tfrac72)$, chỉ $r_3\le0$. Tại $\theta=0$: $r=(2,-1,-1,2)$, hai lỗi. Tập nghiệm $(-2,-1)\cup(1,2)$ không lồi, nên không có cách viết nào của bài toán này thỏa Định nghĩa 02.1 (Hệ quả 02.3(b)).
:::

![Bốn điểm trên trục đặc trưng chuẩn hóa u tại âm 2, âm 1, 1 và 2, có nhãn lần lượt âm 1, cộng 1, âm 1, cộng 1; hai nhóm được vẽ bằng hai ký hiệu khác nhau, xen kẽ dọc trục.](img/lec-02/ap-data.svg)

Hình trên cho thấy vì sao không ngưỡng nào đúng cả bốn ảnh: mọi ngưỡng chia trục thành hai nửa, còn hai nhóm đan xen.

Với nhiều đặc trưng và nhiều mẫu, cực tiểu số lỗi phân loại tuyến tính là một bài toán tổ hợp khó (Boyd và Vandenberghe 2004, mục 8.6.1, trang 425), nên việc liệt kê các khoảng như trên không mở rộng được.

### 5.2 Hàm thay thế lồi và mất mát bản lề

**Trực giác (chưa phải định nghĩa).** Thay hàm bậc thang $\ell_{01}$ bằng một hàm lồi nằm trên nó. Tổng của các hàm lồi theo $\theta$ là lồi, nên bài toán mới thuộc các lớp đã học. Vì hàm mới nằm trên $\ell_{01}$, giá trị của nó chặn trên số lỗi.

![Đồ thị theo biên có dấu r từ âm 2 đến 2. Mất mát đếm lỗi là hàm bậc thang bằng 1 khi r nhỏ hơn hoặc bằng 0 và bằng 0 khi r dương. Mất mát bản lề max(0, 1 trừ r) là đường gấp khúc giảm tuyến tính tới 0 tại r bằng 1 rồi nằm ngang; nó luôn nằm trên hoặc chạm hàm đếm lỗi.](img/lec-02/ap-hinge.svg)

Hình trên đặt hai mất mát cạnh nhau. Mất mát bản lề phạt cả những mẫu đúng nhưng có biên nhỏ hơn $1$, và phạt tuyến tính các mẫu sai theo mức độ sai.

::: definition Định nghĩa 02.35 (Hàm thay thế lồi và mất mát bản lề)
Một hàm thay thế lồi (convex surrogate) của mất mát đếm lỗi là một hàm lồi $\ell:\mathbb R\to\mathbb R$ thỏa $\ell(r)\ge\ell_{01}(r)$ với mọi $r$.

Mất mát bản lề (hinge loss) là $\ell_h(r)=\max(0,1-r)$.

Với bộ phân loại tuyến tính có tham số $(w,b)\in\mathbb R^d\times\mathbb R$, điểm số $w^Tu+b$ và dữ liệu $(u_i,y_i)$, $i=1,\ldots,N$, tổng mất mát bản lề là $H(w,b)=\sum_{i=1}^N\ell_h\bigl(y_i(w^Tu_i+b)\bigr)$. Mô hình ngưỡng một chiều là trường hợp $d=1$, $w=1$, $b=-\theta$, với $H(\theta)=\sum_i\ell_h(r_i(\theta))$.
:::

Hàm bản lề lồi vì là cực đại của hai hàm affine (Ví dụ 01.14(c) của Bài 01). Mất mát logistic cơ số $2$, $\log_2(1+e^{-r})$, là một hàm thay thế khác (Bài tập 02.8).

Một hàm thay thế đổi mục tiêu; quan hệ với bài gốc được nêu ở Nhận xét 02.7 và 02.43.

Kết quả sau dùng Định lý 01.31 cho tính lồi và Định lý 02.15 cho cải dạng tuyến tính.

::: proposition Mệnh đề 02.36 (Bảo đảm và giới hạn của hàm thay thế)
**Giả thiết.** $\ell$ là hàm thay thế lồi; $H_\ell(w,b)=\sum_i\ell(y_i(w^Tu_i+b))$ và $\operatorname{err}(w,b)=\sum_i\ell_{01}(y_i(w^Tu_i+b))$.

**Kết luận.**

- (a) $\ell_h$ là một hàm thay thế lồi.
- (b) $H_\ell$ lồi theo $(w,b)$, và $\operatorname{err}(w,b)\le H_\ell(w,b)$ với mọi $(w,b)$; do đó $\inf\operatorname{err}\le\inf H_\ell$, và $H_\ell(w,b)=0$ kéo theo $\operatorname{err}(w,b)=0$.
- (c) Bài toán $\min_{w,b}H(w,b)$ với mất mát bản lề tương đương với quy hoạch tuyến tính $\min_{w,b,\xi}\mathbf 1^T\xi$ với $\xi_i\ge1-y_i(w^Tu_i+b)$, $\xi_i\ge0$.

**Điều kiện áp dụng.** $\ell$ lồi và nằm trên $\ell_{01}$.

**Phạm vi.** Mệnh đề không khẳng định một nghiệm của $H_\ell$ làm nhỏ nhất số lỗi; Ví dụ 02.25 là phản ví dụ. Nó cũng không nói gì về số lỗi trên dữ liệu ngoài tập huấn luyện.
:::

::: proof Chứng minh Mệnh đề 02.36
**Bước 1 (phần (a)).** $\ell_h$ lồi như đã nêu. Xét hai trường hợp.

- Nếu $r\le0$ thì $1-r\ge1$, nên $\ell_h(r)\ge1=\ell_{01}(r)$.
- Nếu $r>0$ thì $\ell_h(r)\ge0=\ell_{01}(r)$.

**Bước 2 (phần (b): tính lồi).** Mỗi hạng $(w,b)\mapsto\ell(y_i(w^Tu_i+b))$ là hợp của hàm lồi $\ell$ với ánh xạ affine $(w,b)\mapsto y_i(w^Tu_i+b)$, lồi theo Định lý 01.31(b); tổng lồi theo Định lý 01.31(a).

**Bước 3 (phần (b): chặn trên số lỗi).** Cộng các bất đẳng thức $\ell_{01}(r_i)\le\ell(r_i)$ theo $i$ cho $\operatorname{err}\le H_\ell$ tại mọi điểm. Với mọi $(w,b)$, $\inf\operatorname{err}\le\operatorname{err}(w,b)\le H_\ell(w,b)$, nên $\inf\operatorname{err}$ là một cận dưới của $H_\ell$ và không lớn hơn $\inf H_\ell$. Nếu $H_\ell(w,b)=0$ thì $0\le\operatorname{err}(w,b)\le0$.

**Bước 4 (phần (c)).** $\ell_h(y_i(w^Tu_i+b))=\max(0,\ 1-y_i(w^Tu_i+b))$ là cực đại của hai hàm affine theo $(w,b)$. Định lý 02.15 với $f=0$, $C=\mathbb R^{d+1}$, $\gamma_i=1$ thay mỗi cực đại bằng một biến phụ $\xi_i$ và hai ràng buộc tuyến tính. $\square$
:::

Mệnh đề 02.36 chỉ cho bảo đảm một chiều: từ $\operatorname{err}\le H$ không suy ra được điểm cực tiểu của $H$ là điểm cực tiểu của $\operatorname{err}$ (Ví dụ 02.25).

::: example Ví dụ 02.25 (Nghiệm của hàm thay thế và số lỗi tại nghiệm)
**Lập hàm thay thế.** Với dữ liệu của Ví dụ 02.24, $1-r_1=-1-\theta$, $1-r_2=2+\theta$, $1-r_3=2-\theta$, $1-r_4=\theta-1$, nên

$$
H(\theta)=\max(0,-1-\theta)+\max(0,2+\theta)+\max(0,2-\theta)+\max(0,\theta-1).
$$

**Cực tiểu $H$.**

- Hai hạng giữa: khi $\lvert\theta\rvert\le2$, tổng của chúng là $(2+\theta)+(2-\theta)=4$; khi $\theta>2$ là $2+\theta>4$; khi $\theta<-2$ là $2-\theta>4$.
- Hai hạng ngoài bằng $0$ khi $\theta\in[-1,1]$, và có ít nhất một hạng dương khi $\theta\notin[-1,1]$.

Vậy $\min_\theta H=4$, đạt đúng trên đoạn $[-1,1]$. Theo Mệnh đề 02.36(c), quy hoạch tuyến tính $\min\sum_i\xi_i$ với $\xi_i\ge1-r_i(\theta)$, $\xi_i\ge0$ có cùng giá trị $4$.

**Số lỗi tại các nghiệm của $H$.** Theo bảng của Ví dụ 02.24, $\operatorname{err}(\theta)=2$ với mọi $\theta\in[-1,1]$. Số lỗi nhỏ nhất là $1$, đạt chẳng hạn tại $\theta=-\tfrac32$, nơi $H(-\tfrac32)=\tfrac12+\tfrac12+\tfrac72+0=\tfrac92$. Vậy mọi nghiệm của bài thay thế có số lỗi gấp đôi số lỗi tối ưu.

**Kiểm tra lại.** $H(0)=0+2+2+0=4$, và $\operatorname{err}(0)=2\le4$; $H(-\tfrac32)=4{,}5\ge\operatorname{err}(-\tfrac32)=1$. Hai cặp đều thỏa $\operatorname{err}\le H$ của Mệnh đề 02.36(b). Cận $\inf\operatorname{err}=1\le\inf H=4$ đúng nhưng cách xa.
:::

![Đồ thị theo ngưỡng theta từ âm 2 đến 2. Tổng bản lề H là đường gấp khúc lồi, nằm ngang ở mức 4 trên đoạn từ âm 1 đến 1 và tăng ở hai bên. Số lỗi là hàm bậc thang bằng 1 trên hai khoảng (âm 2, âm 1) và (1, 2), bằng 2 ở các chỗ còn lại. Đoạn nghiệm của H trùng với vùng có số lỗi bằng 2.](img/lec-02/ap-threshold.svg)

Trên hình, hai mục tiêu có tập nghiệm rời nhau.

Nghiệm của tổng bản lề là các ngưỡng ở giữa, nơi không ảnh nào sai xa. Nghiệm của số lỗi là các ngưỡng lệch về một phía, chấp nhận một ảnh sai xa: ảnh $3$ với biên $-\tfrac52$ tại $\theta=-\tfrac32$.

::: remark Nhận xét 02.37 (Hàm thay thế trong thiết kế phương pháp học)
Mục đích của bộ phân loại là dự đoán đúng trên dữ liệu chưa thấy; số lỗi huấn luyện chỉ là đại diện. Dùng hàm thay thế dựa trên ba căn cứ:

1. toán học: Mệnh đề 02.36 cho bài lồi kèm bảo đảm một chiều;
2. tính toán: bài thay thế giải được bằng quy hoạch tuyến tính hoặc bậc hai;
3. thực nghiệm: số lỗi của nghiệm phải được đo lại trên tập kiểm định độc lập.

Ví dụ 02.25 cho thấy căn cứ thứ ba không bỏ được. Nhầm lẫn thường gặp là báo cáo giá trị $H$ như số lỗi.
:::

**Trong học máy.** Mất mát bản lề, logistic và entropy chéo là các hàm thay thế lồi. Với điểm số tuyến tính theo tham số $(w,b)$, mất mát huấn luyện $H_\ell$ lồi theo Mệnh đề 02.36(b), còn $\operatorname{err}$ là độ đo đánh giá.

Khi điểm số là đầu ra của mạng nơ-ron, ánh xạ từ tham số tới điểm số không affine, giả thiết của Định lý 01.31(b) bị vi phạm và $H_\ell$ không còn lồi. Bảo đảm $\operatorname{err}\le H_\ell$ thì vẫn đúng, vì nó chỉ dùng $\ell\ge\ell_{01}$.

### 5.3 Máy vector hỗ trợ lề mềm

Với nhiều đặc trưng, cực tiểu riêng $H(w,b)$ có một nhược điểm: khi dữ liệu tách được, nhân một nghiệm có $H=0$ với số lớn vẫn giữ $H=0$, nên nghiệm không xác định.

Một hạng phạt bậc hai lên $w$ chọn nghiệm có $\lVert w\rVert_2$ nhỏ, tức khoảng cách $1/\lVert w\rVert_2$ từ biên quyết định (decision boundary) $w^Tu+b=0$ tới các mặt $w^Tu+b=\pm1$ lớn.

::: example Ví dụ 02.26 (Mất mát bản lề không xác định nghiệm trên dữ liệu tách được)
**Không có hạng phạt.** Hai mẫu $u=-1$ với nhãn $-1$ và $u=1$ với nhãn $+1$. Với $b=0$, $H(w,0)=2\max(0,1-w)$ bằng $0$ với mọi $w\ge1$, nên mọi $(w,0)$ với $w\ge1$ là nghiệm của $\min H$. Nhân nghiệm $(1,0)$ với $2$ hay $10$ vẫn cho $H=0$.

**Thêm hạng phạt.** Thêm $\tfrac\lambda2w^2$ với $0<\lambda\le2$.

- Trên $w\le1$, đạo hàm $\lambda w-2<0$.
- Trên $w\ge1$, mục tiêu $\tfrac\lambda2w^2$ tăng.

Do đó nghiệm theo $w$ (với $b=0$) là $w=1$, giá trị $\tfrac\lambda2$.

**Kiểm tra lại.** Với $\lambda=2$ và $w=1$, mục tiêu bằng $1=\tfrac\lambda2$; với $w=0{,}8$, nó bằng $0{,}64+0{,}4=1{,}04>1$.
:::

::: definition Định nghĩa 02.38 (Máy vector hỗ trợ lề mềm)
Cho dữ liệu $(u_i,y_i)\in\mathbb R^d\times\{-1,+1\}$, $i=1,\ldots,N$, và $\lambda>0$. Máy vector hỗ trợ (support vector machine, SVM) lề mềm là bài toán

$$
\underset{w\in\mathbb R^d,\ b\in\mathbb R}{\operatorname{minimize}}\quad J(w,b)=\frac\lambda2\lVert w\rVert_2^2+\sum_{i=1}^N\max\bigl(0,\ 1-y_i(w^Tu_i+b)\bigr).
\tag{5.1}
$$
:::

So với máy vector hỗ trợ lề cứng, mô hình lề mềm cho phép vi phạm và phạt nó bằng mất mát bản lề. Máy lề cứng ở Ví dụ 01.10(b) của Bài 01 được viết không có hệ số chặn, $y_iu_i^Tw\ge1$; ở đây thêm $b$.

Về cấu trúc, (5.1) giống tổ hợp $\ell_1+\ell_2^2$ của Mục 3, với hệ số chặn không bị phạt.

Kết quả sau dùng Định lý 02.15 cho (a), Định lý 01.38 cho (b), và tính lồi chặt của $\tfrac\lambda2\lVert w\rVert_2^2$ cùng Định lý 01.31 cho (c).

::: proposition Mệnh đề 02.39 (Máy vector hỗ trợ lề mềm là quy hoạch bậc hai)
**Giả thiết.** Bài toán (5.1) với $\lambda>0$, và dữ liệu có ít nhất một mẫu mỗi nhãn.

**Kết luận.** (a) (5.1) tương đương với quy hoạch bậc hai

$$
\begin{aligned}
\underset{w,b,\xi}{\operatorname{minimize}}\quad & \frac\lambda2w^Tw+\mathbf 1^T\xi\\
\text{subject to}\quad & \xi_i\ge1-y_i(w^Tu_i+b),\quad\xi_i\ge0,\quad i=1,\ldots,N .
\end{aligned}
$$

(b) (5.1) có nghiệm.

(c) Thành phần $w$ của nghiệm là duy nhất.

**Điều kiện áp dụng.** $\lambda>0$ cho (b) và (c); điều kiện có cả hai nhãn là điều kiện đủ, dùng để chặn $b$ trong chứng minh (b).

**Phạm vi.** Hệ số chặn $b$ có thể không duy nhất: với $N=2$, $u_1=u_2=0$, $y_1=+1$, $y_2=-1$, mục tiêu là $\tfrac\lambda2w^2+\max(0,1-b)+\max(0,1+b)$, bằng $2$ với $w=0$ và mọi $b\in[-1,1]$.
:::

::: proof Chứng minh Mệnh đề 02.39
**Bước 1 (phần (a)).** Áp dụng Định lý 02.15 với $f(w,b)=\tfrac\lambda2\lVert w\rVert_2^2$, $C=\mathbb R^{d+1}$, $\gamma_i=1$. Theo thứ tự biến $(w,b,\xi)$, mục tiêu có ma trận bậc hai $\operatorname{diag}(\lambda I_d,0,0_N)\succeq0$, các ràng buộc affine: quy hoạch bậc hai theo Định nghĩa 02.17.

**Bước 2 (phần (b): chặn dưới theo $b$ và $w$).** Gọi $i_+$, $i_-$ là chỉ số của một mẫu nhãn $+1$ và một mẫu nhãn $-1$, và $M=\max_i\lVert u_i\rVert_2$. Mỗi hạng bản lề không nhỏ hơn biểu thức bên trong, và Cauchy–Schwarz cho $\lvert w^Tu_i\rvert\le M\lVert w\rVert_2$, nên

$$
\begin{aligned}
J(w,b)&\ge1-w^Tu_{i_+}-b\ge1-b-M\lVert w\rVert_2,\\
J(w,b)&\ge1+w^Tu_{i_-}+b\ge1+b-M\lVert w\rVert_2,
\end{aligned}
$$

và $J(w,b)\ge\tfrac\lambda2\lVert w\rVert_2^2$.

**Bước 3 (phần (b): tập mức dưới bị chặn).** Nếu $J(w,b)\le K$ thì $\lVert w\rVert_2\le\sqrt{2K/\lambda}$ và $\lvert b\rvert\le K-1+M\sqrt{2K/\lambda}$, nên mọi tập mức dưới của $J$ bị chặn.

**Bước 4 (phần (b): tính bức và tồn tại).** $J$ bức. Thật vậy, nếu có dãy $(w_k,b_k)$ với chuẩn dần tới vô cực mà $J(w_k,b_k)$ không dần tới $+\infty$, thì một dãy con có $J\le K$ với một $K$ nào đó, mâu thuẫn với tính bị chặn của tập mức dưới. $J$ liên tục trên $\mathbb R^{d+1}$, và Định lý 01.38 cho nghiệm tồn tại.

**Bước 5 (phần (c)).** Giả sử $(w,b)$ và $(w',b')$ là hai nghiệm với $w\ne w'$, cùng giá trị $p^*$. Tại trung điểm, hàm $\tfrac\lambda2\lVert\cdot\rVert_2^2$ lồi chặt cho

$$
\tfrac\lambda2\lVert\tfrac{w+w'}2\rVert_2^2<\tfrac12\cdot\tfrac\lambda2\lVert w\rVert_2^2+\tfrac12\cdot\tfrac\lambda2\lVert w'\rVert_2^2,
$$

còn tổng bản lề lồi theo $(w,b)$ cho bất đẳng thức không chặt cùng chiều. Cộng lại, $J$ tại trung điểm nhỏ hơn $\tfrac12p^*+\tfrac12p^*=p^*$, mâu thuẫn. $\square$
:::

Mệnh đề 02.39 tương tự về cấu trúc với Mệnh đề 02.21, nhưng hình phạt chỉ đặt lên $w$. Vì vậy chứng minh tồn tại dùng thêm giả thiết hai nhãn để chặn $b$, và tính duy nhất chỉ còn cho $w$.

Khi $\lambda=0$, quy hoạch bậc hai suy biến thành quy hoạch tuyến tính của Mệnh đề 02.36(c).

::: remark Nhận xét 02.40 (Giả thiết hai nhãn không cần cho sự tồn tại)
Nếu mọi nhãn bằng $+1$, thì $w=0$ và mọi $b\ge1$ cho $J=0$, giá trị nhỏ nhất có thể vì $J\ge0$. Nghiệm vẫn tồn tại, nhưng tập nghiệm $\{(0,b)\mid b\ge1\}$ không bị chặn theo $b$, nên bước chặn $b$ trong chứng minh Mệnh đề 02.39(b) không thực hiện được.

Giả thiết hai nhãn vì vậy là điều kiện đủ cho lập luận tính bức, không phải điều kiện cần cho sự tồn tại. Trong thực hành, dữ liệu một nhãn chỉ cho bộ phân loại hằng.
:::

**Trong học máy.** Theo Mệnh đề 02.39, huấn luyện máy vector hỗ trợ lề mềm là quy hoạch bậc hai lồi với $d+1+N$ biến, có nghiệm và có $w$ duy nhất, nên mọi bộ giải trả về cùng một hướng của biên quyết định.

Hệ số $\lambda$ điều khiển đánh đổi giữa lề rộng và tổng vi phạm (Tình huống 02.2). Bài toán đối ngẫu của (5.1) và thủ thuật hạt nhân (kernel trick) nằm ngoài phạm vi học phần.

### 5.4 Nới lỏng bài toán nhị phân

Cách xử lý thứ hai giữ mục tiêu và thay đổi miền, theo Boyd và Vandenberghe (2004, Bài tập 4.15, tr. 194).

Một nhóm phát triển mô hình nhận diện người đi bộ cần mua ảnh đã gán nhãn cho ba bối cảnh: ngày khô, đêm khô, trời mưa. Ba gói được bán nguyên gói, mỗi gói $2$ triệu đồng (giá minh họa):

- gói $1$ có ngày khô và đêm khô;
- gói $2$ có đêm khô và trời mưa;
- gói $3$ có ngày khô và trời mưa.

Mua cả ba tốn $6$ triệu đồng; cần cách mua rẻ nhất.

::: example Ví dụ 02.27 (Mô hình nhị phân của bài chọn gói)
**Lập mô hình.** Biến $x_j=1$ nếu mua gói $j$ và $x_j=0$ nếu không. Mỗi bối cảnh phải có ít nhất một gói chứa nó:

$$
\begin{aligned}
\underset{x}{\operatorname{minimize}}\quad & 2(x_1+x_2+x_3)\\
\text{subject to}\quad & x_1+x_3\ge1,\quad x_1+x_2\ge1,\quad x_2+x_3\ge1,\quad x\in\{0,1\}^3,
\end{aligned}
\tag{5.2}
$$

lần lượt cho ngày khô, đêm khô và trời mưa.

**Liệt kê tám phương án.**

- Không mua hoặc mua đúng một gói luôn thiếu một bối cảnh.
- $(1,1,0)$, $(1,0,1)$, $(0,1,1)$ khả thi với chi phí $4$.
- $(1,1,1)$ khả thi với chi phí $6$.

Tập khả thi $F=\{(1,1,0),(1,0,1),(0,1,1),(1,1,1)\}$ và giá trị tối ưu $p^*=4$.

**Kiểm tra lại.** $F$ không lồi: trung điểm của $(1,1,0)$ và $(1,0,1)$ là $(1,\tfrac12,\tfrac12)\notin\{0,1\}^3$. Mục tiêu và các ràng buộc phủ đều affine, nên (5.2) không lồi chỉ vì điều kiện nhị phân.
:::

Với ba gói, liệt kê là đủ; với $n$ gói, có $2^n$ phương án.

Trực giác của nới lỏng: bỏ điều kiện nguyên, cho phép $x_j$ nhận mọi giá trị trong $[0,1]$. Bài mới là quy hoạch tuyến tính, có tập khả thi chứa $F$, nên giá trị tối ưu của nó không lớn hơn $p^*$.

::: definition Định nghĩa 02.41 (Nới lỏng)
Cho bài toán $(\mathrm P_F)$: $\min_{x\in F}f(x)$. Một bài toán $(\mathrm P_{\tilde F})$: $\min_{x\in\tilde F}f(x)$ với cùng mục tiêu và $F\subseteq\tilde F$ được gọi là một nới lỏng (relaxation) của $(\mathrm P_F)$.

Với bài nhị phân có ràng buộc tuyến tính, $F=\{x\in\{0,1\}^n\mid Gx\preceq h\}$, nới lỏng tuyến tính là bài toán trên $\tilde F=\{x\in[0,1]^n\mid Gx\preceq h\}$.
:::

Nới lỏng khác cải dạng tương đương ở chỗ tập khả thi lớn lên thật sự, và khác hàm thay thế ở chỗ mục tiêu giữ nguyên.

Nới lỏng tuyến tính của một bài nhị phân có mục tiêu tuyến tính là quy hoạch tuyến tính, vì $x_j\in[0,1]$ là hai bất đẳng thức tuyến tính. Ký hiệu $p^*_F$ và $p^*_{\tilde F}$ cho hai giá trị tối ưu.

Kết quả sau chỉ dùng Mệnh đề 01.16 về hai bài toán có miền lồng nhau.

::: proposition Mệnh đề 02.42 (Cận và chứng nhận từ nới lỏng)
**Giả thiết.** $(\mathrm P_{\tilde F})$ là nới lỏng của $(\mathrm P_F)$.

**Kết luận.**

- (a) $p^*_{\tilde F}\le p^*_F$.
- (b) Nếu $\tilde F$ rỗng thì $F$ rỗng.
- (c) Nếu một nghiệm $\tilde x$ của $(\mathrm P_{\tilde F})$ thuộc $F$ thì $\tilde x$ là nghiệm của $(\mathrm P_F)$ và $p^*_F=p^*_{\tilde F}$.
- (d) Với mọi $\hat x\in F$, $p^*_{\tilde F}\le p^*_F\le f(\hat x)$, nên khoảng cách từ $f(\hat x)$ tới giá trị tối ưu không vượt $f(\hat x)-p^*_{\tilde F}$.

**Điều kiện áp dụng.** Cùng mục tiêu, $F\subseteq\tilde F$, bài toán cực tiểu. Với bài cực đại, giá trị của nới lỏng là cận trên.

**Phạm vi.** Mệnh đề không cho cách biến nghiệm của nới lỏng thành phương án của bài gốc; nghiệm của nới lỏng có thể không thuộc $F$, và làm tròn nó có thể cho phương án không khả thi hoặc không tối ưu.
:::

::: proof Chứng minh Mệnh đề 02.42
**Bước 1 (phần (a)).** Đây là Mệnh đề 01.16(a) với $C=\tilde F$ và $C'=F$.

**Bước 2 (phần (b)).** $F\subseteq\tilde F=\varnothing$.

**Bước 3 (phần (c)).** Vì $\tilde x\in F\subseteq\tilde F$ là nghiệm trên $\tilde F$, Mệnh đề 01.16(b) cho $\tilde x$ là nghiệm trên $F$ và hai giá trị bằng nhau.

**Bước 4 (phần (d)).** Vế trái là (a). Vế phải đúng vì $\hat x\in F$ và $p^*_F$ là cận dưới đúng của $f$ trên $F$. Trừ $p^*_F\ge p^*_{\tilde F}$ khỏi $f(\hat x)$ cho $f(\hat x)-p^*_F\le f(\hat x)-p^*_{\tilde F}$. $\square$
:::

Mệnh đề 02.42 là Mệnh đề 01.16 dùng theo hướng mới: lấy cận cho một bài khó từ một bài dễ.

Phần (d) là cách dùng thực tế: bộ giải trả về phương án khả thi $\hat x$ cùng cận $p^*_{\tilde F}$, và hiệu $f(\hat x)-p^*_{\tilde F}$ đo mức có thể còn cải thiện.

::: example Ví dụ 02.28 (Nghiệm của nới lỏng tuyến tính và chứng nhận $p^*=4$)
**Giải nới lỏng.** Nới lỏng tuyến tính của (5.2) thay $x\in\{0,1\}^3$ bằng $0\le x_j\le1$. Cộng ba ràng buộc phủ: $(x_1+x_3)+(x_1+x_2)+(x_2+x_3)\ge3$, tức

$$
2(x_1+x_2+x_3)\ge3 .
$$

Mọi điểm khả thi của nới lỏng có chi phí ít nhất $3$, và $\tilde x=(\tfrac12,\tfrac12,\tfrac12)$ khả thi (mỗi ràng buộc phủ cho $\tfrac12+\tfrac12=1$) với chi phí $3$. Vậy $p^*_{\tilde F}=3$, đạt tại một điểm không nhị phân; đây cũng là Mệnh đề 02.11 với $\mu=(1,1,1)$.

**Khôi phục phương án.**

- Làm tròn xuống cho $(0,0,0)$, không khả thi.
- Làm tròn lên cho $(1,1,1)$, khả thi với chi phí $6$.
- Bỏ một gói khỏi $(1,1,1)$, chẳng hạn gói $3$, cho $(1,1,0)$, khả thi với chi phí $4$.

**Ghép cận.** Theo Mệnh đề 02.42(d), $3\le p^*\le4$. Mọi chi phí khả thi là bội của $2$, và trong $[3,4]$ chỉ có $4$ là bội của $2$, nên $p^*=4$ và $(1,1,0)$ là nghiệm.

**Kiểm tra lại.** Kết luận khớp với liệt kê ở Ví dụ 02.27. Cận dưới $3$ không đạt được bởi phương án nhị phân nào, và chi phí $6$ của phương án làm tròn lên chỉ là một cận trên.
:::

![Ba thanh ứng với ba gói, mỗi thanh chỉ được tô một nửa chiều cao, biểu diễn nghiệm phân số x1 bằng x2 bằng x3 bằng một phần hai của bài nới lỏng. Chú thích nhắc rằng đây không phải một giao dịch được phép vì mỗi gói chỉ bán nguyên.](img/lec-02/ap-cover.svg)

Trên hình, $x_j=\tfrac12$ không có nghĩa là mua nửa gói hay mua với xác suất một nửa; đó là giá trị của biến trong một bài toán khác.

Lập luận "bội của $2$" là bước riêng của bài này. Với giá khác nhau, khoảng $[p^*_{\tilde F},f(\hat x)]$ có thể chứa nhiều giá trị khả dĩ và cần liệt kê hoặc phương pháp khác (Tình huống 02.3).

::: remark Nhận xét 02.43 (Bốn phép xử lý và ý nghĩa của nghiệm)
Bảng sau phân biệt bốn phép xử lý của chương theo quan hệ giữa nghiệm của bài mới và bài gốc.

| Phép xử lý | Quan hệ với bài gốc | Việc phải làm sau khi giải |
|---|---|---|
| Cải dạng tương đương (Định nghĩa 02.5): biến phụ, biến dư, đổi biến logarit | ánh xạ $\psi$ cho bằng công thức chuyển mọi nghiệm thành nghiệm gốc (Nhận xét 02.7) | áp dụng $\psi$ |
| Thay mất mát (Định nghĩa 02.35): số lỗi thành bản lề | chỉ có $\operatorname{err}\le H$; nghiệm nói chung không là nghiệm gốc (Ví dụ 02.25) | đo lại mục tiêu gốc tại nghiệm |
| Thay ràng buộc bằng hình phạt (Mục 3.3, 6.2): trần hay giới hạn số đặc trưng thành hạng phạt | từ hình phạt chỉ suy ra một mức trần (Mệnh đề 02.26); ràng buộc gốc có thể bị vi phạm (Ví dụ 02.29) | kiểm tra lại ràng buộc gốc |
| Nới lỏng (Định nghĩa 02.41): nhị phân thành khoảng | mục tiêu giữ nguyên, miền mở rộng; giá trị chỉ cho cận | khôi phục phương án khả thi, ghép cận |

Ba nhầm lẫn thường gặp:

1. gọi một phép ở ba dòng dưới là cải dạng;
2. đọc giá trị của nới lỏng như giá trị của bài gốc;
3. coi một điểm khả thi của nới lỏng, như $(1,1,1)$ với chi phí $6$, là một cận dưới.

Chiều của cận phụ thuộc chiều tối ưu: với bài cực đại, nới lỏng cho cận trên.
:::

**Trong học máy.** Nới lỏng tuyến tính dùng cho các quyết định rời rạc quanh một hệ học máy: chọn dữ liệu cần gán nhãn dưới ngân sách, chọn mô-đun đưa lên thiết bị dưới giới hạn bộ nhớ, chọn đặc trưng.

Mệnh đề 02.42 cho cận và tiêu chí dừng: khi $f(\hat x)-p^*_{\tilde F}$ nhỏ, phương án đã gần tối ưu. Nghiệm nới lỏng không được bảo đảm nguyên (Tình huống 02.3).

::: exercise Bài tập 02.8
Cho $\ell(r)=\log_2(1+e^{-r})$.

(a) Chứng minh $\ell$ là hàm thay thế lồi của $\ell_{01}$.

(b) Với dữ liệu của Ví dụ 02.24, đặt $L(\theta)=\sum_i\ell(r_i(\theta))$. Tính $L(0)$ và $L(-\tfrac32)$ (bốn chữ số thập phân).

(c) Chứng minh $L(-\theta)=L(\theta)$ và suy ra $\theta=0$ là nghiệm của $\min_\theta L$. So sánh với số lỗi.
:::

::: hint
Ở (a), $\ell(r)=\log(1+e^{-r})/\log2$ và dùng Mệnh đề 01.9 của Bài 01. Ở (c), phép đổi $(u,y)\mapsto(-u,-y)$ hoán vị bốn mẫu.
:::

::: solution
**(a) Tính lồi.** $\ell=\ell_e/\log2$ với $\ell_e(r)=\log(1+e^{-r})$, và $\ell_e''(r)=e^r/(1+e^r)^2>0$ (Mệnh đề 01.9(c)), nên $\ell$ lồi.

**(a) Nằm trên $\ell_{01}$.**

- Nếu $r\le0$ thì $e^{-r}\ge1$, $1+e^{-r}\ge2$ và $\ell(r)\ge\log_22=1$.
- Nếu $r>0$ thì $\ell(r)>0$.

Vậy $\ell\ge\ell_{01}$.

**(b) Tại $\theta=0$.** $r=(2,-1,-1,2)$, $\ell(2)=\log_2(1+e^{-2})\approx0{,}1831$, $\ell(-1)=\log_2(1+e)\approx1{,}8946$, nên

$$
L(0)\approx2(0{,}1831)+2(1{,}8946)\approx4{,}1555 .
$$

**(b) Tại $\theta=-\tfrac32$.** $r=(\tfrac12,\tfrac12,-\tfrac52,\tfrac72)$, $\ell(\tfrac12)\approx0{,}6839$, $\ell(-\tfrac52)\approx3{,}7206$, $\ell(\tfrac72)\approx0{,}0429$, nên

$$
L(-\tfrac32)\approx2(0{,}6839)+3{,}7206+0{,}0429\approx5{,}1314 .
$$

Các tổng được tính từ giá trị chưa làm tròn, nên có thể lệch $10^{-4}$ so với tổng các số đã làm tròn.

**(c) Tính đối xứng.** Biên của mẫu $(-u,-y)$ tại $-\theta$ là $(-y)(-u+\theta)=y(u-\theta)$, biên của mẫu $(u,y)$ tại $\theta$. Phép đổi $(u,y)\mapsto(-u,-y)$ hoán vị bốn mẫu, nên $L(-\theta)=L(\theta)$.

**(c) Nghiệm.** Vì $L$ lồi, $L(0)\le\tfrac12L(\theta)+\tfrac12L(-\theta)=L(\theta)$ với mọi $\theta$. Vậy $\theta=0$ là nghiệm, với $\operatorname{err}(0)=2$, trong khi $\operatorname{err}(-\tfrac32)=1$: mất mát logistic cho cùng hiện tượng như mất mát bản lề ở Ví dụ 02.25.
:::

::: exercise Bài tập 02.9
Bốn bối cảnh $A,B,C,D$ và bốn gói giá $1$: gói $1$ có $\{A,B\}$, gói $2$ có $\{B,C\}$, gói $3$ có $\{C,D\}$, gói $4$ có $\{D,A\}$. Viết nới lỏng tuyến tính của bài chọn gói rẻ nhất phủ đủ bốn bối cảnh, chứng minh giá trị của nó là $2$, và kết luận về bài nhị phân bằng Mệnh đề 02.42.
:::

::: hint
Cộng hai ràng buộc của $B$ và $D$.
:::

::: solution
**Lập nới lỏng.** $\min\sum_jx_j$ với $x_4+x_1\ge1$, $x_1+x_2\ge1$, $x_2+x_3\ge1$, $x_3+x_4\ge1$, $0\le x_j\le1$.

**Cận dưới.** Cộng ràng buộc của $B$ và $D$: $\sum_jx_j\ge2$.

**Nghiệm.** Điểm $(1,0,1,0)$ khả thi (mỗi ràng buộc có đúng một hạng bằng $1$) với giá trị $2$, nên là nghiệm của nới lỏng. Nó nhị phân, nên theo Mệnh đề 02.42(c) nó là nghiệm của bài nhị phân và $p^*=2$.

**So sánh.** Điểm $(\tfrac12,\tfrac12,\tfrac12,\tfrac12)$ cũng là nghiệm của nới lỏng. Với chu trình ba bối cảnh của Ví dụ 02.28, cận $3$ nhỏ hơn $p^*=4$.
:::

Chuỗi suy luận và kết quả của mục:

1. Ví dụ 02.24 chỉ ra bài số lỗi không lồi;
2. Mệnh đề 02.36 cho bài thay thế lồi với bảo đảm một chiều $\operatorname{err}\le H$, và Ví dụ 02.25 đo khoảng cách giữa hai bài;
3. Mệnh đề 02.39 mở rộng sang nhiều đặc trưng;
4. Mệnh đề 02.42 cho cận từ nới lỏng.

Đích là Nhận xét 02.43. Các phép xử lý mới chỉ được thử trên ví dụ đã biết trước thuộc lớp nào; chưa có quy trình cho biết với một mô hình mới nên dùng phép nào và kiểm tra gì.

## 6. Tổng hợp: nhận dạng lớp bài toán và kiểm tra cải dạng

Mục 5 kết thúc với các phép xử lý chỉ được thử trên ví dụ đã biết trước thuộc lớp nào.

Một bộ phân loại tuyến tính hai đặc trưng được huấn luyện bằng mất mát bản lề trên bốn mẫu $u_1=(1,0)$, $u_2=(-1,0)$, $u_3=(0,1)$, $u_4=(0,-1)$ với nhãn $y=(+1,-1,+1,-1)$. Để giảm chi phí khi triển khai, nó chỉ được dùng tối đa một đặc trưng, tức $w\in\mathbb R^2$ có nhiều nhất một thành phần khác $0$. Mất mát lồi, còn ràng buộc này chưa rõ thuộc loại nào, và cần biết dùng phép xử lý nào.

Mục này gom các lớp bài toán thành một bảng nhận dạng, viết quy trình nhận dạng thành một thuật toán, rồi áp dụng cho ràng buộc số đặc trưng.

### 6.1 Bảng nhận dạng và quy trình

Bảng sau liệt kê các lớp đã gặp, theo biến $x\in\mathbb R^n$. Ký hiệu $f_i(x)=\tfrac12x^TP_ix+q_i^Tx+s_i$.

| Lớp | Mục tiêu | Ràng buộc | Chứng nhận tính lồi | Kết quả |
|---|---|---|---|---|
| Quy hoạch tuyến tính | $c^Tx$ | $Gx\preceq h$, $Ax=b$ | mọi hàm affine | Định nghĩa 02.9, Mệnh đề 02.10 |
| Quy hoạch bậc hai | $f_0(x)$ | $Gx\preceq h$, $Ax=b$ | $P_0\succeq0$ | Định nghĩa 02.17, Mệnh đề 02.18 |
| QCQP | $f_0(x)$ | $f_i(x)\le0$, $Ax=b$ | $P_i\succeq0$ với mọi $i=0,\ldots,m$ | Định nghĩa 02.24, Mệnh đề 02.25 |
| Quy hoạch hình học | tổng đơn thức dương | tổng đơn thức dương $\le1$, đơn thức $=1$, $x\succ0$ | lồi sau đổi biến $z=\log x$ | Định nghĩa 02.29, Định lý 02.33 |
| Dạng chuẩn tổng quát | $f_0$ lồi | $f_i\le0$ với $f_i$ lồi, $Ax=b$ | từng dòng | Định nghĩa 02.1, Mệnh đề 02.2 |

Ba lớp đầu lồng nhau và cùng nằm trong dạng chuẩn tổng quát; quy hoạch hình học chỉ tương đương với một bài dạng chuẩn sau đổi biến.

Các mục tiêu có tổng hoặc cực đại của hàm affine, như $\lVert r\rVert_1$, $\lVert r\rVert_\infty$ hay mất mát bản lề, thuộc các lớp trên sau khi thêm biến phụ.

Quy trình đã dùng trong các ví dụ được viết lại thành thuật toán sau. Nó mở rộng Thuật toán 01.1 của Bài 01, vốn chứng nhận một mô hình đã cho, bằng các bước cải dạng, thay thế và nới lỏng.

::: algorithm Thuật toán 02.1 (Nhận dạng và đưa một mô hình về bài toán lồi)
**Đầu vào.** Một mô hình tối ưu: dữ kiện, biến quyết định, mục tiêu, các ràng buộc.

**Đầu ra.** Một bài toán thuộc một lớp của bảng trên cùng ánh xạ khôi phục nghiệm; hoặc một bài toán lồi thay thế hay nới lỏng cùng bảo đảm của nó; hoặc kết luận rằng không có cách nào trong chương áp dụng được.

1. Ghi miền $D$, kiểu và chiều của mọi biến; đổi bài cực đại thành cực tiểu bằng cách đổi dấu mục tiêu, hoặc nghịch đảo một mục tiêu đơn thức (Mệnh đề 02.30(c)).
2. Kiểm tra từng dòng theo Định nghĩa 02.1: mục tiêu lồi; mỗi bất đẳng thức có dạng $f_i\le0$ với $f_i$ lồi; mỗi đẳng thức affine. Công cụ: Định lý 01.30, Định lý 01.31, Định lý 02.32.
3. Với mỗi dòng không đạt, thử viết lại thành một dòng tương đương có cùng tập nghiệm, như Ví dụ 02.1.
4. Nếu mục tiêu chứa tổng hoặc cực đại của hàm affine với hệ số không âm, thêm biến phụ theo Định lý 02.15.
5. Nếu mọi biến dương và các hàm là đơn thức hoặc tổng đơn thức dương, chuẩn hóa theo Mệnh đề 02.30 và đổi biến theo Định lý 02.33.
6. Nhận dạng lớp bằng bảng trên; kiểm tra tồn tại và duy nhất (Mệnh đề 02.18, 02.21, Định lý 01.36, 01.38).
7. Nếu bước 2 đến bước 5 không cho dạng lồi, chọn một trong ba phép đổi bài toán của Nhận xét 02.43: thay mất mát bằng hàm thay thế lồi (Định nghĩa 02.35); thay ràng buộc bằng hình phạt (Mục 3.3, 6.2); hoặc nới lỏng miền (Định nghĩa 02.41). Ghi rõ bảo đảm của phép đã chọn (Mệnh đề 02.36, 02.26 hoặc 02.42).
8. Sau khi giải: với cải dạng tương đương, áp dụng $\psi$ để lấy nghiệm gốc; với hàm thay thế, tính lại mục tiêu gốc tại nghiệm; với hình phạt, kiểm tra lại ràng buộc gốc; với nới lỏng, khôi phục một phương án khả thi và ghép cận theo Mệnh đề 02.42(d).

**Điều kiện dừng.** Quy trình dừng sau bước 8; hoặc ở bước 7 nếu không có hàm thay thế hay nới lỏng nào chấp nhận được với người dùng mô hình.

**Chi phí.** Các bước 1 đến 7 là kiểm tra trên công thức. Bước 4 thêm một biến và $K_i$ ràng buộc cho mỗi hạng cực đại; bước 5 không đổi số biến.
:::

Bước 3 giữ tập nghiệm, còn bước 7 cố ý đổi bài toán. Bảng kiểm sau ghi câu hỏi cần trả lời cho mỗi phép biến đổi trước khi báo cáo kết quả.

| Phép biến đổi | Câu hỏi kiểm tra | Căn cứ |
|---|---|---|
| Thêm biến phụ | bài toán là cực tiểu và mọi hệ số trước cực đại không âm; ràng buộc biến phụ có đủ mọi nhánh của cực đại | Định lý 02.15, Nhận xét 02.16 |
| Đổi biến logarit | mọi biến dương; mọi hệ số dương; bất đẳng thức đúng chiều; giá trị tối ưu được đổi lại qua hàm mũ | Định lý 02.33, Nhận xét 02.34 |
| Biến dư, tách biến tự do | ánh xạ khôi phục $\psi$ được nêu; không khẳng định tương ứng một – một | Mệnh đề 02.10 |
| Chính quy hóa | báo cáo rằng bài toán đã đổi; không so sánh giá trị có phạt với giá trị không phạt | Nhận xét 02.23 |
| Hàm thay thế | mục tiêu gốc được đo lại tại nghiệm trên dữ liệu độc lập | Mệnh đề 02.36, Nhận xét 02.37 |
| Nới lỏng | phương án khôi phục khả thi cho bài gốc; cận đúng chiều | Mệnh đề 02.42, Nhận xét 02.43 |

### 6.2 Ràng buộc số đặc trưng

Trở lại yêu cầu ở đầu mục. Ký hiệu $\lVert w\rVert_0$ cho số thành phần khác $0$ của $w$.

::: definition Định nghĩa 02.44 (Ràng buộc số đặc trưng)
Với $w\in\mathbb R^d$, $\lVert w\rVert_0=\#\{j\mid w_j\ne0\}$. Cho dữ liệu $(u_i,y_i)\in\mathbb R^d\times\{-1,+1\}$ và số nguyên $k$ với $0\le k\le d$, bài toán phân loại bản lề với giới hạn số đặc trưng là

$$
\underset{w\in\mathbb R^d,\ b\in\mathbb R}{\operatorname{minimize}}\quad H(w,b)\qquad\text{subject to}\quad\lVert w\rVert_0\le k,
\tag{6.1}
$$

với $H$ như Định nghĩa 02.35. Hệ số chặn $b$ không bị đếm.
:::

Ký hiệu $\lVert w\rVert_0$ không phải một chuẩn: với $w=(1,0,\ldots,0)$, $\lVert2w\rVert_0=1\ne2\lVert w\rVert_0$.

Chuẩn một đo độ lớn, còn $\lVert w\rVert_0$ đếm số thành phần dùng: $(2,0)$ và $(1,1)$ có cùng $\lVert\cdot\rVert_1=2$ nhưng $\lVert\cdot\rVert_0$ là $1$ và $2$.

Ràng buộc (6.1) đặt lên miền, nên câu hỏi đầu tiên của Thuật toán 02.1 là miền có lồi không.

::: proposition Mệnh đề 02.45 (Miền giới hạn số đặc trưng không lồi)
**Giả thiết.** $d\ge2$ và $F_k=\{w\in\mathbb R^d\mid\lVert w\rVert_0\le k\}$.

**Kết luận.** $F_k$ không lồi khi $1\le k\le d-1$. $F_0=\{0\}$ và $F_d=\mathbb R^d$ lồi.

**Điều kiện áp dụng.** $k$ nguyên.

**Phạm vi.** Mệnh đề nói về miền; nó không nói rằng (6.1) không có nghiệm hay khó giải trong mọi trường hợp.
:::

::: proof Chứng minh Mệnh đề 02.45
**Bước 1 (hai điểm thuộc $F_k$).** Với $1\le k\le d-1$, gọi $e_j$ là vector đơn vị thứ $j$. Đặt

$$
w=e_1+\cdots+e_{k-1}+e_k,\qquad w'=e_1+\cdots+e_{k-1}+e_{k+1}.
$$

Khi $k=1$, phần chung rỗng, $w=e_1$, $w'=e_2$; chỉ số $k+1\le d$ hợp lệ. Mỗi vector có đúng $k$ thành phần khác $0$, nên thuộc $F_k$.

**Bước 2 (trung điểm không thuộc $F_k$).** Trung điểm $\tfrac12(w+w')$ có thành phần $1$ tại $k-1$ chỉ số chung và $\tfrac12$ tại hai chỉ số $k$, $k+1$. Tổng cộng có $k+1$ thành phần khác $0$, nên trung điểm không thuộc $F_k$.

**Bước 3 (hai trường hợp biên).** Với $k=0$, $F_0=\{0\}$ là một điểm; với $k=d$, mọi vector thỏa ràng buộc. Cả hai lồi. $\square$
:::

![Mặt phẳng (w1, w2). Tập F các vector có tối đa một hệ số khác không là hợp của hai trục tọa độ. Điểm A bằng (1, 0) và B bằng (0, 1) thuộc F; trung điểm M bằng (0,5; 0,5) của đoạn nét đứt AB không thuộc F.](img/lec-02/feature-cardinality.svg)

Hình trên là trường hợp $d=2$, $k=1$ của Mệnh đề 02.45. Mục tiêu $H$ lồi nhưng miền không lồi, nên (6.1) không ở dạng chuẩn.

Cách giải trực tiếp là liệt kê mọi tập chỉ số có tối đa $k$ phần tử và giải bài lồi trên mỗi tập. Số bài con $\sum_{j=0}^k\binom dj$ tăng nhanh, chẳng hạn $\binom{100}{5}\approx7{,}5\cdot10^7$.

Theo bước 7 của Thuật toán 02.1, có thể thay ràng buộc đếm bằng hình phạt chuẩn một, một hàm lồi có xu hướng đẩy hệ số về $0$ (Mục 3.3):

$$
\underset{w,b}{\operatorname{minimize}}\quad H(w,b)+\lambda\lVert w\rVert_1 .
\tag{6.2}
$$

Theo Định lý 02.15, (6.2) là quy hoạch tuyến tính với biến $(w,b,\xi,v)$: $\min\mathbf 1^T\xi+\lambda\mathbf 1^Tv$ với $\xi_i\ge1-y_i(w^Tu_i+b)$, $\xi_i\ge0$, $-v\preceq w\preceq v$. Đây là phép thay ràng buộc bằng hình phạt của Nhận xét 02.43, nên cần kiểm tra lại ràng buộc gốc tại nghiệm.

::: example Ví dụ 02.29 (Hình phạt chuẩn một không bảo đảm số đặc trưng)
Với bốn mẫu ở đầu mục và $\lambda=1$, chứng minh (6.2) có nghiệm duy nhất $w=(1,1)$, $b=0$, giá trị $2$.

**Bước 1 (cận cho từng cặp mẫu).** Mẫu $1$ và $2$ cho hai hạng bản lề $\max(0,\eta_1)+\max(0,\eta_2)$ với $\eta_1=1-w_1-b$ và $\eta_2=1-(-1)(-w_1+b)=1-w_1+b$, nên $\eta_1+\eta_2=2(1-w_1)$. Vì $\max(0,\eta)\ge0$ và $\max(0,\eta)\ge\eta$, tổng hai hạng không nhỏ hơn $\max(0,\eta_1+\eta_2)=2\max(0,1-w_1)$. Tương tự, mẫu $3$ và $4$ cho tổng không nhỏ hơn $2\max(0,1-w_2)$. Vậy

$$
H(w,b)+\lVert w\rVert_1\ge\sum_{j=1}^2\bigl[2\max(0,1-w_j)+\lvert w_j\rvert\bigr].
$$

**Bước 2 (cận cho từng tọa độ).** Với $s\in\mathbb R$:

- nếu $s<0$, $2(1-s)+(-s)=2-3s>2$;
- nếu $0\le s\le1$, $2(1-s)+s=2-s\ge1$, dấu bằng khi $s=1$;
- nếu $s>1$, $0+s>1$.

Vậy $2\max(0,1-s)+\lvert s\rvert\ge1$, dấu bằng khi và chỉ khi $s=1$. Mục tiêu $\ge2$, và mọi nghiệm (nếu cận đạt) có $w=(1,1)$.

**Bước 3 (đạt cận).** Với $w=(1,1)$: mẫu $1$ cho $\max(0,-b)$, mẫu $2$ cho $\max(0,b)$, tổng $\lvert b\rvert$; mẫu $3$, $4$ cũng cho $\lvert b\rvert$. Mục tiêu là $2\lvert b\rvert+2$, nhỏ nhất duy nhất tại $b=0$ với giá trị $2$.

**Kiểm tra lại.** Phương án $w=(1,0)$, $b=0$ dùng một đặc trưng: mẫu $1$, $2$ cho bản lề $0$, mẫu $3$, $4$ cho $\max(0,1-0)=1$ mỗi mẫu, nên $H=2$ và mục tiêu của (6.2) là $3>2$.

**Diễn giải.** Nghiệm của (6.2) dùng hai đặc trưng, vi phạm yêu cầu $k=1$ của (6.1).
:::

::: remark Nhận xét 02.46 (Kiểm tra ràng buộc gốc sau khi thay thế)
Ví dụ 02.29 bác bỏ mệnh đề "hình phạt chuẩn một với $\lambda>0$ bảo đảm số đặc trưng không vượt $k$". Hình phạt chỉ tạo xu hướng; số thành phần khác $0$ của nghiệm phải được đếm lại.

Nếu vượt $k$, có thể tăng $\lambda$, hoặc giữ $k$ đặc trưng có hệ số lớn nhất rồi giải lại; cả hai cách đều không bảo đảm tối ưu cho (6.1).

Tương đương giữa (6.2) và quy hoạch tuyến tính của nó là chính xác (Định lý 02.15); quan hệ giữa (6.2) và (6.1) thì không. Nguyên lý dùng chuẩn một thay phép đếm có trong Boyd và Vandenberghe (2004), mục 6.3.2, trang 306–310.
:::

**Trong học máy.** Ràng buộc số đặc trưng xuất hiện khi mô hình chạy trên thiết bị hạn chế tài nguyên hoặc cần dễ diễn giải; trong mạng sâu, phiên bản tương ứng là cắt tỉa (pruning) trọng số.

Mệnh đề 02.45 giải thích vì sao chọn đặc trưng chính xác không đưa được về một bài lồi duy nhất: lời giải chính xác cần liệt kê $\sum_{j\le k}\binom dj$ bài lồi. Ví dụ 02.29 giải thích vì sao mọi phương pháp thay thế phải được kiểm tra lại bằng phép đếm.

::: exercise Bài tập 02.10
Dùng bảng của Mục 6.1 để xếp lớp, sau các phép biến đổi cần thiết, cho mỗi bài toán sau; nêu phép biến đổi và kết quả được dùng.

(a) $\min_x\lVert Mx-g\rVert_\infty$ với $M\in\mathbb R^{k\times n}$, $g\in\mathbb R^k$.

(b) $\min_x\lVert Mx-g\rVert_2^2$ với $-\mathbf 1\preceq x\preceq\mathbf 1$.

(c) $\min_x x^Tx$ với $x^TQx\le4$, $Q=\operatorname{diag}(1,-4)$.

(d) $\max x_1x_2x_3$ với $x_1+x_2+x_3\le3$, $x\succ0$.
:::

::: hint
Với (c), thử hai điểm đối xứng trên biên. Với (d), dùng Mệnh đề 02.30(c).
:::

::: solution
**(a)** Quy hoạch tuyến tính sau khi thêm một biến phụ chung $t$: $\min t$ với $-t\mathbf 1\preceq Mx-g\preceq t\mathbf 1$ (Định lý 02.15(c)).

**(b)** Quy hoạch bậc hai với $P=2M^TM\succeq0$ và $2n$ ràng buộc tuyến tính; có nghiệm vì miền là hộp đóng, bị chặn (Định lý 01.36).

**(c)** Không lồi: $P_1=2Q$ không nửa xác định dương, và miền $\{x_1^2-4x_2^2\le4\}$ chứa $(4,\sqrt3)$, $(4,-\sqrt3)$ (vì $16-12=4$) nhưng không chứa trung điểm $(4,0)$ (vì $16>4$). Bài toán vẫn có nghiệm $x=0$, nhưng không thuộc lớp nào của bảng.

**(d)** Quy hoạch hình học: cực tiểu đơn thức $x_1^{-1}x_2^{-1}x_3^{-1}$ với $\tfrac13x_1+\tfrac13x_2+\tfrac13x_3\le1$. Dạng lồi theo Định lý 02.33 là $\min-(z_1+z_2+z_3)$ với $\log\sum_je^{z_j-\log3}\le0$. Nghiệm $x=(1,1,1)$, vì bất đẳng thức trung bình cộng – trung bình nhân cho $x_1x_2x_3\le(\tfrac13\sum x_j)^3\le1$.
:::

Chuỗi suy luận và kết quả của mục:

1. bảng nhận dạng gom Định nghĩa 02.9, 02.17, 02.24, 02.29, 02.1;
2. Thuật toán 02.1 sắp các công cụ cải dạng (Định lý 02.15, 02.33) và ba phép đổi bài toán thành quy trình;
3. Mệnh đề 02.45 đặt ràng buộc số đặc trưng vào bước 7, và Ví dụ 02.29 cho thấy bước 8 không bỏ được.

Quy trình mới chỉ được thử trên ví dụ nhỏ tính tay; phần sau áp dụng nó cho ba bài toán học máy có dữ liệu và yêu cầu triển khai cụ thể.

## Tình huống áp dụng và ứng dụng

Ba tình huống dưới đây được giải theo Thuật toán 02.1. Tình huống 02.3 là trường hợp một giả thiết không thỏa.

::: application Tình huống 02.1 (LASSO chọn thiết lập huấn luyện có ảnh hưởng)
**Bài toán và dữ liệu.** Một nhóm muốn biết ba thiết lập nào ảnh hưởng tới độ chính xác kiểm định của một mô hình phân loại ảnh: tăng cường dữ liệu ($x_1$), lịch tốc độ học ($x_2$), dropout ($x_3$). Mỗi thiết lập có hai mức, mã hóa $-1$ và $+1$. Nhóm chạy bốn lần huấn luyện theo một thiết kế thí nghiệm có các cột trực giao, và ghi mức thay đổi độ chính xác $y$ (điểm phần trăm) so với một cấu hình tham chiếu (số liệu giả lập sư phạm):

| Lần chạy | $x_1$ | $x_2$ | $x_3$ | $y$ |
|---|---:|---:|---:|---:|
| 1 | $+1$ | $+1$ | $+1$ | $3$ |
| 2 | $+1$ | $-1$ | $-1$ | $1{,}5$ |
| 3 | $-1$ | $+1$ | $-1$ | $-1{,}5$ |
| 4 | $-1$ | $-1$ | $+1$ | $-2$ |

Mô hình $\hat y=b+w_1x_1+w_2x_2+w_3x_3$ có bốn tham số cho bốn quan sát, nên bình phương nhỏ nhất khớp chính xác mà không chọn ra thiết lập nào.

**Mô hình hóa.** Gọi $X\in\mathbb R^{4\times3}$ là ma trận ba cột $x_1,x_2,x_3$ và $\mathbf 1\in\mathbb R^4$. LASSO với hệ số chặn không bị phạt (bước 1 của Thuật toán 02.1):

$$
\underset{b\in\mathbb R,\ w\in\mathbb R^3}{\operatorname{minimize}}\quad\lVert y-b\mathbf 1-Xw\rVert_2^2+\lambda\lVert w\rVert_1,\qquad\lambda>0 .
$$

**Xác minh giả thiết: tính lồi và lớp bài toán.** Mục tiêu lồi: bình phương chuẩn của một hàm affine cộng một chuẩn với hệ số dương (Định lý 01.31). Theo Định lý 02.15 (bước 4), thêm $v\in\mathbb R^3$ với $-v\preceq w\preceq v$ cho quy hoạch bậc hai với mục tiêu $\lVert y-b\mathbf 1-Xw\rVert_2^2+\lambda\mathbf 1^Tv$, như Mệnh đề 02.21(a).

**Xác minh giả thiết: tách biến nhờ trực giao.** Các cột $\mathbf 1,x_1,x_2,x_3$ đôi một trực giao, mỗi cột có bình phương chuẩn $4$. Kiểm tra trực tiếp, $y=\tfrac14\mathbf 1+2x_1+\tfrac12x_2+\tfrac14x_3$; chẳng hạn lần chạy $2$ cho $\tfrac14+2-\tfrac12-\tfrac14=1{,}5$. Do đó $y-b\mathbf 1-Xw=(\tfrac14-b)\mathbf 1+X(c-w)$ với $c=(2,\tfrac12,\tfrac14)$, và theo tính trực giao,

$$
\lVert y-b\mathbf 1-Xw\rVert_2^2+\lambda\lVert w\rVert_1=4\bigl(b-\tfrac14\bigr)^2+\sum_{j=1}^3\Bigl[4(w_j-c_j)^2+\lambda\lvert w_j\rvert\Bigr].
$$

Mục tiêu là tổng của bốn hàm một biến, mỗi hàm có đúng một điểm cực tiểu (parabol cho $b$, Bổ đề 02.22 cho $w_j$), nên bài toán có đúng một nghiệm.

**Áp dụng.** Bổ đề 02.22 với $\alpha=4$, $m=c_j$ cho $w_j=\max(c_j-\lambda/8,0)$, và $b=\tfrac14$.

| $\lambda$ | $w_1$ | $w_2$ | $w_3$ | Số thiết lập giữ lại |
|---:|---:|---:|---:|---:|
| $0$ (bình phương nhỏ nhất) | $2$ | $0{,}5$ | $0{,}25$ | $3$ |
| $1$ | $1{,}875$ | $0{,}375$ | $0{,}125$ | $3$ |
| $2$ | $1{,}75$ | $0{,}25$ | $0$ | $2$ |
| $4$ | $1{,}5$ | $0$ | $0$ | $1$ |

Với $\lambda=4$, giá trị mục tiêu là

$$
4(0{,}25+0{,}25+0{,}0625)+4\cdot1{,}5=2{,}25+6=8{,}25,
$$

và dự đoán là $\hat y=0{,}25+1{,}5x_1$, tức $1{,}75$ cho hai lần chạy có tăng cường dữ liệu và $-1{,}25$ cho hai lần chạy không có.

**Kiểm tra lại.** Với $\lambda=4$, đạo hàm của phần theo $w_1$ tại $1{,}5$ là $8(1{,}5-2)+4=0$; các phần theo $w_2$, $w_3$ có $\lvert m\rvert\le\lambda/8=0{,}5$, nên bằng $0$. Nghiệm bình phương nhỏ nhất cho mục tiêu LASSO là $4\cdot2{,}75=11>8{,}25$.

**Diễn giải.** Với $\lambda=4$, chỉ tăng cường dữ liệu được giữ: bật nó ước tính tăng $2\cdot1{,}5=3$ điểm phần trăm. Hai thiết lập còn lại có hiệu ứng nhỏ hơn ngưỡng $\lambda/8$ và bị đặt bằng $0$. Hiệu ứng được giữ bị thu nhỏ từ $2$ xuống $1{,}5$, cái giá của hình phạt.

**Giới hạn.** Công thức đóng chỉ có nhờ thiết kế trực giao. Bốn lần chạy không đủ để chọn $\lambda$ bằng kiểm định chéo (cross-validation).

Cột $x_3$ bằng tích từng thành phần của $x_1$ và $x_2$, nên hiệu ứng của dropout không tách được khỏi tương tác của hai thiết lập kia. LASSO không sửa được giới hạn của thiết kế thí nghiệm.

**Dẫn ngược lý thuyết.** Định nghĩa 02.20; Định lý 02.15 và Mệnh đề 02.21(a) cho dạng quy hoạch bậc hai (bước 4, 6); Bổ đề 02.22, với giả thiết tách được ứng với tính trực giao của các cột; Nhận xét 02.23.
:::

::: application Tình huống 02.2 (Máy vector hỗ trợ lề mềm trên một đặc trưng)
**Bài toán và dữ liệu.** Mỗi khung hình có một điểm đặc trưng chuẩn hóa $u$. Bốn khung hình có nhãn: $u=-2$ và $u=-1$ không có vật thể ($y=-1$), $u=1$ và $u=2$ có vật thể ($y=+1$) (số liệu minh họa). Cần một bộ phân loại $\operatorname{sign}(wu+b)$ và cần biết hệ số chính quy hóa $\lambda$ ảnh hưởng tới nghiệm thế nào.

**Mô hình hóa.** Máy vector hỗ trợ lề mềm (5.1) với $d=1$:

$$
J(w,b)=\frac\lambda2w^2+\sum_{i=1}^4\max\bigl(0,\ 1-y_i(wu_i+b)\bigr).
$$

**Xác minh giả thiết.** Theo Mệnh đề 02.39 với $\lambda>0$ và dữ liệu có cả hai nhãn: bài toán là quy hoạch bậc hai lồi, có nghiệm, và $w$ của nghiệm duy nhất (bước 6 của Thuật toán 02.1).

**Áp dụng: rút gọn theo đối xứng.** Phép đổi $(u,y)\mapsto(-u,-y)$ hoán vị bốn mẫu. Hạng bản lề của mẫu $(-u,-y)$ tại $(w,b)$ là $\max(0,1+y(-wu+b))=\max(0,1-y(wu-b))$, hạng của mẫu $(u,y)$ tại $(w,-b)$. Vậy $J(w,b)=J(w,-b)$. Vì $J$ lồi,

$$
J(w,0)\le\tfrac12J(w,b)+\tfrac12J(w,-b)=J(w,b),
$$

nên chỉ cần cực tiểu $J(w,0)=\tfrac\lambda2w^2+2\max(0,1-w)+2\max(0,1-2w)$ theo $w$. Hàm này bằng

- $\tfrac\lambda2w^2-6w+4$ khi $w\le\tfrac12$;
- $\tfrac\lambda2w^2-2w+2$ khi $\tfrac12\le w\le1$;
- $\tfrac\lambda2w^2$ khi $w\ge1$.

**Áp dụng: hai giá trị $\lambda$.**

- Với $\lambda=1$: đạo hàm trên ba khúc là $w-6<0$, $w-2<0$ và $w>0$, nên $J(\cdot,0)$ giảm tới $w=1$ rồi tăng. Nghiệm $w^*=1$, $J=\tfrac12$.
- Với $\lambda=4$: đạo hàm $4w-6<0$ trên khúc đầu, $4w-2\ge0$ trên khúc giữa (bằng $0$ tại $w=\tfrac12$), $4w>0$ trên khúc cuối. Nghiệm $w^*=\tfrac12$, $J=\tfrac12+2\cdot\tfrac12=\tfrac32$.

**Áp dụng: hệ số chặn duy nhất.**

- Với $\lambda=1$, $w=1$: tổng bản lề là $\max(0,-b)+\max(0,b)+\max(0,-1-b)+\max(0,b-1)\ge\lvert b\rvert$, bằng $0$ chỉ khi $b=0$.
- Với $\lambda=4$, $w=\tfrac12$: hai mẫu $u=\pm1$ cho $\max(0,\tfrac12-b)+\max(0,\tfrac12+b)\ge1$, hai mẫu $u=\pm2$ cho $\max(0,-b)+\max(0,b)=\lvert b\rvert$. Tổng $\ge1+\lvert b\rvert$, bằng $1$ chỉ khi $b=0$.

Trong cả hai trường hợp, $b^*=0$.

**Kiểm tra lại.**

- Với $\lambda=1$: $J(0{,}9;0)=0{,}405+0{,}2+0=0{,}605$ và $J(1{,}1;0)=0{,}605$, đều lớn hơn $0{,}5$.
- Với $\lambda=4$: $J(0{,}4;0)=0{,}32+1{,}2+0{,}4=1{,}92$ và $J(0{,}6;0)=0{,}72+0{,}8=1{,}52$, đều lớn hơn $1{,}5$.

**Diễn giải.** Cả hai nghiệm cho bộ phân loại $\operatorname{sign}(u)$, đúng cả bốn khung hình. Khác nhau ở lề.

- Với $\lambda=1$, các mặt $wu+b=\pm1$ nằm tại $u=\pm1$ và tổng bản lề bằng $0$.
- Với $\lambda=4$, chúng nằm tại $u=\pm2$, lề rộng gấp đôi, và hai khung hình $u=\pm1$ nằm trong lề với vi phạm $\tfrac12$ mỗi khung.

Hệ số $\lambda$ lớn hơn đổi tổng vi phạm lấy lề rộng hơn.

**Giới hạn.** Lời giải tay dựa vào tính đối xứng của dữ liệu. Với dữ liệu tổng quát và $d$ lớn, cần một bộ giải quy hoạch bậc hai; cách giải qua bài toán đối ngẫu nằm ngoài phạm vi học phần.

**Dẫn ngược lý thuyết.** Định nghĩa 02.38; Mệnh đề 02.39, với giả thiết hai nhãn dùng để chặn $b$; tính lồi theo (7.1) của Bài 01 cho phép rút gọn đối xứng; Mệnh đề 02.36(b).
:::

::: application Tình huống 02.3 (Chọn dữ liệu để gán nhãn: nới lỏng cho nghiệm không nguyên)
**Bài toán và dữ liệu.** Một nhóm có ngân sách $6$ triệu đồng để thuê gán nhãn ba tập dữ liệu chưa gán nhãn. Mỗi tập phải được gán nhãn trọn vẹn hoặc bỏ qua. Ước lượng số mẫu hữu ích (nghìn mẫu) và chi phí (triệu đồng) như sau (số liệu giả lập sư phạm):

| Tập | Số mẫu hữu ích | Chi phí | Tỷ số |
|---|---:|---:|---:|
| A | $8$ | $4$ | $2$ |
| B | $5$ | $3$ | $\tfrac53$ |
| C | $5$ | $3$ | $\tfrac53$ |

**Mô hình hóa.** Với $x_j\in\{0,1\}$ cho quyết định chọn tập $j$, bài toán là $\max\ 8x_A+5x_B+5x_C$ với $4x_A+3x_B+3x_C\le6$, một bài toán ba lô (knapsack) nhị phân. Tập khả thi không lồi, nên theo bước 7 của Thuật toán 02.1, ta dùng nới lỏng tuyến tính $0\le x_j\le1$.

**Xác minh giả thiết.** Nới lỏng có cùng mục tiêu và miền chứa miền nhị phân, nên Mệnh đề 02.42 áp dụng, với chiều cận đảo lại cho bài cực đại. Giả thiết của Mệnh đề 02.42(c), nghiệm nới lỏng là nhị phân, bị vi phạm như phần sau cho thấy.

**Áp dụng: giải nới lỏng.** Với mọi $x$ khả thi của nới lỏng,

$$
\begin{aligned}
8x_A+5x_B+5x_C&=\tfrac53\bigl(4x_A+3x_B+3x_C\bigr)+\tfrac43x_A\\
&\le\tfrac53\cdot6+\tfrac43\cdot1\\
&=\tfrac{34}3,
\end{aligned}
$$

dùng ràng buộc ngân sách với hệ số $\tfrac53\ge0$ và $x_A\le1$ với hệ số $\tfrac43\ge0$, như Mệnh đề 02.11 với chiều bất đẳng thức đảo. Điểm $\tilde x=(1,\tfrac23,0)$ khả thi (chi phí $4+2=6$) và đạt $8+\tfrac{10}3=\tfrac{34}3\approx11{,}33$, nên là nghiệm của nới lỏng. Nghiệm này không nhị phân.

**Áp dụng: khôi phục phương án.**

- Làm tròn xuống cho $(1,0,0)$: chi phí $4$, giá trị $8$.
- Làm tròn lên cho $(1,1,0)$: chi phí $7>6$, không khả thi.

Liệt kê tám phương án nhị phân:

- $\{A\}$ cho $8$;
- $\{B\}$, $\{C\}$ cho $5$;
- $\{B,C\}$ cho $10$ với chi phí $6$;
- mọi tập chứa $A$ và một tập khác có chi phí ít nhất $7$, không khả thi.

Giá trị tối ưu $p^*=10$, đạt tại $\{B,C\}$.

**Kiểm tra lại.** Theo Mệnh đề 02.42(d) cho bài cực đại, $8\le p^*\le\tfrac{34}3$; vì giá trị nhị phân là số nguyên, $p^*\le11$. Liệt kê cho $p^*=10$, nằm trong khoảng đó.

**Hậu quả của giả thiết bị vi phạm.** Nghiệm nới lỏng không nguyên nên không cho nghiệm bài gốc.

- Phương án làm tròn xuống, trùng với quy tắc tham lam theo tỷ số, cho $8$ nghìn mẫu, ít hơn tối ưu $20\%$.
- Phương án tối ưu $\{B,C\}$ không chứa tập A, tập có trọng số $1$ trong nghiệm nới lỏng: thông tin đọc từ nghiệm phân số dẫn sai hướng.

Cận $\tfrac{34}3$ vẫn đúng, nhưng chứng nhận $p^*=10$ cần liệt kê hoặc quy hoạch động cho bài ba lô. Khi chi phí là số nguyên, quy hoạch động cần $O(nK)$ phép tính với $n$ tập và ngân sách $K$ (Bertsimas, MIT 15.093J, Bài giảng 16, mục 2, trang 1).

**Diễn giải.** Gán nhãn hai tập B và C cho $10$ nghìn mẫu hữu ích và dùng hết ngân sách; chọn tập A để lại $2$ triệu đồng không dùng được.

**Giới hạn.** Số mẫu hữu ích là ước lượng, và phương án tối ưu đổi khi ước lượng đổi. Với hàng trăm tập, liệt kê không khả thi; phương pháp nhánh – cận dùng cận nới lỏng của Mệnh đề 02.42 để cắt bớt không gian tìm kiếm.

**Dẫn ngược lý thuyết.** Định nghĩa 02.41; Mệnh đề 02.42 cho cận trên, phần (c) không áp dụng vì nghiệm không nhị phân; Mệnh đề 02.11 chứng nhận nghiệm nới lỏng; Nhận xét 02.43.
:::

Các khái niệm của chương xuất hiện trong học máy ở những chỗ sau.

- **Hồi quy bền vững.** Hồi quy sai số tuyệt đối, minimax và hồi quy phân vị (quantile regression) là quy hoạch tuyến tính (Định lý 02.15).
- **Chính quy hóa.** Ridge là quy hoạch bậc hai với $P\succ0$ (Mệnh đề 02.21), và Bổ đề 02.22 là bước cập nhật của thuật toán gradient gần kề (proximal gradient) cho LASSO.
- **Máy vector hỗ trợ.** Lề mềm là quy hoạch bậc hai (Mệnh đề 02.39).
- **Softmax và phân bổ tính toán.** Định lý 02.32 cho tính lồi của hồi quy logistic đa lớp, và luật tỷ lệ dạng tổng đơn thức dương cho quy hoạch hình học (Ví dụ 02.23).
- **Công bằng giữa các nhóm.** Cực tiểu lỗi của nhóm chịu thiệt nhất là quy hoạch tuyến tính (Bài tập 02.17).
- **Chọn dữ liệu, chọn đặc trưng.** Nới lỏng cho cận (Tình huống 02.3); giới hạn số đặc trưng có miền không lồi (Mệnh đề 02.45).

## Tóm tắt chương

**Định nghĩa.** Bài toán tối ưu lồi dạng chuẩn (Định nghĩa 02.1); cải dạng tương đương (Định nghĩa 02.5); quy hoạch tuyến tính, dạng bất đẳng thức và dạng chuẩn (Định nghĩa 02.9); hồi quy sai số tuyệt đối và hồi quy minimax (Định nghĩa 02.13); quy hoạch bậc hai (Định nghĩa 02.17); hồi quy có chính quy hóa, bốn tổ hợp (Định nghĩa 02.20); QCQP (Định nghĩa 02.24); đơn thức và tổng đơn thức dương (Định nghĩa 02.28); quy hoạch hình học (Định nghĩa 02.29); hàm thay thế lồi và mất mát bản lề (Định nghĩa 02.35); máy vector hỗ trợ lề mềm (Định nghĩa 02.38); nới lỏng (Định nghĩa 02.41); ràng buộc số đặc trưng (Định nghĩa 02.44).

**Kết quả.** Tập khả thi của dạng chuẩn lồi (Mệnh đề 02.2); các bảo đảm của tính lồi (Hệ quả 02.3); cải dạng tương đương giữ nghiệm (Mệnh đề 02.6); quy hoạch tuyến tính lồi và dạng chuẩn (Mệnh đề 02.10); cận dưới từ tổ hợp không âm các ràng buộc (Mệnh đề 02.11); chặn trên một cực đại (Bổ đề 02.14) và cải dạng bằng biến phụ (Định lý 02.15); tồn tại và duy nhất cho quy hoạch bậc hai (Mệnh đề 02.18); phân lớp bốn tổ hợp chính quy hóa (Mệnh đề 02.21); ngưỡng mềm (Bổ đề 02.22); tính lồi của QCQP (Mệnh đề 02.25); từ hình phạt tới trần (Mệnh đề 02.26); quy tắc chuẩn hóa quy hoạch hình học (Mệnh đề 02.30); đổi biến logarit (Bổ đề 02.31); hàm log-sum-exp lồi (Định lý 02.32); dạng lồi của quy hoạch hình học (Định lý 02.33); bảo đảm của hàm thay thế (Mệnh đề 02.36); máy vector hỗ trợ là quy hoạch bậc hai (Mệnh đề 02.39); cận từ nới lỏng (Mệnh đề 02.42); miền giới hạn số đặc trưng không lồi (Mệnh đề 02.45); quy trình nhận dạng (Thuật toán 02.1).

**Công thức cần nhớ.**

$$
\min c^Tx\ \ \text{subject to}\ Gx\preceq h,\ Ax=b;
$$

$$
\min\tfrac12x^TPx+q^Tx+s\ \ \text{subject to}\ Gx\preceq h,\ Ax=b,\ P\succeq0;
$$

$$
t\ge\lvert r\rvert\iff t\ge r,\ t\ge-r;\qquad s^*=\operatorname{sign}(m)\max\Bigl(\lvert m\rvert-\frac\lambda{2\alpha},0\Bigr);
$$

$$
\nabla^2\log\sum_ke^{\alpha_k^Tz+\beta_k}=\sum_k\pi_k(\alpha_k-\bar\alpha)(\alpha_k-\bar\alpha)^T;
$$

$$
\operatorname{err}\le H,\qquad p^*_{\tilde F}\le p^*_F\le f(\hat x)\ \ (\hat x\in F).
$$

Các dòng lần lượt là:

1. quy hoạch tuyến tính;
2. quy hoạch bậc hai;
3. biến phụ và ngưỡng mềm của LASSO;
4. Hessian của log-sum-exp;
5. hai bảo đảm một chiều của hàm thay thế và của nới lỏng.

**Giả thiết hay bị bỏ quên.**

- Dạng chuẩn đòi "hàm lồi $\le0$" và đẳng thức affine (Nhận xét 02.4).
- Tính lồi không bảo đảm có nghiệm (Nhận xét 02.8).
- Biến phụ chỉ dùng cho bài cực tiểu với hệ số không âm (Nhận xét 02.16).
- Quy hoạch bậc hai và QCQP cần mọi $P_i\succeq0$.
- Quy hoạch hình học cần biến và hệ số dương (Nhận xét 02.34).
- Thay mất mát, thay ràng buộc bằng hình phạt và nới lỏng đều đổi bài toán (Nhận xét 02.43).

**Chuỗi suy luận của toàn chương.**

1. Định nghĩa 02.1 và Mệnh đề 02.2 biến việc chứng nhận tính lồi thành kiểm tra từng dòng.
2. Hệ quả 02.3 chuyển các kết quả của Bài 01 sang dạng chuẩn, và Mệnh đề 02.6 cùng Nhận xét 02.7 cho phép cải dạng qua ánh xạ tường minh.
3. Trên nền đó, Mệnh đề 02.11 và Định lý 02.15 xử lý quy hoạch tuyến tính, Mệnh đề 02.18 và 02.21 xử lý quy hoạch bậc hai và chính quy hóa, Định lý 02.32 và 02.33 đưa quy hoạch hình học về bài lồi.
4. Khi không có cải dạng tương đương, Mệnh đề 02.36 và 02.42 cho bài lồi kèm bảo đảm một chiều, và Thuật toán 02.1 gom mọi bước thành một quy trình có bước kiểm tra lại bắt buộc.

**Giới hạn còn lại và bài sau.** Nghiệm trong chương được chứng nhận bằng lập luận riêng cho từng ví dụ: tổ hợp không âm các ràng buộc, điều kiện (1.2), bất đẳng thức trung bình cộng – trung bình nhân. Hai câu hỏi còn mở:

- tìm có hệ thống các hệ số $\mu$ của Mệnh đề 02.11 và biết khi nào chúng tồn tại;
- thay (1.2) bằng một điều kiện kiểm tra được khi tập khả thi phức tạp.

Bài 03 (Đối ngẫu Lagrange và điều kiện tối ưu) trả lời cả hai bằng hàm Lagrange, bài toán đối ngẫu, đối ngẫu mạnh dưới điều kiện Slater và điều kiện Karush–Kuhn–Tucker (KKT). Bài 04 xây phương pháp Newton để tìm nghiệm khi không có công thức đóng; Bài 07 trình bày phương pháp đơn hình cho quy hoạch tuyến tính.

## Bài tập củng cố

Bảng sau ánh xạ các bài tập của chương, cả bài tập trong mục và bài tập củng cố, tới sáu mục tiêu học tập. Các bài dưới đây không trùng đề và không dùng chung dữ liệu với bộ bài giao chính thức trong tệp bài tập của Bài 02.

| Mục tiêu | Bài tập trong mục | Bài tập củng cố |
|---|---|---|
| 1. Nhận biết bài toán lồi | 02.1, 02.2 | 02.11 |
| 2. Quy hoạch tuyến tính và biến phụ | 02.3, 02.4 | 02.12, 02.15, 02.17 |
| 3. Quy hoạch bậc hai, QCQP, chính quy hóa | 02.5, 02.6 | 02.13, 02.14 |
| 4. Quy hoạch hình học | 02.7 | 02.16 |
| 5. Hàm thay thế và nới lỏng | 02.8, 02.9 | 02.11, 02.13 |
| 6. Vận dụng vào mô hình học máy | 02.10 | 02.14, 02.15, 02.16, 02.17 |

### Mức nhận biết

::: exercise Bài tập 02.11 (Nhận biết: đúng hay sai)
Xác định mỗi khẳng định đúng hay sai, và nêu căn cứ hoặc phản ví dụ.

(a) Nếu $f_0$ và mọi $f_i$ lồi thì bài toán $\min f_0(x)$ với $f_i(x)\ge0$ là bài toán lồi.

(b) Mọi quy hoạch tuyến tính có tập khả thi không rỗng đều có nghiệm.

(c) Nếu nghiệm của nới lỏng tuyến tính của một bài nhị phân là vector nhị phân thì nó là nghiệm của bài nhị phân.

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
- **(d) Sai.** Hessian $\begin{bmatrix}0&1\\1&0\end{bmatrix}$ có giá trị riêng $-1$. Trực tiếp, với $x=(1,3)$, $y=(3,1)$, $\theta=\tfrac12$, giá trị tại trung điểm $(2,2)$ là $4>\tfrac12(3+3)=3$. Sau đổi biến logarit, $x_1x_2=e^{z_1+z_2}$ lồi theo $z$.
- **(e) Đúng**, theo Mệnh đề 02.36(b): $0\le\operatorname{err}\le H=0$.
:::

::: exercise Bài tập 02.12 (Nhận biết: kiểm tra một cải dạng sai)
Một người lập mô hình đưa ra hai cải dạng.

(i) Hồi quy không hệ số chặn $\hat y=au$ với dữ liệu $u=(0,1)$, $y=(0,2)$ và mục tiêu $\sum_i\lvert au_i-y_i\rvert$ được viết thành $\min_{a,t}t_1+t_2$ với $t_i\ge au_i-y_i$.

(ii) Bài $\min_{-1\le x\le1}x^2-\lvert x\rvert$ được viết thành $\min_{x,t}x^2-t$ với $t\ge x$, $t\ge-x$, $-1\le x\le1$.

(a) Giải hai bài gốc. (b) Chỉ ra hai bài cải dạng không bị chặn. (c) Với mỗi trường hợp, chỉ ra dòng nào của bảng kiểm ở Mục 6.1 bị vi phạm và sửa lại.
:::

::: hint
Ở (i), cho $a\to-\infty$. Ở (ii), $t$ không bị chặn trên.
:::

::: solution
**(a) Giải hai bài gốc.**

- (i) Mục tiêu $\lvert0\rvert+\lvert a-2\rvert$, nhỏ nhất tại $a=2$ với giá trị $0$.
- (ii) Với $s=\lvert x\rvert\in[0,1]$, mục tiêu là $s^2-s$, nhỏ nhất tại $s=\tfrac12$; giá trị $-\tfrac14$, đạt tại $x=\pm\tfrac12$.

**(b) Hai bài cải dạng không bị chặn.**

- (i) Với $a=-M$, chọn $t_1=0$, $t_2=-M-2$: khả thi và $t_1+t_2=-M-2\to-\infty$.
- (ii) Với $x=0$ và $t=M$, mọi ràng buộc thỏa và mục tiêu $-M\to-\infty$.

**(c) Sửa (i).** Cải dạng (i) vi phạm điều kiện "đủ mọi nhánh của cực đại": cần thêm $t_i\ge y_i-au_i$. Khi đó bài là $\min t_1+t_2$ với $\lvert0\rvert\le t_1$, $\lvert a-2\rvert\le t_2$, giá trị $0$ tại $a=2$.

**(c) Sửa (ii).** Cải dạng (ii) vi phạm điều kiện "mọi hệ số trước cực đại không âm": $-\lvert x\rvert=-\max(x,-x)$ có hệ số $-1$, và mục tiêu gốc không lồi. Sửa bằng cách tách hai trường hợp $0\le x\le1$ và $-1\le x\le0$. Mỗi trường hợp là quy hoạch bậc hai lồi ($\min x^2-x$, $\min x^2+x$) với nghiệm $\tfrac12$, $-\tfrac12$, giá trị $-\tfrac14$.
:::

### Mức tính toán hoặc chứng minh

::: exercise Bài tập 02.13 (Chứng minh: máy vector hỗ trợ với bản lề bình phương)
Cho $\ell(r)=\max(0,1-r)^2$.

(a) Chứng minh $\ell$ lồi và là hàm thay thế của $\ell_{01}$.

(b) Chứng minh bài toán $\min_{w,b}\tfrac\lambda2\lVert w\rVert_2^2+\sum_i\ell(y_i(w^Tu_i+b))$ tương đương với quy hoạch bậc hai $\min\tfrac\lambda2w^Tw+\sum_i\xi_i^2$ với $\xi_i\ge1-y_i(w^Tu_i+b)$, $\xi_i\ge0$, và chỉ ra ma trận $P$.
:::

::: hint
Nếu $g\ge0$ lồi thì $g^2$ lồi: bình phương hai vế không âm của (7.1) rồi dùng tính lồi của $s\mapsto s^2$.
:::

::: solution
**(a) Tính lồi.** Đặt $g(r)=\max(0,1-r)$, lồi và không âm. Với $\theta\in[0,1]$ và $z=\theta x+(1-\theta)y$: $0\le g(z)\le\theta g(x)+(1-\theta)g(y)$. Vì $s\mapsto s^2$ tăng trên $[0,\infty)$,

$$
\begin{aligned}
g(z)^2&\le(\theta g(x)+(1-\theta)g(y))^2\\
&\le\theta g(x)^2+(1-\theta)g(y)^2,
\end{aligned}
$$

bước cuối dùng tính lồi của $s^2$ (Ví dụ 01.11(a) của Bài 01).

**(a) Nằm trên $\ell_{01}$.**

- Nếu $r\le0$ thì $g(r)\ge1$ và $\ell(r)\ge1$.
- Nếu $r>0$ thì $\ell(r)\ge0$.

**(b) Hai chiều của (1.3).** Dùng Mệnh đề 02.6 với $T(s)=s$. Đặt $m_i=y_i(w^Tu_i+b)$.

- Ánh xạ $\varphi(w,b)=(w,b,\xi)$ với $\xi_i=\max(0,1-m_i)$ cho điểm khả thi với cùng giá trị.
- Ngược lại, nếu $(w,b,\xi)$ khả thi thì $\xi_i\ge\max(0,1-m_i)\ge0$, và vì bình phương tăng trên $[0,\infty)$, $\xi_i^2\ge\ell(m_i)$. Vậy giá trị của bài gốc tại $\psi(w,b,\xi)=(w,b)$ không lớn hơn.

**(b) Lớp bài toán.** Theo thứ tự $(w,b,\xi)$, $P=\operatorname{diag}(\lambda I_d,0,2I_N)\succeq0$ và các ràng buộc affine: quy hoạch bậc hai. Khác với bản lề thường, $\ell$ khả vi tại $r=1$.
:::

::: exercise Bài tập 02.14 (Tính toán: đường đi nghiệm của LASSO)
Với dữ liệu của Tình huống 02.1:

(a) xác định các khoảng của $\lambda>0$ ứng với mô hình giữ lại $3$, $2$, $1$ và $0$ thiết lập;

(b) giải hồi quy ridge (hình phạt $\lambda\lVert w\rVert_2^2$, hệ số chặn không phạt) với $\lambda=4$ và so sánh số hệ số khác $0$ với LASSO cùng $\lambda$.
:::

::: hint
Theo Tình huống 02.1, $w_j=\max(c_j-\lambda/8,0)$ với $c=(2,\tfrac12,\tfrac14)$. Với ridge, mỗi tọa độ cực tiểu $4(w_j-c_j)^2+\lambda w_j^2$.
:::

::: solution
**(a) Ngưỡng.** $w_j=0$ khi và chỉ khi $\lambda\ge8c_j$, tức $\lambda\ge16$, $\lambda\ge4$, $\lambda\ge2$ lần lượt cho $j=1,2,3$. Vậy:

- giữ $3$ thiết lập khi $0<\lambda<2$;
- giữ $2$ khi $2\le\lambda<4$;
- giữ $1$ khi $4\le\lambda<16$;
- giữ $0$ khi $\lambda\ge16$.

**(b) Ridge.** Đạo hàm $8(w_j-c_j)+2\lambda w_j=0$ cho $w_j=\tfrac{4c_j}{4+\lambda}=\tfrac{c_j}2$ khi $\lambda=4$: $w=(1;\ 0{,}25;\ 0{,}125)$, $b=\tfrac14$.

**(b) So sánh.** Ridge thu nhỏ mọi hệ số theo cùng tỷ lệ và giữ cả ba thiết lập; LASSO cùng $\lambda=4$ giữ một thiết lập. Hai mô hình có cùng $\lambda$ nhưng hình phạt khác nhau nên $\lambda$ không có cùng ý nghĩa.
:::

### Mức vận dụng vào AI

::: exercise Bài tập 02.15 (Vận dụng: hồi quy với một ngoại lai)
Bốn quan sát $u=(0,1,2,3)$, $y=(0,1,2,9)$; quan sát cuối bị ghi sai. Mô hình $\hat y=au+b$.

(a) Giải bình phương nhỏ nhất.

(b) Chứng minh $w=(1,0)$ là nghiệm của hồi quy sai số tuyệt đối với giá trị $6$, bằng chứng nhận $\sum_i\lvert r_i\rvert\ge\sum_i\nu_ir_i$ với $\nu=(-1,1,1,-1)$, $\lvert\nu_i\rvert\le1$.

(c) So sánh dự đoán tại $u=2$ của hai mô hình.
:::

::: hint
Kiểm tra $\sum_i\nu_i=0$ và $\sum_i\nu_iu_i=0$; khi đó $\sum_i\nu_ir_i$ không phụ thuộc $(a,b)$.
:::

::: solution
**(a) Các tổng.** $\sum u_i=6$, $\sum u_i^2=14$, $\sum y_i=12$, $\sum u_iy_i=0+1+4+27=32$.

**(a) Giải.** Phương trình chuẩn $14a+6b=32$, $6a+4b=12$ cho $b=3-\tfrac32a$, $14a+18-9a=32$, $a=\tfrac{14}5=2{,}8$, $b=-1{,}2$. Phần dư $(-1{,}2;\ 0{,}6;\ 2{,}4;\ -1{,}8)$, và

$$
E=1{,}44+0{,}36+5{,}76+3{,}24=10{,}8 .
$$

**(b) Cận dưới.** Với $\lvert\nu_i\rvert\le1$, $\lvert r_i\rvert\ge\nu_ir_i$. Với $\nu=(-1,1,1,-1)$: $\sum\nu_i=0$, $\sum\nu_iu_i=0+1+2-3=0$, nên

$$
\sum_i\nu_ir_i=a\sum\nu_iu_i+b\sum\nu_i-\sum\nu_iy_i=-(0+1+2-9)=6 .
$$

Vậy $\sum\lvert r_i\rvert\ge6$ với mọi $(a,b)$.

**(b) Cận đạt.** $w=(1,0)$ cho $r=(0,0,0,-6)$, tổng $6$. Đây là một chứng nhận kiểu Mệnh đề 02.11 cho quy hoạch tuyến tính của Định lý 02.15.

**(c) So sánh.** Bình phương nhỏ nhất dự đoán $2{,}8\cdot2-1{,}2=4{,}4$, còn nghiệm $(1,0)$ của hồi quy sai số tuyệt đối dự đoán $2$, đúng với quan sát. Nghiệm sai số tuyệt đối không duy nhất ở đây: $(\tfrac{17}6,-\tfrac53)$ cũng cho tổng $6$.
:::

::: exercise Bài tập 02.16 (Vận dụng: luật tỷ lệ với số mũ một)
Với $\mathcal A,\mathcal B,K>0$, xét $\min\mathcal A/N_p+\mathcal B/N_d$ với $N_pN_d\le K$, $N_p,N_d>0$.

(a) Viết dạng lồi theo Định lý 02.33.

(b) Chứng minh nghiệm là $N_p^*=\sqrt{\mathcal AK/\mathcal B}$, $N_d^*=\sqrt{\mathcal BK/\mathcal A}$, giá trị $2\sqrt{\mathcal A\mathcal B/K}$.

(c) Với $\mathcal A=4$, $\mathcal B=1$, $K=16$, tính nghiệm và so với chia đều $N_p=N_d=4$.
:::

::: hint
Ràng buộc chặt tại nghiệm; thay $N_d=K/N_p$ và đặt $z=\log N_p$.
:::

::: solution
**(a)** Với $z_1=\log N_p$, $z_2=\log N_d$: $\min\log(\mathcal Ae^{-z_1}+\mathcal Be^{-z_2})$ với $z_1+z_2\le\log K$. Mục tiêu lồi (Định lý 02.32), ràng buộc tuyến tính.

**(b) Ràng buộc chặt.** Nếu $N_pN_d<K$, tăng $N_p$ làm mục tiêu giảm chặt mà vẫn khả thi, nên tại nghiệm $N_d=K/N_p$.

**(b) Tính.** Mục tiêu theo $z=\log N_p$ là $\phi(z)=\mathcal Ae^{-z}+(\mathcal B/K)e^z$, với $\phi''>0$. Ta có

$$
\phi'(z)=-\mathcal Ae^{-z}+(\mathcal B/K)e^z=0
$$

cho $e^{2z}=\mathcal AK/\mathcal B$. Vậy $N_p^*=\sqrt{\mathcal AK/\mathcal B}$, $N_d^*=K/N_p^*=\sqrt{\mathcal BK/\mathcal A}$, và hai hạng của mục tiêu bằng nhau, mỗi hạng $\sqrt{\mathcal A\mathcal B/K}$.

**(c)** $N_p^*=8$, $N_d^*=2$, giá trị $\tfrac48+\tfrac12=1$; chia đều cho $1+\tfrac14=1{,}25$.
:::

::: exercise Bài tập 02.17 (Vận dụng: tối thiểu hóa mất mát của nhóm chịu thiệt nhất)
Hai mô hình phân loại có tỷ lệ lỗi trên nhóm người dùng A và B như sau: mô hình 1 có $0{,}2$ trên A và $0{,}6$ trên B; mô hình 2 có $0{,}5$ trên A và $0{,}1$ trên B (số liệu giả lập). Hệ thống chọn mô hình 1 với xác suất $\theta\in[0,1]$ cho mỗi yêu cầu, nên tỷ lệ lỗi kỳ vọng trên A là $0{,}5-0{,}3\theta$ và trên B là $0{,}1+0{,}5\theta$.

(a) Viết bài cực tiểu theo $\theta$ của tỷ lệ lỗi lớn hơn trong hai nhóm thành quy hoạch tuyến tính.

(b) Chứng minh nghiệm là $\theta^*=\tfrac12$ với giá trị $0{,}35$, bằng một tổ hợp không âm của hai ràng buộc.

(c) So với nghiệm cực tiểu lỗi trung bình hai nhóm.
:::

::: hint
Tìm $\mu_A,\mu_B\ge0$, $\mu_A+\mu_B=1$, sao cho hệ số của $\theta$ trong $\mu_A(0{,}5-0{,}3\theta)+\mu_B(0{,}1+0{,}5\theta)$ bằng $0$.
:::

::: solution
**(a)** Theo Định lý 02.15(c): $\min_{\theta,t}t$ với $t\ge0{,}5-0{,}3\theta$, $t\ge0{,}1+0{,}5\theta$, $0\le\theta\le1$.

**(b) Tìm hệ số.** $-0{,}3\mu_A+0{,}5\mu_B=0$ và $\mu_A+\mu_B=1$ cho $\mu_A=\tfrac58$, $\mu_B=\tfrac38$.

**(b) Cận dưới.** Với mọi điểm khả thi,

$$
\begin{aligned}
t&=\tfrac58t+\tfrac38t\\
&\ge\tfrac58(0{,}5-0{,}3\theta)+\tfrac38(0{,}1+0{,}5\theta)\\
&=0{,}3125+0{,}0375=0{,}35 .
\end{aligned}
$$

**(b) Cận đạt.** Tại $\theta=\tfrac12$, hai nhóm có lỗi $0{,}35$ và $0{,}35$, nên $t=0{,}35$ đạt cận.

**(c)** Lỗi trung bình $\tfrac12(0{,}6+0{,}2\theta)$ nhỏ nhất tại $\theta=0$, bằng $0{,}3$, nhưng nhóm A chịu lỗi $0{,}5$. Tiêu chí minimax đổi $0{,}05$ lỗi trung bình lấy việc giảm lỗi nhóm chịu thiệt nhất xuống $0{,}35$.
:::

## Hướng dẫn đọc thêm và tài liệu tham khảo

- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press: mục 4.1–4.2 (trang 127–146) cho Mục 1; mục 4.3 (trang 146–152) cho Mục 2; mục 4.4 (trang 152–160) cho Mục 3; mục 4.5 (trang 160–167) và mục 3.1.5 (trang 74, Hessian của log-sum-exp) cho Mục 4; mục 6.1 và 6.3.2 (trang 291–310) cho hồi quy, chính quy hóa và chuẩn một; mục 8.6.1 (trang 423–427) cho máy vector hỗ trợ; Bài tập 4.15 và 4.20 (trang 194–196) cho nới lỏng và phân bổ công suất.
- Stephen Boyd, MIT OpenCourseWare 6.079 *Introduction to Convex Optimization*, Fall 2009, Bài giảng 4 *Convex optimization problems* (trang 4–2 đến 4–30), Bài giảng 2 (trang 2–9) và Bài giảng 3 (trang 3–10 đến 3–15); giấy phép CC BY-NC-SA 4.0, các hình của chương được vẽ lại.
- Dimitris Bertsimas, MIT OpenCourseWare 15.093J *Optimization Methods*, Fall 2009, Bài giảng 16 *Dynamic Programming*, mục 2, cho Tình huống 02.3.
- Dimitris Bertsimas và John Tsitsiklis (1997), *Introduction to Linear Optimization*, Athena Scientific, mục 2.6, cho Nhận xét 02.12.
- Robert Tibshirani (1996), "Regression shrinkage and selection via the lasso", *Journal of the Royal Statistical Society, Series B* 58(1), 267–288, cho Mục 3.3.
- Jordan Hoffmann và cộng sự (2022), "Training compute-optimal large language models", mục 3.3, cho dạng luật tỷ lệ ở Mục 4.5; số liệu của Ví dụ 02.23 là giả lập.
- Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội, đề cương học phần UET.AI2012 *Cơ sở toán học của Trí tuệ nhân tạo*: buổi 2, chuẩn đầu ra LLO3 và CLO1.
- Đọc tiếp trong học phần: Bài 01 cho tập lồi, hàm lồi và các kết quả toàn cục, tồn tại, duy nhất được dẫn trong chương; Bài 03 cho đối ngẫu Lagrange và điều kiện KKT; Bài 04 cho phương pháp Newton; Bài 07 cho phương pháp đơn hình.
