# Bài 05 — Không gian đặc trưng nhiều chiều

Bài 04 giải bài toán không ràng buộc bằng hạ gradient và phương pháp Newton, với số bước theo số điều kiện $\kappa=L/\mu$ (Định lý 04.27) và một pha hội tụ bậc hai (Định lý 04.37). Các ví dụ của Bài 04 có vài biến và vài mẫu. Bài toán học có hai kích thước: số mẫu $n$ và số đặc trưng $d$. Chẳng hạn, trong thí nghiệm phân loại văn bản RCV1 của Bottou và Bousquet (2011), $n=781\,265$ và $d=47\,152$. Câu hỏi trung tâm của Bài 05 là: **với mô hình tuyến tính theo đặc trưng và mất mát lồi, điều gì thay đổi khi $d$ tăng so với $n$: điểm cực tiểu của mất mát huấn luyện có tồn tại và duy nhất không, nó dự đoán ra sao trên dữ liệu mới, và tính nó tốn bao nhiêu phép tính.** Để trả lời, chúng ta xây dựng bốn nhóm đối tượng, bao gồm:

- rủi ro thực nghiệm, rủi ro kỳ vọng, tập xác thực và chế độ nội suy của bình phương nhỏ nhất;
- tính tách được tuyến tính, sự tồn tại điểm cực tiểu của mất mát logistic và chính quy hóa bậc hai;
- số bước và chi phí một bước của hạ gradient và phương pháp Newton theo $n$, $d$, $\kappa$;
- dừng sớm, hai giới hạn của khung tất định và các bảo đảm còn lại.

## Câu hỏi mở đầu

Cho năm mẫu $u=(-1,-\tfrac12,0,\tfrac12,1)$ với nhãn $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$ và mô hình đa thức bậc bốn $w_0+w_1u+\cdots+w_4u^4$. Hạ gradient với bước cố định $\eta=1/L$, trong đó $L\approx1{,}5715$ là hằng số Lipschitz của gradient, xuất phát từ $w=0$, cực tiểu hóa sai số bình phương trung bình (mean squared error, MSE) trên năm mẫu này. Sau $79$ bước, MSE huấn luyện bằng $0{,}0147$; sau $1000$ bước, nó bằng $0{,}00047$, và dãy lặp tiếp tục tiến tới đa thức đi qua đúng năm mẫu.

**Câu hỏi.** Tại bốn điểm mới $u=\pm\tfrac14,\pm\tfrac34$, với nhãn đúng bằng chính $u$, điểm lặp ở bước $79$ hay điểm lặp ở bước $1000$ dự đoán chính xác hơn?

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Giải phương trình chuẩn của hồi quy bình phương nhỏ nhất với đặc trưng đa thức, xác định hạng, tập nghiệm, nghiệm chuẩn nhỏ nhất và số điều kiện, và chọn mô hình trên tập xác thực rồi báo cáo sai số trên tập kiểm thử.
2. Chứng minh mất mát logistic không có điểm cực tiểu trên dữ liệu tách được tuyến tính, nêu một điều kiện đủ cho sự tồn tại điểm cực tiểu, chứng minh mục tiêu có chính quy hóa bậc hai lồi mạnh và tính các hằng số độ cong của nó.
3. Đếm chi phí một bước của hạ gradient và của phương pháp Newton cho hồi quy logistic có chính quy hóa, đổi các định lý hội tụ của Bài 04 thành số bước, và so tổng chi phí của hai phương pháp theo số mẫu, số đặc trưng và số điều kiện.
4. Áp dụng dừng sớm như một quy tắc chọn trên tập xác thực, giải thích nó bằng hạ gradient theo hướng riêng, và nêu hai giới hạn của khung tất định cùng các bảo đảm còn lại khi rời khung đó.

## Kiến thức tiên quyết

Bài 05 dùng các kết quả sau của Bài 00, 01, 02, 04 và hai bài bổ trợ 05b, 05c.

- **Bình phương nhỏ nhất** (Mệnh đề 00.45, Định lý 00.22, Hệ quả 01.5). Với $X\in\mathbb R^{n\times d}$, $y\in\mathbb R^n$ và $f(w)=\tfrac12\lVert Xw-y\rVert^2$, $\nabla f(w)=X^T(Xw-y)$ và $\nabla^2f=X^TX$. Phương trình chuẩn $X^TXw=X^Ty$ luôn có nghiệm, và $Xw$ là hình chiếu trực giao của $y$ lên không gian cột của $X$; nếu $w^*$ là một nghiệm thì tập nghiệm là $\{w^*+v\mid v\in\ker X\}$; nghiệm duy nhất khi và chỉ khi $\operatorname{rank}X=d$.
- **Hồi quy với chính quy hóa bậc hai** (quadratic regularization, $\ell_2$ regularization; còn gọi là hồi quy ridge, ridge regression) (Mệnh đề 02.21(c)). Với $\lambda>0$, bài toán bình phương nhỏ nhất cộng số hạng phạt (penalty term) $\lambda\lVert w\rVert^2$ có đúng một nghiệm với mọi $X$.
- **Mất mát logistic** (Định nghĩa 01.7, Mệnh đề 01.8). Với biên có dấu $m$, mất mát $\phi(m)=\log(1+e^{-m})$ dương, giảm chặt, $\phi'(m)=-1/(1+e^{m})\in(-1,0)$, $\phi''(m)\in(0,\tfrac14]$ đạt $\tfrac14$ tại $m=0$, và $\phi(m)\to0$ khi $m\to+\infty$. Bài 01 và Bài 04 viết $\ell$ cho hàm này; ở đây chúng ta viết $\phi$ để dành $\ell$ cho mất mát của một mẫu.
- **Sự tồn tại và tính duy nhất của điểm cực tiểu** (Định lý 01.34, 01.35, Định nghĩa 01.37, Định lý 01.38, Hệ quả 01.41, Nhận xét 01.43, Mệnh đề 01.46).
  - Hàm lồi chặt có nhiều nhất một điểm cực tiểu; hàm liên tục trên tập không rỗng, đóng, bị chặn đạt giá trị nhỏ nhất (Weierstrass).
  - Hàm liên tục và *cưỡng bức* (coercive) trên $\mathbb R^d$, tức $f(w)\to+\infty$ khi $\lVert w\rVert\to\infty$, đạt giá trị nhỏ nhất.
  - Hàm khả vi lồi mạnh có đúng một điểm cực tiểu; tính lồi chặt không bảo đảm sự tồn tại điểm cực tiểu.
  - Hồi quy logistic có chính quy hóa bậc hai có đúng một nghiệm với mọi dữ liệu.
- **Gradient Lipschitz và lồi mạnh** (Định nghĩa 01.39, Nhận xét 01.40, Định nghĩa 04.18, Nhận xét 04.20, Mệnh đề 04.26). Hàm $f$ lớp $C^2$ lồi mạnh với hằng số $\mu>0$ khi và chỉ khi $\nabla^2f\succeq\mu I$; nếu $\lVert\nabla^2f(w)\rVert\le L$ tại mọi $w$ thì gradient $L$-Lipschitz. Với $f$ khả vi lồi mạnh, $f(y)\ge f(x)+\nabla f(x)^T(y-x)+\tfrac\mu2\lVert y-x\rVert^2$ với mọi $x,y$.
- **Hạ gradient trên hàm lồi mạnh** (Định lý 04.27). Nếu $f$ có gradient $L$-Lipschitz và lồi mạnh với hằng số $\mu$, dãy $w_{k+1}=w_k-\tfrac1L\nabla f(w_k)$ thỏa $f(w_k)-f^*\le(1-\mu/L)^k\bigl(f(w_0)-f^*\bigr)$, nên $f(w_k)-f^*\le\varepsilon_{\rm tol}$ khi $k\ge\kappa\log\bigl((f(w_0)-f^*)/\varepsilon_{\rm tol}\bigr)$.
- **Hạ gradient khi không có điểm cực tiểu** (Hệ quả 05b.17). Nếu $f$ lồi và có gradient $L$-Lipschitz thì dãy hạ gradient với bước hằng $0<\eta\le\tfrac1L$ có $f(w_k)\to\inf f$, kể cả khi $\inf f$ không đạt.
- **Phương pháp Newton** (Định nghĩa 04.29, 04.31, 04.35, Mệnh đề 04.32, Thuật toán 04.34, Định lý 04.37). Hướng Newton tại $w$ là nghiệm $p$ của $\nabla^2f(w)\,p=-\nabla f(w)$; *độ giảm Newton* (Newton decrement) là $\delta_N(w)=\sqrt{-\nabla f(w)^Tp}$, và $\tfrac12\delta_N^2$ là mức giảm của mô hình bậc hai. Với quay lui Armijo, phương pháp có một pha tắt dần và một pha hội tụ bậc hai. Bài 04 viết hướng Newton là $d$ và rút gọn độ giảm Newton $\delta_N$ thành $\delta$; ở đây $d$ là số đặc trưng và $\delta$ chỉ nhiễu ($\delta y$, $\delta w$), nên chúng ta viết $p$ và $\delta_N$.
- **Trung bình mẫu tại tham số cố định** (Định lý 05c.52). Nếu các quan sát độc lập, cùng phân phối và tham số được chọn trước khi nhìn các quan sát đó thì trung bình mất mát là ước lượng không chệch của kỳ vọng mất mát.
- **Đại số tuyến tính** (Mệnh đề 00.8, 00.18, Hệ quả 00.19, Mệnh đề 00.20, Định nghĩa 00.26, 00.27).
  - Định lý hạng–số chiều: $\operatorname{rank}X+\dim\ker X=d$.
  - Với ma trận đối xứng $A$, trị riêng lớn nhất và nhỏ nhất là giá trị lớn nhất và nhỏ nhất của thương Rayleigh $v^TAv/v^Tv$ trên $v\ne0$; $\lVert Av\rVert\le\lambda_{\max}(A)\lVert v\rVert$ khi $A\succeq0$.
  - Ma trận Gram $X^TX$ nửa xác định dương, và $X^TX\succ0$ khi và chỉ khi $\operatorname{rank}X=d$.
  - Phân rã giá trị kỳ dị và giả nghịch đảo.

**Câu hỏi ôn nhanh.**

1. Cho $X\in\mathbb R^{3\times2}$ có cột thứ nhất $(1,1,1)^T$ và cột thứ hai $(-1,0,1)^T$. Tính $X^TX$ và $\operatorname{rank}X$.
2. Với $\phi(m)=\log(1+e^{-m})$ và $\sigma(z)=1/(1+e^{-z})$, tính $\phi'(m)$, $\phi''(m)$ và giá trị lớn nhất của $\phi''$.
3. Hàm $f$ lồi mạnh với $\mu=1$ và có gradient $10$-Lipschitz. Theo Định lý 04.27, xác định số bước hạ gradient bước $\tfrac1{10}$ đủ để $f(w_k)-f^*\le10^{-6}\bigl(f(w_0)-f^*\bigr)$.

::: hint Lời giải câu hỏi ôn nhanh
1. Các phần tử của $X^TX$ là tích vô hướng của hai cột: $X^TX=\operatorname{diag}(3,2)$, khả nghịch, nên $\operatorname{rank}X=2$.
2. $\phi'(m)=-\frac{e^{-m}}{1+e^{-m}}=-\sigma(-m)$ và $\phi''(m)=\sigma(m)\sigma(-m)$. Với $s=\sigma(m)$, $\phi''=s(1-s)\le\tfrac14$, dấu bằng tại $s=\tfrac12$, tức $m=0$.
3. $\kappa=10$ và $k\ge\kappa\log10^6=10\cdot13{,}82=138{,}2$, nên $139$ bước là đủ. Kiểm tra: $\log10^6=6\log10=6\cdot2{,}3026=13{,}82$.
:::

## 1. Thiết lập bài toán

Khi $n$ và $d$ lớn, khung của Bài 04 gặp hai vấn đề, bao gồm:

- **Chi phí.** Một gradient đầy đủ của mất mát trung bình trên $n$ mẫu tốn bậc $nd$ phép nhân–cộng, còn một bước Newton tốn bậc $nd^2+d^3$. Với một ngân sách tính toán cố định, số lần cập nhật làm được vì vậy giảm theo $1/n$. Khi $n=10^6$ và $d=10^4$, một bước Newton với Hessian dày đặc (dense) tốn khoảng $10^{14}$ phép nhân–cộng, và riêng việc lưu Hessian ($8d^2$ byte ở độ chính xác kép) cần 800 MB.
- **Đích của việc tối ưu.** Mất mát huấn luyện $F$ là đại lượng thay thế cho sai số trên dữ liệu mới, gọi là rủi ro kỳ vọng. Điểm cực tiểu chính xác của $F$ có thể dự đoán kém trên dữ liệu mới, và có thể không tồn tại. Khi đó, yêu cầu thuật toán hội tụ chính xác tới điểm cực tiểu của $F$ không còn là yêu cầu đúng.

Mọi bài toán của Bài 05 dùng chung một lớp mô hình. Một mẫu gồm đầu vào thô $u$, chẳng hạn một số thực, và một nhãn $y$. Đầu vào được biến đổi thành một vector đặc trưng $x=\varphi(u)\in\mathbb R^d$ bằng một *ánh xạ đặc trưng* (feature map) $\varphi$ cố định do người lập mô hình chọn, và dự đoán là tổ hợp tuyến tính $x^Tw$ của các đặc trưng. Hệ số chặn (intercept, bias) được gộp vào $w$ bằng cách đặt tọa độ đầu của $x$ bằng $1$; khi đó tọa độ $w_0$ của $w$ là hệ số chặn.

::: definition Định nghĩa 05.1 (Bài toán học với mô hình tuyến tính theo đặc trưng)
Cho $n$ mẫu $(u_i,y_i)$, $i=1,\ldots,n$, và ánh xạ đặc trưng $\varphi$ với $x_i=\varphi(u_i)\in\mathbb R^d$ có tọa độ đầu bằng $1$.

**Ma trận thiết kế.** *Ma trận thiết kế* (design matrix) $X\in\mathbb R^{n\times d}$ có hàng thứ $i$ là $x_i^T$.

**Mất mát của một mẫu.** Với tham số $w\in\mathbb R^d$,

- mất mát bình phương (hồi quy, $y_i\in\mathbb R$): $\ell_i(w)=\tfrac12(x_i^Tw-y_i)^2$;
- mất mát logistic (phân loại, $y_i\in\{-1,+1\}$): $\ell_i(w)=\log\bigl(1+e^{-y_ix_i^Tw}\bigr)$.

**Rủi ro thực nghiệm** (còn gọi là mất mát huấn luyện). $F(w)=\frac1n\sum_{i=1}^n\ell_i(w)$.

**Bài toán học.** Cực tiểu hóa $F$ trên $\mathbb R^d$, hoặc cực tiểu hóa mục tiêu có chính quy hóa $F_\lambda(w)=F(w)+\frac\lambda2\lVert w\rVert^2$ với $\lambda>0$ cho trước.
:::

Số hạng phạt chứa cả hệ số chặn $w_0$. Với mất mát bình phương, $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$; với mất mát logistic, $F$ là trung bình của $\phi(m_i)$ với biên có dấu $m_i=y_ix_i^Tw$. Hai mất mát đều lồi và khả vi hai lần theo $w$, vì chúng là hợp của một hàm lồi một biến với ánh xạ tuyến tính $w\mapsto x_i^Tw$.

Mô hình tuyến tính theo $w$ nhưng không nhất thiết tuyến tính theo $u$. Chẳng hạn, với $\varphi(u)=(1,u,u^2)$, dự đoán $w_0+w_1u+w_2u^2$ là một parabol theo $u$. Toàn bộ tính phi tuyến theo đầu vào nằm trong $\varphi$, được chọn trước khi học.

So với Bài 01, Định nghĩa 05.1 dùng mất mát trung bình thay cho mất mát tổng. Nhân hàm mục tiêu với hằng số dương $1/n$ không đổi điểm cực tiểu, nhưng đổi các hằng số $L$ và $\mu$ đi một thừa số $1/n$. Các bài lân cận dùng ký hiệu khác cho cùng đối tượng, như nhận xét sau ghi lại.

::: remark Nhận xét 05.2 (Đổi ký hiệu giữa các bài)
Các phép đổi ký hiệu gồm:

- **Bài 01** viết $a_i$ cho vector đặc trưng và $\mu$ cho hệ số chính quy hóa của mất mát tổng. Mất mát tổng $\sum_i\ell_i+\frac\mu2\lVert w\rVert^2$ chia cho $n$ cho $F_\lambda$ với $\lambda=\mu/n$, nên hai mẫu của Tình huống 01.1 ứng với $\lambda=\mu/2$. Ở Bài 05, $\mu$ luôn là hằng số lồi mạnh.
- **Bài 04** viết $N$ cho số mẫu, $n$ cho số biến và $J$ cho mất mát tổng có số hạng phạt. Ở đây $n$ là số mẫu, $d$ là số đặc trưng, $F_\lambda=J/N$, và $\lambda$ bằng hệ số chính quy hóa của Bài 04 chia cho $N$; $L$, $\mu$, $\kappa$, $L_H$ cùng nghĩa.
- **Bài 05b và 05c** viết $N$ cho kích thước mẫu, $\sigma^2$ cho chặn phương sai của gradient ngẫu nhiên và $b$ cho kích thước lô nhỏ; dãy lặp là $x_k$ ở Bài 05b, tham số là $\theta$ và rủi ro thực nghiệm là $J$ ở Bài 05c. Ở đây viết $n$, $w_k$, $w$, $F$, $\tau^2$, giữ $b$, và dành $\sigma$ không chỉ số cho hàm sigmoid.
:::

**Trong học máy.** Lớp mô hình của Định nghĩa 05.1 bao gồm hồi quy tuyến tính, hồi quy đa thức, hồi quy logistic, và mọi mô hình tuyến tính trên đặc trưng thủ công (hand-crafted features) như túi từ (bag of words) hoặc tần suất từ – nghịch đảo tần suất văn bản (term frequency–inverse document frequency, TF-IDF) trong phân loại văn bản.

Như vậy, lớp mô hình đã cố định, nhưng còn để mở việc chọn $\varphi$, tức chọn số đặc trưng $d$. Chúng ta xét lựa chọn đó trước hết trên hồi quy bình phương nhỏ nhất, nơi nghiệm luôn tồn tại và có công thức đóng.

## 2. Ký hiệu và giả thiết

Vô hướng và vector viết chữ thường, ma trận chữ hoa, không in đậm; chuẩn là chuẩn Euclid; $\log$ là logarit tự nhiên. Ký hiệu chỉ dùng trong một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $n$, $d$ | kích thước mẫu huấn luyện; số đặc trưng, kể cả tọa độ hằng | số nguyên dương |
| $u_i$, $y_i$, $d_0$ | đầu vào thô và nhãn của mẫu $i$; số chiều của đầu vào thô | $u_i\in\mathbb R^{d_0}$; $y_i\in\mathbb R$ hoặc $\{-1,+1\}$ |
| $\varphi$, $x_i=\varphi(u_i)$ | ánh xạ đặc trưng (feature map); vector đặc trưng, tọa độ đầu bằng $1$ | $x_i\in\mathbb R^d$ |
| $X$ | ma trận thiết kế (design matrix), hàng thứ $i$ là $x_i^T$ | $\mathbb R^{n\times d}$ |
| $w$, $w_k$ | tham số, với hệ số chặn là tọa độ $w_0$; điểm lặp thứ $k$ (điểm đầu viết $w_0$ khi $w\in\mathbb R$, khi $w$ không có tọa độ chặn, hoặc trong phát biểu cho hàm $f$ tổng quát; ngược lại viết "từ $w=0$" hoặc "điểm đầu") | $\mathbb R^d$ |
| $\ell_i(w)$, $F(w)$ | mất mát của mẫu $i$; rủi ro thực nghiệm (empirical risk) $F=\frac1n\sum_i\ell_i$ | $\mathbb R^d\to\mathbb R$ |
| $P$, $R(w)$ | phân phối sinh dữ liệu; rủi ro kỳ vọng (expected risk, population risk) $\mathbb E_{(u,y)\sim P}\,\ell(w;u,y)$ | $R:\mathbb R^d\to\mathbb R$ |
| $m_i(w)$; $\bar w$, $\gamma$ | biên có dấu (signed margin) $y_ix_i^Tw$; một vector tách dữ liệu và biên nhỏ nhất $\min_im_i(\bar w)$ của nó | $\mathbb R$; $\mathbb R^d$, $\gamma>0$ |
| $\sigma$, $\phi$ | hàm sigmoid $\sigma(z)=1/(1+e^{-z})$; mất mát logistic $\phi(m)=\log(1+e^{-m})$ | $\mathbb R\to(0,1)$; $\mathbb R\to(0,\infty)$ |
| $S$ | ma trận trọng số $\operatorname{diag}\bigl(\sigma(m_i)\sigma(-m_i)\bigr)$ trong Hessian logistic | $n\times n$, đường chéo |
| $\lambda$, $F_\lambda$, $w_\lambda$ | hệ số chính quy hóa; mục tiêu $F+\frac\lambda2\lVert w\rVert^2$; điểm cực tiểu của nó | $\lambda>0$ |
| $\lambda_{\min}(A)$, $\lambda_{\max}(A)$, $\kappa(A)$ | trị riêng nhỏ nhất, lớn nhất và số điều kiện của ma trận đối xứng nửa xác định dương $A$; luôn viết kèm đối số | $\kappa(A)\in[1,\infty]$ |
| $L$, $\mu$, $\kappa$ | hằng số Lipschitz của gradient (hằng số trơn), hằng số lồi mạnh, số điều kiện $L/\mu$ của hàm mục tiêu | $0<\mu\le L$ |
| $\ker X$, $\operatorname{rank}X$ | hạt nhân và hạng của $X$ | không gian con của $\mathbb R^d$; số nguyên |
| $w_{\rm mn}$ | nghiệm có chuẩn nhỏ nhất của $Xw=y$ khi $\operatorname{rank}X=n$ | $\mathbb R^d$ |
| $\eta$ | độ dài bước của hạ gradient | $\eta>0$ |
| $e_k$, $\varepsilon_{\rm tol}$ | sai số giá trị $f(w_k)-f^*$; độ chính xác đích | $e_k\ge0$, $\varepsilon_{\rm tol}>0$ |
| $\varepsilon$, $\sigma_\varepsilon^2$ | nhiễu nhãn trong mô hình $y=u+\varepsilon$; phương sai của nhiễu | $\mathbb E\varepsilon=0$, $\sigma_\varepsilon^2\ge0$ |
| $s_j$, $v_j$ | trị riêng và vector riêng trực chuẩn của $\frac1nX^TX$, $s_1\le\cdots\le s_d$ | $s_j\ge0$ |
| $r$ | cận trên của $\lVert x_i\rVert$ | $r\ge1$ |
| $L_H$, $p$, $\delta_N$ | hằng số Lipschitz của Hessian; hướng Newton; độ giảm Newton | $L_H>0$; $\delta_N\ge0$ |
| $N_{\rm N}$, $C_{\rm HG}$, $C_{\rm N}$ | số bước Newton; tổng chi phí của hạ gradient và của Newton | phép nhân–cộng |
| $\tau^2$, $b$ | chặn phương sai của nhiễu gradient ngẫu nhiên; kích thước lô nhỏ | $\tau^2\ge0$; $b\ge1$ |

Giả thiết của bài gồm:

- **(G1) Dữ liệu.** $n$ mẫu $(u_i,y_i)$; $x_i=\varphi(u_i)\in\mathbb R^d$ có tọa độ đầu bằng $1$.
- **(G2) Mô hình và mất mát.** Dự đoán $x^Tw$; $\ell_i(w)=\tfrac12(x_i^Tw-y_i)^2$ hoặc $\ell_i(w)=\phi(y_ix_i^Tw)$.
- **(G3) Phân phối.** Mẫu huấn luyện, mẫu xác thực và mẫu kiểm thử được rút độc lập từ cùng một phân phối $P$.
- **(G4) Chính quy hóa.** $\lambda>0$ cố định khi tối ưu và được chọn trên tập xác thực.
- **(G5) Đếm chi phí.** Ma trận dày đặc; đếm số phép nhân–cộng và bỏ hằng số; tích ma trận–vector $Xv$ tốn $nd$ phép nhân–cộng.

(G1), (G2) đủ cho các kết quả về nghiệm của bình phương nhỏ nhất và hồi quy logistic; (G3) cần cho rủi ro kỳ vọng và tập kiểm thử; (G4) cần cho các kết quả về $F_\lambda$; (G5) cần cho phép đếm chi phí.

## 3. Ví dụ xuyên suốt: năm mẫu, ba điểm, một mẫu và RCV1

Ba bộ dữ liệu nhỏ tính tay được và một bộ dữ liệu thật được dùng lại trong bài, bao gồm:

- **Ví dụ năm mẫu (hồi quy).** Đầu vào $u=(-1,-\tfrac12,0,\tfrac12,1)$, nhãn $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$, tức $y_i=u_i+\varepsilon_i$ với $\varepsilon=(0{,}1;\ -0{,}2;\ 0{,}2;\ -0{,}1;\ 0)$ và $\lvert\varepsilon_i\rvert\le0{,}2$. Đặc trưng đa thức $\varphi_d(u)=(1,u,\ldots,u^{d-1})$. Tập xác thực gồm bốn điểm $u'=\pm\tfrac14,\pm\tfrac34$ với nhãn $y'=u'$, dùng để đo dự đoán tại điểm mới.
- **Ví dụ ba điểm (phân loại).** Đầu vào $u=(-1,0,1)$, nhãn $y=(-1,+1,-1)$, với hai bộ đặc trưng $(1,u)$ và $(1,u,u^2)$.
- **Ví dụ một mẫu (phân loại có chính quy hóa).** Một mẫu $x_1=1$, $y_1=+1$, nên $n=d=1$ và $F_\lambda(w)=\log(1+e^{-w})+\tfrac\lambda2w^2$, với $F_\lambda''(w)=\sigma(w)\sigma(-w)+\lambda\in(\lambda,\tfrac14+\lambda]$.
- **Ứng dụng: phân loại văn bản RCV1.** Hồi quy logistic có chính quy hóa trên $n=781\,265$ văn bản với $d=47\,152$ đặc trưng TF-IDF (Bottou và Bousquet 2011).

## 4. Hồi quy nhiều chiều

Với ví dụ năm mẫu, người lập mô hình không biết quan hệ thật $y=u$ và phải chọn một bộ đặc trưng đa thức $(1,u,\ldots,u^{d-1})$. Với $d=2$, mô hình là một đường thẳng; với $d=5$, mô hình là một đa thức bậc $4$ có đúng năm hệ số, bằng số mẫu. Với mỗi $d$ cố định, nghiệm bình phương nhỏ nhất luôn tồn tại (Hệ quả 01.5). Để chọn $d$, chúng ta cần biết nghiệm thay đổi thế nào khi $d$ tiến tới và vượt kích thước mẫu $n=5$, qua ba câu hỏi:

- nghiệm dự đoán thế nào tại điểm mới;
- nghiệm còn duy nhất không;
- nghiệm nhạy thế nào với nhiễu ở nhãn.

### 4.1. Đặc trưng đa thức và ma trận thiết kế

Đặc trưng đa thức với $d$ tọa độ là $\varphi_d(u)=(1,u,u^2,\ldots,u^{d-1})\in\mathbb R^d$. Tăng $d$ thêm một nghĩa là thêm một cột $u^{d}$ vào ma trận thiết kế, và các mô hình với $d$ khác nhau lồng vào nhau: đặt hệ số của cột mới bằng $0$ cho lại đúng mô hình cũ.

::: example Ví dụ 05.1 (Ma trận thiết kế của ví dụ năm mẫu)
**Dữ kiện.** Ví dụ năm mẫu: $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$.

**Hai ma trận thiết kế.** Với $d=2$, hàng thứ $i$ là $(1,u_i)$; với $d=5$, hàng thứ $i$ là $(1,u_i,u_i^2,u_i^3,u_i^4)$:

$$
\begin{gathered}
X_2=\begin{pmatrix}1&-1\\1&-\tfrac12\\1&0\\1&\tfrac12\\1&1\end{pmatrix},\\
X_5=\begin{pmatrix}1&-1&1&-1&1\\1&-\tfrac12&\tfrac14&-\tfrac18&\tfrac1{16}\\1&0&0&0&0\\1&\tfrac12&\tfrac14&\tfrac18&\tfrac1{16}\\1&1&1&1&1\end{pmatrix}.
\end{gathered}
$$

**Tính khả nghịch của $X_5$.** Ma trận $X_5$ vuông $5\times5$, gọi là ma trận Vandermonde dựng trên năm nút $u_i$. Nếu $X_5v=0$ thì đa thức $v_0+v_1u+\cdots+v_4u^4$, bậc không quá $4$, có năm nghiệm phân biệt $u_1,\ldots,u_5$, nên đồng nhất bằng $0$ và $v=0$. Vậy $X_5$ khả nghịch.

**Các tổng dùng về sau.** Các nút đối xứng quanh $0$, nên $\sum_iu_i=\sum_iu_i^3=0$. Ngoài ra $\sum_iu_i^2=1+\tfrac14+0+\tfrac14+1=\tfrac52$, $\sum_iy_i=-0{,}9-0{,}7+0{,}2+0{,}4+1=0$ và

$$
\begin{aligned}
\sum_iu_iy_i&=0{,}9+0{,}35+0\\&\quad+0{,}2+1\\&=2{,}45=\tfrac{49}{20}.
\end{aligned}
$$

**Kiểm tra lại.** Nhiễu $\varepsilon_i=y_i-u_i$ bằng $(0{,}1;\ -0{,}2;\ 0{,}2;\ -0{,}1;\ 0)$ và có tổng $0$, khớp $\sum_iy_i=\sum_iu_i+\sum_i\varepsilon_i=0$.
:::

![Năm mẫu huấn luyện (chấm đặc) tại u = −1; −0,5; 0; 0,5; 1 với y = −0,9; −0,7; 0,2; 0,4; 1,0 nằm quanh đường thật y = u (nét đứt); bốn điểm xác thực (vòng rỗng) tại u = ±0,25 và ±0,75 nằm đúng trên đường y = u.](img/lec-05/hq-data-points.svg)

Năm mẫu huấn luyện thỏa $\lvert y_i-u_i\rvert\le0{,}2$, còn bốn điểm của tập xác thực nằm đúng trên đường $y=u$. Vì quan hệ thật là tuyến tính, mọi đặc trưng từ $u^2$ trở lên chỉ có thể dùng để khớp nhiễu.

### 4.2. Phương trình chuẩn

Với mất mát bình phương, rủi ro thực nghiệm của Định nghĩa 05.1 là $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$. Để tính nghiệm cho từng $d$, chúng ta cần gradient và Hessian của $F$, cho bởi mệnh đề sau.

::: proposition Mệnh đề 05.3 (Gradient, Hessian và phương trình chuẩn của mất mát bình phương) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{n\times d}$, $y\in\mathbb R^n$, $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$.

**Kết luận.**

$$
\begin{aligned}
&\nabla F(w)\\
&\quad=\tfrac1nX^T(Xw-y),\\
&\nabla^2F(w)=\tfrac1nX^TX .
\end{aligned}
\tag{4.1}
$$

Điểm $w$ cực tiểu hóa $F$ khi và chỉ khi nó thỏa *phương trình chuẩn* (normal equations)

$$
X^TXw=X^Ty .
\tag{4.2}
$$

Phương trình (4.2) luôn có nghiệm, và nghiệm duy nhất khi và chỉ khi $\operatorname{rank}X=d$.
:::

::: proof Chứng minh Mệnh đề 05.3
**Lộ trình.** Nhân các kết quả của Bài 00 và Bài 01 cho hàm $\tfrac12\lVert Xw-y\rVert^2$ với hằng số $\tfrac1n$.

**Bước 1 (gradient và Hessian).** $F=\tfrac1nf$ với $f(w)=\tfrac12\lVert Xw-y\rVert^2$. Mệnh đề 00.45 cho $\nabla f=X^T(Xw-y)$ và $\nabla^2f=X^TX$; nhân với $\tfrac1n$ cho (4.1).

**Bước 2 (điều kiện cực tiểu, tồn tại và duy nhất).** $F$ và $f$ có cùng tập điểm cực tiểu. Theo Định lý 00.22, $w$ cực tiểu hóa $f$ khi và chỉ khi $X^TXw=X^Ty$, tức (4.2). Tồn tại và duy nhất là Hệ quả 01.5(a), (c) áp cho $X$, $y$. $\square$
:::

Tính duy nhất của nghiệm phụ thuộc hạng của $X$. Với $n=5$ nút phân biệt và đặc trưng đa thức, $\operatorname{rank}X=\min(d,5)$, nên nghiệm duy nhất khi $d\le5$ và không duy nhất khi $d\ge6$. Khẳng định về hạng suy từ lập luận khả nghịch ở Ví dụ 05.1: khi $d\le5$, đa thức bậc không quá $d-1\le4$ bằng $0$ tại năm nút thì đồng nhất bằng $0$, nên các cột của $X$ độc lập; khi $d\ge5$, năm cột đầu tạo thành $X_5$ khả nghịch.

::: example Ví dụ 05.2 (Phương trình chuẩn với đường thẳng, $d=2$)
**Dữ kiện.** Ví dụ năm mẫu với đặc trưng $(1,u)$; các tổng của Ví dụ 05.1.

**Lập hệ.** Các phần tử của $X^TX$ là tổng các tích của hai cột, nên

$$
\begin{aligned}
X^TX&=\begin{pmatrix}n&\sum_iu_i\\\sum_iu_i&\sum_iu_i^2\end{pmatrix}\\
&=\begin{pmatrix}5&0\\0&\tfrac52\end{pmatrix},\\
X^Ty&=\begin{pmatrix}\sum_iy_i\\\sum_iu_iy_i\end{pmatrix}=\begin{pmatrix}0\\\tfrac{49}{20}\end{pmatrix}.
\end{aligned}
$$

**Giải.** Hệ chéo cho $w_0=0/5=0$ và $w_1=\tfrac{49/20}{5/2}=\tfrac{49}{50}=0{,}98$. Đường khớp là $0{,}98u$, gần quan hệ thật $u$.

**Kiểm tra lại.** Phần dư $0{,}98u_i-y_i$ bằng $(-0{,}08;\ 0{,}21;\ -0{,}2;\ 0{,}09;\ -0{,}02)$. Tổng phần dư bằng $0$ và tổng phần dư nhân $u_i$ bằng $0{,}08-0{,}105+0+0{,}045-0{,}02=0$, đúng điều kiện $X^T(Xw-y)=0$ của (4.2).
:::

Với $d=3$, hệ không còn chéo, nhưng tính đối xứng của các nút vẫn tách nó thành hai hệ nhỏ.

::: example Ví dụ 05.3 (Phương trình chuẩn với parabol, $d=3$)
**Dữ kiện.** Ví dụ năm mẫu với đặc trưng $(1,u,u^2)$; các tổng của Ví dụ 05.1 và hai tổng $\sum_iu_i^4=1+\tfrac1{16}+0+\tfrac1{16}+1=\tfrac{17}8$ và $\sum_iu_i^2y_i=-0{,}9-0{,}175+0+0{,}1+1=0{,}025=\tfrac1{40}$.

**Lập hệ.** Vì $\sum_iu_i=\sum_iu_i^3=0$,

$$
\begin{aligned}
X^TX&=\begin{pmatrix}5&0&\tfrac52\\0&\tfrac52&0\\\tfrac52&0&\tfrac{17}8\end{pmatrix},\\
X^Ty&=\begin{pmatrix}0\\\tfrac{49}{20}\\\tfrac1{40}\end{pmatrix}.
\end{aligned}
$$

**Giải.** Phương trình thứ hai cho $w_1=\tfrac{49}{50}$, như ở $d=2$. Phương trình thứ nhất cho $5w_0+\tfrac52w_2=0$, tức $w_0=-\tfrac12w_2$. Thay vào phương trình thứ ba:

$$
\begin{aligned}
\tfrac52w_0+\tfrac{17}8w_2&=\tfrac1{40}\\
-\tfrac54w_2+\tfrac{17}8w_2&=\tfrac1{40}&&\text{(a)}\\
\tfrac78w_2&=\tfrac1{40}.
\end{aligned}
$$

Vậy $w_2=\tfrac1{35}$ và $w_0=-\tfrac1{70}$, tức $w=(-\tfrac1{70},\tfrac{49}{50},\tfrac1{35})$.

**Kiểm tra lại.** Phần dư $x_i^Tw-y_i$ bằng $(-\tfrac{23}{350},\tfrac{71}{350},-\tfrac3{14},\tfrac{29}{350},-\tfrac1{175})$. Tổng của chúng là $\tfrac{-23+71-75+29-2}{350}=0$, khớp phương trình thứ nhất của (4.2).
:::

### 4.3. Sai số huấn luyện, sai số xác thực và rủi ro kỳ vọng

Với $d=4$ và $d=5$, hệ (4.2) giải được theo cùng cách bằng phân số. Thước đo tự nhiên đầu tiên để so các nghiệm là MSE trên chính năm mẫu huấn luyện, $\frac1n\lVert Xw-y\rVert^2=2F(w)$. Theo mệnh đề sau, thước đo này không tăng theo $d$.

::: proposition Mệnh đề 05.4 (Sai số huấn luyện không tăng theo số đặc trưng) — chứng minh đầy đủ
**Giả thiết.** Hai bộ đặc trưng lồng nhau: mọi cột của $X_d\in\mathbb R^{n\times d}$ là một cột của $X_{d'}\in\mathbb R^{n\times d'}$, với $d<d'$. $F_d$ và $F_{d'}$ là mất mát bình phương trung bình tương ứng.

**Kết luận.** $\min_{w\in\mathbb R^{d'}}F_{d'}(w)\le\min_{w\in\mathbb R^{d}}F_{d}(w)$.
:::

::: proof Chứng minh Mệnh đề 05.4
**Lộ trình.** Nhúng mỗi tham số của mô hình nhỏ vào mô hình lớn bằng cách thêm các tọa độ $0$.

**Bước 1 (nhúng mô hình nhỏ vào mô hình lớn).** Đánh số lại cột để $X_{d'}=(X_d\ \ Z)$. Với mọi $w\in\mathbb R^d$, vector $w'=(w,0)\in\mathbb R^{d'}$ cho $X_{d'}w'=X_dw$, nên $F_{d'}(w')=F_d(w)$.

**Bước 2 (so sánh hai cực tiểu).** Lấy $w$ là điểm cực tiểu của $F_d$, có theo Mệnh đề 05.3. Khi đó

$$
\begin{aligned}
\min F_{d'}&\le F_{d'}\bigl((w,0)\bigr)&&\text{(a)}\\
&=F_d(w)&&\text{(b)}\\
&=\min F_d .
\end{aligned}
$$

Bất đẳng thức (a) là định nghĩa của giá trị nhỏ nhất; đẳng thức (b) là Bước 1. $\square$
:::

Sai số huấn luyện giảm cả khi các đặc trưng thêm vào chỉ khớp nhiễu.

Để đo dự đoán tại điểm mới, ta tính MSE theo cùng công thức trên bốn điểm của tập xác thực, $u=\pm\tfrac14,\pm\tfrac34$ với nhãn đúng $u$; con số này gọi là MSE xác thực.

::: example Ví dụ 05.4 (Sai số huấn luyện và sai số xác thực theo $d$)
**Dữ kiện.** Ví dụ năm mẫu; bốn điểm xác thực $u'=(-\tfrac34,-\tfrac14,\tfrac14,\tfrac34)$ với nhãn $y'=u'$. Với mỗi $d=1,\ldots,5$, $w$ là nghiệm của (4.2) với đặc trưng $(1,u,\ldots,u^{d-1})$.

**Nghiệm và hai sai số.**

| $d$ | nghiệm $w$ | MSE huấn luyện | MSE xác thực |
|---:|---|---:|---:|
| $1$ | $(0)$ | $\tfrac12=0{,}5$ | $\tfrac5{16}=0{,}3125$ |
| $2$ | $(0,\tfrac{49}{50})$ | $\tfrac{99}{5000}=0{,}0198$ | $\tfrac1{8000}=0{,}000125$ |
| $3$ | $(-\tfrac1{70},\tfrac{49}{50},\tfrac1{35})$ | $\tfrac{86}{4375}\approx0{,}0197$ | $\approx0{,}000205$ |
| $4$ | $(-\tfrac1{70},\tfrac{23}{20},\tfrac1{35},-\tfrac15)$ | $\tfrac1{56}\approx0{,}0179$ | $\approx0{,}00107$ |
| $5$ | $(\tfrac15,\tfrac{23}{20},-\tfrac{109}{60},-\tfrac15,\tfrac53)$ | $0$ | $\approx0{,}0487$ |

**Tính hai dòng đầu.** Với $d=1$, $w_0=\bar y=0$, nên MSE huấn luyện là $\tfrac15(0{,}81+0{,}49+0{,}04+0{,}16+1)=0{,}5$ và MSE xác thực là trung bình của $u'^2$, tức $\tfrac14(\tfrac9{16}+\tfrac1{16}+\tfrac1{16}+\tfrac9{16})=\tfrac5{16}$. Với $d=2$, tổng bình phương phần dư của Ví dụ 05.2 là $0{,}0064+0{,}0441+0{,}04+0{,}0081+0{,}0004=0{,}099$, nên MSE huấn luyện là $0{,}0198$. Sai số tại điểm xác thực là $0{,}98u'-u'=-0{,}02u'$, nên MSE xác thực là $0{,}0004\cdot\tfrac5{16}=0{,}000125$.

**Dòng $d=5$.** Tại $u'=-\tfrac34$, đa thức nội suy dự đoán $-\tfrac{1373}{1280}\approx-1{,}073$ trong khi giá trị đúng là $-0{,}75$. Bốn sai số là $-0{,}3227;\ 0{,}0586;\ 0{,}1273;\ -0{,}2664$, có bình phương trung bình $\tfrac{79761}{1638400}\approx0{,}0487$.

**Kiểm tra lại.** Cột huấn luyện không tăng, đúng Mệnh đề 05.4. Tỉ số MSE xác thực giữa $d=5$ và $d=2$ là $0{,}048682/0{,}000125\approx389$.
:::

![Đồ thị trục tung logarit theo d từ 1 đến 5. MSE huấn luyện giảm: 0,5; 0,0198; 0,0197; 0,0179; bằng 0 tại d = 5. MSE xác thực: 0,3125; 0,000125; 0,000205; 0,00107; 0,0487, nhỏ nhất tại d = 2 rồi tăng.](img/lec-05/hq-errors-vs-d.svg)

![Năm mẫu huấn luyện và bốn điểm xác thực. Đường thẳng 0,98u (d = 2) đi gần mọi điểm; đa thức bậc 4 (d = 5, nét đứt) đi qua đúng năm mẫu nhiễu và uốn lượn giữa các nút, xa đường y = u tại các điểm xác thực.](img/lec-05/hq-fits-d2-d5.svg)

Trên thang logarit, MSE huấn luyện giảm theo $d$, còn MSE xác thực đạt đáy tại $d=2$ rồi tăng. Đa thức bậc $4$ đi qua cả nhiễu và uốn lượn giữa các nút; tại $u=\pm\tfrac34$ nó lệch khỏi đường thật khoảng $0{,}3$. Đường thẳng $0{,}98u$ không đi qua mẫu nào nhưng nằm gần cả chín điểm.

Hai cột của bảng đo hai đại lượng khác nhau: cột thứ nhất là đại lượng được tối ưu, cột thứ hai là đại lượng mà người dùng mô hình cần nhỏ. Về mặt ý tưởng, đại lượng thứ hai là sai số trung bình trên mọi điểm mà mô hình có thể gặp. Để làm rõ hai đại lượng này, xem định nghĩa sau.

::: definition Định nghĩa 05.5 (Rủi ro thực nghiệm và rủi ro kỳ vọng)
Cho mất mát $\ell(w;u,y)\ge0$ của tham số $w\in\mathbb R^d$ trên mẫu $(u,y)$, và giả thiết (G3): các mẫu được rút độc lập từ phân phối $P$.

*Rủi ro thực nghiệm* (empirical risk) trên mẫu huấn luyện $(u_i,y_i)_{i=1}^n$:

$$
F(w)=\frac1n\sum_{i=1}^n\ell(w;u_i,y_i).
$$

*Rủi ro kỳ vọng* (expected risk, population risk):

$$
\begin{aligned}
&R(w)\\
&\quad=\mathbb E_{(u,y)\sim P}\,\ell(w;u,y).
\end{aligned}
\tag{4.3}
$$
:::

Rủi ro thực nghiệm là hàm của $w$ và của mẫu huấn luyện; nó tính được. Rủi ro kỳ vọng chỉ phụ thuộc $w$ và $P$; nó không tính được khi $P$ chưa biết, và chỉ ước lượng được bằng mẫu. Định nghĩa 05.5 trùng Định nghĩa 05c.51, với cặp $(u,y)$ thay cho quan sát $\xi$, $w$ thay cho $\theta$ và $F$ thay cho $J$.

Với $w$ cố định không phụ thuộc mẫu huấn luyện, $\mathbb EF(w)=R(w)$ theo Định lý 05c.52. Khi $w$ được chọn bằng chính mẫu huấn luyện, như điểm cực tiểu của $F$, đẳng thức này nói chung sai; tại nghiệm $d=5$ của Ví dụ 05.4, $F=0$ trong khi MSE xác thực bằng $0{,}0487$.

Chọn $d$ đòi một ước lượng của $R$ không dùng mẫu huấn luyện. Ước lượng đó cần một tập mẫu riêng, và cần hai tập riêng nếu vừa muốn chọn vừa muốn báo cáo, như định nghĩa sau quy định.

::: definition Định nghĩa 05.6 (Tập xác thực, tập kiểm thử và quá khớp)
Dưới giả thiết (G3):

*Tập xác thực* (còn gọi là tập kiểm định; validation set) là một mẫu tách khỏi tập huấn luyện, dùng để chọn các đại lượng mà thuật toán tối ưu không chọn: số đặc trưng $d$, hệ số chính quy hóa $\lambda$, bước dừng.

*Tập kiểm thử* (test set) là một mẫu không tham gia bất kỳ lựa chọn nào, dùng để báo cáo ước lượng của $R$ cho mô hình cuối cùng.

*Quá khớp* (overfitting) là trạng thái trong đó $F(w)$ nhỏ nhưng $R(w)-F(w)$ lớn.
:::

Quá khớp là trạng thái của một cặp mô hình và dữ liệu. Trong Ví dụ 05.4, nghiệm với $d=5$ có $F=0$ nhưng sai số xác thực lớn nhất trong năm mô hình, nên nó quá khớp. Nghiệm với $d=1$ có cả hai sai số lớn; trạng thái đó gọi là *khớp thiếu* (underfitting). Tập kiểm thử cho ước lượng không chệch của $R$ theo mệnh đề sau.

::: proposition Mệnh đề 05.7 (Ước lượng không chệch của rủi ro trên tập kiểm thử) — chứng minh đầy đủ
**Giả thiết.** $n_{\rm kt}$ mẫu kiểm thử $(u'_j,y'_j)$, $j=1,\ldots,n_{\rm kt}$, rút độc lập từ $P$; tham số $w$ được xác định trước và không dùng các mẫu này ở bất kỳ bước nào, kể cả để chọn $d$ hay $\lambda$; $R(w)<\infty$.

**Kết luận.**

$$
\mathbb E\Bigl[\frac1{n_{\rm kt}}\sum_{j=1}^{n_{\rm kt}}\ell(w;u'_j,y'_j)\Bigr]=R(w).
$$
:::

::: proof Chứng minh Mệnh đề 05.7
**Lộ trình.** Lấy kỳ vọng từng số hạng rồi dùng tính tuyến tính của kỳ vọng.

Vì $w$ cố định và mỗi $(u'_j,y'_j)$ có phân phối $P$, mỗi số hạng có kỳ vọng $\mathbb E\,\ell(w;u'_j,y'_j)=R(w)$ theo (4.3). Kỳ vọng tuyến tính, nên kỳ vọng của trung bình $n_{\rm kt}$ số hạng bằng trung bình của $n_{\rm kt}$ kỳ vọng, tức $R(w)$. Đây là kết luận 1 của Định lý 05c.52 với $N=n_{\rm kt}$. $\square$
:::

Độ lệch của một lần ước lượng được đo bằng phương sai $\operatorname{Var}\ell(w;u,y)/n_{\rm kt}$ (Định lý 05c.52, kết luận 1), chẳng hạn qua bất đẳng thức Chebyshev (Hệ quả 05c.40). Khi một tập được dùng để chọn giữa nhiều mô hình, sai số của mô hình được chọn trên chính tập đó bị kéo xuống, như nhận xét sau chứng minh.

::: remark Nhận xét 05.8 (Thiên lệch khi chọn và báo cáo trên cùng một tập)
Cho $M$ tham số $w^{(1)},\ldots,w^{(M)}$ cố định, và $\widehat R_k$ là trung bình mất mát của $w^{(k)}$ trên cùng một tập xác thực độc lập với chúng. Theo Mệnh đề 05.7, $\mathbb E\widehat R_k=R(w^{(k)})$ với mọi $k$. Với mỗi $k$, $\min_j\widehat R_j\le\widehat R_k$, nên lấy kỳ vọng hai vế:

$$
\mathbb E\Bigl[\min_j\widehat R_j\Bigr]\le\min_kR(w^{(k)}).
$$

Kỳ vọng của giá trị xác thực nhỏ nhất vì vậy không vượt rủi ro của mô hình tốt nhất trong danh sách, và không tăng khi thêm mô hình vào danh sách. Báo cáo cuối cần một tập kiểm thử chưa tham gia lựa chọn.
:::

Bốn điểm của tập xác thực trong ví dụ năm mẫu là một lưới điểm chọn trước với nhãn không nhiễu, không rút ngẫu nhiên từ $P$, nên Mệnh đề 05.7 và Nhận xét 05.8 không áp dụng trực tiếp cho chúng. Theo nhận xét sau, MSE trên bốn điểm đó xấp xỉ một đại lượng chỉ khác $2R$ một hằng số.

::: remark Nhận xét 05.9 (Tập xác thực không nhiễu xấp xỉ $2R-\sigma_\varepsilon^2$)
Giả sử $y=u+\varepsilon$ với nhiễu $\varepsilon$ độc lập với $u$, $\mathbb E\varepsilon=0$, $\operatorname{Var}\varepsilon=\sigma_\varepsilon^2$, và $\ell=\tfrac12(x^Tw-y)^2$. Với $w$ cố định,

$$
\begin{aligned}
&\mathbb E(x^Tw-y)^2\\
&=\mathbb E(x^Tw-u-\varepsilon)^2\\
&=\mathbb E_u(x^Tw-u)^2+\mathbb E\varepsilon^2\\
&\quad-2\,\mathbb E\bigl[(x^Tw-u)\varepsilon\bigr]&&\text{(a)}\\
&=\mathbb E_u(x^Tw-u)^2+\sigma_\varepsilon^2&&\text{(b)}.
\end{aligned}
$$

Đẳng thức (a) khai triển bình phương; đẳng thức (b) dùng tính độc lập của $\varepsilon$ với $u$, $\mathbb E\varepsilon=0$ và $\mathbb E\varepsilon^2=\sigma_\varepsilon^2$. Vế trái bằng $2R(w)$, nên $\mathbb E_u(x^Tw-u)^2=2R(w)-\sigma_\varepsilon^2$.

MSE trên bốn điểm không nhiễu là trung bình của $(x^Tw-u)^2$ tại bốn giá trị $u$. Nếu $u$ phân phối đều trên $[-1,1]$, bốn điểm $\pm\tfrac14,\pm\tfrac34$ là trung điểm của bốn đoạn bằng nhau, nên trung bình trên chúng là công thức trung điểm xấp xỉ $\mathbb E_u(x^Tw-u)^2=2R(w)-\sigma_\varepsilon^2$.

Phần $\sigma_\varepsilon^2$ không phụ thuộc $w$, nên thứ tự giữa các mô hình, và vì vậy mọi lựa chọn $d$, $\lambda$ hay bước dừng, không đổi.
:::

Theo cột xác thực của Ví dụ 05.4, tập xác thực chọn $d=2$; theo cột huấn luyện, người ta chọn $d=5$, đúng mô hình quá khớp.

**Trong học máy.** Quy trình chia dữ liệu thành ba phần huấn luyện, xác thực, kiểm thử là quy trình chuẩn khi chọn *siêu tham số* (hyperparameter) (Goodfellow và cộng sự 2016, §5.3, tr. 120–121). Khi dữ liệu ít, kiểm định chéo (cross-validation; §5.3.1) thay tập xác thực cố định bằng trung bình qua nhiều cách chia, nhưng vẫn cần một tập kiểm thử chưa dùng tới.

### 4.4. Chế độ nội suy

Dòng $d=5$ của Ví dụ 05.4 có MSE huấn luyện bằng đúng $0$. Điều này đúng với mọi nhãn: với năm hệ số và năm phương trình, ta luôn tìm được đa thức đi qua đúng năm điểm. Để hiểu điều gì xảy ra khi $d$ bằng rồi vượt $n$, trước hết ta tính trường hợp $d=n$.

::: example Ví dụ 05.5 (Đa thức nội suy với $d=n=5$)
**Dữ kiện.** Ví dụ năm mẫu; $X_5$ là ma trận $5\times5$ của Ví dụ 05.1.

**Tính khả nghịch.** Theo Ví dụ 05.1, $X_5$ khả nghịch, nên $w=X_5^{-1}y$ thỏa $X_5w=y$ và $F(w)=0$.

**Nghiệm.** Giải hệ $X_5w=y$ bằng phân số cho

$$
w=\Bigl(\tfrac15,\ \tfrac{23}{20},\ -\tfrac{109}{60},\ -\tfrac15,\ \tfrac53\Bigr),
$$

tức đa thức nội suy $\psi(u)=\tfrac15+\tfrac{23}{20}u-\tfrac{109}{60}u^2-\tfrac15u^3+\tfrac53u^4$.

**Kiểm tra lại.** Tại $u=1$, $\psi(1)$ là tổng các hệ số: $0{,}2+1{,}15-1{,}8167-0{,}2+1{,}6667=1{,}0=y_5$. Tại $u=-1$: $0{,}2-1{,}15-1{,}8167+0{,}2+1{,}6667=-0{,}9=y_1$. Tại $u=0$: $\psi(0)=w_0=0{,}2=y_3$. Tại $u=\pm\tfrac12$: $\psi(\tfrac12)=0{,}4=y_4$ và $\psi(-\tfrac12)=-0{,}7=y_2$.
:::

Đa thức nội suy theo đúng nhiễu: hệ số của $u^4$ bằng $\tfrac53$, trong khi quan hệ thật không có số hạng bậc cao. Ví dụ trên dùng tính khả nghịch của $X$; mệnh đề sau thay tính khả nghịch bằng điều kiện hạng, nên áp dụng cả khi $d>n$.

::: proposition Mệnh đề 05.10 (Chế độ nội suy; interpolation regime) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{n\times d}$ với $\operatorname{rank}X=n$ (do đó $d\ge n$); $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$.

**Kết luận.** Với mọi $y\in\mathbb R^n$:

1. $\min_wF(w)=0$;
2. tập nghiệm là $\{\hat w+v:\ v\in\ker X\}$, với $\hat w$ là một nghiệm bất kỳ của $Xw=y$;
3. $\dim\ker X=d-n$.
:::

::: proof Chứng minh Mệnh đề 05.10
**Lộ trình.** Hạng $n$ cho ảnh của $X$ bằng $\mathbb R^n$; tập nghiệm là một nghiệm cộng hạt nhân.

**Bước 1 (tồn tại nghiệm khớp đúng).** Ảnh $\{Xw:\ w\in\mathbb R^d\}$ là một không gian con của $\mathbb R^n$ có chiều $\operatorname{rank}X=n$, nên bằng $\mathbb R^n$. Do đó có $\hat w$ với $X\hat w=y$, và $F(\hat w)=0$. Vì $F\ge0$, $\min F=0$. Đó là kết luận 1.

**Bước 2 (tập nghiệm).** $F(w)=0$ khi và chỉ khi $Xw=y$. Trừ đẳng thức $X\hat w=y$, ta được $Xw=y\iff X(w-\hat w)=0\iff w-\hat w\in\ker X$. Đó là kết luận 2.

**Bước 3 (chiều).** Định lý hạng–số chiều cho $\dim\ker X=d-\operatorname{rank}X=d-n$. $\square$
:::

Với $d=n$, tập nghiệm có một phần tử, $w=X^{-1}y$; với $d>n$, tập nghiệm là không gian affine chiều $d-n$, và dữ liệu huấn luyện không phân biệt được các phần tử của nó. Điều kiện hạng chỉ đặt lên $X$, nên nghiệm khớp đúng mọi nhãn $y$; trạng thái này gọi là *chế độ nội suy* (interpolation regime). Với đặc trưng đa thức trên $n$ nút phân biệt, $\operatorname{rank}X=n$ với mọi $d\ge n$.

::: example Ví dụ 05.6 (Họ nghiệm với $d=6$)
**Dữ kiện.** Ví dụ năm mẫu với đặc trưng $(1,u,\ldots,u^5)$, nên $X\in\mathbb R^{5\times6}$ và $\operatorname{rank}X=5$; tập xác thực bốn điểm.

**Hướng của hạt nhân.** Theo Mệnh đề 05.10, $\dim\ker X=6-5=1$. Đa thức $u(u^2-1)(u^2-\tfrac14)=u^5-\tfrac54u^3+\tfrac14u$ bằng $0$ tại cả năm nút, nên vector hệ số của nó, $z=(0,\tfrac14,0,-\tfrac54,0,1)$, thỏa $Xz=0$ và sinh $\ker X$.

**Họ nghiệm.** Mọi $w_{\rm mn}+tz$, $t\in\mathbb R$, khớp đúng năm mẫu, với $w_{\rm mn}$ là nghiệm vuông góc với $z$, tức điểm của họ nghiệm gần gốc nhất. Tại bốn điểm xác thực, đa thức của $z$ nhận giá trị $\tfrac{105}{1024},-\tfrac{45}{1024},\tfrac{45}{1024},-\tfrac{105}{1024}$, khác $0$, nên dự đoán thay đổi theo $t$:

| $t$ | $-5$ | $-1$ | $0$ | $1$ | $5$ |
|---|---:|---:|---:|---:|---:|
| MSE huấn luyện | $0$ | $0$ | $0$ | $0$ | $0$ |
| MSE xác thực | $0{,}2244$ | $0{,}0594$ | $0{,}0492$ | $0{,}0515$ | $0{,}1852$ |
| $\lVert w_{\rm mn}+tz\rVert^2$ | $73{,}0$ | $10{,}0$ | $7{,}37$ | $10{,}0$ | $73{,}0$ |

**Kiểm tra lại.** Tại $u=\tfrac12$: $\tfrac1{32}-\tfrac54\cdot\tfrac18+\tfrac14\cdot\tfrac12=\tfrac{1-5+4}{32}=0$. Cột $\lVert\cdot\rVert^2$ đối xứng theo $t$ vì $z\perp w_{\rm mn}$, nên $\lVert w_{\rm mn}+tz\rVert^2=\lVert w_{\rm mn}\rVert^2+t^2\lVert z\rVert^2$ với $\lVert z\rVert^2=\tfrac1{16}+\tfrac{25}{16}+1=\tfrac{21}8$; tại $t=1$: $7{,}37+2{,}625\approx10{,}0$.
:::

Dữ liệu huấn luyện không phân biệt được các nghiệm của họ trên, trong khi sai số xác thực thay đổi gần năm lần. Chọn một nghiệm vì vậy đòi một tiêu chí ngoài dữ liệu huấn luyện. Tiêu chí đơn giản nhất là chuẩn nhỏ nhất, như mệnh đề sau.

::: proposition Mệnh đề 05.11 (Nghiệm chuẩn nhỏ nhất; minimum-norm solution) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{n\times d}$ với $\operatorname{rank}X=n$; $y\in\mathbb R^n$.

**Kết luận.**

1. $XX^T\in\mathbb R^{n\times n}$ khả nghịch, và $w_{\rm mn}=X^T(XX^T)^{-1}y$ thỏa $Xw_{\rm mn}=y$.
2. $w_{\rm mn}$ vuông góc với $\ker X$.
3. $w_{\rm mn}$ là nghiệm duy nhất của $Xw=y$ có chuẩn nhỏ nhất.
:::

::: proof Chứng minh Mệnh đề 05.11
**Lộ trình.** Kiểm tra $w_{\rm mn}$ là nghiệm, chứng minh nó vuông góc với $\ker X$, rồi dùng định lý Pythagore.

**Bước 1 ($XX^T$ khả nghịch).** Nếu $XX^Ta=0$ thì $0=a^TXX^Ta=\lVert X^Ta\rVert^2$, nên $X^Ta=0$. Các cột của $X^T$ là $n$ hàng của $X$, độc lập tuyến tính vì $\operatorname{rank}X=n$, nên $a=0$. Vậy $XX^T$ khả nghịch, và $Xw_{\rm mn}=XX^T(XX^T)^{-1}y=y$.

**Bước 2 (vuông góc với hạt nhân).** Với $v\in\ker X$, $v^Tw_{\rm mn}=v^TX^Ta=(Xv)^Ta=0$, ở đây $a=(XX^T)^{-1}y$.

**Bước 3 (chuẩn nhỏ nhất).** Theo Mệnh đề 05.10, mọi nghiệm có dạng $w=w_{\rm mn}+v$ với $v\in\ker X$. Theo Bước 2 và định lý Pythagore,

$$
\begin{aligned}
\lVert w\rVert^2&=\lVert w_{\rm mn}\rVert^2+\lVert v\rVert^2\\
&\ge\lVert w_{\rm mn}\rVert^2,
\end{aligned}
$$

với dấu bằng khi và chỉ khi $v=0$. $\square$
:::

Nghiệm chuẩn nhỏ nhất là $t=0$ trong bảng của Ví dụ 05.6. Nó vẫn đi qua năm điểm nhiễu, nên sai số xác thực của nó, $0{,}0492$, gần với sai số $0{,}0487$ của đa thức nội suy bậc $4$. Chuẩn nhỏ nhất vì vậy chọn được một nghiệm, nhưng không sửa được quá khớp. Nhận xét sau liệt kê ba cách chọn một nghiệm.

::: remark Nhận xét 05.12 (Ba cách chọn một nghiệm khi $d>n$)
Có ba loại tiêu chí ngoài dữ liệu huấn luyện.

1. **Tiêu chí tường minh**: chuẩn nhỏ nhất, như Mệnh đề 05.11.
2. **Thay đổi mục tiêu**: cộng số hạng phạt $\frac\lambda2\lVert w\rVert^2$; mục tiêu mới có nghiệm duy nhất.
3. **Chính thuật toán**: hạ gradient bước $\frac1L$ xuất phát từ $w=0$ trên $F$ chỉ đi trong ảnh của $X^T$, vì mỗi gradient $\frac1nX^T(Xw-y)$ thuộc ảnh đó, nên giới hạn của nó vuông góc với $\ker X$ và bằng $w_{\rm mn}$. Ở ví dụ năm mẫu với $d=8$, cả hạ gradient từ $0$ lẫn công thức $X^T(XX^T)^{-1}y$ cho cùng MSE xác thực $0{,}0759$.

Với $\operatorname{rank}X=n$, $w_{\rm mn}=X^+y$ với giả nghịch đảo $X^+$ của Định nghĩa 00.27.
:::

**Trong học máy.** Theo Mệnh đề 05.10, khi số tham số đạt số mẫu và $\operatorname{rank}X=n$, sai số huấn luyện bằng $0$ đạt được khi tối ưu đủ lâu, nên sai số huấn luyện không đo được chất lượng của mô hình. Theo Nhận xét 05.12, nghiệm mà thuật toán trả về phụ thuộc vào điểm xuất phát và vào chính thuật toán.

### 4.5. Độ nhạy và số điều kiện

Ví dụ sau đo trực tiếp độ nhạy của nghiệm với nhiễu ở nhãn.

::: example Ví dụ 05.7 (Độ nhạy của nghiệm theo nhãn)
**Dữ kiện.** Ví dụ năm mẫu, đặc trưng $(1,u,\ldots,u^{d-1})$. Tăng $y_3$ (nhãn tại $u=0$) thêm $0{,}01$, giữ các nhãn khác, tức $\delta y=(0,0,0{,}01,0,0)$, và giải lại (4.2).

**Trường hợp $d=2$.** Hệ chéo $\operatorname{diag}(5,\tfrac52)\,\delta w=X^T\delta y=(0{,}01,\ u_3\cdot0{,}01)=(0{,}01,0)$ cho $\delta w=(0{,}002;\ 0)$ và $\lVert\delta w\rVert=0{,}002$.

**Trường hợp $d=5$.** $X$ khả nghịch nên $\delta w=X^{-1}\delta y$ là $0{,}01$ nhân vector hệ số của đa thức bậc không quá $4$ bằng $1$ tại $u=0$ và bằng $0$ tại bốn nút còn lại. Đa thức đó là $(1-u^2)(1-4u^2)=4u^4-5u^2+1$, nên

$$
\begin{aligned}
\delta w&=0{,}01\cdot(1,0,-5,0,4),\\\lVert\delta w\rVert&=0{,}01\sqrt{1+25+16}\\&=0{,}01\sqrt{42}\approx0{,}0648 .
\end{aligned}
$$

**Kiểm tra lại.** Tại $u=\pm\tfrac12$: $4\cdot\tfrac1{16}-5\cdot\tfrac14+1=0$; tại $u=\pm1$: $4-5+1=0$; tại $u=0$: $1$. Cùng một thay đổi ở nhãn dịch nghiệm ở $d=5$ xa gấp khoảng $32$ lần ở $d=2$.
:::

Một cách trực quan, độ nhạy do hình dạng của đường mức quyết định. Với $F$ bậc hai, đường mức là các elip có bán trục theo hướng riêng $v_j$ của $\frac1nX^TX$ tỉ lệ với $1/\sqrt{s_j}$, ở đây $s_j$ là trị riêng tương ứng, tức độ cong của $F$ theo hướng đó. Khi tỉ số giữa độ cong lớn nhất và nhỏ nhất lớn, elip rất dẹt, và theo hướng trục dài $F$ gần như phẳng.

![Hai khung đường mức của hàm bậc hai. Trái: số điều kiện 2, elip gần tròn, tỉ lệ bán trục √2 ≈ 1,41. Phải: số điều kiện 50, elip rất dẹt, tỉ lệ bán trục √50 ≈ 7,07; trục dài là hướng gần phẳng.](img/lec-05/hq-level-sets-kappa.svg)

Theo hướng trục dài của elip dẹt, dữ liệu ràng buộc $w$ rất yếu, nên một nhiễu nhỏ ở nhãn dịch nghiệm đi xa theo hướng đó. Để làm rõ đại lượng đo hình dạng này, xem định nghĩa sau.

::: definition Định nghĩa 05.13 (Số điều kiện; condition number)
Cho ma trận đối xứng nửa xác định dương $A\in\mathbb R^{d\times d}$ với trị riêng lớn nhất $\lambda_{\max}(A)$ và nhỏ nhất $\lambda_{\min}(A)$. *Số điều kiện* (condition number) của $A$ là

$$
\kappa(A)=\frac{\lambda_{\max}(A)}{\lambda_{\min}(A)},
$$

với quy ước $\kappa(A)=\infty$ khi $\lambda_{\min}(A)=0$ và $A\ne0$.

Cho hàm $f$ khả vi hai lần với $\mu I\preceq\nabla^2f(w)\preceq LI$ tại mọi $w$, $0<\mu\le L$. Số điều kiện của hàm $f$ ứng với cặp hằng số đó là $\kappa=L/\mu$.
:::

Số điều kiện không nhỏ hơn $1$, và bằng $1$ khi mọi trị riêng bằng nhau, tức khi đường mức là đường tròn. Nó không đổi khi nhân $A$ với một hằng số dương, nên chỉ phụ thuộc tỉ số giữa các trị riêng. Với hàm bậc hai, hai cách định nghĩa trùng nhau theo mệnh đề sau, nên chúng ta dùng cùng ký hiệu $\kappa$; số này cũng là số điều kiện của Nhận xét 04.14.

Với $f$ lớp $C^2$, điều kiện $\mu I\preceq\nabla^2f\preceq LI$ kéo theo hai tính chất mà Định lý 04.27 cần: $f$ lồi mạnh với hằng số $\mu$ (Nhận xét 01.40) và gradient $L$-Lipschitz (Định nghĩa 04.18, Nhận xét 04.20).

::: proposition Mệnh đề 05.14 (Hằng số của mất mát bình phương) — chứng minh đầy đủ
**Giả thiết.** $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$ với $\operatorname{rank}X=d$.

**Kết luận.** $F$ thỏa $\mu I\preceq\nabla^2F\preceq LI$ với hai hằng số tốt nhất

$$
\begin{aligned}
L&=\frac{\lambda_{\max}(X^TX)}n,\\
\mu&=\frac{\lambda_{\min}(X^TX)}n,\\
\kappa_F&=\frac L\mu=\kappa(X^TX).
\end{aligned}
\tag{4.4}
$$
:::

::: proof Chứng minh Mệnh đề 05.14
**Lộ trình.** Hessian không phụ thuộc $w$; thương Rayleigh cho hai hằng số, ma trận Gram cho $\mu>0$.

**Bước 1 (cận Rayleigh).** Theo (4.1), $\nabla^2F=\frac1nX^TX$ không phụ thuộc $w$. Với mọi $v\ne0$, thương Rayleigh (Mệnh đề 00.18) cho

$$
\begin{aligned}
\frac{\lambda_{\min}(X^TX)}n&\le\frac{v^T\nabla^2Fv}{v^Tv}\\
&\le\frac{\lambda_{\max}(X^TX)}n,
\end{aligned}
$$

với dấu bằng tại vector riêng tương ứng. Đó là $\mu I\preceq\nabla^2F\preceq LI$ với hai hằng số tốt nhất trong (4.4).

**Bước 2 ($\mu>0$ khi hạng đủ).** Khi $\operatorname{rank}X=d$, $X^TX\succ0$ (Mệnh đề 00.20, kết luận 3), nên $\lambda_{\min}(X^TX)>0$.

**Bước 3 (số điều kiện).** Tỉ số $L/\mu$ không chứa thừa số $1/n$, nên bằng $\kappa(X^TX)$. $\square$
:::

Khi $\operatorname{rank}X<d$, vẫn có $\nabla^2F\preceq LI$, nhưng $\lambda_{\min}(X^TX)=0$ và $F$ không lồi mạnh. Mệnh đề sau nối số điều kiện với độ nhạy đã đo ở Ví dụ 05.7.

::: proposition Mệnh đề 05.15 (Cận độ nhạy của nghiệm bình phương nhỏ nhất) — chứng minh đầy đủ
**Giả thiết.** $\operatorname{rank}X=d$; $w$ là nghiệm của (4.2) với nhãn $y$, và $w+\delta w$ là nghiệm với nhãn $y+\delta y$.

**Kết luận.**

$$
\begin{aligned}
&\lVert\delta w\rVert\le\frac{\lVert\delta y\rVert}{\sqrt{\lambda_{\min}(X^TX)}},\\
&\frac1{\sqrt{\lambda_{\min}(X^TX)}}\\
&\quad=\sqrt{\frac{\kappa(X^TX)}{\lambda_{\max}(X^TX)}} .
\end{aligned}
\tag{4.5}
$$
:::

::: proof Chứng minh Mệnh đề 05.15
**Lộ trình.** Chặn $\lVert X\delta w\rVert$ bằng Cauchy–Schwarz, rồi chuyển về $\lVert\delta w\rVert$ bằng thương Rayleigh.

**Bước 1 (phương trình của $\delta w$).** Trừ hai phương trình chuẩn, $X^TX\,\delta w=X^T\delta y$.

**Bước 2 (chặn $\lVert X\delta w\rVert$).** Nhân vô hướng hai vế với $\delta w$:

$$
\begin{aligned}
\lVert X\delta w\rVert^2&=\delta w^TX^TX\delta w\\
&=\delta w^TX^T\delta y&&\text{(a)}\\
&\le\lVert X\delta w\rVert\,\lVert\delta y\rVert&&\text{(b)}.
\end{aligned}
$$

Đẳng thức (a) dùng Bước 1; bất đẳng thức (b) là bất đẳng thức Cauchy–Schwarz.
Vậy $\lVert X\delta w\rVert\le\lVert\delta y\rVert$ (hiển nhiên khi $X\delta w=0$).

**Bước 3 (chuyển về $\lVert\delta w\rVert$).** Theo thương Rayleigh, $\lVert X\delta w\rVert^2=\delta w^TX^TX\delta w\ge\lambda_{\min}(X^TX)\lVert\delta w\rVert^2$. Ghép với Bước 2 cho bất đẳng thức của (4.5). Đẳng thức thứ hai của (4.5) là định nghĩa $\kappa=\lambda_{\max}/\lambda_{\min}$ viết lại. $\square$
:::

Cận (4.5) lấy trường hợp xấu nhất trên mọi $\delta y$. Ví dụ sau đặt cận này cạnh độ dịch đo được ở Ví dụ 05.7.

::: example Ví dụ 05.8 (Số điều kiện theo $d$ trên ví dụ năm mẫu)
**Dữ kiện.** Năm nút của ví dụ năm mẫu, đặc trưng $(1,u,\ldots,u^{d-1})$, $\delta y$ như Ví dụ 05.7.

**Trị riêng và số điều kiện.** Trị riêng của $X^TX$ tính số:

| $d$ | $1$ | $2$ | $3$ | $4$ | $5$ | $\ge6$ |
|---|---:|---:|---:|---:|---:|---:|
| $\lambda_{\min}(X^TX)$ | $5$ | $2{,}5$ | $0{,}679$ | $0{,}128$ | $0{,}0142$ | $0$ |
| $\lambda_{\max}(X^TX)$ | $5$ | $5$ | $6{,}45$ | $6{,}45$ | $7{,}86$ | |
| $\kappa(X^TX)$ | $1$ | $2$ | $9{,}50$ | $50{,}5$ | $553{,}7$ | $\infty$ |

**Áp dụng cận.** Với $d=2$, $1/\sqrt{2{,}5}=0{,}632$, nên cận (4.5) cho $\lVert\delta w\rVert\le0{,}00632$; giá trị đo được là $0{,}002$. Với $d=5$, $1/\sqrt{0{,}0142}=8{,}39$, cận là $0{,}0839$; giá trị đo được là $0{,}0648$.

**Kiểm tra lại.** Với $d=2$, $X^TX=\operatorname{diag}(5,\tfrac52)$ (Ví dụ 05.2) có trị riêng $5$ và $2{,}5$, tỉ số $2$. Với $d\ge6$, $\operatorname{rank}X\le5<d$ nên $\lambda_{\min}=0$.
:::

Trong bảng, $\lambda_{\max}$ chỉ thay đổi từ $5$ đến $7{,}86$, còn $\lambda_{\min}$ giảm hơn ba trăm lần. Vì vậy hệ số $1/\sqrt{\lambda_{\min}}=\sqrt{\kappa/\lambda_{\max}}$ trong (4.5) tăng gần như theo $\sqrt\kappa$, và số điều kiện đo được độ nhạy của Ví dụ 05.7. Mệnh đề sau chứng minh chiều tăng của $\kappa$ theo $d$ cho mọi họ đặc trưng lồng nhau.

::: proposition Mệnh đề 05.16 (Số điều kiện không giảm khi thêm đặc trưng) — chứng minh đầy đủ
**Giả thiết.** $X_{d+1}=(X_d\ \ a)\in\mathbb R^{n\times(d+1)}$ có thêm một cột $a$ so với $X_d$; $A_d=X_d^TX_d$, $A_{d+1}=X_{d+1}^TX_{d+1}$.

**Kết luận.** $\lambda_{\min}(A_{d+1})\le\lambda_{\min}(A_d)$ và $\lambda_{\max}(A_{d+1})\ge\lambda_{\max}(A_d)$; do đó $\kappa(A_{d+1})\ge\kappa(A_d)$.
:::

::: proof Chứng minh Mệnh đề 05.16
**Lộ trình.** $A_d$ là ma trận con chính của $A_{d+1}$; so thương Rayleigh trên tập con các vector $(v,0)$.

**Bước 1 ($A_d$ là ma trận con chính).** Phần tử $(j,k)$ của $A_{d+1}$ là tích vô hướng của cột $j$ và cột $k$ của $X_{d+1}$. Với $j,k\le d$, đó là phần tử $(j,k)$ của $A_d$. Vậy với mọi $v\in\mathbb R^d$, vector $\tilde v=(v,0)\in\mathbb R^{d+1}$ thỏa $\tilde v^TA_{d+1}\tilde v=v^TA_dv$ và $\lVert\tilde v\rVert=\lVert v\rVert$.

**Bước 2 (trị riêng nhỏ nhất).** Theo thương Rayleigh,

$$
\begin{aligned}
&\lambda_{\min}(A_{d+1})\\
&\quad=\min_{v'\ne0}\frac{v'^TA_{d+1}v'}{v'^Tv'}\\
&\quad\le\min_{v\ne0}\frac{\tilde v^TA_{d+1}\tilde v}{\tilde v^T\tilde v}&&\text{(a)}\\
&\quad=\min_{v\ne0}\frac{v^TA_dv}{v^Tv}&&\text{(b)}\\
&\quad=\lambda_{\min}(A_d).
\end{aligned}
$$

Bất đẳng thức (a) đúng vì cực tiểu trên tập các $v'=(v,0)$ không nhỏ hơn cực tiểu trên toàn $\mathbb R^{d+1}$; đẳng thức (b) là Bước 1.

**Bước 3 (trị riêng lớn nhất).** Cùng lập luận với cực đại cho $\lambda_{\max}(A_{d+1})\ge\lambda_{\max}(A_d)$.

**Bước 4 (số điều kiện).** Tử số của $\kappa$ không giảm và mẫu số không tăng. Nếu $\lambda_{\min}(A_d)=0$ thì $\lambda_{\min}(A_{d+1})=0$ và cả hai số điều kiện bằng $\infty$. $\square$
:::

Quy nạp theo số cột thêm vào cho kết luận với mọi họ đặc trưng lồng nhau. Với đơn thức $1,u,u^2,\ldots$ trên $[-1,1]$, các cột gần phụ thuộc tuyến tính, nên $\kappa$ tăng rất nhanh như bảng của Ví dụ 05.8.

**Trong học máy.** Số điều kiện lớn có hai hậu quả. Thứ nhất, nghiệm nhạy với nhiễu ở nhãn theo (4.5). Thứ hai, hạ gradient cần số bước tỉ lệ với $\kappa$ (Định lý 04.27).

*Chuẩn hóa đặc trưng* (feature standardization) trừ trung bình và chia độ lệch chuẩn của từng cột trước khi huấn luyện, nên mọi cột không hằng có cùng độ lớn (Murphy 2022, §10.2.8). Phép này không sửa được các cột gần phụ thuộc tuyến tính như các đơn thức bậc cao. Goodfellow và cộng sự (2016, §8.2.1) gọi tình trạng $\kappa$ lớn là điều kiện hóa kém (ill-conditioning) và xếp nó vào các khó khăn chính khi tối ưu mô hình học máy.

### 4.6. Chính quy hóa bậc hai và chọn mô hình

Ba hiện tượng vừa thu được đều xấu đi khi $d$ tăng, bao gồm:

- nghiệm không duy nhất khi $d>n$;
- sai số xác thực tăng;
- số điều kiện không giảm.

Bài 02 đã có một công cụ sửa hệ quả thứ nhất và thứ ba: cộng số hạng phạt bậc hai.

Về mặt ý tưởng, số hạng phạt $\frac\lambda2\lVert w\rVert^2$ cộng $\lambda$ vào độ cong theo mọi hướng, nên hướng phẳng nhất có độ cong ít nhất $\lambda$ và đường mức không còn dẹt tùy ý. Chẳng hạn, với đường thẳng của Ví dụ 05.2, Hessian $\frac15\operatorname{diag}(5,\tfrac52)=\operatorname{diag}(1;\ 0{,}5)$ trở thành $\operatorname{diag}(1+\lambda;\ 0{,}5+\lambda)$. Mệnh đề sau phát biểu điều này cho mọi $X$.

::: proposition Mệnh đề 05.17 (Hồi quy với chính quy hóa bậc hai) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{n\times d}$ tùy ý, $y\in\mathbb R^n$, $\lambda>0$, $F_\lambda(w)=\frac1{2n}\lVert Xw-y\rVert^2+\frac\lambda2\lVert w\rVert^2$.

**Kết luận.**

1. $F_\lambda$ có đúng một điểm cực tiểu $w_\lambda$, là nghiệm duy nhất của

$$
\begin{aligned}
&\Bigl(\frac1nX^TX+\lambda I\Bigr)w\\
&\quad=\frac1nX^Ty .
\end{aligned}
\tag{4.6}
$$

2. $\nabla^2F_\lambda=\frac1nX^TX+\lambda I$ có các hằng số

$$
\begin{aligned}
\mu&=\frac{\lambda_{\min}(X^TX)}n+\lambda,\\
L&=\frac{\lambda_{\max}(X^TX)}n+\lambda,\\
\kappa&=\frac{\lambda_{\max}(X^TX)+n\lambda}{\lambda_{\min}(X^TX)+n\lambda}\\
&=\kappa(X^TX+n\lambda I).
\end{aligned}
$$
:::

::: proof Chứng minh Mệnh đề 05.17
**Lộ trình.** Cộng $\lambda I$ vào Hessian dịch mọi trị riêng thêm $\lambda$; Hessian xác định dương cho nghiệm duy nhất.

**Bước 1 (Hessian).** Theo (4.1), $\nabla^2F_\lambda=\frac1nX^TX+\lambda I$. Nếu $v$ là vector riêng của $X^TX$ với trị riêng $s$ thì $v$ là vector riêng của $\nabla^2F_\lambda$ với trị riêng $s/n+\lambda$. Mọi trị riêng tăng thêm $\lambda$, cho các hằng số ở kết luận 2.

**Bước 2 (nghiệm duy nhất).** $\mu\ge\lambda>0$, nên $\nabla^2F_\lambda\succ0$ và ma trận của (4.6) khả nghịch. $F_\lambda$ lồi, nên điểm cực tiểu là nghiệm của $\nabla F_\lambda=0$, tức (4.6), và nghiệm đó duy nhất. $\square$
:::

Kết luận 1 là Mệnh đề 02.21(c) ở dạng trung bình. Với $d>n$, $\lambda_{\min}(X^TX)=0$, nên $\mu=\lambda$ và số điều kiện bằng $1+\lambda_{\max}(X^TX)/(n\lambda)$: số hạng phạt biến $\kappa=\infty$ thành một số hữu hạn. So với Mệnh đề 05.10, chính quy hóa không còn khớp đúng nhãn, vì nó đổi mục tiêu. Điều đổi lại là tính duy nhất và số điều kiện hữu hạn với mọi $d$.

::: example Ví dụ 05.9 (Chọn hệ số chính quy hóa trên ví dụ năm mẫu)
**Dữ kiện.** Ví dụ năm mẫu, $n=5$, đặc trưng $(1,u,\ldots,u^{d-1})$, tập xác thực bốn điểm. Với $d=5$, $\lambda_{\min}(X^TX)=0{,}01419$ và $\lambda_{\max}(X^TX)=7{,}857$ (Ví dụ 05.8).

**Bảng với $d=5$.** Giải (4.6) cho bốn giá trị $\lambda$:

| $\lambda$ | MSE huấn luyện | MSE xác thực | $\kappa$ |
|---:|---:|---:|---:|
| $0{,}1$ | $0{,}0349$ | $0{,}0189$ | $16{,}3$ |
| $0{,}01$ | $0{,}0123$ | $0{,}00261$ | $123{,}2$ |
| $0{,}001$ | $0{,}00121$ | $0{,}0264$ | $409{,}7$ |
| $0$ | $0$ | $0{,}0487$ | $553{,}7$ |

**Tính một dòng của cột $\kappa$.** Với $\lambda=0{,}01$: $L=7{,}857/5+0{,}01=1{,}5815$, $\mu=0{,}01419/5+0{,}01=0{,}012838$, nên $\kappa=1{,}5815/0{,}012838\approx123{,}2$.

**Trường hợp $d=8>n$.** $\lambda_{\min}(X^TX)=0$, nên không chính quy hóa thì $\kappa=\infty$. Với $\lambda=0{,}01$: $\mu=\lambda=0{,}01$, $L=1{,}8949$, $\kappa=189{,}5$, và MSE xác thực bằng $0{,}007635$.

**Chọn.** Cột huấn luyện tăng theo $\lambda$, còn cột xác thực có cực tiểu ở giữa. Theo Định nghĩa 05.6, ta chọn $\lambda=0{,}01$.

**Kiểm tra lại.** Dòng $\lambda=0$ trùng dòng $d=5$ của Ví dụ 05.4 và dòng $d=5$ của Ví dụ 05.8.
:::

Chính quy hóa điều chỉnh mức khớp liên tục theo $\lambda$, thay cho việc chọn $d$ rời rạc. Với $\lambda=0{,}01$, sai số xác thực giảm khoảng $19$ lần so với đa thức nội suy. Nó vẫn lớn hơn sai số $0{,}000125$ của đường thẳng $d=2$, vì quan hệ thật trong ví dụ là tuyến tính. Nhận xét sau nối $w_\lambda$ với nghiệm chuẩn nhỏ nhất.

::: remark Nhận xét 05.18 (Chính quy hóa và nghiệm chuẩn nhỏ nhất)
Với mọi $X$ và $\lambda>0$, nghiệm của (4.6) viết được ở dạng $w_\lambda=X^T(XX^T+n\lambda I)^{-1}y$. Thật vậy, $(X^TX+n\lambda I)X^T=X^T(XX^T+n\lambda I)$, nên nhân trái với $(X^TX+n\lambda I)^{-1}$ và nhân phải với $(XX^T+n\lambda I)^{-1}$ cho $X^T(XX^T+n\lambda I)^{-1}=(X^TX+n\lambda I)^{-1}X^T$; vế phải nhân $y$ là nghiệm của (4.6) sau khi nhân hai vế với $n$. Khi $\operatorname{rank}X=n$ và $\lambda\to0$, $XX^T+n\lambda I\to XX^T$ khả nghịch, nên $w_\lambda\to X^T(XX^T)^{-1}y=w_{\rm mn}$ của Mệnh đề 05.11. Goodfellow và cộng sự (2016, §7.3, tr. 240) đọc giả nghịch đảo Moore–Penrose theo đúng giới hạn này.
:::

**Trong học máy.** Số hạng phạt $\frac\lambda2\lVert w\rVert^2$ trong học sâu còn gọi là *suy giảm trọng số* (weight decay): bước hạ gradient trên $F_\lambda$ là $w\leftarrow(1-\eta\lambda)w-\eta\nabla F(w)$, tức co $w$ về $0$ một tỉ lệ cố định trước khi đi theo gradient của mất mát (Goodfellow và cộng sự 2016, §7.1.1).

Ba bài tập sau kiểm tra phương trình chuẩn, chế độ nội suy và số điều kiện.

::: exercise Bài tập 05.1 (Phương trình chuẩn với đặc trưng $(1,u,u^2)$)
Cho ví dụ năm mẫu $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$ với đặc trưng $(1,u,u^2)$, và vector $w=(-\tfrac1{70},\tfrac{49}{50},\tfrac1{35})$.

1. Kiểm tra $w$ thỏa phương trình chuẩn bằng cách tính $X^T(Xw-y)$.
2. Tính MSE huấn luyện của $w$ dưới dạng phân số.
3. Chứng minh, không tính số, rằng MSE này không lớn hơn MSE huấn luyện $\tfrac{99}{5000}$ của đường thẳng.
:::

::: hint
Phần dư $x_i^Tw-y_i$ đã có dạng phân số mẫu $350$. Câu 3 dùng tính lồng nhau của hai bộ đặc trưng.
:::

::: solution
1. Phần dư là $\hat r=(-\tfrac{23}{350},\tfrac{71}{350},-\tfrac{75}{350},\tfrac{29}{350},-\tfrac2{350})$. Ba thành phần của $X^T\hat r$ là $\sum_i\hat r_i$, $\sum_iu_i\hat r_i$, $\sum_iu_i^2\hat r_i$:

$$
\begin{aligned}
\textstyle\sum_i\hat r_i&=\tfrac{-23+71-75+29-2}{350}=0,\\
\textstyle\sum_iu_i\hat r_i&=\tfrac{23-35{,}5+0+14{,}5-2}{350}=0,\\
\textstyle\sum_iu_i^2\hat r_i&=\tfrac{-23+17{,}75+0+7{,}25-2}{350}=0 .
\end{aligned}
$$

Vậy $X^T(Xw-y)=0$.

2. Tổng bình phương phần dư là $\tfrac{529+5041+5625+841+4}{350^2}=\tfrac{12040}{122500}$, nên MSE bằng $\tfrac{12040}{5\cdot122500}=\tfrac{12040}{612500}=\tfrac{86}{4375}\approx0{,}019657$.

3. Bộ $(1,u)$ nằm trong bộ $(1,u,u^2)$, nên theo Mệnh đề 05.4, cực tiểu của $F$ với ba đặc trưng không lớn hơn cực tiểu với hai đặc trưng.

**Kiểm tra lại.** $\tfrac{86}{4375}\approx0{,}019657<0{,}0198$, và $\sum_i\hat r_i=0$ khớp phương trình thứ nhất của (4.2).
:::

::: exercise Bài tập 05.2 (Hai đặc trưng trùng nhau)
Cho một mẫu ($n=1$) với hai đặc trưng trùng nhau, $X=(1\ \ 1)\in\mathbb R^{1\times2}$, và nhãn $y=2$.

1. Xác định tập nghiệm của $Xw=y$, hạt nhân $\ker X$ và nghiệm chuẩn nhỏ nhất $w_{\rm mn}$.
2. Với $\lambda>0$, tính nghiệm $w_\lambda$ của (4.6) và giới hạn của nó khi $\lambda\to0$.
3. Tính số điều kiện của $X^TX+n\lambda I$ theo $\lambda$.
:::

::: hint
Hai tọa độ của $w_\lambda$ bằng nhau do tính đối xứng. Ma trận $X^TX=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ có trị riêng $2$ và $0$.
:::

::: solution
1. $Xw=y$ là $w_1+w_2=2$, một đường thẳng trong $\mathbb R^2$. $\ker X=\{t(1,-1):\ t\in\mathbb R\}$. Theo Mệnh đề 05.11, $XX^T=2$ và $w_{\rm mn}=X^T\cdot\tfrac12\cdot2=(1,1)$, điểm của đường thẳng gần gốc nhất; $(1,1)\perp(1,-1)$.

2. Với $n=1$, (4.6) là $\begin{pmatrix}1+\lambda&1\\1&1+\lambda\end{pmatrix}w=\begin{pmatrix}2\\2\end{pmatrix}$. Đặt $w_1=w_2=s$: $(2+\lambda)s=2$, nên $w_\lambda=\tfrac2{2+\lambda}(1,1)$. Khi $\lambda\to0$, $w_\lambda\to(1,1)=w_{\rm mn}$, đúng Nhận xét 05.18.

3. Trị riêng của $X^TX+\lambda I$ là $2+\lambda$ và $\lambda$, nên $\kappa=\tfrac{2+\lambda}\lambda=1+\tfrac2\lambda$. Không chính quy hóa thì $\kappa=\infty$; với $\lambda=0{,}01$, $\kappa=201$.

**Kiểm tra lại.** Công thức $X^T(XX^T+\lambda)^{-1}y=(1,1)\cdot\tfrac2{2+\lambda}$ của Nhận xét 05.18 cho cùng $w_\lambda$.
:::

::: exercise Bài tập 05.3 (Hai đặc trưng gần cộng tuyến)
Hai đặc trưng gần cộng tuyến cho $X^TX=\begin{pmatrix}4&2\\2&1{,}01\end{pmatrix}$.

1. Tính hai trị riêng và $\kappa(X^TX)$.
2. Dùng (4.5) để chặn $\lVert\delta w\rVert$ khi $\lVert\delta y\rVert=0{,}01$.
3. Chứng minh $\lambda_{\min}(X^TX)\le0{,}008$ bằng vector $v=(1,-2)$, và đọc kết quả theo dự đoán của mô hình.
:::

::: hint
Trị riêng của ma trận đối xứng $2\times2$ là nghiệm của $s^2-(\operatorname{tr})s+\det=0$.
:::

::: solution
1. $\operatorname{tr}=5{,}01$ và $\det=4\cdot1{,}01-4=0{,}04$. Nghiệm của $s^2-5{,}01s+0{,}04=0$ là $s=\tfrac{5{,}01\pm\sqrt{25{,}1001-0{,}16}}2=\tfrac{5{,}01\pm4{,}99400}2$, tức $\lambda_{\max}\approx5{,}0020$ và $\lambda_{\min}\approx0{,}0080$. Vậy $\kappa\approx625{,}5$.

2. $1/\sqrt{0{,}0080}\approx11{,}18$, nên $\lVert\delta w\rVert\le11{,}18\cdot0{,}01\approx0{,}112$.

3. Với $v=(1,-2)$, $v^TX^TXv=\lVert Xv\rVert^2=4-8+4{,}04=0{,}04$ và $\lVert v\rVert^2=5$, nên thương Rayleigh bằng $0{,}008$ và $\lambda_{\min}\le0{,}008$. $\lVert Xv\rVert$ nhỏ nghĩa là cột thứ nhất gần bằng hai lần cột thứ hai; theo hướng $v$, thay đổi $w$ hầu như không đổi dự đoán, nên dữ liệu hầu như không ràng buộc $w$ theo hướng đó.

**Kiểm tra lại.** Tích hai trị riêng $5{,}0020\cdot0{,}0080\approx0{,}040=\det$, và $\lambda_{\min}\approx0{,}0080\le0{,}008$ khớp câu 3.
:::

Như vậy, với mất mát bình phương, điểm cực tiểu của $F$ luôn tồn tại, vì $Xw^*$ là hình chiếu trực giao của $y$ lên không gian cột của $X$ (Định lý 00.22); khi $d$ tăng, chỉ tính duy nhất, sai số xác thực và số điều kiện thay đổi. Tuy nhiên, mất mát logistic không có cấu trúc chiếu này, và với nó câu hỏi tồn tại xuất hiện trước câu hỏi duy nhất.

## 5. Hồi quy logistic và chính quy hóa

Trong ví dụ ba điểm, điểm giữa thuộc lớp dương, hai điểm ngoài thuộc lớp âm. Cùng ba điểm này, với hai bộ đặc trưng, cho một bài toán hồi quy logistic có điểm cực tiểu và một bài toán không có.

### 5.1. Ba điểm với hai bộ đặc trưng

Ví dụ sau đặt hai bộ đặc trưng cạnh nhau trên cùng dữ liệu.

::: example Ví dụ 05.10 (Ba điểm $-,+,-$ với hai bộ đặc trưng)
**Dữ kiện.** Ví dụ ba điểm; điểm số của mô hình là $x^Tw$, dự đoán nhãn là dấu của điểm số.

**Đặc trưng $(1,u)$.** Điểm số $w_0+w_1u$ là hàm affine của $u$, nên đổi dấu nhiều nhất một lần khi $u$ đi từ $-1$ tới $1$. Dãy nhãn $-,+,-$ đổi dấu hai lần. Vậy không có $w\in\mathbb R^2$ nào cho điểm số đúng dấu tại cả ba điểm.

**Đặc trưng $(1,u,u^2)$.** Với $\bar w=(1,0,-2)$, điểm số là $1-2u^2$: bằng $-1$ tại $u=\pm1$ và bằng $1$ tại $u=0$, nên đúng dấu tại cả ba điểm.

**Kiểm tra lại.** Ma trận $X=\begin{pmatrix}1&-1&1\\1&0&0\\1&1&1\end{pmatrix}$ khả nghịch và $X\bar w=(-1,1,-1)=y$: điểm số tại các mẫu bằng đúng nhãn. Đây là chế độ nội suy của Mệnh đề 05.10 với $d=n=3$.
:::

![Ba điểm trên trục u: u = −1 nhãn −1, u = 0 nhãn +1, u = 1 nhãn −1. Đường cong điểm số 1 − 2u² đi qua cả ba điểm, dương trên khoảng từ −1/√2 đến 1/√2 (tô nhạt) và âm ngoài khoảng đó.](img/lec-05/lg-three-points.svg)

Tập $\{u:\ 1-2u^2=0\}$ gồm hai điểm $\pm1/\sqrt2$; trong không gian đặc trưng $(1,u,u^2)$, nó là giao của đường cong $(1,u,u^2)$ với mặt phẳng $\{x:\ x^T\bar w=0\}$. Dãy nhãn $-,+,-$ trên một trục là dạng một chiều của bài toán XOR (exclusive or).

### 5.2. Mất mát logistic trung bình

Để so hai bộ đặc trưng, chúng ta cần gradient và Hessian của mất mát logistic ở dạng trung bình và dạng ma trận.

*Biên có dấu* (signed margin, còn gọi là lề có dấu) của mẫu $i$ là $m_i(w)=y_ix_i^Tw$. Nó dương khi mẫu được phân loại đúng và càng lớn khi điểm số càng xa $0$ về phía đúng. Biên có dấu là một số gắn với từng mẫu, khác với biên quyết định (decision boundary) $\{x:\ x^Tw=0\}$, là một tập trong không gian đặc trưng. Với hàm sigmoid $\sigma(z)=1/(1+e^{-z})$, mất mát logistic trung bình là

$$
\begin{aligned}
F(w)&=\frac1n\sum_{i=1}^n\phi\bigl(m_i(w)\bigr),\\
\phi(m)&=\log\bigl(1+e^{-m}\bigr).
\end{aligned}
\tag{5.1}
$$

Vì $\phi>0$, ta có $F(w)>0$ với mọi $w$, và $F(0)=\phi(0)=\log2$ với mọi dữ liệu.

::: proposition Mệnh đề 05.19 (Gradient, Hessian và độ cong của mất mát logistic) — chứng minh đầy đủ
**Giả thiết.** $F$ cho bởi (5.1) với $y_i\in\{-1,+1\}$ và $X\in\mathbb R^{n\times d}$.

**Kết luận.**

$$
\begin{aligned}
&\nabla F(w)\\
&\quad=-\frac1n\sum_i\sigma\bigl(-m_i(w)\bigr)\\
&\qquad\cdot y_ix_i,\\
&\nabla^2F(w)=\frac1nX^TS(w)X,
\end{aligned}
\tag{5.2}
$$

với $S(w)=\operatorname{diag}\bigl(\sigma(m_i)\sigma(-m_i)\bigr)$ và $0<S_{ii}\le\tfrac14$. Do đó $F$ lồi và

$$
\begin{aligned}
0&\preceq\nabla^2F(w)\\
&\preceq\frac1{4n}X^TX\quad\forall w\in\mathbb R^d .
\end{aligned}
\tag{5.3}
$$
:::

::: proof Chứng minh Mệnh đề 05.19
**Lộ trình.** Đạo hàm $\phi$ hai lần, áp quy tắc dây chuyền qua $m_i=y_ix_i^Tw$, rồi chặn $S_{ii}$.

**Bước 1 (đạo hàm của $\phi$).** Theo Mệnh đề 01.8, $\phi'(m)=-1/(1+e^m)=-\sigma(-m)$. Đạo hàm tiếp, $\phi''(m)=\sigma'(-m)=\sigma(-m)\bigl(1-\sigma(-m)\bigr)=\sigma(-m)\sigma(m)$, ở đây dùng $\sigma'(z)=\sigma(z)(1-\sigma(z))$ và $1-\sigma(-m)=\sigma(m)$.

**Bước 2 (quy tắc dây chuyền).** $\nabla_wm_i=y_ix_i$. Do đó $\nabla\phi(m_i)=\phi'(m_i)y_ix_i=-\sigma(-m_i)y_ix_i$, và $\nabla^2\phi(m_i)=\phi''(m_i)\,y_i^2x_ix_i^T=\sigma(m_i)\sigma(-m_i)\,x_ix_i^T$ vì $y_i^2=1$. Lấy trung bình theo $i$ cho (5.2), với $\sum_iS_{ii}x_ix_i^T=X^TSX$.

**Bước 3 (cận của $S_{ii}$).** Đặt $s=\sigma(m_i)\in(0,1)$. Khi đó $S_{ii}=s(1-s)>0$, và $s(1-s)=\tfrac14-(s-\tfrac12)^2\le\tfrac14$, với dấu bằng khi $m_i=0$.

**Bước 4 (cận Hessian).** Với mọi $v$, $v^TX^TSXv=\sum_iS_{ii}(x_i^Tv)^2$ nằm giữa $0$ và $\tfrac14\sum_i(x_i^Tv)^2=\tfrac14v^TX^TXv$. Chia cho $n$ cho (5.3); vế trái cho $F$ lồi. $\square$
:::

Cận trên trong (5.3) đạt khi mọi biên bằng $0$, tức khi $Xw=0$, chẳng hạn tại $w=0$. Vì $S_{ii}\to0$ khi $\lvert m_i\rvert\to\infty$, độ cong của $F$ có thể nhỏ tùy ý theo một số hướng, và $F$ không lồi mạnh với hằng số dương nào trên toàn $\mathbb R^d$.

### 5.3. Mất mát dọc một tia và tính tách được

Với bộ đặc trưng $(1,u,u^2)$ của Ví dụ 05.10, mọi biên tại $\bar w$ bằng $y_i^2=1$. Nhân $\bar w$ với $t>0$ nhân mọi biên với $t$, nên ta có thể tính $F$ dọc tia $t\bar w$.

::: example Ví dụ 05.11 (Mất mát dọc tia $t\bar w$ với đặc trưng $(1,u,u^2)$)
**Dữ kiện.** Ví dụ ba điểm, đặc trưng $(1,u,u^2)$, $\bar w=(1,0,-2)$ với $m_i(\bar w)=1$ cho cả ba mẫu.

**Tính.** $m_i(t\bar w)=t$, nên mọi số hạng của (5.1) bằng $\phi(t)$ và $F(t\bar w)=\log(1+e^{-t})$:

| $t$ | $0$ | $1$ | $2$ | $5$ | $10$ |
|---|---:|---:|---:|---:|---:|
| $F(t\bar w)$ | $0{,}6931$ | $0{,}3133$ | $0{,}1269$ | $0{,}00672$ | $4{,}54\cdot10^{-5}$ |

**Đọc bảng.** $F(t\bar w)$ giảm chặt theo $t$ và tiến về $0$, nhưng dương với mọi $t$ hữu hạn.

**Kiểm tra lại.** Với $t$ lớn, $\log(1+e^{-t})\approx e^{-t}$; tại $t=10$, $e^{-10}=4{,}540\cdot10^{-5}$, khớp bảng.
:::

![Đường F(t w̄) = log(1 + e mũ −t) với t từ 0 đến 10 giảm về 0 nhưng không đạt 0: 0,693 tại t = 0; 0,313 tại t = 1; 0,0067 tại t = 5; 4,5·10⁻⁵ tại t = 10. Đường nét đứt ở mức 0 là inf F, không đạt.](img/lec-05/lg-loss-along-ray.svg)

Đường cong $F(t\bar w)$ tiệm cận mức $0$ từ phía trên. Nếu $F$ có điểm cực tiểu $w^*$, giá trị $F(w^*)$ phải không lớn hơn mọi giá trị trên đường cong, tức không lớn hơn $0$; điều này mâu thuẫn với $F>0$. Với bộ đặc trưng $(1,u)$, kết luận ngược lại.

::: example Ví dụ 05.12 (Điểm cực tiểu với đặc trưng $(1,u)$)
**Dữ kiện.** Ví dụ ba điểm, đặc trưng $(1,u)$, $n=3$. Ba biên là $m_1=w_1-w_0$, $m_2=w_0$, $m_3=-w_0-w_1$.

**Rút gọn bằng đối xứng.** Đổi $w_1$ thành $-w_1$ hoán đổi $m_1$ và $m_3$, nên $F(w_0,w_1)=F(w_0,-w_1)$. Vì $F$ lồi, $F(w_0,0)\le\tfrac12\bigl[F(w_0,w_1)+F(w_0,-w_1)\bigr]=F(w_0,w_1)$, nên ta chỉ cần cực tiểu hóa theo $w_0$ với $w_1=0$. Khi đó $F(w_0,0)=\tfrac13\bigl[2\phi(-w_0)+\phi(w_0)\bigr]$.

**Điều kiện bậc nhất.** Dùng $\phi'(m)=-\sigma(-m)$,

$$
\begin{aligned}
&\tfrac{\partial F}{\partial w_0}(w_0,0)=0\\
&\iff2\sigma(w_0)-\sigma(-w_0)=0\\
&\iff3\sigma(w_0)=1\\
&\iff\sigma(w_0)=\tfrac13 .
\end{aligned}
$$

Phép tương đương thứ hai dùng $\sigma(-w_0)=1-\sigma(w_0)$. Vậy $w_0=-\log2$, và giá trị nhỏ nhất là $F^*=\tfrac13\bigl[2\log\tfrac32+\log3\bigr]=\tfrac13\log\tfrac{27}4\approx0{,}6365$.

**Kiểm tra lại.** Tại $w^*=(-\log2,0)$, mọi biên bằng $\pm\log2$, nên $S_{ii}=\sigma(\log2)\sigma(-\log2)=\tfrac23\cdot\tfrac13=\tfrac29$. Theo (5.2), $\nabla^2F(w^*)=\tfrac13\cdot\tfrac29\cdot X^TX=\tfrac2{27}\operatorname{diag}(3,2)\succ0$, nên $w^*$ là điểm cực tiểu chặt.
:::

Điều phân biệt hai bộ đặc trưng là việc có hay không một $\bar w$ với mọi biên dương. Để làm rõ tính chất đó, xem định nghĩa sau.

::: definition Định nghĩa 05.20 (Tách được tuyến tính)
Dữ liệu $\{(x_i,y_i)\}_{i=1}^n$ với $x_i\in\mathbb R^d$ và $y_i\in\{-1,+1\}$ *tách được tuyến tính* (linearly separable) trong không gian đặc trưng nếu tồn tại $\bar w\in\mathbb R^d$ với

$$
\begin{aligned}
m_i(\bar w)&=y_ix_i^T\bar w>0\\
&\forall i=1,\ldots,n .
\end{aligned}
$$
:::

Về mặt hình học, biên có dấu dương tại mọi mẫu nghĩa là siêu phẳng $\{x:\ x^T\bar w=0\}$ đặt mọi mẫu nhãn $+1$ về một phía và mọi mẫu nhãn $-1$ về phía kia. Vì tọa độ đầu của $x$ bằng $1$, siêu phẳng này có hệ số chặn $\bar w_0$ và không bắt buộc đi qua gốc của không gian đầu vào.

Tách được là tính chất của cả $X$ lẫn $y$, và của bộ đặc trưng. Mệnh đề sau nối tính tách được với chế độ nội suy của Mệnh đề 05.10.

::: proposition Mệnh đề 05.21 (Hạng đầy đủ theo hàng kéo theo tách được) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{n\times d}$ với $\operatorname{rank}X=n$.

**Kết luận.** Với mọi $y\in\{-1,+1\}^n$, dữ liệu $\{(x_i,y_i)\}$ tách được tuyến tính.
:::

::: proof Chứng minh Mệnh đề 05.21
Theo Mệnh đề 05.10 áp cho vector nhãn $y$, có $\bar w$ với $X\bar w=y$, tức $x_i^T\bar w=y_i$ với mọi $i$. Khi đó $m_i(\bar w)=y_i\cdot y_i=y_i^2=1>0$ với mọi $i$. $\square$
:::

Với năm nút của ví dụ năm mẫu và đặc trưng đa thức $d=5$, $X_5$ khả nghịch, nên mọi cách gán nhãn $\pm1$ cho năm điểm đó đều tách được. Điều kiện hạng là điều kiện đủ; chiều ngược lại sai: bốn điểm $u=(-3,-1,2,4)$ với nhãn $(-1,-1,+1,+1)$ và đặc trưng $(1,u)$ tách được bởi $\bar w=(0,1)$, với các biên $3,1,2,4$, dù $d=2<n=4$.

### 5.4. Sự không tồn tại điểm cực tiểu trên dữ liệu tách được

Theo Ví dụ 05.11, trên dữ liệu tách được, mất mát logistic tiến về $0$ dọc tia $t\bar w$ mà không đạt $0$. Định lý sau chứng minh điều đó cho mọi dữ liệu tách được, và thêm một kết luận về mọi dãy làm $F$ nhỏ dần.

::: theorem Định lý 05.22 (Mất mát logistic không có điểm cực tiểu trên dữ liệu tách được) — chứng minh đầy đủ
**Giả thiết.** $F$ là mất mát logistic trung bình (5.1); dữ liệu tách được tuyến tính bởi $\bar w$.

**Kết luận.**

1. $\inf_{w\in\mathbb R^d}F(w)=0$, và không $w$ nào đạt giá trị này.
2. Mọi dãy $(w_k)$ với $F(w_k)\to0$ có $\lVert w_k\rVert\to\infty$.
:::

::: proof Chứng minh Định lý 05.22
**Lộ trình.** Tính dương của $\phi$ cho $F>0$; tính giảm của $\phi$ dọc tia $t\bar w$ cho $\inf F=0$; định lý Weierstrass (Định lý 01.35) trên hình cầu đóng cho dãy cực tiểu hóa phân kỳ.

**Bước 1 ($F>0$).** Mỗi số hạng $\phi(m_i(w))=\log(1+e^{-m_i(w)})$ dương, vì $1+e^{-m}>1$. Vậy $F(w)>0$ với mọi $w$, và $0$ là một cận dưới của $F$.

**Bước 2 ($\inf F=0$).** Đặt $\gamma=\min_im_i(\bar w)>0$. Với $t>0$, $m_i(t\bar w)=t\,m_i(\bar w)\ge t\gamma$. Vì $\phi$ giảm, mỗi số hạng thỏa $\phi(m_i(t\bar w))\le\phi(t\gamma)$, nên trung bình cũng vậy:

$$
\begin{aligned}
0&<F(t\bar w)\\
&\le\log\bigl(1+e^{-t\gamma}\bigr)\xrightarrow[t\to\infty]{}0 .
\end{aligned}
$$

Do đó $\inf F=0$. Theo Bước 1, không $w$ nào cho $F(w)=0$, nên cận dưới đúng không đạt. Đó là kết luận 1.

**Bước 3 (dãy cực tiểu hóa phân kỳ).** Cố định $a>0$. Hình cầu đóng $B_a=\{w:\ \lVert w\rVert\le a\}$ không rỗng, đóng và bị chặn, và $F$ liên tục, nên theo Định lý 01.35, $F$ đạt giá trị nhỏ nhất $c_a$ trên $B_a$; theo Bước 1, $c_a>0$. Vì $F(w_k)\to0$, có $k_0$ để $F(w_k)<c_a$ với mọi $k\ge k_0$, và khi đó $w_k\notin B_a$, tức $\lVert w_k\rVert>a$. Vì $a$ tùy ý, $\lVert w_k\rVert\to\infty$. Đó là kết luận 2. $\square$
:::

Một bài toán học lồi có thể không có điểm cực tiểu; tính tách được của dữ liệu quyết định điều đó. Tính lồi, thậm chí lồi chặt, không bảo đảm sự tồn tại điểm cực tiểu (Nhận xét 01.43); ở đây độ cong của $F$ tiến về $0$ theo hướng $\bar w$ (Mệnh đề 05.19), nên $F$ tiếp tục giảm khi $w$ đi ra vô cùng theo hướng $\bar w$. Ví dụ 01.7 của Bài 01, với hai mẫu một chiều, là trường hợp $d=1$ của định lý.

Ghép Định lý 05.22 với Mệnh đề 05.21 cho một hệ quả về số chiều: khi $\operatorname{rank}X=n$, mất mát logistic không chính quy hóa không có điểm cực tiểu với mọi cách gán nhãn. Hệ quả sau mô tả điều hạ gradient làm trong tình huống đó.

::: corollary Hệ quả 05.23 (Hạ gradient trên dữ liệu tách được) — chứng minh đầy đủ
**Giả thiết.**

- **Dữ liệu.** Tách được tuyến tính; $X\ne0$.
- **Hàm.** $F$ là (5.1); $L=\lambda_{\max}(X^TX)/(4n)$.
- **Thuật toán.** $w_{k+1}=w_k-\eta\nabla F(w_k)$ với $0<\eta\le\tfrac1L$, từ một điểm đầu tùy ý.

**Kết luận.** $F(w_k)\to0$ và $\lVert w_k\rVert\to\infty$.
:::

::: proof Chứng minh Hệ quả 05.23
**Lộ trình.** Kiểm giả thiết của Hệ quả 05b.17, rồi dùng hai kết luận của Định lý 05.22.

**Bước 1 (giả thiết của Hệ quả 05b.17).** $F$ lồi theo Mệnh đề 05.19. Theo (5.3), $\nabla^2F\preceq LI$, nên gradient $L$-Lipschitz (Nhận xét 04.20).

**Bước 2 (giá trị hội tụ).** Hệ quả 05b.17 cho $F(w_k)\to\inf F$, và $\inf F=0$ theo Định lý 05.22.

**Bước 3 (chuẩn phân kỳ).** Áp kết luận 2 của Định lý 05.22 cho dãy $(w_k)$. $\square$
:::

**Trong học máy.** *Hạ gradient ngẫu nhiên* (stochastic gradient descent, SGD) là hạ gradient dùng ở mỗi bước gradient trên một *lô nhỏ* (mini-batch) mẫu chọn ngẫu nhiên. Trên dữ liệu tách được, huấn luyện hồi quy logistic không chính quy hóa bằng hạ gradient hoặc SGD làm chuẩn tham số tăng mãi, và trên máy tính, chuẩn trọng số cuối cùng đủ lớn để gây tràn số (overflow) (Goodfellow và cộng sự 2016, §7.3, tr. 239).

### 5.5. Điều kiện đủ cho sự tồn tại điểm cực tiểu

Trước khi sửa mục tiêu bằng số hạng phạt, chúng ta cần biết trường hợp nào vẫn có điểm cực tiểu, như Ví dụ 05.12. Theo Định nghĩa 01.37, hàm $f:\mathbb R^d\to\mathbb R$ là cưỡng bức (coercive) nếu $f(w)\to+\infty$ khi $\lVert w\rVert\to\infty$.

Mất mát logistic trên dữ liệu tách được không cưỡng bức, vì $F(t\bar w)\to0$ khi $t\to\infty$ (Định lý 05.22). Theo Định lý 01.38, hàm liên tục và cưỡng bức trên $\mathbb R^d$ đạt giá trị nhỏ nhất, nên chỉ cần một điều kiện trên dữ liệu bảo đảm $F$ cưỡng bức. Mệnh đề sau cho điều kiện đó.

::: proposition Mệnh đề 05.24 (Điều kiện đủ cho tính cưỡng bức của mất mát logistic) — chứng minh đầy đủ
**Giả thiết.** $F$ là (5.1), và với mọi $w\ne0$ tồn tại $i$ với $m_i(w)<0$.

**Kết luận.** Tồn tại $c>0$ với

$$
F(w)\ge\frac cn\lVert w\rVert\quad\forall w,
\tag{5.4}
$$

nên $F$ cưỡng bức và có điểm cực tiểu trên $\mathbb R^d$.
:::

::: proof Chứng minh Mệnh đề 05.24
**Lộ trình.** Hàm $h(v)=\max_i(-m_i(v))$ dương trên mặt cầu đơn vị nên có cực tiểu dương $c$; tính tuyến tính của biên cho cận (5.4).

**Bước 1 (hàm phân loại sai lớn nhất).** Đặt $h(v)=\max_i\bigl(-m_i(v)\bigr)$. Mỗi $-m_i(v)=-y_ix_i^Tv$ là hàm tuyến tính, nên liên tục, và giá trị lớn nhất của hữu hạn hàm liên tục là hàm liên tục.

**Bước 2 (hằng số $c$).** Trên mặt cầu đơn vị $\{v:\ \lVert v\rVert=1\}$, giả thiết cho mỗi $v$ một chỉ số $i$ với $-m_i(v)>0$, nên $h(v)>0$. Mặt cầu đơn vị không rỗng, đóng và bị chặn, nên theo Định lý 01.35, $h$ đạt giá trị nhỏ nhất $c$ trên đó, và $c>0$.

**Bước 3 (cận dưới (5.4)).** Với $w\ne0$, viết $w=\lVert w\rVert v$ với $\lVert v\rVert=1$, và chọn $i$ với $-m_i(v)=h(v)\ge c$. Vì $m_i$ tuyến tính, $-m_i(w)=\lVert w\rVert\bigl(-m_i(v)\bigr)\ge c\lVert w\rVert$. Mọi số hạng của (5.1) dương, nên $F(w)$ không nhỏ hơn số hạng thứ $i$ chia $n$:

$$
\begin{aligned}
F(w)&\ge\tfrac1n\log\bigl(1+e^{-m_i(w)}\bigr)\\
&\ge\tfrac1n\log\bigl(1+e^{c\lVert w\rVert}\bigr)&&\text{(a)}\\
&\ge\frac cn\lVert w\rVert&&\text{(b)}.
\end{aligned}
$$

Bất đẳng thức (a) dùng tính giảm của $\phi$ và $m_i(w)\le-c\lVert w\rVert$; bất đẳng thức (b) dùng $\log(1+e^s)\ge s$. Với $w=0$, (5.4) đúng vì $F(0)=\log2>0$.

**Bước 4 (tồn tại điểm cực tiểu).** Theo (5.4), $F(w)\to\infty$ khi $\lVert w\rVert\to\infty$, tức $F$ cưỡng bức. $F$ liên tục, nên Định lý 01.38 cho $F$ đạt giá trị nhỏ nhất trên $\mathbb R^d$. $\square$
:::

Giả thiết của mệnh đề nói rằng mọi hướng khác $0$ phân loại sai ít nhất một mẫu với biên âm chặt. Giả thiết này kéo theo $\operatorname{rank}X=d$: nếu $Xv=0$ với $v\ne0$ thì mọi $m_i(v)=0$, trái giả thiết. Do đó $Xv\ne0$ với mọi $v\ne0$, nên $v^T\nabla^2F(w)v=\frac1n\sum_iS_{ii}(x_i^Tv)^2>0$ vì mọi $S_{ii}>0$. Hessian xác định dương ở mọi điểm, nên $F$ lồi chặt, và điểm cực tiểu của Mệnh đề 05.24 là duy nhất (Định lý 01.34).

Áp mệnh đề cho Ví dụ 05.12: ba biên là $m_1=w_1-w_0$, $m_2=w_0$, $m_3=-w_0-w_1$. Nếu cả ba không âm thì $w_1\ge w_0\ge0$ và $w_1\le-w_0\le0$, nên $w_0=w_1=0$. Vậy mọi $w\ne0$ có ít nhất một biên âm, giả thiết thỏa, và điểm cực tiểu tìm được ở Ví dụ 05.12 là điều mệnh đề bảo đảm.

::: remark Nhận xét 05.25 (Trường hợp ranh giới)
Định lý 05.22 và Mệnh đề 05.24 để lại *trường hợp ranh giới*: không có $\bar w$ với mọi $m_i(\bar w)>0$, nhưng có $w\ne0$ với mọi $m_i(w)\ge0$. Ở trường hợp này, điểm cực tiểu có thể không tồn tại. Chẳng hạn, với đặc trưng $(1,u)$, xét bốn mẫu

- $(u_1,y_1)=(-1,-1)$;
- $(u_2,y_2)=(0,+1)$;
- $(u_3,y_3)=(0,-1)$;
- $(u_4,y_4)=(1,+1)$.

Bốn biên là $m(w)=(w_1-w_0,\ w_0,\ -w_0,\ w_0+w_1)$. Hai mẫu tại $u=0$ có nhãn trái dấu, nên không có $\bar w$ với mọi biên dương; $w=(0,1)$ cho biên $(1,0,0,1)$, đều không âm. Hai mẫu tại $u=0$ đóng góp

$$
\begin{aligned}
&\phi(w_0)+\phi(-w_0)\\
&=\log\bigl(2+e^{w_0}+e^{-w_0}\bigr)\\
&\ge\log4,
\end{aligned}
$$

và hai số hạng còn lại dương, nên $F(w)>\tfrac14\log4=\tfrac12\log2$ với mọi $w$. Dọc $w=(0,t)$, $F(0,t)=\tfrac12\phi(t)+\tfrac12\log2\to\tfrac12\log2\approx0{,}3466$ khi $t\to\infty$; chẳng hạn $F(0,1)=0{,}5032$, $F(0,5)=0{,}3499$, $F(0,10)=0{,}34660$. Vậy cận dưới đúng $\inf F=\tfrac12\log2$ không đạt, và $F$ không có điểm cực tiểu.
:::

### 5.6. Chính quy hóa bậc hai và tính lồi mạnh

Về mặt ý tưởng, số hạng phạt $\frac\lambda2\lVert w\rVert^2$ chặn đường đi ra vô cùng: mất mát logistic giảm không quá $\log2$ khi $w$ đi ra xa, còn số hạng phạt tăng như bình phương khoảng cách. Ví dụ sau tính điều này trên tia $t\bar w$.

::: example Ví dụ 05.13 (Số hạng phạt dọc tia $t\bar w$)
**Dữ kiện.** Ví dụ ba điểm, đặc trưng $(1,u,u^2)$, $\bar w=(1,0,-2)$, $F(t\bar w)=\log(1+e^{-t})$ (Ví dụ 05.11). Mục tiêu $F_\lambda=F+\frac\lambda2\lVert w\rVert^2$.

**Hàm dọc tia.** $\lVert\bar w\rVert^2=1+0+4=5$, nên

$$
F_\lambda(t\bar w)=\log\bigl(1+e^{-t}\bigr)+\frac{5\lambda}2t^2 .
$$

**Cực tiểu dọc tia.** Đạo hàm theo $t$ là $-\sigma(-t)+5\lambda t$, nên điểm dừng thỏa $\frac1{1+e^t}=5\lambda t$. Giải số: với $\lambda=0{,}01$, $t^*=2{,}128$ và giá trị $0{,}2257$; với $\lambda=0{,}1$, $t^*=0{,}6748$ và giá trị $0{,}5255$.

**Kiểm tra lại.** Với $\lambda=0{,}01$: $5\lambda t^*=0{,}05\cdot2{,}128=0{,}1064$ và $1/(1+e^{2{,}128})=1/(1+8{,}398)=0{,}1064$.
:::

![Ba đường theo t từ 0 đến 6. Nét liền: log(1 + e mũ −t) giảm về 0. Nét đứt: thêm 0,025t² (λ = 0,01), cực tiểu tại t* = 2,128, giá trị 0,2257. Chấm gạch: thêm 0,25t² (λ = 0,1), cực tiểu tại t* = 0,6748, giá trị 0,5255.](img/lec-05/lg-penalty-along-ray.svg)

Không có số hạng phạt, $F(t\bar w)$ giảm mãi; có số hạng phạt, hàm dọc tia đi xuống rồi đi lên lại, với đáy dịch về gần gốc khi $\lambda$ tăng. Cực tiểu dọc một tia chưa phải cực tiểu của $F_\lambda$ trên $\mathbb R^3$. Để kết luận cho mọi hướng và mọi dữ liệu, chúng ta cần một phát biểu dựa trên Hessian.

Định lý sau dùng Hệ quả 01.41 (hàm khả vi lồi mạnh có đúng một điểm cực tiểu) và Mệnh đề 05.19 (mất mát logistic lồi).

::: theorem Định lý 05.26 (Tính lồi mạnh của mục tiêu có chính quy hóa bậc hai) — chứng minh đầy đủ
**Giả thiết.** $F$ là mất mát bình phương hoặc mất mát logistic trung bình (Định nghĩa 05.1); $\lambda>0$; $F_\lambda(w)=F(w)+\frac\lambda2\lVert w\rVert^2$.

**Kết luận.**

1. $\nabla^2F_\lambda(w)\succeq\lambda I$ với mọi $w$, tức $F_\lambda$ lồi mạnh với hằng số $\mu=\lambda$.
2. $F_\lambda$ có đúng một điểm cực tiểu $w_\lambda$, đặc trưng bởi

$$
\lambda w_\lambda=-\nabla F(w_\lambda).
\tag{5.5}
$$

3. $\lVert w_\lambda\rVert^2\le2F(0)/\lambda$; với mất mát logistic, $\lVert w_\lambda\rVert\le\sqrt{2\log2/\lambda}$.
:::

::: proof Chứng minh Định lý 05.26
**Lộ trình.** Hessian của số hạng phạt cho lồi mạnh; Hệ quả 01.41 cho nghiệm duy nhất; so với điểm $w=0$ cho cận chuẩn.

**Bước 1 (lồi mạnh).** $\nabla^2F\succeq0$ theo Mệnh đề 05.3 (mất mát bình phương) hoặc Mệnh đề 05.19 (mất mát logistic), và Hessian của $\frac\lambda2\lVert w\rVert^2$ là $\lambda I$. Vậy $\nabla^2F_\lambda=\nabla^2F+\lambda I\succeq\lambda I$, và theo Nhận xét 01.40, $F_\lambda$ lồi mạnh với hằng số $\lambda$. Đó là kết luận 1.

**Bước 2 (tồn tại, duy nhất, điều kiện bậc nhất).** Hệ quả 01.41 cho $F_\lambda$ đúng một điểm cực tiểu $w_\lambda$ (với mất mát logistic, đây cũng là Mệnh đề 01.46(b)). Hàm $F_\lambda$ lồi và khả vi, nên $w_\lambda$ là điểm cực tiểu khi và chỉ khi $\nabla F_\lambda(w_\lambda)=\nabla F(w_\lambda)+\lambda w_\lambda=0$, tức (5.5). Đó là kết luận 2.

**Bước 3 (cận chuẩn).** Cả hai mất mát không âm, nên $F(w_\lambda)\ge0$. So sánh với điểm $w=0$:

$$
\begin{aligned}
\tfrac\lambda2\lVert w_\lambda\rVert^2&\le F(w_\lambda)+\tfrac\lambda2\lVert w_\lambda\rVert^2&&\text{(a)}\\&=F_\lambda(w_\lambda)\\&\le F_\lambda(0)&&\text{(b)}\\&=F(0).
\end{aligned}
$$

Bất đẳng thức (a) dùng $F\ge0$; bất đẳng thức (b) dùng việc $w_\lambda$ là điểm cực tiểu của $F_\lambda$. Với mất mát logistic, $F(0)=\log2$. Đó là kết luận 3. $\square$
:::

Định lý cho điểm cực tiểu với mọi dữ liệu và mọi $d$, kể cả dữ liệu tách được và $d>n$; với mất mát bình phương, nó cho lại Mệnh đề 05.17(1). Đổi lại, $w_\lambda$ không cực tiểu hóa $F$, và mức khác nhau do $\lambda$ quyết định. Với mất mát logistic, $F(0)=\log2$ không phụ thuộc dữ liệu, nên cận $\sqrt{2\log2/\lambda}$ đúng với mọi $X$, $y$, $n$, $d$. Với mất mát bình phương, $F(0)=\frac1{2n}\lVert y\rVert^2$ phụ thuộc nhãn. Ví dụ sau tính $w_\lambda$ trên ví dụ một mẫu.

::: example Ví dụ 05.14 (Đường nghiệm của một mẫu)
**Dữ kiện.** Ví dụ một mẫu. Theo (5.5), $w_\lambda$ thỏa $\lambda w=\sigma(-w)=\frac1{1+e^w}$.

**Tính.** Giải số phương trình trên bằng phương pháp Newton:

| $\lambda$ | $0{,}5$ | $0{,}05$ | $0{,}005$ | $0{,}0005$ |
|---|---:|---:|---:|---:|
| $w_\lambda$ | $0{,}6748$ | $2{,}1280$ | $3{,}9140$ | $5{,}8342$ |
| $\sigma(w_\lambda)$ | $0{,}663$ | $0{,}894$ | $0{,}980$ | $0{,}997$ |
| $\sqrt{2\log2/\lambda}$ | $1{,}665$ | $5{,}266$ | $16{,}65$ | $52{,}66$ |

**Kiểm tra lại.** Với $\lambda=0{,}05$: $0{,}05\cdot2{,}128=0{,}1064$ và $1/(1+e^{2{,}128})=0{,}1064$. Mọi $w_\lambda$ nằm dưới cận ở hàng cuối, đúng kết luận 3 của Định lý 05.26.

**Đối chiếu Bài 01.** Hai mẫu của Ví dụ 01.7 có cùng biên $w$, nên trung bình mất mát của chúng là đúng hàm trên. Theo Nhận xét 05.2, $\lambda=\mu/2$, nên ba giá trị đầu của hàng $w_\lambda$ trùng các nghiệm $w^*_\mu$ với $\mu=1;\ 0{,}1;\ 0{,}01$ của Tình huống 01.1.
:::

Khi $\lambda$ giảm, $w_\lambda$ tăng và xác suất dự đoán $\sigma(w_\lambda)$ tiến về $1$, tức nghiệm tiến gần hành vi của bài toán không chính quy hóa trên dữ liệu tách được. Hệ quả sau chứng minh rằng điều này xảy ra trên mọi dữ liệu tách được.

::: corollary Hệ quả 05.27 (Chuẩn nghiệm tăng không bị chặn khi $\lambda\to0$) — chứng minh đầy đủ
**Giả thiết.** Dữ liệu tách được tuyến tính bởi $\bar w$; $F$ là (5.1); $w_\lambda$ là điểm cực tiểu của $F_\lambda$.

**Kết luận.** $F(w_\lambda)\to0$ và $\lVert w_\lambda\rVert\to\infty$ khi $\lambda\to0^+$.
:::

::: proof Chứng minh Hệ quả 05.27
**Lộ trình.** So $F_\lambda(w_\lambda)$ với giá trị trên tia $t\bar w$, rồi dùng lại hai bước của chứng minh Định lý 05.22.

**Bước 1 (chặn trên $F(w_\lambda)$).** Với mọi $t>0$, vì $w_\lambda$ cực tiểu hóa $F_\lambda$ và số hạng phạt không âm,

$$
\begin{aligned}
F(w_\lambda)&\le F_\lambda(w_\lambda)\\&\le F_\lambda(t\bar w)\\&=F(t\bar w)+\frac\lambda2t^2\lVert\bar w\rVert^2 .
\end{aligned}
$$

**Bước 2 ($F(w_\lambda)\to0$).** Cho $c_0>0$. Theo Bước 2 của chứng minh Định lý 05.22, có $t$ với $F(t\bar w)<c_0/2$. Với $t$ đó cố định, mọi $\lambda<c_0/(t^2\lVert\bar w\rVert^2)$ cho $\frac\lambda2t^2\lVert\bar w\rVert^2<c_0/2$. Vậy $0<F(w_\lambda)<c_0$ với mọi $\lambda$ đủ nhỏ.

**Bước 3 (chuẩn phân kỳ).** Lập luận của Bước 3 trong chứng minh Định lý 05.22 áp cho họ $w_\lambda$ thay cho dãy $w_k$: với mỗi $a>0$, khi $F(w_\lambda)<c_a$ thì $\lVert w_\lambda\rVert>a$. $\square$
:::

### 5.7. Hằng số trơn và số điều kiện của mục tiêu có chính quy hóa

Định lý 05.26 cho hằng số lồi mạnh $\mu=\lambda$. Để có số điều kiện, và vì vậy số bước của hạ gradient theo Định lý 04.27, còn thiếu cận trên của Hessian. Ví dụ sau tính hai cận đó trên ví dụ một mẫu.

::: example Ví dụ 05.15 (Độ cong của mục tiêu một chiều)
**Dữ kiện.** Ví dụ một mẫu.

**Độ cong.** Theo Mệnh đề 05.19 với $n=d=1$,

$$
\begin{aligned}
F_\lambda''(w)&=\sigma(w)\sigma(-w)+\lambda\\
&\in(\lambda,\ \tfrac14+\lambda],
\end{aligned}
$$

với giá trị lớn nhất $\tfrac14+\lambda$ tại $w=0$ và giá trị tiến về $\lambda$ khi $\lvert w\rvert\to\infty$.

**Số điều kiện.** Với $L=\tfrac14+\lambda$ và $\mu=\lambda$, $\kappa=\frac{1/4+\lambda}\lambda$ bằng $1{,}5;\ 6;\ 51;\ 501$ khi $\lambda=0{,}5;\ 0{,}05;\ 0{,}005;\ 0{,}0005$.

**Kiểm tra lại.** Với $\lambda=0{,}05$: $\kappa=0{,}30/0{,}05=6$.
:::

![Đường độ cong σ(w)σ(−w) + λ với λ = 0,05, w từ −8 đến 8: lớn nhất 0,30 = 1/4 + λ tại w = 0 (nét đứt L), giảm về 0,05 = λ khi |w| lớn (đường chấm μ).](img/lec-05/lg-curvature-1d.svg)

Khi $\lambda$ giảm, cận dưới giảm theo còn cận trên gần như giữ nguyên, nên $\kappa$ tăng theo $1/\lambda$. Mệnh đề sau tổng quát hóa ví dụ cho mọi dữ liệu.

::: proposition Mệnh đề 05.28 (Hằng số trơn và số điều kiện của hồi quy logistic có chính quy hóa) — chứng minh đầy đủ
**Giả thiết.** $F$ là mất mát logistic trung bình (5.1); $\lambda>0$.

**Kết luận.** Với mọi $w$, $\mu I\preceq\nabla^2F_\lambda(w)\preceq LI$, trong đó

$$
\begin{aligned}
\mu&=\lambda,\\
L&=\tfrac{\lambda_{\max}(X^TX)}{4n}+\lambda,\\
\kappa&=\tfrac L\mu=1+\tfrac{\lambda_{\max}(X^TX)}{4n\lambda}.
\end{aligned}
\tag{5.6}
$$

Nếu thêm $\lVert x_i\rVert\le r$ với mọi $i$, thì $L\le\frac{r^2}4+\lambda$ và $\kappa\le1+\frac{r^2}{4\lambda}$.
:::

::: proof Chứng minh Mệnh đề 05.28
**Lộ trình.** Cộng $\lambda I$ vào cận Hessian (5.3); chặn $\lambda_{\max}$ bằng vết.

**Bước 1 (hai cận Hessian).** $\nabla^2F_\lambda=\frac1nX^TSX+\lambda I$. Theo (5.3), $0\preceq\frac1nX^TSX\preceq\frac1{4n}X^TX\preceq\frac{\lambda_{\max}(X^TX)}{4n}I$, cận cuối theo thương Rayleigh. Cộng $\lambda I$ vào ba vế cho $\lambda I\preceq\nabla^2F_\lambda\preceq LI$ với $L$ trong (5.6).

**Bước 2 (cận theo $r$).** Trị riêng lớn nhất của $X^TX\succeq0$ không vượt tổng các trị riêng, tức vết:

$$
\begin{aligned}
\lambda_{\max}(X^TX)&\le\operatorname{tr}X^TX\\&=\sum_{i=1}^n\lVert x_i\rVert^2\\&\le nr^2 .
\end{aligned}
$$

Thay vào (5.6) cho $L\le\frac{r^2}4+\lambda$ và $\kappa\le1+\frac{r^2}{4\lambda}$. $\square$
:::

Theo Mệnh đề 05.28, $F_\lambda$ thỏa giả thiết của Định lý 04.27 với $L$, $\mu$ trong (5.6), nên hạ gradient với bước $\frac1L$ có $e_k\le(1-\frac1\kappa)^ke_0$. Cận $\kappa\le1+r^2/(4\lambda)$ cho thấy số điều kiện tăng theo $1/\lambda$, nhanh như ví dụ một mẫu.

Vì tọa độ đầu của $x_i$ bằng $1$, luôn có $\lVert x_i\rVert\ge1$, tức $r\ge1$; dấu bằng xảy ra khi mọi tọa độ khác của $x_i$ bằng $0$, như ví dụ một mẫu. Khi phần còn lại của $x_i$ có chuẩn không quá $1$, có thể lấy $r^2=2$. Các hằng số của (5.6) là toàn cục, đúng tại mọi $w$; độ cong tại điểm cực tiểu có thể lớn hơn $\lambda$ nhiều, như ví dụ sau.

::: example Ví dụ 05.16 (Ba điểm có chính quy hóa)
**Dữ kiện.** Ví dụ ba điểm, đặc trưng $(1,u,u^2)$, $n=3$.

**Không chính quy hóa.** $X$ vuông khả nghịch nên $\operatorname{rank}X=3=n$. Theo Mệnh đề 05.21, dữ liệu tách được với mọi cách gán nhãn, và theo Định lý 05.22, $F$ không có điểm cực tiểu.

**Hằng số.** $X^TX=\begin{pmatrix}3&0&2\\0&2&0\\2&0&2\end{pmatrix}$. Khối của hai đặc trưng $1$ và $u^2$ là $\begin{pmatrix}3&2\\2&2\end{pmatrix}$ với vết $5$ và định thức $2$, nên có trị riêng $\frac{5\pm\sqrt{17}}2$; đặc trưng $u$ cho trị riêng $2$. Vậy $\lambda_{\max}(X^TX)=\frac{5+\sqrt{17}}2\approx4{,}5616$ và theo (5.6), $L=\frac{4{,}5616}{12}+\lambda$.

**Nghiệm.** Phương pháp Newton tới chuẩn gradient dưới $10^{-15}$ cho:

| $\lambda$ | $w_\lambda$ | $P(y=+1\mid u=-1,0,1)$ | $L$ | $\kappa\le$ | $\lVert w_\lambda\rVert$ |
|---:|---|---|---:|---:|---:|
| $0{,}1$ | $(0{,}1298;\ 0;\ -1{,}4288)$ | $(0{,}214;\ 0{,}532;\ 0{,}214)$ | $0{,}4801$ | $4{,}80$ | $1{,}435$ |
| $0{,}01$ | $(1{,}5571;\ 0;\ -4{,}2452)$ | $(0{,}064;\ 0{,}826;\ 0{,}064)$ | $0{,}3901$ | $39{,}0$ | $4{,}522$ |

**Diễn giải.** Nghiệm hữu hạn, và xác suất dự đoán $P(y=+1\mid u)$ nằm giữa $0{,}064$ và $0{,}826$. Tọa độ $w_1=0$ do đối xứng $u\mapsto-u$ và tính duy nhất của nghiệm. Nghiệm không nằm trên tia $\bar w=(1,0,-2)$: với $\lambda=0{,}1$, tỉ số $w_2/w_0$ bằng $-11$, không bằng $-2$.

**Kiểm tra lại.** Với $\lambda=0{,}1$, tại $u=0$: $\sigma(0{,}1298)=0{,}532$. Cận $\sqrt{2\log2/\lambda}$ của kết luận 3 trong Định lý 05.26 bằng $3{,}723$ và $11{,}77$, nên hai chuẩn $1{,}435\le3{,}723$ và $4{,}522\le11{,}77$ thỏa cận.
:::

Với $\lambda=0{,}01$, cận của Mệnh đề 05.28 là $\kappa\le39$, nên Định lý 04.27 cho $e_k\le(1-\frac1{39})^ke_0$ khi chạy hạ gradient bước $\frac1L$. Tại nghiệm, tỉ số giữa trị riêng lớn nhất và nhỏ nhất của $\nabla^2F_\lambda(w_\lambda)$ chỉ khoảng $4{,}4$. Nhận xét sau tổng kết đánh đổi giữa $\lambda$ và $\kappa$.

::: remark Nhận xét 05.29 (Đặt chỉnh và đánh đổi giữa $\lambda$ và $\kappa$)
Bài toán cực tiểu hóa gọi là *đặt chỉnh* (well-posed) nếu nghiệm tồn tại, duy nhất và phụ thuộc liên tục vào dữ liệu. Với $\lambda>0$, Định lý 05.26 cho tồn tại và duy nhất. Tính liên tục theo dữ liệu suy từ tính lồi mạnh, như sau.

Gọi $w_\lambda$, $w'_\lambda$ là nghiệm ứng với hai bộ dữ liệu $(X,y)$, $(X',y')$ và hai mất mát $F$, $F'$, và đặt $\Delta=w_\lambda-w'_\lambda$. Khi đó

$$
\begin{aligned}
&\lambda\lVert\Delta\rVert^2\\
&\le\bigl(\nabla F'_\lambda(w_\lambda)-\nabla F'_\lambda(w'_\lambda)\bigr)^T\Delta\\
&=\nabla F'_\lambda(w_\lambda)^T\Delta\\
&=\bigl(\nabla F'(w_\lambda)-\nabla F(w_\lambda)\bigr)^T\Delta\\
&\le\bigl\lVert\nabla F'(w_\lambda)-\nabla F(w_\lambda)\bigr\rVert\,\lVert\Delta\rVert .
\end{aligned}
$$

Quan hệ thứ nhất là tổng của hai bất đẳng thức lồi mạnh của Mệnh đề 04.26(a) cho $F'_\lambda$ (hằng số $\lambda$), viết tại $w_\lambda$ và $w'_\lambda$ rồi đổi vai; quan hệ thứ hai dùng $\nabla F'_\lambda(w'_\lambda)=0$; quan hệ thứ ba dùng $\nabla F'_\lambda(w_\lambda)=\nabla F'(w_\lambda)+\lambda w_\lambda$ và $\lambda w_\lambda=-\nabla F(w_\lambda)$ theo (5.5); quan hệ cuối là bất đẳng thức Cauchy–Schwarz. Chia cho $\lVert\Delta\rVert$ khi $\Delta\ne0$:

$$
\lVert\Delta\rVert\le\frac1\lambda\bigl\lVert\nabla F'(w_\lambda)-\nabla F(w_\lambda)\bigr\rVert .
$$

Gradient (4.1) hay (5.2) tại $w_\lambda$ là hàm liên tục của $(X,y)$, nên vế phải tiến về $0$ khi $(X',y')\to(X,y)$; hằng số $\frac1\lambda$ cho phép độ dịch lớn hơn khi $\lambda$ nhỏ.

Bài toán logistic không chính quy hóa trên dữ liệu tách được thì không đặt chỉnh, vì nghiệm không tồn tại.

Trên dữ liệu tách được, giảm $\lambda$ làm $F(w_\lambda)$ tiến về $\inf F$ (Hệ quả 05.27) nhưng làm số điều kiện tăng theo $1/\lambda$ (Mệnh đề 05.28): trên ví dụ một mẫu, $\sigma(w_\lambda)$ đi từ $0{,}663$ lên $0{,}997$ trong khi $\kappa$ đi từ $1{,}5$ lên $501$ (Ví dụ 05.14, 05.15). Hệ số $\lambda$ được chọn trên tập xác thực (Định nghĩa 05.6).
:::

**Trong học máy.** Với hồi quy tuyến tính và hồi quy logistic, $F$ lồi, nên suy giảm trọng số cho mục tiêu lồi mạnh theo Định lý 05.26; với mạng nơ-ron, $F$ không lồi và số hạng phạt nói chung không làm $F_\lambda$ lồi (Định nghĩa 01.42, Tình huống 01.3).

Ba bài tập sau kiểm tra tính tách được, sự tồn tại điểm cực tiểu và các hằng số của mục tiêu có chính quy hóa.

::: exercise Bài tập 05.4 (Tách được với $(1,u)$ và $(1,u^2)$)
Năm điểm $u=(-2,-1,0,1,2)$ có nhãn $y=(+1,-1,-1,-1,+1)$.

1. Chứng minh dữ liệu không tách được với đặc trưng $(1,u)$, và kiểm tra giả thiết của Mệnh đề 05.24.
2. Chứng minh dữ liệu tách được với đặc trưng $(1,u^2)$ bằng một $\bar w$ cụ thể, và tính biên nhỏ nhất $\gamma$ của $\bar w$ đó.
3. Với mỗi bộ đặc trưng, kết luận về sự tồn tại điểm cực tiểu của mất mát logistic không chính quy hóa.
:::

::: hint
Ở câu 1, viết năm biên $m_i=y_i(w_0+w_1u_i)$ rồi giả sử cả năm không âm. Ở câu 2, chọn ngưỡng của $u^2$ nằm giữa $1$ và $4$.
:::

::: solution
1. Các biên là $m_1=w_0-2w_1$, $m_2=-w_0+w_1$, $m_3=-w_0$, $m_4=-w_0-w_1$, $m_5=w_0+2w_1$. Nếu cả năm không âm thì $m_3\ge0$ cho $w_0\le0$, còn $m_1+m_5=2w_0\ge0$ cho $w_0\ge0$; vậy $w_0=0$. Khi đó $m_1=-2w_1\ge0$ và $m_5=2w_1\ge0$ cho $w_1=0$. Do đó mọi $w\ne0$ có một biên âm: giả thiết của Mệnh đề 05.24 thỏa, và đặc biệt dữ liệu không tách được.

2. Với $\bar w=(-2{,}5;\ 1)$, điểm số là $u^2-2{,}5$, bằng $1{,}5$ tại $u=\pm2$, bằng $-1{,}5$ tại $u=\pm1$ và bằng $-2{,}5$ tại $u=0$. Nhân với nhãn, các biên là $(1{,}5;\ 1{,}5;\ 2{,}5;\ 1{,}5;\ 1{,}5)$, đều dương, nên $\gamma=1{,}5$.

3. Với $(1,u)$, Mệnh đề 05.24 cho $F$ cưỡng bức và có điểm cực tiểu. Với $(1,u^2)$, Định lý 05.22 cho $\inf F=0$ không đạt và mọi dãy cực tiểu hóa phân kỳ.

**Kiểm tra lại.** Với $\bar w=(-2{,}5;\ 1)$ tại $u=1$: $1-2{,}5=-1{,}5$, nhân nhãn $-1$ cho biên $1{,}5$.
:::

::: exercise Bài tập 05.5 (Hằng số của ba điểm với $(1,u)$)
Cho ba điểm $u=(-1,0,1)$, $y=(-1,+1,-1)$ với đặc trưng $(1,u)$ và $\lambda=0{,}1$.

1. Tính $X^TX$, rồi $\mu$, $L$ và $\kappa$ theo (5.6).
2. Tính cận của $L$ và $\kappa$ theo $r$ và so với câu 1.
3. Chặn $\lVert w_\lambda\rVert$ theo Định lý 05.26.
:::

::: hint
Cột thứ hai của $X$ là $(-1,0,1)$, vuông góc với cột thứ nhất.
:::

::: solution
1. $X^TX=\begin{pmatrix}3&0\\0&2\end{pmatrix}$, $\lambda_{\max}=3$, $n=3$. Vậy $\mu=0{,}1$, $L=\tfrac3{12}+0{,}1=0{,}35$ và $\kappa=3{,}5$.

2. $\lVert x_i\rVert^2=1+u_i^2\le2$, nên $r^2=2$ cho $L\le0{,}5+0{,}1=0{,}6$ và $\kappa\le6$. Cận theo $r$ lỏng hơn vì $\operatorname{tr}X^TX=5$ lớn hơn $\lambda_{\max}=3$, và $\sum_i\lVert x_i\rVert^2=5<nr^2=6$.

3. Định lý 05.26 cho $\lVert w_\lambda\rVert\le\sqrt{2\log2/0{,}1}=\sqrt{13{,}86}\approx3{,}723$. Trên dữ liệu này có một cận tốt hơn. Theo Ví dụ 05.12, $F$ có điểm cực tiểu $w^*=(-\log2,0)$ với $\lVert w^*\rVert=\log2\approx0{,}693$. Vì $F(w_\lambda)\ge F^*$,

$$
\begin{aligned}
\frac\lambda2\lVert w_\lambda\rVert^2&\le F_\lambda(w_\lambda)-F^*\\&\le F_\lambda(w^*)-F^*\\&=\frac\lambda2\lVert w^*\rVert^2,
\end{aligned}
$$

nên $\lVert w_\lambda\rVert\le0{,}693$.

**Kiểm tra lại.** $\operatorname{tr}X^TX=3+2=5=\sum_i\lVert x_i\rVert^2=2+1+2$, và $\kappa=L/\mu=0{,}35/0{,}1=3{,}5$.
:::

::: exercise Bài tập 05.6 (Tính tốt nhất của $L$ và $\mu$)
Cho dữ liệu tách được bởi $\bar w$ và $F_\lambda$ là mục tiêu logistic có chính quy hóa.

1. Chứng minh $\nabla^2F_\lambda(0)=\frac1{4n}X^TX+\lambda I$, nên hằng số $L$ của (5.6) không giảm được.
2. Chứng minh $\nabla^2F_\lambda(t\bar w)\to\lambda I$ khi $t\to\infty$, nên hằng số $\mu=\lambda$ không tăng được.
:::

::: hint
Dùng $S_{ii}=\sigma(m_i)\sigma(-m_i)$, với $m_i(0)=0$ và $m_i(t\bar w)=t\,m_i(\bar w)\to\infty$.
:::

::: solution
1. Tại $w=0$, mọi biên bằng $0$, nên $S_{ii}=\sigma(0)^2=\tfrac14$ và $\nabla^2F_\lambda(0)=\frac1{4n}X^TX+\lambda I$. Trị riêng lớn nhất của ma trận này bằng $L$ của (5.6), nên mọi hằng số $L'$ với $\nabla^2F_\lambda\preceq L'I$ tại mọi $w$ phải thỏa $L'\ge L$.

2. $m_i(t\bar w)=t\,m_i(\bar w)\to\infty$ vì $m_i(\bar w)>0$, và $\sigma(m)\sigma(-m)\le e^{-m}\to0$. Mỗi phần tử của $\frac1nX^TS(t\bar w)X=\frac1n\sum_iS_{ii}x_ix_i^T$ tiến về $0$, nên $\nabla^2F_\lambda(t\bar w)\to\lambda I$. Nếu $\mu'>\lambda$ thỏa $\nabla^2F_\lambda\succeq\mu'I$ tại mọi $w$, thì $v^T\nabla^2F_\lambda(t\bar w)v\ge\mu'$ với vector đơn vị $v$, mâu thuẫn với giới hạn $\lambda$.

**Kiểm tra lại.** Với ví dụ một mẫu và $\lambda=0{,}05$, $F_\lambda''(0)=\tfrac14+0{,}05=0{,}30=L$, khớp Ví dụ 05.15.
:::

Như vậy, số hạng phạt bậc hai cho điểm cực tiểu duy nhất trên mọi dữ liệu, và câu hỏi tồn tại đổi thành câu hỏi tính toán. Tuy nhiên, với $\lambda$ nhỏ, $\kappa$ lớn, nên số bước của hạ gradient tăng, còn mỗi bước Newton đắt hơn một bước hạ gradient.

## 6. Độ cong và chi phí tính toán

Xét ví dụ một mẫu với $\lambda=0{,}005$: $F_\lambda(w)=\log(1+e^{-w})+0{,}0025\,w^2$, có số điều kiện $\kappa=51$ và nghiệm $w_\lambda=3{,}914$. Xuất phát từ $w_0=0$, hạ gradient với bước $\frac1L$ cần $71$ bước để sai số giá trị xuống dưới $10^{-8}$, trong khi phương pháp Newton chỉ cần $5$ bước. Trên bài toán một chiều, mỗi bước của hai phương pháp đều rẻ. Với $n$ mẫu và $d$ đặc trưng, mỗi bước Newton đòi Hessian $d\times d$ và một hệ tuyến tính $d\times d$, còn mỗi bước hạ gradient chỉ đòi gradient. Tổng chi phí là tích của hai thừa số, bao gồm:

- số bước, theo $\kappa$ và độ chính xác $\varepsilon_{\rm tol}$;
- chi phí một bước, theo $n$ và $d$.

### 6.1. Hai quy tắc cập nhật

Bài 04 có hai quy tắc cập nhật cho hàm lồi mạnh $f$, viết lại với biến $w$. Hạ gradient bước $\tfrac1L$ (dãy của Định lý 04.27) dùng một độ dài bước chung cho mọi hướng:

$$
w_{k+1}=w_k-\frac1L\nabla f(w_k).
\tag{6.1}
$$

Phương pháp Newton nhân gradient với nghịch đảo Hessian, tức chia thành phần theo mỗi hướng riêng cho độ cong của chính hướng đó (Định nghĩa 04.29):

$$
\begin{aligned}
w_{k+1}&=w_k\\
&\quad-\bigl[\nabla^2f(w_k)\bigr]^{-1}\\
&\qquad\cdot\nabla f(w_k).
\end{aligned}
\tag{6.2}
$$

Ví dụ sau so hai quy tắc trên một hàm bậc hai có đường mức là elip rất dẹt, ứng với số điều kiện lớn.

::: example Ví dụ 05.17 (Hai quy tắc trên hàm bậc hai có trị riêng $1$ và $10$)
**Dữ kiện.** $f(w)=\tfrac12w^THw$ trên $\mathbb R^2$, với $H$ có trị riêng $1$ và $10$ và vector riêng $v_1=(\cos30^\circ,\sin30^\circ)$, $v_2=(-\sin30^\circ,\cos30^\circ)$:

$$
H=\begin{pmatrix}3{,}25&-3{,}897\\-3{,}897&7{,}75\end{pmatrix}.
$$

Nghiệm $w^*=0$; điểm đầu $w_0=(6,4)$; $L=10$, nên bước hạ gradient là $\eta=\tfrac1L=0{,}1$.

**Phân tích theo hướng riêng.** Viết $w_k=\xi_kv_1+\zeta_kv_2$. Ở điểm đầu, $\xi_0=6\cos30^\circ+4\sin30^\circ=7{,}196$ và $\zeta_0=-6\sin30^\circ+4\cos30^\circ=0{,}464$. Vì $\nabla f(w)=Hw$, một bước hạ gradient cho $w_{k+1}=(I-0{,}1H)w_k$, nên

$$
\begin{aligned}
\xi_{k+1}&=(1-0{,}1\cdot1)\,\xi_k=0{,}9\,\xi_k,\\
\zeta_{k+1}&=(1-0{,}1\cdot10)\,\zeta_k=0 .
\end{aligned}
$$

Thành phần theo hướng cong nhất bị triệt tiêu ngay ở bước đầu; thành phần theo hướng phẳng chỉ co $0{,}9$ lần mỗi bước, cùng cơ chế như Nhận xét 04.14.

**Hạ gradient sau 12 bước.** $\lVert w_{12}\rVert=0{,}9^{12}\cdot7{,}196=0{,}282\cdot7{,}196\approx2{,}03$, so với $\lVert w_0\rVert=\sqrt{52}\approx7{,}21$; điểm lặp là $w_{12}\approx(1{,}76;\ 1{,}02)$.

**Newton.** $\nabla^2f\equiv H$, nên (6.2) cho $w_1=w_0-H^{-1}Hw_0=0$: một bước tới nghiệm.

**Kiểm tra lại.** $2{,}03\cdot(\cos30^\circ,\sin30^\circ)=(1{,}76;\ 1{,}02)$, khớp điểm lặp; theo hướng $v_1$, cần $k\ge\log(10^{-3})/\log0{,}9\approx65{,}6$ bước để khoảng cách giảm $1000$ lần.
:::

![Đường mức elip của hàm bậc hai có trị riêng 1 và 10, trục xoay 30 độ, cực tiểu tại gốc. Từ w₀ = (6; 4), 12 bước hạ gradient bước 0,1 (chấm nối liền) đi dọc hướng phẳng và dừng ở (1,76; 1,02); một bước Newton (nét đứt) đi thẳng tới gốc.](img/lec-05/cp-gd-newton-paths.svg)

Trên hàm bậc hai, mô hình bậc hai mà Newton dùng chính là hàm, nên một bước tới đúng nghiệm; trên $F_\lambda$ thì không, vì Hessian thay đổi theo $w$.

Hệ số co $1-\eta s$ theo hướng có độ cong $s$ là lý do số điều kiện xuất hiện trong số bước. Với $\eta=\frac1L$, khoảng cách theo hướng phẳng nhất co theo hệ số $1-\frac1\kappa$ mỗi bước, và sai số giá trị theo hướng đó co theo $(1-\frac1\kappa)^2\le1-\frac1\kappa$, hệ số trong Định lý 04.27.

### 6.2. Hai phương pháp trên ví dụ một mẫu

Ví dụ sau chạy hai quy tắc trên ví dụ một mẫu với $\lambda=0{,}005$, theo dõi sai số giá trị $e_k=F_\lambda(w_k)-F_\lambda(w_\lambda)$.

::: example Ví dụ 05.18 (Hạ gradient và Newton với $\lambda=0{,}005$)
**Dữ kiện.** Ví dụ một mẫu với $\lambda=0{,}005$; đạo hàm $g(w)=-\sigma(-w)+\lambda w$, đạo hàm bậc hai $h(w)=\sigma(w)\sigma(-w)+\lambda$; $L=\tfrac14+\lambda=0{,}255$, $\kappa=51$; $w_0=0$; nghiệm $w_\lambda=3{,}914$ với $e_0=0{,}635$. Dừng khi $e_k\le10^{-8}$.

**Bước đầu tính thủ công.** Tại $w_0=0$: $g=-0{,}5$ và $h=0{,}255$. Newton cho $w_1=0+0{,}5/0{,}255=1{,}9608$. Hạ gradient cho $w_1=0+0{,}5/L=1{,}9608$, trùng Newton vì $h(0)=\tfrac14+\lambda=L$.

**Bảng.**

| $k$ | Newton $w_k$ | Newton $e_k$ | Hạ gradient $w_k$ | Hạ gradient $e_k$ |
|---:|---:|---:|---:|---:|
| $0$ | $0$ | $0{,}635$ | $0$ | $0{,}635$ |
| $1$ | $1{,}9608$ | $8{,}3\cdot10^{-2}$ | $1{,}9608$ | $8{,}3\cdot10^{-2}$ |
| $2$ | $2{,}9645$ | $1{,}4\cdot10^{-2}$ | $2{,}4062$ | $4{,}3\cdot10^{-2}$ |
| $3$ | $3{,}6273$ | $1{,}1\cdot10^{-3}$ | $2{,}6833$ | $2{,}6\cdot10^{-2}$ |
| $4$ | $3{,}8841$ | $1{,}1\cdot10^{-5}$ | $2{,}8816$ | $1{,}7\cdot10^{-2}$ |
| $5$ | $3{,}9137$ | $1{,}4\cdot10^{-9}$ | $3{,}0332$ | $1{,}2\cdot10^{-2}$ |

Newton đạt $10^{-8}$ sau $5$ bước. Hạ gradient đạt $10^{-8}$ ở bước $71$, với $e_{71}=8{,}9\cdot10^{-9}$.

**Kiểm tra lại.** Bước thứ hai của Newton: $g(1{,}9608)=-0{,}1136$ và $h(1{,}9608)=0{,}1132$, nên $w_2=1{,}9608+0{,}1136/0{,}1132\approx2{,}964$. Với quay lui Armijo tham số $\alpha=0{,}25$, bước đầy đủ $t=1$ được nhận ở mọi bước Newton của bảng.
:::

![Trục tung logarit từ 10⁻¹⁰ đến 1, k từ 0 đến 75. Newton (ô vuông) giảm 0,635; 0,083; 0,014; 0,0011; 1,1·10⁻⁵; 1,4·10⁻⁹, đạt 10⁻⁸ sau 5 bước. Hạ gradient (chấm) giảm gần thẳng trên thang logarit, đạt 10⁻⁸ ở bước 71.](img/lec-05/cp-error-vs-iteration.svg)

Trên thang logarit, sai số của hạ gradient là một đường gần thẳng, tức giảm theo một tỉ số gần cố định mỗi bước. Sai số của Newton đi xuống ngày càng dốc: từ $e_3\approx10^{-3}$ sang $e_4\approx10^{-5}$ rồi $e_5\approx10^{-9}$, số chữ số đúng gần gấp đôi mỗi bước. Đó là hai kiểu hội tụ, tuyến tính và bậc hai, của Định nghĩa 04.35.

### 6.3. Số bước của hạ gradient

Theo Định lý 04.27, nếu $f$ lồi mạnh với hằng số $\mu$ và có gradient $L$-Lipschitz thì hạ gradient bước $\tfrac1L$ cho $e_k\le(1-\mu/L)^ke_0$, và $e_k\le\varepsilon_{\rm tol}$ khi $k\ge\kappa\log(e_0/\varepsilon_{\rm tol})$. Thuật toán cần biết $L$ để đặt bước; $\mu$ chỉ xuất hiện trong cận.

**Trong học máy.** Với hồi quy logistic có suy giảm trọng số và tốc độ học (learning rate) $\frac1L$, cận số bước tăng theo $\kappa\le1+r^2/(4\lambda)$, nên chọn $\lambda$ nhỏ để nghiệm gần bài toán gốc làm cận số bước tăng theo $1/\lambda$. Với mạng nơ-ron, mục tiêu không lồi mạnh và Định lý 04.27 không áp dụng.

Ví dụ sau so cận của Định lý 04.27 với số bước thực trên ví dụ một mẫu, với ba giá trị $\lambda$.

::: example Ví dụ 05.19 (Số bước theo số điều kiện)
**Dữ kiện.** Ví dụ một mẫu, $L=\tfrac14+\lambda$, $\mu=\lambda$, $w_0=0$, $\varepsilon_{\rm tol}=10^{-8}$; hạ gradient bước $\frac1L$ và Newton bước đầy đủ.

**Bảng.**

| $\lambda$ | $\kappa$ | $e_0$ | hạ gradient (thực tế) | cận $\lceil\kappa\log(e_0/\varepsilon_{\rm tol})\rceil$ | Newton | $L/F_\lambda''(w_\lambda)$ |
|---:|---:|---:|---:|---:|---:|---:|
| $0{,}05$ | $6$ | $0{,}4674$ | $12$ | $106$ | $4$ | $2{,}07$ |
| $0{,}005$ | $51$ | $0{,}6351$ | $71$ | $917$ | $5$ | $10{,}5$ |
| $0{,}0005$ | $501$ | $0{,}6817$ | $446$ | $9037$ | $7$ | $73{,}5$ |

Cột cuối dùng độ cong tại nghiệm $F_\lambda''(w_\lambda)=\sigma(w_\lambda)\sigma(-w_\lambda)+\lambda$, bằng $0{,}1451$; $0{,}02419$; $0{,}003409$ cho ba giá trị $\lambda$.

**Đọc bảng.** Khi $\kappa$ tăng $83{,}5$ lần, số bước hạ gradient tăng $37$ lần, theo sát tỉ số $L/F_\lambda''(w_\lambda)$ giữa độ cong toàn cục và độ cong tại nghiệm, tăng $35{,}5$ lần. Cận lớn hơn số bước thực từ $9$ đến $20$ lần. Số bước Newton chỉ tăng nhẹ: $4$, $5$, $7$.

**Kiểm tra lại.** Dòng giữa: $51\cdot\log(0{,}6351/10^{-8})=51\cdot17{,}97=916{,}3$, làm tròn lên $917$.
:::

Cận lớn hơn số bước thực vì $\mu=\lambda$ là cận dưới toàn cục của độ cong, trong khi tại nghiệm độ cong lớn hơn $\lambda$ nhiều. Nhận xét sau đo hệ số co thật của hạ gradient gần nghiệm.

::: remark Nhận xét 05.30 (Số điều kiện cục bộ)
Gần nghiệm $w_\lambda$, ánh xạ một bước $T(w)=w-F_\lambda'(w)/L$ có $T(w_\lambda)=w_\lambda$ và $T'(w_\lambda)=1-F_\lambda''(w_\lambda)/L$. Khai triển bậc nhất cho

$$
\begin{aligned}
&w_{k+1}-w_\lambda\\
&\quad\approx\Bigl(1-\frac{F_\lambda''(w_\lambda)}L\Bigr)(w_k-w_\lambda),
\end{aligned}
$$

và khai triển bậc hai của $F_\lambda$ quanh nghiệm cho $e_k\approx\tfrac12F_\lambda''(w_\lambda)(w_k-w_\lambda)^2$. Do đó sai số giá trị co theo hệ số khoảng $\bigl(1-F_\lambda''(w_\lambda)/L\bigr)^2$. Với ba giá trị $\lambda$ của Ví dụ 05.19, hệ số này bằng $0{,}267;\ 0{,}819;\ 0{,}973$, khớp tỉ số $e_{k+1}/e_k$ đo được ở cuối quỹ đạo, $0{,}2666;\ 0{,}8192;\ 0{,}9729$.

Số bước tỉ lệ gần với *số điều kiện cục bộ* (local condition number) $L/F_\lambda''(w_\lambda)$, nhỏ hơn $\kappa=L/\lambda$. Phép so sánh tổng chi phí dùng cận theo $\kappa$ nên kế thừa độ bi quan của cận này.
:::

### 6.4. Số bước của phương pháp Newton

Theo Định lý 04.37, giả sử $f$ lớp $C^2$, tập mức dưới $\{w\mid f(w)\le f(w_0)\}$ đóng, và trên tập đó $\mu I\preceq\nabla^2f\preceq LI$ và Hessian $L_H$-Lipschitz. Đặt ngưỡng $\bar g=\min\{1,3(1-2\alpha)\}\mu^2/L_H$ và mức giảm $\gamma_1=\alpha\beta\bar g^2\mu/L^2$. Khi đó phương pháp Newton với quay lui Armijo tham số $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$ (Thuật toán 04.34) có *pha tắt dần* (damped Newton phase), khi $\lVert\nabla f(w_k)\rVert\ge\bar g$ và mỗi bước giảm $f$ ít nhất $\gamma_1$, rồi *pha bậc hai* (quadratically convergent phase), từ bước đầu tiên có $\lVert\nabla f(w_k)\rVert<\bar g$; từ đó, quay lui luôn nhận bước đầy đủ và sai số giảm theo bình phương. Số bước để $f(w_k)-f^*\le\varepsilon_{\rm tol}$ vì vậy không vượt

$$
\begin{gathered}
\frac{f(w_0)-f^*}{\gamma_1}+\log_2\log_2\frac{\varepsilon_0}{\varepsilon_{\rm tol}},\\
\varepsilon_0=\frac{2\mu^3}{L_H^2}.
\end{gathered}
$$

Nếu $\lVert\nabla f(w_k)\rVert<\bar g$ thì sau $j$ bước, $f(w_{k+j})-f^*\le\varepsilon_0(\tfrac12)^{2^{j+1}}$ (Boyd và Vandenberghe 2004, (9.35), tr. 488). Chẳng hạn, năm bước bậc hai cho sai số không vượt $\varepsilon_0\cdot2^{-64}\approx5{,}4\cdot10^{-20}\,\varepsilon_0$. Riêng số bước của pha bậc hai, $\log_2\log_2(\varepsilon_0/\varepsilon_{\rm tol})$, không chứa $\kappa$; $\gamma_1$ và $\varepsilon_0$ chứa $\mu$, $L$, $L_H$.

::: example Ví dụ 05.20 (Ngưỡng của pha bậc hai trên ví dụ một mẫu)
**Dữ kiện.** Ví dụ một mẫu với ba giá trị $\lambda$ của Ví dụ 05.19; hằng số lồi mạnh $\mu=\lambda$; quay lui với $\alpha=0{,}25$.

**Hằng số Lipschitz của Hessian.** $F_\lambda'''(w)=\frac{d}{dw}\bigl[s(1-s)\bigr]$ với $s=\sigma(w)$, tức $s(1-s)(1-2s)$. Hàm $q(s)=s(1-s)(1-2s)$ trên $(0,1)$ có $q'(s)=1-6s+6s^2=0$ tại $s=\tfrac{3\pm\sqrt3}6$, và $\lvert q\rvert$ lớn nhất bằng $\tfrac1{6\sqrt3}\approx0{,}0962$. Vậy $L_H=\tfrac1{6\sqrt3}$.

**Ngưỡng.** Với $\alpha=0{,}25$, $\min\{1,3(1-2\alpha)\}=\min\{1;\ 1{,}5\}=1$, nên ngưỡng của Định lý 04.37 là $\bar g=\mu^2/L_H=6\sqrt3\,\lambda^2$:

| $\lambda$ | $0{,}05$ | $0{,}005$ | $0{,}0005$ |
|---|---:|---:|---:|
| $\bar g=6\sqrt3\,\lambda^2$ | $2{,}6\cdot10^{-2}$ | $2{,}6\cdot10^{-4}$ | $2{,}6\cdot10^{-6}$ |

**Diễn giải.** Ngưỡng co theo $\lambda^2$. Ngưỡng là điều kiện đủ; hội tụ bậc hai trên ví dụ bắt đầu trước khi $\lvert F_\lambda'(w_k)\rvert$ xuống dưới ngưỡng. Với $\lambda=0{,}005$, ta có $\lvert F_\lambda'(w_k)\rvert=0{,}50;\ 0{,}11;\ 0{,}034;\ 0{,}0078;\ 7{,}3\cdot10^{-4}$ ở năm bước đầu, đều trên ngưỡng $2{,}6\cdot10^{-4}$, mà sai số đã xuống $e_5=1{,}4\cdot10^{-9}$. Số bước Newton của Ví dụ 05.19 tăng từ $4$ lên $7$ trong khi khoảng cách từ điểm đầu tới nghiệm tăng: $w_\lambda=2{,}13;\ 3{,}91;\ 5{,}83$.

**Kiểm tra lại.** Tại $s=\tfrac{3-\sqrt3}6\approx0{,}2113$: $0{,}2113\cdot0{,}7887\cdot0{,}5774\approx0{,}0962$.
:::

Theo Mệnh đề 04.32(c), hướng Newton bất biến qua phép đổi biến affine (affine invariance), nên Newton không bị elip dẹt làm chậm như hạ gradient; đổi lại, mỗi bước cần $\nabla^2F_\lambda$ và một hệ tuyến tính $d\times d$.

**Trong học máy.** Với hồi quy logistic có chính quy hóa, giả thiết của Định lý 04.37 thỏa: Hessian bị chặn hai phía (Mệnh đề 05.28), và vì $\lvert\phi'''\rvert\le\tfrac1{6\sqrt3}$ (Ví dụ 05.20) và $\lVert x_i\rVert\le r$, Hessian $L_H$-Lipschitz với $L_H\le r^3/(6\sqrt3)$.

### 6.5. Chi phí một bước

Chúng ta đếm số phép nhân–cộng theo giả thiết (G5) cho hồi quy logistic có chính quy hóa. Hai thuật toán sau ghi từng dòng của một bước kèm chi phí.

::: algorithm Thuật toán 05.31 (Một bước hạ gradient cho hồi quy logistic có chính quy hóa)
**Đầu vào.** $X\in\mathbb R^{n\times d}$, $y\in\{-1,+1\}^n$, $\lambda>0$, $L$ theo (5.6), điểm lặp $w\in\mathbb R^d$, ngưỡng $\varepsilon_g>0$ cho chuẩn gradient.

1. Tính biên $m_i=y_ix_i^Tw$, tức $m=\operatorname{diag}(y)Xw$: $nd$.
2. Tính $\nu_i=-y_i\,\sigma(-m_i)$ với $i=1,\ldots,n$: $O(n)$.
3. Tính $g=\frac1nX^T\nu+\lambda w$: $nd$.
4. Cập nhật $w\leftarrow w-\frac1Lg$: $O(d)$.

**Điều kiện dừng.** Dừng và trả về $w$ nếu $\lVert g\rVert\le\varepsilon_g$ sau dòng 3.

**Đầu ra.** Điểm lặp mới $w-\frac1Lg$, hoặc $w$ khi điều kiện dừng thỏa.

**Chi phí mỗi bước.** $2nd+O(n+d)$ phép nhân–cộng; bộ nhớ thêm cho $m$, $\nu\in\mathbb R^n$ và $g\in\mathbb R^d$.
:::

::: algorithm Thuật toán 05.32 (Một bước Newton cho hồi quy logistic có chính quy hóa)
**Đầu vào.** Như Thuật toán 05.31, thay $\varepsilon_g$ bằng ngưỡng $\varepsilon_{\rm tol}>0$ cho sai số giá trị; tham số quay lui $\alpha$, $\beta$.

1. Tính $m$, $\nu$, $g$ như các dòng 1–3 của Thuật toán 05.31: $2nd$.
2. Tính $S_{ii}=\sigma(m_i)\sigma(-m_i)$ từ $m$: $O(n)$.
3. Lập $H=\frac1nX^TSX+\lambda I$: $nd^2$.
4. Giải $Hp=-g$ bằng phân tích Cholesky: bậc $d^3$.
5. Tính $\delta_N^2=-g^Tp$, bình phương độ giảm Newton (Định nghĩa 04.31): $O(d)$.
6. Quay lui Armijo theo hướng $p$: tính sẵn $Xp$ ($nd$), mỗi lần thử một $t$ tốn $O(n)$.
7. Cập nhật $w\leftarrow w+tp$: $O(d)$.

**Điều kiện dừng.** Dừng và trả về $w$ nếu $\tfrac12\delta_N^2\le\varepsilon_{\rm tol}$ sau dòng 5.

**Đầu ra.** Điểm lặp mới $w+tp$, hoặc $w$ khi điều kiện dừng thỏa.

**Chi phí mỗi bước.** $O(nd^2+d^3)$; bộ nhớ thêm cho $H$ với $d^2$ số và các vector độ dài $n$.
:::

Dòng 3 của Thuật toán 05.32 là tổng của $n$ tích ngoài $S_{ii}x_ix_i^T$, mỗi tích tốn $d^2$; dùng tính đối xứng thì chỉ cần khoảng $nd^2/2$. Phân tích Cholesky tốn khoảng $\tfrac13d^3$ flop, mỗi flop là một phép cộng hoặc một phép nhân (Boyd và Vandenberghe 2004, Phụ lục C.1.1, tr. 662; Thuật toán C.2, tr. 670), tức khoảng $d^3/6$ phép nhân–cộng; hai phép thế sau đó tốn $O(d^2)$. Theo Mệnh đề 04.32(a), $\tfrac12\delta_N^2$ là mức giảm của mô hình bậc hai; Boyd và Vandenberghe (2004, tr. 486) dùng nó làm ước lượng của $F_\lambda(w)-F_\lambda^*$ dựa trên mô hình bậc hai.

Newton bước đầy đủ cho hồi quy logistic không chính quy hóa là *bình phương nhỏ nhất có trọng số lặp* (iteratively reweighted least squares, IRLS) của Murphy (2022, §10.2.6). Cộng chi phí từng dòng của hai thuật toán cho mệnh đề sau.

::: proposition Mệnh đề 05.33 (Chi phí một bước) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{n\times d}$ dày đặc, $n\ge d$; đếm phép nhân–cộng và bỏ hằng số (G5).

**Kết luận.**

1. Một bước hạ gradient tốn thời gian $O(nd)$ và bộ nhớ thêm $O(n+d)$.
2. Một bước Newton tốn thời gian $O(nd^2+d^3)$ và bộ nhớ thêm $O(d^2+n)$.
3. Tỉ số chi phí một bước Newton trên một bước hạ gradient có bậc $d+d^2/n$.
:::

::: proof Chứng minh Mệnh đề 05.33
**Lộ trình.** Cộng chi phí từng dòng của hai thuật toán.

**Bước 1 (thời gian).** Cộng chi phí các dòng của Thuật toán 05.31: $2nd+O(n+d)=O(nd)$. Thuật toán 05.32 thêm dòng 3 ($nd^2$), dòng 4 ($O(d^3)$), dòng 6 ($nd$ cộng $O(n)$ cho mỗi lần thử, với số lần thử bị chặn theo Mệnh đề 04.11); tổng là $O(nd^2+d^3)$, vì $nd\le nd^2$.

**Bước 2 (bộ nhớ).** Hạ gradient lưu $m$, $\nu\in\mathbb R^n$ và $g\in\mathbb R^d$, tức $O(n+d)$. Newton lưu thêm $H$ với $d^2$ số và $Xp\in\mathbb R^n$, tức $O(d^2+n)$.

**Bước 3 (tỉ số).** $\dfrac{nd^2+d^3}{nd}=d+\dfrac{d^2}n$. $\square$
:::

Cả hai chi phí đều có thừa số $n$, vì mỗi bước đọc toàn bộ dữ liệu.

Khi $d>n$, Hessian có cấu trúc đặc biệt: $\lambda I$ cộng một ma trận có hạng không quá $n$. Mệnh đề sau khai thác cấu trúc đó.

::: proposition Mệnh đề 05.34 (Bước Newton khi $d>n$) — chứng minh đầy đủ
**Giả thiết.**

- **Kích thước.** $d>n$; $\lambda>0$; $g\in\mathbb R^d$.
- **Hessian.** $H=\lambda I+UU^T$ với $U=\frac1{\sqrt n}X^TS^{1/2}\in\mathbb R^{d\times n}$.

**Kết luận.** Nghiệm của $Hp=-g$ là

$$
\begin{aligned}
p&=-\tfrac1\lambda\bigl[g\\
&\quad-U(\lambda I_n+U^TU)^{-1}\\
&\qquad\cdot U^Tg\bigr],
\end{aligned}
\tag{6.3}
$$

tính được với chi phí $O(n^2d+n^3)$ thay cho $O(nd^2+d^3)$.
:::

::: proof Chứng minh Mệnh đề 05.34
**Lộ trình.** Viết Hessian thành $\lambda I$ cộng ma trận hạng thấp, kiểm công thức nghịch đảo Woodbury, rồi đếm chi phí.

**Bước 1 ($H=\lambda I+UU^T$).** $UU^T=\frac1nX^TS^{1/2}S^{1/2}X=\frac1nX^TSX$, nên $H$ là Hessian của Thuật toán 05.32.

**Bước 2 (công thức nghịch đảo Woodbury).** Đặt $Q=\lambda I_n+U^TU\in\mathbb R^{n\times n}$, xác định dương. Ta kiểm tra $H\cdot\frac1\lambda\bigl[I-UQ^{-1}U^T\bigr]=I$:

$$
\begin{aligned}
&(\lambda I+UU^T)\\
&\quad\cdot\tfrac1\lambda\bigl[I-UQ^{-1}U^T\bigr]\\
&=I+\tfrac1\lambda UU^T\\
&\quad-\tfrac1\lambda(\lambda U+UU^TU)\\
&\qquad\cdot Q^{-1}U^T\\
&=I+\tfrac1\lambda UU^T\\
&\quad-\tfrac1\lambda U(\lambda I_n+U^TU)\\
&\qquad\cdot Q^{-1}U^T&&\text{(a)}\\
&=I+\tfrac1\lambda UU^T-\tfrac1\lambda UU^T&&\text{(b)}\\
&=I.
\end{aligned}
$$

Quan hệ (a) đặt $U$ ra trước tích $(\lambda I_n+U^TU)$; quan hệ (b) dùng $(\lambda I_n+U^TU)Q^{-1}=I_n$. Nhân $H^{-1}=\frac1\lambda[I-UQ^{-1}U^T]$ với $-g$ cho (6.3).

**Bước 3 (chi phí).** Lập $U$ tốn $nd$; lập $U^TU$ tốn $n^2d$; phân tích Cholesky của $Q$ tốn $O(n^3)$; tính $U^Tg$, giải hệ $n\times n$ và nhân với $U$ tốn $nd+O(n^2)+nd$. Tổng là $O(n^2d+n^3)$ (Boyd và Vandenberghe 2004, §9.7.2, tr. 511–512; MIT 6.079 Lecture 16, tr. 10–30). $\square$
:::

Công thức (6.3) đúng với mọi $d$, $n$ và có lợi khi $n<d$; chi phí chung cho mọi quan hệ giữa $n$ và $d$ là $O\bigl(nd\min(n,d)+\min(n,d)^3\bigr)$. Hai mệnh đề trên giả thiết ma trận dày đặc; nhận xét sau nêu điều thay đổi khi dữ liệu thưa.

::: remark Nhận xét 05.35 (Dữ liệu thưa và các phương pháp tránh Hessian dày đặc)
Với dữ liệu thưa như vector TF-IDF, $nd$ trong chi phí hạ gradient được thay bằng số phần tử khác $0$ của $X$, nhỏ hơn $nd$ nhiều khi phần lớn tọa độ của mỗi $x_i$ bằng $0$. Hessian $X^TSX$ thì nói chung vẫn dày đặc, nên chi phí $d^2$ bộ nhớ và $d^3$ thời gian của Newton không giảm theo. Gradient liên hợp (conjugate gradient) giải $Hp=-g$ chỉ bằng các tích $Hv=\frac1nX^T(S(Xv))+\lambda v$, mỗi tích tốn như một gradient. Phương pháp tựa Newton (quasi-Newton) bộ nhớ hạn chế L-BFGS (limited-memory BFGS) xấp xỉ $H^{-1}$ từ các hiệu gradient gần nhất mà không lưu ma trận $d\times d$ (Goodfellow và cộng sự 2016, §8.6.3, tr. 317).
:::

Ví dụ sau áp Mệnh đề 05.33 cho một bài toán kích thước trung bình.

::: example Ví dụ 05.21 (Chi phí một bước với $n=10^5$, $d=10^3$)
**Dữ kiện.** Ma trận dày đặc $X\in\mathbb R^{10^5\times10^3}$, mất mát logistic có chính quy hóa.

**Hạ gradient.** Hai tích $Xw$ và $X^T\nu$, mỗi tích $nd=10^8$ phép nhân–cộng.

**Newton.** Lập $H$ tốn $nd^2=10^{11}$; Cholesky tốn bậc $d^3=10^9$; Hessian chiếm $8d^2=8\cdot10^6$ byte, tức 8 MB, ở độ chính xác kép.

**Tỉ số.** $d+d^2/n=1000+10=1010$: riêng dòng lập Hessian đã tốn gấp $1000$ lần một tích $Xw$.

**Kiểm tra lại.** $(nd^2+d^3)/(nd)=(10^{11}+10^9)/10^8=1010$.
:::

### 6.6. Tổng chi phí và ngưỡng hòa vốn

Tổng chi phí của một phương pháp xấp xỉ bằng chi phí một bước nhân số bước. Với hạ gradient, Định lý 04.27 và Mệnh đề 05.33 cho cận

$$
C_{\rm HG}\approx nd\cdot\kappa\log\frac{e_0}{\varepsilon_{\rm tol}} .
\tag{6.4}
$$

Với Newton chạy $N_{\rm N}$ bước,

$$
C_{\rm N}\approx(nd^2+d^3)\,N_{\rm N}.
\tag{6.5}
$$

Chia (6.4) cho (6.5), Newton rẻ hơn theo cận khi

$$
\kappa\log\frac{e_0}{\varepsilon_{\rm tol}}>N_{\rm N}\Bigl(d+\frac{d^2}n\Bigr).
\tag{6.6}
$$

Vế trái tăng theo số điều kiện và theo độ chính xác yêu cầu; vế phải tăng theo số đặc trưng.

::: example Ví dụ 05.22 (Ngưỡng hòa vốn với $n=10^5$, $d=10^3$)
**Dữ kiện.** $n=10^5$, $d=10^3$, $e_0/\varepsilon_{\rm tol}=10^8$ nên $\log(e_0/\varepsilon_{\rm tol})=18{,}42$; $N_{\rm N}=10$; mỗi $x_i$ gồm tọa độ hằng $1$ và phần còn lại có chuẩn không quá $1$, nên $r^2=2$ và Mệnh đề 05.28 cho $\kappa\le1+\frac2{4\lambda}$.

**Hai tổng chi phí.** $C_{\rm N}\approx10\cdot(10^{11}+10^9)=1{,}01\cdot10^{12}$ và $C_{\rm HG}\approx10^8\cdot18{,}42\cdot\kappa=1{,}842\cdot10^9\,\kappa$. Hòa vốn khi $\kappa=\frac{1{,}01\cdot10^{12}}{1{,}842\cdot10^9}\approx548$.

**Hai giá trị $\lambda$.**

- $\lambda=10^{-3}$: $\kappa\le501$, cận $C_{\rm HG}\approx9{,}2\cdot10^{11}$, cùng bậc với $C_{\rm N}$; hai cận chênh khoảng $9\,\%$, dưới độ phân giải của phép đếm bỏ hằng số, nên phép đếm không phân định.
- $\lambda=10^{-5}$: $\kappa\le50\,001$, cận $C_{\rm HG}\approx9{,}2\cdot10^{13}$, gấp khoảng $90$ lần $C_{\rm N}$: Newton có lợi theo cận.

**Cận có hằng số.** Tính cả hằng số của hai thuật toán, một bước hạ gradient tốn $2nd=2\cdot10^8$ và một bước Newton, bỏ qua tích $Xp$ của dòng 6, tốn $2nd+nd^2/2+d^3/6\approx5{,}04\cdot10^{10}$; tỉ số một bước khoảng $252$ thay cho $1010$, và ngưỡng hòa vốn là $\kappa\approx137$ thay cho $548$. Với $\lambda=10^{-3}$, cận của hạ gradient $\approx1{,}8\cdot10^{12}$ khi đó lớn hơn $C_{\rm N}\approx5{,}0\cdot10^{11}$, nên kết luận đổi chiều. Với $\lambda=10^{-5}$, chênh lệch khoảng $366$ lần, nên kết luận "Newton có lợi theo cận" không đổi.

**Kiểm tra lại.** $\frac{10\cdot5{,}04\cdot10^{10}}{2\cdot10^8\cdot18{,}42}\approx137$ và $\frac{5{,}04\cdot10^{10}}{2\cdot10^8}\approx252$.
:::

Bottou và Bousquet (2011, Bảng 13.2, tr. 362) lập một bảng tương tự. Trong bảng đó, hạ gradient tốn $O(nd)$ mỗi bước và $O(\kappa\log\frac1\rho)$ bước, với $\kappa=\lambda_{\max}/\lambda_{\min}$ là số điều kiện của Hessian tại điểm cực tiểu (Bottou và Bousquet 2011, (13.10), tr. 360), khác $\kappa=L/\mu$ toàn cục của Định lý 04.27, và $\rho$ là độ chính xác tối ưu theo ký hiệu của Bottou và Bousquet. Phương pháp bậc hai của họ giả định biết trước nghịch đảo Hessian, nên mỗi bước chỉ tốn $O(d^2+nd)$, với $O(\log\log\frac1\rho)$ bước.

### 6.7. Chi phí theo quy mô dữ liệu

Ví dụ sau tính các đại lượng của Mệnh đề 05.33 ở ba quy mô; quy mô thứ ba là kích thước tập RCV1.

::: example Ví dụ 05.23 (Chi phí theo ba quy mô)
**Dữ kiện.** Ma trận dày đặc $X\in\mathbb R^{n\times d}$; mỗi số thực chiếm $8$ byte ở độ chính xác kép. Quy mô thứ ba là RCV1 trong thí nghiệm của Bottou và Bousquet: $n=781\,265$, $d=47\,152$.

**Bảng.**

| $(n,d)$ | $nd$ | $nd^2$ | $d^3$ | Hessian ($8d^2$ byte) | $d+d^2/n$ |
|---|---:|---:|---:|---:|---:|
| $(10^3,\ 10^2)$ | $10^5$ | $10^7$ | $10^6$ | 80 kB | $110$ |
| $(10^5,\ 10^3)$ | $10^8$ | $10^{11}$ | $10^9$ | 8 MB | $1010$ |
| $(781\,265;\ 47\,152)$ | $3{,}68\cdot10^{10}$ | $1{,}74\cdot10^{15}$ | $1{,}05\cdot10^{14}$ | 17,8 GB | $\approx5{,}0\cdot10^4$ |

**Đọc bảng.** Khi $(n,d)$ tăng, một bước Newton đắt hơn một bước hạ gradient từ $10^2$ đến $5\cdot10^4$ lần. Ở quy mô thứ ba, riêng Hessian cần 17,8 GB bộ nhớ, và một bước Newton với Hessian dày đặc tốn $nd^2+d^3\approx1{,}84\cdot10^{15}$ phép nhân–cộng.

**Kiểm tra lại.** Dòng ba: $8\cdot47\,152^2\approx1{,}78\cdot10^{10}$ byte; $d^2/n=47\,152^2/781\,265\approx2846$, nên $d+d^2/n\approx49\,998$.
:::

Theo cách đếm với ma trận dày đặc, một tích $Xv$ trên RCV1 cần $nd\approx3{,}7\cdot10^{10}$ phép nhân–cộng, và một gradient đầy đủ theo Thuật toán 05.31 cần hai tích như vậy, khoảng $7{,}4\cdot10^{10}$; đó là chi phí của mỗi lần cập nhật hạ gradient. Với dữ liệu thưa như RCV1, $nd$ được thay bằng số phần tử khác $0$ của $X$ (Nhận xét 05.35).

Ba bài tập sau kiểm tra bước cập nhật và phép đếm chi phí.

::: exercise Bài tập 05.7 (Một bước hạ gradient và một bước Newton)
Cho ví dụ một mẫu với $\lambda=0{,}05$, tức $F_\lambda(w)=\log(1+e^{-w})+0{,}025\,w^2$ và $L=0{,}3$, nghiệm $w_\lambda=2{,}1280$, và điểm đầu $w_0=1$.

1. Tính $F_\lambda'(1)$ và $F_\lambda''(1)$.
2. Tính một bước hạ gradient bước $\frac1L$ và một bước Newton bước đầy đủ từ $w_0$.
3. So khoảng cách tới nghiệm sau một bước của hai phương pháp.
:::

::: hint
$\sigma(1)\approx0{,}7311$ và $\sigma(-1)\approx0{,}2689$. Dùng $F_\lambda'(w)=-\sigma(-w)+\lambda w$ và $F_\lambda''(w)=\sigma(w)\sigma(-w)+\lambda$.
:::

::: solution
1. $F_\lambda'(1)=-0{,}2689+0{,}05=-0{,}2189$ và $F_\lambda''(1)=0{,}7311\cdot0{,}2689+0{,}05=0{,}1966+0{,}05=0{,}2466$.

2. Hạ gradient: $w_1=1+0{,}2189/0{,}3=1{,}7298$. Newton: $w_1=1+0{,}2189/0{,}2466=1{,}8878$.

3. Khoảng cách ban đầu $1{,}128$. Sau một bước: hạ gradient $2{,}1280-1{,}7298=0{,}398$, Newton $2{,}1280-1{,}8878=0{,}240$. Bước Newton dài hơn vì nó chia cho độ cong tại chỗ $0{,}2466$, nhỏ hơn $L=0{,}3$.

**Kiểm tra lại.** Hai bước Newton tiếp theo cho $2{,}1138$ và $2{,}12798$, với sai số giá trị $1{,}5\cdot10^{-5}$ và $2\cdot10^{-10}$, đúng kiểu hội tụ bậc hai.
:::

::: exercise Bài tập 05.8 (Chi phí dày đặc và thưa)
Một bài toán hồi quy logistic có $n=10^4$ mẫu và $d=10^2$ đặc trưng.

1. Với $X$ dày đặc, tính chi phí một bước hạ gradient, chi phí một bước Newton theo bậc, tỉ số $d+d^2/n$ và bộ nhớ của Hessian.
2. Với $X$ thưa có $5\cdot10^4$ phần tử khác $0$, tính chi phí một bước hạ gradient và chi phí lập Hessian.
:::

::: hint
Với dữ liệu thưa, mỗi tích $Xv$ tốn bằng số phần tử khác $0$. Hessian là tổng các tích ngoài $S_{ii}x_ix_i^T$; một hàng có $k_i$ phần tử khác $0$ đóng góp $k_i^2$ phần tử.
:::

::: solution
1. Hạ gradient: $nd=10^6$ cho mỗi tích, $2\cdot10^6$ cho một bước. Newton: $nd^2+d^3=10^8+10^6\approx1{,}01\cdot10^8$. Tỉ số $100+1=101$. Hessian $8\cdot10^4$ byte, tức 80 kB, nhỏ.

2. Mỗi tích $Xv$ tốn $5\cdot10^4$, nên một bước hạ gradient tốn khoảng $10^5$, giảm $20$ lần. Trung bình mỗi hàng có $5$ phần tử khác $0$, nên lập Hessian tốn khoảng $\sum_ik_i^2\approx n\cdot25=2{,}5\cdot10^5$ nếu các $k_i$ đều nhau; Hessian $d\times d$ vẫn có thể dày đặc và Cholesky vẫn tốn bậc $d^3=10^6$.

**Kiểm tra lại.** $(nd^2+d^3)/(nd)=1{,}01\cdot10^8/10^6=101=d+d^2/n$.
:::

::: exercise Bài tập 05.9 (Bước Newton khi $n=1$)
Cho $\lambda=0{,}5$, $c=(1,2)$ và $g=(1,1)$; $H=\lambda I+cc^T$ là trường hợp $n=1$, $U=c$ của Mệnh đề 05.34.

1. Tính $p=-H^{-1}g$ theo (6.3).
2. Kiểm tra bằng cách nhân $H$ với $p$.
3. Đếm số phép nhân–cộng của cách tính ở câu 1 khi $c\in\mathbb R^d$, và so với giải hệ $d\times d$.
:::

::: hint
Với $n=1$, $(\lambda+c^Tc)^{-1}$ là phép chia một số.
:::

::: solution
1. $c^Tc=5$, $c^Tg=3$, nên $U(\lambda+U^TU)^{-1}U^Tg=c\cdot\tfrac3{5{,}5}=(0{,}5455;\ 1{,}0909)$. Do đó $p=-\tfrac1{0{,}5}\bigl[(1,1)-(0{,}5455;\ 1{,}0909)\bigr]=-2\cdot(0{,}4545;\ -0{,}0909)=(-0{,}9091;\ 0{,}1818)$.

2. $H=\begin{pmatrix}1{,}5&2\\2&4{,}5\end{pmatrix}$, và $Hp=(1{,}5\cdot(-0{,}9091)+2\cdot0{,}1818;\ 2\cdot(-0{,}9091)+4{,}5\cdot0{,}1818)=(-1{,}0;\ -1{,}0)=-g$.

3. Tính $c^Tc$ và $c^Tg$ tốn $2d$, nhân $c$ với một số và trừ khỏi $g$ tốn $2d$: tổng $O(d)$. Giải hệ $d\times d$ bằng Cholesky tốn bậc $d^3$.

**Kiểm tra lại.** Câu 3 khớp Mệnh đề 05.34 với $n=1$: $O(n^2d+n^3)=O(d)$.
:::

Như vậy, Newton đổi số bước lấy chi phí $d^2$, $d^3$ mỗi bước, và mọi phương pháp tất định của bài trả chi phí của toàn bộ $n$ mẫu ở mỗi bước. Tuy nhiên, đích của việc tối ưu là rủi ro kỳ vọng, nên còn phải xét điểm lặp nào nên được trả về.

## 7. Giới hạn của tối ưu tất định

Trên ví dụ năm mẫu với $d=5$, chạy hạ gradient tới điểm cực tiểu chính xác của $F$ cho đa thức nội suy, có sai số xác thực $0{,}0487$. Chúng ta cần biết sai số xác thực của các điểm lặp trung gian, trước khi dãy tới gần điểm cực tiểu đó.

### 7.1. Dừng sớm

Ví dụ sau chạy hạ gradient trên mất mát bình phương không chính quy hóa và theo dõi cả hai sai số dọc quỹ đạo.

::: example Ví dụ 05.24 (Nghiệm chính xác và nghiệm dừng sớm)
**Dữ kiện.** Ví dụ năm mẫu với đặc trưng $(1,u,\ldots,u^4)$, $d=5$; $F(w)=\frac1{10}\lVert Xw-y\rVert^2$ không chính quy hóa; tập xác thực bốn điểm. Theo Ví dụ 05.8, $L=\lambda_{\max}(X^TX)/5=1{,}5715$ và $\kappa=553{,}7$. Hạ gradient bước $\frac1L$ từ $w=0$.

**Sai số xác thực dọc quỹ đạo.**

| $k$ | $0$ | $10$ | $50$ | $79$ | $200$ | $1000$ | $k\to\infty$ |
|---|---:|---:|---:|---:|---:|---:|---:|
| MSE huấn luyện | $0{,}5$ | $0{,}0322$ | $0{,}0187$ | $0{,}0147$ | $0{,}00845$ | $0{,}00047$ | $0$ |
| MSE xác thực | $0{,}3125$ | $0{,}0107$ | $0{,}00200$ | $0{,}00108$ | $0{,}00487$ | $0{,}0341$ | $0{,}0487$ |

**Đọc bảng.** MSE xác thực nhỏ nhất bằng $0{,}00108$, đạt tại $k=79$, rồi tăng dần về giới hạn $0{,}0487$ của đa thức nội suy. MSE huấn luyện giảm liên tục và xuống dưới $10^{-6}$ từ bước $2701$; tại đó MSE xác thực là $0{,}0480$.

**So sánh.** Dừng ở bước $79$ thay vì bước $2701$ tốn ít hơn khoảng $34$ lần số lượt qua dữ liệu (epoch), và cho sai số xác thực nhỏ hơn $0{,}0487/0{,}00108\approx45$ lần so với giới hạn.

**Kiểm tra lại.** Tại $k=0$, $w=0$ nên hai sai số bằng trung bình $y^2$ và trung bình $u'^2$: $0{,}5$ và $0{,}3125$, như dòng $d=1$ của Ví dụ 05.4.
:::

![Hai trục logarit, k từ 1 đến 10⁴. MSE huấn luyện giảm liên tục, xuống dưới 10⁻⁶ từ bước 2701. MSE trên tập xác thực giảm tới 0,00108 tại k = 79 (vạch đứng) rồi tăng về giới hạn 0,0487 (đường ngang chấm).](img/lec-05/kl-early-stopping.svg)

Để làm rõ quy tắc chọn bước dừng theo sai số xác thực, xem định nghĩa sau.

::: definition Định nghĩa 05.36 (Dừng sớm)
Cho một thuật toán lặp sinh dãy $w_0,w_1,\ldots,w_K$ trên mục tiêu huấn luyện, và một tập xác thực. *Dừng sớm* (early stopping) là quy tắc trả về $w_{k^\star}$ với

$$
k^\star\in\arg\min_{0\le k\le K}\ \widehat R_{\rm xt}(w_k),
$$

trong đó $\widehat R_{\rm xt}$ là sai số trên tập xác thực. Trong thực hành, $K$ không cố định trước: thuật toán dừng khi sai số xác thực không giảm sau một số lần đánh giá cho trước.
:::

Dừng sớm biến số bước thành một siêu tham số, chọn trên tập xác thực như $d$ hay $\lambda$. Giá trị $\widehat R_{\rm xt}(w_{k^\star})=0{,}00108$ là số nhỏ nhất trên cả quỹ đạo, nên báo cáo cuối cần một tập kiểm thử riêng. Goodfellow và cộng sự (2016, §7.8, Thuật toán 7.1) mô tả cùng quy tắc với tham số "kiên nhẫn" (patience) là số lần đánh giá không cải thiện trước khi dừng.

Để hiểu vì sao sai số xác thực có đáy, ta viết dãy hạ gradient trên mất mát bình phương theo các hướng riêng của Hessian.

::: proposition Mệnh đề 05.37 (Hạ gradient trên bình phương nhỏ nhất theo hướng riêng) — chứng minh đầy đủ
**Giả thiết.**

- **Hàm.** $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$ với $\operatorname{rank}X=d$; $w^*$ là nghiệm của (4.2).
- **Phổ.** $A=\frac1nX^TX=\sum_{j=1}^ds_jv_jv_j^T$ với trị riêng $0<s_1\le\cdots\le s_d=L$ và vector riêng trực chuẩn $v_j$.
- **Thuật toán.** Hạ gradient bước $\frac1L$ từ điểm đầu $0$.

**Kết luận.** Với mọi $k\ge0$,

$$
\begin{aligned}
w_k&=\sum_{j=1}^d\Bigl[1-\bigl(1-\tfrac{s_j}L\bigr)^k\Bigr]\\
&\qquad\cdot(v_j^Tw^*)\,v_j .
\end{aligned}
\tag{7.1}
$$
:::

::: proof Chứng minh Mệnh đề 05.37
**Lộ trình.** Viết gradient theo sai lệch $w-w^*$, lặp đệ quy tuyến tính, rồi chiếu lên các vector riêng.

**Bước 1 (gradient theo sai lệch).** Từ (4.2), $\frac1nX^Ty=Aw^*$, nên $\nabla F(w)=Aw-\frac1nX^Ty=A(w-w^*)$.

**Bước 2 (đệ quy của sai lệch).** Trừ $w^*$ hai vế của $w_{k+1}=w_k-\frac1LA(w_k-w^*)$:

$$
\begin{aligned}
&w_{k+1}-w^*\\
&\quad=\Bigl(I-\frac1LA\Bigr)(w_k-w^*) .
\end{aligned}
$$

Lặp lại $k$ lần từ điểm đầu $0$, ta được

$$
w_k-w^*=-\Bigl(I-\frac1LA\Bigr)^kw^* .
$$

**Bước 3 (theo hướng riêng).** $I-\frac1LA$ có cùng vector riêng $v_j$ với trị riêng $1-s_j/L$, nên thành phần của $w_k-w^*$ theo $v_j$ là $-(1-s_j/L)^k\,v_j^Tw^*$. Cộng với thành phần $v_j^Tw^*$ của $w^*$ cho (7.1). $\square$
:::

Hệ số $1-(1-s_j/L)^k$ trong (7.1) là phần của thành phần thứ $j$ đã được khớp sau $k$ bước. Nó gần $1$ sau vài bước với hướng có độ cong lớn, và tăng rất chậm với hướng có độ cong nhỏ. Trên ví dụ năm mẫu, $s_j=0{,}00284;\ 0{,}0255;\ 0{,}252;\ 0{,}881;\ 1{,}571$; tại $k=79$, hệ số bằng $0{,}133;\ 0{,}726;\ 1{,}000;\ 1{,}000;\ 1{,}000$, và tại $k=1000$, hệ số của hướng phẳng nhất mới đạt $0{,}836$.

Trên ví dụ này, phần nghiệm theo hướng phẳng nhất ($s_1\approx0{,}0028$) làm sai số xác thực tăng. Giữ trọn ba hướng cong và hướng $s_2$, bỏ hướng $s_1$, cho MSE xác thực $0{,}0013$; thêm trọn hướng $s_1$ cho $0{,}0487$. Hướng $s_2\approx0{,}0255$ thì cần cho dự đoán: bỏ cả hai hướng phẳng, MSE xác thực là $0{,}0163$.

Nhiễu nhãn của Ví dụ 05.7 dịch nghiệm gần như hoàn toàn theo $v_1$: hình chiếu của $\delta w=0{,}01\cdot(1,0,-5,0,4)$ lên $v_1$ có độ lớn $0{,}0646$, so với $\lVert\delta w\rVert=0{,}0648$. Số điều kiện $\kappa=553{,}7$ vì vậy vừa làm hạ gradient chậm (Định lý 04.27) vừa tạo khoảng cách lớn giữa lúc khớp các hướng cong và lúc khớp hướng phẳng nhất.

Nghiệm có chính quy hóa của (4.6) có dạng tương tự. Từ $(A+\lambda I)w_\lambda=Aw^*$, ta có $w_\lambda=\sum_j\frac{s_j}{s_j+\lambda}(v_j^Tw^*)v_j$: hệ số $\frac{s_j}{s_j+\lambda}$ cũng gần $1$ với hướng cong và gần $0$ với hướng có $s_j\ll\lambda$. Dừng sớm vì vậy có tác dụng gần với chính quy hóa bậc hai (Goodfellow và cộng sự 2016, §7.8, tr. 250–252).

**Trong học máy.** Goodfellow và cộng sự (2016, §7.8, tr. 247–249) xếp dừng sớm vào các dạng chính quy hóa được dùng nhiều nhất khi huấn luyện mạng nơ-ron, vì nó không đòi sửa mục tiêu và tiết kiệm chính các bước bị bỏ.

### 7.2. Số liệu trên tập RCV1

Bottou và Bousquet (2011, §13.4.1, tr. 363) báo cáo một thí nghiệm trên dữ liệu thật: phân loại văn bản thuộc chủ đề CCAT của tập RCV1-v2, sau khi hoán đổi tập huấn luyện và tập kiểm thử chính thức, với $781\,265$ văn bản huấn luyện, $23\,149$ văn bản kiểm thử và $47\,152$ đặc trưng TF-IDF. Mô hình là hồi quy logistic có chính quy hóa, $\lambda=10^{-5}$, với hệ số chặn không bị phạt. Ví dụ sau ghi lại kết quả của họ với mất mát logistic.

::: example Ví dụ 05.25 (Hồi quy logistic trên RCV1)
**Dữ kiện.** Bảng 13.3 của Bottou và Bousquet (2011, tr. 363), các dòng mất mát logistic. TRON là phương pháp Newton miền tin cậy (trust region Newton), bộ tối ưu siêu tuyến tính mà Bottou và Bousquet dùng làm điểm so sánh; $\rho$ là độ chính xác tối ưu yêu cầu. SGD dùng ở mỗi bước gradient của một mẫu chọn ngẫu nhiên ($b=1$) và bước $\eta_t=\frac1{\lambda(t+t_0)}$.

| Phương pháp | Thời gian huấn luyện | Giá trị mục tiêu | Lỗi kiểm thử |
|---|---:|---:|---:|
| TRON, $\rho=10^{-2}$ | 30 s | $0{,}18907$ | 5,68 % |
| TRON, $\rho=10^{-3}$ | 44 s | $0{,}18890$ | 5,70 % |
| SGD | 2,3 s | $0{,}18893$ | 5,66 % |

**Đọc bảng.** SGD có chi phí mỗi bước không phụ thuộc $n$ và đạt cùng mức lỗi kiểm thử với thời gian nhỏ hơn một bậc độ lớn. Giá trị mục tiêu chênh nhau không quá $1{,}7\cdot10^{-4}$.

**Kiểm tra lại.** Sai số chuẩn của một tỉ lệ lỗi $\hat e\approx0{,}057$ trên $n_{\rm kt}=23\,149$ mẫu kiểm thử là $\sqrt{\hat e(1-\hat e)/n_{\rm kt}}=\sqrt{0{,}057\cdot0{,}943/23\,149}\approx0{,}0015$, tức khoảng $0{,}15$ điểm phần trăm. Ba lỗi kiểm thử chênh nhau $0{,}04$ điểm phần trăm, nhỏ hơn sai số chuẩn của mỗi tỉ lệ lỗi.
:::

Bảng cho hai quan sát, bao gồm:

- SGD, với chi phí mỗi bước không phụ thuộc $n$, nhanh hơn TRON khoảng $13$ lần ($2{,}3$ s so với $30$ s); theo Bottou và Bousquet, TRON đạt điểm cực tiểu với mười chữ số đúng trong chưa tới một phút;
- giảm $\rho$ từ $10^{-2}$ xuống $10^{-3}$ đổi lỗi kiểm thử từ $5{,}68\,\%$ sang $5{,}70\,\%$, chênh $0{,}02$ điểm phần trăm, nhỏ hơn sai số chuẩn $0{,}15$ điểm của mỗi tỉ lệ lỗi; theo Hình 13.1 của Bottou và Bousquet (tr. 364–365), mất mát trên tập kiểm thử ngừng giảm từ lâu trước khi TRON vượt SGD về độ chính xác tối ưu.

### 7.3. Hai giới hạn của mô hình tuyến tính và phương pháp tất định

Khung của bài có hai giới hạn: giới hạn thứ nhất thuộc phương pháp, giới hạn thứ hai thuộc mô hình.

**Giới hạn (i): chi phí.** Khi $n$ lớn và ngân sách tính toán cố định, chi phí theo $n$ của mỗi bước (Mệnh đề 05.33) buộc thay gradient đầy đủ bằng gradient trên một lô nhỏ mẫu, tức hạ gradient ngẫu nhiên. Theo Định lý 05c.53, gradient trên lô nhỏ $b$ mẫu rút đều có hoàn lại là ước lượng không chệch của $\nabla F$, với chi phí $O(bd)$ không phụ thuộc $n$.

**Giới hạn (ii): biểu diễn.** Với một bộ đặc trưng cố định, dự đoán tuyến tính theo đặc trưng không biểu diễn được một số quan hệ. Ví dụ kinh điển là bài toán XOR (Goodfellow và cộng sự 2016, §6.1): bốn điểm $u\in\{0,1\}^2$, nhãn $+1$ tại $(0,1)$ và $(1,0)$, nhãn $-1$ tại $(0,0)$ và $(1,1)$.

::: proposition Mệnh đề 05.38 (XOR không tách được bằng điểm số affine) — chứng minh đầy đủ
**Giả thiết.** Bốn điểm XOR như trên; đặc trưng $(1,u_1,u_2)$, tức điểm số affine $g(u)=w_0+w_1u_1+w_2u_2$.

**Kết luận.**

1. Không $w\in\mathbb R^3$ nào cho $g$ đúng dấu tại cả bốn điểm.
2. Với đặc trưng $(1,u_1,u_2,u_1u_2)$, dữ liệu tách được, chẳng hạn bởi $\bar w=(-\tfrac12,1,1,-2)$ với mọi biên bằng $\tfrac12$.
:::

::: proof Chứng minh Mệnh đề 05.38
**Lộ trình.** Một đẳng thức tuyến tính giữa bốn giá trị của hàm affine mâu thuẫn với các dấu đòi hỏi; thêm tích $u_1u_2$ thì kiểm trực tiếp.

**Bước 1 (một đẳng thức của hàm affine).** Với mọi $w$,

$$
\begin{aligned}
&g(1,0)+g(0,1)\\&=(w_0+w_1)+(w_0+w_2)\\&=2w_0+w_1+w_2\\&=w_0+(w_0+w_1+w_2)\\&=g(0,0)+g(1,1).
\end{aligned}
$$

**Bước 2 (mâu thuẫn).** Phân loại đúng đòi $g(1,0)>0$ và $g(0,1)>0$, nên vế trái dương; đồng thời $g(0,0)<0$ và $g(1,1)<0$, nên vế phải âm. Hai vế bằng nhau theo Bước 1, mâu thuẫn. Đó là kết luận 1.

**Bước 3 (thêm tích).** Với $\bar w=(-\tfrac12,1,1,-2)$, điểm số $-\tfrac12+u_1+u_2-2u_1u_2$ bằng $-\tfrac12$ tại $(0,0)$, $\tfrac12$ tại $(1,0)$ và $(0,1)$, và $-\tfrac12+1+1-2=-\tfrac12$ tại $(1,1)$. Nhân với nhãn, mọi biên bằng $\tfrac12$. Đó là kết luận 2. $\square$
:::

Kết luận 2 dùng một đặc trưng chọn thủ công cho đúng bài toán này. Ba điểm $-,+,-$ của Ví dụ 05.10 là dạng một chiều của XOR: điểm số affine theo $u$ không đổi dấu đủ số lần, và thêm $u^2$ thì tách được. Cả hai ví dụ cho cùng một cách sửa: thêm đặc trưng thủ công. Mệnh đề sau đếm chi phí của cách sửa đó khi đầu vào có nhiều chiều.

::: proposition Mệnh đề 05.39 (Số đơn thức của $d_0$ biến) — chứng minh đầy đủ
**Giả thiết.** $u\in\mathbb R^{d_0}$; đặc trưng là mọi đơn thức $u_1^{\alpha_1}\cdots u_{d_0}^{\alpha_{d_0}}$ với $\alpha_i\in\{0,1,2,\ldots\}$ và $\alpha_1+\cdots+\alpha_{d_0}\le q$, kể cả đơn thức hằng $1$.

**Kết luận.** Số đặc trưng là

$$
d=\binom{d_0+q}{q}.
\tag{7.2}
$$

Với $q$ cố định, $d$ tăng như $d_0^q/q!$ khi $d_0\to\infty$.
:::

::: proof Chứng minh Mệnh đề 05.39
**Lộ trình.** Thêm một biến bù để đổi sang đếm nghiệm nguyên không âm của một phương trình.

**Bước 1 (đổi sang nghiệm nguyên).** Mỗi đơn thức ứng với đúng một bộ $(\alpha_1,\ldots,\alpha_{d_0})$ nguyên không âm có tổng không quá $q$. Thêm biến bù $\alpha_0=q-\sum_i\alpha_i\ge0$, mỗi bộ đó ứng với đúng một nghiệm nguyên không âm của $\alpha_0+\alpha_1+\cdots+\alpha_{d_0}=q$.

**Bước 2 (đếm).** Số nghiệm nguyên không âm của phương trình $d_0+1$ ẩn có tổng $q$ bằng số cách xếp $q$ viên bi và $d_0$ vách ngăn thành một hàng, tức $\binom{q+d_0}{d_0}=\binom{d_0+q}{q}$. $\square$
:::

Với $d_0=100$ biến đầu vào, (7.2) cho $\binom{102}2=5151$ đặc trưng khi $q=2$ và $\binom{103}3=176\,851$ khi $q=3$. Mở rộng đặc trưng thủ công vì vậy làm $d$ tăng nhanh, và kéo theo ba hiện tượng, bao gồm:

- quá khớp, và số điều kiện không giảm;
- chế độ tách được làm mất điểm cực tiểu của mất mát logistic;
- chi phí $d^2$, $d^3$ mỗi bước của Newton.

**Trong học máy.** Mệnh đề 05.38 và 05.39 nói về đặc trưng thủ công, như đặc trưng đa thức hay tích của các biến đầu vào. Với các đặc trưng này, đặc trưng cố định và mục tiêu lồi theo $w$, nên mọi định lý của bài vẫn áp dụng; chi phí là $d$ tăng theo (7.2). Mạng nơ-ron học đặc trưng cùng với $w$, nên mục tiêu không còn lồi, nên các định lý về điểm cực tiểu toàn cục của hồi quy logistic có chính quy hóa không còn áp dụng.

### 7.4. Bảo đảm còn lại khi rời khung tất định

Hai giới hạn trên đẩy bài toán ra khỏi khung tất định theo hai cách, bao gồm:

- **(i) chi phí**: gradient đầy đủ được thay bằng gradient trên lô nhỏ;
- **(ii) biểu diễn**: để vượt giới hạn này, mạng hai tầng học đặc trưng cùng với tham số, tham số đi vào mô hình một cách phi tuyến, nên mục tiêu không còn lồi.

Ký hiệu: $K$ là số bước, $\eta$ là bước hằng, $\Delta_0$ là giá trị của $F$ tại điểm đầu trừ $\inf F$, và $\tau^2$ là chặn phương sai của nhiễu gradient ngẫu nhiên. Để làm rõ bảo đảm nào mất và bảo đảm nào thay thế, xem nhận xét sau.

::: remark Nhận xét 05.40 (Bảo đảm còn lại khi rời khung tất định)
| Mất (khi nào) | Còn giữ được |
|---|---|
| Đích là nghiệm chính xác (ngay trong Bài 05, vì $F$ chỉ đại diện cho $R$) | Đích là $R$ nhỏ; dừng sớm và chính quy hóa là một phần của phương pháp (Định nghĩa 05.36, Định lý 05.26) |
| Hội tụ tuyến tính tất định của Định lý 04.27 (khi (i) hoặc (ii)) | Gradient đầy đủ, khi còn tính được: $F$ giảm ở mỗi bước với bước không quá $\frac1L$ (Bổ đề 04.21). SGD trên $F_\lambda$ lồi mạnh: bước hằng giữ $\mathbb E\lVert w_k-w_\lambda\rVert^2$ ở mức có bậc $\eta\tau^2/\mu$ (Định lý 05b.36); bước giảm dần cho hội tụ tới điểm cực tiểu với tốc độ $O(1/k)$ (Định lý 05b.39) |
| Cực tiểu toàn cục (khi (ii)) | Điểm dừng xấp xỉ: hạ gradient có $\min_{k<K}\lVert\nabla F(w_k)\rVert^2\le\frac{2L\Delta_0}K$ (Định lý 05b.41); SGD bước hằng có $\frac1K\sum_{k<K}\mathbb E\lVert\nabla F(w_k)\rVert^2\le\frac{2\Delta_0}{\eta K}+L\eta\tau^2$ (Định lý 05b.43) |
| Chi phí $O(nd)$ mỗi bước (khi (i)) | Gradient trên lô nhỏ không chệch, chi phí không phụ thuộc $n$ (Định lý 05c.53) |

Giả thiết đầy đủ và chứng minh của các kết quả ở cột phải nằm ở Bài 05b và Bài 05c. Ba điểm sau hay bị đọc sai, bao gồm:

1. Với bước hằng, Định lý 05b.36 đưa SGD tới một lân cận bán kính bậc $\sqrt{\eta\tau^2/\mu}$ của điểm cực tiểu; hội tụ tới điểm cực tiểu cần bước giảm dần (Định lý 05b.39).
2. Định lý 05b.41 chỉ chặn chuẩn gradient nhỏ nhất trong $K$ bước, không chặn điểm cuối. Định lý 05b.43 có số hạng $L\eta\tau^2$ không giảm theo $K$, tức một mức nhiễu nền, nên với bước hằng, cận của trung bình kỳ vọng bình phương chuẩn gradient không tiến về $0$.
3. SGD không bảo đảm $F$ giảm theo kỳ vọng ở mỗi bước. Khi $F$ có gradient $L$-Lipschitz và gradient ngẫu nhiên không chệch, có phương sai không quá $\tau^2$ theo điều kiện trên lịch sử $\mathcal F_k$ tới bước $k$, điều còn lại là bất đẳng thức một bước $\mathbb E[F(w_{k+1})\mid\mathcal F_k]\le F(w_k)-\eta\bigl(1-\tfrac{L\eta}2\bigr)\lVert\nabla F(w_k)\rVert^2+\tfrac{L\eta^2\tau^2}2$, có thêm số hạng nhiễu tỉ lệ với $\eta^2$; bất đẳng thức này đủ để suy ra tốc độ theo kỳ vọng khi bước đủ nhỏ hoặc giảm dần.
:::

Ba bài tập sau kiểm tra giới hạn biểu diễn và dừng sớm.

::: exercise Bài tập 05.10 (Chẵn lẻ ba bit)
Ba bit $u\in\{0,1\}^3$ có nhãn $+1$ khi số bit bằng $1$ là lẻ và $-1$ khi số đó chẵn (bài toán chẵn lẻ ba bit). Viết $s=u_1+u_2+u_3$.

1. Chứng minh không điểm số affine $g(u)=w_0+w_1u_1+w_2u_2+w_3u_3$ nào đúng dấu tại cả tám điểm.
2. Chứng minh thêm riêng đặc trưng $u_1u_2u_3$ vẫn chưa đủ để tách dữ liệu.
3. Với đặc trưng gồm $1$, ba bit, ba tích đôi một và $u_1u_2u_3$, cho một $\bar w$ tách dữ liệu và tính các biên.
:::

::: hint
Ở câu 1, so tổng của $g$ trên bốn điểm có số bit lẻ với tổng trên bốn điểm có số bit chẵn, như Bước 1 của chứng minh Mệnh đề 05.38. Ở câu 2, đặc trưng $u_1u_2u_3$ bằng $0$ tại mọi điểm có $s\le2$; cộng các bất đẳng thức tại ba điểm có $s=1$ và tại ba điểm có $s=2$. Ở câu 3, khai triển tích $\prod_i(1-2u_i)$.
:::

::: solution
1. Bốn điểm có số bit lẻ là $100$, $010$, $001$, $111$; bốn điểm có số bit chẵn là $000$, $110$, $101$, $011$. Trong mỗi nhóm, mỗi bit bằng $1$ đúng hai lần, nên tổng của $g$ trên mỗi nhóm đều bằng $4w_0+2(w_1+w_2+w_3)$. Phân loại đúng đòi tổng trên nhóm lẻ dương và tổng trên nhóm chẵn âm, mâu thuẫn.

2. Đặt $W=w_1+w_2+w_3$. Tại các điểm có $s\le2$, đặc trưng $u_1u_2u_3$ bằng $0$, nên điều kiện đúng dấu chỉ chứa $w_0,w_1,w_2,w_3$:

- tại $000$: $w_0<0$;
- cộng ba điểm có $s=1$: $3w_0+W>0$, tức $W>-3w_0$;
- cộng ba điểm có $s=2$: $3w_0+2W<0$, tức $W<-\tfrac32w_0$.

Vì $w_0<0$, ta có $-3w_0>-\tfrac32w_0$, nên hai bất đẳng thức cuối mâu thuẫn.

3. Khai triển $\prod_{i=1}^3(1-2u_i)=1-2s+4(u_1u_2+u_1u_3+u_2u_3)-8u_1u_2u_3$; tích này bằng $+1$ khi $s$ chẵn và $-1$ khi $s$ lẻ. Lấy điểm số $-\tfrac12\prod_i(1-2u_i)$, tức

$$
\begin{aligned}
\bar w=\bigl(&-\tfrac12;\ 1,1,1;\\
&-2,-2,-2;\ 4\bigr)
\end{aligned}
$$

theo thứ tự đặc trưng $1$; $u_1,u_2,u_3$; $u_1u_2,u_1u_3,u_2u_3$; $u_1u_2u_3$. Điểm số bằng $-\tfrac12$ khi $s$ chẵn và $\tfrac12$ khi $s$ lẻ, nên mọi biên bằng $\tfrac12$. Kiểm tra tại $111$: $-\tfrac12+3-6+4=\tfrac12$. Với đầu vào nhị phân, $u_i^2=u_i$, nên tám đặc trưng này là mọi đơn thức phân biệt.

Đơn thức bậc ba là cần thiết. Nếu một bộ tách chỉ dùng đơn thức bậc không quá $2$, lấy trung bình điểm số của nó qua sáu hoán vị của ba bit; nhãn không đổi khi hoán vị bit, nên trung bình vẫn tách dữ liệu, và có dạng $a+bs+c\,s(s-1)/2$. Đa thức bậc hai theo $s$ này đổi dấu nhiều nhất hai lần, trong khi nhãn tại $s=0,1,2,3$ đổi dấu ba lần, mâu thuẫn. Theo câu 2, các tích đôi một cũng cần thiết.
:::

::: exercise Bài tập 05.11 (Đếm đơn thức)
Đầu vào có $d_0=10$ biến.

1. Tính số đặc trưng đa thức bậc không quá $q$ theo Mệnh đề 05.39 với $q=2$ và $q=3$.
2. Với đầu vào nhị phân $u\in\{0,1\}^{10}$, $u_i^2=u_i$, nên chỉ các đơn thức không lặp biến là khác nhau. Đếm số đơn thức như vậy có bậc không quá $3$.
3. Với $n=200$ mẫu có đầu vào thực, chọn $q$ nhỏ nhất để $d\ge n$, và nêu hệ quả đối với hồi quy logistic không chính quy hóa nếu $\operatorname{rank}X=n$.
:::

::: hint
Ở câu 2, một đơn thức không lặp biến bậc $j$ ứng với một tập con $j$ phần tử của $\{1,\ldots,10\}$.
:::

::: solution
1. $q=2$: $\binom{12}2=66$. $q=3$: $\binom{13}3=286$.

2. $\binom{10}0+\binom{10}1+\binom{10}2+\binom{10}3=1+10+45+120=176$.

3. $q=2$ cho $d=66<200$ và $q=3$ cho $d=286\ge200$, nên $q=3$. Khi đó, nếu $\operatorname{rank}X=200$, Mệnh đề 05.21 cho mọi cách gán nhãn tách được, và Định lý 05.22 cho mất mát logistic không chính quy hóa không có điểm cực tiểu với mọi nhãn; cần $\lambda>0$ (Định lý 05.26).
:::

::: exercise Bài tập 05.12 (Dừng sớm trên hàm bậc hai chéo)
Cho $F(w)=\tfrac12(w-w^*)^TA(w-w^*)$ với $A=\operatorname{diag}(1;\ 0{,}01)$ và $w^*=(1,1)$; hạ gradient bước $\frac1L=1$ từ $w_0=0$.

1. Dùng (7.1) để viết $w_k$, và tính $w_{10}$, $w_{100}$.
2. Tìm bước nhỏ nhất $k$ để thành phần thứ hai của $w_k$ đạt ít nhất $0{,}5$.
3. Tính nghiệm $w_\lambda$ của $\min F(w)+\frac\lambda2\lVert w\rVert^2$ với $\lambda=0{,}01$, và so với câu 2.
:::

::: hint
Với $A$ chéo, các hướng riêng là hai trục tọa độ. Theo quy ước $s_1\le s_2$ của Mệnh đề 05.37, $s_1=0{,}01$ (trục thứ hai, hướng phẳng) và $s_2=1$ (trục thứ nhất, hướng cong). Ở câu 3, dùng $(A+\lambda I)w_\lambda=Aw^*$.
:::

::: solution
1. $w_k=\bigl(1-0^k,\ 1-0{,}99^k\bigr)$, tức $w_k=(1,\ 1-0{,}99^k)$ với $k\ge1$. Do $0{,}99^{10}=0{,}9044$ và $0{,}99^{100}=0{,}3660$, ta có $w_{10}=(1;\ 0{,}0956)$ và $w_{100}=(1;\ 0{,}634)$.

2. $1-0{,}99^k\ge0{,}5$ khi $k\ge\log0{,}5/\log0{,}99=68{,}97$, nên $k=69$.

3. $w_\lambda=\bigl(\tfrac1{1{,}01},\ \tfrac{0{,}01}{0{,}02}\bigr)=(0{,}990;\ 0{,}5)$. Dừng ở bước $69$ cho $(1;\ 0{,}50)$, gần $w_\lambda$: cả hai cách khớp trọn hướng cong và khớp một nửa hướng phẳng. Kiểm tra: $(A+\lambda I)w_\lambda=(1{,}01\cdot0{,}990;\ 0{,}02\cdot0{,}5)=(1;\ 0{,}01)=Aw^*$.
:::

Như vậy, dừng sớm và chính quy hóa cho một $w$ có sai số xác thực nhỏ hơn điểm cực tiểu chính xác của $F$. Tuy nhiên, hai giới hạn về chi phí và biểu diễn đòi gradient trên lô nhỏ và đặc trưng học được, và khi đó các bảo đảm của Nhận xét 05.40 thay cho các định lý của bài.

## 8. Ý nghĩa, tác động và giới hạn

### 8.1. Chọn mô hình và báo cáo sai số trên ví dụ năm mẫu

::: application Tình huống 05.1 (Chọn mô hình và báo cáo sai số trên ví dụ năm mẫu)
**Bài toán và dữ liệu.** Một kỹ sư cần một mô hình hồi quy cho ví dụ năm mẫu và một con số báo cáo sai số trên dữ liệu mới. Ngoài tập xác thực bốn điểm $u'=\pm\tfrac14,\pm\tfrac34$, kỹ sư giữ riêng một tập kiểm thử tám điểm $u''=\pm\tfrac18,\pm\tfrac38,\pm\tfrac58,\pm\tfrac78$, cùng quy ước nhãn bằng $u''$ không nhiễu. Cả hai tập được chọn trước khi huấn luyện.

**Mô hình hóa.** Danh sách ứng viên gồm năm mô hình bình phương nhỏ nhất với $d=1,\ldots,5$ (Ví dụ 05.4), hai mô hình có chính quy hóa với $d=5$ và $\lambda\in\{0{,}1;\ 0{,}01\}$ (Ví dụ 05.9), một mô hình với $d=8$ và $\lambda=0{,}01$, và nghiệm dừng sớm tại bước $79$ với $d=5$ (Ví dụ 05.24).

**Xác minh giả thiết.** Mọi tham số được tính từ năm mẫu huấn luyện và không dùng tập kiểm thử. Hai tập là lưới điểm chọn trước với nhãn không nhiễu, không rút ngẫu nhiên từ $P$, nên Mệnh đề 05.7 và Nhận xét 05.8 không áp dụng trực tiếp; theo Nhận xét 05.9, khi $u$ phân phối đều trên $[-1,1]$, MSE trên mỗi tập là công thức trung điểm xấp xỉ $2R(w)-\sigma_\varepsilon^2$, nên thứ tự giữa các mô hình theo MSE xấp xỉ thứ tự theo $R$. Bước dừng $79$ đã được chọn trên chính tập xác thực (Ví dụ 05.24), nên con số báo cáo của mô hình này lấy từ cột kiểm thử.

**Áp dụng.** Bước chọn dùng tập xác thực (Định nghĩa 05.6):

| Mô hình | MSE xác thực | MSE kiểm thử |
|---|---:|---:|
| $d=1$ | $0{,}3125$ | $0{,}328$ |
| $d=2$ | $0{,}000125$ | $0{,}000131$ |
| $d=3$ | $0{,}000205$ | $0{,}000222$ |
| $d=4$ | $0{,}00107$ | $0{,}00120$ |
| $d=5$ | $0{,}0487$ | $0{,}0364$ |
| $d=5$, $\lambda=0{,}1$ | $0{,}0189$ | $0{,}0178$ |
| $d=5$, $\lambda=0{,}01$ | $0{,}00261$ | $0{,}00206$ |
| $d=8$, $\lambda=0{,}01$ | $0{,}00763$ | $0{,}00516$ |
| $d=5$, dừng sớm ở bước $79$ | $0{,}00108$ | $0{,}00092$ |

Cột xác thực chọn $d=2$. Quy trình chỉ đọc ô kiểm thử của mô hình đã chọn, $d=2$: con số được báo cáo là $0{,}000131$; các ô còn lại để đối chiếu với cột xác thực.

**Diễn giải.** Với $d=2$, sai số tại mọi điểm là $-0{,}02u$, nên MSE kiểm thử là $0{,}0004$ nhân trung bình của $u''^2$, tức $0{,}0004\cdot0{,}328=0{,}000131$. Trên ví dụ này, mô hình $d=2$, đúng dạng với quan hệ thật, có MSE kiểm thử nhỏ nhất trong bảng. Với $d=5$, hai cách sửa, chính quy hóa $\lambda=0{,}01$ và dừng sớm, giảm sai số xác thực lần lượt khoảng $19$ và $45$ lần so với đa thức nội suy.

**Giới hạn.** Nếu kỹ sư chọn mô hình theo cột kiểm thử, cùng một tập vừa dùng để chọn vừa dùng để báo cáo, nên con số báo cáo không còn là đánh giá độc lập.

**Dẫn ngược lý thuyết.** Định nghĩa 05.5, 05.6, Mệnh đề 05.7, Nhận xét 05.8, 05.9, Mệnh đề 05.17 và Định nghĩa 05.36.
:::

### 8.2. Hồi quy logistic không chính quy hóa trên dữ liệu tách được

::: application Tình huống 05.2 (Hồi quy logistic không chính quy hóa trên dữ liệu tách được)
**Bài toán và dữ liệu.** Ví dụ ba điểm, đặc trưng $(1,u,u^2)$. Một người huấn luyện hồi quy logistic không chính quy hóa bằng hạ gradient và chờ thuật toán hội tụ.

**Mô hình hóa.** $F$ là (5.1) với $n=3$; $L=\lambda_{\max}(X^TX)/12=4{,}5616/12=0{,}3801$; hạ gradient bước $\frac1L=2{,}631$ từ $w=0$.

**Giả thiết bị vi phạm.** $\operatorname{rank}X=3=n$, nên dữ liệu tách được (Mệnh đề 05.21) và $F$ không có điểm cực tiểu (Định lý 05.22). Giả thiết "có điểm cực tiểu" của các định lý hội tụ theo khoảng cách không thỏa.

**Hậu quả quan sát được.** Chạy thuật toán:

| $k$ | $10$ | $10^2$ | $10^3$ | $10^4$ | $10^5$ |
|---|---:|---:|---:|---:|---:|
| $\lVert w_k\rVert$ | $3{,}24$ | $8{,}41$ | $13{,}66$ | $18{,}83$ | $23{,}98$ |
| $F(w_k)$ | $0{,}183$ | $0{,}0199$ | $0{,}00192$ | $1{,}90\cdot10^{-4}$ | $1{,}90\cdot10^{-5}$ |

Đúng như Hệ quả 05.23, $F(w_k)\to0$ và $\lVert w_k\rVert$ tăng không bị chặn, ở đây khoảng $5{,}2$ đơn vị cho mỗi lần $k$ tăng mười lần, tức theo $\log k$. Tại $k=10^5$, các biên nằm giữa $10{,}3$ và $11{,}4$, nên xác suất dự đoán đúng nhãn vượt $0{,}9999$ tại cả ba điểm. Gradient cũng tiến về $0$, nên một tiêu chí dừng theo chuẩn gradient sẽ dừng ở một $w_k$ có chuẩn tùy theo ngưỡng.

**Diễn giải.** Chuẩn $\lVert w_k\rVert$, và vì vậy các xác suất dự đoán, do lúc dừng quyết định: ba mẫu cho xác suất đúng nhãn vượt $0{,}9999$ chỉ vì $k$ lớn. Hướng $w_k/\lVert w_k\rVert$ thì ổn định: tại $k=10^5$, hướng $w_k/\lVert w_k\rVert\approx(0{,}429;\ 0;\ -0{,}903)$, gần hướng $(0{,}447;\ 0;\ -0{,}894)$ của $\bar w=(1,0,-2)$.

**Cách sửa.** Số hạng phạt $\lambda>0$ cho nghiệm duy nhất với chuẩn bị chặn (Định lý 05.26); với $\lambda=0{,}01$, $w_\lambda=(1{,}557;\ 0;\ -4{,}245)$ và xác suất dự đoán tại $u=0$ là $0{,}826$ (Ví dụ 05.16). Dừng sớm theo tập xác thực là cách sửa thứ hai.

**Dẫn ngược lý thuyết.** Mệnh đề 05.21, Định lý 05.22, Hệ quả 05.23, Định lý 05.26 và Mệnh đề 05.28.
:::

### 8.3. Chọn phương pháp tính cho hồi quy logistic có chính quy hóa

::: application Tình huống 05.3 (Chọn phương pháp tính cho hồi quy logistic có chính quy hóa)
**Bài toán và dữ liệu.** Giả sử một hệ thống chấm điểm tín dụng huấn luyện hồi quy logistic trên $n=10^6$ hồ sơ với $d=100$ đặc trưng dày đặc; phần đặc trưng của mỗi $x_i$ được chia cho chuẩn của nó, nên có chuẩn không quá $1$. Hệ số chính quy hóa chọn trên tập xác thực là $\lambda=10^{-4}$. Yêu cầu độ chính xác tối ưu $e_0/\varepsilon_{\rm tol}=10^8$.

**Mô hình hóa.** Mục tiêu $F_\lambda$ của Định lý 05.26; hai ứng viên là hạ gradient (Thuật toán 05.31) và Newton (Thuật toán 05.32).

**Xác minh giả thiết.** $F_\lambda$ lồi mạnh với $\mu=\lambda$ (Định lý 05.26). Với tọa độ hằng, $\lVert x_i\rVert^2\le2$, nên Mệnh đề 05.28 cho $\kappa\le1+\frac2{4\cdot10^{-4}}=5001$. Giả thiết của Định lý 04.37 thỏa trên mọi tập mức dưới, vì Hessian bị chặn hai phía và liên tục Lipschitz; số bước Newton được giả định $N_{\rm N}=10$, theo Ví dụ 05.19 (từ $4$ đến $7$ bước).

**Áp dụng.**

- Hạ gradient: Định lý 04.27 cho tối đa $5001\cdot18{,}42\approx9{,}2\cdot10^4$ bước, mỗi bước $nd=10^8$, nên $C_{\rm HG}\approx9{,}2\cdot10^{12}$.
- Newton: mỗi bước $nd^2+d^3=10^{10}+10^6$, nên $C_{\rm N}\approx1{,}0\cdot10^{11}$. Hessian chiếm $8\cdot10^4$ byte, tức 80 kB.
- Tỉ số hai cận khoảng $92$; tính cả hằng số của hai thuật toán, khoảng $354$. Ngay cả khi cận của hạ gradient bi quan $20$ lần như ở Ví dụ 05.19, Newton vẫn rẻ hơn khoảng $4{,}6$ lần.

**Diễn giải.** Với $d=100$ và $\kappa\le5001$, cận của Newton nhỏ hơn khoảng $92$ lần: chi phí $d^2$, $d^3$ nhỏ và số bước không tăng theo $\kappa$ ở pha bậc hai. Riêng ma trận dữ liệu dày đặc chiếm $8nd=8\cdot10^8$ byte, tức 800 MB, lớn hơn Hessian $10^4$ lần.

**Giới hạn.** Nếu $d$ tăng lên $10^4$, một bước Newton tốn khoảng $10^{14}$ và Hessian cần 800 MB; hai cận khi đó cùng bậc, $9{,}2\cdot10^{14}$ và $1{,}0\cdot10^{15}$, và phép đếm không còn phân định (Ví dụ 05.22). Nếu $n$ tăng lên $10^8$, mọi bước của cả hai phương pháp tăng chi phí $100$ lần.

**Dẫn ngược lý thuyết.** Định lý 05.26, Mệnh đề 05.28, Định lý 04.27, 04.37, Mệnh đề 05.33 và (6.4)–(6.6).
:::

### 8.4. Ứng dụng trong học máy

Các ứng dụng gồm:

- **Chọn siêu tham số.** Bậc đa thức, hệ số chính quy hóa và số bước huấn luyện đều được chọn trên tập xác thực và báo cáo trên tập kiểm thử (Định nghĩa 05.6, Mệnh đề 05.7). Kiểm định chéo là biến thể dùng khi dữ liệu ít (Goodfellow và cộng sự 2016, §5.3.1).
- **Dừng sớm.** Huấn luyện mạng nơ-ron thường dừng theo sai số xác thực (Định nghĩa 05.36); Mệnh đề 05.37 là trường hợp tuyến tính của cơ chế này (Goodfellow và cộng sự 2016, §7.8).
- **Học quy mô lớn.** Trên RCV1, SGD đạt cùng lỗi kiểm thử nhanh hơn TRON, bộ giải Newton miền tin cậy, khoảng $13$ lần (Ví dụ 05.25).

### 8.5. Tóm tắt

Tăng $d$ tới $n$ đưa bình phương nhỏ nhất vào chế độ nội suy, nơi sai số huấn luyện bằng $0$ còn sai số xác thực tăng, và làm mất điểm cực tiểu của mất mát logistic. Chính quy hóa bậc hai cho bài toán đặt chỉnh với hằng số lồi mạnh $\lambda$, nhưng số điều kiện tăng theo $1/\lambda$. Mọi phương pháp tất định trả chi phí theo $n$ ở mỗi bước, và trên ví dụ năm mẫu, dừng sớm cho sai số xác thực nhỏ hơn sai số xác thực của điểm cực tiểu chính xác.

| Nội dung | Kết quả cần tra lại |
|---|---|
| Thiết lập | Định nghĩa 05.1; Nhận xét 05.2 |
| Hồi quy nhiều chiều | Mệnh đề 05.3, 05.4, 05.7, 05.10, 05.11, 05.14–05.17; Định nghĩa 05.5, 05.6, 05.13; Nhận xét 05.8, 05.9, 05.12, 05.18 |
| Hồi quy logistic và chính quy hóa | Mệnh đề 05.19, 05.21, 05.24, 05.28; Định nghĩa 05.20; Định lý 05.22, 05.26; Hệ quả 05.23, 05.27; Nhận xét 05.25, 05.29 |
| Độ cong và chi phí | Nhận xét 05.30, 05.35; Thuật toán 05.31, 05.32; Mệnh đề 05.33, 05.34; (6.4)–(6.6) |
| Giới hạn của tối ưu tất định | Định nghĩa 05.36; Mệnh đề 05.37–05.39; Nhận xét 05.40 |

Các công thức cần nhớ gồm:

- phương trình chuẩn và hồi quy có chính quy hóa: $X^TXw=X^Ty$; $\bigl(\frac1nX^TX+\lambda I\bigr)w=\frac1nX^Ty$;
- nghiệm chuẩn nhỏ nhất: $w_{\rm mn}=X^T(XX^T)^{-1}y$ khi $\operatorname{rank}X=n$;
- số điều kiện của mất mát bình phương: $\kappa_F=\kappa(X^TX)$; cận độ nhạy $\lVert\delta w\rVert\le\lVert\delta y\rVert/\sqrt{\lambda_{\min}(X^TX)}$;
- hồi quy logistic có chính quy hóa: $\mu=\lambda$, $L=\frac{\lambda_{\max}(X^TX)}{4n}+\lambda$, $\kappa\le1+\frac{r^2}{4\lambda}$, $\lVert w_\lambda\rVert\le\sqrt{2\log2/\lambda}$;
- số bước hạ gradient: $k\ge\kappa\log(e_0/\varepsilon_{\rm tol})$ (Định lý 04.27); số bước của pha bậc hai của Newton: $\log_2\log_2(\varepsilon_0/\varepsilon_{\rm tol})$ (Định lý 04.37);
- chi phí một bước: $O(nd)$ và $O(nd^2+d^3)$; khi $d>n$, $O(n^2d+n^3)$; Newton rẻ hơn theo cận khi $\kappa\log\frac{e_0}{\varepsilon_{\rm tol}}>N_{\rm N}\bigl(d+\frac{d^2}n\bigr)$.

Các điểm hay bị đọc sai gồm:

- tập dùng để chọn mô hình không dùng được để báo cáo $R$ (Nhận xét 05.8);
- tính lồi không bảo đảm sự tồn tại điểm cực tiểu; tính tách được của dữ liệu quyết định (Định lý 05.22);
- tọa độ hằng $1$ cho $\lVert x_i\rVert\ge1$, nên $r\ge1$ trong Mệnh đề 05.28;
- cận số bước theo $\kappa$ là cận trên toàn cục; số bước thực theo số điều kiện cục bộ (Nhận xét 05.30);
- riêng số bước của pha bậc hai của Newton không chứa $\kappa$; toàn bộ cận thì có (Định lý 04.37);
- phép đếm theo bậc chỉ phân định khi hai cận chênh nhau nhiều bậc (Ví dụ 05.22);
- SGD bước hằng chỉ tới một lân cận của điểm cực tiểu (Nhận xét 05.40).

## 9. Bài tập

Các bài tập trong thân bài và mục tiêu học tập mà mỗi bài kiểm tra:

1. **Bài tập 05.1** (Phương trình chuẩn với đặc trưng $(1,u,u^2)$): mục tiêu 1; phương trình (4.2) và Mệnh đề 05.4.
2. **Bài tập 05.2** (Hai đặc trưng trùng nhau): mục tiêu 1; tập nghiệm, $w_{\rm mn}$ và $w_\lambda$.
3. **Bài tập 05.3** (Hai đặc trưng gần cộng tuyến): mục tiêu 1; số điều kiện và cận (4.5).
4. **Bài tập 05.4** (Tách được với $(1,u)$ và $(1,u^2)$): mục tiêu 2; Mệnh đề 05.24 và Định lý 05.22.
5. **Bài tập 05.5** (Hằng số của ba điểm với $(1,u)$): mục tiêu 2; hằng số (5.6) và cận chuẩn.
6. **Bài tập 05.6** (Tính tốt nhất của $L$ và $\mu$): mục tiêu 2; Hessian tại $0$ và dọc tia $t\bar w$.
7. **Bài tập 05.7** (Một bước hạ gradient và một bước Newton): mục tiêu 3; hai quy tắc (6.1), (6.2).
8. **Bài tập 05.8** (Chi phí dày đặc và thưa): mục tiêu 3; Mệnh đề 05.33 và Nhận xét 05.35.
9. **Bài tập 05.9** (Bước Newton khi $n=1$): mục tiêu 3; công thức (6.3) và Mệnh đề 05.34.
10. **Bài tập 05.10** (Chẵn lẻ ba bit): mục tiêu 4; giới hạn biểu diễn, Mệnh đề 05.38.
11. **Bài tập 05.11** (Đếm đơn thức): mục tiêu 2, 4; công thức (7.2) và chế độ tách được.
12. **Bài tập 05.12** (Dừng sớm trên hàm bậc hai chéo): mục tiêu 4; công thức (7.1) và so với chính quy hóa.

Các bài tập tiếp theo củng cố toàn bài, chia theo ba mức.

### 9.1. Mức nhận biết

::: exercise Bài tập 05.13 (Đúng hay sai)
Xác định mỗi phát biểu đúng hay sai, và nêu kết quả hoặc phản ví dụ của bài làm căn cứ.

1. Với các bộ đặc trưng lồng nhau, thêm đặc trưng không làm tăng MSE huấn luyện tại nghiệm bình phương nhỏ nhất.
2. Với các bộ đặc trưng lồng nhau, thêm đặc trưng không làm tăng MSE xác thực.
3. Mất mát logistic lồi, nên luôn có điểm cực tiểu.
4. Với $\lambda>0$, mục tiêu logistic có chính quy hóa có đúng một điểm cực tiểu với mọi dữ liệu.
5. Số bước của phương pháp Newton không phụ thuộc số điều kiện.
6. Sai số xác thực của mô hình được chọn là ước lượng không chệch của rủi ro kỳ vọng của nó.
:::

::: hint
Mỗi phát biểu ứng với một kết quả đánh số về hồi quy, hồi quy logistic hoặc số bước; phát biểu sai cần một ví dụ cụ thể.
:::

::: solution
1. Đúng, theo Mệnh đề 05.4.
2. Sai: trong Ví dụ 05.4, MSE xác thực tăng từ $0{,}000125$ ở $d=2$ lên $0{,}0487$ ở $d=5$.
3. Sai: trên dữ liệu tách được, $\inf F=0$ không đạt (Định lý 05.22); Ví dụ 05.11 với ba điểm và đặc trưng $(1,u,u^2)$.
4. Đúng, theo Định lý 05.26: $F_\lambda$ lồi mạnh với hằng số $\lambda$.
5. Sai nếu không kèm điều kiện: theo Định lý 04.37, riêng số bước của pha bậc hai không chứa $\kappa$; pha tắt dần và $\varepsilon_0$ phụ thuộc độ cong. Trong Ví dụ 05.19, số bước Newton tăng từ $4$ lên $7$ khi $\kappa$ tăng từ $6$ lên $501$.
6. Sai: giá trị xác thực nhỏ nhất trong một danh sách có xu hướng thấp hơn rủi ro (Nhận xét 05.8); Mệnh đề 05.7 chỉ áp dụng khi tham số không phụ thuộc tập đánh giá.

**Kiểm tra lại.** Câu 2: $0{,}0487/0{,}000125\approx389$, khớp Ví dụ 05.4.
:::

### 9.2. Mức tính toán hoặc chứng minh

::: exercise Bài tập 05.14 (Hạ gradient tìm nghiệm chuẩn nhỏ nhất)
Cho $X\in\mathbb R^{n\times d}$ với $\operatorname{rank}X=n<d$, $y\in\mathbb R^n$, $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$ và $L=\lambda_{\max}(X^TX)/n$. Hạ gradient bước $\frac1L$ xuất phát từ điểm đầu $0$.

1. Chứng minh mọi $w_k$ có dạng $X^Ta_k$ với một $a_k\in\mathbb R^n$ duy nhất.
2. Viết phép lặp của $a_k$ và chứng minh $a_k\to(XX^T)^{-1}y$.
3. Suy ra $w_k\to w_{\rm mn}$ của Mệnh đề 05.11, và nêu điều thay đổi khi điểm đầu là một vector $v\ne0$.
:::

::: hint
$\nabla F(w)=\frac1nX^T(Xw-y)$ thuộc ảnh của $X^T$. Ma trận $G=XX^T$ xác định dương và có cùng các trị riêng khác $0$ với $X^TX$.
:::

::: solution
1. Quy nạp theo $k$. Với $k=0$, điểm đầu $0=X^T\cdot0$. Nếu $w_k=X^Ta_k$ thì

$$
\begin{aligned}
w_{k+1}&=X^Ta_k\\
&\quad-\tfrac1{nL}X^T(XX^Ta_k-y)\\
&=X^T\bigl[a_k-\tfrac1{nL}(Ga_k-y)\bigr],
\end{aligned}
$$

với $G=XX^T$. Tính duy nhất: $X^T$ có $n$ cột độc lập tuyến tính (các hàng của $X$), nên $X^Ta=X^Ta'$ kéo theo $a=a'$.

2. $a_{k+1}=a_k-\frac1{nL}(Ga_k-y)$. Theo Bước 1 của chứng minh Mệnh đề 05.11, $G\succ0$; đặt $a^*=G^{-1}y$. Trừ đẳng thức $a^*=a^*-\frac1{nL}(Ga^*-y)$:

$$
\begin{aligned}
&a_{k+1}-a^*\\
&\quad=\Bigl(I-\frac1{nL}G\Bigr)(a_k-a^*).
\end{aligned}
$$

Nếu $Gq=sq$ với $q\ne0$ thì $X^TX(X^Tq)=sX^Tq$ và $X^Tq\ne0$, nên mọi trị riêng $s$ của $G$ là trị riêng dương của $X^TX$, và $0<s\le\lambda_{\max}(X^TX)=nL$. Do đó các trị riêng $1-s/(nL)$ của $I-\frac1{nL}G$ nằm trong $[0,1)$, và $a_k-a^*\to0$.

3. $w_k=X^Ta_k\to X^Ta^*=X^T(XX^T)^{-1}y=w_{\rm mn}$. Khi điểm đầu là $v\ne0$, viết $v=v^{\parallel}+v^{\perp}$ với $v^{\parallel}$ thuộc ảnh của $X^T$ và $v^{\perp}\in\ker X$. Mọi bước chỉ cộng các vector thuộc ảnh của $X^T$, nên $v^{\perp}$ giữ nguyên, và $w_k\to w_{\rm mn}+v^{\perp}$: một nghiệm khác của $Xw=y$, có chuẩn lớn hơn nếu $v^{\perp}\ne0$.

**Kiểm tra lại.** Với $X=(1\ \ 1)$, $y=2$ của Bài tập 05.2: $G=2$, $nL=2$, nên $a_1=0-\tfrac12(0-2)=1=G^{-1}y$ và $w_1=X^Ta_1=(1,1)=w_{\rm mn}$ sau một bước.
:::

### 9.3. Mức vận dụng

::: exercise Bài tập 05.15 (Hồi quy logistic trên dữ liệu văn bản thưa)
Một bài toán phân loại văn bản có $n=10^5$ văn bản và $d=5\cdot10^4$ đặc trưng TF-IDF. Ma trận $X$ thưa: mỗi văn bản có $100$ tọa độ khác $0$, nên $X$ có $10^7$ phần tử khác $0$. Mỗi vector đặc trưng có chuẩn bình phương không quá $2$ sau khi thêm tọa độ hằng. Hệ số chính quy hóa là $\lambda=10^{-4}$, độ chính xác yêu cầu $e_0/\varepsilon_{\rm tol}=10^8$.

1. Tính chi phí một bước hạ gradient khi tận dụng tính thưa, cận số bước theo Định lý 04.27 và cận tổng chi phí.
2. Với Newton dùng Hessian dày đặc, tính bộ nhớ của Hessian và chi phí phân tích Cholesky mỗi bước; giải thích vì sao Mệnh đề 05.34 không giúp ở đây.
3. Với Newton giải hệ bằng gradient liên hợp (Nhận xét 05.35), giả định mỗi bước Newton cần $50$ tích Hessian–vector và cần $10$ bước Newton. Tính tổng chi phí và so với câu 1.
4. Nêu giới hạn của kết luận ở câu 3.
:::

::: hint
Với dữ liệu thưa, một tích $Xv$ hoặc $X^Tv$ tốn bằng số phần tử khác $0$. Một tích $Hv=\frac1nX^T\bigl(S(Xv)\bigr)+\lambda v$ gồm hai tích như vậy cộng $O(n+d)$.
:::

::: solution
1. Một bước hạ gradient gồm hai tích thưa, khoảng $2\cdot10^7$ phép nhân–cộng. Theo Mệnh đề 05.28 với $r^2=2$, $\kappa\le1+\frac2{4\cdot10^{-4}}=5001$. Định lý 04.27 cho tối đa $5001\cdot18{,}42\approx9{,}2\cdot10^4$ bước, nên cận tổng chi phí là khoảng $9{,}2\cdot10^4\cdot2\cdot10^7\approx1{,}8\cdot10^{12}$.

2. Hessian $d\times d$ nói chung dày đặc và chiếm $8d^2=2\cdot10^{10}$ byte, tức 20 GB. Phân tích Cholesky tốn khoảng $d^3/6\approx2{,}1\cdot10^{13}$ phép nhân–cộng mỗi bước, gấp khoảng $11$ lần cận tổng chi phí của hạ gradient chỉ trong một bước. Mệnh đề 05.34 có lợi khi $n<d$; ở đây $n=10^5>d$, nên hệ $n\times n$ còn lớn hơn hệ $d\times d$.

3. Mỗi tích $Hv$ tốn khoảng $2\cdot10^7$, như một gradient. Mỗi bước Newton gồm một gradient và $50$ tích, khoảng $51\cdot2\cdot10^7\approx10^9$; mười bước tốn khoảng $1{,}0\cdot10^{10}$. Con số này nhỏ hơn cận của hạ gradient khoảng $180$ lần, và không cần lưu Hessian.

4. Số tích Hessian–vector và số bước Newton là giả định; số vòng gradient liên hợp cần thiết tăng theo số điều kiện của Hessian, nên với $\lambda$ nhỏ hơn có thể cần nhiều hơn $50$. Cận của hạ gradient còn bi quan (Nhận xét 05.30), nên tỉ số thật nhỏ hơn $180$. Với dữ liệu thưa và $d$ lớn, phương pháp bậc hai ở đây chỉ khả thi khi không lập Hessian dày đặc, như cách dùng gradient liên hợp ở câu 3.

**Kiểm tra lại.** $\log10^8=18{,}42$; $9{,}2\cdot10^4\cdot2\cdot10^7=1{,}84\cdot10^{12}$ và $1{,}84\cdot10^{12}/1{,}0\cdot10^{10}\approx180$.
:::

## 10. Câu hỏi cuối buổi và cầu nối

Điểm lặp ở bước $79$ dự đoán chính xác hơn: MSE xác thực bằng $0{,}00108$ ở bước $79$ và $0{,}0341$ ở bước $1000$ (Ví dụ 05.24). Hạ gradient khớp trước các hướng có độ cong lớn và khớp sau cùng hướng phẳng nhất (Mệnh đề 05.37); trên ví dụ năm mẫu, phần nghiệm theo hướng này là phần làm sai số xác thực tăng.

**Câu hỏi.** Cho bốn điểm XOR $u\in\{0,1\}^2$, nhãn $+1$ tại $(0,1)$, $(1,0)$ và $-1$ tại $(0,0)$, $(1,1)$, với đặc trưng $(1,u_1,u_2,u_1u_2)$.

- (a) Xác định mất mát logistic trung bình không chính quy hóa có điểm cực tiểu hay không, với nhãn XOR và với một cách gán nhãn bất kỳ cho bốn điểm này.
- (b) Với $\lambda=0{,}1$, biết $\lambda_{\max}(X^TX)\approx6{,}854$, tính $\mu$, $L$, $\kappa$ của $F_\lambda$ theo Mệnh đề 05.28, và số bước hạ gradient bước $\tfrac1L$ mà Định lý 04.27 bảo đảm cho $e_k\le10^{-8}e_0$.

::: solution Lời giải câu hỏi cuối buổi
**Câu (a).** Bốn hàng của $X$ là $(1,0,0,0)$, $(1,1,0,0)$, $(1,0,1,0)$, $(1,1,1,1)$; ma trận tam giác dưới này có đường chéo bằng $1$, nên $\operatorname{rank}X=4=n$. Theo Mệnh đề 05.21, mọi cách gán nhãn tách được, và theo Định lý 05.22, mất mát không có điểm cực tiểu với mọi cách gán nhãn.

**Câu (b).** $\mu=\lambda=0{,}1$, $L=6{,}854/16+0{,}1\approx0{,}528$, $\kappa\approx5{,}28$. Định lý 04.27 cho $k\ge5{,}284\cdot\log10^8\approx97{,}3$, tức $98$ bước.

**Kiểm tra lại.** $\log10^8=18{,}42$ và $5{,}284\cdot18{,}42=97{,}3$. Các trị riêng của $X^TX$ là $0{,}146$; $1$; $1$; $6{,}854$, có tổng $9=\operatorname{tr}X^TX=4+2+2+1$.
:::

Mọi phương pháp của bài dùng gradient trên toàn bộ $n$ mẫu và đặc trưng cố định. Bài 06 nới hai giới hạn này; hai bài bổ trợ 05b, 05c chứng minh các bảo đảm dùng ở đó:

- Bài 06 (Mở rộng mô hình và dữ liệu) thay gradient đầy đủ bằng gradient trên lô nhỏ mẫu, và thay đặc trưng cố định bằng đặc trưng học được trong mạng hai tầng, bắt đầu từ bài toán XOR; mục tiêu khi đó không lồi;
- Bài 05b (Hội tụ của hạ gradient và hạ gradient ngẫu nhiên) chứng minh các bảo đảm của Nhận xét 05.40 cho gradient ngẫu nhiên và cho hàm không lồi;
- Bài 05c (Xác suất cơ bản, bất đẳng thức tập trung và mất mát trung bình trên lô nhỏ) ước lượng phương sai của gradient trên lô nhỏ.

## 11. Tài liệu đọc

- **Trước buổi học:**
  - Goodfellow, Ian; Bengio, Yoshua; Courville, Aaron (2016), *Deep Learning*, MIT Press: §5.2 (tr. 110–117: dung lượng mô hình, quá khớp và khớp thiếu), §5.3 (tr. 120–122: tập xác thực, kiểm định chéo).
  - Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press: §6.3.2 (tr. 306: chính quy hóa), §7.1.1 (tr. 354–355: hồi quy logistic).
- **Sau buổi học:**
  - Goodfellow, Bengio và Courville (2016): §6.1 (bài toán XOR), §7.1.1 (tr. 231: suy giảm trọng số), §7.3 (tr. 239–240: bài toán thiếu ràng buộc, hồi quy logistic trên dữ liệu tách được, giả nghịch đảo), §7.8 (tr. 246–252: dừng sớm, Thuật toán 7.1, quan hệ với chính quy hóa $L^2$), §8.6.3 (tr. 316–317: BFGS và L-BFGS), §8.1 (tr. 275–277: rủi ro thực nghiệm), §8.2.1 (điều kiện hóa kém).
  - Boyd và Vandenberghe (2004): §9.1.2 (tr. 459–461: lồi mạnh và số điều kiện), §9.3.1 (hội tụ của hạ gradient), §9.5.1–9.5.3 (tr. 484–491: bất biến affine, hội tụ hai pha của Newton), §9.7.1–9.7.2 (tr. 508–512: chi phí Cholesky, hệ Newton có cấu trúc).
  - Bottou, Léon; Bousquet, Olivier (2011), "The Tradeoffs of Large-Scale Learning", trong Sra, Suvrit; Nowozin, Sebastian; Wright, Stephen J. (biên tập), *Optimization for Machine Learning*, MIT Press, ch. 13: §13.1–13.2 (tr. 351–354: sai số xấp xỉ, ước lượng và tối ưu), Bảng 13.2 (tr. 362: chi phí của các thuật toán gradient), §13.4.1 và Bảng 13.3 (tr. 363: thí nghiệm RCV1).
  - Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả: §10.2.6 (tr. 346: bình phương nhỏ nhất có trọng số lặp), §10.2.8 (tr. 350: chuẩn hóa đặc trưng), §11.3 (tr. 381: hồi quy ridge).
- **Mở rộng:**
  - Boyd, Stephen, slide bài giảng cho MIT OpenCourseWare 6.079 *Introduction to Convex Optimization* (Fall 2009), Lecture 16 *Unconstrained minimization*, tr. 10–29 (chi phí phân tích Cholesky) và 10–30 (hệ Newton dày đặc có cấu trúc); tài liệu theo giấy phép CC BY-NC-SA 4.0.
