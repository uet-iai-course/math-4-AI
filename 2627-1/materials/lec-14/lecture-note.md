# Bài 14 — Học biểu diễn và mô hình sinh dưới góc nhìn xác suất

Trong Tình huống 13.2 của Bài 13, khi cảm biến chỉ ghi giá trị hiện tại, giá trị trước đó là một biến ẩn, và phân phối của nó phải được suy luận từ các quan sát. Biến ẩn cũng xuất hiện khi học biểu diễn. Bài 05–06 học các ánh xạ đặc trưng và tham số của mạng nơ-ron (Định nghĩa 06.6) để dự đoán nhãn; khi bỏ nhãn, mã ít chiều của mỗi quan sát là một đại lượng không quan sát được, và chúng ta có câu hỏi trung tâm: **làm thế nào học một không gian biểu diễn có chiều thấp và sử dụng nó để mô hình hóa hoặc sinh dữ liệu mới?** Chúng ta dùng lại các kết quả sau của Bài 10–12.

- Mệnh đề 10.32 (lấy biên): mật độ biên thu được bằng tích phân mật độ đồng thời theo biến còn lại, $f_X(x)=\int f_{X,Z}(x,z)\,dz$.
- Mệnh đề 10.33 (mật độ có điều kiện; Định lý 10.11 là công thức Bayes cho biến cố): mật độ có điều kiện bằng mật độ đồng thời chia cho mật độ biên, $f_{Z\mid X}(z\mid x)=f_{X,Z}(x,z)/f_X(x)$ khi $0<f_X(x)<\infty$.
- Mệnh đề 11.3: ước lượng hợp lý cực đại (maximum likelihood estimation, MLE) trên mẫu độc lập cùng phân phối tương đương cực tiểu âm log-hợp lý (negative log-likelihood) trung bình $-\frac1n\sum_i\log p_\theta(x_i)$.
- Mệnh đề 12.2: khi nhiễu Gaussian có phương sai cố định, âm log-hợp lý bằng tổng bình phương sai số nhân hằng số cộng hằng số.

Ở Bài 10, hai mệnh đề đầu được phát biểu cho hai biến thực với ký hiệu mật độ $f$. Trong bài này, mọi mật độ được viết là $p$, và hai mệnh đề được dùng cho vector $X\in\mathbb R^d$, $Z\in\mathbb R^k$; chứng minh giữ nguyên với tích phân trên $\mathbb R^{d+k}$.

## Câu hỏi mở đầu

Một cảm biến ghi hai đại lượng cho mỗi quan sát. Bốn quan sát gồm:

- $(2,0)^\top$ và $(-2,0)^\top$;
- $(0,1)^\top$ và $(0,-1)^\top$.

Với $x=(x_1,x_2)^\top$, bộ mã hóa $f(x)=x_1$ nén mỗi quan sát thành một số, và bộ giải mã $g(z)=(z,0)^\top$ dựng lại quan sát từ số đó. Hai quan sát nằm ngang được dựng lại đúng; hai quan sát nằm dọc được dựng lại thành gốc tọa độ với lỗi bình phương $1$. Lỗi tái tạo bình phương trung bình bằng $(0+0+1+1)/4=1/2$.

**Câu hỏi.** Làm thế nào dùng cặp ánh xạ $f,g$ để sinh thêm những quan sát giống bốn quan sát trên?

Một cách làm có vẻ hợp lý là lấy mã ngẫu nhiên $Z\sim\mathcal N(0,1)$ rồi trả về $X=g(Z)=(Z,0)^\top$. Cách này sai vì hai lý do.

- Mọi điểm sinh ra nằm trên trục ngang, nên không điểm nào giống $(0,1)^\top$ hay $(0,-1)^\top$.
- Tọa độ thứ nhất có $\mathbb E[X_1^2]=\mathbb E[Z^2]=1$, trong khi trung bình bình phương tọa độ thứ nhất của bốn quan sát là $(4+4+0+0)/4=2$.

Cặp $f,g$ không chỉ định phân phối của mã, cũng không mô tả độ phân tán của quan sát quanh $g(z)$. Để sinh dữ liệu, chúng ta cần thêm hai phân phối đó và một cách học chúng từ dữ liệu.

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Chứng minh hướng chiếu giữ phương sai lớn nhất là vector riêng ứng với trị riêng lớn nhất của ma trận hiệp phương sai, và chứng minh giữ phương sai tương đương với giảm lỗi tái tạo trực giao.
2. Thiết lập bộ tự mã hóa và chứng minh bộ tự mã hóa tuyến tính tối ưu tái tạo đúng như phân tích thành phần chính, trong khi tọa độ của mã không được xác định duy nhất.
3. Xây dựng mô hình sinh có biến ẩn từ phân phối tiên nghiệm và phân phối quan sát có điều kiện; phân biệt sinh mẫu, tính hợp lý và suy luận hậu nghiệm.
4. Chứng minh tính không âm của phân kỳ Kullback–Leibler và phân rã log-hợp lý thành cận dưới cộng khe hở; phân biệt phân kỳ tới tiên nghiệm với phân kỳ tới hậu nghiệm.
5. Tính phân kỳ giữa các phân phối Gaussian, kỳ vọng tái tạo và cận dưới trong một mô hình nhỏ; giải thích phép tái tham số hóa và điều kiện đưa gradient vào trong kỳ vọng.
6. Phân biệt mục tiêu của phân tích thành phần chính, bộ tự mã hóa và bộ tự mã hóa biến phân; chẩn đoán trường hợp lỗi tái tạo nhỏ hoặc phân kỳ nhỏ vẫn đi cùng một mô hình sinh kém.

Các mục tiêu cụ thể hóa năng lực phân tích mô hình học máy thuộc CLO2 và năng lực nhận dạng bài toán tối ưu trong AI thuộc CLO4 của đề cương học phần.

## Kiến thức tiên quyết

- **Đại số tuyến tính.** Tích vô hướng, cơ sở trực chuẩn, vết ma trận, phép chiếu trực giao và định lý phổ (spectral theorem): ma trận đối xứng thực có một cơ sở trực chuẩn gồm các vector riêng. Mệnh đề 11.17 dùng định lý phổ để đọc các trục của đường đồng mức Gaussian.
- **Mạng nơ-ron.** Định nghĩa 06.6 (mạng hai tầng) và Mệnh đề 06.13: lan truyền ngược tính đúng gradient của mất mát theo mọi tham số của mạng.
- **Gaussian và mômen.** Định nghĩa 10.20: mật độ $\mathcal N(\mu,\sigma^2)$ có tham số là kỳ vọng và phương sai; Gaussian nhiều chiều có mật độ cho bởi công thức (6.12) của Bài 10. Mệnh đề 10.24: $\operatorname{Var}(X)=\mathbb E[X^2]-(\mathbb E[X])^2$.
- **Hiệp phương sai mẫu.** Định nghĩa 11.13 và đẳng thức (8.4) của Bài 11: ma trận hiệp phương sai mẫu $S_n$ với mẫu số $n$ trong công thức (8.3) của Bài 11 luôn nửa xác định dương.
- **Lấy biên, Bayes và hợp lý cực đại.** Mệnh đề 10.32, Mệnh đề 10.33, Mệnh đề 11.3 và Mệnh đề 12.2 như đã nhắc ở đầu bài.

**Câu hỏi ôn nhanh.**

1. Tìm trị riêng lớn nhất của $\operatorname{diag}(2,1/2)$ và một vector riêng đơn vị ứng với nó.
2. Cho $Z\sim\mathcal N(\mu,s^2)$. Tính $\mathbb E[Z^2]$.
3. Hai biến $X,Z$ có mật độ đồng thời $p(x\mid z)p(z)$. Viết mật độ có điều kiện $p(z\mid x)$ theo $p(x\mid z)$, $p(z)$ và một tích phân.

::: hint Đáp số câu hỏi ôn nhanh
1. Trị riêng lớn nhất là $2$; vector riêng đơn vị là $(1,0)^\top$ hoặc $(-1,0)^\top$.
2. $\mathbb E[Z^2]=\operatorname{Var}(Z)+(\mathbb E[Z])^2=s^2+\mu^2$ theo Mệnh đề 10.24.
3. $p(z\mid x)=p(x\mid z)p(z)\big/\int p(x\mid z')p(z')\,dz'$, khi tích phân ở mẫu số dương và hữu hạn.
:::

## 1. Thiết lập bài toán

Mọi đối tượng của bài được nêu trước theo bảy thành phần sau.

- **Dữ liệu:** các quan sát $x_1,\ldots,x_n\in\mathbb R^d$. Với nén dữ liệu, mẫu là một tập cố định và không cần giả thiết phân phối. Với mô hình sinh, các $x_i$ độc lập cùng phân phối theo một phân phối dữ liệu chưa biết.
- **Biến ẩn:** mã $Z\in\mathbb R^k$ với $k<d$, không quan sát được.
- **Đối tượng cần học:** bộ mã hóa (encoder), là ánh xạ $f_\phi$ hoặc phân phối $q_\phi(z\mid x)$, và bộ giải mã (decoder), là ánh xạ $g_\theta$ hoặc phân phối $p_\theta(x\mid z)$.
- **Mục tiêu nén:** cực tiểu lỗi tái tạo (reconstruction error) bình phương trung bình trên mẫu.
- **Mục tiêu sinh:** cực đại log-hợp lý trung bình $\frac1n\sum_i\log p_\theta(x_i)$; khi tích phân biên không tính được, cực đại một cận dưới tính được của nó.
- **Đại lượng ngẫu nhiên:** mã $Z\sim p(z)$ khi sinh mẫu, $Z\sim q_\phi(\cdot\mid x)$ khi suy luận từ quan sát $x$, quan sát $X\sim p_\theta(\cdot\mid z)$, và nhiễu chuẩn $\varepsilon$ khi tái tham số hóa.
- **Đối tượng so sánh:** lỗi nhỏ nhất của phép chiếu tuyến tính cho mục tiêu nén; log-hợp lý chính xác $\log p_\theta(x)$ cho mục tiêu sinh.

Trong học máy, bài toán này là *học biểu diễn* (representation learning) khi mục tiêu là mã $z$, và là xây dựng *mô hình sinh* (generative model) khi mục tiêu là phân phối của $x$.

## 2. Ký hiệu và giả thiết

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $X,x$ | quan sát ngẫu nhiên; một giá trị quan sát | $\mathbb R^d$ |
| $x_i$; $x_1,x_2$ | quan sát thứ $i$ của mẫu; trong ví dụ hai chiều, hai tọa độ của $x$ | $\mathbb R^d$; $\mathbb R$ |
| $n,d,k$ | số quan sát, chiều dữ liệu, chiều biểu diễn | số nguyên dương, $k\le d$ |
| $\bar x$, $y_i=x_i-\bar x$ | trung bình mẫu; quan sát đã tâm hóa | $\mathbb R^d$ |
| $S$ | hiệp phương sai thực nghiệm, mẫu số $n$ | ma trận đối xứng nửa xác định dương |
| $u$, $U$ | hướng đơn vị; ma trận có các cột trực chuẩn | $\mathbb R^d$; $\mathbb R^{d\times k}$, $U^\top U=I_k$ |
| $\lambda_j$, $v_j$ | trị riêng xếp giảm dần; vector riêng đơn vị của $S$ (viết $v_j$ vì $u$ đã dùng cho hướng chiếu) | $\lambda_1\ge\cdots\ge\lambda_d\ge0$; $\mathbb R^d$ |
| $V_k$ | ma trận các cột $v_1,\ldots,v_k$ | $\mathbb R^{d\times k}$ |
| $\operatorname{tr}$, $I_k$ | vết ma trận; ma trận đơn vị | tổng đường chéo; $k\times k$ |
| $Z,z$ | biến ẩn hoặc mã; một giá trị | $\mathbb R^k$ |
| $\widehat x$, $\widehat J$ | quan sát tái tạo; lỗi tái tạo bình phương trung bình | $\mathbb R^d$; $[0,\infty)$ |
| $f_\phi$, $g_\theta$ | bộ mã hóa; bộ giải mã hoặc trung bình giải mã | $\mathbb R^d\to\mathbb R^k$; $\mathbb R^k\to\mathbb R^d$ |
| $A$, $B$ | ma trận mã hóa, giải mã tuyến tính | $k\times d$; $d\times k$ |
| $\phi$, $\theta$ | tham số suy luận; tham số mô hình sinh | vector thực hữu hạn chiều |
| $p(z)$, $p_\theta(x\mid z)$ | tiên nghiệm (prior); phân phối quan sát có điều kiện | mật độ chuẩn hóa trên $\mathbb R^k$; trên $\mathbb R^d$ với mỗi $z$ |
| $p_\theta(x)$, $p_\theta(z\mid x)$ | mật độ biên; hậu nghiệm (posterior) | mật độ trên $\mathbb R^d$; trên $\mathbb R^k$ |
| $q_\phi(z\mid x)$ | hậu nghiệm xấp xỉ do bộ mã hóa cho | mật độ trên $\mathbb R^k$ |
| $\tau^2$ | phương sai nhiễu quan sát | $\tau>0$ |
| $\mu_\phi(x)$, $\sigma_\phi(x)$ | trung bình và độ lệch chuẩn của bộ mã hóa | $\mathbb R^k$; $(0,\infty)^k$ |
| $\mathrm{KL}(q\,\|\,p)$ | phân kỳ Kullback–Leibler (Kullback–Leibler divergence) từ $q$ đến $p$ | $[0,\infty]$ |
| $\mathcal L(\theta,\phi;x)$ | cận dưới bằng chứng (evidence lower bound, ELBO) tại $x$; trong bài, $\mathcal L$ chỉ mang nghĩa này | $\mathbb R$ khi các kỳ vọng hữu hạn |
| $\varepsilon$, $\odot$, $m$ | nhiễu chuẩn; tích theo từng tọa độ; số mẫu nhiễu | $\mathcal N(0,I_k)$; vector cùng chiều; số nguyên dương |
| $\mathbb E_q$, $\log$ | kỳ vọng theo $q$; logarit tự nhiên | khi tích phân tồn tại; đơn vị nat |

Các kết quả của bài dùng hai nhóm giả thiết. Phần **Giả thiết.** của mỗi kết quả chỉ ra nhóm được dùng.

**Giả thiết xác suất.**

- **Mật độ mô hình:** $p(z)$ và $p_\theta(x\mid z)$ là các mật độ chuẩn hóa, với $\tau>0$ trong lựa chọn Gaussian.
- **Mật độ biên:** Tại quan sát đang xét, $0<p_\theta(x)<\infty$.
- **Hậu nghiệm xấp xỉ:** $q_\phi(\cdot\mid x)$ là mật độ chuẩn hóa, và các kỳ vọng trong cận dưới hữu hạn.

**Giả thiết đại số và tối ưu.**

- **Dữ liệu và phép chiếu:** Dữ liệu đã tâm hóa, và $U^\top U=I_k$ với $1\le k\le d$.
- **Ánh xạ tuyến tính:** Bộ mã hóa và giải mã tuyến tính khi so sánh với phép chiếu.
- **Độ lệch chuẩn:** Mọi $\sigma_{\phi,j}(x)>0$.
- **Tính chính quy:** Tính khả vi và hàm chặn khả tích khi đưa gradient vào trong kỳ vọng.

## 3. Ví dụ xuyên suốt

Ví dụ xuyên suốt gồm một tập dữ liệu nhỏ tính được bằng tay và một ứng dụng.

::: example Ví dụ 14.1 (Bốn quan sát của một cảm biến hai chiều)
**Dữ liệu.** Mẫu gồm $n=4$ quan sát trong $\mathbb R^2$:

- $(2,0)^\top$, $(-2,0)^\top$;
- $(0,1)^\top$, $(0,-1)^\top$.

**Bộ tự mã hóa trục ngang.** Với $x=(x_1,x_2)^\top$, bộ mã hóa $f(x)=x_1$ và bộ giải mã $g(z)=(z,0)^\top$, $z\in\mathbb R$.

**Câu hỏi của ví dụ.** Tìm đường thẳng qua gốc giữ được nhiều thông tin nhất của bốn quan sát; xác định cần thêm gì vào cặp $f,g$ để tạo ra quan sát mới theo một phân phối xác suất.
:::

Ứng dụng đi kèm là nén và sinh quan sát của một cảm biến hai chiều: mỗi quan sát chỉ được lưu bằng một số thực, và cần một mô hình tạo ra các quan sát mô phỏng có cùng đặc trưng thống kê với dữ liệu đo.

## 4. Phân tích thành phần chính

Trong Ví dụ 14.1, mỗi quan sát chỉ được lưu bằng một số thực. Chọn trục ngang thì hai quan sát nằm ngang được giữ nguyên và hai quan sát nằm dọc mất hoàn toàn; chọn trục đứng thì ngược lại. Chúng ta cần một tiêu chuẩn để so sánh mọi đường thẳng qua tâm dữ liệu và một cách tìm đường tốt nhất.

Về mặt hình học, hình chiếu lên một đường giữ phần song song với đường và bỏ phần vuông góc. Một đường chạy theo hướng mà đám điểm trải rộng giữ được nhiều độ dài bình phương hơn. Để biến trực giác này thành bài toán tối ưu, ta cần tâm hóa dữ liệu, chuẩn hóa hướng và đo phần được giữ bằng phương sai của mã.

### 4.1. Hiệp phương sai và hướng chiếu

::: definition Định nghĩa 14.1 (Hiệp phương sai thực nghiệm và phép chiếu trực giao)
Cho các quan sát $x_1,\ldots,x_n\in\mathbb R^d$. Đặt $\bar x=n^{-1}\sum_ix_i$ và $y_i=x_i-\bar x$, nên $\sum_iy_i=0$. *Ma trận hiệp phương sai thực nghiệm* (còn gọi là hiệp phương sai mẫu, Định nghĩa 11.13) là

$$
S=\frac1n\sum_{i=1}^ny_iy_i^\top.
\tag{4.1}
$$

Cho $1\le k\le d$ và ma trận $U\in\mathbb R^{d\times k}$ có các cột trực chuẩn, $U^\top U=I_k$. Mã của $x_i$ là $z_i=U^\top y_i\in\mathbb R^k$, và tái tạo của $x_i$ là $\widehat x_i=\bar x+UU^\top y_i$. Ma trận $P=UU^\top$ được gọi là *phép chiếu trực giao* lên ảnh của $U$. Khi $k=1$, ta viết $U=u$ với $u^\top u=1$.
:::

Ma trận $S$ trùng ma trận $S_n$ của Định nghĩa 11.13 (công thức (8.3) của Bài 11). Ở đây $S$ chỉ mô tả mẫu; không cần giả thiết dữ liệu tuân theo Gaussian. Nếu dùng mẫu số $n-1$ như Hệ quả 11.15 thì mọi trị riêng nhân với cùng hằng số $n/(n-1)$ và các vector riêng không đổi; công thức lỗi trung bình trong bài dùng mẫu số $n$.

Các mã có trung bình bằng $0$, vì $n^{-1}\sum_iz_i=U^\top\big(n^{-1}\sum_iy_i\big)=0$. Do đó trung bình bình phương chuẩn của mã là tổng phương sai thực nghiệm của các tọa độ mã. Dùng $\|U^\top y\|_2^2=\operatorname{tr}(U^\top yy^\top U)$ và tính tuyến tính của vết, ta có

$$
\begin{aligned}
\frac1n\sum_{i=1}^n\|z_i\|_2^2
&=\operatorname{tr}\Big(U^\top\Big(\frac1n\sum_{i=1}^ny_iy_i^\top\Big)U\Big)\\
&=\operatorname{tr}(U^\top SU).
\end{aligned}
$$

Khi $k=1$, đại lượng này là $u^\top Su$, phương sai thực nghiệm của mã một chiều. Ràng buộc $\|u\|_2=1$ làm các hướng so sánh được: nếu cho phép thay $u$ bằng $cu$ thì $u^\top Su$ nhân với $c^2$ chỉ vì đổi đơn vị của mã.

::: definition Định nghĩa 14.2 (Phân tích thành phần chính)
Cho $S$ như Định nghĩa 14.1 và $1\le k\le d$. *Phân tích thành phần chính* (principal component analysis, PCA) hạng $k$ là bài toán

$$
\max_{U\in\mathbb R^{d\times k},\ U^\top U=I_k}\operatorname{tr}(U^\top SU).
\tag{4.2}
$$

Khi $k=1$, bài toán trở thành

$$
\max_{u\in\mathbb R^d,\ \|u\|_2=1}u^\top Su.
\tag{4.3}
$$

Mỗi nghiệm $u$ của (4.3) được gọi là một *hướng chính thứ nhất*.
:::

Tóm lại, PCA chọn $k$ hướng trực chuẩn sao cho tổng phương sai thực nghiệm của mã lớn nhất. Với $k=1$, bài toán (4.3) có nghiệm dạng đóng; kết quả sau tìm nghiệm đó bằng định lý phổ.

::: proposition Mệnh đề 14.3 (Hướng chính thứ nhất) — chứng minh đầy đủ
**Giả thiết.** $S$ là ma trận trong (4.1). Theo định lý phổ, $S$ có các trị riêng $\lambda_1\ge\cdots\ge\lambda_d$ và một cơ sở trực chuẩn gồm các vector riêng $v_1,\ldots,v_d$, $Sv_j=\lambda_jv_j$.

**Kết luận.** Mọi trị riêng không âm. Bài toán (4.3) có giá trị tối ưu $\lambda_1$, và một vector đơn vị $u$ là nghiệm khi và chỉ khi $u$ thuộc không gian riêng $\{v:Sv=\lambda_1v\}$.
:::

::: proof Chứng minh Mệnh đề 14.3
**Lộ trình.** Viết $u$ theo cơ sở riêng để đưa $u^\top Su$ về một tổ hợp của các trị riêng với trọng số $a_j^2$ có tổng bằng $1$, rồi so sánh với $\lambda_1$.

**Bước 1 (trị riêng không âm).** Với mỗi $j$, dùng $v_j^\top v_j=1$ và (4.1):

$$
\lambda_j=v_j^\top Sv_j=\frac1n\sum_{i=1}^n(v_j^\top y_i)^2\ge0.
$$

**Bước 2 (khai triển theo cơ sở riêng).** Viết $u=\sum_ja_jv_j$ với $a_j=v_j^\top u$. Vì cơ sở trực chuẩn, $\sum_ja_j^2=\|u\|_2^2=1$. Từ $Su=\sum_la_l\lambda_lv_l$ và $v_j^\top v_l=0$ khi $j\ne l$, ta có

$$
\begin{aligned}
u^\top Su&=\sum_{j=1}^d\sum_{l=1}^da_ja_l\lambda_l\,v_j^\top v_l\\
&=\sum_{j=1}^d\lambda_ja_j^2.
\end{aligned}
$$

**Bước 3 (chặn trên và đạt chặn).** Dùng $\sum_ja_j^2=1$:

$$
\begin{aligned}
\lambda_1-u^\top Su
&=\lambda_1\sum_ja_j^2-\sum_j\lambda_ja_j^2\\
&=\sum_{j=1}^d(\lambda_1-\lambda_j)a_j^2\\
&\ge0.
\end{aligned}
$$

Bất đẳng thức đúng vì mỗi số hạng là tích của $\lambda_1-\lambda_j\ge0$ với $a_j^2\ge0$. Với $u=v_1$, ta có $a_1=1$ và $a_j=0$ khi $j\ge2$, nên $u^\top Su=\lambda_1$. Vậy giá trị tối ưu bằng $\lambda_1$.

**Bước 4 (tập nghiệm).** Tổng các số hạng không âm ở Bước 3 bằng $0$ khi và chỉ khi mọi số hạng bằng $0$, tức $a_j=0$ với mọi $j$ có $\lambda_j<\lambda_1$. Điều này nghĩa là $u$ là tổ hợp của các $v_j$ có $\lambda_j=\lambda_1$, tức $u$ thuộc không gian riêng ứng với $\lambda_1$. $\square$

Như vậy PCA một chiều có nghiệm dạng đóng: tính $S$ rồi lấy một vector riêng đơn vị ứng với trị riêng lớn nhất, không cần thuật toán lặp.
:::

Nếu $\lambda_1>\lambda_2$, không gian riêng ứng với $\lambda_1$ có chiều $1$ và hướng tối ưu duy nhất, sai khác dấu. Nếu trị riêng lớn nhất là bội, mọi vector đơn vị trong không gian riêng đó đều tối ưu. Điều kiện dừng của bài toán Lagrange (Murphy (2022), §20.1.2) chỉ cho biết $u$ là vector riêng; so sánh giá trị ở Bước 3 chọn trị riêng lớn nhất.

Trong học máy, vector $u$ xác định một ánh xạ đặc trưng học từ mẫu không nhãn, $x\mapsto u^\top(x-\bar x)$. Mệnh đề 14.3 cho nghiệm toàn cục của tiêu chuẩn giữ phương sai mà không cần huấn luyện.

::: example Ví dụ 14.2 (Phân tích thành phần chính của bốn quan sát)
**Dữ kiện.** Bốn quan sát của Ví dụ 14.1: $(2,0)^\top$, $(-2,0)^\top$, $(0,1)^\top$, $(0,-1)^\top$; $n=4$, $d=2$, $k=1$.

**Tâm hóa.** Tổng bốn quan sát bằng $(0,0)^\top$, nên $\bar x=(0,0)^\top$ và $y_i=x_i$.

**Ma trận hiệp phương sai.** Hai quan sát nằm ngang có tích ngoài $\operatorname{diag}(4,0)$, hai quan sát nằm dọc có tích ngoài $\operatorname{diag}(0,1)$. Theo (4.1),

$$
\begin{aligned}
S&=\frac14\big(2\operatorname{diag}(4,0)\\
&\qquad+2\operatorname{diag}(0,1)\big)\\
&=\frac14\operatorname{diag}(8,2)\\
&=\operatorname{diag}\Big(2,\frac12\Big).
\end{aligned}
$$

**Hướng chính.** Ma trận chéo có trị riêng $\lambda_1=2$ với vector riêng $(1,0)^\top$ và $\lambda_2=1/2$ với vector riêng $(0,1)^\top$. Theo Mệnh đề 14.3, chọn $u=(1,0)^\top$.

**Mã và tái tạo.** Mã $z=u^\top x$ của bốn quan sát là $2,-2,0,0$. Tái tạo $uz$ lần lượt là $(2,0)^\top$, $(-2,0)^\top$, $(0,0)^\top$, $(0,0)^\top$.

**Lỗi tái tạo.** Lỗi bình phương từng điểm là $0,0,1,1$; tổng bằng $2$ và trung bình bằng $1/2$. Phương sai của mã là $u^\top Su=2$, chiếm tỉ lệ $2/(2+1/2)=4/5$ của tổng phương sai.

**Kiểm tra lại.** Với trục đứng $u=(0,1)^\top$, các mã là $0,0,1,-1$, các tái tạo là $(0,0)^\top$, $(0,0)^\top$, $(0,1)^\top$, $(0,-1)^\top$, và lỗi từng điểm là $4,4,0,0$, trung bình $2$. Ở cả hai hướng, phương sai giữ lại cộng lỗi trung bình bằng $\operatorname{tr}(S)=5/2$: $2+1/2=1/2+2$.

Hướng có phương sai lớn hơn cũng cho lỗi tái tạo nhỏ hơn: trục ngang giữ $4/5$ tổng phương sai với lỗi trung bình $1/2$.
:::

![Bốn điểm (2,0), (-2,0), (0,1), (0,-1) trên mặt phẳng; đường chiếu là trục ngang theo hướng u=(1,0); hai đoạn nét đứt dài 1 nối (0,1) và (0,-1) với gốc biểu diễn lỗi chiếu, tổng lỗi bình phương 2, lỗi trung bình 1/2.](img/lec-14/pca-projection.svg)

Hình 14.1. Phép chiếu của Ví dụ 14.2 lên trục ngang. Hai điểm nằm ngang được giữ nguyên; hai đoạn nét đứt là phần bị bỏ khi nén, tổng bình phương độ dài của chúng bằng $2$.

### 4.2. Phương sai giữ lại và lỗi tái tạo

Ví dụ 14.2 cho thấy, ở cả hai hướng, phương sai của mã cộng lỗi tái tạo trung bình bằng $\operatorname{tr}(S)$. Nếu đẳng thức này đúng với mọi dữ liệu, thì cực đại phương sai và cực tiểu lỗi tái tạo là cùng một bài toán, và PCA giải bài toán nén bình phương.

::: proposition Mệnh đề 14.4 (Phương sai giữ lại và lỗi tái tạo) — chứng minh đầy đủ
**Giả thiết.** Các quan sát đã tâm hóa $y_1,\ldots,y_n$ có hiệp phương sai $S$ theo (4.1). Ma trận $U\in\mathbb R^{d\times k}$ thỏa $U^\top U=I_k$, và tái tạo của $y_i$ là $UU^\top y_i$.

**Kết luận.** Lỗi tái tạo bình phương trung bình thỏa

$$
\begin{aligned}
&\widehat J(U)\\
&\quad=\frac1n\sum_{i=1}^n\|y_i-UU^\top y_i\|_2^2\\
&\quad=\operatorname{tr}(S)-\operatorname{tr}(U^\top SU).
\end{aligned}
\tag{4.4}
$$

Do đó, với mỗi $k$, $U$ cực tiểu $\widehat J$ trên tập $\{U:U^\top U=I_k\}$ khi và chỉ khi $U$ là nghiệm của (4.2). Với $k=1$, lỗi nhỏ nhất bằng $\operatorname{tr}(S)-\lambda_1$.
:::

::: proof Chứng minh Mệnh đề 14.4
**Lộ trình.** Tách mỗi $y_i$ thành hình chiếu và phần vuông góc, dùng định lý Pythagore, rồi lấy trung bình bằng vết.

**Bước 1 ($P$ là phép chiếu trực giao).** Với $P=UU^\top$, ta có $P^\top=P$, và dùng giả thiết $U^\top U=I_k$:

$$
P^2=U(U^\top U)U^\top=UU^\top=P.
$$

**Bước 2 (định lý Pythagore).** Với mọi $y\in\mathbb R^d$,

$$
\begin{aligned}
&(Py)^\top(I_d-P)y=y^\top(P-P^2)y\\
&\phantom{(Py)^\top(I_d-P)y}=0,\\
&\|y\|_2^2=\|Py\|_2^2+\|(I_d-P)y\|_2^2,\\
&\|Py\|_2^2=y^\top UU^\top UU^\top y\\
&\phantom{\|Py\|_2^2}=\|U^\top y\|_2^2.
\end{aligned}
$$

Hai dòng đầu dùng $P^\top=P$ và $P^2=P$ của Bước 1. Dòng thứ ba khai triển $\|Py+(I_d-P)y\|_2^2$, trong đó số hạng chéo bằng $0$ theo hai dòng đầu. Hai dòng cuối dùng lại $U^\top U=I_k$. Do đó $\|y-Py\|_2^2=\|y\|_2^2-\|U^\top y\|_2^2$.

**Bước 3 (lấy trung bình).** Ta có $\|y_i\|_2^2=\operatorname{tr}(y_iy_i^\top)$ và $\|U^\top y_i\|_2^2=\operatorname{tr}(U^\top y_iy_i^\top U)$. Lấy trung bình theo $i$ và dùng tính tuyến tính của vết:

$$
\begin{gathered}
\frac1n\sum_{i=1}^n\|y_i\|_2^2=\operatorname{tr}(S),\\
\frac1n\sum_{i=1}^n\|U^\top y_i\|_2^2=\operatorname{tr}(U^\top SU).
\end{gathered}
$$

Trừ hai đẳng thức và dùng Bước 2 cho (4.4).

**Bước 4 (tương đương hai bài toán).** Số hạng $\operatorname{tr}(S)$ trong (4.4) không phụ thuộc $U$, nên cực tiểu $\widehat J(U)$ tương đương cực đại $\operatorname{tr}(U^\top SU)$. Khi $k=1$, $\operatorname{tr}(u^\top Su)=u^\top Su$ có giá trị lớn nhất $\lambda_1$ theo Mệnh đề 14.3. $\square$

Như vậy hướng có phương sai lớn nhất cũng cho phép chiếu trực giao có lỗi tái tạo bình phương nhỏ nhất trên mẫu.
:::

Khi dữ liệu chưa tâm hóa, tái tạo là $\bar x+UU^\top(x-\bar x)$; bỏ $\bar x$ sẽ làm (4.4) sai. Đẳng thức (4.4) đo lỗi trên chính mẫu dùng để tính $S$. Lỗi tái tạo của PCA trên tập kiểm tra tiếp tục giảm khi tăng $k$ (Murphy (2022), §20.1.4.1), nên lỗi tái tạo không đủ để chọn số chiều hay đánh giá một mô hình của phân phối dữ liệu.

Trong học máy, (4.4) cho cách chọn $k$: giữ tỉ lệ phương sai $\operatorname{tr}(U^\top SU)/\operatorname{tr}(S)$ trên một ngưỡng, hoặc chặn lỗi nén trên mẫu. Chuẩn hóa đặc trưng làm thay đổi $S$, nên cũng thay đổi hướng chính thứ nhất. Ví dụ, đổi một đặc trưng từ mét sang milimét nhân phương sai của nó với $10^6$.

::: remark Nhận xét 14.5 (Phương sai lớn và tín hiệu cần dự đoán)
Xét $X=(M,N)$ với $M$ có phương sai $100$, $N\in\{-1,1\}$ có phương sai $1$, hai biến độc lập và có trung bình $0$. Ma trận hiệp phương sai là $\operatorname{diag}(100,1)$, nên PCA một chiều giữ $M$ và bỏ $N$. Nếu nhãn cần dự đoán là $N$, mã PCA không chứa thông tin nào về nhãn. Tiêu chuẩn (4.3) không dùng nhãn, nên không chọn đặc trưng theo khả năng dự đoán.
:::

### 4.3. Mở rộng: phân tích thành phần chính nhiều chiều

Với $k>1$, Mệnh đề 14.4 đưa bài toán nén về cực đại $\operatorname{tr}(U^\top SU)$. Kết quả sau mở rộng Mệnh đề 14.3: $k$ vector riêng đầu tiên là một nghiệm, và không gian con mà chúng sinh ra là duy nhất khi có khe giữa $\lambda_k$ và $\lambda_{k+1}$.

::: theorem Định lý 14.6 (Phân tích thành phần chính hạng $k$) — chứng minh đầy đủ ở Phụ lục A
**Giả thiết.** $S$, $\lambda_j$, $v_j$ như trong Mệnh đề 14.3; $1\le k\le d$; $V_k=(v_1,\ldots,v_k)\in\mathbb R^{d\times k}$.

**Kết luận.**

- **Giá trị tối ưu:** bài toán (4.2) có giá trị tối ưu $\sum_{j=1}^k\lambda_j$, đạt tại $U=V_k$; lỗi tái tạo nhỏ nhất trong (4.4) bằng $\sum_{j=k+1}^d\lambda_j$.
- **Tính duy nhất:** nếu $k<d$ và $\lambda_k>\lambda_{k+1}$, thì $U$ là nghiệm của (4.2) khi và chỉ khi $UU^\top=V_kV_k^\top$, tức các cột của $U$ sinh ra $\operatorname{span}(v_1,\ldots,v_k)$; khi đó $U=V_kQ$ với $Q\in\mathbb R^{k\times k}$ trực giao.
:::

Ta gọi $v_j$ là *thành phần chính* (principal component) thứ $j$ và $V_k^\top(x-\bar x)$ là tọa độ thành phần chính hạng $k$ của $x$. Với $k=1$, Định lý 14.6 cho lại giá trị tối ưu $\lambda_1$ của Mệnh đề 14.3. Tính duy nhất chỉ áp dụng cho không gian con và phép chiếu $UU^\top$: nhân $U$ bên phải với một ma trận trực giao $Q$ cho cùng phép chiếu nhưng tọa độ mã khác.

Như vậy, trong lớp các phép chiếu trực giao, Mệnh đề 14.4 và Định lý 14.6 xác định đầy đủ phép nén tốt nhất. Tuy nhiên mã và tái tạo vẫn bị giới hạn ở dạng tuyến tính $U^\top y$ và $Uz$. Trong Mục 5, chúng ta học hai ánh xạ mã hóa và giải mã tổng quát, rồi so sánh trường hợp tuyến tính với PCA.

## 5. Bộ tự mã hóa tất định

Với bốn quan sát của Ví dụ 14.1, mã PCA một chiều $z=x_1$ dựng lại đúng hai điểm nằm ngang và đưa hai điểm nằm dọc về gốc. Với một tập quan sát nằm gần một đường cong, mọi đường thẳng đều bỏ phần biến thiên dọc đường cong nằm ngoài đường thẳng đó, trong khi một tọa độ chạy dọc đường cong có thể giữ được nó. Chúng ta cần học cả ánh xạ mã hóa lẫn ánh xạ chuyển mã trở lại quan sát, không giới hạn ở phép chiếu.

Một cách trực quan, bộ mã hóa gán cho mỗi quan sát một tọa độ ít chiều, còn bộ giải mã dựng lại một điểm từ tọa độ đó. Hai vai trò này chưa nói gì về tần suất xuất hiện của các tọa độ.

::: definition Định nghĩa 14.7 (Bộ tự mã hóa và mục tiêu tái tạo)
Cho $1\le k\le d$. Một *bộ tự mã hóa* (autoencoder, AE) tất định gồm bộ mã hóa $f_\phi:\mathbb R^d\to\mathbb R^k$ và bộ giải mã $g_\theta:\mathbb R^k\to\mathbb R^d$. Với quan sát $x$, mã là $z=f_\phi(x)$ và tái tạo là $\widehat x=g_\theta(f_\phi(x))$. Với mất mát bình phương, bài toán huấn luyện trên mẫu $x_1,\ldots,x_n$ là

$$
\begin{aligned}
&\min_{\theta,\phi}\widehat J(\theta,\phi),\\
&\widehat J(\theta,\phi)=\frac1n\sum_{i=1}^n\|x_i-\widehat x_i\|_2^2,\\
&\widehat x_i=g_\theta(f_\phi(x_i)).
\end{aligned}
\tag{5.1}
$$

Khi dùng dữ liệu đã tâm hóa, hai hàm được áp dụng cho $y=x-\bar x$ và $\bar x$ được cộng lại ở đầu ra.
:::

PCA hạng $k$ là trường hợp $f(y)=U^\top y$ và $g(z)=Uz$ của Định nghĩa 14.7. Khi $f_\phi$ và $g_\theta$ là mạng nơ-ron như Định nghĩa 06.6, ảnh của bộ giải mã có thể là một tập cong, và gradient của (5.1) theo $(\theta,\phi)$ được tính bằng lan truyền ngược (Mệnh đề 06.13).

Chiều $k<d$ tạo một *nút thắt* (bottleneck): nếu $k=d$, cặp $f(x)=x$, $g(z)=z$ cho lỗi $0$ mà không học được cấu trúc nào (Murphy (2022), §20.3). Nút thắt không ngăn việc ghi nhớ một mẫu hữu hạn: với các quan sát phân biệt, bộ mã hóa gán $x_i\mapsto i$ và bộ giải mã gán $i\mapsto x_i$ cho lỗi $0$ ngay cả khi $k=1$.

Trường hợp tuyến tính cho phép tách hai đối tượng thường bị đồng nhất: ánh xạ tái tạo $g\circ f$ và hệ tọa độ của mã. Kết quả sau so sánh trường hợp này với PCA.

::: proposition Mệnh đề 14.8 (Bộ tự mã hóa tuyến tính và phân tích thành phần chính) — chứng minh đầy đủ
**Giả thiết.**

- **Dữ liệu:** các quan sát đã tâm hóa $y_1,\ldots,y_n\in\mathbb R^d$ có hiệp phương sai $S$ với trị riêng và vector riêng như Mệnh đề 14.3.
- **Ánh xạ tuyến tính:** bộ mã hóa $f(y)=Ay$ và bộ giải mã $g(z)=Bz$, với $A\in\mathbb R^{k\times d}$, $B\in\mathbb R^{d\times k}$, $1\le k\le d$, không có ràng buộc nào khác.
- **Lỗi:** $\widehat J(A,B)=n^{-1}\sum_i\|y_i-BAy_i\|_2^2$.

**Kết luận.**

- **Giá trị tối ưu:** $\min_{A,B}\widehat J(A,B)=\sum_{j=k+1}^d\lambda_j$, đạt tại $A=V_k^\top$, $B=V_k$.
- **Đổi tọa độ:** với mọi ma trận khả nghịch $R\in\mathbb R^{k\times k}$, cặp $(RA,BR^{-1})$ có cùng ánh xạ tái tạo $BA$ và cùng lỗi với $(A,B)$.
- **Mọi nghiệm tối ưu:** nếu thêm $k<d$, $\lambda_k>\lambda_{k+1}$ và $y_1,\ldots,y_n$ sinh ra $\mathbb R^d$, thì mọi nghiệm tối ưu thỏa $BA=V_kV_k^\top$, và tập nghiệm tối ưu là $\{(RV_k^\top,V_kR^{-1}):R\in\mathbb R^{k\times k}\text{ khả nghịch}\}$.
:::

::: proof Chứng minh Mệnh đề 14.8
**Lộ trình.** Với mọi $B$, tái tạo $BAy_i$ nằm trong ảnh $W$ của $B$; điểm gần $y_i$ nhất trong $W$ là hình chiếu trực giao. Điều này đưa bài toán về Định lý 14.6. Phân tích trường hợp dấu bằng cho mọi nghiệm tối ưu.

**Bước 1 (điểm gần nhất trong một không gian con).** Cho không gian con $W$ có cơ sở trực chuẩn là các cột của $U_W$, và $P_W=U_WU_W^\top$. Với mọi $y$, ta có $U_W^\top(y-P_Wy)=U_W^\top y-U_W^\top y=0$, nên $y-P_Wy$ vuông góc với $W$. Với $w\in W$, vector $P_Wy-w$ thuộc $W$, nên theo định lý Pythagore

$$
\begin{aligned}
\|y-w\|_2^2&=\|y-P_Wy\|_2^2\\
&\quad+\|P_Wy-w\|_2^2\\
&\ge\|y-P_Wy\|_2^2,
\end{aligned}
$$

với dấu bằng khi và chỉ khi $w=P_Wy$.

**Bước 2 (chặn dưới cho mọi cặp $A,B$).** Đặt $W$ là ảnh của $B$, có chiều $r\le k$. Vì $BAy_i\in W$, Bước 1 cho $\|y_i-BAy_i\|_2^2\ge\|y_i-P_Wy_i\|_2^2$. Bổ sung cơ sở trực chuẩn của $W$ thành $k$ vector trực chuẩn (được vì $k\le d$), ta có ma trận $U$ với $U^\top U=I_k$ và ảnh chứa $W$. Với $y$ bất kì, $y-P_Wy=(y-UU^\top y)+(UU^\top y-P_Wy)$, trong đó số hạng đầu vuông góc với ảnh của $U$ và số hạng sau thuộc ảnh đó, nên

$$
\begin{aligned}
&\|y-P_Wy\|_2^2\\
&\quad=\|y-UU^\top y\|_2^2\\
&\qquad+\|UU^\top y-P_Wy\|_2^2.
\end{aligned}
$$

Lấy trung bình theo $i$ và dùng Định lý 14.6:

$$
\begin{aligned}
\widehat J(A,B)
&\ge\frac1n\sum_{i=1}^n\|y_i-P_Wy_i\|_2^2\\
&\ge\frac1n\sum_{i=1}^n\|y_i-UU^\top y_i\|_2^2\\
&\ge\sum_{j=k+1}^d\lambda_j.
\end{aligned}
$$

**Bước 3 (đạt chặn).** Với $A=V_k^\top$, $B=V_k$, ta có $BA=V_kV_k^\top$, và Mệnh đề 14.4 cùng Định lý 14.6 cho $\widehat J(V_k^\top,V_k)=\sum_{j>k}\lambda_j$.

**Bước 4 (đổi tọa độ).** Nhân trực tiếp: $(BR^{-1})(RA)=BA$. Mọi tái tạo giữ nguyên nên lỗi giữ nguyên, dù mã đổi từ $Ay_i$ thành $RAy_i$.

**Bước 5 (mọi nghiệm tối ưu).** Giả sử $(A,B)$ tối ưu và các giả thiết bổ sung đúng. Khi đó ba bất đẳng thức của Bước 2 là đẳng thức.

- Bất đẳng thức thứ ba là đẳng thức nên $U$ là nghiệm của (4.2); theo phần tính duy nhất của Định lý 14.6, $UU^\top=V_kV_k^\top$.
- Bất đẳng thức thứ hai là đẳng thức nên $UU^\top y_i=P_Wy_i$ với mọi $i$. Hai ánh xạ tuyến tính trùng nhau trên một tập sinh $\mathbb R^d$ nên $P_W=UU^\top$; do đó $W$ là ảnh của $U$ và $P_W=V_kV_k^\top$.
- Bất đẳng thức thứ nhất là tổng các bất đẳng thức từng số hạng, nên mỗi số hạng là đẳng thức; Bước 1 cho $BAy_i=P_Wy_i$ với mọi $i$, và lập luận tập sinh cho $BA=V_kV_k^\top$.

Ma trận $BA$ có hạng $k$, nên $B$ có hạng $k$ và ảnh của $B$ bằng $\operatorname{span}(v_1,\ldots,v_k)$. Do đó $B=V_kM$ với $M=V_k^\top B\in\mathbb R^{k\times k}$ khả nghịch. Từ $V_kMA=V_kV_k^\top$, nhân bên trái với $V_k^\top$ và dùng $V_k^\top V_k=I_k$ cho $MA=V_k^\top$, tức $A=M^{-1}V_k^\top$. Đặt $R=M^{-1}$ thì $(A,B)=(RV_k^\top,V_kR^{-1})$. Ngược lại, mọi cặp dạng này có $BA=V_kV_k^\top$ và tối ưu theo Bước 3–4. $\square$

Như vậy bộ tự mã hóa tuyến tính tối ưu tái tạo đúng như PCA hạng $k$, còn tọa độ của mã chỉ xác định đến một phép biến đổi khả nghịch $R$.
:::

Khi các $y_i$ không sinh ra $\mathbb R^d$, đẳng thức $BA=V_kV_k^\top$ (Murphy (2022), §20.3.1) chỉ được bảo đảm trên không gian con do các $y_i$ sinh ra.

Trong học máy, Mệnh đề 14.8 cho phép dùng lỗi PCA $\sum_{j>k}\lambda_j$ làm mốc so sánh cho mọi bộ tự mã hóa tuyến tính: thêm tham số tuyến tính không làm lỗi tối ưu nhỏ hơn. Mệnh đề nói về cực tiểu toàn cục: cặp $A=0$, $B=0$ có gradient của $\widehat J$ bằng $0$ nhưng không tối ưu khi $\lambda_1>0$, nên một điểm dừng của hạ gradient chưa chắc là nghiệm của Mệnh đề 14.8.

Ràng buộc $AA^\top=I_k$ chỉ thu hẹp $R$ về các ma trận trực giao, nên mỗi tọa độ mã vẫn có thể là một tổ hợp quay của các thành phần chính. Với một nghiệm tối ưu của Mệnh đề 14.8 thỏa thêm $AA^\top=I_k$, và khi $\lambda_1>\cdots>\lambda_k$, hai điều kiện nữa sẽ chốt từng tọa độ: các tọa độ mã không tương quan trên mẫu và được xếp theo phương sai giảm dần. Khi đó ma trận hiệp phương sai của mã $R\operatorname{diag}(\lambda_1,\ldots,\lambda_k)R^\top$ là ma trận chéo với đường chéo giảm dần, nên $R$ là ma trận chéo với các phần tử $\pm1$, và mã trùng tọa độ PCA $V_k^\top y$ sai khác dấu từng tọa độ.

::: example Ví dụ 14.3 (Đổi độ lớn mã mà không đổi tái tạo)
**Dữ kiện.** Bốn quan sát của Ví dụ 14.1, $k=1$, cặp PCA $A=(1\ \ 0)$, $B=(1\ \ 0)^\top$. Chọn $R=(2)$, nên $A'=RA=(2\ \ 0)$ và $B'=BR^{-1}=(1/2\ \ 0)^\top$.

**Mã của $(2,0)^\top$.** Với cặp gốc, mã là $2$ và tái tạo là $B\cdot2=(2,0)^\top$. Với cặp mới, mã là $4$ và tái tạo là $B'\cdot4=(2,0)^\top$.

**Mã của $(0,1)^\top$.** Cả hai cặp cho mã $0$ và tái tạo $(0,0)^\top$.

**Ánh xạ tái tạo.** $B'A'=\begin{pmatrix}1/2\\0\end{pmatrix}(2\ \ 0)=\operatorname{diag}(1,0)=BA$, nên lỗi trung bình của cả hai cặp bằng $1/2$ như Ví dụ 14.2.

**Phương sai của mã.** Với cặp gốc, $(4+4+0+0)/4=2=\lambda_1$. Với cặp mới, $(16+16+0+0)/4=8$.

**Kiểm tra lại.** $8=R^2\cdot2$, đúng hệ số của phép đổi tọa độ.

Phương sai của mã một bộ tự mã hóa không chuẩn hóa vì vậy không đọc được như trị riêng PCA, dù hai cặp cho cùng tái tạo.
:::

Mệnh đề 14.8 và Ví dụ 14.3 trả lời câu hỏi nén của Ví dụ 14.1. Câu hỏi sinh dữ liệu cần xét phân phối của mã, như ví dụ sau.

::: example Ví dụ 14.4 (Tái tạo đúng chưa xác định phân phối)
**Dữ kiện.** Hai quan sát huấn luyện $(-2,0)^\top$ và $(2,0)^\top$; bộ tự mã hóa $f(x)=x_1$, $g(z)=(z,0)^\top$ của Ví dụ 14.1.

**Tái tạo.** Hai mã là $-2$ và $2$; cả hai quan sát được dựng lại đúng, nên lỗi trên mẫu bằng $0$.

**Hai cơ chế sinh.** Cơ chế thứ nhất lấy $Z\in\{-2,2\}$ với xác suất $1/2$ mỗi giá trị rồi trả về $X=g(Z)$; nó chỉ sinh lại hai quan sát huấn luyện. Cơ chế thứ hai lấy $Z\sim\mathcal N(0,1)$ rồi trả về $X=g(Z)$; nó sinh các điểm trải dọc toàn trục ngang.

**So sánh mômen.** Cơ chế thứ nhất cho $\mathbb E[X_1^2]=\mathbb E[Z^2]=(4+4)/2=4$, cơ chế thứ hai cho $\mathbb E[X_1^2]=1$. Cùng hàm $g$ và cùng lỗi tái tạo $0$ đi với hai phân phối khác nhau.

**Kiểm tra lại.** Cả hai phân phối của $X$ gán xác suất $1$ cho trục ngang, một tập có diện tích bằng $0$. Nếu $X$ có mật độ hai chiều, xác suất của tập đó bằng tích phân của mật độ trên một tập diện tích $0$, tức bằng $0$; điều này mâu thuẫn. Vậy không cơ chế nào có mật độ hai chiều.

Lỗi tái tạo bằng $0$ không chọn được cơ chế sinh. Đây là lý do cách sinh $g(Z)$ với $Z\sim\mathcal N(0,1)$ trong Câu hỏi mở đầu không có căn cứ: bộ tự mã hóa không chứa thông tin về phân phối của mã.
:::

::: remark Nhận xét 14.9 (Khả năng biểu diễn và chất lượng sinh)
Một bộ tự mã hóa phi tuyến có thể giảm lỗi trên mẫu nhờ biểu diễn linh hoạt hơn. Định nghĩa 14.7 không quy định phân phối của mã và không ràng buộc bộ giải mã tại những mã không xuất hiện khi huấn luyện; bộ giải mã chỉ được khớp tại các mã của tập huấn luyện (Murphy (2022), §20.3.5.3). Do đó lỗi huấn luyện nhỏ không chứng minh rằng giải mã một mã ngẫu nhiên cho dữ liệu phù hợp.
:::

Như vậy Định nghĩa 14.7 cho mục tiêu học biểu diễn bằng tái tạo, và Mệnh đề 14.8 cho thấy trong trường hợp tuyến tính, mục tiêu đó xác định phép tái tạo nhưng không xác định tọa độ của mã. Tuy nhiên Ví dụ 14.4 cho thấy cặp ánh xạ tất định không chứa phân phối nào để sinh dữ liệu. Trong Mục 6, chúng ta bổ sung một phân phối cho mã và một phân phối cho quan sát quanh đầu ra giải mã.

## 6. Mô hình xác suất có biến ẩn

Trong Câu hỏi mở đầu, cách sinh $g(Z)$ với $Z\sim\mathcal N(0,1)$ cho $\mathbb E[X_1^2]=1$ thay vì $2$ và cho tọa độ thứ hai luôn bằng $0$, trong khi dữ liệu có hai quan sát với $x_2=\pm1$. Hai sai lệch này chỉ ra hai thành phần còn thiếu: một phân phối cho mã được chọn sao cho mô hình khớp dữ liệu, và một nhiễu mô tả độ phân tán của quan sát quanh $g(z)$.

Về mặt ý tưởng, cơ chế sinh có hai bước: chọn một trạng thái không quan sát được, rồi tạo quan sát có điều kiện theo trạng thái ấy. Trực giác này tách tính ngẫu nhiên của mã khỏi nhiễu của quan sát.

::: definition Định nghĩa 14.10 (Mô hình sinh có biến ẩn)
Một *mô hình sinh có biến ẩn* (latent variable model) liên tục gồm các thành phần sau.

- **Tiên nghiệm:** một mật độ $p(z)$ trên $\mathbb R^k$ của *biến ẩn* (latent variable) $Z$.
- **Phân phối quan sát có điều kiện:** với mỗi $z$, một mật độ $p_\theta(x\mid z)$ trên $\mathbb R^d$, chuẩn hóa theo $x$.
- **Mật độ đồng thời và mật độ biên:**

$$
\begin{gathered}
p_\theta(x,z)=p_\theta(x\mid z)p(z),\\
p_\theta(x)=\int_{\mathbb R^k}p_\theta(x\mid z)p(z)\,dz.
\end{gathered}
\tag{6.1}
$$

Một lựa chọn Gaussian là

$$
\begin{gathered}
p(z)=\mathcal N(0,I_k),\\
p_\theta(x\mid z)=\mathcal N(g_\theta(z),\tau^2I_d),\\
\tau>0,
\end{gathered}
\tag{6.2}
$$

trong đó $g_\theta(z)$ là trung bình có điều kiện của $X$ khi $Z=z$.
:::

Mật độ biên trong (6.1) là công thức (8.4) của Bài 10 (Mệnh đề 10.32) áp dụng cho cặp $(X,Z)$. Vì tích phân của hàm không âm có thể đổi thứ tự, $\int p_\theta(x)\,dx=\int p(z)\big(\int p_\theta(x\mid z)\,dx\big)dz=\int p(z)\,dz=1$. Như vậy mô hình được chuẩn hóa ngay cả khi tích phân biên tại một quan sát cụ thể không tính được.

Trong (6.2), nhiễu có phương sai $\tau^2>0$ làm $X$ có mật độ trên toàn $\mathbb R^d$. Khi $\tau=0$ và $k<d$, $X=g_\theta(Z)$ nằm trên ảnh của bộ giải mã, và theo lập luận của Ví dụ 14.4, $X$ không có mật độ trên $\mathbb R^d$ nếu ảnh đó có thể tích bằng $0$. Bộ tự mã hóa của Định nghĩa 14.7 chính là trường hợp chỉ có trung bình $g_\theta$, thiếu cả tiên nghiệm lẫn nhiễu.

### 6.1. Ba phép tính trên một mô hình sinh

Cùng một mô hình (6.1) đặt ra ba phép tính có độ khó khác nhau, và chúng ta cần tách chúng trước khi chọn công cụ.

::: definition Định nghĩa 14.11 (Sinh mẫu, hợp lý và suy luận hậu nghiệm)
Với mô hình trong Định nghĩa 14.10:

1. *Sinh mẫu* là lấy $z\sim p(z)$ rồi lấy $x\sim p_\theta(x\mid z)$.
2. *Đánh giá hợp lý* tại quan sát $x$ là tính $p_\theta(x)$ hoặc $\log p_\theta(x)$ bằng tích phân (6.1).
3. *Suy luận hậu nghiệm* tại $x$ có $0<p_\theta(x)<\infty$ là xác định mật độ hậu nghiệm

$$
p_\theta(z\mid x)=\frac{p_\theta(x\mid z)p(z)}{p_\theta(x)}.
\tag{6.3}
$$
:::

Công thức (6.3) là công thức Bayes cho mật độ: Mệnh đề 10.33 của Bài 10 với mật độ đồng thời thay bằng $p_\theta(x\mid z)p(z)$ trong (6.1). Trong đánh giá hợp lý, $x$ cố định và $\theta$ là tham số cần học, như hàm hợp lý của Định nghĩa 11.2. Sinh mẫu chỉ cần một lần lấy $z$ và một lần chạy bộ giải mã; hai phép tính còn lại cần tích phân theo mọi mã.

::: example Ví dụ 14.5 (Mô hình sinh tuyến tính Gaussian hai chiều)
**Dữ kiện.** Mô hình (6.2) với $k=1$, $d=2$, $g(z)=(wz,0)^\top$, $w=\sqrt{3/2}$, $\tau^2=1/2$. Nghĩa là $Z\sim\mathcal N(0,1)$ và $X\mid Z=z\sim\mathcal N\big((wz,0)^\top,\tfrac12I_2\big)$. Cần tính mật độ biên của $X$ và hậu nghiệm của $Z$.

**Log-mật độ đồng thời.** Với $\tau^2=1/2$, hệ số $1/(2\tau^2)$ bằng $1$. Bỏ hằng số chuẩn hóa không phụ thuộc $(x,z)$,

$$
\begin{aligned}
&\log p(x,z)\\
&\quad=\text{hằng số}-\frac{z^2}{2}\\
&\qquad-(x_1-wz)^2-x_2^2.
\end{aligned}
$$

**Hoàn bình phương theo $z$.** Khai triển $(x_1-wz)^2=x_1^2-2wx_1z+w^2z^2$ và dùng $w^2=3/2$:

$$
\begin{aligned}
&-\frac{z^2}{2}-(x_1-wz)^2\\
&\quad=-2z^2+2wx_1z-x_1^2\\
&\quad=-2\Big(z-\frac{wx_1}{2}\Big)^2\\
&\qquad+\frac{w^2x_1^2}{2}-x_1^2\\
&\quad=-2\Big(z-\frac{wx_1}{2}\Big)^2-\frac{x_1^2}{4}.
\end{aligned}
$$

**Mật độ biên.** Theo (6.1), lấy tích phân theo $z$. Tích phân $\int_{\mathbb R}e^{-2(z-c)^2}dz=\sqrt{\pi/2}$ không phụ thuộc $c$, nên

$$
\begin{aligned}
p(x)&\propto\exp\Big(-\frac{x_1^2}{4}-x_2^2\Big)\\
&=\exp\Big(-\frac{x_1^2}{2\cdot2}-\frac{x_2^2}{2\cdot\frac12}\Big).
\end{aligned}
$$

Vế phải tỉ lệ với mật độ $\mathcal N\big(0,\operatorname{diag}(2,\tfrac12)\big)$ theo công thức (6.12) của Bài 10 (Định nghĩa 10.20). Hai mật độ tỉ lệ cùng có tích phân $1$ nên bằng nhau: $X\sim\mathcal N\big(0,\operatorname{diag}(2,\tfrac12)\big)$.

**Hậu nghiệm.** Theo (6.3), với $x$ cố định, $p(z\mid x)$ tỉ lệ với $\exp\big(-2(z-wx_1/2)^2\big)$. Hệ số $2=1/(2\cdot\tfrac14)$ cho $Z\mid X=x\sim\mathcal N(wx_1/2,1/4)$. Tại $x=(2,0)^\top$, hậu nghiệm có trung bình $w=\sqrt{3/2}$ và phương sai $1/4$.

**Kiểm tra lại.** Viết $X_1=wZ+\eta_1$ với nhiễu $\eta_1\sim\mathcal N(0,1/2)$ độc lập với $Z$. Khi đó $\mathbb E[X_1^2]=w^2\mathbb E[Z^2]+2w\,\mathbb E[Z]\mathbb E[\eta_1]+\mathbb E[\eta_1^2]=3/2+0+1/2=2$, khớp phương sai biên.

Hiệp phương sai biên trùng $S=\operatorname{diag}(2,1/2)$ của Ví dụ 14.2. Mô hình này trả lời Câu hỏi mở đầu: nó sinh điểm ra ngoài trục ngang, với $X_2\sim\mathcal N(0,1/2)$, và có $\mathbb E[X_1^2]=2$ như dữ liệu.

Các tham số $w^2=\lambda_1-\lambda_2$ và $\tau^2=\lambda_2$ chính là nghiệm hợp lý cực đại của PCA xác suất (probabilistic PCA) với một chiều ẩn (Murphy (2022), §20.2.2). Phân phối Gaussian liên tục này vẫn khác phân phối thực nghiệm đặt khối lượng $1/4$ tại mỗi quan sát.
:::

Ví dụ 14.5 tính được biên và hậu nghiệm vì log-mật độ đồng thời là hàm bậc hai theo $z$. Khi thay $wz$ bằng một mạng phi tuyến $g_\theta(z)$, số hạng $-\|x-g_\theta(z)\|_2^2/(2\tau^2)$ không còn bậc hai theo $z$, và tích phân (6.1) nói chung không có dạng đóng. Tính số bằng lưới $N$ điểm trên mỗi tọa độ của $z$ cần $N^k$ lần chạy bộ giải mã cho một quan sát; với $N=100$ và $k=10$, con số này là $10^{20}$. Công thức Bayes (6.3) vẫn đúng; khó khăn nằm ở mẫu số $p_\theta(x)$, cũng chính là đại lượng cần cho đánh giá hợp lý (Murphy (2023), §21.1).

Như vậy Định nghĩa 14.10 xây dựng phân phối dữ liệu bằng phép lấy biên, và Định nghĩa 14.11 tách sinh mẫu khỏi đánh giá hợp lý và suy luận hậu nghiệm. Tuy nhiên với bộ giải mã phi tuyến, cả $\log p_\theta(x)$ lẫn hậu nghiệm đều cần một tích phân không tính được. Trong Mục 7, chúng ta thay hậu nghiệm bằng một phân phối dễ tính và xây dựng một đại lượng tính được, kèm theo khoảng cách chính xác của nó tới $\log p_\theta(x)$.

## 7. Suy luận biến phân và cận dưới bằng chứng

Theo Mệnh đề 11.3, học $\theta$ bằng hợp lý cực đại là cực tiểu $-\frac1n\sum_i\log p_\theta(x_i)$. Trong mô hình có biến ẩn, mỗi số hạng $\log p_\theta(x_i)$ chứa tích phân (6.1), không tính được khi bộ giải mã phi tuyến. Chúng ta cần một đại lượng chỉ gồm các kỳ vọng theo một phân phối tự chọn, có thể ước lượng bằng mẫu, và cần biết chính xác đại lượng đó lệch khỏi $\log p_\theta(x)$ bao nhiêu.

Về mặt ý tưởng, một phân phối dễ lấy mẫu nên đặt khối lượng ở những mã giải thích tốt quan sát $x$, tức ở nơi hậu nghiệm lớn. Để nói "gần hậu nghiệm" một cách định lượng, chúng ta cần một thước đo sự khác nhau giữa hai phân phối.

### 7.1. Phân kỳ Kullback–Leibler

::: definition Định nghĩa 14.12 (Phân kỳ Kullback–Leibler)
Cho hai mật độ chuẩn hóa $q,p$ trên $\mathbb R^k$. Tập $\{z:q(z)>0\}$ được gọi là *miền hỗ trợ* (support) của $q$. *Phân kỳ Kullback–Leibler* (Kullback–Leibler divergence, KL) từ $q$ đến $p$ là

$$
\begin{aligned}
&\mathrm{KL}(q\,\|\,p)\\
&\quad=\int_{\{q>0\}}q(z)\log\frac{q(z)}{p(z)}\,dz,
\end{aligned}
\tag{7.1}
$$

với quy ước: nếu tập $\{z:q(z)>0,\ p(z)=0\}$ có xác suất dương theo $q$ thì $\mathrm{KL}(q\,\|\, p)=+\infty$. Ta nói $q$ *tuyệt đối liên tục* (absolutely continuous) đối với $p$ nếu mọi tập có xác suất $0$ theo $p$ cũng có xác suất $0$ theo $q$.
:::

Định nghĩa 14.12 so sánh toàn bộ hai mật độ, không chỉ trung bình hay hiệp phương sai. Thứ tự hai đối số có vai trò: kỳ vọng được lấy theo $q$, và nói chung $\mathrm{KL}(q\,\|\, p)\ne \mathrm{KL}(p\,\|\, q)$. Vì không đối xứng, KL không phải một khoảng cách theo nghĩa metric.

Bài 11 đã dùng KL giữa hai phân phối trên $K$ nhóm để đọc lại Định lý 11.7 qua đẳng thức (6.3) của Bài 11, và chứng minh KL không âm trong trường hợp rời rạc bằng bất đẳng thức $\log t\le t-1$. Kết quả sau mở rộng tính không âm sang mật độ với cùng bất đẳng thức; nó cho phép biến một đẳng thức chứa KL thành một cận.

::: lemma Bổ đề 14.13 (Tính không âm của KL) — chứng minh đầy đủ
**Giả thiết.** $q,p$ là hai mật độ chuẩn hóa trên $\mathbb R^k$.

**Kết luận.** Tích phân (7.1) xác định, với giá trị trong $[0,+\infty]$. Hơn nữa, $\mathrm{KL}(q\,\|\, p)=0$ khi và chỉ khi $q=p$ hầu khắp nơi, tức ngoài một tập có thể tích bằng $0$.
:::

::: proof Chứng minh Bổ đề 14.13
**Lộ trình.** Áp dụng bất đẳng thức $-\log t\ge1-t$ với $t=p/q$ trên miền hỗ trợ $\mathcal S_q=\{q>0\}$ của $q$; đọc điều kiện dấu bằng từ một hàm không âm có tích phân $0$.

**Bước 1 (bất đẳng thức logarit, như trong Kiến thức tiên quyết của Bài 11).** Hàm $\psi(t)=t-1-\log t$ trên $(0,\infty)$ có $\psi'(t)=1-1/t$, âm trên $(0,1)$ và dương trên $(1,\infty)$. Do đó $\psi$ đạt giá trị nhỏ nhất $\psi(1)=0$, nên $-\log t\ge1-t$ với mọi $t>0$, và dấu bằng xảy ra khi và chỉ khi $t=1$.

**Bước 2 (trường hợp vô hạn).** Nếu tập $\{q>0,\ p=0\}$ có xác suất dương theo $q$, quy ước của Định nghĩa 14.12 cho $\mathrm{KL}=+\infty\ge0$; khi đó $q\ne p$ trên một tập có xác suất dương nên dấu bằng không xảy ra. Từ đây giả sử $p>0$ tại hầu mọi điểm của $\mathcal S_q$, và đặt $t(z)=p(z)/q(z)\in(0,\infty)$ trên $\mathcal S_q$.

**Bước 3 (tích phân xác định).** Trên $\mathcal S_q$, Bước 1 cho

$$
\begin{aligned}
q\log\frac qp&=-q\log t\\
&=q\,\psi(t)+q(1-t)\\
&=q\,\psi(t)+q-p.
\end{aligned}
$$

Vì $q\psi(t)\ge0$ và $q\ge0$, hàm $q\log(q/p)$ không nhỏ hơn $-p$. Phần âm của hàm dưới dấu tích phân vì vậy bị chặn bởi $p$, một hàm khả tích, nên tích phân (7.1) xác định trong $(-\infty,+\infty]$.

**Bước 4 (không âm).** Lấy tích phân đẳng thức của Bước 3 trên $\mathcal S_q$ và dùng $\int_{\mathcal S_q}q=1$:

$$
\begin{aligned}
&\mathrm{KL}(q\,\|\,p)\\
&\quad=\int_{\mathcal S_q}q\,\psi(t)\,dz+\int_{\mathcal S_q}(q-p)\,dz\\
&\quad=\int_{\mathcal S_q}q\,\psi(t)\,dz+\Big(1-\int_{\mathcal S_q}p\,dz\Big)\\
&\quad\ge0.
\end{aligned}
$$

Cả hai số hạng ở dòng thứ ba không âm: số hạng đầu vì $q\psi(t)\ge0$, số hạng sau vì $\int_{\mathcal S_q}p\le\int p=1$.

**Bước 5 (dấu bằng).** Nếu $\mathrm{KL}(q\,\|\, p)=0$, cả hai số hạng ở Bước 4 bằng $0$. Hàm không âm $q\psi(t)$ có tích phân $0$ trên $\mathcal S_q$ nên bằng $0$ hầu khắp nơi trên $\mathcal S_q$; theo Bước 1, $t=1$, tức $p=q$ hầu khắp nơi trên $\mathcal S_q$. Đẳng thức $\int_{\mathcal S_q}p=1$ cho $\int_{\{q=0\}}p=0$, nên $p=0=q$ hầu khắp nơi ngoài $\mathcal S_q$. Ngược lại, nếu $p=q$ hầu khắp nơi thì $\log(q/p)=0$ hầu khắp nơi trên $\mathcal S_q$ và $\mathrm{KL}=0$. $\square$

Như vậy KL là một mức phạt không âm, bằng $0$ đúng khi hai phân phối trùng nhau; đây là tính chất cần để biến một đẳng thức thành một cận.
:::

Trong học máy, Bổ đề 14.13 cho phép dùng KL để phạt sự lệch của phân phối mã hóa khỏi một phân phối tham chiếu. Phân phối tham chiếu có thể là tiên nghiệm $p(z)$ hoặc hậu nghiệm $p_\theta(z\mid x)$, và hai lựa chọn này đóng hai vai trò khác nhau trong kết quả của mục con sau.

### 7.2. Cận dưới bằng chứng

::: definition Định nghĩa 14.14 (Hậu nghiệm xấp xỉ và cận dưới bằng chứng)
Cho mô hình của Định nghĩa 14.10 và một quan sát $x$ cố định. Một mật độ chuẩn hóa $q_\phi(z\mid x)$ trên $\mathbb R^k$, dễ lấy mẫu và dùng thay cho hậu nghiệm $p_\theta(z\mid x)$, được gọi là *hậu nghiệm xấp xỉ* (approximate posterior). Ta gọi $\log p_\theta(x)$ là *log-hợp lý biên* (còn gọi là bằng chứng, evidence). *Cận dưới bằng chứng* (evidence lower bound, ELBO; còn gọi là cận dưới của log-hợp lý) là

$$
\begin{aligned}
&\mathcal L(\theta,\phi;x)\\
&\quad=\mathbb E_{q_\phi(z\mid x)}\!\left[\log\frac{p_\theta(x,Z)}{q_\phi(Z\mid x)}\right]\\
&\quad=\mathbb E_{q_\phi(z\mid x)}[\log p_\theta(x\mid Z)]\\
&\qquad-\mathrm{KL}\!\left(q_\phi(\cdot\mid x)\,\|\,p\right),
\end{aligned}
\tag{7.2}
$$

khi các kỳ vọng trong (7.2) hữu hạn.
:::

Dạng thứ hai của (7.2) suy từ dạng thứ nhất bằng $p_\theta(x,z)=p_\theta(x\mid z)p(z)$ và tách logarit: $\log\frac{p_\theta(x,z)}{q_\phi}=\log p_\theta(x\mid z)-\log\frac{q_\phi}{p(z)}$. Số hạng đầu là *kỳ vọng tái tạo*, số hạng sau là KL tới tiên nghiệm.

Trong bài này, $\mathcal L$ chỉ dùng cho ELBO. Định nghĩa 14.14 dùng một phân phối mã hóa thay cho mã đơn lẻ $f_\phi(x)$ của Định nghĩa 14.7. Phân phối $q_\phi$ chỉ là công cụ suy luận; mô hình sinh vẫn do $p(z)$ và $p_\theta(x\mid z)$ xác định.

Kết quả sau dùng công thức Bayes (6.3) và Bổ đề 14.13 để đo chính xác khoảng cách giữa $\mathcal L$ và $\log p_\theta(x)$ (Murphy (2023), §10.1.1).

::: theorem Định lý 14.15 (Phân rã log-hợp lý qua ELBO) — chứng minh đầy đủ
**Giả thiết.** Với quan sát $x$ cố định:

- **Mật độ biên:** $0<p_\theta(x)<\infty$.
- **Miền hỗ trợ:** $p_\theta(x,z)>0$ tại hầu mọi $z$ có $q_\phi(z\mid x)>0$; khi đó $q_\phi(\cdot\mid x)$ tuyệt đối liên tục đối với $p_\theta(\cdot\mid x)$.
- **Tính hữu hạn:** $\mathbb E_{q_\phi}\lvert\log q_\phi(Z\mid x)\rvert<\infty$ và $\mathbb E_{q_\phi}\lvert\log p_\theta(x,Z)\rvert<\infty$.

**Kết luận.**

- **Phân rã:** ta có đẳng thức

$$
\begin{aligned}
&\log p_\theta(x)=\mathcal L(\theta,\phi;x)\\
&\quad+\mathrm{KL}\big(q_\phi(\cdot\mid x)\\
&\qquad\,\|\,p_\theta(\cdot\mid x)\big).
\end{aligned}
\tag{7.3}
$$

- **Cận dưới:** $\mathcal L(\theta,\phi;x)\le\log p_\theta(x)$, với dấu bằng khi và chỉ khi $q_\phi(\cdot\mid x)=p_\theta(\cdot\mid x)$ hầu khắp nơi.
- **Tối ưu theo $\phi$:** với $\theta$ cố định, cực đại $\mathcal L(\theta,\phi;x)$ theo $\phi$ tương đương cực tiểu $\mathrm{KL}(q_\phi(\cdot\mid x)\,\|\, p_\theta(\cdot\mid x))$ theo $\phi$.
:::

::: proof Chứng minh Định lý 14.15
**Lộ trình.** Thay công thức Bayes vào tỉ số trong KL tới hậu nghiệm, lấy kỳ vọng theo $q_\phi$, rồi dùng Bổ đề 14.13.

**Bước 1 (thay công thức Bayes).** Tại $z$ có $q_\phi(z\mid x)>0$, giả thiết miền hỗ trợ và (6.3) cho $p_\theta(z\mid x)=p_\theta(x,z)/p_\theta(x)>0$, nên

$$
\begin{aligned}
&\log\frac{q_\phi(z\mid x)}{p_\theta(z\mid x)}\\
&\quad=\log q_\phi(z\mid x)-\log p_\theta(x,z)\\
&\qquad+\log p_\theta(x).
\end{aligned}
$$

**Bước 2 (lấy kỳ vọng).** Hai số hạng đầu có kỳ vọng hữu hạn theo giả thiết tính hữu hạn. Số hạng cuối là hằng số theo $z$ và $q_\phi$ chuẩn hóa, nên kỳ vọng của nó bằng $\log p_\theta(x)$. Do đó

$$
\begin{aligned}
&\mathrm{KL}\!\left(q_\phi\,\|\,p_\theta(\cdot\mid x)\right)\\
&\quad=\mathbb E_{q_\phi}\big[\log q_\phi(Z\mid x)\\
&\qquad-\log p_\theta(x,Z)\big]+\log p_\theta(x)\\
&\quad=-\mathcal L(\theta,\phi;x)+\log p_\theta(x).
\end{aligned}
$$

Chuyển vế cho (7.3).

**Bước 3 (cận và dấu bằng).** Bổ đề 14.13 cho KL tới hậu nghiệm không âm, nên $\mathcal L\le\log p_\theta(x)$; điều kiện dấu bằng của bổ đề cho điều kiện dấu bằng của cận.

**Bước 4 (tối ưu theo $\phi$).** Theo (7.3), $\mathcal L(\theta,\phi;x)=\log p_\theta(x)-\mathrm{KL}(q_\phi\,\|\, p_\theta(\cdot\mid x))$, và $\log p_\theta(x)$ không phụ thuộc $\phi$. Vậy hai bài toán tối ưu theo $\phi$ có cùng tập nghiệm. $\square$

Như vậy bài toán tích phân khó $\log p_\theta(x)$ được thay bằng bài toán tối ưu một cận dưới chỉ gồm các kỳ vọng theo $q_\phi$, và phần bị mất đúng bằng KL tới hậu nghiệm.
:::

Định lý 14.15 cho phép định nghĩa cách suy luận khi hậu nghiệm không tính được.

::: definition Định nghĩa 14.16 (Suy luận biến phân)
Cho mô hình của Định nghĩa 14.10 với $\theta$ cố định, một quan sát $x$ và một họ $\mathcal Q$ các mật độ trên $\mathbb R^k$, chẳng hạn họ Gaussian có hiệp phương sai chéo. *Suy luận biến phân* (variational inference) là bài toán chọn $q\in\mathcal Q$ cực đại $\mathbb E_q[\log p_\theta(x,Z)-\log q(Z)]$. Theo Định lý 14.15, bài toán này tương đương cực tiểu $\mathrm{KL}(q\,\|\, p_\theta(\cdot\mid x))$ trên $\mathcal Q$.
:::

Hai KL trong Định lý 14.15 đóng hai vai trò khác nhau. KL tới **tiên nghiệm** nằm trong mục tiêu (7.2) và tính được khi $q_\phi$ và $p(z)$ có dạng đơn giản. KL tới **hậu nghiệm** là khe hở của cận trong (7.3) và thường không tính được, vì hậu nghiệm chứa $p_\theta(x)$. Khi cả $\theta$ cũng thay đổi, khe hở phụ thuộc $\theta$, nên tăng $\mathcal L$ không bảo đảm $\log p_\theta(x)$ tăng.

Trong học máy, $\log p_\theta(x)$ là mục tiêu của hợp lý cực đại (Mệnh đề 11.3) nhưng không tính được khi bộ giải mã là mạng nơ-ron, nên ELBO là đại lượng được tối ưu khi huấn luyện mô hình có biến ẩn. Khe hở (7.3) phụ thuộc họ hậu nghiệm xấp xỉ: với một họ hẹp như Gaussian có hiệp phương sai chéo, khe hở có thể lớn, nên một ELBO cao chỉ là cận dưới của log-hợp lý và không tự chứng minh mô hình khớp dữ liệu.

Cận dưới cũng suy được từ bất đẳng thức Jensen cho hàm lõm $\log$: $\mathcal L\le\log\mathbb E_{q}[p_\theta(x,Z)/q(Z)]=\log\int_{\{q>0\}}p_\theta(x,z)\,dz\le\log p_\theta(x)$ (Murphy (2022), §20.3.5.1). Đường Jensen cho cận; đường Bayes ở trên cho thêm giá trị chính xác của khe hở.

### 7.3. KL giữa các phân phối Gaussian

Để dùng (7.2), chúng ta cần tính KL tới tiên nghiệm. Với tiên nghiệm chuẩn và hậu nghiệm xấp xỉ Gaussian, KL có công thức đóng; bộ giải mã vẫn có thể là mạng phi tuyến. Bổ đề sau tính KL giữa hai Gaussian một chiều tùy ý; trường hợp tổng quát này cũng dùng để kiểm tra khe hở của cận trong các ví dụ.

::: lemma Bổ đề 14.17 (KL giữa hai Gaussian một chiều) — chứng minh đầy đủ
**Giả thiết.** $q=\mathcal N(a,\beta)$ và $p=\mathcal N(c,\gamma)$ với $a,c\in\mathbb R$ và các phương sai $\beta,\gamma>0$.

**Kết luận.**

$$
\begin{aligned}
&\mathrm{KL}(q\,\|\,p)\\
&\quad=\frac12\Big[\log\frac\gamma\beta+\frac{\beta+(a-c)^2}{\gamma}\\
&\qquad-1\Big].
\end{aligned}
\tag{7.4}
$$
:::

::: proof Chứng minh Bổ đề 14.17
**Lộ trình.** Lấy hiệu hai log-mật độ Gaussian, rồi tính kỳ vọng của từng số hạng theo $q$ bằng hai mômen của $q$.

**Bước 1 (hiệu log-mật độ).** Theo mật độ Gaussian một chiều của Định nghĩa 10.20 (công thức (6.11) của Bài 10),

$$
\begin{aligned}
\log\frac{q(z)}{p(z)}&=\frac12\log\frac\gamma\beta-\frac{(z-a)^2}{2\beta}\\
&\quad+\frac{(z-c)^2}{2\gamma}.
\end{aligned}
$$

**Bước 2 (hai mômen).** Dưới $q$, $\mathbb E_q[Z]=a$ và $\mathbb E_q[(Z-a)^2]=\beta$. Khai triển $Z-c=(Z-a)+(a-c)$:

$$
\begin{aligned}
&\mathbb E_q[(Z-c)^2]\\
&\quad=\beta+2(a-c)\,\mathbb E_q[Z-a]\\
&\qquad+(a-c)^2\\
&\quad=\beta+(a-c)^2.
\end{aligned}
$$

**Bước 3 (kỳ vọng từng số hạng).**

$$
\begin{aligned}
\mathbb E_q\Big[\frac12\log\frac\gamma\beta\Big]&=\frac12\log\frac\gamma\beta,\\
\mathbb E_q\Big[-\frac{(Z-a)^2}{2\beta}\Big]&=-\frac12,\\
\mathbb E_q\Big[\frac{(Z-c)^2}{2\gamma}\Big]&=\frac{\beta+(a-c)^2}{2\gamma}.
\end{aligned}
$$

Cộng ba dòng theo tính tuyến tính của kỳ vọng cho (7.4). $\square$

Như vậy KL giữa hai Gaussian chỉ phụ thuộc hai trung bình và hai phương sai, nên tính được chính xác mà không cần lấy mẫu.
:::

Với $a=c$ và $\beta=\gamma$, (7.4) bằng $0$, đúng như Bổ đề 14.13. Công thức cũng cho thấy KL không đối xứng. Với $q=\mathcal N(0,1)$ và $p=\mathcal N(0,2)$, ta có $\mathrm{KL}(q\,\|\, p)=\tfrac12(\log2+\tfrac12-1)=\tfrac12\log2-\tfrac14\approx0{,}0966$, còn $\mathrm{KL}(p\,\|\, q)=\tfrac12(\log\tfrac12+2-1)=\tfrac12(1-\log2)\approx0{,}1534$.

::: proposition Mệnh đề 14.18 (KL từ Gaussian chéo tới Gaussian chuẩn) — chứng minh đầy đủ
**Giả thiết.** $q=\mathcal N\big(\mu,\operatorname{diag}(s_1^2,\ldots,s_k^2)\big)$ với $\mu\in\mathbb R^k$ và mọi độ lệch chuẩn $s_j>0$; $p=\mathcal N(0,I_k)$.

**Kết luận.**

$$
\begin{aligned}
&\mathrm{KL}(q\,\|\,p)\\
&\quad=\frac12\sum_{j=1}^k\big(\mu_j^2+s_j^2\\
&\qquad-1-\log s_j^2\big).
\end{aligned}
\tag{7.5}
$$

Mỗi số hạng không âm và bằng $0$ khi và chỉ khi $\mu_j=0$ và $s_j=1$.
:::

::: proof Chứng minh Mệnh đề 14.18
**Lộ trình.** Viết hai mật độ thành tích các mật độ một chiều, đưa log-tỉ số về tổng theo tọa độ, rồi áp dụng Bổ đề 14.17 cho từng tọa độ.

**Bước 1 (phân tích thành tích).** Với $\Sigma=\operatorname{diag}(s_1^2,\ldots,s_k^2)$, ta có $\det\Sigma=\prod_js_j^2$ và $(z-\mu)^\top\Sigma^{-1}(z-\mu)=\sum_j(z_j-\mu_j)^2/s_j^2$. Thay vào mật độ Gaussian nhiều chiều của Định nghĩa 10.20 (công thức (6.12) của Bài 10):

$$
\begin{gathered}
q(z)=\prod_{j=1}^k\mathcal N(z_j;\mu_j,s_j^2),\\
p(z)=\prod_{j=1}^k\mathcal N(z_j;0,1).
\end{gathered}
$$

**Bước 2 (phân phối biên của từng tọa độ).** Lấy tích phân $q(z)$ theo mọi tọa độ trừ $z_j$; mỗi thừa số còn lại có tích phân $1$, nên theo công thức mật độ biên (8.4) của Mệnh đề 10.32 trong Bài 10, $Z_j$ có phân phối biên $\mathcal N(\mu_j,s_j^2)$ dưới $q$.

**Bước 3 (cộng các tọa độ).** Logarit của tỉ số là $\sum_j\log\big[\mathcal N(z_j;\mu_j,s_j^2)/\mathcal N(z_j;0,1)\big]$. Số hạng thứ $j$ chỉ phụ thuộc $z_j$, nên kỳ vọng của nó theo $q$ bằng kỳ vọng theo phân phối biên của $Z_j$. Bổ đề 14.17 với $a=\mu_j$, $\beta=s_j^2$, $c=0$, $\gamma=1$ cho số hạng $\tfrac12(-\log s_j^2+s_j^2+\mu_j^2-1)$. Tính tuyến tính của kỳ vọng cho (7.5).

**Bước 4 (dấu của từng số hạng).** Số hạng thứ $j$ bằng $\mu_j^2+\psi(s_j^2)$ với $\psi(t)=t-1-\log t$ của Bổ đề 14.13. Cả hai phần không âm, và tổng bằng $0$ khi và chỉ khi $\mu_j=0$ và $s_j^2=1$. $\square$

Như vậy với tiên nghiệm chuẩn và hậu nghiệm xấp xỉ Gaussian chéo, số hạng KL của (7.2) có công thức đóng theo $\mu$ và $s$.
:::

Trong học máy, số hạng tái tạo của (7.2) thường được ước lượng bằng *Monte Carlo*: kỳ vọng $\mathbb E_q[h(Z)]$ được thay bằng trung bình $m^{-1}\sum_{r=1}^mh(z^{(r)})$ với $z^{(r)}$ lấy độc lập từ $q$. Dạng giải tích (7.5) của Mệnh đề 14.18 không có nhiễu Monte Carlo (Murphy (2023), §10.2.1.1). Một mạng có thể xuất $a_j(x)=\log\sigma_{\phi,j}^2(x)$ rồi đặt $\sigma_{\phi,j}(x)=\exp(a_j(x)/2)$ để bảo đảm độ lệch chuẩn dương. Dạng chéo là một lựa chọn cho họ $\mathcal Q$, không phải giả thiết rằng hậu nghiệm thật có các tọa độ độc lập.

Số hạng còn lại là kỳ vọng tái tạo. Với $p_\theta(x\mid z)=\mathcal N(g_\theta(z),\tau^2I_d)$, mật độ Gaussian nhiều chiều của Định nghĩa 10.20 với $\Sigma=\tau^2I_d$ cho $\log p_\theta(x\mid z)=-\frac d2\log(2\pi\tau^2)-\|x-g_\theta(z)\|_2^2/(2\tau^2)$. Lấy kỳ vọng theo $q$,

$$
\begin{aligned}
&\mathbb E_q[\log p_\theta(x\mid Z)]\\
&\quad=-\frac d2\log(2\pi\tau^2)\\
&\qquad-\frac{\mathbb E_q\|x-g_\theta(Z)\|_2^2}{2\tau^2}.
\end{aligned}
\tag{7.6}
$$

Với mã $z$ cố định, $\log p_\theta(x\mid z)$ là âm của công thức (4.3) của Bài 12 (Mệnh đề 12.2) áp dụng cho một quan sát có $d$ tọa độ, với $\sigma^2=\tau^2$; (7.6) thay bình phương sai số bằng kỳ vọng của nó theo mã.

::: example Ví dụ 14.6 (Kỳ vọng tái tạo và lỗi bình phương)
**Dữ kiện.** $d=2$, $k=1$, $p_\theta(x\mid z)=\mathcal N(g_\theta(z),\tau^2I_2)$ với $g_\theta(z)=(z,0)^\top$ và $\tau^2=1/2$; quan sát $x=(0,1)^\top$; hậu nghiệm xấp xỉ $q(z\mid x)=\mathcal N(0,1/4)$.

**Lỗi bình phương theo mã.** $\|x-g_\theta(Z)\|_2^2=(0-Z)^2+(1-0)^2=Z^2+1$.

**Kỳ vọng của lỗi.** Dưới $q$, $\mathbb E_q[Z^2]=0^2+1/4=1/4$ theo Mệnh đề 10.24, nên $\mathbb E_q\|x-g_\theta(Z)\|_2^2=1/4+1=5/4$.

**Hằng số và hệ số.** Với $d=2$, $\tau^2=1/2$: $-\tfrac22\log(2\pi\cdot\tfrac12)=-\log\pi$ và $1/(2\tau^2)=1$.

**Kỳ vọng tái tạo.** Theo (7.6),

$$
\begin{aligned}
&\mathbb E_q[\log p_\theta(x\mid Z)]\\
&\quad=-\log\pi-\frac54\\
&\quad\approx-1{,}1447-1{,}25=-2{,}3947.
\end{aligned}
$$

**Kiểm tra lại.** Thay mã bằng trung bình $z=0$ cho lỗi $1$ và log-mật độ $-\log\pi-1$. Hiệu $1/4$ đúng bằng $\operatorname{Var}_q(Z)$ nhân hệ số $1/(2\tau^2)=1$.

Kỳ vọng tái tạo phạt cả độ bất định của bộ mã hóa: thay mã bằng trung bình của nó bỏ mất số hạng $\operatorname{Var}_q(Z)/(2\tau^2)$. Hằng số $-\log\pi$ phải giữ khi báo giá trị ELBO, và chỉ được bỏ khi tối ưu theo các tham số không làm nó thay đổi.
:::

Ví dụ sau dùng một mô hình vô hướng mà biên và hậu nghiệm tính đúng được, nên kiểm tra được đẳng thức (7.3) bằng số.

::: example Ví dụ 14.7 (Cận dưới và khe hở trong mô hình vô hướng)
**Dữ kiện.** $k=d=1$; tiên nghiệm $p(z)=\mathcal N(0,1)$; $p_\theta(x\mid z)=\mathcal N(z,1)$; quan sát $x=2$; hậu nghiệm xấp xỉ $q(z\mid x)=\mathcal N(1,1/8)$.

**KL tới tiên nghiệm.** Mệnh đề 14.18 với $\mu=1$, $s^2=1/8$:

$$
\begin{aligned}
&\mathrm{KL}(q\,\|\,p)\\
&\quad=\frac12\Big(1+\frac18-1-\log\frac18\Big)\\
&\quad=\frac1{16}+\frac32\log2\approx1{,}1022.
\end{aligned}
$$

**Kỳ vọng tái tạo.** Theo Mệnh đề 10.24, $\mathbb E_q[(2-Z)^2]=(2-\mathbb E_qZ)^2+\operatorname{Var}_q(Z)=1+1/8=9/8$. Công thức (7.6) với $d=1$, $\tau^2=1$ cho

$$
\begin{aligned}
&\mathbb E_q[\log p_\theta(2\mid Z)]\\
&\quad=-\frac12\log(2\pi)-\frac9{16}.
\end{aligned}
$$

**ELBO.** Trừ KL khỏi kỳ vọng tái tạo theo (7.2):

$$
\begin{aligned}
\mathcal L&=-\frac12\log(2\pi)-\frac9{16}\\
&\quad-\frac1{16}-\frac32\log2\\
&=-\frac12\log(2\pi)-\frac58-\frac32\log2\\
&\approx-2{,}5837.
\end{aligned}
$$

**Biên và hậu nghiệm.** Hoàn bình phương trong log-mật độ đồng thời:

$$
\begin{aligned}
-\frac{z^2}{2}-\frac{(x-z)^2}{2}&=-\Big(z-\frac x2\Big)^2\\
&\quad-\frac{x^2}{4}.
\end{aligned}
$$

Theo (6.1) và $\int_{\mathbb R}e^{-(z-x/2)^2}dz=\sqrt\pi$, $p_\theta(x)=\frac1{2\pi}e^{-x^2/4}\sqrt\pi=\frac1{\sqrt{4\pi}}e^{-x^2/4}$, tức $X\sim\mathcal N(0,2)$. Theo (6.3), hậu nghiệm tỉ lệ với $e^{-(z-x/2)^2}$, tức $Z\mid X=x\sim\mathcal N(x/2,1/2)$. Tại $x=2$: $\log p_\theta(2)=-\tfrac12\log(4\pi)-1\approx-2{,}2655$ và hậu nghiệm là $\mathcal N(1,1/2)$.

**Khe hở.** Dùng $\tfrac12\log(4\pi)=\tfrac12\log(2\pi)+\tfrac12\log2$:

$$
\begin{aligned}
&\log p_\theta(2)-\mathcal L\\
&\quad=-\frac12\log2-1+\frac58+\frac32\log2\\
&\quad=\log2-\frac38\approx0{,}3181.
\end{aligned}
$$

**Kiểm tra lại.** Bổ đề 14.17 với $a=1$, $\beta=1/8$, $c=1$, $\gamma=1/2$:

$$
\begin{aligned}
&\mathrm{KL}\big(q\,\|\,p_\theta(\cdot\mid2)\big)\\
&\quad=\frac12\Big[\log4+\frac{1/8}{1/2}-1\Big]\\
&\quad=\log2-\frac38,
\end{aligned}
$$

đúng bằng khe hở, như (7.3) khẳng định.

Hậu nghiệm xấp xỉ có đúng trung bình hậu nghiệm nhưng phương sai $1/8$ nhỏ hơn $1/2$, nên ELBO thấp hơn log-hợp lý $0{,}3181$ nat; khe hở này không thấy được nếu chỉ tính KL tới tiên nghiệm.
:::

Như vậy Bổ đề 14.13 cho dấu của KL, Định lý 14.15 xác định khe hở của ELBO, và Mệnh đề 14.18 cùng (7.6) cho hai số hạng của ELBO trong lựa chọn Gaussian. Tuy nhiên hai vấn đề còn lại khi học từ $n$ quan sát. Chọn riêng một hậu nghiệm xấp xỉ cho mỗi quan sát làm số tham số tăng theo $n$, và kỳ vọng tái tạo phụ thuộc $\phi$ qua chính phân phối lấy mẫu, nên chưa lấy đạo hàm trực tiếp được. Trong Mục 8, chúng ta giải quyết cả hai bằng bộ tự mã hóa biến phân.

## 8. Bộ tự mã hóa biến phân

Nếu mỗi quan sát $x_i$ có riêng một cặp tham số $(\mu_i,s_i)$ cho hậu nghiệm xấp xỉ, số biến tối ưu tăng tuyến tính theo $n$, và một quan sát mới lại cần một bài toán suy luận biến phân mới. Chúng ta thay các cặp riêng lẻ bằng một ánh xạ chung $x\mapsto(\mu_\phi(x),\sigma_\phi(x))$ do một mạng nơ-ron tính. Một cách trực quan, cùng một mạng học quy tắc suy luận cho mọi quan sát; cách làm này được gọi là *suy luận dùng chung tham số* (amortized inference) (Murphy (2023), §10.1.5).

::: definition Định nghĩa 14.19 (Bộ tự mã hóa biến phân)
Một *bộ tự mã hóa biến phân* (variational autoencoder, VAE) gồm các thành phần sau.

- **Mô hình sinh:** tiên nghiệm $p(z)$ và phân phối quan sát có điều kiện $p_\theta(x\mid z)$ như Định nghĩa 14.10.
- **Bộ mã hóa:** một ánh xạ $x\mapsto q_\phi(\cdot\mid x)$ từ quan sát tới hậu nghiệm xấp xỉ, với cùng tham số $\phi$ cho mọi quan sát.
- **Mục tiêu học:** với mẫu $x_1,\ldots,x_n$,

$$
\max_{\theta,\phi}\frac1n\sum_{i=1}^n\mathcal L(\theta,\phi;x_i).
\tag{8.1}
$$

- **Lựa chọn Gaussian:** $p(z)=\mathcal N(0,I_k)$, $q_\phi(z\mid x)=\mathcal N\big(\mu_\phi(x),\operatorname{diag}(\sigma_\phi^2(x))\big)$ với mọi $\sigma_{\phi,j}(x)>0$, và $p_\theta(x\mid z)=\mathcal N(g_\theta(z),\tau^2I_d)$ với $\tau>0$ cố định.
:::

Định nghĩa 14.19 dùng ELBO của Định nghĩa 14.14 làm mục tiêu thay cho lỗi tất định (5.1) của Định nghĩa 14.7. Với lựa chọn Gaussian, (7.6) và (7.5) cho

$$
\begin{aligned}
&\mathcal L(\theta,\phi;x)\\
&\quad=-\frac d2\log(2\pi\tau^2)\\
&\qquad-\frac{\mathbb E_{q_\phi}\|x-g_\theta(Z)\|_2^2}{2\tau^2}\\
&\qquad-\frac12\sum_{j=1}^k\left(\mu_{\phi,j}^2+\sigma_{\phi,j}^2-1-\log\sigma_{\phi,j}^2\right),
\end{aligned}
$$

trong đó $\mu_{\phi,j}$ và $\sigma_{\phi,j}$ được tính tại $x$. Nghĩa là mục tiêu VAE gồm lỗi tái tạo bình phương của một bộ tự mã hóa với mã ngẫu nhiên, cộng một số hạng KL kéo phân phối mã hóa về tiên nghiệm.

Tham số $\theta$ quyết định phân phối quan sát có điều kiện; tham số $\phi$ quyết định các mã dùng để xấp xỉ hậu nghiệm. KL tới tiên nghiệm không chứa $\theta$, nhưng cả hai nhóm tham số đều ảnh hưởng kỳ vọng tái tạo.

### 8.1. Tái tham số hóa và gradient

Kỳ vọng tái tạo $\mathbb E_{q_\phi}[h_\theta(Z)]$, với $h_\theta(z)=\log p_\theta(x\mid z)$, phụ thuộc $\theta$ qua hàm $h_\theta$ và phụ thuộc $\phi$ qua phân phối của $Z$. Gradient theo $\theta$ đưa được vào trong kỳ vọng vì $q_\phi$ không chứa $\theta$; gradient theo $\phi$ thì không (Murphy (2023), §10.2). Nếu coi một mẫu $z$ đã rút là hằng số khi lấy đạo hàm theo $\phi$, ta bỏ mất sự thay đổi của phân phối mã hóa. Chúng ta chuyển nguồn ngẫu nhiên sang một biến nhiễu có phân phối không phụ thuộc tham số, rồi viết mẫu mã như một hàm của tham số. Cách viết này được gọi là *tái tham số hóa* (reparameterization trick).

::: proposition Mệnh đề 14.20 (Tái tham số hóa Gaussian và gradient) — chứng minh đầy đủ, Bước 4 chi tiết ở Phụ lục B
**Giả thiết.** Quan sát $x$ cố định; ký hiệu $\vartheta=(\theta,\phi)$.

- **Nhiễu:** $\varepsilon\sim\mathcal N(0,I_k)$, với phân phối không phụ thuộc $\vartheta$.
- **Mẫu mã:** với mọi $\sigma_{\phi,j}(x)>0$,

$$
Z_\phi=\mu_\phi(x)+\sigma_\phi(x)\odot\varepsilon.
\tag{8.2}
$$

- **Khả vi:** với hầu mọi $\varepsilon$, hàm $F(\vartheta,\varepsilon)=h_\theta(Z_\phi)$ khả vi liên tục theo $\vartheta$ trên một hình cầu mở $\mathcal B$ quanh điểm đang xét.
- **Chặn khả tích:** $\|\nabla_\vartheta F(\vartheta,\varepsilon)\|_2\le G(\varepsilon)$ với mọi $\vartheta\in\mathcal B$, trong đó $\mathbb E[G(\varepsilon)]<\infty$.
- **Khả tích:** $\mathbb E\lvert F(\vartheta_0,\varepsilon)\rvert<\infty$ tại một điểm $\vartheta_0\in\mathcal B$.

**Kết luận.**

- **Phân phối:** $Z_\phi$ có phân phối $q_\phi(\cdot\mid x)=\mathcal N\big(\mu_\phi(x),\operatorname{diag}(\sigma_\phi^2(x))\big)$, và $\mathbb E_{q_\phi}[h(Z)]=\mathbb E_\varepsilon[h(Z_\phi)]$ với mọi hàm $h$ có kỳ vọng hữu hạn.
- **Gradient:** trên $\mathcal B$,

$$
\begin{aligned}
&\nabla_\vartheta\,\mathbb E_{q_\phi}[h_\theta(Z)]\\
&\quad=\mathbb E_\varepsilon\big[\nabla_\vartheta h_\theta(Z_\phi)\big].
\end{aligned}
\tag{8.3}
$$

- **Không chệch:** với $\varepsilon^{(1)},\ldots,\varepsilon^{(m)}$ độc lập cùng phân phối $\mathcal N(0,I_k)$, ước lượng $m^{-1}\sum_{r=1}^m\nabla_\vartheta h_\theta\big(\mu_\phi(x)+\sigma_\phi(x)\odot\varepsilon^{(r)}\big)$ có kỳ vọng bằng vế trái của (8.3).
:::

::: proof Chứng minh Mệnh đề 14.20
**Lộ trình.** Tìm phân phối của từng tọa độ của $Z_\phi$ bằng hàm phân phối, dùng tính độc lập để có mật độ đồng thời, rồi đổi biến trong tích phân kỳ vọng. Sau đó đổi thứ tự đạo hàm và kỳ vọng nhờ hàm chặn $G$, và dùng tính tuyến tính của kỳ vọng cho ước lượng Monte Carlo.

**Bước 1 (một tọa độ).** Gọi $\Phi$ và $\rho$ là hàm phân phối và mật độ của $\mathcal N(0,1)$. Với $\mu\in\mathbb R$, $\sigma>0$ và mọi $t\in\mathbb R$, vì $\sigma>0$ nên phép chia giữ chiều bất đẳng thức:

$$
\begin{aligned}
&\mathbb P(\mu+\sigma\varepsilon_j\le t)\\
&\quad=\mathbb P\Big(\varepsilon_j\le\frac{t-\mu}{\sigma}\Big)=\Phi\Big(\frac{t-\mu}{\sigma}\Big),\\
&\frac{d}{dt}\Phi\Big(\frac{t-\mu}{\sigma}\Big)\\
&\quad=\frac1\sigma\rho\Big(\frac{t-\mu}{\sigma}\Big)\\
&\quad=\frac1{\sqrt{2\pi\sigma^2}}\exp\Big(-\frac{(t-\mu)^2}{2\sigma^2}\Big).
\end{aligned}
$$

Vế phải của dòng cuối là mật độ Gaussian một chiều của Định nghĩa 10.20, nên $\mu+\sigma\varepsilon_j\sim\mathcal N(\mu,\sigma^2)$.

**Bước 2 (mật độ đồng thời).** Tọa độ $Z_{\phi,j}=\mu_{\phi,j}(x)+\sigma_{\phi,j}(x)\varepsilon_j$ chỉ phụ thuộc $\varepsilon_j$. Các $\varepsilon_j$ độc lập vì $\mathcal N(0,I_k)$ có mật độ là tích $\prod_j\rho(\varepsilon_j)$, nên các $Z_{\phi,j}$, là hàm của các biến độc lập khác nhau, cũng độc lập. Mật độ đồng thời của $Z_\phi$ vì vậy là tích các mật độ ở Bước 1, $\prod_j\mathcal N(z_j;\mu_{\phi,j},\sigma_{\phi,j}^2)$, và theo Bước 1 trong chứng minh Mệnh đề 14.18, tích này bằng $q_\phi(z\mid x)$.

**Bước 3 (đổi biến trong kỳ vọng).** Phép đổi biến $z=\mu_\phi(x)+\sigma_\phi(x)\odot\varepsilon$ có ma trận Jacobi $\operatorname{diag}(\sigma_\phi(x))$ với định thức $\prod_j\sigma_{\phi,j}(x)>0$, nên $dz=\prod_j\sigma_{\phi,j}\,d\varepsilon$ và $q_\phi(z\mid x)\prod_j\sigma_{\phi,j}=\prod_j\rho(\varepsilon_j)$. Do đó

$$
\begin{aligned}
&\mathbb E_{q_\phi}[h(Z)]\\
&\quad=\int_{\mathbb R^k}h(z)\,q_\phi(z\mid x)\,dz\\
&\quad=\int_{\mathbb R^k}h\big(\mu_\phi(x)+\sigma_\phi(x)\odot\varepsilon\big)\\
&\qquad\cdot\prod_{j=1}^k\rho(\varepsilon_j)\,d\varepsilon\\
&\quad=\mathbb E_\varepsilon[h(Z_\phi)].
\end{aligned}
$$

**Bước 4 (đổi đạo hàm và kỳ vọng).** Bước 3 với $h=h_\theta$ cho $\mathbb E_{q_\phi}[h_\theta(Z)]=\mathbb E_\varepsilon[F(\vartheta,\varepsilon)]$, trong đó phân phối của $\varepsilon$ không phụ thuộc $\vartheta$. Với mỗi tọa độ $\vartheta_r$, ba giả thiết khả vi, chặn khả tích và khả tích cho $\partial_r\mathbb E_\varepsilon[F]=\mathbb E_\varepsilon[\partial_rF]$; chi tiết bằng định lý giá trị trung bình và định lý hội tụ trội (dominated convergence theorem) nằm ở Phụ lục B. Theo quy tắc dây chuyền, phần theo $\phi$ của gradient là

$$
\nabla_\phi h_\theta(Z_\phi)=(\nabla_\phi Z_\phi)^\top\nabla_zh_\theta(Z_\phi),
$$

với ma trận Jacobi $\nabla_\phi Z_\phi$ có $k$ hàng; trong thiết lập này $h_\theta$ không phụ thuộc $\phi$ trực tiếp. Ghép các tọa độ cho (8.3).

**Bước 5 (không chệch).** Mỗi $\varepsilon^{(r)}$ có cùng phân phối với $\varepsilon$, nên kỳ vọng của số hạng thứ $r$ bằng vế phải của (8.3). Tính tuyến tính của kỳ vọng cho trung bình của $m$ số hạng có cùng kỳ vọng đó, tức bằng vế trái của (8.3). $\square$

Như vậy gradient của kỳ vọng tái tạo theo cả $\theta$ lẫn $\phi$ được ước lượng không chệch bằng các mẫu nhiễu chuẩn, và tính được bằng lan truyền ngược qua (8.2).
:::

Trong học máy, Mệnh đề 14.20 cho đường tính gradient từ bộ giải mã, qua mẫu mã (8.2), tới các đầu ra $\mu_\phi(x),\sigma_\phi(x)$ của bộ mã hóa (Murphy (2023), §10.2.1). Số hạng KL lấy đạo hàm trực tiếp từ (7.5), còn kỳ vọng tái tạo dùng ước lượng Monte Carlo. Ước lượng với $m$ hữu hạn vẫn có phương sai, và mệnh đề không áp dụng cho mã rời rạc, vì khi đó không có biểu diễn khả vi như (8.2). Mạng dùng hàm kích hoạt không khả vi tại một số điểm, như ReLU, không thỏa giả thiết khả vi liên tục ở dạng đã nêu.

![Hai cột. Đường suy luận: quan sát x đi qua bộ mã hóa thành trung bình μφ(x) và độ lệch chuẩn σφ(x); cùng nhiễu ε ∼ N(0, I) tạo mã z = μφ(x) + σφ(x) ⊙ ε. Đường sinh mẫu: lấy z từ tiên nghiệm N(0, I) rồi lấy x theo phân phối giải mã.](img/lec-14/vae-paths.svg)

Hình 14.2. Hai đường tính của VAE. Đường suy luận có điều kiện theo quan sát và dùng (8.2); đường sinh mẫu bắt đầu từ tiên nghiệm. Lúc sinh dữ liệu mới không cần đưa một quan sát qua bộ mã hóa.

Ghép Mệnh đề 14.18, công thức (7.6) và Mệnh đề 14.20, ta có thuật toán huấn luyện VAE bằng gradient ngẫu nhiên.

::: algorithm Thuật toán 14.21 (Huấn luyện bộ tự mã hóa biến phân bằng tái tham số hóa)
**Đầu vào.** Mẫu $x_1,\ldots,x_n\in\mathbb R^d$; chiều mã $k$; phương sai nhiễu $\tau^2$; các mạng tính $\mu_\phi(x)$, $\log\sigma_\phi^2(x)$ và $g_\theta(z)$; bước học $\alpha>0$; cỡ nhóm $b$; số mẫu nhiễu $m$; số vòng lặp $T$.

**Khởi tạo.** Chọn $\theta$ và $\phi$ ban đầu.

**Cập nhật.** Với $t=1,\ldots,T$:

1. Chọn ngẫu nhiên một nhóm $I$ gồm $b$ chỉ số.
2. Với mỗi $i\in I$, tính $\mu_\phi(x_i)$, $\sigma_\phi(x_i)$, lấy $\varepsilon^{(i,1)},\ldots,\varepsilon^{(i,m)}\sim\mathcal N(0,I_k)$ độc lập và đặt $z^{(i,r)}=\mu_\phi(x_i)+\sigma_\phi(x_i)\odot\varepsilon^{(i,r)}$ theo (8.2).
3. Với mỗi $i\in I$, tính ước lượng $\widehat{\mathcal L}_i$ của ELBO theo công thức dưới đây, và đặt $\widehat{\mathcal L}_I=b^{-1}\sum_{i\in I}\widehat{\mathcal L}_i$.
4. Tính gradient của $\widehat{\mathcal L}_I$ theo $\theta$ và $\phi$ bằng lan truyền ngược, coi các $\varepsilon^{(i,r)}$ là hằng số, rồi cập nhật đồng thời $\theta\leftarrow\theta+\alpha\nabla_\theta\widehat{\mathcal L}_I$ và $\phi\leftarrow\phi+\alpha\nabla_\phi\widehat{\mathcal L}_I$.

Ở bước 3, kỳ vọng tái tạo trong (7.6) được thay bằng trung bình trên $m$ mẫu mã và KL được tính bằng (7.5):

$$
\begin{aligned}
\widehat{\mathcal L}_i&=-\frac d2\log(2\pi\tau^2)\\
&\quad-\frac1m\sum_{r=1}^m\frac{\|x_i-g_\theta(z^{(i,r)})\|_2^2}{2\tau^2}\\
&\quad-\mathrm{KL}\big(q_\phi(\cdot\mid x_i)\,\|\,p\big).
\end{aligned}
$$

**Đầu ra.** Tham số $\theta$ của mô hình sinh và $\phi$ của bộ mã hóa.

**Điều kiện dừng.** Sau $T$ vòng lặp.

**Chi phí.** Mỗi vòng lặp gồm $b$ lần chạy bộ mã hóa, $bm$ lần chạy bộ giải mã và lan truyền ngược qua các lần chạy đó.
:::

Theo Mệnh đề 14.20, với nhóm $I$ cố định, kỳ vọng theo nhiễu của gradient ở bước 4 bằng gradient của $b^{-1}\sum_{i\in I}\mathcal L(\theta,\phi;x_i)$. Hai nhóm tham số được cập nhật trong cùng một bước vì cùng ảnh hưởng kỳ vọng tái tạo: với $\theta$ cố định, một bước làm tăng $\mathcal L$ theo $\phi$ thu hẹp khe hở (7.3) theo Định lý 14.15; bước theo $\theta$ thay đổi chính mô hình sinh, nên khe hở có thể tăng hoặc giảm. Thuật toán không bảo đảm hội tụ tới cực đại toàn cục của (8.1).

::: example Ví dụ 14.8 (Mẫu tái tham số hóa và gradient theo hai tham số)
**Dữ kiện.** Một tọa độ ($k=d=1$); bộ mã hóa cho $\mu=1$, $\sigma=2$; quan sát $x=0$; $p_\theta(x\mid z)=\mathcal N(z,1)$, nên $h(z)=\log\mathcal N(0;z,1)=-\tfrac12\log(2\pi)-\tfrac{z^2}2$. Dùng ba giá trị nhiễu $\varepsilon=-1,0,1$.

**Lấy mẫu.** Theo (8.2), $z=1+2\varepsilon$ cho $z=-1,1,3$. Phương sai của $Z$ là $\sigma^2=4$.

**Đạo hàm theo đường mẫu.** Ta có $h'(z)=-z$, $\partial z/\partial\mu=1$ và $\partial z/\partial\sigma=\varepsilon$. Quy tắc dây chuyền cho $\partial h/\partial\mu=-z$ và $\partial h/\partial\sigma=-z\varepsilon$.

| $\varepsilon$ | $z$ | $\partial h/\partial\mu$ | $\partial h/\partial\sigma$ |
|---|---:|---:|---:|
| $-1$ | $-1$ | $1$ | $-1$ |
| $0$ | $1$ | $-1$ | $0$ |
| $1$ | $3$ | $-3$ | $-3$ |

**Trung bình ba mẫu.** Theo $\mu$: $(1-1-3)/3=-1$. Theo $\sigma$: $(-1+0-3)/3=-4/3$.

**Gradient chính xác.** Theo Mệnh đề 10.24, $\mathbb E[Z^2]=\mu^2+\sigma^2$, nên $\mathbb E[h(Z)]=-\tfrac12\log(2\pi)-\tfrac12(\mu^2+\sigma^2)$. Đạo hàm theo $\mu$ là $-\mu=-1$, theo $\sigma$ là $-\sigma=-2$.

**Kiểm tra lại.** Viết $\partial h/\partial\mu=-\mu-\sigma\varepsilon$ và $\partial h/\partial\sigma=-\mu\varepsilon-\sigma\varepsilon^2$. Ba giá trị nhiễu có trung bình $0$, nên cột theo $\mu$ cho đúng $-\mu=-1$; chúng có trung bình bình phương $2/3$ thay vì $1$, nên cột theo $\sigma$ cho $-\sigma\cdot\tfrac23=-\tfrac43$ thay vì $-2$.

Tính không chệch trong Mệnh đề 14.20 là phát biểu về kỳ vọng khi nhiễu được lấy ngẫu nhiên đúng phân phối, với $\mathbb E[\varepsilon]=0$ và $\mathbb E[\varepsilon^2]=1$; một bộ ba giá trị cụ thể có thể lệch khỏi gradient chính xác.
:::

### 8.2. Giới hạn của mục tiêu

Mục tiêu (8.1) có hai số hạng, và chúng ta cần biết giá trị nhỏ của từng số hạng cho phép kết luận gì về mô hình sinh.

::: remark Nhận xét 14.22 (Lỗi tái tạo nhỏ hoặc KL nhỏ chưa đủ kết luận)
Lỗi tái tạo nhỏ trên mẫu chỉ kiểm tra bộ giải mã tại các mã lấy từ $q_\phi(\cdot\mid x_i)$ của các quan sát huấn luyện. Sinh mẫu mới lấy mã từ $p(z)$, nên còn cần kiểm tra bộ giải mã ở vùng mã mà tiên nghiệm sinh ra và kiểm tra mô hình trên dữ liệu mới.

KL tới tiên nghiệm nhỏ có nghĩa $q_\phi(\cdot\mid x)\approx p(z)$, tức mã gần như không phụ thuộc $x$ và không mang thông tin riêng của từng quan sát. Nếu bộ giải mã cũng bỏ qua $z$, hậu nghiệm thật bằng tiên nghiệm, nên chọn $q_\phi=p(z)$ làm KL tới hậu nghiệm bằng $0$ và cận (7.3) chặt, trong khi biến ẩn không được dùng. Hiện tượng này được gọi là *suy sụp hậu nghiệm* (posterior collapse) (Murphy (2023), §21.4). Cận chặt khi đó chỉ nói ELBO bằng log-hợp lý của một mô hình không dùng biến ẩn; nó không nói mô hình ấy khớp dữ liệu.
:::

Như vậy Định nghĩa 14.19 ghép mô hình sinh, bộ mã hóa dùng chung tham số và ELBO thành một bài toán học; Mệnh đề 14.18 và Mệnh đề 14.20 làm hai số hạng của mục tiêu tính được và lấy đạo hàm được. Tuy nhiên Nhận xét 14.22 cho thấy giá trị của từng số hạng không đủ để đánh giá mô hình sinh. Mục 9 xét hai tình huống áp dụng, trong đó một tình huống có giả thiết mô hình không thỏa.

## 9. Ý nghĩa, tác động và giới hạn

Một cảm biến hai chiều cần được nén về một tọa độ và được mô phỏng bằng một mô hình sinh; khi đầu ra của cảm biến tạo thành hai cụm, mô hình Gaussian đơn không còn phù hợp.

::: application Tình huống 14.1 (Nén và sinh quan sát cảm biến)
**Bài toán và dữ kiện.** Bốn quan sát cảm biến đã tâm hóa là $(2,0)^\top$, $(-2,0)^\top$, $(0,1)^\top$, $(0,-1)^\top$. Mục tiêu thứ nhất là lưu một tọa độ cho mỗi quan sát; mục tiêu thứ hai là xây dựng một mô hình liên tục để tạo quan sát mô phỏng có cùng hiệp phương sai mẫu.

**Kiểm tra giả thiết.** Ma trận $S=\operatorname{diag}(2,1/2)$ đối xứng nửa xác định dương và dữ liệu có trung bình $0$, nên Mệnh đề 14.3 và Mệnh đề 14.4 áp dụng; $\lambda_1=2>\lambda_2=1/2$ nên hướng chính thứ nhất duy nhất, sai khác dấu.

**Nén.** PCA chọn $u=(1,0)^\top$, các mã là $2,-2,0,0$ và lỗi trung bình là $1/2$ (Ví dụ 14.2).

**Bộ tự mã hóa.** Bộ mã hóa $f(x)=x_1$ và bộ giải mã $g(z)=(z,0)^\top$ là cặp tối ưu $A=V_1^\top$, $B=V_1$ của Mệnh đề 14.8 và đạt đúng lỗi $1/2$.

**Mô hình sinh.** Chọn $Z\sim\mathcal N(0,1)$ và $X\mid Z=z\sim\mathcal N\big((\sqrt{3/2}\,z,0)^\top,\tfrac12I_2\big)$ như Định nghĩa 14.10. Theo Ví dụ 14.5, $X\sim\mathcal N\big(0,\operatorname{diag}(2,\tfrac12)\big)$: biến ẩn góp $3/2$ vào phương sai ngang, nhiễu góp $1/2$ cho mỗi tọa độ.

**Lấy mẫu.** Lấy $z\sim\mathcal N(0,1)$ và hai nhiễu $\eta_1,\eta_2\sim\mathcal N(0,1/2)$ độc lập, rồi trả về $(\sqrt{3/2}\,z+\eta_1,\eta_2)^\top$.

**Kiểm tra và giới hạn.** Tổng phương sai của mô hình là $2+1/2=5/2=\operatorname{tr}(S)$. Hai mục tiêu cho hai đối tượng khác nhau: phép nén chọn một phép chiếu của bốn điểm, còn mô hình sinh giả định một phân phối Gaussian liên tục. Khớp hiệp phương sai không chứng minh phân phối Gaussian là cơ chế tạo ra bốn quan sát.
:::

::: application Tình huống 14.2 (Dữ liệu hai cụm và giả thiết bị vi phạm)
**Bài toán và dữ kiện.** Một cảm biến cho đầu ra hai chiều $(-3,0)^\top$ hoặc $(3,0)^\top$ với xác suất bằng nhau. Mô hình thử nghiệm dùng $p(z)=\mathcal N(0,1)$, $q_\phi(z\mid x)=\mathcal N(0,1)$ với mọi $x$, và bộ giải mã $p_\theta(x\mid z)=\mathcal N\big((0,0)^\top,I_2\big)$ không phụ thuộc $z$.

**Kiểm tra giả thiết.** Mô hình và bộ mã hóa có mật độ dương, nên Định lý 14.15 áp dụng tại mỗi quan sát. Giả thiết mô hình "một Gaussian đơn mô tả được hai cụm tách biệt" không được dữ liệu hỗ trợ. Phân phối dữ liệu rời rạc cũng không có mật độ; ta chỉ đánh giá log-mật độ của mô hình tại các điểm đã quan sát.

**Tính.** KL tới tiên nghiệm bằng $0$ vì $q_\phi=p$. Với $x=(\pm3,0)^\top$, log-mật độ giải mã là $-\log(2\pi)-\tfrac92\approx-6{,}3379$. Vì bộ giải mã bỏ qua $z$, hậu nghiệm thật bằng tiên nghiệm, nên ELBO bằng đúng log-mật độ biên này.

**Hậu quả và kiểm tra.** Mẫu sinh tập trung quanh gốc, giữa hai cụm quan sát. So sánh mômen: dữ liệu có $\mathbb E[X_1^2]=9$, còn mô hình có $\mathbb E[X_1^2]=1$. Cận chặt và KL bằng $0$ vẫn đi cùng một mô hình không thể hiện cấu trúc hai cụm. Giảm KL không sửa được giả thiết sai; cần đổi họ mô hình hoặc cách dùng biến ẩn và đánh giá trên quan sát mới.
:::

Các công cụ của bài còn xuất hiện trong những nhiệm vụ sau:

- **Tiền xử lý và nén đặc trưng.** Mệnh đề 14.4 định lượng phương sai bị bỏ khi giữ $k$ hướng; chuẩn hóa đặc trưng và chọn $k$ cần dựa vào nhiệm vụ, như phản ví dụ của Nhận xét 14.5.
- **Biểu diễn phi tuyến.** Định nghĩa 14.7 cho phép học mạng mã hóa từ dữ liệu không nhãn; lỗi tái tạo vẫn cần được đo trên dữ liệu không dùng khi tối ưu.
- **Sinh dữ liệu và suy luận.** Định nghĩa 14.10 cung cấp cơ chế sinh, còn Định lý 14.15 cho mục tiêu suy luận gần đúng khi hậu nghiệm không tính được (Murphy (2023), §21.2).

Câu hỏi trung tâm của bài có ba câu trả lời ứng với ba phương pháp, mỗi phương pháp tối ưu một đại lượng khác nhau trên một lớp đối tượng khác nhau.

- **Phân tích thành phần chính** (Định nghĩa 14.2, Mệnh đề 14.4, Định lý 14.6) tìm không gian con tuyến tính tốt nhất theo lỗi chiếu trực giao bình phương trên mẫu.
- **Bộ tự mã hóa** (Định nghĩa 14.7, Mệnh đề 14.8) học ánh xạ mã hóa và giải mã theo lỗi tái tạo của hợp hai ánh xạ; trong trường hợp tuyến tính, nó tái tạo đúng như PCA nhưng không xác định tọa độ mã.
- **Bộ tự mã hóa biến phân** (Định nghĩa 14.19, Định lý 14.15, Mệnh đề 14.20) xây dựng một mô hình sinh xác suất và dùng suy luận biến phân để tối ưu cận dưới bằng chứng.

Chúng ta xuất phát từ nhu cầu biểu diễn một quan sát hai chiều bằng một tọa độ. Mệnh đề 14.3 chọn hướng riêng có phương sai lớn nhất, và Mệnh đề 14.4 chứng minh lựa chọn ấy cũng cực tiểu lỗi chiếu trực giao. Bộ tự mã hóa học hai ánh xạ linh hoạt hơn, nhưng Mệnh đề 14.8 cho thấy ngay trong trường hợp tuyến tính, tọa độ của mã không duy nhất, và Ví dụ 14.4 cho thấy nó không chứa phân phối để sinh dữ liệu. Định nghĩa 14.10 bổ sung tiên nghiệm và phân phối quan sát, kéo theo tích phân biên và hậu nghiệm khó tính. Định lý 14.15 thay log-hợp lý bằng ELBO và chỉ ra khe hở là KL tới hậu nghiệm; Mệnh đề 14.18 và Mệnh đề 14.20 làm ELBO tối ưu được bằng gradient trong VAE. Bảng dưới liệt kê các kết quả chính.

| Mạch | Kết quả và giả thiết cần nhớ |
|---|---|
| PCA | Định nghĩa 14.1, 14.2; Mệnh đề 14.3, 14.4; Định lý 14.6. Tâm hóa, hướng đơn vị, phép chiếu trực giao, mất mát bình phương. |
| Bộ tự mã hóa | Định nghĩa 14.7; Mệnh đề 14.8; Nhận xét 14.9. Cùng tái tạo có thể đi với nhiều hệ tọa độ mã; bộ tự mã hóa tất định không chọn phân phối của mã. |
| Mô hình biến ẩn | Định nghĩa 14.10, 14.11. Tiên nghiệm, phân phối có điều kiện, mật độ biên và hậu nghiệm; sinh mẫu khác tính tích phân biên. |
| Suy luận biến phân | Định nghĩa 14.12, 14.14, 14.16; Bổ đề 14.13; Định lý 14.15. Miền hỗ trợ, chuẩn hóa và tính hữu hạn của các kỳ vọng. |
| VAE | Bổ đề 14.17; Mệnh đề 14.18, 14.20; Định nghĩa 14.19; Thuật toán 14.21; Nhận xét 14.22. Độ lệch chuẩn dương, gradient qua nhiễu và giới hạn của mục tiêu. |

Ba công thức nối toàn bài là lỗi chiếu (4.4), mật độ biên (6.1) và phân rã ELBO (7.3). Trong (7.3), KL tới hậu nghiệm là khe hở của cận; trong mục tiêu (7.2), KL tới tiên nghiệm tính được bằng công thức đóng. Hai vị trí này không thay thế cho nhau.

## 10. Bài tập

Bộ bài tập đầy đủ, có gợi ý và lời giải, nằm trong [tệp bài tập của Bài 14](material-viewer.html?doc=materials/lec-14/exercises.md).

**Trên lớp**

1. **Bài tập 14.1** (Phân tích thành phần chính của bốn quan sát trên hai trục): mục tiêu học tập 1; tính hiệp phương sai, hướng chính thứ nhất và lỗi tái tạo.
2. **Bài tập 14.2** (Mô hình sinh từ bộ tự mã hóa trục ngang): mục tiêu học tập 3; dựng mô hình sinh, tính phân phối biên, phân biệt đường sinh mẫu với đường suy luận.
3. **Bài tập 14.3** (Hai vai trò của KL trong phân rã ELBO): mục tiêu học tập 4; phân biệt KL tới hậu nghiệm với KL tới tiên nghiệm.

**Tự học**

4. **Bài tập 14.4** (KL tới tiên nghiệm và tái tham số hóa): mục tiêu học tập 5; tính KL Gaussian và tham số của phép tái tham số hóa.
5. **Bài tập 14.5** (Phương sai mã và lỗi tái tạo theo góc): mục tiêu học tập 1; đọc phương sai giữ lại và lỗi tái tạo theo hướng chiếu.
6. **Bài tập 14.6** (Phân tích thành phần chính của dữ liệu theo đường chéo): mục tiêu học tập 1; hướng tối ưu theo góc và ảnh hưởng của đơn vị đo.
7. **Bài tập 14.7** (Mã, tái tạo và xác suất của một miền): mục tiêu học tập 2 và 3; phân biệt ánh xạ tái tạo với phân phối của dữ liệu sinh.
8. **Bài tập 14.8** (Bộ tự mã hóa theo đường chéo và giới hạn sinh dữ liệu): mục tiêu học tập 2 và 6; tọa độ mã không duy nhất và giới hạn khi sinh dữ liệu.
9. **Bài tập 14.9** (KL Gaussian, kỳ vọng tái tạo và ELBO): mục tiêu học tập 4 và 5; tính từng số hạng của ELBO và kiểm tra phân rã (7.3).
10. **Bài tập 14.10** (Mẫu tái tham số hóa và ước lượng gradient): mục tiêu học tập 5; gradient theo đường mẫu, điều kiện của Mệnh đề 14.20 và gradient của toàn ELBO.
11. **Bài tập 14.11** (KL bằng không, mômen khớp và mô hình sai): mục tiêu học tập 6; chẩn đoán một mô hình có KL bằng $0$ và cận chặt nhưng không phù hợp dữ liệu.

## 11. Câu hỏi cuối buổi và cầu nối

**Câu hỏi.** Tại sao AI cần biến ẩn và suy luận biến phân? Trả lời qua ba ý sau, cho mô hình (6.2) với bộ giải mã $g_\theta$ là một mạng phi tuyến.

1. Biến ẩn $Z$ cho phép làm gì mà bộ tự mã hóa của Định nghĩa 14.7 không làm được?
2. Đại lượng nào cần cho hợp lý cực đại nhưng không tính được, suy luận biến phân thay nó bằng đại lượng nào, và sai khác giữa hai đại lượng bằng bao nhiêu?
3. Một VAE có $\mathrm{KL}\big(q_\phi(\cdot\mid x_i)\,\|\,p\big)=0$ tại mọi quan sát huấn luyện $x_i$. Mã mang thông tin gì về $x_i$, và có kết luận được mẫu sinh tốt không?

::: solution Lời giải câu hỏi cuối buổi
1. Biến ẩn cho một cơ chế sinh dữ liệu mới: lấy $z\sim p(z)$ rồi lấy $x\sim p_\theta(x\mid z)$ (Định nghĩa 14.10, 14.11). Bộ tự mã hóa tất định không chỉ định phân phối của mã, nên cùng một bộ giải mã đi với nhiều cơ chế sinh khác nhau (Ví dụ 14.4).
2. Hợp lý cực đại (Mệnh đề 11.3) cần $\log p_\theta(x)$, chứa tích phân (6.1) không có dạng đóng khi $g_\theta$ phi tuyến; hậu nghiệm (6.3) chứa cùng mẫu số. Suy luận biến phân (Định nghĩa 14.16) thay hậu nghiệm bằng $q_\phi$ và tối ưu ELBO (7.2). Theo Định lý 14.15, $\log p_\theta(x)-\mathcal L(\theta,\phi;x)=\mathrm{KL}\big(q_\phi(\cdot\mid x)\,\|\,p_\theta(\cdot\mid x)\big)\ge0$, và Mệnh đề 14.20 cho phép tối ưu ELBO bằng gradient (Thuật toán 14.21).
3. Theo Bổ đề 14.13, KL bằng $0$ cho $q_\phi(\cdot\mid x_i)=p(z)$ hầu khắp nơi với mọi $i$, nên phân phối của mã không phụ thuộc quan sát và mã không mang thông tin riêng của $x_i$. Không kết luận được về mẫu sinh: trong Tình huống 14.2, KL bằng $0$ và cận chặt, nhưng mô hình có $\mathbb E[X_1^2]=1$ trong khi dữ liệu có $\mathbb E[X_1^2]=9$.
:::

Bài 10–14 trả lời năm câu hỏi về vai trò của toán học trong AI, mỗi câu dựa trên một kết quả chính:

- **Bài 10. Tại sao AI cần xác suất?** Dữ liệu và quan sát không đầy đủ; Định lý 10.11 cho phép cập nhật xác suất khi có thông tin mới.
- **Bài 11. Tại sao học máy là bài toán tối ưu?** Mệnh đề 11.3 biến hợp lý cực đại thành cực tiểu một mất mát thực nghiệm.
- **Bài 12. Tại sao tối ưu tốt chưa chắc học tốt?** Rủi ro thực nghiệm nhỏ không đồng nghĩa rủi ro kỳ vọng nhỏ; Định lý 12.13 và Hệ quả 12.15 cho điều kiện để hai đại lượng gần nhau.
- **Bài 13. Tại sao AI cần quy hoạch động?** Hành động có hậu quả dài hạn; Định lý 13.19 phân rã bài toán quyết định tuần tự bằng phương trình Bellman.
- **Bài 14. Tại sao AI cần biến ẩn và suy luận biến phân?** Biến ẩn $Z$ cho cơ chế sinh $z\sim p(z)$, $x\sim p_\theta(x\mid z)$, còn Định lý 14.15 thay tích phân khó tính bằng một cận dưới tối ưu được.

Khi quan sát không bộc lộ đầy đủ trạng thái của một bài toán quyết định tuần tự như ở Bài 13, cần suy luận về một biến không quan sát được. Mô hình có biến ẩn (6.1), hậu nghiệm (6.3) và suy luận biến phân là các công cụ cho nhu cầu đó.

## 12. Tài liệu đọc

- **Trước buổi học:** Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press ([trang sách của tác giả](https://probml.github.io/pml-book/book1.html)): §20.1, đặc biệt §20.1.2, về phân tích thành phần chính; §6.2.3 và §6.2.4 về KL giữa hai Gaussian và tính không âm của KL.
- **Sau buổi học:** Murphy (2022), §20.1.4.1 về lỗi tái tạo trên tập kiểm tra; §20.3 và §20.3.1 về bộ tự mã hóa và trường hợp tuyến tính; §20.3.5 về VAE. Kevin P. Murphy (2023), *Probabilistic Machine Learning: Advanced Topics*, MIT Press ([trang sách của tác giả](https://probml.github.io/pml-book/book2.html)): §10.1.1 về mục tiêu suy luận biến phân, §10.1.5 về suy luận dùng chung tham số, §10.2.1 về tái tham số hóa; §21.1–§21.2 về mô hình biến ẩn và VAE, gồm §21.2.1 về giả thiết mô hình, §21.2.2 về thuật toán khớp mô hình và §21.2.3 về so sánh VAE với bộ tự mã hóa.
- **Mở rộng:** Murphy (2022), §20.2.2 về PCA xác suất; Murphy (2023), §10.1.6 về khe hở do dùng chung tham số, §21.3.1 về β-VAE và §21.4 về suy sụp hậu nghiệm. Diederik P. Kingma và Max Welling, *Auto-Encoding Variational Bayes*, [arXiv:1312.6114](https://arxiv.org/abs/1312.6114): §2.2–§2.4 về cận dưới và tái tham số hóa, §3 về dạng Gaussian của VAE.

## Phụ lục

### A. Chứng minh Định lý 14.6

**Lộ trình.** Biểu diễn $\operatorname{tr}(U^\top SU)$ thành tổng $\sum_j\lambda_jb_j$ với các trọng số $0\le b_j\le1$ có tổng $k$, rồi chặn tổng này bằng $\sum_{j\le k}\lambda_j$; điều kiện dấu bằng cho tính duy nhất.

**Bước 1 (trọng số $b_j$).** Gọi $V=(v_1,\ldots,v_d)$; vì $V$ trực giao và $SV=V\operatorname{diag}(\lambda_1,\ldots,\lambda_d)$, ta có $S=\sum_j\lambda_jv_jv_j^\top$ và $\sum_jv_jv_j^\top=VV^\top=I_d$. Đặt $b_j=\|U^\top v_j\|_2^2$. Khi đó

$$
\begin{aligned}
\operatorname{tr}(U^\top SU)&=\sum_{j=1}^d\lambda_j\operatorname{tr}(U^\top v_jv_j^\top U)\\
&=\sum_{j=1}^d\lambda_j\|U^\top v_j\|_2^2=\sum_{j=1}^d\lambda_jb_j,\\
\sum_{j=1}^db_j&=\operatorname{tr}\Big(U^\top\Big(\sum_{j=1}^dv_jv_j^\top\Big)U\Big)\\
&=\operatorname{tr}(U^\top U)=k,\\
b_j&=\|UU^\top v_j\|_2^2\le\|v_j\|_2^2=1.
\end{aligned}
$$

Dòng cuối dùng $\|U^\top y\|_2=\|UU^\top y\|_2$ và $\|y\|_2^2=\|UU^\top y\|_2^2+\|(I_d-UU^\top)y\|_2^2$ của Bước 2 trong chứng minh Mệnh đề 14.4, với $y=v_j$. Vì $b_j$ là bình phương một chuẩn nên $b_j\ge0$.

**Bước 2 (chặn trên).** Nếu $k=d$ thì $U$ là ma trận vuông trực giao, $\operatorname{tr}(U^\top SU)=\operatorname{tr}(SUU^\top)=\operatorname{tr}(S)=\sum_j\lambda_j$, và kết luận đúng với lỗi $0$. Giả sử $k<d$. Dùng $\sum_{j>k}b_j=k-\sum_{j\le k}b_j=\sum_{j\le k}(1-b_j)$:

$$
\begin{aligned}
\sum_{j=1}^d\lambda_jb_j
&\le\sum_{j\le k}\lambda_jb_j+\lambda_k\sum_{j>k}b_j\\
&=\sum_{j\le k}\lambda_jb_j+\lambda_k\sum_{j\le k}(1-b_j)\\
&\le\sum_{j\le k}\lambda_jb_j+\sum_{j\le k}\lambda_j(1-b_j)\\
&=\sum_{j\le k}\lambda_j.
\end{aligned}
$$

Bất đẳng thức thứ nhất dùng $\lambda_j\le\lambda_k$ và $b_j\ge0$ khi $j>k$. Bất đẳng thức thứ hai dùng $\lambda_k\le\lambda_j$ và $1-b_j\ge0$ khi $j\le k$.

**Bước 3 (đạt chặn).** Với $U=V_k$, ta có $V_k^\top v_j$ là vector đơn vị thứ $j$ của $\mathbb R^k$ khi $j\le k$ và bằng $0$ khi $j>k$. Do đó $b_j=1$ khi $j\le k$, $b_j=0$ khi $j>k$, và $\operatorname{tr}(V_k^\top SV_k)=\sum_{j\le k}\lambda_j$. Vì $\operatorname{tr}(S)=\sum_j\lambda_j$, (4.4) cho lỗi nhỏ nhất $\sum_{j>k}\lambda_j$.

**Bước 4 (tính duy nhất).** Giả sử $k<d$, $\lambda_k>\lambda_{k+1}$ và $U$ là nghiệm. Bất đẳng thức thứ nhất ở Bước 2 là đẳng thức, tức $\sum_{j>k}(\lambda_k-\lambda_j)b_j=0$. Mỗi số hạng không âm và $\lambda_k-\lambda_j\ge\lambda_k-\lambda_{k+1}>0$ khi $j>k$, nên $b_j=0$, tức $U^\top v_j=0$ với mọi $j>k$. Mọi cột của $U$ vì vậy vuông góc với $v_{k+1},\ldots,v_d$, nên thuộc $\operatorname{span}(v_1,\ldots,v_k)$; do đó $U=V_kV_k^\top U=V_kQ$ với $Q=V_k^\top U$. Ta có $Q^\top Q=U^\top V_kV_k^\top U=U^\top U=I_k$, nên $Q$ vuông trực giao, $QQ^\top=I_k$ và $UU^\top=V_kQQ^\top V_k^\top=V_kV_k^\top$. Ngược lại, nếu $UU^\top=V_kV_k^\top$ thì $\operatorname{tr}(U^\top SU)=\operatorname{tr}(SUU^\top)=\operatorname{tr}(SV_kV_k^\top)=\operatorname{tr}(V_k^\top SV_k)=\sum_{j\le k}\lambda_j$, nên $U$ là nghiệm. $\square$

Như vậy không gian con sinh bởi $k$ vector riêng đầu tiên cho phép nén tuyến tính trực giao có lỗi tái tạo bình phương nhỏ nhất trên mẫu.

### B. Đổi đạo hàm và kỳ vọng trong Mệnh đề 14.20

**Lộ trình.** Viết đạo hàm riêng của $\mathbb E[F]$ là giới hạn của kỳ vọng các thương sai phân, chặn các thương sai phân bằng $G$ nhờ định lý giá trị trung bình, rồi chuyển giới hạn vào trong kỳ vọng bằng định lý hội tụ trội.

**Bước 1 (khả tích trên cả hình cầu).** Với $\vartheta\in\mathcal B$, đoạn thẳng từ $\vartheta_0$ tới $\vartheta$ nằm trong hình cầu $\mathcal B$. Định lý giá trị trung bình cho hàm khả vi liên tục và giả thiết chặn khả tích cho, với hầu mọi $\varepsilon$,

$$
\begin{aligned}
\lvert F(\vartheta,\varepsilon)\rvert&\le\lvert F(\vartheta_0,\varepsilon)\rvert\\
&\quad+G(\varepsilon)\,\|\vartheta-\vartheta_0\|_2.
\end{aligned}
$$

Vế phải có kỳ vọng hữu hạn, nên $\mathbb E\lvert F(\vartheta,\varepsilon)\rvert<\infty$ với mọi $\vartheta\in\mathcal B$.

**Bước 2 (chặn thương sai phân).** Cố định tọa độ $r$ và vector đơn vị $e_r$. Với $\delta\ne0$ đủ nhỏ để $\vartheta+\delta e_r\in\mathcal B$, đặt $D_\delta(\varepsilon)=\big[F(\vartheta+\delta e_r,\varepsilon)-F(\vartheta,\varepsilon)\big]/\delta$. Định lý giá trị trung bình theo biến $\vartheta_r$ cho $D_\delta(\varepsilon)=\partial_rF(\vartheta+c\delta e_r,\varepsilon)$ với một $c\in(0,1)$ phụ thuộc $\varepsilon$, nên $\lvert D_\delta(\varepsilon)\rvert\le G(\varepsilon)$.

**Bước 3 (chuyển giới hạn).** Theo Bước 1, $\mathbb E[D_\delta]=\big(\mathbb E[F(\vartheta+\delta e_r,\varepsilon)]-\mathbb E[F(\vartheta,\varepsilon)]\big)/\delta$. Khi $\delta\to0$, $D_\delta(\varepsilon)\to\partial_rF(\vartheta,\varepsilon)$ với hầu mọi $\varepsilon$, và $\lvert D_\delta\rvert\le G$ với $\mathbb E[G]<\infty$. Định lý hội tụ trội của tích phân Lebesgue cho

$$
\begin{aligned}
\partial_r\mathbb E[F(\vartheta,\varepsilon)]&=\lim_{\delta\to0}\mathbb E[D_\delta]\\
&=\mathbb E[\partial_rF(\vartheta,\varepsilon)].
\end{aligned}
$$

Áp dụng cho mọi tọa độ $r$ được (8.3). $\square$

Như vậy, dưới các giả thiết của Mệnh đề 14.20, lan truyền ngược qua các mẫu nhiễu cho đúng gradient của kỳ vọng tái tạo, không chỉ gradient tại một mẫu cố định.
