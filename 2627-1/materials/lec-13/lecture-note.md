# Bài 13 — Ra quyết định tuần tự dưới điều kiện bất định

Bài 07 giải bài toán quyết định hữu hạn tất định bằng phương trình Bellman (Định lý 07.49): với chi phí giai đoạn $g_k$, hàm chuyển $f_k$ và chi phí tối ưu còn lại $J_k$,
$$
\begin{aligned}
J_k(\xi)&=\min_{u\in U_k(\xi)}\bigl\{g_k(\xi,u)\\
&\qquad+J_{k+1}\bigl(f_k(\xi,u)\bigr)\bigr\},\\
J_N&=g_N.
\end{aligned}
$$
Khi trạng thái kế tiếp là ngẫu nhiên, vế phải cần một kỳ vọng theo trạng thái kế tiếp; khi số bước không giới hạn, không còn điều kiện cuối để truy hồi ngược, và giá trị cần tìm xuất hiện ở cả hai vế của phương trình. Bài 12 giả thiết dữ liệu i.i.d. theo một phân phối cố định; khi tác tử hành động, hành động hiện tại làm đổi phân phối của trạng thái kế tiếp, nên dữ liệu không còn i.i.d. Chúng ta mô hình hóa sự phụ thuộc đó bằng xác suất chuyển trạng thái có điều khiển. Câu hỏi trung tâm của bài là: **khi một hành động ảnh hưởng đến các trạng thái và phần thưởng trong tương lai, làm thế nào tìm chính sách tối ưu?**

## Câu hỏi mở đầu

Một robot ở trạng thái hoạt động $h$ chọn một trong hai hành động ở mỗi bước. Trạng thái $z$ là trạng thái dừng: robot ở lại $z$ mãi và không nhận thêm phần thưởng. Hai hành động tại $h$ là:

- hành động $A$: nhận thưởng $1$, sau đó robot còn hoạt động với xác suất $1/2$ và dừng với xác suất $1/2$;
- hành động $B$: nhận thưởng $0{,}6$, sau đó robot chắc chắn còn hoạt động.

Phần thưởng nhận ở bước thứ $t$ (tính từ $t=0$) được nhân với $0{,}9^t$, và robot muốn tổng thưởng có trọng số này lớn nhất theo kỳ vọng.

**Câu hỏi.** Robot nên chọn hành động nào tại $h$?

Nếu chỉ so phần thưởng của bước hiện tại thì $A$ tốt hơn, vì $1>0{,}6$. Lựa chọn này sai: sau mỗi lần chọn $A$, robot dừng với xác suất $1/2$ và mất mọi phần thưởng về sau. Tổng thưởng chiết khấu kỳ vọng khi luôn chọn $A$ bằng $20/11\approx1{,}82$, còn khi luôn chọn $B$ bằng $0{,}6/(1-0{,}9)=6$. Để trả lời trọn vẹn, chúng ta còn phải so sánh với mọi cách chọn khác, kể cả cách chọn thay đổi theo lịch sử, và tìm được cách chọn tốt nhất mà không liệt kê tất cả.

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Phát biểu tính Markov, lập ma trận chuyển và tính phân phối trạng thái sau nhiều bước.
2. Mô hình hóa một bài toán quyết định tuần tự thành một quá trình quyết định Markov hữu hạn: trạng thái, hành động, xác suất chuyển, phần thưởng, hệ số chiết khấu và chính sách.
3. Suy ra phương trình Bellman cho một chính sách cố định và phương trình Bellman tối ưu.
4. Chứng minh toán tử Bellman tối ưu là ánh xạ co, suy ra lặp giá trị hội tụ và chính sách tham lam theo điểm bất động là tối ưu.
5. Thực hiện lặp giá trị bằng tay và giải thích vì sao hành động có phần thưởng tức thời lớn nhất có thể không tối ưu.
6. Ước lượng xác suất chuyển từ số đếm, tính mục tiêu Bellman, và phân biệt quy hoạch khi biết mô hình với học tăng cường từ dữ liệu tương tác.

Các mục tiêu thuộc CLO2 (xây dựng mô hình học máy) và CLO4 (nhận dạng bài toán tối ưu trong AI) của đề cương học phần.

## Kiến thức tiên quyết

- **Quy hoạch động tất định.** Định nghĩa 07.46, 07.48 và Định lý 07.49: với trạng thái $\xi$, điều khiển $u$, hàm chuyển $f_k$ và chi phí $g_k$, chi phí tối ưu còn lại thỏa $J_k(\xi)=\min_u\{g_k(\xi,u)+J_{k+1}(f_k(\xi,u))\}$, $J_N=g_N$. Nhận xét 07.47: một lựa chọn trạng thái là đủ khi chi phí và chuyển tiếp về sau không phụ thuộc lịch sử; khi không đủ, ta mở rộng trạng thái.
- **Xác suất.** Quy tắc nhân $\mathbb P(E\cap F)=\mathbb P(E)\,\mathbb P(F\mid E)$ (Mệnh đề 10.10); xác suất toàn phần $\mathbb P(F)=\sum_i\mathbb P(E_i)\,\mathbb P(F\mid E_i)$ với phân hoạch $(E_i)$ (Định lý 10.11); độc lập có điều kiện (Định nghĩa 10.16); kỳ vọng có điều kiện theo một biến rời rạc (Định nghĩa 10.28) và kỳ vọng toàn phần $\mathbb E[X]=\sum_w\mathbb E[X\mid W=w]\,\mathbb P(W=w)$, tổng trên các $w$ có xác suất dương (Định lý 10.29).
- **Ước lượng.** Định lý 11.7: với $m_k$ lần quan sát nhóm $k$ trong $m$ lần thử độc lập có cùng phân phối phân loại, ước lượng hợp lý cực đại (maximum likelihood estimation, MLE) duy nhất trên đơn hình đóng là $\hat\pi_k=m_k/m$ (Bài 11 viết $n$, $n_k$; ở đây ta viết $m$ cho số lần thử vì $n$ là trạng thái nghỉ).
- **Ba nguồn sai số.** Mệnh đề 12.16 chặn rủi ro dư bằng tổng của sai số xấp xỉ, sai số ước lượng và sai số tối ưu hóa.
- **Giải tích.** Tổng cấp số nhân $\sum_{j\ge0}\gamma^j=1/(1-\gamma)$ khi $0\le\gamma<1$; chuẩn cực đại $\|x\|_\infty=\max_i\lvert x_i\rvert$ trên $\mathbb R^d$; mọi dãy Cauchy số thực đều hội tụ (tính đầy đủ của $\mathbb R$).

**Câu hỏi ôn nhanh.**

1. Cho $\mathbb P(X=1)=0{,}4$, $\mathbb P(Y=1\mid X=1)=0{,}2$ và $\mathbb P(Y=1\mid X=0)=0{,}5$. Tính $\mathbb P(Y=1)$.
2. Tính $\sum_{j=0}^{\infty}0{,}6\cdot0{,}9^j$.
3. Trong $12$ lần thử độc lập, nhóm $1$ xuất hiện $9$ lần và nhóm $2$ xuất hiện $3$ lần. Tính MLE của vector xác suất.

::: hint Đáp số câu hỏi ôn nhanh
1. $0{,}4\cdot0{,}2+0{,}6\cdot0{,}5=0{,}08+0{,}30=0{,}38$ theo Định lý 10.11.
2. $0{,}6/(1-0{,}9)=6$.
3. $(9/12;\,3/12)=(3/4;\,1/4)$ theo Định lý 11.7.
:::

## 1. Thiết lập bài toán

Một tác tử (agent), chẳng hạn robot, tương tác với môi trường qua các bước $t=0,1,2,\ldots$. Bài toán gồm sáu thành phần sau.

- **Trạng thái:** $S_t$ thuộc một tập hữu hạn $\mathcal S$; $S_t$ là ngẫu nhiên.
- **Hành động:** $A_t$ thuộc tập hữu hạn $\mathcal A(S_t)$, được chọn sau khi quan sát lịch sử đến thời điểm $t$.
- **Cơ chế chuyển:** cặp gồm trạng thái kế tiếp và phần thưởng $(S_{t+1},R_{t+1})$ có phân phối chỉ phụ thuộc cặp $(S_t,A_t)$; từ đó có xác suất chuyển $P(s'\mid s,a)$ và phần thưởng kỳ vọng $r(s,a)$.
- **Mục tiêu:** chọn chính sách sao cho tổng thưởng chiết khấu kỳ vọng
$$\mathbb E\Bigl[\sum_{t\ge0}\gamma^tR_{t+1}\Bigm|S_0=s\Bigr]$$
lớn nhất tại mọi trạng thái đầu $s$.
- **Đối tượng so sánh:** mọi chính sách, kể cả chính sách ngẫu nhiên phụ thuộc toàn bộ lịch sử.
- **Thông tin có được:** hoặc biết $P$ và $r$, gọi là *quy hoạch* (planning), hoặc chỉ có các bộ $(s,a,r,s')$ quan sát được từ tương tác, gọi là *học tăng cường* (reinforcement learning).

Bảng dưới phân loại các đại lượng của bài theo nguồn ngẫu nhiên.

| Loại | Đại lượng |
|---|---|
| Cố định | $\mathcal S$, $\mathcal A(s)$, $P$, $r$, $\gamma$, chính sách cho trước, các hàm giá trị $V^\pi$, $V^*$ |
| Ngẫu nhiên theo quỹ đạo khi cố định chính sách và trạng thái đầu | $S_t$, $A_t$, $R_{t+1}$, lịch sử $H_t$, tổng thưởng $G_t$ |
| Ngẫu nhiên theo dữ liệu thu thập | số đếm $N(s,a,s')$, mô hình ước lượng $\hat P$, $\hat r$, bảng $Q_t$ của Q-learning |

## 2. Ký hiệu và giả thiết

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $t$, $k$ | thời điểm; chỉ số vòng lặp | số nguyên không âm |
| $\mathcal S$, $s,s'$ | tập trạng thái; trạng thái hiện tại, kế tiếp | tập hữu hạn khác rỗng; phần tử |
| $S_t$, $\mu_t$ | trạng thái tại thời điểm $t$; phân phối của nó | biến ngẫu nhiên trên $\mathcal S$; vector hàng |
| $P_{ij}$ | xác suất chuyển của xích Markov | phần tử của ma trận hàng ngẫu nhiên |
| $\mathcal A(s)$, $a$ | tập hành động khả thi tại $s$; một hành động | tập hữu hạn khác rỗng; phần tử |
| $A_t$, $R_{t+1}$ | hành động tại $t$; phần thưởng nhận sau $A_t$ | thuộc $\mathcal A(S_t)$; thuộc $\mathcal R$ |
| $\mathcal R$, $R_{\max}$ | tập giá trị phần thưởng; chặn của nó | tập hữu hạn trong $[-R_{\max},R_{\max}]$ |
| $H_t$, $\tau$ | lịch sử đến $S_t$; một giá trị cụ thể của lịch sử | biến ngẫu nhiên rời rạc; dãy hữu hạn |
| $p(s',c\mid s,a)$ | mô hình chuyển: xác suất của trạng thái kế tiếp $s'$ và phần thưởng $c$ | số trong $[0,1]$ |
| $P(s'\mid s,a)$, $r(s,a)$ | xác suất chuyển; phần thưởng kỳ vọng một bước | xác suất; số thực |
| $\gamma$ | hệ số chiết khấu | $[0,1)$ |
| $\rho$, $\pi$ | chính sách tổng quát; chính sách Markov dừng | quy tắc chọn theo lịch sử; theo trạng thái |
| $P^\pi$, $r^\pi$ | ma trận chuyển, vector thưởng dưới $\pi$ | ma trận $\lvert\mathcal S\rvert\times\lvert\mathcal S\rvert$; vector cột |
| $G_t$ | tổng thưởng chiết khấu từ $t$ | biến ngẫu nhiên bị chặn |
| $V^\rho$, $V^*$ | hàm giá trị của $\rho$; giá trị tối ưu | hàm $\mathcal S\to\mathbb R$, đồng nhất với vector của $\mathbb R^{\lvert\mathcal S\rvert}$ |
| $Q_U(s,a)$ | giá trị nhìn trước một bước theo $U$ | số thực |
| $T^\pi$, $T$ | toán tử Bellman theo $\pi$; toán tử Bellman tối ưu | ánh xạ $\mathbb R^{\lvert\mathcal S\rvert}\to\mathbb R^{\lvert\mathcal S\rvert}$ |
| $\pi_U$, $\bar V$ | chính sách tham lam theo $U$; điểm bất động của $T$ | chính sách tất định dừng; vector |
| $V_k$, $\beta(V)$ | vector lặp giá trị; phần dư Bellman | vector; số không âm |
| $\lVert x\rVert_\infty$ | chuẩn cực đại $\max_i\lvert x_i\rvert$ | số không âm |
| $\kappa$ | hệ số co của một ánh xạ co | $[0,1)$ |
| $\Delta(\mathcal S)$ | tập các hàng xác suất trên $\mathcal S$ | đơn hình đóng |
| $N(s,a,s')$, $N(s,a)$ | số lần chuyển $(s,a)\to s'$; số lần thử cặp $(s,a)$ | số nguyên không âm |
| $\hat P$, $\hat r$ | xác suất chuyển, phần thưởng ước lượng | hàng xác suất; số thực |
| $\varepsilon$ | mức sai số mong muốn | số dương |

Chúng ta dùng các giả thiết sau, tách thành hai nhóm.

Giả thiết xác suất và thống kê:

- **(M1) Markov có điều khiển, thuần nhất:** phân phối của $(S_{t+1},R_{t+1})$ khi biết lịch sử $H_t$ và hành động $A_t$ chỉ phụ thuộc $(S_t,A_t)$, không phụ thuộc $t$.
- **(M2) Phần thưởng hữu hạn giá trị:** $R_{t+1}$ nhận giá trị trong một tập hữu hạn $\mathcal R\subset[-R_{\max},R_{\max}]$. Khi đó mọi lịch sử $H_t$ là biến rời rạc và mọi kỳ vọng có điều kiện trong bài là kỳ vọng theo biến rời rạc của Định nghĩa 10.28.
- **(M3) Lấy mẫu chuyển tiếp:** khi ước lượng, các lần thử tại một cặp $(s,a)$ độc lập và có cùng phân phối $P(\cdot\mid s,a)$.

Giả thiết hữu hạn và tối ưu:

- **(O1) Hữu hạn:** $\mathcal S$ và mọi $\mathcal A(s)$ hữu hạn, khác rỗng, nên mọi cực đại theo hành động được đạt.
- **(O2) Chiết khấu:** $0\le\gamma<1$.
- **(O3) Tính chính xác:** các phép lấy kỳ vọng và cực đại trong lặp giá trị được tính đúng theo mô hình đang dùng.

## 3. Ví dụ xuyên suốt

Hai ví dụ sau được dùng lại trong toàn bài. Ví dụ đầu nhỏ để tính bằng tay; ví dụ thứ hai là cùng robot đó khi một phần mô hình phải học từ dữ liệu.

::: example Ví dụ 13.1 (Robot với hai hành động)
**Trạng thái.** $\mathcal S=\{h,z\}$, trong đó $h$ là trạng thái hoạt động và $z$ là trạng thái dừng.

**Hành động và chuyển tiếp.**

- Tại $h$, hành động $A$ cho thưởng $1$, rồi $S_{t+1}=h$ với xác suất $1/2$ và $S_{t+1}=z$ với xác suất $1/2$.
- Tại $h$, hành động $B$ cho thưởng $0{,}6$, rồi $S_{t+1}=h$ với xác suất $1$.
- Tại $z$ chỉ có một hành động, thưởng $0$, và robot ở lại $z$ với xác suất $1$.

**Chiết khấu.** $\gamma=0{,}9$.

Trạng thái $z$ là một *trạng thái hấp thụ* (absorbing state): khi đã vào thì không ra và mọi phần thưởng sau đó bằng $0$. Mô hình này có $\mathcal R=\{0;\,0{,}6;\,1\}$ và $R_{\max}=1$.
:::

![Hai hình tròn là trạng thái: h (hoạt động) và z (hấp thụ). Từ h có hai ô hành động. Ô A ghi thưởng 1, có mũi tên về h với xác suất 0,5 và mũi tên sang z với xác suất 0,5. Ô B ghi thưởng 0,6, có mũi tên về h với xác suất 1. Tại z có vòng tự lặp xác suất 1, thưởng 0. Hệ số chiết khấu 0,9.](img/lec-13/robot-mdp.svg)

*Hình 13.1. Robot của Ví dụ 13.1. Hai hình tròn là trạng thái; hai ô là hành động tại $h$. Hành động $A$ cho thưởng tức thời cao hơn nhưng chỉ giữ robot hoạt động với xác suất $0{,}5$.*

**Ứng dụng: robot học xác suất chuyển từ bộ mô phỏng.** Trong thực tế, xác suất robot còn hoạt động sau hành động $A$ chưa được biết trước. Một bộ mô phỏng cho phép đặt robot vào trạng thái $h$, thực hiện $A$ và ghi trạng thái kế tiếp. Từ các lần thử đó, ta ước lượng hàng chuyển $P(\cdot\mid h,A)$ bằng số đếm rồi quy hoạch trên mô hình ước lượng. Kết luận của phép quy hoạch khi đó chỉ đúng với mô hình ước lượng, và có thể sai với robot thật khi số lần thử ít.

## 4. Xích Markov và phân phối trạng thái

Trước khi robot được chọn hành động, xét robot vận hành theo một quy tắc cố định: mỗi bước nó đang hoạt động ($h$) hoặc đang nghỉ ($n$), và trạng thái bước sau chưa biết chắc nhưng phụ thuộc trạng thái hiện tại. Để tính xác suất robot còn hoạt động sau hai bước, chúng ta cần một mô hình cho cả cách chuyển trạng thái lẫn phân phối trạng thái ban đầu.

Một cách trực quan, trạng thái hiện tại tóm tắt mọi thông tin của quá khứ cần cho việc dự đoán bước kế tiếp. Đây là trực giác về tính Markov, chưa phải định nghĩa.

### 4.1. Tính Markov và ma trận chuyển

Định nghĩa sau viết trực giác trên bằng xác suất có điều kiện và đưa vào ma trận chuyển.

::: definition Định nghĩa 13.1 (Quá trình ngẫu nhiên và xích Markov thuần nhất)
Một *quá trình ngẫu nhiên rời rạc theo thời gian* (discrete-time stochastic process) là một dãy biến ngẫu nhiên $S_0,S_1,\ldots$; trong bài này chúng nhận giá trị trên cùng một tập hữu hạn $\mathcal S$.

Quá trình có *tính Markov* (Markov property) nếu với mọi $t\ge0$ và mọi $s_0,\ldots,s_t,s'\in\mathcal S$ sao cho $\mathbb P(S_0=s_0,\ldots,S_t=s_t)>0$,
$$
\begin{aligned}
&\mathbb P\bigl(S_{t+1}=s'\\
&\qquad\bigm|S_0=s_0,\ldots,S_t=s_t\bigr)\\
&\quad=\mathbb P(S_{t+1}=s'\mid S_t=s_t).
\end{aligned}
\tag{4.1}
$$

Quá trình là một *xích Markov thuần nhất* (time-homogeneous Markov chain) nếu nó có tính Markov và có một ma trận $P$ cấp $\lvert\mathcal S\rvert\times\lvert\mathcal S\rvert$ không phụ thuộc $t$ sao cho
$$
\begin{gathered}
P_{ij}=\mathbb P(S_{t+1}=j\mid S_t=i),\\
P_{ij}\ge0,\qquad\sum_jP_{ij}=1,
\end{gathered}
\tag{4.2}
$$
với mọi $t$ và mọi $i$ có $\mathbb P(S_t=i)>0$. Ma trận $P$ được gọi là *ma trận chuyển* (transition matrix). Một ma trận có các phần tử không âm và tổng mỗi hàng bằng $1$ được gọi là *ma trận hàng ngẫu nhiên* (row-stochastic matrix).
:::

Định nghĩa 13.1 là một trường hợp của độc lập có điều kiện (Định nghĩa 10.16): khi biết $S_t$, các trạng thái cũ hơn không đổi phân phối của $S_{t+1}$. Tính Markov không nói $S_t$ và $S_{t+1}$ độc lập: trạng thái hiện tại thường quyết định mạnh trạng thái kế tiếp. Tính thuần nhất là một giả thiết riêng: một xích có thể có tính Markov nhưng dùng các ma trận $P_t$ thay đổi theo thời gian.

Trong học máy, trạng thái là đối tượng mô hình hóa cần được chọn. Nếu cả mức pin và vị trí đều ảnh hưởng đến bước kế tiếp của robot, một trạng thái chỉ ghi vị trí có thể làm mất tính Markov. Thêm biến vào trạng thái giúp trạng thái đủ thông tin, nhưng làm tăng số trạng thái và số xác suất chuyển cần ước lượng.

### 4.2. Truyền phân phối

Xếp các trạng thái theo một thứ tự cố định và biểu diễn phân phối của $S_t$ bằng vector hàng $\mu_t=\bigl(\mathbb P(S_t=s)\bigr)_{s\in\mathcal S}$. Về mặt trực quan, xác suất đến một trạng thái ở bước sau là tổng xác suất đi qua từng trạng thái hiện tại. Mệnh đề sau viết điều đó thành phép nhân ma trận; nó cần xác suất toàn phần (Định lý 10.11) và tính thuần nhất.

::: proposition Mệnh đề 13.2 (Phân phối sau nhiều bước) — chứng minh đầy đủ
**Giả thiết.** $(S_t)$ là xích Markov thuần nhất trên $\mathcal S$ hữu hạn, với ma trận chuyển $P$ và phân phối ban đầu $\mu_0$.

**Kết luận.** Với mọi $t\ge0$,
$$
\begin{gathered}
\mu_{t+1}=\mu_tP,\\
\mu_t=\mu_0P^t,
\end{gathered}
\tag{4.3}
$$
trong đó $P^0=I$. Mỗi $\mu_t$ có phần tử không âm và tổng bằng $1$.
:::

::: proof Chứng minh Mệnh đề 13.2
**Lộ trình.** Áp dụng xác suất toàn phần với phân hoạch $\{S_t=i\}$, rồi quy nạp theo $t$.

**Bước 1 (một bước).** Với mỗi trạng thái $j$, Định lý 10.11 với phân hoạch $\{S_t=i\}$, $i\in\mathcal S$, cho
$$
\begin{aligned}
&\mathbb P(S_{t+1}=j)\\
&\quad=\sum_{i:\,\mu_t(i)>0}\mathbb P(S_t=i)\\
&\qquad\quad\times\mathbb P(S_{t+1}=j\mid S_t=i)\\
&\quad=\sum_{i}\mu_t(i)P_{ij}.
\end{aligned}
$$
Đẳng thức thứ hai dùng (4.2) và việc các số hạng có $\mu_t(i)=0$ bằng $0$. Vế phải là tọa độ thứ $j$ của $\mu_tP$.

**Bước 2 (chuẩn hóa).** Các số hạng đều không âm. Đổi thứ tự hai tổng hữu hạn và dùng tổng mỗi hàng của $P$ bằng $1$:
$$
\begin{aligned}
\sum_j\mu_{t+1}(j)&=\sum_i\mu_t(i)\sum_jP_{ij}\\
&=\sum_i\mu_t(i)=1.
\end{aligned}
$$

**Bước 3 (quy nạp).** Đẳng thức $\mu_0=\mu_0P^0$ đúng. Nếu $\mu_t=\mu_0P^t$ thì Bước 1 cho $\mu_{t+1}=\mu_0P^tP=\mu_0P^{t+1}$. $\square$

Như vậy, khi mô hình chuyển đã biết, phân phối trạng thái sau $t$ bước chỉ cần $t$ phép nhân vector với ma trận.
:::

Ta còn cần xác suất của một chuỗi trạng thái cụ thể, chẳng hạn robot đi $h\to n\to h$. Hệ quả sau của Định nghĩa 13.1 suy từ quy tắc nhân (Mệnh đề 10.10) và (4.1).

::: corollary Hệ quả 13.3 (Xác suất một quỹ đạo) — chứng minh đầy đủ
**Giả thiết.** Như Mệnh đề 13.2.

**Kết luận.** Với mọi $t\ge0$ và mọi $s_0,\ldots,s_t\in\mathcal S$,
$$
\begin{aligned}
&\mathbb P(S_0=s_0,S_1=s_1,\\
&\qquad\ldots,S_t=s_t)\\
&\quad=\mu_0(s_0)\prod_{k=0}^{t-1}P_{s_ks_{k+1}}.
\end{aligned}
\tag{4.4}
$$
:::

::: proof Chứng minh Hệ quả 13.3
**Lộ trình.** Quy nạp theo $t$, mỗi bước dùng quy tắc nhân một lần.

**Bước 1 (khởi đầu).** Với $t=0$, vế phải là $\mu_0(s_0)$, đúng bằng vế trái.

**Bước 2 (quy nạp).** Đặt $E=\{S_0=s_0,\ldots,S_t=s_t\}$ và giả sử (4.4) đúng cho $E$. Nếu $\mathbb P(E)=0$ thì cả hai vế của (4.4) tại $t+1$ bằng $0$. Nếu $\mathbb P(E)>0$, quy tắc nhân, rồi (4.1) và (4.2) cho
$$
\begin{aligned}
&\mathbb P(E\cap\{S_{t+1}=s_{t+1}\})\\
&\quad=\mathbb P(E)\,\mathbb P(S_{t+1}=s_{t+1}\mid E)\\
&\quad=\mathbb P(E)\,\mathbb P(S_{t+1}=s_{t+1}\mid S_t=s_t)\\
&\quad=\mathbb P(E)\,P_{s_ts_{t+1}}.
\end{aligned}
$$
Thay giả thiết quy nạp cho $\mathbb P(E)$ được (4.4) tại $t+1$. $\square$

Trong học máy, (4.4) là hợp lý của một chuỗi trạng thái quan sát được; ước lượng ma trận chuyển từ dữ liệu chuỗi bắt đầu từ công thức này.
:::

Hai ví dụ sau dùng cùng một ma trận cho robot hoạt động hoặc nghỉ. Ví dụ đầu tính phân phối sau hai bước.

::: example Ví dụ 13.2 (Robot hoạt động hoặc nghỉ sau hai bước)
**Dữ kiện.** Hai trạng thái xếp theo thứ tự $h,n$, với
$$
\begin{gathered}
P=\begin{pmatrix}0{,}8&0{,}2\\0{,}35&0{,}65\end{pmatrix},\\
\mu_0=(1;\,0).
\end{gathered}
$$

**Một bước.** Theo (4.3), $\mu_1=(1;\,0)P=(0{,}8;\,0{,}2)$.

**Hai bước.**
$$
\begin{aligned}
\mu_2&=(0{,}8;\,0{,}2)P\\
&=(0{,}8\cdot0{,}8+0{,}2\cdot0{,}35;\\
&\qquad0{,}8\cdot0{,}2+0{,}2\cdot0{,}65)\\
&=(0{,}64+0{,}07;\ 0{,}16+0{,}13)\\
&=(0{,}71;\,0{,}29).
\end{aligned}
$$

**Kiểm tra lại.** $0{,}71+0{,}29=1$. Theo (4.4), đường $h\to h\to h$ có xác suất $1\cdot0{,}8\cdot0{,}8=0{,}64$ và đường $h\to n\to h$ có xác suất $1\cdot0{,}2\cdot0{,}35=0{,}07$; tổng hai đường bằng $0{,}71$.

Robot bắt đầu ở trạng thái hoạt động còn hoạt động sau hai bước với xác suất $0{,}71$. Con số này lớn hơn $0{,}8^2=0{,}64$ vì robot có thể nghỉ một bước rồi hoạt động lại.
:::

Xác suất chuyển $P_{hn}$ là một xác suất có điều kiện; xác suất để robot ở $h$ rồi sang $n$ là một xác suất đồng thời. Ví dụ sau tính cả hai trên cùng ma trận.

::: example Ví dụ 13.3 (Xác suất chuyển và xác suất đồng thời)
**Dữ kiện.** Cùng ma trận $P=\begin{pmatrix}0{,}8&0{,}2\\0{,}35&0{,}65\end{pmatrix}$ với thứ tự $h,n$. Tại thời điểm đang xét, $\mu_t=(0{,}4;\,0{,}6)$.

**Xác suất chuyển.** Theo (4.2), $\mathbb P(S_{t+1}=n\mid S_t=h)=P_{hn}=0{,}2$.

**Xác suất đồng thời.** Theo quy tắc nhân,
$$
\begin{aligned}
\mathbb P(S_t=h,S_{t+1}=n)&=0{,}4\cdot0{,}2\\
&=0{,}08.
\end{aligned}
$$

**Phân phối bước sau.** Theo (4.3),
$$
\begin{aligned}
\mu_{t+1}&=(0{,}4\cdot0{,}8+0{,}6\cdot0{,}35;\\
&\qquad0{,}4\cdot0{,}2+0{,}6\cdot0{,}65)\\
&=(0{,}53;\,0{,}47).
\end{aligned}
$$

**Kiểm tra độc lập.** Nếu $S_t$ và $S_{t+1}$ độc lập thì $\mathbb P(S_t=h,S_{t+1}=n)=0{,}4\cdot0{,}47=0{,}188$. Giá trị thật là $0{,}08$, nên hai trạng thái liên tiếp không độc lập.

Ví dụ cho thấy một xích Markov có thể có hai trạng thái liên tiếp phụ thuộc mạnh vào nhau; tính Markov chỉ nói quá khứ xa hơn không cung cấp thêm thông tin khi đã biết hiện tại.
:::

Nhận xét sau tách ba giả thiết thường bị dùng lẫn: tính Markov, tính độc lập và tính thuần nhất.

::: remark Nhận xét 13.4 (Ba giả thiết dễ nhầm)
1. Tính Markov nói về phân phối có điều kiện theo hiện tại; tính độc lập nói về việc biết một biến có đổi phân phối của biến kia hay không. Ví dụ 13.3 có tính Markov nhưng không độc lập.
2. Thuần nhất nói ma trận chuyển không đổi theo thời gian. Nếu một thiết bị hao mòn nhưng trạng thái không ghi mức hao mòn, một ma trận cố định không mô tả đúng dữ liệu. Với các ma trận $P_0,P_1,\ldots$ thay đổi theo thời gian, Bước 1 của chứng minh Mệnh đề 13.2 cho $\mu_t=\mu_0P_0P_1\cdots P_{t-1}$.
3. Tổng mỗi hàng của $P$ bằng $1$; tổng mỗi cột không nhất thiết bằng $1$. Nếu dùng vector cột cho phân phối, phép truyền là $\mu_{t+1}^\top=P^\top\mu_t^\top$.
:::

Như vậy, với một xích Markov thuần nhất, phân phối trạng thái được truyền bằng phép nhân $\mu_{t+1}=\mu_tP$ (Mệnh đề 13.2) và xác suất của một quỹ đạo là tích các xác suất chuyển (Hệ quả 13.3). Tuy nhiên, ở đây ma trận $P$ đã cố định; khi robot được chọn hành động, mỗi hành động cho một hàng chuyển khác nhau và một phần thưởng khác nhau. Trong Mục 5, chúng ta thêm hành động, phần thưởng và tiêu chuẩn đánh giá một chuỗi quyết định.

## 5. Quá trình quyết định Markov, chính sách và tổng thưởng chiết khấu

Robot của Ví dụ 13.1 có thể chọn hành động $A$ cho phần thưởng lớn ngay nhưng dễ dừng hoạt động, hoặc hành động $B$ cho phần thưởng nhỏ hơn mỗi bước nhưng giữ robot hoạt động. Chỉ so phần thưởng của bước hiện tại bỏ qua ảnh hưởng của hành động lên những lần nhận thưởng sau. Để so sánh hai cách chọn, chúng ta cần mô hình hóa đồng thời lựa chọn, chuyển trạng thái và một tiêu chuẩn cho cả chuỗi tương lai.

Một cách trực quan, mỗi hành động chọn một hàng chuyển tiếp và một cơ chế nhận thưởng; chính sách là quy tắc chọn hành động, và giá trị của chính sách là kỳ vọng tổng thưởng dài hạn. Đây là trực giác, chưa phải định nghĩa.

### 5.1. Mô hình quyết định và chính sách

Mô hình sau thêm hành động vào xích Markov của Định nghĩa 13.1 và gắn mỗi bước với một phần thưởng.

::: definition Định nghĩa 13.5 (Quá trình quyết định Markov hữu hạn)
Một *quá trình quyết định Markov* (Markov decision process, MDP) hữu hạn gồm năm thành phần sau.

- **Tập trạng thái:** $\mathcal S$ hữu hạn, khác rỗng.
- **Tập hành động:** với mỗi $s\in\mathcal S$, tập $\mathcal A(s)$ hữu hạn, khác rỗng.
- **Tập giá trị phần thưởng:** một tập hữu hạn $\mathcal R\subset[-R_{\max},R_{\max}]$, với $R_{\max}<\infty$.
- **Mô hình chuyển:** các số $p(s',c\mid s,a)\ge0$, với $s'\in\mathcal S$, $c\in\mathcal R$, thỏa $\sum_{s'}\sum_{c}p(s',c\mid s,a)=1$ cho mọi $s$ và mọi $a\in\mathcal A(s)$.
- **Hệ số chiết khấu** (discount factor): $\gamma\in[0,1)$.

Quá trình bắt đầu từ trạng thái $S_0$. Tại thời điểm $t$, *lịch sử* (history) là $H_t=(S_0,A_0,R_1,S_1,\ldots,A_{t-1},R_t,S_t)$; tác tử quan sát $H_t$, chọn hành động $A_t\in\mathcal A(S_t)$, rồi môi trường sinh trạng thái kế tiếp $S_{t+1}$ và *phần thưởng* (reward) $R_{t+1}$. *Giả thiết Markov có điều khiển* yêu cầu: với mọi $t$, mọi giá trị $\tau$ của lịch sử có trạng thái cuối $s_\tau$ và mọi $a$ sao cho $\mathbb P(H_t=\tau,A_t=a)>0$,
$$
\begin{aligned}
&\mathbb P\bigl(S_{t+1}=s',\,R_{t+1}=c\\
&\qquad\bigm|H_t=\tau,\,A_t=a\bigr)\\
&\quad=p(s',c\mid s_\tau,a).
\end{aligned}
\tag{5.1}
$$

Từ mô hình chuyển, *xác suất chuyển* và *phần thưởng kỳ vọng một bước* là
$$
\begin{aligned}
&P(s'\mid s,a)\\
&\quad=\sum_{c\in\mathcal R}p(s',c\mid s,a),\\
&r(s,a)\\
&\quad=\sum_{s'\in\mathcal S}\sum_{c\in\mathcal R}c\,p(s',c\mid s,a).
\end{aligned}
\tag{5.2}
$$
:::

Định nghĩa 13.5 mở rộng Định nghĩa 13.1 bằng một biến điều khiển. Giả thiết Markov áp dụng cho cả phần thưởng: một biến ẩn ảnh hưởng đến phần thưởng tương lai phải được đưa vào trạng thái nếu muốn dùng mô hình này. Đại lượng $R_{t+1}$ là phần thưởng quan sát được, ngẫu nhiên; $r(s,a)$ là trung bình của nó theo mô hình. Vì $\mathcal S$, mọi $\mathcal A(s)$ và $\mathcal R$ hữu hạn, lịch sử $H_t$ nhận hữu hạn giá trị, nên các xác suất có điều kiện trong (5.1) là xác suất có điều kiện theo biến cố có xác suất dương như ở Bài 10.

Với robot của Ví dụ 13.1, mô hình chuyển của hành động $A$ là $p(h,1\mid h,A)=p(z,1\mid h,A)=1/2$, nên $P(h\mid h,A)=1/2$ và $r(h,A)=1$. Khi phần thưởng là một hàm tất định $r(s,a,s')$ của bước chuyển, (5.2) cho $r(s,a)=\sum_{s'}P(s'\mid s,a)\,r(s,a,s')$. Phần thưởng và trạng thái kế tiếp có thể tương quan; tính tuyến tính của kỳ vọng cho phép chỉ dùng trung bình $r(s,a)$ khi tối ưu tổng thưởng kỳ vọng.

Định nghĩa 13.5 chưa nói hành động $A_t$ được chọn thế nào. Định nghĩa sau gọi tên quy tắc chọn đó.

::: definition Định nghĩa 13.6 (Chính sách)
Một *chính sách* (policy) tổng quát $\rho=(\rho_t)_{t\ge0}$ gán cho mỗi thời điểm $t$ và mỗi giá trị $\tau$ của lịch sử, với trạng thái cuối $s_\tau$, một phân phối xác suất $\rho_t(\cdot\mid\tau)$ trên $\mathcal A(s_\tau)$. Hành động được chọn theo
$$
\mathbb P(A_t=a\mid H_t=\tau)=\rho_t(a\mid\tau)
$$
với mọi $\tau$ có $\mathbb P(H_t=\tau)>0$. Chính sách tổng quát có thể phụ thuộc thời gian, toàn bộ lịch sử và có thể ngẫu nhiên.

Một *chính sách Markov dừng* (stationary Markov policy) $\pi$ chỉ dùng trạng thái hiện tại và không đổi theo thời gian: $\rho_t(a\mid\tau)=\pi(a\mid s_\tau)$. Nó là *tất định* (deterministic) nếu tại mỗi trạng thái nó chọn một hành động với xác suất $1$; hành động đó được ký hiệu $\pi(s)$.

Với chính sách Markov dừng $\pi$, đặt
$$
\begin{aligned}
&P^\pi(s,s')\\
&\quad=\sum_{a\in\mathcal A(s)}\pi(a\mid s)\\
&\qquad\quad\cdot P(s'\mid s,a),\\
&r^\pi(s)\\
&\quad=\sum_{a\in\mathcal A(s)}\pi(a\mid s)\,r(s,a).
\end{aligned}
\tag{5.3}
$$
:::

Theo Định nghĩa 13.6, quy luật môi trường $p$ và quy tắc chọn hành động $\rho$ là hai đối tượng riêng. Khi cố định $\rho$ và $S_0=s$, phân phối của mọi lịch sử được xác định bằng cách áp dụng quy tắc nhân lần lượt cho từng hành động và từng bước chuyển, như trong chứng minh Hệ quả 13.3. Cụ thể, với $\tau=(s,a_0,c_1,s_1,\ldots,a_{t-1},c_t,s_t)$ và $\tau_k$ là đoạn đầu của $\tau$ đến $s_k$,
$$
\begin{aligned}
&\mathbb P_\rho(H_t=\tau\mid S_0=s)\\
&\quad=\prod_{k=0}^{t-1}\rho_k(a_k\mid\tau_k)\\
&\qquad\times p(s_{k+1},c_{k+1}\mid s_k,a_k).
\end{aligned}
$$
Ta viết $\mathbb P_\rho$, $\mathbb E_\rho$ cho xác suất và kỳ vọng theo phân phối quỹ đạo này.

Với chính sách Markov dừng $\pi$, xác suất toàn phần theo $A_t$ cho $\mathbb P_\pi(S_{t+1}=s'\mid H_t=\tau)=\sum_a\pi(a\mid s_\tau)P(s'\mid s_\tau,a)=P^\pi(s_\tau,s')$. Xác suất này chỉ phụ thuộc trạng thái cuối, nên dãy $(S_t)$ là xích Markov thuần nhất với ma trận chuyển $P^\pi$; ma trận này không âm và có tổng mỗi hàng $\sum_a\pi(a\mid s)\sum_{s'}P(s'\mid s,a)=1$. Mệnh đề 13.2 vì vậy áp dụng được. Với chính sách phụ thuộc lịch sử, riêng dãy $(S_t)$ nói chung không còn là xích Markov, dù môi trường thỏa (5.1).

Ví dụ sau tính $P^\pi$ và $r^\pi$ cho một chính sách ngẫu nhiên của robot.

::: example Ví dụ 13.4 (Một chính sách ngẫu nhiên tạo ra một xích)
**Dữ kiện.** Robot của Ví dụ 13.1: tại $h$, $A$ thưởng $1$ và giữ robot ở $h$ với xác suất $1/2$; $B$ thưởng $0{,}6$ và luôn giữ robot ở $h$; $z$ hấp thụ với thưởng $0$. Chính sách $\pi$ chọn $A$ hoặc $B$ với xác suất $1/2$ mỗi khi ở $h$.

**Ma trận chuyển dưới $\pi$.** Theo (5.3), với thứ tự $h,z$,
$$
\begin{aligned}
P^\pi(h,h)&=\tfrac12\cdot\tfrac12+\tfrac12\cdot1=0{,}75,\\
P^\pi&=\begin{pmatrix}0{,}75&0{,}25\\0&1\end{pmatrix}.
\end{aligned}
$$

**Thưởng kỳ vọng dưới $\pi$.** $r^\pi(h)=\tfrac12\cdot1+\tfrac12\cdot0{,}6=0{,}8$ và $r^\pi(z)=0$.

**Kiểm tra lại.** Mỗi hàng của $P^\pi$ có tổng bằng $1$.

Trước khi chọn chính sách, robot không có một ma trận chuyển duy nhất; sau khi cố định $\pi$, robot là một xích Markov với ma trận $P^\pi$.
:::

### 5.2. Tổng thưởng chiết khấu và hàm giá trị

Nếu robot luôn chọn $B$ và ta cộng mọi phần thưởng không có trọng số, tổng $0{,}6+0{,}6+\cdots$ bằng $+\infty$, nên không so sánh được các chính sách. Một cách trực quan, chiết khấu giảm trọng số của phần thưởng nhận muộn: phần thưởng sau $t$ bước được nhân với $\gamma^t$.

::: definition Định nghĩa 13.7 (Tổng thưởng chiết khấu và hàm giá trị)
Trong MDP của Định nghĩa 13.5, *tổng thưởng chiết khấu* (discounted return) từ thời điểm $t$ là
$$
G_t=\sum_{j=0}^{\infty}\gamma^jR_{t+j+1},
\tag{5.4}
$$
với quy ước $\gamma^0=1$. Với chính sách $\rho$ và trạng thái đầu $s$, *hàm giá trị* (value function) là $V^\rho(s)=\mathbb E_\rho[G_0\mid S_0=s]$. *Giá trị tối ưu* (optimal value) là cận trên đúng theo mọi chính sách tổng quát:
$$
V^*(s)=\sup_\rho V^\rho(s).
\tag{5.5}
$$
Chính sách $\rho^*$ là *tối ưu* nếu $V^{\rho^*}(s)=V^*(s)$ với mọi $s$.
:::

Hàm giá trị gán một số cho cả chuỗi lựa chọn, còn $r(s,a)$ trong (5.2) chỉ là phần thưởng kỳ vọng của một bước. Định nghĩa (5.5) không giả sử cận trên được đạt, cũng không giả sử chỉ cần xét chính sách dừng. Mệnh đề sau cho biết các đại lượng này hữu hạn; nó dùng chặn $R_{\max}$ và tổng cấp số nhân.

::: proposition Mệnh đề 13.8 (Tồn tại giá trị và chặn phần đuôi) — chứng minh đầy đủ
**Giả thiết.** MDP của Định nghĩa 13.5; $\rho$ là một chính sách bất kỳ.

**Kết luận.** Trên mọi quỹ đạo, chuỗi (5.4) hội tụ tuyệt đối và với mọi $K\ge0$,
$$
\begin{aligned}
\lvert G_t\rvert&\le\frac{R_{\max}}{1-\gamma},\\
\Bigl\lvert\sum_{t=K}^{\infty}\gamma^tR_{t+1}\Bigr\rvert&\le\frac{\gamma^KR_{\max}}{1-\gamma},\\
\lvert V^\rho(s)\rvert&\le\frac{R_{\max}}{1-\gamma}.
\end{aligned}
\tag{5.6}
$$
Đặc biệt, $V^*(s)$ hữu hạn với mọi $s$.
:::

::: proof Chứng minh Mệnh đề 13.8
**Lộ trình.** So sánh chuỗi với cấp số nhân, rồi lấy kỳ vọng.

**Bước 1 (hội tụ tuyệt đối).** Vì $\lvert R_{t+j+1}\rvert\le R_{\max}$ (Định nghĩa 13.5) và $0\le\gamma<1$,
$$
\begin{aligned}
\sum_{j=0}^{\infty}\gamma^j\lvert R_{t+j+1}\rvert&\le R_{\max}\sum_{j=0}^{\infty}\gamma^j\\
&=\frac{R_{\max}}{1-\gamma}<\infty.
\end{aligned}
$$
Do đó chuỗi (5.4) hội tụ tuyệt đối và $\lvert G_t\rvert\le R_{\max}/(1-\gamma)$.

**Bước 2 (phần đuôi).** Cùng phép so sánh cho tổng từ $t=K$:
$$
\begin{aligned}
\Bigl\lvert\sum_{t=K}^{\infty}\gamma^tR_{t+1}\Bigr\rvert&\le R_{\max}\sum_{t=K}^{\infty}\gamma^t\\
&=\frac{\gamma^KR_{\max}}{1-\gamma}.
\end{aligned}
$$

**Bước 3 (kỳ vọng).** $G_0$ là biến ngẫu nhiên bị chặn, nên kỳ vọng của nó tồn tại và $\lvert V^\rho(s)\rvert\le\mathbb E_\rho[\lvert G_0\rvert\mid S_0=s]\le R_{\max}/(1-\gamma)$. Chặn này đúng cho mọi $\rho$, nên cận trên đúng $V^*(s)$ cũng thuộc $[-R_{\max}/(1-\gamma),R_{\max}/(1-\gamma)]$. $\square$

Trong học máy, chặn phần đuôi cho biết khi cắt một quỹ đạo sau $K$ bước, sai số không vượt $\gamma^KR_{\max}/(1-\gamma)$.
:::

Với $\gamma$ gần $1$, phần đuôi giảm chậm, nên các phần thưởng xa vẫn có trọng số đáng kể và việc tính toán cần nhiều bước hơn. Với $\gamma$ nhỏ, tác tử gần như chỉ quan tâm đến phần thưởng trước mắt; khi $\gamma=0$, $G_0=R_1$. Giá trị của $\gamma$ vì vậy là một phần của tiêu chuẩn mô hình hóa.

### 5.3. Phương trình Bellman khi đã cố định chính sách

Đẳng thức $G_t=R_{t+1}+\gamma G_{t+1}$ tách bước đầu khỏi phần còn lại. Một cách trực quan, giá trị tại $s$ bằng phần thưởng của bước đầu cộng $\gamma$ nhân giá trị kỳ vọng tại trạng thái kế tiếp. Để viết điều đó thành phương trình, ta cần đại lượng "phần thưởng một bước cộng giá trị kế tiếp" cho một hàm $U$ bất kỳ.

::: definition Định nghĩa 13.9 (Giá trị nhìn trước một bước và toán tử Bellman theo chính sách)
Cho MDP của Định nghĩa 13.5 và một hàm $U:\mathcal S\to\mathbb R$, đồng nhất với vector của $\mathbb R^{\lvert\mathcal S\rvert}$. *Giá trị nhìn trước một bước* (one-step lookahead value) theo $U$ là
$$
\begin{aligned}
&Q_U(s,a)\\
&\quad=r(s,a)\\
&\qquad+\gamma\sum_{s'\in\mathcal S}P(s'\mid s,a)\\
&\qquad\quad\cdot U(s'),\\
&s\in\mathcal S,\ a\in\mathcal A(s).
\end{aligned}
\tag{5.7}
$$
Với chính sách Markov dừng $\pi$, *toán tử Bellman theo chính sách* (policy Bellman operator) $T^\pi:\mathbb R^{\lvert\mathcal S\rvert}\to\mathbb R^{\lvert\mathcal S\rvert}$ là
$$
\begin{aligned}
&(T^\pi U)(s)\\
&\quad=\sum_{a\in\mathcal A(s)}\pi(a\mid s)\\
&\qquad\times Q_U(s,a).
\end{aligned}
\tag{5.8}
$$
:::

Số $Q_U(s,a)$ là phần thưởng kỳ vọng khi chọn $a$ tại $s$ cộng $\gamma$ nhân giá trị trung bình của $U$ tại trạng thái kế tiếp, khi $U$ được dùng thay cho giá trị thật của phần còn lại. Thay (5.7) vào (5.8), đổi thứ tự hai tổng hữu hạn và dùng (5.3):
$$
\begin{aligned}
&(T^\pi U)(s)\\
&\quad=r^\pi(s)\\
&\qquad+\gamma\sum_{s'}P^\pi(s,s')\,U(s'),\\
&\text{tức}\quad T^\pi U=r^\pi+\gamma P^\pi U.
\end{aligned}
\tag{5.9}
$$
Với robot, $Q_U(h,A)=1+0{,}45\,U(h)+0{,}45\,U(z)$ và $Q_U(h,B)=0{,}6+0{,}9\,U(h)$.

Bổ đề đầu tính kỳ vọng của "phần thưởng một bước cộng $\gamma U$ tại trạng thái kế tiếp" khi biết toàn bộ lịch sử. Nó cần kỳ vọng toàn phần (Định lý 10.29) và giả thiết Markov (5.1).

::: lemma Bổ đề 13.10 (Kỳ vọng của một bước nhìn trước) — chứng minh đầy đủ
**Giả thiết.**

- **Mô hình:** MDP của Định nghĩa 13.5.
- **Chính sách và trạng thái đầu:** chính sách $\rho$, trạng thái đầu $s$.
- **Hàm:** $U:\mathcal S\to\mathbb R$.
- **Lịch sử:** thời điểm $t$ và giá trị $\tau$ của lịch sử, có trạng thái cuối $s_\tau$, với $\mathbb P_\rho(H_t=\tau\mid S_0=s)>0$.

**Kết luận.**
$$
\begin{aligned}
&\mathbb E_\rho\bigl[R_{t+1}+\gamma U(S_{t+1})\\
&\qquad\bigm|H_t=\tau\bigr]\\
&\quad=\sum_{a\in\mathcal A(s_\tau)}\rho_t(a\mid\tau)\\
&\qquad\times Q_U(s_\tau,a).
\end{aligned}
\tag{5.10}
$$
:::

::: proof Chứng minh Bổ đề 13.10
**Lộ trình.** Phân hoạch theo hành động $A_t$, rồi dùng (5.1) cho từng hành động.

**Bước 1 (kỳ vọng toàn phần theo hành động).** Đặt $Y=R_{t+1}+\gamma U(S_{t+1})$, một biến rời rạc bị chặn. Xác suất có điều kiện $\mathbb P_\rho(\cdot\mid H_t=\tau)$ là một độ đo xác suất, và Định lý 10.29 áp dụng cho nó với biến điều kiện $A_t$:
$$
\begin{aligned}
&\mathbb E_\rho[Y\mid H_t=\tau]\\
&\quad=\sum_{a:\,\rho_t(a\mid\tau)>0}\rho_t(a\mid\tau)\\
&\qquad\times\mathbb E_\rho[Y\mid H_t=\tau,A_t=a].
\end{aligned}
$$

**Bước 2 (dùng giả thiết Markov).** Với $a$ có $\rho_t(a\mid\tau)>0$, (5.1) và (5.2) cho
$$
\begin{aligned}
&\mathbb E_\rho[R_{t+1}\mid H_t=\tau,A_t=a]\\
&\quad=\sum_{s'}\sum_{c}c\,p(s',c\mid s_\tau,a)\\
&\quad=r(s_\tau,a),\\
&\mathbb E_\rho[U(S_{t+1})\\
&\qquad\mid H_t=\tau,A_t=a]\\
&\quad=\sum_{s'}U(s')\sum_cp(s',c\mid s_\tau,a)\\
&\quad=\sum_{s'}P(s'\mid s_\tau,a)\,U(s').
\end{aligned}
$$
Theo tính tuyến tính của kỳ vọng, $\mathbb E_\rho[Y\mid H_t=\tau,A_t=a]=Q_U(s_\tau,a)$ theo (5.7).

**Bước 3 (ghép).** Thay vào Bước 1. Các hành động có $\rho_t(a\mid\tau)=0$ đóng góp $0$ vào vế phải của (5.10), nên tổng được lấy trên mọi $a\in\mathcal A(s_\tau)$. $\square$

Bổ đề cho thấy kỳ vọng của một bước nhìn trước chỉ phụ thuộc lịch sử qua trạng thái hiện tại và phân phối hành động mà chính sách chọn tại lịch sử đó.
:::

Bổ đề tiếp theo được dùng cho cả phương trình Bellman theo chính sách lẫn phương trình Bellman tối ưu. Nếu tại mọi lịch sử, kỳ vọng của một bước nhìn trước theo $U$ không vượt $U$ tại trạng thái hiện tại, thì cả chuỗi vô hạn cũng không vượt $U$. Chứng minh cộng các bước với tổng lồng, dùng kỳ vọng toàn phần theo lịch sử, rồi chặn phần đuôi bằng Mệnh đề 13.8.

::: lemma Bổ đề 13.11 (So sánh theo từng bước) — chứng minh đầy đủ
**Giả thiết.**

- **Mô hình:** MDP của Định nghĩa 13.5.
- **Hàm:** $U:\mathcal S\to\mathbb R$.
- **Chính sách và trạng thái đầu:** chính sách $\rho$, trạng thái đầu $s$.
- **So sánh một bước:** với mọi $t\ge0$ và mọi $\tau$ có $\mathbb P_\rho(H_t=\tau\mid S_0=s)>0$,
$$
\begin{aligned}
&\sum_{a\in\mathcal A(s_\tau)}\rho_t(a\mid\tau)\,Q_U(s_\tau,a)\\
&\quad\le U(s_\tau).
\end{aligned}
\tag{5.11}
$$

**Kết luận.** $V^\rho(s)\le U(s)$. Nếu (5.11) xảy ra dấu bằng với mọi $t$ và mọi $\tau$ như trên thì $V^\rho(s)=U(s)$.
:::

::: proof Chứng minh Bổ đề 13.11
**Lộ trình.** Đặt $D_t=\gamma^tR_{t+1}+\gamma^{t+1}U(S_{t+1})-\gamma^tU(S_t)$. Mỗi $D_t$ có kỳ vọng không dương; tổng của $D_0,\ldots,D_{K-1}$ là tổng lồng; phần đuôi sau $K$ bước nhỏ khi $K$ lớn. Mọi xác suất và kỳ vọng dưới đây tính theo $\mathbb P_\rho(\cdot\mid S_0=s)$.

**Bước 1 (một bước không làm tăng $U$ theo kỳ vọng).** Trên biến cố $\{H_t=\tau\}$ ta có $S_t=s_\tau$, nên $U(S_t)=U(s_\tau)$ là hằng số. Theo Bổ đề 13.10 và (5.11),
$$
\begin{aligned}
&\mathbb E_\rho[D_t\mid H_t=\tau]\\
&\quad=\gamma^t\Bigl(\mathbb E_\rho\bigl[R_{t+1}+\gamma U(S_{t+1})\\
&\qquad\quad\bigm|H_t=\tau\bigr]-U(s_\tau)\Bigr)\\
&\quad=\gamma^t\Bigl(\sum_a\rho_t(a\mid\tau)\,Q_U(s_\tau,a)\\
&\qquad\quad-U(s_\tau)\Bigr)\\
&\quad\le0.
\end{aligned}
$$

**Bước 2 (kỳ vọng toàn phần theo lịch sử).** Theo giả thiết (M2) và (O1), $H_t$ là biến rời rạc nhận hữu hạn giá trị. Đặt $w_\tau=\mathbb P_\rho(H_t=\tau\mid S_0=s)$. Định lý 10.29 với biến điều kiện $H_t$ cho
$$
\begin{aligned}
&\mathbb E_\rho[D_t\mid S_0=s]\\
&\quad=\sum_{\tau:\,w_\tau>0}w_\tau\,\mathbb E_\rho[D_t\mid H_t=\tau]\\
&\quad\le0.
\end{aligned}
$$

**Bước 3 (tổng lồng).** Trên mỗi quỹ đạo và với mỗi $K\ge1$, đổi chỉ số $t+1\mapsto t$ trong tổng thứ hai:
$$
\begin{aligned}
&\sum_{t=0}^{K-1}D_t\\
&\quad=\sum_{t=0}^{K-1}\gamma^tR_{t+1}+\sum_{t=1}^{K}\gamma^tU(S_t)\\
&\qquad\quad-\sum_{t=0}^{K-1}\gamma^tU(S_t)\\
&\quad=\sum_{t=0}^{K-1}\gamma^tR_{t+1}+\gamma^KU(S_K)\\
&\qquad\quad-U(S_0).
\end{aligned}
$$
Các số hạng $\gamma^tU(S_t)$ với $1\le t\le K-1$ xuất hiện một lần với dấu cộng và một lần với dấu trừ, nên triệt tiêu.

**Bước 4 (tổng hữu hạn bước).** Lấy kỳ vọng hai vế của Bước 3, dùng tính tuyến tính của kỳ vọng (mọi đại lượng bị chặn), $S_0=s$ và Bước 2:
$$
\begin{aligned}
&\mathbb E_\rho\Bigl[\sum_{t=0}^{K-1}\gamma^tR_{t+1}\Bigm|S_0=s\Bigr]\\
&\quad=U(s)-\gamma^K\,\mathbb E_\rho[U(S_K)\mid S_0=s]\\
&\qquad\quad+\sum_{t=0}^{K-1}\mathbb E_\rho[D_t\mid S_0=s]\\
&\quad\le U(s)+\gamma^K\lVert U\rVert_\infty.
\end{aligned}
$$

**Bước 5 (phần đuôi và giới hạn).** Tách $G_0=\sum_{t=0}^{K-1}\gamma^tR_{t+1}+\sum_{t=K}^{\infty}\gamma^tR_{t+1}$. Theo (5.6), phần thứ hai có trị tuyệt đối không quá $\gamma^KR_{\max}/(1-\gamma)$ trên mọi quỹ đạo. Lấy kỳ vọng và dùng Bước 4:
$$
\begin{aligned}
V^\rho(s)&\le U(s)\\
&\quad+\gamma^K\Bigl(\lVert U\rVert_\infty+\frac{R_{\max}}{1-\gamma}\Bigr).
\end{aligned}
$$
Bất đẳng thức đúng với mọi $K\ge1$. Vì $0\le\gamma<1$ (giả thiết O2), $\gamma^K\to0$ khi $K\to\infty$, nên $V^\rho(s)\le U(s)$.

**Bước 6 (trường hợp dấu bằng).** Khi (5.11) là đẳng thức, Bước 1 và Bước 2 cho $\mathbb E_\rho[D_t\mid S_0=s]=0$, nên đẳng thức ở dòng thứ nhất của Bước 4 cho $\mathbb E_\rho[\sum_{t<K}\gamma^tR_{t+1}\mid S_0=s]=U(s)-\gamma^K\mathbb E_\rho[U(S_K)\mid S_0=s]$. Cùng phép chặn phần đuôi cho
$$
\begin{aligned}
&\lvert V^\rho(s)-U(s)\rvert\\
&\quad\le\gamma^K\Bigl(\lVert U\rVert_\infty+\frac{R_{\max}}{1-\gamma}\Bigr)\\
&\quad\xrightarrow[K\to\infty]{}0.
\end{aligned}
$$
Do đó $V^\rho(s)=U(s)$. $\square$

Bổ đề đưa việc so sánh tổng thưởng trên vô hạn bước về việc kiểm tra một bất đẳng thức một bước tại từng lịch sử; đây là lý do phương trình Bellman chỉ cần mô hình một bước.
:::

Định lý sau dùng Bổ đề 13.11 với dấu bằng để đánh giá một chính sách dừng.

::: theorem Định lý 13.12 (Phương trình Bellman cho chính sách dừng) — chứng minh đầy đủ
**Giả thiết.** MDP của Định nghĩa 13.5; $\pi$ là chính sách Markov dừng; giá trị và thưởng được viết thành vector cột theo cùng thứ tự trạng thái.

**Kết luận.** Ma trận $I-\gamma P^\pi$ khả nghịch, và $V^\pi$ là nghiệm duy nhất của phương trình $V=T^\pi V$, tức
$$
\begin{aligned}
&V^\pi(s)\\
&\quad=r^\pi(s)\\
&\qquad+\gamma\sum_{s'}P^\pi(s,s')\\
&\qquad\quad\cdot V^\pi(s'),\\
&V^\pi=(I-\gamma P^\pi)^{-1}r^\pi.
\end{aligned}
\tag{5.12}
$$
:::

::: proof Chứng minh Định lý 13.12
**Lộ trình.** Chứng minh $I-\gamma P^\pi$ khả nghịch, lấy nghiệm $W$ của hệ tuyến tính, rồi dùng Bổ đề 13.11 với dấu bằng để có $V^\pi=W$.

**Bước 1 ($P^\pi$ không làm tăng chuẩn cực đại).** Ma trận $P^\pi$ là ma trận hàng ngẫu nhiên (Mục 5.1). Với mọi $U\in\mathbb R^{\lvert\mathcal S\rvert}$ và mọi $s$,
$$
\begin{aligned}
&\lvert(P^\pi U)(s)\rvert\\
&\quad\le\sum_{s'}P^\pi(s,s')\,\lvert U(s')\rvert\\
&\quad\le\lVert U\rVert_\infty\sum_{s'}P^\pi(s,s')\\
&\quad=\lVert U\rVert_\infty.
\end{aligned}
$$
Lấy cực đại theo $s$ được $\lVert P^\pi U\rVert_\infty\le\lVert U\rVert_\infty$.

**Bước 2 (khả nghịch).** Nếu $(I-\gamma P^\pi)U=0$ thì $U=\gamma P^\pi U$, và Bước 1 cho $\lVert U\rVert_\infty\le\gamma\lVert U\rVert_\infty$. Vì $\gamma<1$, $U=0$. Ma trận vuông có hạt nhân chỉ gồm vector $0$ thì khả nghịch. Đặt $W=(I-\gamma P^\pi)^{-1}r^\pi$; khi đó $W=r^\pi+\gamma P^\pi W$, tức $W=T^\pi W$ theo (5.9).

**Bước 3 ($W$ là giá trị của $\pi$).** Với $\rho=\pi$, mọi $t$ và mọi lịch sử $\tau$, $\rho_t(a\mid\tau)=\pi(a\mid s_\tau)$, nên theo (5.8)
$$
\begin{aligned}
&\sum_a\pi(a\mid s_\tau)\,Q_W(s_\tau,a)\\
&\quad=(T^\pi W)(s_\tau)=W(s_\tau).
\end{aligned}
$$
Đây là (5.11) với dấu bằng và $U=W$. Bổ đề 13.11 cho $V^\pi(s)=W(s)$ với mọi trạng thái đầu $s$.

**Bước 4 (duy nhất).** Nếu $V=r^\pi+\gamma P^\pi V$ thì $(I-\gamma P^\pi)V=r^\pi$, nên $V=W=V^\pi$ theo Bước 2. $\square$

Như vậy, đánh giá một chính sách dừng khi biết mô hình là giải một hệ tuyến tính $\lvert\mathcal S\rvert$ ẩn.
:::

Trong học máy, Định lý 13.12 là bước *đánh giá chính sách* (policy evaluation): khi biết $P$ và $r$, ta tính $V^\pi$ bằng cách giải $(I-\gamma P^\pi)V=r^\pi$, hoặc lặp $V\leftarrow r^\pi+\gamma P^\pi V$ khi $\lvert\mathcal S\rvert$ lớn. Phương trình (5.12) cũng là điều kiện nhất quán mà các thuật toán học giá trị cố gắng thỏa mãn từ dữ liệu. Tính duy nhất của $V^\pi$ không nói $\pi$ tốt hay xấu.

Ví dụ sau dùng (5.12) để so sánh ba chính sách dừng của robot.

::: example Ví dụ 13.5 (Giá trị của ba chính sách dừng của robot)
**Dữ kiện.** Robot của Ví dụ 13.1: tại $h$, $A$ thưởng $1$ và giữ robot ở $h$ với xác suất $1/2$, còn lại sang $z$; $B$ thưởng $0{,}6$ và luôn giữ robot ở $h$; $z$ hấp thụ với thưởng $0$; $\gamma=0{,}9$.

**Giá trị tại $z$.** Mọi phần thưởng nhận được từ $z$ bằng $0$, nên $V(z)=0$ với mọi chính sách; với chính sách dừng, (5.12) tại $z$ cũng cho $V(z)=0{,}9\,V(z)$, tức $V(z)=0$.

**Luôn chọn $A$.** Theo (5.12),
$$
\begin{aligned}
&V^A(h)\\
&\quad=1+0{,}9\bigl(\tfrac12V^A(h)+\tfrac12\cdot0\bigr)\\
&\quad=1+0{,}45\,V^A(h),\\
&0{,}55\,V^A(h)=1,\\
&V^A(h)=\frac{20}{11}\approx1{,}8182.
\end{aligned}
$$

**Luôn chọn $B$.** $V^B(h)=0{,}6+0{,}9\,V^B(h)$, nên $0{,}1\,V^B(h)=0{,}6$ và $V^B(h)=6$.

**Trộn đều hai hành động.** Với $r^\pi(h)=0{,}8$ và $P^\pi(h,h)=0{,}75$ của Ví dụ 13.4,
$$
\begin{aligned}
&V^\pi(h)\\
&\quad=0{,}8+0{,}9\cdot0{,}75\,V^\pi(h)\\
&\quad=0{,}8+0{,}675\,V^\pi(h),\\
&0{,}325\,V^\pi(h)=0{,}8,\\
&V^\pi(h)=\frac{32}{13}\approx2{,}4615.
\end{aligned}
$$

**Kiểm tra lại.** $1+0{,}45\cdot\tfrac{20}{11}=1+\tfrac{9}{11}=\tfrac{20}{11}$; $0{,}6+0{,}9\cdot6=6$; $0{,}8+0{,}675\cdot\tfrac{32}{13}=\tfrac{10{,}4+21{,}6}{13}=\tfrac{32}{13}$.

Chính sách luôn chọn phần thưởng tức thời lớn nhất ($A$) có giá trị thấp nhất trong ba chính sách. Ba con số này chỉ so sánh ba chính sách dừng; các chính sách phụ thuộc lịch sử chưa được xét.
:::

Như vậy, với một chính sách dừng $\pi$ cố định, giá trị $V^\pi$ là nghiệm duy nhất của hệ tuyến tính $(I-\gamma P^\pi)V=r^\pi$ (Định lý 13.12), và Bổ đề 13.11 cho phép so sánh giá trị của một chính sách bất kỳ với một hàm $U$ chỉ bằng kiểm tra một bước. Tuy nhiên, số chính sách tất định dừng là $\prod_s\lvert\mathcal A(s)\rvert$, tăng theo hàm mũ của số trạng thái, và tập chính sách phụ thuộc lịch sử còn lớn hơn. Trong Mục 6, chúng ta tìm một phương trình chọn hành động trực tiếp và chứng minh nghiệm của nó cho chính sách tối ưu.

## 6. Phương trình Bellman tối ưu và lặp giá trị

Định lý 13.12 đánh giá một chính sách đã cố định. Chúng ta cần một phương trình chọn hành động theo giá trị tương lai, một cách giải phương trình đó, và một chứng minh rằng lựa chọn thu được là tối ưu trong mọi chính sách.

Một cách trực quan, tại mỗi trạng thái ta cộng phần thưởng một bước với kỳ vọng giá trị ở trạng thái kế tiếp, rồi chọn hành động có tổng lớn nhất. Đây là bước Bellman của Định lý 07.49, với trạng thái kế tiếp tất định được thay bằng tổng có trọng số xác suất; nó chưa phải định nghĩa.

### 6.1. Toán tử Bellman tối ưu và chính sách tham lam

::: definition Định nghĩa 13.13 (Toán tử Bellman tối ưu và chính sách tham lam)
Cho MDP của Định nghĩa 13.5 và $Q_U$ theo (5.7). *Toán tử Bellman tối ưu* (Bellman optimality operator) $T:\mathbb R^{\lvert\mathcal S\rvert}\to\mathbb R^{\lvert\mathcal S\rvert}$ là
$$
\begin{aligned}
&(TU)(s)\\
&\quad=\max_{a\in\mathcal A(s)}Q_U(s,a)\\
&\quad=\max_{a\in\mathcal A(s)}\Bigl[r(s,a)\\
&\qquad+\gamma\sum_{s'}P(s'\mid s,a)\\
&\qquad\quad\cdot U(s')\Bigr].
\end{aligned}
\tag{6.1}
$$
Một *chính sách tham lam* (greedy policy) theo $U$ là chính sách tất định dừng $\pi_U$ thỏa
$$
\begin{gathered}
\pi_U(s)\in\underset{a\in\mathcal A(s)}{\operatorname{argmax}}\;Q_U(s,a)\\
\text{với mọi }s\in\mathcal S,
\end{gathered}
\tag{6.2}
$$
trong đó khi có nhiều hành động đạt cực đại, ta chọn một hành động theo một quy tắc cố định.
:::

Cực đại trong (6.1) được đạt vì $\mathcal A(s)$ hữu hạn (giả thiết O1), nên chính sách tham lam luôn tồn tại. Theo (5.8) và (6.2), $T^{\pi_U}U=TU$. Với một chính sách dừng $\pi$ bất kỳ, $(T^\pi U)(s)$ là một trung bình có trọng số không âm, tổng trọng số bằng $1$, của các số $Q_U(s,a)$, nên $T^\pi U\le TU$ theo từng tọa độ. Toán tử $T^\pi$ lấy trung bình theo hành động, còn $T$ lấy cực đại.

Với robot, $(TU)(h)=\max\{1+0{,}45\,U(h)+0{,}45\,U(z);\ 0{,}6+0{,}9\,U(h)\}$ và $(TU)(z)=0{,}9\,U(z)$. Với $U=0$, hai giá trị nhìn trước tại $h$ là $1$ và $0{,}6$, nên chính sách tham lam theo $U=0$ chọn $A$: nó chỉ nhìn phần thưởng một bước. Chính sách tham lam theo một $U$ khác có thể chọn khác.

### 6.2. Ánh xạ co và điểm bất động

Ta muốn tìm $U$ thỏa $U=TU$. Cách tự nhiên là lặp $U\leftarrow TU$ từ một vector ban đầu. Phép lặp này hội tụ nếu mỗi lần áp dụng $T$ làm khoảng cách giữa hai vector giảm đi một tỉ lệ cố định nhỏ hơn $1$. Khái niệm sau gọi tên tính chất đó.

::: definition Định nghĩa 13.14 (Ánh xạ co và điểm bất động)
Cho ánh xạ $F:\mathbb R^d\to\mathbb R^d$ và chuẩn cực đại $\lVert\cdot\rVert_\infty$. Ánh xạ $F$ là *ánh xạ co* (contraction mapping) với hệ số $\kappa\in[0,1)$ nếu
$$
\begin{gathered}
\lVert F(x)-F(y)\rVert_\infty\le\kappa\,\lVert x-y\rVert_\infty\\
\text{với mọi }x,y\in\mathbb R^d.
\end{gathered}
$$
Một điểm $\bar x\in\mathbb R^d$ thỏa $F(\bar x)=\bar x$ được gọi là *điểm bất động* (fixed point) của $F$.
:::

Ví dụ: với $d=1$, ánh xạ $F(x)=x/2+1$ thỏa $\lvert F(x)-F(y)\rvert=\tfrac12\lvert x-y\rvert$, nên là ánh xạ co với $\kappa=1/2$; điểm bất động duy nhất là $2$. Phản ví dụ: $F(x)=x+1$ thỏa $\lvert F(x)-F(y)\rvert=\lvert x-y\rvert$ với mọi $x,y$, nên không có $\kappa<1$ nào dùng được, và $F$ không có điểm bất động vì $x=x+1$ vô nghiệm. Hệ số $\kappa$ phụ thuộc chuẩn được chọn; ở đây ta chỉ dùng chuẩn cực đại.

Để chứng minh $T$ là ánh xạ co, ta cần biết phép lấy cực đại có thể khuếch đại sai số bao nhiêu. Bổ đề sau cho thấy phép lấy cực đại không khuếch đại sai số.

::: lemma Bổ đề 13.15 (Sai khác của hai cực đại) — chứng minh đầy đủ
**Giả thiết.** $f,g$ là hai hàm số thực trên cùng một tập hữu hạn khác rỗng $\mathcal A$.

**Kết luận.**
$$
\begin{aligned}
&\Bigl\lvert\max_{a\in\mathcal A}f(a)-\max_{a\in\mathcal A}g(a)\Bigr\rvert\\
&\quad\le\max_{a\in\mathcal A}\lvert f(a)-g(a)\rvert.
\end{aligned}
\tag{6.3}
$$
:::

::: proof Chứng minh Bổ đề 13.15
**Lộ trình.** Chặn từng chiều của hiệu, rồi ghép.

**Bước 1 (một chiều).** Đặt $\delta=\max_a\lvert f(a)-g(a)\rvert$, có vì $\mathcal A$ hữu hạn. Với mọi $a$,
$$
\begin{aligned}
f(a)&=g(a)+\bigl(f(a)-g(a)\bigr)\\
&\le g(a)+\delta\\
&\le\max_bg(b)+\delta.
\end{aligned}
$$
Vế phải không phụ thuộc $a$, nên lấy cực đại theo $a$ ở vế trái được $\max_af(a)-\max_bg(b)\le\delta$.

**Bước 2 (chiều ngược).** Đổi vai $f$ và $g$ trong Bước 1, với cùng $\delta$, được $\max_bg(b)-\max_af(a)\le\delta$.

**Bước 3 (ghép).** Một số thực mà cả nó và số đối của nó đều không vượt $\delta$ thì có trị tuyệt đối không vượt $\delta$; đó là (6.3). $\square$

Hai cực đại có thể đạt tại hai hành động khác nhau, nhưng chênh lệch giữa chúng không vượt chênh lệch lớn nhất giữa hai bảng giá trị.
:::

Bổ đề 13.15 và tính chuẩn hóa của các hàng xác suất đủ để chặn sai khác của các toán tử Bellman.

::: proposition Mệnh đề 13.16 (Tính co của các toán tử Bellman) — chứng minh đầy đủ
**Giả thiết.** MDP của Định nghĩa 13.5; $T$ theo (6.1); $\pi$ là chính sách Markov dừng và $T^\pi$ theo (5.8).

**Kết luận.** Với mọi $U,W\in\mathbb R^{\lvert\mathcal S\rvert}$,
$$
\begin{aligned}
&\lVert TU-TW\rVert_\infty\\
&\quad\le\gamma\,\lVert U-W\rVert_\infty,\\
&\lVert T^\pi U-T^\pi W\rVert_\infty\\
&\quad\le\gamma\,\lVert U-W\rVert_\infty.
\end{aligned}
\tag{6.4}
$$
Nghĩa là $T$ và $T^\pi$ là ánh xạ co với hệ số $\gamma$.
:::

::: proof Chứng minh Mệnh đề 13.16
**Lộ trình.** Chặn sai khác của giá trị nhìn trước cho từng hành động, rồi giữ chặn đó qua phép lấy cực đại (Bổ đề 13.15) hoặc phép lấy trung bình.

**Bước 1 (một hành động).** Với mỗi $s$ và $a$, phần thưởng $r(s,a)$ triệt tiêu khi lấy hiệu, nên
$$
\begin{aligned}
&\lvert Q_U(s,a)-Q_W(s,a)\rvert\\
&\quad=\gamma\Bigl\lvert\sum_{s'}P(s'\mid s,a)\\
&\qquad\quad\cdot\bigl(U(s')-W(s')\bigr)\Bigr\rvert\\
&\quad\le\gamma\sum_{s'}P(s'\mid s,a)\\
&\qquad\quad\cdot\lvert U(s')-W(s')\rvert\\
&\quad\le\gamma\,\lVert U-W\rVert_\infty\sum_{s'}P(s'\mid s,a)\\
&\quad=\gamma\,\lVert U-W\rVert_\infty.
\end{aligned}
$$
Dòng thứ hai dùng bất đẳng thức tam giác và $P(s'\mid s,a)\ge0$; dòng thứ ba dùng tổng các xác suất chuyển bằng $1$.

**Bước 2 (toán tử tối ưu).** Áp dụng Bổ đề 13.15 với $f(a)=Q_U(s,a)$, $g(a)=Q_W(s,a)$ trên $\mathcal A(s)$, rồi dùng Bước 1:
$$
\begin{aligned}
&\lvert(TU)(s)-(TW)(s)\rvert\\
&\quad\le\max_a\lvert Q_U(s,a)-Q_W(s,a)\rvert\\
&\quad\le\gamma\,\lVert U-W\rVert_\infty.
\end{aligned}
$$
Lấy cực đại theo $s$ được bất đẳng thức thứ nhất của (6.4).

**Bước 3 (toán tử theo chính sách).** Vì các trọng số $\pi(a\mid s)$ không âm, có tổng bằng $1$,
$$
\begin{aligned}
&\lvert(T^\pi U)(s)-(T^\pi W)(s)\rvert\\
&\quad\le\sum_a\pi(a\mid s)\\
&\qquad\quad\times\lvert Q_U(s,a)-Q_W(s,a)\rvert\\
&\quad\le\gamma\,\lVert U-W\rVert_\infty.
\end{aligned}
$$
Lấy cực đại theo $s$ được bất đẳng thức thứ hai. $\square$

Phép lấy kỳ vọng theo trạng thái kế tiếp và phép chọn hành động đều không làm tăng sai số; chỉ có hệ số chiết khấu làm sai số co lại.
:::

Từ tính co, định lý sau cho sự tồn tại, tính duy nhất của điểm bất động và sự hội tụ của phép lặp. Đây là trường hợp hữu hạn chiều của định lý điểm bất động Banach. Chứng minh chỉ thừa nhận một kết quả của giải tích: mọi dãy Cauchy số thực đều hội tụ.

::: theorem Định lý 13.17 (Điểm bất động của ánh xạ co trên $\mathbb R^d$) — chứng minh đầy đủ
**Giả thiết.** $F:\mathbb R^d\to\mathbb R^d$ là ánh xạ co với hệ số $\kappa\in[0,1)$ trong chuẩn cực đại (Định nghĩa 13.14).

**Bảo đảm.** $F$ có đúng một điểm bất động $\bar x$. Với mọi $x_0\in\mathbb R^d$, dãy $x_{k+1}=F(x_k)$ hội tụ tới $\bar x$, và với mọi $k\ge0$,
$$
\begin{aligned}
&\lVert x_k-\bar x\rVert_\infty\\
&\quad\le\kappa^k\,\lVert x_0-\bar x\rVert_\infty,\\
&\lVert x_k-\bar x\rVert_\infty\\
&\quad\le\frac{\kappa^k}{1-\kappa}\,\lVert x_1-x_0\rVert_\infty.
\end{aligned}
\tag{6.5}
$$
Đây là bảo đảm tất định: hội tụ với tốc độ cấp số nhân hệ số $\kappa$ trong chuẩn cực đại, từ mọi điểm đầu.
:::

::: proof Chứng minh Định lý 13.17
**Lộ trình.** Tính co cho hiệu hai phần tử liên tiếp giảm theo cấp số nhân; từ đó dãy là Cauchy, từng tọa độ hội tụ, và giới hạn là điểm bất động. Tính duy nhất và tốc độ suy trực tiếp từ tính co.

**Bước 1 (duy nhất).** Nếu $\bar x$ và $\bar y$ đều là điểm bất động thì
$$
\begin{aligned}
\lVert\bar x-\bar y\rVert_\infty&=\lVert F(\bar x)-F(\bar y)\rVert_\infty\\
&\le\kappa\,\lVert\bar x-\bar y\rVert_\infty,
\end{aligned}
$$
nên $(1-\kappa)\lVert\bar x-\bar y\rVert_\infty\le0$. Vì $\kappa<1$, $\bar x=\bar y$.

**Bước 2 (hiệu liên tiếp).** Đặt $\delta_0=\lVert x_1-x_0\rVert_\infty$. Với $j\ge1$, tính co cho $\lVert x_{j+1}-x_j\rVert_\infty=\lVert F(x_j)-F(x_{j-1})\rVert_\infty\le\kappa\,\lVert x_j-x_{j-1}\rVert_\infty$. Quy nạp theo $j$ được $\lVert x_{j+1}-x_j\rVert_\infty\le\kappa^j\delta_0$ với mọi $j\ge0$.

**Bước 3 (dãy Cauchy).** Với $\ell>k$, bất đẳng thức tam giác và Bước 2 cho
$$
\begin{aligned}
&\lVert x_\ell-x_k\rVert_\infty\\
&\quad\le\sum_{j=k}^{\ell-1}\lVert x_{j+1}-x_j\rVert_\infty\\
&\quad\le\sum_{j=k}^{\ell-1}\kappa^j\delta_0\le\frac{\kappa^k}{1-\kappa}\,\delta_0.
\end{aligned}
\tag{6.6}
$$

**Bước 4 (giới hạn).** Với mỗi tọa độ $i$, $\lvert x_\ell(i)-x_k(i)\rvert\le\lVert x_\ell-x_k\rVert_\infty\le\kappa^k\delta_0/(1-\kappa)$, và vế phải tiến về $0$ khi $k\to\infty$. Vậy dãy số thực $(x_k(i))_{k\ge0}$ là dãy Cauchy, nên hội tụ tới một số $\bar x(i)$ theo tính đầy đủ của $\mathbb R$. Cho $\ell\to\infty$ trong bất đẳng thức tọa độ được $\lvert\bar x(i)-x_k(i)\rvert\le\kappa^k\delta_0/(1-\kappa)$. Vì chỉ có $d$ tọa độ, lấy cực đại theo $i$ cho
$$
\begin{aligned}
\lVert x_k-\bar x\rVert_\infty&\le\frac{\kappa^k}{1-\kappa}\,\delta_0\\
&\xrightarrow[k\to\infty]{}0.
\end{aligned}
$$
Đây là bất đẳng thức thứ hai của (6.5).

**Bước 5 (giới hạn là điểm bất động).** Với mọi $k$, bất đẳng thức tam giác và tính co cho
$$
\begin{aligned}
&\lVert F(\bar x)-\bar x\rVert_\infty\\
&\quad\le\lVert F(\bar x)-F(x_k)\rVert_\infty\\
&\qquad+\lVert x_{k+1}-\bar x\rVert_\infty\\
&\quad\le\kappa\,\lVert\bar x-x_k\rVert_\infty\\
&\qquad+\lVert x_{k+1}-\bar x\rVert_\infty.
\end{aligned}
$$
Theo Bước 4, vế phải tiến về $0$ khi $k\to\infty$, còn vế trái không phụ thuộc $k$. Vậy $F(\bar x)=\bar x$.

**Bước 6 (tốc độ).** Vì $\bar x=F(\bar x)$, với $k\ge1$ ta có $\lVert x_k-\bar x\rVert_\infty=\lVert F(x_{k-1})-F(\bar x)\rVert_\infty\le\kappa\,\lVert x_{k-1}-\bar x\rVert_\infty$. Quy nạp được bất đẳng thức thứ nhất của (6.5); với $k=0$ nó là đẳng thức. $\square$

Khi $\kappa=0$, $F$ là hằng và dãy đạt điểm bất động sau một bước; khi $\kappa$ gần $1$, số vòng cần để đạt một độ chính xác cho trước tăng lên.
:::

Áp dụng Định lý 13.17 cho hai toán tử Bellman, với hệ số co $\gamma$ của Mệnh đề 13.16, được hệ quả sau.

::: corollary Hệ quả 13.18 (Hội tụ của lặp giá trị) — chứng minh đầy đủ
**Giả thiết.** MDP của Định nghĩa 13.5; các toán tử $T$, $T^\pi$ được tính chính xác (giả thiết O3).

**Bảo đảm.** Toán tử $T$ có đúng một điểm bất động $\bar V$. Với mọi $V_0\in\mathbb R^{\lvert\mathcal S\rvert}$, dãy *lặp giá trị* (value iteration) $V_{k+1}=TV_k$ thỏa
$$
\begin{aligned}
&\lVert V_k-\bar V\rVert_\infty\\
&\quad\le\gamma^k\,\lVert V_0-\bar V\rVert_\infty,\\
&k\ge0.
\end{aligned}
\tag{6.7}
$$
Với mỗi chính sách Markov dừng $\pi$, điểm bất động duy nhất của $T^\pi$ là $V^\pi$.
:::

::: proof Chứng minh Hệ quả 13.18
Theo Mệnh đề 13.16, $T$ và $T^\pi$ là ánh xạ co hệ số $\gamma\in[0,1)$ trên $\mathbb R^{\lvert\mathcal S\rvert}$. Định lý 13.17 với $F=T$, $\kappa=\gamma$ cho điểm bất động duy nhất $\bar V$ và (6.7). Định lý 13.17 với $F=T^\pi$ cho điểm bất động duy nhất; theo Định lý 13.12, $V^\pi=T^\pi V^\pi$, nên điểm đó là $V^\pi$. $\square$

Với mô hình đã biết, lặp giá trị hội tụ từ mọi vector ban đầu, và sai số giảm ít nhất theo hệ số $\gamma$ mỗi vòng.
:::

Hệ quả 13.18 cho một vector $\bar V$ duy nhất thỏa $\bar V=T\bar V$ và một thuật toán tìm nó. Nó chưa cho biết $\bar V$ có bằng giá trị tối ưu $V^*$ của (5.5) hay không: $V^*$ được định nghĩa bằng cận trên theo mọi chính sách, còn $\bar V$ là nghiệm của một phương trình.

Trong học máy, Hệ quả 13.18 giải thích sự hội tụ của một phép quy hoạch khi bảng mô hình $P,r$ được biết và các bước Bellman được tính chính xác. Sai số ban đầu giảm theo $\gamma^k$; với $\gamma=0{,}99$, cần khoảng $230$ vòng để giảm sai số đi $10$ lần ($0{,}99^{230}\approx0{,}099$). Hệ quả không nói gì về sai số do lấy mẫu hay do xấp xỉ hàm, vì toán tử đang xét không chứa các bước đó.

### 6.3. Điểm bất động và giá trị tối ưu

Để nối nghiệm $\bar V$ với bài toán quyết định, chúng ta chứng minh hai chiều: chính sách tham lam theo $\bar V$ đạt $\bar V$, và không chính sách nào, kể cả chính sách phụ thuộc toàn bộ lịch sử, có giá trị lớn hơn $\bar V$. Cả hai chiều là Bổ đề 13.11 áp dụng với $U=\bar V$.

::: theorem Định lý 13.19 (Bellman tối ưu và chính sách tham lam tối ưu) — chứng minh đầy đủ
**Giả thiết.**

- **Mô hình:** MDP của Định nghĩa 13.5.
- **Điểm bất động:** $\bar V=T\bar V$ (Hệ quả 13.18).
- **Chính sách:** $\pi^*=\pi_{\bar V}$ là một chính sách tham lam theo $\bar V$, tức $\pi^*(s)\in\operatorname{argmax}_aQ_{\bar V}(s,a)$.

**Kết luận.**

- $V^{\pi^*}=\bar V=V^*$; do đó $\pi^*$ là chính sách tối ưu, và luôn tồn tại một chính sách tối ưu tất định dừng.
- $V^*$ là nghiệm duy nhất của *phương trình Bellman tối ưu* (Bellman optimality equation)
$$
\begin{aligned}
&V^*(s)\\
&\quad=\max_{a\in\mathcal A(s)}\Bigl[r(s,a)\\
&\qquad+\gamma\sum_{s'}P(s'\mid s,a)\\
&\qquad\quad\cdot V^*(s')\Bigr],\\
&s\in\mathcal S.
\end{aligned}
\tag{6.8}
$$
:::

::: proof Chứng minh Định lý 13.19
**Lộ trình.** Bổ đề 13.11 với dấu bằng cho $V^{\pi^*}=\bar V$; Bổ đề 13.11 với dấu "$\le$" cho $V^\rho\le\bar V$ với mọi $\rho$; ghép hai chiều.

**Bước 1 ($\pi^*$ đạt $\bar V$).** Với $\rho=\pi^*$, mọi $t$ và mọi lịch sử $\tau$, chính sách chọn $\pi^*(s_\tau)$ với xác suất $1$, nên
$$
\begin{aligned}
&\sum_a\rho_t(a\mid\tau)\,Q_{\bar V}(s_\tau,a)\\
&\quad=Q_{\bar V}\bigl(s_\tau,\pi^*(s_\tau)\bigr)\\
&\quad=\max_aQ_{\bar V}(s_\tau,a)\\
&\quad=(T\bar V)(s_\tau)=\bar V(s_\tau).
\end{aligned}
$$
Đẳng thức thứ hai dùng (6.2), đẳng thức cuối dùng $\bar V=T\bar V$. Bổ đề 13.11 với dấu bằng cho $V^{\pi^*}(s)=\bar V(s)$ với mọi $s$.

**Bước 2 (không chính sách nào vượt $\bar V$).** Cho $\rho$ là một chính sách tổng quát. Với mọi $t$ và mọi lịch sử $\tau$, các trọng số $\rho_t(a\mid\tau)$ không âm và có tổng bằng $1$, nên
$$
\begin{aligned}
&\sum_a\rho_t(a\mid\tau)\,Q_{\bar V}(s_\tau,a)\\
&\quad\le\sum_a\rho_t(a\mid\tau)\max_bQ_{\bar V}(s_\tau,b)\\
&\quad=(T\bar V)(s_\tau)=\bar V(s_\tau).
\end{aligned}
$$
Đây là (5.11) với $U=\bar V$. Bổ đề 13.11 cho $V^\rho(s)\le\bar V(s)$ với mọi $s$.

**Bước 3 (giá trị tối ưu).** Theo Bước 1, định nghĩa (5.5) và Bước 2, với mọi $s$,
$$
\begin{aligned}
\bar V(s)&=V^{\pi^*}(s)\le\sup_\rho V^\rho(s)\\
&=V^*(s)\le\bar V(s).
\end{aligned}
$$
Do đó $V^*=\bar V=V^{\pi^*}$, và $\pi^*$ là chính sách tối ưu.

**Bước 4 (phương trình Bellman tối ưu).** Vì $V^*=\bar V=T\bar V=TV^*$, giá trị tối ưu thỏa (6.8). Nếu $U$ cũng thỏa (6.8) thì $U=TU$, và Hệ quả 13.18 cho $U=\bar V=V^*$. $\square$

Lặp giá trị tìm $\bar V$; định lý này cho biết $\bar V$ chính là giá trị tối ưu và chính sách tham lam theo nó là tối ưu, nên chỉ cần tìm trong các chính sách tất định dừng.
:::

Định lý 13.19 trả lời câu hỏi trung tâm cho một MDP hữu hạn có chiết khấu và mô hình đã biết: giải $V^*=TV^*$, rồi tại mỗi trạng thái chọn hành động cực đại hóa $r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)V^*(s')$. Hành động này không nhất thiết có phần thưởng tức thời lớn nhất, vì vế phải còn chứa giá trị ở các trạng thái kế tiếp. Giá trị tối ưu là duy nhất, nhưng chính sách tối ưu có thể không duy nhất khi nhiều hành động cùng đạt cực đại.

::: remark Nhận xét 13.20 (Trường hợp tất định và quy hoạch động của Bài 07)
1. Nếu mỗi hàng $P(\cdot\mid s,a)$ dồn toàn bộ xác suất vào một trạng thái $f(s,a)$, tổng theo $s'$ trong (6.8) chỉ còn một số hạng và phương trình thành $V^*(s)=\max_a\{r(s,a)+\gamma V^*(f(s,a))\}$.
2. Đọc thêm: với $M$ giai đoạn, không chiết khấu, mô hình $P_k$ và phần thưởng $r_k$ đổi theo giai đoạn, lập luận một bước của Bổ đề 13.10 dẫn tới truy hồi ngược $W_k(s)=\max_a\bigl[r_k(s,a)+\sum_{s'}P_k(s'\mid s,a)W_{k+1}(s')\bigr]$ với giá trị cuối $W_M$ cho trước; truy hồi đó không được chứng minh lại ở đây. Khi chuyển tiếp tất định, $P_k(\cdot\mid s,a)$ dồn vào $f_k(s,a)$. Chọn $r_k=-g_k$ và $W_M=-g_M$; vì $\max_a(-d_a)=-\min_ad_a$, quy nạp ngược cho $W_k=-J_k$, với $J_k$ là chi phí tối ưu còn lại của Định nghĩa 07.48, và truy hồi trở thành phương trình của Định lý 07.49 (với $N=M$). Như vậy, Định lý 07.49 là trường hợp riêng tất định, hữu hạn bước của quy hoạch động.
3. Với vô hạn bước và $\gamma<1$, không có điều kiện cuối để truy hồi ngược. Phương trình (6.8) không phụ thuộc thời gian, và nghiệm của nó được tìm như điểm bất động của $T$.
:::

Ví dụ sau thực hiện lặp giá trị cho robot và trả lời câu hỏi mở đầu.

::: example Ví dụ 13.6 (Lặp giá trị cho robot)
**Dữ kiện.** Robot của Ví dụ 13.1: tại $h$, $A$ thưởng $1$ rồi ở lại $h$ với xác suất $0{,}5$ và sang $z$ với xác suất $0{,}5$; $B$ thưởng $0{,}6$ rồi chắc chắn ở lại $h$; $z$ hấp thụ với thưởng $0$; $\gamma=0{,}9$; $V_0(h)=V_0(z)=0$.

**Rút về một biến.** Vì $(TV)(z)=0{,}9\,V(z)$ và $V_0(z)=0$, quy nạp cho $V_k(z)=0$ với mọi $k$. Đặt $v_k=V_k(h)$; theo (6.1), bước Bellman là
$$
\begin{aligned}
v_{k+1}&=\max\{Q_{V_k}(h,A);\\
&\qquad Q_{V_k}(h,B)\}\\
&=\max\{1+0{,}45\,v_k;\\
&\qquad0{,}6+0{,}9\,v_k\}.
\end{aligned}
\tag{6.9}
$$

**Bốn vòng đầu.** Cột "Hành động đạt cực đại" ghi hành động cho giá trị lớn hơn khi tính $v_{k+1}$ từ $v_k$.

| $k$ | $v_k$ | $Q_{V_k}(h,A)=1+0{,}45\,v_k$ | $Q_{V_k}(h,B)=0{,}6+0{,}9\,v_k$ | Hành động đạt cực đại | $v_{k+1}$ |
|---:|---:|---:|---:|---|---:|
| 0 | 0 | 1 | 0,6 | $A$ | 1 |
| 1 | 1 | 1,45 | 1,5 | $B$ | 1,5 |
| 2 | 1,5 | 1,675 | 1,95 | $B$ | 1,95 |
| 3 | 1,95 | 1,8775 | 2,355 | $B$ | 2,355 |

**Điểm bất động.** Ứng viên từ nhánh $B$ thỏa $v=0{,}6+0{,}9v$, tức $0{,}1v=0{,}6$ và $v=6$. Tại $v=6$, nhánh $A$ bằng $1+0{,}45\cdot6=3{,}7<6$, nên $\max\{3{,}7;\,6\}=6$ và vector $(6;\,0)$ thỏa $V=TV$. Theo Hệ quả 13.18, đây là điểm bất động duy nhất; theo Định lý 13.19, $V^*(h)=6$ và chính sách tham lam theo $V^*$ chọn $B$ tại $h$.

**Kiểm tra lại.** Giá trị của chính sách luôn chọn $B$ tính bằng (5.12) ở Ví dụ 13.5 cũng bằng $6$. Chặn (6.7) tại $k=3$: $\lvert v_3-6\rvert=4{,}05\le0{,}9^3\cdot6=4{,}374$.

**Khi nào nhánh $B$ thắng.** $0{,}6+0{,}9v\ge1+0{,}45v$ tương đương $0{,}45v\ge0{,}4$, tức $v\ge8/9$. Vòng đầu có $v_0=0<8/9$ nên chọn $A$: khi chưa có giá trị cho phần đuôi, phép lặp chỉ thấy phần thưởng trước mắt. Với mọi $k\ge1$ ta có $v_k\ge1$: điều này đúng với $k=1$, và nếu $v_k\ge1$ thì $v_{k+1}\ge0{,}6+0{,}9\cdot1=1{,}5\ge1$. Do đó $v_k\ge1>8/9$, và nhánh $B$ thắng ở mọi vòng từ $k=1$.

**Chỉ số vòng không phải thời gian.** Chỉ số $k$ đếm vòng tính toán, không phải thời điểm robot hành động; bảng không mô tả một quỹ đạo chọn $A$ rồi chuyển sang $B$. Chính sách tối ưu chọn $B$ tại $h$ ở mọi thời điểm và đạt $6$, còn chính sách luôn chọn phần thưởng tức thời lớn nhất ($A$) chỉ đạt $20/11\approx1{,}82$.
:::

![Hai đồ thị. Bên trái: trục hoành là giá trị tiếp diễn v từ 0 đến 7, trục tung là giá trị sau một phép cập nhật. Đường Q_A(v) = 1 + 0,45v có độ dốc nhỏ, đường Q_B(v) = 0,6 + 0,9v có độ dốc lớn; hai đường cắt nhau tại v = 8/9; đường Q_B cắt đường chéo v_{k+1} = v_k tại v* = 6. Bên phải: giá trị tại trạng thái hoạt động theo số vòng lặp k từ 0 đến 30; dãy v_k tăng qua 1; 1,5; 1,95; 2,355 và tiến tới đường ngang v* = 6. Điểm đầu tiên được tạo bởi A, các điểm sau bởi B.](img/lec-13/value-iteration.svg)

*Hình 13.2. Bên trái, hai nhánh Bellman của (6.9) đổi thứ tự tại $v=8/9$, và giao của nhánh trên với đường chéo là $V^*(h)=6$. Bên phải, dãy $v_k$ của Ví dụ 13.6 tăng dần và tiến tới $6$; nhánh $A$ chỉ tạo $v_1$.*

### 6.4. Mở rộng: sai số tính toán và điều kiện dừng

Chặn (6.7) chứa $\bar V=V^*$ chưa biết, nên không dùng trực tiếp được để dừng thuật toán. Tuy nhiên, chênh lệch giữa $TV$ và $V$ tính được khi mô hình đã biết; nó đo mức một vector vi phạm phương trình Bellman. Hệ quả sau suy từ tính co của $T$ (Mệnh đề 13.16) và Định lý 13.19.

::: corollary Hệ quả 13.21 (Chặn bằng phần dư Bellman) — chứng minh đầy đủ
**Giả thiết.** MDP của Định nghĩa 13.5; $V\in\mathbb R^{\lvert\mathcal S\rvert}$ bất kỳ; *phần dư Bellman* (Bellman residual, còn gọi là Bellman error) của $V$ là $\beta(V)=\lVert TV-V\rVert_\infty$.

**Bảo đảm.** Với $V^*=TV^*$ theo Định lý 13.19,
$$
\begin{aligned}
\lVert V-V^*\rVert_\infty&\le\frac{\beta(V)}{1-\gamma},\\
\lVert TV-V^*\rVert_\infty&\le\frac{\gamma\,\beta(V)}{1-\gamma}.
\end{aligned}
\tag{6.10}
$$
Đây là chặn tất định, tính được từ $V$ và $TV$, theo mô hình $P,r$ đang dùng.
:::

::: proof Chứng minh Hệ quả 13.21
**Lộ trình.** Chèn $TV$ giữa $V$ và $V^*$, rồi dùng tính co.

**Bước 1 (chặn thứ nhất).** Vì $V^*=TV^*$, bất đẳng thức tam giác và (6.4) cho
$$
\begin{aligned}
&\lVert V-V^*\rVert_\infty\\
&\quad\le\lVert V-TV\rVert_\infty\\
&\qquad+\lVert TV-TV^*\rVert_\infty\\
&\quad\le\beta(V)+\gamma\,\lVert V-V^*\rVert_\infty.
\end{aligned}
$$
Chuyển vế và chia cho $1-\gamma>0$ được chặn thứ nhất.

**Bước 2 (chặn thứ hai).** Lại dùng $V^*=TV^*$, (6.4) và Bước 1:
$$
\begin{aligned}
\lVert TV-V^*\rVert_\infty&=\lVert TV-TV^*\rVert_\infty\\
&\le\gamma\,\lVert V-V^*\rVert_\infty\\
&\le\frac{\gamma\,\beta(V)}{1-\gamma}.
\end{aligned}
$$
$\square$

Điều kiện $\beta(V)\le(1-\gamma)\varepsilon$ đủ để bảo đảm $V$ cách $V^*$ không quá $\varepsilon$, và $TV$ cách $V^*$ không quá $\gamma\varepsilon$.
:::

Câu hỏi trung tâm cần một chính sách, không chỉ một vector giá trị. Khi dừng với một vector $V$ gần $V^*$, ta dùng chính sách tham lam theo $V$; mệnh đề sau chặn mất mát của chính sách đó.

::: proposition Mệnh đề 13.22 (Chính sách tham lam theo một vector gần đúng) — chứng minh đầy đủ
**Giả thiết.** MDP của Định nghĩa 13.5; $V\in\mathbb R^{\lvert\mathcal S\rvert}$ bất kỳ; $\pi_V$ là chính sách tham lam theo $V$ (6.2).

**Bảo đảm.**
$$
\begin{aligned}
&\lVert V^{\pi_V}-V^*\rVert_\infty\\
&\quad\le\frac{2\gamma}{1-\gamma}\,\lVert V-V^*\rVert_\infty.
\end{aligned}
\tag{6.11}
$$
:::

::: proof Chứng minh Mệnh đề 13.22
**Lộ trình.** Viết $V^{\pi_V}$ và $V^*$ là điểm bất động của $T^{\pi_V}$ và $T$, chèn $T^{\pi_V}V=TV$, rồi dùng tính co hai lần.

**Bước 1 (ba đẳng thức).** Theo Định lý 13.12, $V^{\pi_V}=T^{\pi_V}V^{\pi_V}$. Theo Định lý 13.19, $V^*=TV^*$. Theo Định nghĩa 13.13, $T^{\pi_V}V=TV$.

**Bước 2 (chặn).** Bất đẳng thức tam giác và (6.4) cho
$$
\begin{aligned}
&\lVert V^{\pi_V}-V^*\rVert_\infty\\
&\quad\le\lVert T^{\pi_V}V^{\pi_V}-T^{\pi_V}V\rVert_\infty\\
&\qquad+\lVert TV-TV^*\rVert_\infty\\
&\quad\le\gamma\,\lVert V^{\pi_V}-V\rVert_\infty\\
&\qquad+\gamma\,\lVert V-V^*\rVert_\infty\\
&\quad\le\gamma\,\lVert V^{\pi_V}-V^*\rVert_\infty\\
&\qquad+2\gamma\,\lVert V-V^*\rVert_\infty.
\end{aligned}
$$
Dòng thứ nhất dùng Bước 1 để viết $V^{\pi_V}-V^*=(T^{\pi_V}V^{\pi_V}-T^{\pi_V}V)+(TV-TV^*)$; dòng cuối dùng $\lVert V^{\pi_V}-V\rVert_\infty\le\lVert V^{\pi_V}-V^*\rVert_\infty+\lVert V^*-V\rVert_\infty$.

**Bước 3 (chuyển vế).** Chuyển $\gamma\lVert V^{\pi_V}-V^*\rVert_\infty$ sang vế trái và chia cho $1-\gamma>0$ được (6.11). $\square$

Một vector giá trị sai lệch $\varepsilon$ cho một chính sách tham lam mất không quá $2\gamma\varepsilon/(1-\gamma)$ giá trị tại mọi trạng thái.
:::

Hai kết quả trên cho thuật toán sau: lặp $T$ đến khi phần dư đủ nhỏ, rồi trả về cả vector giá trị và chính sách tham lam theo nó.

::: algorithm Thuật toán 13.23 (Lặp giá trị với chứng nhận sai số)
**Đầu vào.** MDP hữu hạn với $P$, $r$ đã biết; $\gamma\in[0,1)$; mức sai số $\varepsilon>0$; vector ban đầu $V_0$ (thường lấy $V_0=0$).

**Khởi tạo.** Đặt $k=0$.

**Cập nhật.** Với mọi $s$ và mọi $a\in\mathcal A(s)$, tính $Q_{V_k}(s,a)$ theo (5.7) từ toàn bộ vector $V_k$. Đặt $W(s)=\max_aQ_{V_k}(s,a)$, tức $W=TV_k$, và $\beta_k=\lVert W-V_k\rVert_\infty$. Nếu điều kiện dừng chưa thỏa, đặt $V_{k+1}=W$, tăng $k$ thêm $1$ và lặp lại.

**Điều kiện dừng.** $\beta_k\le(1-\gamma)\varepsilon$.

**Đầu ra.** Vector $V_k$ và chính sách tham lam $\pi_k$ với $\pi_k(s)\in\operatorname{argmax}_aQ_{V_k}(s,a)$, lấy từ các giá trị đã tính ở bước cập nhật cuối. Theo Hệ quả 13.21, $\lVert V_k-V^*\rVert_\infty\le\varepsilon$; theo Mệnh đề 13.22, $\lVert V^{\pi_k}-V^*\rVert_\infty\le2\gamma\varepsilon/(1-\gamma)$.

**Chi phí.** Mỗi vòng tính $\sum_s\lvert\mathcal A(s)\rvert$ giá trị nhìn trước, mỗi giá trị cần một tổng trên $\lvert\mathcal S\rvert$ trạng thái kế tiếp: bậc $\lvert\mathcal S\rvert^2\max_s\lvert\mathcal A(s)\rvert$ phép toán với bảng chuyển dày, ít hơn khi chỉ cộng trên các trạng thái kế tiếp có xác suất dương. Vì $\beta_k=\lVert V_{k+1}-V_k\rVert_\infty\le\gamma^k\beta_0$ (Bước 2 của chứng minh Định lý 13.17), điều kiện dừng thỏa sau hữu hạn vòng; khi $\gamma=0$, $\beta_1=0$ nên thuật toán dừng muộn nhất tại $k=1$.
:::

Với robot, $\varepsilon=0{,}1$ và $V_0=0$, điều kiện dừng là $\beta_k\le0{,}01$. Thuật toán dừng tại $k=39$ với $v_{39}\approx5{,}9088$; sai số thật $6-v_{39}\approx0{,}0912\le0{,}1$. Vì $v_k\ge1>8/9$ với mọi $k\ge1$ (Ví dụ 13.6), chính sách $\pi_{39}$ chọn $B$, đúng là chính sách tối ưu.

Trong học máy, Hệ quả 13.21 tách độ chính xác của phép quy hoạch khỏi độ đúng của mô hình. Một phần dư nhỏ chứng nhận rằng ta đã gần giải đúng phương trình Bellman của $P,r$ đang dùng; nó không chứng nhận rằng $P,r$ mô tả đúng robot ngoài thực tế.

Ví dụ sau cho thấy cùng một phần dư cho hai chặn khác nhau, tùy vector được chứng nhận.

::: example Ví dụ 13.7 (Chỉ số trong chặn phần dư)
**Dữ kiện.** Robot của Ví dụ 13.1 với $\gamma=0{,}9$. Xét $V(h)=1{,}95$, $V(z)=0$, là $V_3$ của Ví dụ 13.6. Giá trị tối ưu $V^*(h)=6$, $V^*(z)=0$.

**Phần dư.** Theo (6.1),
$$
\begin{aligned}
Q_V(h,A)&=1+0{,}45\cdot1{,}95\\
&=1{,}8775,\\
Q_V(h,B)&=0{,}6+0{,}9\cdot1{,}95\\
&=2{,}355,
\end{aligned}
$$
nên $(TV)(h)=2{,}355$, $(TV)(z)=0$ và $\beta(V)=\lvert2{,}355-1{,}95\rvert=0{,}405$.

**Hai chặn.** Theo (6.10), $\lVert V-V^*\rVert_\infty\le0{,}405/0{,}1=4{,}05$ và $\lVert TV-V^*\rVert_\infty\le0{,}9\cdot0{,}405/0{,}1=3{,}645$.

**Kiểm tra lại.** Sai số thật là $6-1{,}95=4{,}05$ và $6-2{,}355=3{,}645$; cả hai chặn đều đạt dấu bằng.

Chặn có hệ số $\gamma$ chỉ áp dụng cho vector sau cập nhật $TV$; dùng nó cho chính $V$ sẽ báo sai số $3{,}645$ trong khi sai số thật là $4{,}05$.
:::

### 6.5. Khi bỏ giả thiết chiết khấu

Các kết quả của Mục 5 và Mục 6 dùng $\gamma<1$: Mệnh đề 13.8 và Bổ đề 13.11 cần nó để phần đuôi tiến về $0$, Định lý 13.17 cần $\kappa=\gamma<1$. Nhận xét và ví dụ sau cho thấy điều gì xảy ra khi bỏ giả thiết đó.

::: remark Nhận xét 13.24 (Điểm bất động khi không chiết khấu)
1. Với $\gamma=1$, Bước 1 của chứng minh Mệnh đề 13.16 chỉ cho hệ số $1$, nên $T$ không còn là ánh xạ co. Giá trị có thể vô hạn, hoặc phương trình Bellman có nhiều nghiệm.
2. Một bài toán hữu hạn bước có thể không cần chiết khấu và vẫn giải được bằng truy hồi ngược như Bài 07 (Nhận xét 13.20). Đó là một thiết lập khác với bài toán vô hạn bước.
3. Một trạng thái hấp thụ với thưởng $0$ không bảo đảm mọi chính sách đều đi tới nó. Trong robot, chính sách luôn chọn $B$ giữ robot ở $h$ mãi, nên không thể thay $\gamma<1$ bằng lập luận "mô hình có trạng thái kết thúc".
:::

::: example Ví dụ 13.8 (Hai phản ví dụ khi hệ số chiết khấu bằng một)
**Mô hình thứ nhất.** Một trạng thái $s$, một hành động, luôn quay lại $s$, thưởng $1$ mỗi bước, $\gamma=1$. Tổng thưởng bằng $+\infty$. Phương trình Bellman $V(s)=1+V(s)$ vô nghiệm. Lặp từ $V_0(s)=0$ cho $V_k(s)=k$, không hội tụ.

**Mô hình thứ hai.** Cùng trạng thái tự lặp và $\gamma=1$, nhưng thưởng luôn bằng $0$. Tổng thưởng bằng $0$, trong khi toán tử là $TV=V$; mọi số thực đều là điểm bất động, nên phương trình không xác định được giá trị.

**Kiểm tra lại.** Cả hai mô hình hữu hạn và có phần thưởng bị chặn; giả thiết duy nhất bị bỏ là $\gamma<1$, nên chúng không mâu thuẫn với Hệ quả 13.18 và Định lý 13.19.

Mô hình thứ nhất ứng với phản ví dụ $F(x)=x+1$ sau Định nghĩa 13.14: khoảng cách không co lại và điểm bất động không tồn tại.
:::

Như vậy, khi mô hình $P,r$ đã biết, toán tử Bellman tối ưu là ánh xạ co (Mệnh đề 13.16), lặp giá trị hội tụ tới điểm bất động duy nhất (Hệ quả 13.18), và điểm đó là giá trị tối ưu với chính sách tham lam tối ưu (Định lý 13.19); Thuật toán 13.23 dừng với chứng nhận sai số cho cả giá trị lẫn chính sách. Tuy nhiên, mọi bước đều giả sử biết chính xác $P$ và $r$. Trong Mục 7, chúng ta xét trường hợp các bảng này phải học từ dữ liệu tương tác.

## 7. Biết mô hình và học từ trải nghiệm

Trong Ví dụ 13.1, bảng xác suất của mỗi hành động được cho trước. Một hệ thống mới thường chỉ ghi được những lần thử: trạng thái hiện tại, hành động đã chọn, phần thưởng và trạng thái kế tiếp. Chúng ta cần phân biệt việc giải một mô hình đã biết với việc học mô hình hoặc học giá trị khi các bảng $P,r$ chưa biết.

Một cách trực quan, quy hoạch tính kỳ vọng bằng một bảng xác suất, còn dữ liệu tương tác chỉ cho các kết quả ngẫu nhiên rút từ bảng chưa biết đó. Nhiều lần thử giúp ước lượng bảng, nhưng chính sách thu thập dữ liệu quyết định những cặp trạng thái–hành động nào được thử. Đây là trực giác, chưa phải định nghĩa.

### 7.1. Ước lượng một hàng chuyển tiếp từ số đếm

Giả sử có thể đặt hệ thống vào trạng thái $s$, thực hiện hành động $a$ và ghi trạng thái kế tiếp, lặp lại nhiều lần. Nếu các lần thử độc lập và môi trường không đổi, các trạng thái kế tiếp là một mẫu phân loại với cùng vector xác suất $P(\cdot\mid s,a)$, và Định lý 11.7 áp dụng trực tiếp. Định nghĩa sau gọi tên các đại lượng tính từ dữ liệu.

::: definition Định nghĩa 13.25 (Số đếm và mô hình ước lượng)
Cho dữ liệu gồm các bộ chuyển tiếp $(s_i,a_i,c_i,s'_i)$, đánh số bằng $i$, trong đó $c_i$ là phần thưởng quan sát. Đặt
$$
\begin{aligned}
&N(s,a,s')\\
&\quad=\sum_{i}\mathbf 1_{\{s_i=s,\ a_i=a,\ s'_i=s'\}},\\
&N(s,a)\\
&\quad=\sum_{s'\in\mathcal S}N(s,a,s'),
\end{aligned}
\tag{7.1}
$$
với $\mathbf 1_{\{\cdot\}}$ là hàm chỉ báo. Một *mô hình ước lượng* gồm các hàng xác suất $\hat P(\cdot\mid s,a)$ và các phần thưởng kỳ vọng ước lượng $\hat r(s,a)$. Khi $N(s,a)>0$, phần thưởng trung bình quan sát tại cặp đó là
$$
\hat r(s,a)=\frac{1}{N(s,a)}\sum_{\substack{i:\,s_i=s,\\a_i=a}}c_i.
\tag{7.2}
$$
Khi $N(s,a)=0$, các thương trên chưa xác định; đặt một giá trị mặc định cho cặp đó là một giả thiết bổ sung của người lập mô hình. Ví dụ: cộng thêm một vào mọi số đếm $N(s,a,s')$ trước khi chuẩn hóa (*làm trơn cộng một*, add-one smoothing).
:::

Khác với $P,r$ của Định nghĩa 13.5, các bảng $\hat P,\hat r$ phụ thuộc dữ liệu, nên ngẫu nhiên và có sai số lấy mẫu. Hệ quả sau chuyên biệt hóa Định lý 11.7 cho một cặp $(s,a)$.

::: corollary Hệ quả 13.26 (Ước lượng hợp lý cực đại của một hàng chuyển tiếp) — chứng minh đầy đủ
**Giả thiết.**

- **Lấy mẫu:** cặp $(s,a)$ được thử $m\ge0$ lần độc lập trong một môi trường không đổi (giả thiết M3).
- **Mô hình:** các trạng thái kế tiếp có phân phối phân loại $P(\cdot\mid s,a)$ trên $\mathcal S$.
- **Không gian tham số:** đơn hình đóng $\Delta(\mathcal S)$ các hàng xác suất trên $\mathcal S$.

**Kết luận.** Nếu $m\ge1$, MLE của hàng chuyển tiếp là duy nhất và bằng
$$
\begin{gathered}
\hat P(s'\mid s,a)=\frac{N(s,a,s')}{N(s,a)},\\
N(s,a)=m.
\end{gathered}
\tag{7.3}
$$
Trạng thái kế tiếp chưa xuất hiện nhận xác suất ước lượng $0$. Nếu $m=0$, mọi hàng của $\Delta(\mathcal S)$ đều là MLE.
:::

::: proof Chứng minh Hệ quả 13.26
**Lộ trình.** Viết hợp lý của các lần thử độc lập, rồi áp dụng Định lý 11.7; xét riêng trường hợp chỉ có một trạng thái và trường hợp không có dữ liệu.

**Bước 1 (hợp lý).** Ký hiệu $q=(q(s'))_{s'\in\mathcal S}\in\Delta(\mathcal S)$ là hàng tham số. Do các lần thử độc lập, hợp lý của dữ liệu là
$$
L(q)=\prod_{s'\in\mathcal S}q(s')^{N(s,a,s')}.
$$

**Bước 2 (từ hai trạng thái trở lên).** Khi $m\ge1$ và $\lvert\mathcal S\rvert\ge2$, đây đúng là bài toán của Định lý 11.7 với $\lvert\mathcal S\rvert$ nhóm, $m\ge1$ lần thử và số lần quan sát nhóm $s'$ bằng $N(s,a,s')$. Định lý 11.7 cho nghiệm duy nhất $\hat q(s')=N(s,a,s')/m$, kể cả khi một số số đếm bằng $0$.

**Bước 3 (một trạng thái).** Khi $m\ge1$ và $\lvert\mathcal S\rvert=1$, đơn hình chỉ có một điểm $q=(1)$, nên MLE duy nhất là $(1)$; khi đó $N(s,a,s)=m$ và (7.3) cũng cho $1$.

**Bước 4 (không có dữ liệu).** Khi $m=0$, mọi số mũ bằng $0$ và $L\equiv1$ trên $\Delta(\mathcal S)$, nên mọi hàng đều đạt cực đại; với $\lvert\mathcal S\rvert\ge2$ nghiệm không duy nhất, và thương $0/0$ trong (7.3) không xác định. $\square$

Trong học máy, (7.3) là bước học mô hình môi trường từ các lần thử; chất lượng của nó phụ thuộc số lần thử $m$ tại từng cặp.
:::

Sau bước ước lượng, lặp giá trị có thể chạy với $\hat P,\hat r$, nhưng kết luận của Hệ quả 13.18 và Định lý 13.19 khi đó thuộc về MDP ước lượng. Theo Nhận xét 11.8, một trạng thái kế tiếp chưa quan sát nhận xác suất $0$ dù xác suất thật có thể dương. Muốn đánh giá chính sách trong môi trường thật, còn cần chặn sai số của $\hat P$ và xét cách dữ liệu đã được thu thập.

Ví dụ sau đi từ số đếm đến giá trị nhìn trước theo mô hình ước lượng.

::: example Ví dụ 13.9 (Từ số đếm đến giá trị nhìn trước)
**Dữ kiện.** Tại một cặp $(s,a)$, có $12$ lần thử độc lập: $9$ lần đến $s_1$ và $3$ lần đến $s_2$. Phần thưởng kỳ vọng đã biết $r(s,a)=2$; $\gamma=0{,}8$; một vector cố định $V$ với $V(s_1)=5$, $V(s_2)=1$.

**Ước lượng.** Theo Hệ quả 13.26, $\hat P(s_1\mid s,a)=9/12=3/4$ và $\hat P(s_2\mid s,a)=3/12=1/4$.

**Giá trị nhìn trước theo mô hình ước lượng.** Thay $\hat P$ vào (5.7):
$$
\begin{aligned}
&\hat Q_V(s,a)\\
&\quad=2+0{,}8\Bigl(\tfrac34\cdot5+\tfrac14\cdot1\Bigr)\\
&\quad=2+0{,}8\cdot4=5{,}2.
\end{aligned}
\tag{7.4}
$$

**Kiểm tra lại.** $3/4+1/4=1$; giá trị tiếp diễn trung bình $4$ nằm giữa $1$ và $5$.

Số $5{,}2$ là giá trị nhìn trước theo mô hình đã khớp và theo vector $V$ đang có; nó chưa phải giá trị tối ưu, và xác suất thật có thể khác $3/4$, $1/4$.
:::

### 7.2. Dữ liệu quỹ đạo và thăm dò

Các trạng thái trên một quỹ đạo nói chung không *độc lập cùng phân phối* (independent and identically distributed, i.i.d.): trạng thái kế tiếp phụ thuộc trạng thái hiện tại. Hệ quả 13.26 vì vậy được phát biểu cho các lần thử độc lập tại một cặp cố định. Với dữ liệu từ một quỹ đạo liên tục, xác suất của quỹ đạo phân tích thành tích các xác suất chọn hành động và các xác suất chuyển. Giả sử chính sách thu thập và phân phối ban đầu không phụ thuộc các tham số chuyển tiếp, và các hàng $P(\cdot\mid s,a)$ là các tham số tự do. Khi đó MLE của mỗi hàng vẫn là tỉ số số đếm (7.3); phép tính nằm ở Phụ lục A.

Một chính sách luôn chọn cùng một hành động không cho dữ liệu về các hành động khác. Vì vậy học từ tương tác cần *thăm dò* (exploration), tức chọn hành động để thu thông tin, bên cạnh *khai thác* (exploitation), tức dùng thông tin hiện có để nhận phần thưởng; Murphy (2023), §35.1.5 trình bày sự đánh đổi giữa hai việc này. Một hành động chưa được thử có hàng chuyển tiếp chưa xác định theo Hệ quả 13.26, nên không thể kết luận hành động đó xấu.

### 7.3. Hai cách dùng trải nghiệm

Cùng một tập dữ liệu chuyển tiếp có thể được dùng theo hai cách: học mô hình rồi quy hoạch, hoặc học trực tiếp đại lượng cần cho quyết định. Định nghĩa sau gọi tên hai cách đó.

::: definition Định nghĩa 13.27 (Học tăng cường dựa trên mô hình và không dựa trên mô hình)
Trong *học tăng cường dựa trên mô hình* (model-based reinforcement learning), hệ thống học hoặc duy trì một mô hình ước lượng $\hat P,\hat r$, rồi dùng một phép quy hoạch, chẳng hạn Thuật toán 13.23, trên mô hình đó để chọn hành động.

Trong *học tăng cường không dựa trên mô hình* (model-free reinforcement learning), hệ thống học trực tiếp giá trị hoặc chính sách từ các chuyển tiếp quan sát, không ước lượng toàn bộ bảng $P$ trước khi quy hoạch.
:::

Cả hai cách đều học từ cùng loại dữ liệu $(s,a,c,s')$ và đều cần giả thiết Markov (M1) cho trạng thái đang dùng. Cả hai đều cần thăm mọi cặp trạng thái–hành động quan trọng cho quyết định, và đều chịu sai số lấy mẫu. Murphy (2023), §35.1.1 và §35.1.4 mô tả học dựa trên mô hình như việc xen kẽ học mô hình và quy hoạch.

### 7.4. Đọc thêm: học trực tiếp giá trị

Với học không dựa trên mô hình, phép lấy kỳ vọng trong (6.1) được thay bằng một kết quả quan sát. Định nghĩa sau dùng bảng *giá trị hành động* (action value) $Q_t(s,a)$, là ước lượng tại thời điểm $t$ của giá trị khi chọn $a$ tại $s$ rồi hành động tối ưu.

::: definition Định nghĩa 13.28 (Mục tiêu Bellman từ mẫu và cập nhật Q-learning)
Cho bảng $Q_t$ trên các cặp trạng thái–hành động và một chuyển tiếp quan sát $(S_t,A_t,R_{t+1},S_{t+1})$. *Mục tiêu Bellman từ mẫu* (sample Bellman target) là
$$
\begin{aligned}
Y_t&=R_{t+1}\\
&+\gamma\max_{a'\in\mathcal A(S_{t+1})}Q_t(S_{t+1},a').
\end{aligned}
\tag{7.5}
$$
Với bước học $\alpha_t\in(0,1]$, cập nhật *Q-learning* thay một phần tử của bảng:
$$
\begin{aligned}
&Q_{t+1}(S_t,A_t)\\
&\quad=Q_t(S_t,A_t)\\
&\qquad+\alpha_t\bigl[Y_t-Q_t(S_t,A_t)\bigr],
\end{aligned}
\tag{7.6}
$$
các phần tử khác giữ nguyên.
:::

Để phân biệt với $Y_t$, giá trị nhìn trước $Q_V(s,a)$ tính theo một mô hình, như (7.4), còn được gọi là *mục tiêu Bellman theo mô hình*.

Nếu $Q_t$ đã được xác định bởi lịch sử trước chuyển tiếp và môi trường thỏa (5.1), lập luận của Bổ đề 13.10 cho $\mathbb E[Y_t\mid H_t,A_t=a]=r(S_t,a)+\gamma\sum_{s'}P(s'\mid S_t,a)\max_{a'}Q_t(s',a')$. Nghĩa là kỳ vọng của mục tiêu từ mẫu là phép Bellman tối ưu áp dụng cho bảng hiện tại; Murphy (2023), §35.1.2 nêu cùng kết luận. Một lần cập nhật chỉ dùng một kết quả ngẫu nhiên và chỉ đổi một phần tử, khác với lặp giá trị cập nhật đồng thời mọi trạng thái bằng kỳ vọng chính xác.

Ví dụ sau so sánh mục tiêu từ một mẫu với kỳ vọng của nó trên cùng số liệu của Ví dụ 13.9.

::: example Ví dụ 13.10 (Mục tiêu từ mẫu và kỳ vọng của nó)
**Dữ kiện.** Tại cặp $(s,a)$, phần thưởng quan sát luôn bằng $2$; xác suất thật đi tới $s_1$, $s_2$ lần lượt là $3/4$, $1/4$; $\gamma=0{,}8$. Bảng hiện tại có $\max_{a'}Q_t(s_1,a')=5$, $\max_{a'}Q_t(s_2,a')=1$ và $Q_t(s,a)=2$; bước học $\alpha_t=1/4$.

**Khi quan sát $s_1$.** Theo (7.5), $Y_t=2+0{,}8\cdot5=6$. Theo (7.6), phần tử mới là $2+\tfrac14(6-2)=3$.

**Khi quan sát $s_2$.** $Y_t=2+0{,}8\cdot1=2{,}8$, và phần tử mới là $2+\tfrac14(2{,}8-2)=2{,}2$.

**Kiểm tra lại bằng kỳ vọng.** $\mathbb E[Y_t]=\tfrac34\cdot6+\tfrac14\cdot2{,}8=4{,}5+0{,}7=5{,}2$, trùng giá trị nhìn trước (7.4). Kỳ vọng của phần tử mới là $\tfrac34\cdot3+\tfrac14\cdot2{,}2=2{,}8$, bằng $2+\tfrac14(5{,}2-2)$.

Kỳ vọng của một lần cập nhật dịch phần tử về phía mục tiêu Bellman, nhưng kết quả của từng lần cập nhật vẫn ngẫu nhiên.
:::

Nhận xét sau tổng hợp phạm vi của các bảo đảm đã chứng minh khi chuyển từ quy hoạch sang học.

::: remark Nhận xét 13.29 (Phạm vi bảo đảm của quy hoạch và của học)
1. Hệ quả 13.18 và Định lý 13.19 chứng minh hội tụ và tối ưu cho phép lặp chính xác trên một MDP hữu hạn cố định. Khi dùng $\hat P,\hat r$, chúng cho kết luận về MDP ước lượng.
2. Một hàng không có dữ liệu không được số đếm xác định (Hệ quả 13.26); chính sách thu thập dữ liệu cần thăm các cặp quan trọng cho quyết định.
3. Hội tụ của Q-learning dạng bảng cần thêm giả thiết: mọi cặp được thăm vô hạn lần và bước học giảm dần thích hợp theo Murphy (2023), §35.2.5. Khi biểu diễn $Q$ bằng một hàm xấp xỉ, chẳng hạn mạng nơ-ron, tính co của phép Bellman chính xác không còn đủ để bảo đảm hội tụ.
4. Nếu trạng thái không thỏa tính Markov hoặc môi trường thay đổi theo thời gian, mô hình đang dùng sai; giảm phần dư Bellman không sửa được sai lệch đó.
:::

Như vậy, khi mô hình chưa biết, số đếm cho MLE của từng hàng chuyển tiếp (Hệ quả 13.26), và mục tiêu Bellman từ mẫu có kỳ vọng bằng phép Bellman tối ưu áp dụng cho bảng hiện tại (Ví dụ 13.10). Tuy nhiên, các bảo đảm của Mục 6 chỉ nói về mô hình đang dùng; chất lượng dữ liệu, cách thăm dò và việc chọn trạng thái quyết định mô hình đó có đúng hay không. Mục 8 xét hai tình huống mà các giả thiết này bị vi phạm.

## 8. Ý nghĩa, tác động và giới hạn

Các kết quả của bài trả lời câu hỏi trung tâm dưới ba điều kiện: mô hình $P,r$ đúng, trạng thái thỏa tính Markov, và $\gamma<1$. Hai tình huống sau dùng lại robot và các kết quả đã chứng minh; trong cả hai, một giả thiết bị vi phạm và kết luận trên mô hình không còn đúng với hệ thống thật.

::: application Tình huống 13.1 (Quy hoạch chính xác trên một mô hình ước lượng sai)
**Môi trường thật.** Robot của Ví dụ 13.1: tại $h$, $A$ thưởng $1$ rồi ở lại $h$ với xác suất $1/2$, $B$ thưởng $0{,}6$ rồi chắc chắn ở lại $h$; $z$ hấp thụ với thưởng $0$; $\gamma=0{,}9$. Hàng chuyển của $B$ được biết từ thiết kế; hàng chuyển của $A$ phải ước lượng.

**Dữ liệu.** Bộ mô phỏng đặt robot vào $h$ và thực hiện $A$ trong $10$ lần thử độc lập. Cả $10$ lần robot đều ở lại $h$. Dưới môi trường thật, biến cố này có xác suất $(1/2)^{10}=1/1024>0$.

**Ước lượng.** Hệ quả 13.26 cho $\hat P(h\mid h,A)=10/10=1$ và $\hat P(z\mid h,A)=0$.

**Quy hoạch trên mô hình ước lượng.** Với $V(z)=0$, toán tử rút gọn là $\hat Tv=\max\{1+0{,}9v;\ 0{,}6+0{,}9v\}$. Nhánh $A$ luôn lớn hơn nhánh $B$ đúng $0{,}4$, nên điểm bất động thỏa $v=1+0{,}9v$, tức $v=10$. Tại $v=10$, hai nhánh bằng $10$ và $9{,}6$; chính sách tham lam của mô hình ước lượng chọn $A$.

**Đối chiếu với môi trường thật.** Theo Ví dụ 13.5, luôn chọn $A$ cho $20/11\approx1{,}82$, luôn chọn $B$ cho $6$. Theo Định lý 13.19, $B$ tối ưu trong môi trường thật: $\max\{1+0{,}45\cdot6;\ 0{,}6+0{,}9\cdot6\}=\max\{3{,}7;\ 6\}=6$. Chính sách quy hoạch từ mẫu thuận lợi mất $6-20/11=46/11\approx4{,}18$ so với tối ưu.

**Giả thiết bị vi phạm.** Hệ quả 13.18 và Định lý 13.19 đúng cho MDP ước lượng; giả thiết "mô hình đúng" của chúng không thỏa với robot thật. Sai lệch nằm ở hàng $\hat P(\cdot\mid h,A)$, không nằm ở phép giải phương trình. Như Nhận xét 11.8, xác suất ước lượng $0$ của sự kiện chưa thấy không chứng minh sự kiện đó không xảy ra.
:::

::: application Tình huống 13.2 (Cảm biến bỏ mất thông tin quá khứ)
**Cơ chế.** Một thiết bị có hai bit khởi đầu $X_0,X_1$ độc lập, mỗi bit có phân phối Bernoulli với tham số $1/2$, và lặp lại theo quy luật $X_{t+1}=X_{t-1}$ với $t\ge1$. Chỉ có một hành động. Cảm biến tại thời điểm $t$ chỉ ghi $X_t$; phần thưởng ở bước kế tiếp là $R_{t+1}=X_{t+1}$; $\gamma=1/2$.

**Kiểm tra tính Markov của quan sát.** Hai lịch sử $(X_0,X_1)=(0,0)$ và $(1,0)$ đều có xác suất $1/4$ và cùng quan sát hiện tại $X_1=0$. Tuy nhiên,
$$
\begin{gathered}
\mathbb P(X_2=1\mid X_0=0,X_1=0)=0,\\
\mathbb P(X_2=1\mid X_0=1,X_1=0)=1.
\end{gathered}
$$
Phân phối bước sau còn phụ thuộc bit cũ, nên riêng $X_t$ không thỏa (4.1).

**Hậu quả với giá trị.** Sau lịch sử $(0,0)$, mọi phần thưởng về sau bằng $0$, nên tổng thưởng từ thời điểm $1$ bằng $0$. Sau lịch sử $(1,0)$, các phần thưởng $X_2,X_3,\ldots$ là $1,0,1,0,\ldots$, nên
$$
\begin{aligned}
G_1&=1+\bigl(\tfrac12\bigr)^2+\bigl(\tfrac12\bigr)^4+\cdots\\
&=\frac{1}{1-1/4}=\frac43.
\end{aligned}
$$
Một hàm giá trị chỉ theo quan sát hiện tại $0$ không thể nhận đồng thời hai giá trị $0$ và $4/3$.

**Sửa trạng thái.** Như Nhận xét 07.47, ta mở rộng trạng thái. Đánh số lại thời gian và đặt $\tilde S_u=(X_u,X_{u+1})\in\{0,1\}^2$ với $u\ge0$. Khi đó $\tilde S_{u+1}=(X_{u+1},X_{u+2})=(X_{u+1},X_u)$ xác định từ $\tilde S_u$, và phần thưởng kế tiếp $X_{u+2}=X_u$ là tọa độ thứ nhất của $\tilde S_u$. Mô hình mở rộng có bốn trạng thái, phần thưởng thuộc $\{0,1\}$ và $\gamma<1$, nên các kết quả của Mục 5 và Mục 6 áp dụng được. Với $\tilde S_0=(1,0)$, giá trị là $4/3$, đúng như trên.

**Khi không quan sát được bit cũ.** Nếu thiết bị chỉ cho thấy $X_t$, trạng thái $(X_{t-1},X_t)$ không quan sát được trực tiếp. Khi đó cần một mô hình quan sát và suy luận phân phối của trạng thái ẩn từ lịch sử quan sát, tức mô hình MDP quan sát một phần của Murphy (2023), §34.5.2; một cách xấp xỉ là đưa vài quan sát gần nhất vào trạng thái.

Tính co của $T$ vẫn đúng cho một bảng chuyển tiếp bất kỳ trên các quan sát $0$, $1$, nhưng bảng ấy không mô tả đúng cơ chế. Chọn trạng thái là một bước của mô hình hóa và cần kiểm tra trước khi đọc giá trị hay chính sách từ bảng.
:::

Bài bắt đầu từ việc truyền một phân phối qua xích Markov, rồi thêm hành động và phần thưởng để mô hình hóa lựa chọn có hậu quả dài hạn. Chiết khấu cùng phần thưởng bị chặn làm tổng thưởng và mọi hàm giá trị hữu hạn. Bổ đề so sánh theo từng bước đưa việc so sánh tổng thưởng vô hạn bước về một bất đẳng thức một bước, từ đó có phương trình Bellman cho chính sách dừng. Toán tử Bellman tối ưu là ánh xạ co, nên có điểm bất động duy nhất và lặp giá trị hội tụ từ mọi vector ban đầu. Chính sách tham lam theo điểm bất động đạt nó, còn mọi chính sách, kể cả chính sách phụ thuộc lịch sử, không vượt nó; vì vậy điểm bất động là giá trị tối ưu. Với robot, chính sách tối ưu chọn hành động có phần thưởng tức thời nhỏ hơn và đạt $6$ thay vì $20/11$. Khi mô hình chưa biết, số đếm và dữ liệu tương tác tạo thêm một bài toán thống kê, và các bảo đảm của quy hoạch chỉ nói về mô hình đang dùng.

AI cần quy hoạch động vì hành động hiện tại ảnh hưởng đến phần thưởng tương lai: phương trình Bellman tối ưu (Định lý 13.19) đưa bài toán chọn trên vô số chính sách về một phương trình một bước giải được bằng lặp giá trị.

Trong học máy, các kết quả của bài được dùng như sau.

- **Đánh giá chính sách:** Định lý 13.12 tính giá trị của một quy tắc điều khiển cố định bằng một hệ tuyến tính.
- **Quy hoạch có chứng nhận:** Thuật toán 13.23 trả về chính sách với chặn mất mát $2\gamma\varepsilon/(1-\gamma)$ (Mệnh đề 13.22).
- **Học tăng cường dựa trên mô hình:** Hệ quả 13.26 ước lượng mô hình từ số đếm, rồi quy hoạch trên mô hình ước lượng (Định nghĩa 13.27); Tình huống 13.1 cho thấy giới hạn của cách làm này.

Các kết quả chính của bài:

- Mệnh đề 13.2 và Hệ quả 13.3: truyền phân phối $\mu_t=\mu_0P^t$ và xác suất một quỹ đạo.
- Định nghĩa 13.5–13.7 và Mệnh đề 13.8: MDP hữu hạn, chính sách, tổng thưởng chiết khấu, hàm giá trị và chặn $R_{\max}/(1-\gamma)$.
- Bổ đề 13.11: so sánh theo từng bước.
- Định lý 13.12: $V^\pi=(I-\gamma P^\pi)^{-1}r^\pi$.
- Định nghĩa 13.14, Mệnh đề 13.16, Định lý 13.17 và Hệ quả 13.18: ánh xạ co, tính co của $T$, điểm bất động và hội tụ của lặp giá trị.
- Định lý 13.19: $V^*=TV^*$ và chính sách tham lam theo $V^*$ là tối ưu.
- Hệ quả 13.21, Mệnh đề 13.22 và Thuật toán 13.23: chặn bằng phần dư Bellman, chặn $2\gamma\varepsilon/(1-\gamma)$ cho chính sách tham lam, và tiêu chuẩn dừng.
- Hệ quả 13.26 và Định nghĩa 13.27–13.28: ước lượng từ số đếm, học dựa trên mô hình và không dựa trên mô hình, mục tiêu Bellman từ mẫu.

Các giả thiết dễ bị bỏ quên là trạng thái đủ thông tin, chuẩn hóa từng hàng xác suất, phần thưởng bị chặn, $\gamma<1$, và sự khác nhau giữa mô hình thật với mô hình ước lượng. Có một trạng thái hấp thụ chưa đủ để bỏ chiết khấu, vì một chính sách có thể không bao giờ tới trạng thái đó.

## 9. Bài tập

Bộ bài tập đầy đủ, có gợi ý và lời giải, nằm trong [tệp bài tập của Bài 13](material-viewer.html?doc=materials/lec-13/exercises.md).

Trên lớp:

1. **Bài tập 13.1** (Truyền phân phối hai bước): mục tiêu học tập 1.
2. **Bài tập 13.2** (Lặp giá trị và điểm bất động): mục tiêu học tập 4–5.
3. **Bài tập 13.3** (Mục tiêu theo mô hình và mục tiêu từ một mẫu): mục tiêu học tập 6.

Tự học:

4. **Bài tập 13.4** (Xích Markov, xác suất chuyển và xác suất quỹ đạo): mục tiêu học tập 1.
5. **Bài tập 13.5** (Lặp giá trị cho robot và giá trị dài hạn): mục tiêu học tập 3–5.
6. **Bài tập 13.6** (Học mô hình và mục tiêu Bellman): mục tiêu học tập 6.
7. **Bài tập 13.7** (Giả thiết và bảo đảm của quy hoạch và của học): mục tiêu học tập 4 và 6.
8. **Bài tập 13.8** (Giá trị của chính sách dừng): mục tiêu học tập 2–3.
9. **Bài tập 13.9** (Phương trình Bellman tối ưu có hai hành động cùng tối ưu): mục tiêu học tập 3–4.
10. **Bài tập 13.10** (Tính co và phần dư Bellman): mục tiêu học tập 4.
11. **Bài tập 13.11** (Kiểm tra một khẳng định hội tụ): mục tiêu học tập 6.

## 10. Câu hỏi cuối buổi và cầu nối

**Câu hỏi.** Vì sao AI cần quy hoạch động để ra quyết định tuần tự? Trả lời bằng robot của Ví dụ 13.1: nêu số chính sách cần so sánh nếu liệt kê, công cụ nào của bài thay thế việc liệt kê, và chính sách nhận được.

::: solution Lời giải câu hỏi cuối buổi
**Liệt kê không đủ.** Số chính sách tất định dừng là $\prod_s\lvert\mathcal A(s)\rvert$, tăng theo hàm mũ của số trạng thái; tập chính sách phụ thuộc lịch sử còn vô hạn. Với robot, $\lvert\mathcal A(h)\rvert=2$ và $\lvert\mathcal A(z)\rvert=1$, nên có $2\cdot1=2$ chính sách tất định dừng: luôn chọn $A$ cho $V^A(h)=20/11\approx1{,}82$, luôn chọn $B$ cho $V^B(h)=6$ (Ví dụ 13.5). Ví dụ 13.5 còn tính chính sách trộn đều, $V^\pi(h)=32/13\approx2{,}46$. Ba phép tính này chưa loại trừ được các chính sách phụ thuộc lịch sử, vốn không liệt kê hết được.

**Quy hoạch động thay thế liệt kê.** Định lý 13.19 cho giá trị tối ưu là nghiệm duy nhất của phương trình Bellman tối ưu $V^*=TV^*$, chỉ cần mô hình một bước, và chính sách tham lam theo $V^*$ tối ưu trong mọi chính sách. Hệ quả 13.18 và Thuật toán 13.23 tìm $V^*$ bằng lặp giá trị với chứng nhận sai số.

**Với robot.** Ví dụ 13.6 cho $V^*(h)=6$ và chính sách tối ưu chọn $B$ tại $h$ ở mọi thời điểm. Chỉ số $k$ của bảng lặp đếm vòng tính toán: vòng đầu chọn $A$ không có nghĩa robot chọn $A$ ở bước đầu. Chính sách luôn chọn phần thưởng tức thời lớn nhất ($A$) chỉ đạt $20/11\approx1{,}82$.
:::

Trong Tình huống 13.2, nếu cảm biến chỉ ghi $X_t$ thì bit $X_{t-1}$ là một biến ẩn, và phân phối của nó phải được suy luận từ lịch sử quan sát trước khi dùng phương trình Bellman. Bài 14 xét mô hình có biến ẩn $z$ với phân phối đồng thời $p_\theta(x,z)$. Phân phối hậu nghiệm $p_\theta(z\mid x)$ thường không tính được trực tiếp, nên Bài 14 xây dựng cận dưới bằng chứng (evidence lower bound, ELBO) của log-hợp lý để học $\theta$ và xấp xỉ hậu nghiệm cùng lúc.

## 11. Tài liệu đọc

Nguồn chính là Kevin P. Murphy (2023), *Probabilistic Machine Learning: Advanced Topics*, MIT Press, dẫn là Murphy (2023).

- **Trước buổi học:** Murphy (2023), §2.6.1 (xích Markov và ma trận chuyển), §2.6.4.1 (truyền phân phối bằng vector hàng), §34.5.1, §34.5.3–34.5.4 (MDP, tổng thưởng, hàm giá trị).
- **Sau buổi học:** Murphy (2023), §34.5.5 (giá trị và chính sách tối ưu; phương trình cho chính sách cố định ở cuối mục), §34.6.1 (lặp giá trị), §34.6.2 và công thức (34.88) (đánh giá chính sách dạng ma trận); §2.6.3.1–2.6.3.3 và công thức (34.74) (ước lượng ma trận chuyển, làm trơn số đếm, xác suất quỹ đạo); §35.1.1, §35.1.4 (học tăng cường dựa trên mô hình).
- **Mở rộng:** Murphy (2023), §35.1.2 (kỳ vọng của sai số sai phân thời gian và sai số Bellman), §35.1.5 (thăm dò và khai thác), §35.2.2, §35.2.5 (học sai phân thời gian, Q-learning), §34.5.2 (MDP quan sát một phần), §34.6.2 (lặp chính sách); Sutton và Barto (2018), *Reinforcement Learning: An Introduction*, ấn bản 2, §3.5, §4.1, §4.4.

Murphy nêu tính co của toán tử Bellman tối ưu và phương trình Bellman tối ưu mà không chứng minh; Bổ đề 13.11, Định lý 13.17, Định lý 13.19 và Mệnh đề 13.22 được chứng minh trong bài. Murphy đánh chỉ số phần thưởng $r_t$ bắt đầu từ $r_0$, dùng $T$ cho ma trận chuyển trong (34.88) và $\eta$ cho bước học; ở đây ta viết $R_{t+1}$, dùng $T$ cho toán tử Bellman và $\alpha_t$ cho bước học.

## Phụ lục

### A. Hợp lý của dữ liệu quỹ đạo

Công thức số đếm (7.3) vẫn dùng được khi dữ liệu là một quỹ đạo, không phải các lần thử độc lập. Xét dữ liệu trạng thái–hành động $(s_0,a_0,s_1,\ldots,a_{M-1},s_M)$ và các điều kiện sau.

- **Mô hình:** các hàng $P_\theta(\cdot\mid s,a)$ phụ thuộc tham số $\theta$ và là các tham số tự do, mỗi hàng thuộc $\Delta(\mathcal S)$.
- **Chính sách thu thập:** $\mathbb P(A_t=a\mid S_0=s_0,A_0=a_0,\ldots,S_t=s_t)=\rho_t(a\mid\tau_t)$ với $\tau_t=(s_0,a_0,\ldots,s_t)$; chính sách không dùng phần thưởng và không phụ thuộc $\theta$.
- **Phân phối ban đầu:** $\mu_0$ không phụ thuộc $\theta$.

Bỏ phần thưởng khỏi điều kiện cần hai bước.

- Cộng (5.1) theo giá trị phần thưởng $c$ được $\mathbb P(S_{t+1}=s'\mid H_t=\tau,A_t=a)=P_\theta(s'\mid s_\tau,a)$ với mọi lịch sử đầy đủ $\tau$.
- Với $\sigma=(s_0,a_0,\ldots,a_{t-1},s_t)$ là phần trạng thái–hành động của lịch sử, xác suất toàn phần theo các phần thưởng quá khứ $c_{1:t}=(c_1,\ldots,c_t)$ cho
$$
\begin{aligned}
&\mathbb P(S_{t+1}=s'\mid\sigma,A_t=a)\\
&\quad=\sum_{c_{1:t}}\mathbb P(c_{1:t}\mid\sigma,A_t=a)\\
&\qquad\times P_\theta(s'\mid s_t,a)\\
&\quad=P_\theta(s'\mid s_t,a),
\end{aligned}
$$
vì các trọng số $\mathbb P(c_{1:t}\mid\sigma,A_t=a)$ có tổng bằng $1$.

Áp dụng quy tắc nhân lần lượt cho $S_0,A_0,S_1,\ldots,S_M$, như trong chứng minh Hệ quả 13.3,
$$
\begin{aligned}
&\mathbb P_\theta(S_0=s_0,A_0=a_0,\ldots,\\
&\qquad A_{M-1}=a_{M-1},S_M=s_M)\\
&\quad=\mu_0(s_0)\prod_{t=0}^{M-1}\rho_t(a_t\mid\tau_t)\\
&\qquad\times P_\theta(s_{t+1}\mid s_t,a_t).
\end{aligned}
\tag{A.1}
$$

Khi dữ liệu cố định, $\mu_0(s_0)$ và các nhân tử $\rho_t(a_t\mid\tau_t)$ không phụ thuộc $\theta$. Nhóm các nhân tử chuyển tiếp theo cặp $(s,a)$ với số đếm (7.1):
$$
\begin{aligned}
&\prod_{t=0}^{M-1}P_\theta(s_{t+1}\mid s_t,a_t)\\
&\quad=\prod_{(s,a)}\ \prod_{s'}P_\theta(s'\mid s,a)^{N(s,a,s')}.
\end{aligned}
$$
Mỗi hàng chỉ xuất hiện trong nhân tử của chính nó, nên cực đại hóa theo từng hàng riêng rẽ. Với mỗi cặp có $N(s,a)>0$, Định lý 11.7 (hoặc Bước 3 của chứng minh Hệ quả 13.26 khi $\lvert\mathcal S\rvert=1$) cho lại (7.3). Các trạng thái trên quỹ đạo vẫn phụ thuộc nhau; điều làm (7.3) đúng là cấu trúc tích của (A.1), không phải tính độc lập.

Công thức (A.1) là xác suất **đồng thời** của trạng thái và hành động. Xác suất của các trạng thái khi biết toàn bộ chuỗi hành động, kể cả hành động tương lai, phải chia cho xác suất của chuỗi hành động. Khi chính sách dùng trạng thái để chọn hành động, các hành động tương lai mang thông tin về các trạng thái trước đó, nên xác suất có điều kiện này nói chung không phải là tích các $P_\theta$.
