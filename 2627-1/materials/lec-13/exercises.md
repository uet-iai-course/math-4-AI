# Bài tập Bài 13 — Ra quyết định tuần tự dưới điều kiện bất định

Các bài tập dưới đây đi kèm ghi chú Bài 13 và dẫn định nghĩa, kết quả, ví dụ theo số hiệu của ghi chú. Ký hiệu theo bảng ở Mục 2 của ghi chú: $h$ là trạng thái hoạt động, $z$ là trạng thái hấp thụ với thưởng $0$, $A$ và $B$ là hai hành động tại $h$; $Q_U(s,a)$ là giá trị nhìn trước một bước (5.7), $T$ là toán tử Bellman tối ưu (6.1). Ba bài trên lớp có lời giải đầy đủ để đối chiếu sau khi làm. Bốn bài tự học đầu (Bài tập 13.4–13.7) được điều chỉnh từ bộ bài tập tuần 4 của học phần; các bài còn lại củng cố từng mục của ghi chú.

## Bài tập trên lớp

### Bài tập 13.1 (Truyền phân phối hai bước)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1; dùng $\mu_{t+1}=\mu_tP$ và phân biệt các đường đi.

::: exercise Bài tập 13.1
Một robot có hai trạng thái xếp theo thứ tự $h$ (hoạt động), $n$ (nghỉ), ma trận chuyển
$$
P=\begin{pmatrix}0{,}7&0{,}3\\0{,}2&0{,}8\end{pmatrix}
$$
và phân phối đầu $\mu_0=(1;\,0)$.

**(a)** Tính $\mu_1$ và $\mu_2$.

**(b)** Giải thích vì sao xác suất ở $h$ sau hai bước không bằng $0{,}7^2$.
:::

::: hint Gợi ý 1
Nhân vector hàng với $P$ từ bên phải (Mệnh đề 13.2). Liệt kê các đường đi từ $h$ tới $h$ sau hai bước.
:::

::: hint Gợi ý 2
Theo Hệ quả 13.3, xác suất đường $h\to n\to h$ là $\mu_0(h)\,P_{hn}P_{nh}$; cộng với đường $h\to h\to h$ phải ra $\mu_2(h)$.
:::

::: solution Lời giải Bài tập 13.1
**(a)** Theo (4.3), $\mu_1=(1;\,0)P=(0{,}7;\,0{,}3)$ và
$$
\begin{aligned}
\mu_2&=\mu_1P\\
&=(0{,}7\cdot0{,}7+0{,}3\cdot0{,}2;\\
&\qquad0{,}7\cdot0{,}3+0{,}3\cdot0{,}8)\\
&=(0{,}49+0{,}06;\ 0{,}21+0{,}24)\\
&=(0{,}55;\,0{,}45).
\end{aligned}
$$

**(b)** Theo Hệ quả 13.3, đường $h\to h\to h$ có xác suất $0{,}7\cdot0{,}7=0{,}49$, còn đường $h\to n\to h$ có xác suất $0{,}3\cdot0{,}2=0{,}06$. Số $0{,}7^2$ chỉ tính đường thứ nhất; robot cũng có thể nghỉ một bước rồi hoạt động lại.

**Kiểm tra lại.** $0{,}55+0{,}45=1$, và $0{,}49+0{,}06=0{,}55=\mu_2(h)$.
:::

### Bài tập 13.2 (Lặp giá trị và điểm bất động)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 4–5; thực hiện lặp giá trị bằng tay và phân biệt vòng lặp với thời gian.

::: exercise Bài tập 13.2
Một MDP có hai trạng thái $h$, $z$; $z$ hấp thụ với thưởng $0$; $\gamma=1/2$. Tại $h$, hành động $A$ thưởng $1$ rồi chắc chắn tới $z$; hành động $B$ thưởng $0{,}6$ rồi chắc chắn ở lại $h$. Bắt đầu với $V_0(h)=V_0(z)=0$.

**(a)** Tính $v_k=V_k(h)$ với $k=1,2,3$ và ghi hành động đạt cực đại khi tạo mỗi giá trị.

**(b)** Tìm giá trị tối ưu $V^*(h)$ và một chính sách tối ưu.
:::

::: hint Gợi ý 1
Vì $V_k(z)=0$ với mọi $k$, bước Bellman là $v_{k+1}=\max\{1;\ 0{,}6+v_k/2\}$. Kiểm tra cả hai nhánh tại ứng viên điểm bất động.
:::

::: hint Gợi ý 2
Ứng viên từ nhánh $B$ thỏa $v=0{,}6+v/2$. Để kết luận giá trị tối ưu, dùng Hệ quả 13.18 cho tính duy nhất và Định lý 13.19 cho ý nghĩa tối ưu.
:::

::: solution Lời giải Bài tập 13.2
**(a)** Theo (6.1), $Q_{V_k}(h,A)=1+\tfrac12V_k(z)=1$ và $Q_{V_k}(h,B)=0{,}6+\tfrac12v_k$.

- $v_1=\max\{1;\ 0{,}6\}=1$, đạt bởi $A$.
- $v_2=\max\{1;\ 0{,}6+0{,}5\}=1{,}1$, đạt bởi $B$.
- $v_3=\max\{1;\ 0{,}6+0{,}55\}=1{,}15$, đạt bởi $B$.

**(b)** Ứng viên từ nhánh $B$ thỏa $v=0{,}6+v/2$, tức $v=1{,}2$. Tại $v=1{,}2$, nhánh $A$ bằng $1<1{,}2$, nên $\max\{1;\,1{,}2\}=1{,}2$ và $(1{,}2;\,0)$ là điểm bất động của $T$. Theo Hệ quả 13.18, đây là điểm bất động duy nhất; theo Định lý 13.19, $V^*(h)=1{,}2$ và chính sách tham lam chọn $B$ tại $h$ là tối ưu.

Các hành động ghi ở (a) thuộc các vòng tính toán; chúng không yêu cầu robot thực hiện $A$ rồi $B$ trên một quỹ đạo.

**Kiểm tra lại.** Theo (5.12), chính sách luôn chọn $B$ có $V^B(h)=0{,}6+\tfrac12V^B(h)$, tức $V^B(h)=1{,}2$, trùng $V^*(h)$.
:::

### Bài tập 13.3 (Mục tiêu theo mô hình và mục tiêu từ một mẫu)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 6; phân biệt kỳ vọng theo mô hình ước lượng với một mục tiêu từ mẫu.

::: exercise Bài tập 13.3
Tại một cặp $(s,a)$, năm lần thử độc lập đi tới $s_1$ bốn lần và tới $s_2$ một lần. Phần thưởng luôn bằng $1$, $\gamma=1/2$, $V(s_1)=3$, $V(s_2)=-1$.

**(a)** Tính hàng chuyển MLE và giá trị nhìn trước $\hat Q_V(s,a)$ theo mô hình ước lượng.

**(b)** Lần thử kế tiếp đi tới $s_1$. Bảng giá trị hành động hiện tại có $Q(s,a)=1$, $\max_{a'}Q(s_1,a')=3$ và $\max_{a'}Q(s_2,a')=-1$. Tính mục tiêu từ mẫu (7.5) và một cập nhật Q-learning (7.6) với $\alpha=0{,}2$.
:::

::: hint Gợi ý 1
Tính kỳ vọng theo hàng ước lượng trước; mục tiêu từ mẫu chỉ dùng trạng thái vừa quan sát.
:::

::: hint Gợi ý 2
Hàng MLE là tỉ số số đếm (Hệ quả 13.26). Cập nhật (7.6) dịch $Q(s,a)$ một phần $\alpha$ của khoảng cách tới mục tiêu từ mẫu.
:::

::: solution Lời giải Bài tập 13.3
**(a)** Theo Hệ quả 13.26, $\hat P(s_1\mid s,a)=4/5$ và $\hat P(s_2\mid s,a)=1/5$. Giá trị tiếp diễn kỳ vọng là $\tfrac45\cdot3+\tfrac15\cdot(-1)=2{,}4-0{,}2=2{,}2$, nên
$$
\hat Q_V(s,a)=1+\tfrac12\cdot2{,}2=2{,}1.
$$

**(b)** Theo (7.5), $Y=1+\tfrac12\cdot3=2{,}5$. Theo (7.6),
$$
\begin{aligned}
Q^+(s,a)&=1+0{,}2\,(2{,}5-1)\\
&=1+0{,}3=1{,}3.
\end{aligned}
$$
Một lần cập nhật dịch $Q(s,a)$ về phía một mục tiêu ngẫu nhiên; nó không thay phép lấy kỳ vọng $2{,}1$.

**Kiểm tra lại.** Nếu lần thử đi tới $s_2$, mục tiêu là $1+\tfrac12\cdot(-1)=0{,}5$. Kỳ vọng của mục tiêu theo hàng ước lượng là $\tfrac45\cdot2{,}5+\tfrac15\cdot0{,}5=2+0{,}1=2{,}1$, trùng $\hat Q_V(s,a)$.
:::

## Bài tập tự học

### Bài tập 13.4 (Xích Markov, xác suất chuyển và xác suất quỹ đạo)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1; phân biệt xác suất chuyển, xác suất đồng thời và xác suất quỹ đạo.

::: exercise Bài tập 13.4
Robot có hai trạng thái xếp theo thứ tự $h$ (hoạt động), $n$ (nghỉ), ma trận chuyển
$$
P=\begin{pmatrix}0{,}8&0{,}2\\0{,}35&0{,}65\end{pmatrix}
$$
và phân phối đầu $\mu_0=(0;\,1)$.

1. Tính $\mu_1$, $\mu_2$ bằng nhân ma trận và kiểm tra chuẩn hóa.
2. Liệt kê các đường đóng góp vào $\mathbb P(S_2=h)$ và kiểm tra kết quả câu 1 bằng xác suất toàn phần.
3. Tính $\mathbb P(S_0=n,S_1=h)$ và so sánh với phần tử $P_{nh}$; giải thích vì sao hai số trùng nhau trong dữ kiện này dù là hai khái niệm khác nhau. Tính $\mathbb P(S_0=n,S_1=h,S_2=n)$.
4. Với phân phối hiện tại $\mu_t=(0{,}5;\,0{,}5)$, tính $\mathbb P(S_t=h,S_{t+1}=n)$ và $\mathbb P(S_{t+1}=n\mid S_t=h)$. Dùng một phép kiểm số để xác định $S_t$ và $S_{t+1}$ có độc lập không.
5. Nếu ở bước thứ hai robot dùng một ma trận chuyển khác $P'$, công thức $\mu_2=\mu_0P^2$ phải thay bằng công thức nào?
:::

::: hint Gợi ý 1
Mỗi tọa độ của $\mu_{t+1}$ là tổng theo mọi trạng thái hiện tại (Mệnh đề 13.2).
:::

::: hint Gợi ý 2
Câu 3 dùng Hệ quả 13.3: xác suất của một quỹ đạo là xác suất trạng thái đầu nhân các xác suất chuyển. Không giả sử các thời điểm độc lập.
:::

::: solution Lời giải Bài tập 13.4
**1.** Theo (4.3), $\mu_1=(0;\,1)P=(0{,}35;\,0{,}65)$ và
$$
\begin{aligned}
\mu_2&=\mu_1P\\
&=(0{,}35\cdot0{,}8+0{,}65\cdot0{,}35;\\
&\qquad0{,}35\cdot0{,}2+0{,}65\cdot0{,}65)\\
&=(0{,}28+0{,}2275;\ 0{,}07+0{,}4225)\\
&=(0{,}5075;\,0{,}4925).
\end{aligned}
$$
Tổng các tọa độ: $0{,}35+0{,}65=1$ và $0{,}5075+0{,}4925=1$.

**2.** Robot bắt đầu chắc chắn ở $n$. Hai đường tới $h$ sau hai bước:

- $n\to h\to h$: $1\cdot0{,}35\cdot0{,}8=0{,}28$;
- $n\to n\to h$: $1\cdot0{,}65\cdot0{,}35=0{,}2275$.

Xác suất toàn phần với phân hoạch theo $S_1$ cho $\mathbb P(S_2=h)=0{,}28+0{,}2275=0{,}5075$, trùng $\mu_2(h)$.

**3.** Theo quy tắc nhân, $\mathbb P(S_0=n,S_1=h)=\mathbb P(S_0=n)\,P_{nh}=1\cdot0{,}35=0{,}35$. Phần tử $P_{nh}=0{,}35$ là xác suất có điều kiện khi đã biết $S_0=n$; hai số trùng nhau vì $\mathbb P(S_0=n)=1$. Với $\mu_0=(1/2;\,1/2)$, xác suất đồng thời sẽ là $0{,}175$ trong khi $P_{nh}$ vẫn là $0{,}35$. Theo (4.4),
$$
\begin{aligned}
&\mathbb P(S_0=n,S_1=h,S_2=n)\\
&\quad=\mu_0(n)\,P_{nh}\,P_{hn}\\
&\quad=1\cdot0{,}35\cdot0{,}2=0{,}07.
\end{aligned}
$$
Số này là xác suất của cả quỹ đạo, khác mỗi phần tử $P_{nh}=0{,}35$ và $P_{hn}=0{,}2$.

**4.** $\mathbb P(S_{t+1}=n\mid S_t=h)=P_{hn}=0{,}2$ và $\mathbb P(S_t=h,S_{t+1}=n)=0{,}5\cdot0{,}2=0{,}1$. Theo (4.3), $\mathbb P(S_{t+1}=n)=0{,}5\cdot0{,}2+0{,}5\cdot0{,}65=0{,}1+0{,}325=0{,}425$. Nếu hai trạng thái độc lập thì xác suất đồng thời bằng $0{,}5\cdot0{,}425=0{,}2125\ne0{,}1$; vậy chúng không độc lập.

**5.** Bước 1 của chứng minh Mệnh đề 13.2 áp dụng cho từng bước với ma trận của bước đó: $\mu_1=\mu_0P$, $\mu_2=\mu_1P'=\mu_0PP'$.

**Kiểm tra lại.** Bốn quỹ đạo dài hai bước bắt đầu từ $n$ có tổng xác suất $1$: $0{,}28+0{,}2275+0{,}07+0{,}4225=1$.
:::

### Bài tập 13.5 (Lặp giá trị cho robot và giá trị dài hạn)

**Mức độ:** tính toán, chứng minh. **Mục tiêu:** mục tiêu học tập 3–5; lặp giá trị, điểm bất động tối ưu, tốc độ hội tụ và vai trò của $\gamma<1$.

::: exercise Bài tập 13.5
Robot có trạng thái hoạt động $h$ và trạng thái hấp thụ $z$. Tại $z$, thưởng luôn bằng $0$ và robot ở lại $z$. Tại $h$, hành động $A$ thưởng $1$, ở lại $h$ với xác suất $1/2$ và tới $z$ với xác suất $1/2$; hành động $B$ thưởng $0{,}8$ và luôn ở lại $h$. Cho $\gamma=0{,}9$ và $V_0(h)=V_0(z)=0$.

1. Viết toán tử Bellman tối ưu $T$ và công thức rút gọn theo $v_k=V_k(h)$.
2. Tính $v_1,v_2,v_3,v_4$ cùng hai giá trị nhìn trước ở mỗi vòng. Nêu rõ hành động ghi ở mỗi vòng là hành động nào.
3. Tìm điểm bất động của $T$ và hành động tối ưu tại $h$. Tính giá trị của chính sách luôn chọn $A$ và giải thích vì sao phần thưởng tức thời lớn nhất không cho tổng thưởng lớn nhất.
4. Chứng minh trực tiếp $\lVert TV-TW\rVert_\infty\le0{,}9\,\lVert V-W\rVert_\infty$ cho MDP này. Nêu vì sao tính co chưa đủ để kết luận điểm bất động là giá trị tối ưu.
5. Chứng minh $v_k=8-7\cdot0{,}9^{k-1}$ với mọi $k\ge1$. Từ đó tìm số vòng nhỏ nhất bảo đảm sai số tại $h$ không quá $0{,}1$.
6. Thay $\gamma$ bằng $1$. Phân tích giá trị của chính sách luôn chọn $B$, dãy lặp giá trị, và chỉ ra giả thiết nào của Hệ quả 13.18 không còn đúng.
:::

::: hint Gợi ý 1
Tìm giá trị $v$ tại đó hai nhánh $1+0{,}45v$ và $0{,}8+0{,}9v$ bằng nhau.
:::

::: hint Gợi ý 2
Câu 5: chứng minh đồng thời $v_k\ge1$ và công thức đóng bằng quy nạp theo $k$.
:::

::: solution Lời giải Bài tập 13.5
**1.** Theo (6.1),
$$
\begin{aligned}
&(TV)(h)\\
&\quad=\max\bigl\{1+0{,}9\bigl(\tfrac12V(h)\\
&\qquad\quad+\tfrac12V(z)\bigr);\ 0{,}8+0{,}9\,V(h)\bigr\},\\
&(TV)(z)=0{,}9\,V(z).
\end{aligned}
$$
Vì $V_0(z)=0$, quy nạp cho $V_k(z)=0$ với mọi $k$, và $v_{k+1}=\max\{1+0{,}45\,v_k;\ 0{,}8+0{,}9\,v_k\}$. Nhánh $B$ không nhỏ hơn nhánh $A$ khi $0{,}45v\ge0{,}2$, tức $v\ge4/9$.

**2.** Hành động ghi ở dòng $k$ là hành động đạt cực đại khi tính $v_{k+1}$ từ $v_k$.

| $k$ | $v_k$ | $Q_{V_k}(h,A)$ | $Q_{V_k}(h,B)$ | Hành động | $v_{k+1}$ |
|---:|---:|---:|---:|---|---:|
| 0 | 0 | 1 | 0,8 | $A$ | 1 |
| 1 | 1 | 1,45 | 1,7 | $B$ | 1,7 |
| 2 | 1,7 | 1,765 | 2,33 | $B$ | 2,33 |
| 3 | 2,33 | 2,0485 | 2,897 | $B$ | 2,897 |

Vậy $v_1=1$, $v_2=1{,}7$, $v_3=2{,}33$, $v_4=2{,}897$.

**3.** Nhánh $B$: $v=0{,}8+0{,}9v$ cho $0{,}1v=0{,}8$, tức $v=8$; tại đó nhánh $A$ bằng $1+0{,}45\cdot8=4{,}6<8$. Vậy $(8;\,0)$ là điểm bất động, duy nhất theo Hệ quả 13.18, và theo Định lý 13.19, $V^*(h)=8$ với hành động tối ưu $B$. Chính sách luôn chọn $A$ thỏa $V^A(h)=1+0{,}45\,V^A(h)$, nên $V^A(h)=1/0{,}55=20/11\approx1{,}818$. Hành động $A$ cho thưởng $1>0{,}8$ nhưng làm robot dừng với xác suất $1/2$ mỗi lần chọn, nên mất phần thưởng về sau.

**4.** Với mọi $V,W$, đặt $\delta=\lVert V-W\rVert_\infty$. Tại $h$, hai giá trị nhìn trước thỏa
$$
\begin{aligned}
&\lvert Q_V(h,A)-Q_W(h,A)\rvert\\
&\quad\le0{,}45\,\lvert V(h)-W(h)\rvert\\
&\qquad+0{,}45\,\lvert V(z)-W(z)\rvert\\
&\quad\le0{,}9\,\delta,\\
&\lvert Q_V(h,B)-Q_W(h,B)\rvert\\
&\quad=0{,}9\,\lvert V(h)-W(h)\rvert\le0{,}9\,\delta.
\end{aligned}
$$
Bổ đề 13.15 cho $\lvert(TV)(h)-(TW)(h)\rvert\le0{,}9\,\delta$. Tại $z$, $\lvert(TV)(z)-(TW)(z)\rvert=0{,}9\,\lvert V(z)-W(z)\rvert\le0{,}9\,\delta$. Lấy cực đại theo trạng thái được $\lVert TV-TW\rVert_\infty\le0{,}9\,\delta$. Tính co chỉ cho một điểm bất động duy nhất; để biết nó bằng $V^*$ cần thêm hai chiều của Định lý 13.19: chính sách tham lam đạt điểm bất động, và mọi chính sách không vượt nó.

**5.** Với $k=1$: $8-7\cdot0{,}9^0=1=v_1$. Giả sử $v_k=8-7\cdot0{,}9^{k-1}$. Vì $7\cdot0{,}9^{k-1}\le7$, ta có $v_k\ge1>4/9$, nên nhánh $B$ đạt cực đại và
$$
\begin{aligned}
v_{k+1}&=0{,}8+0{,}9\bigl(8-7\cdot0{,}9^{k-1}\bigr)\\
&=0{,}8+7{,}2-7\cdot0{,}9^k\\
&=8-7\cdot0{,}9^k.
\end{aligned}
$$
Sai số tại $h$ là $8-v_k=7\cdot0{,}9^{k-1}$. Điều kiện $7\cdot0{,}9^{k-1}\le0{,}1$ tương đương $0{,}9^{k-1}\le1/70$, tức
$$
\begin{aligned}
k-1&\ge\frac{\ln70}{\ln(10/9)}\\
&\approx\frac{4{,}248}{0{,}1054}\approx40{,}32.
\end{aligned}
$$
Vậy $k=42$ là số vòng nhỏ nhất: $7\cdot0{,}9^{41}\approx0{,}0931\le0{,}1$ còn $7\cdot0{,}9^{40}\approx0{,}1035>0{,}1$. Chặn (6.7) với $\lVert V_0-V^*\rVert_\infty=8$ đòi $8\cdot0{,}9^k\le0{,}1$, tức $k\ge\ln80/\ln(10/9)\approx41{,}6$, cũng cho $k=42$.

**6.** Với $\gamma=1$, chính sách luôn chọn $B$ có tổng thưởng $0{,}8+0{,}8+\cdots=+\infty$. Toán tử rút gọn là $v\mapsto\max\{1+0{,}5v;\ 0{,}8+v\}$; vì $0{,}8+v>v$, mọi $v$ thỏa $Tv>v$, nên không có điểm bất động thực. Dãy lặp: $v_1=1$; nhánh $B$ thắng khi $v\ge0{,}4$, nên $v_k=1+0{,}8(k-1)\to\infty$. Với $v,w\ge0{,}4$, $\lvert Tv-Tw\rvert=\lvert v-w\rvert$, nên hệ số co bằng $1$. Giả thiết bị vi phạm là $\gamma<1$ (giả thiết O2), cần cho Mệnh đề 13.8 và cho hệ số $\kappa<1$ trong Định lý 13.17.

**Kiểm tra lại.** Công thức câu 5 cho $v_4=8-7\cdot0{,}729=8-5{,}103=2{,}897$, trùng bảng ở câu 2.
:::

### Bài tập 13.6 (Học mô hình và mục tiêu Bellman)

**Mức độ:** tính toán, kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 6; ước lượng một hàng chuyển, tính mục tiêu theo mô hình và từ mẫu, nhận ra giới hạn của số đếm.

::: exercise Bài tập 13.6
Một bộ mô phỏng cho phép thử độc lập cùng một cặp $(s,a)$ trong $10$ lần: $7$ lần tới $s_1$ và $3$ lần tới $s_2$. Cho $r(s,a)=2$, $\gamma=0{,}8$, $V(s_1)=5$, $V(s_2)=1$.

1. Lập hợp lý của hàng chuyển trên đơn hình và suy ra MLE.
2. Tính mục tiêu Bellman theo mô hình ước lượng. Phân biệt nó với $V^*(s)$ và với mục tiêu từ một lần chuyển tiếp.
3. Giả sử phần thưởng quan sát luôn bằng $2$. Liệt kê hai mục tiêu từ mẫu có thể nhận và kiểm tra kỳ vọng của chúng theo hàng ước lượng.
4. Một hành động $b$ tại cùng trạng thái chưa được thử lần nào. Mô tả tập các hàng MLE của $(s,b)$ và giải thích vì sao tỉ số số đếm không chọn được một hàng duy nhất.
5. Nếu dữ liệu đến từ một quỹ đạo do một chính sách thu thập, nêu những điều cần kiểm tra trước khi dùng công thức số đếm. Phân biệt xác suất đồng thời của quỹ đạo với xác suất có điều kiện theo toàn bộ chuỗi hành động.
:::

::: hint Gợi ý 1
Câu 1: hợp lý là $q_1^7q_2^3$ với $q_1+q_2=1$. Câu 4: khi không có dữ liệu, hợp lý là tích rỗng.
:::

::: hint Gợi ý 2
Câu 5: xem điều kiện của Phụ lục A trong ghi chú.
:::

::: solution Lời giải Bài tập 13.6
**1.** Với hàng $(q_1;\,q_2)$, $q_1+q_2=1$, các lần thử độc lập cho $L(q_1)=q_1^7(1-q_1)^3$ trên $[0,1]$. Tại hai đầu mút $L=0$. Trên $(0,1)$,
$$
\begin{aligned}
\frac{d}{dq_1}\ln L&=\frac{7}{q_1}-\frac{3}{1-q_1}=0\\
&\iff7(1-q_1)=3q_1\\
&\iff q_1=\frac{7}{10}.
\end{aligned}
$$
Đạo hàm dương khi $q_1<7/10$ và âm khi $q_1>7/10$, nên MLE duy nhất là $(0{,}7;\,0{,}3)$, đúng như Hệ quả 13.26.

**2.** Theo (5.7) với $\hat P$:
$$
\begin{aligned}
&\hat Q_V(s,a)\\
&\quad=2+0{,}8\,(0{,}7\cdot5+0{,}3\cdot1)\\
&\quad=2+0{,}8\cdot3{,}8\\
&\quad=2+3{,}04=5{,}04.
\end{aligned}
$$
Số này khác $V^*(s)$ vì ba lẽ: $V$ là một vector cho trước, chưa phải $V^*$; chưa lấy cực đại theo hành động; và dùng $\hat P$ thay cho $P$. Nó cũng khác mục tiêu từ một lần chuyển tiếp, vốn chỉ dùng một trạng thái kế tiếp.

**3.** Nếu quan sát $s_1$: $Y=2+0{,}8\cdot5=6$, với xác suất ước lượng $0{,}7$. Nếu quan sát $s_2$: $Y=2+0{,}8\cdot1=2{,}8$, với xác suất ước lượng $0{,}3$. Kỳ vọng là $0{,}7\cdot6+0{,}3\cdot2{,}8=4{,}2+0{,}84=5{,}04$, trùng câu 2.

**4.** Không có lần thử nào, nên mọi số mũ bằng $0$ và hợp lý $L\equiv1$ trên toàn đơn hình $\Delta(\mathcal S)$. Mọi hàng xác suất đều là MLE (Hệ quả 13.26 với $m=0$). Khi $\lvert\mathcal S\rvert\ge2$, nghiệm không duy nhất, và tỉ số $N(s,b,s')/N(s,b)=0/0$ không xác định.

**5.** Cần kiểm tra: chính sách thu thập có dùng phần thưởng hay phụ thuộc tham số chuyển tiếp không; phân phối ban đầu có phụ thuộc tham số không; trạng thái có thỏa tính Markov và mô hình có thuần nhất không. Các trạng thái trên quỹ đạo không i.i.d., nhưng dưới các điều kiện trên, xác suất đồng thời (A.1) là tích, và các nhân tử chuyển tiếp nhóm theo số đếm, nên MLE của mỗi hàng vẫn là tỉ số số đếm. Xác suất có điều kiện theo toàn bộ chuỗi hành động, kể cả hành động tương lai, phải chia cho xác suất của chuỗi hành động; khi chính sách dùng trạng thái để chọn hành động, thương này nói chung không phải tích các xác suất chuyển.

**Kiểm tra lại.** $\hat P$ có tổng $0{,}7+0{,}3=1$; giá trị $5{,}04$ nằm giữa hai mục tiêu từ mẫu $2{,}8$ và $6$.
:::

### Bài tập 13.7 (Giả thiết và bảo đảm của quy hoạch và của học)

**Mức độ:** kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 4 và 6; đối chiếu giả thiết của các kết quả với hai hệ thống cụ thể.

::: exercise Bài tập 13.7
Hai hệ thống cùng có tập trạng thái và hành động hữu hạn, phần thưởng bị chặn và $\gamma=0{,}9$. Hệ thống thứ nhất biết chính xác $P,r$ và dùng cập nhật đồng thời $V_{k+1}=TV_k$. Hệ thống thứ hai chỉ nhận các bộ $(S_t,A_t,R_{t+1},S_{t+1})$, cập nhật một phần tử của bảng $Q$ bằng mục tiêu từ mẫu, và có thể dùng một mạng nơ-ron để biểu diễn $Q$.

1. Viết một đoạn 4–6 câu phân biệt thông tin đã biết, đại lượng cần học và vai trò của thăm dò ở hai hệ thống.
2. Liệt kê giả thiết và kết luận của Hệ quả 13.18 và Định lý 13.19 áp dụng cho hệ thống thứ nhất. Giải thích vì sao không được coi hai kết quả đó là chứng minh hội tụ cho hệ thống thứ hai.
3. Nêu một ví dụ trạng thái quan sát không có tính Markov, khác cơ chế của Tình huống 13.2: chỉ ra hai lịch sử tại cùng một thời điểm, có xác suất dương và cùng quan sát hiện tại, nhưng phân phối bước sau khác nhau. Đề xuất một cách sửa.
4. Phân biệt sai số của phép quy hoạch, sai số mô hình do dữ liệu hữu hạn và hạn chế của cách biểu diễn giá trị. Giải thích vì sao giảm phần dư Bellman trên một mô hình đã khớp chưa kiểm soát mọi nguồn sai số này.
:::

::: hint Gợi ý 1
Câu 2: kiểm tra từng giả thiết (O1)–(O3) và mô hình đúng. Câu 3: xét một robot có mức pin không được ghi vào trạng thái. So sánh phân phối bước sau của hai lịch sử khác nhau tại cùng một thời điểm $t$, cùng quan sát hiện tại.
:::

::: hint Gợi ý 2
Câu 3: một chu trình pin ẩn có pha ban đầu ngẫu nhiên cho hai lịch sử $(S_0,S_1)$ có cùng $S_1$ nhưng dẫn tới $S_2$ khác nhau. Câu 4: đối chiếu từng nguồn sai số với Hệ quả 13.21 và Mệnh đề 12.16.
:::

::: solution Lời giải Bài tập 13.7
**1.** Hệ thống thứ nhất biết $P$ và $r$, nên mỗi vòng tính đúng kỳ vọng theo trạng thái kế tiếp và không cần thu dữ liệu. Hệ thống thứ hai không biết $P,r$; nó phải học bảng $Q$ từ các chuyển tiếp quan sát được, mỗi chuyển tiếp chỉ là một kết quả ngẫu nhiên. Dữ liệu của hệ thống thứ hai phụ thuộc chính sách nó dùng để chọn hành động. Nếu một cặp trạng thái–hành động không được thử, hệ thống không có thông tin về cặp đó. Vì vậy hệ thống thứ hai cần thăm dò, còn hệ thống thứ nhất thì không.

**2.** Giả thiết: MDP hữu hạn (Định nghĩa 13.5), tập hành động khác rỗng, phần thưởng bị chặn, $\gamma<1$, mô hình $P,r$ đúng và toán tử được tính chính xác (O3). Kết luận: $T$ là ánh xạ co hệ số $\gamma$; có điểm bất động duy nhất $\bar V$; $V_k\to\bar V$ với $\lVert V_k-\bar V\rVert_\infty\le\gamma^k\lVert V_0-\bar V\rVert_\infty$; $\bar V=V^*$ và chính sách tham lam theo $\bar V$ là tối ưu. Hệ thống thứ hai không tính $T$: nó thay kỳ vọng bằng một mẫu, chỉ cập nhật một phần tử mỗi lần, và có thể biểu diễn $Q$ bằng một hàm xấp xỉ. Giả thiết (O3) bị vi phạm; hội tụ của Q-learning cần các giả thiết riêng về bước học và việc thăm các cặp (Nhận xét 13.29).

**3.** Xét robot có quan sát $h$ (hoạt động) hoặc $n$ (nghỉ) và mức pin ẩn $b\in\{0,1\}$ không được ghi. Cặp (quan sát, pin) đi theo chu trình tất định gồm ba pha
$$
\begin{gathered}
(h,1)\to(h,0)\to(n,0)\\
\to(h,1)\to\cdots,
\end{gathered}
$$
tức robot hoạt động hai bước liên tiếp rồi nghỉ một bước để sạc. Pha ban đầu được chọn đều trong ba pha, mỗi pha xác suất $1/3$.

**Ba quỹ đạo quan sát.** Theo pha ban đầu, $(S_0,S_1,S_2)$ là:

- pha $(h,1)$: $(h,h,n)$;
- pha $(h,0)$: $(h,n,h)$;
- pha $(n,0)$: $(n,h,h)$.

Mỗi quỹ đạo có xác suất $1/3$.

**Hai lịch sử tại cùng thời điểm $t=1$.** Lịch sử $(S_0,S_1)=(h,h)$ và lịch sử $(S_0,S_1)=(n,h)$ đều có xác suất $1/3>0$ và cùng quan sát hiện tại $S_1=h$. Tuy nhiên,
$$
\begin{aligned}
&\mathbb P(S_2=n\mid S_0=h,S_1=h)\\
&\quad=\frac{\mathbb P(h,h,n)}{\mathbb P(S_0=h,S_1=h)}\\
&\quad=\frac{1/3}{1/3}=1,\\
&\mathbb P(S_2=n\mid S_0=n,S_1=h)\\
&\quad=\frac{0}{1/3}=0.
\end{aligned}
$$
Trong khi đó $\mathbb P(S_2=n\mid S_1=h)=\frac{1/3}{2/3}=\frac12$, khác cả hai số trên. Vậy (4.1) không đúng tại $t=1$: quan sát $h$ không cho biết robot đang ở bước hoạt động thứ nhất hay thứ hai.

**Cách sửa.** Như Nhận xét 07.47, mở rộng trạng thái thành cặp $(S_t,b_t)$, hoặc cặp hai quan sát gần nhất $(S_{t-1},S_t)$; với trạng thái mở rộng, bước sau được xác định hoàn toàn từ trạng thái hiện tại. Nếu không đo được pin và không giữ quan sát cũ, cần mô hình quan sát một phần và suy luận phân phối của $b_t$ từ lịch sử quan sát.

**4.** Ba nguồn sai số:

- sai số quy hoạch: $V_k$ còn cách điểm bất động của mô hình đang dùng; Hệ quả 13.21 chặn nó bằng $\beta(V_k)/(1-\gamma)$;
- sai số mô hình: $\hat P,\hat r$ khác $P,r$ do dữ liệu hữu hạn hoặc thu thập lệch;
- hạn chế biểu diễn: lớp hàm dùng cho giá trị hoặc cách chọn trạng thái không biểu diễn được giá trị thật.

Phần dư $\beta\to0$ chỉ kiểm soát nguồn thứ nhất. Cách tách này giống Mệnh đề 12.16, nơi rủi ro dư được chặn bằng tổng của sai số xấp xỉ, sai số ước lượng và sai số tối ưu hóa.

**Kiểm tra lại.** Tình huống 13.1 của ghi chú là một ví dụ số: phép quy hoạch trên mô hình ước lượng hội tụ đúng, nhưng chính sách thu được mất $46/11$ so với tối ưu thật vì sai số mô hình.
:::

### Bài tập 13.8 (Giá trị của chính sách dừng)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 2–3; lập $P^\pi$, $r^\pi$ và giải phương trình Bellman cho chính sách cố định.

::: exercise Bài tập 13.8
Một MDP có hai trạng thái $h$, $z$; $z$ hấp thụ với thưởng $0$; $\gamma=1/2$. Tại $h$, hành động $A$ thưởng $2$ rồi chắc chắn tới $z$; hành động $B$ thưởng $1$ rồi chắc chắn ở lại $h$.

**(a)** Tính giá trị tại $h$ của hai chính sách tất định dừng.

**(b)** Chính sách $\pi$ chọn $A$ hoặc $B$ với xác suất $1/2$ tại $h$. Viết $P^\pi$, $r^\pi$ theo thứ tự $h,z$ và tính $V^\pi(h)$.

**(c)** Ba chính sách có cùng giá trị. Điều đó có mâu thuẫn với tính duy nhất trong Định lý 13.12 không?
:::

::: hint Gợi ý 1
Với mọi chính sách, $V(z)=0$. Viết một phương trình một ẩn cho $V(h)$ theo (5.12).
:::

::: hint Gợi ý 2
Với chính sách trộn, lập $P^\pi$ và $r^\pi$ theo (5.3) trước, rồi giải $V^\pi(h)=r^\pi(h)+\tfrac12P^\pi(h,h)V^\pi(h)$.
:::

::: solution Lời giải Bài tập 13.8
**(a)** Luôn chọn $A$: $V^A(h)=2+\tfrac12\cdot0=2$. Luôn chọn $B$: $V^B(h)=1+\tfrac12V^B(h)$, nên $V^B(h)=2$.

**(b)** Theo (5.3),
$$
\begin{gathered}
P^\pi=\begin{pmatrix}1/2&1/2\\0&1\end{pmatrix},\\
r^\pi=\begin{pmatrix}3/2\\0\end{pmatrix}.
\end{gathered}
$$
Theo (5.12), $V^\pi(h)=\tfrac32+\tfrac12\cdot\tfrac12\,V^\pi(h)=\tfrac32+\tfrac14V^\pi(h)$, nên $\tfrac34V^\pi(h)=\tfrac32$ và $V^\pi(h)=2$.

**(c)** Không. Định lý 13.12 nói mỗi chính sách có đúng một vector giá trị; nó không nói hai chính sách khác nhau phải có giá trị khác nhau.

**Kiểm tra lại.** Thế lại: $1+\tfrac12\cdot2=2$ và $\tfrac32+\tfrac14\cdot2=2$.
:::

### Bài tập 13.9 (Phương trình Bellman tối ưu có hai hành động cùng tối ưu)

**Mức độ:** tính toán, khái niệm. **Mục tiêu:** mục tiêu học tập 3–4; giải phương trình Bellman tối ưu và tách tính duy nhất của giá trị khỏi tính duy nhất của chính sách.

::: exercise Bài tập 13.9
Dùng MDP của Bài tập 13.8: $z$ hấp thụ với thưởng $0$, $\gamma=1/2$; tại $h$, $A$ thưởng $2$ rồi tới $z$, $B$ thưởng $1$ rồi ở lại $h$. Viết toán tử Bellman tối ưu theo $v=V(h)$ khi $V(z)=0$, tìm điểm bất động và mọi hành động đạt cực đại tại đó. Nêu kết quả nào cho phép kết luận không chính sách nào, kể cả chính sách phụ thuộc lịch sử, có giá trị lớn hơn.
:::

::: hint Gợi ý 1
Giải $v=\max\{2;\ 1+v/2\}$ và kiểm tra cả hai nhánh tại ứng viên.
:::

::: hint Gợi ý 2
Tính duy nhất của giá trị đến từ tính co (Mệnh đề 13.16); so sánh với chính sách phụ thuộc lịch sử nằm ở Bước 2 của chứng minh Định lý 13.19.
:::

::: solution Lời giải Bài tập 13.9
Theo (6.1), $Q_V(h,A)=2+\tfrac12V(z)=2$ và $Q_V(h,B)=1+\tfrac12v$, nên $Tv=\max\{2;\ 1+v/2\}$. Tại $v=2$, cả hai nhánh bằng $2$, nên $v=2$ là điểm bất động. Theo Mệnh đề 13.16, $T$ co với hệ số $1/2$, nên điểm bất động là duy nhất (Hệ quả 13.18).

Theo Định lý 13.19, $V^*(h)=2$, và mọi chính sách tham lam theo $V^*$ là tối ưu; ở đây cả $A$ và $B$ đều đạt cực đại, nên cả hai chính sách tất định dừng đều tối ưu. Bước 2 của chứng minh Định lý 13.19, dựa trên Bổ đề 13.11, so sánh với mọi chính sách tổng quát, nên không chính sách phụ thuộc lịch sử nào vượt $2$.

**Kiểm tra lại.** Giá trị $2$ trùng $V^A(h)=V^B(h)=2$ ở Bài tập 13.8. Giá trị tối ưu duy nhất, nhưng chính sách tối ưu không duy nhất.
:::

### Bài tập 13.10 (Tính co và phần dư Bellman)

**Mức độ:** chứng minh, tính toán. **Mục tiêu:** mục tiêu học tập 4; chứng minh tính co trong một trường hợp cụ thể và đọc chặn phần dư.

::: exercise Bài tập 13.10
Cho một MDP hữu hạn với $\gamma=0{,}8$, phần thưởng bị chặn và các hàng xác suất chuyển chuẩn hóa.

**(a)** Chứng minh $\lVert TV-TW\rVert_\infty\le0{,}8\,\lVert V-W\rVert_\infty$.

**(b)** Một vector $V$ có phần dư Bellman chính xác $\beta(V)=\lVert TV-V\rVert_\infty=0{,}02$. Chặn sai số của $V$ và của $TV$ so với $V^*$.

**(c)** Chặn mất mát giá trị của chính sách tham lam theo $V$.
:::

::: hint Gợi ý 1
Chặn sai khác của từng giá trị nhìn trước, rồi dùng Bổ đề 13.15. Phần (b) và (c) dùng Hệ quả 13.21 và Mệnh đề 13.22.
:::

::: hint Gợi ý 2
Phần (b): thay $\beta(V)=0{,}02$, $\gamma=0{,}8$ vào (6.10). Phần (c): dùng chặn $\lVert V-V^*\rVert_\infty\le0{,}1$ của phần (b) trong (6.11).
:::

::: solution Lời giải Bài tập 13.10
**(a)** Với mọi $s,a$, phần thưởng triệt tiêu khi lấy hiệu và
$$
\begin{aligned}
&\lvert Q_V(s,a)-Q_W(s,a)\rvert\\
&\quad\le0{,}8\sum_{s'}P(s'\mid s,a)\\
&\qquad\quad\cdot\lvert V(s')-W(s')\rvert\\
&\quad\le0{,}8\,\lVert V-W\rVert_\infty.
\end{aligned}
$$
Bổ đề 13.15 cho $\lvert(TV)(s)-(TW)(s)\rvert\le\max_a\lvert Q_V(s,a)-Q_W(s,a)\rvert\le0{,}8\,\lVert V-W\rVert_\infty$; lấy cực đại theo $s$ được kết luận.

**(b)** Theo (6.10), $\lVert V-V^*\rVert_\infty\le0{,}02/(1-0{,}8)=0{,}1$ và $\lVert TV-V^*\rVert_\infty\le0{,}8\cdot0{,}02/0{,}2=0{,}08$.

**(c)** Theo (6.11) với $\lVert V-V^*\rVert_\infty\le0{,}1$,
$$
\begin{aligned}
\lVert V^{\pi_V}-V^*\rVert_\infty&\le\frac{2\cdot0{,}8}{0{,}2}\cdot0{,}1\\
&=0{,}8.
\end{aligned}
$$

**Kiểm tra lại.** Chặn của $TV$ nhỏ hơn chặn của $V$ đúng hệ số $\gamma=0{,}8$. Các chặn này nói về mô hình đang dùng, không về một hệ thống thật có thể khác mô hình.
:::

### Bài tập 13.11 (Kiểm tra một khẳng định hội tụ)

**Mức độ:** kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 6; tách điều phần dư chứng nhận khỏi điều nó không chứng nhận.

::: exercise Bài tập 13.11
Một hệ thống có hai trạng thái $h$, $z$; $z$ hấp thụ với thưởng $0$; tại $h$ có hai hành động $A$, $B$; $\gamma=0{,}9$. Nhật ký chỉ chứa các lần dùng $A$; hành động $B$ chưa được thử. Nhóm phát triển tự đặt hàng chuyển của $B$, ước lượng hàng của $A$ từ nhật ký, chạy lặp giá trị đến khi phần dư bằng $10^{-6}$, rồi kết luận chính sách tham lam là tối ưu trong môi trường thật. Xác định điều được phần dư chứng nhận và ít nhất hai điều chưa được chứng nhận.
:::

::: hint Gợi ý 1
Áp dụng Hệ quả 13.21 và Mệnh đề 13.22 cho đúng toán tử đã tính. Kiểm tra nguồn gốc của từng hàng chuyển và giả thiết trạng thái đủ thông tin.
:::

::: hint Gợi ý 2
Phần dư $10^{-6}$ với $\gamma=0{,}9$ cho chặn $10^{-6}/0{,}1$ trong mô hình đã đặt; hàng của $B$ có $N(h,B)=0$, nên Hệ quả 13.26 với $m=0$ không xác định được hàng đó.
:::

::: solution Lời giải Bài tập 13.11
**Điều được chứng nhận.** Với toán tử $\hat T$ của mô hình đã đặt, Hệ quả 13.21 cho vector $V$ cách điểm bất động của $\hat T$ không quá $10^{-6}/(1-0{,}9)=10^{-5}$. Mệnh đề 13.22 cho chính sách tham lam mất không quá $2\cdot0{,}9\cdot10^{-5}/0{,}1=1{,}8\cdot10^{-4}$ so với tối ưu, cũng chỉ trong mô hình đã đặt.

**Điều chưa được chứng nhận.**

- Hàng chuyển của $B$ đúng với môi trường thật: không có dữ liệu nào cho hàng này (Hệ quả 13.26 với $m=0$).
- Hàng của $A$ được ước lượng đủ chính xác: số lần thử hữu hạn có thể cho ước lượng lệch, như Tình huống 13.1.
- Trạng thái $\{h,z\}$ thỏa tính Markov cho hệ thống thật.
- Chính sách tốt trong môi trường thật: điều này cần cả ba điều trên.

**Kiểm tra lại.** Tính co của $\hat T$ đúng với mọi bảng chuyển chuẩn hóa, kể cả bảng tự đặt; vì vậy hội tụ của phép lặp không nói gì về độ đúng của bảng.
:::
