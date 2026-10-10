# Bài 03 — Đối ngẫu Lagrange

## Mục tiêu học tập

Mọi mục tiêu sau là minh chứng bộ phận của hai chuẩn đầu ra bài học (LLO) của buổi 3, cùng gắn với một chuẩn đầu ra học phần (CLO):

- LLO4: hiểu được hàm đối ngẫu và bài toán đối ngẫu Lagrange;
- LLO5: thể hiện được minh họa hình học của hàm đối ngẫu;
- CLO1: hiểu và đánh giá các thuật toán tối ưu, vận dụng kiến thức tối ưu để giải quyết bài toán thực tế.

1. Lập hàm Lagrange và hàm đối ngẫu của một bài toán có ràng buộc, tính hàm đối ngẫu đến công thức tường minh trên dữ liệu nhỏ và dùng giá trị của nó làm cận dưới cho giá trị tối ưu (LLO4, CLO1).
2. Chứng minh đối ngẫu yếu, lập và giải bài toán đối ngẫu, phân biệt khoảng đối ngẫu của một cặp phương án với khoảng đối ngẫu tối ưu (LLO4).
3. Kiểm tra điều kiện Slater, nêu đúng các kết luận mà định lý Slater bảo đảm và không bảo đảm, nhận ra trường hợp đối ngẫu mạnh đúng mà nghiệm đối ngẫu không đạt (LLO4).
4. Biểu diễn bài toán và hàm đối ngẫu trên mặt phẳng giá trị, đọc nhân tử như hệ số góc của đường đỡ, đọc cận dưới và độ nhạy của giá trị tối ưu (LLO5).
5. Lập và giải hệ điều kiện Karush–Kuhn–Tucker theo các nhánh bù trừ, phân biệt giả thiết cho tính cần và tính đủ (LLO4, CLO1).
6. Vận dụng đối ngẫu vào hồi quy có trần chuẩn, máy vector hỗ trợ lề mềm và bài toán chọn dữ liệu rời rạc, nêu hậu quả khi một giả thiết bị vi phạm (LLO4, LLO5, CLO1).

## Kiến thức tiên quyết

Chương dùng các kết quả sau của Bài 01 và Bài 02. Số hiệu `01.k` chỉ ghi chú Bài 01, số hiệu `02.k` chỉ ghi chú Bài 02; mỗi kết quả được phát biểu lại đủ để dùng ngay.

- **Cận dưới đúng và bài toán tối ưu** (Định nghĩa 01.10, 01.12). Cận dưới đúng $\inf_{x\in C}f(x)$ là số lớn nhất không vượt mọi giá trị $f(x)$, $x\in C$, bằng $-\infty$ khi $f$ không bị chặn dưới; nó có thể không đạt. Bài toán tối ưu có miền $D$, mục tiêu $f_0$, ràng buộc bất đẳng thức $f_i(x)\le0$ và đẳng thức; giá trị tối ưu $p^*$ là cận dưới đúng của $f_0$ trên tập khả thi, bằng $+\infty$ khi tập khả thi rỗng.
- **Miền lồng nhau** (Mệnh đề 01.16). Nếu $C'\subseteq C$ thì $\inf_Cf_0\le\inf_{C'}f_0$.
- **Tập lồi, hàm lồi, hàm lõm** (Định nghĩa 01.18, 01.22). Tập $C$ lồi nếu chứa mọi đoạn nối hai điểm của nó; $f$ lồi trên tập lồi $C$ nếu $f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y)$ với mọi $x,y\in C$, $\theta\in[0,1]$; $f$ lõm nếu $-f$ lồi.
- **Điều kiện bậc nhất và bậc hai** (Định lý 01.26, Hệ quả 01.27, Định lý 01.30(a), (b)). Hàm khả vi $f$ trên tập mở lồi là lồi khi và chỉ khi $f(y)\ge f(x)+\nabla f(x)^T(y-x)$ với mọi $x,y$; hệ quả: nếu $f$ lồi, khả vi trên một tập mở lồi chứa $C$ và $x^*\in C$ thỏa $\nabla f(x^*)^T(x-x^*)\ge0$ với mọi $x\in C$, điều kiện (7.3) của Bài 01, thì $x^*$ là cực tiểu toàn cục của $f$ trên $C$; nói riêng, $\nabla f(x^*)=0$ cho cực tiểu toàn cục trên cả tập mở đó. Hàm khả vi hai lần trên tập mở lồi là lồi khi và chỉ khi Hessian nửa xác định dương mọi nơi, và lồi chặt nếu Hessian xác định dương mọi nơi.
- **Phép bảo toàn tính lồi** (Định lý 01.31). Tổng có hệ số không âm của các hàm lồi là lồi; hợp của hàm lồi với ánh xạ affine là lồi; cực đại từng điểm của hữu hạn hàm lồi là lồi, phần (c).
- **Điều kiện cần bậc nhất không ràng buộc** (Bài 00, nhắc lại ở Nhận xét 01.15). Nếu $f$ khả vi tại một điểm trong $x^*$ của miền và $x^*$ là cực tiểu địa phương thì $\nabla f(x^*)=0$.
- **Tồn tại và duy nhất** (Định lý 01.36, Weierstrass; Định lý 01.35). Hàm liên tục trên tập không rỗng, đóng, bị chặn của $\mathbb R^d$ đạt giá trị nhỏ nhất; hàm lồi chặt có nhiều nhất một điểm cực tiểu.
- **Dạng chuẩn của bài toán tối ưu lồi** (Định nghĩa 02.1). Miền $D$ lồi, các hàm $f_0,f_1,\ldots,f_m$ lồi, ràng buộc $f_i(x)\le0$ và $Ax=b$ với $A\in\mathbb R^{p\times n}$.
- **Cải dạng tương đương** (Định nghĩa 02.5, Mệnh đề 02.6, Nhận xét 02.7). Hai bài toán tương đương khi có ánh xạ chuyển phương án khả thi qua lại và giữ thứ tự giá trị; nghiệm của bài này cho nghiệm của bài kia. Đối ngẫu phụ thuộc vào cách viết bài toán, nên chương luôn nêu rõ dạng được dùng.
- **Chứng nhận bằng tổ hợp không âm các ràng buộc** (Mệnh đề 02.11). Với quy hoạch tuyến tính $\min c^Tx$, $a_i^Tx\ge\beta_i$, nếu có $\mu\succeq0$ với $c=\sum_i\mu_ia_i$ thì mọi điểm khả thi có $c^Tx\ge\sum_i\mu_i\beta_i$; một điểm khả thi đạt cận đó là nghiệm, và mọi ràng buộc có $\mu_i>0$ chặt tại mọi nghiệm.
- **Quy hoạch bậc hai, ràng buộc bậc hai, phạt và trần** (Định nghĩa 02.17, 02.24, Mệnh đề 02.26). Nghiệm $w_\rho$ của bài có phạt $\min_w\ell(w)+\rho R(w)$ với $\rho\ge0$ là nghiệm của bài có trần $\min\ell(w)$ với $R(w)\le R(w_\rho)$; Bài 02 để ngỏ chiều ngược.
- **Máy vector hỗ trợ lề mềm** (Định nghĩa 02.38, Mệnh đề 02.39). Bài toán $\min_{w,b}\frac\rho2\lVert w\rVert_2^2+\sum_i\max(0,1-y_i(w^Tz_i+b))$ tương đương một quy hoạch bậc hai; khi dữ liệu có ít nhất một mẫu mỗi nhãn, bài có nghiệm, với $w$ duy nhất.
- **Đại số tuyến tính.** Ma trận $Q\succ0$ (xác định dương) khả nghịch; bất đẳng thức Cauchy–Schwarz $\lvert a^Tb\rvert\le\lVert a\rVert_2\lVert b\rVert_2$; nếu các hàng của $A$ độc lập tuyến tính thì $A^T\beta=0$ kéo theo $\beta=0$.

## Bảng ký hiệu

Bảng chỉ gồm ký hiệu dùng xuyên suốt chương; ký hiệu của một ví dụ, chứng minh hay tình huống được giới thiệu tại chỗ. Bài toán tổng quát có $n$ biến, $m$ ràng buộc bất đẳng thức và $p$ ràng buộc đẳng thức, theo Boyd và Vandenberghe (2004); dữ liệu học máy có $N$ mẫu và $d$ đặc trưng.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $x$, $x^*$ | biến quyết định; một nghiệm tối ưu của bài gốc | $\mathbb R^n$ |
| $D$ | miền chung của mọi hàm trong bài; mặc định $D=\mathbb R^n$ | tập con không rỗng của $\mathbb R^n$ |
| $f_0$; $f_i$, $i=1,\ldots,m$ | hàm mục tiêu; hàm ràng buộc bất đẳng thức $f_i(x)\le0$ | $D\to\mathbb R$ |
| $A$, $b$ | ma trận và vế phải của ràng buộc đẳng thức $Ax=b$ | $\mathbb R^{p\times n}$, $\mathbb R^p$ |
| $C$, $p^*$ | tập khả thi; giá trị tối ưu của bài gốc | tập con của $D$; $\mathbb R\cup\{\pm\infty\}$ |
| $\lambda$, $\nu$ | nhân tử Lagrange của bất đẳng thức và của đẳng thức | $\mathbb R^m$, khả thi đối ngẫu khi $\lambda\succeq0$; $\mathbb R^p$ |
| $L(x,\lambda,\nu)$ | hàm Lagrange | $D\times\mathbb R^m\times\mathbb R^p\to\mathbb R$ |
| $g(\lambda,\nu)$, $\operatorname{dom}g$ | hàm đối ngẫu; tập các nhân tử có $g>-\infty$ | $\mathbb R^m\times\mathbb R^p\to\mathbb R\cup\{-\infty\}$ |
| $d^*$, $(\lambda^*,\nu^*)$ | giá trị tối ưu và một nghiệm của bài đối ngẫu | $\mathbb R\cup\{\pm\infty\}$; $\mathbb R^m\times\mathbb R^p$ |
| $f_0(x)-g(\lambda,\nu)$; $p^*-d^*$ | khoảng đối ngẫu của một cặp; khoảng đối ngẫu tối ưu | $[0,+\infty]$ |
| $\bar x$ | điểm Slater (điểm khả thi chặt) | $\mathbb R^n$ |
| $\succeq$, $\preceq$, $\mathbf 1$ | so sánh từng thành phần; vector có mọi thành phần bằng $1$ | quan hệ trên $\mathbb R^k$; $\mathbb R^k$ |
| $\nabla f$, $\nabla_xL$ | gradient; gradient của $L$ theo riêng biến $x$ | $\mathbb R^n$ |
| $(u,v,t)$ | mức ràng buộc bất đẳng thức, mức ràng buộc đẳng thức, mức mục tiêu (Mục 4); $(u,v)$ còn là nhiễu vế phải | $\mathbb R^m\times\mathbb R^p\times\mathbb R$ |
| $G$, $\mathcal A$ | tập giá trị và tập trên của bài toán (Mục 3–4) | tập con của $\mathbb R^{m+p+1}$ |
| $p^*(u,v)$ | hàm giá trị của bài toán nhiễu | $\mathbb R^m\times\mathbb R^p\to\mathbb R\cup\{\pm\infty\}$ |
| $X$, $y$, $w$ | ma trận thiết kế với hàng là đặc trưng của một mẫu; vector đầu ra; vector tham số | $\mathbb R^{N\times d}$, $\mathbb R^N$, $\mathbb R^d$ |
| $z_i$, $y_i$ | đặc trưng và nhãn của mẫu $i$ trong máy vector hỗ trợ (Bài 02 viết $u_i$) | $\mathbb R^d$, $\{-1,+1\}$ |
| $\tau$, $\rho$ | trần của chuẩn bình phương; hệ số chính quy hóa (Bài 02 viết $\lambda$) | $\tau>0$; $\rho>0$ |

Ký hiệu $\rho$ thay cho $\lambda$ của Bài 02 vì trong chương này $\lambda$ dành cho nhân tử; Mục 5 chứng minh rằng ở nghiệm, hai đại lượng này trùng nhau.

## 1. Chứng nhận tối ưu và cận dưới

Mệnh đề 02.11 chứng nhận nghiệm của một quy hoạch tuyến tính bằng các hệ số $\mu_i\ge0$ sao cho vector chi phí bằng tổ hợp $\sum_i\mu_ia_i$ của các hàng ràng buộc. Bài 02 để lại hai thiếu hụt của công cụ này: các hệ số phải được đoán, và phép tính chỉ dùng được khi mục tiêu và ràng buộc tuyến tính. Xét bài toán một biến

$$
\underset{x\in\mathbb R}{\operatorname{minimize}}\quad f_0(x)=x^2+1\qquad\text{subject to}\quad f_1(x)=(x-2)(x-4)\le0 .
\tag{1.1}
$$

Điểm $x=2$ thỏa ràng buộc và cho giá trị $5$. Muốn khẳng định không điểm khả thi nào cho giá trị nhỏ hơn $5$, Mệnh đề 02.11 không áp dụng được: $x^2+1$ không phải tổ hợp tuyến tính của các vế trái ràng buộc. Mục này đặt tên cho đối tượng còn thiếu, một cận dưới của giá trị tối ưu, chứng minh rằng cận dưới bằng giá trị của một điểm khả thi là bằng chứng tối ưu, và chỉ ra rằng cộng một bội không âm của hàm ràng buộc vào mục tiêu sinh ra các cận dưới như vậy cho bài (1.1).

### 1.1 Nhu cầu: cận trên dễ, cận dưới khó

Một điểm khả thi cho một cận trên của giá trị tối ưu: theo định nghĩa cận dưới đúng (Định nghĩa 01.10), $p^*\le f_0(x)$ với mọi $x$ khả thi. Cận dưới thì khác: muốn biết $f_0$ không thể nhỏ hơn một số $\ell$, phải nói được điều gì đó về mọi điểm khả thi cùng lúc. Bài toán (1.1) đủ nhỏ để giải trực tiếp, và chương dùng nó làm ví dụ xuyên suốt để kiểm tra mọi công cụ mới trên một đáp án đã biết.

::: example Ví dụ 03.1 (Bài toán xuyên suốt)
**Dữ kiện.**

Bài (1.1): $\min_{x\in\mathbb R}f_0(x)=x^2+1$ với $f_1(x)=(x-2)(x-4)\le0$.

Bài toán là Bài tập 5.1 của Boyd và Vandenberghe (2004, tr. 273); mọi con số dưới đây được tính lại.

**Tập khả thi.**

Tích $(x-2)(x-4)$ không dương khi và chỉ khi hai thừa số trái dấu hoặc một thừa số bằng $0$, tức $2\le x\le4$. Vậy $C=[2,4]$.

**Giải.**

Đạo hàm $f_0'(x)=2x$ dương trên $[2,4]$, nên $f_0$ tăng chặt trên đoạn này và đạt giá trị nhỏ nhất tại đầu mút trái. Nghiệm là $x^*=2$, giá trị tối ưu $p^*=f_0(2)=5$.

**Kiểm tra lại.**

$f_0(3)=10>5$ và $f_0(4)=17>5$. Điểm $x=0$ cho $f_0(0)=1<5$ nhưng $f_1(0)=8>0$, nên không khả thi: cực tiểu không ràng buộc của $f_0$ nằm ngoài $C$.
:::

![Đồ thị parabol t bằng x bình phương cộng 1 trên trục x. Đoạn khả thi từ 2 đến 4 được tô; trên đoạn này đồ thị đi lên từ điểm (2, 5) tới điểm (4, 17). Điểm (2, 5) được đánh dấu là nghiệm tối ưu nằm ở biên trái của đoạn khả thi; đỉnh parabol tại (0, 1) nằm ngoài đoạn.](img/lec-03/intro-feasible.svg)

Hình trên cho thấy nghiệm nằm ở biên của tập khả thi, nơi $f_0'(2)=4\ne0$. Lời giải của Ví dụ 03.1 dùng tính đơn điệu trên một đoạn, một lập luận không mở rộng được cho bài nhiều biến với nhiều ràng buộc phi tuyến. Điều cần là một cách sinh cận dưới chỉ dùng phép tính trên các hàm $f_0$, $f_1$, không phụ thuộc vào việc mô tả được tập khả thi.

### 1.2 Trực giác: cộng một bội không âm của ràng buộc

Trên tập khả thi, $f_1(x)\le0$. Với một số $\lambda\ge0$, tích $\lambda f_1(x)$ vì vậy không dương, và hàm $f_0+\lambda f_1$ không vượt $f_0$ tại mọi điểm khả thi. Nếu biết một số $\ell$ không vượt $f_0+\lambda f_1$ tại mọi điểm của $\mathbb R$ thì $\ell$ cũng không vượt $f_0$ tại mọi điểm khả thi. Đây là trực giác, chưa phải định nghĩa: nó gợi ý rằng mỗi giá trị $\lambda\ge0$ cho một cận dưới, và việc tìm cận dưới của $f_0+\lambda f_1$ trên cả $\mathbb R$ là một bài toán không ràng buộc, dễ hơn bài gốc.

::: example Ví dụ 03.2 (Hai cận dưới cho bài toán xuyên suốt)
**Dữ kiện.**

Bài (1.1): $\min_{x\in\mathbb R}f_0(x)=x^2+1$ với $f_1(x)=(x-2)(x-4)\le0$. Tập khả thi $C=[2,4]$, nghiệm $x^*=2$, $p^*=5$ (Ví dụ 03.1).

**Với $\lambda=1$.**

Khai triển $f_1(x)=x^2-6x+8$ và cộng vào $f_0$:

$$
f_0(x)+f_1(x)=2x^2-6x+9=2\Bigl(x-\tfrac32\Bigr)^2+\tfrac92 ,
$$

trong đó bước hoàn thành bình phương dùng $2(x^2-3x)=2(x-\tfrac32)^2-\tfrac92$. Bình phương không âm, nên $f_0(x)+f_1(x)\ge4{,}5$ với mọi $x\in\mathbb R$.

Với $x$ khả thi, $f_1(x)\le0$, nên $f_0(x)\ge f_0(x)+f_1(x)\ge4{,}5$. Vậy $4{,}5$ là một cận dưới của $p^*$. Cận này đạt dấu bằng tại $x=1{,}5$, một điểm không khả thi vì $f_1(1{,}5)=(-0{,}5)(-2{,}5)=1{,}25>0$.

**Với $\lambda=2$.**

Tương tự,

$$
\begin{aligned}
f_0(x)+2f_1(x)&=3x^2-12x+17\\
&=3(x-2)^2+5\\
&\ge5\qquad\forall x\in\mathbb R .
\end{aligned}
$$

Dòng đầu khai triển $2(x^2-6x+8)$ rồi cộng $x^2+1$; dòng thứ hai hoàn thành bình phương; dòng thứ ba dùng $3(x-2)^2\ge0$.

Với $x$ khả thi, $f_0(x)\ge f_0(x)+2f_1(x)\ge5$. Điểm $x=2$ khả thi và có $f_0(2)=5$, nên không điểm khả thi nào cho giá trị nhỏ hơn giá trị tại $x=2$: $x=2$ là nghiệm.

**Kiểm tra lại.**

Tại $x=2$: $3\cdot0+5=5=f_0(2)$, và $f_1(2)=0$, nên hai vế của $f_0(2)\ge f_0(2)+2f_1(2)$ bằng nhau. Với $\lambda=-1$, cách lập luận hỏng: $f_0-f_1=6x-7$ không bị chặn dưới trên $\mathbb R$, và với $x$ khả thi thì $-f_1(x)\ge0$, nên $f_0-f_1\ge f_0$ chứ không $\le f_0$.
:::

![Ba đường cong trên trục x. Đường xám là t bằng x bình phương cộng 1 (nhân tử 0) với cực tiểu 1 tại x bằng 0. Đường cam là L với nhân tử 1, bằng 2x bình phương trừ 6x cộng 9, cực tiểu 4,5 tại x bằng 1,5, nằm ngoài đoạn khả thi. Đường xanh đậm là L với nhân tử 2, bằng 3x bình phương trừ 12x cộng 17, cực tiểu 5 tại x bằng 2. Cả ba đường đi qua hai điểm (2, 5) và (4, 17), là hai đầu mút của đoạn khả thi [2, 4] được tô nền; trên đoạn đó hai đường cam và xanh nằm dưới đường xám. Điểm 3 trên trục được đánh dấu là điểm Slater.](img/lec-03/lagrangian-family.svg)

Trên hình, ba hàm $f_0+\lambda f_1$ với $\lambda=0,1,2$ trùng nhau tại hai đầu mút $x=2$ và $x=4$, nơi $f_1=0$, và nằm dưới $f_0$ trên đoạn khả thi. Giá trị nhỏ nhất của mỗi đường là một cận dưới: $1$, $4{,}5$ và $5$. Chỉ đường $\lambda=2$ có điểm thấp nhất nằm trong đoạn khả thi và trùng với $f_0$ tại đó. Điểm Slater $x=3$ được đánh dấu sẵn cho Mục 3.

### 1.3 Định nghĩa cận dưới và chứng nhận

Ví dụ 03.2 dùng hai khái niệm chưa được đặt tên: một số không vượt $f_0$ trên tập khả thi, và một điểm khả thi mà giá trị bằng số đó. Định nghĩa sau cố định chúng cho bài toán tối ưu tổng quát của Định nghĩa 01.12.

::: definition Định nghĩa 03.1 (Cận dưới, chứng nhận tối ưu, khoảng chứng nhận)
Cho bài toán tối ưu với tập khả thi $C\subseteq\mathbb R^n$, mục tiêu $f_0:C\to\mathbb R$ và giá trị tối ưu $p^*=\inf_{x\in C}f_0(x)$.

- **Cận dưới.** Một số thực $\ell$ là một cận dưới của bài toán nếu $f_0(x)\ge\ell$ với mọi $x\in C$.
- **Khoảng chứng nhận.** Với một điểm khả thi $\hat x\in C$ và một cận dưới $\ell$, hiệu $f_0(\hat x)-\ell\ge0$ gọi là khoảng chứng nhận của cặp $(\hat x,\ell)$.
- **Chứng nhận tối ưu.** Khi khoảng chứng nhận bằng $0$, cận dưới $\ell$ gọi là một chứng nhận tối ưu (optimality certificate) cho $\hat x$.
:::

Định nghĩa có ba thành phần. Cận dưới $\ell$ là một số, không phụ thuộc vào điểm khả thi nào; nó là phát biểu "mọi điểm khả thi đều có giá trị ít nhất $\ell$". Khoảng chứng nhận đo độ lệch giữa giá trị một phương án đang có và cận dưới đang có, nên luôn không âm khi $\ell$ thật sự là cận dưới. Chứng nhận tối ưu là trường hợp khoảng này bằng $0$.

Ví dụ: với bài (1.1), số $4{,}5$ là một cận dưới, cặp $(\hat x,\ell)=(2;4{,}5)$ có khoảng chứng nhận $0{,}5$, còn số $5$ là chứng nhận tối ưu cho $\hat x=2$. Phản ví dụ: số $5{,}5$ không phải cận dưới, vì điểm khả thi $x=2$ có giá trị $5<5{,}5$.

Theo Định nghĩa 01.10, $p^*$ là cận dưới lớn nhất, nên mọi cận dưới $\ell$ thỏa $\ell\le p^*$. Một bài toán có vô số cận dưới, và chỉ cận dưới bằng $p^*$ có thể là chứng nhận.

Cận dưới khác cận trên $f_0(\hat x)$ ở chỗ cận trên đến từ một điểm, còn cận dưới là một khẳng định về toàn bộ tập khả thi. Quan hệ với chứng nhận của Bài 02 được nêu ở Nhận xét 03.3.

Kết quả sau chỉ cần Định nghĩa 01.10 và Định nghĩa 03.1; nó cho biết một cặp (phương án, cận dưới) nói được gì về giá trị tối ưu chưa biết.

::: proposition Mệnh đề 03.2 (Cận dưới chặn sai số và chứng nhận tối ưu)
**Giả thiết.** Bài toán có tập khả thi $C\neq\varnothing$, $\hat x\in C$ và $\ell$ là một cận dưới theo Định nghĩa 03.1.

**Kết luận.**

- (a) $\ell\le p^*\le f_0(\hat x)$, nên sai số $f_0(\hat x)-p^*$ của phương án $\hat x$ không vượt khoảng chứng nhận $f_0(\hat x)-\ell$.
- (b) Nếu $f_0(\hat x)=\ell$ thì $\hat x$ là nghiệm và $p^*=\ell$.

**Điều kiện áp dụng.** Không cần tính lồi, tính khả vi hay sự tồn tại nghiệm.

**Phạm vi.** Mệnh đề không cho cách tìm $\ell$, và không khẳng định có cận dưới bằng $p^*$ được biểu diễn theo một dạng cho trước.
:::

::: proof Chứng minh Mệnh đề 03.2
**Phần (a).**

Vì $\ell\le f_0(x)$ với mọi $x\in C$, số $\ell$ là một cận dưới của tập giá trị $\{f_0(x)\mid x\in C\}$, nên không vượt cận dưới lớn nhất $p^*$ (Định nghĩa 01.10). Vì $\hat x\in C$, $p^*\le f_0(\hat x)$ theo cùng định nghĩa. Trừ hai vế của $\ell\le p^*$ khỏi $f_0(\hat x)$ cho $f_0(\hat x)-p^*\le f_0(\hat x)-\ell$.

**Phần (b).**

Nếu $f_0(\hat x)=\ell$ thì chuỗi ở (a) thành $\ell\le p^*\le\ell$, nên $p^*=\ell=f_0(\hat x)$; một điểm khả thi có giá trị bằng $p^*$ là nghiệm theo Định nghĩa 01.12. $\square$
:::

Mệnh đề 03.2 tách việc chứng nhận tối ưu thành hai việc độc lập: tìm một phương án tốt và tìm một cận dưới tốt. Phần (a) dùng được cả khi chưa có chứng nhận: một bộ giải trả về phương án $\hat x$ và cận $\ell$ thì người dùng biết sai số không quá $f_0(\hat x)-\ell$ mà không cần biết $p^*$. Áp dụng vào Ví dụ 03.2: cặp $(2;\,4{,}5)$ cho sai số của phương án $x=2$ không quá $0{,}5$; cặp $(2;\,5)$ cho sai số bằng $0$. Trong Ví dụ 03.1, sai số thật bằng $0$, nên con số $0{,}5$ chỉ là cận trên của sai số.

::: remark Nhận xét 03.3 (Chứng nhận của Bài 02 và hai câu hỏi còn mở)
Trong Mệnh đề 02.11, số $\sum_i\mu_i\beta_i$ là một cận dưới theo Định nghĩa 03.1, và phần (b) của mệnh đề đó là Mệnh đề 03.2(b). Ví dụ 03.2 dùng cùng ý nhưng không cần tuyến tính: cộng bội không âm $\lambda f_1$ rồi lấy cực tiểu trên toàn $\mathbb R$. Hai câu hỏi còn mở là chọn $\lambda$ thế nào và khi nào tồn tại $\lambda$ cho chứng nhận tối ưu. Mục 2 trả lời câu thứ nhất bằng bài toán đối ngẫu, Mục 3 trả lời câu thứ hai bằng điều kiện Slater.

Nhầm lẫn thường gặp là coi điểm đạt cực tiểu của $f_0+\lambda f_1$ là ứng viên nghiệm: với $\lambda=1$, điểm đó là $x=1{,}5$, không khả thi, nhưng cận $4{,}5$ vẫn đúng vì lập luận chỉ dùng giá trị nhỏ nhất, không dùng điểm đạt.
:::

::: exercise Bài tập 03.1
Xét bài toán $\min_{x\in\mathbb R}x^2+2x$ với ràng buộc $x\ge1$, viết thành $f_1(x)=1-x\le0$.

- (a) Với $\lambda=2$ và $\lambda=4$, tính giá trị nhỏ nhất trên $\mathbb R$ của $x^2+2x+\lambda(1-x)$.
- (b) Mỗi giá trị đó là cận dưới của bài toán theo Định nghĩa 03.1 hay không.
- (c) Tính khoảng chứng nhận của phương án $\hat x=1$ với từng cận và kết luận về tính tối ưu của $\hat x=1$.
:::

::: hint
Viết $x^2+(2-\lambda)x+\lambda$ thành $\bigl(x-\frac{\lambda-2}2\bigr)^2+\lambda-\frac{(2-\lambda)^2}4$. Lập luận cận dưới giống Ví dụ 03.2.
:::

::: solution
**Câu (a).**

Hàm $x^2+2x+\lambda(1-x)=x^2+(2-\lambda)x+\lambda$ đạt cực tiểu trên $\mathbb R$ tại $x=\frac{\lambda-2}2$ với giá trị $\lambda-\frac{(2-\lambda)^2}4$. Với $\lambda=2$: điểm $x=0$, giá trị $2$. Với $\lambda=4$: điểm $x=1$, giá trị $4-1=3$.

**Câu (b).**

Cả hai đều là cận dưới. Với $x$ khả thi, $1-x\le0$ và $\lambda\ge0$, nên $x^2+2x\ge x^2+2x+\lambda(1-x)\ge$ giá trị nhỏ nhất vừa tính. Cận $2$ đạt dấu bằng tại $x=0$, không khả thi, nhưng vẫn hợp lệ.

**Câu (c).**

$f_0(1)=3$. Với cận $2$, khoảng chứng nhận bằng $1$; với cận $3$, bằng $0$.

Theo Mệnh đề 03.2(b), $\hat x=1$ là nghiệm và $p^*=3$.

**Kiểm tra lại.**

Trên tập khả thi $[1,\infty)$, $f_0'(x)=2x+2>0$, nên $f_0$ tăng và nhỏ nhất tại $x=1$ với giá trị $3$, khớp kết luận.
:::

**Chuỗi suy luận của mục.** Mục đi từ nhu cầu khẳng định không phương án nào tốt hơn $x=2$ tới hai kết quả:

1. Định nghĩa 03.1: cận dưới, khoảng chứng nhận, chứng nhận tối ưu;
2. Mệnh đề 03.2: một cận dưới chặn sai số của mọi phương án, và một cận dưới bằng giá trị của một điểm khả thi là chứng nhận tối ưu.

Ví dụ 03.2 cho thấy phép cộng $\lambda f_1$ với $\lambda\ge0$ sinh ra cận dưới cho bài (1.1).

**Kết mục.** Phép cộng mới được làm cho một ràng buộc và một giá trị $\lambda$ đoán trước. Chưa có lập luận cho trường hợp tổng quát có nhiều bất đẳng thức, có đẳng thức, có miền khác $\mathbb R$.

Mục 2 tổng quát hóa phép cộng thành hàm Lagrange, biến việc lấy cực tiểu thành hàm đối ngẫu, chứng minh mọi giá trị của hàm này là cận dưới, rồi chọn cận tốt nhất bằng một bài toán tối ưu mới.

## 2. Hàm Lagrange, hàm đối ngẫu và đối ngẫu yếu

Mục 1 sinh cận dưới cho bài (1.1) bằng cách cộng $\lambda f_1$ với một $\lambda\ge0$ đoán trước. Các bài toán của học phần có nhiều ràng buộc và có đẳng thức. Bài pha trộn của Bài 02 có bốn bất đẳng thức tuyến tính; bài $\min\tfrac12(x_1^2+x_2^2)$ với $x_1\ge1$, $x_2\ge2$ có hai bất đẳng thức, mỗi bất đẳng thức chặn một biến, nên một hệ số chung cho cả hai không đủ để cận chạm giá trị tối ưu $\tfrac52$ (Ví dụ 03.6 tính con số này). Mục này gán cho mỗi ràng buộc một nhân tử riêng, định nghĩa hàm Lagrange và hàm đối ngẫu, chứng minh rằng mọi giá trị hữu hạn của hàm đối ngẫu tại nhân tử không âm là một cận dưới (đối ngẫu yếu), và biến việc chọn nhân tử thành một bài toán tối ưu: bài toán đối ngẫu.

### 2.1 Bài toán gốc tổng quát

Mọi kết quả của mục áp dụng cho bài toán sau, gọi là bài toán gốc (primal problem). Cho một tập không rỗng $D\subseteq\mathbb R^n$, các hàm $f_0,f_1,\ldots,f_m:D\to\mathbb R$, ma trận $A\in\mathbb R^{p\times n}$ và vector $b\in\mathbb R^p$; xét

$$
\begin{aligned}
\underset{x\in D}{\operatorname{minimize}}\quad & f_0(x)\\
\text{subject to}\quad & f_i(x)\le0,\quad i=1,\ldots,m,\\
& Ax=b ,
\end{aligned}
\tag{2.1}
$$

với tập khả thi $C=\{x\in D\mid f_i(x)\le0,\ i=1,\ldots,m;\ Ax=b\}$ và giá trị tối ưu $p^*=\inf_{x\in C}f_0(x)$. Bài (2.1) có dạng của Định nghĩa 01.12 với các hàm đẳng thức affine; không giả thiết $D$ lồi, các $f_i$ lồi hay khả vi. Miền $D$ chứa những điều kiện không được đưa vào hàm Lagrange; trong hầu hết chương $D=\mathbb R^n$, còn Ví dụ 03.7 và Tình huống 03.3 dùng $D=\{0,1\}^n$. Một ràng buộc dạng $h(x)\ge c$ được viết lại thành $c-h(x)\le0$ trước khi gán nhân tử; Mục 1 đã thấy rằng dấu sai làm hỏng chiều của cận.

### 2.2 Hàm Lagrange

Ví dụ 03.2 dùng hàm $f_0+\lambda f_1$. Với nhiều ràng buộc, mỗi bất đẳng thức $f_i\le0$ nhận một trọng số $\lambda_i\ge0$, như trong Mệnh đề 02.11 mỗi ràng buộc nhận một $\mu_i\ge0$. Một đẳng thức $a_j^Tx=b_j$ thì khác: tại mọi điểm khả thi, $a_j^Tx-b_j=0$, nên cộng $\nu_j(a_j^Tx-b_j)$ với $\nu_j$ âm hay dương đều không đổi giá trị tại điểm khả thi. Trực giác (chưa phải định nghĩa): hàm cần dựng là mục tiêu cộng tổng có trọng số các vế trái ràng buộc, với trọng số không âm cho bất đẳng thức và trọng số tự do cho đẳng thức.

::: definition Định nghĩa 03.4 (Hàm Lagrange và nhân tử)
Cho bài toán (2.1). Hàm Lagrange (Lagrangian) của bài toán là $L:D\times\mathbb R^m\times\mathbb R^p\to\mathbb R$,

$$
L(x,\lambda,\nu)=f_0(x)+\sum_{i=1}^m\lambda_if_i(x)+\nu^T(Ax-b).
\tag{2.2}
$$

Số $\lambda_i$ là nhân tử Lagrange (Lagrange multiplier) của ràng buộc $f_i(x)\le0$, số $\nu_j$ là nhân tử của ràng buộc đẳng thức thứ $j$; $\lambda\in\mathbb R^m$ và $\nu\in\mathbb R^p$ gọi là các vector nhân tử.
:::

Hàm $L$ có ba nhóm số hạng. Số hạng $f_0(x)$ là mục tiêu gốc. Số hạng $\lambda_if_i(x)$ cộng thêm một khoản tỷ lệ với mức ràng buộc $f_i(x)$: khi $\lambda_i\ge0$ và $x$ thỏa ràng buộc, khoản này không dương; khi $x$ vi phạm ($f_i(x)>0$), khoản này dương và tăng theo mức vi phạm. Số hạng $\nu^T(Ax-b)$ bằng $0$ tại mọi $x$ thỏa đẳng thức, với mọi $\nu$.

Định nghĩa cho phép mọi $\lambda\in\mathbb R^m$; dấu $\lambda\succeq0$ là điều kiện của kết quả dùng $L$ (Định lý 03.8), không phải của bản thân $L$. Với bài (1.1), $m=1$, $p=0$ và

$$
L(x,\lambda)=x^2+1+\lambda(x-2)(x-4)=(1+\lambda)x^2-6\lambda x+1+8\lambda ,
$$

có được bằng cách khai triển $(x-2)(x-4)=x^2-6x+8$, nhân với $\lambda$ rồi gom hệ số theo lũy thừa của $x$. Với $\lambda=1$ và $\lambda=2$, biểu thức này trùng với hai hàm của Ví dụ 03.2.

So với các khái niệm đã có, hàm Lagrange tổng quát hóa phép tổ hợp không âm của Mệnh đề 02.11: với quy hoạch tuyến tính $\min c^Tx$, $\beta_i-a_i^Tx\le0$, ta có $L(x,\lambda)=c^Tx+\sum_i\lambda_i(\beta_i-a_i^Tx)$, và Mệnh đề 03.11 dưới đây cho thấy hệ số $\mu_i$ của Bài 02 chính là $\lambda_i$.

Hàm Lagrange khác hàm có phạt $\ell(w)+\rho R(w)$ của Mệnh đề 02.26 ở hai điểm: hạng phạt của Bài 02 thay ràng buộc bằng một chi phí với hệ số chọn trước, còn trong $L$ các nhân tử là biến của một bài toán mới (Định nghĩa 03.9); và $L$ cộng mức ràng buộc $f_i$ có dấu, chứ không cộng một độ đo không âm của vi phạm.

Nhầm lẫn thường gặp là cho rằng $L(x,\lambda,\nu)\le f_0(x)$ với mọi $x$. Bất đẳng thức chỉ đúng tại $x$ khả thi và $\lambda\succeq0$: với bài (1.1), $\lambda=1$ và $x=0$ cho $L(0,1)=9>1=f_0(0)$.

### 2.3 Hàm đối ngẫu

Ở Ví dụ 03.2, cận dưới là giá trị nhỏ nhất của $L(\cdot,\lambda)$ trên toàn $\mathbb R$. Khi $L$ không đạt cực tiểu, giá trị nhỏ nhất không tồn tại, nhưng cận dưới đúng vẫn tồn tại (Định nghĩa 01.10). Đối tượng cần định nghĩa vì vậy là cận dưới đúng của $L$ theo $x$, coi như một hàm của nhân tử.

::: definition Định nghĩa 03.5 (Hàm đối ngẫu và miền hữu hiệu)
Cho bài toán (2.1) với hàm Lagrange (2.2). Hàm đối ngẫu Lagrange (Lagrange dual function) là $g:\mathbb R^m\times\mathbb R^p\to\mathbb R\cup\{-\infty\}$,

$$
g(\lambda,\nu)=\inf_{x\in D}L(x,\lambda,\nu)=\inf_{x\in D}\Bigl(f_0(x)+\sum_{i=1}^m\lambda_if_i(x)+\nu^T(Ax-b)\Bigr).
\tag{2.3}
$$

Giá trị $g(\lambda,\nu)=-\infty$ khi $L(\cdot,\lambda,\nu)$ không bị chặn dưới trên $D$. Tập $\operatorname{dom}g=\{(\lambda,\nu)\mid g(\lambda,\nu)>-\infty\}$ gọi là miền hữu hiệu của $g$.
:::

Công thức (2.3) cố định nhân tử rồi lấy cận dưới đúng theo $x$ trên toàn miền $D$; các ràng buộc $f_i\le0$ và $Ax=b$ không được áp lại, vì chúng đã được đưa vào $L$ dưới dạng các số hạng có trọng số. Kết quả là một số phụ thuộc vào $(\lambda,\nu)$. Hàm $g$ không nhận giá trị $+\infty$: vì $D$ không rỗng, với một điểm $x_0\in D$ bất kỳ, $g(\lambda,\nu)\le L(x_0,\lambda,\nu)<+\infty$.

Ví dụ tiếp theo tính $g$ của bài (1.1) đến công thức tường minh; ví dụ ngược là $\lambda=-1$, khi $L(x,-1)=6x-7$ không bị chặn dưới, nên $g(-1)=-\infty$ và $-1\notin\operatorname{dom}g$.

Hàm đối ngẫu là hàm của nhân tử, còn hàm Lagrange là hàm của cả biến và nhân tử; $g$ có được từ $L$ bằng phép "lấy cận dưới đúng theo $x$", cùng phép đã định nghĩa $p^*$ từ $f_0$ (Định nghĩa 01.12), nhưng trên $D$ thay vì trên $C$. Vì $C\subseteq D$, cận dưới đúng của $L$ trên $D$ không vượt cận dưới đúng trên $C$ (Mệnh đề 01.16(a)); Định lý 03.8 khai thác đúng bất đẳng thức này.

::: example Ví dụ 03.3 (Hàm đối ngẫu của bài toán xuyên suốt)
**Dữ kiện.**

Bài (1.1): $\min_{x\in\mathbb R}f_0(x)=x^2+1$ với $f_1(x)=(x-2)(x-4)\le0$. Hàm Lagrange (2.2) là $L(x,\lambda)=f_0(x)+\lambda f_1(x)$, hàm đối ngẫu (2.3) là $g(\lambda)=\inf_{x\in\mathbb R}L(x,\lambda)$. Ví dụ 03.2: $\lambda=1$ cho cận dưới $4{,}5$, đạt tại $x=1{,}5$; $\lambda=2$ cho cận dưới $5$, đạt tại $x=2$.

Với bài (1.1), $D=\mathbb R$ và $L(x,\lambda)=(1+\lambda)x^2-6\lambda x+1+8\lambda$. Xét ba trường hợp theo dấu của hệ số $1+\lambda$ của $x^2$.

**Trường hợp $\lambda>-1$.**

Hệ số $1+\lambda>0$. Đặt $1+\lambda$ ra ngoài hai số hạng chứa $x$ và thêm bớt bình phương của nửa hệ số $x$ trong ngoặc, là $\frac{3\lambda}{1+\lambda}$:

$$
L(x,\lambda)=(1+\lambda)\Bigl(x-\frac{3\lambda}{1+\lambda}\Bigr)^2+1+8\lambda-\frac{9\lambda^2}{1+\lambda}.
$$

Số hạng bình phương không âm và bằng $0$ tại $x(\lambda)=\frac{3\lambda}{1+\lambda}$, nên cận dưới đúng đạt tại đó. Dùng $\frac{9\lambda^2}{1+\lambda}=9(\lambda-1)+\frac9{1+\lambda}$, đúng vì $9(\lambda-1)(1+\lambda)+9=9\lambda^2$,

$$
g(\lambda)=1+8\lambda-9(\lambda-1)-\frac9{1+\lambda}=10-\lambda-\frac9{1+\lambda}\qquad(\lambda>-1).
$$

**Trường hợp $\lambda=-1$.**

$L(x,-1)=6x-7$ không bị chặn dưới, nên $g(-1)=-\infty$.

**Trường hợp $\lambda<-1$.**

Hệ số của $x^2$ âm, nên $L(x,\lambda)\to-\infty$ khi $x\to\infty$, và $g(\lambda)=-\infty$.

Vậy $\operatorname{dom}g=(-1,\infty)$. Một số giá trị: $g(0)=10-0-9=1$, $g(1)=10-1-4{,}5=4{,}5$, $g(2)=10-2-3=5$, $g(3)=10-3-2{,}25=4{,}75$, $g(8)=10-8-1=1$.

**Kiểm tra lại.**

$g(1)$ và $g(2)$ trùng với hai cận của Ví dụ 03.2. Điểm đạt $x(1)=1{,}5$ và $x(2)=2$ cũng trùng. Tại $\lambda=0$, $g(0)=\inf_xx^2+1=1$, cận dưới đúng của mục tiêu khi bỏ ràng buộc.
:::

![Đồ thị hàm g theo nhân tử lambda. Đường cong tiến về âm vô cực khi lambda giảm về âm 1, có tiệm cận đứng tại âm 1. Miền khả thi đối ngẫu lambda lớn hơn hoặc bằng 0 được tô nền. Đồ thị đi qua g(0) bằng 1, tăng tới cực đại 5 tại lambda bằng 2 rồi giảm. Một đường nét đứt nằm ngang ở mức p sao bằng 5 chạm đỉnh; khoảng cách từ g(0) tới 5 được ghi là 4. Góc trên ghi điểm x bằng 3 cho f1 bằng âm 1, nhỏ hơn 0, là điểm Slater.](img/lec-03/dual-function.svg)

Hình trên vẽ $g$ trên $\operatorname{dom}g=(-1,\infty)$. Phần $-1<\lambda<0$ thuộc miền hữu hiệu nhưng giá trị ở đó không được bảo đảm là cận dưới, vì Định lý 03.8 dưới đây cần $\lambda\ge0$; phần nền tô là các nhân tử dùng được. Đỉnh của đồ thị tại $\lambda=2$ có độ cao $5=p^*$, và đồ thị lõm. Tính lõm này không phải đặc điểm riêng của ví dụ.

Kết quả sau cho biết cấu trúc của bài toán chọn nhân tử tốt nhất; nó chỉ dùng định nghĩa hàm lõm, tức Định nghĩa 01.22 áp cho $-g$, và định nghĩa cận dưới đúng. Lập luận theo Boyd và Vandenberghe (2004, mục 5.1.2, tr. 216).

::: proposition Mệnh đề 03.6 (Hàm đối ngẫu lõm)
**Giả thiết.** Bài toán (2.1) với $D$ bất kỳ và các hàm $f_0,\ldots,f_m$ bất kỳ.

**Kết luận.** Với mọi $\theta_a=(\lambda_a,\nu_a)$, $\theta_b=(\lambda_b,\nu_b)$ trong $\operatorname{dom}g$ và mọi $\alpha\in[0,1]$,

$$
g\bigl(\alpha\theta_a+(1-\alpha)\theta_b\bigr)\ge\alpha g(\theta_a)+(1-\alpha)g(\theta_b).
$$

Do đó $\operatorname{dom}g$ là tập lồi và $g$ là hàm lõm trên $\operatorname{dom}g$.

**Điều kiện áp dụng.** Không cần tính lồi của $D$ hay của các $f_i$, không cần khả vi.

**Phạm vi.** Mệnh đề không cho công thức của $g$ và không nói việc tính $g(\lambda,\nu)$ tại một điểm là dễ.
:::

::: proof Chứng minh Mệnh đề 03.6
Đặt $\theta_\alpha=\alpha\theta_a+(1-\alpha)\theta_b$. Với $\alpha\in\{0,1\}$, khẳng định là đẳng thức; xét $\alpha\in(0,1)$.

**Bước 1 (với $x$ cố định, $L$ affine theo nhân tử).**

Khi $x\in D$ cố định, $f_0(x)$, $f_i(x)$ và $Ax-b$ là các hằng số, nên $L(x,\lambda,\nu)$ là một hằng số cộng một tổ hợp tuyến tính của các thành phần của $\lambda$ và $\nu$. Một hàm như vậy bảo toàn tổ hợp lồi:

$$
L(x,\theta_\alpha)=\alpha L(x,\theta_a)+(1-\alpha)L(x,\theta_b).
$$

**Bước 2 (so với các cận dưới đúng).**

Theo Định nghĩa 03.5, $L(x,\theta_a)\ge g(\theta_a)$ và $L(x,\theta_b)\ge g(\theta_b)$ với mọi $x\in D$, và hai vế phải hữu hạn vì $\theta_a,\theta_b\in\operatorname{dom}g$. Nhân hai bất đẳng thức với $\alpha>0$ và $1-\alpha>0$, phép nhân với số dương giữ chiều, rồi cộng và dùng Bước 1:

$$
L(x,\theta_\alpha)\ge\alpha g(\theta_a)+(1-\alpha)g(\theta_b)\qquad\forall x\in D.
$$

**Bước 3 (lấy cận dưới đúng).**

Vế phải là một số không phụ thuộc $x$ và là một cận dưới của $\{L(x,\theta_\alpha)\mid x\in D\}$, nên không vượt cận dưới lớn nhất $g(\theta_\alpha)$ (Định nghĩa 01.10). Đó là bất đẳng thức cần chứng minh. Vế phải hữu hạn, nên $g(\theta_\alpha)>-\infty$, tức $\theta_\alpha\in\operatorname{dom}g$: $\operatorname{dom}g$ lồi (Định nghĩa 01.18), và $-g$ thỏa định nghĩa hàm lồi trên tập lồi này. $\square$
:::

Mệnh đề 03.6 nói rằng $g$ là cận dưới đúng của một họ hàm affine theo nhân tử, một họ chỉ số bởi $x\in D$. Cận dưới đúng từng điểm của các hàm affine luôn lõm, bất kể họ đó sinh ra thế nào. Mệnh đề này là phần đối ngẫu của Định lý 01.31(c): cực đại từng điểm của các hàm lồi là lồi.

Chứng minh không dùng tính lồi ở bất kỳ bước nào, nên kết luận đúng cả khi bài gốc không lồi. Ví dụ 03.7 với $D=\{0,1\}^3$ là một trường hợp như vậy: ở đó $g$ là cận dưới của tám hàm affine. Với bài (1.1), Mệnh đề 03.6 khớp với phép tính trực tiếp: $g''(\lambda)=-\frac{18}{(1+\lambda)^3}<0$ trên $(-1,\infty)$.

::: remark Nhận xét 03.7 (Ba nhầm lẫn khi tính hàm đối ngẫu)
1. **Thay cận dưới đúng bằng giá trị nhỏ nhất.** Với bài $\min e^x$ trên $\mathbb R$ không có ràng buộc, $g=\inf_xe^x=0$ dù không có $x$ đạt $0$. Viết "$g$ không xác định vì không có cực tiểu" là sai.
2. **Áp lại ràng buộc khi lấy cận dưới đúng.** Với bài (1.1) và $\lambda=1$, cực tiểu của $L(\cdot,1)$ trên $[2,4]$ là $5$ tại $x=2$, không phải $g(1)=4{,}5$. Con số $5$ vẫn không vượt $p^*$, nhưng nó không phải giá trị hàm đối ngẫu, và tính nó cần giải lại bài có ràng buộc.
3. **Đồng nhất "lõm" với "dễ tính".** Mệnh đề 03.6 cho cấu trúc của bài chọn nhân tử, nhưng mỗi giá trị $g(\lambda,\nu)$ là một bài cực tiểu trên $D$. Ở Ví dụ 03.7, $L$ tách theo từng biến nên mỗi biến chỉ cần xét hai giá trị; nếu $L$ chứa tích $x_ix_j$, cực tiểu trên $\{0,1\}^n$ nói chung phải liệt kê $2^n$ điểm.

Chiều ngược lại cũng xảy ra: bài gốc khó mà $g$ dễ tính. Bài phân hoạch hai phần $\min x^TWx$ với $x_i^2=1$ (Boyd và Vandenberghe 2004, tr. 219) có đẳng thức không affine; viết mỗi đẳng thức thành hai bất đẳng thức $x_i^2-1\le0$, $1-x_i^2\le0$ để đưa về dạng (2.1). Khi đó tính $g$ quy về kiểm tra một ma trận nửa xác định dương, trong khi bài gốc là một bài tổ hợp trên $2^n$ điểm.
:::

### 2.4 Đối ngẫu yếu

Ví dụ 03.2 chứng minh riêng từng cận. Định lý sau chỉ cần Định nghĩa 03.5 và Định nghĩa 01.10; nó cho biết mọi giá trị của $g$ tại nhân tử có $\lambda\succeq0$ đều là cận dưới, và nêu chỗ dấu của nhân tử được dùng.

::: theorem Định lý 03.8 (Đối ngẫu yếu)
**Giả thiết.** Bài toán (2.1) với $D$ và $f_0,\ldots,f_m$ bất kỳ; $\lambda\in\mathbb R^m$ với $\lambda\succeq0$; $\nu\in\mathbb R^p$ bất kỳ.

**Kết luận.** Với mọi $x$ khả thi,

$$
g(\lambda,\nu)\le L(x,\lambda,\nu)\le f_0(x),
\tag{2.4}
$$

do đó $g(\lambda,\nu)\le p^*$. Khi $g(\lambda,\nu)>-\infty$, số $g(\lambda,\nu)$ là một cận dưới của bài toán theo Định nghĩa 03.1.

**Điều kiện áp dụng.** Chỉ cần $\lambda\succeq0$. Không cần tính lồi, tính khả vi, điều kiện Slater hay sự tồn tại nghiệm.

**Phạm vi.** Định lý chỉ cho bất đẳng thức; khoảng $p^*-g(\lambda,\nu)$ có thể dương với mọi nhân tử (Ví dụ 03.7). Khi tập khả thi rỗng, $p^*=+\infty$ và kết luận không chứa thông tin.
:::

::: proof Chứng minh Định lý 03.8
Lấy $x\in C$.

**Bước 1 (bất đẳng thức thứ nhất).**

Theo Định nghĩa 03.5, $g(\lambda,\nu)$ là cận dưới đúng của $L(\cdot,\lambda,\nu)$ trên $D$, nên không vượt giá trị tại điểm $x\in C\subseteq D$.

**Bước 2 (bất đẳng thức thứ hai).**

Vì $x$ khả thi, $f_i(x)\le0$ với mọi $i$; vì $\lambda_i\ge0$, mỗi tích $\lambda_if_i(x)\le0$. Đây là chỗ duy nhất dùng giả thiết $\lambda\succeq0$. Vì $Ax=b$, $\nu^T(Ax-b)=0$ với mọi $\nu$. Cộng lại, $L(x,\lambda,\nu)=f_0(x)+\sum_i\lambda_if_i(x)\le f_0(x)$.

**Bước 3 (kết luận về $p^*$).**

Theo (2.4), $g(\lambda,\nu)$ không vượt $f_0(x)$ với mọi $x\in C$, nên là một cận dưới của $\{f_0(x)\mid x\in C\}$ và không vượt cận dưới lớn nhất $p^*$ (Định nghĩa 01.10). Nếu $C=\varnothing$, $p^*=+\infty$ và bất đẳng thức hiển nhiên. $\square$
:::

Đối ngẫu yếu (weak duality) gồm hai bước có căn cứ khác nhau. Bước đầu là tính chất của cận dưới đúng: lấy cận dưới đúng trên miền lớn $D$ cho số nhỏ hơn giá trị tại mọi điểm của miền nhỏ $C$. Bước sau dùng tính khả thi và dấu nhân tử.

Bỏ giả thiết $\lambda\succeq0$ thì bước sau hỏng. Với bài (1.1) và $\lambda=-\tfrac12\in\operatorname{dom}g$, $g(-\tfrac12)=10+\tfrac12-18=-7{,}5$ vẫn không vượt $5$, nhưng không có lý do tổng quát cho điều đó. Với cùng $\lambda$ và điểm khả thi $x=3$, $L(3,-\tfrac12)=10+\tfrac12=10{,}5>f_0(3)=10$, nên bất đẳng thức thứ hai của (2.4) sai.

So với Mệnh đề 02.11, Định lý 03.8 bỏ giả thiết tuyến tính và bỏ yêu cầu chi phí bằng đúng một tổ hợp các ràng buộc: thay vào đó, phần chênh lệch $f_0+\sum_i\lambda_if_i$ được xử lý bằng phép lấy cận dưới đúng. So với Mệnh đề 03.2, định lý cung cấp chính cái cận dưới $\ell$ mà Mệnh đề 03.2 giả thiết là đã có. Cái giá phải trả là phải tính một cận dưới đúng trên $D$, và cận thu được có thể không đạt $p^*$.

**Trong học máy.** Đối ngẫu yếu là nền của phép nới lỏng Lagrange (Lagrangian relaxation) cho các bài chọn rời rạc như chọn tập dữ liệu để gán nhãn hay chọn đặc trưng: tập khả thi rời rạc không lồi, nhưng $g$ vẫn là cận dưới và Mệnh đề 03.6 vẫn cho bài chọn nhân tử lõm; Tình huống 03.3 tính cụ thể cận này.

Trong các bộ giải lồi, mỗi lần lặp tạo một phương án khả thi $x^{(k)}$ và một nhân tử $(\lambda^{(k)},\nu^{(k)})$ với $\lambda^{(k)}\succeq0$; hiệu $f_0(x^{(k)})-g(\lambda^{(k)},\nu^{(k)})$ chặn trên sai số theo Mệnh đề 03.2(a), và bộ giải dừng khi hiệu này nhỏ hơn ngưỡng (Boyd và Vandenberghe 2004, mục 5.5.1, tr. 241–242).

Giả thiết $\lambda\succeq0$ phải được bảo đảm bởi bộ giải; nếu một nhân tử âm do sai số làm tròn, con số trả về không còn là cận dưới.

### 2.5 Bài toán đối ngẫu

Mỗi $(\lambda,\nu)$ với $\lambda\succeq0$ cho một cận dưới, và cận tốt nhất là cận lớn nhất. Ở Ví dụ 03.3, $g(0)=1$, $g(1)=4{,}5$, $g(2)=5$; chọn nhân tử tốt nhất là cực đại $g$ trên tập $\lambda\ge0$.

::: definition Định nghĩa 03.9 (Bài toán đối ngẫu)
Cho bài toán (2.1) với hàm đối ngẫu $g$. Bài toán đối ngẫu Lagrange (Lagrange dual problem) là

$$
\underset{\lambda\in\mathbb R^m,\ \nu\in\mathbb R^p}{\operatorname{maximize}}\quad g(\lambda,\nu)\qquad\text{subject to}\quad\lambda\succeq0 .
\tag{2.5}
$$

Cặp $(\lambda,\nu)$ là khả thi đối ngẫu (dual feasible) nếu $\lambda\succeq0$ và $(\lambda,\nu)\in\operatorname{dom}g$. Giá trị tối ưu đối ngẫu là $d^*=\sup\{g(\lambda,\nu)\mid\lambda\succeq0\}$, với quy ước $d^*=-\infty$ khi không có cặp khả thi đối ngẫu. Một cặp khả thi đối ngẫu $(\lambda^*,\nu^*)$ với $g(\lambda^*,\nu^*)=d^*$ là một nghiệm đối ngẫu; khi có nghiệm như vậy, ta nói bài đối ngẫu đạt nghiệm.
:::

Bài (2.5) có biến là nhân tử, mục tiêu là hàm đối ngẫu, và ràng buộc duy nhất là dấu của $\lambda$.

Theo Mệnh đề 03.6, nó là bài cực đại một hàm lõm trên tập lồi $\{\lambda\succeq0\}\cap\operatorname{dom}g$, tương đương bài cực tiểu hàm lồi $-g$ trên một tập lồi, tức một bài toán tối ưu lồi theo nghĩa tổng quát nêu trong Định nghĩa 02.1, kể cả khi bài gốc không lồi.

Bài gốc có $n$ biến, bài đối ngẫu có $m+p$ biến; đối ngẫu là quan hệ giữa hai giá trị tối ưu $p^*$ và $d^*$, không phải một phép cải dạng tương đương theo Định nghĩa 02.5. Ví dụ ngược: hai cách viết tương đương của cùng một tập khả thi có thể cho hai bài đối ngẫu khác nhau (Bài tập 03.13).

Kết quả sau là hệ quả trực tiếp của Định lý 03.8: lấy cận trên đúng theo nhân tử ở vế trái của (2.4).

::: corollary Hệ quả 03.10 (Đối ngẫu yếu cho giá trị tối ưu và chứng nhận từ một cặp)
**Giả thiết.** Bài toán (2.1) và bài đối ngẫu (2.5).

**Kết luận.**

- (a) $d^*\le p^*$.
- (b) Nếu $x$ khả thi và $(\lambda,\nu)$ khả thi đối ngẫu thì $g(\lambda,\nu)\le d^*$, $d^*\le p^*$ và $p^*\le f_0(x)$, nên mỗi giá trị $p^*$, $d^*$ nằm trong đoạn $[g(\lambda,\nu),f_0(x)]$.
- (c) Nếu thêm $f_0(x)=g(\lambda,\nu)$ thì $x$ là nghiệm của bài gốc, $(\lambda,\nu)$ là nghiệm đối ngẫu và $p^*=d^*$.

**Điều kiện áp dụng.** Như Định lý 03.8.

**Phạm vi.** Phần (c) là điều kiện đủ; nó không khẳng định luôn có cặp như vậy.
:::

::: proof Chứng minh Hệ quả 03.10
**Phần (a).**

Theo Định lý 03.8, $g(\lambda,\nu)\le p^*$ với mọi $\lambda\succeq0$, nên $p^*$ là một cận trên của tập $\{g(\lambda,\nu)\mid\lambda\succeq0\}$ và không nhỏ hơn cận trên nhỏ nhất $d^*$.

**Phần (b).**

Bất đẳng thức $g(\lambda,\nu)\le d^*$ là định nghĩa cận trên đúng, $d^*\le p^*$ là phần (a), và $p^*\le f_0(x)$ vì $x$ khả thi.

**Phần (c).**

Khi hai đầu của chuỗi (b) bằng nhau, mọi bất đẳng thức trong chuỗi là đẳng thức: $f_0(x)=p^*$ nên $x$ là nghiệm, và $g(\lambda,\nu)=d^*$ nên $(\lambda,\nu)$ là nghiệm đối ngẫu. $\square$
:::

Hệ quả 03.10(c) là Mệnh đề 03.2(b) với cận dưới $\ell=g(\lambda,\nu)$, và cho thêm một kết luận về phía đối ngẫu: một cặp có khoảng đối ngẫu bằng $0$ chứng nhận đồng thời cả hai phía.

Phần (b) là cách đọc kết quả của một bộ giải khi chưa có chứng nhận: độ dài $f_0(x)-g(\lambda,\nu)$ của đoạn gọi là khoảng đối ngẫu của cặp $(x,(\lambda,\nu))$ (Định nghĩa 03.12 đặt tên chính thức).

::: example Ví dụ 03.4 (Bài toán đối ngẫu của bài toán xuyên suốt)
**Dữ kiện.**

Bài (1.1): $\min_{x\in\mathbb R}f_0(x)=x^2+1$ với $f_1(x)=(x-2)(x-4)\le0$. Ví dụ 03.3: $L(x,\lambda)=(1+\lambda)x^2-6\lambda x+1+8\lambda$ và $g(\lambda)=10-\lambda-\frac9{1+\lambda}$ với $\lambda>-1$. Đối ngẫu yếu (2.4): với $x$ khả thi và $\lambda\ge0$, $g(\lambda)\le L(x,\lambda)\le f_0(x)$. Hệ quả 03.10(c): nếu $x$ khả thi, $(\lambda,\nu)$ khả thi đối ngẫu và $f_0(x)=g(\lambda,\nu)$ thì $x$ là nghiệm của bài gốc, $(\lambda,\nu)$ là nghiệm đối ngẫu và $p^*=d^*$. Ví dụ 03.1: $x^*=2$, $p^*=5$.

**Lập bài đối ngẫu.**

Theo Ví dụ 03.3, bài đối ngẫu của (1.1) là $\max_{\lambda\ge0}\ g(\lambda)=10-\lambda-\frac9{1+\lambda}$.

**Giải.**

Đạo hàm $g'(\lambda)=-1+\frac9{(1+\lambda)^2}$ dương khi $(1+\lambda)^2<9$, tức $0\le\lambda<2$, và âm khi $\lambda>2$; vậy $g$ tăng trên $[0,2]$, giảm trên $[2,\infty)$, và $\lambda^*=2$, $d^*=g(2)=5$.

**Chứng nhận.**

Điểm $x=2$ khả thi với $f_0(2)=5=g(2)$. Theo Hệ quả 03.10(c), $x^*=2$ là nghiệm của bài gốc, $\lambda^*=2$ là nghiệm đối ngẫu và $p^*=d^*=5$.

**Kiểm tra lại.**

Kết luận khớp Ví dụ 03.1. Tính trực tiếp từ (2.4) với $\lambda=2$, $x=2$: $L(2,2)=4+1+2\cdot0=5$, nên cả hai bất đẳng thức của (2.4) là đẳng thức. Với $\lambda=3$: $g(3)=4{,}75<5$, đúng với tính chất cực đại tại $\lambda=2$.
:::

![Đồ thị hàm đối ngẫu g theo lambda không âm. Đường cong đi lên từ g(0) bằng 1, đạt đỉnh 5 tại lambda bằng 2 rồi đi xuống. Một đường nằm ngang ở mức 5 ghi p sao. Các điểm ứng với lambda bằng 1 cho g bằng 4,5 được đánh dấu như một cận chưa khít.](img/lec-03/dual-bound.svg)

Hình trên cho thấy mọi điểm của đồ thị nằm dưới đường ngang $p^*=5$, đúng với Định lý 03.8, và đồ thị chạm đường này tại đúng một nhân tử. Hệ quả 03.10 không bảo đảm sự chạm đó; Mục 3 trả lời khi nào nó xảy ra.

Quan hệ giữa đối ngẫu và chứng nhận của Bài 02 được làm rõ bằng cách tính bài đối ngẫu của một quy hoạch tuyến tính, theo Boyd và Vandenberghe (2004, mục 5.1.5, tr. 218–219). Kết quả sau dùng Định nghĩa 03.5 và tính chất: một hàm affine $x\mapsto s^Tx+r$ trên $\mathbb R^n$ bị chặn dưới khi và chỉ khi $s=0$.

::: proposition Mệnh đề 03.11 (Đối ngẫu của quy hoạch tuyến tính)
**Giả thiết.** Quy hoạch tuyến tính $\min_{x\in\mathbb R^n}c^Tx$ với các ràng buộc $\beta_i-a_i^Tx\le0$, $i=1,\ldots,k$, trong đó $a_i\in\mathbb R^n$, $\beta_i\in\mathbb R$; đặt $\beta=(\beta_1,\ldots,\beta_k)$.

**Kết luận.** Hàm đối ngẫu nhận hai loại giá trị:

- nếu $\sum_{i=1}^k\lambda_ia_i=c$ thì $g(\lambda)=\beta^T\lambda$;
- ngược lại, $g(\lambda)=-\infty$.

Bài đối ngẫu là quy hoạch tuyến tính

$$
\underset{\lambda}{\operatorname{maximize}}\quad\beta^T\lambda\qquad\text{subject to}\quad\sum_{i=1}^k\lambda_ia_i=c,\quad\lambda\succeq0 .
$$

Một nhân tử khả thi đối ngẫu chính là một bộ hệ số $\mu$ của Mệnh đề 02.11, và Định lý 03.8 cho lại Mệnh đề 02.11(a).

**Điều kiện áp dụng.** $D=\mathbb R^n$; mọi ràng buộc, kể cả $x_j\ge0$, được viết dưới dạng $\beta_i-a_i^Tx\le0$.

**Phạm vi.** Mệnh đề không khẳng định $d^*=p^*$. Ví dụ 03.5 cho dấu bằng ở bài pha trộn bằng một cặp chứng nhận; Định lý 03.15(b) cho dấu bằng với mọi quy hoạch tuyến tính khả thi có $p^*$ hữu hạn.
:::

::: proof Chứng minh Mệnh đề 03.11
**Bước 1 (gom số hạng).**

Đặt $s=c-\sum_i\lambda_ia_i$. Theo (2.2), gom các số hạng chứa $x$:

$$
\begin{aligned}
L(x,\lambda)&=c^Tx+\sum_i\lambda_i(\beta_i-a_i^Tx)\\
&=\beta^T\lambda+s^Tx .
\end{aligned}
$$

**Bước 2 (hai trường hợp).**

Nếu $s=0$, $L(\cdot,\lambda)$ là hằng số $\beta^T\lambda$, nên $g(\lambda)=\beta^T\lambda$. Nếu $s\neq0$, chọn $x=-ts$ với $t>0$:

$$
L(-ts,\lambda)=\beta^T\lambda-t\lVert s\rVert_2^2\to-\infty\quad(t\to\infty),
$$

nên $g(\lambda)=-\infty$. Căn cứ là Định nghĩa 03.5.

**Bước 3 (bài đối ngẫu và Mệnh đề 02.11).**

Bài (2.5) chỉ có ý nghĩa trên $\operatorname{dom}g$, nên điều kiện $s=0$ trở thành ràng buộc của bài đối ngẫu. Với $\lambda\succeq0$ thỏa $\sum_i\lambda_ia_i=c$, Định lý 03.8 cho $c^Tx\ge g(\lambda)=\sum_i\lambda_i\beta_i$ với mọi $x$ khả thi, là Mệnh đề 02.11(a) với $\mu=\lambda$. $\square$
:::

Mệnh đề 03.11 trả lời câu hỏi thứ nhất Bài 02 để lại: các hệ số $\mu$ của Mệnh đề 02.11 không phải đoán, chúng là nghiệm của một quy hoạch tuyến tính khác, và hệ số tốt nhất cho cận lớn nhất. Ví dụ này cũng cho thấy vì sao $g$ thường nhận giá trị $-\infty$: miền hữu hiệu của $g$ là nơi các ràng buộc đẳng thức "ẩn" của bài đối ngẫu được thỏa.

::: example Ví dụ 03.5 (Đối ngẫu của bài pha trộn)
**Lập bài đối ngẫu.**

Bài pha trộn của Ví dụ 02.5, có nghiệm ở Ví dụ 02.7: $\min3x_1+2x_2$ với $2x_1+x_2\ge4$, $x_1+2x_2\ge5$, $x_1\ge0$, $x_2\ge0$; chi phí tính theo đơn vị $10$ nghìn đồng. Viết bốn ràng buộc ở dạng của Mệnh đề 03.11: $a_1=(2,1)$, $\beta_1=4$; $a_2=(1,2)$, $\beta_2=5$; $a_3=(1,0)$, $\beta_3=0$; $a_4=(0,1)$, $\beta_4=0$. Điều kiện $\sum_i\lambda_ia_i=c=(3,2)$ là $2\lambda_1+\lambda_2+\lambda_3=3$ và $\lambda_1+2\lambda_2+\lambda_4=2$. Khử $\lambda_3,\lambda_4\ge0$ cho bài đối ngẫu

$$
\underset{\lambda_1,\lambda_2}{\operatorname{maximize}}\quad4\lambda_1+5\lambda_2\qquad\text{subject to}\quad2\lambda_1+\lambda_2\le3,\quad\lambda_1+2\lambda_2\le2,\quad\lambda_1,\lambda_2\ge0 .
$$

**Giải.**

Giải hệ hai ràng buộc chặt $2\lambda_1+\lambda_2=3$, $\lambda_1+2\lambda_2=2$: $\lambda_1=\tfrac43$, $\lambda_2=\tfrac13$, giá trị $\tfrac{16}3+\tfrac53=7$.

**Chứng nhận.**

Điểm gốc $(1,2)$ khả thi với chi phí $7$. Theo Hệ quả 03.10(c), $x^*=(1,2)$, $\lambda^*=(\tfrac43,\tfrac13,0,0)$ và $p^*=d^*=7$.

**Kiểm tra lại.**

$\lambda_3=3-\tfrac83-\tfrac13=0$ và $\lambda_4=2-\tfrac43-\tfrac23=0$, không âm. Đây đúng là bộ hệ số $\mu$ của Ví dụ 02.7. Một điểm đối ngẫu khả thi khác, $\lambda=(0,1,2,0)$, cho $g=5\le7$, đúng với Định lý 03.8.
:::

Trong Ví dụ 03.5, việc giải hệ hai ràng buộc chặt của bài đối ngẫu đã dùng một trực giác chưa được chứng minh: ở nghiệm, ràng buộc nào có nhân tử dương thì chặt. Mục 5 chứng minh trực giác này dưới tên điều kiện bù trừ.

::: example Ví dụ 03.6 (Bài toán hai chiều: hai nhân tử)
**Lập hàm Lagrange.**

Ví dụ là bài đã nêu ở đầu mục: $\min_{x\in\mathbb R^2}\tfrac12(x_1^2+x_2^2)$ với $f_1(x)=1-x_1\le0$ và $f_2(x)=2-x_2\le0$. Theo (2.2),

$$
\begin{aligned}
L(x,\lambda)&=\tfrac12(x_1^2+x_2^2)+\lambda_1(1-x_1)+\lambda_2(2-x_2)\\
&=\tfrac12\bigl[(x_1-\lambda_1)^2+(x_2-\lambda_2)^2\bigr]+\lambda_1+2\lambda_2-\tfrac12(\lambda_1^2+\lambda_2^2),
\end{aligned}
$$

trong đó dòng thứ hai hoàn thành bình phương riêng cho từng biến: $\tfrac12x_1^2-\lambda_1x_1=\tfrac12(x_1-\lambda_1)^2-\tfrac12\lambda_1^2$.

**Tính hàm đối ngẫu.**

Hai bình phương đồng thời bằng $0$ tại $x=(\lambda_1,\lambda_2)$, nên

$$
g(\lambda_1,\lambda_2)=\lambda_1+2\lambda_2-\tfrac12(\lambda_1^2+\lambda_2^2)=\tfrac52-\tfrac12\bigl[(\lambda_1-1)^2+(\lambda_2-2)^2\bigr].
$$

**Giải và chứng nhận.**

Biểu thức cuối không vượt $\tfrac52$ và bằng $\tfrac52$ tại $\lambda^*=(1,2)\succeq0$, nên $d^*=\tfrac52$. Điểm $x=(1,2)$ khả thi với $f_0=\tfrac12(1+4)=\tfrac52$; Hệ quả 03.10(c) cho $x^*=(1,2)$, $p^*=d^*=\tfrac52$.

**Kiểm tra lại.**

Khai triển $\tfrac52-\tfrac12[(\lambda_1-1)^2+(\lambda_2-2)^2]=\tfrac52-\tfrac12\lambda_1^2+\lambda_1-\tfrac12-\tfrac12\lambda_2^2+2\lambda_2-2$, bằng biểu thức trước đó. Một nhân tử chung $\lambda_1=\lambda_2=s$ cho $g=3s-s^2$, lớn nhất $\tfrac94<\tfrac52$ tại $s=\tfrac32$: đúng nhận định ở đầu mục rằng một hệ số chung không đủ.
:::

**Trong học máy.** Bài đối ngẫu thường có cấu trúc khác hẳn bài gốc và đôi khi dễ giải hơn. Máy vector hỗ trợ lề mềm là ví dụ quen thuộc: bài gốc có $d+1+N$ biến $(w,b,\xi)$, bài đối ngẫu có $N$ biến, mỗi biến ứng với một mẫu, nằm trong đoạn $[0,1]$, và dữ liệu chỉ xuất hiện qua các tích vô hướng $z_i^Tz_j$ (Mệnh đề 03.36). Giả thiết của Định lý 03.8 luôn thỏa trong các trường hợp này; điều không được bảo đảm là cận đối ngẫu tốt nhất bằng mất mát tối ưu, câu hỏi của Mục 3.

::: exercise Bài tập 03.2
Xét $\min_{x\in\mathbb R^2}x_1+x_2$ với $f_1(x)=x_1^2+x_2^2-2\le0$.

- (a) Lập $L(x,\lambda)$ và tính $g(\lambda)$ với mọi $\lambda\in\mathbb R$; xác định $\operatorname{dom}g$.
- (b) Giải bài đối ngẫu.
- (c) Tìm một điểm khả thi đạt cận và kết luận bằng Hệ quả 03.10. Hệ quả 03.10(c): nếu $x$ khả thi, $(\lambda,\nu)$ khả thi đối ngẫu và $f_0(x)=g(\lambda,\nu)$ thì $x$ là nghiệm của bài gốc, $(\lambda,\nu)$ là nghiệm đối ngẫu và $p^*=d^*$.
:::

::: hint
Với $\lambda>0$, $L$ tách thành tổng hai hàm một biến dạng $x_i+\lambda x_i^2$, mỗi hàm có cực tiểu tại $x_i=-\frac1{2\lambda}$. Với $\lambda=0$, $L=x_1+x_2$ affine; với $\lambda<0$, hệ số bậc hai âm.
:::

::: solution
**Câu (a).**

$L=x_1+x_2+\lambda(x_1^2+x_2^2-2)$. Với $\lambda>0$, mỗi số hạng $x_i+\lambda x_i^2=\lambda(x_i+\frac1{2\lambda})^2-\frac1{4\lambda}$ có cận dưới đúng $-\frac1{4\lambda}$, nên $g(\lambda)=-\frac1{2\lambda}-2\lambda$.

Với $\lambda=0$, $L=x_1+x_2$ không bị chặn dưới, $g(0)=-\infty$. Với $\lambda<0$, $L\to-\infty$ khi $x_1\to\infty$. Vậy $\operatorname{dom}g=(0,\infty)$.

**Câu (b).**

$g'(\lambda)=\frac1{2\lambda^2}-2=0$ khi $\lambda^2=\frac14$, tức $\lambda^*=\frac12$ trên $(0,\infty)$; $g'>0$ trước và $<0$ sau, nên $d^*=g(\tfrac12)=-1-1=-2$.

**Câu (c).**

Điểm cực tiểu của $L(\cdot,\tfrac12)$ là $x=(-1,-1)$, có $f_1=1+1-2=0\le0$, khả thi, và $f_0=-2=g(\tfrac12)$. Theo Hệ quả 03.10(c), $x^*=(-1,-1)$, $p^*=d^*=-2$.

**Kiểm tra lại.**

Theo Cauchy–Schwarz, $x_1+x_2\ge-\sqrt2\,\lVert x\rVert_2\ge-\sqrt2\cdot\sqrt2=-2$ trên tập khả thi, khớp $p^*=-2$.
:::

::: exercise Bài tập 03.3
Xét quy hoạch tuyến tính $\min x_1+2x_2$ với $x_1+x_2\ge2$, $x_1\ge0$, $x_2\ge0$.

- (a) Dùng Mệnh đề 03.11 viết bài đối ngẫu. Mệnh đề này phát biểu: với các ràng buộc viết ở dạng $\beta_i-a_i^Tx\le0$, bài đối ngẫu của $\min c^Tx$ là $\max_\lambda\beta^T\lambda$ với $\sum_i\lambda_ia_i=c$, $\lambda\succeq0$.
- (b) Giải bài đối ngẫu và tìm điểm gốc chứng nhận.
- (c) Nhân tử nào bằng $0$, và ràng buộc tương ứng có chặt tại nghiệm không.
:::

::: hint
Ba ràng buộc dạng $\beta_i-a_i^Tx\le0$ có $a_1=(1,1)$, $\beta_1=2$, $a_2=(1,0)$, $a_3=(0,1)$, $\beta_2=\beta_3=0$. Điều kiện $\sum_i\lambda_ia_i=c$ cho hai phương trình.
:::

::: solution
**Câu (a).**

$g(\lambda)=2\lambda_1$ khi $\lambda_1+\lambda_2=1$, $\lambda_1+\lambda_3=2$, và $-\infty$ trong trường hợp khác. Khử $\lambda_2=1-\lambda_1\ge0$, $\lambda_3=2-\lambda_1\ge0$: bài đối ngẫu là $\max2\lambda_1$ với $0\le\lambda_1\le1$.

**Câu (b).**

$\lambda_1^*=1$, nên $\lambda^*=(1,0,1)$ và $d^*=2$. Điểm $x=(2,0)$ khả thi với $f_0=2$. Theo Hệ quả 03.10(c), $x^*=(2,0)$ và $p^*=d^*=2$.

**Câu (c).**

$\lambda_2^*=0$ ứng với $x_1\ge0$, không chặt tại $x^*$ ($x_1^*=2>0$). Hai nhân tử dương ứng với $x_1+x_2\ge2$ và $x_2\ge0$, cả hai chặt tại $x^*$.

**Kiểm tra lại.**

Mọi điểm khả thi có $x_1+2x_2=(x_1+x_2)+x_2\ge2+0$, đúng là tổ hợp với hệ số $\lambda_1^*=1$, $\lambda_3^*=1$.
:::

**Chuỗi suy luận của mục.**

1. Định nghĩa 03.4: hàm Lagrange.
2. Định nghĩa 03.5: hàm đối ngẫu; Mệnh đề 03.6: hàm này lõm.
3. Định lý 03.8: đối ngẫu yếu.
4. Định nghĩa 03.9: bài đối ngẫu; Hệ quả 03.10: chứng nhận từ một cặp.
5. Mệnh đề 03.11: chứng nhận của Bài 02 là trường hợp riêng.

Đích của mục là Hệ quả 03.10: giá trị đối ngẫu tốt nhất $d^*$ không vượt $p^*$, và một cặp có khoảng bằng $0$ chứng nhận cả hai phía.

**Kết mục.** Trong bốn ví dụ của mục, khoảng $p^*-d^*$ đều bằng $0$, nhưng Định lý 03.8 không bảo đảm điều đó. Mục 3 đưa một bài toán có $d^*<p^*$, nêu điều kiện Slater kiểm tra được trước khi giải, và chứng minh rằng điều kiện đó cùng tính lồi bảo đảm $d^*=p^*$ và bài đối ngẫu đạt nghiệm.

## 3. Đối ngẫu mạnh và điều kiện Slater

Mục 2 cho $d^*\le p^*$ với mọi bài toán, và trong bốn ví dụ của mục đó dấu bằng xảy ra. Dấu bằng không luôn xảy ra. Bài chọn gói của Bài 02 (Ví dụ 02.27), viết với miền rời rạc $D=\{0,1\}^3$, có $p^*=4$; ví dụ đầu tiên của mục này tính được $d^*=3$, nên mọi nhân tử chỉ chứng nhận được rằng chi phí ít nhất là $3$.

Cần một điều kiện kiểm tra được trên dữ liệu của bài toán, trước khi giải, bảo đảm rằng cận đối ngẫu tốt nhất bằng $p^*$ và có một nhân tử đạt cận đó. Mục này định nghĩa đối ngẫu mạnh và khoảng đối ngẫu, chỉ ra rằng tính lồi chưa đủ, phát biểu điều kiện Slater, chứng minh định lý Slater bằng một bổ đề tách hai tập lồi, và nêu các giới hạn của định lý.

### 3.1 Nhu cầu: khoảng đối ngẫu có thể dương

::: example Ví dụ 03.7 (Khoảng đối ngẫu dương: bài chọn gói)
Bài toán của Ví dụ 02.27: $\min2(x_1+x_2+x_3)$ trên $D=\{0,1\}^3$ với ba ràng buộc phủ:

- ngày khô: $1-x_1-x_3\le0$;
- đêm khô: $1-x_1-x_2\le0$;
- trời mưa: $1-x_2-x_3\le0$.

Ví dụ 02.27 đã liệt kê tám phương án và cho $p^*=4$.

Boyd và Vandenberghe (2004, Bài tập 5.13, tr. 276) viết điều kiện nhị phân thành ràng buộc đẳng thức $x_j(1-x_j)=0$ và gán nhân tử cho nó. Chương này đưa điều kiện đó vào miền $D$. Phần (b) của bài tập trên cho thấy hai cách cho cùng một cận đối ngẫu, bằng giá trị nới lỏng tuyến tính.

**Hàm Lagrange.**

Theo (2.2), gom theo từng biến:

$$
L(x,\lambda)=\lambda_1+\lambda_2+\lambda_3+c_1x_1+c_2x_2+c_3x_3,
$$

với $c_1=2-\lambda_1-\lambda_2$, $c_2=2-\lambda_2-\lambda_3$, $c_3=2-\lambda_1-\lambda_3$: hệ số của $x_1$ gồm $2$ từ mục tiêu, $-\lambda_1$ từ ràng buộc ngày khô và $-\lambda_2$ từ ràng buộc đêm khô, tương tự cho $x_2$, $x_3$.

**Hàm đối ngẫu.**

$L$ tách theo từng biến, và $\min_{x_j\in\{0,1\}}c_jx_j=\min(0,c_j)$. Vì vậy

$$
g(\lambda)=\lambda_1+\lambda_2+\lambda_3+\min(0,c_1)+\min(0,c_2)+\min(0,c_3).
$$

**Giá trị đối ngẫu.**

Với mọi số thực $c$, $\min(0,c)\le\tfrac c2$: nếu $c\ge0$ thì $0\le\tfrac c2$, nếu $c<0$ thì $c<\tfrac c2$. Do đó

$$
\begin{aligned}
g(\lambda)&\le\lambda_1+\lambda_2+\lambda_3+\tfrac12(c_1+c_2+c_3)\\
&=\lambda_1+\lambda_2+\lambda_3+\tfrac12\bigl(6-2(\lambda_1+\lambda_2+\lambda_3)\bigr)\\
&=3
\end{aligned}
$$

với mọi $\lambda$. Dòng thứ hai dùng $c_1+c_2+c_3=6-2(\lambda_1+\lambda_2+\lambda_3)$, vì mỗi $\lambda_i$ xuất hiện trong đúng hai hệ số. Tại $\lambda=(1,1,1)$, $c_1=c_2=c_3=0$ và $g=3$. Vậy $d^*=3<p^*=4$.

**Kiểm tra lại.**

Con số $3$ trùng với giá trị của nới lỏng tuyến tính ở Ví dụ 02.28. Tại $\lambda=(1,1,1)$, $L(x,\lambda)=3$ với mọi $x\in\{0,1\}^3$, trong đó có ba nghiệm như $(1,1,0)$ với chi phí $4$; không có phương án khả thi nào với chi phí $3$, nên không cặp nào đạt khoảng $0$.
:::

Trong Ví dụ 03.7, tập $D$ không lồi. Định nghĩa sau đặt tên cho hiện tượng còn thiếu.

::: definition Định nghĩa 03.12 (Đối ngẫu mạnh và khoảng đối ngẫu)
Cho bài toán (2.1) với giá trị tối ưu $p^*$ và bài đối ngẫu (2.5) với giá trị tối ưu $d^*$. Khi $p^*$ và $d^*$ hữu hạn, hiệu $p^*-d^*\ge0$ gọi là khoảng đối ngẫu tối ưu (optimal duality gap). Bài toán có đối ngẫu mạnh (strong duality) nếu $d^*=p^*$. Với một điểm khả thi $x$ và một cặp khả thi đối ngẫu $(\lambda,\nu)$, hiệu $f_0(x)-g(\lambda,\nu)\ge0$ gọi là khoảng đối ngẫu của cặp (duality gap of the pair).
:::

Khoảng của một cặp và khoảng tối ưu là hai đại lượng khác nhau. Khoảng của cặp phụ thuộc vào phương án và nhân tử đang có, và luôn không nhỏ hơn khoảng tối ưu, vì $f_0(x)-g(\lambda,\nu)\ge p^*-d^*$ theo Hệ quả 03.10(b). Ví dụ: với bài (1.1), cặp $(x,\lambda)=(2,1)$ có khoảng $5-4{,}5=0{,}5$, còn khoảng tối ưu bằng $0$.

Ví dụ 03.7 có miền rời rạc, nên tính không lồi có thể là nguyên nhân của khoảng dương. Ví dụ sau cho thấy tính lồi chưa đủ: một bài lồi vẫn có thể có khoảng đối ngẫu dương.

::: example Ví dụ 03.8 (Bài toán lồi có khoảng đối ngẫu dương)
Ví dụ là Bài tập 5.21 của Boyd và Vandenberghe (2004, tr. 280). Miền $D=\{(x,y)\in\mathbb R^2\mid y>0\}$, bài toán $\min e^{-x}$ với $f_1(x,y)=\frac{x^2}y\le0$.

**Tính lồi.**

$D$ là nửa mặt phẳng mở, lồi. $e^{-x}$ có đạo hàm bậc hai $e^{-x}>0$, lồi. Hàm $\frac{x^2}y$ có Hessian $\frac2{y^3}\begin{pmatrix}y^2&-xy\\-xy&x^2\end{pmatrix}=\frac2{y^3}\begin{pmatrix}y\\-x\end{pmatrix}\begin{pmatrix}y&-x\end{pmatrix}\succeq0$ trên $D$, nên lồi theo Định lý 01.30(a). Bài toán ở dạng chuẩn của Định nghĩa 02.1.

**Giá trị gốc.**

Vì $y>0$, $\frac{x^2}y\le0$ khi và chỉ khi $x=0$. Tập khả thi là $\{(0,y)\mid y>0\}$ và $p^*=e^0=1$.

**Giá trị đối ngẫu.**

Với $\lambda\ge0$, $L=e^{-x}+\lambda\frac{x^2}y\ge0$ trên $D$. Chọn $x=k$, $y=k^3$ với $k>0$: $L=e^{-k}+\frac\lambda k\to0$ khi $k\to\infty$. Vậy $g(\lambda)=0$ với mọi $\lambda\ge0$, và $d^*=0<1=p^*$.

**Kiểm tra lại.**

Không có điểm nào của $D$ có $\frac{x^2}y<0$, nên không có khoảng dư. Bài này vi phạm điều kiện Slater theo phiên bản cho miền tổng quát (Boyd và Vandenberghe 2004, mục 5.2.3, tr. 226), mà Định nghĩa 03.13 và Định lý 03.15 dưới đây phát biểu cho $D=\mathbb R^n$.
:::

### 3.2 Trực giác: khoảng dư tại một điểm

Trong bài (1.1), viết lại ràng buộc thành $f_1(x)=(x-3)^2-1\le0$, cùng tập khả thi $[2,4]$ vì $(x-2)(x-4)=(x-3)^2-1$. Tại $\bar x=3$, $f_1(3)=-1<0$: ràng buộc còn dư một đơn vị. Mọi điểm gần $3$ cũng thỏa chặt: nếu $\lvert x-3\rvert\le0{,}5$ thì $f_1(x)\le0{,}25-1=-0{,}75<0$.

Bài $\min x_1+x_2$ với $x_1^2+x_2^2\le0$ thì khác: tập khả thi chỉ gồm gốc tọa độ, và không điểm nào làm ràng buộc âm.

Trực giác (chưa phải định nghĩa): khi tập khả thi có một điểm mà mọi bất đẳng thức đều còn dư, nhiễu nhỏ trên ràng buộc không làm tập khả thi biến mất. Mục 4 dịch trực giác này sang hình học; ở đây nó chỉ được dùng để dẫn tới định nghĩa.

![Trục số với đoạn khả thi từ 2 đến 4 được tô. Điểm Slater 3 nằm giữa đoạn; một dải con từ 2,5 đến 3,5 quanh điểm 3 được tô đậm hơn, ghi chú rằng mọi điểm trong dải vẫn thỏa chặt ràng buộc (x trừ 3) bình phương trừ 1 nhỏ hơn 0. Nghiệm tối ưu 2 nằm ở biên trái của đoạn, khác điểm Slater.](img/lec-03/slater-interior.svg)

Hình trên đặt điểm Slater $\bar x=3$ và nghiệm $x^*=2$ trên cùng trục. Điểm Slater dùng để kiểm tra giả thiết, không phải ứng viên nghiệm: $f_0(3)=10$, còn $f_0(2)=5$, và nghiệm nằm trên biên, nơi ràng buộc không còn dư.

### 3.3 Điều kiện Slater

::: definition Định nghĩa 03.13 (Điều kiện Slater và dạng yếu)
Cho bài toán (2.1) ở dạng chuẩn lồi của Định nghĩa 02.1 với $D=\mathbb R^n$. Bài toán thỏa điều kiện Slater (Slater's condition) nếu tồn tại $\bar x\in\mathbb R^n$ với

$$
f_i(\bar x)<0,\quad i=1,\ldots,m,\qquad A\bar x=b .
\tag{3.1}
$$

Điểm $\bar x$ gọi là điểm Slater, hay điểm khả thi chặt. Khi $f_1,\ldots,f_k$ là hàm affine, bài toán thỏa dạng yếu của điều kiện Slater nếu tồn tại $\bar x$ với $f_i(\bar x)\le0$ cho $i\le k$, $f_i(\bar x)<0$ cho $i>k$ và $A\bar x=b$.
:::

Điều kiện (3.1) đòi một điểm duy nhất làm mọi bất đẳng thức âm cùng lúc; mỗi bất đẳng thức âm tại một điểm riêng là chưa đủ, vì chúng có thể không có điểm chung. Đẳng thức không cần khoảng dư: chỉ cần $\bar x$ thỏa đúng $A\bar x=b$.

Dạng yếu bỏ yêu cầu khoảng dư cho các bất đẳng thức affine; khi mọi ràng buộc đều affine, dạng yếu chỉ còn đòi bài toán khả thi. Với miền $D$ tổng quát, $\bar x$ phải thuộc phần trong tương đối (relative interior) của $D$, tức là có một lân cận của $\bar x$ mà phần nằm trong bao affine của $D$ thuộc $D$; xem Boyd và Vandenberghe 2004, mục 2.1.3, tr. 23 và mục 5.2.3, tr. 226.

Ví dụ: bài (1.1) với $\bar x=3$ thỏa (3.1). Phản ví dụ: bài $\min x_1+x_2$ với $x_1^2+x_2^2\le0$ không thỏa, vì $x_1^2+x_2^2\ge0$ mọi nơi.

Điều kiện Slater là một điều kiện chính quy của ràng buộc (constraint qualification): nó chỉ nói về các hàm ràng buộc, không nói về mục tiêu, và kiểm tra bằng cách chỉ ra một điểm. Nó mạnh hơn tính khả thi, vốn chỉ đòi một $x$ với $f_i(x)\le0$.

So với giả thiết "tập khả thi có điểm trong", điều kiện Slater là phát biểu về cách viết ràng buộc. Hai cách viết tương đương của cùng một tập có thể một cách thỏa, một cách không; Nhận xét 03.17 đưa ví dụ.

Chứng minh định lý Slater cần một công cụ hình học: tách hai tập lồi rời nhau bằng một siêu phẳng. Trực giác: trong $\mathbb R$, hai đoạn rời nhau $[1,2]$ và $[-2,0]$ được tách bởi điểm $\tfrac12$, với $z\ge\tfrac12\ge w$ cho mọi $z\in[1,2]$, $w\in[-2,0]$; trong $\mathbb R^d$, điểm tách được thay bằng siêu phẳng $\{x\mid q^Tx=c\}$ với pháp tuyến $q\neq0$. Bổ đề sau chỉ cần dạng yếu của phép tách, với bất đẳng thức không chặt.

::: lemma Bổ đề 03.14 (Tách hai tập lồi, dạng yếu)
**Giả thiết.** $\mathcal C,\mathcal B\subseteq\mathbb R^d$, $d\ge1$, là hai tập lồi, không rỗng, rời nhau.

**Kết luận.** Tồn tại $q\in\mathbb R^d$, $q\neq0$, và $c\in\mathbb R$ sao cho

$$
q^Tz\ge c\ge q^Tw\qquad\forall z\in\mathcal C,\ \forall w\in\mathcal B .
$$

**Điều kiện áp dụng.** Không cần hai tập đóng, bị chặn hay có điểm trong.

**Phạm vi.** Bổ đề không cho tách chặt $q^Tz>c>q^Tw$; với $\mathcal C=(0,1)$ và $\mathcal B=\{0\}$, tách chặt không tồn tại. Đây là định lý siêu phẳng tách của Boyd và Vandenberghe (2004, mục 2.5.1, tr. 46–49); giáo trình chứng minh trường hợp hai tập có khoảng cách dương đạt được, và để trường hợp tổng quát thành Bài tập 2.22 (tr. 63).
:::

Chứng minh dưới đây dùng ba tính chất của tập compact trong $\mathbb R^d$, theo Rudin (1976):

1. một tập là compact khi mọi họ tập mở phủ nó có một họ con hữu hạn vẫn phủ nó (Định nghĩa 2.32), và trong $\mathbb R^d$ tập đóng, bị chặn là compact (Định lý 2.41, tr. 40, định lý Heine–Borel);
2. ảnh của tập compact qua ánh xạ liên tục là compact (Định lý 4.14, tr. 89);
3. hàm liên tục trên tập compact không rỗng đạt giá trị nhỏ nhất, theo Định lý 01.36.

 Ý chính: tách gốc tọa độ khỏi tập hiệu $\mathcal C-\mathcal B$, trước hết cho mỗi tập con hữu hạn bằng điểm gần gốc nhất, rồi chuyển sang toàn bộ tập bằng tính compact của mặt cầu đơn vị.

::: proof Chứng minh Bổ đề 03.14
**Bước 1 (tập hiệu).**

Đặt $\mathcal E=\mathcal C-\mathcal B=\{z-w\mid z\in\mathcal C,\ w\in\mathcal B\}$. $\mathcal E$ không rỗng vì hai tập không rỗng. $\mathcal E$ lồi: với $e_1=z_1-w_1$, $e_2=z_2-w_2$ thuộc $\mathcal E$ và $\alpha\in[0,1]$, $\alpha e_1+(1-\alpha)e_2=z_\alpha-w_\alpha$ với $z_\alpha=\alpha z_1+(1-\alpha)z_2\in\mathcal C$ và $w_\alpha=\alpha w_1+(1-\alpha)w_2\in\mathcal B$ do tính lồi (Định nghĩa 01.18). $0\notin \mathcal E$: nếu $0=z-w$ thì $z=w\in\mathcal C\cap\mathcal B$, trái giả thiết rời nhau.

**Bước 2 (một tập con hữu hạn).**

Lấy tập hữu hạn không rỗng $F=\{e_1,\ldots,e_k\}\subseteq \mathcal E$ và đặt $K=\{\sum_{i=1}^k\alpha_ie_i\mid\alpha_i\ge0,\ \sum_i\alpha_i=1\}$. Tập hệ số $\Delta_k=\{\alpha\in\mathbb R^k\mid\alpha\succeq0,\ \mathbf 1^T\alpha=1\}$ đóng và bị chặn, nên compact; $K$ là ảnh của $\Delta_k$ qua ánh xạ tuyến tính, liên tục $\alpha\mapsto\sum_i\alpha_ie_i$, nên compact. Mỗi phần tử của $K$ là tổ hợp lồi của các điểm thuộc tập lồi $\mathcal E$, nên thuộc $\mathcal E$ (quy nạp theo $k$ trên Định nghĩa 01.18); do đó $0\notin K$.

**Bước 3 (điểm gần gốc nhất).**

Hàm $x\mapsto\lVert x\rVert_2$ liên tục trên tập compact không rỗng $K$, nên đạt giá trị nhỏ nhất tại một $\pi\in K$ (Định lý 01.36), và $\pi\neq0$ vì $0\notin K$. Với $z\in K$ và $t\in(0,1]$, điểm $\pi+t(z-\pi)=(1-t)\pi+tz$ thuộc $K$ vì $K$ lồi, nên $\lVert\pi+t(z-\pi)\rVert_2^2\ge\lVert\pi\rVert_2^2$. Khai triển vế trái, trừ $\lVert\pi\rVert_2^2$ và chia cho $t>0$:

$$
2\pi^T(z-\pi)+t\lVert z-\pi\rVert_2^2\ge0\qquad\forall t\in(0,1].
$$

Cho $t\to0^+$, giới hạn giữ chiều bất đẳng thức: $\pi^Tz\ge\lVert\pi\rVert_2^2>0$. Đặt $q_F=\pi/\lVert\pi\rVert_2$, có $\lVert q_F\rVert_2=1$ và $q_F^Tz\ge\lVert\pi\rVert_2>0$ với mọi $z\in K$, nói riêng với mọi $z\in F$.

**Bước 4 (từ hữu hạn sang toàn bộ $\mathcal E$).**

Gọi $S=\{q\in\mathbb R^d\mid\lVert q\rVert_2=1\}$, đóng và bị chặn nên compact. Với mỗi $e\in \mathcal E$, đặt $H_e=\{q\in S\mid q^Te\ge0\}$, là nghịch ảnh của $[0,\infty)$ qua hàm liên tục $q\mapsto q^Te$, nên đóng; phần bù $S\setminus H_e$ mở trong $S$. Theo Bước 3, với mọi tập hữu hạn $\{e_1,\ldots,e_k\}\subseteq \mathcal E$, vector $q_F$ thuộc $H_{e_1}\cap\cdots\cap H_{e_k}$, nên giao hữu hạn này không rỗng.

Giả sử $\bigcap_{e\in \mathcal E}H_e=\varnothing$. Khi đó họ $\{S\setminus H_e\mid e\in \mathcal E\}$ phủ $S$, và tính compact cho các $e_1,\ldots,e_k$ với $S=\bigcup_{i=1}^k(S\setminus H_{e_i})$, tức $H_{e_1}\cap\cdots\cap H_{e_k}=\varnothing$, mâu thuẫn. Vậy có $q\in S$, nên $q\neq0$, với $q^Te\ge0$ cho mọi $e\in \mathcal E$.

**Bước 5 (chọn $c$).**

Với $z\in\mathcal C$, $w\in\mathcal B$: $z-w\in \mathcal E$ nên $q^Tz\ge q^Tw$. Cố định $z_0\in\mathcal C$, $w_0\in\mathcal B$. Số $s=\sup_{w\in\mathcal B}q^Tw$ thỏa $s\le q^Tz_0<\infty$, số $t=\inf_{z\in\mathcal C}q^Tz$ thỏa $t\ge q^Tw_0>-\infty$, và $s\le t$ vì mọi $q^Tw$ không vượt mọi $q^Tz$. Chọn $c\in[s,t]$: $q^Tz\ge t\ge c$ với mọi $z\in\mathcal C$ và $q^Tw\le s\le c$ với mọi $w\in\mathcal B$. $\square$
:::

Bổ đề 03.14 biến một khẳng định về hai tập, rằng chúng không giao nhau, thành một khẳng định về hàm tuyến tính $q^Tx$: hàm này không nhỏ hơn $c$ trên tập thứ nhất và không lớn hơn $c$ trên tập thứ hai.

Bất đẳng thức $q^Tz\ge c$ trên một tập có đúng dạng của một cận dưới. Định lý sau dùng nó, với tập thứ nhất là tập các mức ràng buộc và mục tiêu đạt được, để sinh ra nhân tử.

Ví dụ $\mathcal C=(0,1)$, $\mathcal B=\{0\}$ cho thấy vì sao chỉ có tách yếu. Với $q=1$, $c=0$, hai tập được tách yếu. Giả sử có tách chặt $qz>c>q\cdot0=0$ với mọi $z\in(0,1)$; khi đó $c>0$, và $q>0$ vì $qz>0$ với $z>0$. Áp cho $z=\frac1k$ được $\frac qk>c$ với mọi $k\ge2$; cho $k\to\infty$ được $0\ge c$, mâu thuẫn.

Định lý sau cho biết khi nào $d^*=p^*$ và có nhân tử đạt cận; nó cần đối ngẫu yếu (Định lý 03.8), Bổ đề 03.14 và tính lồi của các hàm ràng buộc. Chứng minh theo cấu trúc của Boyd và Vandenberghe (2004, mục 5.3.2, tr. 234–236).

::: theorem Định lý 03.15 (Định lý Slater)
**Giả thiết.** Bài toán (2.1) ở dạng chuẩn lồi (Định nghĩa 02.1) với $D=\mathbb R^n$: các hàm $f_0,f_1,\ldots,f_m:\mathbb R^n\to\mathbb R$ lồi, ràng buộc đẳng thức $Ax=b$; giá trị tối ưu $p^*$ hữu hạn.

**Kết luận.**

- (a) Nếu bài toán thỏa điều kiện Slater (3.1) thì $d^*=p^*$ và bài đối ngẫu đạt nghiệm: có $\lambda^*\succeq0$, $\nu^*$ với $g(\lambda^*,\nu^*)=p^*$.
- (b) Kết luận của (a) vẫn đúng nếu chỉ thỏa dạng yếu của điều kiện Slater.

**Điều kiện áp dụng.** Cần tính lồi của mọi $f_i$, tính affine của đẳng thức, khoảng dư tại một điểm, và $p^*>-\infty$. Nếu $p^*=-\infty$, đối ngẫu yếu cho $d^*=-\infty$ và không có nhân tử nào đáng tìm.

**Phạm vi.** Định lý không bảo đảm bài gốc đạt nghiệm; Ví dụ 03.11 là phản ví dụ. Điều kiện Slater là điều kiện đủ, không phải điều kiện cần; xem Ví dụ 03.10 và Bài tập 03.5. Chương chứng minh phần (a). Phần (b) và phiên bản với miền $D$ tổng quát, có điểm Slater trong phần trong tương đối của $D$, nằm ngoài phạm vi học phần: Boyd và Vandenberghe (2004) phát biểu ở mục 5.2.3, tr. 226–227, và chứng minh phần (a) khi $D$ có điểm trong ở mục 5.3.2, tr. 234–236.
:::

::: proof Chứng minh Định lý 03.15(a)
**Chuẩn bị (rút gọn hệ đẳng thức).**

Vì $A\bar x=b$, hệ $Ax=b$ có nghiệm. Giữ một tập tối đại các hàng độc lập tuyến tính của $A$ cùng các phần tử tương ứng của $b$; mỗi hàng bỏ đi là tổ hợp tuyến tính của các hàng giữ lại, và vì hệ có nghiệm, phần tử tương ứng của $b$ là cùng tổ hợp đó của các phần tử giữ lại, nên tập khả thi không đổi. Trong chứng minh, $A\in\mathbb R^{p\times n}$ ký hiệu ma trận đã rút gọn, có các hàng độc lập tuyến tính. Đặt $f(x)=(f_1(x),\ldots,f_m(x))\in\mathbb R^m$.

**Bước 1 (hai tập lồi rời nhau).**

Xét trong $\mathbb R^m\times\mathbb R^p\times\mathbb R$

$$
\mathcal A=\{(u,v,t)\mid\exists x\in\mathbb R^n:\ f(x)\preceq u,\ Ax-b=v,\ f_0(x)\le t\},\qquad\mathcal B=\{(0,0,s)\mid s<p^*\}.
$$

Tập $\mathcal A$ gồm các bộ mức (ràng buộc, đẳng thức, mục tiêu) mà một điểm $x$ đáp ứng được; Mục 4 nghiên cứu lại tập này.

$\mathcal A$ không rỗng (chứa $(f(x),Ax-b,f_0(x))$ với mọi $x$) và lồi: lấy $(u_1,v_1,t_1)$, $(u_2,v_2,t_2)$ trong $\mathcal A$ với các điểm $x_1$, $x_2$, và $\alpha\in[0,1]$; đặt $x_\alpha=\alpha x_1+(1-\alpha)x_2$. Tính lồi của từng $f_i$ cho $f_i(x_\alpha)\le\alpha f_i(x_1)+(1-\alpha)f_i(x_2)\le\alpha u_{1,i}+(1-\alpha)u_{2,i}$; tương tự $f_0(x_\alpha)\le\alpha t_1+(1-\alpha)t_2$; tính affine cho $Ax_\alpha-b=\alpha v_1+(1-\alpha)v_2$. Vậy tổ hợp lồi của hai bộ thuộc $\mathcal A$ với điểm $x_\alpha$.

$\mathcal B$ là một nửa đường thẳng mở, không rỗng (vì $p^*$ hữu hạn) và lồi. Hai tập rời nhau: một điểm chung $(0,0,s)$ cho $x$ với $f(x)\preceq0$, $Ax=b$, $f_0(x)\le s<p^*$, tức một điểm khả thi có giá trị nhỏ hơn $p^*$, trái với định nghĩa cận dưới đúng.

**Bước 2 (áp dụng bổ đề tách).**

Bổ đề 03.14 trong $\mathbb R^{m+p+1}$ cho $(a,\beta,\mu)\neq0$ và $c$ với

$$
a^Tu+\beta^Tv+\mu t\ge c\quad\forall(u,v,t)\in\mathcal A,\qquad\mu s\le c\quad\forall s<p^*.
$$

Nếu một $(u,v,t)\in\mathcal A$ thì mọi $(u',v,t')$ với $u'\succeq u$, $t'\ge t$ cũng thuộc $\mathcal A$ (cùng điểm $x$). Nếu $a_i<0$, tăng riêng $u_i$ làm vế trái tiến tới $-\infty$, trái với cận $c$; vậy $a\succeq0$. Tương tự, tăng $t$ cho $\mu\ge0$. Cho $s\to p^*$ từ dưới trong bất đẳng thức trên $\mathcal B$: $\mu p^*\le c$. Thay điểm $(f(x),Ax-b,f_0(x))\in\mathcal A$:

$$
\sum_{i=1}^ma_if_i(x)+\beta^T(Ax-b)+\mu f_0(x)\ge\mu p^*\qquad\forall x\in\mathbb R^n .
\tag{3.2}
$$

**Bước 3 (điều kiện Slater buộc $\mu>0$).**

Giả sử $\mu=0$. Thay $x=\bar x$ vào (3.2): $A\bar x=b$ nên $\sum_ia_if_i(\bar x)\ge0$. Mỗi số hạng $a_if_i(\bar x)\le0$ vì $a_i\ge0$, $f_i(\bar x)<0$; nếu có $a_j>0$ thì số hạng thứ $j$ âm và tổng âm, mâu thuẫn. Vậy $a=0$.

Đây là chỗ dùng dấu chặt $f_i(\bar x)<0$: với $f_i(\bar x)=0$, số hạng bằng $0$ dù $a_i>0$.

Khi $a=0$ và $\mu=0$, (3.2) thành $\beta^T(Ax-b)\ge0$ với mọi $x$. Chọn $x=\bar x-A^T\beta$: $\beta^T(A\bar x-b-AA^T\beta)=-\lVert A^T\beta\rVert_2^2\ge0$, nên $A^T\beta=0$, và vì các hàng của $A$ độc lập tuyến tính, $\beta=0$. Khi đó $(a,\beta,\mu)=0$, trái với Bước 2. Vậy $\mu>0$.

**Bước 4 (dựng nhân tử).**

Đặt $\lambda^*=a/\mu\succeq0$, $\nu^*=\beta/\mu$. Chia (3.2) cho $\mu>0$: $L(x,\lambda^*,\nu^*)\ge p^*$ với mọi $x$, nên $g(\lambda^*,\nu^*)\ge p^*$ theo Định nghĩa 03.5. Cùng với Hệ quả 03.10(b),

$$
\begin{aligned}
p^*&\le g(\lambda^*,\nu^*)\\
&\le d^*\\
&\le p^* .
\end{aligned}
$$

Dòng đầu vừa chứng minh, dòng thứ hai là định nghĩa của $d^*$, dòng thứ ba là đối ngẫu yếu. Hai đầu bằng nhau, nên mọi dấu là đẳng thức: $d^*=p^*$ và $(\lambda^*,\nu^*)$ là nghiệm đối ngẫu. Với hệ đẳng thức ban đầu, gán nhân tử $0$ cho các hàng đã bỏ; hàm Lagrange không đổi. $\square$
:::

Định lý Slater biến một điều kiện kiểm tra bằng một điểm thành một kết luận về hai giá trị tối ưu. Vai trò của từng giả thiết hiện rõ trong chứng minh:

- tính lồi dùng ở Bước 1 để $\mathcal A$ lồi, điều kiện cần cho Bổ đề 03.14;
- khoảng dư dùng ở Bước 3 để loại trường hợp $\mu=0$, tức siêu phẳng tách thẳng đứng;
- $p^*$ hữu hạn dùng để $\mathcal B$ không rỗng.

Ví dụ 03.7 vi phạm tính lồi và có khoảng $1$. Ví dụ 03.8 vi phạm điều kiện Slater theo phiên bản cho miền tổng quát và cũng có khoảng $1$.

So với Định lý 03.8, Định lý 03.15 cho kết luận mạnh hơn, gồm dấu bằng và nhân tử đạt, và đòi hai giả thiết mà đối ngẫu yếu không cần.

So với Mệnh đề 02.11, định lý trả lời câu hỏi thứ hai Bài 02 để lại. Với quy hoạch tuyến tính khả thi có giá trị tối ưu hữu hạn, phần (b) cho các hệ số chứng nhận luôn tồn tại. Phần (b) được dẫn từ Boyd và Vandenberghe (2004, tr. 226–227) và không được chứng minh ở đây.

::: example Ví dụ 03.9 (Kiểm tra điều kiện Slater cho hai bài đã giải)
**Dữ kiện.**

Bài (1.1): $\min_{x\in\mathbb R}f_0(x)=x^2+1$ với $f_1(x)=(x-2)(x-4)\le0$, với $p^*=5$, $\lambda^*=2$ (Ví dụ 03.1, 03.4). Bài hai chiều (Ví dụ 03.6): $\min\tfrac12(x_1^2+x_2^2)$ với $f_1(x)=1-x_1\le0$, $f_2(x)=2-x_2\le0$, $p^*=\tfrac52$. Điều kiện Slater (3.1): có $\bar x$ với $f_i(\bar x)<0$ với mọi $i$ và $A\bar x=b$. Định lý 03.15(a): bài lồi dạng chuẩn với $D=\mathbb R^n$, $p^*$ hữu hạn và thỏa (3.1) thì $d^*=p^*$ và bài đối ngẫu đạt nghiệm.

**Bài (1.1).**

$f_0''(x)=2>0$ và $f_1''(x)=2>0$, nên hai hàm lồi trên $\mathbb R$ (Định lý 01.30). Điểm $\bar x=3$ cho $f_1(3)=1\cdot(-1)=-1<0$. Giá trị $p^*=5$ hữu hạn (Ví dụ 03.1). Định lý 03.15(a) cho $d^*=5$ và có $\lambda^*$; Ví dụ 03.4 đã tìm được $\lambda^*=2$.

**Bài hai chiều của Ví dụ 03.6.**

Mục tiêu có Hessian $I\succ0$, hai ràng buộc affine. Điểm $\bar x=(2,3)$ cho $f_1=1-2=-1<0$ và $f_2=2-3=-1<0$. Mục tiêu không âm, nên $0\le p^*\le f_0(\bar x)=\tfrac{13}2$: hữu hạn. Định lý cho $d^*=p^*$.

**Kiểm tra lại.**

Trong cả hai bài, điểm Slater không phải nghiệm: $f_0(3)=10\neq5$ và $f_0(2,3)=\tfrac{13}2\neq\tfrac52$.
:::

### 3.4 Giới hạn của điều kiện Slater

::: example Ví dụ 03.10 (Thiếu điều kiện Slater: đối ngẫu mạnh đạt hoặc không đạt)
**Bài thứ nhất.**

$\min_{x\in\mathbb R^2}x_1+x_2$ với $f_1(x)=x_1^2+x_2^2\le0$. Tập khả thi là $\{(0,0)\}$, nên $p^*=0$; không điểm nào có $f_1<0$, điều kiện Slater không thỏa.

Với $\lambda=0$, $L=x_1+x_2$ không bị chặn dưới, $g(0)=-\infty$.

Với $\lambda>0$, $L=\sum_{i=1}^2\bigl(\lambda(x_i+\frac1{2\lambda})^2-\frac1{4\lambda}\bigr)$, nên $g(\lambda)=-\frac1{2\lambda}$. Khi $\lambda\to\infty$, $g(\lambda)\to0$, nên $d^*=0=p^*$; nhưng $g(\lambda)<0$ với mọi $\lambda$ hữu hạn, nên bài đối ngẫu không đạt nghiệm.

**Bài thứ hai.**

Cùng ràng buộc, mục tiêu $x_1^2+x_2^2$. Vẫn $p^*=0$ và không có điểm Slater. Nhưng $L=(1+\lambda)(x_1^2+x_2^2)$ có cận dưới đúng $0$ với mọi $\lambda\ge0$, nên $g\equiv0$ trên $[0,\infty)$, $d^*=0=p^*$ và mọi $\lambda\ge0$ là nghiệm đối ngẫu.

**Kiểm tra lại.**

Bài thứ nhất: $g(1)=-0{,}5$, $g(100)=-0{,}005$, tăng về $0$. Bài thứ hai: tại $\lambda=5$, $L(x,5)=6\lVert x\rVert_2^2\ge0$, bằng $0$ tại gốc.
:::

Ví dụ 03.10 cho thấy thiếu điều kiện Slater không kéo theo khoảng đối ngẫu dương; điều bị mất có thể chỉ là sự đạt nghiệm của bài đối ngẫu. Ví dụ sau chỉ ra phần định lý Slater không hứa.

::: example Ví dụ 03.11 (Điều kiện Slater thỏa nhưng bài gốc không đạt nghiệm)
**Bài toán và giả thiết.**

Bài $\min_{x\in\mathbb R}e^x$ với $f_1(x)=x\le0$. Hai hàm lồi, và $\bar x=-1$ cho $f_1=-1<0$. Giá trị $p^*=\inf_{x\le0}e^x=0$ hữu hạn nhưng không đạt, vì $e^x>0$.

**Hàm đối ngẫu.**

$g(0)=\inf_xe^x=0$. Với $\lambda>0$, $e^x+\lambda x\to-\infty$ khi $x\to-\infty$, nên $g(\lambda)=-\infty$.

**Kết luận.**

$d^*=0=p^*$ và $\lambda^*=0$ là nghiệm đối ngẫu, đúng như Định lý 03.15(a) bảo đảm, trong khi bài gốc không có nghiệm.

**Kiểm tra lại.**

$\operatorname{dom}g\cap[0,\infty)=\{0\}$, nên bài đối ngẫu chỉ có một điểm khả thi, và giá trị tại đó bằng $p^*$.
:::

::: remark Nhận xét 03.16 (Ba mệnh đề cần tách biệt)
Ba mệnh đề "$d^*=p^*$", "bài đối ngẫu đạt nghiệm" và "bài gốc đạt nghiệm" phải được tách biệt, vì đối ngẫu mạnh không kéo theo một trong hai mệnh đề còn lại:

- Ví dụ 03.10, bài thứ nhất, có mệnh đề thứ nhất và thứ ba mà không có mệnh đề thứ hai;
- Ví dụ 03.11 có mệnh đề thứ nhất và thứ hai mà không có mệnh đề thứ ba.

Chứng nhận tối ưu theo Hệ quả 03.10(c) cần cả ba. Nhầm lẫn thường gặp là đọc "đối ngẫu mạnh" thành "có nhân tử chứng nhận nghiệm".
:::

::: remark Nhận xét 03.17 (Điều kiện Slater phụ thuộc cách viết; bài không lồi vẫn có thể có đối ngẫu mạnh)
**Cách viết quyết định điều kiện Slater.** Viết ràng buộc $x_1^2+x_2^2\le0$ của Ví dụ 03.10 thành hai đẳng thức affine $x_1=0$, $x_2=0$ cho một cải dạng tương đương theo Định nghĩa 02.5. Cách viết mới thỏa điều kiện Slater, vì đẳng thức không cần khoảng dư. Với nó, $L=x_1+x_2+\nu_1x_1+\nu_2x_2$, và $\nu=(-1,-1)$ cho $g=0=p^*$, đạt.

**Đối ngẫu mạnh không đòi tính lồi.** Bài $\min-x^2$ với $x^2-1\le0$ không lồi, có $p^*=-1$; $L=(\lambda-1)x^2-\lambda$ cho $g(\lambda)=-\lambda$ khi $\lambda\ge1$ và $-\infty$ khi $\lambda<1$, nên $d^*=g(1)=-1=p^*$. Bài toàn phương với một ràng buộc toàn phương có tính chất này (Boyd và Vandenberghe 2004, mục 5.2.4, tr. 229).

**Nhầm lẫn thường gặp.** Kết luận "bài không lồi thì có khoảng đối ngẫu dương" là sai, vì Định lý 03.15 chỉ cho điều kiện đủ.
:::

**Trong học máy.** Quy hoạch bậc hai của máy vector hỗ trợ lề mềm trong Mệnh đề 02.39(a) có điểm Slater $w=0$, $b=0$, $\xi_i=2$: mọi ràng buộc $1-y_i(w^Tz_i+b)-\xi_i=-1<0$ và $-\xi_i=-2<0$. Mục tiêu lồi và $p^*\ge0$ hữu hạn, nên Định lý 03.15 cho $d^*=p^*$ và bài đối ngẫu đạt nghiệm. Giải bài đối ngẫu $N$ biến của Mệnh đề 03.36 vì vậy cho đúng mất mát tối ưu. Đây là cơ sở của các bộ giải theo bài đối ngẫu, như thuật toán tối ưu cực tiểu tuần tự (sequential minimal optimization, SMO) do Platt đề xuất năm 1998.

Hồi quy có trần $\lVert w\rVert_2^2\le\tau$ với $\tau>0$ có điểm Slater $w=0$.

Ngược lại, khi ràng buộc đặt trên đầu ra của một mạng sâu, chẳng hạn ràng buộc công bằng giữa các nhóm, hàm ràng buộc không lồi theo tham số $\theta$ và giả thiết của Định lý 03.15 vi phạm. Định lý 03.8 vẫn đúng, nhưng $g(\lambda)$ đòi cực tiểu toàn cục của $L(\cdot,\lambda)$ theo $\theta$, và với mạng sâu đại lượng này không tính được.

Một bộ tối ưu lặp chỉ cho một điểm $\theta_k$ với $L(\theta_k,\lambda)\ge g(\lambda)$. Giá trị thu được vì vậy là ước lượng trên của $g(\lambda)$, không phải một cận dưới đã chứng nhận của $p^*$.

::: exercise Bài tập 03.4
Với mỗi bài sau, xác định bài có ở dạng chuẩn lồi không, có thỏa điều kiện Slater (3.1) không, có thỏa dạng yếu không, và Định lý 03.15 kết luận được gì. Điều kiện Slater (3.1) đòi một điểm $\bar x$ với $f_i(\bar x)<0$ cho mọi $i$ và $A\bar x=b$; dạng yếu nới thành $f_i(\bar x)\le0$ cho các $f_i$ affine, vẫn giữ $f_i(\bar x)<0$ cho các $f_i$ còn lại và $A\bar x=b$. Định lý 03.15: với bài lồi dạng chuẩn, $D=\mathbb R^n$ và $p^*$ hữu hạn, điều kiện Slater hoặc dạng yếu của nó kéo theo $d^*=p^*$ và bài đối ngẫu đạt nghiệm.

- (a) $\min x_1^2+x_2^2$ với $1-x_1-x_2\le0$ và $x_1-x_2=0$.
- (b) $\min x_1$ với $x_1+x_2\le0$ và $-x_1-x_2\le0$.
- (c) $\min x$ với $x^3\le0$, $x\in\mathbb R$.
:::

::: hint
Với (b), cộng hai ràng buộc. Với (c), xét dấu của đạo hàm bậc hai của $x^3$.
:::

::: solution
**Câu (a).**

Mục tiêu lồi, ràng buộc affine: dạng chuẩn lồi. Điểm $\bar x=(1,1)$: $1-2=-1<0$ và $1-1=0$. Slater thỏa; $p^*\ge0$ hữu hạn, nên $d^*=p^*$ và bài đối ngẫu đạt nghiệm.

**Câu (b).**

Hai ràng buộc cho $x_1+x_2=0$, nên không điểm nào làm cả hai âm: (3.1) không thỏa. Mọi ràng buộc affine, và bài khả thi, nên dạng yếu thỏa. Tuy nhiên trên tập khả thi $\{(s,-s)\}$, mục tiêu $x_1=s$ không bị chặn dưới, $p^*=-\infty$; Định lý 03.15 không áp dụng, và đối ngẫu yếu cho $d^*=-\infty$.

**Câu (c).**

$(x^3)''=6x$ âm khi $x<0$, nên $x^3$ không lồi: bài không ở dạng chuẩn lồi dù tập khả thi $(-\infty,0]$ lồi. Định lý 03.15 không áp dụng. Thực tế $p^*=-\infty$. Viết lại thành $x\le0$ cho dạng chuẩn lồi, và Slater thỏa với $\bar x=-1$, nhưng $p^*=-\infty$ vẫn chặn kết luận.

**Kiểm tra lại.**

Ở (a), giải trực tiếp: $x_1=x_2=s$ với $2s\ge1$, mục tiêu $2s^2$ nhỏ nhất tại $s=\tfrac12$, $p^*=\tfrac12$, hữu hạn.
:::

::: exercise Bài tập 03.5
Xét $\min_{x\in\mathbb R^2}x_1$ với $f_1(x)=(x_1-1)^2+x_2^2-1\le0$ và $f_2(x)=(x_1+1)^2+x_2^2-1\le0$.

- (a) Tìm tập khả thi, $p^*$, và chứng tỏ điều kiện Slater không thỏa.
- (b) Tính $g(\lambda_1,\lambda_2)$ khi $\lambda_1+\lambda_2>0$.
- (c) Chứng tỏ $d^*=p^*$ và bài đối ngẫu đạt nghiệm. Ví dụ này nói gì về chiều ngược của Định lý 03.15.
:::

::: hint
Hai hình tròn đóng bán kính $1$, tâm $(1,0)$ và $(-1,0)$, chỉ chung một điểm. Khai triển $L$ và gom theo $x_1$, $x_2$.
:::

::: solution
**Câu (a).**

Điểm khả thi nằm trong cả hai hình tròn; khoảng cách giữa hai tâm bằng $2$, tổng bán kính, nên giao chỉ gồm $(0,0)$: thật vậy, cộng hai ràng buộc cho $2x_1^2+2x_2^2\le0$. Vậy $p^*=0$. Một điểm Slater phải nằm trong phần trong của cả hai hình tròn, mà hai phần trong rời nhau.

**Câu (b).**

Khai triển hai ràng buộc; các hằng số $\lambda_1(1-1)$ và $\lambda_2(1-1)$ triệt tiêu:

$$
L=x_1+(\lambda_1+\lambda_2)(x_1^2+x_2^2)+2(\lambda_2-\lambda_1)x_1 .
$$

Với $\sigma=\lambda_1+\lambda_2>0$, cực tiểu theo $x_2$ tại $0$ và theo $x_1$ tại $x_1=-\frac{1+2(\lambda_2-\lambda_1)}{2\sigma}$. Thay vào:

$$
g(\lambda)=-\frac{(1+2\lambda_2-2\lambda_1)^2}{4(\lambda_1+\lambda_2)} .
$$

**Câu (c).**

$g\le0=p^*$ khi $\sigma>0$, và $g(\tfrac12,0)=-\frac{(1-1)^2}{2}=0$. Vậy $d^*=0=p^*$, đạt tại $\lambda=(\tfrac12,0)$. Điều kiện Slater không thỏa mà đối ngẫu mạnh vẫn đúng và đạt: điều kiện Slater không phải điều kiện cần.

**Kiểm tra lại.**

Tại $\lambda=(\tfrac12,0)$, $L=x_1+\tfrac12(x_1^2+x_2^2)-x_1=\tfrac12\lVert x\rVert_2^2\ge0$, bằng $0$ tại $(0,0)$, đúng điểm khả thi duy nhất.
:::

**Chuỗi suy luận của mục.**

1. Ví dụ 03.7 và 03.8: khoảng dương khi thiếu tính lồi hoặc thiếu khoảng dư.
2. Định nghĩa 03.12: đối ngẫu mạnh; Định nghĩa 03.13: điều kiện Slater.
3. Bổ đề 03.14: tách hai tập lồi.
4. Định lý 03.15: định lý Slater.
5. Ví dụ 03.10, 03.11 và Nhận xét 03.17: phạm vi của định lý.

Đích là Định lý 03.15: bài lồi có điểm Slater và $p^*$ hữu hạn thì có nhân tử $(\lambda^*,\nu^*)$ với $g(\lambda^*,\nu^*)=p^*$.

**Kết mục.** Chứng minh dựa trên một siêu phẳng tách tập $\mathcal A$ khỏi nửa đường thẳng $\mathcal B$. Nó chưa cho thấy trực tiếp vì sao nhân tử là hệ số của siêu phẳng, vì sao Ví dụ 03.10 mất nghiệm đối ngẫu, và nhân tử đo điều gì.

Mục 4 vẽ bài toán trên mặt phẳng giá trị. Ở đó hàm đối ngẫu là tung độ cắt của một đường đỡ, đối ngẫu mạnh có nghiệm đối ngẫu là sự tiếp xúc tại điểm $(0,p^*)$, và hệ số góc của đường đỡ là tốc độ thay đổi của giá trị tối ưu khi nới ràng buộc.

## 4. Hình học của đối ngẫu trên mặt phẳng giá trị

Chứng minh Định lý 03.15 tách tập $\mathcal A$ khỏi nửa đường thẳng $\mathcal B$ bằng một siêu phẳng, rồi đọc nhân tử từ pháp tuyến của siêu phẳng đó. Với bài (1.1), có một ràng buộc và không có đẳng thức, nên $\mathcal A$ nằm trong mặt phẳng và có thể vẽ được.

Mục 3 để lại ba điểm chưa được giải thích, và hình này giải thích cả ba:

1. giá trị $g(1)=4{,}5$ là cận dưới dù điểm đạt $x=1{,}5$ không khả thi;
2. bài thứ nhất của Ví dụ 03.10 có đối ngẫu mạnh nhưng mất nghiệm đối ngẫu;
3. nhân tử $\lambda^*=2$ đo một đại lượng của bài toán chưa được gọi tên.

Mục này định nghĩa tập giá trị và tập trên, chứng minh rằng hàm đối ngẫu là tung độ cắt của một đường đỡ, đặc trưng đối ngẫu mạnh bằng đường đỡ không thẳng đứng, và đọc nhân tử như độ nhạy của giá trị tối ưu.

### 4.1 Nhu cầu và trực giác: mỗi phương án là một điểm

Hàm Lagrange $L(x,\lambda)=f_0(x)+\lambda f_1(x)$ chỉ phụ thuộc vào $x$ qua hai số: mức ràng buộc $u=f_1(x)$ và mức mục tiêu $t=f_0(x)$. Ghi mỗi phương án $x$ thành điểm $(u,t)$ thì mọi đại lượng của Mục 2 trở thành đại lượng hình học trên mặt phẳng $(u,t)$.

Bảng sau ghi năm phương án của bài (1.1), với $u=(x-2)(x-4)$ và $t=x^2+1$.

| $x$ | $u=f_1(x)$ | $t=f_0(x)$ | Khả thi |
|---|---|---|---|
| $0$ | $8$ | $1$ | không |
| $1{,}5$ | $1{,}25$ | $3{,}25$ | không |
| $2$ | $0$ | $5$ | có |
| $3$ | $-1$ | $10$ | có |
| $4$ | $0$ | $17$ | có |

Một phương án khả thi khi và chỉ khi điểm của nó có $u\le0$. Giá trị tối ưu là tung độ thấp nhất trong các điểm nằm bên trái trục tung hoặc trên trục tung; theo bảng, đó là điểm $(0,5)$.

Trực giác (chưa phải định nghĩa): bài gốc là "tìm điểm thấp nhất của đường cong ở nửa mặt phẳng $u\le0$", còn mỗi giá trị $L=t+\lambda u$ là tung độ cắt trục $u=0$ của đường thẳng hệ số góc $-\lambda$ đi qua điểm $(u,t)$.

![Mặt phẳng với trục ngang u bằng f1(x) và trục đứng t bằng f0(x). Đường cong G là một parabol mở theo hướng chéo lên phải, là tập các điểm (f1(x), f0(x)) khi x chạy trên trục số. Các điểm ứng với x bằng 2, 3, 4 lần lượt là (0, 5), (âm 1, 10), (0, 17), nằm ở nửa mặt phẳng u không dương, được tô nền là vùng khả thi. Điểm ứng với x bằng 0 là (8, 1), nằm ở nửa mặt phẳng u dương.](img/lec-03/value-plane-mapping.svg)

Trên hình, đường cong $G$ là ảnh của trục số qua ánh xạ $x\mapsto(f_1(x),f_0(x))$. Phần của $G$ trong vùng tô nền ứng với đoạn khả thi $[2,4]$, đi từ $(0,5)$ qua $(-1,10)$ tới $(0,17)$.

Cùng hoành độ $u=0$ có hai điểm $(0,5)$ và $(0,17)$, nên $t$ không phải hàm của $u$ trên $G$. Trung điểm $(0,11)$ của hai điểm đó không thuộc $G$, vì $u=0$ chỉ xảy ra tại $x=2$ và $x=4$; do đó $G$ không lồi dù bài (1.1) lồi.

### 4.2 Tập giá trị, tập trên và hàm đối ngẫu

::: definition Định nghĩa 03.18 (Tập giá trị và tập trên)
Cho bài toán (2.1) với $f(x)=(f_1(x),\ldots,f_m(x))$.

Tập giá trị (set of values) của bài toán là

$$
G=\{(f(x),\,Ax-b,\,f_0(x))\mid x\in D\}\subseteq\mathbb R^m\times\mathbb R^p\times\mathbb R .
$$

Tập trên của bài toán là

$$
\mathcal A=\{(u,v,t)\mid\exists x\in D:\ f(x)\preceq u,\ Ax-b=v,\ f_0(x)\le t\}.
$$

Một điểm của các tập này viết là $(u,v,t)$, với $u\in\mathbb R^m$ là mức ràng buộc bất đẳng thức, $v\in\mathbb R^p$ là mức ràng buộc đẳng thức và $t\in\mathbb R$ là mức mục tiêu.
:::

Tập $G$ ghi đúng các bộ giá trị mà một phương án tạo ra. Tập $\mathcal A$ thêm vào mọi bộ "kém hơn" một bộ $(u,v,t)$ của $G$, tức mọi $(u',v,t')$ với cả hai điều kiện $u'\succeq u$ và $t'\ge t$. Vì vậy $G\subseteq\mathcal A$.

Với $D=\mathbb R^n$, $\mathcal A$ chính là tập dùng trong chứng minh Định lý 03.15. Trong mặt phẳng của bài (1.1), $\mathcal A$ là phần nằm bên phải và phía trên đường cong $G$.

Ví dụ: với bài (1.1), điểm $(8,1)$ thuộc $G$; điểm $(9,2)$ thuộc $\mathcal A$ mà không thuộc $G$. Phản ví dụ cho nhầm lẫn "$\mathcal A$ là nửa mặt phẳng $u\le0$": điểm $(-2,5)$ có $u\le0$ nhưng không thuộc $\mathcal A$, vì mọi $x$ có $f_1(x)\ge-1>-2$.

Kết quả sau cần Định nghĩa 03.5 và Định nghĩa 03.18; nó dịch giá trị tối ưu và hàm đối ngẫu sang ngôn ngữ của hai tập này, theo Boyd và Vandenberghe (2004, mục 5.3.1, tr. 232–234).

::: proposition Mệnh đề 03.19 (Bài gốc và hàm đối ngẫu trên mặt phẳng giá trị)
**Giả thiết.** Bài toán (2.1) với $D$ và các hàm bất kỳ; $\lambda\succeq0$, $\nu\in\mathbb R^p$.

**Kết luận.**

1. $p^*=\inf\{t\mid(0,0,t)\in\mathcal A\}$.
2. $g(\lambda,\nu)=\inf\{\lambda^Tu+\nu^Tv+t\mid(u,v,t)\in G\}=\inf\{\lambda^Tu+\nu^Tv+t\mid(u,v,t)\in\mathcal A\}$.
3. Siêu phẳng $\{(u,v,t)\mid\lambda^Tu+\nu^Tv+t=g(\lambda,\nu)\}$, khi $g(\lambda,\nu)$ hữu hạn, để toàn bộ $\mathcal A$ ở phía $\lambda^Tu+\nu^Tv+t\ge g(\lambda,\nu)$ và cắt trục $u=0$, $v=0$ tại $t=g(\lambda,\nu)$.
4. Nếu bài toán ở dạng chuẩn lồi với $D=\mathbb R^n$ thì $\mathcal A$ lồi.

**Điều kiện áp dụng.** Phần 2 với tập $\mathcal A$ cần $\lambda\succeq0$; phần 4 cần tính lồi.

**Phạm vi.** $G$ có thể không lồi kể cả khi bài toán lồi; mệnh đề không khẳng định siêu phẳng ở phần 3 chạm $\mathcal A$.
:::

::: proof Chứng minh Mệnh đề 03.19
**Bước 1 (giá trị tối ưu).**

Điểm $(0,0,t)$ thuộc $\mathcal A$ khi và chỉ khi có $x\in D$ với $f(x)\preceq0$, $Ax=b$ và $f_0(x)\le t$, tức có một điểm khả thi với giá trị không vượt $t$. Vì vậy tập $\{t\mid(0,0,t)\in\mathcal A\}$ là tập các số không nhỏ hơn ít nhất một giá trị $f_0(x)$, $x\in C$. Cận dưới đúng của tập này bằng cận dưới đúng của $\{f_0(x)\mid x\in C\}$, tức $p^*$.

**Bước 2 (hàm đối ngẫu trên $G$).**

Mỗi điểm của $G$ có dạng $(f(x),Ax-b,f_0(x))$, và tại điểm đó $\lambda^Tu+\nu^Tv+t=L(x,\lambda,\nu)$ theo (2.2). Lấy cận dưới đúng theo $x\in D$ cho đẳng thức thứ nhất của phần 2, theo Định nghĩa 03.5.

**Bước 3 (hàm đối ngẫu trên $\mathcal A$).**

Vì $G\subseteq\mathcal A$, cận dưới đúng trên $\mathcal A$ không vượt cận dưới đúng trên $G$. Ngược lại, lấy $(u,v,t)\in\mathcal A$ với điểm $x$ tương ứng. Vì $\lambda\succeq0$ và $u\succeq f(x)$, ta có $\lambda^Tu\ge\lambda^Tf(x)$; cùng với $v=Ax-b$ và $t\ge f_0(x)$,

$$
\begin{aligned}
\lambda^Tu+\nu^Tv+t&\ge\lambda^Tf(x)+\nu^T(Ax-b)+f_0(x)\\
&=L(x,\lambda,\nu)\\
&\ge g(\lambda,\nu).
\end{aligned}
$$

Dòng đầu dùng ba quan hệ vừa nêu, dòng thứ hai là (2.2), dòng thứ ba là Định nghĩa 03.5.

Do đó cận dưới đúng trên $\mathcal A$ không nhỏ hơn $g(\lambda,\nu)$, và hai cận dưới đúng bằng nhau.

**Bước 4 (siêu phẳng đỡ).**

Phần 2 nói rằng $\lambda^Tu+\nu^Tv+t\ge g(\lambda,\nu)$ với mọi điểm của $\mathcal A$, đó là khẳng định thứ nhất của phần 3. Thay $u=0$, $v=0$ vào phương trình siêu phẳng cho $t=g(\lambda,\nu)$.

**Bước 5 (tính lồi của $\mathcal A$).**

Đây là Bước 1 của chứng minh Định lý 03.15, chỉ dùng tính lồi của các $f_i$ và tính affine của $Ax-b$. $\square$
:::

Phần 2 của Mệnh đề 03.19 nói rằng tính $g(\lambda,\nu)$ là cực tiểu hàm tuyến tính $(\lambda,\nu,1)^T(u,v,t)$ trên tập giá trị. Với một ràng buộc, đó là thao tác hình học sau.

Cố định hệ số góc $-\lambda$. Trượt đường thẳng $t=c-\lambda u$ từ dưới lên cho tới khi chạm $G$. Tung độ cắt trục $u=0$ tại vị trí đó là $g(\lambda)$.

Đối ngẫu yếu đọc được ngay trên hình. Mọi điểm khả thi có $u\le0$, nên với $\lambda\ge0$, tung độ của nó thỏa $t\ge g(\lambda)-\lambda u\ge g(\lambda)$; tung độ cắt vì vậy nằm dưới mọi điểm khả thi.

So với Định lý 03.8, mệnh đề không thêm kết luận mới mà đổi ngôn ngữ. Đổi lại, hình học làm rõ vì sao điểm chạm của đường đỡ không cần khả thi: lập luận cận dưới chỉ dùng vị trí của đường, không dùng điểm chạm.

::: example Ví dụ 03.12 (Hai đường đỡ của bài toán xuyên suốt)
**Dữ kiện.**

Bài (1.1): $f_0(x)=x^2+1$, $f_1(x)=(x-2)(x-4)$; tập giá trị $G=\{(f_1(x),f_0(x))\mid x\in\mathbb R\}$. Ví dụ 03.3: $g(1)=4{,}5$, đạt tại $x=1{,}5$; $g(2)=5$, đạt tại $x=2$. Ví dụ 03.2: $f_0(x)+2f_1(x)=3(x-2)^2+5$.

**Đường với $\lambda=1$.**

Theo Ví dụ 03.3, $g(1)=4{,}5$, nên đường đỡ là $t=4{,}5-u$. Điểm chạm ứng với điểm đạt $x(1)=1{,}5$:

$$
(u,t)=(f_1(1{,}5),\,f_0(1{,}5))=(1{,}25;\ 3{,}25).
$$

Điểm này có $u>0$, không khả thi. Mọi điểm khả thi của $G$ vẫn nằm trên đường: chẳng hạn $(0,5)$ cho $5\ge4{,}5$ và $(-1,10)$ cho $10\ge5{,}5$.

**Đường với $\lambda=2$.**

$g(2)=5$, đường đỡ là $t=5-2u$. Trên $G$, $t+2u-5=f_0(x)+2f_1(x)-5$, và theo đẳng thức đã tính ở Ví dụ 03.2,

$$
t+2u-5=3(x-2)^2\ge0,
$$

nên đường nằm dưới $G$ và chỉ chạm tại $x=2$, tức điểm $(0,5)$. Điểm chạm khả thi và có tung độ bằng tung độ cắt.

**Diễn giải.**

Đường $\lambda=1$ cho một cận chưa khít vì điểm chạm nằm ngoài vùng khả thi. Đường $\lambda=2$ chạm $G$ đúng tại điểm thấp nhất của phần khả thi, nằm trên trục $u=0$; đó là hình ảnh của chứng nhận trong Ví dụ 03.4.

**Kiểm tra lại.**

Tại $(1{,}25;\,3{,}25)$: $3{,}25+1{,}25=4{,}5$, đúng là nằm trên đường thứ nhất. Tại $x=3$, điểm $(-1,10)$ cho $10+2\cdot(-1)-5=3$, bằng $3(3-2)^2$.
:::

![Mặt phẳng (u, t) với đường cong G và vùng khả thi u không dương được tô nền. Đường thẳng t bằng 4,5 trừ u cắt trục tung tại 4,5 và tiếp xúc G tại một điểm có u dương, ứng với x bằng 1,5, nằm ngoài vùng khả thi. Điểm (0, 5) của G nằm phía trên đường thẳng.](img/lec-03/value-plane-1.svg)

Hình trên vẽ đường $\lambda=1$. Khoảng cách theo chiều đứng từ tung độ cắt $4{,}5$ tới điểm $(0,5)$ là khoảng đối ngẫu $0{,}5$ của cặp $(x,\lambda)=(2,1)$.

![Mặt phẳng (u, t) với đường cong G và vùng khả thi u không dương được tô nền. Đường thẳng t bằng 5 trừ 2u có hệ số góc âm 2, nằm dưới G và tiếp xúc G đúng tại điểm (0, 5), ứng với x bằng 2, điểm khả thi thấp nhất.](img/lec-03/value-plane-2.svg)

Hình thứ hai vẽ đường $\lambda=2$, tiếp xúc $G$ tại $(0,5)$. Tiếp xúc tại một điểm của trục tung là dấu hiệu hình học của đối ngẫu mạnh có nghiệm đối ngẫu; mệnh đề sau phát biểu chính xác điều đó cho tập $\mathcal A$.

Kết quả sau mô tả trên hình trường hợp đối ngẫu mạnh có nghiệm đối ngẫu; nó dùng Mệnh đề 03.19 và Hệ quả 03.10, theo cách đọc của Boyd và Vandenberghe (2004, mục 5.3.1, tr. 232–234).

::: proposition Mệnh đề 03.20 (Đối ngẫu mạnh là đường đỡ không thẳng đứng tại $(0,0,p^*)$)
**Giả thiết.** Bài toán (2.1) với $p^*$ hữu hạn.

**Kết luận.** Hai khẳng định sau tương đương.

1. $d^*=p^*$ và bài đối ngẫu đạt nghiệm.
2. Có $\lambda\succeq0$ và $\nu$ sao cho $\lambda^Tu+\nu^Tv+t\ge p^*$ với mọi $(u,v,t)\in\mathcal A$.

Khi đó $(\lambda,\nu)$ ở khẳng định 2 là một nghiệm đối ngẫu, và siêu phẳng $\lambda^Tu+\nu^Tv+t=p^*$ đi qua $(0,0,p^*)$.

**Điều kiện áp dụng.** Không cần tính lồi.

**Phạm vi.** Siêu phẳng ở khẳng định 2 có hệ số của $t$ bằng $1$, tức không thẳng đứng; một siêu phẳng thẳng đứng (hệ số của $t$ bằng $0$) không cho nhân tử.
:::

::: proof Chứng minh Mệnh đề 03.20
**Bước 1 (từ 1 sang 2).**

Gọi $(\lambda^*,\nu^*)$ là nghiệm đối ngẫu, $g(\lambda^*,\nu^*)=d^*=p^*$. Theo Mệnh đề 03.19 phần 2, $\lambda^{*T}u+\nu^{*T}v+t\ge g(\lambda^*,\nu^*)=p^*$ với mọi $(u,v,t)\in\mathcal A$.

**Bước 2 (từ 2 sang 1).**

Theo Mệnh đề 03.19 phần 2, khẳng định 2 cho $g(\lambda,\nu)\ge p^*$. Cùng Hệ quả 03.10(b),

$$
\begin{aligned}
p^*&\le g(\lambda,\nu)\\
&\le d^*\\
&\le p^* .
\end{aligned}
$$

Dòng thứ hai là định nghĩa của $d^*$, dòng thứ ba là đối ngẫu yếu. Hai đầu bằng nhau, nên mọi dấu là đẳng thức: $d^*=p^*$ và $(\lambda,\nu)$ đạt $d^*$.

**Bước 3 (siêu phẳng đi qua $(0,0,p^*)$).**

Thay $u=0$, $v=0$, $t=p^*$ vào phương trình siêu phẳng cho $p^*=p^*$. $\square$
:::

Mệnh đề 03.20 cho cách đọc hình học của Định lý 03.15. Bước 3 của chứng minh định lý loại trường hợp hệ số $\mu$ của $t$ bằng $0$, tức siêu phẳng tách thẳng đứng. Mệnh đề 03.20 cho thấy loại trừ được trường hợp đó là đủ để có nghiệm đối ngẫu.

**Trong học máy.** Với máy vector hỗ trợ lề mềm, mỗi phương án $(w,b,\xi)$ cho một điểm trong không gian giá trị $\mathbb R^{2N}\times\mathbb R$. Theo Định lý 03.15, với điểm Slater của Mục 3.4, bài lồi và $p^*$ hữu hạn, bài có nghiệm đối ngẫu $(\alpha,\beta)$. Mệnh đề 03.20 đọc nghiệm đó thành một siêu phẳng đỡ không thẳng đứng: hàm Lagrange tại mọi điểm, kể cả điểm không khả thi, không nhỏ hơn mất mát tối ưu. Tình huống 03.1 tính bộ nhân tử đó cho bốn khung hình.

![Mặt phẳng (u, t). Đường cong G và tập mở rộng A bằng G cộng góc phần tư không âm, tô nhạt, trải sang phải và lên trên. Vùng u không dương ghi khả thi gốc. Điểm (0, p sao) bằng (0, 5) được đánh dấu; đường thẳng t bằng 5 trừ 2u đi qua điểm đó và nằm dưới toàn bộ A. Một mũi tên pháp tuyến (2, 1) xuất phát từ (0, 5), vuông góc với đường thẳng và hướng vào trong A.](img/lec-03/dual-geometry.svg)

Hình trên vẽ tập $\mathcal A$ của bài (1.1). Pháp tuyến $(2,1)=(\lambda^*,1)$ của đường đỡ có thành phần thứ hai bằng $1$, đúng dạng của khẳng định 2.

Tập $\mathcal A$ lồi dù $G$ không lồi, như Mệnh đề 03.19 phần 4 bảo đảm. Đây là lý do chứng minh Định lý 03.15 tách $\mathcal A$ chứ không tách $G$.

::: example Ví dụ 03.13 (Đường đỡ chỉ có thể thẳng đứng)
**Bài toán.**

Bài thứ nhất của Ví dụ 03.10: $\min x_1+x_2$ với $x_1^2+x_2^2\le0$, có $p^*=0$, $d^*=0$, không có nghiệm đối ngẫu.

**Tập trên.**

Điểm $(u,t)$ thuộc $\mathcal A$ khi có $x$ với $\lVert x\rVert_2^2\le u$ và $x_1+x_2\le t$. Theo Cauchy–Schwarz, $x_1+x_2\ge-\sqrt2\,\lVert x\rVert_2$, với dấu bằng tại $x=-\sqrt{u/2}\,(1,1)$. Do đó

$$
\mathcal A=\{(u,t)\mid u\ge0,\ t\ge-\sqrt{2u}\}.
$$

**Đường đỡ.**

Biên dưới $t=-\sqrt{2u}$ có hệ số góc $-\frac1{\sqrt{2u}}$, tiến tới $-\infty$ khi $u\to0^+$. Một đường đỡ với hệ số góc $-\lambda$ chạm biên tại $u=\frac1{2\lambda^2}$, $t=-\frac1\lambda$, có tung độ cắt

$$
-\frac1\lambda+\lambda\cdot\frac1{2\lambda^2}=-\frac1{2\lambda},
$$

đúng bằng $g(\lambda)$ của Ví dụ 03.10. Khi $\lambda\to\infty$, điểm chạm tiến về $(0,0)$ và đường dựng đứng dần. Tại $(0,p^*)=(0,0)$, đường đỡ duy nhất là trục $u=0$, thẳng đứng.

**Kiểm tra lại.**

Với $\lambda=1$: điểm chạm $(\tfrac12,-1)$ thỏa $-1=-\sqrt{2\cdot\tfrac12}$, và tung độ cắt $-1+\tfrac12=-\tfrac12=g(1)$.
:::

Ví dụ 03.13 giải thích hình học của Ví dụ 03.10. Đối ngẫu mạnh vẫn đúng vì các đường đỡ có tung độ cắt tiến tới $0$. Nghiệm đối ngẫu không tồn tại vì đường đỡ tại $(0,0)$ thẳng đứng, ứng với "$\lambda=\infty$".

::: remark Nhận xét 03.21 (Ba nhầm lẫn khi đọc hình đối ngẫu)
Thứ nhất, coi điểm chạm của đường đỡ là ứng viên nghiệm: với $\lambda=1$, điểm chạm không khả thi. Chứng nhận cần điểm chạm khả thi và có tung độ bằng tung độ cắt.

Thứ hai, quên điều kiện "tung độ bằng tung độ cắt": nếu đường với $\lambda>0$ chạm $G$ tại một điểm khả thi có $u<0$, tung độ $t=g(\lambda)-\lambda u$ lớn hơn $g(\lambda)$, nên cặp đó có khoảng dương. Điều kiện "$\lambda u=0$ tại điểm chạm" chính là điều kiện bù trừ của Mục 5.

Thứ ba, kết luận tính lồi của bài toán từ hình: $G$ của bài (1.1) không lồi dù bài lồi, và $\mathcal A$ của Tình huống 03.3 không lồi; điều quyết định là $\mathcal A$ có một đường đỡ không thẳng đứng tại $(0,p^*)$ hay không.
:::

### 4.3 Nhân tử như độ nhạy của giá trị tối ưu

Tập trên $\mathcal A$ còn chứa thông tin khác. Với một mức ràng buộc $u$ cố định, điểm thấp nhất của $\mathcal A$ trên đường thẳng đứng qua $u$ là giá trị tối ưu của bài toán khi ràng buộc được đổi thành $f_1(x)\le u$. Câu hỏi thực tế đi kèm: nếu nới ràng buộc thêm một lượng nhỏ, giá trị tối ưu giảm bao nhiêu.

::: definition Định nghĩa 03.22 (Bài toán nhiễu và hàm giá trị)
Cho bài toán (2.1). Với $u\in\mathbb R^m$ và $v\in\mathbb R^p$, bài toán nhiễu (perturbed problem) là

$$
\underset{x\in D}{\operatorname{minimize}}\ f_0(x)\quad\text{subject to}\quad f_i(x)\le u_i,\ i=1,\ldots,m,\qquad Ax-b=v .
\tag{4.1}
$$

Giá trị tối ưu của (4.1), ký hiệu $p^*(u,v)\in\mathbb R\cup\{\pm\infty\}$, gọi là hàm giá trị (value function); $p^*(0,0)=p^*$.
:::

Thành phần $u_i>0$ nới ràng buộc $i$, thành phần $u_i<0$ siết nó. Theo Mệnh đề 01.16(a), nới ràng buộc mở rộng tập khả thi, nên $p^*(u,v)$ không tăng khi $u$ tăng.

Theo Định nghĩa 03.18, $p^*(u,v)=\inf\{t\mid(u,v,t)\in\mathcal A\}$: đồ thị của hàm giá trị là biên dưới của $\mathcal A$. Hàm giá trị khác hàm đối ngẫu: $p^*(u,v)$ là hàm của mức ràng buộc, $g(\lambda,\nu)$ là hàm của nhân tử.

Kết quả sau chặn giá trị tối ưu của bài nhiễu cho mọi nhiễu, lớn hay nhỏ, khi có đối ngẫu mạnh và nghiệm đối ngẫu. Nó dùng định nghĩa nghiệm đối ngẫu (Định nghĩa 03.9) và Định nghĩa 03.5, theo Boyd và Vandenberghe (2004, mục 5.6.2, tr. 250).

::: proposition Mệnh đề 03.23 (Bất đẳng thức độ nhạy toàn cục)
**Giả thiết.** Bài toán (2.1) với $p^*$ hữu hạn, $d^*=p^*$, và $(\lambda^*,\nu^*)$ là một nghiệm đối ngẫu.

**Kết luận.** Với mọi $u\in\mathbb R^m$, $v\in\mathbb R^p$,

$$
p^*(u,v)\ge p^*-\lambda^{*T}u-\nu^{*T}v .
\tag{4.2}
$$

**Điều kiện áp dụng.** Không cần tính lồi; cần đối ngẫu mạnh và nghiệm đối ngẫu, chẳng hạn từ Định lý 03.15.

**Phạm vi.** (4.2) là một cận dưới; nó không cho giá trị chính xác của $p^*(u,v)$.
:::

::: proof Chứng minh Mệnh đề 03.23
**Bước 1 (trường hợp bài nhiễu không khả thi).**

Khi đó $p^*(u,v)=+\infty$ và (4.2) hiển nhiên.

**Bước 2 (một điểm khả thi của bài nhiễu).**

Lấy $x$ khả thi cho (4.1), tức $f_i(x)\le u_i$ và $Ax-b=v$. Khi đó

$$
\begin{aligned}
p^*&=g(\lambda^*,\nu^*)\\
&\le f_0(x)+\sum_{i=1}^m\lambda_i^*f_i(x)+\nu^{*T}(Ax-b)\\
&\le f_0(x)+\lambda^{*T}u+\nu^{*T}v .
\end{aligned}
$$

Dòng đầu là giả thiết $g(\lambda^*,\nu^*)=d^*=p^*$. Dòng thứ hai là định nghĩa cận dưới đúng (Định nghĩa 03.5). Dòng thứ ba dùng $\lambda_i^*\ge0$ cùng $f_i(x)\le u_i$, và $Ax-b=v$.

**Bước 3 (lấy cận dưới đúng).**

Chuyển vế cho $f_0(x)\ge p^*-\lambda^{*T}u-\nu^{*T}v$ với mọi $x$ khả thi của (4.1). Lấy cận dưới đúng theo các $x$ đó cho (4.2) theo Định nghĩa 01.10. $\square$
:::

Bất đẳng thức (4.2) có hình ảnh trực tiếp. Với một ràng buộc, vế phải $p^*-\lambda^*u$ là đường đỡ của Mệnh đề 03.20, và đồ thị hàm giá trị, biên dưới của $\mathcal A$, nằm trên đường đó.

Xét nhiễu chỉ trên ràng buộc $i$, các nhiễu khác bằng $0$. Bất đẳng thức (4.2) cho hai kết luận chính xác:

- siết ràng buộc $i$ một lượng $\lvert u_i\rvert$, với $u_i<0$, làm giá trị tối ưu tăng ít nhất $\lambda_i^*\lvert u_i\rvert$;
- nới ràng buộc $i$ một lượng $u_i>0$ làm giá trị tối ưu giảm không quá $\lambda_i^*u_i$.

Bất đẳng thức (4.2) không cho biết khi nới, giá trị tối ưu giảm ít nhất bao nhiêu. Tốc độ thay đổi tại nhiễu bằng $0$ là nội dung của Hệ quả 03.24.

Kết quả sau là hệ quả của Mệnh đề 03.23 khi hàm giá trị khả vi: chia (4.2) cho nhiễu và lấy giới hạn hai phía.

::: corollary Hệ quả 03.24 (Độ nhạy địa phương: nhân tử là giá bóng)
**Giả thiết.** Như Mệnh đề 03.23, và thêm: $p^*(u,v)$ khả vi tại $(0,0)$.

**Kết luận.** Với mọi $i$ và $j$,

$$
\lambda_i^*=-\frac{\partial p^*}{\partial u_i}(0,0),\qquad\nu_j^*=-\frac{\partial p^*}{\partial v_j}(0,0).
\tag{4.3}
$$

**Điều kiện áp dụng.** Tính khả vi của $p^*$ tại $(0,0)$ là giả thiết, không suy ra từ các giả thiết khác.

**Phạm vi.** (4.3) là phát biểu về đạo hàm tại một điểm; nó cho xấp xỉ $p^*(u,v)\approx p^*-\lambda^{*T}u-\nu^{*T}v$ khi nhiễu nhỏ, không cho đẳng thức.
:::

::: proof Chứng minh Hệ quả 03.24
**Bước 1 (đạo hàm theo $u_i$ không nhỏ hơn $-\lambda_i^*$).**

Gọi $e_i$ là vector đơn vị thứ $i$ của $\mathbb R^m$. Với $s>0$, (4.2) tại $(se_i,0)$ cho $p^*(se_i,0)-p^*\ge-\lambda_i^*s$. Chia cho $s>0$ giữ chiều, rồi cho $s\to0^+$: $\frac{\partial p^*}{\partial u_i}(0,0)\ge-\lambda_i^*$.

**Bước 2 (đạo hàm theo $u_i$ không lớn hơn $-\lambda_i^*$).**

Với $s<0$, cùng bất đẳng thức chia cho $s<0$ đổi chiều: $\frac{p^*(se_i,0)-p^*}{s}\le-\lambda_i^*$. Cho $s\to0^-$: $\frac{\partial p^*}{\partial u_i}(0,0)\le-\lambda_i^*$.

**Bước 3 (kết luận).**

Hai bước cho đẳng thức thứ nhất của (4.3); đẳng thức thứ hai chứng minh giống hệt với $(0,se_j)$, vì (4.2) đúng với mọi dấu của $v$. $\square$
:::

Hệ quả 03.24 cho nhân tử một nghĩa đo được: $\lambda_i^*$ là mức giảm của giá trị tối ưu trên mỗi đơn vị nới ràng buộc $i$, tính tại nhiễu bằng $0$. Trong kinh tế, đại lượng này gọi là giá bóng (shadow price) của ràng buộc. Cách đọc này theo Boyd và Vandenberghe (2004, mục 5.4.4, tr. 240–241; mục 5.6.3, tr. 251).

Nhân tử của bất đẳng thức không âm vì nới một bất đẳng thức không làm giá trị tối ưu tăng. Nhân tử của đẳng thức có dấu tùy ý vì dịch một đẳng thức theo một chiều có thể có lợi, theo chiều kia có thể có hại.

::: example Ví dụ 03.14 (Hàm giá trị của bài toán xuyên suốt)
**Dữ kiện.**

Bài (1.1): $\min_{x\in\mathbb R}f_0(x)=x^2+1$ với $f_1(x)=(x-2)(x-4)\le0$, với $p^*=5$, $\lambda^*=2$ (Ví dụ 03.4). Bài nhiễu thay ràng buộc bằng $f_1(x)\le u$, với hàm giá trị $p^*(u)$. Với một ràng buộc, (4.2) là $p^*(u)\ge p^*-\lambda^*u$, và khi $p^*$ khả vi tại $0$, (4.3) là $\lambda^*=-p^{*\prime}(0)$.

**Bài nhiễu.**

Ràng buộc $(x-2)(x-4)\le u$, tức $(x-3)^2\le1+u$.

**Tính hàm giá trị.**

Xét ba trường hợp.

1. Nếu $u<-1$: vế phải âm, không có $x$ khả thi, $p^*(u)=+\infty$.
2. Nếu $-1\le u\le8$: tập khả thi là $[3-\sqrt{1+u},\,3+\sqrt{1+u}]$, có đầu mút trái không âm vì $\sqrt{1+u}\le3$. Mục tiêu $x^2+1$ tăng trên $[0,\infty)$, nên nhỏ nhất tại đầu mút trái: $p^*(u)=(3-\sqrt{1+u})^2+1=11+u-6\sqrt{1+u}$.
3. Nếu $u>8$: tập khả thi chứa $0$, nên $p^*(u)=f_0(0)=1$.

**Kiểm tra bất đẳng thức (4.2).**

Với $\lambda^*=2$, cần $p^*(u)\ge5-2u$. Trên $[-1,8]$,

$$
\begin{aligned}
p^*(u)-(5-2u)&=6+3u-6\sqrt{1+u}\\
&=3\bigl(\sqrt{1+u}-1\bigr)^2\\
&\ge0,
\end{aligned}
$$

trong đó dòng thứ hai dùng $(\sqrt{1+u}-1)^2=2+u-2\sqrt{1+u}$. Với $u>8$, $5-2u<-11<1$.

**Kiểm tra (4.3).**

Trên $(-1,8)$, $p^{*\prime}(u)=1-\frac3{\sqrt{1+u}}$, nên $p^{*\prime}(0)=1-3=-2=-\lambda^*$.

**Diễn giải.**

Nới ràng buộc một lượng nhỏ $u$ làm giá trị tối ưu giảm khoảng $2u$. Với $u=1$, giá trị thật là $p^*(1)=12-6\sqrt2\approx3{,}5147$, còn xấp xỉ bậc nhất cho $3$: xấp xỉ chỉ tốt khi nhiễu nhỏ, và (4.2) vẫn đúng.

**Kiểm tra lại.**

$p^*(0)=11-6=5$. $p^*(-0{,}75)=11-0{,}75-6\cdot0{,}5=7{,}25\ge6{,}5=5+1{,}5$. $p^*(8)=11+8-18=1$, khớp trường hợp 3 tại biên.
:::

![Đồ thị hàm giá trị p sao theo u trên đoạn từ âm 1 tới 8 rồi nằm ngang ở mức 1 khi u lớn hơn 8. Đường cong giảm, đi qua điểm (0, 5). Một đường nét đứt 5 trừ 2u tiếp xúc đường cong tại (0, 5) và nằm dưới đường cong. Ghi chú: u nhỏ hơn âm 1 thì bài nhiễu vô nghiệm; tại u bằng 8 ràng buộc hoạt động với nhân tử 0; u lớn hơn 8 ràng buộc không hoạt động.](img/lec-03/sensitivity-value.svg)

Hình trên vẽ $p^*(u)$ cùng đường $5-2u$. Đường thẳng vừa là tiếp tuyến tại $u=0$, như Hệ quả 03.24 nói, vừa nằm dưới toàn bộ đồ thị, như Mệnh đề 03.23 nói.

Tại $u=8$, đầu mút trái của tập khả thi chạm đỉnh parabol $x=0$, nơi $f_0'(0)=0$; ràng buộc vẫn hoạt động nhưng nhân tử của bài nhiễu bằng $0$. Hiện tượng "hoạt động nhưng nhân tử bằng $0$" được nghiên cứu ở Nhận xét 03.28.

::: example Ví dụ 03.15 (Giá bóng của yêu cầu dinh dưỡng trong bài pha trộn)
**Dữ kiện.**

Bài pha trộn (Ví dụ 03.5): $\min3x_1+2x_2$ với $2x_1+x_2\ge4$, $x_1+2x_2\ge5$, $x\ge0$; nghiệm $x^*=(1,2)$, $p^*=7$, nhân tử $\lambda^*=(\tfrac43,\tfrac13,0,0)$. Khả thi đối ngẫu (Mệnh đề 03.11): $\lambda\succeq0$ và $\sum_i\lambda_ia_i=c$; khi đó $g(\lambda)=\beta^T\lambda$. Bất đẳng thức (4.2): $p^*(u)\ge p^*-\lambda^{*T}u$. Hệ quả 03.10(c): điểm khả thi $x$ và nhân tử khả thi đối ngẫu $\lambda$ với $f_0(x)=g(\lambda)$ là cặp nghiệm.

**Bài nhiễu và cận.**

Tăng yêu cầu nitơ của bài pha trộn từ $4$ lên $4+\delta$ gam, tức $u_1=-\delta$ trong ràng buộc $4-(2x_1+x_2)\le u_1$. Với $\lambda_1^*=\tfrac43$ của Ví dụ 03.5, (4.2) cho $p^*\ge7+\tfrac43\delta$.

**Tính trực tiếp.**

Đỉnh mới giải hệ $2x_1+x_2=4+\delta$, $x_1+2x_2=5$:

$$
x_1=\frac{3+2\delta}3,\qquad x_2=\frac{6-\delta}3,\qquad3x_1+2x_2=7+\frac43\delta .
$$

Nhân tử $(\tfrac43,\tfrac13,0,0)$ vẫn khả thi đối ngẫu, vì điều kiện $\sum_i\lambda_ia_i=c$ của Mệnh đề 03.11 không chứa vế phải, và cho $g=\tfrac43(4+\delta)+\tfrac53=7+\tfrac43\delta$. Theo Hệ quả 03.10(c), đỉnh mới tối ưu khi nó khả thi, tức $-1{,}5\le\delta\le6$; trên đoạn đó (4.2) là đẳng thức.

**Diễn giải và kiểm tra lại.**

Mỗi gam nitơ yêu cầu thêm làm chi phí tối ưu tăng $\tfrac43$ đơn vị, khoảng $13{,}3$ nghìn đồng. Kiểm tra lại với $\delta=3$: $x=(3,1)$, nitơ $7$, phốtpho $5$, chi phí $11=7+4$.
:::

::: remark Nhận xét 03.25 (Ba nhầm lẫn về độ nhạy)
Thứ nhất, dùng (4.3) như đẳng thức cho nhiễu lớn: Ví dụ 03.14 có $p^*(1)\approx3{,}5147\neq5-2=3$.

Thứ hai, áp (4.3) khi hàm giá trị không khả vi: trong Tình huống 03.3, hàm giá trị của bài rời rạc là hàm bậc thang, và nhân tử chỉ còn cho cận (4.2).

Thứ ba, đổi dấu: nhân tử dương nghĩa là nới ràng buộc làm giá trị tối ưu giảm, siết ràng buộc làm giá trị tối ưu tăng. Với ràng buộc viết dạng $h(x)\ge c$, nới là giảm $c$.
:::

**Trong học máy.** Trong hồi quy với trần $\lVert w\rVert_2^2\le\tau$, nhân tử $\lambda^*$ của trần là tốc độ giảm của mất mát tối ưu khi trần tăng: $\frac{dp^*}{d\tau}=-\lambda^*$ theo (4.3), vì nới trần một lượng $u$ là đặt trần $\tau+u$.

Giả thiết khả vi thỏa trong các ví dụ của Mục 5 và Tình huống 03.2. Kết luận cho phép đọc từ một lần giải duy nhất xem trần đang "đắt" đến đâu: Ví dụ 03.19 có $\lambda^*=2$, nên nới trần thêm $0{,}1$ giảm mất mát khoảng $0{,}2$.

Cùng cách đọc áp dụng cho ràng buộc ngân sách tính toán hay ràng buộc công bằng: nhân tử lớn chỉ ra ràng buộc đang kìm hãm mất mát nhiều nhất (Bài tập 03.17).

::: exercise Bài tập 03.6
**Dữ kiện.**

Tập giá trị của bài một ràng buộc là $G=\{(f_1(x),f_0(x))\mid x\in\mathbb R\}$: điểm $(u,t)\in G$ có $u=f_1(x)$, $t=f_0(x)$. Với bài nhiễu $f_1(x)\le u$ có hàm giá trị $p^*(u)$ và nhân tử tối ưu $\lambda^*$: (4.2) là $p^*(u)\ge p^*-\lambda^*u$, và khi $p^*$ khả vi tại $0$, (4.3) là $\lambda^*=-p^{*\prime}(0)$.

Xét $\min_{x\in\mathbb R}x^2$ với $f_1(x)=1-x\le0$.

- (a) Mô tả tập giá trị $G$ bằng một phương trình giữa $u$ và $t$.
- (b) Tính $g(\lambda)$ với mọi $\lambda\in\mathbb R$ và tìm điểm chạm của đường đỡ hệ số góc $-\lambda$.
- (c) Tính hàm giá trị $p^*(u)$ và kiểm tra (4.2), (4.3) với nhân tử tối ưu.
:::

::: hint
Từ $u=1-x$ suy ra $x=1-u$. Bài nhiễu là $x\ge1-u$.
:::

::: solution
**(a) Tập giá trị.**

$u=1-x$ và $t=x^2$, nên $G=\{(u,t)\mid t=(1-u)^2\}$, một parabol.

**(b) Hàm đối ngẫu và điểm chạm.**

$L=x^2+\lambda(1-x)$ đạt cực tiểu tại $x=\frac\lambda2$, nên $g(\lambda)=\lambda-\frac{\lambda^2}4$ với mọi $\lambda$, $\operatorname{dom}g=\mathbb R$. Điểm chạm ứng với $x=\frac\lambda2$:

$$
(u,t)=\Bigl(1-\frac\lambda2,\ \frac{\lambda^2}4\Bigr).
$$

Trên $\lambda\ge0$, $g$ cực đại tại $\lambda^*=2$ với $g(2)=1$; điểm chạm là $(0,1)$, khả thi.

**(c) Hàm giá trị.**

Bài nhiễu là $\min x^2$ với $x\ge1-u$. Hai trường hợp:

1. Nếu $u\le1$: $1-u\ge0$, nghiệm $x=1-u$, $p^*(u)=(1-u)^2$.
2. Nếu $u>1$: $x=0$ khả thi, $p^*(u)=0$.

Kiểm tra (4.2): với $u\le1$, $(1-u)^2-(1-2u)=u^2\ge0$; với $u>1$, $1-2u<0$. Kiểm tra (4.3): $p^{*\prime}(0)=-2(1-0)=-2=-\lambda^*$.

**Kiểm tra lại.**

$p^*=1$ tại $x=1$, bằng $g(2)$; tại $\lambda=1$, điểm chạm $(\tfrac12,\tfrac14)$ thỏa $\tfrac14=(1-\tfrac12)^2$.
:::

**Chuỗi suy luận của mục.**

1. Định nghĩa 03.18: tập giá trị và tập trên.
2. Mệnh đề 03.19: hàm đối ngẫu là tung độ cắt của đường đỡ.
3. Mệnh đề 03.20: đối ngẫu mạnh có nghiệm đối ngẫu tương đương đường đỡ không thẳng đứng tại $(0,p^*)$.
4. Định nghĩa 03.22: hàm giá trị.
5. Mệnh đề 03.23: độ nhạy toàn cục; Hệ quả 03.24: nhân tử là giá bóng.

Đích của mục là Hệ quả 03.24.

**Kết mục.** Mục này cho nghĩa hình học của mọi đại lượng đã gặp: $g(\lambda)$ là tung độ cắt, $\lambda$ là hệ số góc, đối ngẫu mạnh có nghiệm đối ngẫu là sự tiếp xúc tại $(0,p^*)$, và nhân tử tối ưu là độ dốc của hàm giá trị.

Thiếu hụt còn lại là tính toán. Mọi chứng nhận cho đến đây đều đi qua hàm $g$, tức một bài cực tiểu theo $x$ cho mỗi nhân tử, rồi một bài cực đại theo nhân tử. Với hồi quy có trần hay máy vector hỗ trợ, $g$ có công thức nhưng cồng kềnh.

Mục 5 khai thác các dấu bằng trong chuỗi $g(\lambda^*,\nu^*)\le L(x^*,\lambda^*,\nu^*)\le f_0(x^*)$ để thay việc tính $g$ bằng một hệ điều kiện trên $(x,\lambda,\nu)$: điều kiện Karush–Kuhn–Tucker.

## 5. Điều kiện Karush–Kuhn–Tucker

Mục 4 cho nghĩa hình học của nhân tử, nhưng mọi chứng nhận vẫn đi qua hàm $g$. Với hồi quy có trần $\min\tfrac12\lVert w-y\rVert_2^2$, $\lVert w\rVert_2^2\le1$, $y=(3,4)$, tính $g(\lambda)$ đòi một bài cực tiểu theo $w$ cho mỗi $\lambda$, rồi một bài cực đại theo $\lambda$.

Trong khi đó, Ví dụ 03.4 cho thấy tại cặp tối ưu $(x^*,\lambda^*)=(2,2)$ của bài (1.1), hai dấu bất đẳng thức trong (2.4) đều là dấu bằng. Hai dấu bằng đó là hai phương trình trên $(x,\lambda)$, giải được mà không cần biết $g$.

Mục này biến hai dấu bằng thành điều kiện bù trừ và điều kiện dừng, gộp với hai điều kiện khả thi thành hệ Karush–Kuhn–Tucker (KKT), chứng minh hệ này cần khi có đối ngẫu mạnh và đủ khi bài toán lồi, rồi áp dụng cho hồi quy có trần và máy vector hỗ trợ.

### 5.1 Điều kiện bù trừ

Trực giác (chưa phải định nghĩa). Trong Ví dụ 03.5, ràng buộc $x_1\ge0$ không chặt tại nghiệm $(1,2)$ và có nhân tử $0$; hai ràng buộc dinh dưỡng chặt và có nhân tử dương. Theo nghĩa giá bóng của Hệ quả 03.24, một ràng buộc còn dư không có giá: nới nó không đổi nghiệm. Một ràng buộc có giá dương thì phải đang bị dùng hết.

::: definition Định nghĩa 03.26 (Ràng buộc hoạt động và điều kiện bù trừ)
Cho bài toán (2.1) và một điểm khả thi $x$.

Ràng buộc $f_i(x)\le0$ hoạt động (active) tại $x$ nếu $f_i(x)=0$, không hoạt động nếu $f_i(x)<0$.

Cặp $(x,\lambda)$ với $x$ khả thi và $\lambda\succeq0$ thỏa điều kiện bù trừ (complementary slackness) nếu $\lambda_if_i(x)=0$ với mọi $i=1,\ldots,m$.
:::

Mỗi tích $\lambda_if_i(x)$ là tích của một số không âm và một số không dương, nên bằng $0$ khi và chỉ khi ít nhất một thừa số bằng $0$. Điều kiện bù trừ vì vậy tương đương hai phép kéo theo:

$$
\lambda_i>0\ \Longrightarrow\ f_i(x)=0,\qquad f_i(x)<0\ \Longrightarrow\ \lambda_i=0 .
$$

Ví dụ: $(x,\lambda)=(2,2)$ của bài (1.1) thỏa, vì $f_1(2)=0$. Phản ví dụ: $(x,\lambda)=(3,2)$ không thỏa, vì $\lambda f_1(3)=-2$.

Điều kiện bù trừ là phần (c) của Mệnh đề 02.11 viết thành điều kiện trên cặp: ở đó, ràng buộc có $\mu_i>0$ chặt tại nghiệm. Điều kiện này không nói ràng buộc hoạt động phải có nhân tử dương; chiều đó sai (Nhận xét 03.28).

Kết quả sau đọc hai dấu bằng trong (2.4) tại một cặp tối ưu có khoảng bằng $0$; nó cần Hệ quả 03.10 và Định nghĩa 03.5, theo lập luận của Boyd và Vandenberghe (2004, mục 5.5.2, tr. 242–243).

::: proposition Mệnh đề 03.27 (Bù trừ và cực tiểu hóa hàm Lagrange tại nghiệm)
**Giả thiết.** Bài toán (2.1); $x^*$ là nghiệm của bài gốc, $(\lambda^*,\nu^*)$ là nghiệm đối ngẫu, và $f_0(x^*)=g(\lambda^*,\nu^*)$.

**Kết luận.**

1. $(x^*,\lambda^*)$ thỏa điều kiện bù trừ: $\lambda_i^*f_i(x^*)=0$ với mọi $i$.
2. $x^*$ là một điểm cực tiểu của $L(\cdot,\lambda^*,\nu^*)$ trên $D$.
3. Ngược lại, nếu $x$ khả thi, $\lambda\succeq0$, $(x,\lambda)$ thỏa bù trừ và $x$ cực tiểu hóa $L(\cdot,\lambda,\nu)$ trên $D$, thì $f_0(x)=g(\lambda,\nu)$, nên $x$ là nghiệm gốc và $(\lambda,\nu)$ là nghiệm đối ngẫu.

**Điều kiện áp dụng.** Không cần tính lồi hay khả vi. Giả thiết $f_0(x^*)=g(\lambda^*,\nu^*)$ tương đương đối ngẫu mạnh cùng sự đạt nghiệm ở cả hai phía.

**Phạm vi.** Phần 2 không nói $x^*$ là điểm cực tiểu duy nhất của $L(\cdot,\lambda^*,\nu^*)$; các điểm cực tiểu khác có thể không khả thi.
:::

::: proof Chứng minh Mệnh đề 03.27
**Bước 1 (chuỗi bất đẳng thức).**

Theo (2.4) với $x=x^*$ và giả thiết,

$$
\begin{aligned}
f_0(x^*)&=g(\lambda^*,\nu^*)\\
&\le L(x^*,\lambda^*,\nu^*)\\
&=f_0(x^*)+\sum_{i=1}^m\lambda_i^*f_i(x^*)\\
&\le f_0(x^*).
\end{aligned}
$$

Dòng thứ hai là định nghĩa cận dưới đúng. Dòng thứ ba dùng $Ax^*=b$. Dòng thứ tư dùng $\lambda_i^*\ge0$ và $f_i(x^*)\le0$. Hai đầu bằng nhau, nên cả hai bất đẳng thức là đẳng thức.

**Bước 2 (bù trừ).**

Đẳng thức thứ hai cho $\sum_i\lambda_i^*f_i(x^*)=0$. Mỗi số hạng không dương, và một tổng các số không dương bằng $0$ chỉ khi mọi số hạng bằng $0$. Đây là phần 1.

**Bước 3 (cực tiểu hóa $L$).**

Đẳng thức thứ nhất cho $L(x^*,\lambda^*,\nu^*)=\inf_{x\in D}L(x,\lambda^*,\nu^*)$, tức $x^*$ đạt cận dưới đúng. Đây là phần 2.

**Bước 4 (chiều ngược).**

Nếu $x$ cực tiểu hóa $L(\cdot,\lambda,\nu)$ thì $g(\lambda,\nu)=L(x,\lambda,\nu)$. Bù trừ và $Ax=b$ cho $L(x,\lambda,\nu)=f_0(x)$. Vậy $f_0(x)=g(\lambda,\nu)$, và Hệ quả 03.10(c) cho kết luận của phần 3. $\square$
:::

Mệnh đề 03.27 tách điều kiện tối ưu thành hai mảnh có thể kiểm tra riêng. Mảnh bù trừ là điều kiện tổ hợp: mỗi ràng buộc hoặc có nhân tử $0$, hoặc hoạt động. Mảnh cực tiểu hóa là một bài không ràng buộc theo $x$.

Phần 3 là phiên bản "theo cặp" của Hệ quả 03.10(c): không cần tính $g$ tại mọi nhân tử, chỉ cần kiểm tra một điểm cực tiểu của một hàm.

**Trong học máy.** Bù trừ cho biết ràng buộc nào không ảnh hưởng tới nghiệm. Trong máy vector hỗ trợ, ràng buộc lề của một mẫu nằm ngoài lề không hoạt động, nên nhân tử của mẫu đó bằng $0$ và mẫu không góp phần vào $w$ (Mệnh đề 03.36). Trong hồi quy có trần, trần không hoạt động thì nhân tử bằng $0$ và nghiệm trùng nghiệm không phạt (Mệnh đề 03.34). Giả thiết của Mệnh đề 03.27 được bảo đảm trong cả hai bài nhờ điều kiện Slater và nghiệm gốc tồn tại (Mệnh đề 02.39(b) cho máy vector hỗ trợ khi có cả hai nhãn; Định lý 01.36 cho hồi quy có trần).

::: example Ví dụ 03.16 (Bù trừ trong hai bài đã giải)
**Dữ kiện.**

Bài (1.1): $f_1(x)=(x-2)(x-4)$, $x^*=2$, $\lambda^*=2$, và $L(x,2)=3(x-2)^2+5$ (Ví dụ 03.2). Bài pha trộn (Ví dụ 03.5): ràng buộc $2x_1+x_2\ge4$, $x_1+2x_2\ge5$, $x_1\ge0$, $x_2\ge0$, nghiệm $x^*=(1,2)$, $\lambda^*=(\tfrac43,\tfrac13,0,0)$. Mệnh đề 03.27: nếu $x^*$ là nghiệm gốc, $(\lambda^*,\nu^*)$ là nghiệm đối ngẫu và $f_0(x^*)=g(\lambda^*,\nu^*)$, thì (1) $\lambda_i^*f_i(x^*)=0$ với mọi $i$; (2) $x^*$ cực tiểu hóa $L(\cdot,\lambda^*,\nu^*)$ trên $D$.

**Bài (1.1).**

$\lambda^*=2>0$, nên theo phần 1 ràng buộc phải hoạt động tại $x^*$: $f_1(2)=0$, đúng. Theo phần 2, $x^*=2$ cực tiểu hóa $L(\cdot,2)$, đúng vì $L(x,2)=3(x-2)^2+5$ theo Ví dụ 03.2.

**Bài pha trộn.**

$\lambda^*=(\tfrac43,\tfrac13,0,0)$ và $x^*=(1,2)$. Hai nhân tử dương ứng với hai ràng buộc dinh dưỡng, cả hai chặt: $2+2=4$ và $1+4=5$. Hai ràng buộc $x_j\ge0$ không hoạt động ($x_1^*=1>0$, $x_2^*=2>0$) và có nhân tử $0$.

**Kiểm tra lại.**

Mọi tích bằng $0$: $\tfrac43\cdot(4-4)=0$, $\tfrac13\cdot(5-5)=0$, $0\cdot(-1)=0$, $0\cdot(-2)=0$.
:::

::: remark Nhận xét 03.28 (Hoạt động không kéo theo nhân tử dương)
Xét $\min(x-1)^2$ với $f_1(x)=x-1\le0$. Nghiệm $x^*=1$, ràng buộc hoạt động. Hàm $L=(x-1)^2+\lambda(x-1)$ đạt cực tiểu tại $x=1-\frac\lambda2$, nên $g(\lambda)=\frac{\lambda^2}4-\frac{\lambda^2}2=-\frac{\lambda^2}4$, cực đại tại $\lambda^*=0$.

Ràng buộc hoạt động nhưng nhân tử bằng $0$, vì cực tiểu không ràng buộc của $(x-1)^2$ tình cờ nằm trên biên. Kết luận "hoạt động khi và chỉ khi nhân tử dương" vì vậy sai; chỉ có hai phép kéo theo sau Định nghĩa 03.26.

Ví dụ 03.14 tại $u=8$ và Tình huống 03.1 với $\rho=4$ là hai trường hợp khác của hiện tượng này.
:::

### 5.2 Hệ điều kiện KKT

Mệnh đề 03.27 phần 2 cho $x^*$ là điểm cực tiểu của $L(\cdot,\lambda^*,\nu^*)$ trên $D$. Khi $D=\mathbb R^n$ và các hàm khả vi, điều kiện cần bậc nhất cho cực tiểu không ràng buộc (Bài 00) biến khẳng định này thành một phương trình gradient.

Trực giác (chưa phải định nghĩa): tại nghiệm của bài (1.1), $f_0'(2)=4$ và $\lambda^*f_1'(2)=2\cdot(2\cdot2-6)=-4$; gradient của mục tiêu bị gradient của ràng buộc, nhân với nhân tử, cân bằng đúng.

::: definition Định nghĩa 03.29 (Hệ điều kiện KKT)
Cho bài toán (2.1) với $D=\mathbb R^n$ và $f_0,\ldots,f_m$ khả vi. Bộ $(x,\lambda,\nu)\in\mathbb R^n\times\mathbb R^m\times\mathbb R^p$ thỏa hệ điều kiện Karush–Kuhn–Tucker (KKT conditions) nếu bốn nhóm sau đúng.

1. Khả thi gốc: $f_i(x)\le0$ với mọi $i$, và $Ax=b$.
2. Khả thi đối ngẫu: $\lambda\succeq0$.
3. Bù trừ: $\lambda_if_i(x)=0$ với mọi $i$.
4. Dừng (stationarity):

$$
\nabla_xL(x,\lambda,\nu)=\nabla f_0(x)+\sum_{i=1}^m\lambda_i\nabla f_i(x)+A^T\nu=0 .
\tag{5.1}
$$
:::

Hệ KKT có $n+m+p$ ẩn. Nhóm 4 cho $n$ phương trình, nhóm 3 cho $m$ phương trình, đẳng thức $Ax=b$ cho $p$ phương trình; các bất đẳng thức của nhóm 1 và 2 dùng để loại nghiệm.

Hệ là tổng quát hóa của điều kiện $\nabla f_0(x)=0$ cho bài không ràng buộc: khi $m=p=0$, chỉ còn nhóm 4 với $\nabla f_0(x)=0$. Với đẳng thức mà không có bất đẳng thức, hệ là phương trình Lagrange cổ điển $\nabla f_0(x)+A^T\nu=0$, $Ax=b$, đối tượng của Bài 04.

Phản ví dụ cho nhầm lẫn "hệ KKT là điều kiện tối ưu": Nhận xét 03.33 có một bộ thỏa KKT mà không tối ưu, và một nghiệm không có bộ KKT nào.

Định lý sau cho biết khi nào một nghiệm bắt buộc phải thỏa KKT; nó cần Mệnh đề 03.27 và điều kiện cần bậc nhất của Bài 00, theo Boyd và Vandenberghe (2004, mục 5.5.3, tr. 243).

::: theorem Định lý 03.30 (KKT là điều kiện cần khi có đối ngẫu mạnh)
**Giả thiết.** Bài toán (2.1) với $D=\mathbb R^n$ và $f_0,\ldots,f_m$ khả vi; $x^*$ là nghiệm gốc; $(\lambda^*,\nu^*)$ là nghiệm đối ngẫu; $p^*=d^*$ hữu hạn.

**Kết luận.** $(x^*,\lambda^*,\nu^*)$ thỏa hệ KKT.

**Điều kiện áp dụng.** Không cần tính lồi. Cần cả hai phía đạt nghiệm và khoảng đối ngẫu bằng $0$.

**Phạm vi.** Khi đối ngẫu mạnh không đúng hoặc bài đối ngẫu không đạt nghiệm, định lý không áp dụng, và một nghiệm có thể không có bộ KKT (Nhận xét 03.33).
:::

::: proof Chứng minh Định lý 03.30
**Bước 1 (khả thi).**

Nhóm 1 đúng vì $x^*$ là nghiệm, nên khả thi. Nhóm 2 đúng vì nghiệm đối ngẫu khả thi đối ngẫu (Định nghĩa 03.9).

**Bước 2 (bù trừ).**

Vì $f_0(x^*)=p^*=d^*=g(\lambda^*,\nu^*)$, Mệnh đề 03.27 phần 1 cho nhóm 3.

**Bước 3 (dừng).**

Mệnh đề 03.27 phần 2 cho $x^*$ cực tiểu hóa hàm khả vi $L(\cdot,\lambda^*,\nu^*)$ trên tập mở $\mathbb R^n$. Theo điều kiện cần bậc nhất (Bài 00, Nhận xét 01.15), gradient tại $x^*$ bằng $0$; đó là (5.1). $\square$
:::

Áp dụng cho bài lồi, kết hợp với Định lý 03.15, cho kết quả thường dùng sau.

::: corollary Hệ quả 03.31 (Bài lồi có điểm Slater: mọi nghiệm có nhân tử KKT)
**Giả thiết.** Bài toán ở dạng chuẩn lồi với $D=\mathbb R^n$, các $f_i$ khả vi, thỏa điều kiện Slater; $x^*$ là một nghiệm.

**Kết luận.** Có $(\lambda^*,\nu^*)$ để $(x^*,\lambda^*,\nu^*)$ thỏa hệ KKT; mọi nghiệm đối ngẫu đều dùng được.

**Điều kiện áp dụng.** Cần sự tồn tại của nghiệm $x^*$; điều kiện Slater không bảo đảm điều đó (Ví dụ 03.11).

**Phạm vi.** Hệ quả không cho cách tìm $x^*$.
:::

::: proof Chứng minh Hệ quả 03.31
**Bước 1 (nghiệm đối ngẫu).**

$p^*=f_0(x^*)$ hữu hạn. Định lý 03.15(a) cho $d^*=p^*$ và một nghiệm đối ngẫu $(\lambda^*,\nu^*)$.

**Bước 2 (KKT).**

Các giả thiết của Định lý 03.30 thỏa, nên $(x^*,\lambda^*,\nu^*)$ thỏa KKT. $\square$
:::

Định lý sau cho chiều ngược, khi nào một bộ thỏa KKT là chứng nhận tối ưu; nó cần Định lý 01.31(a), Hệ quả 01.27 và Mệnh đề 03.27 phần 3, theo Boyd và Vandenberghe (2004, mục 5.5.3, tr. 244).

::: theorem Định lý 03.32 (KKT là điều kiện đủ cho bài lồi)
**Giả thiết.** Bài toán ở dạng chuẩn lồi với $D=\mathbb R^n$: $f_0,\ldots,f_m$ lồi, khả vi; $(\tilde x,\tilde\lambda,\tilde\nu)$ thỏa hệ KKT.

**Kết luận.** $\tilde x$ là nghiệm gốc, $(\tilde\lambda,\tilde\nu)$ là nghiệm đối ngẫu, và $f_0(\tilde x)=g(\tilde\lambda,\tilde\nu)$, nên $p^*=d^*$.

**Điều kiện áp dụng.** Không cần điều kiện Slater.

**Phạm vi.** Bỏ tính lồi thì kết luận sai (Nhận xét 03.33). Định lý không bảo đảm có bộ KKT; điều đó cần Hệ quả 03.31. Chứng minh giữ nguyên khi $D$ là tập mở lồi thay cho $\mathbb R^n$, vì Hệ quả 01.27 áp dụng trên tập mở lồi.
:::

::: proof Chứng minh Định lý 03.32
**Bước 1 (hàm Lagrange lồi theo $x$).**

$L(\cdot,\tilde\lambda,\tilde\nu)=f_0+\sum_i\tilde\lambda_if_i+\tilde\nu^T(A\,\cdot-b)$ là tổng của hàm lồi $f_0$, các hàm lồi $f_i$ nhân hệ số $\tilde\lambda_i\ge0$, và một hàm affine. Theo Định lý 01.31(a), hàm này lồi. Bước này dùng nhóm 2 và tính affine của đẳng thức.

**Bước 2 (dừng kéo theo cực tiểu toàn cục).**

Nhóm 4 nói gradient của hàm lồi khả vi $L(\cdot,\tilde\lambda,\tilde\nu)$ bằng $0$ tại $\tilde x$. Theo Hệ quả 01.27, $\tilde x$ là cực tiểu toàn cục của nó trên $\mathbb R^n$.

**Bước 3 (kết luận).**

Bốn điều kiện của Mệnh đề 03.27 phần 3 đều có:

- $\tilde x$ khả thi, theo nhóm 1;
- $\tilde\lambda\succeq0$, theo nhóm 2;
- bù trừ đúng, theo nhóm 3;
- $\tilde x$ cực tiểu hóa $L(\cdot,\tilde\lambda,\tilde\nu)$, theo Bước 2.

Mệnh đề đó cho kết luận. $\square$
:::

Hai định lý chia đôi vai trò. Định lý 03.30 đi từ nghiệm tới nhân tử và cần đối ngẫu mạnh có nghiệm đối ngẫu, nhưng không cần lồi. Định lý 03.32 đi từ một bộ KKT tới nghiệm và cần lồi, nhưng không cần Slater.

Với bài lồi khả vi thỏa Slater, hai chiều gộp lại: $x^*$ là nghiệm khi và chỉ khi có $(\lambda,\nu)$ để $(x^*,\lambda,\nu)$ thỏa KKT. So với Hệ quả 01.27 của Bài 01, kết quả này thay điều kiện "$\nabla f_0(x^*)^T(x-x^*)\ge0$ với mọi $x$ khả thi", phải kiểm tra trên vô số điểm, bằng một hệ hữu hạn phương trình và bất phương trình.

**Trong học máy.** Hầu hết bộ giải cho các bài lồi có ràng buộc của học máy được thiết kế như phương pháp giải hệ KKT. Boyd và Vandenberghe (2004, mục 5.5.3, tr. 244) nêu nhận xét này cho tối ưu lồi nói chung. Phương pháp điểm trong (interior-point method) thay bù trừ $\lambda_if_i(x)=0$ bằng $\lambda_if_i(x)=-\epsilon$ rồi giảm dần $\epsilon$. Thuật toán SMO của Platt dừng khi mọi mẫu vi phạm điều kiện KKT của Mệnh đề 03.36 ít hơn một ngưỡng cho trước.

Giả thiết lồi của Định lý 03.32 thỏa với hồi quy có trần, hồi quy LASSO (least absolute shrinkage and selection operator) và máy vector hỗ trợ, nên một bộ KKT là chứng nhận toàn cục. Với mất mát của mạng sâu, giả thiết đó vi phạm: một điểm có gradient bằng $0$ của hàm Lagrange có thể chỉ là điểm yên ngựa (saddle point) hay cực tiểu địa phương (Bài 06).

::: example Ví dụ 03.17 (Giải bài toán xuyên suốt bằng hệ KKT)
**Dữ kiện.**

Bài (1.1): $\min_{x\in\mathbb R}f_0(x)=x^2+1$ với $f_1(x)=(x-2)(x-4)\le0$.

**Lập hệ.**

$f_0'(x)=2x$, $f_1'(x)=2x-6$. Hệ KKT gồm $(x-2)(x-4)\le0$, $\lambda\ge0$, $\lambda(x-2)(x-4)=0$ và

$$
2x+\lambda(2x-6)=0 .
$$

**Giải theo nhánh bù trừ.**

Bù trừ cho hai nhánh.

1. Nhánh $\lambda=0$: dừng cho $x=0$; nhưng $f_1(0)=8>0$, vi phạm khả thi gốc. Loại.
2. Nhánh $f_1(x)=0$, tức $x=2$ hoặc $x=4$.
   - $x=2$: dừng cho $4-2\lambda=0$, $\lambda=2\ge0$. Hợp lệ.
   - $x=4$: dừng cho $8+2\lambda=0$, $\lambda=-4<0$, vi phạm khả thi đối ngẫu. Loại.

**Kết luận.**

Bộ KKT duy nhất là $(x,\lambda)=(2,2)$. Bài lồi, nên Định lý 03.32 cho $x^*=2$, $\lambda^*=2$, $p^*=d^*=5$, không cần tính $g$.

**Kiểm tra lại.**

Khớp Ví dụ 03.4. Ứng viên $x=4$ bị loại vì sai dấu nhân tử: tại $x=4$, gradient của mục tiêu và của ràng buộc cùng hướng, nên không nhân tử không âm nào cân bằng được.
:::

![Hai khung. Khung trái: đoạn khả thi từ 2 đến 4 với điểm khả thi chặt 3; hai ô so sánh ứng viên x bằng 2 (4 trừ 2 lambda bằng 0 cho lambda bằng 2, không âm, thỏa đủ bốn nhóm) và ứng viên x bằng 4 (8 cộng 2 lambda bằng 0 cho lambda bằng âm 4, sai dấu, bị loại). Khung phải: một nửa mặt phẳng khả thi được tô và một điểm Slater bên trong; nghiệm là hình chiếu của gốc tọa độ lên đường biên, nơi ràng buộc hoạt động; tại đó gradient của mục tiêu và gradient của ràng buộc nhân với nhân tử là hai vector ngược chiều, cân bằng nhau. Hàng dưới: bốn ô ghi bốn nhóm điều kiện khả thi gốc, khả thi đối ngẫu, bù trừ, dừng.](img/lec-03/kkt-active-projection.svg)

Khung trái của hình tóm tắt Ví dụ 03.17. Khung phải minh họa cân bằng gradient tại một ràng buộc hoạt động cho bài chiếu gốc tọa độ lên một nửa mặt phẳng tổng quát; cần nhìn hai vector ngược chiều tại điểm chiếu. Ví dụ 03.18 dưới đây giải một bài chiếu với dữ liệu khác hình. Ô "Dừng" ở hàng dưới viết điều kiện dừng dạng tổng quát cho miền $D$ có biên, với nón pháp tuyến $N_D(x^*)$; khi $D=\mathbb R^n$ như trong chương này, nón đó chỉ gồm vector $0$, và ô này trở thành (5.1).

::: example Ví dụ 03.18 (Chiếu lên nửa mặt phẳng và lên đường thẳng)
**(a) Bất đẳng thức: lập hệ.**

$\min x_1^2+x_2^2$ với $f_1(x)=5-x_1-2x_2\le0$. Dừng: $2x_1-\lambda=0$ và $2x_2-2\lambda=0$, nên $x=(\frac\lambda2,\lambda)$.

**(a) Giải theo nhánh bù trừ.**

1. Nhánh $\lambda=0$: $x=(0,0)$, có $f_1=5>0$. Loại.
2. Nhánh $x_1+2x_2=5$: thay $x=(\frac\lambda2,\lambda)$ cho $\frac{5\lambda}2=5$, nên $\lambda=2$, $x=(1,2)$, $p^*=1+4=5$.

Bài lồi, nên Định lý 03.32 cho đây là nghiệm.

**(b) Đẳng thức.**

$\min x_1^2+x_2^2$ với $x_1+2x_2=5$. Không có bất đẳng thức, hệ KKT là hệ tuyến tính ba ẩn:

$$
2x_1+\nu=0,\qquad2x_2+2\nu=0,\qquad x_1+2x_2=5 .
$$

Hai phương trình đầu cho $x=(-\frac\nu2,-\nu)$; thay vào phương trình thứ ba: $-\frac{5\nu}2=5$, nên $\nu=-2$ và $x=(1,2)$.

**Diễn giải.**

Cùng nghiệm, nhưng $\lambda=2\ge0$ ở (a) và $\nu=-2$ ở (b). Nhân tử đẳng thức được phép âm; dấu của nó chỉ phản ánh cách viết $x_1+2x_2-5=0$ hay $5-x_1-2x_2=0$.

Phần (b) cho thấy với đẳng thức và mục tiêu bậc hai, KKT là một hệ phương trình tuyến tính. Bài 04 áp dụng phương pháp Newton cho loại hệ này khi mục tiêu không còn bậc hai.

**Kiểm tra lại.**

Ở (a), thay điểm cực tiểu $x=(\frac\lambda2,\lambda)$ của $L(\cdot,\lambda)$ vào $L$:

$$
\begin{aligned}
g(\lambda)&=\tfrac{\lambda^2}4+\lambda^2+\lambda\bigl(5-\tfrac\lambda2-2\lambda\bigr)\\
&=5\lambda-\tfrac54\lambda^2 .
\end{aligned}
$$

Hàm này cực đại tại $\lambda=2$ với $g=10-5=5=p^*$. Điểm khả thi $(5,0)$ có $f_0=25>5$. Điểm $(1,2)$ là hình chiếu của gốc lên đường $x_1+2x_2=5$, vì $(1,2)$ cùng phương với pháp tuyến $(1,2)$.
:::

::: remark Nhận xét 03.33 (Tính cần và tính đủ có thể hỏng)
**KKT không đủ khi bài không lồi.** Xét $\min-x^2$ với $x-1\le0$ và $-x-1\le0$. Dừng: $-2x+\lambda_1-\lambda_2=0$. Bộ $(x,\lambda)=(0,0,0)$ thỏa cả bốn nhóm với giá trị $0$, nhưng $x=\pm1$ cho $-1<0$.

Hàm $-x^2$ không lồi, nên Định lý 03.32 không áp dụng. Ở bài này $g\equiv-\infty$ vì $-x^2$ không bị chặn dưới, nên $d^*=-\infty<p^*=-1$.

**KKT không cần khi thiếu nghiệm đối ngẫu.** Bài thứ nhất của Ví dụ 03.10, $\min x_1+x_2$ với $x_1^2+x_2^2\le0$, có nghiệm $x^*=0$, nhưng dừng đòi $(1,1)+2\lambda(0,0)=0$, vô nghiệm. Bài lồi và có nghiệm, nhưng không có điểm Slater, và Ví dụ 03.10 cho thấy bài đối ngẫu không đạt nghiệm.

**Bài không lồi vẫn có thể có bộ KKT tại nghiệm.** Trong bài thứ nhất, $x=1$ với $\lambda=(2,0)$ thỏa KKT dù đối ngẫu mạnh không đúng; Nhận xét 03.17 có một hiện tượng cùng loại cho đối ngẫu mạnh. Tính cần của KKT tại cực tiểu địa phương của bài không lồi dưới các điều kiện chính quy khác nằm ngoài phạm vi học phần; xem Nocedal và Wright (2006, mục 12.3, Định lý 12.1).
:::

### 5.3 Hồi quy có trần và quan hệ trần – hình phạt

Mệnh đề 02.26 chỉ ra một chiều: nghiệm của bài có phạt $\ell(w)+\rho R(w)$ là nghiệm của bài có trần $R(w)\le R(w_\rho)$. Chiều ngược, mỗi mức trần ứng với một hệ số phạt, được Bài 02 để ngỏ vì cần đối ngẫu. Kết quả sau cần Định lý 03.15 và Mệnh đề 03.27.

::: proposition Mệnh đề 03.34 (Trần sinh ra hệ số phạt bằng nhân tử)
**Giả thiết.** $\ell,R:\mathbb R^d\to\mathbb R$ lồi; $r\in\mathbb R$ và có $\bar w$ với $R(\bar w)<r$; $w^*$ là nghiệm của $\min\ell(w)$ với $R(w)-r\le0$.

**Kết luận.** Có $\lambda^*\ge0$ sao cho:

1. $w^*$ là nghiệm của bài có phạt $\min_w\ell(w)+\lambda^*R(w)$;
2. $\lambda^*\bigl(R(w^*)-r\bigr)=0$;
3. với mọi mức trần $r'$, giá trị tối ưu $p^*(r')$ của bài có trần $r'$ thỏa $p^*(r')\ge p^*(r)-\lambda^*(r'-r)$.

**Điều kiện áp dụng.** Cần tính lồi và điểm Slater $\bar w$; không cần khả vi.

**Phạm vi.** Khi trần không hoạt động, $\lambda^*=0$ và bài có phạt là bài không phạt. Mệnh đề không khẳng định $\lambda^*$ duy nhất.
:::

::: proof Chứng minh Mệnh đề 03.34
**Bước 1 (nhân tử).**

Bài có trần ở dạng chuẩn lồi với $D=\mathbb R^d$, có điểm Slater $\bar w$, và $p^*=\ell(w^*)$ hữu hạn. Định lý 03.15(a) cho một nghiệm đối ngẫu $\lambda^*\ge0$ với $g(\lambda^*)=p^*$.

**Bước 2 (bù trừ và cực tiểu hóa).**

Mệnh đề 03.27 cho phần 2, và cho $w^*$ cực tiểu hóa $L(w,\lambda^*)=\ell(w)+\lambda^*R(w)-\lambda^*r$ trên $\mathbb R^d$. Hằng số $-\lambda^*r$ không đổi điểm cực tiểu, nên $w^*$ là nghiệm của bài có phạt.

**Bước 3 (độ nhạy).**

Bài có trần $r'$ là bài nhiễu (4.1) với $u=r'-r$. Mệnh đề 03.23 cho phần 3. $\square$
:::

Mệnh đề 03.34 cùng Mệnh đề 02.26 cho quan hệ hai chiều giữa trần và hình phạt khi bài lồi có điểm Slater. Hệ số phạt tương ứng với một mức trần chính là nhân tử của trần đó, và theo Hệ quả 03.24, nó đo tốc độ giảm của mất mát khi nới trần.

Không có tính lồi, chiều ngược không còn được bảo đảm. Khi miền không lồi, như miền giới hạn số đặc trưng của Mệnh đề 02.45, Mệnh đề 03.34 không áp dụng.

::: example Ví dụ 03.19 (Hồi quy hai trọng số với trần chuẩn)
**Mô hình.**

Ma trận thiết kế $X=I_2$, đầu ra $y=(3,4)$, trần $\tau=1$:

$$
\min_{w\in\mathbb R^2}\ \tfrac12\lVert w-y\rVert_2^2\qquad\text{subject to}\quad\lVert w\rVert_2^2-1\le0 .
$$

**Kiểm giả thiết.**

Mục tiêu và ràng buộc lồi, khả vi; $w=0$ là điểm Slater; tập khả thi đóng, bị chặn, nên có nghiệm (Định lý 01.36). Theo Hệ quả 03.31 và Định lý 03.32, giải hệ KKT là đủ.

**Giải hệ KKT.**

Dừng: $(w-y)+2\lambda w=0$, nên $w=\frac{y}{1+2\lambda}$.

1. Nhánh $\lambda=0$: $w=y$, $\lVert y\rVert_2^2=25>1$. Loại.
2. Nhánh $\lVert w\rVert_2^2=1$: $\frac{5}{1+2\lambda}=1$, nên $\lambda^*=2$ và $w^*=(0{,}6;\,0{,}8)$.

Mất mát tối ưu: $\tfrac12\bigl(2{,}4^2+3{,}2^2\bigr)=\tfrac12(5{,}76+10{,}24)=8$.

**Diễn giải.**

Theo Mệnh đề 03.34, $w^*$ cũng là nghiệm của bài có phạt $\tfrac12\lVert w-y\rVert_2^2+2\lVert w\rVert_2^2$. Hàm giá trị là $p^*(\tau)=\tfrac12(5-\sqrt\tau)^2$ với $\tau\le25$, vì nghiệm là điểm của hình tròn bán kính $\sqrt\tau$ gần $y$ nhất. Đạo hàm tại $\tau=1$ là $-\frac{5-1}{2}=-2=-\lambda^*$, đúng (4.3).

**Kiểm tra lại.**

Bài có phạt: dừng $(w-y)+4w=0$ cho $w=\frac y5=(0{,}6;\,0{,}8)$. Bốn nhóm KKT: $\lVert w^*\rVert_2^2=0{,}36+0{,}64=1$; $\lambda^*=2\ge0$; $2\cdot0=0$; $(0{,}6-3)+4\cdot0{,}6=0$ và $(0{,}8-4)+4\cdot0{,}8=0$.
:::

Ví dụ 03.19 dùng $X=I$, nên nghiệm có công thức đóng. Với $X$ tổng quát, phần còn lại của mục dùng mục tiêu $E(w)=\lVert Xw-y\rVert_2^2$ như Bài 02, không có hệ số $\tfrac12$.

Với trần $\lVert w\rVert_2^2\le\tau$ và nhân tử $\lambda$, phương trình dừng của hệ KKT là $(X^TX+\lambda I)w=X^Ty$. Đó cũng là phương trình dừng của bài có phạt $E+\rho\lVert w\rVert_2^2$ với $\rho=\lambda$. Với mục tiêu có hệ số $\tfrac12$ như Ví dụ 03.19, phương trình dừng là $(X^TX+2\lambda I)w=X^Ty$, nên nhân tử của cách viết không có $\tfrac12$ bằng hai lần nhân tử của cách viết có $\tfrac12$.

Nhân tử của trần vì vậy là nghiệm $\rho$ của phương trình một ẩn $\lVert w(\rho)\rVert_2^2=\tau$. Kết quả sau cho phép giải phương trình đó bằng chia đôi.

::: proposition Mệnh đề 03.35 (Chuẩn của nghiệm hồi quy ridge giảm theo hệ số phạt)
**Giả thiết.** $X\in\mathbb R^{N\times d}$ có hạng cột đầy đủ, $y\in\mathbb R^N$ với $X^Ty\neq0$, $E(w)=\lVert Xw-y\rVert_2^2$. Với $\rho\ge0$, $w(\rho)$ là nghiệm của $\min_wE(w)+\rho\lVert w\rVert_2^2$.

**Kết luận.**

1. $w(\rho)=(X^TX+\rho I)^{-1}X^Ty$, liên tục theo $\rho\ge0$.
2. $\varphi(\rho)=\lVert w(\rho)\rVert_2^2$ giảm chặt trên $[0,\infty)$.
3. $\varphi(\rho)\le\frac{\lVert X^Ty\rVert_2^2}{\rho^2}$ với $\rho>0$, nên $\varphi(\rho)\to0$ khi $\rho\to\infty$.

Do đó với mọi $0<\tau<\varphi(0)$, phương trình $\varphi(\rho)=\tau$ có đúng một nghiệm $\rho^*>0$.

**Điều kiện áp dụng.** Hạng cột đầy đủ để $w(0)$ xác định duy nhất; $X^Ty\neq0$ để $\varphi$ không đồng nhất bằng $0$.

**Phạm vi.** Khi $X$ thiếu hạng, kết luận vẫn đúng trên $(0,\infty)$ với $w(0)$ thay bằng nghiệm bình phương nhỏ nhất có chuẩn nhỏ nhất; chương không chứng minh trường hợp đó.
:::

::: proof Chứng minh Mệnh đề 03.35
**Bước 1 (công thức và tính liên tục).**

Gradient của $E+\rho\lVert\cdot\rVert_2^2$ là $2(X^TX+\rho I)w-2X^Ty$. Ma trận $X^TX+\rho I\succ0$ vì $X^TX\succ0$ khi hạng cột đầy đủ, nên khả nghịch, và phương trình gradient bằng $0$ có đúng một nghiệm. Theo Hệ quả 01.27, nghiệm đó là cực tiểu toàn cục; hàm có Hessian $2(X^TX+\rho I)\succ0$ nên lồi chặt (Định lý 01.30(b)) và có nhiều nhất một nghiệm (Định lý 01.35). Các phần tử của ma trận nghịch đảo là hàm hữu tỷ của $\rho$ với mẫu khác $0$, nên liên tục.

**Bước 2 (đơn điệu).**

Lấy $0\le\rho_1<\rho_2$, $w_k=w(\rho_k)$. Tính tối ưu của từng nghiệm cho

$$
E(w_1)+\rho_1\lVert w_1\rVert_2^2\le E(w_2)+\rho_1\lVert w_2\rVert_2^2,\qquad E(w_2)+\rho_2\lVert w_2\rVert_2^2\le E(w_1)+\rho_2\lVert w_1\rVert_2^2 .
$$

Cộng hai bất đẳng thức và rút gọn $E(w_1)+E(w_2)$ cho $(\rho_2-\rho_1)\bigl(\lVert w_2\rVert_2^2-\lVert w_1\rVert_2^2\bigr)\le0$, nên $\varphi(\rho_2)\le\varphi(\rho_1)$.

**Bước 3 (đơn điệu chặt).**

Nếu $\varphi(\rho_2)=\varphi(\rho_1)$, bất đẳng thức thứ nhất cho $E(w_1)\le E(w_2)$ và bất đẳng thức thứ hai cho $E(w_2)\le E(w_1)$, nên $w_2$ cũng đạt giá trị tối ưu của bài với $\rho_1$. Tính duy nhất cho $w_1=w_2$. Trừ hai phương trình gradient: $(\rho_2-\rho_1)w_1=0$, nên $w_1=0$ và $X^Ty=(X^TX+\rho_1I)\cdot0=0$, trái giả thiết.

**Bước 4 (giới hạn).**

Nhân phương trình $(X^TX+\rho I)w=X^Ty$ với $w^T$: $\lVert Xw\rVert_2^2+\rho\lVert w\rVert_2^2=w^TX^Ty\le\lVert w\rVert_2\lVert X^Ty\rVert_2$ theo Cauchy–Schwarz. Bỏ số hạng không âm $\lVert Xw\rVert_2^2$ và chia cho $\rho\lVert w\rVert_2$ (khi $w\neq0$) cho $\lVert w\rVert_2\le\frac{\lVert X^Ty\rVert_2}\rho$.

**Bước 5 (nghiệm duy nhất).**

$\varphi$ liên tục, giảm chặt từ $\varphi(0)>\tau$ về giới hạn $0<\tau$, nên định lý giá trị trung gian cho đúng một $\rho^*>0$ với $\varphi(\rho^*)=\tau$. $\square$
:::

Thuật toán sau giải phương trình $\varphi(\rho)=\tau$; theo Mệnh đề 03.34, nghiệm $\rho^*$ là nhân tử $\lambda^*$ của trần.

::: algorithm Thuật toán 03.1 (Chia đôi nhân tử cho hồi quy có trần)
**Đầu vào.** $X$ có hạng cột đầy đủ, $y$ với $X^Ty\neq0$, trần $\tau>0$, sai số $\varepsilon>0$.

**Đầu ra.** Nhân tử $\lambda$ và trọng số $w$ khả thi với $\lvert\lambda-\lambda^*\rvert\le\varepsilon$.

1. Giải $X^TXw_0=X^Ty$. Nếu $\lVert w_0\rVert_2^2\le\tau$, trả về $\lambda=0$, $w=w_0$ và dừng.
2. Đặt $\lambda_{\mathrm{lo}}=0$, $\lambda_{\mathrm{hi}}=1$. Trong khi $\varphi(\lambda_{\mathrm{hi}})>\tau$, đặt $\lambda_{\mathrm{hi}}\leftarrow2\lambda_{\mathrm{hi}}$.
3. Lặp: đặt $c=\frac{\lambda_{\mathrm{lo}}+\lambda_{\mathrm{hi}}}2$ và giải $(X^TX+cI)w=X^Ty$. Nếu $\lVert w\rVert_2^2>\tau$, đặt $\lambda_{\mathrm{lo}}=c$; ngược lại đặt $\lambda_{\mathrm{hi}}=c$.
4. Dừng khi $\lambda_{\mathrm{hi}}-\lambda_{\mathrm{lo}}\le\varepsilon$; trả về $\lambda=\lambda_{\mathrm{hi}}$ và $w=w(\lambda_{\mathrm{hi}})$.

**Chi phí.** Mỗi lần tính $\varphi$ giải một hệ $d\times d$ xác định dương, khoảng $\tfrac13d^3$ phép tính bằng phân tích Cholesky. Bước 3 cần khoảng $\log_2(\lambda_0/\varepsilon)$ lần lặp, với $\lambda_0$ là giá trị $\lambda_{\mathrm{hi}}$ sau bước 2.

**Bảo đảm.** Theo Mệnh đề 03.35, $\varphi(\lambda_{\mathrm{lo}})>\tau\ge\varphi(\lambda_{\mathrm{hi}})$ được giữ ở mọi lần lặp, nên $\lambda^*\in(\lambda_{\mathrm{lo}},\lambda_{\mathrm{hi}}]$.

Trọng số trả về khả thi vì $\varphi(\lambda_{\mathrm{hi}})\le\tau$. Nó cực tiểu hóa $E+\lambda_{\mathrm{hi}}\lVert w\rVert_2^2$, tức hàm Lagrange của bài có trần $\varphi(\lambda_{\mathrm{hi}})$ với nhân tử $\lambda_{\mathrm{hi}}$, và trần đó hoạt động. Theo Mệnh đề 03.27 phần 3, nó là nghiệm của bài có trần $\varphi(\lambda_{\mathrm{hi}})$, và $\lambda_{\mathrm{hi}}$ là nghiệm đối ngẫu của bài đó.

Theo (4.2) áp cho bài có trần $\varphi(\lambda_{\mathrm{hi}})$, mất mát của trọng số trả về vượt giá trị tối ưu của bài có trần $\tau$ không quá $\lambda_{\mathrm{hi}}\bigl(\tau-\varphi(\lambda_{\mathrm{hi}})\bigr)$.
:::

### 5.4 Máy vector hỗ trợ lề mềm và vector hỗ trợ

Mệnh đề 02.39 đưa máy vector hỗ trợ lề mềm về quy hoạch bậc hai, nhưng chưa cho biết mẫu nào quyết định nghiệm. Kết quả sau cần Định lý 03.15, Hệ quả 03.31 và Định lý 03.32; dạng bài theo Boyd và Vandenberghe (2004, mục 8.6.1, tr. 425–426).

::: proposition Mệnh đề 03.36 (Bài đối ngẫu và điều kiện KKT của máy vector hỗ trợ lề mềm)
**Giả thiết.** Dữ liệu $(z_i,y_i)\in\mathbb R^d\times\{-1,+1\}$, $i=1,\ldots,N$; $\rho>0$. Bài gốc là quy hoạch bậc hai

$$
\begin{aligned}
\underset{w,b,\xi}{\operatorname{minimize}}\quad&\frac\rho2\lVert w\rVert_2^2+\mathbf 1^T\xi\\
\text{subject to}\quad&1-y_i(w^Tz_i+b)-\xi_i\le0,\quad-\xi_i\le0,\quad i=1,\ldots,N,
\end{aligned}
\tag{5.2}
$$

với nhân tử $\alpha_i$ cho ràng buộc lề và $\beta_i$ cho $-\xi_i\le0$. Ký hiệu biên $m_i=y_i(w^Tz_i+b)$.

**Kết luận.** Đặt

$$
h(\alpha)=\sum_{i=1}^N\alpha_i-\frac1{2\rho}\Bigl\lVert\sum_{i=1}^N\alpha_iy_iz_i\Bigr\rVert_2^2 .
\tag{5.3}
$$

1. Với $\alpha,\beta\succeq0$: $g(\alpha,\beta)=h(\alpha)$ nếu $\sum_i\alpha_iy_i=0$ và $\alpha_i+\beta_i=1$ với mọi $i$, ngược lại $g=-\infty$. Bài đối ngẫu là cực đại $h(\alpha)$ với $\sum_i\alpha_iy_i=0$ và $0\le\alpha_i\le1$.
2. Đối ngẫu mạnh đúng và bài đối ngẫu đạt nghiệm.
3. $(w,b,\xi)$ là nghiệm khi và chỉ khi có $\alpha$ với $0\le\alpha_i\le1$, $\sum_i\alpha_iy_i=0$, $w=\frac1\rho\sum_i\alpha_iy_iz_i$, $\xi_i=\max(0,1-m_i)$, và với mọi $i$:
   - $m_i>1\Rightarrow\alpha_i=0$;
   - $m_i<1\Rightarrow\alpha_i=1$;
   - $0<\alpha_i<1\Rightarrow m_i=1$.

**Điều kiện áp dụng.** $\rho>0$; không cần dữ liệu tách được.

**Phạm vi.** Mệnh đề không cho công thức của $b$; khi có $i$ với $0<\alpha_i<1$, $b$ suy ra từ $m_i=1$.
:::

::: proof Chứng minh Mệnh đề 03.36
**Bước 1 (hàm Lagrange).**

Gom theo từng biến:

$$
L=\frac\rho2\lVert w\rVert_2^2-w^T\Bigl(\sum_i\alpha_iy_iz_i\Bigr)-b\sum_i\alpha_iy_i+\sum_i(1-\alpha_i-\beta_i)\xi_i+\sum_i\alpha_i .
$$

**Bước 2 (hàm đối ngẫu).**

$L$ affine theo $b$ và theo từng $\xi_i$, nên bị chặn dưới chỉ khi các hệ số $\sum_i\alpha_iy_i$ và $1-\alpha_i-\beta_i$ bằng $0$, như trong chứng minh Mệnh đề 03.11. Khi đó, cực tiểu theo $w$ của hàm bậc hai lồi chặt đạt tại $w=\frac1\rho\sum_i\alpha_iy_iz_i$, với giá trị $-\frac1{2\rho}\lVert\sum_i\alpha_iy_iz_i\rVert_2^2$. Điều kiện $\beta_i=1-\alpha_i\ge0$ cho $\alpha_i\le1$. Đây là phần 1.

**Bước 3 (đối ngẫu mạnh).**

Điểm $w=0$, $b=0$, $\xi_i=2$ là điểm Slater (mục "Trong học máy" của Mục 3), mục tiêu lồi, $p^*\ge0$ hữu hạn. Định lý 03.15(a) cho phần 2.

**Bước 4 (KKT).**

Bài lồi, khả vi và thỏa điều kiện Slater. Nếu $(w,b,\xi)$ là nghiệm, Hệ quả 03.31 cho một bộ $(\alpha,\beta)$ thỏa KKT. Dừng theo $w$, $b$, $\xi_i$ cho $w=\frac1\rho\sum_i\alpha_iy_iz_i$, $\sum_i\alpha_iy_i=0$, $\beta_i=1-\alpha_i$; khả thi đối ngẫu cho $0\le\alpha_i\le1$.

**Bước 5 (đọc bù trừ).**

Hai điều kiện bù trừ là $\alpha_i(1-m_i-\xi_i)=0$ và $\beta_i\xi_i=0$.

- Nếu $m_i>1$: $1-m_i-\xi_i<0$ vì $\xi_i\ge0$, nên $\alpha_i=0$.
- Nếu $m_i<1$: $\xi_i\ge1-m_i>0$, nên $\beta_i=0$ và $\alpha_i=1$.
- Nếu $0<\alpha_i<1$: $\beta_i>0$ cho $\xi_i=0$, và $\alpha_i>0$ cho $1-m_i-\xi_i=0$, nên $m_i=1$.

Với $w,b$ cố định, mục tiêu tăng theo $\xi_i$, nên tại nghiệm $\xi_i$ nhận giá trị nhỏ nhất cho phép, $\max(0,1-m_i)$. Bốn bước trên chứng minh chiều thuận của phần 3.

**Bước 6 (chiều ngược của phần 3).**

Cho $(w,b,\xi)$ và $\alpha$ thỏa các điều kiện của phần 3. Đặt $\beta_i=1-\alpha_i\ge0$ và kiểm tra bốn nhóm KKT.

- Khả thi gốc: $\xi_i=\max(0,1-m_i)$ thỏa $\xi_i\ge0$ và $\xi_i\ge1-m_i$.
- Khả thi đối ngẫu: $\alpha_i\ge0$ và $\beta_i\ge0$.
- Dừng: đúng ba đẳng thức của Bước 4.
- Bù trừ, theo ba trường hợp của $m_i$:
   - $m_i>1$: $\alpha_i=0$, và $\xi_i=0$ nên $\beta_i\xi_i=0$;
   - $m_i=1$: $\xi_i=0$ và $1-m_i-\xi_i=0$, nên cả hai tích bằng $0$;
   - $m_i<1$: $\alpha_i=1$, $\beta_i=0$, và $\xi_i=1-m_i$ nên $1-m_i-\xi_i=0$.

Bài lồi và khả vi, nên Định lý 03.32 cho $(w,b,\xi)$ là nghiệm. $\square$
:::

Mệnh đề 03.36 phân loại các mẫu theo nhân tử. Mẫu có $\alpha_i=0$ có biên $m_i\ge1$ và không xuất hiện trong $w$. Bỏ nó khỏi tập huấn luyện, khi dữ liệu còn lại có cả hai nhãn, thì nghiệm cũ vẫn thỏa các điều kiện của phần 3 cho dữ liệu mới, nên vẫn là nghiệm, và $w$ không đổi vì $w$ duy nhất; hệ số chặn $b$ có thể không duy nhất.

Mẫu có $\alpha_i>0$ gọi là vector hỗ trợ (support vector). Chúng thuộc một trong hai loại:

- nằm đúng trên lề: $0<\alpha_i<1$ và $m_i=1$;
- vi phạm lề hoặc nằm trên lề với nhân tử tối đa: $\alpha_i=1$ và $m_i\le1$.

Vector $w$ là tổ hợp tuyến tính của riêng các vector hỗ trợ.

::: remark Nhận xét 03.37 (Ba điểm về vector hỗ trợ và hệ số $\rho$)
1. **Mẫu trên lề không nhất thiết là vector hỗ trợ.** Hoạt động không kéo theo nhân tử dương (Nhận xét 03.28); Tình huống 03.1 với $\rho=4$ có hai mẫu như vậy.
2. **Dữ liệu chỉ vào bài đối ngẫu qua tích vô hướng.** Bài đối ngẫu chứa $z_i$ qua các tích $z_i^Tz_j$. Thay tích này bằng một hàm hạt nhân (kernel) cho máy vector hỗ trợ phi tuyến; kỹ thuật đó nằm ngoài phạm vi học phần.
3. **Vai trò của $\rho$.** $\rho$ lớn đẩy $\lVert w\rVert_2$ nhỏ, lề rộng, nhiều mẫu nằm trong lề với $\alpha_i=1$. $\rho$ nhỏ làm lề hẹp và giảm số mẫu vi phạm.
:::

::: exercise Bài tập 03.7
Giải $\min x_1^2+2x_2^2$ với $x_1+x_2\ge3$ bằng hệ KKT, xét đủ các nhánh. Kiểm tra kết quả bằng cách tính $g(\lambda)$ và giải bài đối ngẫu.
:::

::: hint
Ràng buộc viết thành $3-x_1-x_2\le0$. Dừng cho $x_1=\frac\lambda2$ và $x_2=\frac\lambda4$.
:::

::: solution
**Hệ KKT.**

Dừng: $2x_1-\lambda=0$, $4x_2-\lambda=0$.

1. Nhánh $\lambda=0$: $x=(0,0)$, có $3-0>0$. Loại.
2. Nhánh $x_1+x_2=3$: $\frac\lambda2+\frac\lambda4=3$, nên $\lambda=4$ và $x=(2,1)$, giá trị $4+2=6$.

Bài lồi, nên Định lý 03.32 cho $x^*=(2,1)$, $\lambda^*=4$, $p^*=6$.

**Đối ngẫu.**

Thay $x(\lambda)=(\frac\lambda2,\frac\lambda4)$ vào $L=x_1^2+2x_2^2+\lambda(3-x_1-x_2)$:

$$
g(\lambda)=\frac{\lambda^2}4+\frac{\lambda^2}8+3\lambda-\frac{\lambda^2}2-\frac{\lambda^2}4=3\lambda-\frac{3\lambda^2}8 .
$$

$g'(\lambda)=3-\frac{3\lambda}4=0$ tại $\lambda=4$, với $g(4)=12-6=6$.

**Kiểm tra lại.**

Điểm khả thi $(1{,}5;\,1{,}5)$ cho $2{,}25+4{,}5=6{,}75>6$.
:::

::: exercise Bài tập 03.8
Xét $\min(x_1-1)^2+(x_2-1)^2$ với $x_1+x_2-4\le0$ và $x_1-\tfrac12\le0$.

- (a) Viết hệ KKT.
- (b) Xét bốn nhánh bù trừ và tìm bộ KKT.
- (c) Ràng buộc nào hoạt động, nhân tử nào dương, và nghiệm thay đổi thế nào nếu nới ràng buộc thứ hai thành $x_1\le\tfrac12+u$ với $u$ nhỏ.
:::

::: hint
Dừng: $2(x_1-1)+\lambda_1+\lambda_2=0$ và $2(x_2-1)+\lambda_1=0$. Nhánh "cả hai nhân tử bằng $0$" cho cực tiểu không ràng buộc $(1,1)$.
:::

::: solution
**(a) Hệ KKT.**

Khả thi gốc: $x_1+x_2\le4$, $x_1\le\tfrac12$. Khả thi đối ngẫu: $\lambda_1,\lambda_2\ge0$. Bù trừ: $\lambda_1(x_1+x_2-4)=0$, $\lambda_2(x_1-\tfrac12)=0$. Dừng như trong gợi ý.

**(b) Bốn nhánh.**

1. $\lambda_1=\lambda_2=0$: $x=(1,1)$, vi phạm $x_1\le\tfrac12$. Loại.
2. $\lambda_1=0$, $x_1=\tfrac12$: dừng cho $x_2=1$ và $2(-\tfrac12)+\lambda_2=0$, $\lambda_2=1$. Khả thi: $\tfrac12+1=1{,}5\le4$. Hợp lệ.
3. $x_1+x_2=4$, $\lambda_2=0$: dừng cho $x_1=x_2=1-\frac{\lambda_1}2$, tổng $2-\lambda_1=4$, $\lambda_1=-2<0$. Loại.
4. Cả hai hoạt động: $x=(\tfrac12,\tfrac72)$; dừng thứ hai cho $\lambda_1=-5<0$. Loại.

Bộ KKT duy nhất là $x=(\tfrac12,1)$, $\lambda=(0,1)$; bài lồi nên đây là nghiệm, $p^*=\tfrac14$.

**(c) Đọc kết quả.**

Ràng buộc $x_1\le\tfrac12$ hoạt động với $\lambda_2=1$; ràng buộc tổng không hoạt động và $\lambda_1=0$. Với $u$ nhỏ, nghiệm là $(\tfrac12+u,1)$ và $p^*(u)=(\tfrac12-u)^2$, đạo hàm tại $0$ bằng $-1=-\lambda_2$.

**Kiểm tra lại.**

Dừng tại $(\tfrac12,1)$ với $\lambda=(0,1)$: $2(-\tfrac12)+0+1=0$ và $0+0=0$.
:::

::: exercise Bài tập 03.9
**Dữ kiện.**

Mệnh đề 03.34: nếu $\ell$, $R$ lồi, có $\bar w$ với $R(\bar w)<r$ và $w^*$ là nghiệm của $\min\ell(w)$ với $R(w)\le r$, thì có $\lambda^*\ge0$ để $w^*$ là nghiệm của $\min_w\ell(w)+\lambda^*R(w)$ và $\lambda^*(R(w^*)-r)=0$.

Hồi quy $\min_{w\in\mathbb R^3}\tfrac12\lVert w-y\rVert_2^2$ với $\lVert w\rVert_2^2\le1$ và $y=(1,2,2)$.

- (a) Giải bằng KKT.
- (b) Theo Mệnh đề 03.34, nghiệm là nghiệm của bài có phạt nào; kiểm tra trực tiếp.
- (c) Tính $\frac{dp^*}{d\tau}$ tại $\tau=1$ từ công thức hàm giá trị và so với nhân tử.
:::

::: hint
Như Ví dụ 03.19, dừng cho $w=\frac y{1+2\lambda}$; $\lVert y\rVert_2=3$.
:::

::: solution
**(a) KKT.**

Dừng cho $w=\frac y{1+2\lambda}$.

1. Nhánh $\lambda=0$: $w=y$ với $\lVert y\rVert_2^2=9>1$. Loại.
2. Nhánh trần hoạt động: $\frac3{1+2\lambda}=1$, nên $\lambda^*=1$ và $w^*=\frac y3=(\tfrac13,\tfrac23,\tfrac23)$.

Mất mát $\tfrac12\lVert(\tfrac23,\tfrac43,\tfrac43)\rVert_2^2=\tfrac12\cdot\tfrac{4+16+16}9=2$.

**(b) Bài có phạt.**

$\tfrac12\lVert w-y\rVert_2^2+\lVert w\rVert_2^2$: dừng $(w-y)+2w=0$ cho $w=\frac y3$, trùng $w^*$.

**(c) Độ nhạy.**

$p^*(\tau)=\tfrac12(3-\sqrt\tau)^2$ với $\tau\le9$, nên $\frac{dp^*}{d\tau}=-\frac{3-\sqrt\tau}{2\sqrt\tau}$, bằng $-1$ tại $\tau=1$, đúng $-\lambda^*$.

**Kiểm tra lại.**

$\lVert w^*\rVert_2^2=\tfrac{1+4+4}9=1$; dừng: $(\tfrac13-1)+2\cdot\tfrac13=0$.
:::

**Chuỗi suy luận của mục.**

1. Định nghĩa 03.26: bù trừ; Mệnh đề 03.27: bù trừ và cực tiểu hóa $L$ tại nghiệm.
2. Định nghĩa 03.29: hệ KKT.
3. Định lý 03.30: tính cần; Hệ quả 03.31: bài lồi có điểm Slater; Định lý 03.32: tính đủ.
4. Mệnh đề 03.34, 03.35 và Thuật toán 03.1: hồi quy có trần.
5. Mệnh đề 03.36: máy vector hỗ trợ.

Đích là cặp Định lý 03.30, 03.32.

**Kết mục.** Mục này thay việc tính $g$ bằng việc giải một hệ hữu hạn điều kiện, và chỉ rõ giả thiết của mỗi chiều. Thiếu hụt còn lại là thứ tự sử dụng: với một bài toán mới, cần biết kiểm tra gì trước, khi nào dùng hàm đối ngẫu, khi nào dùng KKT, và kết luận nào đã được bảo đảm. Mục 6 gom các kết quả thành một quy trình và một bảng kiểm.

## 6. Tổng hợp: quy trình chứng nhận bằng đối ngẫu

Xét bài chiếu điểm $(3,2)$ lên miền $\{x\in\mathbb R^2\mid x_1+x_2\le2,\ x_2\ge0\}$. Bài có hai ràng buộc, một trong hai có thể không hoạt động, và cần một chứng nhận cho nghiệm cùng giá bóng của từng ràng buộc. Các mục trước cho đủ công cụ, nhưng chưa nói dùng công cụ nào trước và kết luận nào được phép ở mỗi bước.

Các công cụ đó là:

- hàm đối ngẫu, Định nghĩa 03.5;
- đối ngẫu yếu, Định lý 03.8;
- định lý Slater, Định lý 03.15;
- hai chiều của KKT, Định lý 03.30 và 03.32;
- độ nhạy, Mệnh đề 03.23.

 Mục này gom chúng thành một thuật toán và một bảng kiểm, rồi chạy thuật toán trên bài chiếu.

::: algorithm Thuật toán 03.2 (Chứng nhận tối ưu bằng đối ngẫu)
**Đầu vào.** Bài toán tối ưu có ràng buộc.

**Đầu ra.** Một phương án $\hat x$, một nhân tử $(\hat\lambda,\hat\nu)$ và khoảng $f_0(\hat x)-g(\hat\lambda,\hat\nu)$; khi khoảng bằng $0$, một chứng nhận tối ưu.

1. Viết bài toán ở dạng (2.1): mọi bất đẳng thức thành $f_i(x)\le0$, đẳng thức thành $Ax=b$, điều kiện còn lại vào miền $D$.
2. Lập hàm Lagrange (2.2) và ghi dấu: $\lambda\succeq0$, $\nu$ tự do.
3. Kiểm tra tính lồi theo Định nghĩa 02.1 và tìm một điểm Slater. Nếu cả hai có và $p^*$ hữu hạn, Định lý 03.15 bảo đảm có nhân tử chứng nhận.
4. Nếu các hàm khả vi: lập hệ KKT (Định nghĩa 03.29) và giải theo các nhánh bù trừ, loại nhánh vi phạm khả thi gốc hoặc dấu nhân tử.
5. Nếu bài lồi và bước 4 cho một bộ KKT: dừng; Định lý 03.32 chứng nhận. Nếu bài không lồi: bộ KKT chỉ là ứng viên; tính $g$ tại nhân tử tìm được và báo khoảng.
6. Nếu không giải được KKT: tính $g$ theo (2.3), giải hoặc giải gần đúng bài đối ngẫu (2.5), lấy một phương án khả thi tốt nhất có được, báo khoảng theo Hệ quả 03.10(b).
7. Đọc nhân tử theo Hệ quả 03.24: nhân tử lớn chỉ ra ràng buộc có giá bóng lớn.

**Chi phí.** Bước 4 có tối đa $2^m$ nhánh bù trừ; với $m$ lớn, bước 4 được thay bằng một bộ giải lặp, và bước 5 dùng khoảng của cặp làm điều kiện dừng.
:::

Bảng sau ghi cho mỗi kết luận các giả thiết cần, kết quả cung cấp nó, và điều không được suy ra.

| Kết luận | Giả thiết cần | Kết quả | Không được suy ra |
|---|---|---|---|
| $g(\lambda,\nu)\le p^*$ | $\lambda\succeq0$ | Định lý 03.8 | $g$ đạt $p^*$ |
| $g$ lõm | không | Mệnh đề 03.6 | $g$ dễ tính |
| $d^*=p^*$, có nghiệm đối ngẫu | lồi, điểm Slater, $p^*$ hữu hạn | Định lý 03.15 | bài gốc có nghiệm |
| Bù trừ tại nghiệm | $f_0(x^*)=g(\lambda^*,\nu^*)$ | Mệnh đề 03.27 | hoạt động kéo theo $\lambda_i>0$ |
| Nghiệm thỏa KKT | khả vi, đối ngẫu mạnh có nghiệm đối ngẫu | Định lý 03.30 | mọi bộ KKT là nghiệm |
| Bộ KKT là nghiệm | lồi, khả vi | Định lý 03.32 | có bộ KKT |
| $p^*(u,v)\ge p^*-\lambda^{*T}u-\nu^{*T}v$ | đối ngẫu mạnh có nghiệm đối ngẫu | Mệnh đề 03.23 | đẳng thức với nhiễu lớn |

::: example Ví dụ 03.20 (Chạy Thuật toán 03.2 trên bài chiếu)
**Bước 1–2.**

$\min(x_1-3)^2+(x_2-2)^2$ với $f_1=x_1+x_2-2\le0$, $f_2=-x_2\le0$. Hàm Lagrange $L=(x_1-3)^2+(x_2-2)^2+\lambda_1(x_1+x_2-2)-\lambda_2x_2$.

**Bước 3.**

Mục tiêu lồi chặt, ràng buộc affine. Điểm $\bar x=(\tfrac12,\tfrac12)$ cho $f_1=-1<0$, $f_2=-\tfrac12<0$. Mục tiêu không âm nên $p^*$ hữu hạn.

**Bước 4.**

Dừng: $2(x_1-3)+\lambda_1=0$ và $2(x_2-2)+\lambda_1-\lambda_2=0$.

1. $\lambda_1=\lambda_2=0$: $x=(3,2)$, $f_1=3>0$. Loại.
2. $f_1=0$, $\lambda_2=0$: $x_1=3-\frac{\lambda_1}2$, $x_2=2-\frac{\lambda_1}2$, tổng $5-\lambda_1=2$, $\lambda_1=3$, $x=(1{,}5;\,0{,}5)$; $x_2\ge0$ đúng. Hợp lệ.
3. $\lambda_1=0$, $x_2=0$: dừng thứ hai cho $\lambda_2=-4<0$. Loại.
4. $f_1=0$, $x_2=0$: $x=(2,0)$; dừng thứ nhất cho $\lambda_1=2$, dừng thứ hai cho $\lambda_2=-4+2=-2<0$. Loại.

**Bước 5.**

Bộ KKT $x^*=(1{,}5;\,0{,}5)$, $\lambda^*=(3,0)$; bài lồi nên đây là nghiệm, $p^*=1{,}5^2+1{,}5^2=4{,}5$.

**Bước 6 (đối chiếu bằng hàm đối ngẫu).**

Cực tiểu theo $x$ của $L$ tại $x_1=3-\frac{\lambda_1}2$, $x_2=2-\frac{\lambda_1-\lambda_2}2$ cho

$$
g(\lambda)=3\lambda_1-2\lambda_2-\frac{\lambda_1^2}4-\frac{(\lambda_1-\lambda_2)^2}4 ,
$$

và $g(3,0)=9-\tfrac94-\tfrac94=4{,}5=p^*$.

**Bước 7.**

Nới ràng buộc thứ nhất thành $x_1+x_2\le2+u$ cho $p^*(u)=\tfrac12(3-u)^2$ với $-1\le u\le3$, đạo hàm tại $0$ bằng $-3=-\lambda_1^*$. Ràng buộc $x_2\ge0$ không hoạt động và có giá bóng $0$.

**Kiểm tra lại.**

$x^*$ là hình chiếu của $(3,2)$ lên đường $x_1+x_2=2$: $(3,2)-\tfrac{3}{2}(1,1)=(1{,}5;\,0{,}5)$. Tại $\lambda=(3,0)$: $\frac{\partial g}{\partial\lambda_2}=-2+\frac{3}{2}=-\tfrac12<0$, nên tăng $\lambda_2$ làm $g$ giảm, khớp $\lambda_2^*=0$.
:::

::: exercise Bài tập 03.10
Chạy Thuật toán 03.2 cho $\min(x_1-2)^2+x_2^2$ với $x_1+x_2\le1$: lập $L$, kiểm tra điều kiện Slater, giải hệ KKT, tính $g$ và kiểm tra khoảng bằng $0$, đọc giá bóng của ràng buộc.
:::

::: hint
Nghiệm là hình chiếu của $(2,0)$ lên đường $x_1+x_2=1$.
:::

::: solution
**Lập mô hình và kiểm giả thiết.**

$L=(x_1-2)^2+x_2^2+\lambda(x_1+x_2-1)$. Bài lồi; $\bar x=(0,0)$ cho $-1<0$.

**Giải KKT.**

Dừng: $2(x_1-2)+\lambda=0$, $2x_2+\lambda=0$, nên $x_1=2-\frac\lambda2$, $x_2=-\frac\lambda2$.

1. Nhánh $\lambda=0$: $x=(2,0)$, vi phạm vì $2>1$. Loại.
2. Nhánh hoạt động: tổng $2-\lambda=1$, nên $\lambda^*=1$, $x^*=(1{,}5;\,-0{,}5)$ và $p^*=0{,}25+0{,}25=0{,}5$.

**Hàm đối ngẫu.**

Thay $x(\lambda)$: $g(\lambda)=\frac{\lambda^2}4+\frac{\lambda^2}4+\lambda\bigl(2-\lambda-1\bigr)=\lambda-\frac{\lambda^2}2$, và $g(1)=0{,}5=p^*$.

**Diễn giải.**

Giá bóng $\lambda^*=1$: nới ràng buộc thêm $u$ nhỏ giảm $p^*$ khoảng $u$; thật vậy $p^*(u)=\tfrac12(1-u)^2$ có đạo hàm $-1$ tại $0$.

**Kiểm tra lại.**

Dừng: $2(-0{,}5)+1=0$ và $2(-0{,}5)+1=0$.
:::

**Chuỗi suy luận của mục.** Thuật toán 03.2 sắp xếp các kết quả của Mục 2–5 theo thứ tự dùng:

1. Định lý 03.8 cho cận ở mọi bài;
2. Định lý 03.15 bảo đảm có nhân tử khi bài lồi có điểm Slater;
3. Định lý 03.30 và 03.32 biến việc tìm nhân tử thành giải hệ KKT;
4. Hệ quả 03.24 đọc nghĩa của nhân tử.

**Kết mục.** Phần còn lại của chương áp dụng quy trình này vào ba bài toán học máy. Bài thứ ba vi phạm giả thiết của bước 3, và hậu quả của vi phạm đó được đo bằng số.

## Tình huống áp dụng và ứng dụng

::: application Tình huống 03.1 (Máy vector hỗ trợ lề mềm: đọc vector hỗ trợ từ nhân tử)
**Dữ kiện.**

Bài toán (5.2) với $d=1$: $\min_{w,b,\xi}\frac\rho2w^2+\sum_i\xi_i$ với $1-y_i(wz_i+b)-\xi_i\le0$, $-\xi_i\le0$; Tình huống 02.2 ký hiệu hệ số $\rho$ là $\lambda$. Mệnh đề 03.36 phần 3: $(w,b,\xi)$ là nghiệm khi và chỉ khi có $\alpha$ với $0\le\alpha_i\le1$, $\sum_i\alpha_iy_i=0$, $\rho w=\sum_i\alpha_iy_iz_i$, $\xi_i=\max(0,1-m_i)$, trong đó $m_i=y_i(wz_i+b)$, và với mọi $i$: $m_i>1\Rightarrow\alpha_i=0$, $m_i<1\Rightarrow\alpha_i=1$, $0<\alpha_i<1\Rightarrow m_i=1$. Giá trị đối ngẫu là $h(\alpha)=\sum_i\alpha_i-\frac1{2\rho}\bigl(\sum_i\alpha_iy_iz_i\bigr)^2$ (5.3).

**Bài toán và dữ liệu.**

Dữ liệu của Tình huống 02.2: bốn khung hình với đặc trưng $z=(-2,-1,1,2)$ và nhãn $y=(-1,-1,+1,+1)$ (số liệu minh họa). Tình huống 02.2 tìm nghiệm $(w,b)=(1,0)$ với $\rho=1$ và $(\tfrac12,0)$ với $\rho=4$ bằng lập luận đối xứng. Câu hỏi mới: mẫu nào quyết định nghiệm, và chứng nhận tối ưu bằng gì.

**Mô hình hóa.**

Quy hoạch bậc hai (5.2) với $d=1$, nhân tử $\alpha_i$ cho ràng buộc lề.

**Xác minh giả thiết.**

Mệnh đề 03.36 áp dụng: bài lồi, có điểm Slater, có nghiệm; KKT cần và đủ.

**Áp dụng với $\rho=1$.**

Giả thiết thử: hai mẫu trong ($z=\pm1$) nằm đúng trên lề với $0<\alpha_i<1$, hai mẫu ngoài có $\alpha_i=0$. Lề bằng $1$ tại $z=1$ và $z=-1$ cho $w+b=1$ và $w-b=1$, nên $w=1$, $b=0$. Dừng theo $w$ và $b$:

$$
\rho w=\alpha_2(-1)(-1)+\alpha_3(1)(1),\qquad-\alpha_2+\alpha_3=0,
$$

cho $\alpha_2=\alpha_3=\tfrac12\in(0,1)$. Hai mẫu ngoài có biên $m=2>1$, đúng với $\alpha=0$. Mọi điều kiện của Mệnh đề 03.36 phần 3 thỏa, nên $(w,b)=(1,0)$ là nghiệm, với $\alpha^*=(0,\tfrac12,\tfrac12,0)$.

**Áp dụng với $\rho=4$.**

Giả thiết thử của $\rho=1$ cho $\alpha_2=\alpha_3=\frac{\rho w}2=2>1$, vi phạm khả thi đối ngẫu, nên bị loại.

Giả thiết thử thứ hai: hai mẫu trong vi phạm lề với $\alpha=1$, hai mẫu ngoài nằm trên lề. Lề bằng $1$ tại $z=\pm2$ cho $2w+b=1$, $2w-b=1$, nên $w=\tfrac12$, $b=0$. Dừng theo $w$:

$$
4\cdot\tfrac12=2\alpha_1+1+1+2\alpha_4 ,
$$

nên $\alpha_1+\alpha_4=0$, tức $\alpha_1=\alpha_4=0$. Hai mẫu trong có $m=\tfrac12<1$, đúng với $\alpha=1$, và $\xi=\tfrac12$. Nghiệm $(w,b)=(\tfrac12,0)$, $\alpha^*=(0,1,1,0)$.

**Kiểm tra lại.**

Giá trị đối ngẫu $\sum\alpha_i-\frac1{2\rho}(\sum\alpha_iy_iz_i)^2$: với $\rho=1$, $1-\tfrac12\cdot1=\tfrac12$; với $\rho=4$, $2-\tfrac18\cdot4=\tfrac32$. Hai số trùng giá trị gốc $\tfrac12$ và $\tfrac32$ của Tình huống 02.2, nên khoảng bằng $0$.

**Diễn giải.**

Trong cả hai trường hợp, vector hỗ trợ là hai khung hình $z=\pm1$, gần biên quyết định nhất; bỏ hai khung $z=\pm2$ thì nghiệm cũ vẫn là nghiệm của bài mới và $w$ không đổi. Với $\rho=4$, hai khung ngoài nằm đúng trên lề nhưng có $\alpha=0$, trường hợp "hoạt động mà nhân tử bằng $0$" của Nhận xét 03.28.

**Giới hạn.**

Cách đoán cấu trúc hoạt động rồi kiểm tra chỉ khả thi với ít mẫu; có $3^N$ cách gán ba loại cho $N$ mẫu. Bộ giải thực tế giải bài đối ngẫu $N$ biến với ràng buộc hộp $0\le\alpha_i\le1$ và một đẳng thức bằng phương pháp lặp.

**Dẫn ngược lý thuyết.**

Mệnh đề 03.36 (bài đối ngẫu, phân loại mẫu) dựa trên Định lý 03.15 cho bước xác minh, Hệ quả 03.31 và Định lý 03.32 cho bước áp dụng, Hệ quả 03.10(c) cho bước kiểm tra lại, Nhận xét 03.28 cho phần diễn giải.
:::

::: application Tình huống 03.2 (Hồi quy có trần trên dữ liệu chung: từ trần tới hệ số phạt)
**Dữ kiện.**

$\varphi(\lambda)=\lVert w(\lambda)\rVert_2^2$, với $w(\lambda)$ là nghiệm của $(X^TX+\lambda I)w=X^Ty$; $\varphi$ giảm chặt (Mệnh đề 03.35). Thuật toán 03.1: nếu nghiệm bình phương nhỏ nhất thỏa trần thì trả về $\lambda=0$; ngược lại đặt $\lambda_{\mathrm{lo}}=0$, $\lambda_{\mathrm{hi}}=1$ và nhân đôi $\lambda_{\mathrm{hi}}$ tới khi $\varphi(\lambda_{\mathrm{hi}})\le\tau$; sau đó lặp $c=\frac{\lambda_{\mathrm{lo}}+\lambda_{\mathrm{hi}}}2$, gán $\lambda_{\mathrm{lo}}=c$ nếu $\varphi(c)>\tau$ và $\lambda_{\mathrm{hi}}=c$ trong trường hợp ngược lại, dừng khi $\lambda_{\mathrm{hi}}-\lambda_{\mathrm{lo}}\le\varepsilon$ và trả về $\lambda_{\mathrm{hi}}$.

**Bài toán và dữ liệu.**

Dữ liệu chung của Bài 02: đặc trưng $s=(-2,-1,0,1,2)$, mà Bài 02 viết là $u$, đầu ra $y=(-2,-1,3,1,2)$, mô hình $\hat y=as+b$, $w=(a,b)$. Theo Ví dụ 02.11, $X^TX=\operatorname{diag}(10,5)$ và $X^Ty=(10,3)$, nên

$$
E(w)=10a^2+5b^2-20a-6b+19 .
$$

Nghiệm bình phương nhỏ nhất $(1;\,0{,}6)$ có $\lVert w\rVert_2^2=1{,}36$. Yêu cầu: trần $\lVert w\rVert_2^2\le\tau$ với $\tau=0{,}29$ và $\tau=0{,}5$; tìm hệ số phạt tương ứng và đo giá của trần.

**Mô hình hóa và xác minh giả thiết.**

$\min E(w)$ với $\lVert w\rVert_2^2-\tau\le0$. Mục tiêu lồi chặt, ràng buộc lồi, $w=0$ là điểm Slater, tập khả thi đóng và bị chặn. Mệnh đề 03.34, 03.35 và Thuật toán 03.1 áp dụng.

**Áp dụng với $\tau=0{,}29$.**

Dừng $(X^TX+\lambda I)w=X^Ty$ cho $w(\lambda)=\bigl(\frac{10}{10+\lambda},\frac3{5+\lambda}\bigr)$. Nhánh $\lambda=0$ loại vì $1{,}36>0{,}29$. Thử $\lambda=10$: $w=(0{,}5;\,0{,}2)$, $\lVert w\rVert_2^2=0{,}25+0{,}04=0{,}29$. Theo Mệnh đề 03.35 nghiệm này duy nhất, nên $\lambda^*=10$ và $E^*=10\cdot0{,}25+5\cdot0{,}04-10-1{,}2+19=10{,}5$.

**Áp dụng với $\tau=0{,}5$.**

Thuật toán 03.1, bước 2: $\lambda_{\mathrm{hi}}$ nhân đôi qua $1,2,4,8$, với $\varphi(\lambda_{\mathrm{hi}})-\tau$ lần lượt $0{,}5764$; $0{,}3781$; $0{,}1213$; $-0{,}1381$. Bước 3, ba trong tám lần lặp:

| Lần | $\lambda_{\mathrm{lo}}$ | $\lambda_{\mathrm{hi}}$ | $c$ | $\varphi(c)-\tau$ |
|---|---|---|---|---|
| 1 | $0$ | $8$ | $4$ | $0{,}12132$ |
| 2 | $4$ | $8$ | $6$ | $-0{,}03499$ |
| 8 | $5{,}4375$ | $5{,}5$ | $5{,}46875$ | $0{,}00004$ |

Các lần 3 đến 7 lần lượt thử $c=5$; $5{,}5$; $5{,}25$; $5{,}375$; $5{,}4375$. Sau tám lần, $\lambda^*\in(5{,}46875;\,5{,}5]$.

Thuật toán trả về $\lambda_{\mathrm{hi}}=5{,}5$: $w\approx(0{,}64516;\,0{,}28571)$, $\lVert w\rVert_2^2\approx0{,}49787$, $E\approx8{,}95298$.

Cận sai số của thuật toán là $5{,}5\cdot(0{,}5-0{,}49787)\approx0{,}0117$. Giải chính xác cho $\lambda^*\approx5{,}4693$, $E^*\approx8{,}94128$, chênh $0{,}0117$.

**Kiểm tra lại.**

Theo (4.2) với $\lambda^*=10$ tại $\tau=0{,}29$: $E^*(0{,}5)\ge10{,}5-10\cdot0{,}21=8{,}4$, đúng với $8{,}941$. Tại $\tau=0{,}29$, dừng: $(10+10)\cdot0{,}5=10$ và $(5+10)\cdot0{,}2=3$, đúng $X^Ty$.

**Diễn giải.**

Trần $0{,}29$ tương đương phạt ridge $E+10\lVert w\rVert_2^2$, đúng nghiệm của Ví dụ 02.17; Mệnh đề 03.34 cho chiều mà Mệnh đề 02.26 còn thiếu. Giá bóng $10$ nghĩa là nới trần từ $0{,}29$ thêm $0{,}01$ giảm tổng bình phương sai số khoảng $0{,}1$. Ở trần $0{,}5$, giá bóng còn khoảng $5{,}47$.

**Giới hạn.**

Tính duy nhất của $\lambda^*$ dựa vào hạng cột đầy đủ của $X$ và $X^Ty\neq0$; cận $8{,}4$ chỉ là cận dưới, độ chính xác giảm khi $\tau$ xa $0{,}29$.

**Dẫn ngược lý thuyết.**

Định lý 03.15, với điểm Slater $w=0$, ở bước xác minh; Định lý 03.32 chứng nhận nghiệm của nhánh hoạt động; Mệnh đề 03.35 cho tính duy nhất; Mệnh đề 03.34 cho quan hệ với phạt; Mệnh đề 03.23 và Hệ quả 03.24 cho bước kiểm tra lại và diễn giải.
:::

::: application Tình huống 03.3 (Chọn dữ liệu để gán nhãn: giả thiết lồi không thỏa)
**Bài toán và dữ liệu.**

Tình huống 02.3: ba tập dữ liệu A, B, C với số mẫu hữu ích $8$, $5$, $5$ nghìn và chi phí gán nhãn $4$, $3$, $3$ triệu đồng, ngân sách $6$ (số liệu giả lập sư phạm). Phương án tối ưu đã biết bằng liệt kê là $\{B,C\}$ với $10$ nghìn mẫu. Câu hỏi: nới lỏng Lagrange cho gì khi bài không lồi.

**Mô hình hóa.**

Viết thành bài cực tiểu trên $D=\{0,1\}^3$: $\min-8x_A-5x_B-5x_C$ với $f_1=4x_A+3x_B+3x_C-6\le0$; $p^*=-10$.

**Xác minh giả thiết.**

$D$ rời rạc, không lồi. Định lý 03.15 và Định lý 03.32 không áp dụng; Định lý 03.8 và Mệnh đề 03.6 vẫn áp dụng.

**Áp dụng.**

Gom theo biến: $L=-6\lambda+(4\lambda-8)x_A+(3\lambda-5)(x_B+x_C)$. Cực tiểu trên $\{0,1\}$ từng biến cho

$$
g(\lambda)=-6\lambda+\min(0,4\lambda-8)+2\min(0,3\lambda-5).
$$

Hàm này tuyến tính từng khúc:

1. $0\le\lambda\le\tfrac53$: $g=4\lambda-18$;
2. $\tfrac53\le\lambda\le2$: $g=-2\lambda-8$;
3. $\lambda\ge2$: $g=-6\lambda$.

Cực đại tại $\lambda^*=\tfrac53$: $d^*=\tfrac{20}3-18=-\tfrac{34}3$. Khoảng đối ngẫu tối ưu là $-10+\tfrac{34}3=\tfrac43>0$.

**Đọc trên mặt phẳng giá trị.**

Tám phương án cho tám điểm $(u,t)=(f_1,f_0)$: $\varnothing\mapsto(-6,0)$, $A\mapsto(-2,-8)$, $B$ và $C\mapsto(-3,-5)$, $BC\mapsto(0,-10)$, $AB$ và $AC\mapsto(1,-13)$, $ABC\mapsto(4,-18)$. Đường đỡ $t=-\tfrac{34}3-\tfrac53u$ đi qua ba điểm $(-2,-8)$, $(1,-13)$, $(4,-18)$ và cắt trục tung tại $-11{,}33$, thấp hơn điểm tối ưu $(0,-10)$. Tập $\mathcal A$ không lồi, và không đường đỡ không thẳng đứng nào đi qua $(0,-10)$, nên Mệnh đề 03.20 cho biết không có chứng nhận.

**Hậu quả của giả thiết bị vi phạm.**

Ba hậu quả quan sát được:

1. Không nhân tử nào chứng nhận được $\{B,C\}$: mọi $g(\lambda)\le-\tfrac{34}3<-10$.
2. Cực tiểu của $L(\cdot,\tfrac53)$ gồm $x_A=1$ và $x_B,x_C$ tùy ý; trong đó chỉ $\{A\}$ khả thi, với $8$ nghìn mẫu, kém tối ưu $20\%$. Phương án tối ưu $\{B,C\}$ cho $L=-10>-\tfrac{34}3$, nên không cực tiểu hóa $L$. Đọc nghiệm từ hàm Lagrange dẫn sai hướng, như nghiệm nới lỏng của Tình huống 02.3.
3. Hàm giá trị $p^*(u)$ là hàm bậc thang theo ngân sách, nên Hệ quả 03.24 không áp dụng; $\lambda^*=\tfrac53$ không phải giá bóng theo nghĩa đạo hàm.

**Kiểm tra lại.**

Cận $-\tfrac{34}3$ trùng giá trị nới lỏng tuyến tính $\tfrac{34}3$ của Tình huống 02.3 sau khi đổi dấu, đúng với Boyd và Vandenberghe (2004, Bài tập 5.13, tr. 276). $g(2)=-12$, $g(1)=-14$, đều nhỏ hơn $g(\tfrac53)\approx-11{,}33$.

**Diễn giải và giới hạn.**

Cận đối ngẫu vẫn có ích: số mẫu tối ưu không vượt $11{,}33$, tức không vượt $11$ vì là số nguyên, nên phương án $\{B,C\}$ cách tối ưu không quá $1$ nghìn mẫu mà không cần liệt kê. Với hàng trăm tập, đây là cận dùng trong phương pháp nhánh – cận (branch and bound); chứng nhận chính xác cần liệt kê hoặc quy hoạch động.

**Dẫn ngược lý thuyết.**

Định lý 03.8 và Mệnh đề 03.6 ở bước áp dụng (không cần lồi); Định nghĩa 03.18 và Mệnh đề 03.20 ở bước đọc hình; Định lý 03.15, Định lý 03.32 và Hệ quả 03.24 là ba kết quả có giả thiết bị vi phạm.
:::

Các khái niệm của chương xuất hiện trong học máy ở những chỗ sau.

- **Chính quy hóa.** Mỗi trần chuẩn của bài lồi có điểm Slater tương đương một hệ số phạt bằng nhân tử của trần (Mệnh đề 03.34, Tình huống 03.2); chọn $\rho$ bằng kiểm định chéo (cross-validation) vì vậy tương đương chọn trần, với hồi quy ridge là trường hợp riêng.
- **Máy vector hỗ trợ.** Bài đối ngẫu, vector hỗ trợ và thủ thuật hạt nhân đều xuất phát từ Mệnh đề 03.36 (Tình huống 03.1).
- **Bộ giải và điều kiện dừng.** Khoảng của cặp $f_0(x^{(k)})-g(\lambda^{(k)},\nu^{(k)})$ là điều kiện dừng có chứng nhận của phương pháp điểm trong (Hệ quả 03.10).
- **Phân phối entropy cực đại và softmax.** Điều kiện KKT của bài entropy cực đại với ràng buộc kỳ vọng cho dạng $p_i\propto e^{-\theta a_i}$ (Bài tập 03.15).
- **Học có ràng buộc.** Ràng buộc công bằng hay ngân sách tính toán được xử lý bằng nhân tử, và nhân tử là giá bóng (Hệ quả 03.24, Bài tập 03.17). Với mạng sâu, Định lý 03.8 vẫn đúng nhưng $g(\lambda)$ không tính được; giá trị Lagrange tại một cực tiểu địa phương chỉ là ước lượng trên của $g(\lambda)$, không phải cận dưới đã chứng nhận.
- **Nới lỏng Lagrange cho bài rời rạc.** Chọn dữ liệu, chọn đặc trưng, gán nhãn có ngân sách: đối ngẫu cho cận nhưng có thể có khoảng dương (Tình huống 03.3).

## Tóm tắt chương

**Định nghĩa.**

- Cận dưới và chứng nhận tối ưu (Định nghĩa 03.1);
- Hàm Lagrange (Định nghĩa 03.4);
- Hàm đối ngẫu (Định nghĩa 03.5);
- Bài toán đối ngẫu (Định nghĩa 03.9);
- Đối ngẫu mạnh và khoảng đối ngẫu (Định nghĩa 03.12);
- Điều kiện Slater (Định nghĩa 03.13);
- Tập giá trị và tập trên (Định nghĩa 03.18);
- Hàm giá trị (Định nghĩa 03.22);
- Ràng buộc hoạt động và bù trừ (Định nghĩa 03.26);
- Hệ KKT (Định nghĩa 03.29).

**Kết quả chính.**

- Mệnh đề 03.2: cận dưới chặn sai số và chứng nhận tối ưu.
- Mệnh đề 03.6: hàm đối ngẫu lõm.
- Định lý 03.8: đối ngẫu yếu.
- Hệ quả 03.10: chứng nhận từ một cặp gốc – đối ngẫu.
- Mệnh đề 03.11: đối ngẫu của quy hoạch tuyến tính.
- Bổ đề 03.14: tách hai tập lồi, dạng yếu.
- Định lý 03.15: định lý Slater.
- Mệnh đề 03.19: hàm đối ngẫu trên mặt phẳng giá trị.
- Mệnh đề 03.20: đối ngẫu mạnh và đường đỡ không thẳng đứng.
- Mệnh đề 03.23: độ nhạy toàn cục.
- Hệ quả 03.24: nhân tử là giá bóng.
- Mệnh đề 03.27: bù trừ.
- Định lý 03.30: KKT là điều kiện cần.
- Hệ quả 03.31: bài lồi có điểm Slater.
- Định lý 03.32: KKT là điều kiện đủ cho bài lồi.
- Mệnh đề 03.34: trần sinh ra hệ số phạt.
- Mệnh đề 03.35: chuẩn nghiệm ridge giảm theo hệ số phạt.
- Mệnh đề 03.36: máy vector hỗ trợ lề mềm.

**Công thức cần nhớ.**

$$
L=f_0+\sum_i\lambda_if_i+\nu^T(Ax-b),\qquad g(\lambda,\nu)=\inf_{x\in D}L,\qquad g(\lambda,\nu)\le p^*\ \ (\lambda\succeq0);
$$

$$
\nabla f_0(x)+\sum_i\lambda_i\nabla f_i(x)+A^T\nu=0,\qquad\lambda_if_i(x)=0;
$$

$$
p^*(u,v)\ge p^*-\lambda^{*T}u-\nu^{*T}v,\qquad\frac{\partial p^*}{\partial u_i}(0,0)=-\lambda_i^* .
$$

Dòng đầu là hàm Lagrange, hàm đối ngẫu và đối ngẫu yếu; dòng hai là điều kiện dừng và bù trừ; dòng ba là độ nhạy.

**Giả thiết hay bị bỏ quên.** Dấu $\lambda\succeq0$ trong đối ngẫu yếu; cận dưới đúng lấy trên toàn $D$, không áp lại ràng buộc. Định lý Slater cần tính lồi, một điểm làm mọi bất đẳng thức chặt cùng lúc, và $p^*$ hữu hạn; nó không cho nghiệm gốc. KKT đủ cần lồi; KKT cần cần đối ngẫu mạnh có nghiệm đối ngẫu. Ràng buộc hoạt động không kéo theo nhân tử dương.

**Chuỗi suy luận của toàn chương.**

1. Định nghĩa 03.1 và Mệnh đề 03.2 đặt bài toán chứng nhận: một cận dưới bằng giá trị của một điểm khả thi chứng nhận tối ưu.
2. Định nghĩa 03.4, 03.5, Mệnh đề 03.6 và Định lý 03.8 sinh cận dưới cho mọi bài; Định nghĩa 03.9 và Hệ quả 03.10 chọn cận tốt nhất; Mệnh đề 03.11 chứa chứng nhận của Bài 02.
3. Định lý 03.15, dựa trên Bổ đề 03.14, bảo đảm cận khít và nhân tử đạt cho bài lồi có điểm Slater.
4. Mệnh đề 03.19, 03.20, 03.23 và Hệ quả 03.24 cho nghĩa hình học và nghĩa độ nhạy của nhân tử.
5. Mệnh đề 03.27, Định lý 03.30, Hệ quả 03.31 và Định lý 03.32 thay hàm đối ngẫu bằng hệ KKT.
6. Mệnh đề 03.34, 03.35, Thuật toán 03.1 và Mệnh đề 03.36 áp dụng hệ KKT cho chính quy hóa và máy vector hỗ trợ; Thuật toán 03.2 gom quy trình.

**Giới hạn còn lại và bài sau.** Hệ KKT của chương được giải bằng tay theo nhánh, khả thi khi ít ràng buộc và khi hệ dừng tuyến tính.

Bài 04 (tối ưu không ràng buộc và ràng buộc đẳng thức) xây phương pháp Newton cho bài có đẳng thức khi không có công thức đóng, áp dụng cho loại hệ tuyến tính như Ví dụ 03.18(b). Bài 05 (phương pháp bậc nhất cho học máy) xử lý các bài không ràng buộc hoặc có phạt với số tham số rất lớn, nơi giải trực tiếp hệ điều kiện tối ưu không khả thi.

## Bài tập củng cố

Bảng sau ánh xạ bài tập trong mục và bài tập củng cố tới sáu mục tiêu học tập. Các bài không trùng đề với bộ bài giao chính thức trong tệp bài tập của Bài 03.

| Mục tiêu | Bài tập trong mục | Bài tập củng cố |
|---|---|---|
| 1. Hàm Lagrange, hàm đối ngẫu, cận dưới | 03.1, 03.2 | 03.12, 03.14 |
| 2. Đối ngẫu yếu, bài đối ngẫu, khoảng | 03.2, 03.3 | 03.11, 03.13 |
| 3. Điều kiện Slater và giới hạn | 03.4, 03.5 | 03.11, 03.13 |
| 4. Mặt phẳng giá trị, độ nhạy | 03.6 | 03.11, 03.17 |
| 5. Hệ KKT, cần và đủ | 03.7, 03.8, 03.10 | 03.15, 03.16 |
| 6. Vận dụng vào học máy | 03.9 | 03.15, 03.16, 03.17 |

### Mức nhận biết

::: exercise Bài tập 03.11 (Nhận biết: đúng hay sai)
Xác định đúng hay sai, giải thích hoặc cho phản ví dụ.

- (i) Hàm đối ngẫu có thể nhận giá trị $+\infty$.
- (ii) Bài đối ngẫu của một bài không lồi là bài tối ưu lồi.
- (iii) Điều kiện Slater bảo đảm bài gốc có nghiệm.
- (iv) Nếu $d^*=p^*$ thì mọi nghiệm gốc thỏa KKT với một nhân tử nào đó.
- (v) Nhân tử của một ràng buộc đẳng thức phải không âm.
- (vi) Nếu $(x^*,\lambda^*)$ là cặp tối ưu với khoảng $0$ và $\lambda_i^*>0$ thì ràng buộc $i$ hoạt động tại $x^*$.
- (vii) Một bài có một ràng buộc bất đẳng thức có tập giá trị $G$ nằm phía trên đường $t=3-u$, tức $t+u\ge3$ trên $G$, và chạm đường đó. Khi đó $g(1)=3$, và mọi phương án khả thi có giá trị mục tiêu ít nhất $3$.
- (viii) Nếu $x$ khả thi, $\lambda$ khả thi đối ngẫu và $f_0(x)-g(\lambda)=0{,}5$ thì khoảng đối ngẫu tối ưu bằng $0{,}5$.
:::

::: hint
Dùng các ví dụ của Mục 3 và 5: Ví dụ 03.10, 03.11, 03.18(b), Mệnh đề 03.27; với (vii) và (viii), Mệnh đề 03.19 và Định nghĩa 03.12.
:::

::: solution
**(i) Sai.**

Với $x_0\in D$, $g(\lambda,\nu)\le L(x_0,\lambda,\nu)<\infty$.

**(ii) Đúng.**

Theo Mệnh đề 03.6, đó là cực đại hàm lõm trên tập lồi.

**(iii) Sai.**

Ví dụ 03.11: $\min e^x$ với $x\le0$ có điểm Slater nhưng không có nghiệm.

**(iv) Sai.**

Ví dụ 03.10, bài thứ nhất: $d^*=p^*=0$, nghiệm $x^*=0$ không thỏa điều kiện dừng; thiếu nghiệm đối ngẫu.

**(v) Sai.**

Ví dụ 03.18(b) có $\nu=-2$.

**(vi) Đúng.**

Mệnh đề 03.27 phần 1: $\lambda_i^*f_i(x^*)=0$ với $\lambda_i^*>0$ cho $f_i(x^*)=0$.

**(vii) Đúng.**

Đường có hệ số góc $-1$, nên $\lambda=1$. Theo Mệnh đề 03.19, tung độ cắt của đường đỡ chạm tập giá trị là $g(1)=3$, và Định lý 03.8 cho $3\le p^*$.

**(viii) Sai.**

Theo Hệ quả 03.10(b), khoảng của cặp chỉ là cận trên của khoảng tối ưu: $p^*-d^*\le0{,}5$. Ở bài (1.1), $\min x^2+1$ với $(x-2)(x-4)\le0$, điểm $x=2$ khả thi với $f_0(2)=5$ và $g(1)=4{,}5$ (Ví dụ 03.3), nên cặp $(2,1)$ có khoảng $0{,}5$, trong khi $p^*=d^*=5$ và khoảng tối ưu bằng $0$.
:::

::: exercise Bài tập 03.12 (Nhận biết: tìm lỗi trong một lời giải)
Một lời giải cho $\min x^2$ với $x\ge2$ viết: "$L=x^2+\lambda(x-2)$, $\lambda\ge0$. Cực tiểu theo $x$ trên tập $x\ge2$ đạt tại $x=2$, nên $g(\lambda)=4$ với mọi $\lambda$, và $d^*=4=p^*$." Chỉ ra hai lỗi, sửa lại và tính đúng $g$, $d^*$.
:::

::: hint
Viết lại ràng buộc về dạng $f_1\le0$; kiểm tra miền lấy cận dưới đúng.
:::

::: solution
**Lỗi thứ nhất.**

Ràng buộc $x\ge2$ phải viết $2-x\le0$; với $x-2$, dấu sai và cận không còn hợp lệ.

**Lỗi thứ hai.**

Cận dưới đúng phải lấy trên toàn $\mathbb R$, không áp lại $x\ge2$ (Nhận xét 03.7).

**Sửa lại.**

$L=x^2+\lambda(2-x)$ cực tiểu tại $x=\frac\lambda2$, nên $g(\lambda)=2\lambda-\frac{\lambda^2}4$. Cực đại tại $\lambda=4$, $d^*=8-4=4=p^*$.

**Kiểm tra lại.**

Với $\lambda=4$, $L=(x-2)^2+4\ge4$, bằng $4$ tại $x=2$ khả thi.
:::

### Mức tính toán hoặc chứng minh

::: exercise Bài tập 03.13 (Chứng minh: cách viết ràng buộc thay đổi bài đối ngẫu)
Xét $\min x^2$ với ràng buộc $x\ge1$, viết theo hai cách:

- (a) $1-x\le0$;
- (b) $(1-x)^3\le0$.

Chứng minh hai cách có cùng tập khả thi, tính $d^*$ cho từng cách, và giải thích sự khác biệt bằng các giả thiết của Định lý 03.15.
:::

::: hint
Với (b), xét $L$ khi $x\to+\infty$ và $\lambda>0$.
:::

::: solution
**Tập khả thi.**

$t\mapsto t^3$ tăng chặt, nên $(1-x)^3\le0$ khi và chỉ khi $1-x\le0$.

**Cách (a).**

$L=x^2+\lambda(1-x)$ cho $g(\lambda)=\lambda-\frac{\lambda^2}4$, $d^*=g(2)=1=p^*$.

**Cách (b).**

Với $\lambda>0$, $L=x^2+\lambda(1-x)^3\to-\infty$ khi $x\to+\infty$ vì số hạng bậc ba chiếm ưu thế, nên $g(\lambda)=-\infty$; $g(0)=\inf x^2=0$. Vậy $d^*=0<1$.

**Giải thích.**

Cách (b) có điểm $\bar x=2$ với $(1-2)^3=-1<0$, nhưng $(1-x)^3$ có đạo hàm bậc hai $6(1-x)<0$ khi $x>1$, không lồi; giả thiết lồi của Định lý 03.15 vi phạm. Đối ngẫu là thuộc tính của cách viết, không của tập khả thi.
:::

::: exercise Bài tập 03.14 (Tính toán: bài nghiệm chuẩn nhỏ nhất)
Cho $A\in\mathbb R^{p\times n}$ có các hàng độc lập tuyến tính và $b\in\mathbb R^p$.

- (a) Chứng minh hàm đối ngẫu của $\min\lVert x\rVert_2^2$ với $Ax=b$ là $g(\nu)=-\tfrac14\nu^TAA^T\nu-b^T\nu$.
- (b) Áp dụng cho $A=(1\ 1\ 1)$, $b=3$: giải bài đối ngẫu, khôi phục $x^*$ và kiểm tra khoảng bằng $0$.
:::

::: hint
Dừng theo $x$: $2x+A^T\nu=0$. Ví dụ này có trong Boyd và Vandenberghe (2004, mục 5.1.5, tr. 218).
:::

::: solution
**(a)**

$L=x^Tx+\nu^T(Ax-b)$ lồi chặt theo $x$, cực tiểu tại $x=-\tfrac12A^T\nu$. Thay vào: $\tfrac14\nu^TAA^T\nu-\tfrac12\nu^TAA^T\nu-b^T\nu=-\tfrac14\nu^TAA^T\nu-b^T\nu$.

**(b)**

$AA^T=3$, nên $g(\nu)=-\tfrac34\nu^2-3\nu$. $g'(\nu)=-\tfrac32\nu-3=0$ tại $\nu^*=-2$, $d^*=-3+6=3$. Khôi phục $x=-\tfrac12A^T\nu^*=(1,1,1)$, thỏa $Ax=3$, với $\lVert x\rVert_2^2=3=d^*$.

**Kiểm tra lại.**

Theo Cauchy–Schwarz, $3=\mathbf 1^Tx\le\sqrt3\lVert x\rVert_2$, nên $\lVert x\rVert_2^2\ge3$ trên tập khả thi.
:::

### Mức vận dụng vào AI

::: exercise Bài tập 03.15 (Vận dụng: entropy cực đại và softmax)
Tìm phân phối $p\in\mathbb R^k$, $p_i>0$, cực tiểu $\sum_ip_i\log p_i$ (tức cực đại entropy) với $\sum_ip_i=1$ và $\sum_ip_ia_i=m$ cho trước.

- (a) Chứng minh bài lồi và mọi bộ KKT là nghiệm.
- (b) Từ điều kiện dừng, chứng minh $p_i=\frac{e^{-\theta a_i}}{\sum_je^{-\theta a_j}}$ với một số $\theta$.
- (c) Với $k=3$, $a=(0,1,2)$, $m=\tfrac47$, tìm $p$, $\theta$ và nhân tử của ràng buộc tổng.
:::

::: hint
Miền $D=\{p\mid p\succ0\}$ mở, lồi; $(t\log t)''=\frac1t>0$. Hai ràng buộc là đẳng thức, nhân tử $\nu$ và $\theta$.
:::

::: solution
**(a) Kiểm giả thiết.**

Mục tiêu là tổng các hàm lồi chặt một biến; hai ràng buộc affine. Theo phần Phạm vi của Định lý 03.32 với $D$ mở lồi, một bộ KKT là nghiệm.

**(b) Dừng.**

$\log p_i+1+\nu+\theta a_i=0$, nên $p_i=e^{-1-\nu}e^{-\theta a_i}$. Ràng buộc tổng cho $e^{-1-\nu}=\bigl(\sum_je^{-\theta a_j}\bigr)^{-1}$, ra dạng softmax.

**(c) Tính.**

Đặt $r=e^{-\theta}>0$. Theo (b), $p=\frac{(1,r,r^2)}{1+r+r^2}$, và ràng buộc kỳ vọng là

$$
\frac{r+2r^2}{1+r+r^2}=\frac47 .
$$

Nhân chéo: $7r+14r^2=4+4r+4r^2$, tức $10r^2+3r-4=0$, có nghiệm dương duy nhất $r=\frac{-3+13}{20}=\tfrac12$. Vậy $p=(\tfrac47,\tfrac27,\tfrac17)$ và $\theta=\log2\approx0{,}6931$. Từ $p_1=e^{-1-\nu}=\tfrac47$: $\nu=-1+\log\tfrac74\approx-0{,}4404$.

**Diễn giải.**

Lớp softmax là phân phối entropy cực đại thỏa ràng buộc kỳ vọng; logit $-\theta a_i$ chính là nhân tử nhân với đặc trưng.

**Kiểm tra lại.**

$\tfrac47+\tfrac27+\tfrac17=1$ và $0\cdot\tfrac47+1\cdot\tfrac27+2\cdot\tfrac17=\tfrac47$. Tỷ số giữa hai xác suất liên tiếp bằng $\tfrac12=e^{-\theta}$.
:::

::: exercise Bài tập 03.16 (Vận dụng: máy vector hỗ trợ trên ba mẫu)
**Dữ kiện.**

Bài toán (5.2) với $d=1$: $\min_{w,b,\xi}\frac\rho2w^2+\sum_i\xi_i$ với $1-y_i(wz_i+b)-\xi_i\le0$, $-\xi_i\le0$. Mệnh đề 03.36 phần 3: $(w,b,\xi)$ là nghiệm khi và chỉ khi có $\alpha$ với $0\le\alpha_i\le1$, $\sum_i\alpha_iy_i=0$, $\rho w=\sum_i\alpha_iy_iz_i$, $\xi_i=\max(0,1-m_i)$, trong đó $m_i=y_i(wz_i+b)$, và với mọi $i$: $m_i>1\Rightarrow\alpha_i=0$, $m_i<1\Rightarrow\alpha_i=1$, $0<\alpha_i<1\Rightarrow m_i=1$.

Ba mẫu một chiều $z=(0,2,3)$ với nhãn $y=(-1,+1,+1)$.

- (a) Với $\rho=1$, chứng minh $(w,b)=(1,-1)$ là nghiệm của (5.2) bằng cách tìm $\alpha$ thỏa Mệnh đề 03.36 phần 3.
- (b) Xác định vector hỗ trợ.
- (c) Tìm mọi $\rho>0$ để $(1,-1)$ vẫn là nghiệm.
:::

::: hint
Biên tại ba mẫu là $1$, $1$, $2$. Dừng theo $w$: $\rho w=\sum_i\alpha_iy_iz_i$.
:::

::: solution
**(a) Tìm nhân tử.**

Biên $m=(-(0-1),\,2-1,\,3-1)=(1,1,2)$. Mẫu thứ ba có $m>1$, nên $\alpha_3=0$.

Dừng theo $w$: $1=2\alpha_2$, $\alpha_2=\tfrac12$. Dừng theo $b$: $-\alpha_1+\alpha_2=0$, $\alpha_1=\tfrac12$. Hai mẫu đầu có $0<\alpha<1$ và $m=1$, đúng. Mọi điều kiện thỏa, nên $(1,-1)$ là nghiệm.

**(b)**

Vector hỗ trợ là $z=0$ và $z=2$.

**(c)**

Chiều đủ: với $(w,b)=(1,-1)$, các biên vẫn là $(1,1,2)$ với mọi $\rho$, nên $\alpha_3=0$; dừng cho $\alpha_1=\alpha_2=\frac\rho2$, hợp lệ khi $\frac\rho2\le1$. Vậy $(1,-1)$ là nghiệm khi $0<\rho\le2$.

Chiều cần: nếu $\rho>2$ mà $(1,-1)$ là nghiệm, chiều thuận của Mệnh đề 03.36 phần 3 cho một $\alpha$ với $\alpha_3=0$, vì $m_3=2>1$. Dừng theo $w$ cho $\rho=2\alpha_2$, tức $\alpha_2=\frac\rho2>1$, trái với $\alpha_2\le1$. Vậy tập các $\rho$ cần tìm là $(0,2]$.

**Kiểm tra lại.**

Với $\rho=1$, giá trị gốc $\tfrac12$ và giá trị đối ngẫu $1-\tfrac12\cdot1^2=\tfrac12$.
:::

::: exercise Bài tập 03.17 (Vận dụng: giá bóng của ngân sách tính toán)
Ba mô-đun của một hệ thống nhận được $x_i>0$ giờ trên đơn vị xử lý đồ họa (graphics processing unit, GPU); sai số của mô-đun $i$ được mô hình hóa là $c_i/x_i$ với $c=(1,4,9)$, tổng ngân sách $\sum_ix_i\le12$ (số liệu giả lập sư phạm).

- (a) Giải bằng KKT.
- (b) Tính giá bóng của ngân sách.
- (c) So sánh xấp xỉ bậc nhất và giá trị đúng khi ngân sách tăng lên $13$.
:::

::: hint
Dừng: $-\frac{c_i}{x_i^2}+\lambda=0$, nên $x_i=\sqrt{c_i/\lambda}$.
:::

::: solution
**(a) KKT.**

1. Nhánh $\lambda=0$: dừng đòi $-\frac{c_i}{x_i^2}=0$, vô nghiệm. Loại.
2. Nhánh ngân sách hoạt động: $\sum_i\sqrt{c_i}/\sqrt\lambda=12$ với $\sum_i\sqrt{c_i}=6$, nên $\sqrt\lambda=\tfrac12$, $\lambda^*=\tfrac14$ và $x=(2,4,6)$.

Sai số tổng là $\tfrac12+1+\tfrac32=3$. Bài lồi trên miền mở lồi, nên theo phần Phạm vi của Định lý 03.32, đây là nghiệm.

**(b)**

Với ngân sách $B$, $p^*(B)=\frac{36}B$, đạo hàm $-\frac{36}{B^2}=-\tfrac14$ tại $B=12$, đúng $-\lambda^*$: thêm một giờ GPU giảm tổng sai số khoảng $0{,}25$.

**(c)**

Xấp xỉ: $3-0{,}25=2{,}75$; đúng: $\frac{36}{13}\approx2{,}7692$, không nhỏ hơn $2{,}75$ như (4.2) bảo đảm.

**Kiểm tra lại.**

Dừng tại $x_1=2$: $-\tfrac14+\tfrac14=0$; tại $x_3=6$: $-\tfrac9{36}+\tfrac14=0$.
:::

## Hướng dẫn đọc thêm và tài liệu tham khảo

- Boyd, S. và Vandenberghe, L. (2004), *Convex Optimization*, Cambridge University Press. Mục 5.1 (tr. 215–222) cho Mục 2; mục 5.2 (tr. 223–231) cho Mục 2.5 và Mục 3; mục 5.3 (tr. 232–236) cho Mục 4.1–4.2 và chứng minh Định lý 03.15; mục 5.4.4 (tr. 240–241) và 5.6 (tr. 249–252) cho Mục 4.3; mục 5.5 (tr. 241–248) cho Mục 5; mục 2.5.1 (tr. 46–49) và Bài tập 2.22 (tr. 63) cho Bổ đề 03.14; mục 8.6.1 (tr. 423–426) cho Mục 5.4; Bài tập 5.1 (tr. 273), 5.13 (tr. 276) và 5.21 (tr. 280) cho Ví dụ 03.1, 03.7, 03.8 và Tình huống 03.3.
- Boyd, S. (2009), MIT 6.079 *Introduction to Convex Optimization*, Lecture 5: Duality, MIT OpenCourseWare, giấy phép CC BY-NC-SA 4.0. Trang 2–11 cho Mục 2–3, trang 15–16 cho Mục 4, trang 17–19 cho Mục 5, trang 21–23 cho Mục 4.3.
- Rudin, W. (1976), *Principles of Mathematical Analysis*, ấn bản 3, McGraw-Hill. Định lý 2.41 (tr. 40) và 4.14 (tr. 89) dùng trong chứng minh Bổ đề 03.14.
- Nocedal, J. và Wright, S. J. (2006), *Numerical Optimization*, ấn bản 2, Springer. Mục 12.3 cho điều kiện KKT cần dưới các điều kiện chính quy khác điều kiện Slater (Nhận xét 03.33).
- Platt, J. (1998), "Sequential Minimal Optimization: A Fast Algorithm for Training Support Vector Machines", Microsoft Research, Báo cáo kỹ thuật MSR-TR-98-14. Thuật toán giải bài đối ngẫu của máy vector hỗ trợ nhắc trong Mục 3.
