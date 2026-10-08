# Bài 05c — Xác suất cơ bản, bất đẳng thức tập trung và mất mát trung bình trên nhóm nhỏ

## A. Ước lượng một kỳ vọng bằng trung bình

### Gradient nhóm trên ví dụ ba quan sát

Ví dụ ba quan sát dùng $N=3$ dữ liệu $y=(-1,1,3)$, mô hình hằng $\theta\in\mathbb R$ và mất mát mẫu $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$. Mất mát huấn luyện là

$$
J(\theta)=\frac13\sum_{i=1}^3\ell_i(\theta)=\frac12(\theta-1)^2+\frac43,
$$

với nghiệm $\theta^*=1$. Gradient của mẫu thứ $i$ là $g_i(\theta)=\theta-y_i$, còn gradient đầy đủ là trung bình của chúng, $\nabla J(\theta)=\theta-1$. Tại $\theta=1$:

| $y_i$ | $-1$ | $1$ | $3$ |
|---|---:|---:|---:|
| $g_i(1)$ | $2$ | $0$ | $-2$ |

Phương pháp hạ gradient ngẫu nhiên (SGD) thay $\nabla J(\theta)$ bằng gradient trên một nhóm nhỏ (minibatch) gồm $b$ chỉ số $I_1,\dots,I_b$ rút ngẫu nhiên từ $\{1,\dots,N\}$:

$$
\widehat g=\frac1b\sum_{r=1}^bg_{I_r}(\theta).
$$

Nếu một gradient mẫu có chi phí $C$, gradient đầy đủ tốn $NC$ còn $\widehat g$ tốn $bC$. Tại $\theta=1$, nhóm một mẫu cho $2$, $0$ hoặc $-2$, trong khi $\nabla J(1)=0$. Goodfellow, Bengio và Courville (2016, §8.1.3, tr. 278) so hai ước lượng gradient dùng 100 và 10 000 mẫu: ước lượng thứ hai tốn gấp 100 lần nhưng sai số chuẩn chỉ giảm 10 lần. Phát biểu này cần ba khái niệm chưa có: "rút ngẫu nhiên", "trung bình của $\widehat g$" và "sai số chuẩn".

Một câu hỏi cụ thể về cách rút: một nhóm $b=32$ chỉ số rút có hoàn lại từ $N=1000$ mẫu có thể chứa cùng một chỉ số hai lần. Phần B tính xác suất của sự kiện này.

### Các câu hỏi về trung bình mẫu

Nhiều đại lượng cần cho quyết định là trung bình theo một phân phối: rủi ro kỳ vọng $R(\theta)$ là mất mát trung bình trên dữ liệu mới; $\nabla J(\theta)$ là trung bình của $g_I(\theta)$ khi $I$ đều trên $\{1,\dots,N\}$; tỉ lệ cử tri ủng hộ một phương án là trung bình của biến nhận giá trị $1$ (ủng hộ) hoặc $0$; tỉ lệ lỗi phân loại là trung bình của biến chỉ lỗi. Gọi đại lượng đó là $\mu$. Khi $\mu$ không tính được hoặc tính tốn kém, $\mu$ được ước lượng từ $n$ quan sát $X_1,\dots,X_n$ bằng trung bình mẫu

$$
\bar X_n=\frac1n\sum_{i=1}^nX_i.
$$

Bài này trả lời năm câu hỏi về $\bar X_n$:

1. **Tâm.** $\bar X_n$ có trung bình bằng $\mu$ hay không (phần E).
2. **Sai số điển hình.** Độ phân tán của $\bar X_n$ quanh $\mu$ giảm theo $n$ thế nào (phần E).
3. **Xác suất sai lệch.** Xác suất để $\lvert\bar X_n-\mu\rvert\ge\varepsilon$ bị chặn bởi bao nhiêu (phần F).
4. **Trung bình hay tổng.** Mất mát trên nhóm nhỏ nên lấy trung bình hay tổng, và lựa chọn này ảnh hưởng thế nào tới ngưỡng bước khi đổi $b$ hoặc $N$ (phần G).
5. **Cỡ nhóm.** Khi chi phí mỗi bước tỉ lệ với $b$ và gradient được ước lượng lại ở mọi bước, chọn $b$ thế nào dưới một ngân sách tính toán cố định (phần G).

Phần B, C, D xây ngôn ngữ để phát biểu chính xác các câu hỏi này; phần H gom các câu trả lời vào một bảng tra.

### Ký hiệu, giả thiết và vị trí của bài

| Ký hiệu | Nghĩa |
|---|---|
| $\Omega$, $\omega$, $P$ | không gian mẫu, kết cục, xác suất |
| $X,Y,Z$; $x$ | biến ngẫu nhiên; giá trị của nó |
| $\mathbb E$, $\operatorname{Var}$, $\operatorname{Cov}$ | kỳ vọng, phương sai, hiệp phương sai |
| $\mu$, $\sigma_1^2$ | kỳ vọng và phương sai của một quan sát |
| $N$, $b$, $I_r$ | số mẫu dữ liệu, cỡ nhóm, chỉ số rút ngẫu nhiên |
| $g_i(\theta)$, $\widehat g$ | gradient mẫu, gradient nhóm |
| $\mathcal P$ | phân phối sinh dữ liệu |

Bài 05 viết $P$ cho phân phối sinh dữ liệu; ở đây phân phối đó ký hiệu $\mathcal P$, còn $P$ chỉ xác suất. Bài 00 viết xác suất là $\Pr$. Bài 05b dùng $\mu$ cho hằng số lồi mạnh và $\sigma^2$ cho cận phương sai trong giả thiết H6b; trong bài này $\mu$ chỉ là kỳ vọng và $\sigma_1^2$ là phương sai của một quan sát. Bài 06 gọi nhóm nhỏ là "lô nhỏ".

Bốn giả thiết dùng xuyên suốt, phát biểu chính xác ở phần D, F và G:

- **G1.** Các quan sát độc lập cùng phân phối (independent and identically distributed, i.i.d.), hoặc là các lần rút đều có hoàn lại từ một tập hữu hạn. Trường hợp không hoàn lại được xét riêng.
- **G2.** Kỳ vọng của trị tuyệt đối hữu hạn; phương sai hữu hạn khi kết quả cần đến nó.
- **G3.** Khi dùng bất đẳng thức Hoeffding, mỗi quan sát nằm trong một khoảng biết trước.
- **G4.** Trong phần G, tham số $\theta$ cố định, không phụ thuộc nhóm đang lấy.

Bài bổ trợ này không có buổi riêng trong đề cương; nó cung cấp nền xác suất cho các chuẩn đầu ra bài học (LLO) LLO11, LLO12 và chuẩn đầu ra học phần (CLO) CLO1, CLO2. Các khái niệm được xây lại từ không gian mẫu, kèm chứng minh cho trường hợp rời rạc; Bài 00 đã ôn phần lớn các định nghĩa ở phần B–E. Kiến thức nền: tổng hữu hạn, chuỗi hình học, hàm mũ, đạo hàm một biến; bước $1/L$ của phương pháp hạ gradient (Bài 04); hồi quy logistic (Bài 01, §4).

## B. Không gian xác suất, biến cố và phép đếm

Xác suất để một nhóm 32 chỉ số rút có hoàn lại từ 1 000 mẫu chứa chỉ số lặp chỉ xác định được sau khi chọn tập các dãy chỉ số có thể xảy ra.

### Kết cục, không gian mẫu và biến cố

Một phép thử ngẫu nhiên là một quy trình có kết quả chưa biết trước. Có thể hình dung xác suất như một đơn vị khối lượng được chia cho các kết quả có thể của phép thử; xác suất của một nhóm kết quả là tổng khối lượng của chúng, và toàn bộ các kết quả có khối lượng 1.

Mỗi kết quả có thể là một kết cục (outcome) $\omega$; tập mọi kết cục là không gian mẫu (sample space) $\Omega$; một biến cố (event) là một tập con $A\subseteq\Omega$, và biến cố $A$ xảy ra khi kết cục thuộc $A$. Xác suất của $A$ là tổng khối lượng của các kết cục trong $A$; biến cố $\Omega$ có khối lượng 1.

::: example Ví dụ hai xúc xắc
Tung hai xúc xắc phân biệt. Kết cục là cặp $(i,j)$ với $i,j\in\{1,\dots,6\}$, nên $\lvert\Omega\rvert=36$. Biến cố "tổng bằng 7" là

$$
\begin{aligned}
A&=\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\},\\
\lvert A\rvert&=6.
\end{aligned}
$$

Khi hai xúc xắc cân đối, mỗi kết cục nhận khối lượng $\tfrac1{36}$, nên xác suất của $A$ là $\tfrac6{36}=\tfrac16$.
:::

Với nhóm chỉ số, kết cục là một dãy $(i_1,\dots,i_b)\in\{1,\dots,N\}^b$, và "nhóm có chỉ số lặp" là tập các dãy có hai vị trí trùng nhau.

### Tiên đề xác suất

Ví dụ hai xúc xắc chia khối lượng đều. Một đồng xu lệch, hay số lần tung tới khi ra mặt ngửa (phần D), cần quy tắc chung không giả định đồng khả năng.

**Định nghĩa B.1 (không gian xác suất rời rạc).** Cho $\Omega$ hữu hạn hoặc đếm được; mọi tập con của $\Omega$ là biến cố. Xác suất là hàm $P:2^\Omega\to[0,1]$ thỏa $P(\Omega)=1$ và cộng tính đếm được: với mọi dãy biến cố $A_1,A_2,\dots$ đôi một rời nhau,

$$
P\Bigl(\bigcup_jA_j\Bigr)=\sum_jP(A_j).
$$

Khi $\Omega$ hữu hạn và mọi kết cục có cùng xác suất, $P(A)=\lvert A\rvert/\lvert\Omega\rvert$; đó là mô hình đồng khả năng (đối chiếu Koller và Friedman, 2009, Định nghĩa 2.1, tr. 15–16).

Trong không gian rời rạc, $P$ được xác định bởi các số $p_\omega=P(\{\omega\})\ge0$ có tổng bằng 1, qua $P(A)=\sum_{\omega\in A}p_\omega$. Khi $\Omega$ không đếm được, chẳng hạn đoạn $[0,1]$, không thể gán xác suất cho mọi tập con; khi đó biến cố là các tập thuộc một $\sigma$-đại số $\mathcal F$, và bài này không đi vào chi tiết đó.

**Mệnh đề B.2.** Với mọi biến cố $A,B$: (i) $P(\varnothing)=0$; (ii) $P(A^c)=1-P(A)$; (iii) nếu $A\subseteq B$ thì $P(A)\le P(B)$; (iv) $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.

::: proof
(i) Lấy $A_1=\Omega$ và $A_j=\varnothing$ với $j\ge2$; cộng tính cho $1=1+\sum_{j\ge2}P(\varnothing)$, nên $P(\varnothing)=0$. Từ (i), cộng tính đúng cho hữu hạn biến cố rời nhau (bổ sung các tập rỗng). (ii) $\Omega=A\cup A^c$ rời nhau. (iii) $B=A\cup(B\setminus A)$ rời nhau, nên $P(B)=P(A)+P(B\setminus A)\ge P(A)$. (iv) $A\cup B=A\cup(B\setminus A)$ và $B=(A\cap B)\cup(B\setminus A)$, cả hai rời nhau; trừ hai đẳng thức cộng tính.
:::

### Phép đếm và mô hình đồng khả năng

Với 23 người, mỗi người một ngày sinh trong 365 ngày, $\lvert\Omega\rvert=365^{23}\approx10^{59}$; với nhóm chỉ số, $\lvert\Omega\rvert=1000^{32}$. Không thể liệt kê các tập này, nên cần đếm. Cách đếm dựa trên cây lựa chọn: tầng thứ $j$ là lựa chọn thứ $j$, mỗi nút có cùng số nhánh, và số lá là tích số nhánh của các tầng.

::: example Bài toán sinh nhật
Giả sử mọi dãy ngày sinh của $n$ người đồng khả năng trên 365 ngày. Đếm các dãy không có ngày trùng bằng cây: người thứ nhất có 365 lựa chọn, người thứ hai còn 364, và người thứ $n$ còn $365-n+1$. Do đó

$$
\begin{aligned}
P(\text{không trùng})&=\frac{365\cdot364\cdots(365-n+1)}{365^n}\\
&=\prod_{i=0}^{n-1}\Bigl(1-\frac i{365}\Bigr),
\end{aligned}
$$

và xác suất có ít nhất hai người trùng ngày sinh là phần bù (Mệnh đề B.2):

| $n$ | 23 | 30 | 50 | 70 |
|---|---:|---:|---:|---:|
| $P(\text{trùng})$ | $0{,}5073$ | $0{,}7063$ | $0{,}9704$ | $0{,}9992$ |
:::

**Mệnh đề B.3 (phép đếm).** (i) Nếu một kết cục được tạo bởi $k$ lựa chọn liên tiếp và lựa chọn thứ $j$ luôn có $n_j$ khả năng, bất kể các lựa chọn trước, thì có $n_1n_2\cdots n_k$ kết cục. (ii) Có $N^b$ dãy độ dài $b$ lấy từ $N$ phần tử, cho phép lặp. (iii) Có $N(N-1)\cdots(N-b+1)$ dãy độ dài $b\le N$ gồm các phần tử khác nhau. (iv) Có $\binom Nk=\dfrac{N!}{k!\,(N-k)!}$ tập con $k$ phần tử của một tập $N$ phần tử.

::: proof
(i) Quy nạp theo $k$: mỗi kết cục của $k-1$ lựa chọn đầu là một nút ở tầng $k-1$ của cây và có đúng $n_k$ nhánh con. (ii) và (iii) là (i) với $n_j=N$ và $n_j=N-j+1$. (iv) Mỗi tập con $k$ phần tử sinh ra đúng $k!$ dãy gồm các phần tử khác nhau của nó, theo (iii) với $N=b=k$; do đó số tập con bằng $N(N-1)\cdots(N-k+1)/k!$.
:::

### Chỉ số lặp trong nhóm nhỏ có hoàn lại

Rút có hoàn lại $b$ chỉ số $I_1,\dots,I_b$ từ $\{1,\dots,N\}$ nghĩa là mỗi dãy trong $N^b$ dãy có cùng xác suất $N^{-b}$. Theo Mệnh đề B.3 (iii), số dãy không lặp là $N(N-1)\cdots(N-b+1)$, nên biến cố $E$ gồm các nhóm có chỉ số lặp có xác suất

$$
P(E)=1-\prod_{i=0}^{b-1}\Bigl(1-\frac iN\Bigr).
$$

Đây là công thức của bài toán sinh nhật với 365 thay bằng $N$. Với $N=1000$: $b=32$ cho $0{,}394$, $b=64$ cho $0{,}873$. Với $N=60\,000$ và $b=256$, xác suất là $0{,}420$. Như vậy câu hỏi ở phần A có đáp số $0{,}394$: khoảng hai trong năm nhóm 32 chỉ số có ít nhất một mẫu được dùng từ hai lần trở lên, và nhóm đó có ít hơn 32 gradient mẫu khác nhau.

![Hai đường tăng dần: xác suất có hai người trùng ngày sinh vượt 0,5 tại n = 23 (0,507); xác suất nhóm có chỉ số lặp với N = 1000 bằng 0,394 tại b = 32 và 0,873 tại b = 64.](img/lec-05c/birthday-and-batch-duplicates.svg)

Trong thực hành, dữ liệu thường được xáo trộn rồi chia thành nhóm theo từng lượt (epoch), tức một lần duyệt qua toàn bộ dữ liệu (Goodfellow và cộng sự, 2016, §8.1.3, tr. 280–281); khi đó các chỉ số trong một nhóm khác nhau và xác suất trên bằng 0. Bài 05 và các phần sau dùng mô hình rút có hoàn lại vì nó cho các công thức đơn giản; phần E xét riêng trường hợp không hoàn lại.

### Bất đẳng thức hợp

Biến cố "ít nhất một sự cố xảy ra" là hợp của các biến cố $A_1,\dots,A_m$. Tính chính xác xác suất của hợp đòi hỏi biết mọi phần giao, trong khi thường chỉ biết từng $P(A_j)$. Trên hình vẽ các tập như những miền phẳng, diện tích của hợp không vượt tổng diện tích, vì phần chồng lên nhau bị đếm nhiều lần trong tổng.

::: example Cận hợp cho bài toán sinh nhật
Với $n=23$ người, gọi $A_{jk}$ là biến cố người $j$ và người $k$ trùng ngày sinh. Mỗi $P(A_{jk})=\tfrac1{365}$, và có $\binom{23}2=253$ cặp. Tổng các xác suất là $\tfrac{253}{365}\approx0{,}693$, lớn hơn xác suất đúng $0{,}507$ vì các biến cố $A_{jk}$ chồng lên nhau. Với $n=30$, tổng này bằng $\tfrac{435}{365}>1$ và không cho thông tin.
:::

**Mệnh đề B.4 (bất đẳng thức hợp (union bound)).** Với mọi biến cố $A_1,\dots,A_m$,

$$
P\Bigl(\bigcup_{j=1}^mA_j\Bigr)\le\sum_{j=1}^mP(A_j).
$$

::: proof
Với $m=2$, Mệnh đề B.2 (iv) cho $P(A_1\cup A_2)=P(A_1)+P(A_2)-P(A_1\cap A_2)\le P(A_1)+P(A_2)$. Giả sử khẳng định đúng với $m-1$ biến cố; áp trường hợp $m=2$ cho $\bigcup_{j<m}A_j$ và $A_m$, rồi dùng giả thiết quy nạp.
:::

Phần G dùng Mệnh đề B.4 để chặn đồng thời sai lệch của mọi tọa độ một vectơ gradient.

::: exercise Câu hỏi kiểm tra
Dùng Mệnh đề B.4 cho các cặp vị trí để chặn xác suất nhóm $b=32$ chỉ số (rút có hoàn lại từ $N=1000$) chứa chỉ số lặp. So với xác suất đúng $0{,}394$.
:::

::: hint
Biến cố "vị trí $r$ và $s$ trùng chỉ số" có xác suất $1/N$.
:::

::: solution
Có $\binom{32}2=496$ cặp vị trí, mỗi cặp trùng với xác suất $\tfrac1{1000}$, nên cận là $0{,}496$. Cận lớn hơn xác suất đúng $0{,}394$ vì các biến cố trùng của những cặp có chung một vị trí chồng lên nhau.
:::

## C. Xác suất có điều kiện, độc lập và công thức Bayes

Phép đếm ở phần B cho xác suất trước khi quan sát; một kết quả xét nghiệm dương tính thu hẹp tập kết cục và đổi xác suất mắc bệnh.

### Xác suất có điều kiện

Một bệnh có tỉ lệ mắc $0{,}001$ trong dân số. Một người xét nghiệm và nhận kết quả dương tính; xác suất người đó mắc bệnh không còn là $0{,}001$. Khi biết biến cố $B$ đã xảy ra, các kết cục ngoài $B$ bị loại; khối lượng của các kết cục trong $B$ được chia lại theo cùng tỉ lệ sao cho tổng bằng 1.

::: example Monty Hall
Có ba cửa, sau một cửa là xe, sau hai cửa còn lại là dê; xe ở mỗi cửa với xác suất $\tfrac13$. Người chơi chọn cửa 1. Người dẫn biết vị trí xe, luôn mở một cửa khác cửa 1 có dê phía sau, và khi cả cửa 2 và cửa 3 có dê thì chọn mỗi cửa với xác suất $\tfrac12$. Theo cây, khối lượng các kết cục là: (xe ở 1, mở 2) và (xe ở 1, mở 3) mỗi kết cục $\tfrac16$; (xe ở 2, mở 3) bằng $\tfrac13$; (xe ở 3, mở 2) bằng $\tfrac13$.

Biết người dẫn mở cửa 3, chỉ còn hai kết cục: (xe ở 1, mở 3) khối lượng $\tfrac16$ và (xe ở 2, mở 3) khối lượng $\tfrac13$. Chia lại theo tổng $\tfrac12$: xe ở cửa 1 với xác suất $\tfrac13$, ở cửa 2 với xác suất $\tfrac23$. Đổi sang cửa 2 thắng với xác suất $\tfrac23$. Kết luận phụ thuộc giả thiết về người dẫn (Goodfellow và cộng sự, 2016, §3.1, tr. 54).

![Cây ba nhánh vị trí xe, mỗi nhánh xác suất một phần ba; đổi cửa thắng ở hai nhánh, giữ cửa thắng ở một nhánh.](img/lec-05c/monty-hall-tree.svg)
:::

**Định nghĩa C.1 (xác suất có điều kiện (conditional probability)).** Cho biến cố $B$ với $P(B)>0$. Xác suất của $A$ khi biết $B$ là

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
$$

Với $B$ cố định, $A\mapsto P(A\mid B)$ thỏa Định nghĩa B.1, nên mọi kết quả của phần B áp dụng cho nó (Koller và Friedman, 2009, (2.1), tr. 18).

**Mệnh đề C.2 (quy tắc nhân).** Nếu $P(B)>0$ thì $P(A\cap B)=P(A\mid B)P(B)$. Tổng quát, nếu $P(A_1\cap\dots\cap A_{m-1})>0$ thì

$$
\begin{aligned}
P(A_1\cap\dots\cap A_m)&=P(A_1)\,P(A_2\mid A_1)\\
&\quad\cdots P(A_m\mid A_1\cap\dots\cap A_{m-1}).
\end{aligned}
$$

::: proof
Đẳng thức thứ nhất là Định nghĩa C.1 nhân hai vế với $P(B)$. Dạng chuỗi suy ra bằng quy nạp: áp đẳng thức thứ nhất với $A=A_m$ và $B=A_1\cap\dots\cap A_{m-1}$; điều kiện $P(B)>0$ kéo theo mọi giao ngắn hơn có xác suất dương (Mệnh đề B.2 (iii)).
:::

Khối lượng của một lá trên cây Monty Hall là tích các xác suất dọc nhánh, đúng theo Mệnh đề C.2.

### Xác suất toàn phần và công thức Bayes

Ví dụ xét nghiệm ở đầu phần cần xác suất mắc bệnh khi kết quả dương tính, trong khi số liệu cho sẵn là tỉ lệ mắc và xác suất dương tính khi biết trạng thái bệnh. Gọi $D$ là biến cố người được xét nghiệm mắc bệnh, $D^c$ là phần bù của nó; $+$ và $-$ là kết quả dương tính và âm tính.

::: example Ví dụ xét nghiệm
Theo Koller và Friedman (2009, Ví dụ 2.2, tr. 19): tỉ lệ mắc $P(D)=0{,}001$; độ nhạy $P(+\mid D)=0{,}95$; độ đặc hiệu $P(-\mid D^c)=0{,}95$. Trên $100\,000$ người: 100 người mắc, trong đó 95 người dương tính; $99\,900$ người không mắc, trong đó $4995$ người dương tính. Trong $5090$ người dương tính chỉ có 95 người mắc, nên

$$
P(D\mid+)=\frac{95}{5090}\approx0{,}0187.
$$

![Cây hai tầng: 100 người mắc bệnh, 95 dương tính; 99 900 người không mắc, 4 995 dương tính; trong 5 090 người dương tính có 95 người mắc.](img/lec-05c/test-tree-natural-frequencies.svg)
:::

Bảng tần số tách số người dương tính theo trạng thái bệnh rồi cộng lại; hai bước này là hai kết quả sau.

**Mệnh đề C.3 (xác suất toàn phần).** Cho $B_1,\dots,B_m$ là một phân hoạch của $\Omega$ (đôi một rời nhau, hợp bằng $\Omega$) với $P(B_j)>0$. Với mọi biến cố $A$,

$$
P(A)=\sum_{j=1}^mP(A\mid B_j)P(B_j).
$$

**Định lý C.4 (công thức Bayes (Bayes' rule)).** Với cùng giả thiết và $P(A)>0$,

$$
P(B_j\mid A)=\frac{P(A\mid B_j)P(B_j)}{\sum_{i=1}^mP(A\mid B_i)P(B_i)}.
$$

::: proof
$A$ là hợp rời nhau của các $A\cap B_j$; cộng tính và Mệnh đề C.2 cho Mệnh đề C.3. Với Định lý C.4, viết $P(B_j\mid A)=P(A\cap B_j)/P(A)$, thay tử số bằng Mệnh đề C.2 và mẫu số bằng Mệnh đề C.3.
:::

Với ví dụ xét nghiệm, $P(+)=0{,}95\cdot0{,}001+0{,}05\cdot0{,}999=0{,}0509$ và $P(D\mid+)=0{,}00095/0{,}0509\approx0{,}0187$, khớp bảng tần số. Một mô hình phân loại đưa ra $p(Y\mid X)$, xác suất của nhãn khi biết đặc trưng; Định lý C.4 nối đại lượng này với $p(X\mid Y)$ và $p(Y)$ (Goodfellow và cộng sự, 2016, (3.42), tr. 70–71).

### Độc lập của biến cố

Phép đếm $N^b$ ở phần B và mệnh đề về gradient nhóm của Bài 05 coi các lần rút chỉ số là không ảnh hưởng nhau. Hai biến cố không ảnh hưởng nhau khi biết một biến cố xảy ra không làm đổi xác suất của biến cố kia: $P(B\mid A)=P(B)$, tức $P(A\cap B)=P(A)P(B)$.

::: example Rút hai lần từ ba quan sát
Rút hai lần một giá trị từ $\{-1,1,3\}$. Gọi $A$ là "lần 1 bằng 3", $B$ là "lần 2 bằng 3".

- Có hoàn lại: 9 cặp có thứ tự đồng khả năng; $P(A\cap B)=\tfrac19=P(A)P(B)$.
- Không hoàn lại: 6 cặp gồm hai giá trị khác nhau, đồng khả năng; $P(A)=P(B)=\tfrac13$ nhưng $P(A\cap B)=0$, nên $P(B\mid A)=0\ne\tfrac13$.
:::

**Định nghĩa C.5 (độc lập (independence)).** Hai biến cố $A,B$ độc lập nếu $P(A\cap B)=P(A)P(B)$. Các biến cố $A_1,\dots,A_m$ độc lập nếu với mọi tập chỉ số $S\subseteq\{1,\dots,m\}$ có ít nhất hai phần tử,

$$
P\Bigl(\bigcap_{j\in S}A_j\Bigr)=\prod_{j\in S}P(A_j).
$$

Dạng tích áp dụng cả khi $P(A)=0$; khi $P(A)>0$ nó tương đương $P(B\mid A)=P(B)$ (Koller và Friedman, 2009, Định nghĩa 2.2 và Mệnh đề 2.1, tr. 23).

**Nhận xét C.6.** Độc lập từng đôi (pairwise independence) không kéo theo độc lập. Tung hai đồng xu cân đối; $A$ là "xu 1 ngửa", $B$ là "xu 2 ngửa", $C$ là "hai xu khác nhau". Mỗi biến cố có xác suất $\tfrac12$ và mỗi giao hai biến cố có xác suất $\tfrac14$, nên ba cặp đều độc lập. Nhưng $A\cap B\cap C=\varnothing$, nên $P(A\cap B\cap C)=0\ne\tfrac18$. Vì vậy Định nghĩa C.5 đòi đẳng thức tích cho mọi họ con.

Với rút có hoàn lại, $P(I_1=i_1,\dots,I_b=i_b)=N^{-b}=\prod_rP(I_r=i_r)$, và mọi họ con cũng thỏa dạng tích; các biến cố về những lần rút khác nhau là độc lập.

### Độc lập có điều kiện

Một người làm hai xét nghiệm. Kết quả hai lần không độc lập: lần một dương tính làm tăng xác suất mắc bệnh, do đó tăng xác suất lần hai dương tính. Khi đã biết trạng thái bệnh, có thể giả thiết sai số của hai lần xét nghiệm không ảnh hưởng nhau.

**Định nghĩa C.7 (độc lập có điều kiện (conditional independence)).** Cho $P(C)>0$. Hai biến cố $A,B$ độc lập có điều kiện theo $C$ nếu $P(A\cap B\mid C)=P(A\mid C)\,P(B\mid C)$ (Koller và Friedman, 2009, Định nghĩa 2.3, tr. 24).

::: example Hai xét nghiệm
Giả thiết hai kết quả độc lập có điều kiện theo $D$ và theo $D^c$, cùng độ nhạy và độ đặc hiệu $0{,}95$. Khi đó $P(+_1\cap+_2\mid D)=0{,}95^2$ và $P(+_1\cap+_2\mid D^c)=0{,}05^2$. Định lý C.4 cho

$$
\begin{aligned}
P(D\mid+_1\cap+_2)&=\frac{0{,}001\cdot0{,}95^2}{0{,}001\cdot0{,}95^2+0{,}999\cdot0{,}05^2}\\
&=\frac{0{,}0009025}{0{,}0034}\approx0{,}265.
\end{aligned}
$$

Hai kết quả không độc lập vô điều kiện: $P(+_2\mid+_1)=0{,}0034/0{,}0509\approx0{,}067$, khác $P(+_2)=0{,}0509$. Nếu tỉ lệ mắc là $0{,}01$ thì một lần dương tính đã cho $P(D\mid+)=0{,}0095/0{,}059\approx0{,}161$.
:::

::: exercise Câu hỏi kiểm tra
Rút hai lần không hoàn lại từ $\{-1,1,3\}$. Dùng Mệnh đề C.3 với phân hoạch theo giá trị lần 1 để tính xác suất lần 2 bằng 3. Hai lần rút có độc lập không?
:::

::: solution
$P(\text{lần 2}=3)=\tfrac12\cdot\tfrac13+\tfrac12\cdot\tfrac13+0\cdot\tfrac13=\tfrac13$, bằng xác suất của lần 1. Phân phối của từng lần rút giống nhau, nhưng $P(\text{lần 2}=3\mid\text{lần 1}=3)=0\ne\tfrac13$, nên hai lần rút không độc lập.
:::

## D. Biến ngẫu nhiên và phân phối

Tổng hai xúc xắc và gradient $g_I(\theta)$ là các số gán cho từng kết cục; các biến cố cần xét có dạng giá trị đó bằng hoặc vượt một ngưỡng.

### Biến ngẫu nhiên và hàm khối xác suất

Một biến ngẫu nhiên gán cho mỗi kết cục một số; mọi câu hỏi về nó quy về xác suất của các biến cố "giá trị bằng $x$". Vẽ mỗi giá trị như một cột có chiều cao bằng xác suất của nó; các cột cao tổng cộng bằng 1.

::: example Tổng hai xúc xắc
Trên $\Omega$ của ví dụ hai xúc xắc, đặt $S(i,j)=i+j$. Đếm các cặp cho mỗi tổng:

| $s$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| $36\,P(S=s)$ | 1 | 2 | 3 | 4 | 5 | 6 | 5 | 4 | 3 | 2 | 1 |

Chẳng hạn $P(S\le7)=\tfrac{21}{36}$.
:::

**Định nghĩa D.1 (biến ngẫu nhiên rời rạc (random variable)).** Cho không gian xác suất rời rạc $(\Omega,P)$. Một biến ngẫu nhiên là hàm $X:\Omega\to\mathbb R$. Hàm khối xác suất (probability mass function, PMF) của $X$ là

$$
p_X(x)=P(X=x)=P(\{\omega:X(\omega)=x\}),
$$

khác 0 tại nhiều nhất đếm được giá trị $x$, và $\sum_xp_X(x)=1$ vì các biến cố $\{X=x\}$ phân hoạch $\Omega$.

**Định nghĩa D.2 (hàm phân phối tích lũy (cumulative distribution function, CDF)).** CDF của $X$ là $F_X(x)=P(X\le x)$ với $x\in\mathbb R$. Hàm này không giảm, vì $x\le x'$ kéo theo $\{X\le x\}\subseteq\{X\le x'\}$ (Mệnh đề B.2 (iii)), và có giới hạn $0$ tại $-\infty$, $1$ tại $+\infty$ (Koller và Friedman, 2009, §2.1.3.2, tr. 20–21; Goodfellow và cộng sự, 2016, §3.2–3.3, tr. 56–58).

### Các phân phối rời rạc thường dùng

Phần F so các cận xác suất với xác suất đúng của số mặt ngửa khi tung $n$ đồng xu, nên cần PMF của số này.

::: example Ba đồng xu
Tung ba đồng xu cân đối; tám dãy sấp–ngửa đồng khả năng. Số mặt ngửa $S$ nhận giá trị $k$ trên $\binom3k$ dãy, nên $P(S=0),\dots,P(S=3)$ bằng $\tfrac18,\tfrac38,\tfrac38,\tfrac18$.
:::

**Định nghĩa D.3 (các phân phối rời rạc thường dùng).** Cho $p\in[0,1]$ và $n,N\in\mathbb N_{>0}$.

- Bernoulli$(p)$: $X\in\{0,1\}$, $P(X=1)=p$ (Goodfellow và cộng sự, 2016, §3.9.1, tr. 62).
- Nhị thức$(n,p)$: $P(S=k)=\binom nkp^k(1-p)^{n-k}$, $k=0,\dots,n$.
- Đều trên $\{1,\dots,N\}$: $P(I=i)=\tfrac1N$; chỉ số $I_r$ của một lần rút có phân phối này.
- Hình học$(p)$ với $p>0$: $P(K=k)=(1-p)^{k-1}p$, $k=1,2,\dots$; $K$ là số lần thử tới lần thành công đầu tiên. Tổng các xác suất bằng $p\sum_{k\ge1}(1-p)^{k-1}=1$.

Với phân phối hình học và $0<p<1$, $P(K>k)=(1-p)^k$ vì biến cố $K>k$ là $k$ lần thử đầu đều thất bại. Do đó, với mọi số nguyên $k,m\ge0$,

$$
P(K>k+m\mid K>k)=\frac{(1-p)^{k+m}}{(1-p)^k}=(1-p)^m=P(K>m).
$$

Biết $k$ lần thử đầu thất bại, số lần thử còn lại có cùng phân phối với $K$; tính chất này gọi là tính không nhớ (memorylessness).

**Mệnh đề D.4.** Thực hiện $n$ phép thử, phép thử thứ $i$ cho $X_i\in\{0,1\}$ với $P(X_i=1)=p$, và các biến cố $\{X_i=x_i\}$, $i=1,\dots,n$, độc lập với mọi $(x_1,\dots,x_n)$. Khi đó $S=\sum_iX_i$ có phân phối nhị thức$(n,p)$.

::: proof
Một dãy $(x_1,\dots,x_n)$ có đúng $k$ số 1 có xác suất $p^k(1-p)^{n-k}$ theo Định nghĩa C.5. Có $\binom nk$ dãy như vậy (Mệnh đề B.3 (iv): chọn vị trí của các số 1), và các biến cố tương ứng rời nhau; cộng lại được PMF nhị thức.
:::

Với $n=10$ đồng xu cân đối, $P(S\ge8)=(\binom{10}8+\binom{10}9+\binom{10}{10})/2^{10}=56/1024\approx0{,}0547$.

### Biến liên tục và hàm mật độ

Phân phối dữ liệu $\mathcal P$ thường có giá trị liên tục, chẳng hạn chiều cao hay nhiệt độ. Khi đó mỗi giá trị riêng lẻ có xác suất 0 và PMF không mang thông tin. Có thể hình dung khối lượng xác suất trải liên tục trên trục số, với mật độ là khối lượng trên một đơn vị độ dài; xác suất của một khoảng là diện tích dưới đường mật độ.

::: example Một số đều trong đoạn đơn vị
Chọn một số $X$ trong $[0,1]$ sao cho xác suất rơi vào mỗi đoạn con tỉ lệ với độ dài đoạn: $P(\alpha\le X\le\beta)=\beta-\alpha$ với $0\le\alpha\le\beta\le1$. Mật độ bằng 1 trên $[0,1]$ và 0 ngoài đoạn; $P(X=\tfrac12)=0$.
:::

**Định nghĩa D.5 (biến có mật độ).** Biến $X$ có mật độ $p_X\ge0$, $\int_{\mathbb R}p_X=1$, nếu $P(\alpha\le X\le\beta)=\int_\alpha^\beta p_X(x)\,dx$ với mọi $\alpha\le\beta$; khi đó $F_X(x)=\int_{-\infty}^xp_X$. Phân phối đều trên $[0,1]$ có $p_X=1$ trên đoạn đó. Phân phối Gauss $\mathcal N(\mu,s^2)$, $s>0$, có mật độ

$$
p_X(x)=\frac1{\sqrt{2\pi s^2}}\exp\Bigl(-\frac{(x-\mu)^2}{2s^2}\Bigr);
$$

bài này chỉ phát biểu, không dùng tính chất riêng của nó (Koller và Friedman, 2009, Định nghĩa 2.6–2.7, tr. 28).

Các chứng minh trong bài viết cho trường hợp rời rạc; với biến có mật độ, các kết quả vẫn đúng khi thay tổng theo giá trị bằng tích phân theo mật độ, và các phiên bản đó được dùng không chứng minh.

### Phân phối đồng thời và độc lập của biến ngẫu nhiên

Trung bình mẫu ở phần E và các tích $e^{\lambda X_i}$ ở phần F liên quan tới nhiều biến cùng lúc, nên cần phân phối đồng thời và khái niệm độc lập cho biến. Với hai biến rời rạc, phân phối đồng thời là một bảng: hàng theo giá trị của biến thứ nhất, cột theo biến thứ hai. Hai biến không ảnh hưởng nhau khi mỗi ô bằng tích tổng hàng và tổng cột của nó.

::: example Bảng đồng thời của hai lần rút
Rút hai lần từ $\{-1,1,3\}$; $X_1$, $X_2$ là hai giá trị. Có hoàn lại, cả 9 ô bằng $\tfrac19=\tfrac13\cdot\tfrac13$. Không hoàn lại, ba ô trên đường chéo bằng 0 và sáu ô còn lại bằng $\tfrac16$; ô $(3,3)$ bằng $0\ne\tfrac13\cdot\tfrac13$, dù tổng mỗi hàng và mỗi cột vẫn là $\tfrac13$.
:::

**Định nghĩa D.6 (phân phối đồng thời, độc lập của biến ngẫu nhiên).** PMF đồng thời của $X_1,\dots,X_n$ là $p_{X_1,\dots,X_n}(x_1,\dots,x_n)=P(X_1=x_1,\dots,X_n=x_n)$; PMF của từng biến (PMF lề) nhận được bằng cách cộng theo các biến còn lại. Các biến $X_1,\dots,X_n$ độc lập nếu

$$
p_{X_1,\dots,X_n}(x_1,\dots,x_n)=\prod_{i=1}^np_{X_i}(x_i)\quad\forall\,x_1,\dots,x_n.
$$

Chúng độc lập cùng phân phối (i.i.d.) nếu thêm vào đó mọi $X_i$ có cùng PMF (Koller và Friedman, 2009, §2.1.4.3, tr. 24–25; Goodfellow và cộng sự, 2016, (3.7), tr. 60). Với biến có mật độ, định nghĩa thay PMF bằng mật độ đồng thời; bài này không chứng minh các tính chất của trường hợp đó.

**Mệnh đề D.7.** Nếu $X_1,\dots,X_n$ độc lập và chia thành các khối rời nhau, thì các hàm của từng khối độc lập với nhau. Chẳng hạn $e^{\lambda X_1},\dots,e^{\lambda X_n}$ độc lập, và $X_1+X_2$ độc lập với $X_3$. Mệnh đề được dùng không chứng minh.

Giả thiết G1 viết lại bằng Định nghĩa D.6: các quan sát $X_1,\dots,X_n$ là i.i.d. Với rút có hoàn lại, $I_1,\dots,I_b$ i.i.d. đều trên $\{1,\dots,N\}$; theo Mệnh đề D.7, tại một $\theta$ cố định các gradient $g_{I_1}(\theta),\dots,g_{I_b}(\theta)$ cũng i.i.d.

### Gradient của mẫu được rút

Trong ví dụ ba quan sát, $I$ đều trên $\{1,2,3\}$ và $g_I(\theta)=\theta-y_I$ là một biến ngẫu nhiên nhận ba giá trị $\theta+1$, $\theta-1$, $\theta-3$, mỗi giá trị với xác suất $\tfrac13$. Tại $\theta=0$ ba giá trị là $1,-1,-3$, trung bình cộng $-1=J'(0)$; tại $\theta=1$ là $2,0,-2$, trung bình cộng $0=J'(1)$. Đẳng thức giữa trung bình theo PMF và $\nabla J$ được chứng minh ở phần G.

::: exercise Câu hỏi kiểm tra
Tại $\theta=1$, lập PMF của gradient nhóm $\widehat g=\tfrac12\bigl(g_{I_1}(1)+g_{I_2}(1)\bigr)$ với hai chỉ số rút có hoàn lại.
:::

::: solution
Chín cặp $(I_1,I_2)$ đồng khả năng. Các giá trị $2,1,0,-1,-2$ xuất hiện lần lượt $1,2,3,2,1$ lần, nên PMF là $\tfrac19,\tfrac29,\tfrac39,\tfrac29,\tfrac19$.
:::

## E. Kỳ vọng, phương sai và trung bình mẫu

PMF của $g_I(1)$ gán xác suất $\tfrac13$ cho mỗi giá trị $2,0,-2$; để so gradient mẫu với $\nabla J(1)=0$ cần một số chỉ tâm của PMF và một số đo độ trải quanh tâm đó.

### Kỳ vọng

Tâm của một PMF là điểm cân bằng khi đặt mỗi cột như một khối lượng trên trục số: trung bình các giá trị có trọng số là xác suất. Nếu lặp lại phép thử nhiều lần độc lập, trung bình cộng các kết quả dao động quanh số này; phần F phát biểu điều đó chính xác.

::: example Kỳ vọng của tổng hai xúc xắc
Từ bảng PMF của $S$,

$$
\begin{aligned}
\sum_ss\,P(S=s)&=\frac{2\cdot1+3\cdot2+\dots+7\cdot6+\dots+12\cdot1}{36}\\
&=\frac{252}{36}=7.
\end{aligned}
$$
:::

**Định nghĩa E.1 (kỳ vọng (expectation)).** Cho $X$ rời rạc với $\sum_x\lvert x\rvert p_X(x)<\infty$. Kỳ vọng của $X$ là $\mathbb EX=\sum_xx\,p_X(x)$ (Koller và Friedman, 2009, §2.1.7.1, tr. 31). Với biến có mật độ, $\mathbb EX=\int x\,p_X(x)\,dx$ khi $\int\lvert x\rvert p_X(x)\,dx<\infty$. Khi điều kiện hội tụ tuyệt đối không thỏa, kỳ vọng không xác định; phần F có một ví dụ.

::: example Trò chơi hai xúc xắc
Người chơi trả 1 đơn vị, tung hai xúc xắc, và nhận 10 đơn vị (gồm cả khoản đã trả) khi $S\ge11$. Lợi nhuận $G$ bằng $9$ với xác suất $P(S\ge11)=\tfrac3{36}$ và bằng $-1$ với xác suất $\tfrac{33}{36}$, nên

$$
\mathbb EG=9\cdot\frac3{36}-1\cdot\frac{33}{36}=-\frac16.
$$

Với quy ước "nhận 10 ngoài khoản đã trả", lợi nhuận khi thắng là $10$ và kỳ vọng bằng $-\tfrac1{12}$; quy ước phải ghi rõ trước khi tính.
:::

**Mệnh đề E.2 (kỳ vọng của hàm một biến ngẫu nhiên).** Cho $h:\mathbb R\to\mathbb R$ và $X$ rời rạc với $\sum_x\lvert h(x)\rvert p_X(x)<\infty$. Khi đó

$$
\mathbb Eh(X)=\sum_xh(x)\,p_X(x)=\sum_{\omega\in\Omega}h(X(\omega))\,P(\{\omega\}).
$$

::: proof
$Y=h(X)$ là biến ngẫu nhiên với $p_Y(y)=\sum_{x:h(x)=y}p_X(x)$. Do đó $\mathbb EY=\sum_yy\sum_{x:h(x)=y}p_X(x)=\sum_xh(x)p_X(x)$; đổi thứ tự cộng hợp lệ vì chuỗi hội tụ tuyệt đối. Đẳng thức thứ hai thu được tương tự từ $p_X(x)=\sum_{\omega:X(\omega)=x}P(\{\omega\})$.
:::

Mệnh đề E.2 cho phép tính kỳ vọng của $h(X)$ mà không lập PMF của $h(X)$. Ví dụ, $\mathbb ES^2=\sum_ss^2P(S=s)=\tfrac{1974}{36}$.

### Tính tuyến tính của kỳ vọng và hàm chỉ thị

Trong nhóm $b$ chỉ số rút có hoàn lại từ $N$ mẫu, gọi $D_b$ là số chỉ số khác nhau. PMF của $D_b$ phức tạp. Có thể đếm $D_b$ bằng cách cộng, với mỗi mẫu $j$, số 1 nếu $j$ xuất hiện và số 0 nếu không; kỳ vọng của $D_b$ khi đó là tổng các xác suất xuất hiện, nếu kỳ vọng của một tổng bằng tổng các kỳ vọng.

::: example Tổng hai xúc xắc qua từng xúc xắc
Một xúc xắc $X_1$ có $\mathbb EX_1=\tfrac{1+2+\dots+6}6=3{,}5$. Với $S=X_1+X_2$, $\mathbb EX_1+\mathbb EX_2=7$, trùng giá trị tính từ PMF 11 cột của $S$.
:::

**Định lý E.3 (tính tuyến tính).** Cho $X,Y$ trên cùng $\Omega$ có kỳ vọng và $a,c\in\mathbb R$. Khi đó $\mathbb E[aX+cY]=a\,\mathbb EX+c\,\mathbb EY$. Định lý không cần $X,Y$ độc lập.

::: proof
Theo Mệnh đề E.2 dạng tổng trên $\Omega$, $\mathbb E[aX+cY]=\sum_\omega\bigl(aX(\omega)+cY(\omega)\bigr)P(\{\omega\})$; chuỗi hội tụ tuyệt đối theo bất đẳng thức tam giác, nên tách được thành $a\sum_\omega X(\omega)P(\{\omega\})+c\sum_\omega Y(\omega)P(\{\omega\})$. Lập luận không dùng phân phối đồng thời, nên không cần độc lập (Koller và Friedman, 2009, Mệnh đề 2.4, tr. 32).
:::

Hàm chỉ thị (indicator function) của biến cố $A$ là $\mathbf 1_A(\omega)=1$ nếu $\omega\in A$ và $0$ nếu ngược lại; cũng viết $\mathbf 1\{A\}$.

**Mệnh đề E.4.** (i) $\mathbb E\mathbf 1_A=P(A)$. (ii) Nếu $X\ge0$ thì $\mathbb EX\ge0$. (iii) Nếu $X\le Y$ và cả hai có kỳ vọng thì $\mathbb EX\le\mathbb EY$.

::: proof
(i) $\mathbf 1_A$ nhận giá trị 1 với xác suất $P(A)$. (ii) Mọi số hạng $x\,p_X(x)$ không âm. (iii) Áp (ii) cho $Y-X$ và dùng Định lý E.3.
:::

::: example Số chỉ số khác nhau và số mẫu chưa gặp
Mẫu $j$ không xuất hiện trong $b$ lần rút có hoàn lại với xác suất $(1-\tfrac1N)^b$, vì các lần rút độc lập. Gọi $A_j$ là biến cố mẫu $j$ xuất hiện và viết $D_b=\sum_{j=1}^N\mathbf 1_{A_j}$; Định lý E.3 và Mệnh đề E.4 cho

$$
\mathbb ED_b=N\Bigl(1-\bigl(1-\tfrac1N\bigr)^b\Bigr).
$$

Với $N=1000$, $b=32$: $\mathbb ED_{32}\approx31{,}51$.

Bài 05 ghi rằng với rút có hoàn lại, $N/b$ bước chỉ tương đương $N$ lần đánh giá mẫu, chưa bảo đảm đã gặp mọi mẫu. Sau $N$ lần rút, số mẫu chưa gặp là $T_N=\sum_j\mathbf 1_{A_j^c}$, với $A_j$ tính cho $N$ lần rút, và $\mathbb ET_N/N=(1-\tfrac1N)^N$: bằng $0{,}296$ với $N=3$, $0{,}349$ với $N=10$, $0{,}3677$ với $N=1000$, và tiến tới $e^{-1}\approx0{,}3679$. Trung bình khoảng 37 % mẫu chưa được dùng sau một lượt rút có hoàn lại.
:::

Các chỉ thị trong $D_b$ phụ thuộc nhau, nhưng Định lý E.3 không cần độc lập. Ví dụ sau có sự phụ thuộc mạnh hơn.

::: example Trùng mũ
Trả ngẫu nhiên $n$ chiếc mũ cho $n$ người theo một hoán vị đều. Người $i$ nhận đúng mũ với xác suất $\tfrac1n$, nên số người nhận đúng mũ có kỳ vọng $n\cdot\tfrac1n=1$ với mọi $n$, dù các chỉ thị phụ thuộc nhau: nếu $n-1$ người đã đúng mũ thì người cuối cũng đúng.
:::

### Phương sai và hiệp phương sai

Tại $\theta=1$, gradient một mẫu $g_I(1)$ và gradient nhóm hai mẫu ở cuối phần D đều có kỳ vọng 0, nhưng gradient nhóm tập trung gần 0 hơn: xác suất nhận giá trị $\pm2$ giảm từ $\tfrac23$ xuống $\tfrac29$. Kỳ vọng không phân biệt hai phân phối này. Một số đo độ trải là trung bình của bình phương khoảng cách tới tâm.

::: example Độ trải của tổng hai xúc xắc
Với $\mathbb ES=7$,

$$
\begin{aligned}
\sum_s(s-7)^2P(S=s)&=\frac{25+32+27+16+5+0}{36}\\
&\quad+\frac{5+16+27+32+25}{36}\\
&=\frac{210}{36}=\frac{35}6\approx5{,}83,
\end{aligned}
$$

và căn bậc hai của số này là khoảng $2{,}415$.

![Cột xác suất của tổng từ 2 đến 12, cao nhất tại 7 với 6/36; vạch kỳ vọng tại 7; đoạn một độ lệch chuẩn từ khoảng 4,6 đến 9,4.](img/lec-05c/two-dice-pmf.svg)
:::

**Định nghĩa E.5.** Với số nguyên $k\ge1$, mômen bậc $k$ của $X$ là $\mathbb EX^k$, xác định khi $\mathbb E\lvert X\rvert^k<\infty$. Cho $X$ có mômen bậc hai hữu hạn và $\mu=\mathbb EX$. Phương sai (variance) của $X$ là $\operatorname{Var}X=\mathbb E(X-\mu)^2$; độ lệch chuẩn (standard deviation) là $\sqrt{\operatorname{Var}X}$. Với $X,Y$ có mômen bậc hai hữu hạn, hiệp phương sai (covariance) là $\operatorname{Cov}(X,Y)=\mathbb E\bigl[(X-\mathbb EX)(Y-\mathbb EY)\bigr]$ (Koller và Friedman, 2009, §2.1.7.2, tr. 33; Goodfellow và cộng sự, 2016, (3.12)–(3.14), tr. 61–62).

**Mệnh đề E.6.** $\operatorname{Var}X=\mathbb EX^2-\mu^2$ và $\operatorname{Var}(aX+c)=a^2\operatorname{Var}X$ với $a,c\in\mathbb R$. Tương tự, $\operatorname{Cov}(X,Y)=\mathbb E[XY]-\mathbb EX\,\mathbb EY$.

::: proof
Khai triển $(X-\mu)^2=X^2-2\mu X+\mu^2$ và dùng Định lý E.3. Với $aX+c$, độ lệch khỏi kỳ vọng là $a(X-\mu)$. Công thức của hiệp phương sai thu được bằng cùng cách khai triển.
:::

Kiểm trên hai xúc xắc: $\tfrac{1974}{36}-49=\tfrac{35}6$.

**Mệnh đề E.7.** Nếu $X,Y$ độc lập (Định nghĩa D.6) và có kỳ vọng thì $\mathbb E[XY]=\mathbb EX\,\mathbb EY$; khi thêm mômen bậc hai hữu hạn, $\operatorname{Cov}(X,Y)=0$. Chiều ngược lại sai: với $U$ đều trên $\{-1,0,1\}$ và $V=U^2$, $\operatorname{Cov}(U,V)=0$ nhưng $U,V$ không độc lập.

::: proof
Áp dạng tổng trên $\Omega$ của Mệnh đề E.2 cho biến $XY$, nhóm các kết cục theo cặp giá trị $(X(\omega),Y(\omega))$, rồi dùng Định nghĩa D.6:

$$
\begin{aligned}
\mathbb E[XY]&=\sum_{x,y}xy\,p_{X,Y}(x,y)\\
&=\sum_{x,y}xy\,p_X(x)p_Y(y)\\
&=\Bigl(\sum_xx\,p_X(x)\Bigr)\Bigl(\sum_yy\,p_Y(y)\Bigr),
\end{aligned}
$$

tách được vì chuỗi kép hội tụ tuyệt đối. Phản ví dụ: $\mathbb EU=0$ và $\mathbb E[UV]=\mathbb EU^3=0$, nên $\operatorname{Cov}(U,V)=0$; nhưng $P(U=0,V=0)=\tfrac13\ne P(U=0)P(V=0)=\tfrac19$ (Koller và Friedman, 2009, Mệnh đề 2.5, tr. 32; Goodfellow và cộng sự, 2016, §3.8, tr. 61–62, dùng một phản ví dụ liên tục).
:::

### Phương sai của tổng

Định lý E.9 ở mục sau cần phương sai của tổng $X_1+\dots+X_n$. Mệnh đề E.7 cho hiệp phương sai bằng 0 khi hai biến độc lập, nhưng chưa có công thức nối phương sai của tổng với các phương sai và hiệp phương sai thành phần. Với hai xúc xắc, $X_1+X_1$ và $X_1+X_2$ cùng kỳ vọng 7 nhưng có phương sai khác nhau, nên công thức đó phải chứa các hiệp phương sai.

**Mệnh đề E.8.** Cho $X_1,\dots,X_n$ có mômen bậc hai hữu hạn. Khi đó

$$
\operatorname{Var}\Bigl(\sum_{i=1}^nX_i\Bigr)=\sum_{i=1}^n\operatorname{Var}X_i+2\sum_{i<j}\operatorname{Cov}(X_i,X_j).
$$

Nếu các biến không tương quan đôi một ($\operatorname{Cov}(X_i,X_j)=0$ với $i\ne j$), đặc biệt khi chúng độc lập từng đôi, thì phương sai của tổng bằng tổng các phương sai.

::: proof
Đặt $Y_i=X_i-\mathbb EX_i$. Khi đó $\bigl(\sum_iY_i\bigr)^2=\sum_iY_i^2+2\sum_{i<j}Y_iY_j$; lấy kỳ vọng hai vế bằng Định lý E.3.
:::

Với hai xúc xắc, $\operatorname{Var}X_1=\tfrac{91}6-3{,}5^2=\tfrac{35}{12}$, nên $\operatorname{Var}S=\tfrac{35}{12}+\tfrac{35}{12}=\tfrac{35}6$, khớp phép tính trực tiếp. Tính tuyến tính của kỳ vọng không cần độc lập; phép cộng phương sai thì cần hiệp phương sai bằng 0. Chẳng hạn $\operatorname{Var}(X_1+X_1)=4\operatorname{Var}X_1$, không phải $2\operatorname{Var}X_1$. Giả thiết G1 có mặt trong các kết quả về phương sai vì lý do này (Koller và Friedman, 2009, Mệnh đề 2.6, tr. 33, cho trường hợp độc lập).

### Trung bình mẫu và sai số chuẩn

Hai câu hỏi đầu của phần A hỏi về kỳ vọng và phương sai của $\bar X_n$. Khi lấy trung bình, các độ lệch ngược dấu của từng quan sát bù trừ một phần cho nhau, nên trung bình dao động ít hơn một quan sát.

::: example Gradient nhóm trên ví dụ ba quan sát
Tại $\theta=1$ với rút có hoàn lại, gradient nhóm có kỳ vọng 0 với mọi $b$. Phương sai của nó:

- $b=1$: $\tfrac13(4+0+4)=\tfrac83$;
- $b=2$: từ PMF ở cuối phần D, $\tfrac19(4+2+0+2+4)=\tfrac43$;
- $b=4$: liệt kê 81 dãy chỉ số cho $\tfrac23$.

Phương sai bằng $\tfrac83$ chia cho $b$.

![Ba biểu đồ cột cùng tâm 0: b = 1 có ba giá trị đều nhau, phương sai 8/3; b = 2 có năm giá trị với tần số 1, 2, 3, 2, 1, phương sai 4/3; b = 4 tập trung hơn, phương sai 2/3.](img/lec-05c/batch-gradient-pmf.svg)
:::

**Định lý E.9 (trung bình mẫu).** Cho $X_1,\dots,X_n$ có cùng kỳ vọng $\mu$, cùng phương sai $\sigma_1^2<\infty$ và không tương quan đôi một; điều kiện này đúng khi các biến i.i.d. với phương sai hữu hạn (G1, G2). Khi đó

$$
\mathbb E\bar X_n=\mu,\qquad\operatorname{Var}\bar X_n=\frac{\sigma_1^2}n.
$$

Sai số chuẩn (standard error) của một ước lượng là độ lệch chuẩn của nó; sai số chuẩn của $\bar X_n$ là $\sigma_1/\sqrt n$. Ước lượng có kỳ vọng bằng đại lượng cần ước lượng gọi là ước lượng không chệch (unbiased estimator).

::: proof
Định lý E.3 cho $\mathbb E\bar X_n=\tfrac1n\sum_i\mu=\mu$. Mệnh đề E.6 với $a=\tfrac1n$ và Mệnh đề E.8 với các hiệp phương sai bằng 0 cho $\operatorname{Var}\bar X_n=\tfrac1{n^2}\cdot n\sigma_1^2$.
:::

Định lý E.9 trả lời hai câu hỏi "Tâm" và "Sai số điển hình": $\bar X_n$ không chệch, và sai số chuẩn giảm theo $1/\sqrt n$.

Với gradient nhóm, đặt $X_r=g_{I_r}(\theta)$ và $n=b$: $\widehat g$ có phương sai $\sigma_1^2/b$, ở ví dụ ba quan sát bằng $\tfrac8{3b}$. Phần G so sai số chuẩn $\sigma_1/\sqrt b$ này với chi phí của nhóm, tỉ lệ với $b$.

Ở ví dụ thăm dò, $n=1000$ cử tri, $X_i=1$ nếu người thứ $i$ ủng hộ: $\sigma_1^2=p(1-p)\le\tfrac14$, nên sai số chuẩn không vượt $\sqrt{0{,}25/1000}\approx0{,}0158$ (Goodfellow và cộng sự, 2016, §5.4.3, (5.46), tr. 128).

### Rút không hoàn lại

Thực hành thường rút các chỉ số trong một nhóm không hoàn lại. Ví dụ rút hai lần ở phần C cho thấy các lần rút khi đó phụ thuộc nhau, nên Định lý E.9 không áp dụng nguyên dạng.

::: example Hai chỉ số không hoàn lại
Trong ví dụ ba quan sát tại $\theta=1$, ba cặp chỉ số đồng khả năng cho gradient nhóm $\tfrac{2+0}2=1$, $\tfrac{2-2}2=0$, $\tfrac{0-2}2=-1$. Phương sai là $\tfrac23$, bằng một nửa giá trị $\tfrac43$ khi rút có hoàn lại.
:::

**Mệnh đề E.10 (không hoàn lại).** Cho $N\ge2$ và tập số $\{v_1,\dots,v_N\}$ với trung bình $\bar v$ và $\sigma_1^2=\frac1N\sum_i(v_i-\bar v)^2$. Rút $n\le N$ chỉ số khác nhau $I_1,\dots,I_n$, mọi dãy như vậy đồng khả năng, và đặt $X_r=v_{I_r}$. Khi đó

$$
\mathbb E\bar X_n=\bar v,\qquad\operatorname{Var}\bar X_n=\frac{\sigma_1^2}n\cdot\frac{N-n}{N-1}.
$$

::: proof
Theo tính đối xứng, mỗi $I_r$ đều trên $\{1,\dots,N\}$, nên $\mathbb EX_r=\bar v$ và $\operatorname{Var}X_r=\sigma_1^2$. Với $r\ne s$, cặp $(I_r,I_s)$ đều trên các cặp chỉ số khác nhau, nên $\operatorname{Cov}(X_r,X_s)=c$ không phụ thuộc $r,s$. Khi $n=N$, mọi phần tử được rút đúng một lần và $\sum_rX_r=N\bar v$ là hằng, nên Mệnh đề E.8 cho $0=N\sigma_1^2+N(N-1)c$, tức $c=-\sigma_1^2/(N-1)$. Với $n$ tùy ý, $\operatorname{Var}\sum_{r=1}^nX_r=n\sigma_1^2+n(n-1)c=n\sigma_1^2\frac{N-n}{N-1}$; chia cho $n^2$.
:::

Kiểm: $\tfrac83\cdot\tfrac12\cdot\tfrac12=\tfrac23$ với $N=3$, $n=2$; khi $n=N$ phương sai bằng 0. Hệ số $\frac{N-n}{N-1}\le1$, gần 1 khi $n\ll N$ (Niu, 2024, trang chiếu 162). Lập luận đối xứng cần rút đều; với lấy mẫu có trọng số, công thức khác.

### Kỳ vọng có điều kiện và kỳ vọng toàn phần

Một số đại lượng được tạo qua hai tầng ngẫu nhiên: tầng một chọn một nhánh, tầng hai rút ngẫu nhiên trong nhánh đó. Trong SGD, điểm lặp $\theta_1$ phụ thuộc lần rút đầu, còn gradient ở bước hai phụ thuộc $\theta_1$ và lần rút thứ hai. Kỳ vọng qua cây hai tầng tính được bằng cách lấy trung bình trong từng nhánh, rồi lấy trung bình các nhánh theo xác suất của nhánh.

::: example Monty Hall theo nhánh
Gọi $W=1$ nếu đổi cửa thắng. Nếu xe ở cửa 1 (xác suất $\tfrac13$), đổi cửa thua: trung bình của $W$ trong nhánh là 0. Nếu xe ở cửa 2 hoặc 3 (xác suất $\tfrac23$), người dẫn buộc phải mở cửa dê còn lại và đổi cửa thắng: trung bình trong nhánh là 1. Do đó $\mathbb EW=\tfrac13\cdot0+\tfrac23\cdot1=\tfrac23$.
:::

::: example Cây hai bước của SGD
Ví dụ ba quan sát, $\theta_0=0$, bước $\eta=0{,}1$, nhóm một mẫu: $\theta_1=\theta_0-0{,}1\,g_{I_1}(\theta_0)\in\{-0{,}1;\ 0{,}1;\ 0{,}3\}$, mỗi giá trị với xác suất $\tfrac13$. Biết $\theta_1$, chỉ số $I_2$ rút mới và độc lập với $I_1$, nên trung bình của $g_{I_2}(\theta_1)$ trong nhánh là $\theta_1-1$. Trung bình các nhánh:

$$
\tfrac13\bigl((-1{,}1)+(-0{,}9)+(-0{,}7)\bigr)=-0{,}9.
$$

Cộng trực tiếp trên 9 lá cho cùng kết quả.
:::

**Định nghĩa E.11 (kỳ vọng có điều kiện (conditional expectation)).** Cho $X,Y$ rời rạc, $\mathbb E\lvert X\rvert<\infty$, và $y$ với $P(Y=y)>0$. Đặt $\mathbb E[X\mid Y=y]=\sum_xx\,P(X=x\mid Y=y)$. Biến ngẫu nhiên $\mathbb E[X\mid Y]$ nhận giá trị $\mathbb E[X\mid Y=y]$ khi $Y=y$ (Koller và Friedman, 2009, §2.1.7.1, tr. 32, cho dạng thứ nhất).

**Mệnh đề E.12 (kỳ vọng toàn phần).** Cho $X,Y$ rời rạc với $\mathbb E\lvert X\rvert<\infty$.

1. $\mathbb E\bigl[\mathbb E[X\mid Y]\bigr]=\mathbb EX$.
2. Với $h$ sao cho $\mathbb E\lvert h(Y)X\rvert<\infty$: $\mathbb E[h(Y)X\mid Y]=h(Y)\,\mathbb E[X\mid Y]$.
3. Nếu $X$ độc lập với $Y$ thì $\mathbb E[X\mid Y]=\mathbb EX$.
4. Cho $I$ rời rạc, độc lập với $Y$, và hàm $h$ với $\mathbb E\lvert h(Y,I)\rvert<\infty$. Khi đó, với mọi $y$ có $P(Y=y)>0$ và $\mathbb E\lvert h(y,I)\rvert<\infty$, $\mathbb E[h(Y,I)\mid Y=y]=\mathbb E\,h(y,I)$. $Y$ và $I$ có thể nhận giá trị vectơ rời rạc; với $h$ nhận giá trị vectơ, áp đẳng thức theo từng tọa độ.

::: proof
(1) $\sum_y\mathbb E[X\mid Y=y]P(Y=y)=\sum_y\sum_xx\,P(X=x,Y=y)=\sum_xx\,P(X=x)$; đổi thứ tự cộng hợp lệ vì hội tụ tuyệt đối. (2) Khi $Y=y$, $h(Y)=h(y)$ là hằng và $P(\cdot\mid Y=y)$ là một xác suất (Định nghĩa C.1), nên Định lý E.3 áp dụng. (3) Độc lập cho $P(X=x\mid Y=y)=P(X=x)$. (4) Trên biến cố $Y=y$, $h(Y,I)=h(y,I)$; Mệnh đề E.2 áp cho xác suất $P(\cdot\mid Y=y)$ cho $\mathbb E[h(Y,I)\mid Y=y]=\sum_ih(y,i)P(I=i\mid Y=y)$. Độc lập cho $P(I=i\mid Y=y)=P(I=i)$, và Mệnh đề E.2 cho tổng bằng $\mathbb E\,h(y,I)$.
:::

Ở cây hai bước, (1) là phép lấy trung bình các nhánh. Trung bình trong nhánh là (4) với $Y=\theta_1$, $I=I_2$ và $h(t,i)=g_i(t)=t-y_i$: $\mathbb E[g_{I_2}(\theta_1)\mid\theta_1=t]=\mathbb E\,g_{I_2}(t)=t-1$. Phần G dùng (1)–(4) để dẫn xuất sai số của SGD qua nhiều bước.

::: exercise Câu hỏi kiểm tra
Trong cây hai bước, tính $\mathbb E(\theta_1-1)^2$ bằng hai cách: từ PMF của $\theta_1$, và bằng Mệnh đề E.6 với $\mathbb E\theta_1$ và $\operatorname{Var}\theta_1$.
:::

::: hint
$\theta_1-1=-1-0{,}1\,g_{I_1}(0)$, và $\operatorname{Var}g_{I_1}(0)=\tfrac83$.
:::

::: solution
Từ PMF: $\tfrac13(1{,}21+0{,}81+0{,}49)=\tfrac{2{,}51}3\approx0{,}837$. Cách thứ hai: $\mathbb E\theta_1-1=-0{,}9$ và $\operatorname{Var}\theta_1=0{,}01\cdot\tfrac83\approx0{,}0267$, nên $\mathbb E(\theta_1-1)^2=0{,}0267+0{,}81\approx0{,}837$.
:::

## F. Bất đẳng thức xác suất

Phương sai $\sigma_1^2/n$ đo sai số bình phương trung bình; câu hỏi "Xác suất sai lệch" của phần A, tức xác suất để một lần ước lượng lệch quá $\varepsilon$, cần một bất đẳng thức chuyển mômen thành xác suất.

### Bất đẳng thức Markov

Giả sử chỉ biết kỳ vọng của một đại lượng $Z\ge0$. Nếu một phần khối lượng $q$ nằm ở các giá trị không nhỏ hơn $\varepsilon$, phần đó đã đóng góp ít nhất $q\varepsilon$ vào kỳ vọng; kỳ vọng nhỏ thì $q$ không thể lớn.

::: example Đuôi phải của tổng hai xúc xắc
$S\ge0$ và $\mathbb ES=7$. Xác suất đúng là $P(S\ge11)=\tfrac3{36}=\tfrac1{12}\approx0{,}083$. Lập luận trên cho $11\cdot P(S\ge11)\le7$, tức $P(S\ge11)\le\tfrac7{11}\approx0{,}636$.
:::

**Định lý F.1 (bất đẳng thức Markov).** Cho $Z\ge0$ với $\mathbb EZ<\infty$ và $\varepsilon>0$. Khi đó

$$
P(Z\ge\varepsilon)\le\frac{\mathbb EZ}\varepsilon.
$$

Dấu bằng xảy ra khi và chỉ khi $P\bigl(Z\in\{0,\varepsilon\}\bigr)=1$ (Koller và Friedman, 2009, Bài tập 2.12, tr. 40; Boyd và Vandenberghe, 2004, §7.4.1, tr. 374–375).

::: proof
Với mọi kết cục, $Z\ge\varepsilon\,\mathbf 1\{Z\ge\varepsilon\}$: nếu $Z\ge\varepsilon$ hai vế là $Z$ và $\varepsilon$; nếu không, vế phải bằng 0 và $Z\ge0$. Mệnh đề E.4 (iii) và (i) cho $\mathbb EZ\ge\varepsilon P(Z\ge\varepsilon)$. Dấu bằng đòi hỏi $Z=\varepsilon\mathbf 1\{Z\ge\varepsilon\}$ với xác suất 1, tức $Z$ chỉ nhận hai giá trị $0$ và $\varepsilon$; ngược lại khi đó hai vế bằng nhau.
:::

Ứng dụng: số mẫu chưa gặp $T_N$ sau $N$ lần rút có hoàn lại (phần E) có $\mathbb ET_N=N(1-\tfrac1N)^N$. Với $N=1000$,

$$
P\bigl(T_N\ge\tfrac N2\bigr)\le\frac{N(1-1/N)^N}{N/2}=2\cdot0{,}3677\approx0{,}735.
$$

Cận chỉ dùng kỳ vọng nên lỏng; các mục sau dùng thêm phương sai và tính độc lập.

### Bất đẳng thức Chebyshev

Ở ví dụ trên, cận $\tfrac7{11}$ gấp gần tám lần xác suất đúng và không dùng phương sai $\tfrac{35}6$ đã tính ở phần E. Áp Markov cho đại lượng không âm $(S-7)^2$, có kỳ vọng bằng phương sai, đưa phương sai vào cận.

::: example Độ lệch của tổng hai xúc xắc
Biến cố $\lvert S-7\rvert\ge4$ gồm $S\in\{2,3,11,12\}$, có xác suất đúng $\tfrac{1+2+2+1}{36}=\tfrac16$. Định lý F.1 cho $(S-7)^2$ và ngưỡng $16$:

$$
\begin{aligned}
P(\lvert S-7\rvert\ge4)&=P\bigl((S-7)^2\ge16\bigr)\\
&\le\frac{35/6}{16}=\frac{35}{96}\approx0{,}365.
\end{aligned}
$$
:::

**Hệ quả F.2 (bất đẳng thức Chebyshev).** Cho $X$ với $\operatorname{Var}X<\infty$, $\mu=\mathbb EX$, và $t>0$. Khi đó

$$
P(\lvert X-\mu\rvert\ge t)\le\frac{\operatorname{Var}X}{t^2}.
$$

::: proof
$\{\lvert X-\mu\rvert\ge t\}=\{(X-\mu)^2\ge t^2\}$; áp Định lý F.1 với $Z=(X-\mu)^2$ và $\varepsilon=t^2$.
:::

Đây là cận hai phía; dùng nó cho một biến cố một phía như $P(X-\mu\ge t)$ vẫn đúng nhưng lỏng hơn (Koller và Friedman, 2009, Định lý 2.1, tr. 33–34, và Bài tập 2.13, tr. 40).

### Luật số lớn yếu

Hệ quả F.2 nói về một biến, còn câu hỏi "Xác suất sai lệch" liên quan tới $\bar X_n$ khi $n$ tăng. Ghép Định lý E.9 với Hệ quả F.2 cho câu trả lời.

::: example Tần suất mặt ngửa
Tung $n$ đồng xu cân đối; $\bar X_n$ là tỉ lệ mặt ngửa, $\mu=\tfrac12$, $\sigma_1^2=\tfrac14$. Xác suất hai phía $P(\lvert\bar X_n-\tfrac12\rvert\ge0{,}1)$, tính đúng bằng tổng nhị thức, và cận Chebyshev $\tfrac{1/4}{n\cdot0{,}01}=\tfrac{25}n$:

| $n$ | 10 | 20 | 50 | 100 | 200 |
|---|---:|---:|---:|---:|---:|
| xác suất đúng | $0{,}754$ | $0{,}503$ | $0{,}203$ | $0{,}0569$ | $0{,}00569$ |
| Chebyshev (hai phía) | $2{,}5$ | $1{,}25$ | $0{,}5$ | $0{,}25$ | $0{,}125$ |

Cận lớn hơn 1 khi $n<25$ (trong bảng: $n=10$, $20$) và không cho thông tin; sau đó giảm theo $1/n$.
:::

**Định lý F.3 (luật số lớn yếu (weak law of large numbers)).** Cho $X_1,X_2,\dots$ i.i.d. (G1) với $\sigma_1^2<\infty$ (G2) và $\mu=\mathbb EX_1$. Với mọi $\varepsilon>0$,

$$
P(\lvert\bar X_n-\mu\rvert\ge\varepsilon)\le\frac{\sigma_1^2}{n\varepsilon^2}\xrightarrow[n\to\infty]{}0.
$$

::: proof
Định lý E.9 cho $\mathbb E\bar X_n=\mu$ và $\operatorname{Var}\bar X_n=\sigma_1^2/n$; áp Hệ quả F.2 cho $\bar X_n$ với $t=\varepsilon$.
:::

Với trò chơi hai xúc xắc ở phần E, lợi nhuận trung bình sau $n$ ván độc lập nằm trong khoảng $(-\tfrac16-\varepsilon,-\tfrac16+\varepsilon)$ với xác suất tiến tới 1 (Koller và Friedman, 2009, Phụ lục A.2.1, tr. 1144).

### Cận Chernoff

Với $n=100$ đồng xu, xác suất đúng $P(S\ge75)$ là $2{,}82\cdot10^{-7}$, còn Chebyshev cho $P(\lvert S-50\rvert\ge25)\le\tfrac{25}{625}=0{,}04$. Cận Chebyshev giảm theo $1/n$, trong khi xác suất đúng giảm theo hàm mũ của $n$. Áp Markov cho $e^{\lambda X}$ thay cho $(X-\mu)^2$: hàm mũ tăng nhanh nên khuếch đại phần đuôi xa, và với tổng các biến độc lập, $e^{\lambda\sum X_i}$ là tích các thừa số độc lập.

::: example Một đồng xu
Hàm sinh mômen (moment generating function) của một biến $X$ là $M_X(\lambda)=\mathbb Ee^{\lambda X}$, $\lambda\in\mathbb R$; giá trị này có thể bằng $+\infty$. Với $X$ Bernoulli$(\tfrac12)$, đặt $W=2X-1\in\{-1,1\}$, mỗi giá trị với xác suất $\tfrac12$. Khi đó $M_W(\lambda)=\tfrac12(e^\lambda+e^{-\lambda})=\cosh\lambda$. Tại $\lambda=1$: $\cosh1=\tfrac{e+e^{-1}}2\approx1{,}543$, nhỏ hơn $e^{1/2}\approx1{,}649$. Bước 1 trong chứng minh Định lý F.6 chứng minh $\cosh\lambda\le e^{\lambda^2/2}$ với mọi $\lambda$; cận Chernoff cần đúng loại cận này cho hàm sinh mômen.
:::

**Định lý F.4 (cận Chernoff, dạng tổng quát).** Cho biến ngẫu nhiên $X$ và $a\in\mathbb R$. Khi đó

$$
P(X\ge a)\le\inf_{\lambda\ge0}e^{-\lambda a}\,\mathbb Ee^{\lambda X},
$$

trong đó vế phải có thể bằng $+\infty$, với quy ước $\mathbb EZ=+\infty$ khi $Z\ge0$ và chuỗi $\sum_zz\,p_Z(z)$ phân kỳ (Boyd và Vandenberghe, 2004, §7.4.2, tr. 379).

::: proof
Với $\lambda=0$ vế phải bằng 1. Với $\lambda>0$, hàm $x\mapsto e^{\lambda x}$ tăng chặt, nên $\{X\ge a\}=\{e^{\lambda X}\ge e^{\lambda a}\}$; Định lý F.1 với $Z=e^{\lambda X}$ và $\varepsilon=e^{\lambda a}$ cho $P(X\ge a)\le e^{-\lambda a}\mathbb Ee^{\lambda X}$. Lấy cận dưới đúng theo $\lambda$.
:::

Chứng minh của Định lý F.1, Hệ quả F.2 và Định lý F.4 dùng cùng một ý: hàm chỉ thị của biến cố bị chặn trên bởi một hàm không âm có kỳ vọng tính được.

![Ba khung hình: hàm bậc thang bị chặn trên bởi đường thẳng z/ε, bởi parabol ((x−μ)/t)² và bởi hàm mũ exp(λ(x−a)).](img/lec-05c/indicator-dominating-functions.svg)

**Mệnh đề F.5.** Nếu $X_1,\dots,X_n$ độc lập và $\mathbb Ee^{\lambda X_i}<\infty$ với mọi $i$, thì $\mathbb Ee^{\lambda\sum_iX_i}=\prod_i\mathbb Ee^{\lambda X_i}$.

::: proof
Quy nạp theo $n$. Theo Mệnh đề D.7, $e^{\lambda(X_1+\dots+X_{n-1})}$ và $e^{\lambda X_n}$ độc lập; Mệnh đề E.7 tách kỳ vọng của tích.
:::

**Định lý F.6 (cận Chernoff cho đồng xu cân đối).** Cho $X_1,\dots,X_n$ i.i.d. Bernoulli$(\tfrac12)$, $S=\sum_iX_i$ và $\varepsilon>0$. Khi đó

$$
P\Bigl(S-\frac n2\ge n\varepsilon\Bigr)\le e^{-2n\varepsilon^2}.
$$

::: proof
Đặt $W_i=2X_i-1$; khi đó $\sum_iW_i=2S-n$ và biến cố cần chặn là $\sum_iW_i\ge2n\varepsilon$.

*Bước 1.* Khai triển Taylor của $e^{\pm\lambda}$ cho $\cosh\lambda=\sum_{k\ge0}\frac{\lambda^{2k}}{(2k)!}$. Vì $(2k)!=\prod_{j=1}^k(2j)(2j-1)\ge\prod_{j=1}^k2j=2^kk!$,

$$
\cosh\lambda\le\sum_{k\ge0}\frac{(\lambda^2/2)^k}{k!}=e^{\lambda^2/2}.
$$

*Bước 2.* Định lý F.4 và Mệnh đề F.5 cho, với mọi $\lambda\ge0$,

$$
\begin{aligned}
&P\Bigl(\sum_iW_i\ge2n\varepsilon\Bigr)\\
&\quad\le e^{-2n\varepsilon\lambda}(\cosh\lambda)^n\\
&\quad\le\exp\Bigl(-2n\varepsilon\lambda+\frac{n\lambda^2}2\Bigr).
\end{aligned}
$$

*Bước 3.* Số mũ nhỏ nhất tại $\lambda=2\varepsilon$, với giá trị $-4n\varepsilon^2+2n\varepsilon^2=-2n\varepsilon^2$.
:::

Định lý F.6 cùng dạng với Koller và Friedman (2009, Định lý A.3, tr. 1145) khi $p=\tfrac12$. Với $n=100$ và $S\ge75$, tức $\varepsilon=0{,}25$, cận là $e^{-12{,}5}\approx3{,}73\cdot10^{-6}$: lớn hơn xác suất đúng $2{,}82\cdot10^{-7}$ khoảng 13 lần, nhưng nhỏ hơn cận Chebyshev $0{,}04$ khoảng $10^4$ lần.

### Bất đẳng thức Hoeffding và cỡ mẫu

Định lý F.6 chỉ áp dụng cho đồng xu cân đối. Tỉ lệ lỗi phân loại có $p$ chưa biết, và một tọa độ gradient bị chặn nằm trong một khoảng khác $[-1,1]$. Bước 1 của chứng minh trên cần được thay bằng một cận cho hàm sinh mômen của biến bị chặn bất kỳ.

**Bổ đề F.7 (bổ đề Hoeffding).** Nếu $Y\in[m,M]$ với xác suất 1 và $\mathbb EY=0$, thì $\mathbb Ee^{\lambda Y}\le e^{\lambda^2(M-m)^2/8}$ với mọi $\lambda\in\mathbb R$.

Bổ đề không được chứng minh trong bài. Với $[m,M]=[-1,1]$, cận bằng $e^{\lambda^2/2}$, trùng cận $\cosh\lambda\le e^{\lambda^2/2}$ đã chứng minh trực tiếp trong Định lý F.6.

**Định lý F.8 (bất đẳng thức Hoeffding).** Cho $X_1,\dots,X_n$ độc lập, $X_i\in[m_i,M_i]$ với xác suất 1 (G3), và $\varepsilon>0$. Khi đó

$$
P\bigl(\bar X_n-\mathbb E\bar X_n\ge\varepsilon\bigr)\le\exp\Bigl(-\frac{2n^2\varepsilon^2}{\sum_{i=1}^n(M_i-m_i)^2}\Bigr),
$$

và cận hai phía cho $P(\lvert\bar X_n-\mathbb E\bar X_n\rvert\ge\varepsilon)$ gấp đôi vế phải.

::: proof
Đặt $Y_i=X_i-\mathbb EX_i$: $\mathbb EY_i=0$ và $Y_i$ nằm trong một khoảng độ dài $M_i-m_i$. Đặt $V=\sum_i(M_i-m_i)^2$. Định lý F.4, Mệnh đề F.5 (các $Y_i$ độc lập theo Mệnh đề D.7) và Bổ đề F.7 cho, với $\lambda\ge0$,

$$
P\Bigl(\sum_iY_i\ge n\varepsilon\Bigr)\le\exp\Bigl(-\lambda n\varepsilon+\frac{\lambda^2V}8\Bigr).
$$

Chọn $\lambda=4n\varepsilon/V$ được số mũ $-2n^2\varepsilon^2/V$. Áp cùng lập luận cho $-Y_i$ và dùng Mệnh đề B.4 cho cận hai phía.
:::

Koller và Friedman (2009, Định lý A.3, tr. 1145) phát biểu định lý cho trường hợp Bernoulli.

**Hệ quả F.9 (cỡ mẫu).** Cho $X_1,\dots,X_n$ i.i.d. trong $[m,M]$ với kỳ vọng $\mu$, và $\varepsilon,\delta\in(0,1)$. Nếu

$$
n\ge\frac{(M-m)^2\ln(2/\delta)}{2\varepsilon^2}
$$

thì $P(\lvert\bar X_n-\mu\rvert\ge\varepsilon)\le\delta$. Định lý F.3 cho cùng kết luận khi $n\ge\sigma_1^2/(\delta\varepsilon^2)$.

::: proof
Định lý F.8 với mọi $M_i-m_i=M-m$ cho cận hai phía $2\exp\bigl(-2n\varepsilon^2/(M-m)^2\bigr)$; cận này không vượt $\delta$ khi và chỉ khi $n$ thỏa điều kiện trên. Với Chebyshev, giải $\sigma_1^2/(n\varepsilon^2)\le\delta$.
:::

Cỡ mẫu theo Hoeffding tăng theo $\ln(1/\delta)$, theo Chebyshev tăng theo $1/\delta$. Với biến Bernoulli, Hệ quả F.9 trùng cỡ mẫu nêu ngay sau công thức (12.3) của Koller và Friedman (2009, §12.1.2, tr. 490–491).

### So sánh ba cận

Ba cận dùng thông tin khác nhau (kỳ vọng; phương sai; tính bị chặn và độc lập) và có phía khác nhau, nên việc chọn cận cho một bài toán cỡ mẫu cần so chúng trên cùng một phân phối. Bảng sau so ba cận với xác suất đúng của số mặt ngửa $S$ khi tung $n=100$ đồng xu cân đối. Markov dùng $\mathbb ES=50$ cho biến cố một phía; Chebyshev là cận hai phía cho $\lvert S-50\rvert\ge k-50$; cột cuối là cận mũ một phía của Định lý F.6, trùng cận của Định lý F.8 với $[m_i,M_i]=[0,1]$.

| biến cố | xác suất đúng | Markov (một phía) | Chebyshev (hai phía) | Định lý F.6 (một phía) |
|---|---:|---:|---:|---:|
| $S\ge60$ | $0{,}0284$ | $50/60\approx0{,}833$ | $0{,}25$ | $e^{-2}\approx0{,}135$ |
| $S\ge75$ | $2{,}82\cdot10^{-7}$ | $50/75\approx0{,}667$ | $0{,}04$ | $3{,}73\cdot10^{-6}$ |

![Thang logarit, k từ 55 đến 80. Tại k = 60: xác suất đúng 0,0284, cận mũ một phía của Định lý F.6 0,135, Chebyshev hai phía 0,25, Markov 0,833. Tại k = 75: đúng 2,8·10⁻⁷, Định lý F.6 3,7·10⁻⁶, Chebyshev 0,04, Markov 0,667. Tại k = 80 xác suất đúng là 5,6·10⁻¹⁰.](img/lec-05c/coin-tail-three-bounds.svg)

Ở độ lệch nhỏ, cận Hoeffding hai phía có thể lớn hơn cận Chebyshev. Với tần suất mặt ngửa và $\varepsilon=0{,}1$, cận Hoeffding hai phía $2e^{-2n\cdot0{,}01}$ bằng $1{,}64$; $1{,}34$; $0{,}736$; $0{,}271$; $0{,}0366$ tại $n=10,20,50,100,200$. Tại $n=50$ và $n=100$ nó lớn hơn cận Chebyshev ($0{,}5$ và $0{,}25$); trong bảng, chỉ từ $n=200$ nó nhỏ hơn ($0{,}0366$ so với $0{,}125$), và điểm cắt là $n=108$. Với đồng xu, phương sai $\tfrac14$ đã là giá trị lớn nhất của một biến trong $[0,1]$, nên hai cận dùng cùng thông tin; khác biệt đến từ thừa số 2 của cận hai phía và từ việc $e^{-2n\varepsilon^2}$ chỉ vượt trội $\tfrac1{4n\varepsilon^2}$ khi $n\varepsilon^2$ đủ lớn.

![n từ 10 đến 200: xác suất đúng giảm từ 0,754 xuống 0,0057; Chebyshev và Hoeffding hai phía lớn hơn 1 tại n = 10 và 20 (cận vô nghĩa); Chebyshev nhỏ hơn Hoeffding tại n = 50 và 100; Hoeffding nhỏ hơn tại n = 200 (0,037 so với 0,125).](img/lec-05c/lln-deviation-vs-n.svg)

**Nhận xét F.10.** Cho $X_1,X_2,\dots$ i.i.d. với $\mu=\mathbb EX_1$ và $0<\sigma_1<\infty$. Định lý giới hạn trung tâm (central limit theorem) phát biểu rằng phân phối của $\sqrt n(\bar X_n-\mu)/\sigma_1$ tiến tới $\mathcal N(0,1)$ khi $n\to\infty$ (Koller và Friedman, 2009, Định lý A.2, tr. 1144). Với $Z\sim\mathcal N(0,1)$, $P(\lvert Z\rvert\ge1{,}96)\approx0{,}05$; do đó $P(\lvert\bar X_n-\mu\rvert\ge\varepsilon)\approx0{,}05$ khi $\varepsilon\sqrt n/\sigma_1\approx1{,}96$, tức $n\approx(1{,}96\,\sigma_1/\varepsilon)^2$ (Goodfellow và cộng sự, 2016, (5.47), tr. 128). Đây là phát biểu giới hạn, không phải cận đúng với một $n$ hữu hạn, nên bài này không dùng nó để chứng minh bảo đảm.

::: example Ví dụ thăm dò
Thăm dò $n=1000$ cử tri, $X_i\in\{0,1\}$, $\sigma_1^2\le\tfrac14$. Cận hai phía cho $P(\lvert\bar X_n-p\rvert\ge\varepsilon)$:

| $\varepsilon$ | Chebyshev | Hoeffding (hai phía) |
|---|---:|---:|
| $0{,}03$ | $0{,}278$ | $0{,}331$ |
| $0{,}05$ | $0{,}100$ | $0{,}0135$ |

Cỡ mẫu để sai lệch dưới $\varepsilon=0{,}03$ với xác suất ít nhất $0{,}95$ ($\delta=0{,}05$): Chebyshev cần $n\ge5556$, Hoeffding cần $n\ge2050$; xấp xỉ của Nhận xét F.10 với $\sigma_1=\tfrac12$ cho $n\approx1068$.
:::

**Nhận xét F.11 (đuôi nặng).** Khi $\mathbb E\lvert X\rvert=\infty$ hoặc $\sigma_1^2=\infty$, Định lý E.9, Hệ quả F.2 và Định lý F.3 không áp dụng.

::: example Nghịch lý St. Petersburg
Tung đồng xu cân đối tới lần đầu ra mặt ngửa, ở lần thứ $K$; người chơi nhận $2^K$. Vì $P(K=k)=2^{-k}$, chuỗi $\sum_k2^k\cdot2^{-k}$ phân kỳ và kỳ vọng không xác định theo Định nghĩa E.1. Nếu khoản nhận được là $\min(2^K,2^{20})$, kỳ vọng bằng $\sum_{k=1}^{20}1+2^{20}\cdot2^{-20}=21$.

Nghịch lý nằm ở khoảng cách giữa tổng phân kỳ này và mức giá mà trực giác coi là hợp lý để vào chơi, thường chỉ vài đơn vị. Trung bình khoản nhận sau $n$ ván độc lập không ổn định quanh một hằng số mà tăng dần, theo bậc $\log_2n$ (phát biểu không chứng minh), nên Định lý F.3 không áp dụng.
:::

Một dạng khác của cận Chernoff chặn sai lệch tương đối so với $p$ và hữu ích khi $p$ nhỏ (Koller và Friedman, 2009, Định lý A.4, tr. 1145); bài này không dùng dạng đó.

::: exercise Câu hỏi kiểm tra
Với ví dụ thăm dò, tính cỡ mẫu để $P(\lvert\bar X_n-p\rvert\ge0{,}05)\le0{,}01$ theo Chebyshev và theo Hoeffding.
:::

::: solution
Chebyshev: $n\ge\frac{0{,}25}{0{,}01\cdot0{,}0025}=10\,000$. Hoeffding: $n\ge\frac{\ln200}{2\cdot0{,}0025}\approx1059{,}7$, tức $n\ge1060$. Khi $\delta$ giảm 5 lần so với $0{,}05$, cỡ mẫu Chebyshev tăng 5 lần, còn cỡ mẫu Hoeffding chỉ tăng theo $\ln(2/\delta)$.
:::

## G. Mất mát trung bình trên nhóm nhỏ

Hệ quả F.9 cho cỡ mẫu của một lần ước lượng. Các mục đầu của phần G áp phần E và F cho mất mát và gradient tại một tham số cố định; các mục sau xét SGD, nơi gradient được ước lượng lại ở mọi bước, nên cỡ nhóm $b$ quyết định cả sai số của mỗi bước lẫn số bước đi được với cùng chi phí.

### Rủi ro kỳ vọng và rủi ro thực nghiệm

Bài 05 nói rằng tại một tham số cố định, mất mát trung bình trên tập xác thực là ước lượng không chệch của rủi ro kỳ vọng, nhưng chưa chứng minh và chưa cho cỡ tập. Mất mát trung bình trên một tập dữ liệu là một cuộc thăm dò: mỗi mẫu là một "cử tri" trả lời bằng mất mát của nó. Với mất mát 0–1, $\ell=1$ khi phân loại sai và $0$ khi đúng, tỉ lệ lỗi trên $n$ mẫu chính là ví dụ thăm dò của phần E và F với $p$ là tỉ lệ lỗi thật. Với $n=1000$ mẫu và tỉ lệ lỗi thật $0{,}1$, sai số chuẩn của tỉ lệ lỗi đo được là $\sqrt{0{,}1\cdot0{,}9/1000}\approx0{,}0095$.

**Định nghĩa G.1 (nhắc Bài 05).** Cho mô hình $f_\theta$, mất mát $\ell$ và phân phối sinh dữ liệu $\mathcal P$. Rủi ro kỳ vọng là $R(\theta)=\mathbb E_{(X,Y)\sim\mathcal P}\,\ell(f_\theta(X),Y)$. Trên tập $\{(x_i,y_i)\}_{i=1}^N$, rủi ro thực nghiệm (empirical risk) là $J(\theta)=\frac1N\sum_i\ell_i(\theta)$ với $\ell_i(\theta)=\ell(f_\theta(x_i),y_i)$.

**Định lý G.2.** Cho $\theta$ cố định, không phụ thuộc tập dữ liệu (G4); các cặp $(x_i,y_i)$ i.i.d. theo $\mathcal P$; $\operatorname{Var}\ell(f_\theta(X),Y)<\infty$. Khi đó $\mathbb EJ(\theta)=R(\theta)$ và $\operatorname{Var}J(\theta)=\operatorname{Var}\ell(f_\theta(X),Y)/N$. Nếu thêm $\ell\in[0,1]$ thì $P(\lvert J(\theta)-R(\theta)\rvert\ge\varepsilon)\le2e^{-2N\varepsilon^2}$.

::: proof
Các $\ell_i(\theta)$ là hàm của các cặp i.i.d. nên i.i.d. (Mệnh đề D.7), với kỳ vọng $R(\theta)$. Định lý E.9 cho hai đẳng thức; Định lý F.8 với $[m_i,M_i]=[0,1]$ cho cận xác suất.
:::

::: example Cỡ tập xác thực
Với mất mát 0–1, để tỉ lệ lỗi trên tập xác thực lệch khỏi tỉ lệ lỗi thật dưới $\varepsilon=0{,}01$ với xác suất ít nhất $0{,}95$, Hệ quả F.9 cho $N\ge\frac{\ln40}{2\cdot10^{-4}}\approx18\,444{,}4$, tức $N\ge18\,445$. Chebyshev với $\sigma_1^2\le\tfrac14$ cần $N\ge50\,000$.
:::

Định lý G.2 có hai hạn chế. Mất mát entropy chéo không bị chặn, nên chỉ còn phát biểu về kỳ vọng và phương sai. Nếu tập xác thực được dùng để chọn mô hình hay thời điểm dừng, tham số được chọn phụ thuộc chính tập đó, G4 không còn đúng, và mất mát xác thực của tham số được chọn thường thấp hơn rủi ro kỳ vọng (Bài 05; Goodfellow và cộng sự, 2016, §5.3, tr. 121).

### Gradient nhóm nhỏ không chệch

Mệnh đề về gradient nhóm của Bài 05 dùng tính tuyến tính của kỳ vọng và tính độc lập của các lần rút; phần E đã dựng cả hai. Ở ví dụ ba quan sát, gradient nhóm có trung bình $0=J'(1)$ và phương sai $\tfrac8{3b}$ tại $\theta=1$; tại $\theta=0$, gradient một mẫu có trung bình $-1=J'(0)$.

**Định lý G.3 (gradient nhóm nhỏ).** Cho tập dữ liệu cố định và $\theta\in\mathbb R^d$ cố định (G4); mọi $\ell_i$ khả vi tại $\theta$; $g_i=\nabla\ell_i(\theta)$ và

$$
\Sigma(\theta)=\frac1N\sum_{i=1}^N\bigl(g_i-\nabla J(\theta)\bigr)\bigl(g_i-\nabla J(\theta)\bigr)^T.
$$

Với $I_1,\dots,I_b$ i.i.d. đều trên $\{1,\dots,N\}$ (G1) và $\widehat g=\frac1b\sum_rg_{I_r}$:

$$
\begin{aligned}
\mathbb E\widehat g&=\nabla J(\theta),\qquad\operatorname{Cov}\widehat g=\frac{\Sigma(\theta)}b,\\
\mathbb E\lVert\widehat g-\nabla J(\theta)\rVert^2&=\frac{\operatorname{tr}\Sigma(\theta)}b.
\end{aligned}
$$

Nếu $N\ge2$ và $I_1,\dots,I_b$ là $b\le N$ chỉ số khác nhau rút đều không hoàn lại, hai đẳng thức sau nhân thêm $\frac{N-b}{N-1}$.

::: proof
Xét tọa độ $j$: các $[g_{I_r}]_j$ i.i.d. với kỳ vọng $\frac1N\sum_i[g_i]_j=[\nabla J(\theta)]_j$ (Mệnh đề E.2) và phương sai $\Sigma_{jj}$. Định lý E.9 cho $\mathbb E[\widehat g]_j=[\nabla J]_j$ và $\operatorname{Var}[\widehat g]_j=\Sigma_{jj}/b$. Với hai tọa độ $j,k$, $\operatorname{Cov}([\widehat g]_j,[\widehat g]_k)=\frac1{b^2}\sum_{r,s}\operatorname{Cov}([g_{I_r}]_j,[g_{I_s}]_k)$; các số hạng $r\ne s$ bằng 0 theo Mệnh đề E.7, còn $b$ số hạng $r=s$ bằng $\Sigma_{jk}$. Cộng các phương sai tọa độ được vết. Khi không hoàn lại, Mệnh đề E.10 áp cho từng tọa độ và cho $[g]_j+[g]_k$; hiệp phương sai suy ra từ $\operatorname{Cov}(U,V)=\tfrac12\bigl(\operatorname{Var}(U+V)-\operatorname{Var}U-\operatorname{Var}V\bigr)$.
:::

Bài 05 ký hiệu số chiều tham số là $p$ và số đặc trưng là $d$; ở đây $d$ là số chiều tham số vì $p$ đã là xác suất Bernoulli, và với hồi quy logistic tuyến tính hai số này trùng nhau. Định lý G.3 là mệnh đề về gradient nhóm của Bài 05, nay đặt trên các kết quả của phần E. Định lý nói về $\nabla J$, với các mẫu rút lại từ một tập hữu hạn; khi các mẫu được lấy mới từ phân phối dữ liệu và không dùng lại, gradient nhóm là ước lượng không chệch của $\nabla R$ (Goodfellow và cộng sự, 2016, §8.1.3, tr. 280–281).

### Cận xác suất cho sai số gradient nhóm

Định lý G.3 cho sai số bình phương trung bình; một bước SGD cần biết xác suất gradient nhóm lệch xa.

::: example Ba cận cho gradient nhóm
Ví dụ ba quan sát tại $\theta=1$, rút có hoàn lại (cần thiết vì $b>N=3$). Gradient mẫu nằm trong $[-2,2]$, độ rộng 4, và có phương sai $\tfrac83$. Với $\varepsilon=1$, cận hai phía của Chebyshev là $\tfrac8{3b}$, của Hoeffding là $2e^{-2b/16}=2e^{-b/8}$:

| $b$ | $P(\lvert\widehat g\rvert\ge1)$ đúng | Chebyshev | Hoeffding |
|---:|---:|---:|---:|
| 4 | $0{,}370$ | $0{,}667$ | $1{,}21$ |
| 16 | $0{,}0199$ | $0{,}167$ | $0{,}271$ |
| 32 | $6{,}2\cdot10^{-4}$ | $0{,}0833$ | $0{,}0366$ |
| 64 | $8{,}1\cdot10^{-7}$ | $0{,}0417$ | $6{,}7\cdot10^{-4}$ |

Cả hai cận lỏng; trong bảng, Hoeffding nhỏ hơn Chebyshev từ $b=32$ (điểm cắt là $b=23$).
:::

::: example Gradient logistic trên nhiều tọa độ
Hồi quy logistic với nhãn $y_i\in\{-1,+1\}$ và đặc trưng $a_i\in[-1,1]^d$ (Bài 01, §4.2), mất mát $\ell_i(\theta)=\ln\bigl(1+\exp(-y_ia_i^T\theta)\bigr)$. Gradient $\nabla\ell_i(\theta)=-y_ia_i/\bigl(1+\exp(y_ia_i^T\theta)\bigr)$ có mọi tọa độ trong $[-1,1]$. Định lý F.8 cho mỗi tọa độ $P(\lvert[\widehat g]_j-[\nabla J]_j\rvert\ge\varepsilon)\le2e^{-b\varepsilon^2/2}$, và Mệnh đề B.4 trên $d$ tọa độ cho xác suất có ít nhất một tọa độ lệch quá $\varepsilon$ không vượt $2de^{-b\varepsilon^2/2}$. Để xác suất này không vượt $\delta$ cần $b\ge2\ln(2d/\delta)/\varepsilon^2$. Với $d=1000$, $\varepsilon=0{,}1$, $\delta=0{,}05$: $b\ge2120$. Số chiều chỉ ảnh hưởng tới cỡ nhóm qua $\ln d$.
:::

### Mất mát trung bình và mất mát tổng

Câu hỏi "Trung bình hay tổng" của phần A xuất phát từ việc một số chương trình cộng mất mát trên nhóm thay vì lấy trung bình. Gradient nhóm dạng tổng bằng $b\,\widehat g$, nên theo Định lý G.3 cả kỳ vọng $b\nabla J(\theta)$ lẫn độ lệch quanh kỳ vọng đều nhân $b$. Bước học $\eta$ khi đó có tác dụng như bước $\eta b$ với mất mát trung bình, và ngưỡng bước an toàn phụ thuộc $b$; khi cộng trên toàn bộ dữ liệu, ngưỡng phụ thuộc $N$.

::: example Mất mát tổng trên ví dụ ba quan sát
Với mất mát tổng trên nhóm và bước $\eta=0{,}1$, gradient nhóm là $\sum_r(\theta-y_{I_r})=b(\theta-1)-\sum_r(y_{I_r}-1)$, nên

$$
\theta^+-1=(1-0{,}1b)(\theta-1)+0{,}1\sum_{r=1}^b(y_{I_r}-1).
$$

Hệ số co của phần tất định là $0{,}9$ khi $b=1$, $0{,}6$ khi $b=4$, $-0{,}6$ khi $b=16$ (đổi dấu nhưng vẫn co) và $-2{,}2$ khi $b=32$ (phân kỳ). Ở ví dụ này $L=J''=1$, nên có hai mốc: $b=10$ ứng với $\eta b=1/L$, nơi hệ số bằng 0 và đổi dấu; $b>20$ ứng với $\eta bL>2$, nơi phần tất định phân kỳ ($b=20$ cho hệ số $-1$). Với mất mát trung bình, hệ số bằng $0{,}9$ với mọi $b$.

![Với mất mát tổng, hệ số co giảm tuyến tính theo b, đổi dấu tại b = 10 (ηb = 1/L) và ra khỏi dải trị tuyệt đối nhỏ hơn 1 khi b > 20 (ηbL > 2); với mất mát trung bình, hệ số bằng 0,9 với mọi b.](img/lec-05c/sum-vs-mean-contraction.svg)
:::

**Mệnh đề G.4 (tổng và trung bình).** Đặt $\widetilde J=NJ$ (mất mát tổng trên dữ liệu) và $\widetilde g=b\,\widehat g$ (gradient nhóm dạng tổng). (i) Một bước $\eta$ với $\widetilde g$ trùng một bước $\eta b$ với $\widehat g$. (ii) Nếu $\nabla J$ là $L$-Lipschitz thì $\nabla\widetilde J$ là $NL$-Lipschitz, và điều kiện bước $\eta\le1/L$ của phương pháp hạ gradient (Bài 04) áp cho $\widetilde J$ thành $\eta\le1/(NL)$. (iii) Với gradient nhóm dạng tổng, phần tất định của một bước là $\theta-\eta b\nabla J(\theta)$, nên cùng điều kiện thành $\eta\le1/(bL)$. (iv) Trong trường hợp vô hướng, $\operatorname{Var}\widetilde g=b\,\sigma_1^2$, tăng theo $b$, trong khi $\operatorname{Var}\widehat g=\sigma_1^2/b$.

::: proof
(i) $\theta-\eta\widetilde g=\theta-(\eta b)\widehat g$. (ii) $\lVert\nabla\widetilde J(\theta)-\nabla\widetilde J(\theta')\rVert=N\lVert\nabla J(\theta)-\nabla J(\theta')\rVert\le NL\lVert\theta-\theta'\rVert$. (iii) Theo (i) và Định lý G.3, $\mathbb E[\theta-\eta\widetilde g]=\theta-\eta b\nabla J(\theta)$; đây là một bước hạ gradient với bước $\eta b$ trên $J$, nên điều kiện $\eta b\le1/L$ cho $\eta\le1/(bL)$. (iv) Mệnh đề E.6 với $a=b$ và Định lý E.9.
:::

Với mất mát trung bình, điều kiện ổn định $\eta\le1/L$ không phụ thuộc $b$ và $N$. Điều kiện này không xác định bước tốt nhất. Giá trị giới hạn của sai số ở mục ngân sách phụ thuộc cả $\eta$ lẫn $b$, nên bước tốt nhất có thể đổi theo $b$. Ở ví dụ ba quan sát, $J''=1$ nên $L=1$ và $\eta=0{,}1$ thỏa điều kiện.

### Hiệu suất giảm dần theo cỡ nhóm

Câu hỏi "Cỡ nhóm" của phần A bắt đầu từ nhận xét của Goodfellow và cộng sự: 10 000 mẫu tốn gấp 100 lần 100 mẫu nhưng chỉ giảm sai số chuẩn 10 lần. Theo Định lý E.9, sai số chuẩn của $\widehat g$ tỉ lệ với $1/\sqrt b$ trong khi chi phí tỉ lệ với $b$.

::: example Sai số chuẩn theo cỡ nhóm
Ở ví dụ ba quan sát, sai số chuẩn là $\sqrt{8/(3b)}$:

| $b$ | 1 | 4 | 16 | 64 | 100 | 10 000 |
|---|---:|---:|---:|---:|---:|---:|
| sai số chuẩn | $1{,}633$ | $0{,}816$ | $0{,}408$ | $0{,}204$ | $0{,}163$ | $0{,}0163$ |

![Tăng b từ 1 lên 100 làm chi phí tăng 100 lần và sai số chuẩn giảm 10 lần, từ 1,63 xuống 0,163.](img/lec-05c/stderr-and-cost-vs-b.svg)
:::

::: example Dữ liệu lặp
Lấy $N=3m$ mẫu gồm $m$ bản sao của mỗi giá trị $-1,1,3$. Khi đó $J$, $\nabla J$ và phân phối của $\widehat g$ không phụ thuộc $m$, vì tỉ lệ ba giá trị không đổi. Gradient đầy đủ tốn $3mC$, gradient nhóm tốn $bC$. Với $m=10^6$ và $b=30$, sai số chuẩn là $\sqrt{8/90}\approx0{,}298$ với chi phí 30 gradient mẫu, so với $3\cdot10^6$ cho gradient đầy đủ. Goodfellow và cộng sự (2016, §8.1.3, tr. 278) nêu trường hợp cực đoan khi mọi mẫu là bản sao của nhau.
:::

**Mệnh đề G.5 (hiệu suất giảm dần).** Dưới giả thiết của Định lý G.3, trong trường hợp vô hướng, $\widehat g$ có sai số chuẩn $\sigma_1/\sqrt b$ và chi phí $bC$. Nhân $b$ với $k^2$ nhân chi phí với $k^2$ và chia sai số chuẩn cho $k$.

::: proof
Định lý E.9 với $n=b$.
:::

### Cỡ nhóm dưới ngân sách tính toán cố định

Mệnh đề G.5 so sánh một bước. Với ngân sách $B$ gradient mẫu, cỡ nhóm $b$ cho $K=\lfloor B/b\rfloor$ bước; nhóm lớn hơn cho gradient chính xác hơn nhưng ít bước hơn. Ví dụ ba quan sát cho phép tính chính xác sai số sau $K$ bước.

::: derivation Sai số sau K bước
Với $\theta_0=0$ và bước $\eta$, $\theta_{k+1}=\theta_k-\eta\widehat g_k$, trong đó $\widehat g_k=(\theta_k-1)-\zeta_k$ và $\zeta_k$ là trung bình của $y_{I_r}-1\in\{-2,0,2\}$ trên nhóm thứ $k$. Nhóm thứ $k$ được rút mới, độc lập với các nhóm trước; $\theta_k$ chỉ phụ thuộc các nhóm trước, nên $\zeta_k$ độc lập với $\theta_k$ (Mệnh đề D.7). Điều kiện này thay cho G4, vì $\theta_k$ không cố định. Theo Định lý G.3 tại $\theta=1$, $\mathbb E\zeta_k=0$ và $\mathbb E\zeta_k^2=\sigma_1^2/b$ với $\sigma_1^2=\tfrac83$. Từ

$$
\theta_{k+1}-1=(1-\eta)(\theta_k-1)+\eta\zeta_k,
$$

bình phương rồi lấy kỳ vọng có điều kiện theo $\theta_k$: Mệnh đề E.12 (2) và (3) cho số hạng chéo $2\eta(1-\eta)(\theta_k-1)\mathbb E[\zeta_k\mid\theta_k]=0$ và $\mathbb E[\zeta_k^2\mid\theta_k]=\sigma_1^2/b$. Lấy kỳ vọng toàn phần (Mệnh đề E.12 (1)) cho $a_k=\mathbb E(\theta_k-1)^2$:

$$
a_{k+1}=(1-\eta)^2a_k+\frac{\eta^2\sigma_1^2}b.
$$

Dãy này tiến tới giá trị giới hạn $\frac{\eta^2\sigma_1^2/b}{1-(1-\eta)^2}=\frac{\eta\sigma_1^2}{b(2-\eta)}$. Với $\eta=0{,}1$ và $a_0=1$: $a_{k+1}=0{,}81a_k+\frac8{300b}$, giá trị giới hạn $\bar a_b=\frac8{57b}\approx\frac{0{,}1404}b$, và $a_K=0{,}81^K+\bar a_b(1-0{,}81^K)$.
:::

Ở ví dụ này độ cong $J''$ bằng 1. Bài 05b nêu cùng giá trị giới hạn cho hàm bậc hai một chiều với độ cong $c>0$ bất kỳ, $\frac{\eta\sigma^2}{c(2-\eta c)}$, và cận trên $\eta\sigma^2/c$ cho hàm lồi mạnh (định lý T5), với $c$ là hằng số lồi mạnh mà Bài 05b ký hiệu là $\mu$.

::: example Ngân sách cố định
Lấy tập $N=3000$ mẫu (1 000 bản sao mỗi giá trị) để $b$ chạy tới 3 000; theo ví dụ dữ liệu lặp, phân phối của $\widehat g$ không đổi. Quy ước $b=N$ là một bước gradient đầy đủ không nhiễu, $a_1=0{,}81$.

Bước $\eta=0{,}1$ trên hàm có độ cong 1 mô hình một tình huống nhiều chiều. Trong bài toán nhiều chiều, bước bị chặn bởi độ cong lớn nhất, $\eta\le1/L_{\max}$. Theo một hướng có độ cong $0{,}1L_{\max}$ (số điều kiện $\kappa=10$), bước $\eta=1/L_{\max}$ chỉ co sai số theo hướng đó với hệ số $1-0{,}1=0{,}9$, đúng hệ số của ví dụ một chiều. Bài 04 cho hệ số co $1-1/\kappa$ với bước $1/L$, và $(1-1/\kappa)^k\le e^{-k/\kappa}$, nên với gradient đầy đủ, đủ $k\ge\kappa\ln(1/\varepsilon)$ bước để sai số giảm còn $\varepsilon$ lần ban đầu; theo đúng hướng đó hệ số co là $0{,}9$, nên cũng cần $\ln(1/\varepsilon)/\ln(10/9)\approx9{,}5\ln(1/\varepsilon)$ bước.

| $b$ | $K$ khi $B=3000$ | $a_K$ khi $B=3000$ | $a_K$ khi $B=300$ |
|---:|---:|---:|---:|
| 1 | 3 000 | $0{,}140$ | $0{,}140$ |
| 10 | 300 | $0{,}0140$ | $0{,}0158$ |
| 30 | 100 | $0{,}00468$ | $0{,}126$ |
| 75 | 40 | $0{,}00209$ | $0{,}432$ |
| 100 | 30 | $0{,}00320$ | $0{,}532$ |
| 300 | 10 | $0{,}122$ | $0{,}810$ |
| 1 000 | 3 | $0{,}532$ | $b>B$ |
| 3 000 | 1 | $0{,}810$ | $b>B$ |

Với $B=3000$, đáy trên mọi $b$ nguyên là $b=75$ ($K=40$, $a_K\approx0{,}00209$); $b=100$ chỉ tốt hơn các giá trị $1,10,30,300,1000,3000$. Với $B=300$, đáy là $b=10$. Nhóm nhỏ quá thì $a_K$ dừng ở giá trị giới hạn $\bar a_b$ lớn; nhóm lớn quá thì còn ít bước và số hạng $0{,}81^K$ lớn. Gradient đầy đủ, một bước, cho $0{,}810$.

![Hai đường dạng chữ U của a_K theo b, thang logarit ở cả hai trục, K bằng phần nguyên của B/b. Với B = 3000: 0,140 tại b = 1, đáy 0,00209 tại b = 75, 0,00320 tại b = 100, 0,810 tại b = 3000 (một bước gradient đầy đủ). Với B = 300: 0,140 tại b = 1, đáy 0,0158 tại b = 10, 0,810 tại b = 300.](img/lec-05c/budget-u-curve.svg)
:::

Ví dụ có ba hạn chế. Thứ nhất, $\eta$ giữ cố định cho mọi $b$, và bảng chỉ mô tả hướng có độ cong nhỏ so với $1/\eta$; trong chính bài toán một chiều này, $\eta=1$ cho gradient đầy đủ đạt nghiệm sau một bước. Thứ hai, các nhóm rút có hoàn lại. Thứ ba, chi phí chỉ đếm số gradient mẫu, trong khi phần cứng tính song song $b$ gradient trong thời gian gần bằng một gradient khi $b$ chưa vượt mức song song của phần cứng (Goodfellow và cộng sự, 2016, §8.1.3, tr. 279).

Với $\theta$ cố định, Định lý G.2 cho $J(\theta)$ lệch khỏi $R(\theta)$ cỡ $1/\sqrt N$. Với tham số học được, phụ thuộc chính dữ liệu, Bottou và Bousquet dùng cận đều trên cả lớp mô hình và thu được cùng bậc (Sra, Nowozin và Wright, 2011, chương 13, tr. 357). Vì vậy tối ưu $J$ tới sai số nhỏ hơn bậc đó không cải thiện bậc của cận trên sai số đối với $R$; Nhận xét G.6 phát biểu kết luận này cho độ chính xác tối ưu $\rho$, không cho $\nabla J$.

**Nhận xét G.6 (Bottou và Bousquet).** Sai số dư của mô hình học được, lấy kỳ vọng theo tập huấn luyện, tách thành $\mathcal E=\mathcal E_{\rm app}+\mathcal E_{\rm est}+\mathcal E_{\rm opt}$: sai số xấp xỉ của lớp mô hình, sai số ước lượng do dữ liệu hữu hạn, sai số tối ưu do tối ưu không chính xác. Khi ràng buộc chính là thời gian tính toán, giảm sai số tối ưu, tức độ chính xác $\rho$ mà thuật toán đạt khi cực tiểu hóa $J$, xuống dưới bậc của sai số ước lượng không cải thiện bậc của cận trên, và thời gian tiết kiệm được dùng để xử lý thêm mẫu (Sra, Nowozin và Wright, 2011, chương 13, (13.2), tr. 354; §13.2.3, tr. 354–355; §13.3.2, Bảng 13.2, tr. 362). Đây là phát biểu về bậc của cận trên tiệm cận, không về một lần chạy; Bảng 13.2 so bốn thuật toán, và SGD ở đó dùng một mẫu mỗi vòng.

### Gradient nhóm trong giả thiết H6 và H6b

Bài 05b phát biểu các định lý hội tụ của SGD dưới hai giả thiết về gradient ngẫu nhiên. Bài 05b viết $x_k$, $f$, $g_k$ cho điểm lặp, hàm mục tiêu và gradient ngẫu nhiên; trong ký hiệu của bài này đó là $\theta_k$, $J$, $\widehat g_k$, còn $\mathcal F_k$ là lịch sử, tức các nhóm đã rút trước bước $k$. Hai giả thiết là

- H6: $\mathbb E[\widehat g_k\mid\mathcal F_k]=\nabla J(\theta_k)$;
- H6b: $\mathbb E\bigl[\lVert\widehat g_k-\nabla J(\theta_k)\rVert^2\mid\mathcal F_k\bigr]\le\sigma^2$.

Bài 05b gọi Mệnh đề E.12 (1) với điều kiện theo $\mathcal F_k$ là tính chất tháp. Khi nhóm ở mỗi bước được rút mới, độc lập với lịch sử, Mệnh đề E.12 (4), với $Y$ là lịch sử và $I$ là nhóm thứ $k$, đưa kỳ vọng có điều kiện về kỳ vọng tại $\theta=\theta_k$ cố định, và Định lý G.3 cho H6.

**Nhận xét G.7.** Với cùng điều kiện, Mệnh đề E.12 (4) và Định lý G.3 cho H6b với $\sigma^2=\sup_\theta\operatorname{tr}\Sigma(\theta)/b$ khi cận trên này hữu hạn. Ở ví dụ ba quan sát, $g_i(\theta)-\nabla J(\theta)=1-y_i$ không phụ thuộc $\theta$, nên $\operatorname{tr}\Sigma=\tfrac83$ với mọi $\theta$ và $\sigma^2=\tfrac8{3b}$, đúng hằng số Bài 05b dùng cho Ví dụ A. Giá trị $\bar a_b=\frac8{57b}$ của mục trước là giá trị giới hạn chính xác mà Bài 05b tính cho Ví dụ A ($b=4$: $\tfrac2{57}\approx0{,}035$); sàn nhiễu $\frac4{15b}$ của định lý T5 ($b=4$: $\approx0{,}0667$) là cận trên của nó, gần gấp đôi. Giả thiết H6a của Bài 05b chặn $\mathbb E[\lVert\widehat g_k\rVert^2\mid\mathcal F_k]$ bởi một hằng số; ở ví dụ ba quan sát, giả thiết này chỉ đúng khi $\theta_k$ nằm trong một đoạn bị chặn, vì $\lVert\nabla J(\theta)\rVert=\lvert\theta-1\rvert$ không bị chặn. Bất đẳng thức Markov mà Bài 05b gọi là BĐ6 là Định lý F.1.

::: exercise Câu hỏi kiểm tra
Với ngân sách $B=3000$, $\eta=0{,}1$, $\theta_0=0$, tính $a_K$ khi $b=50$ và so với $b=75$.
:::

::: solution
$K=60$, $0{,}81^{60}\approx3{,}2\cdot10^{-6}$, $\bar a_{50}=\frac8{57\cdot50}\approx0{,}00281$, nên $a_{60}\approx0{,}00281$, lớn hơn $0{,}00209$ của $b=75$. Với $b=50$ số hạng $0{,}81^K$ chỉ cỡ $10^{-6}$, nên sai số gần bằng giá trị giới hạn $\bar a_b$, và giá trị này còn giảm khi tăng $b$.
:::

## H. Bảng tra, phạm vi áp dụng và câu hỏi tự kiểm

Các câu hỏi của phần A có câu trả lời ở các phần E, F, G; bảng dưới đây xếp theo năm câu hỏi, kèm giả thiết cần dùng.

### Bảng tra theo các câu hỏi

| Câu hỏi | Kết quả | Giả thiết | Phần |
|---|---|---|---|
| Tâm | $\mathbb E\bar X_n=\mu$ (Định lý E.9); $\mathbb EJ(\theta)=R(\theta)$ (Định lý G.2); $\mathbb E\widehat g=\nabla J$ (Định lý G.3) | kỳ vọng hữu hạn; $\theta$ cố định | E, G |
| Sai số điển hình | $\operatorname{Var}\bar X_n=\sigma_1^2/n$; hệ số $\frac{N-n}{N-1}$ khi không hoàn lại; $\operatorname{Cov}\widehat g=\Sigma/b$ | không tương quan đôi một, hoặc rút đều không hoàn lại | E, G |
| Xác suất sai lệch | Markov: $\mathbb EZ/\varepsilon$; Chebyshev và luật số lớn yếu: $\sigma_1^2/(n\varepsilon^2)$; Hoeffding hai phía: $2e^{-2n\varepsilon^2/(M-m)^2}$. Cỡ mẫu (Hệ quả F.9) tăng theo $\ln(1/\delta)$ với Hoeffding, theo $1/\delta$ với Chebyshev | $Z\ge0$; phương sai hữu hạn; độc lập và bị chặn | F, G |
| Trung bình hay tổng | Mệnh đề G.4: với mất mát trung bình, điều kiện ổn định $\eta\le1/L$ không đổi khi đổi $b$, $N$; với tổng trên nhóm, $\eta\le1/(bL)$; bước tốt nhất vẫn có thể đổi theo $b$ | gradient $L$-Lipschitz | G |
| Cỡ nhóm | Sai số chuẩn giảm theo $1/\sqrt b$, chi phí tăng theo $b$ (Mệnh đề G.5). Dưới ngân sách $B$, $a_K$ có dạng chữ U theo $b$, đáy ở $b\ll N$ ($b=75$ khi $B=3000$, $a_K\approx0{,}00209$), còn một bước gradient đầy đủ cho $0{,}810$. Với dữ liệu dư thừa, sai số của nhóm không phụ thuộc $N$; Nhận xét G.6 | nhóm rút mới ở mỗi bước; $\eta$ cố định | G |

### Phạm vi áp dụng

- Các kết quả của phần G là về một tham số cố định (G4). Mục ngân sách cố định vượt G4 nhờ điều kiện nhóm ở mỗi bước được rút mới, độc lập với lịch sử. Khi tham số được chọn bằng chính tập xác thực, ước lượng rủi ro thường lạc quan.
- Đệ quy $a_K$ và Nhận xét G.7 dùng nhóm rút mới, có hoàn lại, ở mỗi bước. Với xáo trộn theo lượt, H6 không đúng khi điều kiện theo lịch sử trong lượt, vì mẫu đã dùng không xuất hiện lại trong lượt đó; từ lượt thứ hai, gradient nhóm là ước lượng chệch của $\nabla R$ (Goodfellow và cộng sự, 2016, §8.1.3, tr. 280–281). Mệnh đề E.10 chỉ xử lý một nhóm.
- Ví dụ ngân sách giữ $\eta$ cố định cho mọi $b$; nó không so các cách chỉnh $\eta$ theo $b$ hay giảm bước theo thời gian.
- Mô hình chi phí đếm số gradient mẫu, bỏ qua tính song song và bộ nhớ.
- Phân phối đuôi nặng làm mất kỳ vọng hoặc phương sai hữu hạn (Nhận xét F.11).
- Định lý giới hạn trung tâm chỉ cho xấp xỉ, không cho cận với $n$ hữu hạn (Nhận xét F.10).
- Chuẩn hóa theo lô (Bài 06) làm mất mát của một mẫu phụ thuộc các mẫu khác trong cùng nhóm; khi đó mất mát nhóm không còn là trung bình của các số hạng độc lập và Định lý G.3 không áp dụng.
- Bài 06 lấy trung bình các điểm lặp (trung bình Polyak); các điểm lặp phụ thuộc nhau, nên Mệnh đề E.8 có thêm các số hạng hiệp phương sai và công thức chia cho số điểm của Định lý E.9 không áp dụng nguyên dạng.

Định lý G.3 và Nhận xét G.7 cho điều kiện để H6, H6b của Bài 05b đúng. Buổi 12 dùng trung bình mẫu và cỡ mẫu theo Hoeffding cho suy diễn dựa trên mẫu.

### Câu hỏi tự kiểm

::: exercise Câu hỏi 1
Với tập dữ liệu lặp ($m=10^6$ bản sao mỗi giá trị $-1,1,3$), tính sai số chuẩn của gradient nhóm $b=120$ tại $\theta=1$.
:::

::: solution
$\sqrt{8/(3\cdot120)}=\sqrt{1/45}\approx0{,}149$. Rút không hoàn lại nhân phương sai với $\frac{N-b}{N-1}\approx1$ vì $N=3\cdot10^6$.
:::

::: exercise Câu hỏi 2
Một tập xác thực có $N=5000$ mẫu, mất mát 0–1. Với $\delta=0{,}05$, Định lý G.2 bảo đảm tỉ lệ lỗi đo được lệch khỏi tỉ lệ lỗi thật không quá bao nhiêu?
:::

::: solution
Giải $2e^{-2N\varepsilon^2}=\delta$: $\varepsilon=\sqrt{\ln40/(2\cdot5000)}\approx0{,}0192$. Bảo đảm cần tham số không được chọn bằng chính tập này.
:::

::: exercise Câu hỏi 3
Với ngân sách $B=600$ gradient mẫu, $\eta=0{,}1$, $\theta_0=0$, so $a_K$ của $b=10$ và $b=60$.
:::

::: solution
$b=10$: $K=60$, $a_{60}\approx0{,}81^{60}+\frac8{570}\approx0{,}0140$. $b=60$: $K=10$, $0{,}81^{10}\approx0{,}1216$, $\bar a_{60}\approx0{,}00234$, $a_{10}\approx0{,}1216+0{,}00234\cdot0{,}878\approx0{,}124$. Cỡ nhóm 10 cho sai số nhỏ hơn gần chín lần, vì với $b=60$ chỉ còn 10 bước.
:::

Mất mát trên nhóm nhỏ lấy trung bình vì hai lý do định lượng: điều kiện bước $\eta\le1/L$ không phụ thuộc $b$ và $N$ (Mệnh đề G.4), trong khi với $\eta=0{,}1$ ở ví dụ ba quan sát, mất mát tổng làm phần tất định phân kỳ khi $b>20$ còn mất mát trung bình giữ hệ số $0{,}9$; phương sai của gradient nhóm giảm theo $1/b$ thay vì tăng theo $b$ như với tổng. Nhóm nhỏ thay cho toàn bộ dữ liệu vì sai số chuẩn chỉ giảm theo $1/\sqrt b$ trong khi chi phí tăng theo $b$: với ngân sách 3 000 gradient mẫu ở ví dụ ba quan sát, $b=75$ cho $a_K\approx0{,}00209$, còn một bước gradient đầy đủ cho $0{,}810$, với cùng bước $\eta=0{,}1$ (mô hình một hướng có độ cong nhỏ, mục ngân sách ở phần G); ngoài ra $J$ chỉ ước lượng $R$ với sai số cỡ $1/\sqrt N$ (Định lý G.2), nên tối ưu $J$ chính xác hơn bậc đó không cải thiện bậc của cận trên sai số đối với $R$.

## Tài liệu tham khảo

1. Daphne Koller và Nir Friedman (2009), *Probabilistic Graphical Models*, MIT Press: §2.1 (tr. 15–34); Bài tập 2.12–2.13 (tr. 40); §12.1.2 (tr. 490–491); Phụ lục A.2 (tr. 1143–1146).
2. Ian Goodfellow, Yoshua Bengio và Aaron Courville (2016), *Deep Learning*, MIT Press: §3.2–3.11 (tr. 56–71); §5.3 (tr. 121); §5.4.2–5.4.3 (tr. 124–129); §8.1.3 (tr. 277–282).
3. Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press: §7.4 (tr. 374–383).
4. Suvrit Sra, Sebastian Nowozin và Stephen J. Wright (biên tập, 2011), *Optimization for Machine Learning*, MIT Press: chương 13, Léon Bottou và Olivier Bousquet (tr. 352–362).
5. Yi-Shuai Niu (2024), *Optimization Methods for Machine Learning*, BIMSA Open Course, trang chiếu 160–169; chỉ dùng để đối chiếu Mệnh đề E.10.
6. Học liệu Bài 00, 01, 04, 05, 05b, 06 của học phần.

Markov, Chebyshev, luật số lớn yếu, Chernoff và Hoeffding là kết quả chuẩn; chứng minh trong ghi chú tự xây dựng, phát biểu đối chiếu tài liệu 1 và 3; bổ đề Hoeffding chỉ được nêu. Sinh nhật, Monty Hall, St. Petersburg, trùng mũ là ví dụ kinh điển; mọi số liệu tính trực tiếp, không mô phỏng.
