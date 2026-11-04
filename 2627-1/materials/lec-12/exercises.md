# Bài tập Bài 12 — Học máy, rủi ro thống kê và khả năng tổng quát hóa

Các bài tập dưới đây đi kèm ghi chú Bài 12 và dẫn định nghĩa, mệnh đề, định lý, ví dụ theo số hiệu của ghi chú. Ký hiệu theo §2 của ghi chú: $h_t(x)=\mathbf 1_{\{x\ge t\}}$ là bộ phân loại ngưỡng, $\mathcal H_\uparrow=\{h_t:\ t\in\mathbb R\}$, $\mathcal H_{\mathrm{aff}}=\{x\mapsto\mathbf 1_{\{wx+b\ge0\}}:\ w,b\in\mathbb R\}$, $R$ và $\hat R_S$ là rủi ro kỳ vọng và rủi ro thực nghiệm, $\log$ là logarit tự nhiên. Ba bài trên lớp và các bài tự học được điều chỉnh từ bộ bài tập tuần 3 của học phần.

## Bài tập trên lớp

### Bài tập 12.1 (Suy ra và giải mục tiêu hồi quy từ ba số đo)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2; suy ra mất mát từ hợp lý và kiểm tra phương trình chuẩn.

::: exercise Bài tập 12.1
Cho ba cặp
- $(x_1,y_1)=(0,0)$
- $(x_2,y_2)=(1,1)$
- $(x_3,y_3)=(2,1)$

và giả sử các đầu ra độc lập có điều kiện, $Y_i\mid x_i\sim\mathcal N(w_0+w_1x_i,1)$. Viết âm log-hợp lý, lập phương trình chuẩn, tìm hệ số tối ưu và kiểm tra phần dư vuông góc với các cột của ma trận thiết kế.
:::

::: hint Gợi ý 1
Dùng Mệnh đề 12.2 với $\sigma^2=1$. Ma trận thiết kế có các hàng $(1,0)$, $(1,1)$, $(1,2)$.
:::

::: hint Gợi ý 2
Trừ hai phương trình của hệ (4.4) để khử $w_0$.
:::

::: solution Lời giải Bài tập 12.1
**Âm log-hợp lý.** Theo Mệnh đề 12.2 với $n=3$, $\sigma^2=1$,
$$
\begin{aligned}
&-\log L(w)\\
&\quad=\frac32\log(2\pi)\\
&\qquad+\frac12\sum_{i=1}^3(y_i-w_0-w_1x_i)^2 .
\end{aligned}
$$
Số hạng $\frac32\log(2\pi)$ không phụ thuộc $w$ và hệ số $\frac12$ dương, nên nghiệm hợp lý cực đại là nghiệm bình phương tối thiểu.

**Phương trình chuẩn.**
$$
\begin{gathered}
A=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix},\\
A^\top A=\begin{pmatrix}3&3\\3&5\end{pmatrix},\quad
A^\top y=\begin{pmatrix}2\\3\end{pmatrix}.
\end{gathered}
$$
Định thức $3\cdot5-3\cdot3=6>0$, nên nghiệm duy nhất (Mệnh đề 12.3). Hệ (4.4) là
$$
\begin{aligned}
3w_0+3w_1&=2,\\
3w_0+5w_1&=3.
\end{aligned}
$$
Trừ phương trình thứ nhất khỏi phương trình thứ hai: $2w_1=1$, nên $\hat w_1=\frac12$. Thế vào phương trình thứ nhất: $3w_0=2-\frac32=\frac12$, nên $\hat w_0=\frac16$.

**Phần dư.** Giá trị khớp là $(\frac16,\frac23,\frac76)$, phần dư là $r=(-\frac16,\frac13,-\frac16)$.

**Kiểm tra lại.** Cột thứ nhất: $\sum_ir_i=-\frac16+\frac13-\frac16=0$. Cột thứ hai: $\sum_ix_ir_i=0+\frac13-\frac26=0$. Vậy $A^\top r=0$, đúng với (4.4).
:::

### Bài tập 12.2 (Tập nghiệm ERM và hai loại rủi ro của lớp ngưỡng)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; dùng Mệnh đề 12.11 trên một mẫu mới.

::: exercise Bài tập 12.2
Cho $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, lớp $\mathcal H_\uparrow$ và mất mát $0$–$1$. Tập huấn luyện gồm
- $(x_1,y_1)=(-0{,}7;\,0)$
- $(x_2,y_2)=(-0{,}3;\,0)$
- $(x_3,y_3)=(0{,}2;\,1)$
- $(x_4,y_4)=(0{,}9;\,1)$

Tìm mọi nghiệm ERM. So sánh hai loại rủi ro của các ngưỡng $t=0{,}1$ và $t=-0{,}2$.
:::

::: hint Gợi ý 1
Xác định điểm âm lớn nhất $a$ và điểm không âm nhỏ nhất $b$ của mẫu.
:::

::: hint Gợi ý 2
Rủi ro kỳ vọng của $h_t$ là xác suất của đoạn giữa $t$ và $0$, theo (6.6).
:::

::: solution Lời giải Bài tập 12.2
**Tập nghiệm ERM.** Các điểm âm đúng nhãn khi $t>-0{,}3$, các điểm không âm đúng nhãn khi $t\le0{,}2$. Theo Mệnh đề 12.11 với $a=-0{,}3$ và $b=0{,}2$, tập nghiệm ERM gồm các $h_t$ với $-0{,}3<t\le0{,}2$.

**Hai ngưỡng.** Cả $t=0{,}1$ và $t=-0{,}2$ thuộc khoảng trên, nên $\hat R_S(h_{0{,}1})=\hat R_S(h_{-0{,}2})=0$. Theo (6.6),
$$
\begin{aligned}
R(h_{0{,}1})&=\frac{0{,}1}2=0{,}05,\\
R(h_{-0{,}2})&=\frac{0{,}2}2=0{,}1 .
\end{aligned}
$$

**Kiểm tra lại.** Với $t=0{,}1$: $-0{,}7$ và $-0{,}3$ nhỏ hơn $0{,}1$ nên dự đoán $0$; $0{,}2$ và $0{,}9$ lớn hơn $0{,}1$ nên dự đoán $1$; cả bốn đúng. Với $t=-0{,}2$: $-0{,}3<-0{,}2$ dự đoán $0$, còn $0{,}2\ge-0{,}2$ dự đoán $1$; cả bốn đúng.

Hai nghiệm cùng tối ưu trên mẫu nhưng rủi ro kỳ vọng khác nhau gấp đôi.
:::

### Bài tập 12.3 (Các cách gán nhãn của hai lớp ngưỡng trên hai điểm)

**Mức độ:** khái niệm. **Mục tiêu:** mục tiêu học tập 5; phân biệt cận dưới và cận trên của số chiều VC.

::: exercise Bài tập 12.3
Trên hai điểm $x_1=0$, $x_2=2$, xét $\mathcal H_\uparrow$ và $\mathcal H_{\mathrm{aff}}$. Liệt kê các vector nhãn của lớp thứ nhất và cho tham số của lớp thứ hai biểu diễn cả bốn vector nhãn. Giải thích vì sao cần xét thêm mọi tập ba điểm để chứng minh số chiều VC của lớp thứ hai bằng $2$.
:::

::: hint Gợi ý 1
Dùng trung điểm $1$ khi chọn các hệ số có độ dốc khác $0$.
:::

::: hint Gợi ý 2
Định nghĩa 12.18: số chiều VC bằng $d$ khi có một tập $d$ điểm bị phá vỡ và không tập $d+1$ điểm nào bị phá vỡ.
:::

::: solution Lời giải Bài tập 12.3
**Lớp ngưỡng.** $t=3$ cho $00$, $t=1$ cho $01$, $t=-1$ cho $11$. Nếu $h_t(0)=1$ thì $0\ge t$, nên $2\ge t$ và $h_t(2)=1$; do đó không ngưỡng nào cho $10$.

**Lớp affine.** Các cặp $(w,b)$ sau cho bốn vector nhãn:
- $(0,-1)$: $wx+b=-1<0$ tại cả hai điểm, cho $00$;
- $(1,-1)$: $-1<0$ tại $x=0$ và $1\ge0$ tại $x=2$, cho $01$;
- $(-1,1)$: $1\ge0$ tại $x=0$ và $-1<0$ tại $x=2$, cho $10$;
- $(0,1)$: $1\ge0$ tại cả hai điểm, cho $11$.

**Vì sao cần xét ba điểm.** Phá vỡ một tập hai điểm chỉ cho $d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})\ge2$. Để có cận trên, cần chứng minh với mọi $x_1<x_2<x_3$, có một vector nhãn không biểu diễn được. Vector $101$ là vector đó: hàm $\mathbf 1_{\{wx+b\ge0\}}$ không giảm khi $w>0$, không tăng khi $w<0$ và hằng khi $w=0$ (Định lý 12.19, Bước 4).

**Kiểm tra lại.** Không tham số nào ở trên đặt một điểm đúng trên biên: $wx+b\ne0$ tại $x\in\{0,2\}$, và $t\notin\{0,2\}$. Một lỗi thường gặp là kiểm một tập ba điểm cụ thể rồi kết luận cho mọi tập ba điểm.
:::

## Bài tập tự học

### Bài tập 12.4 (Hợp lý Gaussian, phương trình chuẩn và tồn tại nghiệm hợp lý cực đại)

**Mức độ:** tính toán, kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 1, 2; phân biệt tối ưu theo hệ số với tối ưu chung cả phương sai.

::: exercise Bài tập 12.4
Cho ba cặp
- $(x_1,y_1)=(0,1)$
- $(x_2,y_2)=(1,2)$
- $(x_3,y_3)=(2,4)$

Giả sử các đầu ra độc lập có điều kiện, $Y_i\mid x_i\sim\mathcal N(w_0+w_1x_i,\sigma^2)$, với $\sigma^2>0$ đã biết.

1. Viết mật độ có điều kiện và suy ra âm log-hợp lý. Chỉ ra số hạng nào không ảnh hưởng nghiệm theo hệ số.
2. Lập ma trận thiết kế, kiểm tra hạng và giải phương trình chuẩn để tìm $\hat w_0,\hat w_1$. Tính các phần dư và tổng bình phương phần dư.
3. Nếu phương sai cũng được ước lượng, suy ra công thức hợp lý cực đại của phương sai và kiểm tra điều kiện tồn tại trên mẫu này.
4. Thay các đầu ra bằng $(1,3,5)$. Phân biệt sự tồn tại nghiệm theo hệ số khi phương sai đã biết với sự tồn tại nghiệm hợp lý cực đại chung khi phương sai chưa biết.
5. Nếu nhiễu không có trung bình có điều kiện bằng $0$, giả thiết nào trong cách đọc đường hồi quy như trung bình có điều kiện bị vi phạm? Giải thích vì sao giải đúng phương trình chuẩn chưa xác nhận mô hình nhiễu.
:::

::: hint Gợi ý 1
Dùng Mệnh đề 12.2, Mệnh đề 12.3 và Nhận xét 12.4.
:::

::: hint Gợi ý 2
Khi học phương sai, giữ số hạng $\frac n2\log\sigma^2$ trong âm log-hợp lý và xét nó như hàm của $v=\sigma^2$.
:::

::: solution Lời giải Bài tập 12.4
**1. Âm log-hợp lý.** Mật độ có điều kiện là $p(y_i\mid x_i)=(2\pi\sigma^2)^{-1/2}\exp[-(y_i-w_0-w_1x_i)^2/(2\sigma^2)]$. Theo (4.3) với $n=3$,
$$
\begin{aligned}
&-\log L(w)\\
&\quad=\frac32\log(2\pi\sigma^2)\\
&\qquad+\frac1{2\sigma^2}\sum_{i=1}^3(y_i-w_0-w_1x_i)^2 .
\end{aligned}
$$
Số hạng $\frac32\log(2\pi\sigma^2)$ không phụ thuộc $w$, và hệ số $\frac1{2\sigma^2}>0$ không đổi tập nghiệm.

**2. Phương trình chuẩn.** $A$ có các hàng $(1,0)$, $(1,1)$, $(1,2)$, hai cột độc lập, nên hạng bằng $2$. Ta có
$$
A^\top A=\begin{pmatrix}3&3\\3&5\end{pmatrix},\quad A^\top y=\begin{pmatrix}7\\10\end{pmatrix}.
$$
Hệ $3w_0+3w_1=7$, $3w_0+5w_1=10$ cho $2w_1=3$, nên $\hat w_1=\frac32$, rồi $3w_0=7-\frac92=\frac52$, nên $\hat w_0=\frac56$. Giá trị khớp là $(\frac56,\frac73,\frac{23}6)$, phần dư là $(\frac16,-\frac13,\frac16)$, và
$$
\mathrm{SSE}=\frac1{36}+\frac19+\frac1{36}=\frac16 .
$$

**3. Phương sai.** Với $\hat w$ cố định, âm log-hợp lý theo $v=\sigma^2$ là $\frac32\log(2\pi v)+\frac{\mathrm{SSE}}{2v}$. Đạo hàm $\frac3{2v}-\frac{\mathrm{SSE}}{2v^2}$ bằng $0$ tại $v=\mathrm{SSE}/3$, âm khi $v<\mathrm{SSE}/3$ và dương khi $v>\mathrm{SSE}/3$, nên $\hat\sigma^2=\mathrm{SSE}/n=\frac1{18}$. Nghiệm tồn tại trong miền $v>0$ vì $\mathrm{SSE}=\frac16>0$.

**4. Đầu ra $(1,3,5)$.** Đường $\hat y=1+2x$ đi qua cả ba điểm, nên với $\sigma^2$ đã biết, $\hat w=(1,2)$ là nghiệm duy nhất (hạng đầy đủ) với $\mathrm{SSE}=0$. Khi $\sigma^2$ chưa biết, tại $\hat w=(1,2)$ âm log-hợp lý bằng $\frac32\log(2\pi\sigma^2)$, tiến về $-\infty$ khi $\sigma^2\downarrow0$. Hợp lý không bị chặn trên, nên không có nghiệm hợp lý cực đại chung với $\sigma^2>0$, dù bài toán theo hệ số có nghiệm (Nhận xét 12.4, ý 1).

**5. Giả thiết nhiễu.** Cách đọc $w_0+w_1x$ như $\mathbb E[Y\mid X=x]$ cần $\mathbb E[\xi\mid X=x]=0$. Phương trình chuẩn chỉ giải bài toán chiếu $y$ lên không gian cột của $A$ (Mệnh đề 12.3) và luôn có nghiệm với mọi dữ liệu, nên giải được nó không kiểm chứng được mô hình nhiễu.

**Kiểm tra lại.** Ở câu 2, $\sum_ir_i=\frac16-\frac13+\frac16=0$ và $\sum_ix_ir_i=0-\frac13+\frac26=0$, đúng với $A^\top r=0$.
:::

### Bài tập 12.5 (Entropy chéo, cực tiểu không đạt được và nhãn đổi)

**Mức độ:** tính toán, chứng minh. **Mục tiêu:** mục tiêu học tập 1; phân biệt entropy chéo với mất mát $0$–$1$.

::: exercise Bài tập 12.5
Hai cặp quan sát là $(x_1,y_1)=(-2,0)$ và $(x_2,y_2)=(1,1)$, độc lập có điều kiện. Dùng $m_w(x)=\mathbb P_w(Y=1\mid X=x)=1/(1+e^{-wx})$, không có hệ số tự do.

1. Từ phân phối Bernoulli có điều kiện, suy ra entropy chéo trung bình và viết nó thành hàm một biến $w$.
2. Tính mất mát tại $w=0$ và $w=\log3$. So sánh các nhãn dự đoán bằng quy tắc $\mathbf 1_{\{m_w(x)\ge1/2\}}$, giữ quy ước tại dấu bằng, và tính rủi ro thực nghiệm $0$–$1$ khi $w>0$ và khi $w=0$.
3. Chứng minh không có tham số hữu hạn đạt cực tiểu entropy chéo. Với $\eta\in(0,1)$, tìm một điều kiện đủ theo $w$ để mất mát không quá $\eta$.
4. Đổi nhãn của điểm $x=-2$ từ $0$ thành $1$. Tính lại mất mát tại hai tham số ở câu 2 và giải thích ảnh hưởng của dự đoán tự tin khi nhãn không phù hợp với mô hình.
5. Một tham số giảm entropy chéo trên hai quan sát có chứng minh được nó có rủi ro kỳ vọng $0$–$1$ nhỏ hơn không? Nêu đại lượng hoặc giả thiết còn thiếu.
:::

::: hint Gợi ý 1
Dùng $1-\operatorname{sigm}(z)=\operatorname{sigm}(-z)$ và Mệnh đề 12.6.
:::

::: hint Gợi ý 2
Ở câu 3, dùng $\log(1+u)\le u$ với $u\ge0$, và $e^{-2w}\le e^{-w}$ khi $w\ge0$.
:::

::: solution Lời giải Bài tập 12.5
**1. Entropy chéo.** Theo (5.1) với $n=2$: điểm $(-2,0)$ đóng góp $-\log(1-\operatorname{sigm}(-2w))=-\log\operatorname{sigm}(2w)=\log(1+e^{-2w})$, điểm $(1,1)$ đóng góp $-\log\operatorname{sigm}(w)=\log(1+e^{-w})$. Do đó
$$
\begin{aligned}
\hat L_2(w)=\frac12\Bigl[&\log(1+e^{-2w})\\
&+\log(1+e^{-w})\Bigr].
\end{aligned}
$$

**2. Hai tham số.**
- $w=0$: mỗi số hạng bằng $\log2$, nên $\hat L_2(0)=\log2\approx0{,}6931$. Cả hai điểm số bằng $0$, nên $m_0(-2)=m_0(1)=\frac12$ và quy tắc $\ge$ dự đoán $1$ tại cả hai điểm; sai tại $x=-2$, rủi ro thực nghiệm $0$–$1$ bằng $\frac12$.
- $w=\log3$: $e^{-2w}=\frac19$ và $e^{-w}=\frac13$, nên
$$
\begin{aligned}
\hat L_2(\log3)&=\frac12\Bigl[\log\frac{10}9+\log\frac43\Bigr]\\
&=\frac12\log\frac{40}{27}\approx0{,}1965 .
\end{aligned}
$$
Ta có $m_{\log3}(-2)=\frac1{1+9}=\frac1{10}$ và $m_{\log3}(1)=\frac34$, nên nhãn dự đoán là $(0,1)$, đúng cả hai.
- Với mọi $w>0$, $m_w(-2)<\frac12<m_w(1)$, nên rủi ro thực nghiệm $0$–$1$ bằng $0$.

**3. Không có cực tiểu hữu hạn.** Hai số hạng đều dương với mọi $w$ hữu hạn, nên $\hat L_2(w)>0$. Đạo hàm
$$
\begin{aligned}
\hat L_2'(w)&=-\frac12\Bigl[\frac2{1+e^{2w}}+\frac1{1+e^{w}}\Bigr]\\
&<0,
\end{aligned}
$$
nên $\hat L_2$ giảm chặt, và $\hat L_2(w)\to0$ khi $w\to+\infty$. Cận dưới đúng $0$ không đạt được. Với $w\ge0$, $\log(1+u)\le u$ cho $\hat L_2(w)\le\frac12(e^{-2w}+e^{-w})\le e^{-w}$, nên điều kiện $w\ge\log(1/\eta)$ (dương vì $\eta<1$) cho $\hat L_2(w)\le\eta$.

**4. Nhãn đổi.** Với nhãn $(1,1)$, điểm $x=-2$ đóng góp $-\log\operatorname{sigm}(-2w)=\log(1+e^{2w})$, nên
$$
\begin{aligned}
\hat L(w)=\frac12\Bigl[&\log(1+e^{2w})\\
&+\log(1+e^{-w})\Bigr].
\end{aligned}
$$
Tại $w=0$: $\log2\approx0{,}6931$. Tại $w=\log3$: $\frac12[\log10+\log\frac43]=\frac12\log\frac{40}3\approx1{,}2951$. Mô hình với $w=\log3$ gán xác suất $\frac1{10}$ cho nhãn thật $1$ tại $x=-2$, nên mất mát của điểm đó là $\log10\approx2{,}303$; dự đoán tự tin mà sai bị phạt nặng.

**5. Rủi ro kỳ vọng.** Không. Rủi ro kỳ vọng $0$–$1$ là kỳ vọng theo phân phối đích chưa biết; hai quan sát chỉ cho một rủi ro thực nghiệm, và với một mất mát khác (entropy chéo). Cần phân phối đích, hoặc một cận tổng quát hóa như Hệ quả 12.15 với giả thiết mẫu i.i.d. và cỡ mẫu đủ lớn.

**Kiểm tra lại.** Tại $w=\log3$: $\frac12[\log\frac{10}9+\log\frac43]=\frac12[0{,}1054+0{,}2877]=0{,}1965$. So với Ví dụ 12.5 (điểm âm tại $-1$, giá trị $0{,}2877$), điểm âm xa hơn làm mất mát nhỏ hơn tại cùng $w$.
:::

### Bài tập 12.6 (Rủi ro chính xác của bộ phân loại ngưỡng dưới hai phân phối đầu vào)

**Mức độ:** tính toán, kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 3; tính rủi ro bằng tích phân và nhận ra chỗ phân phối đầu vào được dùng.

::: exercise Bài tập 12.6
Cho $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, $h_t(x)=\mathbf 1_{\{x\ge t\}}$ với $t\in[-1,1]$, mất mát $0$–$1$.

1. Dùng (6.6), tính $R(h_{-0{,}4})$ và $R(h_{0{,}2})$.
2. Với tập huấn luyện $(-0{,}9;\,0)$, $(-0{,}1;\,0)$, $(0{,}4;\,1)$, $(0{,}8;\,1)$, tìm toàn bộ nghiệm ERM, giữ đúng hai đầu khoảng. Cho hai nghiệm có rủi ro kỳ vọng khác nhau.
3. Thay phân phối đầu vào bằng mật độ $f_X(x)=\frac{x+1}2$ trên $[-1,1]$, giữ nguyên quy tắc nhãn. Kiểm tra mật độ chuẩn hóa, rồi tính rủi ro $R_f(h_t)$ bằng tích phân cho $t<0$ và $t\ge0$. Tính $R_f(h_{-0{,}4})$, $R_f(h_{0{,}2})$ và giải thích vì sao công thức $\lvert t\rvert/2$ không còn đúng.
4. Dưới mật độ $f_X$ của câu 3, xét quy tắc ghi nhớ trả đúng bốn nhãn ở câu 2 và trả $0$ tại mọi điểm khác. Tính rủi ro thực nghiệm và rủi ro kỳ vọng; so sánh với ngưỡng $t=0$.
:::

::: hint Gợi ý 1
Xác định đúng đoạn mà $h_t$ khác nhãn thật; chỉ cần tích phân mật độ trên đoạn đó.
:::

::: hint Gợi ý 2
Một tập hữu hạn điểm có xác suất $0$ dưới cả hai phân phối liên tục trong đề.
:::

::: solution Lời giải Bài tập 12.6
**1. Phân phối đều.** Theo (6.6), $R(h_{-0{,}4})=\frac{0{,}4}2=0{,}2$ và $R(h_{0{,}2})=\frac{0{,}2}2=0{,}1$.

**2. Tập nghiệm ERM.** Theo Mệnh đề 12.11 với $a=-0{,}1$, $b=0{,}4$, tập nghiệm ERM gồm các $h_t$ với $-0{,}1<t\le0{,}4$. Ví dụ: $t=0$ có rủi ro $0$, còn $t=0{,}4$ có rủi ro $0{,}2$; cả hai có rủi ro thực nghiệm $0$.

**3. Mật độ không đều.** $\int_{-1}^1\frac{x+1}2\,dx=\frac12\bigl[\frac{x^2}2+x\bigr]_{-1}^1=\frac12\bigl[\frac32-(-\frac12)\bigr]=1$, và $f_X\ge0$, nên $f_X$ là mật độ.
- $t\ge0$: $R_f(h_t)=\int_0^t\frac{x+1}2\,dx=\frac{t^2/2+t}2=\frac{t(t+2)}4$.
- $t<0$: $R_f(h_t)=\int_t^0\frac{x+1}2\,dx=-\frac{t^2/2+t}2=\frac{-t(t+2)}4=\frac{\lvert t\rvert(2-\lvert t\rvert)}4$.

Do đó $R_f(h_{-0{,}4})=\frac{0{,}4\cdot1{,}6}4=0{,}16$ và $R_f(h_{0{,}2})=\frac{0{,}2\cdot2{,}2}4=0{,}11$, khác $0{,}2$ và $0{,}1$. Công thức $\lvert t\rvert/2$ dùng mật độ hằng $\frac12$; khi mật độ thay đổi, xác suất của một đoạn không còn tỉ lệ với độ dài, và rủi ro không còn đối xứng theo $t$.

**4. Quy tắc ghi nhớ dưới $f_X$.** Rủi ro thực nghiệm bằng $0$. Bốn điểm mẫu có xác suất $0$ dưới $f_X$, nên trên quan sát mới quy tắc dự đoán $0$ gần chắc chắn và sai khi $X\ge0$; rủi ro kỳ vọng bằng
$$
\begin{aligned}
\mathbb P_f(X\ge0)&=\int_0^1\frac{x+1}2\,dx\\
&=\frac12\Bigl[\frac12+1\Bigr]=\frac34 ,
\end{aligned}
$$
lớn hơn giá trị $\frac12$ dưới phân phối đều vì $f_X$ dồn khối lượng về nửa dương. Ngưỡng $t=0$ có cả hai rủi ro bằng $0$.

**Kiểm tra lại.** $R_f(h_{-1})=\frac14=\mathbb P_f(X<0)$ và $R_f(h_1)=\frac34=\mathbb P_f(X\ge0)$; tổng bằng $1$.
:::

### Bài tập 12.7 (Số chiều VC, giới hạn tổng quát hóa và lớp khoảng)

**Mức độ:** kiểm tra giả thiết, chứng minh, tính toán. **Mục tiêu:** phần (a) đo mục tiêu học tập 5, 6: kiểm phép phá vỡ của hai lớp ngưỡng và suy ra giới hạn tổng quát hóa qua Định lý 12.20, kể cả điều không chuyển được sang mạng sâu; phần (b) đo mục tiêu học tập 5, 6: chứng minh số chiều VC của lớp khoảng, tìm nghiệm ERM tệ nhất và đọc ba nguồn sai số trên ví dụ cảm biến.

::: exercise Bài tập 12.7
Miền đầu vào là $\mathbb R$, mất mát $0$–$1$. Xét hai lớp ngưỡng $\mathcal H_\uparrow$, $\mathcal H_{\mathrm{aff}}$ và lớp khoảng
$$
\begin{aligned}
\mathcal H_{\mathrm{int}}=\bigl\{&x\mapsto\mathbf 1_{\{a\le x\le b\}}:\\
&a,b\in\mathbb R,\ a\le b\bigr\}.
\end{aligned}
$$

**Phần (a). Hai lớp ngưỡng và giới hạn tổng quát hóa.**

1. Kiểm trực tiếp: $\mathcal H_\uparrow$ phá vỡ $\{0\}$ nhưng không phá vỡ $\{-1,1\}$; $\mathcal H_{\mathrm{aff}}$ phá vỡ $\{-1,1\}$ nhưng không phá vỡ $\{-1,0,1\}$. Cho tham số cụ thể cho mỗi vector nhãn biểu diễn được. Đối chiếu với số chiều VC trong Định lý 12.19 và nói phép kiểm trên các tập cụ thể này chứng minh được phần nào của định lý.
2. Kết hợp Định lý 12.20 với Bổ đề 12.14 để viết một bảo đảm rủi ro dư cho ERM chính xác trên mỗi lớp. Với cùng $\varepsilon$ và $\delta=0{,}05$, tính tỉ số giữa hai ngưỡng cỡ mẫu $c_0(d+\log(1/\delta))/\varepsilon^2$ của $\mathcal H_{\mathrm{aff}}$ và $\mathcal H_\uparrow$. Giải thích vì sao bảo đảm này không cho một cỡ mẫu bằng số.
3. Nêu những điều trong lập luận trên không chuyển được sang một mạng sâu huấn luyện bằng entropy chéo.

**Phần (b). Lớp khoảng.**

1. Chứng minh $d_{\mathrm{VC}}(\mathcal H_{\mathrm{int}})=2$: chỉ ra một tập hai điểm bị phá vỡ và chứng minh không tập ba điểm nào bị phá vỡ.
2. Trên ba điểm $x_1<x_2<x_3$ bất kỳ, đếm và liệt kê các vector nhãn của $\mathcal H_\uparrow$, $\mathcal H_{\mathrm{aff}}$ và $\mathcal H_{\mathrm{int}}$. Dùng kết quả giải thích vì sao cùng một đầu vào vô hướng có thể đi với các mức độ phức tạp lớp khác nhau.
3. Dùng ví dụ cảm biến: $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, tập huấn luyện $(-0{,}8;\,0)$, $(-0{,}2;\,0)$, $(0{,}3;\,1)$, $(0{,}7;\,1)$. Tìm tập nghiệm ERM trong $\mathcal H_{\mathrm{int}}$, tính rủi ro kỳ vọng của một hàm khoảng bất kỳ $\mathbf 1_{\{a\le x\le b\}}$ với $a\in[-1,1]$ và $b\ge\max\{a,0\}$, và tìm rủi ro kỳ vọng lớn nhất của một nghiệm ERM. So sánh với lớp ngưỡng, nơi nghiệm ERM tệ nhất có rủi ro $0{,}15$ (Ví dụ 12.8).
4. Nêu các giả thiết cần để áp dụng Định lý 12.20 cho $\mathcal H_{\mathrm{int}}$. Giải thích vì sao không được thế $M=\infty$ vào Định lý 12.13.
5. Trong (7.8), nêu một số hạng giảm được bằng giải tối ưu chính xác hơn và một số hạng không giảm theo cách đó.
:::

::: hint Gợi ý 1
Phần (a), câu 2: trên biến cố $\Delta_S\le\varepsilon$, Bổ đề 12.14 với $\eta=0$ cho rủi ro dư không quá $2\varepsilon$.
:::

::: hint Gợi ý 2
Phần (b): một khoảng chứa $x_1$ và $x_3$ thì chứa mọi điểm nằm giữa.
:::

::: hint Gợi ý 3
Phần (b), câu 3: hàm $\mathbf 1_{\{a\le x\le b\}}$ khác nhãn thật trên đoạn giữa $a$ và $0$, và trên phần của $[-1,1]$ nằm bên phải $b$.
:::

::: solution Lời giải Bài tập 12.7
**(a1) Phép phá vỡ của hai lớp ngưỡng.**
- $\mathcal H_\uparrow$ trên $\{0\}$: $t=0$ cho nhãn $1$, $t=1$ cho nhãn $0$; tập bị phá vỡ.
- $\mathcal H_\uparrow$ trên $\{-1,1\}$: $t=2$, $t=0$, $t=-2$ cho $00$, $01$, $11$. Nếu $h_t(-1)=1$ thì $t\le-1<1$, nên $h_t(1)=1$; vector $10$ không có.
- $\mathcal H_{\mathrm{aff}}$ trên $\{-1,1\}$: $(w,b)=(0,-1),(1,0),(-1,0),(0,1)$ cho $00,01,10,11$.
- $\mathcal H_{\mathrm{aff}}$ trên $\{-1,0,1\}$: vector $101$ không có, vì nhãn không giảm theo $x$ khi $w>0$, không tăng khi $w<0$ và hằng khi $w=0$.

Các phép kiểm khớp $d_{\mathrm{VC}}(\mathcal H_\uparrow)=1$ và $d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})=2$ của Định lý 12.19. Chúng chứng minh cận dưới ($d_{\mathrm{VC}}(\mathcal H_\uparrow)\ge1$, $d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})\ge2$) và chỉ ra một tập lớn hơn không bị phá vỡ. Cận trên cần lập luận cho mọi tập hai điểm (lớp ngưỡng) hoặc mọi tập ba điểm (lớp affine), như Bước 2 và Bước 4 của chứng minh Định lý 12.19.

**(a2) Giới hạn tổng quát hóa.** Theo Định lý 12.20 với $d=1$ hoặc $d=2$, khi $n\ge c_0(d+\log(1/\delta))/\varepsilon^2$, biến cố $\Delta_S\le\varepsilon$ có xác suất ít nhất $1-\delta$. Trên biến cố đó, Bổ đề 12.14 với $\eta=0$ cho
$$
R(\hat h_S)\le R_{\mathcal H}^*+2\varepsilon .
$$
Với $\delta=0{,}05$, $\log20\approx2{,}996$, nên tỉ số hai ngưỡng cỡ mẫu là
$$
\frac{2+\log20}{1+\log20}\approx\frac{4{,}996}{3{,}996}\approx1{,}25 .
$$
Nghĩa là ngưỡng cỡ mẫu đủ của lớp affine lớn hơn khoảng $25\%$ so với ngưỡng của lớp ngưỡng, với cùng $\varepsilon$, $\delta$; định lý không cho biết số quan sát tối thiểu thực sự cần. Hằng số $c_0$ không được xác định trong (8.5), nên cận chỉ cho bậc phụ thuộc vào $d$, $\varepsilon$, $\delta$ và tỉ số giữa hai lớp, không cho một cỡ mẫu bằng số.

**(a3) Điều không chuyển được sang mạng sâu.**
- Số chiều VC của mạng không suy ra từ số chiều đầu vào và không nhất thiết bằng số tham số: lớp $\{x\mapsto\lceil0{,}5\sin(\theta x)\rceil\}$ có một tham số nhưng số chiều VC vô hạn (Shalev-Shwartz và Ben-David, 2014, §6.3.5).
- Hằng số $c_0$ không xác định và các cận theo VC thường lỏng (xem Murphy (2022), §5.4.4.2), nên cách tiếp cận này ít giá trị thực hành.
- Định lý 12.20 nói về mất mát $0$–$1$. Mạng sâu được huấn luyện bằng entropy chéo không bị chặn, nên (8.5) không áp cho mất mát huấn luyện, và nghiệm của bộ tối ưu không có $\eta_S$ được kiểm soát theo rủi ro thực nghiệm $0$–$1$. Bổ đề 12.14 vẫn đúng với $\eta>0$, nhưng cần biết $\eta$.
- Bảo đảm cần mẫu i.i.d. cùng phân phối với dữ liệu triển khai (G1); Tình huống 12.2 cho thấy hậu quả khi giả thiết này hỏng.

**(b1) Số chiều VC.** Với $x_1<x_2$, các khoảng $[x_2+1,\,x_2+2]$, $[x_2,x_2]$, $[x_1,x_1]$, $[x_1,x_2]$ cho lần lượt các vector nhãn $00$, $01$, $10$, $11$, nên $\{x_1,x_2\}$ bị phá vỡ và $d_{\mathrm{VC}}(\mathcal H_{\mathrm{int}})\ge2$. Với $x_1<x_2<x_3$ bất kỳ, nếu $\mathbf 1_{\{a\le x\le b\}}$ cho nhãn $1$ tại $x_1$ và $x_3$ thì $a\le x_1<x_2<x_3\le b$, nên nhãn tại $x_2$ cũng bằng $1$. Vector $101$ không xuất hiện, nên không tập ba điểm nào bị phá vỡ và $d_{\mathrm{VC}}(\mathcal H_{\mathrm{int}})=2$.

**(b2) Ba điểm.**
- $\mathcal H_\uparrow$: $4$ vector $000,001,011,111$ (đổi nhãn nhiều nhất một lần, từ $0$ sang $1$).
- $\mathcal H_{\mathrm{aff}}$: thêm $100,110$, tổng cộng $6$ vector; thiếu $010$ và $101$, vì chúng cần hai lần đổi nhãn.
- $\mathcal H_{\mathrm{int}}$: mọi vector trừ $101$, tổng cộng $7$ vector: $000,100,010,001,110,011,111$.

Ba lớp cùng nhận một số thực nhưng tạo $4$, $6$, $7$ vector nhãn. Độ phức tạp thuộc về lớp hàm, không thuộc về số chiều đầu vào. Lớp $\mathcal H_{\mathrm{aff}}$ và $\mathcal H_{\mathrm{int}}$ có cùng số chiều VC $2$ nhưng khác số vector nhãn trên ba điểm.

**(b3) Ví dụ cảm biến.** Hàm khoảng phân loại đúng mẫu khi và chỉ khi $-0{,}2<a\le0{,}3$ (loại $-0{,}2$, giữ $0{,}3$) và $b\ge0{,}7$ (giữ $0{,}7$); điểm $-0{,}8<a$ tự động bị loại. Đó là tập nghiệm ERM, với rủi ro thực nghiệm $0$. Với $a\in[-1,1]$ và $b\ge\max\{a,0\}$, hàm khoảng khác nhãn thật trên đoạn giữa $a$ và $0$ (xác suất $\lvert a\rvert/2$) và trên $(b,1]$ khi $b<1$ (xác suất $(1-b)/2$), nên
$$
\begin{aligned}
R\bigl(\mathbf 1_{\{a\le x\le b\}}\bigr)&=\frac{\lvert a\rvert}2\\
&\quad+\frac{\max\{0,\,1-b\}}2 .
\end{aligned}
$$
Trên tập nghiệm ERM, số hạng thứ nhất lớn nhất bằng $0{,}15$ tại $a=0{,}3$, số hạng thứ hai lớn nhất bằng $0{,}15$ tại $b=0{,}7$. Do đó nghiệm ERM tệ nhất là $\mathbf 1_{\{0{,}3\le x\le0{,}7\}}$, với rủi ro $0{,}3$, gấp đôi nghiệm ERM tệ nhất $h_{0{,}3}$ của lớp ngưỡng. Lớp khoảng vẫn chứa $\mathbf 1_{\{0\le x\le1\}}$, trùng nhãn thật trên $[-1,1]$, nên sai số xấp xỉ vẫn bằng $0$; phần tăng thêm đến từ sai số ước lượng.

**(b4) Giả thiết.** Lớp cố định chọn trước khi lấy mẫu; số chiều VC hữu hạn ($d=2$ theo câu (b1)); mẫu i.i.d. cùng phân phối với quan sát mới; mất mát $0$–$1$; điều kiện đo được, là giả thiết của Định lý 12.20. Thế $M=\infty$ vào (7.4) cho vế phải vô hạn, không cho thông tin.

**(b5) Ba nguồn sai số.** Sai số tối ưu hóa $\eta_S$ giảm được bằng tối ưu chính xác hơn. Sai số xấp xỉ $R_{\mathcal H}^*-R^*$ chỉ phụ thuộc lớp, và $2\Delta_S$ chỉ phụ thuộc lớp và mẫu; tối ưu tốt hơn không làm giảm hai số hạng này. Câu (b3) minh họa điều đó: mọi nghiệm ERM có $\eta_S=0$, nhưng rủi ro vẫn thay đổi từ $0$ đến $0{,}3$.

**Kiểm tra lại.** Ở câu (b2), $7<8=2^3$, đúng với việc $\mathcal H_{\mathrm{int}}$ không phá vỡ ba điểm. Ở câu (b3), $\mathbf 1_{\{0{,}3\le x\le0{,}7\}}$ cho nhãn $0,0,1,1$ trên bốn điểm mẫu, và sai trên $[0;\,0{,}3)\cup(0{,}7;\,1]$, có xác suất $\frac{0{,}3+0{,}3}2=0{,}3$.
:::

### Bài tập 12.8 (Tham số độ chính xác và độ tin cậy trong một phát biểu PAC)

**Mức độ:** khái niệm. **Mục tiêu:** mục tiêu học tập 5; đọc đúng hai mức $\varepsilon$ và $\delta$.

::: exercise Bài tập 12.8
Một kết quả cho biết: với xác suất ít nhất $0{,}99$ theo tập huấn luyện, bộ phân loại học được có rủi ro $0$–$1$ không vượt rủi ro tốt nhất trong lớp quá $0{,}03$. Xác định tham số độ chính xác $\varepsilon$, độ tin cậy $1-\delta$, thiết lập của Định nghĩa 12.17 mà kết quả thuộc về, và giải thích vì sao không thể kết luận xác suất mọi dự đoán tương lai đều đúng bằng $0{,}99$.
:::

::: hint Gợi ý 1
Phân biệt xác suất theo việc lấy tập huấn luyện với xác suất sai trên một quan sát mới khi tập huấn luyện đã cố định.
:::

::: hint Gợi ý 2
So kết quả với (8.1) và (8.2) của Định nghĩa 12.17: đối tượng so sánh là $0$ hay $R_{\mathcal H}^*$?
:::

::: solution Lời giải Bài tập 12.8
**Hai mức.** $\varepsilon=0{,}03$ và $1-\delta=0{,}99$, nên $\delta=0{,}01$.

**Thiết lập.** Kết quả so sánh với $R_{\mathcal H}^*$ mà không đòi $R_{\mathcal H}^*=0$, nên thuộc thiết lập không giả định khả thực, dạng (8.2).

**Ý nghĩa của $0{,}99$.** Trong 100 lần lấy tập huấn luyện mới và học lại, khoảng 99 lần bộ phân loại học được có rủi ro không quá $R_{\mathcal H}^*+0{,}03$. Trên một lần học tốt, xác suất sai trên một quan sát mới vẫn là $R(\hat h_S)$, có thể bằng $R_{\mathcal H}^*+0{,}03>0$. Xác suất mọi dự đoán tương lai đều đúng là một đại lượng khác, và với các quan sát mới độc lập, nó tiến về $0$ khi số dự đoán tăng nếu $R(\hat h_S)>0$.

**Kiểm tra lại.** Một lỗi thường gặp là coi $1-\delta$ là tỉ lệ dự đoán đúng; tỉ lệ dự đoán đúng trên quan sát mới là $1-R(\hat h_S)$, còn $\varepsilon$ là tham số độ chính xác của bảo đảm.
:::

### Bài tập 12.9 (Hội tụ đều và nghiệm ERM gần đúng)

**Mức độ:** tính toán, chứng minh. **Mục tiêu:** mục tiêu học tập 4, 6; dùng Bổ đề 12.14 và Định lý 12.13 với số cụ thể.

::: exercise Bài tập 12.9
Một lớp cố định có $M$ bộ phân loại, dữ liệu i.i.d., mất mát $0$–$1$. Giả sử trên mẫu $S$ có $\Delta_S\le0{,}02$ và thuật toán đạt $\hat R_S(\hat h_S)\le\inf_{h\in\mathcal H}\hat R_S(h)+0{,}005$. Chứng minh rủi ro dư so với lớp không quá $0{,}045$. Viết một điều kiện đủ theo $n$, $M$, $\delta$ để biến cố $\Delta_S\le0{,}02$ có xác suất ít nhất $1-\delta$.
:::

::: hint Gợi ý 1
So sánh $\hat h_S$ với một $h$ bất kỳ rồi lấy cận dưới đúng; không cần giả định có hàm đạt rủi ro kỳ vọng nhỏ nhất.
:::

::: hint Gợi ý 2
Phần thứ hai: Định lý 12.13, Bước 4.
:::

::: solution Lời giải Bài tập 12.9
**Rủi ro dư.** Với mọi $h\in\mathcal H$,
$$
\begin{aligned}
R(\hat h_S)&\le\hat R_S(\hat h_S)+0{,}02\\
&\le\hat R_S(h)+0{,}005+0{,}02\\
&\le R(h)+0{,}045 .
\end{aligned}
$$
Dòng một và dòng ba dùng $\Delta_S\le0{,}02$, dòng hai dùng giả thiết tối ưu gần đúng và $\inf_{h'}\hat R_S(h')\le\hat R_S(h)$. Lấy cận dưới đúng theo $h$ cho $R(\hat h_S)-R_{\mathcal H}^*\le0{,}045$. Đây là Bổ đề 12.14 với $\varepsilon=0{,}02$, $\eta=0{,}005$.

**Cỡ mẫu.** Theo Định lý 12.13, điều kiện đủ là
$$
n\ge\frac{\log(2M/\delta)}{2\cdot0{,}02^2}=1250\log\frac{2M}\delta ;
$$
khi cần cỡ mẫu nguyên, làm tròn lên.

**Kiểm tra lại.** $2\varepsilon+\eta=0{,}04+0{,}005=0{,}045$ và $\frac1{2\cdot0{,}0004}=1250$. Ví dụ với $M=100$, $\delta=0{,}05$: $1250\log4000\approx10\,368$ quan sát.
:::
