# Bài tập Bài 05 — Không gian đặc trưng nhiều chiều

Bộ bài tập gồm mười hai bài theo bốn mạch của chương: hồi quy nhiều chiều (Bài 1–3), hồi quy logistic và chính quy hóa (Bài 4–7), độ cong và chi phí tính toán (Bài 8–9), giới hạn của tối ưu tất định (Bài 10–12). Mức độ của từng bài ghi ở đầu bài: nhận biết, tính toán hoặc chứng minh, vận dụng vào AI. Bài 1, 4 và 8 là ba bài tập trên trang chiếu có lời giải mẫu ngay trên trang chiếu; ở đây lời giải được viết đầy đủ hơn và kèm số hiệu. Bài 10 là bài tự kiểm tra ở mạch kết luận, trên trang chiếu chỉ có đề; câu 3 trên trang chiếu là bản rút gọn của câu 3 ở đây. Bài 7 và Bài 5 là hai bài tập về nhà nêu ở trang "Tài liệu đọc và bài tập về nhà" cuối bộ trang chiếu.

Ký hiệu và số hiệu theo ghi chú bài giảng. Tên ngắn trên trang chiếu ứng với số hiệu như sau: Mệnh đề 1 là Mệnh đề 05.10; Mệnh đề 2 là Mệnh đề 05.21; Định lý 1 là Định lý 05.22; Mệnh đề 3 là Mệnh đề 05.24; Định lý 2 là Định lý 05.26; Mệnh đề 4 là Mệnh đề 05.28; Định lý 3 là Định lý 05.30; Định lý 4 là Định lý 05.33; Mệnh đề 5 là Mệnh đề 05.35. Hai ví dụ dùng chung:

- Ví dụ năm mẫu: $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$, đặc trưng $(1,u,\ldots,u^{d-1})$, mất mát $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$ với $n=5$; tập xác thực bốn điểm $u'=\pm\tfrac14,\pm\tfrac34$ với nhãn $u'$ không nhiễu.
- Ví dụ một mẫu: $x_1=1$, $y_1=+1$, $F_\lambda(w)=\log(1+e^{-w})+\frac\lambda2w^2$, $L=\tfrac14+\lambda$, $\mu=\lambda$.

Lời giải cần nêu giả thiết được dùng ở từng bước. Số thập phân viết với dấu phẩy; $\log$ là logarit tự nhiên. Viết tắt: chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), sai số bình phương trung bình (MSE), hạ gradient ngẫu nhiên (SGD).

## Bài 1. Hạng, nghiệm và chọn số đặc trưng

Mức độ: nhận biết. LLO11, CLO1.

::: exercise Bài 1
Ví dụ năm mẫu có đầu vào $u=(-1,-\tfrac12,0,\tfrac12,1)$, nhãn $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$ và đặc trưng đa thức $(1,u,\ldots,u^{d-1})$.

1. Với $d=7$, tính $\operatorname{rank}X$, $\dim\ker X$ và $\min F$.
2. Với $d=3$, ma trận $X^TX=\begin{pmatrix}5&0&\frac52\\0&\frac52&0\\\frac52&0&\frac{17}8\end{pmatrix}$. Tính $\kappa(X^TX)$ và so với $\kappa=2$ của $d=2$.
3. Ba mô hình có sai số xác thực (MSE trên bốn điểm $u=\pm\tfrac14,\pm\tfrac34$) như sau. Chọn một mô hình và nêu tập dùng để báo cáo sai số cuối.

| mô hình | $d=2$, $\lambda=0$ | $d=5$, $\lambda=0{,}01$ | $d=5$, $\lambda=0$ |
|---|---:|---:|---:|
| sai số xác thực | $0{,}000125$ | $0{,}00261$ | $0{,}0487$ |
:::

::: hint Gợi ý Bài 1
Ở câu 1, năm cột đầu của $X\in\mathbb R^{5\times7}$ tạo một ma trận Vandermonde. Ở câu 2, phần tử $(j,k)$ của $X^TX$ là $\sum_iu_i^{j+k}$, và các tổng lũy thừa lẻ bằng $0$ vì các nút đối xứng quanh $0$; vì vậy cột thứ hai tách riêng, còn trị riêng của khối $2\times2$ gồm hàng và cột thứ nhất, thứ ba tìm được từ vết và định thức. Ở câu 3, so sai số xác thực trên toàn họ mô hình, chứ không so sai số huấn luyện; tập đã dùng để chọn không dùng để báo cáo.
:::

::: solution Lời giải Bài 1
1. Năm cột đầu của $X$ là ma trận Vandermonde dựng trên năm nút phân biệt, nên khả nghịch; do đó năm hàng của $X$ độc lập tuyến tính và $\operatorname{rank}X=5$. Định lý hạng–số chiều cho $\dim\ker X=7-5=2$. Theo Mệnh đề 05.10, $\min F=0$, và tập nghiệm là một không gian affine chiều $2$: có vô số đa thức bậc không quá $6$ đi qua năm điểm, nên nghiệm không duy nhất.

2. Ta có $\sum_i1=5$, $\sum_iu_i^2=\tfrac52$ và $\sum_iu_i^4=1+\tfrac1{16}+0+\tfrac1{16}+1=\tfrac{17}8$, còn các tổng lũy thừa lẻ bằng $0$; đó là các phần tử của ma trận đã cho. Cột thứ hai chỉ có phần tử chéo $\tfrac52$, nên $\tfrac52$ là một trị riêng. Khối còn lại $\begin{pmatrix}5&\frac52\\\frac52&\frac{17}8\end{pmatrix}$ có vết $\tfrac{57}8$ và định thức $\tfrac{85}8-\tfrac{25}4=\tfrac{35}8$, nên hai trị riêng là nghiệm của $t^2-\tfrac{57}8t+\tfrac{35}8=0$, tức $t=\frac{57\pm\sqrt{2129}}{16}$, xấp xỉ $6{,}446$ và $0{,}679$. Vậy $\lambda_{\max}\approx6{,}446$, $\lambda_{\min}\approx0{,}679$ và $\kappa(X^TX)\approx9{,}50$, lớn hơn $\kappa=2$ của $d=2$. Thêm cột $u^2$ làm $\lambda_{\min}$ giảm từ $2{,}5$ xuống $0{,}679$ và $\lambda_{\max}$ tăng từ $5$ lên $6{,}446$, đúng chiều mà định lý xen kẽ Cauchy bảo đảm (Mệnh đề 05.16). Kiểm tra: tổng ba trị riêng $\tfrac52+\tfrac{57}8=\tfrac{77}8$ bằng vết $5+\tfrac52+\tfrac{17}8$.

3. Chọn $d=2$, $\lambda=0$, mô hình có sai số xác thực nhỏ nhất. Nếu chọn theo sai số huấn luyện sẽ được $d=5$, $\lambda=0$ với sai số huấn luyện bằng $0$, đúng mô hình quá khớp (Định nghĩa 05.6). Sai số cuối được báo cáo trên một tập kiểm thử riêng, không tham gia lựa chọn: $0{,}000125$ là số nhỏ nhất trong ba số, nên theo Nhận xét 05.8 có xu hướng thấp hơn rủi ro của mô hình được chọn.
:::

## Bài 2. Chính quy hóa đường thẳng

Mức độ: tính toán. LLO11, CLO1.

::: exercise Bài 2
Cho ví dụ năm mẫu với $d=2$ và $\lambda=0{,}1$, mục tiêu $F_\lambda(w)=\frac1{10}\lVert Xw-y\rVert^2+\frac\lambda2\lVert w\rVert^2$, trong đó hệ số chặn cũng bị phạt.

1. Lập và giải hệ $\bigl(\frac1nX^TX+\lambda I\bigr)w=\frac1nX^Ty$.
2. Tính MSE huấn luyện, MSE xác thực và số điều kiện của ma trận hệ.
3. So với nghiệm không chính quy hóa $w=(0;\ 0{,}98)$, có MSE huấn luyện $0{,}0198$ và MSE xác thực $0{,}000125$. Giải thích vì sao chính quy hóa làm cả hai sai số tăng trong trường hợp này.
:::

::: hint Gợi ý Bài 2
$\frac1nX^TX=\operatorname{diag}(1;\ 0{,}5)$ và $\frac1nX^Ty=(0;\ 0{,}49)$. Ở câu 2, sai số tại điểm xác thực $u'$ là $(w_1-1)u'$, và trung bình của $u'^2$ bằng $0{,}3125$.
:::

::: solution Lời giải Bài 2
1. Hệ là $\operatorname{diag}(1{,}1;\ 0{,}6)\,w=(0;\ 0{,}49)$, nên $w_0=0$ và $w_1=0{,}49/0{,}6=0{,}8167$.

2. Phần dư $0{,}8167u_i-y_i$ tại năm mẫu là

   $$
   \begin{aligned}
   &(0{,}0833;\ 0{,}2917;\ -0{,}2;\\
   &\ \ 0{,}0083;\ -0{,}1833),
   \end{aligned}
   $$

   có tổng bình phương $0{,}1657$, nên MSE huấn luyện $\approx0{,}0331$. Sai số xác thực là $(0{,}8167-1)u'=-0{,}1833u'$, nên MSE xác thực $=0{,}1833^2\cdot0{,}3125\approx0{,}0105$. Ma trận hệ có trị riêng $1{,}1$ và $0{,}6$, nên $\kappa=1{,}83$, nhỏ hơn $\kappa=2$ khi $\lambda=0$ (Mệnh đề 05.17).

3. Với $d=2$, mô hình đã đúng dạng với quan hệ thật $y=u$, nghiệm không chính quy hóa duy nhất và $\kappa=2$ nhỏ. Số hạng phạt kéo $w_1$ về $0$, xa giá trị đúng $1$, nên sai số xác thực tăng gần $84$ lần. Chính quy hóa có lợi khi mô hình quá lớn so với dữ liệu, như $d=5$ trong Ví dụ 05.9, không phải khi mô hình đã vừa. Đây là lý do $\lambda$ phải được chọn trên tập xác thực, với $\lambda=0$ nằm trong danh sách ứng viên.
:::

## Bài 3. Tập xác thực có nhiễu và thiên lệch khi chọn

Mức độ: chứng minh. LLO11, CLO1.

::: exercise Bài 3
Giả sử nhãn sinh theo $y=u+\varepsilon$, với nhiễu $\varepsilon$ độc lập với $u$, $\mathbb E\varepsilon=0$, $\operatorname{Var}\varepsilon=s^2$.

1. Cho $w$ cố định và một tập xác thực $n_{\rm xt}$ điểm $u'_1,\ldots,u'_{n_{\rm xt}}$ cố định với nhãn có nhiễu $y'_j=u'_j+\varepsilon'_j$, các $\varepsilon'_j$ độc lập, cùng phân phối với $\varepsilon$, và độc lập với $w$. Chứng minh

$$
\mathbb E\Bigl[\frac1{n_{\rm xt}}\sum_{j=1}^{n_{\rm xt}}(x_j'^Tw-y'_j)^2\Bigr]=\frac1{n_{\rm xt}}\sum_{j=1}^{n_{\rm xt}}(x_j'^Tw-u'_j)^2+s^2 .
$$

2. Suy ra: nếu hai tham số $w^{(1)}$, $w^{(2)}$ cố định có MSE trên các nhãn không nhiễu thỏa $a_1<a_2$, thì kỳ vọng của MSE trên nhãn có nhiễu giữ nguyên thứ tự.
3. Hai mô hình có cùng rủi ro $R$. Sai số xác thực của mỗi mô hình nhận giá trị $R-\delta$ hoặc $R+\delta$ với xác suất $\tfrac12$, độc lập giữa hai mô hình, $\delta>0$. Tính kỳ vọng của sai số xác thực nhỏ nhất, và nêu kết luận về việc báo cáo con số này.
:::

::: hint Gợi ý Bài 3
Ở câu 1, khai triển $(x_j'^Tw-u'_j-\varepsilon'_j)^2$ và dùng $\mathbb E\varepsilon'_j=0$. Ở câu 3, liệt kê bốn trường hợp đồng khả năng.
:::

::: solution Lời giải Bài 3
1. Đặt $e_j=x_j'^Tw-u'_j$, một số cố định. Khi đó

$$
\begin{aligned}
\mathbb E(e_j-\varepsilon'_j)^2&=e_j^2-2e_j\,\mathbb E\varepsilon'_j+\mathbb E\varepsilon_j'^2&&\text{(a)}\\
&=e_j^2+s^2&&\text{(b)}.
\end{aligned}
$$

Dòng (a) khai triển bình phương với $e_j$ cố định; dòng (b) dùng $\mathbb E\varepsilon'_j=0$ và $\mathbb E\varepsilon_j'^2=\operatorname{Var}\varepsilon'_j=s^2$. Lấy trung bình theo $j$ và dùng tính tuyến tính của kỳ vọng cho đẳng thức cần chứng minh.

2. Theo câu 1, hai kỳ vọng là $a_1+s^2$ và $a_2+s^2$, nên $a_1<a_2$ kéo theo $a_1+s^2<a_2+s^2$. Nhiễu nhãn cộng cùng một hằng số cho mọi mô hình, như Nhận xét 05.9 đã nêu cho rủi ro kỳ vọng; nó làm tăng phương sai của phép so sánh nhưng không đổi thứ tự trung bình.

3. Bốn trường hợp $(R\pm\delta,R\pm\delta)$ đồng khả năng với xác suất $\tfrac14$. Giá trị nhỏ nhất bằng $R+\delta$ chỉ khi cả hai bằng $R+\delta$, và bằng $R-\delta$ trong ba trường hợp còn lại. Do đó

$$
\begin{aligned}
\mathbb E\min&=\tfrac34(R-\delta)+\tfrac14(R+\delta)\\&=R-\tfrac\delta2<R .
\end{aligned}
$$

Sai số xác thực nhỏ nhất đánh giá thấp rủi ro của mô hình được chọn một lượng $\tfrac\delta2$ theo kỳ vọng, dù mỗi sai số xác thực riêng lẻ không chệch. Con số báo cáo phải lấy trên một tập kiểm thử không tham gia lựa chọn.
:::

## Bài 4. Tách được, sự tồn tại cực tiểu và các hằng số

Mức độ: tính toán. LLO11, CLO1, CLO2.

::: exercise Bài 4
1. Bốn điểm $u=(-2,-1,1,2)$, nhãn $y=(-1,-1,+1,+1)$, đặc trưng $(1,u)$. Dữ liệu có tách được không; mất mát logistic không chính quy hóa $F$ có điểm cực tiểu không.
2. Cùng $u$, nhãn $y=(-1,+1,-1,+1)$. Trả lời như câu 1.
3. Cho $\lambda=0{,}02$; mỗi $x_i$ gồm tọa độ hằng $1$ và phần đặc trưng có chuẩn không quá $1$. Cho $\mu$, cận trên của $L$ và của $\kappa$, và cận trên của $\lVert w_\lambda\rVert$ của mục tiêu logistic có chính quy hóa.
:::

::: hint Gợi ý Bài 4
Ở câu 1, thử $\bar w=(0,1)$. Ở câu 2, điểm số affine $w_0+w_1u$ đổi dấu nhiều nhất một lần; để kiểm tra giả thiết của Mệnh đề 05.24, viết bốn biên rồi giả sử cả bốn không âm. Ở câu 3, $\lVert x_i\rVert^2\le1+1$, rồi dùng Định lý 05.26 và Mệnh đề 05.28.
:::

::: solution Lời giải Bài 4
1. Với $\bar w=(0,1)$, các biên là $y_iu_i=(2,1,1,2)$, đều dương, nên dữ liệu tách được (Định nghĩa 05.20). Theo Định lý 05.22, $\inf F=0$ không đạt, nên $F$ không có điểm cực tiểu, và mọi dãy làm $F$ về $0$ có chuẩn tiến ra vô cùng. Ví dụ này cho thấy tách được không cần $\operatorname{rank}X=n$: ở đây $d=2<n=4$.

2. Dãy nhãn $-,+,-,+$ đổi dấu ba lần, nên không điểm số affine nào đúng dấu tại cả bốn điểm. Kiểm tra giả thiết của Mệnh đề 05.24: các biên là $m_1=2w_1-w_0$, $m_2=w_0-w_1$, $m_3=-w_0-w_1$, $m_4=w_0+2w_1$. Nếu cả bốn không âm:

- từ $m_2\ge0$ và $m_3\ge0$: $w_1\le w_0\le-w_1$, nên $w_1\le0$;
- từ $m_1\ge0$ và $m_4\ge0$: $-2w_1\le w_0\le2w_1$, nên $w_1\ge0$;
- vậy $w_1=0$, rồi $0\le w_0\le0$ cho $w_0=0$.

Mọi $w\ne0$ có một biên âm, nên theo Mệnh đề 05.24, $F$ cưỡng bức (coercive), tức $F(w)\to+\infty$ khi $\lVert w\rVert\to\infty$ (Định nghĩa 01.37), và có điểm cực tiểu.

3. $\lVert x_i\rVert^2\le2$, tức $r^2=2$. Theo Định lý 05.26 và Mệnh đề 05.28: $\mu=\lambda=0{,}02$; $L\le\tfrac24+0{,}02=0{,}52$; $\kappa\le0{,}52/0{,}02=26$; $\lVert w_\lambda\rVert\le\sqrt{2\log2/0{,}02}=\sqrt{69{,}3}\approx8{,}33$.
:::

## Bài 5. Chứng minh đầy đủ Mệnh đề 05.24

Mức độ: chứng minh. LLO11, CLO1. Bài tập về nhà.

::: exercise Bài 5
Cho mất mát logistic trung bình $F(w)=\frac1n\sum_i\log(1+e^{-m_i(w)})$, $m_i(w)=y_ix_i^Tw$, và giả thiết: với mọi $w\ne0$ tồn tại $i$ với $m_i(w)<0$. Chứng minh đầy đủ rằng $F$ cưỡng bức và có điểm cực tiểu. Có hai cách: dùng hàm $v\mapsto\max_i(-m_i(v))$ trên mặt cầu đơn vị, như chứng minh trong ghi chú bài giảng, hoặc phản chứng bằng dãy. Bài này đi theo cách thứ hai, qua các bước sau.

1. Giả sử có dãy $(w_k)$ với $\lVert w_k\rVert\to\infty$ và $F(w_k)\le C$ với mọi $k$. Chứng minh $-m_i(w_k)\le nC$ với mọi $i$, $k$.
2. Đặt $v_k=w_k/\lVert w_k\rVert$. Chứng minh có dãy con hội tụ về một $v$ với $\lVert v\rVert=1$, và $m_i(v)\ge0$ với mọi $i$.
3. Suy ra mâu thuẫn, và kết luận $F$ có điểm cực tiểu.
:::

::: hint Gợi ý Bài 5
Ở câu 1, mỗi số hạng của $F$ dương, nên $\log(1+e^{-m_i})\le nF$, và $\log(1+e^s)\ge s$. Ở câu 2, mặt cầu đơn vị là tập compact (định lý Bolzano–Weierstrass), và $m_i$ tuyến tính nên $m_i(v_k)=m_i(w_k)/\lVert w_k\rVert$.
:::

::: solution Lời giải Bài 5
1. Mọi số hạng của $F$ dương, nên với mỗi $i$, $\frac1n\log\bigl(1+e^{-m_i(w_k)}\bigr)\le F(w_k)\le C$. Vì $\log(1+e^s)\ge s$ với mọi $s$, ta có $-m_i(w_k)\le\log\bigl(1+e^{-m_i(w_k)}\bigr)\le nC$.

2. Các $v_k$ nằm trên mặt cầu đơn vị, một tập đóng và bị chặn của $\mathbb R^d$. Theo định lý Bolzano–Weierstrass, có dãy con $v_{k_j}\to v$, và $\lVert v\rVert=1$ vì chuẩn liên tục. Vì $m_i$ tuyến tính, $-m_i(v_{k_j})=-m_i(w_{k_j})/\lVert w_{k_j}\rVert\le nC/\lVert w_{k_j}\rVert\to0$. Chuyển qua giới hạn, dùng tính liên tục của $m_i$: $-m_i(v)\le0$, tức $m_i(v)\ge0$ với mọi $i$.

3. $v\ne0$ và mọi biên của $v$ không âm, trái giả thiết. Giả thiết phản chứng của câu 1 là phủ định của tính cưỡng bức: $F$ không cưỡng bức khi và chỉ khi có $C$ và dãy $\lVert w_k\rVert\to\infty$ với $F(w_k)\le C$. Mâu thuẫn vừa nhận được cho thấy với mọi $C$, tập $\{w:\ F(w)\le C\}$ bị chặn, tức $F(w)\to\infty$ khi $\lVert w\rVert\to\infty$. $F$ liên tục, nên Định lý 01.38 cho $F$ có điểm cực tiểu.

So với chứng minh trong ghi chú, cách này không cho hằng số $c$ trong cận $F(w)\ge\frac cn\lVert w\rVert$; nó chỉ cho tính cưỡng bức.
:::

## Bài 6. Trường hợp ranh giới

Mức độ: chứng minh. LLO11, CLO1.

::: exercise Bài 6
Bốn mẫu với đặc trưng $(1,u)$: $(u,y)=(-1,-1)$, $(0,+1)$, $(0,-1)$, $(1,+1)$; hai mẫu tại $u=0$ trùng vector đặc trưng nhưng khác nhãn.

1. Chứng minh dữ liệu không tách được tuyến tính, nhưng có $w\ne0$ với mọi biên không âm. Vì vậy cả Định lý 05.22 lẫn Mệnh đề 05.24 đều không áp dụng.
2. Viết $F(w_0,w_1)$ và chứng minh $F(w)>\tfrac12\log2$ với mọi $w$.
3. Chứng minh $\inf F=\tfrac12\log2$, và kết luận về sự tồn tại điểm cực tiểu.
:::

::: hint Gợi ý Bài 6
Hai mẫu tại $u=0$ có biên $w_0$ và $-w_0$. Với mọi số thực $a$, $\log(1+e^{-a})+\log(1+e^{a})=\log(2+e^a+e^{-a})\ge\log4$. Ở câu 3, xét $w=(0,t)$ với $t\to\infty$.
:::

::: solution Lời giải Bài 6
1. Biên của hai mẫu tại $u=0$ là $w_0$ và $-w_0$; chúng không thể cùng dương, nên dữ liệu không tách được. Với $w=(0,1)$, bốn biên là $1,0,0,1$, đều không âm, nên giả thiết của Mệnh đề 05.24 không thỏa.

2. Các biên là $m_1=w_1-w_0$, $m_2=w_0$, $m_3=-w_0$, $m_4=w_0+w_1$, nên

$$
F(w)=\tfrac14\bigl[\phi(w_1-w_0)+\phi(w_0)+\phi(-w_0)+\phi(w_0+w_1)\bigr],\qquad\phi(m)=\log(1+e^{-m}).
$$

Theo gợi ý, $\phi(w_0)+\phi(-w_0)\ge\log4=2\log2$, và hai số hạng còn lại dương. Vậy $F(w)>\tfrac14\cdot2\log2=\tfrac12\log2$.

3. Với $w=(0,t)$: $F=\tfrac14\bigl[2\phi(t)+2\log2\bigr]=\tfrac12\phi(t)+\tfrac12\log2\to\tfrac12\log2$ khi $t\to\infty$. Kết hợp câu 2, $\inf F=\tfrac12\log2\approx0{,}3466$ và không đạt, nên $F$ không có điểm cực tiểu. Số liệu: $F(0,1)=0{,}5032$, $F(0,5)=0{,}3499$, $F(0,10)=0{,}34660$. Trường hợp ranh giới này giống trường hợp tách được ở chỗ điểm cực tiểu không tồn tại, nhưng cận dưới đúng dương. Số hạng phạt $\lambda>0$ vẫn sửa được bài toán theo Định lý 05.26.
:::

## Bài 7. Cận dưới định lượng của chuẩn nghiệm khi $\lambda\to0$

Mức độ: chứng minh. LLO11, CLO1, CLO2. Bài tập về nhà.

::: exercise Bài 7
Dữ liệu tách được bởi $\bar w$ với $\lVert\bar w\rVert=1$ và biên nhỏ nhất $\gamma=\min_im_i(\bar w)>0$; đặt $r=\max_i\lVert x_i\rVert$. Gọi $w_\lambda$ là điểm cực tiểu của mục tiêu logistic có chính quy hóa $F_\lambda=F+\frac\lambda2\lVert w\rVert^2$, với $0<\lambda<1$.

1. Chứng minh $F(w)\ge\log2\cdot e^{-r\lVert w\rVert}$ với mọi $w$.
2. Chứng minh $F(w_\lambda)\le e^{-t\gamma}+\frac\lambda2t^2$ với mọi $t>0$.
3. Chọn $t=\log(1/\lambda)/\gamma$ để suy ra cận dưới (\*) dưới đây, và kết luận $\lVert w_\lambda\rVert\to\infty$ khi $\lambda\to0$.
4. Áp dụng cho ví dụ một mẫu ($\gamma=r=1$, $\bar w=1$) với $\lambda=0{,}05$ và $\lambda=0{,}0005$, và so với các nghiệm $w_\lambda=2{,}1280$ và $5{,}8342$.

Cận dưới (\*) là

$$
\lVert w_\lambda\rVert\ge\frac1r\log\frac{\log2}{\lambda\bigl(1+\log^2(1/\lambda)/(2\gamma^2)\bigr)} .
$$
:::

::: hint Gợi ý Bài 7
Ở câu 1, mọi biên thỏa $m_i(w)\le\lVert x_i\rVert\lVert w\rVert\le r\lVert w\rVert$ (Cauchy–Schwarz), và hàm lõm $a\mapsto\log(1+a)$ nằm trên dây cung nối $(0,0)$ với $(1,\log2)$. Ở câu 2, so $F_\lambda(w_\lambda)$ với $F_\lambda(t\bar w)$ và dùng $\log(1+a)\le a$.
:::

::: solution Lời giải Bài 7
1. Đặt $s=r\lVert w\rVert\ge0$. Vì $\phi$ giảm và $m_i(w)\le s$, mỗi số hạng thỏa $\phi(m_i(w))\ge\phi(s)$, nên $F(w)\ge\phi(s)=\log(1+e^{-s})$. Với $a=e^{-s}\in(0,1]$, tính lõm cho $\log(1+a)\ge a\log2$. Vậy $F(w)\ge\log2\cdot e^{-r\lVert w\rVert}$.

2. Vì $w_\lambda$ cực tiểu hóa $F_\lambda$ và số hạng phạt không âm,

$$
\begin{aligned}
F(w_\lambda)&\le F_\lambda(w_\lambda)\\
&\le F_\lambda(t\bar w)\\
&=F(t\bar w)+\tfrac\lambda2t^2\lVert\bar w\rVert^2\\
&\le\log\bigl(1+e^{-t\gamma}\bigr)+\tfrac\lambda2t^2&&\text{(a)}\\
&\le e^{-t\gamma}+\tfrac\lambda2t^2&&\text{(b)}.
\end{aligned}
$$

Dòng (a) dùng Bước 2 của chứng minh Định lý 05.22 và $\lVert\bar w\rVert=1$; dòng (b) dùng $\log(1+a)\le a$.

3. Với $t=\log(1/\lambda)/\gamma>0$ (vì $\lambda<1$), $e^{-t\gamma}=\lambda$, và câu 2 cho $F(w_\lambda)\le\lambda\bigl(1+\log^2(1/\lambda)/(2\gamma^2)\bigr)$. Ghép với câu 1:

$$
\log2\cdot e^{-r\lVert w_\lambda\rVert}\le\lambda\Bigl(1+\frac{\log^2(1/\lambda)}{2\gamma^2}\Bigr).
$$

Lấy logarit hai vế và chia cho $r$ cho cận cần chứng minh. Khi $\lambda\to0$, $\lambda\log^2(1/\lambda)\to0$, nên mẫu số dưới dấu logarit tiến về $0$ và vế phải tiến ra vô cùng; cận tăng như $\frac1r\log\frac1\lambda$ trừ một số hạng bậc $\log\log\frac1\lambda$. Đây là phiên bản định lượng của Hệ quả 05.27.

4. Với $\lambda=0{,}05$: $\log(1/\lambda)=2{,}996$, $1+2{,}996^2/2=5{,}488$, nên cận là $\log\bigl(0{,}6931/(0{,}05\cdot5{,}488)\bigr)=\log2{,}526\approx0{,}93\le2{,}128$. Với $\lambda=0{,}0005$: $\log(1/\lambda)=7{,}601$, $1+7{,}601^2/2=29{,}89$, nên cận là $\log\bigl(0{,}6931/0{,}01495\bigr)=\log46{,}37\approx3{,}84\le5{,}834$. Cận đúng nhưng không chặt; nó bắt được tốc độ tăng theo $\log\frac1\lambda$ của nghiệm.
:::

## Bài 8. Chi phí của hai phương pháp và cấu trúc hạng thấp

Mức độ: tính toán. LLO15, LLO11; CLO4, CLO1.

::: exercise Bài 8
1. Cho $F_\lambda(w)=\log(1+e^{-w})+0{,}025w^2$ ($\lambda=0{,}05$) và $w_0=0$. Tính hai bước Newton với bước đầy đủ, và so với nghiệm $w_\lambda=2{,}1280$.
2. Cho $n=10^6$, $d=10^4$, $\kappa=1000$, $e_0/\varepsilon_{\rm tol}=10^8$, $N_{\rm N}=10$. So tổng chi phí của hạ gradient và Newton theo (4.6), (4.7), và tính bộ nhớ của Hessian ở độ chính xác kép.
3. Cho $n=10^4$, $d=10^5$. Tính chi phí một bước Newton khi tận dụng cấu trúc đường chéo cộng hạng thấp của Hessian, và so với $nd^2+d^3$.
:::

::: hint Gợi ý Bài 8
Ở câu 1, $F_\lambda'(w)=-\sigma(-w)+\lambda w$ và $F_\lambda''(w)=\sigma(w)\sigma(-w)+\lambda$. Ở câu 3, dùng Mệnh đề 05.36.
:::

::: solution Lời giải Bài 8
1. Tại $w_0=0$: $F'_\lambda=-0{,}5$, $F''_\lambda=0{,}25+0{,}05=0{,}3$, nên $w_1=0{,}5/0{,}3=1{,}6667$. Tại $w_1$: $F'_\lambda=-0{,}07554$, $F''_\lambda=0{,}18363$, nên $w_2=1{,}6667+0{,}07554/0{,}18363=2{,}0780$. Khoảng cách tới nghiệm giảm từ $2{,}128$ xuống $0{,}461$ rồi $0{,}050$; bước thứ ba cho $2{,}1274$, khoảng cách $0{,}0006$, đúng kiểu hội tụ bậc hai.

2. $\log10^8=18{,}42$. Hạ gradient: $C_{\rm HG}\approx nd\cdot\kappa\log(e_0/\varepsilon_{\rm tol})=10^{10}\cdot1000\cdot18{,}42\approx1{,}84\cdot10^{14}$. Newton: $C_{\rm N}\approx10\cdot(nd^2+d^3)=10\cdot(10^{14}+10^{12})=1{,}01\cdot10^{15}$. Hai cận cùng bậc độ lớn, khoảng $10^{14}$–$10^{15}$; tính cả hằng số của Thuật toán 05.1 và 05.2, chúng là $2nd\cdot1000\cdot18{,}42\approx3{,}7\cdot10^{14}$ và $10\cdot(2nd+nd^2/2+d^3/3)\approx5{,}0\cdot10^{14}$. Theo Ví dụ 05.22, khi hai cận cùng bậc, phép đếm chỉ cho kết luận ở mức bậc độ lớn: hai phương pháp tốn cùng bậc số phép tính, và cận của hạ gradient còn bi quan (Ví dụ 05.19). Hessian cần $8d^2=8\cdot10^8$ byte, tức 800 MB.

3. Theo Mệnh đề 05.36, chi phí là $n^2d+n^3=10^{13}+10^{12}=1{,}1\cdot10^{13}$, so với $nd^2+d^3=10^{14}+10^{15}=1{,}1\cdot10^{15}$: rẻ hơn $100$ lần. Ma trận cần phân tích có kích thước $n\times n$, chiếm $8\cdot10^8$ byte thay cho $8\cdot10^{10}$ byte.
:::

## Bài 9. Số bước bảo đảm trên ví dụ năm mẫu

Mức độ: tính toán. LLO11, LLO15; CLO1, CLO4.

::: exercise Bài 9
Trên ví dụ năm mẫu với $d=5$, mục tiêu bình phương có chính quy hóa có số điều kiện $\kappa=553{,}7$ khi $\lambda=0$ và $\kappa=123{,}2$ khi $\lambda=0{,}01$ (Ví dụ 05.9).

1. Với $e_0/\varepsilon_{\rm tol}=10^6$, tính số bước hạ gradient đủ theo Hệ quả 05.31 cho hai giá trị $\lambda$.
2. Phương pháp Newton cần bao nhiêu bước trên hai mục tiêu này. Giải thích.
3. Với $n=5$, $d=5$, chi phí mỗi bước của hai phương pháp theo bậc là bao nhiêu, và phương pháp nào nên dùng cho bài toán kích thước này.
:::

::: hint Gợi ý Bài 9
Hai mục tiêu là hàm bậc hai; Hessian của chúng không đổi theo $w$.
:::

::: solution Lời giải Bài 9
1. $\log10^6=13{,}82$. Với $\lambda=0$: $553{,}7\cdot13{,}82\approx7650$ bước. Với $\lambda=0{,}01$: $123{,}2\cdot13{,}82\approx1702$ bước. Chính quy hóa giảm số bước bảo đảm khoảng $4{,}5$ lần, cùng tỉ lệ với $\kappa$.

2. Một bước. Với hàm bậc hai $f(w)=\tfrac12w^THw-b^Tw+c$, $H\succ0$, mô hình bậc hai của Newton trùng với $f$, nên bước đầy đủ $w_1=w_0-H^{-1}(Hw_0-b)=H^{-1}b$ là nghiệm, như trong Ví dụ 05.17. Bước đó chính là giải phương trình chuẩn (2.6).

3. Một bước hạ gradient tốn khoảng $nd=25$ phép nhân–cộng, một bước Newton khoảng $nd^2+d^3=250$; Newton một bước rẻ hơn hàng nghìn bước hạ gradient. Với bài toán kích thước này, giải trực tiếp phương trình chuẩn là lựa chọn đúng; hạ gradient chỉ có ý nghĩa ở Ví dụ 05.24 vì các điểm lặp trung gian của nó được dùng để dừng sớm.
:::

## Bài 10. Phân loại với nhiều đặc trưng hơn mẫu

Mức độ: vận dụng vào AI. LLO11, LLO15; CLO1, CLO2, CLO4.

::: exercise Bài 10
Bài toán phân loại hai lớp có $n=200$ mẫu và $d=500$ đặc trưng đa thức.

1. Nêu ba hệ quả đối với mất mát logistic $F$ và mục tiêu có chính quy hóa $F_\lambda$.
2. Nêu phương án tính bước Newton và chi phí của nó.
3. Khi huấn luyện bằng hạ gradient và dừng sớm, bước dừng được chọn bằng tập nào; vì sao sai số trên tập đó không phải ước lượng cuối của rủi ro kỳ vọng.
:::

::: hint Gợi ý Bài 10
$d>n$ nên $\operatorname{rank}X\le200$. Hessian của $F_\lambda$ là $\lambda I$ cộng một ma trận có hạng không quá $n$.
:::

::: solution Lời giải Bài 10
1. Ba hệ quả:

- Nếu $\operatorname{rank}X=200$, mọi cách gán nhãn tách được (Mệnh đề 05.21), nên $F$ không có điểm cực tiểu (Định lý 05.22) và hạ gradient làm chuẩn tham số tăng không bị chặn (Hệ quả 05.23).
- Với $\lambda>0$, $F_\lambda$ lồi mạnh và có đúng một nghiệm với $\lVert w_\lambda\rVert\le\sqrt{2\log2/\lambda}$ (Định lý 05.26).
- Số điều kiện $\kappa\le1+\lambda_{\max}(X^TX)/(800\lambda)$ (Mệnh đề 05.28) tăng theo $1/\lambda$, nên $\lambda$ nhỏ làm hạ gradient chậm.

2. Hessian là $\lambda I+\frac1nX^TSX$ với phần thứ hai có hạng không quá $200$. Theo Mệnh đề 05.36, giải hệ Newton qua một hệ $200\times200$ tốn $O(n^2d+n^3)=2\cdot10^7+8\cdot10^6=2{,}8\cdot10^7$, rẻ hơn hệ $500\times500$ với $nd^2+d^3=5\cdot10^7+1{,}25\cdot10^8=1{,}75\cdot10^8$ khoảng $6$ lần.

3. Bước dừng chọn bằng tập xác thực (Định nghĩa 05.38). Sai số xác thực tại bước được chọn là giá trị nhỏ nhất trên cả quỹ đạo, nên theo Nhận xét 05.8 có xu hướng thấp hơn rủi ro kỳ vọng. Ước lượng cuối lấy trên một tập kiểm thử riêng, không tham gia chọn $\lambda$ hay bước dừng (Mệnh đề 05.7).
:::

## Bài 11. Đặc trưng bình phương trên đầu vào nhị phân

Mức độ: nhận biết. LLO11, CLO2.

::: exercise Bài 11
Cho bốn điểm XOR: $u\in\{0,1\}^2$, nhãn $+1$ tại $(0,1)$ và $(1,0)$, nhãn $-1$ tại $(0,0)$ và $(1,1)$.

1. Với đặc trưng $(1,u_1,u_2,u_1^2,u_2^2)$, chứng minh dữ liệu vẫn không tách được.
2. Với đặc trưng $(1,u_1,u_2,u_1u_2)$, tính $\operatorname{rank}X$ và dùng Mệnh đề 05.21 để kết luận về mọi cách gán nhãn cho bốn điểm này.
3. Với đặc trưng của câu 2, mất mát logistic không chính quy hóa có điểm cực tiểu không.
:::

::: hint Gợi ý Bài 11
Với $u_i\in\{0,1\}$, $u_i^2=u_i$. Ở câu 2, ma trận $X$ là $4\times4$.
:::

::: solution Lời giải Bài 11
1. Tại bốn điểm, $u_1^2=u_1$ và $u_2^2=u_2$, nên điểm số $w_0+w_1u_1+w_2u_2+w_3u_1^2+w_4u_2^2$ bằng $w_0+(w_1+w_3)u_1+(w_2+w_4)u_2$, một hàm affine theo $u$. Theo Mệnh đề 05.40, không hàm affine nào đúng dấu tại cả bốn điểm. Các cột $u_i^2$ trùng cột $u_i$, nên không thêm thông tin.

2. Các hàng của $X$ là $(1,0,0,0)$, $(1,1,0,0)$, $(1,0,1,0)$, $(1,1,1,1)$. Ma trận này tam giác dưới với đường chéo bằng $1$, nên khả nghịch và $\operatorname{rank}X=4=n$. Theo Mệnh đề 05.21, mọi cách gán nhãn trong $2^4=16$ cách cho bốn điểm đều tách được, trong đó có XOR.

3. Không. Dữ liệu tách được, chẳng hạn bởi $\bar w=(-\tfrac12,1,1,-2)$ với mọi biên bằng $\tfrac12$ (Mệnh đề 05.40), nên theo Định lý 05.22, $\inf F=0$ không đạt.
:::

## Bài 12. Dừng sớm với tham số kiên nhẫn

Mức độ: vận dụng vào AI. LLO11, CLO1.

::: exercise Bài 12
Trên ví dụ năm mẫu với $d=5$ và $\lambda=0$, hạ gradient bước $\frac1L$ từ $w_0=0$ được đánh giá trên tập xác thực sau mỗi $25$ bước:

| $k$ | MSE xác thực |
|---:|---:|
| $25$ | $0{,}00573$ |
| $50$ | $0{,}00200$ |
| $75$ | $0{,}00110$ |
| $100$ | $0{,}00134$ |
| $125$ | $0{,}00205$ |
| $150$ | $0{,}00293$ |
| $175$ | $0{,}00388$ |
| $200$ | $0{,}00487$ |

Quy tắc dừng: lưu tham số có sai số xác thực nhỏ nhất đã gặp, và dừng khi sai số xác thực không cải thiện trong $p$ lần đánh giá liên tiếp.

1. Với $p=2$, xác định bước dừng và tham số được trả về.
2. Tính tỉ số số lượt qua dữ liệu so với việc chạy tới khi MSE huấn luyện dưới $10^{-6}$, tức $2701$ bước.
3. Giải thích vì sao $p$ lớn hơn an toàn hơn khi đường xác thực có nhiễu, và chi phí của lựa chọn đó.
:::

::: hint Gợi ý Bài 12
Đếm số lần đánh giá liên tiếp không nhỏ hơn giá trị tốt nhất. Mỗi bước hạ gradient tốn một lượt qua dữ liệu.
:::

::: solution Lời giải Bài 12
1. Giá trị tốt nhất giảm tới $0{,}00110$ tại $k=75$. Tại $k=100$ ($0{,}00134$) và $k=125$ ($0{,}00205$), không cải thiện hai lần liên tiếp, nên thuật toán dừng tại $k=125$ và trả về $w_{75}$. Theo Ví dụ 05.24, cực tiểu chính xác của đường xác thực nằm ở $k=79$ với $0{,}00108$; đánh giá mỗi $25$ bước chỉ thấy $k=75$.

2. $125$ bước so với $2701$ bước: ít hơn khoảng $21{,}6$ lần số lượt qua dữ liệu, và sai số xác thực của tham số trả về, $0{,}00110$, nhỏ hơn giới hạn $0{,}0487$ của nghiệm chính xác khoảng $44$ lần.

3. Khi tập xác thực nhỏ hoặc nhãn có nhiễu, đường xác thực có thể tăng tạm thời rồi giảm lại; $p$ nhỏ khi đó dừng quá sớm. $p$ lớn chống lại điều này, đổi lại phải chạy thêm $p$ lần đánh giá, tức $25p$ bước, sau điểm tốt nhất. Giá trị xác thực tốt nhất vẫn là giá trị nhỏ nhất trên quỹ đạo, nên báo cáo cuối lấy trên tập kiểm thử (Nhận xét 05.8).
:::

## Nguồn

- Ghi chú bài giảng Bài 05 (các số hiệu `05.k`); Bài 01 (Định lý 01.38), Bài 05b, Bài 05c.
- Ian Goodfellow, Yoshua Bengio và Aaron Courville (2016), *Deep Learning*, MIT Press, mục 5.2, 6.1, 7.3, 7.8 (Thuật toán 7.1, tham số kiên nhẫn).
- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press, mục 9.5.3, 9.7.2.
- Léon Bottou và Olivier Bousquet (2011), "The Tradeoffs of Large-Scale Learning", trong *Optimization for Machine Learning*, MIT Press, chương 13.

Mọi số liệu là số liệu sư phạm tự xây dựng và được tính lại từ dữ kiện của đề.
