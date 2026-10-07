# Bài 05b — Hội tụ của hạ gradient và hạ gradient ngẫu nhiên

Bài 04 phát biểu ba định lý hội tụ của phương pháp hạ gradient (GD): cận $O(1/k)$ cho hàm lồi có gradient Lipschitz với bước $1/L$ và với quay lui, cận tuyến tính cho hàm lồi mạnh. Bài 05 dùng phương pháp hạ gradient ngẫu nhiên (SGD) với gradient nhóm và lịch bước nhưng chưa có định lý hội tụ. Ghi chú này trả lời một câu hỏi cho phép lặp $x_{k+1}=x_k-\eta_kg_k$: dãy lặp hội tụ theo nghĩa nào, nhanh đến đâu, dưới giả thiết nào và với bước nào. Vectơ cập nhật $g_k$ là $\nabla f(x_k)$ trong GD, một dưới gradient (subgradient) trong phương pháp dưới gradient khi $f$ lồi nhưng không khả vi, hoặc gradient trên một nhóm mẫu (Bài 05) trong SGD.

Mọi chứng minh hội tụ trong bài dùng một khuôn: lập bất đẳng thức giữa $x_k$ và $x_{k+1},$ nối các bất đẳng thức đó qua mọi bước, rồi chọn $\eta_k.$ Giả thiết quyết định bất đẳng thức đó và cách nối. Các phần sau gọi khuôn này là khuôn một bước và bất đẳng thức giữa hai lần lặp là bất đẳng thức một bước. Dạng của bất đẳng thức một bước quyết định một trong ba cách nối: cộng các bất đẳng thức để số hạng giữa triệt tiêu (tổng lồng, telescoping sum), nhân các hệ số co, hoặc giải đệ quy khi có thêm số hạng nhiễu. Phần C đặt tên hai cách nối tổng lồng và co; giải đệ quy xuất hiện ở chứng minh SGD cho hàm lồi mạnh. Phần A định nghĩa các dạng hội tụ; phần B chứng minh các bất đẳng thức liên hệ chúng; phần C, D, E, F lần lượt xét GD, phương pháp dưới gradient, SGD cho hàm lồi và lồi mạnh, SGD cho mục tiêu không lồi; phần G tổng hợp thành bảng tra.

Bảng sau gắn bốn kết quả học tập với các phần của ghi chú. Các kết quả ứng với bốn chuẩn đầu ra bài học (LLO6, LLO8, LLO11, LLO12) và hai chuẩn đầu ra học phần (CLO1, CLO2).

| Kết quả học tập | Phần |
|---|---|
| Phân biệt dạng hội tụ, suy quan hệ giữa chúng từ giả thiết | A, B |
| Chứng minh lại định lý theo khuôn một bước, chỉ ra bước dùng từng giả thiết | C, D, E, F |
| Chọn bước, tính cận và số bước cho một bài toán cụ thể | Ví dụ A–D, bảng tra ở G |
| Phát biểu, áp dụng định lý hội tụ của SGD và nêu giới hạn | E, F, G |

Kiến thức nền: kỳ vọng, phương sai, tính độc lập của biến ngẫu nhiên rời rạc (Bài 00); bất đẳng thức tiếp tuyến của hàm lồi khả vi (Bài 01); GD, gradient Lipschitz, lồi mạnh (Bài 04); gradient nhóm và lịch bước (Bài 05). Bài bổ trợ này không có buổi riêng trong đề cương; nó đào sâu phần phân tích hội tụ của các chuẩn đầu ra kể trên. Bộ bài tập đi kèm có ba mức: nhận biết, tính toán hoặc chứng minh, và vận dụng vào AI.

## A. Các dạng hội tụ của một dãy lặp

### Bốn ví dụ dẫn

Bài dùng bốn ví dụ cố định, gọi là Ví dụ A, B, C, D.

- **Ví dụ A** (Bài 05): ba quan sát $y=(-1,1,3)$, mô hình hằng $\theta\in\mathbb R$, mất mát bình phương. Mục tiêu $J(\theta)=\tfrac16\sum_i(\theta-y_i)^2=\tfrac12(\theta-1)^2+\tfrac43$, nghiệm $\theta^*=1$.
- **Ví dụ B**: cùng ba quan sát, mất mát trị tuyệt đối, $f(x)=\tfrac13\bigl(\lvert x+1\rvert+\lvert x-1\rvert+\lvert x-3\rvert\bigr)$. Nghiệm là trung vị $x^*=1$, $f^*=\tfrac43$.
- **Ví dụ C** (Bài 04): $f(x)=\tfrac12(3x_1^2+7x_2^2)$ trên $\mathbb R^2$, nghiệm $x^*=0$, $f^*=0$, điểm đầu $x_0=(2,4)$, $f(x_0)=62$.
- **Ví dụ D** (Bài 05, hàm hai cực tiểu): $F(\theta)=\tfrac14(\theta^2-1)^2$, hai cực tiểu $\pm1$ và cực đại địa phương $0$.

::: example Ví dụ C: hai thước đo cùng giảm nhanh
Gradient là $\nabla f(x)=(3x_1,7x_2)$. Với bước $\tfrac17$,

$$
x_{k+1}=\Bigl(\bigl(1-\tfrac37\bigr)[x_k]_1,\ (1-1)[x_k]_2\Bigr)=\Bigl(\tfrac47[x_k]_1,\ 0\Bigr),
$$

trong đó $[x]_i$ là tọa độ thứ $i$. Từ $x_0=(2,4)$ ta có $x_1=(\tfrac87,0)$ và $x_k=\bigl(2(\tfrac47)^k,0\bigr)$ với $k\ge1$. Do đó, với $e_k=f(x_k)-f^*$ và $d_k=\lVert x_k-x^*\rVert$,

$$
e_k=6\Bigl(\frac{16}{49}\Bigr)^k,\qquad d_k^2=4\Bigl(\frac{16}{49}\Bigr)^k=\frac23e_k\qquad(k\ge1).
$$

| $k$ | $e_k$ | $d_k^2$ | cận $70/k$ của Bài 04 |
|---:|---:|---:|---:|
| 1 | 1,96 | 1,31 | 70 |
| 5 | 0,0223 | 0,0149 | 14 |
| 10 | $8{,}3\cdot10^{-5}$ | $5{,}5\cdot10^{-5}$ | 7 |

Hai đại lượng giảm theo cấp số nhân cùng tỉ số $\tfrac{16}{49}$, còn cận của định lý $O(1/k)$ ở Bài 04, với $L=7$ và $D^2=\lVert x_0\rVert^2=20$, là $LD^2/(2k)=70/k$. Trên thang logarit, hai dãy là hai đường thẳng song song, còn cận giảm chậm.

![Thang logarit, k từ 0 đến 8: sai số giá trị e_k và bình phương khoảng cách d_k² giảm theo hai đường thẳng song song, từ 1,96 và 1,31 tại k = 1; cận 70/k ở phía trên giảm chậm.](img/lec-05b/vdc-measures.svg)
:::

::: example Ví dụ A: kỳ vọng giảm về một giá trị dương
SGD với nhóm một mẫu, bước $0{,}1$, $\theta_0=0$: $\theta_{k+1}=\theta_k-0{,}1(\theta_k-y_{I_k})$, với $I_k$ đều trên $\{1,2,3\}$ và độc lập. Viết lại quanh nghiệm,

$$
\theta_{k+1}-1=0{,}9(\theta_k-1)+0{,}1(y_{I_k}-1).
$$

Biến $y_{I_k}-1$ có kỳ vọng $0$, phương sai $\tfrac13(4+0+4)=\tfrac83$, và độc lập với $\theta_k$. Đặt $a_k=\mathbb E(\theta_k-1)^2$; khai triển bình phương và lấy kỳ vọng, số hạng chéo bằng $0$:

$$
a_{k+1}=0{,}81\,a_k+0{,}01\cdot\tfrac83=0{,}81\,a_k+\tfrac8{300},\qquad a_0=1.
$$

Do đó $a_1\approx0{,}837$, $a_2\approx0{,}704$, $a_{20}\approx0{,}153$ và $a_k\to\tfrac{8/300}{1-0{,}81}=\tfrac8{57}\approx0{,}140$. Kỳ vọng giảm về giá trị giới hạn dương; bước hằng giữ lại nhiễu của gradient mẫu. Một lần chạy riêng lẻ không hội tụ: $(\theta_k-1)^2$ dao động và không tiến về $0$, nên với SGD thước đo là kỳ vọng.

![k từ 0 đến 40: bình phương sai lệch của một lần chạy dao động không về 0; kỳ vọng giảm từ 1 về giá trị giới hạn 0,140.](img/lec-05b/vda-sgd-path.svg)
:::

Một khẳng định hội tụ phải nêu đại lượng được đo và kiểu giảm: ở Ví dụ C, giá trị và khoảng cách giảm theo cấp số nhân; ở Ví dụ A, kỳ vọng của bình phương khoảng cách giảm về một hằng số dương.

### Dạng hội tụ và tốc độ hội tụ

**Định nghĩa (dạng hội tụ).** Cho $f:\mathbb R^n\to\mathbb R$, $x^*$ là một điểm cực tiểu và $f^*=f(x^*)$. Dãy $(x_k)$ hội tụ

1. theo dãy lặp nếu $d_k=\lVert x_k-x^*\rVert\to0$;
2. theo giá trị nếu $e_k=f(x_k)-f^*\to0$;
3. tới điểm dừng nếu $\lVert\nabla f(x_k)\rVert\to0$;
4. theo kỳ vọng nếu $x_k$ ngẫu nhiên và kỳ vọng của $d_k$, $e_k$ hoặc $\lVert\nabla f(x_k)\rVert$ (hay bình phương của chúng) tiến về $0$.

Vì $\mathbb E d_k\le\sqrt{\mathbb E d_k^2}$, chặn $\mathbb E d_k^2$ mạnh hơn chặn $\mathbb E d_k$: cận $\mathbb E d_k^2=O(1/k^p)$ chỉ cho $\mathbb E d_k=O(1/k^{p/2})$.

Ba dãy $0{,}8^k$, $1/k$ và $1/\sqrt k$ đều tiến về $0$, nhưng số bước để không vượt $10^{-3}$ lần lượt là $31$, $1000$ và $10^6$. Trên thang logarit, dãy thứ nhất là đường thẳng độ dốc $\log0{,}8$; hai dãy còn lại cong và phẳng dần. Định nghĩa sau phân loại các kiểu giảm này.

![Ba đường sai số theo số bước trên thang logarit: đường 0,8 mũ k là đường thẳng; đường 1/k và 1/căn k cong và giảm chậm dần.](img/lec-05b/rates-log-error.svg)

**Định nghĩa (tốc độ).** Dãy $u_k\ge0$ hội tụ tuyến tính (linear convergence) với hệ số $q\in(0,1)$ nếu tồn tại $C>0$ để $u_k\le Cq^k$ với mọi $k$; hội tụ với tốc độ $O(1/k^p)$, $p>0$, nếu có $C>0$ để $u_k\le C/k^p$ với mọi $k\ge1$; khi không có cận tuyến tính, tốc độ này gọi là dưới tuyến tính (sublinear convergence).

Tài liệu dùng hai cách viết tốc độ tuyến tính: dạng cận $u_k\le Cq^k$ ở trên (R-tuyến tính) và dạng tỉ số $u_{k+1}\le qu_k$ (Q-tuyến tính). Nhân $k$ bất đẳng thức dạng tỉ số được $u_k\le q^ku_0$, nên dạng tỉ số kéo theo dạng cận với $C=u_0$. Chiều ngược sai: dãy $u_k=q^k$ với $k$ chẵn, $u_k=0$ với $k$ lẻ thỏa dạng cận với $C=1$, nhưng $u_{k+1}\le qu_k$ sai tại mọi $k$ lẻ. Vì cận đúng với mọi $k$, nó cho số bước đủ để đạt sai số $\varepsilon>0$:

| Dạng cận | Số bước đủ để $u_k\le\varepsilon$ |
|---|---|
| $Cq^k$ | $k\ge\ln(C/\varepsilon)/\ln(1/q)$ |
| $C(1-1/\kappa)^k$, $\kappa>1$ | $k\ge\kappa\ln(C/\varepsilon)$, vì $\ln(1-1/\kappa)\le-1/\kappa$ |
| $C/k$ | $k\ge C/\varepsilon$ |
| $C/\sqrt k$ | $k\ge C^2/\varepsilon^2$ |

Áp dụng cho hai ví dụ dẫn: ở Ví dụ C, $e_k=6(16/49)^k$ và $d_k^2=4(16/49)^k$, nên dãy hội tụ theo giá trị và theo dãy lặp, tuyến tính với hệ số $\tfrac{16}{49}$; ở Ví dụ A với bước hằng $0{,}1$, $\mathbb E(\theta_k-1)^2\to\tfrac8{57}\approx0{,}140$, nên dãy không hội tụ theo kỳ vọng. Kỳ vọng của điểm lặp $\mathbb E\theta_k=1-0{,}9^k$ tiến về $1$, nhưng đó không phải hội tụ theo kỳ vọng theo định nghĩa trên.

Hai cách đo khác, lặp tốt nhất (best iterate) và trung bình lặp (iterate averaging), được định nghĩa ở phần D.

### Ký hiệu và giả thiết

| Ký hiệu | Nghĩa | Ở bài trước |
|---|---|---|
| $x_k$, $\eta_k$, $g_k$ | dãy lặp, bước, vectơ cập nhật | Bài 04: $x^k$, $t$, $g$; Bài 05: $\theta_t$, $\eta_t$, $\widehat g_t$ |
| $x^*$, $f^*$ | một điểm cực tiểu, $f^*=f(x^*)$ | $p^*$ ở Bài 02–03 |
| $e_k$, $d_k$ | $f(x_k)-f^*$, $\lVert x_k-x^*\rVert$ | |
| $D$ | $\lVert x_0-x^*\rVert$ | Bài 04: $R$, không dùng ở đây vì Bài 05 dùng $R$ cho rủi ro kỳ vọng; Bài 05 dùng $D$ cho tập dữ liệu |
| $K$ | số bước | Bài 05: $T$ |
| $L$, $\mu$, $\kappa$ | hằng số trơn, hằng số lồi mạnh, $\kappa=L/\mu$ | Bài 04 |
| $f_{\inf}$ | cận dưới đúng $\inf_xf(x)$, có thể không đạt | |

Chỉ số dưới $x_k$ được dùng để không lẫn với lũy thừa trong các cận dạng $q^k$. Chuẩn là chuẩn Euclid. Các giả thiết có tên, với mọi $x,y\in\mathbb R^n$:

- **H0.** $f$ khả vi trên $\mathbb R^n$ và bị chặn dưới, tức $f_{\inf}>-\infty$.
- **H1 (lồi).** $f$ khả vi và $f(y)\ge f(x)+\nabla f(x)^T(y-x)$.
- **H2 ($L$-trơn, $L$-smooth).** $\lVert\nabla f(x)-\nabla f(y)\rVert\le L\lVert x-y\rVert$.
- **H3 ($\mu$-lồi mạnh), $\mu>0$.** $f(y)\ge f(x)+\nabla f(x)^T(y-x)+\tfrac\mu2\lVert y-x\rVert^2$.
- **H4.** $f$ đạt giá trị nhỏ nhất tại một điểm $x^*$.

Các giả thiết H5 (chặn chuẩn dưới gradient), H6, H6a, H6b (gradient ngẫu nhiên) và H7 (điều kiện Polyak–Łojasiewicz) được nêu ở phần dùng đến. Mỗi định lý dùng một tập con của các giả thiết này. Boyd và Vandenberghe (§9.1) giả thiết $f$ lồi, khả vi liên tục hai lần, có nghiệm và $\nabla^2f\succeq mI$ trên tập mức ban đầu $S$; từ đó suy ra $\nabla^2f\preceq MI$ trên $S$. Ở đây các giả thiết tương ứng là H1, H4, H3 (với $\mu=m$) và H2 (với $L=M$), đúng trên toàn $\mathbb R^n$ và không cần đạo hàm bậc hai.

Bài tập 1, câu 3 phân loại bốn khẳng định hội tụ theo đại lượng được đo và kiểu giảm.

::: exercise Câu hỏi kiểm tra
Cho $u_k=5\cdot0{,}9^k+\tfrac1k$ với $k\ge1$. Xác định dãy hội tụ tuyến tính hay dưới tuyến tính, và tìm một hằng số $C$ để $u_k\le C/k$ với mọi $k\ge1$.
:::

## B. Bất đẳng thức cầu nối giữa các dạng hội tụ

### Hội tụ giá trị và hội tụ dãy lặp

Hai ví dụ cho thấy hội tụ giá trị không tự kéo theo hội tụ dãy lặp.

::: example Hàm logistic không đạt cực tiểu
Cho $\phi(s)=\log(1+e^{-s})$ trên $\mathbb R$. Ta có $\phi'(s)=-1/(1+e^s)<0$ và $\phi''(s)=e^s/(1+e^s)^2\in(0,\tfrac14]$, nên $\phi$ lồi, gradient Lipschitz với $L=\tfrac14$, và $\inf\phi=0$ không đạt. GD bước $1/L=4$ từ $s_0=0$ cho $s_{k+1}=s_k+4/(1+e^{s_k})$, tức $s_1=2$, $s_2\approx2{,}48$, $s_3\approx2{,}79$.

Dãy $(s_k)$ tăng ngặt. Nếu nó bị chặn, nó hội tụ tới $\bar s$ thỏa $\bar s=\bar s+4/(1+e^{\bar s})$, vô lý. Vậy $s_k\to\infty$ và $\phi(s_k)\to0$: giá trị hội tụ về cận dưới đúng trong khi dãy lặp không hội tụ. Từ $e^{s_{k+1}}\approx e^{s_k}+4$ suy ra $s_k\approx\ln(4k)$: $s_{10}\approx3{,}8$, $s_{100}\approx6{,}0$, $s_{1000}\approx8{,}3$, còn $\phi(s_{1000})\approx2{,}5\cdot10^{-4}$. Đây là mất mát logistic của dữ liệu phân loại tách được.
:::

![Đồ thị hàm logistic giảm dần về 0 nhưng không đạt 0; các điểm lặp s₀, s₁, s₁₀, s₁₀₀, s₁₀₀₀ của hạ gradient dịch dần sang phải, xấp xỉ ln(4k).](img/lec-05b/logistic-no-minimizer.svg)

**Ký hiệu.** $f_{\inf}=\inf_xf(x)$ là cận dưới đúng (infimum) của $f$. Ký hiệu này dùng cho mọi hàm bị chặn dưới, kể cả khi cận dưới không đạt; với $\phi$, $\phi_{\inf}=\inf_s\phi(s)=0$ không đạt.

Với $f(x)=x_1^2$ trên $\mathbb R^2$, mọi điểm $(0,c)$ là điểm cực tiểu; khẳng định “$x_k\to x^*$” phụ thuộc cách chọn $x^*$. GD bước $\eta\in(0,1)$ từ $x_0=(a,b)$ cho $x_k=((1-2\eta)^ka,\,b)\to(0,b)$, nên nghiệm được tới do điểm đầu quyết định. Nối $e_k$ với $d_k$ vì vậy cần nghiệm tồn tại (H4) và độ cong bị chặn: chặn trên (H2) cho cận của $e_k$ theo $d_k$; chặn dưới $\mu>0$ (H3) đủ cho chiều ngược lại và kéo theo nghiệm duy nhất (Boyd và Vandenberghe, §9.1.2).

### Cận trên bậc hai

Tại mỗi điểm $x$, đồ thị của hàm có gradient Lipschitz nằm dưới một parabol độ cong $L$ tiếp xúc tại $x$, còn H3 đặt đồ thị trên parabol độ cong $\mu$; bổ đề BĐ3 dùng chiều dưới này để chặn khoảng cách theo sai số giá trị. Hình lấy lát cắt của Ví dụ C theo hướng $(1,1)/\sqrt2$: $h(t)=f\bigl(t(1,1)/\sqrt2\bigr)=\tfrac12\cdot\tfrac{3+7}2t^2=2{,}5t^2$, độ cong $5$ nằm giữa $3$ và $7$. Theo trục $x_2$, độ cong bằng đúng $7$ và bất đẳng thức dưới đây xảy ra dấu bằng.

![Lát cắt h(t) = 2,5t² của hàm bậc hai Ví dụ C nằm giữa parabol trên độ cong 7 và parabol dưới độ cong 3, cả ba tiếp xúc tại t = 1.](img/lec-05b/quadratic-sandwich.svg)

**Bổ đề BĐ1 (cận trên bậc hai).** Giả sử $f$ khả vi và thỏa H2. Với mọi $x,y\in\mathbb R^n$,

$$
f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac L2\lVert y-x\rVert^2.
$$

::: proof Chứng minh BĐ1
Đặt $u=y-x$ và $\psi(t)=f(x+tu)$ với $t\in[0,1]$. Vì $f$ khả vi và $\nabla f$ liên tục (H2), $\psi'(t)=\nabla f(x+tu)^Tu$ và

$$
f(y)-f(x)-\nabla f(x)^Tu=\int_0^1\bigl(\nabla f(x+tu)-\nabla f(x)\bigr)^Tu\,dt.
$$

Theo Cauchy–Schwarz và H2, hàm dưới dấu tích phân không vượt $\lVert\nabla f(x+tu)-\nabla f(x)\rVert\lVert u\rVert\le Lt\lVert u\rVert^2$. Tích phân $\int_0^1Lt\,dt=\tfrac L2$ cho kết luận.
:::

Boyd và Vandenberghe (2004, (9.13)) suy cùng cận từ $\nabla^2f\preceq MI$ qua khai triển Taylor; chứng minh trên chỉ dùng H2, không cần đạo hàm bậc hai.

Khi H2 và H3 cùng đúng, BĐ1 và H3 cho $\tfrac\mu2\lVert y-x\rVert^2\le f(y)-f(x)-\nabla f(x)^T(y-x)\le\tfrac L2\lVert y-x\rVert^2$, nên $\mu\le L$.

### Bổ đề giảm và cận chuẩn gradient

Thế $y=x-\eta\nabla f(x)$ vào BĐ1 được bổ đề giảm; lấy $\eta=1/L$ và dùng $f_{\inf}\le f(y)$ được BĐ2.

**Bổ đề giảm (descent lemma).** Giả sử H2 và $\eta>0$. Với mọi $x$,

$$
f\bigl(x-\eta\nabla f(x)\bigr)\le f(x)-\eta\Bigl(1-\frac{L\eta}2\Bigr)\lVert\nabla f(x)\rVert^2,
$$

và khi $0<\eta\le1/L$, vế phải không vượt $f(x)-\tfrac\eta2\lVert\nabla f(x)\rVert^2$.

::: proof Chứng minh bổ đề giảm
Thế $y=x-\eta\nabla f(x)$ vào BĐ1: $\nabla f(x)^T(y-x)=-\eta\lVert\nabla f(x)\rVert^2$ và $\tfrac L2\lVert y-x\rVert^2=\tfrac{L\eta^2}2\lVert\nabla f(x)\rVert^2$. Khi $\eta\le1/L$, $1-\tfrac{L\eta}2\ge\tfrac12$.
:::

Hệ số giảm $\eta(1-\tfrac{L\eta}2)$ dương khi và chỉ khi $0<\eta<2/L$. Ngưỡng $2/L$ là điều kiện để bổ đề còn bảo đảm giảm; tự nó chưa chứng minh dãy phân kỳ khi $\eta>2/L$; Bài tập 2, câu 3 cho một dãy phân kỳ trên Ví dụ C với $\eta=0{,}3>2/L$. Bổ đề không cần tính lồi, nên được dùng lại ở phần F.

**Bổ đề BĐ2 (chặn chuẩn gradient bởi giá trị).** Giả sử H0, H2. Với mọi $x$, $\lVert\nabla f(x)\rVert^2\le2L\bigl(f(x)-f_{\inf}\bigr)$.

::: proof Chứng minh BĐ2
Áp bổ đề giảm với $\eta=1/L$ và dùng $f_{\inf}\le f(y)$ với mọi $y$:

$$
f_{\inf}\le f\Bigl(x-\frac1L\nabla f(x)\Bigr)\le f(x)-\frac1{2L}\lVert\nabla f(x)\rVert^2.
$$

Chứng minh chỉ cần $f_{\inf}$ là cận dưới, không cần cận dưới đạt; vì vậy bổ đề đúng cả cho hàm logistic. Cách nhìn khác, theo Boyd và Vandenberghe (9.14): vế phải BĐ1 đạt cực tiểu theo $y$ tại $y=x-\tfrac1L\nabla f(x)$ với giá trị $f(x)-\tfrac1{2L}\lVert\nabla f(x)\rVert^2$, còn vế trái không nhỏ hơn $f_{\inf}$.
:::

::: example Ví dụ C tại điểm đầu
Tại $x_0=(2,4)$: $f(x_0)=62$, $f_{\inf}=0$, $\nabla f(x_0)=(6,28)$, $\lVert\nabla f(x_0)\rVert^2=820\le2L\bigl(f(x_0)-f_{\inf}\bigr)=2\cdot7\cdot62=868$. Bổ đề giảm với bước $\tfrac17$ cho $f(x_1)\le62-\tfrac{820}{14}=\tfrac{24}7\approx3{,}43$; giá trị thật là $f(x_1)=f(\tfrac87,0)=\tfrac{96}{49}\approx1{,}96$.
:::

### Cận của hàm lồi mạnh

BĐ1 với $x^*$ ở vị trí của $x$ chặn $e$ theo $d$, BĐ2 chặn $\lVert\nabla f\rVert$ theo $e$; thêm H3 cho các chiều ngược lại.

**Bổ đề BĐ3 (cận của hàm lồi mạnh).** Giả sử H3, H4. Với mọi $x$, đặt $d=\lVert x-x^*\rVert$, $e=f(x)-f^*$. Khi đó

$$
\frac\mu2d^2\le e\le\frac1{2\mu}\lVert\nabla f(x)\rVert^2,\qquad d\le\frac2\mu\lVert\nabla f(x)\rVert.
$$

Ngoài ra $x^*$ là điểm cực tiểu duy nhất.

::: proof Chứng minh BĐ3
(1) Vì $x^*$ là điểm cực tiểu của hàm khả vi, $\nabla f(x^*)=0$. H3 với $x^*$ ở vị trí của $x$ và $y=x$ cho $f(x)\ge f^*+\tfrac\mu2d^2$.

(2) Với $x$ cố định, vế phải của H3, $q(y)=f(x)+\nabla f(x)^T(y-x)+\tfrac\mu2\lVert y-x\rVert^2$, là hàm bậc hai lồi theo $y$, đạt cực tiểu tại $y=x-\nabla f(x)/\mu$ với giá trị $f(x)-\tfrac1{2\mu}\lVert\nabla f(x)\rVert^2$. Vì $f(y)\ge q(y)$ với mọi $y$, lấy $y=x^*$: $f^*\ge f(x)-\tfrac1{2\mu}\lVert\nabla f(x)\rVert^2$.

(3) H3 với $y=x^*$ và Cauchy–Schwarz: $f^*\ge f(x)-\lVert\nabla f(x)\rVert d+\tfrac\mu2d^2$. Kết hợp với $f^*\le f(x)$ được $\tfrac\mu2d^2\le\lVert\nabla f(x)\rVert d$, tức $d\le\tfrac2\mu\lVert\nabla f(x)\rVert$.

(4) Nếu $x'$ cũng là điểm cực tiểu thì (1) cho $\tfrac\mu2\lVert x'-x^*\rVert^2\le f(x')-f^*=0$, nên $x'=x^*$.
:::

**Nhận xét sau BĐ3.** Bất đẳng thức trung gian của (3) là $e\le\lVert\nabla f(x)\rVert d-\tfrac\mu2d^2$. Cộng với $e\ge\tfrac\mu2d^2$ từ (1) được $\mu d^2\le\lVert\nabla f(x)\rVert d$, tức $\lVert\nabla f(x)\rVert\ge\mu d$: hằng số chặt hơn hai lần so với kết luận của BĐ3. Bất đẳng thức (2), viết lại thành $\tfrac12\lVert\nabla f(x)\rVert^2\ge\mu e$, là điều kiện Polyak–Łojasiewicz của phần F.

::: example Ví dụ C tại điểm đầu, với độ cong dưới
Với $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $\mu=3$, tại $x_0=(2,4)$ có $d^2=20$, $e=62$, $\lVert\nabla f(x_0)\rVert^2=820$, nên $\tfrac32\cdot20=30\le62\le\tfrac{820}6\approx136{,}7$ và $d=\sqrt{20}\approx4{,}47\le\tfrac23\sqrt{820}\approx19{,}1$; hằng số chặt hơn cho $d\le\tfrac13\sqrt{820}\approx9{,}55$.
:::

### Đồng nhất thức một bước

**Bổ đề BĐ4 (đồng nhất thức một bước).** Với mọi $x,g\in\mathbb R^n$ và $\eta>0$,

$$
\lVert x-\eta g-x^*\rVert^2=\lVert x-x^*\rVert^2-2\eta\,g^T(x-x^*)+\eta^2\lVert g\rVert^2.
$$

Đẳng thức có được khi khai triển $\lVert(x-x^*)-\eta g\rVert^2$, nên đúng với mọi vectơ $g$, kể cả khi $g$ không liên quan đến $f$, và $x^*$ ở đây có thể là điểm bất kỳ (tính tối ưu của $x^*$ chỉ dùng ở hệ quả của H1); vì vậy nó dùng được khi $g$ là gradient, dưới gradient hay gradient trên một nhóm mẫu. Các phần C–F chỉ khác nhau ở cách chặn hai số hạng cuối: một cận dưới cho $g^T(x-x^*)$ và một cận trên cho $\lVert g\rVert^2$, hoặc cho kỳ vọng của chúng.

**Hệ quả của H1.** Với H1, H4: $\nabla f(x)^T(x-x^*)\ge f(x)-f^*$; thay $y=x^*$ vào H1 rồi chuyển vế. Hệ quả này là cận dưới cho tích vô hướng trong BĐ4 khi $g=\nabla f(x)$.

**Nhận xét (ý nghĩa hình học).** Khi $g^T(x-x^*)>0$, bước $-\eta g$ có thành phần hướng về $x^*$. Theo BĐ4, khoảng cách giảm khi và chỉ khi $\eta^2\lVert g\rVert^2<2\eta\,g^T(x-x^*)$, tức $0<\eta<2g^T(x-x^*)/\lVert g\rVert^2$; ở Ví dụ C ngưỡng này là $2\cdot124/820\approx0{,}30$.

::: example Ví dụ C, một bước bước 1/7
$\nabla f(x_0)^T(x_0-x^*)=6\cdot2+28\cdot4=124\ge62=e_0$. BĐ4 cho $d_1^2=20-\tfrac27\cdot124+\tfrac1{49}\cdot820=20-\tfrac{1736}{49}+\tfrac{820}{49}=\tfrac{64}{49}$, khớp $x_1=(\tfrac87,0)$.
:::

![Ví dụ C: từ x = (2, 4) bước −ηg với η = 1/7, g = (6, 28) đưa tới (8/7, 0); bình phương khoảng cách tới nghiệm giảm từ 20 xuống 64/49.](img/lec-05b/one-step-geometry.svg)

### Bản đồ các dạng hội tụ

BĐ1 tại $x^*$ (với $\nabla f(x^*)=0$) cho $e\le\tfrac L2d^2$. Ghép với BĐ2, BĐ3: dưới H2, H3 và H4, với mọi $x$,

$$
\frac\mu2d^2\le e\le\frac1{2\mu}\lVert\nabla f(x)\rVert^2\le\frac L\mu\,e\le\frac{L^2}{2\mu}d^2.
$$

Ba đại lượng $d^2$, $e$, $\lVert\nabla f\rVert^2$ vì vậy chặn lẫn nhau, sai khác hằng số. Bỏ một giả thiết thì có phản ví dụ:

| Giả thiết thiếu | Phản ví dụ | Mũi tên mất |
|---|---|---|
| H4 | hàm logistic: $e_k\to0$ trong khi $s_k\to\infty$ | $e\Rightarrow d$ |
| H3 | $x_1^2$ trên $\mathbb R^2$: nghiệm không duy nhất | $e\Rightarrow d$ |
| H3 | $x^4$ tại $x=0{,}1$: $\lvert f'(x)\rvert=0{,}004$ trong khi $d=0{,}1$ | $\lVert\nabla f\rVert\Rightarrow d$ |

![Bản đồ ba dạng hội tụ: mũi tên giữa khoảng cách, sai số giá trị và chuẩn gradient, mỗi mũi tên ghi bất đẳng thức và giả thiết H2 hoặc H3.](img/lec-05b/convergence-map.svg)

Một mũi tên từ A sang B đọc là: mọi cận cho A sinh ra một cận cho B. Ba nút khác nhau về khả năng đo. Tính $d_k$ cần $x^*$; tính $e_k$ cần $f^*$ hoặc một cận đối ngẫu (Bài 03); $\lVert\nabla f(x_k)\rVert$ tính được tại mỗi bước. Vì vậy một cận cho $d_k$ hoặc $e_k$ thường chỉ kiểm được gián tiếp, qua chuẩn gradient và các mũi tên của bản đồ. Phần D thêm nút trung bình lặp (Jensen), phần E thêm nút xác suất (Markov).

Bài tập 1 kiểm BĐ2, chuỗi bất đẳng thức của bản đồ và phân loại bốn khẳng định hội tụ.

::: exercise Câu hỏi kiểm tra
Với $f(x)=x^4$ trên $\mathbb R$, chỉ ra giả thiết nào trong H2, H3 sai, và mũi tên nào của bản đồ không còn đúng gần $x^*=0$.
:::

## C. Hội tụ của hạ gradient

Phần này xét $x_{k+1}=x_k-\tfrac1L\nabla f(x_k)$ và biến thể bước $\eta\le1/L$, dưới H1, H2 và H4, rồi thêm H3. Ba khoảng trống của định lý $O(1/k)$ ở Bài 04 được lấp ở đây: cận và tính không tăng của $d_k$; dạng bước $0<\eta\le1/L$; chỗ dùng giả thiết đạt cực tiểu. Chứng minh đầy đủ của định lý $O(1/k)$ với bước $1/L$ có trong học liệu Bài 04, mục B; ở đây dùng ký hiệu $x_k$, $\eta$, $D$ thay cho $x^k$, $t$, $R$.

### Khuôn một bước

BĐ1–BĐ4 nói về một điểm hoặc một bước. Ghép chúng dọc dãy lặp dùng hai mẫu. Hình xếp các hiệu $u_0-u_1,\dots,u_3-u_4$ và phần còn lại $u_4$ thành một cột cao đúng $u_0$: tổng các hiệu không vượt giá trị đầu của một đại lượng không âm.

![Các hiệu u0 − u1, u1 − u2, u2 − u3, u3 − u4 và phần còn lại u4 xếp chồng thành một cột cao bằng u0.](img/lec-05b/telescoping-stack.svg)

**Mẫu 1 (tổng lồng).** Nếu $u_k\ge0$, $c>0$ và $p_{k+1}\le c\,(u_k-u_{k+1})$ với mọi $k$, thì

$$
\sum_{j<k}p_{j+1}\le c\,(u_0-u_k)\le c\,u_0.
$$

**Mẫu 2 (co).** Nếu $u_{k+1}\le q\,u_k$ với $0\le q<1$ và $u_k\ge0$ thì $u_k\le q^ku_0$.

Mẫu 1 cộng các bất đẳng thức một bước: vế phải triệt tiêu từng cặp và chỉ còn $u_0-u_k$. Mẫu 2 nhân các hệ số co. Trong cả hai, $u_k$ là một hàm thế (potential function) $V_k\ge0$ thỏa $V_{k+1}\le V_k-P_k+N_k$, với tiến bộ $P_k\ge0$ và nhiễu $N_k\ge0$. Các phần sau đổi $V$, $P_k$ và $N_k$.

### Định lý hội tụ dưới tuyến tính

**Định lý (T1).** Đầu vào: $f$ thỏa H1, H2, H4; điểm đầu $x_0$, $D=\lVert x_0-x^*\rVert$. Bước: $x_{k+1}=x_k-\tfrac1L\nabla f(x_k)$. Kết luận: với mọi $k\ge1$ và mọi $k'\ge0$,

$$
e_k=f(x_k)-f^*\le\frac{LD^2}{2k},\qquad d_{k'+1}\le d_{k'}.
$$

**Hệ quả (T1').** Cùng giả thiết, với bước hằng $0<\eta\le1/L$: $e_k\le\dfrac{D^2}{2\eta k}$ với mọi $k\ge1$, và $d_{k+1}\le d_k$.

T1 là trường hợp $\eta=1/L$ của T1'. Chứng minh dưới đây viết cho T1'.

::: proof Chứng minh T1 và T1'
*Ý tưởng.* Dùng BĐ4 đưa $e_{k+1}$ về hiệu $d_k^2-d_{k+1}^2$, rồi áp mẫu 1.

Bước 1: vì $\eta\le1/L$, bổ đề giảm (dùng H2) cho $f(x_{k+1})\le f(x_k)-\tfrac\eta2\lVert\nabla f(x_k)\rVert^2$; riêng dãy giá trị $f(x_k)$ không tăng.

Bước 2 (H1, H4, hệ quả của H1): $f(x_k)\le f^*+\nabla f(x_k)^T(x_k-x^*)$.

Bước 3 (BĐ4 với $g=\nabla f(x_k)$): $d_{k+1}^2=d_k^2-2\eta\nabla f(x_k)^T(x_k-x^*)+\eta^2\lVert\nabla f(x_k)\rVert^2$, tương đương

$$
\nabla f(x_k)^T(x_k-x^*)-\frac\eta2\lVert\nabla f(x_k)\rVert^2=\frac1{2\eta}\bigl(d_k^2-d_{k+1}^2\bigr).
$$

Bước 4 (ghép): cộng bước 1 và bước 2 rồi dùng bước 3,

$$
e_{k+1}\le\nabla f(x_k)^T(x_k-x^*)-\frac\eta2\lVert\nabla f(x_k)\rVert^2=\frac1{2\eta}\bigl(d_k^2-d_{k+1}^2\bigr).
$$

Vì $e_{k+1}\ge0$, suy ra $d_{k+1}\le d_k$.

Bước 5 (mẫu 1 với $p_{k+1}=e_{k+1}$, $u_k=d_k^2$, $c=\tfrac1{2\eta}$, và tính không tăng của $e_j$ ở bước 1):

$$
k\,e_k\le\sum_{j=1}^ke_j\le\frac1{2\eta}\bigl(d_0^2-d_k^2\bigr)\le\frac{D^2}{2\eta}.
$$

Phép ghép ở bước 4 cần bổ đề giảm và BĐ4 dùng cùng một bước $\eta$: số hạng $\tfrac\eta2\lVert\nabla f(x_k)\rVert^2$ xuất hiện với dấu ngược nhau ở bước 1 và ở vế trái của bước 3. Nếu bỏ H4 thì $x^*$, $f^*$ không tồn tại và bước 2, bước 3 không viết được; hàm logistic ở phần B là trường hợp đó.
:::

T1 dùng ba giả thiết H1, H2, H4 và không dùng độ cong dưới. Đảo cận cho số bước: $k\ge LD^2/(2\varepsilon)$ đủ để $e_k\le\varepsilon$; với Ví dụ C và $\varepsilon=0{,}01$ là $7000$ bước. Với bước $\eta<1/L$, hằng số $\tfrac{D^2}{2\eta}$ lớn hơn $\tfrac{LD^2}2$ đúng $\tfrac1{L\eta}$ lần (Bài tập 3).

### Định lý hội tụ tuyến tính

Cận của T1 phải đúng cho $f(x)=x_1^2$ trên $\mathbb R^2$, hàm lồi, $L$-trơn nhưng không lồi mạnh, nên nó không thể chứa $\mu$. Với $\mu>0$ cần một bất đẳng thức một bước khác: thay cận tuyến tính của H1 bằng cận bậc hai của H3.

**Định lý (T2a, T2b).** Đầu vào: $f$ thỏa H2, H3, H4 với $0<\mu\le L$; điểm đầu $x_0$. Bước: $x_{k+1}=x_k-\tfrac1L\nabla f(x_k)$. Kết luận: với mọi $k\ge0$ và $\kappa=L/\mu$,

$$
\text{(T2a)}\quad d_k^2\le\Bigl(1-\frac1\kappa\Bigr)^kD^2,\qquad
\text{(T2b)}\quad e_k\le\Bigl(1-\frac1\kappa\Bigr)^ke_0.
$$

::: proof Chứng minh T2a
Mẫu 2 với $u_k=d_k^2$.

Bước 1 (BĐ4, $\eta=\tfrac1L$): $d_{k+1}^2=d_k^2-\tfrac2L\nabla f(x_k)^T(x_k-x^*)+\tfrac1{L^2}\lVert\nabla f(x_k)\rVert^2$.

Bước 2 (H3 tại $x_k$, với $y=x^*$): $f^*\ge f(x_k)+\nabla f(x_k)^T(x^*-x_k)+\tfrac\mu2d_k^2$, tức $\nabla f(x_k)^T(x_k-x^*)\ge e_k+\tfrac\mu2d_k^2$.

Bước 3 (BĐ2, với $f_{\inf}=f^*$): $\lVert\nabla f(x_k)\rVert^2\le2L\,e_k$.

Bước 4 (ghép):

$$
d_{k+1}^2\le d_k^2-\frac2L\Bigl(e_k+\frac\mu2d_k^2\Bigr)+\frac{2L e_k}{L^2}=\Bigl(1-\frac\mu L\Bigr)d_k^2.
$$

Các số hạng chứa $e_k$ triệt tiêu. Mẫu 2 cho kết luận.
:::

::: proof Chứng minh T2b
Mẫu 2 với $u_k=e_k$. Bổ đề giảm với $\eta=1/L$ và vế thứ hai của BĐ3, $\lVert\nabla f(x_k)\rVert^2\ge2\mu e_k$, cho

$$
e_{k+1}\le e_k-\frac1{2L}\lVert\nabla f(x_k)\rVert^2\le\Bigl(1-\frac\mu L\Bigr)e_k.
$$
:::

Ngoài bổ đề giảm, chứng minh T2b chỉ dùng vế thứ hai của BĐ3, tức $\tfrac12\lVert\nabla f\rVert^2\ge\mu e$; phần F lấy chính bất đẳng thức này làm giả thiết cho hàm không lồi. Theo bảng ở phần A, $k\ge\kappa\ln(e_0/\varepsilon)$ bước đủ để $e_k\le\varepsilon$. T2a kèm mũi tên $e\le\tfrac L2d^2$ cũng cho một cận tuyến tính cho $e_k$, với hằng số $\tfrac L2D^2$ thay cho $e_0$; ở Ví dụ C hằng số này là $70$, lớn hơn $e_0=62$.

### Ba cận trên Ví dụ C

::: example Ví dụ C: cận và giá trị thật
Với $L=7$, $\mu=3$, $D^2=20$, $e_0=62$: cận T1 là $70/k$, cận T2b là $62(\tfrac47)^k$, cận T2a là $20(\tfrac47)^k$.

| $k$ | $70/k$ | $62(4/7)^k$ | $e_k$ thật | $20(4/7)^k$ | $d_k^2$ thật |
|---:|---:|---:|---:|---:|---:|
| 1 | 70 | 35,4 | 1,96 | 11,4 | 1,31 |
| 5 | 14 | 3,78 | 0,0223 | 1,22 | 0,0149 |
| 10 | 7 | 0,230 | $8{,}3\cdot10^{-5}$ | 0,0742 | $5{,}5\cdot10^{-5}$ |

Số bước để $e_k\le0{,}01$: theo T1, $70/k\le0{,}01$ khi $k\ge7000$; theo T2b, $62(\tfrac47)^k\le0{,}01$ khi $k\ge\ln6200/\ln\tfrac74\approx15{,}6$, tức $16$ bước; thực tế $6(\tfrac{16}{49})^k\le0{,}01$ khi $k\ge\ln600/\ln\tfrac{49}{16}\approx5{,}7$, tức $6$ bước ($e_5\approx0{,}0223$, $e_6\approx0{,}0073$).
:::

![Trên thang logarit, cận 70/k giảm chậm, hai cận tuyến tính là đường thẳng, còn sai số giá trị và bình phương khoảng cách thật của Ví dụ C giảm nhanh hơn nhiều.](img/lec-05b/vdc-three-bounds.svg)

Cận $O(1/k)$ bỏ qua $\mu=3$. Cận tuyến tính đúng dạng nhưng hệ số co $\tfrac47$ chậm hơn hệ số thật $\tfrac{16}{49}=(\tfrac47)^2$. Sau bước đầu, Ví dụ C chỉ còn hướng có độ cong $3$; theo hướng này $e=\tfrac\mu2d^2$, $\nabla f(x)^T(x-x^*)=\mu d^2$ và $\lVert\nabla f\rVert^2=\mu^2d^2=2\mu e$, không bằng $2Le$. Giữ các đẳng thức này trong bước 4 của T2a cho $d_{k+1}^2=\bigl(1-\tfrac{2\mu}L+\tfrac{\mu^2}{L^2}\bigr)d_k^2=(1-\mu/L)^2d_k^2$, tức hệ số $\tfrac{16}{49}$. Với bước $2/(L+\mu)$, khoảng cách co theo hệ số $(L-\mu)/(L+\mu)$ (Bài tập 10).

### Hội tụ tuyến tính với bước quay lui

Bước $1/L$ của T1, T2 đòi biết $L$, mà với một mất mát cụ thể thường chỉ có cận thô; ở Bài tập 8, cận thô $1{,}1$ gấp khoảng hai lần giá trị theo trị riêng $0{,}542$. Quay lui Armijo tìm bước tại mỗi lần lặp: thử $t=1,\beta,\beta^2,\dots$ và nhận $t$ đầu tiên thỏa $f(x-t\nabla f(x))\le f(x)-\alpha t\lVert\nabla f(x)\rVert^2$.

**Định lý (T2', chỉ phát biểu).** Đầu vào: $f$ thỏa H2, H3 trên tập mức $\{x:f(x)\le f(x_0)\}$; quay lui Armijo với $0<\alpha<\tfrac12$, $0<\beta<1$. Kết luận: $e_k\le c^ke_0$ với

$$
c=1-\min\Bigl\{2\mu\alpha,\ \frac{2\beta\alpha\mu}L\Bigr\}<1.
$$

Chứng minh có trong Boyd và Vandenberghe (2004), §9.3.1, tr. 466–468. Hệ số $c$ kém hơn $1-\mu/L$ nhưng thuật toán không cần biết $L$. Với Ví dụ C, $\alpha=\tfrac14$, $\beta=\tfrac12$: $c=1-\min\{1{,}5;\tfrac3{28}\}=\tfrac{25}{28}\approx0{,}893$, và cận cần $78$ bước để bảo đảm $e_k\le0{,}01$ (Bài tập 2).

T1, T2 và T2' đều cần gradient Lipschitz. Hàm trị tuyệt đối và mất mát bản lề (hinge loss) không có hằng số $L$ hữu hạn; phần D thay gradient bằng dưới gradient.

## D. Dưới gradient và trung bình lặp

### Mục tiêu không khả vi

Ví dụ B giữ nguyên dữ liệu của Ví dụ A và chỉ đổi mất mát. Trên mỗi khoảng giữa hai quan sát, $f$ tuyến tính với độ dốc $-1,-\tfrac13,\tfrac13,1$ lần lượt trên $(-\infty,-1)$, $(-1,1)$, $(1,3)$, $(3,\infty)$; tại $-1,1,3$ đạo hàm trái và phải khác nhau. Mất mát bình phương cho nghiệm là trung bình $1$, mất mát trị tuyệt đối cho trung vị, cũng bằng $1$, với $f^*=\tfrac13(2+0+2)=\tfrac43$. Hồi quy độ lệch tuyệt đối nhỏ nhất (least absolute deviations) và mất mát bản lề có cùng cấu trúc.

![Hàm trị tuyệt đối trung bình gãy khúc tại −1, 1, 3 và hàm bình phương trung bình trơn, cả hai đạt cực tiểu 4/3 tại 1.](img/lec-05b/vdb-objective.svg)

Ở Ví dụ B, hằng số $L$ của H2 không tồn tại: quanh $x=1$, đạo hàm nhảy từ $-\tfrac13$ lên $\tfrac13$, nên tỉ số $\lvert f'(x)-f'(y)\rvert/\lvert x-y\rvert$ với $x<1<y$ không bị chặn khi $x,y\to1$. Bổ đề giảm, và cùng với nó T1, T2, T2', vì vậy không áp dụng. Phần này thay gradient bằng dưới gradient và thay bổ đề giảm bằng bất đẳng thức một bước cho $d_k$.

### Dưới gradient

Tại điểm gãy $x=1$ của Ví dụ B, $f(x)\ge\tfrac43+s(x-1)$ với mọi $x$ khi và chỉ khi $s\in[-\tfrac13,\tfrac13]$: cả một chùm đường thẳng tựa nằm dưới đồ thị, độ dốc của chúng thay vai trò gradient. Đường độ dốc $0{,}6$ qua $(1,\tfrac43)$ cắt đồ thị nên không thuộc chùm này.

![Tại điểm gãy x = 1 của Ví dụ B, các đường thẳng độ dốc −1/3, 0, 1/3 nằm dưới đồ thị; đường độ dốc 0,6 cắt đồ thị.](img/lec-05b/subgradient-supporting-lines.svg)

**Định nghĩa.** Cho $f:\mathbb R^n\to\mathbb R$ lồi. Vectơ $g\in\mathbb R^n$ là một dưới gradient của $f$ tại $x$ nếu $f(y)\ge f(x)+g^T(y-x)$ với mọi $y\in\mathbb R^n$. Tập các dưới gradient tại $x$ là dưới vi phân (subdifferential) $\partial f(x)$.

Ba tính chất được dùng (chỉ nêu, trừ tính chất cuối): hàm lồi hữu hạn trên $\mathbb R^n$ có $\partial f(x)\neq\emptyset$ với mọi $x$; khi $f$ khả vi tại $x$, $\partial f(x)=\{\nabla f(x)\}$; $0\in\partial f(x^*)$ khi và chỉ khi $x^*$ là điểm cực tiểu, vì với $g=0$ định nghĩa trở thành $f(y)\ge f(x^*)$ với mọi $y$.

**H1 dạng dưới gradient.** $f$ lồi trên $\mathbb R^n$. Cùng H4, mọi $g\in\partial f(x)$ thỏa $g^T(x-x^*)\ge f(x)-f^*$; đây là định nghĩa dưới gradient với $y=x^*$.

::: example Ví dụ B: dưới vi phân tại điểm gãy
Ba số hạng $\lvert x+1\rvert$, $\lvert x-1\rvert$, $\lvert x-3\rvert$ có dưới vi phân tại $x=1$ lần lượt là $\{1\}$, $[-1,1]$, $\{-1\}$. Dưới vi phân của tổng các hàm lồi hữu hạn là tổng các dưới vi phân (chỉ nêu), nên $\partial f(1)=\tfrac13\bigl(1+[-1,1]-1\bigr)=[-\tfrac13,\tfrac13]$, khớp với chùm đường tựa ở trên: hai khúc của $f$ kề $x=1$ có độ dốc $\pm\tfrac13$.
:::

### Phương pháp dưới gradient

**Thuật toán.** Đầu vào: $x_0$, bước $\eta_k>0$, số bước $K\ge1$. Với $k=0,\dots,K-1$: chọn $g_k\in\partial f(x_k)$, đặt $x_{k+1}=x_k-\eta_kg_k$. Đầu ra: lặp tốt nhất $x_{k^\star}$ với $k^\star\in\arg\min_{k<K}f(x_k)$, hoặc trung bình lặp

$$
\bar x_K=\frac{\sum_{k<K}\eta_kx_k}{\sum_{k<K}\eta_k}.
$$

Với bước hằng, $\bar x_K$ là trung bình đều của $x_0,\dots,x_{K-1}$.

::: example Ví dụ B, bước 4,5
Từ $x_0=0$: tại $0$, $g=\tfrac13(1-1-1)=-\tfrac13$, nên $x_1=0+\tfrac{4{,}5}3=1{,}5$; tại $1{,}5$, $g=\tfrac13(1+1-1)=\tfrac13$, nên $x_2=0$; tiếp tục $x_3=1{,}5$. Sai số $e_k=\tfrac13,\tfrac16,\tfrac13,\tfrac16$: ở bước thứ hai $f$ tăng từ $1{,}5$ lên $\tfrac53$. Trung bình $\bar x_4=0{,}75$ có $f(0{,}75)=\tfrac13(1{,}75+0{,}25+2{,}25)=\tfrac{17}{12}$, sai số $\tfrac1{12}$, nhỏ hơn sai số của mọi điểm lặp.
:::

![Với bước 4,5, dãy dưới gradient của Ví dụ B dao động giữa 0 và 1,5 qua điểm gãy; trung bình lặp 0,75 nằm gần nghiệm 1 hơn mọi điểm lặp.](img/lec-05b/vdb-subgradient-iterates.svg)

Lượt bước $4{,}5$ cho thấy $f(x_k)$ không đơn điệu. Với $g\in\partial f(x)$, hướng $-g$ không nhất thiết là hướng giảm: tại nghiệm $x=1$, chọn $g=\tfrac13\in\partial f(1)$ cho $x-\eta g<1$ và $f(x-\eta g)>f^*$ với mọi $\eta>0$. Bảo đảm vì vậy đặt cho lặp tốt nhất và trung bình lặp, còn đại lượng giảm theo từng bước khi bước đủ nhỏ là $d_k$, như bước 1 của chứng minh T3.

### Định lý hội tụ của phương pháp dưới gradient

**Định lý (T3).** Đầu vào: $f$ lồi (H1 dạng dưới gradient), đạt cực tiểu tại $x^*$ (H4); các dưới gradient dùng tại điểm lặp thỏa

- **H5.** $\lVert g_k\rVert\le G$ với mọi $k$;

điểm đầu $x_0$, bước $\eta_k>0$, số bước $K\ge1$. Kết luận:

$$
\min_{k<K}e_k\ \le\ \frac{D^2+G^2\sum_{k<K}\eta_k^2}{2\sum_{k<K}\eta_k},\qquad
f(\bar x_K)-f^*\ \le\ \frac{D^2+G^2\sum_{k<K}\eta_k^2}{2\sum_{k<K}\eta_k}.
$$

Cả hai cận dùng các điểm $x_0,\dots,x_{K-1}$; điểm cuối $x_K$ không được chặn, và ở lượt bước $4{,}5$ điểm lặp cuối là một trong hai điểm xấu nhất. Ở Ví dụ B, $\lvert g\rvert\le\tfrac13(1+1+1)=1$ với mọi dưới gradient, nên H5 đúng với $G=1$.

**Bổ đề BĐ5 (bất đẳng thức Jensen hữu hạn).** Cho $f$ lồi, $K\ge1$, $\lambda_k\ge0$ với $\sum_{k<K}\lambda_k=1$, và $x_0,\dots,x_{K-1}\in\mathbb R^n$. Khi đó $f\bigl(\sum_{k<K}\lambda_kx_k\bigr)\le\sum_{k<K}\lambda_kf(x_k)$.

::: proof Chứng minh BĐ5 bằng quy nạp
Với $K=1$, hai vế bằng nhau. Giả sử khẳng định đúng cho $K$ điểm; xét $K+1$ điểm $x_0,\dots,x_K$ với trọng số $\lambda_0,\dots,\lambda_K$. Nếu $\lambda_K=1$ thì mọi trọng số khác bằng $0$ và kết luận hiển nhiên; nếu $\lambda_K=0$ thì áp giả thiết quy nạp. Còn lại $0<\lambda_K<1$; đặt $z=\sum_{k<K}\tfrac{\lambda_k}{1-\lambda_K}x_k$, các trọng số $\tfrac{\lambda_k}{1-\lambda_K}$ không âm và có tổng $1$. Định nghĩa lồi cho hai điểm rồi giả thiết quy nạp cho

$$
f\Bigl(\sum_{k\le K}\lambda_kx_k\Bigr)=f\bigl((1-\lambda_K)z+\lambda_Kx_K\bigr)
\le(1-\lambda_K)f(z)+\lambda_Kf(x_K)
\le\sum_{k<K}\lambda_kf(x_k)+\lambda_Kf(x_K).
$$
:::

::: proof Chứng minh T3
Bước 1 (BĐ4, H1 dạng dưới gradient, H5):

$$
d_{k+1}^2=d_k^2-2\eta_kg_k^T(x_k-x^*)+\eta_k^2\lVert g_k\rVert^2\le d_k^2-2\eta_ke_k+\eta_k^2G^2.
$$

Bước 2 (tổng lồng có trọng số): cộng với $k=0,\dots,K-1$ và dùng $d_K^2\ge0$, $d_0=D$:

$$
2\sum_{k<K}\eta_ke_k\le D^2+G^2\sum_{k<K}\eta_k^2.
$$

Bước 3 (lặp tốt nhất): $\sum_{k<K}\eta_ke_k\ge\bigl(\sum_{k<K}\eta_k\bigr)\min_{k<K}e_k$.

Bước 4 (trung bình lặp): BĐ5 với $\lambda_k=\eta_k/\sum_{j<K}\eta_j$ cho $f(\bar x_K)-f^*\le\sum_k\lambda_k\bigl(f(x_k)-f^*\bigr)=\dfrac{\sum_{k<K}\eta_ke_k}{\sum_{k<K}\eta_k}$.

Chia bất đẳng thức ở bước 2 cho $2\sum_k\eta_k$ được cả hai kết luận. So với chứng minh T1: không có bổ đề giảm, nên số hạng $\eta_k^2G^2$ không bị triệt tiêu. Tính lồi được dùng hai lần: ở bước 1 (chặn tích vô hướng) và ở bước 4 (Jensen).
:::

Trên bản đồ dạng hội tụ, BĐ5 là mũi tên từ trung bình các sai số sang sai số tại trung bình lặp; ở lượt bước $4{,}5$ của Ví dụ B, hai đầu của mũi tên này là $\tfrac14$ và $\tfrac1{12}$.

::: example Kiểm Jensen trên Ví dụ B
Bước $4{,}5$: sai số tại trung bình là $\tfrac1{12}$, trung bình các sai số là $\tfrac14(\tfrac13+\tfrac16+\tfrac13+\tfrac16)=\tfrac14$, đúng chiều của BĐ5. Bước $\tfrac12$ từ $x_0=0$: $x_k=0,\tfrac16,\tfrac13,\tfrac12$ đều nằm trên khúc tuyến tính $[-1,1]$, sai số $\tfrac13,\tfrac5{18},\tfrac29,\tfrac16$ có trung bình $\tfrac14$, và $\bar x_4=\tfrac14$ có sai số $\tfrac14$: Jensen xảy ra dấu bằng.
:::

### Chọn bước cho phương pháp dưới gradient

Với bước hằng $\eta$ trong $K$ bước, cận của T3 bằng

$$
\frac{D^2+KG^2\eta^2}{2K\eta}=\frac{D^2}{2K\eta}+\frac{G^2\eta}2\ \ge\ 2\sqrt{\frac{D^2}{2K\eta}\cdot\frac{G^2\eta}2}=\frac{DG}{\sqrt K},
$$

theo bất đẳng thức giữa trung bình cộng và trung bình nhân; dấu bằng xảy ra khi hai số hạng bằng nhau, tức $\eta=D/(G\sqrt K)$. Đảo lại, $K\ge D^2G^2/\varepsilon^2$ bước đủ để cận không vượt $\varepsilon$; với Ví dụ B ($D=G=1$) và $\varepsilon=0{,}01$ là $10^4$ bước. Công thức bước tối ưu dùng cả $D$, $G$ và $K$, nên cần biết chúng trước khi chạy.

Hai số hạng của tử số kéo bước theo hai chiều ngược nhau: $D^2$ giảm tương đối khi tổng bước tăng, còn $G^2\sum\eta_k^2$ lớn khi bước lớn. Với dãy bước thỏa điều kiện Robbins–Monro, $\sum_k\eta_k=\infty$ và $\sum_k\eta_k^2<\infty$ (ví dụ $\eta_k=\tfrac c{k+1}$), tử số bị chặn còn mẫu số tiến ra vô cùng, nên cận tiến về $0$. Riêng cho T3, $\eta_k\to0$ và $\sum\eta_k=\infty$ đã đủ: khi đó $\sum_{k<K}\eta_k^2/\sum_{k<K}\eta_k\to0$. Tên gọi đến từ phương pháp xấp xỉ ngẫu nhiên của Robbins và Monro (1951).

::: example Ví dụ B, bước tối ưu
Với $x_0=0$: $D=1$, $G=1$, $K=4$, bước tối ưu $\eta=\tfrac12$, cận $\tfrac1{2\cdot4\cdot\frac12}+\tfrac14=0{,}5$.

| Đầu ra | Điểm | Sai số $e$ |
|---|---|---:|
| Cận T3 | | $0{,}5$ |
| Lặp tốt nhất | $x_3=\tfrac12$ | $\tfrac16$ |
| Trung bình lặp | $\bar x_4=\tfrac14$ | $\tfrac14$ |
:::

Ở lượt bước $4{,}5$, trung bình lặp tốt hơn lặp tốt nhất; ở lượt bước $\tfrac12$ thì ngược lại. Không đầu ra nào luôn tốt hơn; T3 chặn cả hai. Phép cân bằng hai số hạng để chọn bước được dùng lại nguyên dạng cho T4.

Bài tập 4 chạy phương pháp dưới gradient từ $x_0=2{,}5$ và so hai lịch bước $c/(k+1)$, $c/\sqrt{k+1}$.

::: exercise Câu hỏi kiểm tra
Tính $\partial f(-1)$ và $\partial f(3)$ của Ví dụ B. Với $x_0=3$ và bước $\eta=6$, chỉ ra một dưới gradient $g_0\in\partial f(3)$ làm $d_1>d_0$.
:::

## E. Hạ gradient ngẫu nhiên cho hàm lồi và lồi mạnh

### Gradient ngẫu nhiên và kỳ vọng có điều kiện

Mục tiêu học máy có dạng $f=\tfrac1N\sum_{i=1}^N\ell_i$, với $\ell_i$ là mất mát trên quan sát $i$. Một gradient hoặc dưới gradient đầy đủ cần $N$ phép tính mỗi bước. Bài 05 dùng gradient nhóm $b$ mẫu:

$$
g_k=\frac1b\sum_{r=1}^b\nabla\ell_{I_{k,r}}(x_k),\qquad x_{k+1}=x_k-\eta_kg_k,
$$

với $I_{k,r}$ là chỉ số thứ $r$ của nhóm ở bước $k$, lấy đều có hoàn lại và độc lập. Một bước có thể làm tăng $f$. Chứng minh T3 chỉ dùng $g_k$ qua $g_k^T(x_k-x^*)$ và $\lVert g_k\rVert^2$; nếu kiểm soát được kỳ vọng của hai đại lượng này thì khuôn một bước vẫn áp dụng.

Cây lịch sử của Ví dụ A cho một hình ảnh cụ thể. Mỗi nút của cây là một lịch sử các nhóm đã chọn; các nhánh con là các khả năng của nhóm mới. Với bước $0{,}1$, nhóm một mẫu, $\theta_0=0$ và $g_k=\theta_k-y_{I_k}$: bước đầu cho $\theta_1=0{,}1\,y_{I_0}\in\{-0{,}1;\ 0{,}1;\ 0{,}3\}$, mỗi giá trị xác suất $\tfrac13$, và $\mathbb E(\theta_1-1)^2=\tfrac13(1{,}21+0{,}81+0{,}49)\approx0{,}837$. Tại nút $\theta_1=0{,}1$, ba nhánh con cho $g_1\in\{1{,}1;\ -0{,}9;\ -2{,}9\}$, trung bình $-0{,}9=J'(0{,}1)$: trung bình trên các nhánh con của một nút là gradient đầy đủ tại nút đó.

![Cây lịch sử hai bước của Ví dụ A: gốc θ0 = 0 tách ba nhánh theo quan sát −1, 1, 3 thành θ1 = −0,1; 0,1; 0,3; mỗi nút lại tách ba nhánh thành chín giá trị θ2.](img/lec-05b/history-tree.svg)

**Định nghĩa.** $\mathcal F_k$ là thông tin gồm các chỉ số nhóm $I_0,\dots,I_{k-1}$ (với $I_j$ là cả nhóm ở bước $j$). Khi biết $\mathcal F_k$ thì biết $x_k$; nhóm $I_k$ độc lập với $\mathcal F_k$. Kỳ vọng có điều kiện (conditional expectation) $\mathbb E[Z\mid\mathcal F_k]$ của một biến ngẫu nhiên $Z$ là trung bình của $Z$ trên các nhánh con của nút lịch sử hiện tại, với xác suất của từng nhánh.

**Tính chất tháp (tower property).** $\mathbb E\bigl[\mathbb E[Z\mid\mathcal F_k]\bigr]=\mathbb EZ$.

**Rút đại lượng đã biết ra ngoài.** Nếu $W$ xác định bởi $\mathcal F_k$ thì $\mathbb E[WZ\mid\mathcal F_k]=W\,\mathbb E[Z\mid\mathcal F_k]$.

Trên cây, hai vế của tính chất tháp là hai thứ tự cộng trên cùng các lá: vế trái tính trung bình trong từng nhóm lá cùng cha rồi lấy trung bình các kết quả, vế phải lấy trung bình trực tiếp trên mọi lá. Phép rút đại lượng đã biết ra ngoài cho phép $x_k$ đứng ngoài kỳ vọng có điều kiện trong mọi chứng minh dưới đây, chẳng hạn $\mathbb E[g_k^T(x_k-x^*)\mid\mathcal F_k]=\mathbb E[g_k\mid\mathcal F_k]^T(x_k-x^*)$. Trong ngôn ngữ xác suất, $\mathcal F_k=\sigma(I_0,\dots,I_{k-1})$ và họ $(\mathcal F_k)$ là bộ lọc thông tin (filtration).

::: example Ví dụ A: kiểm tính chất tháp trên chín lá
Chín lá $\theta_2$ và kỳ vọng có điều kiện tại ba nút mức một:

| $\theta_1$ | ba giá trị $\theta_2$ | $\mathbb E[(\theta_2-1)^2\mid\theta_1]$ |
|---:|---|---:|
| $-0{,}1$ | $-0{,}19$; $0{,}01$; $0{,}21$ | $1{,}007$ |
| $0{,}1$ | $-0{,}01$; $0{,}19$; $0{,}39$ | $0{,}683$ |
| $0{,}3$ | $0{,}17$; $0{,}37$; $0{,}57$ | $0{,}424$ |

Trung bình của cột cuối là $0{,}704$, bằng trung bình của chín giá trị $(\theta_2-1)^2$, và bằng $a_2$ tính bằng đệ quy ở phần A.
:::

Giả thiết $I_k$ độc lập với $\mathcal F_k$ đúng khi mỗi nhóm được lấy đều, có hoàn lại, từ toàn bộ dữ liệu. Khi xáo trộn dữ liệu một lần rồi duyệt tuần tự trong một lượt, mẫu cuối của lượt bị xác định bởi các mẫu đã dùng, nên $\mathbb E[g_k\mid\mathcal F_k]$ nói chung khác $\nabla f(x_k)$; các định lý của phần này không áp dụng nguyên dạng cho cách duyệt đó.

### Giả thiết về gradient ngẫu nhiên

- **H6 (không chệch).** $\mathbb E[g_k\mid\mathcal F_k]=\nabla f(x_k)$, hoặc $\mathbb E[g_k\mid\mathcal F_k]\in\partial f(x_k)$ khi $f$ không khả vi.
- **H6a (chặn mômen bậc hai).** $\mathbb E\bigl[\lVert g_k\rVert^2\mid\mathcal F_k\bigr]\le G^2$.
- **H6b (chặn phương sai).** $\mathbb E\bigl[\lVert g_k-\nabla f(x_k)\rVert^2\mid\mathcal F_k\bigr]\le\sigma^2$.

**Bổ đề (tách phương sai).** Dưới H6 (dạng khả vi),

$$
\mathbb E\bigl[\lVert g_k\rVert^2\mid\mathcal F_k\bigr]=\lVert\nabla f(x_k)\rVert^2+\mathbb E\bigl[\lVert g_k-\nabla f(x_k)\rVert^2\mid\mathcal F_k\bigr].
$$

::: proof Chứng minh bổ đề tách phương sai
Viết $g_k=(g_k-\nabla f(x_k))+\nabla f(x_k)$ và khai triển:

$$
\lVert g_k\rVert^2=\lVert g_k-\nabla f(x_k)\rVert^2+2\nabla f(x_k)^T\bigl(g_k-\nabla f(x_k)\bigr)+\lVert\nabla f(x_k)\rVert^2.
$$

Lấy $\mathbb E[\cdot\mid\mathcal F_k]$. Vectơ $\nabla f(x_k)$ xác định bởi $\mathcal F_k$ nên ra ngoài, và $\mathbb E[g_k-\nabla f(x_k)\mid\mathcal F_k]=0$ theo H6; số hạng chéo bằng $0$.
:::

Gradient nhóm của Bài 05 thỏa H6. Bài 05 đã chứng minh hiệp phương sai của gradient nhóm bằng $\Sigma(x)/b$, với $\Sigma(x)$ là hiệp phương sai gradient một mẫu; vì $\mathbb E\lVert g_k-\nabla f\rVert^2$ là vết của hiệp phương sai, H6b đúng khi $\operatorname{tr}\Sigma(x)\le b\sigma^2$ với mọi $x$.

::: example Ví dụ A: hai hằng số của gradient ngẫu nhiên
Gradient một mẫu tại $\theta$ là $\theta-y_I$, có kỳ vọng $\theta-1=J'(\theta)$ và phương sai bằng phương sai của $y_I$, tức $\tfrac83$. Với nhóm $b$ mẫu, phương sai là $\tfrac8{3b}$, nên H6b đúng toàn cục với $\sigma^2=\tfrac8{3b}$. Theo bổ đề tách phương sai, $\mathbb E[g^2\mid\theta]=(\theta-1)^2+\tfrac8{3b}$, không bị chặn trên $\mathbb R$; H6a chỉ đúng trên một đoạn chứa dãy lặp.
:::

Dưới H3, $\lVert\nabla f\rVert$ không bị chặn trên $\mathbb R^n$ (nhận xét sau BĐ3 cho $\lVert\nabla f(x)\rVert\ge\mu d$), nên H6a chỉ hợp lý trên một vùng chứa dãy lặp. H6b tránh vấn đề này nhưng không phải lúc nào cũng đúng toàn cục: với bình phương tối thiểu tổng quát, mất mát $\tfrac12(u_i^Tx-y_i)^2$ với vectơ đặc trưng $u_i$, phương sai của gradient một mẫu tăng như $\lVert x\rVert^2$ khi các $u_i$ khác nhau. Ví dụ A là trường hợp mọi $u_i=1$.

### Định lý hội tụ của SGD cho hàm lồi

**Định lý (T4).** Đầu vào: $f$ thỏa H1 (dạng dưới gradient), H4; $g_k$ thỏa H6, H6a; bước $\eta_k>0$ cho trước, không phụ thuộc mẫu; số bước $K\ge1$. Kết luận:

$$
\mathbb Ef(\bar x_K)-f^*\le\frac{D^2+G^2\sum_{k<K}\eta_k^2}{2\sum_{k<K}\eta_k}.
$$

Bước hằng $\eta=D/(G\sqrt K)$ cho $\mathbb Ef(\bar x_K)-f^*\le DG/\sqrt K$.

::: proof Chứng minh T4
*Ý tưởng.* Lấy kỳ vọng có điều kiện từng dòng của chứng minh T3; khi biết $\mathcal F_k$, $x_k$ là hằng số.

Bước 1: BĐ4 với $g=g_k$, $\eta=\eta_k$ đúng cho từng hiện thực của nhóm $I_k$; ba số hạng của vế phải giống chứng minh T3, chỉ khác ở chỗ $g_k$ là ngẫu nhiên.

Bước 2: lấy $\mathbb E[\cdot\mid\mathcal F_k]$. Vì $x_k$ và $\eta_k$ xác định bởi $\mathcal F_k$, tính chất rút đại lượng đã biết ra ngoài cho $\mathbb E[g_k^T(x_k-x^*)\mid\mathcal F_k]=\mathbb E[g_k\mid\mathcal F_k]^T(x_k-x^*)$. Theo H6, $\mathbb E[g_k\mid\mathcal F_k]\in\partial f(x_k)$, nên H1 dạng dưới gradient chặn tích này từ dưới bởi $e_k$. H6a chặn số hạng cuối:

$$
\mathbb E[d_{k+1}^2\mid\mathcal F_k]\le d_k^2-2\eta_ke_k+\eta_k^2G^2.
$$

Bước 3: lấy kỳ vọng toàn phần và đặt $a_k=\mathbb Ed_k^2$; tính chất tháp cho $a_{k+1}\le a_k-2\eta_k\,\mathbb Ee_k+\eta_k^2G^2$.

Bước 4: cộng với $k<K$ như bước 2 của T3: $2\sum_{k<K}\eta_k\mathbb Ee_k\le D^2+G^2\sum_{k<K}\eta_k^2$. Với mỗi hiện thực của dãy, BĐ5 cho $f(\bar x_K)-f^*\le\sum_k\lambda_ke_k$ với $\lambda_k=\eta_k/\sum_j\eta_j$; lấy kỳ vọng hai vế, vì $\lambda_k$ không ngẫu nhiên, được kết luận.
:::

So với T3, giả thiết H5 (chặn tất định $\lVert g_k\rVert\le G$) được nới thành H6a (chặn mômen bậc hai theo kỳ vọng), và cùng một vế phải giờ chặn $\mathbb Ef(\bar x_K)-f^*$. Ở Ví dụ B với gradient mẫu $\operatorname{sign}(x-y_I)$ (Bài tập 5), $K=100$ và bước $0{,}1$ cho cận $0{,}1$. Đầu ra lặp tốt nhất bị bỏ: tìm $\arg\min_kf(x_k)$ cần tính $f$ trên toàn tập dữ liệu ở mỗi bước, đúng chi phí mà SGD tránh.

Giới hạn của T4: chỉ chặn trung bình lặp; tốc độ $1/\sqrt K$; không giải thích vì sao $\mathbb Ed_k^2$ của SGD bước hằng giảm về một giá trị giới hạn dương như ở Ví dụ A. Định lý tiếp theo thêm H2, H3 để chặn điểm cuối.

### Định lý hội tụ của SGD cho hàm lồi mạnh

**Định lý (T5).** Đầu vào: $f$ thỏa H2, H3, H4; $g_k$ thỏa H6, H6b; bước hằng $0<\eta\le1/L$. Kết luận: với mọi $k\ge0$,

$$
a_k=\mathbb E\lVert x_k-x^*\rVert^2\le(1-\eta\mu)^kD^2+\frac{\eta\sigma^2}\mu.
$$

Số hạng thứ nhất co tuyến tính; số hạng thứ hai là sàn nhiễu (noise floor), tỉ lệ với $\eta$. Khi $\sigma=0$ và $\eta=1/L$, định lý cho lại T2a. Định lý chặn điểm cuối $x_k$ và dùng H6b, nên không vướng việc $\nabla f$ không bị chặn dưới H3.

::: proof Chứng minh T5
*Ý tưởng.* Trong khuôn của T4, thay H6a bằng bổ đề tách phương sai và thay H1 bằng cận bậc hai của H3; được một đệ quy co có số hạng cộng.

Bước 1: BĐ4, lấy $\mathbb E[\cdot\mid\mathcal F_k]$, H6, bổ đề tách phương sai và H6b:

$$
\mathbb E[d_{k+1}^2\mid\mathcal F_k]\le d_k^2-2\eta\nabla f(x_k)^T(x_k-x^*)+\eta^2\bigl(\lVert\nabla f(x_k)\rVert^2+\sigma^2\bigr).
$$

Bước 2: hai số hạng còn chứa $\nabla f(x_k)$ được chặn bằng hai bất đẳng thức của phần B. H3, viết tại $x_k$ với $y=x^*$, chặn tích vô hướng từ dưới bởi $e_k+\tfrac\mu2d_k^2$; BĐ2 (với $f_{\inf}=f^*$) chặn $\lVert\nabla f(x_k)\rVert^2$ từ trên bởi $2Le_k$. Thay vào:

$$
\mathbb E[d_{k+1}^2\mid\mathcal F_k]\le(1-\eta\mu)d_k^2-2\eta(1-\eta L)e_k+\eta^2\sigma^2.
$$

Bước 3: $\eta\le1/L$ và $e_k\ge0$ nên bỏ số hạng chứa $e_k$; lấy kỳ vọng toàn phần: $a_{k+1}\le(1-\eta\mu)a_k+\eta^2\sigma^2$.

Bước 4 (giải đệ quy): đặt $q=1-\eta\mu$; vì $\eta\mu\le\mu/L\le1$, $q\in[0,1)$. Quy nạp cho

$$
a_k\le q^ka_0+\eta^2\sigma^2\sum_{j<k}q^j\le q^kD^2+\frac{\eta^2\sigma^2}{1-q}=q^kD^2+\frac{\eta\sigma^2}\mu.
$$
:::

Khi đệ quy ở bước 3 xảy ra dấu bằng, nghiệm đúng là $q^k\bigl(a_0-\tfrac{\eta\sigma^2}\mu\bigr)+\tfrac{\eta\sigma^2}\mu$, và cận của T5 lớn hơn nghiệm đúng đúng $q^k\eta\sigma^2/\mu$. Khi $a_0<\eta\sigma^2/\mu$, nghiệm đúng tăng lên giá trị giới hạn $\eta\sigma^2/\mu$ của đệ quy, còn cận của T5 giảm về cùng giá trị đó.

::: example Ví dụ A: giá trị giới hạn và sàn nhiễu
$\eta=0{,}1$, $b=1$, $\theta_0=0$, $\mu=L=1$, $\sigma^2=\tfrac83$, $D=1$. Cận T5 là $0{,}9^k+\tfrac{0{,}1\cdot8/3}1=0{,}9^k+0{,}267$. Đẳng thức chính xác ở phần A là $a_{k+1}=0{,}81a_k+\tfrac8{300}$, với nghiệm

$$
a_k=0{,}81^k+\frac8{57}\bigl(1-0{,}81^k\bigr)\to\frac8{57}\approx0{,}140.
$$

Tại $k=20$: $0{,}81^{20}\approx0{,}0148$ nên $a_{20}\approx0{,}153$, còn cận là $0{,}9^{20}+0{,}267\approx0{,}1216+0{,}267\approx0{,}388$.

Ở Ví dụ A, $e_k=\tfrac12d_k^2$ và $L=\mu=1$, nên số hạng $-2\eta(1-\eta L)e_k$ bị bỏ ở bước 3 bằng $-\eta(1-\eta)d_k^2$. Giữ nó lại, hệ số trước $d_k^2$ là $(1-\eta)-\eta(1-\eta)=(1-\eta)^2=0{,}81$, đúng hệ số của đẳng thức chính xác; T5 dùng $1-\eta=0{,}9$.
:::

![Kỳ vọng bình phương sai lệch chính xác giảm về giá trị giới hạn 0,140, cận của định lý giảm về sàn nhiễu 0,267; tại k = 20 lần lượt là 0,153 và 0,388.](img/lec-05b/vda-sgd-bound-vs-exact.svg)

Tổng quát, với hàm bậc hai một chiều độ cong $\mu$ và nhiễu cộng phương sai $\sigma^2$, $\theta_{k+1}-\theta^*=(1-\eta\mu)(\theta_k-\theta^*)+\eta\xi_k$ cho $a_{k+1}=(1-\eta\mu)^2a_k+\eta^2\sigma^2$, với giá trị giới hạn

$$
\frac{\eta^2\sigma^2}{1-(1-\eta\mu)^2}=\frac{\eta\sigma^2}{\mu(2-\eta\mu)}\approx\frac{\eta\sigma^2}{2\mu}.
$$

Sàn nhiễu $\eta\sigma^2/\mu$ của T5 lớn gần gấp đôi. Với $b=4$ ở Ví dụ A: $\sigma^2=\tfrac23$, giá trị giới hạn $\tfrac{0{,}1\cdot2/3}{1{,}9}\approx0{,}035$, sàn nhiễu $\approx0{,}0667$. Sàn nhiễu giải thích quan sát của Bài 05: với bước hằng, dãy dao động quanh nghiệm ở một mức tỉ lệ với bước và với phương sai của gradient nhóm.

### Lịch giảm bước theo pha

Với bước hằng, cận của T5 không xuống dưới $\eta\sigma^2/\mu$ dù chạy bao lâu. Ở Ví dụ A, để cận đạt $0{,}01$ bằng một bước hằng, chọn chẳng hạn $\eta=0{,}001875$ (sàn nhiễu $0{,}005$); số hạng co $(1-\eta)^k$ cần khoảng $2824$ bước để xuống $0{,}005$. Lịch theo pha dùng bước lớn khi sai số còn lớn và chỉ giảm bước khi sai số đã xuống cỡ sàn nhiễu.

Ý chứng minh: trong mỗi pha, áp T5 với điểm đầu là điểm cuối của pha trước; độ dài pha được chọn để số hạng co không vượt sàn nhiễu, nên cuối pha sai số không quá hai lần sàn nhiễu, và sàn nhiễu giảm một nửa sau mỗi pha. Độ dài các pha tăng theo cấp số nhân, nên tổng độ dài bị chi phối bởi pha cuối.

**Hệ quả (lịch theo pha).** Giả thiết như T5, với $\eta_0\le1/L$ và $0<\varepsilon<\tfrac{\eta_0\sigma^2}\mu$. Pha $i=0,1,2,\dots$ dùng bước $\eta_i=\eta_02^{-i}$; đặt $F_i=\eta_i\sigma^2/\mu$ là sàn nhiễu của pha $i$. Pha $0$ chạy $m_0=\bigl\lceil\ln(D^2/F_0)^+/(\eta_0\mu)\bigr\rceil$ bước; pha $i\ge1$ chạy $m_i=\bigl\lceil\ln4/(\eta_i\mu)\bigr\rceil$ bước. Khi đó cuối pha $i$ có $a\le2F_i$, và tổng số bước để $a_k\le\varepsilon$ không vượt

$$
\frac{\ln(D^2/F_0)^+}{\eta_0\mu}+\frac{8\ln4\,\sigma^2}{\mu^2\varepsilon}+\log_2\frac{8F_0}\varepsilon
=O\Bigl(\frac1{\mu\eta_0}\log\frac{D^2}\varepsilon+\frac{\sigma^2}{\mu^2\varepsilon}\Bigr).
$$

Ở đây $t^+=\max\{t,0\}$.

::: proof Chứng minh hệ quả lịch theo pha
Đệ quy $a_{k+1}\le(1-\eta\mu)a_k+\eta^2\sigma^2$ ở bước 3 của T5 đúng tại mọi $k$ với bước đang dùng, vì nó chỉ dùng giả thiết tại $x_k$ rồi lấy kỳ vọng. Do đó nếu một pha dùng bước $\eta\le1/L$ trong $m$ bước, bắt đầu với $a=A$, thì cuối pha $a\le(1-\eta\mu)^mA+\eta\sigma^2/\mu$, theo bước 4 của T5. Mọi $\eta_i\le\eta_0\le1/L$. Dùng $(1-t)^m\le e^{-tm}$.

Pha $0$: $(1-\eta_0\mu)^{m_0}D^2\le e^{-\eta_0\mu m_0}D^2\le F_0$, nên cuối pha $a\le2F_0$.

Pha $i\ge1$: bắt đầu với $a\le2F_{i-1}=4F_i$; $(1-\eta_i\mu)^{m_i}4F_i\le e^{-\ln4}4F_i=F_i$, nên cuối pha $a\le2F_i$.

Gọi $I$ là chỉ số nhỏ nhất với $2F_I\le\varepsilon$, tức $2^I\ge2F_0/\varepsilon$. Vì $\varepsilon<F_0$, $I\ge2$ và tính nhỏ nhất cho $2^I<4F_0/\varepsilon$. Tổng số bước:

$$
m_0+\sum_{i=1}^Im_i\le\frac{\ln(D^2/F_0)^+}{\eta_0\mu}+1+\sum_{i=1}^I\Bigl(\frac{2^i\ln4}{\eta_0\mu}+1\Bigr)
\le\frac{\ln(D^2/F_0)^+}{\eta_0\mu}+\frac{2^{I+1}\ln4}{\eta_0\mu}+I+1.
$$

Với $2^{I+1}<8F_0/\varepsilon=8\eta_0\sigma^2/(\mu\varepsilon)$, số hạng giữa nhỏ hơn $8\ln4\,\sigma^2/(\mu^2\varepsilon)$, và $I+1<\log_2(8F_0/\varepsilon)$. Bậc $O(\cdot)$ suy ra từ $\ln(D^2/F_0)\le\ln(D^2/\varepsilon)$ và $\log_2(8F_0/\varepsilon)\le8F_0/\varepsilon\le8\sigma^2/(\mu^2\varepsilon)$, vì $\eta_0\mu\le1$.
:::

Pha $i$ dài khoảng $2^i\ln4/(\eta_0\mu)$ bước; pha cuối có độ dài tỉ lệ $1/\varepsilon$. Trên Ví dụ A với $\varepsilon=0{,}01$, lịch này chạy $1763$ bước, so với khoảng $2824$ bước của bước hằng ở trên. Đảo lại, sau $k$ bước sai số cỡ $\sigma^2/(\mu^2k)$, tức $a_k=O(1/k)$. Hệ quả này giải thích lịch bước $0{,}1\to0{,}05$ ở Bài 05.

::: example Ví dụ A, lịch theo pha
$\eta_0=0{,}1$, $\sigma^2=\tfrac83$, $\mu=1$: bước $0{,}1$ có sàn nhiễu $0{,}267$, bước $0{,}05$ có sàn nhiễu $0{,}133$. Hình dùng nghiệm đúng của đệ quy, $a\le q^m(A-F_i)+F_i$, và kết thúc pha khi $q^m(A-F_i)\le F_i$; các pha kết thúc tại $k=10$, $31$, $75$. Nếu dùng dạng cận của T5, $q^mA\le F_i$, các pha kết thúc tại $k=13$, $40$, $95$.
:::

![Trên Ví dụ A, bước giảm một nửa ở mỗi pha; cận của định lý co về gần sàn nhiễu của từng pha, sàn nhiễu cũng giảm một nửa mỗi pha.](img/lec-05b/step-halving-schedule.svg)

### Bước giảm dần cho hàm lồi mạnh

Lịch theo pha cần biết lúc chuyển pha. Một công thức bước cố định theo $k$ tránh việc đó. Với chặn mômen H6a, đệ quy của T5 thành $a_{k+1}\le(1-2\mu\eta_k)a_k+\eta_k^2G^2$ (chứng minh dưới đây); điểm cân bằng tại bước $k$, nơi tiến bộ $2\mu\eta_ka$ bằng nhiễu $\eta_k^2G^2$, là $a=\eta_kG^2/(2\mu)$, giảm về $0$ cùng $\eta_k$.

**Định lý (T6).** Đầu vào: $f$ thỏa H3, H4; $g_k$ thỏa H6, và H6a trên một vùng chứa dãy lặp; bước $\eta_k=\dfrac1{\mu(k+1)}$. Kết luận: với mọi $k\ge1$,

$$
a_k\le\frac{G^2}{\mu^2k}.
$$

::: proof Chứng minh T6 bằng quy nạp
Bước 1 (đệ quy). BĐ4, lấy $\mathbb E[\cdot\mid\mathcal F_k]$, H6 và H6a:

$$
\mathbb E[d_{k+1}^2\mid\mathcal F_k]\le d_k^2-2\eta_k\nabla f(x_k)^T(x_k-x^*)+\eta_k^2G^2.
$$

Tích vô hướng được chặn bằng H3 hai lần: H3 tại $x_k$ với $y=x^*$ cho $\ge e_k+\tfrac\mu2d_k^2$, rồi BĐ3 thay $e_k\ge\tfrac\mu2d_k^2$; tổng cộng $\nabla f(x_k)^T(x_k-x^*)\ge\mu d_k^2$. Khác T5, không cần giữ $e_k$ để triệt $\lVert\nabla f\rVert^2$, vì H6a đã chặn cả $\mathbb E\lVert g_k\rVert^2$; hệ số co vì vậy là $1-2\mu\eta_k$. Lấy kỳ vọng toàn phần:

$$
a_{k+1}\le(1-2\mu\eta_k)a_k+\eta_k^2G^2=\Bigl(1-\frac2{k+1}\Bigr)a_k+\frac{C}{(k+1)^2},\qquad C=\frac{G^2}{\mu^2}.
$$

Bất đẳng thức đúng với mọi $k\ge0$, kể cả khi hệ số $1-\tfrac2{k+1}$ âm.

Bước 2 (cơ sở, $k=1$). Với $k=0$, hệ số bằng $-1$: $a_1\le-a_0+C\le C$, vì $a_0\ge0$.

Bước 3 (bước quy nạp). Giả sử $a_k\le C/k$ với một $k\ge1$. Khi $k\ge1$, hệ số $1-\tfrac2{k+1}=\tfrac{k-1}{k+1}\ge0$, nên được phép thay $a_k$ bởi cận của nó:

$$
a_{k+1}\le\frac{k-1}{k+1}\cdot\frac Ck+\frac C{(k+1)^2}=\frac C{k+1}\Bigl(\frac{k-1}k+\frac1{k+1}\Bigr)\le\frac C{k+1},
$$

vì $\tfrac{k-1}k+\tfrac1{k+1}=1-\tfrac1k+\tfrac1{k+1}\le1$.
:::

::: example Ví dụ A với bước 1/(k+1)
$\mu=1$, $\eta_k=\tfrac1{k+1}$: $\theta_{k+1}=\theta_k-\tfrac1{k+1}(\theta_k-y_{I_k})=\tfrac{k\theta_k+y_{I_k}}{k+1}$. Với $k=0$ bước bằng $1$ và $\theta_1=y_{I_0}$, nên quy nạp cho $\theta_k$ là trung bình của $k$ mẫu đầu. Vì vậy $\theta_k\in[-1,3]$ và $a_k=\operatorname{Var}(\theta_k)=\tfrac{8/3}k=\tfrac8{3k}$ chính xác. Trên $[-1,3]$, $\mathbb E[g^2\mid\theta]=(\theta-1)^2+\tfrac83\le4+\tfrac83=\tfrac{20}3$, nên T6 cho $a_k\le\tfrac{20}{3k}$, so với giá trị chính xác $\tfrac8{3k}$. Bước $\tfrac1{k+1}$ thỏa điều kiện Robbins–Monro.
:::

Bốn lịch bước của phần này khác nhau ở thông tin cần biết trước:

| Lịch bước | Cần biết trước | Giả thiết | Kết luận |
|---|---|---|---|
| Bước hằng $\eta\le1/L$ (T5) | $L$ | H2, H3, H6b | $a_k$ tuyến tính tới sàn nhiễu $\eta\sigma^2/\mu$ |
| Theo pha | $L$, $\mu$, $\sigma^2$, $D$ để biết lúc chuyển pha | H2, H3, H6b | $a_k=O(1/k)$ |
| $\frac1{\mu(k+1)}$ (T6) | $\mu$ | H3, H6a trên vùng chứa dãy lặp | $a_k\le G^2/(\mu^2k)$ |
| $D/(G\sqrt K)$, trung bình lặp (T4) | $D$, $G$, $K$ | lồi, H6a | $\mathbb Ef(\bar x_K)-f^*\le DG/\sqrt K$ |

Cận của T6 giả định biết đúng $\mu$. Nếu dùng $\eta_k=\tfrac1{\hat\mu(k+1)}$ với ước lượng $\hat\mu$ lớn hơn $\mu$ thật, tốc độ có thể chậm hơn nhiều so với $1/k$ (Nemirovski, Juditsky, Lan và Shapiro, 2009, §1).

### Bảo đảm theo xác suất

**Bổ đề BĐ6 (bất đẳng thức Markov).** Cho $Z\ge0$ là biến ngẫu nhiên và $\varepsilon>0$. Khi đó $P(Z\ge\varepsilon)\le\mathbb EZ/\varepsilon$.

::: proof Chứng minh BĐ6
Với mọi kết cục, $Z\ge\varepsilon\,\mathbf 1\{Z\ge\varepsilon\}$: nếu $Z\ge\varepsilon$ thì vế phải bằng $\varepsilon$; nếu không thì vế phải bằng $0\le Z$. Lấy kỳ vọng: $\mathbb EZ\ge\varepsilon P(Z\ge\varepsilon)$.
:::

Áp BĐ6 cho các đại lượng không âm mà các định lý đã chặn kỳ vọng, cận về trung bình trên mọi lần chạy thành cận xác suất cho một lần chạy:

- T4, bước hằng tối ưu: $P\bigl(f(\bar x_K)-f^*\ge\varepsilon\bigr)\le\dfrac{DG}{\varepsilon\sqrt K}$;
- T5: $P(d_k^2\ge\varepsilon)\le a_k/\varepsilon$.

::: example Ví dụ A, k = 20
$P\bigl((\theta_{20}-1)^2\ge0{,}5\bigr)\le\tfrac{0{,}153}{0{,}5}\approx0{,}31$. Cận Markov thường lỏng: với $k=2$, chín lá của cây cho $P\bigl((\theta_2-1)^2\ge1\bigr)=\tfrac29\approx0{,}22$, trong khi Markov cho $0{,}704$.
:::

Một kết quả mạnh hơn được nêu, không chứng minh: nếu $f$ lồi, đạt cực tiểu (H4), $g_k$ thỏa H6 và H6a, và bước thỏa điều kiện Robbins–Monro, thì $x_k$ hội tụ gần như chắc chắn (almost surely) tới một điểm cực tiểu. Chứng minh cần định lý siêu martingale Robbins–Siegmund, ngoài phạm vi bài; Sra, Nowozin và Wright (2011), ch. 4, Mệnh đề 4.8 nêu trường hợp dưới gradient thành phần bị chặn. Kết quả không áp dụng cho mục tiêu không lồi.

Bài tập 5, 6 và 9 tính kỳ vọng trên cây, chứng minh T6 bằng quy nạp và chặn xác suất bằng Markov.

::: exercise Câu hỏi kiểm tra
Ở Ví dụ A với nhóm $b=4$ và bước $\eta=0{,}05$, tính sàn nhiễu của T5 và giá trị giới hạn chính xác của $a_k$.
:::

## F. Mục tiêu không lồi và chuẩn gradient

### Ví dụ D và sự thất bại của hệ quả của H1

Mục tiêu của mạng nơ ron nhiều lớp không lồi; các bảo đảm của phần C–E dùng $x^*$ qua hệ quả của H1, và hệ quả này sai khi $f$ không lồi. Ví dụ D là hàm một biến đơn giản có hiện tượng này: hai cực tiểu toàn cục ngăn cách bởi một cực đại địa phương.

$F(\theta)=\tfrac14(\theta^2-1)^2$, bằng một phần tư hàm $r(u)=(u^2-1)^2$ của Bài 05. $F'(\theta)=\theta^3-\theta$, $F''(\theta)=3\theta^2-1$. Hai cực tiểu toàn cục $\pm1$ với $F=0$; cực đại địa phương $0$ với $F(0)=\tfrac14$.

- Khoảng cách $d_k$ không xác định duy nhất: nó đổi khi thay cực tiểu $\theta^*=1$ bằng $\theta^*=-1$.
- Từ $\theta_0=0$, mọi bước GD giữ $\theta_k=0$ vì $F'(0)=0$; sai số giá trị đứng ở $\tfrac14$.
- Hệ quả của H1 sai: với $\theta^*=1$, tại $\theta=-0{,}5$, $F'(-0{,}5)=0{,}375$ và $F'(\theta)(\theta-\theta^*)=0{,}375\cdot(-1{,}5)=-0{,}5625<F(-0{,}5)-F^*=0{,}140625$. Với $\theta^*=-1$, bất đẳng thức đúng tại điểm này ($0{,}1875\ge0{,}1406$), nên việc nó sai phụ thuộc cực tiểu được chọn.

![Hàm bậc bốn hai đáy F(θ) = ¼(θ² − 1)² với hai cực tiểu tại −1 và 1, cực đại địa phương tại 0; từ θ0 = 2, bước 1/11 cho θ1 ≈ 1,455 rồi θ2 ≈ 1,307, giá trị F giảm từ 2,25 xuống khoảng 0,311 rồi 0,125.](img/lec-05b/quartic-two-wells.svg)

Chuẩn gradient chỉ dùng thông tin tại điểm lặp và không cần $x^*$; nó là tiêu chí dừng ở Bài 04 và là thước đo của phần này.

### Hàm thế và định lý điểm dừng

Bổ đề giảm không cần tính lồi: mỗi bước GD bước $\eta\le1/L$ hạ hàm thế $V_k=f(x_k)-f_{\inf}\ge0$ ít nhất $\tfrac\eta2\lVert\nabla f(x_k)\rVert^2$. Độ cao ban đầu

$$
\Delta_0=f(x_0)-f_{\inf}
$$

chặn tổng các lần hạ, nên chuẩn gradient không thể lớn mãi.

::: example Ví dụ D từ θ₀ = 2: hằng số L trên một vùng
$F(2)=\tfrac94=\Delta_0$ (vì $F_{\inf}=0$), $F'(2)=6$. H2 không đúng trên $\mathbb R$ vì $F''$ không bị chặn, nhưng trên $[-2,2]$ có $F''\in[-1,11]$, nên $\lvert F''\rvert\le11$. Ánh xạ bước $\theta\mapsto\theta-F'(\theta)/11=(12\theta-\theta^3)/11$ có đạo hàm $(12-3\theta^2)/11\ge0$ trên $[-2,2]$, nên đơn điệu và đưa $[-2,2]$ vào $[-\tfrac{16}{11},\tfrac{16}{11}]$. Dãy GD bước $\tfrac1{11}$ vì vậy ở lại vùng có hằng số $L=11$, và bổ đề giảm áp dụng được ở mọi bước. Bước đầu: $\theta_1=\tfrac{16}{11}\approx1{,}455$, $F(\theta_1)\approx0{,}311$; mức hạ $1{,}94\ge\tfrac{36}{22}\approx1{,}64$ như bổ đề giảm bảo đảm.
:::

**Định lý (T7).** Đầu vào: $f$ thỏa H0, H2; điểm đầu $x_0$; bước $\tfrac1L$. Kết luận: với mọi $K\ge1$,

$$
\min_{k<K}\lVert\nabla f(x_k)\rVert^2\le\frac{2L\Delta_0}K.
$$

::: proof Chứng minh T7
Cộng bổ đề giảm $f(x_{k+1})\le f(x_k)-\tfrac1{2L}\lVert\nabla f(x_k)\rVert^2$ với $k=0,\dots,K-1$ và dùng $f(x_K)\ge f_{\inf}$:

$$
\frac K{2L}\min_{k<K}\lVert\nabla f(x_k)\rVert^2\le\frac1{2L}\sum_{k<K}\lVert\nabla f(x_k)\rVert^2\le f(x_0)-f(x_K)\le\Delta_0.
$$

Đây là mẫu 1 với hàm thế $u_k=f(x_k)-f_{\inf}$.
:::

Định lý không cần lồi và không cần $x^*$; nó chặn lặp tốt nhất theo chuẩn gradient, không chặn điểm cuối. Tốc độ $O(1/K)$ cho bình phương chuẩn gradient tương ứng $O(1/\sqrt K)$ cho chính chuẩn gradient. Với bước hằng $0<\eta\le1/L$, cùng lập luận cho $\min_{k<K}\lVert\nabla f(x_k)\rVert^2\le\tfrac{2\Delta_0}{\eta K}$ (Bài tập 7).

::: example Ví dụ D: cận T7 và giá trị thật
Vì dãy GD ở lại $[-2,2]$, T7 áp dụng với $L=11$, $\Delta_0=\tfrac94$: $\min_{k<K}F'(\theta_k)^2\le\tfrac{2\cdot11\cdot9/4}K=\tfrac{49{,}5}K$. Bước thứ hai cho $\theta_2\approx1{,}307$, $F(\theta_2)\approx0{,}125$. Giá trị thật của $\min_{k<K}F'(\theta_k)^2$ là $36$; $0{,}18$; $0{,}012$ với $K=1,5,10$, so với cận $49{,}5$; $9{,}9$; $4{,}95$.
:::

### Định lý SGD cho hàm không lồi

**Định lý (T8).** Đầu vào: $f$ thỏa H0, H2; $g_k$ thỏa H6, H6b; bước hằng $0<\eta\le1/L$; $K\ge1$. Kết luận:

$$
\frac1K\sum_{k<K}\mathbb E\lVert\nabla f(x_k)\rVert^2\le\frac{2\Delta_0}{\eta K}+L\eta\sigma^2.
$$

::: proof Chứng minh T8
*Ý tưởng.* Lấy kỳ vọng có điều kiện của bổ đề giảm rồi cộng như chứng minh T7.

Bước 1: BĐ1 với $x=x_k$, $y=x_k-\eta g_k$: $f(x_{k+1})\le f(x_k)-\eta\nabla f(x_k)^Tg_k+\tfrac{L\eta^2}2\lVert g_k\rVert^2$. Lấy $\mathbb E[\cdot\mid\mathcal F_k]$, dùng H6 và bổ đề tách phương sai với H6b:

$$
\mathbb E[f(x_{k+1})\mid\mathcal F_k]\le f(x_k)-\eta\lVert\nabla f(x_k)\rVert^2+\frac{L\eta^2}2\bigl(\lVert\nabla f(x_k)\rVert^2+\sigma^2\bigr).
$$

Bước 2: hệ số của $\lVert\nabla f(x_k)\rVert^2$ là $-\eta+\tfrac{L\eta^2}2=-\eta\bigl(1-\tfrac{L\eta}2\bigr)$, không vượt $-\tfrac\eta2$ khi $\eta\le1/L$, cùng phép tính như bổ đề giảm. Do đó

$$
\mathbb E[f(x_{k+1})\mid\mathcal F_k]\le f(x_k)-\frac\eta2\lVert\nabla f(x_k)\rVert^2+\frac{L\eta^2\sigma^2}2.
$$

Bước 3: lấy kỳ vọng toàn phần (tính chất tháp), cộng với $k<K$, dùng $\mathbb Ef(x_K)\ge f_{\inf}$:

$$
\frac\eta2\sum_{k<K}\mathbb E\lVert\nabla f(x_k)\rVert^2\le\Delta_0+\frac{KL\eta^2\sigma^2}2.
$$

Chia hai vế cho $\tfrac{\eta K}2$.
:::

Mỗi bước thêm một số hạng nhiễu $\tfrac{L\eta^2\sigma^2}2$; sau khi chia cho $\tfrac{\eta K}2$ còn $L\eta\sigma^2$, không giảm theo $K$. Hàm thế là $f-f_{\inf}$, không cần $x^*$. Khi $\sigma=0$ và $\eta=1/L$, định lý cho lại T7 dưới dạng trung bình. Nếu chọn chỉ số $\tau$ đều trong $\{0,\dots,K-1\}$, độc lập với dãy, thì $\mathbb E\lVert\nabla f(x_\tau)\rVert^2$ có cùng cận.

**Hệ quả (chọn bước).** Với $\eta=\min\bigl\{\tfrac1L,\sqrt{2\Delta_0/(L\sigma^2K)}\bigr\}$,

$$
\frac1K\sum_{k<K}\mathbb E\lVert\nabla f(x_k)\rVert^2\le\frac{2L\Delta_0}K+\frac{2\sqrt{2L\Delta_0\sigma^2}}{\sqrt K}.
$$

::: derivation Hai trường hợp của hệ quả
Nếu $\eta=\sqrt{2\Delta_0/(L\sigma^2K)}\le\tfrac1L$, hai số hạng của T8 bằng nhau: $\tfrac{2\Delta_0}{\eta K}=L\eta\sigma^2=\sqrt{2L\Delta_0\sigma^2/K}$, tổng bằng $2\sqrt{2L\Delta_0\sigma^2/K}$.

Nếu $\eta=\tfrac1L$, tức $\tfrac1L\le\sqrt{2\Delta_0/(L\sigma^2K)}$, bình phương hai vế cho $\sigma^2\le2L\Delta_0/K$. Khi đó cận của T8 bằng $\tfrac{2L\Delta_0}K+\sigma^2$, và $\sigma^2=\sqrt{\sigma^2\cdot\sigma^2}\le\sqrt{2L\Delta_0\sigma^2/K}$.

Trong cả hai trường hợp, tổng không vượt cận đã nêu.
:::

### Điều kiện Polyak–Łojasiewicz

T7, T8 chỉ cho tốc độ dưới tuyến tính của chuẩn gradient. Ở Ví dụ D, $F'(0)=0$ trong khi $F(0)-F_{\inf}=\tfrac14$: gradient nhỏ không kéo theo giá trị gần tối ưu. Cần một bất đẳng thức buộc gradient chỉ nhỏ khi giá trị đã gần tối ưu.

::: example Ví dụ C và Ví dụ A thỏa bất đẳng thức đó
Ví dụ C: $\lVert\nabla f(x)\rVert^2=9x_1^2+49x_2^2\ge9x_1^2+21x_2^2=6\bigl(f(x)-f_{\inf}\bigr)$ tại mọi điểm. Ví dụ A: $\tfrac12J'(\theta)^2=\tfrac12(\theta-1)^2=J(\theta)-J_{\inf}$, dấu bằng.
:::

**Giả thiết H7 (điều kiện Polyak–Łojasiewicz, PL).** Tồn tại $\mu>0$ để với mọi $x$: $\tfrac12\lVert\nabla f(x)\rVert^2\ge\mu\bigl(f(x)-f_{\inf}\bigr)$.

Mọi hàm $\mu$-lồi mạnh thỏa H7 theo vế thứ hai của BĐ3, với $f_{\inf}=f^*$; Ví dụ C thỏa với $\mu=3$, Ví dụ A với $\mu=1$. H7 không đòi tính lồi. Ví dụ D không thỏa H7 trên $\mathbb R$ vì điểm dừng $\theta=0$ không là cực tiểu; nó thỏa H7 trên $\{\lvert\theta\rvert\ge c\}$ với $\mu=2c^2$ (Bài tập 7). Dưới H2 và H7, BĐ2 cho $2\mu(f-f_{\inf})\le\lVert\nabla f\rVert^2\le2L(f-f_{\inf})$, nên $\mu\le L$ trừ khi $f$ là hằng.

**Định lý (T9).** Đầu vào: $f$ thỏa H0, H2, H7; $g_k$ thỏa H6, H6b; bước hằng $0<\eta\le1/L$. Kết luận: với $\Delta_k=f(x_k)-f_{\inf}$ và mọi $k\ge0$,

$$
\mathbb E\Delta_k\le(1-\eta\mu)^k\Delta_0+\frac{L\eta\sigma^2}{2\mu}.
$$

::: proof Chứng minh T9
Bước 2 của chứng minh T8 cho $\mathbb E[\Delta_{k+1}\mid\mathcal F_k]\le\Delta_k-\tfrac\eta2\lVert\nabla f(x_k)\rVert^2+\tfrac{L\eta^2\sigma^2}2$. H7 cho $\lVert\nabla f(x_k)\rVert^2\ge2\mu\Delta_k$, nên

$$
\mathbb E[\Delta_{k+1}\mid\mathcal F_k]\le(1-\eta\mu)\Delta_k+\frac{L\eta^2\sigma^2}2.
$$

Lấy kỳ vọng toàn phần. Vì $\mu\le L$ và $\eta\le1/L$, $q=1-\eta\mu\in[0,1)$. Giải đệ quy như bước 4 của T5:

$$
\mathbb E\Delta_k\le q^k\Delta_0+\frac{L\eta^2\sigma^2}2\sum_{j<k}q^j\le q^k\Delta_0+\frac{L\eta^2\sigma^2}{2\eta\mu}=q^k\Delta_0+\frac{L\eta\sigma^2}{2\mu}.
$$

Phép chứng minh lặp lại T2b, cộng thêm $\tfrac{L\eta^2\sigma^2}2$ ở mỗi bước do nhiễu; khác T5 ở hàm thế $f-f_{\inf}$, nên không dùng $x^*$ và không cần tính lồi.
:::

## G. Bảng tra và giới hạn

### Bảng tra các bảo đảm hội tụ

| Định lý | Giả thiết | Đại lượng được chặn | Tốc độ | Bước |
|---|---|---|---|---|
| T1, T1' | H1, H2, H4 | $e_k$; $d_k$ không tăng | $O(1/k)$ | $\eta\le1/L$ |
| T2a, T2b | H2, H3, H4 | $d_k^2$; $e_k$ | tuyến tính | $1/L$ |
| T2' | H2, H3 trên tập mức | $e_k$ | tuyến tính | quay lui |
| T3 | H1 (dạng dưới gradient), H4, H5 | $\min_ke_k$; $f(\bar x_K)-f^*$ | $O(1/\sqrt K)$ | $D/(G\sqrt K)$ |
| T4 | H1 (dạng dưới gradient), H4, H6, H6a | $\mathbb Ef(\bar x_K)-f^*$ | $O(1/\sqrt K)$ | $D/(G\sqrt K)$ |
| T5, lịch theo pha | H2, H3, H4, H6, H6b | $a_k$ | tuyến tính tới sàn nhiễu; $O(1/k)$ | $\eta\le1/L$; chia đôi theo pha |
| T6 | H3, H4, H6, H6a trên vùng chứa dãy lặp | $a_k$ | $O(1/k)$ | $\frac1{\mu(k+1)}$ |
| T7 | H0, H2 | $\min_k\lVert\nabla f(x_k)\rVert^2$ | $O(1/K)$ | $1/L$ |
| T8 | H0, H2, H6, H6b | trung bình $\mathbb E\lVert\nabla f(x_k)\rVert^2$ | $O(1/\sqrt K)$ | $\min\{1/L,\sqrt{2\Delta_0/(L\sigma^2K)}\}$ |
| T9 | H0, H2, H7, H6, H6b | $\mathbb E\Delta_k$ | tuyến tính tới sàn nhiễu | $\eta\le1/L$ |

Trong cột tốc độ, "tuyến tính tới sàn nhiễu" chỉ cận dạng $q^kC+F$: phần $q^kC$ co tuyến tính, phần $F$ không phụ thuộc $k$, bằng $\eta\sigma^2/\mu$ ở T5 và $L\eta\sigma^2/(2\mu)$ ở T9. Khi dùng bảng, kiểm cột giả thiết trước, rồi đọc cột đại lượng được chặn để biết kết luận nói về điểm nào.

### Khuôn chứng minh chung

| Giả thiết đổi | Bất đẳng thức một bước | Cách giải | Thu được |
|---|---|---|---|
| H1, H2, H4 | $e_{k+1}\le\frac1{2\eta}(d_k^2-d_{k+1}^2)$, $\eta\le\frac1L$ | tổng lồng | T1, T1' |
| thêm H3 | $d_{k+1}^2\le(1-\frac\mu L)d_k^2$ | co | T2a, T2b, T2' |
| bỏ H2, H3; thêm H5 | $d_{k+1}^2\le d_k^2-2\eta_ke_k+\eta_k^2G^2$ | tổng lồng có trọng số | T3 |
| H5 → H6, H6a | như trên, với $\mathbb E[\cdot\mid\mathcal F_k]$ | tổng lồng | T4 |
| thêm H2, H3; H6b | $a_{k+1}\le(1-\eta\mu)a_k+\eta^2\sigma^2$ | giải đệ quy | T5, lịch theo pha |
| H3, H6a trên vùng | $a_{k+1}\le(1-2\mu\eta_k)a_k+\eta_k^2G^2$ | giải đệ quy (quy nạp $C/k$) | T6 |
| bỏ H1, H3, H4; thêm H0 | $\mathbb E\Delta_{k+1}\le\mathbb E\Delta_k-\frac\eta2\mathbb E\lVert\nabla f(x_k)\rVert^2+\frac{L\eta^2\sigma^2}2$ | tổng lồng | T7, T8 |
| thêm H7 | $\mathbb E\Delta_{k+1}\le(1-\eta\mu)\mathbb E\Delta_k+\frac{L\eta^2\sigma^2}2$ | giải đệ quy | T9 |

Từ một dòng sang dòng kế, bất đẳng thức một bước đổi theo đúng giả thiết được thêm hoặc bớt: có H3 thì vế phải nhân một hệ số co thay vì trừ một hiệu; mất H2 thì số hạng $\eta_k^2G^2$ ở lại vì không còn bổ đề giảm để triệt nó; thay gradient bằng ước lượng không chệch thì mỗi dòng của chứng minh được lấy $\mathbb E[\cdot\mid\mathcal F_k]$; mất tính lồi thì hàm thế đổi từ $d^2$ sang $f-f_{\inf}$ vì $x^*$ không còn dùng được. Các kỹ thuật phụ gồm chọn tham số để cân bằng hai số hạng, Jensen cho trung bình lặp, Markov cho xác suất, và phản ví dụ cho mỗi giả thiết bị bỏ.

### Phạm vi áp dụng

- Các định lý là cận trên cho phương pháp bậc nhất, không ràng buộc, với bước cố định hoặc theo lịch cho trước; riêng T2' dùng quay lui.
- Cận có thể bi quan: Ví dụ C đạt $e_k\le0{,}01$ sau $6$ bước, T2b bảo đảm $16$, T1 bảo đảm $7000$; ở Ví dụ A, giá trị giới hạn là $0{,}140$ còn sàn nhiễu là $0{,}267$.
- Với mục tiêu không lồi, T7 và T8 không nói dãy tới cực tiểu nào và không loại điểm yên ngựa hay cực đại địa phương: dãy GD bắt đầu tại $0$ của Ví dụ D thỏa T7 mà không rời cực đại địa phương. Điều kiện PL toàn cục hiếm khi kiểm được.
- Các định lý SGD giả sử lấy mẫu có hoàn lại và bước không phụ thuộc mẫu.
- Ngoài phạm vi: momentum, Nesterov (Bài 05); AdaGrad, RMSProp, Adam, chuẩn hóa theo lô (batch normalization, Bài 06); cận dưới về độ phức tạp; giảm phương sai (SVRG, SAGA); phép chiếu cho ràng buộc; phương pháp Newton (Bài 04). Các phương pháp này có lý thuyết hội tụ riêng; bảng tra của bài không áp dụng trực tiếp cho chúng.

Trước khi dùng một định lý, cần kiểm: giả thiết đúng toàn cục hay chỉ trên một vùng chứa dãy lặp; giả thiết nhiễu là chặn $G^2$ hay chặn $\sigma^2$; đại lượng được chặn là điểm cuối, lặp tốt nhất, trung bình lặp hay kỳ vọng. Trung bình Polyak ở Bài 06 là trung bình lặp với bước hằng; với mục tiêu lồi, T4 cho nó một cận.

## Tài liệu tham khảo

1. Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press, §9.1.2 (cận bậc hai, (9.8)–(9.14)), §9.3 và §9.3.1 (hội tụ của hạ gradient với bước chính xác và quay lui, tr. 466–468).
2. Suvrit Sra, Sebastian Nowozin và Stephen J. Wright (biên tập, 2011), *Optimization for Machine Learning*, MIT Press: ch. 4 (D. P. Bertsekas, phương pháp gradient, dưới gradient tăng dần; §4.1, Mệnh đề 4.8); ch. 5 (A. Juditsky và A. Nemirovski, phương pháp bậc nhất cho tối ưu lồi không trơn; §5.2, Mệnh đề 5.1; §5.4; §5.5, Mệnh đề 5.5); ch. 13 (L. Bottou và O. Bousquet, đánh đổi trong học quy mô lớn; §13.3).
3. Arkadi Nemirovski, Anatoli Juditsky, Guanghui Lan và Alexander Shapiro (2009), "Robust stochastic approximation approach to stochastic programming", *SIAM Journal on Optimization* 19(4), 1574–1609, §1. Dùng cho độ nhạy của bước $\frac1{\mu k}$ theo ước lượng $\mu$.
4. Học liệu Bài 04, mục B (chứng minh định lý $O(1/k)$ với bước $1/L$); Bài 05 (gradient nhóm, hiệp phương sai $\Sigma/b$, lịch bước).

Các định lý T1', T2a, T5, lịch theo pha, T6, T7, T8, T9 được suy trực tiếp từ BĐ1–BĐ6 và bổ đề tách phương sai; hằng số trong các phát biểu này là hằng số của chứng minh trong ghi chú. Mọi ví dụ số được tính trực tiếp từ công thức đã nêu, không phải kết quả thực nghiệm.
