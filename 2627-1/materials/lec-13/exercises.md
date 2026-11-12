# Bài tập Bài 13 — Ra quyết định tuần tự dưới điều kiện bất định

Các bài tập dưới đây, đánh số tiếp theo Bài tập 13.1–13.3 trong ghi chú, đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-13/lecture-note.md) của Bài 13. Các bài lấy từ Sutton và Barto (2018), Chương 3 và 4; số trang là trang in của sách. Lời giải dẫn định nghĩa, định lý, bổ đề, hệ quả, ví dụ và công thức theo số hiệu của ghi chú. Ký hiệu theo ghi chú gồm:

- mô hình chuyển $p(s',c\mid s,a)$, xác suất chuyển $P(s'\mid s,a)$ và phần thưởng kỳ vọng $r(s,a)$ theo Định nghĩa 13.5 và (5.2); sách viết $p(s',r\mid s,a)$, $p(s'\mid s,a)$ và $r(s,a)$;
- hàm giá trị $V^\pi$, giá trị tối ưu $V^*$ (Định nghĩa 13.7); sách viết $v_\pi$, $v_*$;
- *giá trị hành động* (action value) của chính sách Markov dừng $\pi$ và giá trị hành động tối ưu, định nghĩa qua giá trị nhìn trước (5.7):
$$
\begin{gathered}
q_\pi(s,a)=Q_{V^\pi}(s,a),\\
q_*(s,a)=Q_{V^*}(s,a);
\end{gathered}
$$
- tổng thưởng chiết khấu $G_t$ theo (5.4), toán tử Bellman tối ưu $T$ theo (6.1).

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Tính Markov, ma trận chuyển, phân phối sau nhiều bước | 13.1 | |
| 2. Mô hình hóa quá trình quyết định Markov hữu hạn | | 13.4, 13.5, 13.6, 13.14 |
| 3. Phương trình Bellman cho chính sách cố định và phương trình Bellman tối ưu | | 13.6, 13.7, 13.8, 13.9, 13.10, 13.11, 13.13 |
| 4. Tính co, hội tụ của lặp giá trị, chính sách tham lam tối ưu | 13.2 | 13.7, 13.12 |
| 5. Lặp giá trị bằng tay, phần thưởng tức thời và giá trị dài hạn | | 13.13, 13.14 |
| 6. Ước lượng từ số đếm, mục tiêu Bellman, quy hoạch và học tăng cường | 13.3 | |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 2; tính tổng thưởng chiết khấu của một dãy phần thưởng vô hạn.

::: exercise Bài tập 13.4 (Tổng thưởng chiết khấu của một dãy phần thưởng vô hạn; Sutton và Barto, Bài 3.9, §3.3, tr. 56)
Cho $\gamma=0{,}9$ và dãy phần thưởng $R_1=2$, $R_k=7$ với mọi $k\ge2$. Tính $G_1$ và $G_0$ theo (5.4).
:::

::: hint Gợi ý Bài tập 13.4
$G_1$ chỉ chứa các phần thưởng bằng $7$, nên là tổng của một cấp số nhân. Tách số hạng đầu của $G_0$ để viết $G_0$ theo $G_1$.
:::

::: solution Lời giải Bài tập 13.4
**Tính $G_1$.** Theo (5.4), $G_1=\sum_{j\ge0}\gamma^jR_{j+2}$, và mọi $R_{j+2}$ bằng $7$:
$$
G_1=7\sum_{j\ge0}0{,}9^j=\frac{7}{1-0{,}9}=70.
$$

**Tính $G_0$.** Tách số hạng $j=0$ và đổi chỉ số $j\mapsto j+1$ trong phần còn lại:
$$
\begin{aligned}
G_0&=R_1+\gamma\sum_{j\ge0}\gamma^jR_{j+2}\\
&=R_1+\gamma G_1\\
&=2+0{,}9\cdot70=65.
\end{aligned}
$$

**Kiểm tra lại.** Tính trực tiếp, $G_0=2+7\sum_{j\ge1}0{,}9^j=2+7\cdot\frac{0{,}9}{0{,}1}=2+63=65$. Với $R_{\max}=7$, chặn (5.6) cho $\lvert G_t\rvert\le7/0{,}1=70$; cả hai giá trị thỏa chặn này, và $G_1$ đạt dấu bằng vì mọi phần thưởng từ thời điểm $1$ bằng $R_{\max}$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 2; viết mô hình chuyển $p(s',c\mid s,a)$ của một MDP hữu hạn từ mô tả bằng lời.

::: exercise Bài tập 13.5 (Mô hình chuyển của robot thu gom lon; Sutton và Barto, Bài 3.4, §3.1, tr. 53)
Một robot thu gom vỏ lon (recycling robot) có hai trạng thái theo mức pin: $\mathrm h$ (pin cao) và $\mathrm l$ (pin thấp). Hành động gồm $\mathrm s$ (chủ động tìm lon), $\mathrm w$ (đứng chờ) và $\mathrm{re}$ (về trạm sạc), với
$$
\begin{gathered}
\mathcal A(\mathrm h)=\{\mathrm s,\mathrm w\},\\
\mathcal A(\mathrm l)=\{\mathrm s,\mathrm w,\mathrm{re}\}.
\end{gathered}
$$
Dữ kiện chuyển và phần thưởng (Sutton và Barto, Ví dụ 3.3, tr. 52):

- tìm lon từ $\mathrm h$: robot ở lại $\mathrm h$ với xác suất $\alpha$ và sang $\mathrm l$ với xác suất $1-\alpha$, phần thưởng $r_{\mathrm s}$;
- tìm lon từ $\mathrm l$: robot ở lại $\mathrm l$ với xác suất $\beta$, phần thưởng $r_{\mathrm s}$; với xác suất $1-\beta$ pin cạn, robot được cứu và sạc lại về $\mathrm h$, phần thưởng $-3$;
- đứng chờ: trạng thái giữ nguyên, phần thưởng $r_{\mathrm w}$;
- về trạm sạc từ $\mathrm l$: robot sang $\mathrm h$ với xác suất $1$, phần thưởng $0$.

Ở đây $0<\alpha<1$, $0<\beta<1$, $r_{\mathrm s}>r_{\mathrm w}$, và phần thưởng của mỗi chuyển tiếp $(s,a,s')$ là tất định, bằng số đã cho.

- **(a)** Lập bảng gồm các cột $s$, $a$, $s'$, $c$, $p(s',c\mid s,a)$, mỗi dòng ứng với một bộ có $p(s',c\mid s,a)>0$.
- **(b)** Từ bảng, tính $P(\mathrm h\mid\mathrm l,\mathrm s)$ và $r(\mathrm l,\mathrm s)$ theo (5.2).
:::

::: hint Gợi ý Bài tập 13.5
Vì phần thưởng của mỗi chuyển tiếp là tất định, mỗi trạng thái kế tiếp có xác suất dương sau một cặp $(s,a)$ cho đúng một dòng của bảng.
:::

::: solution Lời giải Bài tập 13.5
**(a)** Bảng có bảy dòng:

| $s$ | $a$ | $s'$ | $c$ | $p(s',c\mid s,a)$ |
|---|---|---|---|---|
| $\mathrm h$ | $\mathrm s$ | $\mathrm h$ | $r_{\mathrm s}$ | $\alpha$ |
| $\mathrm h$ | $\mathrm s$ | $\mathrm l$ | $r_{\mathrm s}$ | $1-\alpha$ |
| $\mathrm l$ | $\mathrm s$ | $\mathrm h$ | $-3$ | $1-\beta$ |
| $\mathrm l$ | $\mathrm s$ | $\mathrm l$ | $r_{\mathrm s}$ | $\beta$ |
| $\mathrm h$ | $\mathrm w$ | $\mathrm h$ | $r_{\mathrm w}$ | $1$ |
| $\mathrm l$ | $\mathrm w$ | $\mathrm l$ | $r_{\mathrm w}$ | $1$ |
| $\mathrm l$ | $\mathrm{re}$ | $\mathrm h$ | $0$ | $1$ |

Mọi bộ $(s,a,s',c)$ khác có xác suất $0$.

**(b)** Theo (5.2), cộng các dòng có $(s,a)=(\mathrm l,\mathrm s)$:
$$
\begin{aligned}
P(\mathrm h\mid\mathrm l,\mathrm s)&=1-\beta,\\
r(\mathrm l,\mathrm s)&=\beta\,r_{\mathrm s}+(1-\beta)(-3)\\
&=\beta\,r_{\mathrm s}-3(1-\beta).
\end{aligned}
$$

**Kiểm tra lại.** Với mỗi cặp $(s,a)$, các xác suất trong bảng có tổng bằng $1$: $\alpha+(1-\alpha)$ cho $(\mathrm h,\mathrm s)$, $(1-\beta)+\beta$ cho $(\mathrm l,\mathrm s)$, và $1$ cho ba cặp còn lại.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 2, 3; biểu diễn phần thưởng kỳ vọng một bước dưới một chính sách ngẫu nhiên theo mô hình chuyển.

::: exercise Bài tập 13.6 (Phần thưởng kỳ vọng dưới một chính sách ngẫu nhiên; Sutton và Barto, Bài 3.11, §3.5, tr. 58)
Trong một MDP hữu hạn (Định nghĩa 13.5), hành động được chọn theo một chính sách Markov dừng ngẫu nhiên $\pi$, và trạng thái đầu $S_0$ có phân phối $\mu_0$ bất kỳ. Cho thời điểm $t$ và trạng thái $s$ với $\mathbb P_\pi(S_t=s)>0$. Biểu diễn $\mathbb E_\pi[R_{t+1}\mid S_t=s]$ theo $\pi$ và mô hình chuyển $p(s',c\mid s,a)$, rồi đối chiếu kết quả với $r^\pi(s)$ trong (5.3).
:::

::: hint Gợi ý Bài tập 13.6
Áp dụng Bổ đề 13.10 với $U\equiv0$ cho từng lịch sử $\tau$ kết thúc tại $s$, rồi lấy kỳ vọng toàn phần theo các lịch sử đó.
:::

::: solution Lời giải Bài tập 13.6
**Theo từng lịch sử.** Với $U\equiv0$, (5.7) cho $Q_U(s,a)=r(s,a)$. Xét một lịch sử $\tau$ có trạng thái cuối $s$ và $\mathbb P_\pi(H_t=\tau)>0$. Lịch sử $\tau$ chứa trạng thái đầu $s_0$ của nó, nên xác suất có điều kiện theo $\{H_t=\tau\}$ dưới $\mu_0$ trùng xác suất có điều kiện theo $\{H_t=\tau\}$ dưới $\mathbb P_\pi(\cdot\mid S_0=s_0)$. Bổ đề 13.10, với trạng thái đầu $s_0$ và $\rho_t(a\mid\tau)=\pi(a\mid s)$, cho
$$
\begin{aligned}
&\mathbb E_\pi[R_{t+1}\mid H_t=\tau]\\
&\quad=\sum_{a\in\mathcal A(s)}\pi(a\mid s)\,r(s,a).
\end{aligned}
$$
Vế phải không phụ thuộc $\tau$.

**Kỳ vọng toàn phần.** Biến cố $\{S_t=s\}$ là hợp rời của các biến cố $\{H_t=\tau\}$ với $\tau$ kết thúc tại $s$. Định lý 10.29, áp dụng cho xác suất có điều kiện $\mathbb P_\pi(\cdot\mid S_t=s)$ với biến điều kiện $H_t$, cho một trung bình có trọng số của cùng một số, nên
$$
\begin{aligned}
&\mathbb E_\pi[R_{t+1}\mid S_t=s]\\
&\quad=\sum_{a\in\mathcal A(s)}\pi(a\mid s)\\
&\qquad\times\sum_{s'\in\mathcal S}\sum_{c\in\mathcal R}c\,p(s',c\mid s,a).
\end{aligned}
$$
Theo (5.2), tổng trong là $r(s,a)$, nên kết quả bằng $r^\pi(s)$ của (5.3).

**Kiểm tra lại.** Với robot của Ví dụ 13.4 và chính sách chọn $A$, $B$ với xác suất $1/2$, công thức cho $\tfrac12\cdot1+\tfrac12\cdot0{,}6=0{,}8=r^\pi(h)$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 3, 4; chuyển qua lại giữa giá trị tối ưu, giá trị hành động tối ưu và chính sách tối ưu.

::: exercise Bài tập 13.7 (Giá trị tối ưu, giá trị hành động tối ưu và chính sách tối ưu; Sutton và Barto, Bài 3.25–3.28, §3.6, tr. 67)
Trong một MDP hữu hạn (Định nghĩa 13.5), $q_*(s,a)=Q_{V^*}(s,a)$ theo (5.7). Viết:

- **(a)** $V^*$ theo $q_*$;
- **(b)** $q_*$ theo $V^*$ và mô hình chuyển $p(s',c\mid s,a)$;
- **(c)** một chính sách tối ưu $\pi_*$ theo $q_*$;
- **(d)** một chính sách tối ưu $\pi_*$ theo $V^*$ và $p(s',c\mid s,a)$.
:::

::: hint Gợi ý Bài tập 13.7
Dùng phương trình Bellman tối ưu (6.8) và Định lý 13.19 cho chính sách tham lam; với (b) và (d), khai triển $r(s,a)$ và $P(s'\mid s,a)$ theo (5.2).
:::

::: solution Lời giải Bài tập 13.7
**(a)** Theo (6.8) và (5.7), $V^*(s)=\max_{a\in\mathcal A(s)}Q_{V^*}(s,a)$, tức
$$
V^*(s)=\max_{a\in\mathcal A(s)}q_*(s,a).
$$

**(b)** Thay (5.2) vào (5.7) với $U=V^*$ và gộp hai tổng:
$$
\begin{aligned}
q_*(s,a)&=\sum_{s'\in\mathcal S}\sum_{c\in\mathcal R}p(s',c\mid s,a)\\
&\qquad\times\bigl[c+\gamma V^*(s')\bigr].
\end{aligned}
$$

**(c)** Chính sách tất định dừng $\pi_*$ với
$$
\pi_*(s)\in\underset{a\in\mathcal A(s)}{\operatorname{argmax}}\;q_*(s,a)
$$
là chính sách tham lam theo $V^*$ (6.2). Theo Định lý 13.19, $V^*$ là điểm bất động $\bar V$ của $T$ và chính sách tham lam theo $\bar V$ là tối ưu, nên $\pi_*$ tối ưu.

**(d)** Thay (b) vào (c):
$$
\begin{aligned}
&\pi_*(s)\in\underset{a\in\mathcal A(s)}{\operatorname{argmax}}\\
&\quad\sum_{s'}\sum_{c}p(s',c\mid s,a)\\
&\qquad\times\bigl[c+\gamma V^*(s')\bigr].
\end{aligned}
$$

**Kiểm tra lại.** Với robot của Ví dụ 13.6, $V^*(h)=6$ và $V^*(z)=0$, nên $q_*(h,A)=1+0{,}45\cdot6=3{,}7$ và $q_*(h,B)=0{,}6+0{,}9\cdot6=6$. Theo (a), $V^*(h)=\max\{3{,}7;\,6\}=6$; theo (c), $\pi_*(h)=B$, đúng như Ví dụ 13.6.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; kiểm tra phương trình Bellman cho một chính sách cố định bằng các giá trị cho sẵn.

::: exercise Bài tập 13.8 (Kiểm tra phương trình Bellman trên lưới ô vuông; Sutton và Barto, Bài 3.14, §3.5, tr. 60)
Một tác tử di chuyển trên lưới $5\times5$ ô (Sutton và Barto, Ví dụ 3.5, tr. 60). Mỗi ô là một trạng thái; tại mỗi ô có bốn hành động bắc, nam, đông, tây, đưa tác tử sang ô kề theo hướng đó một cách tất định. Phần thưởng như sau:

- hành động đưa tác tử ra ngoài lưới giữ nguyên vị trí và cho thưởng $-1$;
- từ ô đặc biệt A, mọi hành động cho thưởng $+10$ và đưa tác tử tới ô A′; từ ô đặc biệt B, mọi hành động cho thưởng $+5$ và đưa tác tử tới ô B′;
- mọi hành động khác cho thưởng $0$.

Chính sách $\pi$ chọn bốn hành động với xác suất bằng nhau tại mọi ô, và $\gamma=0{,}9$. Ô ở chính giữa lưới không phải A, B và không nằm ở biên. Sách cho các giá trị $V^\pi$ làm tròn tới một chữ số thập phân: ô giữa có giá trị $0{,}7$; bốn ô kề phía bắc, đông, nam, tây có giá trị lần lượt $2{,}3$; $0{,}4$; $-0{,}4$; $0{,}7$.

- **(a)** Kiểm tra bằng số phương trình Bellman (5.12) tại ô giữa.
- **(b)** Mỗi giá trị cho sẵn sai khác giá trị thật không quá $0{,}05$. Chứng tỏ chênh lệch giữa hai vế ở (a) nằm trong phạm vi sai số làm tròn.
:::

::: hint Gợi ý Bài tập 13.8
Tại ô giữa, mỗi hành động cho thưởng $0$ và đưa tác tử sang một ô kề, nên $r^\pi$ bằng $0$ và mỗi ô kề có $P^\pi$ bằng $1/4$.
:::

::: solution Lời giải Bài tập 13.8
**(a)** Ô giữa không ở biên và không phải A, B, nên mọi hành động cho thưởng $0$ và $r^\pi(\text{giữa})=0$. Mỗi hành động có xác suất $1/4$ và đưa tác tử sang một ô kề khác nhau, nên theo (5.3) mỗi ô kề có $P^\pi(\text{giữa},\cdot)=1/4$. Vế phải của (5.12) là
$$
\begin{aligned}
&0+0{,}9\cdot\tfrac14\\
&\quad\times(2{,}3+0{,}4-0{,}4+0{,}7)\\
&\quad=0{,}225\cdot3{,}0=0{,}675,
\end{aligned}
$$
và $0{,}675$ làm tròn tới một chữ số thập phân là $0{,}7$, bằng vế trái.

**(b)** Gọi $x_i$ là giá trị thật và $\hat x_i$ là giá trị cho sẵn của ô kề thứ $i$, với $\lvert x_i-\hat x_i\rvert\le0{,}05$. Vế phải thật bằng $0{,}225\sum_ix_i$, nên nó sai khác $0{,}675$ không quá $0{,}225\cdot4\cdot0{,}05=0{,}045$, tức thuộc $[0{,}63;\ 0{,}72]$. Vế trái thật thuộc $[0{,}65;\ 0{,}75]$. Hai đoạn giao nhau theo $[0{,}65;\ 0{,}72]$, nên chênh lệch $0{,}7-0{,}675=0{,}025$ ở (a) phù hợp với sai số làm tròn.

**Kiểm tra lại.** Hệ số của mỗi ô kề là $0{,}9/4=0{,}225$, và tổng bốn hệ số bằng $0{,}9=\gamma$, đúng như mỗi hàng của $\gamma P^\pi$ có tổng $\gamma$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; viết bốn phương trình Bellman chỉ bằng xác suất chuyển và phần thưởng kỳ vọng.

::: exercise Bài tập 13.9 (Bốn phương trình Bellman theo xác suất chuyển và phần thưởng kỳ vọng; Sutton và Barto, Bài 3.29, §3.6, tr. 67)
Trong một MDP hữu hạn (Định nghĩa 13.5), với chính sách Markov dừng $\pi$, đặt $q_\pi(s,a)=Q_{V^\pi}(s,a)$ và $q_*(s,a)=Q_{V^*}(s,a)$ theo (5.7). Viết bốn phương trình Bellman cho $V^\pi$, $V^*$, $q_\pi$ và $q_*$ chỉ dùng $\pi$, $\gamma$, xác suất chuyển $P(s'\mid s,a)$ và phần thưởng kỳ vọng $r(s,a)$ của (5.2).
:::

::: hint Gợi ý Bài tập 13.9
Hai phương trình cho $V^\pi$ và $V^*$ là (5.12) và (6.8) viết qua $P$ và $r$. Với giá trị hành động, thay $V^\pi(s')$ và $V^*(s')$ trong (5.7) bằng biểu thức theo $q_\pi$ và $q_*$.
:::

::: solution Lời giải Bài tập 13.9
**Giá trị của chính sách.** Thay (5.3) vào (5.12):
$$
\begin{aligned}
&V^\pi(s)\\
&\quad=\sum_{a\in\mathcal A(s)}\pi(a\mid s)\Bigl[r(s,a)\\
&\qquad+\gamma\sum_{s'}P(s'\mid s,a)\,V^\pi(s')\Bigr].
\end{aligned}
$$

**Giá trị tối ưu.** Đây là (6.8):
$$
\begin{aligned}
&V^*(s)\\
&\quad=\max_{a\in\mathcal A(s)}\Bigl[r(s,a)\\
&\qquad+\gamma\sum_{s'}P(s'\mid s,a)\,V^*(s')\Bigr].
\end{aligned}
$$

**Giá trị hành động của chính sách.** Theo Định lý 13.12, $V^\pi=T^\pi V^\pi$, và theo (5.8), $V^\pi(s')=\sum_{a'}\pi(a'\mid s')\,q_\pi(s',a')$. Thay vào (5.7) với $U=V^\pi$:
$$
\begin{aligned}
&q_\pi(s,a)=r(s,a)\\
&\quad+\gamma\sum_{s'}P(s'\mid s,a)\\
&\qquad\times\sum_{a'\in\mathcal A(s')}\pi(a'\mid s')\,q_\pi(s',a').
\end{aligned}
$$

**Giá trị hành động tối ưu.** Theo Bài tập 13.7(a), $V^*(s')=\max_{a'}q_*(s',a')$. Thay vào (5.7) với $U=V^*$:
$$
\begin{aligned}
&q_*(s,a)=r(s,a)\\
&\quad+\gamma\sum_{s'}P(s'\mid s,a)\\
&\qquad\times\max_{a'\in\mathcal A(s')}q_*(s',a').
\end{aligned}
$$

**Kiểm tra lại.** Với robot của Ví dụ 13.5 và chính sách luôn chọn $B$, phương trình thứ ba tại $(h,B)$ là $q_\pi(h,B)=0{,}6+0{,}9\,q_\pi(h,B)$, cho $q_\pi(h,B)=6=V^B(h)$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; viết phương trình Bellman cho giá trị hành động tối ưu của một MDP cụ thể.

::: exercise Bài tập 13.10 (Phương trình Bellman cho giá trị hành động tối ưu của robot thu gom lon; Sutton và Barto, Bài 3.23, §3.6, tr. 67)
Robot thu gom vỏ lon có hai trạng thái $\mathrm h$ (pin cao), $\mathrm l$ (pin thấp) và các hành động $\mathrm s$ (tìm lon), $\mathrm w$ (đứng chờ), $\mathrm{re}$ (về trạm sạc), với $\mathcal A(\mathrm h)=\{\mathrm s,\mathrm w\}$ và $\mathcal A(\mathrm l)=\{\mathrm s,\mathrm w,\mathrm{re}\}$. Dữ kiện (Sutton và Barto, Ví dụ 3.3, tr. 52):

- tìm lon từ $\mathrm h$: ở lại $\mathrm h$ với xác suất $\alpha$, sang $\mathrm l$ với xác suất $1-\alpha$, phần thưởng $r_{\mathrm s}$;
- tìm lon từ $\mathrm l$: ở lại $\mathrm l$ với xác suất $\beta$, phần thưởng $r_{\mathrm s}$; với xác suất $1-\beta$ pin cạn, robot được cứu và về $\mathrm h$, phần thưởng $-3$;
- đứng chờ: trạng thái giữ nguyên, phần thưởng $r_{\mathrm w}$;
- về trạm sạc từ $\mathrm l$: sang $\mathrm h$ với xác suất $1$, phần thưởng $0$.

Cho $0\le\gamma<1$. Viết phương trình Bellman cho $q_*(s,a)=Q_{V^*}(s,a)$ tại năm cặp $(s,a)$.
:::

::: hint Gợi ý Bài tập 13.10
Dùng phương trình cho $q_*$ ở Bài tập 13.9. Tính $r(s,a)$ và $P(s'\mid s,a)$ của từng cặp theo (5.2), như Bài tập 13.5(b).
:::

::: solution Lời giải Bài tập 13.10
**Phần thưởng kỳ vọng.** Theo (5.2), $r(\mathrm h,\mathrm s)=r_{\mathrm s}$, $r(\mathrm l,\mathrm s)=\beta r_{\mathrm s}-3(1-\beta)$, $r(\mathrm h,\mathrm w)=r(\mathrm l,\mathrm w)=r_{\mathrm w}$ và $r(\mathrm l,\mathrm{re})=0$.

**Năm phương trình.** Đặt $M_{\mathrm h}=\max\{q_*(\mathrm h,\mathrm s),\,q_*(\mathrm h,\mathrm w)\}$ và $M_{\mathrm l}=\max\{q_*(\mathrm l,\mathrm s),\,q_*(\mathrm l,\mathrm w),\,q_*(\mathrm l,\mathrm{re})\}$. Phương trình cho $q_*$ ở Bài tập 13.9 cho
$$
\begin{aligned}
&q_*(\mathrm h,\mathrm s)=r_{\mathrm s}\\
&\quad+\gamma\bigl[\alpha M_{\mathrm h}+(1-\alpha)M_{\mathrm l}\bigr],\\
&q_*(\mathrm h,\mathrm w)=r_{\mathrm w}+\gamma M_{\mathrm h},\\
&q_*(\mathrm l,\mathrm s)=\beta r_{\mathrm s}-3(1-\beta)\\
&\quad+\gamma\bigl[(1-\beta)M_{\mathrm h}+\beta M_{\mathrm l}\bigr],\\
&q_*(\mathrm l,\mathrm w)=r_{\mathrm w}+\gamma M_{\mathrm l},\\
&q_*(\mathrm l,\mathrm{re})=\gamma M_{\mathrm h}.
\end{aligned}
$$

**Kiểm tra lại.** Theo Bài tập 13.7(a), $V^*(\mathrm h)=M_{\mathrm h}$ và $V^*(\mathrm l)=M_{\mathrm l}$. Lấy cực đại hai phương trình đầu và ba phương trình sau được
$$
\begin{aligned}
&V^*(\mathrm h)=\max\bigl\{r_{\mathrm s}\\
&\quad+\gamma[\alpha V^*(\mathrm h)+(1-\alpha)V^*(\mathrm l)];\\
&\quad r_{\mathrm w}+\gamma V^*(\mathrm h)\bigr\},\\
&V^*(\mathrm l)=\max\bigl\{\beta r_{\mathrm s}-3(1-\beta)\\
&\quad+\gamma[(1-\beta)V^*(\mathrm h)+\beta V^*(\mathrm l)];\\
&\quad r_{\mathrm w}+\gamma V^*(\mathrm l);\ \gamma V^*(\mathrm h)\bigr\},
\end{aligned}
$$
trùng phương trình Bellman tối ưu (6.8) cho mô hình này, như Sutton và Barto viết ở Ví dụ 3.9 (tr. 65–66).
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; chứng minh rằng cộng một hằng số vào mọi phần thưởng chỉ dịch mọi giá trị đi một hằng số.

::: exercise Bài tập 13.11 (Cộng một hằng số vào mọi phần thưởng; Sutton và Barto, Bài 3.15, §3.5, tr. 61)
Cho một MDP hữu hạn (Định nghĩa 13.5) và một hằng số $b\in\mathbb R$. MDP mới giữ nguyên trạng thái, hành động và cơ chế chuyển, nhưng mỗi phần thưởng $R_{t+1}$ được thay bằng $R_{t+1}+b$. Ký hiệu $V_b^\pi$ là hàm giá trị của chính sách Markov dừng $\pi$ trong MDP mới.

- **(a)** Dùng (5.4), chứng minh tồn tại hằng số $v_b$ không phụ thuộc $s$ và $\pi$ sao cho $V_b^\pi(s)=V^\pi(s)+v_b$ với mọi $s$ và mọi $\pi$. Tính $v_b$ theo $b$ và $\gamma$.
- **(b)** Suy ra thứ tự giá trị giữa các trạng thái dưới mỗi chính sách không đổi.
:::

::: hint Gợi ý Bài tập 13.11
Dưới cùng một chính sách Markov dừng, phân phối của dãy trạng thái và hành động không đổi; chỉ mỗi phần thưởng tăng thêm $b$. Tách tổng thưởng mới thành hai chuỗi hội tụ tuyệt đối (Mệnh đề 13.8).
:::

::: solution Lời giải Bài tập 13.11
**Mô hình mới hợp lệ.** Tập giá trị phần thưởng mới $\{c+b:c\in\mathcal R\}$ hữu hạn và nằm trong $[-R_{\max}-\lvert b\rvert,\ R_{\max}+\lvert b\rvert]$, nên MDP mới thỏa Định nghĩa 13.5.

**(a)** Chính sách $\pi$ chọn hành động chỉ theo trạng thái hiện tại, và xác suất chuyển $P(s'\mid s,a)$ không đổi, nên khi $S_0=s$, dãy $(S_t,A_t,R_{t+1})_{t\ge0}$ của MDP mới có cùng phân phối với dãy $(S_t,A_t,R_{t+1}+b)_{t\ge0}$ của MDP cũ. Trên mỗi quỹ đạo, theo (5.4), tổng thưởng mới là
$$
\begin{aligned}
G_0^{(b)}&=\sum_{j\ge0}\gamma^j\bigl(R_{j+1}+b\bigr)\\
&=\sum_{j\ge0}\gamma^jR_{j+1}+b\sum_{j\ge0}\gamma^j\\
&=G_0+\frac{b}{1-\gamma}.
\end{aligned}
$$
Tách thành hai chuỗi được vì cả hai hội tụ tuyệt đối (Mệnh đề 13.8 và $0\le\gamma<1$). Lấy kỳ vọng với $S_0=s$:
$$
V_b^\pi(s)=V^\pi(s)+\frac{b}{1-\gamma},
$$
tức $v_b=b/(1-\gamma)$, không phụ thuộc $s$ và $\pi$.

**(b)** Với mọi $s_1,s_2$, $V_b^\pi(s_1)-V_b^\pi(s_2)=V^\pi(s_1)-V^\pi(s_2)$, nên thứ tự và hiệu giá trị giữa các trạng thái không đổi.

**Kiểm tra lại.** Trong MDP mới, (5.3) cho thưởng $r^\pi+b\mathbf 1$ với $\mathbf 1$ là vector toàn số $1$, và ma trận $P^\pi$ không đổi. Vì $P^\pi\mathbf 1=\mathbf 1$, vector $V^\pi+\tfrac{b}{1-\gamma}\mathbf 1$ thỏa
$$
\begin{aligned}
&r^\pi+b\mathbf 1+\gamma P^\pi\Bigl(V^\pi+\tfrac{b}{1-\gamma}\mathbf 1\Bigr)\\
&\quad=V^\pi+\Bigl(b+\tfrac{\gamma b}{1-\gamma}\Bigr)\mathbf 1\\
&\quad=V^\pi+\tfrac{b}{1-\gamma}\mathbf 1,
\end{aligned}
$$
và theo tính duy nhất trong Định lý 13.12, đó là $V_b^\pi$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 4; viết lặp giá trị cho giá trị hành động.

::: exercise Bài tập 13.12 (Lặp giá trị cho giá trị hành động; Sutton và Barto, Bài 4.10, §4.4, tr. 84)
Trong một MDP hữu hạn (Định nghĩa 13.5), lặp giá trị (Hệ quả 13.18) tính $V_{k+1}=TV_k$, tức
$$
\begin{aligned}
&V_{k+1}(s)\\
&\quad=\max_{a\in\mathcal A(s)}\sum_{s'}\sum_{c}p(s',c\mid s,a)\\
&\qquad\times\bigl[c+\gamma V_k(s')\bigr].
\end{aligned}
$$

Viết phép cập nhật tương ứng cho bảng giá trị hành động, $q_{k+1}(s,a)$ theo $q_k$ và $p(s',c\mid s,a)$, sao cho $q_k=Q_{V_k}$ kéo theo $q_{k+1}=Q_{V_{k+1}}$. Chứng minh tính chất đó.
:::

::: hint Gợi ý Bài tập 13.12
Thay $V_k(s')$ bằng $\max_{a'}q_k(s',a')$; theo (6.1), $\max_{a'}Q_{V_k}(s',a')=(TV_k)(s')$.
:::

::: solution Lời giải Bài tập 13.12
Phép cập nhật là
$$
\begin{aligned}
&q_{k+1}(s,a)\\
&\quad=\sum_{s'}\sum_{c}p(s',c\mid s,a)\\
&\qquad\times\Bigl[c+\gamma\max_{a'\in\mathcal A(s')}q_k(s',a')\Bigr].
\end{aligned}
$$
Giả sử $q_k=Q_{V_k}$. Theo (6.1), $\max_{a'}Q_{V_k}(s',a')=(TV_k)(s')=V_{k+1}(s')$. Thay vào vế phải và dùng (5.2):
$$
\begin{aligned}
&q_{k+1}(s,a)=r(s,a)\\
&\quad+\gamma\sum_{s'}P(s'\mid s,a)\,V_{k+1}(s')\\
&\quad=Q_{V_{k+1}}(s,a).
\end{aligned}
$$
Nếu $q_0=Q_{V_0}$, quy nạp theo $k$ cho $q_k=Q_{V_k}$ với mọi $k$.

**Kiểm tra lại.** Với robot của Ví dụ 13.6 và $V_0=0$: $q_0(h,A)=1$, $q_0(h,B)=0{,}6$, $q_0(z,\cdot)=0$. Phép cập nhật trên cho $q_1(h,A)=1+0{,}45\cdot1+0{,}45\cdot0=1{,}45$ và $q_1(h,B)=0{,}6+0{,}9\cdot1=1{,}5$, trùng dòng $k=1$ của bảng trong Ví dụ 13.6.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 3, 5; xác định chính sách tối ưu theo hệ số chiết khấu và thực hiện lặp giá trị bằng tay.

::: exercise Bài tập 13.13 (Chính sách tối ưu phụ thuộc hệ số chiết khấu; Sutton và Barto, Bài 3.22, §3.6, tr. 66)
Một MDP không có trạng thái kết thúc gồm ba trạng thái $s_0$, $s_{\mathrm L}$, $s_{\mathrm R}$. Mọi chuyển tiếp và phần thưởng đều tất định:

- tại $s_0$, hành động $\mathrm L$ (trái) cho thưởng $+1$ và đưa tác tử tới $s_{\mathrm L}$; hành động $\mathrm R$ (phải) cho thưởng $0$ và đưa tác tử tới $s_{\mathrm R}$;
- tại $s_{\mathrm L}$ chỉ có một hành động, cho thưởng $0$ và đưa tác tử về $s_0$;
- tại $s_{\mathrm R}$ chỉ có một hành động, cho thưởng $+2$ và đưa tác tử về $s_0$.

Có đúng hai chính sách tất định dừng, $\pi_{\mathrm L}$ và $\pi_{\mathrm R}$, khác nhau ở hành động tại $s_0$.

- **(a)** Xác định chính sách tối ưu khi $\gamma=0$, $\gamma=0{,}9$ và $\gamma=0{,}5$.
- **(b)** Với $\gamma=0{,}9$ và $V_0=0$, tính $V_1$, $V_2$, $V_3$ bằng lặp giá trị và ghi hành động đạt cực đại tại $s_0$ ở mỗi vòng. Giải thích vì sao hành động $\mathrm L$ có phần thưởng tức thời lớn hơn nhưng không tối ưu.
:::

::: hint Gợi ý Bài tập 13.13
Dưới mỗi chính sách, dãy phần thưởng từ $s_0$ lặp lại với chu kỳ hai bước: $1,0,1,0,\ldots$ hoặc $0,2,0,2,\ldots$. Tổng thưởng là một cấp số nhân theo $\gamma^2$.
:::

::: solution Lời giải Bài tập 13.13
**Giá trị của hai chính sách.** Theo (5.4), từ $s_0$:
$$
\begin{aligned}
V^{\pi_{\mathrm L}}(s_0)&=1+\gamma^2+\gamma^4+\cdots\\
&=\frac{1}{1-\gamma^2},\\
V^{\pi_{\mathrm R}}(s_0)&=2\gamma+2\gamma^3+\cdots\\
&=\frac{2\gamma}{1-\gamma^2}.
\end{aligned}
$$
Dưới cả hai chính sách, $V(s_{\mathrm L})=\gamma V(s_0)$ và $V(s_{\mathrm R})=2+\gamma V(s_0)$, nên chính sách có giá trị lớn hơn tại $s_0$ cũng có giá trị không nhỏ hơn tại mọi trạng thái.

**(a)** Theo Định lý 13.19, có một chính sách tối ưu tất định dừng, tức là $\pi_{\mathrm L}$ hoặc $\pi_{\mathrm R}$; chính sách tối ưu là chính sách có giá trị lớn hơn tại $s_0$. So $1$ với $2\gamma$:

- $\gamma=0$: $V^{\pi_{\mathrm L}}(s_0)=1>0=V^{\pi_{\mathrm R}}(s_0)$, nên $\pi_{\mathrm L}$ tối ưu.
- $\gamma=0{,}9$: $V^{\pi_{\mathrm L}}(s_0)=100/19\approx5{,}263$ và $V^{\pi_{\mathrm R}}(s_0)=180/19\approx9{,}474$, nên $\pi_{\mathrm R}$ tối ưu.
- $\gamma=0{,}5$: $1=2\gamma$, cả hai chính sách có cùng vector giá trị, với $V(s_0)=4/3$, nên cả hai đều tối ưu.

**(b)** Theo (6.1), với thứ tự $(s_0;\,s_{\mathrm L};\,s_{\mathrm R})$,
$$
\begin{aligned}
(TV)(s_0)&=\max\{1+0{,}9\,V(s_{\mathrm L});\\
&\qquad0{,}9\,V(s_{\mathrm R})\},\\
(TV)(s_{\mathrm L})&=0{,}9\,V(s_0),\\
(TV)(s_{\mathrm R})&=2+0{,}9\,V(s_0).
\end{aligned}
$$

| $k$ | $V_k(s_0)$ | $V_k(s_{\mathrm L})$ | $V_k(s_{\mathrm R})$ | Hành động đạt cực đại tại $s_0$ |
|---:|---:|---:|---:|---|
| 1 | $\max\{1;\,0\}=1$ | $0$ | $2$ | $\mathrm L$ |
| 2 | $\max\{1;\,1{,}8\}=1{,}8$ | $0{,}9$ | $2{,}9$ | $\mathrm R$ |
| 3 | $\max\{1{,}81;\,2{,}61\}=2{,}61$ | $1{,}62$ | $3{,}62$ | $\mathrm R$ |

Ở vòng đầu, $V_0=0$ chưa chứa giá trị của phần đuôi, nên phép lặp chỉ so phần thưởng tức thời $1$ với $0$. Từ vòng thứ hai, nhánh $\mathrm R$ được cộng $0{,}9\cdot2$ của bước kế tiếp. Trên hai bước, $\mathrm L$ cho tổng chiết khấu $1$ còn $\mathrm R$ cho $2\gamma=1{,}8$; vì vậy $\mathrm R$ tối ưu dù phần thưởng tức thời bằng $0$.

**Kiểm tra lại.** Điểm bất động là $V^*=(180/19;\ 162/19;\ 200/19)\approx(9{,}474;\ 8{,}526;\ 10{,}526)$. Tại $s_0$, nhánh $\mathrm L$ bằng $1+0{,}9\cdot162/19=164{,}8/19<180/19$, nên $TV^*=V^*$. Chặn (6.7) tại $k=3$: $\lVert V_3-V^*\rVert_\infty\approx6{,}906\le0{,}9^3\cdot200/19\approx7{,}674$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 2, 5; tính giá trị tối ưu từ một chính sách tối ưu đã biết bằng tổng thưởng chiết khấu.

::: exercise Bài tập 13.14 (Giá trị tối ưu của ô tốt nhất trên lưới ô vuông; Sutton và Barto, Bài 3.24, §3.6, tr. 67)
Xét lưới $5\times5$ ô của Bài tập 13.8 (Sutton và Barto, Ví dụ 3.5 và 3.8, tr. 60 và 65): bốn hành động bắc, nam, đông, tây tất định; hành động ra ngoài lưới giữ nguyên vị trí và cho thưởng $-1$; từ A mọi hành động cho thưởng $+10$ và đưa tác tử tới A′; từ B mọi hành động cho thưởng $+5$ và đưa tác tử tới B′; mọi hành động khác cho thưởng $0$; $\gamma=0{,}9$. Đánh số hàng từ trên xuống và cột từ trái sang: A ở hàng 1, cột 2; A′ ở hàng 5, cột 2; B ở hàng 1, cột 4; B′ ở hàng 3, cột 4. Một chính sách tối ưu chọn hướng bắc tại các ô hàng 2 đến hàng 5 của cột 2. Sách cho $V^*(\mathrm A)\approx24{,}4$, làm tròn tới một chữ số thập phân.

Dùng chính sách tối ưu này và (5.4), biểu diễn $V^*(\mathrm A)$ theo $\gamma$, rồi tính giá trị tới ba chữ số thập phân.
:::

::: hint Gợi ý Bài tập 13.14
Theo chính sách đã cho, tác tử đi từ A tới A′ rồi bốn bước lên phía bắc về A; dãy phần thưởng lặp lại với chu kỳ năm bước.
:::

::: solution Lời giải Bài tập 13.14
**Dãy phần thưởng.** Từ A, bước đầu cho thưởng $10$ và đưa tác tử tới A′ (hàng 5, cột 2). Bốn bước bắc tiếp theo đi qua hàng 4, 3, 2 của cột 2 rồi tới A; các bước này ở trong lưới, không xuất phát từ A hay B, nên cho thưởng $0$. Dãy phần thưởng là $10,0,0,0,0,10,0,0,0,0,\ldots$, với chu kỳ $5$.

**Giá trị.** Chính sách và chuyển tiếp đều tất định nên tổng thưởng không ngẫu nhiên. Theo (5.4),
$$
G_0=10\sum_{m\ge0}\gamma^{5m}=\frac{10}{1-\gamma^5}.
$$
Chính sách đã cho là tối ưu, nên $V^*(\mathrm A)=10/(1-\gamma^5)$. Với $\gamma=0{,}9$, $\gamma^5=0{,}59049$ và
$$
V^*(\mathrm A)=\frac{10}{0{,}40951}\approx24{,}419.
$$

**Kiểm tra lại.** Từ A′, bốn bước thưởng $0$ rồi tới A, nên $V^*(\mathrm A')=\gamma^4V^*(\mathrm A)=0{,}6561\cdot24{,}419\approx16{,}02$, phù hợp giá trị $16{,}0$ sách cho tại A′. Phương trình (6.8) tại A thỏa: $10+0{,}9\cdot16{,}0216\approx24{,}419$.
:::

## Tài liệu tham khảo

- Sutton, Richard S.; Barto, Andrew G. (2018), *Reinforcement Learning: An Introduction*, ấn bản 2, MIT Press:
  - Ví dụ 3.3 (tr. 52), Ví dụ 3.5 (tr. 60), Ví dụ 3.8 và 3.9 (tr. 65–66);
  - mục bài tập của Chương 3: Bài 3.4 (tr. 53), 3.9 (tr. 56), 3.11 (tr. 58), 3.14 (tr. 60), 3.15 (tr. 61), 3.22 (tr. 66), 3.23–3.29 (tr. 67);
  - mục bài tập của Chương 4: Bài 4.10 (tr. 84).
