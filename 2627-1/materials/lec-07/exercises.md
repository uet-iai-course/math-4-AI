# Bài tập Bài 07 — Quy hoạch tuyến tính và quy hoạch động

Các bài tập dưới đây, đánh số tiếp theo các bài tập trong ghi chú, đi kèm [ghi chú bài giảng](material-viewer.html?doc=materials/lec-07/lecture-note.md&deck=lecture-07-quy-hoach-tuyen-tinh-va-dong.html) và [bài giảng](lecture-07-quy-hoach-tuyen-tinh-va-dong.html) của Bài 07. Các bài lấy từ Vanderbei (2014), Chương 1–4; Boyd và Vandenberghe (2004), Chương 2 và 4; Kupferschmid (2023), Chương 3 và 7; số trang là trang in của sách. Lời giải dẫn định nghĩa, định lý, mệnh đề, hệ quả, nhận xét, thuật toán, ví dụ và bài tập theo số hiệu của ghi chú. Ký hiệu theo ghi chú gồm:

- vector viết dạng cột, ví dụ $x=(x_1,x_2)^T$, và bất đẳng thức giữa hai vector hiểu theo từng thành phần;
- bài toán viết ở chiều cực đại, trừ bài lấy từ Boyd và Vandenberghe, Bài 4.9, giữ chiều cực tiểu của sách;
- $s_i=b_i-a_i^Tx\ge0$ là biến bù của ràng buộc thứ $i$, $\tilde s_i$ là biến nhân tạo của pha I, $\bar c_j$ là chi phí rút gọn;
- bảng đơn hình theo (8.4): hàng cuối gồm các $\bar c_j$ và $-z$, mọi số viết bằng phân số;
- quy tắc Dantzig chọn biến vào có $\bar c_j$ lớn nhất; quy tắc Bland chọn biến vào và biến ra có chỉ số nhỏ nhất theo thứ tự $x_1,\ldots,x_n,s_1,\ldots,s_m$, rồi đến các biến nhân tạo.

| Mục tiêu học tập | Bài tập trong ghi chú | Bài tập trong tệp này |
|---|---|---|
| 1. Lập quy hoạch tuyến tính, hồi quy sai số tuyệt đối | 07.1, 07.2, 07.16, 07.18 | 07.23, 07.32 |
| 2. Đa diện, dạng chuẩn, nghiệm cơ sở | 07.3, 07.4, 07.16, 07.17 | 07.22 |
| 3. Điểm cực biên và điều kiện tồn tại | 07.5, 07.16, 07.17 | 07.19, 07.22, 07.24 |
| 4. Kết cục, điểm cực biên tối ưu, duyệt đỉnh kề | 07.6, 07.7, 07.16, 07.17 | 07.19, 07.25, 07.26, 07.32 |
| 5. Phương pháp đơn hình, quy tắc Bland, pha I | 07.8–07.12, 07.16 | 07.20, 07.27, 07.28, 07.29, 07.30 |
| 6. Quy hoạch động | 07.14, 07.15, 07.16, 07.18 | 07.21, 07.31 |

## Mức nhận biết

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 3, 4; kiểm tra giả thiết về điểm cực biên trước khi áp dụng một định lý về nghiệm đỉnh.

::: exercise Bài tập 07.19 (Bài toán khả thi không có nghiệm đỉnh; Vanderbei, Bài 3.5, tr. 37)
Xét bài toán cực đại $x_1+3x_2$ dưới $-2x_1\le-5$, $x_1\ge0$, trong đó $x_2\in\mathbb R$ không có ràng buộc dấu.

- **(a)** Chứng minh bài toán có phương án khả thi nhưng miền khả thi không có điểm cực biên.
- **(b)** Định lý cơ bản của quy hoạch tuyến tính (Vanderbei, Định lý 3.4, tr. 33) phát biểu cho bài toán cực đại $c^Tx$ dưới $Ax\le b$, $x\ge0$ như sau: (1) nếu bài toán không có nghiệm tối ưu thì nó không khả thi hoặc không bị chặn; (2) nếu có phương án khả thi thì có nghiệm cơ sở khả thi; (3) nếu có nghiệm tối ưu thì có nghiệm cơ sở tối ưu. Đối chiếu kết quả của (a) với định lý này.
:::

::: hint Gợi ý 1
Viết miền khả thi thành một đa diện trong $\mathbb R^2$ và tính hạng của ma trận các hàng.
:::

::: hint Gợi ý 2
Ở (b), kiểm tra giả thiết về dấu của từng biến trong định lý, rồi đưa bài toán về đúng dạng đó bằng phép tách biến tự do.
:::

::: solution Lời giải Bài tập 07.19
**Câu (a).** Điểm $(\tfrac52,0)$ khả thi. Miền khả thi là $\{x\in\mathbb R^2\mid -2x_1\le-5,\ -x_1\le0\}$, với hai hàng $(-2,0)$, $(-1,0)$ có hạng $1<2$. Theo Định lý 07.17, miền không có điểm cực biên. Trực tiếp: mỗi điểm khả thi $(x_1,x_2)$ là trung điểm của hai điểm khả thi $(x_1,x_2-1)$ và $(x_1,x_2+1)$.

**Câu (b).** Định lý 3.4 của Vanderbei đòi mọi biến không âm, còn $x_2$ là biến tự do, nên bài toán không thuộc dạng của định lý và kết luận (2) không áp dụng. Thay $x_2=x_2^+-x_2^-$ với $x_2^+,x_2^-\ge0$ (Mệnh đề 02.10(b)), ta được bài toán cực đại $x_1+3x_2^+-3x_2^-$ dưới $-2x_1\le-5$, $(x_1,x_2^+,x_2^-)\ge0$, đúng dạng của định lý. Bài toán mới có điểm cực biên $(\tfrac52,0,0)$, nơi ba ràng buộc $-2x_1=-5$, $x_2^+=0$, $x_2^-=0$ có ba hàng độc lập (Định lý 07.10), phù hợp kết luận (2).

Bài toán ban đầu không có nghiệm tối ưu: các điểm $(3,t)$, $t\ge0$, khả thi với mục tiêu $3+3t\to+\infty$. Đây là kết cục không bị chặn của Định lý 07.23, phù hợp kết luận (1). Định lý 07.20 cũng cần (L2), và (L2) không thỏa trên miền ban đầu.

**Kiểm tra lại.** Tại $(3,t)$: $-6\le-5$ và $3\ge0$. Tại $(\tfrac52,0,0)$ của bài toán đã tách biến, ma trận ba hàng hoạt động $(-2,0,0)$, $(0,-1,0)$, $(0,0,-1)$ có định thức $-2\ne0$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 5; đọc các cặp biến vào, biến ra từ biểu diễn của biến cơ sở và áp dụng hai quy tắc chọn.

::: exercise Bài tập 07.20 (Các cặp biến vào, biến ra; Vanderbei, Bài 3.7, tr. 37)
Tại một nghiệm cơ sở khả thi của một bài toán cực đại với các biến $x_1,\ldots,x_6\ge0$, mục tiêu $z$ và các biến cơ sở $x_6$, $x_4$, $x_1$ được viết theo các biến ngoài cơ sở $x_2$, $x_3$, $x_5$ như sau:

$$
\begin{aligned}
z&=5+2x_2-2x_3+3x_5,\\
x_6&=4-2x_2-x_3+x_5,\\
x_4&=2-x_2+x_3-x_5,\\
x_1&=6-2x_2-2x_3-3x_5 .
\end{aligned}
$$

Một bước xoay chọn một biến vào có hệ số dương trong $z$ và một biến ra đạt cực tiểu ở phép thử tỉ số.

- **(a)** Liệt kê mọi cặp (biến vào, biến ra) có thể chọn.
- **(b)** Liệt kê các cặp đó khi biến vào được chọn theo quy tắc Dantzig, tức có hệ số lớn nhất trong $z$.
- **(c)** Liệt kê các cặp đó khi biến vào và biến ra được chọn theo quy tắc Bland, với thứ tự $x_1,\ldots,x_6$.
:::

::: hint Gợi ý 1
Khi một biến vào tăng từ $0$, biến cơ sở nào giảm là biến có hệ số âm của biến vào trong dòng của nó; tỉ số là hằng số của dòng chia cho giá trị tuyệt đối của hệ số đó.
:::

::: hint Gợi ý 2
Tính các tỉ số cho từng biến vào có thể chọn; chú ý các trường hợp tỉ số bằng nhau.
:::

::: solution Lời giải Bài tập 07.20
**Câu (a).** Hai biến có hệ số dương trong $z$ là $x_2$ (hệ số $2$) và $x_5$ (hệ số $3$).

- Với $x_2$ vào: cả ba biến cơ sở giảm, với tỉ số $x_6$: $\tfrac42=2$, $x_4$: $\tfrac21=2$, $x_1$: $\tfrac62=3$. Cực tiểu $2$ đạt tại $x_6$ và $x_4$.
- Với $x_5$ vào: $x_6$ tăng; $x_4$ và $x_1$ giảm, với tỉ số $x_4$: $\tfrac21=2$, $x_1$: $\tfrac63=2$. Cực tiểu $2$ đạt tại $x_4$ và $x_1$.

Bốn cặp là $(x_2,x_6)$, $(x_2,x_4)$, $(x_5,x_4)$, $(x_5,x_1)$. Mỗi cực tiểu đạt tại hai biến, nên sau bước xoay biến cơ sở còn lại trong hai biến đó bằng $0$: nghiệm mới suy biến.

**Câu (b).** Quy tắc Dantzig chọn $x_5$ (hệ số $3>2$), nên hai cặp là $(x_5,x_4)$ và $(x_5,x_1)$.

**Câu (c).** Quy tắc Bland chọn biến vào có chỉ số nhỏ nhất trong $\{x_2,x_5\}$, tức $x_2$, rồi biến ra có chỉ số nhỏ nhất trong $\{x_6,x_4\}$, tức $x_4$. Cặp duy nhất là $(x_2,x_4)$.

**Kiểm tra lại.** Với cặp $(x_2,x_4)$, đặt $x_2=2$, $x_3=x_5=0$: $x_6=0$, $x_4=0$, $x_1=2$, và $z=9$. Với cặp $(x_5,x_4)$, đặt $x_5=2$, $x_2=x_3=0$: $x_6=6$, $x_4=0$, $x_1=0$, và $z=11$.
:::

**Mức độ:** nhận biết. **Mục tiêu:** mục tiêu học tập 6; nêu các đặc điểm làm cho phương trình Bellman của quy hoạch động áp dụng được.

::: exercise Bài tập 07.21 (Đặc điểm của bài toán giải được bằng quy hoạch động; Kupferschmid, Bài 7.10.48, tr. 288)
Nêu các đặc điểm mà một bài toán tối ưu cần có để giải được bằng quy hoạch động.
:::

::: hint Gợi ý 1
Xét bài toán đường đi ngắn nhất trên đồ thị tầng: các quyết định được chia thế nào, và thông tin nào đủ để tính phần chi phí còn lại.
:::

::: hint Gợi ý 2
Với mỗi đặc điểm, xét phương trình Bellman còn viết được hay không khi đặc điểm đó không có.
:::

::: solution Lời giải Bài tập 07.21
Bài toán cần các đặc điểm sau, tương ứng với các giả thiết (D1)–(D4) của Định lý 07.49:

- **chuỗi quyết định theo giai đoạn:** các biến quyết định được chọn lần lượt qua hữu hạn giai đoạn, mỗi giai đoạn chọn một điều khiển trong một tập hữu hạn (D1);
- **trạng thái:** sau mỗi quyết định, một trạng thái xác định các lựa chọn còn lại, và trạng thái kế tiếp được tính từ trạng thái và điều khiển hiện tại, $\xi_{k+1}=f_k(\xi_k,u_k)$ (D2);
- **mục tiêu tách được:** mục tiêu là tổng các đóng góp của từng giai đoạn cộng một đóng góp cuối (D3); Kupferschmid (§7.8.2, tr. 279) gọi mục tiêu như vậy là tách được (separable), tức tính được theo giai đoạn, mỗi giai đoạn chỉ chứa một biến;
- **trạng thái đủ:** đóng góp và tập điều khiển của các giai đoạn sau chỉ phụ thuộc trạng thái hiện tại, không phụ thuộc cách đi tới trạng thái đó (D4).

Khi đủ bốn đặc điểm, Định lý 07.49 cho phương trình Bellman (9.3), và Thuật toán 07.52 tính $J_k$ từ cuối về đầu. Khi (D4) không thỏa, mở rộng trạng thái theo Nhận xét 07.47. Để bảng $J_k$ lưu được, số trạng thái mỗi giai đoạn còn phải đủ nhỏ (Nhận xét 07.55).

**Kiểm tra lại.** Bài toán cực đại $x_1+x_2$ theo $x_1,x_2\in\{0,1\}$ dưới $x_1+x_2\le1$ có đủ bốn đặc điểm: giai đoạn $k$ chọn $x_{k+1}$, trạng thái là ngân sách còn lại, $\xi_0=1$. Với $\Lambda_k=-J_k$ là lợi ích tối ưu còn lại, $\Lambda_1(1)=1$, $\Lambda_1(0)=0$ và $\Lambda_0(1)=\max\{0+\Lambda_1(1),\ 1+\Lambda_1(0)\}=1$, bằng giá trị lớn nhất tìm bằng liệt kê bốn điểm.
:::

## Mức tính toán hoặc chứng minh

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 2, 3; nhận biết đa diện, viết nó bằng hữu hạn bất phương trình và phương trình tuyến tính.

::: exercise Bài tập 07.22 (Bốn tập và đa diện; Boyd và Vandenberghe, Bài 2.8, tr. 60)
Một đa diện là tập nghiệm của hữu hạn bất phương trình và phương trình tuyến tính, tức tập có dạng $\{x\mid A'x\le b',\ A''x=b''\}$. Ký hiệu $\mathbf 1$ là vector có mọi thành phần bằng $1$. Xác định tập $S$ nào dưới đây là đa diện; với mỗi tập là đa diện, viết $S$ ở dạng trên.

- **(a)** $S=\{\rho_1g_1+\rho_2g_2\mid -1\le\rho_1\le1,\ -1\le\rho_2\le1\}$, với $g_1,g_2\in\mathbb R^n$.
- **(b)** $S=\{x\in\mathbb R^n\mid x\ge0,\ \mathbf 1^Tx=1,\ \sum_{i=1}^nx_i\alpha_i=\beta_1,\ \sum_{i=1}^nx_i\alpha_i^2=\beta_2\}$, với $\alpha_1,\ldots,\alpha_n\in\mathbb R$ và $\beta_1,\beta_2\in\mathbb R$.
- **(c)** $S=\{x\in\mathbb R^n\mid x\ge0,\ x^Ty\le1$ với mọi $y$ có $\lVert y\rVert_2=1\}$.
- **(d)** $S=\{x\in\mathbb R^n\mid x\ge0,\ x^Ty\le1$ với mọi $y$ có $\sum_{i=1}^n\lvert y_i\rvert=1\}$.
:::

::: hint Gợi ý 1
Ở (a), viết $S$ là ảnh của hình vuông $[-1,1]^2$ qua ánh xạ $\rho\mapsto G\rho$ với $G=[g_1\ g_2]$, và xét theo hạng của $G$. Ở (c) và (d), với $x$ cố định, tính giá trị lớn nhất của $x^Ty$ trên tập các $y$ đã cho, rồi viết điều kiện của tập thành một điều kiện trên $x$.
:::

::: hint Gợi ý 2
Ở (a), khi $g_1$, $g_2$ độc lập, mỗi $x\in S$ có đúng một vector hệ số $\rho=(G^TG)^{-1}G^Tx$. Ở (c) với $n\ge2$, xét các điểm $x\ge0$ có $\lVert x\rVert_2=1$ và số điểm cực biên của một đa diện.
:::

::: solution Lời giải Bài tập 07.22
**Câu (a).** $S$ là đa diện. Đặt $G=[g_1\ g_2]\in\mathbb R^{n\times2}$, nên $S=\{G\rho\mid -\mathbf 1\le\rho\le\mathbf 1\}$ với $\rho\in\mathbb R^2$. Xét theo hạng của $G$.

- **Hạng $2$.** $G^TG$ khả nghịch. Đặt $K=(G^TG)^{-1}G^T\in\mathbb R^{2\times n}$ và $R=I-GK$. Nếu $x=G\rho$ thì $Kx=\rho$ và $Rx=G\rho-G\rho=0$. Ngược lại, nếu $Rx=0$ thì $x=G(Kx)$. Do đó
$$
\begin{aligned}
S=\{x\mid\ &Kx\le\mathbf 1,\\
&-Kx\le\mathbf 1,\\
&Rx=0\},
\end{aligned}
$$
tức $A'=\begin{bmatrix}K\\-K\end{bmatrix}$, $b'=\mathbf 1\in\mathbb R^4$, $A''=R$, $b''=0$.
- **Hạng $1$.** Giả sử $g_1\ne0$ và $g_2=\kappa g_1$ (khi $g_1=0\ne g_2$, đổi vai hai vector). Khi $\rho_1$, $\rho_2$ chạy trên $[-1,1]$, số $\rho_1+\kappa\rho_2$ chạy khắp $[-(1+\lvert\kappa\rvert),1+\lvert\kappa\rvert]$, nên $S=\{tg_1\mid \lvert t\rvert\le1+\lvert\kappa\rvert\}$. Với $\ell=g_1/\lVert g_1\rVert_2^2$ và $R=I-g_1\ell^T$, $S=\{x\mid \ell^Tx\le1+\lvert\kappa\rvert,\ -\ell^Tx\le1+\lvert\kappa\rvert,\ Rx=0\}$.
- **Hạng $0$.** $S=\{0\}=\{x\mid Ix=0\}$.

**Câu (b).** $S$ là đa diện: ba điều kiện $\mathbf 1^Tx=1$, $\sum_ix_i\alpha_i=\beta_1$, $\sum_ix_i\alpha_i^2=\beta_2$ tuyến tính theo $x$ vì $\alpha_i$, $\beta_1$, $\beta_2$ là số cho trước. Ta có $A'=-I$, $b'=0$, còn $A''$ có ba hàng $\mathbf 1^T$, $(\alpha_1,\ldots,\alpha_n)$, $(\alpha_1^2,\ldots,\alpha_n^2)$ và $b''=(1,\beta_1,\beta_2)$.

**Câu (c).** Theo bất đẳng thức Cauchy–Schwarz, $x^Ty\le\lVert x\rVert_2$ khi $\lVert y\rVert_2=1$, với dấu bằng tại $y=x/\lVert x\rVert_2$ khi $x\ne0$. Do đó $S=\{x\ge0\mid\lVert x\rVert_2\le1\}$.

- Với $n=1$, $S=[0,1]=\{x\mid -x\le0,\ x\le1\}$ là đa diện.
- Với $n\ge2$, $S$ không là đa diện. Mỗi điểm $x\ge0$ có $\lVert x\rVert_2=1$ là một điểm cực biên của $S$: nếu $x=\lambda x'+(1-\lambda)x''$ với $x',x''\in S$, $0<\lambda<1$, thì $1=x^Tx=\lambda x^Tx'+(1-\lambda)x^Tx''$ trong khi $x^Tx'\le1$, $x^Tx''\le1$, nên $x^Tx'=1$; khi đó $\lVert x-x'\rVert_2^2=1-2+\lVert x'\rVert_2^2\le0$, tức $x'=x$, và tương tự $x''=x$. Các điểm $(\cos t,\sin t,0,\ldots,0)$, $t\in[0,\tfrac\pi2]$, cho vô số điểm cực biên. Một đa diện viết được ở dạng (5.1) bằng cách thay mỗi phương trình bằng hai bất phương trình, nên theo Hệ quả 07.11 nó có hữu hạn điểm cực biên.

**Câu (d).** Khi $\sum_i\lvert y_i\rvert=1$, $x^Ty\le\sum_i\lvert x_i\rvert\lvert y_i\rvert\le\max_i\lvert x_i\rvert$. Dấu bằng đạt khi chọn $k$ với $\lvert x_k\rvert=\max_i\lvert x_i\rvert$, $y_k=1$ nếu $x_k\ge0$, $y_k=-1$ nếu $x_k<0$, và $y_i=0$ với $i\ne k$. Do đó $S=\{x\mid 0\le x_i\le1,\ i=1,\ldots,n\}$ là đa diện, với $A'=\begin{bmatrix}-I\\I\end{bmatrix}$, $b'=(0,\mathbf 1)$ và không có phương trình.

**Kiểm tra lại.** Ở (a) với $n=2$, $g_1=(1,0)$, $g_2=(1,1)$: $K=G^{-1}=\begin{bmatrix}1&-1\\0&1\end{bmatrix}$, $R=0$, nên $S=\{x\mid\lvert x_1-x_2\rvert\le1,\ \lvert x_2\rvert\le1\}$; bốn góc $G(\pm1,\pm1)$ là $(2,1)$, $(0,-1)$, $(0,1)$, $(-2,-1)$, và tại $(2,1)$: $x_1-x_2=1$, $x_2=1$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 1; lập quy hoạch tuyến tính từ dữ kiện cho bằng lời và giải bằng cách so sánh lợi nhuận trên một đơn vị tài nguyên chung.

::: exercise Bài tập 07.23 (Phân bổ giờ của máy cán thép; Vanderbei, Bài 1.1, tr. 7–8)
Một công ty thép phân bổ thời gian của một máy cán trong tuần tới. Máy nhận phôi thép và sản xuất một trong hai bán thành phẩm: thép băng (bands) và thép cuộn (coils). Tốc độ sản xuất là $200$ tấn/giờ với thép băng và $140$ tấn/giờ với thép cuộn; lợi nhuận là $25$ USD/tấn với thép băng và $30$ USD/tấn với thép cuộn. Theo các đơn hàng đã nhận, sản lượng tối đa là $6\,000$ tấn thép băng và $4\,000$ tấn thép cuộn. Tuần này máy có $40$ giờ sản xuất.

- **(a)** Lập quy hoạch tuyến tính chọn số tấn thép băng và thép cuộn để lợi nhuận lớn nhất.
- **(b)** Giải bài toán bằng cách so sánh trực tiếp các dữ kiện.
:::

::: hint Gợi ý 1
Số giờ máy dùng cho một loại bằng số tấn chia cho tốc độ sản xuất của loại đó.
:::

::: hint Gợi ý 2
Tính lợi nhuận trên mỗi giờ máy của từng loại và so sánh.
:::

::: solution Lời giải Bài tập 07.23
**Câu (a).** Gọi $x_1$, $x_2$ là số tấn thép băng và thép cuộn. Bài toán là cực đại $25x_1+30x_2$ (USD) dưới

$$
\begin{aligned}
&\tfrac1{200}x_1+\tfrac1{140}x_2\le40,\\
&x_1\le6\,000,\quad x_2\le4\,000,\\
&x\ge0 .
\end{aligned}
$$

Ràng buộc đầu tính bằng giờ, hai ràng buộc sau tính bằng tấn.

**Câu (b).** Một giờ máy cho $25\cdot200=5\,000$ USD nếu cán thép băng và $30\cdot140=4\,200$ USD nếu cán thép cuộn. Do đó dùng giờ máy cho thép băng trước: $6\,000$ tấn cần $30$ giờ, và $10$ giờ còn lại cho $1\,400\le4\,000$ tấn thép cuộn. Phương án $(6\,000;\ 1\,400)$ cho lợi nhuận $150\,000+42\,000=192\,000$ USD.

Phương án này tối ưu. Với mọi phương án khả thi,

$$
\begin{aligned}
&25x_1+30x_2\\
&\quad=4\,200\bigl(\tfrac{x_1}{200}+\tfrac{x_2}{140}\bigr)+4x_1\\
&\quad\le4\,200\cdot40+4\cdot6\,000\\
&\quad=192\,000,
\end{aligned}
$$

vì $\tfrac{4\,200}{200}=21=25-4$ và $\tfrac{4\,200}{140}=30$. Dấu bằng cần ràng buộc giờ máy hoạt động và $x_1=6\,000$, tức $x_2=1\,400$: nghiệm tối ưu duy nhất. Hai hệ số $4\,200$ và $4$ đóng vai nhân tử của chứng nhận cận trên như ở Ví dụ 07.5 (Mệnh đề 02.11).

**Kiểm tra lại.** $\tfrac{6\,000}{200}+\tfrac{1\,400}{140}=30+10=40$ giờ; $25\cdot6\,000+30\cdot1\,400=192\,000$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 3; biểu diễn các điểm của một tam giác bằng tổ hợp lồi của ba đỉnh.

::: exercise Bài tập 07.24 (Biểu diễn tam giác bằng tổ hợp lồi của ba đỉnh; Kupferschmid, Bài 3.7.31, tr. 129)
Cho $v^1,v^2,v^3\in\mathbb R^2$ là ba đỉnh của một tam giác đều. Tam giác $T$, gồm cả phần trong, là giao của ba nửa mặt phẳng; mỗi nửa mặt phẳng có biên là đường thẳng qua hai đỉnh và chứa đỉnh còn lại. Viết công thức tổ hợp lồi của ba đỉnh và chứng minh rằng khi thay đổi các tham số, công thức cho mọi điểm của $T$ và không cho điểm nào nằm ngoài $T$.
:::

::: hint Gợi ý 1
Hai vector $v^2-v^1$, $v^3-v^1$ độc lập tuyến tính, nên mỗi $x\in\mathbb R^2$ viết được duy nhất dưới dạng $x=\lambda_1v^1+\lambda_2v^2+\lambda_3v^3$ với $\lambda_1+\lambda_2+\lambda_3=1$.
:::

::: hint Gợi ý 2
Viết đường thẳng qua $v^2$, $v^3$ là $a^Tx=\beta$ và tính $a^Tx$ theo $\lambda_1,\lambda_2,\lambda_3$.
:::

::: solution Lời giải Bài tập 07.24
Công thức là

$$
\begin{aligned}
&x=\lambda_1v^1+\lambda_2v^2+\lambda_3v^3,\\
&\lambda_1,\lambda_2,\lambda_3\ge0,\\
&\lambda_1+\lambda_2+\lambda_3=1 .
\end{aligned}
$$

**Lộ trình.** Gán cho mỗi điểm của mặt phẳng một bộ tham số duy nhất có tổng $1$, rồi chứng minh mỗi nửa mặt phẳng tạo nên $T$ là tập các điểm có một tham số không âm.

**Bước 1 (bộ tham số).** Ba đỉnh không thẳng hàng, nên $v^2-v^1$, $v^3-v^1$ là một cơ sở của $\mathbb R^2$. Với mỗi $x$ có duy nhất $(\mu_2,\mu_3)$ để $x-v^1=\mu_2(v^2-v^1)+\mu_3(v^3-v^1)$. Đặt $\lambda_2=\mu_2$, $\lambda_3=\mu_3$, $\lambda_1=1-\mu_2-\mu_3$: ta được $x=\lambda_1v^1+\lambda_2v^2+\lambda_3v^3$ với tổng các $\lambda_i$ bằng $1$, và bộ $(\lambda_1,\lambda_2,\lambda_3)$ có tính chất này là duy nhất.

**Bước 2 (một nửa mặt phẳng).** Chọn $a\ne0$ vuông góc với $v^3-v^2$ và đặt $\beta=a^Tv^2=a^Tv^3$, nên đường thẳng qua $v^2$, $v^3$ là $a^Tx=\beta$. Đổi dấu $a$ và $\beta$ nếu cần để $a^Tv^1<\beta$; nửa mặt phẳng chứa $v^1$ là $H_1=\{x\mid a^Tx\le\beta\}$. Với $x$ như ở Bước 1,

$$
\begin{aligned}
a^Tx&=\lambda_1a^Tv^1+(\lambda_2+\lambda_3)\beta\\
&=\beta-\lambda_1(\beta-a^Tv^1).
\end{aligned}
$$

Vì $\beta-a^Tv^1>0$, $x\in H_1$ khi và chỉ khi $\lambda_1\ge0$. Tương tự, nửa mặt phẳng $H_2$ chứa $v^2$ ứng với $\lambda_2\ge0$, và $H_3$ chứa $v^3$ ứng với $\lambda_3\ge0$.

**Bước 3 (kết luận).** $T=H_1\cap H_2\cap H_3$ là tập các $x$ có bộ tham số của Bước 1 không âm. Do đó mỗi điểm của $T$ là một tổ hợp lồi của ba đỉnh, và mỗi tổ hợp lồi của ba đỉnh thuộc $T$. $\square$

Tính đều của tam giác không dùng tới.

**Liên hệ với điểm cực biên.** Theo Bước 1, mỗi đỉnh, chẳng hạn $v^1$, có bộ tham số $(1,0,0)$. Nếu $v^1=\tau x'+(1-\tau)x''$ với $x',x''\in T$, $0<\tau<1$, thì tham số thứ nhất của $v^1$ là $\tau\lambda_1'+(1-\tau)\lambda_1''=1$, trong đó $\lambda_1'$, $\lambda_1''$ là tham số thứ nhất của $x'$, $x''$ và cùng không vượt $1$, nên $\lambda_1'=\lambda_1''=1$ và $x'=x''=v^1$: mỗi đỉnh là một điểm cực biên của $T$ (Định nghĩa 07.8).

**Kiểm tra lại.** Với $v^1=(0,0)$, $v^2=(1,0)$, $v^3=(\tfrac12,\tfrac{\sqrt3}2)$, trọng tâm $\tfrac13(v^1+v^2+v^3)=(\tfrac12,\tfrac{\sqrt3}6)$ có bộ tham số $(\tfrac13,\tfrac13,\tfrac13)$. Điểm $(1,1)$ có $\mu_3=\tfrac2{\sqrt3}\approx1{,}155$, $\mu_2=1-\tfrac{\mu_3}2\approx0{,}423$, nên $\lambda_1\approx-0{,}577<0$: điểm nằm ngoài $T$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 4; xác định kết cục của một quy hoạch tuyến tính thuần nhất.

::: exercise Bài tập 07.25 (Quy hoạch tuyến tính có vế phải bằng không; Vanderbei, Bài 3.4, tr. 36–37)
Xét các quy hoạch tuyến tính có vế phải bằng $0$: cực đại $\sum_{j=1}^nc_jx_j$ dưới $\sum_{j=1}^na_{ij}x_j\le0$, $i=1,\ldots,m$, và $x_j\ge0$, $j=1,\ldots,n$. Chứng minh rằng hoặc $x=0$ là nghiệm tối ưu, hoặc bài toán không bị chặn.
:::

::: hint Gợi ý 1
Nếu $x$ khả thi thì $\theta x$ khả thi với mọi $\theta\ge0$.
:::

::: hint Gợi ý 2
Tách hai trường hợp theo việc có hay không một điểm khả thi với giá trị mục tiêu dương.
:::

::: solution Lời giải Bài tập 07.25
Gọi $P=\{x\mid Ax\le0,\ x\ge0\}$, với $A$ có phần tử $a_{ij}$. Điểm $0$ thuộc $P$ và có giá trị $0$.

- **Mọi $x\in P$ có $c^Tx\le0$.** Khi đó $c^Tx\le0=c^T0$ trên $P$, nên $x=0$ là nghiệm tối ưu và $z^*=0$.
- **Có $\hat x\in P$ với $c^T\hat x>0$.** Với $\theta\ge0$, $A(\theta\hat x)=\theta A\hat x\le0$ và $\theta\hat x\ge0$, nên $\theta\hat x\in P$, và $c^T(\theta\hat x)=\theta c^T\hat x\to+\infty$ khi $\theta\to+\infty$: bài toán không bị chặn.

Hai trường hợp loại trừ nhau và bao hết mọi khả năng. Theo Định lý 07.23, kết cục không khả thi không xảy ra vì $0\in P$; hai kết cục có $z^*$ hữu hạn ứng với trường hợp thứ nhất, với $z^*=0$.

**Kiểm tra lại.** Với $n=m=1$: dưới $x\le0$, $x\ge0$ miền là $\{0\}$ và $x=0$ tối ưu; dưới $-x\le0$, $x\ge0$, mục tiêu $x$ không bị chặn, còn mục tiêu $-x$ đạt cực đại $0$ tại $x=0$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 4; tính giá trị tối ưu của một quy hoạch tuyến tính có ma trận vuông khả nghịch.

::: exercise Bài tập 07.26 (Quy hoạch tuyến tính với ma trận vuông khả nghịch; Boyd và Vandenberghe, Bài 4.9, tr. 193)
Xét bài toán cực tiểu $c^Tx$ dưới $Ax\le b$, với $A\in\mathbb R^{n\times n}$ khả nghịch và $b,c\in\mathbb R^n$. Ký hiệu $A^{-T}=(A^{-1})^T$. Chứng minh giá trị tối ưu $z^*=\inf\{c^Tx\mid Ax\le b\}$ bằng $c^TA^{-1}b$ khi $A^{-T}c\le0$, và bằng $-\infty$ trong trường hợp còn lại.
:::

::: hint Gợi ý 1
Đổi biến $y=Ax$; tập khả thi theo $y$ là $\{y\mid y\le b\}$.
:::

::: hint Gợi ý 2
Viết $c^Tx=d^Ty$ với $d=A^{-T}c$, rồi xét dấu từng thành phần của $d$.
:::

::: solution Lời giải Bài tập 07.26
**Đổi biến.** Vì $A$ khả nghịch, $y=Ax$ là một song ánh của $\mathbb R^n$, với $x=A^{-1}y$. Điều kiện $Ax\le b$ thành $y\le b$, và $c^Tx=c^TA^{-1}y=d^Ty$ với $d=A^{-T}c$.

**Trường hợp $d\le0$.** Với mọi $y\le b$, mỗi số hạng thỏa $d_iy_i\ge d_ib_i$ vì $d_i\le0$ và $y_i\le b_i$. Do đó $d^Ty\ge d^Tb=c^TA^{-1}b$, với dấu bằng tại $y=b$, tức $x=A^{-1}b$. Vậy $z^*=c^TA^{-1}b$ và được đạt.

**Trường hợp có $d_k>0$.** Với $t\ge0$, lấy $y(t)$ có $y_k=b_k-t$ và $y_i=b_i$ khi $i\ne k$. Điểm $x(t)=A^{-1}y(t)$ khả thi và $c^Tx(t)=d^Tb-td_k\to-\infty$ khi $t\to+\infty$. Vậy $z^*=-\infty$: kết cục không bị chặn của Định lý 07.23, viết cho chiều cực tiểu.

Trong trường hợp thứ nhất, $\mu=-d\ge0$ thỏa $c=A^T(-\mu)$, nên $c^Tx=-\mu^TAx\ge-\mu^Tb$ trên miền khả thi: đây là chứng nhận cận dưới của Mệnh đề 02.11 với các nhân tử $\mu$.

**Kiểm tra lại.** Với $n=1$, $A=2$, $b=4$: miền là $x\le2$. Khi $c=-3$, $d=-\tfrac32\le0$ và $z^*=\tfrac{-3\cdot4}2=-6$, đạt tại $x=2$. Khi $c=3$, $d=\tfrac32>0$ và $3x\to-\infty$ khi $x\to-\infty$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 5; chạy phương pháp đơn hình dạng bảng trên một bài toán bốn biến.

::: exercise Bài tập 07.27 (Phương pháp đơn hình cho một bài toán bốn biến; Vanderbei, Bài 2.1, tr. 20)
Giải bài toán cực đại $6x_1+8x_2+5x_3+9x_4$ dưới

$$
\begin{aligned}
2x_1+x_2+x_3+3x_4&\le5,\\
x_1+3x_2+x_3+2x_4&\le3,
\end{aligned}
$$

và $x_1,x_2,x_3,x_4\ge0$.
:::

::: hint Gợi ý 1
Thêm biến bù $s_1$, $s_2$; vế phải không âm, nên cơ sở $\{s_1,s_2\}$ khả thi và bảng đầu là $[A\ I\mid b]$ với hàng cuối $[c^T\ 0\mid0]$.
:::

::: hint Gợi ý 2
Theo quy tắc Bland, $x_1$ vào ở bước đầu với tỉ số $\tfrac52$ ở hàng $s_1$ và $3$ ở hàng $s_2$.
:::

::: solution Lời giải Bài tập 07.27
Dạng chuẩn có thứ tự cột $(x_1,x_2,x_3,x_4,s_1,s_2)$. Chạy Thuật toán 07.31 dạng bảng (Mệnh đề 07.40) với quy tắc Bland.

**Bảng 0.**

| Cơ sở | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $s_1$ | $s_2$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|---:|
| $s_1$ | $2$ | $1$ | $1$ | $3$ | $1$ | $0$ | $5$ |
| $s_2$ | $1$ | $3$ | $1$ | $2$ | $0$ | $1$ | $3$ |
| $\bar c$ và $-z$ | $6$ | $8$ | $5$ | $9$ | $0$ | $0$ | $0$ |

$x_1$ vào; tỉ số $s_1$: $\tfrac52$, $s_2$: $3$, nên $s_1$ ra với phần tử xoay $2$.

**Bảng 1.**

| Cơ sở | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $s_1$ | $s_2$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|---:|
| $x_1$ | $1$ | $\tfrac12$ | $\tfrac12$ | $\tfrac32$ | $\tfrac12$ | $0$ | $\tfrac52$ |
| $s_2$ | $0$ | $\tfrac52$ | $\tfrac12$ | $\tfrac12$ | $-\tfrac12$ | $1$ | $\tfrac12$ |
| $\bar c$ và $-z$ | $0$ | $5$ | $2$ | $0$ | $-3$ | $0$ | $-15$ |

Điểm $(\tfrac52,0,0,0)$, $z=15$. $x_2$ vào; tỉ số $x_1$: $\tfrac52/\tfrac12=5$, $s_2$: $\tfrac12/\tfrac52=\tfrac15$, nên $s_2$ ra với phần tử xoay $\tfrac52$.

**Bảng 2.**

| Cơ sở | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $s_1$ | $s_2$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|---:|
| $x_1$ | $1$ | $0$ | $\tfrac25$ | $\tfrac75$ | $\tfrac35$ | $-\tfrac15$ | $\tfrac{12}5$ |
| $x_2$ | $0$ | $1$ | $\tfrac15$ | $\tfrac15$ | $-\tfrac15$ | $\tfrac25$ | $\tfrac15$ |
| $\bar c$ và $-z$ | $0$ | $0$ | $1$ | $-1$ | $-2$ | $-2$ | $-16$ |

Điểm $(\tfrac{12}5,\tfrac15,0,0)$, $z=16$. Chỉ $\bar c_{x_3}=1$ dương; tỉ số $x_1$: $\tfrac{12}5/\tfrac25=6$, $x_2$: $\tfrac15/\tfrac15=1$, nên $x_2$ ra với phần tử xoay $\tfrac15$.

**Bảng 3.**

| Cơ sở | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $s_1$ | $s_2$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|---:|
| $x_1$ | $1$ | $-2$ | $0$ | $1$ | $1$ | $-1$ | $2$ |
| $x_3$ | $0$ | $5$ | $1$ | $1$ | $-1$ | $2$ | $1$ |
| $\bar c$ và $-z$ | $0$ | $-5$ | $0$ | $-2$ | $-1$ | $-4$ | $-17$ |

Mọi chi phí rút gọn ngoài cơ sở âm, nên theo Mệnh đề 07.29(b), $x^*=(2,0,1,0)$ tối ưu với $z^*=17$. Nghiệm này duy nhất: theo Mệnh đề 07.29(a), mọi phương án khả thi $x'$ có $c^Tx'-17=-5x_2'-2x_4'-s_1'-4s_2'$, âm khi một trong bốn biến ngoài cơ sở dương.

Với quy tắc Dantzig, đường đi có bốn bước xoay:

- $x_4$ vào ($\bar c_{x_4}=9$); tỉ số $s_1$: $\tfrac53$, $s_2$: $\tfrac32$; $s_2$ ra;
- $x_1$ vào; tỉ số $s_1$: $1$, $x_4$: $3$; $s_1$ ra;
- $x_2$ vào; chỉ $x_4$ giảm, với tỉ số $\tfrac15$; $x_4$ ra, tới cơ sở $\{x_1,x_2\}$ của bảng 2;
- $x_3$ vào, $x_2$ ra như trên, tới cùng nghiệm.

**Kiểm tra lại.** Tại $(2,0,1,0)$: $4+1=5$, $2+1=3$, $z=12+5=17$. Hai hệ số $-\bar c_{s_1}=1$, $-\bar c_{s_2}=4$ cho $6x_1+8x_2+5x_3+9x_4\le(2x_1+x_2+x_3+3x_4)+4(x_1+3x_2+x_3+2x_4)\le5+12=17$, vì $6\le6$, $8\le13$, $5\le5$, $9\le11$ và $x\ge0$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 5; dùng phương pháp hai pha để phát hiện ba kết cục: có nghiệm tối ưu, không khả thi, không bị chặn.

::: exercise Bài tập 07.28 (Phương pháp hai pha trên ba bài toán; Vanderbei, Bài 2.5, 2.6, 2.7, tr. 20–21)
Giải ba bài toán cực đại $x_1+3x_2$ với $x_1,x_2\ge0$ và các ràng buộc sau.

- **(a)** $-x_1-x_2\le-3$, $-x_1+x_2\le-1$, $x_1+2x_2\le4$.
- **(b)** $-x_1-x_2\le-3$, $-x_1+x_2\le-1$, $x_1+2x_2\le2$.
- **(c)** $-x_1-x_2\le-3$, $-x_1+x_2\le-1$, $-x_1+2x_2\le2$.
:::

::: hint Gợi ý 1
Vế phải của hai ràng buộc đầu âm, nên cơ sở gồm các biến bù không khả thi. Nhân hai phương trình đầu của dạng chuẩn với $-1$ và thêm hai biến nhân tạo $\tilde s_1$, $\tilde s_2$; phương trình thứ ba dùng biến bù $s_3$ trong cơ sở xuất phát.
:::

::: hint Gợi ý 2
Hàng cuối của bảng đầu pha I là tổng hai hàng có biến nhân tạo, tính trên các cột không nhân tạo. Ở (a), khi $\tilde z=0$ mà một biến nhân tạo còn trong cơ sở, kiểm tra hàng cuối trước khi dừng pha I.
:::

::: solution Lời giải Bài tập 07.28
Ba bài toán có chung hai ràng buộc đầu. Với biến bù $s_i\ge0$, hai phương trình đầu nhân với $-1$ là $x_1+x_2-s_1=3$, $x_1-x_2-s_2=1$; mỗi phương trình nhận một biến nhân tạo. Thứ tự cột $(x_1,x_2,s_1,s_2,s_3,\tilde s_1,\tilde s_2)$. Pha I cực đại $\tilde z=-\tilde s_1-\tilde s_2$ theo Thuật toán 07.44 với quy tắc Bland; hàng cuối ghi $\bar c$ và $-\tilde z$.

**Câu (a).** Phương trình thứ ba là $x_1+2x_2+s_3=4$.

| Bảng | Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | $\tilde s_1$ | $\tilde s_2$ | vế phải |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | $\tilde s_1$ | $1$ | $1$ | $-1$ | $0$ | $0$ | $1$ | $0$ | $3$ |
| | $\tilde s_2$ | $1$ | $-1$ | $0$ | $-1$ | $0$ | $0$ | $1$ | $1$ |
| | $s_3$ | $1$ | $2$ | $0$ | $0$ | $1$ | $0$ | $0$ | $4$ |
| | $\bar c$, $-\tilde z$ | $2$ | $0$ | $-1$ | $-1$ | $0$ | $0$ | $0$ | $4$ |
| 1 | $\tilde s_1$ | $0$ | $2$ | $-1$ | $1$ | $0$ | $1$ | $-1$ | $2$ |
| | $x_1$ | $1$ | $-1$ | $0$ | $-1$ | $0$ | $0$ | $1$ | $1$ |
| | $s_3$ | $0$ | $3$ | $0$ | $1$ | $1$ | $0$ | $-1$ | $3$ |
| | $\bar c$, $-\tilde z$ | $0$ | $2$ | $-1$ | $1$ | $0$ | $0$ | $-2$ | $2$ |
| 2 | $\tilde s_1$ | $0$ | $0$ | $-1$ | $\tfrac13$ | $-\tfrac23$ | $1$ | $-\tfrac13$ | $0$ |
| | $x_1$ | $1$ | $0$ | $0$ | $-\tfrac23$ | $\tfrac13$ | $0$ | $\tfrac23$ | $2$ |
| | $x_2$ | $0$ | $1$ | $0$ | $\tfrac13$ | $\tfrac13$ | $0$ | $-\tfrac13$ | $1$ |
| | $\bar c$, $-\tilde z$ | $0$ | $0$ | $-1$ | $\tfrac13$ | $-\tfrac23$ | $0$ | $-\tfrac43$ | $0$ |
| 3 | $s_2$ | $0$ | $0$ | $-3$ | $1$ | $-2$ | $3$ | $-1$ | $0$ |
| | $x_1$ | $1$ | $0$ | $-2$ | $0$ | $-1$ | $2$ | $0$ | $2$ |
| | $x_2$ | $0$ | $1$ | $1$ | $0$ | $1$ | $-1$ | $0$ | $1$ |
| | $\bar c$, $-\tilde z$ | $0$ | $0$ | $0$ | $0$ | $0$ | $-1$ | $-1$ | $0$ |

Các bước xoay:

- bảng 0 → 1: $x_1$ vào; tỉ số $\tilde s_1$: $3$, $\tilde s_2$: $1$, $s_3$: $4$; $\tilde s_2$ ra;
- bảng 1 → 2: $x_2$ vào; tỉ số $\tilde s_1$: $1$, $s_3$: $1$ hòa; theo quy tắc Bland $s_3$ ra;
- bảng 2 → 3: $\tilde z=0$ nhưng $\tilde s_1=0$ còn trong cơ sở; $s_2$ vào ($\bar c_{s_2}=\tfrac13$), tỉ số $\tilde s_1$: $0$, $x_2$: $3$; $\tilde s_1$ ra trong một bước xoay suy biến ($\theta^*=0$). Pha I chưa tối ưu ở bảng 2 vì $\bar c_{s_2}>0$, nên đây là một bước xoay thường của Thuật toán 07.31.

Pha I kết thúc với $\tilde z^*=0$ và cơ sở $\{s_2,x_1,x_2\}$ không chứa biến nhân tạo, nên không cần thủ tục của Mệnh đề 07.43(c). Bỏ hai cột nhân tạo; theo bảng 3, $x_1=2+2s_1+s_3$, $x_2=1-s_1-s_3$, nên

$$
\begin{aligned}
z&=x_1+3x_2\\
&=5-s_1-2s_3 .
\end{aligned}
$$

Hai chi phí rút gọn $-1$, $-2$ âm, nên pha II dừng ngay: $x^*=(2,1)$, $z^*=5$, nghiệm duy nhất.

**Câu (b).** Phương trình thứ ba là $x_1+2x_2+s_3=2$. Bảng 0 như ở (a), trừ vế phải hàng $s_3$ bằng $2$. Pha I theo quy tắc Bland:

- $x_1$ vào; tỉ số $\tilde s_1$: $3$, $\tilde s_2$: $1$, $s_3$: $2$; $\tilde s_2$ ra; điểm $(1,0)$ với $\tilde s_1=2$, $s_3=1$, $\tilde z=-2$, và cột của $x_2$ có các phần tử $2$ (hàng $\tilde s_1$), $-1$ (hàng $x_1$), $3$ (hàng $s_3$);
- $x_2$ vào; tỉ số $\tilde s_1$: $1$, $s_3$: $\tfrac13$; $s_3$ ra; điểm $(\tfrac43,\tfrac13)$ với $\tilde s_1=\tfrac43$, $\tilde z=-\tfrac43$, và cột của $s_2$ có các phần tử $\tfrac13$ (hàng $\tilde s_1$), $-\tfrac23$ (hàng $x_1$), $\tfrac13$ (hàng $x_2$);
- $s_2$ vào ($\bar c_{s_2}=\tfrac13$); tỉ số $\tilde s_1$: $\tfrac43/\tfrac13=4$, $x_2$: $\tfrac13/\tfrac13=1$; $x_2$ ra.

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | $\tilde s_1$ | $\tilde s_2$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| $\tilde s_1$ | $0$ | $-1$ | $-1$ | $0$ | $-1$ | $1$ | $0$ | $1$ |
| $x_1$ | $1$ | $2$ | $0$ | $0$ | $1$ | $0$ | $0$ | $2$ |
| $s_2$ | $0$ | $3$ | $0$ | $1$ | $1$ | $0$ | $-1$ | $1$ |
| $\bar c$, $-\tilde z$ | $0$ | $-1$ | $-1$ | $0$ | $-1$ | $0$ | $-1$ | $1$ |

Mọi chi phí rút gọn không dương, nên pha I dừng với $\tilde z^*=-1<0$. Theo Mệnh đề 07.43(b), bài toán không khả thi.

**Câu (c).** Phương trình thứ ba là $-x_1+2x_2+s_3=2$. Pha I theo quy tắc Bland:

- $x_1$ vào; $s_3$ tăng theo $x_1$, tỉ số $\tilde s_1$: $3$, $\tilde s_2$: $1$; $\tilde s_2$ ra; điểm $(1,0)$ với $\tilde s_1=2$, $s_3=3$, và cột của $x_2$ có các phần tử $2$ (hàng $\tilde s_1$), $-1$ (hàng $x_1$), $1$ (hàng $s_3$);
- $x_2$ vào; tỉ số $\tilde s_1$: $\tfrac22=1$, $s_3$: $3$; $\tilde s_1$ ra, và $\tilde z=0$ với cơ sở $\{x_2,x_1,s_3\}$ tại $(2,1)$.

Bỏ hai cột nhân tạo. Với cơ sở theo thứ tự $(x_2,x_1,s_3)$ và $c_B=(3,1,0)$, (8.2) cho $\bar c_{s_1}=0-\bigl(3\cdot(-\tfrac12)+1\cdot(-\tfrac12)\bigr)=2$, $\bar c_{s_2}=0-\bigl(3\cdot\tfrac12+1\cdot(-\tfrac12)\bigr)=-1$, và $z=3\cdot1+1\cdot2=5$. Pha II với quy tắc Bland:

| Bảng | Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | vế phải |
|---|---|---:|---:|---:|---:|---:|---:|
| 0 | $x_2$ | $0$ | $1$ | $-\tfrac12$ | $\tfrac12$ | $0$ | $1$ |
| | $x_1$ | $1$ | $0$ | $-\tfrac12$ | $-\tfrac12$ | $0$ | $2$ |
| | $s_3$ | $0$ | $0$ | $\tfrac12$ | $-\tfrac32$ | $1$ | $2$ |
| | $\bar c$, $-z$ | $0$ | $0$ | $2$ | $-1$ | $0$ | $-5$ |
| 1 | $x_2$ | $0$ | $1$ | $0$ | $-1$ | $1$ | $3$ |
| | $x_1$ | $1$ | $0$ | $0$ | $-2$ | $1$ | $4$ |
| | $s_1$ | $0$ | $0$ | $1$ | $-3$ | $2$ | $4$ |
| | $\bar c$, $-z$ | $0$ | $0$ | $0$ | $5$ | $-4$ | $-13$ |

Ở bảng 0, $s_1$ vào và chỉ $s_3$ giảm, với tỉ số $2/\tfrac12=4$; $s_3$ ra, tới $(4,3)$ với $z=13$. Ở bảng 1, $s_2$ vào với $\bar c_{s_2}=5$, và cột của $s_2$ có ba phần tử $-1$, $-2$, $-3$ không dương. Theo Mệnh đề 07.30(a), bài toán không bị chặn: dọc tia $(x_1,x_2)=(4+2\theta,3+\theta)$, $\theta\ge0$, mục tiêu là $z=13+5\theta$.

Ba câu cho ba kết cục của Định lý 07.23: tối ưu duy nhất, không khả thi, không bị chặn.

**Kiểm tra lại.** (a) Tại $(2,1)$: $-3\le-3$, $-1\le-1$, $2+2=4\le4$; với $s_1=x_1+x_2-3$, $s_3=4-x_1-2x_2$, $5-s_1-2s_3=x_1+3x_2$. (b) Vì $x_2\ge0$, $x_1+x_2\le x_1+2x_2\le2<3$, trái ràng buộc đầu. (c) Trên tia: $-(7+3\theta)\le-3$, $-(1+\theta)\le-1$, $-(4+2\theta)+2(3+\theta)=2\le2$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 5; so sánh số bước xoay của hai quy tắc chọn biến vào.

::: exercise Bài tập 07.29 (Quy tắc Dantzig và quy tắc Bland trên hai bài toán; Vanderbei, Bài 4.1 và 4.3, tr. 50–51)
So sánh số bước xoay của quy tắc Dantzig và quy tắc Bland khi giải hai bài toán sau bằng phương pháp đơn hình từ $x=0$.

- **(a)** Cực đại $4x_1+5x_2$ dưới $2x_1+2x_2\le9$, $x_1\le4$, $x_2\le3$, $x_1,x_2\ge0$.
- **(b)** Cực đại $3x_1+5x_2$ dưới $x_1+2x_2\le5$, $x_1\le3$, $x_2\le2$, $x_1,x_2\ge0$.
:::

::: hint Gợi ý 1
Với biến bù $s_1,s_2,s_3$, cơ sở $\{s_1,s_2,s_3\}$ khả thi; ở cả hai bài, quy tắc Dantzig chọn $x_2$ còn quy tắc Bland chọn $x_1$ ở bước đầu.
:::

::: hint Gợi ý 2
Ghi mỗi bước thành một dòng gồm cơ sở, đỉnh, $z$, các chi phí rút gọn, biến vào, các tỉ số và biến ra, như Ví dụ 07.21.
:::

::: solution Lời giải Bài tập 07.29
**Câu (a).** Quy tắc Dantzig:

| Bước | Cơ sở | Đỉnh | $z$ | $\bar c$ ngoài cơ sở | Vào | Tỉ số | Ra |
|---|---|---|---:|---|---|---|---|
| $0$ | $\{s_1,s_2,s_3\}$ | $(0,0)$ | $0$ | $x_1$: $4$; $x_2$: $5$ | $x_2$ | $s_1$: $\tfrac92$; $s_3$: $3$ | $s_3$ |
| $1$ | $\{s_1,s_2,x_2\}$ | $(0,3)$ | $15$ | $x_1$: $4$; $s_3$: $-5$ | $x_1$ | $s_1$: $\tfrac32$; $s_2$: $4$ | $s_1$ |
| $2$ | $\{x_1,s_2,x_2\}$ | $(\tfrac32,3)$ | $21$ | $s_1$: $-2$; $s_3$: $-1$ | dừng | | |

Quy tắc Bland:

| Bước | Cơ sở | Đỉnh | $z$ | $\bar c$ ngoài cơ sở | Vào | Tỉ số | Ra |
|---|---|---|---:|---|---|---|---|
| $0$ | $\{s_1,s_2,s_3\}$ | $(0,0)$ | $0$ | $x_1$: $4$; $x_2$: $5$ | $x_1$ | $s_1$: $\tfrac92$; $s_2$: $4$ | $s_2$ |
| $1$ | $\{s_1,x_1,s_3\}$ | $(4,0)$ | $16$ | $x_2$: $5$; $s_2$: $-4$ | $x_2$ | $s_1$: $\tfrac12$; $s_3$: $3$ | $s_1$ |
| $2$ | $\{x_2,x_1,s_3\}$ | $(4,\tfrac12)$ | $\tfrac{37}2$ | $s_1$: $-\tfrac52$; $s_2$: $1$ | $s_2$ | $x_1$: $4$; $s_3$: $\tfrac52$ | $s_3$ |
| $3$ | $\{x_2,x_1,s_2\}$ | $(\tfrac32,3)$ | $21$ | $s_1$: $-2$; $s_3$: $-1$ | dừng | | |

Quy tắc Dantzig cần $2$ bước xoay, quy tắc Bland cần $3$; cả hai dừng ở $x^*=(\tfrac32,3)$, $z^*=21$.

**Câu (b).** Quy tắc Dantzig:

| Bước | Cơ sở | Đỉnh | $z$ | $\bar c$ ngoài cơ sở | Vào | Tỉ số | Ra |
|---|---|---|---:|---|---|---|---|
| $0$ | $\{s_1,s_2,s_3\}$ | $(0,0)$ | $0$ | $x_1$: $3$; $x_2$: $5$ | $x_2$ | $s_1$: $\tfrac52$; $s_3$: $2$ | $s_3$ |
| $1$ | $\{s_1,s_2,x_2\}$ | $(0,2)$ | $10$ | $x_1$: $3$; $s_3$: $-5$ | $x_1$ | $s_1$: $1$; $s_2$: $3$ | $s_1$ |
| $2$ | $\{x_1,s_2,x_2\}$ | $(1,2)$ | $13$ | $s_1$: $-3$; $s_3$: $1$ | $s_3$ | $s_2$: $1$; $x_2$: $2$ | $s_2$ |
| $3$ | $\{x_1,s_3,x_2\}$ | $(3,1)$ | $14$ | $s_1$: $-\tfrac52$; $s_2$: $-\tfrac12$ | dừng | | |

Quy tắc Bland:

| Bước | Cơ sở | Đỉnh | $z$ | $\bar c$ ngoài cơ sở | Vào | Tỉ số | Ra |
|---|---|---|---:|---|---|---|---|
| $0$ | $\{s_1,s_2,s_3\}$ | $(0,0)$ | $0$ | $x_1$: $3$; $x_2$: $5$ | $x_1$ | $s_1$: $5$; $s_2$: $3$ | $s_2$ |
| $1$ | $\{s_1,x_1,s_3\}$ | $(3,0)$ | $9$ | $x_2$: $5$; $s_2$: $-3$ | $x_2$ | $s_1$: $1$; $s_3$: $2$ | $s_1$ |
| $2$ | $\{x_2,x_1,s_3\}$ | $(3,1)$ | $14$ | $s_1$: $-\tfrac52$; $s_2$: $-\tfrac12$ | dừng | | |

Quy tắc Dantzig cần $3$ bước xoay, quy tắc Bland cần $2$; cả hai dừng ở $x^*=(3,1)$, $z^*=14$.

**So sánh.** Ở (a) quy tắc Dantzig cần ít bước hơn, ở (b) quy tắc Bland cần ít bước hơn. Quy tắc Dantzig chọn $x_2$ vì $\bar c_{x_2}=5$ là tốc độ tăng lớn nhất của $z$ (Nhận xét 07.33). Số bước phụ thuộc vị trí của đỉnh tối ưu: ở (b), bước đầu theo $x_2$ cho $z=10>9$, nhưng từ $(0,2)$ còn hai cạnh tới $(3,1)$, còn từ $(3,0)$ chỉ một cạnh.

**Kiểm tra lại.** (a) Tại $(\tfrac32,3)$: $3+6=9$, và $4x_1+5x_2=2(2x_1+2x_2)+x_2\le18+3=21$, với hai hệ số $2$, $1$ là $-\bar c_{s_1}$, $-\bar c_{s_3}$. (b) Tại $(3,1)$: $3+2=5$, và $3x_1+5x_2=\tfrac52(x_1+2x_2)+\tfrac12x_1\le\tfrac{25}2+\tfrac32=14$.
:::

**Mức độ:** chứng minh. **Mục tiêu:** mục tiêu học tập 5; dùng phép biến đổi hàng của bước xoay để xác định dấu của chi phí rút gọn sau bước xoay.

::: exercise Bài tập 07.30 (Chi phí rút gọn của biến vừa rời cơ sở; Vanderbei, Bài 2.18, tr. 22)
Chứng minh rằng biến vừa rời cơ sở ở một bước xoay của phương pháp đơn hình (Thuật toán 07.31, bài toán cực đại) không thể vào cơ sở ở bước xoay ngay sau đó.
:::

::: hint Gợi ý 1
Trước bước xoay, cột của biến ra $x_l$ trong bảng là cột của ma trận đơn vị ứng với hàng xoay, và chi phí rút gọn của nó bằng $0$.
:::

::: hint Gợi ý 2
Theo dõi cột của $x_l$ qua ba phép biến đổi hàng của bước xoay, đặc biệt phép trừ ở hàng cuối.
:::

::: solution Lời giải Bài tập 07.30
Xét một bước xoay của Thuật toán 07.31 trên bảng (8.4) của bài toán cực đại: biến vào $x_j$ có $\bar c_j>0$, hàng xoay $p$ có phần tử xoay $\alpha_p>0$, và biến ra là $x_l$ với $l=B(p)$.

**Bước 1 (cột của $x_l$ trước bước xoay).** $x_l$ là biến cơ sở ở hàng $p$, nên ở phần trên cột của nó là cột thứ $p$ của $I$, và ở hàng cuối nó có chi phí rút gọn $0$.

**Bước 2 (sau bước xoay).** Theo Mệnh đề 07.40, phép 1 chia hàng $p$ cho $\alpha_p$, nên phần tử của hàng $p$ mới ở cột $l$ là $\tfrac1{\alpha_p}$. Phép 3 trừ khỏi hàng cuối $\bar c_j$ lần hàng $p$ mới, nên chi phí rút gọn mới của $x_l$ là

$$
\bar c_l'=0-\bar c_j\cdot\tfrac1{\alpha_p}=-\tfrac{\bar c_j}{\alpha_p}<0 .
$$

**Bước 3 (kết luận).** Ở bước xoay kế tiếp, bước 3 của Thuật toán 07.31 chỉ chọn biến vào có chi phí rút gọn dương, nên $x_l$ không được chọn, với mọi quy tắc chọn biến vào. Lập luận không dùng $\theta^*>0$, nên đúng cả với bước xoay suy biến. $\square$

**Kiểm tra lại.** Ở bước đầu của Bài tập 07.27, $x_1$ vào với $\bar c_{x_1}=6$ và phần tử xoay $2$ ở hàng $s_1$; bảng 1 có $\bar c_{s_1}=-3=-\tfrac62$.
:::

**Mức độ:** tính toán. **Mục tiêu:** mục tiêu học tập 6; giải một quy hoạch nguyên phi tuyến bằng đồ thị và bằng phương trình Bellman.

::: exercise Bài tập 07.31 (Quy hoạch động cho một quy hoạch nguyên phi tuyến; Kupferschmid, Bài 7.10.56, tr. 289)
Xét bài toán cực đại $z(x)=x_1x_2+x_2+2x_1$ theo $x\in\mathbb Z^2$ dưới $x_1+2x_2\le25$, $x_1\ge0$, $x_2\ge0$.

- **(a)** Giải bài toán bằng đồ thị.
- **(b)** Giải bài toán bằng quy hoạch động, và nêu các phương trình Bellman (phương trình truy hồi ngược) đã dùng.
:::

::: hint Gợi ý 1
Viết lại mục tiêu để nó tách được theo giai đoạn: chọn $x_2$ ở giai đoạn đầu, chọn $x_1$ ở giai đoạn sau, và nhóm $x_1x_2+2x_1=x_1(x_2+2)$.
:::

::: hint Gợi ý 2
Ở (a), $z=(x_1+1)(x_2+2)-2$, nên mỗi đường mức là một nhánh hyperbol. Ở (b), đóng góp của giai đoạn sau phụ thuộc $x_2$, nên trạng thái sau giai đoạn đầu cần chứa $x_2$ (Nhận xét 07.47).
:::

::: solution Lời giải Bài tập 07.31
**Câu (a).** Ta có $z+2=(x_1+1)(x_2+2)$. Trên miền khả thi cả hai thừa số dương, nên $z$ tăng theo từng biến, và với mỗi $x_2$, giá trị lớn nhất đạt khi $x_1$ lớn nhất, tức $x_1=25-2x_2$, trên cạnh $x_1+2x_2=25$. Trên cạnh đó, $z=(26-2x_2)(x_2+2)-2$ là hàm bậc hai lõm của $x_2$, đạt cực đại tại $x_2=\tfrac{11}2$, $x_1=14$, với $z=15\cdot\tfrac{15}2-2=110{,}5$; đường mức $z=110{,}5$ tiếp xúc cạnh tại $(14;\,5{,}5)$, không phải điểm nguyên.

![Phần miền khả thi quanh cạnh x1 + 2x2 = 25 với các điểm nguyên khả thi vẽ bằng chấm xám; đường mức z = 110 đi qua hai điểm nguyên (13,6) và (15,5), đánh dấu bằng chấm xanh lá lớn; vòng tròn rỗng tại (14; 5,5) là điểm nới lỏng liên tục đạt 110,5; không điểm nguyên khả thi nào khác nằm trên hoặc phía trên đường mức](img/lec-07/ex-integer-dp-level-curves.svg)

Đường mức $z=110$, tức $(x_1+1)(x_2+2)=112$, đi qua hai điểm nguyên khả thi $(13,6)$ và $(15,5)$ trên cạnh. Không điểm nguyên khả thi nào khác có $z\ge110$. Điểm như vậy cần $(x_1+1)(x_2+2)\ge112$ và $x_1\le25-2x_2$; theo từng hàng:

- $x_2=4$: $x_1\ge\tfrac{112}6-1=\tfrac{53}3$, trái $x_1\le17$;
- $x_2=5$: $x_1\ge15$ và $x_1\le15$, cho $(15,5)$;
- $x_2=6$: $x_1\ge13$ và $x_1\le13$, cho $(13,6)$;
- $x_2=7$: $x_1\ge\tfrac{112}9-1=\tfrac{103}9$, trái $x_1\le11$;
- $x_2\le3$ hoặc $x_2\ge8$: trên cạnh, $(26-2x_2)(x_2+2)-2\le98$ vì hàm bậc hai lõm này nhận giá trị $98$ tại $x_2=3$ và $x_2=8$.

Vậy $z^*=110$, đạt tại $(13,6)$ và $(15,5)$.

**Câu (b).** Viết $z=x_2+x_1(x_2+2)$: giai đoạn $0$ chọn $x_2$ với đóng góp $x_2$, giai đoạn $1$ chọn $x_1$ với đóng góp $x_1(x_2+2)$. Đóng góp thứ hai phụ thuộc $x_2$, nên trạng thái ở giai đoạn $1$ là cặp $\xi_1=(r,x_2)$ với $r=25-2x_2$ là ngân sách còn lại; trạng thái đầu là $\xi_0=25$. Với $\Lambda_k=-J_k$ là lợi ích tối ưu còn lại, như ở Bài tập 07.18, phương trình (9.3) cho

$$
\begin{aligned}
&\Lambda_2=0,\\
&\Lambda_1(r,x_2)\\
&\quad=\max_{x_1=0,\ldots,r}x_1(x_2+2)\\
&\quad=r(x_2+2),\\
&\Lambda_0(25)\\
&\quad=\max_{x_2=0,\ldots,12}\bigl\{x_2\\
&\qquad+\Lambda_1(25-2x_2,x_2)\bigr\}.
\end{aligned}
$$

Giá trị $x_2+(25-2x_2)(x_2+2)$ theo $x_2$:

| $x_2$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ | $11$ | $12$ |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| $r$ | $25$ | $23$ | $21$ | $19$ | $17$ | $15$ | $13$ | $11$ | $9$ | $7$ | $5$ | $3$ | $1$ |
| giá trị | $50$ | $70$ | $86$ | $98$ | $106$ | $110$ | $110$ | $106$ | $98$ | $86$ | $70$ | $50$ | $26$ |

$\Lambda_0(25)=110$, đạt tại $x_2=5$ và $x_2=6$. Lượt xuôi chọn $x_1=r$, cho hai nghiệm tối ưu $(15,5)$ và $(13,6)$. Phương trình Bellman ở giai đoạn $0$ tính $13$ giá trị, so với $182$ điểm nguyên khả thi khi liệt kê.

**Kiểm tra lại.** $z(15,5)=75+5+30=110$ và $z(13,6)=78+6+26=110$; hai điểm thỏa $15+10=25$ và $13+12=25$.
:::

## Mức vận dụng

**Mức độ:** vận dụng. **Mục tiêu:** mục tiêu học tập 1, 4; lập và giải một quy hoạch tuyến tính chọn quy tắc quyết định giữa hai phân phối.

::: exercise Bài tập 07.32 (Kiểm định giữa hai phân phối; Vanderbei, Bài 1.3, tr. 8–9, và Bài 2.19, tr. 22)
Biến ngẫu nhiên $Y$ nhận một trong $n$ giá trị đã biết $\alpha_1,\ldots,\alpha_n$, và $Y$ có một trong hai phân phối: phân phối $p$ với $\Pr(Y=\alpha_j)=p_j$, hoặc phân phối $q$ với $\Pr(Y=\alpha_j)=q_j$. Các số $p_j$ không âm và có tổng bằng $1$; các số $q_j$ cũng vậy. Từ một lần quan sát $Y$, cần đoán $Y$ có phân phối $p$ hay $q$: với mỗi kết quả $\alpha_j$, ta khẳng định phân phối là $p$ với xác suất $x_j$ và là $q$ với xác suất $1-x_j$. Các xác suất $x_1,\ldots,x_n$ được chọn sao cho xác suất khẳng định $p$ khi phân phối thực là $q$ không vượt $\beta$, với $\beta$ là một số dương nhỏ (chẳng hạn $0{,}05$), và với ràng buộc đó, xác suất khẳng định $p$ khi phân phối thực là $p$ lớn nhất.

- **(a)** Lập bài toán cực đại này thành một quy hoạch tuyến tính.
- **(b)** Giả sử mọi $p_j>0$, mọi $q_j>0$, và $\frac{p_1}{q_1}<\frac{p_2}{q_2}<\cdots<\frac{p_n}{q_n}$. Giải quy hoạch tuyến tính ở (a).
:::

::: hint Gợi ý 1
Xác suất khẳng định $p$ khi phân phối thực là $q$ bằng $\sum_jq_jx_j$.
:::

::: hint Gợi ý 2
Ở (b), so sánh với Bài tập 07.18(c): mỗi kết quả $\alpha_j$ tiêu tốn $q_j$ ngân sách và mang lại $p_j$; chứng minh tối ưu bằng các nhân tử không âm.
:::

::: solution Lời giải Bài tập 07.32
**Câu (a).** Khi phân phối thực là $p$, xác suất khẳng định $p$ là $\sum_jp_jx_j$; khi phân phối thực là $q$, xác suất đó là $\sum_jq_jx_j$. Bài toán là

$$
\begin{aligned}
\max_{x\in\mathbb R^n}\quad&\sum_{j=1}^np_jx_j\\
&\sum_{j=1}^nq_jx_j\le\beta,\\
&0\le x_j\le1,\\
&j=1,\ldots,n .
\end{aligned}
$$

**Câu (b).** Nếu $\beta\ge1$, điểm $x=\mathbf 1$ khả thi vì $\sum_jq_j=1$, và cho giá trị $\sum_jp_j=1$, giá trị lớn nhất của một xác suất. Xét $0<\beta<1$. Đặt $Q_k=\sum_{j\ge k}q_j$, với $Q_{n+1}=0$. Dãy $Q_k$ giảm chặt từ $Q_1=1>\beta$ tới $Q_{n+1}=0\le\beta$, nên có đúng một $k$ với $Q_{k+1}\le\beta<Q_k$. Nghiệm là

$$
\begin{aligned}
&x_j^*=1\ \ (j>k),\\
&x_j^*=0\ \ (j<k),\\
&x_k^*=\frac{\beta-Q_{k+1}}{q_k}\in[0,1),
\end{aligned}
$$

với giá trị $V=\sum_{j>k}p_j+p_k\frac{\beta-Q_{k+1}}{q_k}$. Điểm $x^*$ khả thi và dùng hết ngân sách: $\sum_jq_jx_j^*=Q_{k+1}+(\beta-Q_{k+1})=\beta$.

**Chứng nhận tối ưu.** Đặt $\pi_0=\frac{p_k}{q_k}>0$ và $\pi_j=\max(p_j-\pi_0q_j,0)$. Theo thứ tự các tỉ số, $\pi_j=p_j-\pi_0q_j>0$ khi $j>k$ và $\pi_j=0$ khi $j\le k$. Vì $p_j\le\pi_0q_j+\pi_j$ và $x_j\ge0$, mọi $x$ khả thi thỏa

$$
\begin{aligned}
&\sum_jp_jx_j\\
&\quad\le\pi_0\sum_jq_jx_j+\sum_j\pi_jx_j\\
&\quad\le\pi_0\beta+\sum_{j>k}(p_j-\pi_0q_j)\\
&\quad=\sum_{j>k}p_j+\pi_0(\beta-Q_{k+1})\\
&\quad=V,
\end{aligned}
$$

trong đó bất đẳng thức thứ hai dùng $\sum_jq_jx_j\le\beta$ và $x_j\le1$. Đây là chứng nhận bằng tổ hợp không âm của Mệnh đề 02.11, viết cho chiều cực đại; $x^*$ đạt cận nên tối ưu.

**Diễn giải.** Quy tắc tối ưu khẳng định $p$ khi tỉ số $\frac{p_j}{q_j}$ của kết quả quan sát được vượt một ngưỡng, và chỉ ngẫu nhiên hóa ở một kết quả $\alpha_k$. Có nhiều nhất một thành phần phân số vì ở dạng chuẩn, với một biến bù cho ngân sách và một biến bù $t_j=1-x_j$ cho mỗi cận trên, có $m=n+1$ phương trình; theo Hệ quả 07.13, một điểm cực biên có nhiều nhất $n+1$ thành phần dương, trong khi mỗi cặp $(x_j,t_j)$ có ít nhất một thành phần dương. Hai thành phần phân số $x_j$, $x_{j'}$ cho bốn số dương $x_j,t_j,x_{j'},t_{j'}$, cùng với ít nhất một số dương ở mỗi cặp trong $n-2$ cặp còn lại, nên một điểm cực biên như vậy có ít nhất $n+2$ thành phần dương, mâu thuẫn.

**Kiểm tra lại.** Với $n=3$, $p=(0{,}2;\,0{,}3;\,0{,}5)$, $q=(0{,}5;\,0{,}3;\,0{,}2)$, $\beta=0{,}3$: các tỉ số $0{,}4<1<2{,}5$; $Q_3=0{,}2\le0{,}3<Q_2=0{,}5$, nên $k=2$, $x^*=(0,\tfrac13,1)$ và $V=0{,}5+0{,}1=0{,}6$. Chứng nhận: $\pi_0=1$, $\pi=(0,0,0{,}3)$, cận $1\cdot0{,}3+0{,}3=0{,}6$.
:::

## Tài liệu tham khảo

- Vanderbei, Robert J. (2014), *Linear Programming: Foundations and Extensions*, ấn bản 4, Springer:
  - Định lý 3.4 (tr. 33);
  - mục Exercises của Chương 1: Bài 1.1 (tr. 7–8), 1.3 (tr. 8–9);
  - mục Exercises của Chương 2: Bài 2.1, 2.5 (tr. 20), 2.6, 2.7 (tr. 21), 2.18, 2.19 (tr. 22);
  - mục Exercises của Chương 3: Bài 3.4 (tr. 36–37), 3.5, 3.7 (tr. 37);
  - mục Exercises của Chương 4: Bài 4.1 (tr. 50), 4.3 (tr. 51).
- Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press:
  - mục Exercises của Chương 2: Bài 2.8 (tr. 60);
  - mục Exercises của Chương 4: Bài 4.9 (tr. 193).
- Kupferschmid, Michael (2023), *Introduction to Mathematical Programming*, first edition, giấy phép CC BY 4.0:
  - §7.8.2 (tr. 279): mục tiêu tách được và quy hoạch động;
  - mục Exercises 3.7: Bài 3.7.31 (tr. 129);
  - mục Exercises 7.10: Bài 7.10.48 (tr. 288), 7.10.56 (tr. 289).
