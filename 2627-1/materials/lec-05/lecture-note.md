# Bài 05 — Không gian đặc trưng nhiều chiều

## Mục tiêu học tập

Nội dung dưới đây gắn với hai chuẩn đầu ra bài học (LLO) của đề cương. LLO11 (các khó khăn khi tối ưu mô hình học máy, trong đó có điều kiện hóa kém và sự khác nhau giữa đại lượng được tối ưu với đại lượng cần nhỏ trên dữ liệu mới) đóng góp chuẩn đầu ra học phần CLO1 và CLO2. LLO15, ở phần phương pháp Newton, đóng góp CLO4.

Sau chương này, người học có thể:

1. Giải phương trình chuẩn của hồi quy bình phương nhỏ nhất với đặc trưng đa thức, xác định hạng, tập nghiệm và số điều kiện; phân biệt sai số huấn luyện với sai số ngoài mẫu khi số đặc trưng $d$ tăng; chọn mô hình bằng tập xác thực và báo cáo trên tập kiểm thử (LLO11; CLO1).
2. Chứng minh mất mát logistic không có điểm cực tiểu trên dữ liệu tách được tuyến tính, chứng minh mục tiêu có chính quy hóa bậc hai lồi mạnh, và tính hằng số lồi mạnh $\mu$, hằng số trơn $L$ và số điều kiện $\kappa$ của nó (LLO11; CLO1, CLO2).
3. Đếm chi phí một bước của hạ gradient và của phương pháp Newton, đổi các định lý hội tụ thành số bước, và chọn phương pháp theo bộ $(n,d,\kappa,\varepsilon_{\rm tol})$ (LLO15, LLO11; CLO4, CLO1).
4. Giải thích vì sao dừng sớm và chính quy hóa là một phần của phương pháp học, và nêu hai giới hạn của mô hình tuyến tính cùng phương pháp tất định khi dữ liệu lớn (LLO11; CLO1).

## Kiến thức tiên quyết

Số hiệu `01.k`, `02.k`, `04.k`, `05b.k`, `05c.k` chỉ ghi chú Bài 01, 02, 04 và hai bài bổ trợ 05b, 05c. Mỗi kết quả được phát biểu lại ở dạng cần dùng; nơi dùng nó trong chương nêu lại giả thiết.

- **Bình phương nhỏ nhất** (Mệnh đề 01.6). Với $X\in\mathbb R^{n\times d}$ và $y\in\mathbb R^n$ tùy ý, phương trình chuẩn $X^TXw=X^Ty$ luôn có nghiệm; nếu $w^*$ là một nghiệm thì tập nghiệm là $\{w^*+v:\ v\in\ker X\}$; nghiệm duy nhất khi và chỉ khi $\operatorname{rank}X=d$.
- **Hồi quy với chính quy hóa bậc hai** (Mệnh đề 02.21(c)). Với $\lambda>0$, bài toán bình phương nhỏ nhất cộng hạng phạt $\lambda\lVert w\rVert^2$ có đúng một nghiệm với mọi $X$.
- **Mất mát logistic** (Định nghĩa 01.8, Mệnh đề 01.9). Với biên có dấu $m$, mất mát $\phi(m)=\log(1+e^{-m})$ dương, giảm chặt, $\phi'(m)=-1/(1+e^{m})\in(-1,0)$, $\phi''(m)\in(0,\tfrac14]$ đạt $\tfrac14$ tại $m=0$, và $\phi(m)\to0$ khi $m\to+\infty$. Bài 01 viết $\ell$ cho hàm này; ở đây chúng ta viết $\phi$ để dành $\ell$ cho mất mát của một mẫu.
- **Sự tồn tại và tính duy nhất của điểm cực tiểu** (Định lý 01.36, Định nghĩa 01.37, Định lý 01.38, Hệ quả 01.41, Nhận xét 01.43). Hàm liên tục trên tập không rỗng, đóng, bị chặn đạt giá trị nhỏ nhất (Weierstrass). Hàm liên tục và cưỡng bức (coercive) trên $\mathbb R^d$, tức $f(w)\to\infty$ khi $\lVert w\rVert\to\infty$, đạt giá trị nhỏ nhất. Hàm khả vi lồi mạnh có đúng một điểm cực tiểu. Tính lồi chặt không bảo đảm sự tồn tại điểm cực tiểu.
- **Hạ gradient trên hàm lồi mạnh** (Định lý 04.26, Định lý 05b.18). Nếu $f$ có gradient $L$-Lipschitz và lồi mạnh với hằng số $\mu$, dãy $w_{k+1}=w_k-\tfrac1L\nabla f(w_k)$ thỏa $f(w_k)-f^*\le(1-\mu/L)^k\bigl(f(w_0)-f^*\bigr)$.
- **Hạ gradient khi không có điểm cực tiểu** (Hệ quả 05b.17). Nếu $f$ lồi và có gradient $L$-Lipschitz thì dãy hạ gradient với bước hằng $0<\eta\le\tfrac1L$ có $f(w_k)\to\inf f$, kể cả khi $\inf f$ không đạt.
- **Phương pháp Newton** (Định nghĩa 04.28, 04.30, Thuật toán 04.2, Định lý 04.35). Hướng Newton tại $w$ là nghiệm $p$ của $\nabla^2f(w)\,p=-\nabla f(w)$; độ giảm Newton là $\delta_N(w)=\sqrt{-\nabla f(w)^Tp}$. Với quay lui Armijo, phương pháp có một giai đoạn tắt dần và một giai đoạn hội tụ bậc hai; định lý được phát biểu lại ở Mục 4.
- **Trung bình mẫu tại tham số cố định** (Định lý 05c.52). Nếu các quan sát độc lập, cùng phân phối và tham số được chọn trước khi nhìn các quan sát đó thì trung bình mất mát là ước lượng không chệch của kỳ vọng mất mát.
- **Đại số tuyến tính** (Bài 00; Strang 2016). Định lý hạng–số chiều: $\operatorname{rank}X+\dim\ker X=d$. Với ma trận đối xứng $A$, trị riêng lớn nhất và nhỏ nhất là giá trị lớn nhất và nhỏ nhất của thương Rayleigh $v^TAv/v^Tv$ trên $v\ne0$; $\lVert Av\rVert\le\lambda_{\max}(A)\lVert v\rVert$ khi $A\succeq0$. Ma trận Vandermonde dựng trên các nút phân biệt khả nghịch.

Bài 01 viết $a_i$ cho vector đặc trưng và $\mu$ cho hệ số chính quy hóa ở dạng tổng; Bài 05b viết dãy lặp là $x_k$ và kích thước mẫu là $N$. Ở đây chúng ta viết $x_i$, $\lambda$, $w_k$ và $n$; Nhận xét 05.2 ghi đủ phép đổi ký hiệu.

## Bảng ký hiệu

Bảng chỉ gồm ký hiệu dùng xuyên suốt chương. Chuẩn là chuẩn Euclid; $\log$ là logarit tự nhiên.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $n$, $d$ | kích thước mẫu huấn luyện; số đặc trưng, kể cả tọa độ hằng | số nguyên dương |
| $u_i$, $y_i$, $d_0$ | đầu vào thô và nhãn của mẫu $i$; số chiều của đầu vào thô | $u_i\in\mathbb R^{d_0}$; $y_i\in\mathbb R$ hoặc $\{-1,+1\}$ |
| $\varphi$, $x_i=\varphi(u_i)$ | ánh xạ đặc trưng; vector đặc trưng, tọa độ đầu bằng $1$ | $x_i\in\mathbb R^d$ |
| $X$ | ma trận thiết kế, hàng thứ $i$ là $x_i^T$ | $\mathbb R^{n\times d}$ |
| $w$, $w_k$ | tham số (hệ số chặn nằm trong $w$); điểm lặp thứ $k$ | $\mathbb R^d$ |
| $\ell_i(w)$, $F(w)$ | mất mát của mẫu $i$; rủi ro thực nghiệm $F=\frac1n\sum_i\ell_i$ | $\mathbb R^d\to\mathbb R$ |
| $P$, $R(w)$ | phân phối sinh dữ liệu; rủi ro kỳ vọng $\mathbb E_{(u,y)\sim P}\,\ell(w;u,y)$ | $R:\mathbb R^d\to\mathbb R$ |
| $m_i(w)$; $\bar w$, $\gamma$ | biên có dấu $y_ix_i^Tw$; một vector tách dữ liệu và biên nhỏ nhất $\min_im_i(\bar w)$ của nó | $\mathbb R$; $\mathbb R^d$, $\gamma>0$ |
| $\sigma$, $\phi$ | hàm sigmoid $\sigma(z)=1/(1+e^{-z})$; mất mát logistic $\phi(m)=\log(1+e^{-m})$ | $\mathbb R\to(0,1)$; $\mathbb R\to(0,\infty)$ |
| $S$ | ma trận trọng số $\operatorname{diag}\bigl(\sigma(m_i)\sigma(-m_i)\bigr)$ trong Hessian logistic | $n\times n$, đường chéo |
| $\lambda$, $F_\lambda$, $w_\lambda$ | hệ số chính quy hóa; mục tiêu $F+\frac\lambda2\lVert w\rVert^2$; điểm cực tiểu của nó | $\lambda>0$ |
| $\lambda_{\min}(A)$, $\lambda_{\max}(A)$, $\kappa(A)$ | trị riêng nhỏ nhất, lớn nhất và số điều kiện của ma trận đối xứng nửa xác định dương | $\kappa(A)\in[1,\infty]$ |
| $L$, $\mu$, $\kappa$ | hằng số trơn, hằng số lồi mạnh, số điều kiện $L/\mu$ của hàm mục tiêu | $0<\mu\le L$ |
| $\ker X$, $\operatorname{rank}X$ | hạt nhân và hạng của $X$ | không gian con của $\mathbb R^d$; số nguyên |
| $w_{\rm mn}$ | nghiệm có chuẩn nhỏ nhất của $Xw=y$ khi $\operatorname{rank}X=n$ | $\mathbb R^d$ |
| $\eta$ | độ dài bước của hạ gradient | $\eta>0$ |
| $e_k$, $\varepsilon_{\rm tol}$ | sai số giá trị $f(w_k)-f^*$; độ chính xác đích | $e_k\ge0$, $\varepsilon_{\rm tol}>0$ |
| $\varepsilon$, $s^2$ | nhiễu nhãn trong mô hình $y=u+\varepsilon$; phương sai của nhiễu | $\mathbb E\varepsilon=0$, $s^2\ge0$ |
| $r$ | cận trên của $\lVert x_i\rVert$ | $r\ge1$ |
| $L_H$, $\delta_N$ | hằng số Lipschitz của Hessian; độ giảm Newton | $L_H>0$; $\delta_N\ge0$ |
| $N_{\rm N}$, $C_{\rm HG}$, $C_{\rm N}$ | số bước Newton; tổng chi phí của hạ gradient và của Newton | phép nhân–cộng |

Ký hiệu chỉ dùng trong một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ.

Hai ví dụ xuyên suốt được dùng lại ở nhiều mục; mỗi khối ví dụ nêu lại dữ kiện của nó.

- **Ví dụ năm mẫu** (hồi quy). Đầu vào $u=(-1,-\tfrac12,0,\tfrac12,1)$, nhãn $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$, tức $y_i=u_i+\varepsilon_i$ với nhiễu $\varepsilon=(0{,}1;\ -0{,}2;\ 0{,}2;\ -0{,}1;\ 0)$; đặc trưng đa thức $\varphi_d(u)=(1,u,\ldots,u^{d-1})$. Bốn điểm ngoài mẫu $u=\pm\tfrac14,\pm\tfrac34$ có nhãn bằng giá trị đúng $u$, không nhiễu; từ Mục 2.3 chúng là tập xác thực.
- **Ví dụ ba điểm** (phân loại). Đầu vào $u=(-1,0,1)$, nhãn $y=(-1,+1,-1)$, với hai bộ đặc trưng $(1,u)$ và $(1,u,u^2)$.

Mọi số liệu của hai ví dụ là số liệu sư phạm tự xây dựng, được tính bằng phân số chính xác khi có thể; các nghiệm của bài toán logistic được tính bằng phương pháp Newton tới khi chuẩn gradient nhỏ hơn $10^{-15}$. Số liệu trên tập RCV1 ở Mục 5 lấy từ Bottou và Bousquet (2011).

## 1. Bài toán trung tâm và khung chung

Trong Bài 01–04, chúng ta đã làm việc trong một khung gọn. Hàm mục tiêu $F$ lồi và có điểm cực tiểu $w^*$; hạ gradient hội tụ tới $w^*$ với tốc độ tuyến tính khi $F$ lồi mạnh (Định lý 04.26), còn phương pháp Newton hội tụ bậc hai khi điểm lặp đủ gần $w^*$ (Định lý 04.35). Các ví dụ của những bài đó có vài tham số và vài mẫu, nên một bước của mỗi phương pháp tính thủ công được.

Bài toán học máy thực tế khác các ví dụ ấy ở hai con số: số mẫu $n$ và số đặc trưng $d$. Một mô hình phân loại văn bản có thể có $n$ cỡ $10^6$ mẫu và $d$ cỡ $10^4$ đến $10^5$ đặc trưng. Câu hỏi đặt ra là khung của Bài 01–04 còn đúng tới đâu khi $n$ và $d$ lớn; để trả lời, chúng ta cần kiểm tra lại từng thành phần của khung.

### 1.1 Hai lý do xem xét lại khung tất định

Lý do thứ nhất là chi phí. Một gradient đầy đủ của mất mát trung bình trên $n$ mẫu tốn cỡ $nd$ phép nhân–cộng, còn một bước Newton tốn cỡ $nd^2+d^3$ (chi phí chính xác được đếm ở Mục 4.5). Với một ngân sách tính toán cố định, số lần cập nhật làm được vì vậy giảm theo $1/n$. Khi $n=10^6$ và $d=10^4$, một bước Newton dày tốn khoảng $10^{14}$ phép nhân–cộng, và riêng việc lưu Hessian cần 800 MB.

Lý do thứ hai là đích của việc tối ưu. Mất mát huấn luyện $F$ chỉ là đại lượng thay thế cho sai số trên dữ liệu mới, gọi là rủi ro kỳ vọng $R$ (Định nghĩa 05.5). Điểm cực tiểu chính xác của $F$ có thể dự đoán kém trên dữ liệu mới (Mục 2), và có thể không tồn tại (Mục 3). Khi đó, đòi một thuật toán hội tụ chính xác tới điểm cực tiểu của $F$ không còn là yêu cầu đúng.

Chúng ta kiểm chứng hai lý do này theo thứ tự ngược. Lý do thứ hai xuất hiện trước, trên hai bài toán lồi quen thuộc: hồi quy bình phương nhỏ nhất (Mục 2) và hồi quy logistic (Mục 3). Lý do thứ nhất được đo ở Mục 4, nơi chúng ta đếm số bước và chi phí mỗi bước của hai phương pháp. Ở Mục 5, chúng ta ghép hai lý do trên cùng số liệu.

Vấn đề trung tâm của chương được phát biểu như sau. Với mô hình tuyến tính theo đặc trưng và mất mát lồi, chúng ta cần xác định điều gì thay đổi khi số đặc trưng $d$ tăng so với kích thước mẫu $n$: điểm cực tiểu của rủi ro thực nghiệm có tồn tại và duy nhất không, có dự đoán tốt trên dữ liệu mới không, và tính nó tốn bao nhiêu phép tính.

### 1.2 Mô hình tuyến tính theo đặc trưng

Mọi bài toán của chương dùng chung một lớp mô hình. Một mẫu gồm đầu vào thô $u$, chẳng hạn một số thực, và một nhãn $y$. Đầu vào được biến đổi thành một vector đặc trưng $x=\varphi(u)\in\mathbb R^d$ bằng một ánh xạ cố định $\varphi$ do người lập mô hình chọn, và dự đoán là tổ hợp tuyến tính $x^Tw$ của các đặc trưng. Hệ số chặn được gộp vào $w$ bằng cách đặt tọa độ đầu của $x$ bằng $1$; khi đó $w_0$ là hệ số chặn và không cần một ký hiệu riêng.

::: definition Định nghĩa 05.1 (Bài toán học với mô hình tuyến tính theo đặc trưng)
Cho $n$ mẫu $(u_i,y_i)$, $i=1,\ldots,n$, và ánh xạ đặc trưng $\varphi$ với $x_i=\varphi(u_i)\in\mathbb R^d$ có tọa độ đầu bằng $1$.

**Ma trận thiết kế.** $X\in\mathbb R^{n\times d}$ có hàng thứ $i$ là $x_i^T$.

**Mất mát của một mẫu.** Với tham số $w\in\mathbb R^d$,

- mất mát bình phương (hồi quy, $y_i\in\mathbb R$): $\ell_i(w)=\tfrac12(x_i^Tw-y_i)^2$;
- mất mát logistic (phân loại, $y_i\in\{-1,+1\}$): $\ell_i(w)=\log\bigl(1+e^{-y_ix_i^Tw}\bigr)$.

**Rủi ro thực nghiệm.** $F(w)=\frac1n\sum_{i=1}^n\ell_i(w)$.

**Bài toán học.** Cực tiểu hóa $F$ trên $\mathbb R^d$, hoặc cực tiểu hóa mục tiêu có chính quy hóa $F_\lambda(w)=F(w)+\frac\lambda2\lVert w\rVert^2$ với $\lambda>0$ cho trước.
:::

Định nghĩa trên đặt hai bài toán của Bài 01 vào một sơ đồ chung. Với mất mát bình phương, $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$; với mất mát logistic, $F$ là trung bình của $\phi(m_i)$ với biên có dấu $m_i=y_ix_i^Tw$. Hai mất mát đều lồi và khả vi hai lần theo $w$, vì chúng là hợp của một hàm lồi một biến với ánh xạ tuyến tính $w\mapsto x_i^Tw$.

Mô hình tuyến tính theo $w$ nhưng không nhất thiết tuyến tính theo $u$. Chẳng hạn, với $\varphi(u)=(1,u,u^2)$, dự đoán $w_0+w_1u+w_2u^2$ là một parabol theo $u$. Toàn bộ tính phi tuyến theo đầu vào nằm trong $\varphi$, được chọn trước khi học; ở Mục 5.3, chúng ta dùng điểm này để nêu giới hạn của lớp mô hình.

So với Bài 01, Định nghĩa 05.1 dùng mất mát trung bình thay cho mất mát tổng. Nhân hàm mục tiêu với hằng số dương $1/n$ không đổi điểm cực tiểu, nhưng đổi các hằng số $L$ và $\mu$ đi một thừa số $1/n$. Dạng trung bình cũng là dạng mà gradient trên một nhóm mẫu nhỏ ước lượng (Định lý 05c.53), nên chương này và Bài 06 cùng dùng nó.

Năm giả thiết sau dùng chung cho mọi mục; mỗi định lý nêu lại giả thiết mà nó cần.

- **(G1) Dữ liệu.** $n$ mẫu hữu hạn; $x_i\in\mathbb R^d$ đã chứa tọa độ hằng $1$.
- **(G2) Mô hình và mất mát.** Dự đoán $x^Tw$; mất mát bình phương hoặc logistic như trong Định nghĩa 05.1.
- **(G3) Phân phối.** Mẫu huấn luyện, mẫu xác thực và mẫu kiểm thử được rút độc lập từ cùng một phân phối $P$. Giả thiết này chỉ dùng để định nghĩa rủi ro kỳ vọng và đọc sai số trên tập xác thực, tập kiểm thử; chúng ta không chứng minh cận khái quát hóa.
- **(G4) Chính quy hóa.** $\lambda>0$ cố định khi tối ưu, được chọn bằng tập xác thực.
- **(G5) Đếm chi phí.** Ma trận dày; đếm số phép nhân–cộng và bỏ hằng số; tích ma trận–vector $Xv$ tốn $nd$ phép nhân–cộng.

Ký hiệu của chương khác ký hiệu của một số bài lân cận ở vài chỗ; nhận xét sau ghi đủ các phép đổi.

::: remark Nhận xét 05.2 (Đổi ký hiệu giữa các bài)
Các bài lân cận dùng ký hiệu khác nhau cho cùng đối tượng.

- Bài 01 viết $a_i$ cho vector đặc trưng và $\mu$ cho hệ số chính quy hóa của mất mát tổng. Mất mát tổng $\sum_i\ell_i+\frac\mu2\lVert w\rVert^2$ chia cho $n$ cho $F_\lambda$ với $\lambda=\mu/n$. Hai mẫu của Tình huống 01.1 vì vậy ứng với $\lambda=\mu/2$. Trong chương này, $\mu$ luôn là hằng số lồi mạnh.
- Bài 05b và 05c viết $N$ cho kích thước mẫu, $x_k$ cho dãy lặp và $\sigma^2$ cho chặn phương sai của gradient ngẫu nhiên. Ở đây viết $n$, $w_k$, và dành $\sigma$ cho hàm sigmoid; ở Mục 5.4, phương sai nhiễu của gradient ngẫu nhiên viết $\tau^2$.
- Bài 05b, 05c và Bài 06 dùng $b$ cho kích thước nhóm nhỏ, nên hệ số chặn ở đây không được viết là $b$.
- Bài 06 viết $x$ cho đầu vào thô và $\theta$ cho tham số. Với đặc trưng tuyến tính $\varphi(u)=(1,u)$, đầu vào $u$ ở đây là $x$ của Bài 06, và $d$ ở đây bằng số tham số $p=d_{06}+1$ của mô hình tuyến tính trong Bài 06, với $d_{06}$ là số chiều đầu vào ở đó.
:::

**Trong học máy.** Lớp mô hình của Định nghĩa 05.1 bao gồm hồi quy tuyến tính, hồi quy đa thức, hồi quy logistic, và mọi mô hình dùng đặc trưng thủ công như túi từ (bag of words) hoặc tần suất từ – nghịch đảo tần suất văn bản (TF-IDF) trong phân loại văn bản. Tập RCV1 ở Mục 5.2 là một ví dụ: mỗi văn bản là một vector TF-IDF với $47\,152$ tọa độ, và mô hình là hồi quy logistic có chính quy hóa trên vector đó. Mạng nơ ron ở Bài 06 thay $\varphi$ cố định bằng một ánh xạ đặc trưng có tham số được học cùng $w$.

Như vậy, chúng ta đã có lớp mô hình chung (Định nghĩa 05.1), năm giả thiết và vấn đề trung tâm. Lớp mô hình này còn để mở việc chọn $\varphi$, tức chọn số đặc trưng $d$. Trong Mục 2, chúng ta bắt đầu từ lựa chọn đó trên bài toán đơn giản nhất, hồi quy bình phương nhỏ nhất, nơi nghiệm luôn tồn tại và có công thức đóng.

## 2. Hồi quy nhiều chiều

Năm mẫu sau đây được sinh từ quan hệ thật $y=u$ cộng một nhiễu nhỏ: đầu vào $u=(-1,-\tfrac12,0,\tfrac12,1)$ và nhãn $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$. Người lập mô hình không biết quan hệ thật và phải chọn một bộ đặc trưng đa thức $(1,u,\ldots,u^{d-1})$. Với $d=2$, mô hình là một đường thẳng; với $d=5$, mô hình là một đa thức bậc $4$ có đúng năm hệ số, bằng số mẫu. Bài 01 cho biết với mỗi $d$ cố định, nghiệm bình phương nhỏ nhất luôn tồn tại (Mệnh đề 01.6), nhưng chưa cho biết nên chọn $d$ nào.

Để chọn được $d$, chúng ta cần biết nghiệm thay đổi thế nào khi $d$ tiến tới và vượt kích thước mẫu $n=5$. Ba câu hỏi cụ thể là: nghiệm còn duy nhất không, nghiệm dự đoán thế nào tại điểm mới, và nghiệm nhạy thế nào với nhiễu ở nhãn. Mỗi câu hỏi dẫn tới một khái niệm: chế độ nội suy, rủi ro kỳ vọng và số điều kiện.

### 2.1 Dữ liệu năm mẫu và đặc trưng đa thức

Đặc trưng đa thức với $d$ tọa độ là $\varphi_d(u)=(1,u,u^2,\ldots,u^{d-1})\in\mathbb R^d$. Tăng $d$ thêm một nghĩa là thêm một cột $u^{d}$ vào ma trận thiết kế, và các mô hình với $d$ khác nhau lồng vào nhau: đặt hệ số của cột mới bằng $0$ cho lại đúng mô hình cũ.

::: example Ví dụ 05.1 (Ma trận thiết kế của ví dụ năm mẫu)
**Dữ kiện.** $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$, đặc trưng $\varphi_d(u)=(1,u,\ldots,u^{d-1})$.

**Hai ma trận thiết kế.** Với $d=2$, hàng thứ $i$ là $(1,u_i)$; với $d=5$, hàng thứ $i$ là $(1,u_i,u_i^2,u_i^3,u_i^4)$:

$$
X_2=\begin{pmatrix}1&-1\\1&-\tfrac12\\1&0\\1&\tfrac12\\1&1\end{pmatrix},\qquad
X_5=\begin{pmatrix}1&-1&1&-1&1\\1&-\tfrac12&\tfrac14&-\tfrac18&\tfrac1{16}\\1&0&0&0&0\\1&\tfrac12&\tfrac14&\tfrac18&\tfrac1{16}\\1&1&1&1&1\end{pmatrix}.
$$

Ma trận $X_5$ vuông $5\times5$ và là ma trận Vandermonde dựng trên năm nút $u_i$.

**Các tổng dùng về sau.** Các nút đối xứng quanh $0$, nên $\sum_iu_i=\sum_iu_i^3=0$. Ngoài ra $\sum_iu_i^2=1+\tfrac14+0+\tfrac14+1=\tfrac52$, $\sum_iy_i=-0{,}9-0{,}7+0{,}2+0{,}4+1=0$ và

$$
\begin{aligned}
\sum_iu_iy_i&=0{,}9+0{,}35+0+0{,}2+1\\&=2{,}45=\tfrac{49}{20}.
\end{aligned}
$$

**Kiểm tra lại.** Nhiễu $\varepsilon_i=y_i-u_i$ bằng $(0{,}1;\ -0{,}2;\ 0{,}2;\ -0{,}1;\ 0)$ và có tổng $0$, khớp $\sum_iy_i=\sum_iu_i+\sum_i\varepsilon_i=0$.
:::

![Năm mẫu huấn luyện (chấm đặc) tại u = −1; −0,5; 0; 0,5; 1 với y = −0,9; −0,7; 0,2; 0,4; 1,0 nằm quanh đường thật y = u (nét đứt); bốn điểm ngoài mẫu (vòng rỗng) tại u = ±0,25 và ±0,75 nằm đúng trên đường y = u.](img/lec-05/hq-data-points.svg)

Trên hình, năm chấm đặc nằm lệch khỏi đường $y=u$ một khoảng không quá $0{,}2$, và bốn vòng rỗng nằm đúng trên đường đó. Vì quan hệ thật là tuyến tính, mọi đặc trưng từ $u^2$ trở lên chỉ có thể dùng để khớp nhiễu. Bốn điểm ngoài mẫu không tham gia huấn luyện; chúng là thước đo của câu hỏi thứ hai.

### 2.2 Phương trình chuẩn

Với mất mát bình phương, rủi ro thực nghiệm của Định nghĩa 05.1 là $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$. Để tính nghiệm cho từng $d$, chúng ta cần gradient và Hessian của $F$, cho bởi mệnh đề sau.

::: proposition Mệnh đề 05.3 (Gradient, Hessian và phương trình chuẩn của mất mát bình phương)
**Giả thiết.** $X\in\mathbb R^{n\times d}$, $y\in\mathbb R^n$, $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$.

**Kết luận.**

$$
\nabla F(w)=\frac1nX^T(Xw-y),\qquad\nabla^2F(w)=\frac1nX^TX .
\tag{2.1}
$$

Điểm $w$ cực tiểu hóa $F$ khi và chỉ khi nó thỏa phương trình chuẩn

$$
X^TXw=X^Ty .
\tag{2.2}
$$

Phương trình (2.2) luôn có nghiệm, và nghiệm duy nhất khi và chỉ khi $\operatorname{rank}X=d$ (Mệnh đề 01.6).

**Điều kiện áp dụng.** Không cần giả thiết nào về $X$ và $y$.

**Phạm vi.** Hệ số $\frac1{2n}$ không đổi tập nghiệm so với $\lVert Xw-y\rVert^2$ của Bài 01, nhưng đổi các hằng số $L$, $\mu$ của $F$ (Mệnh đề 05.14).
:::

::: proof Chứng minh Mệnh đề 05.3
**Bước 1 (khai triển).** Với mọi $w,v\in\mathbb R^d$,

$$
F(w+v)=F(w)+\frac1n(Xw-y)^TXv+\frac1{2n}v^TX^TXv ,
$$

có được khi khai triển $\lVert(Xw-y)+Xv\rVert^2$. Số hạng bậc nhất theo $v$ là $\nabla F(w)^Tv$ và số hạng bậc hai là $\tfrac12v^T\nabla^2F(w)v$, cho (2.1).

**Bước 2 (điều kiện cực tiểu).** $F$ lồi vì Hessian $\frac1nX^TX$ nửa xác định dương: $v^TX^TXv=\lVert Xv\rVert^2\ge0$. Với hàm lồi khả vi, $w$ là điểm cực tiểu toàn cục khi và chỉ khi $\nabla F(w)=0$: chiều thuận là điều kiện cần bậc nhất của Bài 00 (điểm cực tiểu của hàm khả vi trên $\mathbb R^d$ có gradient bằng không), chiều ngược là Hệ quả 01.27. Điều kiện $\nabla F(w)=0$ chính là (2.2) sau khi nhân với $n$.

**Bước 3 (tồn tại và duy nhất).** Đây là Mệnh đề 01.6(a) và (c) áp cho $X$, $y$. $\square$
:::

Mệnh đề 05.3 là Mệnh đề 01.6 viết ở dạng trung bình. Nó trả lời câu hỏi tồn tại cho mọi $d$, nhưng câu hỏi duy nhất phụ thuộc hạng của $X$. Với $n=5$ nút phân biệt và đặc trưng đa thức, $\operatorname{rank}X=\min(d,5)$, nên nghiệm duy nhất khi $d\le5$ và không duy nhất khi $d\ge6$. Khẳng định về hạng suy từ tính khả nghịch của ma trận Vandermonde $5\times5$ dựng trên năm nút, mà chúng ta dùng ở Mục 2.4 (Ví dụ 05.5, Mệnh đề 05.10).

::: example Ví dụ 05.2 (Phương trình chuẩn với đường thẳng, $d=2$)
**Dữ kiện.** Năm mẫu $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$; đặc trưng $(1,u)$; $\sum_iu_i=0$, $\sum_iu_i^2=\tfrac52$, $\sum_iy_i=0$, $\sum_iu_iy_i=\tfrac{49}{20}$ (Ví dụ 05.1).

**Lập hệ.** Các phần tử của $X^TX$ là tổng các tích của hai cột, nên

$$
X^TX=\begin{pmatrix}n&\sum_iu_i\\\sum_iu_i&\sum_iu_i^2\end{pmatrix}=\begin{pmatrix}5&0\\0&\tfrac52\end{pmatrix},\qquad
X^Ty=\begin{pmatrix}\sum_iy_i\\\sum_iu_iy_i\end{pmatrix}=\begin{pmatrix}0\\\tfrac{49}{20}\end{pmatrix}.
$$

**Giải.** Hệ chéo cho $w_0=0/5=0$ và $w_1=\tfrac{49/20}{5/2}=\tfrac{49}{50}=0{,}98$. Đường khớp là $0{,}98u$, gần quan hệ thật $u$.

**Kiểm tra lại.** Phần dư $0{,}98u_i-y_i$ bằng $(-0{,}08;\ 0{,}21;\ -0{,}2;\ 0{,}09;\ -0{,}02)$. Tổng phần dư bằng $0$ và tổng phần dư nhân $u_i$ bằng $0{,}08-0{,}105+0+0{,}045-0{,}02=0$, đúng điều kiện $X^T(Xw-y)=0$ của (2.2).
:::

Với $d=3$, hệ không còn chéo, nhưng tính đối xứng của các nút vẫn tách nó thành hai hệ nhỏ.

::: example Ví dụ 05.3 (Phương trình chuẩn với parabol, $d=3$)
**Dữ kiện.** Cùng năm mẫu và các tổng của Ví dụ 05.1; đặc trưng $(1,u,u^2)$. Thêm hai tổng $\sum_iu_i^4=1+\tfrac1{16}+0+\tfrac1{16}+1=\tfrac{17}8$ và $\sum_iu_i^2y_i=-0{,}9-0{,}175+0+0{,}1+1=0{,}025=\tfrac1{40}$.

**Lập hệ.** Vì $\sum_iu_i=\sum_iu_i^3=0$,

$$
X^TX=\begin{pmatrix}5&0&\tfrac52\\0&\tfrac52&0\\\tfrac52&0&\tfrac{17}8\end{pmatrix},\qquad X^Ty=\begin{pmatrix}0\\\tfrac{49}{20}\\\tfrac1{40}\end{pmatrix}.
$$

**Giải.** Phương trình thứ hai cho $w_1=\tfrac{49}{50}$, như ở $d=2$. Phương trình thứ nhất cho $5w_0+\tfrac52w_2=0$, tức $w_0=-\tfrac12w_2$. Thay vào phương trình thứ ba:

$$
\begin{aligned}
\tfrac52w_0+\tfrac{17}8w_2&=\tfrac1{40}\\
-\tfrac54w_2+\tfrac{17}8w_2&=\tfrac1{40}&&\text{(a)}\\
\tfrac78w_2&=\tfrac1{40}.
\end{aligned}
$$

Dòng (a) có được khi thay $w_0=-\tfrac12w_2$. Vậy $w_2=\tfrac1{35}$ và $w_0=-\tfrac1{70}$, tức $w=(-\tfrac1{70},\tfrac{49}{50},\tfrac1{35})$.

**Kiểm tra lại.** Phần dư $x_i^Tw-y_i$ bằng $(-\tfrac{23}{350},\tfrac{71}{350},-\tfrac3{14},\tfrac{29}{350},-\tfrac1{175})$. Tổng của chúng là $\tfrac{-23+71-75+29-2}{350}=0$, khớp phương trình thứ nhất của (2.2).
:::

Với $d=4$ và $d=5$, hệ (2.2) giải được theo cùng cách bằng phân số; Ví dụ 05.4 ghi kết quả. Bây giờ chúng ta có nghiệm cho từng $d$ và có thể so các nghiệm đó.

### 2.3 Sai số huấn luyện, sai số ngoài mẫu và rủi ro kỳ vọng

Thước đo tự nhiên đầu tiên là sai số bình phương trung bình (mean squared error, MSE) trên chính năm mẫu huấn luyện, $\frac1n\lVert Xw-y\rVert^2=2F(w)$. Mệnh đề sau cho biết thước đo này thay đổi theo $d$ ra sao, trước khi tính bất kỳ con số nào.

::: proposition Mệnh đề 05.4 (Sai số huấn luyện không tăng theo số đặc trưng)
**Giả thiết.** Hai bộ đặc trưng lồng nhau: mọi cột của $X_d\in\mathbb R^{n\times d}$ là một cột của $X_{d'}\in\mathbb R^{n\times d'}$, với $d<d'$. $F_d$ và $F_{d'}$ là mất mát bình phương trung bình tương ứng.

**Kết luận.** $\min_{w\in\mathbb R^{d'}}F_{d'}(w)\le\min_{w\in\mathbb R^{d}}F_{d}(w)$.

**Điều kiện áp dụng.** Chỉ cần tính lồng nhau của hai bộ đặc trưng; không cần giả thiết về phân phối.

**Phạm vi.** Mệnh đề không nói gì về mức giảm, và không nói gì về sai số tại điểm mới.
:::

::: proof Chứng minh Mệnh đề 05.4
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

Mệnh đề 05.4 nói rằng cực tiểu của cùng một loại hàm trên một tập mô hình lớn hơn không thể lớn hơn. Lập luận chỉ dùng tính bao hàm giữa các tập hàm biểu diễn được, nên áp dụng cho mọi họ đặc trưng lồng nhau, không riêng đa thức. Sai số huấn luyện giảm vì vậy không phải bằng chứng cho thấy mô hình lớn tốt hơn: nó giảm cả khi các đặc trưng thêm vào chỉ khớp nhiễu.

Để đo dự đoán tại điểm mới, ta dùng bốn điểm ngoài mẫu $u=\pm\tfrac14,\pm\tfrac34$ với nhãn đúng $u$, và tính MSE trên chúng theo cùng công thức.

::: example Ví dụ 05.4 (Sai số huấn luyện và sai số ngoài mẫu theo $d$)
**Dữ kiện.** Năm mẫu huấn luyện $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$; bốn điểm ngoài mẫu $u'=(-\tfrac34,-\tfrac14,\tfrac14,\tfrac34)$ với nhãn $y'=u'$. Với mỗi $d=1,\ldots,5$, $w$ là nghiệm của (2.2) với đặc trưng $(1,u,\ldots,u^{d-1})$.

**Nghiệm và hai sai số.**

| $d$ | nghiệm $w$ | MSE huấn luyện | MSE ngoài mẫu |
|---:|---|---:|---:|
| $1$ | $(0)$ | $\tfrac12=0{,}5$ | $\tfrac5{16}=0{,}3125$ |
| $2$ | $(0,\tfrac{49}{50})$ | $\tfrac{99}{5000}=0{,}0198$ | $\tfrac1{8000}=0{,}000125$ |
| $3$ | $(-\tfrac1{70},\tfrac{49}{50},\tfrac1{35})$ | $\tfrac{86}{4375}\approx0{,}0197$ | $\approx0{,}000205$ |
| $4$ | $(-\tfrac1{70},\tfrac{23}{20},\tfrac1{35},-\tfrac15)$ | $\tfrac1{56}\approx0{,}0179$ | $\approx0{,}00107$ |
| $5$ | $(\tfrac15,\tfrac{23}{20},-\tfrac{109}{60},-\tfrac15,\tfrac53)$ | $0$ | $\approx0{,}0487$ |

**Tính hai dòng đầu.** Với $d=1$, $w_0=\bar y=0$, nên MSE huấn luyện là $\tfrac15(0{,}81+0{,}49+0{,}04+0{,}16+1)=0{,}5$ và MSE ngoài mẫu là trung bình của $u'^2$, tức $\tfrac14(\tfrac9{16}+\tfrac1{16}+\tfrac1{16}+\tfrac9{16})=\tfrac5{16}$. Với $d=2$, tổng bình phương phần dư của Ví dụ 05.2 là $0{,}0064+0{,}0441+0{,}04+0{,}0081+0{,}0004=0{,}099$, nên MSE huấn luyện là $0{,}0198$. Sai số tại điểm ngoài mẫu là $0{,}98u'-u'=-0{,}02u'$, nên MSE ngoài mẫu là $0{,}0004\cdot\tfrac5{16}=0{,}000125$.

**Dòng $d=5$.** Tại $u'=-\tfrac34$, đa thức nội suy dự đoán $-\tfrac{1373}{1280}\approx-1{,}073$ trong khi giá trị đúng là $-0{,}75$. Bốn sai số là $-0{,}3227;\ 0{,}0586;\ 0{,}1273;\ -0{,}2664$, có bình phương trung bình $\tfrac{79761}{1638400}\approx0{,}0487$.

**Kiểm tra lại.** Cột huấn luyện không tăng, đúng Mệnh đề 05.4. Tỉ số MSE ngoài mẫu giữa $d=5$ và $d=2$ là $0{,}048682/0{,}000125\approx389$.
:::

![Đồ thị trục tung logarit theo d từ 1 đến 5. MSE huấn luyện giảm: 0,5; 0,0198; 0,0197; 0,0179; bằng 0 tại d = 5. MSE trên bốn điểm ngoài mẫu: 0,3125; 0,000125; 0,000205; 0,00107; 0,0487, nhỏ nhất tại d = 2 rồi tăng.](img/lec-05/hq-errors-vs-d.svg)

Hình trên vẽ hai cột của bảng trên thang logarit. Đường huấn luyện đi xuống từ trái sang phải, còn đường ngoài mẫu đạt đáy tại $d=2$ rồi đi lên. Điểm cực tiểu chính xác của $F$ tại $d=5$ khớp đúng năm mẫu, nhưng sai số tại điểm mới gấp khoảng $389$ lần sai số của đường thẳng.

![Năm mẫu huấn luyện và bốn điểm ngoài mẫu. Đường thẳng 0,98u (d = 2) đi gần mọi điểm; đa thức bậc 4 (d = 5, nét đứt) đi qua đúng năm mẫu nhiễu và uốn lượn giữa các nút, xa đường y = u tại các điểm ngoài mẫu.](img/lec-05/hq-fits-d2-d5.svg)

Hình thứ hai cho thấy nguyên nhân. Đa thức bậc $4$ (nét đứt) đi qua đúng năm chấm đặc, tức là đi qua cả nhiễu, và uốn lượn giữa các nút; tại $u=\pm\tfrac34$ nó lệch khỏi đường thật khoảng $0{,}3$. Đường thẳng $0{,}98u$ không đi qua chấm nào nhưng nằm gần cả chín điểm.

Hai cột của bảng đo hai đại lượng khác nhau: cột thứ nhất là đại lượng được tối ưu, cột thứ hai là đại lượng mà người dùng mô hình cần nhỏ. Về mặt ý tưởng, đại lượng thứ hai là sai số trung bình trên mọi điểm mà mô hình có thể gặp. Đây mới là mô tả bằng lời; định nghĩa sau đặt cho hai đại lượng tên và công thức.

::: definition Định nghĩa 05.5 (Rủi ro thực nghiệm và rủi ro kỳ vọng)
Cho mất mát $\ell(w;u,y)\ge0$ của tham số $w\in\mathbb R^d$ trên mẫu $(u,y)$, và giả thiết (G3): các mẫu được rút độc lập từ phân phối $P$.

**Rủi ro thực nghiệm** trên mẫu huấn luyện $(u_i,y_i)_{i=1}^n$:

$$
F(w)=\frac1n\sum_{i=1}^n\ell(w;u_i,y_i).
$$

**Rủi ro kỳ vọng** (expected risk):

$$
R(w)=\mathbb E_{(u,y)\sim P}\,\ell(w;u,y).
\tag{2.3}
$$
:::

Rủi ro thực nghiệm là hàm của $w$ và của mẫu huấn luyện; nó tính được. Rủi ro kỳ vọng chỉ phụ thuộc $w$ và $P$; nó không tính được khi $P$ chưa biết, và chỉ ước lượng được bằng mẫu. Định nghĩa 05.5 trùng Định nghĩa 05c.51, với cặp $(u,y)$ thay cho quan sát $\xi$ và $F$ thay cho $J$.

Hai đại lượng liên hệ theo một chiều duy nhất: với $w$ cố định không phụ thuộc mẫu huấn luyện, $\mathbb EF(w)=R(w)$ theo Định lý 05c.52. Khi $w$ được chọn bằng chính mẫu huấn luyện, như điểm cực tiểu của $F$, đẳng thức này không còn đúng, và $F(w)$ thường nhỏ hơn $R(w)$. Bảng của Ví dụ 05.4 là một trường hợp như vậy.

Chọn $d$ đòi một ước lượng của $R$ không dùng mẫu huấn luyện. Ước lượng đó cần một tập mẫu riêng, và cần hai tập riêng nếu vừa muốn chọn vừa muốn báo cáo, như định nghĩa sau quy định.

::: definition Định nghĩa 05.6 (Tập xác thực, tập kiểm thử và quá khớp)
Dưới giả thiết (G3):

**Tập xác thực** (validation set) là một mẫu tách khỏi tập huấn luyện, dùng để chọn các đại lượng mà thuật toán tối ưu không chọn: số đặc trưng $d$, hệ số chính quy hóa $\lambda$, bước dừng.

**Tập kiểm thử** (test set) là một mẫu không tham gia bất kỳ lựa chọn nào, dùng để báo cáo ước lượng của $R$ cho mô hình cuối cùng.

**Quá khớp** (overfitting) là trạng thái trong đó $F(w)$ nhỏ nhưng $R(w)-F(w)$ lớn.
:::

Định nghĩa phân biệt hai tập theo chức năng, không theo cách lấy mẫu: cả hai đều rút từ $P$, độc lập với tập huấn luyện. Tập xác thực trả lời câu hỏi "chọn mô hình nào", tập kiểm thử trả lời câu hỏi "mô hình đã chọn sai bao nhiêu". Một tập không thể làm cả hai việc, vì lý do mà mệnh đề sau và Nhận xét 05.8 nêu.

Quá khớp là trạng thái của một cặp mô hình và dữ liệu, không phải của thuật toán. Trong Ví dụ 05.4, nghiệm với $d=5$ có $F=0$ nhưng sai số ngoài mẫu lớn nhất trong năm mô hình, nên nó quá khớp. Nghiệm với $d=1$ có cả hai sai số lớn; trạng thái đó gọi là khớp thiếu (underfitting) và không phải quá khớp. Nói chung $\arg\min F$ khác $\arg\min R$, và điều này đúng cả khi $F$ lồi mạnh.

::: proposition Mệnh đề 05.7 (Ước lượng không chệch của rủi ro trên tập kiểm thử)
**Giả thiết.** $n_{\rm kt}$ mẫu kiểm thử $(u'_j,y'_j)$, $j=1,\ldots,n_{\rm kt}$, rút độc lập từ $P$; tham số $w$ được xác định trước và không phụ thuộc các mẫu này; $R(w)<\infty$.

**Kết luận.**

$$
\mathbb E\Bigl[\frac1{n_{\rm kt}}\sum_{j=1}^{n_{\rm kt}}\ell(w;u'_j,y'_j)\Bigr]=R(w).
$$

**Điều kiện áp dụng.** $w$ không được dùng các mẫu $(u'_j,y'_j)$ ở bất kỳ bước nào, kể cả để chọn $d$ hay $\lambda$.

**Phạm vi.** Mệnh đề nói về kỳ vọng; độ lệch của một lần ước lượng được đo bằng phương sai $\operatorname{Var}\ell(w;u,y)/n_{\rm kt}$, chẳng hạn qua bất đẳng thức Chebyshev (Định lý 05c.52).
:::

::: proof Chứng minh Mệnh đề 05.7
Vì $w$ cố định và mỗi $(u'_j,y'_j)$ có phân phối $P$, mỗi số hạng có kỳ vọng $\mathbb E\,\ell(w;u'_j,y'_j)=R(w)$ theo (2.3). Kỳ vọng tuyến tính, nên kỳ vọng của trung bình $n_{\rm kt}$ số hạng bằng trung bình của $n_{\rm kt}$ kỳ vọng, tức $R(w)$. Đây là kết luận 1 của Định lý 05c.52 với $N=n_{\rm kt}$. $\square$
:::

Giả thiết "$w$ không phụ thuộc các mẫu" là giả thiết quyết định. Khi một tập được dùng để chọn giữa nhiều mô hình, sai số của mô hình được chọn trên chính tập đó bị kéo xuống, như nhận xét sau chứng minh.

::: remark Nhận xét 05.8 (Thiên lệch khi chọn và báo cáo trên cùng một tập)
Cho $K$ tham số $w^{(1)},\ldots,w^{(K)}$ cố định, và $\widehat R_k$ là trung bình mất mát của $w^{(k)}$ trên cùng một tập xác thực độc lập với chúng. Theo Mệnh đề 05.7, $\mathbb E\widehat R_k=R(w^{(k)})$ với mọi $k$. Với mỗi $k$, $\min_j\widehat R_j\le\widehat R_k$, nên lấy kỳ vọng hai vế:

$$
\mathbb E\Bigl[\min_j\widehat R_j\Bigr]\le\min_kR(w^{(k)}).
$$

Giá trị xác thực nhỏ nhất vì vậy có xu hướng thấp hơn rủi ro của mô hình tốt nhất trong danh sách, và càng thấp hơn khi danh sách càng dài. Báo cáo cuối cần một tập kiểm thử chưa tham gia lựa chọn.
:::

Bốn điểm ngoài mẫu của ví dụ năm mẫu không phải mẫu rút từ $P$: vị trí của chúng được chọn trước và nhãn của chúng không có nhiễu. Nhận xét sau cho biết sai số trên bốn điểm đó vẫn đo đúng đại lượng cần cho việc chọn mô hình.

::: remark Nhận xét 05.9 (Tập xác thực không nhiễu ước lượng $2R-s^2$)
Giả sử $y=u+\varepsilon$ với nhiễu $\varepsilon$ độc lập với $u$, $\mathbb E\varepsilon=0$, $\operatorname{Var}\varepsilon=s^2$, và $\ell=\tfrac12(x^Tw-y)^2$. Với $w$ cố định,

$$
\begin{aligned}
\mathbb E(x^Tw-y)^2&=\mathbb E(x^Tw-u-\varepsilon)^2\\
&=\mathbb E_u(x^Tw-u)^2-2\,\mathbb E\bigl[(x^Tw-u)\varepsilon\bigr]+\mathbb E\varepsilon^2&&\text{(a)}\\
&=\mathbb E_u(x^Tw-u)^2+s^2&&\text{(b)}.
\end{aligned}
$$

Đẳng thức (a) khai triển bình phương; đẳng thức (b) dùng tính độc lập của $\varepsilon$ với $u$, $\mathbb E\varepsilon=0$ và $\mathbb E\varepsilon^2=s^2$. Vế trái bằng $2R(w)$, nên $\mathbb E_u(x^Tw-u)^2=2R(w)-s^2$.

MSE trên bốn điểm không nhiễu là trung bình của $(x^Tw-u)^2$ tại bốn giá trị $u$, nên ước lượng $2R(w)-s^2$ chứ không ước lượng $R(w)$. Chẳng hạn, nếu $u$ phân phối đều trên $[-1,1]$, bốn điểm $\pm\tfrac14,\pm\tfrac34$ là trung điểm của bốn đoạn bằng nhau, và trung bình trên chúng là công thức trung điểm xấp xỉ $\mathbb E_u$.

Phần $s^2$ không phụ thuộc $w$, nên thứ tự giữa các mô hình, và vì vậy mọi lựa chọn $d$, $\lambda$ hay bước dừng, không đổi.
:::

Từ đây, bốn điểm $u=\pm\tfrac14,\pm\tfrac34$ đóng vai tập xác thực của ví dụ năm mẫu. Ví dụ thu nhỏ không có tập kiểm thử riêng; Tình huống 05.1 ở cuối chương bổ sung một tập kiểm thử để hoàn tất quy trình. Theo cột ngoài mẫu của Ví dụ 05.4, tập xác thực chọn $d=2$; theo cột huấn luyện, người ta sẽ chọn $d=5$, đúng mô hình quá khớp.

**Trong học máy.** Quy trình chia dữ liệu thành ba phần huấn luyện, xác thực, kiểm thử là quy trình chuẩn khi chọn siêu tham số (Goodfellow và cộng sự 2016, mục 5.3.1). Khi dữ liệu ít, kiểm định chéo (cross-validation) thay tập xác thực cố định bằng trung bình qua nhiều cách chia, nhưng vẫn cần một tập kiểm thử chưa dùng tới. Mệnh đề 05.7 là lý do các cuộc thi học máy giữ kín nhãn của tập kiểm thử: nếu người tham gia chọn mô hình theo điểm trên tập kiểm thử, điểm đó mất tính không chệch theo Nhận xét 05.8.

### 2.4 Chế độ nội suy

Dòng $d=5$ của Ví dụ 05.4 có MSE huấn luyện bằng đúng $0$. Điều này đúng với mọi nhãn: với năm hệ số và năm phương trình, ta luôn tìm được đa thức đi qua đúng năm điểm, bất kể nhãn nào. Để hiểu điều gì xảy ra khi $d$ bằng rồi vượt $n$, trước hết ta tính trường hợp $d=n$.

::: example Ví dụ 05.5 (Đa thức nội suy với $d=n=5$)
**Dữ kiện.** Năm nút $u=(-1,-\tfrac12,0,\tfrac12,1)$, nhãn $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$; $X_5$ là ma trận Vandermonde $5\times5$ của Ví dụ 05.1.

**Tính khả nghịch.** Định thức Vandermonde bằng $\prod_{i<j}(u_j-u_i)$, khác $0$ vì năm nút phân biệt. Vậy $X_5$ khả nghịch, và $w=X_5^{-1}y$ thỏa $X_5w=y$, nên $F(w)=0$.

**Nghiệm.** Giải hệ $X_5w=y$ bằng phân số cho

$$
w=\Bigl(\tfrac15,\ \tfrac{23}{20},\ -\tfrac{109}{60},\ -\tfrac15,\ \tfrac53\Bigr),
$$

tức đa thức $p(u)=\tfrac15+\tfrac{23}{20}u-\tfrac{109}{60}u^2-\tfrac15u^3+\tfrac53u^4$.

**Kiểm tra lại.** Tại $u=1$, $p(1)$ là tổng các hệ số: $0{,}2+1{,}15-1{,}8167-0{,}2+1{,}6667=1{,}0=y_5$. Tại $u=-1$: $0{,}2-1{,}15-1{,}8167+0{,}2+1{,}6667=-0{,}9=y_1$. Tại $u=0$: $p(0)=w_0=0{,}2=y_3$.
:::

Đa thức nội suy theo đúng nhiễu: hệ số của $u^4$ bằng $\tfrac53$, trong khi quan hệ thật không có số hạng bậc cao. Ví dụ trên dùng tính khả nghịch của $X$; mệnh đề sau thay tính khả nghịch bằng điều kiện hạng, nên áp dụng cả khi $d>n$.

::: proposition Mệnh đề 05.10 (Chế độ nội suy)
**Giả thiết.** $X\in\mathbb R^{n\times d}$ với $\operatorname{rank}X=n$ (do đó $d\ge n$); $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$.

**Kết luận.** Với mọi $y\in\mathbb R^n$:

1. $\min_wF(w)=0$;
2. tập nghiệm là $\{w_0+v:\ v\in\ker X\}$, với $w_0$ là một nghiệm bất kỳ của $Xw=y$;
3. $\dim\ker X=d-n$.

**Điều kiện áp dụng.** Điều kiện hạng là điều kiện trên $X$ thôi, không trên $y$.

**Phạm vi.** Với $d=n$, tập nghiệm có một phần tử, $w=X^{-1}y$. Với $d>n$, tập nghiệm là một không gian affine có chiều dương; dữ liệu huấn luyện không phân biệt được các phần tử của nó.
:::

::: proof Chứng minh Mệnh đề 05.10
**Bước 1 (tồn tại nghiệm khớp đúng).** Ảnh $\{Xw:\ w\in\mathbb R^d\}$ là một không gian con của $\mathbb R^n$ có chiều $\operatorname{rank}X=n$, nên bằng $\mathbb R^n$. Do đó có $w_0$ với $Xw_0=y$, và $F(w_0)=0$. Vì $F\ge0$, $\min F=0$. Đó là kết luận 1.

**Bước 2 (tập nghiệm).** $F(w)=0$ khi và chỉ khi $Xw=y$. Trừ đẳng thức $Xw_0=y$, ta được $Xw=y\iff X(w-w_0)=0\iff w-w_0\in\ker X$. Đó là kết luận 2.

**Bước 3 (chiều).** Định lý hạng–số chiều cho $\dim\ker X=d-\operatorname{rank}X=d-n$. $\square$
:::

Mệnh đề 05.10 mở rộng Mệnh đề 01.6(b), vốn cho tập nghiệm $w^*+\ker X$ với mọi $X$, sang trường hợp $\operatorname{rank}X=n$, nơi nghiệm khớp đúng mọi nhãn. Ở chế độ này, sai số huấn luyện bằng $0$ là tính chất của số chiều, không nói gì về chất lượng của mô hình. Với đặc trưng đa thức trên $n$ nút phân biệt, $n$ cột đầu của $X$ tạo một ma trận Vandermonde khả nghịch, nên $\operatorname{rank}X=n$ với mọi $d\ge n$.

::: example Ví dụ 05.6 (Họ nghiệm với $d=6$)
**Dữ kiện.** Năm nút $u=(-1,-\tfrac12,0,\tfrac12,1)$ và nhãn $y$ như Ví dụ 05.5; đặc trưng $(1,u,\ldots,u^5)$, nên $X\in\mathbb R^{5\times6}$ và $\operatorname{rank}X=5$. Tập xác thực gồm bốn điểm $u'=\pm\tfrac14,\pm\tfrac34$ với nhãn $u'$.

**Hướng của hạt nhân.** Theo Mệnh đề 05.10, $\dim\ker X=6-5=1$. Đa thức $u(u^2-1)(u^2-\tfrac14)=u^5-\tfrac54u^3+\tfrac14u$ bằng $0$ tại cả năm nút, nên vector hệ số của nó, $z=(0,\tfrac14,0,-\tfrac54,0,1)$, thỏa $Xz=0$ và sinh $\ker X$.

**Họ nghiệm.** Mọi $w_{\rm mn}+tz$, $t\in\mathbb R$, khớp đúng năm mẫu, với $w_{\rm mn}$ là nghiệm chuẩn nhỏ nhất của Mệnh đề 05.11 dưới đây. Tại bốn điểm xác thực, đa thức của $z$ nhận giá trị $\tfrac{105}{1024},-\tfrac{45}{1024},\tfrac{45}{1024},-\tfrac{105}{1024}$, khác $0$, nên dự đoán thay đổi theo $t$:

| $t$ | $-5$ | $-1$ | $0$ | $1$ | $5$ |
|---|---:|---:|---:|---:|---:|
| MSE huấn luyện | $0$ | $0$ | $0$ | $0$ | $0$ |
| MSE xác thực | $0{,}2244$ | $0{,}0594$ | $0{,}0492$ | $0{,}0515$ | $0{,}1852$ |
| $\lVert w_{\rm mn}+tz\rVert^2$ | $73{,}0$ | $10{,}0$ | $7{,}37$ | $10{,}0$ | $73{,}0$ |

**Kiểm tra lại.** Tại $u=\tfrac12$: $\tfrac1{32}-\tfrac54\cdot\tfrac18+\tfrac14\cdot\tfrac12=\tfrac{1-5+4}{32}=0$. Cột $\lVert\cdot\rVert^2$ đối xứng theo $t$ vì $z\perp w_{\rm mn}$, nên $\lVert w_{\rm mn}+tz\rVert^2=\lVert w_{\rm mn}\rVert^2+t^2\lVert z\rVert^2$ với $\lVert z\rVert^2=\tfrac1{16}+\tfrac{25}{16}+1=\tfrac{21}8$; tại $t=1$: $7{,}37+2{,}625\approx10{,}0$.
:::

Dữ liệu huấn luyện không phân biệt được các nghiệm của họ trên, trong khi sai số xác thực thay đổi gần năm lần. Chọn một nghiệm vì vậy đòi một tiêu chí ngoài dữ liệu huấn luyện. Tiêu chí đơn giản nhất là chuẩn nhỏ nhất.

::: proposition Mệnh đề 05.11 (Nghiệm chuẩn nhỏ nhất)
**Giả thiết.** $X\in\mathbb R^{n\times d}$ với $\operatorname{rank}X=n$; $y\in\mathbb R^n$.

**Kết luận.**

1. $XX^T\in\mathbb R^{n\times n}$ khả nghịch, và $w_{\rm mn}=X^T(XX^T)^{-1}y$ thỏa $Xw_{\rm mn}=y$.
2. $w_{\rm mn}$ vuông góc với $\ker X$.
3. $w_{\rm mn}$ là nghiệm duy nhất của $Xw=y$ có chuẩn nhỏ nhất.

**Điều kiện áp dụng.** Cần hạng đầy đủ theo hàng để $XX^T$ khả nghịch.

**Phạm vi.** Chuẩn nhỏ nhất là một tiêu chí chọn; mệnh đề không nói nghiệm này có sai số xác thực nhỏ nhất.
:::

::: proof Chứng minh Mệnh đề 05.11
**Bước 1 ($XX^T$ khả nghịch).** Nếu $XX^Ta=0$ thì $0=a^TXX^Ta=\lVert X^Ta\rVert^2$, nên $X^Ta=0$. Các cột của $X^T$ là $n$ hàng của $X$, độc lập tuyến tính vì $\operatorname{rank}X=n$, nên $a=0$. Vậy $XX^T$ khả nghịch, và $Xw_{\rm mn}=XX^T(XX^T)^{-1}y=y$.

**Bước 2 (vuông góc với hạt nhân).** Với $v\in\ker X$, $v^Tw_{\rm mn}=v^TX^Ta=(Xv)^Ta=0$, ở đây $a=(XX^T)^{-1}y$.

**Bước 3 (chuẩn nhỏ nhất).** Theo Mệnh đề 05.10, mọi nghiệm có dạng $w=w_{\rm mn}+v$ với $v\in\ker X$. Theo Bước 2 và định lý Pythagore,

$$
\lVert w\rVert^2=\lVert w_{\rm mn}\rVert^2+\lVert v\rVert^2\ge\lVert w_{\rm mn}\rVert^2,
$$

với dấu bằng khi và chỉ khi $v=0$. $\square$
:::

Nghiệm chuẩn nhỏ nhất là $t=0$ trong bảng của Ví dụ 05.6. Nó vẫn đi qua năm điểm nhiễu, nên sai số xác thực của nó, $0{,}0492$, gần với sai số $0{,}0487$ của đa thức nội suy bậc $4$. Chuẩn nhỏ nhất vì vậy chọn được một nghiệm, nhưng không sửa được quá khớp.

::: remark Nhận xét 05.12 (Ba cách chọn một nghiệm khi $d>n$)
Có ba loại tiêu chí ngoài dữ liệu huấn luyện.

1. **Tiêu chí tường minh**: chuẩn nhỏ nhất, như Mệnh đề 05.11.
2. **Thay đổi mục tiêu**: cộng hạng phạt $\frac\lambda2\lVert w\rVert^2$; mục tiêu mới có nghiệm duy nhất (Mệnh đề 05.17).
3. **Chính thuật toán**: hạ gradient xuất phát từ $w_0=0$ trên $F$ chỉ đi trong ảnh của $X^T$, vì mỗi gradient $\frac1nX^T(Xw-y)$ thuộc ảnh đó, nên giới hạn của nó vuông góc với $\ker X$ và bằng $w_{\rm mn}$. Ở ví dụ năm mẫu với $d=8$, cả hạ gradient từ $0$ lẫn công thức $X^T(XX^T)^{-1}y$ cho cùng MSE xác thực $0{,}0759$. Bài tập 05.13 ở cuối chương yêu cầu chứng minh khẳng định về giới hạn.

Ba tiêu chí có liên hệ: nghiệm có chính quy hóa hội tụ về $w_{\rm mn}$ khi $\lambda\to0$ (Nhận xét 05.18). Goodfellow và cộng sự (2016, mục 7.3, tr. 239–240) đọc giả nghịch đảo Moore–Penrose theo đúng cách này.
:::

**Trong học máy.** Chế độ $d\ge n$ là bình thường với mô hình hiện đại: một mô hình phân loại văn bản với $10^5$ đặc trưng TF-IDF có thể được huấn luyện trên $10^4$ văn bản, và một mạng nơ ron thường có nhiều tham số hơn số mẫu. Mệnh đề 05.10 cho biết ở chế độ này, sai số huấn luyện bằng $0$ là điều không tránh khỏi khi tối ưu đủ lâu, nên không thể dùng nó để đánh giá mô hình. Nhận xét 05.12 cho thấy nghiệm mà thuật toán trả về phụ thuộc vào điểm xuất phát và vào chính thuật toán, một hiện tượng mà Bài 06 gặp lại với mạng nơ ron.

### 2.5 Độ nhạy và số điều kiện

Câu hỏi thứ ba là nghiệm nhạy thế nào với nhiễu ở nhãn. Ví dụ sau đo độ nhạy đó trực tiếp bằng một thí nghiệm nhỏ.

::: example Ví dụ 05.7 (Độ nhạy của nghiệm theo nhãn)
**Dữ kiện.** Năm mẫu $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$, đặc trưng $(1,u,\ldots,u^{d-1})$. Tăng $y_3$ (nhãn tại $u=0$) thêm $0{,}01$, giữ các nhãn khác, tức $\delta y=(0,0,0{,}01,0,0)$, và giải lại (2.2).

**Trường hợp $d=2$.** Hệ chéo $\operatorname{diag}(5,\tfrac52)\,\delta w=X^T\delta y=(0{,}01,\ u_3\cdot0{,}01)=(0{,}01,0)$ cho $\delta w=(0{,}002;\ 0)$ và $\lVert\delta w\rVert=0{,}002$.

**Trường hợp $d=5$.** $X$ khả nghịch nên $\delta w=X^{-1}\delta y$ là $0{,}01$ nhân vector hệ số của đa thức bậc không quá $4$ bằng $1$ tại $u=0$ và bằng $0$ tại bốn nút còn lại. Đa thức đó là $(1-u^2)(1-4u^2)=4u^4-5u^2+1$, nên

$$
\begin{aligned}
\delta w&=0{,}01\cdot(1,0,-5,0,4),\\\lVert\delta w\rVert&=0{,}01\sqrt{1+25+16}\\&=0{,}01\sqrt{42}\approx0{,}0648 .
\end{aligned}
$$

**Kiểm tra lại.** Tại $u=\pm\tfrac12$: $4\cdot\tfrac1{16}-5\cdot\tfrac14+1=0$; tại $u=\pm1$: $4-5+1=0$; tại $u=0$: $1$. Cùng một thay đổi ở nhãn dịch nghiệm ở $d=5$ xa gấp khoảng $32$ lần ở $d=2$.
:::

Về mặt hình học, độ nhạy gắn với hình dạng của đường mức. Với $F$ bậc hai, đường mức là các elip có bán trục theo hướng riêng $v_j$ của $\frac1nX^TX$ tỉ lệ với $1/\sqrt{s_j}$, ở đây $s_j$ là trị riêng tương ứng, tức độ cong của $F$ theo hướng đó. Khi tỉ số giữa độ cong lớn nhất và nhỏ nhất lớn, elip rất dẹt, và theo hướng trục dài $F$ gần như phẳng. Đây mới là mô tả hình học; số điều kiện ở định nghĩa sau là đại lượng đo nó.

![Hai khung đường mức của hàm bậc hai. Trái: số điều kiện 2, elip gần tròn, tỉ lệ bán trục √2 ≈ 1,41. Phải: số điều kiện 50, elip rất dẹt, tỉ lệ bán trục √50 ≈ 7,07; trục dài là hướng gần phẳng.](img/lec-05/hq-level-sets-kappa.svg)

Hình trên vẽ đường mức của hai hàm bậc hai có tỉ số độ cong $2$ và $50$; tỉ lệ hai bán trục là $\sqrt2\approx1{,}41$ và $\sqrt{50}\approx7{,}07$. Theo hướng trục dài của khung phải, dữ liệu ràng buộc $w$ rất yếu. Một nhiễu nhỏ ở nhãn dịch nghiệm đi xa theo hướng đó, và ở Mục 4.1, ta sẽ thấy hạ gradient với một độ dài bước chung tiến chậm theo cùng hướng đó.

::: definition Định nghĩa 05.13 (Số điều kiện)
Cho ma trận đối xứng nửa xác định dương $A\in\mathbb R^{d\times d}$ với trị riêng lớn nhất $\lambda_{\max}(A)$ và nhỏ nhất $\lambda_{\min}(A)$. Số điều kiện (condition number) của $A$ là

$$
\kappa(A)=\frac{\lambda_{\max}(A)}{\lambda_{\min}(A)},
$$

với quy ước $\kappa(A)=\infty$ khi $\lambda_{\min}(A)=0$ và $A\ne0$.

Cho hàm $f$ khả vi hai lần với $\mu I\preceq\nabla^2f(w)\preceq LI$ tại mọi $w$, $0<\mu\le L$. Số điều kiện của hàm $f$ ứng với cặp hằng số đó là $\kappa=L/\mu$.
:::

Số điều kiện không nhỏ hơn $1$, và bằng $1$ khi mọi trị riêng bằng nhau, tức khi đường mức là đường tròn. Nó không đổi khi nhân $A$ với một hằng số dương, nên đo hình dạng chứ không đo kích thước. Với hàm bậc hai, hai cách định nghĩa trùng nhau theo mệnh đề sau, nên chúng ta dùng cùng ký hiệu $\kappa$.

Định nghĩa 05.13 gắn với hai giả thiết của Bài 05b. Hằng số $L$ là hằng số trơn của giả thiết H2 (gradient $L$-Lipschitz), $\mu$ là hằng số lồi mạnh của giả thiết H3, và với $f$ khả vi hai lần, H2 và H3 cùng đúng khi và chỉ khi $\mu I\preceq\nabla^2f\preceq LI$ (Bài 05b, đoạn sau Định nghĩa 05b.5). Về tiêu chuẩn Hessian, Nhận xét 01.40 cho tương đương giữa H3 và $\nabla^2f\succeq\mu I$; Nhận xét 04.19 cho chiều đủ của H2: nếu $\lVert\nabla^2f\rVert\le L$ ở mọi điểm thì gradient $L$-Lipschitz.

::: proposition Mệnh đề 05.14 (Hằng số của mất mát bình phương)
**Giả thiết.** $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$ với $\operatorname{rank}X=d$.

**Kết luận.** $F$ thỏa $\mu I\preceq\nabla^2F\preceq LI$ với

$$
L=\frac{\lambda_{\max}(X^TX)}n,\qquad\mu=\frac{\lambda_{\min}(X^TX)}n,\qquad\kappa_F=\frac L\mu=\kappa(X^TX).
\tag{2.4}
$$

**Điều kiện áp dụng.** Khi $\operatorname{rank}X<d$, vẫn có $\nabla^2F\preceq LI$, nhưng $\lambda_{\min}(X^TX)=0$ và $F$ không lồi mạnh.

**Phạm vi.** Hai hằng số là hằng số tốt nhất: không có $L$ nhỏ hơn hay $\mu$ lớn hơn.
:::

::: proof Chứng minh Mệnh đề 05.14
**Bước 1 (cận Rayleigh).** Theo (2.1), $\nabla^2F=\frac1nX^TX$ không phụ thuộc $w$. Với mọi $v\ne0$, thương Rayleigh cho

$$
\frac{\lambda_{\min}(X^TX)}n\le\frac{v^T\nabla^2Fv}{v^Tv}\le\frac{\lambda_{\max}(X^TX)}n,
$$

với dấu bằng tại vector riêng tương ứng. Đó là $\mu I\preceq\nabla^2F\preceq LI$ với hai hằng số tốt nhất trong (2.4).

**Bước 2 ($\mu>0$ khi hạng đủ).** Khi $\operatorname{rank}X=d$, $X^TX\succ0$ (Bước 4 của chứng minh Mệnh đề 01.6), nên $\lambda_{\min}(X^TX)>0$.

**Bước 3 (số điều kiện).** Tỉ số $L/\mu$ không chứa thừa số $1/n$, nên bằng $\kappa(X^TX)$. $\square$
:::

Mệnh đề trên cho thấy số điều kiện của $F$ chỉ phụ thuộc ma trận thiết kế, không phụ thuộc nhãn. Mệnh đề sau nối số điều kiện với độ nhạy đã đo ở Ví dụ 05.7.

::: proposition Mệnh đề 05.15 (Cận độ nhạy của nghiệm bình phương nhỏ nhất)
**Giả thiết.** $\operatorname{rank}X=d$; $w$ là nghiệm của (2.2) với nhãn $y$, và $w+\delta w$ là nghiệm với nhãn $y+\delta y$.

**Kết luận.**

$$
\lVert\delta w\rVert\le\frac{\lVert\delta y\rVert}{\sqrt{\lambda_{\min}(X^TX)}},\qquad\frac1{\sqrt{\lambda_{\min}(X^TX)}}=\sqrt{\frac{\kappa(X^TX)}{\lambda_{\max}(X^TX)}} .
\tag{2.5}
$$

**Điều kiện áp dụng.** Cần $\operatorname{rank}X=d$ để nghiệm duy nhất và $\lambda_{\min}>0$.

**Phạm vi.** Đây là cận trên theo trường hợp xấu nhất; một $\delta y$ cụ thể có thể dịch nghiệm ít hơn nhiều.
:::

::: proof Chứng minh Mệnh đề 05.15
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
Vậy $\lVert X\delta w\rVert\le\lVert\delta y\rVert$.

**Bước 3 (chuyển về $\lVert\delta w\rVert$).** Theo thương Rayleigh, $\lVert X\delta w\rVert^2=\delta w^TX^TX\delta w\ge\lambda_{\min}(X^TX)\lVert\delta w\rVert^2$. Ghép với Bước 2 cho bất đẳng thức của (2.5). Đẳng thức thứ hai của (2.5) là định nghĩa $\kappa=\lambda_{\max}/\lambda_{\min}$ viết lại. $\square$
:::

Ví dụ sau đặt cận (2.5) cạnh độ dịch đo được ở Ví dụ 05.7.

::: example Ví dụ 05.8 (Số điều kiện theo $d$ trên ví dụ năm mẫu)
**Dữ kiện.** Năm nút $u=(-1,-\tfrac12,0,\tfrac12,1)$, đặc trưng $(1,u,\ldots,u^{d-1})$, $\delta y=(0,0,0{,}01,0,0)$ như Ví dụ 05.7.

**Trị riêng và số điều kiện.** Trị riêng của $X^TX$ tính số:

| $d$ | $1$ | $2$ | $3$ | $4$ | $5$ | $\ge6$ |
|---|---:|---:|---:|---:|---:|---:|
| $\lambda_{\min}(X^TX)$ | $5$ | $2{,}5$ | $0{,}679$ | $0{,}128$ | $0{,}0142$ | $0$ |
| $\lambda_{\max}(X^TX)$ | $5$ | $5$ | $6{,}45$ | $6{,}45$ | $7{,}86$ | |
| $\kappa(X^TX)$ | $1$ | $2$ | $9{,}50$ | $50{,}5$ | $553{,}7$ | $\infty$ |

**Áp dụng cận.** Với $d=2$, $1/\sqrt{2{,}5}=0{,}632$, nên cận (2.5) cho $\lVert\delta w\rVert\le0{,}00632$; giá trị đo được là $0{,}002$. Với $d=5$, $1/\sqrt{0{,}0142}=8{,}39$, cận là $0{,}0839$; giá trị đo được là $0{,}0648$.

**Kiểm tra lại.** Với $d=2$, $X^TX=\operatorname{diag}(5,\tfrac52)$ (Ví dụ 05.2) có trị riêng $5$ và $2{,}5$, tỉ số $2$. Với $d\ge6$, $\operatorname{rank}X\le5<d$ nên $\lambda_{\min}=0$.
:::

Trong bảng, $\lambda_{\max}$ chỉ thay đổi từ $5$ đến $7{,}86$, còn $\lambda_{\min}$ giảm hơn ba trăm lần. Vì vậy hệ số $1/\sqrt{\lambda_{\min}}=\sqrt{\kappa/\lambda_{\max}}$ trong (2.5) tăng gần như theo $\sqrt\kappa$, và số điều kiện đo được độ nhạy mà Ví dụ 05.7 đặt thành câu hỏi. Chiều tăng của $\kappa$ theo $d$ trong bảng không phải đặc điểm riêng của đa thức, như mệnh đề sau chứng minh.

::: proposition Mệnh đề 05.16 (Số điều kiện không giảm khi thêm đặc trưng)
**Giả thiết.** $X_{d+1}=(X_d\ \ z)\in\mathbb R^{n\times(d+1)}$ có thêm một cột $z$ so với $X_d$; $A_d=X_d^TX_d$, $A_{d+1}=X_{d+1}^TX_{d+1}$.

**Kết luận.** $\lambda_{\min}(A_{d+1})\le\lambda_{\min}(A_d)$ và $\lambda_{\max}(A_{d+1})\ge\lambda_{\max}(A_d)$; do đó $\kappa(A_{d+1})\ge\kappa(A_d)$.

**Điều kiện áp dụng.** Mọi cột $z$ thêm vào; quy nạp cho mọi họ đặc trưng lồng nhau.

**Phạm vi.** Mệnh đề cho chiều tăng, không cho mức tăng; mức tăng phụ thuộc cách chọn đặc trưng.
:::

::: proof Chứng minh Mệnh đề 05.16
**Bước 1 ($A_d$ là ma trận con chính).** Phần tử $(j,k)$ của $A_{d+1}$ là tích vô hướng của cột $j$ và cột $k$ của $X_{d+1}$. Với $j,k\le d$, đó là phần tử $(j,k)$ của $A_d$. Vậy với mọi $v\in\mathbb R^d$, vector $\tilde v=(v,0)\in\mathbb R^{d+1}$ thỏa $\tilde v^TA_{d+1}\tilde v=v^TA_dv$ và $\lVert\tilde v\rVert=\lVert v\rVert$.

**Bước 2 (trị riêng nhỏ nhất).** Theo thương Rayleigh,

$$
\begin{aligned}
\lambda_{\min}(A_{d+1})&=\min_{u\ne0}\frac{u^TA_{d+1}u}{u^Tu}\\
&\le\min_{v\ne0}\frac{\tilde v^TA_{d+1}\tilde v}{\tilde v^T\tilde v}&&\text{(a)}\\
&=\min_{v\ne0}\frac{v^TA_dv}{v^Tv}&&\text{(b)}\\
&=\lambda_{\min}(A_d).
\end{aligned}
$$

Bất đẳng thức (a) đúng vì cực tiểu trên tập các $u=(v,0)$ không nhỏ hơn cực tiểu trên toàn $\mathbb R^{d+1}$; đẳng thức (b) là Bước 1.

**Bước 3 (trị riêng lớn nhất).** Cùng lập luận với cực đại cho $\lambda_{\max}(A_{d+1})\ge\lambda_{\max}(A_d)$.

**Bước 4 (số điều kiện).** Tử số của $\kappa$ không giảm và mẫu số không tăng. Nếu $\lambda_{\min}(A_d)=0$ thì $\lambda_{\min}(A_{d+1})=0$ và cả hai số điều kiện bằng $\infty$. $\square$
:::

Mệnh đề 05.16 là trường hợp riêng của định lý xen kẽ Cauchy, theo đó các trị riêng của một ma trận con chính nằm xen giữa các trị riêng của ma trận lớn; chứng minh trên chỉ cần hai trị riêng ở đầu mút. Với đơn thức $1,u,u^2,\ldots$ trên $[-1,1]$, các cột gần phụ thuộc tuyến tính, nên $\kappa$ tăng rất nhanh như bảng của Ví dụ 05.8. Một cơ sở đa thức trực giao trên cùng các nút cho cùng tập hàm biểu diễn được nhưng $\kappa$ tăng chậm hơn nhiều; chiều tăng thì vẫn giữ theo mệnh đề.

**Trong học máy.** Số điều kiện lớn có hai hậu quả. Thứ nhất, nghiệm nhạy với nhiễu ở nhãn theo (2.5). Thứ hai, hạ gradient cần số bước tỉ lệ với $\kappa$ (Mục 4.3).

Chuẩn hóa đặc trưng, tức trừ trung bình và chia độ lệch chuẩn của từng cột trước khi huấn luyện, thường làm giảm $\kappa$ vì nó cân bằng thang đo giữa các cột; nó không sửa được các cột gần phụ thuộc tuyến tính như các đơn thức bậc cao. Goodfellow và cộng sự (2016, mục 8.2.1) gọi hiện tượng này là điều kiện hóa kém (ill-conditioning) và xếp nó vào các khó khăn chính khi tối ưu mô hình học máy.

### 2.6 Chính quy hóa bậc hai và chọn mô hình

Ba hệ quả vừa thu được đều xấu đi khi $d$ tăng: nghiệm không duy nhất khi $d>n$, sai số xác thực tăng, và số điều kiện không giảm. Bài 02 đã có một công cụ sửa hệ quả thứ nhất và thứ ba: cộng hạng phạt bậc hai.

Về mặt ý tưởng, hạng phạt $\frac\lambda2\lVert w\rVert^2$ cộng $\lambda$ vào độ cong theo mọi hướng, nên hướng phẳng nhất có độ cong ít nhất $\lambda$ và đường mức không còn dẹt tùy ý. Đây mới là trực giác. Chẳng hạn, với đường thẳng của Ví dụ 05.2, Hessian $\frac15\operatorname{diag}(5,\tfrac52)=\operatorname{diag}(1;\ 0{,}5)$ trở thành $\operatorname{diag}(1+\lambda;\ 0{,}5+\lambda)$. Mệnh đề sau phát biểu điều này cho mọi $X$.

::: proposition Mệnh đề 05.17 (Hồi quy với chính quy hóa bậc hai)
**Giả thiết.** $X\in\mathbb R^{n\times d}$ tùy ý, $y\in\mathbb R^n$, $\lambda>0$, $F_\lambda(w)=\frac1{2n}\lVert Xw-y\rVert^2+\frac\lambda2\lVert w\rVert^2$.

**Kết luận.**

1. $F_\lambda$ có đúng một điểm cực tiểu $w_\lambda$, là nghiệm duy nhất của

$$
\Bigl(\frac1nX^TX+\lambda I\Bigr)w=\frac1nX^Ty .
\tag{2.6}
$$

2. $\nabla^2F_\lambda=\frac1nX^TX+\lambda I$ có các hằng số

$$
\begin{aligned}
\mu&=\frac{\lambda_{\min}(X^TX)}n+\lambda,\qquad L=\frac{\lambda_{\max}(X^TX)}n+\lambda,\\
\kappa&=\frac{\lambda_{\max}(X^TX)+n\lambda}{\lambda_{\min}(X^TX)+n\lambda}=\kappa(X^TX+n\lambda I).
\end{aligned}
$$

**Điều kiện áp dụng.** Mọi $d$, kể cả $d>n$.

**Phạm vi.** Kết luận 1 là Mệnh đề 02.21(c) viết ở dạng trung bình; $w_\lambda$ là nghiệm của một bài toán khác bài toán gốc.
:::

::: proof Chứng minh Mệnh đề 05.17
**Bước 1 (Hessian).** Theo (2.1), $\nabla^2F_\lambda=\frac1nX^TX+\lambda I$. Nếu $v$ là vector riêng của $X^TX$ với trị riêng $s$ thì $v$ là vector riêng của $\nabla^2F_\lambda$ với trị riêng $s/n+\lambda$. Mọi trị riêng tăng thêm $\lambda$, cho các hằng số ở kết luận 2.

**Bước 2 (nghiệm duy nhất).** $\mu\ge\lambda>0$, nên $\nabla^2F_\lambda\succ0$ và ma trận của (2.6) khả nghịch. $F_\lambda$ lồi, nên điểm cực tiểu là nghiệm của $\nabla F_\lambda=0$, tức (2.6), và nghiệm đó duy nhất. $\square$
:::

Với $d>n$, $\lambda_{\min}(X^TX)=0$, nên $\mu=\lambda$ và số điều kiện bằng $1+\lambda_{\max}(X^TX)/(n\lambda)$: hạng phạt biến $\kappa=\infty$ thành một số hữu hạn. So với Mệnh đề 05.10, chính quy hóa không còn khớp đúng nhãn, vì nó đổi mục tiêu. Điều đổi lại là tính duy nhất và số điều kiện hữu hạn với mọi $d$.

::: example Ví dụ 05.9 (Chọn hệ số chính quy hóa trên ví dụ năm mẫu)
**Dữ kiện.** Năm mẫu $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$, $n=5$; đặc trưng $(1,u,\ldots,u^{d-1})$; tập xác thực $u'=\pm\tfrac14,\pm\tfrac34$ với nhãn $u'$. Với $d=5$, $\lambda_{\min}(X^TX)=0{,}01419$ và $\lambda_{\max}(X^TX)=7{,}857$ (Ví dụ 05.8).

**Bảng với $d=5$.** Giải (2.6) cho bốn giá trị $\lambda$:

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

Bảng cho thấy chính quy hóa là một cách điều chỉnh mức khớp liên tục, thay cho việc chọn $d$ rời rạc. Với $\lambda=0{,}01$, sai số xác thực giảm khoảng $19$ lần so với đa thức nội suy. Nó vẫn lớn hơn sai số $0{,}000125$ của đường thẳng $d=2$, vì quan hệ thật trong ví dụ là tuyến tính.

::: remark Nhận xét 05.18 (Chính quy hóa và nghiệm chuẩn nhỏ nhất)
Khi $\operatorname{rank}X=n$, nghiệm của (2.6) viết được ở dạng $w_\lambda=X^T(XX^T+n\lambda I)^{-1}y$. Thật vậy, $(X^TX+n\lambda I)X^T=X^T(XX^T+n\lambda I)$, nên nhân trái với $(X^TX+n\lambda I)^{-1}$ và nhân phải với $(XX^T+n\lambda I)^{-1}$ cho $X^T(XX^T+n\lambda I)^{-1}=(X^TX+n\lambda I)^{-1}X^T$; vế phải nhân $y$ là nghiệm của (2.6) sau khi nhân hai vế với $n$. Khi $\lambda\to0$, $XX^T+n\lambda I\to XX^T$ khả nghịch, nên $w_\lambda\to X^T(XX^T)^{-1}y=w_{\rm mn}$ của Mệnh đề 05.11.

Giá trị xác thực $0{,}00261$ của $\lambda=0{,}01$ là số nhỏ nhất trong bốn số của cột, nên theo Nhận xét 05.8 có xu hướng thấp hơn rủi ro của mô hình được chọn. Ví dụ thu nhỏ không có tập kiểm thử riêng; con số này không phải báo cáo cuối về $R$.
:::

**Trong học máy.** Hạng phạt $\frac\lambda2\lVert w\rVert^2$ trong học sâu còn gọi là suy giảm trọng số (weight decay): bước hạ gradient trên $F_\lambda$ là $w\leftarrow(1-\eta\lambda)w-\eta\nabla F(w)$, tức co $w$ về $0$ một tỉ lệ cố định trước khi đi theo gradient của mất mát (Goodfellow và cộng sự 2016, mục 7.1.1). Thư viện scikit-learn đặt hạng phạt này mặc định cho hồi quy logistic, với tham số $C$ tỉ lệ nghịch với hệ số chính quy hóa. Ví dụ 05.9 chọn $\lambda$ trên tập xác thực theo cùng quy trình chọn siêu tham số của Goodfellow và cộng sự (2016, mục 5.3).

Ba bài tập sau kiểm tra phương trình chuẩn, chế độ nội suy và số điều kiện của Mục 2.

::: exercise Bài tập 05.1
Cho ví dụ năm mẫu $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$ với đặc trưng $(1,u,u^2)$, và vector $w=(-\tfrac1{70},\tfrac{49}{50},\tfrac1{35})$.

1. Kiểm tra $w$ thỏa phương trình chuẩn bằng cách tính $X^T(Xw-y)$.
2. Tính MSE huấn luyện của $w$ dưới dạng phân số.
3. Giải thích vì sao MSE này không lớn hơn MSE huấn luyện $\tfrac{99}{5000}$ của đường thẳng mà không cần tính.
:::

::: hint
Phần dư $x_i^Tw-y_i$ đã có dạng phân số mẫu $350$. Câu 3 dùng tính lồng nhau của hai bộ đặc trưng.
:::

::: solution
1. Phần dư là $r=(-\tfrac{23}{350},\tfrac{71}{350},-\tfrac{75}{350},\tfrac{29}{350},-\tfrac2{350})$. Ba thành phần của $X^Tr$ là $\sum_ir_i$, $\sum_iu_ir_i$, $\sum_iu_i^2r_i$:

$$
\begin{aligned}
\textstyle\sum_ir_i&=\tfrac{-23+71-75+29-2}{350}=0,\\
\textstyle\sum_iu_ir_i&=\tfrac{23-35{,}5+0+14{,}5-2}{350}=0,\\
\textstyle\sum_iu_i^2r_i&=\tfrac{-23+17{,}75+0+7{,}25-2}{350}=0 .
\end{aligned}
$$

Vậy $X^T(Xw-y)=0$.

2. Tổng bình phương phần dư là $\tfrac{529+5041+5625+841+4}{350^2}=\tfrac{12040}{122500}$, nên MSE bằng $\tfrac{12040}{5\cdot122500}=\tfrac{12040}{612500}=\tfrac{86}{4375}\approx0{,}019657$.

3. Bộ $(1,u)$ nằm trong bộ $(1,u,u^2)$, nên theo Mệnh đề 05.4, cực tiểu của $F$ với ba đặc trưng không lớn hơn cực tiểu với hai đặc trưng. Kiểm tra: $\tfrac{86}{4375}\approx0{,}019657<0{,}0198$.
:::

::: exercise Bài tập 05.2
Cho một mẫu ($n=1$) với hai đặc trưng trùng nhau, $X=(1\ \ 1)\in\mathbb R^{1\times2}$, và nhãn $y=2$.

1. Xác định tập nghiệm của $Xw=y$, hạt nhân $\ker X$ và nghiệm chuẩn nhỏ nhất $w_{\rm mn}$.
2. Với $\lambda>0$, tính nghiệm $w_\lambda$ của (2.6) và giới hạn của nó khi $\lambda\to0$.
3. Tính số điều kiện của $X^TX+n\lambda I$ theo $\lambda$.
:::

::: hint
Hai tọa độ của $w_\lambda$ bằng nhau do tính đối xứng. Ma trận $X^TX=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ có trị riêng $2$ và $0$.
:::

::: solution
1. $Xw=y$ là $w_1+w_2=2$, một đường thẳng trong $\mathbb R^2$. $\ker X=\{t(1,-1):\ t\in\mathbb R\}$. Theo Mệnh đề 05.11, $XX^T=2$ và $w_{\rm mn}=X^T\cdot\tfrac12\cdot2=(1,1)$, điểm của đường thẳng gần gốc nhất; $(1,1)\perp(1,-1)$.

2. Với $n=1$, (2.6) là $\begin{pmatrix}1+\lambda&1\\1&1+\lambda\end{pmatrix}w=\begin{pmatrix}2\\2\end{pmatrix}$. Đặt $w_1=w_2=s$: $(2+\lambda)s=2$, nên $w_\lambda=\tfrac2{2+\lambda}(1,1)$. Khi $\lambda\to0$, $w_\lambda\to(1,1)=w_{\rm mn}$, đúng Nhận xét 05.18. Kiểm tra bằng công thức $X^T(XX^T+\lambda)^{-1}y=(1,1)\cdot\tfrac2{2+\lambda}$.

3. Trị riêng của $X^TX+\lambda I$ là $2+\lambda$ và $\lambda$, nên $\kappa=\tfrac{2+\lambda}\lambda=1+\tfrac2\lambda$. Không chính quy hóa thì $\kappa=\infty$; với $\lambda=0{,}01$, $\kappa=201$.
:::

::: exercise Bài tập 05.3
Hai đặc trưng gần cộng tuyến cho $X^TX=\begin{pmatrix}4&2\\2&1{,}01\end{pmatrix}$.

1. Tính hai trị riêng và $\kappa(X^TX)$.
2. Dùng (2.5) để chặn $\lVert\delta w\rVert$ khi $\lVert\delta y\rVert=0{,}01$.
3. Giải thích bằng định nghĩa của $X^TX$ vì sao hai cột gần tỉ lệ làm $\lambda_{\min}$ nhỏ.
:::

::: hint
Trị riêng của ma trận đối xứng $2\times2$ là nghiệm của $s^2-(\operatorname{tr})s+\det=0$. Ở câu 3, xét $v=(1,-2)$.
:::

::: solution
1. $\operatorname{tr}=5{,}01$ và $\det=4\cdot1{,}01-4=0{,}04$. Nghiệm của $s^2-5{,}01s+0{,}04=0$ là $s=\tfrac{5{,}01\pm\sqrt{25{,}1001-0{,}16}}2=\tfrac{5{,}01\pm4{,}99400}2$, tức $\lambda_{\max}\approx5{,}0020$ và $\lambda_{\min}\approx0{,}0080$. Vậy $\kappa\approx625{,}5$. Kiểm tra: tích hai trị riêng $5{,}0020\cdot0{,}0080\approx0{,}040=\det$.

2. $1/\sqrt{0{,}0080}\approx11{,}18$, nên $\lVert\delta w\rVert\le11{,}18\cdot0{,}01\approx0{,}112$.

3. Với $v=(1,-2)$, $v^TX^TXv=\lVert Xv\rVert^2=4-8+4{,}04=0{,}04$ và $\lVert v\rVert^2=5$, nên thương Rayleigh bằng $0{,}008$ và $\lambda_{\min}\le0{,}008$. $\lVert Xv\rVert$ nhỏ nghĩa là cột thứ nhất gần bằng hai lần cột thứ hai; theo hướng $v$, thay đổi $w$ hầu như không đổi dự đoán, nên dữ liệu hầu như không ràng buộc $w$ theo hướng đó.
:::

Như vậy, với mất mát bình phương, chúng ta đã thu được ba hệ quả của việc tăng số đặc trưng. Khi $\operatorname{rank}X=n$, tập nghiệm có chiều $d-n$ (Mệnh đề 05.10). Sai số huấn luyện không tăng (Mệnh đề 05.4) trong khi sai số xác thực có thể tăng, như trên ví dụ năm mẫu từ $0{,}000125$ lên $0{,}0487$ khi $d$ đi từ $2$ lên $5$. Số điều kiện không giảm (Mệnh đề 05.16) và quyết định độ nhạy của nghiệm (Mệnh đề 05.15).

Chính quy hóa bậc hai sửa tính duy nhất và số điều kiện (Mệnh đề 05.17); hệ quả về sai số xác thực được xử lý bằng cách chọn $d$ hoặc $\lambda$ trên tập xác thực (Định nghĩa 05.6). Suốt mục này, điểm cực tiểu của $F$ luôn tồn tại, vì $Xw^*$ là hình chiếu trực giao của $y$ lên không gian cột của $X$, và hình chiếu lên một không gian con hữu hạn chiều luôn tồn tại. Trong hai mất mát của chương, chỉ mất mát bình phương có tính chất này. Trong Mục 3, chúng ta chuyển sang mất mát logistic, nơi câu hỏi tồn tại xuất hiện trước cả câu hỏi duy nhất.

## 3. Hồi quy logistic và chính quy hóa

Xét ba điểm trên một trục, $u=(-1,0,1)$, với nhãn $y=(-1,+1,-1)$: điểm giữa thuộc lớp dương, hai điểm ngoài thuộc lớp âm. Cùng ba điểm này, với hai bộ đặc trưng khác nhau, cho hai bài toán hồi quy logistic có tính chất trái ngược: một bài toán có điểm cực tiểu, bài toán kia không.

Để giải thích sự khác biệt đó, chúng ta cần một khái niệm hình học của dữ liệu trong không gian đặc trưng, tính tách được tuyến tính, và một định lý nói khi nào mất mát logistic không có điểm cực tiểu. Sau đó, chúng ta sửa chính bài toán bằng hạng phạt bậc hai và đo hệ quả của phép sửa đó lên số điều kiện.

### 3.1 Ba điểm với hai bộ đặc trưng

Ví dụ sau đặt hai bộ đặc trưng cạnh nhau trên cùng dữ liệu.

::: example Ví dụ 05.10 (Ba điểm $-,+,-$ với hai bộ đặc trưng)
**Dữ kiện.** $u=(-1,0,1)$, $y=(-1,+1,-1)$; điểm số của mô hình là $x^Tw$, dự đoán nhãn là dấu của điểm số.

**Đặc trưng $(1,u)$.** Điểm số $w_0+w_1u$ là hàm affine của $u$, nên đổi dấu nhiều nhất một lần khi $u$ đi từ $-1$ tới $1$. Dãy nhãn $-,+,-$ đổi dấu hai lần. Vậy không có $w\in\mathbb R^2$ nào cho điểm số đúng dấu tại cả ba điểm.

**Đặc trưng $(1,u,u^2)$.** Với $\bar w=(1,0,-2)$, điểm số là $1-2u^2$: bằng $-1$ tại $u=\pm1$ và bằng $1$ tại $u=0$, nên đúng dấu tại cả ba điểm.

**Kiểm tra lại.** Ma trận $X=\begin{pmatrix}1&-1&1\\1&0&0\\1&1&1\end{pmatrix}$ khả nghịch và $X\bar w=(-1,1,-1)=y$: điểm số tại các mẫu bằng đúng nhãn. Đây là chế độ nội suy của Mệnh đề 05.10 với $d=n=3$.
:::

![Ba điểm trên trục u: u = −1 nhãn −1, u = 0 nhãn +1, u = 1 nhãn −1. Đường cong điểm số 1 − 2u² đi qua cả ba điểm, dương trên khoảng từ −1/√2 đến 1/√2 (tô nhạt) và âm ngoài khoảng đó.](img/lec-05/lg-three-points.svg)

Trên hình, parabol $1-2u^2$ dương trên khoảng $(-1/\sqrt2,1/\sqrt2)$ chứa điểm giữa và âm ngoài khoảng đó. Tập $\{u:\ 1-2u^2=0\}$ gồm hai điểm $\pm1/\sqrt2$; trong không gian đặc trưng $(1,u,u^2)$, nó là giao của đường cong $(1,u,u^2)$ với mặt phẳng $\{x:\ x^T\bar w=0\}$. Dãy nhãn $-,+,-$ trên một trục là dạng một chiều của bài toán XOR mà Mục 5.3 và Bài 06 dùng lại.

### 3.2 Mất mát logistic trung bình

Để so hai bộ đặc trưng, trước hết chúng ta cần các công cụ tính trên mất mát logistic. Bài 01 đã định nghĩa biên có dấu và mất mát logistic; dưới đây chúng được viết ở dạng trung bình và dạng ma trận.

Biên có dấu (margin) của mẫu $i$ là $m_i(w)=y_ix_i^Tw$. Nó dương khi mẫu được phân loại đúng và càng lớn khi điểm số càng xa $0$ về phía đúng. Biên có dấu là một số gắn với từng mẫu, khác với biên quyết định $\{x:\ x^Tw=0\}$, là một tập trong không gian đặc trưng. Với hàm sigmoid $\sigma(z)=1/(1+e^{-z})$, mất mát logistic trung bình là

$$
F(w)=\frac1n\sum_{i=1}^n\phi\bigl(m_i(w)\bigr),\qquad\phi(m)=\log\bigl(1+e^{-m}\bigr).
\tag{3.1}
$$

Vì $\phi>0$, ta có $F(w)>0$ với mọi $w$, và $F(0)=\phi(0)=\log2$ với mọi dữ liệu.

::: proposition Mệnh đề 05.19 (Gradient, Hessian và độ cong của mất mát logistic)
**Giả thiết.** $F$ cho bởi (3.1) với $y_i\in\{-1,+1\}$ và $X\in\mathbb R^{n\times d}$.

**Kết luận.**

$$
\nabla F(w)=-\frac1n\sum_{i=1}^n\sigma\bigl(-m_i(w)\bigr)\,y_ix_i,\qquad\nabla^2F(w)=\frac1nX^TS(w)X,
\tag{3.2}
$$

với $S(w)=\operatorname{diag}\bigl(\sigma(m_i)\sigma(-m_i)\bigr)$ và $0<S_{ii}\le\tfrac14$. Do đó $F$ lồi và

$$
0\preceq\nabla^2F(w)\preceq\frac1{4n}X^TX\quad\forall w\in\mathbb R^d .
\tag{3.3}
$$

**Điều kiện áp dụng.** Mọi dữ liệu.

**Phạm vi.** $S_{ii}\to0$ khi $\lvert m_i\rvert\to\infty$, nên không có hằng số lồi mạnh dương nào cho $F$ trên toàn $\mathbb R^d$.
:::

::: proof Chứng minh Mệnh đề 05.19
**Bước 1 (đạo hàm của $\phi$).** Theo Mệnh đề 01.9, $\phi'(m)=-1/(1+e^m)=-\sigma(-m)$. Đạo hàm tiếp, $\phi''(m)=\sigma'(-m)=\sigma(-m)\bigl(1-\sigma(-m)\bigr)=\sigma(-m)\sigma(m)$, ở đây dùng $\sigma'(z)=\sigma(z)(1-\sigma(z))$ và $1-\sigma(-m)=\sigma(m)$.

**Bước 2 (quy tắc dây chuyền).** $\nabla_wm_i=y_ix_i$. Do đó $\nabla\phi(m_i)=\phi'(m_i)y_ix_i=-\sigma(-m_i)y_ix_i$, và $\nabla^2\phi(m_i)=\phi''(m_i)\,y_i^2x_ix_i^T=\sigma(m_i)\sigma(-m_i)\,x_ix_i^T$ vì $y_i^2=1$. Lấy trung bình theo $i$ cho (3.2), với $\sum_iS_{ii}x_ix_i^T=X^TSX$.

**Bước 3 (cận của $S_{ii}$).** Đặt $s=\sigma(m_i)\in(0,1)$. Khi đó $S_{ii}=s(1-s)>0$, và $s(1-s)=\tfrac14-(s-\tfrac12)^2\le\tfrac14$, với dấu bằng khi $m_i=0$.

**Bước 4 (cận Hessian).** Với mọi $v$, $v^TX^TSXv=\sum_iS_{ii}(x_i^Tv)^2$ nằm giữa $0$ và $\tfrac14\sum_i(x_i^Tv)^2=\tfrac14v^TX^TXv$. Chia cho $n$ cho (3.3); vế trái cho $F$ lồi. $\square$
:::

Mệnh đề trên là Định nghĩa 01.8 và Mệnh đề 01.9 viết ở dạng trung bình và dạng ma trận. Cận trên trong (3.3) đạt khi mọi biên bằng $0$, tức khi $Xw=0$, chẳng hạn tại $w=0$; cận dưới $0$ được tiến sát khi mọi biên lớn. Độ cong của $F$ vì vậy có thể nhỏ tùy ý theo một số hướng, và tính chất này giải thích các hiện tượng của Mục 3.3–3.7.

### 3.3 Mất mát dọc một tia và tính tách được

Với bộ đặc trưng $(1,u,u^2)$ của Ví dụ 05.10, mọi biên tại $\bar w$ bằng $y_i^2=1$. Nhân $\bar w$ với $t>0$ nhân mọi biên với $t$, nên ta có thể tính $F$ dọc tia $t\bar w$.

::: example Ví dụ 05.11 (Mất mát dọc tia $t\bar w$ với đặc trưng $(1,u,u^2)$)
**Dữ kiện.** $u=(-1,0,1)$, $y=(-1,+1,-1)$, đặc trưng $(1,u,u^2)$, $\bar w=(1,0,-2)$ với $m_i(\bar w)=1$ cho cả ba mẫu.

**Tính.** $m_i(t\bar w)=t$, nên mọi số hạng của (3.1) bằng $\phi(t)$ và $F(t\bar w)=\log(1+e^{-t})$:

| $t$ | $0$ | $1$ | $2$ | $5$ | $10$ |
|---|---:|---:|---:|---:|---:|
| $F(t\bar w)$ | $0{,}6931$ | $0{,}3133$ | $0{,}1269$ | $0{,}00672$ | $4{,}54\cdot10^{-5}$ |

**Kết luận.** $F(t\bar w)$ giảm chặt theo $t$ và tiến về $0$, nhưng dương với mọi $t$ hữu hạn.

**Kiểm tra lại.** Với $t$ lớn, $\log(1+e^{-t})\approx e^{-t}$; tại $t=10$, $e^{-10}=4{,}540\cdot10^{-5}$, khớp bảng.
:::

![Đường F(t w̄) = log(1 + e mũ −t) với t từ 0 đến 10 giảm về 0 mà không chạm: 0,693 tại t = 0; 0,313 tại t = 1; 0,0067 tại t = 5; 4,5·10⁻⁵ tại t = 10. Đường nét đứt ở mức 0 là inf F, không đạt.](img/lec-05/lg-loss-along-ray.svg)

Đồ thị trên cho thấy đường cong tiệm cận mức $0$ từ phía trên. Nếu $F$ có điểm cực tiểu $w^*$, giá trị $F(w^*)$ phải không lớn hơn mọi giá trị trên đường cong, tức không lớn hơn $0$; điều này mâu thuẫn với $F>0$. Lập luận này sẽ được viết chặt trong Định lý 05.22. Với bộ đặc trưng $(1,u)$, kết luận ngược lại.

::: example Ví dụ 05.12 (Điểm cực tiểu với đặc trưng $(1,u)$)
**Dữ kiện.** $u=(-1,0,1)$, $y=(-1,+1,-1)$, đặc trưng $(1,u)$, $n=3$. Ba biên là $m_1=w_1-w_0$, $m_2=w_0$, $m_3=-w_0-w_1$.

**Rút gọn bằng đối xứng.** Đổi $w_1$ thành $-w_1$ hoán đổi $m_1$ và $m_3$, nên $F(w_0,w_1)=F(w_0,-w_1)$. Vì $F$ lồi, $F(w_0,0)\le\tfrac12\bigl[F(w_0,w_1)+F(w_0,-w_1)\bigr]=F(w_0,w_1)$, nên ta chỉ cần cực tiểu hóa theo $w_0$ với $w_1=0$. Khi đó $F(w_0,0)=\tfrac13\bigl[2\phi(-w_0)+\phi(w_0)\bigr]$.

**Điều kiện bậc nhất.** Dùng $\phi'(m)=-\sigma(-m)$,

$$
\begin{aligned}
\frac{\partial F}{\partial w_0}(w_0,0)=0&\iff\tfrac13\bigl[2\sigma(w_0)-\sigma(-w_0)\bigr]=0\\&\iff2\sigma(w_0)=1-\sigma(w_0)&&\text{($\sigma(-w_0)=1-\sigma(w_0)$)}\\&\iff\sigma(w_0)=\tfrac13 ,
\end{aligned}
$$

tức $w_0=-\log2$. Giá trị nhỏ nhất là $F^*=\tfrac13\bigl[2\log\tfrac32+\log3\bigr]=\tfrac13\log\tfrac{27}4\approx0{,}6365$.

**Kiểm tra lại.** Tại $w^*=(-\log2,0)$, mọi biên bằng $\pm\log2$, nên $S_{ii}=\sigma(\log2)\sigma(-\log2)=\tfrac23\cdot\tfrac13=\tfrac29$. Theo (3.2), $\nabla^2F(w^*)=\tfrac13\cdot\tfrac29\cdot X^TX=\tfrac2{27}\operatorname{diag}(3,2)\succ0$, nên $w^*$ là điểm cực tiểu chặt. Cấu trúc này giống Ví dụ 01.7.
:::

Hai bộ đặc trưng trên cùng ba điểm cho hai kết luận ngược nhau về sự tồn tại điểm cực tiểu. Điều phân biệt hai trường hợp là việc có hay không một $\bar w$ với mọi biên dương. Định nghĩa sau đặt tên cho tính chất đó.

::: definition Định nghĩa 05.20 (Tách được tuyến tính)
Dữ liệu $\{(x_i,y_i)\}_{i=1}^n$ với $x_i\in\mathbb R^d$ và $y_i\in\{-1,+1\}$ tách được tuyến tính (linearly separable) trong không gian đặc trưng nếu tồn tại $\bar w\in\mathbb R^d$ với

$$
m_i(\bar w)=y_ix_i^T\bar w>0\quad\forall i=1,\ldots,n .
$$
:::

Về mặt hình học, biên có dấu dương tại mọi mẫu nghĩa là siêu phẳng $\{x:\ x^T\bar w=0\}$ đặt mọi mẫu nhãn $+1$ về một phía và mọi mẫu nhãn $-1$ về phía kia. Vì tọa độ đầu của $x$ bằng $1$, siêu phẳng này có hệ số chặn $\bar w_0$ và không bắt buộc đi qua gốc của không gian đầu vào.

Tách được là tính chất của cả $X$ lẫn $y$, và của bộ đặc trưng: cùng ba điểm của Ví dụ 05.10 không tách được với $(1,u)$ nhưng tách được với $(1,u,u^2)$. Tách được tuyến tính cũng khác với tách được của tập lồi trong Boyd và Vandenberghe (2004, mục 8.6.1), nơi hai tập điểm được tách bởi một siêu phẳng affine; khi $x$ chứa tọa độ hằng, hai khái niệm trùng nhau. Mệnh đề sau nối tính tách được với chế độ nội suy của Mục 2.

::: proposition Mệnh đề 05.21 (Hạng đầy đủ theo hàng kéo theo tách được)
**Giả thiết.** $X\in\mathbb R^{n\times d}$ với $\operatorname{rank}X=n$.

**Kết luận.** Với mọi $y\in\{-1,+1\}^n$, dữ liệu $\{(x_i,y_i)\}$ tách được tuyến tính.

**Điều kiện áp dụng.** Cần $d\ge n$.

**Phạm vi.** Điều kiện hạng là đủ, không cần: dữ liệu có thể tách được với $d<n$.
:::

::: proof Chứng minh Mệnh đề 05.21
Theo Mệnh đề 05.10 áp cho vector nhãn $y$, có $\bar w$ với $X\bar w=y$, tức $x_i^T\bar w=y_i$ với mọi $i$. Khi đó $m_i(\bar w)=y_i\cdot y_i=y_i^2=1>0$ với mọi $i$. $\square$
:::

Mệnh đề 05.21 cho thấy chế độ nội suy của bình phương nhỏ nhất, $\operatorname{rank}X=n$, cũng là chế độ trong đó cả $2^n$ cách gán nhãn đều tách được tuyến tính. Với năm mẫu của Mục 2 và đặc trưng đa thức $d=5$, ma trận Vandermonde khả nghịch, nên mọi cách gán nhãn $\pm1$ cho năm điểm đó đều tách được. Chiều ngược lại sai: bốn điểm $u=(-3,-1,2,4)$ với nhãn $(-1,-1,+1,+1)$ và đặc trưng $(1,u)$ tách được bởi $\bar w=(0,1)$, với các biên $3,1,2,4$, dù $d=2<n=4$.

### 3.4 Định lý không tồn tại điểm cực tiểu

Ví dụ 05.11 gợi ý rằng trên dữ liệu tách được, mất mát logistic tiến về $0$ dọc tia $t\bar w$ mà không đạt $0$. Định lý sau chứng minh điều đó cho mọi dữ liệu tách được, và thêm một kết luận về mọi dãy làm $F$ nhỏ dần. Chứng minh dùng tính dương và tính giảm của $\phi$ (Mệnh đề 01.9) cùng định lý Weierstrass (Định lý 01.36).

::: theorem Định lý 05.22 (Mất mát logistic không có điểm cực tiểu trên dữ liệu tách được)
**Giả thiết.** $F$ là mất mát logistic trung bình (3.1); dữ liệu tách được tuyến tính bởi $\bar w$.

**Kết luận.**

1. $\inf_{w\in\mathbb R^d}F(w)=0$, và không $w$ nào đạt giá trị này.
2. Mọi dãy $(w_k)$ với $F(w_k)\to0$ có $\lVert w_k\rVert\to\infty$.

**Điều kiện áp dụng.** Không cần giả thiết về hạng của $X$ hay về $d$ so với $n$.

**Phạm vi.** Định lý nói về $F$ không chính quy hóa; nó không phụ thuộc thuật toán dùng để cực tiểu hóa $F$.
:::

::: proof Chứng minh Định lý 05.22
**Bước 1 ($F>0$).** Mỗi số hạng $\phi(m_i(w))=\log(1+e^{-m_i(w)})$ dương, vì $1+e^{-m}>1$. Vậy $F(w)>0$ với mọi $w$, và $0$ là một cận dưới của $F$.

**Bước 2 ($\inf F=0$).** Đặt $\gamma=\min_im_i(\bar w)>0$. Với $t>0$, $m_i(t\bar w)=t\,m_i(\bar w)\ge t\gamma$. Vì $\phi$ giảm, mỗi số hạng thỏa $\phi(m_i(t\bar w))\le\phi(t\gamma)$, nên trung bình cũng vậy:

$$
0<F(t\bar w)\le\log\bigl(1+e^{-t\gamma}\bigr)\xrightarrow[t\to\infty]{}0 .
$$

Do đó $\inf F=0$. Theo Bước 1, không $w$ nào cho $F(w)=0$, nên cận dưới đúng không đạt. Đó là kết luận 1.

**Bước 3 (dãy cực tiểu hóa phân kỳ).** Cố định $r>0$. Hình cầu đóng $B_r=\{w:\ \lVert w\rVert\le r\}$ không rỗng, đóng và bị chặn, và $F$ liên tục, nên theo Định lý 01.36, $F$ đạt giá trị nhỏ nhất $c_r$ trên $B_r$; theo Bước 1, $c_r>0$. Vì $F(w_k)\to0$, có $k_0$ để $F(w_k)<c_r$ với mọi $k\ge k_0$, và khi đó $w_k\notin B_r$, tức $\lVert w_k\rVert>r$. Vì $r$ tùy ý, $\lVert w_k\rVert\to\infty$. Đó là kết luận 2. $\square$
:::

Định lý trả lời câu hỏi của mục: một bài toán học lồi có thể không có điểm cực tiểu, và điều quyết định là hình học của dữ liệu, không phải tính lồi. Tính lồi, thậm chí lồi chặt, không bảo đảm sự tồn tại điểm cực tiểu (Nhận xét 01.43); ở đây độ cong của $F$ tiến về $0$ theo hướng $\bar w$ (Mệnh đề 05.19), nên không có gì ngăn $F$ tiếp tục giảm ra vô cùng. Ví dụ 01.6 của Bài 01, với hai mẫu một chiều, là trường hợp $d=1$ của định lý.

Ghép Định lý 05.22 với Mệnh đề 05.21 cho một hệ quả về số chiều: khi $\operatorname{rank}X=n$, mất mát logistic không chính quy hóa không có điểm cực tiểu với mọi cách gán nhãn. Định lý cũng cho thấy không thể sửa tình trạng này bằng cách chọn một thuật toán tốt hơn, vì không có điểm nào để thuật toán hội tụ tới. Hệ quả sau mô tả điều thuật toán quen thuộc nhất làm trong tình huống đó.

::: corollary Hệ quả 05.23 (Hạ gradient trên dữ liệu tách được)
**Giả thiết.** Dữ liệu tách được tuyến tính; $F$ là (3.1); $L=\lambda_{\max}(X^TX)/(4n)$; dãy $w_{k+1}=w_k-\eta\nabla F(w_k)$ với $0<\eta\le\tfrac1L$ và $w_0$ tùy ý.

**Kết luận.** $F(w_k)\to0$ và $\lVert w_k\rVert\to\infty$.

**Điều kiện áp dụng.** Cần $X\ne0$ để $L>0$.

**Phạm vi.** Hệ quả không cho tốc độ tăng của $\lVert w_k\rVert$.
:::

::: proof Chứng minh Hệ quả 05.23
**Bước 1 (giả thiết của Hệ quả 05b.17).** $F$ lồi theo Mệnh đề 05.19. Theo (3.3), $\nabla^2F\preceq LI$, nên gradient $L$-Lipschitz (Định nghĩa 05b.5, H2).

**Bước 2 (giá trị hội tụ).** Hệ quả 05b.17 cho $F(w_k)\to\inf F$, và $\inf F=0$ theo Định lý 05.22.

**Bước 3 (chuẩn phân kỳ).** Áp kết luận 2 của Định lý 05.22 cho dãy $(w_k)$. $\square$
:::

Tính giảm đơn điệu của $F(w_k)$ một mình chưa đủ cho kết luận $\lVert w_k\rVert\to\infty$: một dãy giảm có thể dừng ở một mức dương. Bước 2 dùng một kết quả mạnh hơn, rằng $F(w_k)$ tiến tới đúng cận dưới đúng. Tình huống 05.2 ở cuối chương đo tốc độ tăng của $\lVert w_k\rVert$ trên ví dụ ba điểm.

**Trong học máy.** Trên dữ liệu tách được, huấn luyện hồi quy logistic không chính quy hóa bằng hạ gradient hoặc hạ gradient ngẫu nhiên (stochastic gradient descent, SGD), tức hạ gradient dùng gradient trên một nhóm nhỏ mẫu chọn ngẫu nhiên, làm chuẩn tham số tăng mãi; trên máy tính, các xác suất dự đoán $\sigma(x_i^Tw_k)$ bị làm tròn thành $0$ hoặc $1$ và có thể gây tràn số (Goodfellow và cộng sự 2016, mục 7.3, tr. 239–240). Theo Hệ quả 05.23, thuật toán vẫn làm đúng việc được giao là cực tiểu hóa $F$; điều cần sửa là bài toán, và chúng ta sửa nó ở Mục 3.6.

### 3.5 Dữ liệu không tách được

Trước khi sửa bài toán, chúng ta cần biết trường hợp nào vẫn có điểm cực tiểu. Ví dụ 05.12 là một trường hợp như vậy. Để có một điều kiện đủ tổng quát, chúng ta dùng lại tính cưỡng bức của Bài 01, phát biểu cho miền $\mathbb R^d$.

::: definition Hàm cưỡng bức (nhắc lại Định nghĩa 01.37)
Hàm $f:\mathbb R^d\to\mathbb R$ là cưỡng bức (coercive) nếu $f(w)\to+\infty$ khi $\lVert w\rVert\to\infty$; nghĩa là với mọi $M$ có $R$ sao cho $f(w)>M$ với mọi $w$ thỏa $\lVert w\rVert>R$.
:::

Hàm $w\mapsto\lVert w\rVert^2$ cưỡng bức. Mất mát logistic trên dữ liệu tách được thì không, vì $F(t\bar w)\to0$ khi $t\to\infty$ (Định lý 05.22). Theo Định lý 01.38, hàm liên tục và cưỡng bức trên $\mathbb R^d$ đạt giá trị nhỏ nhất, nên chỉ cần một điều kiện trên dữ liệu bảo đảm $F$ cưỡng bức. Mệnh đề sau cho điều kiện đó.

::: proposition Mệnh đề 05.24 (Dữ liệu không tách được thì mất mát logistic cưỡng bức)
**Giả thiết.** $F$ là (3.1), và với mọi $w\ne0$ tồn tại $i$ với $m_i(w)<0$.

**Kết luận.** Tồn tại $c>0$ với

$$
F(w)\ge\frac cn\lVert w\rVert\quad\forall w\in\mathbb R^d ,
\tag{3.4}
$$

nên $F$ cưỡng bức và có điểm cực tiểu trên $\mathbb R^d$.

**Điều kiện áp dụng.** Giả thiết nói rằng mọi hướng khác $0$ phân loại sai ít nhất một mẫu với biên âm chặt.

**Phạm vi.** Mệnh đề không nói về tính duy nhất; nếu thêm $\operatorname{rank}X=d$ thì điểm cực tiểu duy nhất.
:::

::: proof Chứng minh Mệnh đề 05.24
**Bước 1 (hàm phân loại sai lớn nhất).** Đặt $h(v)=\max_i\bigl(-m_i(v)\bigr)$. Mỗi $-m_i(v)=-y_ix_i^Tv$ là hàm tuyến tính, nên liên tục, và giá trị lớn nhất của hữu hạn hàm liên tục là hàm liên tục.

**Bước 2 (hằng số $c$).** Trên mặt cầu đơn vị $\{v:\ \lVert v\rVert=1\}$, giả thiết cho mỗi $v$ một chỉ số $i$ với $-m_i(v)>0$, nên $h(v)>0$. Mặt cầu đơn vị không rỗng, đóng và bị chặn, nên theo Định lý 01.36, $h$ đạt giá trị nhỏ nhất $c$ trên đó, và $c>0$.

**Bước 3 (cận dưới (3.4)).** Với $w\ne0$, viết $w=\lVert w\rVert v$ với $\lVert v\rVert=1$, và chọn $i$ với $-m_i(v)=h(v)\ge c$. Vì $m_i$ tuyến tính, $-m_i(w)=\lVert w\rVert\bigl(-m_i(v)\bigr)\ge c\lVert w\rVert$. Mọi số hạng của (3.1) dương, nên $F(w)$ không nhỏ hơn số hạng thứ $i$ chia $n$:

$$
\begin{aligned}
F(w)&\ge\frac1n\log\bigl(1+e^{-m_i(w)}\bigr)\\
&\ge\frac1n\log\bigl(1+e^{c\lVert w\rVert}\bigr)&&\text{(a)}\\
&\ge\frac cn\lVert w\rVert&&\text{(b)}.
\end{aligned}
$$

Bất đẳng thức (a) dùng tính giảm của $\phi$ và $m_i(w)\le-c\lVert w\rVert$; bất đẳng thức (b) dùng $\log(1+e^s)\ge s$. Với $w=0$, (3.4) đúng vì $F(0)=\log2>0$.

**Bước 4 (tồn tại điểm cực tiểu).** Theo (3.4), $F(w)\to\infty$ khi $\lVert w\rVert\to\infty$, tức $F$ cưỡng bức. $F$ liên tục, nên Định lý 01.38 cho $F$ đạt giá trị nhỏ nhất trên $\mathbb R^d$. $\square$
:::

Về tính duy nhất trong Phạm vi: nếu $\operatorname{rank}X=d$ thì $Xv\ne0$ với mọi $v\ne0$, nên $v^T\nabla^2F(w)v=\frac1n\sum_iS_{ii}(x_i^Tv)^2>0$ vì mọi $S_{ii}>0$. Hessian xác định dương ở mọi điểm, nên $F$ lồi chặt và có nhiều nhất một điểm cực tiểu (Định lý 01.35).

Áp mệnh đề cho Ví dụ 05.12: ba biên là $m_1=w_1-w_0$, $m_2=w_0$, $m_3=-w_0-w_1$. Nếu cả ba không âm thì $w_1\ge w_0\ge0$ và $w_1\le-w_0\le0$, nên $w_0=w_1=0$. Vậy mọi $w\ne0$ có ít nhất một biên âm, giả thiết thỏa, và điểm cực tiểu tìm được ở Ví dụ 05.12 là điều mệnh đề bảo đảm.

::: remark Nhận xét 05.25 (Trường hợp ranh giới)
Định lý 05.22 và Mệnh đề 05.24 chưa phủ hết mọi dữ liệu. Còn trường hợp ranh giới: không có $\bar w$ với mọi biên dương, nhưng có $w\ne0$ với mọi $m_i(w)\ge0$ và dấu bằng tại một số mẫu. Trường hợp này xảy ra chẳng hạn khi hai mẫu có cùng vector đặc trưng $x_0$ nhưng khác nhãn, và các mẫu còn lại tách được bởi một $\bar w$ với $x_0^T\bar w=0$. Điều kiện $x_0^T\bar w=0$ không bỏ được. Với đặc trưng $(1,u)$, xét bốn mẫu $(0,+1)$, $(0,-1)$, $(1,+1)$, $(-1,+1)$, trong đó $x_0=(1,0)$. Hai mẫu $(1,+1)$, $(-1,+1)$ tách được bởi $\bar w=(1,0)$, nhưng $x_0^T\bar w=1\ne0$. Các biên $w_0$, $-w_0$, $w_0+w_1$, $w_0-w_1$ cùng không âm buộc $w=0$, nên giả thiết của Mệnh đề 05.24 vẫn thỏa và đây không phải trường hợp ranh giới. Ở trường hợp ranh giới, điểm cực tiểu có thể không tồn tại. Ở Bài 6 của tệp bài tập, ta xét bốn mẫu $(-1,-1)$, $(0,+1)$, $(0,-1)$, $(1,+1)$ với đặc trưng $(1,u)$ và chứng minh $\inf F=\tfrac12\log2$ không đạt.

Kết luận của hai kết quả là sự tồn tại điểm cực tiểu do dữ liệu quyết định, và theo Mệnh đề 05.21, không kiểm soát được khi $d\ge n$. Người lập mô hình không chọn được dữ liệu, nên cần sửa chính mục tiêu.
:::

### 3.6 Chính quy hóa bậc hai và tính lồi mạnh

Về mặt ý tưởng, hạng phạt $\frac\lambda2\lVert w\rVert^2$ chặn đường đi ra vô cùng: mất mát logistic giảm không quá $\log2$ khi $w$ đi ra xa, còn hạng phạt tăng như bình phương khoảng cách. Đây mới là trực giác; ví dụ sau tính nó trên tia $t\bar w$, rồi Định lý 05.26 phát biểu cho mọi hướng.

::: example Ví dụ 05.13 (Hạng phạt dọc tia $t\bar w$)
**Dữ kiện.** Ba điểm $u=(-1,0,1)$, $y=(-1,+1,-1)$, đặc trưng $(1,u,u^2)$, $\bar w=(1,0,-2)$, $F(t\bar w)=\log(1+e^{-t})$ (Ví dụ 05.11). Mục tiêu $F_\lambda=F+\frac\lambda2\lVert w\rVert^2$.

**Hàm dọc tia.** $\lVert\bar w\rVert^2=1+0+4=5$, nên

$$
F_\lambda(t\bar w)=\log\bigl(1+e^{-t}\bigr)+\frac{5\lambda}2t^2 .
$$

**Cực tiểu dọc tia.** Đạo hàm theo $t$ là $-\sigma(-t)+5\lambda t$, nên điểm dừng thỏa $\frac1{1+e^t}=5\lambda t$. Giải số: với $\lambda=0{,}01$, $t^*=2{,}128$ và giá trị $0{,}2257$; với $\lambda=0{,}1$, $t^*=0{,}6748$ và giá trị $0{,}5255$.

**Kiểm tra lại.** Với $\lambda=0{,}01$: $5\lambda t^*=0{,}05\cdot2{,}128=0{,}1064$ và $1/(1+e^{2{,}128})=1/(1+8{,}398)=0{,}1064$.
:::

![Ba đường theo t từ 0 đến 6. Nét liền: log(1 + e mũ −t) giảm về 0. Nét đứt: thêm 0,025t² (λ = 0,01), cực tiểu tại t* = 2,128, giá trị 0,2257. Chấm gạch: thêm 0,25t² (λ = 0,1), cực tiểu tại t* = 0,6748, giá trị 0,5255.](img/lec-05/lg-penalty-along-ray.svg)

Trên hình, đường nét liền giảm mãi, còn hai đường có hạng phạt đi xuống rồi đi lên lại, với đáy dịch về gần gốc khi $\lambda$ tăng. Cực tiểu dọc một tia chưa phải cực tiểu của $F_\lambda$ trên $\mathbb R^3$; Ví dụ 05.16 tính điểm cực tiểu thật, và nó không nằm trên tia $\bar w$. Để kết luận cho mọi hướng và mọi dữ liệu, chúng ta cần một phát biểu dựa trên Hessian.

Định lý sau dùng Hệ quả 01.41 (hàm khả vi lồi mạnh có đúng một điểm cực tiểu) và Mệnh đề 05.19 (mất mát logistic lồi). Nó áp dụng cho cả hai mất mát của Định nghĩa 05.1.

::: theorem Định lý 05.26 (Chính quy hóa bậc hai cho mục tiêu lồi mạnh)
**Giả thiết.** $F$ là mất mát bình phương hoặc mất mát logistic trung bình (Định nghĩa 05.1); $\lambda>0$; $F_\lambda(w)=F(w)+\frac\lambda2\lVert w\rVert^2$.

**Kết luận.**

1. $\nabla^2F_\lambda(w)\succeq\lambda I$ với mọi $w$, tức $F_\lambda$ lồi mạnh với hằng số $\mu=\lambda$.
2. $F_\lambda$ có đúng một điểm cực tiểu $w_\lambda$, đặc trưng bởi

$$
\lambda w_\lambda=-\nabla F(w_\lambda).
\tag{3.5}
$$

3. $\lVert w_\lambda\rVert^2\le2F(0)/\lambda$; với mất mát logistic, $\lVert w_\lambda\rVert\le\sqrt{2\log2/\lambda}$.

**Điều kiện áp dụng.** Mọi dữ liệu, mọi $d$, kể cả dữ liệu tách được và $d>n$.

**Phạm vi.** $w_\lambda$ là nghiệm của một bài toán khác bài toán gốc; mức khác nhau do $\lambda$ quyết định.
:::

::: proof Chứng minh Định lý 05.26
**Bước 1 (lồi mạnh).** $\nabla^2F\succeq0$ theo Mệnh đề 05.3 (mất mát bình phương) hoặc Mệnh đề 05.19 (mất mát logistic), và Hessian của $\frac\lambda2\lVert w\rVert^2$ là $\lambda I$. Vậy $\nabla^2F_\lambda=\nabla^2F+\lambda I\succeq\lambda I$, và theo Nhận xét 01.40, $F_\lambda$ lồi mạnh với hằng số $\lambda$. Đó là kết luận 1.

**Bước 2 (tồn tại, duy nhất, điều kiện bậc nhất).** Hệ quả 01.41 cho $F_\lambda$ đúng một điểm cực tiểu $w_\lambda$. Hàm $F_\lambda$ lồi và khả vi, nên $w_\lambda$ là điểm cực tiểu khi và chỉ khi $\nabla F_\lambda(w_\lambda)=\nabla F(w_\lambda)+\lambda w_\lambda=0$, tức (3.5). Đó là kết luận 2.

**Bước 3 (cận chuẩn).** Cả hai mất mát không âm, nên $F(w_\lambda)\ge0$. So sánh với điểm $w=0$:

$$
\begin{aligned}
\frac\lambda2\lVert w_\lambda\rVert^2&\le F(w_\lambda)+\frac\lambda2\lVert w_\lambda\rVert^2&&\text{(a)}\\&=F_\lambda(w_\lambda)\\&\le F_\lambda(0)&&\text{(b)}\\&=F(0).
\end{aligned}
$$

Bất đẳng thức (a) dùng $F\ge0$; bất đẳng thức (b) dùng việc $w_\lambda$ là điểm cực tiểu của $F_\lambda$. Với mất mát logistic, $F(0)=\log2$. Đó là kết luận 3. $\square$
:::

Định lý 05.26 sửa đồng thời hai thiếu hụt của Mục 2 và Mục 3. Với mất mát bình phương, nó cho lại Mệnh đề 05.17(1). Với mất mát logistic, nó cho điểm cực tiểu trên mọi dữ liệu, kể cả dữ liệu tách được mà Định lý 05.22 loại trừ. Đổi lại, nghiệm thay đổi: $w_\lambda$ không cực tiểu hóa $F$.

Cận chuẩn ở kết luận 3 chỉ dùng $F\ge0$ và phép so sánh với $w=0$. Với mất mát logistic, $F(0)=\log2$ không phụ thuộc dữ liệu, nên cận $\sqrt{2\log2/\lambda}$ đúng với mọi $X$, $y$, $n$, $d$. Với mất mát bình phương, $F(0)=\frac1{2n}\lVert y\rVert^2$ phụ thuộc nhãn.

::: example Ví dụ 05.14 (Đường nghiệm của một mẫu)
**Dữ kiện.** Một mẫu $x_1=1$, $y_1=+1$, nên $n=d=1$ và $F_\lambda(w)=\log(1+e^{-w})+\frac\lambda2w^2$. Theo (3.5), $w_\lambda$ thỏa $\lambda w=\sigma(-w)=\frac1{1+e^w}$.

**Tính.** Giải số phương trình trên bằng phương pháp Newton:

| $\lambda$ | $0{,}5$ | $0{,}05$ | $0{,}005$ | $0{,}0005$ |
|---|---:|---:|---:|---:|
| $w_\lambda$ | $0{,}6748$ | $2{,}1280$ | $3{,}9140$ | $5{,}8342$ |
| $\sigma(w_\lambda)$ | $0{,}663$ | $0{,}894$ | $0{,}980$ | $0{,}997$ |
| $\sqrt{2\log2/\lambda}$ | $1{,}665$ | $5{,}266$ | $16{,}65$ | $52{,}66$ |

**Kiểm tra lại.** Với $\lambda=0{,}05$: $0{,}05\cdot2{,}128=0{,}1064$ và $1/(1+e^{2{,}128})=0{,}1064$. Mọi $w_\lambda$ nằm dưới cận ở hàng cuối, đúng kết luận 3 của Định lý 05.26.

**Đối chiếu Bài 01.** Hai mẫu của Ví dụ 01.6 có cùng biên $w$, nên trung bình mất mát của chúng là đúng hàm trên. Theo Nhận xét 05.2, $\lambda=\mu/2$, nên ba giá trị đầu của hàng $w_\lambda$ trùng các nghiệm $w^*_\mu$ với $\mu=1;\ 0{,}1;\ 0{,}01$ của Tình huống 01.1.
:::

Bảng cho thấy khi $\lambda$ giảm, $w_\lambda$ tăng và xác suất dự đoán $\sigma(w_\lambda)$ tiến về $1$, tức nghiệm tiến gần hành vi của bài toán không chính quy hóa trên dữ liệu tách được. Hệ quả sau chứng minh rằng điều này xảy ra trên mọi dữ liệu tách được.

::: corollary Hệ quả 05.27 (Chuẩn nghiệm tăng không bị chặn khi $\lambda\to0$)
**Giả thiết.** Dữ liệu tách được tuyến tính bởi $\bar w$; $F$ là (3.1); $w_\lambda$ là điểm cực tiểu của $F_\lambda$.

**Kết luận.** $F(w_\lambda)\to0$ và $\lVert w_\lambda\rVert\to\infty$ khi $\lambda\to0^+$.

**Điều kiện áp dụng.** Cần tính tách được. Với dữ liệu thỏa Mệnh đề 05.24, chuẩn $\lVert w_\lambda\rVert$ bị chặn bởi chuẩn của một điểm cực tiểu của $F$, theo cùng lập luận như lời giải Bài tập 05.5.

**Phạm vi.** Hệ quả không cho tốc độ tăng. Ở Bài 7 của tệp bài tập, ta chứng minh một cận dưới định lượng: với $\lVert\bar w\rVert=1$, biên nhỏ nhất $\gamma$ và $\lVert x_i\rVert\le r$, chuẩn $\lVert w_\lambda\rVert$ tăng ít nhất như $\frac1r\log\frac1\lambda$ trừ một số hạng bậc $\log\log\frac1\lambda$.
:::

::: proof Chứng minh Hệ quả 05.27
**Bước 1 (chặn trên $F(w_\lambda)$).** Với mọi $t>0$, vì $w_\lambda$ cực tiểu hóa $F_\lambda$ và hạng phạt không âm,

$$
\begin{aligned}
F(w_\lambda)&\le F_\lambda(w_\lambda)\\&\le F_\lambda(t\bar w)\\&=F(t\bar w)+\frac\lambda2t^2\lVert\bar w\rVert^2 .
\end{aligned}
$$

**Bước 2 ($F(w_\lambda)\to0$).** Cho $c_0>0$. Theo Bước 2 của chứng minh Định lý 05.22, có $t$ với $F(t\bar w)<c_0/2$. Với $t$ đó cố định, mọi $\lambda<c_0/(t^2\lVert\bar w\rVert^2)$ cho $\frac\lambda2t^2\lVert\bar w\rVert^2<c_0/2$. Vậy $0<F(w_\lambda)<c_0$ với mọi $\lambda$ đủ nhỏ.

**Bước 3 (chuẩn phân kỳ).** Lập luận của Bước 3 trong chứng minh Định lý 05.22 áp cho họ $w_\lambda$ thay cho dãy $w_k$: với mỗi $r>0$, khi $F(w_\lambda)<c_r$ thì $\lVert w_\lambda\rVert>r$. $\square$
:::

### 3.7 Hằng số trơn và số điều kiện của mục tiêu có chính quy hóa

Định lý 05.26 cho hằng số lồi mạnh $\mu=\lambda$. Để có số điều kiện, và vì vậy số bước của hạ gradient theo Định lý 04.26, còn thiếu cận trên của Hessian. Ví dụ một chiều sau cho thấy hai cận đó trên một đồ thị.

::: example Ví dụ 05.15 (Độ cong của mục tiêu một chiều)
**Dữ kiện.** Một mẫu $x_1=1$, $y_1=+1$; $F_\lambda(w)=\log(1+e^{-w})+\frac\lambda2w^2$.

**Độ cong.** Theo Mệnh đề 05.19 với $n=d=1$,

$$
F_\lambda''(w)=\sigma(w)\sigma(-w)+\lambda\in(\lambda,\ \tfrac14+\lambda],
$$

với giá trị lớn nhất $\tfrac14+\lambda$ tại $w=0$ và giá trị tiến về $\lambda$ khi $\lvert w\rvert\to\infty$.

**Số điều kiện.** Với $L=\tfrac14+\lambda$ và $\mu=\lambda$, $\kappa=\frac{1/4+\lambda}\lambda$ bằng $1{,}5;\ 6;\ 51;\ 501$ khi $\lambda=0{,}5;\ 0{,}05;\ 0{,}005;\ 0{,}0005$.

**Kiểm tra lại.** Với $\lambda=0{,}05$: $\kappa=0{,}30/0{,}05=6$.
:::

![Đường độ cong σ(w)σ(−w) + λ với λ = 0,05, w từ −8 đến 8: lớn nhất 0,30 = 1/4 + λ tại w = 0 (nét đứt L), giảm về 0,05 = λ khi |w| lớn (đường chấm μ).](img/lec-05/lg-curvature-1d.svg)

Hình vẽ độ cong với $\lambda=0{,}05$: đỉnh $0{,}30$ tại $w=0$, nơi biên bằng $0$, và tiến về $0{,}05$ khi $\lvert w\rvert$ lớn. Khi $\lambda$ giảm, cận dưới giảm theo còn cận trên gần như giữ nguyên, nên $\kappa$ tăng theo $1/\lambda$. Mệnh đề sau tổng quát hóa ví dụ cho mọi dữ liệu.

::: proposition Mệnh đề 05.28 (Hằng số trơn và số điều kiện của hồi quy logistic có chính quy hóa)
**Giả thiết.** $F$ là mất mát logistic trung bình (3.1); $\lambda>0$.

**Kết luận.** Với mọi $w$, $\mu I\preceq\nabla^2F_\lambda(w)\preceq LI$, trong đó

$$
\mu=\lambda,\qquad L=\frac{\lambda_{\max}(X^TX)}{4n}+\lambda,\qquad\kappa=\frac L\mu=1+\frac{\lambda_{\max}(X^TX)}{4n\lambda}.
\tag{3.6}
$$

Nếu thêm $\lVert x_i\rVert\le r$ với mọi $i$, thì $L\le\frac{r^2}4+\lambda$ và $\kappa\le1+\frac{r^2}{4\lambda}$.

**Điều kiện áp dụng.** Vì tọa độ đầu của $x_i$ bằng $1$, luôn có $r\ge1$; khi phần còn lại của $x_i$ có chuẩn không quá $1$, có thể lấy $r^2=2$.

**Phạm vi.** Các hằng số là toàn cục, đúng tại mọi $w$; độ cong tại điểm cực tiểu có thể lớn hơn $\lambda$ nhiều.
:::

::: proof Chứng minh Mệnh đề 05.28
**Bước 1 (hai cận Hessian).** $\nabla^2F_\lambda=\frac1nX^TSX+\lambda I$. Theo (3.3), $0\preceq\frac1nX^TSX\preceq\frac1{4n}X^TX\preceq\frac{\lambda_{\max}(X^TX)}{4n}I$, cận cuối theo thương Rayleigh. Cộng $\lambda I$ vào ba vế cho $\lambda I\preceq\nabla^2F_\lambda\preceq LI$ với $L$ trong (3.6).

**Bước 2 (cận theo $r$).** Trị riêng lớn nhất của $X^TX\succeq0$ không vượt tổng các trị riêng, tức vết:

$$
\begin{aligned}
\lambda_{\max}(X^TX)&\le\operatorname{tr}X^TX\\&=\sum_{i=1}^n\lVert x_i\rVert^2\\&\le nr^2 .
\end{aligned}
$$

Thay vào (3.6) cho $L\le\frac{r^2}4+\lambda$ và $\kappa\le1+\frac{r^2}{4\lambda}$. $\square$
:::

Theo Mệnh đề 05.28, $F_\lambda$ thỏa giả thiết H2 và H3 của Bài 05b với $L$, $\mu$ trong (3.6). Định lý 05b.18 vì vậy áp dụng: hạ gradient với bước $\frac1L$ có $e_k\le(1-\frac1\kappa)^ke_0$. Cận $\kappa\le1+r^2/(4\lambda)$ cho thấy số điều kiện tăng theo $1/\lambda$, nhanh như ví dụ một chiều.

Không thể giả thiết $\lVert x_i\rVert\le1$ cho dữ liệu đã chuẩn hóa, vì tọa độ hằng $1$ đã cho $\lVert x_i\rVert\ge1$; dấu bằng chỉ xảy ra với mô hình chỉ có hệ số chặn, như Ví dụ 05.15. Hằng số $\kappa$ ở (3.6) là cận toàn cục. Ở Mục 4.3, ta sẽ thấy số bước thực của hạ gradient theo sát một số điều kiện cục bộ tại nghiệm, nhỏ hơn cận này.

::: example Ví dụ 05.16 (Ba điểm có chính quy hóa)
**Dữ kiện.** $u=(-1,0,1)$, $y=(-1,+1,-1)$, đặc trưng $(1,u,u^2)$, $n=3$.

**Không chính quy hóa.** $X$ vuông khả nghịch nên $\operatorname{rank}X=3=n$. Theo Mệnh đề 05.21, dữ liệu tách được với mọi cách gán nhãn, và theo Định lý 05.22, $F$ không có điểm cực tiểu.

**Hằng số.** $X^TX=\begin{pmatrix}3&0&2\\0&2&0\\2&0&2\end{pmatrix}$. Khối của tọa độ $1$ và $3$ là $\begin{pmatrix}3&2\\2&2\end{pmatrix}$ với vết $5$ và định thức $2$, nên có trị riêng $\frac{5\pm\sqrt{17}}2$; tọa độ $2$ cho trị riêng $2$. Vậy $\lambda_{\max}(X^TX)=\frac{5+\sqrt{17}}2\approx4{,}5616$ và theo (3.6), $L=\frac{4{,}5616}{12}+\lambda$.

**Nghiệm.** Phương pháp Newton tới chuẩn gradient dưới $10^{-15}$ cho:

| $\lambda$ | $w_\lambda$ | $P(y=+1\mid u=-1,0,1)$ | $L$ | $\kappa\le$ | $\lVert w_\lambda\rVert$ |
|---:|---|---|---:|---:|---:|
| $0{,}1$ | $(0{,}1298;\ 0;\ -1{,}4288)$ | $(0{,}214;\ 0{,}532;\ 0{,}214)$ | $0{,}4801$ | $4{,}80$ | $1{,}435$ |
| $0{,}01$ | $(1{,}5571;\ 0;\ -4{,}2452)$ | $(0{,}064;\ 0{,}826;\ 0{,}064)$ | $0{,}3901$ | $39{,}0$ | $4{,}522$ |

**Diễn giải.** Nghiệm hữu hạn, và xác suất dự đoán $\sigma(x^Tw_\lambda)$ không tiến về $0$ hay $1$. Tọa độ $w_1=0$ do đối xứng $u\mapsto-u$ và tính duy nhất của nghiệm. Nghiệm không nằm trên tia $\bar w=(1,0,-2)$: với $\lambda=0{,}1$, tỉ số $w_2/w_0$ bằng $-11$, không bằng $-2$.

**Kiểm tra lại.** Với $\lambda=0{,}1$, tại $u=0$: $\sigma(0{,}1298)=0{,}532$. Cận $\sqrt{2\log2/\lambda}$ của kết luận 3 trong Định lý 05.26 bằng $3{,}723$ và $11{,}77$, nên hai chuẩn $1{,}435\le3{,}723$ và $4{,}522\le11{,}77$ thỏa cận.
:::

Với $\lambda=0{,}01$, cận của Mệnh đề 05.28 là $\kappa\le39$, nên Định lý 05b.18 cho $e_k\le(1-\frac1{39})^ke_0$ khi chạy hạ gradient bước $\frac1L$. Tại nghiệm, tỉ số giữa trị riêng lớn nhất và nhỏ nhất của $\nabla^2F_\lambda(w_\lambda)$ chỉ khoảng $4{,}4$; khoảng cách giữa cận toàn cục và độ cong tại nghiệm sẽ xuất hiện lại trong số bước ở Mục 4.3.

::: remark Nhận xét 05.29 (Đặt chỉnh và đánh đổi giữa $\lambda$ và $\kappa$)
Bài toán cực tiểu hóa gọi là đặt chỉnh (well-posed) nếu nghiệm tồn tại, duy nhất và phụ thuộc liên tục vào dữ liệu. Với $\lambda>0$, Định lý 05.26 cho tồn tại và duy nhất. Tính liên tục theo dữ liệu suy từ tính lồi mạnh, như sau.

Gọi $F$, $F'$ là mất mát ứng với hai bộ dữ liệu $(X,y)$, $(X',y')$, và $w_\lambda$, $w'_\lambda$ là hai nghiệm tương ứng. Viết giả thiết H3 của $F'_\lambda$ (hằng số $\lambda$) hai lần, đổi vai $w_\lambda$ và $w'_\lambda$, rồi cộng lại, ta được $\bigl(\nabla F'_\lambda(w_\lambda)-\nabla F'_\lambda(w'_\lambda)\bigr)^T(w_\lambda-w'_\lambda)\ge\lambda\lVert w_\lambda-w'_\lambda\rVert^2$. Vì $\nabla F'_\lambda(w'_\lambda)=0$ và $\nabla F_\lambda(w_\lambda)=0$, ta có $\nabla F'_\lambda(w_\lambda)=\nabla F'(w_\lambda)-\nabla F(w_\lambda)$. Bất đẳng thức Cauchy–Schwarz cho

$$
\lVert w_\lambda-w'_\lambda\rVert\le\frac1\lambda\bigl\lVert\nabla F'(w_\lambda)-\nabla F(w_\lambda)\bigr\rVert .
$$

Tại $w_\lambda$ cố định, gradient (2.1) hay (3.2) là hàm liên tục của $(X,y)$, nên vế phải tiến về $0$ khi $(X',y')\to(X,y)$. Khi $\lambda$ nhỏ, hằng số $\frac1\lambda$ làm cận này cho phép độ dịch của nghiệm lớn hơn.

Bài toán logistic không chính quy hóa trên dữ liệu tách được thì không đặt chỉnh, vì nghiệm không tồn tại.

Giảm $\lambda$ kéo nghiệm về gần bài toán gốc, như Ví dụ 05.14 và Hệ quả 05.27 cho thấy, nhưng làm số điều kiện tăng theo $1/\lambda$ (Mệnh đề 05.28). Bảng của Ví dụ 05.14 với $\kappa$ ghi kèm:

| $\lambda$ | $0{,}5$ | $0{,}05$ | $0{,}005$ | $0{,}0005$ |
|---|---:|---:|---:|---:|
| $\sigma(w_\lambda)$ | $0{,}663$ | $0{,}894$ | $0{,}980$ | $0{,}997$ |
| $\kappa$ | $1{,}5$ | $6$ | $51$ | $501$ |

Nghiệm càng gần bài toán gốc thì càng khó tính bằng hạ gradient. Chọn $\lambda$ là quyết định mô hình, thực hiện trên tập xác thực; các định lý không chỉ ra giá trị nào.
:::

**Trong học máy.** Đối tượng của Định lý 05.26 là hàm mất mát huấn luyện có suy giảm trọng số, tham số là trọng số của mô hình tuyến tính. Giả thiết lồi của $F$ được bảo đảm với hồi quy tuyến tính và hồi quy logistic; với mạng nơ ron, $F$ không lồi và hạng phạt không làm $F_\lambda$ lồi (Định nghĩa 01.42, Tình huống 01.3). Kết luận cho phép dùng mọi định lý hội tụ cho hàm lồi mạnh, trong đó có Định lý 05b.18, với hằng số $\mu=\lambda$ và $L$ của Mệnh đề 05.28. Bộ giải LIBLINEAR, dùng trong scikit-learn, huấn luyện hồi quy logistic có hạng phạt $\ell_2$ bằng một biến thể của phương pháp Newton (Mục 5.2).

Ba bài tập sau kiểm tra tính tách được, sự tồn tại điểm cực tiểu và các hằng số của Mục 3.

::: exercise Bài tập 05.4
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

3. Với $(1,u)$, Mệnh đề 05.24 cho $F$ cưỡng bức và có điểm cực tiểu. Với $(1,u^2)$, Định lý 05.22 cho $\inf F=0$ không đạt và mọi dãy cực tiểu hóa phân kỳ. Cùng dữ liệu, bộ đặc trưng quyết định sự tồn tại.
:::

::: exercise Bài tập 05.5
Cho ba điểm $u=(-1,0,1)$, $y=(-1,+1,-1)$ với đặc trưng $(1,u)$ và $\lambda=0{,}1$.

1. Tính $X^TX$, rồi $\mu$, $L$ và $\kappa$ theo (3.6).
2. So với cận tính từ $\lVert x_i\rVert\le r$.
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
:::

::: exercise Bài tập 05.6
Cho dữ liệu tách được bởi $\bar w$ và $F_\lambda$ là mục tiêu logistic có chính quy hóa.

1. Chứng minh $\nabla^2F_\lambda(0)=\frac1{4n}X^TX+\lambda I$, nên hằng số $L$ của (3.6) không giảm được.
2. Chứng minh $\nabla^2F_\lambda(t\bar w)\to\lambda I$ khi $t\to\infty$, nên hằng số $\mu=\lambda$ không tăng được.
:::

::: hint
Dùng $S_{ii}=\sigma(m_i)\sigma(-m_i)$, với $m_i(0)=0$ và $m_i(t\bar w)=t\,m_i(\bar w)\to\infty$.
:::

::: solution
1. Tại $w=0$, mọi biên bằng $0$, nên $S_{ii}=\sigma(0)^2=\tfrac14$ và $\nabla^2F_\lambda(0)=\frac1{4n}X^TX+\lambda I$. Trị riêng lớn nhất của ma trận này bằng $L$ của (3.6), nên mọi hằng số $L'$ với $\nabla^2F_\lambda\preceq L'I$ tại mọi $w$ phải thỏa $L'\ge L$.

2. $m_i(t\bar w)=t\,m_i(\bar w)\to\infty$ vì $m_i(\bar w)>0$, và $\sigma(m)\sigma(-m)\le e^{-m}\to0$. Mỗi phần tử của $\frac1nX^TS(t\bar w)X=\frac1n\sum_iS_{ii}x_ix_i^T$ tiến về $0$, nên $\nabla^2F_\lambda(t\bar w)\to\lambda I$. Nếu $\mu'>\lambda$ thỏa $\nabla^2F_\lambda\succeq\mu'I$ tại mọi $w$, thì $v^T\nabla^2F_\lambda(t\bar w)v\ge\mu'$ với vector đơn vị $v$, mâu thuẫn với giới hạn $\lambda$.
:::

Như vậy, chúng ta đã thấy một bài toán học lồi có thể không có điểm cực tiểu: trên dữ liệu tách được, mất mát logistic có cận dưới đúng $0$ không đạt, và mọi dãy cực tiểu hóa phân kỳ (Định lý 05.22); khi $\operatorname{rank}X=n$, mọi cách gán nhãn đều rơi vào trường hợp này (Mệnh đề 05.21). Trên dữ liệu không tách được theo nghĩa của Mệnh đề 05.24, điểm cực tiểu tồn tại. Hạng phạt bậc hai sửa bài toán cho mọi dữ liệu: $F_\lambda$ lồi mạnh, có đúng một nghiệm với chuẩn bị chặn (Định lý 05.26), và có số điều kiện $\kappa\le1+r^2/(4\lambda)$ (Mệnh đề 05.28).

Tuy nhiên, phép sửa này có hệ quả về tính toán. Nghiệm càng gần bài toán gốc thì $\lambda$ càng nhỏ và $\kappa$ càng lớn (Nhận xét 05.29), nên câu hỏi tồn tại đã được thay bằng câu hỏi tính toán. Trong Mục 4, chúng ta đếm chi phí tính $w_\lambda$ bằng hai phương pháp của Bài 04: hạ gradient, có số bước tăng theo $\kappa$, và phương pháp Newton, có số bước gần như không phụ thuộc $\kappa$ nhưng mỗi bước đắt hơn.

## 4. Độ cong và chi phí tính toán

Xét mục tiêu một chiều của Ví dụ 05.14 với $\lambda=0{,}005$: $F_\lambda(w)=\log(1+e^{-w})+0{,}0025\,w^2$, có số điều kiện $\kappa=51$ và nghiệm $w_\lambda=3{,}914$. Xuất phát từ $w_0=0$, hạ gradient với bước $\frac1L$ cần $71$ bước để sai số giá trị xuống dưới $10^{-8}$, trong khi phương pháp Newton chỉ cần $5$ bước. Trên bài toán một chiều, mỗi bước của hai phương pháp đều rẻ, nên Newton rẻ hơn rõ rệt.

Với $n$ mẫu và $d$ đặc trưng, mỗi bước Newton đòi Hessian $d\times d$ và một hệ tuyến tính $d\times d$, còn mỗi bước hạ gradient chỉ đòi gradient. Câu hỏi của mục là chi phí tính toán của một bước cập nhật hội tụ nhanh hơn. Để trả lời, chúng ta cần hai thừa số: số bước của mỗi phương pháp theo $\kappa$ và độ chính xác $\varepsilon_{\rm tol}$, và chi phí một bước theo $n$, $d$.

### 4.1 Hai quy tắc cập nhật

Bài 04 đã trình bày hai quy tắc cập nhật cho một hàm lồi mạnh $f$. Hạ gradient dùng một độ dài bước chung cho mọi hướng:

$$
w_{k+1}=w_k-\frac1L\nabla f(w_k).
\tag{4.1}
$$

Phương pháp Newton nhân gradient với nghịch đảo Hessian, tức chia thành phần theo mỗi hướng riêng cho độ cong của chính hướng đó (Định nghĩa 04.28):

$$
w_{k+1}=w_k-\bigl[\nabla^2f(w_k)\bigr]^{-1}\nabla f(w_k).
\tag{4.2}
$$

Ví dụ sau so hai quy tắc trên một hàm bậc hai có elip rất dẹt, loại đường mức mà Mục 2.5 gắn với số điều kiện lớn.

::: example Ví dụ 05.17 (Hai quy tắc trên hàm bậc hai có trị riêng $1$ và $10$)
**Dữ kiện.** $f(w)=\tfrac12w^THw$ trên $\mathbb R^2$, với $H$ có trị riêng $1$ và $10$ và vector riêng $v_1=(\cos30^\circ,\sin30^\circ)$, $v_2=(-\sin30^\circ,\cos30^\circ)$:

$$
H=\begin{pmatrix}3{,}25&-3{,}897\\-3{,}897&7{,}75\end{pmatrix}.
$$

Nghiệm $w^*=0$; điểm đầu $w_0=(6,4)$; $L=10$, nên bước hạ gradient là $\eta=\tfrac1L=0{,}1$.

**Phân tích theo hướng riêng.** Viết $w_k=a_kv_1+b_kv_2$. Ở điểm đầu, $a_0=6\cos30^\circ+4\sin30^\circ=7{,}196$ và $b_0=-6\sin30^\circ+4\cos30^\circ=0{,}464$. Vì $\nabla f(w)=Hw$, một bước hạ gradient cho $w_{k+1}=(I-0{,}1H)w_k$, nên

$$
a_{k+1}=(1-0{,}1\cdot1)\,a_k=0{,}9\,a_k,\qquad b_{k+1}=(1-0{,}1\cdot10)\,b_k=0 .
$$

Thành phần theo hướng cong nhất bị triệt tiêu ngay ở bước đầu; thành phần theo hướng phẳng chỉ co $0{,}9$ lần mỗi bước.

**Hạ gradient sau 12 bước.** $\lVert w_{12}\rVert=0{,}9^{12}\cdot7{,}196=0{,}282\cdot7{,}196\approx2{,}03$, so với $\lVert w_0\rVert=\sqrt{52}\approx7{,}21$; điểm lặp là $w_{12}\approx(1{,}76;\ 1{,}02)$.

**Newton.** $\nabla^2f\equiv H$, nên (4.2) cho $w_1=w_0-H^{-1}Hw_0=0$: một bước tới nghiệm.

**Kiểm tra lại.** $2{,}03\cdot(\cos30^\circ,\sin30^\circ)=(1{,}76;\ 1{,}02)$, khớp điểm lặp; theo hướng $v_1$, cần $k\ge\log(10^{-3})/\log0{,}9\approx65{,}6$ bước để khoảng cách giảm $1000$ lần.
:::

![Đường mức elip của hàm bậc hai có trị riêng 1 và 10, trục xoay 30 độ, cực tiểu tại gốc. Từ w₀ = (6; 4), 12 bước hạ gradient bước 0,1 (chấm nối liền) đi dọc hướng phẳng và dừng ở (1,76; 1,02); một bước Newton (nét đứt) đi thẳng tới gốc.](img/lec-05/cp-gd-newton-paths.svg)

Trên hình, các chấm của hạ gradient rơi ngay xuống trục dài của elip sau bước đầu rồi tiến chậm dọc trục đó; đó là hướng gần phẳng của Mục 2.5. Mũi tên nét đứt của Newton đi thẳng tới gốc. Trên hàm bậc hai, mô hình bậc hai mà Newton dùng chính là hàm, nên một bước tới đúng nghiệm; trên $F_\lambda$ thì không, vì Hessian thay đổi theo $w$.

Hệ số co $1-\eta s$ theo hướng có độ cong $s$ là lý do số điều kiện xuất hiện trong số bước. Với $\eta=\frac1L$, hướng phẳng nhất có hệ số $1-\frac\mu L=1-\frac1\kappa$, và đó chính là hệ số trong Định lý 04.26.

### 4.2 Hai phương pháp trên ví dụ một chiều

Ví dụ sau chạy hai quy tắc trên mục tiêu một chiều của mở đầu mục, theo dõi sai số giá trị $e_k=F_\lambda(w_k)-F_\lambda(w_\lambda)$.

::: example Ví dụ 05.18 (Hạ gradient và Newton với $\lambda=0{,}005$)
**Dữ kiện.** $F_\lambda(w)=\log(1+e^{-w})+\frac\lambda2w^2$ với $\lambda=0{,}005$; đạo hàm $g(w)=-\sigma(-w)+\lambda w$, đạo hàm bậc hai $h(w)=\sigma(w)\sigma(-w)+\lambda$; $L=\tfrac14+\lambda=0{,}255$, $\kappa=51$; $w_0=0$; nghiệm $w_\lambda=3{,}914$ với $e_0=0{,}635$. Dừng khi $e_k\le10^{-8}$.

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

Trên thang logarit, sai số của hạ gradient là một đường gần thẳng, tức giảm theo một tỉ số gần cố định mỗi bước. Sai số của Newton đi xuống ngày càng dốc: từ $e_3\approx10^{-3}$ sang $e_4\approx10^{-5}$ rồi $e_5\approx10^{-9}$, số chữ số đúng gần gấp đôi mỗi bước. Đó là hai kiểu hội tụ, tuyến tính và bậc hai, của Định nghĩa 04.33. Ở Mục 4.3 và 4.4, chúng ta phát biểu hai định lý ứng với hai đường này.

### 4.3 Số bước của hạ gradient

Định lý sau là Định lý 05b.18(b), cũng là Định lý 04.26, phát biểu lại với ký hiệu của chương. Chứng minh nằm ở hai chương đó; ở đây chúng ta dùng nó để đếm số bước.

::: theorem Định lý 05.30 (Hội tụ tuyến tính của hạ gradient)
**Giả thiết.** $f:\mathbb R^d\to\mathbb R$ khả vi, có gradient $L$-Lipschitz (H2) và lồi mạnh với hằng số $\mu$ (H3), $0<\mu\le L$; $w^*$ là điểm cực tiểu; dãy (4.1) với bước $\frac1L$; $e_k=f(w_k)-f(w^*)$.

**Kết luận.** Với mọi $k\ge0$,

$$
e_k\le\Bigl(1-\frac\mu L\Bigr)^ke_0 .
\tag{4.3}
$$

**Điều kiện áp dụng.** Cần biết $L$ để đặt bước; $\mu$ chỉ xuất hiện trong cận.

**Phạm vi.** Định lý không nói gì về chi phí của mỗi bước; mỗi bước dùng $\nabla f$ trên toàn bộ dữ liệu. Chứng minh: Định lý 05b.18, phần (b), và Định lý 04.26.
:::

Áp vào hồi quy logistic có chính quy hóa, Mệnh đề 05.28 cho $F_\lambda$ thỏa giả thiết với $\mu=\lambda$ và $L=\lambda_{\max}(X^TX)/(4n)+\lambda$. Hệ quả sau đổi (4.3) thành số bước.

::: corollary Hệ quả 05.31 (Số bước đủ cho độ chính xác $\varepsilon_{\rm tol}$)
**Giả thiết.** Như Định lý 05.30, với $\kappa=L/\mu$ và $0<\varepsilon_{\rm tol}<e_0$.

**Kết luận.** Nếu $k\ge\kappa\log\dfrac{e_0}{\varepsilon_{\rm tol}}$ thì $e_k\le\varepsilon_{\rm tol}$.

**Điều kiện áp dụng.** Cần $e_0$, hoặc một cận trên của nó.

**Phạm vi.** Đây là điều kiện đủ: nó bảo đảm số bước không vượt giá trị đó, không nói số bước thực bằng giá trị đó.
:::

::: proof Chứng minh Hệ quả 05.31
Hàm $\log$ lõm nên $\log(1-s)\le-s$ với $s\in[0,1)$. Áp với $s=\frac1\kappa$: $(1-\frac1\kappa)^k=e^{k\log(1-1/\kappa)}\le e^{-k/\kappa}$. Theo (4.3), $e_k\le e^{-k/\kappa}e_0$, và vế phải không vượt $\varepsilon_{\rm tol}$ khi $k/\kappa\ge\log(e_0/\varepsilon_{\rm tol})$. $\square$
:::

**Trong học máy.** Đối tượng của Định lý 05.30 là mục tiêu huấn luyện $F_\lambda$ của hồi quy logistic có suy giảm trọng số, và dãy lặp là bộ tối ưu hạ gradient với tốc độ học $\frac1L$. Giả thiết lồi mạnh được bảo đảm bởi hạng phạt, với $\mu=\lambda$ (Định lý 05.26), và $L$ được tính từ dữ liệu theo Mệnh đề 05.28. Kết luận cho số bước tăng theo $\kappa\le1+r^2/(4\lambda)$, nên chọn $\lambda$ nhỏ để nghiệm gần bài toán gốc làm số bước tăng theo $1/\lambda$ (Tình huống 05.3). Với mạng nơ ron, mục tiêu không lồi mạnh và định lý không áp dụng; Bài 05b nêu bảo đảm còn lại (Định lý 05b.41).

Ví dụ sau so cận của Hệ quả 05.31 với số bước thực trên ví dụ một chiều, với ba giá trị $\lambda$.

::: example Ví dụ 05.19 (Số bước theo số điều kiện)
**Dữ kiện.** $F_\lambda(w)=\log(1+e^{-w})+\frac\lambda2w^2$, $L=\tfrac14+\lambda$, $\mu=\lambda$, $w_0=0$, $\varepsilon_{\rm tol}=10^{-8}$; hạ gradient bước $\frac1L$ và Newton bước đầy đủ.

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

::: remark Nhận xét 05.32 (Số điều kiện cục bộ)
Gần nghiệm $w_\lambda$, ánh xạ một bước $T(w)=w-F_\lambda'(w)/L$ có $T(w_\lambda)=w_\lambda$ và $T'(w_\lambda)=1-F_\lambda''(w_\lambda)/L$. Khai triển bậc nhất cho

$$
w_{k+1}-w_\lambda\approx\Bigl(1-\frac{F_\lambda''(w_\lambda)}L\Bigr)(w_k-w_\lambda),
$$

và khai triển bậc hai của $F_\lambda$ quanh nghiệm cho $e_k\approx\tfrac12F_\lambda''(w_\lambda)(w_k-w_\lambda)^2$. Do đó sai số giá trị co theo hệ số khoảng $\bigl(1-F_\lambda''(w_\lambda)/L\bigr)^2$. Với ba giá trị $\lambda$ của Ví dụ 05.19, hệ số này bằng $0{,}267;\ 0{,}819;\ 0{,}973$, khớp tỉ số $e_{k+1}/e_k$ đo được ở cuối quỹ đạo, $0{,}2666;\ 0{,}8192;\ 0{,}9729$.

Số bước vì vậy tỉ lệ gần với số điều kiện cục bộ $L/F_\lambda''(w_\lambda)$ chứ không với $\kappa=L/\lambda$. Cận theo $\kappa$ vẫn đúng; nó chỉ không chặt trên ví dụ này. Mọi so sánh dùng cận của Hệ quả 05.31, như ở Mục 4.6, kế thừa độ bi quan này.
:::

### 4.4 Số bước của phương pháp Newton

Định lý sau là Định lý 04.35 của Bài 04, phát biểu với ký hiệu của chương: $\mu$, $L$ là cận dưới và cận trên của Hessian, $L_H$ là hằng số Lipschitz của Hessian. Boyd và Vandenberghe (2004, mục 9.5.3) viết ba hằng số này là $m$, $M$, $L$.

::: theorem Định lý 05.33 (Hội tụ hai giai đoạn của Newton với quay lui)
**Giả thiết.** $f$ lồi, khả vi hai lần liên tục; trên tập mức $C_0=\{w:\ f(w)\le f(w_0)\}$, $\mu I\preceq\nabla^2f\preceq LI$ với $\mu>0$, và $\lVert\nabla^2f(w)-\nabla^2f(z)\rVert\le L_H\lVert w-z\rVert$. Phương pháp Newton với quay lui Armijo tham số $\alpha\in(0,\tfrac12)$, $\beta\in(0,1)$ (Thuật toán 04.2).

**Kết luận.** Số bước để $f(w_k)-f^*\le\varepsilon_{\rm tol}$ không vượt

$$
\frac{f(w_0)-f^*}{\gamma}+\log_2\log_2\frac{\varepsilon_0}{\varepsilon_{\rm tol}},\qquad\varepsilon_0=\frac{2\mu^3}{L_H^2},
\tag{4.4}
$$

với $\gamma>0$ là mức giảm tối thiểu mỗi bước ở giai đoạn tắt dần, phụ thuộc $\mu$, $L$, $L_H$, $\alpha$, $\beta$.

**Điều kiện áp dụng.** Cần cả ba hằng số trên $C_0$ để định lý đúng, dù thuật toán không dùng chúng.

**Phạm vi.** Chứng minh nằm ngoài phạm vi học phần; xem Boyd và Vandenberghe (2004, mục 9.5.3, tr. 488–491). Các hằng số $\gamma$, $\varepsilon_0$ thường không tính được trong thực tế.
:::

Định lý có hai giai đoạn. Ở giai đoạn tắt dần (damped phase), khi $\lVert\nabla f(w_k)\rVert$ còn lớn, mỗi bước giảm $f$ ít nhất $\gamma$, nên có không quá $(f(w_0)-f^*)/\gamma$ bước. Ở giai đoạn bậc hai, khi $\lVert\nabla f(w_k)\rVert<\vartheta$ với ngưỡng $\vartheta$ tỉ lệ với $\mu^2/L_H$, quay lui nhận bước đầy đủ và sai số giảm theo bình phương; sau $j$ bước, sai số không vượt $\varepsilon_0(\tfrac12)^{2^j}$. Chẳng hạn, sáu bước bậc hai cho sai số dưới $\varepsilon_0\cdot2^{-64}\approx5\cdot10^{-20}\varepsilon_0$.

Số bước của giai đoạn bậc hai, $\log_2\log_2(\varepsilon_0/\varepsilon_{\rm tol})$, không chứa $\kappa$. Nhưng $\gamma$ và $\varepsilon_0$ phụ thuộc $\mu$, $L$, $L_H$, nên toàn bộ cận (4.4) không độc lập với độ cong. Phát biểu "số bước Newton không phụ thuộc $\kappa$" không kèm điều kiện là sai.

::: example Ví dụ 05.20 (Ngưỡng của giai đoạn bậc hai trên ví dụ một chiều)
**Dữ kiện.** $F_\lambda(w)=\log(1+e^{-w})+\frac\lambda2w^2$ với ba giá trị $\lambda$ của Ví dụ 05.19; hằng số lồi mạnh $\mu=\lambda$.

**Hằng số Lipschitz của Hessian.** $F_\lambda'''(w)=\frac{d}{dw}\bigl[s(1-s)\bigr]$ với $s=\sigma(w)$, tức $s(1-s)(1-2s)$. Hàm $q(s)=s(1-s)(1-2s)$ trên $(0,1)$ có $q'(s)=1-6s+6s^2=0$ tại $s=\tfrac{3\pm\sqrt3}6$, và $\lvert q\rvert$ lớn nhất bằng $\tfrac1{6\sqrt3}\approx0{,}0962$. Vậy $L_H=\tfrac1{6\sqrt3}$.

**Ngưỡng.** Chứng minh của Boyd và Vandenberghe (2004, tr. 488) bảo đảm giai đoạn bậc hai khi $\lvert F_\lambda'(w_k)\rvert$ xuống dưới một ngưỡng cỡ $\mu^2/L_H$:

| $\lambda$ | $0{,}05$ | $0{,}005$ | $0{,}0005$ |
|---|---:|---:|---:|
| $\mu^2/L_H=6\sqrt3\,\lambda^2$ | $2{,}6\cdot10^{-2}$ | $2{,}6\cdot10^{-4}$ | $2{,}6\cdot10^{-6}$ |

**Diễn giải.** Ngưỡng co theo $\lambda^2$, và nghiệm $w_\lambda$ nằm xa điểm đầu hơn khi $\lambda$ giảm. Đó là lý do số bước Newton của Ví dụ 05.19 tăng nhẹ từ $4$ lên $7$ dù mọi bước là bước đầy đủ. Chỉ riêng số bước của giai đoạn bậc hai mới không phụ thuộc $\kappa$, đúng như Định lý 05.33.

**Kiểm tra lại.** Tại $s=\tfrac{3-\sqrt3}6\approx0{,}2113$: $0{,}2113\cdot0{,}7887\cdot0{,}5774\approx0{,}0962$.
:::

Hạ gradient bị elip dẹt làm chậm, Newton thì không. Mệnh đề sau giải thích điều đó bằng một tính chất hình học của bước Newton, đã gặp ở Mệnh đề 04.31(c).

::: proposition Mệnh đề 05.34 (Bất biến affine của bước Newton)
**Giả thiết.** $f$ khả vi hai lần với $\nabla^2f(w)\succ0$; $T\in\mathbb R^{d\times d}$ khả nghịch; $\tilde f(z)=f(Tz)$ và $w=Tz$.

**Kết luận.** Gọi $p$ là bước Newton của $f$ tại $w$ và $\tilde p$ là bước Newton của $\tilde f$ tại $z$. Khi đó $T\tilde p=p$: hai bước ứng với cùng một điểm mới. Bước hạ gradient không có tính chất này khi $TT^T\ne I$.

**Điều kiện áp dụng.** Phép đổi biến tuyến tính khả nghịch; với phép đổi biến affine $w=Tz+c$ kết luận không đổi.

**Phạm vi.** Mệnh đề nói về hướng; quay lui Armijo cũng chọn cùng độ dài bước cho hai bài toán, vì $\tilde f(z+t\tilde p)=f(w+tp)$.
:::

::: proof Chứng minh Mệnh đề 05.34
**Bước 1 (đạo hàm sau đổi biến).** Theo quy tắc dây chuyền, $\nabla\tilde f(z)=T^T\nabla f(w)$ và $\nabla^2\tilde f(z)=T^T\nabla^2f(w)\,T$.

**Bước 2 (bước Newton).** Viết $g=\nabla f(w)$, $H=\nabla^2f(w)$. Khi đó

$$
\begin{aligned}
\tilde p&=-(T^THT)^{-1}T^Tg\\&=-T^{-1}H^{-1}(T^T)^{-1}T^Tg\\&=-T^{-1}H^{-1}g\\&=T^{-1}p ,
\end{aligned}
$$

nên $T\tilde p=p$.

**Bước 3 (hạ gradient).** Bước hạ gradient của $\tilde f$ là $-\eta T^Tg$, ứng với độ dời $-\eta TT^Tg$ trong biến $w$, khác $-\eta g$ khi $TT^T\ne I$. $\square$
:::

Chọn $T$ sao cho $T^THT=I$ biến elip dẹt thành đường tròn; theo mệnh đề, Newton đi cùng một quỹ đạo trong cả hai hệ tọa độ, nên không bị elip dẹt làm chậm. Đổi lại, mỗi bước cần $\nabla^2F_\lambda$ và một hệ tuyến tính $d\times d$; chúng ta đếm chi phí đó ở Mục 4.5.

**Trong học máy.** Đối tượng của Định lý 05.33 và Mệnh đề 05.34 là bộ tối ưu bậc hai cho hồi quy logistic có chính quy hóa, còn gọi là bình phương nhỏ nhất có trọng số lặp (Mục 4.5). Giả thiết của Định lý 05.33 thỏa với mục tiêu này: Hessian bị chặn hai phía (Mệnh đề 05.28) và liên tục Lipschitz, vì đạo hàm bậc ba của $\phi$ bị chặn (Ví dụ 05.20). Tính bất biến affine giải thích vì sao Newton không cần chuẩn hóa đặc trưng như hạ gradient. Với mạng nơ ron có hàm kích hoạt ReLU, Hessian không liên tục Lipschitz và có thể không xác định dương, nên cả hai giả thiết bị vi phạm (Bài 06).

### 4.5 Chi phí một bước

Chúng ta đếm số phép nhân–cộng theo giả thiết (G5) cho hồi quy logistic có chính quy hóa. Hai thuật toán sau ghi từng dòng của một bước kèm chi phí.

::: algorithm Thuật toán 05.1 (Một bước hạ gradient cho hồi quy logistic có chính quy hóa)
**Đầu vào.** $X\in\mathbb R^{n\times d}$, $y\in\{-1,+1\}^n$, $\lambda>0$, $L$ theo (3.6), điểm lặp $w\in\mathbb R^d$, ngưỡng $\varepsilon_g>0$ cho chuẩn gradient.

1. Tính điểm số $z=Xw$: $nd$.
2. Tính $r_i=-y_i\,\sigma(-y_iz_i)$ với $i=1,\ldots,n$: $O(n)$.
3. Tính $g=\frac1nX^Tr+\lambda w$: $nd$.
4. Nếu $\lVert g\rVert\le\varepsilon_g$: dừng, trả về $w$.
5. Cập nhật $w\leftarrow w-\frac1Lg$: $O(d)$.

**Đầu ra.** Điểm lặp mới.

**Chi phí mỗi bước.** $2nd+O(n+d)$ phép nhân–cộng; bộ nhớ thêm cho $z$, $r\in\mathbb R^n$ và $g\in\mathbb R^d$.
:::

Dòng 3 dùng công thức gradient (3.2) viết lại: $\nabla F(w)=\frac1nX^Tr$ với $r_i=-\sigma(-m_i)y_i$ và $m_i=y_iz_i$. Một bước hạ gradient vì vậy là hai phép nhân ma trận–vector với $X$, cộng các phép toán theo từng mẫu.

::: algorithm Thuật toán 05.2 (Một bước Newton cho hồi quy logistic có chính quy hóa)
**Đầu vào.** Như Thuật toán 05.1, thay $\varepsilon_g$ bằng ngưỡng $\varepsilon_{\rm tol}>0$ cho sai số giá trị; tham số quay lui $\alpha$, $\beta$.

1. Tính $z$, $r$, $g$ như các dòng 1–3 của Thuật toán 05.1: $2nd$.
2. Tính $S_{ii}=\sigma(m_i)\sigma(-m_i)$ từ $z$: $O(n)$.
3. Lập $H=\frac1nX^TSX+\lambda I$: $nd^2$.
4. Giải $Hp=-g$ bằng phân tích Cholesky: bậc $d^3$.
5. Tính $\delta_N^2=-g^Tp$, bình phương độ giảm Newton (Định nghĩa 04.30); nếu $\tfrac12\delta_N^2\le\varepsilon_{\rm tol}$: dừng.
6. Quay lui Armijo theo hướng $p$: tính sẵn $Xp$ ($nd$), mỗi lần thử một $t$ tốn $O(n)$.
7. Cập nhật $w\leftarrow w+tp$: $O(d)$.

**Đầu ra.** Điểm lặp mới.

**Chi phí mỗi bước.** $O(nd^2+d^3)$; bộ nhớ thêm cho $H$ với $d^2$ số và các vector độ dài $n$.
:::

Dòng 3 là tổng của $n$ tích ngoài $S_{ii}x_ix_i^T$, mỗi tích tốn $d^2$; dùng tính đối xứng thì chỉ cần khoảng $nd^2/2$. Phân tích Cholesky tốn khoảng $d^3/3$ phép tính, sau đó hai phép thế tốn $O(d^2)$. Theo Mệnh đề 04.31(a), $\tfrac12\delta_N^2$ là mức giảm của mô hình bậc hai và ước lượng $F_\lambda(w)-F_\lambda^*$ khi $w$ gần nghiệm. Newton cho hồi quy logistic ở dạng này còn gọi là bình phương nhỏ nhất có trọng số lặp (iteratively reweighted least squares, IRLS): mỗi bước giải một bài toán bình phương nhỏ nhất với trọng số $S$.

::: proposition Mệnh đề 05.35 (Chi phí một bước)
**Giả thiết.** $X\in\mathbb R^{n\times d}$ dày, $n\ge d$; đếm phép nhân–cộng và bỏ hằng số (G5).

**Kết luận.**

1. Một bước hạ gradient tốn thời gian $O(nd)$ và bộ nhớ thêm $O(n+d)$.
2. Một bước Newton tốn thời gian $O(nd^2+d^3)$ và bộ nhớ thêm $O(d^2+n)$.
3. Tỉ số chi phí một bước Newton trên một bước hạ gradient có bậc $d+d^2/n$.

**Điều kiện áp dụng.** Ma trận dày; trường hợp $d>n$ và dữ liệu thưa ở Mệnh đề 05.36 và Nhận xét 05.37.

**Phạm vi.** Đếm theo bậc; hằng số bị bỏ có thể đổi kết luận khi hai chi phí cùng bậc (Mục 4.6).
:::

::: proof Chứng minh Mệnh đề 05.35
**Bước 1 (thời gian).** Cộng chi phí các dòng của Thuật toán 05.1: $2nd+O(n+d)=O(nd)$. Thuật toán 05.2 thêm dòng 3 ($nd^2$), dòng 4 ($O(d^3)$), dòng 6 ($nd$ cộng $O(n)$ cho mỗi lần thử, với số lần thử bị chặn theo Mệnh đề 04.11); tổng là $O(nd^2+d^3)$, vì $nd\le nd^2$.

**Bước 2 (bộ nhớ).** Hạ gradient lưu $z$, $r\in\mathbb R^n$ và $g\in\mathbb R^d$, tức $O(n+d)$. Newton lưu thêm $H$ với $d^2$ số và $Xp\in\mathbb R^n$, tức $O(d^2+n)$.

**Bước 3 (tỉ số).** $\dfrac{nd^2+d^3}{nd}=d+\dfrac{d^2}n$. $\square$
:::

Cả hai chi phí đều có thừa số $n$, vì mỗi bước đọc toàn bộ dữ liệu. Tỉ số $d+d^2/n$ là phần bị nhân thêm khi chuyển từ hạ gradient sang Newton. Nếu duyệt dữ liệu theo từng hàng, tính $z_i$, $r_i$ rồi cộng dồn $r_ix_i$ vào $g$, bộ nhớ thêm của hạ gradient giảm còn $O(d)$; thời gian không đổi.

Khi $d>n$, Hessian có cấu trúc đặc biệt: $\lambda I$ cộng một ma trận có hạng không quá $n$. Mệnh đề sau khai thác cấu trúc đó.

::: proposition Mệnh đề 05.36 (Bước Newton khi $d>n$)
**Giả thiết.** $d>n$; $H=\lambda I+UU^T$ với $U=\frac1{\sqrt n}X^TS^{1/2}\in\mathbb R^{d\times n}$, $\lambda>0$; $g\in\mathbb R^d$.

**Kết luận.** Nghiệm của $Hp=-g$ là

$$
p=-\frac1\lambda\Bigl[g-U\bigl(\lambda I_n+U^TU\bigr)^{-1}U^Tg\Bigr],
\tag{4.5}
$$

tính được với chi phí $O(n^2d+n^3)$ thay cho $O(nd^2+d^3)$.

**Điều kiện áp dụng.** Mọi $d$, $n$; có lợi khi $n<d$.

**Phạm vi.** Công thức chung cho mọi quan hệ giữa $n$ và $d$ là $O\bigl(nd\min(n,d)+\min(n,d)^3\bigr)$.
:::

::: proof Chứng minh Mệnh đề 05.36
**Bước 1 ($H=\lambda I+UU^T$).** $UU^T=\frac1nX^TS^{1/2}S^{1/2}X=\frac1nX^TSX$, nên $H$ là Hessian của Thuật toán 05.2.

**Bước 2 (công thức nghịch đảo Woodbury).** Đặt $M=\lambda I_n+U^TU\in\mathbb R^{n\times n}$, xác định dương. Ta kiểm tra $H\cdot\frac1\lambda\bigl[I-UM^{-1}U^T\bigr]=I$:

$$
\begin{aligned}
(\lambda I+UU^T)\tfrac1\lambda\bigl[I-UM^{-1}U^T\bigr]&=I+\tfrac1\lambda UU^T-\tfrac1\lambda(\lambda U+UU^TU)M^{-1}U^T\\
&=I+\tfrac1\lambda UU^T-\tfrac1\lambda U(\lambda I_n+U^TU)M^{-1}U^T&&\text{(a)}\\
&=I+\tfrac1\lambda UU^T-\tfrac1\lambda UU^T&&\text{(b)}\\
&=I.
\end{aligned}
$$

Dòng (a) đặt $U$ ra trước tích $(\lambda I_n+U^TU)$; dòng (b) dùng $(\lambda I_n+U^TU)M^{-1}=I_n$. Nhân $H^{-1}=\frac1\lambda[I-UM^{-1}U^T]$ với $-g$ cho (4.5).

**Bước 3 (chi phí).** Lập $U$ tốn $nd$; lập $U^TU$ tốn $n^2d$; phân tích Cholesky của $M$ tốn $O(n^3)$; tính $U^Tg$, giải hệ $n\times n$ và nhân với $U$ tốn $nd+O(n^2)+nd$. Tổng là $O(n^2d+n^3)$. $\square$
:::

Hai mệnh đề trên giả thiết ma trận dày. Nhận xét sau nêu điều thay đổi khi dữ liệu thưa.

::: remark Nhận xét 05.37 (Dữ liệu thưa và các phương pháp tránh Hessian dày)
Với dữ liệu thưa như vector TF-IDF, $nd$ trong chi phí hạ gradient được thay bằng số phần tử khác $0$ của $X$, nhỏ hơn $nd$ nhiều khi phần lớn tọa độ của mỗi $x_i$ bằng $0$. Hessian $X^TSX$ thì nói chung vẫn dày, nên chi phí $d^2$ bộ nhớ và $d^3$ thời gian của Newton không giảm theo. Gradient liên hợp (conjugate gradient) giải $Hp=-g$ chỉ bằng các tích $Hv=\frac1nX^T(S(Xv))+\lambda v$, mỗi tích tốn như một gradient; các phương pháp tựa Newton như BFGS xấp xỉ $H^{-1}$ từ hiệu các gradient. Hai nhóm phương pháp này được trình bày ở Bài 06c.
:::

Ví dụ sau áp Mệnh đề 05.35 cho một bài toán cỡ trung bình.

::: example Ví dụ 05.21 (Chi phí một bước với $n=10^5$, $d=10^3$)
**Dữ kiện.** Ma trận dày $X\in\mathbb R^{10^5\times10^3}$, mất mát logistic có chính quy hóa.

**Hạ gradient.** Hai tích $Xw$ và $X^Tr$, mỗi tích $nd=10^8$ phép nhân–cộng.

**Newton.** Lập $H$ tốn $nd^2=10^{11}$; Cholesky tốn bậc $d^3=10^9$; Hessian chiếm $8d^2=8\cdot10^6$ byte, tức 8 MB, ở độ chính xác kép.

**Tỉ số.** $d+d^2/n=1000+10=1010$: riêng dòng lập Hessian đã tốn gấp $1000$ lần một tích $Xw$.

**Kiểm tra lại.** $(nd^2+d^3)/(nd)=(10^{11}+10^9)/10^8=1010$.
:::

### 4.6 Tổng chi phí và ngưỡng hòa vốn

Tổng chi phí của một phương pháp xấp xỉ bằng chi phí một bước nhân số bước. Với hạ gradient, Hệ quả 05.31 và Mệnh đề 05.35 cho cận

$$
C_{\rm HG}\approx nd\cdot\kappa\log\frac{e_0}{\varepsilon_{\rm tol}} .
\tag{4.6}
$$

Với Newton chạy $N_{\rm N}$ bước,

$$
C_{\rm N}\approx(nd^2+d^3)\,N_{\rm N}.
\tag{4.7}
$$

Chia (4.6) cho (4.7), Newton rẻ hơn theo cận khi

$$
\kappa\log\frac{e_0}{\varepsilon_{\rm tol}}>N_{\rm N}\Bigl(d+\frac{d^2}n\Bigr).
\tag{4.8}
$$

Vế trái tăng theo số điều kiện và theo độ chính xác yêu cầu; vế phải tăng theo số đặc trưng. Newton có lợi khi $\kappa$ rất lớn và $d$ vừa phải; khi $d$ lớn, các số hạng $d^2$ và $d^3$ chiếm ưu thế.

::: example Ví dụ 05.22 (Ngưỡng hòa vốn với $n=10^5$, $d=10^3$)
**Dữ kiện.** $n=10^5$, $d=10^3$, $e_0/\varepsilon_{\rm tol}=10^8$ nên $\log(e_0/\varepsilon_{\rm tol})=18{,}42$; $N_{\rm N}=10$; mỗi $x_i$ gồm tọa độ hằng $1$ và phần còn lại có chuẩn không quá $1$, nên $r^2=2$ và Mệnh đề 05.28 cho $\kappa\le1+\frac2{4\lambda}$.

**Hai tổng chi phí.** $C_{\rm N}\approx10\cdot(10^{11}+10^9)=1{,}01\cdot10^{12}$ và $C_{\rm HG}\approx10^8\cdot18{,}42\cdot\kappa=1{,}842\cdot10^9\,\kappa$. Hòa vốn khi $\kappa=1{,}01\cdot10^{12}/1{,}842\cdot10^9\approx548$.

**Hai giá trị $\lambda$.**

- $\lambda=10^{-3}$: $\kappa\le501$, cận $C_{\rm HG}\approx9{,}2\cdot10^{11}$, cùng bậc với $C_{\rm N}$; hai cận chênh khoảng $9\,\%$, dưới độ phân giải của phép đếm bỏ hằng số, nên phép đếm không phân định.
- $\lambda=10^{-5}$: $\kappa\le50\,001$, cận $C_{\rm HG}\approx9{,}2\cdot10^{13}$, gấp khoảng $90$ lần $C_{\rm N}$: Newton có lợi theo cận.

**Kiểm tra với hằng số.** Tính cả hằng số của hai thuật toán, một bước hạ gradient tốn $2nd=2\cdot10^8$ và một bước Newton tốn $2nd+nd^2/2+d^3/3\approx5{,}05\cdot10^{10}$; tỉ số một bước khoảng $253$ thay cho $1010$, và ngưỡng hòa vốn là $\kappa\approx137$ thay cho $548$. Với $\lambda=10^{-3}$, cận của hạ gradient $\approx1{,}8\cdot10^{12}$ khi đó lớn hơn $C_{\rm N}\approx5{,}1\cdot10^{11}$: kết luận đổi chiều. Với $\lambda=10^{-5}$, chênh lệch khoảng $365$ lần, nên kết luận "Newton có lợi theo cận" không đổi.
:::

Từ ví dụ trên, chúng ta rút ra hai điều về cách đọc phép đếm. Thứ nhất, khi hai cận cùng bậc, hằng số bị bỏ quyết định chiều của kết luận, nên phép đếm theo bậc chỉ phân định được khi hai cận chênh nhau nhiều bậc. Thứ hai, (4.6) là cận trên của hạ gradient, mà Ví dụ 05.19 cho thấy có thể lớn hơn chi phí thật từ $9$ đến $20$ lần; so sánh hai cận không phải so sánh hai chi phí thật.

Bottou và Bousquet (2011, Bảng 13.2, tr. 362) lập một bảng tương tự. Trong bảng đó, hạ gradient tốn $O(nd)$ mỗi bước và $O(\kappa\log\frac1\rho)$ bước, với $\rho$ là độ chính xác tối ưu. Phương pháp bậc hai của họ giả định biết trước nghịch đảo Hessian, nên mỗi bước chỉ tốn $O(d^2+nd)$, với $O(\log\log\frac1\rho)$ bước.

### 4.7 Chi phí theo quy mô dữ liệu

Chúng ta tính các đại lượng của Mệnh đề 05.35 ở ba quy mô; quy mô thứ ba là kích thước tập RCV1, mà chúng ta gặp lại ở Mục 5.2.

::: example Ví dụ 05.23 (Chi phí theo ba quy mô)
**Dữ kiện.** Ma trận dày $X\in\mathbb R^{n\times d}$; mỗi số thực chiếm $8$ byte ở độ chính xác kép. Quy mô thứ ba là tập RCV1: $n=781\,265$ văn bản huấn luyện, $d=47\,152$ đặc trưng TF-IDF.

**Bảng.**

| $(n,d)$ | $nd$ | $nd^2$ | $d^3$ | Hessian ($8d^2$ byte) | $d+d^2/n$ |
|---|---:|---:|---:|---:|---:|
| $(10^3,\ 10^2)$ | $10^5$ | $10^7$ | $10^6$ | 80 kB | $110$ |
| $(10^5,\ 10^3)$ | $10^8$ | $10^{11}$ | $10^9$ | 8 MB | $1010$ |
| $(781\,265;\ 47\,152)$ | $3{,}68\cdot10^{10}$ | $1{,}74\cdot10^{15}$ | $1{,}05\cdot10^{14}$ | 17,8 GB | $\approx5{,}0\cdot10^4$ |

**Đọc bảng.** Khi $(n,d)$ tăng, một bước Newton đắt hơn một bước hạ gradient từ $10^2$ đến $5\cdot10^4$ lần. Ở quy mô thứ ba, riêng Hessian cần 17,8 GB bộ nhớ, và một bước Newton dày tốn $nd^2+d^3\approx1{,}84\cdot10^{15}$ phép nhân–cộng.

**Kiểm tra lại.** Dòng ba: $8\cdot47\,152^2\approx1{,}78\cdot10^{10}$ byte; $d^2/n=47\,152^2/781\,265\approx2846$, nên $d+d^2/n\approx49\,998$.
:::

Dữ liệu RCV1 là dữ liệu thưa, nên các con số tính như ma trận dày chỉ dùng để so bậc, không mô tả cách một thí nghiệm thực chạy. Chúng ta không giả định tốc độ máy, nên bảng chỉ so số phép tính và số byte. Ngay cả theo cách đếm dày, một tích $Xv$ trên RCV1 cần $nd\approx3{,}7\cdot10^{10}$ phép nhân–cộng, và một gradient đầy đủ theo Thuật toán 05.1 cần hai tích như vậy, khoảng $7{,}4\cdot10^{10}$; đó là chi phí của mỗi lần cập nhật hạ gradient.

Tổng hợp Mục 4.3–4.5, tổng chi phí của hai phương pháp là tích của hai thừa số trong bảng sau.

| Phương pháp | Chi phí mỗi bước | Số bước |
|---|---|---|
| Hạ gradient | $O(nd)$ | $O\bigl(\kappa\log\tfrac1{\varepsilon_{\rm tol}}\bigr)$ |
| Newton | $O(nd^2+d^3)$ | giai đoạn tắt dần cộng $O\bigl(\log\log\tfrac1{\varepsilon_{\rm tol}}\bigr)$ |

Newton giảm thừa số thứ hai nhưng tăng thừa số thứ nhất từ $nd$ lên $nd^2+d^3$. Cả hai thừa số thứ nhất đều chứa $n$, vì mỗi bước đọc toàn bộ dữ liệu.

**Trong học máy.** Đối tượng của Mệnh đề 05.35 là một bước của bộ tối ưu trên toàn bộ tập huấn luyện. Với hồi quy logistic trên vài trăm đặc trưng, các biến thể của Newton như TRON trong LIBLINEAR và bộ giải `newton-cg` của scikit-learn có lợi, vì $d^3$ nhỏ và $\kappa$ có thể lớn khi $\lambda$ nhỏ (Tình huống 05.3). Với mô hình có $d$ cỡ $10^5$ trở lên, như mô hình ngôn ngữ hay mạng nơ ron, Hessian dày không lưu được và bộ tối ưu dùng gradient. Trong mọi trường hợp, thừa số $n$ ở mỗi bước là chi phí của một lượt qua dữ liệu, đơn vị chi phí nhỏ nhất mà mọi phương pháp tất định của Mục 4 phải trả cho mỗi lần cập nhật.

Ba bài tập sau kiểm tra bước cập nhật và phép đếm chi phí của Mục 4.

::: exercise Bài tập 05.7
Cho $F_\lambda(w)=\log(1+e^{-w})+0{,}025\,w^2$ ($\lambda=0{,}05$, $L=0{,}3$), nghiệm $w_\lambda=2{,}1280$, và điểm đầu $w_0=1$.

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

3. Khoảng cách ban đầu $1{,}128$. Sau một bước: hạ gradient $2{,}1280-1{,}7298=0{,}398$, Newton $2{,}1280-1{,}8878=0{,}240$. Bước Newton dài hơn vì nó chia cho độ cong tại chỗ $0{,}2466$, nhỏ hơn $L=0{,}3$. Kiểm tra: hai bước Newton tiếp theo cho $2{,}1138$ và $2{,}12798$, với sai số giá trị $1{,}5\cdot10^{-5}$ và $2\cdot10^{-10}$, đúng kiểu hội tụ bậc hai.
:::

::: exercise Bài tập 05.8
Một bài toán hồi quy logistic có $n=10^4$ mẫu và $d=10^2$ đặc trưng.

1. Với $X$ dày, tính chi phí một bước hạ gradient, chi phí một bước Newton theo bậc, tỉ số $d+d^2/n$ và bộ nhớ của Hessian.
2. Nếu $X$ thưa với $5\cdot10^4$ phần tử khác $0$, chi phí một bước hạ gradient và chi phí lập Hessian thay đổi thế nào.
:::

::: hint
Với dữ liệu thưa, mỗi tích $Xv$ tốn bằng số phần tử khác $0$. Hessian là tổng các tích ngoài $S_{ii}x_ix_i^T$; một hàng có $k_i$ phần tử khác $0$ đóng góp $k_i^2$ phần tử.
:::

::: solution
1. Hạ gradient: $nd=10^6$ cho mỗi tích, $2\cdot10^6$ cho một bước. Newton: $nd^2+d^3=10^8+10^6\approx1{,}01\cdot10^8$. Tỉ số $100+1=101$. Hessian $8\cdot10^4$ byte, tức 80 kB, nhỏ.

2. Mỗi tích $Xv$ tốn $5\cdot10^4$, nên một bước hạ gradient tốn khoảng $10^5$, giảm $20$ lần. Trung bình mỗi hàng có $5$ phần tử khác $0$, nên lập Hessian tốn khoảng $\sum_ik_i^2\approx n\cdot25=2{,}5\cdot10^5$ nếu các $k_i$ đều nhau; Hessian $d\times d$ vẫn có thể dày và Cholesky vẫn tốn bậc $d^3=10^6$. Với $d$ nhỏ như ở đây, Newton vẫn rẻ.
:::

::: exercise Bài tập 05.9
Cho $\lambda=0{,}5$, $u=(1,2)$ và $g=(1,1)$; $H=\lambda I+uu^T$ là trường hợp $n=1$ của Mệnh đề 05.36.

1. Tính $p=-H^{-1}g$ theo (4.5).
2. Kiểm tra bằng cách nhân $H$ với $p$.
3. Đếm số phép nhân–cộng của cách tính ở câu 1 khi $u\in\mathbb R^d$, và so với giải hệ $d\times d$.
:::

::: hint
Với $n=1$, $(\lambda+u^Tu)^{-1}$ là phép chia một số.
:::

::: solution
1. $u^Tu=5$, $u^Tg=3$, nên $U(\lambda+U^TU)^{-1}U^Tg=u\cdot\tfrac3{5{,}5}=(0{,}5455;\ 1{,}0909)$. Do đó $p=-\tfrac1{0{,}5}\bigl[(1,1)-(0{,}5455;\ 1{,}0909)\bigr]=-2\cdot(0{,}4545;\ -0{,}0909)=(-0{,}9091;\ 0{,}1818)$.

2. $H=\begin{pmatrix}1{,}5&2\\2&4{,}5\end{pmatrix}$, và $Hp=(1{,}5\cdot(-0{,}9091)+2\cdot0{,}1818;\ 2\cdot(-0{,}9091)+4{,}5\cdot0{,}1818)=(-1{,}0;\ -1{,}0)=-g$.

3. Tính $u^Tu$ và $u^Tg$ tốn $2d$, nhân $u$ với một số và trừ khỏi $g$ tốn $2d$: tổng $O(d)$. Giải hệ $d\times d$ bằng Cholesky tốn bậc $d^3$. Đây là Mệnh đề 05.36 với $n=1$: $O(n^2d+n^3)=O(d)$.
:::

Như vậy, chúng ta đã đếm được hai thừa số của tổng chi phí. Số bước của hạ gradient tăng theo $\kappa$ (Định lý 05.30, Hệ quả 05.31), dù trên ví dụ, số bước thực theo sát số điều kiện cục bộ nhỏ hơn (Nhận xét 05.32). Số bước của Newton có một giai đoạn bậc hai không chứa $\kappa$ (Định lý 05.33). Chi phí một bước là $O(nd)$ và $O(nd^2+d^3)$ (Mệnh đề 05.35), giảm còn $O(n^2d+n^3)$ khi $d>n$ (Mệnh đề 05.36). Ngưỡng hòa vốn (4.8) cho thấy Newton đổi số bước lấy chi phí $d^2$, $d^3$, và kết luận chỉ đáng tin khi hai cận chênh nhau nhiều bậc.

Không phương pháp nào của mục bỏ được thừa số $n$ ở mỗi bước. Với một ngân sách tính toán cố định, số lần cập nhật làm được vì vậy giảm theo $1/n$. Đây là giới hạn thứ nhất của khung tất định mà vấn đề trung tâm đã nêu ở Mục 1.1. Trong Mục 5, chúng ta ghép giới hạn này với lý do thứ hai của Mục 2 và Mục 3 trên cùng số liệu, rồi nêu hai giới hạn của mô hình tuyến tính và phương pháp tất định mà Bài 06 nhận làm điểm xuất phát.

## 5. Giới hạn của tối ưu tất định

Trên ví dụ năm mẫu với $d=5$, chạy hạ gradient tới điểm cực tiểu chính xác của $F$ cho đa thức nội suy, có sai số xác thực $0{,}0487$. Chúng ta cần biết sai số xác thực của các điểm lặp trung gian, trước khi dãy tới gần điểm cực tiểu đó.

### 5.1 Dừng sớm

Ví dụ sau chạy hạ gradient trên mất mát bình phương không chính quy hóa và theo dõi cả hai sai số dọc quỹ đạo.

::: example Ví dụ 05.24 (Nghiệm chính xác và nghiệm dừng sớm)
**Dữ kiện.** Năm mẫu $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$; đặc trưng $(1,u,\ldots,u^4)$, $d=5$; $F(w)=\frac1{10}\lVert Xw-y\rVert^2$ không chính quy hóa; tập xác thực $u'=\pm\tfrac14,\pm\tfrac34$ với nhãn $u'$. Theo Ví dụ 05.8, $L=\lambda_{\max}(X^TX)/5=1{,}5715$ và $\kappa=553{,}7$. Hạ gradient bước $\frac1L$ từ $w_0=0$.

**Sai số xác thực dọc quỹ đạo.**

| $k$ | $0$ | $10$ | $50$ | $79$ | $200$ | $1000$ | $k\to\infty$ |
|---|---:|---:|---:|---:|---:|---:|---:|
| MSE huấn luyện | $0{,}5$ | $0{,}0322$ | $0{,}0187$ | $0{,}0147$ | $0{,}00845$ | $0{,}00047$ | $0$ |
| MSE xác thực | $0{,}3125$ | $0{,}0107$ | $0{,}00200$ | $0{,}00108$ | $0{,}00487$ | $0{,}0341$ | $0{,}0487$ |

**Đọc bảng.** MSE xác thực nhỏ nhất bằng $0{,}00108$, đạt tại $k=79$, rồi tăng dần về giới hạn $0{,}0487$ của đa thức nội suy. MSE huấn luyện giảm liên tục và xuống dưới $10^{-6}$ từ bước $2701$; tại đó MSE xác thực là $0{,}0480$.

**So sánh.** Dừng ở bước $79$ thay vì bước $2701$ tốn ít hơn khoảng $34$ lần số lượt qua dữ liệu, và cho sai số xác thực nhỏ hơn $0{,}0487/0{,}00108\approx45$ lần so với giới hạn.

**Kiểm tra lại.** Tại $k=0$, $w=0$ nên hai sai số bằng trung bình $y^2$ và trung bình $u'^2$: $0{,}5$ và $0{,}3125$, như dòng $d=1$ của Ví dụ 05.4. Ngưỡng $F\le10^{-6}$, tức MSE huấn luyện $\le2\cdot10^{-6}$, đạt sớm hơn, ở bước $2509$.
:::

![Hai trục logarit, k từ 1 đến 10⁴. MSE huấn luyện giảm liên tục, xuống dưới 10⁻⁶ từ bước 2701. MSE trên tập xác thực giảm tới 0,00108 tại k = 79 (vạch đứng) rồi tăng về giới hạn 0,0487 (đường ngang chấm).](img/lec-05/kl-early-stopping.svg)

Trên hình, đường huấn luyện đi xuống suốt quỹ đạo, còn đường xác thực có đáy tại vạch đứng $k=79$ rồi đi lên về đường ngang chấm. Hạ gradient không đạt điểm cực tiểu chính xác sau hữu hạn bước; $0{,}0487$ là giới hạn. Ví dụ dẫn tới một quy tắc chọn bước dừng theo sai số xác thực, được định nghĩa như sau.

::: definition Định nghĩa 05.38 (Dừng sớm)
Cho một thuật toán lặp sinh dãy $w_0,w_1,\ldots,w_K$ trên mục tiêu huấn luyện, và một tập xác thực. Dừng sớm (early stopping) là quy tắc trả về $w_{k^\star}$ với

$$
k^\star\in\arg\min_{0\le k\le K}\ \widehat R_{\rm xt}(w_k),
$$

trong đó $\widehat R_{\rm xt}$ là sai số trên tập xác thực. Trong thực hành, $K$ không cố định trước: thuật toán dừng khi sai số xác thực không giảm sau một số lần đánh giá cho trước.
:::

Dừng sớm biến số bước thành một siêu tham số, chọn trên tập xác thực như $d$ hay $\lambda$. Theo Định nghĩa 05.6, nó dùng tập xác thực, nên giá trị $\widehat R_{\rm xt}(w_{k^\star})=0{,}00108$ là số nhỏ nhất trên cả quỹ đạo và có xu hướng thấp hơn rủi ro theo Nhận xét 05.8. Báo cáo cuối cần một tập kiểm thử riêng; Tình huống 05.1 bổ sung tập đó. Goodfellow và cộng sự (2016, mục 7.8, Thuật toán 7.1) mô tả cùng quy tắc với tham số "kiên nhẫn" (patience) là số lần đánh giá không cải thiện trước khi dừng.

Để hiểu vì sao sai số xác thực có đáy, ta viết dãy hạ gradient trên mất mát bình phương theo các hướng riêng của Hessian.

::: proposition Mệnh đề 05.39 (Hạ gradient trên bình phương nhỏ nhất theo hướng riêng)
**Giả thiết.** $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$ với $\operatorname{rank}X=d$; $A=\frac1nX^TX=\sum_{j=1}^ds_jv_jv_j^T$ với trị riêng $0<s_1\le\cdots\le s_d=L$ và vector riêng trực chuẩn $v_j$; $w^*$ là nghiệm của (2.2). Hạ gradient bước $\frac1L$ từ $w_0=0$.

**Kết luận.** Với mọi $k\ge0$,

$$
w_k=\sum_{j=1}^d\Bigl[1-\Bigl(1-\frac{s_j}L\Bigr)^k\Bigr]\,(v_j^Tw^*)\,v_j .
\tag{5.1}
$$

**Điều kiện áp dụng.** Mất mát bình phương; điểm đầu $0$.

**Phạm vi.** Mệnh đề mô tả thành phần nào của nghiệm được khớp trước; nó không nói thành phần nào làm sai số xác thực tăng, điều phụ thuộc dữ liệu.
:::

::: proof Chứng minh Mệnh đề 05.39
**Bước 1 (gradient theo sai lệch).** Từ (2.2), $\frac1nX^Ty=Aw^*$, nên $\nabla F(w)=Aw-\frac1nX^Ty=A(w-w^*)$.

**Bước 2 (đệ quy của sai lệch).** Trừ $w^*$ hai vế của $w_{k+1}=w_k-\frac1LA(w_k-w^*)$:

$$
w_{k+1}-w^*=\Bigl(I-\frac1LA\Bigr)(w_k-w^*) .
$$

Lặp lại $k$ lần và dùng $w_0=0$, ta được

$$
\begin{aligned}
w_k-w^*&=\Bigl(I-\frac1LA\Bigr)^k(w_0-w^*)\\&=-\Bigl(I-\frac1LA\Bigr)^kw^* .
\end{aligned}
$$

**Bước 3 (theo hướng riêng).** $I-\frac1LA$ có cùng vector riêng $v_j$ với trị riêng $1-s_j/L$, nên thành phần của $w_k-w^*$ theo $v_j$ là $-(1-s_j/L)^k\,v_j^Tw^*$. Cộng với thành phần $v_j^Tw^*$ của $w^*$ cho (5.1). $\square$
:::

Hệ số $1-(1-s_j/L)^k$ trong (5.1) là phần của thành phần thứ $j$ đã được khớp sau $k$ bước. Nó gần $1$ sau vài bước với hướng có độ cong lớn, và tăng rất chậm với hướng có độ cong nhỏ. Trên ví dụ năm mẫu, $s_j=0{,}00284;\ 0{,}0255;\ 0{,}252;\ 0{,}881;\ 1{,}571$; tại $k=79$, hệ số bằng $0{,}133;\ 0{,}726;\ 1{,}000;\ 1{,}000;\ 1{,}000$, và tại $k=1000$, hệ số của hướng phẳng nhất mới đạt $0{,}836$.

Như vậy, tại bước $79$, ba hướng cong nhất đã được khớp gần trọn, còn hai hướng phẳng nhất mới được khớp $13\,\%$ và $73\,\%$. Trên ví dụ này, phần nghiệm theo hướng phẳng nhất ($s_1\approx0{,}0028$) là phần làm sai số xác thực tăng. Giữ trọn ba hướng cong và hướng $s_2$, bỏ hướng $s_1$, cho MSE xác thực $0{,}0013$; thêm trọn hướng $s_1$ cho $0{,}0487$. Hướng $s_2\approx0{,}0255$ thì cần cho dự đoán: bỏ cả hai hướng phẳng, MSE xác thực là $0{,}0163$. Hướng $s_1$ cũng là hướng mà nhiễu nhãn của Ví dụ 05.7 dịch nghiệm đi xa: hình chiếu của $\delta w=0{,}01\cdot(1,0,-5,0,4)$ lên $v_1$ có độ lớn $0{,}0646$, trong khi $\lVert\delta w\rVert=0{,}0648$. Số điều kiện $\kappa=553{,}7$ vì vậy vừa làm hạ gradient chậm (Mục 4.3) vừa tạo khoảng cách lớn giữa lúc khớp các hướng cong và lúc khớp hướng phẳng nhất.

Nghiệm có chính quy hóa của (2.6) có dạng tương tự. Từ $(A+\lambda I)w_\lambda=Aw^*$, ta có $w_\lambda=\sum_j\frac{s_j}{s_j+\lambda}(v_j^Tw^*)v_j$: hệ số $\frac{s_j}{s_j+\lambda}$ cũng gần $1$ với hướng cong và gần $0$ với hướng có $s_j\ll\lambda$. Dừng sớm vì vậy có tác dụng gần với chính quy hóa bậc hai; phép so sánh định lượng giữa hai họ hệ số được trình bày ở Bài 06.

**Trong học máy.** Goodfellow và cộng sự (2016, mục 7.8, tr. 247) xếp dừng sớm vào các dạng chính quy hóa được dùng nhiều nhất khi huấn luyện mạng nơ ron, vì nó không đòi sửa mục tiêu và tiết kiệm chính các bước bị bỏ. Ví dụ 05.24 cho thấy hai lý do của vấn đề trung tâm gặp nhau trên cùng số liệu: mỗi bước tốn một lượt qua dữ liệu (Mục 4), và dừng trước điểm cực tiểu chính xác cho sai số xác thực nhỏ hơn (Mục 2). Đích của huấn luyện vì vậy là một $w$ có $R(w)$ nhỏ với chi phí chấp nhận được; điểm cực tiểu chính xác của $F$ chỉ là một ứng viên cho đích đó.

### 5.2 Số liệu trên tập RCV1

Ví dụ năm mẫu chỉ cho kết luận định tính. Bottou và Bousquet (2011, mục 13.4.1) báo cáo một thí nghiệm trên dữ liệu thật: phân loại văn bản của tập RCV1, với $781\,265$ văn bản huấn luyện, $23\,149$ văn bản kiểm thử và $47\,152$ đặc trưng TF-IDF. Mô hình là hồi quy logistic có chính quy hóa, $\lambda=10^{-5}$.

::: example Ví dụ 05.25 (Hồi quy logistic trên RCV1)
**Dữ kiện.** Bảng 13.3 của Bottou và Bousquet (2011, tr. 363), các dòng mất mát logistic. TRON là phương pháp Newton miền tin cậy (trust region Newton), $\rho$ là độ chính xác tối ưu yêu cầu. SGD là hạ gradient ngẫu nhiên của Mục 3.4, ở đây với mỗi bước dùng gradient của một mẫu chọn ngẫu nhiên, tức nhóm nhỏ có kích thước $b=1$.

| Phương pháp | Thời gian huấn luyện | Giá trị mục tiêu | Lỗi kiểm thử |
|---|---:|---:|---:|
| TRON, $\rho=10^{-2}$ | 30 s | $0{,}18907$ | 5,68 % |
| TRON, $\rho=10^{-3}$ | 44 s | $0{,}18890$ | 5,70 % |
| SGD | 2,3 s | $0{,}18893$ | 5,66 % |

**Đọc bảng.** SGD có chi phí mỗi bước không phụ thuộc $n$ và đạt cùng mức lỗi kiểm thử với thời gian nhỏ hơn một bậc. Giá trị mục tiêu chênh nhau không quá $1{,}7\cdot10^{-4}$.

**Kiểm tra lại.** Sai số chuẩn của một tỉ lệ lỗi $p\approx0{,}057$ trên $n_{\rm kt}=23\,149$ mẫu kiểm thử là $\sqrt{p(1-p)/n_{\rm kt}}=\sqrt{0{,}057\cdot0{,}943/23\,149}\approx0{,}0015$, tức khoảng $0{,}15$ điểm phần trăm. Ba lỗi kiểm thử chênh nhau $0{,}04$ điểm phần trăm, nhỏ hơn sai số chuẩn.
:::

Bảng cho hai quan sát. Thứ nhất, nó minh họa điều phép đếm của Mục 4 dự báo: khi $n$ lớn, chi phí theo $n$ của mỗi bước chi phối thời gian. Lý do phải bỏ gradient đầy đủ nằm ở phép đếm đó, không ở bảng; TRON vẫn chạy được trên tập này, và theo Bottou và Bousquet, nó đạt điểm cực tiểu với mười chữ số đúng trong chưa tới một phút. Thứ hai, giảm $\rho$ từ $10^{-2}$ xuống $10^{-3}$ không làm lỗi kiểm thử khác nhau một cách phân biệt được: độ chính xác tối ưu vượt quá một mức nào đó không còn cải thiện $R$.

TRON giải hệ Newton bằng gradient liên hợp và không lập Hessian dày (Nhận xét 05.37); nó không đồng nhất với Newton thuần mà chúng ta đã đếm ở Mục 4. Số liệu thuộc phần cứng và phần mềm khoảng năm 2008–2011, chỉ dùng để so bậc. Định nghĩa, tính không chệch và tốc độ hội tụ của SGD thuộc Bài 06.

### 5.3 Hai giới hạn của mô hình tuyến tính và phương pháp tất định

Hai lý do của vấn đề trung tâm dẫn tới hai giới hạn có nguồn gốc khác nhau. Giới hạn thứ nhất thuộc phương pháp, giới hạn thứ hai thuộc mô hình.

**Giới hạn (i): chi phí.** Mọi phương pháp của chương trả chi phí của toàn bộ $n$ mẫu ở mỗi bước (Mệnh đề 05.35). Khi $n$ lớn và ngân sách tính toán cố định, điều này buộc thay gradient đầy đủ bằng gradient trên một nhóm nhỏ mẫu, tức hạ gradient ngẫu nhiên. Theo Định lý 05c.53, gradient trên nhóm nhỏ $b$ mẫu rút đều có hoàn lại là ước lượng không chệch của $\nabla F$, với chi phí $O(bd)$ không phụ thuộc $n$.

**Giới hạn (ii): biểu diễn.** Với một bộ đặc trưng cố định, dự đoán tuyến tính theo đặc trưng không biểu diễn được một số quan hệ. Ví dụ kinh điển là bài toán XOR (Goodfellow và cộng sự 2016, mục 6.1): bốn điểm $u\in\{0,1\}^2$, nhãn $+1$ tại $(0,1)$ và $(1,0)$, nhãn $-1$ tại $(0,0)$ và $(1,1)$.

::: proposition Mệnh đề 05.40 (XOR không tách được bằng điểm số affine)
**Giả thiết.** Bốn điểm XOR như trên; đặc trưng $(1,u_1,u_2)$, tức điểm số affine $g(u)=w_0+w_1u_1+w_2u_2$.

**Kết luận.**

1. Không $w\in\mathbb R^3$ nào cho $g$ đúng dấu tại cả bốn điểm.
2. Với đặc trưng $(1,u_1,u_2,u_1u_2)$, dữ liệu tách được, chẳng hạn bởi $\bar w=(-\tfrac12,1,1,-2)$ với mọi biên bằng $\tfrac12$.

**Điều kiện áp dụng.** Mọi điểm số affine theo $(u_1,u_2)$.

**Phạm vi.** Kết luận 2 dùng một đặc trưng chọn thủ công cho đúng bài toán này.
:::

::: proof Chứng minh Mệnh đề 05.40
**Bước 1 (một đẳng thức của hàm affine).** Với mọi $w$,

$$
\begin{aligned}
g(1,0)+g(0,1)&=(w_0+w_1)+(w_0+w_2)\\&=2w_0+w_1+w_2\\&=w_0+(w_0+w_1+w_2)\\&=g(0,0)+g(1,1).
\end{aligned}
$$

**Bước 2 (mâu thuẫn).** Phân loại đúng đòi $g(1,0)>0$ và $g(0,1)>0$, nên vế trái dương; đồng thời $g(0,0)<0$ và $g(1,1)<0$, nên vế phải âm. Hai vế bằng nhau theo Bước 1, mâu thuẫn. Đó là kết luận 1.

**Bước 3 (thêm tích).** Với $\bar w=(-\tfrac12,1,1,-2)$, điểm số $-\tfrac12+u_1+u_2-2u_1u_2$ bằng $-\tfrac12$ tại $(0,0)$, $\tfrac12$ tại $(1,0)$ và $(0,1)$, và $-\tfrac12+1+1-2=-\tfrac12$ tại $(1,1)$. Nhân với nhãn, mọi biên bằng $\tfrac12$. Đó là kết luận 2. $\square$
:::

Ba điểm $-,+,-$ của Ví dụ 05.10 là dạng một chiều của XOR: điểm số affine theo $u$ không đổi dấu đủ số lần, và thêm $u^2$ thì tách được. Cả hai ví dụ cho cùng một cách sửa: thêm đặc trưng thủ công. Mệnh đề sau đếm chi phí của cách sửa đó khi đầu vào có nhiều chiều.

::: proposition Mệnh đề 05.41 (Số đơn thức của $d_0$ biến)
**Giả thiết.** $u\in\mathbb R^{d_0}$; đặc trưng là mọi đơn thức $u_1^{\alpha_1}\cdots u_{d_0}^{\alpha_{d_0}}$ với $\alpha_i\in\{0,1,2,\ldots\}$ và $\alpha_1+\cdots+\alpha_{d_0}\le q$, kể cả đơn thức hằng $1$.

**Kết luận.** Số đặc trưng là

$$
d=\binom{d_0+q}{q}.
\tag{5.2}
$$

**Điều kiện áp dụng.** Mọi $d_0,q\ge1$.

**Phạm vi.** Với $q$ cố định, $d$ tăng như $d_0^q/q!$.
:::

::: proof Chứng minh Mệnh đề 05.41
**Bước 1 (đổi sang nghiệm nguyên).** Mỗi đơn thức ứng với đúng một bộ $(\alpha_1,\ldots,\alpha_{d_0})$ nguyên không âm có tổng không quá $q$. Thêm biến bù $\alpha_0=q-\sum_i\alpha_i\ge0$, mỗi bộ đó ứng với đúng một nghiệm nguyên không âm của $\alpha_0+\alpha_1+\cdots+\alpha_{d_0}=q$.

**Bước 2 (đếm).** Số nghiệm nguyên không âm của phương trình $d_0+1$ ẩn có tổng $q$ bằng số cách xếp $q$ viên bi và $d_0$ vách ngăn thành một hàng, tức $\binom{q+d_0}{d_0}=\binom{d_0+q}{q}$. $\square$
:::

Với $d_0=100$ biến đầu vào, (5.2) cho $\binom{102}2=5151$ đặc trưng khi $q=2$ và $\binom{103}3=176\,851$ khi $q=3$. Mở rộng đặc trưng thủ công vì vậy làm $d$ tăng nhanh, và kéo theo ba hệ quả của chương: quá khớp và số điều kiện không giảm (Mục 2), chế độ tách được làm mất điểm cực tiểu (Mục 3), và chi phí $d^2$, $d^3$ của Newton (Mục 4). Bài 06 thay đặc trưng cố định bằng đặc trưng học được trong mạng hai tầng, mở đầu bằng chính bài toán XOR; ký hiệu $q$ cho bậc được chọn để không trùng với số tham số $p$ của Bài 06.

**Trong học máy.** Mệnh đề 05.40 và 05.41 nói về đặc trưng thủ công, như đặc trưng đa thức hay tích của các biến đầu vào. Giả thiết của Mục 2–4, đặc trưng cố định và mục tiêu lồi theo $w$, được giữ trọn với các đặc trưng này, nên mọi định lý của chương vẫn áp dụng; chi phí là $d$ tăng theo (5.2). Mạng nơ ron ở Bài 06 học đặc trưng cùng với $w$: số tham số không còn tăng theo $\binom{d_0+q}q$, nhưng mục tiêu không còn lồi, nên các định lý về điểm cực tiểu toàn cục của Mục 3–4 không còn áp dụng.

### 5.4 Điều không còn giữ được và điều còn giữ được

Hai giới hạn trên đẩy bài toán ra khỏi khung của chương theo hai cách, và bảng dưới đây giữ nhãn (i), (ii) cho hai cách đó. Nhãn (i) là chi phí: gradient đầy đủ được thay bằng gradient nhóm nhỏ. Nhãn (ii) là mục tiêu không lồi do đặc trưng học được: để vượt giới hạn biểu diễn, mạng hai tầng của Bài 06 học đặc trưng cùng với tham số, tham số đi vào mô hình một cách phi tuyến, và mất mát lồi không còn cho mục tiêu lồi. Nhận xét sau ghi rõ bảo đảm nào mất khi nào, và bảo đảm nào thay thế. Ký hiệu: $K$ là số bước, $\eta$ là bước hằng, $\Delta_0=F(w_0)-\inf F$, và $\tau^2$ là chặn phương sai của nhiễu gradient ngẫu nhiên, mà Bài 05b viết là $\sigma^2$.

::: remark Nhận xét 05.42 (Bảo đảm còn lại khi rời khung tất định)
| Mất (khi nào) | Còn giữ được |
|---|---|
| Đích là nghiệm chính xác (ngay trong chương này) | Đích là $R$ nhỏ; dừng sớm và chính quy hóa là một phần của phương pháp (Mục 2, Mục 5.1) |
| Hội tụ tuyến tính tất định của Định lý 05.30 (khi (i) hoặc (ii)) | Gradient đầy đủ, khi còn tính được: $F$ giảm ở mỗi bước với bước không quá $\frac1L$ (Bổ đề 05b.6). SGD trên $F_\lambda$ lồi mạnh: bước hằng giữ $\mathbb E\lVert w_k-w^*\rVert^2$ ở mức cỡ $\eta\tau^2/\mu$ (Định lý 05b.36); bước giảm dần cho hội tụ tới điểm cực tiểu với tốc độ $O(1/k)$ (Định lý 05b.39) |
| Cực tiểu toàn cục (khi (ii)) | Điểm dừng xấp xỉ: hạ gradient có $\min_{k<K}\lVert\nabla F(w_k)\rVert^2\le\frac{2L\Delta_0}K$ (Định lý 05b.41); SGD bước hằng có $\frac1K\sum_{k<K}\mathbb E\lVert\nabla F(w_k)\rVert^2\le\frac{2\Delta_0}{\eta K}+L\eta\tau^2$ (Định lý 05b.43) |
| Chi phí $O(nd)$ mỗi bước (khi (i)) | Gradient nhóm nhỏ không chệch, chi phí không phụ thuộc $n$ (Định lý 05c.53) |

Cột phải chỉ nêu tên và kết luận; giả thiết đầy đủ và chứng minh thuộc Bài 05b, Bài 05c và Bài 06. Ba điểm sau hay bị đọc sai.

1. Định lý 05b.36 với bước hằng chỉ đưa SGD tới một lân cận của điểm cực tiểu, trong đó kỳ vọng bình phương khoảng cách $\mathbb E\lVert w_k-w^*\rVert^2$ cỡ $\eta\tau^2/\mu$, tức bán kính cỡ $\sqrt{\eta\tau^2/\mu}$; nó không cho hội tụ tới điểm cực tiểu; chỉ bước giảm dần của Định lý 05b.39 cho hội tụ tới điểm cực tiểu.
2. Định lý 05b.41 chỉ chặn chuẩn gradient nhỏ nhất trong $K$ bước, không chặn điểm cuối. Định lý 05b.43 có số hạng $L\eta\tau^2$ không giảm theo $K$, tức một mức nhiễu nền, nên trung bình kỳ vọng bình phương chuẩn gradient không tiến về $0$ với bước hằng.
3. SGD không bảo đảm $F$ giảm theo kỳ vọng ở mỗi bước. Bài 06 cho một ví dụ bốn điểm trong đó một bước xuất phát từ chính điểm cực tiểu cho $\mathbb E\,F(\theta_1)=\tfrac{69}{128}>\tfrac12=F(\theta_0)$, với tham số $\theta$ của Bài 06 là $w$ ở đây. Điều còn lại là bất đẳng thức một bước có thêm số hạng nhiễu tỉ lệ với $\eta^2$, đủ để suy ra tốc độ theo kỳ vọng khi bước đủ nhỏ hoặc giảm dần.
:::

Hàng đầu của bảng mất ngay trong Bài 05, vì $F$ chỉ thay cho $R$. Hàng thứ hai mất khi gradient đầy đủ được thay bằng gradient nhóm nhỏ, dù mục tiêu vẫn là $F_\lambda$ lồi mạnh, và cũng mất khi mục tiêu không còn lồi mạnh. Hàng thứ ba chỉ mất khi mục tiêu không lồi: với $F_\lambda$ lồi mạnh, Định lý 05b.39 vẫn cho hội tụ theo kỳ vọng tới điểm cực tiểu toàn cục. Hàng cuối là chi phí, không phải bảo đảm.

Ba bài tập sau kiểm tra giới hạn biểu diễn và dừng sớm của Mục 5.

::: exercise Bài tập 05.10
Ba bit $u\in\{0,1\}^3$ có nhãn $+1$ khi số bit bằng $1$ là lẻ và $-1$ khi số đó chẵn (bài toán chẵn lẻ ba bit). Viết $s=u_1+u_2+u_3$.

1. Chứng minh không điểm số affine $g(u)=w_0+w_1u_1+w_2u_2+w_3u_3$ nào đúng dấu tại cả tám điểm.
2. Chứng minh thêm riêng đặc trưng $u_1u_2u_3$ vẫn chưa đủ để tách dữ liệu.
3. Với đặc trưng gồm $1$, ba bit, ba tích đôi một và $u_1u_2u_3$, cho một $\bar w$ tách dữ liệu và tính các biên.
:::

::: hint
Ở câu 1, so tổng của $g$ trên bốn điểm có số bit lẻ với tổng trên bốn điểm có số bit chẵn, như Bước 1 của chứng minh Mệnh đề 05.40. Ở câu 2, đặc trưng $u_1u_2u_3$ bằng $0$ tại mọi điểm có $s\le2$; cộng các bất đẳng thức tại ba điểm có $s=1$ và tại ba điểm có $s=2$. Ở câu 3, khai triển tích $\prod_i(1-2u_i)$.
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
\bar w=\bigl(-\tfrac12;\ 1,1,1;\ -2,-2,-2;\ 4\bigr)
$$

theo thứ tự đặc trưng $1$; $u_1,u_2,u_3$; $u_1u_2,u_1u_3,u_2u_3$; $u_1u_2u_3$. Điểm số bằng $-\tfrac12$ khi $s$ chẵn và $\tfrac12$ khi $s$ lẻ, nên mọi biên bằng $\tfrac12$. Kiểm tra tại $111$: $-\tfrac12+3-6+4=\tfrac12$. Với đầu vào nhị phân, $u_i^2=u_i$, nên tám đặc trưng này là mọi đơn thức phân biệt.

Đơn thức bậc ba là cần thiết. Nếu một bộ tách chỉ dùng đơn thức bậc không quá $2$, lấy trung bình điểm số của nó qua sáu hoán vị của ba bit; nhãn không đổi khi hoán vị bit, nên trung bình vẫn tách dữ liệu, và có dạng $a+bs+c\,s(s-1)/2$. Đa thức bậc hai theo $s$ này đổi dấu nhiều nhất hai lần, trong khi nhãn tại $s=0,1,2,3$ đổi dấu ba lần, mâu thuẫn. Theo câu 2, các tích đôi một cũng cần thiết.
:::

::: exercise Bài tập 05.11
Đầu vào có $d_0=10$ biến.

1. Tính số đặc trưng đa thức bậc không quá $q$ theo Mệnh đề 05.41 với $q=2$ và $q=3$.
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

::: exercise Bài tập 05.12
Cho $F(w)=\tfrac12(w-w^*)^TA(w-w^*)$ với $A=\operatorname{diag}(1;\ 0{,}01)$ và $w^*=(1,1)$; hạ gradient bước $\frac1L=1$ từ $w_0=0$.

1. Dùng (5.1) để viết $w_k$, và tính $w_{10}$, $w_{100}$.
2. Tìm bước nhỏ nhất $k$ để thành phần thứ hai của $w_k$ đạt ít nhất $0{,}5$.
3. Tính nghiệm $w_\lambda$ của $\min F(w)+\frac\lambda2\lVert w\rVert^2$ với $\lambda=0{,}01$, và so với câu 2.
:::

::: hint
Với $A$ chéo, các hướng riêng là hai trục tọa độ. Theo quy ước $s_1\le s_2$ của Mệnh đề 05.39, $s_1=0{,}01$ (trục thứ hai, hướng phẳng) và $s_2=1$ (trục thứ nhất, hướng cong). Ở câu 3, dùng $(A+\lambda I)w_\lambda=Aw^*$.
:::

::: solution
1. $w_k=\bigl(1-0^k,\ 1-0{,}99^k\bigr)$, tức $w_k=(1,\ 1-0{,}99^k)$ với $k\ge1$. Do $0{,}99^{10}=0{,}9044$ và $0{,}99^{100}=0{,}3660$, ta có $w_{10}=(1;\ 0{,}0956)$ và $w_{100}=(1;\ 0{,}634)$.

2. $1-0{,}99^k\ge0{,}5$ khi $k\ge\log0{,}5/\log0{,}99=68{,}97$, nên $k=69$.

3. $w_\lambda=\bigl(\tfrac1{1{,}01},\ \tfrac{0{,}01}{0{,}02}\bigr)=(0{,}990;\ 0{,}5)$. Dừng ở bước $69$ cho $(1;\ 0{,}50)$, gần $w_\lambda$: cả hai cách khớp trọn hướng cong và khớp một nửa hướng phẳng. Kiểm tra: $(A+\lambda I)w_\lambda=(1{,}01\cdot0{,}990;\ 0{,}02\cdot0{,}5)=(1;\ 0{,}01)=Aw^*$.
:::

Như vậy, chúng ta đã ghép hai lý do của vấn đề trung tâm. Dừng sớm (Định nghĩa 05.38) cho sai số xác thực nhỏ hơn điểm cực tiểu chính xác, và Mệnh đề 05.39 giải thích điều đó bằng thứ tự khớp các hướng riêng; số liệu RCV1 (Ví dụ 05.25) cho thấy trên dữ liệu thật, phương pháp có chi phí mỗi bước không phụ thuộc $n$ đạt cùng lỗi kiểm thử với thời gian nhỏ hơn một bậc. Hai giới hạn còn lại là chi phí theo $n$ của mỗi bước, và giới hạn biểu diễn của đặc trưng cố định (Mệnh đề 05.40, 05.41). Nhận xét 05.42 ghi những bảo đảm còn lại khi rời khung tất định; các định lý tương ứng thuộc Bài 05b, còn hạ gradient ngẫu nhiên theo nhóm nhỏ và mạng hai tầng thuộc Bài 06.

## Tình huống áp dụng và ứng dụng

Ba tình huống dưới đây dùng công cụ của chương trên ba bài toán trọn vẹn. Tình huống 05.1 đi hết quy trình chọn mô hình và báo cáo sai số trên ví dụ năm mẫu. Tình huống 05.2 xét một trường hợp giả thiết tồn tại điểm cực tiểu bị vi phạm và hậu quả quan sát được. Tình huống 05.3 chọn phương pháp tính cho một bài toán có kích thước giả định.

::: application Tình huống 05.1 (Chọn mô hình và báo cáo sai số trên ví dụ năm mẫu)
**Bài toán và dữ liệu.** Một kỹ sư cần một mô hình hồi quy cho năm mẫu $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=(-0{,}9;\ -0{,}7;\ 0{,}2;\ 0{,}4;\ 1{,}0)$, và một con số báo cáo sai số trên dữ liệu mới. Ngoài tập xác thực bốn điểm $u'=\pm\tfrac14,\pm\tfrac34$, kỹ sư giữ riêng một tập kiểm thử tám điểm $u''=\pm\tfrac18,\pm\tfrac38,\pm\tfrac58,\pm\tfrac78$, cùng quy ước nhãn bằng $u''$ không nhiễu. Cả hai tập được chọn trước khi huấn luyện.

**Mô hình hóa.** Danh sách ứng viên gồm năm mô hình bình phương nhỏ nhất với $d=1,\ldots,5$ (Ví dụ 05.4), hai mô hình có chính quy hóa với $d=5$ và $\lambda\in\{0{,}1;\ 0{,}01\}$ (Ví dụ 05.9), một mô hình với $d=8$ và $\lambda=0{,}01$, và nghiệm dừng sớm tại bước $79$ với $d=5$ (Ví dụ 05.24).

**Xác minh giả thiết.** Mọi tham số được tính từ năm mẫu huấn luyện và không dùng tập kiểm thử, nên giả thiết của Mệnh đề 05.7 thỏa cho tập kiểm thử với mọi mô hình. Với tập xác thực, giả thiết chỉ thỏa cho các mô hình có tham số cố định trước. Riêng bước dừng $79$ đã được chọn trên tập xác thực (Ví dụ 05.24), nên giá trị xác thực $0{,}00108$ của nó có xu hướng thấp (Nhận xét 05.8). Nhãn không nhiễu, nên theo Nhận xét 05.9, các MSE ước lượng $2R(w)-s^2$; thứ tự giữa các mô hình không đổi.

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

Cột xác thực chọn $d=2$. Chỉ sau khi chọn, kỹ sư đọc một ô của cột kiểm thử: MSE kiểm thử của $d=2$ bằng $0{,}000131$, là con số được báo cáo. Các ô còn lại của cột kiểm thử ghi ở đây chỉ để đối chiếu; trong quy trình thật, chúng không được tính.

**Diễn giải.** Với $d=2$, sai số tại mọi điểm là $-0{,}02u$, nên MSE kiểm thử là $0{,}0004$ nhân trung bình của $u''^2$, tức $0{,}0004\cdot0{,}328=0{,}000131$. Mô hình đúng dạng với quan hệ thật có sai số nhỏ hơn mọi cách sửa mô hình quá lớn. Với $d=5$, hai cách sửa là chính quy hóa $\lambda=0{,}01$ và dừng sớm giảm sai số xác thực lần lượt khoảng $19$ và $45$ lần so với đa thức nội suy.

**Giới hạn.** Hai tập nhỏ, có vị trí chọn trước và nhãn không nhiễu, nên các con số chỉ minh họa định tính. Nếu kỹ sư chọn mô hình theo cột kiểm thử, con số báo cáo mất tính không chệch theo Nhận xét 05.8.

**Dẫn ngược lý thuyết.** Định nghĩa 05.5, 05.6 (rủi ro, hai tập); Mệnh đề 05.7 và Nhận xét 05.8 (bước báo cáo ứng với giả thiết độc lập); Nhận xét 05.9 (nhãn không nhiễu); Mệnh đề 05.17 và Định nghĩa 05.38 (hai cách sửa mô hình lớn).
:::

Tình huống thứ hai cho thấy điều xảy ra khi giả thiết tồn tại điểm cực tiểu bị vi phạm.

::: application Tình huống 05.2 (Hồi quy logistic không chính quy hóa trên dữ liệu tách được)
**Bài toán và dữ liệu.** Ba điểm $u=(-1,0,1)$, $y=(-1,+1,-1)$, đặc trưng $(1,u,u^2)$. Một người huấn luyện hồi quy logistic không chính quy hóa bằng hạ gradient và chờ thuật toán hội tụ.

**Mô hình hóa.** $F$ là (3.1) với $n=3$; $L=\lambda_{\max}(X^TX)/12=4{,}5616/12=0{,}3801$; hạ gradient bước $\frac1L=2{,}631$ từ $w_0=0$.

**Giả thiết bị vi phạm.** $\operatorname{rank}X=3=n$, nên dữ liệu tách được (Mệnh đề 05.21) và $F$ không có điểm cực tiểu (Định lý 05.22). Giả thiết "có điểm cực tiểu" của các định lý hội tụ theo khoảng cách không thỏa.

**Hậu quả quan sát được.** Chạy thuật toán:

| $k$ | $10$ | $10^2$ | $10^3$ | $10^4$ | $10^5$ |
|---|---:|---:|---:|---:|---:|
| $\lVert w_k\rVert$ | $3{,}24$ | $8{,}41$ | $13{,}66$ | $18{,}83$ | $23{,}98$ |
| $F(w_k)$ | $0{,}183$ | $0{,}0199$ | $0{,}00192$ | $1{,}90\cdot10^{-4}$ | $1{,}90\cdot10^{-5}$ |

Đúng như Hệ quả 05.23, $F(w_k)\to0$ và $\lVert w_k\rVert$ tăng không bị chặn, ở đây khoảng $5{,}2$ đơn vị cho mỗi lần $k$ tăng mười lần, tức theo $\log k$. Tại $k=10^5$, các biên nằm giữa $10{,}3$ và $11{,}4$, nên xác suất dự đoán đúng nhãn vượt $0{,}9999$ tại cả ba điểm. Gradient cũng tiến về $0$, nên một tiêu chí dừng theo chuẩn gradient sẽ dừng ở một $w_k$ có chuẩn tùy theo ngưỡng.

**Diễn giải.** Kết quả của huấn luyện phụ thuộc vào lúc dừng nhiều hơn vào dữ liệu, và các xác suất dự đoán gần $0$ hoặc $1$ không phản ánh độ tin cậy nào có được từ ba mẫu. Hướng $w_k/\lVert w_k\rVert$ tiến chậm về $(0{,}447;\ 0;\ -0{,}894)$, hướng của $\bar w=(1,0,-2)$; Soudry và cộng sự (2018) chứng minh hiện tượng này cho dữ liệu tách được tổng quát, với hướng giới hạn là nghiệm của bài toán biên cực đại.

**Cách sửa.** Hạng phạt $\lambda>0$ cho nghiệm duy nhất với chuẩn bị chặn (Định lý 05.26); với $\lambda=0{,}01$, $w_\lambda=(1{,}557;\ 0;\ -4{,}245)$ và xác suất dự đoán tại $u=0$ là $0{,}826$ (Ví dụ 05.16). Dừng sớm theo tập xác thực là cách sửa thứ hai.

**Dẫn ngược lý thuyết.** Mệnh đề 05.21 (tách được từ hạng), Định lý 05.22 và Hệ quả 05.23 (bước "hậu quả"), Định lý 05.26 và Mệnh đề 05.28 (bước "cách sửa").
:::

Tình huống thứ ba dùng các phép đếm của Mục 4 để chọn phương pháp tính.

::: application Tình huống 05.3 (Chọn phương pháp tính cho hồi quy logistic có chính quy hóa)
**Bài toán và dữ liệu.** Xét một hệ thống chấm điểm tín dụng giả định, với kích thước chọn để minh họa phép đếm, không lấy từ một tập dữ liệu thật. Hệ thống huấn luyện hồi quy logistic trên $n=10^6$ hồ sơ với $d=100$ đặc trưng dày, đã chuẩn hóa để phần đặc trưng của mỗi $x_i$ có chuẩn không quá $1$. Hệ số chính quy hóa chọn trên tập xác thực là $\lambda=10^{-4}$. Yêu cầu độ chính xác tối ưu $e_0/\varepsilon_{\rm tol}=10^8$.

**Mô hình hóa.** Mục tiêu $F_\lambda$ của Định lý 05.26; hai ứng viên là hạ gradient (Thuật toán 05.1) và Newton (Thuật toán 05.2).

**Xác minh giả thiết.** $F_\lambda$ lồi mạnh với $\mu=\lambda$ (Định lý 05.26). Với tọa độ hằng, $\lVert x_i\rVert^2\le2$, nên Mệnh đề 05.28 cho $\kappa\le1+\frac2{4\cdot10^{-4}}=5001$. Giả thiết của Định lý 05.33 thỏa trên mọi tập mức, vì Hessian bị chặn hai phía và liên tục Lipschitz; số bước Newton được giả định $N_{\rm N}=10$, theo Ví dụ 05.19 (từ $4$ đến $7$ bước).

**Áp dụng.**

- Hạ gradient: Hệ quả 05.31 cho tối đa $5001\cdot18{,}42\approx9{,}2\cdot10^4$ bước, mỗi bước $nd=10^8$, nên $C_{\rm HG}\approx9{,}2\cdot10^{12}$.
- Newton: mỗi bước $nd^2+d^3=10^{10}+10^6$, nên $C_{\rm N}\approx1{,}0\cdot10^{11}$. Hessian chiếm $8\cdot10^4$ byte, tức 80 kB.
- Tỉ số hai cận khoảng $92$; tính cả hằng số của hai thuật toán, khoảng $354$. Ngay cả khi cận của hạ gradient bi quan $20$ lần như ở Ví dụ 05.19, Newton vẫn rẻ hơn khoảng $4{,}6$ lần.

**Diễn giải.** Với $d$ nhỏ và $\kappa$ lớn, Newton có lợi rõ rệt: chi phí $d^2$, $d^3$ nhỏ và số bước không tăng theo $\kappa$ ở giai đoạn bậc hai. Riêng ma trận dữ liệu dày chiếm $8nd=8\cdot10^8$ byte, tức 800 MB, lớn hơn Hessian $10^4$ lần.

**Giới hạn.** Kết luận dựa trên so sánh hai cận ở hai bậc khác nhau, nên không đổi chiều khi tính hằng số (Ví dụ 05.22). Nếu $d$ tăng lên $10^4$, một bước Newton tốn khoảng $10^{14}$ và Hessian cần 800 MB; hai cận khi đó cùng bậc, $9{,}2\cdot10^{14}$ và $1{,}0\cdot10^{15}$, và phép đếm không còn phân định. Nếu $n$ tăng lên $10^8$, mọi bước của cả hai phương pháp tăng chi phí $100$ lần, và giới hạn (i) của Mục 5.3 trở thành ràng buộc chính.

**Dẫn ngược lý thuyết.** Định lý 05.26 và Mệnh đề 05.28 (hằng số, ứng với bước xác minh), Hệ quả 05.31 và Định lý 05.33 (số bước), Mệnh đề 05.35 (chi phí một bước), (4.6)–(4.8) (ngưỡng hòa vốn).
:::

**Ứng dụng.**

- **Chọn siêu tham số.** Bậc đa thức, hệ số chính quy hóa và số bước huấn luyện đều được chọn trên tập xác thực và báo cáo trên tập kiểm thử (Định nghĩa 05.6, Mệnh đề 05.7). Kiểm định chéo là biến thể dùng khi dữ liệu ít (Goodfellow và cộng sự 2016, mục 5.3.1).
- **Suy giảm trọng số trong học sâu.** Hạng phạt $\frac\lambda2\lVert w\rVert^2$ của Định lý 05.26 là suy giảm trọng số; với mạng nơ ron nó không làm mục tiêu lồi, nhưng vẫn giới hạn chuẩn tham số (Bài 06).
- **Bộ giải hồi quy logistic.** LIBLINEAR dùng Newton miền tin cậy với gradient liên hợp (TRON) cho hồi quy logistic có hạng phạt $\ell_2$; scikit-learn cung cấp thêm các bộ giải tựa Newton. Lựa chọn giữa chúng theo $(n,d,\kappa)$ là nội dung của Mục 4.6 (Bài 06c trình bày gradient liên hợp và BFGS).
- **Dừng sớm.** Huấn luyện mạng nơ ron thường dừng theo sai số xác thực (Định nghĩa 05.38); Mệnh đề 05.39 là trường hợp tuyến tính của cơ chế này (Goodfellow và cộng sự 2016, mục 7.8).
- **Chuẩn hóa đặc trưng.** Trừ trung bình và chia độ lệch chuẩn từng cột làm giảm số điều kiện khi các cột có thang đo khác nhau (Mục 2.5), nên giảm số bước của hạ gradient (Hệ quả 05.31).
- **Học quy mô lớn.** Phân loại văn bản với hàng trăm nghìn mẫu, như RCV1, dùng hạ gradient ngẫu nhiên vì chi phí mỗi bước không phụ thuộc $n$ (Ví dụ 05.25; Bài 06).
- **Mô hình quá tham số hóa.** Khi số tham số vượt số mẫu, sai số huấn luyện bằng $0$ là điều không tránh khỏi (Mệnh đề 05.10), và nghiệm mà thuật toán trả về phụ thuộc vào điểm xuất phát (Nhận xét 05.12); hiện tượng này được nghiên cứu cho mạng nơ ron ở Bài 06.

## Tóm tắt chương

Chúng ta xuất phát từ câu hỏi khung tối ưu lồi tất định của Bài 01–04 còn đúng tới đâu khi số đặc trưng $d$ và số mẫu $n$ lớn. Với hồi quy bình phương nhỏ nhất, tăng $d$ tới $n$ đưa bài toán vào chế độ nội suy: sai số huấn luyện về $0$, tập nghiệm có chiều $d-n$, sai số trên dữ liệu mới tăng, và số điều kiện không giảm (Mệnh đề 05.10, 05.16). Phân biệt rủi ro thực nghiệm với rủi ro kỳ vọng (Định nghĩa 05.5) cho thấy điểm cực tiểu của $F$ không phải đích, và tập xác thực, tập kiểm thử là công cụ để chọn và báo cáo (Định nghĩa 05.6). Với hồi quy logistic, chế độ nội suy còn làm mất điểm cực tiểu: mọi cách gán nhãn tách được, và mất mát không đạt cận dưới đúng của nó (Mệnh đề 05.21, Định lý 05.22). Chính quy hóa bậc hai làm bài toán đặt chỉnh với hằng số lồi mạnh $\lambda$, nhưng số điều kiện tăng theo $1/\lambda$ (Định lý 05.26, Mệnh đề 05.28). Đếm chi phí cho thấy Newton đổi số bước lấy chi phí $d^2$, $d^3$ mỗi bước, và mọi phương pháp tất định trả chi phí theo $n$ ở mỗi bước (Mệnh đề 05.35). Dừng sớm và số liệu RCV1 ghép hai lý do của vấn đề trung tâm: điểm cực tiểu chính xác của $F$ không phải đích, và mỗi bước tiến tới nó trả chi phí theo $n$, nên với ngân sách tính toán cố định, số lần cập nhật giảm theo $1/n$.

**Định nghĩa và kết quả theo mục.**

- Mục 1: bài toán học với mô hình tuyến tính theo đặc trưng (Định nghĩa 05.1); đổi ký hiệu (Nhận xét 05.2).
- Mục 2: phương trình chuẩn (Mệnh đề 05.3); sai số huấn luyện không tăng (Mệnh đề 05.4); rủi ro thực nghiệm và kỳ vọng, tập xác thực, tập kiểm thử, quá khớp (Định nghĩa 05.5, 05.6); ước lượng không chệch và thiên lệch khi chọn (Mệnh đề 05.7, Nhận xét 05.8, 05.9); chế độ nội suy, nghiệm chuẩn nhỏ nhất (Mệnh đề 05.10, 05.11, Nhận xét 05.12); số điều kiện (Định nghĩa 05.13, Mệnh đề 05.14, 05.15, 05.16); hồi quy có chính quy hóa (Mệnh đề 05.17, Nhận xét 05.18).
- Mục 3: gradient và Hessian logistic (Mệnh đề 05.19); tách được tuyến tính (Định nghĩa 05.20, Mệnh đề 05.21); không tồn tại điểm cực tiểu (Định lý 05.22, Hệ quả 05.23); dữ liệu không tách được (Mệnh đề 05.24, Nhận xét 05.25); chính quy hóa và lồi mạnh (Định lý 05.26, Hệ quả 05.27); hằng số trơn và số điều kiện (Mệnh đề 05.28, Nhận xét 05.29).
- Mục 4: hội tụ tuyến tính và số bước của hạ gradient (Định lý 05.30, Hệ quả 05.31, Nhận xét 05.32); Newton hai giai đoạn và bất biến affine (Định lý 05.33, Mệnh đề 05.34); chi phí một bước (Thuật toán 05.1, 05.2, Mệnh đề 05.35, 05.36, Nhận xét 05.37); ngưỡng hòa vốn (4.8).
- Mục 5: dừng sớm (Định nghĩa 05.38, Mệnh đề 05.39); XOR và số đơn thức (Mệnh đề 05.40, 05.41); bảo đảm còn lại (Nhận xét 05.42).

**Công thức cần nhớ.**

- Phương trình chuẩn và hồi quy có chính quy hóa: $X^TXw=X^Ty$; $\bigl(\frac1nX^TX+\lambda I\bigr)w=\frac1nX^Ty$.
- Nghiệm chuẩn nhỏ nhất: $w_{\rm mn}=X^T(XX^T)^{-1}y$ khi $\operatorname{rank}X=n$.
- Số điều kiện của mất mát bình phương: $\kappa_F=\kappa(X^TX)$; cận độ nhạy $\lVert\delta w\rVert\le\lVert\delta y\rVert/\sqrt{\lambda_{\min}(X^TX)}$.
- Hồi quy logistic có chính quy hóa: $\mu=\lambda$, $L=\frac{\lambda_{\max}(X^TX)}{4n}+\lambda$, $\kappa\le1+\frac{r^2}{4\lambda}$, $\lVert w_\lambda\rVert\le\sqrt{2\log2/\lambda}$.
- Số bước hạ gradient: $k\ge\kappa\log(e_0/\varepsilon_{\rm tol})$; số bước giai đoạn bậc hai của Newton: $\log_2\log_2(\varepsilon_0/\varepsilon_{\rm tol})$.
- Chi phí một bước: $O(nd)$ và $O(nd^2+d^3)$; khi $d>n$, $O(n^2d+n^3)$. Ngưỡng: Newton rẻ hơn theo cận khi $\kappa\log\frac{e_0}{\varepsilon_{\rm tol}}>N_{\rm N}\bigl(d+\frac{d^2}n\bigr)$.

**Giả thiết hay bị bỏ quên.**

1. Tập dùng để chọn mô hình không thể dùng để báo cáo $R$ (Nhận xét 05.8).
2. Tính lồi không bảo đảm sự tồn tại điểm cực tiểu; tính tách được của dữ liệu quyết định (Định lý 05.22).
3. Tọa độ hằng $1$ cho $\lVert x_i\rVert\ge1$, nên $r\ge1$ trong Mệnh đề 05.28.
4. Cận số bước theo $\kappa$ là cận trên toàn cục; số bước thực theo số điều kiện cục bộ (Nhận xét 05.32).
5. Chỉ số bước của giai đoạn bậc hai của Newton không chứa $\kappa$; toàn bộ cận thì có (Định lý 05.33).
6. Phép đếm theo bậc chỉ phân định khi hai cận chênh nhau nhiều bậc (Ví dụ 05.22).
7. SGD bước hằng chỉ tới một lân cận của điểm cực tiểu (Nhận xét 05.42).

**Tương ứng với nhãn của bộ trang chiếu.** Bộ trang chiếu Bài 05 đánh số kết quả theo bài; tương ứng với số hiệu của ghi chú như sau. Kết quả của Bài 05b và Bài 05c được trang chiếu dẫn trực tiếp bằng số hiệu, chẳng hạn Định lý 05b.41.

| Nhãn trên trang chiếu | Số hiệu trong ghi chú |
|---|---|
| Mệnh đề 1 (chế độ nội suy) | Mệnh đề 05.10 |
| Mệnh đề 2 (hạng đầy đủ kéo theo tách được) | Mệnh đề 05.21 |
| Định lý 1 (không tồn tại điểm cực tiểu) | Định lý 05.22 |
| Mệnh đề 3 (dữ liệu không tách được) | Mệnh đề 05.24 |
| Định lý 2 (chính quy hóa và tính lồi mạnh) | Định lý 05.26 |
| Mệnh đề 4 (hằng số trơn và số điều kiện) | Mệnh đề 05.28 |
| Định lý 3 (số bước của hạ gradient) | Định lý 05.30 |
| Định lý 4 (Newton hai giai đoạn) | Định lý 05.33 |
| Mệnh đề 5 (chi phí một bước) | Mệnh đề 05.35 |

**Giới hạn còn lại và bài tiếp theo.** Hai giới hạn còn để mở. Giới hạn (i), chi phí theo $n$ của mỗi bước, dẫn tới hạ gradient ngẫu nhiên theo nhóm nhỏ ở Bài 06, với các bảo đảm của Bài 05b và ước lượng phương sai của Bài 05c. Giới hạn (ii), biểu diễn của đặc trưng cố định, dẫn tới mạng hai tầng có đặc trưng học được, mở đầu bằng bài toán XOR ở Bài 06; ở đó mục tiêu không còn lồi, và các bảo đảm chỉ còn ở mức điểm dừng xấp xỉ.

## Bài tập củng cố

Ba bài tập dưới đây, một bài ở mỗi mức, bổ sung cho các bài tập trong từng mục. Tệp bài tập của chương chứa bộ bài giao chính thức, không lặp các đề dưới đây. Bảng sau ghi bài tập ứng với mỗi mục tiêu học tập.

| Mục tiêu | Bài tập trong ghi chú |
|---|---|
| 1. Hồi quy nhiều chiều, chọn mô hình | 05.1, 05.2, 05.3, 05.13 |
| 2. Tách được, chính quy hóa, $\mu$, $L$, $\kappa$ | 05.4, 05.5, 05.6 |
| 3. Chi phí và số bước | 05.7, 05.8, 05.9, 05.15 |
| 4. Dừng sớm và hai giới hạn | 05.10, 05.11, 05.12, 05.14 |

::: exercise Bài tập 05.13 (Mức tính toán hoặc chứng minh: hạ gradient tìm nghiệm chuẩn nhỏ nhất)
Cho $X\in\mathbb R^{n\times d}$ với $\operatorname{rank}X=n<d$, $y\in\mathbb R^n$, $F(w)=\frac1{2n}\lVert Xw-y\rVert^2$ và $L=\lambda_{\max}(X^TX)/n$. Hạ gradient bước $\frac1L$ xuất phát từ $w_0=0$.

1. Chứng minh mọi $w_k$ có dạng $X^Ta_k$ với một $a_k\in\mathbb R^n$ duy nhất.
2. Viết phép lặp của $a_k$ và chứng minh $a_k\to(XX^T)^{-1}y$.
3. Suy ra $w_k\to w_{\rm mn}$ của Mệnh đề 05.11, và nêu điều thay đổi khi $w_0\ne0$.
:::

::: hint
$\nabla F(w)=\frac1nX^T(Xw-y)$ thuộc ảnh của $X^T$. Ma trận $G=XX^T$ xác định dương và có cùng các trị riêng khác $0$ với $X^TX$.
:::

::: solution
1. Quy nạp theo $k$. Với $k=0$, $w_0=X^T\cdot0$. Nếu $w_k=X^Ta_k$ thì

$$
w_{k+1}=X^Ta_k-\frac1{nL}X^T(XX^Ta_k-y)=X^T\Bigl[a_k-\frac1{nL}(Ga_k-y)\Bigr],
$$

với $G=XX^T$. Tính duy nhất: $X^T$ có $n$ cột độc lập tuyến tính (các hàng của $X$), nên $X^Ta=X^Ta'$ kéo theo $a=a'$.

2. $a_{k+1}=a_k-\frac1{nL}(Ga_k-y)$. Theo Bước 1 của chứng minh Mệnh đề 05.11, $G\succ0$; đặt $a^*=G^{-1}y$. Trừ đẳng thức $a^*=a^*-\frac1{nL}(Ga^*-y)$:

$$
a_{k+1}-a^*=\Bigl(I-\frac1{nL}G\Bigr)(a_k-a^*).
$$

Nếu $Gv=sv$ với $v\ne0$ thì $X^TX(X^Tv)=sX^Tv$ và $X^Tv\ne0$, nên mọi trị riêng $s$ của $G$ là trị riêng dương của $X^TX$, và $0<s\le\lambda_{\max}(X^TX)=nL$. Do đó các trị riêng $1-s/(nL)$ của $I-\frac1{nL}G$ nằm trong $[0,1)$, và $a_k-a^*\to0$.

3. $w_k=X^Ta_k\to X^Ta^*=X^T(XX^T)^{-1}y=w_{\rm mn}$. Khi $w_0\ne0$, viết $w_0=w_0^{\parallel}+w_0^{\perp}$ với $w_0^{\parallel}$ thuộc ảnh của $X^T$ và $w_0^{\perp}\in\ker X$. Mọi bước chỉ cộng các vector thuộc ảnh của $X^T$, nên $w_0^{\perp}$ giữ nguyên, và $w_k\to w_{\rm mn}+w_0^{\perp}$: một nghiệm khác của $Xw=y$, có chuẩn lớn hơn nếu $w_0^{\perp}\ne0$.
:::

::: exercise Bài tập 05.14 (Mức nhận biết: đúng hay sai)
Xác định mỗi phát biểu đúng hay sai, và nêu kết quả hoặc phản ví dụ của chương làm căn cứ.

1. Với các bộ đặc trưng lồng nhau, thêm đặc trưng không làm tăng MSE huấn luyện tại nghiệm bình phương nhỏ nhất.
2. Với các bộ đặc trưng lồng nhau, thêm đặc trưng không làm tăng MSE xác thực.
3. Mất mát logistic lồi, nên luôn có điểm cực tiểu.
4. Với $\lambda>0$, mục tiêu logistic có chính quy hóa có đúng một điểm cực tiểu với mọi dữ liệu.
5. Số bước của phương pháp Newton không phụ thuộc số điều kiện.
6. Sai số xác thực của mô hình được chọn là ước lượng không chệch của rủi ro kỳ vọng của nó.
:::

::: hint
Mỗi phát biểu ứng với một kết quả đánh số của Mục 2–4; phát biểu sai cần một ví dụ cụ thể.
:::

::: solution
1. Đúng, theo Mệnh đề 05.4.
2. Sai: trong Ví dụ 05.4, MSE xác thực tăng từ $0{,}000125$ ở $d=2$ lên $0{,}0487$ ở $d=5$.
3. Sai: trên dữ liệu tách được, $\inf F=0$ không đạt (Định lý 05.22); Ví dụ 05.11 với ba điểm và đặc trưng $(1,u,u^2)$.
4. Đúng, theo Định lý 05.26: $F_\lambda$ lồi mạnh với hằng số $\lambda$.
5. Sai nếu không kèm điều kiện: theo Định lý 05.33, chỉ số bước của giai đoạn bậc hai không chứa $\kappa$; giai đoạn tắt dần và $\varepsilon_0$ phụ thuộc độ cong. Trong Ví dụ 05.19, số bước Newton tăng từ $4$ lên $7$ khi $\kappa$ tăng từ $6$ lên $501$.
6. Sai: giá trị xác thực nhỏ nhất trong một danh sách có xu hướng thấp hơn rủi ro (Nhận xét 05.8); Mệnh đề 05.7 chỉ áp dụng khi tham số không phụ thuộc tập đánh giá.
:::

::: exercise Bài tập 05.15 (Mức vận dụng vào AI: hồi quy logistic trên dữ liệu văn bản thưa)
Một bài toán phân loại văn bản có $n=10^5$ văn bản và $d=5\cdot10^4$ đặc trưng TF-IDF. Ma trận $X$ thưa: mỗi văn bản có $100$ tọa độ khác $0$, nên $X$ có $10^7$ phần tử khác $0$. Mỗi vector đặc trưng có chuẩn bình phương không quá $2$ sau khi thêm tọa độ hằng. Hệ số chính quy hóa là $\lambda=10^{-4}$, độ chính xác yêu cầu $e_0/\varepsilon_{\rm tol}=10^8$.

1. Tính chi phí một bước hạ gradient khi tận dụng tính thưa, cận số bước theo Hệ quả 05.31 và cận tổng chi phí.
2. Với Newton dùng Hessian dày, tính bộ nhớ của Hessian và chi phí phân tích Cholesky mỗi bước; giải thích vì sao Mệnh đề 05.36 không giúp ở đây.
3. Với Newton giải hệ bằng gradient liên hợp (Nhận xét 05.37), giả định mỗi bước Newton cần $50$ tích Hessian–vector và cần $10$ bước Newton. Tính tổng chi phí và so với câu 1.
4. Nêu giới hạn của kết luận ở câu 3.
:::

::: hint
Với dữ liệu thưa, một tích $Xv$ hoặc $X^Tv$ tốn bằng số phần tử khác $0$. Một tích $Hv=\frac1nX^T\bigl(S(Xv)\bigr)+\lambda v$ gồm hai tích như vậy cộng $O(n+d)$.
:::

::: solution
1. Một bước hạ gradient gồm hai tích thưa, khoảng $2\cdot10^7$ phép nhân–cộng. Theo Mệnh đề 05.28 với $r^2=2$, $\kappa\le1+\frac2{4\cdot10^{-4}}=5001$. Hệ quả 05.31 cho tối đa $5001\cdot18{,}42\approx9{,}2\cdot10^4$ bước, nên cận tổng chi phí là khoảng $9{,}2\cdot10^4\cdot2\cdot10^7\approx1{,}8\cdot10^{12}$.

2. Hessian $d\times d$ nói chung dày và chiếm $8d^2=2\cdot10^{10}$ byte, tức 20 GB. Phân tích Cholesky tốn khoảng $d^3/3\approx4{,}2\cdot10^{13}$ mỗi bước, gấp hơn hai mươi lần cận tổng chi phí của hạ gradient chỉ trong một bước. Mệnh đề 05.36 có lợi khi $n<d$; ở đây $n=10^5>d$, nên hệ $n\times n$ còn lớn hơn hệ $d\times d$.

3. Mỗi tích $Hv$ tốn khoảng $2\cdot10^7$, như một gradient. Mỗi bước Newton gồm một gradient và $50$ tích, khoảng $51\cdot2\cdot10^7\approx10^9$; mười bước tốn khoảng $1{,}0\cdot10^{10}$. Con số này nhỏ hơn cận của hạ gradient khoảng $180$ lần, và không cần lưu Hessian.

4. Số tích Hessian–vector và số bước Newton là giả định; số vòng gradient liên hợp cần thiết tăng theo số điều kiện của Hessian, nên với $\lambda$ nhỏ hơn có thể cần nhiều hơn $50$. Cận của hạ gradient còn bi quan (Nhận xét 05.32), nên tỉ số thật nhỏ hơn $180$. Kết luận định tính vẫn đứng: với dữ liệu thưa và $d$ lớn, phương pháp bậc hai chỉ khả thi khi không lập Hessian dày, như TRON trên RCV1 (Ví dụ 05.25).
:::

## Hướng dẫn đọc thêm và tài liệu tham khảo

- Ian Goodfellow, Yoshua Bengio và Aaron Courville (2016), *Deep Learning*, MIT Press: mục 5.2 (tr. 110–117: dung lượng mô hình, quá khớp và khớp thiếu, hình 5.2 với đa thức bậc tăng dần), mục 5.3.1 (kiểm định chéo), mục 5.7.1 (tr. 140: hồi quy logistic), mục 6.1 (bài toán XOR), mục 7.1.1 (tr. 231: suy giảm trọng số), mục 7.3 (tr. 239–240: chính quy hóa cho bài toán thiếu ràng buộc, hồi quy logistic trên dữ liệu tách được, giả nghịch đảo), mục 7.8 (tr. 246–250: dừng sớm, Thuật toán 7.1), mục 8.1 (tr. 275–277: rủi ro thực nghiệm và mất mát thay thế), mục 8.2.1 (điều kiện hóa kém). Dùng cho Mục 2, 3.4, 5.1, 5.3.
- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press: mục 6.3.2 (tr. 306: chính quy hóa), mục 7.1.1 (tr. 354–355: hồi quy logistic), mục 8.6.1 (phân tách tuyến tính), mục 9.1.2 (tr. 459–461: lồi mạnh và số điều kiện của tập mức), mục 9.3.1 (tr. 466–468: hội tụ của hạ gradient), mục 9.5.1 (tr. 486: bất biến affine), mục 9.5.3 (tr. 488–491: hội tụ hai giai đoạn của Newton), mục 9.7.1–9.7.2 (tr. 508–512: chi phí Cholesky và hệ Newton có cấu trúc đường chéo cộng hạng thấp). Dùng cho Mục 2.5, 3.3, 4.
- Léon Bottou và Olivier Bousquet (2011), "The Tradeoffs of Large-Scale Learning", trong Suvrit Sra, Sebastian Nowozin và Stephen J. Wright (biên tập), *Optimization for Machine Learning*, MIT Press, chương 13: mục 13.1–13.2 (tr. 351–354: đánh đổi giữa sai số xấp xỉ, sai số ước lượng và sai số tối ưu), Bảng 13.2 (tr. 362: chi phí của các thuật toán gradient), mục 13.4.1 và Bảng 13.3 (tr. 363: thí nghiệm RCV1). Dùng cho Mục 1.1, 4.6, 5.2.
- Stephen Boyd (2009), *Introduction to Convex Optimization*, MIT OpenCourseWare 6.079, bài giảng 10 "Unconstrained minimization", trang 10–29 (chi phí phân tích Cholesky) và 10–30 (hệ Newton dày có cấu trúc, giải qua hệ nhỏ). Dùng cho Mệnh đề 05.36.
- Gilbert Strang (2016), *Introduction to Linear Algebra*, ấn bản 5, Wellesley–Cambridge Press: phần bốn không gian con cơ bản và định lý hạng–số chiều; phần ma trận đối xứng và thương Rayleigh. Dùng cho Mệnh đề 05.10, 05.11, 05.16.
- Daniel Soudry, Elad Hoffer, Mor Shpigel Nacson, Suriya Gunasekar và Nathan Srebro (2018), "The Implicit Bias of Gradient Descent on Separable Data", *Journal of Machine Learning Research* 19(70), 1–57. Đọc thêm cho Tình huống 05.2.
- Chih-Jen Lin, Ruby C. Weng và S. Sathiya Keerthi (2008), "Trust Region Newton Method for Large-Scale Logistic Regression", *Journal of Machine Learning Research* 9, 627–650. Nguồn của phương pháp TRON ở Mục 5.2.
- Ghi chú Bài 01 (Mệnh đề 01.6, 01.9; Định nghĩa 01.8, 01.42; Ví dụ 01.6, 01.7; Định lý 01.35, 01.36, 01.38; Hệ quả 01.41; Nhận xét 01.40, 01.43; Tình huống 01.1), Bài 02 (Mệnh đề 02.21), Bài 04 (Định nghĩa 04.28, 04.30, 04.33; Mệnh đề 04.31; Thuật toán 04.2; Định lý 04.26, 04.35), Bài 05b (Định nghĩa 05b.5; Bổ đề 05b.6; Hệ quả 05b.17; Định lý 05b.18, 05b.36, 05b.39, 05b.41, 05b.43) và Bài 05c (Định nghĩa 05c.51; Định lý 05c.52, 05c.53) là tiên quyết trực tiếp.

Mọi số liệu của các ví dụ, trừ bảng RCV1, là số liệu sư phạm tự xây dựng và được tính lại từ dữ kiện nêu trong chương. Các chứng minh của Mục 2 và 3 được viết trực tiếp; Định lý 05.30 và 05.33 được phát biểu lại từ Bài 05b, Bài 04 và Boyd và Vandenberghe (2004).
