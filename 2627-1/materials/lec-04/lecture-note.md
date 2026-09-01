# Bài 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

Ghi chú này biến các điều kiện tối ưu của Bài 03 thành một quy trình tính. Với mỗi phương pháp, ta phải xác định hướng, độ dài bước, phép cập nhật, tiêu chuẩn dừng và các giả thiết dùng để bảo đảm hội tụ.

Phạm vi chính là hàm lồi trơn và hai lớp bài toán

$$
\underset{x\in\mathbb R^n}{\operatorname{minimize}}\;f(x),
$$

và

$$
\begin{aligned}
\underset{x\in\mathbb R^n}{\operatorname{minimize}}\quad & f(x)\\
\text{với}\quad & Ax=b,
\end{aligned}
$$

trong đó $A\in\mathbb R^{p\times n}$ và $b\in\mathbb R^p$. Nguồn chính là Boyd và Vandenberghe (2004), Chương 9–10, cùng Lecture 16–17 của MIT 6.079/6.975. Bài 05 sẽ thay gradient toàn lô xác định bằng thông tin từ dữ liệu hoặc lô nhỏ và xét cảnh quan phi lồi; các bảo đảm của bài này khi đó không còn áp dụng nguyên dạng.


## A. Phương pháp giảm và tìm kiếm đường

### 1. Khuôn phương pháp giảm

**Mục tiêu đọc hiểu.** Người đọc phân biệt được điều kiện dừng với một thuật toán và mô tả được bốn thành phần của một vòng lặp tối ưu.

**Định nghĩa và giả thiết.** Chọn $x^{(0)}\in\operatorname{dom}f$. Tại vòng $k$, một phương pháp giảm thực hiện

$$
x^{(k+1)}=x^{(k)}+t_kd^{(k)},
$$

trong đó $d^{(k)}\in\mathbb R^n$ là hướng và $t_k>0$ là độ dài bước. Một vòng đầy đủ gồm:

1. tính thông tin cục bộ tại $x^{(k)}$;
2. chọn hướng $d^{(k)}$;
3. chọn bước $t_k$;
4. cập nhật và kiểm tra tiêu chuẩn dừng.

Để phát biểu các bảo đảm toàn cục trong phần này, đặt

$$
S=\{x:f(x)\le f(x^{(0)})\}
$$

và giả sử thêm $S$ đóng. Các điểm thử cũng phải nằm trong $\operatorname{dom}f$.

**Trực quan.** Điều kiện $\nabla f(x^*)=0$ nhận biết một ứng viên sau khi đã có nó. Phương pháp giảm trả lời câu hỏi khác: từ điểm hiện tại, đi theo hướng nào, bao xa và dùng đại lượng nào để quyết định dừng.

::: example
**Ví dụ tính được.** Xét

$$
f(x)=\frac12(x_1^2+10x_2^2),
\qquad
x^{(0)}=(10,1)^T.
$$

Ta có

$$
H=\begin{bmatrix}1&0\\0&10\end{bmatrix},
\qquad
g^{(0)}=(10,10)^T,
\qquad
f(x^{(0)})=55.
$$

Nghiệm duy nhất là $x^*=0$ và $p^*=0$. Điều kiện $g(x^*)=0$ xác nhận nghiệm, nhưng chưa tạo được $x^{(1)}$ từ $x^{(0)}$.
:::

**Ý nghĩa và ứng dụng trong AI.** Huấn luyện một mô hình trơn cũng phải chỉ rõ hướng cập nhật, tốc độ học, phép đánh giá và tiêu chuẩn dừng. Chỉ viết “cực tiểu hóa mất mát” chưa đủ để tái lập quy trình.

**Điểm dễ nhầm.** Tính lồi và khả vi không tự cho một tốc độ hội tụ. Giả thiết $S$ đóng là bổ sung, không tự suy ra chỉ từ tính liên tục trên một miền mở. Một chuẩn gradient nhỏ chỉ là kiểm tra gần dừng; để đổi nó thành cận sai số mục tiêu cần thêm giả thiết như lồi mạnh.

**Câu hỏi kiểm tra.** Trong công thức cập nhật, đại lượng nào quyết định phương, đại lượng nào quyết định độ dài, và vì sao không thể bỏ kiểm tra $x^{(k+1)}\in\operatorname{dom}f$?

### 2. Hướng giảm và xấp xỉ bậc nhất

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được một hướng có làm giảm hàm với bước đủ nhỏ hay không và chỉ ra điểm dùng tính khả vi.

**Định nghĩa và giả thiết.** Tại $x\in\operatorname{dom}f$, đặt $g=\nabla f(x)$. Một véc-tơ $d$ là **hướng giảm** nếu tồn tại $\bar t>0$ sao cho

$$
f(x+td)<f(x)
$$

với mọi $t\in(0,\bar t]$ mà $x+td\in\operatorname{dom}f$. Điều kiện kiểm tra quen thuộc là

$$
g^Td<0.
$$

**Trực quan.** Gradient vuông góc với đường mức theo hình học Euclid. Hướng tạo góc tù với gradient có đạo hàm theo hướng âm; tiếp tuyến bậc nhất nghiêng xuống theo hướng đó.

::: example
**Ví dụ tính được.** Tại $x^{(0)}=(10,1)^T$ của ví dụ bậc hai, chọn hướng gradient âm

$$
d=-g^{(0)}=(-10,-10)^T.
$$

Khi đó

$$
(g^{(0)})^Td=-200<0.
$$

Hàm dọc theo tia là

$$
q(t)=f(x^{(0)}+td)=55-200t+550t^2.
$$

Với $t>0$ đủ nhỏ, hạng tuyến tính âm chi phối hạng bậc hai, nên $q(t)<55$.
:::

**Ý nghĩa và ứng dụng trong AI.** Tích $g^Td$ là phép kiểm tra rẻ trước khi tìm bước. Nó giúp phát hiện một hướng Newton hoặc hướng đã tiền điều kiện không còn là hướng giảm do Hessian không xác định dương.

**Điểm dễ nhầm.** $g^Td<0$ chỉ bảo đảm giảm với bước đủ nhỏ, không bảo đảm bước $t=1$. Nếu $g=0$, không tồn tại hướng có tích âm; điều đó chỉ cho một điểm dừng, không tự chứng minh cực tiểu toàn cục ngoài bài toán lồi.

**Câu hỏi kiểm tra.** Với $g=(2,-1)^T$, hãy kiểm tra hai hướng $d_1=(-1,0)^T$ và $d_2=(1,1)^T$. Hướng nào là hướng giảm?

### Mệnh đề: tích âm tạo một hướng giảm

**Giả thiết.** $f$ khả vi tại $x$, $x$ nằm trong miền mở và $g^Td<0$.

**Kết luận.** Tồn tại $\bar t>0$ sao cho $f(x+td)<f(x)$ với mọi $t\in(0,\bar t]$.

::: proof
Theo tính khả vi,

$$
f(x+td)=f(x)+t g^Td+o(t)
$$

khi $t\downarrow0$. Chia cho $t>0$ cho

$$
\frac{f(x+td)-f(x)}{t}=g^Td+\frac{o(t)}t.
$$

Vì $o(t)/t\to0$ và $g^Td<0$, tồn tại $\bar t>0$ sao cho vế phải vẫn âm với mọi $t\in(0,\bar t]$. Miền mở bảo đảm các điểm $x+td$ thuộc miền khi $t$ đủ nhỏ. Do đó $f(x+td)<f(x)$.
:::

### 3. Tìm kiếm đường chính xác và quay lui Armijo

**Mục tiêu đọc hiểu.** Người đọc phân biệt được hai cách chọn bước, thực hiện được quay lui và giải thích được vì sao quá trình co bước kết thúc.

**Định nghĩa và giả thiết.** Với một hướng giảm $d$, tìm kiếm đường chính xác (exact line search) chọn

$$
t\in\operatorname*{argmin}_{s\ge0}f(x+sd).
$$

Tìm kiếm đường quay lui Armijo chọn $\alpha\in(0,1/2)$, $\beta\in(0,1)$, bắt đầu $t=1$ và lặp $t\leftarrow\beta t$ cho đến khi điểm thử thuộc miền và

$$
f(x+td)\le f(x)+\alpha t g^Td.
$$

Vế phải nhỏ hơn $f(x)$ vì $g^Td<0$; Armijo chỉ đòi một phần của mức giảm được dự báo bởi mô hình tuyến tính.

**Trực quan.** Tìm kiếm chính xác chạm đáy của hàm một chiều trên tia. Armijo dựng một đường ngưỡng; quay lui co bước cho đến khi đồ thị thật nằm dưới đường này.

![Đường cong mục tiêu theo độ dài bước và đường Armijo; bước một và một phần hai bị loại, bước một phần tư được nhận.](img/lec-04/armijo-backtracking.svg)

::: example
**Ví dụ tính được.** Với $q(t)=55-200t+550t^2$, $\alpha=0{,}1$ và $\beta=0{,}5$, ngưỡng Armijo là

$$
55+0{,}1t(-200)=55-20t.
$$

| $t$ | $q(t)$ | Ngưỡng | Quyết định |
|---:|---:|---:|---|
| $1$ | $405$ | $35$ | loại |
| $1/2$ | $92{,}5$ | $45$ | loại |
| $1/4$ | $39{,}375$ | $50$ | nhận |

Vậy quay lui co bước hai lần và trả $t=1/4$, cho

$$
x^{(1)}=(7{,}5,-1{,}5)^T.
$$

Nếu dùng tìm kiếm chính xác trên cùng tia, $q'(t)=0$ cho $t=2/11$.
:::

**Ý nghĩa và ứng dụng trong AI.** Quay lui thay một tốc độ học cố định bằng một phép kiểm tra mức giảm tại chỗ. Nó phù hợp với bài toán xác định, trơn và có thể đánh giá mục tiêu; Bài 05 sẽ giải thích vì sao cùng phép kiểm tra không được chuyển nguyên dạng sang gradient lô nhỏ có nhiễu.

**Điểm dễ nhầm.** Armijo không tìm bước tốt nhất trên tia. Tham số $\beta$ là hệ số co, không phải độ dài bước cố định. Tìm kiếm chính xác thường tốn kém và công thức đóng $2/11$ chỉ thuộc ví dụ bậc hai này.

**Câu hỏi kiểm tra.** Nếu bắt đầu từ $t=1$ với $\beta=1/2$ và bước đầu tiên được nhận là $1/8$, đã thực hiện bao nhiêu lần co?

### Định lý: quay lui Armijo kết thúc với hướng giảm

**Giả thiết.** $f$ khả vi tại $x$, miền mở, $g^Td<0$, $\alpha\in(0,1/2)$ và $\beta\in(0,1)$.

**Kết luận.** Sau hữu hạn lần co, bước $t=\beta^j$ thuộc miền và thỏa điều kiện Armijo.

::: proof
Từ khai triển bậc nhất,

$$
f(x+td)-f(x)=t g^Td+o(t).
$$

Điều kiện Armijo tương đương

$$
(1-\alpha)t g^Td+o(t)\le0.
$$

Vì $1-\alpha>0$ và $g^Td<0$, bất đẳng thức đúng khi $t>0$ đủ nhỏ. Miền mở cũng chứa $x+td$ khi $t$ đủ nhỏ. Dãy $\beta^j$ tiến về $0$, nên sau hữu hạn lần co nó đi vào khoảng bước được nhận.
:::

## B. Gradient và giảm dốc nhất

### 4. Phương pháp gradient và điều kiện hóa

**Mục tiêu đọc hiểu.** Người đọc thực hiện được một bước gradient, đọc được số điều kiện và giải thích được quỹ đạo zigzag của một bậc hai.

**Định nghĩa và giả thiết.** Phương pháp gradient chọn

$$
d=-g=-\nabla f(x)
$$

rồi dùng tìm kiếm đường hoặc một bước đã được bảo đảm. Theo chuẩn Euclid, đây là hướng giảm dốc nhất. Với một bậc hai $H\succ0$, số điều kiện phổ là

$$
\kappa_2(H)=\frac{\lambda_{\max}(H)}{\lambda_{\min}(H)}.
$$

Số điều kiện lớn nghĩa là độ cong thay đổi mạnh theo hướng; một bước vô hướng phải thỏa hiệp giữa hướng phẳng và hướng dốc.

**Trực quan.** Trên ellipse dẹt, gradient gần vuông góc với trục dài. Bước gradient dễ vượt qua đáy theo hướng cong lớn, rồi đổi phía ở vòng kế tiếp; tiến triển theo hướng phẳng chậm hơn.

![Quỹ đạo gradient với tìm kiếm đường chính xác luân phiên hai phía và co về nghiệm theo hệ số chín phần mười một.](img/lec-04/quadratic-zigzag.svg)

::: example
**Ví dụ tính được.** Với $H=\operatorname{diag}(1,10)$, $\kappa_2(H)=10$. Tìm kiếm chính xác theo $d=-g$ trên bậc hai cho

$$
t_k=\frac{g_k^Tg_k}{g_k^THg_k}.
$$

Tại $x^{(0)}$, $t_0=2/11$ và

$$
x^{(1)}=\left(\frac{90}{11},-\frac9{11}\right)^T.
$$

Đặt $\rho=9/11$. Bằng quy nạp,

$$
x_1^{(k)}=10\rho^k,
\qquad
x_2^{(k)}=(-\rho)^k,
\qquad
f(x^{(k)})=55\rho^{2k}.
$$

Dấu của $x_2^{(k)}$ luân phiên; nghiệm chỉ đạt trong giới hạn $k\to\infty$.
:::

**Ý nghĩa và ứng dụng trong AI.** Điều kiện hóa kém làm các tham số có thang hoặc độ cong khác nhau học với tốc độ rất khác. Đây là lý do thực hành cho chuẩn thích nghi, tiền điều kiện và, trong Bài 05, momentum; nó không phải bằng chứng rằng mục tiêu phi lồi đã được giải quyết.

**Điểm dễ nhầm.** Hai gradient liên tiếp trực giao dưới tìm kiếm chính xác trên bậc hai không có nghĩa quỹ đạo đi thẳng tới nghiệm. Công thức $t_k=g_k^Tg_k/(g_k^THg_k)$ không áp dụng cho hàm tổng quát. Số điều kiện phụ thuộc chuẩn và tọa độ.

**Câu hỏi kiểm tra.** Với $\rho=9/11$, thành phần nào đổi dấu qua mỗi vòng? Sau hai vòng, độ lớn mỗi thành phần đã nhân với hệ số nào?

### 5. Giảm dốc nhất theo chuẩn tổng quát

**Mục tiêu đọc hiểu.** Người đọc định nghĩa được chuẩn đối ngẫu, phân biệt hướng đã chuẩn hóa với bước không chuẩn hóa và nhận ra gradient là trường hợp Euclid.

**Định nghĩa và giả thiết.** Cho một chuẩn $\|\cdot\|$ trên $\mathbb R^n$. Chuẩn đối ngẫu là

$$
\|g\|_*=\max_{\|v\|\le1}g^Tv.
$$

Một hướng giảm dốc nhất đã chuẩn hóa là

$$
d_{\mathrm{nsd}}
\in\operatorname*{argmin}_{\|v\|=1}g^Tv.
$$

Hướng không chuẩn hóa theo quy ước của Boyd là

$$
d_{\mathrm{sd}}=\|g\|_*d_{\mathrm{nsd}}.
$$

Khi $g\ne0$,

$$
g^Td_{\mathrm{nsd}}=-\|g\|_*,
\qquad
g^Td_{\mathrm{sd}}=-\|g\|_*^2.
$$

**Trực quan.** Thay chuẩn nghĩa là thay quả cầu đơn vị dùng để đo độ dài hướng. Điểm trên biên quả cầu mà siêu phẳng tuyến tính $g^Tv$ chạm đầu tiên xác định hướng dốc nhất.

::: example
**Ví dụ tính được.** Với chuẩn Euclid,

$$
\|g\|_*=\|g\|_2,
\qquad
d_{\mathrm{nsd}}=-\frac g{\|g\|_2},
\qquad
d_{\mathrm{sd}}=-g.
$$

Tại $g=(10,10)^T$, hướng không chuẩn hóa là $(-10,-10)^T$. Vì vậy phương pháp gradient chính là giảm dốc nhất theo chuẩn Euclid, không phải theo mọi chuẩn.
:::

**Ý nghĩa và ứng dụng trong AI.** Chọn chuẩn mã hóa đơn vị, tỷ lệ hoặc cấu trúc của tham số. Nó giúp tách câu hỏi “hướng nào dốc nhất” khỏi thói quen mặc định dùng hình học Euclid.

**Điểm dễ nhầm.** Nếu bài toán $\operatorname*{argmin}$ có nhiều nghiệm, phải viết quan hệ thuộc thay vì một đẳng thức duy nhất. Độ lớn của hướng có thể được hấp thụ vào tìm kiếm đường; vì vậy phải công bố đang dùng hướng chuẩn hóa hay không chuẩn hóa.

**Câu hỏi kiểm tra.** Với $g=(3,4)^T$ và chuẩn Euclid, hãy tính $\|g\|_*$, $d_{\mathrm{nsd}}$ và $d_{\mathrm{sd}}$.

### Định lý: đặc trưng hướng giảm dốc nhất bằng chuẩn đối ngẫu

**Giả thiết.** $g\ne0$ và $\|\cdot\|$ là một chuẩn trên không gian hữu hạn chiều.

**Kết luận.** Mọi $d_{\mathrm{nsd}}$ như trên thỏa

$$
g^Td_{\mathrm{nsd}}=-\|g\|_*.
$$

Do đó $d_{\mathrm{sd}}=\|g\|_*d_{\mathrm{nsd}}$ thỏa $g^Td_{\mathrm{sd}}=-\|g\|_*^2$.

::: proof
Theo định nghĩa chuẩn đối ngẫu, tồn tại $v^*$ với $\|v^*\|\le1$ sao cho $g^Tv^*=\|g\|_*$. Vì $g\ne0$, điểm cực đại nằm trên biên $\|v^*\|=1$. Đối xứng của quả cầu đơn vị cho $\|-v^*\|=1$ và

$$
g^T(-v^*)=-\|g\|_*.
$$

Mặt khác, với mọi $v$ có $\|v\|=1$,

$$
g^Tv\ge-\|g\|_*
$$

do $-g^Tv\le\|g\|_*$. Vậy giá trị cực tiểu đúng bằng $-\|g\|_*$. Nhân hướng cực tiểu với $\|g\|_*$ cho đẳng thức thứ hai.
:::

### 6. Chuẩn bậc hai, tiền điều kiện và tốc độ tuyến tính

**Mục tiêu đọc hiểu.** Người đọc tính được hướng giảm dốc nhất theo một chuẩn bậc hai và phát biểu tốc độ tuyến tính bằng đúng đại lượng cùng giả thiết.

**Định nghĩa và giả thiết.** Cho $W\in\mathbb S_{++}^n$ và

$$
\|v\|_W=(v^TWv)^{1/2}.
$$

Hướng không chuẩn hóa được tính bằng cách giải

$$
Wd=-g.
$$

Chọn $W$ gần Hessian làm đổi tỷ lệ theo độ cong; thao tác triển khai là giải hệ, không lập $W^{-1}$.

Để có một bảo đảm tuyến tính cụ thể cho gradient Euclid, giả sử trên tập mức

$$
\mu I\preceq\nabla^2f(x)\preceq MI,
\qquad 0<\mu\le M,
$$

và dùng bước $t=1/M$. Hệ số co của cận sai số mục tiêu là $1-\mu/M=1-1/\kappa$, trong đó $\kappa=M/\mu$. Đại lượng này được xây từ hai hằng số toàn cục trên tập mức; cần phân biệt với $\kappa_2(H)=\lambda_{\max}(H)/\lambda_{\min}(H)$ của Hessian cụ thể trong ví dụ bậc hai xuyên suốt.

**Trực quan.** Quả cầu chuẩn $W$ trở thành ellipse trong tọa độ Euclid. Nếu ellipse này khớp đường mức, hướng dốc nhất bớt dao động giữa các phía.

::: example
**Ví dụ tính được.** Tại $g=(10,10)^T$:

- Với $W=I$, giải $Id=-g$ cho $d=(-10,-10)^T$.
- Với $W=H=\operatorname{diag}(1,10)$, giải $Hd=-g$ cho

  $$
  d=(-10,-1)^T.
  $$

Hai hướng đều giảm vì các tích lần lượt là $-200$ và $-110$. Hướng thứ hai giảm thành phần có độ cong lớn ít hơn và trùng bước Newton của riêng hàm bậc hai này.
:::

**Ý nghĩa và ứng dụng trong AI.** Tiền điều kiện có thể giảm ảnh hưởng của khác biệt đơn vị và độ cong. Các phương pháp thích nghi ở bài sau cũng thay đổi tỷ lệ tọa độ, nhưng có cơ chế và bảo đảm khác; không đồng nhất chúng với Newton.

**Điểm dễ nhầm.** $W\approx H$ là một quyết định mô hình hoặc tính toán, không phải đẳng thức bắt buộc. Câu “hội tụ tuyến tính” phải nêu đại lượng; dưới định lý bên dưới, đó là sai số mục tiêu $f(x^{(k)})-p^*$.

**Câu hỏi kiểm tra.** Với $W=\operatorname{diag}(2,8)$ và $g=(4,8)^T$, hãy giải $Wd=-g$ mà không lập nghịch đảo.

### Định lý: tốc độ tuyến tính của gradient với bước $1/M$

**Giả thiết.** $f$ khả vi, $\mu$-lồi mạnh và có gradient $M$-Lipschitz; $0<\mu\le M$. Cập nhật

$$
x^+=x-\frac1M\nabla f(x).
$$

**Kết luận.** Với mọi $k$,

$$
f(x^{(k)})-p^*
\le
\left(1-\frac\mu M\right)^k
\bigl(f(x^{(0)})-p^*\bigr).
$$

::: proof
Bổ đề giảm cho hàm $M$-trơn cho

$$
f\left(x-\frac1Mg\right)
\le f(x)-\frac1{2M}\|g\|_2^2.
$$

Tính lồi mạnh cho cận Polyak–Łojasiewicz trong trường hợp này:

$$
\|g\|_2^2\ge2\mu(f(x)-p^*).
$$

Thế vào bất đẳng thức giảm,

$$
f(x^+)-p^*
\le
\left(1-\frac\mu M\right)(f(x)-p^*).
$$

Lặp bất đẳng thức theo $k$ cho kết luận. Hệ số phụ thuộc $\kappa=M/\mu$; định lý không được suy chỉ từ tính lồi.
:::

## C. Newton không ràng buộc

### 7. Mô hình bậc hai, hướng Newton và độ giảm Newton

**Mục tiêu đọc hiểu.** Người đọc suy ra được hệ Newton từ mô hình Taylor bậc hai và phân biệt mức giảm dự báo với sai số mục tiêu thật.

**Định nghĩa và giả thiết.** Tại $x$, đặt $g=\nabla f(x)$ và $H=\nabla^2f(x)\succ0$. Mô hình bậc hai theo độ dời $v$ là

$$
m_x(v)=f(x)+g^Tv+\frac12v^THv.
$$

Hướng Newton $\Delta x_N$ là cực tiểu duy nhất của mô hình, nên được tính bằng hệ

$$
H\Delta x_N=-g.
$$

Độ giảm Newton được định nghĩa bởi

$$
\delta_N(x)^2
=-g^T\Delta x_N
=\Delta x_N^TH\Delta x_N.
$$

Mức giảm của mô hình từ $v=0$ đến $v=\Delta x_N$ là $\delta_N^2/2$.

**Trực quan.** Gradient cho độ nghiêng; Hessian đổi tỷ lệ theo độ cong. Bước Newton đi tới đáy của mô hình bậc hai cục bộ, không nhất thiết tới đáy của hàm thật.

![Hàm thật và mô hình Taylor bậc hai tiếp xúc tại điểm hiện tại; cực tiểu của mô hình xác định bước Newton.](img/lec-04/newton-model.svg)

::: example
**Ví dụ tính được.** Với bậc hai xuyên suốt,

$$
\begin{bmatrix}1&0\\0&10\end{bmatrix}
\Delta x_N
=-
\begin{bmatrix}10\\10\end{bmatrix},
$$

nên

$$
\Delta x_N=(-10,-1)^T,
\qquad
x^{(0)}+\Delta x_N=0=x^*.
$$

Đồng thời

$$
\delta_N^2=110,
\qquad
\frac{\delta_N^2}{2}=55=f(x^{(0)})-p^*.
$$

Đẳng thức cuối đúng vì mô hình Newton chính là hàm bậc hai này.
:::

**Ý nghĩa và ứng dụng trong AI.** Newton tự chọn một chuẩn cục bộ từ Hessian và có thể sửa điều kiện hóa mạnh hơn gradient. Đổi lại, chi phí lập hoặc tác động Hessian và giải hệ có thể lớn đối với mô hình nhiều tham số.

**Điểm dễ nhầm.** Không triển khai Newton bằng cách lập $H^{-1}$. Nếu $H$ không xác định dương, nghiệm hệ có thể không phải hướng giảm. $\delta_N^2/2$ là giảm dự báo, không mặc định bằng $f(x)-p^*$.

**Câu hỏi kiểm tra.** Nếu $g^T\Delta x_N=-8$, hãy tính $\delta_N^2$ và mức giảm dự báo của mô hình.

### Mệnh đề: cực tiểu mô hình và các đồng nhất của độ giảm Newton

**Giả thiết.** $H\in\mathbb S_{++}^n$.

**Kết luận.** Mô hình $m_x$ có cực tiểu duy nhất $\Delta x_N$ thỏa $H\Delta x_N=-g$, và

$$
m_x(0)-m_x(\Delta x_N)=\frac12\delta_N^2.
$$

::: proof
Gradient của mô hình theo $v$ là $g+Hv$. Vì $H\succ0$, điều kiện $g+Hv=0$ cho cực tiểu duy nhất. Nhân hệ Newton bên trái với $\Delta x_N^T$ cho

$$
\Delta x_N^TH\Delta x_N=-g^T\Delta x_N=\delta_N^2.
$$

Thế $g^T\Delta x_N=-\delta_N^2$ và $\Delta x_N^TH\Delta x_N=\delta_N^2$ vào mô hình:

$$
m_x(\Delta x_N)
=f(x)-\delta_N^2+\frac12\delta_N^2
=f(x)-\frac12\delta_N^2.
$$

Do $m_x(0)=f(x)$, kết luận theo sau.
:::

### Định lý: bước Newton và độ giảm Newton bất biến qua đổi tọa độ affine khả nghịch

**Giả thiết.** $x=Ty+c$ với $T\in\mathbb R^{n\times n}$ khả nghịch, và $\widetilde f(y)=f(Ty+c)$.

**Kết luận.** Nếu $\Delta y_N$ là bước Newton của $\widetilde f$ tại $y$, thì

$$
T\Delta y_N=\Delta x_N,
\qquad
\widetilde\delta_N(y)=\delta_N(x).
$$

::: proof
Quy tắc dây chuyền cho

$$
\widetilde g=T^Tg,
\qquad
\widetilde H=T^THT.
$$

Hệ Newton trong biến $y$ là

$$
T^THT\Delta y_N=-T^Tg.
$$

Nhân với $T^{-T}$ cho $H(T\Delta y_N)=-g$. Tính duy nhất của nghiệm hệ cho $T\Delta y_N=\Delta x_N$. Cuối cùng,

$$
\widetilde\delta_N^2
=-\widetilde g^T\Delta y_N
=-g^TT\Delta y_N
=-g^T\Delta x_N
=\delta_N^2.
$$
:::

### 8. Thuật toán Newton, hai pha và triển khai

**Mục tiêu đọc hiểu.** Người đọc thực hiện được một vòng Newton đầy đủ, nêu đúng giả thiết của hội tụ bậc hai và chọn được cách giải hệ phù hợp.

**Định nghĩa và giả thiết.** Thuật toán Newton với quay lui thực hiện:

1. tại $x^{(k)}$, tính $g_k,H_k$;
2. giải $H_k\Delta x_k=-g_k$;
3. dừng nếu $\delta_N(x^{(k)})^2/2\le\varepsilon$ trong phạm vi bảo đảm;
4. chọn $t_k$ bằng quay lui Armijo dọc $\Delta x_k$;
5. cập nhật $x^{(k+1)}=x^{(k)}+t_k\Delta x_k$.

Một phát biểu hai pha điển hình giả sử $f$ lồi mạnh trên tập mức, Hessian Lipschitz trên tập này và quay lui dùng tham số phù hợp. Gần nghiệm, $H_k\succ0$ và bước đầy đủ được nhận.

**Trực quan.** Xa nghiệm, quay lui làm bước ngắn để đạt mức giảm an toàn. Trong lân cận Newton, mô hình bậc hai đủ chính xác, bước đầy đủ được nhận và số chữ số đúng tăng nhanh.

![Hai pha của Newton trên trục log sai số: pha tắt dần trước khi chuyển sang pha hội tụ bậc hai.](img/lec-04/newton-phases.svg)

::: example
**Ví dụ tính được.** Xét

$$
\phi(s)=s-\log s,
\qquad s>0,
\qquad s_0=\frac12.
$$

Ta có

$$
\phi'(s_0)=-1,
\qquad
\phi''(s_0)=4.
$$

Giải $4\Delta s_N=1$ cho

$$
\Delta s_N=\frac14,
\qquad
s_1=\frac34,
\qquad
\delta_N(s_0)^2=\frac14.
$$

Nghiệm thật là $s^*=1$, nên khác ví dụ bậc hai, một bước đầy đủ chưa đến nghiệm. Phần hàm tự điều chỉnh sẽ dùng lại ví dụ này.
:::

**Ý nghĩa và ứng dụng trong AI.** Newton phù hợp với các mô hình trơn có số biến vừa phải hoặc có cấu trúc Hessian khai thác được. Với bài toán lớn, có thể dùng toán tử Hessian–véc-tơ hoặc bộ giải lặp, nhưng phân tích chi tiết thuộc tài liệu nâng cao.

**Điểm dễ nhầm.** Hội tụ bậc hai là phát biểu cục bộ về sai số, không phải “mục tiêu giảm bình phương” ở mọi vòng. Nếu Hessian suy biến hoặc bất định, tuyến bảo đảm lồi này không áp dụng trực tiếp. Bước giảm $1/(1+\delta_N)$ của hàm tự điều chỉnh ở phần kế tiếp là một cơ chế riêng, không đồng nhất với quay lui Armijo.

**Câu hỏi kiểm tra.** Với $\phi$ ở trên, hãy so sánh $\delta_N(s_0)^2/2$ với sai số thật $\phi(s_0)-\phi(1)$. Hai số có bằng nhau không, và điều đó minh họa cảnh báo nào?

### Định lý: hội tụ bậc hai cục bộ của Newton

**Giả thiết.** Trong một lân cận lồi của nghiệm $x^*$, $\nabla^2f(x)\succeq\mu I$ với $\mu>0$ và Hessian là $L_H$-Lipschitz. Xét bước Newton đầy đủ $x^+=x+\Delta x_N$ nằm trong lân cận đó.

**Kết luận.** Sai số thỏa

$$
\|x^+-x^*\|_2
\le
\frac{L_H}{2\mu}\|x-x^*\|_2^2.
$$

::: proof
**Phác thảo.** Vì $\nabla f(x^*)=0$,

$$
\nabla f(x)
=\int_0^1\nabla^2f(x^*+\tau(x-x^*))(x-x^*)\,d\tau.
$$

Dùng đẳng thức $x^+=x-H(x)^{-1}\nabla f(x)$ trong chứng minh, trừ $x^*$ và gom các Hessian cho

$$
x^+-x^*
=H(x)^{-1}
\int_0^1
\bigl(H(x)-H(x^*+\tau(x-x^*))\bigr)
(x-x^*)\,d\tau.
$$

Cận dưới $H(x)\succeq\mu I$ cho $\|H(x)^{-1}\|_2\le1/\mu$. Tính Lipschitz cho hiệu Hessian không vượt quá $L_H(1-\tau)\|x-x^*\|_2$. Lấy chuẩn và tích phân $\int_0^1(1-\tau)d\tau=1/2$ cho kết luận.

Nghịch đảo chỉ dùng để viết đẳng thức và lấy cận chuẩn trong chứng minh. Khi triển khai, ta vẫn giải hệ $H(x)\Delta x_N=-\nabla f(x)$.

Định lý là cục bộ. Quay lui và pha tắt dần được dùng để đưa dãy lặp vào lân cận nơi bước đầy đủ cùng cận trên hợp lệ.
:::

### Ghi chú triển khai: giải hệ thay vì lập nghịch đảo

Nếu $H\succ0$ và ma trận hiện rõ, Cholesky là lựa chọn tự nhiên. Với Hessian thưa hoặc có cấu trúc khối, cần khai thác cấu trúc. Trong mọi trường hợp nên theo dõi phần dư tuyến tính

$$
r_{\mathrm{lin}}=H\Delta x_N+g
$$

và điều kiện hóa của hệ. Không mô tả phép lập $H^{-1}$ như một bước thuật toán.

## D. Hàm tự điều chỉnh và bảo đảm theo độ giảm Newton

### 9. Hàm tự điều chỉnh

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được tính tự điều chỉnh trên một đường, tính độ giảm Newton và nêu đủ giả thiết trước khi dùng các cận theo độ giảm.

**Định nghĩa và giả thiết.** Một hàm lồi $\phi:I\to\mathbb R$, với $I\subseteq\mathbb R$ là một khoảng mở, được gọi là **tự điều chỉnh chuẩn** nếu $\phi$ khả vi ba lần và

$$
|\phi'''(s)|\le 2\phi''(s)^{3/2}
$$

với mọi $s\in I$. Cho $f:\operatorname{dom}f\to\mathbb R$ lồi, với $\operatorname{dom}f\subseteq\mathbb R^n$ mở và lồi, và $f\in C^3(\operatorname{dom}f)$. Hàm $f$ là tự điều chỉnh chuẩn nếu hạn chế $t\mapsto f(x+tv)$ thỏa bất đẳng thức trên trên mọi đoạn của đường thẳng nằm trong miền. Khi $f$ lồi chặt, $\nabla^2f(x)\succ0$ và nghiệm tồn tại, độ giảm Newton là

$$
\delta_N(x)^2
=-\nabla f(x)^T\Delta x_N,
\qquad
\nabla^2f(x)\Delta x_N=-\nabla f(x).
$$

**Trực quan.** Đạo hàm cấp hai đo độ cong cục bộ; đạo hàm cấp ba đo tốc độ thay đổi của độ cong. Bất đẳng thức tự điều chỉnh buộc độ cong không thay đổi quá nhanh so với chính độ lớn hiện tại của nó. Vì vậy, độ giảm Newton vừa đo kích thước bước trong hình học Hessian, vừa cho biết khi nào mô hình bậc hai đã đủ tin cậy.

**Ví dụ tính được.** Xét

$$
\phi(s)=s-\log s,\qquad s>0.
$$

Ta có

$$
\phi'(s)=1-\frac1s,\qquad
\phi''(s)=\frac1{s^2},\qquad
\phi'''(s)=-\frac2{s^3}.
$$

Do đó $|\phi'''(s)|=2\phi''(s)^{3/2}$ với mọi $s>0$. Tại $s_0=1/2$, phương trình Newton là $4\Delta s_N=1$, nên

$$
\Delta s_N=\frac14,\qquad
s_1=\frac34,\qquad
\delta_N(s_0)^2=\frac14.
$$

Nghiệm duy nhất là $s^*=1$. Ví dụ này cho thấy bước Newton vẫn nằm trong miền, nhưng đây không phải hệ quả tự động cho mọi điểm và mọi hàm tự điều chỉnh.

![Đồ thị của phi bằng s trừ log s, mô hình bậc hai tại s bằng một phần hai, bước Newton tới ba phần tư và tỷ số tự điều chỉnh bằng hai.](img/lec-04/self-concordant-curvature.svg)

**Ví dụ nhiều chiều: hàm chắn log.** Cho $a_i\in\mathbb R^n$, $b_i\in\mathbb R$, $m\in\mathbb N$ và giả thiết miền trong $\{x:a_i^Tx<b_i,\ \forall i\}$ khác rỗng. Đặt

$$
\Phi(x)=-\sum_{i=1}^{m}\log(b_i-a_i^Tx).
$$

Hàm này được dựng bằng hai phép hợp: ánh xạ affine $x\mapsto b_i-a_i^Tx$ đưa miền trong về $\mathbb R_{++}^{m}$, rồi hợp với $-\log$ theo từng thành phần và lấy tổng. Vì hợp affine và tổng đều bảo toàn tính tự điều chỉnh chuẩn, $\Phi$ là hàm tự điều chỉnh chuẩn; nhân với hệ số $c\ge1$ vẫn giữ dạng chuẩn. Phát biểu này chỉ là nhận dạng lớp hàm, không phải một định lý hội tụ mới.

Mỗi số $b_i-a_i^Tx$ là khoảng cách có dấu tới một biên affine, chưa chuẩn hóa theo $\|a_i\|_2$. Khi điểm tiến sát biên thứ $i$ từ phía trong, hạng $-\log(b_i-a_i^Tx)$ tiến tới $+\infty$; gradient và Hessian vì thế phản ứng mạnh hơn với những biên đang ở gần.

**Ý nghĩa và ứng dụng trong AI.** Với các bài toán ước lượng xác suất, mô hình entropy và tối ưu nón, độ giảm Newton cung cấp một tiêu chuẩn dừng gắn với sai số mục tiêu thay vì chỉ dựa vào độ lớn gradient theo tọa độ.

**Điểm dễ nhầm.** Tính tự điều chỉnh không tự bảo đảm nghiệm tồn tại, Hessian xác định dương hay Newton hội tụ từ mọi điểm. Với dạng chuẩn, tổng và hợp affine được bảo toàn; nhân một hàm với hệ số $a\ge1$ vẫn giữ dạng chuẩn, nhưng không được mở rộng phát biểu này cho mọi $a>0$. Nếu $\delta_N<1$ và các giả thiết trên được thỏa thì

$$
f(x)-p^*\le -\delta_N-\log(1-\delta_N),
$$

nhưng cận này không áp dụng vô điều kiện.

**Câu hỏi kiểm tra.** Với $\phi(s)=s-\log s$, hãy tính $\delta_N(1/2)$ và kiểm tra trực tiếp bất đẳng thức tự điều chỉnh tại $s=1/2$.

## E. Newton với ràng buộc đẳng thức

### 10. Không gian hạt nhân và khử đẳng thức

**Mục tiêu đọc hiểu.** Người đọc tham số hóa được toàn bộ tập $Ax=b$ bằng một cơ sở của không gian hạt nhân và giải bài toán rút gọn.

**Định nghĩa và giả thiết.** Xét bài toán

$$
\operatorname*{minimize}_{x\in\mathbb R^n} f(x)
\qquad\text{với}\qquad Ax=b,
$$

trong đó $A\in\mathbb R^{p\times n}$, $\operatorname{rank}A=p<n$, và tồn tại một điểm $\hat x$ thỏa $A\hat x=b$. Chọn $F\in\mathbb R^{n\times(n-p)}$ có các cột tạo thành một cơ sở của $\operatorname{null}A$. Khi đó mọi điểm khả thi và chỉ các điểm khả thi đều viết được dưới dạng

$$
x=Fz+\hat x,\qquad z\in\mathbb R^{n-p}.
$$

Bài toán được rút về cực tiểu $\widetilde f(z)=f(Fz+\hat x)$ không ràng buộc.

**Trực quan.** Tập $\{x:Ax=b\}$ là một không gian affine đi qua $\hat x$. Các cột của $F$ mô tả mọi hướng tiếp tuyến không làm thay đổi $Ax$. Biến $z$ là tọa độ nội tại trên không gian khả thi, nên cập nhật theo $Fz$ không thể rời khỏi đẳng thức.

**Ví dụ tính được.** Với

$$
f(x)=\frac12(x_1^2+4x_2^2),\qquad x_1+x_2=1,
$$

chọn $\hat x=(1,0)^T$ và $F=(-1,1)^T$. Khi đó

$$
x=(1-z,z)^T,\qquad
\widetilde f(z)=\frac12\big((1-z)^2+4z^2\big).
$$

Do $\widetilde f'(z)=-1+5z$, ta được $z^*=1/5$ và

$$
x^*=\left(\frac45,\frac15\right)^T,\qquad p^*=\frac25.
$$

![Các đường mức của hàm mục tiêu, đường thẳng x một cộng x hai bằng một, cơ sở không gian hạt nhân và nghiệm tiếp xúc trên đường khả thi.](img/lec-04/equality-nullspace.svg)

**Ý nghĩa và ứng dụng trong AI.** Khử đẳng thức phù hợp khi số ràng buộc nhỏ, có thể dựng một cơ sở hạt nhân ổn định và muốn tối ưu trực tiếp trên không gian tham số hợp lệ. Ví dụ gồm hệ số có tổng bằng một, ràng buộc bảo toàn khối lượng và các tham số tương phản có tổng bằng không.

**Điểm dễ nhầm.** $F$ không phải ma trận nghịch đảo của $A$ và thường không duy nhất. Công thức $x=Fz+\hat x$ cần cả $AF=0$ lẫn $A\hat x=b$. Trong tính toán lớn, dựng tường minh một cơ sở hạt nhân có thể làm mất tính thưa; hệ Newton–KKT ở chủ đề sau là một lựa chọn khác.

**Câu hỏi kiểm tra.** Với $A=[1\ 1]$, vì sao $F=(1,-1)^T$ và $F=(-1,1)^T$ đều hợp lệ? Hai lựa chọn này có làm thay đổi nghiệm $x^*$ không?

### 11. Newton–KKT từ điểm khả thi

**Mục tiêu đọc hiểu.** Người đọc lập được hệ Newton–KKT từ một điểm đang khả thi, kiểm tra bước giữ đẳng thức và dùng đúng tiêu chuẩn dừng.

**Định nghĩa và giả thiết.** Giả sử $f$ khả vi hai lần, điểm hiện tại $x$ thỏa $Ax=b$, đặt $g=\nabla f(x)$ và $H=\nabla^2f(x)$. Hướng Newton khả thi là nghiệm của

$$
\begin{bmatrix}
H&A^T\\
A&0
\end{bmatrix}
\begin{bmatrix}
\Delta x\\
\eta
\end{bmatrix}
=-
\begin{bmatrix}
g\\
0
\end{bmatrix}.
$$

Nếu $\operatorname{rank}A=p$ và $H$ xác định dương trên $\operatorname{null}A$, hệ có nghiệm duy nhất. Điều kiện $A\Delta x=0$ giữ mọi điểm thử $x+t\Delta x$ khả thi.

**Trực quan.** Newton không còn cực tiểu mô hình bậc hai trên toàn $\mathbb R^n$ mà chỉ trên không gian tiếp tuyến $A\Delta x=0$. Biến phụ $\eta$ tạo lực pháp tuyến $A^T\eta$ để cân bằng gradient của mô hình; nó không phải là một bước cập nhật nhân tử khi thuật toán chỉ duy trì biến $x$.

**Ví dụ tính được.** Tại $x^{(0)}=(1/2,1/2)^T$ trong ví dụ trên,

$$
g=\left(\frac12,2\right)^T,\qquad H=\operatorname{diag}(1,4).
$$

Giải

$$
\begin{bmatrix}1&0&1\\0&4&1\\1&1&0\end{bmatrix}
\begin{bmatrix}\Delta x_1\\\Delta x_2\\\eta\end{bmatrix}
=-
\begin{bmatrix}1/2\\2\\0\end{bmatrix}
$$

thu được

$$
\Delta x=\left(\frac3{10},-\frac3{10}\right)^T,\qquad
\eta=-\frac45.
$$

Ta kiểm tra $A\Delta x=0$ và $x^{(0)}+\Delta x=(4/5,1/5)^T=x^*$.

Trong hình khử ràng buộc bằng không gian hạt nhân ở trên, $\Delta x$ nằm dọc đường khả thi, còn $A^T\eta$ vuông góc với đường này. Hai hướng tạo cách đọc hình học của hệ Newton–KKT.

**Ý nghĩa và ứng dụng trong AI.** Hệ KKT cho phép giữ chính xác các ràng buộc tuyến tính trong hồi quy, hiệu chỉnh và ước lượng có bảo toàn. Việc giải một hệ tuyến tính đối xứng bất định thường khai thác tốt cấu trúc thưa hơn so với dựng cơ sở hạt nhân.

**Điểm dễ nhầm.** Không lập nghịch đảo của $H$ hay của ma trận KKT; cần dùng một bộ giải hệ phù hợp như phân rã LDLT hoặc bổ Schur. Trong chế độ điểm đầu khả thi, $\eta$ là biến phụ của bước, không gọi là $\Delta\nu$. Đại lượng dừng

$$
\delta_{\mathrm{eq}}^2
=\Delta x^TH\Delta x
=-g^T\Delta x
$$

chỉ có diễn giải trên không gian khả thi dưới các giả thiết độ cong đã nêu.

**Câu hỏi kiểm tra.** Từ hàng khối thứ hai của hệ, hãy chứng minh $A(x+t\Delta x)=b$ với mọi $t$ nếu $Ax=b$.

### 12. Newton từ điểm không khả thi

**Mục tiêu đọc hiểu.** Người đọc tuyến tính hóa hệ phần dư KKT, tính một bước nguyên thủy–đối ngẫu và chọn tiêu chuẩn dừng khi điểm đầu chưa khả thi.

**Định nghĩa và giả thiết.** Khi chưa có điểm thỏa $Ax=b$, đặt phần dư đối ngẫu và phần dư nguyên thủy

$$
r_d(x,\nu)=\nabla f(x)+A^T\nu,
\qquad
r_p(x)=Ax-b.
$$

Newton được áp dụng cho hệ phương trình $r_d=0$, $r_p=0$ bằng cách giải

$$
\begin{bmatrix}
H&A^T\\
A&0
\end{bmatrix}
\begin{bmatrix}
\Delta x\\
\Delta\nu
\end{bmatrix}
=-
\begin{bmatrix}
r_d\\
r_p
\end{bmatrix}.
$$

Điểm thử phải nằm trong $\operatorname{dom}f$; tìm kiếm đường được thực hiện trên một hàm đo phần dư phù hợp.

**Trực quan.** Một thành phần của bước sửa điều kiện dừng, thành phần còn lại kéo điểm về không gian affine. Khác với chế độ khả thi, quỹ đạo có thể đi ngoài $Ax=b$ trong các vòng đầu; điều cần giảm đồng thời là hai sai lệch $r_d$ và $r_p$.

**Ví dụ tính được.** Khởi đầu từ $x^{(0)}=(0,0)^T\in\mathbb R^2$ và $\nu^{(0)}=0\in\mathbb R$ cho bài toán bậc hai. Ta có

$$
r_d=(0,0)^T,\qquad r_p=-1.
$$

Giải

$$
\begin{bmatrix}1&0&1\\0&4&1\\1&1&0\end{bmatrix}
\begin{bmatrix}\Delta x_1\\\Delta x_2\\\Delta\nu\end{bmatrix}
=-
\begin{bmatrix}0\\0\\-1\end{bmatrix}
$$

cho

$$
\Delta x=\left(\frac45,\frac15\right)^T,\qquad
\Delta\nu=-\frac45.
$$

Vì bài toán là bậc hai với đẳng thức affine, bước đầy đủ đến đúng $(x^*,\nu^*)$.

Panel bên phải của hình khử ràng buộc bằng không gian hạt nhân biểu diễn $r_p$ như độ lệch khỏi đường $Ax=b$ và phân biệt bước từ điểm khả thi với bước khởi đầu không khả thi.

**Ý nghĩa và ứng dụng trong AI.** Khởi đầu không khả thi hữu ích khi khó dựng một nghiệm thỏa chính xác các ràng buộc cân bằng, hoặc khi bài toán được giải lặp lại với dữ liệu và ràng buộc thay đổi. Hai phần dư cũng cung cấp nhật ký chẩn đoán: mô hình có thể gần dừng nhưng còn vi phạm ràng buộc, hoặc ngược lại.

**Điểm dễ nhầm.** $\|r_d\|_2$ nhỏ không kéo theo $\|r_p\|_2$ nhỏ. Cần dừng bằng hai ngưỡng riêng,

$$
\|r_d\|_2\le\varepsilon_d,
\qquad
\|r_p\|_2\le\varepsilon_p.
$$

Không dùng $\delta_{\mathrm{eq}}^2/2$ làm tiêu chuẩn duy nhất khi điểm chưa khả thi. Tìm kiếm quay lui cũng phải bảo đảm điểm thử còn thuộc miền của $f$.

Cụ thể, đặt $r=(r_d^T,r_p^T)^T\in\mathbb R^{n+p}$. Với $\alpha\in(0,1/2)$ và $\beta\in(0,1)$, bắt đầu từ $t=1$ và lặp $t\leftarrow\beta t$ cho đến khi điểm thử thuộc miền, $x+t\Delta x\in\operatorname{dom}f$, và

$$
\|r(x+t\Delta x,\nu+t\Delta\nu)\|_2\le(1-\alpha t)\,\|r(x,\nu)\|_2.
$$

Đây là bất đẳng thức quay lui theo chuẩn phần dư; điều kiện điểm thử thuộc $\operatorname{dom}f$ là bắt buộc vì phần dư đối ngẫu chứa $\nabla f(x)$.

**Câu hỏi kiểm tra.** Nếu $r_d=0$ nhưng $r_p\ne0$, vì sao chưa thể dừng? Hàng khối thứ hai của hệ Newton sửa $r_p$ như thế nào khi nhận bước đầy đủ?

## F. Ca tổng hợp trong AI và bản đồ lựa chọn

### 13. Hồi quy trơn với tổng hệ số bằng một

**Mục tiêu đọc hiểu.** Người đọc chuyển một mô hình hồi quy có tổng hệ số cố định thành hệ Newton–KKT và chọn chế độ khởi đầu cùng tiêu chuẩn dừng phù hợp.

**Định nghĩa và giả thiết.** Cho $X\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$ và $w\in\mathbb R^n$. Xét

$$
\operatorname*{minimize}_{w\in\mathbb R^n}
\quad \frac12\|Xw-y\|_2^2
\qquad\text{với}\qquad
\mathbf1^Tw=1.
$$

Gradient và Hessian là

$$
g(w)=X^T(Xw-y),
\qquad H=X^TX.
$$

Nếu

$$
\operatorname{null}(X)\cap\operatorname{null}(\mathbf1^T)=\{0\},
$$

thì $H$ xác định dương trên các hướng khả thi khác $0$, hệ Newton–KKT khả nghịch và nghiệm $w^*$ là duy nhất.

**Trực quan.** Các tập mức của mất mát là các elipxoit hoặc trụ elipxoit; ràng buộc tổng hệ số cắt chúng bởi một siêu phẳng affine. Nghiệm là điểm trên siêu phẳng có mất mát nhỏ nhất. Điều kiện hạt nhân loại trừ một hướng khả thi mà dự đoán $Xw$ không thay đổi.

**Ví dụ tính được.** Chọn

$$
X=\begin{bmatrix}1&0\\0&2\end{bmatrix},\qquad
y=\begin{bmatrix}0\\0\end{bmatrix},\qquad
\mathbf1^Tw=1.
$$

Khi đó bài toán trở thành

$$
\min\ \frac12(w_1^2+4w_2^2)
\qquad\text{với}\qquad w_1+w_2=1.
$$

Từ $w^{(0)}=(1/2,1/2)^T$, Newton khả thi cho

$$
\Delta w=\left(\frac3{10},-\frac3{10}\right)^T,\qquad
w^*=\left(\frac45,\frac15\right)^T.
$$

Ta kiểm tra $\mathbf1^Tw^*=1$ và mất mát tối ưu bằng $2/5$.

Hình khử ràng buộc bằng không gian hạt nhân áp dụng trực tiếp sau phép thay $x\leftrightarrow w$, $A\leftrightarrow\mathbf1^T$ và $H\leftrightarrow X^TX$.

**Ý nghĩa và ứng dụng trong AI.** Ràng buộc tổng bằng một xuất hiện trong tổ hợp mô hình, trọng số danh mục, nội suy và một số mô hình hỗn hợp (mixture model). Điều kiện hạt nhân quyết định tính duy nhất; trạng thái điểm đầu quyết định hệ Newton–KKT và tiêu chuẩn dừng cần dùng.

**Điểm dễ nhầm.** $X$ không cần có hạng cột đầy đủ trên toàn $\mathbb R^n$ để nghiệm trên siêu phẳng là duy nhất; điều cần là không có hướng khác $0$ đồng thời thuộc $\operatorname{null}X$ và $\operatorname{null}(\mathbf1^T)$. Ràng buộc tổng bằng một không tự buộc $w_i\ge0$; thêm không âm sẽ tạo bất đẳng thức và nằm ngoài phạm vi Bài 04.

**Câu hỏi kiểm tra.** Nếu tồn tại $v\ne0$ sao cho $Xv=0$ và $\mathbf1^Tv=0$, điều gì xảy ra với dự đoán và mất mát dọc đường $w+tv$? Có thể còn khẳng định nghiệm duy nhất không?

## Các định lý và chứng minh quan trọng — Nhóm D

### Mệnh đề: $s-\log s$ là hàm tự điều chỉnh chuẩn

**Giả thiết.** $\phi(s)=s-\log s$ trên miền $s>0$.

**Kết luận.** $\phi$ lồi chặt, tự điều chỉnh chuẩn và có nghiệm duy nhất $s^*=1$.

::: proof
Ta có $\phi''(s)=1/s^2>0$, nên $\phi$ lồi chặt. Hơn nữa,

$$
|\phi'''(s)|=\frac2{s^3}
=2\left(\frac1{s^2}\right)^{3/2}
=2\phi''(s)^{3/2}.
$$

Do đó bất đẳng thức tự điều chỉnh đạt dấu bằng trên toàn miền. Phương trình $\phi'(s)=1-1/s=0$ có nghiệm duy nhất $s=1$. Tính lồi chặt biến điểm dừng này thành nghiệm cực tiểu duy nhất.
:::

### Định lý: cận sai số theo độ giảm Newton

**Giả thiết.** $f$ tự điều chỉnh chuẩn, lồi chặt, có $\nabla^2f(x)\succ0$ trên miền và đạt giá trị tối ưu $p^*$. Tại $x$, độ giảm Newton thỏa $\delta_N(x)<1$.

**Kết luận.** Sai số mục tiêu được chặn bởi

$$
f(x)-p^*\le\omega_*(\delta_N)
=-\delta_N-\log(1-\delta_N).
$$

Chứng minh đầy đủ cần các bất đẳng thức một chiều của hàm tự điều chỉnh. Ghi chú này dùng kết luận dưới đúng các giả thiết đã nêu; khi áp dụng phải kiểm tra cả sự tồn tại của nghiệm và điều kiện $\delta_N<1$.

### Phác thảo: hai pha của Newton cho hàm tự điều chỉnh

**Giả thiết.** Các giả thiết của định lý trên được thỏa và bước tắt dần được chọn theo $t=1/(1+\delta_N)$ khi độ giảm Newton còn lớn.

**Kết luận.** Pha tắt dần cho mức giảm ít nhất

$$
\omega(\delta_N)=\delta_N-\log(1+\delta_N).
$$

Khi độ giảm Newton đủ nhỏ, bước đầy đủ được nhận và độ giảm Newton kế tiếp bị chặn theo bậc hai.

**Ý tưởng chứng minh.** Hạn chế $f$ lên đường Newton, dùng bất đẳng thức tự điều chỉnh để chặn biến thiên của đạo hàm cấp hai, rồi tích phân các chặn một chiều. Cùng phép chặn tạo cận giảm ở xa nghiệm và truy hồi bậc hai ở gần nghiệm. Không suy kết luận này chỉ từ tính lồi trơn.

## Các định lý và chứng minh quan trọng — Nhóm E

### Định lý: tham số hóa đầy đủ tập nghiệm của đẳng thức

**Giả thiết.** $A\in\mathbb R^{p\times n}$ có hạng hàng đầy đủ, $p<n$; $A\hat x=b$; các cột của $F\in\mathbb R^{n\times(n-p)}$ tạo một cơ sở của $\operatorname{null}A$.

**Kết luận.** Ta có

$$
\{x\in\mathbb R^n:Ax=b\}
=\{Fz+\hat x:z\in\mathbb R^{n-p}\}.
$$

::: proof
Nếu $x=Fz+\hat x$ thì

$$
Ax=AFz+A\hat x=0+b=b,
$$

nên $x$ khả thi. Ngược lại, nếu $Ax=b$ thì $A(x-\hat x)=0$, do đó $x-\hat x\in\operatorname{null}A$. Vì các cột của $F$ là một cơ sở của không gian này, tồn tại duy nhất $z\in\mathbb R^{n-p}$ sao cho $x-\hat x=Fz$. Suy ra $x=Fz+\hat x$.
:::

### Định lý: hệ Newton–KKT tương đương cực tiểu mô hình trên hướng khả thi

**Giả thiết.** $H\in\mathbb S^n$ xác định dương trên $\operatorname{null}A$, và $A$ có hạng hàng đầy đủ. Xét mô hình

$$
q(d)=g^Td+\frac12d^THd
$$

trên tập $Ad=0$.

**Kết luận.** Hướng $\Delta x$ là nghiệm duy nhất của bài toán trên khi và chỉ khi tồn tại $\eta\in\mathbb R^p$ sao cho

$$
H\Delta x+A^T\eta=-g,
\qquad A\Delta x=0.
$$

::: proof
Đây là bài toán lồi chặt trên không gian khả thi vì $d^THd>0$ với mọi $d\in\operatorname{null}A\setminus\{0\}$. Điều kiện dừng của hàm Lagrange

$$
q(d)+\eta^TAd
$$

là $g+Hd+A^T\eta=0$, cùng với $Ad=0$. Các điều kiện này đủ do mô hình lồi chặt trên tập khả thi, và nghiệm $d$ là duy nhất. Ngược lại, nghiệm duy nhất thỏa điều kiện dừng vì các ràng buộc đẳng thức có gradient độc lập.
:::

### Định lý: điều kiện khả nghịch của ma trận Newton–KKT

**Giả thiết.** $A\in\mathbb R^{p\times n}$ có hạng hàng đầy đủ và $H\in\mathbb S^n$ xác định dương trên $\operatorname{null}A$.

**Kết luận.** Ma trận

$$
K=\begin{bmatrix}H&A^T\\A&0\end{bmatrix}
$$

khả nghịch.

::: proof
Giả sử $K(v,u)^T=0$. Khi đó

$$
Hv+A^Tu=0,\qquad Av=0.
$$

Nhân phương trình đầu với $v^T$ và dùng $Av=0$ cho

$$
v^THv+v^TA^Tu=v^THv+(Av)^Tu=v^THv=0.
$$

Do $v\in\operatorname{null}A$ và $H$ xác định dương trên không gian này, ta có $v=0$. Khi đó $A^Tu=0$. Hạng hàng đầy đủ của $A$ làm $A^T$ đơn ánh, nên $u=0$. Hạt nhân của $K$ chỉ chứa véc-tơ không; vì $K$ vuông nên $K$ khả nghịch.
:::

### Mệnh đề: bước không khả thi là Newton cho hệ phần dư KKT

**Giả thiết.** $f$ khả vi hai lần và đặt

$$
R(x,\nu)=
\begin{bmatrix}
\nabla f(x)+A^T\nu\\
Ax-b
\end{bmatrix}.
$$

**Kết luận.** Phương trình Newton $DR(x,\nu)[\Delta x;\Delta\nu]=-R(x,\nu)$ chính là hệ Newton–KKT không khả thi.

::: proof
Đạo hàm của $R$ theo $(x,\nu)$ là ma trận khối

$$
DR(x,\nu)=
\begin{bmatrix}
\nabla^2f(x)&A^T\\
A&0
\end{bmatrix}.
$$

Thay vào phương trình Newton cho đúng hệ phần dư đã nêu ở trên. Vì vậy, hai phần dư không phải hai tiêu chuẩn ghép tùy ý; chúng là hai khối của cùng một hệ phương trình cần giải.
:::

## Các định lý và chứng minh quan trọng — Nhóm F

### Hệ quả: tính duy nhất của hồi quy trên siêu phẳng

**Giả thiết.** Xét bài toán hồi quy có ràng buộc tổng bằng một đã nêu và giả sử

$$
\operatorname{null}(X)\cap\operatorname{null}(\mathbf1^T)=\{0\}.
$$

Tập khả thi khác rỗng.

**Kết luận.** Mất mát lồi chặt trên mọi đường khả thi; bài toán có nhiều nhất một nghiệm. Với mất mát bình phương và siêu phẳng affine khác rỗng, nghiệm tồn tại, nên nghiệm là duy nhất.

::: proof
Mọi hướng khả thi $v$ thỏa $\mathbf1^Tv=0$. Với $v\ne0$, giả thiết cho $Xv\ne0$, nên

$$
v^TX^TXv=\|Xv\|_2^2>0.
$$

Do đó Hessian xác định dương trên không gian hướng khả thi, và mất mát lồi chặt khi hạn chế lên siêu phẳng, nên bài toán có nhiều nhất một nghiệm. Sau khi tham số hóa siêu phẳng bằng $w=Fz+\hat w$, hạng bậc hai theo $z$ có Hessian $F^TX^TXF\succ0$; hàm cưỡng bức (coercive) theo $z$ và đạt một nghiệm. Nghiệm này là duy nhất.
:::

## Bản đồ tổng hợp

| Tình huống | Hướng hoặc hệ cần giải | Chọn bước | Tiêu chuẩn dừng | Điều kiện cần kiểm tra |
|---|---|---|---|---|
| Gradient theo chuẩn Euclid | $d=-\nabla f(x)$ | tìm kiếm đường chính xác hoặc Armijo | $\|\nabla f(x)\|_2$ nhỏ | bảo đảm tuyến tính cần chặn Hessian và quy tắc bước phù hợp |
| Giảm dốc nhất theo chuẩn $W$ | giải $Wd=-\nabla f(x)$ | tìm kiếm đường chính xác hoặc Armijo | chuẩn đối ngẫu của gradient nhỏ | $W\succ0$; không lập $W^{-1}$ |
| Newton không ràng buộc | giải $H\Delta x_N=-g$ | quay lui; bước đầy đủ gần nghiệm | $\delta_N^2/2\le\varepsilon$ khi giả thiết phù hợp | $H\succ0$ trên tuyến lồi; miền của $f$ |
| Newton đẳng thức, điểm đầu khả thi | giải hệ KKT với vế phải $-(g,0)$ | quay lui trên đường khả thi | $\delta_{\mathrm{eq}}^2/2\le\varepsilon$ | $Ax=b$, $\operatorname{rank}A=p$, $H\succ0$ trên $\operatorname{null}A$ |
| Newton đẳng thức, điểm đầu chưa khả thi | giải hệ phần dư với vế phải $-(r_d,r_p)$ | quay lui giảm phần dư và giữ miền | $\|r_d\|_2\le\varepsilon_d$, $\|r_p\|_2\le\varepsilon_p$ | hệ KKT khả nghịch; điểm thử thuộc $\operatorname{dom}f$ |

Chuỗi quyết định của Bài 04 là:

$$
\text{mô hình và giả thiết}
\longrightarrow
\text{hướng hoặc hệ tuyến tính}
\longrightarrow
\text{tìm bước}
\longrightarrow
\text{cập nhật}
\longrightarrow
\text{chứng nhận dừng}.
$$

Bài 03 cung cấp điều kiện KKT như một chứng nhận tối ưu. Bài 04 dùng khối đẳng thức của KKT như một hệ số để tính bước Newton. Bài 05 sẽ thay mô hình lồi trơn xác định bằng cảnh quan phi lồi và gradient có nhiễu; các chủ đề minibatch, momentum và tối ưu học sâu chưa được đưa vào đây.

## Tài liệu tham khảo

1. Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press, Chương 9, đặc biệt các mục 9.2–9.6 về phương pháp giảm, gradient, Newton và hàm tự điều chỉnh.
2. Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press, Chương 10, đặc biệt các mục 10.1–10.3 về cực tiểu có ràng buộc đẳng thức và Newton từ điểm không khả thi.
3. Stephen Boyd và Pablo Parrilo (giảng viên), MIT 6.079/6.975 *Introduction to Convex Optimization*, Fall 2009, Lecture 16, “Unconstrained minimization”, nguồn nội dung và thứ tự cho gradient, Newton và hàm tự điều chỉnh; giấy phép CC BY-NC-SA 4.0.
4. Stephen Boyd và Pablo Parrilo (giảng viên), MIT 6.079/6.975 *Introduction to Convex Optimization*, Fall 2009, Lecture 17, “Equality constrained minimization”, nguồn nội dung và thứ tự cho khử đẳng thức, hệ Newton–KKT và hai chế độ khởi đầu; giấy phép CC BY-NC-SA 4.0.
