# Bài 05c — Xác suất cơ bản, bất đẳng thức tập trung và mất mát trung bình trên nhóm nhỏ

Bài bổ trợ này không có buổi riêng trong đề cương; nội dung chỉ được trình bày dưới dạng học liệu đọc. Chương dựng lại xác suất từ không gian mẫu để chứng minh các khẳng định về gradient nhóm nhỏ mà Bài 05 dùng, và dẫn tới câu trả lời định lượng cho hai câu hỏi: vì sao mất mát được lấy trung bình trên nhóm nhỏ (minibatch), và vì sao nhóm nhỏ được dùng thay cho toàn bộ tập dữ liệu.

## Mục tiêu học tập

Đề cương không có chuẩn đầu ra bài học (LLO) riêng cho xác suất. Chương làm nền cho hai chuẩn đầu ra của buổi 5: LLO11 (phân biệt tối ưu trong học máy với tối ưu thuần túy, đóng góp chuẩn đầu ra học phần CLO1) và LLO12 (hiểu và áp dụng phương pháp hạ gradient ngẫu nhiên, đóng góp CLO2), và chuẩn bị cho LLO27 của buổi 12; mục tiêu chỉ thuộc xác suất không ghi LLO.

Sau chương này, người học có thể:

1. Lập không gian xác suất cho một phép thử, tính xác suất bằng phép đếm và chặn xác suất của một hợp biến cố bằng bất đẳng thức hợp (union bound) (Mục 1).
2. Tính xác suất có điều kiện, áp dụng công thức xác suất toàn phần và công thức Bayes (Bayes' rule), kiểm tra tính độc lập của biến cố và phân biệt độc lập với độc lập có điều kiện (Mục 2).
3. Lập hàm khối xác suất và hàm phân phối tích lũy của một biến ngẫu nhiên, nhận ra các phân phối Bernoulli, nhị thức, đều, hình học, và biểu diễn gradient của một mẫu được rút như một biến ngẫu nhiên (Mục 3; LLO12, CLO2).
4. Tính kỳ vọng, phương sai, hiệp phương sai; chứng minh trung bình mẫu là ước lượng không chệch với phương sai $\sigma_1^2/n$, tính hệ số hiệu chỉnh khi rút không hoàn lại, và tính kỳ vọng qua kỳ vọng có điều kiện (Mục 4; LLO12, CLO2).
5. Chứng minh và áp dụng các bất đẳng thức Markov, Chebyshev, Chernoff và Hoeffding; tính cỡ mẫu và khoảng tin cậy cho một kỳ vọng (Mục 5; LLO11, CLO1; chuẩn bị LLO27).
6. Chứng minh gradient nhóm là ước lượng không chệch với phương sai giảm theo cỡ nhóm, giải thích vì sao mất mát được lấy trung bình thay cho tổng, và chọn cỡ nhóm dưới một ngân sách tính toán cố định (Mục 6; LLO11, LLO12; CLO1, CLO2).
7. Nhận ra khi giả thiết độc lập bị vi phạm trong huấn luyện và đánh giá mô hình, và ước lượng hậu quả bằng số trên một trường hợp cụ thể (Tình huống áp dụng; LLO11, LLO12; CLO1, CLO2).

## Kiến thức tiên quyết

Số hiệu `01.k`, `04.k` và `05.k` chỉ ghi chú Bài 01, Bài 04 và Bài 05. Ghi chú Bài 00 không đánh số, nên các kết quả của nó được dẫn theo tên mục. Ghi chú bổ trợ Bài 05b được dẫn bằng tên khái niệm kèm phát biểu lại.

- **Ôn tập xác suất** (Bài 00, các mục "Xác suất một biến" và "Xác suất nhiều biến"). Bài 00 nêu định nghĩa không gian xác suất $(\Omega,\mathcal F,\Pr)$, biến ngẫu nhiên, hàm khối xác suất (PMF), mật độ, kỳ vọng, phương sai, độc lập và công thức Bayes, kèm ví dụ nhưng không chứng minh các quy tắc tính, và không nối chúng với gradient nhóm. Chương này chứng minh các quy tắc đó cho trường hợp rời rạc, thêm các bất đẳng thức tập trung, và dùng chúng để chứng minh các khẳng định về gradient nhóm của Bài 05.
- **Giải tích một biến.** Tổng hữu hạn, chuỗi hình học $\sum_{k\ge0}r^k=\tfrac1{1-r}$ với $\lvert r\rvert<1$, hàm mũ và logarit tự nhiên $\ln$. Khai triển Taylor $e^x=\sum_{k\ge0}x^k/k!$ đúng với mọi $x$. Định lý Taylor với phần dư Lagrange: nếu $\varphi$ khả vi hai lần trên một khoảng chứa $0$ và $u$, thì có $\vartheta$ nằm giữa $0$ và $u$ để $\varphi(u)=\varphi(0)+\varphi'(0)u+\tfrac12\varphi''(\vartheta)u^2$. Tích phân một biến chỉ dùng ở Mục 3.3.
- **Hàm lồi một biến** (Định nghĩa 01.22). Nếu $\varphi$ lồi trên đoạn $[m,M]$ thì đồ thị nằm dưới dây cung: $\varphi(y)\le\frac{M-y}{M-m}\varphi(m)+\frac{y-m}{M-m}\varphi(M)$ với mọi $y\in[m,M]$. Hàm mũ $y\mapsto e^{\lambda y}$ lồi với mọi $\lambda\in\mathbb R$.
- **Mất mát huấn luyện, rủi ro kỳ vọng và ví dụ ba quan sát** (Định nghĩa 05.1, Ví dụ 05.1). Mất mát huấn luyện là trung bình $J(\theta)=\frac1N\sum_{i=1}^N\ell_i(\theta)$ của $N$ mất mát riêng; rủi ro kỳ vọng $R(\theta)$ là mất mát trung bình trên một quan sát mới rút từ phân phối sinh dữ liệu. Với ba quan sát $y=(-1,1,3)$, mô hình hằng $\theta\in\mathbb R$ và $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$, mất mát huấn luyện là $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$ với nghiệm $\theta^*=1$.
- **Gradient nhóm** (Định nghĩa 05.10, Định lý 05.11). Với các chỉ số $I_1,\ldots,I_b$ rút độc lập, đều trên $\{1,\ldots,N\}$, gradient nhóm $\widehat g=\frac1b\sum_{r=1}^b\nabla\ell_{I_r}(\theta)$ có kỳ vọng $\nabla J(\theta)$ và hiệp phương sai $\Sigma(\theta)/b$. Bài 05 chứng minh định lý này bằng tính tuyến tính của kỳ vọng và tính độc lập; Mục 4 và Mục 6 của chương này dựng hai công cụ đó từ đầu.
- **Gradient Lipschitz và bước $1/L$** (Định nghĩa 04.17, Bổ đề 04.20). Gradient $\nabla F$ là $L$-Lipschitz nếu $\lVert\nabla F(\theta)-\nabla F(\theta')\rVert\le L\lVert\theta-\theta'\rVert$ với mọi $\theta,\theta'$. Khi đó bước hạ gradient với độ dài bước $\eta\in(0,\tfrac1L]$ làm $F$ giảm ít nhất $\tfrac\eta2\lVert\nabla F(\theta)\rVert^2$.
- **Hồi quy logistic** (Định nghĩa 01.8, Mệnh đề 01.9). Với nhãn $y\in\{-1,+1\}$, vectơ đặc trưng $a$ và tham số $\theta$, mất mát logistic là $\ln\bigl(1+\exp(-y\,a^T\theta)\bigr)$.

## Bảng ký hiệu

Bảng chỉ gồm ký hiệu dùng xuyên suốt chương; ký hiệu của một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ. Mỗi chữ trong bảng giữ một nghĩa trong cả chương. Các chữ $S$, $T$, $G$, $U$, $V$, $W$, $q$, $u$, $v$, $\kappa$, $\nu$ là ký hiệu cục bộ của từng ví dụ hoặc chứng minh, chẳng hạn $S$ là tổng hai xúc xắc hay số mặt ngửa, và được gọi tên lại ở mỗi chỗ dùng.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $\Omega$, $\omega$ | không gian mẫu; một kết cục | tập hữu hạn hoặc đếm được; $\omega\in\Omega$ |
| $A$, $B$, $A^c$ | biến cố; phần bù của $A$ | tập con của $\Omega$ |
| $P$ | xác suất trên các biến cố | $P(A)\in[0,1]$ |
| $\mathcal P$ | phân phối sinh dữ liệu | phân phối trên tập các quan sát |
| $X$, $Y$, $Z$; $x$ | biến ngẫu nhiên; một giá trị của biến | $X:\Omega\to\mathbb R$; $x\in\mathbb R$ |
| $p_X$, $F_X$ | hàm khối xác suất hoặc mật độ của $X$; hàm phân phối tích lũy của $X$ | $p_X\ge0$; $F_X:\mathbb R\to[0,1]$ |
| $p$ | tham số Bernoulli: xác suất thành công, tỉ lệ lỗi thật | $p\in[0,1]$ |
| $\mathbf 1_A$ | hàm chỉ thị của biến cố $A$ | nhận giá trị $0$ hoặc $1$ |
| $\mathbb E$, $\operatorname{Var}$, $\operatorname{Cov}$ | kỳ vọng; phương sai; hiệp phương sai | số thực |
| $\mu$, $\sigma_1^2$ | kỳ vọng và phương sai của một quan sát | $\mu\in\mathbb R$; $\sigma_1^2\ge0$ |
| $n$, $X_1,\ldots,X_n$, $\bar X_n$ | số quan sát; các quan sát; trung bình mẫu | $n\ge1$; biến ngẫu nhiên thực |
| $\varepsilon$, $\delta$ | độ lệch cho phép; xác suất thất bại cho phép | $\varepsilon>0$; $\delta\in(0,1)$ |
| $\lambda$ | tham số của hàm sinh mômen; trong cận Chernoff $\lambda\ge0$ | $\lambda\in\mathbb R$ |
| $[m_i,M_i]$, $[m,M]$ | khoảng chứa quan sát thứ $i$ trong bất đẳng thức Hoeffding; khoảng chung khi mọi quan sát cùng khoảng | $m_i<M_i$ |
| $w$ | độ rộng chung của khoảng chứa mọi tọa độ gradient mẫu | $w>0$ |
| $\xi$, $\xi_i$, $\ell(\theta;\xi)$ | một quan sát dữ liệu; quan sát huấn luyện thứ $i$; mất mát của tham số $\theta$ trên quan sát $\xi$ | $\xi$ theo phân phối $\mathcal P$; $\ell\ge0$ |
| $\sigma_\ell^2(\theta)$ | phương sai của mất mát trên một quan sát mới tại tham số $\theta$ | số không âm |
| $N$, $\ell_i$, $J$, $R$ | số quan sát huấn luyện; mất mát trên quan sát $i$; mất mát huấn luyện; rủi ro kỳ vọng | $N\ge1$; hàm của $\theta$ |
| $\theta$, $d$ | tham số mô hình; số chiều của tham số | $\theta\in\mathbb R^d$ |
| $b$, $I_1,\ldots,I_b$ | cỡ nhóm; các chỉ số được rút | $b\ge1$; $I_r\in\{1,\ldots,N\}$ |
| $g_i$, $\widehat g$ | gradient mẫu $\nabla\ell_i(\theta)$; gradient nhóm | $\mathbb R^d$ |
| $\gamma$ | hiệp phương sai chung của hai quan sát khác nhau trong một nhóm | $\gamma\in\mathbb R$ |
| $\Sigma(\theta)$, $\sigma_b^2$ | hiệp phương sai của gradient một mẫu; phương sai $\sigma_1^2/b$ của gradient nhóm vô hướng | ma trận $d\times d$; số không âm |
| $\sigma^2$ | hằng số chặn phương sai có điều kiện của gradient nhóm trong các định lý của Bài 05b | $\sigma^2\ge0$ |
| $\eta$, $L$ | độ dài bước (bước học); hằng số Lipschitz của gradient | $\eta>0$; $L>0$ |
| $C$, $B_{\rm tot}$, $K$ | chi phí một gradient mẫu; ngân sách tính bằng số gradient mẫu; số bước | $C>0$; số nguyên dương |
| $a_k$, $\bar a_b$ | sai số bình phương trung bình $\mathbb E(\theta_k-1)^2$ trên ví dụ ba quan sát; giá trị giới hạn của nó với cỡ nhóm $b$ | số không âm |

Ba ví dụ xuyên suốt được giới thiệu tại chỗ và dùng lại ở nhiều mục:

- **ví dụ ba quan sát**: dữ liệu $y=(-1,1,3)$, mô hình hằng, mất mát $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$, gradient mẫu $g_i(\theta)=\theta-y_i$;
- **ví dụ hai xúc xắc**: hai xúc xắc cân đối phân biệt, tổng hai mặt $S$;
- **ví dụ xét nghiệm**: tỉ lệ mắc bệnh $0{,}001$, độ nhạy và độ đặc hiệu cùng bằng $0{,}95$.

Bài 05 viết $P$ cho phân phối sinh dữ liệu; chương này viết phân phối đó là $\mathcal P$ để dành $P$ cho xác suất. Bài 00 viết xác suất là $\Pr$. Bài 05 ký hiệu số chiều tham số là $p$; chương này dùng $d$ vì $p$ đã là tham số Bernoulli. Bài 06 gọi nhóm nhỏ là "lô nhỏ".

Trong cả chương, $\ln$ là logarit tự nhiên; mọi bộ số của các ví dụ là số liệu sư phạm tự xây dựng hoặc ví dụ kinh điển của giáo trình, không phải kết quả đo trên dữ liệu thật.

## 1. Ước lượng bằng trung bình và không gian xác suất

Bài 05 thay gradient đầy đủ $\nabla J(\theta)$, trung bình trên $N$ quan sát, bằng gradient nhóm tính trên $b$ chỉ số rút ngẫu nhiên, và Định lý 05.11 khẳng định gradient nhóm có kỳ vọng $\nabla J(\theta)$ với hiệp phương sai $\Sigma(\theta)/b$. Phát biểu đó dùng ba khái niệm mà Bài 05 chỉ nhắc lại: rút ngẫu nhiên, kỳ vọng và độc lập. Mục này nêu bài toán trung tâm của chương, rồi dựng ngôn ngữ đầu tiên để phát biểu nó: không gian mẫu, tiên đề xác suất, phép đếm và bất đẳng thức hợp.

### 1.1 Bài toán trung tâm: gradient nhóm trên ba quan sát

Một bước của phương pháp hạ gradient ngẫu nhiên (stochastic gradient descent, SGD) dùng gradient tính trên một nhóm nhỏ các quan sát. Ví dụ sau tính các gradient mẫu của ví dụ ba quan sát và so chúng với gradient đầy đủ.

::: example Ví dụ 05c.1 (Gradient mẫu và gradient nhóm trên ba quan sát)
**Dữ kiện.** Ba quan sát $y=(y_1,y_2,y_3)=(-1,1,3)$, mô hình hằng $\theta\in\mathbb R$, mất mát $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$ và mất mát huấn luyện $J(\theta)=\tfrac13\sum_{i=1}^3\ell_i(\theta)=\tfrac12(\theta-1)^2+\tfrac43$ (Ví dụ 05.1).

**Gradient mẫu.** Đạo hàm của $\ell_i$ là $g_i(\theta)=\theta-y_i$. Gradient đầy đủ là $J'(\theta)=\theta-1$, bằng trung bình cộng $\tfrac13\sum_ig_i(\theta)$. Tại nghiệm $\theta=1$:

| Quan sát $y_i$ | $-1$ | $1$ | $3$ |
|---|---:|---:|---:|
| $g_i(1)$ | $2$ | $0$ | $-2$ |

**Gradient nhóm.** Một nhóm gồm $b$ chỉ số $I_1,\ldots,I_b$ cho gradient nhóm

$$
\widehat g=\frac1b\sum_{r=1}^bg_{I_r}(\theta).
\tag{1.1}
$$

Với $b=1$, gradient nhóm tại $\theta=1$ nhận một trong ba giá trị $2$, $0$, $-2$, trong khi $J'(1)=0$. Nếu một gradient mẫu tốn chi phí $C$, gradient đầy đủ tốn $NC=3C$ và gradient nhóm tốn $bC$.

**Kiểm tra lại.** Trung bình cộng của ba gradient mẫu tại $\theta=1$ là $\tfrac13(2+0-2)=0=J'(1)$.
:::

Công thức (1.1) lấy trung bình cộng của $b$ gradient mẫu được rút; $\widehat g$ cùng kiểu với $\theta$ và thay cho $\nabla J(\theta)$ trong bước cập nhật. Tại nghiệm, nhóm một phần tử chỉ chứa quan sát $y=-1$ cho $\widehat g=2$ và đẩy tham số ra khỏi nghiệm, nên lý do dùng $\widehat g$ phải là một phát biểu về mọi nhóm có thể rút.

Goodfellow, Bengio và Courville (2016, mục 8.1.3, tr. 278) so hai ước lượng gradient dùng $100$ và $10\,000$ mẫu: ước lượng thứ hai tốn gấp $100$ lần nhưng sai số chuẩn chỉ giảm $10$ lần. Phát biểu này cần ba đại lượng chưa được định nghĩa: xác suất của một cách rút, giá trị trung bình của $\widehat g$ trên mọi cách rút, và sai số chuẩn.

Gradient đầy đủ, rủi ro kỳ vọng và tỉ lệ lỗi phân loại đều là trung bình của một đại lượng theo một phân phối. Gọi đại lượng cần biết là $\mu$. Khi $\mu$ không tính được hoặc tốn kém, người ta ước lượng nó bằng trung bình $\bar X_n=\frac1n\sum_{i=1}^nX_i$ của $n$ quan sát $X_1,\ldots,X_n$, và chương trả lời năm câu hỏi về ước lượng đó.

1. **Tâm.** Trung bình của $\bar X_n$ trên mọi cách rút có bằng $\mu$ không (Mục 4).
2. **Sai số điển hình.** Độ phân tán của $\bar X_n$ quanh $\mu$ giảm theo $n$ như thế nào (Mục 4).
3. **Xác suất sai lệch.** Xác suất để $\lvert\bar X_n-\mu\rvert\ge\varepsilon$ bị chặn bởi bao nhiêu, với $\varepsilon>0$ cho trước (Mục 5).
4. **Trung bình hay tổng.** Mất mát trên nhóm nên được lấy trung bình hay tổng, và lựa chọn đó ảnh hưởng thế nào tới ngưỡng bước khi đổi $b$ hoặc $N$ (Mục 6).
5. **Cỡ nhóm.** Khi chi phí mỗi bước tỉ lệ với $b$ và gradient được ước lượng lại ở mọi bước, chọn $b$ thế nào dưới một ngân sách tính toán cố định (Mục 6).

Trước năm câu hỏi đó cần xác định "rút ngẫu nhiên". Rút $b=32$ chỉ số có hoàn lại từ $N=1000$ quan sát có thể cho một nhóm chứa cùng một chỉ số hai lần; xác suất của sự kiện này chưa có nghĩa khi tập các nhóm có thể rút và cách gán xác suất cho chúng chưa được xác định. Các tiểu mục sau xác định hai thành phần đó.

### 1.2 Kết cục, không gian mẫu và biến cố

Một phép thử ngẫu nhiên là một quy trình có kết quả chưa biết trước, như tung xúc xắc hay rút một chỉ số. Về trực giác, trước khi có định nghĩa: xác suất là một đơn vị khối lượng chia cho các kết quả có thể; xác suất của một nhóm kết quả là tổng khối lượng của chúng.

::: example Ví dụ 05c.2 (Hai xúc xắc)
**Dữ kiện.** Tung hai xúc xắc cân đối, phân biệt được xúc xắc thứ nhất và xúc xắc thứ hai.

**Kết quả có thể.** Mỗi kết quả là một cặp $(i,j)$, với $i$ là mặt của xúc xắc thứ nhất và $j$ là mặt của xúc xắc thứ hai, $i,j\in\{1,\ldots,6\}$. Có $6\cdot6=36$ cặp.

**Nhóm kết quả "tổng bằng 7".** Nhóm này gồm các cặp

$$
\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\},
$$

tức $6$ cặp.

**Khối lượng.** Hai xúc xắc cân đối nên không cặp nào được ưu tiên; mỗi cặp nhận khối lượng $\tfrac1{36}$. Nhóm "tổng bằng 7" có khối lượng $\tfrac6{36}=\tfrac16$.

**Kiểm tra lại.** Tổng khối lượng của $36$ cặp là $36\cdot\tfrac1{36}=1$.
:::

Định nghĩa sau gọi tên ba thành phần của ví dụ: tập các kết quả, các nhóm kết quả, và cách gán khối lượng.

::: definition Định nghĩa 05c.1 (Không gian xác suất rời rạc)
**Không gian mẫu.** Không gian mẫu (sample space) $\Omega$ là tập mọi kết quả có thể của phép thử; $\Omega$ hữu hạn hoặc đếm được. Mỗi phần tử $\omega\in\Omega$ gọi là một kết cục (outcome).

**Biến cố.** Mỗi tập con $A\subseteq\Omega$ gọi là một biến cố (event). Biến cố $A$ xảy ra khi kết cục của phép thử thuộc $A$. Phần bù $A^c=\Omega\setminus A$ là biến cố "$A$ không xảy ra".

**Xác suất.** Xác suất là hàm $P$ gán cho mỗi biến cố $A$ một số $P(A)\in[0,1]$, thỏa hai tiên đề:

1. $P(\Omega)=1$;
2. cộng tính đếm được: với mọi dãy biến cố $A_1,A_2,\ldots$ đôi một rời nhau,

$$
P\Bigl(\bigcup_{j}A_j\Bigr)=\sum_{j}P(A_j).
\tag{1.2}
$$

Cặp $(\Omega,P)$ gọi là một không gian xác suất rời rạc.
:::

Không gian mẫu là danh sách các kết quả, biến cố là một câu hỏi có hoặc không về kết cục viết dưới dạng tập, và tiên đề (1.2) nói khối lượng của các phần rời nhau được cộng lại (Koller và Friedman, 2009, Định nghĩa 2.1, tr. 15–16, cho phân phối xác suất trên một không gian biến cố).

Trong không gian rời rạc, $P$ được xác định hoàn toàn bởi khối lượng của từng kết cục. Đặt $p_\omega=P(\{\omega\})\ge0$; tiên đề (1.2) áp cho các tập một phần tử cho

$$
P(A)=\sum_{\omega\in A}p_\omega,\qquad\sum_{\omega\in\Omega}p_\omega=1 .
\tag{1.3}
$$

Công thức (1.3) đọc là: xác suất của một biến cố bằng tổng khối lượng của các kết cục trong nó; ngược lại, mọi họ số không âm có tổng bằng $1$ xác định một xác suất. Khi $\Omega$ hữu hạn và mọi $p_\omega$ bằng nhau, $P(A)=\lvert A\rvert/\lvert\Omega\rvert$, với $\lvert A\rvert$ là số phần tử của $A$; đó là mô hình đồng khả năng.

Mô hình đồng khả năng là trường hợp riêng, không phải định nghĩa của xác suất. Nếu chỉ số $1$, $2$, $3$ được rút với xác suất $\tfrac14$, $\tfrac14$, $\tfrac12$, biến cố "chỉ số lẻ" có xác suất $\tfrac34$, không phải $\tfrac23$; đếm kết cục thuận lợi chia cho tổng số kết cục khi các kết cục không cùng khối lượng là nhầm lẫn thường gặp.

Mệnh đề sau thu thập các hệ quả của hai tiên đề; mọi phép tính xác suất về sau dùng chúng.

::: proposition Mệnh đề 05c.2 (Hệ quả của tiên đề xác suất)
**Giả thiết.** $(\Omega,P)$ là không gian xác suất rời rạc; $A$, $B$ là hai biến cố.

**Kết luận.**

1. $P(\varnothing)=0$.
2. $P(A^c)=1-P(A)$.
3. Nếu $A\subseteq B$ thì $P(A)\le P(B)$.
4. $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.

**Điều kiện áp dụng.** Chỉ dùng hai tiên đề của Định nghĩa 05c.1.

**Phạm vi.** Phần 4 cần biết $P(A\cap B)$; khi chỉ biết $P(A)$ và $P(B)$, Mục 1.5 cho một cận trên.
:::

::: proof Chứng minh Mệnh đề 05c.2
**Bước 1 (tập rỗng).** Lấy $A_1=\Omega$ và $A_j=\varnothing$ với $j\ge2$; các tập này đôi một rời nhau và hợp bằng $\Omega$. Tiên đề (1.2) cho $1=1+\sum_{j\ge2}P(\varnothing)$. Một chuỗi các số không âm bằng nhau có tổng bằng $0$ chỉ khi mỗi số hạng bằng $0$, nên $P(\varnothing)=0$. Từ đó, (1.2) đúng cho một số hữu hạn biến cố rời nhau, bằng cách bổ sung các tập rỗng.

**Bước 2 (phần bù).** $\Omega=A\cup A^c$ với $A$ và $A^c$ rời nhau, nên $1=P(A)+P(A^c)$ theo Bước 1 và tiên đề $P(\Omega)=1$.

**Bước 3 (đơn điệu).** Khi $A\subseteq B$, viết $B=A\cup(B\setminus A)$ với hai tập rời nhau. Do đó $P(B)=P(A)+P(B\setminus A)\ge P(A)$, vì $P(B\setminus A)\ge0$.

**Bước 4 (hợp hai biến cố).** Hai phân tích thành tập rời nhau

$$
\begin{aligned}
A\cup B&=A\cup(B\setminus A),\\
B&=(A\cap B)\cup(B\setminus A)
\end{aligned}
$$

cho $P(A\cup B)=P(A)+P(B\setminus A)$ và $P(B)=P(A\cap B)+P(B\setminus A)$. Trừ đẳng thức thứ hai khỏi đẳng thức thứ nhất rồi chuyển vế được phần 4. $\square$
:::

Phần 2 dùng khi biến cố cần tính là "có ít nhất một": phần bù "không có cái nào" thường dễ đếm hơn. Phần 4 trừ phần giao vì tổng $P(A)+P(B)$ đếm nó hai lần.

Trên ví dụ hai xúc xắc, với $A$ là "tổng ít nhất bằng 10" và $B$ là "hai mặt bằng nhau", mỗi biến cố có $6$ cặp và phần giao gồm hai cặp $(5,5)$, $(6,6)$. Phần 4 cho $P(A\cup B)=\tfrac6{36}+\tfrac6{36}-\tfrac2{36}=\tfrac{10}{36}$; phần 2 kiểm lại, vì phần bù có $26$ cặp.

::: remark Nhận xét 05c.3 (Quan hệ với Bài 00 và với không gian không đếm được)
**Đối chiếu Bài 00.** Mục "Phép thử, không gian mẫu, biến cố và không gian xác suất" của Bài 00 định nghĩa không gian xác suất là bộ ba $(\Omega,\mathcal F,\Pr)$, với $\mathcal F$ là họ các biến cố. Khi $\Omega$ hữu hạn hoặc đếm được, có thể lấy $\mathcal F$ là họ mọi tập con, và Định nghĩa 05c.1 là trường hợp riêng đó, viết $P$ thay cho $\Pr$.

**Không gian không đếm được.** Khi $\Omega=[0,1]$, không thể gán xác suất nhất quán, đều theo độ dài, cho mọi tập con, nên biến cố chỉ là các tập thuộc một họ $\mathcal F$ được chọn riêng; chương không đi vào lý thuyết đó và dùng biến liên tục chỉ qua mật độ (Mục 3.3).
:::

### 1.3 Phép đếm và mô hình đồng khả năng

Với $23$ người, mỗi người một ngày sinh trong $365$ ngày, không gian mẫu gồm $365^{23}\approx10^{59}$ dãy ngày sinh; với nhóm $32$ chỉ số rút từ $1000$ quan sát, không gian mẫu có $1000^{32}=10^{96}$ dãy. Không thể liệt kê các tập này để áp dụng (1.3), nên cần một quy tắc đếm. Trực giác, chưa phải định nghĩa: xếp các lựa chọn thành một cây, tầng thứ $j$ ứng với lựa chọn thứ $j$; nếu mọi nút ở cùng tầng có cùng số nhánh, số lá bằng tích số nhánh của các tầng.

::: example Ví dụ 05c.3 (Bài toán sinh nhật)
**Dữ kiện.** $n$ người, ngày sinh của mỗi người là một trong $365$ ngày; mọi dãy $n$ ngày sinh đồng khả năng.

**Đếm dãy không trùng.** Trên cây lựa chọn, người thứ nhất có $365$ lựa chọn, người thứ hai còn $364$ lựa chọn không trùng người thứ nhất, và người thứ $n$ còn $365-n+1$ lựa chọn. Số dãy không trùng là $365\cdot364\cdots(365-n+1)$, trên tổng số $365^n$ dãy.

**Xác suất.** Gọi $A_n$ là biến cố "có ít nhất hai trong $n$ người trùng ngày sinh". Tỉ số của hai số đếm là xác suất của phần bù $A_n^c$, và phần 2 của Mệnh đề 05c.2 cho

$$
P(A_n)=1-\prod_{i=0}^{n-1}\Bigl(1-\frac i{365}\Bigr).
$$

**Số liệu.**

| $n$ | $23$ | $30$ | $50$ | $70$ |
|---|---:|---:|---:|---:|
| $P(A_n)$ | $0{,}5073$ | $0{,}7063$ | $0{,}9704$ | $0{,}9992$ |

**Kiểm tra lại.** Với $n=2$, công thức cho $1-\tfrac{364}{365}=\tfrac1{365}$: người thứ hai trùng ngày với người thứ nhất với xác suất $\tfrac1{365}$.
:::

Kết quả $0{,}507$ với chỉ $23$ người trái với ước đoán thường gặp, vì số cặp người là $\binom{23}2=253$, lớn hơn nhiều số người. Mệnh đề sau phát biểu các quy tắc đếm đã dùng.

::: proposition Mệnh đề 05c.4 (Quy tắc đếm)
**Giả thiết.** $N$, $b$, $k$ là các số nguyên dương.

**Kết luận.**

1. **Quy tắc nhân.** Nếu một kết cục được tạo bởi $k$ lựa chọn liên tiếp và lựa chọn thứ $j$ luôn có đúng $n_j$ khả năng, bất kể các lựa chọn trước, thì có $n_1n_2\cdots n_k$ kết cục.
2. Có $N^b$ dãy độ dài $b$ lấy từ $N$ phần tử khi cho phép lặp.
3. Khi $b\le N$, có $N(N-1)\cdots(N-b+1)$ dãy độ dài $b$ gồm các phần tử đôi một khác nhau.
4. Khi $k\le N$, có $\binom Nk=\dfrac{N!}{k!\,(N-k)!}$ tập con $k$ phần tử của một tập $N$ phần tử.

**Điều kiện áp dụng.** Phần 1 cần số khả năng ở mỗi tầng không phụ thuộc các lựa chọn trước; giá trị cụ thể của các khả năng được phép phụ thuộc.

**Phạm vi.** Mệnh đề đếm số kết cục; nó cho xác suất chỉ khi các kết cục đồng khả năng.
:::

::: proof Chứng minh Mệnh đề 05c.4
**Bước 1 (quy tắc nhân).** Quy nạp theo $k$. Với $k=1$ có $n_1$ kết cục. Giả sử $k-1$ lựa chọn đầu tạo $n_1\cdots n_{k-1}$ kết cục; mỗi kết cục đó có đúng $n_k$ cách chọn tiếp, và các cách chọn tiếp của hai kết cục khác nhau cho các dãy khác nhau. Do đó có $n_1\cdots n_{k-1}\cdot n_k$ kết cục.

**Bước 2 (dãy có lặp và không lặp).** Phần 2 là phần 1 với $n_j=N$ cho mọi $j$. Phần 3 là phần 1 với $n_j=N-j+1$: khi đã chọn $j-1$ phần tử khác nhau, còn $N-j+1$ phần tử chưa dùng.

**Bước 3 (tập con).** Mỗi tập con $k$ phần tử sinh ra đúng $k!$ dãy gồm chính các phần tử đó theo các thứ tự khác nhau, theo phần 3 với $N=b=k$. Các dãy sinh từ hai tập con khác nhau là khác nhau. Do đó số tập con nhân $k!$ bằng số dãy $k$ phần tử khác nhau, tức

$$
\binom Nk\cdot k!=N(N-1)\cdots(N-k+1)=\frac{N!}{(N-k)!},
$$

và chia hai vế cho $k!$ được phần 4. $\square$
:::

Phần 3 khác phần 4 ở chỗ thứ tự có được tính hay không: hai dãy $(1,2)$ và $(2,1)$ khác nhau nhưng cùng một tập con. Blitzstein và Hwang (2019, mục 1.3–1.4) gọi mô hình đồng khả năng là định nghĩa ngây thơ của xác suất (naive definition of probability), chỉ đúng khi các kết cục cùng khối lượng.

### 1.4 Chỉ số lặp trong nhóm rút có hoàn lại

Câu hỏi về chỉ số lặp ở cuối Mục 1.1 có cùng cấu trúc với bài toán sinh nhật: $N$ quan sát đóng vai $365$ ngày, $b$ chỉ số đóng vai $n$ người. Định nghĩa sau xác định chính xác "rút có hoàn lại".

::: definition Định nghĩa 05c.5 (Nhóm rút đều có hoàn lại và không hoàn lại)
Cho $N\ge1$ quan sát được đánh chỉ số $1,\ldots,N$ và cỡ nhóm $b\ge1$.

**Có hoàn lại** (sampling with replacement). Không gian mẫu là tập $\{1,\ldots,N\}^b$ các dãy chỉ số $(i_1,\ldots,i_b)$, cho phép lặp; mọi dãy đồng khả năng, mỗi dãy có xác suất $N^{-b}$. Chỉ số thứ $r$ của nhóm là $I_r=i_r$.

**Không hoàn lại** (sampling without replacement). Khi $b\le N$, không gian mẫu là tập các dãy $(i_1,\ldots,i_b)$ gồm các chỉ số đôi một khác nhau; mọi dãy đồng khả năng, mỗi dãy có xác suất $\dfrac1{N(N-1)\cdots(N-b+1)}$.
:::

Hai mô hình khác nhau ở không gian mẫu; cả hai đều đồng khả năng. Mô hình không hoàn lại ứng với việc xáo trộn dữ liệu rồi lấy $b$ phần tử đầu, và mỗi tập con $b$ phần tử có cùng xác suất $1/\binom Nb$ theo phần 4 của Mệnh đề 05c.4.

::: proposition Mệnh đề 05c.6 (Xác suất nhóm có chỉ số lặp)
**Giả thiết.** Nhóm $b\ge2$ chỉ số rút đều có hoàn lại từ $N$ quan sát (Định nghĩa 05c.5).

**Kết luận.** Khi $b\le N$, biến cố "nhóm có ít nhất hai vị trí trùng chỉ số" có xác suất

$$
1-\prod_{i=0}^{b-1}\Bigl(1-\frac iN\Bigr).
\tag{1.4}
$$

Khi $b>N$, biến cố này có xác suất $1$.

**Điều kiện áp dụng.** Cần mô hình đồng khả năng trên mọi dãy có lặp.

**Phạm vi.** Với mô hình không hoàn lại, biến cố này là tập rỗng và có xác suất $0$.
:::

::: proof Chứng minh Mệnh đề 05c.6
**Bước 1 (đếm).** Theo phần 2 của Mệnh đề 05c.4, không gian mẫu có $N^b$ dãy. Theo phần 3, có $N(N-1)\cdots(N-b+1)$ dãy không có chỉ số lặp.

**Bước 2 (xác suất phần bù).** Trong mô hình đồng khả năng, biến cố "không lặp" có xác suất

$$
\frac{N(N-1)\cdots(N-b+1)}{N^b}=\prod_{i=0}^{b-1}\frac{N-i}N=\prod_{i=0}^{b-1}\Bigl(1-\frac iN\Bigr).
$$

Phần 2 của Mệnh đề 05c.2 cho (1.4).

**Bước 3 (trường hợp $b>N$).** Khi $b>N$, không có dãy $b$ phần tử khác nhau lấy từ $N$ phần tử, nên biến cố "không lặp" rỗng và có xác suất $0$ theo phần 1 của Mệnh đề 05c.2. $\square$
:::

Công thức (1.4) là công thức của bài toán sinh nhật với $365$ thay bằng $N$; xác suất có lặp tăng theo $b$ và giảm theo $N$.

::: example Ví dụ 05c.4 (Chỉ số lặp trong nhóm 32 chỉ số)
**Dữ kiện.** Nhóm rút đều có hoàn lại; công thức (1.4) của Mệnh đề 05c.6: xác suất có lặp bằng $1-\prod_{i=0}^{b-1}(1-i/N)$.

**Tính.**

- $N=1000$, $b=32$: tích $\prod_{i=0}^{31}(1-i/1000)\approx0{,}6057$, nên xác suất có lặp là $0{,}394$.
- $N=1000$, $b=64$: xác suất có lặp là $0{,}873$.
- $N=60\,000$, $b=256$: xác suất có lặp là $0{,}420$.

**Diễn giải.** Khoảng hai trong năm nhóm $32$ chỉ số rút có hoàn lại từ $1000$ quan sát chứa ít nhất một quan sát dùng hai lần; nhóm đó có ít hơn $32$ gradient mẫu khác nhau. Với $60\,000$ quan sát, cỡ của một tập ảnh chữ số viết tay thông dụng, nhóm $256$ chỉ số vẫn có lặp với xác suất $0{,}42$.

**Kiểm tra lại.** Với $b=2$, (1.4) cho $1-(1-\tfrac1N)=\tfrac1N$: chỉ số thứ hai trùng chỉ số thứ nhất với xác suất $\tfrac1N$.
:::

![Hai khung đồ thị. Khung trái: xác suất có hai người trùng ngày sinh theo số người n từ 0 đến 70, vượt 0,5 tại n = 23 với giá trị 0,507. Khung phải: xác suất nhóm b chỉ số rút có hoàn lại từ N = 1000 quan sát có chỉ số lặp, bằng 0,394 tại b = 32 và 0,873 tại b = 64.](img/lec-05c/birthday-and-batch-duplicates.svg)

Hai khung của hình vẽ cùng một hàm (1.4) với $N=365$ và $N=1000$. Đường cong tăng nhanh ở đoạn đầu, vì số cặp vị trí $\binom b2$ tăng theo bình phương của $b$; điểm đánh dấu $b=32$ ở khung phải ứng với số $0{,}394$ của Ví dụ 05c.4.

**Trong học máy.** Các thư viện học sâu thường xáo trộn chỉ số theo một hoán vị ngẫu nhiên ở đầu mỗi lượt (epoch), tức một lần duyệt toàn bộ dữ liệu, rồi cắt hoán vị thành các nhóm liên tiếp (Goodfellow và cộng sự, 2016, mục 8.1.3, tr. 280–281). Mỗi nhóm khi đó rút không hoàn lại và không có chỉ số lặp. Chương dùng mô hình có hoàn lại vì công thức gọn hơn; Mục 4.6 tính phần chênh lệch.

### 1.5 Bất đẳng thức hợp

Biến cố "có ít nhất một sự cố" là hợp $A_1\cup\cdots\cup A_q$; tính đúng xác suất của nó cần mọi phần giao, trong khi thường chỉ biết từng $P(A_j)$. Hình dung sau chỉ là trực giác: vẽ các biến cố như những miền có diện tích bằng xác suất; diện tích của hợp không vượt tổng các diện tích, vì phần chồng nhau bị đếm nhiều lần.

::: example Ví dụ 05c.5 (Tổng các xác suất trùng theo cặp)
**Dữ kiện.** Bài toán sinh nhật (Ví dụ 05c.3) với $n=23$ người; xác suất đúng của biến cố "có trùng" là $0{,}507$.

**Tính.** Với mỗi cặp người $j<k$, gọi $A_{jk}$ là biến cố hai người đó trùng ngày sinh; $P(A_{jk})=\tfrac1{365}$. Có $\binom{23}2=253$ cặp. Biến cố $A_{23}$ "có trùng" là hợp của $253$ biến cố $A_{jk}$, và tổng các xác suất là $\tfrac{253}{365}\approx0{,}693$.

**Diễn giải.** Tổng $0{,}693$ lớn hơn xác suất đúng $0{,}507$ vì các biến cố $A_{jk}$ chồng lên nhau: ba người cùng ngày sinh làm ba biến cố xảy ra đồng thời. Với $n=30$, tổng bằng $\tfrac{435}{365}>1$ và không cho thông tin gì.

**Kiểm tra lại.** $\binom{23}2=\tfrac{23\cdot22}2=253$; $253/365=0{,}6932$.
:::

::: proposition Mệnh đề 05c.7 (Bất đẳng thức hợp)
**Giả thiết.** $A_1,\ldots,A_q$ là các biến cố bất kỳ trong một không gian xác suất rời rạc.

**Kết luận.**

$$
P\Bigl(\bigcup_{j=1}^qA_j\Bigr)\le\sum_{j=1}^qP(A_j).
\tag{1.5}
$$

**Điều kiện áp dụng.** Không cần giả thiết gì về quan hệ giữa các biến cố.

**Phạm vi.** Dấu bằng xảy ra khi các biến cố đôi một rời nhau. Khi vế phải lớn hơn $1$, cận không cho thông tin.
:::

::: proof Chứng minh Mệnh đề 05c.7
**Bước 1 (hai biến cố).** Phần 4 của Mệnh đề 05c.2 cho $P(A_1\cup A_2)=P(A_1)+P(A_2)-P(A_1\cap A_2)$, và $P(A_1\cap A_2)\ge0$, nên $P(A_1\cup A_2)\le P(A_1)+P(A_2)$.

**Bước 2 (quy nạp).** Giả sử (1.5) đúng với $q-1$ biến cố. Áp Bước 1 cho hai biến cố $\bigcup_{j<q}A_j$ và $A_q$, rồi dùng giả thiết quy nạp:

$$
\begin{aligned}
P\Bigl(\bigcup_{j=1}^qA_j\Bigr)&\le P\Bigl(\bigcup_{j=1}^{q-1}A_j\Bigr)+P(A_q)\\
&\le\sum_{j=1}^{q-1}P(A_j)+P(A_q).
\end{aligned}
$$

**Bước 3 (dấu bằng).** Khi các biến cố đôi một rời nhau, (1.2) cho đẳng thức. $\square$
:::

Bất đẳng thức hợp đổi xác suất của một hợp thành $q$ xác suất riêng. Cận tốt khi các biến cố hiếm và ít chồng nhau, vô dụng khi tổng vượt $1$; với $A_1=A_2=A$, vế trái bằng $P(A)$ còn vế phải bằng $2P(A)$.

**Trong học máy.** Bất đẳng thức hợp chuyển bảo đảm cho từng đối tượng thành bảo đảm đồng thời: Mục 6.3 dùng nó cho mọi tọa độ của gradient nhóm, Tình huống 05c.2 cho việc chọn trong nhiều mô hình. Số đối tượng $q$ đi vào cỡ mẫu qua $\ln q$, như Hệ quả 05c.54 cho thấy.

::: exercise Bài tập 05c.1 (Cận hợp cho chỉ số lặp)
Nhóm $b=32$ chỉ số rút đều có hoàn lại từ $N=1000$ quan sát.

1. Với hai vị trí $r<s$ của nhóm, tính xác suất của biến cố $A_{rs}$ "vị trí $r$ và vị trí $s$ có cùng chỉ số".
2. Dùng Mệnh đề 05c.7 để chặn trên xác suất nhóm có chỉ số lặp. So cận với xác suất đúng $0{,}394$ của Ví dụ 05c.4.
:::

::: hint
Ở câu 1, đếm các dãy $(i_1,\ldots,i_{32})$ có $i_r=i_s$ bằng quy tắc nhân. Ở câu 2, biến cố "có lặp" là hợp của mọi $A_{rs}$.
:::

::: solution
**Câu 1.** Theo quy tắc nhân, có $N$ cách chọn chỉ số chung cho hai vị trí $r$, $s$ và $N^{b-2}$ cách chọn các vị trí còn lại, nên $\lvert A_{rs}\rvert=N^{b-1}$ và $P(A_{rs})=N^{b-1}/N^b$, tức $\tfrac1N=0{,}001$.

**Câu 2.** Biến cố "có lặp" bằng $\bigcup_{r<s}A_{rs}$, gồm $\binom{32}2=496$ biến cố. Mệnh đề 05c.7 cho cận $496\cdot0{,}001=0{,}496$.

**So sánh.** Cận $0{,}496$ lớn hơn xác suất đúng $0{,}394$ vì các biến cố $A_{rs}$ có chung vị trí chồng lên nhau, chẳng hạn ba vị trí cùng chỉ số làm ba biến cố xảy ra đồng thời.

**Kiểm tra lại.** Với $b=2$, chỉ có một cặp và cận bằng xác suất đúng $\tfrac1N$.
:::

**Chuỗi suy luận của mục.** Định nghĩa 05c.1 đặt ngôn ngữ; Mệnh đề 05c.2 suy ra các quy tắc tính từ hai tiên đề; Mệnh đề 05c.4 cho cách đếm trong mô hình đồng khả năng; Định nghĩa 05c.5 và Mệnh đề 05c.6 áp phép đếm cho nhóm rút có hoàn lại; Mệnh đề 05c.7 cho cận trên của một hợp, công cụ được dùng lại ở Mục 5 và Mục 6.

**Kết mục.** Mục này cho xác suất của biến cố trước khi quan sát: nhóm $32$ chỉ số có lặp với xác suất $0{,}394$ (Mệnh đề 05c.6), và một hợp bị chặn bởi tổng các xác suất (Mệnh đề 05c.7). Chưa có cách cập nhật xác suất khi biết một phần kết cục, và "không ảnh hưởng nhau" mà phép đếm $N^b$ ngầm dùng chưa được định nghĩa. Mục 2 định nghĩa xác suất có điều kiện, tính độc lập, và chứng minh các lần rút có hoàn lại là độc lập.

## 2. Xác suất có điều kiện, độc lập và công thức Bayes

Mục 1 cho xác suất trước khi quan sát, và phép đếm $N^b$ ngầm coi các lần rút không ảnh hưởng nhau mà chưa định nghĩa điều đó. Một bệnh có tỉ lệ mắc $0{,}001$; xét nghiệm phát hiện đúng $95\,\%$ người mắc và báo âm tính đúng $95\,\%$ người không mắc. Khi một người nhận kết quả dương tính, xác suất người đó mắc bệnh không còn là $0{,}001$. Mục này định nghĩa xác suất có điều kiện, dẫn ra công thức Bayes để tính con số đó, rồi định nghĩa tính độc lập và chứng minh các lần rút có hoàn lại độc lập.

### 2.1 Xác suất có điều kiện

Trực giác, chưa phải định nghĩa: khi biết biến cố $B$ đã xảy ra, các kết cục ngoài $B$ bị loại. Khối lượng xác suất của các kết cục còn lại trong $B$ được chia lại theo cùng tỉ lệ để tổng mới bằng $1$. Ví dụ sau làm phép chia lại này trên một cây.

::: example Ví dụ 05c.6 (Monty Hall)
**Dữ kiện.** Có ba cửa; sau một cửa là xe, sau hai cửa còn lại là dê, và xe ở mỗi cửa với xác suất $\tfrac13$. Người chơi chọn cửa 1. Người dẫn biết vị trí xe, luôn mở một cửa khác cửa 1 có dê phía sau; khi cả cửa 2 và cửa 3 có dê, người dẫn chọn mỗi cửa với xác suất $\tfrac12$.

**Cây kết cục.** Mỗi kết cục là cặp (vị trí xe, cửa được mở). Khối lượng của mỗi lá là tích các xác suất dọc nhánh:

- (xe ở 1, mở 2) và (xe ở 1, mở 3): mỗi lá $\tfrac13\cdot\tfrac12=\tfrac16$;
- (xe ở 2, mở 3): $\tfrac13\cdot1=\tfrac13$, vì người dẫn buộc phải mở cửa 3;
- (xe ở 3, mở 2): $\tfrac13\cdot1=\tfrac13$.

**Chia lại khi biết cửa 3 được mở.** Còn hai lá: (xe ở 1, mở 3) khối lượng $\tfrac16$ và (xe ở 2, mở 3) khối lượng $\tfrac13$, tổng $\tfrac12$. Chia mỗi khối lượng cho $\tfrac12$: xe ở cửa 1 với xác suất $\tfrac13$, ở cửa 2 với xác suất $\tfrac23$.

**Diễn giải.** Đổi sang cửa 2 thắng với xác suất $\tfrac23$, giữ cửa 1 thắng với xác suất $\tfrac13$. Kết luận phụ thuộc giả thiết về người dẫn: nếu người dẫn mở ngẫu nhiên một trong hai cửa còn lại, kể cả cửa có xe, thì khi cửa được mở có dê, hai cửa còn đóng có cùng xác suất $\tfrac12$.

**Kiểm tra lại.** Tổng khối lượng bốn lá là $\tfrac16+\tfrac16+\tfrac13+\tfrac13=1$.
:::

![Cây ba nhánh theo vị trí xe, mỗi nhánh xác suất 1/3. Nhánh xe ở cửa 1 tách thành mở cửa 2 và mở cửa 3, mỗi lá 1/6, giữ cửa thắng. Nhánh xe ở cửa 2 chỉ có lá mở cửa 3, khối lượng 1/3, đổi cửa thắng. Nhánh xe ở cửa 3 chỉ có lá mở cửa 2, khối lượng 1/3, đổi cửa thắng. Tổng: đổi thắng 2/3, giữ thắng 1/3.](img/lec-05c/monty-hall-tree.svg)

Hình vẽ cây kết cục của Ví dụ 05c.6. Hai lá đánh dấu "đổi thắng" có tổng khối lượng $\tfrac23$; điều kiện "mở cửa 3" giữ lại một lá của mỗi loại, với khối lượng $\tfrac13$ và $\tfrac16$, tức cùng tỉ lệ $2:1$.

::: definition Định nghĩa 05c.8 (Xác suất có điều kiện)
Cho không gian xác suất rời rạc $(\Omega,P)$ và biến cố $B$ với $P(B)>0$. Xác suất có điều kiện (conditional probability) của biến cố $A$ khi biết $B$ là

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
\tag{2.1}
$$
:::

Tử số của (2.1) giữ lại phần khối lượng của $A$ nằm trong $B$; mẫu số chuẩn hóa để $P(B\mid B)=1$. Với $B$ cố định, $A\mapsto P(A\mid B)$ thỏa hai tiên đề của Định nghĩa 05c.1, nên mọi kết quả của Mục 1 áp dụng cho nó (Koller và Friedman, 2009, mục 2.1.2, tr. 18).

Điều kiện $P(B)>0$ là bắt buộc: biết một biến cố có xác suất $0$ đã xảy ra không cho cách chia lại nào theo (2.1). Trên ví dụ hai xúc xắc, với $A$ là "tổng bằng 7" và $B$ là "xúc xắc thứ nhất ra 6", $A\cap B=\{(6,1)\}$ và $P(A\mid B)=\tfrac{1/36}{6/36}=\tfrac16$, bằng $P(A)$. Với $B'$ là "tổng ít nhất bằng 11", $A\cap B'=\varnothing$ và $P(A\mid B')=0$.

Nhầm lẫn thường gặp là đồng nhất $P(A\mid B)$ với $P(B\mid A)$. Trên ví dụ hai xúc xắc, gọi $A_{12}$ là biến cố "tổng bằng 12"; khi đó $P(A_{12}\mid B)=\tfrac16$, còn $P(B\mid A_{12})=1$ vì tổng $12$ buộc cả hai xúc xắc ra $6$. Ví dụ xét nghiệm ở Mục 2.2 cho thấy hai đại lượng này có thể chênh nhau khoảng năm mươi lần.

Nhân hai vế của (2.1) với $P(B)$ cho cách tính xác suất của một giao theo từng bước, đúng phép nhân dọc nhánh đã dùng trên cây Monty Hall.

::: proposition Mệnh đề 05c.9 (Quy tắc nhân)
**Giả thiết.** $A_1,\ldots,A_q$ là các biến cố với $P(A_1\cap\cdots\cap A_{q-1})>0$.

**Kết luận.**

$$
P(A_1\cap\cdots\cap A_q)=P(A_1)\,P(A_2\mid A_1)\,P(A_3\mid A_1\cap A_2)\cdots P(A_q\mid A_1\cap\cdots\cap A_{q-1}).
\tag{2.2}
$$

**Điều kiện áp dụng.** Giả thiết bảo đảm mọi xác suất có điều kiện trong (2.2) xác định.

**Phạm vi.** Thứ tự các biến cố có thể chọn tùy ý; mỗi thứ tự cho một cách phân tích khác của cùng một xác suất.
:::

::: proof Chứng minh Mệnh đề 05c.9
**Bước 1 (các mẫu số dương).** Với $k<q$, $A_1\cap\cdots\cap A_k\supseteq A_1\cap\cdots\cap A_{q-1}$, nên theo phần 3 của Mệnh đề 05c.2, $P(A_1\cap\cdots\cap A_k)\ge P(A_1\cap\cdots\cap A_{q-1})>0$.

**Bước 2 (quy nạp).** Với $q=2$, (2.2) là (2.1) nhân hai vế với $P(A_1)$. Giả sử (2.2) đúng với $q-1$ biến cố. Áp (2.1) với $A=A_q$ và $B=A_1\cap\cdots\cap A_{q-1}$:

$$
P(A_1\cap\cdots\cap A_q)=P(A_1\cap\cdots\cap A_{q-1})\,P(A_q\mid A_1\cap\cdots\cap A_{q-1}),
$$

rồi thay thừa số đầu bằng giả thiết quy nạp. $\square$
:::

### 2.2 Xác suất toàn phần và công thức Bayes

Bài toán xét nghiệm hỏi xác suất mắc bệnh khi dương tính, trong khi số liệu cho theo chiều ngược lại. Gọi $D$ là biến cố người được xét nghiệm mắc bệnh, $D^c$ là phần bù, và $+$, $-$ là hai biến cố kết quả dương tính, âm tính.

::: example Ví dụ 05c.7 (Xét nghiệm bằng tần số tự nhiên)
**Dữ kiện.** Tỉ lệ mắc $P(D)=0{,}001$; độ nhạy (sensitivity) $P(+\mid D)=0{,}95$; độ đặc hiệu (specificity) $P(-\mid D^c)=0{,}95$. Số liệu theo Koller và Friedman (2009, Ví dụ 2.2, tr. 19).

**Tần số trên $100\,000$ người.**

- Có $100$ người mắc; $95$ người trong số đó dương tính.
- Có $99\,900$ người không mắc; $5\,\%$ trong số đó, tức $4\,995$ người, dương tính.
- Tổng số người dương tính là $95+4\,995=5\,090$.

**Kết quả.** Trong $5\,090$ người dương tính có $95$ người mắc, nên

$$
P(D\mid+)=\frac{95}{5\,090}\approx0{,}0187 .
$$

**Diễn giải.** Một kết quả dương tính nâng xác suất mắc từ $0{,}001$ lên khoảng $0{,}019$, gấp gần $19$ lần, nhưng người dương tính vẫn nhiều khả năng không mắc. Lý do là người không mắc đông gấp $999$ lần người mắc, nên $5\,\%$ dương tính giả của họ lấn át $95\,\%$ dương tính thật.

**Kiểm tra lại.** $95+5+4\,995+94\,905=100\,000$.
:::

![Cây hai tầng trên 100 000 người. Tầng một: 100 người mắc, 99 900 người không mắc. Tầng hai: trong 100 người mắc có 95 dương tính và 5 âm tính; trong 99 900 người không mắc có 4 995 dương tính và 94 905 âm tính. Tổng số dương tính 5 090, trong đó 95 người mắc, nên P(mắc | +) = 95/5 090 ≈ 0,0187.](img/lec-05c/test-tree-natural-frequencies.svg)

Hình vẽ cây tần số của Ví dụ 05c.7. Hai lá "dương tính" nằm ở hai nhánh khác nhau; câu trả lời là tỉ số giữa lá dương tính của nhánh "mắc" và tổng hai lá dương tính. Hai kết quả sau là hai bước của phép tính đó: tách $P(+)$ theo trạng thái bệnh, rồi lấy tỉ số.

::: proposition Mệnh đề 05c.10 (Xác suất toàn phần)
**Giả thiết.** $B_1,\ldots,B_q$ là một phân hoạch của $\Omega$, tức đôi một rời nhau và có hợp bằng $\Omega$, với $P(B_j)>0$ cho mọi $j$. $A$ là một biến cố.

**Kết luận.**

$$
P(A)=\sum_{j=1}^qP(A\mid B_j)\,P(B_j).
\tag{2.3}
$$

**Điều kiện áp dụng.** Các $B_j$ phải phủ hết $\Omega$ và không chồng nhau.

**Phạm vi.** Kết quả đúng cả với phân hoạch đếm được, với cùng chứng minh.
:::

::: proof Chứng minh Mệnh đề 05c.10
**Bước 1 (tách biến cố).** Vì các $B_j$ phân hoạch $\Omega$, $A=\bigcup_j(A\cap B_j)$ với các phần đôi một rời nhau. Tiên đề (1.2) cho $P(A)=\sum_jP(A\cap B_j)$.

**Bước 2 (nhân).** Mệnh đề 05c.9 với hai biến cố cho $P(A\cap B_j)=P(A\mid B_j)P(B_j)$. Thay vào Bước 1 được (2.3). $\square$
:::

Công thức (2.3), gọi là công thức xác suất toàn phần (law of total probability), đọc là: xác suất của $A$ bằng trung bình có trọng số của các xác suất có điều kiện $P(A\mid B_j)$, với trọng số là xác suất của từng phần. Đó chính là phép cộng hai lá dương tính trên cây tần số. Định lý sau đảo chiều điều kiện, dùng Mệnh đề 05c.9 cho tử số và Mệnh đề 05c.10 cho mẫu số.

::: theorem Định lý 05c.11 (Công thức Bayes)
**Giả thiết.** Như Mệnh đề 05c.10, thêm $P(A)>0$.

**Kết luận.** Với mọi $j$,

$$
P(B_j\mid A)=\frac{P(A\mid B_j)\,P(B_j)}{\sum_{i=1}^qP(A\mid B_i)\,P(B_i)}.
\tag{2.4}
$$

**Điều kiện áp dụng.** Cần biết xác suất tiên nghiệm $P(B_i)$ của mọi phần và xác suất $P(A\mid B_i)$ của dữ kiện trong mọi phần.

**Phạm vi.** Kết quả đúng như một đẳng thức; độ tin cậy của con số thu được phụ thuộc hoàn toàn vào độ chính xác của các xác suất đầu vào.
:::

::: proof Chứng minh Định lý 05c.11
**Bước 1 (định nghĩa).** Theo (2.1), $P(B_j\mid A)=P(A\cap B_j)/P(A)$.

**Bước 2 (tử số và mẫu số).** Mệnh đề 05c.9 cho $P(A\cap B_j)=P(A\mid B_j)P(B_j)$; Mệnh đề 05c.10 cho $P(A)=\sum_iP(A\mid B_i)P(B_i)$. Thay hai biểu thức vào Bước 1 được (2.4). $\square$
:::

Công thức Bayes có ba thành phần. $P(B_j)$ là xác suất tiên nghiệm (prior), xác suất trước khi biết $A$; $P(A\mid B_j)$ là độ hợp lý (likelihood) của dữ kiện dưới giả thuyết $B_j$; vế trái là xác suất hậu nghiệm (posterior). Mẫu số chỉ là hằng số chuẩn hóa, nên hậu nghiệm tỉ lệ với tích tiên nghiệm nhân độ hợp lý.

Áp (2.4) cho ví dụ xét nghiệm với phân hoạch $\{D,D^c\}$ và $A=+$:

$$
\begin{aligned}
P(+)&=0{,}95\cdot0{,}001+0{,}05\cdot0{,}999=0{,}0509,\\
P(D\mid+)&=\frac{0{,}00095}{0{,}0509}\approx0{,}0187,
\end{aligned}
$$

khớp với cây tần số. Nếu tỉ lệ mắc là $0{,}01$ thay cho $0{,}001$, cùng phép tính cho $P(D\mid+)=0{,}0095/0{,}059\approx0{,}161$: tiên nghiệm tăng mười lần làm hậu nghiệm tăng gần chín lần.

Định lý 05c.11 chỉ dùng (2.1) hai lần; giá trị của nó là đảo chiều điều kiện từ đại lượng đo được sang đại lượng cần cho quyết định. Đối chiếu Bài 00: mục "Phân phối biên, có điều kiện, xác suất toàn phần và Bayes" phát biểu cùng hai công thức với ký hiệu $\Pr$.

::: example Ví dụ 05c.8 (Bộ lọc thư rác với một từ khóa)
**Dữ kiện.** Trong luồng thư đến, $40\,\%$ là thư rác. Một từ khóa xuất hiện trong $25\,\%$ thư rác và trong $2\,\%$ thư thường. Gọi $Q$ là biến cố "thư là thư rác" và $E$ là biến cố "thư chứa từ khóa".

**Mô hình hóa.** Phân hoạch $\{Q,Q^c\}$ với $P(Q)=0{,}4$, $P(Q^c)=0{,}6$; độ hợp lý $P(E\mid Q)=0{,}25$ và $P(E\mid Q^c)=0{,}02$.

**Áp dụng Định lý 05c.11.**

$$
\begin{aligned}
P(Q\mid E)&=\frac{0{,}25\cdot0{,}4}{0{,}25\cdot0{,}4+0{,}02\cdot0{,}6}\\
&=\frac{0{,}1}{0{,}112}\\
&\approx0{,}893 .
\end{aligned}
$$

**Diễn giải.** Một thư chứa từ khóa là thư rác với xác suất $0{,}893$. Bộ lọc gắn nhãn "rác" khi hậu nghiệm vượt $0{,}5$ sẽ gắn nhãn cho mọi thư chứa từ khóa.

**Kiểm tra lại.** $P(Q^c\mid E)=0{,}012/0{,}112\approx0{,}107$, và $0{,}893+0{,}107=1$.
:::

**Trong học máy.** Định lý 05c.11 nối xác suất của nhãn khi biết đặc trưng, đại lượng mô hình phân loại ước lượng, với độ hợp lý và tiên nghiệm của nhãn (Goodfellow và cộng sự, 2016, mục 3.11, tr. 70). Khi tỉ lệ lớp lúc triển khai khác lúc huấn luyện, hậu nghiệm đổi theo; Bài tập 05c.2 tính hậu quả này.

### 2.3 Độc lập của biến cố

Phép đếm $N^b$ và Định lý 05.11 đều coi các lần rút không ảnh hưởng nhau. Về trực giác, chưa hình thức: biết một biến cố đã xảy ra không làm đổi xác suất của biến cố kia, $P(B\mid A)=P(B)$; nhân hai vế với $P(A)$ được dạng đối xứng dùng được cả khi $P(A)=0$.

::: example Ví dụ 05c.9 (Rút hai lần từ ba quan sát)
**Dữ kiện.** Rút hai lần một giá trị từ tập ba quan sát $\{-1,1,3\}$ của ví dụ ba quan sát. Gọi $A$ là biến cố "lần 1 ra $3$" và $B$ là biến cố "lần 2 ra $3$".

**Có hoàn lại.** Không gian mẫu gồm $9$ cặp có thứ tự, đồng khả năng. $A$ và $B$ mỗi biến cố có $3$ cặp, $A\cap B=\{(3,3)\}$. Do đó $P(A)=P(B)=\tfrac13$ và $P(A\cap B)=\tfrac19=P(A)P(B)$.

**Không hoàn lại.** Không gian mẫu gồm $3\cdot2=6$ cặp có thứ tự gồm hai giá trị khác nhau, đồng khả năng. $A$ có $2$ cặp, $B$ có $2$ cặp, nên $P(A)=P(B)=\tfrac13$. Nhưng $A\cap B=\varnothing$, nên $P(A\cap B)=0\ne\tfrac19$ và $P(B\mid A)=0$.

**Diễn giải.** Hai mô hình cho cùng xác suất của từng lần rút, nhưng chỉ mô hình có hoàn lại cho xác suất của giao bằng tích.

**Kiểm tra lại.** Không hoàn lại, phân hoạch theo lần 1 và Mệnh đề 05c.10 cho $P(B)=\tfrac13\cdot\tfrac12+\tfrac13\cdot\tfrac12+\tfrac13\cdot0=\tfrac13$.
:::

::: definition Định nghĩa 05c.12 (Độc lập của biến cố)
**Hai biến cố.** Hai biến cố $A$, $B$ độc lập (independent) nếu

$$
P(A\cap B)=P(A)\,P(B).
\tag{2.5}
$$

**Họ biến cố.** Các biến cố $A_1,\ldots,A_q$ độc lập nếu với mọi tập chỉ số $T\subseteq\{1,\ldots,q\}$ có ít nhất hai phần tử,

$$
P\Bigl(\bigcap_{j\in T}A_j\Bigr)=\prod_{j\in T}P(A_j).
\tag{2.6}
$$
:::

Khi $P(A)>0$, (2.5) tương đương $P(B\mid A)=P(B)$ (Koller và Friedman, 2009, Định nghĩa 2.2 và Mệnh đề 2.1, tr. 23). Độc lập là tính chất của xác suất $P$, không của các tập: cùng hai tập "lần 1 ra 3" và "lần 2 ra 3" độc lập dưới mô hình có hoàn lại và phụ thuộc dưới mô hình không hoàn lại.

Độc lập khác rời nhau. Hai biến cố rời nhau, mỗi biến cố có xác suất dương, không bao giờ độc lập: $P(A\cap B)=0<P(A)P(B)$. Trong Ví dụ 05c.9, hai biến cố $A$, $B$ không hoàn lại rời nhau và do đó phụ thuộc.

Định nghĩa đòi đẳng thức tích (2.6) cho mọi họ con, không chỉ cho từng cặp. Nhận xét sau chỉ ra điều kiện theo từng cặp không đủ.

::: remark Nhận xét 05c.13 (Độc lập từng đôi không kéo theo độc lập)
Tung hai đồng xu cân đối; bốn kết cục đồng khả năng. Gọi $A_1$ là "xu 1 ngửa", $A_2$ là "xu 2 ngửa", $A_3$ là "hai xu khác mặt". Mỗi biến cố có xác suất $\tfrac12$. Mỗi giao hai biến cố gồm đúng một kết cục, chẳng hạn $A_1\cap A_3$ chỉ gồm kết cục (ngửa, sấp), nên có xác suất $\tfrac14=\tfrac12\cdot\tfrac12$; ba cặp đều độc lập.

Nhưng $A_1\cap A_2\cap A_3=\varnothing$, vì hai xu cùng ngửa thì không khác mặt. Do đó $P(A_1\cap A_2\cap A_3)=0\ne\tfrac18$, và ba biến cố không độc lập theo Định nghĩa 05c.12. Biết hai biến cố bất kỳ xảy ra xác định hoàn toàn biến cố thứ ba.
:::

Mệnh đề sau xác nhận trực giác ban đầu cho mô hình rút có hoàn lại: mọi biến cố chỉ nói về những lần rút khác nhau là độc lập.

::: proposition Mệnh đề 05c.14 (Các lần rút có hoàn lại độc lập)
**Giả thiết.** Nhóm $b$ chỉ số $I_1,\ldots,I_b$ rút đều có hoàn lại từ $N$ quan sát (Định nghĩa 05c.5). Với mỗi $r$, $T_r\subseteq\{1,\ldots,N\}$ là một tập chỉ số và $A_r$ là biến cố $\{I_r\in T_r\}$.

**Kết luận.**

1. $P(A_r)=\lvert T_r\rvert/N$; riêng $P(I_r=i)=\tfrac1N$ với mọi $i$.
2. Các biến cố $A_1,\ldots,A_b$ độc lập.

**Điều kiện áp dụng.** Cần mô hình đồng khả năng trên $\{1,\ldots,N\}^b$.

**Phạm vi.** Với mô hình không hoàn lại, $N\ge2$ và $b\ge2$, kết luận 1 vẫn đúng nhưng kết luận 2 sai.
:::

::: proof Chứng minh Mệnh đề 05c.14
**Bước 1 (giao của mọi biến cố).** Biến cố $A_1\cap\cdots\cap A_b$ gồm các dãy có $i_r\in T_r$ cho mọi $r$. Theo quy tắc nhân (phần 1 của Mệnh đề 05c.4), có $\lvert T_1\rvert\cdots\lvert T_b\rvert$ dãy như vậy, nên

$$
P(A_1\cap\cdots\cap A_b)=\frac{\lvert T_1\rvert\cdots\lvert T_b\rvert}{N^b}=\prod_{r=1}^b\frac{\lvert T_r\rvert}N .
$$

**Bước 2 (từng biến cố).** Lấy $T_s=\{1,\ldots,N\}$ cho mọi $s\ne r$; khi đó $A_s=\Omega$ và Bước 1 cho $P(A_r)=\lvert T_r\rvert/N$. Đây là kết luận 1.

**Bước 3 (họ con).** Với tập chỉ số $U\subseteq\{1,\ldots,b\}$, thay $T_s$ bằng $\{1,\ldots,N\}$ cho mọi $s\notin U$. Giao $\bigcap_{r\in U}A_r$ không đổi, và Bước 1 cùng Bước 2 cho $P(\bigcap_{r\in U}A_r)=\prod_{r\in U}P(A_r)$. Đó là (2.6).

**Bước 4 (không hoàn lại).** Với $N\ge2$, biến cố $\{I_1=1\}\cap\{I_2=1\}$ rỗng trong mô hình không hoàn lại, nên có xác suất $0\ne\tfrac1{N^2}$. $\square$
:::

Mệnh đề 05c.14 là nền xác suất của giả thiết "các chỉ số độc lập, đều trên $\{1,\ldots,N\}$" trong Định nghĩa 05.10. Mô hình không hoàn lại giữ phân phối đều của từng lần rút nhưng mất tính độc lập, và Mục 4.6 cho thấy điều đó làm phương sai của gradient nhóm nhỏ đi.

**Trong học máy.** Giả thiết các quan sát huấn luyện là những lần rút độc lập từ cùng một phân phối là giả thiết chuẩn của học có giám sát (Goodfellow và cộng sự, 2016, mục 5.2, tr. 110–111). Nó bị vi phạm với chuỗi thời gian, với nhiều ảnh của cùng một bệnh nhân, hay với dữ liệu sắp theo nhãn mà không xáo trộn; Tình huống 05c.2 và Tình huống 05c.3 ước lượng hậu quả bằng số.

### 2.4 Độc lập có điều kiện

Một người làm hai xét nghiệm của Ví dụ 05c.7. Nếu sai số của hai lần không ảnh hưởng nhau khi đã biết trạng thái bệnh, xác suất hai lần cùng dương tính ở người mắc là $0{,}95^2=0{,}9025$. Nhưng kết quả hai lần không độc lập vô điều kiện: lần một dương tính làm tăng xác suất mắc bệnh, do đó tăng xác suất lần hai dương tính. Khái niệm sau phát biểu giả thiết "không ảnh hưởng nhau khi đã biết trạng thái bệnh".

::: definition Định nghĩa 05c.15 (Độc lập có điều kiện)
Cho biến cố $H$ với $P(H)>0$. Hai biến cố $A$, $B$ độc lập có điều kiện (conditionally independent) theo $H$ nếu

$$
P(A\cap B\mid H)=P(A\mid H)\,P(B\mid H).
\tag{2.7}
$$
:::

Định nghĩa 05c.15 là Định nghĩa 05c.12 áp cho xác suất $P(\cdot\mid H)$, xác suất hợp lệ theo nhận xét sau Định nghĩa 05c.8 (Koller và Friedman, 2009, Định nghĩa 2.3, tr. 24). Hai khái niệm không kéo theo nhau theo chiều nào. Ví dụ sau cho độc lập có điều kiện mà không độc lập; Nhận xét 05c.16 cho chiều ngược lại.

::: example Ví dụ 05c.10 (Hai lần xét nghiệm)
**Dữ kiện.** Ví dụ xét nghiệm: $P(D)=0{,}001$, độ nhạy $P(+\mid D)=0{,}95$, độ đặc hiệu $P(-\mid D^c)=0{,}95$. Hai kết quả $+_1$, $+_2$ độc lập có điều kiện theo $D$ và theo $D^c$, cùng độ nhạy và độ đặc hiệu.

**Độ hợp lý của hai kết quả dương tính.** Theo (2.7), $P(+_1\cap+_2\mid D)=0{,}95^2=0{,}9025$ và $P(+_1\cap+_2\mid D^c)=0{,}05^2=0{,}0025$.

**Hậu nghiệm.** Định lý 05c.11 với phân hoạch $\{D,D^c\}$:

$$
\begin{aligned}
P(D\mid+_1\cap+_2)&=\frac{0{,}001\cdot0{,}9025}{0{,}001\cdot0{,}9025+0{,}999\cdot0{,}0025}\\
&=\frac{0{,}0009025}{0{,}0034}\\
&\approx0{,}265 .
\end{aligned}
$$

**Không độc lập vô điều kiện.** Mẫu số trên là $P(+_1\cap+_2)=0{,}0034$, và $P(+_1)=P(+_2)=0{,}0509$ theo Mục 2.2. Do đó $P(+_2\mid+_1)=0{,}0034/0{,}0509\approx0{,}067$, khác $P(+_2)=0{,}0509$.

**Kiểm tra lại.** $0{,}999\cdot0{,}0025=0{,}0024975$, và $0{,}0009025+0{,}0024975=0{,}0034$.
:::

Hai kết quả dương tính nâng xác suất mắc lên $0{,}265$, so với $0{,}0187$ sau một kết quả. Kết quả lần một mang thông tin về trạng thái bệnh, và trạng thái bệnh quyết định xác suất của kết quả lần hai; đó là lý do $P(+_2\mid+_1)$ lớn hơn $P(+_2)$.

::: remark Nhận xét 05c.16 (Độc lập không kéo theo độc lập có điều kiện)
**Dữ kiện.** Nhận xét 05c.13: hai đồng xu cân đối, $A_1$ là "xu 1 ngửa", $A_2$ là "xu 2 ngửa", $A_3$ là "hai xu khác mặt"; $A_1$ và $A_2$ độc lập.

**Lập luận.** Biết $A_3$, còn hai kết cục (ngửa, sấp) và (sấp, ngửa), nên $P(A_1\mid A_3)=P(A_2\mid A_3)=\tfrac12$. Nhưng $P(A_1\cap A_2\mid A_3)=0$, khác $\tfrac14=P(A_1\mid A_3)P(A_2\mid A_3)$, nên $A_1$, $A_2$ không độc lập có điều kiện theo $A_3$: biết hai xu khác mặt và xu 1 ngửa thì xu 2 chắc chắn sấp.
:::

**Trong học máy.** Bộ phân loại Bayes ngây thơ (naive Bayes) giả thiết các đặc trưng độc lập có điều kiện khi biết nhãn và nhân các độ hợp lý (Koller và Friedman, 2009, mục 3.1.3). Khi hai từ hay đi cùng nhau trong một thư, giả thiết sai và tích các độ hợp lý đếm cùng một bằng chứng hai lần.

::: exercise Bài tập 05c.2 (Bộ lọc hai từ khóa khi tỉ lệ thư rác đổi)
**Dữ kiện.** Ví dụ 05c.8: tỉ lệ thư rác $P(Q)=0{,}4$; từ khóa thứ nhất $E_1$ có $P(E_1\mid Q)=0{,}25$, $P(E_1\mid Q^c)=0{,}02$. Thêm từ khóa thứ hai $E_2$ với $P(E_2\mid Q)=0{,}1$, $P(E_2\mid Q^c)=0{,}05$. Giả thiết $E_1$, $E_2$ độc lập có điều kiện theo $Q$ và theo $Q^c$.

1. Tính $P(Q\mid E_1\cap E_2^c)$, xác suất thư là rác khi chứa từ khóa thứ nhất và không chứa từ khóa thứ hai.
2. Bộ lọc được triển khai cho một hộp thư có tỉ lệ thư rác $0{,}1$, các độ hợp lý giữ nguyên. Tính lại xác suất ở câu 1 và cho biết quyết định "rác" theo ngưỡng $0{,}5$ có đổi không.
:::

::: hint
Nếu $A$, $B$ độc lập thì $A$ và $B^c$ độc lập, vì $P(A\cap B^c)=P(A)-P(A)P(B)=P(A)P(B^c)$; áp điều này cho xác suất $P(\cdot\mid Q)$, với $P(E_2^c\mid Q)=1-P(E_2\mid Q)$. Áp Định lý 05c.11 với phân hoạch $\{Q,Q^c\}$.
:::

::: solution
**Câu 1.** Theo (2.7) áp cho $E_1$ và $E_2^c$:

- $P(E_1\cap E_2^c\mid Q)=0{,}25\cdot0{,}9=0{,}225$;
- $P(E_1\cap E_2^c\mid Q^c)=0{,}02\cdot0{,}95=0{,}019$.

Định lý 05c.11:

$$
\begin{aligned}
P(Q\mid E_1\cap E_2^c)&=\frac{0{,}225\cdot0{,}4}{0{,}225\cdot0{,}4+0{,}019\cdot0{,}6}\\
&=\frac{0{,}09}{0{,}1014}\\
&\approx0{,}888 .
\end{aligned}
$$

**Câu 2.** Với tiên nghiệm $0{,}1$:

$$
\begin{aligned}
P(Q\mid E_1\cap E_2^c)&=\frac{0{,}225\cdot0{,}1}{0{,}225\cdot0{,}1+0{,}019\cdot0{,}9}\\
&=\frac{0{,}0225}{0{,}0396}\\
&\approx0{,}568 .
\end{aligned}
$$

Quyết định "rác" giữ nguyên vì $0{,}568>0{,}5$, nhưng biên an toàn giảm từ $0{,}388$ xuống $0{,}068$.

**Kiểm tra lại.** Ở câu 1, $0{,}019\cdot0{,}6=0{,}0114$ và $0{,}09+0{,}0114=0{,}1014$.
:::

**Chuỗi suy luận của mục.** Định nghĩa 05c.8 chia lại khối lượng khi có thông tin; Mệnh đề 05c.9 và Mệnh đề 05c.10 cho cách tính theo cây; Định lý 05c.11 đảo chiều điều kiện. Định nghĩa 05c.12 và Mệnh đề 05c.14 xác lập rằng các lần rút có hoàn lại là độc lập, điều kiện mà mọi phép tính phương sai về sau cần; Định nghĩa 05c.15 là dạng có điều kiện của cùng khái niệm.

**Kết mục.** Mục này cho xác suất khi có thông tin (Định lý 05c.11) và chứng minh các lần rút có hoàn lại độc lập (Mệnh đề 05c.14). Các đối tượng vẫn là biến cố, trong khi gradient mẫu và tổng hai xúc xắc là những con số gán cho kết cục. Mục 3 định nghĩa biến ngẫu nhiên và phân phối, để câu hỏi về giá trị của gradient trở thành câu hỏi về biến cố $\{g_I(\theta)\ge t\}$.

## 3. Biến ngẫu nhiên và phân phối

Mục 2 xác lập rằng các lần rút có hoàn lại độc lập, nhưng câu hỏi về gradient nhóm là câu hỏi về một con số: tại $\theta=1$, gradient nhóm hai chỉ số nhận giá trị nào với xác suất bao nhiêu. Mục này định nghĩa biến ngẫu nhiên và hàm khối xác suất, giới thiệu các phân phối rời rạc dùng trong chương và phần liên tục tối thiểu, rồi định nghĩa độc lập cho biến. Đích của mục là mô tả tường minh của gradient mẫu được rút.

### 3.1 Biến ngẫu nhiên, hàm khối xác suất và hàm phân phối tích lũy

Trực giác, chưa phải định nghĩa: một biến ngẫu nhiên gán cho mỗi kết cục một số, và mọi câu hỏi về nó quy về xác suất của các biến cố "giá trị bằng $x$". Vẽ mỗi giá trị có thể như một cột có chiều cao bằng xác suất của nó; các cột có tổng chiều cao bằng $1$.

::: example Ví dụ 05c.11 (Phân phối của tổng hai xúc xắc)
**Dữ kiện.** Ví dụ hai xúc xắc: $36$ cặp $(i,j)$ đồng khả năng. Đặt $S(i,j)=i+j$.

**Đếm.** Với mỗi giá trị $s$ từ $2$ đến $12$, số cặp có tổng $s$ là $6-\lvert s-7\rvert$:

| $s$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ | $11$ | $12$ |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| $36\,P(S=s)$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $5$ | $4$ | $3$ | $2$ | $1$ |

**Một xác suất suy từ bảng.** Biến cố $\{S\le7\}$ là hợp rời nhau của sáu biến cố $\{S=s\}$, $s\le7$, nên $P(S\le7)=\tfrac{1+2+3+4+5+6}{36}$, tức $\tfrac{21}{36}=\tfrac7{12}$.

**Kiểm tra lại.** Tổng hàng dưới là $2(1+2+3+4+5)+6=36$.
:::

::: definition Định nghĩa 05c.17 (Biến ngẫu nhiên rời rạc và hàm khối xác suất)
Cho không gian xác suất rời rạc $(\Omega,P)$.

**Biến ngẫu nhiên.** Một biến ngẫu nhiên (random variable) là một hàm $X:\Omega\to\mathbb R$. Với $x\in\mathbb R$, viết $\{X=x\}$ cho biến cố $\{\omega\in\Omega: X(\omega)=x\}$, và tương tự cho $\{X\le x\}$, $\{X\in T\}$ với $T\subseteq\mathbb R$.

**Hàm khối xác suất.** Hàm khối xác suất (probability mass function, PMF) của $X$ là

$$
p_X(x)=P(X=x),\qquad x\in\mathbb R .
\tag{3.1}
$$

Tập các giá trị $x$ có $p_X(x)>0$ gọi là tập giá trị của $X$.
:::

Chữ hoa $X$ chỉ biến ngẫu nhiên, tức một hàm; chữ thường $x$ chỉ một giá trị số. Vì $\Omega$ đếm được, tập giá trị của $X$ đếm được. Các biến cố $\{X=x\}$ với $x$ chạy trên tập giá trị đôi một rời nhau và có hợp bằng $\Omega$, nên tiên đề (1.2) cho $\sum_xp_X(x)=1$, và với mọi $T\subseteq\mathbb R$,

$$
P(X\in T)=\sum_{x\in T}p_X(x).
\tag{3.2}
$$

Công thức (3.2) đọc là: xác suất để $X$ rơi vào một tập bằng tổng chiều cao các cột nằm trong tập đó. Nó là (1.3) chuyển từ kết cục sang giá trị, và là cách tính $P(S\le7)$ ở Ví dụ 05c.11.

Biến ngẫu nhiên là một hàm xác định; tính ngẫu nhiên nằm ở kết cục $\omega$. Hai biến khác nhau có thể cùng PMF: mặt của xúc xắc thứ nhất và mặt của xúc xắc thứ hai là hai hàm khác nhau trên $\Omega$ nhưng cùng PMF đều. Đối chiếu Bài 00: mục "Biến rời rạc và hàm khối xác suất" dùng cùng ký hiệu $p_X$.

::: definition Định nghĩa 05c.18 (Hàm phân phối tích lũy)
Hàm phân phối tích lũy (cumulative distribution function, CDF) của biến ngẫu nhiên $X$ là

$$
F_X(x)=P(X\le x),\qquad x\in\mathbb R .
\tag{3.3}
$$
:::

PMF trả lời "xác suất bằng $x$", CDF trả lời "xác suất không vượt $x$". Với biến rời rạc, (3.2) cho $F_X(x)=\sum_{x'\le x}p_X(x')$, nên CDF là hàm bậc thang nhảy tại mỗi giá trị, với bước nhảy bằng $p_X$ tại đó. Ở Ví dụ 05c.11, $F_S(7)=\tfrac7{12}$ và $F_S$ hằng trên $[7,8)$. Mệnh đề sau ghi các tính chất được dùng về sau.

::: proposition Mệnh đề 05c.19 (Tính chất của hàm phân phối tích lũy)
**Giả thiết.** $X$ là biến ngẫu nhiên trên một không gian xác suất rời rạc.

**Kết luận.**

1. $F_X$ không giảm.
2. Với $\alpha<\beta$, $P(\alpha<X\le\beta)=F_X(\beta)-F_X(\alpha)$.
3. $P(X>x)=1-F_X(x)$.

**Điều kiện áp dụng.** Không cần giả thiết thêm.

**Phạm vi.** Ngoài ba tính chất trên, $F_X(x)\to0$ khi $x\to-\infty$ và $F_X(x)\to1$ khi $x\to+\infty$; chương này không dùng hai giới hạn đó.
:::

::: proof Chứng minh Mệnh đề 05c.19
**Bước 1 (không giảm).** Với $x\le x'$, $\{X\le x\}\subseteq\{X\le x'\}$, nên phần 3 của Mệnh đề 05c.2 cho $F_X(x)\le F_X(x')$.

**Bước 2 (hiệu).** $\{X\le\beta\}$ là hợp rời nhau của $\{X\le\alpha\}$ và $\{\alpha<X\le\beta\}$; tiên đề (1.2) cho $F_X(\beta)=F_X(\alpha)+P(\alpha<X\le\beta)$.

**Bước 3 (đuôi phải).** $\{X>x\}$ là phần bù của $\{X\le x\}$; dùng phần 2 của Mệnh đề 05c.2. $\square$
:::

Phần 3 là dạng các bất đẳng thức của Mục 5 sẽ chặn: xác suất đuôi $P(X>x)$ hoặc $P(X\ge x)$. Đối chiếu Bài 00: mục "Hàm phân phối tích lũy và quan hệ PMF–PDF–CDF" nêu cùng các tính chất cho cả biến liên tục (Koller và Friedman, 2009, tr. 28).

### 3.2 Các phân phối rời rạc thường dùng

Mục 5 so các cận xác suất với xác suất đúng của số mặt ngửa khi tung $n$ đồng xu, và Mục 6 đếm số lỗi phân loại trên một tập kiểm thử; cả hai cần PMF của một tổng các biến nhận giá trị $0$ hoặc $1$. Ví dụ sau tính PMF đó với ba đồng xu bằng cách liệt kê.

::: example Ví dụ 05c.12 (Số mặt ngửa của ba đồng xu)
**Dữ kiện.** Tung ba đồng xu cân đối; tám dãy sấp, ngửa đồng khả năng. $S$ là số mặt ngửa.

**Liệt kê.** $S=0$ trên một dãy, $S=1$ trên ba dãy (ngửa ở vị trí 1, 2 hoặc 3), $S=2$ trên ba dãy, $S=3$ trên một dãy. Số dãy có $S=k$ là $\binom3k$, theo phần 4 của Mệnh đề 05c.4: chọn $k$ vị trí ngửa.

**PMF.** $p_S(0),p_S(1),p_S(2),p_S(3)$ lần lượt bằng $\tfrac18,\tfrac38,\tfrac38,\tfrac18$.

**Kiểm tra lại.** $1+3+3+1=8=2^3$.
:::

::: definition Định nghĩa 05c.20 (Các phân phối rời rạc thường dùng)
Cho $p\in[0,1]$ và các số nguyên dương $n$, $N$.

1. **Bernoulli$(p)$.** $X\in\{0,1\}$ với $P(X=1)=p$ và $P(X=0)=1-p$.
2. **Nhị thức$(n,p)$.** $S\in\{0,1,\ldots,n\}$ với $P(S=k)=\binom nkp^k(1-p)^{n-k}$.
3. **Đều trên $\{1,\ldots,N\}$.** $P(I=i)=\tfrac1N$ với mọi $i\in\{1,\ldots,N\}$.
4. **Hình học$(p)$, với $p>0$.** $G\in\{1,2,\ldots\}$ với $P(G=k)=(1-p)^{k-1}p$.
:::

Bernoulli mô tả một lần thử hai kết quả, chẳng hạn một ảnh bị phân loại sai hay đúng (Goodfellow và cộng sự, 2016, mục 3.9.1, tr. 62); nhị thức là số lần thành công trong $n$ lần thử độc lập (Mệnh đề 05c.21). Mỗi $I_r$ của nhóm rút có hoàn lại có phân phối đều (Mệnh đề 05c.14); hình học là số lần thử tới lần thành công đầu tiên.

Tổng các xác suất của phân phối hình học bằng $1$ theo chuỗi hình học: $\sum_{k\ge1}(1-p)^{k-1}p=p\cdot\tfrac1{1-(1-p)}=1$. Đối chiếu Bài 00: mục "Biến rời rạc và hàm khối xác suất" ký hiệu tham số Bernoulli là $\pi$; chương này dùng $p$ vì nó trùng với tỉ lệ lỗi $p$ ở Mục 5 và Mục 6.

::: proposition Mệnh đề 05c.21 (Tổng các biến Bernoulli độc lập)
**Giả thiết.** Thực hiện $n$ phép thử; phép thử thứ $i$ cho $X_i\in\{0,1\}$ với $P(X_i=1)=p$. Với mọi dãy $(x_1,\ldots,x_n)\in\{0,1\}^n$, các biến cố $\{X_1=x_1\},\ldots,\{X_n=x_n\}$ độc lập.

**Kết luận.** $S=\sum_{i=1}^nX_i$ có phân phối nhị thức$(n,p)$.

**Điều kiện áp dụng.** Cần cùng xác suất thành công $p$ ở mọi phép thử và tính độc lập.

**Phạm vi.** Khi các phép thử phụ thuộc nhau, $S$ vẫn nhận giá trị trong $\{0,\ldots,n\}$ nhưng PMF có thể khác hẳn; Tình huống 05c.2 có một trường hợp như vậy.
:::

::: proof Chứng minh Mệnh đề 05c.21
**Bước 1 (một dãy).** Cố định một dãy $(x_1,\ldots,x_n)$ có đúng $k$ số $1$. Theo (2.6), xác suất của giao $\{X_1=x_1\}\cap\cdots\cap\{X_n=x_n\}$ bằng tích $n$ thừa số, trong đó $k$ thừa số bằng $p$ và $n-k$ thừa số bằng $1-p$, tức $p^k(1-p)^{n-k}$.

**Bước 2 (đếm các dãy).** Có $\binom nk$ dãy với đúng $k$ số $1$, theo phần 4 của Mệnh đề 05c.4: chọn $k$ vị trí của các số $1$.

**Bước 3 (cộng).** Biến cố $\{S=k\}$ là hợp rời nhau của các biến cố ứng với $\binom nk$ dãy ở Bước 2, nên tiên đề (1.2) cho $P(S=k)=\binom nkp^k(1-p)^{n-k}$. $\square$
:::

Ví dụ 05c.12 là trường hợp $n=3$, $p=\tfrac12$: mỗi dãy có xác suất $\tfrac18$ và $\binom3k$ đếm các dãy. Với $n=10$ đồng xu cân đối, cùng công thức cho $P(S\ge8)=\bigl(\binom{10}8+\binom{10}9+\binom{10}{10}\bigr)/2^{10}$, tức $\tfrac{56}{1024}\approx0{,}0547$.

::: example Ví dụ 05c.13 (Số lỗi trên mười ảnh kiểm thử)
**Dữ kiện.** Một mô hình phân loại sai mỗi ảnh với xác suất $p=0{,}1$, độc lập giữa các ảnh. Kiểm thử trên $n=10$ ảnh; $S$ là số ảnh bị phân loại sai.

**Mô hình hóa.** Theo Mệnh đề 05c.21, $S$ có phân phối nhị thức$(10;0{,}1)$.

**Tính.**

- $P(S=0)=0{,}9^{10}\approx0{,}3487$;
- $P(S=1)=10\cdot0{,}1\cdot0{,}9^9\approx0{,}3874$;
- $P(S=2)=45\cdot0{,}01\cdot0{,}9^8\approx0{,}1937$.

Theo phần 3 của Mệnh đề 05c.19, $P(S\ge3)=1-F_S(2)$, và $F_S(2)\approx0{,}9298$ cho $P(S\ge3)\approx0{,}0702$.

**Diễn giải.** Một mô hình có tỉ lệ lỗi thật $10\,\%$ vẫn cho $0$ lỗi trên mười ảnh với xác suất gần $0{,}35$; tỉ lệ lỗi đo được trên mười ảnh dao động mạnh quanh tỉ lệ thật.

**Kiểm tra lại.** $0{,}9^9\approx0{,}3874$ và $0{,}9^8\approx0{,}4305$; $45\cdot0{,}01\cdot0{,}4305\approx0{,}1937$.
:::

Phân phối hình học được dùng ở Mục 5.6. Biến cố $\{G>k\}$ là "$k$ lần thử đầu đều thất bại", nên với các lần thử độc lập, $P(G>k)=(1-p)^k$. Với $0<p<1$ và các số nguyên $k,j\ge0$, định nghĩa (2.1) cho $P(G>k+j\mid G>k)=(1-p)^{k+j}/(1-p)^k$, tức $P(G>k+j\mid G>k)=P(G>j)$: biết $k$ lần thử đầu thất bại, số lần thử còn lại có cùng phân phối với $G$; đó là tính không nhớ (memorylessness).

Ví dụ, nếu $1\,\%$ quan sát của một tập dữ liệu thuộc một lớp hiếm và các chỉ số được rút đều có hoàn lại, thì sau $100$ lần rút vẫn chưa gặp lớp hiếm với xác suất $0{,}99^{100}\approx0{,}366$.

### 3.3 Biến liên tục và hàm mật độ

Phân phối dữ liệu $\mathcal P$ thường có giá trị liên tục, như cường độ điểm ảnh; khi đó mỗi giá trị riêng lẻ có xác suất $0$ và PMF không mang thông tin. Ở mức trực giác: khối lượng xác suất trải liên tục trên trục số với một mật độ; xác suất của một khoảng là diện tích dưới đường mật độ.

::: example Ví dụ 05c.14 (Một số đều trong đoạn đơn vị)
**Dữ kiện.** Chọn một số $X$ trong $[0,1]$ sao cho xác suất rơi vào mỗi đoạn con tỉ lệ với độ dài đoạn: $P(\alpha\le X\le\beta)=\beta-\alpha$ với $0\le\alpha\le\beta\le1$.

**Tính.** $P(0{,}2\le X\le0{,}5)=0{,}3$. Lấy $\alpha=\beta=\tfrac12$ cho $P(X=\tfrac12)=0$. CDF là $F_X(x)=x$ trên $[0,1]$, bằng $0$ khi $x<0$ và bằng $1$ khi $x>1$.

**Diễn giải.** Mật độ bằng $1$ trên $[0,1]$ và $0$ ngoài đoạn: diện tích dưới đường mật độ trên $[\alpha,\beta]$ là $\beta-\alpha$.

**Kiểm tra lại.** Diện tích toàn phần là $1\cdot1=1$.
:::

::: definition Định nghĩa 05c.22 (Biến có mật độ; phân phối đều và Gauss)
**Mật độ.** Biến ngẫu nhiên $X$ có mật độ (probability density) $p_X:\mathbb R\to[0,\infty)$, với $\int_{\mathbb R}p_X(x)\,dx=1$, nếu với mọi $\alpha\le\beta$,

$$
P(\alpha\le X\le\beta)=\int_\alpha^\beta p_X(x)\,dx .
\tag{3.4}
$$

Khi đó $F_X(x)=\int_{-\infty}^xp_X(t)\,dt$.

**Đều trên $[0,1]$.** $p_X(x)=1$ khi $x\in[0,1]$ và $0$ ở ngoài.

**Gauss.** Cho $\mu\in\mathbb R$ và $s>0$. Phân phối Gauss $\mathcal N(\mu,s^2)$ có mật độ

$$
p_X(x)=\frac1{\sqrt{2\pi s^2}}\exp\Bigl(-\frac{(x-\mu)^2}{2s^2}\Bigr).
$$
:::

Mật độ không phải xác suất: mật độ đều trên $[0;0{,}5]$ bằng $2$. Ký hiệu $p_X$ dùng chung cho PMF và mật độ vì tổng trong (3.2) được thay bằng tích phân trong (3.4).

Phân phối Gauss chỉ được phát biểu để đặt tên cho định lý giới hạn trung tâm ở Mục 5.6 (Koller và Friedman, 2009, Định nghĩa 2.6–2.7, tr. 28). Bài 00, mục "Biến liên tục và hàm mật độ xác suất", viết phương sai Gauss là $\sigma^2$; chương này viết $s^2$ để không trùng $\sigma_1^2$.

Các chứng minh của chương viết cho biến rời rạc. Với biến có mật độ, các kết quả về kỳ vọng, phương sai và các bất đẳng thức của Mục 5 vẫn đúng khi thay tổng theo giá trị bằng tích phân theo mật độ; chương dùng các phiên bản đó mà không chứng minh lại.

### 3.4 Phân phối đồng thời và độc lập của biến ngẫu nhiên

Trung bình mẫu và tích các thừa số $e^{\lambda X_i}$ ở Mục 5 liên quan tới nhiều biến cùng lúc, và PMF của từng biến không đủ. Trực giác, chưa phải định nghĩa: phân phối đồng thời của hai biến là một bảng; hai biến không ảnh hưởng nhau khi mỗi ô bằng tích tổng hàng và tổng cột của nó.

::: example Ví dụ 05c.15 (Bảng đồng thời của hai lần rút)
**Dữ kiện.** Rút hai lần từ $\{-1,1,3\}$ như Ví dụ 05c.9; $X_1$, $X_2$ là giá trị lần 1 và lần 2.

**Có hoàn lại.** Cả $9$ ô của bảng bằng $\tfrac19$; mỗi tổng hàng và tổng cột bằng $\tfrac13$, và mọi ô bằng $\tfrac13\cdot\tfrac13$.

**Không hoàn lại.** Ba ô trên đường chéo bằng $0$ và sáu ô còn lại bằng $\tfrac16$. Mỗi tổng hàng và tổng cột vẫn bằng $\tfrac16+\tfrac16=\tfrac13$.

**Diễn giải.** Hai bảng có cùng tổng hàng và tổng cột nhưng khác nhau ở các ô. Ở bảng không hoàn lại, ô $(3,3)$ bằng $0\ne\tfrac13\cdot\tfrac13$.

**Kiểm tra lại.** Tổng mọi ô của bảng không hoàn lại là $6\cdot\tfrac16=1$.
:::

::: definition Định nghĩa 05c.23 (Phân phối đồng thời, độc lập và độc lập cùng phân phối)
Cho các biến ngẫu nhiên rời rạc $X_1,\ldots,X_n$ trên cùng một không gian xác suất.

**PMF đồng thời.** $p_{X_1,\ldots,X_n}(x_1,\ldots,x_n)=P(X_1=x_1,\ldots,X_n=x_n)$, xác suất của giao $n$ biến cố $\{X_i=x_i\}$.

**PMF lề.** PMF của một biến $X_i$ nhận được từ PMF đồng thời bằng cách cộng theo giá trị của các biến còn lại.

**Độc lập.** $X_1,\ldots,X_n$ độc lập nếu với mọi $x_1,\ldots,x_n$,

$$
p_{X_1,\ldots,X_n}(x_1,\ldots,x_n)=\prod_{i=1}^np_{X_i}(x_i).
\tag{3.5}
$$

**Độc lập cùng phân phối.** $X_1,\ldots,X_n$ độc lập cùng phân phối (independent and identically distributed, i.i.d.) nếu chúng độc lập và có cùng PMF.
:::

Định nghĩa 05c.23 chuyển Định nghĩa 05c.12 từ biến cố sang biến: cộng (3.5) theo giá trị của một số biến cho đẳng thức tích cho mọi họ con, nên các biến cố $\{X_i\in T_i\}$ độc lập theo (2.6) (Koller và Friedman, 2009, mục 2.1.4, tr. 24–25; Goodfellow và cộng sự, 2016, mục 3.7, tr. 60). Đối chiếu Bài 00: mục "Độc lập và độc lập có điều kiện".

Hai biến có cùng PMF lề không nhất thiết độc lập, và ngược lại hai biến độc lập không nhất thiết cùng PMF. Ví dụ 05c.15 cho trường hợp thứ nhất: rút không hoàn lại, $X_1$ và $X_2$ cùng PMF đều trên $\{-1,1,3\}$ nhưng phụ thuộc. Mặt của một xúc xắc và mặt của một đồng xu tung độc lập cho trường hợp thứ hai.

Mục 4 và Mục 5 cần một hệ quả của tính độc lập: các hàm tính từ những nhóm biến không chồng nhau vẫn độc lập. Chẳng hạn $e^{\lambda X_1},\ldots,e^{\lambda X_n}$ độc lập khi $X_1,\ldots,X_n$ độc lập, và $X_1+X_2$ độc lập với $X_3$.

::: proposition Mệnh đề 05c.24 (Hàm của các khối biến độc lập)
**Giả thiết.** $X_1,\ldots,X_n$ là các biến rời rạc độc lập. Các tập chỉ số $T_1,\ldots,T_\kappa$ đôi một rời nhau, hợp bằng $\{1,\ldots,n\}$. Với mỗi $k$, $h_k$ là một hàm thực của các biến $(X_i)_{i\in T_k}$, và $V_k=h_k\bigl((X_i)_{i\in T_k}\bigr)$.

**Kết luận.** $V_1,\ldots,V_\kappa$ độc lập.

**Điều kiện áp dụng.** Các khối không được chung biến.

**Phạm vi.** Mệnh đề được chứng minh cho biến rời rạc; phiên bản cho biến có mật độ được dùng không chứng minh.
:::

::: proof Chứng minh Mệnh đề 05c.24
**Bước 1 (PMF đồng thời của một khối).** Viết $x_{T_k}$ cho bộ giá trị $(x_i)_{i\in T_k}$. Cộng (3.5) theo giá trị của mọi biến ngoài khối $T_k$; mỗi tổng $\sum_{x_i}p_{X_i}(x_i)$ bằng $1$, nên PMF đồng thời của khối là $\prod_{i\in T_k}p_{X_i}(x_i)$. Do đó (3.5) viết lại thành

$$
p_{X_1,\ldots,X_n}(x_1,\ldots,x_n)=\prod_{k=1}^\kappa\Bigl(\prod_{i\in T_k}p_{X_i}(x_i)\Bigr)=\prod_{k=1}^\kappa P\bigl((X_i)_{i\in T_k}=x_{T_k}\bigr).
$$

**Bước 2 (cộng theo tập mức của $h_k$).** Cố định các giá trị $v_1,\ldots,v_\kappa$ và đặt $\Lambda_k$ là tập các bộ $x_{T_k}$ có $h_k(x_{T_k})=v_k$. Biến cố $\{V_1=v_1,\ldots,V_\kappa=v_\kappa\}$ là hợp rời nhau của các biến cố $\{X=x\}$ với $x_{T_k}\in\Lambda_k$ cho mọi $k$. Cộng đẳng thức của Bước 1 trên các bộ đó; tổng của một tích các thừa số chỉ phụ thuộc từng khối tách thành tích các tổng:

$$
\begin{aligned}
P(V_1=v_1,\ldots,V_\kappa=v_\kappa)&=\prod_{k=1}^\kappa\sum_{x_{T_k}\in\Lambda_k}P\bigl((X_i)_{i\in T_k}=x_{T_k}\bigr)\\
&=\prod_{k=1}^KP(V_k=v_k).
\end{aligned}
$$

Đây là (3.5) cho $V_1,\ldots,V_\kappa$. $\square$
:::

Mệnh đề 05c.24 là lý do các phép tính trên tổng và tích ở Mục 4, Mục 5 được phép tách thành từng thừa số. Phản ví dụ khi các khối chung biến: với $X_1$, $X_2$ độc lập, mỗi biến đều trên $\{0,1\}$, hai biến $V_1=X_1+X_2$ và $V_2=X_1$ dùng chung $X_1$ và phụ thuộc, vì $P(V_1=2,V_2=0)=0$ trong khi $P(V_1=2)P(V_2=0)=\tfrac14\cdot\tfrac12$.

### 3.5 Gradient của mẫu được rút

Với các khái niệm của Mục 3.1–3.4, gradient của một mẫu được rút ngẫu nhiên trở thành một biến ngẫu nhiên có PMF tường minh. Hệ quả sau ghép Mệnh đề 05c.14 với Mệnh đề 05c.24.

::: corollary Hệ quả 05c.25 (Gradient mẫu của nhóm có hoàn lại là i.i.d.)
**Giả thiết.** Tập dữ liệu và tham số $\theta$ cố định; mọi $\ell_i$ khả vi tại $\theta$, với gradient mẫu $g_i=\nabla\ell_i(\theta)$. Nhóm $I_1,\ldots,I_b$ rút đều có hoàn lại từ $\{1,\ldots,N\}$.

**Kết luận.** $I_1,\ldots,I_b$ i.i.d. đều trên $\{1,\ldots,N\}$. Với mỗi tọa độ $j$, các số $[g_{I_1}]_j,\ldots,[g_{I_b}]_j$ là các biến ngẫu nhiên i.i.d., và

$$
P\bigl([g_{I_r}]_j=v\bigr)=\frac{\lvert\{i:[g_i]_j=v\}\rvert}N,\qquad v\in\mathbb R .
\tag{3.6}
$$

**Điều kiện áp dụng.** $\theta$ không được phụ thuộc chính nhóm đang rút.

**Phạm vi.** Khi rút không hoàn lại, mỗi $[g_{I_r}]_j$ vẫn có PMF (3.6) nhưng các biến nói chung không độc lập.
:::

::: proof Chứng minh Hệ quả 05c.25
**Bước 1 (các chỉ số).** Phần 1 của Mệnh đề 05c.14 cho $p_{I_r}(i)=\tfrac1N$. Với $T_r=\{i_r\}$, Bước 1 trong chứng minh của mệnh đề đó cho $P(I_1=i_1,\ldots,I_b=i_b)=N^{-b}=\prod_rp_{I_r}(i_r)$, tức (3.5). Vậy các chỉ số i.i.d.

**Bước 2 (các gradient mẫu).** Với $\theta$ cố định, $[g_{I_r}]_j=h(I_r)$ với hàm $h(i)=[g_i]_j$ không phụ thuộc $r$. Mệnh đề 05c.24 với các khối một phần tử $T_r=\{r\}$ cho tính độc lập. Cùng hàm $h$ áp lên các biến cùng PMF cho cùng PMF, và (3.2) cho (3.6). $\square$
:::

::: example Ví dụ 05c.16 (Phân phối của gradient mẫu và gradient nhóm hai chỉ số)
**Dữ kiện.** Ví dụ ba quan sát: $y=(-1,1,3)$, $g_i(\theta)=\theta-y_i$; tại $\theta=1$ ba gradient mẫu là $2$, $0$, $-2$. Nhóm rút đều có hoàn lại.

**Một chỉ số.** Theo (3.6), $g_{I_1}(1)$ nhận $2$, $0$, $-2$, mỗi giá trị với xác suất $\tfrac13$.

**Hai chỉ số.** $\widehat g=\tfrac12\bigl(g_{I_1}(1)+g_{I_2}(1)\bigr)$. Chín cặp $(I_1,I_2)$ đồng khả năng; đếm các cặp theo giá trị của $\widehat g$:

| Giá trị của $\widehat g$ | $2$ | $1$ | $0$ | $-1$ | $-2$ |
|---|---:|---:|---:|---:|---:|
| Số cặp | $1$ | $2$ | $3$ | $2$ | $1$ |
| Xác suất | $\tfrac19$ | $\tfrac29$ | $\tfrac39$ | $\tfrac29$ | $\tfrac19$ |

**Diễn giải.** Theo (3.2), $P(\lvert\widehat g\rvert\ge1)=\tfrac{1+2+2+1}9=\tfrac23$ với $b=2$, bằng $P(\lvert g_{I_1}(1)\rvert\ge1)=\tfrac23$ với $b=1$. Nhưng xác suất của hai giá trị xa nhất $\pm2$ giảm từ $\tfrac23$ xuống $\tfrac29$: khối lượng dồn về $0$.

**Kiểm tra lại.** $\widehat g=0$ khi hai gradient mẫu bằng nhau và bằng $0$, hoặc là cặp $\{2,-2\}$ theo hai thứ tự; tổng ba cặp, khớp bảng.
:::

**Trong học máy.** Hệ quả 05c.25 là phát biểu chính xác của câu "gradient nhóm là trung bình của $b$ gradient mẫu độc lập" trong Bài 05. Giả thiết "$\theta$ không phụ thuộc nhóm đang rút" đúng trong SGD khi nhóm ở bước $k$ được rút mới, độc lập với các nhóm đã quyết định $\theta_k$ (Thuật toán 05c.1); khi dữ liệu được xáo trộn theo lượt, các nhóm trong cùng lượt phụ thuộc nhau, và Mục 6.7 xét trường hợp đó. Mục 4 đo mức tập trung của PMF của $\widehat g$ bằng một con số.

::: exercise Bài tập 05c.3 (Bảng đồng thời của nhãn và dự đoán)
Một mô hình phân loại nhị phân được đánh giá trên một quần thể. Nhãn thật $Y\in\{0,1\}$ và dự đoán $Z\in\{0,1\}$ có PMF đồng thời:

| | $Z=1$ | $Z=0$ |
|---|---:|---:|
| $Y=1$ | $0{,}18$ | $0{,}02$ |
| $Y=0$ | $0{,}06$ | $0{,}74$ |

1. Tính các PMF lề của $Y$ và $Z$, và độ chính xác (accuracy) $P(Y=Z)$.
2. Xác định $Y$ và $Z$ có độc lập hay không, giải thích bằng (3.5).
3. Tính $P(Z=1\mid Y=1)$ và $P(Y=1\mid Z=1)$.
4. Tính độ chính xác của một mô hình đoán $Z$ độc lập với $Y$, với cùng PMF lề của $Z$ như câu 1.
:::

::: hint
Cộng theo hàng và theo cột. Ở câu 4, ô $(y,z)$ của bảng mới bằng $p_Y(y)p_Z(z)$.
:::

::: solution
**Câu 1.** $p_Y(1)=0{,}18+0{,}02=0{,}2$, $p_Y(0)=0{,}8$; $p_Z(1)=0{,}18+0{,}06=0{,}24$, $p_Z(0)=0{,}76$. Độ chính xác là tổng hai ô trên đường chéo, $0{,}18+0{,}74=0{,}92$.

**Câu 2.** Không: ô $(1,1)$ bằng $0{,}18$, khác $p_Y(1)p_Z(1)=0{,}048$. Một mô hình có ích phải phụ thuộc vào nhãn.

**Câu 3.** Theo (2.1), $P(Z=1\mid Y=1)=0{,}18/0{,}2=0{,}9$ và $P(Y=1\mid Z=1)=0{,}18/0{,}24=0{,}75$. Hai đại lượng là độ nhạy và giá trị dự đoán dương (positive predictive value, precision) của mô hình, ứng với hai chiều điều kiện ở Mục 2.1.

**Câu 4.** Độ chính xác là $p_Y(1)p_Z(1)+p_Y(0)p_Z(0)=0{,}048+0{,}608=0{,}656$.

**Kiểm tra lại.** Tổng bốn ô của bảng cho trước là $1$; tổng bốn ô của bảng độc lập là $(0{,}2+0{,}8)(0{,}24+0{,}76)=1$.
:::

**Chuỗi suy luận của mục.** Định nghĩa 05c.17 và Định nghĩa 05c.18 biến câu hỏi về số thành câu hỏi về biến cố; Định nghĩa 05c.20 và Mệnh đề 05c.21 cho các PMF chuẩn; Định nghĩa 05c.22 mở rộng tối thiểu sang biến liên tục. Định nghĩa 05c.23 và Mệnh đề 05c.24 chuyển tính độc lập sang biến, và Hệ quả 05c.25 là đích của mục: các gradient mẫu trong một nhóm có hoàn lại là i.i.d. với PMF (3.6).

**Kết mục.** Mục này cho PMF của gradient mẫu và gradient nhóm hai chỉ số (Hệ quả 05c.25, Ví dụ 05c.16). PMF dài dần theo $b$ và chưa cho số đo để so hai phân phối. Mục 4 tóm tắt một phân phối bằng kỳ vọng và phương sai, và chứng minh trung bình mẫu có kỳ vọng $\mu$, phương sai $\sigma_1^2/n$.

## 4. Kỳ vọng, phương sai và trung bình mẫu

Mục 3 cho PMF của gradient mẫu: tại $\theta=1$ trong ví dụ ba quan sát, $g_I(1)$ nhận $2$, $0$, $-2$ với cùng xác suất $\tfrac13$. Để so phân phối này với $J'(1)=0$ và với phân phối của gradient nhóm, cần một số chỉ tâm và một số đo độ trải. Mục này định nghĩa kỳ vọng và phương sai, chứng minh trung bình mẫu có tâm $\mu$ và phương sai $\sigma_1^2/n$, và kết thúc với kỳ vọng có điều kiện, công cụ để tính qua nhiều bước SGD.

### 4.1 Kỳ vọng

Trực giác, chưa phải định nghĩa: đặt mỗi cột của PMF như một khối lượng trên trục số; tâm của phân phối là điểm cân bằng, tức trung bình các giá trị có trọng số là xác suất.

::: example Ví dụ 05c.17 (Tâm của tổng hai xúc xắc)
**Dữ kiện.** PMF của tổng hai xúc xắc $S$ (Ví dụ 05c.11): $36\,P(S=s)=6-\lvert s-7\rvert$ với $s=2,\ldots,12$.

**Tính.**

$$
\begin{aligned}
\sum_{s=2}^{12}s\,P(S=s)&=\frac{2\cdot1+3\cdot2+4\cdot3+5\cdot4+6\cdot5+7\cdot6}{36}\\
&\quad+\frac{8\cdot5+9\cdot4+10\cdot3+11\cdot2+12\cdot1}{36}\\
&=\frac{112+140}{36}=7 .
\end{aligned}
$$

**Kiểm tra lại.** PMF đối xứng quanh $7$, vì $P(S=7+t)=P(S=7-t)$, nên điểm cân bằng là $7$.
:::

::: definition Định nghĩa 05c.26 (Kỳ vọng)
Cho biến ngẫu nhiên rời rạc $X$ với $\sum_x\lvert x\rvert\,p_X(x)<\infty$. Kỳ vọng (expectation) của $X$ là

$$
\mathbb EX=\sum_xx\,p_X(x),
\tag{4.1}
$$

tổng lấy trên tập giá trị của $X$. Với biến có mật độ và $\int\lvert x\rvert p_X(x)\,dx<\infty$, $\mathbb EX=\int x\,p_X(x)\,dx$. Khi điều kiện hội tụ tuyệt đối không thỏa, kỳ vọng không xác định.
:::

Điều kiện hội tụ tuyệt đối bảo đảm tổng (4.1) không phụ thuộc thứ tự cộng; Mục 5.6 có một biến không thỏa điều kiện này (Wasserman, 2004, mục 3.1). Kỳ vọng không nhất thiết là một giá trị biến nhận được: biến Bernoulli$(p)$ có $\mathbb EX=p$ trong khi chỉ nhận $0$ hoặc $1$.

Với mất mát 0–1, bằng $1$ khi phân loại sai và $0$ khi đúng, mất mát trên một quan sát mới là biến Bernoulli với tham số bằng tỉ lệ lỗi thật $p$, nên rủi ro kỳ vọng của mô hình chính là $p$. Đối chiếu Bài 00: mục "Kỳ vọng và kỳ vọng của một hàm" dùng cùng định nghĩa.

Nhiều đại lượng cần tính là kỳ vọng của một hàm của biến đã biết PMF, chẳng hạn $\mathbb ES^2$ hoặc $\mathbb Ee^{\lambda S}$. Mệnh đề sau cho phép tính chúng mà không lập PMF mới.

::: proposition Mệnh đề 05c.27 (Kỳ vọng của một hàm của biến ngẫu nhiên)
**Giả thiết.** $X$ là biến ngẫu nhiên rời rạc, $h:\mathbb R\to\mathbb R$, và $\sum_x\lvert h(x)\rvert p_X(x)<\infty$.

**Kết luận.**

$$
\mathbb E\,h(X)=\sum_xh(x)\,p_X(x)=\sum_{\omega\in\Omega}h\bigl(X(\omega)\bigr)P(\{\omega\}).
\tag{4.2}
$$

**Điều kiện áp dụng.** Điều kiện hội tụ tuyệt đối cho phép đổi thứ tự cộng.

**Phạm vi.** Phiên bản cho biến có mật độ thay tổng bằng $\int h(x)p_X(x)\,dx$, được dùng không chứng minh.
:::

::: proof Chứng minh Mệnh đề 05c.27
**Bước 1 (PMF của $h(X)$).** $Y=h(X)$ là một biến ngẫu nhiên. Biến cố $\{Y=y\}$ là hợp rời nhau của các biến cố $\{X=x\}$ với $h(x)=y$, nên $p_Y(y)=\sum_{x:\,h(x)=y}p_X(x)$.

**Bước 2 (nhóm lại).** Theo (4.1),

$$
\begin{aligned}
\mathbb EY&=\sum_yy\sum_{x:\,h(x)=y}p_X(x)\\
&=\sum_y\sum_{x:\,h(x)=y}h(x)\,p_X(x)\\
&=\sum_xh(x)\,p_X(x).
\end{aligned}
$$

Dòng thứ hai thay $y$ bằng $h(x)$ trong mỗi số hạng; dòng thứ ba bỏ cách nhóm theo $y$, hợp lệ vì chuỗi hội tụ tuyệt đối.

**Bước 3 (tổng trên kết cục).** Áp cùng lập luận nhóm lại với $p_X(x)=\sum_{\omega:\,X(\omega)=x}P(\{\omega\})$ cho đẳng thức thứ hai của (4.2). $\square$
:::

Áp (4.2) cho tổng hai xúc xắc với $h(s)=s^2$: $\mathbb ES^2=\tfrac1{36}\sum_s s^2(6-\lvert s-7\rvert)$, tức $\tfrac{1974}{36}=\tfrac{329}6$. Nhầm lẫn thường gặp là viết $\mathbb E\,h(X)=h(\mathbb EX)$; ở đây $h(\mathbb ES)=49$, khác $\tfrac{329}6\approx54{,}83$. Đẳng thức đó đúng khi $h$ tuyến tính, như định lý ở Mục 4.2 chứng minh.

### 4.2 Tính tuyến tính và hàm chỉ thị

Gọi $U_b$ là số chỉ số khác nhau trong nhóm $b$ chỉ số rút có hoàn lại; PMF của $U_b$ phức tạp. Một cách nhìn trực giác: $U_b$ là tổng, theo mọi quan sát $j$, của số $1$ khi $j$ xuất hiện và $0$ khi không, nên kỳ vọng của nó là tổng các xác suất xuất hiện nếu kỳ vọng của tổng bằng tổng các kỳ vọng.

::: example Ví dụ 05c.18 (Tâm của tổng qua từng xúc xắc)
**Dữ kiện.** Ví dụ hai xúc xắc; $X_1$, $X_2$ là mặt của hai xúc xắc, $S=X_1+X_2$.

**Tính.** Mỗi $X_i$ đều trên $\{1,\ldots,6\}$, nên $\mathbb EX_i=\tfrac{1+2+\cdots+6}6=3{,}5$, và $\mathbb EX_1+\mathbb EX_2=7$.

**Kiểm tra lại.** Kết quả trùng $\mathbb ES=7$ tính từ PMF mười một cột ở Ví dụ 05c.17.
:::

::: theorem Định lý 05c.28 (Tính tuyến tính của kỳ vọng)
**Giả thiết.** $X$, $Y$ là hai biến ngẫu nhiên trên cùng không gian xác suất rời rạc, đều có kỳ vọng; $a,c\in\mathbb R$.

**Kết luận.**

$$
\mathbb E[aX+cY]=a\,\mathbb EX+c\,\mathbb EY .
\tag{4.3}
$$

**Điều kiện áp dụng.** Không cần $X$, $Y$ độc lập.

**Phạm vi.** Bằng quy nạp, (4.3) mở rộng cho tổ hợp tuyến tính của hữu hạn biến.
:::

::: proof Chứng minh Định lý 05c.28
**Bước 1 (hội tụ tuyệt đối).** Bất đẳng thức tam giác cho $\lvert aX(\omega)+cY(\omega)\rvert\le\lvert a\rvert\lvert X(\omega)\rvert+\lvert c\rvert\lvert Y(\omega)\rvert$; theo dạng tổng trên kết cục của (4.2), chuỗi của vế phải hội tụ, nên $aX+cY$ có kỳ vọng.

**Bước 2 (tách tổng).** Theo dạng tổng trên kết cục của (4.2),

$$
\begin{aligned}
\mathbb E[aX+cY]&=\sum_\omega\bigl(aX(\omega)+cY(\omega)\bigr)P(\{\omega\})\\
&=a\sum_\omega X(\omega)P(\{\omega\})+c\sum_\omega Y(\omega)P(\{\omega\})\\
&=a\,\mathbb EX+c\,\mathbb EY .
\end{aligned}
$$

Tách tổng ở dòng hai hợp lệ vì hai chuỗi hội tụ tuyệt đối. Lập luận không dùng PMF đồng thời của $X$ và $Y$, nên không cần độc lập. $\square$
:::

Định lý 05c.28 cho phép các số hạng phụ thuộc nhau tùy ý (Koller và Friedman, 2009, Mệnh đề 2.4, tr. 32; Blitzstein và Hwang, 2019, mục 4.2). Để dùng nó cho phép đếm, cần hàm chỉ thị (indicator function) của biến cố $A$, cũng viết $\mathbf 1\{A\}$:

$$
\mathbf 1_A(\omega)=\begin{cases}1,&\omega\in A,\\0,&\omega\notin A.\end{cases}
$$

::: proposition Mệnh đề 05c.29 (Chỉ thị và tính đơn điệu của kỳ vọng)
**Giả thiết.** $A$ là biến cố; $X$, $Y$ là các biến ngẫu nhiên có kỳ vọng.

**Kết luận.**

1. $\mathbb E\mathbf 1_A=P(A)$.
2. Nếu $X\ge0$ trên mọi kết cục thì $\mathbb EX\ge0$.
3. Nếu $X\le Y$ trên mọi kết cục thì $\mathbb EX\le\mathbb EY$.

**Điều kiện áp dụng.** Bất đẳng thức ở phần 2, 3 cần đúng trên mọi kết cục có xác suất dương.

**Phạm vi.** Phần 1 là cầu nối giữa xác suất và kỳ vọng mà Mục 5 dùng trong mọi chứng minh.
:::

::: proof Chứng minh Mệnh đề 05c.29
**Bước 1 (chỉ thị).** $\mathbf 1_A$ là biến Bernoulli với $P(\mathbf 1_A=1)=P(A)$, và kỳ vọng của biến Bernoulli$(p)$ là $p$.

**Bước 2 (không âm).** Mọi số hạng $x\,p_X(x)$ của (4.1) không âm khi $X\ge0$.

**Bước 3 (đơn điệu).** $Y-X\ge0$, nên Bước 2 và Định lý 05c.28 cho $\mathbb EY-\mathbb EX=\mathbb E[Y-X]\ge0$. $\square$
:::

::: example Ví dụ 05c.19 (Số chỉ số khác nhau và số quan sát chưa gặp)
**Dữ kiện.** Rút có hoàn lại từ $N$ quan sát. Theo Mệnh đề 05c.14, các lần rút độc lập và mỗi lần trúng quan sát $j$ với xác suất $\tfrac1N$.

**Số chỉ số khác nhau.** Gọi $A_j$ là biến cố "quan sát $j$ xuất hiện trong nhóm $b$ chỉ số". Biến cố $A_j^c$ là giao của $b$ biến cố độc lập "lần $r$ không trúng $j$", nên $P(A_j^c)=(1-\tfrac1N)^b$. Viết $U_b=\sum_{j=1}^N\mathbf 1_{A_j}$; Định lý 05c.28 và phần 1 của Mệnh đề 05c.29 cho

$$
\mathbb EU_b=\sum_{j=1}^NP(A_j)=N\Bigl(1-\bigl(1-\tfrac1N\bigr)^b\Bigr).
$$

Với $N=1000$ và $b=32$, $\mathbb EU_{32}\approx31{,}51$.

**Quan sát chưa gặp sau $N$ lần rút.** Gọi $T_N$ là số quan sát chưa xuất hiện sau $N$ lần rút có hoàn lại; cùng lập luận với $b=N$ cho $\mathbb ET_N/N=(1-\tfrac1N)^N$. Tỉ lệ này bằng:

- $0{,}296$ khi $N=3$;
- $0{,}349$ khi $N=10$;
- $0{,}3677$ khi $N=1000$, tiến tới $e^{-1}\approx0{,}3679$ khi $N\to\infty$.

**Diễn giải.** Một nhóm $32$ chỉ số có lặp với xác suất $0{,}394$ (Ví dụ 05c.4), nhưng trung bình chỉ mất $0{,}49$ gradient mẫu khác nhau. Sau $N$ lần rút có hoàn lại, tức $N/b$ bước SGD, trung bình khoảng $37\,\%$ quan sát chưa được dùng lần nào.

**Kiểm tra lại.** Với $N=3$, công thức cho $\mathbb ET_3=3\cdot(\tfrac23)^3=\tfrac89$. Đếm trực tiếp trên $27$ dãy: $6$ dãy gồm ba chỉ số khác nhau cho $T_3=0$, $18$ dãy gồm đúng hai chỉ số khác nhau cho $T_3=1$, $3$ dãy gồm một chỉ số cho $T_3=2$, nên $\mathbb ET_3=\tfrac{18+6}{27}=\tfrac89$.
:::

Các chỉ thị $\mathbf 1_{A_j}$ trong ví dụ phụ thuộc nhau, vì tổng của chúng không vượt $b$, nhưng Định lý 05c.28 không cần độc lập. Blitzstein và Hwang (2019, mục 4.4) dùng cùng kỹ thuật cho bài toán trả mũ ngẫu nhiên: $n$ người nhận lại mũ theo một hoán vị đều, mỗi người đúng mũ với xác suất $\tfrac1n$, nên số người đúng mũ có kỳ vọng $1$ với mọi $n$ dù các chỉ thị phụ thuộc mạnh.

**Trong học máy.** Tính không chệch của gradient nhóm, nửa thứ nhất của Định lý 05.11, chỉ cần Định lý 05c.28 và phân phối đều của từng chỉ số. Vì vậy một nhóm cắt từ một hoán vị ngẫu nhiên vẫn cho gradient nhóm không chệch theo phân phối của riêng nhóm đó; tính độc lập chỉ cần cho hiệp phương sai (Mục 4.4, 4.6).

### 4.3 Phương sai và hiệp phương sai

Tại $\theta=1$, gradient một mẫu và gradient nhóm hai chỉ số của Ví dụ 05c.16 đều có kỳ vọng $0$, nhưng xác suất của hai giá trị $\pm2$ giảm từ $\tfrac23$ xuống $\tfrac29$. Về trực giác, trước khi định nghĩa, một số đo độ trải là trung bình của bình phương khoảng cách tới tâm.

::: example Ví dụ 05c.20 (Độ trải của tổng hai xúc xắc)
**Dữ kiện.** PMF của $S$ (Ví dụ 05c.11), $\mathbb ES=7$ (Ví dụ 05c.17).

**Tính.** Theo (4.2) với $h(s)=(s-7)^2$, ghép các giá trị đối xứng $7\pm t$:

$$
\begin{aligned}
\sum_s(s-7)^2P(S=s)&=\frac{2\,(25\cdot1+16\cdot2+9\cdot3+4\cdot4+1\cdot5)}{36}\\
&=\frac{2\cdot105}{36}=\frac{35}6\approx5{,}83 .
\end{aligned}
$$

Căn bậc hai của số này là khoảng $2{,}415$.

**Kiểm tra lại.** $25+32+27+16+5=105$.
:::

![Biểu đồ cột của PMF tổng hai xúc xắc, giá trị từ 2 đến 12, cột cao nhất tại 7 với xác suất 6/36. Vạch dọc tại kỳ vọng 7; đoạn ngang một độ lệch chuẩn quanh kỳ vọng, từ khoảng 4,6 đến 9,4.](img/lec-05c/two-dice-pmf.svg)

Hình vẽ PMF của $S$ cùng vạch kỳ vọng $7$ và đoạn $7\pm2{,}415$. Đoạn này chứa các giá trị $5$ đến $9$, với tổng xác suất $\tfrac{4+5+6+5+4}{36}=\tfrac23$; độ lệch chuẩn cho bề rộng điển hình của phân phối, không phải một khoảng chứa mọi giá trị.

::: definition Định nghĩa 05c.30 (Mômen, phương sai, độ lệch chuẩn và hiệp phương sai)
**Mômen.** Với số nguyên $k\ge1$, mômen (moment) bậc $k$ của $X$ là $\mathbb EX^k$, xác định khi $\mathbb E\lvert X\rvert^k<\infty$.

**Phương sai.** Cho $X$ có mômen bậc hai hữu hạn và $\mu=\mathbb EX$. Phương sai (variance) của $X$ là

$$
\operatorname{Var}X=\mathbb E(X-\mu)^2,
\tag{4.4}
$$

và độ lệch chuẩn (standard deviation) là $\sqrt{\operatorname{Var}X}$.

**Hiệp phương sai.** Với $X$, $Y$ có mômen bậc hai hữu hạn, hiệp phương sai (covariance) là

$$
\operatorname{Cov}(X,Y)=\mathbb E\bigl[(X-\mathbb EX)(Y-\mathbb EY)\bigr].
\tag{4.5}
$$

Hai biến không tương quan (uncorrelated) nếu $\operatorname{Cov}(X,Y)=0$.
:::

Độ lệch chuẩn có cùng đơn vị với $X$. Hiệp phương sai dương khi hai biến có xu hướng cùng lệch về một phía so với tâm, âm khi lệch ngược phía, và $\operatorname{Cov}(X,X)=\operatorname{Var}X$ (Goodfellow và cộng sự, 2016, mục 3.8, tr. 61–62). Đối chiếu Bài 00: mục "Phương sai, độ lệch chuẩn và biến đổi affine".

::: proposition Mệnh đề 05c.31 (Công thức tính phương sai và hiệp phương sai)
**Giả thiết.** $X$, $Y$ có mômen bậc hai hữu hạn, $\mu=\mathbb EX$; $a,c\in\mathbb R$.

**Kết luận.**

1. $\operatorname{Var}X=\mathbb EX^2-\mu^2$.
2. $\operatorname{Var}(aX+c)=a^2\operatorname{Var}X$.
3. $\operatorname{Cov}(X,Y)=\mathbb E[XY]-\mathbb EX\,\mathbb EY$.

**Điều kiện áp dụng.** Mômen bậc hai hữu hạn bảo đảm mọi kỳ vọng trong công thức tồn tại.

**Phạm vi.** Phần 1 tiện tính tay nhưng dễ mất chính xác số khi $\mathbb EX^2$ và $\mu^2$ gần nhau.
:::

::: proof Chứng minh Mệnh đề 05c.31
**Bước 1 (phần 1).** Khai triển $(X-\mu)^2=X^2-2\mu X+\mu^2$ và dùng Định lý 05c.28: $\mathbb E(X-\mu)^2=\mathbb EX^2-2\mu\cdot\mu+\mu^2=\mathbb EX^2-\mu^2$.

**Bước 2 (phần 2).** Theo Định lý 05c.28, $\mathbb E[aX+c]=a\mu+c$, nên độ lệch khỏi kỳ vọng là $a(X-\mu)$ và $\operatorname{Var}(aX+c)=\mathbb E\,a^2(X-\mu)^2=a^2\operatorname{Var}X$.

**Bước 3 (phần 3).** Khai triển tích trong (4.5) thành $XY-X\,\mathbb EY-Y\,\mathbb EX+\mathbb EX\,\mathbb EY$ và lấy kỳ vọng từng số hạng theo Định lý 05c.28. $\square$
:::

Kiểm trên hai xúc xắc: phần 1 cho $\operatorname{Var}S=\tfrac{329}6-49=\tfrac{35}6$, khớp Ví dụ 05c.20. Phần 2 nói dịch chuyển không đổi độ trải và co giãn theo hệ số $a$ nhân phương sai với $a^2$; Mục 4.5 dùng nó với $a=\tfrac1n$.

Mệnh đề sau nối hiệp phương sai với tính độc lập của Mục 3.4.

::: proposition Mệnh đề 05c.32 (Độc lập kéo theo không tương quan)
**Giả thiết.** $X$, $Y$ độc lập theo Định nghĩa 05c.23 và đều có kỳ vọng.

**Kết luận.** $\mathbb E[XY]=\mathbb EX\,\mathbb EY$. Nếu thêm mômen bậc hai hữu hạn thì $\operatorname{Cov}(X,Y)=0$.

**Điều kiện áp dụng.** Tính độc lập được dùng để tách PMF đồng thời.

**Phạm vi.** Chiều ngược lại sai: hai biến không tương quan có thể phụ thuộc.
:::

::: proof Chứng minh Mệnh đề 05c.32
**Bước 1 (tách tổng).** Áp (4.2) cho hàm $h(x,y)=xy$ của cặp $(X,Y)$, nhóm các kết cục theo cặp giá trị, rồi dùng (3.5):

$$
\begin{aligned}
\mathbb E[XY]&=\sum_{x,y}xy\,p_{X,Y}(x,y)\\
&=\sum_{x,y}xy\,p_X(x)\,p_Y(y)\\
&=\Bigl(\sum_xx\,p_X(x)\Bigr)\Bigl(\sum_yy\,p_Y(y)\Bigr).
\end{aligned}
$$

Dòng ba tách chuỗi kép thành tích hai chuỗi, hợp lệ vì $\sum_{x,y}\lvert xy\rvert p_X(x)p_Y(y)=\mathbb E\lvert X\rvert\,\mathbb E\lvert Y\rvert<\infty$.

**Bước 2 (hiệp phương sai).** Phần 3 của Mệnh đề 05c.31 và Bước 1 cho $\operatorname{Cov}(X,Y)=0$. $\square$
:::

Phản ví dụ cho chiều ngược lại: $X$ đều trên $\{-1,0,1\}$ và $Y=X^2$. Khi đó $\mathbb EX=0$ và $\mathbb E[XY]=\mathbb EX^3=0$, nên $\operatorname{Cov}(X,Y)=0$; nhưng $P(X=0,Y=0)=\tfrac13$ khác $P(X=0)P(Y=0)=\tfrac13\cdot\tfrac13$, nên hai biến phụ thuộc. Hiệp phương sai chỉ đo quan hệ tuyến tính; $Y$ phụ thuộc hoàn toàn vào $X$ qua một hàm chẵn (Koller và Friedman, 2009, Mệnh đề 2.5, tr. 32).

### 4.4 Phương sai của tổng

Trung bình mẫu là một tổng chia cho $n$, nên cần phương sai của một tổng. Với hai xúc xắc, $2X_1$ và $X_1+X_2$ cùng kỳ vọng $7$ nhưng phương sai khác nhau, $4\operatorname{Var}X_1$ và $\tfrac{35}6$, nên công thức phải chứa các hiệp phương sai.

::: proposition Mệnh đề 05c.33 (Phương sai của tổng)
**Giả thiết.** $X_1,\ldots,X_n$ có mômen bậc hai hữu hạn.

**Kết luận.**

$$
\operatorname{Var}\Bigl(\sum_{i=1}^nX_i\Bigr)=\sum_{i=1}^n\operatorname{Var}X_i+2\sum_{i<j}\operatorname{Cov}(X_i,X_j).
\tag{4.6}
$$

Nếu các biến không tương quan đôi một, đặc biệt khi chúng độc lập, phương sai của tổng bằng tổng các phương sai.

**Điều kiện áp dụng.** Phần "không tương quan" chỉ cần cho từng cặp, không cần độc lập của cả họ.

**Phạm vi.** Với biến vectơ, cùng công thức đúng cho ma trận hiệp phương sai, với $\operatorname{Cov}(X_i,X_j)+\operatorname{Cov}(X_j,X_i)$ thay cho $2\operatorname{Cov}(X_i,X_j)$.
:::

::: proof Chứng minh Mệnh đề 05c.33
**Bước 1 (quy tâm).** Đặt $Y_i=X_i-\mathbb EX_i$. Theo Định lý 05c.28, $\sum_iX_i-\mathbb E\sum_iX_i=\sum_iY_i$.

**Bước 2 (khai triển bình phương).** $\bigl(\sum_iY_i\bigr)^2=\sum_iY_i^2+2\sum_{i<j}Y_iY_j$. Lấy kỳ vọng hai vế theo Định lý 05c.28: $\mathbb EY_i^2=\operatorname{Var}X_i$ và $\mathbb E[Y_iY_j]=\operatorname{Cov}(X_i,X_j)$ theo (4.4), (4.5). Đó là (4.6). $\square$
:::

Kiểm trên hai xúc xắc: $\operatorname{Var}X_1=\tfrac{91}6-3{,}5^2=\tfrac{35}{12}$, và vì $X_1$, $X_2$ độc lập, $\operatorname{Var}S=\tfrac{35}{12}+\tfrac{35}{12}=\tfrac{35}6$, khớp Ví dụ 05c.20. Với $X_1+X_1$, hiệp phương sai bằng phương sai và (4.6) cho $4\operatorname{Var}X_1=\tfrac{35}3$, không phải $2\operatorname{Var}X_1$.

So với Định lý 05c.28, Mệnh đề 05c.33 đòi thêm giả thiết: phương sai chỉ cộng được khi các hiệp phương sai bằng $0$. Vì vậy mọi kết quả về phương sai của trung bình mẫu cần độc lập hoặc ít nhất không tương quan (Koller và Friedman, 2009, Mệnh đề 2.6, tr. 33).

### 4.5 Trung bình mẫu và sai số chuẩn

Hai câu hỏi "Tâm" và "Sai số điển hình" của Mục 1.1 hỏi kỳ vọng và phương sai của trung bình mẫu. Khi lấy trung bình, các độ lệch ngược dấu bù trừ một phần, nên trung bình dao động ít hơn một quan sát; đó là trực giác, chưa phải phát biểu.

::: example Ví dụ 05c.21 (Phương sai của gradient nhóm theo cỡ nhóm)
**Dữ kiện.** Ví dụ ba quan sát tại $\theta=1$: gradient mẫu nhận $2$, $0$, $-2$, mỗi giá trị với xác suất $\tfrac13$; nhóm rút có hoàn lại. PMF của gradient nhóm hai chỉ số (Ví dụ 05c.16): giá trị $2,1,0,-1,-2$ với xác suất $\tfrac19,\tfrac29,\tfrac39,\tfrac29,\tfrac19$.

**Tính.** Kỳ vọng bằng $0$ với mọi $b$ do PMF đối xứng, nên phương sai bằng $\mathbb E\widehat g^2$:

- $b=1$: $\tfrac13(4+0+4)=\tfrac83$;
- $b=2$: $\tfrac19(4+2\cdot1+0+2\cdot1+4)=\tfrac{12}9=\tfrac43$;
- $b=4$: liệt kê $3^4=81$ dãy chỉ số cho $\tfrac23$.

**Diễn giải.** Phương sai bằng $\tfrac83$ chia cho $b$.

**Kiểm tra lại.** Với $b=4$, viết $\widehat g=\tfrac12(u_1+u_2+u_3+u_4)$ với $u_r\in\{1,0,-1\}$ đều và độc lập; mỗi $u_r$ có phương sai $\tfrac23$, nên Mệnh đề 05c.33 và phần 2 của Mệnh đề 05c.31 cho $\tfrac14\cdot4\cdot\tfrac23=\tfrac23$.
:::

![Ba biểu đồ cột cùng tâm 0 cho gradient nhóm tại θ = 1 trên ví dụ ba quan sát. b = 1: ba giá trị −2, 0, 2 cao bằng nhau, phương sai 8/3. b = 2: năm giá trị −2, −1, 0, 1, 2 với tần số 1, 2, 3, 2, 1, phương sai 4/3. b = 4: chín giá trị tập trung quanh 0, phương sai 2/3.](img/lec-05c/batch-gradient-pmf.svg)

Ba khung của hình vẽ PMF của gradient nhóm với $b=1,2,4$ trên cùng trục. Khối lượng dồn về $0$ khi $b$ tăng; phương sai ghi trên mỗi khung giảm một nửa mỗi lần $b$ gấp đôi. Định nghĩa và định lý sau đặt tên và chứng minh quy luật này.

::: definition Định nghĩa 05c.34 (Ước lượng không chệch và sai số chuẩn)
Cho một đại lượng cần ước lượng $\mu\in\mathbb R$ và một ước lượng $\widehat\mu$, là một biến ngẫu nhiên tính từ dữ liệu.

**Không chệch.** $\widehat\mu$ là ước lượng không chệch (unbiased estimator) của $\mu$ nếu $\mathbb E\widehat\mu=\mu$; hiệu $\mathbb E\widehat\mu-\mu$ gọi là độ chệch (bias).

**Sai số chuẩn.** Sai số chuẩn (standard error) của $\widehat\mu$ là độ lệch chuẩn $\sqrt{\operatorname{Var}\widehat\mu}$.
:::

Không chệch là tính chất của phân phối của ước lượng, không của một lần ước lượng. Một ước lượng có thể không chệch nhưng có sai số chuẩn lớn, như gradient một mẫu tại nghiệm của ví dụ ba quan sát, với sai số chuẩn $\sqrt{8/3}\approx1{,}63$ quanh $J'(1)=0$.

::: theorem Định lý 05c.35 (Kỳ vọng và phương sai của trung bình mẫu)
**Giả thiết.** $X_1,\ldots,X_n$ có cùng kỳ vọng $\mu$, cùng phương sai $\sigma_1^2<\infty$, và không tương quan đôi một. Đặt $\bar X_n=\frac1n\sum_{i=1}^nX_i$.

**Kết luận.**

$$
\mathbb E\bar X_n=\mu,\qquad\operatorname{Var}\bar X_n=\frac{\sigma_1^2}n .
\tag{4.7}
$$

Do đó $\bar X_n$ là ước lượng không chệch của $\mu$ với sai số chuẩn $\sigma_1/\sqrt n$.

**Điều kiện áp dụng.** Giả thiết thỏa khi $X_1,\ldots,X_n$ i.i.d. với phương sai hữu hạn (Mệnh đề 05c.32). Kết luận về kỳ vọng chỉ cần cùng kỳ vọng.

**Phạm vi.** Định lý nói về kỳ vọng và phương sai; nó chưa cho xác suất để $\bar X_n$ lệch khỏi $\mu$ quá một ngưỡng, câu hỏi của Mục 5.
:::

::: proof Chứng minh Định lý 05c.35
**Bước 1 (kỳ vọng).** Định lý 05c.28 cho $\mathbb E\bar X_n=\tfrac1n\sum_{i=1}^n\mathbb EX_i$, và tổng này bằng $\tfrac1n\cdot n\mu=\mu$.

**Bước 2 (phương sai).** Phần 2 của Mệnh đề 05c.31 với $a=\tfrac1n$, rồi Mệnh đề 05c.33 với mọi hiệp phương sai bằng $0$:

$$
\begin{aligned}
\operatorname{Var}\bar X_n&=\frac1{n^2}\operatorname{Var}\Bigl(\sum_{i=1}^nX_i\Bigr)\\
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}X_i\\
&=\frac{n\sigma_1^2}{n^2}=\frac{\sigma_1^2}n . \qquad\square
\end{aligned}
$$
:::

Định lý 05c.35 trả lời hai câu hỏi đầu của Mục 1.1: trung bình mẫu không chệch, và sai số chuẩn giảm theo $1/\sqrt n$, nên giảm sai số chuẩn $k$ lần cần tăng số quan sát $k^2$ lần. Đó là phát biểu "$100$ mẫu so với $10\,000$ mẫu" của Goodfellow và cộng sự (2016, mục 8.1.3, tr. 278).

Ví dụ 05c.21 là trường hợp $X_r=g_{I_r}(1)$, $n=b$ và $\sigma_1^2=\tfrac83$: các gradient mẫu i.i.d. theo Hệ quả 05c.25, nên phương sai của gradient nhóm là $\sigma_b^2=\sigma_1^2/b=\tfrac8{3b}$. Bỏ giả thiết không tương quan làm hỏng kết luận về phương sai: nếu $X_1=\cdots=X_n$, trung bình bằng $X_1$ và phương sai vẫn là $\sigma_1^2$ với mọi $n$.

::: example Ví dụ 05c.22 (Sai số chuẩn của tỉ lệ lỗi đo trên tập kiểm thử)
**Dữ kiện.** Một mô hình có tỉ lệ lỗi thật $p=0{,}1$. Tập kiểm thử gồm $n=1000$ quan sát i.i.d. theo phân phối dữ liệu, độc lập với dữ liệu huấn luyện. $X_i=1$ nếu quan sát $i$ bị phân loại sai, $X_i=0$ nếu đúng.

**Mô hình hóa.** $X_i$ là Bernoulli$(0{,}1)$ với $\mu=p=0{,}1$ và, theo phần 1 của Mệnh đề 05c.31, $\sigma_1^2=p-p^2=p(1-p)$, bằng $0{,}09$. Tỉ lệ lỗi đo được là $\bar X_n$.

**Áp dụng Định lý 05c.35.** $\mathbb E\bar X_n=0{,}1$ và sai số chuẩn là $\sqrt{0{,}09/1000}\approx0{,}0095$.

**Diễn giải.** Tỉ lệ lỗi đo được trên $1000$ quan sát dao động điển hình khoảng $\pm0{,}01$ quanh $0{,}1$. Vì $p(1-p)\le\tfrac14$ với mọi $p$, sai số chuẩn không bao giờ vượt $\sqrt{0{,}25/1000}\approx0{,}0158$, kể cả khi chưa biết $p$ (Goodfellow và cộng sự, 2016, mục 5.4.3, tr. 128).

**Kiểm tra lại.** $p(1-p)$ đạt cực đại $\tfrac14$ tại $p=\tfrac12$, vì đạo hàm $1-2p$ đổi dấu tại đó.
:::

**Trong học máy.** Định lý 05c.35 là nền của Định lý 05.11, với gradient nhóm là trung bình mẫu của $n=b$ gradient mẫu. Giả thiết không tương quan được bảo đảm khi rút có hoàn lại (Hệ quả 05c.25) và bị vi phạm khi các quan sát trong nhóm tương quan, như các khung hình liên tiếp của một video; Bài tập 05c.5 tính phần phương sai khi đó không giảm theo $b$.

### 4.6 Rút không hoàn lại

Thực hành thường rút các chỉ số của một nhóm không hoàn lại (Mục 1.4). Ví dụ 05c.9 cho thấy khi đó các lần rút phụ thuộc nhau, nên giả thiết không tương quan của Định lý 05c.35 không thỏa. Ví dụ sau tính phương sai trực tiếp.

::: example Ví dụ 05c.23 (Hai chỉ số không hoàn lại)
**Dữ kiện.** Ví dụ ba quan sát tại $\theta=1$, gradient mẫu $2$, $0$, $-2$; nhóm $b=2$ chỉ số rút không hoàn lại.

**Tính.** Ba tập con hai phần tử đồng khả năng cho gradient nhóm $\tfrac{2+0}2=1$, $\tfrac{2-2}2=0$, $\tfrac{0-2}2=-1$. Kỳ vọng bằng $0$ và phương sai bằng $\tfrac13(1+0+1)=\tfrac23$.

**Diễn giải.** Phương sai $\tfrac23$ bằng một nửa giá trị $\tfrac43$ khi rút có hoàn lại (Ví dụ 05c.21). Rút không hoàn lại loại các nhóm $\{2,2\}$ và $\{-2,-2\}$, nơi gradient nhóm xa tâm nhất.

**Kiểm tra lại.** Kỳ vọng $\tfrac13(1+0-1)=0=J'(1)$: rút không hoàn lại vẫn không chệch.
:::

::: proposition Mệnh đề 05c.36 (Trung bình mẫu khi rút không hoàn lại)
**Giả thiết.** Cho $N\ge2$ số thực $v_1,\ldots,v_N$ với trung bình $\bar v=\frac1N\sum_jv_j$ và phương sai tổng thể $\sigma_1^2=\frac1N\sum_j(v_j-\bar v)^2$. Rút $n\le N$ chỉ số khác nhau $I_1,\ldots,I_n$ theo mô hình không hoàn lại của Định nghĩa 05c.5, và đặt $X_r=v_{I_r}$.

**Kết luận.**

$$
\mathbb E\bar X_n=\bar v,\qquad\operatorname{Var}\bar X_n=\frac{\sigma_1^2}n\cdot\frac{N-n}{N-1}.
\tag{4.8}
$$

**Điều kiện áp dụng.** Cần mọi dãy $n$ chỉ số khác nhau đồng khả năng.

**Phạm vi.** Với lấy mẫu có trọng số, tính đối xứng dùng trong chứng minh mất và công thức khác.
:::

::: proof Chứng minh Mệnh đề 05c.36
**Bước 1 (một lần rút).** Theo tính đối xứng của mô hình, mỗi $I_r$ có phân phối đều trên $\{1,\ldots,N\}$: số dãy có $I_r=j$ không phụ thuộc $j$. Do đó $\mathbb EX_r=\bar v$ và $\operatorname{Var}X_r=\sigma_1^2$, và Định lý 05c.28 cho $\mathbb E\bar X_n=\bar v$.

**Bước 2 (hiệp phương sai chung).** Với $r\ne s$, cặp $(I_r,I_s)$ có phân phối đều trên các cặp chỉ số khác nhau, cũng theo tính đối xứng. Do đó $\operatorname{Cov}(X_r,X_s)$ bằng một hằng số $\gamma$ không phụ thuộc $r$, $s$; $\gamma$ chỉ phụ thuộc $v_1,\ldots,v_N$, không phụ thuộc $n$, vì phân phối của cặp $(I_r,I_s)$ như nhau với mọi $n\ge2$.

**Bước 3 (xác định $\gamma$ bằng trường hợp $n=N$).** Khi $n=N$, mọi phần tử được rút đúng một lần, nên $\sum_{r=1}^NX_r=N\bar v$ là hằng và có phương sai $0$. Mệnh đề 05c.33 cho $0=N\sigma_1^2+N(N-1)\gamma$, tức $\gamma=-\sigma_1^2/(N-1)$.

**Bước 4 (trường hợp tổng quát).** Với $n$ bất kỳ, Mệnh đề 05c.33 và Bước 3 cho

$$
\begin{aligned}
\operatorname{Var}\Bigl(\sum_{r=1}^nX_r\Bigr)&=n\sigma_1^2+n(n-1)\gamma\\
&=n\sigma_1^2\Bigl(1-\frac{n-1}{N-1}\Bigr)\\
&=n\sigma_1^2\,\frac{N-n}{N-1}.
\end{aligned}
$$

Chia cho $n^2$ theo phần 2 của Mệnh đề 05c.31 được (4.8). $\square$
:::

Hệ số $\frac{N-n}{N-1}$, gọi là hệ số hiệu chỉnh tổng thể hữu hạn (finite population correction), không vượt $1$, bằng $0$ khi $n=N$ và gần $1$ khi $n\ll N$. Mệnh đề thay giả thiết không tương quan của Định lý 05c.35 bằng giả thiết đối xứng; hiệp phương sai âm $\gamma$ làm phương sai nhỏ đi.

**Trong học máy.** Với $N=50\,000$ và nhóm $b=128$ cắt từ một hoán vị ngẫu nhiên, hệ số là $\tfrac{49\,872}{49\,999}\approx0{,}9975$, nên công thức $\sigma_1^2/b$ của mô hình có hoàn lại là xấp xỉ tốt khi $b\ll N$. Mệnh đề chỉ xử lý một nhóm; các nhóm liên tiếp trong cùng một lượt phụ thuộc nhau (Mục 6.7).

### 4.7 Kỳ vọng có điều kiện và kỳ vọng toàn phần

Trong SGD, tham số $\theta_1$ phụ thuộc nhóm thứ nhất, còn gradient ở bước hai phụ thuộc $\theta_1$ và nhóm thứ hai: đại lượng được tạo qua hai tầng ngẫu nhiên. Trực giác, chưa phải định nghĩa: kỳ vọng qua cây hai tầng là trung bình trong từng nhánh, rồi trung bình các nhánh theo xác suất của nhánh, như Mệnh đề 05c.10 làm với xác suất.

::: example Ví dụ 05c.24 (Monty Hall theo nhánh)
**Dữ kiện.** Ví dụ 05c.6: ba cửa, xe ở mỗi cửa với xác suất $\tfrac13$, người chơi chọn cửa 1, người dẫn biết vị trí xe và luôn mở một cửa có dê khác cửa 1.

**Trung bình trong nhánh.** Gọi $Z=1$ nếu đổi cửa thắng và $Z=0$ nếu thua. Nếu xe ở cửa 1, đổi cửa luôn thua: trung bình của $Z$ trong nhánh là $0$. Nếu xe ở cửa 2 hoặc cửa 3, người dẫn buộc phải mở cửa dê còn lại và đổi cửa luôn thắng: trung bình trong mỗi nhánh là $1$.

**Trung bình các nhánh.** $\mathbb EZ=\tfrac13\cdot0+\tfrac13\cdot1+\tfrac13\cdot1=\tfrac23$.

**Kiểm tra lại.** Theo phần 1 của Mệnh đề 05c.29, $\mathbb EZ$ bằng xác suất đổi cửa thắng, và cây của Ví dụ 05c.6 cho hai lá đổi thắng với tổng khối lượng $\tfrac23$.
:::

::: definition Định nghĩa 05c.37 (Kỳ vọng có điều kiện)
Cho $X$, $Y$ là các biến rời rạc, $\mathbb E\lvert X\rvert<\infty$, và $y$ là giá trị với $P(Y=y)>0$.

**Theo một giá trị.** Kỳ vọng có điều kiện (conditional expectation) của $X$ khi $Y=y$ là

$$
\mathbb E[X\mid Y=y]=\sum_xx\,P(X=x\mid Y=y).
\tag{4.9}
$$

**Như một biến ngẫu nhiên.** $\mathbb E[X\mid Y]$ là biến ngẫu nhiên nhận giá trị $\mathbb E[X\mid Y=y]$ trên biến cố $\{Y=y\}$.
:::

Công thức (4.9) là kỳ vọng (4.1) tính với xác suất $P(\cdot\mid Y=y)$, tức trung bình trong nhánh $Y=y$, và $\mathbb E[X\mid Y]$ là một hàm của $Y$ (Koller và Friedman, 2009, mục 2.1.7, tr. 32; Wasserman, 2004, mục 3.5). Trong Ví dụ 05c.24, với $Y$ là vị trí xe, $\mathbb E[Z\mid Y]$ bằng $0$ khi $Y=1$ và $1$ khi $Y\in\{2,3\}$.

Nhầm lẫn thường gặp là coi $\mathbb E[X\mid Y]$ là một số. $\mathbb E[X\mid Y=y]$ là một số với mỗi $y$, còn $\mathbb E[X\mid Y]$ là biến ngẫu nhiên, hàm của $Y$; ở Ví dụ 05c.24 nó nhận $0$ với xác suất $\tfrac13$ và $1$ với xác suất $\tfrac23$, và kỳ vọng của nó là $\tfrac23$.

::: proposition Mệnh đề 05c.38 (Kỳ vọng toàn phần và các quy tắc tính)
**Giả thiết.** $X$, $Y$ là các biến rời rạc, có thể nhận giá trị vectơ rời rạc, với $\mathbb E\lvert X\rvert<\infty$.

**Kết luận.**

1. **Kỳ vọng toàn phần** (law of total expectation). $\mathbb E\bigl[\mathbb E[X\mid Y]\bigr]=\mathbb EX$.
2. **Hàm của điều kiện ra ngoài.** Với hàm $h$ sao cho $\mathbb E\lvert h(Y)X\rvert<\infty$, $\mathbb E[h(Y)X\mid Y]=h(Y)\,\mathbb E[X\mid Y]$.
3. **Độc lập.** Nếu $X$ và $Y$ độc lập thì $\mathbb E[X\mid Y]=\mathbb EX$.
4. **Thay giá trị.** Cho $I$ rời rạc, độc lập với $Y$, và hàm $h$ với $\mathbb E\lvert h(Y,I)\rvert<\infty$. Với mọi $y$ có $P(Y=y)>0$ và $\mathbb E\lvert h(y,I)\rvert<\infty$,

$$
\mathbb E[h(Y,I)\mid Y=y]=\mathbb E\,h(y,I).
\tag{4.10}
$$

**Điều kiện áp dụng.** Phần 3 và phần 4 cần tính độc lập; phần 1 và phần 2 không cần.

**Phạm vi.** Với $h$ nhận giá trị vectơ, các đẳng thức áp theo từng tọa độ.
:::

::: proof Chứng minh Mệnh đề 05c.38
**Bước 1 (phần 1).** Theo (4.2) áp cho hàm $y\mapsto\mathbb E[X\mid Y=y]$ của $Y$, rồi (4.9) và (2.1):

$$
\begin{aligned}
\mathbb E\bigl[\mathbb E[X\mid Y]\bigr]&=\sum_y\mathbb E[X\mid Y=y]\,P(Y=y)\\
&=\sum_y\sum_xx\,P(X=x,Y=y)\\
&=\sum_xx\,P(X=x)=\mathbb EX .
\end{aligned}
$$

Đổi thứ tự cộng ở dòng ba hợp lệ vì chuỗi hội tụ tuyệt đối; tổng theo $y$ của $P(X=x,Y=y)$ là $P(X=x)$ theo tiên đề (1.2).

**Bước 2 (phần 2).** Trên biến cố $\{Y=y\}$, $h(Y)=h(y)$ là hằng số. Theo nhận xét sau Định nghĩa 05c.8, $P(\cdot\mid Y=y)$ là một xác suất, nên Định lý 05c.28 áp cho nó và đưa hằng số $h(y)$ ra ngoài kỳ vọng có điều kiện.

**Bước 3 (phần 3).** Độc lập cho $P(X=x\mid Y=y)=P(X=x)$, nên (4.9) trùng (4.1).

**Bước 4 (phần 4).** Trên biến cố $\{Y=y\}$, $h(Y,I)=h(y,I)$. Áp (4.2) cho xác suất $P(\cdot\mid Y=y)$:

$$
\mathbb E[h(Y,I)\mid Y=y]=\sum_ih(y,i)\,P(I=i\mid Y=y)=\sum_ih(y,i)\,P(I=i),
$$

trong đó đẳng thức thứ hai dùng tính độc lập của $I$ và $Y$. Tổng cuối là $\mathbb E\,h(y,I)$ theo (4.2). $\square$
:::

Phần 1 là dạng kỳ vọng của Mệnh đề 05c.10: với $X=\mathbf 1_A$ và $Y$ chỉ ra phần $B_j$ chứa kết cục, phần 1 trở thành (2.3). Phần 4 là công cụ chính của Mục 6: khi $I$ là nhóm được rút mới và $Y$ là tham số hiện tại, kỳ vọng theo nhóm được tính như thể tham số cố định.

::: example Ví dụ 05c.25 (Cây hai bước của SGD)
**Dữ kiện.** Ví dụ ba quan sát: $g_i(\theta)=\theta-y_i$ với $y=(-1,1,3)$, $J'(\theta)=\theta-1$. SGD với điểm đầu $\theta_0=0$, bước $\eta=0{,}1$, nhóm một chỉ số rút đều; chỉ số $I_2$ của bước hai độc lập với chỉ số $I_1$ của bước một.

**Bước một.** Tại $\theta_0=0$, gradient mẫu là $1$, $-1$, $-3$, nên $\theta_1=\theta_0-0{,}1\,g_{I_1}(\theta_0)$ nhận $-0{,}1$; $0{,}1$; $0{,}3$, mỗi giá trị với xác suất $\tfrac13$.

**Trung bình trong nhánh.** $\theta_1$ là hàm của $I_1$, nên độc lập với $I_2$. Phần 4 của Mệnh đề 05c.38 với $Y=\theta_1$, $I=I_2$ và $h(t,i)=t-y_i$ cho

$$
\mathbb E\bigl[g_{I_2}(\theta_1)\mid\theta_1=t\bigr]=\mathbb E\,(t-y_{I_2})=t-1 .
$$

Ba nhánh cho $-1{,}1$; $-0{,}9$; $-0{,}7$.

**Trung bình các nhánh.** Phần 1 cho $\mathbb E\,g_{I_2}(\theta_1)=\tfrac13(-1{,}1-0{,}9-0{,}7)=-0{,}9$.

**Kiểm tra lại.** Cộng trực tiếp trên $9$ lá $(I_1,I_2)$ đồng khả năng: với mỗi $\theta_1$, ba giá trị $\theta_1-y_i$ có trung bình $\theta_1-1$, nên tổng chín lá chia $9$ cũng bằng $-0{,}9$. Cách khác: $\mathbb E\theta_1=0{,}1$ và $\mathbb E\theta_1-1=-0{,}9$.
:::

**Trong học máy.** Mệnh đề 05c.38 cho phép phân tích SGD từng bước: lấy kỳ vọng theo nhóm mới khi lịch sử cố định, rồi theo lịch sử; Bài 05b gọi phần 1 áp cho lịch sử là tính chất tháp (tower property). Giả thiết độc lập của phần 4 là việc nhóm ở mỗi bước được rút mới; Mục 6.6 dùng nó, và Tình huống 05c.3 cho thấy hậu quả khi nó bị vi phạm.

::: exercise Bài tập 05c.4 (Sai số bình phương sau một bước SGD)
**Dữ kiện.** Ví dụ 05c.25: ví dụ ba quan sát, $\theta_0=0$, $\eta=0{,}1$, nhóm một chỉ số; $\theta_1$ nhận $-0{,}1$; $0{,}1$; $0{,}3$, mỗi giá trị với xác suất $\tfrac13$. Gradient mẫu tại $\theta_0=0$ là $1$, $-1$, $-3$.

Tính $\mathbb E(\theta_1-1)^2$ theo hai cách:

1. trực tiếp từ PMF của $\theta_1$;
2. bằng phần 1 của Mệnh đề 05c.31, sau khi tính $\mathbb E\theta_1$ và $\operatorname{Var}\theta_1$ qua phương sai của gradient mẫu tại $\theta_0$.
:::

::: hint
$\theta_1=-0{,}1\,g_{I_1}(0)$; dùng phần 2 của Mệnh đề 05c.31. Phương sai của gradient mẫu tại $\theta_0=0$ bằng phương sai của ba số $1$, $-1$, $-3$.
:::

::: solution
**Cách 1.** $\mathbb E(\theta_1-1)^2=\tfrac13\bigl(1{,}21+0{,}81+0{,}49\bigr)$, tức $\tfrac{2{,}51}3\approx0{,}8367$.

**Cách 2.** Ba gradient mẫu tại $0$ có trung bình $-1$ và phương sai $\tfrac13(4+0+4)=\tfrac83$. Do đó $\mathbb E\theta_1=-0{,}1\cdot(-1)=0{,}1$ và $\operatorname{Var}\theta_1=0{,}01\cdot\tfrac83\approx0{,}0267$. Phần 1 của Mệnh đề 05c.31 áp cho $\theta_1-1$, có cùng phương sai và kỳ vọng $-0{,}9$:

$$
\begin{aligned}
\mathbb E(\theta_1-1)^2&=\operatorname{Var}\theta_1+(\mathbb E\theta_1-1)^2\\
&\approx0{,}0267+0{,}81=0{,}8367 .
\end{aligned}
$$

**Kiểm tra lại.** Hai cách cho cùng kết quả. Số hạng $0{,}81=0{,}9^2$ là phần tất định, số hạng $0{,}0267$ là phần do nhiễu của nhóm; Mục 6.6 lặp phép tách này qua nhiều bước.
:::

::: exercise Bài tập 05c.5 (Phương sai của trung bình khi các quan sát tương quan)
Cho $X_1,\ldots,X_b$ cùng kỳ vọng $\mu$, cùng phương sai $\sigma_1^2$, và mọi cặp $r\ne s$ có cùng hiệp phương sai $\gamma\ge0$.

1. Chứng minh $\operatorname{Var}\bar X_b=\dfrac{\sigma_1^2}b+\Bigl(1-\dfrac1b\Bigr)\gamma$.
2. Với $\sigma_1^2=\tfrac83$ và $\gamma=\tfrac23$, tính $\operatorname{Var}\bar X_b$ khi $b=16$ và giới hạn khi $b\to\infty$. So với trường hợp $\gamma=0$.
3. Giải thích vì sao tăng cỡ nhóm không đưa phương sai về $0$ khi các quan sát trong nhóm tương quan dương.
:::

::: hint
Áp Mệnh đề 05c.33: có $b$ phương sai và $b(b-1)/2$ cặp.
:::

::: solution
**Câu 1.** Mệnh đề 05c.33 cho $\operatorname{Var}\sum_rX_r=b\sigma_1^2+b(b-1)\gamma$. Chia cho $b^2$ theo phần 2 của Mệnh đề 05c.31:

$$
\operatorname{Var}\bar X_b=\frac{\sigma_1^2}b+\frac{(b-1)\gamma}b=\frac{\sigma_1^2}b+\Bigl(1-\frac1b\Bigr)\gamma .
$$

**Câu 2.** Với $b=16$: $\tfrac{8}{48}+\tfrac{15}{16}\cdot\tfrac23=0{,}1667+0{,}625=0{,}7917$. Khi $b\to\infty$, phương sai tiến tới $\gamma=\tfrac23$. Với $\gamma=0$, phương sai ở $b=16$ là $\tfrac16\approx0{,}1667$, nhỏ hơn gần năm lần.

**Câu 3.** Số hạng $(1-\tfrac1b)\gamma$ tăng theo $b$ và tiến tới $\gamma>0$: phần nhiễu chung cho mọi quan sát trong nhóm không bị trung bình hóa. Chỉ số hạng $\sigma_1^2/b$ giảm theo $b$.

**Kiểm tra lại.** Với $\gamma=0$ công thức trở về (4.7). Với $\gamma=\sigma_1^2$, mọi quan sát trùng nhau theo nghĩa phương sai, và công thức cho $\sigma_1^2$ với mọi $b$.
:::

**Chuỗi suy luận của mục.** Định nghĩa 05c.26, Mệnh đề 05c.27, Định lý 05c.28 và Mệnh đề 05c.29 cho tâm và kỳ vọng của tổng không cần độc lập. Định nghĩa 05c.30, Mệnh đề 05c.31, Mệnh đề 05c.32 và Mệnh đề 05c.33 cho quy tắc cộng phương sai. Định lý 05c.35 là đích, Mệnh đề 05c.36 là biến thể không hoàn lại, và Mệnh đề 05c.38 chuẩn bị cho Mục 6.

**Kết mục.** Trung bình mẫu không chệch và có phương sai $\sigma_1^2/n$ (Định lý 05c.35), nhỏ hơn thêm hệ số $\frac{N-n}{N-1}$ khi rút không hoàn lại (Mệnh đề 05c.36). Phương sai là sai số bình phương trung bình trên mọi lần rút; nó chưa cho xác suất để một lần ước lượng lệch quá $\varepsilon$, điều cần cho bảo đảm kiểu "với xác suất ít nhất $0{,}95$". Mục 5 chuyển mômen thành cận xác suất.

## 5. Bất đẳng thức tập trung

Định lý 05c.35 cho phương sai $\sigma_1^2/n$, tức sai số bình phương trung bình trên mọi lần rút. Một quyết định thực tế cần phát biểu khác, chẳng hạn: với xác suất ít nhất $0{,}95$, tỉ lệ lỗi đo trên $1000$ ảnh lệch khỏi tỉ lệ lỗi thật không quá $0{,}03$. Mục này chuyển mômen thành cận xác suất, gọi là bất đẳng thức tập trung (concentration inequality), theo ba mức thông tin: chỉ biết kỳ vọng (Markov), biết thêm phương sai (Chebyshev), biết các quan sát độc lập và bị chặn (Chernoff, Hoeffding). Đích của mục là cỡ mẫu và khoảng tin cậy cho một kỳ vọng.

### 5.1 Bất đẳng thức Markov

Giả sử chỉ biết kỳ vọng của một đại lượng không âm $Z$. Trực giác, chưa phải phát biểu: nếu một phần khối lượng $q$ nằm ở các giá trị không nhỏ hơn $\varepsilon$, phần đó đã đóng góp ít nhất $q\varepsilon$ vào kỳ vọng; kỳ vọng nhỏ thì $q$ không thể lớn.

::: example Ví dụ 05c.26 (Đuôi phải của tổng hai xúc xắc)
**Dữ kiện.** Tổng hai xúc xắc $S\ge0$ với $\mathbb ES=7$ (Ví dụ 05c.17); từ PMF, $P(S\ge11)=\tfrac{2+1}{36}$, tức $\tfrac1{12}\approx0{,}083$.

**Lập luận chỉ dùng kỳ vọng.** Phần khối lượng ở $\{S\ge11\}$ đóng góp ít nhất $11\cdot P(S\ge11)$ vào $\mathbb ES=7$, các giá trị còn lại đóng góp không âm. Do đó $11\cdot P(S\ge11)\le7$, tức $P(S\ge11)\le\tfrac7{11}\approx0{,}636$.

**Kiểm tra lại.** $\tfrac1{12}\le\tfrac7{11}$; cận đúng nhưng lớn gấp gần tám lần xác suất thật.
:::

::: theorem Định lý 05c.39 (Bất đẳng thức Markov)
**Giả thiết.** $Z$ là biến ngẫu nhiên với $Z\ge0$ trên mọi kết cục và $\mathbb EZ<\infty$; $\varepsilon>0$.

**Kết luận.**

$$
P(Z\ge\varepsilon)\le\frac{\mathbb EZ}\varepsilon .
\tag{5.1}
$$

Dấu bằng xảy ra khi và chỉ khi $P\bigl(Z\in\{0,\varepsilon\}\bigr)=1$.

**Điều kiện áp dụng.** Cần $Z\ge0$; với biến nhận giá trị âm, (5.1) có thể sai.

**Phạm vi.** Cận chỉ dùng kỳ vọng nên áp dụng rộng nhưng thường lỏng; cận có ích khi $\varepsilon>\mathbb EZ$.
:::

::: proof Chứng minh Định lý 05c.39
**Bước 1 (chặn chỉ thị).** Trên mọi kết cục, $Z\ge\varepsilon\,\mathbf 1\{Z\ge\varepsilon\}$. Khi $Z\ge\varepsilon$, vế phải bằng $\varepsilon$ và không vượt $Z$. Khi $Z<\varepsilon$, vế phải bằng $0$ và $Z\ge0$ theo giả thiết.

**Bước 2 (lấy kỳ vọng).** Phần 3 rồi phần 1 của Mệnh đề 05c.29 cho $\mathbb EZ\ge\varepsilon\,\mathbb E\mathbf 1\{Z\ge\varepsilon\}=\varepsilon P(Z\ge\varepsilon)$. Chia cho $\varepsilon>0$ được (5.1).

**Bước 3 (dấu bằng).** Dấu bằng ở Bước 2 đòi $\mathbb E\bigl[Z-\varepsilon\mathbf 1\{Z\ge\varepsilon\}\bigr]=0$ với biểu thức trong ngoặc không âm, tức $Z=\varepsilon\mathbf 1\{Z\ge\varepsilon\}$ với xác suất $1$: $Z$ chỉ nhận $0$ hoặc $\varepsilon$. Ngược lại, khi đó hai vế của Bước 1 bằng nhau trên mọi kết cục. $\square$
:::

Bất đẳng thức Markov là bước đầu tiên của mọi cận trong mục (Boyd và Vandenberghe, 2004, mục 7.4.1, tr. 374–375; Wasserman, 2004, mục 4.1). Giả thiết $Z\ge0$ không bỏ được: với $Z$ nhận $-3$ và $1$ với xác suất $\tfrac14$ và $\tfrac34$, $\mathbb EZ=-\tfrac34+\tfrac34=0$ nhưng $P(Z\ge1)=\tfrac34>0$. Trong chứng minh, đó chính là chỗ Bước 1 hỏng: $Z\ge0$ được dùng khi $Z<\varepsilon$.

::: example Ví dụ 05c.27 (Số quan sát chưa gặp sau một lượt rút có hoàn lại)
**Dữ kiện.** Ví dụ 05c.19: sau $N$ lần rút có hoàn lại từ $N$ quan sát, số quan sát chưa gặp $T_N\ge0$ có $\mathbb ET_N=N(1-\tfrac1N)^N$, bằng $367{,}7$ khi $N=1000$.

**Áp dụng Định lý 05c.39.** Với $\varepsilon=N/2=500$,

$$
P\Bigl(T_N\ge\frac N2\Bigr)\le\frac{367{,}7}{500}\approx0{,}735 .
$$

**Diễn giải.** Với xác suất ít nhất $0{,}265$, quá nửa số quan sát đã được dùng sau một lượt rút có hoàn lại. Cận yếu vì chỉ dùng kỳ vọng; $T_N$ thực tế tập trung sát $368$, và các mục sau dùng thêm thông tin để chặn chặt hơn.

**Kiểm tra lại.** $(1-0{,}001)^{1000}\approx0{,}3677$; $367{,}7/500=0{,}7354$.
:::

**Trong học máy.** Các định lý hội tụ của SGD trong Bài 05b chặn một kỳ vọng, chẳng hạn trung bình của $\mathbb E\lVert\nabla J(\theta_k)\rVert^2$ qua các bước. Bất đẳng thức Markov chuyển cận đó thành phát biểu cho một lần chạy: nếu kỳ vọng không vượt $c$, thì với xác suất ít nhất $1-\delta$ đại lượng không vượt $c/\delta$.

### 5.2 Bất đẳng thức Chebyshev và luật số lớn yếu

Ở Ví dụ 05c.26, cận $\tfrac7{11}$ không dùng phương sai $\tfrac{35}6$ đã tính ở Ví dụ 05c.20. Ở mức trực giác, áp Markov cho đại lượng không âm $(S-7)^2$, có kỳ vọng bằng phương sai, sẽ đưa phương sai vào cận.

::: example Ví dụ 05c.28 (Độ lệch của tổng hai xúc xắc)
**Dữ kiện.** $\mathbb ES=7$, $\operatorname{Var}S=\tfrac{35}6$ (Ví dụ 05c.20). Biến cố $\{\lvert S-7\rvert\ge4\}$ gồm $S\in\{2,3,11,12\}$ và có xác suất đúng $\tfrac{1+2+2+1}{36}=\tfrac16$.

**Áp Định lý 05c.39 cho $(S-7)^2$ với ngưỡng $16$.**

$$
\begin{aligned}
P(\lvert S-7\rvert\ge4)&=P\bigl((S-7)^2\ge16\bigr)\\
&\le\frac{\mathbb E(S-7)^2}{16}\\
&=\frac{35/6}{16}=\frac{35}{96}\approx0{,}365 .
\end{aligned}
$$

**Kiểm tra lại.** $\tfrac16\approx0{,}167\le0{,}365$.
:::

::: corollary Hệ quả 05c.40 (Bất đẳng thức Chebyshev)
**Giả thiết.** $X$ có phương sai hữu hạn, $\mu=\mathbb EX$; $t>0$.

**Kết luận.**

$$
P(\lvert X-\mu\rvert\ge t)\le\frac{\operatorname{Var}X}{t^2}.
\tag{5.2}
$$

**Điều kiện áp dụng.** Chỉ cần phương sai hữu hạn; không cần độc lập hay bị chặn.

**Phạm vi.** Đây là cận hai phía. Dùng nó cho một biến cố một phía như $\{X-\mu\ge t\}$ vẫn đúng, vì biến cố một phía nằm trong biến cố hai phía, nhưng lỏng hơn.
:::

::: proof Chứng minh Hệ quả 05c.40
Hai biến cố $\{\lvert X-\mu\rvert\ge t\}$ và $\{(X-\mu)^2\ge t^2\}$ trùng nhau. Áp Định lý 05c.39 với $Z=(X-\mu)^2\ge0$ và $\varepsilon=t^2$; theo (4.4), $\mathbb EZ=\operatorname{Var}X$. $\square$
:::

Cận Chebyshev giảm theo bình phương ngưỡng, nhanh hơn cận Markov giảm theo ngưỡng, nhờ dùng thêm phương sai (Koller và Friedman, 2009, Định lý 2.1, tr. 33–34). Đối với trung bình mẫu, Định lý 05c.35 cho phương sai $\sigma_1^2/n$, và ghép hai kết quả cho câu trả lời đầu tiên của câu hỏi "Xác suất sai lệch".

::: theorem Định lý 05c.41 (Luật số lớn yếu, weak law of large numbers)
**Giả thiết.** $X_1,X_2,\ldots$ i.i.d. với $\mu=\mathbb EX_1$ và $\sigma_1^2=\operatorname{Var}X_1<\infty$; $\varepsilon>0$.

**Kết luận.**

$$
P\bigl(\lvert\bar X_n-\mu\rvert\ge\varepsilon\bigr)\le\frac{\sigma_1^2}{n\varepsilon^2}\xrightarrow[n\to\infty]{}0 .
\tag{5.3}
$$

**Điều kiện áp dụng.** Đủ là các $X_i$ không tương quan đôi một, cùng kỳ vọng và cùng phương sai hữu hạn.

**Phạm vi.** Cận giảm theo $1/n$; Mục 5.3 cho thấy khi các quan sát bị chặn, xác suất thật giảm theo hàm mũ của $n$.
:::

::: proof Chứng minh Định lý 05c.41
Định lý 05c.35 cho $\mathbb E\bar X_n=\mu$ và $\operatorname{Var}\bar X_n=\sigma_1^2/n$. Hệ quả 05c.40 áp cho $X=\bar X_n$ với $t=\varepsilon$ cho (5.3). $\square$
:::

::: example Ví dụ 05c.29 (Tần suất mặt ngửa)
**Dữ kiện.** Tung $n$ đồng xu cân đối độc lập; $S$ là số mặt ngửa và $\bar X_n=S/n$ là tỉ lệ mặt ngửa, với $\mu=\tfrac12$ và $\sigma_1^2=\tfrac14$. Xét biến cố $\{\lvert\bar X_n-\tfrac12\rvert\ge0{,}1\}$.

**Tính.** Xác suất đúng là tổng nhị thức theo Mệnh đề 05c.21; cận (5.3) là $\tfrac{1/4}{n\cdot0{,}01}=\tfrac{25}n$.

| $n$ | $10$ | $20$ | $50$ | $100$ | $200$ |
|---|---:|---:|---:|---:|---:|
| xác suất đúng | $0{,}754$ | $0{,}503$ | $0{,}203$ | $0{,}0569$ | $0{,}00569$ |
| cận Chebyshev | $2{,}5$ | $1{,}25$ | $0{,}5$ | $0{,}25$ | $0{,}125$ |

**Diễn giải.** Cận lớn hơn $1$ khi $n<25$ và không cho thông tin; sau đó nó giảm theo $1/n$. Xác suất đúng giảm nhanh hơn nhiều: từ $n=100$ đến $n=200$, nó giảm mười lần trong khi cận giảm hai lần.

**Kiểm tra lại.** Với $n=10$, biến cố là $S\le4$ hoặc $S\ge6$, tức mọi giá trị trừ $S=5$; $1-\binom{10}5/2^{10}=1-\tfrac{252}{1024}\approx0{,}754$.
:::

**Trong học máy.** Gọi $\xi_i$ là quan sát thứ $i$ của một tập dữ liệu và $\ell(\theta;\xi_i)$ là mất mát của tham số $\theta$ trên quan sát đó. Với $\theta$ cố định và các quan sát i.i.d., Định lý 05c.41 áp cho $X_i=\ell(\theta;\xi_i)$ cho thấy mất mát trung bình tiến tới rủi ro kỳ vọng khi $n$ tăng, căn cứ của việc đánh giá trên tập kiểm thử. Mục 6.1 phát biểu chính xác điều này và điều kiện "$\theta$ cố định".

### 5.3 Hàm sinh mômen và cận Chernoff

Với $n=100$ đồng xu cân đối, $P(S\ge75)=2{,}82\cdot10^{-7}$, trong khi Chebyshev chỉ cho $P(\lvert S-50\rvert\ge25)\le\tfrac{25}{625}=0{,}04$; cận Chebyshev giảm theo $1/n$ còn xác suất đúng giảm theo hàm mũ của $n$. Trực giác, chưa phải phát biểu: áp Markov cho $e^{\lambda X}$ thay cho $(X-\mu)^2$. Hàm mũ khuếch đại phần đuôi xa, và với tổng các biến độc lập, $e^{\lambda\sum_iX_i}$ là tích các thừa số độc lập.

::: definition Định nghĩa 05c.42 (Hàm sinh mômen)
Hàm sinh mômen (moment generating function) của biến ngẫu nhiên $X$ là hàm $\lambda\mapsto\mathbb Ee^{\lambda X}$, $\lambda\in\mathbb R$, với giá trị trong $[0,+\infty]$. Quy ước $\mathbb Ee^{\lambda X}=+\infty$ khi chuỗi $\sum_xe^{\lambda x}p_X(x)$ phân kỳ.
:::

Tên gọi đến từ khai triển $e^{\lambda X}=\sum_k\lambda^kX^k/k!$: khi hàm hữu hạn quanh $0$, $\mathbb EX^k/k!$ là hệ số của $\lambda^k$ trong khai triển của $\mathbb Ee^{\lambda X}$. Chương chỉ dùng hàm này như một đại lượng trung gian trong cận Chernoff (Wasserman, 2004, mục 3.6). Với biến bị chặn, hàm sinh mômen hữu hạn với mọi $\lambda$, vì $e^{\lambda X}$ bị chặn.

::: example Ví dụ 05c.30 (Hàm sinh mômen của một đồng xu)
**Dữ kiện.** $X$ Bernoulli$(\tfrac12)$; đặt $W=2X-1$, nhận $-1$ và $1$ với xác suất $\tfrac12$ mỗi giá trị.

**Tính.** Theo (4.2), $\mathbb Ee^{\lambda W}=\tfrac12(e^\lambda+e^{-\lambda})=\cosh\lambda$. Tại $\lambda=1$: $\cosh1\approx1{,}543$, nhỏ hơn $e^{1/2}\approx1{,}649$.

**Diễn giải.** Tại $\lambda=1$, hàm sinh mômen của $W$ nhỏ hơn $e^{\lambda^2/2}$. Bước 1 trong chứng minh Định lý 05c.45 chứng minh $\cosh\lambda\le e^{\lambda^2/2}$ với mọi $\lambda$, loại cận mà Định lý 05c.43 cần.

**Kiểm tra lại.** $\mathbb EW=0$ và $\mathbb EW^2=1$, nên hai hệ số đầu của khai triển $\cosh\lambda=1+\tfrac{\lambda^2}2+\cdots$ là $1$ và $\tfrac12\mathbb EW^2$.
:::

::: theorem Định lý 05c.43 (Cận Chernoff, dạng tổng quát)
**Giả thiết.** $X$ là biến ngẫu nhiên, $u\in\mathbb R$.

**Kết luận.**

$$
P(X\ge u)\le\inf_{\lambda\ge0}e^{-\lambda u}\,\mathbb Ee^{\lambda X},
\tag{5.4}
$$

với quy ước vế phải có thể bằng $+\infty$.

**Điều kiện áp dụng.** Không cần giả thiết thêm; cận có ích khi hàm sinh mômen hữu hạn với một $\lambda>0$.

**Phạm vi.** Cận một phía. Đuôi trái $P(X\le u)$ được chặn bằng cách áp (5.4) cho $-X$.
:::

::: proof Chứng minh Định lý 05c.43
**Bước 1 ($\lambda=0$).** Vế phải bằng $1$, và mọi xác suất không vượt $1$.

**Bước 2 ($\lambda>0$).** Hàm $x\mapsto e^{\lambda x}$ tăng chặt, nên $\{X\ge u\}=\{e^{\lambda X}\ge e^{\lambda u}\}$. Định lý 05c.39 với $Z=e^{\lambda X}\ge0$ và $\varepsilon=e^{\lambda u}>0$ cho $P(X\ge u)\le e^{-\lambda u}\mathbb Ee^{\lambda X}$; khi $\mathbb Ee^{\lambda X}=+\infty$, vế phải bằng $+\infty$ và bất đẳng thức đúng.

**Bước 3 (cận dưới đúng).** Cận đúng với mọi $\lambda\ge0$, nên đúng với cận dưới đúng theo $\lambda$. $\square$
:::

Chứng minh của Định lý 05c.39, Hệ quả 05c.40 và Định lý 05c.43 dùng cùng một ý: hàm chỉ thị của biến cố bị chặn trên bởi một hàm không âm có kỳ vọng tính được, rồi lấy kỳ vọng hai vế (Boyd và Vandenberghe, 2004, mục 7.4.2, tr. 379).

![Ba khung đồ thị. Khung Markov: hàm bậc thang chỉ thị của z ≥ ε nằm dưới đường thẳng z/ε. Khung Chebyshev: chỉ thị của |x − μ| ≥ t nằm dưới parabol ((x − μ)/t)², chạm parabol tại μ ± t. Khung Chernoff: chỉ thị của x ≥ u nằm dưới hàm mũ exp(λ(x − u)), chạm tại x = u.](img/lec-05c/indicator-dominating-functions.svg)

Ba khung của hình vẽ ba hàm chặn trên cùng một bậc thang. Hàm chặn càng sát bậc thang ở vùng có nhiều khối lượng thì cận càng chặt; hàm mũ gần $0$ bên trái ngưỡng, và $\lambda$ trong (5.4) điều chỉnh độ dốc của nó.

Để dùng (5.4) cho một tổng, cần hàm sinh mômen của tổng. Mệnh đề sau tách nó thành tích nhờ tính độc lập.

::: proposition Mệnh đề 05c.44 (Hàm sinh mômen của tổng độc lập)
**Giả thiết.** $X_1,\ldots,X_n$ độc lập; $\lambda\in\mathbb R$ với $\mathbb Ee^{\lambda X_i}<\infty$ cho mọi $i$.

**Kết luận.** $\mathbb Ee^{\lambda\sum_iX_i}=\prod_{i=1}^n\mathbb Ee^{\lambda X_i}$.

**Điều kiện áp dụng.** Tính độc lập là cần thiết; tính tuyến tính của kỳ vọng không đủ vì $e^{\lambda\sum_iX_i}$ là tích, không phải tổng.

**Phạm vi.** Với các biến phụ thuộc, hàm sinh mômen của tổng có thể lớn hơn tích, và xác suất đuôi của tổng có thể lớn hơn nhiều, như Tình huống 05c.2.
:::

::: proof Chứng minh Mệnh đề 05c.44
Quy nạp theo $n$; với $n=1$ hai vế trùng nhau. Viết $e^{\lambda\sum_{i\le n}X_i}=e^{\lambda\sum_{i<n}X_i}\cdot e^{\lambda X_n}$. Theo Mệnh đề 05c.24 với hai khối $\{1,\ldots,n-1\}$ và $\{n\}$, hai thừa số độc lập. Mệnh đề 05c.32 tách kỳ vọng của tích thành tích các kỳ vọng, và giả thiết quy nạp cho thừa số thứ nhất. $\square$
:::

::: theorem Định lý 05c.45 (Cận Chernoff cho đồng xu cân đối)
**Giả thiết.** $X_1,\ldots,X_n$ i.i.d. Bernoulli$(\tfrac12)$, $S=\sum_{i=1}^nX_i$, $\varepsilon>0$.

**Kết luận.**

$$
P\Bigl(S-\frac n2\ge n\varepsilon\Bigr)\le e^{-2n\varepsilon^2}.
\tag{5.5}
$$

**Điều kiện áp dụng.** Cần tính độc lập và xác suất $\tfrac12$.

**Phạm vi.** Cận một phía; Định lý 05c.47 mở rộng cho biến bị chặn bất kỳ.
:::

::: proof Chứng minh Định lý 05c.45
**Bước 1 (cận cho $\cosh$).** Cộng khai triển Taylor của $e^\lambda$ và $e^{-\lambda}$ cho $\cosh\lambda=\sum_{k\ge0}\frac{\lambda^{2k}}{(2k)!}$. Vì $(2k)!=\prod_{j=1}^k(2j)(2j-1)$ và tích này không nhỏ hơn $\prod_{j=1}^k2j=2^kk!$, so sánh từng số hạng cho

$$
\cosh\lambda\le\sum_{k\ge0}\frac{(\lambda^2/2)^k}{k!}=e^{\lambda^2/2}.
$$

**Bước 2 (đổi biến).** Đặt $W_i=2X_i-1\in\{-1,1\}$. Khi đó $\sum_iW_i=2S-n$, và biến cố cần chặn là $\{\sum_iW_i\ge2n\varepsilon\}$. Các $W_i$ độc lập theo Mệnh đề 05c.24.

**Bước 3 (Chernoff).** Với $\lambda\ge0$, Định lý 05c.43, Mệnh đề 05c.44, Ví dụ 05c.30 và Bước 1 cho

$$
\begin{aligned}
P\Bigl(\sum_iW_i\ge2n\varepsilon\Bigr)&\le e^{-2n\varepsilon\lambda}\prod_{i=1}^n\mathbb Ee^{\lambda W_i}\\
&=e^{-2n\varepsilon\lambda}(\cosh\lambda)^n\\
&\le\exp\Bigl(-2n\varepsilon\lambda+\frac{n\lambda^2}2\Bigr).
\end{aligned}
$$

**Bước 4 (chọn $\lambda$).** Số mũ là hàm bậc hai của $\lambda$, nhỏ nhất tại $\lambda=2\varepsilon$, với giá trị $-4n\varepsilon^2+2n\varepsilon^2=-2n\varepsilon^2$. $\square$
:::

Định lý 05c.45 có cùng dạng với Koller và Friedman (2009, Định lý A.3, tr. 1145) khi $p=\tfrac12$. Với $n=100$ và $S\ge75$, tức $\varepsilon=0{,}25$, cận là $e^{-12{,}5}\approx3{,}73\cdot10^{-6}$: lớn hơn xác suất đúng khoảng $13$ lần nhưng nhỏ hơn cận Chebyshev khoảng $10^4$ lần. So với Định lý 05c.41, định lý đổi giả thiết phương sai hữu hạn lấy giả thiết độc lập, bị chặn, và nhận cận mũ thay cho $1/n$.

**Trong học máy.** Số ảnh bị phân loại sai trên một tập kiểm thử là tổng các biến Bernoulli độc lập khi các ảnh được rút độc lập. Với tỉ lệ lỗi $\tfrac12$, Định lý 05c.45 cho xác suất tỉ lệ lỗi đo được vượt tỉ lệ thật từ $\varepsilon$ trở lên giảm theo $e^{-2n\varepsilon^2}$; Định lý 05c.47 ở Mục 5.4 bỏ điều kiện tỉ lệ $\tfrac12$, và Mục 6 áp nó cho mất mát và gradient.

### 5.4 Bổ đề Hoeffding và bất đẳng thức Hoeffding

Định lý 05c.45 chỉ áp dụng cho đồng xu cân đối, trong khi tỉ lệ lỗi phân loại có $p$ chưa biết và một tọa độ gradient nằm trong một khoảng khác $[0,1]$. Bước 1 của chứng minh trên cần được thay bằng một cận cho hàm sinh mômen của một biến bị chặn bất kỳ có kỳ vọng $0$; bổ đề sau cho cận đó.

::: lemma Bổ đề 05c.46 (Bổ đề Hoeffding)
**Giả thiết.** $Y$ là biến ngẫu nhiên với $m\le Y\le M$ trên mọi kết cục, $m<M$, và $\mathbb EY=0$.

**Kết luận.** Với mọi $\lambda\in\mathbb R$,

$$
\mathbb Ee^{\lambda Y}\le\exp\Bigl(\frac{\lambda^2(M-m)^2}8\Bigr).
\tag{5.6}
$$

**Điều kiện áp dụng.** Cần $Y$ bị chặn và có kỳ vọng $0$; khi đó $m\le0\le M$.

**Phạm vi.** Cận chỉ dùng độ rộng $M-m$, không dùng phương sai; khi phương sai nhỏ hơn nhiều so với $(M-m)^2/4$, cận lỏng.
:::

::: proof Chứng minh Bổ đề 05c.46
**Bước 1 (trường hợp suy biến).** Vì $\mathbb EY=0$ và $m\le Y\le M$, phần 3 của Mệnh đề 05c.29 cho $m\le0\le M$. Nếu $m=0$ thì $Y\ge0$ có kỳ vọng $0$, nên $Y=0$ với xác suất $1$ và vế trái bằng $1$; trường hợp $M=0$ tương tự. Từ đây giả sử $m<0<M$ và đặt $\alpha=\frac{-m}{M-m}\in(0,1)$.

**Bước 2 (dây cung).** Hàm $y\mapsto e^{\lambda y}$ lồi, nên theo Định nghĩa 01.22 áp cho hai điểm $m$, $M$, với mọi $y\in[m,M]$:

$$
e^{\lambda y}\le\frac{M-y}{M-m}e^{\lambda m}+\frac{y-m}{M-m}e^{\lambda M}.
$$

Thay $y=Y$, lấy kỳ vọng theo Định lý 05c.28 và phần 3 của Mệnh đề 05c.29, rồi dùng $\mathbb EY=0$:

$$
\mathbb Ee^{\lambda Y}\le\frac M{M-m}e^{\lambda m}+\frac{-m}{M-m}e^{\lambda M}=(1-\alpha)e^{\lambda m}+\alpha e^{\lambda M}.
$$

**Bước 3 (đổi biến).** Đặt $v=\lambda(M-m)$. Khi đó $\lambda m=-\alpha v$ và $\lambda M=(1-\alpha)v$, nên vế phải của Bước 2 bằng $e^{-\alpha v}\bigl(1-\alpha+\alpha e^v\bigr)=e^{\varphi(v)}$ với

$$
\varphi(v)=-\alpha v+\ln\bigl(1-\alpha+\alpha e^v\bigr).
$$

**Bước 4 (đạo hàm).** $\varphi(0)=\ln1=0$. Đạo hàm bậc nhất là $\varphi'(v)=-\alpha+\tau(v)$ với $\tau(v)=\frac{\alpha e^v}{1-\alpha+\alpha e^v}\in(0,1)$, nên $\varphi'(0)=-\alpha+\alpha=0$. Đạo hàm bậc hai là

$$
\begin{aligned}
\varphi''(v)&=\frac{\alpha e^v(1-\alpha)}{(1-\alpha+\alpha e^v)^2}\\
&=\tau(v)\bigl(1-\tau(v)\bigr)\\
&\le\frac14,
\end{aligned}
$$

vì tích của hai số không âm có tổng bằng $1$ không vượt $\tfrac14$.

**Bước 5 (Taylor).** Định lý Taylor với phần dư Lagrange cho một $\vartheta$ giữa $0$ và $v$ với $\varphi(v)=\varphi(0)+\varphi'(0)v+\tfrac12\varphi''(\vartheta)v^2\le\tfrac{v^2}8$. Thay $v=\lambda(M-m)$ được (5.6). $\square$
:::

Bổ đề nói một biến bị chặn, quy tâm, có hàm sinh mômen không lớn hơn hàm sinh mômen của một biến Gauss với phương sai $(M-m)^2/4$. Vế phải $e^{\lambda^2s^2/2}$ với $s^2=(M-m)^2/4$ là hàm sinh mômen của phân phối $\mathcal N(0,s^2)$; chương nêu điều này không chứng minh. Với $[m,M]=[-1,1]$, (5.6) cho $e^{\lambda^2/2}$, đúng cận của Bước 1 trong chứng minh Định lý 05c.45. Chứng minh trên theo hướng của Wasserman (2004, chương 4), viết lại thành các bước.

::: theorem Định lý 05c.47 (Bất đẳng thức Hoeffding)
**Giả thiết.** $X_1,\ldots,X_n$ độc lập; $m_i\le X_i\le M_i$ trên mọi kết cục, với $m_i<M_i$; $\varepsilon>0$.

**Kết luận.** Đặt $V=\sum_{i=1}^n(M_i-m_i)^2$. Khi đó

$$
P\bigl(\bar X_n-\mathbb E\bar X_n\ge\varepsilon\bigr)\le\exp\Bigl(-\frac{2n^2\varepsilon^2}V\Bigr),
\tag{5.7}
$$

và cùng cận đúng cho $P(\bar X_n-\mathbb E\bar X_n\le-\varepsilon)$. Cận hai phía cho $P(\lvert\bar X_n-\mathbb E\bar X_n\rvert\ge\varepsilon)$ gấp đôi vế phải.

**Điều kiện áp dụng.** Cần tính độc lập và khoảng chặn biết trước; không cần cùng phân phối, không cần biết phương sai.

**Phạm vi.** Cận không cải thiện khi phương sai nhỏ hơn nhiều so với độ rộng khoảng; các bất đẳng thức dùng phương sai, chẳng hạn bất đẳng thức Bernstein, nằm ngoài phạm vi chương.
:::

::: proof Chứng minh Định lý 05c.47
**Bước 1 (quy tâm).** Đặt $Y_i=X_i-\mathbb EX_i$. Khi đó $\mathbb EY_i=0$, $Y_i$ nằm trong khoảng $[m_i-\mathbb EX_i,\,M_i-\mathbb EX_i]$ có độ rộng $M_i-m_i$, và các $Y_i$ độc lập theo Mệnh đề 05c.24. Biến cố cần chặn là $\{\sum_iY_i\ge n\varepsilon\}$.

**Bước 2 (Chernoff và bổ đề).** Với $\lambda\ge0$, Định lý 05c.43, Mệnh đề 05c.44 và Bổ đề 05c.46 cho

$$
\begin{aligned}
P\Bigl(\sum_iY_i\ge n\varepsilon\Bigr)&\le e^{-\lambda n\varepsilon}\prod_{i=1}^n\mathbb Ee^{\lambda Y_i}\\
&\le\exp\Bigl(-\lambda n\varepsilon+\frac{\lambda^2V}8\Bigr).
\end{aligned}
$$

**Bước 3 (chọn $\lambda$).** Số mũ nhỏ nhất tại $\lambda=4n\varepsilon/V$, với giá trị $-\frac{4n^2\varepsilon^2}V+\frac{2n^2\varepsilon^2}V=-\frac{2n^2\varepsilon^2}V$. Đó là (5.7).

**Bước 4 (đuôi trái và hai phía).** Các biến $-X_i$ thỏa cùng giả thiết với khoảng $[-M_i,-m_i]$ cùng độ rộng, nên Bước 1–3 cho cùng cận cho đuôi trái. Biến cố hai phía là hợp của hai đuôi, và Mệnh đề 05c.7 cho cận gấp đôi. $\square$
:::

Khi mọi $X_i$ nằm trong cùng khoảng $[m,M]$, (5.7) thành $\exp\bigl(-2n\varepsilon^2/(M-m)^2\bigr)$; với $[0,1]$ và đồng xu cân đối, đó là (5.5). So với Định lý 05c.45, Hoeffding bỏ yêu cầu phân phối cụ thể (Koller và Friedman, 2009, Định lý A.3, tr. 1145, cho trường hợp Bernoulli; Wasserman, 2004, mục 4.1).

**Trong học máy.** Mất mát 0–1 nằm trong $[0,1]$, mất mát bị cắt nằm trong một khoảng cố định, và mỗi tọa độ gradient của hồi quy logistic nằm trong $[-1,1]$ khi đặc trưng nằm trong $[-1,1]$. Với quan sát i.i.d. và tham số cố định, Định lý 05c.47 chặn xác suất mất mát trung bình lệch khỏi rủi ro kỳ vọng. Mất mát entropy chéo không bị chặn nên định lý không áp dụng trực tiếp; Tình huống 05c.1 áp nó cho gradient logistic.

### 5.5 Cỡ mẫu và khoảng tin cậy

Một mô hình được đánh giá trên tập kiểm thử $1000$ ảnh, với xác suất thất bại cho phép $\delta=0{,}05$. Cần biết độ lệch bảo đảm giữa tỉ lệ lỗi đo được và tỉ lệ lỗi thật, và số ảnh cần để độ lệch đó xuống $0{,}03$. Hai yêu cầu này đảo chiều (5.7): cho $n$ tìm $\varepsilon$, hoặc cho $\varepsilon$, $\delta$ tìm $n$; hệ quả sau giải cả hai.

::: corollary Hệ quả 05c.48 (Cỡ mẫu và khoảng tin cậy)
**Giả thiết.** $X_1,\ldots,X_n$ i.i.d., nằm trong $[m,M]$, với kỳ vọng $\mu$; $\varepsilon>0$, $\delta\in(0,1)$.

**Kết luận.**

1. **Cỡ mẫu.** Nếu

$$
n\ge\frac{(M-m)^2\ln(2/\delta)}{2\varepsilon^2}
\tag{5.8}
$$

thì $P(\lvert\bar X_n-\mu\rvert\ge\varepsilon)\le\delta$.

2. **Khoảng tin cậy** (confidence interval). Với $\varepsilon_n=(M-m)\sqrt{\ln(2/\delta)/(2n)}$, khoảng $[\bar X_n-\varepsilon_n,\,\bar X_n+\varepsilon_n]$ chứa $\mu$ với xác suất ít nhất $1-\delta$.

3. **So với Chebyshev.** Định lý 05c.41 cho cùng kết luận của phần 1 khi $n\ge\sigma_1^2/(\delta\varepsilon^2)$.

**Điều kiện áp dụng.** Như Định lý 05c.47; phần 3 chỉ cần phương sai hữu hạn.

**Phạm vi.** Khoảng ở phần 2 là ngẫu nhiên, $\mu$ cố định: phát biểu nói về tỉ lệ các lần rút cho khoảng chứa $\mu$, không về xác suất của $\mu$ sau khi đã có một khoảng cụ thể.
:::

::: proof Chứng minh Hệ quả 05c.48
**Bước 1 (cận hai phía).** Định lý 05c.47 với mọi $M_i-m_i=M-m$ cho $V=n(M-m)^2$ và

$$
P(\lvert\bar X_n-\mu\rvert\ge\varepsilon)\le2\exp\Bigl(-\frac{2n\varepsilon^2}{(M-m)^2}\Bigr).
$$

**Bước 2 (cỡ mẫu).** Vế phải không vượt $\delta$ khi và chỉ khi $\frac{2n\varepsilon^2}{(M-m)^2}\ge\ln\frac2\delta$, tức (5.8).

**Bước 3 (khoảng tin cậy).** Với $\varepsilon=\varepsilon_n$, (5.8) thỏa với dấu bằng, nên $P(\lvert\bar X_n-\mu\rvert\ge\varepsilon_n)\le\delta$. Biến cố $\{\lvert\bar X_n-\mu\rvert<\varepsilon_n\}$ trùng biến cố "khoảng chứa $\mu$", và có xác suất ít nhất $1-\delta$ theo phần 2 của Mệnh đề 05c.2.

**Bước 4 (Chebyshev).** Giải $\sigma_1^2/(n\varepsilon^2)\le\delta$ theo $n$. $\square$
:::

Cỡ mẫu theo Hoeffding tăng theo $\ln(1/\delta)$, theo Chebyshev tăng theo $1/\delta$: đòi độ tin cậy cao hơn mười lần chỉ cộng thêm một lượng cố định vào (5.8) nhưng nhân cỡ mẫu Chebyshev lên mười lần. Cả hai tăng theo $1/\varepsilon^2$. Với biến Bernoulli, (5.8) trùng cỡ mẫu sau công thức (12.3) của Koller và Friedman (2009, mục 12.1.2, tr. 490–491).

**Trong học máy.** Câu hỏi mở đầu mục có đáp số từ Hệ quả 05c.48 với $[m,M]=[0,1]$: tập $1000$ ảnh cho $\varepsilon_{1000}=\sqrt{\ln40/2000}\approx0{,}043$, nên tỉ lệ lỗi đo được $0{,}08$ chỉ bảo đảm tỉ lệ lỗi thật trong $0{,}08\pm0{,}043$, tức $[0{,}037;\,0{,}123]$, với độ tin cậy $95\,\%$. Muốn độ lệch xuống $0{,}03$ cần $2050$ ảnh, theo phép tính của Ví dụ 05c.31 dưới đây. Tình huống 05c.2 áp hai phần của hệ quả cho một mô hình cụ thể.

::: example Ví dụ 05c.31 (Cỡ mẫu của một cuộc thăm dò)
**Dữ kiện.** Thăm dò $n$ người chọn ngẫu nhiên, độc lập; $X_i=1$ nếu người thứ $i$ ủng hộ một phương án, $X_i=0$ nếu không. Tỉ lệ ủng hộ thật $p$ chưa biết. Yêu cầu: $P(\lvert\bar X_n-p\rvert\ge0{,}03)\le0{,}05$.

**Chebyshev.** $\sigma_1^2=p(1-p)\le\tfrac14$ (Ví dụ 05c.22). Phần 3 của Hệ quả 05c.48 cần $n\ge\frac{0{,}25}{0{,}05\cdot0{,}0009}\approx5555{,}6$, tức $n\ge5556$.

**Hoeffding.** $[m,M]=[0,1]$. Phần 1 cần $n\ge\frac{\ln40}{2\cdot0{,}0009}\approx2049{,}4$, tức $n\ge2050$.

**Diễn giải.** Hoeffding cần khoảng $37\,\%$ số người so với Chebyshev cho cùng bảo đảm.

**Kiểm tra lại.** $\ln40\approx3{,}689$; $3{,}689/0{,}0018\approx2049{,}4$.
:::

### 5.6 So sánh các cận, xấp xỉ chuẩn và đuôi nặng

Ba cận của mục dùng ba mức thông tin khác nhau và có phía khác nhau, nên việc chọn cận cho một bài toán cần so chúng trên cùng một phân phối. Ví dụ sau so ba cận với xác suất đúng của số mặt ngửa khi tung $100$ đồng xu.

::: example Ví dụ 05c.32 (Ba cận cho số mặt ngửa)
**Dữ kiện.** $n=100$ đồng xu cân đối độc lập; $S$ là số mặt ngửa, $\mathbb ES=50$, $\operatorname{Var}S=25$.

**Tính.** Markov dùng $\mathbb ES/k$ cho biến cố một phía $\{S\ge k\}$. Chebyshev dùng $25/(k-50)^2$ cho biến cố hai phía $\{\lvert S-50\rvert\ge k-50\}$, chứa $\{S\ge k\}$. Cận mũ là (5.5) với $\varepsilon=(k-50)/100$, trùng (5.7) với $[m_i,M_i]=[0,1]$.

| Biến cố | Xác suất đúng | Markov | Chebyshev | Cận mũ |
|---|---:|---:|---:|---:|
| $S\ge60$ | $0{,}0284$ | $0{,}833$ | $0{,}25$ | $e^{-2}\approx0{,}135$ |
| $S\ge75$ | $2{,}82\cdot10^{-7}$ | $0{,}667$ | $0{,}04$ | $3{,}73\cdot10^{-6}$ |

**Diễn giải.** Cả ba cận đúng. Ở độ lệch $10$, ba cận cùng bậc độ lớn. Ở độ lệch $25$, cận mũ lớn hơn xác suất đúng khoảng $13$ lần, còn cận Chebyshev lớn hơn khoảng $1{,}4\cdot10^5$ lần.

**Kiểm tra lại.** $25/100=0{,}25$ và $25/625=0{,}04$; $2\cdot100\cdot0{,}1^2=2$.
:::

![Thang logarit theo ngưỡng k từ 55 đến 80 cho số mặt ngửa của 100 đồng xu. Bốn đường: Markov một phía gần 0,8 rồi giảm chậm; Chebyshev hai phía 0,25 tại k = 60 và 0,04 tại k = 75; cận mũ một phía 0,135 tại k = 60 và 3,7·10⁻⁶ tại k = 75; xác suất đúng 0,0284 tại k = 60, 2,8·10⁻⁷ tại k = 75 và 5,6·10⁻¹⁰ tại k = 80.](img/lec-05c/coin-tail-three-bounds.svg)

Hình vẽ bốn đại lượng của Ví dụ 05c.32 theo ngưỡng $k$ trên thang logarit. Xác suất đúng và cận mũ là hai đường cong cùng dạng, cách nhau một khoảng tăng chậm; cả hai giảm nhanh hơn mọi đa thức. Chebyshev giảm theo đa thức và Markov gần như nằm ngang.

Ở độ lệch nhỏ, cận mũ có thể lớn hơn cận Chebyshev. Với tần suất mặt ngửa của Ví dụ 05c.29 và $\varepsilon=0{,}1$, cận Hoeffding hai phía $2e^{-0{,}02n}$ bằng $0{,}736$ tại $n=50$ và $0{,}271$ tại $n=100$, lớn hơn cận Chebyshev $0{,}5$ và $0{,}25$. Trong vùng cả hai cận nhỏ hơn $1$, Hoeffding chỉ nhỏ hơn từ $n=108$.

Với đồng xu, phương sai $\tfrac14$ đã lớn nhất có thể trên $[0,1]$, nên khác biệt đến từ thừa số $2$ của cận hai phía và từ việc $e^{-2n\varepsilon^2}$ chỉ nhỏ hơn $\frac1{4n\varepsilon^2}$ khi $n\varepsilon^2$ đủ lớn.

Khi $n$ lớn, phân phối của trung bình mẫu có dạng gần Gauss. Nhận xét sau phát biểu điều đó và nêu vì sao chương không dùng nó cho bảo đảm.

::: remark Nhận xét 05c.49 (Định lý giới hạn trung tâm)
**Phát biểu.** Cho $X_1,X_2,\ldots$ i.i.d. với $\mu=\mathbb EX_1$ và $0<\sigma_1<\infty$. Định lý giới hạn trung tâm (central limit theorem) khẳng định với mọi $x$, $P\bigl(\sqrt n(\bar X_n-\mu)/\sigma_1\le x\bigr)$ hội tụ tới CDF của $\mathcal N(0,1)$ tại $x$ khi $n\to\infty$. Chứng minh nằm ngoài phạm vi chương (Koller và Friedman, 2009, Định lý A.2, tr. 1144; Wasserman, 2004, mục 5.4).

**Xấp xỉ.** Với $Z_0$ có phân phối $\mathcal N(0,1)$, $P(\lvert Z_0\rvert\ge1{,}96)\approx0{,}05$. Do đó $P(\lvert\bar X_n-\mu\rvert\ge\varepsilon)\approx0{,}05$ khi $\varepsilon\sqrt n/\sigma_1\approx1{,}96$, tức $n\approx(1{,}96\,\sigma_1/\varepsilon)^2$ (Goodfellow và cộng sự, 2016, công thức 5.47, tr. 128). Với cuộc thăm dò của Ví dụ 05c.31, $\sigma_1=\tfrac12$ và $\varepsilon=0{,}03$ cho $n\approx1068$.

**Giới hạn.** Đây là phát biểu giới hạn, dùng dấu $\approx$, không phải cận đúng với một $n$ hữu hạn. Vì vậy chương dùng nó để ước lượng bậc độ lớn, còn mọi bảo đảm dùng Hoeffding hoặc Chebyshev.
:::

Cả ba cận đều cần kỳ vọng hữu hạn, và Chebyshev cần thêm phương sai hữu hạn. Ví dụ kinh điển sau cho thấy điều gì xảy ra khi giả thiết đó không thỏa (Blitzstein và Hwang, 2019, chương 4).

::: example Ví dụ 05c.33 (Nghịch lý St. Petersburg)
**Dữ kiện.** Tung đồng xu cân đối tới lần đầu ra mặt ngửa, ở lần thứ $G$; người chơi nhận $2^G$ đơn vị. Theo Định nghĩa 05c.20, $G$ có phân phối hình học$(\tfrac12)$, $P(G=k)=2^{-k}$.

**Kỳ vọng.** Chuỗi $\sum_k2^k\cdot2^{-k}=\sum_k1$ phân kỳ, nên khoản nhận không có kỳ vọng theo Định nghĩa 05c.26. Nếu khoản nhận bị cắt ở $2^{20}$, tức nhận $\min(2^G,2^{20})$, kỳ vọng là $\sum_{k=1}^{20}1+2^{20}\cdot P(G>20)=20+1=21$.

**Diễn giải.** Định lý 05c.35 và Định lý 05c.41 không áp dụng cho khoản nhận không cắt: không có kỳ vọng nào để trung bình sau $n$ ván tập trung quanh. Với khoản nhận bị cắt, kỳ vọng $21$ hữu hạn nhưng phương sai lớn, khoảng $3{,}1\cdot10^6$, nên cận Chebyshev cần rất nhiều ván.

**Kiểm tra lại.** Biến cố $\{G>20\}$ là $20$ lần tung đầu đều sấp, có xác suất $2^{-20}$, nên phần cắt đóng góp đúng $1$.
:::

::: remark Nhận xét 05c.50 (Đuôi nặng, heavy tail)
Khi $\mathbb E\lvert X\rvert=\infty$ hoặc $\sigma_1^2=\infty$, Định lý 05c.35, Hệ quả 05c.40 và Định lý 05c.41 không áp dụng. Trong học máy, gradient của mất mát có thể có đuôi nặng khi dữ liệu có ngoại lai lớn; khi đó trung bình của gradient mẫu dao động mạnh hơn mức $\sigma_1/\sqrt b$ dự báo, và các kỹ thuật như cắt gradient (gradient clipping) đưa đại lượng về một khoảng bị chặn để các cận của mục áp dụng được, đổi lại một độ chệch so với gradient không cắt. Một dạng khác của cận Chernoff chặn sai lệch tương đối so với $p$ và hữu ích khi $p$ nhỏ (Koller và Friedman, 2009, Định lý A.4, tr. 1145); chương không dùng dạng đó.
:::

::: exercise Bài tập 05c.6 (Cỡ mẫu cho mất mát bị cắt)
Một mô hình có mất mát entropy chéo được cắt ở $5$, tức mất mát trên mỗi quan sát nằm trong $[0,5]$. Tập kiểm thử gồm $n$ quan sát i.i.d., tham số cố định.

1. Tính $n$ để mất mát trung bình lệch khỏi rủi ro kỳ vọng không quá $0{,}05$ với xác suất ít nhất $0{,}95$, theo Hệ quả 05c.48.
2. So với cỡ mẫu cho mất mát 0–1 cùng $\varepsilon$, $\delta$, và xác định độ rộng khoảng ảnh hưởng tới cỡ mẫu theo lũy thừa nào.
3. Với $n=10\,000$, tính nửa độ rộng khoảng tin cậy $95\,\%$ của rủi ro kỳ vọng.
:::

::: hint
Áp (5.8) với $M-m=5$, rồi với $M-m=1$; phần 2 của hệ quả cho $\varepsilon_n$.
:::

::: solution
**Câu 1.** $n\ge\frac{25\cdot\ln40}{2\cdot0{,}0025}$; vế phải xấp xỉ $18\,444{,}4$, nên $n\ge18\,445$.

**Câu 2.** Với $M-m=1$: $n\ge\frac{3{,}6889}{0{,}005}\approx737{,}8$, tức $n\ge738$. Tỉ số hai cỡ mẫu là $25=5^2$: cỡ mẫu tăng theo bình phương độ rộng khoảng.

**Câu 3.** $\varepsilon_{10\,000}=5\sqrt{3{,}6889/20\,000}$, tức khoảng $5\cdot0{,}01358\approx0{,}0679$.

**Kiểm tra lại.** Ở câu 3, thay $\varepsilon=0{,}0679$ vào (5.8) cho $n\approx\frac{25\cdot3{,}6889}{2\cdot0{,}00461}\approx10\,000$.
:::

**Chuỗi suy luận của mục.** Định lý 05c.39 là gốc. Áp nó cho $(X-\mu)^2$ cho Hệ quả 05c.40, và ghép với Định lý 05c.35 cho Định lý 05c.41. Áp nó cho $e^{\lambda X}$ cho Định lý 05c.43; Mệnh đề 05c.44 và Bổ đề 05c.46 biến cận đó thành Định lý 05c.47, với Định lý 05c.45 là trường hợp đồng xu. Hệ quả 05c.48 là đích: cỡ mẫu và khoảng tin cậy cho một kỳ vọng.

**Kết mục.** Với quan sát độc lập, bị chặn trong khoảng độ rộng $M-m$, trung bình mẫu lệch quá $\varepsilon$ với xác suất không quá $2e^{-2n\varepsilon^2/(M-m)^2}$ (Định lý 05c.47), và cỡ mẫu tăng theo $\ln(1/\delta)$ (Hệ quả 05c.48). Các kết quả nói về một lần ước lượng; SGD ước lượng lại gradient ở mọi bước. Mục 6 áp Mục 4, Mục 5 cho mất mát và gradient và trả lời hai câu hỏi còn lại.

## 6. Mất mát trung bình trên nhóm nhỏ

Hệ quả 05c.48 cho cỡ mẫu của một lần ước lượng, còn SGD ước lượng lại gradient ở mọi bước với chi phí tỉ lệ cỡ nhóm $b$. Với ngân sách $3000$ gradient mẫu trên tập $3000$ quan sát gồm $1000$ bản sao mỗi giá trị của ví dụ ba quan sát (Ví dụ 05c.39), một bước gradient đầy đủ để lại sai số bình phương $0{,}81$, còn $40$ bước với nhóm $75$ chỉ số để lại $0{,}0021$ theo kỳ vọng. Mục này dựng lại Định lý 05.11 từ các công cụ của chương và trả lời hai câu hỏi còn lại: trung bình hay tổng, và cỡ nhóm nào dưới ngân sách cố định.

### 6.1 Rủi ro thực nghiệm tại một tham số cố định

Mệnh đề 05.5 khẳng định mất mát trung bình trên một tập dữ liệu tách riêng, tại tham số cố định, là ước lượng không chệch của rủi ro kỳ vọng. Mất mát trung bình có cấu trúc của một cuộc thăm dò: mỗi quan sát trả lời bằng mất mát của nó, và với mất mát 0–1, tỉ lệ lỗi đo được là trung bình mẫu của Ví dụ 05c.22. Định nghĩa sau nhắc lại hai đại lượng theo ký hiệu của chương.

::: definition Định nghĩa 05c.51 (Rủi ro kỳ vọng và rủi ro thực nghiệm)
Cho tập các quan sát có thể, một phân phối sinh dữ liệu $\mathcal P$ trên tập đó, tham số $\theta\in\mathbb R^d$ và hàm mất mát $\ell(\theta;\xi)\ge0$.

**Rủi ro kỳ vọng.** $R(\theta)=\mathbb E\,\ell(\theta;\xi)$, với $\xi$ là một quan sát có phân phối $\mathcal P$.

**Rủi ro thực nghiệm.** Trên tập $N$ quan sát $\xi_1,\ldots,\xi_N$, rủi ro thực nghiệm (empirical risk) là $J(\theta)=\frac1N\sum_{i=1}^N\ell_i(\theta)$ với $\ell_i(\theta)=\ell(\theta;\xi_i)$.
:::

Định nghĩa 05c.51 là Định nghĩa 05.1 viết với $\mathcal P$ thay cho $P$ và với quan sát $\xi$ thay cho cặp đặc trưng–nhãn.

::: theorem Định lý 05c.52 (Rủi ro thực nghiệm tại một tham số cố định)
**Giả thiết.** Các quan sát $\xi_1,\ldots,\xi_N$ i.i.d. theo $\mathcal P$. Tham số $\theta$ cố định, không phụ thuộc các quan sát này. $\sigma_\ell^2(\theta)=\operatorname{Var}\ell(\theta;\xi)<\infty$.

**Kết luận.**

1. $\mathbb EJ(\theta)=R(\theta)$ và $\operatorname{Var}J(\theta)=\sigma_\ell^2(\theta)/N$.
2. Nếu thêm $\ell(\theta;\xi)\in[0,1]$ cho mọi $\xi$, thì với mọi $\varepsilon>0$,

$$
P\bigl(\lvert J(\theta)-R(\theta)\rvert\ge\varepsilon\bigr)\le2e^{-2N\varepsilon^2}.
\tag{6.1}
$$

**Điều kiện áp dụng.** Tham số phải được xác định trước khi nhìn các quan sát dùng để đánh giá.

**Phạm vi.** Với mất mát không bị chặn, chỉ còn kết luận 1. Định lý không nói gì về rủi ro của tham số học được từ chính các quan sát.
:::

::: proof Chứng minh Định lý 05c.52
**Bước 1 (các mất mát i.i.d.).** Với $\theta$ cố định, $\ell_i(\theta)=h(\xi_i)$ với hàm $h(\xi)=\ell(\theta;\xi)$ không phụ thuộc $i$. Mệnh đề 05c.24 với các khối một phần tử cho các $\ell_i(\theta)$ độc lập, và cùng phân phối vì các $\xi_i$ cùng phân phối. Mỗi $\ell_i(\theta)$ có kỳ vọng $R(\theta)$ và phương sai $\sigma_\ell^2(\theta)$.

**Bước 2 (kết luận 1).** Định lý 05c.35 với $X_i=\ell_i(\theta)$ và $n=N$.

**Bước 3 (kết luận 2).** Định lý 05c.47 với $[m_i,M_i]=[0,1]$ cho cận hai phía $2\exp(-2N^2\varepsilon^2/N)=2e^{-2N\varepsilon^2}$. $\square$
:::

::: example Ví dụ 05c.34 (Cỡ tập xác thực)
**Dữ kiện.** Mất mát 0–1, tham số cố định trước khi đánh giá, các quan sát xác thực i.i.d. theo $\mathcal P$. Yêu cầu: tỉ lệ lỗi đo được lệch khỏi tỉ lệ lỗi thật dưới $\varepsilon=0{,}01$ với xác suất ít nhất $0{,}95$.

**Hoeffding.** Mất mát nằm trong $[0,1]$, nên Hệ quả 05c.48 với $M-m=1$ cần $N\ge\ln(2/\delta)/(2\varepsilon^2)$. Với $\delta=0{,}05$, $\varepsilon=0{,}01$: $N\ge\frac{\ln40}{2\cdot10^{-4}}\approx18\,444{,}4$, tức $N\ge18\,445$.

**Chebyshev.** Hệ quả 05c.48 phần 3 cần $N\ge\sigma_\ell^2(\theta)/(\delta\varepsilon^2)$; với $\sigma_\ell^2(\theta)\le\tfrac14$: $N\ge\frac{0{,}25}{0{,}05\cdot10^{-4}}=50\,000$.

**Diễn giải.** Ước lượng tỉ lệ lỗi của một mô hình với sai số dưới $0{,}01$ cần khoảng $18\,500$ quan sát. Để phân biệt hai mô hình có tỉ lệ lỗi chênh $1$ điểm phần trăm, mỗi tỉ lệ cần sai số dưới $0{,}005$ đồng thời, và Mệnh đề 05c.7 trên hai biến cố cho $N\ge\ln80/(2\cdot0{,}005^2)\approx87\,640{,}5$, tức $N\ge87\,641$.

**Kiểm tra lại.** $2e^{-2\cdot18\,445\cdot10^{-4}}=2e^{-3{,}689}$, xấp xỉ $0{,}0500$.
:::

**Trong học máy.** Định lý 05c.52 là căn cứ của việc báo cáo tỉ lệ lỗi trên tập kiểm thử. Giả thiết "$\theta$ không phụ thuộc các quan sát" bị vi phạm khi đánh giá trên tập huấn luyện, nơi $J(\widehat\theta)$ thường nhỏ hơn $R(\widehat\theta)$ (Mệnh đề 05.2), và khi tập xác thực dùng để chọn mô hình, nơi giá trị của lựa chọn tốt nhất lệch về phía lạc quan (Mệnh đề 05.5). Tình huống 05c.2 sửa cận cho trường hợp thứ hai (Goodfellow và cộng sự, 2016, mục 5.3, tr. 121).

### 6.2 Gradient nhóm không chệch

Định lý 05.11 được chứng minh bằng tính tuyến tính và tính độc lập, hai công cụ Mục 3 và Mục 4 đã dựng cùng biến thể không hoàn lại. Ví dụ ba quan sát đã cho các con số: tại $\theta=1$, gradient nhóm có kỳ vọng $0=J'(1)$, phương sai $\tfrac8{3b}$ khi rút có hoàn lại (Ví dụ 05c.21) và $\tfrac23$ khi rút không hoàn lại hai chỉ số (Ví dụ 05c.23). Định lý sau phát biểu trường hợp tổng quát nhiều chiều.

::: theorem Định lý 05c.53 (Gradient nhóm nhỏ)
**Giả thiết.** Tập dữ liệu $\xi_1,\ldots,\xi_N$ cố định; $\theta\in\mathbb R^d$ cố định, không phụ thuộc nhóm đang rút; mọi $\ell_i$ khả vi tại $\theta$, $g_i=\nabla\ell_i(\theta)$, và

$$
\Sigma(\theta)=\frac1N\sum_{i=1}^N\bigl(g_i-\nabla J(\theta)\bigr)\bigl(g_i-\nabla J(\theta)\bigr)^T .
\tag{6.2}
$$

Gradient nhóm là $\widehat g=\frac1b\sum_{r=1}^bg_{I_r}$.

**Kết luận.**

1. Nếu $I_1,\ldots,I_b$ rút đều có hoàn lại, thì

$$
\mathbb E\widehat g=\nabla J(\theta),\qquad\operatorname{Cov}\widehat g=\frac{\Sigma(\theta)}b,\qquad\mathbb E\lVert\widehat g-\nabla J(\theta)\rVert^2=\frac{\operatorname{tr}\Sigma(\theta)}b .
\tag{6.3}
$$

2. Nếu $N\ge2$ và $I_1,\ldots,I_b$ là $b\le N$ chỉ số rút đều không hoàn lại, thì $\mathbb E\widehat g=\nabla J(\theta)$, còn hai đẳng thức sau của (6.3) nhân thêm $\frac{N-b}{N-1}$.

**Điều kiện áp dụng.** Phân phối đều của từng chỉ số cần cho kỳ vọng; tính độc lập, hoặc tính đối xứng của mô hình không hoàn lại, cần cho hiệp phương sai.

**Phạm vi.** Đích của ước lượng là $\nabla J$, gradient của rủi ro thực nghiệm, không phải $\nabla R$. Định lý nói về một bước tại một tham số cố định.
:::

::: proof Chứng minh Định lý 05c.53
**Bước 1 (một tọa độ).** Cố định tọa độ $j$. Theo Hệ quả 05c.25, các số $[g_{I_r}]_j$ i.i.d. với PMF (3.6), nên theo (4.2) có kỳ vọng $\frac1N\sum_i[g_i]_j=[\nabla J(\theta)]_j$ và phương sai $\frac1N\sum_i\bigl([g_i]_j-[\nabla J(\theta)]_j\bigr)^2=\Sigma_{jj}(\theta)$. Định lý 05c.35 cho $\mathbb E[\widehat g]_j=[\nabla J(\theta)]_j$ và $\operatorname{Var}[\widehat g]_j=\Sigma_{jj}(\theta)/b$.

**Bước 2 (hai tọa độ).** Với hai tọa độ $j$, $k$, khai triển hiệp phương sai của hai trung bình bằng tính tuyến tính:

$$
\operatorname{Cov}\bigl([\widehat g]_j,[\widehat g]_k\bigr)=\frac1{b^2}\sum_{r=1}^b\sum_{s=1}^b\operatorname{Cov}\bigl([g_{I_r}]_j,[g_{I_s}]_k\bigr).
$$

Với $r\ne s$, hai số hạng là hàm của hai chỉ số độc lập, nên hiệp phương sai bằng $0$ theo Mệnh đề 05c.24 và Mệnh đề 05c.32. Với $r=s$, (4.2) và (6.2) cho $\Sigma_{jk}(\theta)$. Còn lại $b$ số hạng, nên hiệp phương sai bằng $\Sigma_{jk}(\theta)/b$.

**Bước 3 (sai số bình phương).** $\mathbb E\lVert\widehat g-\nabla J(\theta)\rVert^2=\sum_j\operatorname{Var}[\widehat g]_j$, và theo Bước 1 tổng này bằng $\sum_j\Sigma_{jj}(\theta)/b=\operatorname{tr}\Sigma(\theta)/b$, theo Định lý 05c.28 và Bước 1.

**Bước 4 (không hoàn lại).** Mệnh đề 05c.36 với $v_i=[g_i]_j$ cho kỳ vọng và phương sai của tọa độ $j$. Áp nó cho $v_i=[g_i]_j+[g_i]_k$ cho phương sai của tổng hai tọa độ, và hiệp phương sai suy ra từ đẳng thức $\operatorname{Cov}(U,V)=\tfrac12\bigl(\operatorname{Var}(U+V)-\operatorname{Var}U-\operatorname{Var}V\bigr)$, hệ quả của Mệnh đề 05c.33. Mỗi số hạng mang cùng hệ số $\frac{N-b}{N-1}$. $\square$
:::

Định lý 05c.53 là Định lý 05.11 cộng biến thể không hoàn lại của Nhận xét 05.13, viết với số chiều $d$ thay cho $p$ của Bài 05. Bỏ giả thiết phân phối đều làm mất tính không chệch: tại $\theta=1$, nếu chỉ số $3$ được chọn với xác suất $\tfrac12$ và hai chỉ số còn lại với xác suất $\tfrac14$, kỳ vọng của gradient một mẫu là $\tfrac14\cdot2+\tfrac14\cdot0+\tfrac12\cdot(-2)=-\tfrac12\ne0$.

**Trong học máy.** Kết luận 1 là lý do bộ tối ưu dùng được $\widehat g$ thay cho $\nabla J$. Khi mỗi quan sát trong nhóm là một lần rút mới từ $\mathcal P$ chưa từng được dùng, cùng lập luận cho ước lượng không chệch của $\nabla R$, điều chỉ đúng trong lượt đầu qua dữ liệu (Goodfellow và cộng sự, 2016, mục 8.1.3, tr. 280–281).

### 6.3 Cận xác suất cho sai số gradient nhóm

Định lý 05c.53 cho sai số bình phương trung bình. Một bước SGD cụ thể cần biết xác suất gradient nhóm lệch xa gradient đầy đủ. Ví dụ sau so hai cận của Mục 5 với xác suất đúng trên ví dụ ba quan sát.

::: example Ví dụ 05c.35 (Hai cận cho gradient nhóm)
**Dữ kiện.** Ví dụ ba quan sát tại $\theta=1$: gradient mẫu $2$, $0$, $-2$, nằm trong $[-2,2]$, với phương sai $\sigma_1^2=\tfrac83$; $J'(1)=0$. Nhóm rút có hoàn lại, cần thiết vì $b>N=3$. Xét biến cố $\{\lvert\widehat g\rvert\ge1\}$.

**Cận.** Chebyshev (Hệ quả 05c.40) với phương sai $\tfrac8{3b}$: $\tfrac8{3b}$. Hoeffding (Định lý 05c.47) với độ rộng $4$: $2\exp(-2b^2/(16b))=2e^{-b/8}$. Xác suất đúng tính bằng cách đếm $3^b$ dãy theo tổng.

| $b$ | Xác suất đúng | Chebyshev | Hoeffding |
|---:|---:|---:|---:|
| $4$ | $0{,}370$ | $0{,}667$ | $1{,}21$ |
| $16$ | $0{,}0199$ | $0{,}167$ | $0{,}271$ |
| $32$ | $6{,}2\cdot10^{-4}$ | $0{,}0833$ | $0{,}0366$ |
| $64$ | $8{,}1\cdot10^{-7}$ | $0{,}0417$ | $6{,}7\cdot10^{-4}$ |

**Diễn giải.** Cả hai cận lỏng. Trong vùng cả hai nhỏ hơn $1$, Hoeffding nhỏ hơn Chebyshev từ $b=23$, và khoảng cách tăng theo hàm mũ.

**Kiểm tra lại.** Với $b=4$, $\widehat g=\tfrac12\sum_ru_r$ với $u_r\in\{1,0,-1\}$; biến cố $\lvert\widehat g\rvert\ge1$ là $\lvert\sum_ru_r\rvert\ge2$, gồm $30$ trong $81$ dãy, tức $0{,}370$.
:::

Gradient có $d$ tọa độ, và một bước SGD tốt cần mọi tọa độ đều gần đúng. Hệ quả sau ghép Định lý 05c.47 cho từng tọa độ với Mệnh đề 05c.7 trên các tọa độ.

::: corollary Hệ quả 05c.54 (Cỡ nhóm cho sai số đồng thời trên mọi tọa độ)
**Giả thiết.** Như kết luận 1 của Định lý 05c.53, thêm: mọi tọa độ của mọi gradient mẫu nằm trong một khoảng độ rộng $w$, tức $[g_i]_j\in[m_j,m_j+w]$ cho mọi $i$, $j$. Cho $\varepsilon>0$, $\delta\in(0,1)$.

**Kết luận.** Nếu

$$
b\ge\frac{w^2\ln(2d/\delta)}{2\varepsilon^2},
\tag{6.4}
$$

thì với xác suất ít nhất $1-\delta$, mọi tọa độ thỏa $\bigl\lvert[\widehat g]_j-[\nabla J(\theta)]_j\bigr\rvert<\varepsilon$.

**Điều kiện áp dụng.** Như Định lý 05c.47 cho từng tọa độ; không cần tính độc lập giữa các tọa độ.

**Phạm vi.** Cận cho một bước tại một tham số. Bảo đảm đồng thời cho $K$ bước cần thay $\delta$ bằng $\delta/K$ theo Mệnh đề 05c.7.
:::

::: proof Chứng minh Hệ quả 05c.54
**Bước 1 (một tọa độ).** Theo Hệ quả 05c.25, các $[g_{I_r}]_j$ độc lập, nằm trong khoảng độ rộng $w$, với kỳ vọng $[\nabla J(\theta)]_j$. Định lý 05c.47 cho xác suất tọa độ $j$ lệch từ $\varepsilon$ trở lên không vượt $2e^{-2b\varepsilon^2/w^2}$.

**Bước 2 (mọi tọa độ).** Biến cố "có ít nhất một tọa độ lệch" là hợp của $d$ biến cố ở Bước 1. Mệnh đề 05c.7 cho xác suất không vượt $2de^{-2b\varepsilon^2/w^2}$, và đại lượng này không vượt $\delta$ khi và chỉ khi (6.4) đúng. Phần bù cho kết luận. $\square$
:::

Số chiều $d$ đi vào cỡ nhóm qua $\ln d$: tăng số tham số từ $10^3$ lên $10^6$ làm thừa số logarit $\ln(2d/\delta)$ tăng thêm $\ln1000\approx6{,}9$. Cái giá của cận đồng thời là thừa số $\ln(2d/\delta)$ thay cho $\ln(2/\delta)$ của Hệ quả 05c.48.

::: example Ví dụ 05c.36 (Gradient hồi quy logistic trên nhiều tọa độ)
**Dữ kiện.** Hồi quy logistic với nhãn $y_i\in\{-1,+1\}$, vectơ đặc trưng $a_i\in[-1,1]^d$ và mất mát $\ell_i(\theta)=\ln\bigl(1+\exp(-y_ia_i^T\theta)\bigr)$ (Định nghĩa 01.8). Yêu cầu: $d=1000$, $\varepsilon=0{,}1$, $\delta=0{,}05$.

**Chặn gradient.** Đạo hàm cho $\nabla\ell_i(\theta)=-y_i\,a_i\,s_i$ với $s_i=\frac1{1+\exp(y_ia_i^T\theta)}\in(0,1)$. Vì $\lvert y_i\rvert=1$ và $\lvert[a_i]_j\rvert\le1$, mọi tọa độ nằm trong $(-1,1)$, nên $w=2$.

**Áp dụng Hệ quả 05c.54.** $b\ge\frac{4\ln(40\,000)}{2\cdot0{,}01}=200\ln(40\,000)$; với $\ln(40\,000)\approx10{,}597$, vế phải xấp xỉ $2119{,}3$, nên $b\ge2120$.

**Diễn giải.** Để cả $1000$ tọa độ gradient nhóm cùng sai dưới $0{,}1$ với xác suất $0{,}95$, cận cần khoảng hai nghìn quan sát mỗi nhóm. Cận dùng độ rộng $2$; khi phương sai thật của các tọa độ nhỏ hơn nhiều so với $(w/2)^2=1$, cỡ nhóm cần thật sự nhỏ hơn.

**Kiểm tra lại.** $2\cdot1000\cdot e^{-2\cdot2120\cdot0{,}01/4}=2000e^{-10{,}6}$, xấp xỉ $0{,}0498\le0{,}05$.
:::

### 6.4 Mất mát trung bình và mất mát tổng

Mất mát trên nhóm có thể được cộng thay vì lấy trung bình; khi đó gradient nhóm dạng tổng bằng $b\,\widehat g$. Ý tưởng trực giác, chưa phải phát biểu: với mất mát tổng, bước học $\eta$ tác dụng như bước $\eta b$ với mất mát trung bình, nên ngưỡng bước an toàn phụ thuộc $b$.

::: example Ví dụ 05c.37 (Mất mát tổng trên ví dụ ba quan sát)
**Dữ kiện.** Ví dụ ba quan sát: $g_i(\theta)=\theta-y_i$, $y=(-1,1,3)$, $J'(\theta)=\theta-1$, nên $J''=1$ và hằng số Lipschitz của $J'$ là $L=1$. Nhóm $b$ chỉ số rút có hoàn lại; bước $\eta=0{,}1$.

**Cập nhật với mất mát tổng.** Gradient nhóm dạng tổng là $\sum_r(\theta-y_{I_r})=b(\theta-1)-\sum_r(y_{I_r}-1)$, nên

$$
\theta^+-1=(1-0{,}1b)(\theta-1)+0{,}1\sum_{r=1}^b(y_{I_r}-1).
$$

**Hệ số của phần tất định.** $1-0{,}1b$ bằng $0{,}9$ khi $b=1$, $0{,}6$ khi $b=4$, $0$ khi $b=10$, $-0{,}6$ khi $b=16$, $-1$ khi $b=20$ và $-2{,}2$ khi $b=32$.

**Diễn giải.** Phần tất định co khi $\lvert1-0{,}1b\rvert<1$, tức $b<20$; với $b>20$, $\lvert\theta-1\rvert$ bị nhân với một số lớn hơn $1$ ở mỗi bước và phần tất định phân kỳ. Với mất mát trung bình, hệ số là $1-0{,}1=0{,}9$ với mọi $b$.

**Kiểm tra lại.** Với $b=1$, mất mát tổng và mất mát trung bình trùng nhau và cùng cho hệ số $0{,}9$.
:::

![Hệ số co của phần tất định theo cỡ nhóm b từ 1 đến 32. Với mất mát tổng, hệ số 1 − 0,1b giảm tuyến tính, bằng 0 tại b = 10 khi ηb = 1/L, bằng −1 tại b = 20 khi ηbL = 2, và bằng −2,2 tại b = 32, ra khỏi dải trị tuyệt đối nhỏ hơn 1. Với mất mát trung bình, hệ số là đường ngang 0,9.](img/lec-05c/sum-vs-mean-contraction.svg)

Hình vẽ hai hệ số theo $b$ cùng dải nơi trị tuyệt đối của hệ số nhỏ hơn $1$, tức nơi phần tất định co. Đường mất mát tổng cắt mép dưới của dải tại $b=20$; đường mất mát trung bình nằm ngang trong dải.

::: proposition Mệnh đề 05c.55 (Mất mát tổng và mất mát trung bình)
**Giả thiết.** $J$ có gradient $L$-Lipschitz; $\widehat g$ là gradient nhóm của Định lý 05c.53. Đặt $\widetilde J=NJ$, mất mát tổng trên dữ liệu, và $\widetilde g=b\,\widehat g$, gradient nhóm dạng tổng.

**Kết luận.**

1. Một bước độ dài $\eta$ theo $\widetilde g$ trùng một bước độ dài $\eta b$ theo $\widehat g$.
2. $\nabla\widetilde J$ là $NL$-Lipschitz, nên điều kiện bước $\eta\le1/L$ của Bổ đề 04.20 áp cho $\widetilde J$ thành $\eta\le1/(NL)$.
3. Với gradient nhóm dạng tổng, phần tất định $\mathbb E[\theta-\eta\widetilde g]$ là một bước hạ gradient trên $J$ với độ dài $\eta b$, nên cùng điều kiện thành $\eta\le1/(bL)$.
4. Trong trường hợp vô hướng, $\operatorname{Var}\widetilde g=b\,\sigma_1^2$ tăng theo $b$, trong khi $\operatorname{Var}\widehat g=\sigma_1^2/b$.

**Điều kiện áp dụng.** Kết luận 3, 4 cần giả thiết của Định lý 05c.53.

**Phạm vi.** Mệnh đề nói về điều kiện ổn định; nó không xác định bước tốt nhất, vì sai số giới hạn ở Mục 6.6 phụ thuộc cả $\eta$ lẫn $b$.
:::

::: proof Chứng minh Mệnh đề 05c.55
**Bước 1 (kết luận 1).** $\theta-\eta\widetilde g=\theta-(\eta b)\widehat g$.

**Bước 2 (kết luận 2).** $\lVert\nabla\widetilde J(\theta)-\nabla\widetilde J(\theta')\rVert=N\lVert\nabla J(\theta)-\nabla J(\theta')\rVert\le NL\lVert\theta-\theta'\rVert$.

**Bước 3 (kết luận 3).** Theo Bước 1 và Định lý 05c.53, $\mathbb E[\theta-\eta\widetilde g]=\theta-\eta b\nabla J(\theta)$, một bước hạ gradient trên $J$ với độ dài $\eta b$; điều kiện $\eta b\le1/L$ cho $\eta\le1/(bL)$.

**Bước 4 (kết luận 4).** Phần 2 của Mệnh đề 05c.31 với $a=b$ và Định lý 05c.35: $\operatorname{Var}(b\widehat g)=b^2\sigma_1^2/b=b\sigma_1^2$. $\square$
:::

Mệnh đề 05c.55 trả lời câu hỏi "Trung bình hay tổng". Với mất mát trung bình, điều kiện ổn định $\eta\le1/L$ không phụ thuộc $b$, $N$, và phương sai giảm theo $1/b$; với mất mát tổng, mỗi lần đổi cỡ nhóm hay cỡ dữ liệu phải chỉnh lại bước học. Ở Ví dụ 05c.37, mốc $b=10$ ứng với $\eta b=1/L$ và mốc $b=20$ ứng với $\eta bL=2$.

**Trong học máy.** Khi mất mát được lấy trung bình trên nhóm, bước học chọn ở một cỡ nhóm vẫn thỏa điều kiện ổn định khi đổi cỡ nhóm, theo kết luận 2, 3 của Mệnh đề 05c.55. Bước tốt nhất vẫn có thể phụ thuộc $b$: Mục 6.6 cho thấy sai số giới hạn tỉ lệ $\eta/b$. Chương không nêu quy tắc chỉnh $\eta$ theo $b$ vì các nguồn của học phần không chứng minh quy tắc nào.

### 6.5 Hiệu suất giảm dần theo cỡ nhóm

Câu hỏi "Cỡ nhóm" bắt đầu từ nhận xét của Goodfellow và cộng sự ở Mục 1.1: $10\,000$ mẫu tốn gấp $100$ lần $100$ mẫu nhưng chỉ giảm sai số chuẩn $10$ lần. Theo Định lý 05c.35, sai số chuẩn của $\widehat g$ tỉ lệ với $1/\sqrt b$ trong khi chi phí tỉ lệ với $b$. Trên ví dụ ba quan sát tại $\theta=1$, sai số chuẩn $\sqrt{8/(3b)}$ bằng:

- $1{,}633$; $0{,}816$; $0{,}408$ với $b=1,4,16$, đúng bảng của Ví dụ 05.13;
- $0{,}163$ với $b=100$ và $0{,}0163$ với $b=10\,000$.

![Hai khung theo b trên thang logarit từ 1 đến 10 000. Khung trái: sai số chuẩn √(8/(3b)) giảm từ 1,63 tại b = 1 xuống 0,163 tại b = 100 và 0,0163 tại b = 10 000. Khung phải: chi phí tương đối b tăng tuyến tính. Chú thích: tăng b từ 1 lên 100 nhân chi phí với 100 và chia sai số chuẩn cho 10.](img/lec-05c/stderr-and-cost-vs-b.svg)

Hai khung của hình đặt cạnh nhau hai đại lượng theo $b$ trên thang logarit: sai số chuẩn có độ dốc $-\tfrac12$, chi phí có độ dốc $1$.

Sai số của gradient nhóm phụ thuộc $b$ và $\Sigma(\theta)$, không phụ thuộc $N$. Ví dụ sau đẩy nhận xét này tới trường hợp cực đoan mà Goodfellow và cộng sự (2016, mục 8.1.3, tr. 278) nêu: dữ liệu gồm nhiều bản sao.

::: example Ví dụ 05c.38 (Dữ liệu lặp)
**Dữ kiện.** Tập $N=3\nu$ quan sát gồm $\nu$ bản sao của mỗi giá trị $-1$, $1$, $3$; mô hình hằng, mất mát bình phương như ví dụ ba quan sát.

**Tính.** Tỉ lệ ba giá trị không đổi, nên $J$, $\nabla J$ và PMF (3.6) của gradient mẫu không phụ thuộc $\nu$; tại $\theta=1$, $\sigma_1^2=\tfrac83$. Với $\nu=10^6$ và $b=30$, gradient nhóm có sai số chuẩn $\sqrt{8/90}\approx0{,}298$ với chi phí $30C$, trong khi gradient đầy đủ tốn $3\cdot10^6C$.

**Diễn giải.** Gradient đầy đủ trên ba triệu quan sát không chứa thêm thông tin nào so với trên ba quan sát, nhưng tốn gấp một triệu lần.

**Kiểm tra lại.** $8/90\approx0{,}0889$ và $\sqrt{0{,}0889}\approx0{,}298$.
:::

::: proposition Mệnh đề 05c.56 (Hiệu suất giảm dần)
**Giả thiết.** Như kết luận 1 của Định lý 05c.53, trường hợp vô hướng, với phương sai gradient một mẫu $\sigma_1^2$; một gradient mẫu tốn $C$.

**Kết luận.** Gradient nhóm có sai số chuẩn $\sigma_1/\sqrt b$ và chi phí $bC$. Nhân $b$ với $k^2$ nhân chi phí với $k^2$ và chia sai số chuẩn cho $k$.

**Điều kiện áp dụng.** Chi phí tỉ lệ với số gradient mẫu, không tính song song.

**Phạm vi.** Mệnh đề so sánh một bước; nó chưa tính lợi ích của việc dùng chi phí tiết kiệm được cho thêm bước.
:::

::: proof Chứng minh Mệnh đề 05c.56
Định lý 05c.35 với $n=b$ cho sai số chuẩn $\sigma_1/\sqrt b$; thay $b$ bằng $k^2b$ được $\sigma_1/(k\sqrt b)$. $\square$
:::

### 6.6 Cỡ nhóm dưới ngân sách tính toán cố định

Mệnh đề 05c.56 so một bước. Với ngân sách $B_{\rm tot}$ gradient mẫu, cỡ nhóm $b$ cho $K=\lfloor B_{\rm tot}/b\rfloor$ bước. Định lý 05c.53 cần tham số cố định, còn $\theta_k$ phụ thuộc mọi nhóm trước; thuật toán sau ghi điều kiện thay thế, nhóm ở mỗi bước rút mới.

::: algorithm Thuật toán 05c.1 (SGD với nhóm nhỏ rút mới)
**Đầu vào.** Điểm đầu $\theta_0$; bước học $\eta>0$; cỡ nhóm $b$; ngân sách $B_{\rm tot}$ gradient mẫu.

**Khởi tạo.** $K=\lfloor B_{\rm tot}/b\rfloor$.

**Các bước.** Với $k=0,1,\ldots,K-1$:

1. Rút nhóm $I^{(k)}_1,\ldots,I^{(k)}_b$ đều có hoàn lại, độc lập với mọi nhóm trước.
2. Tính $\widehat g_k=\frac1b\sum_{r=1}^b\nabla\ell_{I^{(k)}_r}(\theta_k)$.
3. Cập nhật $\theta_{k+1}=\theta_k-\eta\,\widehat g_k$.

**Đầu ra.** $\theta_K$.

**Chi phí.** Mỗi bước tốn $bC$; tổng chi phí $KbC\le B_{\rm tot}C$.
:::

Mệnh đề sau tính chính xác sai số bình phương trung bình của Thuật toán 05c.1 trên ví dụ ba quan sát. Nó dùng Định lý 05c.53 tại tham số hiện tại và Mệnh đề 05c.38 để chuyển từ tham số cố định sang tham số ngẫu nhiên.

::: proposition Mệnh đề 05c.57 (Sai số bình phương trung bình của SGD trên ví dụ ba quan sát)
**Giả thiết.** Ví dụ ba quan sát, $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, $\sigma_1^2=\tfrac83$. Thuật toán 05c.1 với $\theta_0$ cố định, $0<\eta<2$ và cỡ nhóm $b$. Đặt $a_k=\mathbb E(\theta_k-1)^2$.

**Kết luận.**

$$
a_{k+1}=(1-\eta)^2a_k+\frac{\eta^2\sigma_1^2}b,
\tag{6.5}
$$

và với $\bar a_b=\dfrac{\eta\sigma_1^2}{b(2-\eta)}$,

$$
a_k=(1-\eta)^{2k}\bigl(a_0-\bar a_b\bigr)+\bar a_b .
\tag{6.6}
$$

**Điều kiện áp dụng.** Cần nhóm ở mỗi bước rút mới, độc lập với lịch sử, và $0<\eta<2$ để $(1-\eta)^2<1$.

**Phạm vi.** Kết quả chính xác cho hàm bậc hai một chiều có độ cong $1$; với hàm tổng quát, các định lý của Bài 05b cho cận trên cùng dạng.
:::

::: proof Chứng minh Mệnh đề 05c.57
**Bước 1 (phân tích một bước).** Gradient mẫu tại $\theta_k$ là $\theta_k-y_i=(\theta_k-1)-(y_i-1)$, nên $\widehat g_k=(\theta_k-1)-\zeta_k$ với $\zeta_k=\frac1b\sum_r(y_{I^{(k)}_r}-1)$, trung bình của các giá trị $-2$, $0$, $2$. Cập nhật cho

$$
\theta_{k+1}-1=(1-\eta)(\theta_k-1)+\eta\,\zeta_k .
$$

**Bước 2 (tính chất của nhiễu).** $\zeta_k$ chỉ phụ thuộc nhóm thứ $k$ và là trung bình của $b$ biến i.i.d. đều trên $\{-2,0,2\}$, nên theo Định lý 05c.35 có kỳ vọng $0$ và phương sai $\sigma_1^2/b$. $\theta_k$ là hàm của các nhóm trước, nên độc lập với nhóm thứ $k$, và do đó với $\zeta_k$, theo Mệnh đề 05c.24.

**Bước 3 (lấy kỳ vọng).** Bình phương Bước 1:

$$
(\theta_{k+1}-1)^2=(1-\eta)^2(\theta_k-1)^2+2\eta(1-\eta)(\theta_k-1)\zeta_k+\eta^2\zeta_k^2 .
$$

Số hạng giữa có kỳ vọng $2\eta(1-\eta)\,\mathbb E(\theta_k-1)\,\mathbb E\zeta_k=0$ theo Mệnh đề 05c.32 và Bước 2; số hạng cuối có kỳ vọng $\eta^2\sigma_1^2/b$. Định lý 05c.28 cho (6.5).

**Bước 4 (giải đệ quy).** $\bar a_b$ là điểm bất động của (6.5): $\bar a_b\bigl(1-(1-\eta)^2\bigr)=\eta^2\sigma_1^2/b$ và $1-(1-\eta)^2=\eta(2-\eta)$. Trừ hai đẳng thức $a_{k+1}=(1-\eta)^2a_k+\eta^2\sigma_1^2/b$ và $\bar a_b=(1-\eta)^2\bar a_b+\eta^2\sigma_1^2/b$ cho $a_{k+1}-\bar a_b=(1-\eta)^2(a_k-\bar a_b)$, và quy nạp cho (6.6). $\square$
:::

Công thức (6.6) tách sai số thành sai số của điểm đầu, co theo hàm mũ của số bước, và sàn nhiễu $\bar a_b$, không giảm theo số bước nhưng tỉ lệ nghịch với $b$. Với $\eta=0{,}1$, $\bar a_b=\frac{0{,}1\cdot8/3}{1{,}9\,b}=\frac8{57b}$, xấp xỉ $\frac{0{,}1404}b$. Ví dụ 05.14 của Bài 05 dẫn cùng đệ quy; Bài tập 05c.4 là bước đầu với $a_0=1$, $b=1$, cho $a_1\approx0{,}8367$.

::: example Ví dụ 05c.39 (Sai số dưới ngân sách cố định)
**Dữ kiện.** Tập dữ liệu lặp $N=3000$ quan sát, $1000$ bản sao mỗi giá trị $-1$, $1$, $3$, để $b$ chạy tới $3000$; theo Ví dụ 05c.38, phân phối của gradient nhóm không đổi. Thuật toán 05c.1 với $\theta_0=0$, nên $a_0=1$, bước $\eta=0{,}1$; $K=\lfloor B_{\rm tot}/b\rfloor$. Theo (6.6), $a_K=0{,}81^K(1-\bar a_b)+\bar a_b$ với $\bar a_b=\tfrac8{57b}$. Quy ước $b=3000$ là một bước gradient đầy đủ không nhiễu, $a_1=0{,}81$.

**Tính.**

| $b$ | $K$ khi $B_{\rm tot}=3000$ | $a_K$ khi $B_{\rm tot}=3000$ | $a_K$ khi $B_{\rm tot}=300$ |
|---:|---:|---:|---:|
| $1$ | $3000$ | $0{,}140$ | $0{,}140$ |
| $10$ | $300$ | $0{,}0140$ | $0{,}0158$ |
| $30$ | $100$ | $0{,}00468$ | $0{,}126$ |
| $75$ | $40$ | $0{,}00209$ | $0{,}432$ |
| $100$ | $30$ | $0{,}00320$ | $0{,}532$ |
| $300$ | $10$ | $0{,}122$ | $0{,}810$ |
| $1000$ | $3$ | $0{,}532$ | không đủ ngân sách |
| $3000$ | $1$ | $0{,}810$ | không đủ ngân sách |

**Diễn giải.** Với $B_{\rm tot}=3000$, cực tiểu trên mọi $b$ nguyên đạt tại $b=75$, với $K=40$ và $a_K\approx0{,}00209$; một bước gradient đầy đủ cho $0{,}810$, lớn hơn gần bốn trăm lần. Với $B_{\rm tot}=300$, cực tiểu đạt tại $b=10$. Nhóm quá nhỏ làm $a_K$ dừng ở sàn nhiễu $\bar a_b$ lớn; nhóm quá lớn để lại ít bước, và số hạng $0{,}81^K$ lớn.

**Kiểm tra lại.** Với $b=75$: $0{,}81^{40}\approx2{,}2\cdot10^{-4}$ và $\bar a_{75}=\tfrac8{4275}\approx0{,}00187$, nên $a_{40}\approx2{,}2\cdot10^{-4}\cdot0{,}998+0{,}00187\approx0{,}00209$.
:::

![Hai đường dạng chữ U của a_K theo b, thang logarit ở cả hai trục, K bằng phần nguyên của ngân sách chia b. Đường liền, ngân sách 3000: 0,140 tại b = 1, đáy 0,00209 tại b = 75, 0,00320 tại b = 100, 0,810 tại b = 3000 là một bước gradient đầy đủ. Đường đứt, ngân sách 300: 0,140 tại b = 1, đáy 0,0158 tại b = 10, 0,810 tại b = 300.](img/lec-05c/budget-u-curve.svg)

Hình vẽ hai cột cuối của bảng theo $b$ trên thang logarit. Nhánh trái của mỗi chữ U là sàn nhiễu $\bar a_b$, đường thẳng độ dốc $-1$; nhánh phải là số hạng $0{,}81^K$ tăng nhanh khi $K$ giảm. Đáy dịch sang trái khi ngân sách giảm, vì với ít bước hơn, sai số điểm đầu chiếm phần lớn.

Ví dụ có ba hạn chế.

1. Bước $\eta$ cố định cho mọi $b$; hàm độ cong $1$ với $\eta=0{,}1$ mô hình một hướng có độ cong $0{,}1L$ của một bài toán nhiều chiều chạy với bước $1/L$. Trong chính bài toán một chiều này, bước $\eta=1$ đưa gradient đầy đủ tới nghiệm sau một bước.
2. Các nhóm rút có hoàn lại.
3. Chi phí chỉ đếm gradient mẫu, trong khi phần cứng tính song song $b$ gradient gần bằng thời gian một gradient khi $b$ chưa vượt mức song song (Goodfellow và cộng sự, 2016, mục 8.1.3, tr. 279; Nhận xét 05.15).

Định lý 05c.52 cho $J(\theta)$ lệch khỏi $R(\theta)$ cỡ $1/\sqrt N$ tại một tham số cố định. Nhận xét sau nêu hệ quả của độ lệch đó cho việc phân bổ tính toán.

::: remark Nhận xét 05c.58 (Phân tích của Bottou và Bousquet)
**Phân tích sai số.** Sai số dư của mô hình học được, lấy kỳ vọng theo tập huấn luyện, tách thành $\mathcal E=\mathcal E_{\rm app}+\mathcal E_{\rm est}+\mathcal E_{\rm opt}$: sai số xấp xỉ của lớp mô hình, sai số ước lượng do dữ liệu hữu hạn, và sai số tối ưu do cực tiểu hóa $J$ không chính xác (Sra, Nowozin và Wright, 2011, chương 13, công thức 13.2, tr. 354).

**Hệ quả cho tính toán.** Sai số ước lượng cùng bậc với độ lệch giữa $J$ và $R$. Khi ràng buộc chính là thời gian tính toán, giảm sai số tối ưu xuống dưới bậc của sai số ước lượng không cải thiện bậc của cận trên, và thời gian tiết kiệm được dùng để xử lý thêm quan sát (Sra, Nowozin và Wright, 2011, mục 13.2.3, tr. 354–355; mục 13.3.2, Bảng 13.2, tr. 362).

**Phạm vi.** Đây là phát biểu về bậc của cận trên tiệm cận, không về một lần chạy; Bảng 13.2 so bốn thuật toán, và SGD ở đó dùng một quan sát mỗi vòng.
:::

**Trong học máy.** Dưới ngân sách cố định, sai số có dạng chữ U theo $b$ với đáy ở $b\ll N$, vì sai số chuẩn chỉ giảm theo $1/\sqrt b$ (Mệnh đề 05c.56) còn số bước giảm theo $1/b$. Nhận xét 05c.58 thêm lý do thứ ba: $J$ chỉ ước lượng $R$ với sai số cỡ $1/\sqrt N$. Goodfellow và cộng sự (2016, mục 8.1.3, tr. 279–280) ghi nhận cỡ nhóm thực hành thường từ $32$ tới $256$, chọn theo bộ nhớ và mức song song của phần cứng.

### 6.7 Nhóm rút mới và các giả thiết của phân tích hội tụ

Các định lý hội tụ của SGD trong Bài 05b dùng hai giả thiết về gradient ngẫu nhiên, phát biểu theo lịch sử, tức các nhóm đã rút trước bước $k$. Theo ký hiệu của chương:

- **gradient không chệch có điều kiện:** kỳ vọng của $\widehat g_k$ khi biết lịch sử bằng $\nabla J(\theta_k)$;
- **phương sai bị chặn có điều kiện:** kỳ vọng của $\lVert\widehat g_k-\nabla J(\theta_k)\rVert^2$ khi biết lịch sử không vượt một hằng số $\sigma^2$.

Khi nhóm ở mỗi bước rút mới, độc lập với lịch sử, phần 4 của Mệnh đề 05c.38, với $Y$ là lịch sử và $I$ là nhóm thứ $k$, đưa kỳ vọng có điều kiện về kỳ vọng tại tham số cố định $\theta=\theta_k$. Định lý 05c.53 khi đó cho giả thiết thứ nhất, và cho giả thiết thứ hai với $\sigma^2=\sup_\theta\operatorname{tr}\Sigma(\theta)/b$ khi cận trên này hữu hạn.

::: remark Nhận xét 05c.59 (Ví dụ ba quan sát dưới các giả thiết của Bài 05b)
**Hằng số phương sai.** Ở ví dụ ba quan sát, $g_i(\theta)-J'(\theta)=1-y_i$ không phụ thuộc $\theta$, nên $\operatorname{tr}\Sigma(\theta)=\tfrac83$ với mọi $\theta$ và $\sigma^2=\tfrac8{3b}$.

**Sàn nhiễu.** Nhận xét 05.16 phát biểu lại định lý của Bài 05b cho hàm lồi mạnh: với hằng số lồi mạnh $\mu_{\rm c}$, gradient $L$-Lipschitz và $0<\eta\le1/L$, sai số bình phương trung bình bị chặn bởi $(1-\eta\mu_{\rm c})^k\lVert\theta_0-\theta^*\rVert^2+\eta\sigma^2/\mu_{\rm c}$. Ký hiệu $\mu_{\rm c}$ chỉ dùng trong nhận xét này; trong cả chương, $\mu$ là kỳ vọng. Ở ví dụ ba quan sát, $\mu_{\rm c}=L=1$.

- Với $\eta=0{,}1$, sàn nhiễu của cận là $\eta\sigma^2/\mu_{\rm c}=\tfrac{0{,}1\cdot8}{3b}$, tức $\tfrac4{15b}$.
- Giá trị giới hạn chính xác $\bar a_b=\tfrac8{57b}$ của Mệnh đề 05c.57 nhỏ hơn cận khoảng $1{,}9$ lần.
- Với $b=4$, hai số là $0{,}0351$ và $0{,}0667$.

**Markov.** Bài 05b dùng bất đẳng thức Markov để chuyển cận kỳ vọng thành cận xác suất; đó là Định lý 05c.39.
:::

Xáo trộn theo lượt phá giả thiết gradient không chệch có điều kiện khi điều kiện theo lịch sử trong lượt. Ở ví dụ ba quan sát với $b=1$, nếu quan sát đầu được rút là $y=-1$, quan sát thứ hai rút đều từ $\{1,3\}$, và kỳ vọng có điều kiện của gradient mẫu là $\theta-2$ thay cho $J'(\theta)=\theta-1$.

Mỗi nhóm riêng lẻ vẫn không chệch theo phân phối của riêng nó (Mục 4.2); chỉ khi biết các nhóm trước trong cùng lượt thì không.

Gradient nhóm là ước lượng không chệch của $\nabla R$ trong lượt đầu, khi mỗi quan sát là một lần rút mới từ $\mathcal P$; từ lượt thứ hai, nó trở thành ước lượng chệch của $\nabla R$ vì các quan sát được dùng lại (Goodfellow và cộng sự, 2016, mục 8.1.3, tr. 280–281).

::: exercise Bài tập 05c.7 (Một cỡ nhóm khác dưới cùng ngân sách)
**Dữ kiện.** Ví dụ 05c.39: ví dụ ba quan sát với tập lặp $N=3000$, $\theta_0=0$ nên $a_0=1$, $\eta=0{,}1$, ngân sách $B_{\rm tot}=3000$ gradient mẫu, $K=\lfloor B_{\rm tot}/b\rfloor$. Theo (6.6), $a_K=0{,}81^K(1-\bar a_b)+\bar a_b$ với $\bar a_b=\tfrac8{57b}$. Với $b=75$, $a_K\approx0{,}00209$.

1. Tính $a_K$ khi $b=50$ và so với $b=75$.
2. Xác định phần nào của (6.6) quyết định $a_K$ khi $b=50$, và giải thích vì sao tăng $b$ từ $50$ lên $75$ làm $a_K$ giảm.
:::

::: hint
Tính $K$, rồi $0{,}81^K$ và $\bar a_{50}$ riêng; so độ lớn hai số hạng.
:::

::: solution
**Câu 1.** $K=60$; $0{,}81^{60}\approx3{,}2\cdot10^{-6}$ và $\bar a_{50}=\tfrac8{2850}\approx0{,}00281$. Do đó $a_{60}\approx3{,}2\cdot10^{-6}+0{,}00281\approx0{,}00281$, lớn hơn $0{,}00209$ của $b=75$.

**Câu 2.** Với $b=50$, số hạng điểm đầu chỉ cỡ $10^{-6}$, nên $a_K$ gần bằng sàn nhiễu $\bar a_{50}$. Sàn nhiễu tỉ lệ $1/b$, nên tăng $b$ lên $75$ hạ sàn xuống $0{,}00187$; số hạng điểm đầu tăng lên $2{,}2\cdot10^{-4}$ vì $K$ giảm còn $40$, nhưng vẫn nhỏ hơn phần sàn đã giảm.

**Kiểm tra lại.** $\ln0{,}81\approx-0{,}2107$; $60\cdot(-0{,}2107)\approx-12{,}64$ và $e^{-12{,}64}\approx3{,}2\cdot10^{-6}$.
:::

**Chuỗi suy luận của mục.** Định nghĩa 05c.51 và Định lý 05c.52 áp Định lý 05c.35 và Định lý 05c.47 cho mất mát. Định lý 05c.53 áp chúng cho gradient, và Hệ quả 05c.54 thêm Mệnh đề 05c.7 cho mọi tọa độ. Mệnh đề 05c.55 trả lời câu hỏi "Trung bình hay tổng"; Mệnh đề 05c.56, Thuật toán 05c.1 và Mệnh đề 05c.57, với Mệnh đề 05c.38 làm cầu nối, trả lời câu hỏi "Cỡ nhóm".

**Kết mục.** Mất mát được lấy trung bình vì điều kiện bước không phụ thuộc $b$, $N$ và phương sai giảm theo $1/b$ (Mệnh đề 05c.55); nhóm nhỏ thay toàn bộ dữ liệu vì dưới ngân sách cố định sai số có đáy ở $b\ll N$ (Mệnh đề 05c.57). Mọi kết quả dựa trên giả thiết độc lập: quan sát i.i.d. và nhóm rút mới ở mỗi bước. Các tình huống dưới đây áp kết quả cho ba bài toán, hai trong đó vi phạm giả thiết này.

## Tình huống áp dụng và ứng dụng

::: application Tình huống 05c.1 (Chọn cỡ nhóm cho gradient hồi quy logistic)
**Bài toán và dữ liệu.** Huấn luyện hồi quy logistic trên $N=50\,000$ quan sát với $d=20$ đặc trưng đã chuẩn hóa vào $[-1,1]$, nhãn $y_i\in\{-1,+1\}$. Yêu cầu: ở mỗi bước, với xác suất ít nhất $0{,}99$, mọi tọa độ của gradient nhóm lệch khỏi gradient đầy đủ dưới $\varepsilon=0{,}1$. Cần chọn cỡ nhóm $b$.

**Mô hình hóa.** Tại tham số hiện tại $\theta_k$, gradient đầy đủ là $\nabla J(\theta_k)$, gradient nhóm là trung bình mẫu của $b$ gradient mẫu (Định lý 05c.53). Yêu cầu là biến cố "mọi tọa độ lệch dưới $\varepsilon$" có xác suất ít nhất $1-\delta$ với $\delta=0{,}01$.

**Kiểm giả thiết.**

1. Tham số cố định khi rút nhóm: $\theta_k$ xác định từ các nhóm trước, nhóm thứ $k$ rút mới (Thuật toán 05c.1); điều kiện theo lịch sử, phần 4 của Mệnh đề 05c.38 đưa về tham số cố định.
2. Độc lập: nhóm rút đều có hoàn lại (Hệ quả 05c.25).
3. Bị chặn: gradient mẫu là $\nabla\ell_i(\theta)=-y_i\,a_i\,s_i$ với $a_i\in[-1,1]^{20}$ là vectơ đặc trưng và $s_i=1/\bigl(1+\exp(y_ia_i^T\theta)\bigr)\in(0,1)$ (Ví dụ 05c.36), nên mọi tọa độ nằm trong $(-1,1)$, độ rộng $w=2$.

**Áp dụng Hoeffding.** Hệ quả 05c.54:

$$
\begin{aligned}
b&\ge\frac{4\ln(2\cdot20/0{,}01)}{2\cdot0{,}01}=200\ln4000\\
&\approx200\cdot8{,}294\approx1658{,}8,
\end{aligned}
$$

tức $b\ge1659$, khoảng $3{,}3\,\%$ dữ liệu.

**So với Chebyshev.** Hệ quả 05c.40 cho mỗi tọa độ cùng Mệnh đề 05c.7 trên $20$ tọa độ cần $b\ge20\varrho^2/(\delta\varepsilon^2)$, với $\varrho^2$ là một cận chung cho phương sai của mỗi tọa độ gradient một mẫu.

Chỉ dùng tính bị chặn, $\varrho^2=(w/2)^2=1$, nên $b\ge20/(0{,}01\cdot0{,}01)=200\,000$, lớn hơn cả $N$.

**Nhiều bước.** Để bảo đảm đồng thời cho $K=1000$ bước, Mệnh đề 05c.7 thay $\delta$ bằng $\delta/K=10^{-5}$: $b\ge200\ln(4\cdot10^6)\approx200\cdot15{,}20\approx3040{,}4$, tức $b\ge3041$. Số bước tăng $1000$ lần, cỡ nhóm chỉ tăng chưa tới hai lần.

**Diễn giải.** Hoeffding cho cỡ nhóm nhỏ hơn khoảng $120$ lần so với Chebyshev, vì phụ thuộc $\delta$ và số tọa độ qua logarit. Cỡ nhóm $1659$ là cận đủ, không phải cỡ cần thiết, vì cận chỉ dùng độ rộng $w=2$.

**Kiểm tra lại.** $2\cdot20\cdot e^{-1659\cdot0{,}01/2}=40e^{-8{,}295}$, xấp xỉ $0{,}0099\le0{,}01$.

**Giới hạn.** Yêu cầu sai số dưới $0{,}1$ ở mọi tọa độ mạnh hơn điều SGD cần: Mục 6.6 cho thấy SGD hội tụ tới một sàn nhiễu tỉ lệ $1/b$ cả khi gradient nhóm rất nhiễu.

**Dẫn ngược lý thuyết.** Định lý 05c.53 cho tính không chệch; Định lý 05c.47 và Mệnh đề 05c.7 qua Hệ quả 05c.54 cho cỡ nhóm; Hệ quả 05c.40 cho phép so sánh với Chebyshev; Mệnh đề 05c.38 cho phép áp kết quả tại tham số cố định cho từng bước.
:::

::: application Tình huống 05c.2 (Khoảng tin cậy cho độ chính xác và mẫu kiểm thử tương quan)
**Bài toán và dữ liệu.** Một mô hình phân loại đúng $1840$ trên $n=2000$ quan sát kiểm thử, độ chính xác đo được $0{,}92$. Cần một khoảng chứa độ chính xác thật với xác suất ít nhất $0{,}95$.

**Mô hình hóa.** $X_i=1$ nếu quan sát $i$ được phân loại đúng; độ chính xác đo được là $\bar X_n$, độ chính xác thật là $\mu=\mathbb EX_i$.

**Kiểm giả thiết.**

1. Tham số cố định: mô hình được huấn luyện trước, không chỉnh theo tập kiểm thử.
2. Độc lập cùng phân phối: các quan sát kiểm thử rút độc lập từ phân phối triển khai.
3. Bị chặn: $X_i\in[0,1]$.

**Áp dụng.** Phần 2 của Hệ quả 05c.48 với $\delta=0{,}05$:

$$
\varepsilon_{2000}=\sqrt{\frac{\ln40}{4000}}\approx0{,}0304,
$$

nên khoảng tin cậy $95\,\%$ là $[0{,}8896;\,0{,}9504]$. Chebyshev với $\sigma_1^2\le\tfrac14$ cho nửa độ rộng $0{,}05$; xấp xỉ của Nhận xét 05c.49 cho $1{,}96\sqrt{0{,}0736/2000}\approx0{,}0119$, một ước lượng bậc độ lớn, không phải bảo đảm.

**Chọn trong nhiều mô hình.** Nếu tập kiểm thử được dùng để chọn trong $50$ cấu hình, Mệnh đề 05c.7 thay $\delta$ bằng $\delta/50$ và cho $\varepsilon=\sqrt{\ln(2000)/4000}\approx0{,}0436$; một mô hình đạt $0{,}905$ không phân biệt được với mô hình đạt $0{,}92$.

**Khi giả thiết không thỏa: quan sát tương quan theo khối.** Giả sử $2000$ quan sát là $2000$ phút liên tiếp của một chuỗi cảm biến, và lỗi đến theo đợt: dữ liệu gồm $100$ khối $20$ phút liên tiếp, trong mỗi khối mô hình cùng đúng hoặc cùng sai, các khối độc lập, mỗi khối sai với xác suất $0{,}08$. Mỗi $X_i$ vẫn là Bernoulli$(0{,}92)$, nhưng hai quan sát cùng khối có hiệp phương sai $0{,}92\cdot0{,}08=0{,}0736$, nên giả thiết độc lập của Định lý 05c.47 không thỏa.

- Phương sai thật: $\bar X_n$ là trung bình của $100$ chỉ thị khối độc lập, nên theo Định lý 05c.35 có phương sai $0{,}0736/100=7{,}36\cdot10^{-4}$, gấp $20$ lần $0{,}0736/2000$. Sai số chuẩn là $0{,}0271$ thay cho $0{,}0061$.
- Xác suất sai lệch thật: số khối sai $Y$ có phân phối nhị thức$(100;0{,}08)$, và $\lvert\bar X_n-0{,}92\rvert\ge0{,}0304$ khi $Y\le4$ hoặc $Y\ge12$. Xác suất đó là $0{,}0903+0{,}1028\approx0{,}193$, gần bốn lần mức $0{,}05$ mà khoảng ở trên tuyên bố.
- Khoảng đúng: áp Hệ quả 05c.48 cho $100$ khối độc lập: $\varepsilon=\sqrt{\ln40/200}\approx0{,}136$.

**Diễn giải.** Với quan sát độc lập, độ chính xác thật nằm trong $0{,}92\pm0{,}030$ với độ tin cậy $95\,\%$. Với quan sát tương quan theo khối $20$, cùng con số $0{,}92$ chỉ cho $0{,}92\pm0{,}136$: số quan sát hiệu dụng là số khối, $100$, không phải $2000$.

**Kiểm tra lại.** $\ln40\approx3{,}689$; $3{,}689/4000\approx9{,}22\cdot10^{-4}$ và căn bậc hai là $0{,}0304$. Với $Y\le4$, tỉ lệ khối sai là $0{,}04$, không vượt $0{,}08-0{,}0304=0{,}0496$.

**Giới hạn.** Mô hình khối là giả định sư phạm; với chuỗi thời gian thật, độ dài phụ thuộc phải được ước lượng, chẳng hạn bằng cách coi các khối đủ dài là đơn vị độc lập.

**Dẫn ngược lý thuyết.** Mệnh đề 05c.32 cho phép bác bỏ giả thiết độc lập khi hiệp phương sai khác $0$; Hệ quả 05c.48 cho khoảng; Mệnh đề 05c.7 cho hiệu chỉnh khi chọn mô hình; Định lý 05c.35 và Mệnh đề 05c.21 cho phương sai và xác suất thật dưới mô hình khối.
:::

::: application Tình huống 05c.3 (Dữ liệu không xáo trộn: các nhóm liên tiếp không ngẫu nhiên)
**Bài toán và dữ liệu.** Tập lặp $N=3000$ của Ví dụ 05c.39: $1000$ bản sao mỗi giá trị $-1$, $1$, $3$, mô hình hằng, mất mát bình phương, nghiệm $\theta^*=1$. Dữ liệu được lưu theo thứ tự giá trị: $1000$ quan sát $-1$, rồi $1000$ quan sát $1$, rồi $1000$ quan sát $3$. Một chương trình cắt dữ liệu thành $30$ nhóm liên tiếp $b=100$ mà không xáo trộn, rồi chạy một lượt với $\theta_0=0$, $\eta=0{,}1$.

**Mô hình hóa.** Theo Bước 1 trong chứng minh Mệnh đề 05c.57, $\theta_{k+1}-1=0{,}9(\theta_k-1)+0{,}1\,\zeta_k$, với $\zeta_k$ là trung bình của $y-1$ trên nhóm $k$. Mười nhóm đầu cho $\zeta_k=-2$, mười nhóm giữa $\zeta_k=0$, mười nhóm cuối $\zeta_k=2$.

**Kiểm giả thiết.** Nhóm không được rút ngẫu nhiên: mỗi nhóm chỉ chứa một giá trị, nên giả thiết phân phối đều của Định lý 05c.53 không thỏa và $\zeta_k$ không có kỳ vọng $0$. Các nhóm liên tiếp không độc lập: biết nhóm $k$ chứa giá trị $-1$ gần như xác định nhóm $k+1$, nên điều kiện rút mới của Thuật toán 05c.1 và phần 4 của Mệnh đề 05c.38 không áp dụng.

**Tính.** Đặt $e_k=\theta_k-1$, $e_0=-1$, và dùng $0{,}9^{10}\approx0{,}3487$. Lặp đệ quy với $\zeta$ hằng trên mỗi đoạn mười bước cho $e_{k+10}=0{,}9^{10}e_k+(1-0{,}9^{10})\zeta$:

- sau mười nhóm giá trị $-1$: $e_{10}=0{,}3487\cdot(-1)+0{,}6513\cdot(-2)\approx-1{,}651$, tức $\theta_{10}\approx-0{,}651$;
- sau mười nhóm giá trị $1$: $e_{20}=0{,}3487\cdot(-1{,}651)\approx-0{,}576$, tức $\theta_{20}\approx0{,}424$;
- sau mười nhóm giá trị $3$: $e_{30}=0{,}3487\cdot(-0{,}576)+0{,}6513\cdot2\approx1{,}102$, tức $\theta_{30}\approx2{,}102$.

Sai số bình phương sau một lượt là $e_{30}^2\approx1{,}214$, lớn hơn sai số ban đầu $1$.

**So với nhóm rút mới.** Cùng $b=100$, $K=30$, Ví dụ 05c.39 cho $a_{30}\approx0{,}0032$. Sai số của dữ liệu không xáo trộn lớn hơn khoảng $380$ lần, và vì thứ tự lặp lại ở mọi lượt, tham số dao động theo chu kỳ thay vì hội tụ.

![Quỹ đạo của tham số theta qua 30 bước SGD với nhóm 100 quan sát, bước 0,1, xuất phát từ 0. Đường gấp khúc của dữ liệu không xáo trộn đi xuống tới khoảng −0,65 sau 10 bước, lên 0,42 sau 20 bước và 2,10 sau 30 bước, vượt xa nghiệm 1. Đường của nhóm rút mới là kỳ vọng 1 − 0,9 mũ k tăng đều về 1, kèm dải một độ lệch chuẩn rộng không quá 0,04.](img/lec-05c/sorted-vs-shuffled.svg)

Hình đặt hai quỹ đạo trên cùng trục. Với nhóm rút mới, kỳ vọng $1-0{,}9^k$ tiến đều về nghiệm và dải một độ lệch chuẩn, rộng $\sqrt{\bar a_{100}(1-0{,}81^k)}\le0{,}038$, gần như không thấy. Với dữ liệu không xáo trộn, tham số bị kéo lần lượt về $-1$, $1$, $3$, giá trị của nhóm đang dùng.

**Diễn giải.** Mỗi nhóm của dữ liệu không xáo trộn có sai số $2$, $0$ hoặc $-2$ không triệt tiêu; Định lý 05c.53 chỉ bảo đảm triệt tiêu theo kỳ vọng khi nhóm được rút ngẫu nhiên. Xáo trộn đầu mỗi lượt khôi phục tính ngẫu nhiên của từng nhóm (Mục 4.2) và đưa sai số về bậc của Ví dụ 05c.39.

**Kiểm tra lại.** Đệ quy từng bước cho $\theta_{10}=-0{,}6513$, $\theta_{20}=0{,}4242$, $\theta_{30}=2{,}1019$.

**Giới hạn.** Ví dụ cực đoan vì mỗi nhóm chỉ có một giá trị; dữ liệu thực thường chỉ sắp một phần, theo thời gian hay theo nguồn, với hậu quả nhẹ hơn nhưng cùng bản chất.

**Dẫn ngược lý thuyết.** Định lý 05c.53 và Mệnh đề 05c.57 nêu giả thiết bị vi phạm; Mệnh đề 05c.36 và Mục 4.2 cho tính không chệch của nhóm cắt từ một hoán vị ngẫu nhiên; Ví dụ 05c.39 cho mức so sánh.
:::

**Ứng dụng.** Các khái niệm của chương xuất hiện trong học máy ở những chỗ sau.

- **Bộ tối ưu ngẫu nhiên.** SGD, momentum và Adam dùng gradient nhóm; Định lý 05c.53 là giả thiết chung của các phân tích ở Bài 05b và Bài 06.
- **Đánh giá mô hình.** Tỉ lệ lỗi trên tập kiểm thử là trung bình mẫu; Định lý 05c.52 và Hệ quả 05c.48 cho cỡ tập và khoảng tin cậy, Mệnh đề 05c.7 cho hiệu chỉnh khi chọn trong nhiều mô hình.
- **Phân loại xác suất.** Công thức Bayes (Định lý 05c.11) là nền của bộ phân loại Bayes ngây thơ và của việc hiệu chỉnh xác suất khi tỉ lệ lớp thay đổi lúc triển khai.
- **Suy diễn dựa trên mẫu.** Buổi 12 của học phần, về mô hình đồ thị xác suất, ước lượng kỳ vọng bằng trung bình mẫu; Hệ quả 05c.48 cho cỡ mẫu tương ứng (Koller và Friedman, 2009, mục 12.1.2).

## Tóm tắt chương

**Định nghĩa và kết quả theo mục.**

- Mục 1: không gian xác suất (Định nghĩa 05c.1), quy tắc tính và đếm (Mệnh đề 05c.2, Mệnh đề 05c.4), nhóm có lặp (Mệnh đề 05c.6), bất đẳng thức hợp (Mệnh đề 05c.7).
- Mục 2: xác suất có điều kiện, công thức Bayes, độc lập (Định nghĩa 05c.8, Định lý 05c.11, Định nghĩa 05c.12); các lần rút có hoàn lại độc lập (Mệnh đề 05c.14).
- Mục 3: biến ngẫu nhiên, phân phối, độc lập của biến (Định nghĩa 05c.17, Định nghĩa 05c.20, Định nghĩa 05c.23); gradient mẫu của nhóm có hoàn lại là i.i.d. (Hệ quả 05c.25).
- Mục 4: tính tuyến tính (Định lý 05c.28), phương sai của tổng (Mệnh đề 05c.33), trung bình mẫu (Định lý 05c.35), không hoàn lại (Mệnh đề 05c.36), kỳ vọng toàn phần (Mệnh đề 05c.38).
- Mục 5: Markov, Chebyshev, luật số lớn yếu (Định lý 05c.39, Hệ quả 05c.40, Định lý 05c.41); Chernoff, Hoeffding (Định lý 05c.43, Bổ đề 05c.46, Định lý 05c.47); cỡ mẫu và khoảng tin cậy (Hệ quả 05c.48).
- Mục 6: rủi ro thực nghiệm (Định lý 05c.52), gradient nhóm (Định lý 05c.53, Hệ quả 05c.54), tổng và trung bình (Mệnh đề 05c.55), hiệu suất giảm dần (Mệnh đề 05c.56), SGD dưới ngân sách (Thuật toán 05c.1, Mệnh đề 05c.57).

**Công thức cần nhớ.** Trung bình mẫu và gradient nhóm:

$$
\mathbb E\bar X_n=\mu,\qquad\operatorname{Var}\bar X_n=\frac{\sigma_1^2}n,\qquad\operatorname{Cov}\widehat g=\frac{\Sigma(\theta)}b ;
$$

ba bất đẳng thức và cỡ mẫu Hoeffding:

$$
\begin{aligned}
P(Z\ge\varepsilon)&\le\frac{\mathbb EZ}\varepsilon,\\
P(\lvert X-\mu\rvert\ge t)&\le\frac{\operatorname{Var}X}{t^2},\\
P(\lvert\bar X_n-\mu\rvert\ge\varepsilon)&\le2e^{-2n\varepsilon^2/(M-m)^2},\\
n&\ge\frac{(M-m)^2\ln(2/\delta)}{2\varepsilon^2};
\end{aligned}
$$

sai số của SGD trên ví dụ ba quan sát:

$$
a_{k+1}=(1-\eta)^2a_k+\frac{\eta^2\sigma_1^2}b,\qquad\bar a_b=\frac{\eta\sigma_1^2}{b(2-\eta)} .
$$

**Giả thiết hay bị bỏ quên.**

- Mô hình đồng khả năng chỉ đúng khi mọi kết cục cùng khối lượng; $P(A\mid B)$ khác $P(B\mid A)$.
- Độc lập từng đôi chưa đủ cho độc lập; độc lập và độc lập có điều kiện không kéo theo nhau.
- Kỳ vọng cộng được không cần độc lập; phương sai cộng được chỉ khi các hiệp phương sai bằng $0$.
- Markov cần biến không âm; Chebyshev cần phương sai hữu hạn; Hoeffding cần độc lập và bị chặn.
- Mọi bảo đảm về rủi ro thực nghiệm cần tham số không phụ thuộc dữ liệu đánh giá.
- Phân tích SGD nhiều bước cần nhóm rút mới, độc lập với lịch sử; dữ liệu không xáo trộn hoặc quan sát tương quan phá giả thiết này.

**Chuỗi suy luận của toàn chương.** Mục 1 và Mục 2 xây xác suất trên không gian mẫu và chứng minh các lần rút có hoàn lại độc lập (Mệnh đề 05c.14). Mục 3 biến gradient mẫu thành các biến i.i.d. (Hệ quả 05c.25); Mục 4 cho kỳ vọng và phương sai của trung bình (Định lý 05c.35); Mục 5 chuyển chúng thành cận xác suất và cỡ mẫu (Định lý 05c.47, Hệ quả 05c.48). Mục 6 áp các kết quả cho mất mát và gradient (Định lý 05c.52, Định lý 05c.53) và trả lời hai câu hỏi về trung bình hay tổng và về cỡ nhóm (Mệnh đề 05c.55, Mệnh đề 05c.57).

**Giới hạn còn lại và bài sau.** Chương xét một tham số cố định hoặc một hàm bậc hai một chiều tính được chính xác. Bài 05b chứng minh hội tụ của SGD cho hàm lồi mạnh và hàm không lồi dưới hai giả thiết mà Mục 6.7 kiểm, với sàn nhiễu tỉ lệ $\eta\sigma^2$, và chỉ ra cách giảm bước học theo thời gian đưa sàn nhiễu về $0$. Bài 06 dùng gradient nhóm cho các bộ tối ưu thích ứng và cho chuẩn hóa theo lô, nơi mất mát của một quan sát phụ thuộc các quan sát khác trong nhóm nên Định lý 05c.53 không áp dụng nguyên dạng.

## Bài tập củng cố

Cùng với các bài trong mục, mọi mục tiêu học tập có ít nhất một bài tập. Các bài không trùng đề với bộ bài giao chính thức trong tệp bài tập của Bài 05c.

### Mức nhận biết

::: exercise Bài tập 05c.8 (Đúng hay sai)
Xác định đúng hay sai, giải thích bằng một kết quả có số hiệu hoặc một phản ví dụ.

1. Nếu $P(A\cap B)=0$ và $P(A),P(B)>0$ thì $A$ và $B$ độc lập.
2. Tính không chệch của gradient nhóm cần các chỉ số trong nhóm độc lập.
3. Nếu $\operatorname{Cov}(X,Y)=0$ thì $X$ và $Y$ độc lập.
4. Với $Z\ge0$ và $\mathbb EZ=2$, $P(Z\ge10)\le0{,}2$.
5. Rút không hoàn lại làm phương sai của trung bình mẫu lớn hơn rút có hoàn lại.
6. Với mất mát tổng trên nhóm, ngưỡng bước ổn định không phụ thuộc cỡ nhóm.
:::

::: hint
Câu 1 đối chiếu nhận xét sau Định nghĩa 05c.12; câu 2 đối chiếu đoạn "Trong học máy" của Mục 4.2.
:::

::: solution
1. Sai: $P(A)P(B)>0=P(A\cap B)$; hai biến cố rời nhau có xác suất dương luôn phụ thuộc.
2. Sai: chỉ cần mỗi chỉ số có phân phối đều và Định lý 05c.28; độc lập chỉ cần cho hiệp phương sai.
3. Sai: $X$ đều trên $\{-1,0,1\}$ và $Y=X^2$ (sau Mệnh đề 05c.32).
4. Đúng: Định lý 05c.39 cho $2/10=0{,}2$.
5. Sai: Mệnh đề 05c.36 nhân phương sai với $\frac{N-n}{N-1}\le1$.
6. Sai: Mệnh đề 05c.55 cho $\eta\le1/(bL)$.

**Kiểm tra lại.** Câu 4: thế $\mathbb EZ=2$, $\varepsilon=10$ vào (5.1) được $2/10=0{,}2$.
:::

### Mức tính toán hoặc chứng minh

::: exercise Bài tập 05c.9 (Cỡ tập kiểm thử khi chọn trong nhiều mô hình)
Cho $k$ mô hình cố định, xác định trước khi nhìn tập kiểm thử, mất mát 0–1, tập kiểm thử gồm $n$ quan sát i.i.d.

1. Chứng minh: nếu $n\ge\frac{\ln(2k/\delta)}{2\varepsilon^2}$ thì với xác suất ít nhất $1-\delta$, tỉ lệ lỗi đo được của mọi mô hình đồng thời lệch khỏi tỉ lệ lỗi thật dưới $\varepsilon$.
2. Tính $n$ cho $k=1$ và $k=100$ với $\varepsilon=0{,}025$, $\delta=0{,}05$.
:::

::: hint
Áp (6.1) cho từng mô hình, rồi Mệnh đề 05c.7 trên $k$ biến cố "mô hình $j$ lệch".
:::

::: solution
**Câu 1.** Với mỗi mô hình $j$, Định lý 05c.52 cho xác suất lệch từ $\varepsilon$ trở lên không vượt $2e^{-2n\varepsilon^2}$. Mệnh đề 05c.7 cho xác suất có ít nhất một mô hình lệch không vượt $2ke^{-2n\varepsilon^2}$, và đại lượng này không vượt $\delta$ khi $n\ge\frac{\ln(2k/\delta)}{2\varepsilon^2}$. Phần bù cho kết luận.

**Câu 2.** Với $2\varepsilon^2=0{,}00125$: $k=1$ cần $n\ge\frac{\ln40}{0{,}00125}\approx2951{,}1$, tức $n\ge2952$; $k=100$ cần $n\ge\frac{\ln4000}{0{,}00125}\approx6635{,}2$, tức $n\ge6636$.

**Kiểm tra lại.** Số mô hình tăng $100$ lần làm cỡ mẫu tăng khoảng $2{,}25$ lần, vì $\ln4000/\ln40\approx8{,}294/3{,}689\approx2{,}25$.
:::

### Mức vận dụng vào AI

::: exercise Bài tập 05c.10 (Cỡ nhóm cho một sai số chuẩn mục tiêu)
**Dữ kiện.** Ví dụ ba quan sát tại $\theta=1$: gradient mẫu nhận $2$, $0$, $-2$, phương sai $\sigma_1^2=\tfrac83$; tập lặp gồm $\nu=10^6$ bản sao mỗi giá trị, nên $N=3\cdot10^6$.

1. Tính sai số chuẩn của gradient nhóm $b=120$ rút có hoàn lại.
2. Tìm $b$ nhỏ nhất để sai số chuẩn không vượt $0{,}1$.
3. Với $b$ ở câu 2 rút không hoàn lại, tính hệ số hiệu chỉnh của Định lý 05c.53 và nhận xét độ lớn của nó.
:::

::: hint
Định lý 05c.53: sai số chuẩn là $\sqrt{\sigma_1^2/b}$.
:::

::: solution
**Câu 1.** $\sqrt{8/360}=\sqrt{1/45}\approx0{,}149$.

**Câu 2.** Cần $\tfrac8{3b}\le0{,}01$, tức $b\ge266{,}7$; vậy $b=267$, với sai số chuẩn $\sqrt{8/801}\approx0{,}0999$.

**Câu 3.** $\frac{N-b}{N-1}=\frac{2\,999\,733}{2\,999\,999}\approx0{,}99991$; không đáng kể vì $b\ll N$.

**Kiểm tra lại.** Với $b=266$, $\sqrt{8/798}\approx0{,}1001>0{,}1$.
:::

::: exercise Bài tập 05c.11 (Ngân sách nhỏ và cỡ nhóm lớn)
**Dữ kiện.** Ví dụ ba quan sát với tập lặp; Thuật toán 05c.1 với $\theta_0=0$, $a_0=1$, $\eta=0{,}1$; theo (6.6), $a_K=0{,}81^K(1-\bar a_b)+\bar a_b$ với $\bar a_b=\tfrac8{57b}$, $K=\lfloor B_{\rm tot}/b\rfloor$. Ngân sách $B_{\rm tot}=600$ gradient mẫu.

1. So $a_K$ của $b=10$ và $b=60$.
2. Một nhóm phát triển chọn $b=60$ vì "gradient chính xác hơn". Dùng câu 1 để đánh giá lựa chọn này và nêu khi nào nhóm lớn hơn mới có lợi.
:::

::: hint
Tính $K$, $0{,}81^K$ và $\bar a_b$ cho từng $b$.
:::

::: solution
**Câu 1.**

- $b=10$: $K=60$, $0{,}81^{60}\approx3{,}2\cdot10^{-6}$, $\bar a_{10}=\tfrac8{570}\approx0{,}01404$, nên $a_{60}\approx0{,}0140$.
- $b=60$: $K=10$, $0{,}81^{10}\approx0{,}1216$, $\bar a_{60}=\tfrac8{3420}\approx0{,}00234$, nên $a_{10}\approx0{,}1216\cdot0{,}9977+0{,}00234\approx0{,}124$.

**Câu 2.** Với $b=60$, sai số lớn hơn gần chín lần vì chỉ còn $10$ bước: số hạng điểm đầu $0{,}1216$ chiếm gần hết. Gradient chính xác hơn chỉ có lợi khi ngân sách đủ để số hạng $0{,}81^K$ đã nhỏ hơn sàn nhiễu, như ở $B_{\rm tot}=3000$ của Ví dụ 05c.39; khi đó tăng $b$ hạ sàn nhiễu. Tính trên mọi $b$ nguyên với ngân sách $600$, cực tiểu đạt tại $b=18$, với $K=33$ và $a_K\approx0{,}0087$.

**Kiểm tra lại.** $0{,}81^{10}=e^{10\ln0{,}81}$, xấp xỉ $e^{-2{,}107}\approx0{,}1216$.
:::

## Hướng dẫn đọc thêm và tài liệu tham khảo

- **Koller và Friedman (2009)**, *Probabilistic Graphical Models*, MIT Press: mục 2.1 (tr. 15–34) cho Mục 1–4; Định lý 2.1 (tr. 33–34), mục 12.1.2 (tr. 490–491) và Phụ lục A.2 (tr. 1143–1146) cho Mục 5; mục 3.1.3 cho bộ phân loại Bayes ngây thơ.
- **Wasserman (2004)**, *All of Statistics*, Springer: chương 1–3 cho Mục 1–4; chương 4 (Markov, Chebyshev, Hoeffding, khoảng tin cậy) và chương 5 (luật số lớn, định lý giới hạn trung tâm) cho Mục 5; dẫn theo số chương, số mục.
- **Blitzstein và Hwang (2019)**, *Introduction to Probability*, ấn bản 2, CRC Press: chương 1–4, 7 cho thứ tự dẫn dắt và các ví dụ kinh điển của Mục 1–4 (sinh nhật, Monty Hall, trả mũ, St. Petersburg); chương 10 cho Mục 5.
- **Goodfellow, Bengio và Courville (2016)**, *Deep Learning*, MIT Press: mục 3.2–3.11 (tr. 56–71) cho ôn tập xác suất; mục 5.2–5.4 (tr. 110–129) cho giả thiết i.i.d., ước lượng không chệch và sai số chuẩn; mục 8.1.3 (tr. 277–282) cho lập luận về gradient nhóm, hiệu suất giảm dần, phần cứng và xáo trộn theo lượt (Mục 6).
- **Boyd và Vandenberghe (2004)**, *Convex Optimization*, Cambridge University Press: mục 7.4 (tr. 374–383) cho bất đẳng thức Markov và cận Chernoff dưới góc nhìn tối ưu (Mục 5).
- **Sra, Nowozin và Wright (biên tập, 2011)**, *Optimization for Machine Learning*, MIT Press: chương 13 của Bottou và Bousquet (tr. 352–362) cho phân tích sai số xấp xỉ, ước lượng và tối ưu (Nhận xét 05c.58).
- **Học liệu của học phần.** Bài 00 (ôn tập xác suất một biến và nhiều biến), Bài 01 (hồi quy logistic, hàm lồi), Bài 04 (gradient Lipschitz và bước $1/L$), Bài 05 (gradient nhóm, SGD), Bài 05b (hội tụ của SGD), Bài 06 (bộ tối ưu thích ứng, chuẩn hóa theo lô).

Mọi số liệu được tính bằng phân số chính xác hoặc đếm toàn bộ, không mô phỏng.
