# Bài 05b — Hội tụ của hạ gradient và hạ gradient ngẫu nhiên

## Mục tiêu học tập

Bài bổ trợ này không có buổi riêng trong đề cương. Nó đào sâu phần phân tích hội tụ của bốn chuẩn đầu ra bài học (LLO): LLO6 và LLO8 của Buổi 04 đóng góp chuẩn đầu ra học phần CLO1 và CLO2; LLO11 và LLO12 của Buổi 05 đóng góp CLO1 và CLO2.

Sau chương này, người học có thể:

1. Phân biệt bốn dạng hội tụ và ba kiểu tốc độ; đổi một cận thành số bước (LLO6; CLO1).
2. Chứng minh các bất đẳng thức nối khoảng cách, sai số giá trị và chuẩn gradient; nêu giả thiết cho mỗi chiều và phản ví dụ khi bỏ giả thiết (LLO6; CLO1).
3. Chứng minh các định lý hội tụ của hạ gradient theo khuôn một bước, tính cận và số bước trên một hàm cụ thể, đối chiếu với giá trị thật (LLO6, LLO8; CLO1, CLO2).
4. Tính dưới vi phân, chạy phương pháp dưới gradient, chọn bước và chặn sai số của lặp tốt nhất và trung bình lặp (LLO6, LLO8; CLO1, CLO2).
5. Áp dụng định lý hội tụ của hạ gradient ngẫu nhiên cho hàm lồi và lồi mạnh: kiểm giả thiết, tính sàn nhiễu, chọn lịch bước, chuyển cận kỳ vọng thành cận xác suất (LLO12; CLO2).
6. Áp dụng bảo đảm theo chuẩn gradient cho mục tiêu không lồi, nhận biết khi điều kiện Polyak–Łojasiewicz cho tốc độ tuyến tính, nêu điều các định lý không khẳng định về mạng nơ ron (LLO11, LLO12; CLO1, CLO2).

## Kiến thức tiên quyết

Số hiệu `01.k`, `04.k`, `05.k`, `05c.k` chỉ ghi chú Bài 01, 04, 05 và 05c. Ghi chú Bài 00 được dẫn bằng tên khái niệm. Mỗi kết quả được phát biểu lại tại đây.

- **Xác suất rời rạc** (Bài 00; Định lý 05c.28, Định nghĩa 05c.30). Biến ngẫu nhiên $Z$ nhận hữu hạn giá trị $z_j$ có kỳ vọng $\mathbb EZ=\sum_jz_j\,\mathbb P(Z=z_j)$; kỳ vọng tuyến tính. Nếu $Z$, $W$ độc lập thì $\mathbb E[ZW]=\mathbb EZ\,\mathbb EW$. Phương sai là $\operatorname{Var}Z=\mathbb EZ^2-(\mathbb EZ)^2$.
- **Kỳ vọng có điều kiện và bất đẳng thức Markov** (Định nghĩa 05c.37, Mệnh đề 05c.38, Định lý 05c.39). Mục 5.2 và Mục 5.7 phát biểu lại các kết quả này ở dạng cần dùng.
- **Cận dưới đúng, tính lồi, lồi mạnh** (Định nghĩa 01.10, 01.22, 01.39; Định lý 01.26; Hệ quả 01.41). $\inf_xf(x)$ có thể không đạt. Hàm khả vi $f$ lồi khi và chỉ khi $f(z)\ge f(x)+\nabla f(x)^T(z-x)$ với mọi $x,z$. $f$ lồi mạnh với hằng số $\mu>0$ khi $f-\tfrac\mu2\lVert\cdot\rVert^2$ lồi, tương đương $\nabla^2f\succeq\mu I$ khi $f$ khả vi hai lần (Nhận xét 01.40); khi đó $f$ có đúng một điểm cực tiểu.
- **Mất mát logistic** (Mệnh đề 01.9). $\phi(s)=\log(1+\exp(-s))$ dương, $\phi'(s)=-1/(1+\exp(s))\in(-1,0)$, $\phi''(s)\in(0,\tfrac14]$, $\phi(s)\to0$ khi $s\to\infty$.
- **Bài 04, Mục 2.6** (Định nghĩa 04.17; Bổ đề 04.18, 04.20, 04.21, 04.23; Định lý 04.22, 04.24, 04.26; Mệnh đề 04.25). Gradient $L$-Lipschitz cho cận trên bậc hai $f(z)\le f(x)+\nabla f(x)^T(z-x)+\tfrac L2\lVert z-x\rVert^2$ và mức giảm ít nhất $\tfrac t2\lVert\nabla f\rVert^2$ của một bước $t\le\tfrac1L$. Với $f$ lồi có điểm cực tiểu, bước $\tfrac1L$ cho $f(x^k)-f^*\le L\lVert x^0-x^*\rVert^2/(2k)$; thêm lồi mạnh thì $f(x)-f^*\le\tfrac1{2\mu}\lVert\nabla f(x)\rVert^2$ và sai số co theo hệ số $1-\mu/L$. Quay lui Armijo (Định nghĩa 04.10) nhận bước đầu tiên trong $1,\beta,\beta^2,\ldots$ thỏa $f(x-t\nabla f(x))\le f(x)-\alpha t\lVert\nabla f(x)\rVert^2$; bước được nhận không nhỏ hơn $\min\{1,\beta/L\}$.
- **Điểm dừng** (Định nghĩa 05.7). Điểm $x^\circ$ với $\nabla f(x^\circ)=0$; có thể là cực tiểu, cực đại địa phương hoặc điểm yên ngựa.
- **Gradient nhóm** (Định nghĩa 05.10, Định lý 05.11, Hệ quả 05.12, Mệnh đề 05.14). Với $f=\tfrac1N\sum_i\ell_i$ và $b$ chỉ số rút đều, độc lập, có hoàn lại, gradient nhóm không chệch, có hiệp phương sai $\Sigma(x)/b$ và sai số bình phương trung bình $\operatorname{tr}\Sigma(x)/b$.

Bài 04 viết dãy lặp là $x^k$, bước là $t$, khoảng cách đầu là $R$; Bài 05 viết $\theta_t$, $\eta_t$, $\widehat g_t$, $T$. Chương này dùng $x_k$ (chỉ số dưới, để không lẫn với lũy thừa $q^k$), $\eta_k$, $K$ và $D$.

## Bảng ký hiệu

Bảng chỉ gồm ký hiệu dùng xuyên suốt chương; ký hiệu của một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ. Chuẩn là chuẩn Euclid, $\log$ là logarit tự nhiên.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $f$ | hàm mục tiêu | $\mathbb R^n\to\mathbb R$ |
| $x$, $z$ | điểm trong miền; $z$ là điểm so sánh trong các bất đẳng thức hai điểm | $\mathbb R^n$ |
| $[x]_i$ | tọa độ thứ $i$ của $x$ | $\mathbb R$ |
| $x_k$, $\eta_k$, $g_k$ | điểm lặp thứ $k$; bước; vectơ cập nhật trong $x_{k+1}=x_k-\eta_kg_k$ | $\mathbb R^n$; $\eta_k>0$; $\mathbb R^n$ |
| $k$, $K$ | chỉ số lặp; số bước | số nguyên, $k\ge0$, $K\ge1$ |
| $x^*$, $f^*$ | một điểm cực tiểu; giá trị tối ưu $f(x^*)$, tức $p^*$ của Bài 02–03 | $\mathbb R^n$; $\mathbb R$ |
| $f_{\inf}$ | cận dưới đúng $\inf_xf(x)$, có thể không đạt | $\mathbb R$ |
| $e_k$, $d_k$, $D$ | sai số giá trị $f(x_k)-f^*$; khoảng cách $\lVert x_k-x^*\rVert$; khoảng cách đầu $D=d_0$ | $\ge0$ |
| $\Delta_k$ | độ cao trên cận dưới $f(x_k)-f_{\inf}$ | $\ge0$ |
| $a_k$ | kỳ vọng bình phương khoảng cách $\mathbb E\lVert x_k-x^*\rVert^2$ | $\ge0$ |
| $L$, $\mu$, $\kappa$ | hằng số Lipschitz của gradient; hằng số độ cong dưới (lồi mạnh trong H3, Polyak–Łojasiewicz trong H7); $\kappa=L/\mu$ | $0<\mu\le L$; $\kappa\ge1$ |
| H0–H7 | tên các giả thiết (Định nghĩa 05b.5, Định lý 05b.26, Định nghĩa 05b.31, 05b.45) | |
| $q$ | hệ số trong bất đẳng thức một bước $u_{k+1}\le qu_k-v_k+r_k$; hệ số co khi $q<1$ | $[0,1]$ |
| $u_k$, $v_k$, $r_k$, $\gamma$ | hàm thế, tiến bộ, nhiễu và hằng số trong khuôn một bước | $u_k,v_k,r_k\ge0$; $\gamma>0$ |
| $\varepsilon$ | độ chính xác đích | $\varepsilon>0$ |
| $\partial f(x)$, $G$ | dưới vi phân của $f$ tại $x$; cận của chuẩn dưới gradient hoặc của mômen bậc hai | tập con của $\mathbb R^n$; $G>0$ |
| $\bar x_K$ | trung bình lặp với trọng số theo bước | $\mathbb R^n$ |
| $N$, $\ell_i$, $b$ | số quan sát; mất mát trên quan sát $i$; cỡ nhóm | $N,b\ge1$; $\mathbb R^n\to\mathbb R$ |
| $I_{k,j}$, $B_k$ | chỉ số thứ $j$ của nhóm ở bước $k$; nhóm $B_k=(I_{k,1},\ldots,I_{k,b})$ | $\{1,\ldots,N\}$; $\{1,\ldots,N\}^b$ |
| $\mathcal F_k$, $\mathbb E[\cdot\mid\mathcal F_k]$ | lịch sử các nhóm đã rút trước bước $k$; kỳ vọng có điều kiện theo lịch sử đó | |
| $\Sigma(x)$, $\sigma^2$ | hiệp phương sai của gradient một mẫu (Bài 05); cận của phương sai gradient ngẫu nhiên | ma trận $n\times n$; $\sigma^2\ge0$ |
| $\mathbb P$, $\mathbb E$ | xác suất; kỳ vọng | |
| $\alpha$, $\beta$ | hai tham số của quay lui Armijo | $\beta\in(0,1)$; $\alpha\in(0,\tfrac12)$ theo Định nghĩa 04.10, mở rộng tới $\alpha=\tfrac12$ theo Bổ đề 04.23 |

Bốn ví dụ dẫn được dùng lại ở nhiều mục; mỗi khối ví dụ nêu lại dữ kiện của nó. Hình vẽ của chương giữ tên "Ví dụ A" đến "Ví dụ D".

- **Ví dụ dẫn A** (Ví dụ 05.1 của Bài 05): ba quan sát $y=(-1,1,3)$, mô hình hằng $\theta\in\mathbb R$, mất mát $J(\theta)=\tfrac16\sum_{i=1}^3(\theta-y_i)^2=\tfrac12(\theta-1)^2+\tfrac43$, nghiệm $\theta^*=1$. Tham số $\theta$ là $x$ khi $n=1$.
- **Ví dụ dẫn B**: cùng ba quan sát với mất mát trị tuyệt đối $f(x)=\tfrac13\bigl(\lvert x+1\rvert+\lvert x-1\rvert+\lvert x-3\rvert\bigr)$, nghiệm $x^*=1$, $f^*=\tfrac43$.
- **Ví dụ dẫn C** (VD1 của Bài 04): $f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$ trên $\mathbb R^2$, $x^*=0$, $f^*=0$, điểm đầu $x_0=(2,4)$, $f(x_0)=62$.
- **Ví dụ dẫn D**: $F(\theta)=\tfrac14(\theta^2-1)^2$ trên $\mathbb R$, hai cực tiểu $\pm1$ và cực đại địa phương $0$.

Mọi số liệu của các ví dụ là số liệu sư phạm tự xây dựng. Các giá trị được tính bằng phân số chính xác hoặc bằng đệ quy kỳ vọng; những chỗ dùng mô phỏng ngẫu nhiên đều ghi rõ là mô phỏng, kèm hạt giống và số lần chạy.


## 1. Các dạng hội tụ của một dãy lặp

Mục 2.6 của Bài 04 cho Định lý 04.22: với $f$ lồi, gradient $L$-Lipschitz và có điểm cực tiểu, giảm gradient bước $\tfrac1L$ thỏa $f(x_k)-f^*\le LD^2/(2k)$. Trên hàm $f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$ từ $x_0=(2,4)$, cận này bằng $70/k$ và đòi $7000$ bước để sai số không vượt $0{,}01$, trong khi dãy lặp thật đạt mức đó sau $6$ bước. Bài 05 cho Ví dụ 05.14: hạ gradient ngẫu nhiên (stochastic gradient descent, SGD) với bước cố định $0{,}1$ trên ba quan sát có kỳ vọng bình phương sai lệch dừng ở $\tfrac8{57}$, không về $0$. Hai kết quả đo hai đại lượng khác nhau, với hai kiểu giảm khác nhau, nên chưa so được với nhau và chưa so được với thực tế.

Mục này cho ba công cụ để so: định nghĩa chính xác của "hội tụ" theo từng đại lượng, định nghĩa của tốc độ cùng phép đổi tốc độ thành số bước, và một bộ giả thiết có tên mà mọi định lý của chương dùng lại.

Mọi phương pháp của chương có dạng chung

$$
x_{k+1}=x_k-\eta_kg_k,\qquad k=0,1,2,\ldots
\tag{1.1}
$$

Ở đây $x_k\in\mathbb R^n$ là điểm lặp thứ $k$, $\eta_k>0$ là bước và $g_k\in\mathbb R^n$ là vectơ cập nhật. Trong phương pháp hạ gradient (gradient descent, GD), $g_k=\nabla f(x_k)$. Trong phương pháp dưới gradient của Mục 4, $g_k$ là một dưới gradient của hàm lồi không khả vi. Trong SGD của Mục 5 và Mục 6, $g_k$ là gradient tính trên một nhóm mẫu rút ngẫu nhiên, nên $x_k$ là biến ngẫu nhiên.

### 1.1 Nhu cầu: hai ví dụ dẫn với hai kiểu giảm

Ví dụ đầu tiên chạy GD trên hàm bậc hai của Bài 04 và đo hai đại lượng: sai số giá trị và khoảng cách tới nghiệm.

::: example Ví dụ 05b.1 (Ví dụ dẫn C: hai thước đo cùng giảm theo cấp số nhân)
**Dữ kiện.**

Hàm $f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$ trên $\mathbb R^2$ có nghiệm $x^*=0$, $f^*=0$ và gradient $\nabla f(x)=(3[x]_1,\,7[x]_2)$. GD bước hằng $\eta=\tfrac17$ từ $x_0=(2,4)$, với $f(x_0)=\tfrac12(12+112)=62$. Hai thước đo là sai số giá trị $e_k=f(x_k)-f^*$ và khoảng cách $d_k=\lVert x_k-x^*\rVert$.

**Phép lặp theo tọa độ.**

Một bước nhân tọa độ thứ nhất với $1-\tfrac37=\tfrac47$ và tọa độ thứ hai với $1-\tfrac77=0$:

$$
x_{k+1}=\Bigl(\tfrac47[x_k]_1,\ 0\Bigr).
$$

Từ $x_0=(2,4)$ được $x_1=(\tfrac87,0)$, và quy nạp cho $x_k=\bigl(2(\tfrac47)^k,0\bigr)$ với mọi $k\ge1$.

**Hai thước đo.**

Với $k\ge1$, chỉ còn tọa độ thứ nhất, nên

$$
e_k=\tfrac32\cdot4\Bigl(\tfrac{16}{49}\Bigr)^k=6\Bigl(\tfrac{16}{49}\Bigr)^k,\qquad d_k^2=4\Bigl(\tfrac{16}{49}\Bigr)^k .
$$

| $k$ | $e_k$ | $d_k^2$ | cận $70/k$ của Định lý 04.22 |
|---:|---:|---:|---:|
| $1$ | $1{,}96$ | $1{,}31$ | $70$ |
| $5$ | $0{,}0223$ | $0{,}0149$ | $14$ |
| $10$ | $8{,}27\cdot10^{-5}$ | $5{,}51\cdot10^{-5}$ | $7$ |

**Kiểm tra lại.**

Tính trực tiếp $f(x_1)=\tfrac12\cdot3\cdot\tfrac{64}{49}=\tfrac{96}{49}$, khớp $6\cdot\tfrac{16}{49}=\tfrac{96}{49}$. Cận của Định lý 04.22 với $L=7$ và $D^2=\lVert x_0\rVert^2=20$ là $\tfrac{7\cdot20}{2k}=\tfrac{70}k$.
:::

![Đồ thị trục tung logarit, k từ 0 đến 8. Vòng tròn là sai số giá trị e_k và ô vuông là bình phương khoảng cách d_k² của giảm gradient bước 1/7 trên Ví dụ C; từ k = 1, hai dãy nằm trên hai đường thẳng song song, bắt đầu từ 1,96 và 1,31. Đường cong phía trên là cận 70/k, giảm chậm hơn nhiều.](img/lec-05b/vdc-measures.svg)

Hình đặt hai dãy của Ví dụ 05b.1 trên trục tung logarit. Vì $\log e_k=\log6+k\log\tfrac{16}{49}$, dãy sai số là một đường thẳng có độ dốc $\log\tfrac{16}{49}$; dãy $d_k^2$ là đường thẳng song song nằm thấp hơn một khoảng $\log\tfrac32$. Đường cong $70/k$ ở phía trên giảm chậm dần: tại $k=5$, cận bằng $14$ trong khi sai số thật bằng $0{,}0223$.

Ví dụ thứ hai chạy SGD trên ba quan sát của Bài 05. Đại lượng được theo dõi là kỳ vọng của bình phương sai lệch, vì bản thân dãy lặp là ngẫu nhiên.

::: example Ví dụ 05b.2 (Ví dụ dẫn A: kỳ vọng giảm về một giá trị dương)
**Dữ kiện.**

Ba quan sát $y=(-1,1,3)$, mô hình hằng $\theta\in\mathbb R$, mất mát $J(\theta)=\tfrac16\sum_{i=1}^3(\theta-y_i)^2=\tfrac12(\theta-1)^2+\tfrac43$, nghiệm $\theta^*=1$. Gradient của mất mát trên quan sát $i$ là $\theta-y_i$. Ở mỗi bước, chỉ số $I_k$ được rút đều trong $\{1,2,3\}$, độc lập với các lần rút trước. SGD bước $0{,}1$ từ $\theta_0=0$:

$$
\theta_{k+1}=\theta_k-0{,}1\,(\theta_k-y_{I_k}).
$$

**Viết lại quanh nghiệm.**

Trừ $1$ hai vế và đặt $\xi_k=y_{I_k}-1$:

$$
\theta_{k+1}-1=0{,}9\,(\theta_k-1)+0{,}1\,\xi_k .
$$

Biến $\xi_k$ nhận $-2,0,2$ với xác suất $\tfrac13$ mỗi giá trị, nên $\mathbb E\xi_k=0$ và $\mathbb E\xi_k^2=\tfrac13(4+0+4)=\tfrac83$. Điểm $\theta_k$ chỉ phụ thuộc $I_0,\ldots,I_{k-1}$, nên $\xi_k$ độc lập với $\theta_k$.

**Đệ quy của kỳ vọng.**

Đặt $a_k=\mathbb E(\theta_k-1)^2$. Bình phương hai vế rồi lấy kỳ vọng; số hạng chéo $2\cdot0{,}9\cdot0{,}1\,\mathbb E[(\theta_k-1)\xi_k]$ bằng $0$ do độc lập và $\mathbb E\xi_k=0$:

$$
a_{k+1}=0{,}81\,a_k+0{,}01\cdot\tfrac83,\qquad a_0=1 .
$$

**Nghiệm của đệ quy.**

Điểm bất động thỏa $a=0{,}81a+\tfrac8{300}$, tức $a=\tfrac{8}{57}\approx0{,}140$. Hiệu $a_k-\tfrac8{57}$ nhân với $0{,}81$ ở mỗi bước, nên

$$
a_k=\tfrac8{57}+\tfrac{49}{57}\,(0{,}81)^k .
$$

Các giá trị: $a_1\approx0{,}837$, $a_2\approx0{,}704$, $a_{20}\approx0{,}153$, và $a_k\to\tfrac8{57}$.

**Kiểm tra lại.**

Theo đệ quy, $a_1=0{,}81+\tfrac8{300}=0{,}8367$; theo công thức đóng, $\tfrac8{57}+\tfrac{49}{57}\cdot0{,}81=0{,}1404+0{,}6963=0{,}8367$. Giá trị giới hạn trùng mức $\mathrm{MSE}_\infty=\tfrac{8\eta}{3b(2-\eta)}=\tfrac8{57}$ của Ví dụ 05.14 với $\eta=0{,}1$, $b=1$.
:::

![Đồ thị với k từ 0 đến 40. Đường mảnh dao động là bình phương sai lệch (θ_k − 1)² của một lần chạy SGD trên Ví dụ A, không tiến về 0. Đường đậm là kỳ vọng E(θ_k − 1)², giảm từ 1 về giá trị giới hạn 0,140, vẽ bằng nét đứt nằm ngang.](img/lec-05b/vda-sgd-path.svg)

Hình vẽ một lần chạy và kỳ vọng trên cùng trục. Đường của một lần chạy dao động quanh mức $0{,}140$ và không có giới hạn; đường kỳ vọng thì giảm đơn điệu về $0{,}140$. Với SGD, câu "dãy hội tụ" chỉ có nghĩa khi nói rõ là kỳ vọng của đại lượng nào.

Hai ví dụ cho thấy một khẳng định hội tụ phải nêu hai thứ: đại lượng được đo (giá trị, khoảng cách, chuẩn gradient, hay kỳ vọng của chúng) và kiểu giảm (theo cấp số nhân, như $1/k$, hay về một hằng số dương). Hai tiểu mục sau định nghĩa chính xác hai thứ đó.

### 1.2 Bốn dạng hội tụ

Trực giác, chưa phải định nghĩa: dãy lặp "tới gần lời giải" có thể hiểu theo bốn cách, tùy đại lượng được đem so với $0$. Cách thứ nhất đo vị trí, cách thứ hai đo độ cao của mất mát, cách thứ ba đo độ dốc tại điểm hiện tại, cách thứ tư lấy trung bình trên mọi lần chạy khi dãy là ngẫu nhiên.

::: definition Định nghĩa 05b.1 (Các dạng hội tụ)
Cho $f:\mathbb R^n\to\mathbb R$, một dãy $(x_k)_{k\ge0}$ trong $\mathbb R^n$, và giả sử $f$ có điểm cực tiểu $x^*$ với $f^*=f(x^*)$. Đặt $d_k=\lVert x_k-x^*\rVert$ và $e_k=f(x_k)-f^*$.

**Hội tụ theo dãy lặp.** $d_k\to0$ khi $k\to\infty$.

**Hội tụ theo giá trị.** $e_k\to0$. Khi $f$ không có điểm cực tiểu nhưng bị chặn dưới, hội tụ theo giá trị nghĩa là $f(x_k)\to f_{\inf}=\inf_xf(x)$.

**Hội tụ tới điểm dừng.** $f$ khả vi và $\lVert\nabla f(x_k)\rVert\to0$.

**Hội tụ theo kỳ vọng.** $x_k$ là biến ngẫu nhiên và một trong các đại lượng $\mathbb Ed_k^2$, $\mathbb Ee_k$, $\mathbb E\lVert\nabla f(x_k)\rVert^2$ tiến về $0$; định nghĩa phải nói rõ đại lượng nào.
:::

Mỗi dạng hội tụ đặt một đại lượng không âm về $0$. Dạng theo dãy lặp cần một điểm $x^*$ cụ thể; khi $f$ có nhiều điểm cực tiểu, câu "$x_k\to x^*$" phụ thuộc điểm được chọn. Dạng theo giá trị cần $f^*$ hoặc $f_{\inf}$, không cần biết điểm đạt. Dạng tới điểm dừng chỉ dùng thông tin tại chính $x_k$, nên đo được trong khi chạy và vẫn có nghĩa khi $f$ không lồi.

Dạng tới điểm dừng đưa khái niệm điểm dừng của Định nghĩa 05.7, điểm có gradient bằng $0$, về dạng giới hạn. Khi $f$ không lồi, đây là dạng yếu nhất trong ba dạng tất định, vì điểm dừng có thể là cực đại địa phương hoặc điểm yên ngựa (Mục 6).

Dạng theo kỳ vọng là phát biểu về trung bình trên mọi lần chạy, không phải về một lần chạy; Mục 5.7 chuyển nó thành phát biểu xác suất cho một lần chạy.

Áp dụng cho hai ví dụ dẫn:

- ở Ví dụ 05b.1, $d_k\to0$, $e_k\to0$ và $\lVert\nabla f(x_k)\rVert=6(\tfrac47)^k\to0$, nên dãy hội tụ theo cả ba dạng tất định;
- ở Ví dụ 05b.2, $\mathbb E(\theta_k-1)^2\to\tfrac8{57}>0$, nên dãy không hội tụ theo kỳ vọng của bình phương khoảng cách; cũng vì vậy $\mathbb E\bigl[J(\theta_k)-\tfrac43\bigr]=\tfrac12a_k\to\tfrac4{57}$ không về $0$.

Một trường hợp dễ nhầm nằm ngay trong Ví dụ 05b.2. Lấy kỳ vọng hai vế của $\theta_{k+1}-1=0{,}9(\theta_k-1)+0{,}1\xi_k$ được $\mathbb E\theta_k-1=-0{,}9^k$, tức $\mathbb E\theta_k=1-0{,}9^k\to1$. Kỳ vọng của điểm lặp tiến về nghiệm, nhưng đó không phải hội tụ theo kỳ vọng theo Định nghĩa 05b.1: các giá trị lệch về hai phía của $1$ triệt tiêu nhau khi lấy trung bình, trong khi bình phương sai lệch thì không.

**Trong học máy.** Đường học (learning curve) của một phiên huấn luyện vẽ mất mát huấn luyện $f(x_k)$ theo số vòng lặp, tức theo dõi hội tụ theo giá trị trên một lần chạy. Chuẩn gradient tính được ngay tại $x_k$, nên được dùng làm tiêu chí dừng (Thuật toán 04.1). Các định lý về SGD ở Mục 5 và Mục 6 chặn kỳ vọng như $a_k$, $\mathbb Ef(\bar x_K)-f^*$ hay trung bình của $\mathbb E\lVert\nabla f(x_k)\rVert^2$; đường học của một lần chạy chỉ là một hiện thực của các đại lượng ngẫu nhiên đó.

### 1.3 Tốc độ hội tụ và số bước

Ba dãy $0{,}8^k$, $1/k$ và $1/\sqrt k$ đều tiến về $0$, nhưng để không vượt $10^{-3}$ chúng cần số bước rất khác nhau. Trên thang logarit, dãy thứ nhất là đường thẳng; hai dãy sau cong và phẳng dần. Định nghĩa sau phân loại các kiểu giảm này bằng một cận đúng với mọi $k$.

![Ba đường sai số theo số bước k từ 1 đến 40, trục tung logarit từ 10⁻⁴ đến 1. Đường 0,8 mũ k (ghi là tuyến tính) là đường thẳng đi xuống; hai đường 1/k và 1/căn k cong và phẳng dần, đường 1/căn k nằm cao nhất.](img/lec-05b/rates-log-error.svg)

Hình vẽ ba dãy với $k$ từ $1$ đến $40$. Vì $\log(Cq^k)=\log C+k\log q$, một dãy dạng $Cq^k$ là đường thẳng độ dốc $\log q<0$. Vì $\log(C/k^p)=\log C-p\log k$, dãy dạng $C/k^p$ giảm theo $\log k$, nên trên trục ngang tuyến tính nó cong và phẳng dần.

::: definition Định nghĩa 05b.2 (Tốc độ hội tụ, convergence rate)
Cho dãy số thực không âm $(u_k)_{k\ge0}$.

**Tuyến tính, dạng cận.** $(u_k)$ hội tụ tuyến tính (linear convergence) với hệ số $q\in(0,1)$ nếu tồn tại $C>0$ để $u_k\le Cq^k$ với mọi $k\ge0$.

**Tuyến tính, dạng tỉ số.** $(u_k)$ thỏa dạng tỉ số với hệ số $q\in(0,1)$ nếu $u_{k+1}\le q\,u_k$ với mọi $k\ge0$.

**Tốc độ $O(1/k^p)$.** Với $p>0$, $(u_k)$ hội tụ với tốc độ $O(1/k^p)$ nếu tồn tại $C>0$ để $u_k\le C/k^p$ với mọi $k\ge1$. Khi dãy có cận dạng này nhưng không có cận tuyến tính nào, tốc độ gọi là dưới tuyến tính (sublinear).
:::

Dạng cận còn gọi là R-tuyến tính, dạng tỉ số còn gọi là Q-tuyến tính. Định nghĩa đặt cận cho mọi $k$, không chỉ cho $k$ lớn, nên một cận cho trực tiếp số bước đủ để đạt một sai số cho trước. Hội tụ là phát biểu về giới hạn; tốc độ là phát biểu mạnh hơn, về một bất đẳng thức đúng từ bước đầu tiên.

Mệnh đề sau nêu quan hệ giữa hai dạng tuyến tính và đổi mỗi kiểu cận thành số bước.

::: proposition Mệnh đề 05b.3 (Quan hệ giữa hai dạng tuyến tính và số bước đủ)
**Giả thiết.** $(u_k)_{k\ge0}$ là dãy không âm, $\varepsilon>0$, $C>0$, $q\in(0,1)$, $p>0$; riêng phần (a) cho phép $q\in[0,1)$.

**Kết luận.**

- (a) Nếu $u_{k+1}\le qu_k$ với mọi $k$, với $q\in[0,1)$, thì $u_k\le u_0q^k$ với mọi $k$; khi $u_0>0$, đây là dạng cận với $C=u_0$. Chiều ngược lại sai.
- (b) Nếu $u_k\le Cq^k$ với mọi $k$ thì $u_k\le\varepsilon$ với mọi $k\ge\dfrac{\log(C/\varepsilon)}{\log(1/q)}$.
- (c) Nếu $q=1-1/\kappa$ với $\kappa>1$ thì điều kiện đủ đơn giản hơn là $k\ge\kappa\log(C/\varepsilon)$.
- (d) Nếu $u_k\le C/k^p$ với mọi $k\ge1$ thì $u_k\le\varepsilon$ với mọi $k\ge(C/\varepsilon)^{1/p}$; nói riêng, $k\ge C/\varepsilon$ khi $p=1$ và $k\ge C^2/\varepsilon^2$ khi $p=\tfrac12$.

**Điều kiện áp dụng.** Cận phải đúng với mọi $k$ (hoặc mọi $k\ge1$), không chỉ khi $k$ đủ lớn.

**Phạm vi.** Số bước thu được là đủ, không cần: dãy thật có thể đạt $\varepsilon$ sớm hơn nhiều.
:::

::: proof Chứng minh Mệnh đề 05b.3
**Bước 1 (phần a, chiều thuận).**

Quy nạp theo $k$; mỗi bước nhân hai vế của giả thiết với $q\ge0$, nên giữ chiều bất đẳng thức:

$$
\begin{aligned}
u_k&\le q\,u_{k-1}\\
&\le q^2u_{k-2}\\
&\le q^ku_0 .
\end{aligned}
$$

**Bước 2 (phần a, chiều ngược sai).**

Xét $u_k=q^k$ khi $k$ chẵn và $u_k=0$ khi $k$ lẻ. Dãy thỏa dạng cận với $C=1$. Với $k$ lẻ, $u_{k+1}=q^{k+1}$ dương trong khi $qu_k=0$, nên dạng tỉ số sai.

**Bước 3 (phần b).**

$Cq^k\le\varepsilon$ tương đương $k\log q\le\log(\varepsilon/C)$, tức $k\ge\log(C/\varepsilon)/\log(1/q)$, vì $\log q<0$.

**Bước 4 (phần c).**

Bất đẳng thức $\log(1-t)\le-t$ với $t=1/\kappa\in(0,1)$ cho $\log(1/q)\ge1/\kappa$. Do đó $\kappa\log(C/\varepsilon)\ge\log(C/\varepsilon)/\log(1/q)$ khi $C>\varepsilon$, và phần (b) áp dụng; khi $C\le\varepsilon$ thì $u_k\le Cq^k\le\varepsilon$ với mọi $k$.

**Bước 5 (phần d).**

$C/k^p\le\varepsilon$ tương đương $k^p\ge C/\varepsilon$, tức $k\ge(C/\varepsilon)^{1/p}$. $\square$
:::

Theo Mệnh đề 05b.3, một cận tuyến tính cho số bước tăng theo $\log(1/\varepsilon)$, một cận $O(1/k)$ cho số bước tăng theo $1/\varepsilon$, và một cận $O(1/\sqrt k)$ cho số bước tăng theo $1/\varepsilon^2$. Muốn giảm sai số mười lần, cận tuyến tính chỉ thêm một số bước cố định, còn cận $O(1/\sqrt k)$ nhân số bước lên một trăm lần.

Phần (c) là dạng mà Định lý 04.26 dùng, với $\kappa=L/\mu$. Với ba dãy của hình và $\varepsilon=10^{-3}$: dãy $0{,}8^k$ cần $k\ge\log1000/\log1{,}25\approx30{,}96$, tức $31$ bước; dãy $1/k$ cần $1000$ bước; dãy $1/\sqrt k$ cần $10^6$ bước.

::: remark Nhận xét 05b.4 (Ba nhầm lẫn về hội tụ)
**Hội tụ và cận.** "Dãy hội tụ" không cho số bước nào; "dãy có cận $C/k$" cho số bước $C/\varepsilon$. Các định lý của chương đều cho cận, nên mạnh hơn phát biểu hội tụ.

**Kỳ vọng của bình phương và kỳ vọng của khoảng cách.** Vì $\operatorname{Var}d_k=\mathbb Ed_k^2-(\mathbb Ed_k)^2\ge0$, có $\mathbb Ed_k\le\sqrt{\mathbb Ed_k^2}$. Một cận $\mathbb Ed_k^2\le C/k^p$ chỉ cho $\mathbb Ed_k\le\sqrt C/k^{p/2}$, tức tốc độ của khoảng cách bằng một nửa số mũ.

**Kỳ vọng của điểm lặp.** $\mathbb Ex_k\to x^*$ không kéo theo hội tụ theo kỳ vọng. Ở Ví dụ 05b.2, $\mathbb E\theta_k=1-0{,}9^k\to1$ trong khi $\mathbb E(\theta_k-1)^2\to\tfrac8{57}$.
:::

### 1.4 Bộ giả thiết về hàm mục tiêu

Ví dụ 05b.1 có cả ba dạng hội tụ tất định, còn mất mát logistic ở Mục 2 hội tụ theo giá trị mà dãy lặp chạy ra vô cùng. Sự khác biệt đến từ tính chất của hàm. Mỗi định lý của chương dùng một tập con của năm giả thiết sau; đặt tên cho chúng cho phép chỉ ra chính xác bước nào của chứng minh dùng giả thiết nào.

::: definition Định nghĩa 05b.5 (Giả thiết H0–H4 về hàm mục tiêu)
Cho $f:\mathbb R^n\to\mathbb R$. Các bất đẳng thức dưới đây đúng với mọi $x,z\in\mathbb R^n$.

**H0 (khả vi, bị chặn dưới).** $f$ khả vi và $f_{\inf}=\inf_xf(x)>-\infty$.

**H1 (lồi).** $f$ khả vi và $f(z)\ge f(x)+\nabla f(x)^T(z-x)$.

**H2 ($L$-trơn, $L$-smooth).** $f$ khả vi và tồn tại $L>0$ để $\lVert\nabla f(x)-\nabla f(z)\rVert\le L\lVert x-z\rVert$.

**H3 ($\mu$-lồi mạnh).** $f$ khả vi và tồn tại $\mu>0$ để $f(z)\ge f(x)+\nabla f(x)^T(z-x)+\tfrac\mu2\lVert z-x\rVert^2$.

**H4 (có điểm cực tiểu).** Tồn tại $x^*\in\mathbb R^n$ với $f(x^*)=f_{\inf}$; khi đó viết $f^*=f(x^*)$.
:::

Mỗi giả thiết có một hình ảnh. H0 nói đồ thị không xuống vô hạn. H1 nói tiếp tuyến tại mọi điểm nằm dưới đồ thị; theo Định lý 01.26 đây là tính lồi của hàm khả vi.

H2 là gradient $L$-Lipschitz của Định nghĩa 04.17: độ cong không vượt $L$ theo mọi hướng. H3 đặt một parabol độ cong $\mu$ tiếp xúc tại mỗi điểm nằm dưới đồ thị. H4 bảo đảm có một điểm để đo khoảng cách $d_k$.

H3 tương đương với lồi mạnh theo Định nghĩa 01.39. Chiều từ Định nghĩa 01.39 sang H3 là Mệnh đề 04.25(a). Chiều ngược lại: với $h(x)=f(x)-\tfrac\mu2\lVert x\rVert^2$ và $\nabla h(x)=\nabla f(x)-\mu x$, khai triển cho

$$
h(z)-h(x)-\nabla h(x)^T(z-x)=f(z)-f(x)-\nabla f(x)^T(z-x)-\tfrac\mu2\lVert z-x\rVert^2,
$$

nên H3 nói vế phải không âm, và Định lý 01.26 cho $h$ lồi.

Giữa các giả thiết có bốn quan hệ:

- H3 kéo theo H1, vì số hạng $\tfrac\mu2\lVert z-x\rVert^2$ không âm;
- H3 kéo theo H4 và điểm cực tiểu là duy nhất (Hệ quả 01.41);
- H4 kéo theo phần bị chặn dưới của H0;
- H2 và H3 cùng đúng kéo theo $\mu\le L$ (Mệnh đề 04.25(c)).

Với $f$ khả vi hai lần, H2 và H3 cùng đúng khi và chỉ khi $\mu I\preceq\nabla^2f(x)\preceq LI$ với mọi $x$ (Nhận xét 04.19, Nhận xét 01.40). Tỉ số $\kappa=L/\mu$ đo độ chênh giữa hướng cong nhất và hướng phẳng nhất.

Boyd và Vandenberghe (2004, mục 9.1.2, tr. 459–461) giả thiết $\nabla^2f\succeq mI$ trên tập mức ban đầu $S$ rồi suy ra $\nabla^2f\preceq MI$ trên $S$; ở đây các giả thiết đặt trên toàn $\mathbb R^n$ và không cần đạo hàm bậc hai, với $\mu$ đóng vai $m$ và $L$ đóng vai $M$.

::: example Ví dụ 05b.3 (Kiểm năm giả thiết trên năm hàm)
**Dữ kiện.**

Năm hàm: $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$ của ví dụ dẫn A; $f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$ của ví dụ dẫn C; mất mát logistic $\phi(s)=\log(1+\exp(-s))$ với $\phi''(s)\in(0,\tfrac14]$ và $\phi''(s)\to0$ khi $\lvert s\rvert\to\infty$ (Mệnh đề 01.9); $f(x)=[x]_1^2$ trên $\mathbb R^2$; $f(x)=x^4$ trên $\mathbb R$. Tiêu chuẩn Hessian: H2 khi $-LI\preceq\nabla^2f\preceq LI$, H3 khi $\nabla^2f\succeq\mu I$.

**Kiểm.**

| Hàm | Hessian | H0 | H1 | H2 | H3 | H4 |
|---|---|---|---|---|---|---|
| $J$ | $1$ | có | có | $L=1$ | $\mu=1$ | $\theta^*=1$ |
| ví dụ dẫn C | $\operatorname{diag}(3,7)$ | có | có | $L=7$ | $\mu=3$ | $x^*=0$ |
| $\phi$ | $\phi''\in(0,\tfrac14]$ | $f_{\inf}=0$ | có | $L=\tfrac14$ | không | không |
| $[x]_1^2$ | $\operatorname{diag}(2,0)$ | có | có | $L=2$ | không | mọi $(0,\upsilon)$ |
| $x^4$ | $12x^2$ | có | có | không | không | $x^*=0$ |

**Diễn giải.**

Mất mát logistic không đạt cận dưới đúng $0$, vì $\phi>0$ mọi nơi; nó không lồi mạnh vì $\phi''\to0$. Hàm $[x]_1^2$ phẳng theo hướng $[x]_2$, nên không có $\mu>0$ và nghiệm không duy nhất. Hàm $x^4$ có $f''(0)=0$, nên không lồi mạnh, và $12x^2$ không bị chặn, nên không có $L$ toàn cục.

**Kiểm tra lại.**

Với $J$, $J'(\theta)=\theta-1$, nên $\lvert J'(\theta)-J'(\theta')\rvert=\lvert\theta-\theta'\rvert$, đúng H2 với $L=1$; H3 với $\mu=1$ là đẳng thức $J(\theta')=J(\theta)+J'(\theta)(\theta'-\theta)+\tfrac12(\theta'-\theta)^2$ của hàm bậc hai.
:::

**Trong học máy.** Hồi quy tuyến tính bình phương nhỏ nhất thỏa H0–H2 và H4; nó thỏa H3 khi ma trận đặc trưng có hạng cột đầy đủ. Hồi quy logistic thỏa H0–H2, nhưng H4 sai khi dữ liệu tách được tuyến tính (Mục 2.1); thêm số hạng chính quy $\tfrac\nu2\lVert x\rVert^2$ với $\nu>0$ đem lại H3 với $\mu=\nu$ và cùng với nó H4 (Tình huống 05b.1). Mất mát của mạng nơ ron nhiều lớp thường thỏa H0, vi phạm H1 và H3, và chỉ thỏa H2 trên một vùng bị chặn của không gian tham số (Mục 6).

::: exercise Bài tập 05b.1 (Phân loại tốc độ của một dãy hỗn hợp)
Cho $u_k=5\cdot0{,}9^k+\dfrac1k$ với $k\ge1$.

- (a) Xác định dãy hội tụ tuyến tính hay dưới tuyến tính theo Định nghĩa 05b.2.
- (b) Tìm một hằng số $C$ để $u_k\le C/k$ với mọi $k\ge1$.
- (c) Dùng Mệnh đề 05b.3 để tìm một số bước đủ cho $u_k\le0{,}01$, rồi so với số bước nhỏ nhất thật sự.
:::

::: hint Gợi ý Bài tập 05b.1
Ở (a), so $u_k$ với $1/k$. Ở (b), tìm giá trị lớn nhất của $k\cdot0{,}9^k$ theo $k$ nguyên bằng cách xét tỉ số $\tfrac{(k+1)0{,}9^{k+1}}{k\,0{,}9^k}$.
:::

::: solution Lời giải Bài tập 05b.1
**Câu (a).**

Giả sử có $C'>0$ và $q\in(0,1)$ với $u_k\le C'q^k$. Khi đó $\tfrac1k\le u_k\le C'q^k$, tức $kq^k\ge1/C'$ với mọi $k$. Điều này sai vì $kq^k\to0$. Vậy dãy không hội tụ tuyến tính; phần (b) cho cận $O(1/k)$, nên tốc độ là dưới tuyến tính.

**Câu (b).**

$k\,u_k=5k\cdot0{,}9^k+1$. Tỉ số $\tfrac{(k+1)0{,}9^{k+1}}{k\,0{,}9^k}=0{,}9\cdot\tfrac{k+1}k$ lớn hơn $1$ khi $k<9$, bằng $1$ khi $k=9$, nhỏ hơn $1$ khi $k>9$. Vậy $k\cdot0{,}9^k$ đạt giá trị lớn nhất tại $k=9$ và $k=10$:

$$
9\cdot0{,}9^9=10\cdot0{,}9^{10}\approx3{,}4868 .
$$

Do đó $k\,u_k\le5\cdot3{,}4868+1\approx18{,}43$, và $C=18{,}5$ dùng được.

**Câu (c).**

Mệnh đề 05b.3(d) với $C=18{,}5$, $p=1$ cho $k\ge1850$. Số bước thật: phần $\tfrac1k$ đòi $k\ge100$ ngay cả khi phần mũ bằng $0$. Tính trực tiếp:

- $k=100$: $\tfrac1k=0{,}01000$, phần mũ $\approx0{,}00013$, nên $u_{100}\approx0{,}01013>0{,}01$;
- $k=101$: $\tfrac1k\approx0{,}00990$, phần mũ $\approx0{,}00012$, nên $u_{101}\approx0{,}01002>0{,}01$;
- $k=102$: $\tfrac1k\approx0{,}00980$, phần mũ $\approx0{,}00011$, nên $u_{102}\approx0{,}00991\le0{,}01$.

**Kiểm tra lại.**

Số bước nhỏ nhất là $102$, nhỏ hơn nhiều so với $1850$, đúng như phạm vi của Mệnh đề 05b.3: số bước của cận là đủ, không cần.
:::

**Chuỗi suy luận của mục.**

1. Ví dụ 05b.1 và 05b.2 đo hai đại lượng với hai kiểu giảm.
2. Định nghĩa 05b.1 gọi tên bốn dạng hội tụ theo đại lượng được đo.
3. Định nghĩa 05b.2 và Mệnh đề 05b.3 đổi một cận thành số bước, phân biệt tuyến tính và dưới tuyến tính.
4. Định nghĩa 05b.5 đặt tên năm giả thiết; Ví dụ 05b.3 kiểm chúng trên các hàm của chương.

Đích của mục là ngôn ngữ chung để phát biểu mọi định lý về sau: đại lượng được chặn, tốc độ, giả thiết.

**Kết mục.** Mục này cho bốn dạng hội tụ (Định nghĩa 05b.1), các kiểu tốc độ cùng phép đổi thành số bước (Mệnh đề 05b.3), và bộ giả thiết H0–H4 (Định nghĩa 05b.5). Các dạng hội tụ mới được định nghĩa riêng rẽ: chưa biết khi nào một cận cho sai số giá trị kéo theo một cận cho khoảng cách hay cho chuẩn gradient. Mục 2 lập các bất đẳng thức nối ba đại lượng đó và chỉ ra giả thiết cần cho từng chiều.


## 2. Bất đẳng thức cầu nối giữa các dạng hội tụ

Mục 1 định nghĩa ba đại lượng tất định, $d_k$, $e_k$ và $\lVert\nabla f(x_k)\rVert$, nhưng chưa nối chúng với nhau.

Trong khi chạy thuật toán, chỉ chuẩn gradient đo được; $d_k$ cần $x^*$ và $e_k$ cần $f^*$. Tại $x_0=(2,4)$ của ví dụ dẫn C, ba đại lượng là $d_0^2=20$, $e_0=62$ và $\lVert\nabla f(x_0)\rVert^2=820$; câu hỏi là từ số $820$ đo được có thể suy ra gì về hai số kia. Một định lý chặn $e_k$ vì vậy chỉ có ích khi biết nó nói gì về $d_k$ và về chuẩn gradient. Mục này lập các bất đẳng thức nối ba đại lượng tại cùng một điểm, cộng một đồng nhất thức nối khoảng cách tại hai điểm lặp liên tiếp, và chỉ ra giả thiết nào cần cho mỗi chiều.

### 2.1 Nhu cầu: giá trị hội tụ, dãy lặp thì không

Hai ví dụ sau cho thấy hội tụ theo giá trị không tự kéo theo hội tụ theo dãy lặp, vì hai lý do khác nhau.

::: example Ví dụ 05b.4 (Mất mát logistic: không có điểm cực tiểu)
**Dữ kiện.**

$\phi(s)=\log(1+\exp(-s))$ trên $\mathbb R$, với $\phi'(s)=-1/(1+\exp(s))<0$ và $\phi''(s)\in(0,\tfrac14]$ (Mệnh đề 01.9). Theo Ví dụ 05b.3, $\phi$ thỏa H0, H1 và H2 với $L=\tfrac14$, cận dưới đúng $\phi_{\inf}=0$ không được đạt. GD bước $\tfrac1L=4$ từ $s_0=0$:

$$
s_{k+1}=s_k-4\phi'(s_k)=s_k+\frac4{1+\exp(s_k)} .
$$

**Vài bước đầu.**

$s_1=0+\tfrac42=2$; $s_2=2+\tfrac4{1+\exp(2)}\approx2{,}477$; $s_3\approx2{,}787$.

**Dãy tăng và không bị chặn.**

Mỗi bước cộng một số dương, nên $(s_k)$ tăng chặt. Giả sử $(s_k)$ bị chặn trên; khi đó nó hội tụ tới một $s_\infty$, và chuyển qua giới hạn trong phép lặp cho $s_\infty=s_\infty+4/(1+\exp(s_\infty))$, vô lý. Vậy $s_k\to\infty$ và $\phi(s_k)\to0=\phi_{\inf}$.

**Tốc độ.**

Khi $s_k$ lớn, $\exp(s_{k+1})=\exp(s_k)\exp\bigl(4/(1+\exp(s_k))\bigr)\approx\exp(s_k)+4$, nên $\exp(s_k)\approx4k$ và $s_k\approx\log(4k)$. Tính trực tiếp: $s_{10}\approx3{,}81$, $s_{100}\approx6{,}01$, $s_{1000}\approx8{,}30$, và $\phi(s_{1000})\approx2{,}49\cdot10^{-4}$.

**Kiểm tra lại.**

$\log(4\cdot1000)\approx8{,}29$, gần $s_{1000}\approx8{,}30$. Vì $\phi(s)\approx\exp(-s)$ khi $s$ lớn, $\phi(s_{1000})\approx\exp(-8{,}30)\approx2{,}5\cdot10^{-4}$.
:::

![Đồ thị hàm logistic φ(s) giảm dần về 0 khi s tăng từ 0 đến 8, không đạt 0 (ghi chú inf φ = 0, không đạt). Các điểm lặp s₀, s₁, s₁₀, s₁₀₀, s₁₀₀₀ của giảm gradient bước 4 được đánh dấu trên trục s, dịch dần sang phải; ghi chú s_k ≈ ln(4k) → ∞.](img/lec-05b/logistic-no-minimizer.svg)

Hình cho thấy các điểm lặp trượt dần sang phải trong khi chiều cao của đồ thị tại đó tiến về $0$. Dãy hội tụ theo giá trị tới $\phi_{\inf}$, nhưng không có điểm $x^*$ nào để đo khoảng cách. Đây là mất mát logistic trên dữ liệu phân loại tách được: trọng số tăng mãi để biên của mọi quan sát tiến ra vô cùng.

::: example Ví dụ 05b.5 (Hàm $[x]_1^2$: điểm cực tiểu không duy nhất)
**Dữ kiện.**

$f(x)=[x]_1^2$ trên $\mathbb R^2$, $\nabla f(x)=(2[x]_1,0)$, $L=2$; mọi điểm $(0,\upsilon)$ là điểm cực tiểu với $f^*=0$ (Ví dụ 05b.3). GD bước hằng $\eta\in(0,1)$ từ một điểm $x_0$ với $[x_0]_1\ne0$.

**Dãy lặp.**

$x_{k+1}=\bigl((1-2\eta)[x_k]_1,\,[x_k]_2\bigr)$, nên $x_k=\bigl((1-2\eta)^k[x_0]_1,\,[x_0]_2\bigr)\to\bigl(0,[x_0]_2\bigr)$ vì $\lvert1-2\eta\rvert<1$.

**Hai thước đo.**

$e_k=(1-2\eta)^{2k}[x_0]_1^2\to0$. Khoảng cách tới điểm cực tiểu $(0,\upsilon)$ là $\sqrt{(1-2\eta)^{2k}[x_0]_1^2+([x_0]_2-\upsilon)^2}$, tiến về $\lvert[x_0]_2-\upsilon\rvert$, khác $0$ khi $\upsilon\ne[x_0]_2$.

**Kiểm tra lại.**

Với $\eta=\tfrac14$, $x_0=(1,1)$: $x_1=(\tfrac12,1)$, $f(x_1)=\tfrac14$, và khoảng cách tới $(0,0)$ bằng $\sqrt{\tfrac14+1}\approx1{,}12$, không giảm về $0$.
:::

Hai ví dụ cho hai nguồn tách rời giữa $e_k$ và $d_k$: điểm cực tiểu không tồn tại, và điểm cực tiểu không duy nhất. Giả thiết H4 khắc phục nguồn thứ nhất; độ cong dưới $\mu>0$ của H3 khắc phục nguồn thứ hai và còn cho chiều từ $e$ sang $d$. Chiều ngược lại, từ $d$ sang $e$, cần chặn độ cong từ trên, tức H2. Ký hiệu $f_{\inf}=\inf_xf(x)$ (Định nghĩa 01.10) dùng cho mọi hàm bị chặn dưới, kể cả khi cận dưới không đạt; mọi kết quả chỉ cần H0 sẽ được viết theo $f_{\inf}$.

### 2.2 Cận trên bậc hai, bổ đề giảm và chuẩn gradient

Chiều từ khoảng cách sang sai số giá trị cần chặn $f$ từ trên quanh một điểm. Bổ đề 04.18 cho đúng cận đó: nếu $f$ thỏa H2 thì với mọi $x,z\in\mathbb R^n$,

$$
f(z)\le f(x)+\nabla f(x)^T(z-x)+\frac L2\lVert z-x\rVert^2 .
\tag{2.1}
$$

Bất đẳng thức (2.1) nói rằng tại mỗi điểm $x$, đồ thị của $f$ nằm dưới parabol có cùng giá trị, cùng gradient với $f$ tại $x$ và có độ cong $L$. Bổ đề chỉ cần H2, không cần tính lồi; chứng minh trong Bài 04 viết $f(z)-f(x)-\nabla f(x)^T(z-x)$ thành tích phân của $\bigl(\nabla f(x+\tau(z-x))-\nabla f(x)\bigr)^T(z-x)$ theo $\tau\in[0,1]$ rồi chặn biểu thức dưới dấu tích phân bằng $L\tau\lVert z-x\rVert^2$.

![Đồ thị theo t từ 0 đến 2 của lát cắt h(t) = 2,5t² của hàm Ví dụ C theo hướng (1, 1)/√2, cùng parabol trên độ cong L = 7 và parabol dưới độ cong μ = 3; ba đường tiếp xúc tại t = 1, parabol trên nằm trên h, parabol dưới nằm dưới h.](img/lec-05b/quadratic-sandwich.svg)

Hình lấy lát cắt của ví dụ dẫn C, $f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$, theo hướng đơn vị $(1,1)/\sqrt2$: $h(t)=f\bigl(t(1,1)/\sqrt2\bigr)$, bằng $\tfrac12\bigl(\tfrac32+\tfrac72\bigr)t^2=2{,}5t^2$. Tại $t=1$, $h(1)=2{,}5$ và $h'(1)=5$. Parabol trên là $2{,}5+5(t-1)+\tfrac72(t-1)^2$, ứng với (2.1) với $L=7$; parabol dưới là $2{,}5+5(t-1)+\tfrac32(t-1)^2$, ứng với H3 với $\mu=3$. Độ cong $5$ của lát cắt nằm giữa $3$ và $7$; theo trục $[x]_2$, độ cong bằng đúng $7$ và (2.1) xảy ra dấu bằng.

Thay $z$ bằng một bước gradient trong (2.1) cho mức giảm của một bước. Bổ đề 04.20 làm việc đó cho bước $t\in(0,\tfrac1L]$; bổ đề sau xét mọi bước dương, để thấy ngưỡng bước mà ở đó bảo đảm giảm biến mất.

::: lemma Bổ đề 05b.6 (Bổ đề giảm với bước bất kỳ; descent lemma)
**Giả thiết.** $f$ thỏa H2 với hằng số $L$; $x\in\mathbb R^n$; $\eta>0$.

**Kết luận.**

$$
f\bigl(x-\eta\nabla f(x)\bigr)\le f(x)-\eta\Bigl(1-\frac{L\eta}2\Bigr)\lVert\nabla f(x)\rVert^2 .
\tag{2.2}
$$

Hệ số $\eta(1-\tfrac{L\eta}2)$ dương khi và chỉ khi $0<\eta<\tfrac2L$. Khi $0<\eta\le\tfrac1L$, vế phải không vượt $f(x)-\tfrac\eta2\lVert\nabla f(x)\rVert^2$.

**Điều kiện áp dụng.** Không cần tính lồi, không cần điểm cực tiểu.

**Phạm vi.** Bổ đề so $f$ tại hai điểm liên tiếp, không so với $f^*$; với $\eta\ge\tfrac2L$ nó không cho bảo đảm giảm, nhưng tự nó cũng không chứng minh dãy phân kỳ.
:::

::: proof Chứng minh Bổ đề 05b.6
**Bước 1 (thế vào cận trên bậc hai).**

Áp (2.1) với $z=x-\eta\nabla f(x)$. Khi đó $z-x=-\eta\nabla f(x)$, số hạng bậc nhất bằng $-\eta\lVert\nabla f(x)\rVert^2$ và số hạng bậc hai bằng $\tfrac{L\eta^2}2\lVert\nabla f(x)\rVert^2$. Cộng hai số hạng được (2.2).

**Bước 2 (dấu của hệ số).**

$\eta(1-\tfrac{L\eta}2)>0$ với $\eta>0$ khi và chỉ khi $L\eta<2$. Khi $\eta\le\tfrac1L$ thì $L\eta\le1$, nên $1-\tfrac{L\eta}2\ge\tfrac12$ và hệ số không nhỏ hơn $\tfrac\eta2$. $\square$
:::

Bổ đề 04.20 là trường hợp $\eta\le\tfrac1L$ của Bổ đề 05b.6. Phần mở rộng cho biết bảo đảm giảm còn đúng trên cả khoảng $(\tfrac1L,\tfrac2L)$, với hệ số nhỏ dần về $0$ khi $\eta\to\tfrac2L$.

Trên ví dụ dẫn C với $L=7$, bước $\eta=\tfrac14\in(\tfrac17,\tfrac27)$ cho hệ số $\tfrac14(1-\tfrac78)=\tfrac1{32}$, dương nhưng nhỏ hơn $\tfrac1{14}$ của bước $\tfrac17$. Với bước $\eta>\tfrac27$, Ví dụ 04.7 cho thấy tọa độ thứ hai của dãy nhân với $\lvert1-7\eta\rvert>1$ ở mỗi bước và dãy phân kỳ; Bổ đề 05b.6 không kết luận điều đó, nó chỉ ngừng bảo đảm.

Lấy $\eta=\tfrac1L$ và so điểm mới với cận dưới đúng cho một quan hệ giữa chuẩn gradient và sai số giá trị.

::: lemma Bổ đề 05b.7 (Chặn chuẩn gradient bởi sai số giá trị)
**Giả thiết.** $f$ thỏa H0 và H2.

**Kết luận.** Với mọi $x\in\mathbb R^n$,

$$
\lVert\nabla f(x)\rVert^2\le2L\bigl(f(x)-f_{\inf}\bigr).
\tag{2.3}
$$

**Điều kiện áp dụng.** Không cần tính lồi và không cần $f_{\inf}$ được đạt.

**Phạm vi.** Bổ đề cho chiều "sai số giá trị nhỏ thì gradient nhỏ"; chiều ngược lại cần thêm độ cong dưới (Bổ đề 05b.8).
:::

::: proof Chứng minh Bổ đề 05b.7
**Bước 1 (một bước gradient).**

Bổ đề 05b.6 với $\eta=\tfrac1L$ cho $f\bigl(x-\tfrac1L\nabla f(x)\bigr)\le f(x)-\tfrac1{2L}\lVert\nabla f(x)\rVert^2$.

**Bước 2 (cận dưới đúng).**

Theo định nghĩa của cận dưới đúng, $f_{\inf}\le f(z)$ với mọi $z$, trong đó có $z=x-\tfrac1L\nabla f(x)$. Ghép với Bước 1 được $f_{\inf}\le f(x)-\tfrac1{2L}\lVert\nabla f(x)\rVert^2$; nhân hai vế với $2L$ rồi chuyển vế được (2.3). $\square$
:::

Theo Bổ đề 05b.7, tại một điểm có sai số giá trị $\delta$, chuẩn gradient không vượt $\sqrt{2L\delta}$. Ví dụ 05b.6 ở Mục 2.3 kiểm Bổ đề 05b.6 và Bổ đề 05b.7 tại $x_0$ của ví dụ dẫn C.

Boyd và Vandenberghe (2004, công thức (9.14), tr. 461) suy cùng bất đẳng thức bằng cách cực tiểu hai vế của (2.1) theo $z$: vế phải đạt cực tiểu tại $z=x-\tfrac1L\nabla f(x)$, với giá trị $f(x)-\tfrac1{2L}\lVert\nabla f(x)\rVert^2$. Bất đẳng thức $f(x)-f^*\le\tfrac1{2\mu}\lVert\nabla f(x)\rVert^2$ của Mệnh đề 04.25(b) là chiều ngược lại, đổi $L$ thành $\mu$ và cần lồi mạnh.

**Trong học máy.** Bổ đề 05b.7 áp dụng cho mọi mất mát có gradient Lipschitz và bị chặn dưới, kể cả mất mát của mạng nơ ron trên một vùng tham số bị chặn. Nó giải thích vì sao chuẩn gradient nhỏ dần khi mất mát huấn luyện tiến gần cận dưới. Chiều ngược lại không có: với mất mát không lồi, chuẩn gradient nhỏ có thể xảy ra tại một điểm có mất mát lớn, như điểm yên ngựa của Tình huống 05b.3.

### 2.3 Cận của hàm lồi mạnh

Bổ đề 05b.7 chặn gradient bằng sai số giá trị. Chiều ngược lại và chiều từ sai số giá trị sang khoảng cách cần độ cong dưới $\mu>0$: với hàm $[x]_1^2$ của Ví dụ 05b.5, sai số giá trị bằng $0$ tại mọi điểm $(0,\upsilon)$ dù khoảng cách tới $(0,0)$ lớn tùy ý. Bổ đề sau gom các cận mà H3 đem lại.

::: lemma Bổ đề 05b.8 (Các cận của hàm lồi mạnh)
**Giả thiết.** $f$ thỏa H3 với hằng số $\mu$ và H4 với điểm cực tiểu $x^*$. Với $x\in\mathbb R^n$, đặt $d=\lVert x-x^*\rVert$ và $e=f(x)-f^*$.

**Kết luận.**

- (a) $\tfrac\mu2d^2\le e$.
- (b) $e\le\tfrac1{2\mu}\lVert\nabla f(x)\rVert^2$.
- (c) $\mu d\le\lVert\nabla f(x)\rVert$.
- (d) $x^*$ là điểm cực tiểu duy nhất.
- (e) Nếu thêm H2 với hằng số $L$ thì $e\le\tfrac L2d^2$.

**Điều kiện áp dụng.** H3 và H4 trên toàn $\mathbb R^n$; phần (e) cần thêm H2.

**Phạm vi.** Mọi cận nói về một điểm $x$, không về dãy lặp. Phần (b) là kết luận (b) của Mệnh đề 04.25.
:::

::: proof Chứng minh Bổ đề 05b.8
**Bước 1 (gradient tại điểm cực tiểu).**

$x^*$ là điểm cực tiểu của hàm khả vi trên $\mathbb R^n$, nên $\nabla f(x^*)=0$ (điều kiện cần bậc nhất).

**Bước 2 (phần a và d).**

Áp H3 với điểm gốc $x^*$ và điểm so sánh $x$: $f(x)\ge f^*+\nabla f(x^*)^T(x-x^*)+\tfrac\mu2d^2=f^*+\tfrac\mu2d^2$, theo Bước 1. Đây là (a). Nếu $x$ cũng là điểm cực tiểu thì $e=0$, nên (a) cho $d=0$, tức $x=x^*$; đây là (d).

**Bước 3 (phần b).**

Cố định $x$. Vế phải của H3, $m_x(z)=f(x)+\nabla f(x)^T(z-x)+\tfrac\mu2\lVert z-x\rVert^2$, là hàm bậc hai lồi theo $z$, có gradient $\nabla f(x)+\mu(z-x)$ triệt tiêu tại $z=x-\tfrac1\mu\nabla f(x)$. Giá trị nhỏ nhất của nó là

$$
\begin{aligned}
m_x\Bigl(x-\tfrac1\mu\nabla f(x)\Bigr)&=f(x)-\tfrac1\mu\lVert\nabla f(x)\rVert^2+\tfrac\mu2\cdot\tfrac1{\mu^2}\lVert\nabla f(x)\rVert^2\\
&=f(x)-\tfrac1{2\mu}\lVert\nabla f(x)\rVert^2 .
\end{aligned}
$$

H3 cho $f(z)\ge m_x(z)$ với mọi $z$; lấy $z=x^*$ được $f^*\ge f(x)-\tfrac1{2\mu}\lVert\nabla f(x)\rVert^2$, tức (b).

**Bước 4 (phần c).**

Áp H3 với điểm gốc $x$ và điểm so sánh $x^*$, rồi dùng bất đẳng thức Cauchy–Schwarz $\nabla f(x)^T(x^*-x)\ge-\lVert\nabla f(x)\rVert d$:

$$
f^*\ge f(x)-\lVert\nabla f(x)\rVert\,d+\tfrac\mu2d^2 .
$$

Chuyển vế được $e\le\lVert\nabla f(x)\rVert\,d-\tfrac\mu2d^2$.

Ghép với (a): $\tfrac\mu2d^2\le\lVert\nabla f(x)\rVert\,d-\tfrac\mu2d^2$, nên $\mu d^2\le\lVert\nabla f(x)\rVert\,d$. Khi $d>0$, chia hai vế cho $d$ được (c); khi $d=0$, vế trái của (c) bằng $0$.

**Bước 5 (phần e).**

Áp (2.1) với điểm gốc $x^*$ và điểm so sánh $x$, dùng $\nabla f(x^*)=0$: $f(x)\le f^*+\tfrac L2d^2$. $\square$
:::

Bổ đề 05b.8 cho mỗi đại lượng một cận theo đại lượng khác: (a) đổi sai số giá trị thành khoảng cách, (b) đổi chuẩn gradient thành sai số giá trị, (c) đổi chuẩn gradient thành khoảng cách, và (e) đổi khoảng cách thành sai số giá trị.

Bỏ H3 thì (a), (c), (d) mất, như hàm $[x]_1^2$ cho thấy. Phần (b) vẫn đúng với hàm này, với $\mu=2$, vì $\lVert\nabla f\rVert^2=4[x]_1^2=4f$; đó là điều kiện Polyak–Łojasiewicz của Mục 6.5. Phần (b) mất với $x^4$, vì $e/\lvert f'\rvert^2=1/(16x^2)\to\infty$ khi $x\to0$. Bỏ H4 thì không có $x^*$ để viết các bất đẳng thức; với H3 điều này không xảy ra, vì H3 kéo theo H4.

Boyd và Vandenberghe (2004, công thức (9.11), tr. 460) phát biểu $d\le\tfrac2\mu\lVert\nabla f(x)\rVert$, yếu hơn (c) hai lần: lập luận của họ chỉ dùng $f^*\le f(x)$ ở Bước 4, không dùng thêm (a). Hình bản đồ ở Mục 2.5 ghi dạng $\tfrac2\mu$ đó; dạng (c) kéo theo nó.

::: example Ví dụ 05b.6 (Các cận của Mục 2.2–2.3 tại điểm đầu của ví dụ dẫn C)
**Dữ kiện.**

$f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$ thỏa H2, H3, H4 với $L=7$, $\mu=3$, $x^*=0$, $f^*=0$ (Ví dụ 05b.3). Điểm $x_0=(2,4)$, $f(x_0)=62$, $\nabla f(x_0)=(6,28)$.

Bổ đề 05b.6 với $\eta=\tfrac17$: $f(x_0-\eta\nabla f(x_0))\le f(x_0)-\tfrac\eta2\lVert\nabla f(x_0)\rVert^2$. Bổ đề 05b.7: $\lVert\nabla f(x)\rVert^2\le2L(f(x)-f_{\inf})$. Bổ đề 05b.8: (a) $\tfrac\mu2d^2\le e$, (b) $e\le\tfrac1{2\mu}\lVert\nabla f\rVert^2$, (c) $\mu d\le\lVert\nabla f\rVert$, (e) $e\le\tfrac L2d^2$.

**Tính.**

$d^2=4+16=20$, $d=\sqrt{20}\approx4{,}472$, $e=62$, $\lVert\nabla f(x_0)\rVert^2=820$, $\lVert\nabla f(x_0)\rVert\approx28{,}64$.

- Bổ đề 05b.7: $820\le2\cdot7\cdot62=868$.
- Bổ đề 05b.6: $f(x_1)\le62-\tfrac{820}{14}=\tfrac{24}7$.
- (a): $\tfrac32\cdot20=30\le62$.
- (b): $62\le\tfrac{820}6\approx136{,}7$.
- (c): $3\cdot4{,}472\approx13{,}42\le28{,}64$.
- (e): $62\le\tfrac72\cdot20=70$.

**Kiểm tra lại.**

Điểm mới $x_1=(\tfrac87,0)$ có $f(x_1)=\tfrac{96}{49}\approx1{,}96$, không vượt $\tfrac{24}7\approx3{,}43$. Dạng của Boyd và Vandenberghe cho $d\le\tfrac23\cdot28{,}64\approx19{,}1$, còn (c) cho $d\le\tfrac{28{,}64}3\approx9{,}55$; cả hai đều đúng với $d\approx4{,}47$, và (c) gần giá trị thật hơn.
:::

**Trong học máy.** Với hồi quy logistic có chính quy hóa $\tfrac\nu2\lVert x\rVert^2$, H3 đúng với $\mu=\nu$, và Bổ đề 05b.8(b), (c) biến chuẩn gradient tính được thành chứng nhận cho sai số giá trị và khoảng cách tới nghiệm. Chứng nhận yếu dần khi $\nu$ nhỏ: với $\nu=10^{-4}$ và $\lVert\nabla f(x)\rVert=10^{-3}$, (b) chỉ cho $e\le\tfrac{10^{-6}}{2\cdot10^{-4}}=5\cdot10^{-3}$ và (c) chỉ cho $d\le10$. Với mạng sâu, H3 không đúng, nên chuẩn gradient nhỏ không chứng nhận gì về khoảng cách hay sai số giá trị.

### 2.4 Đồng nhất thức một bước

Các bổ đề trên so ba đại lượng tại cùng một điểm. Theo dõi một dãy lặp còn cần quan hệ giữa khoảng cách tại $x_k$ và tại $x_{k+1}$. Quan hệ đó là một phép khai triển bình phương, không cần giả thiết nào về $f$.

::: lemma Bổ đề 05b.9 (Đồng nhất thức một bước)
**Giả thiết.** $x,g,z\in\mathbb R^n$ và $\eta\in\mathbb R$ tùy ý.

**Kết luận.**

$$
\lVert x-\eta g-z\rVert^2=\lVert x-z\rVert^2-2\eta\,g^T(x-z)+\eta^2\lVert g\rVert^2 .
\tag{2.4}
$$

**Điều kiện áp dụng.** Không có giả thiết về $f$, về $g$ hay về $z$.

**Phạm vi.** Các mục sau áp (2.4) với $z=x^*$ và $g$ là gradient, dưới gradient hoặc gradient trên một nhóm mẫu.
:::

::: proof Chứng minh Bổ đề 05b.9
Viết $x-\eta g-z=(x-z)-\eta g$ rồi khai triển bình phương chuẩn của hiệu hai vectơ: $\lVert(x-z)-\eta g\rVert^2=\lVert x-z\rVert^2-2\eta\,g^T(x-z)+\eta^2\lVert g\rVert^2$. $\square$
:::

Đẳng thức (2.4) tách thay đổi của bình phương khoảng cách thành hai phần. Phần $-2\eta\,g^T(x-z)$ âm khi bước $-\eta g$ có thành phần hướng về $z$; phần $\eta^2\lVert g\rVert^2$ luôn không âm và là cái giá của việc đi một bước dài $\eta\lVert g\rVert$. Mọi chứng minh ở Mục 3 đến Mục 5 chỉ khác nhau ở cách chặn hai phần này: một cận dưới cho $g^T(x-x^*)$ và một cận trên cho $\lVert g\rVert^2$, hoặc cho kỳ vọng của chúng.

Cận dưới cho tích vô hướng đến từ tính lồi, áp tại điểm $x$ với điểm so sánh $x^*$.

::: corollary Hệ quả 05b.10 (Tích vô hướng với hướng tới điểm cực tiểu)
**Giả thiết.** $f$ thỏa H1 và H4. Với $x\in\mathbb R^n$, đặt $d=\lVert x-x^*\rVert$, $e=f(x)-f^*$.

**Kết luận.**

- (a) $\nabla f(x)^T(x-x^*)\ge e$.
- (b) Nếu $f$ thỏa H3 thì $\nabla f(x)^T(x-x^*)\ge e+\tfrac\mu2d^2\ge\mu d^2$.

**Điều kiện áp dụng.** $x^*$ là một điểm cực tiểu bất kỳ.

**Phạm vi.** Hệ quả cho cận dưới của tích vô hướng trong đồng nhất thức (2.4); các chứng minh của Mục 3 và Mục 5 dùng nó cùng với Bổ đề 05b.7 và 05b.8.
:::

::: proof Chứng minh Hệ quả 05b.10
**Bước 1 (phần a).**

H1 với điểm gốc $x$ và điểm so sánh $x^*$: $f^*\ge f(x)+\nabla f(x)^T(x^*-x)$. Chuyển vế được $\nabla f(x)^T(x-x^*)\ge f(x)-f^*$.

**Bước 2 (phần b).**

H3 với cùng hai điểm cho thêm số hạng $\tfrac\mu2d^2$ ở vế phải: $\nabla f(x)^T(x-x^*)\ge e+\tfrac\mu2d^2$. Bổ đề 05b.8(a) cho $e\ge\tfrac\mu2d^2$, nên tổng không nhỏ hơn $\mu d^2$. $\square$
:::

::: remark Nhận xét 05b.11 (Ngưỡng bước để khoảng cách giảm)
Theo (2.4) với $z=x^*$, khoảng cách mới nhỏ hơn khoảng cách cũ khi và chỉ khi $\eta^2\lVert g\rVert^2<2\eta\,g^T(x-x^*)$, tức

$$
0<\eta<\frac{2\,g^T(x-x^*)}{\lVert g\rVert^2} .
$$

Với $g=\nabla f(x)$ và $f$ lồi, Hệ quả 05b.10(a) cho tử số không nhỏ hơn $2e>0$ khi $x$ chưa tối ưu, nên khoảng bước này không rỗng. Ngưỡng phụ thuộc $x^*$ chưa biết, nên không dùng được để chọn bước khi chạy; nó chỉ dùng trong chứng minh. Ngưỡng này cũng khác ngưỡng $\tfrac2L$ của Bổ đề 05b.6: một bên bảo đảm khoảng cách giảm, bên kia bảo đảm giá trị giảm.
:::

::: example Ví dụ 05b.7 (Một bước trên ví dụ dẫn C, đo bằng đồng nhất thức)
**Dữ kiện.**

$f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$, $x^*=0$, $f^*=0$; điểm $x=(2,4)$, $f(x)=62$, $g=\nabla f(x)=(6,28)$, $\lVert g\rVert^2=820$; bước $\eta=\tfrac17$. Đẳng thức (2.4): $\lVert x-\eta g-x^*\rVert^2=\lVert x-x^*\rVert^2-2\eta g^T(x-x^*)+\eta^2\lVert g\rVert^2$.

**Tính.**

- $g^T(x-x^*)=6\cdot2+28\cdot4=124$, lớn hơn $e=62$ như Hệ quả 05b.10(a) bảo đảm.
- Vế phải của (2.4): $20-\tfrac27\cdot124+\tfrac1{49}\cdot820=\tfrac{980-1736+820}{49}=\tfrac{64}{49}$.
- Ngưỡng của Nhận xét 05b.11: $\tfrac{2\cdot124}{820}\approx0{,}302$, lớn hơn bước $\tfrac17\approx0{,}143$.

**Kiểm tra lại.**

$x-\eta g=(2-\tfrac67,\,4-4)=(\tfrac87,0)$ có bình phương chuẩn $\tfrac{64}{49}$, khớp vế phải. Hệ quả 05b.10(b) với $\mu=3$:

$$
\begin{aligned}
124&\ge62+\tfrac32\cdot20=92\\
&\ge3\cdot20=60 .
\end{aligned}
$$
:::

![Mặt phẳng tọa độ của Ví dụ C với điểm x = (2, 4), nghiệm x* tại gốc và điểm mới x − ηg = (8/7, 0). Hai vectơ được vẽ: −ηg từ x tới điểm mới và x − x* từ gốc tới x. Ghi chú: ‖x − x*‖² = 20, ‖x − ηg − x*‖² = 64/49, gᵀ(x − x*) = 124.](img/lec-05b/one-step-geometry.svg)

Hình vẽ hai vectơ của (2.4). Vectơ $-\eta g$ có thành phần lớn hướng về gốc, thể hiện qua $g^T(x-x^*)=124>0$, nên bước đưa điểm từ bình phương khoảng cách $20$ xuống $\tfrac{64}{49}$. Bước làm khoảng cách giảm mạnh vì $\eta=\tfrac17$ triệt tiêu đúng tọa độ có độ cong $7$.

### 2.5 Bản đồ các dạng hội tụ

Ghép các bổ đề của mục này cho một chuỗi bất đẳng thức giữa ba đại lượng khi H2, H3 và H4 cùng đúng.

::: proposition Mệnh đề 05b.12 (Chuỗi bất đẳng thức giữa khoảng cách, sai số giá trị và chuẩn gradient)
**Giả thiết.** $f$ thỏa H2, H3, H4 với hằng số $L$, $\mu$ và điểm cực tiểu $x^*$. Với $x\in\mathbb R^n$, đặt $d=\lVert x-x^*\rVert$ và $e=f(x)-f^*$.

**Kết luận.**

$$
\frac\mu2d^2\ \le\ e\ \le\ \frac1{2\mu}\lVert\nabla f(x)\rVert^2\ \le\ \frac L\mu\,e\ \le\ \frac{L^2}{2\mu}d^2 .
\tag{2.5}
$$

**Điều kiện áp dụng.** Cả ba giả thiết trên toàn $\mathbb R^n$.

**Phạm vi.** Các hằng số chỉ phụ thuộc $L$ và $\mu$; tỉ số giữa hai đầu chuỗi là $\kappa^2=(L/\mu)^2$.
:::

::: proof Chứng minh Mệnh đề 05b.12
**Bước 1 (hai bất đẳng thức đầu).**

Đó là Bổ đề 05b.8(a) và (b).

**Bước 2 (bất đẳng thức thứ ba).**

H4 cho $f_{\inf}=f^*$, nên Bổ đề 05b.7 cho $\lVert\nabla f(x)\rVert^2\le2Le$; chia hai vế cho $2\mu$.

**Bước 3 (bất đẳng thức thứ tư).**

Bổ đề 05b.8(e) cho $e\le\tfrac L2d^2$; nhân hai vế với $\tfrac L\mu$. $\square$
:::

Chuỗi (2.5) nói rằng dưới H2, H3, H4, ba đại lượng $d^2$, $e$ và $\lVert\nabla f\rVert^2$ chặn lẫn nhau, sai khác hằng số. Một tốc độ cho một đại lượng vì vậy kéo theo cùng tốc độ cho hai đại lượng kia, còn khoảng cách $d$ nhận tốc độ của căn bậc hai. Chuỗi còn cho thấy $\mu\le L$: vế đầu không vượt vế cuối với mọi $x$.

![Sơ đồ ba nút: khoảng cách d = ‖x − x*‖, sai số giá trị e = f(x) − f* và chuẩn gradient ‖∇f(x)‖. Mũi tên từ d sang e ghi e ≤ (L/2)d² (BĐ1, H2); từ e sang d ghi (μ/2)d² ≤ e (BĐ3, H3); từ e sang chuẩn gradient ghi ‖∇f‖² ≤ 2Le (BĐ2, H2); từ chuẩn gradient sang e ghi e ≤ ‖∇f‖²/(2μ) (BĐ3, H3); từ chuẩn gradient sang d ghi d ≤ (2/μ)‖∇f‖ (BĐ3, H3). Chú thích: mũi tên A → B nghĩa là A nhỏ kéo theo B nhỏ.](img/lec-05b/convergence-map.svg)

Hình vẽ chuỗi (2.5) thành sơ đồ có hướng: mũi tên từ đại lượng A sang đại lượng B nghĩa là một cận cho A sinh ra một cận cho B. Mỗi mũi tên ghi bất đẳng thức, tên bổ đề và giả thiết. Nhãn trên hình theo tên quen thuộc: BĐ1 là cận trên bậc hai (2.1), tức Bổ đề 04.18 áp tại $x^*$; BĐ2 là Bổ đề 05b.7; BĐ3 là Bổ đề 05b.8. Mũi tên từ chuẩn gradient sang $d$ ghi dạng $\tfrac2\mu$ của Boyd và Vandenberghe, yếu hơn Bổ đề 05b.8(c).

::: remark Nhận xét 05b.13 (Mũi tên mất khi bỏ một giả thiết)
Mỗi mũi tên cần đúng giả thiết ghi trên nó. Bỏ giả thiết đó thì có phản ví dụ:

| Giả thiết bị bỏ | Hàm | Hiện tượng | Mũi tên mất |
|---|---|---|---|
| H4 | $\phi(s)=\log(1+\exp(-s))$ | $\phi(s_k)\to0$ trong khi $s_k\to\infty$ (Ví dụ 05b.4) | $e\to d$ |
| H3 | $[x]_1^2$ trên $\mathbb R^2$ | $e=0$ tại $(0,\upsilon)$, khoảng cách tới $(0,0)$ bằng $\lvert\upsilon\rvert$ (Ví dụ 05b.5) | $e\to d$ |
| H3 | $x^4$ trên $\mathbb R$, $x^*=0$ | tại $x=0{,}1$: $\lvert f'(x)\rvert=0{,}004$ trong khi $d=0{,}1$ | chuẩn gradient $\to d$ |

Với $x^4$, tỉ số $d/\lvert f'(x)\rvert=1/(4x^2)$ tiến ra vô cùng khi $x\to0$, nên không có hằng số $c$ nào thỏa $d\le c\lvert f'(x)\rvert$ gần nghiệm. Ba nút của sơ đồ còn khác nhau về khả năng đo: $\lVert\nabla f(x_k)\rVert$ tính được tại mỗi bước, $e_k$ cần $f^*$ hoặc một cận đối ngẫu (Bài 03), $d_k$ cần $x^*$. Một cận cho $d_k$ hay $e_k$ vì vậy thường chỉ kiểm được gián tiếp, qua chuẩn gradient và các mũi tên của sơ đồ.
:::

**Trong học máy.** Khi huấn luyện, trong ba nút của sơ đồ chỉ chuẩn gradient của mất mát huấn luyện đo được ở mỗi bước mà không cần biết lời giải. Dưới H2, H3 và H4, chuỗi (2.5) biến tiêu chí dừng $\lVert\nabla f(x_k)\rVert\le\varepsilon_g$ thành cận $e_k\le\varepsilon_g^2/(2\mu)$ và $d_k\le\varepsilon_g/\mu$. Với mạng sâu, H3 và H4 dạng cực tiểu duy nhất không đúng, nên hai mũi tên đi ra từ nút chuẩn gradient đều mất.

::: exercise Bài tập 05b.2 (Mũi tên mất ở hàm bậc bốn)
Cho $f(x)=x^4$ trên $\mathbb R$, với $x^*=0$, $f^*=0$.

- (a) Chỉ ra giả thiết nào trong H2, H3 sai và giải thích bằng đạo hàm bậc hai.
- (b) Biểu diễn $d=\lvert x\rvert$ và $e=x^4$ theo $\lvert f'(x)\rvert$. Suy ra không tồn tại hằng số $c$ với $d\le c\lvert f'(x)\rvert$ cho mọi $x$ gần $0$.
- (c) Một thuật toán dừng khi $\lvert f'(x_k)\rvert\le10^{-6}$. Tính cận cho $d_k$ và $e_k$ tại điểm dừng, rồi so với cận mà chuỗi (2.5) sẽ cho nếu $f$ có $\mu=1$.
:::

::: hint Gợi ý Bài tập 05b.2
$f'(x)=4x^3$, nên $\lvert x\rvert=(\lvert f'(x)\rvert/4)^{1/3}$.
:::

::: solution Lời giải Bài tập 05b.2
**Câu (a).**

$f''(x)=12x^2$ không bị chặn trên $\mathbb R$, nên không có $L$ toàn cục và H2 sai. $f''(0)=0$, nên không có $\mu>0$ với $f''\ge\mu$ quanh $0$, và H3 sai.

**Câu (b).**

$\lvert f'(x)\rvert=4\lvert x\rvert^3$, nên $d=\lvert x\rvert=(\lvert f'(x)\rvert/4)^{1/3}$ và $e=x^4=(\lvert f'(x)\rvert/4)^{4/3}$. Nếu có $c$ với $d\le c\lvert f'(x)\rvert$ thì $\lvert x\rvert\le4c\lvert x\rvert^3$, tức $1\le4cx^2$ với mọi $x\ne0$ gần $0$; điều này sai khi $x^2<\tfrac1{4c}$.

**Câu (c).**

Với $\lvert f'\rvert\le10^{-6}$: $d\le(2{,}5\cdot10^{-7})^{1/3}\approx6{,}3\cdot10^{-3}$ và $e\le(2{,}5\cdot10^{-7})^{4/3}\approx1{,}6\cdot10^{-9}$. Nếu có $\mu=1$, chuỗi (2.5) và Bổ đề 05b.8(c) sẽ cho $d\le10^{-6}$ và $e\le\tfrac12\cdot10^{-12}$.

**Kiểm tra lại.**

Tại $x=6{,}3\cdot10^{-3}$: $4x^3\approx1{,}0\cdot10^{-6}$ và $x^4\approx1{,}6\cdot10^{-9}$. Chuẩn gradient vẫn chứng nhận một khoảng cách, nhưng với số mũ $\tfrac13$ thay cho $1$: khoảng cách lớn gấp khoảng $6000$ lần so với hàm có $\mu=1$.
:::

**Chuỗi suy luận của mục.**

1. Ví dụ 05b.4, 05b.5 chỉ ra hai nguồn tách rời giữa $e$ và $d$.
2. Cận trên bậc hai (2.1) của Bổ đề 04.18 sinh ra Bổ đề 05b.6 (bổ đề giảm) và Bổ đề 05b.7 (chuẩn gradient theo sai số giá trị).
3. H3 sinh ra Bổ đề 05b.8 (các chiều ngược lại) và Hệ quả 05b.10 (tích vô hướng với hướng tới $x^*$).
4. Bổ đề 05b.9 nối khoảng cách tại hai điểm lặp liên tiếp.
5. Mệnh đề 05b.12 ghép các bất đẳng thức tại một điểm thành chuỗi (2.5); Nhận xét 05b.13 cho phản ví dụ khi bỏ từng giả thiết.

Đích của mục là hai loại công cụ: các bất đẳng thức tại một điểm (Mệnh đề 05b.12) và đồng nhất thức giữa hai điểm (Bổ đề 05b.9).

**Kết mục.** Mục này cho chuỗi (2.5) nối ba thước đo dưới H2, H3, H4, các bổ đề thành phần của nó, và đồng nhất thức một bước (2.4). Mọi kết quả còn nói về một điểm hoặc một bước; chưa có kết quả nào về dãy sau $k$ bước. Mục 3 nối các bất đẳng thức một bước qua mọi bước, bằng tổng lồng hoặc bằng phép co, để thu các định lý hội tụ của GD.


## 3. Hội tụ của hạ gradient

Mục 2 cho các bất đẳng thức tại một điểm và một đồng nhất thức giữa hai điểm lặp, nhưng chưa có kết luận nào về dãy sau $k$ bước. Định lý 04.22 là kết luận như vậy cho GD bước $\tfrac1L$ trên hàm lồi: $f(x_k)-f^*\le LD^2/(2k)$. Trên ví dụ dẫn C, cận này bằng $70/k$ và đòi $7000$ bước cho sai số $0{,}01$, trong khi dãy thật cần $6$ bước. Định lý còn bốn thiếu hụt mà mục này lấp:

1. nó chỉ phát biểu cho bước $\tfrac1L$, trong khi trong thực hành thường chỉ biết một cận $\hat L\ge L$ và dùng bước $\tfrac1{\hat L}<\tfrac1L$; tính không tăng của $d_k$ ở Bổ đề 04.21 cũng chỉ được nêu cho bước $\tfrac1L$;
2. nó cần điểm cực tiểu, nên không nói gì về mất mát logistic của Ví dụ 05b.4, nơi $\phi(s_k)\to0$ mà $D$ không xác định;
3. phần lồi mạnh (Định lý 04.26) chặn sai số giá trị nhưng không chặn khoảng cách $d_k$;
4. trường hợp lồi mạnh với quay lui Armijo chỉ được phát biểu, chưa được chứng minh.

Mọi chứng minh dưới đây có cùng một khuôn: lập một bất đẳng thức giữa bước $k$ và bước $k+1$, rồi nối các bất đẳng thức đó qua mọi bước. Tiểu mục đầu đặt tên khuôn này.

Từ mục này, tiêu đề mỗi định lý hội tụ ghi thêm trong ngoặc một tên ngắn (T1′, T2a, …, T9). Đó là tên dùng trong bộ bài tập chính thức của bài; trên hình của chương chỉ xuất hiện T1, T2a, T2b và T5.

### 3.1 Khuôn một bước: hàm thế, tổng lồng và co

Trực giác, chưa phải định nghĩa: một chứng minh hội tụ theo dõi một đại lượng không âm, chẳng hạn bình phương khoảng cách, và chỉ ra rằng ở mỗi bước đại lượng đó giảm ít nhất một lượng có ích, hoặc co theo một hệ số nhỏ hơn $1$. Đại lượng không âm không thể giảm mãi một lượng dương, nên tổng các lượng giảm bị chặn bởi giá trị ban đầu.

![Một cột xếp chồng: bốn hiệu u₀ − u₁, u₁ − u₂, u₂ − u₃, u₃ − u₄ của một dãy giảm và phần còn lại u₄ chồng lên nhau thành một cột cao đúng bằng u₀.](img/lec-05b/telescoping-stack.svg)

Hình xếp bốn hiệu liên tiếp của một dãy giảm và phần còn lại $u_4$ thành một cột; cột cao đúng $u_0$. Hình không mang số liệu của ví dụ nào; nó minh họa phép tính $\sum_{j<4}(u_j-u_{j+1})=u_0-u_4\le u_0$, nền tảng của tổng lồng.

::: definition Định nghĩa 05b.14 (Hàm thế và bất đẳng thức một bước)
Cho một dãy lặp $(x_k)_{k\ge0}$, tất định hoặc ngẫu nhiên.

**Hàm thế.** Một hàm thế (potential function) là một dãy số $u_k\ge0$ xác định từ $x_k$, hoặc kỳ vọng của một đại lượng không âm xác định từ $x_k$. Các hàm thế của chương là $d_k^2$, $e_k$, $\Delta_k=f(x_k)-f_{\inf}$ và $a_k=\mathbb Ed_k^2$.

**Bất đẳng thức một bước.** Một bất đẳng thức một bước cho hàm thế $u_k$ là bất đẳng thức đúng với mọi $k\ge0$ có dạng

$$
u_{k+1}\le q\,u_k-v_k+r_k ,
\tag{3.1}
$$

với hệ số $q\in[0,1]$, tiến bộ (progress) $v_k\ge0$ và nhiễu $r_k\ge0$.

**Khuôn một bước.** Một chứng minh theo khuôn một bước gồm ba việc: lập (3.1) từ giả thiết, nối (3.1) qua mọi bước, và chọn bước $\eta_k$ để cận thu được nhỏ.
:::

Bổ đề 04.21 của Bài 04 là một bất đẳng thức một bước dạng (3.1): với bước $\tfrac1L$, hàm thế $u_k=d_k^2$, $q=1$, tiến bộ $v_k=\tfrac2L e_{k+1}$ và $r_k=0$.

Ba thành phần của (3.1) có vai trò khác nhau. Tiến bộ $v_k$ là đại lượng mà định lý muốn chặn, như sai số giá trị hay bình phương chuẩn gradient. Hệ số $q<1$ biểu thị phép co, xuất hiện khi có độ cong dưới. Nhiễu $r_k$ đến từ độ dài bước khi không có bổ đề giảm, hoặc từ phương sai của gradient ngẫu nhiên.

Dạng của (3.1) quyết định cách nối:

- $q=1$: cộng các bất đẳng thức, các số hạng $u_k$ ở giữa triệt tiêu từng cặp (tổng lồng, telescoping sum);
- $v_k=0$, $r_k=0$, $q<1$: nhân các hệ số (co), như Mệnh đề 05b.3(a);
- $v_k=0$, $r_k=r>0$, $q<1$: giải đệ quy co có nhiễu (Bổ đề 05b.35 ở Mục 5).

Bổ đề sau là cách nối thứ nhất, viết cho cả trường hợp có nhiễu để dùng lại ở Mục 4 đến Mục 6.

::: lemma Bổ đề 05b.15 (Tổng lồng)
**Giả thiết.** $(u_k)_{k\ge0}$ không âm, $(v_k)$ và $(r_k)$ là hai dãy số thực, $\gamma>0$, và với mọi $k\ge0$:

$$
v_k\le\gamma\,(u_k-u_{k+1})+r_k .
$$

**Kết luận.** Với mọi $K\ge1$,

$$
\sum_{k=0}^{K-1}v_k\le\gamma\,(u_0-u_K)+\sum_{k=0}^{K-1}r_k\le\gamma\,u_0+\sum_{k=0}^{K-1}r_k .
$$

**Điều kiện áp dụng.** Chỉ cần $u_K\ge0$ ở bất đẳng thức thứ hai.

**Phạm vi.** Bổ đề chặn một tổng; muốn chặn một số hạng cần thêm tính đơn điệu của $v_k$, hoặc lấy giá trị nhỏ nhất hay trung bình.
:::

::: proof Chứng minh Bổ đề 05b.15
**Bước 1 (cộng).**

Cộng $K$ bất đẳng thức với $k=0,\ldots,K-1$. Ở vế phải, $\sum_{k<K}(u_k-u_{k+1})=u_0-u_K$, vì mỗi $u_j$ với $1\le j\le K-1$ xuất hiện một lần với dấu cộng và một lần với dấu trừ.

**Bước 2 (bỏ số hạng cuối).**

$-\gamma u_K\le0$ vì $u_K\ge0$ và $\gamma>0$. $\square$
:::

Bổ đề 05b.15 biến một bất đẳng thức cho một bước thành một cận cho tổng của $K$ số hạng. Chia cho $K$ được một cận cho trung bình của $v_k$; trung bình không nhỏ hơn số hạng nhỏ nhất, và nếu $v_k$ không tăng thì nó cũng không nhỏ hơn số hạng cuối. Đó là nguồn của các tốc độ $O(1/K)$ trong chương.

### 3.2 Hội tụ dưới tuyến tính với bước hằng

Định lý sau mở rộng Định lý 04.22 và Bổ đề 04.21 theo hai hướng: bước là một hằng số bất kỳ trong $(0,\tfrac1L]$, và tính không tăng của khoảng cách, ở Bổ đề 04.21 chỉ nêu cho một bước với bước $\tfrac1L$, được phát biểu cho cả dãy với mọi bước đó. Chứng minh chỉ ra chính xác bước nào dùng giả thiết nào.

::: theorem Định lý 05b.16 (Hạ gradient bước hằng trên hàm lồi; T1′)
**Giả thiết.** $f$ thỏa H1, H2 với hằng số $L$, và H4 với điểm cực tiểu $x^*$. Điểm đầu $x_0\in\mathbb R^n$, $D=\lVert x_0-x^*\rVert$. Dãy $x_{k+1}=x_k-\eta\nabla f(x_k)$ với bước hằng $0<\eta\le\tfrac1L$.

**Kết luận.**

- (a) $f(x_{k+1})\le f(x_k)-\tfrac\eta2\lVert\nabla f(x_k)\rVert^2$ với mọi $k\ge0$.
- (b) $d_{k+1}\le d_k$ với mọi $k\ge0$.
- (c) Với mọi $k\ge1$,

$$
e_k=f(x_k)-f^*\le\frac{D^2}{2\eta k} .
\tag{3.2}
$$

**Điều kiện áp dụng.** Cần biết một cận trên của $L$ để chọn bước; $x^*$ là một điểm cực tiểu bất kỳ, không cần duy nhất.

**Phạm vi.** Với $\eta=\tfrac1L$, (c) là Định lý 04.22: $e_k\le LD^2/(2k)$. Định lý không cho tốc độ nào của $d_k$ ngoài tính không tăng.
:::

::: proof Chứng minh Định lý 05b.16
Viết $g_k=\nabla f(x_k)$.

**Bước 1 (H2: mức giảm của một bước).**

Bổ đề 05b.6 với $\eta\le\tfrac1L$ cho $f(x_{k+1})\le f(x_k)-\tfrac\eta2\lVert g_k\rVert^2$. Đây là (a); nói riêng, dãy $f(x_k)$ không tăng.

**Bước 2 (H1 và H4: so với giá trị tối ưu).**

Hệ quả 05b.10(a) tại $x_k$ cho $f(x_k)\le f^*+g_k^T(x_k-x^*)$.

**Bước 3 (đồng nhất thức, không giả thiết).**

Bổ đề 05b.9 với $x=x_k$, $g=g_k$, $z=x^*$ cho $d_{k+1}^2=d_k^2-2\eta\,g_k^T(x_k-x^*)+\eta^2\lVert g_k\rVert^2$. Chia hai vế cho $2\eta$ và chuyển vế:

$$
g_k^T(x_k-x^*)-\frac\eta2\lVert g_k\rVert^2=\frac1{2\eta}\bigl(d_k^2-d_{k+1}^2\bigr).
$$

**Bước 4 (ghép: bất đẳng thức một bước).**

Cộng Bước 1 và Bước 2 rồi thay Bước 3:

$$
\begin{aligned}
e_{k+1}=f(x_{k+1})-f^*&\le g_k^T(x_k-x^*)-\frac\eta2\lVert g_k\rVert^2\\
&=\frac1{2\eta}\bigl(d_k^2-d_{k+1}^2\bigr).
\end{aligned}
$$

Vế trái không âm, nên $d_{k+1}^2\le d_k^2$; đây là (b). Với $\eta=\tfrac1L$, bất đẳng thức này là Bổ đề 04.21.

**Bước 5 (tổng lồng và tính đơn điệu).**

Bổ đề 05b.15 với $v_j=e_{j+1}$, $u_j=d_j^2$, $\gamma=\tfrac1{2\eta}$, $r_j=0$ và $K=k$ cho $\sum_{j=1}^ke_j\le\tfrac{D^2}{2\eta}$. Theo (a), $e_j\ge e_k$ với mọi $j\le k$, nên

$$
k\,e_k\le\sum_{j=1}^ke_j\le\frac{D^2}{2\eta}.
$$

Chia cho $k$ được (3.2). $\square$
:::

Mỗi giả thiết vào chứng minh ở một chỗ xác định. H2 chỉ vào Bước 1, qua điều kiện $\eta\le\tfrac1L$ để hệ số giảm không nhỏ hơn $\tfrac\eta2$. H1 chỉ vào Bước 2. H4 cung cấp $x^*$ và $f^*$ cho Bước 2 và cho $D$.

Bước 3 là đại số thuần túy. Phép ghép ở Bước 4 cần Bước 1 và Bước 3 dùng cùng một bước $\eta$: số hạng $\tfrac\eta2\lVert g_k\rVert^2$ xuất hiện với dấu ngược nhau ở hai nơi và triệt tiêu.

So với Định lý 04.22, Định lý 05b.16 trả giá cho bước nhỏ hơn bằng hằng số: $\tfrac{D^2}{2\eta}$ lớn hơn $\tfrac{LD^2}2$ đúng $\tfrac1{L\eta}$ lần. Nó không cần hai giả thiết mà Boyd và Vandenberghe (2004, mục 9.1.2 và 9.3) đặt cho phân tích hạ gradient: lồi mạnh, kéo theo nghiệm duy nhất, và khả vi hai lần. Beck (2017, Định lý 10.21) phát biểu cùng cận cho phương pháp gradient có bước hằng trong $(0,\tfrac1L]$.

Hệ quả sau trả lời thiếu hụt thứ hai: khi bỏ H4, Bước 2 vẫn viết được với một điểm so sánh bất kỳ thay cho $x^*$.

::: corollary Hệ quả 05b.17 (Hội tụ theo giá trị khi không có điểm cực tiểu)
**Giả thiết.** $f$ thỏa H1 và H2; dãy GD với bước hằng $0<\eta\le\tfrac1L$ từ $x_0$.

**Kết luận.** Với mọi $z\in\mathbb R^n$ và mọi $k\ge1$,

$$
f(x_k)-f(z)\le\frac{\lVert x_0-z\rVert^2}{2\eta k}.
\tag{3.3}
$$

Do đó $f(x_k)\to f_{\inf}$, kể cả khi $f_{\inf}$ không được đạt.

**Điều kiện áp dụng.** Không cần H4; nếu $f_{\inf}=-\infty$ thì $f(x_k)\to-\infty$.

**Phạm vi.** Không có kết luận nào về khoảng cách; dãy lặp có thể chạy ra vô cùng.
:::

::: proof Chứng minh Hệ quả 05b.17
**Bước 1 (bất đẳng thức một bước với điểm so sánh $z$).**

H1 tại $x_k$ với điểm so sánh $z$ cho $f(x_k)\le f(z)+g_k^T(x_k-z)$. Lặp lại Bước 1, 3, 4 của chứng minh Định lý 05b.16 với $z$ thay cho $x^*$:

$$
f(x_{k+1})-f(z)\le\frac1{2\eta}\Bigl(\lVert x_k-z\rVert^2-\lVert x_{k+1}-z\rVert^2\Bigr).
$$

Vế trái có thể âm; Bổ đề 05b.15 không cần dấu của $v_k$.

**Bước 2 (tổng lồng và tính đơn điệu).**

Bổ đề 05b.15 với $u_j=\lVert x_j-z\rVert^2$ cho $\sum_{j=1}^k\bigl(f(x_j)-f(z)\bigr)\le\tfrac{\lVert x_0-z\rVert^2}{2\eta}$. Theo Định lý 05b.16(a), chỉ dùng H2, $f(x_k)\le f(x_j)$ với $j\le k$, nên vế trái không nhỏ hơn $k\bigl(f(x_k)-f(z)\bigr)$. Đây là (3.3).

**Bước 3 (giới hạn).**

Cố định $z$; (3.3) cho $\limsup_kf(x_k)\le f(z)$. Vì $z$ tùy ý, $\limsup_kf(x_k)\le\inf_zf(z)=f_{\inf}$. Mặt khác $f(x_k)\ge f_{\inf}$ với mọi $k$. Vậy $f(x_k)\to f_{\inf}$. $\square$
:::

::: example Ví dụ 05b.8 (Bước $\tfrac1{10}$ trên ví dụ dẫn C)
**Dữ kiện.**

$f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$, $L=7$, $x^*=0$, $f^*=0$, $x_0=(2,4)$, $D^2=20$. GD bước $\eta=\tfrac1{10}$. Định lý 05b.16: khi $0<\eta\le\tfrac1L$, $e_k\le\tfrac{D^2}{2\eta k}$ và $d_{k+1}\le d_k$.

**Kiểm giả thiết.**

H1, H2, H4 đúng (Ví dụ 05b.3); $\tfrac1{10}\le\tfrac17$.

**Cận.**

$\tfrac{D^2}{2\eta k}=\tfrac{20}{0{,}2k}=\tfrac{100}k$; cận đạt $0{,}01$ khi $k\ge10\,000$.

**Giá trị thật.**

Hai tọa độ nhân với $1-\tfrac3{10}=0{,}7$ và $1-\tfrac7{10}=0{,}3$, nên $x_k=(2\cdot0{,}7^k,\ 4\cdot0{,}3^k)$ và

$$
e_k=6\cdot0{,}49^k+56\cdot0{,}09^k,\qquad d_k^2=4\cdot0{,}49^k+16\cdot0{,}09^k .
$$

Các giá trị: $e_1=7{,}98$, $e_8\approx0{,}0199$, $e_9\approx0{,}00977$; vậy $9$ bước đủ để $e_k\le0{,}01$. Dãy $d_k^2$ là $20$; $3{,}4$; $1{,}09$; $0{,}482$; …, giảm như (b) khẳng định.

**Kiểm tra lại.**

$e_1=\tfrac12\bigl(3\cdot1{,}4^2+7\cdot1{,}2^2\bigr)$, tức $\tfrac12(5{,}88+10{,}08)=7{,}98$, khớp $6\cdot0{,}49+56\cdot0{,}09$. Với bước $\tfrac17$ (Ví dụ 05b.1), dãy cần $6$ bước và cận cần $7000$; bước nhỏ hơn làm cả cận lẫn dãy thật chậm đi.
:::

**Trong học máy.** Định lý 05b.16 áp dụng cho hồi quy tuyến tính và hồi quy logistic có điểm cực tiểu; bước $\tfrac1{\hat L}$ với một cận $\hat L\ge L$ luôn an toàn, chẳng hạn cận theo giá trị riêng lớn nhất của ma trận đặc trưng trong Nhận xét 04.19, với giá là hằng số của cận lớn hơn $\hat L/L$ lần. Hệ quả 05b.17 giải thích hồi quy logistic trên dữ liệu tách được: mất mát huấn luyện vẫn giảm về $0$ dù chuẩn trọng số tăng không giới hạn; một tiêu chí dừng theo giá trị mất mát sẽ dừng, nhưng trọng số thu được phụ thuộc thời điểm dừng.

### 3.3 Hội tụ tuyến tính khi có độ cong dưới

Định lý 05b.16 đúng cho cả hàm $[x]_1^2$ trên $\mathbb R^2$, nơi mọi điểm $(0,\upsilon)$ là điểm cực tiểu, nên cận của nó không thể chứa $\mu$. Khi H3 đúng, Hệ quả 05b.10(b) cho cận dưới bậc hai cho tích vô hướng, và bất đẳng thức một bước trở thành một phép co.

::: theorem Định lý 05b.18 (Hạ gradient bước $\tfrac1L$ trên hàm lồi mạnh; T2a, T2b)
**Giả thiết.** $f$ thỏa H2 với hằng số $L$ và H3 với hằng số $\mu$; $x^*$ là điểm cực tiểu duy nhất (có theo H3), $D=\lVert x_0-x^*\rVert$, $e_0=f(x_0)-f^*$, $\kappa=L/\mu$. Dãy $x_{k+1}=x_k-\tfrac1L\nabla f(x_k)$.

**Kết luận.** Với mọi $k\ge0$,

$$
\text{(a)}\quad d_k^2\le\Bigl(1-\frac1\kappa\Bigr)^kD^2,\qquad
\text{(b)}\quad e_k\le\Bigl(1-\frac1\kappa\Bigr)^ke_0 .
\tag{3.4}
$$

**Điều kiện áp dụng.** Hệ số $q=1-\tfrac1\kappa\in[0,1)$ vì $\mu\le L$; khi $\mu=L$ thì $q=0$ và một bước đã tới nghiệm.

**Phạm vi.** Phần (b) là Định lý 04.26. Bước phải bằng đúng $\tfrac1L$ trong chứng minh phần (a) dưới đây; với bước $\eta\le\tfrac1L$ khác, cùng lập luận cho hệ số $1-\eta\mu$ (Định lý 05b.36 với $\sigma=0$).
:::

::: proof Chứng minh Định lý 05b.18
Viết $g_k=\nabla f(x_k)$.

**Bước 1 (phần a: đồng nhất thức).**

Bổ đề 05b.9 với $\eta=\tfrac1L$, $z=x^*$: $d_{k+1}^2=d_k^2-\tfrac2L\,g_k^T(x_k-x^*)+\tfrac1{L^2}\lVert g_k\rVert^2$.

**Bước 2 (phần a: H3 chặn tích vô hướng).**

Hệ quả 05b.10(b): $g_k^T(x_k-x^*)\ge e_k+\tfrac\mu2d_k^2$.

**Bước 3 (phần a: H2 chặn chuẩn gradient).**

Bổ đề 05b.7 với $f_{\inf}=f^*$: $\lVert g_k\rVert^2\le2Le_k$.

**Bước 4 (phần a: ghép).**

$$
\begin{aligned}
d_{k+1}^2&\le d_k^2-\frac2L\Bigl(e_k+\frac\mu2d_k^2\Bigr)+\frac{2Le_k}{L^2}\\
&=\Bigl(1-\frac\mu L\Bigr)d_k^2 .
\end{aligned}
$$

Dòng đầu thay Bước 2 và Bước 3 vào Bước 1; ở dòng sau, $-\tfrac2Le_k$ và $+\tfrac2Le_k$ triệt tiêu. Mệnh đề 05b.3(a) với $q=1-\tfrac\mu L\ge0$ cho (a).

**Bước 5 (phần b).**

Bổ đề 05b.6 với $\eta=\tfrac1L$ rồi Bổ đề 05b.8(b), viết thành $\lVert g_k\rVert^2\ge2\mu e_k$:

$$
\begin{aligned}
e_{k+1}&\le e_k-\frac1{2L}\lVert g_k\rVert^2\\
&\le\Bigl(1-\frac\mu L\Bigr)e_k .
\end{aligned}
$$

Mệnh đề 05b.3(a) cho (b). $\square$
:::

Định lý 05b.18 đổi tốc độ $O(1/k)$ của Định lý 05b.16 thành tốc độ tuyến tính bằng cách thêm H3; cái giá là cận phụ thuộc số điều kiện $\kappa$. Theo Mệnh đề 05b.3(c), $k\ge\kappa\log(D^2/\varepsilon)$ bước đủ để $d_k^2\le\varepsilon$, và $k\ge\kappa\log(e_0/\varepsilon)$ bước đủ để $e_k\le\varepsilon$. Phần (a) lấp thiếu hụt thứ ba: nó chặn chính dãy lặp, không chỉ giá trị.

Hai phần dùng H3 khác nhau. Phần (b) chỉ cần bất đẳng thức $\lVert\nabla f\rVert^2\ge2\mu e$ của Bổ đề 05b.8(b); Mục 6.5 lấy chính bất đẳng thức này làm giả thiết cho hàm không lồi. Phần (a) cần cả cận dưới bậc hai của tích vô hướng, tức H3 đầy đủ.

Boyd và Vandenberghe (2004, mục 9.3.1, tr. 466–467) chứng minh phần (b) cho bước tìm chính xác bằng cùng hai bất đẳng thức, dẫn tới công thức (9.18) của họ.

**Trong học máy.** Với hồi quy logistic có chính quy hóa $\tfrac\nu2\lVert x\rVert^2$ trên $N$ quan sát có vectơ đặc trưng $c_i\in\mathbb R^n$, H3 đúng với $\mu=\nu$ và H2 đúng với $L=\nu+\tfrac1{4N}\lambda_{\max}\bigl(\sum_ic_ic_i^T\bigr)$, trong đó $\lambda_{\max}$ là giá trị riêng lớn nhất, nên $\kappa$ tăng khi $\nu$ giảm hoặc khi đặc trưng có thang đo lớn. Định lý 05b.18 vì vậy giải thích hai thực hành: chuẩn hóa thang đo của đặc trưng trước khi huấn luyện, và chọn $\nu$ không quá nhỏ khi cần hội tụ nhanh. Tình huống 05b.1 tính các hằng số này cho một bộ dữ liệu cụ thể.

::: example Ví dụ 05b.9 (Ba cận và giá trị thật trên ví dụ dẫn C)
**Dữ kiện.**

$f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$, $L=7$, $\mu=3$, $\kappa=\tfrac73$, $x_0=(2,4)$, $D^2=20$, $e_0=62$. GD bước $\tfrac17$ cho $e_k=6(\tfrac{16}{49})^k$ và $d_k^2=4(\tfrac{16}{49})^k$ với $k\ge1$ (Ví dụ 05b.1). Ba cận: Định lý 05b.16 với $\eta=\tfrac17$ cho $e_k\le\tfrac{70}k$; Định lý 05b.18 cho $e_k\le62(\tfrac47)^k$ và $d_k^2\le20(\tfrac47)^k$.

**Bảng.**

| $k$ | $70/k$ | $62(4/7)^k$ | $e_k$ thật | $20(4/7)^k$ | $d_k^2$ thật |
|---:|---:|---:|---:|---:|---:|
| $1$ | $70$ | $35{,}4$ | $1{,}96$ | $11{,}4$ | $1{,}31$ |
| $5$ | $14$ | $3{,}78$ | $0{,}0223$ | $1{,}22$ | $0{,}0149$ |
| $10$ | $7$ | $0{,}230$ | $8{,}27\cdot10^{-5}$ | $0{,}0742$ | $5{,}51\cdot10^{-5}$ |

**Số bước để đạt $0{,}01$.**

- Cận $70/k$: $k\ge7000$.
- Cận $62(\tfrac47)^k$: $k\ge\log6200/\log\tfrac74\approx15{,}6$, tức $16$ bước.
- Cận $20(\tfrac47)^k$ cho $d_k^2$: $k\ge\log2000/\log\tfrac74\approx13{,}6$, tức $14$ bước.
- Giá trị thật: $6(\tfrac{16}{49})^k\le0{,}01$ khi $k\ge\log600/\log\tfrac{49}{16}\approx5{,}7$, tức $6$ bước; $d_k^2$ cũng xuống dưới $0{,}01$ từ $k=6$.

**Kiểm tra lại.**

$e_5\approx0{,}0223>0{,}01$ và $e_6\approx0{,}0073\le0{,}01$. $62(\tfrac47)^{15}\approx0{,}0140$ và $62(\tfrac47)^{16}\approx0{,}0080$.
:::

![Đồ thị trục tung logarit từ 10⁻⁸ đến 100, k từ 0 đến 16, có vạch ngang tại 0,01. Cận 70/k (T1) giảm chậm ở phía trên; hai cận tuyến tính 62·(4/7)^k (T2b) và 20·(4/7)^k (T2a) là hai đường thẳng; vòng tròn là sai số giá trị thật và ô vuông là bình phương khoảng cách thật, giảm theo đường dốc hơn nhiều.](img/lec-05b/vdc-three-bounds.svg)

Hình đặt các cột của bảng trên cùng trục logarit. Nhãn trên hình theo tên quen thuộc: T1 là Định lý 05b.16 với $\eta=\tfrac1L$, tức Định lý 04.22; T2a và T2b là hai phần (a), (b) của Định lý 05b.18. Hai cận tuyến tính là hai đường thẳng có cùng độ dốc $\log\tfrac47$; hai dãy thật cũng thẳng nhưng dốc gấp đôi, độ dốc $\log\tfrac{16}{49}=2\log\tfrac47$.

::: remark Nhận xét 05b.19 (Hệ số co thật và hệ số co của cận trên ví dụ dẫn C)
Một cận đúng cho mọi hàm của lớp thỏa H2, H3 với cùng $L$, $\mu$, nên có thể bi quan trên một hàm cụ thể. Trên ví dụ dẫn C, sau bước đầu chỉ còn tọa độ có độ cong $\mu=3$. Theo hướng đó, các bất đẳng thức của chứng minh Định lý 05b.18(a) có dạng chính xác $e=\tfrac\mu2d^2$, $g^T(x-x^*)=\mu d^2$ và $\lVert g\rVert^2=\mu^2d^2=2\mu e$, nhỏ hơn cận $2Le$ của Bước 3. Thay các đẳng thức này vào Bước 1 được

$$
d_{k+1}^2=\Bigl(1-\frac{2\mu}L+\frac{\mu^2}{L^2}\Bigr)d_k^2=\Bigl(1-\frac\mu L\Bigr)^2d_k^2,
$$

tức hệ số $(\tfrac47)^2=\tfrac{16}{49}$. Chứng minh đánh mất một thừa số $1-\tfrac\mu L$ ở Bước 3, nơi chuẩn gradient theo hướng phẳng được chặn bằng độ cong của hướng cong nhất. Với hàm bậc hai, tồn tại bước hằng cho hệ số co của khoảng cách tốt hơn $1-\tfrac\mu L$; việc tìm bước đó là một bài của bộ bài tập chính thức.
:::

### 3.4 Hội tụ tuyến tính với quay lui Armijo

Định lý 05b.16 và 05b.18 đều cần biết $L$ để đặt bước. Với một mất mát cụ thể, $L$ thường chỉ có cận thô; quay lui Armijo (Định nghĩa 04.10) tìm bước tại mỗi lần lặp chỉ bằng giá trị của $f$. Bài 04 chứng minh tốc độ $O(1/k)$ cho quay lui (Định lý 04.24) và chỉ phát biểu trường hợp lồi mạnh; định lý sau chứng minh trường hợp đó.

::: theorem Định lý 05b.20 (Quay lui Armijo trên hàm lồi mạnh; T2′)
**Giả thiết.** $f$ thỏa H2 với hằng số $L$ và H3 với hằng số $\mu$; $e_0=f(x_0)-f^*$. Tham số $\alpha\in(0,\tfrac12]$, $\beta\in(0,1)$. Dãy $x_{k+1}=x_k-t_k\nabla f(x_k)$, trong đó $t_k$ là số đầu tiên trong dãy $1,\beta,\beta^2,\ldots$ thỏa

$$
f\bigl(x_k-t\nabla f(x_k)\bigr)\le f(x_k)-\alpha t\lVert\nabla f(x_k)\rVert^2 .
$$

**Kết luận.** Với mọi $k\ge0$, $e_k\le q_{\rm A}^k\,e_0$, trong đó

$$
q_{\rm A}=1-\min\Bigl\{2\mu\alpha,\ \frac{2\beta\alpha\mu}L\Bigr\}\in\Bigl(1-\frac\mu L,\ 1\Bigr).
\tag{3.5}
$$

**Điều kiện áp dụng.** Thuật toán không dùng $L$; hằng số $L$ chỉ xuất hiện trong cận.

**Phạm vi.** Hệ số $q_{\rm A}$ luôn lớn hơn hệ số $1-\tfrac\mu L$ của Định lý 05b.18(b): cận kém hơn, đổi lại không cần biết $L$. Định lý không chặn $d_k$.
:::

::: proof Chứng minh Định lý 05b.20
Viết $g_k=\nabla f(x_k)$ và $t_{\min}=\min\{1,\beta/L\}$.

**Bước 1 (chặn dưới của bước được nhận).**

Bổ đề 04.23, đúng với $\alpha\in(0,\tfrac12]$, cho $t_k\ge t_{\min}$; lập luận của nó là: mọi $t\le\tfrac1L$ thỏa điều kiện Armijo theo Bổ đề 05b.6, nên nếu $t_k<1$ thì bước thử trước đó $t_k/\beta$ đã bị loại, tức $t_k/\beta>\tfrac1L$.

**Bước 2 (mức giảm bảo đảm).**

Điều kiện Armijo tại bước được nhận và Bước 1 cho

$$
f(x_{k+1})\le f(x_k)-\alpha t_k\lVert g_k\rVert^2\le f(x_k)-\alpha\,t_{\min}\lVert g_k\rVert^2 .
$$

**Bước 3 (H3: chuẩn gradient theo sai số giá trị).**

Bổ đề 05b.8(b) cho $\lVert g_k\rVert^2\ge2\mu e_k$. Trừ $f^*$ hai vế của Bước 2:

$$
\begin{aligned}
e_{k+1}&\le e_k-2\mu\alpha\,t_{\min}\,e_k\\
&=\Bigl(1-\min\Bigl\{2\mu\alpha,\ \frac{2\beta\alpha\mu}L\Bigr\}\Bigr)e_k=q_{\rm A}\,e_k .
\end{aligned}
$$

**Bước 4 (khoảng của hệ số).**

Vì $\alpha\le\tfrac12$ và $\beta<1$, có $2\alpha\beta<1$, nên

$$
\begin{aligned}
\min\Bigl\{2\mu\alpha,\ \frac{2\beta\alpha\mu}L\Bigr\}&\le\frac{2\beta\alpha\mu}L\\
&<\frac\mu L\\
&\le1 .
\end{aligned}
$$

Do đó $q_{\rm A}\in(1-\tfrac\mu L,1)$, và $q_{\rm A}\ge0$. Mệnh đề 05b.3(a) cho kết luận. $\square$
:::

Lập luận theo Boyd và Vandenberghe (2004, mục 9.3.1, tr. 468), với $m$, $M$ của họ là $\mu$, $L$ ở đây.

Họ đặt H2, H3 chỉ trên tập mức ban đầu $\{x:f(x)\le f(x_0)\}$; phiên bản đó cần thêm một lập luận rằng các điểm thử của quay lui không rời tập mức, và ghi chú không trình bày. So với Định lý 05b.18(b), bước $\tfrac1L$ được thay bằng một bước tìm được, và hệ số co nhận thêm thừa số $2\alpha t_{\min}L\le1$.

::: example Ví dụ 05b.10 (Quay lui với $\alpha=\beta=\tfrac12$ trên ví dụ dẫn C)
**Dữ kiện.**

$f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$, $L=7$, $\mu=3$, $x_0=(2,4)$, $e_0=62$. Quay lui với $\alpha=\beta=\tfrac12$: thử $t=1,\tfrac12,\tfrac14,\ldots$ và nhận bước đầu tiên thỏa $f(x_k-tg_k)\le f(x_k)-\tfrac t2\lVert g_k\rVert^2$. Định lý 05b.20: $e_k\le q_{\rm A}^ke_0$ với $q_{\rm A}=1-\min\{2\mu\alpha,2\beta\alpha\mu/L\}$.

**Hệ số và số bước của cận.**

$2\mu\alpha=3$ và $\tfrac{2\beta\alpha\mu}L=\tfrac{3}{14}$, nên $q_{\rm A}=\tfrac{11}{14}\approx0{,}786$. Cận $62(\tfrac{11}{14})^k\le0{,}01$ khi $k\ge\log6200/\log\tfrac{14}{11}\approx36{,}2$, tức $37$ bước.

**Chạy thật.**

Bước đầu: $\lVert g_0\rVert^2=820$; ba bước thử $t=1,\tfrac12,\tfrac14$ bị loại, $t_0=\tfrac18$ được nhận, cho $x_1=(\tfrac54,\tfrac12)$ và $f(x_1)=\tfrac{103}{32}\approx3{,}22$. Bốn bước đầu nhận $t_k=\tfrac18,\tfrac18,\tfrac14,\tfrac14$, với $e_1\approx3{,}22$, $e_2\approx0{,}929$, $e_3\approx0{,}0649$, $e_4\approx0{,}0079$. Vậy $4$ bước đủ để $e_k\le0{,}01$.

**Kiểm tra lại.**

Với $t=\tfrac14$ tại $x_0$: điểm thử $(\tfrac12,-3)$ có $f=\tfrac12(\tfrac34+63)=\tfrac{255}8$, lớn hơn ngưỡng $62-\tfrac18\cdot820=-40{,}5$, nên bị loại. Với $t=\tfrac18$: ngưỡng $62-\tfrac1{16}\cdot820=10{,}75\ge3{,}22$, được nhận. Mỗi bước nhận được đều $\ge t_{\min}=\tfrac1{14}$, khớp Bước 1 của chứng minh.
:::

Cận quay lui đòi $37$ bước, cận bước $\tfrac1L$ đòi $16$, còn dãy quay lui thật chỉ cần $4$ bước, ít hơn cả $6$ bước của bước $\tfrac17$. Định lý so sánh các bảo đảm, không so sánh các dãy thật: quay lui có thể nhận bước dài hơn $\tfrac1L$ khi hàm cho phép, như $t=\tfrac14>\tfrac17$ ở bước thứ ba.

**Trong học máy.** Quay lui cần giá trị $f$ tại các điểm thử, tức một lượt qua toàn bộ dữ liệu cho mỗi lần thử. Vì vậy nó dùng được trong tối ưu theo cả tập (full-batch), như L-BFGS của Bài 06, nhưng không dùng trong SGD.

Ba định lý của mục này đều cần H2. Mất mát bản lề (hinge loss) $\max\{0,1-ys\}$, với nhãn $y\in\{-1,1\}$ và điểm số $s$, và mất mát trị tuyệt đối có điểm gãy, nơi đạo hàm nhảy, nên không có hằng số $L$ hữu hạn và các định lý này không áp dụng.

::: exercise Bài tập 05b.3 (Bước nằm giữa $\tfrac1L$ và $\tfrac2L$)
Chạy GD trên ví dụ dẫn C, $f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$, từ $x_0=(2,4)$ với bước hằng $\eta=\tfrac14$.

- (a) Chỉ ra Định lý 05b.16 không áp dụng, còn Bổ đề 05b.6 vẫn bảo đảm $f$ giảm ở mỗi bước; tính hệ số giảm.
- (b) Tính $x_k$, $e_k$ dưới dạng đóng và tìm $k$ nhỏ nhất để $e_k\le0{,}01$.
- (c) Kiểm $d_{k+1}\le d_k$ có còn đúng với mọi $k$ hay không.
:::

::: hint Gợi ý Bài tập 05b.3
Hai tọa độ nhân với $1-3\eta$ và $1-7\eta$. Ở (c), viết $d_k^2$ dưới dạng tổng hai cấp số nhân.
:::

::: solution Lời giải Bài tập 05b.3
**Câu (a).**

$L=7$, nên $\eta=\tfrac14>\tfrac17$ vi phạm điều kiện $\eta\le\tfrac1L$ của Định lý 05b.16. Vì $\tfrac14<\tfrac27$, Bổ đề 05b.6 cho $f(x_{k+1})\le f(x_k)-\tfrac14(1-\tfrac78)\lVert\nabla f(x_k)\rVert^2=f(x_k)-\tfrac1{32}\lVert\nabla f(x_k)\rVert^2$.

**Câu (b).**

$1-\tfrac34=\tfrac14$ và $1-\tfrac74=-\tfrac34$, nên $x_k=\bigl(2(\tfrac14)^k,\ 4(-\tfrac34)^k\bigr)$ và

$$
e_k=\tfrac12\Bigl(3\cdot4\cdot\bigl(\tfrac1{16}\bigr)^k+7\cdot16\cdot\bigl(\tfrac9{16}\bigr)^k\Bigr)=6\Bigl(\frac1{16}\Bigr)^k+56\Bigl(\frac9{16}\Bigr)^k .
$$

Số hạng thứ hai chi phối: $56(\tfrac9{16})^k\le0{,}01$ khi $k\ge\log5600/\log\tfrac{16}9\approx15{,}0$. Tính trực tiếp $e_{15}\approx0{,}010001>0{,}01$ và $e_{16}\approx0{,}00563$, nên $k=16$.

**Câu (c).**

$d_k^2=4(\tfrac1{16})^k+16(\tfrac9{16})^k$ là tổng hai dãy giảm, nên giảm với mọi $k$: $20$; $9{,}25$; $5{,}08$; …

**Kiểm tra lại.**

$e_1=\tfrac6{16}+56\cdot\tfrac9{16}=31{,}875$; tính trực tiếp tại $x_1=(\tfrac12,-3)$: $\tfrac12(\tfrac34+63)=31{,}875$. Bước $\tfrac14$ chậm hơn bước $\tfrac17$ ($16$ so với $6$ bước) vì tọa độ thứ hai đổi dấu và chỉ co với hệ số $\tfrac34$. Điều kiện $\eta\le\tfrac1L$ của định lý là đủ, không cần: dãy vẫn hội tụ với $\eta=\tfrac14$, nhưng định lý không cho cận.
:::

**Chuỗi suy luận của mục.**

1. Định nghĩa 05b.14 gọi tên hàm thế và bất đẳng thức một bước; Bổ đề 05b.15 và Mệnh đề 05b.3(a) là hai cách nối.
2. Bổ đề 05b.6, Hệ quả 05b.10(a) và Bổ đề 05b.9 ghép thành bất đẳng thức một bước $e_{k+1}\le\tfrac1{2\eta}(d_k^2-d_{k+1}^2)$; tổng lồng cho Định lý 05b.16 và Hệ quả 05b.17.
3. Hệ quả 05b.10(b) và Bổ đề 05b.7 đổi bất đẳng thức một bước thành phép co $d_{k+1}^2\le(1-\tfrac\mu L)d_k^2$; phép co cho Định lý 05b.18.
4. Bổ đề 04.23 và Bổ đề 05b.8(b) cho phép co của quay lui, Định lý 05b.20.

Đích của mục là ba định lý hội tụ của GD, mỗi định lý kèm vị trí sử dụng từng giả thiết.

**Kết mục.** Mục này cho cận $O(1/k)$ với mọi bước hằng $\eta\le\tfrac1L$ (Định lý 05b.16), hội tụ theo giá trị khi không có điểm cực tiểu (Hệ quả 05b.17), và hai cận tuyến tính, cho bước $\tfrac1L$ và cho quay lui (Định lý 05b.18, 05b.20). Cả ba định lý cần H2, qua bổ đề giảm, và không áp dụng cho mất mát có điểm gãy. Mục 4 thay gradient bằng dưới gradient; khi đó bổ đề giảm mất, nhưng đồng nhất thức một bước và Hệ quả 05b.10(a) vẫn còn, và chúng đủ cho một cận hội tụ.


## 4. Dưới gradient và trung bình lặp

Ba định lý của Mục 3 cần H2 qua bổ đề giảm. Trên ví dụ dẫn B dưới đây, độ dốc nhảy từ $-\tfrac13$ sang $\tfrac13$ ngay tại nghiệm, nên không có hằng số $L$ nào. Mất mát trị tuyệt đối và mất mát bản lề có điểm gãy, nơi đạo hàm nhảy, nên không có hằng số $L$ và không có bổ đề giảm. Mục này giữ lại hai công cụ không dùng H2, đồng nhất thức một bước (Bổ đề 05b.9) và cận dưới cho tích vô hướng (Hệ quả 05b.10(a)), thay gradient bằng một vectơ có cùng tính chất cận dưới, và thu một cận hội tụ cho lặp tốt nhất và cho trung bình các điểm lặp.

### 4.1 Nhu cầu: mất mát trị tuyệt đối

Ví dụ sau giữ nguyên dữ liệu của ví dụ dẫn A và chỉ đổi mất mát bình phương thành trị tuyệt đối.

::: example Ví dụ 05b.11 (Ví dụ dẫn B: mất mát trị tuyệt đối không có hằng số $L$)
**Dữ kiện.**

Ba quan sát $y=(-1,1,3)$ và mất mát trung bình

$$
f(x)=\tfrac13\bigl(\lvert x+1\rvert+\lvert x-1\rvert+\lvert x-3\rvert\bigr),\qquad x\in\mathbb R .
$$

**Hình dạng.**

Trên mỗi khoảng giữa hai quan sát, $f$ là hàm bậc nhất. Độ dốc bằng $\tfrac13$ nhân với số quan sát nằm bên trái $x$ trừ số quan sát nằm bên phải:

| Khoảng | $(-\infty,-1)$ | $(-1,1)$ | $(1,3)$ | $(3,\infty)$ |
|---|---:|---:|---:|---:|
| Độ dốc | $-1$ | $-\tfrac13$ | $\tfrac13$ | $1$ |

Độ dốc đổi dấu tại $x=1$, nên $x^*=1$, trung vị của ba quan sát, và $f^*=\tfrac13(2+0+2)=\tfrac43$.

**Giả thiết.**

$f$ lồi vì là tổng các hàm lồi $\lvert x-y_i\rvert$ nhân với $\tfrac13$ (Định lý 01.31). $f$ đạt cực tiểu, nên thỏa H4. H2 sai: với $x<1<x'$, $\lvert f'(x)-f'(x')\rvert\ge\tfrac23$ khi $x,x'$ gần $1$, nên tỉ số $\lvert f'(x)-f'(x')\rvert/\lvert x-x'\rvert$ không bị chặn khi $x,x'\to1$.

**Kiểm tra lại.**

$f(0)=\tfrac13(1+1+3)=\tfrac53$ và $f(1{,}5)=\tfrac13(2{,}5+0{,}5+1{,}5)=\tfrac32$, cả hai lớn hơn $\tfrac43$. Từ $0$ tới $1$ hàm giảm $\tfrac13$, khớp độ dốc $-\tfrac13$ trên $(-1,1)$.
:::

![Hai đồ thị theo x từ −2 đến 4. Nét liền là mất mát trị tuyệt đối trung bình của Ví dụ B, gãy khúc tại −1, 1, 3 (hai điểm gãy được ghi chú); nét đứt là mất mát bình phương trung bình của Ví dụ A, trơn. Cả hai đạt cực tiểu 4/3 tại x = 1.](img/lec-05b/vdb-objective.svg)

Hình đặt mất mát trị tuyệt đối của ví dụ dẫn B cạnh mất mát bình phương của ví dụ dẫn A. Hai hàm có cùng điểm cực tiểu $1$ và cùng giá trị tối ưu $\tfrac43$ với dữ liệu này, nhưng hàm thứ nhất có góc nhọn tại cực tiểu. Tại góc đó gradient không tồn tại, và gần góc đó gradient không nhỏ đi: độ dốc giữ nguyên $\pm\tfrac13$ đến tận nghiệm. Hồi quy độ lệch tuyệt đối nhỏ nhất (least absolute deviations) và máy vectơ tựa (support vector machine, SVM) với mất mát bản lề có cùng cấu trúc.

### 4.2 Dưới gradient

Trực giác, chưa phải định nghĩa: tại điểm gãy $x=1$ của ví dụ dẫn B, không có tiếp tuyến duy nhất, nhưng có cả một chùm đường thẳng đi qua $(1,\tfrac43)$ và nằm dưới đồ thị. Độ dốc của mỗi đường trong chùm đóng vai gradient trong bất đẳng thức của H1.

![Đồ thị Ví dụ B gần x = 1, với x từ 0 đến 2. Ba đường thẳng qua điểm (1, 4/3) có độ dốc 1/3, 0 và −1/3 nằm dưới đồ thị; đường độ dốc 0,6 (ghi chú: không tựa) cắt đồ thị.](img/lec-05b/subgradient-supporting-lines.svg)

Hình vẽ ba đường tựa độ dốc $\tfrac13$, $0$, $-\tfrac13$ và một đường độ dốc $0{,}6$. Đường $\tfrac43+s(x-1)$ nằm dưới đồ thị khi và chỉ khi $s$ không vượt độ dốc bên phải $\tfrac13$ và không nhỏ hơn độ dốc bên trái $-\tfrac13$. Đường độ dốc $0{,}6$ cho giá trị $\tfrac43+0{,}6\approx1{,}93$ tại $x=2$, lớn hơn $f(2)=\tfrac53$, nên cắt đồ thị.

::: definition Định nghĩa 05b.21 (Dưới gradient và dưới vi phân)
Cho $f:\mathbb R^n\to\mathbb R$ lồi (Định nghĩa 01.22) và $x\in\mathbb R^n$.

**Dưới gradient.** Vectơ $g\in\mathbb R^n$ là một dưới gradient (subgradient) của $f$ tại $x$ nếu

$$
f(z)\ge f(x)+g^T(z-x)\qquad\forall z\in\mathbb R^n .
\tag{4.1}
$$

**Dưới vi phân.** Tập mọi dưới gradient của $f$ tại $x$ là dưới vi phân (subdifferential) của $f$ tại $x$, ký hiệu $\partial f(x)$.
:::

Bất đẳng thức (4.1) là bất đẳng thức của H1 với $\nabla f(x)$ thay bằng $g$: hàm affine $z\mapsto f(x)+g^T(z-x)$ bằng $f$ tại $x$ và nằm dưới $f$ ở mọi nơi. Theo Định lý 01.26, nếu $f$ lồi và khả vi thì $\nabla f(x)$ là một dưới gradient; dưới gradient tổng quát hóa gradient sang hàm lồi có điểm gãy. Với $f(x)=\lvert x\rvert$, (4.1) tại $x=0$ là $\lvert z\rvert\ge gz$ với mọi $z$, đúng khi và chỉ khi $g\in[-1,1]$, nên $\partial\lvert\cdot\rvert(0)=[-1,1]$. Một phản ví dụ: tại $x=1$ của ví dụ dẫn B, $g=0{,}6$ không là dưới gradient vì đường tương ứng cắt đồ thị.

Mệnh đề sau gom bốn tính chất được dùng trong mục; hai tính chất đầu được chứng minh, hai tính chất sau được dẫn.

::: proposition Mệnh đề 05b.22 (Tính chất của dưới vi phân)
**Giả thiết.** $f,f_1,f_2:\mathbb R^n\to\mathbb R$ lồi.

**Kết luận.**

- (a) Nếu $f$ khả vi trên $\mathbb R^n$ thì $\partial f(x)=\{\nabla f(x)\}$ với mọi $x$.
- (b) $0\in\partial f(x^*)$ khi và chỉ khi $x^*$ là điểm cực tiểu của $f$.
- (c) $\partial f(x)$ là tập lồi, đóng, bị chặn và khác rỗng với mọi $x$.
- (d) $\partial(f_1+f_2)(x)=\partial f_1(x)+\partial f_2(x)=\{g_1+g_2:\ g_1\in\partial f_1(x),\ g_2\in\partial f_2(x)\}$, và $\partial(cf)(x)=c\,\partial f(x)$ với $c>0$.

**Điều kiện áp dụng.** Hàm lồi nhận giá trị hữu hạn trên toàn $\mathbb R^n$.

**Phạm vi.** Phần (c), (d) được phát biểu không chứng minh; chứng minh dùng định lý tách tập lồi, nằm ngoài phạm vi học phần (Rockafellar 1970, Định lý 23.4, tr. 217 và Định lý 23.8, tr. 223).
:::

::: proof Chứng minh Mệnh đề 05b.22
**Bước 1 (phần a, gradient là dưới gradient).**

Định lý 01.26 cho $f(z)\ge f(x)+\nabla f(x)^T(z-x)$ với mọi $z$, tức $\nabla f(x)\in\partial f(x)$.

**Bước 2 (phần a, không có dưới gradient khác).**

Giả sử $g\in\partial f(x)$. Với vectơ $v$ bất kỳ và $\tau>0$, (4.1) tại $z=x+\tau v$ cho $f(x+\tau v)-f(x)\ge\tau g^Tv$. Chia cho $\tau$ và cho $\tau\to0^+$, theo định nghĩa đạo hàm theo hướng, $\nabla f(x)^Tv\ge g^Tv$. Lấy $v=g-\nabla f(x)$ được $-\lVert g-\nabla f(x)\rVert^2\ge0$, nên $g=\nabla f(x)$.

**Bước 3 (phần b).**

Với $g=0$, (4.1) đọc là $f(z)\ge f(x^*)$ với mọi $z$, đúng là định nghĩa điểm cực tiểu. $\square$
:::

Phần (a) cho thấy dưới vi phân trùng với gradient ở mọi điểm khả vi, nên phương pháp của mục này trùng GD trên hàm lồi khả vi. Phần (b) thay điều kiện $\nabla f(x^*)=0$ của hàm khả vi bằng điều kiện $0\in\partial f(x^*)$. Phần (c) bảo đảm phương pháp luôn chọn được một dưới gradient.

::: example Ví dụ 05b.12 (Dưới vi phân của ví dụ dẫn B tại điểm gãy)
**Dữ kiện.**

$f(x)=\tfrac13\bigl(\lvert x+1\rvert+\lvert x-1\rvert+\lvert x-3\rvert\bigr)$, lồi trên $\mathbb R$. Mệnh đề 05b.22(a), (d): tại điểm khả vi, dưới vi phân là $\{f'(x)\}$; dưới vi phân của tổng là tổng các dưới vi phân, và $\partial(cf)=c\,\partial f$. Dưới vi phân của $\lvert x-y\rvert$ là $\{1\}$ khi $x>y$, $\{-1\}$ khi $x<y$ và $[-1,1]$ khi $x=y$.

**Tính tại $x=1$.**

Ba số hạng có dưới vi phân $\{1\}$, $[-1,1]$ và $\{-1\}$. Tổng là $[-1,1]$, nhân $\tfrac13$:

$$
\partial f(1)=\tfrac13\bigl(1+[-1,1]-1\bigr)=\Bigl[-\tfrac13,\tfrac13\Bigr].
$$

**Diễn giải.**

$0\in\partial f(1)$, nên $x=1$ là điểm cực tiểu theo Mệnh đề 05b.22(b). Mọi dưới gradient tại mọi điểm có trị tuyệt đối không vượt $\tfrac13(1+1+1)=1$.

**Kiểm tra lại.**

Hai đầu mút $\pm\tfrac13$ là độ dốc của hai khúc kề $x=1$ trong bảng của Ví dụ 05b.11, khớp chùm đường tựa trên hình.
:::

Cận dưới cho tích vô hướng của Hệ quả 05b.10(a) còn nguyên khi thay gradient bằng dưới gradient.

::: corollary Hệ quả 05b.23 (Bất đẳng thức dưới gradient với điểm cực tiểu)
**Giả thiết.** $f:\mathbb R^n\to\mathbb R$ lồi, đạt cực tiểu tại $x^*$ (H4); $x\in\mathbb R^n$, $g\in\partial f(x)$.

**Kết luận.** $g^T(x-x^*)\ge f(x)-f^*$.

**Điều kiện áp dụng.** Không cần khả vi.

**Phạm vi.** Hệ quả thay cho Hệ quả 05b.10(a) trong chứng minh của Định lý 05b.26 và 05b.34.
:::

::: proof Chứng minh Hệ quả 05b.23
(4.1) với $z=x^*$: $f^*\ge f(x)+g^T(x^*-x)$; chuyển vế. $\square$
:::

Từ đây, "H1 dạng dưới gradient" chỉ giả thiết $f$ lồi, nhận giá trị hữu hạn trên $\mathbb R^n$, không cần khả vi; khi $f$ khả vi, nó trùng H1 theo Mệnh đề 05b.22(a).

::: remark Nhận xét 05b.24 (Hướng ngược dưới gradient và hướng giảm)
Một nhầm lẫn thường gặp là coi $-g$ luôn là hướng giảm như $-\nabla f$. Với $f(x)=\lvert[x]_1\rvert+2\lvert[x]_2\rvert$ trên $\mathbb R^2$ và $x=(1,0)$, vectơ $g=(1,2)$ thuộc $\partial f(x)=\{1\}\times[-2,2]$, nhưng $f(x-\tau g)=\lvert1-\tau\rvert+4\tau=1+3\tau$, lớn hơn $f(x)=1$ với mọi $\tau\in(0,1)$. Theo Nhận xét 05b.11, khoảng cách tới $x^*=0$ vẫn giảm khi bước nhỏ, vì $g^T(x-x^*)=1>0$. Đại lượng giảm theo từng bước của phương pháp dưới gradient là khoảng cách, không phải giá trị.
:::

### 4.3 Phương pháp dưới gradient

::: algorithm Thuật toán 05b.1 (Phương pháp dưới gradient)
**Đầu vào.** Hàm lồi $f:\mathbb R^n\to\mathbb R$ cùng cách tính một dưới gradient tại mỗi điểm; điểm đầu $x_0$; các bước $\eta_0,\ldots,\eta_{K-1}>0$ chọn trước; số bước $K\ge1$.

**Các bước.** Với $k=0,1,\ldots,K-1$:

1. chọn $g_k\in\partial f(x_k)$;
2. đặt $x_{k+1}=x_k-\eta_kg_k$.

**Đầu ra.** Một trong hai điểm:

- lặp tốt nhất (best iterate) $x_{\hat k}$, với $\hat k$ là chỉ số đạt $\min_{k<K}f(x_k)$;
- trung bình lặp (iterate averaging) với trọng số theo bước,

$$
\bar x_K=\frac{\sum_{k=0}^{K-1}\eta_kx_k}{\sum_{k=0}^{K-1}\eta_k}.
\tag{4.2}
$$

**Chi phí mỗi bước.** Một dưới gradient; đầu ra lặp tốt nhất cần thêm một giá trị $f(x_k)$ mỗi bước.
:::

Với bước hằng, $\bar x_K$ là trung bình đều của $x_0,\ldots,x_{K-1}$. Hai đầu ra đều không phải điểm cuối $x_K$: lý do là $f(x_k)$ có thể tăng giữa hai bước, như ví dụ sau cho thấy.

::: example Ví dụ 05b.13 (Bước dài trên ví dụ dẫn B: dãy dao động qua điểm gãy)
**Dữ kiện.**

$f(x)=\tfrac13\bigl(\lvert x+1\rvert+\lvert x-1\rvert+\lvert x-3\rvert\bigr)$, $x^*=1$, $f^*=\tfrac43$; độ dốc $-\tfrac13$ trên $(-1,1)$ và $\tfrac13$ trên $(1,3)$ (Ví dụ 05b.11). Thuật toán 05b.1 từ $x_0=0$ với bước hằng $\eta=4{,}5$, $K=4$.

**Các bước.**

- $x_0=0$ nằm trong $(-1,1)$, nên $g_0=-\tfrac13$ và $x_1=0+\tfrac{4{,}5}3=1{,}5$.
- $x_1=1{,}5$ nằm trong $(1,3)$, nên $g_1=\tfrac13$ và $x_2=1{,}5-1{,}5=0$.
- Lặp lại: $x_3=1{,}5$, $x_4=0$.

**Sai số.**

$e_k=\tfrac13,\ \tfrac16,\ \tfrac13,\ \tfrac16$ với $k=0,1,2,3$: ở bước thứ hai giá trị tăng từ $\tfrac32$ lên $\tfrac53$.

**Hai đầu ra.**

Lặp tốt nhất là $x_1=1{,}5$, sai số $\tfrac16$. Trung bình $\bar x_4=\tfrac14(0+1{,}5+0+1{,}5)=0{,}75$ có $f(0{,}75)=\tfrac13(1{,}75+0{,}25+2{,}25)=\tfrac{17}{12}$, sai số $\tfrac1{12}$, nhỏ hơn sai số của mọi điểm lặp.

**Kiểm tra lại.**

$f(1{,}5)-\tfrac43=\tfrac32-\tfrac43=\tfrac16$ và $f(0)-\tfrac43=\tfrac53-\tfrac43=\tfrac13$. Điểm cuối $x_4=0$ có sai số $\tfrac13$, bằng sai số lớn nhất của dãy.
:::

![Trục x từ 0 đến 2 với đồ thị Ví dụ B. Hai điểm lặp x₀, x₂ trùng tại 0 và hai điểm x₁, x₃ trùng tại 1,5, nằm hai bên điểm gãy x* = 1; trung bình lặp x̄₄ = 0,75 nằm gần nghiệm hơn mọi điểm lặp.](img/lec-05b/vdb-subgradient-iterates.svg)

Hình cho thấy dãy nhảy qua lại hai bên điểm gãy với biên độ không đổi, vì độ dốc không nhỏ đi gần nghiệm và bước không giảm. Trung bình của hai vị trí nằm giữa chúng, gần nghiệm hơn cả hai. Đó là lý do đầu ra trung bình lặp được dùng cùng với lặp tốt nhất.

### 4.4 Định lý hội tụ của phương pháp dưới gradient

Đầu ra trung bình lặp được chặn bằng một bất đẳng thức của hàm lồi cho trung bình có trọng số. Bổ đề sau là dạng hữu hạn của bất đẳng thức đó.

::: lemma Bổ đề 05b.25 (Bất đẳng thức Jensen hữu hạn)
**Giả thiết.** $f:\mathbb R^n\to\mathbb R$ lồi; $K\ge1$; $x_0,\ldots,x_{K-1}\in\mathbb R^n$; trọng số $\lambda_k\ge0$ với $\sum_{k<K}\lambda_k=1$.

**Kết luận.**

$$
f\Bigl(\sum_{k<K}\lambda_kx_k\Bigr)\le\sum_{k<K}\lambda_kf(x_k).
$$

**Điều kiện áp dụng.** Chỉ cần tính lồi theo Định nghĩa 01.22.

**Phạm vi.** Bất đẳng thức xảy ra dấu bằng khi mọi $x_k$ có trọng số dương nằm trên một đoạn mà $f$ là hàm bậc nhất.
:::

::: proof Chứng minh Bổ đề 05b.25
**Bước 1 (cơ sở).**

Với $K=1$, $\lambda_0=1$ và hai vế bằng $f(x_0)$.

**Bước 2 (giả thiết quy nạp và hai trường hợp biên).**

Giả sử kết luận đúng cho mọi bộ $K$ điểm, và xét $K+1$ điểm $x_0,\ldots,x_K$ với trọng số $\lambda_0,\ldots,\lambda_K$. Nếu $\lambda_K=1$ thì mọi trọng số khác bằng $0$ và hai vế bằng $f(x_K)$. Nếu $\lambda_K=0$ thì áp giả thiết quy nạp cho $K$ điểm đầu.

**Bước 3 (trường hợp $0<\lambda_K<1$).**

Đặt $z=\sum_{k<K}\tfrac{\lambda_k}{1-\lambda_K}x_k$; các trọng số $\tfrac{\lambda_k}{1-\lambda_K}$ không âm và có tổng $1$. Định nghĩa 01.22 cho hai điểm $z$, $x_K$ rồi giả thiết quy nạp cho $z$:

$$
\begin{aligned}
f\Bigl(\sum_{k\le K}\lambda_kx_k\Bigr)&=f\bigl((1-\lambda_K)z+\lambda_Kx_K\bigr)\\
&\le(1-\lambda_K)f(z)+\lambda_Kf(x_K)\\
&\le\sum_{k<K}\lambda_kf(x_k)+\lambda_Kf(x_K).
\end{aligned}
$$

Dòng thứ hai là Định nghĩa 01.22 với trọng số $\lambda_K$; dòng thứ ba là giả thiết quy nạp nhân với $1-\lambda_K>0$. $\square$
:::

Bổ đề 05b.25 tổng quát hóa định nghĩa hàm lồi từ hai điểm sang $K$ điểm: giá trị tại điểm trung bình không vượt trung bình các giá trị. Trên ví dụ dẫn B với bước $4{,}5$, vế phải là trung bình các sai số $\tfrac14(\tfrac13+\tfrac16+\tfrac13+\tfrac16)=\tfrac14$, còn vế trái là sai số tại trung bình, $\tfrac1{12}$.

Định lý sau dùng ba thành phần: đồng nhất thức một bước, Hệ quả 05b.23 và một cận cho chuẩn dưới gradient. Không có bổ đề giảm, nên số hạng $\eta_k^2\lVert g_k\rVert^2$ của đồng nhất thức không triệt tiêu và trở thành nhiễu trong Bổ đề 05b.15.

::: theorem Định lý 05b.26 (Hội tụ của phương pháp dưới gradient; T3)
**Giả thiết.** $f:\mathbb R^n\to\mathbb R$ lồi (H1 dạng dưới gradient) và đạt cực tiểu tại $x^*$ (H4); $D=\lVert x_0-x^*\rVert$. Dãy của Thuật toán 05b.1 với các bước $\eta_k>0$ chọn trước, và

- **H5 (chặn chuẩn dưới gradient).** $\lVert g_k\rVert\le G$ với mọi $k$.

**Kết luận.** Với mọi $K\ge1$,

$$
\min_{k<K}e_k\ \le\ \frac{D^2+G^2\sum_{k<K}\eta_k^2}{2\sum_{k<K}\eta_k},\qquad
f(\bar x_K)-f^*\ \le\ \frac{D^2+G^2\sum_{k<K}\eta_k^2}{2\sum_{k<K}\eta_k}.
\tag{4.3}
$$

**Điều kiện áp dụng.** Không cần khả vi, không cần H2. H5 đúng khi $f$ Lipschitz với hằng số $G$, chẳng hạn $\tfrac1N\sum_i\lvert c_i^Tx-y_i\rvert$ hoặc $\tfrac1N\sum_i\max\{0,1-y_ic_i^Tx\}$ với các vectơ đặc trưng $c_i$ và $G=\max_i\lVert c_i\rVert$.

**Phạm vi.** Cận chặn lặp tốt nhất và trung bình lặp, không chặn điểm cuối $x_K$.
:::

::: proof Chứng minh Định lý 05b.26
**Bước 1 (bất đẳng thức một bước).**

Bổ đề 05b.9 với $z=x^*$, rồi Hệ quả 05b.23 cho số hạng giữa và H5 cho số hạng cuối:

$$
\begin{aligned}
d_{k+1}^2&=d_k^2-2\eta_k\,g_k^T(x_k-x^*)+\eta_k^2\lVert g_k\rVert^2\\
&\le d_k^2-2\eta_ke_k+\eta_k^2G^2 .
\end{aligned}
$$

**Bước 2 (tổng lồng có nhiễu).**

Bổ đề 05b.15 với $v_k=2\eta_ke_k$, $u_k=d_k^2$, $\gamma=1$, $r_k=\eta_k^2G^2$ và $u_0=D^2$:

$$
2\sum_{k<K}\eta_ke_k\le D^2+G^2\sum_{k<K}\eta_k^2 .
\tag{4.4}
$$

**Bước 3 (lặp tốt nhất).**

$\sum_{k<K}\eta_ke_k\ge\bigl(\sum_{k<K}\eta_k\bigr)\min_{k<K}e_k$, vì mọi $\eta_k>0$. Chia (4.4) cho $2\sum_{k<K}\eta_k$ được kết luận thứ nhất.

**Bước 4 (trung bình lặp).**

Đặt $\lambda_k=\eta_k/\sum_{j<K}\eta_j$; các trọng số không âm, tổng bằng $1$, và $\bar x_K=\sum_k\lambda_kx_k$ theo (4.2). Bổ đề 05b.25 cho

$$
f(\bar x_K)-f^*\le\sum_{k<K}\lambda_k\bigl(f(x_k)-f^*\bigr)=\frac{\sum_{k<K}\eta_ke_k}{\sum_{k<K}\eta_k},
$$

và (4.4) cho kết luận thứ hai. $\square$
:::

Ngoài việc bảo đảm dưới vi phân khác rỗng (Mệnh đề 05b.22(c)), tính lồi được dùng hai lần: ở Bước 1 qua Hệ quả 05b.23 và ở Bước 4 qua Bổ đề 05b.25. Đầu ra lặp tốt nhất chỉ cần lần thứ nhất.

So với Định lý 05b.16, định lý này bỏ H2 và trả giá bằng số hạng $G^2\sum\eta_k^2$: không có bổ đề giảm để triệt nó, nên bước không thể giữ cố định mà vẫn cho cận về $0$. Kết luận tương ứng với Mệnh đề 5.1 của Juditsky và Nemirovski trong Sra, Nowozin và Wright (2011, tr. 127–128), viết cho trường hợp Euclid.

::: example Ví dụ 05b.14 (Kiểm Định lý 05b.26 trên ví dụ dẫn B với hai bước)
**Dữ kiện.**

$f(x)=\tfrac13\bigl(\lvert x+1\rvert+\lvert x-1\rvert+\lvert x-3\rvert\bigr)$, $x^*=1$, $f^*=\tfrac43$; mọi dưới gradient có trị tuyệt đối không vượt $1$, nên H5 đúng với $G=1$ (Ví dụ 05b.12). Điểm đầu $x_0=0$, $D=1$, $K=4$. Lượt bước $4{,}5$ cho $x_k=0;\,1{,}5;\,0;\,1{,}5$ với sai số $\tfrac13,\tfrac16,\tfrac13,\tfrac16$ và $\bar x_4=0{,}75$ có sai số $\tfrac1{12}$ (Ví dụ 05b.13). Cận (4.3) với bước hằng $\eta$: $\tfrac{D^2+K\eta^2G^2}{2K\eta}$.

**Lượt bước $4{,}5$.**

Cận bằng $\tfrac{1+4\cdot20{,}25}{2\cdot4\cdot4{,}5}=\tfrac{82}{36}\approx2{,}28$. Giá trị thật: $\min_ke_k=\tfrac16$, $f(\bar x_4)-f^*=\tfrac1{12}$.

**Lượt bước $\tfrac12$.**

Bốn điểm $x_k=0,\tfrac16,\tfrac13,\tfrac12$ nằm trên khúc độ dốc $-\tfrac13$, mỗi bước cộng $\tfrac16$. Sai số $\tfrac13,\tfrac5{18},\tfrac29,\tfrac16$. Lặp tốt nhất $x_3=\tfrac12$ có sai số $\tfrac16$; trung bình $\bar x_4=\tfrac14$ có sai số $\tfrac14$. Cận bằng $\tfrac{1+4\cdot\frac14}{2\cdot4\cdot\frac12}=\tfrac12$.

| Lượt | Lặp tốt nhất | Trung bình lặp | Cận (4.3) |
|---|---:|---:|---:|
| bước $4{,}5$ | $\tfrac16$ | $\tfrac1{12}$ | $2{,}28$ |
| bước $\tfrac12$ | $\tfrac16$ | $\tfrac14$ | $0{,}5$ |

**Kiểm tra lại.**

Ở lượt bước $\tfrac12$, trung bình các sai số là $\tfrac14\bigl(\tfrac6{18}+\tfrac5{18}+\tfrac4{18}+\tfrac3{18}\bigr)=\tfrac14$, bằng sai số tại trung bình: Bổ đề 05b.25 xảy ra dấu bằng vì bốn điểm nằm trên một khúc bậc nhất của $f$.
:::

Không đầu ra nào luôn tốt hơn: ở lượt bước $4{,}5$, trung bình lặp tốt hơn lặp tốt nhất; ở lượt bước $\tfrac12$ thì ngược lại. Định lý 05b.26 chặn cả hai bằng cùng một vế phải.

**Trong học máy.** Máy vectơ tựa với mất mát bản lề, hồi quy độ lệch tuyệt đối nhỏ nhất và các bài có chính quy hóa $\lVert x\rVert_1$ đều có mục tiêu lồi, không khả vi; khi các đặc trưng bị chặn và không có số hạng chính quy bậc hai, mục tiêu Lipschitz và H5 đúng. Khi đó Định lý 05b.26 cho tốc độ $O(1/\sqrt K)$ với bước chọn theo Mục 4.5. Với bước hằng, trung bình lặp (4.2) là trung bình đều của các điểm lặp, trùng với trung bình Polyak (Polyak averaging) của Bài 06 sai khác một chỉ số (Bài 06 bỏ điểm đầu). Mạng nơ ron dùng hàm kích hoạt tuyến tính chỉnh lưu (ReLU) cũng có điểm gãy, nhưng mất mát của chúng không lồi, nên Định nghĩa 05b.21 và định lý này không áp dụng; giá trị mà thư viện gán cho đạo hàm của ReLU tại $0$ là một quy ước tính toán.

### 4.5 Chọn bước cho phương pháp dưới gradient

Vế phải của (4.3) có hai phần kéo ngược nhau: $\tfrac{D^2}{2\sum\eta_k}$ nhỏ khi tổng các bước lớn, còn $\tfrac{G^2\sum\eta_k^2}{2\sum\eta_k}$ nhỏ khi các bước nhỏ. Hai hệ quả sau cho hai cách cân bằng.

::: corollary Hệ quả 05b.27 (Bước hằng tối ưu khi biết trước số bước)
**Giả thiết.** Như Định lý 05b.26, với bước hằng $\eta_k=\eta>0$ trong $K$ bước.

**Kết luận.** Vế phải của (4.3) bằng $\tfrac{D^2}{2K\eta}+\tfrac{G^2\eta}2$, không nhỏ hơn $\tfrac{DG}{\sqrt K}$, và bằng $\tfrac{DG}{\sqrt K}$ khi $\eta=\tfrac D{G\sqrt K}$. Với bước này, $K\ge\tfrac{D^2G^2}{\varepsilon^2}$ bước đủ để cận không vượt $\varepsilon$.

**Điều kiện áp dụng.** Cần biết $D$, $G$ và $K$ trước khi chạy.

**Phạm vi.** Tốc độ $O(1/\sqrt K)$. Nếu chạy $K'>K$ bước với cùng bước, cận vẫn giảm nhưng không xuống dưới $\tfrac{G^2\eta}2$.
:::

::: proof Chứng minh Hệ quả 05b.27
**Bước 1 (vế phải).**

Với bước hằng, $\sum_{k<K}\eta_k=K\eta$ và $\sum_{k<K}\eta_k^2=K\eta^2$, nên vế phải bằng $\tfrac{D^2+KG^2\eta^2}{2K\eta}=\tfrac{D^2}{2K\eta}+\tfrac{G^2\eta}2$.

**Bước 2 (bất đẳng thức trung bình cộng – trung bình nhân).**

Với hai số dương $A$, $B$, $A+B\ge2\sqrt{AB}$, dấu bằng khi $A=B$. Với $A=\tfrac{D^2}{2K\eta}$, $B=\tfrac{G^2\eta}2$: $2\sqrt{AB}=2\sqrt{\tfrac{D^2G^2}{4K}}=\tfrac{DG}{\sqrt K}$, và $A=B$ khi $\eta^2=\tfrac{D^2}{G^2K}$.

**Bước 3 (số bước).**

$\tfrac{DG}{\sqrt K}\le\varepsilon$ tương đương $K\ge\tfrac{D^2G^2}{\varepsilon^2}$. $\square$
:::

::: corollary Hệ quả 05b.28 (Bước giảm dần)
**Giả thiết.** Như Định lý 05b.26, với dãy bước thỏa $\eta_k\to0$ và $\sum_{k=0}^\infty\eta_k=\infty$.

**Kết luận.** Vế phải của (4.3) tiến về $0$ khi $K\to\infty$; do đó $\min_{k<K}e_k\to0$ và $f(\bar x_K)\to f^*$.

**Điều kiện áp dụng.** Không cần biết $D$, $G$, $K$ trước. Điều kiện Robbins–Monro, $\sum_k\eta_k=\infty$ và $\sum_k\eta_k^2<\infty$, là một trường hợp riêng, vì $\sum\eta_k^2<\infty$ kéo theo $\eta_k\to0$.

**Phạm vi.** Hệ quả không cho tốc độ; tốc độ phụ thuộc dãy bước cụ thể.
:::

::: proof Chứng minh Hệ quả 05b.28
Đặt $S_K=\sum_{k<K}\eta_k\to\infty$.

**Bước 1 (phần đầu).**

$\tfrac{D^2}{2S_K}\to0$.

**Bước 2 (phần nhiễu, tách đầu và đuôi).**

Cho $\varepsilon>0$. Vì $\eta_k\to0$, có $k_0$ để $\eta_k\le\varepsilon/G^2$ với mọi $k\ge k_0$. Khi $K>k_0$,

$$
\frac{G^2\sum_{k<K}\eta_k^2}{2S_K}\le\frac{G^2\sum_{k<k_0}\eta_k^2}{2S_K}+\frac{G^2}{2S_K}\cdot\frac\varepsilon{G^2}\sum_{k_0\le k<K}\eta_k\le\frac{G^2\sum_{k<k_0}\eta_k^2}{2S_K}+\frac\varepsilon2 .
$$

Số hạng đầu có tử cố định và mẫu tiến ra vô cùng, nên tiến về $0$. Vậy giới hạn trên của phần nhiễu không vượt $\tfrac\varepsilon2$ với mọi $\varepsilon>0$, tức phần nhiễu tiến về $0$. $\square$
:::

Tên điều kiện đến từ phương pháp xấp xỉ ngẫu nhiên của Robbins và Monro (1951); Goodfellow, Bengio và Courville (2016, công thức (8.12)–(8.13), tr. 294–295) nêu nó là điều kiện đủ cho SGD hội tụ.

Bước $\tfrac D{G\sqrt K}$ phải biết $K$ trước; bước $\tfrac1{k+1}$ không cần biết $K$ nhưng chậm hơn. Trên ví dụ dẫn B với $x_0=0$, $D=G=1$, bước $\tfrac1{k+1}$ cho vế phải của (4.3) khoảng $\tfrac{1+1{,}635}{2\cdot5{,}187}\approx0{,}254$ tại $K=100$ và $\tfrac{1+1{,}645}{2\cdot9{,}788}\approx0{,}135$ tại $K=10^4$, giảm như $1/\log K$ vì tổng điều hòa tăng như $\log K$; bước hằng tối ưu cho $0{,}1$ và $0{,}01$.

::: exercise Bài tập 05b.4 (Dưới vi phân tại hai điểm gãy còn lại và một bước làm khoảng cách tăng)
Cho ví dụ dẫn B, $f(x)=\tfrac13\bigl(\lvert x+1\rvert+\lvert x-1\rvert+\lvert x-3\rvert\bigr)$, $x^*=1$.

- (a) Tính $\partial f(-1)$ và $\partial f(3)$.
- (b) Với $x_0=3$ và bước $\eta=6$, chỉ ra một $g_0\in\partial f(3)$ làm $d_1>d_0$, và một $g_0\in\partial f(3)$ làm $d_1<d_0$.
- (c) Với $x_0=3$, $G=1$, tìm $K$ nhỏ nhất để cận của Hệ quả 05b.27 không vượt $0{,}05$, và bước tương ứng.
:::

::: hint Gợi ý Bài tập 05b.4
Dưới vi phân của tổng các hàm lồi là tổng các dưới vi phân, và $\partial(cf)=c\,\partial f$ với $c>0$ (Mệnh đề 05b.22(d)); dưới vi phân của $\lvert x-y\rvert$ là $\{1\}$ khi $x>y$, $\{-1\}$ khi $x<y$, $[-1,1]$ khi $x=y$. Ở (b), $x_1=3-6g_0$ và $d_1=\lvert x_1-1\rvert$.
:::

::: solution Lời giải Bài tập 05b.4
**Câu (a).**

Tại $x=-1$: ba số hạng có dưới vi phân $[-1,1]$, $\{-1\}$, $\{-1\}$, nên $\partial f(-1)=\tfrac13\bigl([-1,1]-2\bigr)=[-1,-\tfrac13]$. Tại $x=3$: $\{1\}$, $\{1\}$, $[-1,1]$, nên $\partial f(3)=\tfrac13\bigl(2+[-1,1]\bigr)=[\tfrac13,1]$.

**Câu (b).**

$d_0=2$. Với $g_0\in[\tfrac13,1]$, $x_1=3-6g_0\in[-3,1]$ và $d_1=\lvert2-6g_0\rvert$. Chọn $g_0=1$: $x_1=-3$, $d_1=4>2$. Chọn $g_0=\tfrac13$: $x_1=1$, $d_1=0<2$.

**Câu (c).**

$D=2$, $G=1$: $\tfrac{DG}{\sqrt K}\le0{,}05$ khi $\sqrt K\ge40$, tức $K\ge1600$; bước $\eta=\tfrac2{40}=0{,}05$.

**Kiểm tra lại.**

Ngưỡng của Nhận xét 05b.11 với $g_0=1$ là $\tfrac{2g_0(x_0-x^*)}{g_0^2}=4<6$, nên bước $6$ quá dài và khoảng cách tăng; với $g_0=\tfrac13$, ngưỡng là $12>6$, khoảng cách giảm.
:::

**Chuỗi suy luận của mục.**

1. Ví dụ 05b.11 cho thấy H2 sai với mất mát có điểm gãy.
2. Định nghĩa 05b.21 và Mệnh đề 05b.22 thay gradient bằng dưới gradient; Hệ quả 05b.23 giữ cận dưới cho tích vô hướng.
3. Thuật toán 05b.1 trả về lặp tốt nhất hoặc trung bình lặp, vì giá trị có thể tăng (Ví dụ 05b.13).
4. Bổ đề 05b.9, Hệ quả 05b.23, H5 và Bổ đề 05b.15 cho Định lý 05b.26; Bổ đề 05b.25 chuyển cận sang trung bình lặp.
5. Hệ quả 05b.27, 05b.28 cho hai cách chọn bước.

Đích của mục là Định lý 05b.26 cùng hai cách chọn bước.

**Kết mục.** Mục này cho cận $O(1/\sqrt K)$ cho phương pháp dưới gradient (Định lý 05b.26, Hệ quả 05b.27) mà không cần H2, đổi lại phải chặn lặp tốt nhất hoặc trung bình lặp. Mọi kết quả còn giả thiết vectơ cập nhật là một dưới gradient đúng, tức tính trên toàn bộ dữ liệu ở mỗi bước. Mục 5 thay $g_k$ bằng gradient trên một nhóm mẫu rút ngẫu nhiên; chứng minh của Định lý 05b.26 chỉ dùng $g_k$ qua $g_k^T(x_k-x^*)$ và $\lVert g_k\rVert^2$, nên nó còn đúng sau khi lấy kỳ vọng, với điều kiện có một công cụ tính kỳ vọng theo lịch sử của dãy.


## 5. Hạ gradient ngẫu nhiên cho hàm lồi và lồi mạnh

Mục 4 dùng dưới gradient đúng của $f$ ở mỗi bước. Trong học máy, $f=\tfrac1N\sum_{i=1}^N\ell_i$, nên một gradient đúng tốn $N$ gradient mẫu. SGD của Bài 05 dùng gradient trên một nhóm $b$ mẫu, không chệch với hiệp phương sai $\Sigma(x)/b$ (Định lý 05.11), và Mệnh đề 05.14 cho kỳ vọng thay đổi của $f$ sau một bước. Ví dụ 05.14 tính được mức giới hạn $\tfrac8{57}\approx0{,}140$ của kỳ vọng bình phương sai lệch trên ba quan sát, nhưng Bài 05 chưa có định lý nào về dãy sau $K$ bước cho một mất mát tổng quát.

Mục này cho các định lý đó: cho hàm lồi, cho hàm lồi mạnh với bước hằng và với lịch giảm bước, và cận xác suất cho một lần chạy.

### 5.1 Nhu cầu: một bước ngẫu nhiên có thể làm mất mát tăng

Trên ví dụ dẫn A, SGD nhóm một mẫu (Ví dụ 05b.2) dùng ở mỗi bước gradient của một quan sát rút ngẫu nhiên. Gradient đó có thể ngược hướng với $\nabla f(x_k)$, như ví dụ sau.

::: example Ví dụ 05b.15 (Một bước SGD làm mất mát tăng)
**Dữ kiện.**

Ví dụ dẫn A: $y=(-1,1,3)$, $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, gradient mẫu $\theta-y_i$. Điểm $\theta_0=0$, bước $0{,}1$, nhóm một mẫu, quan sát được rút là $y=-1$.

**Bước.**

$g_0=0-(-1)=1$, trong khi $J'(0)=-1$. Điểm mới $\theta_1=0-0{,}1=-0{,}1$.

**Thay đổi của mất mát.**

$J(0)-\tfrac43=\tfrac12$ và $J(-0{,}1)-\tfrac43=\tfrac12\cdot1{,}21=0{,}605$: sai số giá trị tăng.

**Kiểm tra lại.**

Hai quan sát còn lại cho $\theta_1=0{,}1$ và $0{,}3$, với sai số $0{,}405$ và $0{,}245$. Trung bình ba khả năng là $\tfrac13(0{,}605+0{,}405+0{,}245)\approx0{,}418<0{,}5$: theo kỳ vọng, sai số giảm.
:::

Ví dụ cho thấy các bất đẳng thức một bước của Mục 3, Mục 4 không còn đúng cho từng hiện thực của nhóm, nhưng có thể đúng theo trung bình trên các nhóm. Để nói điều đó chính xác cần một kỳ vọng tính khi đã biết mọi nhóm trước bước $k$, vì $x_k$ phụ thuộc các nhóm đó. Thuật toán sau viết SGD ở dạng tổng quát mà mọi định lý của mục dùng.

::: algorithm Thuật toán 05b.2 (Hạ gradient ngẫu nhiên với nhóm có hoàn lại)
**Đầu vào.** Mất mát $f=\tfrac1N\sum_{i=1}^N\ell_i$ với mỗi $\ell_i:\mathbb R^n\to\mathbb R$ lồi hoặc khả vi; điểm đầu $x_0$ tất định; cỡ nhóm $b\ge1$; các bước $\eta_0,\ldots,\eta_{K-1}>0$ chọn trước, không phụ thuộc các nhóm được rút; số bước $K$.

**Các bước.** Với $k=0,1,\ldots,K-1$:

1. rút $b$ chỉ số $I_{k,1},\ldots,I_{k,b}$ đều trên $\{1,\ldots,N\}$, độc lập với nhau và với mọi lần rút trước;
2. tính $g_k=\tfrac1b\sum_{j=1}^bh_{I_{k,j}}$, với $h_i$ là $\nabla\ell_i(x_k)$ hoặc một dưới gradient của $\ell_i$ tại $x_k$;
3. đặt $x_{k+1}=x_k-\eta_kg_k$.

**Đầu ra.** Điểm cuối $x_K$ hoặc trung bình lặp $\bar x_K$ theo (4.2).

**Chi phí mỗi bước.** $b$ gradient mẫu thay cho $N$.
:::

Với $b=1$ và $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$, Thuật toán 05b.2 là phép lặp của Ví dụ 05b.2 và Ví dụ 05b.15.

### 5.2 Lịch sử và kỳ vọng có điều kiện

Trực giác, chưa phải định nghĩa: mọi lần chạy có thể của SGD xếp thành một cây. Gốc là $x_0$; mỗi nút ở mức $k$ là một lịch sử các nhóm đã rút trước bước $k$, xác định $x_k$; các nhánh con là các khả năng của nhóm mới. Kỳ vọng có điều kiện tại một nút là trung bình trên các nhánh con của nút đó.

![Cây lịch sử hai bước của Ví dụ A. Gốc θ₀ = 0 tách ba nhánh theo quan sát được rút y = −1, 1, 3, cho θ₁ = −0,1; 0,1; 0,3. Mỗi nút mức một lại tách ba nhánh, cho chín giá trị θ₂: −0,19; 0,01; 0,21 / −0,01; 0,19; 0,39 / 0,17; 0,37; 0,57. Ghi chú tại θ₁ = 0,1: g₁ = θ₁ − y ∈ {1,1; −0,9; −2,9}, trung bình ba nhánh −0,9 = J′(θ₁).](img/lec-05b/history-tree.svg)

Hình vẽ cây hai bước của ví dụ dẫn A với bước $0{,}1$ và nhóm một mẫu. Tại nút $\theta_1=0{,}1$, ba nhánh con cho ba gradient mẫu $1{,}1$; $-0{,}9$; $-2{,}9$, có trung bình $-0{,}9=J'(0{,}1)$: trung bình trên các nhánh con của một nút bằng gradient đầy đủ tại nút đó.

::: definition Định nghĩa 05b.29 (Lịch sử và kỳ vọng có điều kiện)
Xét Thuật toán 05b.2. Ký hiệu $B_j=(I_{j,1},\ldots,I_{j,b})$ là nhóm rút ở bước $j$.

**Lịch sử.** Lịch sử trước bước $k$ là bộ $\mathcal F_k=(B_0,\ldots,B_{k-1})$; $\mathcal F_0$ rỗng. Một đại lượng $W$ được gọi là xác định bởi $\mathcal F_k$ nếu $W$ là một hàm của $B_0,\ldots,B_{k-1}$; nói riêng, $x_k$ và mọi hàm của $x_k$ xác định bởi $\mathcal F_k$.

**Kỳ vọng có điều kiện** (conditional expectation). Với biến ngẫu nhiên $Z$ là hàm của $B_0,\ldots,B_m$, $m\ge k$, kỳ vọng có điều kiện $\mathbb E[Z\mid\mathcal F_k]$ là hàm của $\mathcal F_k$ nhận giá trị bằng trung bình của $Z$ trên mọi khả năng của $B_k,\ldots,B_m$, mỗi khả năng có xác suất $N^{-b(m-k+1)}$, khi $B_0,\ldots,B_{k-1}$ được giữ cố định.
:::

Định nghĩa dùng việc mỗi nhóm có $N^b$ khả năng đồng xác suất và các nhóm độc lập, nên mọi kỳ vọng là trung bình hữu hạn. Kỳ vọng có điều kiện là một đại lượng ngẫu nhiên: nó phụ thuộc lịch sử, như ba giá trị $\mathbb E[(\theta_2-1)^2\mid\mathcal F_1]$ tại ba nút mức một của cây. Trong ngôn ngữ xác suất tổng quát, $\mathcal F_k$ là $\sigma$-đại số sinh bởi $B_0,\ldots,B_{k-1}$, họ $(\mathcal F_k)$ gọi là bộ lọc (filtration), và Bài 05c trình bày kỳ vọng có điều kiện theo một biến ngẫu nhiên rời rạc.

::: proposition Mệnh đề 05b.30 (Ba quy tắc tính kỳ vọng có điều kiện)
**Giả thiết.** Như Định nghĩa 05b.29; $Z$, $Z'$ là các biến ngẫu nhiên là hàm của hữu hạn nhóm.

**Kết luận.**

- (a) (Tính chất tháp, tower property) $\mathbb E\bigl[\mathbb E[Z\mid\mathcal F_k]\bigr]=\mathbb EZ$.
- (b) (Rút đại lượng đã biết) Nếu $W$ xác định bởi $\mathcal F_k$ thì $\mathbb E[WZ\mid\mathcal F_k]=W\,\mathbb E[Z\mid\mathcal F_k]$; kỳ vọng có điều kiện tuyến tính theo $Z$.
- (c) (Nhóm mới) Với hàm $\Psi$ bất kỳ, $\mathbb E[\Psi(x_k,B_k)\mid\mathcal F_k]=N^{-b}\sum_{B}\Psi(x_k,B)$, tổng lấy trên mọi bộ $B\in\{1,\ldots,N\}^b$.

**Điều kiện áp dụng.** Các nhóm rút đều, độc lập, có hoàn lại.

**Phạm vi.** Mệnh đề viết cho cây hữu hạn; dạng tổng quát cần lý thuyết độ đo.
:::

::: proof Chứng minh Mệnh đề 05b.30
**Bước 1 (phần a).**

$\mathbb E[Z\mid\mathcal F_k]$ là trung bình của $Z$ trên các nhánh con của mỗi nút mức $k$. Lấy kỳ vọng tiếp theo $B_0,\ldots,B_{k-1}$ là lấy trung bình các trung bình đó với trọng số bằng nhau $N^{-bk}$. Mỗi lá được đếm đúng một lần với trọng số tích $N^{-bk}N^{-b(m-k+1)}$, bằng trọng số của nó trong $\mathbb EZ$.

**Bước 2 (phần b).**

Khi $B_0,\ldots,B_{k-1}$ cố định, $W$ là hằng số, nên ra khỏi phép lấy trung bình trên các nhánh con. Tính tuyến tính là tính tuyến tính của trung bình hữu hạn.

**Bước 3 (phần c).**

Khi $\mathcal F_k$ cố định, $x_k$ cố định và $B_k$ nhận mỗi bộ trong $N^b$ bộ với xác suất $N^{-b}$, độc lập với lịch sử; trung bình của $\Psi(x_k,B_k)$ trên các nhánh con là vế phải. $\square$
:::

::: example Ví dụ 05b.16 (Tính chất tháp trên chín lá của ví dụ dẫn A)
**Dữ kiện.**

Ví dụ dẫn A với bước $0{,}1$, nhóm một mẫu, $\theta_0=0$: $\theta_{k+1}=\theta_k-0{,}1(\theta_k-y_{I_k})$, $y=(-1,1,3)$. Cây của hình trên cho ba giá trị $\theta_1$ và chín giá trị $\theta_2$.

**Kỳ vọng có điều kiện tại ba nút mức một.**

| $\theta_1$ | ba giá trị $\theta_2$ | ba giá trị $(\theta_2-1)^2$ | $\mathbb E[(\theta_2-1)^2\mid\mathcal F_1]$ |
|---:|---|---|---:|
| $-0{,}1$ | $-0{,}19$; $0{,}01$; $0{,}21$ | $1{,}4161$; $0{,}9801$; $0{,}6241$ | $1{,}0068$ |
| $0{,}1$ | $-0{,}01$; $0{,}19$; $0{,}39$ | $1{,}0201$; $0{,}6561$; $0{,}3721$ | $0{,}6828$ |
| $0{,}3$ | $0{,}17$; $0{,}37$; $0{,}57$ | $0{,}6889$; $0{,}3969$; $0{,}1849$ | $0{,}4236$ |

**Tháp.**

Trung bình cột cuối là $\tfrac13(1{,}0068+0{,}6828+0{,}4236)\approx0{,}7044$.

**Kiểm tra lại.**

Trung bình trực tiếp của chín giá trị $(\theta_2-1)^2$ cũng là $\tfrac{6{,}3393}9\approx0{,}7044$, và bằng $a_2$ của đệ quy $a_{k+1}=0{,}81a_k+\tfrac8{300}$ ở Ví dụ 05b.2.
:::

### 5.3 Giả thiết về gradient ngẫu nhiên

Các chứng minh dưới đây cần ba tính chất của $g_k$ khi đã biết lịch sử: không chệch, và một trong hai kiểu chặn độ lớn.

::: definition Định nghĩa 05b.31 (Giả thiết H6, H6a, H6b về gradient ngẫu nhiên)
Cho dãy của Thuật toán 05b.2 và lịch sử $\mathcal F_k$ của Định nghĩa 05b.29. Với mọi $k\ge0$:

**H6 (không chệch).** $\mathbb E[g_k\mid\mathcal F_k]=\nabla f(x_k)$ khi $f$ khả vi; $\mathbb E[g_k\mid\mathcal F_k]\in\partial f(x_k)$ khi $f$ lồi không khả vi.

**H6a (chặn mômen bậc hai).** $\mathbb E\bigl[\lVert g_k\rVert^2\mid\mathcal F_k\bigr]\le G^2$.

**H6b (chặn phương sai).** $f$ khả vi và $\mathbb E\bigl[\lVert g_k-\nabla f(x_k)\rVert^2\mid\mathcal F_k\bigr]\le\sigma^2$.
:::

H6 nói rằng trung bình trên các nhánh con của mỗi nút là gradient (hoặc một dưới gradient) đầy đủ. H6a chặn toàn bộ độ lớn của $g_k$, kể cả phần tín hiệu $\nabla f(x_k)$; H6b chỉ chặn phần nhiễu quanh tín hiệu. H6a là dạng ngẫu nhiên của H5 ở Định lý 05b.26: khi $g_k$ tất định, H6a trở thành $\lVert g_k\rVert\le G$. Bổ đề sau nối hai kiểu chặn.

::: lemma Bổ đề 05b.32 (Tách phương sai)
**Giả thiết.** H6 với $f$ khả vi.

**Kết luận.**

$$
\mathbb E\bigl[\lVert g_k\rVert^2\mid\mathcal F_k\bigr]=\lVert\nabla f(x_k)\rVert^2+\mathbb E\bigl[\lVert g_k-\nabla f(x_k)\rVert^2\mid\mathcal F_k\bigr].
\tag{5.1}
$$

**Điều kiện áp dụng.** Đẳng thức, không cần H6a hay H6b.

**Phạm vi.** Dưới H6b, vế phải không vượt $\lVert\nabla f(x_k)\rVert^2+\sigma^2$.
:::

::: proof Chứng minh Bổ đề 05b.32
**Bước 1 (khai triển).**

Viết $g_k=\nabla f(x_k)+\bigl(g_k-\nabla f(x_k)\bigr)$ và khai triển bình phương chuẩn:

$$
\lVert g_k\rVert^2=\lVert\nabla f(x_k)\rVert^2+2\nabla f(x_k)^T\bigl(g_k-\nabla f(x_k)\bigr)+\lVert g_k-\nabla f(x_k)\rVert^2 .
$$

**Bước 2 (lấy kỳ vọng có điều kiện).**

$\nabla f(x_k)$ xác định bởi $\mathcal F_k$, nên Mệnh đề 05b.30(b) đưa nó ra ngoài; H6 cho $\mathbb E[g_k-\nabla f(x_k)\mid\mathcal F_k]=0$, nên số hạng giữa có kỳ vọng có điều kiện bằng $0$. $\square$
:::

Đẳng thức (5.1) là Hệ quả 05.12(b) viết theo lịch sử: mômen bậc hai bằng tín hiệu cộng nhiễu. Với Thuật toán 05b.2, Định lý 05.11 áp tại $x_k$ cố định và Mệnh đề 05b.30(c) cho H6. Hệ quả 05.12(a) cho phần nhiễu bằng $\operatorname{tr}\Sigma(x_k)/b$, nên H6b đúng khi và chỉ khi $\operatorname{tr}\Sigma(x)\le b\sigma^2$ tại mọi điểm lặp có thể.

::: example Ví dụ 05b.17 (Hai hằng số của gradient ngẫu nhiên trên ví dụ dẫn A)
**Dữ kiện.**

Ví dụ dẫn A: $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, gradient mẫu $\theta-y_i$ với $y=(-1,1,3)$, nhóm $b$ mẫu có hoàn lại. Hệ quả 05.12(a): phần nhiễu bằng $\operatorname{tr}\Sigma(\theta)/b$. Bổ đề 05b.32: mômen bậc hai bằng tín hiệu cộng nhiễu.

**Phương sai của gradient một mẫu.**

$\theta-y_I=(\theta-1)-(y_I-1)$, với $y_I-1\in\{-2,0,2\}$ đồng xác suất. Kỳ vọng là $\theta-1=J'(\theta)$ và phương sai là $\tfrac13(4+0+4)=\tfrac83$, không phụ thuộc $\theta$.

**Hai giả thiết.**

H6b đúng trên toàn $\mathbb R$ với $\sigma^2=\tfrac8{3b}$. Theo (5.1), $\mathbb E[g^2\mid\theta]=(\theta-1)^2+\tfrac8{3b}$, không bị chặn khi $\theta\to\pm\infty$, nên H6a không đúng trên toàn $\mathbb R$; nó chỉ đúng trên một đoạn bị chặn chứa dãy lặp.

**Kiểm tra lại.**

Tại $\theta=0{,}1$, $b=1$: ba gradient mẫu $1{,}1$; $-0{,}9$; $-2{,}9$ có bình phương trung bình $\tfrac13(1{,}21+0{,}81+8{,}41)\approx3{,}477$, và $(\theta-1)^2+\tfrac83=0{,}81+2{,}667=3{,}477$.
:::

::: remark Nhận xét 05b.33 (Khi nào H6a, H6b đúng)
**H6a mâu thuẫn với H3 trên toàn không gian.** Dưới H3 và H4, Bổ đề 05b.8(c) cho $\lVert\nabla f(x)\rVert\ge\mu\lVert x-x^*\rVert$, không bị chặn; theo (5.1), $\mathbb E[\lVert g_k\rVert^2\mid\mathcal F_k]\ge\lVert\nabla f(x_k)\rVert^2$. Vậy H6a chỉ có thể đúng trên một vùng bị chặn chứa dãy lặp.

**H6b không phải lúc nào cũng đúng toàn cục.** Với bình phương nhỏ nhất $\ell_i(x)=\tfrac12(c_i^Tx-y_i)^2$, trong đó $c_i\in\mathbb R^n$ là vectơ đặc trưng, gradient mẫu là $c_ic_i^Tx-c_iy_i$; khi các ma trận $c_ic_i^T$ khác nhau, phần nhiễu tăng như $\lVert x-x^*\rVert^2$ (Tình huống 05b.2). Ví dụ dẫn A là trường hợp mọi $c_i=1$. Với mất mát logistic, gradient mẫu có chuẩn không vượt $\lVert c_i\rVert$, nên H6b đúng toàn cục.

**Rút không hoàn lại.** Khi dữ liệu được xáo trộn một lần rồi duyệt tuần tự trong một lượt, nhóm cuối của lượt bị xác định bởi các nhóm đã dùng, nên $\mathbb E[g_k\mid\mathcal F_k]$ nói chung khác $\nabla f(x_k)$ và H6 sai; các định lý của mục không áp dụng nguyên dạng cho cách duyệt đó.
:::

### 5.4 SGD cho hàm lồi

Định lý sau là Định lý 05b.26 với dưới gradient tất định thay bằng ước lượng không chệch, và H5 thay bằng H6a. Chứng minh lấy kỳ vọng có điều kiện của từng dòng.

::: theorem Định lý 05b.34 (SGD trên hàm lồi; T4)
**Giả thiết.** $f$ lồi (H1 dạng dưới gradient) và đạt cực tiểu tại $x^*$ (H4); $x_0$ tất định, $D=\lVert x_0-x^*\rVert$. Dãy của Thuật toán 05b.2 thỏa H6 và H6a; các bước $\eta_k>0$ chọn trước, không phụ thuộc các nhóm. $\bar x_K$ là trung bình lặp (4.2).

**Kết luận.** Với mọi $K\ge1$,

$$
\mathbb Ef(\bar x_K)-f^*\le\frac{D^2+G^2\sum_{k<K}\eta_k^2}{2\sum_{k<K}\eta_k}.
\tag{5.2}
$$

Với bước hằng $\eta=\tfrac D{G\sqrt K}$, $\mathbb Ef(\bar x_K)-f^*\le\tfrac{DG}{\sqrt K}$.

**Điều kiện áp dụng.** H6a chỉ cần đúng tại các điểm lặp thực sự xuất hiện.

**Phạm vi.** Cận chặn kỳ vọng của sai số tại trung bình lặp; không chặn điểm cuối, không chặn một lần chạy.
:::

::: proof Chứng minh Định lý 05b.34
**Bước 1 (đồng nhất thức cho từng hiện thực).**

Bổ đề 05b.9 với $g=g_k$, $\eta=\eta_k$, $z=x^*$ đúng cho mọi giá trị của nhóm $B_k$:

$$
d_{k+1}^2=d_k^2-2\eta_k\,g_k^T(x_k-x^*)+\eta_k^2\lVert g_k\rVert^2 .
$$

**Bước 2 (kỳ vọng có điều kiện).**

$x_k$ và $\eta_k$ xác định bởi $\mathcal F_k$, nên Mệnh đề 05b.30(b) cho $\mathbb E[g_k^T(x_k-x^*)\mid\mathcal F_k]=\mathbb E[g_k\mid\mathcal F_k]^T(x_k-x^*)$. Theo H6, $\mathbb E[g_k\mid\mathcal F_k]\in\partial f(x_k)$, nên Hệ quả 05b.23 chặn tích này từ dưới bởi $e_k$. H6a chặn số hạng cuối:

$$
\mathbb E[d_{k+1}^2\mid\mathcal F_k]\le d_k^2-2\eta_ke_k+\eta_k^2G^2 .
$$

**Bước 3 (kỳ vọng toàn phần).**

Lấy kỳ vọng hai vế; Mệnh đề 05b.30(a) cho $\mathbb E\,\mathbb E[d_{k+1}^2\mid\mathcal F_k]=a_{k+1}$:

$$
a_{k+1}\le a_k-2\eta_k\,\mathbb Ee_k+\eta_k^2G^2 .
$$

**Bước 4 (tổng lồng).**

Bổ đề 05b.15 với $v_k=2\eta_k\mathbb Ee_k$, $u_k=a_k$, $\gamma=1$, $r_k=\eta_k^2G^2$; vì $x_0$ tất định, $a_0=D^2$:

$$
2\sum_{k<K}\eta_k\,\mathbb Ee_k\le D^2+G^2\sum_{k<K}\eta_k^2 .
$$

**Bước 5 (Jensen rồi kỳ vọng).**

Với mỗi hiện thực của dãy, Bổ đề 05b.25 với $\lambda_k=\eta_k/\sum_j\eta_j$ cho $f(\bar x_K)-f^*\le\sum_k\lambda_ke_k$. Các $\lambda_k$ không ngẫu nhiên vì bước chọn trước, nên lấy kỳ vọng được $\mathbb Ef(\bar x_K)-f^*\le\sum_k\lambda_k\mathbb Ee_k$; ghép với Bước 4 được (5.2). Phần bước hằng là Hệ quả 05b.27 áp cho cùng vế phải. $\square$
:::

So với Định lý 05b.26, cận (5.2) giữ nguyên vế phải nhưng chặn kỳ vọng. Đầu ra lặp tốt nhất bị bỏ: tìm $\arg\min_kf(x_k)$ cần tính $f$ trên toàn bộ dữ liệu ở mỗi bước, đúng chi phí mà SGD muốn tránh. Kết quả tương ứng với Mệnh đề 5.5 của Juditsky và Nemirovski trong Sra, Nowozin và Wright (2011, tr. 134), viết cho miền bị chặn.

::: example Ví dụ 05b.18 (SGD với gradient dấu trên ví dụ dẫn B; có mô phỏng)
**Dữ kiện.**

$f(x)=\tfrac13\sum_{i=1}^3\lvert x-y_i\rvert$ với $y=(-1,1,3)$, $x^*=1$, $f^*=\tfrac43$, $x_0=0$, $D=1$. Gradient mẫu $g_k=\operatorname{sign}(x_k-y_{I_k})$, quy ước $\operatorname{sign}(0)=0$, với $I_k$ đều trên $\{1,2,3\}$. Định lý 05b.34 với bước hằng $\eta=\tfrac D{G\sqrt K}$: $\mathbb Ef(\bar x_K)-f^*\le\tfrac{DG}{\sqrt K}$.

**Kiểm giả thiết.**

$\mathbb E[g_k\mid\mathcal F_k]=\tfrac13\sum_i\operatorname{sign}(x_k-y_i)$; mỗi số hạng là một dưới gradient của $\lvert x-y_i\rvert$ tại $x_k$ (khi $x_k=y_i$, $0\in[-1,1]$), nên theo Mệnh đề 05b.22(d) tổng thuộc $\partial f(x_k)$ và H6 đúng. $g_k^2\le1$, nên H6a đúng với $G=1$.

**Cận.**

Với $K=400$: $\eta=\tfrac1{20}=0{,}05$ và cận bằng $0{,}05$.

**Mô phỏng.**

Mô phỏng $10\,000$ lần chạy độc lập với $K=400$, $\eta=0{,}05$, hạt giống $2026$ của bộ sinh số giả ngẫu nhiên Python, cho trung bình của $f(\bar x_{400})-f^*$ khoảng $0{,}035$. Đây là ước lượng Monte Carlo của $\mathbb Ef(\bar x_{400})-f^*$, không phải giá trị chính xác.

**Kiểm tra lại.**

$0{,}035\le0{,}05$, đúng chiều của (5.2). Cận đòi $K\ge(DG/\varepsilon)^2$, nên giảm sai số bảo đảm mười lần cần nhân $K$ lên một trăm lần.
:::

**Trong học máy.** Định lý 05b.34 áp dụng cho SGD trên mất mát lồi Lipschitz, như mất mát bản lề của SVM hay mất mát logistic, với gradient nhóm rút có hoàn lại, khi mất mát có điểm cực tiểu (H4); điều này sai với logistic không chính quy trên dữ liệu tách được. Nó chặn trung bình lặp, khi bước hằng trùng với trung bình Polyak của Bài 06 sai khác một chỉ số (Bài 06 bỏ điểm đầu), và không nói gì về điểm cuối; định lý không so sánh hai đầu ra đó. Mất mát của mạng sâu không lồi, nên Bước 2 của chứng minh, nơi Hệ quả 05b.23 được dùng, không còn đúng.

### 5.5 SGD cho hàm lồi mạnh và sàn nhiễu

Định lý 05b.34 chỉ chặn trung bình lặp với tốc độ $O(1/\sqrt K)$, và không giải thích vì sao ở Ví dụ 05b.2 kỳ vọng bình phương khoảng cách dừng ở $\tfrac8{57}$. Thêm H2, H3, thay H6a bằng H6b và dùng bước hằng $\eta\le\tfrac1L$ thì chặn được điểm cuối. Bất đẳng thức một bước thu được có hệ số co cộng một số hạng nhiễu không đổi; bổ đề sau là cách nối thứ ba của khuôn một bước.

::: lemma Bổ đề 05b.35 (Đệ quy co có nhiễu)
**Giả thiết.** Dãy $u_k\ge0$ thỏa $u_{k+1}\le q\,u_k+r$ với mọi $k\ge0$, trong đó $q\in[0,1)$ và $r\ge0$.

**Kết luận.** Với mọi $k\ge0$,

$$
u_k\le q^k\Bigl(u_0-\frac r{1-q}\Bigr)+\frac r{1-q}\le q^ku_0+\frac r{1-q}.
\tag{5.3}
$$

Khi giả thiết xảy ra dấu bằng với mọi $k$, bất đẳng thức đầu của (5.3) là đẳng thức.

**Điều kiện áp dụng.** $q<1$.

**Phạm vi.** Số hạng $\tfrac r{1-q}$ không giảm theo $k$; nó là điểm bất động của ánh xạ $u\mapsto qu+r$.
:::

::: proof Chứng minh Bổ đề 05b.35
Đặt $u^\star=\tfrac r{1-q}$, thỏa $u^\star=qu^\star+r$. Trừ hai đẳng thức: $u_{k+1}-u^\star\le q(u_k-u^\star)$. Quy nạp với $q\ge0$ cho $u_k-u^\star\le q^k(u_0-u^\star)$, là bất đẳng thức đầu. Bất đẳng thức sau bỏ $-q^ku^\star\le0$. Khi giả thiết là đẳng thức, mọi bước là đẳng thức. $\square$
:::

::: theorem Định lý 05b.36 (SGD bước hằng trên hàm lồi mạnh; T5)
**Giả thiết.** $f$ thỏa H2 với hằng số $L$ và H3 với hằng số $\mu$; $x^*$ là điểm cực tiểu, $x_0$ tất định, $D=\lVert x_0-x^*\rVert$. Dãy của Thuật toán 05b.2 thỏa H6 và H6b, với bước hằng $0<\eta\le\tfrac1L$.

**Kết luận.** Với mọi $k\ge0$,

$$
a_k=\mathbb E\lVert x_k-x^*\rVert^2\le(1-\eta\mu)^kD^2+\frac{\eta\sigma^2}\mu .
\tag{5.4}
$$

**Điều kiện áp dụng.** H6b chỉ cần đúng tại các điểm lặp thực sự xuất hiện.

**Phạm vi.** Số hạng $\tfrac{\eta\sigma^2}\mu$ không giảm theo $k$; nó gọi là sàn nhiễu (noise floor). Với $\sigma=0$, định lý cho GD bước $\eta$ hệ số co $1-\eta\mu$, và với $\eta=\tfrac1L$ là Định lý 05b.18(a).
:::

::: proof Chứng minh Định lý 05b.36
Viết $g_k$ cho vectơ cập nhật và $\nabla_k=\nabla f(x_k)$.

**Bước 1 (đồng nhất thức, kỳ vọng có điều kiện).**

Bổ đề 05b.9 với $z=x^*$, lấy $\mathbb E[\cdot\mid\mathcal F_k]$; Mệnh đề 05b.30(b) và H6 cho số hạng giữa, Bổ đề 05b.32 và H6b cho số hạng cuối:

$$
\mathbb E[d_{k+1}^2\mid\mathcal F_k]\le d_k^2-2\eta\,\nabla_k^T(x_k-x^*)+\eta^2\bigl(\lVert\nabla_k\rVert^2+\sigma^2\bigr).
$$

**Bước 2 (H3 và H2 chặn hai số hạng chứa gradient).**

Hệ quả 05b.10(b) cho $\nabla_k^T(x_k-x^*)\ge e_k+\tfrac\mu2d_k^2$; Bổ đề 05b.7 với $f_{\inf}=f^*$ cho $\lVert\nabla_k\rVert^2\le2Le_k$. Thay vào:

$$
\begin{aligned}
\mathbb E[d_{k+1}^2\mid\mathcal F_k]&\le d_k^2-2\eta e_k-\eta\mu d_k^2+2L\eta^2e_k+\eta^2\sigma^2\\
&=(1-\eta\mu)d_k^2-2\eta(1-\eta L)e_k+\eta^2\sigma^2 .
\end{aligned}
$$

**Bước 3 (dùng $\eta\le\tfrac1L$ rồi lấy kỳ vọng).**

$1-\eta L\ge0$ và $e_k\ge0$, nên bỏ số hạng $-2\eta(1-\eta L)e_k$. Lấy kỳ vọng hai vế và dùng Mệnh đề 05b.30(a):

$$
a_{k+1}\le(1-\eta\mu)a_k+\eta^2\sigma^2 .
\tag{5.5}
$$

**Bước 4 (giải đệ quy).**

$q=1-\eta\mu\in[0,1)$, vì $0<\eta\mu\le\tfrac\mu L\le1$.

Bổ đề 05b.35 với $r=\eta^2\sigma^2$, $\tfrac r{1-q}=\tfrac{\eta^2\sigma^2}{\eta\mu}=\tfrac{\eta\sigma^2}\mu$ và $a_0=D^2$ cho (5.4). $\square$
:::

Định lý 05b.36 đọc như sau: số hạng thứ nhất co tuyến tính như GD; số hạng thứ hai tỉ lệ thuận với bước và phương sai, tỉ lệ nghịch với độ cong. Giảm $\eta$ hạ sàn nhiễu nhưng làm hệ số co $1-\eta\mu$ tiến gần $1$; không bước hằng nào vừa co nhanh vừa có sàn thấp.

Định lý dùng H6b, không dùng H6a, nên không vướng mâu thuẫn của Nhận xét 05b.33. Niu (2024, Định lý 29, tr. 114) phát biểu cùng dạng cận dưới một giả thiết tổng quát hơn H6b.

::: example Ví dụ 05b.19 (Sàn nhiễu và giá trị giới hạn trên ví dụ dẫn A)
**Dữ kiện.**

Ví dụ dẫn A, nhóm một mẫu, bước $\eta=0{,}1$, $\theta_0=0$: $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$ có $\mu=L=1$, $D=1$, và H6b đúng với $\sigma^2=\tfrac83$ (Ví dụ 05b.17). Ví dụ 05b.2 cho giá trị chính xác $a_k=\tfrac8{57}+\tfrac{49}{57}(0{,}81)^k$. Định lý 05b.36: $a_k\le(1-\eta\mu)^kD^2+\tfrac{\eta\sigma^2}\mu$.

**Kiểm giả thiết.**

$\eta=0{,}1$ không vượt $\tfrac1L=1$; H2, H3 đúng với $L=\mu=1$; H6 đúng theo Định lý 05.11.

**Cận và giá trị chính xác.**

Cận là $0{,}9^k+\tfrac{0{,}1\cdot8/3}1=0{,}9^k+0{,}2\overline6$.

| $k$ | $0$ | $1$ | $10$ | $20$ | $40$ | $\infty$ |
|---|---:|---:|---:|---:|---:|---:|
| cận | $1{,}267$ | $1{,}167$ | $0{,}615$ | $0{,}388$ | $0{,}281$ | $0{,}267$ |
| $a_k$ chính xác | $1$ | $0{,}837$ | $0{,}245$ | $0{,}153$ | $0{,}141$ | $0{,}140$ |

**Kiểm tra lại.**

Ở ví dụ này $e_k=\tfrac12d_k^2$ và $L=\mu=1$, nên số hạng bị bỏ ở Bước 3 bằng $-2\eta(1-\eta)\cdot\tfrac12d_k^2=-\eta(1-\eta)d_k^2$. Giữ nó lại, hệ số trước $d_k^2$ là $(1-\eta)-\eta(1-\eta)=(1-\eta)^2=0{,}81$, đúng hệ số của đệ quy chính xác; Bước 2 khi đó là đẳng thức.
:::

![Đồ thị theo k từ 0 đến 40. Đường trên là cận của định lý 0,9^k + 0,267, giảm về sàn nhiễu 0,267 (nét đứt); đường dưới là kỳ vọng chính xác, giảm về giá trị giới hạn 0,140 (nét đứt). Tại k = 20 hai đường có giá trị 0,388 và 0,153.](img/lec-05b/vda-sgd-bound-vs-exact.svg)

Hình đặt cận và giá trị chính xác trên cùng trục. Cận đúng ở mọi $k$ nhưng sàn nhiễu $0{,}267$ gần gấp đôi giá trị giới hạn $0{,}140$. Ở hai bước đầu, cận còn lớn hơn cả $a_0=1$.

::: remark Nhận xét 05b.37 (Tỉ số giữa sàn nhiễu và giá trị giới hạn)
Với hàm bậc hai một chiều độ cong $\mu$ và nhiễu cộng có phương sai không đổi $\sigma^2$, phép lặp $\theta_{k+1}-\theta^*=(1-\eta\mu)(\theta_k-\theta^*)+\eta\xi_k$ cho đệ quy chính xác $a_{k+1}=(1-\eta\mu)^2a_k+\eta^2\sigma^2$, với giới hạn

$$
\frac{\eta^2\sigma^2}{1-(1-\eta\mu)^2}=\frac{\eta\sigma^2}{\mu(2-\eta\mu)}.
$$

Khi $\eta\mu$ nhỏ, giới hạn xấp xỉ $\tfrac{\eta\sigma^2}{2\mu}$, nửa sàn nhiễu của (5.4). Thừa số $2$ mất ở Bước 3 của chứng minh, nơi số hạng $-2\eta(1-\eta L)e_k$ bị bỏ. Với nhóm $b=4$ ở ví dụ dẫn A, $\sigma^2=\tfrac23$, giới hạn chính xác là $\tfrac{0{,}1\cdot2/3}{1{,}9}\approx0{,}0351$ và sàn nhiễu là $\approx0{,}0667$: tăng cỡ nhóm bốn lần hạ cả hai bốn lần.
:::

**Trong học máy.** Sàn nhiễu (5.4) giải thích quan sát của Bài 05: với bước học cố định, mất mát dao động quanh nghiệm ở một mức tỉ lệ với bước học và với phương sai của gradient nhóm, $\operatorname{tr}\Sigma/b$. Ba cách hạ mức đó tương ứng ba số hạng: giảm $\eta$, tăng $b$, hoặc tăng $\mu$ bằng chính quy hóa. H3 chỉ đúng với mô hình lồi mạnh như hồi quy logistic có chính quy hóa; với mạng sâu, Mục 6 thay $d_k$ bằng chuẩn gradient.

### 5.6 Lịch giảm bước

Với bước hằng, cận (5.4) không xuống dưới $\tfrac{\eta\sigma^2}\mu$. Ở ví dụ dẫn A ($\mu=1$, $\sigma^2=\tfrac83$, $D^2=1$), muốn cận $(1-\eta)^k+\tfrac{8\eta}3$ đạt $0{,}01$ bằng một bước hằng, phải có $\tfrac{8\eta}3<0{,}01$. Chia đều sai số, sàn $0{,}005$ ứng với $\eta=0{,}001875$, và số hạng co cần $k\ge\tfrac{\log200}{-\log(1-0{,}001875)}\approx2823{,}1$, tức $2824$ bước. Tối ưu theo $\eta$, bước hằng tốt nhất là $\eta\approx0{,}0032$, cần $2034$ bước.

Bước lớn có ích khi sai số còn lớn, bước nhỏ có ích khi sai số đã xuống cỡ sàn nhiễu. Lịch bước (step schedule, learning-rate schedule) theo pha dùng bước lớn trước và chia đôi bước mỗi khi sai số chạm sàn của bước hiện tại.

::: corollary Hệ quả 05b.38 (Lịch chia đôi bước)
**Giả thiết.** Như Định lý 05b.36: H2, H3, H6, H6b; $x_0$ tất định, $D=\lVert x_0-x^*\rVert$. Bước đầu $0<\eta^{(0)}\le\tfrac1L$, độ chính xác đích $0<\varepsilon<\tfrac{\eta^{(0)}\sigma^2}\mu$. Pha $m=0,1,2,\ldots$ dùng bước hằng $\eta^{(m)}=\eta^{(0)}2^{-m}$ trong $T_m$ bước, với sàn nhiễu $\omega_m=\eta^{(m)}\sigma^2/\mu$ và

$$
T_0=\Bigl\lceil\frac{\max\{\log(D^2/\omega_0),0\}}{\eta^{(0)}\mu}\Bigr\rceil,\qquad T_m=\Bigl\lceil\frac{\log4}{\eta^{(m)}\mu}\Bigr\rceil\ (m\ge1).
$$

**Kết luận.**

- (a) Cuối pha $m$, kỳ vọng bình phương khoảng cách không vượt $2\omega_m$.
- (b) Gọi $M$ là chỉ số nhỏ nhất với $2\omega_M\le\varepsilon$. Tổng số bước tới cuối pha $M$ không vượt

$$
\frac{\max\{\log(D^2/\omega_0),0\}}{\eta^{(0)}\mu}+\frac{8\log4\,\sigma^2}{\mu^2\varepsilon}+\log_2\frac{8\omega_0}\varepsilon .
$$

**Điều kiện áp dụng.** Cần biết $\mu$, $\sigma^2$, $D$ (hoặc cận trên của chúng) để đặt độ dài pha.

**Phạm vi.** Số bước có bậc $O\bigl(\tfrac1{\mu\eta^{(0)}}\log\tfrac{D^2}\varepsilon+\tfrac{\sigma^2}{\mu^2\varepsilon}\bigr)$: sai số kỳ vọng giảm như $1/k$ khi $k$ lớn.
:::

::: proof Chứng minh Hệ quả 05b.38
**Bước 1 (một pha).**

Đệ quy (5.5) ở Bước 3 của chứng minh Định lý 05b.36 chỉ dùng giả thiết tại $x_k$ và bước đang dùng, nên đúng ở mọi bước của mọi pha. Bổ đề 05b.35 cho: nếu một pha dùng bước $\eta\le\tfrac1L$ trong $T$ bước và bắt đầu với kỳ vọng bình phương khoảng cách $A$, thì cuối pha kỳ vọng đó không vượt $(1-\eta\mu)^TA+\tfrac{\eta\sigma^2}\mu$. Mọi $\eta^{(m)}\le\eta^{(0)}\le\tfrac1L$. Ngoài ra $(1-t)^T\le\exp(-tT)$ với $t\in[0,1]$.

**Bước 2 (pha 0).**

$(1-\eta^{(0)}\mu)^{T_0}D^2\le\exp(-\eta^{(0)}\mu T_0)D^2\le\omega_0$ theo cách chọn $T_0$, nên cuối pha $0$ kỳ vọng không vượt $2\omega_0$.

**Bước 3 (pha $m\ge1$).**

Pha bắt đầu với kỳ vọng không vượt $2\omega_{m-1}=4\omega_m$. Theo cách chọn $T_m$, $(1-\eta^{(m)}\mu)^{T_m}\cdot4\omega_m\le\exp(-\log4)\cdot4\omega_m=\omega_m$, nên cuối pha kỳ vọng không vượt $2\omega_m$. Quy nạp cho (a).

**Bước 4 (số pha).**

$2\omega_m=2\omega_02^{-m}$. Vì $\varepsilon<\omega_0$, $M\ge2$; tính nhỏ nhất của $M$ cho $2\omega_02^{-(M-1)}>\varepsilon$, tức $2^{M+1}<\tfrac{8\omega_0}\varepsilon$.

**Bước 5 (tổng số bước).**

Dùng $\lceil t\rceil\le t+1$ và $\tfrac1{\eta^{(m)}}=\tfrac{2^m}{\eta^{(0)}}$:

$$
\begin{aligned}
\sum_{m=0}^MT_m&\le\frac{\max\{\log(D^2/\omega_0),0\}}{\eta^{(0)}\mu}+1+\sum_{m=1}^M\Bigl(\frac{2^m\log4}{\eta^{(0)}\mu}+1\Bigr)\\
&\le\frac{\max\{\log(D^2/\omega_0),0\}}{\eta^{(0)}\mu}+\frac{2^{M+1}\log4}{\eta^{(0)}\mu}+M+1 .
\end{aligned}
$$

Bước 4 cho $\tfrac{2^{M+1}}{\eta^{(0)}}<\tfrac{8\omega_0}{\eta^{(0)}\varepsilon}=\tfrac{8\sigma^2}{\mu\varepsilon}$ và $M+1<\log_2\tfrac{8\omega_0}\varepsilon$, cho (b). $\square$
:::

Pha $m$ dài khoảng $2^m\log4/(\eta^{(0)}\mu)$ bước, gấp đôi pha trước, nên tổng độ dài do pha cuối chi phối, và pha cuối có độ dài tỉ lệ $1/\varepsilon$. Sra, Nowozin và Wright (2011, Mệnh đề 5.4, tr. 133) dùng cùng ý tưởng khởi động lại theo pha cho hàm lồi mạnh không trơn.

::: example Ví dụ 05b.20 (Lịch chia đôi bước trên ví dụ dẫn A)
**Dữ kiện.**

Ví dụ dẫn A, nhóm một mẫu: $\mu=L=1$, $\sigma^2=\tfrac83$, $D^2=1$. Bước đầu $\eta^{(0)}=0{,}1$, đích $\varepsilon=0{,}01$. Hệ quả 05b.38: $\omega_m=\eta^{(m)}\sigma^2/\mu$, $T_0=\lceil\max\{\log(D^2/\omega_0),0\}/(\eta^{(0)}\mu)\rceil$, $T_m=\lceil\log4/(\eta^{(m)}\mu)\rceil$.

**Các pha.**

$\omega_0=0{,}2\overline6$; $\log(1/0{,}2\overline6)\approx1{,}322$, nên $T_0=14$. $T_m=\lceil13{,}86\cdot2^m\rceil$ cho $28$, $56$, $111$, $222$, $444$, $888$ với $m=1,\ldots,6$. Chỉ số $M$ nhỏ nhất với $2\omega_02^{-M}\le0{,}01$ là $M=6$.

**Tổng.**

$14+28+56+111+222+444+888=1763$ bước, so với $2034$ bước của bước hằng tốt nhất cho cùng cận và $2824$ bước của bước hằng $0{,}001875$. Vế phải của (b) bằng khoảng $2978$, không nhỏ hơn $1763$.

**Kiểm tra lại.**

Chạy đệ quy chính xác $a_{k+1}=(1-\eta)^2a_k+\eta^2\tfrac83$ theo lịch này cho $a_{1763}\approx0{,}0022\le0{,}01$; cận của hệ quả bảo đảm $0{,}01$ nhưng giá trị thật thấp hơn khoảng bốn lần, vì giới hạn thật bằng nửa sàn nhiễu (Nhận xét 05b.37).
:::

![Hai tầng cùng trục k từ 0 đến 120. Tầng trên: bước η theo k, bậc thang giảm từ 0,1, mỗi pha một nửa bước trước. Tầng dưới: cận của định lý theo pha (đường liền) co về sàn nhiễu ησ²/μ của từng pha (nét đứt), sàn nhiễu giảm một nửa ở mỗi lần chuyển pha.](img/lec-05b/step-halving-schedule.svg)

Hình vẽ ba pha đầu của lịch trên ví dụ dẫn A. Hình dùng nghiệm đúng của đệ quy (5.5), $a\le q^T(A-\omega_m)+\omega_m$ theo Bổ đề 05b.35, và chuyển pha khi số hạng co $q^T(A-\omega_m)$ không vượt sàn $\omega_m$; các pha kết thúc tại $k=10$, $31$, $75$. Độ dài pha ở hình khác $T_m$ của Hệ quả 05b.38, vốn được chọn để chứng minh gọn.

**Trong học máy.** Lịch giảm bước học theo bậc thang (step decay), chia bước cho một hằng số sau một số lượt qua dữ liệu, có cùng cấu trúc với Hệ quả 05b.38; độ dài mỗi bậc được chọn theo kinh nghiệm thay vì theo $\mu$ và $\sigma^2$. Tình huống 05b.2 so lịch chia đôi với các bước hằng trên một bài bình phương nhỏ nhất.

Lịch theo pha cần biết lúc chuyển pha. Một công thức bước cố định theo $k$ tránh việc đó. Với H6a, kỳ vọng có điều kiện của đồng nhất thức một bước và Hệ quả 05b.10(b) cho đệ quy

$$
a_{k+1}\le(1-2\mu\eta_k)a_k+\eta_k^2G^2 .
\tag{5.6}
$$

Mức cân bằng của nó, nơi tiến bộ $2\mu\eta_ka$ bằng nhiễu $\eta_k^2G^2$, là $a=\eta_kG^2/(2\mu)$ và giảm về $0$ cùng $\eta_k$.

::: theorem Định lý 05b.39 (Bước giảm dần $\tfrac1{\mu(k+1)}$ cho hàm lồi mạnh; T6)
**Giả thiết.** $f$ thỏa H3 với hằng số $\mu$ (không cần H2); dãy của Thuật toán 05b.2 thỏa H6, và H6a trên một vùng chứa mọi điểm lặp; bước $\eta_k=\dfrac1{\mu(k+1)}$.

**Kết luận.** Với mọi $k\ge1$,

$$
a_k=\mathbb E\lVert x_k-x^*\rVert^2\le\frac{G^2}{\mu^2k}.
\tag{5.7}
$$

**Điều kiện áp dụng.** Cần biết $\mu$; H6a chỉ cần trên vùng chứa dãy lặp, vì H6a và H3 không cùng đúng toàn cục (Nhận xét 05b.33).

**Phạm vi.** Bước phụ thuộc $\mu$: cận chỉ đúng khi dùng đúng hằng số lồi mạnh, và H6a chỉ cần trên vùng chứa dãy lặp. Cận không chứa $D^2$.
:::

::: proof Chứng minh Định lý 05b.39
**Bước 1 (đệ quy).**

Bổ đề 05b.9 với $z=x^*$, lấy $\mathbb E[\cdot\mid\mathcal F_k]$: Mệnh đề 05b.30(b) và H6 cho số hạng giữa bằng $-2\eta_k\nabla f(x_k)^T(x_k-x^*)$, H6a chặn số hạng cuối bởi $\eta_k^2G^2$. Hệ quả 05b.10(b) cho $\nabla f(x_k)^T(x_k-x^*)\ge\mu d_k^2$. Lấy kỳ vọng toàn phần được (5.6); bất đẳng thức đúng với mọi dấu của $1-2\mu\eta_k$, vì nó không nhân hai vế với hệ số đó.

**Bước 2 (thế bước).**

Đặt $C=\tfrac{G^2}{\mu^2}$. Với $\eta_k=\tfrac1{\mu(k+1)}$, $1-2\mu\eta_k=\tfrac{k-1}{k+1}$ và $\eta_k^2G^2=\tfrac C{(k+1)^2}$:

$$
a_{k+1}\le\frac{k-1}{k+1}\,a_k+\frac C{(k+1)^2}.
$$

**Bước 3 (cơ sở $k=1$).**

Với $k=0$, hệ số bằng $-1$, nên $a_1\le-a_0+C\le C$ vì $a_0\ge0$.

**Bước 4 (bước quy nạp).**

Giả sử $a_k\le\tfrac Ck$ với một $k\ge1$. Hệ số $\tfrac{k-1}{k+1}\ge0$, nên được thay $a_k$ bởi cận của nó:

$$
\begin{aligned}
a_{k+1}&\le C\Bigl(\frac{k-1}{k(k+1)}+\frac1{(k+1)^2}\Bigr)\\
&=C\,\frac{k^2+k-1}{k(k+1)^2}\\
&\le C\,\frac{k^2+k}{k(k+1)^2}\\
&=\frac C{k+1}.
\end{aligned}
$$

Dòng thứ hai quy đồng mẫu $k(k+1)^2$: $(k-1)(k+1)+k=k^2+k-1$. $\square$
:::

Chứng minh theo cùng lập luận với Nemirovski, Juditsky, Lan và Shapiro (2009, mục 2.1). Cận không chứa $D^2$ vì bước đầu $\eta_0=\tfrac1\mu$ cho hệ số $1-2\mu\eta_0=-1$ trong (5.6).

So với Hệ quả 05b.38, định lý không cần H2 và không cần chọn thời điểm chuyển pha, đổi lại phải biết đúng $\mu$: với ước lượng $\mu$ lớn hơn giá trị thật, bước giảm quá nhanh và tốc độ có thể chậm hơn nhiều so với $1/k$ (Nemirovski và cộng sự 2009, mục 2.1).

**Trong học máy.** Lịch $\eta_k\propto\tfrac1k$ dùng được khi mất mát lồi mạnh nhờ chính quy hóa, như hồi quy logistic có $\tfrac\nu2\lVert x\rVert^2$, với $\mu=\nu$ biết trước; khi đó không phải chọn thời điểm giảm bước. Với mạng sâu không có $\mu$, lịch này không có cơ sở từ định lý.

::: example Ví dụ 05b.21 (Bước $\tfrac1{k+1}$ với nhóm hai mẫu trên ví dụ dẫn A)
**Dữ kiện.**

Ví dụ dẫn A: $y=(-1,1,3)$, $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, $\mu=1$, gradient mẫu $\theta-y_i$. Nhóm $b=2$ có hoàn lại; $\bar y_k$ là trung bình hai quan sát rút ở bước $k$, với kỳ vọng $1$ và phương sai $\tfrac83\cdot\tfrac12=\tfrac43$. Bước $\eta_k=\tfrac1{k+1}$, $\theta_0=0$. Định lý 05b.39: $a_k\le\tfrac{G^2}{\mu^2k}$.

**Dãy lặp là trung bình mẫu.**

$\theta_{k+1}=\theta_k-\tfrac{\theta_k-\bar y_k}{k+1}=\tfrac{k\theta_k+\bar y_k}{k+1}$. Với $k=0$, $\theta_1=\bar y_0$; quy nạp cho $\theta_k$ là trung bình của $\bar y_0,\ldots,\bar y_{k-1}$, tức trung bình của $2k$ quan sát rút độc lập.

**Giá trị chính xác.**

$a_k=\operatorname{Var}\theta_k=\tfrac{8/3}{2k}$, tức $\tfrac4{3k}$.

**Hằng số $G^2$ và cận.**

Mọi $\theta_k$ nằm trong $[-1,3]$. Trên đoạn này, (5.1) cho

$$
\begin{aligned}
\mathbb E[g^2\mid\theta]&=(\theta-1)^2+\tfrac43\\
&\le4+\tfrac43=\tfrac{16}3,
\end{aligned}
$$

nên H6a đúng trên vùng chứa dãy lặp với $G^2=\tfrac{16}3$. Cận (5.7) là $\tfrac{16}{3k}$, gấp $4$ lần giá trị chính xác.

**Kiểm tra lại.**

Với $k=1$: $\theta_1=\bar y_0$ có phương sai $\tfrac43$, khớp $\tfrac4{3\cdot1}$. Bước $\tfrac1{k+1}$ thỏa điều kiện Robbins–Monro của Hệ quả 05b.28.
:::

### 5.7 Bảo đảm theo xác suất cho một lần chạy

Các cận của Mục 5.4 đến 5.6 nói về kỳ vọng trên mọi lần chạy; một phiên huấn luyện chỉ là một lần chạy. Bổ đề sau chuyển cận kỳ vọng của một đại lượng không âm thành cận xác suất.

::: lemma Bổ đề 05b.40 (Bất đẳng thức Markov)
**Giả thiết.** $Z\ge0$ là biến ngẫu nhiên có kỳ vọng hữu hạn; $\varepsilon>0$.

**Kết luận.** $\mathbb P(Z\ge\varepsilon)\le\dfrac{\mathbb EZ}\varepsilon$.

**Điều kiện áp dụng.** $Z$ không âm.

**Phạm vi.** Cận chỉ dùng kỳ vọng, nên thường lỏng; nó vô ích khi $\varepsilon\le\mathbb EZ$.
:::

::: proof Chứng minh Bổ đề 05b.40
Với mọi kết cục, $Z\ge\varepsilon\,\mathbf 1\{Z\ge\varepsilon\}$: nếu $Z\ge\varepsilon$ thì vế phải bằng $\varepsilon$, nếu không thì vế phải bằng $0\le Z$. Lấy kỳ vọng hai vế: $\mathbb EZ\ge\varepsilon\,\mathbb P(Z\ge\varepsilon)$. $\square$
:::

Áp Bổ đề 05b.40 cho các đại lượng không âm mà các định lý đã chặn kỳ vọng được cận xác suất: với giả thiết của Định lý 05b.34 và bước hằng tối ưu, $\mathbb P\bigl(f(\bar x_K)-f^*\ge\varepsilon\bigr)\le\tfrac{DG}{\varepsilon\sqrt K}$; với giả thiết của Định lý 05b.36, $\mathbb P(d_k^2\ge\varepsilon)\le\tfrac{a_k}\varepsilon$.

::: example Ví dụ 05b.22 (Cận Markov và xác suất chính xác trên ví dụ dẫn A)
**Dữ kiện.**

Ví dụ dẫn A, bước $0{,}1$, nhóm một mẫu, $\theta_0=0$. Chín lá $\theta_2$ đồng xác suất $\tfrac19$ với $(\theta_2-1)^2$ bằng $1{,}4161$; $0{,}9801$; $0{,}6241$; $1{,}0201$; $0{,}6561$; $0{,}3721$; $0{,}6889$; $0{,}3969$; $0{,}1849$, và $a_2\approx0{,}7044$, $a_{20}\approx0{,}153$ (Ví dụ 05b.16, 05b.2). Bổ đề 05b.40: $\mathbb P(Z\ge\varepsilon)\le\mathbb EZ/\varepsilon$.

**Tại $k=2$, ngưỡng $0{,}9$.**

Ba lá có $(\theta_2-1)^2\ge0{,}9$: $1{,}4161$; $0{,}9801$; $1{,}0201$. Xác suất chính xác là $\tfrac39=\tfrac13$. Cận Markov là $\tfrac{0{,}7044}{0{,}9}\approx0{,}78$.

**Tại $k=20$, ngưỡng $0{,}5$.**

$\mathbb P\bigl((\theta_{20}-1)^2\ge0{,}5\bigr)\le\tfrac{0{,}153}{0{,}5}\approx0{,}31$.

**Kiểm tra lại.**

$\tfrac13\le0{,}78$, đúng chiều; cận lỏng hơn hai lần vì Markov chỉ dùng kỳ vọng, không dùng hình dạng phân phối.
:::

Một kết quả mạnh hơn được nêu, không chứng minh: với mục tiêu là tổng các hàm lồi có dưới gradient bị chặn, lấy mẫu ngẫu nhiên đều và bước $\eta_k\to0$, $\sum_k\eta_k=\infty$, giới hạn dưới của $f(x_k)$ bằng $f^*$ với xác suất $1$ (Bertsekas trong Sra, Nowozin và Wright 2011, Mệnh đề 4.8, tr. 110). Chứng minh dùng định lý hội tụ siêu martingale, nằm ngoài phạm vi học phần. Bài 05c cho các bất đẳng thức tập trung chặt hơn Markov, như Chebyshev và Hoeffding, khi biết thêm phương sai hoặc miền giá trị.

::: exercise Bài tập 05b.5 (Cỡ nhóm cho một sàn nhiễu đích)
Ví dụ dẫn A với nhóm $b$ mẫu có hoàn lại và bước hằng $\eta=0{,}05$: $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, $\mu=L=1$, phương sai gradient một mẫu bằng $\tfrac83$.

- (a) Tính sàn nhiễu của Định lý 05b.36 theo $b$, và $b$ nhỏ nhất để sàn nhiễu không vượt $0{,}01$.
- (b) Dùng Nhận xét 05b.37 để tính giá trị giới hạn chính xác theo $b$, và $b$ nhỏ nhất để giá trị này không vượt $0{,}01$.
- (c) Với $b$ ở (a), mỗi bước tốn $b$ gradient mẫu. Tính chi phí của $100$ bước và so với $100$ bước GD đầy đủ trên ba quan sát.
- (d) Với $b=14$, $\theta_0=0$ và $k=200$, dùng cận của Định lý 05b.36 và Bổ đề 05b.40 để chặn $\mathbb P\bigl((\theta_{200}-1)^2\ge0{,}05\bigr)$.
:::

::: hint Gợi ý Bài tập 05b.5
$\sigma^2=\tfrac8{3b}$. Sàn nhiễu là $\tfrac{\eta\sigma^2}\mu$, giá trị giới hạn là $\tfrac{\eta\sigma^2}{\mu(2-\eta\mu)}$. Ở (d), $D^2=(\theta_0-1)^2=1$ và Markov cho $\mathbb P(Z\ge\varepsilon)\le\mathbb EZ/\varepsilon$.
:::

::: solution Lời giải Bài tập 05b.5
**Câu (a).**

Sàn nhiễu $\tfrac{0{,}05\cdot8}{3b}=\tfrac{2}{15b}\approx\tfrac{0{,}1333}b$. Điều kiện $\tfrac{0{,}1333}b\le0{,}01$ cho $b\ge13{,}33$, tức $b=14$.

**Câu (b).**

Giới hạn $\tfrac{0{,}1333}{1{,}95b}\approx\tfrac{0{,}06838}b$. Điều kiện $\le0{,}01$ cho $b\ge6{,}84$, tức $b=7$.

**Câu (c).**

$100$ bước với $b=14$ tốn $1400$ gradient mẫu; $100$ bước GD đầy đủ tốn $300$. Với $N=3$, nhóm lớn hơn $N$ không có ích: GD đầy đủ không có nhiễu. Lợi thế của SGD chỉ xuất hiện khi $b\ll N$.

**Câu (d).**

Định lý 05b.36 với $\eta\mu=0{,}05$:

$$
\begin{aligned}
a_{200}&\le0{,}95^{200}+\tfrac{0{,}1333}{14}\\
&\approx0{,}000035+0{,}00952\approx0{,}00956 .
\end{aligned}
$$

Bổ đề 05b.40 cho $\mathbb P\bigl((\theta_{200}-1)^2\ge0{,}05\bigr)\le\tfrac{0{,}00956}{0{,}05}\approx0{,}19$.

**Kiểm tra lại.**

Với $b=13$: sàn $\approx0{,}01026>0{,}01$; với $b=6$: giới hạn $\approx0{,}0114>0{,}01$. Cận (a) đòi gấp đôi cỡ nhóm so với giá trị chính xác (b), đúng thừa số của Nhận xét 05b.37. Ở (d), đệ quy chính xác $a_{k+1}=0{,}9025\,a_k+0{,}0025\cdot\tfrac8{42}$ cho $a_{200}\approx0{,}00488$, nên Markov với giá trị chính xác cho $0{,}098$.
:::

**Chuỗi suy luận của mục.**

1. Thuật toán 05b.2 và Ví dụ 05b.15 cho thấy bất đẳng thức một bước chỉ còn đúng theo kỳ vọng.
2. Định nghĩa 05b.29 và Mệnh đề 05b.30 cho ba quy tắc tính kỳ vọng theo lịch sử.
3. Định nghĩa 05b.31 đặt H6, H6a, H6b; Bổ đề 05b.32 nối hai kiểu chặn.
4. Chứng minh của Định lý 05b.26 lấy kỳ vọng có điều kiện cho Định lý 05b.34.
5. Hệ quả 05b.10(b), Bổ đề 05b.7 và Bổ đề 05b.35 cho Định lý 05b.36 với sàn nhiễu; Hệ quả 05b.38 và Định lý 05b.39 đưa sai số kỳ vọng về $0$.
6. Bổ đề 05b.40 chuyển các cận kỳ vọng thành cận xác suất.

Đích của mục là Định lý 05b.36 cùng sàn nhiễu và các lịch bước làm sàn đó biến mất.

**Kết mục.** Mục này cho các định lý hội tụ của SGD cho hàm lồi (Định lý 05b.34) và lồi mạnh (Định lý 05b.36, Hệ quả 05b.38, Định lý 05b.39), cùng cận xác suất (Bổ đề 05b.40). Mọi chứng minh dùng tính lồi qua Hệ quả 05b.10 hoặc 05b.23, với $x^*$ xuất hiện trong hàm thế $d_k^2$. Mất mát của mạng nơ ron không lồi, nên cả hàm thế lẫn hệ quả đó mất nghĩa. Mục 6 đổi hàm thế sang $f(x_k)-f_{\inf}$, chỉ dùng bổ đề giảm, và nhận một kết luận yếu hơn: chuẩn gradient nhỏ.


## 6. Mục tiêu không lồi và chuẩn gradient

Mọi định lý của Mục 3 đến Mục 5 dùng tính lồi qua Hệ quả 05b.10 hoặc 05b.23, và dùng điểm cực tiểu $x^*$ trong hàm thế $d_k^2$. Mất mát của mạng nơ ron nhiều lớp không lồi và thường có nhiều điểm cực tiểu, nên cả hai thành phần đó mất nghĩa. Trên ví dụ dẫn D, GD xuất phát tại $\theta_0=0$ đứng yên ở cực đại địa phương với sai số giá trị $\tfrac14$, dù gradient bằng $0$.

Mục này bỏ H1, H3, H4, chỉ giữ H0 và H2; công cụ còn lại là bổ đề giảm, vốn không cần tính lồi. Kết luận thu được yếu hơn: chuẩn gradient nhỏ, tức hội tụ tới điểm dừng. Mục 6.5 thay tính lồi mạnh bằng một giả thiết yếu hơn, không đòi lồi, để có lại tốc độ tuyến tính.

### 6.1 Nhu cầu: hệ quả của tính lồi sai với hàm hai đáy

::: example Ví dụ 05b.23 (Ví dụ dẫn D: bất đẳng thức của Hệ quả 05b.10 sai)
**Dữ kiện.**

$F(\theta)=\tfrac14(\theta^2-1)^2$ trên $\mathbb R$, $F'(\theta)=\theta^3-\theta$, $F''(\theta)=3\theta^2-1$. Hai điểm cực tiểu toàn cục $\pm1$ với $F=0$, cực đại địa phương $0$ với $F(0)=\tfrac14$. Hệ quả 05b.10(a) cho hàm lồi: $F'(\theta)(\theta-\theta^*)\ge F(\theta)-F^*$.

**Kiểm tại $\theta=-0{,}5$ với $\theta^*=1$.**

$F'(-0{,}5)=-0{,}125+0{,}5=0{,}375$ và $F(-0{,}5)=\tfrac14(0{,}25-1)^2=0{,}140625$. Vế trái là $0{,}375\cdot(-1{,}5)=-0{,}5625$, nhỏ hơn vế phải $0{,}140625$: bất đẳng thức sai.

**Hai hiện tượng khác.**

- Với $\theta^*=-1$, vế trái là $0{,}375\cdot0{,}5=0{,}1875\ge0{,}1406$: tại cùng một điểm, bất đẳng thức đúng hay sai tùy điểm cực tiểu được chọn, nên $d_k$ không xác định một cách duy nhất.
- Từ $\theta_0=0$, mọi bước GD giữ $\theta_k=0$ vì $F'(0)=0$; sai số giá trị đứng ở $\tfrac14$.

**Kiểm tra lại.**

$F''(0)=-1<0$, nên $F$ không lồi. Tiếp tuyến tại $-0{,}5$ có giá trị $0{,}140625+0{,}375\cdot1{,}5\approx0{,}70$ tại $\theta=1$, lớn hơn $F(1)=0$: tiếp tuyến nằm trên đồ thị ở đó, điều mà H1 cấm.
:::

![Đồ thị F(θ) = ¼(θ² − 1)² quanh đoạn từ −1 đến 1: hai cực tiểu tại −1 và 1, cực đại tại θ = 0 với giá trị 0,25. Tiếp tuyến tại θ = −0,5 được vẽ; tại θ = 1 nó có giá trị khoảng 0,70, nằm trên đồ thị.](img/lec-05b/quartic-nonconvex.svg)

Hình cho thấy tiếp tuyến tại $-0{,}5$ cắt lên trên đồ thị ở phía đáy bên phải. Với hàm lồi, mọi tiếp tuyến nằm dưới đồ thị, và đó là nội dung của Hệ quả 05b.10(a). Chuẩn gradient vẫn dùng được làm thước đo, vì nó chỉ cần thông tin tại điểm hiện tại; nó là tiêu chí dừng của Thuật toán 04.1 và là đại lượng được chặn trong mục này.

### 6.2 Hàm thế không cần điểm cực tiểu

Khi $f$ không lồi, hàm thế $d_k^2$ được thay bằng độ cao trên cận dưới $\Delta_k=f(x_k)-f_{\inf}$, không âm theo H0 (Định nghĩa 05b.14). Bổ đề 05b.6 không dùng tính lồi; trừ $f_{\inf}$ hai vế của nó với $0<\eta\le\tfrac1L$ cho bất đẳng thức một bước

$$
\Delta_{k+1}\le\Delta_k-\frac\eta2\lVert\nabla f(x_k)\rVert^2 .
\tag{6.1}
$$

Tiến bộ mỗi bước là bình phương chuẩn gradient, không chứa $x^*$. Độ cao ban đầu $\Delta_0$ chặn tổng các mức hạ, nên chuẩn gradient không thể lớn mãi. Một điểm có $\nabla f=0$ là điểm dừng (Định nghĩa 05.7); với $F$ của ví dụ dẫn D, các điểm dừng là $-1$, $0$, $1$, trong đó $0$ là cực đại địa phương.

Bất đẳng thức (6.1) chỉ cần H2 trên đoạn nối $x_k$ với $x_{k+1}$, vì chứng minh của Bổ đề 04.18 lấy tích phân dọc đoạn đó. Ví dụ sau dùng điều này cho một hàm không thỏa H2 trên toàn $\mathbb R$.

::: example Ví dụ 05b.24 (Ví dụ dẫn D từ $\theta_0=2$: hằng số $L$ trên một đoạn bất biến)
**Dữ kiện.**

$F(\theta)=\tfrac14(\theta^2-1)^2$, $F'(\theta)=\theta^3-\theta$, $F''(\theta)=3\theta^2-1$, $F_{\inf}=0$. Điểm đầu $\theta_0=2$, $F(2)=\tfrac94$, $F'(2)=6$. Bất đẳng thức (6.1) cần H2 trên đoạn nối hai điểm lặp liên tiếp.

**Hằng số trên đoạn $[-2,2]$.**

$F''$ không bị chặn trên $\mathbb R$, nên H2 sai toàn cục. Trên $[-2,2]$, $F''\in[-1,11]$, nên $\lvert F''\rvert\le11$ và $F'$ là $11$-Lipschitz trên đoạn này.

**Đoạn bất biến.**

Ánh xạ bước $\theta\mapsto\theta-\tfrac1{11}F'(\theta)=\tfrac{12\theta-\theta^3}{11}$ có đạo hàm $\tfrac{12-3\theta^2}{11}\ge0$ trên $[-2,2]$, nên đơn điệu, và đưa $[-2,2]$ vào $[-\tfrac{16}{11},\tfrac{16}{11}]$. GD bước $\tfrac1{11}$ vì vậy ở lại $[-2,2]$, và (6.1) áp dụng ở mọi bước với $L=11$.

**Hai bước đầu.**

$\theta_1=\tfrac{16}{11}\approx1{,}455$, $F(\theta_1)\approx0{,}311$; $\theta_2\approx1{,}307$, $F(\theta_2)\approx0{,}125$.

**Kiểm tra lại.**

Mức hạ ở bước đầu là $2{,}25-0{,}311=1{,}939$, không nhỏ hơn $\tfrac1{22}F'(2)^2=\tfrac{36}{22}\approx1{,}636$ như (6.1) với $\eta=\tfrac1{11}$ bảo đảm.
:::

![Đồ thị F(θ) với θ từ −2 đến 2, hai cực tiểu tại −1 và 1, cực đại địa phương tại 0. Từ θ₀ = 2, giảm gradient bước 1/11 cho θ₁ ≈ 1,455 rồi θ₂ ≈ 1,307; giá trị F giảm từ 2,25 xuống khoảng 0,311 rồi 0,125.](img/lec-05b/quartic-two-wells.svg)

Hình đánh dấu ba điểm lặp đầu trên đồ thị. Bước đầu hạ $F$ nhiều vì gradient tại $\theta_0=2$ lớn; các bước sau hạ ít dần khi dãy tới gần đáy $1$, nơi gradient nhỏ.

### 6.3 Hạ gradient tới điểm dừng

Định lý sau dùng bất đẳng thức một bước (6.1) và Bổ đề 05b.15, như Định lý 05b.16, nhưng với hàm thế $\Delta_k$ thay cho $d_k^2$.

::: theorem Định lý 05b.41 (Hạ gradient trên hàm không lồi; T7)
**Giả thiết.** $f$ thỏa H0 và H2 với hằng số $L$; $x_0\in\mathbb R^n$, $\Delta_0=f(x_0)-f_{\inf}$. Dãy $x_{k+1}=x_k-\tfrac1L\nabla f(x_k)$.

**Kết luận.** Với mọi $K\ge1$,

$$
\min_{k<K}\lVert\nabla f(x_k)\rVert^2\le\frac{2L\Delta_0}K .
\tag{6.2}
$$

**Điều kiện áp dụng.** Không cần tính lồi, không cần điểm cực tiểu; H2 chỉ cần trên một tập lồi chứa mọi điểm lặp.

**Phạm vi.** Định lý chặn lặp tốt nhất theo chuẩn gradient; không chặn điểm cuối, không nói điểm dừng gần đó là cực tiểu.
:::

::: proof Chứng minh Định lý 05b.41
**Bước 1 (bất đẳng thức một bước).**

(6.1) với $\eta=\tfrac1L$: $\tfrac1{2L}\lVert\nabla f(x_k)\rVert^2\le\Delta_k-\Delta_{k+1}$.

**Bước 2 (tổng lồng).**

Bổ đề 05b.15 với $v_k=\lVert\nabla f(x_k)\rVert^2$, $u_k=\Delta_k$, $\gamma=2L$, $r_k=0$; H0 cho $\Delta_K\ge0$:

$$
\sum_{k<K}\lVert\nabla f(x_k)\rVert^2\le2L\Delta_0 .
$$

**Bước 3 (lặp tốt nhất).**

Tổng $K$ số hạng không nhỏ hơn $K$ lần số hạng nhỏ nhất. $\square$
:::

Định lý 05b.41 là Định lý 05b.16 với hàm thế $d_k^2$ thay bằng $\Delta_k$ và tiến bộ $e_{k+1}$ thay bằng $\lVert\nabla f(x_k)\rVert^2$. Bỏ tính lồi làm mất hai thứ: kết luận nói về chuẩn gradient thay vì sai số giá trị, và nói về lặp tốt nhất thay vì điểm cuối. Tốc độ $O(1/K)$ cho bình phương chuẩn gradient tương ứng tốc độ $O(1/\sqrt K)$ cho chính chuẩn gradient. Với bước hằng $\eta<\tfrac1L$, cùng lập luận chỉ đổi hằng số.

**Trong học máy.** Với mạng nơ ron huấn luyện bằng gradient đầy đủ trên một vùng tham số mà $L$ hữu hạn, Định lý 05b.41 bảo đảm tiêu chí dừng $\lVert\nabla f(x_k)\rVert\le\varepsilon_g$ được đạt sau không quá $2L\Delta_0/\varepsilon_g^2$ bước; nó không bảo đảm điểm dừng tìm được có mất mát nhỏ (Tình huống 05b.3).

::: example Ví dụ 05b.25 (Cận và giá trị thật trên ví dụ dẫn D)
**Dữ kiện.**

$F(\theta)=\tfrac14(\theta^2-1)^2$, GD bước $\tfrac1{11}$ từ $\theta_0=2$, dãy ở lại $[-2,2]$ nơi $F'$ là $11$-Lipschitz; $\Delta_0=F(2)-0=\tfrac94$ (Ví dụ 05b.24). Định lý 05b.41: $\min_{k<K}F'(\theta_k)^2\le\tfrac{2L\Delta_0}K$.

**Cận.**

$\tfrac{2\cdot11\cdot9/4}K=\tfrac{49{,}5}K$.

**So sánh.**

| $K$ | $1$ | $5$ | $10$ |
|---|---:|---:|---:|
| cận $49{,}5/K$ | $49{,}5$ | $9{,}9$ | $4{,}95$ |
| $\min_{k<K}F'(\theta_k)^2$ thật | $36$ | $0{,}180$ | $0{,}0120$ |

**Kiểm tra lại.**

Với $K=1$, $F'(2)^2=36\le49{,}5$. Cận lỏng khi $K$ lớn vì dãy tới gần đáy $1$, nơi $F''(1)=2$ nhỏ hơn nhiều so với $L=11$.
:::

::: remark Nhận xét 05b.42 (Điểm dừng xấp xỉ và điểm cực tiểu)
Một nhầm lẫn thường gặp là đọc (6.2) thành "GD tới gần một cực tiểu". Định lý chỉ nói có một điểm lặp có chuẩn gradient nhỏ, tức một điểm dừng xấp xỉ; nó không nói điểm đó gần một điểm dừng, càng không nói gần một cực tiểu.

Mất mát logistic của Ví dụ 05b.4 có $\phi'(s_k)\to0$ nhưng không có điểm dừng nào. Ngay cả điểm dừng thật cũng có thể là cực đại địa phương hay điểm yên ngựa: dãy GD từ $\theta_0=0$ của ví dụ dẫn D thỏa (6.2) với mọi $K$, vì chuẩn gradient bằng $0$, mà vẫn đứng tại cực đại địa phương.
:::

### 6.4 SGD trên hàm không lồi

Thay $\nabla f(x_k)$ bằng một ước lượng không chệch có phương sai không vượt $\sigma^2$, mức hạ kỳ vọng mỗi bước của $\Delta_k$ bớt đi một số hạng nhiễu. Định lý sau là Định lý 05b.41 với số hạng nhiễu đó, và là dạng dãy của Mệnh đề 05.14.

::: theorem Định lý 05b.43 (SGD trên hàm không lồi; T8)
**Giả thiết.** $f$ thỏa H0 và H2 với hằng số $L$; $x_0$ tất định, $\Delta_0=f(x_0)-f_{\inf}$. Dãy của Thuật toán 05b.2 thỏa H6 và H6b, với bước hằng $0<\eta\le\tfrac1L$.

**Kết luận.** Với mọi $K\ge1$,

$$
\frac1K\sum_{k<K}\mathbb E\lVert\nabla f(x_k)\rVert^2\le\frac{2\Delta_0}{\eta K}+L\eta\sigma^2 .
\tag{6.3}
$$

**Điều kiện áp dụng.** Không cần tính lồi; H2 và H6b cần đúng tại mọi điểm lặp có thể và trên các đoạn nối chúng.

**Phạm vi.** Số hạng $L\eta\sigma^2$ không giảm theo $K$. Nếu chọn chỉ số $\tilde k$ đều trên $\{0,\ldots,K-1\}$, độc lập với dãy, thì $\mathbb E\lVert\nabla f(x_{\tilde k})\rVert^2$ có cùng cận.
:::

::: proof Chứng minh Định lý 05b.43
Viết $\nabla_k=\nabla f(x_k)$.

**Bước 1 (H2: cận trên bậc hai cho từng hiện thực).**

(2.1) với $x=x_k$, $z=x_{k+1}=x_k-\eta g_k$:

$$
f(x_{k+1})\le f(x_k)-\eta\,\nabla_k^Tg_k+\frac{L\eta^2}2\lVert g_k\rVert^2 .
$$

**Bước 2 (H6, H6b: kỳ vọng có điều kiện).**

$\nabla_k$ xác định bởi $\mathcal F_k$, nên Mệnh đề 05b.30(b) và H6 cho $\mathbb E[\nabla_k^Tg_k\mid\mathcal F_k]=\lVert\nabla_k\rVert^2$; Bổ đề 05b.32 và H6b cho $\mathbb E[\lVert g_k\rVert^2\mid\mathcal F_k]\le\lVert\nabla_k\rVert^2+\sigma^2$. Trừ $f_{\inf}$ hai vế:

$$
\mathbb E[\Delta_{k+1}\mid\mathcal F_k]\le\Delta_k-\eta\Bigl(1-\frac{L\eta}2\Bigr)\lVert\nabla_k\rVert^2+\frac{L\eta^2\sigma^2}2 .
$$

**Bước 3 (dùng $\eta\le\tfrac1L$ rồi lấy kỳ vọng).**

$\eta(1-\tfrac{L\eta}2)\ge\tfrac\eta2$ như trong Bổ đề 05b.6. Lấy kỳ vọng hai vế theo Mệnh đề 05b.30(a):

$$
\mathbb E\Delta_{k+1}\le\mathbb E\Delta_k-\frac\eta2\,\mathbb E\lVert\nabla_k\rVert^2+\frac{L\eta^2\sigma^2}2 .
\tag{6.4}
$$

**Bước 4 (tổng lồng có nhiễu).**

Bổ đề 05b.15 với $v_k=\mathbb E\lVert\nabla_k\rVert^2$, $u_k=\mathbb E\Delta_k\ge0$ (H0), $\gamma=\tfrac2\eta$, $r_k=L\eta\sigma^2$; $\Delta_0$ không ngẫu nhiên vì $x_0$ tất định:

$$
\sum_{k<K}\mathbb E\lVert\nabla_k\rVert^2\le\frac{2\Delta_0}\eta+KL\eta\sigma^2 .
$$

Chia cho $K$ được (6.3). Phần về $\tilde k$: $\mathbb E\lVert\nabla f(x_{\tilde k})\rVert^2=\tfrac1K\sum_k\mathbb E\lVert\nabla_k\rVert^2$ vì $\tilde k$ đều và độc lập với dãy. $\square$
:::

Với $\sigma=0$ và $\eta=\tfrac1L$, (6.3) cho lại Định lý 05b.41 ở dạng trung bình, vốn mạnh hơn dạng $\min$. Với bước hằng, vế phải không về $0$ khi $K\to\infty$; muốn cận nhỏ phải chọn bước theo $K$. Ghadimi và Lan (2013) phát biểu cùng dạng cận cho SGD trên hàm không lồi trơn; Bottou, Curtis và Nocedal (2018, mục 4.3) trình bày kết quả tương tự cho bước cố định.

::: corollary Hệ quả 05b.44 (Chọn bước cho SGD trên hàm không lồi)
**Giả thiết.** Như Định lý 05b.43, với $\sigma>0$ và $\eta=\min\Bigl\{\dfrac1L,\sqrt{\dfrac{2\Delta_0}{L\sigma^2K}}\Bigr\}$.

**Kết luận.**

$$
\frac1K\sum_{k<K}\mathbb E\lVert\nabla f(x_k)\rVert^2\le\frac{2L\Delta_0}K+2\sqrt{\frac{2L\Delta_0\sigma^2}K}.
\tag{6.5}
$$

**Điều kiện áp dụng.** Cần biết $K$, $\Delta_0$ (hoặc cận trên), $L$, $\sigma^2$.

**Phạm vi.** Tốc độ $O(1/\sqrt K)$, chậm hơn $O(1/K)$ của GD; số hạng $O(1/\sqrt K)$ do nhiễu chi phối khi $K$ lớn.
:::

::: proof Chứng minh Hệ quả 05b.44
**Bước 1 (nhánh căn).**

Nếu $\eta=\sqrt{2\Delta_0/(L\sigma^2K)}\le\tfrac1L$, hai số hạng của (6.3) bằng nhau: $\tfrac{2\Delta_0}{\eta K}=L\eta\sigma^2=\sqrt{2L\Delta_0\sigma^2/K}$, tổng là $2\sqrt{2L\Delta_0\sigma^2/K}$.

**Bước 2 (nhánh $\tfrac1L$).**

Nếu $\eta=\tfrac1L\le\sqrt{2\Delta_0/(L\sigma^2K)}$, bình phương hai vế cho $\sigma^2\le\tfrac{2L\Delta_0}K$. Cận (6.3) bằng $\tfrac{2L\Delta_0}K+\sigma^2$, và $\sigma^2=\sqrt{\sigma^2\cdot\sigma^2}\le\sqrt{2L\Delta_0\sigma^2/K}$.

**Bước 3 (ghép).**

Trong cả hai nhánh, cận không vượt vế phải của (6.5). $\square$
:::

::: example Ví dụ 05b.26 (Giá của nhiễu trên ví dụ dẫn D; có mô phỏng)
**Dữ kiện.**

$F(\theta)=\tfrac14(\theta^2-1)^2$, $F'(\theta)=\theta^3-\theta$, $\theta_0=2$, $\Delta_0=\tfrac94$; $F'$ là $11$-Lipschitz trên $[-2,2]$ (Ví dụ 05b.24). Gradient ngẫu nhiên $g_k=F'(\theta_k)+\xi_k$ với $\xi_k=\pm1$ đồng xác suất, độc lập; H6 đúng và H6b đúng với $\sigma^2=1$. Hệ quả 05b.44: cận $\tfrac{2L\Delta_0}K+2\sqrt{2L\Delta_0\sigma^2/K}$.

**Dãy ở lại $[-2,2]$.**

Với bước $\eta\le\tfrac1{11}$, ánh xạ $\theta\mapsto\theta-\eta F'(\theta)\mp\eta$ có đạo hàm $1-\eta(3\theta^2-1)\ge1-11\eta\ge0$ trên $[-2,2]$, nên đơn điệu. Ảnh của $\theta=2$ là $2-6\eta-\eta=2-7\eta$ hoặc $2-6\eta+\eta=2-5\eta$; ảnh của $\theta=-2$ là $-2+7\eta$ hoặc $-2+5\eta$. Cả bốn giá trị nằm trong $[-(2-5\eta),\,2-5\eta]$; với $\eta=0{,}0202$ dưới đây, đó là $[-1{,}899;\,1{,}899]$. Vậy mọi điểm lặp và mọi đoạn nối chúng ở trong $[-2,2]$, nơi H2 đúng với $L=11$.

**Số bước cho cận $0{,}1$.**

$2L\Delta_0=49{,}5$. Không có nhiễu, Định lý 05b.41 cần $\tfrac{49{,}5}K\le0{,}1$, tức $K\ge495$. Có nhiễu, đặt $\varpi=\sqrt{49{,}5/K}$; điều kiện $\varpi^2+2\varpi\le0{,}1$ cho $\varpi\le\sqrt{1{,}1}-1\approx0{,}04881$, tức $K\ge20\,779$, khoảng $42$ lần nhiều hơn.

**Mô phỏng với $K=1000$.**

Bước $\eta=\sqrt{4{,}5/11\,000}\approx0{,}0202$, nhỏ hơn $\tfrac1{11}$, cận (6.3) bằng khoảng $0{,}445$. Mô phỏng $2000$ lần chạy, hạt giống $2026$, cho trung bình của $\tfrac1K\sum_kF'(\theta_k)^2$ khoảng $0{,}143$, nằm dưới cận.

**Kiểm tra lại.**

Với $K=20\,779$: $\varpi\approx0{,}048808$ và $\varpi^2+2\varpi\approx0{,}099998\le0{,}1$; với $K=20\,778$, giá trị vượt $0{,}1$. Kết quả mô phỏng là ước lượng Monte Carlo, không phải giá trị chính xác.
:::

**Trong học máy.** Định lý 05b.43 là bảo đảm chuẩn của SGD bước hằng khi huấn luyện mạng nơ ron: dưới H0, H2, H6, H6b, trung bình kỳ vọng bình phương chuẩn gradient giảm như $\tfrac1{\eta K}$ tới mức $L\eta\sigma^2$. Với mạng sâu, H2 toàn cục khó kiểm và thường chỉ đúng trên một vùng tham số bị chặn; H6b cũng vậy. Kể cả khi giả thiết đúng, định lý không nói tới cực tiểu nào, không loại điểm yên ngựa, và không chặn mất mát xác thực (Tình huống 05b.3).

### 6.5 Điều kiện Polyak–Łojasiewicz

Định lý 05b.41 và 05b.43 chỉ cho tốc độ dưới tuyến tính và chỉ kết luận về điểm dừng. Chứng minh Định lý 05b.18(b) chỉ dùng H3 qua một bất đẳng thức: $\lVert\nabla f\rVert^2\ge2\mu(f-f^*)$, nói rằng gradient chỉ nhỏ khi giá trị đã gần tối ưu.

Trên ví dụ dẫn C, bất đẳng thức đúng với $\mu=3$: $\lVert\nabla f(x)\rVert^2=9[x]_1^2+49[x]_2^2$, không nhỏ hơn $6f(x)=9[x]_1^2+21[x]_2^2$. Nó sai tại $\theta=0$ của ví dụ dẫn D, nơi $F'(0)=0$ mà $F(0)-F_{\inf}=\tfrac14$. Trực giác, chưa phải định nghĩa: một hàm có thể không lồi mà vẫn không có điểm dừng nào ngoài các điểm cực tiểu; tách bất đẳng thức trên thành một giả thiết riêng nắm đúng tính chất đó.

::: definition Định nghĩa 05b.45 (Điều kiện Polyak–Łojasiewicz, H7)
Cho $f:\mathbb R^n\to\mathbb R$ thỏa H0. $f$ thỏa điều kiện Polyak–Łojasiewicz (PL) với hằng số $\mu>0$ nếu

$$
\frac12\lVert\nabla f(x)\rVert^2\ge\mu\bigl(f(x)-f_{\inf}\bigr)\qquad\forall x\in\mathbb R^n .
\tag{6.6}
$$
:::

Điều kiện (6.6) nói rằng ở mọi nơi chưa tối ưu, gradient đủ lớn so với độ cao trên cận dưới. Ký hiệu $\mu$ được dùng chung với H3 vì quan hệ (a) của mệnh đề dưới đây: với hàm lồi mạnh, hằng số PL có thể lấy bằng hằng số lồi mạnh.

::: proposition Mệnh đề 05b.46 (Quan hệ của điều kiện PL với các giả thiết khác)
**Giả thiết.** $f:\mathbb R^n\to\mathbb R$ khả vi.

**Kết luận.**

- (a) Nếu $f$ thỏa H3 với hằng số $\mu$ thì $f$ thỏa H7 với cùng $\mu$ và $f_{\inf}=f^*$.
- (b) Nếu $f$ thỏa H2 với hằng số $L$, H7 với hằng số $\mu$, và $f$ không là hằng số, thì $\mu\le L$.
- (c) Nếu $f$ thỏa H7 thì mọi điểm dừng của $f$ là điểm cực tiểu toàn cục.

**Điều kiện áp dụng.** (b) dùng Bổ đề 05b.7.

**Phạm vi.** Chiều ngược của (a) sai: H7 không đòi tính lồi và không đòi điểm cực tiểu duy nhất.
:::

::: proof Chứng minh Mệnh đề 05b.46
**Bước 1 (phần a).**

H3 kéo theo H4, và Bổ đề 05b.8(b) viết lại là $\tfrac12\lVert\nabla f(x)\rVert^2\ge\mu(f(x)-f^*)$.

**Bước 2 (phần b).**

Bổ đề 05b.7 và (6.6) cho $2\mu(f(x)-f_{\inf})\le\lVert\nabla f(x)\rVert^2\le2L(f(x)-f_{\inf})$. Vì $f$ không là hằng số và bị chặn dưới, có điểm với $f(x)>f_{\inf}$; chia hai vế cho $2(f(x)-f_{\inf})>0$.

**Bước 3 (phần c).**

Tại điểm dừng $\bar x$, vế trái của (6.6) bằng $0$, nên $f(\bar x)\le f_{\inf}$, tức $f(\bar x)=f_{\inf}$. $\square$
:::

Phần (c) giải thích vì sao H7 cho tốc độ tuyến tính mà không cần lồi: nó loại đúng loại điểm làm Định lý 05b.41 yếu, các điểm dừng không tối ưu như cực đại địa phương của ví dụ dẫn D.

::: example Ví dụ 05b.27 (Kiểm điều kiện PL trên bốn hàm)
**Dữ kiện.**

Ví dụ dẫn C, $f(x)=\tfrac12\bigl(3[x]_1^2+7[x]_2^2\bigr)$ với $f_{\inf}=0$; ví dụ dẫn A, $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$ với $J_{\inf}=\tfrac43$; ví dụ dẫn D, $F(\theta)=\tfrac14(\theta^2-1)^2$; và $\psi(x)=x^2+3\sin^2x$ trên $\mathbb R$. Điều kiện (6.6): $\tfrac12\lVert\nabla f\rVert^2\ge\mu(f-f_{\inf})$.

**Bốn hàm.**

- Ví dụ dẫn C: $\lVert\nabla f(x)\rVert^2=9[x]_1^2+49[x]_2^2$ và $6f(x)=9[x]_1^2+21[x]_2^2$, nên $\lVert\nabla f(x)\rVert^2\ge6f(x)$ và H7 đúng với $\mu=3$.
- Ví dụ dẫn A: $\tfrac12J'(\theta)^2=\tfrac12(\theta-1)^2=J(\theta)-J_{\inf}$, nên H7 đúng với $\mu=1$, dấu bằng tại mọi điểm.
- Ví dụ dẫn D: tại $\theta=0$, vế trái bằng $0$ và vế phải bằng $\tfrac\mu4>0$; H7 sai với mọi $\mu>0$.
- Hàm $\psi$: $\psi''(x)=2+6\cos2x$ bằng $-4$ tại $x=\tfrac\pi2$, nên $\psi$ không lồi; điểm dừng duy nhất là $0$, và $\psi$ thỏa H7 với $\mu=\tfrac1{32}$ (Karimi, Nutini và Schmidt 2016, mục 2).

**Kiểm tra lại.**

Với $\psi$, tính số trên lưới $10^6$ điểm của $[-50,50]$ cho giá trị nhỏ nhất của $\tfrac{\psi'(x)^2/2}{\psi(x)}$ khoảng $0{,}176$, lớn hơn $\tfrac1{32}\approx0{,}031$; gần $0$, tỉ số tiến về $8$ vì $\psi\approx4x^2$ và $\psi'\approx8x$. Đây là kiểm tra bằng số trên một đoạn, không thay cho chứng minh.
:::

Định lý sau ghép bất đẳng thức một bước của Định lý 05b.43 với H7, theo đúng cách Định lý 05b.18(b) ghép bổ đề giảm với Bổ đề 05b.8(b).

::: theorem Định lý 05b.47 (SGD dưới điều kiện PL; T9)
**Giả thiết.** $f$ thỏa H0, H2 với hằng số $L$ và H7 với hằng số $\mu$; $x_0$ tất định, $\Delta_0=f(x_0)-f_{\inf}$. Dãy của Thuật toán 05b.2 thỏa H6 và H6b, với bước hằng $0<\eta\le\tfrac1L$.

**Kết luận.** Với mọi $k\ge0$,

$$
\mathbb E\Delta_k\le(1-\eta\mu)^k\Delta_0+\frac{L\eta\sigma^2}{2\mu}.
\tag{6.7}
$$

**Điều kiện áp dụng.** Không cần tính lồi, không cần điểm cực tiểu duy nhất.

**Phạm vi.** Sàn nhiễu $\tfrac{L\eta\sigma^2}{2\mu}$ không giảm theo $k$. Với $\sigma=0$, định lý cho GD hệ số co $1-\eta\mu$ của sai số giá trị mà không cần lồi; với $\eta=\tfrac1L$, đó là Định lý 05b.18(b) với H3 thay bằng H7.
:::

::: proof Chứng minh Định lý 05b.47
**Bước 1 (bất đẳng thức một bước của Định lý 05b.43).**

Bước 2 và Bước 3 của chứng minh Định lý 05b.43, trước khi lấy kỳ vọng toàn phần, cho

$$
\mathbb E[\Delta_{k+1}\mid\mathcal F_k]\le\Delta_k-\frac\eta2\lVert\nabla f(x_k)\rVert^2+\frac{L\eta^2\sigma^2}2 .
$$

**Bước 2 (H7).**

(6.6) cho $\lVert\nabla f(x_k)\rVert^2\ge2\mu\Delta_k$, nên $\mathbb E[\Delta_{k+1}\mid\mathcal F_k]\le(1-\eta\mu)\Delta_k+\tfrac{L\eta^2\sigma^2}2$. Lấy kỳ vọng hai vế theo Mệnh đề 05b.30(a).

**Bước 3 (giải đệ quy).**

Theo Mệnh đề 05b.46(b), $\mu\le L$, nên $q=1-\eta\mu\in[0,1)$. Bổ đề 05b.35 với $r=\tfrac{L\eta^2\sigma^2}2$ cho $\tfrac r{1-q}=\tfrac{L\eta^2\sigma^2}{2\eta\mu}=\tfrac{L\eta\sigma^2}{2\mu}$, tức (6.7). $\square$
:::

So với Định lý 05b.36, hàm thế là $f-f_{\inf}$ thay cho $d^2$, nên không dùng $x^*$ và không cần lồi; cái giá là kết luận nói về giá trị chứ không về khoảng cách. Polyak (1963) đưa ra điều kiện này cho GD; Karimi, Nutini và Schmidt (2016) chỉ ra nó đủ cho tốc độ tuyến tính của nhiều phương pháp bậc nhất.

::: example Ví dụ 05b.28 (Định lý 05b.47 trên ví dụ dẫn A)
**Dữ kiện.**

Ví dụ dẫn A, SGD nhóm một mẫu, bước $\eta=0{,}1$, $\theta_0=0$: $L=\mu=1$, $\sigma^2=\tfrac83$, $\Delta_0=J(0)-\tfrac43=\tfrac12$, và H7 đúng với $\mu=1$ (Ví dụ 05b.27). Giá trị chính xác $a_k=\tfrac8{57}+\tfrac{49}{57}(0{,}81)^k$ (Ví dụ 05b.2), và $\Delta_k=\tfrac12(\theta_k-1)^2$, nên $\mathbb E\Delta_k=\tfrac12a_k$. Định lý 05b.47: $\mathbb E\Delta_k\le(1-\eta\mu)^k\Delta_0+\tfrac{L\eta\sigma^2}{2\mu}$.

**Cận.**

$0{,}5\cdot0{,}9^k+\tfrac{0{,}1\cdot8/3}2=0{,}5\cdot0{,}9^k+0{,}1\overline3$. Tại $k=20$: $0{,}0608+0{,}1333\approx0{,}194$.

**Giá trị chính xác.**

$\mathbb E\Delta_{20}=\tfrac12\cdot0{,}1531\approx0{,}0765$, và $\mathbb E\Delta_k\to\tfrac4{57}\approx0{,}0702$.

**Kiểm tra lại.**

Sàn nhiễu $0{,}133$ gần gấp đôi giới hạn $0{,}0702$, cùng thừa số như Nhận xét 05b.37: trên hàm bậc hai này, (6.7) và (5.4) cho cùng sàn sau khi nhân (5.4) với $\tfrac L2=\tfrac12$.
:::

**Trong học máy.** H7 đúng cho bình phương nhỏ nhất kể cả khi ma trận đặc trưng không có hạng đầy đủ, nơi H3 sai; mọi hàm $\chi(Ax)$ với $\chi$ lồi mạnh, $A$ là ma trận, thỏa H7 (Karimi, Nutini và Schmidt 2016, mục 2). Với mạng nơ ron, H7 toàn cục sai mỗi khi có điểm yên ngựa hay cực đại địa phương, theo Mệnh đề 05b.46(c); các kết quả dùng H7 cho mạng rất rộng chỉ phát biểu nó trên một vùng quanh điểm khởi tạo (Liu, Zhu và Belkin 2022).

::: exercise Bài tập 05b.6 (Điều kiện PL không đòi điểm cực tiểu duy nhất)
Cho $f(x)=\tfrac32[x]_1^2$ trên $\mathbb R^2$.

- (a) Chứng minh $f$ thỏa H2 với $L=3$, thỏa H7 với $\mu=3$, nhưng không thỏa H3.
- (b) Chạy GD bước $\tfrac13$ từ $x_0=(2,5)$. Tính $x_1$, $f(x_1)$ và giới hạn của dãy. So với kết luận của Định lý 05b.47 với $\sigma=0$.
- (c) Giải thích vì sao Định lý 05b.47 không nói gì về $\lVert x_k-x^*\rVert$ với một $x^*$ cố định.
:::

::: hint Gợi ý Bài tập 05b.6
$\nabla f(x)=(3[x]_1,0)$. Mọi điểm $(0,\upsilon)$ là điểm cực tiểu.
:::

::: solution Lời giải Bài tập 05b.6
**Câu (a).**

$\nabla^2f=\operatorname{diag}(3,0)$, nên H2 đúng với $L=3$ và H3 sai vì giá trị riêng $0$. $\tfrac12\lVert\nabla f(x)\rVert^2=\tfrac92[x]_1^2=3f(x)$ và $f_{\inf}=0$, nên H7 đúng với $\mu=3$, dấu bằng.

**Câu (b).**

$x_1=x_0-\tfrac13(6,0)=(0,5)$, $f(x_1)=0$; dãy dừng tại $(0,5)$ sau một bước. Định lý 05b.47 với $\sigma=0$, $\eta=\tfrac13$, $\mu=3$ cho $\Delta_k\le(1-1)^k\Delta_0=0$ với $k\ge1$, khớp.

**Câu (c).**

Điểm giới hạn $(0,5)$ do điểm đầu quyết định; khoảng cách tới điểm cực tiểu $(0,0)$ bằng $5$, không về $0$. Hàm thế của Định lý 05b.47 là $f-f_{\inf}$, không chứa $x^*$, nên định lý không chặn khoảng cách.

**Kiểm tra lại.**

$\Delta_0=f(2,5)=6$; sau một bước $\Delta_1=0$. Hàm này là trường hợp của Ví dụ 05b.5 với hằng số khác: H7 đúng ở nơi H3 sai.
:::

**Chuỗi suy luận của mục.**

1. Ví dụ 05b.23 cho thấy Hệ quả 05b.10 và hàm thế $d_k^2$ mất nghĩa khi $f$ không lồi.
2. Bổ đề 05b.6 cho bất đẳng thức một bước (6.1) theo hàm thế $\Delta_k$; tổng lồng cho Định lý 05b.41.
3. Thêm Mệnh đề 05.14 dạng lịch sử (Bổ đề 05b.32, Mệnh đề 05b.30) cho Định lý 05b.43 và Hệ quả 05b.44.
4. Định nghĩa 05b.45 và Mệnh đề 05b.46 tách bất đẳng thức của Bổ đề 05b.8(b) thành giả thiết; Bổ đề 05b.35 cho Định lý 05b.47.

Đích của mục là Định lý 05b.43, bảo đảm dùng được cho mạng nơ ron, và Định lý 05b.47, điều kiện để có lại tốc độ tuyến tính.

**Kết mục.** Mục này cho hai bảo đảm theo chuẩn gradient (Định lý 05b.41, 05b.43) và một bảo đảm tuyến tính dưới điều kiện PL (Định lý 05b.47). Mười hai kết quả của Mục 3 đến Mục 6 khác nhau ở giả thiết, đại lượng được chặn và tốc độ, nên dễ áp sai. Mục 7 xếp chúng vào một bảng tra và nêu những điều chúng không khẳng định.


## 7. Bảng tra và giới hạn của các bảo đảm

Mục 3 đến Mục 6 cho mười hai kết quả hội tụ, với bước $\tfrac1L$, số bước bảo đảm cho sai số $0{,}01$ trên ví dụ dẫn C trải từ $16$ đến $7000$, mỗi kết quả có một bộ giả thiết, một đại lượng được chặn và một tốc độ riêng. Một phiên huấn luyện cụ thể cần chọn đúng kết quả áp dụng được, và biết điều kết quả đó không khẳng định. Mục này xếp các kết quả thành bảng tra, viết lại khuôn chứng minh chung, và nêu phạm vi.

### 7.1 Bảng tra các bảo đảm hội tụ

| Kết quả | Giả thiết | Đại lượng được chặn | Tốc độ | Bước |
|---|---|---|---|---|
| Định lý 05b.16 (T1′; T1 khi $\eta=\tfrac1L$) | H1, H2, H4 | $e_k$; $d_k$ không tăng | $O(1/k)$ | hằng, $\eta\le\tfrac1L$ |
| Hệ quả 05b.17 | H1, H2 | $f(x_k)-f(z)$ với mọi $z$ | $O(1/k)$ | hằng, $\eta\le\tfrac1L$ |
| Định lý 05b.18 (T2a, T2b) | H2, H3 | $d_k^2$; $e_k$ | tuyến tính, $1-\tfrac1\kappa$ | $\tfrac1L$ |
| Định lý 05b.20 (T2′) | H2, H3 | $e_k$ | tuyến tính, $q_{\rm A}$ | quay lui Armijo |
| Định lý 05b.26 (T3) | H1 dạng dưới gradient, H4, H5 | $\min_ke_k$; $f(\bar x_K)-f^*$ | $O(1/\sqrt K)$ | bất kỳ; tối ưu $\tfrac D{G\sqrt K}$ |
| Định lý 05b.34 (T4) | H1 dạng dưới gradient, H4, H6, H6a | $\mathbb Ef(\bar x_K)-f^*$ | $O(1/\sqrt K)$ | chọn trước; tối ưu $\tfrac D{G\sqrt K}$ |
| Định lý 05b.36 (T5) | H2, H3, H6, H6b | $a_k$ | tuyến tính tới sàn $\tfrac{\eta\sigma^2}\mu$ | hằng, $\eta\le\tfrac1L$ |
| Hệ quả 05b.38 | H2, H3, H6, H6b | $a_k$ | $O(1/k)$ | chia đôi theo pha |
| Định lý 05b.39 (T6) | H3, H6, H6a trên vùng chứa dãy | $a_k$ | $O(1/k)$ | $\tfrac1{\mu(k+1)}$ |
| Định lý 05b.41 (T7) | H0, H2 | $\min_k\lVert\nabla f(x_k)\rVert^2$ | $O(1/K)$ | $\tfrac1L$ |
| Định lý 05b.43 (T8) | H0, H2, H6, H6b | trung bình của $\mathbb E\lVert\nabla f(x_k)\rVert^2$ | tới sàn $L\eta\sigma^2$; $O(1/\sqrt K)$ theo Hệ quả 05b.44 | hằng, $\eta\le\tfrac1L$ |
| Định lý 05b.47 (T9) | H0, H2, H7, H6, H6b | $\mathbb E\Delta_k$ | tuyến tính tới sàn $\tfrac{L\eta\sigma^2}{2\mu}$ | hằng, $\eta\le\tfrac1L$ |

Giả thiết tra nhanh: H0 khả vi và bị chặn dưới; H1 lồi; H2 gradient $L$-Lipschitz; H3 lồi mạnh với hằng số $\mu$; H4 có điểm cực tiểu; H5 $\lVert g_k\rVert\le G$; H6 gradient ngẫu nhiên không chệch; H6a mômen bậc hai không vượt $G^2$; H6b phương sai không vượt $\sigma^2$; H7 điều kiện Polyak–Łojasiewicz. Tên trong ngoặc ở cột đầu là tên ngắn dùng trong bộ bài tập chính thức; trên hình của chương chỉ xuất hiện T1, T2a, T2b và T5. Khi dùng bảng, kiểm cột giả thiết trước, rồi đọc cột đại lượng được chặn để biết kết luận nói về điểm nào: điểm cuối, lặp tốt nhất, trung bình lặp, hay kỳ vọng của chúng.

### 7.2 Khuôn chứng minh chung

Mọi kết quả trên theo khuôn một bước của Định nghĩa 05b.14: một bất đẳng thức một bước rồi một cách nối (tổng lồng, co, hoặc đệ quy co có nhiễu). Đi từ Định lý 05b.16 tới Định lý 05b.47, bất đẳng thức một bước đổi theo đúng giả thiết được thêm hoặc bớt:

- có H3 thì vế phải nhân một hệ số co thay vì trừ một hiệu;
- mất H2 thì số hạng $\eta_k^2G^2$ ở lại, vì không còn bổ đề giảm để triệt nó;
- thay gradient bằng ước lượng không chệch thì mỗi dòng của chứng minh được lấy kỳ vọng có điều kiện;
- mất tính lồi thì hàm thế đổi từ $d^2$ sang $f-f_{\inf}$, vì $x^*$ không còn dùng được.

Các kỹ thuật phụ gồm chọn bước để cân bằng hai số hạng (Hệ quả 05b.27, 05b.44), Jensen cho trung bình lặp (Bổ đề 05b.25), Markov cho xác suất (Bổ đề 05b.40), và phản ví dụ cho mỗi giả thiết bị bỏ (Nhận xét 05b.13).

### 7.3 Phạm vi của các bảo đảm

Mọi định lý của chương là cận trên cho cả lớp hàm thỏa giả thiết, nên có thể bi quan trên một hàm cụ thể.

![Hai biểu đồ thanh. Trái: Ví dụ C, số bước để e_k ≤ 0,01 trên thang logarit có vạch 1, 10, 100, 1000, 10⁴; T1 bảo đảm 7000, T2b bảo đảm 16, thực tế 6. Phải: Ví dụ A, giới hạn của a_k với SGD bước 0,1; sàn nhiễu của cận T5 là 0,267, giá trị thật là 0,140.](img/lec-05b/bounds-vs-actual.svg)

Hình đặt cạnh nhau hai so sánh đã tính. Bên trái, trên ví dụ dẫn C, Định lý 05b.16 (T1 trên hình) bảo đảm $7000$ bước, Định lý 05b.18(b) (T2b) bảo đảm $16$, và dãy thật cần $6$ (Ví dụ 05b.9). Bên phải, trên ví dụ dẫn A, sàn nhiễu của Định lý 05b.36 (T5) là $0{,}267$ còn giới hạn thật là $0{,}140$ (Ví dụ 05b.19). Cận cho số bước đủ, không phải dự báo số bước.

::: remark Nhận xét 05b.48 (Phạm vi và bốn câu hỏi trước khi áp dụng một định lý)
**Trong phạm vi.** Phương pháp bậc nhất, không ràng buộc, bước hằng hoặc theo lịch chọn trước; riêng Định lý 05b.20 dùng quay lui. Các định lý SGD giả sử nhóm rút có hoàn lại và bước không phụ thuộc nhóm.

**Ngoài phạm vi.** Momentum, Nesterov (Bài 05); Adam và các phương pháp bậc hai xấp xỉ (Bài 06); Newton (Bài 04); giảm phương sai (variance reduction); bài có ràng buộc. Các phương pháp này có lý thuyết hội tụ riêng.

**Bốn câu hỏi.** Trước khi dùng một định lý, cần trả lời:

1. giả thiết đúng trên toàn không gian hay chỉ trên một vùng, và dãy lặp có ở lại vùng đó không;
2. giả thiết về nhiễu là chặn mômen bậc hai (H6a) hay chặn phương sai (H6b);
3. đại lượng được chặn là điểm cuối, lặp tốt nhất, trung bình lặp hay kỳ vọng của chúng;
4. các hằng số $L$, $\mu$, $\sigma^2$, $D$, $G$ đã biết hay chỉ là ước lượng.
:::

Với mục tiêu không lồi, Định lý 05b.41 và 05b.43 chỉ cho điểm dừng: chúng không chỉ ra dãy tới cực tiểu nào và không loại điểm yên ngựa hay cực đại địa phương. Dãy GD từ $0$ của ví dụ dẫn D thỏa cả hai định lý mà không rời cực đại địa phương. Điều kiện PL toàn cục loại các điểm đó nhưng hiếm khi kiểm được cho một mạng cụ thể.

**Kết mục.** Mục này gom mười hai kết quả thành một bảng tra (Mục 7.1), một khuôn chứng minh chung (Mục 7.2) và bốn câu hỏi kiểm tra trước khi áp dụng (Nhận xét 05b.48). Phần tiếp theo áp các kết quả lên ba bài toán học máy cụ thể, trong đó có một bài mà giả thiết của các định lý mạnh không thỏa.


## Tình huống áp dụng và ứng dụng

Ba tình huống sau áp các kết quả của chương lên ba bài toán học máy nhỏ, tính được trọn vẹn. Tình huống thứ nhất thỏa mọi giả thiết của định lý được dùng; tình huống thứ hai thỏa giả thiết về nhiễu chỉ trên một vùng; tình huống thứ ba vi phạm tính lồi và chỉ còn bảo đảm theo chuẩn gradient.

::: application Tình huống 05b.1 (Chọn bước và số vòng lặp cho hồi quy logistic có chính quy hóa)
**Bài toán và dữ liệu.**

Bốn quan sát trong $\mathbb R^2$ với đặc trưng $c_1=(1,2)$, $c_2=(2,0)$, $c_3=(0,-1)$, $c_4=(-1,1)$ và nhãn $y=(1,1,-1,-1)$; $N=4$. Hồi quy logistic có chính quy hóa với hệ số $\nu=0{,}05$:

$$
f(x)=\frac1N\sum_{i=1}^N\phi\bigl(y_ic_i^Tx\bigr)+\frac\nu2\lVert x\rVert^2,\qquad\phi(s)=\log(1+\exp(-s)).
$$

Cần chọn bước cho GD và số vòng lặp đủ để sai số giá trị không vượt $10^{-4}$ lần sai số ban đầu.

**Mô hình hóa.**

Vì $y_i^2=1$, Hessian là $\nabla^2f(x)=\tfrac1N\sum_i\phi''(y_ic_i^Tx)\,c_ic_i^T+\nu I$, với $\phi''\in(0,\tfrac14]$ (Mệnh đề 01.9).

**Kiểm giả thiết.**

1. H3: $\nabla^2f\succeq\nu I$, nên $\mu=\nu=0{,}05$; theo Hệ quả 01.41, có đúng một điểm cực tiểu, nên H4 đúng.
2. H2: $\nabla^2f\preceq\nu I+\tfrac1{4N}\sum_ic_ic_i^T$. Ma trận $\sum_ic_ic_i^T=\begin{pmatrix}6&1\\1&6\end{pmatrix}$ có giá trị riêng $7$ và $5$, nên $L=0{,}05+\tfrac7{16}=0{,}4875$.
3. Một cận thô hơn, không cần giá trị riêng: giá trị riêng lớn nhất của $\sum_ic_ic_i^T$ không vượt $N\max_i\lVert c_i\rVert^2=4\cdot5=20$, cho $L'=0{,}05+\tfrac{20}{16}=1{,}3$.

**Áp dụng Định lý 05b.18(b).**

Với bước $\tfrac1L$, $\kappa=\tfrac{0{,}4875}{0{,}05}=9{,}75$ và $e_k\le(1-\tfrac1\kappa)^ke_0$. Theo Mệnh đề 05b.3(b), $e_k\le10^{-4}e_0$ khi $k\ge\tfrac{\log10^4}{-\log(1-1/9{,}75)}\approx85{,}1$, tức $86$ vòng. Với bước $\tfrac1{L'}$, H2 vẫn đúng với hằng số $L'\ge L$, nên định lý áp dụng với $\kappa'=26$, cho $k\ge\tfrac{\log10^4}{-\log(1-1/26)}\approx234{,}8$, tức $235$ vòng.

**Đối chiếu với dãy thật.**

Chạy GD từ $x_0=0$ đủ lâu để chuẩn gradient nhỏ hơn $10^{-15}$ cho $x^*\approx(1{,}771;\,0{,}723)$ và $f^*\approx0{,}2825$; $e_0=\log2-f^*\approx0{,}4107$. Với bước $\tfrac1L$, sai số xuống dưới $10^{-4}e_0$ sau $12$ vòng; với bước $\tfrac1{L'}$, sau $37$ vòng.

**Diễn giải.**

Bước $\tfrac1L$ lấy từ giá trị riêng cho cả cận lẫn dãy thật nhanh hơn khoảng ba lần so với bước theo cận thô. Cả hai cận bi quan sáu đến bảy lần so với dãy thật, vì $\mu=\nu$ là độ cong dưới toàn cục, trong khi gần $x^*$ phần $\phi''c_ic_i^T$ của Hessian còn cộng thêm độ cong.

**Khi bỏ chính quy hóa.**

Với $\nu=0$, vectơ $w=(2,1)$ cho biên $y_ic_i^Tw=4,4,1,1$, đều dương: dữ liệu tách được. Khi đó $f(tw)\to0$ khi $t\to\infty$ trong khi $f>0$ mọi nơi, nên $f_{\inf}=0$ không đạt, H4 và H3 sai, và Định lý 05b.18 không áp dụng. Hệ quả 05b.17 vẫn áp dụng: $f(x_k)\to0$, nhưng $\lVert x_k\rVert\to\infty$, như mất mát logistic một chiều của Ví dụ 05b.4.

**Kiểm tra lại.**

Tại $x=0$, mọi biên bằng $0$ và $\phi''(0)=\tfrac14$, nên $\nabla^2f(0)=\nu I+\tfrac1{16}\sum_ic_ic_i^T$ có giá trị riêng lớn nhất $0{,}05+\tfrac7{16}=0{,}4875$: hằng số $L$ đạt được tại gốc, không thể giảm. Số vòng thật $12$ và $37$ nhỏ hơn số vòng bảo đảm $86$ và $235$.

**Dẫn ngược.**

Định nghĩa 05b.5 (H2, H3, H4); Định lý 05b.18(b); Mệnh đề 05b.3(b); Hệ quả 05b.17. Bước kiểm H3 ứng với giả thiết lồi mạnh, bước tính $L$ ứng với điều kiện bước $\tfrac1L$.

**Giới hạn.**

Cận dùng $\mu$ toàn cục; với $\nu$ nhỏ, $\kappa$ lớn và cận đòi rất nhiều vòng dù dãy thật có thể nhanh. Với $N$ lớn, mỗi vòng GD tốn $N$ gradient mẫu, và SGD của Mục 5 thay vào; sàn nhiễu của Định lý 05b.36 khi đó tỉ lệ nghịch với $\mu=\nu$.
:::

::: application Tình huống 05b.2 (SGD trên bình phương nhỏ nhất: sàn nhiễu đo được và lịch bước)
**Bài toán và dữ liệu.**

Hồi quy tuyến tính không hệ số chặn với bốn quan sát: vectơ đặc trưng $c_1=(1,0)$, $c_2=(0,1)$, $c_3=(1,1)$, $c_4=(1,-1)$, nhãn $y=(1,2,2,-2)$, và

$$
f(x)=\frac1{2N}\sum_{i=1}^N\bigl(c_i^Tx-y_i\bigr)^2,\qquad N=4 .
$$

SGD nhóm một mẫu từ $x_0=0$ với bước không vượt $0{,}2$. Cần ước lượng mức dao động cuối cùng của $\mathbb E\lVert x_k-x^*\rVert^2$ và chọn một lịch bước để đưa nó xuống dưới $0{,}008$.

**Mô hình hóa.**

Hessian $\tfrac1N\sum_ic_ic_i^T=\tfrac14\begin{pmatrix}3&0\\0&3\end{pmatrix}=0{,}75I$, nên $\mu=L=0{,}75$. Điểm cực tiểu $x^*=(\tfrac13,2)$, $f^*=\tfrac1{12}$, $D^2=\tfrac{37}9\approx4{,}111$. Phần dư tại $x^*$ là $\rho=(-\tfrac23,0,\tfrac13,\tfrac13)$.

**Kiểm giả thiết.**

1. H2, H3 đúng với $L=\mu=0{,}75$; H6 đúng theo Định lý 05.11.
2. H6b không đúng toàn cục. Với $\zeta=x-x^*$, gradient mẫu trừ gradient đầy đủ là $(c_ic_i^T-0{,}75I)\zeta+\rho_ic_i$, nên phương sai $\tfrac1N\sum_i\lVert(c_ic_i^T-0{,}75I)\zeta+\rho_ic_i\rVert^2$ là một hàm bậc hai lồi của $x$, tăng không bị chặn.
3. Dãy ở lại một bát giác. Gọi $\mathcal O$ là bát giác có đỉnh $(-1,1)$, $(0,0)$, $(1,0)$, $(\tfrac32,\tfrac12)$, $(\tfrac32,2)$, $(1,3)$, $(-\tfrac12,\tfrac52)$, $(-1,2)$, tức tập các $x$ thỏa tám bất đẳng thức

    $$
    \begin{aligned}
    &[x]_1+[x]_2\ge0,\quad [x]_2\ge0,\quad [x]_1-[x]_2\le1,\quad [x]_1\le\tfrac32,\\
    &2[x]_1+[x]_2\le5,\quad 3[x]_2-[x]_1\le8,\quad [x]_2-[x]_1\le3,\quad [x]_1\ge-1 .
    \end{aligned}
    $$

    Lập luận bất biến gồm ba bước.
    - Với bước $0{,}2$: mỗi bước với quan sát $i$ là ánh xạ affine $x\mapsto x-0{,}2(c_i^Tx-y_i)c_i$, nên ảnh của $\mathcal O$ là bao lồi của ảnh tám đỉnh; tính bằng phân số chính xác, cả $32$ điểm ảnh thỏa tám bất đẳng thức (chẳng hạn đỉnh $(1,0)$ với quan sát $4$ cho $(\tfrac25,\tfrac35)$).
    - Với bước $\eta<0{,}2$: ảnh là tổ hợp lồi của $x$ và ảnh với bước $0{,}2$, nên cũng nằm trong $\mathcal O$.
    - Vì $x_0=(0,0)$ là một đỉnh, quy nạp cho mọi điểm lặp nằm trong $\mathcal O$; $\mathcal O$ lồi nên mọi đoạn nối hai điểm lặp cũng vậy.
4. Phương sai là hàm lồi nên đạt giá trị lớn nhất trên $\mathcal O$ tại một đỉnh; giá trị lớn nhất là $\tfrac72$, tại $x=(1,0)$. Vậy H6b đúng tại mọi điểm lặp với $\sigma^2=3{,}5$. Đỉnh xa $x^*$ nhất cũng là $(1,0)$, với bình phương khoảng cách $\tfrac{40}9$.

**Áp dụng Định lý 05b.36 với bước $0{,}2$.**

$0{,}2\le\tfrac1L$. Cận: $a_k\le0{,}85^k\cdot4{,}111+\tfrac{0{,}2\cdot3{,}5}{0{,}75}=0{,}85^k\cdot4{,}111+0{,}9\overline3$.

**Đo sàn nhiễu.**

Với nhóm một mẫu, trung bình và ma trận mômen bậc hai của $x_k-x^*$ thỏa một đệ quy tuyến tính tính được chính xác. Đệ quy cho $a_{20}\approx0{,}047$ và $a_k\to\tfrac8{225}\approx0{,}0356$; với bước $0{,}1$, giới hạn là $\approx0{,}0162$.

**Lịch chia đôi bước.**

Lịch $0{,}2$ trong $20$ bước, $0{,}1$ trong $40$, $0{,}05$ trong $80$, $0{,}025$ trong $160$, theo ý của Hệ quả 05b.38 với độ dài pha gấp đôi, so với hai bước hằng:

| Lịch | $a_{140}$ | $a_{300}$ | bước đầu tiên có $a_k\le0{,}008$ |
|---|---:|---:|---:|
| hằng $0{,}2$ | $0{,}0356$ | $0{,}0356$ | không đạt |
| hằng $0{,}05$ | $0{,}00781$ | $0{,}00773$ | $127$ |
| chia đôi | $0{,}00775$ | $0{,}00379$ | $107$ |

**Diễn giải.**

Cận của Định lý 05b.36 đúng nhưng sàn nhiễu $0{,}9\overline3$ của nó gấp khoảng $26$ lần sàn đo được $0{,}0356$, vì $\sigma^2=3{,}5$ là phương sai lớn nhất trên $\mathcal O$, đạt ở đỉnh xa nghiệm, trong khi gần $x^*$, nơi dãy dao động, phương sai chỉ khoảng $\tfrac29$.

Sàn đo được giảm khoảng một nửa khi bước giảm một nửa ($0{,}0356$ so với $0{,}0162$), đúng tỉ lệ $\eta$ mà (5.4) dự đoán. Lịch chia đôi đạt $0{,}008$ sớm hơn mọi bước hằng trong bảng.

**Kiểm tra lại.**

Tại $x^*$, $\sum_i\rho_ic_i=-\tfrac23(1,0)+\tfrac13(1,1)+\tfrac13(1,-1)=(0,0)$, nên $\nabla f(x^*)=0$. Tại đỉnh $(1,0)$, bốn gradient mẫu là $(0,0)$, $(0,-2)$, $(-1,-1)$, $(3,-3)$, trung bình $(\tfrac12,-\tfrac32)$; bình phương độ lệch là $2{,}5$; $0{,}5$; $2{,}5$; $8{,}5$, trung bình $3{,}5$.

**Dẫn ngược.**

Định nghĩa 05b.31 (H6, H6b), Bổ đề 05b.32, Định lý 05b.36, Hệ quả 05b.38, Nhận xét 05b.33. Bước tìm bát giác bất biến ứng với điều kiện áp dụng "H6b chỉ cần tại các điểm lặp thực sự xuất hiện".

**Giới hạn.**

H6b chỉ đúng trên một vùng, và vùng phải được tìm cho từng bộ dữ liệu. Với bình phương nhỏ nhất tổng quát, sàn nhiễu của định lý do phương sai xa nghiệm quyết định và có thể lớn hơn nhiều so với mức dao động thật; mức thật phải đo.
:::

::: application Tình huống 05b.3 (Mạng tuyến tính hai lớp: chỉ còn bảo đảm theo chuẩn gradient)
**Bài toán và dữ liệu.**

Mạng một nơ ron ở mỗi lớp, không có hàm kích hoạt, dự báo $[x]_1[x]_2\,s$ cho đầu vào $s$; một mẫu $(s,y)=(1,1)$ với mất mát bình phương cho

$$
f(x)=\tfrac12\bigl([x]_1[x]_2-1\bigr)^2,\qquad x\in\mathbb R^2 .
$$

Đây là hàm của Tình huống 04.3. Cần biết GD bước hằng bảo đảm gì và không bảo đảm gì.

**Mô hình hóa.**

$\nabla f(x)=([x]_1[x]_2-1)\bigl([x]_2,[x]_1\bigr)$ và $\nabla^2f(x)=\begin{pmatrix}[x]_2^2&2[x]_1[x]_2-1\\2[x]_1[x]_2-1&[x]_1^2\end{pmatrix}$.

**Kiểm giả thiết.**

1. H0 đúng với $f_{\inf}=0$, đạt trên hyperbol $[x]_1[x]_2=1$: H4 đúng nhưng điểm cực tiểu không duy nhất.
2. H1 sai: tại $0$, Hessian có giá trị riêng $\pm1$.
3. H7 sai: tại $0$, $\nabla f=0$ trong khi $f(0)-f_{\inf}=\tfrac12$ (Mệnh đề 05b.46(c)).
4. H2 sai toàn cục vì các phần tử $[x]_i^2$ không bị chặn. Trên hình vuông $Q=\{\lvert[x]_1\rvert,\lvert[x]_2\rvert\le2/\sqrt3\}$, chuẩn phổ của Hessian lớn nhất tại hai góc $[x]_1=-[x]_2=\pm2/\sqrt3$, bằng $3\cdot\tfrac43+1=5$; tính số trên lưới $401\times401$ điểm của $Q$ cho cùng giá trị. Vậy H2 đúng trên tập lồi $Q$ với $L=5$.

Chỉ Định lý 05b.41 áp dụng, với bước $\tfrac15$, miễn dãy ở lại $Q$.

**Hai lần chạy.**

Lần A từ $x_0=(1,-1)$, $\Delta_0=f(x_0)=2$, cận $\tfrac{2L\Delta_0}K=\tfrac{20}K$. Trên đường chéo $[x]_1=-[x]_2=\varsigma$, gradient bằng $\varsigma(\varsigma^2+1)(1,-1)$, nên dãy ở lại đường chéo với $\varsigma_{k+1}=\varsigma_k\bigl(1-\tfrac15(1+\varsigma_k^2)\bigr)$, giảm về $0$ và ở trong $Q$.

Lần B từ $x_0=(1;\,-0{,}8)$, $\Delta_0=\tfrac12(-0{,}8-1)^2=1{,}62$, cận $\tfrac{16{,}2}K$. Tọa độ lớn nhất của mọi điểm lặp là $1{,}0547<2/\sqrt3\approx1{,}1547$, nên dãy ở trong $Q$.

| $K$ | cận lần A | $\min_{k<K}\lVert\nabla f\rVert^2$ lần A | cận lần B | $\min_{k<K}\lVert\nabla f\rVert^2$ lần B |
|---:|---:|---:|---:|---:|
| $1$ | $20$ | $8$ | $16{,}2$ | $5{,}31$ |
| $5$ | $4$ | $0{,}153$ | $3{,}24$ | $0{,}264$ |
| $10$ | $2$ | $0{,}0134$ | $1{,}62$ | $0{,}246$ |
| $20$ | $1$ | $1{,}5\cdot10^{-4}$ | $0{,}81$ | $6{,}7\cdot10^{-4}$ |

**Diễn giải.**

Cả hai lần chạy thỏa cận của Định lý 05b.41. Lần A hội tụ về điểm yên ngựa $0$ với $f\to\tfrac12$; lần B rời vùng yên ngựa và hội tụ về $(1{,}0547;\,0{,}9482)$ trên hyperbol, với $f(x_{20})\approx6{,}2\cdot10^{-5}$. Định lý không phân biệt hai kết cục: nó chỉ bảo đảm chuẩn gradient nhỏ, và chuẩn gradient tại điểm yên ngựa bằng $0$.

Lần A khởi tạo trên đường chéo $[x]_1=-[x]_2$, một tập bất biến của phép lặp, nên dãy không rời đường chéo; hiện tượng cùng loại với đối xứng giữa hai đơn vị ẩn ở Định lý 05.28. Một khởi tạo theo phân phối liên tục rơi vào đường chéo với xác suất $0$, vì đường chéo là một tập có diện tích $0$ trong $\mathbb R^2$ (lập luận của Mệnh đề 05.31).

**Kiểm tra lại.**

Tại $x_0=(1,-1)$ của lần A: $[x]_1[x]_2-1=-2$, nên $\nabla f(x_0)=-2(-1,1)=(2,-2)$ và $\lVert\nabla f(x_0)\rVert^2=8$, khớp dòng $K=1$ của bảng; bước đầu cho $\varsigma_1=1\cdot\bigl(1-\tfrac15\cdot2\bigr)=0{,}6$.

**Dẫn ngược.**

Định nghĩa 05b.5 (H0–H4 và việc H1 sai), Định nghĩa 05b.45, Mệnh đề 05b.46(c), Định lý 05b.41. Bước tìm $Q$ ứng với điều kiện áp dụng "H2 trên một tập lồi chứa mọi điểm lặp".

**Giới hạn.**

Với mạng có hàng triệu tham số, không tính được $L$ trên một vùng chứa dãy, nên bảo đảm theo chuẩn gradient chỉ còn là phát biểu định tính.
:::

**Ứng dụng.** Các khái niệm của chương xuất hiện ở các chỗ sau trong học máy:

- **Bước học từ hằng số trơn.** Với hồi quy tuyến tính và logistic theo cả tập, bước $\tfrac1L$ với $L$ tính từ dữ liệu được bảo đảm làm mất mát giảm (Bổ đề 05b.6); khi có thêm lồi mạnh, chẳng hạn nhờ chính quy hóa, nó cho tốc độ tuyến tính (Định lý 05b.18, Tình huống 05b.1).
- **Mất mát không khả vi.** Máy vectơ tựa với mất mát bản lề và hồi quy độ lệch tuyệt đối có thể giải bằng phương pháp dưới gradient với trung bình lặp (Định lý 05b.26); với bước hằng, trung bình lặp trùng với trung bình Polyak của Bài 06, sai khác một chỉ số (Bài 06 bỏ điểm đầu).
- **Lịch bước học và cỡ nhóm.** Lịch giảm theo bậc thang (step decay) của các thư viện học sâu có cùng cấu trúc với Hệ quả 05b.38, nhưng độ dài bậc chọn theo kinh nghiệm; sàn nhiễu (5.4) tỉ lệ với $\operatorname{tr}\Sigma/b$, và cách chọn $b$ dưới ngân sách cố định được Bài 05c phân tích.
- **Tiêu chí dừng.** Chuẩn gradient chứng nhận sai số giá trị và khoảng cách khi mất mát lồi mạnh (chuỗi (2.5)); với mạng sâu nó chỉ chứng nhận điểm dừng (Định lý 05b.43, Tình huống 05b.3).


## Tóm tắt chương

**Định nghĩa.**

- Định nghĩa 05b.1: bốn dạng hội tụ, theo dãy lặp ($d_k\to0$), theo giá trị ($e_k\to0$), tới điểm dừng ($\lVert\nabla f(x_k)\rVert\to0$), theo kỳ vọng.
- Định nghĩa 05b.2: tốc độ tuyến tính (dạng cận và dạng tỉ số), tốc độ $O(1/k^p)$.
- Định nghĩa 05b.5: giả thiết H0–H4; Định nghĩa 05b.31: H6, H6a, H6b; Định nghĩa 05b.45: H7; H5 nằm trong Định lý 05b.26.
- Định nghĩa 05b.14: hàm thế và bất đẳng thức một bước.
- Định nghĩa 05b.21: dưới gradient, dưới vi phân.
- Định nghĩa 05b.29: lịch sử $\mathcal F_k$ và kỳ vọng có điều kiện.

**Công cụ.** Các bổ đề của Mục 2 (Bổ đề 05b.6, 05b.7, 05b.8, 05b.9), ba cách nối (Bổ đề 05b.15, Mệnh đề 05b.3(a), Bổ đề 05b.35), Bổ đề 05b.25, 05b.32, 05b.40 và Mệnh đề 05b.30.

**Kết quả hội tụ.** Bảng ở Mục 7.1 tóm tắt mười hai kết quả. Các tốc độ chính:

| Phương pháp và giả thiết | Đại lượng | Tốc độ | Số bước cho sai số $\varepsilon$ |
|---|---|---|---|
| GD, lồi, H2 (Định lý 05b.16) | $e_k$ | $\tfrac{D^2}{2\eta k}$ | $\tfrac{D^2}{2\eta\varepsilon}$ |
| GD, lồi mạnh, H2 (Định lý 05b.18) | $d_k^2$, $e_k$ | $(1-\tfrac1\kappa)^k$ | $\kappa\log\tfrac{C}\varepsilon$ |
| Dưới gradient, lồi, H5 (Định lý 05b.26) | lặp tốt nhất, trung bình lặp | $\tfrac{DG}{\sqrt K}$ | $\tfrac{D^2G^2}{\varepsilon^2}$ |
| SGD, lồi, H6a (Định lý 05b.34) | $\mathbb Ef(\bar x_K)-f^*$ | $\tfrac{DG}{\sqrt K}$ | $\tfrac{D^2G^2}{\varepsilon^2}$ |
| SGD bước hằng, lồi mạnh, H6b (Định lý 05b.36) | $a_k$ | $(1-\eta\mu)^kD^2+\tfrac{\eta\sigma^2}\mu$ | chỉ đạt $\varepsilon>\tfrac{\eta\sigma^2}\mu$ |
| SGD chia đôi bước (Hệ quả 05b.38) | $a_k$ | $O(1/k)$ | $O\bigl(\tfrac{\sigma^2}{\mu^2\varepsilon}\bigr)$ |
| GD, không lồi, H2 (Định lý 05b.41) | $\min_k\lVert\nabla f\rVert^2$ | $\tfrac{2L\Delta_0}K$ | $\tfrac{2L\Delta_0}\varepsilon$ |
| SGD, không lồi, H6b (Định lý 05b.43, Hệ quả 05b.44) | trung bình $\mathbb E\lVert\nabla f\rVert^2$ | $O(1/\sqrt K)$ | $O\bigl(\tfrac{L\Delta_0\sigma^2}{\varepsilon^2}\bigr)$ |
| SGD, PL (Định lý 05b.47) | $\mathbb E\Delta_k$ | $(1-\eta\mu)^k\Delta_0+\tfrac{L\eta\sigma^2}{2\mu}$ | chỉ đạt $\varepsilon>\tfrac{L\eta\sigma^2}{2\mu}$ |

Ở dòng thứ hai, $C$ là $D^2$ cho $d_k^2$ và $e_0$ cho $e_k$.

**Công thức cần nhớ.**

- Đồng nhất thức một bước (2.4): $\lVert x-\eta g-x^*\rVert^2=\lVert x-x^*\rVert^2-2\eta\,g^T(x-x^*)+\eta^2\lVert g\rVert^2$.
- Chuỗi cầu nối (2.5), dưới H2, H3, H4:

$$
\tfrac\mu2d^2\le e\le\tfrac1{2\mu}\lVert\nabla f\rVert^2\le\tfrac L\mu\,e\le\tfrac{L^2}{2\mu}d^2 .
$$

- Sàn nhiễu (5.4): $\tfrac{\eta\sigma^2}\mu$; giới hạn thật trên hàm bậc hai một chiều $\tfrac{\eta\sigma^2}{\mu(2-\eta\mu)}$.

**Giả thiết hay bị bỏ quên.**

1. H4: sự tồn tại của điểm cực tiểu; mất mát logistic trên dữ liệu tách được không có (Ví dụ 05b.4).
2. H2 toàn cục hay chỉ trên một vùng chứa dãy lặp (Ví dụ 05b.24, Tình huống 05b.3).
3. Nhóm rút có hoàn lại để H6 đúng (Nhận xét 05b.33).
4. H6a mâu thuẫn với H3 trên toàn không gian; H6b có thể chỉ đúng trên một vùng (Tình huống 05b.2).
5. Bước chọn trước, không phụ thuộc nhóm được rút, và $x_0$ tất định.
6. Đầu ra được chặn: điểm cuối, lặp tốt nhất hay trung bình lặp.

**Chuỗi suy luận của toàn bài.**

1. Mục 1: dạng hội tụ, tốc độ, giả thiết (Định nghĩa 05b.1, 05b.2, 05b.5).
2. Mục 2: bất đẳng thức tại một điểm (Bổ đề 05b.6, 05b.7, 05b.8, Mệnh đề 05b.12) và giữa hai điểm (Bổ đề 05b.9).
3. Mục 3: khuôn một bước (Bổ đề 05b.15) cho GD trên hàm lồi, lồi mạnh, với quay lui (Định lý 05b.16, 05b.18, 05b.20).
4. Mục 4: bỏ H2, dưới gradient và trung bình lặp (Định lý 05b.26).
5. Mục 5: lấy kỳ vọng có điều kiện, SGD lồi và lồi mạnh, sàn nhiễu, lịch bước, Markov (Định lý 05b.34, 05b.36, Hệ quả 05b.38).
6. Mục 6: bỏ tính lồi, hàm thế $f-f_{\inf}$, chuẩn gradient, điều kiện PL (Định lý 05b.43, 05b.47).
7. Mục 7: bảng tra và phạm vi.

**Giới hạn còn lại và bài tiếp theo.** Hằng số $\sigma^2$ của H6b được giả thiết, chưa được ước lượng: Bài 05c tính phương sai của gradient nhóm theo cỡ nhóm, so sánh rút có và không hoàn lại, và cho các bất đẳng thức tập trung (Chebyshev, Hoeffding) chặt hơn Markov. Các phương pháp có momentum, bước thích nghi theo tọa độ như Adam, và phương pháp bậc hai xấp xỉ nằm ngoài các định lý của chương; Bài 06 trình bày chúng và dùng lại trung bình lặp của Định lý 05b.26 dưới tên trung bình Polyak.


## Bài tập củng cố

Ba bài dưới đây, một bài ở mỗi mức, bổ sung cho các bài tập trong từng mục. Bảng sau ghi bài tập ứng với mỗi mục tiêu học tập.

| Mục tiêu | Bài tập |
|---|---|
| 1. Dạng hội tụ, tốc độ, số bước | 05b.1, 05b.7 |
| 2. Bất đẳng thức cầu nối | 05b.2 |
| 3. Định lý hạ gradient, cận và số bước | 05b.3, 05b.8 |
| 4. Phương pháp dưới gradient | 05b.4 |
| 5. SGD lồi và lồi mạnh, sàn nhiễu, lịch bước, xác suất | 05b.5, 05b.9 |
| 6. Mục tiêu không lồi, điều kiện PL | 05b.6, 05b.7 |

::: exercise Bài tập 05b.7 (Mức nhận biết: phân loại năm phát biểu)
Với mỗi phát biểu dưới đây, xác định: dạng hội tụ theo Định nghĩa 05b.1 (hoặc chỉ ra phát biểu không thuộc dạng nào), kiểu tốc độ theo Định nghĩa 05b.2, một kết quả của chương có thể cho phát biểu đó, và giả thiết cần kiểm.

- (a) Hồi quy logistic có chính quy hóa, GD bước $\tfrac1L$: $f(x_k)-f^*\le0{,}3\cdot0{,}9^k$.
- (b) SGD bước hằng trên một mạng nơ ron: $\tfrac1K\sum_{k<K}\mathbb E\lVert\nabla f(x_k)\rVert^2\le\tfrac5K+0{,}02$.
- (c) SGD bước $\tfrac1{\mu(k+1)}$ trên một mất mát lồi mạnh: $\mathbb E\lVert x_k-x^*\rVert^2\le\tfrac3k$.
- (d) Máy vectơ tựa với mất mát bản lề, phương pháp dưới gradient: $\min_{k<K}f(x_k)-f^*\le\tfrac2{\sqrt K}$.
- (e) SGD nhóm một mẫu, bước $0{,}1$, từ $\theta_0=0$ trên ba quan sát $y=(-1,1,3)$ với $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$: $\mathbb E\theta_k=1-0{,}9^k\to1$, trong khi $\mathbb E(\theta_k-1)^2\to\tfrac8{57}$.
:::

::: hint Gợi ý Bài tập 05b.7
Đọc vế trái trước: đại lượng nào, có kỳ vọng không, điểm cuối hay lặp tốt nhất hay trung bình. Rồi tra cột "đại lượng được chặn" của bảng ở Mục 7.1.
:::

::: solution Lời giải Bài tập 05b.7
**Câu (a).**

Hội tụ theo giá trị, tuyến tính hệ số $0{,}9$. Định lý 05b.18(b); cần H2, H3 (chính quy hóa cho $\mu=\nu$), và hệ số cho thấy $\kappa=10$.

**Câu (b).**

Hội tụ theo kỳ vọng tới điểm dừng, đo bằng trung bình trên $K$ bước; phần $\tfrac5K$ dưới tuyến tính, phần $0{,}02$ là sàn nhiễu không giảm. Định lý 05b.43; cần H0, H2, H6, H6b, mà với mạng nơ ron thường chỉ đúng trên một vùng. Phát biểu không nói gì về cực tiểu.

**Câu (c).**

Hội tụ theo kỳ vọng của bình phương khoảng cách, tốc độ $O(1/k)$. Định lý 05b.39; cần H3, H6, H6a trên vùng chứa dãy, và biết đúng $\mu$.

**Câu (d).**

Hội tụ theo giá trị, đo bằng lặp tốt nhất, tốc độ $O(1/\sqrt K)$. Định lý 05b.26 với bước hằng tối ưu (Hệ quả 05b.27); cần lồi, H4, H5 với $DG=2$.

**Câu (e).**

Phát biểu $\mathbb E\theta_k\to1$ không thuộc dạng nào của Định nghĩa 05b.1: kỳ vọng của điểm lặp tiến về nghiệm trong khi kỳ vọng bình phương khoảng cách dừng ở $\tfrac8{57}$, nên dãy không hội tụ theo kỳ vọng (Nhận xét 05b.4).

**Kiểm tra lại.**

Mỗi câu (a)–(d) khớp đúng một dòng của bảng ở Mục 7.1 theo cột đại lượng được chặn; câu (e) không khớp dòng nào.
:::

::: exercise Bài tập 05b.8 (Mức tính toán: ba cận trên một hàm bậc hai lệch thang)
Cho $f(x)=\tfrac12\bigl([x]_1^2+10[x]_2^2\bigr)$ trên $\mathbb R^2$, $x_0=(10,1)$, GD bước $\tfrac1L$.

- (a) Xác định $L$, $\mu$, $\kappa$, $D^2$, $e_0$.
- (b) Tính số bước mà Định lý 05b.16 và Định lý 05b.18(a), (b) bảo đảm cho $e_k\le0{,}01$ hoặc $d_k^2\le0{,}01$.
- (c) Tính $x_k$, $e_k$, $d_k^2$ dưới dạng đóng và số bước thật.
:::

::: hint Gợi ý Bài tập 05b.8
Bước $\tfrac1L=\tfrac1{10}$ nhân tọa độ thứ nhất với $0{,}9$ và triệt tiêu tọa độ thứ hai.
:::

::: solution Lời giải Bài tập 05b.8
**Câu (a).**

$\nabla^2f=\operatorname{diag}(1,10)$, nên $L=10$, $\mu=1$, $\kappa=10$. $x^*=0$, $D^2=100+1=101$, $e_0=\tfrac12(100+10)=55$.

**Câu (b).**

- Định lý 05b.16 với $\eta=\tfrac1{10}$: $e_k\le\tfrac{LD^2}{2k}=\tfrac{505}k$, cần $k\ge50\,500$.
- Định lý 05b.18(b): $55\cdot0{,}9^k\le0{,}01$ khi $k\ge\tfrac{\log5500}{\log(10/9)}\approx81{,}7$, tức $82$.
- Định lý 05b.18(a): $101\cdot0{,}9^k\le0{,}01$ khi $k\ge\tfrac{\log10\,100}{\log(10/9)}\approx87{,}5$, tức $88$.

**Câu (c).**

$x_1=(9,0)$ và $x_k=(10\cdot0{,}9^k,0)$ với $k\ge1$, nên $e_k=50\cdot0{,}81^k$ và $d_k^2=100\cdot0{,}81^k$. $e_k\le0{,}01$ khi $k\ge\tfrac{\log5000}{\log(1/0{,}81)}\approx40{,}4$, tức $41$; $d_k^2\le0{,}01$ khi $k\ge\tfrac{\log10^4}{\log(1/0{,}81)}\approx43{,}7$, tức $44$.

**Kiểm tra lại.**

$50\cdot0{,}81^{40}\approx0{,}0109>0{,}01$ và $50\cdot0{,}81^{41}\approx0{,}0088$. Hệ số co thật $0{,}81=(1-\tfrac1\kappa)^2$, đúng như Nhận xét 05b.19 dự đoán khi chỉ còn hướng có độ cong $\mu$.
:::

::: exercise Bài tập 05b.9 (Mức vận dụng vào AI: sàn nhiễu của hồi quy một biến khi H6b chỉ đúng trên một đoạn)
Hồi quy tuyến tính một tham số không hệ số chặn với ba quan sát $(c_i,y_i)=(1,1),(2,1),(-1,0)$ và $f(x)=\tfrac16\sum_{i=1}^3(c_ix-y_i)^2$. SGD nhóm một mẫu, bước $\eta=0{,}1$, $x_0=0$.

- (a) Tính $\mu$, $L$, $x^*$, $f^*$.
- (b) Với $\zeta=x-x^*$, chứng minh phương sai của gradient một mẫu bằng $2\zeta^2+\tfrac16$; suy ra H6b không đúng trên toàn $\mathbb R$.
- (c) Chứng minh mọi điểm lặp thỏa $\lvert x_k-x^*\rvert\le\tfrac12$. Suy ra H6b đúng tại mọi điểm lặp với một $\sigma^2$ cụ thể, rồi viết cận của Định lý 05b.36.
- (d) Tính giới hạn chính xác của $\mathbb E(x_k-x^*)^2$ và so với sàn nhiễu của (c).
- (e) Dùng Hệ quả 05b.38 với $\eta^{(0)}=0{,}1$ và đích $\varepsilon=0{,}005$: tính các sàn $\omega_m$, độ dài pha $T_m$, chỉ số pha cuối $M$ và tổng số bước. Kiểm rằng dãy vẫn ở trong đoạn của (c) khi bước nhỏ hơn $0{,}1$.
:::

::: hint Gợi ý Bài tập 05b.9
Gradient mẫu là $c_i(c_ix-y_i)=c_i^2\zeta+c_i\rho_i$ với $\rho_i=c_ix^*-y_i$. Ở (c), viết $\zeta_{k+1}=(1-\eta c^2)\zeta_k-\eta c\rho$ và xét ba khả năng của cặp $(c,\rho)$ được rút. Ở (d), số hạng chéo có kỳ vọng $0$. Ở (e), $\omega_m=\eta^{(m)}\sigma^2/\mu$, $T_0=\lceil\log(D^2/\omega_0)/(\eta^{(0)}\mu)\rceil$, $T_m=\lceil\log4/(\eta^{(m)}\mu)\rceil$.
:::

::: solution Lời giải Bài tập 05b.9
**Câu (a).**

$f''=\tfrac13\sum_ic_i^2=2$, nên $\mu=L=2$. $x^*=\tfrac{\sum c_iy_i}{\sum c_i^2}=\tfrac12$, vì tử số bằng $1+2+0=3$ và mẫu số bằng $6$. Phần dư $\rho=(-\tfrac12,0,-\tfrac12)$, nên $f^*=\tfrac16\bigl(\tfrac14+0+\tfrac14\bigr)=\tfrac1{12}$.

**Câu (b).**

Gradient mẫu trừ $f'(x)=2\zeta$ là $(c_i^2-2)\zeta+c_i\rho_i$, nhận ba giá trị $-\zeta-\tfrac12$; $2\zeta$; $-\zeta+\tfrac12$. Trung bình bình phương:

$$
\tfrac13\Bigl[(\zeta+\tfrac12)^2+4\zeta^2+(\zeta-\tfrac12)^2\Bigr]=\tfrac13\Bigl[6\zeta^2+\tfrac12\Bigr]=2\zeta^2+\tfrac16 .
$$

Biểu thức không bị chặn khi $\lvert\zeta\rvert\to\infty$, nên không có $\sigma^2$ toàn cục.

**Câu (c).**

$\zeta_{k+1}=(1-0{,}1c^2)\zeta_k-0{,}1c\rho$: với $c=1$, $\zeta_{k+1}=0{,}9\zeta_k+0{,}05$; với $c=2$, $\zeta_{k+1}=0{,}6\zeta_k$; với $c=-1$, $\zeta_{k+1}=0{,}9\zeta_k-0{,}05$. Nếu $\lvert\zeta_k\rvert\le\tfrac12$ thì $\lvert\zeta_{k+1}\rvert\le0{,}45+0{,}05=\tfrac12$; quy nạp từ $\zeta_0=-\tfrac12$. Trên $\lvert\zeta\rvert\le\tfrac12$, phương sai không vượt $2\cdot\tfrac14+\tfrac16=\tfrac23$. Với $\eta=0{,}1\le\tfrac1L$, $D^2=\tfrac14$, Định lý 05b.36 cho

$$
\mathbb E\zeta_k^2\le0{,}8^k\cdot\tfrac14+\tfrac{0{,}1\cdot2/3}2=0{,}8^k\cdot\tfrac14+\tfrac1{30}.
$$

**Câu (d).**

Bình phương phép lặp và lấy kỳ vọng; $\zeta_k$ độc lập với mẫu mới, và $\mathbb E[(1-0{,}1c^2)c\rho]=\tfrac13\bigl(0{,}9\cdot(-\tfrac12)+0+0{,}9\cdot\tfrac12\bigr)=0$, nên số hạng chéo bằng $0$:

$$
\mathbb E\zeta_{k+1}^2=\tfrac{0{,}81+0{,}36+0{,}81}3\,\mathbb E\zeta_k^2+0{,}01\cdot\tfrac{\frac14+0+\frac14}3=0{,}66\,\mathbb E\zeta_k^2+\tfrac1{600}.
$$

Giới hạn là $\tfrac{1/600}{0{,}34}=\tfrac1{204}\approx0{,}0049$, nhỏ hơn sàn nhiễu $\tfrac1{30}\approx0{,}033$ khoảng bảy lần.

**Câu (e).**

Với bước $\eta\le0{,}1$, $\lvert\zeta_{k+1}\rvert\le(1-\eta)\lvert\zeta_k\rvert+\tfrac\eta2\le\tfrac12$ khi $c=\pm1$ và $\lvert\zeta_{k+1}\rvert=(1-4\eta)\lvert\zeta_k\rvert$ khi $c=2$, nên đoạn $\lvert\zeta\rvert\le\tfrac12$ vẫn bất biến và $\sigma^2=\tfrac23$, $\mu=L=2$ giữ nguyên. Sàn pha đầu $\omega_0=\tfrac{0{,}1\cdot2/3}2=\tfrac1{30}$, lớn hơn $\varepsilon$. Các độ dài pha:

- $T_0=\lceil\log7{,}5/0{,}2\rceil$, với $\log7{,}5/0{,}2\approx10{,}07$, nên $T_0=11$;
- $T_m=\lceil6{,}93\cdot2^m\rceil$, cho $14$, $28$, $56$, $111$ với $m=1,2,3,4$.

$2\omega_M=\tfrac1{15}2^{-M}\le0{,}005$ khi $2^M\ge13{,}3$, nên $M=4$. Tổng số bước là $11+14+28+56+111=220$.

**Kiểm tra lại.**

Vế phải của Hệ quả 05b.38(b) bằng khoảng $385$, không nhỏ hơn $220$; chạy đệ quy chính xác theo lịch cho $\mathbb E\zeta_{220}^2\approx0{,}00028\le0{,}005$. Tại $\zeta=0$, phương sai là $\tfrac16$, bằng $\tfrac13\sum c_i^2\rho_i^2=\tfrac13(\tfrac14+0+\tfrac14)$. Sàn nhiễu của định lý dùng phương sai lớn nhất trên đoạn, $\tfrac23$, gấp bốn lần phương sai tại nghiệm; cộng với thừa số khoảng $2$ của Nhận xét 05b.37, điều này giải thích phần lớn chênh lệch.
:::


## Hướng dẫn đọc thêm và tài liệu tham khảo

- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press, mục 9.1.2 (tr. 459–461: lồi mạnh và các hệ quả, công thức (9.8)–(9.14)) và mục 9.3.1 (tr. 466–468: hội tụ của hạ gradient với tìm bước chính xác và với quay lui). Dùng cho Mục 1.4, 2, 3.3–3.4.
- Yurii Nesterov (2004), *Introductory Lectures on Convex Optimization: A Basic Course*, Kluwer, mục 2.1 (lớp hàm có gradient Lipschitz và lớp hàm lồi mạnh, các bất đẳng thức tương đương).
- Amir Beck (2017), *First-Order Methods in Optimization*, SIAM, chương 3 (dưới gradient) và chương 10 (Định lý 10.21: phương pháp gradient bước hằng trên hàm lồi). Dùng cho Mục 3.2 và 4.2.
- R. Tyrrell Rockafellar (1970), *Convex Analysis*, Princeton University Press, Định lý 23.4 (tr. 217) và Định lý 23.8 (tr. 223). Nguồn của Mệnh đề 05b.22(c), (d).
- Sébastien Bubeck (2015), *Convex Optimization: Algorithms and Complexity*, Foundations and Trends in Machine Learning 8(3–4), mục 3.1 (phương pháp dưới gradient có chiếu), mục 3.2 (hạ gradient cho hàm trơn) và chương 6 (phương pháp ngẫu nhiên). Đọc thêm cho Mục 4, 5.
- Suvrit Sra, Sebastian Nowozin và Stephen J. Wright, biên tập (2011), *Optimization for Machine Learning*, MIT Press: chương 4 của D. P. Bertsekas (Mệnh đề 4.8, tr. 110: phương pháp gia tăng ngẫu nhiên với bước giảm dần); chương 5 của A. Juditsky và A. Nemirovski (Mệnh đề 5.1, tr. 127–128: cận của phương pháp gương, trường hợp Euclid là Định lý 05b.26; Mệnh đề 5.4, tr. 133: khởi động lại theo pha; Mệnh đề 5.5, tr. 134: phiên bản ngẫu nhiên); chương 13 của L. Bottou và O. Bousquet (mục 13.3, tr. 355–361: đánh đổi giữa sai số tối ưu và chi phí tính toán trong học quy mô lớn).
- Léon Bottou, Frank E. Curtis và Jorge Nocedal (2018), "Optimization Methods for Large-Scale Machine Learning", *SIAM Review* 60(2), 223–311, mục 4 (giả thiết về gradient ngẫu nhiên, định lý với bước cố định và bước giảm dần cho hàm lồi mạnh và không lồi). Đọc thêm cho Mục 5, 6.
- Arkadi Nemirovski, Anatoli Juditsky, Guanghui Lan và Alexander Shapiro (2009), "Robust Stochastic Approximation Approach to Stochastic Programming", *SIAM Journal on Optimization* 19(4), 1574–1609, mục 1 và mục 2.1. Lập luận của Định lý 05b.39 và độ nhạy theo $\mu$.
- Saeed Ghadimi và Guanghui Lan (2013), "Stochastic First- and Zeroth-Order Methods for Nonconvex Stochastic Programming", *SIAM Journal on Optimization* 23(4), 2341–2368.
- Hamed Karimi, Julie Nutini và Mark Schmidt (2016), "Linear Convergence of Gradient and Proximal-Gradient Methods under the Polyak–Łojasiewicz Condition", *ECML PKDD 2016*, mục 2. Nguồn của Mục 6.5 và ví dụ $x^2+3\sin^2x$; B. T. Polyak (1963), "Gradient methods for minimizing functionals", *USSR Computational Mathematics and Mathematical Physics* 3(4), là bài gốc của điều kiện.
- Chaoyue Liu, Libin Zhu và Mikhail Belkin (2022), "Loss Landscapes and Optimization in Over-Parameterized Non-Linear Systems and Neural Networks", *Applied and Computational Harmonic Analysis* 59, 85–116. Điều kiện PL cục bộ cho mạng rất rộng.
- Herbert Robbins và Sutton Monro (1951), "A Stochastic Approximation Method", *Annals of Mathematical Statistics* 22(3), 400–407. Nguồn của điều kiện Robbins–Monro.
- Ian Goodfellow, Yoshua Bengio và Aaron Courville (2016), *Deep Learning*, MIT Press, mục 8.3.1 (tr. 294–296: điều kiện bước của SGD, tốc độ $O(1/\sqrt k)$ và $O(1/k)$, nhận xét của Bottou và Bousquet về chi phí).
- Yi-Shuai Niu (2024), *Optimization Methods for Machine Learning*, bài giảng BIMSA, Định lý 26–27 (tr. 96–98: hạ gradient trên hàm lồi và lồi mạnh) và Định lý 29 (tr. 114: SGD với hàm lồi mạnh).
- Ghi chú Bài 01 (Định nghĩa 01.10, 01.22, 01.39; Định lý 01.26), Bài 04 (Mục 2.6: Bổ đề 04.18, 04.20, 04.21, 04.23; Định lý 04.22, 04.24, 04.26; Mệnh đề 04.25), Bài 05 (Mục 2: Định lý 05.11, Hệ quả 05.12, Mệnh đề 05.14, Ví dụ 05.14) và Bài 05c (kỳ vọng có điều kiện, bất đẳng thức tập trung) là tiên quyết trực tiếp.

Các định lý của Mục 3, 5 và 6 được chứng minh trực tiếp từ các bổ đề của Mục 2 và 3; hằng số trong các phát biểu là hằng số của chứng minh trong ghi chú, có thể khác hằng số của nguồn. Mọi ví dụ số được tính từ công thức đã nêu; các con số có nhãn "mô phỏng" là ước lượng Monte Carlo với hạt giống ghi trong ví dụ.
