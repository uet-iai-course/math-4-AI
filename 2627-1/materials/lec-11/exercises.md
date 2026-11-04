# Bài tập Bài 11 — Học từ dữ liệu qua ước lượng thống kê

Các bài tập dưới đây đi kèm ghi chú Bài 11 và dẫn định nghĩa, định lý, ví dụ theo số hiệu của ghi chú. Ký hiệu theo §2 của ghi chú: $L$ và $\ell$ là hàm hợp lý và log-hợp lý (4.1), $\log$ là logarit tự nhiên, ước lượng hợp lý cực đại viết tắt là MLE. Ba bài đầu dùng trên lớp; năm bài sau dùng để tự học. Các Bài tập 11.4–11.7 được điều chỉnh từ bộ bài tập tuần 2 của học phần.

## Bài tập trên lớp

### Bài tập 11.1 (Nghiệm trong và nghiệm biên của mô hình Bernoulli)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 2; phân biệt nghiệm có điểm dừng bên trong với nghiệm ở đầu mút.

::: exercise Bài tập 11.1
Một mẫu gồm $8$ cờ cảnh báo của $8$ sản phẩm lấy độc lập, trong đó có $2$ cờ bằng $1$. Giả thiết mô hình i.i.d. Bernoulli$(p)$ với $p\in[0,1]$.

**(a)** Viết log-hợp lý, tìm MLE và chứng minh đó là cực đại trên $[0,1]$.

**(b)** Thay mẫu bằng tám cờ đều bằng $0$. Tìm MLE trên $[0,1]$. Có tồn tại MLE trên $(0,1)$ không?
:::

::: hint Gợi ý 1
Phần (a). Tính $\ell'(p)$ trên $(0,1)$ và xét dấu của nó, rồi so sánh với giá trị của $L$ ở hai đầu mút.
:::

::: hint Gợi ý 2
Phần (b). Phương trình $\ell'(p)=0$ không có nghiệm trong $(0,1)$; xét trực tiếp tính đơn điệu của $L(p)=(1-p)^8$.
:::

::: solution Lời giải Bài tập 11.1
**(a)** Với $s=2$ và $n=8$, (5.1) cho $L(p)=p^2(1-p)^6$ và $\ell(p)=2\log p+6\log(1-p)$. Trên $(0,1)$,

$$
\begin{aligned}
\ell'(p)&=\frac2p-\frac6{1-p}\\
&=\frac{2(1-p)-6p}{p(1-p)}\\
&=\frac{2-8p}{p(1-p)}.
\end{aligned}
$$

Đạo hàm dương khi $p<1/4$ và âm khi $p>1/4$, nên $\ell$ tăng chặt trên $(0,1/4]$ và giảm chặt trên $[1/4,1)$. Ở hai đầu mút, $L(0)=L(1)=0<L(1/4)$. Vậy $\hat p=1/4=s/n$ là điểm cực đại duy nhất trên $[0,1]$, đúng Định lý 11.4.

**(b)** Với tám cờ bằng $0$, $L(p)=(1-p)^8$ giảm chặt trên $[0,1]$, nên MLE trên $[0,1]$ là $\hat p=0$. Trên $(0,1)$, với mỗi $p$ luôn có $p'\in(0,p)$ cho $L(p')>L(p)$; hàm hợp lý tiến tới cận trên $1$ khi $p\downarrow0$ mà không đạt cận đó, nên không tồn tại MLE (Nhận xét 11.5).

**Kiểm tra lại.** Tại $p=1/4$, tử số $2-8p$ bằng $0$. Một lỗi thường gặp ở phần (b) là giải $\ell'(p)=0$, không thấy nghiệm, rồi kết luận không có MLE trên $[0,1]$; nghiệm nằm ở đầu mút $p=0$.
:::

### Bài tập 11.2 (Nhân tử Lagrange trên một mặt của đơn hình)

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; xử lý nhóm vắng mặt mà không chia cho $0$.

::: exercise Bài tập 11.2
Ba nhóm có số đếm $(n_1,n_2,n_3)=(4,0,6)$ trong $n=10$ quan sát i.i.d. $\operatorname{Cat}(\pi)$, $\pi\in\Delta_2$.

**(a)** Chứng minh mọi điểm cực đại của hàm hợp lý có $\pi_2=0$, không dùng điều kiện dừng theo $\pi_2$.

**(b)** Dùng nhân tử Lagrange với ràng buộc $\pi_1+\pi_3=1$ để tìm MLE, và chứng minh nghiệm tìm được là cực đại.

**(c)** Tính tỉ số hợp lý giữa MLE và $\pi=(0{,}3;\ 0{,}1;\ 0{,}6)$.

**(d)** Tính xác suất thế tham số để hai quan sát mới đều thuộc nhóm $3$, và nêu giả thiết cần cho phép tính đó.
:::

::: hint Gợi ý 1
Phần (a). Đặt $m=\pi_1+\pi_3$. Nếu $m<1$, chuẩn hóa hai tọa độ đã thấy lên tổng bằng $1$ và so sánh hai hàm hợp lý.
:::

::: hint Gợi ý 2
Phần (b). Hàm $F(\pi_1,\pi_3)=-4\log\pi_1-6\log\pi_3$ lồi trên tập mở $\{\pi_1>0,\pi_3>0\}$; dùng Mệnh đề 04.2(b).
:::

::: solution Lời giải Bài tập 11.2
**(a)** Hàm hợp lý là $L(\pi)=\pi_1^4\pi_3^6$, vì $n_2=0$. Một điểm cực đại có hợp lý dương, nên $\pi_1>0$, $\pi_3>0$ và $m=\pi_1+\pi_3\in(0,1]$. Nếu $m<1$, đặt $\pi'=(\pi_1/m,\ 0,\ \pi_3/m)\in\Delta_2$. Khi đó

$$
\begin{aligned}
L(\pi')&=\frac{\pi_1^4}{m^4}\cdot\frac{\pi_3^6}{m^6}\\
&=m^{-10}L(\pi)\\
&>L(\pi),
\end{aligned}
$$

vì $m^{-10}>1$. Vậy điểm cực đại phải có $m=1$, tức $\pi_2=1-m=0$.

**(b)** Trên mặt $\pi_2=0$, cần cực tiểu $F(\pi_1,\pi_3)=-4\log\pi_1-6\log\pi_3$ với ràng buộc $\pi_1+\pi_3=1$. Hàm Lagrange (Định nghĩa 03.4) là $\mathcal L=-4\log\pi_1-6\log\pi_3+\nu(\pi_1+\pi_3-1)$. Điều kiện dừng cho $4/\pi_1=\nu$ và $6/\pi_3=\nu$; cộng $\pi_1=4/\nu$ và $\pi_3=6/\nu$ rồi dùng ràng buộc được $10/\nu=1$, tức $\nu=10$. Vậy $\hat\pi=(0{,}4;\ 0;\ 0{,}6)$.

Hàm $F$ lồi, khả vi hai lần liên tục trên tập mở lồi $\{\pi_1>0,\pi_3>0\}$, vì $-\log$ lồi; ma trận ràng buộc $A=(1,1)$ có hàng khác $0$. Theo Mệnh đề 04.2(b), điểm thỏa hệ Lagrange là nghiệm của bài toán trên mặt. Kết hợp với phần (a), $\hat\pi$ là cực đại trên toàn $\Delta_2$, đúng Định lý 11.7.

**(c)** Hai vector có cùng $\pi_3=0{,}6$, nên

$$
\begin{aligned}
\frac{L(\hat\pi)}{L(0{,}3;\,0{,}1;\,0{,}6)}&=\frac{0{,}4^4\cdot0{,}6^6}{0{,}3^4\cdot0{,}6^6}\\
&=\Bigl(\frac43\Bigr)^4\\
&=\frac{256}{81}\approx3{,}16.
\end{aligned}
$$

**(d)** Thay $\hat\pi$ vào mô hình: $\hat\pi_3^2=0{,}6^2=0{,}36$. Phép tính dùng hai giả thiết: hai quan sát mới có cùng phân phối $\operatorname{Cat}(\hat\pi)$ với mô hình đã khớp, và chúng độc lập với nhau.

**Kiểm tra lại.** Điều kiện dừng đúng tại $\hat\pi$: $4/0{,}4=6/0{,}6=10=n$. Phần (c) cho thấy dành khối lượng $0{,}1$ cho nhóm vắng mặt làm hợp lý giảm hơn ba lần.
:::

### Bài tập 11.3 (Hình học Gaussian theo hướng riêng)

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 5; đọc trị riêng thành bán trục và so sánh hai khoảng cách.

::: exercise Bài tập 11.3
Cho Gaussian hai chiều có trung bình $\mu=(0,0)^\top$ và ma trận hiệp phương sai $\Sigma=\begin{pmatrix}5&4\\4&5\end{pmatrix}$.

**(a)** Tìm trị riêng, vector riêng đơn vị và bán trục của ellipse $d_\Sigma^2(x,\mu)=1$.

**(b)** So sánh bình phương khoảng cách Euclid và bình phương khoảng cách Mahalanobis tới $\mu$ của $a=(3,1)^\top$ và $b=(1,-1)^\top$.

**(c)** Tính tỉ số mật độ $f_{\mu,\Sigma}(a)/f_{\mu,\Sigma}(b)$. Giải thích bằng hướng phân tán vì sao tỉ số hai bình phương khoảng cách Mahalanobis nhỏ hơn nhiều so với tỉ số hai bình phương khoảng cách Euclid.
:::

::: hint Gợi ý 1
Thử các vector $(1,1)^\top$ và $(1,-1)^\top$, rồi chuẩn hóa chúng trước khi chiếu.
:::

::: hint Gợi ý 2
Dùng (8.9): chiếu độ lệch lên từng vector riêng đơn vị, bình phương, rồi chia cho trị riêng tương ứng.
:::

::: solution Lời giải Bài tập 11.3
**(a)** Ta có $\Sigma(1,1)^\top=(9,9)^\top$ và $\Sigma(1,-1)^\top=(1,-1)^\top$. Vậy $\lambda_+=9$ với $u_+=(1,1)^\top/\sqrt2$, và $\lambda_-=1$ với $u_-=(1,-1)^\top/\sqrt2$. Theo Mệnh đề 11.17(b), ellipse $d_\Sigma^2=1$ có bán trục $\sqrt9=3$ theo $u_+$ và $1$ theo $u_-$.

**(b)** Với $a=(3,1)^\top$: $\lVert a\rVert^2=10$, $z_+=(3+1)/\sqrt2=2\sqrt2$ và $z_-=(3-1)/\sqrt2=\sqrt2$, nên theo (8.9)

$$
\begin{aligned}
d_\Sigma^2(a,\mu)&=\frac{(2\sqrt2)^2}9+\frac{(\sqrt2)^2}1\\
&=\frac89+2\\
&=\frac{26}9\approx2{,}89.
\end{aligned}
$$

Với $b=(1,-1)^\top$: $\lVert b\rVert^2=2$, $z_+=0$ và $z_-=2/\sqrt2=\sqrt2$, nên $d_\Sigma^2(b,\mu)=(\sqrt2)^2/1=2$.

**(c)** Hai điểm được đánh giá dưới cùng một Gaussian, nên hệ số chuẩn hóa triệt tiêu và

$$
\begin{aligned}
\frac{f_{\mu,\Sigma}(a)}{f_{\mu,\Sigma}(b)}&=\exp\Bigl[-\frac12\Bigl(\frac{26}9-2\Bigr)\Bigr]\\
&=e^{-4/9}\approx0{,}641.
\end{aligned}
$$

Theo khoảng cách Euclid, $a$ xa tâm gấp $10/2=5$ lần $b$ (tính theo bình phương); theo khoảng cách Mahalanobis, chỉ gấp $(26/9)/2\approx1{,}44$ lần. Trong bình phương độ dài $10$ của $a$, phần $z_+^2=8$ nằm theo hướng có phương sai $9$ nên chỉ đóng góp $8/9$; phần $z_-^2=2$ theo hướng có phương sai $1$ đóng góp đủ $2$, bằng toàn bộ đóng góp của $b$. Mật độ tại $a$ bằng khoảng $64\%$ mật độ tại $b$.

**Kiểm tra lại.** Tổng hai trị riêng là $10=\operatorname{tr}\Sigma$ và tích là $9=25-16=\det\Sigma$. Cũng vậy, $z_+^2+z_-^2$ bằng $8+2=10$ cho $a$ và $2$ cho $b$, đúng bình phương khoảng cách Euclid. Tính trực tiếp bằng $\Sigma^{-1}=\frac19\begin{pmatrix}5&-4\\-4&5\end{pmatrix}$: $\Sigma^{-1}(3,1)^\top=\frac19(11,-7)^\top$, nên $d_\Sigma^2(a,\mu)=\frac19(33-7)=\frac{26}9$; $\Sigma^{-1}(1,-1)^\top=(1,-1)^\top$, nên $d_\Sigma^2(b,\mu)=2$.
:::

## Bài tập tự học

### Bài tập 11.4 (Hợp lý Bernoulli, nghiệm biên và cơ chế lấy mẫu)

**Mức độ:** chứng minh, kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 1, 2; viết hàm hợp lý đúng với cách lấy mẫu và phân biệt hàm hợp lý với hậu nghiệm.

::: exercise Bài tập 11.4
Có $9$ thành công trong $12$ phép thử độc lập cùng phân phối Bernoulli$(p)$, với $p\in[0,1]$.

**(a)** Viết hàm hợp lý và log-hợp lý. Giải thích sự khác nhau giữa việc quan sát chuỗi có thứ tự và việc chỉ quan sát tổng số thành công.

**(b)** Suy ra MLE bằng đạo hàm và chứng minh đó là cực đại toàn cục trên $[0,1]$. Tính tỉ số hợp lý giữa MLE và $p=1/2$.

**(c)** Chứng minh công thức MLE $\hat p=s/n$ cho mọi $s\in\{0,\ldots,n\}$, kể cả mẫu toàn thất bại và mẫu toàn thành công. Phân tích điều gì thay đổi nếu miền tham số là $(0,1)$.

**(d)** Nếu một cờ được chép $12$ lần thay vì thu thập $12$ phép thử độc lập, xác suất của mẫu toàn thành công là bao nhiêu? Giải thích vì sao dùng $p^{12}$ là sai mô hình lấy mẫu.

**(e)** Phân biệt kết luận "tham số này cực đại hóa hợp lý" với kết luận "tham số này có mật độ hậu nghiệm lớn nhất". Minh họa bằng tiên nghiệm đều Beta$(1,1)$ và tiên nghiệm Beta$(2,2)$ trên dữ liệu của bài.
:::

::: hint Gợi ý 1
Phần (a)–(c). Dùng (5.1) và chép lại các bước của Định lý 11.4 cho trường hợp tổng quát. Ở phần (c), trên $(0,1)$, xét riêng hai trường hợp $s=0$ và $s=n$.
:::

::: hint Gợi ý 2
Phần (d). Viết biến cố đồng thời qua biến gốc $Z$: $\{X_1=1,\ldots,X_{12}=1\}=\{Z=1\}$.
:::

::: hint Gợi ý 3
Phần (e). Hậu nghiệm Beta$(\alpha,\beta)$ có mật độ tỉ lệ với $p^{\alpha-1}(1-p)^{\beta-1}$. Khi $\alpha-1$ và $\beta-1$ là số nguyên dương, hàm này có dạng (5.1), nên Định lý 11.4 cho điểm lớn nhất của nó.
:::

::: solution Lời giải Bài tập 11.4
**(a)** Với chuỗi có thứ tự, $s=9$ và $n=12$, (5.1) cho

$$
\begin{aligned}
L(p)&=p^9(1-p)^3,\\
\ell(p)&=9\log p+3\log(1-p).
\end{aligned}
$$

Nếu chỉ quan sát tổng $S=9$, xác suất của dữ liệu là $\binom{12}9p^9(1-p)^3=220\,p^9(1-p)^3$. Hệ số $220$ không phụ thuộc $p$, nên hai hàm hợp lý có cùng tập điểm cực đại.

**(b)** Trên $(0,1)$,

$$
\begin{aligned}
\ell'(p)&=\frac9p-\frac3{1-p}\\
&=\frac{9(1-p)-3p}{p(1-p)}\\
&=\frac{9-12p}{p(1-p)}.
\end{aligned}
$$

Đạo hàm dương khi $p<3/4$ và âm khi $p>3/4$, nên $\ell$ đạt cực đại duy nhất trên $(0,1)$ tại $p=3/4$. Hai đầu mút cho $L(0)=L(1)=0<L(3/4)$, nên $\hat p=3/4$ là cực đại toàn cục trên $[0,1]$. Tỉ số hợp lý là

$$
\begin{aligned}
\frac{L(3/4)}{L(1/2)}&=\frac{(3/4)^9(1/4)^3}{(1/2)^{12}}\\
&=\frac{3^9/4^{12}}{1/2^{12}}\\
&=\frac{3^9}{2^{12}}\\
&=\frac{19683}{4096}\approx4{,}805.
\end{aligned}
$$

**(c)** Xét ba trường hợp.

- $0<s<n$: như phần (b), $\ell'(p)=(s-np)/[p(1-p)]$ đổi dấu từ dương sang âm tại $s/n$, và $L(0)=L(1)=0$ vì $s\ge1$ và $n-s\ge1$. Nghiệm duy nhất là $s/n$.
- $s=0$: $L(p)=(1-p)^n$ giảm chặt trên $[0,1]$, nghiệm duy nhất là $0=s/n$.
- $s=n$: $L(p)=p^n$ tăng chặt trên $[0,1]$, nghiệm duy nhất là $1=s/n$.

Trên miền $(0,1)$, trường hợp $0<s<n$ không đổi vì nghiệm $s/n$ nằm trong khoảng mở. Với $s=0$, $L(p)\uparrow1$ khi $p\downarrow0$ nhưng không đạt cận trên tại điểm nào của $(0,1)$; với $s=n$, $L(p)\uparrow1$ khi $p\uparrow1$, cũng không đạt. Trong hai trường hợp này không tồn tại MLE (Nhận xét 11.5).

**(d)** Nếu $X_1=\cdots=X_{12}=Z$ với $Z\sim\operatorname{Bernoulli}(p)$, thì $\mathbb P(X_1=1,\ldots,X_{12}=1)=\mathbb P(Z=1)=p$. Công thức $p^{12}$ là tích các xác suất biên, chỉ đúng khi $12$ cờ độc lập (Định nghĩa 11.1). Với $0<p<1$, ta có $p^{12}<p$, nên mô hình i.i.d. đánh giá quá thấp xác suất của mẫu toàn thành công. Dưới cơ chế chép, mẫu có $9$ thành công và $3$ thất bại của bài có xác suất $0$.

**(e)** Câu thứ nhất so sánh xác suất của dữ liệu dưới các giá trị $p$; câu thứ hai nói về phân phối của $p$ sau khi quan sát, và cần một tiên nghiệm. Theo mở rộng ở Mục 5 của ghi chú, tiên nghiệm Beta$(a,b)$ cho hậu nghiệm Beta$(a+9,\ b+3)$, với mật độ tỉ lệ với $p^{a+8}(1-p)^{b+2}$. Với $a,b$ nguyên dương, các số mũ là số nguyên, và hàm này có dạng (5.1) với $s=a+8$, $n=a+b+10$; theo Định lý 11.4, điểm lớn nhất của nó là $(a+8)/(a+b+10)$.

- Tiên nghiệm đều Beta$(1,1)$: điểm lớn nhất của hậu nghiệm là $9/12=3/4$, trùng MLE.
- Tiên nghiệm Beta$(2,2)$: điểm lớn nhất của hậu nghiệm là $10/14=5/7\approx0{,}714$, khác MLE $0{,}75$.

**Kiểm tra lại.** Tại $p=3/4$, tử số $9-12p$ bằng $0$. Ở phần (e), Beta$(2,2)$ tương đương cộng thêm một thành công và một thất bại: $(9+1)/(12+2)=5/7$.
:::

### Bài tập 11.5 (Ước lượng phân loại và entropy chéo)

**Mức độ:** chứng minh, tính toán. **Mục tiêu:** mục tiêu học tập 3, 6; dùng nhân tử Lagrange trên đơn hình và nối âm log-hợp lý với entropy chéo.

::: exercise Bài tập 11.5
Một cảm biến có ba trạng thái với số đếm $(3,5,12)$ trong $20$ quan sát i.i.d. $\operatorname{Cat}(\pi)$.

**(a)** Viết bài toán cực đại log-hợp lý trên đơn hình $\Delta_2$ và suy ra MLE bằng nhân tử Lagrange. Kiểm tra điều kiện cực đại và ràng buộc chuẩn hóa.

**(b)** Tính xác suất thế tham số để hai quan sát mới thuộc hai nhóm khác nhau; chỉ ra hai giả thiết cần cho phép tính đó.

**(c)** Thay số đếm bằng $(3,0,17)$. Chứng minh MLE có tọa độ thứ hai bằng $0$ mà không dùng phép chia $0/0$ trong điều kiện dừng, rồi tính MLE.

**(d)** Viết âm log-hợp lý trung bình thành entropy chéo giữa phân phối tần suất và vector tham số. Với MLE của phần (c), tính mất mát âm log-hợp lý của một quan sát kiểm tra thuộc nhóm $2$ và giải thích hậu quả.
:::

::: hint Gợi ý 1
Phần (a). Làm theo Bước 1 và Bước 2 của chứng minh Định lý 11.7 với $\mathcal K_+=\{1,2,3\}$.
:::

::: hint Gợi ý 2
Phần (c). Đặt $m=\pi_1+\pi_3$ và chuẩn hóa như Bài tập 11.2(a); hệ số so sánh là $m^{-20}$.
:::

::: hint Gợi ý 3
Phần (d). Dùng (6.3) và quy ước $-\log0=+\infty$.
:::

::: solution Lời giải Bài tập 11.5
**(a)** Bài toán là cực đại $\ell(\pi)=3\log\pi_1+5\log\pi_2+12\log\pi_3$ trên $\Delta_2$. Mọi số đếm dương, nên điểm có hợp lý dương có mọi $\pi_k>0$. Hàm Lagrange của bài toán cực tiểu $-\ell$ với ràng buộc $\pi_1+\pi_2+\pi_3=1$ là $\mathcal L=-\ell(\pi)+\nu(\pi_1+\pi_2+\pi_3-1)$. Điều kiện dừng cho $n_k/\pi_k=\nu$, tức $\pi_k=n_k/\nu$; cộng lại được $20/\nu=1$, nên $\nu=20$ và

$$
\begin{aligned}
\hat\pi&=\Bigl(\frac3{20},\frac5{20},\frac{12}{20}\Bigr)\\
&=(0{,}15;\ 0{,}25;\ 0{,}6).
\end{aligned}
$$

Để kiểm tra cực đại, với mọi $\pi\in\Delta_2$ có mọi $\pi_k>0$, bất đẳng thức $\log t\le t-1$ cho

$$
\begin{aligned}
\ell(\pi)-\ell(\hat\pi)&=\sum_kn_k\log\frac{\pi_k}{\hat\pi_k}\\
&\le\sum_kn_k\Bigl(\frac{\pi_k}{\hat\pi_k}-1\Bigr)\\
&=\sum_k(20\pi_k-n_k)\\
&=20-20=0,
\end{aligned}
$$

với dấu bằng chỉ khi $\pi=\hat\pi$; các điểm có một $\pi_k=0$ có hợp lý bằng $0$. Đây là Bước 2 và Bước 3 của chứng minh Định lý 11.7.

**(b)** Hai quan sát mới cùng nhóm $k$ với xác suất $\hat\pi_k^2$, nên xác suất thế tham số để chúng thuộc hai nhóm khác nhau là

$$
\begin{aligned}
&1-\sum_{k=1}^3\hat\pi_k^2\\
&=1-(0{,}0225+0{,}0625+0{,}36)\\
&=1-0{,}445\\
&=0{,}555.
\end{aligned}
$$

Hai giả thiết là: hai quan sát mới có phân phối $\operatorname{Cat}(\hat\pi)$, tức cùng chế độ phân phối với dữ liệu và với tham số thay bằng giá trị ước lượng; và hai quan sát mới độc lập với nhau.

**(c)** Hàm hợp lý là $L(\pi)=\pi_1^3\pi_3^{17}$. Một điểm cực đại có $\pi_1,\pi_3>0$ và $m=\pi_1+\pi_3\in(0,1]$. Nếu $m<1$, điểm $\pi'=(\pi_1/m,\ 0,\ \pi_3/m)$ cho $L(\pi')=m^{-20}L(\pi)>L(\pi)$. Vậy điểm cực đại có $m=1$, tức $\pi_2=0$. Trên mặt $\pi_1+\pi_3=1$, điều kiện dừng $3/\pi_1=17/\pi_3=\nu$ cho $\nu=20$, và $\hat\pi=(0{,}15;\ 0;\ 0{,}85)$, đúng (6.2). Theo Mệnh đề 04.2(b), áp dụng cho hàm lồi $-3\log\pi_1-17\log\pi_3$ trên tập mở $\{\pi_1>0,\pi_3>0\}$, điểm dừng này là cực đại trên mặt.

**(d)** Với $q_k=n_k/n$, (6.3) cho

$$
\begin{aligned}
-\frac1n\ell(\pi)&=-\sum_{k:\,q_k>0}q_k\log\pi_k\\
&=H(q)+\mathrm{KL}(q\,\|\,\pi),
\end{aligned}
$$

tức âm log-hợp lý trung bình là entropy chéo giữa $q$ và $\pi$. Với $\hat\pi=(0{,}15;\ 0;\ 0{,}85)$, một quan sát kiểm tra thuộc nhóm $2$ có mất mát $-\log\hat\pi_2=-\log0=+\infty$. Một quan sát như vậy làm entropy chéo trung bình trên tập kiểm tra bằng $+\infty$, dù nhóm $2$ có thể có xác suất thật dương nhưng nhỏ; đây là bài toán số đếm bằng không của Nhận xét 11.8.

**Kiểm tra lại.** Ở phần (a), $3/0{,}15=5/0{,}25=12/0{,}6=20=\nu$ và $0{,}15+0{,}25+0{,}6=1$. Ở phần (b), cộng trực tiếp theo các cặp có thứ tự: $2(0{,}15\cdot0{,}25+0{,}15\cdot0{,}6+0{,}25\cdot0{,}6)=2\cdot0{,}2775=0{,}555$. Ở phần (c), $3/0{,}15=17/0{,}85=20$.
:::

### Bài tập 11.6 (Phương sai hợp lý cực đại và phương sai không chệch)

**Mức độ:** tính toán, chứng minh. **Mục tiêu:** mục tiêu học tập 4; phân biệt hai mẫu số và xác định điều kiện tồn tại nghiệm.

::: exercise Bài tập 11.6
Cho dữ liệu $(1,1,2,4)$, giả thiết i.i.d. $\mathcal N(\mu,v)$ với trung bình và phương sai đều chưa biết.

**(a)** Viết log-hợp lý; suy ra trung bình và phương sai MLE theo các bước của Định lý 11.9, không chỉ thế vào công thức.

**(b)** Tính phương sai không chệch và viết mật độ Gaussian đã khớp bằng MLE. Phân biệt phương sai với độ lệch chuẩn.

**(c)** Chứng minh $\mathbb E[Q_X]=(n-1)\sigma^2$ dưới giả thiết i.i.d. có phương sai hữu hạn. Nêu vì sao chứng minh không cần giả thiết Gaussian.

**(d)** Nếu trung bình thật được biết trước là $0$, tính MLE của phương sai trên cùng dữ liệu. Kiểm tra tính không chệch của bộ ước lượng $\frac1n\sum_iX_i^2$ trong mô hình có trung bình đã biết bằng $0$.

**(e)** Nếu cả bốn quan sát đều bằng $2$, phân tích sự tồn tại MLE trong họ có phương sai dương.
:::

::: hint Gợi ý 1
Phần (a). Dùng đẳng thức (7.3) để tách $\sum_i(x_i-\mu)^2$, rồi xét dấu của đạo hàm theo $v$.
:::

::: hint Gợi ý 2
Phần (d). Giữ trung bình bằng $0$ khi tối ưu; không dùng các sai lệch quanh trung bình mẫu. Với $\mathbb EX_i=0$, ta có $\mathbb E[X_i^2]=\operatorname{Var}X_i$.
:::

::: solution Lời giải Bài tập 11.6
**(a)** Với $n=4$, (7.1) cho $\ell(\mu,v)=-2\log(2\pi)-2\log v-\frac1{2v}\sum_i(x_i-\mu)^2$. Trung bình mẫu là $\bar x=(1+1+2+4)/4=2$; các sai lệch là $(-1,-1,0,2)$, nên $Q=1+1+0+4=6$. Theo (7.3), $\sum_i(x_i-\mu)^2=6+4(\mu-2)^2$, nên với mỗi $v$, $\ell$ lớn nhất duy nhất tại $\mu=2$. Thế $\mu=2$, phần phụ thuộc $v$ là $g(v)=-2\log v-3/v$, với

$$
g'(v)=-\frac2v+\frac3{v^2}=\frac{3-2v}{v^2},
$$

dương khi $v<3/2$ và âm khi $v>3/2$. Vậy $\hat\mu=2$ và $\hat\sigma^2_{\mathrm{MLE}}=3/2=Q/n$.

**(b)** Phương sai không chệch là $Q/(n-1)=6/3=2$. Mật độ đã khớp là

$$
\begin{aligned}
&\hat f(x)\\
&=\frac1{\sqrt{2\pi\cdot3/2}}\exp\Bigl[-\frac{(x-2)^2}{2\cdot3/2}\Bigr]\\
&=\frac1{\sqrt{3\pi}}\exp\Bigl[-\frac{(x-2)^2}3\Bigr].
\end{aligned}
$$

Phương sai $3/2$ có đơn vị bình phương của số đo; độ lệch chuẩn $\sqrt{3/2}\approx1{,}22$ có cùng đơn vị với số đo.

**(c)** Đây là Mệnh đề 11.11. Áp dụng (7.3) cho các giá trị của $X_i$ và $\mu=\mathbb EX_i$: $Q_X=\sum_i(X_i-\mu)^2-n(\bar X-\mu)^2$. Lấy kỳ vọng: $\mathbb E[(X_i-\mu)^2]=\sigma^2$ và, do các $X_i$ độc lập nên không tương quan (Mệnh đề 10.27; Phụ lục B.2 của Bài 10 cho biến có mật độ), Mệnh đề 10.26 và Mệnh đề 10.24 cho $\mathbb E[(\bar X-\mu)^2]=\operatorname{Var}\bar X=n\sigma^2/n^2=\sigma^2/n$. Vì vậy $\mathbb E[Q_X]=n\sigma^2-\sigma^2=(n-1)\sigma^2$. Chứng minh chỉ dùng kỳ vọng, phương sai và tính độc lập, không dùng dạng của mật độ Gaussian.

**(d)** Với $\mu=0$ cố định, $\ell(v)=-2\log(2\pi v)-\frac1{2v}\sum_ix_i^2$, trong đó $\sum_ix_i^2=1+1+4+16=22$. Đạo hàm $\ell'(v)=-2/v+11/v^2=(11-2v)/v^2$ đổi dấu từ dương sang âm tại $v=11/2$, nên MLE là $\hat v=22/4=11/2$. Bộ ước lượng $\frac1n\sum_iX_i^2$ có

$$
\begin{aligned}
\mathbb E\Bigl[\frac1n\sum_{i=1}^nX_i^2\Bigr]&=\frac1n\sum_{i=1}^n\mathbb E[X_i^2]\\
&=\frac1n\cdot n\sigma^2=\sigma^2,
\end{aligned}
$$

vì $\mathbb E[X_i^2]=\operatorname{Var}X_i+(\mathbb EX_i)^2=\sigma^2$. Nó không chệch: khi trung bình đã biết, không có lượng $\sigma^2$ nào bị mất do ước lượng trung bình.

**(e)** Khi mọi $x_i=2$, $Q=0$. Tại $\mu=2$, $\ell(2,v)=-2\log(2\pi v)\to+\infty$ khi $v\downarrow0$. Log-hợp lý không bị chặn trên, nên không tồn tại MLE với $v>0$ (Định lý 11.9). Giá trị $Q/n=0$ không thuộc miền tham số.

**Kiểm tra lại.** Ở phần (a), $Q-n\hat v=6-4\cdot\tfrac32=0$. Ở phần (d), $11/2>3/2$ vì $\sum_ix_i^2=Q+n\bar x^2=6+16=22$: khi trung bình bị ép bằng $0$, các sai lệch đo quanh $0$ lớn hơn các sai lệch đo quanh $\bar x=2$.
:::

### Bài tập 11.7 (Ma trận hiệp phương sai, đường đồng mức và dữ liệu suy biến)

**Mức độ:** tính toán, kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 4, 5; ước lượng ma trận hiệp phương sai, đọc trị riêng thành hình học, kiểm tra điều kiện tồn tại.

::: exercise Bài tập 11.7
Bốn phép đo hai chiều là $(5,2)^\top$, $(-3,-2)^\top$, $(0,2)^\top$, $(2,-2)^\top$. Giả thiết các phép đo độc lập cùng phân phối Gaussian hai chiều.

**(a)** Tính trung bình mẫu và ma trận hiệp phương sai mẫu $S_4$ với mẫu số $n$. Kiểm tra điều kiện tồn tại MLE trong Định lý 11.14.

**(b)** Tính ma trận hiệp phương sai không chệch và giải thích vì sao nó có cùng vector riêng với $S_4$.

**(c)** Tìm các trị riêng và vector riêng đơn vị của $S_4$. Viết phương trình ellipse $d_{S_4}^2(x,\hat\mu)=1$ trong hệ trục riêng, cho hướng và độ dài các bán trục.

**(d)** So sánh bình phương khoảng cách Euclid và bình phương khoảng cách Mahalanobis tới trung bình đã ước lượng của hai quan sát mới $a=(9,4)^\top$ và $b=(-2,6)^\top$. Giải thích kết quả bằng hướng phân tán.

**(e)** Giả sử chỉ có hai phép đo đầu tiên, $(5,2)^\top$ và $(-3,-2)^\top$. Tính $S_2$ và hạng của nó, rồi kết luận về MLE của mô hình Gaussian hai chiều không ràng buộc. Giải thích vì sao kết luận này đúng với mọi cặp hai phép đo trong $\mathbb R^2$. Xét mô hình ràng buộc $\Sigma=\operatorname{diag}(v_1,v_2)$ với $v_1,v_2>0$: tìm MLE trên hai phép đo này và giải thích vì sao đổi sang mô hình đó là thay đổi giả thiết.
:::

::: hint Gợi ý 1
Phần (a). Các vector sai lệch ghép thành hai cặp đối nhau. Kiểm tra $S_4\succ0$ bằng các trị riêng hoặc bằng việc hai vector sai lệch độc lập tuyến tính.
:::

::: hint Gợi ý 2
Phần (c). Tổng hai trị riêng bằng vết, tích bằng định thức. Phần (d): chiếu độ lệch lên từng vector riêng đơn vị rồi dùng (8.9).
:::

::: hint Gợi ý 3
Phần (e). Tìm một vector $w\ne0$ vuông góc với mọi vector sai lệch, rồi dùng (8.4) và Định lý 11.14. Với $\Sigma$ đường chéo, mật độ Gaussian hai chiều tách thành tích của hai mật độ một chiều.
:::

::: solution Lời giải Bài tập 11.7
**(a)** Trung bình mẫu là

$$
\bar x=\frac14\begin{pmatrix}5-3+0+2\\2-2+2-2\end{pmatrix}=\begin{pmatrix}1\\0\end{pmatrix}.
$$

Các vector sai lệch là $(4,2)^\top$, $(-4,-2)^\top$, $(-1,2)^\top$, $(1,-2)^\top$. Hai vector đầu cùng cho tích ngoài $\begin{pmatrix}16&8\\8&4\end{pmatrix}$, hai vector sau cùng cho $\begin{pmatrix}1&-2\\-2&4\end{pmatrix}$. Do đó

$$
\begin{aligned}
S_4&=\frac14\Bigl[2\begin{pmatrix}16&8\\8&4\end{pmatrix}\\
&\qquad+2\begin{pmatrix}1&-2\\-2&4\end{pmatrix}\Bigr]\\
&=\frac14\begin{pmatrix}34&12\\12&16\end{pmatrix}\\
&=\begin{pmatrix}17/2&3\\3&4\end{pmatrix}.
\end{aligned}
$$

Ta có $\det S_4=34-9=25>0$ và $\operatorname{tr}S_4=25/2>0$, nên cả hai trị riêng dương và $S_4\succ0$. Theo Định lý 11.14, MLE tồn tại: $\hat\mu=(1,0)^\top$, $\hat\Sigma=S_4$.

**(b)** Theo (8.7), $S_{n-1}=\frac43S_4=\begin{pmatrix}34/3&4\\4&16/3\end{pmatrix}$. Nếu $S_4u=\lambda u$ thì $\frac43S_4u=\frac43\lambda u$: hai ma trận có cùng vector riêng, và trị riêng của $S_{n-1}$ bằng $\frac43$ lần trị riêng của $S_4$.

**(c)** Hai trị riêng là nghiệm của $\lambda^2-\frac{25}2\lambda+25=0$, tức

$$
\begin{aligned}
\lambda&=\frac{25/2\pm\sqrt{625/4-100}}2\\
&=\frac{25/2\pm15/2}2,
\end{aligned}
$$

cho $\lambda_1=10$ và $\lambda_2=5/2$. Với $\lambda_1=10$: $(17/2-10)w_1+3w_2=0$ cho $w_2=w_1/2$, nên $u_1=(2,1)^\top/\sqrt5$. Với $\lambda_2=5/2$: $6w_1+3w_2=0$ cho $w_2=-2w_1$, nên $u_2=(-1,2)^\top/\sqrt5$. Trong tọa độ riêng $z=U^\top(x-\hat\mu)$, ellipse $d_{S_4}^2(x,\hat\mu)=1$ là

$$
\frac{z_1^2}{10}+\frac{z_2^2}{5/2}=1,
$$

với bán trục $\sqrt{10}\approx3{,}16$ theo hướng $u_1$ và $\sqrt{5/2}\approx1{,}58$ theo hướng $u_2$ (Mệnh đề 11.17).

**(d)** Với $a-\hat\mu=(8,4)^\top$: $\lVert a-\hat\mu\rVert^2=80$, $z_1=(16+4)/\sqrt5=4\sqrt5$, $z_2=(-8+8)/\sqrt5=0$, nên $d_{S_4}^2(a,\hat\mu)=80/10=8$. Với $b-\hat\mu=(-3,6)^\top$: $\lVert b-\hat\mu\rVert^2=45$, $z_1=(-6+6)/\sqrt5=0$, $z_2=(3+12)/\sqrt5=3\sqrt5$, nên $d_{S_4}^2(b,\hat\mu)=45/(5/2)=18$. Điểm $a$ xa tâm hơn theo khoảng cách Euclid nhưng gần hơn theo khoảng cách Mahalanobis, vì độ lệch của $a$ nằm trọn theo hướng có phương sai $10$, còn độ lệch của $b$ nằm trọn theo hướng có phương sai $5/2$.

**(e)** Với hai phép đo $(5,2)^\top$ và $(-3,-2)^\top$, trung bình mẫu là $(1,0)^\top$ và hai vector sai lệch là $(4,2)^\top$, $(-4,-2)^\top$. Do đó

$$
\begin{aligned}
S_2&=\frac12\Bigl[2\begin{pmatrix}16&8\\8&4\end{pmatrix}\Bigr]\\
&=\begin{pmatrix}16&8\\8&4\end{pmatrix},\\
\det S_2&=64-64=0.
\end{aligned}
$$

Vector $w=(1,-2)^\top$ vuông góc với cả hai vector sai lệch, và $S_2w=(16-16,\ 8-8)^\top=0$, nên $S_2$ có hạng $1$. Theo Định lý 11.14, log-hợp lý không bị chặn trên và không có MLE với $\Sigma\succ0$. Kết luận này đúng với mọi cặp phép đo trong $\mathbb R^2$: hai vector sai lệch luôn đối nhau, nên chúng chỉ sinh ra một đường thẳng, đúng cận $\min(d,n-1)=1$ ở sau (8.4).

Với $\Sigma=\operatorname{diag}(v_1,v_2)$, ta có $\det\Sigma=v_1v_2$ và $(x-\mu)^\top\Sigma^{-1}(x-\mu)=(x^{(1)}-\mu_1)^2/v_1+(x^{(2)}-\mu_2)^2/v_2$, nên mật độ là tích hai mật độ $\mathcal N(\mu_1,v_1)$ và $\mathcal N(\mu_2,v_2)$, và log-hợp lý là tổng hai log-hợp lý một chiều. Áp dụng Định lý 11.9 cho từng tọa độ: tọa độ thứ nhất $(5,-3)$ có trung bình $1$ và $Q=16+16=32>0$, nên $\hat v_1=16$; tọa độ thứ hai $(2,-2)$ có trung bình $0$ và $Q=4+4=8>0$, nên $\hat v_2=4$. Vậy MLE trong mô hình đường chéo tồn tại: $\hat\mu=(1,0)^\top$, $\hat\Sigma=\operatorname{diag}(16,4)$. Đây là thay đổi giả thiết vì nó thu hẹp miền tham số về các ma trận đường chéo, tức giả thiết hai số đo độc lập dưới mô hình Gaussian; dữ liệu cho thấy hai số đo cùng tăng, và mô hình đường chéo bỏ qua quan hệ đó.

**Kiểm tra lại.** Ở phần (c), $10+5/2=25/2=\operatorname{tr}S_4$ và $10\cdot5/2=25=\det S_4$. Ở phần (d), tính trực tiếp bằng $S_4^{-1}=\frac1{25}\begin{pmatrix}4&-3\\-3&17/2\end{pmatrix}$: $S_4^{-1}(8,4)^\top=\frac1{25}(20,10)^\top$, nên $d_{S_4}^2(a,\hat\mu)=\frac1{25}(160+40)=8$; $S_4^{-1}(-3,6)^\top=\frac1{25}(-30,60)^\top$, nên $d_{S_4}^2(b,\hat\mu)=\frac1{25}(90+360)=18$.
:::

### Bài tập 11.8 (Mất mát từ mô hình nhiễu có phương sai khác nhau)

**Mức độ:** tính toán, kiểm tra giả thiết. **Mục tiêu:** mục tiêu học tập 6; suy ra hàm mất mát từ giả thiết phân phối và so sánh ước lượng dưới các mô hình khác nhau.

::: exercise Bài tập 11.8
Ba số đo $x=(0,0,9)$ của một đại lượng chưa biết $\mu\in\mathbb R$ thỏa $x_i=\mu+\varepsilon_i$, với các nhiễu độc lập $\varepsilon_i\sim\mathcal N(0,v_i)$. Các phương sai đã biết là $(v_1,v_2,v_3)=(1,1,4)$: số đo thứ ba đến từ một thiết bị kém chính xác hơn.

**(a)** Viết âm log-hợp lý theo $\mu$ và suy ra hàm mất mát cần cực tiểu.

**(b)** Tìm MLE của $\mu$ và chứng minh đó là cực tiểu duy nhất của hàm mất mát.

**(c)** So sánh kết quả với Ví dụ 11.6, nơi cùng dữ liệu cho ước lượng $3$ dưới nhiễu Gaussian cùng phương sai và $0$ dưới nhiễu Laplace. Giải thích vì sao giả thiết về $v_3$ thay đổi ước lượng.
:::

::: hint Gợi ý 1
Phần (a). Các quan sát độc lập nhưng không cùng phân phối; hàm hợp lý vẫn là tích các mật độ $\mathcal N(\mu,v_i)$ tại $x_i$.
:::

::: hint Gợi ý 2
Phần (b). Hàm mất mát là một đa thức bậc hai theo $\mu$ với hệ số bậc hai dương.
:::

::: solution Lời giải Bài tập 11.8
**(a)** Vì các nhiễu độc lập, hàm hợp lý là tích các mật độ $\mathcal N(\mu,v_i)$ tại $x_i$, và

$$
\begin{aligned}
-\ell(\mu)&=\sum_{i=1}^3\Bigl[\frac12\log(2\pi v_i)\\
&\qquad+\frac{(x_i-\mu)^2}{2v_i}\Bigr].
\end{aligned}
$$

Bỏ các số hạng không phụ thuộc $\mu$, hàm mất mát cần cực tiểu là tổng bình phương có trọng số

$$
\begin{aligned}
J(\mu)&=\sum_{i=1}^3\frac{(x_i-\mu)^2}{2v_i}\\
&=\frac{\mu^2}2+\frac{\mu^2}2+\frac{(9-\mu)^2}8.
\end{aligned}
$$

**(b)** Đạo hàm là $J'(\mu)=\sum_i(\mu-x_i)/v_i=\mu+\mu+(\mu-9)/4=\frac94\mu-\frac94$. Phương trình $J'(\mu)=0$ cho $\hat\mu=1$. Vì $J''(\mu)=\sum_i1/v_i=9/4>0$, $J$ là đa thức bậc hai lồi chặt, và $\hat\mu=1$ là cực tiểu duy nhất. Tổng quát, $\hat\mu=\bigl(\sum_ix_i/v_i\bigr)/\bigl(\sum_i1/v_i\bigr)$ là trung bình có trọng số $1/v_i$.

**(c)** Khi ba nhiễu cùng phương sai, Ví dụ 11.6 cho trung bình $3$; dưới nhiễu Laplace, cho trung vị $0$. Ở đây số đo $9$ có trọng số $1/4$, bằng một phần tư trọng số của hai số đo còn lại, nên nó kéo ước lượng lên ít hơn: $\hat\mu=1$ nằm giữa $0$ và $3$. Ba mô hình khác nhau cho ba hàm mất mát và ba ước lượng trên cùng dữ liệu; giả thiết về độ chính xác của từng thiết bị là một phần của mô hình xác suất và quyết định tham số học được.

**Kiểm tra lại.** $J(0)=81/8\approx10{,}13$, $J(1)=\tfrac12+\tfrac12+\tfrac{64}8=9$ và $J(3)=\tfrac92+\tfrac92+\tfrac{36}8=13{,}5$; giá trị nhỏ nhất là $J(1)=9$. Khi $v_1=v_2=v_3$, công thức trung bình có trọng số trở lại trung bình $3$ của Ví dụ 11.6.
:::
