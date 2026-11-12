# Bài tập Bài 05 — Không gian đặc trưng nhiều chiều

Tám bài tập dưới đây, đánh số tiếp theo các bài tập trong ghi chú, đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-05/lecture-note.md&deck=lecture-05-khong-gian-dac-trung-nhieu-chieu.html) và [bài giảng](lecture-05-khong-gian-dac-trung-nhieu-chieu.html) của Bài 05. Các bài lấy từ Boyd và Vandenberghe (2004), Chương 7 và Chương 9; số trang là trang in của sách. Lời giải dẫn định nghĩa, định lý, mệnh đề, ví dụ và bài tập theo số hiệu của ghi chú. Ký hiệu theo ghi chú gồm:

- biến là $w\in\mathbb R^d$, $g$ và $H$ là gradient và Hessian tại điểm đang xét, $p$ là hướng Newton, $t$ là độ dài bước, $\delta_N$ là độ giảm Newton;
- vector viết dạng cột, ví dụ $g=(2,1)^T$;
- $n$ là số số hạng (số mẫu), phép đếm chi phí theo giả thiết (G5) của ghi chú.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Phương trình chuẩn, hạng, nghiệm chuẩn nhỏ nhất, số điều kiện; chọn và báo cáo mô hình | 05.1, 05.2, 05.3, 05.13, 05.14 | 05.16 |
| 2. Tách được, sự tồn tại điểm cực tiểu, tính lồi mạnh và hằng số độ cong | 05.4, 05.5, 05.6, 05.11, 05.13 | 05.22 |
| 3. Chi phí một bước, số bước và tổng chi phí của hạ gradient và Newton | 05.7, 05.8, 05.9, 05.13, 05.15 | 05.17, 05.18, 05.19, 05.20, 05.21, 05.23 |
| 4. Dừng sớm, hai giới hạn của khung tất định, các bảo đảm còn lại | 05.10, 05.11, 05.12 | — |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 1; nhận ra khi nào hàm bậc hai không bị chặn dưới.

::: exercise Bài tập 05.16 (Hàm bậc hai không bị chặn dưới; Boyd và Vandenberghe, Bài 9.1, tr. 514)
Cho $f(w)=\tfrac12w^TPw+q^Tw+c_0$ với $P\in\mathbb R^{d\times d}$ đối xứng, $q\in\mathbb R^d$, $c_0\in\mathbb R$.

- **(a)** Chứng minh nếu $P$ không nửa xác định dương thì $f$ không bị chặn dưới.
- **(b)** Giả sử $P\succeq0$ nhưng hệ $Pw=-q$ vô nghiệm. Chứng minh $f$ không bị chặn dưới.
:::

::: hint Gợi ý 1
Ở cả hai câu, tìm một hướng $v$ sao cho $f(sv)\to-\infty$ khi $s\to\infty$.
:::

::: hint Gợi ý 2
Ở (b), hệ $Pw=-q$ vô nghiệm nghĩa là $q\notin\operatorname{Col}(P)$; phân tích $q$ theo Mệnh đề 00.8(1) với $A=P$.
:::

::: solution Lời giải Bài tập 05.16
**Câu (a).** Có $v$ với $v^TPv<0$. Khi đó $f(sv)=\tfrac{s^2}2v^TPv+s\,q^Tv+c_0\to-\infty$ khi $s\to\infty$, vì hệ số của $s^2$ âm.

**Câu (b).** Theo Mệnh đề 00.8(1) với $A=P$ đối xứng, $q=q_1+q_2$ với $q_1\in\operatorname{Col}(P)$, $q_2\in\operatorname{Ker}(P)$, $q_1\perp q_2$. Vì $q\notin\operatorname{Col}(P)$, $q_2\ne0$. Với $Pq_2=0$ và $q^Tq_2=\lVert q_2\rVert^2$,

$$
f(-sq_2)=-s\lVert q_2\rVert^2+c_0\to-\infty
$$

khi $s\to\infty$.

**Kiểm tra lại.** Với $d=1$, $P=p<0$: $f(s)=\tfrac p2s^2+qs+c_0\to-\infty$. Với $d=1$, $P=0$, $q\ne0$: $Pw=-q$ vô nghiệm, $q_2=q$, và $f(-sq)=-sq^2+c_0\to-\infty$.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; tách hệ Newton theo các khối của Hessian, đếm chi phí và suy ra tính tách được của $f$.

::: exercise Bài tập 05.17 (Hessian khối chéo trong hệ Newton; Boyd và Vandenberghe, Bài 9.24, tr. 518)
Cho $f:\mathbb R^d\to\mathbb R$ lồi, lớp $C^2$. Chia $w$ thành $J$ khối $w=(w_{(1)},\ldots,w_{(J)})$ với $w_{(j)}\in\mathbb R^{d_j}$, $d_1+\cdots+d_J=d$.

- **(a)** Giả sử tại một điểm $w$, $H=\nabla^2f(w)\succ0$ là ma trận khối chéo $\operatorname{diag}(H_1,\ldots,H_J)$ với $H_j\in\mathbb R^{d_j\times d_j}$. Chứng minh hướng Newton $p$ gồm các khối $p_{(j)}=-H_j^{-1}g_{(j)}$, và so số phép nhân–cộng của $J$ phép phân tích Cholesky cỡ $d_j$ với một phép phân tích Cholesky cỡ $d$.
- **(b)** Giả sử $\nabla^2f(w)$ khối chéo theo cùng cách chia tại mọi $w\in\mathbb R^d$. Chứng minh $f(w)=f(0)+\sum_j\bigl(f(\hat w_{(j)})-f(0)\bigr)$, với $\hat w_{(j)}$ là vector chỉ giữ khối $j$ của $w$ và đặt các khối khác bằng $0$.
:::

::: hint Gợi ý 1
Ở (a), viết hệ $Hp=-g$ theo khối. Phân tích Cholesky ma trận cỡ $k$ tốn khoảng $k^3/6$ phép nhân–cộng (ghi chú, đoạn sau Thuật toán 05.32).
:::

::: hint Gợi ý 2
Ở (b), xét $\partial f/\partial w_i$ dọc một đoạn chỉ làm thay đổi các khối khác khối chứa $i$, rồi dùng $f(w)-f(0)=\int_0^1\nabla f(sw)^Tw\,ds$.
:::

::: solution Lời giải Bài tập 05.17
**Câu (a).** Hệ $Hp=-g$ theo khối là $H_jp_{(j)}=-g_{(j)}$, $j=1,\ldots,J$, vì các khối ngoài đường chéo bằng $0$. Mỗi $H_j\succ0$ là ma trận con chính của $H\succ0$, nên khả nghịch, và $p_{(j)}=-H_j^{-1}g_{(j)}$. Giải từng khối bằng Cholesky tốn khoảng $\sum_jd_j^3/6$ phép nhân–cộng, so với $d^3/6$ cho cả hệ. Với $J$ khối bằng nhau, $d_j=d/J$, tỉ số là $J\cdot(d/J)^3/d^3=1/J^2$.

**Câu (b).** Lấy $i$ thuộc khối $j$. Dọc đoạn từ $\hat w_{(j)}$ tới $w$, chỉ các khối khác khối $j$ thay đổi, và mọi đạo hàm riêng $\partial^2f/\partial w_k\partial w_i$ với $k$ ngoài khối $j$ bằng $0$; theo công thức Newton–Leibniz, $\partial f/\partial w_i$ không đổi dọc đoạn đó. Vậy $\nabla_{(j)}f(w)=\nabla_{(j)}f(\hat w_{(j)})$ với mọi $w$, và

$$
\begin{aligned}
&f(w)-f(0)\\
&=\int_0^1\nabla f(sw)^Tw\,ds\\
&=\sum_j\int_0^1\nabla_{(j)}f(s\hat w_{(j)})^Tw_{(j)}\,ds\\
&=\sum_j\bigl(f(\hat w_{(j)})-f(0)\bigr).
\end{aligned}
$$

Quan hệ cuối là công thức tích phân của $f$ dọc đoạn từ $0$ tới $\hat w_{(j)}$. Vậy $f$ là tổng của $J$ hàm của các khối rời nhau, và bài toán cực tiểu hóa tách thành $J$ bài toán độc lập. Kết luận cần Hessian khối chéo tại mọi $w$: chẳng hạn $f(w)=w_1^2+w_2^2+(w_1+w_2)^4$ lồi, $\nabla^2f(0)=2I$, nhưng $\partial^2f/\partial w_1\partial w_2=12(w_1+w_2)^2\ne0$ khi $w_1+w_2\ne0$, nên $f$ không tách thành tổng của một hàm theo $w_1$ và một hàm theo $w_2$.

**Kiểm tra lại.** Với $J=1$, tỉ số $1/J^2=1$, đúng vì chỉ có một hệ. Với $J=d$ (mọi khối cỡ $1$), $H$ chéo và $p_i=-g_i/h_{ii}$ cần $d$ phép chia. Với $f(w)=w_1^2+e^{w_2}$, Hessian chéo tại mọi $w$ và $f(0)+(f(\hat w_{(1)})-f(0))+(f(\hat w_{(2)})-f(0))=1+w_1^2+(e^{w_2}-1)=f(w)$, khớp (b).
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; so hướng hạ gradient và hướng Newton trên một hàm và trên hàm hợp của nó.

::: exercise Bài tập 05.18 (Hạ gradient và Newton trên hàm hợp; Boyd và Vandenberghe, Bài 9.11, tr. 515)
Cho $f:\mathbb R^d\to\mathbb R$ lồi, lớp $C^2$, với $\nabla^2f(w)\succ0$ tại mọi $w$, và $\psi:\mathbb R\to\mathbb R$ lớp $C^2$, lồi, với $\psi'>0$. Đặt $h(w)=\psi(f(w))$. *Tìm kiếm đường chính xác* (exact line search) theo hướng $v$ chọn $t$ cực tiểu hóa hàm cần tối ưu dọc tia $w+tv$, $t>0$.

- **(a)** Chứng minh $h$ lồi, $\nabla h(w)=\psi'(f(w))\nabla f(w)$, và hạ gradient với tìm kiếm đường chính xác cho cùng dãy lặp trên $f$ và trên $h$.
- **(b)** Dùng công thức Sherman–Morrison (bổ đề nghịch đảo ma trận, matrix inversion lemma) $(M+uu^T)^{-1}=M^{-1}-\frac{M^{-1}uu^TM^{-1}}{1+u^TM^{-1}u}$ với $M\succ0$, chứng minh hướng Newton của $h$ bằng $\frac1{1+\theta\delta_N^2}$ nhân hướng Newton $p$ của $f$, với $\theta=\psi''(f(w))/\psi'(f(w))$ và $\delta_N^2=\nabla f(w)^T\nabla^2f(w)^{-1}\nabla f(w)$. So hai phương pháp Newton khi dùng tìm kiếm đường chính xác và khi dùng bước đầy đủ $t=1$.
:::

::: hint Gợi ý 1
Tính $\nabla^2h$ theo quy tắc dây chuyền. Hai hướng là bội dương của nhau thì cùng một tia.
:::

::: hint Gợi ý 2
Ở (b), áp công thức với $M=\psi'\nabla^2f$ và $u=\sqrt{\psi''}\,\nabla f$, rồi nhân với $\nabla h$.
:::

::: solution Lời giải Bài tập 05.18
**Câu (a).** Theo quy tắc dây chuyền, $\nabla h=\psi'(f)\nabla f$ và $\nabla^2h=\psi''(f)\nabla f\nabla f^T+\psi'(f)\nabla^2f\succeq0$, vì $\psi''\ge0$ và $\psi'>0$; vậy $h$ lồi (Định lý 01.29). Hướng hạ gradient của $h$ là $-\psi'(f)\nabla f$, bội dương của hướng của $f$, nên hai phương pháp đi trên cùng một tia. Vì $\psi$ tăng, $t\mapsto h(w+tv)=\psi(f(w+tv))$ và $t\mapsto f(w+tv)$ có cùng điểm cực tiểu, nên tìm kiếm đường chính xác chọn cùng điểm mới. Từ cùng điểm đầu, quy nạp cho hai dãy lặp trùng nhau.

**Câu (b).** Viết $a=\psi'(f(w))>0$, $c=\psi''(f(w))\ge0$, $z=\nabla f(w)$, $G=\nabla^2f(w)$, nên $\delta_N^2=z^TG^{-1}z$. Công thức với $M=aG$, $u=\sqrt c\,z$ cho

$$
\begin{aligned}
(\nabla^2h)^{-1}z&=\tfrac1aG^{-1}z\\
&\quad-\tfrac{c\,\delta_N^2}{a(a+c\,\delta_N^2)}\,G^{-1}z\\
&=\tfrac1a\Bigl(1-\tfrac{c\delta_N^2}{a+c\delta_N^2}\Bigr)G^{-1}z\\
&=\frac{G^{-1}z}{a+c\,\delta_N^2}.
\end{aligned}
$$

Hướng Newton của $h$ là $-(\nabla^2h)^{-1}\nabla h=-a(\nabla^2h)^{-1}z=\frac{a}{a+c\delta_N^2}\bigl(-G^{-1}z\bigr)=\frac1{1+\theta\delta_N^2}\,p$. Hệ số nằm trong $(0,1]$, nên với tìm kiếm đường chính xác hai phương pháp Newton cho cùng dãy lặp như ở (a). Với bước đầy đủ $t=1$, bước trên $h$ ngắn hơn bước trên $f$ khi $\psi''(f(w))>0$ và $\nabla f(w)\ne0$, nên hai dãy lặp khác nhau.

**Kiểm tra lại.** Với $d=1$: hướng Newton của $f$ là $-f'/f''$, và của $h$ là $-\frac{\psi'f'}{\psi''f'^2+\psi'f''}=-\frac{f'/f''}{1+\theta f'^2/f''}$, khớp công thức vì $\delta_N^2=f'^2/f''$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; nối bước miền tin cậy với mô hình bậc hai có số hạng phạt.

::: exercise Bài tập 05.19 (Bước miền tin cậy và mô hình bậc hai có phạt; Boyd và Vandenberghe, Bài 9.12, tr. 515)
Cho $H\in\mathbb R^{d\times d}$ đối xứng, $H\succeq0$, $g\in\mathbb R^d$ và bán kính $\vartheta>0$. *Bước miền tin cậy* (trust region step) $v_{\rm tc}$ là nghiệm của bài toán cực tiểu hóa $\tfrac12v^THv+g^Tv$ với ràng buộc $\lVert v\rVert\le\vartheta$.

- **(a)** Chứng minh có $\hat\beta\ge0$ sao cho $v_{\rm tc}$ cực tiểu hóa $\tfrac12v^THv+g^Tv+\hat\beta\lVert v\rVert^2$ trên $\mathbb R^d$.
- **(b)** Với $\hat\beta$ của (a), chứng minh $\hat\beta=0$ khi $\lVert v_{\rm tc}\rVert<\vartheta$, và khi $\hat\beta>0$ thì $(H+2\hat\beta I)v_{\rm tc}=-g$ với $\lVert v_{\rm tc}\rVert=\vartheta$.
:::

::: hint Gợi ý 1
Viết ràng buộc thành $\tfrac12\lVert v\rVert^2-\tfrac12\vartheta^2\le0$ và kiểm tra bài toán là bài toán lồi có điểm thỏa ràng buộc chặt.
:::

::: hint Gợi ý 2
Hệ quả 03.31 cho một nhân tử $\omega\ge0$; đọc điều kiện dừng và điều kiện bù trừ của hệ KKT (Định lý 03.32).
:::

::: solution Lời giải Bài tập 05.19
**Câu (a).** Mục tiêu liên tục trên hình cầu đóng, bị chặn $\{\lVert v\rVert\le\vartheta\}$, nên nghiệm $v_{\rm tc}$ tồn tại (Định lý 01.35). Mục tiêu lồi vì $H\succeq0$, ràng buộc $\tfrac12\lVert v\rVert^2-\tfrac12\vartheta^2\le0$ lồi, và $v=0$ thỏa ràng buộc chặt (điều kiện Slater). Theo Hệ quả 03.31, có $\omega\ge0$ sao cho $(v_{\rm tc},\omega)$ thỏa hệ KKT:

$$
\begin{aligned}
&Hv_{\rm tc}+g+\omega v_{\rm tc}=0,\\
&\omega\bigl(\lVert v_{\rm tc}\rVert^2-\vartheta^2\bigr)=0.
\end{aligned}
$$

Phương trình thứ nhất là điều kiện $\nabla q_\omega(v_{\rm tc})=0$ của hàm lồi $q_\omega(v)=\tfrac12v^THv+g^Tv+\tfrac\omega2\lVert v\rVert^2$, nên $v_{\rm tc}$ cực tiểu hóa $q_\omega$ trên $\mathbb R^d$ (Hệ quả 01.26). Vậy $\hat\beta=\omega/2$.

**Câu (b).** Theo điều kiện bù trừ, $\lVert v_{\rm tc}\rVert<\vartheta$ buộc $\omega=0$. Khi $\hat\beta>0$, tức $\omega>0$, điều kiện bù trừ cho $\lVert v_{\rm tc}\rVert=\vartheta$, và phương trình thứ nhất là $(H+2\hat\beta I)v_{\rm tc}=-g$. Ma trận $H+2\hat\beta I\succ0$ khả nghịch, cùng dạng với Hessian $\nabla^2F+\lambda I$ của mục tiêu có chính quy hóa ở Định lý 05.26; TRON của Ví dụ 05.25 là một phương pháp Newton miền tin cậy.

**Kiểm tra lại.** Nếu $H\succ0$ và $\lVert H^{-1}g\rVert\le\vartheta$, cặp $v=-H^{-1}g$, $\omega=0$ thỏa hệ KKT, nên theo Định lý 03.32, $v=-H^{-1}g$ là nghiệm; mục tiêu lồi chặt vì $H\succ0$, nên nghiệm duy nhất (Định lý 01.34). Vậy $\hat\beta=0$ và bước miền tin cậy trùng hướng Newton, đúng như (b).
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; giảm chi phí mỗi lần thử của tìm kiếm đường bằng một phép tính sẵn.

::: exercise Bài tập 05.20 (Tính sẵn cho tìm kiếm đường; Boyd và Vandenberghe, Bài 9.23(a), (b), tr. 518)
Cho $A\in\mathbb R^{n\times d}$ dày đặc với hàng thứ $i$ là $a_i^T$, $c\in\mathbb R^n$, điểm $w$ và hướng $p$. Tìm kiếm đường đánh giá $h(t)=f(w+tp)$ và $h'(t)$ tại nhiều giá trị $t$. Với mỗi hàm sau, nêu một phép tính sẵn (pre-computation), chi phí của nó, và chi phí đánh giá $h(t)$, $h'(t)$ có và không có phép tính sẵn:

- **(a)** $f(w)=-\sum_{i=1}^n\log(c_i-a_i^Tw)$, với giả thiết $s=c-Aw>0$ đã có;
- **(b)** $f(w)=\log\sum_{i=1}^n\exp(a_i^Tw+c_i)$.
:::

::: hint Gợi ý 1
Không tính sẵn, mỗi lần đánh giá cần $A(w+tp)$. Tìm các đại lượng chỉ phụ thuộc $w$ và $p$ mà $h(t)$ dùng.
:::

::: hint Gợi ý 2
Ở (a), tách $c_i-a_i^T(w+tp)$ thành $s_i$ nhân một biểu thức bậc nhất theo $t$. Ở (b), viết $a_i^T(w+tp)+c_i$ thành tổng của hai số không phụ thuộc $t$, một số nhân với $t$.
:::

::: solution Lời giải Bài tập 05.20
**Câu (a).** Không tính sẵn, mỗi lần đánh giá cần $A(w+tp)$, tức $nd$ phép nhân–cộng, cộng $O(n)$. Tính sẵn $Ap$ ($nd$) rồi $\omega_i=a_i^Tp/s_i$ ($O(n)$). Khi đó $c_i-a_i^T(w+tp)=s_i(1-t\omega_i)$, nên

$$
\begin{aligned}
h(t)&=h(0)-\sum_i\log(1-t\omega_i),\\
h'(t)&=\sum_i\frac{\omega_i}{1-t\omega_i},
\end{aligned}
$$

với miền $1-t\omega_i>0$, và mỗi lần đánh giá tốn $O(n)$.

**Câu (b).** Không tính sẵn, mỗi lần đánh giá tốn $nd$ cộng $O(n)$. Tính sẵn $\zeta=Aw+c$ và $q=Ap$, tốn $2nd$. Khi đó $h(t)=\log\sum_ie^{\zeta_i+tq_i}$ và $h'(t)=\sum_i\pi_i(t)q_i$ với $\pi_i(t)=e^{\zeta_i+tq_i}/\sum_je^{\zeta_j+tq_j}$, mỗi lần đánh giá tốn $O(n)$. Dòng 6 của Thuật toán 05.32 dùng đúng cách này: tính sẵn $Xp$, rồi mỗi lần thử một $t$ tốn $O(n)$.

**Kiểm tra lại.** Ở (a), $h'(0)=\sum_i\omega_i=\sum_ia_i^Tp/s_i$, và $\nabla f(w)=\sum_ia_i/s_i$, nên $h'(0)=\nabla f(w)^Tp$, đúng đạo hàm theo hướng. Ở (b), $h'(0)=\sum_i\pi_i(0)a_i^Tp=\nabla f(w)^Tp$ với $\nabla f(w)=\sum_i\pi_i(0)a_i$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; nhận ra Hessian ba đường chéo và đếm chi phí bước Newton.

::: exercise Bài tập 05.21 (Hessian ba đường chéo của bài toán làm trơn; Boyd và Vandenberghe, Bài 9.25(a), tr. 518)
Cho $y\in\mathbb R^d$, $\lambda>0$ và hàm phạt $\psi:\mathbb R\to\mathbb R$ lồi, lớp $C^2$, với $\psi''>0$. Xét

$$
\begin{aligned}
f(w)&=\sum_{i=1}^d\psi(w_i-y_i)\\
&\quad+\lambda\sum_{i=1}^{d-1}(w_{i+1}-w_i)^2 ,
\end{aligned}
$$

với $w\in\mathbb R^d$ là bản làm trơn của $y$.

- **(a)** Viết $\nabla^2f(w)$ và chỉ ra cấu trúc của nó.
- **(b)** Chứng minh thừa số $R$ của phân tích Cholesky $\nabla^2f=R^TR$ (phân rã Cholesky, Định nghĩa 00.25) chỉ có đường chéo chính và đường chéo ngay trên, và đếm bậc chi phí của một bước Newton theo $d$.
:::

::: hint Gợi ý 1
Số hạng $(w_{i+1}-w_i)^2$ chỉ chứa hai biến liền nhau, nên chỉ đóng góp vào bốn phần tử của Hessian.
:::

::: hint Gợi ý 2
Ở (b), so phần tử $(i,k)$ của $R^TR$ với của $\nabla^2f$, lần lượt theo $i=1,2,\ldots$.
:::

::: solution Lời giải Bài tập 05.21
**Câu (a).** Phần thứ nhất có Hessian $\operatorname{diag}\bigl(\psi''(w_i-y_i)\bigr)$. Phần thứ hai là $\lambda\lVert Dw\rVert^2$ với $D\in\mathbb R^{(d-1)\times d}$ có hàng thứ $i$ bằng $-1$ ở cột $i$, bằng $1$ ở cột $i+1$ và bằng $0$ ở các cột khác, nên có Hessian $2\lambda D^TD$. Vậy

$$
\begin{aligned}
\nabla^2f&=\operatorname{diag}\bigl(\psi''(w_i-y_i)\bigr)\\
&\quad+2\lambda D^TD,
\end{aligned}
$$

trong đó $D^TD$ có đường chéo $(1,2,\ldots,2,1)$ và các phần tử ngay trên, ngay dưới đường chéo bằng $-1$. Hessian là ma trận ba đường chéo, xác định dương vì mọi $\psi''>0$ và $D^TD\succeq0$.

**Câu (b).** Viết $h_{ik}$ cho các phần tử của $\nabla^2f$. Quy nạp theo hàng: giả sử các hàng $1,\ldots,i-1$ của $R$ chỉ có phần tử khác $0$ ở cột của chính hàng và cột kế tiếp. So phần tử $(i,k)$ với $k>i$: $h_{ik}=\sum_{l\le i}r_{li}r_{lk}=r_{ii}r_{ik}$, vì với $l<i$ và $k>i\ge l+1$ thì $r_{lk}=0$ theo giả thiết quy nạp. Do đó $r_{ik}=h_{ik}/r_{ii}$, bằng $0$ khi $k>i+1$. Các phần tử khác $0$ là

$$
\begin{aligned}
r_{ii}&=\sqrt{h_{ii}-r_{i-1,i}^2},\\
r_{i,i+1}&=h_{i,i+1}/r_{ii},
\end{aligned}
$$

mỗi hàng tốn $O(1)$. Lập Hessian, phân tích và hai phép thế với ma trận hai đường chéo đều tốn $O(d)$, nên một bước Newton tốn $O(d)$, so với khoảng $d^3/6$ phép nhân–cộng của phân tích Cholesky dày đặc (ghi chú, đoạn sau Thuật toán 05.32).

**Kiểm tra lại.** Với $d=2$: $\nabla^2f=\begin{pmatrix}\psi_1''+2\lambda&-2\lambda\\-2\lambda&\psi_2''+2\lambda\end{pmatrix}$ với $\psi_i''=\psi''(w_i-y_i)$; $r_{11}=\sqrt{\psi_1''+2\lambda}$, $r_{12}=-2\lambda/r_{11}$, và $r_{12}^2+r_{22}^2=\psi_2''+2\lambda$, khớp phần tử $(2,2)$.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 2; lập bài toán ước lượng của mô hình probit thành bài toán lồi.

::: exercise Bài tập 05.22 (Mô hình probit dưới dạng bài toán lồi; Boyd và Vandenberghe, Bài 7.3, tr. 393)
Cho $n$ mẫu $(u_i,y_i)$ với $y_i\in\{0,1\}$ và $x_i=(1,u_i)$. Mô hình probit giả sử $y_i=1$ khi $x_i^Tw+\xi_i\le0$ và $y_i=0$ khi $x_i^Tw+\xi_i>0$, với các $\xi_i$ độc lập, phân phối chuẩn tắc. Gọi $\Phi$ là hàm phân phối tích lũy của phân phối chuẩn tắc; theo Boyd và Vandenberghe (2004, Ví dụ 3.39, tr. 104), $\log\Phi$ là hàm lõm.

- **(a)** Tính $\Pr(y_i=1)$ và $\Pr(y_i=0)$ theo $\Phi$ và $x_i^Tw$.
- **(b)** Lập bài toán ước lượng hợp lý cực đại của $w$ thành bài toán cực tiểu hóa một hàm lồi.
:::

::: hint Gợi ý 1
$\Pr(y_i=1)=\Pr(\xi_i\le-x_i^Tw)$, và phân phối chuẩn tắc đối xứng.
:::

::: hint Gợi ý 2
Các mẫu độc lập, nên hàm hợp lý là tích. Hợp của hàm lồi với ánh xạ affine là lồi (Định lý 01.30).
:::

::: solution Lời giải Bài tập 05.22
**Câu (a).** $\Pr(y_i=1)=\Pr(\xi_i\le-x_i^Tw)=\Phi(-x_i^Tw)$ và $\Pr(y_i=0)=1-\Phi(-x_i^Tw)=\Phi(x_i^Tw)$, vì phân phối chuẩn tắc đối xứng.

**Câu (b).** Các mẫu độc lập, nên cực đại hóa hàm hợp lý tương đương cực tiểu hóa *hàm âm log-hợp lý* (negative log-likelihood) trung bình

$$
\begin{aligned}
F(w)&=-\tfrac1n\sum_{y_i=1}\log\Phi(-x_i^Tw)\\
&\quad-\tfrac1n\sum_{y_i=0}\log\Phi(x_i^Tw).
\end{aligned}
$$

Hàm $z\mapsto-\log\Phi(z)$ lồi vì $\log\Phi$ lõm, và $w\mapsto\pm x_i^Tw$ tuyến tính, nên mỗi số hạng lồi (Định lý 01.30); tổng có hệ số dương cũng lồi. Bài toán ước lượng là bài toán lồi không ràng buộc $\min_wF(w)$.

Với nhãn $\tilde y_i=1-2y_i\in\{-1,+1\}$, hai tổng gộp thành $F(w)=\frac1n\sum_i\bigl(-\log\Phi(m_i)\bigr)$ với biên có dấu $m_i=\tilde y_ix_i^Tw$: đúng dạng của Định nghĩa 05.1, với mất mát logistic $\phi(m)=-\log\sigma(m)$ thay bằng $-\log\Phi(m)$.

**Kiểm tra lại.** $\Pr(y_i=1)+\Pr(y_i=0)=\Phi(-z)+\Phi(z)=1$ với $z=x_i^Tw$. Tại $z=0$: $(\log\Phi)''(0)=\frac{\Phi''(0)}{\Phi(0)}-\Bigl(\frac{\Phi'(0)}{\Phi(0)}\Bigr)^2=0-\Bigl(\frac{1/\sqrt{2\pi}}{1/2}\Bigr)^2=-\frac2\pi<0$, đúng chiều lõm.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 3; giải hệ Newton khi Hessian dày đặc nhưng là tổng của các số hạng hạng thấp, thưa.

::: exercise Bài tập 05.23 (Hệ Newton có cấu trúc tuyến tính thưa; Boyd và Vandenberghe, Bài 9.26, tr. 518–519)
Xét $f(w)=\sum_{i=1}^n\psi_i(B_iw+c_i)$, với $B_i\in\mathbb R^{k_i\times d}$ rất thưa, $k_i\ll d$, $c_i\in\mathbb R^{k_i}$, và $\psi_i:\mathbb R^{k_i}\to\mathbb R$ lồi, lớp $C^2$, với $H_i=\nabla^2\psi_i(B_iw+c_i)\succ0$, $g_i=\nabla\psi_i(B_iw+c_i)$. Khi đó

$$
\begin{aligned}
g&=\sum_iB_i^Tg_i,\\
H&=\sum_iB_i^TH_iB_i;
\end{aligned}
$$

giả sử $H\succ0$ dày đặc.

- **(a)** Chứng minh hệ Newton $Hp=-g$ tương đương với hệ cỡ $\bar k+d$, $\bar k=\sum_ik_i$, theo ẩn $(\chi_1,\ldots,\chi_n,p)$, với $i=1,\ldots,n$:

$$
\begin{aligned}
-H_i^{-1}\chi_i+B_ip&=0,\\
\textstyle\sum_iB_i^T\chi_i&=-g .
\end{aligned}
$$

- **(b)** So bộ nhớ của hai cách giải: lập $H$ dày đặc rồi phân tích Cholesky, và giải hệ ở (a) bằng một bộ giải hệ thưa.
:::

::: hint Gợi ý 1
Hệ (a) có ẩn phụ $\chi_i\in\mathbb R^{k_i}$; tìm biểu thức của $\chi_i$ theo $p$ từ phương trình thứ nhất.
:::

::: hint Gợi ý 2
Ở (b), đếm số phần tử khác $0$ của ma trận hệ (a) theo các khối $H_i^{-1}$, $B_i$, $B_i^T$.
:::

::: solution Lời giải Bài tập 05.23
**Câu (a).** Nếu $Hp=-g$, đặt $\chi_i=H_iB_ip$; khi đó $-H_i^{-1}\chi_i+B_ip=0$ và $\sum_iB_i^T\chi_i=\sum_iB_i^TH_iB_ip=Hp=-g$. Ngược lại, nếu $(\chi,p)$ thỏa hệ (a) thì $\chi_i=H_iB_ip$, và thế vào phương trình cuối cho $Hp=-g$. Hai hệ có cùng $p$.

**Câu (b).** Cách dày đặc lưu $H$ với $d^2$ số (khoảng $d^2/2$ nếu dùng tính đối xứng), và phân tích Cholesky tốn khoảng $d^3/6$ phép nhân–cộng. Ma trận hệ (a) có cỡ $\bar k+d$ nhưng chỉ có các phần tử khác $0$ ở các khối $H_i^{-1}$ ($\sum_ik_i^2$ số), ở $B_i$ và $B_i^T$ ($2\,\mathrm{nnz}$ số, với $\mathrm{nnz}$ là tổng số phần tử khác $0$ của các $B_i$), và khối $d\times d$ góc dưới phải bằng $0$. Khi $\sum_ik_i^2+2\,\mathrm{nnz}$ nhỏ hơn $d^2$ nhiều bậc, chẳng hạn khi $k_i\ll d$, các $B_i$ rất thưa và số số hạng $n$ không quá lớn, bộ nhớ ban đầu của hệ (a) nhỏ hơn nhiều so với cách dày đặc; phép phân tích hệ thưa có thể tạo thêm phần tử khác $0$ (fill-in). Ma trận hệ (a) không xác định dương vì khối $-H_i^{-1}$ âm.

Hồi quy logistic không chính quy hóa có dạng này với $k_i=1$, $B_i=x_i^T$, $c_i=0$, $\psi_i(z)=\frac1n\phi(y_iz)$, nên $H_i=\frac1nS_{ii}$ và $H=\frac1nX^TSX$, phần dữ liệu của Hessian ở dòng 3 của Thuật toán 05.32.

**Kiểm tra lại.** Kích thước: $\chi_i\in\mathbb R^{k_i}$, $B_ip\in\mathbb R^{k_i}$ và $B_i^T\chi_i\in\mathbb R^d$, khớp hai nhóm phương trình. Với $n=1$, $k_1=d$, $B_1=I$: hệ (a) cho $\chi_1=-g$ và $p=H_1^{-1}\chi_1=-H_1^{-1}g=-H^{-1}g$, đúng hướng Newton.
:::

## Tài liệu tham khảo

- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press, mục Exercises của các chương:
  - Chương 7: Bài 7.3 (Estimation, tr. 393);
  - Chương 9: Bài 9.1 (Unconstrained minimization, tr. 514), Bài 9.11 và 9.12 (Newton's method, tr. 515), Bài 9.23(a), (b), 9.24, 9.25(a) và 9.26 (Implementation, tr. 518–519);
  - Ví dụ 3.39 (tr. 104) cho tính lõm của $\log\Phi$.
