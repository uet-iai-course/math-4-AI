# Bài 03 — Đối ngẫu Lagrange

Ghi chú này trình bày đối ngẫu Lagrange, điều kiện Slater và điều kiện Karush–Kuhn–Tucker (KKT). Sáu phần lần lượt xây dựng nhu cầu chứng nhận tối ưu, hàm và bài toán đối ngẫu, đối ngẫu mạnh và Slater, hình học, các điều kiện tối ưu cùng hồi quy, rồi tổng hợp cách vận dụng.

## Mục tiêu học tập và kiến thức tiên quyết

Sau bài này, bạn cần làm được bốn việc:

- Tính hàm Lagrange, hàm đối ngẫu $g$ và dùng $g(\lambda,\nu)$ làm cận dưới để chứng nhận một điểm khả thi là nghiệm tối ưu.
- Kiểm tra điều kiện Slater và nêu đúng những kết luận mà Slater bảo đảm (và những kết luận nó không bảo đảm).
- Đọc nhân tử và cận dưới trên mặt phẳng giá trị.
- Giải và kiểm tra hệ KKT, phân biệt rõ vai trò điều kiện cần và điều kiện đủ.

**Kiến thức tiên quyết:** hàm và tập lồi, đạo hàm và gradient, tích vô hướng, hệ phương trình tuyến tính, phép hoàn thành bình phương. Với hàm lồi khả vi trên toàn không gian, gradient bằng không là điều kiện đủ để đạt cực tiểu toàn cục.

### Ký hiệu dùng trong bài

| Ký hiệu | Ý nghĩa và miền |
|---|---|
| $x\in\mathbb R^n$ | Biến quyết định |
| $f_0:\mathbb R^n\to\mathbb R$ | Hàm mục tiêu cần cực tiểu hóa |
| $f_i:\mathbb R^n\to\mathbb R$, $i=1,\ldots,m$ | Hàm ràng buộc bất đẳng thức, viết theo quy ước $f_i(x)\le0$ |
| $A\in\mathbb R^{r\times n}$, $b\in\mathbb R^r$ | Dữ liệu của ràng buộc đẳng thức $Ax=b$ |
| $\lambda\in\mathbb R^m$, $\lambda\ge0$ | Nhân tử của các bất đẳng thức; mỗi thành phần không âm |
| $\nu\in\mathbb R^r$ | Nhân tử của các đẳng thức; không bị ràng buộc dấu |
| $p^*$, $d^*$ | Giá trị tối ưu của bài toán gốc và bài toán đối ngẫu |
| $x^*$, $(\lambda^*,\nu^*)$ | Nghiệm tối ưu tương ứng, khi các nghiệm đó tồn tại |
| $v^T$ | Chuyển vị của véc-tơ hoặc ma trận $v$ |
| $\|v\|_2=\sqrt{\sum_i v_i^2}$ | Chuẩn Euclid của $v$; bài dùng $\|v\|$ khi không gây nhầm |

Các hàm trong bài hữu hạn trên toàn $\mathbb R^n$. Tính lồi hoặc khả vi chỉ được yêu cầu ở những phát biểu có nêu giả thiết đó.

Nguồn chính: Boyd và Vandenberghe (2004), chương 5, đặc biệt mục 5.1–5.3 và 5.5.3.

---

## 1. Nhu cầu chứng nhận tối ưu và cận dưới

### Bài toán có ràng buộc và điểm khả thi

Một bài toán cực tiểu có ràng buộc hỏi: trong các điểm thỏa mọi ràng buộc, điểm nào cho giá trị $f_0$ nhỏ nhất. Điểm thỏa mọi ràng buộc gọi là **điểm khả thi**; tập các điểm như vậy gọi là **miền khả thi**.

Với mọi điểm khả thi $x$, theo định nghĩa giá trị tối ưu ta có $p^*\le f_0(x)$. Vì vậy $f_0(x)$ cho một **cận trên** của $p^*$ trong bài toán cực tiểu. Tìm được một điểm khả thi chưa đủ để kết luận nó là nghiệm tối ưu. Một nghiệm ứng viên chỉ cho biết ta *làm được* đến mức nào; một nghiệm đã được **chứng nhận** cho biết ta *không thể làm tốt hơn* mức đó. Công cụ chứng nhận là **cận dưới**: một giá trị mà $f_0$ không thể nhỏ hơn trên miền khả thi. Nếu cận dưới bằng đúng giá trị mục tiêu tại một điểm khả thi, thì điểm đó chắc chắn là nghiệm tối ưu: không điểm khả thi nào có thể thấp hơn cận, mà điểm này đã đạt cận.

### Ví dụ xuyên suốt

Ta dùng một ví dụ một chiều xuyên suốt bài học để kiểm tra mọi khái niệm:

::: example Ví dụ xuyên suốt của bài học
Tìm số thực $x$ để $f_0(x)=x^2+1$ nhỏ nhất, với ràng buộc

$$f_1(x)=(x-2)(x-4)\le 0.$$

Tích $(x-2)(x-4)$ không dương đúng khi $x$ nằm giữa hai nghiệm, nên miền khả thi là $[2,4]$. Trên đoạn này $x^2+1$ tăng, nên nghiệm tối ưu là $x^*=2$ với giá trị $p^*=5$. Ví dụ này giải được bằng quan sát; mục đích của nó là kiểm tra xem cách xây dựng cận dưới — vốn áp dụng cho bài toán tổng quát mà ta không giải trực tiếp nổi — có cho đúng đáp án không.

![Hàm mục tiêu $x^2+1$ trên đoạn khả thi $[2,4]$, cực tiểu tại điểm $(2,5)$ trên biên trái. Hình tự vẽ từ công thức của ví dụ.](img/lec-03/intro-feasible.svg)
:::

::: exercise Tự kiểm tra
Tại sao $x=0$ không được gọi là nghiệm của bài toán này?
:::

::: solution
$x=0$ vi phạm $f_1(0)=8>0$. Điểm này cực tiểu hóa mục tiêu trên toàn trục số nhưng không thuộc miền khả thi của bài toán.
:::

### Họ hàm tạo cận dưới

Ý tưởng: với $\lambda\ge0$, đặt

$$L(x,\lambda)=f_0(x)+\lambda f_1(x).$$

Trên miền khả thi ta có $f_1(x)\le0$ và $\lambda\ge0$, nên $\lambda f_1(x)\le0$, suy ra $L(x,\lambda)\le f_0(x)$: hàm $L$ nằm *dưới* mục tiêu ở mọi điểm khả thi. Do đó **mọi cận dưới của $L$ (trên toàn không gian) cũng là cận dưới của $f_0$ trên miền khả thi**.

::: derivation Tính một cận cụ thể với $\lambda=1$
Trong ví dụ xuyên suốt:

$$L(x,1)=x^2+1+(x-2)(x-4)=x^2+1+x^2-6x+8=2x^2-6x+9.$$

Hoàn thành bình phương: $2(x^2-3x)+9=2\left[(x-\tfrac32)^2-\tfrac94\right]+9=2(x-\tfrac32)^2-\tfrac92+9=2(x-\tfrac32)^2+4{,}5.$

Vì bình phương không âm, $L(x,1)\ge4{,}5$ với **mọi** $x\in\mathbb R$ — kể cả $x=1{,}5$ không khả thi. Với mọi $x$ khả thi, $f_0(x)\ge L(x,1)\ge4{,}5$. Vậy $4{,}5$ là một cận dưới hợp lệ cho $p^*$.

![Họ hàm Lagrange với $\lambda=1$ và $\lambda=2$ nằm dưới mục tiêu trên miền khả thi $[2,4]$; hai cực tiểu cho các cận $4{,}5$ và $5$. Hình tự vẽ theo công thức.](img/lec-03/bound-family.svg)
:::

Điểm quan trọng: điểm cực tiểu của $L$ ($x=1{,}5$) **không cần khả thi**. Cận vẫn hợp lệ vì lập luận chỉ cần $L\le f_0$ trên miền khả thi và $L\ge g$ trên toàn không gian. Ta đã có một họ cận dưới: mỗi $\lambda\ge0$ cho một cận. Nhiệm vụ còn lại: (i) gọi tên và tổng quát hóa phép xây dựng này; (ii) tìm cách chọn $\lambda$ tốt nhất; (iii) biết khi nào cận tốt nhất khít với $p^*$.

::: exercise Tự kiểm tra
Nếu $\lambda=-1$ (dấu âm), thì $L\le f_0$ còn đúng trên miền khả thi không?
:::

::: solution
Không thể bảo đảm. Với $\lambda<0$ và $f_1(x)\le0$, tích $\lambda f_1(x)\ge0$, nên $L(x,\lambda)\ge f_0(x)$. Dấu nhân tử không còn bảo đảm cách tạo cận dưới vừa dùng.
:::

---

Nguồn cho phần trên: Boyd và Vandenberghe (2004), mục 5.1.

## 2. Hàm Lagrange, hàm đối ngẫu và đối ngẫu yếu

### Định nghĩa tổng quát

Bài toán gốc tổng quát:

$$\min_{x\in\mathbb R^n} f_0(x)\quad\text{với}\quad f_i(x)\le0\ (i=1,\ldots,m),\qquad Ax=b.$$

**Định nghĩa hàm Lagrange.**
Với $\lambda=(\lambda_1,\ldots,\lambda_m)\ge0$ và $\nu\in\mathbb R^r$:

$$L(x,\lambda,\nu)=f_0(x)+\sum_{i=1}^m\lambda_i f_i(x)+\nu^T(Ax-b).$$

Tại một điểm khả thi: các hạng $\lambda_i f_i(x)$ không dương (vì $\lambda_i\ge0$, $f_i(x)\le0$), còn hạng $\nu^T(Ax-b)$ bằng không bất kể dấu của $\nu$ — đó là lý do $\nu$ được để tự do còn $\lambda$ bị ép không âm.

### Hàm đối ngẫu: inf trên toàn không gian

**Định nghĩa hàm đối ngẫu.**
Giữ các nhân tử cố định, lấy cận dưới của $L$ theo biến $x$ trên **toàn** $\mathbb R^n$:

$$g(\lambda,\nu)=\inf_{x\in\mathbb R^n}L(x,\lambda,\nu).$$

Nếu miền xác định chung của các hàm chỉ là $D$ (không phải toàn $\mathbb R^n$), phải thay $\inf_{x\in\mathbb R^n}$ bằng $\inf_{x\in D}$; phát biểu Slater cũng cần điều chỉnh theo miền, không áp dụng máy móc bản đơn giản của bài.

Ba điểm cần chú ý trong định nghĩa này:

1. **$\inf$ là cận dưới lớn nhất.** Nó bằng giá trị nhỏ nhất nếu có điểm đạt, nhưng nói chung có thể chỉ là giới hạn không đạt: ví dụ $\inf_{x}e^x=0$ dù không có $x$ hữu hạn đạt $0$; còn $\inf_x x=-\infty$. Vì vậy $g$ được phép nhận giá trị $-\infty$ (khi $L$ không bị chặn dưới theo $x$).
2. **Không áp lại các ràng buộc** của bài toán gốc khi lấy inf. Lấy inf trên toàn không gian làm bài toán bên trong đơn giản hơn, mà vẫn cho được cận dưới (điều này sẽ rõ nhờ đối ngẫu yếu).
3. Biến được tối ưu là $x$; các nhân tử $\lambda,\nu$ chỉ là tham số.

### Tính lõm của $g$ theo nhân tử

::: proof Mệnh đề: $g$ lõm theo $\theta=(\lambda,\nu)$, kể cả khi bài toán gốc không lồi
Chọn $\theta_a,\theta_b$ với $g(\theta_a),g(\theta_b)$ hữu hạn và $\alpha\in[0,1]$; đặt $\theta_\alpha=\alpha\theta_a+(1-\alpha)\theta_b$. Cần chứng minh $g(\theta_\alpha)\ge\alpha g(\theta_a)+(1-\alpha)g(\theta_b)$.

*Bước 1 — $L$ affine theo $\theta$ tại mỗi $x$ cố định.* Với $x$ cố định, $f_0(x),f_i(x),Ax-b$ là các số (véc-tơ) cố định; $L$ là tổ hợp tuyến tính của $\lambda_i,\nu_j$ cộng hằng số, tức hàm affine theo $\theta$. Do đó:

$$L(x,\theta_\alpha)=\alpha L(x,\theta_a)+(1-\alpha)L(x,\theta_b).$$

*Bước 2 — so với các inf riêng.* Theo định nghĩa inf, $L(x,\theta_a)\ge g(\theta_a)$ và $L(x,\theta_b)\ge g(\theta_b)$ với mọi $x$. Nhân hai bất đẳng thức với trọng số không âm $\alpha,1-\alpha$ rồi cộng (chiều bất đẳng thức được bảo toàn vì trọng số không âm):

$$L(x,\theta_\alpha)\ge\alpha g(\theta_a)+(1-\alpha)g(\theta_b)\qquad\forall x.$$

*Bước 3 — lấy inf vế trái.* Vế phải là hằng số theo $x$, nên lấy $\inf_x$ cả hai vế:

$$g(\theta_\alpha)=\inf_x L(x,\theta_\alpha)\ \ge\ \alpha g(\theta_a)+(1-\alpha)g(\theta_b).\qquad\blacksquare$$
:::

Vài chú giải về các bước "dễ nhầm":

- Ta **không** tách inf của tổng thành tổng các inf bằng dấu bằng (điều đó nói chung sai); lập luận chỉ cần "mỗi $L$ không nhỏ hơn inf của chính nó".
- Chọn hai giá trị $g$ hữu hạn để tránh phép toán không xác định như $0\cdot(-\infty)$ ở các trọng số biên. Ngoài miền hữu hiệu này, $g$ có thể bằng $-\infty$.
- Chứng minh không dùng tính lồi của bài toán gốc, không dùng tính lồi của $L$ theo $x$, không dùng Slater. Kết luận: **$g$ luôn lõm theo nhân tử**, kể cả với bài toán phi lồi. (Với trọng số $0$ hoặc $1$, khẳng định là đẳng thức hiển nhiên.)

### Tính $g$ trong ví dụ xuyên suốt

::: derivation Tính $g(\lambda)$ đầy đủ cho ví dụ xuyên suốt
Bước 1 — lập $L$. Thay $f_0=x^2+1$, $f_1=(x-2)(x-4)$ vào định nghĩa:

$$L(x,\lambda)=x^2+1+\lambda(x-2)(x-4)=x^2+1+\lambda(x^2-6x+8)=(1+\lambda)x^2-6\lambda x+1+8\lambda.$$

(Giải thích: khai triển tích, nhân từng hạng với $\lambda$, rồi gom hệ số theo bậc của $x$.)

Bước 2 — hoàn thành bình phương. Giữ $\lambda$ cố định, $x$ chạy trên toàn $\mathbb R$. Tách hệ số $1+\lambda$ khỏi hai hạng chứa $x$; nửa hệ số của $x$ trong ngoặc là $-\frac{3\lambda}{1+\lambda}$; thêm rồi bớt bình phương của đại lượng đó để giá trị không đổi:

$$L(x,\lambda)=(1+\lambda)\left[x^2-\frac{6\lambda}{1+\lambda}x+\Big(\frac{3\lambda}{1+\lambda}\Big)^2-\Big(\frac{3\lambda}{1+\lambda}\Big)^2\right]+1+8\lambda$$
$$=(1+\lambda)\Big(x-\frac{3\lambda}{1+\lambda}\Big)^2+1+8\lambda-\frac{9\lambda^2}{1+\lambda}.$$

(Giải thích: ba hạng đầu tạo thành một bình phương; hạng trừ được nhân lại với $1+\lambda$, nên mẫu chỉ còn $1+\lambda$.)

Bước 3 — đọc cực tiểu. Vì $\lambda\ge0$ nên $1+\lambda>0$, hệ số ngoài bình phương dương: cực tiểu toàn cục đạt khi bình phương bằng không, tức $x(\lambda)=\frac{3\lambda}{1+\lambda}$. Vậy

$$g(\lambda)=1+8\lambda-\frac{9\lambda^2}{1+\lambda}=10-\lambda-\frac{9}{1+\lambda}\qquad(\lambda\ge0).$$

(Rút gọn dùng đẳng thức $\frac{9\lambda^2}{1+\lambda}=9\lambda-9+\frac{9}{1+\lambda}$.) Lưu ý: điểm đạt cực tiểu $x(\lambda)$ chưa chắc thuộc miền khả thi $[2,4]$ — và điều đó không ảnh hưởng tính hợp lệ của cận.
:::

### Đối ngẫu yếu

::: proof Định lý đối ngẫu yếu
Khẳng định: với mọi $x$ khả thi và mọi $\lambda\ge0,\nu$,

$$g(\lambda,\nu)\ \le\ L(x,\lambda,\nu)\ \le\ f_0(x),$$

suy ra $g(\lambda,\nu)\le p^*$.

*Bất đẳng thức đầu:* theo định nghĩa, $g(\lambda,\nu)$ là inf của $L$ trên toàn $\mathbb R^n$, nên không vượt $L$ tại bất kỳ điểm nào, trong đó có điểm $x$ đang xét.

*Bất đẳng thức sau:* tại $x$ khả thi, $f_i(x)\le0$ nên $\lambda_i f_i(x)\le0$ (vì $\lambda_i\ge0$ — dấu của nhân tử là chỗ này quyết định); và $Ax-b=0$ nên $\nu^T(Ax-b)=0$. Do đó $L(x,\lambda,\nu)\le f_0(x)$.

*Kết luận $g\le p^*$:* vì $L(x,\lambda,\nu)\le f_0(x)$ với mọi $x$ khả thi, inf của $L$ trên toàn không gian không vượt inf của $f_0$ trên miền khả thi, tức $g(\lambda,\nu)\le p^*$. Định lý đúng cho **mọi** bài toán, không cần tính lồi. $\blacksquare$
:::

Lỗi hay gặp: quên rằng $L\le f_0$ chỉ đúng **trên miền khả thi**; ngoài miền khả thi nó có thể sai.

### Bài toán đối ngẫu

Đối ngẫu yếu gợi ý: để được cận tốt nhất, **cực đại hóa** $g$:

$$d^*=\sup_{\lambda\ge0,\ \nu}g(\lambda,\nu)\ \le\ p^*.$$

Nhờ tính lõm vừa chứng minh, bài toán này là bài toán lồi (cực đại hàm lõm). Trong ví dụ xuyên suốt: $g(0)=1$, $g(1)=4{,}5$, $g(2)=5$. Đạo hàm $g'(\lambda)=-1+\frac{9}{(1+\lambda)^2}$ đổi dấu từ dương sang âm tại $\lambda=2$, nên $\lambda^*=2$ và $g(\lambda^*)=5$. Cách khác để kết luận không cần đạo hàm: đối ngẫu yếu cho $g(\lambda)\le p^*=5$ với mọi $\lambda$, mà $g(2)=5$ đã đạt mức đó — cận khít. Ở đây $\sup$ là cận trên nhỏ nhất của tập các giá trị $g(\lambda)$ trên miền nhân tử $\lambda\ge0$; nó bằng giá trị lớn nhất nếu có nhân tử đạt mức đó, nhưng nói chung không phải mọi $\sup$ đều đạt.

::: exercise Tự kiểm tra
Vì sao $g(\lambda)$ lõm mà ta lại *cực đại hóa* nó?
:::

::: solution
Ta cực đại hóa $g$ vì muốn cận dưới lớn nhất cho $p^*$. Tính lõm cho biết bài toán cực đại này có cấu trúc tối ưu lồi trên tập nhân tử khả thi lồi.
:::

![Đồ thị hàm đối ngẫu g theo nhân tử không âm; cận lớn nhất bằng 5 tại nhân tử 2. Hình tự vẽ từ công thức của ví dụ.](img/lec-03/dual-bound.svg)

### Ví dụ hai chiều

::: example Đối ngẫu cho bài toán hai chiều
Xét bài toán $\min_{x\in\mathbb R^2}\frac12(x_1^2+x_2^2)$ với $x_1\ge1$, $x_2\ge2$. Viết ràng buộc về dạng không dương: $f_1=1-x_1\le0$, $f_2=2-x_2\le0$, dùng $\lambda_1,\lambda_2\ge0$:

$$L=\frac12(x_1^2+x_2^2)+\lambda_1(1-x_1)+\lambda_2(2-x_2).$$

Hoàn thành bình phương theo cả hai biến:

$$L=\frac12\big[(x_1-\lambda_1)^2+(x_2-\lambda_2)^2\big]+\lambda_1+2\lambda_2-\frac12(\lambda_1^2+\lambda_2^2).$$

Giữ $\lambda$ cố định, hai bình phương không âm và đồng thời bằng $0$ tại $x_i=\lambda_i$. Vì vậy đây là cực tiểu toàn cục theo $x\in\mathbb R^2$; cũng có thể tìm điểm này bằng $\partial L/\partial x_i=x_i-\lambda_i=0$. Giá trị cực tiểu là:

$$g(\lambda_1,\lambda_2)=\lambda_1+2\lambda_2-\frac12(\lambda_1^2+\lambda_2^2).$$

Hoàn thành bình phương theo từng biến:

$$g=\frac52-\frac12\Big[(\lambda_1-1)^2+(\lambda_2-2)^2\Big]\ \le\ \frac52,$$

dấu bằng tại $\lambda^*=(1,2)$, thỏa dấu không âm. Điểm $x=(1,2)$ khả thi và $f_0(x)=\frac12(1+4)=\frac52$. Cận dưới bằng giá trị tại một điểm khả thi: chứng nhận khít $x^*=(1,2)$, $d^*=p^*=\frac52$. (Kiểm tra thêm: $L(x,(1,2))=\frac12[(x_1-1)^2+(x_2-2)^2]+\frac52$.) Ở đây ta tối ưu đồng thời hai nhân tử, nhưng nguyên tắc tạo cận không đổi.
:::

::: exercise Bài tập tự luyện: xây dựng cận dưới
Xét $\min_{x\in\mathbb R}(x-2)^2$ với $x\le1$. (a) Viết ràng buộc dạng $f_1(x)\le0$ và lập $L$. (b) Tính $g(\lambda)$ với $\lambda\ge0$. (c) Dùng $\lambda=2$ để chứng nhận nghiệm $x=1$.
:::

::: hint
Ràng buộc đúng là $x-1\le0$ (chú ý hằng số $-1$); sau khi lập $L$, lấy cực tiểu theo $x$ bằng đạo hàm hoặc hoàn thành bình phương.
:::

::: solution
(a) $f_1(x)=x-1$, nên $L=(x-2)^2+\lambda(x-1)$. Lỗi hay gặp: bỏ hằng số $-\lambda$ trong ràng buộc rồi thu được cận sai. (b) $\frac{dL}{dx}=2(x-2)+\lambda=0$ cho $x(\lambda)=2-\frac{\lambda}{2}$; thay lại $g(\lambda)=\lambda-\frac{\lambda^2}{4}$. (c) Với $\lambda=2$: $L=(x-2)^2+2(x-1)=(x-1)^2+1\ge1$, tức $g(2)=1$. Điểm $x=1$ khả thi và $(x-2)^2\big|_{x=1}=1$, bằng cận dưới. Vậy $x^*=1$, $p^*=1$ — chứng nhận khít.
:::

---

Nguồn cho phần trên: Boyd và Vandenberghe (2004), mục 5.1–5.2.

## 3. Đối ngẫu mạnh, khoảng đối ngẫu và điều kiện Slater

### Hai khái niệm khoảng cần phân biệt

Trong ví dụ xuyên suốt, $g(1)=4{,}5$ còn $p^*=5$ — một nhân tử chưa tốt cho khoảng dương. Cần tách bạch:

- **Khoảng của một cặp** $(x,\lambda)$: $f_0(x)-g(\lambda)$. Ví dụ cặp $x=2,\lambda=1$ có khoảng $5-4{,}5=0{,}5$. Nó chặn trên sai số của phương án $x=2$ (vì $p^*\ge4{,}5$ nên $f_0(2)-p^*\le0{,}5$) nhưng không phải là khoảng đối ngẫu.
- **Khoảng đối ngẫu tối ưu**: $p^*-d^*$ (định nghĩa khi các giá trị hữu hạn).

Nhiệm vụ: tìm điều kiện kiểm tra được bảo đảm $p^*=d^*$.

### Cận khít trong ví dụ

Chọn $\lambda=2$:

$$L(x,2)=x^2+1+2(x-2)(x-4)=3x^2-12x+17=3(x-2)^2+5\ \ge\ 5.$$

Tại $x=2$ khả thi: $g(2)=f_0(2)=5$. Định nghĩa: bài toán có **đối ngẫu mạnh** khi $d^*=p^*$. Ở đây cả hai phía đều đạt nghiệm. Chú ý $x(2)=\frac{3\cdot2}{3}=2$ trùng $x^*$ — điều này không ngẫu nhiên mà sẽ được giải thích bởi KKT.

### Phát biểu điều kiện Slater và định lý

**Điều kiện Slater và định lý đối ngẫu mạnh.**
**Giả thiết nền:** $f_0,\ldots,f_m$ lồi và hữu hạn trên toàn $\mathbb R^n$; ràng buộc đẳng thức là $Ax=b$.

**Slater:** tồn tại **cùng một** điểm $\bar x$ sao cho

$$f_i(\bar x)<0\ (i=1,\ldots,m),\qquad A\bar x=b.$$

Điểm $\bar x$ gọi là điểm khả thi nghiêm ngặt: mọi bất đẳng thức có **khoảng dư** tại cùng một điểm.

**Định lý.** Nếu các giả thiết trên đúng và $p^*$ hữu hạn thì $d^*=p^*$ **và** bài toán đối ngẫu đạt nghiệm (tồn tại $(\lambda^*,\nu^*)$ với $g(\lambda^*,\nu^*)=p^*$).

Hai lưu ý quan trọng về phạm vi kết luận:

- Slater là điều kiện **đủ**, không phải cần: thiếu Slater không suy ra khoảng đối ngẫu dương.
- Slater **không bảo đảm bài toán gốc đạt nghiệm** — chỉ bảo đảm phía đối ngẫu đạt. Chẳng hạn $\min_{x\in\mathbb R}e^x$ với ràng buộc luôn nghiêm $f_1(x)=-1\le0$ — hàm hằng thỏa nghiêm mọi $x$ — thỏa Slater và có $p^*=0$, nhưng không có $x$ hữu hạn đạt $0$.

![Điểm Slater $\bar x=3$ nằm trong đoạn khả thi $[2,4]$; dải $[2{,}5;\,3{,}5]$ quanh nó vẫn thỏa nghiêm ràng buộc, còn nghiệm tối ưu $x^*=2$ nằm trên biên. Hình tự vẽ từ ràng buộc $(x-3)^2-1\le0$.](img/lec-03/slater-interior.svg)

**Trực quan về khoảng dư.** Với ví dụ viết lại $f_1(x)=(x-3)^2-1\le0$ (tương đương $x\in[2,4]$), tại $\bar x=3$ ta có $f_1(3)=-1<0$: còn dư. Với $|x-3|\le0{,}5$ thì $f_1(x)\le-0{,}75<0$: dịch chuyển nhỏ vẫn thỏa nghiêm. Slater yêu cầu **một** điểm có khoảng dư với **tất cả** bất đẳng thức cùng lúc (nếu có đẳng thức, chỉ dịch chuyển trong tập thỏa đúng các đẳng thức). Điểm Slater chỉ để kiểm tra giả thiết chính quy, không phải ứng viên nghiệm; ở đây $\bar x=3$ còn $x^*=2$. Cũng không suy ngược rằng "miền có nội điểm" luôn tương đương Slater cho mọi cách viết ràng buộc.

### Bổ đề tách hai tập lồi (phiên bản yếu)

Chứng minh định lý Slater ở mục sau cần một công cụ: tách hai tập lồi rời nhau bằng một siêu phẳng. Trực quan: nếu hai tập lồi không giao nhau, ta có thể kẹp giữa chúng một siêu phẳng $\{x: q^T x = c\}$ với pháp tuyến $q \ne 0$, sao cho một tập nằm hoàn toàn về phía $q^T x \ge c$ và tập kia hoàn toàn về phía $q^T x \le c$. Ví dụ trong $\mathbb R$: $C = [1,2]$ và $B = [-2,0]$ rời nhau; chọn $q = 1$ và $c = 1/2$ thì $q^T z = z \ge 1 > 1/2 \ge w = q^T w$ cho mọi $z \in C$, $w \in B$. Điểm $1/2$ nằm trong khe giữa hai tập.

**Bổ đề (tách yếu).** Cho $C, B$ khác rỗng, lồi, rời nhau trong $\mathbb R^d$ với $d \ge 1$. Khi đó tồn tại $q \in \mathbb R^d$, $q \ne 0$, và $c \in \mathbb R$ sao cho

$$q^T z \ \ge\ c\ \ge\ q^T w \qquad \forall z \in C,\ \forall w \in B.$$

Đây là phiên bản **yếu**: không cần $C$ hoặc $B$ đóng, bị chặn hay có nội điểm, và không đòi hỏi tách nghiêm ngặt (dấu bằng có thể xảy ra).

**Kiến thức dùng trong chứng minh:** một tập trong không gian Euclid hữu hạn chiều là **compact** khi và chỉ khi nó đóng và bị chặn; hàm liên tục trên tập compact khác rỗng đạt giá trị nhỏ nhất; ảnh của tập compact qua ánh xạ liên tục là compact; mọi phủ mở của tập compact có phủ con hữu hạn. Ở đây **phủ mở** của một tập là một họ tập mở có hợp chứa tập đang xét; **phủ con hữu hạn** là việc chọn được một số hữu hạn tập trong họ sao cho chúng vẫn phủ được tập đó.

::: solution Chứng minh bổ đề tách yếu
**Bước 1 — về tập hiệu và loại bỏ gốc tọa độ.** Đặt

$$E = C - B = \{z - w:\ z \in C,\ w \in B\}.$$

Vì $C, B$ khác rỗng nên $E$ khác rỗng. $E$ lồi: lấy $e_1 = z_1 - w_1$, $e_2 = z_2 - w_2$ trong $E$ và $\alpha \in [0,1]$; đặt $z_\alpha = \alpha z_1 + (1-\alpha) z_2 \in C$ (vì $C$ lồi) và $w_\alpha = \alpha w_1 + (1-\alpha) w_2 \in B$ (vì $B$ lồi); khi đó $\alpha e_1 + (1-\alpha) e_2 = z_\alpha - w_\alpha \in E$.

$E$ không chứa $0$: nếu $0 = z - w$ với $z \in C$, $w \in B$ thì $z = w$, mâu thuẫn với $C \cap B = \emptyset$.

**Bước 2 — bao lồi hữu hạn của một tập hữu hạn trong $E$.** Lấy tập hữu hạn không rỗng bất kỳ $F \subset E$, viết $F = \{e_1, \ldots, e_k\}$. Đặt

$$K = \operatorname{conv}(F) = \Big\{\sum_{i=1}^k \alpha_i e_i:\ \alpha_i \ge 0,\ \sum_{i=1}^k \alpha_i = 1\Big\}.$$

$K$ là ảnh của đơn hình hệ số $\Delta_k = \{\alpha \in \mathbb R^k:\ \alpha_i \ge 0,\ \sum \alpha_i = 1\}$ qua ánh xạ liên tục $\alpha \mapsto \sum \alpha_i e_i$. Vì $\Delta_k$ đóng và bị chặn trong $\mathbb R^k$ (nên compact trong $\mathbb R^k$) và ảnh liên tục của tập compact là compact, $K$ compact trong $\mathbb R^d$, tức đóng và bị chặn.

Mỗi điểm của $K$ là tổ hợp lồi của các điểm thuộc $E$, và $E$ lồi, nên $K \subset E$. Kết hợp Bước 1: $0 \notin K$.

**Bước 3 — điểm gần gốc nhất trên $K$.** Hàm $x \mapsto \|x\|$ liên tục trên tập compact $K$ nên đạt giá trị nhỏ nhất tại một điểm $p \in K$. Vì $0 \notin K$ nên $p \ne 0$.

Với $z \in K$ bất kỳ và $t \in [0,1]$, tính lồi của $K$ cho $p + t(z - p) = (1-t)p + tz \in K$. Theo tính cực tiểu của $\|p\|$:

$$\|p + t(z-p)\|^2 \ \ge\ \|p\|^2.$$

Khai triển:

$$\|p + t(z-p)\|^2 = \|p\|^2 + 2t\, p^T(z-p) + t^2 \|z-p\|^2.$$

Trừ $\|p\|^2$, chia cho $t > 0$:

$$2\, p^T(z-p) + t\, \|z-p\|^2 \ \ge\ 0.$$

Cho $t \downarrow 0$ (bất đẳng thức đúng với mọi $t \in (0,1]$ nên giới hạn cũng vậy) được $p^T(z - p) \ge 0$, tức

$$p^T z \ \ge\ \|p\|^2 \ >\ 0 \qquad \forall z \in K.$$

Đặt $q_F = p / \|p\|$, véc-tơ đơn vị. Chia bất đẳng thức trên cho $\|p\| > 0$:

$$q_F^T z \ \ge\ \|p\| \ >\ 0 \qquad \forall z \in F.$$

**Bước 4 — từ hữu hạn sang toàn bộ $E$ bằng tính compact của mặt cầu đơn vị.** Đặt $S = \{q \in \mathbb R^d:\ \|q\| = 1\}$, mặt cầu đơn vị — đóng và bị chặn trong $\mathbb R^d$, do đó compact. Với mỗi $z \in E$ đặt

$$H_z = \{q \in S:\ q^T z \ge 0\}.$$

$H_z$ đóng: nó là ảnh nghịch của $[0, +\infty)$ qua hàm liên tục $q \mapsto q^T z$ trên $S$.

Với mọi tập hữu hạn $\{z_1, \ldots, z_k\} \subset E$, giao $\bigcap_{i=1}^k H_{z_i}$ khác rỗng: theo Bước 3 áp dụng cho $F = \{z_1, \ldots, z_k\}$ (các $z_i$ thuộc $E \subset \mathbb R^d$), véc-tơ $q_F$ đơn vị thỏa $q_F^T z_i \ge \|p\| > 0$ với mọi $i$, nên $q_F$ thuộc giao đó.

Bây giờ chứng minh $\bigcap_{z \in E} H_z \ne \emptyset$ bằng phản chứng, dùng tính compact của $S$. Giả sử giao tất cả rỗng. Khi đó các tập bù $S \setminus H_z$ (mở trong $S$, vì $H_z$ đóng) tạo thành một phủ mở của $S$. Vì $S$ compact, tồn tại phủ con hữu hạn: các $z_1, \ldots, z_k \in E$ sao cho $S = \bigcup_{i=1}^k (S \setminus H_{z_i})$. Nhưng điều này nghĩa là $\bigcap_{i=1}^k H_{z_i} = \emptyset$, trái với kết luận hữu hạn ở trên. Vậy giao đầy đủ khác rỗng: tồn tại $q \in S$ với $q^T z \ge 0$ cho mọi $z \in E$, và $\|q\| = 1$ nên $q \ne 0$.

**Bước 5 — trở về $C$ và $B$, chọn $c$.** Với mọi $z \in C$, $w \in B$: $z - w \in E$ nên $q^T(z - w) \ge 0$, tức

$$q^T z \ \ge\ q^T w \qquad \forall z \in C,\ \forall w \in B.$$

Cần chuyển bất đẳng thức "mọi cặp" thành hai cận với một hằng số $c$. Chọn cố định $z_0 \in C$, $w_0 \in B$ (tồn tại vì hai tập khác rỗng). Với mọi $w \in B$: $q^T z_0 \ge q^T w$, nên $s = \sup_{w \in B} q^T w \le q^T z_0 < +\infty$. Với mọi $z \in C$: $q^T z \ge q^T w_0$, nên $t = \inf_{z \in C} q^T z \ge q^T w_0 > -\infty$. Hơn nữa $s \le t$: với mọi $z \in C$, $w \in B$ ta có $q^T z \ge q^T w$, lấy $\sup$ theo $w$ rồi $\inf$ theo $z$ (theo thứ tự này) cho $t \ge s$. Cụ thể, $q^T w_0 \le s \le t \le q^T z_0$, nên cả $s$ và $t$ đều hữu hạn. Chọn bất kỳ $c \in [s, t]$ (khoảng khác rỗng vì $s \le t$). Khi đó với mọi $z \in C$: $q^T z \ge t \ge c$; với mọi $w \in B$: $q^T w \le s \le c$. Vậy

$$q^T z \ \ge\ c\ \ge\ q^T w \qquad \forall z \in C,\ \forall w \in B,$$

với $q \in \mathbb R^d$, $q \ne 0$. $\blacksquare$
:::

**Giới hạn: tách yếu không cho tách nghiêm.** Bổ đề trên chỉ bảo đảm $q^T z \ge c \ge q^T w$; không thể kỳ vọng $q^T z > c > q^T w$ cho mọi cặp điểm. Ví dụ $C = (0,1)$ và $B = \{0\}$ trong $\mathbb R$: hai tập lồi, rời nhau. Giả sử tồn tại $q, c$ với $qz > c > q^T w = 0$ cho mọi $z \in C$. Suy ra $c > 0$. Với $z_k = 1/(k+1)$, $k \ge 1$, ta có $q z_k > c$. Cho $k$ ra vô cùng suy ra $0 \ge c$, mâu thuẫn. Vậy tách nghiêm không tồn tại ở đây; lập luận không cần giả sử $q > 0$ và không đổi chiều bất đẳng thức nào. Trong ví dụ này, chọn $q = 1$, $c = 0$ cho tách yếu $z \ge 0 \ge w$; bao đóng của hai tập gặp nhau tại $0$. Đối với chứng minh Slater ở mục sau, kết luận tách yếu là đủ.

::: exercise Tự kiểm tra về bổ đề tách
1. Trong Bước 3, tại sao cần chuẩn hóa $q_F = p / \|p\|$ thành véc-tơ đơn vị trước khi sang Bước 4?
2. Từ $C$ và $B$ lồi, rời nhau, có thể luôn áp dụng bổ đề cho hai bao đóng $\operatorname{cl} C$ và $\operatorname{cl} B$ không? Giải thích bằng ví dụ.
:::

::: solution
1. Chuẩn hóa không làm mất tính chất tách (chia mọi bất đẳng thức cho $\|p\| > 0$ vẫn đúng) nhưng đưa $q_F$ về mặt cầu đơn vị $S$ — tập compact. Bước 4 cần các $H_z$ là tập con của $S$ để dùng phủ con hữu hạn; nếu $q$ chỉ nằm trong $\mathbb R^d$ nói chung, họ $\{q: q^T z \ge 0\}$ không bị chặn và lập luận compact không áp dụng được. Ngoài ra chuẩn hóa cố định độ dài giúp so sánh các véc-tơ $q$ từ các bước hữu hạn khác nhau trong cùng một không gian $S$.
2. Không. Ví dụ $C = (0,1)$ và $B = \{0\}$: hai tập lồi, rời nhau, nhưng $\operatorname{cl} C = [0,1]$ và $\operatorname{cl} B = \{0\}$ giao nhau tại $0$, nên không đáp ứng giả thiết rời nhau khi áp dụng bổ đề cho hai bao đóng. Ngược lại, nếu hai bao đóng $\operatorname{cl} C$ và $\operatorname{cl} B$ thực sự rời nhau thì vẫn áp dụng được bổ đề cho chúng.
:::

### Chứng minh định lý Slater

Chứng minh dùng **bổ đề tách hai tập lồi (phiên bản yếu)** đã phát biểu và chứng minh ở mục trên (xem Boyd–Vandenberghe 2004, mục 2.5.1, trang in 46–49; giáo trình trình bày chứng minh cho trường hợp khoảng cách giữa hai tập dương đạt được, còn lập luận bao lồi hữu hạn kết hợp tính compact ở đây là phần khai triển cho trường hợp tổng quát do ghi chú biên soạn).

::: proof Chứng minh định lý Slater, từng bước
**Chuẩn bị về hệ đẳng thức.** Vì điểm Slater thỏa $A\bar x=b$, hệ nhất quán. Giữ một tập hàng độc lập tuyến tính của $A$ cùng các phần tử tương ứng của $b$ (các hàng bỏ đi là tổ hợp tuyến tính của hàng giữ lại, với cùng tổ hợp ở vế phải); miền khả thi không đổi. Gọi hệ rút gọn là $Ax=b$ với $A$ đủ hạng hàng; trong phần chứng minh này, $r$ là số hàng còn lại sau khi rút gọn. Nếu không có đẳng thức thì bỏ các đại lượng $v,\beta,\nu$ dưới đây. Đặt $f(x)=(f_1(x),\ldots,f_m(x))\in\mathbb R^m$.

**Bước 1 — tách hai tập lồi.** Xét hai tập trong $\mathbb R^m\times\mathbb R^r\times\mathbb R$:

$$C=\{(u,v,t):\ \exists x,\ f(x)\le u,\ Ax-b=v,\ f_0(x)\le t\},\qquad B=\{(0,0,t):\ t<p^*\}.$$

$C$ chứa các mức giới hạn ràng buộc và mục tiêu có thể đáp ứng bằng một điểm $x$. Trong $B$, hai tọa độ đầu bằng $0$ tương ứng với các giới hạn $f(x)\le0$, $Ax=b$, còn mức mục tiêu $t$ nằm dưới $p^*$.

*$C$ lồi:* lấy hai điểm $(u_1,v_1,t_1),(u_2,v_2,t_2)\in C$ với các điểm chứng $x_1,x_2$ và trọng số $\alpha\in[0,1]$. Đặt $x_\alpha=\alpha x_1+(1-\alpha)x_2$. Nhờ tính lồi của từng $f_i$: $f_i(x_\alpha)\le\alpha f_i(x_1)+(1-\alpha)f_i(x_2)\le\alpha u_{1i}+(1-\alpha)u_{2i}$; nhờ tính affine của $Ax-b$: $Ax_\alpha-b=\alpha v_1+(1-\alpha)v_2$; tương tự $f_0(x_\alpha)\le\alpha t_1+(1-\alpha)t_2$. Vậy tổ hợp lồi thuộc $C$. (Chú ý: lập luận đi qua điểm chứng $x_\alpha$, không khẳng định "ảnh của ánh xạ lồi là tập lồi" một cách chung chung.) $B$ lồi hiển nhiên.

*Hai tập không giao nhau:* một điểm chung sẽ cho một $x$ với $f(x)\le0$, $Ax=b$ và $f_0(x)\le t<p^*$ — tức một điểm khả thi có mục tiêu nhỏ hơn $p^*$, mâu thuẫn với định nghĩa infimum (lập luận này không cần nghiệm gốc đạt được).

Áp dụng **bổ đề tách hai tập lồi (phiên bản yếu)** cho $C$ và $B$: hai tập này khác rỗng ($C$ chứa $(f(x), Ax-b, f_0(x))$ cho mọi $x$; $B$ chứa $(0,0,t)$ với mọi $t < p^*$), lồi và rời nhau như trên, trong không gian $\mathbb R^{m+r+1}$ với $d = m+r+1 \ge 1$. Bổ đề cho $(a,\beta,\mu) = q \ne 0$ và $c \in \mathbb R$ sao cho

$$a^Tu+\beta^Tv+\mu t\ \ge\ c\quad\ \forall (u,v,t)\in C,\qquad \mu t\ \le\ c\quad\ \forall t<p^*.$$

Trong $C$, có thể tăng tùy ý từng tọa độ $u_i$ và $t$ (nếu $x$ chứng minh được $f(x)\le u$ thì cũng chứng minh được $f(x)\le u'$ với $u'\ge u$). Nếu một hệ số $a_i<0$, tăng riêng $u_i$ đến $+\infty$ làm vế trái tiến đến $-\infty$, trái với cận dưới $c$. Tương tự, tăng $t$ loại khả năng $\mu<0$. Do đó $a\ge0$ và $\mu\ge0$. Lấy $t\uparrow p^*$ trong bất đẳng thức trên $B$ được $c\ge\mu p^*$. Thay các điểm đặc biệt $(u,v,t)=(f(x),Ax-b,f_0(x))\in C$ vào bất đẳng thức tách:

$$a^Tf(x)+\beta^T(Ax-b)+\mu f_0(x)\ \ge\ \mu p^*\qquad\forall x\in\mathbb R^n. \tag{1}$$

**Bước 2 — Slater buộc $\mu>0$.** Giả sử $\mu=0$. Thay điểm Slater $\bar x$ vào (1): vì $A\bar x=b$, số hạng chứa $\beta$ triệt tiêu, còn

$$0\ \le\ a^Tf(\bar x)=\sum_{i=1}^m a_i f_i(\bar x)\ \le\ 0.$$

Mỗi số hạng $a_if_i(\bar x)$ không dương (vì $a_i\ge0$, $f_i(\bar x)<0$). Nếu có $a_j>0$ thì số hạng thứ $j$ âm, cộng các số không dương khác chỉ làm tổng âm — mâu thuẫn với tổng $\ge0$. Vậy $a=0$. *(Đây chính là chỗ dấu nghiêm $f_i(\bar x)<0$ phát huy tác dụng: nếu chỉ có $f_i(\bar x)\le0$, một số hạng có thể bằng $0$ và $a_j>0$ vẫn cho tổng $0$, không suy ra được $a=0$.)*

Khi $a=0$, (1) còn $\beta^T(Ax-b)\ge0$ với **mọi** $x\in\mathbb R^n$. Chọn $x=\bar x-A^T\beta$ (điểm này không cần khả thi, chỉ cần tồn tại — bất đẳng thức đúng trên toàn không gian):

$$0\ \le\ \beta^T(Ax-b)=\beta^T(A\bar x-b-AA^T\beta)=-\|A^T\beta\|^2.$$

Bình phương chuẩn không âm, dấu trừ làm biểu thức không dương, nên buộc $A^T\beta=0$. Các hàng của $A$ độc lập tuyến tính (đã rút gọn ở đầu), tức tổ hợp của chúng bằng $0$ chỉ khi mọi hệ số bằng $0$, nên $\beta=0$. *(Nếu không rút gọn, có thể có $\beta\ne0$ với $A^T\beta=0$, ví dụ $A=(1,1)^T$, $\beta=(1,-1)$; cuối cùng ta sẽ khôi phục nhân tử của hàng bỏ đi bằng cách gán $0$.)* Vậy $(a,\beta,\mu)=0$, mâu thuẫn với bộ hệ số tách khác không. Do đó $\mu>0$.

**Bước 3 — chuẩn hóa và kết luận.** Đặt $\lambda=a/\mu\ge0$, $\nu=\beta/\mu$. Chia (1) cho $\mu>0$ được $L(x,\lambda,\nu)\ge p^*$ với mọi $x$; lấy $\inf_x$:

$$p^*\ \le\ g(\lambda,\nu)\ \le\ d^*\ \le\ p^*,$$

trong đó $g(\lambda,\nu)\le d^*$ theo định nghĩa supremum, còn $d^*\le p^*$ là đối ngẫu yếu. Chuỗi này buộc $d^*=p^*$, và bộ nhân tử $(\lambda,\nu)$ vừa tìm được đạt nghiệm bài toán đối ngẫu. Với hệ đẳng thức ban đầu, gán nhân tử của các hàng đã bỏ bằng $0$ để hàm Lagrange giữ nguyên. Chứng minh kết thúc mà không khẳng định bài toán gốc đạt nghiệm. $\blacksquare$
:::

### Kiểm tra Slater trong ví dụ xuyên suốt

Với $f_0(x)=x^2+1$ và $f_1(x)=(x-3)^2-1$, ta có $f_0''(x)=f_1''(x)=2>0$, nên hai hàm lồi trên $\mathbb R$. Chọn $\bar x=3$ cho $f_1(3)=-1<0$. Giá trị tối ưu $p^*=5$ hữu hạn đã được xác định. Vì vậy các giả thiết Slater đều thỏa; định lý bảo đảm cận đối ngẫu khít và tồn tại nhân tử tối ưu. Phép tính trước đã tìm được $\lambda^*=2$.

Điểm Slater $\bar x=3$ có mục tiêu $10$, còn nghiệm tối ưu $x^*=2$ có mục tiêu $5$. Điều kiện Slater được kiểm tra trên một điểm có khoảng dư, không yêu cầu nghiệm tối ưu cũng phải thỏa nghiêm.

### Giới hạn của điều kiện Slater

::: example Thiếu Slater, đối ngẫu mạnh vẫn đúng nhưng không đạt
Xét $\min_{x\in\mathbb R}x$ với $x^2\le0$. Miền khả thi chỉ có $\{0\}$, nên $x^*=0$, $p^*=0$. Không tồn tại điểm với $f_1<0$: Slater không thỏa.

Tính $g$: với $\lambda=0$, $L=x$ nên $g(0)=-\infty$. Với $\lambda>0$, hoàn thành bình phương:

$$L=x+\lambda x^2=\lambda\Big(x+\frac{1}{2\lambda}\Big)^2-\frac{1}{4\lambda},\qquad g(\lambda)=-\frac{1}{4\lambda}.$$

Khi $\lambda\to+\infty$, $g(\lambda)\uparrow 0=p^*$, nhưng không nhân tử hữu hạn nào đạt $0$. Vậy $d^*=p^*=0$: **đối ngẫu mạnh đúng dù Slater không thỏa**, nhưng bài toán đối ngẫu **không đạt nghiệm**. Hai mệnh đề "đối ngẫu mạnh" và "đạt nghiệm đối ngẫu" là riêng biệt; định lý Slater bảo đảm cả hai, ví dụ này có cái trước không có cái sau. Ví dụ này sẽ được dùng lại khi xét tính cần của KKT.
:::

::: exercise Tự kiểm tra
Trong chứng minh Slater, vì sao phải rút gọn $A$ về đủ hạng hàng trước khi kết luận $\beta=0$ từ $A^T\beta=0$?
:::

::: solution
Khi các hàng của $A$ phụ thuộc tuyến tính, có thể có $\beta\ne0$ nhưng $A^T\beta=0$. Với $A=(1,1)^T$, $\beta=(1,-1)^T$ là một ví dụ. Chọn các hàng độc lập trước khi tách loại khả năng này; hệ vẫn tương đương vì đã có điểm khả thi.
:::

---

::: exercise Kiểm tra điều kiện Slater ở hai chiều
Xét $\min(x_1^2+x_2^2)$ với $x_1+x_2\ge1$. Tìm một điểm Slater và chứng minh $p^*$ hữu hạn mà chưa cần giải bài toán. Điểm Slater đó có nhất thiết là nghiệm tối ưu không?
:::

::: solution
Viết $f_1(x)=1-x_1-x_2$. Mục tiêu lồi, $f_1$ affine nên lồi; tại $\bar x=(1,1)$, $f_1(\bar x)=-1<0$. Mục tiêu không âm và điểm khả thi này có chi phí $2$, nên $0\le p^*\le2$: $p^*$ hữu hạn. Slater bảo đảm đối ngẫu mạnh và đạt đối ngẫu. Điểm Slater không nhất thiết tối ưu; phần tổng hợp sẽ tính nghiệm $(1/2,1/2)$ có chi phí $1/2<2$.
:::

Nguồn cho phần trên: Boyd và Vandenberghe (2004), mục 5.2.3 và 5.3.2.

## 4. Hình học của đối ngẫu: mặt phẳng giá trị

### Biểu diễn quyết định bằng cặp giá trị

Ta đã tính cận dưới bằng đại số; giờ nhìn nghiệm khả thi và cận dưới trong cùng một hình. Giữ nguyên ví dụ xuyên suốt. Với mỗi quyết định $x$, ghi lại hai giá trị:

- **Trục ngang** $u=f_1(x)=(x-2)(x-4)$: giá trị ràng buộc. $u\le0$ nghĩa là thỏa ràng buộc, $u>0$ là vi phạm. Dấu của $u$ phản ánh thỏa/vi phạm, không phải khoảng cách hình học đến biên.
- **Trục dọc** $t=f_0(x)=x^2+1$: giá trị mục tiêu; $t$ càng nhỏ chi phí càng thấp.

Đây là thay đổi cách biểu diễn quyết định, không phải thêm hai biến độc lập. Hàm Lagrange dùng đúng hai giá trị này: $L=t+\lambda u$.

### Tập giá trị $G$

Mỗi $x$ tạo một điểm $(u,t)=(f_1(x),f_0(x))$; tất cả các điểm tạo thành

$$G=\{(f_1(x),f_0(x)):\ x\in\mathbb R\}.$$

![Đường $G$ gồm các cặp giá trị $(u,t)$; các điểm ứng với $x=2,3,4$ nằm ở $u\le0$, còn $x=0$ nằm ở $u>0$. Hình tự vẽ từ các hàm của ví dụ.](img/lec-03/value-plane-mapping.svg)

Bảng giá trị cụ thể:

| $x$ | $u=f_1(x)$ | $t=f_0(x)$ |
|---|---|---|
| $0$ | $8$ | $1$ |
| $2$ | $0$ | $5$ |
| $3$ | $-1$ | $10$ |
| $4$ | $0$ | $17$ |

Chỉ phần của $G$ có $u\le0$ ứng với quyết định khả thi. Muốn giải bài toán gốc trên hình: tìm tung độ thấp nhất trên phần đó — ở $(0,5)$. Hai cảnh báo: cùng $u=0$ có thể có $t=5$ hoặc $t=17$, nên $t$ không phải hàm đơn trị của $u$; và $G$ **không nhất thiết lồi** dù bài toán gốc lồi. Cũng không phải mọi điểm trong nửa mặt phẳng $u\le0$ đều do một $x$ tạo ra — phải nằm trên $G$ nữa. $G$ ghi các cặp giá trị thực của hàm ràng buộc và mục tiêu; tập $C$ trong chứng minh Slater còn cho phép các mức giới hạn lớn hơn những giá trị đó. Không đồng nhất $G$ với $C$.

### Hàm Lagrange trên mặt phẳng giá trị

Giữ $\lambda\ge0$ cố định. Trên mỗi điểm $(u,t)\in G$ ứng với $x$:

$$L(x,\lambda)=f_0(x)+\lambda f_1(x)=t+\lambda u.$$

Vì $g(\lambda)=\inf_x L(x,\lambda)$, ta có $t+\lambda u\ge g(\lambda)$ với mọi điểm của $G$, tương đương

$$t\ \ge\ g(\lambda)-\lambda u.$$

Nghĩa là: **đường thẳng $t=g(\lambda)-\lambda u$ (độ dốc $-\lambda$) nằm dưới toàn bộ $G$, và tung độ cắt $g(\lambda)$ là mức cao nhất có thể** — hình dung họ đường $t=c-\lambda u$: cố định độ dốc, nâng $c$ từ thấp lên; mức $c$ lớn nhất vẫn không vượt điểm nào của $G$ chính là $g(\lambda)$. Nếu inf đạt, đường có điểm chạm với $G$; không khẳng định mọi bài toán đều có điểm chạm. Với quyết định khả thi ($u\le0$): $t\ge g(\lambda)-\lambda u\ge g(\lambda)$ — tung độ cắt chính là cận dưới đã tính bằng đại số.

### Đọc hai đường cận

::: example Đường cận với $\lambda=1$
$g(1)=4{,}5$, đường cận $t=4{,}5-u$. Điểm chạm ứng với $x=1{,}5$: $(u,t)=(1{,}25;\,3{,}25)$. Vì $u>0$, điểm chạm **không khả thi** — nhưng mọi điểm khả thi trên $G$ vẫn có $t\ge4{,}5$, nên cận vẫn hợp lệ. Tiếp xúc riêng lẻ không đủ để chứng nhận; cần điểm chạm có giá trị mục tiêu bằng tung độ cắt.

![Đường cận $t=4{,}5-u$ cắt trục tung tại $4{,}5$ và chạm $G$ ở điểm $u>0$ không khả thi. Hình tự vẽ theo công thức.](img/lec-03/value-plane-1.svg)
:::

::: example Đường cận với $\lambda=2$: tiếp xúc và chứng nhận
$g(2)=5$, đường cận $t=5-2u$. Điểm chạm $(u,t)=(0,5)$ ứng với $x=2$ **khả thi**. Đẳng thức đại số xác nhận đường không vượt $G$ và chỉ chạm tại $x=2$:

$$t+2u-5=f_0(x)+2f_1(x)-5=3(x-2)^2\ \ge\ 0.$$

Tại điểm chạm $u=0$ nên $t$ bằng đúng tung độ cắt $5=g(2)=f_0(2)$: cận khít, một chứng nhận hình học cụ thể.

![Đường cận $t=5-2u$ chạm $G$ tại điểm $(0,5)$ ứng với $x=2$ khả thi, chứng nhận tối ưu. Hình tự vẽ theo công thức.](img/lec-03/value-plane-2.svg)
:::

Hai cảnh báo khi đọc hình: nếu điểm chạm có $u<0$ với $\lambda>0$ thì $t$ không bằng tung độ cắt (vì $-\lambda u>0$), cần kiểm tra cả tính khả thi và đẳng thức giá trị; và không tổng quát hóa thành "đối ngẫu mạnh luôn tương đương một đường cận hữu hạn chạm nghiệm" — ví dụ $\min x$ với $x^2\le0$ ở phần 3 có $d^*=p^*=0$, nhưng không đường cận ứng với nhân tử hữu hạn nào đi qua điểm tối ưu $(u,t)=(0,0)$. Các đường với $\lambda>0$ vẫn có thể chạm $G$ ở điểm không khả thi.



::: exercise Bài tập tự luyện: đọc hình đối ngẫu
Đường $t=4{,}5-u$ nằm dưới và chạm $G$ của ví dụ xuyên suốt. (a) Đọc nhân tử $\lambda$ và giá trị $g(\lambda)$ từ đường. (b) Chặn trên sai số của một phương án khả thi có chi phí $5$. (c) Có thể suy ra $p^*-d^*=0{,}5$ hay không?
:::

::: hint
Hệ số góc của đường là $-\lambda$; tung độ cắt là $g(\lambda)$. Nhớ đối ngẫu yếu cho chiều (b).
:::

::: solution
(a) Độ dốc $-\lambda=-1$ nên $\lambda=1$; tung độ gốc $g(1)=4{,}5$. (b) Theo đối ngẫu yếu $p^*\ge4{,}5$; phương án có chi phí $5\ge p^*$, nên sai số $5-p^*\le5-4{,}5=0{,}5$. Trong ví dụ này $p^*=5$, nên sai số thực của phương án chi phí $5$ là $0$; con số $0{,}5$ chỉ là cận trên suy được từ nhân tử $\lambda=1$ mà thôi. (c) Không. Ta chỉ kết luận khoảng cách **tối đa** $0{,}5$ cho cặp này; không được khẳng định đó là khoảng đối ngẫu tối ưu, vì biết $g(2)=5$ cho cận khít nên $p^*-d^*=0$.
:::

---

Nguồn cho phần trên: Boyd và Vandenberghe (2004), mục 5.3.1.

## 5. Điều kiện Karush–Kuhn–Tucker (KKT)

### Cân bằng gradient và bù trừ

Phần 3 nêu điều kiện bảo đảm cận khít; phần 4 biểu diễn cận trên hình. Giờ cần tìm nghiệm mà không phải tính $g$ tường minh. Khi hai phía tối ưu đều đạt và cận khít:

$$g(\lambda^*,\nu^*)=L(x^*,\lambda^*,\nu^*)=f_0(x^*).$$

Chuỗi đẳng thức này buộc hai việc: $x^*$ phải cực tiểu hóa $L(\cdot,\lambda^*,\nu^*)$ theo $x$ (nên gradient bằng không nếu khả vi), và các số hạng $\lambda_i^*f_i(x^*)$ phải triệt tiêu. Kiểm tra trực giác ở ví dụ xuyên suốt: tại $x^*=2$, $f_0'(x)=2x=4$ và $f_1'(x)=2x-6$ nên $\lambda^*f_1'(2)=2\cdot(-2)=-4$ — hai "lực" cân bằng nhau. Đó chính là bản chất KKT: **cân bằng gradient và bù trừ**.

### Ràng buộc hoạt động và bù trừ

**Bù trừ** là điều kiện $\lambda_i^*f_i(x^*)=0$ cho từng ràng buộc: mỗi cặp có ít nhất một số bằng không.

- **Không hoạt động** ($f_i(x^*)<0$): suy ra chắc chắn $\lambda_i^*=0$, vì nếu $\lambda_i^*>0$ thì tích âm, mâu thuẫn.
- **Hoạt động** ($f_i(x^*)=0$): nhân tử **vẫn có thể** bằng $0$ — chiều ngược không chắc.

Ví dụ chiều ngược: $\min x^2$ với $x\le0$. Nghiệm $x^*=0$ nằm đúng đỉnh parabol, gradient mục tiêu đã tự triệt tiêu, ràng buộc không cần "lực", nên $(x^*,\lambda^*)=(0,0)$ với ràng buộc hoạt động. Kết luận "hoạt động $\Leftrightarrow\lambda>0$" là sai.

### Bốn nhóm điều kiện KKT

**Hệ KKT.**
Giả thiết nền: các $f_i$ khả vi trên $\mathbb R^n$. Một bộ $(x^*,\lambda^*,\nu^*)$ thỏa KKT khi cả bốn nhóm sau đúng:

1. **Khả thi gốc:** $f_i(x^*)\le0$ với mọi $i$, và $Ax^*=b$.
2. **Khả thi đối ngẫu:** $\lambda_i^*\ge0$ với mọi $i$.
3. **Bù trừ:** $\lambda_i^*f_i(x^*)=0$ với từng $i$.
4. **Dừng:** $\nabla f_0(x^*)+\sum_{i=1}^m\lambda_i^*\nabla f_i(x^*)+A^T\nu^*=0$.

Cách nhớ theo cấu trúc: hai nhóm khả thi (gốc và đối ngẫu), một nhóm ghép cặp (bù trừ), một nhóm vi phân (dừng). Mẹo kiểm tra bài làm: đếm đủ bốn nhóm, mỗi nhóm đúng số phương trình; lỗi thường gặp là quên nhóm $\lambda\ge0$ vì nó trông quá đơn giản.

### Giải ví dụ xuyên suốt bằng KKT

::: derivation Giải hệ KKT của ví dụ xuyên suốt
Hai phương trình chính: điều kiện dừng $2x+\lambda(2x-6)=0$ và bù trừ $\lambda(x-2)(x-4)=0$. Bù trừ cho hai nhánh:

- **Nhánh $\lambda=0$:** dừng cho $2x=0$, tức $x=0$. Nhưng $f_1(0)=8>0$: vi phạm khả thi, loại.
- **Nhánh $f_1=0$:** $x=2$ hoặc $x=4$. Với $x=2$: dừng cho $4-2\lambda=0$, tức $\lambda=2$ — hợp lệ. Với $x=4$: $8+2\lambda=0$ cho $\lambda=-4$ — sai dấu, loại.

Bộ hợp lệ duy nhất: $(x^*,\lambda^*)=(2,2)$, trùng khớp với $\lambda^*=2$ từ phân tích đối ngẫu ở mạch 2.
:::

### Hai chiều của điều kiện tối ưu

Trong lớp các hàm khả vi hữu hạn trên $\mathbb R^n$ và đẳng thức affine, hai kết luận cần phân biệt là:

| Chiều | Giả thiết thêm | Kết luận |
|---|---|---|
| KKT là điều kiện đủ | $f_0,\ldots,f_m$ lồi; có bộ $(x^*,\lambda^*,\nu^*)$ thỏa KKT | $x^*$ tối ưu toàn cục; không cần Slater |
| KKT là điều kiện cần | $f_0,\ldots,f_m$ lồi; Slater thỏa; $x^*$ là nghiệm tối ưu | Tồn tại nhân tử để cả bốn nhóm KKT thỏa tại $x^*$ |

Bảng này phân biệt dữ kiện khởi đầu: chiều đủ bắt đầu từ một bộ KKT, chiều cần bắt đầu từ nghiệm tối ưu và phải chứng minh tồn tại các nhân tử.

### Chứng minh điều kiện đủ của KKT

::: proof Chứng minh chiều đủ: bài toán lồi + KKT $\Rightarrow$ tối ưu toàn cục
Giả thiết: $f_0,\ldots,f_m$ lồi, khả vi trên $\mathbb R^n$, các ràng buộc đẳng thức affine; $(x^*,\lambda^*,\nu^*)$ thỏa KKT. Không cần Slater.

*Bước 1 — $L$ lồi theo $x$.* $\lambda^*\ge0$ nên $L(\cdot,\lambda^*,\nu^*)=f_0+\sum\lambda_i^*f_i+\nu^{*T}(Ax-b)$ là tổng của hàm lồi với các hàm lồi nhân hệ số không âm, cộng hàm affine: lồi. (Đây là chỗ dùng dấu nhân tử và tính affine của đẳng thức.)

*Bước 2 — dừng $\Rightarrow$ cực tiểu hóa $L$.* Điều kiện dừng là $\nabla_xL(x^*,\lambda^*,\nu^*)=0$. Hàm lồi khả vi có điểm gradient bằng không thì đạt **cực tiểu toàn cục** tại đó, nên

$$L(x^*,\lambda^*,\nu^*)=g(\lambda^*,\nu^*)=\inf_xL(x,\lambda^*,\nu^*).$$

*Bước 3 — bù trừ và khả thi $\Rightarrow$ $L(x^*)=f_0(x^*)$.* Bù trừ triệt tiêu các hạng bất đẳng thức tại $x^*$; khả thi gốc cho $\nu^{*T}(Ax^*-b)=0$. Vậy $L(x^*,\lambda^*,\nu^*)=f_0(x^*)$.

*Bước 4 — chuỗi kết luận.* Kết hợp:

$$f_0(x^*)=g(\lambda^*,\nu^*)\ \le\ p^*\ \le\ f_0(x^*),$$

($g\le p^*$ theo đối ngẫu yếu, còn $p^*\le f_0(x^*)$ theo tính khả thi) nên mọi dấu là đẳng thức: $f_0(x^*)=p^*$, tức $x^*$ tối ưu toàn cục, đồng thời $(\lambda^*,\nu^*)$ đạt nghiệm đối ngẫu. Chứng minh không dùng Slater. $\blacksquare$
:::

### Chứng minh điều kiện cần của KKT

::: proof Chứng minh chiều cần: lồi + Slater + nghiệm tối ưu tồn tại $\Rightarrow$ tồn tại nhân tử KKT
Giả thiết: $f_0,\ldots,f_m$ lồi, khả vi, hữu hạn trên $\mathbb R^n$; $Ax=b$; Slater thỏa; $x^*$ là nghiệm tối ưu (nên $p^*=f_0(x^*)$ hữu hạn).

*Bước 1 — Slater cho nhân tử đạt.* Theo định lý Slater (mạch 3), tồn tại $\lambda^*\ge0,\nu^*$ với $g(\lambda^*,\nu^*)=d^*=p^*$. Đây là chỗ dùng cả đối ngẫu mạnh lẫn sự đạt nghiệm; chỉ biết $d^*=p^*$ chưa đủ để chọn bộ nhân tử này.

*Bước 2 — chuỗi bất đẳng thức.* Theo định nghĩa inf và tính khả thi của $x^*$:

$$p^*=g(\lambda^*,\nu^*)\ \le\ L(x^*,\lambda^*,\nu^*)\ \le\ f_0(x^*)=p^*.$$

Hai đầu bằng nhau, nên cả hai bất đẳng thức đều là đẳng thức. (Không giả định trước $g=L(x^*)$; nó là hệ quả của chuỗi.)

*Bước 3 — bù trừ.* Từ $L(x^*,\lambda^*,\nu^*)=f_0(x^*)$ và $Ax^*=b$:

$$\sum_{i=1}^m\lambda_i^*f_i(x^*)=0.$$

Mỗi số hạng không dương (vì $\lambda_i^*\ge0$, $f_i(x^*)\le0$); nếu một số hạng âm thì tổng âm. Do đó **mọi** tích $\lambda_i^*f_i(x^*)=0$ — bù trừ đúng từng hạng, không chỉ tổng.

*Bước 4 — dừng.* Từ $L(x^*,\lambda^*,\nu^*)=g(\lambda^*,\nu^*)=\inf_xL(x,\lambda^*,\nu^*)$, suy ra $x^*$ cực tiểu hóa $L$ trên toàn $\mathbb R^n$. (Chú ý: điều này suy từ việc đạt infimum, không suy từ chỉ tính khả thi.) Hàm khả vi nên $\nabla_xL(x^*,\lambda^*,\nu^*)=0$, tức điều kiện dừng. Khả thi gốc có sẵn vì $x^*$ tối ưu; khả thi đối ngẫu có sẵn từ bộ nhân tử Slater. Vậy đủ bốn nhóm KKT. $\blacksquare$
:::

### Ví dụ phản chứng cho chiều cần

::: example Nghiệm tối ưu không thỏa KKT
Xét $\min_{x\in\mathbb R}x$ với $x^2\le0$ (ví dụ mạch 3). Chỉ $x=0$ khả thi, nên $x^*=0$, $p^*=0$. Hàm Lagrange $L(x,\lambda)=x+\lambda x^2$ với $\lambda\ge0$. Điều kiện dừng tại nghiệm tối ưu đòi hỏi

$$1+2\lambda x^*=1+2\lambda\cdot0=1\ne0\quad\text{với mọi }\lambda\ge0,$$

vì gradient mục tiêu bằng $1$ còn gradient ràng buộc tại $0$ bằng $0$ — không nhân tử hữu hạn nào cân bằng được. Bài toán lồi, nghiệm tối ưu tồn tại, nhưng không có nhân tử KKT tại nghiệm: thiếu Slater, tính lồi và sự tồn tại nghiệm riêng lẻ chưa đủ cho chiều cần. Tuy nhiên **không suy** rằng mọi bài thiếu Slater đều không có KKT: thay mục tiêu bằng $x^2$ thì cặp $(x,\lambda)=(0,0)$ thỏa KKT với cùng ràng buộc. Chiều đủ cũng không đúng nói chung với bài toán phi lồi.
:::

**Trường hợp phi lồi.** Với $\min(-x^2)$ trên $[-1,1]$, viết hai ràng buộc $x-1\le0$ và $-x-1\le0$. Điểm $x=0$ và hai nhân tử bằng $0$ thỏa cả bốn nhóm KKT; tuy nhiên mục tiêu bằng $0$, lớn hơn giá trị $-1$ tại $x=\pm1$. Do đó điểm KKT này không tối ưu.

::: exercise Tự kiểm tra
Trong chứng minh chiều đủ, tính lồi của $L$ theo $x$ được bảo đảm bởi giả thiết nào?
:::

::: solution
Tính lồi của $f_0,\ldots,f_m$, dấu $\lambda_i^*\ge0$ và tính affine của hạng đẳng thức bảo đảm $L$ lồi. Điều kiện dừng sau đó mới suy ra cực tiểu toàn cục.
:::

---

### Hồi quy có ràng buộc chuẩn

Bốn nhóm KKT vừa chứng minh được áp dụng trực tiếp vào mô hình khớp dữ liệu có giới hạn độ lớn trọng số dưới đây.

#### Mô hình và hệ KKT

Cho dữ liệu $X\in\mathbb R^{N\times d}$ ($N$ hàng mẫu, $d$ cột đặc trưng), $y\in\mathbb R^N$, biến $w\in\mathbb R^d$, ngưỡng $\tau>0$:

$$\min_w\ \frac12\|Xw-y\|_2^2\quad\text{với}\quad\|w\|_2^2\le\tau.$$

Hai hàm đều lồi và khả vi; điểm $w=0$ thỏa nghiêm ràng buộc khi $\tau>0$, nên Slater thỏa. Viết $f_1(w)=\|w\|_2^2-\tau\le0$ với nhân tử $\lambda\ge0$. Điều kiện dừng và bù trừ:

$$X^T(Xw-y)+2\lambda w=0,\qquad \lambda(\|w\|_2^2-\tau)=0,\qquad \lambda\ge0,$$

cộng thêm tính khả thi $\|w\|_2^2\le\tau$. Miền $\{w:\|w\|_2^2\le\tau\}$ không rỗng, đóng và bị chặn; mục tiêu liên tục, nên có nghiệm tối ưu. Kết hợp Slater, ta biết tồn tại nhân tử KKT. Không cần giả định $X$ đủ hạng.

#### Giải hệ theo hai nhánh

Điều kiện dừng tương đương

$$(X^TX+2\lambda I)w=X^Ty,$$

với $I$ là ma trận đơn vị $d\times d$. Gọi $w_0$ là nghiệm bình phương tối thiểu không ràng buộc có **chuẩn nhỏ nhất** (ký hiệu $w_0$ không có nghĩa là véc-tơ không; khi $X$ thiếu hạng có nhiều nghiệm bình phương tối thiểu, chọn nghiệm chuẩn nhỏ nhất).

- **Nhánh 1:** nếu $\|w_0\|_2^2\le\tau$, chọn $w^*=w_0$, $\lambda^*=0$. Bốn nhóm KKT thỏa. Lưu ý dấu bằng $\|w_0\|^2=\tau$ vẫn có thể xảy ra trong nhánh này, nên không gọi toàn bộ nhánh là "ràng buộc không hoạt động".
- **Nhánh 2:** nếu $\|w_0\|_2^2>\tau$, không có nghiệm KKT với $\lambda=0$. Thật vậy, khi $\lambda=0$, điều kiện dừng buộc $w$ là nghiệm bình phương tối thiểu không ràng buộc; mọi nghiệm như vậy có chuẩn ít nhất bằng $\|w_0\|$, nên bình phương chuẩn đều vượt $\tau$. Do đó $\lambda^*>0$; lúc này bù trừ mới buộc $\|w^*\|_2^2=\tau$. Với $\lambda>0$, ma trận $X^TX+2\lambda I$ xác định dương **kể cả khi $X$ thiếu hạng** (vì $w^T(X^TX+2\lambda I)w=\|Xw\|^2+2\lambda\|w\|^2>0$ với $w\ne0$), nên nghiệm duy nhất

$$w(\lambda)=(X^TX+2\lambda I)^{-1}X^Ty.$$

Khi tính nên **giải hệ tuyến tính** $(X^TX+2\lambda I)w=X^Ty$ thay vì lập nghịch đảo. Chuẩn $\|w(\lambda)\|$ giảm về $0$ khi $\lambda$ tăng; trong nhánh 2 nó giảm nghiêm và có một nhân tử duy nhất làm chuẩn bằng $\sqrt\tau$. Để vận dụng tính đơn điệu, đặt $\phi(\lambda)=\|w(\lambda)\|_2^2-\tau$ với $\lambda>0$. Trong nhánh 2, giới hạn của $\phi(\lambda)$ khi $\lambda$ tiến về $0$ từ phía dương là $\|w_0\|_2^2-\tau>0$, còn $\phi(\lambda)\to-\tau<0$ khi $\lambda\to+\infty$.

**Chia đôi nhân tử:**

1. Đặt cận dưới $\ell=0$, cận trên $u=1$. Giải hệ để tính $w(u)$; nếu $\phi(u)>0$, nhân đôi $u$ rồi tính lại cho tới khi $\phi(u)\le0$.
2. Lấy $\lambda=(\ell+u)/2>0$, giải hệ tuyến tính để tính $w(\lambda)$ và $\phi(\lambda)$.
3. Nếu $\phi(\lambda)>0$, chuẩn còn quá lớn, nên tăng nhân tử bằng cách đặt $\ell=\lambda$. Nếu $\phi(\lambda)<0$, đặt $u=\lambda$.
4. Dừng khi $|\phi(\lambda)|\le\varepsilon$ với sai số cho trước $\varepsilon>0$, hoặc khi khoảng $u-\ell$ đủ nhỏ. Kết quả số là nghiệm xấp xỉ; kiểm tra thêm sai số của phương trình dừng. Nếu cần bảo đảm khả thi từ phía an toàn, lấy nghiệm tại cận trên $u$, nơi $\phi(u)\le0$.

Ở cận dưới $0$, dùng $w_0$ để xác định dấu, không lập nghịch đảo $X^TX$ khi ma trận có thể suy biến. Mỗi lần chia đôi chỉ cần giải một hệ với ma trận xác định dương.

::: derivation Tính đơn điệu dùng trong phép chia đôi
Với $0<\lambda_1<\lambda_2$, gọi $w_1,w_2$ là nghiệm cực tiểu duy nhất của $F(w)+\lambda_j\|w\|^2$, trong đó $F(w)=\frac12\|Xw-y\|^2$. Hai bất đẳng thức tối ưu là

$$F(w_1)+\lambda_1\|w_1\|^2\le F(w_2)+\lambda_1\|w_2\|^2,$$
$$F(w_2)+\lambda_2\|w_2\|^2\le F(w_1)+\lambda_2\|w_1\|^2.$$

Cộng lại và rút gọn cho $(\lambda_2-\lambda_1)(\|w_2\|^2-\|w_1\|^2)\le0$, nên chuẩn không tăng. Nếu hai chuẩn bằng nhau, hai bất đẳng thức đều thành đẳng thức; tính duy nhất cho $w_1=w_2=w$. Trừ hai phương trình dừng được $2(\lambda_2-\lambda_1)w=0$, nên $w=0$ và $X^Ty=0$. Khi đó $w_0=0$, trái với nhánh 2. Vì vậy chuẩn giảm nghiêm trong nhánh đang xét.

Hàm $w(\lambda)$ liên tục với $\lambda>0$. Từ phương trình dừng, $2\lambda\|w\|^2\le w^TX^Ty\le\|w\|\,\|X^Ty\|$, nên $\|w(\lambda)\|\le\|X^Ty\|/(2\lambda)\to0$. Để xét giới hạn khi $\lambda\downarrow0$, chọn cơ sở trực chuẩn gồm các véc-tơ riêng $q_j$ của $X^TX$, với $X^TXq_j=\eta_jq_j$, $\eta_j\ge0$, và đặt $c_j=q_j^TX^Ty$. Thành phần của $w(\lambda)$ theo $q_j$ là $c_j/(\eta_j+2\lambda)$. Nếu $\eta_j=0$ thì $Xq_j=0$, nên $c_j=(Xq_j)^Ty=0$: thành phần ấy bằng $0$. Nếu $\eta_j>0$, thành phần tiến tới $c_j/\eta_j$. Giới hạn giải phương trình bình phương tối thiểu và không có thành phần trong $\{z:Xz=0\}$, nên đó là nghiệm có chuẩn nhỏ nhất $w_0$. Ký hiệu $\eta_j$ ở đây là trị riêng của $X^TX$, không phải giá trị kỳ dị của $X$. Do đó giới hạn tồn tại và bằng $w_0$. Tính liên tục và hai dấu trái nhau bảo đảm tìm được nhân tử; tính giảm nghiêm bảo đảm tính duy nhất trong nhánh 2.
:::


#### Ví dụ hai trọng số

::: example Hồi quy hai trọng số, kiểm tra đủ bốn nhóm KKT
Cho $X=I_2$, $y=(3,4)^T$, $\tau=1$:

$$\min_w\ \frac12\big[(w_1-3)^2+(w_2-4)^2\big]\quad\text{với }w_1^2+w_2^2\le1.$$

Nghiệm không ràng buộc $w_0=(3,4)^T$ có $\|w_0\|^2=25>1$: nhánh 2. Điều kiện dừng cho $(1+2\lambda)w=(3,4)^T$, tức $w=\frac{1}{1+2\lambda}(3,4)^T$. Bù trừ buộc

$$\frac{25}{(1+2\lambda)^2}=1\ \Longrightarrow\ 1+2\lambda=5\ \Longrightarrow\ \lambda^*=2.$$

Vậy $w^*=(3/5,4/5)^T$, $\lambda^*=2$. Kiểm tra bốn nhóm: (1) khả thi $\|w^*\|^2=9/25+16/25=1\le1$; (2) $\lambda^*=2\ge0$; (3) bù trừ $2\cdot(1-1)=0$; (4) dừng $5w^*-y=(3,4)-(3,4)=0$. Sai số dự đoán $Xw^*-y=(-12/5,-16/5)$, mất mát tối ưu $\frac12(144+256)/25=8$. Bài toán lồi nên KKT chứng nhận tối ưu toàn cục. Nghiệm không ràng buộc được đưa về biên hình tròn theo hướng $y$ vì $X$ là đơn vị; với $X$ tổng quát không nhất thiết chỉ co đều các thành phần.
:::

::: exercise Bài tập tự luyện: một trọng số
Xét $\min_{w\in\mathbb R}\frac12(w-3)^2$ với $w^2\le1$. (a) Giải các trường hợp của điều kiện bù trừ. (b) Kiểm tra đủ bốn nhóm KKT. (c) Tính mất mát tối ưu và biện minh kết luận.
:::

::: hint
Dừng: $(w-3)+2\lambda w=0$; bù trừ: $\lambda(w^2-1)=0$. Xét $\lambda=0$ và $w^2=1$ riêng biệt.
:::

::: solution
(a) Nhánh $\lambda=0$ cho $w=3$, vi phạm khả thi $w^2\le1$. Nhánh $w^2=1$: $w=1$ cho $-2+2\lambda=0$, $\lambda=1$ hợp lệ; $w=-1$ cho $-4-2\lambda=0$, $\lambda=-2$ sai dấu, loại. Vậy $w^*=1$, $\lambda^*=1$. (b) Khả thi gốc $1\le1$; khả thi đối ngẫu $\lambda=1\ge0$; bù trừ $1\cdot(1-1)=0$; dừng $-2+2=0$. (c) Mất mát $\frac12(1-3)^2=2$. Bài toán lồi nên theo chiều đủ của KKT, $w^*=1$ tối ưu toàn cục — không cần Slater cho kết luận này.
:::

---

Nguồn cho phần trên: Boyd và Vandenberghe (2004), mục 5.5.3.

## 6. Tổng hợp và vận dụng

Ba bước làm việc với một bài toán có ràng buộc:

1. **Lập cận:** chuẩn hóa ràng buộc về $f_i\le0$, lập $L$, lấy $\inf_x$ để được $g(\lambda,\nu)$; mọi $g$ là cận dưới của $p^*$ (đối ngẫu yếu, không cần lồi).
2. **Cận khít:** kiểm tra giả thiết lồi và Slater; nếu thỏa thì $d^*=p^*$ và bài toán đối ngẫu đạt nghiệm.
3. **Chứng nhận:** trong bài toán lồi, một điểm thỏa đủ bốn nhóm KKT là tối ưu toàn cục (chiều đủ, không cần Slater); ngược lại, với lồi + Slater + nghiệm tối ưu tồn tại, mọi nghiệm tối ưu có nhân tử KKT (chiều cần).

Bộ nhân tử là sợi dây nối cận dưới với điều kiện tối ưu: nó vừa tạo cận, vừa xuất hiện trong hệ điều kiện tìm nghiệm. Có hai cách chứng nhận: tìm một cận bằng giá trị của nghiệm khả thi, hoặc kiểm tra KKT trong bài toán lồi. Không bắt buộc tính $g$ tường minh trước khi dùng KKT; không bắt buộc Slater để dùng chiều KKT suy ra tối ưu. Nhắc lại: ví dụ hồi quy hai trọng số ở phần 5 đã được chứng nhận nghiệm bằng KKT mà không cần tính $g$ tường minh.

### Bài tổng hợp kết thúc

::: example Bài tổng hợp: hai biến, một ràng buộc
Chọn $x\in\mathbb R^2$ để cực tiểu hóa $x_1^2+x_2^2$ với $x_1+x_2\ge1$. Viết $f_1=1-x_1-x_2\le0$; lập $L=x_1^2+x_2^2+\lambda(1-x_1-x_2)$. Cực tiểu theo $x$ tại $x_i=\lambda/2$, nên $g(\lambda)=\lambda-\frac{\lambda^2}{2}$, cực đại tại $\lambda^*=1$ với $d^*=\frac12$. Điểm Slater $\bar x=(1,1)$ cho $f_1(\bar x)=-1<0$; $p^*$ hữu hạn vì mục tiêu không âm và có điểm khả thi. KKT: dừng $2x_i-\lambda=0$ và bù trừ $\lambda(1-x_1-x_2)=0$; nhánh $\lambda=0$ cho $x=0$ vi phạm khả thi, nên $x_1+x_2=1$ kết hợp dừng cho $x^*=(\frac12,\frac12)$, $\lambda^*=1$, $p^*=\frac12$. Chứng nhận cận khít:

$$L(x,1)=(x_1-\tfrac12)^2+(x_2-\tfrac12)^2+\tfrac12\ \ge\ \tfrac12=f_0(x^*).$$

Điểm Slater $(1,1)$ có chi phí $2$, xa tối ưu: vai trò của điểm Slater là kiểm tra giả thiết, không phải ứng viên nghiệm.
:::

::: exercise Tự kiểm tra chứng nhận trong bài tổng hợp
Với điểm khả thi $x=(1,1)$ và nhân tử $\lambda=0$, cặp này có chứng nhận được tối ưu không? Chỉ ra một cặp điểm–nhân tử tạo chứng nhận khít cho cùng bài toán.
:::

::: solution
Điểm $(1,1)$ cho cận trên $f_0(1,1)=2$, còn $g(0)=0$ là cận dưới; hai cận chưa bằng nhau, nên cặp này chưa chứng nhận tối ưu. Cặp $x^*=(1/2,1/2)$, $\lambda^*=1$ cho $f_0(x^*)=g(1)=1/2$, nên chứng nhận được tối ưu. Việc một cặp chưa có cận khít không đồng nghĩa bài toán có khoảng đối ngẫu tối ưu dương.
:::

### Quy trình vận dụng

**Vận dụng.** Khi gặp một bài toán mới: (i) viết ràng buộc dạng chuẩn; (ii) thử lập $L$ và tính $g$ nếu tam thức đơn giản; (iii) kiểm tra lồi + Slater để biết có được bảo đảm cận khít không; (iv) lập bốn nhóm KKT và giải theo nhánh bù trừ; (v) với bài lồi, một bộ KKT hợp lệ đã là chứng nhận tối ưu toàn cục.

---

## Tài liệu tham khảo

- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*: §5.1, §5.2.3, §5.3.2, §5.5.3; bổ đề tách hai tập lồi ở §2.5.1. [Giáo trình trên trang chính thức của tác giả](https://web.stanford.edu/~boyd/cvxbook/).
- Tài liệu mở rộng (không phải tiên quyết, tách rõ khỏi nội dung bắt buộc): nội tương đối, điểm yên ngựa, bất đẳng thức theo nón; đọc thêm các mục 5.2.3, 5.4 và 5.9 của cùng giáo trình.

## Bài tập chính thức

Bài tập và lời giải chính thức của bài được giữ trong tệp riêng; mở bằng:

[Bài tập và lời giải Bài 03](material-viewer.html?doc=materials/lec-03/exercises.md&deck=lecture-03-doi-ngau-lagrange.html)
