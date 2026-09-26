# Bài 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

**Liên kết với bộ trang chiếu.** Bảng dưới đây nối bảy phần của bộ trang chiếu với phần giải thích và bài tập tương ứng. Các chứng minh mở rộng làm rõ giả thiết và kết luận của từng phương pháp.

| Mạch | Tên khái niệm | Trang mở đầu | Mục ghi chú | Bài tập |
|---|---|---|---|---|
| 1 | Điều kiện Karush–Kuhn–Tucker (KKT) và nhiệm vụ tính | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/1/1) | Mục A | — |
| 2 | Hướng giảm, bước và thước đo | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/2/1) | Mục B | Bài 1, Bài 2 |
| 3 | Newton không ràng buộc | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/3/1) | Mục C | Bài 3, Bài 4 |
| 4 | Newton khả thi và khử biến | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/4/1) | Mục D | Bài 5 |
| 5 | Newton phần dư từ điểm chưa khả thi | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/5/1) | Mục E | Bài 6 |
| 6 | Tính tự điều chỉnh và cận sai số | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/6/1) | Mục F | Bài 7 |
| 7 | Tổng hợp và chuyển giao vào mô hình học | [Mở phần](lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html#/7/1) | Mục G | Bài 8 |

Luyện tập theo từng phần trong [tập bài tập](material-viewer.html?doc=materials/lec-04/exercises.md&deck=lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html).

## A. Điều kiện KKT và nhiệm vụ tính

Các điều kiện tối ưu của Bài 03 là cơ sở để xây dựng bước lặp. Mỗi phương pháp cần xác định hướng, độ dài bước, phép cập nhật, tiêu chuẩn dừng và các giả thiết bảo đảm hội tụ.

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

trong đó $A\in\mathbb R^{p\times n}$ và $b\in\mathbb R^p$. Các ví dụ số được đồng bộ với trang chiếu: bậc hai tại $(2,4)$, hàm log tại $1/4$, và đẳng thức tổng bằng $14$. Các phần chứng minh mở rộng dưới đây là tài liệu tự học. Nguồn chính là Boyd và Vandenberghe (2004), Chương 9–10, cùng bài giảng 16–17 của MIT 6.079. Bài 05 sẽ thay gradient toàn lô xác định bằng thông tin từ dữ liệu hoặc lô nhỏ và xét cảnh quan phi lồi; các bảo đảm của bài này khi đó không còn áp dụng nguyên dạng.

### KKT từ Bài 03: hai dạng và vai trò trong bài này

Hai dạng điều kiện KKT từ Bài 03 xác định hệ phương trình tối ưu cho các phương pháp trong bài này.

Giả sử $f$ khả vi trên miền mở chứa điểm đang xét. Với bài toán không ràng buộc, điều kiện cần tại điểm tối ưu là

$$
\nabla f(x)=0.
$$

Với bài toán có ràng buộc đẳng thức $Ax=b$, điều kiện cần là hệ

$$
\nabla f(x)+A^T\nu=0,
\qquad
Ax=b,
$$

trong đó $\nu\in\mathbb R^p$ là nhân tử Lagrange, và $\nu$ không bị ràng buộc dấu. Khác với Bài 03, nơi nhân tử $\lambda$ của ràng buộc bất đẳng thức phải không âm, phần đẳng thức của bài này không đặt ràng buộc dấu cho $\nu$.

KKT mô tả điều kiện tại nghiệm; một phương pháp tính cần bổ sung mô hình cục bộ, cách chọn bước, phép cập nhật và tiêu chuẩn dừng. Phần B chọn hướng bằng mô hình hoặc quả cầu đơn vị; phần C chọn mô hình bậc hai từ Hessian; phần D và E xử lý hai phương trình KKT có đẳng thức.

Cần phân biệt hai chiều suy luận của Bài 03. Với bài toán lồi, một điểm thỏa KKT là nghiệm tối ưu toàn cục; chiều đủ này không cần Slater. Trong bài toán tổng quát, một điều kiện chính quy thích hợp bảo đảm chiều cần: cực tiểu thỏa KKT. Bản thân điều kiện chính quy không phải điều kiện cần để một điểm thỏa KKT. Với ràng buộc affine ở đây, hạng hàng đầy đủ của $A$ là giả thiết đủ thuận tiện để có nhân tử duy nhất và hệ Newton khả nghịch khi Hessian xác định dương. Ngược lại, KKT không tự chọn mô hình hay thuật toán, và cũng không tự chứng minh hội tụ; các bảo đảm tốc độ cần giả thiết riêng ở từng định lý.

Trong toàn bài này, ký hiệu $g$ là gradient $\nabla f(x)$ tại điểm hiện hành; nó khác hàm đối ngẫu $g(\lambda,\nu)$ ở Bài 03.

**Đối chiếu với Bài 03.** Cho $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$, $w\in\mathbb R^d$ và $\tau>0$. Xét lại bài toán hồi quy

$$
\min_w\;\frac12\|Xw-y\|_2^2
\quad\text{với}\quad \|w\|_2^2\le\tau.
$$

Hàm Lagrange là $L(w,\lambda)=\tfrac12\|Xw-y\|_2^2+\lambda(\|w\|_2^2-\tau)$. Lấy đạo hàm theo $w$ và đặt bằng không cho

$$
(X^TX+2\lambda I)w=X^Ty,
$$

trong đó $\lambda\ge0$ là nhân tử của ràng buộc chuẩn. Với $X=I_2$, $y=(3,4)^T$, $\tau=1$ và $\lambda=2$, hệ cho $w=(3/5,4/5)^T$. Ta kiểm được $\|w\|_2^2=1$, $\lambda(\|w\|_2^2-\tau)=0$ và giá trị hàm mất mát bằng $8$. Như vậy nghiệm đã thỏa cả bốn nhóm KKT. Bài này dùng cùng thao tác lập Lagrange và giải điều kiện dừng cho những bài toán con xác định bước đi tại điểm hiện hành.

## B. Hướng giảm, bước và thước đo

### Khuôn phương pháp giảm

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
**Ví dụ tính được.** Xét $f(x)=\tfrac12(3x_1^2+7x_2^2)$ với $x^0=(2,4)^T$ trên $\mathbb R^2$.
$$
H=\operatorname{diag}(3,7),\qquad g=(6,28)^T,\qquad f(x^0)=62,\qquad \|g\|_2^2=820.
$$
Nghiệm duy nhất là $x^*=0$, $f^*=0$. Điều kiện $g(x^*)=0$ nhận biết nghiệm, nhưng chưa tạo một phép cập nhật từ $x^0$.
:::

**Ý nghĩa và ứng dụng trong AI.** Huấn luyện một mô hình trơn cũng phải chỉ rõ hướng cập nhật, tốc độ học, phép đánh giá và tiêu chuẩn dừng. Chỉ viết “cực tiểu hóa mất mát” chưa đủ để tái lập quy trình.

**Điểm dễ nhầm.** Tính lồi và khả vi không tự cho một tốc độ hội tụ. Giả thiết $S$ đóng là bổ sung, không tự suy ra chỉ từ tính liên tục trên một miền mở. Một chuẩn gradient nhỏ chỉ là kiểm tra gần dừng; để đổi nó thành cận sai số mục tiêu cần thêm giả thiết như lồi mạnh.

**Câu hỏi:** Trong công thức cập nhật, đại lượng nào quyết định phương, đại lượng nào quyết định độ dài, và vì sao không thể bỏ kiểm tra $x^{(k+1)}\in\operatorname{dom}f$?

### Bài toán con bậc hai và dẫn xuất hướng $-g$

**Mục tiêu đọc hiểu.** Người đọc dẫn xuất được hướng gradient từ một bài toán con tối ưu, thay vì chấp nhận công thức $d=-g$ như một quy ước.

**Định nghĩa và giả thiết.** Tại $x\in\operatorname{dom}f$ với $g=\nabla f(x)$, lập mô hình bậc hai theo độ dời $d$ quanh $x$:

$$
Q_I(d)=f(x)+g^Td+\frac{\|d\|_2^2}{2}.
$$

Lấy đạo hàm theo $d$:

$$
\nabla_d Q_I(d)=g+d.
$$

Đặt $\nabla_d Q_I(d)=0$ cho $d=-g$. Đây chính là điều kiện KKT (không ràng buộc) của bài toán con $\min_d Q_I(d)$; vì $I\succ0$, nghiệm là cực tiểu duy nhất. Vậy hướng gradient cân bằng mức giảm tuyến tính $g^Td$ với chi phí độ dời $\|d\|_2^2/2$. Chọn mô hình này là quyết định thiết kế; KKT giải mô hình sau khi nó đã được chọn.


### Hướng giảm và xấp xỉ bậc nhất

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được một hướng có làm giảm hàm với bước đủ nhỏ hay không và chỉ ra điểm dùng tính khả vi.

**Định nghĩa và giả thiết.** Tại $x\in\operatorname{dom}f$, đặt $g=\nabla f(x)$. Một vectơ $d$ là **hướng giảm** nếu tồn tại $\bar t>0$ sao cho

$$
f(x+td)<f(x)
$$

với mọi $t\in(0,\bar t]$ mà $x+td\in\operatorname{dom}f$. Điều kiện kiểm tra quen thuộc là

$$
g^Td<0.
$$

**Trực quan.** Gradient vuông góc với đường mức theo hình học Euclid. Hướng tạo góc tù với gradient có đạo hàm theo hướng âm; tiếp tuyến bậc nhất nghiêng xuống theo hướng đó.

::: example
**Ví dụ tính được.** Tại $x^0=(2,4)^T$, chọn $d=-g=(-6,-28)^T$. Khi đó $g^Td=-820<0$. Hàm trên tia là
$$
f(x^0+td)=62-820t+2798t^2.
$$
Hạng tuyến tính âm làm hàm giảm với $t>0$ đủ nhỏ; hạng bậc hai giải thích vì sao bước dài có thể làm hàm tăng.
:::

**Ý nghĩa và ứng dụng trong AI.** Tích $g^Td$ là phép kiểm tra rẻ trước khi tìm bước. Nó giúp phát hiện một hướng Newton hoặc hướng đã tiền điều kiện không còn là hướng giảm do Hessian không xác định dương.

**Điểm dễ nhầm.** $g^Td<0$ chỉ bảo đảm giảm với bước đủ nhỏ, không bảo đảm bước $t=1$. Nếu $g=0$, không tồn tại hướng có tích âm; điều đó chỉ cho một điểm dừng, không tự chứng minh cực tiểu toàn cục ngoài bài toán lồi.

**Câu hỏi:** Với $g=(2,-1)^T$, hãy kiểm tra hai hướng $d_1=(-1,0)^T$ và $d_2=(1,1)^T$. Hướng nào là hướng giảm?

### Tìm kiếm đường chính xác và quay lui Armijo

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

**Trực quan.** Tìm kiếm chính xác xác định cực tiểu của hàm một chiều trên tia. Armijo dựng một đường ngưỡng; quay lui co bước cho đến khi đồ thị thật nằm dưới đường này.

![Đường cong mục tiêu theo độ dài bước và đường Armijo; bước một và một phần hai bị loại, bước một phần tư được nhận.](img/lec-04/armijo-window.svg)

::: example
**Ví dụ tính được.** Với $d=(-6,-28)^T$, $\alpha=1/10$, $\beta=1/2$, ngưỡng Armijo là $62-82t$.

| Bước $t$ | Điểm thử $x^0+td$ | Giá trị hàm | Ngưỡng Armijo | Quyết định |
|---:|---|---:|---:|---|
| $1$ | $(-4,-24)^T$ | $2040$ | $-20$ | loại |
| $1/2$ | $(-1,-10)^T$ | $703/2$ | $21$ | loại |
| $1/4$ | $(1/2,-3)^T$ | $255/8$ | $83/2$ | nhận |

Bước đầu tiên được nhận là $1/4$. Tìm kiếm chính xác sẽ cho $t=205/1399$ từ đạo hàm của $62-820t+2798t^2$, nhưng Armijo không cần phép giải đó.
:::

**Ý nghĩa và ứng dụng trong AI.** Quay lui thay một tốc độ học cố định bằng một phép kiểm tra mức giảm tại chỗ. Nó phù hợp với bài toán xác định, trơn và có thể đánh giá mục tiêu; Bài 05 sẽ giải thích vì sao cùng phép kiểm tra không được chuyển nguyên dạng sang gradient lô nhỏ có nhiễu.

**Điểm dễ nhầm.** Armijo không tìm bước tốt nhất trên tia. Tham số $\beta$ là hệ số co, không phải độ dài bước cố định. Tìm kiếm chính xác thường tốn kém và công thức đóng $205/1399$ chỉ thuộc ví dụ bậc hai này.

**Câu hỏi:** Nếu bắt đầu từ $t=1$ với $\beta=1/2$ và bước đầu tiên được nhận là $1/8$, đã thực hiện bao nhiêu lần co?

### Phương pháp gradient và điều kiện hóa

**Mục tiêu đọc hiểu.** Người đọc thực hiện được một bước gradient, đọc được số điều kiện và giải thích được quỹ đạo dao động của một hàm bậc hai.

**Định nghĩa và giả thiết.** Phương pháp gradient chọn

$$
d=-g=-\nabla f(x)
$$

rồi dùng tìm kiếm đường hoặc một bước đã được bảo đảm. Theo chuẩn Euclid, đây là hướng giảm dốc nhất. Với một bậc hai $H\succ0$, số điều kiện phổ là

$$
\kappa_2(H)=\frac{\lambda_{\max}(H)}{\lambda_{\min}(H)}.
$$

Số điều kiện lớn nghĩa là độ cong thay đổi mạnh theo hướng; một bước vô hướng phải thỏa hiệp giữa hướng phẳng và hướng dốc.

**Trực quan.** Trên elip dẹt, gradient gần vuông góc với trục dài. Bước gradient dễ vượt qua vị trí cực tiểu theo hướng cong lớn, rồi đổi phía ở vòng kế tiếp; tiến triển theo hướng phẳng chậm hơn.

![Quỹ đạo gradient với bước cố định một phần tư; tọa độ thứ hai đổi dấu và co theo hệ số ba phần tư.](img/lec-04/gradient-fixed-step.svg)

::: example
**Ví dụ tính được.** Với $H=\operatorname{diag}(3,7)$, số điều kiện là $7/3$. Để quan sát dao động bằng một công thức dễ tính, dùng **bước cố định** $t=1/4$:
$$
x_1^{k+1}=\tfrac14 x_1^k,\qquad x_2^{k+1}=-\tfrac34 x_2^k.
$$
Từ $x^0=(2,4)^T$, suy ra
$$
x^k=\bigl(2(1/4)^k,\;4(-3/4)^k\bigr)^T.
$$
Tọa độ thứ hai đổi dấu qua từng vòng. Đây là quỹ đạo bước cố định; bảng Armijo trước đó chỉ khẳng định bước $1/4$ được nhận ở vòng đầu, không khẳng định mọi vòng quay lui đều trả cùng bước.
:::

**Ý nghĩa và ứng dụng trong AI.** Điều kiện hóa kém làm các tham số có thang hoặc độ cong khác nhau học với tốc độ rất khác. Đây là lý do thực hành cho chuẩn thích nghi, tiền điều kiện và, trong Bài 05, động lượng (momentum); nó không phải bằng chứng rằng mục tiêu phi lồi đã được giải quyết.

**Điểm dễ nhầm.** Hai gradient liên tiếp trực giao dưới tìm kiếm chính xác trên bậc hai không có nghĩa quỹ đạo đi thẳng tới nghiệm. Công thức $t_k=g_k^Tg_k/(g_k^THg_k)$ không áp dụng cho hàm tổng quát. Số điều kiện phụ thuộc chuẩn và tọa độ.

**Câu hỏi:** Theo truy hồi trên, sau hai vòng độ lớn mỗi tọa độ đã nhân với hệ số nào?

### Chuẩn bậc hai, tiền điều kiện và hướng giảm dốc nhất

**Mục tiêu đọc hiểu.** Người đọc suy ra được hướng giảm dốc nhất không chuẩn hóa theo một chuẩn bậc hai, xuất phát từ nhu cầu hai độ cong $3$ và $7$ cùng trực quan elip.

**Nhu cầu.** Trong ví dụ bậc hai xuyên suốt, hai hệ số độ cong là $3$ và $7$: một bước vô hướng theo chuẩn Euclid phải thỏa hiệp giữa hai thang này. Chọn $W=\operatorname{diag}(3,7)$ nghĩa là đo độ dài hướng theo chính độ cong của từng tọa độ, tức đổi đơn vị đo theo hai hệ số đó.

**Trực quan.** Quả cầu chuẩn $W$ trở thành elip trong tọa độ Euclid. Nếu elip này khớp đường mức, hướng dốc nhất bớt dao động giữa các phía.

**Định nghĩa và giả thiết.** Cho $W\in\mathbb S_{++}^n$ và

$$
\|v\|_W=(v^TWv)^{1/2}.
$$

Mục tiêu là suy ra hướng giảm dốc nhất không chuẩn hóa theo chuẩn $\|\cdot\|_W$ từ bài toán con chuẩn hóa đơn vị. Nếu $g=0$, chọn $d=0$ và dừng; sau đây giả sử $g\ne0$. Xét

$$
\operatorname*{minimize}_{v}\; g^Tv
\quad\text{với ràng buộc}\quad
v^TWv\le1.
$$

Hàm Lagrange là

$$
L_s(v,\zeta)=g^Tv+\zeta\,(v^TWv-1).
$$

Bài toán con lồi vì mục tiêu tuyến tính và $W\succ0$; $v=0$ thỏa nghiêm ràng buộc. Do đó có thể dùng KKT để tìm và kiểm chứng nghiệm tối ưu. Bốn nhóm điều kiện là:

1. điều kiện dừng: $g+2\zeta Wv=0$;
2. khả thi gốc: $v^TWv\le1$;
3. khả thi đối ngẫu: $\zeta\ge0$;
4. bù trừ: $\zeta\,(v^TWv-1)=0$.

Vì $g\ne0$, nếu $\zeta=0$ thì điều kiện thứ nhất cho $g=0$, vô lý; vậy $\zeta>0$, và bù trừ buộc nghiệm nằm trên biên $v^TWv=1$. Từ điều kiện thứ nhất, $v=-\frac{1}{2\zeta}W^{-1}g$; thế vào ràng buộc biên cho

$$
\frac{g^TW^{-1}g}{4\zeta^2}=1
\quad\Longrightarrow\quad
2\zeta=\|g\|_{W^{-1}}=(g^TW^{-1}g)^{1/2}.
$$

Suy ra hướng chuẩn hóa $v=-W^{-1}g/\|g\|_{W^{-1}}$.

Hệ số đổi độ dài của hướng là đại lượng $\|g\|_{W^{-1}}=(g^TW^{-1}g)^{1/2}$. Chuẩn đối ngẫu của chuẩn $\|\cdot\|_W$ được định nghĩa bằng phép lấy cực đại trong biểu thức dưới đây:

$$
\|g\|_{W^{-1}}=\max_{v^TWv\le1}\;g^Tv,
$$

tức giá trị lớn nhất của tích vô hướng $g^Tv$ trên quả cầu chuẩn $W$. Quả cầu chuẩn $W$ đối xứng qua gốc, nên $\max_{v^TWv\le1}g^Tv=-\min_{v^TWv\le1}g^Tv$. Bài toán con ở trên là bài toán cực tiểu; tại nghiệm vừa tìm, $g^Tv=-\sqrt{g^TW^{-1}g}$. Do đó giá trị cực đại là $\sqrt{g^TW^{-1}g}=2\zeta$, đúng bằng chuẩn đối ngẫu. Theo quy ước đổi độ dài của hướng giảm dốc nhất, hướng không chuẩn hóa là

$$
d=\|g\|_{W^{-1}}\,v=-W^{-1}g,
$$

tức đúng nghiệm của $Wd=-g$. Hướng này cũng là nghiệm của bài toán con bậc hai

$$
Q_W(d)=f(x)+g^Td+\frac12\,d^TWd,
$$

vì $\nabla_d Q_W(d)=g+Wd=0$ chính là điều kiện KKT của bài toán con lồi này.

Chọn $W$ gần Hessian làm đổi tỷ lệ theo độ cong; thao tác triển khai là giải hệ, không lập $W^{-1}$.

::: example
**Ví dụ tính được.** Tại $g=(6,28)^T$:

- Với $W=I$, hướng không chuẩn hóa là $d=(-6,-28)^T$, còn hướng đơn vị là $v_E=(-6,-28)^T/\sqrt{820}$.
- Với $W=\operatorname{diag}(3,7)$, giải $Wd=-g$ cho $d=(-2,-4)^T$; hướng đơn vị theo chuẩn này là $v_W=(-2,-4)^T/\sqrt{124}$.

Với $W=\operatorname{diag}(3,7)$, ta còn có $d^TWd=124$ và $Q_W(0)-Q_W(d)=62$. Bình phương độ dài theo chuẩn $W$ và mức giảm mô hình là hai đại lượng khác nhau. Hai tích $g^Td$ lần lượt là $-820$ và $-124$. Không dùng hai số này để kết luận hướng nào nhanh hơn khi độ dài hướng chưa được chuẩn hóa theo cùng cách. Trong ví dụ này $W=H$, nên hướng thứ hai trùng Newton; với $W$ khác Hessian thì nhìn chung không trùng.

:::

**Ý nghĩa và ứng dụng trong AI.** Tiền điều kiện có thể giảm ảnh hưởng của khác biệt đơn vị và độ cong. Các phương pháp thích nghi ở bài sau cũng thay đổi tỷ lệ tọa độ, nhưng có cơ chế và bảo đảm khác; không đồng nhất chúng với Newton.

**Điểm dễ nhầm.** $W\approx H$ là một quyết định mô hình hoặc tính toán, không phải đẳng thức bắt buộc. Câu “hội tụ tuyến tính” phải nêu đại lượng; dưới định lý bên dưới, đó là sai số mục tiêu $f(x^{(k)})-p^*$.

**Câu hỏi:** Với $W=\operatorname{diag}(2,8)$ và $g=(4,8)^T$, hãy giải $Wd=-g$ mà không lập nghịch đảo.


**Cơ sở lý thuyết cho hướng và bước.** Phần mở rộng này gồm ba nội dung: các chứng minh chi tiết, khái quát sang chuẩn bất kỳ và các bảo đảm hội tụ. Hai kết quả dưới đây chứng minh rằng mọi hướng có tích âm với gradient đều giảm hàm, và rằng quay lui Armijo luôn nhận được một bước sau hữu hạn lần co.

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


Bài toán chọn hướng trên quả cầu đơn vị còn áp dụng cho chuẩn bất kỳ. Các bảo đảm tốc độ cần thêm giả thiết về độ cong và quy tắc chọn bước.

### Giảm dốc nhất theo chuẩn tổng quát

**Mục tiêu đọc hiểu.** Người đọc định nghĩa được chuẩn đối ngẫu, phân biệt hướng đã chuẩn hóa với bước không chuẩn hóa và nhận ra gradient là trường hợp Euclid.

**Định nghĩa và giả thiết.** Cho một chuẩn $\|\cdot\|$ trên $\mathbb R^n$. Chuẩn đối ngẫu là

$$
\|g\|_*=\max_{\|v\|\le1}g^Tv.
$$

Một hướng giảm dốc nhất đã chuẩn hóa là

$$
v\in\operatorname*{argmin}_{\|v\|\le1}g^Tv.
$$

Hướng không chuẩn hóa theo quy ước của Boyd là

$$
d=\|g\|_*\,v.
$$

Với $g\ne0$, $v$ là hướng đã chuẩn hóa và $d$ là hướng không chuẩn hóa. Có một hướng khả thi cho giá trị âm, nên nghiệm tối ưu có $g^Tv<0$. Nếu nghiệm nằm trong quả cầu, $\|v\|<1$, thay nó bằng $v/\|v\|$ sẽ làm mục tiêu âm nhỏ hơn nữa. Do đó nghiệm phải nằm trên biên $\|v\|=1$. Khi $g=0$, dừng; không dùng công thức có phép chia cho chuẩn gradient.

**Trực quan.** Thay chuẩn nghĩa là thay quả cầu đơn vị dùng để đo độ dài hướng. Điểm trên biên quả cầu mà siêu phẳng tuyến tính $g^Tv$ chạm đầu tiên xác định hướng dốc nhất.

::: example
**Ví dụ tính được.** Với chuẩn Euclid,

$$
\|g\|_*=\|g\|_2,
\qquad
v=-\frac g{\|g\|_2},
\qquad
d=-g.
$$

Tại $g=(6,28)^T$, hướng không chuẩn hóa là $(-6,-28)^T$. Vì vậy phương pháp gradient chính là giảm dốc nhất theo chuẩn Euclid, không phải theo mọi chuẩn.
:::

**Ý nghĩa và ứng dụng trong AI.** Chuẩn được chọn phản ánh đơn vị, tỷ lệ hoặc cấu trúc của tham số. Vì vậy, hướng giảm dốc nhất phụ thuộc vào chuẩn dùng để đo độ dài.

**Điểm dễ nhầm.** Nếu bài toán $\operatorname*{argmin}$ có nhiều nghiệm, phải viết quan hệ thuộc thay vì một đẳng thức duy nhất. Độ lớn của hướng có thể được hấp thụ vào tìm kiếm đường; vì vậy phải công bố đang dùng hướng chuẩn hóa hay không chuẩn hóa.

**Câu hỏi:** Với $g=(3,4)^T$ và chuẩn Euclid, hãy tính $\|g\|_*$, $v$ và $d$.

### Định lý: đặc trưng hướng giảm dốc nhất bằng chuẩn đối ngẫu

**Giả thiết.** $g\ne0$ và $\|\cdot\|$ là một chuẩn trên không gian hữu hạn chiều.

**Kết luận.** Mọi $v$ như trên thỏa

$$
g^Tv=-\|g\|_*.
$$

Do đó $d=\|g\|_*v$ thỏa $g^Td=-\|g\|_*^2$.

::: proof
Theo định nghĩa chuẩn đối ngẫu, tồn tại $v^*$ với $\|v^*\|\le1$ sao cho $g^Tv^*=\|g\|_*$. Vì $g\ne0$, điểm cực đại nằm trên biên $\|v^*\|=1$ (cùng lập luận biên như trên). Đối xứng của quả cầu đơn vị cho $\|-v^*\|=1$ và

$$
g^T(-v^*)=-\|g\|_*.
$$

Mặt khác, với mọi $v$ có $\|v\|\le1$,

$$
g^Tv\ge-\|g\|_*
$$

do $-g^Tv\le\|g\|_*$. Vậy giá trị cực tiểu đúng bằng $-\|g\|_*$. Nhân hướng cực tiểu với $\|g\|_*$ cho đẳng thức thứ hai.
:::

### Định lý: tốc độ tuyến tính của gradient với bước $1/L$

**Giả thiết.** $f:\mathbb R^n\to\mathbb R$ khả vi, $\mu$-lồi mạnh và có gradient $L$-Lipschitz; $0<\mu\le L$. Cập nhật

$$
x^+=x-\frac1L\nabla f(x).
$$

**Kết luận.** Với mọi $k$,

$$
f(x^{(k)})-p^*
\le
\left(1-\frac\mu L\right)^k
\bigl(f(x^{(0)})-p^*\bigr).
$$

::: proof
Bổ đề giảm cho hàm $L$-trơn cho

$$
f\left(x-\frac1Lg\right)
\le f(x)-\frac1{2L}\|g\|_2^2.
$$

Tính lồi mạnh cho cận Polyak–Łojasiewicz trong trường hợp này:

$$
\|g\|_2^2\ge2\mu(f(x)-p^*).
$$

Thế vào bất đẳng thức giảm,

$$
f(x^+)-p^*
\le
\left(1-\frac\mu L\right)(f(x)-p^*).
$$

Lặp bất đẳng thức theo $k$ cho kết luận. Hệ số phụ thuộc $\kappa=L/\mu$; định lý không được suy chỉ từ tính lồi.

:::

Để có một bảo đảm tuyến tính cụ thể cho gradient Euclid, dùng giả thiết đủ trên toàn $\mathbb R^n$

$$
\mu I\preceq\nabla^2f(x)\preceq LI,
\qquad 0<\mu\le L,
$$

và dùng bước $t=1/L$. Hệ số co của cận sai số mục tiêu là $1-\mu/L=1-1/\kappa$, trong đó $\kappa=L/\mu$. Đại lượng này được xây từ hai hằng số toàn cục của hàm; cần phân biệt với $\kappa_2(H)=\lambda_{\max}(H)/\lambda_{\min}(H)$ của Hessian cụ thể trong ví dụ bậc hai xuyên suốt. Với $\mu=3$, $L=7$ và **bước $1/L=1/7$**, cận sai số mục tiêu là $f(x^k)-f^*\le(4/7)^k(f(x^0)-f^*)$; đây là một quy tắc bước khác với hình bước cố định $1/4$.

### Định lý: cận $O(1/k)$ của sai số mục tiêu

**Giả thiết.** $f:\mathbb R^n\to\mathbb R$ lồi, khả vi, có gradient $L$-Lipschitz với $L>0$ và đạt cực tiểu tại $x^*$. Dùng bước cố định $x^{k+1}=x^k-\nabla f(x^k)/L$.

**Kết luận.** Với $p^*=f(x^*)$ và mọi $k\ge1$,

$$
f(x^k)-p^*\le\frac{L\|x^0-x^*\|_2^2}{2k}.
$$

Đây là bảo đảm cho sai số mục tiêu. Tính lồi mạnh cho cận tuyến tính ở định lý trước; chỉ tính lồi và tính trơn chưa cho phép dùng hệ số $1-\mu/L$.

::: proof
Bổ đề giảm và tính lồi cho, với $g_j=\nabla f(x^j)$,

$$
f(x^{j+1})-p^*
\le g_j^T(x^j-x^*)-\frac{\|g_j\|_2^2}{2L}
=\frac L2\bigl(\|x^j-x^*\|_2^2-\|x^{j+1}-x^*\|_2^2\bigr).
$$

Cộng từ $j=0$ đến $k-1$, dùng $f(x^{j+1})\ge f(x^k)$ do bước $1/L$ làm hàm không tăng, suy ra $k(f(x^k)-p^*)\le L\|x^0-x^*\|_2^2/2$.
:::

## C. Newton không ràng buộc

### Mô hình bậc hai, hướng Newton và độ giảm Newton

**Mục tiêu đọc hiểu.** Người đọc tự lập được mô hình bậc hai quanh một điểm hiện hữu, suy ra hướng Newton từ điều kiện dừng của mô hình, và phân biệt rõ ba đại lượng thường bị nhầm: mức giảm mô hình, mức giảm thật sau một bước và sai số mục tiêu tại điểm đầu.

**Nhu cầu có mô hình độ cong.** Chuẩn cố định ở phần B điều chỉnh tỷ lệ giữa các hướng. Với hàm không bậc hai, độ cong còn thay đổi theo điểm. Ta dùng Hessian tại điểm hiện hành để dựng mô hình bậc hai khớp giá trị, gradient và độ cong của hàm thật, rồi giải điều kiện dừng của mô hình để đề xuất bước đi.

**Ví dụ dẫn nhập và mô hình tại một điểm.** Xét hàm một biến

$$
\varphi(s)=s-\log s,\qquad s>0,
$$

tại điểm xuất phát $s^0=\tfrac14$. Đạo hàm $\varphi'(s)=1-\tfrac1s$ cho $g=\varphi'(\tfrac14)=1-4=-3$, và đạo hàm hai $\varphi''(s)=\tfrac1{s^2}$ cho $H=\varphi''(\tfrac14)=16$.

![Hàm φ(s)=s−log s và mô hình bậc hai cục bộ tại s=1/4 với g=−3, H=16; cực tiểu của mô hình xác định bước Newton.](img/lec-04/phi-local-model.svg)

Mô hình bậc hai của $\varphi$ quanh $s^0$, theo độ dời $d$, là

$$
Q_H(d)=\varphi\bigl(\tfrac14\bigr)-3d+\tfrac12\cdot 16\,d^2
=\varphi\bigl(\tfrac14\bigr)-3d+8d^2.
$$

Cực tiểu của mô hình tìm bằng điều kiện dừng:

$$
Q_H'(d)=-3+16d=0
\quad\Longrightarrow\quad
16d=3
\quad\Longrightarrow\quad
d=\tfrac{3}{16},
$$

và điểm sau bước đầy đủ là $s^+=s^0+d=\tfrac14+\tfrac3{16}=\tfrac7{16}$. Kiểm tra lại bằng đạo hàm thật: $\varphi'(\tfrac7{16})=1-\tfrac{16}{7}=-\tfrac97<0$, tức gradient tại điểm mới vẫn âm và chưa triệt tiêu. Mô hình bậc hai chỉ khớp đạo hàm cấp một và cấp hai tại điểm xuất phát; sau khi di chuyển, độ cong thật đã khác, nên nghiệm của mô hình chỉ là bước đề xuất, không phải nghiệm của $\varphi$.

**Khái quát hóa sang nhiều biến.** Cho $f$ khả vi hai lần trên một miền mở của $\mathbb{R}^n$, tại điểm $x$ đặt $g=\nabla f(x)\in\mathbb{R}^n$ (vectơ cột) và $H=\nabla^2 f(x)\in\mathbb{R}^{n\times n}$ (ma trận đối xứng), với giả thiết $H\succ0$ tại điểm đang xét. Độ dời $d\in\mathbb{R}^n$ cùng kích thước với $g$. Mô hình bậc hai là

$$
Q_H(d)=f(x)+g^Td+\tfrac12 d^THd.
$$

Vì $H\succ0$, hàm $Q_H$ lồi chặt (còn gọi là lồi nghiêm ngặt) và có cực tiểu duy nhất. Điều kiện dừng của bài toán con $\min_d Q_H(d)$ là $g+Hd=0$, tức hệ

$$
Hd=-g.
$$

Đây là điều kiện KKT của bài toán con không ràng buộc với biến $d\in\mathbb R^n$. Nghiệm $d$ của hệ là cực tiểu của mô hình; kết quả này chưa xác định nghiệm của bài toán gốc $\min f$. Hai cách đọc cùng dẫn tới một hệ. Thứ nhất, hệ trên là điều kiện KKT của bài toán con như vừa nêu. Thứ hai, tuyến tính hóa gradient cho

$$
\nabla f(x+d)\approx g+Hd,
$$

và giải $g+Hd=0$ cho cùng hệ. Dấu $\approx$ ở đây là thiết yếu: nó phát biểu rằng gradient của hàm thật tại điểm lân cận được xấp xỉ bởi khai triển bậc nhất, chứ không phải đẳng thức. Hai cách đọc trùng nhau vì mô hình bậc hai là xấp xỉ bậc hai của $f$ quanh $x$.

**Độ giảm Newton và ba đại lượng.** Đặt hướng Newton $d_N$ là nghiệm của $Hd=-g$. Định nghĩa độ lớn Newton theo chuẩn Hessian:

$$
\delta_N=\sqrt{d_N^THd_N}\;\ge 0,
$$

và từ chính hệ Newton, thay $Hd_N=-g$ vào tích $d_N^THd_N$, suy ra

$$
\delta_N^2=d_N^THd_N=-g^Td_N.
$$

Mức giảm của mô hình từ $d=0$ đến $d=d_N$ là

$$
Q_H(0)-Q_H(d_N)=\tfrac12\,\delta_N^2,
$$

vì $Q_H(0)=f(x)$ và $Q_H(d_N)=f(x)-\delta_N^2/2$ theo các đẳng thức trên. Trong ví dụ $\varphi$: $\delta_N^2=-g\,d_N=3\cdot\tfrac3{16}=\tfrac9{16}$, nên $\delta_N=\tfrac34$ và mức giảm mô hình là $\tfrac12\cdot\tfrac9{16}=\tfrac9{32}$.

::: example
**Ví dụ tính được.** Xét $\varphi(s)=s-\log s$ trên $s>0$, tại $s^0=\tfrac14$. Ta có $g=-3$, $H=16$, mô hình $Q_H(d)=\varphi(\tfrac14)-3d+8d^2$, điều kiện dừng $-3+16d=0$ cho $d_N=\tfrac3{16}$, điểm sau bước đầy đủ $s^1=\tfrac7{16}$, và

$$
\delta_N^2=\tfrac9{16},\qquad \delta_N=\tfrac34.
$$

Ba đại lượng phải phân biệt là:

| Đại lượng | Giá trị |
|---|---:|
| Giảm dự đoán của mô hình | $\delta_N^2/2=9/32=0{,}28125$ |
| Sai số mục tiêu tại điểm đầu | $\varphi(1/4)-\varphi(1)=\log 4-3/4\approx0{,}636294$ |
| Giảm thật sau một bước | $\varphi(1/4)-\varphi(7/16)=\log(7/4)-3/16\approx0{,}372116$ |

Bước đầy đủ còn trong miền $s>0$ và được Armijo nhận với $\alpha=\tfrac1{10}$ vì giảm thật $\log(7/4)-3/16\approx0{,}372116$ lớn hơn ngưỡng $\alpha\delta_N^2=\tfrac9{160}=0{,}05625$. Kiểm tra lại bằng đạo hàm: $\varphi'(s)=1-1/s$, nên $\varphi'(\tfrac7{16})=1-\tfrac{16}{7}=-\tfrac97<0$, tức điểm $s^1=\tfrac7{16}$ vẫn có gradient âm và chưa dừng. Nghiệm $s^*=1$ chưa đạt sau bước này. Ngưỡng dừng $\varepsilon_{\mathrm{model}}$ đặt trên $\delta_N^2/2$ chỉ đo mức giảm của mô hình; nó chưa là cận trên của sai số mục tiêu nếu chưa có định lý chuyển sang sai số thật.
:::

**Trực quan.** Gradient cho độ nghiêng; Hessian đổi tỷ lệ theo độ cong. Bước Newton xác định cực tiểu của mô hình bậc hai cục bộ; điểm mới chưa nhất thiết là cực tiểu của hàm thật. Trong ví dụ $\varphi$, cực tiểu mô hình nằm ở $\tfrac7{16}$, còn cực tiểu của hàm thật nằm ở $1$.

**Đối chiếu với trường hợp bậc hai.** Với hàm bậc hai có Hessian xác định dương, mô hình trùng với hàm thật theo độ dời. Bước Newton đầy đủ đưa điểm hiện hành tới nghiệm, nên ba đại lượng vừa phân biệt có cùng giá trị.

::: example
**Ví dụ tính được.** Xét lại $f(x)=\tfrac12(3x_1^2+7x_2^2)$ tại $x^0=(2,4)^T$. Khi đó $H=\operatorname{diag}(3,7)$, $g=(6,28)^T$ và $f(x^0)=62$; giá trị nhỏ nhất là $f^*=0$ tại $x^*=0$. Hệ Newton là

$$
\begin{bmatrix}3&0\\0&7\end{bmatrix}d_N=-\begin{bmatrix}6\\28\end{bmatrix}.
$$

Vì vậy $d_N=(-2,-4)^T$, $x^0+d_N=0=x^*$. Ta có

$$
\delta_N^2=-g^Td_N=124,\qquad \delta_N^2/2=62=f(x^0)-f^*.
$$

Đẳng thức cuối đúng vì mô hình là chính hàm bậc hai và bước đầy đủ đi tới nghiệm. Với $\alpha=\tfrac1{10}$, Armijo nhận $t=1$ vì $0\le 62-124/10=49{,}6$.
:::

**Ý nghĩa và ứng dụng trong AI.** Newton tự chọn một chuẩn cục bộ từ Hessian và có thể sửa điều kiện hóa mạnh hơn gradient. Đổi lại, chi phí lập hoặc tác động Hessian và giải hệ có thể lớn đối với mô hình nhiều tham số.

**Điểm dễ nhầm.** Không triển khai Newton bằng cách lập $H^{-1}$. Nếu $H$ không xác định dương, nghiệm hệ có thể không phải hướng giảm. $\delta_N^2/2$ là giảm dự báo, không mặc định bằng $f(x)-p^*$. Ẩn của mô hình là độ dời $d_N$; điểm mới của bài toán gốc là $x+t d_N$. Với hàm bậc hai có Hessian xác định dương, bước đầy đủ bảo đảm $x+d_N=x^*$.

**Câu hỏi:** Nếu $g^Td_N=-8$, hãy tính $\delta_N^2$ và mức giảm dự báo của mô hình.

### Thuật toán Newton, hai pha và triển khai

**Mục tiêu đọc hiểu.** Người đọc thực hiện được một vòng Newton đầy đủ với các đầu vào và miền hợp lệ, nêu đúng giả thiết của hội tụ bậc hai, và chọn được cách giải hệ phù hợp.

**Định nghĩa và giả thiết.** Thuật toán Newton với quay lui yêu cầu các đầu vào: hàm mục tiêu $f$ khả vi hai lần trên miền mở, điểm xuất phát hợp lệ trong miền, dung sai mô hình $\varepsilon_{\mathrm{model}}>0$, tham số Armijo $\alpha\in(0,1/2)$ và hệ số co $\beta\in(0,1)$; tại mỗi vòng cần $H_k\succ0$ để bài toán con có nghiệm duy nhất. Ký hiệu độ dời tại vòng $k$ là $d_k$, dùng nhất quán xuyên suốt. Một vòng gồm:

1. tại $x^{(k)}$, tính $g_k=\nabla f(x^{(k)})$ và $H_k=\nabla^2 f(x^{(k)})$;
2. giải hệ $H_k d_k=-g_k$;
3. dừng nếu $\delta_N(x^{(k)})^2/2\le\varepsilon_{\mathrm{model}}$, với $\delta_N(x^{(k)})^2=-g_k^Td_k$; đây là dung sai mô hình, chưa tự là cận sai số mục tiêu;
4. chọn $t_k$ bằng quay lui Armijo dọc $d_k$;
5. cập nhật $x^{(k+1)}=x^{(k)}+t_k d_k$.

Một phát biểu hai pha điển hình giả sử $f$ lồi mạnh trên tập mức, Hessian Lipschitz trên tập này và quay lui dùng tham số phù hợp. Gần nghiệm, $H_k\succ0$ và bước đầy đủ được nhận. Bảo đảm hội tụ cần các giả thiết này ngoài việc giải đúng hệ tại từng vòng. Định lý ở cuối phần C chứng minh cận sai số bậc hai cho bước đầy đủ trong một lân cận của nghiệm.

**Trực quan.** Xa nghiệm, quay lui giảm độ dài bước cho đến khi thỏa điều kiện Armijo. Trong lân cận Newton, mô hình bậc hai đủ chính xác, bước đầy đủ được nhận và số chữ số đúng tăng nhanh.

![Hàm phi và mô hình bậc hai tại một phần tư; bước đầy đủ đến bảy phần mười sáu, chưa đến nghiệm một.](img/lec-04/phi-newton.svg)

**Ý nghĩa và ứng dụng trong AI.** Newton phù hợp với các mô hình trơn có số biến vừa phải hoặc có cấu trúc Hessian khai thác được. Với bài toán lớn, có thể dùng toán tử Hessian–vectơ hoặc bộ giải lặp, nhưng phân tích chi tiết thuộc tài liệu nâng cao.

**Điểm dễ nhầm.** Hội tụ bậc hai là phát biểu cục bộ về sai số, không phải "mục tiêu giảm bình phương" ở mọi vòng. Nếu Hessian suy biến hoặc bất định, tuyến bảo đảm lồi này không áp dụng trực tiếp. Bước giảm $1/(1+\delta_N)$ của hàm tự điều chỉnh ở phần F là một cơ chế riêng, không đồng nhất với quay lui Armijo.

**Câu hỏi:** Với $\varphi$ ở trên, hãy so sánh $\delta_N(s_0)^2/2$ với sai số thật $\varphi(s_0)-\varphi(1)$. Hai số có bằng nhau không, và điều đó minh họa cảnh báo nào?

### Ghi chú triển khai: giải hệ thay vì lập nghịch đảo

Nếu $H\succ0$ và ma trận hiện rõ, Cholesky là lựa chọn tự nhiên vì nó khai thác tính xác định dương với chi phí thấp và ổn định. Với Hessian thưa hoặc có cấu trúc khối, cần khai thác cấu trúc khi giải. Trong mọi trường hợp nên theo dõi phần dư tuyến tính

$$
r_{\mathrm{lin}}=Hd_N+g
$$

và điều kiện hóa của hệ. Phép lập $H^{-1}$ không phải bước triển khai của thuật toán. Về lựa chọn phương pháp: khi Hessian sẵn có và xác định dương với kích thước vừa phải, Newton thường cần ít vòng lặp hơn gradient; khi Hessian tốn kém để tính hoặc bất định, việc lựa chọn phương pháp cần xét lại chi phí và điều kiện tạo hướng giảm.

**Các tính chất của bước Newton.** Ba kết quả dưới đây lần lượt giải thích mức giảm mô hình, tính bất biến qua đổi tọa độ affine khả nghịch và hội tụ bậc hai cục bộ. Trong các chứng minh, $m_x(d)=Q_H(d)$ và $\Delta x_N=d_N$; $v$ chỉ là tên biến độ dời của mô hình, có cùng vai trò với $d$.

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

**Giả thiết.** Tại điểm xét, $H=\nabla^2f(x)\succ0$. Đặt $x=Ty+c$ với $T\in\mathbb R^{n\times n}$ khả nghịch, và $\widetilde f(y)=f(Ty+c)$.

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

## D. Newton khả thi và khử biến

**Ví dụ về yêu cầu giữ tính khả thi.** Xét bài toán cực tiểu $F(u)=\tfrac12(2u_1^2+5u_2^2)$ với ràng buộc $u_1+u_2=14$, tức $A=[1\ 1]$ và $b=14$. Xuất phát từ $u=(16,-2)^T$, ta có $g=(32,-10)^T$ và $H=\operatorname{diag}(2,5)$. Nếu bỏ ràng buộc, hướng Newton là $d=-H^{-1}g=(-16,2)^T$, đưa tới gốc $(0,0)^T$ và vi phạm điều kiện tổng bằng $14$. Vậy hướng bước phải giữ đẳng thức: với mọi bước $t$, điểm thử $u+td$ thỏa

$$
A(u+td)=Au+tAd=b+tAd,
$$

nên yêu cầu $Ad=0$. Điều kiện này ràng buộc hướng của mô hình bậc hai; hàm Lagrange $L_m$ dẫn tới hệ Newton khả thi.

### Newton–KKT từ điểm khả thi

**Mục tiêu đọc hiểu.** Người đọc lập được hệ Newton–KKT từ một điểm đang khả thi, kiểm tra bước giữ đẳng thức và dùng đúng tiêu chuẩn dừng.

**Định nghĩa và giả thiết.** Xét $\min_u F(u)$ với $Au=b$, trong đó $u,d\in\mathbb R^n$, $A\in\mathbb R^{p\times n}$ có hạng hàng đầy đủ, $p<n$, $b\in\mathbb R^p$. Giả sử $F$ khả vi hai lần trên miền mở, điểm hiện tại $u$ thỏa $Au=b$, đặt $g=\nabla F(u)$ và $H=\nabla^2F(u)\succ0$.

Hướng Newton không ràng buộc có thể vi phạm đẳng thức. Điều kiện khả thi của hướng được bổ sung vào mô hình bậc hai:

$$
\min_d\;g^Td+\frac12d^THd\quad\text{với}\quad Ad=0.
$$

Lập Lagrange với nhân tử $\eta\in\mathbb R^p$ tự do dấu:

$$
L_m(d,\eta)=g^Td+\frac12d^THd+\eta^TAd.
$$

Lấy đạo hàm theo từng biến cho hai phương trình KKT của mô hình:

$$
\nabla_dL_m=g+Hd+A^T\eta=0,
\qquad
\nabla_\eta L_m=Ad=0.
$$

Xếp hai phương trình thành hệ Newton khả thi:

$$
\begin{bmatrix}
H&A^T\\
A&0
\end{bmatrix}
\begin{bmatrix}
d\\
\eta
\end{bmatrix}
=-
\begin{bmatrix}
g\\
0
\end{bmatrix}.
$$

Với các giả thiết trên, hệ có nghiệm duy nhất. Không gian hạt nhân của $A$ được ký hiệu $\ker A=\operatorname{null}A=\{v:Av=0\}$. Kết quả khả nghịch ở cuối phần này dùng giả thiết rộng hơn: chỉ cần $H$ xác định dương trên $\operatorname{null}A$. Điều kiện $Ad=0$ giữ mọi điểm thử $u+td$ khả thi.

**Trực quan.** Newton không còn cực tiểu mô hình bậc hai trên toàn $\mathbb R^n$ mà chỉ trên không gian tiếp tuyến $Ad=0$. Biến phụ $\eta$ tạo lực pháp tuyến $A^T\eta$ để cân bằng gradient của mô hình; nó không phải là một bước cập nhật nhân tử khi thuật toán chỉ duy trì biến $u$.


**Ví dụ tính được.** Từ $u^0=(16,-2)^T$ với $F(u)=\tfrac12(2u_1^2+5u_2^2)$, ta có $g=(32,-10)^T$, $H=\operatorname{diag}(2,5)$ và $F(u^0)=266$.

Thế dữ kiện vào hệ vừa suy ra:

$$
\begin{bmatrix}2&0&1\\0&5&1\\1&1&0\end{bmatrix}
\begin{bmatrix}d_1\\d_2\\\eta\end{bmatrix}
=-\begin{bmatrix}32\\-10\\0\end{bmatrix}.
$$

Hàng cuối cho $d_2=-d_1$. Hai hàng đầu là $2d_1+\eta=-32$ và $5d_2+\eta=10$. Trừ hai phương trình rồi thế $d_2=-d_1$:

$$
2d_1-5d_2=-42
\quad\Longrightarrow\quad 7d_1=-42
\quad\Longrightarrow\quad d=(-6,6)^T,\quad\eta=-20.
$$

Kiểm tra $Ad=0$ và $Hd+g=(20,20)^T=-A^T\eta$. Mọi bước $u+td$ giữ đẳng thức vì $A(u+td)=Au+tAd=b$. Bước đầy đủ tới $u^*=(10,4)^T$, $F^*=140$. Bình phương độ giảm khả thi là $d^THd=252$; giảm mô hình $252/2=126$ bằng giảm thật $266-140$ vì hàm bậc hai.

![Bước -6,6 đi từ 16,-2 tới 10,4 trên đường tổng bằng 14.](img/lec-04/equality-feasible-step.svg)

**Ý nghĩa và ứng dụng trong AI.** Hệ KKT cho phép giữ chính xác các ràng buộc tuyến tính trong hồi quy, hiệu chỉnh và ước lượng có bảo toàn. Việc giải một hệ tuyến tính đối xứng bất định thường khai thác tốt cấu trúc thưa hơn so với dựng cơ sở hạt nhân.

**Điểm dễ nhầm.** Không lập nghịch đảo của $H$ hay của ma trận KKT; cần dùng một bộ giải hệ phù hợp như phân rã $LDL^T$ hoặc bổ Schur. Trong chế độ điểm đầu khả thi, $\eta$ là biến phụ của bước, không gọi là $\Delta\nu$. Đại lượng dừng

$$
\delta_{\mathrm{eq}}^2
=d^THd
=-g^Td
$$

chỉ có diễn giải trên không gian khả thi dưới các giả thiết độ cong đã nêu.

**Câu hỏi:** Từ hàng khối thứ hai của hệ, hãy chứng minh $A(u+td)=b$ với mọi $t$ nếu $Au=b$.

### Không gian hạt nhân và khử đẳng thức

**Mục tiêu đọc hiểu.** Người đọc tham số hóa được toàn bộ tập $Au=b$ bằng một cơ sở của không gian hạt nhân và giải bài toán rút gọn.

**Định nghĩa và giả thiết.** Xét bài toán

$$
\operatorname*{minimize}_{u\in\mathbb R^n} F(u)
\qquad\text{với}\qquad Au=b,
$$

trong đó $A\in\mathbb R^{p\times n}$, $\operatorname{rank}A=p<n$, và tồn tại một điểm $\hat u$ thỏa $A\hat u=b$. Chọn $N\in\mathbb R^{n\times(n-p)}$ có các cột tạo thành một cơ sở của $\operatorname{null}A$. Khi đó mọi điểm khả thi và chỉ các điểm khả thi đều viết được dưới dạng

$$
u=Nz+\hat u,\qquad z\in\mathbb R^{n-p}.
$$

Bài toán được rút về cực tiểu $\psi(z)=F(Nz+\hat u)$ không ràng buộc.

**Trực quan.** Tập $\{u:Au=b\}$ là một không gian affine đi qua $\hat u$. Các cột của $N$ mô tả mọi hướng tiếp tuyến không làm thay đổi $Au$. Biến $z$ là tọa độ nội tại trên không gian khả thi, nên cập nhật theo $Nz$ không thể rời khỏi đẳng thức.


**Ví dụ tính được.** Cho $F(u)=\tfrac12(2u_1^2+5u_2^2)$ và $u_1+u_2=14$. Với $\hat u=(14,0)^T$, $N=(-1,1)^T$, ta có $AN=0$, $A\hat u=14$ và
$$
u=(14-z,z)^T,\qquad \psi(z)=196-28z+\tfrac72 z^2.
$$
Điều kiện $\psi'(z)=7z-28=0$ cho $z^*=4$. Vì $\psi''=7>0$, nghiệm duy nhất là $u^*=(10,4)^T$, $F^*=140$. Quy tắc dây chuyền cho $\nabla\psi=N^Tg$ và $\nabla^2\psi=N^THN=7$.

![Đường khả thi tổng bằng 14 tiếp xúc với đường mức 140 tại điểm 10,4.](img/lec-04/equality-start-new.svg)

**Đối chiếu với hệ khối.** Trong $Hd+A^T\eta=-g$, đặt $d=N\Delta z$ và nhân với $N^T$. Do $N^TA^T=(AN)^T=0$, ta được

$$
(N^THN)\Delta z=-N^Tg,\qquad d=N\Delta z.
$$

Tại điểm đầu $u^0=(16,-2)^T$, ta có $z^0=-2$, $N^THN=7$ và $N^Tg=-42$. Vì vậy $7\Delta z=42$ cho $\Delta z=6$, $d=(-6,6)^T$ đúng như hệ khối. Điểm mới $z^+=4$ khác với điểm đầu $z^0=-2$.

![Tọa độ z dọc đường tổng bằng 14: điểm đầu z bằng âm hai, điểm tối ưu z bằng bốn.](img/lec-04/equality-nullspace.svg)

**Ý nghĩa và ứng dụng trong AI.** Khử đẳng thức phù hợp khi số chiều còn lại $n-p$ nhỏ, có thể dựng một cơ sở hạt nhân ổn định và muốn tối ưu trực tiếp trên không gian tham số hợp lệ. Ví dụ gồm hệ số có tổng bằng một, ràng buộc bảo toàn khối lượng và các tham số tương phản có tổng bằng không.

**Điểm dễ nhầm.** $N$ không phải ma trận nghịch đảo của $A$ và thường không duy nhất. Công thức $u=Nz+\hat u$ cần cả $AN=0$ lẫn $A\hat u=b$. Trong tính toán lớn, dựng tường minh một cơ sở hạt nhân có thể làm mất tính thưa; hệ Newton–KKT vừa học là lựa chọn khác để giải cùng bài toán con.

**Câu hỏi:** Với $A=[1\ 1]$, vì sao $N=(1,-1)^T$ và $N=(-1,1)^T$ đều hợp lệ? Hai lựa chọn này có làm thay đổi nghiệm $u^*$ không?

### Định lý: tham số hóa đầy đủ tập nghiệm của đẳng thức

**Giả thiết.** $A\in\mathbb R^{p\times n}$ có hạng hàng đầy đủ, $p<n$; $A\hat x=b$; các cột của $N\in\mathbb R^{n\times(n-p)}$ tạo một cơ sở của $\operatorname{null}A$.

**Kết luận.** Ta có

$$
\{x\in\mathbb R^n:Ax=b\}
=\{Nz+\hat x:z\in\mathbb R^{n-p}\}.
$$

::: proof
Nếu $x=Nz+\hat x$ thì

$$
Ax=ANz+A\hat x=0+b=b,
$$

nên $x$ khả thi. Ngược lại, nếu $Ax=b$ thì $A(x-\hat x)=0$, do đó $x-\hat x\in\operatorname{null}A$. Vì các cột của $N$ là một cơ sở của không gian này, tồn tại duy nhất $z\in\mathbb R^{n-p}$ sao cho $x-\hat x=Nz$. Suy ra $x=Nz+\hat x$.
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

Do $v\in\operatorname{null}A$ và $H$ xác định dương trên không gian này, ta có $v=0$. Khi đó $A^Tu=0$. Hạng hàng đầy đủ của $A$ làm $A^T$ đơn ánh, nên $u=0$. Hạt nhân của $K$ chỉ chứa vectơ không; vì $K$ vuông nên $K$ khả nghịch.
:::

## E. Newton phần dư từ điểm chưa khả thi

Newton khả thi duy trì đẳng thức đã được thỏa ở điểm đầu. Khi điểm đầu vi phạm đẳng thức, điều kiện giữ nguyên tính khả thi cần được thay bằng phương trình hiệu chỉnh sai lệch.

### Newton từ điểm không khả thi

**Mục tiêu đọc hiểu.** Người đọc tuyến tính hóa hệ phần dư KKT, tính đồng thời bước của biến gốc và số gia nhân tử và chọn tiêu chuẩn dừng khi điểm đầu chưa khả thi.

**Định nghĩa và giả thiết.** Khi chưa có điểm thỏa $Au=b$, đặt phần dư đối ngẫu và phần dư khả thi

$$
r_d(u,\nu)=\nabla F(u)+A^T\nu,
\qquad
r_p(u)=Au-b.
$$

Giả sử $F$ khả vi hai lần, $H=\nabla^2F(u)\succ0$ và $A$ có hạng hàng đầy đủ. Tại cặp $(u,\nu)$, tuyến tính hóa hai dòng KKT:

$$
r_d(u+d,\nu+\Delta\nu)\approx r_d+Hd+A^T\Delta\nu,
\qquad
r_p(u+d)=r_p+Ad.
$$

Dòng đầu là xấp xỉ; dòng sau là đẳng thức vì $r_p$ affine. Cho hai vế tuyến tính bằng không rồi xếp hệ:

$$
\begin{bmatrix}
H&A^T\\
A&0
\end{bmatrix}
\begin{bmatrix}
d\\
\Delta\nu
\end{bmatrix}
=-
\begin{bmatrix}
r_d\\
r_p
\end{bmatrix}.
$$

Điểm thử phải nằm trong $\operatorname{dom}F$; tìm kiếm đường được thực hiện trên một hàm đo phần dư phù hợp.

**Trực quan.** Hướng của điểm và số gia nhân tử cùng hiệu chỉnh hệ điều kiện tối ưu. Quỹ đạo có thể đi ngoài $Au=b$ trong các vòng đầu; đại lượng nhận bước là chuẩn phần dư ghép từ $r_d$ và $r_p$, không phải yêu cầu chuẩn của từng thành phần giảm đơn điệu.


**Ví dụ tính được.** Từ $u^0=(1,8)^T$, $\nu^0=4$, gradient là $(2,40)^T$; phần dư là
$$
r_d=(6,44)^T,\qquad r_p=1+8-14=-5.
$$
Thế phần dư vào hệ vừa suy ra:
$$
\begin{bmatrix}2&0&1\\0&5&1\\1&1&0\end{bmatrix}
\begin{bmatrix}d_1\\d_2\\\Delta\nu\end{bmatrix}=\begin{bmatrix}-6\\-44\\5\end{bmatrix}.
$$
Trừ hai dòng đầu cho $2d_1-5d_2=38$; hàng khối cho $d_2=5-d_1$, suy ra $7d_1=63$, tức $d=(9,-4)^T$, rồi $\Delta\nu=-6-2\cdot9=-24$. Kiểm: $18-24=-6$, $-20-24=-44$ và $9-4=5$. Do đó $u^1=(10,4)^T$, $\nu^1=\nu^0+\Delta\nu=-20$ và cả hai phần dư mới bằng không. Hàng vô hướng thứ hai là $5d_2+\Delta\nu=-44$; hàng khối ràng buộc là $Ad=-r_p=5$.

*Liên hệ với bước khả thi.* Đặt $\eta=\nu+\Delta\nu$. Hệ trên viết lại được thành
$$
Hd+A^T\eta=-g,\qquad Ad=-r_p,
$$
Đây là KKT của bài con $\min_d g^Td+\tfrac12d^THd$ với $Ad=-r_p$. Lagrange của nó là $L_m(d,\eta)=g^Td+\tfrac12d^THd+\eta^T(Ad+r_p)$. Khi $r_p=0$, ta thu lại bài con khả thi; khi $r_p\ne0$, bước đầy đủ $u+d$ khôi phục đẳng thức. Cập nhật nhân tử theo bước giảm $t$ là
$$
\nu^+=\nu+t\Delta\nu=(1-t)\nu+t\eta,
$$
với $t=1$ cho $\nu^+=\eta$; khi $\Delta\nu=0$ thì $\nu^+=\nu$ với mọi $t$, nên không thể phát biểu một điều kiện cần tuyệt đối về $t$. Với $t=\tfrac12$: $\nu^+=\tfrac12(4-20)=-8$, $u^+=u^0+\tfrac12d=(11/2,6)^T$, khi đó $r_p^+=\tfrac{11}{2}+6-14=-\tfrac52$ và $r_d^+=(11,30)^T-8(1,1)^T=(3,22)^T$: cả hai phần dư đều giảm đúng một nửa.

![Điểm đầu 1,8 chưa thỏa tổng bằng 14; một bước đưa tới nghiệm 10,4.](img/lec-04/equality-infeasible-start.svg)

**Ý nghĩa và ứng dụng trong AI.** Khởi đầu không khả thi hữu ích khi khó dựng một nghiệm thỏa chính xác các ràng buộc cân bằng, hoặc khi bài toán được giải lặp lại với dữ liệu và ràng buộc thay đổi. Hai phần dư cũng cung cấp nhật ký chẩn đoán: mô hình có thể gần dừng nhưng còn vi phạm ràng buộc, hoặc ngược lại.

**Điểm dễ nhầm.** $\|r_d\|_2$ nhỏ không kéo theo $\|r_p\|_2$ nhỏ. Cần dừng bằng hai ngưỡng riêng,

$$
\|r_d\|_2\le\varepsilon_d,
\qquad
\|r_p\|_2\le\varepsilon_p.
$$

Không dùng $\delta_{\mathrm{eq}}^2/2$ làm tiêu chuẩn duy nhất khi điểm chưa khả thi. Tìm kiếm quay lui cũng phải bảo đảm điểm thử còn thuộc miền của $F$.

Về đạo hàm của chuẩn phần dư: đặt $r=(r_d^T,r_p^T)^T\in\mathbb R^{n+p}$, $\Delta=(d^T,\Delta\nu^T)^T$, và $J_r$ là ma trận Jacobi của $r$. Vì $J_r\Delta=-r$, phép tính
$$
r^TJ_r\Delta=-\|r\|_2^2
$$
là đạo hàm của $\tfrac12\|r\|_2^2$, tức nửa bình phương chuẩn; với $r\ne0$, suy ra đạo hàm của $\|r\|_2$ theo $t$ tại $t=0$ dọc hướng Newton bằng $-\|r\|_2$.

Giá trị mục tiêu thấp hơn $F^*$ cũng không có ý nghĩa tối ưu khi chưa khả thi: phản ví dụ riêng $u=(0,0)^T$, $\nu=0$ có $F(u)=0<140$ nhưng $r_p=-14$, vẫn ngoài mặt khả thi. Vì vậy, không thể đòi giảm $F$ ở mọi bước chưa khả thi. Hai phần dư nhỏ là điều kiện gần KKT; không tự cho cận sai số mục tiêu khi chưa có giả thiết và định lý tương ứng.

Cụ thể, đặt $r=(r_d^T,r_p^T)^T\in\mathbb R^{n+p}$. Với $\alpha\in(0,1/2)$ và $\beta\in(0,1)$, bắt đầu từ $t=1$ và lặp $t\leftarrow\beta t$ cho đến khi điểm thử thuộc miền, $u+td\in\operatorname{dom}F$, và

$$
\|r(u+td,\nu+t\Delta\nu)\|_2\le(1-\alpha t)\,\|r(u,\nu)\|_2.
$$

Đây là bất đẳng thức quay lui theo chuẩn phần dư; điều kiện điểm thử thuộc $\operatorname{dom}F$ là bắt buộc vì phần dư đối ngẫu chứa $\nabla F(u)$.

**Thứ tự vòng lặp.** Tính $r_d,r_p$; nếu cả hai đạt dung sai thì dừng trước khi giải hệ. Nếu chưa đạt, tính $H$, giải hệ cho $(d,\Delta\nu)$, chọn $t$ theo bất đẳng thức trên rồi cập nhật đồng thời $u^+=u+td$ và $\nu^+=\nu+t\Delta\nu$. Đẳng thức $r_p^+=(1-t)r_p$ luôn đúng; $r_d^+=(1-t)r_d$ chỉ chính xác khi $F$ bậc hai như ví dụ, còn nói chung chỉ là dự báo tuyến tính.

**Câu hỏi:** Nếu $r_d=0$ nhưng $r_p\ne0$, vì sao chưa thể dừng? Hàng khối thứ hai của hệ Newton sửa $r_p$ như thế nào khi nhận bước đầy đủ?

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

## F. Tính tự điều chỉnh và cận sai số

Phần này xét lại độ giảm Newton của bài toán không ràng buộc ở phần C. Với $\varphi(s)=s-\log s$ tại $s=1/4$, giảm mô hình $9/32$ nhỏ hơn sai số mục tiêu $\log4-3/4$. Tính tự điều chỉnh bổ sung điều kiện về biến thiên độ cong để suy ra cận sai số từ độ giảm Newton. Phép khử đẳng thức đưa kết quả sang hàm rút gọn trên tập khả thi khi hàm này thỏa đủ giả thiết; cận đó không áp dụng trực tiếp cho chuẩn phần dư ở điểm chưa khả thi.

### Hàm tự điều chỉnh

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được tính tự điều chỉnh trên một đường, tính độ giảm Newton và nêu đủ giả thiết trước khi dùng các cận theo độ giảm.

**Định nghĩa và giả thiết.** Một hàm lồi $\varphi:I\to\mathbb R$, với $I\subseteq\mathbb R$ là một khoảng mở, được gọi là **tự điều chỉnh chuẩn** nếu $\varphi$ khả vi ba lần và

$$
|\varphi'''(s)|\le 2\varphi''(s)^{3/2}
$$

với mọi $s\in I$. Cho $f:\operatorname{dom}f\to\mathbb R$ lồi, với $\operatorname{dom}f\subseteq\mathbb R^n$ mở và lồi, và $f\in C^3(\operatorname{dom}f)$. Hàm $f$ là tự điều chỉnh chuẩn nếu hạn chế $t\mapsto f(x+tv)$ thỏa bất đẳng thức trên mọi đoạn của đường thẳng nằm trong miền. Khi $f$ lồi chặt, $\nabla^2f(x)\succ0$ và nghiệm tồn tại, độ giảm Newton là

$$
\delta_N(x)^2
=-\nabla f(x)^T\Delta x_N,
\qquad
\nabla^2f(x)\Delta x_N=-\nabla f(x).
$$

**Trực quan.** Đạo hàm cấp hai đo độ cong cục bộ; đạo hàm cấp ba đo tốc độ thay đổi của độ cong. Bất đẳng thức tự điều chỉnh buộc độ cong không thay đổi quá nhanh so với chính độ lớn hiện tại của nó. Vì vậy, độ giảm Newton vừa đo kích thước bước trong hình học Hessian, vừa cho biết khi nào mô hình bậc hai đã đủ tin cậy.

**Ví dụ tính được.** Xét

$$
\varphi(s)=s-\log s,\qquad s>0.
$$

Ta có

$$
\varphi'(s)=1-\frac1s,\qquad
\varphi''(s)=\frac1{s^2},\qquad
\varphi'''(s)=-\frac2{s^3}.
$$

Do đó $|\varphi'''(s)|=2\varphi''(s)^{3/2}$ với mọi $s>0$. Tại $s_0=1/4$, phương trình Newton là $16\Delta s_N=3$, nên

$$
\Delta s_N=\frac3{16},\qquad
s_1=\frac7{16},\qquad
\delta_N(s_0)^2=\frac9{16}.
$$

Nghiệm duy nhất là $s^*=1$. Ví dụ này cho thấy bước Newton vẫn nằm trong miền, nhưng đây không phải hệ quả tự động cho mọi điểm và mọi hàm tự điều chỉnh.

![Tỷ số giữa trị tuyệt đối của đạo hàm cấp ba và lũy thừa ba phần hai của đạo hàm cấp hai của phi bằng 2 trên toàn miền s lớn hơn 0.](img/lec-04/self-concordance-ratio.svg)

**Phản ví dụ.** Hàm $-\log s$ cũng thỏa đẳng thức tự điều chỉnh, nhưng tiến tới $-\infty$ khi $s\to\infty$, nên không có cực tiểu hữu hạn. Tính tự điều chỉnh không bảo đảm tồn tại nghiệm.

**Ví dụ nhiều chiều: hàm chắn log.** Cho $a_i\in\mathbb R^n$, $b_i\in\mathbb R$, $m\in\mathbb N$ và giả thiết miền trong $\{x:a_i^Tx<b_i,\ \forall i\}$ khác rỗng. Đặt

$$
\Phi(x)=-\sum_{i=1}^{m}\log(b_i-a_i^Tx).
$$

Hàm này được dựng bằng hai phép hợp: ánh xạ affine $x\mapsto(b_i-a_i^Tx)_{i=1}^m$ đưa miền trong vào $\mathbb R_{++}^{m}$, rồi hợp với $-\log$ theo từng thành phần và lấy tổng. Vì hợp affine và tổng đều bảo toàn tính tự điều chỉnh chuẩn, $\Phi$ là hàm tự điều chỉnh chuẩn; nhân với hệ số $c\ge1$ vẫn giữ dạng chuẩn. Phát biểu này chỉ là nhận dạng lớp hàm, không phải một định lý hội tụ mới.

Mỗi số $b_i-a_i^Tx$ là độ dư của bất đẳng thức thứ $i$; với $a_i\ne0$, chia nó cho $\|a_i\|_2$ mới cho khoảng cách có dấu tới siêu phẳng biên. Khi điểm tiến sát biên thứ $i$ từ phía trong, hạng $-\log(b_i-a_i^Tx)$ tiến tới $+\infty$; gradient và Hessian vì thế phản ứng mạnh hơn với những biên đang ở gần.

**Ý nghĩa và ứng dụng trong AI.** Với các bài toán ước lượng xác suất, mô hình entropy và tối ưu nón, độ giảm Newton cung cấp một tiêu chuẩn dừng gắn với sai số mục tiêu thay vì chỉ dựa vào độ lớn gradient theo tọa độ.

**Điểm dễ nhầm.** Tính tự điều chỉnh không tự bảo đảm nghiệm tồn tại, Hessian xác định dương hay Newton hội tụ từ mọi điểm. Với dạng chuẩn, tổng và hợp affine được bảo toàn; nhân một hàm với hệ số $a\ge1$ vẫn giữ dạng chuẩn, nhưng không được mở rộng phát biểu này cho mọi $a>0$. Độ giảm Newton được định nghĩa qua $\delta_N(x)=\sqrt{-\nabla f(x)^T\Delta x_N}$, tức là căn không âm; các cận dưới đây dùng $\delta_N$, không phải $\delta_N^2$. Ví dụ $\delta_N=3/4$ cho cận $-\delta_N-\log(1-\delta_N)=\log 4-3/4$, trong khi $\delta_N^2/2=9/32$ chỉ đo mức giảm của mô hình bậc hai. Nếu $\delta_N<1$ và các giả thiết trên được thỏa thì

$$
f(x)-p^*\le -\delta_N-\log(1-\delta_N),
$$

nhưng cận này không áp dụng vô điều kiện; đây là công thức (9.49) trong Boyd–Vandenberghe (2004), mục 9.6.3. Khi bài toán có ràng buộc đẳng thức được khử bằng tham số hóa affine $u=\hat u+Nz$, hàm rút gọn $z\mapsto F(\hat u+Nz)$ là tự điều chỉnh chuẩn nhờ phép hợp affine bảo toàn lớp; cận sai số chỉ được dùng nếu chính hàm rút gọn thỏa đầy đủ giả thiết của định lý. Riêng về bất biến Newton: qua đổi tọa độ $x=Tz+c$ với $T$ khả nghịch, hai bước liên hệ bởi $T\Delta z_N=\Delta x_N$ và độ giảm $\delta_N$ giữ nguyên, như chứng minh ở phần C. Phép hợp affine bảo toàn lớp hàm không tự cấp các giả thiết về Hessian hay nghiệm cho hàm rút gọn; phải kiểm chúng riêng.

**Câu hỏi:** Với $\varphi(s)=s-\log s$, hãy tính $\delta_N(1/4)$ và kiểm tra trực tiếp bất đẳng thức tự điều chỉnh tại $s=1/4$.

### Mệnh đề: $s-\log s$ là hàm tự điều chỉnh chuẩn

**Giả thiết.** $\varphi(s)=s-\log s$ trên miền $s>0$.

**Kết luận.** $\varphi$ lồi chặt, tự điều chỉnh chuẩn và có nghiệm duy nhất $s^*=1$.

::: proof
Ta có $\varphi''(s)=1/s^2>0$, nên $\varphi$ lồi chặt. Hơn nữa,

$$
|\varphi'''(s)|=\frac2{s^3}
=2\left(\frac1{s^2}\right)^{3/2}
=2\varphi''(s)^{3/2}.
$$

Do đó bất đẳng thức tự điều chỉnh đạt dấu bằng trên toàn miền. Phương trình $\varphi'(s)=1-1/s=0$ có nghiệm duy nhất $s=1$. Tính lồi chặt biến điểm dừng này thành nghiệm cực tiểu duy nhất.
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

**Giả thiết.** Các giả thiết của định lý trên được thỏa; tập mức ban đầu $S=\{x:f(x)\le f(x^0)\}$ đóng. Bước tắt dần được chọn theo $t=1/(1+\delta_N)$ khi độ giảm Newton còn lớn.

**Kết luận.** Pha tắt dần cho mức giảm ít nhất

$$
\omega(\delta_N)=\delta_N-\log(1+\delta_N).
$$

Trong lân cận đủ nhỏ của nghiệm, với tham số Armijo $\alpha\in(0,1/2)$, bước đầy đủ thuộc miền và được nhận; độ giảm Newton kế tiếp bị chặn theo bậc hai. Đây là hai cấu hình bước cần phân biệt: quy tắc tắt dần nêu trên và quay lui Armijo. Không bỏ kiểm miền chỉ vì hàm tự điều chỉnh.

**Ý tưởng chứng minh.** Hạn chế $f$ lên đường Newton, dùng bất đẳng thức tự điều chỉnh để chặn biến thiên của đạo hàm cấp hai, rồi tích phân các chặn một chiều. Cùng phép chặn tạo cận giảm ở xa nghiệm và truy hồi bậc hai ở gần nghiệm. Không suy kết luận này chỉ từ tính lồi trơn.

## G. Tổng hợp và chuyển giao vào mô hình học

Mô hình bình phương tối thiểu có ràng buộc dưới đây áp dụng cùng quy trình: xác định đạo hàm và điều kiện tối ưu, sau đó lập hệ Newton phù hợp với tính khả thi của điểm đầu.

Cho ma trận dữ liệu $M\in\mathbb R^{m\times n}$, đích $y\in\mathbb R^m$, biến $w\in\mathbb R^n$, hệ số $\rho>0$, ma trận ràng buộc $A\in\mathbb R^{p\times n}$ hạng hàng đầy đủ và $b\in\mathbb R^p$. Đặt
$$
J(w)=\tfrac12\|Mw-y\|_2^2+\tfrac\rho2\|w\|_2^2.
$$
Ta giải $\min_w J(w)$ với $Aw=b$.
Đây là bình phương tối thiểu với chính quy hóa bậc hai (ridge regression), bổ sung ràng buộc tuyến tính. Gradient và Hessian là
$$
g=M^T(Mw-y)+\rho w,\qquad H=M^TM+\rho I.
$$
Với $v\ne0$, $v^THv=\|Mv\|_2^2+\rho\|v\|_2^2>0$; không cần $M$ hạng cột đầy đủ.

**Lập điều kiện tối ưu trước khi chọn thuật toán.** Lagrange là $L(w,\nu)=J(w)+\nu^T(Aw-b)$. KKT cho

$$
M^T(Mw-y)+\rho w+A^T\nu=0,\qquad Aw=b.
$$

Vì $g=Hw-M^Ty$, hệ tìm nghiệm trực tiếp là

$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}
\begin{bmatrix}w^*\\\nu^*\end{bmatrix}
=\begin{bmatrix}M^Ty\\b\end{bmatrix}.
$$

Không bỏ $M^Ty$ khi dữ liệu tổng quát khác không. Tham số $\rho$ đã cho điều khiển mức chính quy hóa; $\nu$ là nhân tử đẳng thức cần tìm; $\lambda$ của ví dụ chuẩn ở Bài 03 là nhân tử bất đẳng thức, có vai trò khác.

**Tạo bước từ điều kiện đó.** Với cặp hiện tại $(w,\nu)$, đặt $r_d=g+A^T\nu$ và $r_p=Aw-b$. Tuyến tính hóa KKT cho

$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}
\begin{bmatrix}d\\\Delta\nu\end{bmatrix}
=-\begin{bmatrix}r_d\\r_p\end{bmatrix}.
$$

Nếu dùng phương pháp khả thi chỉ duy trì $w$, hệ của bài con có ẩn $(d,\eta)$ và vế phải $-[g;0]$. Phân biệt với hệ phần dư ở trên, nơi ẩn thứ hai là số gia $\Delta\nu$.

::: example
Chọn $M=\operatorname{diag}(1,2)$, $y=(0,0)^T$, $\rho=1$, $A=[1\;1]$, $b=14$. Ta có $H=\operatorname{diag}(2,5)$, nên đây chính là ví dụ đã giải ở phần D, sau phép đổi tên $u\leftrightarrow w$. Nghiệm $w^*=(10,4)^T$, $\nu^*=-20$ thỏa
$$
Aw^*=14,\qquad g(w^*)+A^T\nu^*=(20,20)^T-(20,20)^T=0.
$$
Gradient tại nghiệm có ràng buộc không nhất thiết bằng không. Ràng buộc $Aw=b$ phải được giữ khi chuyển mô hình sang hệ Newton; bỏ nó sẽ cho một bài khác, có nghiệm $w=0$, nhưng $w=0$ vi phạm $Aw=14$: tại đó $g=0$ không tự là nghiệm của bài có đẳng thức vì $Aw=0\ne14$. Một điểm khả thi của bộ số này là $w=(16,-2)^T$, đối chiếu với các ví dụ ở phần D và phần E.
:::

**Câu hỏi:** Từ $w^0=(1,8)^T$, $\nu^0=4$, hãy tự dựng hai phần dư và hệ Newton. Sau đó đổi sang $w^0=(16,-2)^T$ và nêu hệ phù hợp. Đối chiếu kết quả với phần D và phần E.

Chính quy hóa kiểm soát kích thước tham số; đẳng thức biểu diễn một điều kiện cân bằng hoặc hiệu chỉnh do mô hình đặt ra. Các số trong ví dụ chỉ phục vụ tính tay, không phải dữ liệu thực nghiệm. Một đẳng thức về tổng không tự áp đặt $w_i\ge0$; bất đẳng thức đó nằm ngoài phạm vi bài này.

### Tính duy nhất của mô hình có chính quy hóa

**Giả thiết.** $\rho>0$ và tập $\{w:Aw=b\}$ khác rỗng. **Kết luận.** Bài bình phương tối thiểu có chính quy hóa ở phần G có nghiệm duy nhất trên tập khả thi.

::: proof
Hessian $H=M^TM+\rho I\succeq\rho I$ làm mục tiêu lồi mạnh, nên có nhiều nhất một nghiệm trên tập lồi khả thi. Đồng thời $J(w)\ge(\rho/2)\|w\|^2$ khiến $J(w)\to\infty$ khi $\|w\|\to\infty$. Vì tập affine khả thi đóng và khác rỗng, hàm liên tục đạt cực tiểu trên tập đó. Do vậy nghiệm tồn tại và duy nhất. Khi $A$ có hạng hàng đầy đủ, nhân tử tối ưu cũng duy nhất.
:::

### Bản đồ tổng hợp

| Tình huống | Hướng hoặc hệ cần giải | Chọn bước | Tiêu chuẩn dừng | Điều kiện cần kiểm tra |
|---|---|---|---|---|
| Gradient theo chuẩn Euclid | $d=-\nabla f(x)$ | tìm kiếm đường chính xác hoặc Armijo | $\|\nabla f(x)\|_2$ nhỏ | bảo đảm tuyến tính cần chặn Hessian và quy tắc bước phù hợp |
| Giảm dốc nhất theo chuẩn $W$ | giải $Wd=-\nabla f(x)$ | tìm kiếm đường chính xác hoặc Armijo | chuẩn đối ngẫu của gradient nhỏ | $W\succ0$; không lập $W^{-1}$ |
| Newton không ràng buộc | giải $H\Delta x_N=-g$ | quay lui; bước đầy đủ gần nghiệm | $\delta_N^2/2\le\varepsilon_{\mathrm{model}}$ khi giả thiết phù hợp | $H\succ0$ trên tuyến lồi; miền của $f$ |
| Newton đẳng thức, điểm đầu khả thi | giải hệ KKT với vế phải $-(g,0)$ | quay lui trên đường khả thi | $\delta_{\mathrm{eq}}^2/2\le\varepsilon_{\mathrm{model}}$ | $Ax=b$, $\operatorname{rank}A=p$, $H\succ0$ trên $\operatorname{null}A$ |
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

**Ba cách diễn giải tiêu chuẩn dừng.** (i) Giảm mô hình: $\delta_N^2/2\le\varepsilon_{\mathrm{model}}$ đo mức giảm của mô hình bậc hai, chỉ dùng khi các giả thiết phù hợp được thỏa. (ii) Phần dư KKT: $\|r_d\|_2$ và $\|r_p\|_2$ nhỏ chứng nhận gần thỏa điều kiện tối ưu có ràng buộc. (iii) Sai số mục tiêu $f(x)-p^*$ cần một định lý chuyển từ độ giảm Newton sang giá trị, như cận ở phần F. Ba đại lượng này đo các đối tượng khác nhau và không thay thế nhau.

Bài 03 cung cấp điều kiện KKT như một chứng nhận tối ưu. Bài 04 chọn bài con rồi giải KKT của mô hình, hoặc tuyến tính hóa KKT của bài gốc để tạo bước; sau đó kiểm điểm mới, chọn bước và diễn giải tiêu chuẩn dừng. Bài 05 sẽ thay mô hình lồi trơn xác định bằng cảnh quan phi lồi và gradient có nhiễu; các chủ đề lô nhỏ, động lượng (momentum) và tối ưu học sâu chưa được đưa vào đây.

### Tài liệu tham khảo

1. Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press, §5.5.3 về điều kiện KKT và Chương 9, đặc biệt các mục 9.2–9.6 về phương pháp giảm, gradient, Newton và hàm tự điều chỉnh; cận sai số theo độ giảm Newton là công thức (9.49) tại mục 9.6.3.
2. Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press, Chương 10, đặc biệt các mục 10.1–10.3 về cực tiểu có ràng buộc đẳng thức và Newton từ điểm không khả thi.
3. Stephen Boyd và Pablo Parrilo (giảng viên), MIT 6.079 *Introduction to Convex Optimization*, Fall 2009, Lecture 16, “Unconstrained minimization”, nguồn nội dung và thứ tự cho gradient, Newton và hàm tự điều chỉnh; giấy phép CC BY-NC-SA 4.0.
4. Stephen Boyd và Pablo Parrilo (giảng viên), MIT 6.079 *Introduction to Convex Optimization*, Fall 2009, Lecture 17, “Equality constrained minimization”, nguồn nội dung và thứ tự cho khử đẳng thức, hệ Newton–KKT và hai chế độ khởi đầu; giấy phép CC BY-NC-SA 4.0.

Bản đầy đủ của giáo trình: [Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/). Nguồn bài giảng: [MIT 6.079, Fall 2009](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/). Các hình trong ghi chú được vẽ lại từ công thức và bộ số sư phạm nêu tại từng mục.
