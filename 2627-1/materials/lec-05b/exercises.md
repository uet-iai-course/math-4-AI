# Bài tập Bài 05b — Hội tụ của hạ gradient và hạ gradient ngẫu nhiên

Bộ bài tập gồm mười bài ở ba mức: nhận biết (Bài 1), tính toán hoặc chứng minh (Bài 2–7, 10) và vận dụng vào AI (Bài 8–9). Các bài 1, 2, 4, 5, 7 và một phần Bài 9 là các câu hỏi trên trang chiếu, ở đây có gợi ý và lời giải đầy đủ. Ký hiệu, giả thiết H0–H7, bổ đề BĐ1–BĐ6 và định lý T1–T9 theo ghi chú bài giảng. Bốn ví dụ dùng chung:

- Ví dụ A: $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$ từ ba quan sát $y=(-1,1,3)$, gradient một mẫu $\theta-y_I$;
- Ví dụ B: $f(x)=\tfrac13\bigl(\lvert x+1\rvert+\lvert x-1\rvert+\lvert x-3\rvert\bigr)$, $x^*=1$, $f^*=\tfrac43$;
- Ví dụ C: $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $\mu=3$, $L=7$, $x_0=(2,4)$, $f(x_0)=62$, $D^2=20$;
- Ví dụ D: $F(\theta)=\tfrac14(\theta^2-1)^2$.

Lời giải cần nêu giả thiết được dùng ở từng bước. Số thập phân viết với dấu phẩy. Viết tắt: chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), phương pháp hạ gradient (GD), hạ gradient ngẫu nhiên (SGD), điều kiện Polyak–Łojasiewicz (PL).

## Bài 1. Bất đẳng thức cầu nối trên hai ví dụ

Mức độ: nhận biết. LLO6, CLO1.

::: exercise Bài 1
1. Kiểm BĐ2 cho $\phi(s)=\log(1+e^{-s})$ (với $L=\tfrac14$) tại $s=0$ và giải thích vì sao bổ đề dùng $f_{\inf}$ thay cho $f^*$.
2. Tính $\mu$, $L$ cho $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$ (Ví dụ A) và $f(x)=\tfrac12(3x_1^2+7x_2^2)$ (Ví dụ C). Kiểm chuỗi bất đẳng thức của bản đồ dạng hội tụ, $\tfrac\mu2d^2\le e\le\tfrac1{2\mu}\lVert\nabla f\rVert^2\le\tfrac L\mu e\le\tfrac{L^2}{2\mu}d^2$, tại $x=(1,-1)$ của Ví dụ C.
3. Phân loại bốn phát biểu theo dạng hội tụ, rồi nêu giả thiết để suy ra một dạng khác:
   với $x_k$ là GD bước $\tfrac17$ trên Ví dụ C ở (a), (b): (a) $f(x_k)-f^*\le70/k$; (b) $\lVert x_k-x^*\rVert^2\le20(4/7)^k$; (c) $\min_{k<K}\lVert\nabla f(x_k)\rVert^2\le C/K$ với hằng số $C>0$; (d) $\mathbb E(\theta_k-1)^2\le0{,}9^k+0{,}267$, với $\theta_k$ là SGD trên Ví dụ A.
:::

::: hint Gợi ý Bài 1
Với hàm một biến khả vi hai lần, hằng số $L$ là cận trên của $\lvert f''\rvert$ và $\mu$ là cận dưới dương của $f''$. Với hàm bậc hai $\tfrac12x^THx$, $\mu$ và $L$ là trị riêng nhỏ nhất và lớn nhất của $H$. Ở câu 3, xác định đại lượng nằm ở vế trái trước, rồi tìm mũi tên của bản đồ đi từ đại lượng đó.
:::

::: solution Lời giải Bài 1
1. $\phi'(s)=-1/(1+e^s)$, nên $\phi'(0)=-\tfrac12$ và $\phi'(0)^2=0{,}25$. Với $L=\tfrac14$ và $f_{\inf}=0$: $2L\bigl(\phi(0)-0\bigr)=\tfrac12\log2\approx0{,}347\ge0{,}25$. Cận dưới đúng $0$ của $\phi$ không đạt, nên $f^*=f(x^*)$ không xác định. Chứng minh BĐ2 chỉ cần $f_{\inf}\le f(y)$ với mọi $y$, áp tại $y=x-\tfrac1L\nabla f(x)$.

2. Với hàm bậc hai, $\mu$ và $L$ là trị riêng nhỏ nhất và lớn nhất của Hessian. Ví dụ A có $J''\equiv1$, nên $\mu=L=1$; Ví dụ C có Hessian $\operatorname{diag}(3,7)$, nên $\mu=3$, $L=7$. Các đại lượng tại điểm $x=(1,-1)$ của Ví dụ C: $d^2=2$, $e=\tfrac12(3+7)=5$, $\nabla f=(3,-7)$, $\lVert\nabla f\rVert^2=58$. Chuỗi là

$$
\tfrac32\cdot2=3\ \le\ 5\ \le\ \tfrac{58}6\approx9{,}67\ \le\ \tfrac73\cdot5\approx11{,}67\ \le\ \tfrac{49}6\cdot2\approx16{,}33.
$$

3. (a) Hội tụ theo giá trị, dưới tuyến tính $O(1/k)$. Dưới H3 (và H4), BĐ3 cho $d_k^2\le\tfrac2\mu e_k\le\tfrac2\mu\cdot\tfrac{70}k$.
(b) Hội tụ theo dãy lặp, tuyến tính hệ số $\tfrac47$ cho $d_k^2$. Dưới H2, BĐ1 tại $x^*$ cho $e_k\le\tfrac L2d_k^2\le\tfrac L2\cdot20(\tfrac47)^k$.
(c) Hội tụ tới điểm dừng, đo bằng giá trị nhỏ nhất trên $K$ bước đầu, tốc độ $O(1/K)$. Dưới H3, BĐ3 cho $e_k\le\tfrac1{2\mu}\lVert\nabla f(x_k)\rVert^2$ với mọi $k$, nên $\min_{k<K}e_k\le\tfrac{C}{2\mu K}$.
(d) Hội tụ theo kỳ vọng của bình phương khoảng cách, với phần nhiễu $0{,}267$ không giảm theo $k$: phần $0{,}9^k$ giảm tuyến tính, phần còn lại thì không. Dưới H2, BĐ1 cho $\mathbb E\,e_k\le\tfrac L2\mathbb E\,d_k^2$; Markov (BĐ6) chuyển cận kỳ vọng thành cận xác suất.

Theo các phần C, E, F của ghi chú bài giảng: (a), (b) là T1, T2a trên Ví dụ C; (c) là dạng của T7; (d) là T5 trên Ví dụ A.
:::

## Bài 2. Quay lui, co và ngưỡng bước

Mức độ: tính toán hoặc chứng minh. LLO6, LLO8, CLO1.

::: exercise Bài 2
Cho Ví dụ C: $f(x)=\tfrac12(3x_1^2+7x_2^2)$, $x_0=(2,4)$, $\mu=3$, $L=7$, $D^2=20$, $e_0=62$. Ký hiệu $[x]_i$ là tọa độ thứ $i$ của $x$.

1. Với quay lui Armijo $\alpha=\tfrac14$, $\beta=\tfrac12$: tính hệ số $c$ của T2' và số bước để cận bảo đảm $e_k\le0{,}01$.
2. Với GD bước $\tfrac17$, kiểm cận T2a tại $k=2$ và $k=3$.
3. Với GD bước hằng $\eta=0{,}3$ từ cùng $x_0$: chứng minh $\lvert[x_k]_2\rvert$ tăng theo $k$; chỉ ra giả thiết về bước của T1' bị vi phạm.
:::

::: hint Gợi ý Bài 2
Ở câu 1, thay số vào $c=1-\min\{2\mu\alpha,2\beta\alpha\mu/L\}$ rồi giải $62c^k\le0{,}01$ bằng logarit. Ở câu 3, GD trên hàm bậc hai tách thành hai phép lặp một chiều $[x_{k+1}]_i=(1-\eta h_i)[x_k]_i$.
:::

::: solution Lời giải Bài 2
1. $2\mu\alpha=1{,}5$ và $2\beta\alpha\mu/L=\tfrac{2\cdot\frac12\cdot\frac14\cdot3}7=\tfrac3{28}$, nên $c=1-\tfrac3{28}=\tfrac{25}{28}\approx0{,}893$. Cận $e_k\le62c^k$ đạt $0{,}01$ khi $k\ge\ln6200/\ln\tfrac{28}{25}\approx77{,}05$; kiểm $62c^{77}\approx0{,}01006>0{,}01$ và $62c^{78}\approx0{,}00898$, nên cần $78$ bước. Cận bước $1/L$ (T2b) cần $16$ bước; quay lui không cần biết $L$ nhưng hệ số co kém hơn.

2. Với bước $\tfrac17$, $x_k=\bigl(2(\tfrac47)^k,0\bigr)$ khi $k\ge1$. Do đó $d_2^2=4(\tfrac{16}{49})^2=\tfrac{1024}{2401}\approx0{,}427\le20(\tfrac47)^2\approx6{,}53$ và $d_3^2\approx0{,}139\le20(\tfrac47)^3\approx3{,}73$.

3. $[x_{k+1}]_2=(1-0{,}3\cdot7)[x_k]_2=-1{,}1[x_k]_2$, nên $\lvert[x_k]_2\rvert=4\cdot1{,}1^k$ tăng $1{,}1$ lần mỗi bước. Bước $0{,}3>1/L=\tfrac17$ vi phạm điều kiện bước của T1 và T1'. Bước còn vượt $2/L=\tfrac27$, nên hệ số giảm của bổ đề giảm, $\eta(1-\tfrac{L\eta}2)$, âm và bổ đề không còn bảo đảm giảm; dãy phân kỳ theo tọa độ thứ hai, còn tọa độ thứ nhất co với hệ số $\lvert1-0{,}9\rvert=0{,}1$.
:::

## Bài 3. Bước nhỏ hơn 1/L trong định lý dưới tuyến tính

Mức độ: tính toán hoặc chứng minh. LLO6, CLO1.

::: exercise Bài 3
Chạy GD trên Ví dụ C với bước hằng $\eta=\tfrac1{14}$.

1. Kiểm giả thiết của T1' và viết cận của T1'. Tính số bước mà cận này cần để bảo đảm $e_k\le0{,}01$.
2. Tính $x_k$ và $e_k$ dưới dạng đóng. Tìm $k$ nhỏ nhất để $e_k\le0{,}01$.
3. So sánh với bước $\tfrac17$ (cận $70/k$, thực tế $6$ bước). Giải thích hệ số $2$ giữa hai cận.
:::

::: hint Gợi ý Bài 3
Hai tọa độ của GD trên hàm bậc hai chéo co độc lập với hệ số $1-\eta h_i$. Ở câu 3, so sánh hằng số $\tfrac{D^2}{2\eta}$ với $\tfrac{LD^2}2$.
:::

::: solution Lời giải Bài 3
1. Ví dụ C thỏa H1, H2 ($L=7$), H4 ($x^*=0$). Bước $\tfrac1{14}\le\tfrac17$, nên T1' áp dụng: $e_k\le\tfrac{D^2}{2\eta k}=\tfrac{20\cdot14}{2k}=\tfrac{140}k$. Cận đạt $0{,}01$ khi $k\ge14000$.

2. Hệ số co là $1-\tfrac3{14}=\tfrac{11}{14}$ và $1-\tfrac7{14}=\tfrac12$, nên $x_k=\bigl(2(\tfrac{11}{14})^k,\ 4(\tfrac12)^k\bigr)$ và

$$
e_k=\tfrac12\Bigl(3\cdot4\bigl(\tfrac{121}{196}\bigr)^k+7\cdot16\bigl(\tfrac14\bigr)^k\Bigr)=6\Bigl(\frac{121}{196}\Bigr)^k+56\Bigl(\frac14\Bigr)^k.
$$

Ta có $e_{13}\approx0{,}01135$ và $e_{14}\approx0{,}00701$, nên $k=14$. Dãy $d_k^2=4(\tfrac{121}{196})^k+16(\tfrac14)^k$ giảm ($20$; $6{,}47$; $2{,}52$; …), khớp kết luận $d_{k+1}\le d_k$.

3. Với bước $\tfrac17$, cận $70/k$ cần $7000$ bước, thực tế cần $6$. Hằng số $\tfrac1{2\eta}$ trong bất đẳng thức một bước $e_{k+1}\le\tfrac1{2\eta}(d_k^2-d_{k+1}^2)$ đến từ BĐ4: chia hai vế của $d_k^2-d_{k+1}^2=2\eta\nabla f(x_k)^T(x_k-x^*)-\eta^2\lVert\nabla f(x_k)\rVert^2$ cho $2\eta$. Sau tổng lồng, hằng số của T1' là $\tfrac{D^2}{2\eta}=140$, lớn hơn $\tfrac{LD^2}2=70$ đúng $\tfrac1{L\eta}=2$ lần. Trên ví dụ này, bước nhỏ hơn làm thực tế chậm hơn ($14$ so với $6$ bước), vì hệ số co của tọa độ thứ nhất tăng từ $\tfrac47$ lên $\tfrac{11}{14}$.
:::

## Bài 4. Phương pháp dưới gradient trên ví dụ trị tuyệt đối

Mức độ: tính toán hoặc chứng minh. LLO6, LLO8, CLO1.

::: exercise Bài 4
Cho Ví dụ B, $f(x)=\tfrac13\bigl(\lvert x+1\rvert+\lvert x-1\rvert+\lvert x-3\rvert\bigr)$, với $x^*=1$, $f^*=\tfrac43$, $G=1$.

1. Từ $x_0=2{,}5$, bước $\eta=2$, $K=4$: tính $x_0,\dots,x_3$, lặp tốt nhất và $\bar x_4$; so với cận T3.
2. Với $\eta_k=\tfrac c{\sqrt{k+1}}$, dùng $\sum_{k<K}\tfrac1{k+1}\le1+\ln K$ để suy ra cận T3 dạng $O(\ln K/\sqrt K)$.
3. Chỉ ra $\tfrac c{k+1}$ thỏa điều kiện Robbins–Monro còn $\tfrac c{\sqrt{k+1}}$ thì không, dù cận ở câu 2 vẫn tiến về $0$.
4. Chỉ ra bước nào của chứng minh T3 dùng tính lồi khi đầu ra là $\bar x_K$.
:::

::: hint Gợi ý Bài 4
Trên $(1,3)$ hai số hạng đầu có độ dốc $+1$ và số hạng cuối có độ dốc $-1$. Ở câu 2, chặn từng số hạng $1/\sqrt{k+1}$ từ dưới bởi $1/\sqrt K$, và chặn $\sum_{k<K}\eta_k^2$ bằng bất đẳng thức đã cho (so tổng với tích phân $\int_1^K\tfrac{dt}t$).
:::

::: solution Lời giải Bài 4
1. Trên khoảng $(1,3)$, hai số hạng đầu có độ dốc $+1$, số hạng cuối có độ dốc $-1$, nên $f'=\tfrac13$ và mỗi bước trừ $\eta g=\tfrac23$. Ba bước cho $x_1=\tfrac{11}6$, $x_2=\tfrac76$, $x_3=\tfrac12$; bước thứ ba vượt qua điểm gãy $x=1$. Các sai số $f(x_k)-\tfrac43$ lần lượt là $\tfrac12$, $\tfrac5{18}$, $\tfrac1{18}$, $\tfrac16$, nên lặp tốt nhất là $x_2=\tfrac76$ (sai số $\tfrac1{18}$). Trung bình lặp $\bar x_4=\tfrac14(\tfrac52+\tfrac{11}6+\tfrac76+\tfrac12)=\tfrac32$ có sai số $\tfrac16$. Với $D=1{,}5$, $G=1$, cận T3 là $\tfrac{2{,}25+4\cdot4}{2\cdot4\cdot2}=\tfrac{73}{64}\approx1{,}14$; bước tối ưu là $D/(G\sqrt K)=0{,}75$. Ở lượt này lặp tốt nhất tốt hơn trung bình lặp; ở lượt bước $4{,}5$ từ $x_0=0$ trên cùng ví dụ thì ngược lại. T3 chặn cả hai.

Trường hợp riêng: khi $x_k=1$, dưới vi phân là cả đoạn $[-\tfrac13,\tfrac13]$, và bước tiếp theo cho $x_{k+1}=1-\eta g_k\in[1-\tfrac\eta3,1+\tfrac\eta3]$: dãy có thể rời nghiệm, tùy dưới gradient được chọn; chỉ khi chọn $g_k=0$ thì dãy đứng yên.

2. Với $k<K$, $\tfrac1{\sqrt{k+1}}\ge\tfrac1{\sqrt K}$, nên $\sum_{k<K}\eta_k\ge Kc/\sqrt K=c\sqrt K$. Và $\sum_{k<K}\eta_k^2=c^2\sum_{j=1}^K\tfrac1j\le c^2\bigl(1+\int_1^K\tfrac{dt}t\bigr)=c^2(1+\ln K)$. Thế vào T3:

$$
\frac{D^2+G^2c^2(1+\ln K)}{2c\sqrt K}=O\Bigl(\frac{\ln K}{\sqrt K}\Bigr)\to0.
$$

3. Với $\eta_k=\tfrac c{k+1}$: $\sum\tfrac c{k+1}=\infty$ (chuỗi điều hòa) và $\sum\tfrac{c^2}{(k+1)^2}=\tfrac{c^2\pi^2}6<\infty$. Với $\eta_k=\tfrac c{\sqrt{k+1}}$: $\sum\eta_k^2=c^2\sum\tfrac1{k+1}=\infty$, nên điều kiện thứ hai sai. Điều kiện Robbins–Monro là đủ, không cần, để cận T3 tiến về $0$.

4. Tính lồi dùng ở hai chỗ của chứng minh T3: chặn $g_k^T(x_k-x^*)\ge e_k$ (hệ quả của H1 dạng dưới gradient) và Jensen (BĐ5) cho $f(\bar x_K)$. Đầu ra lặp tốt nhất chỉ cần chỗ thứ nhất.
:::

## Bài 5. Hạ gradient ngẫu nhiên trên hai ví dụ

Mức độ: tính toán hoặc chứng minh. LLO11, LLO12, CLO2.

::: exercise Bài 5
Ví dụ A: $J(\theta)=\tfrac16\sum_i(\theta-y_i)^2$, $y=(-1,1,3)$, $\theta_0=0$, nhóm một mẫu, $\sigma^2=\tfrac83$. Ví dụ B: $f(x)=\tfrac13\sum_i\lvert x-y_i\rvert$, $x_0=0$, $D=1$.

1. Ví dụ A, bước $0{,}1$: tính $\mathbb E(\theta_1-1)^2$ và $\mathbb E(\theta_2-1)^2$ bằng cây lịch sử và bằng đệ quy; so với cận T5.
2. Ví dụ A, $\eta_k=\tfrac1{k+1}$ cho $\mathbb E(\theta_k-1)^2=\tfrac8{3k}$. Tìm $k$ nhỏ nhất để giá trị này nhỏ hơn giá trị giới hạn $\tfrac8{57}$ của bước hằng $0{,}1$.
3. Cùng lịch $\tfrac1{k+1}$, tìm $k$ nhỏ nhất để $\tfrac8{3k}$ nhỏ hơn $\mathbb E(\theta_k-1)^2$ của bước hằng $0{,}1$ tại cùng $k$.
4. Ví dụ B, $g_k=\operatorname{sign}(x_k-y_{I_k})$, $I_k$ đều trên $\{1,2,3\}$, quy ước $\operatorname{sign}(0)=0$: kiểm H6, H6a với $G=1$; viết cận T4 cho $K=100$ với bước hằng tối ưu.
:::

::: hint Gợi ý Bài 5
Ở câu 1, viết $\theta_{k+1}-1=0{,}9(\theta_k-1)+0{,}1(y_{I_k}-1)$. Ở câu 3, giải đệ quy $a_{k+1}=0{,}81a_k+\tfrac8{300}$ với $a_0=1$, rồi so từng $k$ quanh $15$–$17$. Ở câu 4, so $\tfrac13\sum_i\operatorname{sign}(x-y_i)$ với dưới vi phân của Ví dụ B.
:::

::: solution Lời giải Bài 5
1. Cây: $\theta_1\in\{-0{,}1;\,0{,}1;\,0{,}3\}$ cho $(\theta_1-1)^2=1{,}21;\,0{,}81;\,0{,}49$, trung bình $\approx0{,}837$. Chín lá $\theta_2$ cho $(\theta_2-1)^2$ bằng $1{,}4161$; $0{,}9801$; $0{,}6241$; $1{,}0201$; $0{,}6561$; $0{,}3721$; $0{,}6889$; $0{,}3969$; $0{,}1849$, trung bình $\approx0{,}704$. Đệ quy: $a_{k+1}=0{,}81a_k+\tfrac8{300}$ với $a_0=1$ cho $a_1=0{,}81+0{,}0267\approx0{,}837$ và $a_2\approx0{,}81\cdot0{,}8367+0{,}0267\approx0{,}704$. Cận T5 với $\mu=1$, $D=1$, sàn nhiễu $0{,}267$: $0{,}9+0{,}267=1{,}167$ và $0{,}81+0{,}267=1{,}077$.

2. Bất đẳng thức $\tfrac8{3k}<\tfrac8{57}$ tương đương $3k>57$, nên $k=20$; tại $k=19$ hai vế bằng nhau.

3. Quỹ đạo bước hằng có $a_k=0{,}81^k+\tfrac8{57}(1-0{,}81^k)$; so với $\tfrac8{3k}$: tại $k=15$, $0{,}178>0{,}177$; tại $k=16$, $0{,}167<0{,}170$. Vậy $k=16$.

4. $\mathbb E[g_k\mid\mathcal F_k]=\tfrac13\sum_i\operatorname{sign}(x_k-y_i)$. Tại điểm không phải quan sát, đây là đạo hàm của $f$; tại $x_k=y_j$, số hạng thứ $j$ bằng $0\in[-1,1]$, nên vẫn thuộc $\partial f(x_k)$. Vậy H6 đúng ở dạng dưới gradient. $g_k^2\le1$ nên H6a đúng với $G=1$. Với $x_0=0$, $D=1$, $K=100$: bước tối ưu $\eta=D/(G\sqrt K)=\tfrac1{10}$ và $\mathbb Ef(\bar x_{100})-f^*\le DG/\sqrt K=0{,}1$.
:::

## Bài 6. Chứng minh quy nạp cho bước giảm dần

Mức độ: tính toán hoặc chứng minh. LLO11, LLO12, CLO2.

::: exercise Bài 6
Giả sử $f$ thỏa H3, H4; $g_k$ thỏa H6 và $\mathbb E[\lVert g_k\rVert^2\mid\mathcal F_k]\le G^2$ tại mọi điểm lặp; bước $\eta_k=\tfrac1{\mu(k+1)}$. Đặt $a_k=\mathbb E\lVert x_k-x^*\rVert^2$.

1. Chứng minh $a_{k+1}\le(1-2\mu\eta_k)a_k+\eta_k^2G^2$ với mọi $k\ge0$.
2. Chứng minh bằng quy nạp $a_k\le\dfrac{G^2}{\mu^2k}$ với mọi $k\ge1$ (định lý T6).
3. Áp dụng cho Ví dụ A với nhóm một mẫu: chứng minh $\theta_k$ là trung bình của $k$ mẫu đầu, tính $a_k$ chính xác, xác định $G^2$ trên đoạn chứa dãy lặp và so với cận.
:::

::: hint Gợi ý Bài 6
Ở câu 1, bắt đầu từ BĐ4 như chứng minh T5 và chặn tích vô hướng bằng các bất đẳng thức của phần B. Ở câu 2, thế $\eta_k$ vào đệ quy và xét riêng bước đầu tiên.
:::

::: solution Lời giải Bài 6
1. BĐ4 với $g=g_k$, $\eta=\eta_k$, rồi lấy $\mathbb E[\cdot\mid\mathcal F_k]$: $x_k$, $\eta_k$ xác định bởi $\mathcal F_k$, H6 cho $\mathbb E[g_k\mid\mathcal F_k]=\nabla f(x_k)$, giả thiết mômen chặn số hạng cuối:

$$
\mathbb E[d_{k+1}^2\mid\mathcal F_k]\le d_k^2-2\eta_k\nabla f(x_k)^T(x_k-x^*)+\eta_k^2G^2.
$$

H3 tại $x_k$ với $y=x^*$ cho $\nabla f(x_k)^T(x_k-x^*)\ge e_k+\tfrac\mu2d_k^2$, và BĐ3 cho $e_k\ge\tfrac\mu2d_k^2$; cộng lại, tích vô hướng $\ge\mu d_k^2$. Lấy kỳ vọng toàn phần được kết luận. Bất đẳng thức đúng với mọi dấu của $1-2\mu\eta_k$.

2. Đặt $C=G^2/\mu^2$. Thế $\eta_k$: $a_{k+1}\le\tfrac{k-1}{k+1}a_k+\tfrac C{(k+1)^2}$.

Cơ sở: với $k=0$, $a_1\le-a_0+C\le C=C/1$, vì $a_0\ge0$.

Bước quy nạp: giả sử $a_k\le C/k$ với $k\ge1$. Hệ số $\tfrac{k-1}{k+1}\ge0$, nên

$$
a_{k+1}\le\frac{k-1}{k+1}\cdot\frac Ck+\frac C{(k+1)^2}=\frac C{k+1}\Bigl(1-\frac1k+\frac1{k+1}\Bigr)\le\frac C{k+1}.
$$

Nếu hệ số âm, phép thay $a_k$ bởi cận trên sẽ đổi chiều bất đẳng thức; điều này chỉ xảy ra ở $k=0$, và bước cơ sở xử lý riêng.

3. Với $\mu=1$, $\eta_k=\tfrac1{k+1}$: $\theta_{k+1}=\theta_k-\tfrac{\theta_k-y_{I_k}}{k+1}=\tfrac{k\theta_k+y_{I_k}}{k+1}$. Với $k=0$, $\theta_1=y_{I_0}$; nếu $\theta_k=\tfrac1k\sum_{j<k}y_{I_j}$ thì $\theta_{k+1}=\tfrac1{k+1}\sum_{j\le k}y_{I_j}$. Các $y_{I_j}$ độc lập, kỳ vọng $1$, phương sai $\tfrac83$, nên $a_k=\operatorname{Var}(\theta_k)=\tfrac8{3k}$. Vì $\theta_k$ là trung bình các giá trị trong $\{-1,1,3\}$, $\theta_k\in[-1,3]$, và trên đoạn này $\mathbb E[g^2\mid\theta]=(\theta-1)^2+\tfrac83\le\tfrac{20}3$. Cận T6 là $\tfrac{20}{3k}$, gấp $2{,}5$ lần giá trị chính xác; cả hai giảm như $1/k$.
:::

## Bài 7. Bảo đảm điểm dừng trên ví dụ bậc bốn

Mức độ: chứng minh (câu 1), nhận biết và chứng minh (câu 2), vận dụng (câu 3). LLO11, CLO1.

::: exercise Bài 7
1. Cho $f$ thỏa H0, H2 và hạ gradient bước hằng $0<\eta\le1/L$. Chứng minh $\min_{k<K}\lVert\nabla f(x_k)\rVert^2\le\dfrac{2\Delta_0}{\eta K}$, với $\Delta_0=f(x_0)-f_{\inf}$.

Hai câu sau dùng Ví dụ D: $F(\theta)=\tfrac14(\theta^2-1)^2$, $F_{\inf}=0$ đạt tại $\pm1$.

2. Xác định các điểm dừng của $F$. Chứng minh $\tfrac12F'(\theta)^2=2\theta^2F(\theta)$; suy ra bất đẳng thức PL với $\mu=2c^2$ trên tập $\{\lvert\theta\rvert\ge c\}$, $c>0$, và chứng minh nó không đúng trên $\mathbb R$.
3. Giả sử $F$ thỏa H2 toàn cục với $L=11$; $\Delta_0=\tfrac94$, $K=100$, SGD có $\sigma^2=1$. Tính bước $\eta=\min\bigl\{\tfrac1L,\sqrt{2\Delta_0/(L\sigma^2K)}\bigr\}$ của hệ quả T8, cận T8 tại bước đó và cận gộp của hệ quả.
:::

::: hint Gợi ý Bài 7
Ở câu 1, cộng bất đẳng thức một bước $\Delta_{k+1}\le\Delta_k-\tfrac\eta2\lVert\nabla f(x_k)\rVert^2$ với $k<K$, rồi dùng $\Delta_K\ge0$ và chặn tổng bằng $K$ lần số hạng nhỏ nhất. Ở câu 2, $F'(\theta)=\theta(\theta^2-1)$ và $F(\theta)=\tfrac14(\theta^2-1)^2$.
:::

::: solution Lời giải Bài 7
1. Bổ đề giảm với $\eta\le1/L$ cho $\Delta_{k+1}\le\Delta_k-\tfrac\eta2\lVert\nabla f(x_k)\rVert^2$. Cộng với $k<K$; H0 cho $\Delta_K\ge0$: $\tfrac\eta2\sum_{k<K}\lVert\nabla f(x_k)\rVert^2\le\Delta_0-\Delta_K\le\Delta_0$. Vế trái không nhỏ hơn $\tfrac{\eta K}2\min_{k<K}\lVert\nabla f(x_k)\rVert^2$.

2. $F'(\theta)=\theta(\theta^2-1)$ nên điểm dừng là $-1,0,1$; $\pm1$ là cực tiểu, $0$ là cực đại địa phương. $F'(\theta)^2=\theta^2(\theta^2-1)^2=4\theta^2F(\theta)$, nên $\tfrac12F'(\theta)^2=2\theta^2F(\theta)$. Với $F_{\inf}=0$ và $\lvert\theta\rvert\ge c$: $\tfrac12F'(\theta)^2\ge2c^2\bigl(F(\theta)-F_{\inf}\bigr)$, tức PL với $\mu=2c^2$ trên tập đó. Tại $\theta=0$: $\tfrac12F'(0)^2=0<\mu F(0)=\tfrac\mu4$ với mọi $\mu>0$, nên PL không đúng trên $\mathbb R$. Điểm dừng $\theta=0$ không là cực tiểu, và PL loại trừ đúng loại điểm này.

3. $\eta=\min\bigl\{\tfrac1{11},\sqrt{2\cdot\tfrac94/(11\cdot1\cdot100)}\bigr\}=\sqrt{4{,}5/1100}\approx0{,}0640<\tfrac1{11}\approx0{,}0909$, nên nhánh căn được chọn. Cận T8 tại bước này: hai số hạng $\tfrac{2\Delta_0}{\eta K}$ và $L\eta\sigma^2$ cùng bằng $\approx0{,}704$, tổng $2\sqrt{2L\Delta_0\sigma^2/K}=2\sqrt{0{,}495}\approx1{,}41$. Cận gộp của hệ quả, $\tfrac{2L\Delta_0}K+\tfrac{2\sqrt{2L\Delta_0\sigma^2}}{\sqrt K}=0{,}495+1{,}407\approx1{,}90$, lớn hơn vì nó cộng thêm $\tfrac{2L\Delta_0}K$ để bao cả trường hợp bước bị cắt tại $\tfrac1L$. Câu này giả sử H2 toàn cục; với $F$, $L=11$ chỉ đúng trên $[-2,2]$, còn T8 cần H2 trên toàn miền vì dãy SGD có thể rời đoạn này.
:::

## Bài 8. Hồi quy logistic có chính quy

Mức độ: vận dụng vào AI. LLO6, LLO8, CLO1, CLO2.

::: exercise Bài 8
Cho dữ liệu $u_1=(1,0)$, $u_2=(0,2)$, $u_3=(1,1)$ trong $\mathbb R^2$, nhãn $y=(1,-1,1)$, $N=3$, $\lambda=0{,}1$, và

$$
f(x)=\frac1N\sum_{i=1}^N\phi(y_iu_i^Tx)+\frac\lambda2\lVert x\rVert^2,\qquad\phi(s)=\log(1+e^{-s}).
$$

1. Chứng minh $\nabla^2f(x)=\tfrac1N\sum_i\phi''(y_iu_i^Tx)\,u_iu_i^T+\lambda I$. Suy ra $f$ thỏa H3 với $\mu=\lambda$, H2 với $L=\lambda+\tfrac1{4N}\lambda_{\max}\bigl(\sum_iu_iu_i^T\bigr)$, và $L\le\lambda+\tfrac14\max_i\lVert u_i\rVert^2$. Chứng minh $f$ đạt cực tiểu (H4).
2. Tính $\mu$, cận thô $\lambda+\tfrac14\max_i\lVert u_i\rVert^2$ và giá trị $L$ theo trị riêng.
3. Chọn định lý cho GD và nêu đại lượng được chặn. Với bước $1/L'$ theo cận thô $L'$, tính số bước mà định lý bảo đảm $e_k\le10^{-4}e_0$; làm lại với $L$ theo trị riêng.
4. Chứng minh rằng khi $\lambda=0$, $f$ không đạt cực tiểu trên dữ liệu này, và nêu định lý nào không còn áp dụng.
5. Với SGD một mẫu, $\ell_i(x)=\phi(y_iu_i^Tx)+\tfrac\lambda2\lVert x\rVert^2$, chứng minh H6b đúng với $\sigma^2=\tfrac1N\sum_i\lVert u_i\rVert^2$ và tính sàn nhiễu của T5 với $\eta=0{,}1$.
:::

::: hint Gợi ý Bài 8
Vì $y_i^2=1$, Hessian của $x\mapsto\phi(y_iu_i^Tx)$ là $\phi''(y_iu_i^Tx)\,u_iu_i^T$, và $0<\phi''\le\tfrac14$. Từ $\mu I\preceq\nabla^2f\preceq LI$, dùng khai triển Taylor dạng tích phân để suy ra H3 và H2. Ở câu 4, tìm một hướng $\hat x$ với $y_iu_i^T\hat x>0$ với mọi $i$.
:::

::: solution Lời giải Bài 8
1. $\nabla_x\phi(y_iu_i^Tx)=\phi'(y_iu_i^Tx)y_iu_i$ và $\nabla^2_x\phi(y_iu_i^Tx)=\phi''(y_iu_i^Tx)y_i^2u_iu_i^T=\phi''(y_iu_i^Tx)u_iu_i^T$; cộng Hessian $\lambda I$ của số hạng chính quy. Vì $0<\phi''\le\tfrac14$ và $u_iu_i^T\succeq0$:

$$
\lambda I\preceq\nabla^2f(x)\preceq\lambda I+\frac1{4N}\sum_iu_iu_i^T\preceq\Bigl(\lambda+\frac1{4N}\lambda_{\max}\bigl(\textstyle\sum_iu_iu_i^T\bigr)\Bigr)I.
$$

Với $h=y-x$, khai triển $f(y)=f(x)+\nabla f(x)^Th+\int_0^1(1-t)h^T\nabla^2f(x+th)h\,dt$ và cận dưới $\lambda\lVert h\rVert^2$ cho H3 với $\mu=\lambda$. $\nabla f(y)-\nabla f(x)=\int_0^1\nabla^2f(x+th)h\,dt$ và cận trên của chuẩn Hessian cho H2. Cuối cùng $\lambda_{\max}(\sum_iu_iu_i^T)\le\operatorname{tr}\sum_iu_iu_i^T=\sum_i\lVert u_i\rVert^2\le N\max_i\lVert u_i\rVert^2$. Theo H3 tại $0$ với $y=x$, $f(x)\ge f(0)+\nabla f(0)^Tx+\tfrac\lambda2\lVert x\rVert^2\to\infty$ khi $\lVert x\rVert\to\infty$; $f$ liên tục nên đạt cực tiểu trên một hình cầu đủ lớn chứa tập mức $\{f\le f(0)\}$, và điểm này là cực tiểu toàn cục.

2. $\mu=0{,}1$. $\max_i\lVert u_i\rVert^2=\lVert u_2\rVert^2=4$, cận thô $L'=0{,}1+1=1{,}1$. $\sum_iu_iu_i^T=\begin{pmatrix}2&1\\1&5\end{pmatrix}$ có $\lambda_{\max}=\tfrac{7+\sqrt{13}}2\approx5{,}303$, nên $L=0{,}1+\tfrac{5{,}303}{12}\approx0{,}542$.

3. $f$ thỏa H2, H3, H4, nên T2a, T2b áp dụng với bước $1/L'$ cho mọi $L'\ge L$, vì H2 vẫn đúng với $L'$. Chúng chặn $d_k^2$ và $e_k$, với tốc độ tuyến tính. Với $L'=1{,}1$: $\kappa'=11$, cần $(1-\tfrac1{11})^k\le10^{-4}$, tức $k\ge\ln10^4/\ln\tfrac{11}{10}\approx96{,}6$, nên $97$ bước; dạng đủ $k\ge\kappa'\ln10^4\approx101{,}3$ cho $102$. Với $L\approx0{,}542$: $\kappa\approx5{,}42$ và $k\ge\ln10^4/\bigl(-\ln(1-\tfrac1\kappa)\bigr)\approx45{,}1$, nên $46$ bước. Một lần chạy số với bước $1/1{,}1$ từ $x_0=0$ cho $e_k\le10^{-4}e_0$ sau $23$ bước, với $x^*\approx(1{,}533;\,-0{,}601)$, $f^*\approx0{,}399$, $e_0=\log2-f^*\approx0{,}294$: cận đúng nhưng bi quan.

4. Với $\hat x=(2,-1)$: $y_iu_i^T\hat x=2,\ 2,\ 1>0$. Khi $\lambda=0$, $f(t\hat x)=\tfrac13\sum_i\log(1+e^{-ty_iu_i^T\hat x})\to0$ khi $t\to\infty$, trong khi $f>0$ tại mọi điểm. Vậy $\inf f=0$ không đạt, H4 sai, và cũng không có H3. T1, T2a, T2b không áp dụng; như hàm logistic một chiều ở phần B, GD có thể cho $e_k\to0$ trong khi $\lVert x_k\rVert\to\infty$.

5. $\nabla\ell_i(x)=v_i(x)+\lambda x$ với $v_i(x)=\phi'(y_iu_i^Tx)y_iu_i$ và $\lvert\phi'\rvert<1$. Gradient một mẫu $g=\nabla\ell_I$ có $\mathbb E[g]=\nabla f(x)$ (H6), và $g-\nabla f(x)=v_I-\bar v$, với $\bar v$ là trung bình của các $v_i$. Phương sai không vượt mômen bậc hai: $\mathbb E\lVert v_I-\bar v\rVert^2\le\mathbb E\lVert v_I\rVert^2\le\tfrac1N\sum_i\lVert u_i\rVert^2=\tfrac73$. Sàn nhiễu của T5 với $\eta=0{,}1\le1/L$ là $\tfrac{\eta\sigma^2}\mu=\tfrac{0{,}1\cdot7/3}{0{,}1}\approx2{,}33$, đơn vị là bình phương khoảng cách tới $x^*$. Cận này lớn so với $\lVert x^*\rVert^2\approx2{,}71$, nên muốn một bảo đảm có ý nghĩa cần bước nhỏ hơn, lịch theo pha hoặc nhóm lớn hơn.
:::

## Bài 9. Bảo đảm theo xác suất và phạm vi của định lý

Mức độ: vận dụng vào AI. LLO12, CLO2.

::: exercise Bài 9
1. Giả sử $\mathbb E(\theta_k-1)^2\le0{,}2$. Chặn xác suất để một lần chạy có $(\theta_k-1)^2\ge1$.
2. Với Ví dụ A, bước $0{,}1$, $k=2$: tính chính xác $P\bigl((\theta_2-1)^2\ge1\bigr)$ từ cây lịch sử và so với cận Markov.
3. Với SGD trên Ví dụ B ở Bài 5, câu 3 ($K=100$, $\eta=0{,}1$): chặn $P\bigl(f(\bar x_{100})-f^*\ge0{,}5\bigr)$.
4. Một mạng nơ ron được huấn luyện bằng SGD bước hằng. Nêu định lý của bài có thể áp dụng, các giả thiết cần kiểm, và những điều định lý không khẳng định.
:::

::: hint Gợi ý Bài 9
Markov áp dụng cho biến không âm $Z$ bất kỳ có kỳ vọng hữu hạn. Ở câu 4, mục tiêu của mạng nhiều lớp không lồi; xét các định lý của phần F.
:::

::: solution Lời giải Bài 9
1. BĐ6 với $Z=(\theta_k-1)^2$, $\varepsilon=1$: $P(Z\ge1)\le0{,}2$.

2. Trong chín lá, các giá trị $(\theta_2-1)^2\ge1$ là $1{,}4161$ ($\theta_2=-0{,}19$) và $1{,}0201$ ($\theta_2=-0{,}01$); mỗi lá có xác suất $\tfrac19$, nên xác suất bằng $\tfrac29\approx0{,}222$. Markov cho $P\le a_2/1\approx0{,}704$. Cận đúng nhưng lỏng hơn ba lần, vì Markov chỉ dùng kỳ vọng.

3. T4 cho $\mathbb E\bigl(f(\bar x_{100})-f^*\bigr)\le0{,}1$; Markov cho $P\bigl(f(\bar x_{100})-f^*\ge0{,}5\bigr)\le\tfrac{0{,}1}{0{,}5}=0{,}2$.

4. Mục tiêu không lồi, nên T4, T5, T6 không áp dụng. T8 áp dụng nếu H0 (khả vi, bị chặn dưới), H2 (gradient Lipschitz trên toàn miền), H6 (gradient nhóm không chệch, lấy mẫu có hoàn lại) và H6b (phương sai bị chặn) đúng; các giả thiết này cần kiểm trước, và H2, H6b toàn cục thường khó kiểm cho mạng sâu. Kể cả khi đúng, T8 chỉ chặn trung bình của $\mathbb E\lVert\nabla f(x_k)\rVert^2$ trên $K$ bước đầu: nó không chặn điểm cuối, không nói dãy tới cực tiểu nào và không loại điểm yên ngựa hay cực đại địa phương. T9 cho tốc độ tuyến tính tới sàn nhiễu chỉ khi có thêm H7, điều kiện hiếm khi kiểm được toàn cục.
:::

## Bài 10. Bước tối ưu cho hàm bậc hai

Mức độ: tính toán hoặc chứng minh. LLO6, LLO8, CLO1.

::: exercise Bài 10
Cho $f(x)=\tfrac12x^THx$ với $H$ đối xứng và $\mu I\preceq H\preceq LI$, $0<\mu<L$. GD bước hằng: $x_{k+1}=x_k-\eta Hx_k$.

1. Chứng minh $\lVert x_{k+1}\rVert\le\rho(\eta)\lVert x_k\rVert$ với $\rho(\eta)=\max\{\lvert1-\eta\mu\rvert,\lvert1-\eta L\rvert\}$.
2. Tìm $\eta$ cực tiểu $\rho(\eta)$ và giá trị nhỏ nhất. Biểu diễn theo $\kappa=L/\mu$ và so với hệ số co $\sqrt{1-1/\kappa}$ của $d_k$ suy từ T2a.
3. Với Ví dụ C, tính $\rho$ cho bước tối ưu và cho bước $\tfrac17$; tìm $k$ nhỏ nhất để $d_k^2\le0{,}01$ trong mỗi trường hợp, và so với số bước mà cận T2a bảo đảm.
:::

::: hint Gợi ý Bài 10
Ở câu 1, dùng phân tích phổ của $H$ để đưa phép lặp về các tọa độ độc lập. Ở câu 2, vẽ hai hàm $\eta\mapsto\lvert1-\eta\mu\rvert$ và $\eta\mapsto\lvert1-\eta L\rvert$ trên cùng một hình.
:::

::: solution Lời giải Bài 10
1. $x_{k+1}=(I-\eta H)x_k$. Ma trận đối xứng $I-\eta H$ có trị riêng $1-\eta h_i$, $h_i\in[\mu,L]$, nên $\lVert I-\eta H\rVert=\max_i\lvert1-\eta h_i\rvert\le\max_{h\in[\mu,L]}\lvert1-\eta h\rvert$. Hàm $h\mapsto\lvert1-\eta h\rvert$ lồi, nên cực đại trên đoạn đạt ở đầu mút: $\rho(\eta)=\max\{\lvert1-\eta\mu\rvert,\lvert1-\eta L\rvert\}$.

2. $\lvert1-\eta\mu\rvert$ giảm còn $\lvert1-\eta L\rvert$ tăng trên khoảng liên quan; cực tiểu khi $1-\eta\mu=\eta L-1$, tức $\eta=\tfrac2{L+\mu}$, với

$$
\rho^*=\frac{L-\mu}{L+\mu}=\frac{\kappa-1}{\kappa+1}.
$$

T2a cho $d_k^2\le(1-\tfrac1\kappa)^kD^2$, tức $d_k$ co theo $\sqrt{1-1/\kappa}$. Với $\kappa>1$, $\tfrac{\kappa-1}{\kappa+1}<1-\tfrac1\kappa\le\sqrt{1-\tfrac1\kappa}$, vì $(\kappa-1)\kappa<(\kappa+1)(\kappa-1)$. Kết quả $\tfrac{\kappa-1}{\kappa+1}$ đúng cho mọi hàm thỏa H2, H3 với bước $\tfrac2{L+\mu}$; chứng minh tổng quát không trình bày trong bài.

3. Ví dụ C: $\mu=3$, $L=7$, bước tối ưu $\eta=0{,}2$ cho $\rho^*=\tfrac4{10}=0{,}4$; cả hai tọa độ co đúng hệ số $0{,}4$ ($1-0{,}6$ và $1-1{,}4$), nên $d_k^2=20\cdot0{,}16^k$. Khi đó $d_4^2\approx0{,}0131$, $d_5^2\approx0{,}0021$, nên $k=5$. Bước $\tfrac17$ cho $\rho=\max\{\tfrac47,0\}=\tfrac47$ và $d_k^2=4(\tfrac{16}{49})^k$ với $k\ge1$; $d_5^2\approx0{,}0148$, $d_6^2\approx0{,}0048$, nên $k=6$. Cận T2a, $20(\tfrac47)^k\le0{,}01$, cần $k\ge\ln2000/\ln\tfrac74\approx13{,}6$, tức $14$ bước.
:::

## Nguồn

- Bài 1, 2, 4, 5, 7 và các câu 1, 4 của Bài 9 lấy từ câu hỏi trên trang chiếu Bài 05b; lời giải mở rộng phần ghi chú diễn giả.
- Bài 3, 6, 10 và các câu 2, 3 của Bài 9 tự xây dựng; số liệu tính trực tiếp từ công thức trong lời giải.
- Bài 8 mở rộng câu hỏi thứ nhất của trang cuối (câu hỏi tự kiểm); số bước thực tế trong lời giải lấy từ một lần chạy GD trên dữ liệu của bài.
- Boyd và Vandenberghe (2004), *Convex Optimization*, §9.1.2, §9.3 (cận Hessian, hội tụ của GD, quay lui).
- Sra, Nowozin và Wright (biên tập, 2011), *Optimization for Machine Learning*, ch. 5, §5.2, §5.5 (phương pháp dưới gradient và xấp xỉ ngẫu nhiên).
