# Bài tập Bài 01: Mô hình tối ưu và tính lồi

## Hướng dẫn

- Bài 1–3 kiểm tra nhận biết và định nghĩa.
- Bài 4–7 yêu cầu tính toán hoặc chứng minh.
- Bài 8–9 yêu cầu vận dụng vào mô hình AI.
- Với mỗi kết luận về nghiệm, phải ghi giả thiết được sử dụng. Không dùng riêng từ “lồi” để thay cho kết luận về tồn tại hoặc duy nhất.
- Bài trọng tâm của tiết bài tập là Bài 1, 4, 7 và 9. Các bài còn lại dùng để củng cố hoặc tự luyện.

| Nhóm bài | Năng lực được đánh giá | Chuẩn liên quan |
|---|---|---|
| Bài 1, 4–7 | Lập mô hình, tính toán và giải thích nghiệm | LLO1, CLO1 |
| Bài 2–3, 7–9 | Kiểm tra tập lồi, hàm lồi và các bảo đảm | LLO2, CLO1 |
| Bài 8–9 | Chuyển công cụ sang mô hình AI | LLO1, LLO2, CLO1 |

## A. Nhận biết

### Bài 1. Bốn thành phần của mô hình

::: exercise
Một robot chọn vận tốc $v\in\mathbb R$ để tiến gần vận tốc đích $v_{\mathrm{ref}}$. Chi phí là

$$
(v-v_{\mathrm{ref}})^2+\lambda v^2,
$$

với giới hạn $|v|\le v_{\max}$. Cho biết dữ kiện, biến quyết định, hàm mục tiêu và miền khả thi. Nêu kiểu của mọi đại lượng.
:::

::: hint
Chỉ đại lượng mà mô hình được phép chọn mới là biến quyết định.
:::

::: solution
Dữ kiện là $v_{\mathrm{ref}}\in\mathbb R$, $\lambda\ge0$ và $v_{\max}\ge0$. Biến quyết định là $v\in\mathbb R$. Hàm mục tiêu là $f(v)=(v-v_{\mathrm{ref}})^2+\lambda v^2$. Miền khả thi là $[-v_{\max},v_{\max}]$.
:::

### Bài 2. Tập lồi và phản ví dụ

::: exercise
Với mỗi tập sau, xác định tập có lồi hay không. Nếu không lồi, cho hai điểm trong tập mà trung điểm không thuộc tập.

1. $C_1=\{x\in\mathbb R^2\mid -1\le x_1\le1,\ 0\le x_2\le2\}$.
2. $C_2=\{x\in\mathbb R^2\mid \lVert x\rVert_2=1\}$.
3. $C_3=\{x\in\mathbb R^2\mid x_1+x_2=1\}$.
:::

::: hint
Hộp là giao của các nửa không gian. Với đường tròn, thử hai điểm đối xứng.
:::

::: solution
$C_1$ lồi vì là giao của bốn nửa không gian. $C_2$ không lồi: $(1,0)$ và $(-1,0)$ thuộc tập nhưng trung điểm $(0,0)$ không thuộc tập. $C_3$ là tập affine nên lồi; tổ hợp lồi của hai nghiệm vẫn thỏa tổng tọa độ bằng $1$.
:::

### Bài 3. Ba loại bảo đảm

::: exercise
Ghép mỗi phát biểu với kết luận trực tiếp nhất: địa phương–toàn cục, tồn tại, hoặc có nhiều nhất một nghiệm.

1. $f$ liên tục trên một tập không rỗng, đóng và bị chặn.
2. $f$ lồi trên một tập lồi.
3. $f$ lồi chặt (còn gọi là lồi nghiêm ngặt) trên một tập lồi.

Cho biết phát biểu nào chưa đủ để khẳng định nghiệm tồn tại và duy nhất.
:::

::: solution
Phát biểu 1 hỗ trợ tồn tại. Phát biểu 2 cho biết mọi cực tiểu địa phương là cực tiểu toàn cục. Phát biểu 3 cho biết có nhiều nhất một nghiệm. Không phát biểu nào đứng riêng đủ để đồng thời khẳng định tồn tại và duy nhất; cần ghép điều kiện tồn tại với điều kiện duy nhất.
:::

## B. Tính toán và chứng minh

### Bài 4. Điều khiển một bước

::: exercise
Giải bài toán

$$
\underset{|u|\le1}{\operatorname{minimize}}
\quad (1+u-5)^2+u^2.
$$

Hạng năng lượng tương ứng với $\lambda=1$. Tính nghiệm tự do, nghiệm bị chặn, trạng thái kế tiếp và giá trị tối ưu. Tính $q'(u^*)$; giải thích vì sao đạo hàm khác không vẫn phù hợp với nghiệm tại biên. Chứng nhận nghiệm tồn tại và duy nhất.
:::

::: hint
Viết mục tiêu thành $2u^2-8u+16$ rồi kiểm tra vị trí của nghiệm tự do so với đoạn $[-1,1]$.
:::

::: solution
$q'(u)=4u-8$, nên $u_{\mathrm{free}}=2$. Điểm này nằm ngoài miền, do đó $u^*=1$. Trạng thái kế tiếp là $x_1=1+1=2$ và $q(u^*)=(2-5)^2+1^2=10$. Ta có $q'(u^*)=-4\ne0$. Tại biên phải, mọi dịch chuyển khả thi đủ nhỏ thỏa $\Delta u\le0$, nên $q'(u^*)\Delta u\ge0$; không có hướng khả thi bậc nhất làm mục tiêu giảm. Miền không rỗng, đóng, bị chặn; $q$ liên tục nên nghiệm tồn tại. Vì $q''(u)=4>0$, $q$ lồi chặt nên nghiệm duy nhất.
:::

### Bài 5. Phương trình chuẩn

::: exercise
Cho

$$
X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix},
\qquad
y=\begin{bmatrix}0\\1\\3\end{bmatrix}.
$$

Tính $X^TX$, $X^Ty$, nghiệm bình phương nhỏ nhất $w^*$ và tổng bình phương sai số.
:::

::: solution
Ta có

$$
X^TX=\begin{bmatrix}3&3\\3&5\end{bmatrix},
\qquad
X^Ty=\begin{bmatrix}4\\7\end{bmatrix}.
$$

Giải phương trình chuẩn được $w^*=(-1/6,3/2)^T$. Dự đoán là $(-1/6,4/3,17/6)^T$; phần dư là $(-1/6,1/3,-1/6)^T$. Tổng bình phương sai số bằng $1/6$. Vì $X$ có hạng cột đầy đủ, nghiệm duy nhất.
:::

### Bài 6. Thiếu hạng và nhiều nghiệm

::: exercise
Cho

$$
X=\begin{bmatrix}1&1\\2&2\end{bmatrix},
\qquad
y=\begin{bmatrix}1\\2\end{bmatrix}.
$$

Mô tả toàn bộ tập nghiệm của $\min_w\lVert Xw-y\rVert_2^2$. Giải thích vì sao giá trị tối ưu đạt được nhưng nghiệm không duy nhất.
:::

::: hint
Mục tiêu bằng $0$ khi $w_1+w_2=1$.
:::

::: solution
Ta có $Xw=(w_1+w_2)(1,2)^T$. Mục tiêu bằng $0$ khi $w_1+w_2=1$. Vì vậy tập nghiệm là

$$
\{(t,1-t)^T\mid t\in\mathbb R\}.
$$

Giá trị $0$ được đạt nên nghiệm tồn tại. Ma trận $X$ có hạng $1<2$, do đó $X^TX$ chỉ nửa xác định dương, không xác định dương; mục tiêu không lồi chặt và nghiệm không duy nhất.
:::

### Bài 7. Mất mát logistic tách tuyến tính

::: exercise
Với $L(w)=2\log(1+e^{-w})$ trên $\mathbb R$:

1. tính $L'(w)$ và $L''(w)$;
2. chứng minh $L$ lồi chặt;
3. chứng minh $\inf_wL(w)=0$ nhưng không có nghiệm;
4. giải thích vì sao phần 2 không mâu thuẫn với phần 3.
:::

::: solution
Ta có

$$
L'(w)=-\frac{2}{1+e^w},
\qquad
L''(w)=\frac{2e^w}{(1+e^w)^2}>0.
$$

Do đó $L$ lồi chặt và giảm trên $\mathbb R$. Khi $w\to+\infty$, $L(w)\to0$; nhưng $L(w)>0$ với mọi $w$ hữu hạn. Vì vậy cận dưới đúng bằng $0$ và không đạt. Lồi chặt chỉ cho biết có nhiều nhất một nghiệm, không bảo đảm sự tồn tại.
:::

## C. Vận dụng vào AI

### Bài 8. Chính quy hóa logistic

::: exercise
Cho

$$
L_\mu(w)=\sum_{i=1}^{n}\log(1+e^{-y_i a_i^Tw})+\frac\mu2\lVert w\rVert_2^2,
\qquad \mu>0.
$$

Chứng minh $L_\mu$ có nghiệm duy nhất trên $\mathbb R^d$. Nêu rõ phần lập luận dùng để chứng minh tồn tại và phần dùng để chứng minh duy nhất.
:::

::: hint
So sánh Hessian với $\mu I$ và xét giới hạn khi $\lVert w\rVert_2\to\infty$.
:::

::: solution
Đặt $m_i=y_i a_i^Tw$ và $d_i=e^{m_i}/(1+e^{m_i})^2>0$. Hessian của tổng mất mát logistic là nửa xác định dương. Khi đó

$$
\nabla^2L_\mu(w)=\sum_{i=1}^{n}d_i a_i a_i^T+\mu I\succeq\mu I\succ0.
$$

Do đó $L_\mu$ lồi chặt, nên có nhiều nhất một nghiệm. Mặt khác, $L_\mu$ liên tục và

$$
L_\mu(w)\ge\frac\mu2\lVert w\rVert_2^2\to+\infty
$$

khi $\lVert w\rVert_2\to\infty$. Vì vậy tập mức dưới $\{w\mid L_\mu(w)\le L_\mu(0)\}$ đóng và bị chặn. Hàm liên tục nên đạt giá trị nhỏ nhất trên tập này; mọi điểm ngoài tập có giá trị lớn hơn $L_\mu(0)$, nên đây cũng là giá trị nhỏ nhất toàn cục. Ghép hai kết luận cho nghiệm tồn tại và duy nhất.
:::

### Bài 9. Phân bố công suất chiếu sáng

::: exercise
$m$ đèn tạo độ sáng $I=Ap$ trên $n$ vùng, trong đó $A\in\mathbb R_+^{n\times m}$ và $p_{\max}\ge0$. Lập mô hình chọn $p$ để gần độ sáng đích $I_{\mathrm{des}}\in\mathbb R^n$, với $0\le p_j\le p_{\max}$.

1. Dùng mục tiêu bình phương nhỏ nhất.
2. Chứng nhận miền và mục tiêu lồi.
3. Chứng minh nghiệm tồn tại.
4. Cho điều kiện đủ để nghiệm duy nhất.
5. Nếu thêm ràng buộc $c^Tp\le P$ với $c\ge0$, kết luận về tính lồi có đổi không?
:::

::: solution
Mô hình là

$$
\underset{0\le p\le p_{\max}}{\operatorname{minimize}}
\quad \lVert Ap-I_{\mathrm{des}}\rVert_2^2.
$$

Miền là một hộp, nên lồi, đóng và bị chặn. Mục tiêu có Hessian $2A^TA\succeq0$, nên lồi. Vì mục tiêu liên tục trên miền không rỗng, đóng và bị chặn, nghiệm tồn tại. Nếu $\operatorname{rank}(A)=m$ thì $2A^TA\succ0$; mục tiêu lồi chặt trên miền lồi nên nghiệm duy nhất. Ràng buộc $c^Tp\le P$ xác định một nửa không gian; giao thêm nửa không gian vẫn lồi. Cần kiểm tra miền mới không rỗng để tiếp tục kết luận tồn tại.
:::

## Tài liệu dùng cho bài tập

1. Stephen Boyd và Lieven Vandenberghe, *Convex Optimization*, 2004, Chương 1–3.
2. MIT OpenCourseWare 6.079/6.975, *Introduction to Convex Optimization*, Fall 2009, lec01–lec03.
