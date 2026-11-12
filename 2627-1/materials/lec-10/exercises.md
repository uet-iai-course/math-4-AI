# Bài tập Bài 10 — Xác suất: ngôn ngữ biểu diễn bất định trong AI

Các bài tập dưới đây, đánh số tiếp theo các bài tập trong ghi chú, đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-10/lecture-note.md&deck=lecture-10-xac-suat-bieu-dien-bat-dinh.html) và [bài giảng](lecture-10-xac-suat-bieu-dien-bat-dinh.html) của Bài 10. Các bài lấy từ Murphy (2022), *Probabilistic Machine Learning: An Introduction*, mục Exercises của Chương 2, 3 và 5; số trang là trang của bản trực tuyến của tác giả. Lời giải dẫn định nghĩa, mệnh đề, định lý, ví dụ và công thức theo số hiệu của ghi chú. Ký hiệu theo ghi chú gồm:

- $\mathbb P$ là xác suất; với biến rời rạc, $p(x\mid z)$ viết gọn cho $\mathbb P(X=x\mid Z=z)$ và $p(x,y\mid z)$ cho $\mathbb P(X=x,Y=y\mid Z=z)$;
- $\rho_{XY}$ là hệ số tương quan (7.10), $\varphi(u)=e^{-u^2/2}/\sqrt{2\pi}$ là mật độ của $\mathcal N(0,1)$;
- trong Bài tập 10.13, $P$ giữ ký hiệu của sách và có cùng nghĩa với $\mathbb P$;
- các chữ cái khác ($G$, $M$, $W$, $H$, $E_1$, $E_2$…) được định nghĩa trong từng bài và chỉ có nghĩa trong bài đó;
- số thập phân dùng dấu phẩy.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Không gian mẫu, biến cố, mô hình hữu hạn; phần bù và hợp | 10.1 | 10.7 |
| 2. Quy tắc nhân, xác suất toàn phần, Bayes; độc lập và độc lập có điều kiện | — | 10.4, 10.6, 10.7, 10.8, 10.13 |
| 3. Hàm khối xác suất, hàm phân phối tích lũy, mật độ; họ phân phối | 10.2 | 10.9, 10.10, 10.14 |
| 4. Kỳ vọng, phương sai, hiệp phương sai, kỳ vọng toàn phần; phản ví dụ | 10.2, 10.3 | 10.5, 10.10, 10.11, 10.12, 10.14 |
| 5. Phân phối biên và có điều kiện; suy luận khi thiếu thông tin | 10.3 | 10.8, 10.13 |
| 6. Giả thiết của phép suy luận; hậu nghiệm và quyết định theo chi phí | — | 10.4, 10.7, 10.13, 10.15 |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 2, 6; nhận ra phép đảo điều kiện và vai trò của tiên nghiệm khi đọc một chứng cứ.

::: exercise Bài tập 10.4 (Ngụy biện của công tố viên và của luật sư bào chữa; Murphy (2022), Bài tập 2.10, §2.9, tr. 75)
Một vụ án đã xảy ra. Tại hiện trường có vết máu không thể có cách giải thích vô tội nào, tức đó là máu của thủ phạm. Nhóm máu này có ở $1\%$ dân số.

- (a) Công tố viên lập luận: "Nếu bị cáo vô tội, xác suất bị cáo có nhóm máu của hiện trường là $1\%$. Vậy xác suất bị cáo có tội là $99\%$." Lập luận này được gọi là *ngụy biện của công tố viên* (prosecutor's fallacy). Chỉ ra chỗ sai của lập luận.
- (b) Luật sư bào chữa lập luận: "Vụ án xảy ra trong một thành phố có $800\,000$ dân. Khoảng $8000$ người có nhóm máu này. Chứng cứ chỉ cho xác suất bị cáo có tội là $1$ trên $8000$, nên không có giá trị." Lập luận này được gọi là *ngụy biện của luật sư bào chữa* (defender's fallacy). Chỉ ra chỗ sai của lập luận.
:::

::: hint
Đặt $G$ là biến cố bị cáo có tội và $M$ là biến cố nhóm máu của bị cáo khớp với nhóm máu ở hiện trường. Viết mỗi lập luận bằng $\mathbb P(M\mid G^c)$, $\mathbb P(G\mid M)$ và $\mathbb P(G)$, rồi áp dụng định lý Bayes (5.4) với phân hoạch $G$, $G^c$.
:::

::: solution Lời giải Bài tập 10.4
**Dữ kiện.** Máu ở hiện trường là của thủ phạm, nên $\mathbb P(M\mid G)=1$. Một người vô tội có nhóm máu này với xác suất $\mathbb P(M\mid G^c)=0{,}01$. Theo (5.4),

$$
\begin{aligned}
&\mathbb P(G\mid M)\\
&\quad=\frac{\mathbb P(G)}{\mathbb P(G)+0{,}01\,(1-\mathbb P(G))}.
\end{aligned}
$$

**(a)** Công tố viên đổi $\mathbb P(M\mid G^c)=0{,}01$ thành $\mathbb P(G^c\mid M)=0{,}01$, tức đảo điều kiện, rồi lấy phần bù được $0{,}99$. Công thức trên cho thấy $\mathbb P(G\mid M)$ còn phụ thuộc tiên nghiệm $\mathbb P(G)$, và lập luận không dùng đến nó. Chẳng hạn, nếu trước khi có chứng cứ bị cáo chỉ là một trong $800\,000$ người dân với cùng khả năng, thì $\mathbb P(G)=1/800\,000$ và

$$
\begin{aligned}
\mathbb P(G\mid M)&=\frac{1}{1+0{,}01\cdot799\,999}\\
&=\frac{1}{8000{,}99}\approx\frac1{8001},
\end{aligned}
$$

khác xa $0{,}99$.

**(b)** Con số $1/8000$ của luật sư xấp xỉ hậu nghiệm ứng với tiên nghiệm đều $\mathbb P(G)=1/800\,000$, như phép tính ở (a). Chỗ sai là kết luận "không có giá trị": chứng cứ làm xác suất có tội tăng từ $1/800\,000$ lên khoảng $1/8000$, tức gấp khoảng $100=\mathbb P(M\mid G)/\mathbb P(M\mid G^c)$ lần, và thu hẹp nhóm nghi phạm từ $800\,000$ xuống khoảng $8000$ người. Khi ghép với các chứng cứ khác, hậu nghiệm này đóng vai trò tiên nghiệm mới.

**Kiểm tra lại.** Tỉ số hậu nghiệm trên tiên nghiệm là $\dfrac{1/8000{,}99}{1/800\,000}=\dfrac{800\,000}{8000{,}99}\approx99{,}99$, xấp xỉ $100$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 4; áp dụng công thức phương sai của biến đổi affine và định nghĩa hệ số tương quan.

::: exercise Bài tập 10.5 (Hệ số tương quan của hai biến có quan hệ tuyến tính; Murphy (2022), Bài tập 3.3, §3.7, tr. 103)
Cho biến thực $X$ với $\mathbb E[X^2]<\infty$ và $\operatorname{Var}(X)>0$. Đặt $Y=aX+b$ với $a,b\in\mathbb R$. Chứng minh $\rho_{XY}=1$ khi $a>0$ và $\rho_{XY}=-1$ khi $a<0$.
:::

::: hint
Viết $Y-\mathbb E[Y]=a\,(X-\mathbb E[X])$, rồi tính $\operatorname{Cov}(X,Y)$ theo (7.9) và $\operatorname{Var}(Y)$ theo (7.7).
:::

::: solution Lời giải Bài tập 10.5
Đặt $\mu=\mathbb E[X]$ và $\sigma^2=\operatorname{Var}(X)>0$. Theo (7.5), $\mathbb E[Y]=a\mu+b$, nên $Y-\mathbb E[Y]=a(X-\mu)$. Do đó

$$
\begin{aligned}
&\operatorname{Cov}(X,Y)\\
&\quad=\mathbb E\bigl[(X-\mu)\,a(X-\mu)\bigr]\\
&\quad=a\sigma^2,\\
&\operatorname{Var}(Y)=a^2\sigma^2,
\end{aligned}
$$

trong đó dòng cuối là (7.7). Khi $a\ne0$, $\operatorname{Var}(Y)>0$ và theo (7.10),

$$
\rho_{XY}=\frac{a\sigma^2}{\sqrt{\sigma^2\cdot a^2\sigma^2}}=\frac{a}{|a|},
$$

bằng $1$ khi $a>0$ và bằng $-1$ khi $a<0$. $\square$

**Kiểm tra lại.** Với $X\sim\operatorname{Bernoulli}(1/2)$, $a=2$, $b=1$: $\operatorname{Var}(X)=1/4$, $Y\in\{1;3\}$, $\mathbb E[XY]=\mathbb E[2X^2+X]=3/2$, nên $\operatorname{Cov}(X,Y)=3/2-\tfrac12\cdot2=1/2=2\cdot\tfrac14$; $\operatorname{Var}(Y)=1$ và $\rho_{XY}=\dfrac{1/2}{\sqrt{1/4\cdot1}}=1$.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 2; áp dụng định lý Bayes khi tiên nghiệm rất nhỏ.

::: exercise Bài tập 10.6 (Chẩn đoán bệnh hiếm; Murphy (2022), Bài tập 2.9, §2.9, tr. 75)
Sau lần khám sức khỏe định kỳ, một người nhận kết quả dương tính với một bệnh nặng. Xét nghiệm có độ chính xác $99\%$: xác suất dương tính khi có bệnh là $0{,}99$, và xác suất âm tính khi không có bệnh cũng là $0{,}99$. Bệnh này hiếm, chỉ xuất hiện ở $1$ trong $10\,000$ người. Tính xác suất người này thực sự có bệnh, trình bày cả phép tính lẫn kết quả.
:::

::: hint
Đặt $D$ là biến cố có bệnh và $R$ là biến cố dương tính. Ta có $\mathbb P(R\mid D^c)=1-0{,}99=0{,}01$; tính $\mathbb P(R)$ bằng (5.3), rồi dùng (5.4) với phân hoạch $D$, $D^c$.
:::

::: solution Lời giải Bài tập 10.6
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

Xét nghiệm đúng với xác suất $0{,}99$ ở cả hai nhóm, nhưng người dương tính chỉ có bệnh với xác suất khoảng $0{,}0098$, vì tiên nghiệm $0{,}0001$ nhỏ hơn nhiều so với xác suất dương tính nhầm $0{,}01$.

**Kiểm tra lại.** Trên $1\,000\,000$ người: $100$ người có bệnh, $99$ người trong số đó dương tính; $999\,900$ người không có bệnh, $9999$ người trong số đó dương tính. Tỉ lệ có bệnh trong $10\,098$ người dương tính là $99/10\,098=1/102$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2, 6; lập không gian mẫu theo cách thu được quan sát và thấy hậu nghiệm phụ thuộc cơ chế đó.

::: exercise Bài tập 10.7 (Xác suất phụ thuộc cách thu được quan sát; Murphy (2022), Bài tập 2.11, §2.9, tr. 75)
Một gia đình có hai con. Giới tính của mỗi con được mô hình hóa như một lần tung đồng xu cân đối, độc lập giữa hai con. Trước khi có thông tin, khả năng lớn nhất là gia đình có một trai một gái, với xác suất $1/2$; hai khả năng còn lại, hai trai hoặc hai gái, mỗi khả năng có xác suất $1/4$.

- (a) Ta hỏi người cha có con trai nào không, và ông trả lời có. Tính xác suất gia đình có một con gái.
- (b) Thay vào đó, ta tình cờ thấy một trong hai đứa trẻ chạy qua, tức mỗi đứa là đứa chạy qua với xác suất $1/2$, không phụ thuộc giới tính, và đó là con trai. Tính xác suất đứa còn lại là con gái.
:::

::: hint
Ở (a), dùng không gian mẫu $\{\mathrm{TT},\mathrm{TG},\mathrm{GT},\mathrm{GG}\}$ ghi giới tính con lớn rồi con nhỏ ($\mathrm T$: trai, $\mathrm G$: gái). Ở (b), kết quả sơ cấp phải ghi thêm đứa trẻ nào chạy qua, nên không gian mẫu có $8$ phần tử.
:::

::: solution Lời giải Bài tập 10.7
**(a)** Bốn kết quả $\mathrm{TT},\mathrm{TG},\mathrm{GT},\mathrm{GG}$ có cùng xác suất $1/4$. Câu trả lời "có" là biến cố $B=\{\mathrm{TT},\mathrm{TG},\mathrm{GT}\}$ với $\mathbb P(B)=3/4$. Biến cố "có một con gái" trong $B$ là $\{\mathrm{TG},\mathrm{GT}\}$. Theo (5.1),

$$
\mathbb P(\{\mathrm{TG},\mathrm{GT}\}\mid B)=\frac{1/2}{3/4}=\frac23.
$$

**(b)** Ghi kết quả là cặp (giới tính hai con, đứa chạy qua), với đứa chạy qua là $1$ (con lớn) hoặc $2$ (con nhỏ). Do giới tính và đứa chạy qua độc lập, mỗi kết quả trong $8$ kết quả có xác suất $1/8$. Biến cố "đứa chạy qua là con trai" gồm

$$
\begin{gathered}
(\mathrm{TT},1),\ (\mathrm{TT},2),\\
(\mathrm{TG},1),\ (\mathrm{GT},2),
\end{gathered}
$$

có xác suất $4/8=1/2$. Trong biến cố đó, đứa còn lại là con gái ở $(\mathrm{TG},1)$ và $(\mathrm{GT},2)$, với xác suất $2/8$. Theo (5.1), xác suất cần tìm bằng $\dfrac{2/8}{4/8}=\dfrac12$.

**Diễn giải.** Hai quan sát đều cho biết gia đình có ít nhất một con trai, nhưng hậu nghiệm khác nhau ($2/3$ và $1/2$). Ở (b), một gia đình hai trai cho quan sát "thấy con trai" với xác suất $1$, còn gia đình một trai một gái chỉ với xác suất $1/2$; ở (a), cả hai gia đình đều trả lời "có" với xác suất $1$. Hậu nghiệm vì vậy phụ thuộc vào mô hình của cách thu quan sát, không chỉ vào nội dung của quan sát.

**Kiểm tra lại.** Ở (b), $\mathbb P(\text{hai trai}\mid\text{thấy con trai})=\dfrac{2/8}{4/8}=\dfrac12$, cộng với $\dfrac12$ được $1$. Ở (a), $\mathbb P(\mathrm{TT}\mid B)=\dfrac{1/4}{3/4}=\dfrac13$, cộng với $\dfrac23$ được $1$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 2, 5; chứng minh một dạng tương đương của độc lập có điều kiện bằng phép lấy biên.

::: exercise Bài tập 10.8 (Độc lập có điều kiện và phân tích nhân tử; Murphy (2022), Bài tập 2.3, §2.9, tr. 74)
Cho các biến rời rạc $X,Y,Z$ nhận hữu hạn giá trị. Theo (6.5), $X\perp Y\mid Z$ khi và chỉ khi

$$
p(x,y\mid z)=p(x\mid z)\,p(y\mid z)
$$

với mọi $x,y,z$ thỏa $p(z)>0$. Chứng minh rằng $X\perp Y\mid Z$ khi và chỉ khi tồn tại hai hàm $g$, $h$ sao cho

$$
p(x,y\mid z)=g(x,z)\,h(y,z)
$$

với mọi $x,y,z$ thỏa $p(z)>0$.
:::

::: hint
Chiều thuận chọn $g$, $h$ trực tiếp. Chiều ngược: cố định $z$, lấy biên theo $y$, theo $x$ và theo cả hai biến, rồi so sánh ba đẳng thức thu được.
:::

::: solution Lời giải Bài tập 10.8
**Chiều thuận.** Nếu $X\perp Y\mid Z$, đặt $g(x,z)=p(x\mid z)$, $h(y,z)=p(y\mid z)$ khi $p(z)>0$ (giá trị tại các $z$ có $p(z)=0$ chọn tùy ý). Khi đó $p(x,y\mid z)=g(x,z)h(y,z)$.

**Chiều ngược.** Cố định $z$ với $p(z)>0$ và đặt $G(z)=\sum_xg(x,z)$, $H(z)=\sum_yh(y,z)$; các tổng hữu hạn. Phân phối $p(\cdot,\cdot\mid z)$ là phân phối đồng thời của $(X,Y)$ dưới độ đo $\mathbb P(\cdot\mid Z=z)$, nên Mệnh đề 10.32 áp dụng được cho nó:

$$
\begin{aligned}
p(x\mid z)&=\sum_yp(x,y\mid z)\\
&=g(x,z)\,H(z),\\
p(y\mid z)&=\sum_xp(x,y\mid z)\\
&=G(z)\,h(y,z),\\
1&=\sum_x\sum_yp(x,y\mid z)\\
&=G(z)\,H(z).
\end{aligned}
$$

Nhân hai dòng đầu và dùng dòng thứ ba:

$$
\begin{aligned}
&p(x\mid z)\,p(y\mid z)\\
&\quad=g(x,z)\,h(y,z)\,G(z)H(z)\\
&\quad=g(x,z)\,h(y,z)\\
&\quad=p(x,y\mid z).
\end{aligned}
$$

Đẳng thức đúng với mọi $x,y$ và mọi $z$ có $p(z)>0$, nên $X\perp Y\mid Z$. $\square$

**Kiểm tra lại.** Với $X\perp Y\mid Z$, cặp $g=2\,p(x\mid z)$, $h=\tfrac12\,p(y\mid z)$ cũng thỏa giả thiết; khi đó $G(z)=2$, $H(z)=1/2$, $G(z)H(z)=1$, và dòng thứ nhất cho $p(x\mid z)=2\,p(x\mid z)\cdot\tfrac12$, khớp. Trong ứng dụng, chỉ cần viết $p(x,y\mid z)$ thành tích của một hàm của $(x,z)$ và một hàm của $(y,z)$ là kết luận được độc lập có điều kiện, không cần chuẩn hóa từng nhân tử.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3; tính hằng số chuẩn hóa của mật độ Gaussian (6.11).

::: exercise Bài tập 10.9 (Hằng số chuẩn hóa của Gaussian một chiều; Murphy (2022), Bài tập 2.12, §2.9, tr. 76)
Hằng số chuẩn hóa của Gaussian có kỳ vọng $0$ và tham số $\sigma>0$ là

$$
Z=\int_{-\infty}^{\infty}\exp\Bigl(-\frac{x^2}{2\sigma^2}\Bigr)dx.
$$

Để tính $Z$, xét bình phương của nó:

$$
\begin{aligned}
&Z^2=\int_{-\infty}^{\infty}\int_{-\infty}^{\infty}\\
&\quad\exp\Bigl(-\frac{x^2+y^2}{2\sigma^2}\Bigr)dx\,dy.
\end{aligned}
$$

Đổi từ tọa độ Descartes $(x,y)$ sang tọa độ cực $(r,\theta)$ bằng $x=r\cos\theta$, $y=r\sin\theta$. Vì $dx\,dy=r\,dr\,d\theta$ và $\cos^2\theta+\sin^2\theta=1$, ta có

$$
\begin{aligned}
&Z^2=\int_0^{2\pi}\int_0^{\infty}\\
&\quad r\exp\Bigl(-\frac{r^2}{2\sigma^2}\Bigr)dr\,d\theta.
\end{aligned}
$$

Tính tích phân này và suy ra $Z=\sqrt{\sigma^2\,2\pi}$.
:::

::: hint
Tích phân tách thành tích của tích phân theo $\theta$, với hàm dưới dấu tích phân là hằng số, và tích phân theo $r$. Với $u=e^{-r^2/2\sigma^2}$ thì $du/dr=-\frac1{\sigma^2}re^{-r^2/2\sigma^2}$, nên tích phân theo $r$ tính được bằng nguyên hàm.
:::

::: solution Lời giải Bài tập 10.9
**Viết $Z^2$ thành tích phân kép.** Hàm dưới dấu tích phân không âm, nên theo định lý Fubini–Tonelli (thừa nhận ở Phụ lục B của ghi chú),

$$
\begin{aligned}
Z^2&=\int_{-\infty}^{\infty}e^{-x^2/2\sigma^2}dx\\
&\quad\times\int_{-\infty}^{\infty}e^{-y^2/2\sigma^2}dy\\
&=\iint_{\mathbb R^2}e^{-(x^2+y^2)/2\sigma^2}dx\,dy,
\end{aligned}
$$

và phép đổi sang tọa độ cực cho dạng tích phân cuối của đề.

**Tích phân theo $r$.** Hàm $r\mapsto-\sigma^2e^{-r^2/2\sigma^2}$ có đạo hàm $re^{-r^2/2\sigma^2}$, nên

$$
\begin{aligned}
&\int_0^{\infty}re^{-r^2/2\sigma^2}dr\\
&\quad=\Bigl[-\sigma^2e^{-r^2/2\sigma^2}\Bigr]_0^{\infty}\\
&\quad=0-(-\sigma^2)=\sigma^2.
\end{aligned}
$$

**Tích phân theo $\theta$.** Tích phân trong không phụ thuộc $\theta$, nên $Z^2=\int_0^{2\pi}\sigma^2\,d\theta=2\pi\sigma^2$.

**Kết luận.** Vì hàm dưới dấu tích phân của $Z$ dương, $Z>0$, nên $Z=\sqrt{2\pi\sigma^2}=\sigma\sqrt{2\pi}$. $\square$

**Kiểm tra lại.** Với $\sigma=1$ ta được $\int_{\mathbb R}e^{-u^2/2}du=\sqrt{2\pi}$, sự kiện dùng trong mục Kiến thức tiên quyết của ghi chú. Hệ số $1/\sqrt{2\pi\sigma^2}$ của (6.11) với $\mu=0$ đúng bằng $1/Z$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 3, 4; tìm hàm phân phối tích lũy và mật độ của một hàm của hai biến độc lập, rồi tính kỳ vọng.

::: exercise Bài tập 10.10 (Kỳ vọng của điểm nằm bên trái; Murphy (2022), Bài tập 2.5, §2.9, tr. 74)
Hai điểm $X,Y$ được lấy độc lập, mỗi điểm có phân phối đều trên đoạn $[0,1]$. Đặt $M=\min(X,Y)$ là vị trí của điểm nằm bên trái.

- (a) Tính $\mathbb P(M>t)$ với $t\in[0,1]$.
- (b) Viết hàm phân phối tích lũy $F_M$ trên toàn trục số và một mật độ $f_M$ của $M$.
- (c) Tính $\mathbb E[M]$.
:::

::: hint
$M>t$ khi và chỉ khi cả hai điểm nằm bên phải $t$; dùng (6.4). Ở (c), áp dụng (7.2) với mật độ tìm được ở (b).
:::

::: solution Lời giải Bài tập 10.10
**(a)** Với $t\in[0,1]$, $\{M>t\}=\{X>t\}\cap\{Y>t\}$. Theo (6.4) và (6.7),

$$
\begin{aligned}
\mathbb P(M>t)&=\mathbb P(X>t)\,\mathbb P(Y>t)\\
&=(1-t)^2.
\end{aligned}
$$

**(b)** Vì $0\le M\le1$, theo (4.8)

$$
\begin{aligned}
&F_M(t)\\
&=\begin{cases}
0,&t<0,\\
1-(1-t)^2,&0\le t\le1,\\
1,&t>1.
\end{cases}
\end{aligned}
$$

Hàm $f_M(t)=2(1-t)$ khi $0\le t\le1$ và $f_M(t)=0$ ngoài đoạn này thỏa $\int_{-\infty}^tf_M(s)\,ds=F_M(t)$ với mọi $t$, vì $\int_0^t2(1-s)\,ds=2t-t^2=1-(1-t)^2$. Đó là dạng (6.8) với $f_M$ là mật độ của $M$.

**(c)** Theo (7.2),

$$
\begin{aligned}
\mathbb E[M]&=\int_0^1t\cdot2(1-t)\,dt\\
&=2\Bigl(\frac12-\frac13\Bigr)=\frac13.
\end{aligned}
$$

**Kiểm tra lại.** Đặt $M'=\max(X,Y)$. Lập luận như (a) cho $\mathbb P(M'\le t)=t^2$ trên $[0,1]$, mật độ $2t$ và $\mathbb E[M']=\int_0^12t^2\,dt=\frac23$. Vì $M+M'=X+Y$, tính tuyến tính (7.5) cho $\mathbb E[M]+\mathbb E[M']=\mathbb E[X]+\mathbb E[Y]=1$, khớp $\frac13+\frac23=1$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 4; dựng phản ví dụ cho chiều ngược của Mệnh đề 10.27 với biến có mật độ.

::: exercise Bài tập 10.11 (Không tương quan nhưng phụ thuộc với biến liên tục; Murphy (2022), Bài tập 3.1, §3.7, tr. 103)
Cho $X$ có phân phối đều trên $(-1,1)$, tức mật độ $f_X(x)=1/2$ khi $-1<x<1$ và bằng $0$ ở ngoài, và đặt $Y=X^2$. Biến $Y$ phụ thuộc $X$, vì $Y$ được xác định hoàn toàn bởi $X$.

- (a) Chứng minh $\rho_{XY}=0$. Gợi ý của sách: nếu $X$ đều trên $(a,b)$ thì $\mathbb E[X]=(a+b)/2$ và $\operatorname{Var}(X)=(b-a)^2/12$.
- (b) Chứng minh $X$ và $Y$ không độc lập bằng hai tập $B_1=[-\tfrac12,\tfrac12]$ và $B_2=(\tfrac14,\infty)$ trong (6.4).
:::

::: hint
Dùng (7.4) với $g(x)=x$, $x^2$, $x^3$, $x^4$; tích phân của một hàm lẻ trên $(-1,1)$ bằng $0$. Ở (b), $\{Y\in B_2\}=\{|X|>\tfrac12\}$.
:::

::: solution Lời giải Bài tập 10.11
**(a)** Theo (7.4), $\mathbb E[X]=\int_{-1}^1\tfrac x2\,dx=0$ và $\mathbb E[XY]=\mathbb E[X^3]=\int_{-1}^1\tfrac{x^3}2\,dx=0$, vì hai hàm dưới dấu tích phân lẻ. Do đó $\operatorname{Cov}(X,Y)=0-0\cdot\mathbb E[Y]=0$. Hai phương sai:

$$
\begin{aligned}
\mathbb E[X^2]&=\int_{-1}^1\frac{x^2}{2}\,dx=\frac13,\\
\operatorname{Var}(X)&=\frac13-0=\frac13,\\
\mathbb E[Y^2]&=\mathbb E[X^4]\\
&=\int_{-1}^1\frac{x^4}{2}\,dx=\frac15,\\
\operatorname{Var}(Y)&=\frac15-\Bigl(\frac13\Bigr)^2=\frac4{45}.
\end{aligned}
$$

Hai phương sai dương, nên (7.10) xác định và $\rho_{XY}=0/\sqrt{\tfrac13\cdot\tfrac4{45}}=0$.

**(b)** $\{Y>\tfrac14\}=\{|X|>\tfrac12\}$ rời với $\{|X|\le\tfrac12\}$, nên $\mathbb P(X\in B_1,Y\in B_2)=0$. Trong khi đó $\mathbb P(X\in B_1)=\int_{-1/2}^{1/2}\tfrac12\,dx=\tfrac12$ và $\mathbb P(Y\in B_2)=1-\tfrac12=\tfrac12$, tích bằng $\tfrac14\ne0$. Vậy (6.4) sai với cặp tập này, và $X$, $Y$ phụ thuộc.

**Kiểm tra lại.** Gợi ý của sách với $a=-1$, $b=1$ cho $\mathbb E[X]=0$ và $\operatorname{Var}(X)=4/12=1/3$, khớp (a). Ví dụ 10.10 của ghi chú là bản rời rạc của hiện tượng này: $Y$ là hàm chẵn của $X$, nên các mômen bậc lẻ triệt tiêu dù $Y$ được xác định hoàn toàn bởi $X$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 4; chứng minh $-1\le\rho_{XY}\le1$ bằng Mệnh đề 10.24 và Mệnh đề 10.26.

::: exercise Bài tập 10.12 (Hệ số tương quan thuộc $[-1,1]$; Murphy (2022), Bài tập 3.2, §3.7, tr. 103)
Cho $X,Y$ có mômen bậc hai hữu hạn, $\operatorname{Var}(X)>0$ và $\operatorname{Var}(Y)>0$. Chứng minh $-1\le\rho_{XY}\le1$, với $\rho_{XY}$ cho bởi (7.10).
:::

::: hint
Chuẩn hóa hai biến: $U=(X-\mu_X)/\sigma_X$, $V=(Y-\mu_Y)/\sigma_Y$ với $\sigma_X=\sqrt{\operatorname{Var}(X)}$, $\sigma_Y=\sqrt{\operatorname{Var}(Y)}$. Phương sai không âm; áp dụng điều này cho $U+V$ và $U-V$.
:::

::: solution Lời giải Bài tập 10.12
**Bước 1 (chuẩn hóa).** Đặt $U$, $V$ như trong gợi ý. Theo (7.7), $\operatorname{Var}(U)=\operatorname{Var}(X)/\sigma_X^2=1$ và $\operatorname{Var}(V)=1$. Vì $\mathbb E[U]=\mathbb E[V]=0$,

$$
\begin{aligned}
&\operatorname{Cov}(U,V)=\mathbb E[UV]\\
&\quad=\frac{\mathbb E\bigl[(X-\mu_X)(Y-\mu_Y)\bigr]}{\sigma_X\sigma_Y}\\
&\quad=\rho_{XY},
\end{aligned}
$$

trong đó đẳng thức giữa dùng tính tuyến tính (7.5).

**Bước 2 (phương sai không âm).** Theo (7.5), $\operatorname{Cov}(U,-V)=-\operatorname{Cov}(U,V)$. Mệnh đề 10.26 với $n=2$, áp dụng cho $U$ và $\pm V$, cùng Mệnh đề 10.24 cho

$$
\begin{aligned}
0&\le\operatorname{Var}(U\pm V)\\
&=1+1\pm2\rho_{XY}\\
&=2(1\pm\rho_{XY}).
\end{aligned}
$$

Dấu cộng cho $\rho_{XY}\ge-1$; dấu trừ cho $\rho_{XY}\le1$. $\square$

**Kiểm tra lại.** Với $Y=X$, $\rho_{XY}=\operatorname{Var}(X)/\operatorname{Var}(X)=1$ và $\operatorname{Var}(U-V)=0$; với $Y=-X$, $\rho_{XY}=-1$ và $\operatorname{Var}(U+V)=0$. Hai cận đạt được, khớp Bài tập 10.5.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 2, 5, 6; xác định dữ kiện nào đủ để tính hậu nghiệm, có và không có giả thiết độc lập có điều kiện.

::: exercise Bài tập 10.13 (Dữ kiện đủ để tính hậu nghiệm; Murphy (2022), Bài tập 2.1, §2.9, tr. 73–74)
Cho $H\in\{1,\ldots,K\}$ là một biến rời rạc, và $e_1$, $e_2$ là các giá trị quan sát được của hai biến rời rạc $E_1$, $E_2$, với $\mathbb P(E_1=e_1,E_2=e_2)>0$. Ta cần tính vector

$$
\begin{aligned}
&\vec P(H\mid e_1,e_2)\\
&\quad=\bigl(P(H=1\mid e_1,e_2),\\
&\qquad\ldots,\\
&\qquad P(H=K\mid e_1,e_2)\bigr).
\end{aligned}
$$

Ở đây $P(H)$ là vector $(P(H=1),\ldots,P(H=K))$, và tương tự $P(e_1\mid H)$, $P(e_2\mid H)$, $P(e_1,e_2\mid H)$ là các vector theo giá trị của $H$.

- (a) Bộ số nào dưới đây đủ để tính vector trên?
  - i. $P(e_1,e_2)$, $P(H)$, $P(e_1\mid H)$, $P(e_2\mid H)$;
  - ii. $P(e_1,e_2)$, $P(H)$, $P(e_1,e_2\mid H)$;
  - iii. $P(e_1\mid H)$, $P(e_2\mid H)$, $P(H)$.
- (b) Giả sử thêm $E_1\perp E_2\mid H$. Bộ nào trong ba bộ trên đủ?

Trình bày phép tính cùng kết quả cuối cùng.
:::

::: hint
Viết định lý Bayes $P(H=h\mid e_1,e_2)=P(e_1,e_2\mid H=h)\,P(H=h)/P(e_1,e_2)$. Để chứng minh một bộ không đủ, dựng hai mô hình có cùng các số trong bộ nhưng cho hai hậu nghiệm khác nhau; thử $K=2$, $E_1,E_2\in\{0,1\}$ và quan sát $e_1=e_2=1$.
:::

::: solution Lời giải Bài tập 10.13
**(a)** Theo Định lý 10.11 với phân hoạch $\{H=h\}$,

$$
\begin{aligned}
&P(H=h\mid e_1,e_2)\\
&=\frac{P(e_1,e_2\mid H=h)\,P(H=h)}{P(e_1,e_2)}.
\end{aligned}
$$

Bộ ii cho đủ ba thành phần của công thức, nên **bộ ii đủ**.

Bộ i và bộ iii không chứa $P(e_1,e_2\mid H)$, và khi không có giả thiết độc lập, các xác suất biên $P(e_1\mid H)$, $P(e_2\mid H)$ không xác định được nó. Hai mô hình sau với $K=2$, $E_1,E_2\in\{0,1\}$, $P(H=1)=P(H=2)=\tfrac12$ và quan sát $e_1=e_2=1$ cho thấy điều đó.

- **Mô hình A:** khi $H=1$, $E_1=E_2$ và $E_1\sim\operatorname{Bernoulli}(1/2)$; khi $H=2$, $E_1$, $E_2$ độc lập, cùng phân phối $\operatorname{Bernoulli}(1/2)$. Khi đó $P(e_1,e_2\mid H=1)=\tfrac12$, $P(e_1,e_2\mid H=2)=\tfrac14$.
- **Mô hình B:** đổi vai hai giá trị của $H$: $P(e_1,e_2\mid H=1)=\tfrac14$, $P(e_1,e_2\mid H=2)=\tfrac12$.

Trong cả hai mô hình, $P(e_1\mid H=h)=P(e_2\mid H=h)=\tfrac12$ với $h=1,2$, và theo (5.3)

$$
P(e_1,e_2)=\tfrac12\cdot\tfrac12+\tfrac12\cdot\tfrac14=\tfrac38.
$$

Vậy hai mô hình có cùng mọi số của bộ i (và của bộ iii), nhưng

$$
\begin{aligned}
\text{A: }&P(H=1\mid e_1,e_2)\\
&\quad=\frac{\tfrac12\cdot\tfrac12}{3/8}=\frac23,\\
\text{B: }&P(H=1\mid e_1,e_2)\\
&\quad=\frac{\tfrac14\cdot\tfrac12}{3/8}=\frac13.
\end{aligned}
$$

Do đó **bộ i và bộ iii không đủ**.

**(b)** Với $E_1\perp E_2\mid H$, theo (6.5),

$$
\begin{aligned}
&P(e_1,e_2\mid H=h)\\
&=P(e_1\mid H=h)\\
&\quad\times P(e_2\mid H=h).
\end{aligned}
$$

- **Bộ i đủ:** tử số $P(e_1\mid H=h)P(e_2\mid H=h)P(H=h)$ tính được, mẫu số $P(e_1,e_2)$ được cho.
- **Bộ ii đủ:** như ở (a).
- **Bộ iii đủ:** tử số tính được như bộ i; mẫu số tính bằng công thức toàn phần (5.3), $P(e_1,e_2)=\sum_{h=1}^KP(e_1\mid H=h)\,P(e_2\mid H=h)\,P(H=h)$, tức chuẩn hóa vector tử số cho tổng bằng $1$, như bước 3–4 của Thuật toán 10.35.

Vậy cả ba bộ đều đủ.

**Kiểm tra lại.** Mô hình A vi phạm giả thiết của (b): $P(e_1,e_2\mid H=1)=\tfrac12\ne\tfrac12\cdot\tfrac12$. Trong mô hình B, hai hậu nghiệm $\tfrac13$ và $\tfrac{\tfrac12\cdot\tfrac12}{3/8}=\tfrac23$ có tổng $1$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 3, 4; dùng xác suất toàn phần và kỳ vọng toàn phần để dựng hai biến Gaussian không tương quan nhưng phụ thuộc.

::: exercise Bài tập 10.14 (Hai biến Gaussian không tương quan nhưng phụ thuộc; Murphy (2022), Bài tập 3.5, §3.7, tr. 104)
Cho $X\sim\mathcal N(0,1)$ và $Y=WX$, trong đó $\mathbb P(W=-1)=\mathbb P(W=1)=0{,}5$ và $W$ độc lập với $X$. Vì $Y$ là một hàm của $(W,X)$ với $|Y|=|X|$, hai biến $X$ và $Y$ không độc lập.

- (a) Chứng minh $Y\sim\mathcal N(0,1)$.
- (b) Chứng minh $\operatorname{Cov}(X,Y)=0$, bằng định nghĩa $\operatorname{Cov}(X,Y)=\mathbb E[XY]-\mathbb E[X]\,\mathbb E[Y]$ và quy tắc kỳ vọng lặp $\mathbb E[XY]=\mathbb E\bigl[\mathbb E[XY\mid W]\bigr]$. Như vậy $X$ và $Y$ không tương quan nhưng phụ thuộc, dù mỗi biến đều có phân phối Gaussian.
- (c) Kiểm tra $X$ và $Y$ phụ thuộc bằng (6.4) với $B_1=[0,1]$ và $B_2=(1,\infty)$.
:::

::: hint
Ở (a), dùng công thức toàn phần với phân hoạch $\{W=1\}$, $\{W=-1\}$ và tính đối xứng $\varphi(-u)=\varphi(u)$. Ở (b), khi biết $W=w$, $XY=wX^2$, và $\mathbb E[X^2]=1$ theo Phụ lục C của ghi chú.
:::

::: solution Lời giải Bài tập 10.14
**(a)** Vì $W\perp X$, theo (6.4) ta có $\mathbb P(X\le t,W=w)=\mathbb P(X\le t)\,\mathbb P(W=w)$, nên $\mathbb P(X\le t\mid W=w)=\mathbb P(X\le t)$ và tương tự cho $-X$. Công thức toàn phần (5.3) cho, với mọi $t$,

$$
\begin{aligned}
&\mathbb P(Y\le t)\\
&\quad=\tfrac12\,\mathbb P(X\le t\mid W=1)\\
&\qquad+\tfrac12\,\mathbb P(-X\le t\mid W=-1)\\
&\quad=\tfrac12\,\mathbb P(X\le t)\\
&\qquad+\tfrac12\,\mathbb P(X\ge-t).
\end{aligned}
$$

Do $\varphi$ chẵn, $\mathbb P(X\ge-t)=\int_{-t}^{\infty}\varphi(u)\,du=\int_{-\infty}^{t}\varphi(v)\,dv=\mathbb P(X\le t)$ (đổi biến $v=-u$). Vậy $\mathbb P(Y\le t)=\int_{-\infty}^t\varphi(v)\,dv$ với mọi $t$, tức $Y$ có mật độ $\varphi$ và $Y\sim\mathcal N(0,1)$.

**(b)** Theo Phụ lục C của ghi chú và câu (a), $\mathbb E[X]=\mathbb E[Y]=0$ và $\mathbb E[X^2]=1$. Khi biết $W=w$, $XY=wX^2$; vì $W\perp X$, phân phối của $X$ dưới $\mathbb P(\cdot\mid W=w)$ vẫn là $\mathcal N(0,1)$, nên

$$
\begin{aligned}
\mathbb E[XY\mid W=w]&=w\,\mathbb E[X^2]\\
&=w.
\end{aligned}
$$

Phân phối có điều kiện của $XY$ khi biết $W=w$ là phân phối của $wX^2$, có mật độ vì $X^2$ có hàm phân phối tích lũy $2\Phi(\sqrt v)-1$ khả vi khi $v>0$, với $\Phi(t)=\int_{-\infty}^t\varphi$. Biến $XY$ khả tích vì $\lvert XY\rvert=X^2$ và $\mathbb E[X^2]=1$. Định lý 10.29 với biến điều kiện $W$ cho

$$
\begin{aligned}
&\mathbb E[XY]\\
&\quad=\mathbb E[XY\mid W=1]\cdot\tfrac12\\
&\qquad+\mathbb E[XY\mid W=-1]\cdot\tfrac12\\
&\quad=\tfrac12-\tfrac12=0.
\end{aligned}
$$

Do đó $\operatorname{Cov}(X,Y)=0-0\cdot0=0$.

**(c)** Nếu $X\in[0,1]$ thì $|Y|=|X|\le1$, nên $Y\notin(1,\infty)$; do đó $\mathbb P(X\in B_1,Y\in B_2)=0$. Trong khi đó $\mathbb P(X\in B_1)=\int_0^1\varphi>0$ và, theo (a), $\mathbb P(Y\in B_2)=\int_1^\infty\varphi>0$, nên tích của chúng dương. Vậy (6.4) sai với cặp tập này, và $X$, $Y$ phụ thuộc.

**Kiểm tra lại.** $\operatorname{Var}(Y)=\mathbb E[W^2X^2]=\mathbb E[X^2]=1$ vì $W^2=1$, khớp $Y\sim\mathcal N(0,1)$ ở (a). Cặp $(X,Y)$ không có mật độ đồng thời dạng (6.12), vì nó chỉ nằm trên hai đường thẳng $y=x$ và $y=-x$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 6; chọn hành động có chi phí kỳ vọng nhỏ nhất từ hậu nghiệm, khi được phép từ chối phân loại.

::: exercise Bài tập 10.15 (Phương án từ chối trong phân loại; Murphy (2022), Bài tập 5.1, §5.6, tr. 204)
Trong nhiều bài toán phân loại, ta có thể gán đầu vào $x$ vào một lớp $j$, hoặc chọn *phương án từ chối* (reject option) khi quá không chắc chắn. Nếu chi phí từ chối nhỏ hơn chi phí phân loại sai, từ chối có thể là hành động tối ưu. Gọi $\alpha_i$ là hành động thứ $i$, với $i=1,\ldots,C+1$, trong đó $C$ là số lớp và $\alpha_{C+1}$ là từ chối. Gọi $Y=j$ là lớp thật (chưa biết), và đặt hàm mất mát

$$
\begin{aligned}
&\lambda(\alpha_i\mid Y=j)\\
&=\begin{cases}
0,&i=j,\\
&i,j\in\{1,\ldots,C\},\\
\lambda_r,&i=C+1,\\
\lambda_s,&\text{các trường hợp}\\
&\text{còn lại},
\end{cases}
\end{aligned}
$$

tức phân loại đúng có chi phí $0$, từ chối có chi phí $\lambda_r$, phân loại sai có chi phí $\lambda_s$, với $0\le\lambda_r\le\lambda_s$ và $\lambda_s>0$. *Rủi ro* của hành động $\alpha_i$ tại $x$ là chi phí kỳ vọng theo hậu nghiệm, $R(\alpha_i\mid x)=\sum_{j=1}^C\lambda(\alpha_i\mid Y=j)\,p(Y=j\mid x)$.

- (a) Chứng minh rủi ro nhỏ nhất đạt được khi ta chọn $Y=j$ nếu $p(Y=j\mid x)\ge p(Y=k\mid x)$ với mọi $k$ (tức $j$ là lớp có hậu nghiệm lớn nhất) và $p(Y=j\mid x)\ge1-\lambda_r/\lambda_s$; ngược lại thì từ chối.
- (b) Mô tả điều xảy ra với quy tắc ở (a) khi tỉ số $\lambda_r/\lambda_s$ tăng từ $0$ đến $1$, tức chi phí tương đối của việc từ chối tăng.
:::

::: hint
Viết $p_k=p(Y=k\mid x)$. Với $i\le C$, chỉ số hạng $j\ne i$ có chi phí $\lambda_s$, nên $R(\alpha_i\mid x)=\lambda_s(1-p_i)$; còn $R(\alpha_{C+1}\mid x)=\lambda_r$ vì $\sum_jp_j=1$.
:::

::: solution Lời giải Bài tập 10.15
**(a)** Với $p_k=p(Y=k\mid x)$ và $\sum_{k=1}^Cp_k=1$,

$$
\begin{aligned}
&R(\alpha_i\mid x)=\lambda_s\sum_{j\ne i}p_j\\
&\quad=\lambda_s(1-p_i),\quad i\le C,\\
&R(\alpha_{C+1}\mid x)=\lambda_r\sum_{j=1}^Cp_j\\
&\quad=\lambda_r.
\end{aligned}
$$

Trong các hành động phân loại, $\lambda_s(1-p_i)$ nhỏ nhất khi $p_i$ lớn nhất, tức tại lớp $j$ có $p_j\ge p_k$ với mọi $k$. So hành động này với từ chối: phân loại vào $j$ có rủi ro không lớn hơn từ chối khi và chỉ khi

$$
\begin{aligned}
&\lambda_s(1-p_j)\le\lambda_r\\
&\iff p_j\ge1-\frac{\lambda_r}{\lambda_s},
\end{aligned}
$$

với phép chia hợp lệ vì $\lambda_s>0$. Ngược lại, $\lambda_r<\lambda_s(1-p_j)\le\lambda_s(1-p_i)$ với mọi $i\le C$, nên từ chối có rủi ro nhỏ nhất. Đó là quy tắc cần chứng minh. $\square$

**(b)** Ngưỡng $\tau=1-\lambda_r/\lambda_s$ giảm từ $1$ xuống $0$ khi $\lambda_r/\lambda_s$ tăng từ $0$ đến $1$.

- Khi $\lambda_r/\lambda_s=0$, từ chối không tốn chi phí và $\tau=1$: ta chỉ phân loại khi hậu nghiệm của lớp lớn nhất bằng $1$, còn lại đều từ chối.
- Khi tỉ số tăng, $\tau$ giảm, nên tập các $x$ bị từ chối (những $x$ có $\max_kp_k<\tau$) thu hẹp dần.
- Khi $\lambda_r/\lambda_s=1$, $\tau=0$ và điều kiện $p_j\ge0$ luôn đúng: ta luôn phân loại vào lớp có hậu nghiệm lớn nhất, không bao giờ cần từ chối.

**Kiểm tra lại.** Với $C=2$, $\lambda_s=1$, $\lambda_r=0{,}2$ thì $\tau=0{,}8$. Nếu $p_1=0{,}7$, $p_2=0{,}3$: phân loại vào lớp $1$ có rủi ro $0{,}3$, từ chối có rủi ro $0{,}2$, nên từ chối, khớp $0{,}7<0{,}8$. Nếu $p_1=0{,}9$: phân loại có rủi ro $0{,}1<0{,}2$, khớp $0{,}9\ge0{,}8$.
:::

## Tài liệu tham khảo

- Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả tại [probml.github.io/pml-book/book1.html](https://probml.github.io/pml-book/book1.html):
  - mục Exercises của Chương 2 (§2.9): Bài 2.1 (tr. 73–74), 2.3, 2.5 (tr. 74), 2.9, 2.10, 2.11 (tr. 75), 2.12 (tr. 76);
  - mục Exercises của Chương 3 (§3.7): Bài 3.1, 3.2, 3.3 (tr. 103), 3.5 (tr. 104);
  - mục Exercises của Chương 5 (§5.6): Bài 5.1 (tr. 204).
