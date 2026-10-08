# Bài tập Bài 05c — Xác suất cơ bản, bất đẳng thức tập trung và mất mát trung bình trên nhóm nhỏ

Bộ bài tập gồm mười bài ở ba mức: nhận biết (Bài 1–3), tính toán hoặc chứng minh (Bài 4–8) và vận dụng vào AI (Bài 9–10). Ký hiệu, giả thiết G1–G4 và nhãn kết quả (Định nghĩa B.1, Mệnh đề E.10, Định lý F.8…) theo ghi chú bài giảng. Ví dụ ba quan sát: $y=(-1,1,3)$, $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, gradient mẫu $g_i(\theta)=\theta-y_i$.

Lời giải cần nêu kết quả được dùng ở từng bước. Số thập phân viết với dấu phẩy. Viết tắt: chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), phương pháp hạ gradient ngẫu nhiên (SGD).

## Bài 1. Biến cố trên hai xúc xắc

Mức độ: nhận biết.

::: exercise Bài 1
Tung hai xúc xắc cân đối phân biệt.

1. Liệt kê biến cố $A$ "tổng bằng 8" và biến cố $C$ "có ít nhất một mặt 6"; tính $P(A)$, $P(C)$ và $P(A\cap C)$.
2. Tính $P(C)$ theo hai cách: bằng Mệnh đề B.2 (iv) với $C=C_1\cup C_2$, trong đó $C_j$ là "xúc xắc $j$ ra 6", và bằng phần bù.
3. So $P(C)$ với cận của Mệnh đề B.4 cho $C_1\cup C_2$. Phần chênh lệch bằng xác suất nào?
4. Tính $P(A\mid C)$. Hai biến cố $A$ và $C$ có độc lập không?
:::

::: hint Gợi ý Bài 1
Không gian mẫu có 36 kết cục đồng khả năng (Định nghĩa B.1). Phần bù của $C$ là "không xúc xắc nào ra 6".
:::

::: solution Lời giải Bài 1
1. $A=\{(2,6),(3,5),(4,4),(5,3),(6,2)\}$, $P(A)=\tfrac5{36}$. $C$ gồm 11 cặp có ít nhất một tọa độ bằng 6, $P(C)=\tfrac{11}{36}$. $A\cap C=\{(2,6),(6,2)\}$, $P(A\cap C)=\tfrac2{36}$.
2. Mệnh đề B.2 (iv): $P(C_1\cup C_2)=\tfrac6{36}+\tfrac6{36}-\tfrac1{36}=\tfrac{11}{36}$. Phần bù (Mệnh đề B.2 (ii) và Mệnh đề B.3 (i)): $1-\tfrac{5\cdot5}{36}=\tfrac{11}{36}$.
3. Mệnh đề B.4 cho $P(C)\le\tfrac{12}{36}$. Chênh lệch $\tfrac1{36}$ đúng bằng $P(C_1\cap C_2)$, kết cục $(6,6)$ bị đếm hai lần trong tổng.
4. Định nghĩa C.1: $P(A\mid C)=\tfrac{2/36}{11/36}=\tfrac2{11}\approx0{,}182$, khác $P(A)=\tfrac5{36}\approx0{,}139$. Theo Định nghĩa C.5, $A$ và $C$ không độc lập: $P(A\cap C)=\tfrac2{36}$ trong khi $P(A)P(C)=\tfrac{55}{1296}\approx0{,}042$. Biết có một mặt 6 làm tăng khả năng tổng bằng 8, vì hai trong năm kết cục của $A$ chứa mặt 6.
:::

## Bài 2. Xét nghiệm với tỉ lệ mắc 2 %

Mức độ: nhận biết.

::: exercise Bài 2
Gọi $D$ là biến cố người được xét nghiệm mắc bệnh. Một bệnh có tỉ lệ mắc $P(D)=0{,}02$. Xét nghiệm có độ nhạy $P(+\mid D)=0{,}9$ và độ đặc hiệu $P(-\mid D^c)=0{,}95$.

1. Tính $P(+)$ và $P(D\mid+)$.
2. Một người xét nghiệm hai lần, cả hai lần dương tính. Giả thiết hai kết quả độc lập có điều kiện theo $D$ và theo $D^c$. Tính $P(D\mid+_1\cap+_2)$.
3. Hai kết quả có độc lập (không điều kiện) không?
:::

::: hint Gợi ý Bài 2
Phân hoạch theo trạng thái bệnh và dùng Mệnh đề C.3, Định lý C.4. Ở câu 2, Định nghĩa C.7 cho $P(+_1\cap+_2\mid D)=0{,}9^2$.
:::

::: solution Lời giải Bài 2
1. Mệnh đề C.3: $P(+)=0{,}02\cdot0{,}9+0{,}98\cdot0{,}05=0{,}018+0{,}049=0{,}067$. Định lý C.4: $P(D\mid+)=\tfrac{0{,}018}{0{,}067}=\tfrac{18}{67}\approx0{,}269$.
2. Định nghĩa C.7 cho $P(+_1\cap+_2\mid D)=0{,}81$ và $P(+_1\cap+_2\mid D^c)=0{,}0025$. Định lý C.4:

$$
P(D\mid+_1\cap+_2)=\frac{0{,}02\cdot0{,}81}{0{,}02\cdot0{,}81+0{,}98\cdot0{,}0025}=\frac{0{,}0162}{0{,}01865}=\frac{324}{373}\approx0{,}869.
$$

3. Mệnh đề C.3: $P(+_1\cap+_2)=0{,}01865$, trong khi $P(+_1)P(+_2)=0{,}067^2\approx0{,}00449$. Hai kết quả không độc lập: chúng cùng phụ thuộc trạng thái bệnh.
:::

## Bài 3. Độc lập từng đôi và độc lập

Mức độ: nhận biết.

::: exercise Bài 3
1. Tung hai xúc xắc cân đối. Gọi $A$ là "xúc xắc 1 chẵn", $B$ là "xúc xắc 2 chẵn", $C$ là "tổng chẵn". Kiểm ba cặp biến cố độc lập. Ba biến cố có độc lập theo Định nghĩa C.5 không?
2. Rút hai lần từ $\{1,2,3,4\}$ không hoàn lại, mọi cặp có thứ tự gồm hai số khác nhau đồng khả năng; $X_1,X_2$ là hai số rút được. Hai biến cố "$X_1$ chẵn" và "$X_2$ chẵn" có độc lập không? Hai biến $X_1,X_2$ có độc lập theo Định nghĩa D.6 không?
:::

::: hint Gợi ý Bài 3
Ở câu 1, tổng chẵn khi hai xúc xắc cùng tính chẵn lẻ. Ở câu 2, có 12 cặp có thứ tự.
:::

::: solution Lời giải Bài 3
1. $P(A)=P(B)=P(C)=\tfrac12$. $A\cap B$: hai xúc xắc chẵn, xác suất $\tfrac14$. $A\cap C$: xúc xắc 1 chẵn và tổng chẵn, tức cả hai chẵn, xác suất $\tfrac14$; tương tự $P(B\cap C)=\tfrac14$. Ba cặp độc lập. Nhưng $A\cap B\cap C=A\cap B$ có xác suất $\tfrac14\ne\tfrac18$, nên ba biến cố không độc lập (Nhận xét C.6 cho một ví dụ cùng loại).
2. $P(X_1\text{ chẵn})=P(X_2\text{ chẵn})=\tfrac12$, còn $P(X_1\text{ chẵn},X_2\text{ chẵn})=\tfrac{2\cdot1}{12}=\tfrac16\ne\tfrac14$: không độc lập. Hai biến cũng không độc lập, vì chẳng hạn $p_{X_1,X_2}(1,1)=0\ne\tfrac14\cdot\tfrac14$. Với rút có hoàn lại, mọi ô của PMF đồng thời bằng $\tfrac1{16}$ và hai biến độc lập.
:::

## Bài 4. Phân phối, kỳ vọng và kỳ vọng toàn phần

Mức độ: tính toán hoặc chứng minh.

::: exercise Bài 4
1. Tung bốn đồng xu cân đối; $S$ là số mặt ngửa. Lập PMF và CDF của $S$, rồi tính $\mathbb ES$ theo Định nghĩa E.1 và theo Định lý E.3.
2. Trò chơi St. Petersburg có trần: tung đồng xu tới lần đầu ra ngửa, ở lần thứ $K$; người chơi nhận $\min(2^K,2^{10})$. Tính kỳ vọng khoản nhận.
3. $K$ có phân phối hình học$(p)$, $0<p\le1$. Chứng minh $\mathbb EK=1/p$ bằng Mệnh đề E.12, phân hoạch theo kết quả lần thử đầu.
4. Monty Hall với bốn cửa: người chơi chọn cửa 1; người dẫn biết vị trí xe, mở một cửa có dê trong ba cửa còn lại (chọn đều khi có nhiều cửa dê); người chơi đổi sang một trong hai cửa còn đóng, chọn đều. Tính xác suất thắng khi đổi bằng kỳ vọng toàn phần, và so với khi giữ.
:::

::: hint Gợi ý Bài 4
Câu 1: $P(S=k)=\binom4k/16$ (Mệnh đề D.4). Câu 3: biết lần thử đầu thất bại, số lần thử còn lại có cùng phân phối với $K$ (tính không nhớ, ghi chú phần D). Câu 4: phân hoạch theo việc cửa 1 có xe hay không.
:::

::: solution Lời giải Bài 4
1. PMF: $P(S=0),\dots,P(S=4)$ bằng $\tfrac1{16},\tfrac4{16},\tfrac6{16},\tfrac4{16},\tfrac1{16}$. CDF tại $0,1,2,3,4$: $\tfrac1{16},\tfrac5{16},\tfrac{11}{16},\tfrac{15}{16},1$; hằng trên mỗi khoảng giữa các số nguyên, bằng 0 khi $x<0$. Định nghĩa E.1: $\mathbb ES=\tfrac{0+4+12+12+4}{16}=2$. Định lý E.3: $S$ là tổng bốn biến Bernoulli$(\tfrac12)$, nên $\mathbb ES=4\cdot\tfrac12=2$.
2. Mệnh đề E.2 với $P(K=k)=2^{-k}$: $\sum_{k=1}^{10}2^k2^{-k}+2^{10}P(K>10)=10+2^{10}\cdot2^{-10}=11$.
3. Gọi $Y$ là chỉ thị lần thử đầu thành công. $\mathbb E[K\mid Y=1]=1$; khi $Y=0$, $K=1+K'$ với $K'$ cùng phân phối với $K$, nên $\mathbb E[K\mid Y=0]=1+\mathbb EK$. Mệnh đề E.12 (1): $\mathbb EK=p\cdot1+(1-p)(1+\mathbb EK)$, suy ra $\mathbb EK=1/p$. Chuỗi $\sum_kk(1-p)^{k-1}p$ hội tụ nên $\mathbb EK$ hữu hạn, phép giải hợp lệ.
4. Gọi $W$ là chỉ thị thắng khi đổi. Nếu xe ở cửa 1 (xác suất $\tfrac14$), $\mathbb E[W\mid\cdot]=0$. Nếu không (xác suất $\tfrac34$), xe nằm trong ba cửa còn lại, người dẫn mở một cửa dê, xe ở một trong hai cửa còn đóng, nên $\mathbb E[W\mid\cdot]=\tfrac12$. Mệnh đề E.12 (1): $\mathbb EW=\tfrac34\cdot\tfrac12=\tfrac38$, lớn hơn xác suất $\tfrac14$ khi giữ cửa 1.
:::

## Bài 5. Hàm chỉ thị và chỉ số trong nhóm nhỏ

Mức độ: tính toán hoặc chứng minh.

::: exercise Bài 5
Rút có hoàn lại từ $N$ mẫu.

1. Một nhóm có $b$ chỉ số. Tính kỳ vọng số chỉ số khác nhau $D_b$; áp dụng cho $N=200$, $b=50$.
2. Sau $2N$ lần rút, tính kỳ vọng tỉ lệ mẫu chưa gặp; áp dụng cho $N=1000$ và tìm giới hạn khi $N\to\infty$.
3. Gọi $T$ là số lần rút cần để gặp đủ $N$ mẫu. Chứng minh $\mathbb ET=N\sum_{k=1}^N\tfrac1k$ và tính cho $N=1000$.
:::

::: hint Gợi ý Bài 5
Viết đại lượng cần tính thành tổng các hàm chỉ thị (Mệnh đề E.4) hoặc tổng các biến hình học, rồi dùng Định lý E.3. Câu 3: khi đã gặp $j-1$ mẫu, mỗi lần rút gặp mẫu mới với xác suất $(N-j+1)/N$; dùng Bài 4 câu 3.
:::

::: solution Lời giải Bài 5
1. Gọi $A_j$ là biến cố mẫu $j$ xuất hiện; $D_b=\sum_{j=1}^N\mathbf 1_{A_j}$. Các lần rút độc lập nên $P(A_j^c)=(1-\tfrac1N)^b$. Định lý E.3 và Mệnh đề E.4: $\mathbb ED_b=N\bigl(1-(1-\tfrac1N)^b\bigr)$. Với $N=200$, $b=50$: $200(1-0{,}995^{50})\approx44{,}34$.
2. Mẫu $j$ chưa gặp với xác suất $(1-\tfrac1N)^{2N}$; tỉ lệ kỳ vọng bằng chính số này: $0{,}999^{2000}\approx0{,}1352$ khi $N=1000$, và tiến tới $e^{-2}\approx0{,}1353$.
3. $T=\sum_{j=1}^NT_j$, với $T_j$ là số lần rút từ khi đã gặp $j-1$ mẫu tới khi gặp mẫu thứ $j$. $T_j$ có phân phối hình học với $p_j=\tfrac{N-j+1}N$, nên $\mathbb ET_j=\tfrac N{N-j+1}$ (Bài 4 câu 3). Định lý E.3: $\mathbb ET=\sum_j\tfrac N{N-j+1}=N\sum_{k=1}^N\tfrac1k$. Với $N=1000$: $\mathbb ET\approx7485$, gấp khoảng 7,5 lần số mẫu.
:::

## Bài 6. Rút không hoàn lại bằng hàm chỉ thị

Mức độ: tính toán hoặc chứng minh.

::: exercise Bài 6
Cho tập số $\{v_1,\dots,v_N\}$ với trung bình $\bar v$ và $\sigma_1^2=\frac1N\sum_j(v_j-\bar v)^2$. Rút $n\le N$ phần tử khác nhau, mọi tập con $n$ phần tử đồng khả năng; $\bar X_n$ là trung bình các phần tử rút được.

1. Gọi $Z_j$ là chỉ thị của biến cố phần tử $j$ được rút. Chứng minh $\mathbb EZ_j=\tfrac nN$ và, với $j\ne k$, $\mathbb E[Z_jZ_k]=\tfrac{n(n-1)}{N(N-1)}$.
2. Viết $n\bar X_n=\sum_jv_jZ_j$ và chứng minh lại Mệnh đề E.10 bằng Mệnh đề E.8 áp cho các $v_jZ_j$, không dùng lập luận $n=N$ của ghi chú.
3. Kiểm kết quả trên ví dụ ba quan sát tại $\theta=1$ ($v=(2,0,-2)$) với $n=2$ và $n=3$.
4. Với $N=60\,000$ và $n=256$, tính hệ số $\frac{N-n}{N-1}$. Rút không hoàn lại thay cho rút có hoàn lại làm sai số chuẩn của $\bar X_n$ giảm bao nhiêu phần trăm?
:::

::: hint Gợi ý Bài 6
Câu 1: đếm các tập con chứa $j$, hoặc chứa cả $j$ và $k$ (Mệnh đề B.3 (iv)). Câu 2: trừ $\bar v$ khỏi mọi $v_j$ không đổi phương sai, nên có thể giả sử $\bar v=0$, khi đó $\sum_{j\ne k}v_jv_k=-\sum_jv_j^2$.
:::

::: solution Lời giải Bài 6
1. Số tập con chứa $j$ là $\binom{N-1}{n-1}$, nên $P(Z_j=1)=\binom{N-1}{n-1}/\binom Nn=\tfrac nN$ (Mệnh đề E.4 (i)). Số tập con chứa cả $j$ và $k$ là $\binom{N-2}{n-2}$, nên $\mathbb E[Z_jZ_k]=\tfrac{n(n-1)}{N(N-1)}$.
2. Định lý E.3: $\mathbb E\bar X_n=\tfrac1n\sum_jv_j\tfrac nN=\bar v$. Giả sử $\bar v=0$. Mệnh đề E.6 cho $\operatorname{Var}Z_j=\tfrac nN\bigl(1-\tfrac nN\bigr)$ và $\operatorname{Cov}(Z_j,Z_k)=\tfrac{n(n-1)}{N(N-1)}-\tfrac{n^2}{N^2}=-\tfrac{n(N-n)}{N^2(N-1)}$. Mệnh đề E.8:

$$
\begin{aligned}
\operatorname{Var}\Bigl(\sum_jv_jZ_j\Bigr)&=\sum_jv_j^2\frac{n(N-n)}{N^2}-\sum_{j\ne k}v_jv_k\frac{n(N-n)}{N^2(N-1)}\\
&=\sum_jv_j^2\frac{n(N-n)}{N^2}\Bigl(1+\frac1{N-1}\Bigr)=N\sigma_1^2\cdot\frac{n(N-n)}{N(N-1)}.
\end{aligned}
$$

Chia cho $n^2$: $\operatorname{Var}\bar X_n=\tfrac{\sigma_1^2}n\cdot\tfrac{N-n}{N-1}$.
3. $\sigma_1^2=\tfrac83$, $N=3$. Với $n=2$: $\tfrac83\cdot\tfrac12\cdot\tfrac12=\tfrac23$, trùng phương sai của ba giá trị $1,0,-1$ đồng khả năng. Với $n=3$: phương sai 0, vì mọi phần tử đều được rút.
4. $\tfrac{59\,744}{59\,999}\approx0{,}99575$. Sai số chuẩn nhân với $\sqrt{0{,}99575}\approx0{,}9979$, tức giảm khoảng $0{,}2$ %. Khi $n\ll N$, hai cách rút cho phương sai gần như nhau.
:::

## Bài 7. Dấu bằng và giả thiết của Markov, Chebyshev

Mức độ: tính toán hoặc chứng minh.

::: exercise Bài 7
1. Cho $\varepsilon>0$. Tìm mọi phân phối của $Z\ge0$ với $\mathbb EZ<\infty$ làm dấu bằng xảy ra trong Định lý F.1, và tìm một phân phối như vậy với $\mathbb EZ=1$, $\varepsilon=4$.
2. Chỉ ra một biến $X$ nhận cả giá trị âm, có $\mathbb EX=0$, mà $P(X\ge1)>\mathbb EX$. Giả thiết nào của Định lý F.1 bị vi phạm và bước nào của chứng minh hỏng?
3. Cho $t>0$ và $v$ với $0<v\le t^2$. Tìm một biến $X$ với $\mathbb EX=\mu$, $\operatorname{Var}X=v$ làm dấu bằng xảy ra trong Hệ quả F.2.
4. Tung một đồng xu cân đối $n$ lần. Dùng Định lý F.3 tìm $n$ để tỉ lệ mặt ngửa lệch khỏi $\tfrac12$ từ $0{,}05$ trở lên với xác suất không quá $0{,}1$. Cận của Định lý F.3 có đạt dấu bằng với biến Bernoulli không?
:::

::: hint Gợi ý Bài 7
Câu 1: trong chứng minh Định lý F.1, dấu bằng cần $Z=\varepsilon\mathbf 1\{Z\ge\varepsilon\}$ với xác suất 1. Câu 3: dồn khối lượng vào $\mu$ và $\mu\pm t$.
:::

::: solution Lời giải Bài 7
1. Dấu bằng khi và chỉ khi $P(Z\in\{0,\varepsilon\})=1$. Với $\mathbb EZ=1$, $\varepsilon=4$: $P(Z=4)=\tfrac14$, $P(Z=0)=\tfrac34$; khi đó $P(Z\ge4)=\tfrac14=\mathbb EZ/4$.
2. $X=\pm10$, mỗi giá trị với xác suất $\tfrac12$: $\mathbb EX=0$ nhưng $P(X\ge1)=\tfrac12>0$. Giả thiết $Z\ge0$ bị vi phạm; bất đẳng thức điểm $X\ge1\cdot\mathbf 1\{X\ge1\}$ sai tại $X=-10$.
3. $P(X=\mu+t)=P(X=\mu-t)=\tfrac v{2t^2}$, $P(X=\mu)=1-\tfrac v{t^2}$; điều kiện $v\le t^2$ bảo đảm xác suất không âm. Khi đó $\mathbb EX=\mu$, $\operatorname{Var}X=2\cdot\tfrac v{2t^2}\cdot t^2=v$ và $P(\lvert X-\mu\rvert\ge t)=\tfrac v{t^2}$, bằng cận Chebyshev.
4. Định lý F.3 với $\sigma_1^2=\tfrac14$, $\varepsilon=0{,}05$: $\tfrac{0{,}25}{n\cdot0{,}0025}=\tfrac{100}n\le0{,}1$ khi $n\ge1000$. Không đạt dấu bằng: Hệ quả F.2 là Định lý F.1 áp cho $Z=(\bar X_n-\tfrac12)^2$ với ngưỡng $0{,}0025$, nên dấu bằng cần $Z\in\{0;\ 0{,}0025\}$ với xác suất 1, tức $\bar X_n$ chỉ nhận các giá trị $\tfrac12$ và $\tfrac12\pm0{,}05$; với $n=1000$, $\bar X_n$ nhận mọi giá trị $k/1000$, $k=0,\dots,1000$, với xác suất dương. Định lý F.8 hai phía cho cận nhỏ hơn với cùng $n$: $2e^{-2\cdot1000\cdot0{,}0025}=2e^{-5}\approx0{,}0135$; Hệ quả F.9 chỉ cần $n\ge\ln20/(2\cdot0{,}0025)\approx599{,}1$, tức $n\ge600$.
:::

## Bài 8. Ba cận cho đồng xu và cỡ mẫu thăm dò

Mức độ: tính toán hoặc chứng minh.

::: exercise Bài 8
1. Tung $n=100$ đồng xu cân đối; $S$ là số mặt ngửa. Giá trị đúng: $P(S\ge65)\approx0{,}00176$, $P(S\ge70)\approx3{,}93\cdot10^{-5}$. Với mỗi biến cố, tính cận Markov, cận Chebyshev và cận của Định lý F.6; ghi cận nào là một phía, cận nào là hai phía.
2. Một cuộc thăm dò cần $P(\lvert\bar X_n-p\rvert\ge0{,}02)\le0{,}05$. Tính cỡ mẫu theo Chebyshev (với $\sigma_1^2\le\tfrac14$) và theo Hệ quả F.9.
:::

::: hint Gợi ý Bài 8
$\mathbb ES=50$, $\operatorname{Var}S=25$. Với Định lý F.6, $S\ge k$ tương ứng $\varepsilon=\tfrac{k-50}{100}$.
:::

::: solution Lời giải Bài 8
1. Markov (Định lý F.1, một phía): $\tfrac{50}{65}\approx0{,}769$ và $\tfrac{50}{70}\approx0{,}714$. Chebyshev (Hệ quả F.2, hai phía, dùng cho $\{S\ge k\}\subseteq\{\lvert S-50\rvert\ge k-50\}$): $\tfrac{25}{225}\approx0{,}111$ và $\tfrac{25}{400}=0{,}0625$. Định lý F.6 (một phía): $e^{-2\cdot100\cdot0{,}15^2}=e^{-4{,}5}\approx0{,}0111$ và $e^{-8}\approx3{,}35\cdot10^{-4}$. Cận mũ gần giá trị đúng hơn cận Chebyshev 10 lần ở $k=65$ và khoảng 190 lần ở $k=70$, nhưng vẫn lớn hơn giá trị đúng khoảng 6 và 8,5 lần.
2. Chebyshev: $n\ge\tfrac{0{,}25}{0{,}05\cdot0{,}02^2}=12\,500$. Hệ quả F.9 với $[m,M]=[0,1]$: $n\ge\tfrac{\ln40}{2\cdot0{,}02^2}\approx4611{,}1$, tức $n\ge4612$.
:::

## Bài 9. Gradient nhóm trên ví dụ ba quan sát

Mức độ: vận dụng vào AI. LLO12, CLO2.

::: exercise Bài 9
1. Tại $\theta=0$, lập PMF của gradient nhóm $\widehat g$ với $b=3$ chỉ số rút có hoàn lại. Kiểm kỳ vọng và phương sai bằng Định lý G.3.
2. So xác suất đúng $P(\lvert\widehat g-J'(0)\rvert\ge1)$ với cận Chebyshev trong hai trường hợp: $b=3$ có hoàn lại, và $b=2$ không hoàn lại (phương sai lấy từ Định lý G.3). Trường hợp nào xảy ra dấu bằng, và vì sao?
3. Hồi quy logistic với nhãn $\pm1$ và đặc trưng trong $[-1,1]^d$ (ghi chú, phần G): chọn $b$ để với xác suất ít nhất $0{,}99$ mọi tọa độ của gradient nhóm lệch khỏi gradient đầy đủ dưới $0{,}05$, khi $d=100$.
4. Với $b=3$ rút không hoàn lại tại $\theta=0$, gradient nhóm bằng bao nhiêu? Kiểm bằng hệ số $\frac{N-b}{N-1}$ của Định lý G.3.
:::

::: hint Gợi ý Bài 9
Câu 1: gradient mẫu tại $\theta=0$ là $1,-1,-3$, và $J'(0)=-1$. Viết $g_{I_r}(0)=-1+2u_r$ với $u_r\in\{1,0,-1\}$ đều, rồi đếm 27 bộ ba $(u_1,u_2,u_3)$ theo tổng. Câu 3: Định lý F.8 cho từng tọa độ (độ rộng 2), rồi Mệnh đề B.4 trên $d$ tọa độ.
:::

::: solution Lời giải Bài 9
1. $\widehat g=-1+\tfrac23T$ với $T=u_1+u_2+u_3$. Số bộ ba cho $T=3,2,1,0,-1,-2,-3$ là $1,3,6,7,6,3,1$ trên 27, nên $\widehat g$ nhận các giá trị $1,\tfrac13,-\tfrac13,-1,-\tfrac53,-\tfrac73,-3$ với xác suất $\tfrac1{27},\tfrac3{27},\tfrac6{27},\tfrac7{27},\tfrac6{27},\tfrac3{27},\tfrac1{27}$. Kỳ vọng bằng $-1=J'(0)$ do đối xứng. $\mathbb ET^2=\tfrac{2(9\cdot1+4\cdot3+1\cdot6)}{27}=2$, nên $\operatorname{Var}\widehat g=\tfrac49\cdot2=\tfrac89=\tfrac{8/3}3$, khớp Định lý G.3 với $\operatorname{tr}\Sigma=\tfrac83$.
2. $b=3$ có hoàn lại: $\lvert\widehat g+1\rvert\ge1$ khi $\lvert T\rvert\ge2$, nên xác suất đúng là $\tfrac{2(3+1)}{27}=\tfrac8{27}\approx0{,}296$, cận Chebyshev $\tfrac89\approx0{,}889$. $b=2$ không hoàn lại: ba cặp cho $\widehat g\in\{0,-1,-2\}$ đều, phương sai $\tfrac{8/3}2\cdot\tfrac{3-2}{3-1}=\tfrac23$ theo Định lý G.3; xác suất đúng $\tfrac23$, cận $\tfrac23$, dấu bằng. Lý do: $(\widehat g+1)^2\in\{0,1\}$, đúng điều kiện dấu bằng của Định lý F.1 với $\varepsilon=1$.
3. Mỗi tọa độ của gradient mẫu thuộc $[-1,1]$. Định lý F.8 hai phía: $P(\lvert[\widehat g]_j-[\nabla J]_j\rvert\ge\varepsilon)\le2e^{-b\varepsilon^2/2}$. Mệnh đề B.4: xác suất có tọa độ lệch không vượt $2de^{-b\varepsilon^2/2}$. Điều kiện $2de^{-b\varepsilon^2/2}\le0{,}01$ cho $b\ge\tfrac{2\ln(2d/0{,}01)}{\varepsilon^2}=\tfrac{2\ln20\,000}{0{,}0025}\approx7922{,}8$, tức $b\ge7923$. Giả thiết: $\theta$ cố định (G4), chỉ số i.i.d. có hoàn lại (G1). Số chiều chỉ ảnh hưởng tới cỡ nhóm qua $\ln d$: tăng $d$ từ 100 lên $10\,000$ chỉ thêm $2\ln100/0{,}0025\approx3684$ vào cận.
4. Nhóm chứa cả ba mẫu nên $\widehat g=\tfrac{1-1-3}3=-1=J'(0)$ với xác suất 1. Hệ số $\tfrac{3-3}{3-1}=0$ cho phương sai 0, khớp. Đây là gradient đầy đủ, tính với chi phí $3C$.
:::

## Bài 10. Mất mát tổng, ngân sách và tập xác thực

Mức độ: vận dụng vào AI. LLO11, LLO12, CLO1, CLO2.

::: exercise Bài 10
Ví dụ ba quan sát, nhóm rút có hoàn lại.

1. Dùng mất mát tổng trên nhóm với bước $\eta=0{,}05$. Viết $\theta^+-1$ theo $\theta-1$ và tìm các $b$ làm phần tất định phân kỳ. Bước nào với mất mát trung bình cho cùng phép cập nhật?
2. Mất mát trung bình, $\eta=0{,}1$, $\theta_0=0$, ngân sách $B=1200$ gradient mẫu, $K=\lfloor B/b\rfloor$. Tính $a_K=\mathbb E(\theta_K-1)^2$ cho $b\in\{1,20,40,60,1200\}$, với quy ước $b=1200$ là một bước gradient đầy đủ trên tập $N=1200$ gồm 400 bản sao mỗi giá trị. Giải thích dạng chữ U.
3. Với mất mát 0–1, tìm cỡ tập xác thực để tỉ lệ lỗi đo được lệch khỏi tỉ lệ lỗi thật dưới $0{,}02$ với xác suất ít nhất $0{,}99$.
4. SGD thực hành thường xáo trộn dữ liệu theo lượt và dùng tập xác thực để chọn thời điểm dừng. Nêu giả thiết của câu 2 và câu 3 bị vi phạm.
:::

::: hint Gợi ý Bài 10
Câu 1: gradient nhóm dạng tổng là $b(\theta-1)-\sum_r(y_{I_r}-1)$ (Mệnh đề G.4). Câu 2: đệ quy $a_{k+1}=(1-\eta)^2a_k+\eta^2\sigma_1^2/b$ ở phần G với $\sigma_1^2=\tfrac83$. Câu 3: Định lý G.2 và Hệ quả F.9.
:::

::: solution Lời giải Bài 10
1. $\theta^+-1=(1-0{,}05b)(\theta-1)+0{,}05\sum_r(y_{I_r}-1)$. Phần tất định phân kỳ khi $\lvert1-0{,}05b\rvert>1$, tức $b>40$; $b=40$ cho hệ số $-1$. Theo Mệnh đề G.4 (i), phép cập nhật này trùng bước $0{,}05b$ với mất mát trung bình; để giữ hệ số $0{,}95$ với mọi $b$, dùng mất mát trung bình với $\eta=0{,}05$.
2. $a_K=0{,}81^K+\tfrac8{57b}(1-0{,}81^K)$:

| $b$ | 1 | 20 | 40 | 60 | 1 200 |
|---|---:|---:|---:|---:|---:|
| $K$ | 1 200 | 60 | 30 | 20 | 1 |
| $a_K$ | $0{,}140$ | $0{,}00702$ | $0{,}00530$ | $0{,}0171$ | $0{,}810$ |

Nhóm nhỏ: $0{,}81^K$ đã nhỏ nhưng giá trị giới hạn $\tfrac8{57b}$ lớn. Nhóm lớn: giá trị giới hạn nhỏ nhưng còn ít bước, số hạng $0{,}81^K$ lớn. Trên mọi $b$ nguyên, đáy ở $b=34$ ($K=35$, $a_K\approx0{,}00475$). Gradient đầy đủ dùng cả ngân sách cho một bước và cho sai số lớn nhất trong bảng. Kết luận phụ thuộc $\eta=0{,}1$ cố định, mô hình một hướng có độ cong $0{,}1L_{\max}$ khi bước bị chặn bởi $1/L_{\max}$ (ghi chú, phần G); trong chính bài toán một chiều này, $\eta=1$ cho gradient đầy đủ đạt nghiệm sau một bước.
3. Định lý G.2 với $\ell\in[0,1]$ và Hệ quả F.9: $N\ge\tfrac{\ln(2/0{,}01)}{2\cdot0{,}02^2}=\tfrac{\ln200}{0{,}0008}\approx6622{,}9$, tức $N\ge6623$.
4. Câu 2 dùng G1 và điều kiện nhóm ở mỗi bước rút mới, độc lập với lịch sử; xáo trộn theo lượt làm các nhóm trong một lượt phụ thuộc nhau (một mẫu đã dùng không xuất hiện lại trong lượt), nên điều kiện rút mới không còn đúng khi điều kiện theo lịch sử trong lượt và đệ quy không còn đúng nguyên dạng. Câu 3 dùng G4; khi tập xác thực được dùng để chọn thời điểm dừng, tham số được chọn phụ thuộc tập đó, và tỉ lệ lỗi đo được thường thấp hơn tỉ lệ lỗi thật.
:::

## Nguồn

- Bài 1, 3; Bài 4 câu 1 và câu 3; Bài 5 câu 1 và câu 2; Bài 6, 7, 9, 10 tự xây dựng; số liệu tính trực tiếp từ công thức trong lời giải.
- Bài 2 dùng cấu trúc ví dụ xét nghiệm của Koller và Friedman (2009, Ví dụ 2.2, tr. 19) với tham số khác.
- Bài 4 câu 2 và câu 4, Bài 5 câu 3 là biến thể của các ví dụ kinh điển (St. Petersburg, Monty Hall, bộ sưu tập).
- Bài 8 dùng Định lý F.6 (cùng dạng với Định lý A.3 của Koller và Friedman, 2009, tr. 1145, khi $p=1/2$) và Hệ quả F.9 (Koller và Friedman, 2009, §12.1.2, tr. 490–491); giá trị đúng tính bằng tổng nhị thức.
- Bài 10 câu 2 dùng đệ quy dẫn xuất ở phần G của ghi chú; nhận xét về ngân sách tính toán theo Sra, Nowozin và Wright (biên tập, 2011), chương 13.
