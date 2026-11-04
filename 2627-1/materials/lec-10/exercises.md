# Bài tập Bài 10 — Xác suất: ngôn ngữ biểu diễn bất định trong AI

Các bài tập dưới đây đi kèm ghi chú Bài 10 và dẫn định nghĩa, mệnh đề, ví dụ theo số hiệu của ghi chú. Ký hiệu theo bảng ký hiệu của ghi chú: $\mathbb P$ là xác suất, $H$ và $C$ là biến cố có người và có cảnh báo của camera, $S$, $Y$, $A$ là nhà cung cấp, biến chỉ thị lỗi và biến chỉ thị cảnh báo của hệ thống sản phẩm. Số thập phân dùng dấu phẩy. Ba bài trên lớp kiểm tra cách đọc điều kiện, mật độ và độc lập có điều kiện; sáu bài tự học đi qua các phép tính của cả bài. Bài tập 10.4 và Bài tập 10.6–10.8 được điều chỉnh từ bộ bài tập tuần 1 của học phần; Bài tập 10.10–10.12 chọn từ mục bài tập chương 2 và chương 3 của Murphy (2022), *Probabilistic Machine Learning: An Introduction*, phát biểu lại theo ký hiệu của học phần.

## Bài tập trên lớp

### Bài tập 10.1 (Đọc điều kiện trên bảng camera)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 2; phân biệt xác suất đồng thời, xác suất có điều kiện và phép đảo điều kiện (Định nghĩa 10.9).

::: exercise Bài tập 10.1
Một camera đặt ở một tuyến đường vắng. Gọi $H$ là biến cố có người đi bộ trong khung hình và $C$ là biến cố hệ thống cảnh báo. Bảng xác suất đồng thời là

| | $C$ | $C^c$ |
|---|---:|---:|
| $H$ | $0{,}09$ | $0{,}01$ |
| $H^c$ | $0{,}18$ | $0{,}72$ |

- (a) Tính $\mathbb P(C\mid H)$, $\mathbb P(C\mid H^c)$ và $\mathbb P(H\mid C)$.
- (b) Giải thích bằng lời sự khác nhau giữa $\mathbb P(H^c\cap C)$ và $\mathbb P(C\mid H^c)$.
- (c) Một người diễn giải "hệ thống phát hiện được $90\%$ khung hình có người" thành "$90\%$ cảnh báo ứng với khung hình có người". Kiểm tra phát biểu này bằng bảng.
:::

::: hint Gợi ý 1
Mẫu số của mỗi xác suất có điều kiện là xác suất của biến cố đứng sau dấu "$\mid$". Tổng một hàng cho $\mathbb P(H)$ hoặc $\mathbb P(H^c)$; tổng một cột cho $\mathbb P(C)$.
:::

::: hint Gợi ý 2
Ở câu (c), "$90\%$ khung hình có người được phát hiện" là $\mathbb P(C\mid H)$, còn "$90\%$ cảnh báo ứng với khung hình có người" là $\mathbb P(H\mid C)$.
:::

::: solution Lời giải Bài tập 10.1
**Các mẫu số.** Tổng các ô cho $\mathbb P(H)=0{,}09+0{,}01=0{,}10$, $\mathbb P(H^c)=0{,}18+0{,}72=0{,}90$ và $\mathbb P(C)=0{,}09+0{,}18=0{,}27$. Cả ba đều dương.

**(a)** Theo Định nghĩa 10.9,

$$
\begin{aligned}
\mathbb P(C\mid H)&=\frac{0{,}09}{0{,}10}=0{,}90,\\
\mathbb P(C\mid H^c)&=\frac{0{,}18}{0{,}90}=0{,}20,\\
\mathbb P(H\mid C)&=\frac{0{,}09}{0{,}27}=\frac13\approx0{,}3333.
\end{aligned}
$$

**(b)** $\mathbb P(H^c\cap C)=0{,}18$ là tỉ lệ khung hình vừa không có người vừa bị cảnh báo, tính trên mọi khung hình. $\mathbb P(C\mid H^c)=0{,}20$ là tỉ lệ khung hình bị cảnh báo, tính trong nhóm khung hình không có người.

**(c)** Phát biểu sai vì nó đảo điều kiện: $\mathbb P(C\mid H)=0{,}90$ nhưng $\mathbb P(H\mid C)=1/3$. Trên tuyến đường vắng, khung hình có người chỉ chiếm $10\%$, nên các cảnh báo nhầm trên $90\%$ khung hình không có người lấn át các cảnh báo đúng. Nhầm lẫn này còn được gọi là ngụy biện của công tố viên (prosecutor's fallacy, Murphy (2022), Bài tập 2.10).

**Kiểm tra lại.** $\mathbb P(H^c\mid C)=0{,}18/0{,}27=2/3$, và $1/3+2/3=1$. Trên $100$ khung hình có $10$ khung hình có người, $9$ trong số đó bị cảnh báo; có $90$ khung hình không có người, $18$ trong số đó bị cảnh báo; tỉ lệ có người trong $27$ cảnh báo là $9/27=1/3$.
:::

### Bài tập 10.2 (Mật độ đều và xác suất trên khoảng)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; phân biệt giá trị mật độ với xác suất (Định nghĩa 10.18).

::: exercise Bài tập 10.2
Thời gian xử lý $T$ của một yêu cầu, tính bằng giây, có phân phối đều trên $[0;\,0{,}5]$: mật độ $f_T(t)=2$ khi $0\le t\le0{,}5$ và $f_T(t)=0$ ngoài đoạn này.

- (a) Kiểm tra $f_T$ là một mật độ, dù giá trị của nó lớn hơn $1$.
- (b) Tính $\mathbb P(T=0{,}2)$ và $\mathbb P(0{,}1\le T\le0{,}3)$.
- (c) Viết hàm phân phối tích lũy $F_T(t)$ trên toàn trục số. Nêu đơn vị đo của mật độ.
:::

::: hint Gợi ý 1
Xác suất trên một khoảng là diện tích dưới đồ thị mật độ trên khoảng đó.
:::

::: hint Gợi ý 2
Khoảng ở câu (b) dài $0{,}2$ giây; một điểm có độ dài $0$. Ở câu (c), xét ba trường hợp $t<0$, $0\le t\le0{,}5$, $t>0{,}5$.
:::

::: solution Lời giải Bài tập 10.2
**(a)** $f_T\ge0$ và $\int_{\mathbb R}f_T(t)\,dt=\int_0^{0{,}5}2\,dt=2\cdot0{,}5=1$. Giá trị $2>1$ không mâu thuẫn, vì mật độ không phải xác suất.

**(b)** Theo (6.7), $\mathbb P(T=0{,}2)=\int_{\{0{,}2\}}f_T=0$. Trên khoảng,

$$
\begin{aligned}
\mathbb P(0{,}1\le T\le0{,}3)&=\int_{0{,}1}^{0{,}3}2\,dt\\
&=2\cdot0{,}2=0{,}4.
\end{aligned}
$$

**(c)** Tích phân $f_T$ từ $-\infty$ đến $t$ theo (6.8):

$$
F_T(t)=\begin{cases}
0,&t<0,\\
2t,&0\le t\le0{,}5,\\
1,&t>0{,}5.
\end{cases}
$$

Mật độ có đơn vị là nghịch đảo của giây; tích phân của nó theo thời gian là một xác suất, không có đơn vị. Giá trị $f_T(0{,}2)=2$ không phải xác suất tại điểm $0{,}2$.

**Kiểm tra lại.** $F_T(0{,}3)-F_T(0{,}1)=0{,}6-0{,}2=0{,}4$, khớp câu (b); vì $\mathbb P(T=0{,}1)=0$, việc tính hay không tính đầu mút không đổi kết quả.
:::

### Bài tập 10.3 (Độc lập trước và sau khi quan sát)

**Mức độ:** kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 2; kiểm tra độc lập có điều kiện trên một phân phối cụ thể (Định nghĩa 10.13, Định nghĩa 10.16, Mệnh đề 10.17).

::: exercise Bài tập 10.3
Một dây chuyền có hai bộ phận hoạt động độc lập. Đặt $U=1$ khi bộ phận thứ nhất hoạt động và $V=1$ khi bộ phận thứ hai hoạt động; mỗi biến nhận $0$ hoặc $1$ với xác suất $1/2$, và $U\perp V$. Dây chuyền chạy được khi và chỉ khi cả hai bộ phận hoạt động, tức $W=U\cdot V$.

- (a) Liệt kê bốn kết quả $(U,V,W)$ cùng xác suất của chúng.
- (b) Tính $\mathbb P(U=1\mid W=0)$, $\mathbb P(V=1\mid W=0)$ và $\mathbb P(U=1,V=1\mid W=0)$.
- (c) Kiểm tra $U$ và $V$ còn độc lập khi biết $W=0$ hay không. Nêu hệ quả khi chẩn đoán nguyên nhân dây chuyền dừng: biết bộ phận thứ nhất vẫn hoạt động thì suy ra được gì về bộ phận thứ hai?
:::

::: hint Gợi ý 1
Vì $U,V$ độc lập và cân đối, bốn cặp $(U,V)$ có cùng xác suất $1/4$; $W$ được xác định bởi cặp đó.
:::

::: hint Gợi ý 2
Điều kiện $W=0$ giữ lại ba kết quả, trừ $(1,1,1)$. Kiểm tra (6.5) trên phân phối đã chuẩn hóa trong nhóm này.
:::

::: solution Lời giải Bài tập 10.3
**(a)** Bốn kết quả $(0,0,0)$, $(0,1,0)$, $(1,0,0)$, $(1,1,1)$, mỗi kết quả có xác suất $1/4$. Do đó $\mathbb P(W=0)=3/4$.

**(b)** Trong nhóm $W=0$ còn ba kết quả $(0,0,0)$, $(0,1,0)$, $(1,0,0)$. Theo Định nghĩa 10.9,

$$
\begin{aligned}
&\mathbb P(U=1\mid W=0)\\
&\quad=\frac{\mathbb P(U=1,W=0)}{\mathbb P(W=0)}\\
&\quad=\frac{1/4}{3/4}=\frac13,\\
&\mathbb P(V=1\mid W=0)=\frac{1/4}{3/4}=\frac13,\\
&\mathbb P(U=1,V=1\mid W=0)\\
&\quad=\frac{0}{3/4}=0.
\end{aligned}
$$

**(c)** Ta có

$$
\begin{aligned}
&\mathbb P(U=1,V=1\mid W=0)=0\\
&\quad\ne\frac13\cdot\frac13\\
&\quad=\mathbb P(U=1\mid W=0)\\
&\qquad\times\mathbb P(V=1\mid W=0),
\end{aligned}
$$

nên (6.5) sai tại $u=v=1$, $w=0$, và $U,V$ phụ thuộc khi biết $W$. Trước quan sát, biết $U$ không cho thông tin về $V$. Khi đã biết dây chuyền dừng ($W=0$), biết bộ phận thứ nhất vẫn hoạt động ($U=1$) thì suy ra chắc chắn bộ phận thứ hai hỏng ($V=0$). Trong AI, hai nguyên nhân độc lập trở nên phụ thuộc khi ta quan sát một hệ quả chung của chúng.

**Kiểm tra lại.** Trong nhóm $W=0$, ba kết quả có xác suất có điều kiện $1/3$ mỗi kết quả, tổng bằng $1$. Theo Mệnh đề 10.17, với $\mathbb P(U=1,W=0)=1/4>0$: $\mathbb P(V=1\mid U=1,W=0)=0\ne1/3=\mathbb P(V=1\mid W=0)$, cùng kết luận.
:::

## Bài tập tự học

### Bài tập 10.4 (Không gian mẫu đều với hai xúc xắc)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1; dùng quy tắc phần bù và quy tắc hợp (Mệnh đề 10.6) và nhận ra khi nào công thức đếm (4.7) dùng được.

::: exercise Bài tập 10.4
Gieo hai xúc xắc cân đối, phân biệt viên thứ nhất và viên thứ hai. Giả sử cả $36$ cặp kết quả có cùng xác suất.

- (a) Viết không gian mẫu bằng tích Descartes và nêu số phần tử.
- (b) Đặt $E$ là biến cố "ít nhất một viên ra mặt $6$". Viết $E^c$ và tính $\mathbb P(E)$ bằng quy tắc phần bù.
- (c) Đặt $F$ là biến cố "tổng hai viên bằng $7$". Tìm $|F|$, $|E\cap F|$ và $\mathbb P(E\cup F)$.
- (d) Có thể dùng công thức $|E|/|\Omega|$ khi không giả thiết các cặp đồng xác suất hay không? Giải thích.
:::

::: hint Gợi ý 1
Ở (b), $E^c$ gồm các cặp mà cả hai mặt đều thuộc $\{1,2,3,4,5\}$.
:::

::: hint Gợi ý 2
Ở (c), liệt kê sáu cặp có tổng bằng $7$, rồi xác định cặp nào chứa mặt $6$.
:::

::: solution Lời giải Bài tập 10.4
**(a)** $\Omega=\{1,\ldots,6\}\times\{1,\ldots,6\}$, nên $|\Omega|=6\cdot6=36$.

**(b)** $E^c=\{1,\ldots,5\}\times\{1,\ldots,5\}$ có $25$ phần tử. Theo (4.7) và (4.8), $\mathbb P(E)=1-25/36=11/36$.

**(c)** $F=\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\}$, nên $|F|=6$. Giao $E\cap F=\{(1,6),(6,1)\}$ có $2$ phần tử. Theo (4.9),

$$
\begin{aligned}
\mathbb P(E\cup F)&=\frac{11}{36}+\frac6{36}-\frac2{36}\\
&=\frac{15}{36}=\frac5{12}.
\end{aligned}
$$

**(d)** Không. Công thức (4.7) cần giả thiết các kết quả sơ cấp đồng xác suất; nếu không, phải cộng trọng số của từng kết quả trong biến cố theo (4.6).

**Kiểm tra lại.** Đếm trực tiếp: $E\cup F$ có $11+6-2=15$ cặp, đúng với $15/36=5/12$.
:::

### Bài tập 10.5 (Xác suất lỗi của camera dưới quy trình lấy mẫu khác)

**Mức độ:** tính toán, kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 1, 6; tính xác suất phản hồi sai từ bảng (Mệnh đề 10.5, Mệnh đề 10.6) và phân biệt thay đổi bộ phát hiện với thay đổi phân phối đầu vào.

::: exercise Bài tập 10.5
Camera và bộ phát hiện như trong Ví dụ 10.2, với không gian mẫu $\{(\mathrm P,\mathrm A),(\mathrm P,\mathrm Q),(\mathrm N,\mathrm A),(\mathrm N,\mathrm Q)\}$ ($\mathrm P$: có người, $\mathrm N$: không có người, $\mathrm A$: cảnh báo, $\mathrm Q$: không cảnh báo). Ví dụ 10.2 có các trọng số $0{,}18$; $0{,}02$; $0{,}08$; $0{,}72$. Một quy trình lấy khung hình khác cho

$$
\begin{aligned}
p(\mathrm P,\mathrm A)&=0{,}27,\\
p(\mathrm P,\mathrm Q)&=0{,}03,\\
p(\mathrm N,\mathrm A)&=0{,}07,\\
p(\mathrm N,\mathrm Q)&=0{,}63.
\end{aligned}
$$

- (a) Kiểm tra bảng trọng số mới là một mô hình xác suất hợp lệ.
- (b) Tính xác suất có người $\mathbb P(H)$, xác suất cảnh báo $\mathbb P(C)$ và xác suất hệ thống phản hồi sai.
- (c) Tính $\mathbb P(H\cup C)$ bằng hai cách: công thức hợp và phần bù.
- (d) So sánh xác suất cảnh báo sai đồng thời $\mathbb P(H^c\cap C)$ với Ví dụ 10.2. Chỉ từ hai bảng này, có thể kết luận bộ phát hiện đã tốt hơn hay không?
:::

::: hint Gợi ý 1
Ở (b), phản hồi sai gồm hai biến cố xung khắc: cảnh báo sai và bỏ sót.
:::

::: hint Gợi ý 2
Ở (d), tính thêm $\mathbb P(C\mid H^c)$ và $\mathbb P(C\mid H)$ cho cả hai bảng; đó là các đại lượng mô tả bộ phát hiện trong từng nhóm khung hình.
:::

::: solution Lời giải Bài tập 10.5
**(a)** Mọi trọng số không âm và $0{,}27+0{,}03+0{,}07+0{,}63=1$, nên theo Mệnh đề 10.5 bảng hợp lệ.

**(b)** Theo (4.6), $\mathbb P(H)=0{,}27+0{,}03=0{,}30$ và $\mathbb P(C)=0{,}27+0{,}07=0{,}34$. Phản hồi sai có xác suất $0{,}07+0{,}03=0{,}10$.

**(c)** $\mathbb P(H\cap C)=0{,}27$, nên (4.9) cho $\mathbb P(H\cup C)=0{,}30+0{,}34-0{,}27=0{,}37$. Phần bù: $(H\cup C)^c=\{(\mathrm N,\mathrm Q)\}$, nên $\mathbb P(H\cup C)=1-0{,}63=0{,}37$.

**(d)** Xác suất cảnh báo sai đồng thời giảm từ $0{,}08$ xuống $0{,}07$. Tuy nhiên, các xác suất có điều kiện của bộ phát hiện là

$$
\begin{aligned}
&\text{Ví dụ 10.2:}\\
&\quad\mathbb P(C\mid H)=\tfrac{0{,}18}{0{,}20}=0{,}9,\\
&\quad\mathbb P(C\mid H^c)=\tfrac{0{,}08}{0{,}80}=0{,}1;\\
&\text{bảng mới:}\\
&\quad\mathbb P(C\mid H)=\tfrac{0{,}27}{0{,}30}=0{,}9,\\
&\quad\mathbb P(C\mid H^c)=\tfrac{0{,}07}{0{,}70}=0{,}1.
\end{aligned}
$$

Bộ phát hiện có cùng đặc tính trong cả hai bảng; chỉ tỉ lệ khung hình có người tăng từ $0{,}20$ lên $0{,}30$. Vì vậy không thể kết luận bộ phát hiện đã tốt hơn: con số đồng thời thay đổi do phân phối đầu vào thay đổi.

**Kiểm tra lại.** Xác suất phản hồi đúng là $0{,}27+0{,}63=0{,}90$, cộng với $0{,}10$ bằng $1$.
:::

### Bài tập 10.6 (Bayes trong kiểm định sản phẩm)

**Mức độ:** tính toán, kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 2, 5, 6; tính tiên nghiệm, hậu nghiệm và nhận ra vai trò của giả thiết độc lập có điều kiện (Định lý 10.11, Mệnh đề 10.34).

::: exercise Bài tập 10.6
Nhà cung cấp $a$ giao $80\%$ sản phẩm với tỉ lệ lỗi $1\%$; nhà cung cấp $b$ giao $20\%$ với tỉ lệ lỗi $6\%$. Một sản phẩm được chọn ngẫu nhiên theo các tỉ lệ này. Gọi $S$ là nhà cung cấp, $Y=1$ là sản phẩm lỗi và $A=1$ là cảm biến cảnh báo. Cảm biến có $\mathbb P(A=1\mid Y=1)=0{,}9$, $\mathbb P(A=1\mid Y=0)=0{,}05$, và $A\perp S\mid Y$.

- (a) Tính $\mathbb P(Y=1)$ và $\mathbb P(S=b\mid Y=1)$. Giải thích vì sao đại lượng thứ hai khác $\mathbb P(Y=1\mid S=b)$.
- (b) Tính $\mathbb P(A=1)$ và $\mathbb P(Y=1\mid A=1)$.
- (c) Tính $\mathbb P(S=b\mid A=1)$ và $\mathbb P(S=b\mid Y=1,A=1)$.
- (d) Nếu bỏ giả thiết $A\perp S\mid Y$ nhưng giữ mọi số liệu khác, đại lượng $\mathbb P(S=b\mid A=1)$ của câu (c) có còn được xác định hay không? Giải thích bằng một ví dụ cụ thể.
:::

::: hint Gợi ý 1
Ở (c), lấy biên theo $Y$: $\mathbb P(S=b,A=1)=\sum_y\mathbb P(S=b)\,\mathbb P(Y=y\mid S=b)\,\mathbb P(A=1\mid Y=y)$, theo (8.7).
:::

::: hint Gợi ý 2
Ở (d), số liệu chỉ cho $\mathbb P(A=1\mid Y=y)$ gộp trên hai nhà cung cấp. Thử giữ $\mathbb P(A=1\mid Y=1,S=s)=0{,}9$ cho cả hai $s$, đặt $\mathbb P(A=1\mid Y=0,S=b)=0$, rồi chọn $\mathbb P(A=1\mid Y=0,S=a)$ sao cho tỉ lệ cảnh báo nhầm gộp vẫn bằng $0{,}05$.
:::

::: solution Lời giải Bài tập 10.6
**(a)** Công thức toàn phần (5.3) và Bayes (5.4) cho

$$
\begin{aligned}
&\mathbb P(Y=1)=0{,}8\cdot0{,}01+0{,}2\cdot0{,}06\\
&\quad=0{,}008+0{,}012=0{,}02,\\
&\mathbb P(S=b\mid Y=1)=\frac{0{,}2\cdot0{,}06}{0{,}02}\\
&\quad=\frac{0{,}012}{0{,}02}=0{,}6.
\end{aligned}
$$

Tỉ lệ $0{,}06=\mathbb P(Y=1\mid S=b)$ tính trong hàng của $b$, còn $0{,}6$ tính trong tất cả sản phẩm lỗi. Hai đại lượng có mẫu số khác nhau.

**(b)** Lấy biên theo $Y$:

$$
\begin{aligned}
&\mathbb P(A=1)=0{,}9\cdot0{,}02+0{,}05\cdot0{,}98\\
&\quad=0{,}018+0{,}049=0{,}067,\\
&\mathbb P(Y=1\mid A=1)=\frac{0{,}018}{0{,}067}\\
&\quad=\frac{18}{67}\approx0{,}2687.
\end{aligned}
$$

Cảnh báo làm xác suất lỗi tăng từ $0{,}02$ lên khoảng $0{,}2687$, nhưng chưa xác nhận chắc chắn sản phẩm lỗi.

**(c)** Theo (8.7) và lấy biên theo $Y$,

$$
\begin{aligned}
&\mathbb P(S=b,A=1)\\
&\quad=0{,}2\bigl(0{,}06\cdot0{,}9\\
&\qquad+0{,}94\cdot0{,}05\bigr)\\
&\quad=0{,}2\cdot0{,}101=0{,}0202,\\
&\mathbb P(S=b\mid A=1)=\frac{0{,}0202}{0{,}067}\\
&\quad=\frac{101}{335}\approx0{,}3015.
\end{aligned}
$$

Khi đã biết sản phẩm lỗi, cảnh báo không cho thêm thông tin về nhà cung cấp dưới giả thiết $A\perp S\mid Y$:

$$
\begin{aligned}
&\mathbb P(S=b\mid Y=1,A=1)\\
&\quad=\frac{0{,}2\cdot0{,}06\cdot0{,}9}{0{,}02\cdot0{,}9}=0{,}6\\
&\quad=\mathbb P(S=b\mid Y=1).
\end{aligned}
$$

**(d)** Không. Xét mô hình thứ hai với cùng $\mathbb P(S=s)$, cùng $\mathbb P(Y=1\mid S=s)$, nhưng

$$
\begin{aligned}
&\mathbb P(A=1\mid Y=1,S=a)=0{,}9,\\
&\mathbb P(A=1\mid Y=1,S=b)=0{,}9,\\
&\mathbb P(A=1\mid Y=0,S=b)=0,\\
&\mathbb P(A=1\mid Y=0,S=a)=\eta.
\end{aligned}
$$

Tỉ lệ cảnh báo nhầm gộp là $\mathbb P(A=1\mid Y=0)=\eta\,\mathbb P(S=a,Y=0)/\mathbb P(Y=0)=\eta\cdot0{,}792/0{,}98$. Đặt nó bằng $0{,}05$ được $\eta=0{,}049/0{,}792=49/792\approx0{,}0619$. Mô hình này khớp mọi số liệu đã cho, kể cả $\mathbb P(A=1)=0{,}9\cdot0{,}02+0{,}05\cdot0{,}98=0{,}067$, nhưng

$$
\begin{aligned}
&\mathbb P(S=b,A=1)\\
&\quad=0{,}2\cdot0{,}06\cdot0{,}9+0=0{,}0108,\\
&\mathbb P(S=b\mid A=1)=\frac{0{,}0108}{0{,}067}\\
&\quad=\frac{54}{335}\approx0{,}1612\\
&\quad\ne\frac{101}{335}.
\end{aligned}
$$

Hai mô hình cùng thỏa dữ kiện cho hai giá trị khác nhau, nên khi bỏ giả thiết, dữ kiện không xác định được $\mathbb P(S=b\mid A=1)$; cần biết $\mathbb P(A=1\mid Y=y,S=s)$ trong từng nhóm.

**Kiểm tra lại.** Ở mô hình gốc, xác suất cảnh báo từ $a$ là $0{,}8(0{,}01\cdot0{,}9+0{,}99\cdot0{,}05)=0{,}8\cdot0{,}0585=0{,}0468$; cộng với $0{,}0202$ được $0{,}067$. Ở mô hình thứ hai, $0{,}792\cdot\tfrac{49}{792}=0{,}049=0{,}05\cdot0{,}98$.
:::

### Bài tập 10.7 (Phân phối rời rạc ba giá trị)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3, 4; tính kỳ vọng, phương sai, CDF và phân phối của một hàm của biến rời rạc (Định nghĩa 10.15, Mệnh đề 10.22, Mệnh đề 10.24).

::: exercise Bài tập 10.7
Biến $X$ nhận các giá trị $-1$; $0$; $2$ với xác suất lần lượt $1/4$; $1/2$; $1/4$.

- (a) Tính $\mathbb E[X]$, $\mathbb E[X^2]$ và $\operatorname{Var}(X)$.
- (b) Viết $F_X(t)$ trên toàn trục số; tính $\mathbb P(X\ge0)$ và $F_X(0)$.
- (c) Đặt $Z=X^2$. Tìm phân phối của $Z$ và dùng nó kiểm tra lại $\mathbb E[X^2]$.
- (d) Giải thích vì sao kỳ vọng không nhất thiết là một giá trị mà biến có thể nhận, và vì sao $F_X(0)$ khác $\mathbb P(X<0)$.
:::

::: hint Gợi ý 1
Tại một điểm có khối xác suất, $F_X$ tính cả khối tại điểm đó.
:::

::: hint Gợi ý 2
Ở (c), cộng xác suất của mọi giá trị $x$ có cùng ảnh $x^2$ (Bước 1 trong chứng minh Mệnh đề 10.22).
:::

::: solution Lời giải Bài tập 10.7
**(a)** Theo (7.1) và (7.3),

$$
\begin{aligned}
\mathbb E[X]&=-1\cdot\tfrac14+0\cdot\tfrac12+2\cdot\tfrac14\\
&=\tfrac14,\\
\mathbb E[X^2]&=1\cdot\tfrac14+0\cdot\tfrac12+4\cdot\tfrac14\\
&=\tfrac54,\\
\operatorname{Var}(X)&=\tfrac54-\bigl(\tfrac14\bigr)^2\\
&=\tfrac{20}{16}-\tfrac1{16}=\tfrac{19}{16}.
\end{aligned}
$$

**(b)** Cộng các khối xác suất đến $t$:

$$
F_X(t)=\begin{cases}
0,&t<-1,\\
1/4,&-1\le t<0,\\
3/4,&0\le t<2,\\
1,&t\ge2.
\end{cases}
$$

Do đó $\mathbb P(X\ge0)=1/2+1/4=3/4$ và $F_X(0)=1/4+1/2=3/4$.

**(c)** $Z$ nhận $0$ (khi $X=0$), $1$ (khi $X=-1$) và $4$ (khi $X=2$), với xác suất $1/2$; $1/4$; $1/4$. Theo (7.1), $\mathbb E[Z]=0\cdot\tfrac12+1\cdot\tfrac14+4\cdot\tfrac14=\tfrac54$, khớp $\mathbb E[X^2]$ ở câu (a).

**(d)** Kỳ vọng $1/4$ là trung bình có trọng số của $-1$, $0$, $2$, và không thuộc tập giá trị của $X$. $F_X(0)=\mathbb P(X\le0)$ tính cả khối $\mathbb P(X=0)=1/2$, còn $\mathbb P(X<0)=1/4$ không tính; hiệu của chúng là độ nhảy của $F_X$ tại $0$.

**Kiểm tra lại.** Tính phương sai theo định nghĩa (7.6):

$$
\begin{aligned}
&\tfrac14\bigl(-1-\tfrac14\bigr)^2+\tfrac12\bigl(0-\tfrac14\bigr)^2\\
&\quad+\tfrac14\bigl(2-\tfrac14\bigr)^2\\
&\quad=\tfrac{25}{64}+\tfrac{2}{64}+\tfrac{49}{64}\\
&\quad=\tfrac{76}{64}=\tfrac{19}{16}.
\end{aligned}
$$
:::

### Bài tập 10.8 (Phân phối đồng thời và lấy biên)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 4, 5; tính phân phối biên, phân phối có điều kiện, hiệp phương sai và kỳ vọng toàn phần từ một bảng (Mệnh đề 10.32, Mệnh đề 10.33, Định lý 10.29).

::: exercise Bài tập 10.8
Hai biến nhị phân $X,Y$ có bảng xác suất đồng thời

| | $Y=0$ | $Y=1$ |
|---|---:|---:|
| $X=0$ | $0{,}2$ | $0{,}3$ |
| $X=1$ | $0{,}1$ | $0{,}4$ |

- (a) Tìm hai phân phối biên và $\mathbb P(Y=1\mid X=1)$.
- (b) Tính $\mathbb E[X]$, $\mathbb E[Y]$, $\mathbb E[XY]$ và $\operatorname{Cov}(X,Y)$; kiểm tra độc lập bằng một ô của bảng.
- (c) Tính $\mathbb E[Y\mid X=0]$, $\mathbb E[Y\mid X=1]$ và kiểm tra công thức kỳ vọng toàn phần.
- (d) Diễn giải $X$ là nhóm sản phẩm và $Y$ là trạng thái lỗi. So sánh xác suất lỗi khi biết nhóm với xác suất lỗi khi chưa biết nhóm. Các phép tính có chứng minh nhóm gây ra lỗi hay không?
:::

::: hint Gợi ý 1
Với biến nhị phân, kỳ vọng bằng xác suất nhận giá trị $1$. Tích $XY$ chỉ khác $0$ ở ô $(1,1)$.
:::

::: hint Gợi ý 2
Ở (c), $\mathbb E[Y\mid X=x]=\mathbb P(Y=1\mid X=x)=p_{X,Y}(x,1)/p_X(x)$.
:::

::: solution Lời giải Bài tập 10.8
**(a)** Theo (8.3), cộng theo hàng được $p_X(0)=0{,}2+0{,}3=0{,}5$, $p_X(1)=0{,}1+0{,}4=0{,}5$; cộng theo cột được $p_Y(0)=0{,}3$, $p_Y(1)=0{,}7$. Theo (8.5), $\mathbb P(Y=1\mid X=1)=0{,}4/0{,}5=0{,}8$.

**(b)** $\mathbb E[X]=0{,}5$, $\mathbb E[Y]=0{,}7$ và $\mathbb E[XY]=\mathbb P(X=1,Y=1)=0{,}4$. Do đó

$$
\begin{aligned}
\operatorname{Cov}(X,Y)&=0{,}4-0{,}5\cdot0{,}7\\
&=0{,}4-0{,}35=0{,}05.
\end{aligned}
$$

Hai biến không độc lập: ô $(1,1)$ có $0{,}4\ne0{,}5\cdot0{,}7=0{,}35$.

**(c)** $\mathbb E[Y\mid X=0]=0{,}3/0{,}5=0{,}6$ và $\mathbb E[Y\mid X=1]=0{,}8$. Theo (7.13),

$$
\begin{aligned}
\mathbb E\bigl[\mathbb E[Y\mid X]\bigr]&=0{,}5\cdot0{,}6+0{,}5\cdot0{,}8\\
&=0{,}7=\mathbb E[Y].
\end{aligned}
$$

**(d)** Khi chưa biết nhóm, xác suất lỗi là $0{,}7$; khi biết nhóm, nó là $0{,}6$ hoặc $0{,}8$. Bảng xác suất chỉ mô tả mức liên hệ giữa nhóm và lỗi. Nó không mô tả điều gì xảy ra khi ta can thiệp để đổi nhóm của một sản phẩm, và không loại trừ một yếu tố chung tác động lên cả hai, nên không chứng minh quan hệ nhân quả (Murphy (2022), §3.1.4).

**Kiểm tra lại.** Hai phân phối biên đều có tổng $1$; hiệp phương sai dương khớp với $\mathbb P(Y=1\mid X=1)=0{,}8>0{,}7=\mathbb P(Y=1)$.
:::

### Bài tập 10.9 (Hiệp phương sai bằng không nhưng phụ thuộc)

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 4; dựng phản ví dụ cho chiều ngược của Mệnh đề 10.27 và nêu hệ quả cho chọn đặc trưng.

::: exercise Bài tập 10.9
Biến $X$ phân phối đều trên $\{-2;-1;1;2\}$ và $Z=X^2$.

- (a) Tìm phân phối của $Z$; tính $\mathbb E[X]$, $\mathbb E[Z]$, $\mathbb E[XZ]$ và $\operatorname{Cov}(X,Z)$.
- (b) Chứng minh $X$ và $Z$ phụ thuộc bằng cách so sánh $\mathbb P(Z=4\mid X=2)$ với $\mathbb P(Z=4)$.
- (c) Tính hai phương sai để kiểm tra rằng hiệp phương sai bằng $0$ không do một biến hằng.
- (d) Một hệ thống chọn đặc trưng bỏ qua mọi cặp đặc trưng có hiệp phương sai bằng $0$ khi kiểm tra phụ thuộc. Phản ví dụ trên chỉ ra giới hạn nào của cách làm đó?
:::

::: hint Gợi ý 1
Dùng tính đối xứng của phân phối của $X$ để tính các mômen bậc lẻ.
:::

::: hint Gợi ý 2
Để chứng minh phụ thuộc, chỉ cần một điều kiện có xác suất dương làm đổi phân phối của $Z$.
:::

::: solution Lời giải Bài tập 10.9
**(a)** $Z$ nhận $1$ (khi $X=\pm1$) và $4$ (khi $X=\pm2$), mỗi giá trị với xác suất $1/2$. Vì phân phối của $X$ đối xứng quanh $0$,

$$
\begin{aligned}
\mathbb E[X]&=\tfrac14(-2-1+1+2)=0,\\
\mathbb E[XZ]&=\mathbb E[X^3]\\
&=\tfrac14(-8-1+1+8)=0,\\
\mathbb E[Z]&=\tfrac12\cdot1+\tfrac12\cdot4=\tfrac52.
\end{aligned}
$$

Do đó $\operatorname{Cov}(X,Z)=0-0\cdot\tfrac52=0$.

**(b)** Biến cố $\{X=2\}$ có xác suất $1/4>0$, và biết $X=2$ thì $Z=4$, nên $\mathbb P(Z=4\mid X=2)=1$. Trong khi đó $\mathbb P(Z=4)=1/2$. Điều kiện làm đổi xác suất, nên $X$ và $Z$ phụ thuộc.

**(c)** $\mathbb E[X^2]=\tfrac14(4+1+1+4)=\tfrac52$, nên $\operatorname{Var}(X)=\tfrac52$. $\mathbb E[Z^2]=\tfrac12(1+16)=\tfrac{17}2$, nên $\operatorname{Var}(Z)=\tfrac{17}2-\tfrac{25}4=\tfrac94$. Cả hai phương sai dương.

**(d)** Hiệp phương sai bằng $0$ ở đây đến từ sự triệt tiêu của các mômen bậc lẻ, dù $Z$ được xác định hoàn toàn bởi $X$. Một tiêu chí chỉ dựa trên hiệp phương sai bỏ sót các quan hệ phi tuyến giữa đặc trưng.

**Kiểm tra lại.** $\mathbb P(X=2,Z=4)=1/4$, khác tích hai xác suất biên $\tfrac14\cdot\tfrac12=\tfrac18$.
:::

## Bài tập chọn từ Murphy

### Bài tập 10.10 (Murphy (2022), Bài tập 2.9: chẩn đoán bệnh hiếm)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 2; áp dụng định lý Bayes khi tiên nghiệm rất nhỏ (Định lý 10.11).

::: exercise Bài tập 10.10
Một bệnh xuất hiện ở $1$ trong $10\,000$ người. Một xét nghiệm cho kết quả dương tính với xác suất $0{,}99$ ở người có bệnh và cho kết quả âm tính với xác suất $0{,}99$ ở người không có bệnh. Một người có kết quả dương tính. Tính xác suất người đó có bệnh.
:::

::: hint Gợi ý 1
Đặt $D$ là biến cố có bệnh và $R$ là biến cố dương tính; viết ra $\mathbb P(D)$, $\mathbb P(R\mid D)$, $\mathbb P(R\mid D^c)$.
:::

::: hint Gợi ý 2
$\mathbb P(R\mid D^c)=1-0{,}99=0{,}01$. Dùng (5.4) với phân hoạch $D$, $D^c$.
:::

::: solution Lời giải Bài tập 10.10
**Dữ kiện.** $\mathbb P(D)=0{,}0001$, $\mathbb P(D^c)=0{,}9999$, $\mathbb P(R\mid D)=0{,}99$, $\mathbb P(R\mid D^c)=0{,}01$.

**Xác suất dương tính.** Theo (5.3),

$$
\begin{aligned}
\mathbb P(R)&=0{,}99\cdot0{,}0001\\
&\quad+0{,}01\cdot0{,}9999\\
&=0{,}000099+0{,}009999\\
&=0{,}010098.
\end{aligned}
$$

**Hậu nghiệm.** Theo (5.4),

$$
\begin{aligned}
\mathbb P(D\mid R)&=\frac{0{,}000099}{0{,}010098}=\frac{99}{10\,098}\\
&=\frac1{102}\approx0{,}0098.
\end{aligned}
$$

Dù xét nghiệm đúng $99\%$ ở cả hai nhóm, người dương tính chỉ có khoảng $1\%$ khả năng mắc bệnh, vì tiên nghiệm $0{,}0001$ rất nhỏ.

**Kiểm tra lại.** Trên $1\,000\,000$ người: $100$ người có bệnh, $99$ người trong số đó dương tính; $999\,900$ người không có bệnh, $9999$ người trong số đó dương tính. Tỉ lệ có bệnh trong $10\,098$ người dương tính là $99/10\,098=1/102$.
:::

### Bài tập 10.11 (Murphy (2022), Bài tập 3.1: không tương quan với biến liên tục)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 4; dựng phản ví dụ cho chiều ngược của Mệnh đề 10.27 trong trường hợp có mật độ (Phụ lục B.2; Mệnh đề 10.22, Định nghĩa 10.16).

::: exercise Bài tập 10.11
Cho $X$ có phân phối đều trên $(-1,1)$, tức mật độ $f_X(x)=1/2$ khi $-1<x<1$ và bằng $0$ ở ngoài, và $Y=X^2$.

- (a) Tính $\mathbb E[X]$, $\mathbb E[XY]$ và $\operatorname{Cov}(X,Y)$.
- (b) Tính $\operatorname{Var}(X)$, $\operatorname{Var}(Y)$ và hệ số tương quan $\rho_{XY}$.
- (c) Chứng minh $X$ và $Y$ không độc lập bằng hai tập $B_1=[-\tfrac12,\tfrac12]$ và $B_2=(\tfrac14,\infty)$ trong (6.4).
:::

::: hint Gợi ý 1
Dùng (7.4) với $g(x)=x$, $x^2$, $x^3$, $x^4$; các tích phân của hàm lẻ trên $(-1,1)$ bằng $0$.
:::

::: hint Gợi ý 2
Ở (c), $\{X\in B_1\}$ và $\{Y\in B_2\}=\{|X|>\tfrac12\}$ không thể cùng xảy ra.
:::

::: solution Lời giải Bài tập 10.11
**(a)** Theo (7.4), $\mathbb E[X]=\int_{-1}^1\tfrac x2\,dx=0$ và $\mathbb E[XY]=\mathbb E[X^3]=\int_{-1}^1\tfrac{x^3}2\,dx=0$, vì hai hàm dưới dấu tích phân lẻ. Do đó $\operatorname{Cov}(X,Y)=0-0\cdot\mathbb E[Y]=0$.

**(b)** Ta có

$$
\begin{aligned}
\mathbb E[X^2]&=\int_{-1}^1\frac{x^2}{2}\,dx=\frac13,\\
\operatorname{Var}(X)&=\frac13-0=\frac13,\\
\mathbb E[Y^2]&=\mathbb E[X^4]=\int_{-1}^1\frac{x^4}{2}\,dx=\frac15,\\
\operatorname{Var}(Y)&=\frac15-\Bigl(\frac13\Bigr)^2=\frac4{45}.
\end{aligned}
$$

Hai phương sai dương, nên $\rho_{XY}=0/\sqrt{\tfrac13\cdot\tfrac4{45}}=0$.

**(c)** $\{Y>\tfrac14\}=\{|X|>\tfrac12\}$ rời với $\{|X|\le\tfrac12\}$, nên $\mathbb P(X\in B_1,Y\in B_2)=0$. Trong khi đó $\mathbb P(X\in B_1)=\int_{-1/2}^{1/2}\tfrac12\,dx=\tfrac12$ và $\mathbb P(Y\in B_2)=1-\tfrac12=\tfrac12$, tích bằng $\tfrac14\ne0$. Vậy (6.4) sai, và $X$, $Y$ phụ thuộc.

**Kiểm tra lại.** Đây là bản liên tục của Bài tập 10.9: $Y$ là một hàm chẵn của $X$, nên các mômen bậc lẻ triệt tiêu dù $Y$ được xác định hoàn toàn bởi $X$.
:::

### Bài tập 10.12 (Murphy (2022), Bài tập 3.2: hệ số tương quan thuộc $[-1,1]$)

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 4; chứng minh $-1\le\rho_{XZ}\le1$ bằng Mệnh đề 10.24 và Mệnh đề 10.26.

::: exercise Bài tập 10.12
Cho $X,Z$ có mômen bậc hai hữu hạn, $\operatorname{Var}(X)>0$, $\operatorname{Var}(Z)>0$. Chứng minh $-1\le\rho_{XZ}\le1$, với $\rho_{XZ}$ cho bởi (7.10).
:::

::: hint Gợi ý 1
Chuẩn hóa hai biến: $U=(X-\mu_X)/\sigma_X$, $V=(Z-\mu_Z)/\sigma_Z$ với $\sigma_X=\sqrt{\operatorname{Var}(X)}$, $\sigma_Z=\sqrt{\operatorname{Var}(Z)}$.
:::

::: hint Gợi ý 2
Phương sai không âm; áp dụng điều này cho $U+V$ và $U-V$.
:::

::: solution Lời giải Bài tập 10.12
**Bước 1 (chuẩn hóa).** Đặt $U$, $V$ như Gợi ý 1. Theo (7.7), $\operatorname{Var}(U)=\operatorname{Var}(X)/\sigma_X^2=1$ và $\operatorname{Var}(V)=1$. Vì $\mathbb E[U]=\mathbb E[V]=0$,

$$
\begin{aligned}
\operatorname{Cov}(U,V)&=\mathbb E[UV]\\
&=\frac{\mathbb E\bigl[(X-\mu_X)(Z-\mu_Z)\bigr]}{\sigma_X\sigma_Z}\\
&=\rho_{XZ},
\end{aligned}
$$

trong đó đẳng thức giữa dùng tính tuyến tính (7.5).

**Bước 2 (phương sai không âm).** Theo Mệnh đề 10.26 với $n=2$, áp dụng cho $U$ và $\pm V$ (với $\operatorname{Cov}(U,-V)=-\operatorname{Cov}(U,V)$ theo (7.5)), và Mệnh đề 10.24,

$$
\begin{aligned}
0&\le\operatorname{Var}(U\pm V)\\
&=1+1\pm2\rho_{XZ}\\
&=2(1\pm\rho_{XZ}).
\end{aligned}
$$

Dấu cộng cho $\rho_{XZ}\ge-1$; dấu trừ cho $\rho_{XZ}\le1$. $\square$

**Kiểm tra lại.** Với $Z=X$, $\rho_{XZ}=\operatorname{Var}(X)/\operatorname{Var}(X)=1$ và $\operatorname{Var}(U-V)=0$; với $Z=-X$, $\rho_{XZ}=-1$ và $\operatorname{Var}(U+V)=0$. Cận được đạt.
:::
