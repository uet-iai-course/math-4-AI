# Bài 12 — Học máy, rủi ro thống kê và khả năng tổng quát hóa

Bài 11 chọn tham số bằng cách cực đại hợp lý (maximum likelihood) trên mẫu; theo Mệnh đề 11.3, việc này tương đương cực tiểu tổng âm log-hợp lý của các quan sát. Bài 11 kết thúc với câu hỏi còn mở: một tham số khớp tốt trên tập huấn luyện thì dự đoán quan sát mới tốt đến đâu. Câu hỏi trung tâm của bài là: **tại sao một mô hình có thể khớp hoàn hảo dữ liệu huấn luyện nhưng dự đoán sai trên dữ liệu mới?**

Để trả lời, chúng ta xây dựng ba đối tượng, bao gồm:

- mất mát huấn luyện suy ra từ mô hình xác suất của đầu ra (bình phương sai số cho hồi quy, entropy chéo cho phân loại);
- hai loại rủi ro: *rủi ro kỳ vọng* (expected risk; còn gọi là rủi ro tổng thể, population risk) đo mất mát trung bình trên quan sát mới, *rủi ro thực nghiệm* đo mất mát trung bình trên tập huấn luyện;
- các bảo đảm nối hai loại rủi ro: hội tụ đều cho lớp hữu hạn, học PAC và số chiều VC trên trục thực.

## Câu hỏi mở đầu

Một dây chuyền đo mỗi sản phẩm bằng một cảm biến, cho giá trị chuẩn hóa $x\in[-1,1]$. Giả sử giá trị đo có phân phối đều trên $[-1,1]$, và một sản phẩm bị lỗi ($y=1$) khi và chỉ khi $x\ge0$. Tập huấn luyện gồm bốn sản phẩm đã được kiểm tra:

- $(x_1,y_1)=(-0{,}8;\,0)$
- $(x_2,y_2)=(-0{,}2;\,0)$
- $(x_3,y_3)=(0{,}3;\,1)$
- $(x_4,y_4)=(0{,}7;\,1)$

Xét ba bộ phân loại:

- $h_0(x)=\mathbf 1_{\{x\ge0\}}$, báo lỗi khi giá trị đo từ $0$ trở lên;
- $h_{0{,}3}(x)=\mathbf 1_{\{x\ge0{,}3\}}$, báo lỗi khi giá trị đo từ $0{,}3$ trở lên;
- hàm ghi nhớ $g$, trả lại đúng nhãn đã quan sát tại bốn giá trị $x_1,\ldots,x_4$ và trả $0$ tại mọi giá trị khác,

trong đó $\mathbf 1_{\{p\}}$ là hàm chỉ báo, bằng $1$ khi mệnh đề $p$ đúng và bằng $0$ khi $p$ sai.

**Câu hỏi.** Ba bộ phân loại này dự đoán tốt đến mức nào trên một sản phẩm mới?

Một câu trả lời hấp dẫn là: ba bộ phân loại tốt như nhau, vì cả ba đều phân loại đúng bốn sản phẩm của tập huấn luyện. Câu trả lời này sai vì hai lý do. Thứ nhất, tỉ lệ sai trên tập huấn luyện chỉ nhìn bốn giá trị đo, còn sản phẩm mới có giá trị đo bất kỳ trên $[-1,1]$, và ba bộ phân loại khác nhau trên những đoạn có xác suất dương. Thứ hai, hàm $g$ được dựng sau khi xem nhãn của chính bốn sản phẩm đó, nên việc nó khớp tập huấn luyện không cho thông tin gì về các giá trị đo khác. Để so sánh ba bộ phân loại, chúng ta cần một đại lượng đo sai số trên sản phẩm mới.

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Suy ra mất mát bình phương từ hợp lý Gaussian có điều kiện và entropy chéo nhị phân từ hợp lý Bernoulli có điều kiện; nhận ra trường hợp hợp lý cực đại không có nghiệm hữu hạn.
2. Giải phương trình chuẩn và phân biệt sự duy nhất của hệ số với sự duy nhất của giá trị khớp.
3. Định nghĩa rủi ro kỳ vọng, rủi ro thực nghiệm và quy tắc tối thiểu hóa rủi ro thực nghiệm; tính chính xác rủi ro của bộ phân loại ngưỡng một chiều.
4. Chứng minh cận hội tụ đều cho lớp hữu hạn và suy ra cận rủi ro dư cho nghiệm tối ưu thực nghiệm gần đúng.
5. Phân biệt tham số độ chính xác với độ tin cậy trong học PAC; chứng minh số chiều VC của hai lớp ngưỡng một chiều.
6. Tách rủi ro dư thành sai số xấp xỉ, sai số ước lượng và sai số tối ưu hóa trên một ví dụ cụ thể; chỉ ra giả thiết bị vi phạm khi dữ liệu triển khai khác dữ liệu huấn luyện.

Các mục tiêu thuộc CLO2 (xây dựng và phân tích mô hình học máy) và nối với CLO4 (nhận dạng bài toán tối ưu) trong đề cương học phần.

## Kiến thức tiên quyết

- **Hợp lý cực đại (Bài 11).** Định nghĩa 11.2 cho hàm hợp lý (likelihood) $L(\theta;D)=\prod_{i=1}^np_\theta(x_i)$ của mẫu i.i.d. Mệnh đề 11.3: các tập nghiệm của cực đại $L$, cực đại $\log L$ và cực tiểu $-\frac1n\sum_i\log p_\theta(x_i)$ trùng nhau. Định lý 11.4: với dữ liệu Bernoulli, ước lượng hợp lý cực đại (maximum likelihood estimation, MLE) là $\hat p=\bar x$. Định lý 11.9: với dữ liệu Gaussian một chiều không hoàn toàn bằng nhau, $\hat\mu=\bar x$ và $\hat\sigma^2=\frac1n\sum_i(x_i-\bar x)^2$.
- **Phương trình chuẩn (Mệnh đề 05.3).** Với $X\in\mathbb R^{n\times d}$, $y\in\mathbb R^n$, điểm $w$ cực tiểu hóa $\frac1{2n}\lVert Xw-y\rVert^2$ khi và chỉ khi $X^\top Xw=X^\top y$; phương trình này luôn có nghiệm, và nghiệm duy nhất khi và chỉ khi $\operatorname{rank}X=d$.
- **Bất đẳng thức hợp (Hệ quả 10.7).** Với hai biến cố bất kỳ $E,F$, $\mathbb P(E\cup F)\le\mathbb P(E)+\mathbb P(F)$. Mệnh đề 05c.7 phát biểu dạng $q$ biến cố trên không gian xác suất rời rạc.
- **Bất đẳng thức Hoeffding (Định lý 05c.47).** Nếu $Z_1,\ldots,Z_n$ độc lập và $m_i\le Z_i\le M_i$ trên mọi kết cục, thì với mọi $\varepsilon>0$,
$$\begin{aligned}&\mathbb P\bigl(\lvert\bar Z_n-\mathbb E\bar Z_n\rvert\ge\varepsilon\bigr)\\&\quad\le2\exp\Bigl(-\frac{2n^2\varepsilon^2}V\Bigr),\\&V=\sum_{i=1}^n(M_i-m_i)^2 .\end{aligned}$$
- **Rủi ro thực nghiệm tại một tham số cố định (Định lý 05c.52).** Viết bằng ký hiệu của bài: nếu hàm dự đoán $h$ được xác định trước khi lấy $n$ quan sát i.i.d. và mất mát nhận giá trị trong $[0,1]$, thì trung bình mẫu $\hat R_S(h)$ của mất mát lệch khỏi kỳ vọng $R(h)$ từ $\varepsilon$ trở lên với xác suất không quá $2e^{-2n\varepsilon^2}$ (Bài 05c viết $J(\theta)$, $R(\theta)$, $N$).

**Câu hỏi ôn nhanh.**

1. Cho $Z_1,\ldots,Z_{200}$ độc lập, nhận giá trị trong $[0,1]$ và cùng kỳ vọng $\mu$. Chặn trên $\mathbb P(\lvert\bar Z-\mu\rvert\ge0{,}1)$.
2. Ba biến cố, mỗi biến cố có xác suất không quá $0{,}01$. Chặn trên xác suất có ít nhất một biến cố xảy ra.
3. Dữ liệu Bernoulli là $1,1,0,1$. Tính ước lượng hợp lý cực đại của xác suất nhận giá trị $1$.

::: hint Đáp số câu hỏi ôn nhanh
1. Theo Định lý 05c.47 với $m_i=0$, $M_i=1$, $V=200$: cận bằng $2\exp(-2\cdot200\cdot0{,}01)=2e^{-4}\approx0{,}0366$.
2. Áp Hệ quả 10.7 hai lần: cận bằng $0{,}03$, không cần giả thiết độc lập.
3. Theo Định lý 11.4: $\hat p=3/4$.
:::

## 1. Thiết lập bài toán

Một bài toán học có giám sát gồm tám thành phần.

1. **Tập đầu vào và tập nhãn.** $\mathcal X$ và $\mathcal Y$; trong phân loại nhị phân $\mathcal Y=\{0,1\}$, trong hồi quy $\mathcal Y=\mathbb R$.
2. **Phân phối đích.** $P$, phân phối của cặp ngẫu nhiên $(X,Y)$ trên $\mathcal X\times\mathcal Y$; cố định nhưng chưa biết.
3. **Tập huấn luyện.** $S=((X_1,Y_1),\ldots,(X_n,Y_n))\sim P^n$, gồm $n$ cặp độc lập cùng phân phối (independent and identically distributed, i.i.d.) theo $P$; ta viết $(x_i,y_i)$ cho giá trị quan sát được của cặp thứ $i$.
4. **Quan sát mới.** $(X,Y)\sim P$, độc lập với $S$.
5. **Lớp giả thuyết** (hypothesis class, còn gọi là lớp mô hình). $\mathcal H$, một tập các hàm dự đoán $h:\mathcal X\to\mathcal A$ đo được, chọn trước khi lấy mẫu; $\mathcal A$ là tập các giá trị dự đoán.
6. **Mất mát** (loss). $\ell(a,y)\ge0$, mức phạt khi dự đoán $a$ cho nhãn $y$.
7. **Quy tắc học.** Ánh xạ $S\mapsto\hat h_S\in\mathcal H$; quy tắc chỉ dùng $S$, không dùng $P$.
8. **Mục tiêu và tài nguyên.** Rủi ro trên quan sát mới của $\hat h_S$ nhỏ, so với rủi ro tốt nhất trong $\mathcal H$ và rủi ro tốt nhất trên mọi hàm đo được; tài nguyên là cỡ mẫu $n$.

Trong hồi quy và hồi quy logistic, khi chỉ cần chọn tham số trên dữ liệu đã thấy, ta có thể giữ các đầu vào $x_1,\ldots,x_n$ cố định và chỉ mô hình hóa phân phối của $Y$ khi biết $x$ (thiết kế cố định, fixed design). Khi đánh giá trên quan sát mới, các đầu vào lại là biến ngẫu nhiên theo $P$.

Bảng dưới phân loại các đại lượng của bài theo nguồn ngẫu nhiên.

| Loại | Đại lượng |
|---|---|
| Cố định | $P$, $\mathcal H$, $\ell$, rủi ro kỳ vọng $R(h)$ của một $h$ cho trước, $R_{\mathcal H}^*$, $R^*$ |
| Ngẫu nhiên theo $S\sim P^n$ | $S$, $\hat h_S$, rủi ro thực nghiệm $\hat R_S(h)$, $R(\hat h_S)$, độ lệch đều $\Delta_S$ |

## 2. Ký hiệu và giả thiết

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $X,Y$; $x,y$ | đầu vào và nhãn ngẫu nhiên; giá trị quan sát | $\mathcal X$, $\mathcal Y$ |
| $P$ | phân phối đích của cặp $(X,Y)$ | phân phối trên $\mathcal X\times\mathcal Y$ |
| $S$, $n$ | tập huấn luyện, cỡ mẫu | $n$ cặp; số nguyên dương |
| $\theta$; $w$ | tham số mô hình; hệ số | vector |
| $m_\theta(x)$ | trung bình có điều kiện được mô hình hóa; với nhãn nhị phân, $m_\theta(x)=\mathbb P_\theta(Y=1\mid X=x)$ | số thực; $(0,1)$ với nhãn nhị phân |
| $\sigma^2$ | phương sai nhiễu Gaussian | số dương |
| $A$, $y$ | ma trận thiết kế; vector đầu ra | $\mathbb R^{n\times p}$; $\mathbb R^n$ |
| $\phi(x)$ | vector đặc trưng của đầu vào | $\mathbb R^p$ |
| $p_\theta(y\mid x)$ | mật độ hoặc hàm khối có điều kiện của đầu ra trong mô hình | số không âm |
| $\operatorname{sigm}(z)$ | hàm sigmoid $1/(1+e^{-z})$ | $\mathbb R\to(0,1)$ |
| $q(x)$ | xác suất thật $\mathbb P(Y=1\mid X=x)$ | $[0,1]$ |
| $\mathcal H$; $h$; $\hat h_S$ | lớp giả thuyết; một hàm dự đoán; hàm chọn từ mẫu | tập hàm; phần tử của $\mathcal H$ |
| $\ell(a,y)$ | mất mát khi dự đoán $a$ cho nhãn $y$ | số không âm |
| $R(h)$; $\hat R_S(h)$ | rủi ro kỳ vọng; rủi ro thực nghiệm | kỳ vọng; trung bình mẫu |
| $R_{\mathcal H}^*$; $R^*$ | rủi ro tốt nhất trong lớp; rủi ro Bayes | cận dưới đúng |
| $h_t$; $\mathcal H_\uparrow$ | ngưỡng $\mathbf 1_{\{x\ge t\}}$; lớp các ngưỡng | hàm $\mathbb R\to\{0,1\}$; tập hàm |
| $\mathcal H_{\mathrm{aff}}$ | lớp $\mathbf 1_{\{wx+b\ge0\}}$, $w,b\in\mathbb R$ | tập hàm |
| $\mathcal H_{\mathrm c}$; $\mathcal H_{\mathrm{all}}$ | lớp hai hàm hằng; lớp mọi hàm đo được $[-1,1]\to\{0,1\}$ | tập hàm |
| $\eta$; $\eta_S$ | sai số tối ưu cho phép; sai số tối ưu hóa trên mẫu | số không âm |
| $\Delta_S$ | độ lệch đều giữa hai loại rủi ro trên $\mathcal H$ | số không âm |
| $\varepsilon$, $\delta$ | mức sai số; xác suất thất bại cho phép | $(0,1)$ |
| $M$; $d_{\mathrm{VC}}$ | số phần tử của lớp hữu hạn; số chiều VC | số nguyên dương hoặc $+\infty$ |

Trong bài, $\log$ là logarit tự nhiên.

Các giả thiết thống kê dùng trong bài:

- **(G1) Lấy mẫu.** Các cặp của $S$ i.i.d. theo $P$, và quan sát mới có cùng phân phối $P$, độc lập với $S$.
- **(G2) Mất mát bị chặn.** $\ell(a,y)\in[0,1]$ với mọi $a,y$ (dùng từ Mục 7).
- **(G3) Lớp chọn trước.** $\mathcal H$ được cố định trước khi xem $S$.

Các giả thiết về mô hình và tối ưu:

- **(E1) Nhiễu Gaussian.** Nhiễu có phân phối $\mathcal N(0,\sigma^2)$ với $\sigma^2$ đã biết (Mục 4).
- **(E2) Không ràng buộc.** Bài toán tối ưu không có ràng buộc hoặc số hạng chính quy hóa theo tham số.
- **(E3) Nghiệm gần đúng.** Bộ tối ưu trả về một hàm có rủi ro thực nghiệm cách cận dưới đúng không quá $\eta$.

## 3. Ví dụ xuyên suốt

Ứng dụng AI của bài là huấn luyện bộ phân loại sản phẩm lỗi khi chỉ có rất ít dữ liệu đã gán nhãn. Ta so sánh một mô hình dùng ít đặc trưng với một mô hình biểu diễn quá linh hoạt trên cùng bốn quan sát, rồi tách sai số của mỗi mô hình thành sai số xấp xỉ, sai số ước lượng và sai số tối ưu hóa. Ví dụ tính tay sau là phiên bản nhỏ của ứng dụng đó.

::: example Ví dụ 12.1 (Phân loại sản phẩm lỗi từ bốn quan sát cảm biến)
**Đầu vào và nhãn.**
- $\mathcal X=[-1,1]$ là giá trị chuẩn hóa của cảm biến;
- $\mathcal Y=\{0,1\}$, với $Y=1$ là sản phẩm lỗi.

**Phân phối đích.** $X\sim\operatorname{Uniform}[-1,1]$ và $Y=\mathbf 1_{\{X\ge0\}}$, tức
$$
\mathbb P(Y=1\mid X=x)=\begin{cases}1, & x\ge0,\\ 0, & x<0.\end{cases}
$$

**Tập huấn luyện** ($n=4$).
- $(x_1,y_1)=(-0{,}8;\,0)$
- $(x_2,y_2)=(-0{,}2;\,0)$
- $(x_3,y_3)=(0{,}3;\,1)$
- $(x_4,y_4)=(0{,}7;\,1)$

**Ba lớp giả thuyết**, từ ít linh hoạt đến linh hoạt nhất.
- $\mathcal H_{\mathrm c}=\{x\mapsto0,\ x\mapsto1\}$: hai hàm hằng, không dùng đặc trưng nào;
- $\mathcal H_\uparrow=\{h_t:\ t\in\mathbb R\}$ với $h_t(x)=\mathbf 1_{\{x\ge t\}}$: các ngưỡng trên một đặc trưng;
- $\mathcal H_{\mathrm{all}}$: mọi hàm đo được $[-1,1]\to\{0,1\}$, kể cả hàm ghi nhớ $g$ của câu hỏi mở đầu.

**Mất mát.** Mất mát $0$–$1$ (0–1 loss) $\ell(a,y)=\mathbf 1_{\{a\ne y\}}$.
:::

Ví dụ 12.1 có ba đặc điểm thuận lợi cho tính toán. Phân phối đích đã biết, nên mọi rủi ro kỳ vọng tính được bằng tích phân. Nhãn là hàm tất định của đầu vào, nên quy tắc tốt nhất có rủi ro $0$. Trên $[-1,1]$, hàm hằng $1$ trùng $h_{-1}$ và hàm hằng $0$ trùng $h_2$, nên ba lớp lồng nhau, $\mathcal H_{\mathrm c}\subset\mathcal H_\uparrow\subset\mathcal H_{\mathrm{all}}$, và ta so sánh được tác động của độ linh hoạt trên cùng một mẫu.

## 4. Hồi quy Gaussian và mất mát bình phương

Một cảm biến cho ba cặp (đầu vào, đầu ra):

- $(x_1,y_1)=(0,1)$
- $(x_2,y_2)=(1,2)$
- $(x_3,y_3)=(2,2)$

Ba điểm không thẳng hàng, nên không đường thẳng $w_0+w_1x$ nào đi qua cả ba. Nếu cho trước tiêu chuẩn tổng bình phương sai số, bài toán là phép tối ưu của Bài 05. Chúng ta đi ngược một bước: nêu mô hình xác suất của đầu ra, rồi suy ra đại lượng cần tối ưu bằng hợp lý cực đại.

Một cách trực quan, đầu vào dời vị trí của phân phối đầu ra, còn nhiễu tạo dao động quanh vị trí đó; mỗi đường dự đoán ứng với một họ trung bình có điều kiện. Mô tả này chưa phải định nghĩa và chưa cho biết mất mát có dạng nào.

### 4.1. Mô hình đầu ra có điều kiện

Định nghĩa sau chính xác hóa ý "mỗi đầu vào có một phân phối đầu ra riêng, sinh từ cùng một tham số".

::: definition Định nghĩa 12.1 (Mô hình đầu ra có điều kiện)
Cho các đầu vào đã quan sát $x_1,\ldots,x_n$ và một tập tham số $\Theta$. Một *mô hình đầu ra có điều kiện* chỉ định, với mỗi $\theta\in\Theta$ và mỗi đầu vào $x$, một phân phối $p_\theta(\cdot\mid x)$ của đầu ra; tham số $\theta$ dùng chung cho mọi đầu vào.

Nếu $Y_1,\ldots,Y_n$ độc lập có điều kiện khi biết các đầu vào và $Y_i$ có phân phối $p_\theta(\cdot\mid x_i)$, thì *hàm hợp lý có điều kiện* là
$$
L(\theta)=\prod_{i=1}^n p_\theta(y_i\mid x_i),
\tag{4.1}
$$
trong đó mỗi nhân tử là mật độ khi $Y$ liên tục và là xác suất khi $Y$ rời rạc.
:::

Định nghĩa 12.1 mở rộng hàm hợp lý của Định nghĩa 11.2. Trong Bài 11, mọi quan sát có cùng phân phối $p_\theta$; ở đây mỗi quan sát có phân phối riêng $p_\theta(\cdot\mid x_i)$, nhưng các phân phối này sinh từ cùng một quy tắc $x\mapsto p_\theta(\cdot\mid x)$. Khi mọi $x_i$ bằng nhau, (4.1) trở về hàm hợp lý của mẫu i.i.d. trong Định nghĩa 11.2.

Mô hình hồi quy Gaussian giả sử
$$
\begin{aligned}
&Y_i=m_\theta(x_i)+\xi_i,\\
&\xi_1,\ldots,\xi_n\ \text{i.i.d.}\ \mathcal N(0,\sigma^2),\\
&\sigma^2>0,
\end{aligned}
\tag{4.2}
$$
trong đó $m_\theta(x)$ là trung bình có điều kiện được mô hình hóa và các nhiễu $\xi_i$ độc lập với các đầu vào. Khác với Định lý 11.9, trung bình $m_\theta(x_i)$ thay đổi theo từng quan sát.

### 4.2. Mất mát bình phương từ hợp lý Gaussian

Mệnh đề sau dùng Định nghĩa 12.1 và phép lấy âm log của Mệnh đề 11.3. Murphy (2022), §4.2.7 và §11.2.2, trình bày cùng phép suy diễn với $\sigma^2$ cố định.

::: proposition Mệnh đề 12.2 (Hợp lý Gaussian dẫn tới mất mát bình phương) — chứng minh đầy đủ
**Giả thiết.** Dữ liệu tuân theo mô hình (4.2); phương sai $\sigma^2>0$ đã biết và không phụ thuộc $\theta$.

**Kết luận.** Âm log-hợp lý có điều kiện bằng
$$
\begin{aligned}
&-\log L(\theta)\\
&\quad=\frac n2\log(2\pi\sigma^2)\\
&\quad+\frac1{2\sigma^2}\sum_{i=1}^n\bigl(y_i-m_\theta(x_i)\bigr)^2 .
\end{aligned}
\tag{4.3}
$$
Do đó tập nghiệm hợp lý cực đại theo $\theta$ trùng tập nghiệm cực tiểu của tổng bình phương sai số $\sum_{i=1}^n(y_i-m_\theta(x_i))^2$.
:::

::: proof Chứng minh Mệnh đề 12.2
**Lộ trình.** Viết mật độ có điều kiện của từng đầu ra, nhân lại theo tính độc lập có điều kiện, lấy âm log, rồi dùng tính tăng chặt của log để chuyển bài toán.

**Bước 1 (mật độ của một đầu ra).** Khi biết các đầu vào, $m_\theta(x_i)$ là hằng số và $Y_i=m_\theta(x_i)+\xi_i$ với $\xi_i\sim\mathcal N(0,\sigma^2)$. Do đó $\mathbb P(Y_i\le y)=\mathbb P(\xi_i\le y-m_\theta(x_i))$, và đạo hàm theo $y$ cho
$$
\begin{aligned}
p_\theta(y\mid x_i)&=(2\pi\sigma^2)^{-1/2}\\
&\quad\times\exp\Bigl[-\frac{(y-m_\theta(x_i))^2}{2\sigma^2}\Bigr].
\end{aligned}
$$

**Bước 2 (tích).** Các $\xi_i$ độc lập, nên các $Y_i=m_\theta(x_i)+\xi_i$, mỗi biến là hàm của một $\xi_i$, cũng độc lập khi biết các đầu vào. Theo (4.1), $L(\theta)=\prod_{i=1}^np_\theta(y_i\mid x_i)>0$.

**Bước 3 (âm log).** Log của tích bằng tổng các log, nên
$$
\begin{aligned}
&-\log L(\theta)\\
&\quad=-\sum_{i=1}^n\log p_\theta(y_i\mid x_i)\\
&\quad=\sum_{i=1}^n\Bigl[\tfrac12\log(2\pi\sigma^2)\\
&\qquad\quad+\frac{(y_i-m_\theta(x_i))^2}{2\sigma^2}\Bigr]\\
&\quad=\frac n2\log(2\pi\sigma^2)\\
&\qquad+\frac1{2\sigma^2}\sum_{i=1}^n(y_i-m_\theta(x_i))^2,
\end{aligned}
$$
tức (4.3).

**Bước 4 (tập nghiệm).** Hàm $\log$ tăng chặt trên $(0,\infty)$ và $L(\theta)>0$, nên $L(\theta)\ge L(\theta')$ khi và chỉ khi $-\log L(\theta)\le-\log L(\theta')$; lập luận của Mệnh đề 11.3 không cần các quan sát cùng phân phối. Đặt $Q(\theta)=\sum_i(y_i-m_\theta(x_i))^2$. Theo (4.3), $-\log L(\theta)=a+b\,Q(\theta)$ với $a=\frac n2\log(2\pi\sigma^2)$ và $b=\frac1{2\sigma^2}>0$ không phụ thuộc $\theta$; ở đây ta dùng giả thiết $\sigma^2$ đã biết. Vì $b>0$, $a+bQ(\theta)\le a+bQ(\theta')$ khi và chỉ khi $Q(\theta)\le Q(\theta')$. $\square$

Như vậy, mất mát bình phương là hệ quả của giả thiết nhiễu Gaussian có phương sai chung, không phải một quy tắc tùy ý.
:::

Trong học máy, $m_\theta$ là bộ dự đoán đầu ra liên tục, và các hiệu $y_i-m_\theta(x_i)$ là *phần dư* (residual). Mệnh đề 12.2 cho phép đọc mục tiêu huấn luyện như một giả thiết về nhiễu. Nếu thay nhiễu Gaussian bằng nhiễu có mật độ tỉ lệ với $e^{-\lvert\xi\rvert/b}$ với $b$ cố định, cùng phép suy diễn cho tổng trị tuyệt đối $\sum_i\lvert y_i-m_\theta(x_i)\rvert$, như Ví dụ 11.6. Nghĩa là chọn mất mát bằng hợp lý thì cũng là chọn một mô hình nhiễu.

### 4.3. Nghiệm tuyến tính và vai trò của hạng

Với một đặc trưng, chọn $m_w(x)=w_0+w_1x$. Với $p$ đặc trưng chọn trước, ta xếp các trung bình thành $Aw$, trong đó hàng thứ $i$ của *ma trận thiết kế* (design matrix) $A\in\mathbb R^{n\times p}$ chứa các đặc trưng của $x_i$, có thể kèm một tọa độ $1$ cho hệ số tự do. Theo (4.3), mục tiêu là
$$
J(w)=\lVert Aw-y\rVert_2^2,\qquad w\in\mathbb R^p .
$$

Bài 05 đã giải bài toán này cho $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$. Ta viết lại kết quả với $A$ thay cho $X$ (vì $X$ đã dành cho đầu vào ngẫu nhiên) và $p$ thay cho $d$; vì $J=2nF$ với hệ số $2n>0$, hai hàm có cùng tập nghiệm cực tiểu.

::: lemma Nhắc lại (Mệnh đề 05.3, viết theo ký hiệu của bài)
**Giả thiết.** $A\in\mathbb R^{n\times p}$, $y\in\mathbb R^n$.

**Kết luận.** $w$ cực tiểu hóa $J$ khi và chỉ khi
$$
A^\top Aw=A^\top y,
\tag{4.4}
$$
và (4.4) luôn có nghiệm.
:::

Hệ (4.4) được gọi là *phương trình chuẩn* (normal equations).

Về mặt hình học, mọi vector khớp $Aw$ nằm trong không gian cột của $A$, và (4.4) nói rằng phần dư $y-A\hat w$ vuông góc với mọi cột của $A$. Khối nhắc lại trên trả lời câu hỏi tồn tại. Khi hạng cột thiếu, hệ số không duy nhất, và câu hỏi còn lại là các nghiệm khác nhau dự đoán giống nhau đến đâu.

::: proposition Mệnh đề 12.3 (Tập nghiệm bình phương tối thiểu và vector khớp) — chứng minh đầy đủ
**Giả thiết.** $A\in\mathbb R^{n\times p}$, $y\in\mathbb R^n$, và $\hat w$ là một nghiệm của (4.4).

**Kết luận.**
1. Tập nghiệm cực tiểu của $J$ là $\{\hat w+v:\ v\in\ker A\}$, và mọi nghiệm có cùng vector khớp $A\hat w$.
2. Nếu $A$ có hạng cột đầy đủ, nghiệm duy nhất là
$$
\hat w=(A^\top A)^{-1}A^\top y .
\tag{4.5}
$$
:::

::: proof Chứng minh Mệnh đề 12.3
**Lộ trình.** Khai triển $J(\hat w+v)$ quanh nghiệm $\hat w$ và dùng (4.4) để triệt tiêu số hạng bậc nhất.

**Bước 1 (khai triển).** Đặt $r=y-A\hat w$. Theo (4.4), $A^\top r=A^\top y-A^\top A\hat w=0$. Với mọi $v\in\mathbb R^p$,
$$
\begin{aligned}
J(\hat w+v)&=\lVert r-Av\rVert^2\\
&=\lVert r\rVert^2-2v^\top A^\top r\\
&\quad+\lVert Av\rVert^2\\
&=J(\hat w)+\lVert Av\rVert^2 .
\end{aligned}
$$
Dòng thứ ba dùng $A^\top r=0$.

**Bước 2 (tập nghiệm).** Từ Bước 1, $J(\hat w+v)\ge J(\hat w)$ với mọi $v$, nên $\hat w$ là nghiệm cực tiểu, và $J(\hat w+v)=J(\hat w)$ khi và chỉ khi $Av=0$, tức $v\in\ker A$. Mọi nghiệm có dạng $\hat w+v$ với $Av=0$, nên có vector khớp $A(\hat w+v)=A\hat w$.

**Bước 3 (hạng đầy đủ).** Hạng cột đầy đủ cho $Av\ne0$ khi $v\ne0$, tức $\ker A=\{0\}$; khi đó $v^\top A^\top Av=\lVert Av\rVert^2>0$ với mọi $v\ne0$, nên $A^\top A$ khả nghịch và (4.4) cho (4.5). Theo Bước 2, nghiệm duy nhất. $\square$

Như vậy, dữ liệu huấn luyện luôn xác định duy nhất các giá trị khớp trên chính các đầu vào đã thấy, kể cả khi hệ số không duy nhất.
:::

Trong học máy, Mệnh đề 12.3 giải quyết phần tối ưu của hồi quy tuyến tính với đặc trưng cố định. Thêm đặc trưng có thể làm giảm phần dư huấn luyện, nhưng khi số đặc trưng vượt hạng của dữ liệu, hệ số không còn được xác định duy nhất.

Ví dụ sau giải phương trình chuẩn cho ba số đo ở đầu Mục 4.

::: example Ví dụ 12.2 (Hồi quy từ ba số đo)
**Dữ liệu và mô hình.**
- $(x_1,y_1)=(0,1)$
- $(x_2,y_2)=(1,2)$
- $(x_3,y_3)=(2,2)$

Các đầu ra độc lập có điều kiện, $Y_i\mid x_i\sim\mathcal N(w_0+w_1x_i,\sigma^2)$ với $\sigma^2>0$ cố định. Cần tìm nghiệm hợp lý cực đại $(\hat w_0,\hat w_1)$.

**Lập hệ.** Theo Mệnh đề 12.2, cần cực tiểu hóa $\lVert Aw-y\rVert^2$ với
$$
\begin{gathered}
A=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix},\quad
y=\begin{pmatrix}1\\2\\2\end{pmatrix},\\
A^\top A=\begin{pmatrix}3&3\\3&5\end{pmatrix},\quad
A^\top y=\begin{pmatrix}5\\6\end{pmatrix}.
\end{gathered}
$$
Định thức của $A^\top A$ bằng $3\cdot5-3\cdot3=6>0$, nên $A$ có hạng cột đầy đủ và nghiệm duy nhất theo Mệnh đề 12.3.

**Giải phương trình chuẩn.** Hệ (4.4) là
$$
\begin{aligned}
3w_0+3w_1&=5,\\
3w_0+5w_1&=6.
\end{aligned}
$$
Trừ phương trình thứ nhất khỏi phương trình thứ hai: $2w_1=1$, nên $\hat w_1=\frac12$. Thế vào phương trình thứ nhất: $3w_0=5-\frac32=\frac72$, nên $\hat w_0=\frac76$.

**Giá trị khớp và phần dư.** $\hat y=(\frac76,\frac53,\frac{13}6)$ và $r=y-\hat y=(-\frac16,\frac13,-\frac16)$. Tổng bình phương phần dư bằng $\frac1{36}+\frac19+\frac1{36}=\frac16$.

**Kiểm tra lại.** $\sum_ir_i=-\frac16+\frac13-\frac16=0$ và $\sum_ix_ir_i=0+\frac13-\frac13=0$, đúng với $A^\top r=0$.

**Diễn giải.** Đường khớp không đi qua điểm nào trong ba điểm. Nếu học thêm phương sai trong cùng mô hình, phép tối ưu theo phương sai như Định lý 11.9 cho $\hat\sigma^2=\frac16/3=\frac1{18}$.
:::

Khi các đầu vào trùng nhau, hạng cột thiếu và Mệnh đề 12.3 dự đoán nhiều hệ số tối ưu. Ví dụ sau tính tập nghiệm đó.

::: example Ví dụ 12.3 (Vector khớp khi hạng thiếu)
**Dữ liệu.**
- $(x_1,y_1)=(1,2)$
- $(x_2,y_2)=(1,4)$

Trung bình $w_0+w_1x$, phương sai Gaussian cố định.

**Hạng.** Ma trận thiết kế có hai hàng cùng bằng $(1,1)$, nên hạng bằng $1<2$.

**Tối ưu.** Đặt $c=w_0+w_1$. Mục tiêu là
$$
\begin{aligned}
&(2-c)^2+(4-c)^2\\
&\quad=2(c-3)^2+2,
\end{aligned}
$$
cực tiểu khi $c=3$. Mọi cặp $(w_0,w_1)$ có $w_0+w_1=3$ là nghiệm, và chúng đều khớp vector $(3,3)^\top$.

**Kiểm tra lại.** $\ker A=\{(v,-v)\}$, nên tập nghiệm $\{(3,0)+(v,-v)\}$ đúng dạng của Mệnh đề 12.3.

**Diễn giải.** Tại đầu vào mới $x=0$, hai nghiệm $(3,0)$ và $(0,3)$ dự đoán lần lượt $3$ và $0$. Nghĩa là giá trị khớp duy nhất trên dữ liệu đã thấy chưa xác định duy nhất dự đoán trên dữ liệu mới.
:::

Các ví dụ trên giữ phương sai cố định và chung cho mọi quan sát. Nhận xét sau xét điều xảy ra khi bỏ từng giả thiết đó.

::: remark Nhận xét 12.4 (Phương sai chưa biết, phương sai thay đổi và mất mát bình phương không cần Gaussian)
1. Nếu học thêm một phương sai chung và tổng bình phương phần dư tối ưu $\mathrm{SSE}>0$, phép tối ưu theo phương sai cho $\hat\sigma^2=\mathrm{SSE}/n$ (xem Murphy (2022), §11.2.3.6). Nếu có nghiệm khớp hoàn hảo ($\mathrm{SSE}=0$) và phương sai được phép tiến về $0$, hợp lý Gaussian không bị chặn trên; khi đó không có nghiệm hợp lý cực đại chung với phương sai dương.
2. Nếu phương sai đã biết nhưng thay đổi theo quan sát thành $\sigma_i^2$, âm log-hợp lý theo trung bình cho tổng bình phương có trọng số $\sum_i(y_i-m_\theta(x_i))^2/(2\sigma_i^2)$ (xem Murphy (2022), §11.2.2.4).
3. Với nhãn có mô-men bậc hai hữu hạn, kỳ vọng có điều kiện $\mathbb E[Y\mid X=x]$ là dự đoán có kỳ vọng mất mát bình phương nhỏ nhất (xem Murphy (2022), §5.1.5.1). Do đó mất mát bình phương vẫn là tiêu chuẩn hợp lý để ước lượng trung bình có điều kiện khi nhiễu không Gaussian, nhưng khi đó nó không còn là âm log-hợp lý.
:::

Như vậy, Mệnh đề 12.2 biến giả thiết nhiễu Gaussian thành mất mát bình phương, Mệnh đề 12.3 mô tả trọn tập nghiệm của bài toán bình phương tối thiểu, và Nhận xét 12.4 chỉ ra mỗi giả thiết về phương sai thay đổi kết luận thế nào. Tuy nhiên, mô hình Gaussian không phù hợp với nhãn nhị phân, vì nó gán mật độ dương cho mọi giá trị thực thay vì chỉ cho hai giá trị $0$ và $1$. Trong Mục 5, chúng ta thay mật độ Gaussian bằng xác suất Bernoulli và suy ra một mất mát khác.

## 5. Hợp lý logistic và entropy chéo nhị phân

Một bộ nhận dạng sản phẩm lỗi có hai quan sát:

- $(x_1,y_1)=(-1,0)$
- $(x_2,y_2)=(1,1)$

Bộ nhận dạng cần trả về nhãn, và tốt hơn nữa là một xác suất lỗi để mô tả độ chắc chắn. Chúng ta dùng phân phối Bernoulli có tham số thay đổi theo đầu vào.

Một cách trực quan, tham số chung điều khiển cách xác suất lỗi thay đổi theo đặc trưng, còn hàm sigmoid ép mọi điểm số thực vào khoảng $(0,1)$; mô tả này chưa cho biết xác suất phụ thuộc tham số theo công thức nào.

### 5.1. Mô hình Bernoulli có điều kiện

Định nghĩa sau cho công thức đó.

::: definition Định nghĩa 12.5 (Mô hình Bernoulli có điều kiện và mô hình logistic)
Cho $\mathcal Y=\{0,1\}$ và một tập tham số $\Theta$. Một *mô hình Bernoulli có điều kiện* chỉ định một hàm $m_\theta:\mathcal X\to[0,1]$ với mỗi $\theta\in\Theta$, và
$$
\begin{aligned}
&\mathbb P_\theta(Y=y\mid X=x)\\
&\quad=m_\theta(x)^y\,[1-m_\theta(x)]^{1-y},\\
&\quad y\in\{0,1\}.
\end{aligned}
$$
Trong *mô hình logistic* (logistic regression) với vector đặc trưng $\phi(x)\in\mathbb R^p$,
$$
\begin{aligned}
m_w(x)&=\operatorname{sigm}\bigl(w^\top\phi(x)\bigr),\\
\operatorname{sigm}(z)&=\frac1{1+e^{-z}} .
\end{aligned}
$$
Một tọa độ của $\phi(x)$ có thể bằng $1$ để chứa hệ số tự do.
:::

Định nghĩa 12.5 tổng quát hóa mô hình Bernoulli của Định lý 11.4: ở đó mọi quan sát có chung một xác suất $p$, còn ở đây xác suất $m_w(x)$ thay đổi theo đầu vào nhưng được ràng buộc bởi một vector tham số chung. Ví dụ: với $\phi(x)=x$ và $w=\log3$, $m_w(1)=\frac1{1+1/3}=\frac34$ và $m_w(-1)=\frac1{1+3}=\frac14$. Với mọi $w$ hữu hạn, $0<m_w(x)<1$, nên cả hai nhãn có xác suất dương. Đẳng thức $\log\frac{m_w(x)}{1-m_w(x)}=w^\top\phi(x)$ cho thấy mô hình logistic giả thiết *log-tỉ số xác suất* (log-odds) tuyến tính theo đặc trưng, không giả thiết chính xác suất tuyến tính.

### 5.2. Entropy chéo từ hợp lý Bernoulli

Từ Định nghĩa 12.1 và 12.5, phép lấy âm log cho kết quả sau. Murphy (2022), §4.2.3 và §10.2.3.1, viết cùng hàm mục tiêu và gọi nó là entropy chéo nhị phân.

::: proposition Mệnh đề 12.6 (Hợp lý Bernoulli dẫn tới entropy chéo) — chứng minh đầy đủ
**Giả thiết.** Các nhãn $y_i\in\{0,1\}$ độc lập có điều kiện khi biết đầu vào, $Y_i$ có phân phối Bernoulli với xác suất $m_\theta(x_i)\in(0,1)$ cho mọi $\theta\in\Theta$.

**Kết luận.** Âm log-hợp lý chia cho $n$ bằng
$$
\begin{aligned}
&\hat L_n(\theta)\\
&\ =-\frac1n\sum_{i=1}^n\Bigl[y_i\log m_\theta(x_i)\\
&\qquad+(1-y_i)\\
&\qquad\quad\times\log\bigl(1-m_\theta(x_i)\bigr)\Bigr].
\end{aligned}
\tag{5.1}
$$
Như ở Bài 11, ta gọi $\hat L_n$ là *mất mát entropy chéo nhị phân* (binary cross-entropy, còn gọi là log loss); khác Bài 11, xác suất ở đây thay đổi theo đầu vào. Tập nghiệm cực tiểu của (5.1) trùng tập nghiệm cực đại hợp lý có điều kiện; cả hai tập có thể rỗng.
:::

::: proof Chứng minh Mệnh đề 12.6
**Lộ trình.** Lập hàm hợp lý theo (4.1), lấy log từng nhân tử, rồi dùng tính tăng chặt của log.

**Bước 1 (hàm hợp lý).** Theo tính độc lập có điều kiện và (4.1),
$$
\begin{aligned}
L(\theta)&=\prod_{i=1}^n m_\theta(x_i)^{y_i}\\
&\qquad\times\bigl[1-m_\theta(x_i)\bigr]^{1-y_i}.
\end{aligned}
$$
Mỗi nhân tử dương vì $m_\theta(x_i)\in(0,1)$; đây là chỗ dùng giả thiết, để mọi log ở bước sau hữu hạn.

**Bước 2 (âm log).** Log của tích bằng tổng các log, và $\log(a^yb^{1-y})=y\log a+(1-y)\log b$, nên
$$
\begin{aligned}
&-\frac1n\log L(\theta)\\
&\quad=-\frac1n\sum_{i=1}^n\log\Bigl(m_\theta(x_i)^{y_i}\\
&\qquad\times\bigl[1-m_\theta(x_i)\bigr]^{1-y_i}\Bigr)\\
&\quad=-\frac1n\sum_{i=1}^n\Bigl[y_i\log m_\theta(x_i)\\
&\qquad+(1-y_i)\log\bigl(1-m_\theta(x_i)\bigr)\Bigr]\\
&\quad=\hat L_n(\theta).
\end{aligned}
$$

**Bước 3 (tập nghiệm).** Vì $\log$ tăng chặt và $-\frac1n<0$, $L(\theta)\ge L(\theta')$ khi và chỉ khi $\hat L_n(\theta)\le\hat L_n(\theta')$. Do đó hai tập nghiệm trùng nhau, kể cả khi cả hai rỗng. $\square$

Với $y_i\in\{0,1\}$, số hạng thứ $i$ của (5.1) bằng $-\log m_\theta(x_i)$ khi $y_i=1$ và bằng $-\log(1-m_\theta(x_i))$ khi $y_i=0$. Nghĩa là entropy chéo phạt mô hình theo âm log của xác suất nó gán cho nhãn thật.
:::

Trong học máy, $m_\theta$ là bộ dự đoán xác suất. Nếu cần nhãn, ta lấy ngưỡng $h_\theta(x)=\mathbf 1_{\{m_\theta(x)\ge1/2\}}$; với mô hình logistic, đây là $\mathbf 1_{\{w^\top\phi(x)\ge0\}}$. Hai bộ tham số có thể cho cùng nhãn trên mọi đầu vào nhưng khác entropy chéo. Do đó tăng hợp lý và giảm số lần phân loại sai là hai tiêu chuẩn khác nhau, như ví dụ sau tính.

::: example Ví dụ 12.4 (Entropy chéo của hai mô hình cùng nhãn)
**Dữ kiện.** Một quan sát có nhãn $y=1$. Hai mô hình gán xác suất nhãn $1$ lần lượt $0{,}6$ và $0{,}9$.

**Mất mát $0$–$1$.** Cả hai bộ phân loại sau ngưỡng $1/2$ dự đoán nhãn $1$, nên mất mát $0$–$1$ của cả hai bằng $0$.

**Entropy chéo.** Theo (5.1) với $n=1$, $y=1$:
- mô hình thứ nhất: $-\log0{,}6\approx0{,}511$;
- mô hình thứ hai: $-\log0{,}9\approx0{,}105$.

**Kiểm tra lại.** Nếu nhãn thật là $0$, hai mất mát trở thành $-\log0{,}4\approx0{,}916$ và $-\log0{,}1\approx2{,}303$; thứ tự đảo ngược.

**Diễn giải.** Dự đoán tự tin hơn được thưởng khi đúng và bị phạt nặng hơn khi sai, trong khi mất mát $0$–$1$ không phân biệt hai mô hình.
:::

Hai quan sát ở đầu Mục 5 cho phép tính entropy chéo của mô hình logistic tại hai tham số cụ thể.

::: example Ví dụ 12.5 (Hai nhãn đối xứng)
**Dữ liệu và mô hình.**
- $(x_1,y_1)=(-1,0)$
- $(x_2,y_2)=(1,1)$

Dùng $m_w(x)=\operatorname{sigm}(wx)$, không có hệ số tự do; hai nhãn độc lập khi biết đầu vào.

**Tại $w=0$.** $m_0(\pm1)=\frac12$, nên mỗi nhãn thật nhận xác suất $\frac12$ và $\hat L_2(0)=\log2\approx0{,}6931$.

**Tại $w=\log3$.** $m_w(1)=\frac34$ và $m_w(-1)=\frac14$, nên
$$
\begin{aligned}
&\hat L_2(\log3)\\
&\quad=-\frac12\Bigl[\log\frac34+\log\Bigl(1-\frac14\Bigr)\Bigr]\\
&\quad=-\log\frac34\approx0{,}2877 .
\end{aligned}
$$

**Kiểm tra lại.** Cả hai nhãn thật đều nhận xác suất $\frac34$, nên trung bình âm log bằng âm log của chính số đó.

**Diễn giải.** Tham số $\log3$ khớp hai nhãn tốt hơn theo entropy chéo. Phép tính này chưa nói gì về rủi ro trên quan sát mới.
:::

### 5.3. Mất mát có cận dưới nhưng không có nghiệm hữu hạn

Với hai quan sát của Ví dụ 12.5, xác suất mô hình gán cho nhãn thật tại $x=1$ là $\operatorname{sigm}(w)$, và tại $x=-1$ là $1-\operatorname{sigm}(-w)=\operatorname{sigm}(w)$. Do đó
$$
\begin{aligned}
\hat L_2(w)&=-\log\operatorname{sigm}(w)\\
&=\log(1+e^{-w}).
\end{aligned}
\tag{5.2}
$$
Mọi $w$ hữu hạn cho $\hat L_2(w)>0$, đạo hàm $\hat L_2'(w)=-\frac1{1+e^w}<0$, và $\hat L_2(w)\to0$ khi $w\to+\infty$. Nghĩa là cận dưới $0$ không đạt được tại tham số hữu hạn nào: hợp lý tiến tới $1$ nhưng không bằng $1$.

::: remark Nhận xét 12.7 (Dữ liệu tách được và giới hạn của hợp lý cực đại logistic)
Ta nói dữ liệu *tách được tuyến tính* (linearly separable) nếu có $w$ với $w^\top\phi(x_i)>0$ khi $y_i=1$ và $w^\top\phi(x_i)<0$ khi $y_i=0$. Dữ liệu của Ví dụ 12.5 tách được với $w=1$. Khi đó thay $w$ bằng $cw$ với $c\to\infty$ đẩy mọi xác suất gán cho nhãn thật về $1$, nên entropy chéo giảm về $0$ mà không đạt, và hợp lý cực đại không có nghiệm hữu hạn.

Tính lồi của entropy chéo theo $w$ không bảo đảm tồn tại điểm cực tiểu trên miền tham số không bị chặn. Thêm số hạng chính quy hóa $\lambda\lVert w\rVert^2$ với $\lambda>0$ tạo một bài toán khác có nghiệm (xem Murphy (2022), §10.2.7).
:::

Trong học máy, ví dụ này cho thấy "đã phân loại đúng hết" không có nghĩa quá trình tăng hợp lý dừng ở một vector hữu hạn. Với mọi $w>0$, nhãn sau ngưỡng trên hai điểm đều đúng, và tăng $w$ chỉ làm mô hình tự tin hơn.

Như vậy, Mệnh đề 12.2 và 12.6 suy ra hai mất mát huấn luyện từ hai mô hình xác suất, và Nhận xét 12.7 chỉ ra giới hạn tồn tại nghiệm ngay trong một bài toán lồi hai điểm. Tuy nhiên, cả hai mục tiêu chỉ dùng dữ liệu đã thấy. Trong Mục 6, chúng ta đặt một kỳ vọng theo phân phối đích để nói về dữ liệu mới.

## 6. Rủi ro kỳ vọng, rủi ro thực nghiệm và tối thiểu hóa rủi ro thực nghiệm

Trên bốn quan sát của Ví dụ 12.1, ba bộ phân loại $h_0$, $h_{0{,}3}$ và hàm ghi nhớ $g$ đều phân loại đúng cả bốn nhãn, nhưng dự đoán khác nhau trên sản phẩm mới.

Một cách trực quan, rủi ro kỳ vọng lấy trung bình mất mát trên mọi quan sát có thể xuất hiện, có trọng số theo phân phối đích; rủi ro thực nghiệm chỉ lấy trung bình trên những quan sát đã thấy. Hai phép trung bình này cần một mất mát và một phân phối cụ thể để thành định nghĩa.

### 6.1. Hai loại rủi ro

Định nghĩa sau đặt hai phép trung bình trên cùng một mất mát $\ell$.

::: definition Định nghĩa 12.8 (Rủi ro kỳ vọng, rủi ro thực nghiệm và rủi ro Bayes)
Cho bài toán học của Mục 1: phân phối đích $P$, lớp giả thuyết $\mathcal H$ và mất mát $\ell$ đo được.

*Rủi ro kỳ vọng* (expected risk) của một hàm dự đoán cố định $h$ là
$$
\begin{aligned}
R(h)&=\mathbb E\bigl[\ell(h(X),Y)\bigr],\\
(X,Y)&\sim P.
\end{aligned}
\tag{6.1}
$$

*Rủi ro thực nghiệm* (empirical risk) của $h$ trên tập huấn luyện $S$ là
$$
\hat R_S(h)=\frac1n\sum_{i=1}^n\ell\bigl(h(x_i),y_i\bigr).
\tag{6.2}
$$

*Rủi ro tốt nhất trong lớp* là $R_{\mathcal H}^*=\inf_{h\in\mathcal H}R(h)$, và *rủi ro Bayes* (Bayes risk) là $R^*=\inf_hR(h)$, cận dưới đúng lấy trên mọi hàm dự đoán đo được.

Với nhãn nhị phân và *mất mát $0$–$1$* $\ell(a,y)=\mathbf 1_{\{a\ne y\}}$, ta có $R(h)=\mathbb P(h(X)\ne Y)$.
:::

Trong (6.1), $h$ cố định và kỳ vọng lấy theo quan sát mới; $R(h)$ là một số. Trong (6.2), công thức viết cho một giá trị bất kỳ của $S$; khi $S$ ngẫu nhiên theo $P^n$, $\hat R_S(h)$ là một biến ngẫu nhiên. Vì $\mathcal H$ chứa ít hàm hơn tập mọi hàm đo được, $R_{\mathcal H}^*\ge R^*$. Ví dụ: trong Ví dụ 12.1, $R(h_0)=0$, nên $R^*=R_{\mathcal H_\uparrow}^*=0$, còn hai hàm hằng có rủi ro $\frac12$, nên $R_{\mathcal H_{\mathrm c}}^*=\frac12>R^*$.

Hai mục tiêu huấn luyện của Mục 4 và 5 là rủi ro thực nghiệm. Với $\ell(a,y)=(y-a)^2$, (4.3) bằng $\frac n2\log(2\pi\sigma^2)+\frac n{2\sigma^2}\hat R_S(m_\theta)$. Với $\ell(a,y)=-y\log a-(1-y)\log(1-a)$, $a\in(0,1)$, (5.1) chính là $\hat R_S(m_\theta)$. Như vậy, cực đại hợp lý là tối thiểu hóa một rủi ro thực nghiệm, và câu hỏi còn lại là rủi ro thực nghiệm nói gì về rủi ro kỳ vọng.

**Câu hỏi.** Tại sao không nên đo chất lượng của hàm dự đoán bằng rủi ro thực nghiệm trên chính tập huấn luyện đã dùng để chọn nó?

Với $h$ cố định, chọn trước khi lấy mẫu, và $R(h)$ hữu hạn, tính tuyến tính của kỳ vọng cho
$$
\begin{aligned}
\mathbb E_S\bigl[\hat R_S(h)\bigr]&=\frac1n\sum_{i=1}^n\mathbb E\bigl[\ell(h(X_i),Y_i)\bigr]\\
&=R(h),
\end{aligned}
$$
vì mỗi $(X_i,Y_i)$ có phân phối $P$. Khi $h=\hat h_S$ được chọn bằng chính $S$, các số hạng $\ell(\hat h_S(X_i),Y_i)$ phụ thuộc mẫu qua cả hàm dự đoán, nên đẳng thức trên không còn áp dụng.

### 6.2. Mở rộng: quy tắc Bayes cho mất mát $0$–$1$

Khi phân phối đích đã biết, ta xác định được bộ phân loại đạt rủi ro Bayes. Kết quả sau là lý thuyết quyết định của Murphy (2022), §5.1.2.1: dưới mất mát $0$–$1$, chọn nhãn có xác suất hậu nghiệm lớn nhất. Quy tắc này cần biết $q$, nên chỉ dùng làm chuẩn so sánh cho sai số xấp xỉ ở Mục 7.

::: proposition Mệnh đề 12.9 (Quy tắc Bayes cho mất mát $0$–$1$) — chứng minh đầy đủ
**Giả thiết.** $\mathcal Y=\{0,1\}$, mất mát $0$–$1$, và $q(x)=\mathbb P(Y=1\mid X=x)$ là một hàm đo được.

**Kết luận.** Bộ phân loại
$$
h^*(x)=\mathbf 1_{\{q(x)\ge1/2\}}
$$
có rủi ro nhỏ nhất trong mọi bộ phân loại đo được, và
$$
\begin{aligned}
&R^*=R(h^*)\\
&\ =\mathbb E\bigl[\min\{q(X),1-q(X)\}\bigr].
\end{aligned}
\tag{6.3}
$$
:::

::: proof Chứng minh Mệnh đề 12.9
**Lộ trình.** Tính mất mát có điều kiện khi biết $X$ của một bộ phân loại bất kỳ, chặn dưới nó theo từng $x$, rồi lấy kỳ vọng.

**Bước 1 (tính đo được).** $\{x:\ q(x)\ge\frac12\}$ là tạo ảnh của tập đóng $[\frac12,1]$ qua hàm đo được $q$, nên $h^*$ đo được.

**Bước 2 (mất mát có điều kiện).** Với $h$ đo được bất kỳ, $\mathbf 1_{\{h(X)\ne Y\}}=\mathbf 1_{\{h(X)=0\}}Y+\mathbf 1_{\{h(X)=1\}}(1-Y)$. Lấy kỳ vọng có điều kiện khi biết $X$, với $\mathbb E[Y\mid X]=q(X)$:
$$
\begin{aligned}
&\mathbb E\bigl[\mathbf 1_{\{h(X)\ne Y\}}\mid X\bigr]\\
&\quad=\mathbf 1_{\{h(X)=0\}}q(X)\\
&\qquad+\mathbf 1_{\{h(X)=1\}}\bigl(1-q(X)\bigr)\\
&\quad\ge\min\{q(X),1-q(X)\}.
\end{aligned}
$$
Đẳng thức xảy ra khi $h=h^*$: nếu $q(X)\ge\frac12$ thì $h^*(X)=1$ và vế phải dòng đầu bằng $1-q(X)=\min\{q(X),1-q(X)\}$; nếu $q(X)<\frac12$ thì $h^*(X)=0$ và vế đó bằng $q(X)$.

**Bước 3 (kỳ vọng).** Theo quy tắc kỳ vọng toàn phần, $R(h)=\mathbb E\bigl[\mathbb E[\mathbf 1_{\{h(X)\ne Y\}}\mid X]\bigr]\ge\mathbb E[\min\{q(X),1-q(X)\}]=R(h^*)$. $\square$

Như vậy, khi biết $q$, bộ phân loại tốt nhất chỉ cần so sánh $q(x)$ với $\frac12$ tại từng đầu vào.
:::

Tại $q(x)=\frac12$, đổi nhãn được chọn không đổi rủi ro. Nếu chi phí của hai loại sai khác nhau, ngưỡng khác $\frac12$ (xem Murphy (2022), §5.1.2.2). Trong học máy, mô hình logistic $m_\theta(x)$ là một xấp xỉ của $q(x)$ học từ mẫu, và lấy ngưỡng $\frac12$ biến nó thành quy tắc nhãn; với ít dữ liệu, $m_\theta$ có thể xa $q$, nên tối ưu hợp lý chưa cho quy tắc Bayes.

Ví dụ sau tính rủi ro Bayes khi nhãn vẫn ngẫu nhiên lúc đã biết đầu vào.

::: example Ví dụ 12.6 (Rủi ro Bayes trên một phân phối có nhiễu nhãn)
**Phân phối.** $\mathbb P(X=-1)=\mathbb P(X=1)=\frac12$, với $q(-1)=\frac15$ và $q(1)=\frac45$. Mất mát $0$–$1$.

**Hai hàm hằng.** Bộ luôn dự đoán $0$ sai khi $Y=1$:
$$
R(0)=\tfrac12\cdot\tfrac15+\tfrac12\cdot\tfrac45=\tfrac12 .
$$
Tương tự, bộ luôn dự đoán $1$ có rủi ro $\frac12$.

**Ngưỡng tại $0$.** $h_0(-1)=0$ sai với xác suất $q(-1)=\frac15$, và $h_0(1)=1$ sai với xác suất $1-q(1)=\frac15$, nên $R(h_0)=\frac15$.

**Kiểm tra lại.** Theo (6.3), $R^*=\frac12\min\{\frac15,\frac45\}+\frac12\min\{\frac45,\frac15\}=\frac15=R(h_0)$, nên $h_0$ trùng $h^*$ trên hai giá trị của $X$.

**Diễn giải.** Không bộ phân loại nào có rủi ro $0$, vì nhãn vẫn ngẫu nhiên khi đã biết đầu vào. Lớp chỉ gồm hai hàm hằng có rủi ro tốt nhất $\frac12$, cao hơn rủi ro Bayes một lượng $\frac3{10}$.
:::

### 6.3. Tối thiểu hóa rủi ro thực nghiệm

Rủi ro $R(h)$ thường không tính được vì $P$ chưa biết, còn $\hat R_S(h)$ tính được từ dữ liệu. Nguyên lý học tự nhiên là chọn hàm có rủi ro thực nghiệm nhỏ nhất (xem Murphy (2022), §4.3 và §5.4.1; Shalev-Shwartz và Ben-David (2014), §2.2).

::: definition Định nghĩa 12.10 (Tối thiểu hóa rủi ro thực nghiệm)
Cho lớp $\mathcal H$ cố định trước khi lấy mẫu. Quy tắc *tối thiểu hóa rủi ro thực nghiệm* (empirical risk minimization, ERM) chọn
$$
\hat h_S\in\underset{h\in\mathcal H}{\operatorname{argmin}}\,\hat R_S(h)
\tag{6.4}
$$
khi cực tiểu tồn tại. Với $\eta\ge0$, một *nghiệm ERM gần đúng mức $\eta$* là $\hat h_S\in\mathcal H$ thỏa
$$
\hat R_S(\hat h_S)\le\inf_{h\in\mathcal H}\hat R_S(h)+\eta .
\tag{6.5}
$$
:::

Quy tắc ERM chọn $\hat h_S$ từ mẫu, nên $\hat h_S$ là một hàm ngẫu nhiên. Mệnh đề 11.3 là trường hợp riêng của ERM với mất mát $-\log p_\theta(x)$ trên lớp các mô hình xác suất, trong đó $p_\theta$ là hàm khối hoặc mật độ của Bài 11. Với mất mát $0$–$1$, ERM cực tiểu hóa tỉ lệ phân loại sai trên mẫu, một bài toán khác với cực tiểu hóa entropy chéo.

Nghiệm gần đúng (6.5) chỉ dùng cận dưới đúng, nên không cần cực tiểu đạt được. Với dữ liệu của Ví dụ 12.5 và $\eta>0$, mọi $w\ge\log(1/\eta)$ cho $\hat L_2(w)=\log(1+e^{-w})\le e^{-w}\le\eta$, tức là một nghiệm gần đúng mức $\eta$, dù không có nghiệm chính xác.

Ví dụ sau cho thấy một nghiệm ERM chính xác vẫn có thể có rủi ro kỳ vọng khác xa rủi ro thực nghiệm.

::: example Ví dụ 12.7 (Hàm ghi nhớ trên nhãn nhiễu)
**Phân phối và lớp.** $X\sim\operatorname{Uniform}[0,1]$ và $Y\sim\operatorname{Bernoulli}(\frac12)$ độc lập với $X$. Lớp $\mathcal H$ gồm mọi hàm đo được $[0,1]\to\{0,1\}$; mất mát $0$–$1$; cỡ mẫu $n$.

**Hàm chọn từ mẫu.** Với xác suất $1$, các đầu vào huấn luyện khác nhau. Chọn $\hat h_S$ trả lại nhãn đã quan sát tại từng $x_i$ và trả $0$ tại mọi điểm khác. Hàm này đo được và $\hat R_S(\hat h_S)=0$, nên nó là một nghiệm ERM.

**Rủi ro kỳ vọng.** Với quan sát mới độc lập với $S$, nhãn $Y$ vẫn là đồng xu công bằng khi biết cả $X$ và $S$. Bất kể $\hat h_S(X)$ bằng bao nhiêu, xác suất sai bằng $\frac12$, nên $R(\hat h_S)=\frac12$.

**Kiểm tra lại.** Với mọi $h$ cố định, $\mathbb E_S[\hat R_S(h)]=R(h)=\frac12$. Với hàm chọn từ mẫu, $\mathbb E_S[\hat R_S(\hat h_S)]=0$ còn $\mathbb E_S[R(\hat h_S)]=\frac12$.

**Diễn giải.** Hiệu $R(\hat h_S)-\hat R_S(\hat h_S)$ được gọi là *khoảng cách tổng quát hóa* (generalization gap; xem Murphy (2022), §5.4.1.1). Ở đây hiệu này bằng $\frac12$ vì ta dùng chính nhãn để chọn hàm; đó là lý do không đo chất lượng của hàm trên chính tập huấn luyện đã dùng để chọn nó, như câu hỏi ở Mục 6.1. Trong ví dụ này mọi bộ phân loại có rủi ro $\frac12$, nên rủi ro của $\hat h_S$ không vượt rủi ro Bayes; chỉ đánh giá trên tập huấn luyện là sai lệch.
:::

### 6.4. Rủi ro chính xác của lớp ngưỡng

Trong Ví dụ 12.1, phân phối đích đã biết, nên ta tính được chính xác cả hai loại rủi ro của mọi ngưỡng. Một cách trực quan, ngưỡng $t$ chỉ phân loại khác ngưỡng thật $0$ trên đoạn nằm giữa $t$ và $0$, và phân phối đều đổi độ dài đoạn đó thành xác suất. Mô tả này chưa tính đến dấu bất đẳng thức tại ngưỡng, vốn quyết định nhãn của từng điểm trên mẫu hữu hạn.

::: proposition Mệnh đề 12.11 (Rủi ro và tập nghiệm ERM của lớp ngưỡng) — chứng minh đầy đủ
**Giả thiết.**
- **Phân phối đích.** $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$.
- **Lớp giả thuyết.** $\mathcal H_\uparrow=\{h_t:\ t\in\mathbb R\}$, $h_t(x)=\mathbf 1_{\{x\ge t\}}$; mất mát $0$–$1$.
- **Mẫu.** $(x_1,y_1),\ldots,(x_n,y_n)$ với $y_i=\mathbf 1_{\{x_i\ge0\}}$, có ít nhất một $x_i<0$ và một $x_i\ge0$. Đặt $a=\max\{x_i:\ x_i<0\}$ và $b=\min\{x_i:\ x_i\ge0\}$.

**Kết luận.**
$$
\begin{aligned}
R(h_t)&=\frac{\min\{\lvert t\rvert,1\}}2,\\
t&\in\mathbb R,
\end{aligned}
\tag{6.6}
$$
và tập nghiệm ERM là
$$
\bigl\{h_t:\ a<t\le b\bigr\},
\tag{6.7}
$$
với rủi ro thực nghiệm cực tiểu bằng $0$.
:::

::: proof Chứng minh Mệnh đề 12.11
**Lộ trình.** Xác định đoạn mà $h_t$ khác nhãn thật rồi tích phân mật độ; với mẫu, tìm điều kiện để mỗi điểm được phân loại đúng.

**Bước 1 (rủi ro kỳ vọng).** Mật độ của $X$ bằng $\frac12$ trên $[-1,1]$. Xét ba trường hợp.
- $0<t\le1$: $h_t(x)\ne\mathbf 1_{\{x\ge0\}}$ khi và chỉ khi $0\le x<t$, nên $R(h_t)=\int_0^t\frac12\,dx=\frac t2$.
- $-1\le t<0$: $h_t(x)\ne\mathbf 1_{\{x\ge0\}}$ khi và chỉ khi $t\le x<0$, nên $R(h_t)=\int_t^0\frac12\,dx=-\frac t2$.
- $t=0$: $h_0$ trùng nhãn thật, nên $R(h_0)=0$.

Khi $t>1$, $h_t\equiv0$ trên $[-1,1]$ và sai trên $[0,1]$, nên $R(h_t)=\frac12$; khi $t<-1$, $h_t\equiv1$ trên $[-1,1]$ và sai trên $[-1,0)$, nên $R(h_t)=\frac12$. Gộp các trường hợp cho (6.6).

**Bước 2 (điểm âm).** Mỗi $x_i<0$ có nhãn $0$ và được phân loại đúng khi và chỉ khi $x_i<t$. Mọi điểm âm đúng khi và chỉ khi $t>a$.

**Bước 3 (điểm không âm).** Mỗi $x_i\ge0$ có nhãn $1$ và được phân loại đúng khi và chỉ khi $x_i\ge t$. Mọi điểm không âm đúng khi và chỉ khi $t\le b$.

**Bước 4 (tập nghiệm).** Vì $a<0\le b$, khoảng $(a,b]$ khác rỗng. Mỗi $t\in(a,b]$ cho $\hat R_S(h_t)=0$, là giá trị nhỏ nhất vì mất mát không âm. Mỗi $t\notin(a,b]$ sai ít nhất một nhãn, nên $\hat R_S(h_t)\ge\frac1n>0$. Do đó tập nghiệm ERM là (6.7). $\square$

Như vậy, ERM trên lớp ngưỡng chỉ xác định ngưỡng đến một khoảng, và các ngưỡng trong khoảng đó có rủi ro kỳ vọng khác nhau.
:::

::: example Ví dụ 12.8 (Hai loại rủi ro của các ngưỡng trên mẫu bốn điểm)
**Dữ kiện (Ví dụ 12.1).** $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, lớp $\mathcal H_\uparrow$, mất mát $0$–$1$, tập huấn luyện
- $(x_1,y_1)=(-0{,}8;\,0)$
- $(x_2,y_2)=(-0{,}2;\,0)$
- $(x_3,y_3)=(0{,}3;\,1)$
- $(x_4,y_4)=(0{,}7;\,1)$

**Tập nghiệm ERM.** Theo Mệnh đề 12.11 với $a=-0{,}2$ và $b=0{,}3$, tập nghiệm ERM gồm các $h_t$ với $-0{,}2<t\le0{,}3$.

**Hai loại rủi ro.** Rủi ro kỳ vọng theo (6.6); rủi ro thực nghiệm đếm số nhãn sai trong bốn quan sát.

| Ngưỡng $t$ | Nhãn sai trên mẫu | $\hat R_S(h_t)$ | $R(h_t)$ |
|---|---|---|---|
| $-0{,}2$ | $x_2=-0{,}2$ | $\frac14$ | $0{,}1$ |
| $-0{,}1$ | không có | $0$ | $0{,}05$ |
| $0$ | không có | $0$ | $0$ |
| $0{,}3$ | không có | $0$ | $0{,}15$ |
| $0{,}4$ | $x_3=0{,}3$ | $\frac14$ | $0{,}2$ |

**Kiểm tra đầu mút.** Tại $t=-0{,}2$, điểm $x_2=-0{,}2$ thỏa $x_2\ge t$ nên bị dự đoán thành $1$; đầu trái không thuộc tập nghiệm. Tại $t=0{,}3$, điểm $x_3=0{,}3$ vẫn được dự đoán là $1$; đầu phải thuộc tập nghiệm.

**Diễn giải.** Ba ngưỡng $-0{,}1$; $0$; $0{,}3$ cùng có rủi ro thực nghiệm $0$, nhưng rủi ro kỳ vọng lần lượt là $0{,}05$; $0$; $0{,}15$. Mẫu không đủ thông tin để phân biệt chúng.
:::

Hình 12.1 vẽ hai đường của bảng trên: rủi ro kỳ vọng (6.6) có dạng chữ V với đỉnh tại $t=0$, còn rủi ro thực nghiệm là hàm bậc thang, bằng $0$ trên toàn khoảng $(-0{,}2;\,0{,}3]$. Trong khoảng đó, đường chữ V vẫn thay đổi từ $0$ đến $0{,}15$.

![Rủi ro kỳ vọng dạng chữ V bằng trị tuyệt đối của t chia 2 và rủi ro thực nghiệm dạng bậc thang của ngưỡng một chiều trên bốn đầu vào âm 0,8; âm 0,2; 0,3; 0,7; rủi ro thực nghiệm bằng 0 trên khoảng từ âm 0,2 (không kể) đến 0,3 (kể cả), trong khi rủi ro kỳ vọng trên khoảng đó thay đổi từ 0 đến 0,15.](img/lec-12/threshold-risks.svg)

*Hình 12.1. Với phân phối đều và bốn đầu vào của Ví dụ 12.1, rủi ro kỳ vọng đạt cực tiểu tại $t=0$, còn rủi ro thực nghiệm bằng $0$ trên $(-0{,}2;\,0{,}3]$. Vùng rủi ro thực nghiệm bằng $0$ chứa các bộ phân loại có xác suất sai khác nhau.*

Trong học máy, Mệnh đề 12.11 là trường hợp tối ưu thực nghiệm đã giải trọn vẹn nhưng lựa chọn giữa các nghiệm vẫn ảnh hưởng chất lượng dự đoán. Quy tắc phá hòa (chọn $t$ nhỏ nhất hay lớn nhất) không tạo thêm thông tin về vị trí ngưỡng thật.

Như vậy, Định nghĩa 12.8 tách tiêu chuẩn tính được từ mẫu khỏi tiêu chuẩn cho dữ liệu mới, Mệnh đề 12.9 cho chuẩn Bayes, Định nghĩa 12.10 chọn hàm bằng rủi ro thực nghiệm, và Ví dụ 12.7 cùng Mệnh đề 12.11 cho thấy hàm chọn từ mẫu có thể có rủi ro kỳ vọng khác xa rủi ro thực nghiệm. Tuy nhiên, Định lý 05c.52 chỉ kiểm soát độ lệch của một hàm cố định. Trong Mục 7, chúng ta kiểm soát đồng thời độ lệch của mọi hàm mà quy tắc học có thể chọn.

## 7. Hội tụ đều và rủi ro dư của ERM

Trong Ví dụ 12.7, quy tắc ERM chọn $\hat h_S$ sau khi thấy $S$, và độ lệch giữa hai rủi ro của nó bằng $\frac12$ với mọi cỡ mẫu. Vì vậy chúng ta cần một biến cố trên đó mọi hàm trong lớp, và do đó cả hàm được chọn, có rủi ro thực nghiệm gần rủi ro kỳ vọng.

Một cách trực quan, lớp càng chứa nhiều cách giải thích dữ liệu thì càng có nhiều cơ hội để một hàm có rủi ro thực nghiệm thấp chỉ do ngẫu nhiên của mẫu, nên kiểm soát đồng thời phải trả giá theo độ lớn của lớp. Để đo cái giá đó, ta bắt đầu từ cận cho một hàm cố định.

### 7.1. Độ lệch tại một hàm cố định

Cận sau được viết lại từ Bài 05c với ký hiệu rủi ro của bài.

::: lemma Nhắc lại (Định lý 05c.52, viết theo ký hiệu rủi ro)
**Giả thiết.** (G1) lấy mẫu i.i.d.; (G2) $\ell(a,y)\in[0,1]$ với mọi $a,y$; $h:\mathcal X\to\mathcal A$ là hàm đo được, xác định trước khi lấy mẫu.

**Bảo đảm.** Với mọi $\varepsilon>0$,
$$
\begin{aligned}
&\mathbb P_S\bigl(\lvert\hat R_S(h)-R(h)\rvert\ge\varepsilon\bigr)\\
&\quad\le2e^{-2n\varepsilon^2}.
\end{aligned}
\tag{7.1}
$$
:::

Bất đẳng thức (7.1) là Định lý 05c.52 với quan sát $\xi=(X,Y)$, tham số $\theta$ thay bằng hàm $h$ và $N=n$.

::: proof Suy ra (7.1) từ Định lý 05c.47
- **Các mất mát độc lập.** Đặt $Z_i=\ell(h(X_i),Y_i)$. Vì $h$ cố định, $Z_i$ là cùng một hàm đo được của cặp $(X_i,Y_i)$, nên các $Z_i$ độc lập, cùng phân phối, $\mathbb EZ_i=R(h)$ và $\bar Z_n=\hat R_S(h)$.
- **Khoảng chặn trên mọi kết cục.** (G2) cho $0\le Z_i\le1$ trên mọi kết cục, đúng dạng giả thiết của Định lý 05c.47 với $[m_i,M_i]=[0,1]$.
- **Thay số.** $V=\sum_{i=1}^n(1-0)^2=n$, nên vế phải của Hoeffding hai phía bằng $2\exp(-2n^2\varepsilon^2/n)=2e^{-2n\varepsilon^2}$.

Bài 05c chứng minh Định lý 05c.47 cho biến rời rạc. Với mất mát $0$–$1$, $Z_i\in\{0,1\}$ là biến rời rạc nên chứng minh đó áp dụng nguyên vẹn. Với mất mát bị chặn tổng quát, ta dùng phiên bản của bất đẳng thức Hoeffding cho biến bị chặn bất kỳ (Shalev-Shwartz và Ben-David, 2014, Bổ đề 4.5) mà không chứng minh lại, như Bài 05c đã làm với biến có mật độ. Vì $\{\lvert\hat R_S(h)-R(h)\rvert>\varepsilon\}\subseteq\{\lvert\hat R_S(h)-R(h)\rvert\ge\varepsilon\}$, (7.1) cũng chặn xác suất của biến cố với dấu $>$. $\square$
:::

Giả thiết "$h$ xác định trước khi lấy mẫu" là chỗ lập luận hỏng khi $h=\hat h_S$: khi đó $Z_i=\ell(\hat h_S(X_i),Y_i)$ phụ thuộc mọi quan sát qua $\hat h_S$, nên các $Z_i$ không còn độc lập.

### 7.2. Độ lệch đều

Định nghĩa sau đặt tên cho biến cố mà mọi hàm của lớp đồng thời có hai rủi ro gần nhau.

::: definition Định nghĩa 12.12 (Độ lệch đều và tính hội tụ đều)
Cho lớp $\mathcal H$ và mất mát $\ell$ sao cho mọi $R(h)$ và $\hat R_S(h)$ hữu hạn. *Độ lệch đều* (uniform deviation) trên mẫu $S$ là
$$
\Delta_S=\sup_{h\in\mathcal H}\bigl\lvert R(h)-\hat R_S(h)\bigr\rvert .
\tag{7.2}
$$
Biến cố $\{\Delta_S\le\varepsilon\}$ được gọi là *biến cố xấp xỉ đều* ở mức $\varepsilon$. Lớp $\mathcal H$ có *tính hội tụ đều* (uniform convergence) nếu với mọi $\varepsilon,\delta\in(0,1)$ tồn tại cỡ mẫu $N_{\mathcal H}(\varepsilon,\delta)$ sao cho với mọi phân phối đích $P$ và mọi $n\ge N_{\mathcal H}(\varepsilon,\delta)$,
$$
\mathbb P_S(\Delta_S\le\varepsilon)\ge1-\delta .
\tag{7.3}
$$
Các biến cố trên được giả sử đo được; điều này đúng khi $\mathcal H$ hữu hạn.
:::

Trong (7.3), $P$ cố định trước, rồi xác suất lấy theo $S\sim P^n$; cỡ mẫu $N_{\mathcal H}(\varepsilon,\delta)$ phụ thuộc lớp, $\varepsilon$ và $\delta$ nhưng không phụ thuộc $P$. So với (7.1), Định nghĩa 12.12 kiểm soát một biến cố chung cho cả lớp. Trên biến cố $\{\Delta_S\le\varepsilon\}$, mọi $h\in\mathcal H$ thỏa $\lvert R(h)-\hat R_S(h)\rvert\le\varepsilon$, nên $\hat h_S$ cũng thỏa, dù quy tắc chọn phụ thuộc mẫu (Shalev-Shwartz và Ben-David, 2014, Định nghĩa 4.1 và 4.3).

::: example Ví dụ 12.9 (Độ lệch đều của ba lớp trên mẫu bốn điểm)
**Dữ kiện (Ví dụ 12.1).** $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, mất mát $0$–$1$, tập huấn luyện $(-0{,}8;\,0)$, $(-0{,}2;\,0)$, $(0{,}3;\,1)$, $(0{,}7;\,1)$. Cần tính $\Delta_S$ cho ba lớp $\mathcal H_{\mathrm c}$, $\mathcal H_\uparrow$, $\mathcal H_{\mathrm{all}}$.

**Lớp hai hàm hằng.** Hàm hằng $0$ sai khi $Y=1$, nên $R=\frac12$, và sai tại $x_3,x_4$, nên $\hat R_S=\frac24=\frac12$. Tương tự, hàm hằng $1$ có $R=\hat R_S=\frac12$. Do đó $\Delta_S=0$.

**Lớp ngưỡng.** Giữa hai điểm mẫu liên tiếp, $\hat R_S(h_t)$ không đổi, còn $R(h_t)$ cho bởi (6.6) đơn điệu trên mỗi khoảng không chứa $0$ và có dạng chữ V trên khoảng chứa $0$. Do đó cận trên đúng của $\lvert R-\hat R_S\rvert$ trên mỗi khoảng đạt hoặc được tiến tới tại một đầu mút. Phụ lục A liệt kê các khoảng. Giá trị lớn nhất bằng $0{,}15$, đạt tại hai ngưỡng:
$$
\begin{aligned}
t=0{,}3:&\quad\lvert R-\hat R_S\rvert=\lvert0{,}15-0\rvert\\
&\quad=0{,}15,\\
t=-0{,}2:&\quad\lvert R-\hat R_S\rvert=\lvert0{,}1-0{,}25\rvert\\
&\quad=0{,}15 .
\end{aligned}
$$
Do đó $\Delta_S=0{,}15$.

**Lớp mọi hàm đo được.** Hai loại rủi ro đều thuộc $[0,1]$, nên $\Delta_S\le1$. Xét hàm $\tilde h$ trùng $\mathbf 1_{\{x\ge0\}}$ ngoài bốn điểm mẫu và đổi nhãn tại bốn điểm đó. Hàm $\tilde h$ sai cả bốn nhãn huấn luyện, nên $\hat R_S(\tilde h)=1$, nhưng chỉ khác nhãn thật trên một tập xác suất $0$, nên $R(\tilde h)=0$. Do đó $\Delta_S=1$.

**Kiểm tra lại.** Vì $\mathcal H_{\mathrm c}\subset\mathcal H_\uparrow\subset\mathcal H_{\mathrm{all}}$, cận trên đúng lấy trên lớp lớn hơn không nhỏ hơn: $0\le0{,}15\le1$.

**Diễn giải.** Trên cùng một mẫu, lớp càng linh hoạt thì độ lệch đều càng lớn. Lớp mọi hàm đo được chứa một hàm mà rủi ro thực nghiệm sai lệch hoàn toàn so với rủi ro kỳ vọng.
:::

### 7.3. Hội tụ đều cho lớp hữu hạn

Kết quả sau kết hợp (7.1) với bất đẳng thức hợp. Murphy (2022), §5.4.4.1 (Định lý 5.4.1), chứng minh cùng cận cho mất mát $0$–$1$; Shalev-Shwartz và Ben-David (2014), §4.2, chứng minh cho mất mát bị chặn tổng quát.

::: theorem Định lý 12.13 (Hội tụ đều cho lớp hữu hạn) — chứng minh đầy đủ
**Giả thiết.**
- **Lấy mẫu.** (G1): $S\sim P^n$.
- **Mất mát.** (G2): $\ell(a,y)\in[0,1]$ với mọi $a,y$.
- **Lớp giả thuyết.** (G3): $\mathcal H$ gồm $M\ge1$ hàm đo được, cố định trước khi lấy mẫu.

**Bảo đảm.** Với mọi $\varepsilon>0$,
$$
\mathbb P_S(\Delta_S>\varepsilon)\le2Me^{-2n\varepsilon^2}.
\tag{7.4}
$$
Nói riêng, với $\delta\in(0,1)$ và
$$
\varepsilon_n(M,\delta)=\sqrt{\frac{\log(2M/\delta)}{2n}},
\tag{7.5}
$$
với xác suất ít nhất $1-\delta$ theo $S\sim P^n$, đồng thời với mọi $h\in\mathcal H$, $\lvert R(h)-\hat R_S(h)\rvert\le\varepsilon_n(M,\delta)$. Đặc biệt, $\mathcal H$ có tính hội tụ đều với
$$
N_{\mathcal H}(\varepsilon,\delta)=\Bigl\lceil\frac{\log(2M/\delta)}{2\varepsilon^2}\Bigr\rceil .
$$
Cận phụ thuộc $n$, $\log M$ và $\log(1/\delta)$, không phụ thuộc $P$.
:::

::: proof Chứng minh Định lý 12.13
**Lộ trình.** Liệt kê một biến cố xấu cho mỗi $h$, chặn mỗi biến cố bằng (7.1), rồi cộng lại bằng bất đẳng thức hợp.

**Bước 1 (biến cố xấu).** Với mỗi $h\in\mathcal H$, đặt $E_h=\{\lvert R(h)-\hat R_S(h)\rvert>\varepsilon\}$. Vì $\mathcal H$ hữu hạn, cận trên đúng trong (7.2) là giá trị lớn nhất của $M$ số, nên $\Delta_S>\varepsilon$ khi và chỉ khi có ít nhất một $h$ với $\lvert R(h)-\hat R_S(h)\rvert>\varepsilon$, tức
$$
\{\Delta_S>\varepsilon\}=\bigcup_{h\in\mathcal H}E_h .
$$
Mỗi $E_h$ là biến cố, nên hợp hữu hạn của chúng cũng là biến cố.

**Bước 2 (từng biến cố).** Mỗi $h\in\mathcal H$ cố định trước khi lấy mẫu theo (G3), nên (7.1) áp dụng; vì $E_h\subseteq\{\lvert R(h)-\hat R_S(h)\rvert\ge\varepsilon\}$, ta có $\mathbb P_S(E_h)\le2e^{-2n\varepsilon^2}$.

**Bước 3 (bất đẳng thức hợp cho $M$ biến cố, mở rộng Hệ quả 10.7).** Với các biến cố $E_1,\ldots,E_M$, ta chứng minh $\mathbb P(\bigcup_{j=1}^kE_j)\le\sum_{j=1}^k\mathbb P(E_j)$ bằng quy nạp theo $k$. Với $k=1$, hai vế bằng nhau. Giả sử khẳng định đúng với $k$. Áp Hệ quả 10.7 cho hai biến cố $\bigcup_{j=1}^kE_j$ và $E_{k+1}$, rồi dùng giả thiết quy nạp:
$$
\begin{aligned}
\mathbb P\Bigl(\bigcup_{j=1}^{k+1}E_j\Bigr)&\le\mathbb P\Bigl(\bigcup_{j=1}^kE_j\Bigr)+\mathbb P(E_{k+1})\\
&\le\sum_{j=1}^{k+1}\mathbb P(E_j).
\end{aligned}
$$
Bất đẳng thức thứ nhất do Hệ quả 10.7, bất đẳng thức thứ hai do giả thiết quy nạp.
Áp dụng cho các $E_h$ và dùng Bước 1, Bước 2:
$$
\begin{aligned}
\mathbb P_S(\Delta_S>\varepsilon)&=\mathbb P_S\Bigl(\bigcup_{h\in\mathcal H}E_h\Bigr)\\
&\le\sum_{h\in\mathcal H}\mathbb P_S(E_h)\\
&\le2Me^{-2n\varepsilon^2},
\end{aligned}
$$
tức (7.4). Dòng thứ nhất do Bước 1, dòng thứ hai do bất đẳng thức hợp, dòng thứ ba do Bước 2.

**Bước 4 (dạng cỡ mẫu).** Hàm $\log$ tăng chặt, nên
$$
\begin{aligned}
2Me^{-2n\varepsilon^2}\le\delta&\iff-2n\varepsilon^2\\
&\qquad\le\log\frac{\delta}{2M}\\
&\iff n\ge\frac{\log(2M/\delta)}{2\varepsilon^2}.
\end{aligned}
$$
Với $\varepsilon=\varepsilon_n(M,\delta)$ theo (7.5), $2n\varepsilon^2=\log(2M/\delta)$, nên vế phải của (7.4) bằng $\delta$ và $\mathbb P_S(\Delta_S\le\varepsilon_n)=1-\mathbb P_S(\Delta_S>\varepsilon_n)\ge1-\delta$. Với $n\ge N_{\mathcal H}(\varepsilon,\delta)$, điều kiện tương đương ở dòng thứ hai cho $\mathbb P_S(\Delta_S>\varepsilon)\le\delta$, tức (7.3). $\square$

Như vậy, chọn trong $M$ hàm định trước chỉ làm cận tăng theo $\log M$, nên một danh sách lớn các mô hình vẫn được kiểm soát với cỡ mẫu vừa phải.
:::

Trong học máy, Định lý 12.13 cho phép dùng tập huấn luyện để chọn trong một danh sách mô hình định trước, chẳng hạn một lưới hữu hạn các giá trị siêu tham số, mà vẫn kiểm soát độ lệch của mô hình được chọn. Theo Murphy (2022), §5.4.4.1, khoảng cách giữa rủi ro kỳ vọng và rủi ro thực nghiệm của hàm được chọn tăng theo kích thước lớp và giảm theo cỡ mẫu. Với $M=1$, (7.4) trở về (7.1) với dấu $>$; với $M>1$, phạm vi đồng thời rộng hơn nên cận lớn hơn một thừa số $M$. Ví dụ sau đọc Định lý 12.13 bằng số.

::: example Ví dụ 12.10 (Cỡ mẫu cho một lớp 100 bộ phân loại)
**Bài toán.** Lớp gồm $M=100$ bộ phân loại cố định, mất mát $0$–$1$, dữ liệu i.i.d. Cần độ lệch của mọi bộ phân loại không quá $\varepsilon=0{,}05$ với xác suất ít nhất $0{,}95$, tức $\delta=0{,}05$.

**Tính $\log(2M/\delta)$.**
$$
\log\frac{2\cdot100}{0{,}05}=\log4000\approx8{,}294 .
$$

**Cỡ mẫu đủ.** Theo Định lý 12.13,
$$
n\ge\frac{\log4000}{2\cdot0{,}05^2}=\frac{8{,}294}{0{,}005}\approx1658{,}8,
$$
nên $N_{\mathcal H}(0{,}05;\,0{,}05)=\lceil1658{,}8\rceil=1659$.

**Kiểm tra lại.** Với $n=1659$, vế phải của (7.4) bằng $200e^{-2\cdot1659\cdot0{,}0025}\approx0{,}04995\le0{,}05$; với $n=1658$, nó bằng $\approx0{,}05020>0{,}05$.

**Cỡ mẫu cho trước.** Với $n=1000$, (7.5) cho
$$
\varepsilon_{1000}(100;\,0{,}05)=\sqrt{\frac{8{,}294}{2000}}\approx0{,}0644 .
$$

**Diễn giải.** Tăng $n$ làm cận nhỏ đi theo $1/\sqrt n$; nhân $M$ lên $10$ lần chỉ cộng thêm $\log10\approx2{,}30$ vào tử số $\log(2M/\delta)$. Số $1659$ đủ cho bất đẳng thức này; cỡ mẫu nhỏ nhất cần thiết có thể nhỏ hơn.
:::

### 7.4. Rủi ro dư của nghiệm ERM gần đúng

Biến cố xấp xỉ đều so sánh mỗi hàm với chính nó trên hai loại rủi ro. Để đánh giá việc học, ta còn phải so sánh hàm được chọn với hàm tốt nhất trong lớp, tức chặn *rủi ro dư* (excess risk) $R(\hat h_S)-R_{\mathcal H}^*$. Bổ đề sau dùng tính tối ưu (6.5) của Định nghĩa 12.10 (Shalev-Shwartz và Ben-David, 2014, Bổ đề 4.2).

::: lemma Bổ đề 12.14 (Rủi ro dư trên biến cố xấp xỉ đều) — chứng minh đầy đủ
**Giả thiết.** Trên một mẫu $S$:
- **Rủi ro.** Mọi $R(h)$ và $\hat R_S(h)$, $h\in\mathcal H$, hữu hạn.
- **Độ lệch đều.** $\Delta_S\le\varepsilon$.
- **Hàm chọn.** $\hat h_S\in\mathcal H$ là nghiệm ERM gần đúng mức $\eta\ge0$ theo (6.5).

**Bảo đảm.** Tất định: trên mọi mẫu thỏa giả thiết,
$$
R(\hat h_S)\le R_{\mathcal H}^*+2\varepsilon+\eta .
\tag{7.6}
$$
:::

::: proof Chứng minh Bổ đề 12.14
**Lộ trình.** So sánh $\hat h_S$ với một hàm bất kỳ $h\in\mathcal H$, dùng độ lệch đều hai lần, rồi lấy cận dưới đúng theo $h$.

**Bước 1 (so với một hàm bất kỳ).** Với mọi $h\in\mathcal H$,
$$
\begin{aligned}
R(\hat h_S)&\le\hat R_S(\hat h_S)+\varepsilon\\
&\le\inf_{h'\in\mathcal H}\hat R_S(h')+\eta+\varepsilon\\
&\le\hat R_S(h)+\eta+\varepsilon\\
&\le R(h)+2\varepsilon+\eta.
\end{aligned}
$$
Dòng thứ nhất dùng $\Delta_S\le\varepsilon$ cho $\hat h_S$, dòng thứ hai dùng (6.5), dòng thứ ba dùng định nghĩa cận dưới đúng, dòng thứ tư dùng $\Delta_S\le\varepsilon$ cho $h$.

**Bước 2 (cận dưới đúng).** Vế trái không phụ thuộc $h$. Lấy cận dưới đúng của vế phải theo $h\in\mathcal H$ cho (7.6). $\square$

Bổ đề không cần $R_{\mathcal H}^*$ đạt được tại một hàm của lớp: bước so sánh dùng một $h$ bất kỳ rồi mới lấy cận dưới đúng.
:::

Kết hợp Bổ đề 12.14 với Định lý 12.13 cho bảo đảm xác suất cao cho ERM trên lớp hữu hạn.

::: corollary Hệ quả 12.15 (Rủi ro dư của ERM trên lớp hữu hạn) — chứng minh đầy đủ
**Giả thiết.** Giả thiết của Định lý 12.13, và với mọi mẫu $S$, $\hat h_S$ là nghiệm ERM gần đúng mức $\eta\ge0$.

**Bảo đảm.** Với xác suất ít nhất $1-\delta$ theo $S\sim P^n$,
$$
\begin{aligned}
&R(\hat h_S)-R_{\mathcal H}^*\\
&\quad\le2\varepsilon_n(M,\delta)+\eta,
\end{aligned}
\tag{7.7}
$$
với $\varepsilon_n(M,\delta)$ cho bởi (7.5). Đặc biệt, nếu $\eta=0$ và $n\ge2\log(2M/\delta)/\varepsilon^2$ thì
$$
\mathbb P_S\bigl(R(\hat h_S)\le R_{\mathcal H}^*+\varepsilon\bigr)\ge1-\delta .
$$
:::

::: proof Chứng minh Hệ quả 12.15
**Lộ trình.** Lấy biến cố xấp xỉ đều của Định lý 12.13, áp Bổ đề 12.14 trên biến cố đó, rồi giải điều kiện cỡ mẫu.

**Bước 1 (biến cố tốt).** Theo Định lý 12.13, biến cố $G=\{\Delta_S\le\varepsilon_n(M,\delta)\}$ có xác suất ít nhất $1-\delta$.

**Bước 2 (trên biến cố tốt).** Với mỗi mẫu thuộc $G$, Bổ đề 12.14 với $\varepsilon=\varepsilon_n(M,\delta)$ cho (7.7). Do đó biến cố (7.7) chứa $G$ và có xác suất ít nhất $1-\delta$.

**Bước 3 (cỡ mẫu).** Với $\eta=0$, (7.7) cho $R(\hat h_S)-R_{\mathcal H}^*\le\varepsilon$ khi $2\varepsilon_n(M,\delta)\le\varepsilon$. Bình phương hai vế không âm:
$$
\begin{aligned}
&2\varepsilon_n(M,\delta)\le\varepsilon\\
&\iff\frac{\log(2M/\delta)}{2n}\le\frac{\varepsilon^2}4\\
&\iff n\ge\frac{2\log(2M/\delta)}{\varepsilon^2}.
\end{aligned}
$$
$\square$

Như vậy, với $n=1000$, $M=100$ và $\delta=0{,}05$, ERM chính xác có rủi ro dư so với lớp không quá $2\cdot0{,}0644\approx0{,}129$ với xác suất ít nhất $0{,}95$.
:::

Trong học máy, Hệ quả 12.15 tách phần do tối ưu hóa ($\eta$) khỏi phần do lấy mẫu ($2\varepsilon_n$). Giải tối ưu chính xác hơn làm giảm $\eta$ nhưng không làm giảm $\varepsilon_n$, và cả hai đều không cải thiện lớp giả thuyết.

### 7.5. Ba nguồn sai số

Hệ quả 12.15 so sánh với hàm tốt nhất trong lớp. Để thấy cái giá của việc chọn lớp, ta so sánh thêm với rủi ro Bayes $R^*$ của Định nghĩa 12.8. Murphy (2022), §5.4.1.1, tách hiệu này thành sai số xấp xỉ và sai số ước lượng; mệnh đề sau thêm số hạng sai số tối ưu hóa.

::: proposition Mệnh đề 12.16 (Cận rủi ro dư theo ba nguồn sai số) — chứng minh đầy đủ
**Giả thiết.**
- **Mất mát.** (G2).
- **Lớp giả thuyết.** $\mathcal H$, một lớp các hàm dự đoán đo được.
- **Hàm chọn.** $\hat h_S\in\mathcal H$, với *sai số tối ưu hóa* (optimization error)
$$
\eta_S=\hat R_S(\hat h_S)-\inf_{h\in\mathcal H}\hat R_S(h)\ge0 .
$$

**Bảo đảm.** Tất định: trên mọi mẫu $S$,
$$
\begin{aligned}
&R(\hat h_S)-R^*\\
&\quad\le\bigl(R_{\mathcal H}^*-R^*\bigr)+2\Delta_S+\eta_S .
\end{aligned}
\tag{7.8}
$$
Ba số hạng ở vế phải đều không âm:
- $R_{\mathcal H}^*-R^*$ là *sai số xấp xỉ* (approximation error) của lớp;
- $2\Delta_S$ chặn *sai số ước lượng* (estimation error, còn gọi là sai số do lấy mẫu), phần rủi ro dư sinh ra vì hàm được chọn từ một mẫu hữu hạn thay vì từ phân phối đích;
- $\eta_S$ là sai số tối ưu hóa.
:::

::: proof Chứng minh Mệnh đề 12.16
**Lộ trình.** Coi $\hat h_S$ là nghiệm ERM gần đúng mức $\eta_S$, áp Bổ đề 12.14 với $\varepsilon=\Delta_S$, rồi trừ $R^*$.

**Bước 1 (áp Bổ đề 12.14).** Theo (G2), mọi rủi ro thuộc $[0,1]$, nên hữu hạn và $\Delta_S\le1$. Theo định nghĩa của $\eta_S$, $\hat h_S$ là nghiệm ERM gần đúng mức $\eta_S$. Bổ đề 12.14 với $\varepsilon=\Delta_S$ và $\eta=\eta_S$ cho $R(\hat h_S)\le R_{\mathcal H}^*+2\Delta_S+\eta_S$.

**Bước 2 (trừ $R^*$).** Trừ $R^*$ ở hai vế cho (7.8).

**Bước 3 (không âm).** $R_{\mathcal H}^*\ge R^*$ vì cận dưới đúng trên lớp con không nhỏ hơn cận dưới đúng trên mọi hàm đo được; $\Delta_S\ge0$ vì là cận trên đúng của các trị tuyệt đối; $\eta_S\ge0$ vì $\hat R_S(\hat h_S)\ge\inf_{h\in\mathcal H}\hat R_S(h)$. $\square$

Như vậy, mỗi số hạng của (7.8) ứng với một câu hỏi: lớp có biểu diễn được lời giải tốt không, dữ liệu có đủ để chọn lời giải tốt không, và bộ tối ưu có đạt mục tiêu thực nghiệm không.
:::

Trong học máy, mở rộng lớp có thể làm giảm sai số xấp xỉ nhưng làm $\Delta_S$ lớn hơn, còn tối ưu chính xác hơn chỉ làm giảm $\eta_S$. Nếu thay $\eta_S$ bằng hiệu $R(\hat h_S)-R(h_S)$ với một nghiệm ERM chính xác $h_S$, hiệu này có thể âm, nên không dùng được làm sai số tối ưu hóa không âm. Ví dụ sau tính ba số hạng trên ví dụ xuyên suốt.

::: example Ví dụ 12.11 (Ba nguồn sai số trên ví dụ cảm biến)
**Dữ kiện (Ví dụ 12.1, 12.9).** $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, mất mát $0$–$1$, tập huấn luyện bốn điểm $(-0{,}8;\,0)$, $(-0{,}2;\,0)$, $(0{,}3;\,1)$, $(0{,}7;\,1)$. Rủi ro Bayes $R^*=R(h_0)=0$. Độ lệch đều: $\Delta_S=0$ trên $\mathcal H_{\mathrm c}$, $0{,}15$ trên $\mathcal H_\uparrow$, $1$ trên $\mathcal H_{\mathrm{all}}$.

**Sai số xấp xỉ.** $R_{\mathcal H_{\mathrm c}}^*=\frac12$, còn $\mathcal H_\uparrow$ và $\mathcal H_{\mathrm{all}}$ chứa $h_0$, nên sai số xấp xỉ lần lượt là $\frac12$; $0$; $0$.

**Bốn hàm được chọn.**
- Trên $\mathcal H_{\mathrm c}$, hai hàm hằng cùng có $\hat R_S=\frac12$; ERM chọn một trong hai, $\eta_S=0$, $R=\frac12$.
- Trên $\mathcal H_\uparrow$, ERM phá hòa bằng ngưỡng lớn nhất chọn $h_{0{,}3}$: $\eta_S=0$, $R=0{,}15$.
- Trên $\mathcal H_\uparrow$, một bộ tối ưu dừng sớm tại $h_{0{,}4}$: $\hat R_S=\frac14$, nên $\eta_S=\frac14-0=\frac14$, và $R=0{,}2$.
- Trên $\mathcal H_{\mathrm{all}}$, ERM chọn hàm ghi nhớ $g$: $\eta_S=0$, $R=\frac12$.

**Đối chiếu với (7.8).**

| Lớp, hàm chọn | $R_{\mathcal H}^*-R^*$ | $2\Delta_S$ | $\eta_S$ | Vế phải | $R(\hat h_S)-R^*$ |
|---|---|---|---|---|---|
| $\mathcal H_{\mathrm c}$, hàm hằng | $0{,}5$ | $0$ | $0$ | $0{,}5$ | $0{,}5$ |
| $\mathcal H_\uparrow$, $h_{0{,}3}$ | $0$ | $0{,}3$ | $0$ | $0{,}3$ | $0{,}15$ |
| $\mathcal H_\uparrow$, $h_{0{,}4}$ | $0$ | $0{,}3$ | $0{,}25$ | $0{,}55$ | $0{,}2$ |
| $\mathcal H_{\mathrm{all}}$, $g$ | $0$ | $2$ | $0$ | $2$ | $0{,}5$ |

**Kiểm tra lại.** Trên mỗi dòng, cột cuối không vượt vế phải. Dòng đầu đạt dấu bằng: lớp hằng không có sai số do lấy mẫu trên mẫu này, nên toàn bộ rủi ro dư là sai số xấp xỉ.

**Diễn giải.** Mô hình không dùng đặc trưng có rủi ro dư $\frac12$ do sai số xấp xỉ. Mô hình quá linh hoạt có sai số xấp xỉ $0$, nhưng cận sai số ước lượng bằng $2$ không cho thông tin, và hàm ghi nhớ thực sự có rủi ro dư $\frac12$. Lớp ngưỡng nằm giữa: sai số xấp xỉ $0$ và cận sai số ước lượng $0{,}3$. Bộ tối ưu tốt hơn đưa $\eta_S$ về $0$, tức về một nghiệm ERM như dòng thứ hai, có rủi ro không quá $0{,}15$; nó không đổi hai cột đầu.
:::

Như vậy, Định lý 12.13 kiểm soát đồng thời mọi hàm của một lớp hữu hạn, Bổ đề 12.14 và Hệ quả 12.15 chuyển kiểm soát đó thành cận rủi ro dư cho ERM gần đúng, và Mệnh đề 12.16 tách rủi ro dư so với Bayes thành ba nguồn. Tuy nhiên, Định lý 12.13 cần $M$ hữu hạn, còn lớp ngưỡng $\mathcal H_\uparrow$ vô hạn. Trong Mục 8, chúng ta phát biểu yêu cầu học dưới dạng tham số độ chính xác và độ tin cậy, rồi đo độ phức tạp của lớp vô hạn bằng số chiều VC.

## 8. Học PAC và số chiều VC trên trục thực

Hệ quả 12.15 có dạng "với xác suất ít nhất $1-\delta$, rủi ro dư không quá $\varepsilon$". Phát biểu này chứa hai mức sai số khác nhau: $\varepsilon$ đo chất lượng của hàm học được, còn $\delta$ đo xác suất việc lấy mẫu dẫn tới một hàm kém.

### 8.1. Tham số độ chính xác và độ tin cậy

Định nghĩa sau tách hai mức $\varepsilon$, $\delta$ và đòi chúng đúng với mọi phân phối đích.

::: definition Định nghĩa 12.17 (Học PAC trong hai thiết lập)
Cho lớp $\mathcal H$ gồm các bộ phân loại đo được $\mathcal X\to\{0,1\}$, mất mát $0$–$1$, và một quy tắc học nhận tập huấn luyện i.i.d. $S$ và trả về $\hat h_S\in\mathcal H$.

- **Thiết lập khả thực** (realizable). Phân phối đích $P$ được gọi là khả thực đối với $\mathcal H$ nếu có $h^\circ\in\mathcal H$ với $R(h^\circ)=0$. Quy tắc học là *học gần đúng với xác suất cao* (probably approximately correct, PAC) nếu với mọi $\varepsilon,\delta\in(0,1)$ tồn tại $N(\varepsilon,\delta)$ sao cho với mọi $P$ khả thực đối với $\mathcal H$ và mọi $n\ge N(\varepsilon,\delta)$,
$$
\mathbb P_S\bigl(R(\hat h_S)\le\varepsilon\bigr)\ge1-\delta .
\tag{8.1}
$$
- **Thiết lập không giả định khả thực** (agnostic). Quy tắc học là học PAC không giả định khả thực nếu với mọi $\varepsilon,\delta\in(0,1)$ tồn tại $N(\varepsilon,\delta)$ sao cho với mọi phân phối $P$ trên $\mathcal X\times\{0,1\}$ và mọi $n\ge N(\varepsilon,\delta)$,
$$
\begin{aligned}
&\mathbb P_S\bigl(R(\hat h_S)\le R_{\mathcal H}^*+\varepsilon\bigr)\\
&\quad\ge1-\delta .
\end{aligned}
\tag{8.2}
$$

Số $\varepsilon$ là *tham số độ chính xác* (accuracy parameter), số $1-\delta$ là *độ tin cậy* (confidence).
:::

Trong (8.1) và (8.2), thứ tự lượng từ là: $\varepsilon,\delta$ cho trước, rồi một cỡ mẫu chung, rồi mọi phân phối; cỡ mẫu không phụ thuộc $P$ chưa biết. Xác suất lấy theo $S\sim P^n$, và $R(\hat h_S)$ là biến ngẫu nhiên vì $\hat h_S$ phụ thuộc $S$. Khi $\delta=0{,}05$, có thể hiểu (8.2) theo nghĩa: nếu lặp lại 100 lần việc lấy một tập huấn luyện mới và học lại, khoảng 95 lần bộ phân loại học được có rủi ro dư không quá $\varepsilon$.

Với phân phối khả thực, $R_{\mathcal H}^*=0$, nên (8.2) trở thành (8.1); do đó một quy tắc học PAC không giả định khả thực cũng là học PAC trong thiết lập khả thực. Trong Ví dụ 12.6, nhãn có nhiễu, nên $R^*=\frac15>0$ và không lớp nào khả thực; chỉ thiết lập thứ hai áp dụng được.

Với lớp hữu hạn gồm $M$ hàm, Hệ quả 12.15 cho thấy ERM chính xác là học PAC không giả định khả thực với $N(\varepsilon,\delta)=\lceil2\log(2M/\delta)/\varepsilon^2\rceil$. Ví dụ: với $M=100$ và $\varepsilon=\delta=0{,}05$,
$$
\frac{2\log4000}{0{,}05^2}=\frac{2\cdot8{,}294}{0{,}0025}\approx6635{,}2,
$$
nên $6636$ quan sát là đủ. Cận này cũng dùng được trong thiết lập khả thực, nhưng chưa khai thác giả thiết $R_{\mathcal H}^*=0$.

### 8.2. Phá vỡ tập điểm và số chiều VC

Lớp ngưỡng $\mathcal H_\uparrow$ có vô hạn phần tử, nên $M=\lvert\mathcal H_\uparrow\rvert$ không dùng được trong (7.5). Tuy nhiên, trên một tập hữu hạn điểm, lớp này chỉ tạo được một số hữu hạn cách gán nhãn. Ví dụ sau đếm các cách gán nhãn đó cho hai lớp trên trục thực:
$$
\begin{aligned}
\mathcal H_\uparrow&=\{x\mapsto\mathbf 1_{\{x\ge t\}}:\ t\in\mathbb R\},\\
\mathcal H_{\mathrm{aff}}&=\{x\mapsto\mathbf 1_{\{wx+b\ge0\}}:\\
&\qquad w,b\in\mathbb R\}.
\end{aligned}
\tag{8.3}
$$

::: example Ví dụ 12.12 (Các cách gán nhãn của hai lớp trên hai điểm)
**Tập điểm và hai lớp.** $x_1=-1$, $x_2=1$; hai lớp $\mathcal H_\uparrow$ và $\mathcal H_{\mathrm{aff}}$ trong (8.3). Mỗi hàm cho một vector nhãn $(h(x_1),h(x_2))$; viết gọn $00$, $01$, $10$, $11$.

**Lớp affine một chiều.** Các cặp $(w,b)$ sau cho bốn vector nhãn:
- $(0,-1)$: $\mathbf 1_{\{-1\ge0\}}$ tại cả hai điểm, cho $00$;
- $(1,0)$: $\mathbf 1_{\{x\ge0\}}$, cho $01$;
- $(-1,0)$: $\mathbf 1_{\{-x\ge0\}}$, cho $10$;
- $(0,1)$: $\mathbf 1_{\{1\ge0\}}$, cho $11$.

**Lớp ngưỡng.** $t=2$ cho $00$, $t=0$ cho $01$, $t=-2$ cho $11$. Nếu $h_t(-1)=1$ thì $-1\ge t$, kéo theo $1\ge t$ và $h_t(1)=1$; do đó không ngưỡng nào cho $10$.

**Kiểm tra lại.** Với các tham số trên, không điểm nào nằm đúng trên biên quyết định: $wx+b\ne0$ tại $x=\pm1$, và $\pm1\ne t$ với $t\in\{2,0,-2\}$. Do đó các nhãn không phụ thuộc quy ước tại dấu bằng.

**Diễn giải.** Hai lớp cùng nhận một số thực, nhưng lớp affine tạo đủ $4$ cách gán nhãn còn lớp ngưỡng chỉ tạo $3$.
:::

Hình 12.2 vẽ hai điểm của Ví dụ 12.12 với bốn vector nhãn: lớp ngưỡng thiếu vector $10$, còn lớp affine một chiều biểu diễn đủ bốn vector.

![Hai điểm trên một trục thực với bốn vector nhãn 00, 01, 10 và 11; lớp ngưỡng chiều tăng biểu diễn 00, 01, 11 và thiếu 10, còn lớp affine một chiều biểu diễn cả bốn vector; ba điểm với nhãn 101 không biểu diễn được bằng một ngưỡng affine.](img/lec-12/vc-one-dimensional.svg)

*Hình 12.2. Cùng hai đầu vào một chiều, đổi lớp giả thuyết làm đổi các cách gán nhãn biểu diễn được. Vector thiếu $10$ cho thấy lớp ngưỡng chiều tăng không phá vỡ tập hai điểm.*

Một cách trực quan, lớp càng gán được tùy ý nhãn lên nhiều điểm thì càng khớp được nhiều cách giải thích của một mẫu nhỏ. Định nghĩa sau đo khả năng này bằng một số nguyên; nó chưa phải một cận xác suất.

::: definition Định nghĩa 12.18 (Phá vỡ tập điểm và số chiều VC)
Cho $\mathcal H$ là lớp các hàm $\mathcal X\to\{0,1\}$ và $C=\{x_1,\ldots,x_k\}\subseteq\mathcal X$ gồm $k$ điểm phân biệt. Tập các vector nhãn tạo được trên $C$ là
$$
\begin{aligned}
\mathcal H|_C=\bigl\{&(h(x_1),\ldots,h(x_k)):\\
&h\in\mathcal H\bigr\}.
\end{aligned}
$$
Lớp $\mathcal H$ *phá vỡ* (shatter) $C$ nếu $\mathcal H|_C=\{0,1\}^k$, tức biểu diễn được mọi cách gán $k$ nhãn. *Số chiều Vapnik–Chervonenkis* (Vapnik–Chervonenkis dimension, số chiều VC) $d_{\mathrm{VC}}(\mathcal H)$ là kích thước lớn nhất của một tập bị phá vỡ; nếu có tập bị phá vỡ với kích thước lớn tùy ý, đặt $d_{\mathrm{VC}}(\mathcal H)=+\infty$.
:::

Định nghĩa 12.18 đo độ phức tạp của lớp hàm trên tập điểm, không đo số chiều của đầu vào. Ví dụ: $\mathcal H_\uparrow$ phá vỡ mọi tập một điểm $\{x_0\}$, vì $t\le x_0$ cho nhãn $1$ và $t>x_0$ cho nhãn $0$. Phản ví dụ: theo Ví dụ 12.12, $\mathcal H_\uparrow$ không phá vỡ $\{-1,1\}$. Lớp $\mathcal H_{\mathrm{all}}$ của Ví dụ 12.1 phá vỡ mọi tập hữu hạn điểm phân biệt trong $[-1,1]$, vì mọi cách gán nhãn trên tập đó đều là thu hẹp của một hàm đo được, nên $d_{\mathrm{VC}}(\mathcal H_{\mathrm{all}})=+\infty$.

Để chứng minh $d_{\mathrm{VC}}(\mathcal H)=d$, cần hai việc: chỉ ra một tập $d$ điểm bị phá vỡ, và chứng minh không tập $d+1$ điểm nào bị phá vỡ. Định lý sau làm hai việc đó cho hai lớp (8.3), theo cách của Shalev-Shwartz và Ben-David (2014), §6.3.1–6.3.2.

::: theorem Định lý 12.19 (Số chiều VC của hai lớp ngưỡng một chiều) — chứng minh đầy đủ
**Giả thiết.** Miền đầu vào $\mathcal X=\mathbb R$; hai lớp $\mathcal H_\uparrow$ và $\mathcal H_{\mathrm{aff}}$ cho bởi (8.3).

**Kết luận.**
$$
\begin{aligned}
d_{\mathrm{VC}}(\mathcal H_\uparrow)&=1,\\
d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})&=2 .
\end{aligned}
\tag{8.4}
$$
:::

::: proof Chứng minh Định lý 12.19
**Lộ trình.** Với mỗi lớp, chỉ ra một tập bị phá vỡ có kích thước cần thiết, rồi dùng thứ tự trên trục thực để chỉ ra một vector nhãn không biểu diễn được trên mọi tập lớn hơn một điểm.

**Bước 1 ($\mathcal H_\uparrow$ phá vỡ một điểm).** Với một điểm $x_0$, chọn $t\le x_0$ cho nhãn $1$ và $t>x_0$ cho nhãn $0$.

**Bước 2 ($\mathcal H_\uparrow$ không phá vỡ hai điểm).** Với $x_1<x_2$ bất kỳ, nếu $h_t(x_1)=1$ thì $x_1\ge t$, kéo theo $x_2>x_1\ge t$ và $h_t(x_2)=1$. Vector nhãn $10$ không xuất hiện, nên $d_{\mathrm{VC}}(\mathcal H_\uparrow)=1$.

**Bước 3 ($\mathcal H_{\mathrm{aff}}$ phá vỡ hai điểm).** Với $x_1<x_2$, đặt $c=\frac{x_1+x_2}2$. Các cặp $(w,b)$ sau cho bốn vector nhãn:
- $(0,-1)$ cho $00$;
- $(1,-c)$ cho $01$, vì $x_1-c<0\le x_2-c$;
- $(-1,c)$ cho $10$, vì $-x_1+c>0>-x_2+c$;
- $(0,1)$ cho $11$.

**Bước 4 ($\mathcal H_{\mathrm{aff}}$ không phá vỡ ba điểm).** Với $x_1<x_2<x_3$, xét vector nhãn $101$. Xét ba trường hợp theo dấu của $w$.
- $w>0$: $wx+b$ tăng theo $x$, nên nhãn không giảm theo thứ tự điểm và không thể có $1$ rồi $0$.
- $w<0$: nhãn không tăng, nên không thể có $0$ rồi $1$.
- $w=0$: nhãn hằng.

Không trường hợp nào cho $101$, nên không tập ba điểm nào bị phá vỡ và $d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})=2$. $\square$

Như vậy, chỉ một thay đổi hạn chế biểu diễn (cho phép độ dốc hai dấu và hàm hằng) đổi số chiều VC từ $1$ lên $2$, dù đầu vào vẫn có một tọa độ.
:::

Trong học máy, lấy ngưỡng một mô hình logistic trên một đặc trưng vô hướng với độ dốc ràng buộc dương cho lớp quyết định $\mathcal H_\uparrow$; cho phép độ dốc hai dấu và cả $w=0$ cho $\mathcal H_{\mathrm{aff}}$. Số chiều VC có thể khác số tham số: Shalev-Shwartz và Ben-David (2014), §6.3.5, nêu lớp $\{x\mapsto\lceil0{,}5\sin(\theta x)\rceil:\ \theta\in\mathbb R\}$ có một tham số nhưng số chiều VC vô hạn. Vì vậy một mạng phi tuyến nhận đầu vào một chiều không thể được gán số chiều VC bằng $2$ chỉ vì đầu vào có một tọa độ.

### 8.3. Đọc thêm: hội tụ đều cho lớp có số chiều VC hữu hạn

Đếm vector nhãn trên một tập điểm thay cho đếm toàn bộ một lớp vô hạn, nhưng không được lấy số vector nhãn trên chính tập huấn luyện rồi thế vào $M$ của Định lý 12.13: lớp hàm thu hẹp trên mẫu phụ thuộc mẫu ngẫu nhiên. Lập luận đúng cần so sánh hai mẫu và kiểm soát số vector nhãn trên mọi tập hữu hạn. Kết quả sau là Định lý 6.8, phần 1, của Shalev-Shwartz và Ben-David (2014), §6.4, phát biểu cho mất mát $0$–$1$.

::: theorem Định lý 12.20 (Hội tụ đều theo số chiều VC) — đọc thêm
**Giả thiết.**
- **Lớp giả thuyết.** $\mathcal H$ là lớp cố định các bộ phân loại $\mathcal X\to\{0,1\}$ với $d_{\mathrm{VC}}(\mathcal H)=d$, $1\le d<\infty$, thỏa các điều kiện đo được để $\Delta_S$ và các biến cố liên quan xác định.
- **Lấy mẫu.** (G1), với $P$ là phân phối bất kỳ trên $\mathcal X\times\{0,1\}$.
- **Mất mát.** Mất mát $0$–$1$.

**Bảo đảm.** Tồn tại hằng số tuyệt đối $c_0>0$, không phụ thuộc $\mathcal H$, $P$, $n$, $\varepsilon$, $\delta$, sao cho với mọi $\varepsilon,\delta\in(0,1)$,
$$
\begin{aligned}
&n\ge c_0\,\frac{d+\log(1/\delta)}{\varepsilon^2}\\
&\Longrightarrow\ \mathbb P_S(\Delta_S\le\varepsilon)\ge1-\delta .
\end{aligned}
\tag{8.5}
$$
:::

Chứng minh Định lý 12.20 nằm ngoài phạm vi học phần. Shalev-Shwartz và Ben-David (2014), §28.1, chứng minh một cận yếu hơn, với $d\log(d/\varepsilon)$ thay cho $d$ trong (8.5) và hằng số tường minh; bản không có thừa số log cần kỹ thuật xích (chaining), nằm ngoài cuốn sách đó. Ý tưởng chung là chặn số vector nhãn mà lớp tạo được trên $k$ điểm bằng một đa thức bậc $d$ theo $k$, rồi kết hợp với lập luận tập trung xác suất. Hằng số $c_0$ không được xác định trong (8.5), nên (8.5) cho bậc phụ thuộc vào $d$, $\varepsilon$ và $\delta$, chưa cho một cỡ mẫu bằng số.

Kết hợp Định lý 12.20 với Bổ đề 12.14 cho một cận rủi ro dư của ERM trên $\mathcal H_\uparrow$ ($d=1$) và $\mathcal H_{\mathrm{aff}}$ ($d=2$), theo cùng cách Hệ quả 12.15 suy từ Định lý 12.13. Với $\mathcal H_{\mathrm{all}}$ của Ví dụ 12.1, $d_{\mathrm{VC}}=+\infty$, nên Định lý 12.20 không áp dụng; Shalev-Shwartz và Ben-David (2014), Định lý 6.7, cho thấy lớp có số chiều VC vô hạn không có tính hội tụ đều. Murphy (2022), §5.4.4.2, lưu ý rằng số chiều VC khó tính cho nhiều mô hình và các cận theo VC thường lỏng, nên cách tiếp cận này ít giá trị thực hành.

Như vậy, Định nghĩa 12.17 tách tham số độ chính xác khỏi độ tin cậy, Định nghĩa 12.18 và Định lý 12.19 đo độ phức tạp của hai lớp vô hạn trên trục thực, và Định lý 12.20 nối số chiều VC hữu hạn với hội tụ đều. Tuy nhiên, mọi bảo đảm của Mục 7 và Mục 8 cần giả thiết (G1): quan sát mới có cùng phân phối với tập huấn luyện. Mục 9 xét hai tình huống áp dụng, trong đó tình huống thứ hai vi phạm giả thiết này.

## 9. Ý nghĩa, tác động và giới hạn

Các kết quả của bài cho phép trả lời ba câu hỏi về một hệ thống học có giám sát: mục tiêu huấn luyện đến từ đâu, hàm học được dự đoán tốt đến đâu trên dữ liệu mới, và phần sai số nào đến từ lớp, từ dữ liệu hay từ bộ tối ưu.

### 9.1. Chọn lớp giả thuyết cho bộ phân loại cảm biến

Tình huống sau chọn giữa hai lớp giả thuyết trên cùng bốn quan sát của ví dụ xuyên suốt.

::: application Tình huống 12.1 (Ngưỡng cảm biến và quy tắc ghi nhớ)
**Bài toán và dữ liệu.** Một đặc trưng cảm biến được chuẩn hóa thành $X\sim\operatorname{Uniform}[-1,1]$, nhãn lỗi là $Y=\mathbf 1_{\{X\ge0\}}$, mất mát $0$–$1$. Tập huấn luyện gồm bốn quan sát $(-0{,}8;\,0)$, $(-0{,}2;\,0)$, $(0{,}3;\,1)$, $(0{,}7;\,1)$. Cần chọn giữa lớp ngưỡng $\mathcal H_\uparrow$ và lớp mọi hàm đo được $\mathcal H_{\mathrm{all}}$.

**Kiểm tra giả thiết.** Bốn quan sát i.i.d. từ cùng phân phối với sản phẩm mới (G1); mất mát $0$–$1$ thuộc $[0,1]$ (G2); hai lớp được cố định trước khi xem nhãn (G3).

**Tối ưu trên mẫu.** Theo Mệnh đề 12.11, mọi $t\in(-0{,}2;\,0{,}3]$ là nghiệm ERM trong $\mathcal H_\uparrow$; chọn $t=0{,}3$ cho rủi ro $0{,}15$. Trong $\mathcal H_{\mathrm{all}}$, hàm ghi nhớ $g$ cũng có rủi ro thực nghiệm $0$, nhưng bốn đầu vào có xác suất $0$, nên $g$ dự đoán $0$ gần chắc chắn trên sản phẩm mới và có rủi ro $\frac12$.

**Ba nguồn sai số.** Rủi ro Bayes bằng $0$ và cả hai lớp chứa $h_0$, nên sai số xấp xỉ của cả hai bằng $0$; theo Mệnh đề 12.16, toàn bộ rủi ro dư của $g$ đến từ sai số ước lượng. Khác Ví dụ 12.7, ở đây nhãn không có nhiễu, nên rủi ro $\frac12$ của $g$ là rủi ro dư thật so với Bayes.

**Độ phức tạp.** Theo Định lý 12.19, $d_{\mathrm{VC}}(\mathcal H_\uparrow)=1$, nên Định lý 12.20 cho $\mathbb P_S(\Delta_S\le\varepsilon)\ge1-\delta$ khi $n\ge c_0(1+\log(1/\delta))/\varepsilon^2$, với mọi phân phối. Lớp $\mathcal H_{\mathrm{all}}$ có $d_{\mathrm{VC}}=+\infty$, và Ví dụ 12.9 cho $\Delta_S=1$ trên mẫu này. Tăng $n$ không thay đổi điều đó: với xác suất $1$ các đầu vào huấn luyện khác nhau, nên luôn có một hàm sai mọi nhãn huấn luyện nhưng có rủi ro $0$.

**Diễn giải và giới hạn.** Hai quy tắc đều giải chính xác bài toán ERM nhưng cho rủi ro trên sản phẩm mới khác nhau; lớp ngưỡng là lựa chọn có bảo đảm. Các con số $0{,}15$ và $\frac12$ dựa trên phân phối đều và ngưỡng thật bằng $0$; nếu phân phối của cảm biến khác, chúng phải tính lại.
:::

### 9.2. Khi tập huấn luyện không đại diện cho phân phối triển khai

Định lý 12.13 và 12.20 giả thiết tập huấn luyện và quan sát mới có cùng phân phối. Tình huống sau vi phạm giả thiết này.

::: application Tình huống 12.2 (Chỉ quan sát một vùng của cảm biến)
**Dữ liệu và cơ chế.** Nhãn thật vẫn là $Y=\mathbf 1_{\{X\ge0\}}$. Khi huấn luyện, $X$ có phân phối đều trên $[-1,0]$; khi triển khai, $X$ có phân phối đều trên $[0,1]$. Tập huấn luyện có bốn đầu vào $-0{,}8$; $-0{,}6$; $-0{,}4$; $-0{,}2$, cả bốn nhãn bằng $0$.

**Lựa chọn mô hình.** Dùng lớp $\mathcal H_{\mathrm{aff}}$ trong (8.3) và chọn bộ luôn dự đoán $0$, ứng với $(w,b)=(0,-1)$. Bộ này có rủi ro thực nghiệm $0$ và rủi ro trên phân phối huấn luyện bằng $0$.

**Rủi ro khi triển khai.** Trên phân phối triển khai, nhãn bằng $1$ gần chắc chắn, nên bộ luôn dự đoán $0$ có rủi ro $1$.

**Giả thiết bị vi phạm.** Các cặp huấn luyện vẫn i.i.d., và $d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})=2$ theo Định lý 12.19. Tuy nhiên, quan sát mới không có cùng phân phối với tập huấn luyện, trái (G1). Hội tụ đều theo phân phối huấn luyện chỉ kiểm soát rủi ro trên chính phân phối đó. Thêm quan sát trong nửa âm không cung cấp thông tin về nhãn trên nửa dương.
:::

### 9.3. Ứng dụng trong học máy

- **Hàm mất mát của mạng sâu.** Mất mát bình phương trung bình (Mệnh đề 12.2) và entropy chéo nhị phân (Mệnh đề 12.6) là hai mất mát huấn luyện thông dụng; mỗi mất mát mang theo một mô hình xác suất của đầu ra.
- **Tập kiểm thử.** (7.1) là căn cứ để báo cáo rủi ro trên một tập kiểm thử không dùng khi huấn luyện; trên tập huấn luyện, Ví dụ 12.7 cho thấy rủi ro đo được có thể lệch hoàn toàn.
- **Chọn siêu tham số trên lưới hữu hạn.** Định lý 12.13 với $M$ là số điểm lưới cho cái giá $\log M$ của việc chọn.
- **Chính quy hóa.** Nhận xét 12.7 cho một lý do tối ưu để thêm $\lambda\lVert w\rVert^2$; Mệnh đề 12.16 cho một lý do thống kê để hạn chế lớp.

### 9.4. Tóm tắt

Bài bắt đầu từ câu hỏi tại sao khớp hoàn hảo dữ liệu huấn luyện chưa bảo đảm dự đoán đúng trên dữ liệu mới. Mục 4 và 5 cho thấy mất mát huấn luyện là âm log-hợp lý của một mô hình xác suất: nhiễu Gaussian cho bình phương sai số, nhãn Bernoulli cho entropy chéo, và ngay cả bài toán lồi hai điểm có thể không có nghiệm hữu hạn. Mục 6 đặt rủi ro kỳ vọng bên cạnh rủi ro thực nghiệm và chỉ ra rằng hàm chọn bằng ERM có thể có hai rủi ro khác xa nhau. Mục 7 chứng minh hội tụ đều cho lớp hữu hạn, suy ra cận rủi ro dư cho ERM gần đúng, và tách rủi ro dư so với Bayes thành sai số xấp xỉ, sai số ước lượng và sai số tối ưu hóa. Mục 8 tách tham số độ chính xác khỏi độ tin cậy trong học PAC và đo độ phức tạp của lớp vô hạn trên trục thực bằng số chiều VC. Do đó tối ưu tốt chưa chắc học tốt: bộ tối ưu chỉ làm giảm sai số tối ưu hóa $\eta_S$, còn sai số xấp xỉ và sai số ước lượng phụ thuộc lớp giả thuyết và cỡ mẫu (Mệnh đề 12.16). Giới hạn còn lại là giả thiết quan sát mới cùng phân phối với tập huấn luyện.

| Nội dung | Kết quả cần tra lại |
|---|---|
| Hồi quy Gaussian | Định nghĩa 12.1; Mệnh đề 12.2, 12.3; Nhận xét 12.4 |
| Phân loại xác suất | Định nghĩa 12.5; Mệnh đề 12.6; Nhận xét 12.7 |
| Rủi ro và ERM | Định nghĩa 12.8, 12.10; Mệnh đề 12.9, 12.11 |
| Hội tụ đều và rủi ro dư | Định nghĩa 12.12; Định lý 12.13; Bổ đề 12.14; Hệ quả 12.15; Mệnh đề 12.16 |
| PAC và số chiều VC | Định nghĩa 12.17, 12.18; Định lý 12.19; Định lý 12.20 (đọc thêm) |

Các công thức cần nhớ là (4.3), (5.1), (6.1)–(6.2), (6.6), (7.4)–(7.5), (7.7)–(7.8) và hai số chiều VC trong (8.4). Ba câu hỏi ứng với ba số hạng của (7.8):

- Lớp giả thuyết có biểu diễn được lời giải tốt không? (sai số xấp xỉ)
- Dữ liệu có đủ để chọn được lời giải tốt không? (sai số ước lượng)
- Bộ tối ưu có đạt mục tiêu thực nghiệm đủ chính xác không? (sai số tối ưu hóa)

Hai giả thiết hay bị bỏ quên: các bảo đảm của Mục 7 cần mất mát bị chặn, nên không áp dụng trực tiếp cho mất mát bình phương hay entropy chéo không bị chặn; và mọi bảo đảm cần quan sát mới cùng phân phối với tập huấn luyện.

## 10. Bài tập

Đề, gợi ý và lời giải nằm trong [tệp bài tập của Bài 12](material-viewer.html?doc=materials/lec-12/exercises.md). Mỗi dòng ghi mục tiêu học tập mà bài kiểm tra.

**Trên lớp.**

1. **Bài tập 12.1** (Suy ra và giải mục tiêu hồi quy từ ba số đo): mục tiêu 1, 2.
2. **Bài tập 12.2** (Tập nghiệm ERM và hai loại rủi ro của lớp ngưỡng): mục tiêu 3.
3. **Bài tập 12.3** (Các cách gán nhãn của hai lớp ngưỡng trên hai điểm): mục tiêu 5.

**Tự học.**

4. **Bài tập 12.4** (Hợp lý Gaussian, phương trình chuẩn và tồn tại nghiệm hợp lý cực đại): mục tiêu 1, 2.
5. **Bài tập 12.5** (Entropy chéo, cực tiểu không đạt được và nhãn đổi): mục tiêu 1.
6. **Bài tập 12.6** (Rủi ro chính xác của bộ phân loại ngưỡng dưới hai phân phối đầu vào): mục tiêu 3.
7. **Bài tập 12.7** (Số chiều VC, giới hạn tổng quát hóa và lớp khoảng): mục tiêu 5, 6.
8. **Bài tập 12.8** (Tham số độ chính xác và độ tin cậy trong một phát biểu PAC): mục tiêu 5.
9. **Bài tập 12.9** (Hội tụ đều và nghiệm ERM gần đúng): mục tiêu 4, 6.

## 11. Câu hỏi cuối buổi và cầu nối

**Câu hỏi.** Tại sao tối ưu tốt chưa chắc học tốt? Trả lời trên ví dụ cảm biến của Ví dụ 12.1: một bộ tối ưu giải chính xác bài toán ERM ($\eta_S=0$) trên lớp $\mathcal H_{\mathrm{all}}$ và trả về hàm ghi nhớ $g$. Tính rủi ro kỳ vọng của $g$, chỉ ra số hạng của (7.8) gây ra nó, và nêu thay đổi nào làm giảm số hạng đó.

**Câu hỏi phụ.** Một lớp gồm $M=100$ bộ phân loại cố định, mất mát $0$–$1$, $n=1000$ quan sát i.i.d. và $\delta=0{,}05$. Hệ quả 12.15 bảo đảm rủi ro dư so với lớp của ERM chính xác không quá bao nhiêu? Có thể nói bộ phân loại học được dự đoán đúng với xác suất $95\%$ không?

::: solution Lời giải câu hỏi cuối buổi
**Câu hỏi chính.** Hàm $g$ có rủi ro thực nghiệm $0$, nên là một nghiệm ERM chính xác và $\eta_S=0$. Bốn điểm mẫu có xác suất $0$, nên trên sản phẩm mới $g$ dự đoán $0$ gần chắc chắn và sai khi $X\ge0$; do đó $R(g)=\mathbb P(X\ge0)=\frac12$. Theo Ví dụ 12.11, sai số xấp xỉ của $\mathcal H_{\mathrm{all}}$ bằng $0$, nên toàn bộ rủi ro dư $\frac12$ là sai số ước lượng, với cận $2\Delta_S=2$ (Ví dụ 12.9, Mệnh đề 12.16). Bộ tối ưu tốt hơn không làm giảm số hạng này vì $\eta_S$ đã bằng $0$. Thu hẹp lớp làm giảm nó: trên $\mathcal H_\uparrow$, $\Delta_S=0{,}15$ và mọi nghiệm ERM có rủi ro không quá $0{,}15$. Tối ưu tốt chỉ kiểm soát $\eta_S$; học tốt còn cần sai số xấp xỉ và sai số ước lượng nhỏ.

**Câu hỏi phụ: cận rủi ro dư.** Theo (7.5), $\varepsilon_{1000}(100;\,0{,}05)=\sqrt{\log4000/2000}\approx0{,}0644$. Với $\eta=0$, (7.7) cho rủi ro dư không quá $2\cdot0{,}0644\approx0{,}129$ với xác suất ít nhất $0{,}95$.

**Câu hỏi phụ: ý nghĩa của $0{,}95$.** Không. Số $0{,}95$ là xác suất theo việc lấy tập huấn luyện: trong 100 lần lấy tập huấn luyện mới và học lại, khoảng 95 lần bộ phân loại học được có rủi ro dư không quá $0{,}129$. Trên một lần học tốt, xác suất dự đoán sai một sản phẩm mới là $R(\hat h_S)$, có thể lớn tới $R_{\mathcal H}^*+0{,}129$; xác suất dự đoán đúng là $1-R(\hat h_S)$, không phải $0{,}95$.
:::

Ba bộ phân loại $h_0$, $h_{0{,}3}$ và $g$ của câu hỏi mở đầu cùng có rủi ro thực nghiệm $0$ vì rủi ro thực nghiệm chỉ nhìn bốn điểm. Trên lớp ngưỡng, Ví dụ 12.9 cho độ lệch đều $0{,}15$, và mọi nghiệm ERM có rủi ro thực nghiệm $0$, nên rủi ro của chúng không quá $0+0{,}15=0{,}15$, và $h_{0{,}3}$ đạt đúng cận này. Trên lớp mọi hàm đo được, độ lệch đều bằng $1$, nên rủi ro thực nghiệm $0$ của $g$ không bảo đảm gì, và thực tế $R(g)=\frac12$. Một mô hình khớp hoàn hảo dữ liệu huấn luyện nhưng dự đoán sai trên dữ liệu mới khi lớp giả thuyết quá linh hoạt so với cỡ mẫu.

Bài 12 giả thiết các quan sát i.i.d. theo một phân phối $P$ cố định, và Tình huống 12.2 cho thấy bảo đảm mất hiệu lực khi phân phối đổi. Trong ra quyết định tuần tự, hành động hiện tại làm đổi phân phối của trạng thái kế tiếp, nên dữ liệu không còn i.i.d. theo một $P$ cố định. Bài 13 mô hình hóa sự phụ thuộc đó bằng xác suất chuyển trạng thái và tìm chính sách tối ưu qua các phương trình Bellman.

## 12. Tài liệu đọc

Tài liệu chính là Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả tại [trang sách](https://probml.github.io/pml-book/book1.html). Tài liệu bổ trợ cho học PAC và số chiều VC là Shai Shalev-Shwartz và Shai Ben-David (2014), *Understanding Machine Learning: From Theory to Algorithms*, Cambridge University Press.

- **Trước buổi học:** Murphy (2022), §4.2.3 và §4.2.7 (hợp lý Bernoulli và Gaussian), §4.3 (tối thiểu hóa rủi ro thực nghiệm).
- **Sau buổi học:** Murphy (2022), §11.2.2 (bình phương tối thiểu), §10.2.3 (hồi quy logistic nhị phân), §5.1 (lý thuyết quyết định), §5.4.1 (rủi ro kỳ vọng, rủi ro thực nghiệm, sai số xấp xỉ và sai số ước lượng), §5.4.4.1 (cận cho lớp hữu hạn); Shalev-Shwartz và Ben-David, Chương 2–4 (ERM, học PAC, hội tụ đều cho lớp hữu hạn).
- **Mở rộng:** Shalev-Shwartz và Ben-David, §5.2 (phân rã sai số), Chương 6 (số chiều VC, Định lý 6.7–6.8), §28.1 (chứng minh cận theo VC có thừa số log); Murphy (2022), §5.4.4.2 (số chiều VC).

**Quan hệ với giáo trình.** Các khác biệt so với hai sách:

- **Sai số xấp xỉ.** Ở đây sai số xấp xỉ là $R_{\mathcal H}^*-R^*$, tính vượt rủi ro Bayes, như Murphy (2022), §5.4.1.1; Shalev-Shwartz và Ben-David, §5.2, gọi toàn bộ $R_{\mathcal H}^*$ là sai số xấp xỉ.
- **Dạng phân rã.** Murphy viết phân rã thành đẳng thức theo kỳ vọng; Mệnh đề 12.16 là cận trên trên từng mẫu, với số hạng $2\Delta_S$ và sai số tối ưu hóa $\eta_S$.
- **Học PAC.** Định nghĩa 12.17 viết cho một quy tắc học; Shalev-Shwartz và Ben-David định nghĩa tính học được cho một lớp.
- **Lớp ngưỡng.** Ở đây ngưỡng là $\mathbf 1_{\{x\ge t\}}$; Shalev-Shwartz và Ben-David, §6.3.1, dùng $\mathbf 1_{\{x<a\}}$, nên vector nhãn thiếu là $01$ thay cho $10$.

## Phụ lục

### A. Độ lệch đều của lớp ngưỡng trên mẫu bốn điểm

Dữ kiện như Ví dụ 12.9: $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, tập huấn luyện $(-0{,}8;\,0)$, $(-0{,}2;\,0)$, $(0{,}3;\,1)$, $(0{,}7;\,1)$, lớp $\mathcal H_\uparrow$. Bốn điểm mẫu chia trục $t$ thành năm khoảng. Trên mỗi khoảng, $\hat R_S(h_t)$ không đổi, còn $R(h_t)=\min\{\lvert t\rvert,1\}/2$ theo (6.6).

| Khoảng của $t$ | Nhãn sai trên mẫu | $\hat R_S(h_t)$ | Miền của $R(h_t)$ | Cận trên đúng của $\lvert R-\hat R_S\rvert$ |
|---|---|---|---|---|
| $t\le-0{,}8$ | $x_1$, $x_2$ | $\frac12$ | $[0{,}4;\,0{,}5]$ | $0{,}1$, đạt tại $t=-0{,}8$ |
| $-0{,}8<t\le-0{,}2$ | $x_2$ | $\frac14$ | $[0{,}1;\,0{,}4)$ | $0{,}15$, đạt tại $t=-0{,}2$ |
| $-0{,}2<t\le0{,}3$ | không có | $0$ | $[0;\,0{,}15]$ | $0{,}15$, đạt tại $t=0{,}3$ |
| $0{,}3<t\le0{,}7$ | $x_3$ | $\frac14$ | $(0{,}15;\,0{,}35]$ | $0{,}1$, đạt tại $t=0{,}7$ |
| $t>0{,}7$ | $x_3$, $x_4$ | $\frac12$ | $(0{,}35;\,0{,}5]$ | $0{,}15$, không đạt (khi $t\to0{,}7^+$) |

Ở khoảng thứ hai, $\lvert R-\frac14\rvert$ bằng $0{,}15$ tại $t=-0{,}2$ và tiến tới $0{,}15$ khi $t\to-0{,}8^+$; ở khoảng thứ ba, $\lvert R-0\rvert=R$ lớn nhất tại $t=0{,}3$, còn khi $t\to-0{,}2^+$ chỉ tiến tới $0{,}1$. Lấy giá trị lớn nhất của cột cuối, $\Delta_S=0{,}15$, đạt tại $t=-0{,}2$ và $t=0{,}3$.

**Kiểm tra lại.** Tại $t=0{,}3$: $\hat R_S=0$, $R=0{,}15$. Tại $t=-0{,}2$: điểm $x_2=-0{,}2$ bị dự đoán thành $1$, nên $\hat R_S=\frac14$, và $R=0{,}1$; hiệu tuyệt đối bằng $0{,}15$ trong cả hai trường hợp.
