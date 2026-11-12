# Bài tập Bài 12 — Học máy, rủi ro thống kê và khả năng tổng quát hóa

Các bài tập dưới đây, đánh số tiếp theo các bài tập trong ghi chú, đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-12/lecture-note.md) của Bài 12. Các bài lấy từ Murphy (2022), *Probabilistic Machine Learning: An Introduction*, bản trực tuyến của tác giả, Chương 10–11, và Shalev-Shwartz và Ben-David (2014), *Understanding Machine Learning: From Theory to Algorithms*, Chương 2–6 và 9; số trang là trang in của sách. Lời giải dẫn định nghĩa, định lý, mệnh đề, hệ quả, ví dụ và bài tập theo số hiệu của ghi chú. Ký hiệu theo ghi chú gồm:

- $R$ và $\hat R_S$ là rủi ro kỳ vọng và rủi ro thực nghiệm, $R_{\mathcal H}^*$ là rủi ro tốt nhất trong lớp, $n$ là cỡ mẫu, $M$ là số phần tử của lớp hữu hạn;
- $A$ là ma trận thiết kế, phương trình chuẩn là (4.4), $\operatorname{sigm}(z)=1/(1+e^{-z})$;
- $d_{\mathrm{VC}}$ là số chiều VC (Định nghĩa 12.18), $\mathcal H_\uparrow$ và $\mathcal H_{\mathrm{aff}}$ là hai lớp ngưỡng (8.3);
- $\log$ là logarit tự nhiên, số thập phân viết bằng dấu phẩy.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Mất mát từ hợp lý; hợp lý cực đại không có nghiệm hữu hạn | 12.1, 12.2 | 12.6, 12.9, 12.12 |
| 2. Phương trình chuẩn; tính duy nhất của hệ số và của giá trị khớp | 12.1 | 12.6, 12.7, 12.8 |
| 3. Rủi ro kỳ vọng, rủi ro thực nghiệm, ERM; rủi ro của ngưỡng | 12.3 | — |
| 4. Hội tụ đều cho lớp hữu hạn; rủi ro dư của ERM | — | 12.10 |
| 5. Học PAC; số chiều VC | — | 12.4, 12.5, 12.11, 12.13, 12.14 |
| 6. Ba nguồn sai số; giả thiết bị vi phạm | — | 12.12, 12.15, 12.16, 12.17 |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 5; so sánh số chiều VC của hai lớp lồng nhau từ Định nghĩa 12.18.

::: exercise Bài tập 12.4 (Tính đơn điệu của số chiều VC; Shalev-Shwartz và Ben-David, Bài 6.1, tr. 78)
Cho hai lớp $\mathcal H'\subseteq\mathcal H$ gồm các hàm $\mathcal X\to\{0,1\}$. Chứng minh $d_{\mathrm{VC}}(\mathcal H')\le d_{\mathrm{VC}}(\mathcal H)$.
:::

::: hint Gợi ý
So sánh hai tập vector nhãn $\mathcal H'|_C$ và $\mathcal H|_C$ trên cùng một tập điểm $C$.
:::

::: solution Lời giải Bài tập 12.4
**Phá vỡ được truyền lên lớp lớn hơn.** Cho $C=\{x_1,\ldots,x_k\}$ là một tập bị $\mathcal H'$ phá vỡ, tức $\mathcal H'|_C=\{0,1\}^k$. Mỗi $h\in\mathcal H'$ cũng thuộc $\mathcal H$, nên
$$
\{0,1\}^k=\mathcal H'|_C\subseteq\mathcal H|_C\subseteq\{0,1\}^k .
$$
Do đó $\mathcal H|_C=\{0,1\}^k$, tức $\mathcal H$ cũng phá vỡ $C$.

**So sánh số chiều.** Mọi tập bị $\mathcal H'$ phá vỡ cũng bị $\mathcal H$ phá vỡ. Nếu $d_{\mathrm{VC}}(\mathcal H')=d$ hữu hạn, có một tập $d$ điểm bị $\mathcal H'$ phá vỡ, nên $d_{\mathrm{VC}}(\mathcal H)\ge d$. Nếu $d_{\mathrm{VC}}(\mathcal H')=+\infty$, có tập bị $\mathcal H'$ phá vỡ với kích thước lớn tùy ý; các tập đó cũng bị $\mathcal H$ phá vỡ, nên $d_{\mathrm{VC}}(\mathcal H)=+\infty$.

**Kiểm tra lại.** Với $h_t(x)=\mathbf 1_{\{x\ge t\}}=\mathbf 1_{\{1\cdot x+(-t)\ge0\}}$, ta có $\mathcal H_\uparrow\subseteq\mathcal H_{\mathrm{aff}}$, và Định lý 12.19 cho $1\le2$, đúng với kết luận.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 5; đọc vai trò của tham số độ chính xác $\varepsilon$ và tham số $\delta$ trong (8.1).

::: exercise Bài tập 12.5 (Tính đơn điệu của cỡ mẫu PAC theo $\varepsilon$ và $\delta$; Shalev-Shwartz và Ben-David, Bài 3.1, tr. 50)
Cho lớp $\mathcal H$ các bộ phân loại nhị phân học được PAC trong thiết lập khả thực (Định nghĩa 12.17). Với $\varepsilon,\delta\in(0,1)$, gọi $m_{\mathcal H}(\varepsilon,\delta)$ là số nguyên nhỏ nhất $N$ sao cho có một quy tắc học thỏa (8.1) với mọi phân phối $P$ khả thực đối với $\mathcal H$ và mọi $n\ge N$; $m_{\mathcal H}$ được gọi là *cỡ mẫu cần thiết* (sample complexity) của $\mathcal H$. Chứng minh:

- với $\delta\in(0,1)$ và $0<\varepsilon_1\le\varepsilon_2<1$, $m_{\mathcal H}(\varepsilon_1,\delta)\ge m_{\mathcal H}(\varepsilon_2,\delta)$;
- với $\varepsilon\in(0,1)$ và $0<\delta_1\le\delta_2<1$, $m_{\mathcal H}(\varepsilon,\delta_1)\ge m_{\mathcal H}(\varepsilon,\delta_2)$.
:::

::: hint Gợi ý
Chỉ ra rằng mọi cặp (quy tắc học, $N$) đáp ứng yêu cầu ứng với $(\varepsilon_1,\delta)$ cũng đáp ứng yêu cầu ứng với $(\varepsilon_2,\delta)$, rồi so sánh hai số nhỏ nhất.
:::

::: solution Lời giải Bài tập 12.5
**Tập các cỡ mẫu đủ.** Với $(\varepsilon,\delta)$ cho trước, gọi $\mathcal N(\varepsilon,\delta)$ là tập các số nguyên $N$ sao cho có một quy tắc học thỏa (8.1) với mọi $P$ khả thực và mọi $n\ge N$. Theo định nghĩa, $m_{\mathcal H}(\varepsilon,\delta)=\min\mathcal N(\varepsilon,\delta)$; tập này khác rỗng vì $\mathcal H$ học được PAC.

**Theo $\varepsilon$.** Lấy $N\in\mathcal N(\varepsilon_1,\delta)$ cùng quy tắc học tương ứng. Với mọi $P$ khả thực và $n\ge N$, vì $\varepsilon_1\le\varepsilon_2$,
$$
\begin{aligned}
&\mathbb P_S\bigl(R(\hat h_S)\le\varepsilon_2\bigr)\\
&\quad\ge\mathbb P_S\bigl(R(\hat h_S)\le\varepsilon_1\bigr)\\
&\quad\ge1-\delta .
\end{aligned}
$$
Dòng thứ nhất dùng $\{R(\hat h_S)\le\varepsilon_1\}\subseteq\{R(\hat h_S)\le\varepsilon_2\}$, dòng thứ hai dùng $N\in\mathcal N(\varepsilon_1,\delta)$. Do đó $N\in\mathcal N(\varepsilon_2,\delta)$, tức $\mathcal N(\varepsilon_1,\delta)\subseteq\mathcal N(\varepsilon_2,\delta)$. Số nhỏ nhất của tập lớn hơn không vượt số nhỏ nhất của tập nhỏ hơn, nên $m_{\mathcal H}(\varepsilon_2,\delta)\le m_{\mathcal H}(\varepsilon_1,\delta)$.

**Theo $\delta$.** Lấy $N\in\mathcal N(\varepsilon,\delta_1)$. Với mọi $P$ khả thực và $n\ge N$,
$$
\begin{aligned}
\mathbb P_S\bigl(R(\hat h_S)\le\varepsilon\bigr)&\ge1-\delta_1\\
&\ge1-\delta_2 ,
\end{aligned}
$$
nên $N\in\mathcal N(\varepsilon,\delta_2)$. Lập luận như trên cho $m_{\mathcal H}(\varepsilon,\delta_2)\le m_{\mathcal H}(\varepsilon,\delta_1)$. $\square$

**Kiểm tra lại.** Với lớp hữu hạn, cận đủ $\lceil2\log(2M/\delta)/\varepsilon^2\rceil$ của Mục 8.1 cũng giảm khi $\varepsilon$ hoặc $\delta$ tăng.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1, 2; đưa hợp lý cực đại của mô hình nhiều đầu ra về các phương trình chuẩn riêng rẽ.

::: exercise Bài tập 12.6 (Hồi quy tuyến tính hai đầu ra trên đầu vào nhị phân; Murphy, Bài 11.1, §11.8, tr. 411)
Mỗi quan sát gồm đầu vào nhị phân $x_i\in\{0,1\}$ và đầu ra $y_i\in\mathbb R^2$. Tập huấn luyện gồm sáu cặp:

| $x$ | $y$ |
|---|---|
| $0$ | $(-1,-1)^\top$ |
| $0$ | $(-1,-2)^\top$ |
| $0$ | $(-2,-1)^\top$ |
| $1$ | $(1,1)^\top$ |
| $1$ | $(1,2)^\top$ |
| $1$ | $(2,1)^\top$ |

Mỗi đầu vào được nhúng vào $\mathbb R^2$ bằng $\phi(0)=(1,0)^\top$, $\phi(1)=(0,1)^\top$, và mô hình dự đoán $\hat y=W^\top\phi(x)$ với $W$ là ma trận $2\times2$. Giả sử các đầu ra độc lập có điều kiện, $Y_i\mid x_i\sim\mathcal N(W^\top\phi(x_i),\sigma^2I_2)$ với $\sigma^2>0$ đã biết. Tìm nghiệm hợp lý cực đại của $W$.
:::

::: hint Gợi ý
Viết âm log-hợp lý thành tổng của hai bài toán bình phương tối thiểu, mỗi bài cho một cột của $W$ và có cùng ma trận thiết kế với các hàng $\phi(x_i)^\top$.
:::

::: solution Lời giải Bài tập 12.6
**Tách theo cột.** Gọi $w^{(1)},w^{(2)}$ là hai cột của $W$ và $y^{(1)},y^{(2)}\in\mathbb R^6$ là vector các tọa độ thứ nhất và thứ hai của sáu đầu ra. Thành phần thứ $j$ của $W^\top\phi(x_i)$ là $\phi(x_i)^\top w^{(j)}$. Mật độ Gaussian với hiệp phương sai $\sigma^2I_2$ là tích của hai mật độ một chiều, nên như trong chứng minh Mệnh đề 12.2,
$$
\begin{aligned}
&-\log L(W)=6\log(2\pi\sigma^2)\\
&\quad+\frac1{2\sigma^2}\sum_{j=1}^2\bigl\lVert Aw^{(j)}-y^{(j)}\bigr\rVert^2,
\end{aligned}
$$
trong đó $A\in\mathbb R^{6\times2}$ có hàng thứ $i$ là $\phi(x_i)^\top$. Số hạng đầu không phụ thuộc $W$, và mỗi cột chỉ xuất hiện trong một tổng, nên ta cực tiểu hóa riêng từng tổng.

**Phương trình chuẩn.** Ba hàng đầu của $A$ bằng $(1,0)$, ba hàng sau bằng $(0,1)$, nên
$$
A^\top A=\begin{pmatrix}3&0\\0&3\end{pmatrix}.
$$
Định thức bằng $9>0$, nên mỗi cột có nghiệm duy nhất (Mệnh đề 12.3). Vế phải gồm tổng các tọa độ theo nhóm $x=0$ và nhóm $x=1$:
$$
\begin{aligned}
A^\top y^{(1)}&=\begin{pmatrix}-1-1-2\\1+1+2\end{pmatrix}\\
&=\begin{pmatrix}-4\\4\end{pmatrix},\\
A^\top y^{(2)}&=\begin{pmatrix}-1-2-1\\1+2+1\end{pmatrix}\\
&=\begin{pmatrix}-4\\4\end{pmatrix}.
\end{aligned}
$$
Do đó $\hat w^{(1)}=\hat w^{(2)}=\frac13(-4,4)^\top$, và
$$
\hat W=\begin{pmatrix}-\frac43&-\frac43\\[2pt]\frac43&\frac43\end{pmatrix}.
$$

**Dự đoán.** $\hat W^\top\phi(0)=(-\frac43,-\frac43)^\top$ là trung bình ba đầu ra có $x=0$, và $\hat W^\top\phi(1)=(\frac43,\frac43)^\top$ là trung bình ba đầu ra có $x=1$.

**Kiểm tra lại.** Phần dư của nhóm $x=0$ là $(\frac13,\frac13)$, $(\frac13,-\frac23)$, $(-\frac23,\frac13)$, có tổng $(0,0)$; nhóm $x=1$ đối xứng. Do đó $A^\top(y^{(j)}-A\hat w^{(j)})=0$ với $j=1,2$, đúng với (4.4).
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 2; viết từng phương trình của (4.4) theo phần dư khi bỏ một đặc trưng.

::: exercise Bài tập 12.7 (Đạo hàm riêng của tổng bình phương phần dư; Murphy, Bài 11.3, §11.8, tr. 412)
Cho $A\in\mathbb R^{n\times p}$ với các cột $A_{:,1},\ldots,A_{:,p}$, $y\in\mathbb R^n$ và $\mathrm{RSS}(w)=\lVert Aw-y\rVert_2^2$. Với mỗi $k$, đặt
$$
r_k=y-\sum_{j\ne k}w_jA_{:,j},
$$
là phần dư khi dùng mọi đặc trưng trừ đặc trưng thứ $k$.

1. Chứng minh
$$
\frac{\partial}{\partial w_k}\mathrm{RSS}(w)=a_kw_k-c_k,
$$
với $a_k=2\sum_{i=1}^nA_{ik}^2=2\lVert A_{:,k}\rVert^2$ và $c_k=2\sum_{i=1}^nA_{ik}\bigl(y_i-\sum_{j\ne k}w_jA_{ij}\bigr)=2A_{:,k}^\top r_k$.
2. Giả sử $A_{:,k}\ne0$. Chứng minh nếu $\frac{\partial}{\partial w_k}\mathrm{RSS}(w)=0$ thì
$$
\hat w_k=\frac{A_{:,k}^\top r_k}{\lVert A_{:,k}\rVert^2}.
$$
:::

::: hint Gợi ý
Tách $Aw-y=w_kA_{:,k}-r_k$, trong đó $r_k$ không phụ thuộc $w_k$, rồi khai triển bình phương chuẩn.
:::

::: solution Lời giải Bài tập 12.7
**1. Đạo hàm riêng.** Vì $Aw=\sum_jw_jA_{:,j}$, ta có $Aw-y=w_kA_{:,k}-r_k$, và $r_k$ không chứa $w_k$. Khai triển:
$$
\begin{aligned}
\mathrm{RSS}(w)&=\lVert w_kA_{:,k}-r_k\rVert^2\\
&=w_k^2\lVert A_{:,k}\rVert^2\\
&\quad-2w_kA_{:,k}^\top r_k+\lVert r_k\rVert^2 .
\end{aligned}
$$
Đạo hàm theo $w_k$, với $r_k$ giữ cố định:
$$
\begin{aligned}
&\frac{\partial}{\partial w_k}\mathrm{RSS}(w)\\
&\quad=2\lVert A_{:,k}\rVert^2w_k-2A_{:,k}^\top r_k\\
&\quad=a_kw_k-c_k .
\end{aligned}
$$
Tọa độ thứ $i$ của $r_k$ là $y_i-\sum_{j\ne k}w_jA_{ij}$, nên $2A_{:,k}^\top r_k$ bằng tổng trong định nghĩa của $c_k$.

**2. Điều kiện bậc nhất.** Nếu $a_kw_k-c_k=0$ và $A_{:,k}\ne0$ thì $a_k>0$, nên
$$
\hat w_k=\frac{c_k}{a_k}=\frac{A_{:,k}^\top r_k}{\lVert A_{:,k}\rVert^2}. \qquad\square
$$

**Kiểm tra lại.** Thế $r_k=w_kA_{:,k}-(Aw-y)$ vào câu 1: $a_kw_k-c_k=2A_{:,k}^\top(Aw-y)$. Đặt cả $p$ đạo hàm riêng bằng $0$ cho $A^\top(Aw-y)=0$, đúng phương trình chuẩn (4.4).
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 2; nối điều kiện nghiệm duy nhất của (4.4) với các vector đặc trưng của mẫu.

::: exercise Bài tập 12.8 (Điều kiện khả nghịch của ma trận phương trình chuẩn; Shalev-Shwartz và Ben-David, Bài 9.2, tr. 128)
Cho các vector đặc trưng $x_1,\ldots,x_n\in\mathbb R^p$ và
$$
G=\sum_{i=1}^nx_ix_i^\top .
$$
Chứng minh $G$ khả nghịch khi và chỉ khi $x_1,\ldots,x_n$ sinh ra $\mathbb R^p$.
:::

::: hint Gợi ý
Tính $v^\top Gv$ và chứng minh $Gv=0$ khi và chỉ khi $x_i^\top v=0$ với mọi $i$.
:::

::: solution Lời giải Bài tập 12.8
**Hạt nhân của $G$.** Với $v\in\mathbb R^p$,
$$
\begin{aligned}
Gv&=\sum_{i=1}^nx_i\,(x_i^\top v),\\
v^\top Gv&=\sum_{i=1}^n(x_i^\top v)^2 .
\end{aligned}
$$
Nếu $x_i^\top v=0$ với mọi $i$ thì dòng thứ nhất cho $Gv=0$. Ngược lại, nếu $Gv=0$ thì $v^\top Gv=0$; dòng thứ hai là tổng các số không âm, nên mọi $x_i^\top v=0$. Do đó
$$
\ker G=\{v:\ x_i^\top v=0\ \ \forall i\}.
$$

**Hai chiều.** Ma trận vuông $G$ khả nghịch khi và chỉ khi $\ker G=\{0\}$.
- Nếu $x_1,\ldots,x_n$ sinh ra $\mathbb R^p$ và $v\in\ker G$, thì $v$ vuông góc với mọi $x_i$, nên vuông góc với mọi tổ hợp tuyến tính của chúng, kể cả chính $v$. Do đó $\lVert v\rVert^2=0$ và $v=0$.
- Nếu $x_1,\ldots,x_n$ không sinh ra $\mathbb R^p$, không gian con $V$ do chúng sinh ra có số chiều nhỏ hơn $p$, nên phần bù trực giao của $V$ chứa một $v\ne0$. Vector này thỏa $x_i^\top v=0$ với mọi $i$, nên $v\in\ker G$ và $G$ không khả nghịch. $\square$

**Liên hệ với (4.4).** Xếp $x_i^\top$ thành các hàng của ma trận thiết kế $A$, ta có $G=A^\top A$. Các hàng sinh ra $\mathbb R^p$ khi và chỉ khi $\operatorname{rank}A=p$, tức $A$ có hạng cột đầy đủ, và khi đó (4.4) có nghiệm duy nhất (4.5).

**Kiểm tra lại.** Trong Ví dụ 12.3, hai vector đặc trưng cùng bằng $(1,1)^\top$ và chỉ sinh ra một đường thẳng; $G=\begin{pmatrix}2&2\\2&2\end{pmatrix}$ có định thức $0$, và $v=(1,-1)^\top\in\ker G$.
:::

**Mức độ:** tính toán, chứng minh. **Mục tiêu:** mục tiêu học tập 1; tính gradient và Hessian của âm log-hợp lý logistic từ Mệnh đề 12.6.

::: exercise Bài tập 12.9 (Gradient và Hessian của entropy chéo nhị phân; Murphy, Bài 10.1, §10.6, tr. 367–368, trường hợp hai lớp)
Cho dữ liệu $(x_i,y_i)$, $i=1,\ldots,n$, với $y_i\in\{0,1\}$ và vector đặc trưng $\phi_i=\phi(x_i)\in\mathbb R^p$. Mô hình logistic (Định nghĩa 12.5) đặt $z_i=w^\top\phi_i$ và $\mu_i=\operatorname{sigm}(z_i)$. Âm log-hợp lý là
$$
\begin{aligned}
\ell(w)=-\sum_{i=1}^n\bigl[&y_i\log\mu_i\\
&+(1-y_i)\\
&\quad\times\log(1-\mu_i)\bigr].
\end{aligned}
$$

1. Chứng minh $\dfrac{d\mu_i}{dz_i}=\mu_i(1-\mu_i)$.
2. Chứng minh gradient của âm log-hợp lý là $\nabla\ell(w)=\sum_{i=1}^n(\mu_i-y_i)\phi_i$.
3. Chứng minh Hessian là $H(w)=\sum_{i=1}^n\mu_i(1-\mu_i)\phi_i\phi_i^\top$. Suy ra $H(w)$ nửa xác định dương, và xác định dương khi ma trận $\Phi$ với các hàng $\phi_i^\top$ có hạng cột đầy đủ.
:::

::: hint Gợi ý
Ở câu 2, tính $\partial\ell_i/\partial\mu_i$ cho từng số hạng, rồi dùng quy tắc dây chuyền với câu 1 và $\nabla_wz_i=\phi_i$. Ở câu 3, tính $v^\top H(w)v$.
:::

::: solution Lời giải Bài tập 12.9
**1. Đạo hàm của sigmoid.** Với $\operatorname{sigm}(z)=(1+e^{-z})^{-1}$,
$$
\begin{aligned}
&\frac{d}{dz}\operatorname{sigm}(z)=\frac{e^{-z}}{(1+e^{-z})^2}\\
&\quad=\frac1{1+e^{-z}}\cdot\frac{e^{-z}}{1+e^{-z}}\\
&\quad=\operatorname{sigm}(z)\bigl(1-\operatorname{sigm}(z)\bigr).
\end{aligned}
$$
Dòng cuối dùng $1-\operatorname{sigm}(z)=\frac{e^{-z}}{1+e^{-z}}$.

**2. Gradient.** Đặt $\ell_i=-y_i\log\mu_i-(1-y_i)\log(1-\mu_i)$. Ta có
$$
\begin{aligned}
\frac{\partial\ell_i}{\partial\mu_i}&=-\frac{y_i}{\mu_i}+\frac{1-y_i}{1-\mu_i}\\
&=\frac{\mu_i-y_i}{\mu_i(1-\mu_i)} .
\end{aligned}
$$
Theo quy tắc dây chuyền và câu 1,
$$
\begin{aligned}
\frac{\partial\ell_i}{\partial z_i}&=\frac{\mu_i-y_i}{\mu_i(1-\mu_i)}\\
&\quad\cdot\mu_i(1-\mu_i)\\
&=\mu_i-y_i .
\end{aligned}
$$
Vì $\nabla_wz_i=\phi_i$, ta được $\nabla\ell_i(w)=(\mu_i-y_i)\phi_i$. Cộng theo $i$ cho $\nabla\ell(w)=\sum_i(\mu_i-y_i)\phi_i$. Gradient của log-hợp lý là vector đối, $\sum_i(y_i-\mu_i)\phi_i$.

**3. Hessian.** Trong $(\mu_i-y_i)\phi_i$, chỉ $\mu_i$ phụ thuộc $w$, với $\nabla_w\mu_i=\mu_i(1-\mu_i)\phi_i$ theo câu 1. Do đó
$$
\begin{aligned}
H(w)&=\sum_{i=1}^n\phi_i\bigl(\nabla_w\mu_i\bigr)^\top\\
&=\sum_{i=1}^n\mu_i(1-\mu_i)\phi_i\phi_i^\top .
\end{aligned}
$$
Với mọi $v\in\mathbb R^p$,
$$
\begin{aligned}
&v^\top H(w)v\\
&\quad=\sum_{i=1}^n\mu_i(1-\mu_i)\,(\phi_i^\top v)^2\\
&\quad\ge0,
\end{aligned}
$$
vì $\mu_i\in(0,1)$ với mọi $w$ hữu hạn. Tổng bằng $0$ khi và chỉ khi $\phi_i^\top v=0$ với mọi $i$, tức $\Phi v=0$. Nếu $\Phi$ có hạng cột đầy đủ thì $\Phi v=0$ kéo theo $v=0$, nên $v^\top H(w)v>0$ với mọi $v\ne0$. $\square$

**Kiểm tra lại.** Với dữ liệu của Ví dụ 12.5, $\phi(x)=x$, $(x_1,y_1)=(-1,0)$, $(x_2,y_2)=(1,1)$:
$$
\begin{aligned}
\ell'(w)&=\operatorname{sigm}(-w)\cdot(-1)\\
&\quad+\bigl(\operatorname{sigm}(w)-1\bigr)\cdot1\\
&=-2\operatorname{sigm}(-w)\\
&=-\frac2{1+e^{w}},
\end{aligned}
$$
bằng $2\hat L_2'(w)$ theo (5.2), đúng với $\ell=n\hat L_n$ khi $n=2$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 4; mở rộng Định lý 12.13 và Hệ quả 12.15 cho mất mát bị chặn trong một khoảng bất kỳ.

::: exercise Bài tập 12.10 (Cỡ mẫu cho mất mát nhận giá trị trong $[a,b]$; Shalev-Shwartz và Ben-David, Bài 4.2, tr. 59)
Định lý 12.13 và Hệ quả 12.15 giả thiết mất mát nhận giá trị trong $[0,1]$. Cho lớp hữu hạn $\mathcal H$ gồm $M$ hàm, chọn trước khi lấy mẫu, mẫu i.i.d. theo (G1), và mất mát $\ell(a',y)\in[a,b]$ với mọi $a',y$, trong đó $a<b$. Đặt
$$
\begin{aligned}
&N_{\mathcal H}(\varepsilon,\delta)\\
&\quad=\Bigl\lceil\frac{\log(2M/\delta)(b-a)^2}{2\varepsilon^2}\Bigr\rceil .
\end{aligned}
$$
Chứng minh:

1. $\mathcal H$ có tính hội tụ đều (Định nghĩa 12.12) với cỡ mẫu $N_{\mathcal H}(\varepsilon,\delta)$;
2. với ERM chính xác, khi $n\ge N_{\mathcal H}(\varepsilon/2,\delta)$,
$$
\begin{aligned}
&\mathbb P_S\bigl(R(\hat h_S)\le R_{\mathcal H}^*+\varepsilon\bigr)\\
&\quad\ge1-\delta .
\end{aligned}
$$

Ở câu 2, viết cỡ mẫu đủ dưới dạng
$$
\begin{aligned}
&N_{\mathcal H}(\varepsilon/2,\delta)\\
&\quad=\Bigl\lceil\frac{2\log(2M/\delta)(b-a)^2}{\varepsilon^2}\Bigr\rceil .
\end{aligned}
$$
:::

::: hint Gợi ý
Lặp lại chứng minh Định lý 12.13, thay $V=n$ bằng $V=n(b-a)^2$ trong bất đẳng thức Hoeffding, rồi áp Bổ đề 12.14 với $\eta=0$ và $\varepsilon/2$.
:::

::: solution Lời giải Bài tập 12.10
**Một hàm cố định.** Với $h\in\mathcal H$, đặt $Z_i=\ell(h(X_i),Y_i)$. Các $Z_i$ độc lập, $a\le Z_i\le b$, $\mathbb EZ_i=R(h)$ và $\bar Z_n=\hat R_S(h)$. Bất đẳng thức Hoeffding cho biến bị chặn (Định lý 05c.47, ở dạng dùng khi suy ra (7.1)) với $l_i=a$, $u_i=b$, $V=n(b-a)^2$ cho
$$
\begin{aligned}
&\mathbb P_S\bigl(\lvert\hat R_S(h)-R(h)\rvert\ge\varepsilon\bigr)\\
&\quad\le2\exp\Bigl(-\frac{2n^2\varepsilon^2}{n(b-a)^2}\Bigr)\\
&\quad=2\exp\Bigl(-\frac{2n\varepsilon^2}{(b-a)^2}\Bigr).
\end{aligned}
$$

**Hội tụ đều.** Như Bước 1–3 của chứng minh Định lý 12.13, bất đẳng thức hợp trên $M$ biến cố cho
$$
\begin{aligned}
&\mathbb P_S(\Delta_S>\varepsilon)\\
&\quad\le2M\exp\Bigl(-\frac{2n\varepsilon^2}{(b-a)^2}\Bigr).
\end{aligned}
$$
Vế phải không vượt $\delta$ khi và chỉ khi
$$
\begin{aligned}
&-\frac{2n\varepsilon^2}{(b-a)^2}\le\log\frac{\delta}{2M}\\
&\iff n\ge\frac{\log(2M/\delta)(b-a)^2}{2\varepsilon^2}.
\end{aligned}
$$
Do đó với $n\ge N_{\mathcal H}(\varepsilon,\delta)$, $\mathbb P_S(\Delta_S\le\varepsilon)\ge1-\delta$, tức (7.3).

**Rủi ro dư của ERM.** Với $n\ge N_{\mathcal H}(\varepsilon/2,\delta)$, biến cố $G=\{\Delta_S\le\varepsilon/2\}$ có xác suất ít nhất $1-\delta$. Mọi rủi ro hữu hạn vì mất mát bị chặn. Trên $G$, Bổ đề 12.14 với $\eta=0$ và độ lệch đều $\varepsilon/2$ cho
$$
R(\hat h_S)\le R_{\mathcal H}^*+2\cdot\frac\varepsilon2=R_{\mathcal H}^*+\varepsilon .
$$
Thay $\varepsilon$ bằng $\varepsilon/2$ trong công thức của $N_{\mathcal H}$:
$$
\begin{aligned}
&\frac{\log(2M/\delta)(b-a)^2}{2(\varepsilon/2)^2}\\
&\quad=\frac{2\log(2M/\delta)(b-a)^2}{\varepsilon^2}.
\end{aligned}
$$
$\square$

**Kiểm tra lại.** Với $[a,b]=[0,1]$, $N_{\mathcal H}(\varepsilon,\delta)$ trùng công thức của Định lý 12.13, và điều kiện $n\ge2\log(2M/\delta)/\varepsilon^2$ trùng Hệ quả 12.15 với $\eta=0$. Cỡ mẫu tăng theo $(b-a)^2$: nhân độ rộng khoảng giá trị của mất mát lên $2$ lần thì cỡ mẫu đủ tăng $4$ lần.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 5; tính số chiều VC của một lớp trên trục thực bằng hai bước của Định lý 12.19.

::: exercise Bài tập 12.11 (Số chiều VC của lớp khoảng có dấu; Shalev-Shwartz và Ben-David, Bài 6.9, tr. 80)
Trên $\mathcal X=\mathbb R$, với $a\le b$ và $s\in\{0,1\}$, đặt
$$
h_{a,b,s}(x)=\begin{cases}s, & x\in[a,b],\\ 1-s, & x\notin[a,b].\end{cases}
$$
Lớp *khoảng có dấu* là $\mathcal H=\{h_{a,b,s}:\ a\le b,\ s\in\{0,1\}\}$. Tính $d_{\mathrm{VC}}(\mathcal H)$.
:::

::: hint Gợi ý
Với $s=1$, các điểm mang nhãn $1$ nằm liền nhau theo thứ tự trên trục; với $s=0$, các điểm mang nhãn $0$ nằm liền nhau. Thử vector nhãn $1010$ trên bốn điểm.
:::

::: solution Lời giải Bài tập 12.11
**Phá vỡ ba điểm.** Xét $C=\{1,2,3\}$. Các tham số sau cho đủ tám vector nhãn $(h(1),h(2),h(3))$:
- $s=1$, $[a,b]=[5,5]$: $000$;
- $s=1$, $[a,b]=[1,1]$, $[2,2]$, $[3,3]$: $100$, $010$, $001$;
- $s=1$, $[a,b]=[1,2]$, $[2,3]$, $[1,3]$: $110$, $011$, $111$;
- $s=0$, $[a,b]=[2,2]$: $101$.

Do đó $d_{\mathrm{VC}}(\mathcal H)\ge3$.

**Không phá vỡ bốn điểm.** Cho $x_1<x_2<x_3<x_4$ bất kỳ và xét vector nhãn $1010$.
- $s=1$: nhãn $1$ tại $x_1$ và $x_3$ kéo theo $x_1,x_3\in[a,b]$, nên $x_2\in[a,b]$ và $h(x_2)=1$, trái với nhãn $0$.
- $s=0$: nhãn $0$ tại $x_2$ và $x_4$ kéo theo $x_2,x_4\in[a,b]$, nên $x_3\in[a,b]$ và $h(x_3)=0$, trái với nhãn $1$.

Không hàm nào cho $1010$, nên không tập bốn điểm nào bị phá vỡ, và $d_{\mathrm{VC}}(\mathcal H)=3$. $\square$

**Kiểm tra lại.** Lớp con với $s=1$ là lớp khoảng; trên ba điểm nó thiếu đúng vector $101$, cùng lập luận "khoảng chứa $x_1$ và $x_3$ thì chứa $x_2$". Thêm $s=0$ bù vector đó, và vector thiếu chuyển lên bốn điểm.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 1, 6; so sánh hai lớp lồng nhau theo log-hợp lý huấn luyện và tách log-hợp lý khỏi tỉ lệ phân loại sai.

::: exercise Bài tập 12.12 (So sánh log-hợp lý huấn luyện và tỉ lệ phân loại sai; Murphy, Bài 10.3 (c), (e), §10.6, tr. 368–369)
Hai bộ phân loại nhị phân được huấn luyện bằng hợp lý cực đại trên cùng một tập huấn luyện $(x_i,y_i)$, $i=1,\ldots,n$:
- **LinLog:** mô hình logistic với đặc trưng tuyến tính;
- **QuadLog:** mô hình logistic với đặc trưng tuyến tính và bậc hai (khai triển cơ sở đa thức bậc $2$).

Với mỗi mô hình $M$ và tham số ước lượng $\hat\theta$, đặt
$$
\begin{aligned}
&L(M)\\
&\quad=\frac1n\sum_{i=1}^n\log p(y_i\mid x_i,\hat\theta,M),
\end{aligned}
$$
tức log-hợp lý có điều kiện trung bình trên tập huấn luyện; khi nghiệm hợp lý cực đại không tồn tại, $L(M)$ là cận trên đúng theo tham số.

1. Xác định $L(\text{LinLog})\le L(\text{QuadLog})$ đúng với mọi tập huấn luyện, $L(\text{LinLog})\ge L(\text{QuadLog})$ đúng với mọi tập huấn luyện, hay không có quan hệ nào như vậy. Giải thích trong một hoặc hai câu.
2. Đo chất lượng bằng tỉ lệ phân loại sai trên tập huấn luyện,
$$
R(M)=\frac1n\sum_{i=1}^n\mathbf 1_{\{y_i\ne\hat y(x_i)\}}.
$$
Xác định xem $L(M)>L(M')$ có luôn kéo theo $R(M)<R(M')$ không, và giải thích.
:::

::: hint Gợi ý
Ở câu 1, cho các hệ số của đặc trưng bậc hai bằng $0$. Ở câu 2, xét lại Ví dụ 12.4: log-hợp lý phụ thuộc xác suất gán cho nhãn thật, còn tỉ lệ sai chỉ phụ thuộc phía của ngưỡng $\frac12$.
:::

::: solution Lời giải Bài tập 12.12
**1. Hai lớp lồng nhau.** Mỗi tham số của LinLog ứng với một tham số của QuadLog có mọi hệ số bậc hai bằng $0$, và hai tham số này cho cùng xác suất $p(y\mid x)$ tại mọi $x$. Do đó tập các phân phối có điều kiện của LinLog nằm trong tập của QuadLog, và cận trên đúng của log-hợp lý trên tập lớn hơn không nhỏ hơn. Vậy $L(\text{LinLog})\le L(\text{QuadLog})$ với mọi tập huấn luyện.

**2. Log-hợp lý và tỉ lệ sai.** Không. Cả $L$ và $R$ chỉ phụ thuộc các xác suất dự đoán tại các điểm huấn luyện, nên chỉ cần hai bộ xác suất ngược chiều. Lấy $M$ và $M'$ là hai mô hình, mỗi mô hình gồm đúng một phân phối có điều kiện, nên $\hat\theta$ chính là phân phối đó. Lấy $n=2$, $y_1=1$, $y_2=0$, và quy tắc nhãn $\hat y(x)=\mathbf 1_{\{p(Y=1\mid x)\ge1/2\}}$.
- Mô hình $M$ gán $p(Y=1\mid x_1)=0{,}45$ và $p(Y=1\mid x_2)=0{,}05$. Nhãn dự đoán là $(0,0)$, nên $R(M)=\frac12$, và
$$
\begin{aligned}
L(M)&=\tfrac12\bigl[\log0{,}45\\
&\qquad+\log0{,}95\bigr]\\
&\approx-0{,}4249 .
\end{aligned}
$$
- Mô hình $M'$ gán $p(Y=1\mid x_1)=0{,}55$ và $p(Y=1\mid x_2)=0{,}45$. Nhãn dự đoán là $(1,0)$, nên $R(M')=0$, và
$$
\begin{aligned}
L(M')&=\tfrac12\bigl[\log0{,}55\\
&\qquad+\log0{,}55\bigr]\\
&\approx-0{,}5978 .
\end{aligned}
$$

Ở đây $L(M)>L(M')$ nhưng $R(M)>R(M')$. Mô hình $M$ gán xác suất $0{,}95$ cho nhãn thật tại $x_2$ và $0{,}45$ tại $x_1$; $M'$ gán $0{,}55$ tại cả hai điểm.

**Kiểm tra lại.** $\log0{,}45\approx-0{,}7985$, $\log0{,}95\approx-0{,}0513$, $\log0{,}55\approx-0{,}5978$. Bất đẳng thức ở câu 1 chỉ nói về tập huấn luyện. Trong Ví dụ 12.8, $h_{0{,}3}$ có $\hat R_S=0$ và $R=0{,}15$, còn $h_{-0{,}2}$ có $\hat R_S=\frac14$ và $R=0{,}1$: hàm khớp tập huấn luyện tốt hơn có rủi ro kỳ vọng lớn hơn.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 5; chứng minh một lớp vô hạn học được PAC trong thiết lập khả thực và tính cỡ mẫu đủ.

::: exercise Bài tập 12.13 (Học PAC lớp đường tròn đồng tâm; Shalev-Shwartz và Ben-David, Bài 3.3, tr. 51)
Cho $\mathcal X=\mathbb R^2$, $\mathcal Y=\{0,1\}$ và lớp các đường tròn đồng tâm $\mathcal H=\{h_r:\ r\ge0\}$ với $h_r(x)=\mathbf 1_{\{\lVert x\rVert\le r\}}$. Giả sử thiết lập khả thực: nhãn là $y=h_{r^*}(x)$ với một $r^*\ge0$ chưa biết. Chứng minh $\mathcal H$ học được PAC và cỡ mẫu cần thiết (Bài tập 12.5) thỏa
$$
m_{\mathcal H}(\varepsilon,\delta)\le\Bigl\lceil\frac{\log(1/\delta)}{\varepsilon}\Bigr\rceil .
$$
:::

::: hint Gợi ý
Dùng quy tắc chọn $\hat r$ bằng chuẩn lớn nhất của các điểm mang nhãn $1$ (và $\hat r=0$ nếu không có điểm nào). Bộ phân loại học được chỉ sai trên vành $\{\hat r<\lVert x\rVert\le r^*\}$. Tìm một vành bám vào $r^*$ có xác suất ít nhất $\varepsilon$, và chặn xác suất mẫu không có điểm nào trong vành đó bằng $(1-\varepsilon)^n\le e^{-\varepsilon n}$.
:::

::: solution Lời giải Bài tập 12.13
**Quy tắc học là ERM.** Đặt $\hat r=\max\{\lVert x_i\rVert:\ y_i=1\}$, và $\hat r=0$ nếu mẫu không có nhãn $1$. Mọi điểm nhãn $1$ có $\lVert x_i\rVert\le r^*$, nên $\hat r\le r^*$. Điểm nhãn $1$ có $\lVert x_i\rVert\le\hat r$, nên $h_{\hat r}(x_i)=1$. Điểm nhãn $0$ có $\lVert x_i\rVert>r^*\ge\hat r$, nên $h_{\hat r}(x_i)=0$. Do đó $\hat R_S(h_{\hat r})=0$, và $h_{\hat r}$ là một nghiệm ERM.

**Rủi ro.** Vì $\hat r\le r^*$, hàm $h_{\hat r}$ chỉ khác $h_{r^*}$ khi $\hat r<\lVert x\rVert\le r^*$. Đặt $g(r)=\mathbb P(r<\lVert X\rVert\le r^*)$ với $0\le r\le r^*$. Khi đó $R(h_{\hat r})=g(\hat r)$, và $g$ không tăng theo $r$.

**Vành có xác suất ít nhất $\varepsilon$.** Nếu $g(0)\le\varepsilon$ thì $R(h_{\hat r})=g(\hat r)\le g(0)\le\varepsilon$ với mọi mẫu. Ngược lại, đặt $t=\inf\{r\in[0,r^*]:\ g(r)\le\varepsilon\}$; tập này chứa $r^*$ vì $g(r^*)=0$. Hàm $g(r)=F(r^*)-F(r)$, với $F(r)=\mathbb P(\lVert X\rVert\le r)$ liên tục phải, nên $g$ liên tục phải và $g(t)\le\varepsilon$. Với $r<t$ thì $g(r)>\varepsilon$; cho $r\uparrow t$:
$$
\begin{aligned}
&\mathbb P\bigl(t\le\lVert X\rVert\le r^*\bigr)\\
&\quad=\lim_{r\uparrow t}g(r)\ge\varepsilon .
\end{aligned}
$$

**Biến cố xấu.** Nếu mẫu có một điểm với $t\le\lVert x_i\rVert\le r^*$ thì điểm đó mang nhãn $1$, nên $\hat r\ge t$ và $R(h_{\hat r})=g(\hat r)\le g(t)\le\varepsilon$. Do đó $R(h_{\hat r})>\varepsilon$ chỉ khi không điểm nào trong $n$ điểm i.i.d. rơi vào vành $\{t\le\lVert x\rVert\le r^*\}$:
$$
\begin{aligned}
\mathbb P_S\bigl(R(h_{\hat r})>\varepsilon\bigr)&\le(1-\varepsilon)^n\\
&\le e^{-\varepsilon n}.
\end{aligned}
$$
Dòng thứ hai dùng $1-u\le e^{-u}$.

**Cỡ mẫu.** $e^{-\varepsilon n}\le\delta$ khi và chỉ khi $n\ge\log(1/\delta)/\varepsilon$. Do đó với mọi $n\ge\lceil\log(1/\delta)/\varepsilon\rceil$ và mọi phân phối khả thực, quy tắc trên thỏa (8.1), nên $m_{\mathcal H}(\varepsilon,\delta)\le\lceil\log(1/\delta)/\varepsilon\rceil$. $\square$

**Kiểm tra lại.** Với $\varepsilon=\delta=0{,}05$: $\log20/0{,}05\approx2{,}996/0{,}05\approx59{,}9$, nên $60$ quan sát là đủ. Cận không phụ thuộc phân phối của $\lVert X\rVert$, đúng yêu cầu "mọi $P$" của Định nghĩa 12.17.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 5; so sánh yêu cầu $(\varepsilon,\delta)$ với yêu cầu về kỳ vọng của rủi ro.

::: exercise Bài tập 12.14 (Bảo đảm $(\varepsilon,\delta)$ và rủi ro kỳ vọng tiến về $0$; Shalev-Shwartz và Ben-David, Bài 4.1, tr. 58–59)
Cho một quy tắc học $S\mapsto\hat h_S$, một phân phối $P$ và một mất mát nhận giá trị trong $[0,1]$. Chứng minh hai mệnh đề sau tương đương:

1. với mọi $\varepsilon,\delta>0$, tồn tại $N(\varepsilon,\delta)$ sao cho với mọi $n\ge N(\varepsilon,\delta)$,
$$
\mathbb P_{S\sim P^n}\bigl(R(\hat h_S)>\varepsilon\bigr)<\delta ;
$$
2. $\displaystyle\lim_{n\to\infty}\mathbb E_{S\sim P^n}\bigl[R(\hat h_S)\bigr]=0$.
:::

::: hint Gợi ý
Chiều 1 ⇒ 2: tách kỳ vọng theo biến cố $\{R(\hat h_S)\le\varepsilon\}$ và dùng $R\le1$. Chiều 2 ⇒ 1: dùng bất đẳng thức Markov cho biến không âm $R(\hat h_S)$.
:::

::: solution Lời giải Bài tập 12.14
**Chiều 1 ⇒ 2.** Vì mất mát thuộc $[0,1]$, $0\le R(\hat h_S)\le1$. Tách kỳ vọng theo biến cố $E=\{R(\hat h_S)>\varepsilon\}$:
$$
\begin{aligned}
\mathbb E_S\bigl[R(\hat h_S)\bigr]&\le\varepsilon\,\mathbb P_S(E^c)\\
&\quad+1\cdot\mathbb P_S(E)\\
&\le\varepsilon+\mathbb P_S(E).
\end{aligned}
$$
Cho $\gamma>0$. Lấy $\varepsilon=\delta=\gamma/2$; với $n\ge N(\gamma/2,\gamma/2)$, mệnh đề 1 cho $\mathbb P_S(E)<\gamma/2$, nên $0\le\mathbb E_S[R(\hat h_S)]<\gamma$. Vì $\gamma$ tùy ý, kỳ vọng tiến về $0$.

**Chiều 2 ⇒ 1.** Cho $\varepsilon,\delta>0$. Theo mệnh đề 2, có $N$ sao cho $\mathbb E_S[R(\hat h_S)]<\varepsilon\delta$ với mọi $n\ge N$. Bất đẳng thức Markov cho biến không âm $R(\hat h_S)$ cho
$$
\begin{aligned}
\mathbb P_S\bigl(R(\hat h_S)>\varepsilon\bigr)&\le\frac{\mathbb E_S[R(\hat h_S)]}{\varepsilon}\\
&<\delta .
\end{aligned}
$$
Đặt $N(\varepsilon,\delta)=N$. $\square$

**Ý nghĩa.** Với một phân phối $P$ cố định, yêu cầu $(\varepsilon,\delta)$ và yêu cầu kỳ vọng rủi ro tiến về $0$ là một. Cỡ mẫu $N(\varepsilon,\delta)$ ở đây được phép phụ thuộc $P$; Định nghĩa 12.17 đòi thêm một cỡ mẫu chung cho mọi phân phối.

**Kiểm tra lại.** Nếu $\mathbb E_S[R(\hat h_S)]=0{,}01$ và $\varepsilon=0{,}05$, Markov cho $\mathbb P_S(R(\hat h_S)>0{,}05)\le0{,}2$. Ngược lại, nếu $\mathbb P_S(E)<0{,}05$ với $\varepsilon=0{,}05$, thì $\mathbb E_S[R(\hat h_S)]<0{,}1$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 6; xác định bảo đảm còn lại khi các quan sát độc lập nhưng không cùng phân phối, trái giả thiết (G1).

::: exercise Bài tập 12.15 (Mẫu độc lập nhưng không cùng phân phối; Shalev-Shwartz và Ben-David, Bài 3.5, tr. 51–52)
Cho $\mathcal X$ là một miền, $D_1,\ldots,D_n$ là các phân phối trên $\mathcal X$, $\mathcal H$ là lớp hữu hạn gồm $M$ bộ phân loại nhị phân và $f\in\mathcal H$. Mẫu $S$ gồm $n$ quan sát: đầu vào $X_i\sim D_i$, các $X_i$ độc lập, và nhãn $Y_i=f(X_i)$. Đặt $\bar D_n=(D_1+\cdots+D_n)/n$ là phân phối trung bình, và
$$
\begin{aligned}
&R_{\bar D_n}(h)\\
&\quad=\mathbb P_{X\sim\bar D_n}\bigl(h(X)\ne f(X)\bigr).
\end{aligned}
$$
Cố định $\varepsilon\in(0,1)$. Chứng minh
$$
\begin{aligned}
\mathbb P\bigl(&\exists h\in\mathcal H:\ R_{\bar D_n}(h)>\varepsilon\\
&\text{và}\ \hat R_S(h)=0\bigr)\le Me^{-\varepsilon n}.
\end{aligned}
$$
:::

::: hint Gợi ý
Cố định $h$ với $R_{\bar D_n}(h)>\varepsilon$, viết $\mathbb P(\hat R_S(h)=0)$ thành tích của $n$ thừa số, rồi dùng bất đẳng thức giữa trung bình nhân và trung bình cộng.
:::

::: solution Lời giải Bài tập 12.15
**Rủi ro dưới phân phối trung bình.** Đặt $R_i(h)=\mathbb P_{X\sim D_i}(h(X)\ne f(X))$. Phân phối $\bar D_n$ là trung bình của các $D_i$, nên
$$
R_{\bar D_n}(h)=\frac1n\sum_{i=1}^nR_i(h).
$$

**Một hàm cố định.** Cho $h\in\mathcal H$ với $R_{\bar D_n}(h)>\varepsilon$. Biến cố $\hat R_S(h)=0$ nghĩa là $h(X_i)=f(X_i)$ với mọi $i$. Các $X_i$ độc lập, nên
$$
\begin{aligned}
&\mathbb P\bigl(\hat R_S(h)=0\bigr)=\prod_{i=1}^n\bigl(1-R_i(h)\bigr)\\
&\quad\le\Bigl(\frac1n\sum_{i=1}^n\bigl(1-R_i(h)\bigr)\Bigr)^n\\
&\quad=\bigl(1-R_{\bar D_n}(h)\bigr)^n\\
&\quad<(1-\varepsilon)^n\le e^{-\varepsilon n}.
\end{aligned}
$$
Dòng thứ hai là bất đẳng thức giữa trung bình nhân và trung bình cộng cho $n$ số không âm $1-R_i(h)$, dòng cuối dùng $1-u\le e^{-u}$.

**Hợp trên lớp.** Biến cố cần chặn là hợp của các biến cố $\{\hat R_S(h)=0\}$ lấy trên những $h$ có $R_{\bar D_n}(h)>\varepsilon$; có không quá $M$ hàm như vậy. Bất đẳng thức hợp (Định lý 12.13, Bước 3) cho xác suất không quá $Me^{-\varepsilon n}$. $\square$

**Ý nghĩa.** Khi bỏ yêu cầu cùng phân phối trong (G1), bảo đảm vẫn đúng nhưng chỉ cho rủi ro dưới phân phối trung bình $\bar D_n$ của chính các lần lấy mẫu. Quan sát triển khai theo một phân phối khác $\bar D_n$ nằm ngoài bảo đảm. Trong Tình huống 12.2, mọi $D_i$ là phân phối đều trên $[-1,0]$, nên $\bar D_n$ cũng vậy, còn phân phối triển khai là phân phối đều trên $[0,1]$.

**Kiểm tra lại.** Khi $D_1=\cdots=D_n=D$, ta có $\bar D_n=D$ và cận trở thành $Me^{-\varepsilon n}$ cho mẫu i.i.d.; với $M=100$, $\varepsilon=0{,}05$ và $n=200$, cận bằng $100e^{-10}\approx0{,}0045$.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 6; dùng sai số xấp xỉ và cận sai số ước lượng để chọn lớp giả thuyết theo cỡ mẫu.

::: exercise Bài tập 12.16 (Chọn số đặc trưng cho bộ phân loại hình chữ nhật; Shalev-Shwartz và Ben-David, Bài 5.2, tr. 66)
Cần thiết kế một thuật toán học dự đoán bệnh nhân có bị nhồi máu cơ tim hay không. Các đặc trưng có thể dùng gồm:
- huyết áp (blood pressure, BP);
- chỉ số khối cơ thể (body-mass index, BMI);
- tuổi (A);
- mức hoạt động thể lực (P);
- thu nhập (I).

Có hai thuật toán để chọn. Thuật toán thứ nhất chọn một hình chữ nhật có cạnh song song với các trục trong không gian hai chiều của BP và BMI; thuật toán thứ hai chọn một hình chữ nhật như vậy trong không gian năm chiều của cả năm đặc trưng. Mỗi hình chữ nhật cho nhãn $1$ bên trong và nhãn $0$ bên ngoài.

1. Nêu ưu điểm và nhược điểm của mỗi lựa chọn.
2. Giải thích số mẫu huấn luyện có nhãn ảnh hưởng thế nào đến lựa chọn.
:::

::: hint Gợi ý
Đọc hai lựa chọn qua hai số hạng đầu của (7.8). Số chiều VC của lớp hình chữ nhật có cạnh song song với các trục trong $\mathbb R^k$ bằng $2k$ (Shalev-Shwartz và Ben-David, Bài 6.5, tr. 79).
:::

::: solution Lời giải Bài tập 12.16
Gọi $\mathcal H_2$ và $\mathcal H_5$ là hai lớp hình chữ nhật, mất mát $0$–$1$.

**Sai số xấp xỉ.** Cho $h\in\mathcal H_2$ là hình chữ nhật $B$ trên mặt phẳng (BP, BMI). Với $j=1,2,\ldots$, gọi $h_j\in\mathcal H_5$ là hình chữ nhật $B\times[-j,j]^3$, ba cạnh sau theo A, P, I. Tại mỗi điểm $x$, $h_j(x)=h(x)$ khi $j$ đủ lớn, nên $\mathbf 1_{\{h_j(X)\ne Y\}}\to\mathbf 1_{\{h(X)\ne Y\}}$ trên mọi kết cục. Các hàm chỉ báo này bị chặn bởi $1$, nên định lý hội tụ bị chặn cho $R(h_j)\to R(h)$. Do đó
$$
R_{\mathcal H_5}^*\le\inf_jR(h_j)\le R(h).
$$
Lấy cận dưới đúng theo $h\in\mathcal H_2$ cho $R_{\mathcal H_5}^*\le R_{\mathcal H_2}^*$: sai số xấp xỉ $R_{\mathcal H}^*-R^*$ của lựa chọn năm chiều không lớn hơn.

**Sai số ước lượng.** Theo số chiều VC $2k$, $d_{\mathrm{VC}}(\mathcal H_2)=4$ và $d_{\mathrm{VC}}(\mathcal H_5)=10$. Theo Định lý 12.20, cỡ mẫu đủ để có $\Delta_S\le\varepsilon$ với xác suất ít nhất $1-\delta$ là $c_0(d+\log(1/\delta))/\varepsilon^2$, tăng theo $d$. Với cùng $n$, cận của số hạng $2\Delta_S$ trong (7.8) lớn hơn cho $\mathcal H_5$.

**1. Ưu và nhược điểm.**
- Hai chiều: số chiều VC nhỏ, nên cận sai số ước lượng nhỏ với cùng cỡ mẫu; đổi lại, lớp bỏ qua A, P, I và có sai số xấp xỉ không nhỏ hơn lớp năm chiều.
- Năm chiều: sai số xấp xỉ không lớn hơn; đổi lại, số chiều VC $10$ đòi nhiều mẫu hơn để kiểm soát sai số ước lượng.

**2. Ảnh hưởng của cỡ mẫu.** Khi $n$ nhỏ đến mức chênh lệch giữa cận của $2\Delta_S$ cho hai lớp vượt $R_{\mathcal H_2}^*-R_{\mathcal H_5}^*$, lớp hai chiều có cận rủi ro dư nhỏ hơn. Khi $n$ đủ lớn để cận sai số ước lượng của cả hai lớp nhỏ, số hạng sai số xấp xỉ quyết định, và lớp năm chiều không kém hơn. Ngưỡng chuyển giữa hai chế độ phụ thuộc phân phối chưa biết qua $R_{\mathcal H_2}^*-R_{\mathcal H_5}^*$.

**Kiểm tra lại.** Hai số chiều VC thỏa $4\le10$. Cách đọc này lặp lại Ví dụ 12.11, nơi lớp hằng có sai số xấp xỉ lớn còn lớp mọi hàm đo được có cận sai số ước lượng lớn.
:::

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 6; chỉ ra một lớp giả thuyết quen thuộc chứa hàm ghi nhớ, nên ERM trên lớp đó có thể quá khớp.

::: exercise Bài tập 12.17 (Hàm ghi nhớ là một đa thức lấy ngưỡng; Shalev-Shwartz và Ben-David, Bài 2.1, tr. 41)
Cho tập huấn luyện $S=\{(x_i,f(x_i))\}_{i=1}^n\subseteq\mathbb R^d\times\{0,1\}$, trong đó $f$ là hàm gán nhãn. Hàm ghi nhớ của $S$ là
$$
h_S(x)=\begin{cases}y_i, & x=x_i,\\ 0, & x\notin\{x_1,\ldots,x_n\}\end{cases}
$$
(hàm $g$ của Ví dụ 12.1 là trường hợp $d=1$). Chứng minh có một đa thức $p_S$ theo các tọa độ của $x$ sao cho $h_S(x)=1$ khi và chỉ khi $p_S(x)\ge0$. Suy ra ERM trên lớp mọi đa thức lấy ngưỡng $\{x\mapsto\mathbf 1_{\{p(x)\ge0\}}:\ p\ \text{là đa thức}\}$ có thể chọn hàm ghi nhớ và quá khớp.
:::

::: hint Gợi ý
Lấy $p_S$ là âm của tích các bình phương khoảng cách từ $x$ tới các điểm mang nhãn $1$.
:::

::: solution Lời giải Bài tập 12.17
**Tập điểm mang nhãn $1$.** Vì $y_i=f(x_i)$, hai lần xuất hiện của cùng một điểm có cùng nhãn, nên $h_S$ xác định. Gọi $I_1=\{i:\ y_i=1\}$. Khi đó $h_S(x)=1$ khi và chỉ khi $x=x_i$ với một $i\in I_1$.

**Đa thức.** Nếu $I_1=\varnothing$ thì $h_S\equiv0$, và $p_S\equiv-1$ thỏa yêu cầu. Nếu $I_1\ne\varnothing$, đặt
$$
p_S(x)=-\prod_{i\in I_1}\lVert x-x_i\rVert^2 .
$$
Mỗi thừa số $\lVert x-x_i\rVert^2=\sum_{j=1}^d(x_j-x_{ij})^2$ là đa thức bậc $2$ theo các tọa độ của $x$, nên $p_S$ là đa thức bậc $2\lvert I_1\rvert$. Mỗi thừa số không âm, nên $p_S(x)\le0$ với mọi $x$. Do đó
$$
\begin{aligned}
&p_S(x)\ge0\\
&\iff p_S(x)=0\\
&\iff \exists\,i\in I_1:\ x=x_i\\
&\iff h_S(x)=1 .
\end{aligned}
$$
Dòng thứ hai dùng: tích bằng $0$ khi và chỉ khi có một thừa số bằng $0$, và $\lVert x-x_i\rVert=0$ khi và chỉ khi $x=x_i$. $\square$

**Quá khớp.** Với mọi mẫu $S$, $h_S=\mathbf 1_{\{p_S\ge0\}}$ thuộc lớp các đa thức lấy ngưỡng và có $\hat R_S(h_S)=0$, nên $h_S$ là một nghiệm ERM của lớp này. Trên ví dụ cảm biến, hàm $g=h_S$ có $R(g)=\frac12$ (Tình huống 12.1). Theo (7.8), lớp này có sai số xấp xỉ $0$ vì chứa $h_0=\mathbf 1_{\{x\ge0\}}$, và toàn bộ rủi ro dư $\frac12$ của $g$ là sai số ước lượng.

**Kiểm tra lại.** Với dữ liệu của Ví dụ 12.1, $I_1$ gồm hai điểm $0{,}3$ và $0{,}7$, nên $p_S(x)=-(x-0{,}3)^2(x-0{,}7)^2$. Ta có $p_S(0{,}3)=0$, nên nhãn $1$; và $p_S(0)=-0{,}09\cdot0{,}49=-0{,}0441<0$, nên nhãn $0$, đúng với $g$.
:::

## Tài liệu tham khảo

- Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả:
  - mục Exercises của Chương 10: Bài 10.1 (tr. 367–368), 10.3 (tr. 368–369);
  - mục Exercises của Chương 11: Bài 11.1 (tr. 411), 11.3 (tr. 412).
- Shalev-Shwartz, Shai; Ben-David, Shai (2014), *Understanding Machine Learning: From Theory to Algorithms*, Cambridge University Press:
  - mục Exercises của Chương 2: Bài 2.1 (tr. 41);
  - mục Exercises của Chương 3: Bài 3.1 (tr. 50), 3.3 (tr. 51), 3.5 (tr. 51–52);
  - mục Exercises của Chương 4: Bài 4.1 (tr. 58–59), 4.2 (tr. 59);
  - mục Exercises của Chương 5: Bài 5.2 (tr. 66);
  - mục Exercises của Chương 6: Bài 6.1 (tr. 78), 6.5 (tr. 79, số chiều VC của lớp hình chữ nhật), 6.9 (tr. 80);
  - mục Exercises của Chương 9: Bài 9.2 (tr. 128).
