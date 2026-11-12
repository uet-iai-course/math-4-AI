# Bài 07 — Quy hoạch tuyến tính và quy hoạch động

Bài 02 xếp bài toán có mục tiêu và ràng buộc tuyến tính vào lớp quy hoạch tuyến tính (Định nghĩa 02.9, Mệnh đề 02.10), và Bài 03 chứng nhận một ứng viên là tối ưu bằng các nhân tử không âm (Mệnh đề 03.11). Các phương pháp của Bài 04–06c tìm ứng viên bằng bước cục bộ theo gradient, nên cần mục tiêu khả vi và không có ràng buộc bất đẳng thức (Định nghĩa 06c.2, Mệnh đề 06c.3). Câu hỏi trung tâm của Bài 07 là: **khi tập phương án quá lớn để duyệt hết, cấu trúc nào của bài toán cho phép chỉ xét một tập ứng viên nhỏ và tìm ứng viên tốt nhất bằng hữu hạn phép tính.** Bài trả lời câu hỏi đó cho hai lớp bài toán, bao gồm:

- quy hoạch tuyến tính, với tập ứng viên là các đỉnh của đa diện khả thi và phương pháp đơn hình đi từ đỉnh này sang đỉnh kề;
- quy hoạch động (dynamic programming), với chuỗi quyết định theo giai đoạn và phương trình Bellman tính chi phí nhỏ nhất từ mỗi trạng thái một lần.

## Câu hỏi mở đầu

Một xưởng đóng hai loại hộp hạt. Mỗi nghìn hộp loại 1 mang lại $2$ đơn vị lợi ích và cần $1$ giờ máy; mỗi nghìn hộp loại 2 mang lại $3$ đơn vị lợi ích và cần $2$ giờ máy. Hai loại dùng chung $54$ giờ máy, và sản lượng tối đa của loại 1 và loại 2 là $30$ và $20$ nghìn hộp.

**Câu hỏi.** Sản xuất bao nhiêu nghìn hộp mỗi loại thì tổng lợi ích lớn nhất?

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Lập quy hoạch tuyến tính từ dữ kiện cho bằng bảng hoặc bằng lời, và đưa hồi quy sai số tuyệt đối về quy hoạch tuyến tính.
2. Viết miền khả thi thành đa diện, đưa bài toán về dạng chuẩn, tính các nghiệm cơ sở và xác định nghiệm khả thi, nghiệm suy biến.
3. Nhận biết điểm cực biên bằng định nghĩa, bằng hạng các ràng buộc hoạt động và bằng nghiệm cơ sở khả thi, và chứng minh điều kiện để một đa diện có điểm cực biên.
4. Xác định kết cục của một quy hoạch tuyến tính, áp dụng định lý điểm cực biên tối ưu sau khi kiểm tra giả thiết, và chạy thuật toán duyệt đỉnh kề.
5. Giải quy hoạch tuyến tính bằng phương pháp đơn hình dạng bảng, phát hiện bài toán không bị chặn, xử lý đỉnh suy biến bằng quy tắc Bland, và tìm cơ sở xuất phát bằng pha I.
6. Mô hình hóa bài toán quyết định theo giai đoạn bằng trạng thái và chi phí cộng, kiểm tra trạng thái đủ, giải phương trình Bellman ngược, dựng chính sách và đếm số phép tính.

## Kiến thức tiên quyết

Bài 07 dùng các kết quả sau của Bài 00–03 và Bài 06c.

- **Đại số tuyến tính** (Định nghĩa 00.7; Mệnh đề 00.8; Định lý 00.9, 00.12). Với $A\in\mathbb R^{m\times n}$, hạng hàng bằng hạng cột và $\dim\operatorname{Ker}(A)=n-\operatorname{rank}(A)$, nên các vector $a_i\in\mathbb R^n$, $i\in S$, có hạng nhỏ hơn $n$ thì có $d\ne0$ với $a_i^Td=0$ cho mọi $i\in S$. Hệ có nghiệm thì nghiệm duy nhất khi và chỉ khi $\operatorname{rank}(A)=n$. Ma trận vuông khả nghịch khi và chỉ khi định thức khác $0$.
- **Tập lồi** (Định nghĩa 01.17, Mệnh đề 01.18(c), 01.19(a)). Nửa không gian là tập lồi, và giao của các tập lồi là tập lồi.
- **Bài toán tối ưu và hàm lồi** (Định nghĩa 01.11, 01.12, Định lý 01.30, Hệ quả 01.33, Định lý 01.34). Tổng các hàm lồi và cực đại các hàm affine là hàm lồi; tập nghiệm của bài toán lồi là tập lồi, và hàm lồi chặt có nhiều nhất một điểm cực tiểu.
- **Quy hoạch tuyến tính và dạng chuẩn** (Định nghĩa 02.9, Mệnh đề 02.6, 02.10, Nhận xét 02.8, 02.12). Dạng chuẩn là bài toán cực tiểu $c^Tx$ dưới $Ax=b$, $x\ge0$; Mệnh đề 02.10(b) đưa mọi quy hoạch tuyến tính về dạng chuẩn bằng biến bù và phép tách $x=x^+-x^-$, với hai ánh xạ $\varphi$, $\psi$ chuyển nghiệm qua lại (Mệnh đề 02.6). Nhận xét 02.8 liệt kê bốn trạng thái của một bài toán lồi, kể cả "bị chặn nhưng không đạt"; Nhận xét 02.12 phát biểu, không kèm chứng minh, rằng trên một đa diện có đỉnh, giá trị tối ưu vô hạn hoặc đạt tại một đỉnh.
- **Chứng nhận bằng tổ hợp không âm** (Mệnh đề 02.11, 03.11, Hệ quả 03.24). Với bài toán $\min c^Tx$ dưới $a_i^Tx\ge\beta_i$, nếu $\mu\ge0$ và $c=\sum_i\mu_ia_i$ thì $c^Tx\ge\sum_i\mu_i\beta_i$ tại mọi điểm khả thi; $\mu$ là điểm khả thi của bài toán đối ngẫu, và khi giá trị tối ưu khả vi theo vế phải, nhân tử là giá bóng.
- **Biến phụ cho cực đại affine** (Bổ đề 02.14, Định lý 02.15). Với các hàm affine $s_{ik}$ và $\gamma_i\ge0$, bài toán $\min_{x\in C}f_0(x)+\sum_i\gamma_i\max_ks_{ik}(x)$ và bài toán $\min_{(x,t)}f_0(x)+\sum_i\gamma_it_i$ dưới $x\in C$, $s_{ik}(x)\le t_i$ có cùng giá trị tối ưu và nghiệm tương ứng (kết luận (a)); khi $\gamma_i>0$, mọi nghiệm của bài toán thứ hai có $t_i^*=\max_ks_{ik}(x^*)$ (kết luận (b)).
- **Bước cập nhật cục bộ** (Định nghĩa 06c.2, Mệnh đề 06c.3). Các bộ tối ưu của Bài 04–06c sinh bước giảm từ gradient, nên cần mục tiêu khả vi và không có ràng buộc bất đẳng thức.

**Câu hỏi ôn nhanh.**

1. Cho $\bar A=\begin{bmatrix}1&0&1&0&0\\0&1&0&1&0\\1&2&0&0&1\end{bmatrix}$. Tính $\operatorname{rank}(\bar A)$ và $\dim\operatorname{Ker}(\bar A)$ theo Mệnh đề 00.8.
2. Theo Mệnh đề 02.11, chứng minh mọi điểm khả thi của bài toán cực tiểu $2x_1+3x_2$ dưới $x_1+x_2\ge4$, $x_1+2x_2\ge6$, $x\ge0$ có giá trị ít nhất $10$, và tìm một điểm khả thi đạt $10$.
3. Theo Định lý 02.15, viết bài toán cực tiểu $|x-2|+|2x-1|$ theo $x\in\mathbb R$ thành quy hoạch tuyến tính; nêu số biến và số ràng buộc.

::: hint Lời giải câu hỏi ôn nhanh
1. Ba cột cuối là ba cột đơn vị của $\mathbb R^3$, nên $\operatorname{rank}(\bar A)=3$ và $\dim\operatorname{Ker}(\bar A)=5-3=2$.
2. Với $\mu=(1,1)$: $2x_1+3x_2=(x_1+x_2)+(x_1+2x_2)\ge4+6=10$. Điểm $(2,2)$ khả thi vì $2+2=4$ và $2+4=6$, và có giá trị $4+6=10$.
3. Cực tiểu $t_1+t_2$ dưới $-t_1\le x-2\le t_1$, $-t_2\le2x-1\le t_2$: ba biến $(x,t_1,t_2)$ và bốn ràng buộc. Độ dốc đổi từ $-3$ sang $1$ tại $x=\tfrac12$, nên nghiệm là $x=\tfrac12$ với giá trị $\tfrac32$.
:::

## 1. Thiết lập bài toán

Bài toán thứ nhất của bài là chọn một vector quyết định $x\in\mathbb R^n$ một lần. Với dữ kiện $c\in\mathbb R^n$, $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$, quy hoạch tuyến tính (linear programming) được viết ở dạng

$$
\begin{aligned}
\max_{x\in\mathbb R^n}\quad&c^Tx\\
&Ax\le b,\quad x\ge0,
\end{aligned}
\tag{1.1}
$$

Bài toán có ba thành phần, bao gồm:

- dữ kiện: $c$, $A$, $b$ và chiều tối ưu, cố định trước khi giải;
- quyết định: biến $x$, gọi là *biến quyết định* (decision variable);
- lời giải: giá trị tối ưu cùng một nghiệm tối ưu, hoặc kết luận rằng bài toán không có nghiệm tối ưu.

Mỗi $x\in\mathbb R^n$ là một *phương án*; phương án thỏa mọi ràng buộc là *phương án khả thi* (feasible solution); tập $P$ các phương án khả thi là *miền khả thi* (feasible region). *Giá trị tối ưu* (optimal value) là $z^*=\sup_{x\in P}c^Tx$, với quy ước $z^*=-\infty$ khi $P=\varnothing$, và một *nghiệm tối ưu* (optimal solution) là $x^*\in P$ với $c^Tx^*=z^*$.

Dạng (1.1) không làm mất tính tổng quát, vì:

- bất phương trình $\ge$ nhân với $-1$ thành $\le$;
- phương trình thành hai bất phương trình ngược chiều;
- biến tự do (free variable) thành hiệu của hai biến không âm;
- $\min c^Tx=-\max(-c^Tx)$.

Định nghĩa 02.9 viết ở chiều cực tiểu; bài này viết ở chiều cực đại vì ví dụ chính là bài toán lợi ích.

Bài toán thứ hai là chọn một chuỗi quyết định qua $N$ giai đoạn, mỗi giai đoạn một trong $q$ lựa chọn, với chi phí của chuỗi là tổng chi phí các giai đoạn. Số chuỗi là $q^N$, với $N=20$ và $q=2$ đã là $2^{20}=1\,048\,576$; còn miền khả thi của (1.1) có vô số điểm.

![Ô "Một vector quyết định": miền khả thi của một quy hoạch tuyến tính hai biến được tô kín, ghi "vô số điểm khả thi", có năm đỉnh được đánh dấu, ghi "5 đỉnh".](img/lec-07/central-problem-lp.svg)

![Ô "Một chuỗi quyết định": đồ thị bốn tầng đi từ nút s qua A, B rồi C, D tới nút t, ghi "4 đường đi s → t".](img/lec-07/central-problem-dp.svg)

Miền ở hình thứ nhất có vô số điểm nhưng chỉ năm đỉnh; ở hình thứ hai, hai đường đi qua cùng một nút có chung phần còn lại tới đích.

## 2. Ký hiệu và giả thiết

Vô hướng và vector viết chữ thường, ma trận chữ hoa, không in đậm; bất đẳng thức giữa hai vector hiểu theo từng thành phần. Ba chữ $n$, $m$, $A$ chỉ số biến, số hàng và ma trận ràng buộc của bài toán đang xét: trong dạng (1.1), $A$ không gồm các hàng $-x_j\le0$; trong dạng chuẩn, $n$ đếm cả biến bù. Tên nút của đồ thị viết chữ đứng. Ký hiệu chỉ dùng trong một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $n$, $m$ | số biến; số hàng của ma trận ràng buộc | số nguyên dương |
| $x$, $c$, $b$ | biến quyết định; vector hệ số mục tiêu; vector vế phải | $\mathbb R^n$; $\mathbb R^n$; $\mathbb R^m$ |
| $A$, $a_i^T$, $A_j$ | ma trận ràng buộc; hàng thứ $i$; cột thứ $j$ | $\mathbb R^{m\times n}$; $\mathbb R^{1\times n}$; $\mathbb R^m$ |
| $P$, $P^*$ | miền khả thi (một đa diện); tập nghiệm tối ưu | tập con của $\mathbb R^n$ |
| $z$, $z^*$, $x^*$ | giá trị mục tiêu $c^Tx$; giá trị tối ưu $\sup_{x\in P}c^Tx$, với $z^*=-\infty$ khi $P=\varnothing$; một nghiệm tối ưu | $\mathbb R$; $\mathbb R\cup\{\pm\infty\}$; $P$ |
| $s$, $s_i$; $e_i$ | vector biến bù; biến bù của ràng buộc thứ $i$; biến dư của ràng buộc thứ $i$ | $s\ge0$; $e_i\ge0$ |
| $B$, $B^{\mathrm c}$, $B'$ | tập chỉ số cơ sở; phần bù của nó; cơ sở sau một bước xoay | $\lvert B\rvert=\lvert B'\rvert=m$ |
| $A_B$, $x_B$, $c_B$ | ma trận các cột $A_j$, $j\in B$; biến cơ sở; hệ số mục tiêu của biến cơ sở | $\mathbb R^{m\times m}$; $\mathbb R^m$; $\mathbb R^m$ |
| $\mathcal I(x)$, $\operatorname{supp}(x)$ | chỉ số các ràng buộc hoạt động tại $x$; chỉ số $j$ với $x_j>0$ | tập chỉ số |
| $v$, $w$; $x'$, $x''$, $\lambda$ | điểm cực biên; hai điểm và hệ số của một tổ hợp lồi | $P$; $[0,1]$ |
| $d$, $\theta$, $\theta^*$ | hướng di chuyển; tham số dọc $x+\theta d$; độ dài bước của phép thử tỉ số | $\mathbb R^n$; $\mathbb R$; $\theta^*\ge0$ |
| $d^j$, $\bar c_j$, $l$ | hướng cơ sở của biến ngoài cơ sở $j$; chi phí rút gọn $c^Td^j$; chỉ số ra | $\mathbb R^n$; $\mathbb R$; $l\in B$ |
| $M$, $r_i$ | số mẫu hồi quy; phần dư của mẫu $i$ | $M\ge1$; $\mathbb R$ |
| $N$, $k$, $q$ | số giai đoạn; chỉ số giai đoạn; số lựa chọn mỗi giai đoạn trong các phép đếm | số nguyên |
| $\xi_k$, $X_k$ | trạng thái ở giai đoạn $k$; tập trạng thái | tập hữu hạn |
| $u$, $U_k(\xi)$ | điều khiển; tập điều khiển cho phép tại $\xi$ | tập hữu hạn |
| $f_k$, $g_k$, $g_N$ | hàm chuyển trạng thái; chi phí giai đoạn; chi phí cuối | $f_k(\xi,u)\in X_{k+1}$ |
| $J_k$, $u_k^*$ | chi phí tối ưu còn lại (hàm giá trị); chính sách | $X_k\to\mathbb R$ |

Các kết quả của bài gọi giả thiết bằng tên. Với quy hoạch tuyến tính, các giả thiết gồm:

- **(L1) Giả thiết hạng.** Bài toán ở dạng chuẩn $Ax=b$, $x\ge0$ với $A\in\mathbb R^{m\times n}$ và $\operatorname{rank}(A)=m$.
- **(L2) Có điểm cực biên.** Miền khả thi $P$ có ít nhất một điểm cực biên.
- **(L3) Giá trị hữu hạn.** $z^*=\sup_{x\in P}c^Tx$ hữu hạn.
- **(L4) Không suy biến.** Mọi nghiệm cơ sở khả thi có $m$ thành phần dương.

Với bài toán quyết định theo giai đoạn, các giả thiết gồm:

- **(D1) Hữu hạn.** $N$, mọi tập $X_k$ và mọi tập $U_k(\xi)$ hữu hạn, khác rỗng.
- **(D2) Tất định.** Trạng thái kế tiếp là $\xi_{k+1}=f_k(\xi_k,u_k)$.
- **(D3) Chi phí cộng.** Chi phí của chuỗi là $\sum_{k=0}^{N-1}g_k(\xi_k,u_k)+g_N(\xi_N)$.
- **(D4) Trạng thái đủ** (sufficient state). $g_k$ và $f_k$ chỉ phụ thuộc $(\xi_k,u_k)$, không phụ thuộc cách đi tới $\xi_k$.

## 3. Ví dụ xuyên suốt: bài toán hộp hạt và đồ thị tầng

Bài toán của câu hỏi mở đầu là ví dụ xuyên suốt của phần quy hoạch tuyến tính.

::: example Ví dụ 07.1 (Ràng buộc của bài toán hộp hạt)
**Dữ kiện.** Biến quyết định $x_1$, $x_2$ là sản lượng loại 1 và loại 2, tính theo nghìn hộp.

| Dữ kiện | Loại 1 | Loại 2 | Giới hạn chung |
|---|---:|---:|---:|
| Lợi ích (đơn vị / nghìn hộp) | $2$ | $3$ | không có |
| Giờ máy (giờ / nghìn hộp) | $1$ | $2$ | $54$ giờ |
| Sản lượng tối đa (nghìn hộp) | $30$ | $20$ | không có |

**Ràng buộc sản lượng**, tính bằng nghìn hộp:

$$
x_1\le30,\qquad x_2\le20 .
$$

**Ràng buộc giờ máy.** Loại 1 dùng $1\cdot x_1$ giờ, loại 2 dùng $2x_2$ giờ, nên hai vế cùng tính bằng giờ:

$$
x_1+2x_2\le54 .
$$

**Miền biến.** Sản lượng không âm: $x_1\ge0$, $x_2\ge0$.

**Kiểm tra một phương án.** Phương án $(30,20)$ thỏa hai giới hạn sản lượng với dấu bằng. Nó dùng $30+2\cdot20=70$ giờ máy, vượt giới hạn $54$ giờ thêm $16$ giờ.

**Kiểm tra lại.** Phương án $(30,12)$ dùng $30+2\cdot12=54$ giờ, đúng bằng giới hạn, và $30\le30$, $12\le20$, nên thỏa mọi ràng buộc.
:::

Bài toán thứ hai là một chuỗi quyết định trên đồ thị tầng (layered graph): đi từ nút $\mathrm s$ ở tầng $0$ tới nút $\mathrm t$ ở tầng $3$, qua một trong hai nút $\mathrm A$, $\mathrm B$ ở tầng $1$ và một trong hai nút $\mathrm C$, $\mathrm D$ ở tầng $2$. Chi phí cạnh là

- $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$;
- $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$;
- $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$,

và cần đường $\mathrm s\to\mathrm t$ có tổng chi phí nhỏ nhất.

![Đồ thị bốn tầng ghi k=0 đến k=3. Tầng 0 có nút s; tầng 1 có A, B; tầng 2 có C, D; tầng 3 có t. Chi phí cạnh: s–A 2, s–B 5, A–C 4, A–D 2, B–C 1, B–D 3, C–t 3, D–t 1.](img/lec-07/dp-layered-graph.svg)

## 4. Mô hình hóa quy hoạch tuyến tính

### 4.1. Biến, đơn vị và ràng buộc

Ví dụ 07.1 cho thấy tính khả thi phải được kiểm tra trên mọi ràng buộc cùng lúc: $(30,20)$ đặt mỗi loại ở mức tối đa riêng nhưng giờ máy dùng chung không đủ. Viết lại thành $x_1\le54-2x_2$, ràng buộc giờ máy cho thấy mỗi nghìn hộp loại 2 làm giảm $2$ nghìn hộp cận trên của loại 1.

Nhầm lẫn thường gặp là coi miền biến là hiển nhiên và bỏ khỏi mô hình. Khi thiếu điều kiện không âm, mọi điểm $(0,-\theta)$ với $\theta>0$ đều thỏa ba giới hạn $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, nên miền khả thi chứa các sản lượng âm và không bị chặn.

![Sơ đồ bốn khối từ trái sang phải: "Dữ kiện" (nghìn hộp, giới hạn 30 và 20, 54 giờ máy, 1 và 2 giờ mỗi nghìn hộp), "Biến" (x1, x2 không âm), "Ràng buộc" (x1 ≤ 30, x2 ≤ 20, x1+2x2 ≤ 54), "Mục tiêu" (cực đại 2x1+3x2). Chú thích: chỉ cộng các đại lượng cùng đơn vị trong một ràng buộc.](img/lec-07/lp-model-units.svg)

### 4.2. Hàm mục tiêu và dạng (1.1)

Để chọn giữa các phương án khả thi, ta cần một hàm đo lợi ích; với bài toán hộp hạt, đó là $z=2x_1+3x_2$, tính bằng đơn vị lợi ích.

::: example Ví dụ 07.2 (So sánh vài phương án của bài toán hộp hạt)
**Dữ kiện.** Bài toán hộp hạt (Ví dụ 07.1): cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$.

**Hai phương án dùng hết giờ máy.**

- Phương án $(30,12)$ là giao của $x_1=30$ với $x_1+2x_2=54$; nó cho $z=2\cdot30+3\cdot12=96$.
- Phương án $(14,20)$ là giao của $x_2=20$ với cùng đường giờ máy; nó cho $z=2\cdot14+3\cdot20=88$.

**Đọc chênh lệch.** Đi từ $(14,20)$ sang $(30,12)$:

- loại 1 tăng $16$ nghìn hộp, thêm $2\cdot16=32$ đơn vị lợi ích và dùng thêm $16$ giờ máy;
- loại 2 giảm $8$ nghìn hộp, giảm $3\cdot8=24$ đơn vị lợi ích và giải phóng $2\cdot8=16$ giờ máy.

Tính trên mỗi giờ máy, loại 1 mang lại $\tfrac21=2$ đơn vị còn loại 2 mang lại $\tfrac32=1{,}5$ đơn vị.

**Kiểm tra lại.** Chênh lệch $96-88=8$ bằng $32-24$ và bằng $16\cdot(2-1{,}5)$.
:::

So sánh vài điểm không chứng minh được điểm nào tối ưu. Để lập luận trên toàn miền, trước hết ta viết bài toán ở dạng (1.1).

::: example Ví dụ 07.3 (Bài toán hộp hạt ở dạng (1.1))
**Dữ kiện.** Bài toán hộp hạt (Ví dụ 07.1): cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$.

**Ánh xạ.** Có $n=2$ biến và $m=3$ giới hạn. Xếp các giới hạn theo thứ tự sản lượng loại 1, sản lượng loại 2, giờ máy:

$$
\begin{aligned}
&c=\begin{bmatrix}2\\3\end{bmatrix},\qquad b=\begin{bmatrix}30\\20\\54\end{bmatrix},\\
&A=\begin{bmatrix}1&0\\0&1\\1&2\end{bmatrix}.
\end{aligned}
$$

**Đọc ma trận.** Hàng thứ $i$ của $A$ ứng với giới hạn thứ $i$, và cột thứ $j$ là mức tiêu hao của sản phẩm $j$ trên ba giới hạn.

**Kiểm tra lại.** Tại $x=(30,12)$: $Ax=(30,12,54)$, không vượt $b=(30,20,54)$ ở thành phần nào, và $c^Tx=96$, khớp Ví dụ 07.2.
:::

Một bài toán có mục tiêu $x_1x_2$ hoặc ràng buộc $x_1^2\le4$ nằm ngoài lớp quy hoạch tuyến tính, vì các biểu thức đó phi tuyến theo $x$. Bài toán hộp hạt thêm điều kiện $x_1,x_2$ nguyên có mọi biểu thức tuyến tính nhưng miền quyết định rời rạc; đó là *quy hoạch nguyên* (integer programming).

Nhờ tính tuyến tính của mục tiêu, ta loại được ngay phần trong của miền.

::: proposition Mệnh đề 07.1 (Điểm trong không tối ưu) — chứng minh đầy đủ
**Giả thiết.** $P\subseteq\mathbb R^n$ là một tập bất kỳ, $c\in\mathbb R^n$, $c\ne0$. Điểm $\hat x\in P$ là điểm trong của $P$: có $\varepsilon>0$ để mọi $x$ với $\lVert x-\hat x\rVert\le\varepsilon$ đều thuộc $P$, trong đó $\lVert\cdot\rVert$ là chuẩn Euclid.

**Kết luận.** Điểm $\hat x'=\hat x+\varepsilon\,c/\lVert c\rVert$ thuộc $P$ và $c^T\hat x'=c^T\hat x+\varepsilon\lVert c\rVert>c^T\hat x$. Do đó $\hat x$ không phải nghiệm tối ưu của bài toán cực đại $c^Tx$ trên $P$.
:::

::: proof Chứng minh Mệnh đề 07.1
**Lộ trình.** Đi một đoạn độ dài $\varepsilon$ theo hướng $c$ từ $\hat x$.

**Bước 1 (điểm mới thuộc $P$).** Khoảng cách từ $\hat x'$ tới $\hat x$ là $\lVert\varepsilon c/\lVert c\rVert\rVert=\varepsilon$, nên $\hat x'\in P$ theo giả thiết về $\varepsilon$.

**Bước 2 (mục tiêu tăng).** Theo tính tuyến tính, $c^T\hat x'=c^T\hat x+\varepsilon\,c^Tc/\lVert c\rVert=c^T\hat x+\varepsilon\lVert c\rVert$. Vì $c\ne0$, số hạng thêm vào dương. $\square$
:::

Mệnh đề 07.1 không cần $P$ lồi hay là đa diện. Giả thiết $c\ne0$ là cần thiết, vì với $c=0$, mọi điểm khả thi đều tối ưu. Vì vậy, khi $c\ne0$, một nghiệm tối ưu, nếu có, nằm trên biên của $P$, nơi ít nhất một ràng buộc thỏa với dấu bằng.

Một bài toán thực tế được viết thành quy hoạch tuyến tính khi thỏa ba giả thiết mô hình sau (Kupferschmid 2023, §1.1.3, tr. 21).

::: remark Nhận xét 07.2 (Ba giả thiết mô hình của quy hoạch tuyến tính)
**Tỉ lệ.** Tăng gấp đôi sản lượng một loại thì lợi ích và mức tiêu hao của loại đó tăng gấp đôi. Một chi phí cố định phát sinh ngay khi bắt đầu sản xuất một loại vi phạm giả thiết này: lợi ích của loại 1 thành $2x_1-5$ khi $x_1>0$ và $0$ khi $x_1=0$, một hàm không tuyến tính.

**Cộng tính.** Đóng góp của các loại cộng với nhau. Nếu khi sản xuất đồng thời hai loại, máy quá nhiệt và sản lượng mỗi giờ giảm theo tích $x_1x_2$, giả thiết này sai.

**Biến nhận giá trị thực (chia được).** Đơn vị nghìn hộp cho phép coi sản lượng là đại lượng liên tục: $x_1=12{,}5$ ứng với $12\,500$ hộp. Khi quyết định là số lô nguyên, bài toán là quy hoạch nguyên.
:::

::: exercise Bài tập 07.1 (Dựng mô hình từ dữ kiện cho bằng lời)
Hai luồng suy luận dùng chung một bộ xử lý đồ họa (graphics processing unit, GPU) trong một giờ. Mỗi nghìn yêu cầu của luồng 1 và luồng 2 mang lại lợi ích $4$ và $5$ đơn vị, và dùng $2$ và $1$ phút GPU. GPU có ngân sách $14$ phút trong giờ đó; luồng 1 nhận tối đa $8$ nghìn yêu cầu, luồng 2 nhận tối đa $6$ nghìn yêu cầu.

- (a) Nêu biến quyết định và đơn vị.
- (b) Viết hàm mục tiêu và chiều tối ưu.
- (c) Viết mọi ràng buộc và miền biến; viết bài toán ở dạng (1.1) với $c$, $A$, $b$ cụ thể.
- (d) Kiểm tra tính khả thi của phương án $(4,6)$ và tính giá trị mục tiêu tại đó.
:::

::: hint
Ràng buộc GPU so sánh tổng số phút với ngân sách $14$ phút.
:::

::: solution
**Câu (a).** $x_1$, $x_2$ là số nghìn yêu cầu của luồng 1 và luồng 2 được phục vụ trong giờ đó.

**Câu (b).** Cực đại $4x_1+5x_2$, tính bằng đơn vị lợi ích.

**Câu (c).** Ràng buộc GPU, tính bằng phút: $2x_1+x_2\le14$. Hai giới hạn yêu cầu, tính bằng nghìn yêu cầu: $x_1\le8$, $x_2\le6$. Miền biến: $x_1,x_2\ge0$. Dạng (1.1) có

$$
\begin{aligned}
&c=\begin{bmatrix}4\\5\end{bmatrix},\qquad b=\begin{bmatrix}14\\8\\6\end{bmatrix},\\
&A=\begin{bmatrix}2&1\\1&0\\0&1\end{bmatrix}.
\end{aligned}
$$

**Câu (d).** Phương án $(4,6)$ dùng $2\cdot4+6=14$ phút, đúng bằng ngân sách; $4\le8$ và $6\le6$. Vậy $(4,6)$ khả thi, với hai ràng buộc hoạt động là GPU và giới hạn luồng 2. Giá trị mục tiêu là $4\cdot4+5\cdot6=46$.

**Kiểm tra lại.** Với $Ax$ tại $(4,6)$: $(14,4,6)\le(14,8,6)$. Ba lỗi thường gặp là đảo hệ số thành $x_1+2x_2\le14$, dùng $60$ phút thay cho ngân sách $14$ phút, và quên miền biến.
:::

### 4.3. Hồi quy sai số tuyệt đối dưới dạng quy hoạch tuyến tính

Xét hồi quy với $M$ mẫu: mẫu $i$ có vector đặc trưng $h_i\in\mathbb R^n$ và giá trị đích $y_i\in\mathbb R$, tham số của mô hình tuyến tính là $x\in\mathbb R^n$, và phần dư của mẫu $i$ là

$$
r_i=h_i^Tx-y_i .
$$

Bình phương nhỏ nhất của Bài 01 cực tiểu $\sum_ir_i^2$ và khuếch đại các mẫu ngoại lai (outlier): một phần dư bằng $10$ đóng góp $100$ vào tổng bình phương nhưng chỉ $10$ vào tổng trị tuyệt đối. Hồi quy sai số tuyệt đối (least absolute deviations, Định nghĩa 02.13), còn gọi là hồi quy chuẩn $L_1$ hay xấp xỉ chuẩn một, cực tiểu $\sum_i|r_i|$.

Mục tiêu này lồi (Định lý 01.30) nhưng không khả vi tại các điểm có $r_i=0$. Bài 02 viết $r=Xw-y$ với $N$ mẫu; ở đây $h_i^T$ là hàng $i$ của $X$, và số mẫu viết là $M$ vì $N$ là số giai đoạn của phần quy hoạch động.

Theo Bổ đề 02.14, $t\ge|r|$ khi và chỉ khi $t\ge r$ và $t\ge-r$, nên $|r|$ là giá trị nhỏ nhất của một biến phụ $t$ bị chặn dưới bởi hai hàm tuyến tính.

::: example Ví dụ 07.4 (Tổng hai trị tuyệt đối)
**Dữ kiện.** Hai mẫu một chiều với $h_1=h_2=1$, $y_1=1$, $y_2=3$; tham số $x\in\mathbb R$. Bài toán là cực tiểu $|x-1|+|x-3|$.

**Giải trực tiếp theo ba khoảng.**

- Với $x\in[1,3]$: $|x-1|+|x-3|=(x-1)+(3-x)=2$.
- Với $x>3$: tổng bằng $2x-4>2$.
- Với $x<1$: tổng bằng $4-2x>2$.

Giá trị tối ưu là $2$, đạt tại mọi $x\in[1,3]$.

**Dạng có biến phụ.** Với hai biến phụ $t_1$, $t_2$, bài toán viết thành: cực tiểu $t_1+t_2$ dưới bốn ràng buộc $-t_1\le x-1\le t_1$, $-t_2\le x-3\le t_2$. Tại $x=2$, chọn $t_1=t_2=1$ thì mọi ràng buộc thỏa và $t_1+t_2=2$.

**Kiểm tra lại.** Tại $x=2$, $t_1=3$, $t_2=1$ vẫn khả thi nhưng cho $4>2$. Nghiệm không duy nhất: $x=1$ và $x=3$ cùng cho $2$.
:::

Áp dụng Định lý 02.15 với $C=\mathbb R^n$, $f_0=0$, $\gamma_i=1$ và hai hàm affine $\pm(h_i^Tx-y_i)$ cho mỗi mẫu $i$, bài toán cực tiểu $\sum_i|r_i|$ tương đương với quy hoạch tuyến tính theo biến $(x,t)\in\mathbb R^{n+M}$

$$
\begin{aligned}
\min_{x,\,t}\quad&\sum_{i=1}^Mt_i\\
&-t_i\le h_i^Tx-y_i\le t_i,\\
&i=1,\ldots,M,
\end{aligned}
\tag{4.1}
$$

theo nghĩa hai bài toán có cùng giá trị tối ưu, nghiệm của bài toán này cho nghiệm của bài toán kia (Định lý 02.15(a)), và mọi nghiệm $(x^*,t^*)$ của (4.1) có $t_i^*=|h_i^Tx^*-y_i|$ (Định lý 02.15(b)).

Nhận xét 02.16 nêu các lỗi thường gặp với biến phụ. Với (4.1), đổi sang cực đại $\sum_it_i$ cho bài toán không bị chặn (Nhận xét 02.16, mục 3).

**Trong học máy.** Hồi quy sai số tuyệt đối ít nhạy với ngoại lai hơn bình phương nhỏ nhất và được giải bằng quy hoạch tuyến tính (4.1) (Murphy 2022, §11.6.1, tr. 402–404).

::: exercise Bài tập 07.2 (Mô hình hằng với mất mát $L_1$)
Ba mẫu có giá trị đích $y_1=0$, $y_2=2$, $y_3=6$; mô hình hằng dự đoán cùng một số $x\in\mathbb R$ cho mọi mẫu, tức $h_i=1$.

- (a) Viết bài toán cực tiểu $\sum_i|x-y_i|$ thành quy hoạch tuyến tính dạng (4.1); nêu số biến và số ràng buộc.
- (b) Tìm nghiệm và giá trị tối ưu.
- (c) Tìm nghiệm của bình phương nhỏ nhất $\sum_i(x-y_i)^2$, so với (b), và xác định mẫu làm nghiệm đó lệch khỏi trung vị nhiều nhất.
:::

::: hint
Câu (a) lập như Bài tập 02.4(a), với $y_1=0$ thay cho $1$. Ở (b), viết hàm $\sum_i|x-y_i|$ trên từng khoảng $(-\infty,0]$, $[0,2]$, $[2,6]$, $[6,\infty)$ và xét độ dốc.
:::

::: solution
**Câu (a).** Biến $(x,t_1,t_2,t_3)\in\mathbb R^4$; cực tiểu $t_1+t_2+t_3$ dưới sáu ràng buộc $-t_1\le x\le t_1$, $-t_2\le x-2\le t_2$, $-t_3\le x-6\le t_3$.

**Câu (b).** Độ dốc của $\sum_i|x-y_i|$ bằng số mẫu có $y_i<x$ trừ số mẫu có $y_i>x$.

- Trên $(-\infty,0)$ độ dốc là $0-3=-3$.
- Trên $(0,2)$ độ dốc là $1-2=-1$.
- Trên $(2,6)$ độ dốc là $2-1=1$.
- Trên $(6,\infty)$ độ dốc là $3-0=3$.

Hàm giảm tới $x=2$ rồi tăng, nên nghiệm duy nhất là $x^*=2$, trung vị của ba giá trị, với giá trị $2+0+4=6$. Nghiệm của (4.1) là $(2,2,0,4)$.

**Câu (c).** Bình phương nhỏ nhất cho trung bình $x=\tfrac{0+2+6}3=\tfrac83$. Mẫu $y_3=6$ ở xa nhất và làm trung bình tăng; trung vị không đổi nếu thay $6$ bằng $60$, còn trung bình thành $\tfrac{62}3$.

**Kiểm tra lại.** Tại $x=2$: $|2-0|+|2-2|+|2-6|=6$; tại $x=\tfrac83$: $\tfrac83+\tfrac23+\tfrac{10}3=\tfrac{20}3>6$.
:::

## 5. Đa diện, dạng chuẩn và nghiệm cơ sở

Theo Mệnh đề 07.1, nghiệm tối ưu nằm trên biên của miền khả thi, nhưng biên vẫn có vô số điểm. Để loại các phương án đó trong bài toán hộp hạt, ta chứng minh $2x_1+3x_2\le96$ trên toàn miền, rồi tính các điểm góc của miền bằng đại số.

### 5.1. Đa diện và đường mức

Mỗi bất phương trình $a^Tx\le\beta$ giữ lại một nửa mặt phẳng nằm về một phía của đường biên $a^Tx=\beta$, và miền khả thi là phần chung của các nửa mặt phẳng đó.

![Ngũ giác khả thi của bài toán hộp hạt với năm đỉnh (0,0), (30,0), (30,12), (14,20), (0,20); đường mức nét đứt z = 60 qua (30,0) và (0,20); đường mức z = 96 chỉ chạm miền tại (30,12); mũi tên "tăng z" theo hướng (2,3).](img/lec-07/polyhedron-level-sets.svg)

Đường giờ máy cắt hai trục tại $(54,0)$ và $(0,27)$. Các đường $2x_1+3x_2=\alpha$, gọi là đường mức (level curve) của mục tiêu, song song vì cùng vector pháp tuyến $c=(2,3)$. Tăng $\alpha$ tịnh tiến đường mức theo hướng $c$, và đường mức cuối cùng còn có điểm chung với miền là $z=96$, với điểm chung duy nhất là một đỉnh.

::: example Ví dụ 07.5 (Cận trên của mục tiêu hộp hạt)
**Dữ kiện.** Bài toán hộp hạt (Ví dụ 07.1): cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$. Năm đỉnh của ngũ giác khả thi là $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$.

**Giá trị tại năm đỉnh.** Lần lượt là $0$, $60$, $96$, $88$, $60$.

**Cận trên bằng tổ hợp không âm.** Tìm hệ số $\mu_1,\mu_3\ge0$ để $2x_1+3x_2=\mu_1x_1+\mu_3(x_1+2x_2)$. So hệ số của $x_2$: $2\mu_3=3$, nên $\mu_3=\tfrac32$. So hệ số của $x_1$: $\mu_1+\mu_3=2$, nên $\mu_1=\tfrac12$. Với mọi phương án khả thi,

$$
\begin{aligned}
2x_1+3x_2&=\tfrac12x_1+\tfrac32(x_1+2x_2)\\
&\le\tfrac12\cdot30+\tfrac32\cdot54\\
&=96 .
\end{aligned}
$$

Bất đẳng thức dùng $x_1\le30$, $x_1+2x_2\le54$ và hai hệ số không âm.

**Dấu bằng.** Dấu bằng xảy ra khi và chỉ khi $x_1=30$ và $x_1+2x_2=54$, tức $x=(30,12)$. Điểm này khả thi, nên nó là nghiệm tối ưu duy nhất và $z^*=96$.

**Kiểm tra lại.** Hai hệ số cho $\tfrac12+\tfrac32=2$ ở $x_1$ và $\tfrac32\cdot2=3$ ở $x_2$. Tại $(14,20)$: $\tfrac12\cdot14+\tfrac32\cdot54=7+81=88$, khớp $z=88$ vì $x_1+2x_2=54$ hoạt động tại đó.
:::

Đây là câu trả lời cho câu hỏi mở đầu: $30$ nghìn hộp loại 1 và $12$ nghìn hộp loại 2, với lợi ích $96$. Cận được chứng minh bằng cơ chế của Mệnh đề 02.11 viết cho chiều cực đại, với $\tfrac12$, $\tfrac32$ là nhân tử đối ngẫu (Mệnh đề 03.11). Để tìm hai hệ số đó, cần biết trước hai ràng buộc hoạt động tại nghiệm.

::: definition Định nghĩa 07.3 (Siêu phẳng, nửa không gian, đa diện)
Cho $a\in\mathbb R^n$, $a\ne0$, và $\beta\in\mathbb R$.

**Siêu phẳng và nửa không gian.** Tập $\{x\in\mathbb R^n\mid a^Tx=\beta\}$ là một *siêu phẳng* (hyperplane); tập $\{x\in\mathbb R^n\mid a^Tx\le\beta\}$ là một *nửa không gian* (halfspace).

**Đa diện.** Cho $A\in\mathbb R^{m\times n}$ với các hàng $a_1^T,\ldots,a_m^T$ và $b\in\mathbb R^m$. Tập

$$
P=\{x\in\mathbb R^n\mid Ax\le b\}
\tag{5.1}
$$

là một *đa diện* (polyhedron); nó là giao của $m$ nửa không gian $\{x\mid a_i^Tx\le b_i\}$.

**Bị chặn.** Đa diện $P$ *bị chặn* (bounded) nếu có $K\ge0$ để $\lVert x\rVert\le K$ với mọi $x\in P$.
:::

Một đa diện có thể rỗng, kéo dài vô hạn, hoặc có số chiều nhỏ hơn $n$. Miền khả thi của dạng (1.1) là đa diện với $m+n$ hàng: $m$ hàng của $Ax\le b$ cộng $n$ hàng $-x_j\le0$; ràng buộc $a^Tx\ge\beta$ viết lại thành $(-a)^Tx\le-\beta$.

::: proposition Mệnh đề 07.4 (Đa diện là tập lồi; tập dạng chuẩn là đa diện) — chứng minh đầy đủ
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$. Riêng cho phần (b): $A'\in\mathbb R^{m'\times n}$, $b'\in\mathbb R^{m'}$.

**Kết luận.**

- (a) $P$ là tập lồi.
- (b) Tập $Q=\{x\in\mathbb R^n\mid A'x=b',\ x\ge0\}$ là một đa diện, với $2m'+n$ bất phương trình.
:::

::: proof Chứng minh Mệnh đề 07.4
**Lộ trình.** Phần (a) viết $P$ thành giao của các tập lồi; phần (b) viết mỗi phương trình thành hai bất phương trình.

**Bước 1 (phần (a)).** Mỗi tập $\{x\mid a_i^Tx\le b_i\}$ lồi: với $a_i\ne0$ đó là nửa không gian, lồi theo Mệnh đề 01.18(c); với $a_i=0$ tập là $\mathbb R^n$ hoặc rỗng, cả hai đều lồi. $P$ là giao của $m$ tập lồi, nên lồi theo Mệnh đề 01.19(a).

**Bước 2 (phần (b)).** Phương trình $A'x=b'$ tương đương với hai bất phương trình $A'x\le b'$ và $-A'x\le-b'$, còn $x\ge0$ tương đương với $-x\le0$. Do đó $Q=\{x\mid\tilde Ax\le\tilde b\}$ với $\tilde A$ xếp chồng $A'$, $-A'$, $-I$ và $\tilde b$ xếp chồng $b'$, $-b'$, $0$. $\square$
:::

Theo phần (b), mọi kết quả về đa diện dạng (5.1) áp dụng cho miền khả thi của bài toán có phương trình và điều kiện không âm.

::: example Ví dụ 07.6 (Đa diện bị chặn và không bị chặn)
**Dữ kiện.** Miền hộp hạt và tập $P_1=\{x\in\mathbb R^2\mid x_1+x_2\ge1,\ x\ge0\}$.

**Miền hộp hạt.** Mọi phương án khả thi có $0\le x_1\le30$ và $0\le x_2\le20$, nên $\lVert x\rVert\le\sqrt{30^2+20^2}=\sqrt{1300}\approx36{,}06$. Miền bị chặn với $K=\sqrt{1300}$.

**Một miền không bị chặn.** Tập $P_1$ viết ở dạng (5.1) với các hàng $-x_1-x_2\le-1$, $-x_1\le0$, $-x_2\le0$. Với mọi $\theta\ge1$, điểm $(\theta,0)$ thuộc $P_1$ và có chuẩn $\theta$, nên không có $K$ nào chặn được.

**Kiểm tra lại.** Tại $(\theta,0)$ với $\theta=5$: $5+0=5\ge1$, $5\ge0$, $0\ge0$.
:::

Miền không bị chặn không kéo theo mục tiêu không bị chặn: trên $P_1$, bài toán cực đại $x_1$ không bị chặn trên, nhưng bài toán cực đại $-x_1-x_2$ có giá trị tối ưu $-1$, đạt trên cả đoạn $x_1+x_2=1$, $x\ge0$.

### 5.2. Dạng chuẩn

Về mặt ý tưởng, trong $\mathbb R^n$ một đỉnh là điểm duy nhất thỏa với dấu bằng $n$ ràng buộc độc lập tuyến tính. Để tính đỉnh bằng cách giải hệ phương trình, mọi ràng buộc, trừ điều kiện không âm, được viết thành phương trình.

::: definition Định nghĩa 07.5 (Dạng chuẩn)
Cho $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$ và $c\in\mathbb R^n$. Quy hoạch tuyến tính *dạng chuẩn* (standard form) là

$$
\begin{aligned}
\max_{x\in\mathbb R^n}\quad&c^Tx\\
&Ax=b,\quad x\ge0 .
\end{aligned}
\tag{5.2}
$$

Miền khả thi của nó là $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$.
:::

Giả thiết hạng (L1) bảo đảm chọn được $m$ cột độc lập của $A$, tức một ma trận vuông khả nghịch. So với Định nghĩa 02.9, định nghĩa này viết ở chiều cực đại.

Theo Mệnh đề 02.10(b), viết cho chiều cực đại, bài toán cực đại $c^Tx$ trên $\{x\mid Ax\le b\}$ tương đương với bài toán dạng chuẩn theo biến $\tilde x=(x^+,x^-,s)\in\mathbb R^{2n+m}$, với

$$
\tilde A=\begin{bmatrix}A&-A&I\end{bmatrix},\qquad\tilde c=\begin{bmatrix}c\\-c\\0\end{bmatrix},
$$

và hai ánh xạ $\varphi(x)=(\max(x,0),\max(-x,0),b-Ax)$, $\psi(x^+,x^-,s)=x^+-x^-$ chuyển nghiệm tối ưu của bài toán này thành nghiệm tối ưu của bài toán kia, và hai bài toán có cùng giá trị tối ưu (Mệnh đề 02.6(c)). Khối $I$ cho $\operatorname{rank}(\tilde A)=m$, nên bài toán mới thỏa (L1).

Biến bù (slack variable, Mệnh đề 02.10) $s=\beta-a^Tx$ của ràng buộc $a^Tx\le\beta$ đo phần giới hạn chưa dùng; biến dư (surplus variable) $e=a^Tx-\beta$ của ràng buộc $a^Tx\ge\beta$ đo phần vượt trên cận dưới.

::: remark Nhận xét 07.6 (Khi bài toán cho sẵn phương trình)
Nếu hệ $A'x=b'$ có nghiệm nhưng các hàng phụ thuộc tuyến tính, bỏ các hàng phụ thuộc không làm đổi tập nghiệm, vì mỗi hàng bỏ đi cùng vế phải của nó là tổ hợp của các hàng giữ lại. Sau bước này, (L1) thỏa. Ví dụ: hệ $x_1+x_2=2$, $2x_1+2x_2=4$ thu về $x_1+x_2=2$.
:::

::: example Ví dụ 07.7 (Dạng chuẩn của bài toán hộp hạt)
**Dữ kiện.** Bài toán hộp hạt (Ví dụ 07.1): cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$.

**Thêm biến bù.** Hai biến đã không âm nên không cần tách. Mỗi giới hạn nhận một biến bù $s_i\ge0$:

$$
\begin{aligned}
x_1+s_1&=30,\\
x_2+s_2&=20,\\
x_1+2x_2+s_3&=54,
\end{aligned}
$$

cùng điều kiện $x_1,x_2,s_1,s_2,s_3\ge0$. Với thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$, ma trận và vế phải là

$$
\begin{aligned}
\bar A&=\begin{bmatrix}1&0&1&0&0\\0&1&0&1&0\\1&2&0&0&1\end{bmatrix}\\
&=\begin{bmatrix}A&I\end{bmatrix},\\
b&=\begin{bmatrix}30\\20\\54\end{bmatrix},
\end{aligned}
$$

với $A$ là ma trận $3\times2$ của Ví dụ 07.3. Dạng chuẩn có $m=3$, $n=5$ và $\operatorname{rank}(\bar A)=3$ nhờ ba cột đơn vị. Mục tiêu giữ nguyên với $c=(2,3,0,0,0)$, vì biến bù không đóng góp vào lợi ích.

**Đọc biến bù.** $s_1=30-x_1$ và $s_2=20-x_2$ là phần sản lượng tối đa chưa dùng; $s_3=54-x_1-2x_2$ là số giờ máy còn trống. Tại đỉnh $(30,12)$, $(s_1,s_2,s_3)=(0,8,0)$: hai biến bù bằng $0$ ứng với hai ràng buộc hoạt động, còn giới hạn loại 2 dư $8$ nghìn hộp.

**Cạnh và biến bằng không.** Mỗi cạnh của ngũ giác nằm trên một đường mà một trong năm biến bằng $0$: $s_1=0$ trên $x_1=30$, $s_2=0$ trên $x_2=20$, $s_3=0$ trên đường giờ máy, $x_1=0$ và $x_2=0$ trên hai trục.

![Ngũ giác hộp hạt, mỗi cạnh ghi biến bằng 0: x2 = 0 ở cạnh dưới, s1 = 0 trên x1 = 30, s3 = 0 trên x1 + 2x2 = 54, s2 = 0 trên x2 = 20, x1 = 0 ở cạnh trái; hai cạnh s1 = 0 và s3 = 0 tô đậm, cắt nhau tại (30,12).](img/lec-07/pentagon-edge-labels.svg)

**Kiểm tra lại.** Tại $(30,12)$: $s_3=54-30-24=0$ và $s_2=20-12=8$. Ma trận $\bar A$ nhân $(30,12,0,8,0)$ cho $(30,20,54)=b$.
:::

### 5.3. Nghiệm cơ sở khả thi

Một cách trực quan, với hệ dạng chuẩn gồm $m$ phương trình và $n$ biến, ta cho $n-m$ biến bằng $0$ rồi giải $m$ biến còn lại từ một hệ vuông. Quy trình hỏng khi hệ vuông không khả nghịch hoặc nghiệm có thành phần âm; định nghĩa sau loại hai trường hợp đó.

::: definition Định nghĩa 07.7 (Cơ sở, nghiệm cơ sở, nghiệm cơ sở khả thi)
Cho $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$ với $A\in\mathbb R^{m\times n}$, $\operatorname{rank}(A)=m$.

**Cơ sở.** Một tập chỉ số $B\subseteq\{1,\ldots,n\}$ với $\lvert B\rvert=m$ là một *cơ sở* (basis) nếu ma trận $A_B\in\mathbb R^{m\times m}$ gồm các cột $A_j$, $j\in B$, khả nghịch. Đặt $B^{\mathrm c}=\{1,\ldots,n\}\setminus B$. Biến $x_j$ với $j\in B$ là *biến cơ sở* (basic variable), với $j\in B^{\mathrm c}$ là *biến ngoài cơ sở* (nonbasic variable).

**Nghiệm cơ sở.** Vector $x\in\mathbb R^n$ với

$$
x_B=A_B^{-1}b,\qquad x_{B^{\mathrm c}}=0
\tag{5.3}
$$

là *nghiệm cơ sở* (basic solution) ứng với $B$.

**Nghiệm cơ sở khả thi.** Nếu thêm $x_B\ge0$, nghiệm cơ sở là *nghiệm cơ sở khả thi* (basic feasible solution).

**Suy biến.** Nghiệm cơ sở khả thi là *suy biến* (degenerate) nếu có ít nhất một thành phần của $x_B$ bằng $0$.
:::

Khi đặt các biến ngoài cơ sở bằng $0$, hệ $Ax=b$ thu về $A_Bx_B=b$, có nghiệm duy nhất vì $A_B$ khả nghịch. Vì vậy nghiệm cơ sở luôn thỏa $Ax=b$, và chỉ còn điều kiện $x\ge0$ phải kiểm tra.

Có ba nhầm lẫn thường gặp với định nghĩa này.

- Giả thiết hạng bảo đảm có ít nhất một cơ sở, nhưng không bảo đảm mọi tập $m$ cột đều khả nghịch.
- Khả nghịch chưa bảo đảm khả thi: vẫn phải kiểm tra $A_B^{-1}b\ge0$.
- Suy biến có nghĩa điểm có ít hơn $m$ thành phần dương; một điểm như vậy có thể ứng với nhiều cơ sở.

Mỗi tập $B$ có $m$ phần tử cho nhiều nhất một nghiệm cơ sở, nên một hệ dạng chuẩn có nhiều nhất $\binom nm$ nghiệm cơ sở; với bài toán hộp hạt, $\bar A\in\mathbb R^{3\times5}$ có $\binom53=10$ cách chọn $B$.

::: example Ví dụ 07.8 (Hai cơ sở của bài toán hộp hạt)
**Dữ kiện.** Hệ dạng chuẩn của bài toán hộp hạt với thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$: $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm.

**Cơ sở $B=\{1,2,4\}$, tức các cột của $x_1$, $x_2$, $s_2$.**

$$
A_B=\begin{bmatrix}1&0&0\\0&1&1\\1&2&0\end{bmatrix}.
$$

Khai triển theo hàng thứ nhất, $\det(A_B)=1\cdot(1\cdot0-1\cdot2)=-2\ne0$. Đặt $s_1=s_3=0$.

- Phương trình thứ nhất cho $x_1=30$.
- Phương trình thứ ba cho $30+2x_2=54$, tức $x_2=12$.
- Phương trình thứ hai cho $s_2=20-12=8$.

Đây là nghiệm cơ sở khả thi không suy biến $(30,12,0,8,0)$, ứng với đỉnh $(30,12)$.

**Cơ sở $B=\{1,2,5\}$, tức các cột của $x_1$, $x_2$, $s_3$.** Ma trận $A_B$ tam giác dưới với đường chéo $1,1,1$, nên $\det(A_B)=1$. Đặt $s_1=s_2=0$: $x_1=30$, $x_2=20$, $s_3=54-70=-16$, một giá trị âm. Đây là nghiệm cơ sở nhưng không khả thi: điểm $(30,20)$ nằm ngoài miền vì dùng vượt $16$ giờ máy.

**Kiểm tra lại.** $\bar A(30,12,0,8,0)^T=(30,20,54)^T$ và $\bar A(30,20,0,0,-16)^T=(30,20,54)^T$: cả hai thỏa $\bar Ax=b$, chỉ điểm thứ hai vi phạm $x\ge0$.
:::

Về mặt hình học, mỗi nghiệm cơ sở của hệ hộp hạt là giao của hai đường biên, và chỉ giao điểm nằm trong ngũ giác mới là đỉnh.

::: example Ví dụ 07.9 (Một nghiệm cơ sở khả thi suy biến)
**Dữ kiện.** Hệ $x_1+x_3=1$, $x_2+x_4=0$, $x\in\mathbb R^4$, $x\ge0$; ma trận có hai hàng độc lập, nên $m=2$, $n=4$.

**Cơ sở $B=\{1,2\}$.** $A_B=I$, nên $x_1=1$, $x_2=0$; nghiệm cơ sở là $(1,0,0,0)$. Biến cơ sở $x_2$ bằng $0$, nên nghiệm cơ sở khả thi này suy biến.

**Cơ sở $B=\{1,4\}$.** $A_B$ có hai cột $(1,0)^T$, $(0,1)^T$, khả nghịch. Đặt $x_2=x_3=0$: $x_1=1$, $x_4=0$, cho cùng điểm $(1,0,0,0)$.

**Kiểm tra lại.** Phương trình thứ hai và $x_2,x_4\ge0$ buộc $x_2=x_4=0$, nên miền khả thi là đoạn $\{(x_1,0,1-x_1,0)\mid0\le x_1\le1\}$ với hai đầu mút $(1,0,0,0)$, $(0,0,1,0)$.
:::

Trong Ví dụ 07.9, một điểm ứng với hai cơ sở. Đó là đặc trưng của suy biến: khi biến cơ sở $x_2$ bằng $0$, đổi nó với biến ngoài cơ sở $x_4$ không làm điểm thay đổi.

::: exercise Bài tập 07.3 (Đưa về dạng chuẩn khi có ràng buộc $\ge$ và biến tự do)
Xét bài toán cực đại $3x_1+x_2$ dưới các ràng buộc $x_1-x_2\ge2$, $x_1+x_2\le6$, $x_1\ge0$, còn $x_2$ là biến tự do.

- (a) Viết bài toán ở dạng chuẩn (5.2), nêu ma trận, vế phải và số biến.
- (b) Kiểm tra tính khả thi của phương án $(x_1,x_2)=(4,-1)$ và viết một điểm của dạng chuẩn ứng với nó.
- (c) Chỉ ra hai điểm khác nhau của dạng chuẩn cùng ứng với $(4,-1)$.
:::

::: hint
Ràng buộc $\ge$ nhận một biến dư $e_1\ge0$ với dấu trừ; biến tự do $x_2$ thay bằng $x_2^+-x_2^-$.
:::

::: solution
**Câu (a).** Biến của dạng chuẩn là $(x_1,x_2^+,x_2^-,e_1,s_2)\in\mathbb R^5$, mọi biến không âm. Hai phương trình là $x_1-x_2^++x_2^--e_1=2$ và $x_1+x_2^+-x_2^-+s_2=6$; mục tiêu là cực đại $3x_1+x_2^+-x_2^-$. Ma trận và vế phải

$$
\begin{aligned}
A&=\begin{bmatrix}1&-1&1&-1&0\\1&1&-1&0&1\end{bmatrix},\\
b&=\begin{bmatrix}2\\6\end{bmatrix},
\end{aligned}
$$

có hai hàng độc lập (hai cột cuối là $(-1,0)^T$ và $(0,1)^T$), nên $\operatorname{rank}(A)=2=m$ và $n=5$.

**Câu (b).** $4-(-1)=5\ge2$ và $4+(-1)=3\le6$, nên khả thi. Với $x_2^+=0$, $x_2^-=1$: $e_1=5-2=3$ và $s_2=6-3=3$, cho điểm $(4,0,1,3,3)$.

**Câu (c).** Điểm $(4,0,1,3,3)$ và điểm $(4,2,3,3,3)$ đều thỏa hai phương trình và cùng cho $x_2=x_2^+-x_2^-=-1$.

**Kiểm tra lại.** Tại $(4,2,3,3,3)$: $4-2+3-3=2$ và $4+2-3+3=6$; mục tiêu $12+2-3=11=3\cdot4+(-1)$.
:::

::: exercise Bài tập 07.4 (Mười cách chọn cơ sở của bài toán hộp hạt)
Hệ dạng chuẩn của bài toán hộp hạt, thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$: $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm.

- (a) Liệt kê mười tập $B$ có ba phần tử. Với mỗi tập, xác định $A_B$ có khả nghịch không; nếu có, tính nghiệm cơ sở.
- (b) Xác định các nghiệm cơ sở khả thi và điểm $(x_1,x_2)$ tương ứng. Đối chiếu với năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$.
- (c) Giải thích bằng hình vì sao hai tập không khả nghịch.
- (d) Trong các nghiệm cơ sở khả thi, nghiệm nào suy biến.
:::

::: hint
Hai biến ngoài $B$ đặt bằng $0$ ứng với hai đường biên, và nghiệm cơ sở là giao điểm của hai đường.
:::

::: solution
**Câu (a) và (b).** Mỗi hàng của bảng ghi $B$, hai biến ngoài cơ sở và nghiệm $(x_1,x_2,s_1,s_2,s_3)$.

| $B$ | Ngoài cơ sở | $\det(A_B)$ | Nghiệm cơ sở | Khả thi |
|---|---|---:|---|---|
| $x_1,x_2,s_1$ | $s_2,s_3$ | $-1$ | $(14,20,16,0,0)$ | có, đỉnh $(14,20)$ |
| $x_1,x_2,s_2$ | $s_1,s_3$ | $-2$ | $(30,12,0,8,0)$ | có, đỉnh $(30,12)$ |
| $x_1,x_2,s_3$ | $s_1,s_2$ | $1$ | $(30,20,0,0,-16)$ | không |
| $x_1,s_1,s_2$ | $x_2,s_3$ | $1$ | $(54,0,-24,20,0)$ | không |
| $x_1,s_1,s_3$ | $x_2,s_2$ | $0$ | không có | |
| $x_1,s_2,s_3$ | $x_2,s_1$ | $1$ | $(30,0,0,20,24)$ | có, đỉnh $(30,0)$ |
| $x_2,s_1,s_2$ | $x_1,s_3$ | $2$ | $(0,27,30,-7,0)$ | không |
| $x_2,s_1,s_3$ | $x_1,s_2$ | $-1$ | $(0,20,30,0,14)$ | có, đỉnh $(0,20)$ |
| $x_2,s_2,s_3$ | $x_1,s_1$ | $0$ | không có | |
| $s_1,s_2,s_3$ | $x_1,x_2$ | $1$ | $(0,0,30,20,54)$ | có, đỉnh $(0,0)$ |

Năm nghiệm cơ sở khả thi ứng đúng năm đỉnh, mỗi đỉnh một cơ sở. Ba nghiệm cơ sở không khả thi là ba giao điểm nằm ngoài ngũ giác: $(30,20)$, $(54,0)$, $(0,27)$.

![Ngũ giác hộp hạt và ba đường biên kéo dài x1 = 30, x2 = 20, x1 + 2x2 = 54; chấm đặc tại năm đỉnh là nghiệm cơ sở khả thi; chấm rỗng tại (30,20), (54,0), (0,27) là nghiệm cơ sở không khả thi.](img/lec-07/basic-solutions-boxes.svg)

**Câu (c).** Tập $\{x_1,s_1,s_3\}$ đặt $x_2=s_2=0$, tức hai đường song song $x_2=0$ và $x_2=20$; tập $\{x_2,s_2,s_3\}$ đặt $x_1=s_1=0$, tức hai đường song song $x_1=0$ và $x_1=30$. Về đại số, ở tập thứ nhất cả ba cột có hàng thứ hai bằng $0$.

**Câu (d).** Không nghiệm nào suy biến: ở cả năm nghiệm cơ sở khả thi, ba biến cơ sở đều dương, chẳng hạn $(14,20,16)$ tại đỉnh $(14,20)$ và $(30,20,54)$ tại $(0,0)$. Về hình học, mỗi đỉnh của ngũ giác có đúng hai ràng buộc hoạt động.

**Kiểm tra lại.** Tại $(14,20,16,0,0)$: $14+16=30$, $20+0=20$, $14+40+0=54$. Tại $(0,27,30,-7,0)$: $27-7=20$ và $54+0=54$.
:::

## 6. Điểm cực biên và nghiệm cơ sở khả thi

Để dùng quan hệ giữa nghiệm cơ sở khả thi và đỉnh trong nhiều chiều, cần trả lời ba câu hỏi:

- định nghĩa đỉnh thế nào cho mọi số chiều;
- vì sao nghiệm cơ sở khả thi và đỉnh trùng nhau;
- đa diện nào có đỉnh, vì nửa mặt phẳng $\{x\in\mathbb R^2\mid x_2\ge0\}$ không có đỉnh nào.

### 6.1. Điểm cực biên

Về mặt hình học, đỉnh của một miền lồi là điểm không nằm giữa hai điểm khác nhau của miền.

![Ngũ giác hộp hạt với đỉnh v = (30,12) ghi "điểm cực biên", điểm (30,6) = ½(30,0) + ½(30,12) trên cạnh x1 = 30, và điểm (10,10) bên trong là trung điểm của một đoạn nằm ngang.](img/lec-07/extreme-point-def-note.svg)

Hai điểm $(30,6)$, $(10,10)$ trên hình là trung điểm của hai điểm khác nhau của miền, còn đỉnh $v$ không là trung điểm của đoạn nào trong miền; định nghĩa sau làm chính xác tính chất đó.

::: definition Định nghĩa 07.8 (Điểm cực biên)
Cho tập lồi $C\subseteq\mathbb R^n$. Điểm $v\in C$ là một *điểm cực biên* (extreme point) của $C$ nếu từ

$$
\begin{aligned}
&v=\lambda x'+(1-\lambda)x'',\\
&x',x''\in C,\quad0<\lambda<1
\end{aligned}
\tag{6.1}
$$

suy ra $x'=x''=v$. *Đỉnh* (vertex) là tên gọi khác của điểm cực biên; trên đa diện, đỉnh còn là điểm duy nhất đạt cực đại của một hàm tuyến tính nào đó trên $C$ (MIT OpenCourseWare 15.093J 2009, Bài giảng 2, slide 11, 16).
:::

Điều kiện $0<\lambda<1$ đòi $v$ nằm thật sự giữa $x'$ và $x''$; với $\lambda\in\{0,1\}$, (6.1) thỏa tầm thường khi chọn $x''=v$ hoặc $x'=v$. Để chứng minh $v$ không phải điểm cực biên, chỉ cần một cặp $x'\ne x''$ của $C$ và một $\lambda\in(0,1)$ thỏa (6.1).

Điểm cực biên là tính chất hình học của tập $C$, không phụ thuộc hàm mục tiêu. Ví dụ: $(30,0)$ là điểm cực biên của ngũ giác hộp hạt, và $z=60$ tại đó nằm giữa giá trị nhỏ nhất $0$ và giá trị lớn nhất $96$ của mục tiêu trên ngũ giác.

::: example Ví dụ 07.10 (Kiểm tra điểm cực biên trên ngũ giác hộp hạt)
**Dữ kiện.** Miền hộp hạt $P$: $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$. Ba điểm $v=(30,12)$, $(30,6)$, $(10,10)$.

**Điểm $(30,6)$.** $(30,6)=\tfrac12(30,0)+\tfrac12(30,12)$, với $(30,0)$ và $(30,12)$ khác nhau và thuộc $P$. Điểm này không phải điểm cực biên.

**Điểm $(10,10)$.** $(10,10)=\tfrac12(6,10)+\tfrac12(14,10)$. Hai điểm thuộc $P$: tại $(14,10)$, $14+20=34\le54$; tại $(6,10)$, $6+20=26\le54$. Điểm này không phải điểm cực biên.

**Điểm $v=(30,12)$.** Giả sử $v=\lambda x'+(1-\lambda)x''$ với $x',x''\in P$, $0<\lambda<1$.

- Tọa độ thứ nhất: $x_1'\le30$, $x_1''\le30$ và $\lambda x_1'+(1-\lambda)x_1''=30$. Nếu một trong hai số nhỏ hơn $30$, tổ hợp với hệ số dương nhỏ hơn $30$; vậy $x_1'=x_1''=30$.
- Ràng buộc giờ máy: $x_1'+2x_2'\le54$, $x_1''+2x_2''\le54$ và tổ hợp bằng $30+24=54$. Cùng lập luận cho $x_1'+2x_2'=x_1''+2x_2''=54$, nên $x_2'=x_2''=12$.

Vậy $x'=x''=v$, và $v$ là điểm cực biên.

**Kiểm tra lại.** Lập luận cho $v$ dùng đúng hai ràng buộc hoạt động có hàng $(1,0)$, $(1,2)$ độc lập; tại $(30,6)$ chỉ $x_1=30$ hoạt động.
:::

### 6.2. Tiêu chuẩn hạng của các ràng buộc hoạt động

Định nghĩa 07.8 đòi xét mọi cặp điểm của tập. Lập luận cho $v=(30,12)$ trong Ví dụ 07.10 gợi ý một phép kiểm tra khác: ràng buộc thỏa với dấu bằng tại $v$ cũng thỏa với dấu bằng tại hai điểm hai bên, và hai ràng buộc độc lập như vậy xác định một điểm duy nhất trong mặt phẳng.

::: definition Định nghĩa 07.9 (Ràng buộc hoạt động)
Cho đa diện $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với hàng $a_i^T$, $i=1,\ldots,m$, và $x\in P$. Ràng buộc thứ $i$ *hoạt động* (còn gọi là ràng buộc chặt; active constraint, binding constraint) tại $x$ nếu $a_i^Tx=b_i$. Tập chỉ số các ràng buộc hoạt động là

$$
\mathcal I(x)=\{i\mid a_i^Tx=b_i\}.
$$
:::

Ràng buộc không hoạt động có độ dư (slack) $b_i-a_i^Tx>0$; một bước đủ ngắn theo hướng bất kỳ giữ nó thỏa. Ràng buộc hoạt động thì không như vậy: mọi bước theo hướng $d$ với $a_i^Td>0$ đều vi phạm nó.

::: theorem Định lý 07.10 (Tiêu chuẩn hạng cho điểm cực biên) — chứng minh đầy đủ
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với hàng $a_1^T,\ldots,a_m^T$; $x\in P$.

**Kết luận.** $x$ là điểm cực biên của $P$ khi và chỉ khi họ $\{a_i\mid i\in\mathcal I(x)\}$ có hạng $n$, tức trong các ràng buộc hoạt động tại $x$ có $n$ ràng buộc với hàng độc lập tuyến tính.
:::

::: proof Chứng minh Định lý 07.10
**Lộ trình.** Bước 1 dùng tổ hợp lồi với hệ số dương để buộc hai điểm hai bên thỏa mọi ràng buộc hoạt động với dấu bằng; Bước 2 dựng hai điểm $x\pm\varepsilon d$ khi hạng nhỏ hơn $n$.

**Bước 1 (hạng $n$ kéo theo điểm cực biên).** Giả sử họ $\{a_i\mid i\in\mathcal I(x)\}$ có hạng $n$ và $x=\lambda x'+(1-\lambda)x''$ với $x',x''\in P$, $0<\lambda<1$. Với mỗi $i\in\mathcal I(x)$, hai bất đẳng thức $a_i^Tx'\le b_i$, $a_i^Tx''\le b_i$ và

$$
\begin{aligned}
\lambda a_i^Tx'+(1-\lambda)a_i^Tx''&=a_i^Tx\\
&=b_i .
\end{aligned}
$$

Nếu một trong hai số $a_i^Tx'$, $a_i^Tx''$ nhỏ hơn $b_i$, tổ hợp với hai hệ số dương nhỏ hơn $b_i$, mâu thuẫn. Vậy $x'$ và $x''$ cùng là nghiệm của hệ $\{a_i^T\zeta=b_i\mid i\in\mathcal I(x)\}$ với ẩn $\zeta\in\mathbb R^n$. Hệ này có hạng $n$ nên có nhiều nhất một nghiệm, và $x$ là một nghiệm, nên $x'=x''=x$.

**Bước 2 (hạng nhỏ hơn $n$ kéo theo không phải điểm cực biên).** Giả sử họ có hạng nhỏ hơn $n$. Theo Mệnh đề 00.8 (kết luận 3) áp dụng cho ma trận có các hàng $a_i^T$, $i\in\mathcal I(x)$, có $d\ne0$ với $a_i^Td=0$ cho mọi $i\in\mathcal I(x)$. Với $i\notin\mathcal I(x)$, độ dư $b_i-a_i^Tx$ dương; chọn $\varepsilon>0$ đủ nhỏ để $\varepsilon\lvert a_i^Td\rvert<b_i-a_i^Tx$ với mọi $i\notin\mathcal I(x)$, điều làm được vì chỉ có hữu hạn chỉ số. Khi đó $x\pm\varepsilon d\in P$:

- với $i\in\mathcal I(x)$: $a_i^T(x\pm\varepsilon d)=b_i$;
- với $i\notin\mathcal I(x)$: $a_i^T(x\pm\varepsilon d)\le a_i^Tx+\varepsilon\lvert a_i^Td\rvert<b_i$.

Vì $x=\tfrac12(x+\varepsilon d)+\tfrac12(x-\varepsilon d)$ với hai điểm khác nhau của $P$, $x$ không phải điểm cực biên. $\square$
:::

Định lý áp dụng cho mọi đa diện cho bởi hữu hạn phương trình và bất phương trình.

Một điểm có thể có nhiều hơn $n$ ràng buộc hoạt động. Ví dụ: miền $x_1+x_2\le100$, $3x_1+x_2\le180$, $x_2\le60$, $x\ge0$ có đỉnh $(40,60)$, nơi cả ba ràng buộc đầu hoạt động; định lý vẫn áp dụng vì chỉ cần hạng bằng $n=2$.

::: corollary Hệ quả 07.11 (Đa diện có hữu hạn điểm cực biên) — chứng minh đầy đủ
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với $m$ hàng.

**Kết luận.** Mỗi điểm cực biên của $P$ là nghiệm duy nhất của một hệ $a_i^Tx=b_i$, $i\in S$, với $S\subseteq\{1,\ldots,m\}$, $\lvert S\rvert=n$ và các hàng $a_i$, $i\in S$, độc lập tuyến tính. Do đó $P$ có nhiều nhất $\binom mn$ điểm cực biên.
:::

::: proof Chứng minh Hệ quả 07.11
**Lộ trình.** Mỗi điểm cực biên là nghiệm duy nhất của một hệ $n$ phương trình độc lập; đếm các hệ đó.

**Bước 1 (chọn hệ $n$ phương trình).** Với điểm cực biên $v$, Định lý 07.10 cho $n$ chỉ số hoạt động có hàng độc lập; gọi tập đó là $S_v$. Hệ $a_i^Tx=b_i$, $i\in S_v$, có ma trận vuông khả nghịch nên có nghiệm duy nhất, và $v$ là nghiệm đó.

**Bước 2 (đếm).** Hai điểm cực biên khác nhau không thể có cùng tập $S$, vì $S$ xác định nghiệm duy nhất. Vậy số điểm cực biên không vượt số tập con $n$ phần tử của $\{1,\ldots,m\}$, tức $\binom mn$. $\square$
:::

Cận $\binom mn$ chỉ khẳng định tính hữu hạn; với ngũ giác hộp hạt, $m=5$ hàng cho cận $\binom52=10$, trong khi có năm điểm cực biên.

::: example Ví dụ 07.11 (Tiêu chuẩn hạng trên ba điểm)
**Dữ kiện.** Miền hộp hạt viết thành năm hàng: (1) $x_1\le30$; (2) $x_2\le20$; (3) $x_1+2x_2\le54$; (4) $-x_1\le0$; (5) $-x_2\le0$; ở đây $n=2$.

**Điểm $(30,12)$.** Hàng hoạt động: (1), (3), với $a_1=(1,0)$, $a_3=(1,2)$ độc lập. Hạng $2=n$: điểm cực biên.

**Điểm $(30,6)$.** Chỉ hàng (1) hoạt động; hạng $1<2$: không phải điểm cực biên, khớp Ví dụ 07.10.

**Điểm $(30,20)$.** Hàng (1), (2) độc lập và thỏa với dấu bằng, nhưng $30+40=70>54$: điểm không thuộc $P$, nên định lý không áp dụng.

**Kiểm tra lại.** Mười cặp hàng cho tám giao điểm; năm giao điểm là năm đỉnh, còn ba giao điểm vi phạm một hàng: $(30,20)$ vi phạm (3), $(0,27)$ vi phạm (2), $(54,0)$ vi phạm (1).
:::

### 6.3. Đồng nhất giữa nghiệm cơ sở khả thi và điểm cực biên

Với dạng chuẩn, các phương trình $Ax=b$ luôn hoạt động, và ràng buộc $x_j\ge0$ hoạt động khi $x_j=0$. Định lý sau (MIT OpenCourseWare 15.093J 2009, Bài giảng 2, slide 16–17) nối điểm cực biên với nghiệm cơ sở khả thi và thêm một tiêu chuẩn chỉ dùng các cột ứng với thành phần dương.

::: theorem Định lý 07.12 (Điểm cực biên, nghiệm cơ sở khả thi và các cột dương) — chứng minh đầy đủ
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$ với $A\in\mathbb R^{m\times n}$, $\operatorname{rank}(A)=m$; $x\in P$. Đặt $\operatorname{supp}(x)=\{j\mid x_j>0\}$.

**Kết luận.** Ba khẳng định sau tương đương:

- (i) $x$ là điểm cực biên của $P$;
- (ii) $x$ là nghiệm cơ sở khả thi theo Định nghĩa 07.7;
- (iii) các cột $A_j$, $j\in \operatorname{supp}(x)$, độc lập tuyến tính.
:::

::: proof Chứng minh Định lý 07.12
**Lộ trình.** Chứng minh bốn chiều (iii) ⇒ (i), (i) ⇒ (iii), (ii) ⇒ (iii) và (iii) ⇒ (ii); chiều cuối dùng giả thiết hạng để bổ sung đủ $m$ cột.

**Bước 1 (khẳng định (iii) kéo theo (i)).** Giả sử các cột trên $\operatorname{supp}(x)$ độc lập và $x=\lambda x'+(1-\lambda)x''$ với $x',x''\in P$, $0<\lambda<1$. Với $j\notin \operatorname{supp}(x)$, $x_j=0$ trong khi $x_j',x_j''\ge0$ và tổ hợp với hệ số dương bằng $0$, nên $x_j'=x_j''=0$. Vector $x'-x''$ do đó chỉ có thể khác $0$ trên $\operatorname{supp}(x)$, và

$$
\begin{aligned}
&\sum_{j\in \operatorname{supp}(x)}(x_j'-x_j'')A_j\\
&\quad=A(x'-x'')=b-b=0 .
\end{aligned}
$$

Tính độc lập của các cột trên $\operatorname{supp}(x)$ buộc $x_j'=x_j''$ với mọi $j\in \operatorname{supp}(x)$, nên $x'=x''$, và do đó cả hai bằng $x$.

**Bước 2 (phủ định (iii) kéo theo phủ định (i)).** Giả sử các cột trên $\operatorname{supp}(x)$ phụ thuộc tuyến tính: có các số $d_j$, $j\in \operatorname{supp}(x)$, không đồng thời bằng $0$, với $\sum_{j\in \operatorname{supp}(x)}d_jA_j=0$. Đặt $d_j=0$ cho $j\notin \operatorname{supp}(x)$, được $d\in\mathbb R^n$, $d\ne0$, $Ad=0$. Chọn $\varepsilon>0$ với $\varepsilon\lvert d_j\rvert<x_j$ cho mọi $j\in \operatorname{supp}(x)$. Khi đó $x\pm\varepsilon d$ thỏa $A(x\pm\varepsilon d)=b$ và không âm, vì thành phần dương vẫn dương và thành phần bằng $0$ không đổi. Điểm $x$ là trung điểm của hai điểm khác nhau của $P$, nên không phải điểm cực biên.

**Bước 3 (khẳng định (ii) kéo theo (iii)).** Nếu $x$ là nghiệm cơ sở khả thi theo cơ sở $B$, thì $x_j=0$ ngoài $B$, nên $\operatorname{supp}(x)\subseteq B$. Các cột của $A_B$ độc lập vì $A_B$ khả nghịch, và một họ con của họ độc lập cũng độc lập.

**Bước 4 (khẳng định (iii) kéo theo (ii)).** Giả sử các cột trên $\operatorname{supp}(x)$ độc lập. Vì $\operatorname{rank}(A)=m$, các cột của $A$ sinh $\mathbb R^m$, nên bổ sung được các cột khác vào họ đó cho tới khi được $m$ cột độc lập; gọi tập chỉ số thu được là $B\supseteq \operatorname{supp}(x)$. Khi đó $A_B$ khả nghịch, $x_j=0$ với $j\in B^{\mathrm c}$ vì $B^{\mathrm c}\cap \operatorname{supp}(x)=\varnothing$, và $Ax=b$ thu về $A_Bx_B=b$, tức $x_B=A_B^{-1}b$. Vì $x\ge0$, đây là nghiệm cơ sở khả thi. $\square$
:::

::: corollary Hệ quả 07.13 (Số thành phần dương và số điểm cực biên của dạng chuẩn) — chứng minh đầy đủ
**Giả thiết.** Như Định lý 07.12.

**Kết luận.** Mỗi điểm cực biên của $P$ có nhiều nhất $m$ thành phần dương, và $P$ có nhiều nhất $\binom nm$ điểm cực biên.
:::

::: proof Chứng minh Hệ quả 07.13
**Lộ trình.** Đọc hai phép đếm từ khẳng định (iii) và (ii) của Định lý 07.12.

**Bước 1 (thành phần dương).** Theo khẳng định (iii) của Định lý 07.12, các cột trên $\operatorname{supp}(x)$ là các vector độc lập trong $\mathbb R^m$, nên có nhiều nhất $m$ cột.

**Bước 2 (số điểm cực biên).** Theo khẳng định (ii), mỗi điểm cực biên là nghiệm cơ sở khả thi của ít nhất một cơ sở, và mỗi cơ sở cho nhiều nhất một nghiệm cơ sở. Số cơ sở không vượt $\binom nm$. $\square$
:::

Một điểm có không quá $m$ thành phần dương chưa chắc là điểm cực biên; cần các cột tương ứng độc lập.

::: example Ví dụ 07.12 (Kiểm tra điểm cực biên bằng cột dương)
**Dữ kiện.** Hệ dạng chuẩn của bài toán hộp hạt, cột theo thứ tự $(x_1,x_2,s_1,s_2,s_3)$: $A_1=(1,0,1)^T$, $A_2=(0,1,2)^T$, $A_3=(1,0,0)^T$, $A_4=(0,1,0)^T$, $A_5=(0,0,1)^T$, $b=(30,20,54)^T$.

**Điểm $(30,12,0,8,0)$.** $\operatorname{supp}(x)=\{1,2,4\}$. Ma trận gồm ba cột $A_1,A_2,A_4$ có định thức $-2\ne0$, nên ba cột độc lập và điểm là điểm cực biên, ứng với đỉnh $(30,12)$ của ngũ giác.

**Điểm $(15,6,15,14,27)$.** Điểm này khả thi: $15+15=30$, $6+14=20$, $15+12+27=54$. Có năm thành phần dương, nhiều hơn $m=3$, nên theo Hệ quả 07.13 nó không phải điểm cực biên; về hình học, $(15,6)$ nằm bên trong ngũ giác.

**Kiểm tra lại.** Với $d=(1,0,-1,0,-1)$, $\bar Ad=(1-1,0,1-1)^T=0$, và $(15,6,15,14,27)$ là trung điểm của hai điểm khả thi $(16,6,14,14,26)$ và $(14,6,16,14,28)$.
:::

::: remark Nhận xét 07.14 (Tương ứng giữa cơ sở và điểm cực biên)
Theo Định lý 07.12, mỗi cơ sở khả thi cho một điểm cực biên và mỗi điểm cực biên có ít nhất một cơ sở; tương ứng là một-một khi không có suy biến. Khi suy biến, như $(1,0,0,0)$ với $\{1,2\}$ và $\{1,4\}$ ở Ví dụ 07.9, một thuật toán đổi cơ sở có thể đổi cơ sở mà không di chuyển.
:::

**Trong học máy.** Theo Hệ quả 07.13, khi chọn trọng số trộn $p\in\mathbb R^{100}$ cho $100$ nguồn dữ liệu dưới $\sum_jp_j=1$ và một ràng buộc ngân sách gán nhãn (thêm một biến bù, nên $m=2$), một nghiệm tối ưu là điểm cực biên (nghiệm đỉnh) có nhiều nhất hai thành phần dương, tính cả biến bù.

### 6.4. Sự tồn tại điểm cực biên

Nửa mặt phẳng $\{x\in\mathbb R^2\mid x_2\ge0\}$ không có điểm cực biên, vì điểm $(x_1,x_2)$ của nó là trung điểm của $(x_1-1,x_2)$ và $(x_1+1,x_2)$. Một cách trực quan, nửa mặt phẳng chứa trọn một đường thẳng nằm ngang. Để làm rõ khái niệm này, xem định nghĩa sau.

::: definition Định nghĩa 07.15 (Tập chứa đường thẳng)
Tập $C\subseteq\mathbb R^n$ *chứa một đường thẳng* (contains a line) nếu có $x\in C$ và $d\in\mathbb R^n$, $d\ne0$, sao cho $x+\theta d\in C$ với mọi $\theta\in\mathbb R$.
:::

Định nghĩa đòi cả hai chiều $\theta>0$ và $\theta<0$. Một tia, tức chỉ $\theta\ge0$, không đủ: góc phần tư $\{x\ge0\}$ chứa tia $\{(\theta,0)\mid\theta\ge0\}$ nhưng không chứa đường thẳng nào, và có điểm cực biên $(0,0)$.

Chứng minh định lý tồn tại lặp lại thao tác: đi theo một hướng giữ nguyên mọi ràng buộc hoạt động cho tới khi gặp một ràng buộc hoạt động mới.

::: lemma Bổ đề 07.16 (Bước tăng hạng) — chứng minh đầy đủ
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$, $x\in P$. Vector $d\in\mathbb R^n$ thỏa $a_i^Td=0$ với mọi $i\in\mathcal I(x)$, và có ít nhất một chỉ số $j$ với $a_j^Td>0$.

**Kết luận.** Đặt

$$
\theta^*=\min_{j:\ a_j^Td>0}\frac{b_j-a_j^Tx}{a_j^Td}.
\tag{6.2}
$$

Khi đó $\theta^*>0$, điểm $x'=x+\theta^*d$ thuộc $P$, mọi ràng buộc hoạt động tại $x$ vẫn hoạt động tại $x'$, và hạng của họ $\{a_i\mid i\in\mathcal I(x')\}$ lớn hơn hạng của họ $\{a_i\mid i\in\mathcal I(x)\}$ ít nhất $1$.
:::

::: proof Chứng minh Bổ đề 07.16
**Lộ trình.** Kiểm tra lần lượt $\theta^*>0$, tính khả thi của $x'$, các ràng buộc cũ, và ràng buộc mới đạt cực tiểu trong (6.2).

**Bước 1 ($\theta^*>0$).** Nếu $a_j^Td>0$ thì $j\notin\mathcal I(x)$, vì mọi chỉ số hoạt động có $a_i^Td=0$. Do đó $b_j-a_j^Tx>0$ cho mọi $j$ trong (6.2), và cực tiểu của hữu hạn số dương là số dương.

**Bước 2 ($x'\in P$).** Với $a_j^Td\le0$: $a_j^Tx'=a_j^Tx+\theta^*a_j^Td$, không vượt $a_j^Tx$, và $a_j^Tx\le b_j$. Với $a_j^Td>0$: theo cách chọn $\theta^*$, $\theta^*a_j^Td\le b_j-a_j^Tx$, nên $a_j^Tx'\le b_j$.

**Bước 3 (ràng buộc cũ vẫn hoạt động).** Với $i\in\mathcal I(x)$: $a_i^Tx'=a_i^Tx+\theta^*\cdot0=b_i$.

**Bước 4 (hạng tăng).** Gọi $j^*$ là chỉ số đạt cực tiểu trong (6.2); khi đó $a_{j^*}^Tx'=b_{j^*}$, nên $j^*\in\mathcal I(x')$. Vector $a_{j^*}$ không thuộc không gian sinh bởi $\{a_i\mid i\in\mathcal I(x)\}$: mọi vector trong không gian đó vuông góc với $d$, còn $a_{j^*}^Td>0$. Thêm một vector ngoài không gian sinh vào một họ làm hạng tăng $1$. $\square$
:::

Trong Bổ đề 07.16, $\theta^*$ là độ dài bước tới ràng buộc mới đầu tiên trở thành hoạt động, và (6.2) gọi là *phép thử tỉ số* (ratio test). Nếu mọi $a_j^Td\le0$ thì $x+\theta d\in P$ với mọi $\theta\ge0$ và không ràng buộc mới nào trở thành hoạt động.

::: theorem Định lý 07.17 (Tồn tại điểm cực biên) — chứng minh đầy đủ
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ khác rỗng.

**Kết luận.** Ba khẳng định sau tương đương:

- (i) $P$ có ít nhất một điểm cực biên;
- (ii) $P$ không chứa đường thẳng;
- (iii) $\operatorname{rank}(A)=n$.
:::

::: proof Chứng minh Định lý 07.17
**Lộ trình.** Một đường thẳng trong $P$ ứng với một $d\ne0$ có $Ad=0$; khi $\operatorname{rank}(A)=n$, lặp Bổ đề 07.16 cho tới khi hạng các ràng buộc hoạt động bằng $n$.

**Bước 1 (đường thẳng trong $P$ và hạng).** Nếu $x+\theta d\in P$ với mọi $\theta\in\mathbb R$ thì $a_i^Tx+\theta a_i^Td\le b_i$ với mọi $\theta$. Nếu $a_i^Td\ne0$, chọn $\theta$ cùng dấu với $a_i^Td$ và đủ lớn thì bất đẳng thức sai; vậy $Ad=0$. Ngược lại, nếu $Ad=0$ với $d\ne0$ thì $a_i^T(x'+\theta d)=a_i^Tx'\le b_i$ với mọi $x'\in P$, $\theta\in\mathbb R$, nên $P$ chứa đường thẳng qua mọi điểm của nó. Do đó $P$ chứa đường thẳng khi và chỉ khi có $d\ne0$ với $Ad=0$, tức $\operatorname{rank}(A)<n$. Điều này cho (ii) tương đương (iii).

**Bước 2 (khẳng định (i) kéo theo (iii)).** Nếu $v$ là điểm cực biên, Định lý 07.10 cho $n$ hàng hoạt động độc lập tại $v$, nên $\operatorname{rank}(A)\ge n$; hạng không vượt số cột $n$.

**Bước 3 (khẳng định (iii) kéo theo (i): một bước).** Giả sử $\operatorname{rank}(A)=n$. Lấy $x\in P$ và gọi $\rho$ là hạng của họ hàng hoạt động tại $x$. Nếu $\rho=n$, $x$ là điểm cực biên theo Định lý 07.10. Nếu $\rho<n$, chọn $d\ne0$ vuông góc với mọi hàng hoạt động; vì $\operatorname{rank}(A)=n$, vector $Ad$ khác $0$, và đổi $d$ thành $-d$ nếu cần để có một $a_j^Td>0$.

**Bước 4 (lặp).** Bổ đề 07.16 cho điểm $x'\in P$ với hạng hàng hoạt động ít nhất $\rho+1$. Lặp lại từ $x'$; hạng tăng sau mỗi lần và không vượt $n$, nên sau nhiều nhất $n$ lần thu được một điểm có hạng $n$, tức một điểm cực biên. $\square$
:::

Bước 3 và Bước 4 của chứng minh cho một thủ tục: từ một điểm khả thi bất kỳ, sau nhiều nhất $n$ bước tăng hạng, ta thu được một điểm cực biên. Giả thiết khác rỗng là cần thiết, vì tập rỗng không chứa đường thẳng mà cũng không có điểm cực biên.

::: corollary Hệ quả 07.18 (Hai lớp đa diện luôn có điểm cực biên) — chứng minh đầy đủ
**Giả thiết.** (a) $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$ khác rỗng. (b) $P=\{x\in\mathbb R^n\mid Ax\le b\}$ khác rỗng và bị chặn.

**Kết luận.** Trong cả hai trường hợp, $P$ có ít nhất một điểm cực biên. Ở trường hợp (a), nếu thêm $\operatorname{rank}(A)=m$, điểm cực biên đó là một nghiệm cơ sở khả thi.
:::

::: proof Chứng minh Hệ quả 07.18
**Lộ trình.** Kiểm tra khẳng định (iii) của Định lý 07.17 ở trường hợp (a) và khẳng định (ii) ở trường hợp (b).

**Bước 1 (trường hợp (a)).** Theo Mệnh đề 07.4(b), $P$ là đa diện với các hàng gồm $-I$. Ma trận của hệ chứa các hàng của $-I$, nên có hạng $n$, và khẳng định (iii) của Định lý 07.17 thỏa. Khi $\operatorname{rank}(A)=m$, Định lý 07.12 cho điểm cực biên đó là nghiệm cơ sở khả thi.

**Bước 2 (trường hợp (b)).** Nếu $P$ chứa đường $x+\theta d$ với $d\ne0$, thì $\lVert x+\theta d\rVert\ge\lvert\theta\rvert\lVert d\rVert-\lVert x\rVert\to\infty$, mâu thuẫn với tính bị chặn. Vậy khẳng định (ii) thỏa. $\square$
:::

Phần (a) là lý do dạng chuẩn được ưa dùng: mọi quy hoạch tuyến tính khả thi viết ở dạng chuẩn đều có đỉnh.

::: example Ví dụ 07.13 (Áp dụng tiêu chuẩn tồn tại và chạy bước tăng hạng)
**Dữ kiện.** Hai đa diện trong $\mathbb R^2$: nửa mặt phẳng $H=\{x\mid x_2\ge0\}$, viết thành một hàng $-x_2\le0$; và $P_1=\{x\mid x_1+x_2\ge1,\ x\ge0\}$, viết thành ba hàng (1) $-x_1-x_2\le-1$, (2) $-x_1\le0$, (3) $-x_2\le0$.

**Nửa mặt phẳng.** Ma trận một hàng $(0,-1)$ có hạng $1<2$, nên $H$ không có điểm cực biên theo Định lý 07.17. Hướng $d=(1,0)$ thỏa $Ad=0$ và cho đường thẳng nằm ngang qua mọi điểm.

**Đa diện $P_1$.** Ba hàng có hạng $2$, nên $P_1$ có điểm cực biên dù không bị chặn. Chạy Bước 3–4 của chứng minh từ $x=(2,3)$.

- Tại $(2,3)$ không có ràng buộc hoạt động, hạng $0$. Chọn $d=(-1,0)$: $a_1^Td=1$, $a_2^Td=1$. Theo (6.2), $\theta^*=\min\{\tfrac{-1+5}1,\tfrac{0+2}1\}=2$, cho $x'=(0,3)$, với hàng (2) hoạt động.
- Tại $(0,3)$, hạng $1$. Chọn $d=(0,-1)$, vuông góc với $a_2=(-1,0)$: $a_1^Td=1$, $a_3^Td=1$. Theo (6.2), $\theta^*=\min\{\tfrac{-1+3}1,\tfrac{0+3}1\}=2$, cho $x''=(0,1)$, với hàng (1), (2) hoạt động.

Hai hàng $(-1,-1)$, $(-1,0)$ độc lập, nên $(0,1)$ là điểm cực biên.

**Kiểm tra lại.** $(0,1)$ thỏa $0+1=1\ge1$ với dấu bằng và $x_1=0$. Điểm cực biên còn lại của $P_1$ là $(1,0)$, giao của hàng (1) và (3).
:::

::: exercise Bài tập 07.5 (Dải phẳng và điểm cực biên)
Cho $P_2=\{x\in\mathbb R^2\mid -x_1+x_2\le1,\ x_1-x_2\le1\}$.

- (a) Chứng minh $P_2$ chứa một đường thẳng và không có điểm cực biên, bằng khẳng định (ii) và (iii) của Định lý 07.17.
- (b) Thêm ràng buộc $x_1\ge0$, được $P_3$. Xác định mọi điểm cực biên của $P_3$ bằng Định lý 07.10.
:::

::: hint
Ở (a), tìm $d\ne0$ với $-d_1+d_2=0$ và $d_1-d_2=0$. Ở (b), xét ba cặp hàng của $P_3$.
:::

::: solution
**Câu (a).** Ma trận có hai hàng $(-1,1)$ và $(1,-1)$, hạng $1<2$. Hướng $d=(1,1)$ thỏa $Ad=0$, nên $(0,0)+\theta(1,1)\in P_2$ với mọi $\theta$. Theo Định lý 07.17, $P_2$ không có điểm cực biên.

**Câu (b).** $P_3$ có ba hàng: (1) $-x_1+x_2\le1$, (2) $x_1-x_2\le1$, (3) $-x_1\le0$.

- Cặp (1), (2): hai hàng song song, không có giao điểm duy nhất.
- Cặp (1), (3): $x_1=0$, $x_2=1$; kiểm tra (2): $0-1=-1\le1$. Điểm $(0,1)$ là điểm cực biên.
- Cặp (2), (3): $x_1=0$, $x_2=-1$; kiểm tra (1): $0-1=-1\le1$. Điểm $(0,-1)$ là điểm cực biên.

**Kiểm tra lại.** Tại $(0,1)$, hàng (1) và (3) hoạt động, với $(-1,1)$, $(-1,0)$ độc lập; tại $(0,-1)$, hàng (2) và (3) hoạt động, với $(1,-1)$, $(-1,0)$ độc lập.
:::

## 7. Kết cục, điểm cực biên tối ưu và thuật toán duyệt đỉnh kề

Các điểm cực biên tạo thành một tập ứng viên hữu hạn, tính được bằng đại số. Việc nối tập này với tính tối ưu cần giả thiết: bài toán cực đại $x_1$ trên $P_1=\{x\mid x_1+x_2\ge1,\ x\ge0\}$ có điểm cực biên nhưng không bị chặn.

### 7.1. Tập nghiệm tối ưu

Trên tam giác của ví dụ sau, điểm $(1,1)$ tối ưu nhưng không phải điểm cực biên.

![Tam giác khả thi với ba đỉnh (0,0), (2,0), (0,2); đường mức nét đứt z = 1 bên trong; đường mức z = 2 trùng cạnh nối (2,0) và (0,2), trên đó đánh dấu (1,1); mũi tên "tăng z" theo hướng (1,1).](img/lec-07/multiple-optima.svg)

::: example Ví dụ 07.14 (Cả một cạnh tối ưu)
**Dữ kiện.** Cực đại $z=x_1+x_2$ dưới $x_1+x_2\le2$, $x_1,x_2\ge0$.

**Điểm cực biên.** Miền là tam giác với ba điểm cực biên $(0,0)$, $(2,0)$, $(0,2)$; giá trị tại đó là $0$, $2$, $2$.

**Giá trị tối ưu.** Ràng buộc $x_1+x_2\le2$ cho $z\le2$, và $(2,0)$ đạt $2$. Vậy $z^*=2$, và tập nghiệm tối ưu là đoạn $\{x\mid x_1+x_2=2,\ x\ge0\}$.

**Một nghiệm không phải điểm cực biên.** $(1,1)$ thuộc đoạn này nên tối ưu, nhưng $(1,1)=\tfrac12(2,0)+\tfrac12(0,2)$ nên không phải điểm cực biên.

**Kiểm tra lại.** Điểm $(\tfrac12,\tfrac32)=\tfrac14(2,0)+\tfrac34(0,2)$ có $z=2$, cũng tối ưu và không phải điểm cực biên.
:::

Đường mức $z=2$ trùng một cạnh vì vector mục tiêu $c=(1,1)$ vuông góc với cạnh đó.

::: proposition Mệnh đề 07.19 (Tập nghiệm tối ưu) — chứng minh đầy đủ
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$, $c\in\mathbb R^n$, giá trị tối ưu $z^*=\sup_{x\in P}c^Tx$ hữu hạn.

**Kết luận.**

- (a) Tập nghiệm tối ưu $P^*=\{x\in P\mid c^Tx=z^*\}$ là một đa diện, do đó là tập lồi.
- (b) Nếu có hai nghiệm tối ưu khác nhau $x'$, $x''$ thì mọi điểm của đoạn nối chúng đều tối ưu; bài toán có vô số nghiệm tối ưu.
:::

::: proof Chứng minh Mệnh đề 07.19
**Lộ trình.** Viết $P^*$ bằng cách thêm một hàng $-c^Tx\le-z^*$ vào hệ của $P$.

**Bước 1 (phần (a)).** Vì $c^Tx\le z^*$ trên $P$, tập nghiệm viết được thành $P^*=\{x\mid Ax\le b,\ -c^Tx\le-z^*\}$: thêm một hàng vào $A$. Đó là một đa diện, lồi theo Mệnh đề 07.4(a).

**Bước 2 (phần (b)).** Với $\lambda\in[0,1]$, điểm $\lambda x'+(1-\lambda)x''$ thuộc $P^*$ theo (a). Các điểm này đôi một khác nhau khi $\lambda$ thay đổi, vì $x'\ne x''$. $\square$
:::

Theo phần (b), số nghiệm tối ưu của một quy hoạch tuyến tính là $0$, $1$ hoặc vô số; mục tiêu tuyến tính không lồi chặt, nên nghiệm duy nhất không được bảo đảm như ở Định lý 01.34.

### 7.2. Điểm cực biên tối ưu

Theo Ví dụ 07.14, phát biểu đúng chỉ có thể là "tồn tại một điểm cực biên tối ưu", và định lý sau (MIT OpenCourseWare 15.093J 2009, Bài giảng 2, slide 23) khẳng định điều đó.

::: theorem Định lý 07.20 (Điểm cực biên tối ưu) — chứng minh đầy đủ
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ thỏa (L2); $c\in\mathbb R^n$. Xét bài toán cực đại $c^Tx$ trên $P$.

**Kết luận.** Xảy ra đúng một trong hai trường hợp:

- (a) $z^*=+\infty$;
- (b) tồn tại một điểm cực biên $v^*$ của $P$ tối ưu, tức $c^Tv^*=z^*$.

Đặc biệt, nếu $z^*$ hữu hạn thì nó được đạt, và được đạt tại một điểm cực biên.
:::

::: proof Chứng minh Định lý 07.20
**Lộ trình.** Từ một điểm khả thi bất kỳ, đi theo các hướng không làm giảm mục tiêu tới một điểm cực biên; điểm cực biên có giá trị lớn nhất trong hữu hạn điểm cực biên là tối ưu.

**Bước 1 (một bước không làm giảm mục tiêu).** Theo Định lý 07.17, $\operatorname{rank}(A)=n$. Lấy $x\in P$ không phải điểm cực biên. Theo Định lý 07.10, họ hàng hoạt động tại $x$ có hạng nhỏ hơn $n$, nên có $d\ne0$ vuông góc với mọi hàng hoạt động. Đổi $d$ thành $-d$ nếu cần để $c^Td\ge0$. Xét hai trường hợp.

- Có chỉ số $j$ với $a_j^Td>0$. Bổ đề 07.16 cho $x'=x+\theta^*d\in P$ với hạng hàng hoạt động tăng ít nhất $1$, và $c^Tx'=c^Tx+\theta^*c^Td\ge c^Tx$.
- Mọi $a_j^Td\le0$. Khi đó $x+\theta d\in P$ với mọi $\theta\ge0$. Nếu $c^Td>0$, mục tiêu $c^Tx+\theta c^Td\to+\infty$, tức trường hợp (a). Nếu $c^Td=0$, thay $d$ bằng $-d$: vẫn $c^T(-d)=0$, và vì $Ad\ne0$ (hạng $n$) cùng mọi $a_j^Td\le0$, có $j$ với $a_j^T(-d)>0$; quay về trường hợp thứ nhất.

**Bước 2 (một điểm cực biên có giá trị không nhỏ hơn).** Giả sử $z^*<+\infty$. Lặp Bước 1 từ một $x\in P$ bất kỳ; trường hợp (a) không xảy ra, hạng hàng hoạt động tăng sau mỗi lần và không vượt $n$. Sau nhiều nhất $n$ lần, thu được một điểm cực biên $w(x)$ với $c^Tw(x)\ge c^Tx$.

**Bước 3 (điểm cực biên có giá trị lớn nhất là tối ưu).** Theo Hệ quả 07.11, $P$ có hữu hạn điểm cực biên, và theo giả thiết có ít nhất một. Chọn $v^*$ là điểm cực biên có $c^Tv^*$ lớn nhất trong số đó. Với mọi $x\in P$:

$$
c^Tx\le c^Tw(x)\le c^Tv^* .
$$

Bất đẳng thức đầu là kết luận của Bước 2, bất đẳng thức sau đúng vì $w(x)$ là một điểm cực biên. Vậy $c^Tv^*=z^*$. $\square$
:::

Theo Định lý 07.17, (L2) tương đương với $P\ne\varnothing$ và $\operatorname{rank}(A)=n$. Bước 3 của chứng minh cho ngay một cách tính giá trị tối ưu bằng liệt kê.

::: corollary Hệ quả 07.21 (Liệt kê điểm cực biên là đủ) — chứng minh đầy đủ
**Giả thiết.** Như Định lý 07.20, và (L3).

**Kết luận.** Gọi $V$ là tập điểm cực biên của $P$. Khi đó $z^*=\max_{v\in V}c^Tv$. Với bài toán dạng chuẩn (5.2) thỏa (L1), (L3) và có miền khả thi khác rỗng, $z^*$ bằng giá trị lớn nhất của $c^Tx$ trên các nghiệm cơ sở khả thi.
:::

::: proof Chứng minh Hệ quả 07.21
**Lộ trình.** Dùng Bước 3 của chứng minh Định lý 07.20, rồi Hệ quả 07.18(a) và Định lý 07.12 cho dạng chuẩn.

**Bước 1 (đa diện tổng quát).** Theo Bước 3 của chứng minh Định lý 07.20, điểm cực biên có giá trị lớn nhất là tối ưu.

**Bước 2 (dạng chuẩn).** Theo Hệ quả 07.18(a), đa diện dạng chuẩn khác rỗng có điểm cực biên; theo Định lý 07.12, các điểm cực biên là các nghiệm cơ sở khả thi. Áp dụng Bước 1. $\square$
:::

::: example Ví dụ 07.15 (Kiểm tra giả thiết và áp dụng trên bài toán hộp hạt)
**Dữ kiện.** Cực đại $2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$; năm điểm cực biên $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$ (Ví dụ 07.11).

**Kiểm tra giả thiết.**

1. Có điểm cực biên: năm hàng chứa $(1,0)$ và $(0,1)$, nên ma trận có hạng $2$; miền khác rỗng vì chứa $(0,0)$. Định lý 07.17 cho điểm cực biên.
2. Giá trị tối ưu hữu hạn: miền bị chặn ($0\le x_1\le30$, $0\le x_2\le20$), nên $2x_1+3x_2\le2\cdot30+3\cdot20=120$.

**Áp dụng Hệ quả 07.21.** Giá trị tại năm điểm cực biên là $0$, $60$, $96$, $88$, $60$; lớn nhất là $96$ tại $(30,12)$.

**Kiểm tra lại.** Cận trên $96$ của Ví dụ 07.5 khớp.
:::

Bộ giải dựa trên đỉnh trả về một nghiệm cơ sở khả thi tối ưu của bài toán dạng chuẩn mà nó giải. Trên hồi quy sai số tuyệt đối, các điểm cực biên tối ưu của (4.1) có cấu trúc sau.

::: proposition Mệnh đề 07.22 (Hồi quy $L_1$ có nghiệm nội suy $n$ mẫu) — chứng minh đầy đủ
**Giả thiết.** $M$ mẫu với $h_i\in\mathbb R^n$, $y_i\in\mathbb R$; các vector $h_1,\ldots,h_M$ sinh $\mathbb R^n$. Xét quy hoạch tuyến tính (4.1) theo biến $(x,t)\in\mathbb R^{n+M}$.

**Kết luận.**

- (a) Miền khả thi của (4.1) có điểm cực biên.
- (b) Bài toán (4.1) có một điểm cực biên tối ưu $(x^*,t^*)$.
- (c) Tại mọi điểm cực biên tối ưu, tập $Z=\{i\mid h_i^Tx^*=y_i\}$ các mẫu có phần dư bằng $0$ thỏa: các vector $h_i$, $i\in Z$, sinh $\mathbb R^n$. Đặc biệt có ít nhất $n$ mẫu được nội suy chính xác.
:::

::: proof Chứng minh Mệnh đề 07.22
**Lộ trình.** Tính các hướng vuông góc với các hàng của (4.1), rồi áp dụng Định lý 07.17, 07.20 và 07.10.

**Bước 1 (viết thành đa diện).** Mẫu $i$ cho hai hàng theo biến $(x,t)$: $h_i^Tx-t_i\le y_i$ và $-h_i^Tx-t_i\le-y_i$. Một hướng $(\delta,\tau)\in\mathbb R^{n+M}$ vuông góc với cả hai hàng khi $h_i^T\delta-\tau_i=0$ và $-h_i^T\delta-\tau_i=0$, tức $\tau_i=0$ và $h_i^T\delta=0$.

**Bước 2 (phần (a)).** Theo Bước 1, hướng vuông góc với mọi hàng thỏa $h_i^T\delta=0$ với mọi $i$, nên $\delta=0$ vì các $h_i$ sinh $\mathbb R^n$, và $\tau=0$. Ma trận ràng buộc có hạng $n+M$. Miền khác rỗng, chẳng hạn $x=0$, $t_i=\lvert y_i\rvert$. Định lý 07.17 cho điểm cực biên.

**Bước 3 (phần (b)).** Viết bài toán (4.1) thành cực đại $-\sum_it_i$. Vì $t_i\ge\lvert r_i\rvert\ge0$, mục tiêu không vượt $0$, nên $z^*\le0$ hữu hạn. Định lý 07.20 cho một điểm cực biên tối ưu.

**Bước 4 (phần (c)).** Tại điểm cực biên tối ưu $(x^*,t^*)$, Định lý 02.15(b) cho $t_i^*=\lvert r_i^*\rvert$, nên mỗi mẫu có ít nhất một hàng hoạt động, và có cả hai hàng hoạt động đúng khi $r_i^*=0$, tức $i\in Z$. Lấy $\delta$ với $h_i^T\delta=0$ cho mọi $i\in Z$, và đặt $\tau_i=0$ với $i\in Z$, $\tau_i=\pm h_i^T\delta$ theo hàng hoạt động với $i\notin Z$. Theo Bước 1, $(\delta,\tau)$ vuông góc với mọi hàng hoạt động, nên Định lý 07.10 và Mệnh đề 00.8 (kết luận 3) cho $(\delta,\tau)=0$. Vậy chỉ $\delta=0$ vuông góc với mọi $h_i$, $i\in Z$, và theo Mệnh đề 00.8 (kết luận 3), các $h_i$, $i\in Z$, sinh $\mathbb R^n$, nên có ít nhất $n$ vector. $\square$
:::

Ở Ví dụ 07.4, $x=2$ tối ưu với cả hai phần dư khác $0$, còn hai nghiệm đỉnh $x=1$, $x=3$ nội suy một mẫu. Với mô hình đường thẳng $h_i=(1,\nu_i)$ và ít nhất hai giá trị $\nu_i$ khác nhau, phần (c) nói: có một đường thẳng tối ưu theo sai số tuyệt đối đi qua ít nhất hai điểm dữ liệu có đầu vào $\nu_i$ khác nhau.

### 7.3. Bốn kết cục của quy hoạch tuyến tính

Mọi quy hoạch tuyến tính đưa được về dạng chuẩn, và dạng chuẩn khả thi luôn có điểm cực biên (Hệ quả 07.18). Ghép hai sự kiện đó với Định lý 07.20, ta được một phân loại cho mọi quy hoạch tuyến tính.

![Bốn ô: "Không khả thi" (hai nửa mặt phẳng x2 ≥ 2 và x2 ≤ 1 không giao nhau); "Mục tiêu không bị chặn" (miền mở theo hướng c); "Tối ưu duy nhất" (đường mức xa nhất chạm miền tại một đỉnh); "Nhiều nghiệm tối ưu" (đường mức xa nhất trùng một cạnh vuông góc với c).](img/lec-07/lp-four-statuses.svg)

Theo định lý sau, không còn khả năng nào khác ngoài bốn ô trên hình.

::: theorem Định lý 07.23 (Bốn kết cục) — chứng minh đầy đủ
**Giả thiết.** Một quy hoạch tuyến tính bất kỳ: cực đại $c^Tx$ trên $P=\{x\in\mathbb R^n\mid Ax\le b\}$, với $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$, $c\in\mathbb R^n$.

**Kết luận.** Bài toán rơi vào đúng một trong bốn kết cục (outcome):

1. không khả thi: $P=\varnothing$;
2. không bị chặn: $P\ne\varnothing$ và $z^*=+\infty$;
3. tối ưu duy nhất: $z^*$ hữu hạn, được đạt, và có đúng một nghiệm tối ưu;
4. nhiều nghiệm tối ưu: $z^*$ hữu hạn, được đạt, và có vô số nghiệm tối ưu.

Đặc biệt, mọi quy hoạch tuyến tính có giá trị tối ưu hữu hạn đều đạt giá trị đó.
:::

::: proof Chứng minh Định lý 07.23
**Lộ trình.** Đưa bài toán về dạng chuẩn, áp dụng Định lý 07.20 cho dạng chuẩn, rồi đọc nghiệm ngược về bài toán ban đầu.

**Bước 1 (bốn trường hợp loại trừ nhau).** Kết cục 1 và 2 tách nhau bởi $P$ rỗng hay không. Kết cục 3 và 4 có $z^*$ hữu hạn nên khác kết cục 2; chúng tách nhau bởi số nghiệm.

**Bước 2 (giá trị hữu hạn thì được đạt).** Giả sử $P\ne\varnothing$ và $z^*<+\infty$. Theo Mệnh đề 02.10(b) và 02.6(c), bài toán dạng chuẩn theo $\tilde x=(x^+,x^-,s)$ có miền $\tilde P$ khác rỗng (chứa $\varphi(x)$ với $x\in P$) và cùng giá trị tối ưu $z^*$. Theo Hệ quả 07.18(a), $\tilde P$ có điểm cực biên, nên theo Định lý 07.20 áp dụng cho $\tilde P$ (một đa diện theo Mệnh đề 07.4(b)), có $\tilde x^*\in\tilde P$ tối ưu, và theo Mệnh đề 02.10(b), $\psi(\tilde x^*)\in P$ tối ưu cho bài toán ban đầu.

**Bước 3 (số nghiệm).** Khi $z^*$ hữu hạn và được đạt, Mệnh đề 07.19(b) cho số nghiệm là $1$ hoặc vô số. Cùng với Bước 2, mọi bài toán khả thi có $z^*<+\infty$ thuộc kết cục 3 hoặc 4. $\square$
:::

Định lý 07.23 cho hai câu hỏi chẩn đoán: miền khả thi có rỗng không, và mục tiêu có bị chặn theo chiều tối ưu không.

::: example Ví dụ 07.16 (Bốn kết cục trên bài toán một biến)
**Dữ kiện.** Bốn bài toán với biến $x\in\mathbb R$.

1. Cực đại $x$ dưới $x\le0$ và $x\ge1$: miền rỗng, không khả thi.
2. Cực đại $x$ dưới $x\ge0$: miền khác rỗng và $x$ nhận giá trị lớn tùy ý, không bị chặn.
3. Cực đại $x$ dưới $0\le x\le1$: nghiệm duy nhất $x^*=1$, $z^*=1$.
4. Cực đại $0\cdot x$ dưới $0\le x\le1$: mọi điểm đều tối ưu với $z^*=0$, vô số nghiệm.

**Kiểm tra lại.** Ở bài 3, $x\le1$ cho $z\le1$ và $x=1$ khả thi. Ở bài 2, với mọi $K$, điểm $x=K+1$ khả thi và cho $z>K$.
:::

::: remark Nhận xét 07.24 (Khi bỏ giả thiết của Định lý 07.20 và Hệ quả 07.21)
**Khi bỏ giả thiết của Định lý 07.20 và Hệ quả 07.21.** Mỗi giả thiết bị bỏ đều có phản ví dụ.

- Bỏ (L2) trong Định lý 07.20: bài toán cực đại $-x_2$ trên nửa mặt phẳng $\{x_2\ge0\}$ có $z^*=0$, đạt trên cả đường $x_2=0$, nhưng miền không có điểm cực biên nào.
- Bỏ (L3) trong Hệ quả 07.21: bài toán cực đại $x_1$ trên $P_1=\{x_1+x_2\ge1,\ x\ge0\}$ có hai điểm cực biên $(1,0)$, $(0,1)$ với $\max_{v\in V}c^Tv=1$, nhưng $z^*=+\infty$.

**So với Nhận xét 02.8.** Một bài toán lồi tổng quát có thêm kết cục "bị chặn nhưng không đạt", chẳng hạn cực tiểu $\exp(x)$ trên $\mathbb R$; Định lý 07.23 loại kết cục đó cho quy hoạch tuyến tính nhờ Định lý 07.20.

**Ba nhầm lẫn.**

- "Miền không bị chặn thì mục tiêu không bị chặn": sai, như bài toán cực đại $-x$ trên $x\ge0$, có nghiệm $x^*=0$.
- "Nhiều nghiệm tối ưu nghĩa là hai nghiệm": sai, theo Mệnh đề 07.19(b) là vô số.
- "Làm tròn nghiệm của quy hoạch tuyến tính cho nghiệm của bài toán có biến nguyên": sai. Bài toán cực đại $x$ dưới $2x\le1$, $x\ge0$ có nghiệm $\tfrac12$; làm tròn lên cho $1$, vi phạm $2x\le1$, còn nghiệm nguyên là $0$.
:::

### 7.4. Đỉnh kề

Theo Hệ quả 07.21, ta có thể liệt kê mọi điểm cực biên, nhưng số điểm cực biên có thể lên tới $\binom nm$; với $n=40$ biến và $m=20$ phương trình, $\binom{40}{20}=137\,846\,528\,820\approx1{,}38\cdot10^{11}$. Do đó, ta cần tìm kiếm cục bộ (local search): từ một điểm cực biên, chỉ xét các điểm cực biên "bên cạnh".

Về mặt ý tưởng, một đỉnh trong $\mathbb R^n$ là nghiệm duy nhất của $n$ ràng buộc hoạt động độc lập, và hai đỉnh kề nhau khi chúng chung $n-1$ ràng buộc trong số đó.

::: definition Định nghĩa 07.25 (Điểm cực biên kề nhau, cạnh)
Cho đa diện $P\subseteq\mathbb R^n$. Hai điểm cực biên khác nhau $v$, $w$ của $P$ *kề nhau* (adjacent) nếu có $n-1$ ràng buộc với hàng độc lập tuyến tính cùng hoạt động tại $v$ và tại $w$. Tập các điểm của $P$ thỏa $n-1$ ràng buộc đó với dấu bằng chứa đoạn nối $v$ và $w$, và được gọi là một *cạnh* (edge) của $P$.
:::

Trong mặt phẳng, $n-1=1$: hai đỉnh kề nhau khi chung một đường biên hoạt động. Trên ngũ giác hộp hạt, hai đỉnh kề của $(30,0)$ là $(0,0)$ (chung $x_2=0$) và $(30,12)$ (chung $x_1=30$), còn $(14,20)$ không kề $(30,0)$.

![Ngũ giác hộp hạt; từ đỉnh (30,0), hai cạnh tô đậm trên x2 = 0 và x1 = 30 nối tới hai đỉnh kề (0,0) và (30,12); nét đứt nối tới (14,20) ghi "không kề".](img/lec-07/pentagon-adjacent.svg)

Với dạng chuẩn, đỉnh kề có một mô tả qua cơ sở.

::: proposition Mệnh đề 07.26 (Hai cơ sở khác nhau một chỉ số) — chứng minh đầy đủ
**Giả thiết.** Bài toán dạng chuẩn (5.2) với $\operatorname{rank}(A)=m$. Hai cơ sở $B$, $B'$ khác nhau đúng một chỉ số, tức $\lvert B\cap B'\rvert=m-1$, cho hai nghiệm cơ sở khả thi $v\ne w$.

**Kết luận.** $v$ và $w$ là hai điểm cực biên kề nhau theo Định nghĩa 07.25.
:::

::: proof Chứng minh Mệnh đề 07.26
**Lộ trình.** Đếm $n-1$ ràng buộc cùng hoạt động tại hai điểm, rồi tính hạng của chúng qua số chiều của không gian nghiệm.

**Bước 1 (hai điểm là điểm cực biên).** Theo Định lý 07.12, mỗi nghiệm cơ sở khả thi là điểm cực biên.

**Bước 2 (ràng buộc chung).** Tập $B\cup B'$ có $m+1$ phần tử. Cả $v$ và $w$ thỏa $m$ phương trình $Ax=b$, và có $x_{j'}=0$ với mọi $j'\notin B\cup B'$, vì mỗi điểm bằng $0$ ngoài cơ sở của nó. Tổng cộng có $m+(n-m-1)=n-1$ ràng buộc cùng hoạt động tại hai điểm.

**Bước 3 (hạng của các ràng buộc chung).** Hệ thuần nhất tương ứng là $Ay=0$, $y_{j'}=0$ với $j'\notin B\cup B'$. Nghiệm của nó tựa trên $B\cup B'$ và thỏa $\sum_{j'\in B\cup B'}y_{j'}A_{j'}=0$. Các cột trên $B\cup B'$ có hạng $m$ vì chứa $A_B$ khả nghịch, nên không gian nghiệm có chiều $(m+1)-m=1$.

**Bước 4 (kết luận).** Theo Mệnh đề 00.8 (kết luận 3), $n-1$ ràng buộc ở Bước 2 có hạng $n-1$, tức độc lập tuyến tính. Hai điểm cực biên khác nhau có chung $n-1$ ràng buộc hoạt động độc lập, nên kề nhau theo Định nghĩa 07.25. $\square$
:::

Hai điểm trong Mệnh đề 07.26 phải khác nhau, vì khi suy biến, hai cơ sở khác một chỉ số có thể cho cùng một điểm. Trên bài toán hộp hạt, hai cơ sở $\{s_1,s_2,s_3\}$ và $\{x_1,s_2,s_3\}$ cho hai đỉnh kề $(0,0)$, $(30,0)$.

### 7.5. Thuật toán duyệt đỉnh kề

Tìm kiếm cục bộ chuyển từ một điểm cực biên sang một đỉnh kề có giá trị mục tiêu lớn hơn, và dừng khi không còn đỉnh kề nào như vậy.

::: algorithm Thuật toán 07.27 (Duyệt đỉnh kề)
**Đầu vào.** Bài toán dạng chuẩn (5.2) thỏa (L1) và (L3); một nghiệm cơ sở khả thi xuất phát $v$.

**Các bước.**

1. Tìm một nghiệm cơ sở khả thi $w$ kề $v$ với $c^Tw>c^Tv$.
2. Nếu có, gán $v\leftarrow w$ và quay lại bước 1.
3. Nếu không có, dừng.

**Đầu ra.** Nghiệm cơ sở khả thi $v$ khi dừng.

**Điều kiện dừng.** Bước 3.

**Chi phí.** Bước 1 cần liệt kê các đỉnh kề của $v$ và giá trị của chúng. Mỗi lần lặp làm $c^Tv$ tăng chặt, nên không điểm cực biên nào được thăm hai lần, và số lần lặp không vượt số điểm cực biên, nhiều nhất $\binom nm$ (Hệ quả 07.13).
:::

Điều kiện ở bước 1 dùng bất đẳng thức chặt, vì với bất đẳng thức không chặt, thuật toán có thể dao động giữa hai đỉnh cùng giá trị.

![Ngũ giác hộp hạt với z tại năm đỉnh: (0,0) 0, (30,0) 60, (30,12) 96, (14,20) 88, (0,20) 60; hai đoạn tô đậm "bước 1" từ (0,0) tới (30,0) và "bước 2" từ (30,0) lên (30,12).](img/lec-07/conceptual-vertex-walk.svg)

::: example Ví dụ 07.17 (Thuật toán duyệt đỉnh kề trên bài toán hộp hạt)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$; năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$ có $z$ lần lượt $0$, $60$, $96$, $88$, $60$. Trong dạng chuẩn, mỗi đỉnh là một nghiệm cơ sở khả thi (Bài tập 07.4), và hai đỉnh chung một đường biên có hai cơ sở khác nhau một chỉ số, nên kề nhau theo Mệnh đề 07.26. Điểm xuất phát là $(0,0)$.

**Bước 1.** Hai đỉnh kề của $(0,0)$ là $(30,0)$, chung đường $x_2=0$, và $(0,20)$, chung đường $x_1=0$; cả hai có $z=60>0$. Chọn $(30,0)$.

**Bước 2.** Hai đỉnh kề của $(30,0)$ là $(0,0)$ với $z=0$ và $(30,12)$, chung đường $x_1=30$, với $z=96>60$. Chuyển sang $(30,12)$.

**Kiểm tra điều kiện dừng.** Hai đỉnh kề của $(30,12)$ là $(30,0)$ với $z=60$ và $(14,20)$ với $z=88$, cả hai nhỏ hơn $96$, nên thuật toán dừng; theo Hệ quả 07.21, $(30,12)$ tối ưu.

**Kiểm tra lại.** Giá trị $z^*=96$ khớp Ví dụ 07.15. Mỗi bước đổi đúng một biến cơ sở: $\{s_1,s_2,s_3\}\to\{x_1,s_2,s_3\}\to\{x_1,x_2,s_2\}$.
:::

Nếu bước 1 chọn $(0,20)$, đường đi là $(0,0)\to(0,20)\to(14,20)\to(30,12)$ với $z$ lần lượt $0$, $60$, $88$, $96$.

Trong ví dụ trên, đỉnh kề được đọc từ hình. Thuật toán 07.27 để ngỏ năm câu hỏi:

1. tính đỉnh kề và giá trị của nó bằng đại số ra sao, khi không có hình để đọc;
2. chọn đỉnh kề nào khi có nhiều đỉnh kề có giá trị lớn hơn;
3. làm gì khi suy biến làm bước đi có độ dài $0$, và tránh quay lại một cơ sở cũ thế nào;
4. tìm nghiệm cơ sở khả thi xuất phát thế nào khi $x=0$ không khả thi;
5. một đỉnh chưa tối ưu có luôn có một đỉnh kề với giá trị lớn hơn hay không, tức thuật toán có dừng đúng tại nghiệm tối ưu hay không.

::: exercise Bài tập 07.6 (Điểm cực biên và đỉnh kề trên một đa giác mới)
Xét bài toán cực đại $x_1+x_2$ dưới $x_1+2x_2\le4$, $3x_1+x_2\le6$, $x_1,x_2\ge0$.

- (a) Vẽ miền khả thi và xác định bốn đỉnh bằng tiêu chuẩn hạng.
- (b) Tính giá trị mục tiêu tại các đỉnh; xác định kết cục và nghiệm tối ưu.
- (c) Từ $(0,0)$, viết một đường đi qua đỉnh kề có giá trị tăng chặt và nêu lý do dừng.
- (d) Nêu định lý bảo đảm có điểm cực biên tối ưu và kiểm tra từng giả thiết.
:::

::: hint
Trên mỗi trục, ràng buộc hạn chế hơn cho đỉnh: $x_1\le2$ trên trục $x_1$, $x_2\le2$ trên trục $x_2$.
:::

::: solution
**Câu (a).** Trên hai trục, hai đỉnh là $(2,0)$ và $(0,2)$. Giao của hai đường chéo: từ $x_2=6-3x_1$ và $x_1+2(6-3x_1)=4$ được $5x_1=8$, tức $x_1=1{,}6$ và $x_2=1{,}2$. Bốn đỉnh là $(0,0)$, $(2,0)$, $(1{,}6;\,1{,}2)$, $(0,2)$, mỗi đỉnh có hai hàng hoạt động độc lập.

**Câu (b).** Giá trị lần lượt $0$, $2$, $2{,}8$, $2$. Miền bị chặn và khác rỗng, nên theo Hệ quả 07.21, $z^*=2{,}8$ tại $(1{,}6;\,1{,}2)$. Kết cục là tối ưu duy nhất: với $\mu_1=\tfrac25$, $\mu_2=\tfrac15$ giải từ $\mu_1+3\mu_2=1$, $2\mu_1+\mu_2=1$,

$$
\begin{aligned}
x_1+x_2&=\tfrac25(x_1+2x_2)\\
&\quad+\tfrac15(3x_1+x_2)\\
&\le\tfrac25\cdot4+\tfrac15\cdot6\\
&=2{,}8,
\end{aligned}
$$

và dấu bằng chỉ khi cả hai ràng buộc chéo hoạt động, tức chỉ tại $(1{,}6;\,1{,}2)$.

**Câu (c).** Đường $(0,0)\to(2,0)\to(1{,}6;\,1{,}2)$ với giá trị $0\to2\to2{,}8$; tại $(1{,}6;\,1{,}2)$, hai đỉnh kề đều cho $2<2{,}8$, nên thuật toán dừng. Đường qua $(0,2)$ cũng hợp lệ.

**Câu (d).** Định lý 07.20 cần (L2), và (L3) loại kết cục (a).

1. Có điểm cực biên: miền khác rỗng (chứa $(0,0)$), và các hàng $-x_1\le0$, $-x_2\le0$ cho hạng $2$, nên theo Định lý 07.17 có điểm cực biên.
2. Giá trị hữu hạn: $0\le x_1\le2$ và $0\le x_2\le2$, nên $z\le4$.

**Kiểm tra lại.** Tại $(1{,}6;\,1{,}2)$: $1{,}6+2{,}4=4$ và $4{,}8+1{,}2=6$. Hai hệ số: $\tfrac25+\tfrac35=1$ và $\tfrac45+\tfrac15=1$.
:::

::: exercise Bài tập 07.7 (Đổi lợi ích của bài toán hộp hạt)
Miền khả thi $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$, với năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$. Mục tiêu mới: cực đại $2x_1+4x_2$.

- (a) Tính $z$ tại năm đỉnh; xác định kết cục và tập nghiệm tối ưu.
- (b) Nêu định lý bảo đảm có điểm cực biên tối ưu và kiểm tra giả thiết.
- (c) Chạy Thuật toán 07.27 từ $(0,0)$ theo hai đường khác nhau; xác định đỉnh dừng của mỗi đường.
:::

::: hint
So sánh vector $(2,4)$ với hàng $(1,2)$ của ràng buộc giờ máy.
:::

::: solution
**Câu (a).** Giá trị tại năm đỉnh: $0$; $60$; $2\cdot30+4\cdot12=108$; $2\cdot14+4\cdot20=108$; $80$. Vì $2x_1+4x_2=2(x_1+2x_2)\le108$, tập nghiệm tối ưu là $\{x\mid x_1+2x_2=54,\ 14\le x_1\le30\}$, cạnh nối $(14,20)$ và $(30,12)$: kết cục nhiều nghiệm tối ưu.

![Ngũ giác hộp hạt; đường mức 2x1 + 4x2 = 108 trùng đường giờ máy; cạnh tối ưu nối (30,12) và (14,20) tô đậm, có trung điểm (22,16); mũi tên c = (2,4) vuông góc với cạnh.](img/lec-07/multiple-optima-boxes.svg)

**Câu (b).** Định lý 07.20 cần (L2), và (L3) loại kết cục (a): miền khác rỗng, có điểm cực biên (hạng $2$), bị chặn nên $z\le2\cdot30+4\cdot20=140$; cả hai điều kiện thỏa.

**Câu (c).**

- Đường thứ nhất: $(0,0)\to(30,0)\to(30,12)$ với $z$: $0\to60\to108$. Tại $(30,12)$, đỉnh kề $(14,20)$ cũng cho $108$, không lớn hơn chặt, nên thuật toán dừng tại $(30,12)$.
- Đường thứ hai: $(0,0)\to(0,20)\to(14,20)$ với $z$: $0\to80\to108$. Tại $(14,20)$, đỉnh kề $(30,12)$ không có giá trị lớn hơn chặt, nên thuật toán dừng tại $(14,20)$.

Thuật toán trả về một điểm cực biên tối ưu, không trả về cả cạnh.

**Kiểm tra lại.** Trung điểm $(22,16)$ của cạnh tối ưu: $22+32=54$, $z=44+64=108$, và $16\le20$.
:::

## 8. Phương pháp đơn hình

Ở Ví dụ 07.17, các cạnh và giá trị ở đầu kia được đọc từ hình; khi bài toán có bốn mươi biến, chúng phải được tính. *Phương pháp đơn hình* (simplex method), do Dantzig đề xuất, trả lời năm câu hỏi sau Ví dụ 07.17 bằng phép tính trên cơ sở.

Trong cả mục, bài toán có dạng chuẩn (5.2) thỏa (L1), và với một cơ sở $B$, $c_B\in\mathbb R^m$ gồm các $c_i$, $i\in B$, xếp theo thứ tự các cột của $A_B$.

### 8.1. Hướng cơ sở, chi phí rút gọn và điều kiện tối ưu

Muốn rời một đỉnh mà vẫn ở trên một cạnh, ta tăng đúng một biến ngoài cơ sở, giữ các biến ngoài cơ sở khác bằng $0$, và để các biến cơ sở tự điều chỉnh sao cho các phương trình vẫn đúng.

::: example Ví dụ 07.18 (Tăng một biến ngoài cơ sở tại đỉnh $(14,20)$ của bài toán hộp hạt)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm, thứ tự biến $(x_1,x_2,s_1,s_2,s_3)$. Đỉnh $(14,20)$ là nghiệm cơ sở khả thi $(14,20,16,0,0)$ với cơ sở $\{x_1,x_2,s_1\}$ và $z=88$; hai biến ngoài cơ sở là $s_2$, $s_3$.

**Biểu diễn các biến cơ sở.** Giải ba phương trình theo $x_1$, $x_2$, $s_1$:

- phương trình thứ hai cho $x_2=20-s_2$;
- phương trình thứ ba cho $x_1=54-2x_2-s_3=14+2s_2-s_3$;
- phương trình thứ nhất cho $s_1=30-x_1=16-2s_2+s_3$.

**Tăng $s_2$ thêm $\theta\ge0$, giữ $s_3=0$.** Thế vào ba biểu diễn trên:

$$
\begin{aligned}
x_1&=14+2\theta,\\
x_2&=20-\theta,\\
s_1&=16-2\theta .
\end{aligned}
$$

Mục tiêu thành $z=2(14+2\theta)+3(20-\theta)=88+\theta$: mỗi đơn vị $s_2$ làm $z$ tăng $1$.

**Độ dài bước.** Điều kiện $x_2\ge0$ cho $\theta\le20$, điều kiện $s_1\ge0$ cho $\theta\le8$, còn $x_1$ tăng nên không chặn $\theta$. Vậy $\theta\le8$. Tại $\theta=8$, điểm là $(30,12,0,8,0)$, tức đỉnh $(30,12)$, với $z=96$.

**Tăng $s_3$ thêm $\theta$, giữ $s_2=0$.** Ba biểu diễn cho $x_1=14-\theta$, $x_2=20$, $s_1=16+\theta$, và $z=2(14-\theta)+60=88-2\theta$: mục tiêu giảm.

**Kiểm tra lại.** Tại $(30,12,0,8,0)$: $30+0=30$, $12+8=20$, $30+24+0=54$. Giá trị $2\cdot30+3\cdot12=96$ khớp $88+8$.
:::

![Ngũ giác hộp hạt; tại đỉnh (14,20), z = 88, cơ sở x1, x2, s1. Mũi tên dọc cạnh xiên tới (30,12) ghi "tăng s2, z tăng 1 mỗi đơn vị", dừng khi s1 = 0 tại θ = 8; mũi tên dọc cạnh trên tới (0,20) ghi "tăng s3, z giảm 2 mỗi đơn vị".](img/lec-07/reduced-cost-edge.svg)

Một cách trực quan, mỗi biến ngoài cơ sở cho một cạnh rời khỏi đỉnh, và hệ số của $\theta$ trong $z$ là tốc độ thay đổi của mục tiêu dọc cạnh đó: tăng $s_2$ là đi dọc đường giờ máy với tốc độ $+1$, tăng $s_3$ là đi dọc đường $x_2=20$ với tốc độ $-2$.

::: definition Định nghĩa 07.28 (Hướng cơ sở, chi phí rút gọn)
Cho bài toán dạng chuẩn (5.2), một cơ sở $B$ và $j\in B^{\mathrm c}$. *Hướng cơ sở* (basic direction) $d^j\in\mathbb R^n$ có các thành phần

$$
\begin{aligned}
&d^j_j=1,\\
&d^j_{j'}=0\ \ (j'\in B^{\mathrm c},\ j'\ne j),\\
&d^j_B=-A_B^{-1}A_j .
\end{aligned}
\tag{8.1}
$$

*Chi phí rút gọn* (reduced cost) của biến $j$ là

$$
\begin{aligned}
\bar c_j&=c^Td^j\\
&=c_j-c_B^TA_B^{-1}A_j .
\end{aligned}
\tag{8.2}
$$
:::

Theo (8.1), hướng $d^j$ tăng $x_j$ một đơn vị, giữ các biến ngoài cơ sở khác bằng $0$, và có $Ad^j=A_Bd^j_B+A_j=0$, nên $A(x+\theta d^j)=b$ với mọi $\theta$. Theo (8.2), $\bar c_j$ là lợi ích trực tiếp $c_j$ trừ phần lợi ích thay đổi do điều chỉnh các biến cơ sở; công thức thứ hai của (8.2) cho $\bar c_i=0$ với $i\in B$.

Với bài toán cực đại, biến $x_j$ đáng đưa vào cơ sở khi $\bar c_j>0$.

Trong Ví dụ 07.18, $d^{s_2}=(2,-1,-2,1,0)$ và $\bar c_{s_2}=2\cdot2+3\cdot(-1)=1$; theo công thức thứ hai của (8.2), với $c_B=(2,3,0)$, $\bar c_{s_2}=0-(2\cdot(-2)+3\cdot1)=1$. Nhầm lẫn thường gặp là đồng nhất $\bar c_j$ với $c_j$: $c_{s_2}=0$ nhưng $\bar c_{s_2}=1$, vì tăng $s_2$ kéo theo tăng $x_1$.

Điều kiện tối ưu sau theo MIT OpenCourseWare 15.093J (2009, Bài giảng 3, slide 4–7), viết lại cho bài toán cực đại.

::: proposition Mệnh đề 07.29 (Điều kiện tối ưu theo chi phí rút gọn) — chứng minh đầy đủ
**Giả thiết.** Bài toán dạng chuẩn (5.2); $x$ là nghiệm cơ sở khả thi với cơ sở $B$.

**Kết luận.**

- (a) Với mọi $x'\in P$: $x'-x=\sum_{j\in B^{\mathrm c}}x'_j\,d^j$, và do đó

$$
c^Tx'-c^Tx=\sum_{j\in B^{\mathrm c}}x'_j\,\bar c_j .
$$

- (b) Nếu $\bar c_j\le0$ với mọi $j\in B^{\mathrm c}$ thì $x$ là nghiệm tối ưu.
- (c) Nếu $x$ không suy biến và là nghiệm tối ưu thì $\bar c_j\le0$ với mọi $j\in B^{\mathrm c}$.
:::

::: proof Chứng minh Mệnh đề 07.29
**Lộ trình.** Phân tích $x'-x$ theo các hướng cơ sở, nhân với $c^T$, rồi xét dấu từng số hạng.

**Bước 1 (phân tích $x'-x$).** Đặt $d=x'-x$. Ta có chuỗi quan hệ

$$
\begin{aligned}
Ad&=Ax'-Ax=b-b=0,\\
A_Bd_B&=-\sum_{j\in B^{\mathrm c}}d_jA_j,\\
d_B&=-\sum_{j\in B^{\mathrm c}}d_jA_B^{-1}A_j .
\end{aligned}
$$

Ở đây $Ad=0$ vì $x,x'\in P$; hai quan hệ sau tách $Ad$ theo các cột cơ sở và ngoài cơ sở, rồi nhân trái với $A_B^{-1}$. Với $j\in B^{\mathrm c}$, $x_j=0$ nên $d_j=x'_j$. So từng khối với (8.1): $d=\sum_{j\in B^{\mathrm c}}x'_jd^j$.

**Bước 2 (giá trị).** Nhân với $c^T$ và dùng (8.2):

$$
c^Tx'-c^Tx=\sum_{j\in B^{\mathrm c}}x'_j\bar c_j .
$$

**Bước 3 (phần (b)).** Với $x'\in P$, mọi $x'_j\ge0$; nếu mọi $\bar c_j\le0$ thì tổng ở Bước 2 không dương, nên $c^Tx'\le c^Tx$.

**Bước 4 (phần (c)).** Giả sử có $j\in B^{\mathrm c}$ với $\bar c_j>0$. Vì $x$ không suy biến, $x_i>0$ với mọi $i\in B$. Chọn $\theta>0$ đủ nhỏ để $x_i+\theta d^j_i>0$ với mọi $i\in B$; điều này làm được vì chỉ có hữu hạn chỉ số $i$. Khi đó $x+\theta d^j\ge0$, $A(x+\theta d^j)=b$, nên $x+\theta d^j\in P$, và $c^T(x+\theta d^j)=c^Tx+\theta\bar c_j>c^Tx$, trái với tính tối ưu của $x$. $\square$
:::

Theo phần (a), chỉ cần kiểm tra $n-m$ số $\bar c_j$ thay cho vô số hướng. Phần (c) cần giả thiết không suy biến: nếu một biến cơ sở $x_i$ bằng $0$ và $d^j_i<0$, mọi $\theta>0$ làm $x_i$ âm, nên $x$ có thể đã tối ưu dù $\bar c_j>0$.

::: example Ví dụ 07.19 (Kiểm tra tối ưu tại hai đỉnh của bài toán hộp hạt)
**Dữ kiện.** Dạng chuẩn hộp hạt: cực đại $2x_1+3x_2$ (biến bù có hệ số $0$), $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm, thứ tự $(x_1,x_2,s_1,s_2,s_3)$.

**Tại $(0,0)$.** Cơ sở $B=\{s_1,s_2,s_3\}$, $A_B=I$, $c_B=0$, nghiệm $(0,0,30,20,54)$ không suy biến. Theo (8.1), $d^{x_1}=(1,0,-1,0,-1)$ và $d^{x_2}=(0,1,0,-1,-2)$; theo (8.2), $\bar c_{x_1}=2$ và $\bar c_{x_2}=3$. Có chi phí rút gọn dương tại một đỉnh không suy biến, nên theo Mệnh đề 07.29(c), $(0,0)$ chưa tối ưu.

**Tại $(30,12)$.** Cơ sở $\{x_1,x_2,s_2\}$, nghiệm $(30,12,0,8,0)$, hai biến ngoài cơ sở $s_1$, $s_3$. Giải ba phương trình theo các biến cơ sở:

- phương trình thứ nhất cho $x_1=30-s_1$;
- phương trình thứ ba cho $x_2=\tfrac12(54-x_1-s_3)=12+\tfrac12s_1-\tfrac12s_3$;
- phương trình thứ hai cho $s_2=20-x_2=8-\tfrac12s_1+\tfrac12s_3$.

Đọc hệ số của $s_1$ và $s_3$: $d^{s_1}=(-1,\tfrac12,1,-\tfrac12,0)$ và $d^{s_3}=(0,-\tfrac12,0,\tfrac12,1)$. Do đó $\bar c_{s_1}=2\cdot(-1)+3\cdot\tfrac12=-\tfrac12$ và $\bar c_{s_3}=3\cdot(-\tfrac12)=-\tfrac32$. Cả hai âm, nên theo Mệnh đề 07.29(b), $(30,12)$ tối ưu với $z^*=96$.

**Kiểm tra lại.** $Ad^{s_1}=(-1+1,\ \tfrac12-\tfrac12,\ -1+1)=0$. Hai số $-\bar c_{s_1}=\tfrac12$ và $-\bar c_{s_3}=\tfrac32$ là hai hệ số nhân của Ví dụ 07.5.
:::

Theo dòng kiểm tra của Ví dụ 07.19, chi phí rút gọn của các biến bù ngoài cơ sở, đổi dấu, là các nhân tử của chứng nhận cận trên trong Mệnh đề 02.11 (Mệnh đề 03.11), nên Mệnh đề 07.29(b) cho luôn một chứng nhận tối ưu mà không cần biết trước các ràng buộc hoạt động.

### 8.2. Phép thử tỉ số, bước xoay và tính không bị chặn

Trong Ví dụ 07.18, dọc $d^{s_2}$ hai biến cơ sở giảm: $x_2=20-\theta$ và $s_1=16-2\theta$, cho hai cận $20$ và $8$; độ dài bước là cận nhỏ nhất, $8$, đạt tại $s_1$, nên $s_2$ thay $s_1$ trong cơ sở và cơ sở mới $\{x_1,x_2,s_2\}$ là cơ sở của $(30,12)$. Nếu $\bar c_j>0$ và không có biến cơ sở nào giảm dọc $d^j$, mục tiêu tăng không bị chặn.

::: proposition Mệnh đề 07.30 (Phép thử tỉ số, bước xoay và tính không bị chặn) — chứng minh đầy đủ
**Giả thiết.** Bài toán dạng chuẩn (5.2) với $\operatorname{rank}(A)=m$; $x$ là nghiệm cơ sở khả thi với cơ sở $B$; $j\in B^{\mathrm c}$ có $\bar c_j>0$; $d^j$ là hướng cơ sở (8.1).

**Kết luận.**

- (a) Nếu $d^j_i\ge0$ với mọi $i\in B$, thì $x+\theta d^j\in P$ với mọi $\theta\ge0$ và $c^T(x+\theta d^j)=c^Tx+\theta\bar c_j\to+\infty$ khi $\theta\to+\infty$: bài toán không bị chặn.
- (b) Nếu có $i\in B$ với $d^j_i<0$, đặt

$$
\theta^*=\min_{i\in B,\ d^j_i<0}\frac{x_i}{-d^j_i}
\tag{8.3}
$$

và gọi $l\in B$ là một chỉ số đạt cực tiểu. Khi đó $B'=(B\setminus\{l\})\cup\{j\}$ là một cơ sở, $w=x+\theta^*d^j$ là nghiệm cơ sở khả thi ứng với $B'$, và $c^Tw=c^Tx+\theta^*\bar c_j\ge c^Tx$, với dấu bằng khi và chỉ khi $\theta^*=0$.

Phép tính (8.3) là phép thử tỉ số (6.2) viết cho dạng chuẩn; phép chuyển từ $B$ sang $B'$ gọi là *bước xoay* (pivot), với $x_j$ là *biến vào* (entering variable) và $x_l$ là *biến ra* (leaving variable).
:::

::: proof Chứng minh Mệnh đề 07.30
**Lộ trình.** Hướng $d^j$ giữ mọi phương trình; phần (a) kiểm tra dấu dọc tia, phần (b) kiểm tra tính khả thi của $w$, tính khả nghịch của $A_{B'}$ và giá trị mục tiêu.

**Bước 1 (phương trình được giữ).** Theo (8.1), $Ad^j=A_Bd^j_B+A_j=-A_j+A_j=0$, nên $A(x+\theta d^j)=b$ với mọi $\theta$.

**Bước 2 (phần (a)).** Với $\theta\ge0$, thành phần cơ sở $x_i+\theta d^j_i\ge x_i\ge0$ vì $d^j_i\ge0$; thành phần thứ $j$ bằng $\theta\ge0$; các thành phần ngoài cơ sở khác bằng $0$. Vậy $x+\theta d^j\in P$, và theo (8.2), $c^T(x+\theta d^j)=c^Tx+\theta\bar c_j$, tăng không bị chặn vì $\bar c_j>0$.

**Bước 3 ($w$ khả thi và $w_l=0$).** Vì $x_i\ge0$ với mọi $i$, ta có $\theta^*\ge0$. Với $i\in B$ và $d^j_i\ge0$, $w_i\ge x_i\ge0$. Với $i\in B$ và $d^j_i<0$, định nghĩa (8.3) cho $\theta^*\le x_i/(-d^j_i)$, tức $w_i=x_i+\theta^*d^j_i\ge0$, với dấu bằng tại $i=l$. Ngoài ra $w_j=\theta^*\ge0$ và các thành phần ngoài cơ sở khác bằng $0$. Cùng với Bước 1, $w\in P$.

**Bước 4 ($B'$ là cơ sở).** Đặt $\alpha=A_B^{-1}A_j=-d^j_B$, nên $A_j=\sum_{i\in B}\alpha_iA_i$ và $\alpha_l=-d^j_l>0$. Giả sử $\sum_{i\in B\setminus\{l\}}\gamma_iA_i+\delta A_j=0$. Thế biểu diễn của $A_j$ vào, ta được

$$
\sum_{i\in B\setminus\{l\}}(\gamma_i+\delta\alpha_i)A_i+\delta\alpha_lA_l=0 .
$$

Các cột $A_i$, $i\in B$, độc lập tuyến tính, nên $\delta\alpha_l=0$, kéo theo $\delta=0$, rồi $\gamma_i=0$ với mọi $i$. Vậy $m$ cột của $A_{B'}$ độc lập và $A_{B'}$ khả nghịch.

**Bước 5 ($w$ là nghiệm cơ sở của $B'$).** Theo Bước 3, $w_k=0$ với mọi $k\notin B'$. Hệ $A_{B'}w_{B'}=b$ có nghiệm duy nhất vì $A_{B'}$ khả nghịch, nên $w$ là nghiệm cơ sở (5.3) ứng với $B'$; nó khả thi theo Bước 3.

**Bước 6 (giá trị).** Theo (8.2), $c^Tw=c^Tx+\theta^*\bar c_j$. Vì $\bar c_j>0$ và $\theta^*\ge0$, $c^Tw\ge c^Tx$, với dấu bằng khi và chỉ khi $\theta^*=0$. $\square$
:::

Phần (a) cho một chứng nhận không bị chặn bằng đại số: một hướng $d^j$ với $Ad^j=0$, $d^j\ge0$ và $c^Td^j>0$. Khi $\theta^*>0$, theo Mệnh đề 07.26, $w$ là đỉnh kề của $x$; khi $x$ suy biến có thể xảy ra $\theta^*=0$, gọi là *bước xoay suy biến* (degenerate pivot): cơ sở đổi mà điểm đứng yên.

::: example Ví dụ 07.20 (Phát hiện mục tiêu không bị chặn)
**Dữ kiện.** Cực đại $z=x_1+x_2$ dưới $-x_1+x_2\le1$, $x_1-2x_2\le2$, $x_1,x_2\ge0$. Dạng chuẩn: $-x_1+x_2+s_1=1$, $x_1-2x_2+s_2=2$, thứ tự $(x_1,x_2,s_1,s_2)$. Xuất phát từ $(0,0)$ với $B=\{s_1,s_2\}$, $A_B=I$, $c_B=0$.

**Bước 1.** $\bar c_{x_1}=\bar c_{x_2}=1$; chọn $x_1$, chỉ số nhỏ hơn. Ta có $s_1=1+x_1$ và $s_2=2-x_1$, nên $d^{x_1}=(1,0,1,-1)$. Chỉ $s_2$ giảm, và (8.3) cho $\theta^*=\tfrac21=2$, $l=s_2$. Điểm mới $(2,0)$ với $s_1=3$, $z=2$, cơ sở $\{s_1,x_1\}$.

**Bước 2.** Giải theo biến cơ sở mới: $x_1=2+2x_2-s_2$, $s_1=1+x_1-x_2=3+x_2-s_2$. Mục tiêu $z=x_1+x_2=2+3x_2-s_2$, nên $\bar c_{x_2}=3>0$ và $\bar c_{s_2}=-1$. Với $x_2$ vào, $d^{x_2}$ có $d_{x_1}=2$ và $d_{s_1}=1$, đều không âm.

**Kết luận.** Theo Mệnh đề 07.30(a), bài toán không bị chặn: dọc tia $(x_1,x_2)=(2+2\theta,\theta)$, $\theta\ge0$, mục tiêu là $z=2+3\theta$.

**Kiểm tra lại.** Trên tia, $-(2+2\theta)+\theta=-2-\theta\le1$ và $(2+2\theta)-2\theta=2\le2$, nên mọi điểm khả thi; tia nằm trên đường biên $x_1-2x_2=2$.
:::

### 8.3. Thuật toán đơn hình và tính hữu hạn

Thuật toán dưới đây ghép Mệnh đề 07.29 và 07.30, và để ngỏ quy tắc chọn biến vào khi có nhiều chi phí rút gọn dương, như $\bar c_{x_1}=2$, $\bar c_{x_2}=3$ tại $(0,0)$ của bài toán hộp hạt.

::: algorithm Thuật toán 07.31 (Phương pháp đơn hình)
**Đầu vào.** Bài toán dạng chuẩn (5.2) thỏa (L1); một cơ sở khả thi $B$, tức $A_B^{-1}b\ge0$.

**Các bước.**

1. Tính nghiệm cơ sở $x_B=A_B^{-1}b$, $x_{B^{\mathrm c}}=0$, và chi phí rút gọn $\bar c_j$ theo (8.2) cho mọi $j\in B^{\mathrm c}$.
2. Nếu $\bar c_j\le0$ với mọi $j\in B^{\mathrm c}$, dừng: $x$ là nghiệm tối ưu.
3. Chọn một $j\in B^{\mathrm c}$ có $\bar c_j>0$ theo một quy tắc chọn biến vào, và tính $d^j_B=-A_B^{-1}A_j$.
4. Nếu $d^j_B\ge0$, dừng: bài toán không bị chặn dọc hướng $d^j$.
5. Tính $\theta^*$ theo (8.3), chọn một chỉ số $l$ đạt cực tiểu theo một quy tắc chọn biến ra, gán $B\leftarrow(B\setminus\{l\})\cup\{j\}$ và quay lại bước 1.

**Đầu ra.** Một cơ sở tối ưu cùng nghiệm cơ sở khả thi tối ưu $x$; hoặc một hướng $d^j$ với $Ad^j=0$, $d^j\ge0$, $c^Td^j>0$.

**Điều kiện dừng.** Bước 2 hoặc bước 4.

**Chi phí mỗi bước.** Giải $A_B^Ty=c_B$ để có $y^T=c_B^TA_B^{-1}$, rồi $n-m$ tích vô hướng cho các $\bar c_j$; giải một hệ với $A_B$ để có $d^j_B$; $m$ phép chia cho phép thử tỉ số.
:::

Thuật toán 07.31 là Thuật toán 07.27 với bước 1 được thực hiện bằng đại số. Hai thuật toán khác nhau ở hai điểm: một bước xoay của Thuật toán 07.31 có thể có $\theta^*=0$, và Thuật toán 07.31 không cần (L3). Khi mọi $\theta^*$ dương, $z$ tăng chặt, và tính hữu hạn suy ra từ số cơ sở hữu hạn (MIT OpenCourseWare 15.093J 2009, Bài giảng 3, slide 21).

::: theorem Định lý 07.32 (Tính hữu hạn khi không suy biến) — chứng minh đầy đủ
**Giả thiết.** Bài toán dạng chuẩn (5.2) thỏa (L1), (L4) và $P\ne\varnothing$. Thuật toán 07.31 xuất phát từ một cơ sở khả thi.

**Kết luận.** Với mọi quy tắc chọn biến vào và biến ra, Thuật toán 07.31 dừng sau hữu hạn bước lặp, ở một trong hai trạng thái:

- (a) một cơ sở tối ưu, và nghiệm cơ sở khả thi tương ứng là nghiệm tối ưu;
- (b) một hướng $d$ với $Ad=0$, $d\ge0$, $c^Td>0$, và $z^*=+\infty$.
:::

::: proof Chứng minh Định lý 07.32
**Lộ trình.** Mỗi bước xoay tăng chặt $z$, nên không cơ sở nào lặp lại, và số cơ sở hữu hạn.

**Bước 1 (mỗi bước xoay tăng chặt $z$).** Mỗi nghiệm cơ sở khả thi được thăm không suy biến, nên $x_i>0$ với mọi $i\in B$, và $\theta^*>0$ trong (8.3). Theo Mệnh đề 07.30(b), $z$ tăng thêm $\theta^*\bar c_j>0$.

**Bước 2 (không cơ sở nào lặp lại).** Một cơ sở xác định duy nhất nghiệm cơ sở của nó theo (5.3), do đó xác định giá trị $z$. Vì $z$ tăng chặt sau mỗi bước, không cơ sở nào xuất hiện hai lần.

**Bước 3 (hữu hạn).** Có nhiều nhất $\binom nm$ tập $m$ chỉ số, nên thuật toán dừng sau nhiều nhất $\binom nm$ bước lặp.

**Bước 4 (trạng thái khi dừng).** Thuật toán chỉ dừng ở bước 2 hoặc bước 4. Ở bước 2, Mệnh đề 07.29(b) cho (a). Ở bước 4, Mệnh đề 07.30(a) cho (b). $\square$
:::

Định lý cần (L4) tại mọi đỉnh mà thuật toán đi qua, và (L4) không thỏa khi bài toán hộp hạt có thêm giới hạn $x_1+x_2\le30$.

::: example Ví dụ 07.21 (Phương pháp đơn hình với quy tắc Dantzig trên bài toán hộp hạt)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm. Xuất phát từ $(0,0)$ với $B=\{s_1,s_2,s_3\}$; biến vào là biến có chi phí rút gọn lớn nhất (quy tắc Dantzig, largest-coefficient rule).

**Các bước.** Chi phí rút gọn tại $(0,0)$ lấy từ Ví dụ 07.19, tại $(14,20)$ từ Ví dụ 07.18 và tại $(30,12)$ từ Ví dụ 07.19. Tại $(0,20)$, giải theo cơ sở $\{s_1,x_2,s_3\}$: $x_2=20-s_2$, $s_1=30-x_1$, $s_3=14-x_1+2s_2$, nên $z=60+2x_1-3s_2$. Bảng sau ghi các bước; tại $(30,12)$, mọi chi phí rút gọn âm, nên thuật toán dừng ở bước 2 của Thuật toán 07.31.

| Bước | Cơ sở | Đỉnh $(x_1,x_2)$ | $z$ | $\bar c$ ngoài cơ sở | Vào | Tỉ số | Ra |
|---|---|---|---:|---|---|---|---|
| $0$ | $\{s_1,s_2,s_3\}$ | $(0,0)$ | $0$ | $x_1$: $2$; $x_2$: $3$ | $x_2$ | $s_2$: $20$; $s_3$: $27$ | $s_2$ |
| $1$ | $\{s_1,x_2,s_3\}$ | $(0,20)$ | $60$ | $x_1$: $2$; $s_2$: $-3$ | $x_1$ | $s_1$: $30$; $s_3$: $14$ | $s_3$ |
| $2$ | $\{x_1,x_2,s_1\}$ | $(14,20)$ | $88$ | $s_2$: $1$; $s_3$: $-2$ | $s_2$ | $s_1$: $8$; $x_2$: $20$ | $s_1$ |
| $3$ | $\{x_1,x_2,s_2\}$ | $(30,12)$ | $96$ | $s_1$: $-\tfrac12$; $s_3$: $-\tfrac32$ | dừng | | |

**Diễn giải.** Đỉnh $(14,20)$ trên đường đi, với $z=88$, là phương án dùng hết giờ máy và sản lượng tối đa của loại 2 ở Ví dụ 07.2.

**Kiểm tra lại.** Mỗi bước, $z$ tăng đúng $\theta^*\bar c_j$: $20\cdot3=60$, $14\cdot2=28$, $8\cdot1=8$, và $60+28+8=96$ khớp $z^*$ của Ví dụ 07.15.
:::

![Ngũ giác hộp hạt với hai đường từ (0,0): đường liền nét theo quy tắc Dantzig qua (0,20), (14,20) tới (30,12), ba bước, z = 0, 60, 88, 96; đường nét đứt qua (30,0) tới (30,12), hai bước, z = 0, 60, 96.](img/lec-07/simplex-two-paths.svg)

Biến $x_2$ có chi phí rút gọn lớn hơn tại $(0,0)$ nhưng dẫn tới đường ba bước, dài hơn đường hai bước qua $(30,0)$ trên hình, vì chi phí rút gọn chỉ đo tốc độ tăng của $z$ trên một đơn vị biến vào, không tính độ dài bước. Hai đường dừng cùng đỉnh vì tại $(30,12)$, $z(x')=96-\tfrac12s_1'-\tfrac32s_3'$ theo Mệnh đề 07.29(a), nên $(30,12)$ là nghiệm tối ưu duy nhất.

::: remark Nhận xét 07.33 (Quy tắc chọn biến vào)
Thuật toán 07.31 đúng với mọi quy tắc chọn biến vào có $\bar c_j>0$, nhưng số bước phụ thuộc quy tắc. Kupferschmid (2023, §4.4.1, tr. 151–153) nêu các quy tắc sau:

- chi phí rút gọn lớn nhất (quy tắc Dantzig), phụ thuộc đơn vị đo của biến, vì đổi $x_j$ thành $\alpha x_j$ với $\alpha>0$ chia $\bar c_j$ cho $\alpha$;
- mức tăng lớn nhất $\theta^*\bar c_j$, cần một phép thử tỉ số cho mỗi biến ứng viên;
- cạnh dốc nhất (steepest-edge rule), tức $\bar c_j/\lVert d^j\rVert$ lớn nhất, rẻ hơn quy tắc mức tăng lớn nhất và hội tụ nhanh hơn quy tắc chỉ số nhỏ nhất (Kupferschmid 2023, tr. 152–153);
- chỉ số nhỏ nhất trong các biến có $\bar c_j>0$.
:::

Phương pháp đơn hình dừng sau hữu hạn bước khi có cơ sở xuất phát và mọi đỉnh không suy biến, vì $z$ tăng chặt; một bước xoay có $\theta^*=0$ không làm $z$ tăng.

### 8.4. Suy biến, quay vòng và quy tắc Bland

Giả sử bài toán hộp hạt có thêm giới hạn $x_1+x_2\le30$, với biến bù $s_4$. Ba đường biên $x_2=0$, $x_1=30$, $x_1+x_2=30$ cùng đi qua $(30,0)$, nên ở dạng chuẩn, đỉnh đó có ít hơn $m=4$ thành phần dương: một nghiệm cơ sở khả thi suy biến.

![Miền hộp hạt khi thêm x1 + x2 ≤ 30: tứ giác với bốn đỉnh (0,0), (30,0), (10,20), (0,20), z lần lượt 0, 60, 80, 60; ba đường biên x2 = 0, x1 = 30 (s1 = 0) và x1 + x2 = 30 (s4 = 0) cùng qua đỉnh suy biến (30,0); đỉnh tối ưu (10,20).](img/lec-07/degenerate-vertex-boxes.svg)

::: example Ví dụ 07.22 (Bước xoay suy biến trên bài toán hộp hạt có giới hạn tổng sản lượng)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới

$$
\begin{aligned}
x_1+s_1&=30,\\
x_2+s_2&=20,\\
x_1+2x_2+s_3&=54,\\
x_1+x_2+s_4&=30,
\end{aligned}
$$

mọi biến không âm, thứ tự $(x_1,x_2,s_1,s_2,s_3,s_4)$. Xuất phát từ $(0,0)$ với $B=\{s_1,s_2,s_3,s_4\}$. Quy tắc chọn: biến vào có chỉ số nhỏ nhất trong các biến có $\bar c_j>0$; khi tỉ số hòa, biến ra có chỉ số nhỏ nhất. Quy tắc chọn này gọi là quy tắc Bland.

**Bước 0.** $\bar c_{x_1}=2$, $\bar c_{x_2}=3$; chọn $x_1$. Dọc $d^{x_1}$, ba biến $s_1$, $s_3$, $s_4$ giảm với tỉ số $30$, $54$, $30$. Tỉ số $30$ hòa giữa $s_1$ và $s_4$; chọn $s_1$. Điểm mới $(30,0)$, cơ sở $\{x_1,s_2,s_3,s_4\}$, với $s_2=20$, $s_3=24$, $s_4=0$: biến cơ sở $s_4$ bằng $0$, nghiệm suy biến. $z=60$.

**Bước 1.** Giải theo biến cơ sở: $x_1=30-s_1$, $s_2=20-x_2$, $s_3=24+s_1-2x_2$, $s_4=s_1-x_2$. Mục tiêu $z=60-2s_1+3x_2$, nên $\bar c_{x_2}=3$; chọn $x_2$. Tỉ số $s_2$: $20$, $s_3$: $12$, $s_4$: $\tfrac01=0$, nên $\theta^*=0$ và $s_4$ ra. Cơ sở mới $\{x_1,x_2,s_2,s_3\}$, điểm vẫn là $(30,0)$, $z$ vẫn bằng $60$.

**Bước 2.** Giải theo biến cơ sở mới: $x_1=30-s_1$, $x_2=s_1-s_4$, $s_2=20-s_1+s_4$, $s_3=24-s_1+2s_4$. Mục tiêu $z=60+s_1-3s_4$, nên $\bar c_{s_1}=1$; chọn $s_1$. Dọc $d^{s_1}$, các biến $x_1$, $s_2$, $s_3$ giảm với tỉ số $30$, $20$, $24$, nên $\theta^*=20$ và $s_2$ ra. Điểm mới $(10,20)$, $z=60+20=80$.

**Bước 3.** Cơ sở $\{x_1,x_2,s_1,s_3\}$: $x_2=20-s_2$, $x_1=10+s_2-s_4$, $s_1=20-s_2+s_4$, $s_3=4+s_2+s_4$, và $z=80-s_2-2s_4$. Hai chi phí rút gọn $-1$ và $-2$ đều âm, nên $(10,20)$ tối ưu với $z^*=80$.

**Diễn giải.** Tỉ số hòa ở bước 0 để lại $s_4=0$ trong cơ sở, nên bước 1 là một bước xoay suy biến: cơ sở đổi, điểm và $z$ không đổi, và cơ sở mới cho cạnh tới $(10,20)$.

**Kiểm tra lại.** Tại $(10,20)$: $10\le30$, $20\le20$, $10+40=50\le54$, $10+20=30\le30$. Với hai hệ số nhân $1$ và $2$ đọc từ chi phí rút gọn, $2x_1+3x_2=1\cdot x_2+2(x_1+x_2)\le20+2\cdot30=80$.
:::

Với quy tắc Dantzig, cùng bài toán đi $(0,0)\to(0,20)\to(10,20)$ trong hai bước xoay không suy biến (tại $(0,20)$, tỉ số $s_1$: $30$, $s_3$: $14$, $s_4$: $10$). Suy biến là thuộc tính của đỉnh, còn bước xoay suy biến phụ thuộc đường đi.

Về mặt ý tưởng, một bước xoay suy biến không làm $z$ tăng, nên dãy cơ sở tại cùng một đỉnh có thể quay lại một cơ sở đã gặp, và với một quy tắc chọn tất định, thuật toán khi đó lặp mãi.

::: definition Định nghĩa 07.34 (Quay vòng, quy tắc Bland)
**Quay vòng.** Thuật toán 07.31 với một quy tắc chọn tất định *quay vòng* (cycling) nếu dãy cơ sở của nó có $B^{k}=B^{k+p}$ với một $k\ge0$ và một $p\ge1$. Khi đó mọi bước xoay từ $B^k$ tới $B^{k+p}$ có $\theta^*=0$, và dãy cơ sở lặp mãi với chu kỳ $p$.

**Quy tắc Bland.** Cho bài toán dạng chuẩn với các biến được đánh số $1,\ldots,n$ theo một thứ tự cố định. *Quy tắc Bland* (Bland's rule), còn gọi là quy tắc chỉ số nhỏ nhất, chọn trong Thuật toán 07.31:

- ở bước 3, biến vào $x_j$ với $j$ là chỉ số nhỏ nhất trong các chỉ số $j\in B^{\mathrm c}$ có $\bar c_j>0$;
- ở bước 5, biến ra $x_l$ với $l$ là chỉ số nhỏ nhất trong các chỉ số đạt cực tiểu ở (8.3).
:::

Quy tắc Bland chỉ dùng dấu của $\bar c_j$ và thứ tự các chỉ số. Nó không tránh bước xoay suy biến (Ví dụ 07.22), nhưng bảo đảm dãy cơ sở không lặp lại, theo định lý sau.

::: theorem Định lý 07.35 (Quy tắc Bland chống quay vòng) — chứng minh nằm ngoài phạm vi học phần (Vanderbei 2014, §3.4, tr. 31–33)
**Giả thiết.** Bài toán dạng chuẩn (5.2) thỏa (L1); Thuật toán 07.31 xuất phát từ một cơ sở khả thi và dùng quy tắc Bland (Định nghĩa 07.34).

**Kết luận.** Thuật toán không quay vòng và dừng sau hữu hạn bước lặp, ở một trong hai trạng thái của Định lý 07.32: một cơ sở tối ưu, hoặc một hướng $d$ với $Ad=0$, $d\ge0$, $c^Td>0$.
:::

Định lý không cần (L4). Về mặt ý tưởng, chứng minh của Vanderbei (2014, §3.4, Định lý 3.3) như sau. Giả sử thuật toán quay vòng, nên mọi bước trong vòng có $\theta^*=0$. Gọi $j_{\max}$ là chỉ số lớn nhất trong các biến vừa vào vừa ra trong vòng, và so sánh hai biểu diễn của mục tiêu tại bước $x_{j_{\max}}$ rời cơ sở và tại bước nó vào lại. Đẳng thức giữa hai biểu diễn buộc một chỉ số $j_0<j_{\max}$ cũng đạt cực tiểu ở phép thử tỉ số khi $x_{j_{\max}}$ rời cơ sở, nên quy tắc Bland đã phải chọn $x_{j_0}$, mâu thuẫn.

Định lý 07.35 trả lời câu hỏi thứ ba sau Ví dụ 07.17. Dùng định lý đó tại đỉnh suy biến, bổ đề sau trả lời câu hỏi thứ năm.

::: lemma Bổ đề 07.36 (Đỉnh kề cải thiện) — chứng minh đầy đủ
**Giả thiết.** Bài toán dạng chuẩn (5.2) thỏa (L1) và (L3); $v$ là nghiệm cơ sở khả thi với $c^Tv<z^*$.

**Kết luận.** Có một nghiệm cơ sở khả thi $w$ kề $v$ (Định nghĩa 07.25) với $c^Tw>c^Tv$.
:::

::: proof Chứng minh Bổ đề 07.36
**Lộ trình.** Khi $v$ không suy biến, một chi phí rút gọn dương cho một bước xoay với $\theta^*>0$. Khi $v$ suy biến, chạy phương pháp đơn hình với quy tắc Bland từ một cơ sở của $v$ và lấy bước xoay đầu tiên làm điểm di chuyển.

**Bước 1 (có một chi phí rút gọn dương).** Gọi $B$ là một cơ sở của $v$. Vì $c^Tv<z^*$, có $x'\in P$ với $c^Tx'>c^Tv$. Theo Mệnh đề 07.29(a), $\sum_{j\in B^{\mathrm c}}x'_j\bar c_j=c^Tx'-c^Tv>0$. Vì mọi $x'_j\ge0$, có $j\in B^{\mathrm c}$ với $\bar c_j>0$.

**Bước 2 (hướng $d^j$ không phải một tia khả thi).** Nếu $d^j_i\ge0$ với mọi $i\in B$, Mệnh đề 07.30(a) cho $z^*=+\infty$, trái giả thiết. Vậy có $i\in B$ với $d^j_i<0$.

**Bước 3 (trường hợp $v$ không suy biến).** Vì $v$ không suy biến, mọi $v_i>0$ với $i\in B$, nên $\theta^*>0$ trong (8.3). Theo Mệnh đề 07.30(b), $w=v+\theta^*d^j$ là nghiệm cơ sở khả thi của $B'=(B\setminus\{l\})\cup\{j\}$, và $c^Tw=c^Tv+\theta^*\bar c_j>c^Tv$.

Hai cơ sở $B$, $B'$ khác nhau đúng một chỉ số, và $w\ne v$ vì $\theta^*>0$, $d^j\ne0$. Theo Mệnh đề 07.26, $v$ và $w$ kề nhau.

**Bước 4 (trường hợp $v$ suy biến: chạy phương pháp đơn hình).** Chạy Thuật toán 07.31 với quy tắc Bland từ một cơ sở $B^0$ của $v$, thu được dãy cơ sở $B^0,B^1,\ldots,B^K$ và dãy nghiệm cơ sở khả thi $x^0=v,x^1,\ldots,x^K$. Theo Định lý 07.35, dãy hữu hạn, và thuật toán không dừng ở trạng thái không bị chặn vì khi đó Mệnh đề 07.30(a) cho $z^*=+\infty$. Vậy $x^K$ tối ưu, và $c^Tx^K=z^*>c^Tv$.

**Bước 5 (bước xoay đầu tiên có di chuyển).** Vì $x^K\ne v$, có chỉ số $k$ nhỏ nhất với $x^{k+1}\ne x^k$. Khi đó $x^0=\cdots=x^k=v$, nên $B^k$ là một cơ sở của $v$, và bước xoay thứ $k$ có $\theta^*>0$. Theo Mệnh đề 07.30(b), $w=x^{k+1}$ là nghiệm cơ sở khả thi của $B^{k+1}$, và $c^Tw=c^Tv+\theta^*\bar c_j>c^Tv$.

**Bước 6 ($w$ kề $v$).** Hai cơ sở $B^k$, $B^{k+1}$ khác nhau đúng một chỉ số và cho hai điểm khác nhau $v$, $w$. Theo Mệnh đề 07.26, $v$ và $w$ kề nhau. $\square$
:::

::: proposition Mệnh đề 07.37 (Thuật toán 07.27 dừng tại một điểm cực biên tối ưu) — chứng minh đầy đủ
**Giả thiết.** Như đầu vào của Thuật toán 07.27.

**Kết luận.** Thuật toán dừng sau hữu hạn bước, và nghiệm cơ sở khả thi trả về là nghiệm tối ưu.
:::

::: proof Chứng minh Mệnh đề 07.37
**Lộ trình.** Giá trị mục tiêu tăng chặt nên không đỉnh nào được thăm lại; khi dừng, Bổ đề 07.36 loại trường hợp chưa tối ưu.

**Bước 1 (không thăm lại).** Mỗi lần lặp làm $c^Tv$ tăng chặt, nên không điểm cực biên nào được thăm hai lần.

**Bước 2 (dừng).** Theo Hệ quả 07.13, $P$ có nhiều nhất $\binom nm$ điểm cực biên, nên số lần lặp hữu hạn.

**Bước 3 (đúng).** Khi dừng, không có đỉnh kề nào có giá trị lớn hơn $c^Tv$. Nếu $c^Tv<z^*$, Bổ đề 07.36 cho một đỉnh kề có giá trị lớn hơn, mâu thuẫn. Vậy $c^Tv=z^*$. $\square$
:::

So với Định lý 07.32, Mệnh đề 07.37 cần biết trước $z^*$ hữu hạn nhưng không cần (L4).

:::: reading Quy tắc thứ tự từ điển và xử lý suy biến trong bộ giải

::: remark Nhận xét 07.38 (Ví dụ quay vòng, quy tắc thứ tự từ điển và bộ giải thực tế)
**Ví dụ quay vòng.** Trong ví dụ của Vanderbei (2014, §3.2, tr. 26–28) với bốn biến và ba ràng buộc, quy tắc chi phí rút gọn lớn nhất cùng cách phá hòa theo chỉ số nhỏ nhất quay lại cơ sở ban đầu sau sáu bước xoay.

**Quy tắc thứ tự từ điển** (lexicographic rule) chỉ quy định cách chọn biến ra, và tương đương với việc cộng $\varepsilon_i$ vào vế phải thứ $i$, với $0<\varepsilon_m\ll\cdots\ll\varepsilon_1$ coi như ký hiệu, nên không bảng nào suy biến (Vanderbei 2014, §3.3, tr. 28–30).

**Bộ giải thực tế** xử lý suy biến bằng các cách sau (Kupferschmid 2023, §4.5.3, tr. 160–163):

- bật quy tắc chống quay vòng chỉ khi có hàng với vế phải bằng $0$;
- nhiễu nhẹ vế phải tại đỉnh suy biến;
- chọn ngẫu nhiên giữa các hàng hòa tỉ số;
- đặt giới hạn số bước lặp.
:::

::::

### 8.5. Bảng đơn hình

Mỗi bước xoay ở Ví dụ 07.21 và 07.22 đều giải lại hệ phương trình. Khi viết biến cơ sở theo biến ngoài cơ sở, chẳng hạn $x_2=12+\tfrac12s_1-\tfrac12s_3$, các hệ số là phần tử của $A_B^{-1}A$ và $A_B^{-1}b$, còn các hệ số trong $z$ là chi phí rút gọn. Ghi các số đó vào một bảng, ta chuyển sang cơ sở kề bằng phép biến đổi hàng.

::: definition Định nghĩa 07.39 (Bảng đơn hình)
Cho bài toán dạng chuẩn (5.2) và một cơ sở $B$ với các chỉ số $B(1),\ldots,B(m)$ xếp theo thứ tự cột của $A_B$. *Bảng đơn hình* (simplex tableau) của $B$ là ma trận cỡ $(m+1)\times(n+1)$

$$
\begin{aligned}
&\begin{bmatrix}
A_B^{-1}A & A_B^{-1}b\\
\bar c^T & -z
\end{bmatrix},\\
&\bar c^T=c^T-c_B^TA_B^{-1}A,\\
&z=c_B^TA_B^{-1}b .
\end{aligned}
\tag{8.4}
$$

Hàng thứ $p$ của phần trên ứng với biến cơ sở $x_{B(p)}$, cột thứ $j$ ứng với biến $x_j$, và cột cuối ("vế phải") là $x_B$ ở phần trên, $-z$ ở hàng cuối.
:::

Cột $j$ của phần trên của (8.4) là $A_B^{-1}A_j=-d^j_B$, các cột ứng với biến cơ sở là các cột của ma trận đơn vị, và theo (8.2), hàng cuối chứa $\bar c_j$ tại các cột ngoài cơ sở và $0$ tại các cột cơ sở.

Đọc theo hàng, hàng thứ $p$ của phần trên là biểu diễn $x_{B(p)}+\sum_{j\in B^{\mathrm c}}(A_B^{-1}A)_{pj}x_j=(x_B)_p$ của Ví dụ 07.18, và hàng cuối là $z=c_B^Tx_B+\sum_{j\in B^{\mathrm c}}\bar c_jx_j$, tức Mệnh đề 07.29(a). Trong phép thử tỉ số, điều kiện $d^j_i<0$ thành "phần tử ở cột $j$ dương", và tỉ số là phần tử cột cuối chia phần tử cột $j$ trên cùng hàng.

::: proposition Mệnh đề 07.40 (Bước xoay trên bảng là phép biến đổi hàng) — chứng minh đầy đủ
**Giả thiết.** Bảng đơn hình (8.4) của một cơ sở khả thi $B$; $j\in B^{\mathrm c}$ có $\bar c_j>0$; cột $\alpha=A_B^{-1}A_j$ của biến vào có ít nhất một thành phần dương; hàng $p$ đạt cực tiểu của các tỉ số $(x_B)_i/\alpha_i$, $\alpha_i>0$, và $l=B(p)$. Phần tử $\alpha_p>0$ gọi là phần tử xoay (pivot element).

**Kết luận.** Thực hiện lần lượt:

1. chia hàng $p$ cho $\alpha_p$;
2. với mỗi hàng $i\ne p$ của phần trên, trừ $\alpha_i$ lần hàng $p$ mới;
3. trừ khỏi hàng cuối $\bar c_j$ lần hàng $p$ mới.

Bảng thu được là bảng đơn hình của $B'=(B\setminus\{l\})\cup\{j\}$, với hàng $p$ nay ứng với $x_j$.
:::

::: proof Chứng minh Mệnh đề 07.40
**Lộ trình.** Hai phép đầu là nhân trái phần trên với một ma trận khả nghịch đưa $A_B^{-1}$ thành $A_{B'}^{-1}$; phép thứ ba giữ hàng cuối ở dạng $[c^T\mid0]-\eta^T[A\mid b]$ và làm nó bằng $0$ tại các cột cơ sở mới.

**Bước 1 (phần trên).** Hai phép đầu chỉ tác động lên phần trên và tương đương với nhân trái $A_B^{-1}[A\mid b]$ với một ma trận khả nghịch $Q\in\mathbb R^{m\times m}$, vì mỗi phép là một phép biến đổi hàng sơ cấp và $\alpha_p\ne0$. Sau các phép đó, cột $j$ thành cột thứ $p$ của $I$. Các cột của biến cơ sở $B(i)$, $i\ne p$, là cột thứ $i$ của $I$ và có phần tử $0$ ở hàng $p$, nên không đổi. Vậy $QA_B^{-1}A_{B'}=I$ khi các cột của $B'$ xếp theo thứ tự hàng, tức $QA_B^{-1}=A_{B'}^{-1}$, và phần trên mới là $A_{B'}^{-1}[A\mid b]$.

**Bước 2 (hàng cuối).** Hàng cuối của bảng cũ là $[c^T\mid0]-c_B^TA_B^{-1}[A\mid b]$, tức $[c^T\mid0]$ trừ một tổ hợp tuyến tính các hàng của $[A\mid b]$. Hàng $p$ mới cũng là một tổ hợp tuyến tính các hàng của $[A\mid b]$, nên sau phép 3, hàng cuối mới vẫn có dạng $[c^T\mid0]-\eta^T[A\mid b]$ với một $\eta\in\mathbb R^m$. Phần tử của nó tại cột $j$ bằng $\bar c_j-\bar c_j\cdot1=0$, và tại các cột $B(i)$, $i\ne p$, vẫn bằng $0$ vì hàng $p$ mới có $0$ ở các cột đó.

**Bước 3 (xác định $\eta$).** Hàng cuối mới bằng $0$ tại mọi cột của $B'$, tức $c_{B'}^T-\eta^TA_{B'}=0$, nên $\eta^T=c_{B'}^TA_{B'}^{-1}$. Thế vào, hàng cuối mới là $[c^T-c_{B'}^TA_{B'}^{-1}A\mid-c_{B'}^TA_{B'}^{-1}b]$, đúng hàng cuối của (8.4) cho $B'$. $\square$
:::

Theo Mệnh đề 07.40, một bước xoay, kể cả bước có $\theta^*=0$, chỉ cần các phép cộng, nhân và chia trên $(m+1)(n+1)$ ô của bảng.

::: example Ví dụ 07.23 (Bảng đơn hình của bài toán hộp hạt)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm, thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$. Xuất phát từ cơ sở $\{s_1,s_2,s_3\}$ với quy tắc Bland.

**Bảng 0.** Cơ sở gồm các biến bù, $A_B=I$, nên bảng là $[A\mid b]$ với hàng cuối $[c^T\mid0]$.

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|
| $s_1$ | $1$ | $0$ | $1$ | $0$ | $0$ | $30$ |
| $s_2$ | $0$ | $1$ | $0$ | $1$ | $0$ | $20$ |
| $s_3$ | $1$ | $2$ | $0$ | $0$ | $1$ | $54$ |
| $\bar c$ và $-z$ | $2$ | $3$ | $0$ | $0$ | $0$ | $0$ |

**Bước xoay thứ nhất.** Theo quy tắc Bland, $x_1$ vào; tỉ số $\tfrac{30}1=30$ (hàng $s_1$) và $\tfrac{54}1=54$ (hàng $s_3$), nên $s_1$ ra với phần tử xoay $1$. Hàng $s_3$ trừ $1$ lần hàng $s_1$, hàng cuối trừ $2$ lần.

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|
| $x_1$ | $1$ | $0$ | $1$ | $0$ | $0$ | $30$ |
| $s_2$ | $0$ | $1$ | $0$ | $1$ | $0$ | $20$ |
| $s_3$ | $0$ | $2$ | $-1$ | $0$ | $1$ | $24$ |
| $\bar c$ và $-z$ | $0$ | $3$ | $-2$ | $0$ | $0$ | $-60$ |

Bảng này ứng với đỉnh $(30,0)$, $z=60$.

**Bước xoay thứ hai.** Chỉ $\bar c_{x_2}=3$ dương; tỉ số $\tfrac{20}1=20$ (hàng $s_2$) và $\tfrac{24}2=12$ (hàng $s_3$), nên $s_3$ ra với phần tử xoay $2$. Chia hàng $s_3$ cho $2$ được $(0,1,-\tfrac12,0,\tfrac12\mid12)$; hàng $s_2$ trừ $1$ lần và hàng cuối trừ $3$ lần hàng mới.

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|
| $x_1$ | $1$ | $0$ | $1$ | $0$ | $0$ | $30$ |
| $s_2$ | $0$ | $0$ | $\tfrac12$ | $1$ | $-\tfrac12$ | $8$ |
| $x_2$ | $0$ | $1$ | $-\tfrac12$ | $0$ | $\tfrac12$ | $12$ |
| $\bar c$ và $-z$ | $0$ | $0$ | $-\tfrac12$ | $0$ | $-\tfrac32$ | $-96$ |

**Đọc bảng cuối.** Mọi phần tử của hàng cuối không dương, nên theo Mệnh đề 07.29(b), cơ sở $\{x_1,x_2,s_2\}$ tối ưu: $x=(30,12)$, $s_2=8$, $z^*=96$.

**Diễn giải.** Hai bước xoay đi đúng đường $(0,0)\to(30,0)\to(30,12)$ của Ví dụ 07.17.

**Kiểm tra lại.** Ba cột $s_1,s_2,s_3$ của bảng cuối là $A_B^{-1}$, với các hàng theo thứ tự $x_1,s_2,x_2$; nhân với $b=(30,20,54)$ được $(30,8,12)$, khớp cột vế phải.
:::

:::: reading Phương pháp đơn hình cải tiến

::: remark Nhận xét 07.41 (Phương pháp đơn hình cải tiến)
*Phương pháp đơn hình cải tiến* (revised simplex method), còn gọi là đơn hình sửa đổi, chỉ lưu $A_B^{-1}$ hoặc một phân tích của $A_B$, và ở mỗi bước chỉ tính cột $A_B^{-1}A_j$ của biến vào; $A_B^{-1}$ được cập nhật bằng các phép biến đổi hàng của Mệnh đề 07.40 (Kupferschmid 2023, §4.2, tr. 137–145; Nguyễn Bích Vân 2025, ch. 8, phần 4). Các bộ giải thực tế dùng dạng cải tiến.
:::

::::

### 8.6. Cơ sở khả thi xuất phát và pha I

Các bảng đơn hình ở Ví dụ 07.23 xuất phát từ cơ sở các biến bù, khả thi vì $b\ge0$; khi bài toán có ràng buộc $\ge$ hoặc vế phải âm, cơ sở đó không khả thi. Giả sử xưởng đóng hộp hạt ký một hợp đồng buộc $x_1+x_2\ge40$, ở dạng chuẩn là $x_1+x_2-e_4=40$ với biến dư $e_4\ge0$. Cơ sở $\{s_1,s_2,s_3,e_4\}$ cho $e_4=-40<0$, nên chưa có cơ sở xuất phát. Thêm một biến nhân tạo $\tilde s\ge0$, thành $x_1+x_2-e_4+\tilde s=40$, thì cơ sở $\{s_1,s_2,s_3,\tilde s\}$ khả thi với $\tilde s=40$; một điểm có $\tilde s=0$ là điểm khả thi của bài toán gốc, nên ta cực đại $-\tilde s$.

::: definition Định nghĩa 07.42 (Bài toán phụ của pha I)
Cho bài toán dạng chuẩn (5.2), trong đó các phương trình có $b_i<0$ đã được nhân với $-1$, nên $b\ge0$. *Bài toán phụ* (auxiliary problem) là bài toán cực đại sau:

$$
\begin{aligned}
\max_{x,\tilde s}\quad&-\sum_{i=1}^m\tilde s_i\\
&Ax+\tilde s=b,\\
&x\ge0,\quad\tilde s\ge0,
\end{aligned}
\tag{8.5}
$$

trong đó $\tilde s\in\mathbb R^m$ là vector *biến nhân tạo* (artificial variables). Giải (8.5) bằng phương pháp đơn hình từ cơ sở $\{\tilde s_1,\ldots,\tilde s_m\}$ gọi là *pha I* (Phase I); giải bài toán gốc từ cơ sở mà pha I tìm được gọi là *pha II* (Phase II) (Kupferschmid 2023, §2.8.2, tr. 78–82).
:::

Ta ký hiệu giá trị mục tiêu của bài toán phụ là $\tilde z$ và giá trị tối ưu là $\tilde z^*$. Cơ sở $\{\tilde s_1,\ldots,\tilde s_m\}$ có ma trận cơ sở $I$ và nghiệm $x=0$, $\tilde s=b\ge0$, nên khả thi. Phương trình đã có biến bù với hệ số $1$ và vế phải không âm dùng biến bù đó thay cho biến nhân tạo trong cơ sở xuất phát.

::: proposition Mệnh đề 07.43 (Pha I quyết định tính khả thi) — chứng minh đầy đủ
**Giả thiết.** Bài toán dạng chuẩn (5.2) thỏa (L1) và $b\ge0$; bài toán phụ (8.5) với giá trị tối ưu $\tilde z^*$.

**Kết luận.**

- (a) Bài toán phụ khả thi, $\tilde z^*\le0$, và $\tilde z^*$ được đạt.
- (b) Bài toán gốc khả thi khi và chỉ khi $\tilde z^*=0$.
- (c) Nếu $\tilde z^*=0$ và một cơ sở tối ưu của bài toán phụ còn chứa biến nhân tạo, thì biến đó bằng $0$, và có thể đổi cơ sở, không di chuyển điểm, cho tới khi cơ sở chỉ gồm biến của bài toán gốc. Cơ sở thu được là một cơ sở khả thi của bài toán gốc.
:::

::: proof Chứng minh Mệnh đề 07.43
**Lộ trình.** Phần (a) dùng điểm $(0,b)$ và Định lý 07.23; phần (b) so giá trị $0$ với $\tilde z^*$; phần (c) xoay các biến nhân tạo bằng $0$ ra khỏi cơ sở mà không di chuyển điểm.

**Bước 1 (phần (a)).** Điểm $(x,\tilde s)=(0,b)$ khả thi vì $b\ge0$. Vì $\tilde s\ge0$, mục tiêu $-\sum_i\tilde s_i\le0$ tại mọi điểm khả thi, nên $\tilde z^*\le0$ hữu hạn, và theo Định lý 07.23, $\tilde z^*$ được đạt.

**Bước 2 (phần (b), chiều thuận).** Nếu $\bar x$ khả thi cho bài toán gốc, $(\bar x,0)$ khả thi cho bài toán phụ với giá trị $0$, nên $\tilde z^*\ge0$. Cùng với (a), $\tilde z^*=0$.

**Bước 3 (phần (b), chiều ngược).** Nếu $\tilde z^*=0$ đạt tại $(x^*,\tilde s^*)$, thì $\sum_i\tilde s^*_i=0$ với mọi $\tilde s^*_i\ge0$, nên $\tilde s^*=0$. Khi đó $Ax^*=b$, $x^*\ge0$: bài toán gốc khả thi.

**Bước 4 (phần (c)).** Tại nghiệm tối ưu, $\tilde s^*=0$ theo Bước 3, nên biến nhân tạo trong cơ sở, nằm ở hàng $p$ của bảng, có giá trị $0$. Phần của hàng $p$ ở các cột biến gốc là $\mathbf u_p^TA_{B}^{-1}A$, với $\mathbf u_p$ là cột thứ $p$ của $I$ và $A_B$ là ma trận cơ sở của bài toán phụ. Nếu phần này bằng $0$, vector $\eta^T=\mathbf u_p^TA_B^{-1}\ne0$ thỏa $\eta^TA=0$, trái giả thiết hạng $m$.

Vậy phần đó khác $0$ tại một cột biến gốc $j$, nằm ngoài cơ sở vì các cột cơ sở có $0$ ở hàng $p$. Xoay trên phần tử đó bằng ba phép biến đổi hàng của Mệnh đề 07.40, vốn chỉ cần phần tử xoay khác $0$; vế phải của hàng $p$ bằng $0$, nên điểm giữ nguyên, và cơ sở mới có ít hơn một biến nhân tạo. Sau nhiều nhất $m$ lần, cơ sở chỉ còn biến gốc, và nghiệm cơ sở là $x^*\ge0$. $\square$
:::

Khi không có giả thiết hạng $m$, phần của hàng $p$ ở các cột biến gốc trong Bước 4 của chứng minh trên có thể bằng $0$. Khi đó $\eta\ne0$ với $\eta^TA=0$, và $\eta^Tb=\eta^TAx^*=0$ vì bài toán gốc có điểm khả thi $x^*$. Nếu $\tilde s_r$ là biến nhân tạo ở hàng $p$, phần tử của hàng $p$ ở cột $\tilde s_r$ là $\mathbf u_p^TA_B^{-1}\mathbf u_r=\eta_r=1$, với $\mathbf u_r$ là cột thứ $r$ của $I$, vì cột của biến cơ sở $\tilde s_r$ trong bảng là $\mathbf u_p$, nên phương trình thứ $r$ của $Ax=b$ là tổ hợp tuyến tính của các phương trình khác, và bỏ nó không đổi tập khả thi. Ta bỏ hàng $p$ và cột $\tilde s_r$, rồi tiếp tục với $m-1$ phương trình; pha I không cần chạy lại.

Pha I không dùng mục tiêu $c$, nên sau pha I, pha II vẫn có thể kết thúc ở trạng thái không bị chặn.

::: algorithm Thuật toán 07.44 (Phương pháp hai pha)
**Đầu vào.** Bài toán $\max c^Tx$ với $Ax=b$, $x\ge0$, trong đó $A\in\mathbb R^{m\times n}$ (không cần biết trước hạng) và vế phải $b$ bất kỳ.

**Các bước.**

1. Nhân với $-1$ các phương trình có $b_i<0$, để $b\ge0$.
2. Pha I: lập bài toán phụ (8.5) và chạy Thuật toán 07.31 từ cơ sở các biến nhân tạo, với một quy tắc bảo đảm dừng như quy tắc Bland.
3. Nếu $\tilde z^*<0$, dừng: bài toán gốc không khả thi.
4. Nếu $\tilde z^*=0$: đưa các biến nhân tạo còn trong cơ sở ra theo Mệnh đề 07.43(c); nếu hàng của một biến nhân tạo $\tilde s_r$ có mọi phần tử ở cột biến gốc bằng $0$, phương trình thứ $r$ thừa: bỏ hàng đó và cột $\tilde s_r$. Sau đó bỏ các cột nhân tạo còn lại.
5. Pha II: chạy Thuật toán 07.31 trên bài toán gốc từ cơ sở thu được.

**Đầu ra.** Kết luận không khả thi; hoặc kết quả của pha II: một nghiệm cơ sở khả thi tối ưu, hoặc một hướng làm mục tiêu tăng không bị chặn.

**Điều kiện dừng.** Bước 3, hoặc khi pha II dừng.

**Chi phí mỗi bước.** Pha I là một quy hoạch tuyến tính có thêm nhiều nhất $m$ cột; mỗi bước của hai pha có chi phí như Thuật toán 07.31.
:::

Với quy tắc Bland ở cả hai pha, Thuật toán 07.44 dừng trên mọi bài toán dạng chuẩn và kết thúc ở một trong ba trạng thái: không khả thi, không bị chặn, hoặc có nghiệm cơ sở khả thi tối ưu. Vanderbei (2014, §3.5, tr. 33) dùng kết luận này để phát biểu định lý cơ bản của quy hoạch tuyến tính; Vanderbei gọi dạng (1.1) là dạng chuẩn.

::: example Ví dụ 07.24 (Pha I và pha II với hợp đồng sản lượng tối thiểu)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1+x_2\ge40$, $x\ge0$. Dạng chuẩn: $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, $x_1+x_2-e_4=40$, mọi biến không âm. Chỉ phương trình cuối cần biến nhân tạo $\tilde s$; thứ tự biến $(x_1,x_2,s_1,s_2,s_3,e_4,\tilde s)$.

**Bài toán phụ.** Cực đại $\tilde z=-\tilde s$ với $x_1+x_2-e_4+\tilde s=40$ thay cho phương trình cuối; cơ sở xuất phát $\{s_1,s_2,s_3,\tilde s\}$, điểm $x=0$, $\tilde s=40$, $\tilde z=-40$.

**Pha I, bước 1.** Thế $\tilde s=40-x_1-x_2+e_4$: $\tilde z=-40+x_1+x_2-e_4$, nên $\bar c_{x_1}=\bar c_{x_2}=1$, $\bar c_{e_4}=-1$. Theo quy tắc Bland, $x_1$ vào; tỉ số $s_1$: $30$, $s_3$: $54$, $\tilde s$: $40$, nên $s_1$ ra. Điểm $(30,0)$, $\tilde s=10$, $\tilde z=-10$.

**Pha I, bước 2.** Với $x_1=30-s_1$: $\tilde s=10+s_1-x_2+e_4$ và $\tilde z=-10-s_1+x_2-e_4$, nên chỉ $\bar c_{x_2}=1$ dương; $x_2$ vào. Tỉ số $s_2$: $20$, $s_3$: $\tfrac{24}2=12$, $\tilde s$: $10$, nên $\tilde s$ ra. Điểm $(30,10)$, $s_2=10$, $s_3=4$, $\tilde s=0$, $\tilde z=0$.

**Kết thúc pha I.** $\tilde z^*=0$ và cơ sở $\{x_1,x_2,s_2,s_3\}$ không chứa biến nhân tạo; theo Mệnh đề 07.43(b), bài toán gốc khả thi, và đây là cơ sở xuất phát của pha II.

**Pha II.** Với cơ sở $\{x_1,x_2,s_2,s_3\}$: $x_1=30-s_1$, $x_2=10+s_1+e_4$, $s_2=10-s_1-e_4$, $s_3=4-s_1-2e_4$, và $z=90+s_1+3e_4$. Theo quy tắc Dantzig, $e_4$ vào; tỉ số $s_2$: $10$, $s_3$: $\tfrac42=2$, nên $s_3$ ra. Điểm mới $(30,12)$, $e_4=2$, $z=96$; tại cơ sở $\{x_1,x_2,s_2,e_4\}$, $\bar c_{s_1}=-\tfrac12$, $\bar c_{s_3}=-\tfrac32$: tối ưu.

**Diễn giải.** Hợp đồng $40$ không làm đổi phương án tối ưu, vì $(30,12)$ có tổng sản lượng $42\ge40$.

**Kiểm tra lại.** Tại $(30,10)$: $30+10=40$, $30+20=50\le54$, nên điểm cuối pha I khả thi cho bài toán gốc. Tại $(30,12)$: $42-e_4=40$ cho $e_4=2$.
:::

::: exercise Bài tập 07.8 (Bảng đơn hình của bài toán hộp hạt với lợi ích mới)
Miền khả thi $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$; mục tiêu mới: cực đại $z=2x_1+4x_2$. Dạng chuẩn dùng biến bù $s_1,s_2,s_3$, thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$.

- (a) Chạy phương pháp đơn hình trên bảng đơn hình từ $(0,0)$, với biến vào có chi phí rút gọn lớn nhất; ghi các bảng đơn hình.
- (b) Đọc chi phí rút gọn ở bảng dừng và kết luận về tính tối ưu.
- (c) Ở bảng dừng có một chi phí rút gọn bằng $0$. Cho biến đó vào, thực hiện phép thử tỉ số và bước xoay; dùng Mệnh đề 07.29(a) để xác định toàn bộ tập nghiệm tối ưu.
:::

::: hint
Ở (c), viết $z$ theo hai biến ngoài cơ sở của bảng dừng.
:::

::: solution
**Câu (a).** Bảng đầu là $[A\mid b]$ với hàng cuối $(2,4,0,0,0\mid0)$. Theo quy tắc Dantzig, $x_2$ vào ($\bar c_{x_2}=4$); tỉ số $s_2$: $20$, $s_3$: $27$.

Bước xoay thứ nhất ($x_2$ vào, $s_2$ ra) dùng phần tử xoay $1$ ở hàng $s_2$, cột $x_2$: hàng $s_3$ trừ $2$ lần hàng đó và hàng cuối trừ $4$ lần, được Bảng 1:

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|
| $s_1$ | $1$ | $0$ | $1$ | $0$ | $0$ | $30$ |
| $x_2$ | $0$ | $1$ | $0$ | $1$ | $0$ | $20$ |
| $s_3$ | $1$ | $0$ | $0$ | $-2$ | $1$ | $14$ |
| $\bar c$ và $-z$ | $2$ | $0$ | $0$ | $-4$ | $0$ | $-80$ |

Bước xoay thứ hai ($x_1$ vào, $s_3$ ra) dùng phần tử xoay $1$ ở hàng $s_3$, cột $x_1$: hàng $s_1$ trừ $1$ lần hàng đó và hàng cuối trừ $2$ lần, được bảng dừng:

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|
| $s_1$ | $0$ | $0$ | $1$ | $2$ | $-1$ | $16$ |
| $x_2$ | $0$ | $1$ | $0$ | $1$ | $0$ | $20$ |
| $x_1$ | $1$ | $0$ | $0$ | $-2$ | $1$ | $14$ |
| $\bar c$ và $-z$ | $0$ | $0$ | $0$ | $0$ | $-2$ | $-108$ |

**Câu (b).** Hai chi phí rút gọn ngoài cơ sở là $\bar c_{s_2}=0$ và $\bar c_{s_3}=-2$, đều không dương, nên theo Mệnh đề 07.29(b), $(14,20)$ tối ưu với $z^*=108$.

**Câu (c).** Cho $s_2$ vào; tỉ số $\tfrac{16}2=8$ (hàng $s_1$) và $\tfrac{20}1=20$ (hàng $x_2$), nên $s_1$ ra. Điểm mới $(30,12)$, $s_2=8$, $z=108$; cơ sở $\{x_1,x_2,s_2\}$ có $\bar c_{s_1}=0$, $\bar c_{s_3}=-2$, cũng tối ưu, và là đỉnh dừng của quy tắc Bland.

Theo Mệnh đề 07.29(a) tại bảng dừng, với mọi $x'\in P$,

$$
z(x')-108=0\cdot s_2'-2s_3' .
$$

Vậy $x'$ tối ưu khi và chỉ khi $s_3'=0$, tức $x_1+2x_2=54$. Trên đường đó, $x_2\le20$ cho $x_1\ge14$ và $x_1\le30$, nên tập nghiệm tối ưu là cạnh $\{x\mid x_1+2x_2=54,\ 14\le x_1\le30\}$ nối $(14,20)$ và $(30,12)$.

**Kiểm tra lại.** $2\cdot30+4\cdot12=108$ và $2\cdot14+4\cdot20=108$. Kết quả khớp câu (a) của Bài tập 07.7.
:::

::: exercise Bài tập 07.9 (Phương pháp đơn hình trên đa giác của Bài tập 07.6)
Xét bài toán cực đại $x_1+x_2$ dưới $x_1+2x_2\le4$, $3x_1+x_2\le6$, $x_1,x_2\ge0$, với biến bù $s_1$, $s_2$ và thứ tự cột $(x_1,x_2,s_1,s_2)$.

- (a) Chạy phương pháp đơn hình dạng bảng từ $(0,0)$ với quy tắc Bland; ghi mọi bảng.
- (b) Đọc nghiệm tối ưu, giá trị tối ưu và hai chi phí rút gọn $\bar c_{s_1}$, $\bar c_{s_2}$ ở bảng cuối. Kiểm tra lại hai chi phí rút gọn bằng (8.1)–(8.2) tại $(1{,}6;\,1{,}2)$ với cơ sở $\{x_1,x_2\}$.
- (c) Chạy lại với $x_2$ vào ở bước đầu; so sánh số bước xoay và đường đi.
:::

::: hint
Bảng đầu là $[A\mid b]$ vì cơ sở gồm hai biến bù. Ở (b), $A_B=\begin{bmatrix}1&2\\3&1\end{bmatrix}$ và hướng $d^{s_1}$ có $d_B=-A_B^{-1}(1,0)^T$.
:::

::: solution
**Câu (a).** Bảng 0 có hàng $s_1$: $(1,2,1,0\mid4)$, hàng $s_2$: $(3,1,0,1\mid6)$, hàng cuối $(1,1,0,0\mid0)$. Theo quy tắc Bland, $x_1$ vào; tỉ số $s_1$: $4$, $s_2$: $\tfrac63=2$, nên $s_2$ ra với phần tử xoay $3$.

Bảng 1: chia hàng $s_2$ cho $3$ được hàng $x_1$: $(1,\tfrac13,0,\tfrac13\mid2)$; hàng $s_1$ trừ hàng đó được $(0,\tfrac53,1,-\tfrac13\mid2)$; hàng cuối trừ hàng đó được $(0,\tfrac23,0,-\tfrac13\mid-2)$. Đỉnh $(2,0)$, $z=2$.

Chỉ $\bar c_{x_2}=\tfrac23$ dương, nên $x_2$ vào; tỉ số $s_1$: $2/\tfrac53=\tfrac65$, $x_1$: $2/\tfrac13=6$, nên $s_1$ ra với phần tử xoay $\tfrac53$.

Bảng 2 (chia hàng $s_1$ cho $\tfrac53$, trừ $\tfrac13$ lần hàng mới khỏi hàng $x_1$ và $\tfrac23$ lần khỏi hàng cuối) là:

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | vế phải |
|---|---:|---:|---:|---:|---:|
| $x_2$ | $0$ | $1$ | $\tfrac35$ | $-\tfrac15$ | $\tfrac65$ |
| $x_1$ | $1$ | $0$ | $-\tfrac15$ | $\tfrac25$ | $\tfrac85$ |
| $\bar c$ và $-z$ | $0$ | $0$ | $-\tfrac25$ | $-\tfrac15$ | $-\tfrac{14}5$ |

**Câu (b).** Hàng cuối không có phần tử dương, nên $(x_1,x_2)=(\tfrac85,\tfrac65)=(1{,}6;\,1{,}2)$ tối ưu với $z^*=\tfrac{14}5=2{,}8$, và $\bar c_{s_1}=-\tfrac25$, $\bar c_{s_2}=-\tfrac15$.

Kiểm tra bằng (8.1)–(8.2): $A_B=\begin{bmatrix}1&2\\3&1\end{bmatrix}$ có định thức $1-6=-5$.

- Hướng $d^{s_1}$: giải $A_Bd_B=-(1,0)^T$, tức $d_1+2d_2=-1$, $3d_1+d_2=0$, được $d_B=(\tfrac15,-\tfrac35)$; $\bar c_{s_1}=\tfrac15-\tfrac35=-\tfrac25$.
- Hướng $d^{s_2}$: giải $A_Bd_B=-(0,1)^T$, tức $d_1+2d_2=0$, $3d_1+d_2=-1$, được $d_B=(-\tfrac25,\tfrac15)$; $\bar c_{s_2}=-\tfrac25+\tfrac15=-\tfrac15$.

Hai số $-\bar c_{s_1}=\tfrac25$ và $-\bar c_{s_2}=\tfrac15$ là hai hệ số nhân $\mu_1$, $\mu_2$ ở câu (b) của Bài tập 07.6.

**Câu (c).** Với $x_2$ vào trước: tỉ số $s_1$: $\tfrac42=2$, $s_2$: $6$, nên $s_1$ ra; đỉnh $(0,2)$, $z=2$, và hàng cuối thành $(\tfrac12,0,-\tfrac12,0\mid-2)$. Khi đó $x_1$ vào; tỉ số $x_2$: $2/\tfrac12=4$, $s_2$: $4/\tfrac52=\tfrac85$, nên $s_2$ ra, tới $(1{,}6;\,1{,}2)$. Cả hai đường cần hai bước xoay.

**Kiểm tra lại.** Tại $(1{,}6;\,1{,}2)$: $1{,}6+2{,}4=4$ và $4{,}8+1{,}2=6$. Hướng $d^{s_1}=(\tfrac15,-\tfrac35,1,0)$ thỏa $\tfrac15-\tfrac65+1=0$ và $\tfrac35-\tfrac35=0$.
:::

::: exercise Bài tập 07.10 (Phát hiện mục tiêu không bị chặn)
Một biến thể của bài toán hộp hạt bỏ hai giới hạn $x_1\le30$, $x_1+2x_2\le54$ và thêm yêu cầu sản lượng loại 2 không vượt sản lượng loại 1 quá $6$ nghìn hộp: cực đại $z=2x_1+3x_2$ dưới $x_2\le20$, $-x_1+x_2\le6$, $x_1,x_2\ge0$.

- (a) Viết dạng chuẩn với biến bù $s_1$, $s_2$, thứ tự $(x_1,x_2,s_1,s_2)$.
- (b) Chạy phương pháp đơn hình từ $(0,0)$ với biến vào có chi phí rút gọn lớn nhất, đến khi thuật toán dừng. Nêu lý do dừng và tia làm $z$ tăng không bị chặn.
- (c) Chạy lại với quy tắc Bland và so sánh với (b).
- (d) Giới hạn nào của mô hình hộp hạt ban đầu, nếu được thêm lại, làm bài toán bị chặn.
:::

::: hint
Ở mỗi bước, xem cột của biến vào có hệ số nào làm một biến cơ sở giảm hay không.
:::

::: solution
**Câu (a).** $x_2+s_1=20$, $-x_1+x_2+s_2=6$, mọi biến không âm; cơ sở xuất phát $\{s_1,s_2\}$ khả thi vì vế phải không âm.

**Câu (b).**

- Bước 0, tại $(0,0)$: $\bar c_{x_1}=2$, $\bar c_{x_2}=3$; $x_2$ vào. Tỉ số $s_1$: $20$, $s_2$: $6$, nên $s_2$ ra. Đỉnh $(0,6)$, $z=18$.
- Bước 1: $x_2=6+x_1-s_2$, $s_1=14-x_1+s_2$, nên $z=18+5x_1-3s_2$; $x_1$ vào, chỉ $s_1$ giảm, với tỉ số $14$. Đỉnh $(14,20)$, $z=88$.
- Bước 2: $x_2=20-s_1$, $x_1=14-s_1+s_2$, nên $z=88-5s_1+2s_2$; $s_2$ vào, và $d^{s_2}$ có $d_{x_1}=1$, $d_{x_2}=0$, đều không âm.

Theo Mệnh đề 07.30(a), bài toán không bị chặn: dọc tia $(x_1,x_2)=(14+\theta,20)$, $\theta\ge0$, mục tiêu là $z=88+2\theta$.

**Câu (c).** Theo quy tắc Bland, $x_1$ vào ở bước 0; $s_1=20-x_2$ không phụ thuộc $x_1$ và $s_2=6+x_1-x_2$ tăng theo $x_1$, nên $d^{x_1}_B\ge0$. Thuật toán dừng ngay ở bước 4 của Thuật toán 07.31: bài toán không bị chặn dọc tia $(\theta,0)$, với $z=2\theta$.

**Câu (d).** Thêm lại $x_1\le30$ hoặc $x_1+2x_2\le54$ (tức $x_1\le54$): cùng với $x_2\le20$, miền bị chặn và khác rỗng, nên theo Định lý 07.23 bài toán có nghiệm tối ưu.

**Kiểm tra lại.** Trên tia $(14+\theta,20)$: $x_2=20\le20$ và $-(14+\theta)+20=6-\theta\le6$. Trên tia $(\theta,0)$: $0\le20$ và $-\theta\le6$.
:::

::: exercise Bài tập 07.11 (Đỉnh suy biến: quy tắc Dantzig, quy tắc Bland và bước xoay với $\theta^*=0$)
Đổi giới hạn giờ máy của bài toán hộp hạt thành $70$ giờ: cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le70$, $x\ge0$. Dạng chuẩn dùng biến bù $s_1,s_2,s_3$, thứ tự $(x_1,x_2,s_1,s_2,s_3)$.

- (a) Chứng minh $(30,20)$ là một đỉnh và nghiệm cơ sở khả thi tương ứng suy biến.
- (b) Chạy phương pháp đơn hình từ $(0,0)$ với quy tắc Dantzig; khi tỉ số hòa, chọn biến ra có chỉ số nhỏ nhất. Đếm số bước xoay.
- (c) Chạy lại với quy tắc Bland. Có bước xoay nào với $\theta^*=0$ không.
- (d) Ở bước có tỉ số hòa trong (b), cho $s_3$ ra thay cho $s_1$. Tính chi phí rút gọn tại cơ sở thu được, giải thích vì sao Mệnh đề 07.29(b) chưa kết luận được, rồi thực hiện bước xoay tiếp theo.
:::

::: hint
Ở (d), một biến cơ sở bằng $0$ có thể làm phép thử tỉ số cho $\theta^*=0$.
:::

::: solution
**Câu (a).** Tại $(30,20)$, ba ràng buộc $x_1\le30$, $x_2\le20$, $x_1+2x_2\le70$ cùng hoạt động: $30+40=70$. Hai hàng $(1,0)$, $(0,1)$ đã có hạng $2$, nên theo Định lý 07.10, $(30,20)$ là đỉnh. Ở dạng chuẩn, điểm là $(30,20,0,0,0)$ với hai thành phần dương, ít hơn $m=3$, nên mọi cơ sở của nó chứa một biến bù bằng $0$: nghiệm suy biến.

**Câu (b).**

- Bước 0, tại $(0,0)$: $x_2$ vào ($\bar c_{x_2}=3$); tỉ số $s_2$: $20$, $s_3$: $35$, nên $s_2$ ra. Đỉnh $(0,20)$, $z=60$.
- Bước 1: $x_2=20-s_2$, $s_1=30-x_1$, $s_3=30-x_1+2s_2$, $z=60+2x_1-3s_2$. $x_1$ vào; tỉ số $s_1$: $30$, $s_3$: $30$ hòa; $s_1$ ra vì chỉ số nhỏ hơn. Điểm $(30,20)$, $z=120$, cơ sở $\{x_1,x_2,s_3\}$ với $s_3=0$.
- Bước 2: $x_1=30-s_1$, $x_2=20-s_2$, nên $z=120-2s_1-3s_2$. Hai chi phí rút gọn âm: tối ưu sau hai bước xoay.

**Câu (c).** Theo quy tắc Bland, $x_1$ vào; tỉ số $s_1$: $30$, $s_3$: $70$, nên $s_1$ ra; đỉnh $(30,0)$, $z=60$. Khi đó $s_3=40+s_1-2x_2$, $z=60-2s_1+3x_2$; $x_2$ vào, tỉ số $s_2$: $20$, $s_3$: $20$ hòa, $s_2$ ra. Cơ sở $\{x_1,x_2,s_3\}$ cho $z=120-2s_1-3s_2$: tối ưu sau hai bước xoay, và cả hai đường không có bước nào với $\theta^*=0$.

**Câu (d).** Nếu $s_3$ ra, cơ sở là $\{x_1,x_2,s_1\}$ với $s_1=0$. Giải theo biến cơ sở: $x_2=20-s_2$, $x_1=70-2x_2-s_3=30+2s_2-s_3$, $s_1=30-x_1=-2s_2+s_3$. Mục tiêu

$$
\begin{aligned}
z&=2(30+2s_2-s_3)\\
&\quad+3(20-s_2)\\
&=120+s_2-2s_3,
\end{aligned}
$$

nên $\bar c_{s_2}=1>0$. Phần (b) và (c) của Mệnh đề 07.29 đều không áp dụng: có một chi phí rút gọn dương, và nghiệm suy biến. Cho $s_2$ vào: dọc $d^{s_2}$, $x_2$ giảm với tỉ số $20$ và $s_1$ giảm với tỉ số $\tfrac02=0$, nên $\theta^*=0$ và $s_1$ ra. Cơ sở mới $\{x_1,x_2,s_2\}$ cho $x_1=30-s_1$, $x_2=20+\tfrac12s_1-\tfrac12s_3$ và

$$
z=120-\tfrac12s_1-\tfrac32s_3,
$$

nên tối ưu. Điểm $(30,20)$ không đổi qua bước xoay: một đỉnh tối ưu suy biến có thể có một cơ sở với chi phí rút gọn dương.

**Kiểm tra lại.** Trên miền, $2x_1+3x_2\le2\cdot30+3\cdot20=120$, nên $z^*=120$ đúng là giá trị tối ưu.
:::

::: exercise Bài tập 07.12 (Pha I phát hiện bài toán không khả thi)
Bài toán hộp hạt có thêm hợp đồng buộc tổng sản lượng ít nhất $60$ nghìn hộp: cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1+x_2\ge60$, $x\ge0$.

- (a) Viết dạng chuẩn với biến bù $s_1,s_2,s_3$, biến dư $e_4$ và một biến nhân tạo $\tilde s$; viết bài toán phụ của pha I.
- (b) Chạy pha I bằng quy tắc Bland từ cơ sở $\{s_1,s_2,s_3,\tilde s\}$, thứ tự biến $(x_1,x_2,s_1,s_2,s_3,e_4,\tilde s)$.
- (c) Kết luận bằng Mệnh đề 07.43, rồi kiểm tra kết luận bằng một cận trên của $x_1+x_2$ trên miền hộp hạt.
- (d) Vận dụng vào AI. Một nhóm chia giờ GPU giữa $x_1$ giờ tinh chỉnh và $x_2$ giờ sinh dữ liệu dưới giới hạn tổng giờ $x_1+x_2\le100$, giới hạn năng lượng $3x_1+x_2\le180$ (kWh), năng lực kiểm duyệt dữ liệu sinh ra $x_2\le60$, và $x\ge0$, rồi thêm yêu cầu $x_1\ge70$. Chạy pha I theo quy tắc Bland và dùng chi phí rút gọn ở bảng cuối để chỉ ra giới hạn nào mâu thuẫn với yêu cầu mới.
:::

::: hint
Ở (c), chi phí rút gọn của $s_1$ và $s_3$ ở bảng cuối cho hai hệ số nhân của cận trên. Ở (d), ràng buộc có biến bù trong cơ sở ở bảng cuối không tham gia vào mâu thuẫn.
:::

::: solution
**Câu (a).** $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, $x_1+x_2-e_4+\tilde s=60$, mọi biến không âm. Bài toán phụ: cực đại $\tilde z=-\tilde s$.

**Câu (b).**

- Bước 1: $\tilde s=60-x_1-x_2+e_4$, nên $\tilde z=-60+x_1+x_2-e_4$. $x_1$ vào; tỉ số $s_1$: $30$, $s_3$: $54$, $\tilde s$: $60$, nên $s_1$ ra. Điểm $(30,0)$, $\tilde s=30$, $\tilde z=-30$.
- Bước 2: với $x_1=30-s_1$, $\tilde z=-30-s_1+x_2-e_4$. $x_2$ vào; tỉ số $s_2$: $20$, $s_3$: $\tfrac{24}2=12$, $\tilde s$: $30$, nên $s_3$ ra. Điểm $(30,12)$, $\tilde s=18$, $\tilde z=-18$.
- Bước 3: với $x_2=12+\tfrac12s_1-\tfrac12s_3$, $\tilde s=60-x_1-x_2+e_4=18+\tfrac12s_1+\tfrac12s_3+e_4$, nên $\tilde z=-18-\tfrac12s_1-\tfrac12s_3-e_4$. Mọi chi phí rút gọn âm: pha I dừng với $\tilde z^*=-18$.

**Câu (c).** $\tilde z^*=-18<0$, nên theo Mệnh đề 07.43(b), bài toán gốc không khả thi. Kiểm tra trực tiếp: với hai hệ số $\tfrac12$, $\tfrac12$ đọc từ chi phí rút gọn của $s_1$ và $s_3$,

$$
\begin{aligned}
x_1+x_2&=\tfrac12x_1+\tfrac12(x_1+2x_2)\\
&\le\tfrac12\cdot30+\tfrac12\cdot54\\
&=42<60 .
\end{aligned}
$$

**Câu (d).** Dạng chuẩn: $x_1+x_2+s_1=100$, $3x_1+x_2+s_2=180$, $x_2+s_3=60$, $x_1-e_4+\tilde s=70$, mọi biến không âm; bài toán phụ cực đại $\tilde z=-\tilde s$, thứ tự biến $(x_1,x_2,s_1,s_2,s_3,e_4,\tilde s)$.

- Bước 1: $\tilde z=-70+x_1-e_4$, nên chỉ $\bar c_{x_1}=1$ dương; $x_1$ vào. Tỉ số $s_1$: $100$, $s_2$: $\tfrac{180}3=60$, $\tilde s$: $70$, nên $s_2$ ra. Điểm $(60,0)$, $\tilde s=10$.
- Bước 2: $x_1=60-\tfrac13x_2-\tfrac13s_2$, nên $\tilde s=70-x_1+e_4=10+\tfrac13x_2+\tfrac13s_2+e_4$ và $\tilde z=-10-\tfrac13x_2-\tfrac13s_2-e_4$. Mọi chi phí rút gọn âm: pha I dừng với $\tilde z^*=-10<0$.

Theo Mệnh đề 07.43(b), yêu cầu mới không thực hiện được. Biến bù $s_1$, $s_3$ nằm trong cơ sở (bằng $40$ và $60$), nên giới hạn tổng giờ và kiểm duyệt không tham gia; hệ số $-\bar c_{s_2}=\tfrac13$ chỉ ra giới hạn năng lượng: $x_1\le\tfrac13(3x_1+x_2)\le60<70$. Mức thiếu hụt nhỏ nhất là $-\tilde z^*=10$ giờ, nên hạn mức năng lượng phải tăng ít nhất $30$ kWh.

**Kiểm tra lại.** Ở (b), $-\tilde z^*=18=60-42$. Ở (d), tại $(60,0)$: $60\le100$, $180\le180$, $0\le60$, và $70-60=10$.
:::

### 8.7. Đọc thêm: số bước của phương pháp đơn hình

Chặn $\binom nm$ của Định lý 07.32 không cho một số bước chấp nhận được, và bài toán Klee–Minty cho thấy quy tắc Dantzig có thể đi qua mọi đỉnh.

:::: reading Bài toán Klee–Minty và số bước trong trường hợp xấu nhất

::: example Ví dụ 07.25 (Bài toán Klee–Minty hai biến)
**Dữ kiện.** Cực đại $z=10x_1+x_2$ dưới $x_1\le1$, $20x_1+x_2\le100$, $x_1,x_2\ge0$. Dạng chuẩn: $x_1+s_1=1$, $20x_1+x_2+s_2=100$, thứ tự $(x_1,x_2,s_1,s_2)$. Miền là tứ giác với bốn đỉnh $(0,0)$, $(1,0)$, $(1,80)$, $(0,100)$. Xuất phát từ $(0,0)$ với $B=\{s_1,s_2\}$, quy tắc Dantzig.

**Bước 1.** $\bar c_{x_1}=10$, $\bar c_{x_2}=1$; $x_1$ vào. Tỉ số $s_1$: $1$, $s_2$: $\tfrac{100}{20}=5$, nên $s_1$ ra. Đỉnh $(1,0)$, $z=10$.

**Bước 2.** Với $x_1=1-s_1$ và $s_2=80+20s_1-x_2$: $z=10-10s_1+x_2$, nên $\bar c_{x_2}=1$, $\bar c_{s_1}=-10$; $x_2$ vào. Tỉ số $s_2$: $80$; $s_2$ ra. Đỉnh $(1,80)$, $z=90$.

**Bước 3.** Với $x_1=1-s_1$ và $x_2=80+20s_1-s_2$: $z=90+10s_1-s_2$, nên $\bar c_{s_1}=10$; $s_1$ vào. Dọc $d^{s_1}$, $x_1$ giảm và $x_2$ tăng; tỉ số $x_1$: $1$, nên $x_1$ ra. Đỉnh $(0,100)$, $z=100$.

**Bước 4.** Với $s_1=1-x_1$ và $x_2=100-20x_1-s_2$: $z=100-10x_1-s_2$. Hai chi phí rút gọn âm, nên $(0,100)$ tối ưu.

**Diễn giải.** Thuật toán đi qua cả bốn đỉnh, với $3=2^2-1$ bước xoay; nếu ở bước 1 chọn $x_2$, thuật toán tới $(0,100)$ sau một bước.

**Kiểm tra lại.** $10x_1+x_2=(20x_1+x_2)-10x_1\le100$ vì $x_1\ge0$, với dấu bằng tại $(0,100)$. Các giá trị $0$, $10$, $90$, $100$ tăng chặt, đúng Mệnh đề 07.30(b) với $\theta^*>0$.
:::

Miền của Ví dụ 07.25 gần với hình chữ nhật $[0,1]\times[0,100]$, bị làm nghiêng bởi hệ số $20$; hệ số lợi ích lớn của $x_1$ khiến quy tắc Dantzig chọn $x_1$ trước, và đường đi vòng qua hai đỉnh còn lại.

::: remark Nhận xét 07.45 (Số bước trong trường hợp xấu nhất)
Họ bài toán Klee–Minty với $n$ biến là bài toán cực đại sau, với $n$ ràng buộc và điều kiện không âm:

$$
\begin{aligned}
\max\quad&\sum_{j=1}^n10^{n-j}x_j\\
&2\sum_{j=1}^{i-1}10^{i-j}x_j+x_i\\
&\quad\le100^{i-1},\\
&i=1,\ldots,n,\quad x\ge0 .
\end{aligned}
$$

Miền là một khối gần hình hộp với $2^n$ đỉnh, và quy tắc Dantzig xuất phát từ $x=0$ đi qua cả $2^n$ đỉnh, tức $2^n-1$ bước xoay (Vanderbei 2014, §4.4, tr. 41–44); với $n=2$, đó là Ví dụ 07.25. Các ví dụ cùng loại đã được dựng cho hầu hết các quy tắc chọn được đề xuất, và chưa biết có quy tắc nào bảo đảm số bước đa thức hay không (tr. 44).

Trên các bài toán dạng (1.1) với $m$ ràng buộc, $n$ biến, sinh ngẫu nhiên và có nghiệm tối ưu, Vanderbei (2014, §4.5, tr. 49) đo được số bước xoay $T\approx0{,}150\min(m,n)^{1{,}70}$.
:::

::: exercise Bài tập 07.13 (Bài toán Klee–Minty và đổi đơn vị)
Xét bài toán Klee–Minty hai biến: cực đại $z=10x_1+x_2$ dưới $x_1\le1$, $20x_1+x_2\le100$, $x\ge0$. Xuất phát từ $(0,0)$, quy tắc Dantzig cần ba bước xoay, qua $(1,0)$ và $(1,80)$, để tới nghiệm tối ưu $(0,100)$ với $z^*=100$.

- (a) Đổi đơn vị của biến thứ nhất bằng $y_1=20x_1$. Viết lại bài toán theo $(y_1,x_2)$.
- (b) Chạy phương pháp đơn hình với quy tắc Dantzig từ $(0,0)$ trên bài toán mới; đếm số bước xoay.
- (c) Chạy lại với quy tắc Bland, thứ tự $(y_1,x_2,s_1,s_2)$; so sánh với (b) và với ba bước của bài toán gốc.
- (d) Giải thích vì sao đổi đơn vị làm đổi đường đi của quy tắc Dantzig nhưng không đổi đường đi của quy tắc Bland.
:::

::: hint
Với $y_1=20x_1$, lợi ích $10x_1$ thành $\tfrac12y_1$. Ở (d), so sánh cách mỗi quy tắc dùng giá trị của $\bar c_j$.
:::

::: solution
**Câu (a).** Cực đại $z=\tfrac12y_1+x_2$ dưới $y_1\le20$, $y_1+x_2\le100$, $y_1,x_2\ge0$; dạng chuẩn $y_1+s_1=20$, $y_1+x_2+s_2=100$.

**Câu (b).** Tại $(0,0)$: $\bar c_{y_1}=\tfrac12$, $\bar c_{x_2}=1$; quy tắc Dantzig chọn $x_2$. Tỉ số $s_2$: $100$, nên $s_2$ ra; điểm $(y_1,x_2)=(0,100)$, $z=100$. Với $x_2=100-y_1-s_2$: $z=100-\tfrac12y_1-s_2$, tối ưu. Chỉ một bước xoay.

**Câu (c).** Theo quy tắc Bland:

- $y_1$ vào; tỉ số $s_1$: $20$, $s_2$: $100$; $s_1$ ra; điểm $(20,0)$, $z=10$.
- $z=10-\tfrac12s_1+x_2$; $x_2$ vào; tỉ số $s_2$: $80$; điểm $(20,80)$, $z=90$.
- $x_2=80+s_1-s_2$, nên $z=90+\tfrac12s_1-s_2$; $s_1$ vào; tỉ số $y_1$: $20$; điểm $(0,100)$, $z=100$, và $z=100-\tfrac12y_1-s_2$: tối ưu.

Quy tắc Bland cần ba bước xoay, đúng đường của quy tắc Dantzig trên bài toán gốc.

**Câu (d).** Đổi $x_j$ thành $y_j=\alpha x_j$ với $\alpha>0$ chia $\bar c_j$ cho $\alpha$ và giữ dấu của mọi chi phí rút gọn. Quy tắc Dantzig so sánh độ lớn của các $\bar c_j$, nên lựa chọn đổi khi $\bar c_{x_1}=10$ thành $\bar c_{y_1}=\tfrac12$. Quy tắc Bland chỉ dùng dấu và thứ tự chỉ số, và tập chỉ số đạt cực tiểu ở (8.3) không đổi: mọi tỉ số cùng nhân với $\alpha$ khi biến vào được đổi đơn vị, còn tử và mẫu cùng nhân với $\alpha$ khi một biến cơ sở được đổi đơn vị.

**Kiểm tra lại.** Tại $(y_1,x_2)=(0,100)$: $0\le20$, $0+100\le100$, $z=100$, khớp $z^*$ của bài toán gốc tại $(0,100)$.
:::

::::

## 9. Trạng thái và phương trình Bellman

Với quy hoạch tuyến tính, tập ứng viên là các đỉnh, và Thuật toán 07.44 với quy tắc Bland dừng trên mọi bài toán dạng chuẩn. Bài toán thứ hai của bài, đường đi trên đồ thị tầng, gồm một chuỗi quyết định. Cấu trúc được khai thác ở đây là chi phí cộng theo giai đoạn và phần tương lai chỉ phụ thuộc vị trí hiện tại.

### 9.1. Bài toán quyết định theo giai đoạn

Mỗi đường từ $\mathrm s$ tới $\mathrm t$ trên đồ thị tầng gồm ba cạnh.

::: example Ví dụ 07.26 (Liệt kê bốn đường đi)
**Dữ kiện.** Đồ thị tầng: $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$. Cần đường $\mathrm s\to\mathrm t$ có tổng chi phí nhỏ nhất.

**Liệt kê.**

| Đường | Tổng chi phí |
|---|---:|
| $\mathrm s\to\mathrm A\to\mathrm C\to\mathrm t$ | $2+4+3=9$ |
| $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ | $2+2+1=5$ |
| $\mathrm s\to\mathrm B\to\mathrm C\to\mathrm t$ | $5+1+3=9$ |
| $\mathrm s\to\mathrm B\to\mathrm D\to\mathrm t$ | $5+3+1=9$ |

Đường tối ưu là $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ với chi phí $5$.

**Phần lặp lại.** Mỗi đoạn cuối được cộng hai lần; liệt kê cần $8$ phép cộng và $3$ phép so sánh.

**Kiểm tra lại.** Có $2\cdot2=4$ đường, bằng số cách chọn một nút ở tầng 1 và một nút ở tầng 2.
:::

Với $N$ tầng, một đoạn đuôi chung được tính lại cho mọi lịch sử đi tới đầu đoạn. Định nghĩa sau gom các lịch sử có cùng phần tương lai vào một trạng thái.

::: definition Định nghĩa 07.46 (Bài toán quyết định hữu hạn tất định)
**Dữ kiện.** Số giai đoạn $N\ge1$. Với $k=0,\ldots,N$, *tập trạng thái* (state space) $X_k$ hữu hạn, khác rỗng. Với $k=0,\ldots,N-1$ và $\xi\in X_k$:

- *tập điều khiển* (control set) cho phép $U_k(\xi)$ hữu hạn, khác rỗng;
- *hàm chuyển trạng thái* (transition function) $f_k$, với $f_k(\xi,u)\in X_{k+1}$ cho mọi $u\in U_k(\xi)$;
- *chi phí giai đoạn* (stage cost) $g_k(\xi,u)\in\mathbb R$.

*Chi phí cuối* (terminal cost) $g_N:X_N\to\mathbb R$.

**Chuỗi điều khiển.** Từ trạng thái $\xi\in X_k$ ở giai đoạn $k$, một *chuỗi điều khiển chấp nhận được* là $(u_k,\ldots,u_{N-1})$ với $\xi_k=\xi$, $u_{k'}\in U_{k'}(\xi_{k'})$ và $\xi_{k'+1}=f_{k'}(\xi_{k'},u_{k'})$ cho $k'=k,\ldots,N-1$.

**Chi phí.** Chi phí của chuỗi đó là

$$
\begin{aligned}
&G_k(\xi;u_k,\ldots,u_{N-1})\\
&\quad=\sum_{k'=k}^{N-1}g_{k'}(\xi_{k'},u_{k'})\\
&\qquad+g_N(\xi_N).
\end{aligned}
\tag{9.1}
$$

**Bài toán.** Cho trạng thái đầu $\xi_0\in X_0$, tìm chuỗi chấp nhận được từ $\xi_0$ ở giai đoạn $0$ có chi phí $G_0$ nhỏ nhất.
:::

Bài toán trong Định nghĩa 07.46 thỏa (D1)–(D4).

::: example Ví dụ 07.27 (Đồ thị tầng là một bài toán quyết định hữu hạn tất định)
**Dữ kiện.** Đồ thị tầng: $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$.

**Các thành phần.**

- $N=3$; $X_0=\{\mathrm s\}$, $X_1=\{\mathrm A,\mathrm B\}$, $X_2=\{\mathrm C,\mathrm D\}$, $X_3=\{\mathrm t\}$.
- Điều khiển là nút đến của cạnh đi ra: $U_0(\mathrm s)=\{\mathrm A,\mathrm B\}$, $U_1(\mathrm A)=U_1(\mathrm B)=\{\mathrm C,\mathrm D\}$, $U_2(\mathrm C)=U_2(\mathrm D)=\{\mathrm t\}$.
- Chuyển trạng thái $f_k(\xi,u)=u$; chi phí giai đoạn $g_k(\xi,u)=g(\xi,u)$; chi phí cuối $g_3(\mathrm t)=0$.

**Chi phí một chuỗi.** Chuỗi $(\mathrm A,\mathrm D,\mathrm t)$ từ $\mathrm s$ cho $\xi_1=\mathrm A$, $\xi_2=\mathrm D$, $\xi_3=\mathrm t$ và theo (9.1), $G_0=2+2+1+0=5$.

**Kiểm tra lại.** (D1)–(D4) thỏa: các tập hữu hạn, mỗi cạnh dẫn tới đúng một nút, chi phí là tổng chi phí cạnh, và chi phí cạnh không phụ thuộc đường đã đi.
:::

Trạng thái đủ là một tính chất của cách chọn trạng thái; nhận xét sau nêu cách kiểm tra và cách sửa.

::: remark Nhận xét 07.47 (Trạng thái đủ và mở rộng trạng thái)
**Kiểm tra.** Một lựa chọn trạng thái là đủ khi, biết trạng thái hiện tại, mọi chi phí và chuyển tiếp về sau không còn phụ thuộc vào lịch sử.

**Một trường hợp nút không đủ.** Giả sử cạnh $\mathrm C\to\mathrm t$ có thêm chi phí $4$ khi nút $\mathrm C$ được đạt từ $\mathrm A$. Chi phí tương lai từ $\mathrm C$ là $7$ sau $\mathrm s\to\mathrm A\to\mathrm C$ và $3$ sau $\mathrm s\to\mathrm B\to\mathrm C$, nên nút $\mathrm C$ không còn là trạng thái đủ.

**Sửa.** Mở rộng trạng thái thành cặp (nút trước, nút hiện tại): $(\mathrm A,\mathrm C)$ và $(\mathrm B,\mathrm C)$ là hai trạng thái với chi phí tương lai xác định, đổi lại số trạng thái tăng.
:::

### 9.2. Chi phí tối ưu còn lại và phương trình Bellman

Về mặt ý tưởng, từ một trạng thái, phần tương lai là một bài toán con độc lập với quá khứ, nên chi phí tối ưu của nó chỉ cần tính một lần cho mọi lịch sử đi tới trạng thái này.

![Sơ đồ "Nhiều lịch sử, một phần tương lai": ba lịch sử s→A→C, s→B→C và "lịch sử khác" cùng đi vào nút C (trạng thái đủ), từ đó bài toán con "chi phí nhỏ nhất từ C tới đích" được tính một lần. Chú thích: chỉ gộp khi quá khứ không còn ảnh hưởng tới tương lai ngoài thông tin trong trạng thái.](img/lec-07/dp-state-sufficiency.svg)

Từ $\mathrm C$, chi phí tối ưu tới đích là $3$ cho mọi lịch sử, nên đoạn $\mathrm C\to\mathrm t$ chỉ cần tính một lần; dòng chú thích dưới hình là giả thiết (D4).

::: definition Định nghĩa 07.48 (Chi phí tối ưu còn lại)
Trong bài toán của Định nghĩa 07.46, với $k=0,\ldots,N$ và $\xi\in X_k$, *chi phí tối ưu còn lại* (optimal cost-to-go), còn gọi là *hàm giá trị* (value function), là giá trị nhỏ nhất của $G_k(\xi;u_k,\ldots,u_{N-1})$ trên tập $\mathcal U_k(\xi)$ các chuỗi điều khiển $(u_k,\ldots,u_{N-1})$ chấp nhận được từ $\xi$ ở giai đoạn $k$:

$$
J_k(\xi)=\min_{\mathcal U_k(\xi)}G_k .
\tag{9.2}
$$

Quy ước $J_N(\xi)=g_N(\xi)$, vì ở giai đoạn $N$ không còn điều khiển nào.
:::

Định nghĩa có nghĩa vì $\mathcal U_k(\xi)$ hữu hạn, khác rỗng, và $J_0(\xi_0)$ là chi phí tối ưu của toàn bài toán. Nhầm lẫn thường gặp là coi $J_k(\xi)$ là chi phí của bước kế tiếp, trong khi nó là toàn bộ chi phí tối ưu còn lại.

::: theorem Định lý 07.49 (Phương trình Bellman) — chứng minh đầy đủ
**Giả thiết.** Bài toán quyết định hữu hạn tất định của Định nghĩa 07.46, thỏa (D1)–(D4); $J_k$ theo Định nghĩa 07.48.

**Kết luận.** Với $k=N-1,\ldots,0$ và mọi $\xi\in X_k$,

$$
\begin{aligned}
&J_k(\xi)=\min_{u\in U_k(\xi)}\bigl\{g_k(\xi,u)\\
&\qquad+J_{k+1}\bigl(f_k(\xi,u)\bigr)\bigr\},
\end{aligned}
\tag{9.3}
$$

cùng điều kiện cuối $J_N(\xi)=g_N(\xi)$ với $\xi\in X_N$.
:::

::: proof Chứng minh Định lý 07.49
**Lộ trình.** Tách chi phí của một chuỗi thành chi phí giai đoạn đầu cộng chi phí phần đuôi, rồi chứng minh hai bất đẳng thức ngược chiều.

Cố định $k<N$ và $\xi\in X_k$. Ký hiệu cục bộ $\Omega(u)=g_k(\xi,u)+J_{k+1}(f_k(\xi,u))$ cho $u\in U_k(\xi)$.

**Bước 1 (tách chi phí của một chuỗi).** Một chuỗi chấp nhận được từ $\xi$ ở giai đoạn $k$ là $(u,u_{k+1},\ldots,u_{N-1})$, với $u\in U_k(\xi)$ và $(u_{k+1},\ldots,u_{N-1})$ chấp nhận được từ $\xi'=f_k(\xi,u)$ ở giai đoạn $k+1$. Theo (9.1),

$$
\begin{aligned}
&G_k(\xi;u,u_{k+1},\ldots,u_{N-1})\\
&\quad=g_k(\xi,u)\\
&\qquad+G_{k+1}(\xi';u_{k+1},\ldots,u_{N-1}).
\end{aligned}
$$

Đẳng thức này dùng (D3) và (D4).

**Bước 2 ($J_k(\xi)\ge\min_u\Omega(u)$).** Theo Định nghĩa 07.48, $G_{k+1}(\xi';\ldots)\ge J_{k+1}(\xi')$ cho mọi chuỗi từ $\xi'$. Thay vào Bước 1: mọi chuỗi từ $\xi$ có chi phí ít nhất $\Omega(u)\ge\min_u\Omega(u)$, với $u$ là điều khiển đầu của chuỗi. Lấy cực tiểu theo mọi chuỗi cho $J_k(\xi)\ge\min_u\Omega(u)$.

**Bước 3 ($J_k(\xi)\le\min_u\Omega(u)$).** Chọn $\hat u$ đạt $\min_u\Omega(u)$, có vì $U_k(\xi)$ hữu hạn, khác rỗng. Với $\hat\xi'=f_k(\xi,\hat u)$, chọn một chuỗi tối ưu $(\hat u_{k+1},\ldots,\hat u_{N-1})$ từ $\hat\xi'$, có vì tập chuỗi hữu hạn, khác rỗng; chi phí của nó là $J_{k+1}(\hat\xi')$. Chuỗi ghép $(\hat u,\hat u_{k+1},\ldots,\hat u_{N-1})$ chấp nhận được từ $\xi$, và theo Bước 1 có chi phí $\Omega(\hat u)$. Do đó $J_k(\xi)\le \Omega(\hat u)=\min_u\Omega(u)$.

**Bước 4 (kết luận).** Bước 2 và Bước 3 cho (9.3). Điều kiện cuối là quy ước của Định nghĩa 07.48. $\square$
:::

Vế phải của (9.3) chỉ cần $J_{k+1}$, nên các hàm $J_N,J_{N-1},\ldots,J_0$ tính được lần lượt từ cuối về đầu.

Mệnh đề sau là *nguyên lý tối ưu* (principle of optimality); MIT OpenCourseWare 15.093J (2009, Bài giảng 16, slide 9) dùng cùng tên cho phép đệ quy (9.3).

::: proposition Mệnh đề 07.50 (Nguyên lý tối ưu) — chứng minh đầy đủ
**Giả thiết.** Như Định lý 07.49. Chuỗi $(u_0^\circ,\ldots,u_{N-1}^\circ)$ tối ưu từ $\xi_0$, sinh các trạng thái $\xi_0^\circ=\xi_0,\xi_1^\circ,\ldots,\xi_N^\circ$.

**Kết luận.** Với mọi $k$, phần đuôi $(u_k^\circ,\ldots,u_{N-1}^\circ)$ tối ưu cho bài toán con từ $\xi_k^\circ$ ở giai đoạn $k$, tức chi phí của nó bằng $J_k(\xi_k^\circ)$.
:::

::: proof Chứng minh Mệnh đề 07.50
**Lộ trình.** Phản chứng: một đuôi tốt hơn ghép với phần đầu cho một chuỗi tốt hơn chuỗi tối ưu.

**Bước 1 (giả sử ngược lại).** Giả sử có chuỗi $(u_k',\ldots,u_{N-1}')$ từ $\xi_k^\circ$ có chi phí nhỏ hơn chi phí của đuôi $(u_k^\circ,\ldots,u_{N-1}^\circ)$.

**Bước 2 (ghép).** Chuỗi $(u_0^\circ,\ldots,u_{k-1}^\circ,u_k',\ldots,u_{N-1}')$ chấp nhận được từ $\xi_0$, vì phần đầu vẫn dẫn tới $\xi_k^\circ$. Theo (9.1), chi phí của nó bằng chi phí phần đầu cộng chi phí đuôi mới, nhỏ hơn chi phí của chuỗi tối ưu ban đầu, mâu thuẫn. $\square$
:::

**Trong học máy.** Phương trình (9.3) là dạng tất định, hữu hạn của phương trình Bellman trong học tăng cường (reinforcement learning; Murphy 2023, §34.5, tr. 1128–1132).

::: example Ví dụ 07.28 (Phương trình Bellman trên đồ thị tầng)
**Dữ kiện.** Đồ thị tầng: $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$; $N=3$, $g_3(\mathrm t)=0$, điều khiển là nút đến.

**Giai đoạn 3.** $J_3(\mathrm t)=0$.

**Giai đoạn 2.** Mỗi nút có một cạnh tới $\mathrm t$:

$$
\begin{aligned}
J_2(\mathrm C)&=3+0=3,\\
J_2(\mathrm D)&=1+0=1 .
\end{aligned}
$$

**Giai đoạn 1.**

$$
\begin{aligned}
J_1(\mathrm A)&=\min\{4+3,\ 2+1\}=3,\\
J_1(\mathrm B)&=\min\{1+3,\ 3+1\}=4 .
\end{aligned}
$$

**Giai đoạn 0.**

$$
\begin{aligned}
J_0(\mathrm s)&=\min\{2+3,\ 5+4\}\\
&=5 .
\end{aligned}
$$

**Kiểm tra lại.** Liệt kê ở Ví dụ 07.26 cho chi phí nhỏ nhất $5=J_0(\mathrm s)$; đuôi $\mathrm A\to\mathrm D\to\mathrm t$ của đường tối ưu có chi phí $3=J_1(\mathrm A)$, đúng Mệnh đề 07.50.
:::

![Đồ thị tầng với nhãn J=5 tại s, J=3 tại A, J=4 tại B, J=3 tại C, J=1 tại D, J=0 tại t; đường s–A–D–t tô đậm.](img/lec-07/dp-bellman-values.svg)

Trên hình, $J(\mathrm A)$ là $J_1(\mathrm A)$, vì mỗi nút thuộc đúng một tầng. Lựa chọn tại $\mathrm s$ so sánh $2+J_1(\mathrm A)=5$ với $5+J_1(\mathrm B)=9$, không so sánh riêng hai chi phí cạnh $2$ và $5$.

::: exercise Bài tập 07.14 (Lịch bước học hai giai đoạn)
Một quá trình huấn luyện được mô tả thô bằng ba mức mất mát, ký hiệu $3$ (cao), $2$ (vừa), $1$ (thấp). Ở mỗi giai đoạn $k=0,1$ chọn một trong hai điều khiển: bước học lớn $\eta_+$ hoặc bước học nhỏ $\eta_-$. Bảng chuyển trạng thái tất định:

| Mức hiện tại | Sau bước lớn $\eta_+$ | Sau bước nhỏ $\eta_-$ |
|---|---|---|
| $3$ (cao) | $2$ | $3$ |
| $2$ (vừa) | $2$ | $1$ |
| $1$ (thấp) | $2$ | $1$ |

Chi phí giai đoạn là số giờ GPU: bước lớn $1$ giờ, bước nhỏ $2$ giờ. Chi phí cuối theo mức mất mát sau giai đoạn $1$: mức $1$ chịu $0$, mức $2$ chịu $3$, mức $3$ chịu $6$. Trạng thái đầu là mức $3$.

- (a) Nêu $N$, $X_k$, $U_k$, $f_k$, $g_k$, $g_N$ theo Định nghĩa 07.46.
- (b) Tính $J_2$, $J_1$ và $J_0(3)$ bằng (9.3).
- (c) Kiểm tra kết quả bằng liệt kê bốn chuỗi.
:::

::: hint
$J_1(\xi)$ cần cho cả ba mức $\xi$.
:::

::: solution
**Câu (a).** $N=2$; $X_0=\{3\}$, $X_1=X_2=\{1,2,3\}$; $U_k(\xi)=\{\eta_+,\eta_-\}$; $f_k$ theo bảng; $g_k(\xi,\eta_+)=1$, $g_k(\xi,\eta_-)=2$; $g_2(1)=0$, $g_2(2)=3$, $g_2(3)=6$.

**Câu (b).** $J_2=g_2$. Giai đoạn 1:

- $J_1(3)=\min\{1+3,\ 2+6\}=4$, chọn $\eta_+$;
- $J_1(2)=\min\{1+3,\ 2+0\}=2$, chọn $\eta_-$;
- $J_1(1)=\min\{1+3,\ 2+0\}=2$, chọn $\eta_-$.

Giai đoạn 0: $J_0(3)=\min\{1+J_1(2),\ 2+J_1(3)\}=\min\{1+2,\ 2+4\}$, tức $J_0(3)=3$, chọn $\eta_+$. Lịch tối ưu: bước lớn rồi bước nhỏ, chi phí $3$ giờ.

**Câu (c).** Bốn chuỗi từ mức $3$:

| Chuỗi | Mức đi qua | Chi phí |
|---|---|---:|
| $\eta_+,\eta_+$ | $2$, $2$ | $1+1+3=5$ |
| $\eta_+,\eta_-$ | $2$, $1$ | $1+2+0=3$ |
| $\eta_-,\eta_+$ | $3$, $2$ | $2+1+3=6$ |
| $\eta_-,\eta_-$ | $3$, $3$ | $2+2+6=10$ |

**Kiểm tra lại.** Nhỏ nhất là $3$ với chuỗi $\eta_+,\eta_-$, khớp $J_0(3)$.
:::

## 10. Phép giải ngược, chính sách và chi phí tính toán

Phương trình (9.3) cho mọi $J_k$ từ cuối về đầu nhưng chưa cho chuỗi điều khiển. Ghép nó với một lượt đi từ đầu về cuối cho đường tối ưu mà không liệt kê lại. Số phép tính của cách này được so với $2^{20}$ chuỗi khi $N=20$.

### 10.1. Chính sách và lượt dựng xuôi

Khi tính $J_k(\xi)$ bằng (9.3), phép lấy cực tiểu chỉ ra một điều khiển đạt cực tiểu tại $\xi$, và ghi lại điều khiển đó cho mọi trạng thái là đủ để dựng đường tối ưu.

::: definition Định nghĩa 07.51 (Chính sách)
Trong bài toán của Định nghĩa 07.46, một *chính sách* (policy) là một dãy ánh xạ $u_0^*,\ldots,u_{N-1}^*$, trong đó $u_k^*$ gán cho mỗi $\xi\in X_k$ một điều khiển $u_k^*(\xi)\in U_k(\xi)$. Chính sách đạt cực tiểu là chính sách có

$$
\begin{aligned}
&u_k^*(\xi)\in\operatorname{argmin}_{u\in U_k(\xi)}\\
&\quad\bigl\{g_k(\xi,u)\\
&\qquad+J_{k+1}\bigl(f_k(\xi,u)\bigr)\bigr\}
\end{aligned}
\tag{10.1}
$$

với mọi $k$ và mọi $\xi\in X_k$.
:::

Chính sách là một quy tắc cho mọi trạng thái, khác với một chuỗi điều khiển. Từ một chính sách và trạng thái đầu $\xi_0$, *lượt xuôi* (forward pass) sinh một chuỗi bằng $u_k=u_k^*(\xi_k)$ và $\xi_{k+1}=f_k(\xi_k,u_k)$; *lượt ngược* (backward pass) của phương trình (9.3) cho các giá trị $J_k$.

::: algorithm Thuật toán 07.52 (Giải ngược Bellman)
**Đầu vào.** Bài toán của Định nghĩa 07.46: $N$; trạng thái đầu $\xi_0$; các tập $X_k$, $U_k(\xi)$ hữu hạn, khác rỗng; các hàm $f_k$, $g_k$, $g_N$.

**Các bước.**

1. Đặt $J_N(\xi)=g_N(\xi)$ với mọi $\xi\in X_N$.
2. Với $k=N-1,\ldots,0$ và mỗi $\xi\in X_k$: tính $J_k(\xi)$ bằng (9.3) và lưu một điều khiển $u_k^*(\xi)$ đạt cực tiểu.
3. Lượt xuôi: từ $\xi_0$, với $k=0,\ldots,N-1$, đặt $u_k=u_k^*(\xi_k)$ và $\xi_{k+1}=f_k(\xi_k,u_k)$.

**Đầu ra.** Giá trị $J_0(\xi_0)$, chính sách $u_0^*,\ldots,u_{N-1}^*$ và chuỗi $(u_0,\ldots,u_{N-1})$.

**Điều kiện dừng.** Dừng sau lượt xuôi $N$ bước.

**Chi phí.** Bước 2 xét mỗi cặp $(\xi,u)$ với $\xi\in X_k$, $u\in U_k(\xi)$ đúng một lần; bước 3 cần $N$ lần tra bảng.
:::

Ở bước 2, $J_k(\xi)$ được tính cho mọi $\xi\in X_k$, vì trước khi có các giá trị $J$, ta chưa biết đường tối ưu đi qua đâu. Chuỗi của bước 3 là tối ưu theo mệnh đề sau.

::: proposition Mệnh đề 07.53 (Chính sách đạt cực tiểu cho chuỗi tối ưu) — chứng minh đầy đủ
**Giả thiết.** Bài toán của Định nghĩa 07.46, thỏa (D1)–(D4); $J_k$ theo Định nghĩa 07.48; $u_0^*,\ldots,u_{N-1}^*$ là một chính sách đạt cực tiểu.

**Kết luận.** Với mọi $k$ và $\xi\in X_k$, chuỗi sinh bởi chính sách từ $\xi$ ở giai đoạn $k$ có chi phí $J_k(\xi)$. Đặc biệt, chuỗi của lượt xuôi trong Thuật toán 07.52 là một chuỗi tối ưu từ $\xi_0$.
:::

::: proof Chứng minh Mệnh đề 07.53
**Lộ trình.** Quy nạp ngược theo $k$, dùng (9.3) tại điều khiển mà chính sách chọn.

Gọi $\Pi_k(\xi)$ là chi phí (9.1) của chuỗi sinh bởi chính sách từ $\xi$ ở giai đoạn $k$.

**Bước 1 (giai đoạn $N$).** Không còn điều khiển, nên $\Pi_N(\xi)=g_N(\xi)=J_N(\xi)$.

**Bước 2 (quy nạp ngược).** Giả sử $\Pi_{k+1}=J_{k+1}$ trên $X_{k+1}$. Với $\xi\in X_k$, đặt $u=u_k^*(\xi)$ và $\xi'=f_k(\xi,u)$. Chuỗi sinh bởi chính sách từ $\xi$ gồm $u$ rồi chuỗi sinh bởi chính sách từ $\xi'$, nên theo (9.1) và giả thiết quy nạp,

$$
\begin{aligned}
\Pi_k(\xi)&=g_k(\xi,u)+\Pi_{k+1}(\xi')\\
&=g_k(\xi,u)+J_{k+1}(\xi')\\
&=J_k(\xi).
\end{aligned}
$$

Đẳng thức $g_k(\xi,u)+J_{k+1}(\xi')=J_k(\xi)$ đúng theo (10.1) và (9.3), vì $u$ đạt cực tiểu của vế phải (9.3).

**Bước 3 (kết luận).** Với $k=0$ và $\xi=\xi_0$: chuỗi của lượt xuôi có chi phí $J_0(\xi_0)$, bằng chi phí nhỏ nhất. $\square$
:::

Bảng $J$ và chính sách tính một lần cho phép dựng đường từ bất kỳ trạng thái đầu nào bằng $N$ lần tra bảng.

::: example Ví dụ 07.29 (Chính sách và lượt xuôi trên đồ thị tầng)
**Dữ kiện.** Đồ thị tầng với $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$. Giá trị từ Ví dụ 07.28: $J_2(\mathrm C)=3$, $J_2(\mathrm D)=1$, $J_1(\mathrm A)=3$, $J_1(\mathrm B)=4$, $J_0(\mathrm s)=5$.

**Chính sách.**

| Trạng thái | Hai giá trị so sánh | $u_k^*$ |
|---|---|---|
| $\mathrm s$ | $2+3=5$; $5+4=9$ | $\mathrm A$ |
| $\mathrm A$ | $4+3=7$; $2+1=3$ | $\mathrm D$ |
| $\mathrm B$ | $1+3=4$; $3+1=4$ | $\mathrm C$ hoặc $\mathrm D$ |
| $\mathrm C$ | $3+0=3$ | $\mathrm t$ |
| $\mathrm D$ | $1+0=1$ | $\mathrm t$ |

**Lượt xuôi.** Từ $\mathrm s$: $u_0^*(\mathrm s)=\mathrm A$, $u_1^*(\mathrm A)=\mathrm D$, $u_2^*(\mathrm D)=\mathrm t$, cho đường $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$.

**Trường hợp hai lựa chọn cùng giá trị.** Tại $\mathrm B$, cả hai lựa chọn cho $4$; nếu trạng thái đầu là $\mathrm B$ ở giai đoạn $1$, chính sách cho ngay đường từ $\mathrm B$ với chi phí $4$.

**Kiểm tra lại.** Tổng chi phí của đường dựng được: $2+2+1=5=J_0(\mathrm s)$.
:::

### 10.2. Chi phí tính toán

Bước 2 của Thuật toán 07.52 làm một phép cộng và nhiều nhất một phép so sánh cho mỗi cặp trạng thái, điều khiển.

::: proposition Mệnh đề 07.54 (Số phép tính của giải ngược) — chứng minh đầy đủ
**Giả thiết.** Bài toán của Định nghĩa 07.46.

**Kết luận.**

- (a) Bước 2 của Thuật toán 07.52 tính đúng $\sum_{k=0}^{N-1}\sum_{\xi\in X_k}\lvert U_k(\xi)\rvert$ biểu thức $g_k(\xi,u)+J_{k+1}(f_k(\xi,u))$.
- (b) Nếu $\lvert X_0\rvert=1$, $\lvert X_k\rvert=q$ với $k\ge1$ và mọi $\lvert U_k(\xi)\rvert=q$, số biểu thức là $q+(N-1)q^2$, trong khi số chuỗi điều khiển từ $\xi_0$ là $q^N$.
:::

::: proof Chứng minh Mệnh đề 07.54
**Lộ trình.** Đếm các cặp $(\xi,u)$ mà bước 2 duyệt.

**Bước 1 (phần (a)).** Bước 2 duyệt mỗi $k$ từ $N-1$ về $0$, mỗi $\xi\in X_k$, và trong (9.3) tính một biểu thức cho mỗi $u\in U_k(\xi)$. Không cặp nào được tính hai lần.

**Bước 2 (phần (b)).** Giai đoạn $0$ có một trạng thái với $q$ điều khiển; mỗi giai đoạn $k=1,\ldots,N-1$ có $q$ trạng thái, mỗi trạng thái $q$ điều khiển. Tổng là $q+(N-1)q^2$. Mỗi chuỗi chọn một trong $q$ điều khiển ở mỗi giai đoạn, nên có $q^N$ chuỗi. $\square$
:::

Phép đếm coi mỗi lần tính $g_k$, $f_k$ và tra $J_{k+1}$ tốn một lượng việc chặn bởi một hằng số. Theo Mệnh đề 07.54, số chuỗi tăng theo hàm mũ, còn số phép tính của giải ngược chỉ tăng tuyến tính theo $N$, vì mọi chuỗi đi qua cùng một trạng thái dùng chung một đuôi tối ưu (Mệnh đề 07.50).

::: example Ví dụ 07.30 (Đếm phép tính)
**Dữ kiện.** Đồ thị tầng ban đầu ($N=3$; nút $\mathrm s$, $\mathrm A$, $\mathrm B$ có hai điều khiển, nút $\mathrm C$, $\mathrm D$ có một) và đồ thị $N=20$ giai đoạn với $q=2$.

**Đồ thị tầng ban đầu.** Theo Mệnh đề 07.54(a), giải ngược tính $2+2+2+1+1=8$ biểu thức, bằng số cạnh và bằng số phép cộng của liệt kê ở Ví dụ 07.26.

**Đồ thị $N=20$ giai đoạn, $q=2$.** Theo Mệnh đề 07.54(b), giải ngược tính $2+19\cdot4=78$ biểu thức. Liệt kê có $2^{20}=1\,048\,576$ chuỗi, mỗi chuỗi cần $19$ phép cộng, tổng cộng khoảng $2\cdot10^7$ phép cộng.

**Kiểm tra lại.** Với $N=3$, $q=2$, công thức (b) cho $10$ biểu thức và $8$ chuỗi; đồ thị tầng ban đầu có ít hơn vì $\mathrm C$ và $\mathrm D$ mỗi nút chỉ có một điều khiển.
:::

::: remark Nhận xét 07.55 (Giới hạn của quy hoạch động hữu hạn tất định)
**Số trạng thái.** Nếu trạng thái là một vector sáu thành phần, mỗi thành phần nhận mười mức, thì mỗi giai đoạn đã có $10^6$ trạng thái, và số này tăng theo hàm mũ của số thành phần; Murphy (2023, §34.6, tr. 1134) gọi hiện tượng này là lời nguyền số chiều (curse of dimensionality).

**Chuyển tiếp ngẫu nhiên.** Khi trạng thái kế tiếp còn phụ thuộc một nhiễu ngẫu nhiên, vế phải của (9.3) lấy kỳ vọng, và lời giải là một chính sách chứ không phải một chuỗi cố định (MIT OpenCourseWare 15.093J 2009, Bài giảng 16, slide 7, 9–10).

**Chân trời vô hạn.** Với số giai đoạn vô hạn, chi phí và chuyển tiếp không phụ thuộc $k$, hệ số chiết khấu $\gamma<1$ và các tập trạng thái, điều khiển hữu hạn, (9.3) thành một phương trình điểm bất động; phép lặp theo vế phải là ánh xạ co với hệ số $\gamma$, nên hàm $J$ thỏa phương trình là duy nhất (Murphy 2023, §34.6.1, tr. 1134).
:::

::: exercise Bài tập 07.15 (Giải ngược khi hai chi phí thay đổi)
Đồ thị tầng có cùng cấu trúc với đồ thị tầng ban đầu, với chi phí cạnh $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=3$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=0$, $g(\mathrm D,\mathrm t)=1$.

- (a) Tính $J_2(\mathrm C)$, $J_2(\mathrm D)$.
- (b) Tính $J_1(\mathrm A)$, $J_1(\mathrm B)$; ghi điều khiển đạt cực tiểu.
- (c) Tính $J_0(\mathrm s)$ và dựng đường tối ưu bằng lượt xuôi.
- (d) Kiểm tra trực tiếp tổng chi phí của đường tìm được và của ba đường còn lại.
- (e) Tính $\sum_k\sum_{\xi\in X_k}\lvert U_k(\xi)\rvert$ cho đồ thị này và so với số đường đi. Làm lại cho một đồ thị cùng dạng với $N=10$ giai đoạn: nút $\mathrm s$, chín tầng giữa mỗi tầng hai nút, nút $\mathrm t$, mỗi nút nối với mọi nút của tầng sau; so với $q^N$ khi $q=2$.

![Đồ thị bốn tầng s; A, B; C, D; t với chi phí cạnh s–A 2, s–B 3, A–C 4, A–D 2, B–C 1, B–D 3, C–t 0, D–t 1; hai cạnh s–B và C–t tô màu vì chi phí đã đổi.](img/lec-07/dp-layered-graph-new-costs.svg)
:::

::: hint
Hai cạnh tô màu trên hình có chi phí khác với đồ thị tầng ban đầu. Bắt đầu từ tầng 2. Ở (e), dùng Mệnh đề 07.54(a) và đếm riêng tầng cuối, nơi mỗi nút chỉ có một cạnh tới $\mathrm t$.
:::

::: solution
**Câu (a).** $J_2(\mathrm C)=0+0=0$ và $J_2(\mathrm D)=1+0=1$.

**Câu (b).**

- $J_1(\mathrm A)=\min\{4+0,\ 2+1\}=3$, điều khiển đạt cực tiểu là $\mathrm D$.
- $J_1(\mathrm B)=\min\{1+0,\ 3+1\}=1$, điều khiển đạt cực tiểu là $\mathrm C$.

**Câu (c).** $J_0(\mathrm s)=\min\{2+3,\ 3+1\}=4$, điều khiển đạt cực tiểu là $\mathrm B$. Lượt xuôi cho đường $\mathrm s\to\mathrm B\to\mathrm C\to\mathrm t$. Trên hình sau, giá trị $J$ ghi cạnh mỗi nút và đường tối ưu được tô đậm.

![Đồ thị tầng với chi phí mới và giá trị J(t)=0, J(C)=0, J(D)=1, J(A)=3, J(B)=1, J(s)=4; đường tối ưu s–B–C–t tô đậm.](img/lec-07/dp-bellman-values-new-costs.svg)

**Câu (d).** Đường tìm được có chi phí $3+1+0=4$. Ba đường còn lại: $\mathrm s\to\mathrm A\to\mathrm C\to\mathrm t$ có $2+4+0=6$; $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ có $2+2+1=5$; $\mathrm s\to\mathrm B\to\mathrm D\to\mathrm t$ có $3+3+1=7$.

**Câu (e).** Tổng là $2+2+2+1+1=8$, so với $4$ đường đi. Với $N=10$:

- giai đoạn $0$: $2$ biểu thức;
- giai đoạn $1$ tới $8$: mỗi giai đoạn $2\cdot2=4$, cộng lại $32$;
- giai đoạn $9$: hai nút, mỗi nút một cạnh tới $\mathrm t$, cộng lại $2$.

Tổng $36$ biểu thức, so với $2^9=512$ đường đi; $q^N=2^{10}=1\,024$ là số chuỗi khi mọi giai đoạn đều có hai lựa chọn.

**Kiểm tra lại.** Đường nhỏ nhất trong câu (d) có chi phí $4=J_0(\mathrm s)$; $J_1(\mathrm A)$ vẫn bằng $3$ vì điều khiển tối ưu tại $\mathrm A$ vẫn là $\mathrm D$.
:::

Dưới (D1)–(D4), giải ngược cho chuỗi tối ưu với số phép tính tỉ lệ với số cặp trạng thái, điều khiển.

## 11. Ý nghĩa, tác động và giới hạn

### 11.1. Hồi quy sai số tuyệt đối khi có một số đo sai lệch

::: application Tình huống 07.1 (Hồi quy sai số tuyệt đối khi có một số đo sai lệch)
**Bài toán và dữ liệu.**

Giả sử một nhóm đo thời gian một lượt huấn luyện (epoch) theo kích thước tập dữ liệu và được năm số đo sau.

| Mẫu $i$ | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---:|---:|---:|---:|---:|
| Kích thước dữ liệu $\nu_i$ (chục nghìn mẫu) | $0$ | $1$ | $2$ | $3$ | $4$ |
| Thời gian $y_i$ (phút) | $1$ | $2$ | $3$ | $4$ | $10$ |

Số đo thứ năm bị sai lệch vì máy chủ bị chia sẻ trong khi đo. Cần một đường thẳng dự đoán thời gian theo kích thước dữ liệu mà số đo này không kéo lệch.

**Mô hình hóa.** Đặc trưng $h_i=(1,\nu_i)$, tham số $x=(x_1,x_2)$ gồm hệ số chặn và hệ số góc, phần dư $r_i=x_1+x_2\nu_i-y_i$. Theo Định lý 02.15, bài toán cực tiểu $\sum_i|r_i|$ là quy hoạch tuyến tính (4.1) với $7$ biến và $10$ ràng buộc.

**Kiểm tra giả thiết.** Mệnh đề 07.22 cần các $h_i$ sinh $\mathbb R^2$: $h_1=(1,0)$ và $h_2=(1,1)$ độc lập. Mục tiêu không âm nên giá trị tối ưu hữu hạn.

**Áp dụng.** Theo Mệnh đề 07.22, có một nghiệm tối ưu đi qua hai điểm dữ liệu có đầu vào khác nhau, nên chỉ cần xét $\binom52=10$ đường qua hai điểm.

| Cặp mẫu | Đường qua hai điểm, $x=(x_1,x_2)$ | Phần dư $(r_1,\ldots,r_5)$ | $\sum_i\lvert r_i\rvert$ |
|---|---|---|---:|
| sáu cặp trong mẫu 1–4 | $(1,1)$ | $(0,0,0,0,-5)$ | $5$ |
| 1 và 5 | $(1,\tfrac94)$ | $(0,\tfrac54,\tfrac52,\tfrac{15}4,0)$ | $7{,}5$ |
| 2 và 5 | $(-\tfrac23,\tfrac83)$ | $(-\tfrac53,0,\tfrac53,\tfrac{10}3,0)$ | $\tfrac{20}3$ |
| 3 và 5 | $(-4,\tfrac72)$ | $(-5,-\tfrac52,0,\tfrac52,0)$ | $10$ |
| 4 và 5 | $(-14,6)$ | $(-15,-10,-5,0,0)$ | $30$ |

Giá trị tối ưu là $5$, đạt tại $x^*=(1,1)$.

**Chứng nhận và tính duy nhất.** Với vector $\sigma\in\mathbb R^5$, $\sigma=(-\tfrac12,0,\tfrac12,1,-1)$, mỗi $|\sigma_i|\le1$ nên $|r_i|\ge\sigma_ir_i$; hai tổng $\sum_i\sigma_i$ và $\sum_i\sigma_i\nu_i=0+0+1+3-4$ bằng $0$, nên $\sum_i\sigma_ih_i=0$. Với mọi $x$:

$$
\begin{aligned}
\sum_i|r_i|&\ge\sum_i\sigma_i(h_i^Tx-y_i)\\
&=-\sum_i\sigma_iy_i\\
&=\tfrac12-\tfrac32-4+10=5 .
\end{aligned}
$$

Dấu bằng cần $|r_i|=\sigma_ir_i$; với $i=1,2,3$, $|\sigma_i|<1$ buộc ba phần dư $r_1$, $r_2$, $r_3$ bằng $0$, nên $x_1=1$, $x_1+x_2=2$: nghiệm duy nhất $(1,1)$. Đây là chứng nhận của Mệnh đề 02.11, và $\sigma$ là một nghiệm đối ngẫu (Mệnh đề 03.11).

**So với bình phương nhỏ nhất.** Cùng dữ liệu cho $x=(0,2)$, phần dư $(-1,0,1,2,-2)$, tổng bình phương $10$. Tại $\nu=5$, đường $L_1$ dự đoán $6$ phút, đường bình phương nhỏ nhất dự đoán $10$ phút.

**Diễn giải.** Đường $L_1$ đi qua bốn số đo tốt và dồn sai lệch vào số đo bất thường; bình phương nhỏ nhất chia sai số cho mọi mẫu nên hệ số góc tăng từ $1$ lên $2$.

**Giới hạn.** Nghiệm có thể không duy nhất (Ví dụ 07.4), và khi nhiều số đo cùng sai lệch theo một hướng, đường $L_1$ cũng bị lệch.

**Dẫn ngược lý thuyết.** Định lý 02.15 (bước mô hình hóa); Mệnh đề 07.22, dựa trên Định lý 07.17, 07.20 (bước kiểm tra giả thiết và bước áp dụng); Mệnh đề 02.11 (bước chứng nhận).

**Kiểm tra lại.** Tại $x=(1,1)$ chỉ $r_5=-5$ khác $0$, nên $\sum_i\sigma_ir_i=(-1)(-5)=5$, bằng $\sum_i|r_i|$.
:::

### 11.2. Phân bổ giờ GPU có đỉnh suy biến

::: application Tình huống 07.2 (Phân bổ giờ GPU giữa tinh chỉnh và sinh dữ liệu, có đỉnh suy biến)
**Bài toán và dữ liệu.**

Trong một tuần, một nhóm chia giờ GPU giữa $x_1$ giờ tinh chỉnh (fine-tuning) một mô hình phân loại và $x_2$ giờ sinh dữ liệu tổng hợp. Giả sử mỗi giờ tinh chỉnh mang lại $5$ đơn vị lợi ích, mỗi giờ sinh dữ liệu mang lại $4$ đơn vị, với ba giới hạn:

- tổng giờ GPU: $x_1+x_2\le100$;
- năng lượng, với $3$ kWh mỗi giờ tinh chỉnh, $1$ kWh mỗi giờ sinh dữ liệu và hạn mức $180$ kWh: $3x_1+x_2\le180$;
- năng lực kiểm duyệt dữ liệu sinh ra: $x_2\le60$.

**Mô hình hóa.** Dạng (1.1) với $c=(5,4)$, các hàng $(1,1)$, $(3,1)$, $(0,1)$ và $b=(100,180,60)$. Dạng chuẩn thêm biến bù $s_1,s_2,s_3$; thứ tự biến $(x_1,x_2,s_1,s_2,s_3)$.

**Kiểm tra giả thiết.**

1. Lợi ích và tiêu hao tỉ lệ với số giờ (Nhận xét 07.2).
2. Có điểm cực biên: miền chứa $(0,0)$ và các hàng $-x_1\le0$, $-x_2\le0$ cho hạng $2$ (Định lý 07.17).
3. Giá trị hữu hạn: $x_1\le60$ (từ hàng năng lượng) và $x_2\le60$, nên $5x_1+4x_2\le540$.

**Đỉnh.** Theo Định lý 07.10, các đỉnh là $(0,0)$, $(60,0)$, $(0,60)$, $(40,60)$, với $z$ lần lượt $0$, $300$, $240$, $440$. Tại $(40,60)$ cả ba giới hạn cùng hoạt động: $40+60=100$, $120+60=180$, $60=60$; đó là một đỉnh suy biến.

**Phương pháp đơn hình.** Theo Thuật toán 07.31 với quy tắc Dantzig, từ $(0,0)$:

- bước 1: $d^{x_1}=(1,0,-1,-3,0)$, $\bar c_{x_1}=5$, tỉ số $s_1$: $100$, $s_2$: $60$, tới $(60,0)$ với $z=300$, cơ sở $\{x_1,s_1,s_3\}$;
- bước 2: $d^{x_2}=(-\tfrac13,1,-\tfrac23,0,-1)$, $\bar c_{x_2}=\tfrac73$, tỉ số $x_1$: $180$, $s_1$: $60$, $s_3$: $60$; $s_1$ ra vì có chỉ số nhỏ hơn, tới $(40,60)$ với $z=440$, cơ sở $\{x_1,x_2,s_3\}$; nếu $s_3$ ra thì được cơ sở $\{x_1,x_2,s_1\}$.

**Kiểm tra điều kiện dừng khi suy biến.** Tại $(40,60)$ chỉ có hai thành phần dương, ít hơn $m=3$, và ba tập $\{x_1,x_2,s_i\}$, $i=1,2,3$, đều là cơ sở của cùng điểm.

| Cơ sở | Chi phí rút gọn của hai biến ngoài cơ sở | Mệnh đề 07.29(b) |
|---|---|---|
| $\{x_1,x_2,s_1\}$ | $\bar c_{s_2}=-\tfrac53$, $\bar c_{s_3}=-\tfrac73$ | tối ưu |
| $\{x_1,x_2,s_3\}$ | $\bar c_{s_1}=-\tfrac72$, $\bar c_{s_2}=-\tfrac12$ | tối ưu |
| $\{x_1,x_2,s_2\}$ | $\bar c_{s_1}=-5$, $\bar c_{s_3}=1$ | không kết luận |

Với cơ sở thứ ba, hướng $d^{s_3}=(1,-1,0,-2,1)$ có $\bar c_{s_3}=1>0$ nhưng giảm biến cơ sở $s_2$ đang bằng $0$, nên $\theta^*=0$: một bước xoay suy biến đổi sang cơ sở $\{x_1,x_2,s_3\}$ mà không di chuyển.

**Chứng nhận.** Từ cơ sở $\{x_1,x_2,s_3\}$, $\mu=(\tfrac72,\tfrac12,0)$, và với mọi phương án khả thi

$$
\begin{aligned}
5x_1+4x_2&=\tfrac72(x_1+x_2)\\
&\quad+\tfrac12(3x_1+x_2)\\
&\le\tfrac72\cdot100+\tfrac12\cdot180\\
&=440 .
\end{aligned}
$$

Dấu bằng cần $x_1+x_2=100$ và $3x_1+x_2=180$, tức $(40,60)$: nghiệm duy nhất.

**Diễn giải.** Phân bổ tối ưu là $40$ giờ tinh chỉnh và $60$ giờ sinh dữ liệu, và cả ba tài nguyên dùng hết. Vì đỉnh suy biến, bộ hệ số nhân không duy nhất: cơ sở $\{x_1,x_2,s_1\}$ cho $\mu'=(0,\tfrac53,\tfrac73)$, vì $5x_1+4x_2=\tfrac53(3x_1+x_2)+\tfrac73x_2\le\tfrac53\cdot180+\tfrac73\cdot60=440$. Hai bộ $\mu$, $\mu'$ cho hai giá $\tfrac72$ và $0$ của một giờ GPU, và tính lại trực tiếp cho:

- thêm một giờ GPU ($100\to101$): cận $\mu'$ không chứa vế phải $100$, nên $z^*$ vẫn là $440$ tại $(40,60)$;
- bớt một giờ GPU ($100\to99$): giao của $x_1+x_2=99$ với $3x_1+x_2=180$ là $(40{,}5;\,58{,}5)$, với $z=202{,}5+234=436{,}5$, giảm $\mu_1=3{,}5$.

Ở đỉnh suy biến này, $z^*$ không khả vi theo vế phải $b_1$ của giới hạn giờ GPU, nên Hệ quả 03.24 không áp dụng, và không có một giá bóng (shadow price) duy nhất.

**Chẩn đoán khi mô hình sai.** Quên giới hạn giờ GPU và năng lượng: $x_1$ lớn tùy ý, kết cục không bị chặn (Định lý 07.23). Thêm yêu cầu $x_1\ge70$: năng lượng cần ít nhất $210>180$ kWh, kết cục không khả thi (Bài tập 07.12(d)). Đổi lợi ích thành $c=(3,1)$, song song với hàng năng lượng: cả cạnh từ $(60,0)$ tới $(40,60)$ tối ưu với $z^*=180$.

**Giới hạn.** Nếu lợi ích của tinh chỉnh bão hòa theo số giờ, giả thiết tỉ lệ (Nhận xét 07.2) chỉ đúng trong khoảng số giờ mà lợi ích còn tăng tuyến tính (Kupferschmid 2023, §1.1.3, tr. 21).

**Dẫn ngược lý thuyết.** Nhận xét 07.2, Định lý 07.10, 07.17 (bước kiểm tra giả thiết và tìm đỉnh); Mệnh đề 07.29, 07.30, Thuật toán 07.31 (bước chạy đơn hình); Mệnh đề 03.11, Hệ quả 03.24 (bước diễn giải); Định lý 07.23 (bước chẩn đoán).

**Kiểm tra lại.** $5\cdot40+4\cdot60=440$; theo cơ sở $\{x_1,x_2,s_3\}$, $-\bar c_{s_1}=\tfrac72=\mu_1$ và $-\bar c_{s_2}=\tfrac12=\mu_2$.
:::

### 11.3. Giải mã Viterbi cho gán nhãn từ loại

::: application Tình huống 07.3 (Giải mã Viterbi cho gán nhãn từ loại)
**Bài toán và dữ liệu.**

Gán nhãn từ loại (part-of-speech tagging) cho câu ba từ "dữ liệu huấn luyện mô hình" với hai nhãn: danh từ $\mathrm{NN}$ và động từ $\mathrm{VB}$ (bộ nhãn Penn Treebank). Một mô hình Markov ẩn (hidden Markov model) bậc nhất cho xác suất của chuỗi nhãn và chuỗi từ là tích các xác suất bắt đầu, chuyển nhãn, phát xạ (emission) từ và kết thúc. Giả sử mọi xác suất là lũy thừa của $\tfrac12$, nên chi phí $-\log_2$ là số nguyên, tính bằng bit:

| Thành phần | Giá trị $-\log_2$ (bit) |
|---|---|
| bắt đầu bằng $\mathrm{NN}$ hoặc $\mathrm{VB}$ | $1$, $1$ |
| chuyển $\mathrm{NN}\to\mathrm{NN}$, $\mathrm{NN}\to\mathrm{VB}$, $\mathrm{VB}\to\mathrm{NN}$, $\mathrm{VB}\to\mathrm{VB}$ | $2$, $1$, $1$, $2$ |
| kết thúc sau $\mathrm{NN}$ hoặc $\mathrm{VB}$ | $2$, $2$ |
| "dữ liệu" khi nhãn $\mathrm{NN}$, $\mathrm{VB}$ | $3$, $6$ |
| "huấn luyện" khi nhãn $\mathrm{NN}$, $\mathrm{VB}$ | $4$, $3$ |
| "mô hình" khi nhãn $\mathrm{NN}$, $\mathrm{VB}$ | $3$, $7$ |

Cần chuỗi nhãn có xác suất lớn nhất, tức tổng chi phí nhỏ nhất.

**Mô hình hóa theo Định nghĩa 07.46.**

- $N=3$; $X_0=\{\mathrm o\}$ với $\mathrm o$ là trạng thái bắt đầu; $X_k=\{\mathrm{NN},\mathrm{VB}\}$ là nhãn của từ thứ $k$, $k=1,2,3$.
- Điều khiển ở giai đoạn $k$ là nhãn của từ thứ $k+1$; $f_k(\xi,u)=u$.
- $g_0(\mathrm o,u)$ là chi phí bắt đầu cộng phát xạ từ thứ nhất; $g_k(\xi,u)$, $k=1,2$, là chi phí chuyển $\xi\to u$ cộng phát xạ từ thứ $k+1$; $g_3(\xi)$ là chi phí kết thúc.

**Kiểm tra giả thiết.**

1. (D1), (D2) Hữu hạn, tất định: nhãn chọn xác định trạng thái kế tiếp.
2. (D3) Chi phí cộng: $-\log_2$ của một tích là tổng các $-\log_2$.
3. (D4) Trạng thái đủ: trong mô hình bậc nhất, xác suất chuyển chỉ phụ thuộc nhãn trước.

**Áp dụng Thuật toán 07.52.**

- $J_3(\mathrm{NN})=J_3(\mathrm{VB})=2$.
- $J_2(\mathrm{NN})=\min\{2+3+2,\ 1+7+2\}=7$, chọn $\mathrm{NN}$.
- $J_2(\mathrm{VB})=\min\{1+3+2,\ 2+7+2\}=6$, chọn $\mathrm{NN}$.
- $J_1(\mathrm{NN})=\min\{2+4+7,\ 1+3+6\}=10$, chọn $\mathrm{VB}$.
- $J_1(\mathrm{VB})=\min\{1+4+7,\ 2+3+6\}=11$, chọn $\mathrm{VB}$.
- $J_0(\mathrm o)=\min\{1+3+10,\ 1+6+11\}=14$, chọn $\mathrm{NN}$.

Lượt xuôi: $\mathrm{NN}$, rồi $u_1^*(\mathrm{NN})=\mathrm{VB}$, rồi $u_2^*(\mathrm{VB})=\mathrm{NN}$. Chuỗi nhãn tối ưu là $\mathrm{NN}\ \mathrm{VB}\ \mathrm{NN}$ với chi phí $14$ bit, tức xác suất đồng thời $2^{-14}$.

**Diễn giải.** Từ "huấn luyện" nhận nhãn động từ: lựa chọn tại từ thứ hai so sánh $1+3+J_2(\mathrm{VB})$ với $2+4+J_2(\mathrm{NN})$, tức gồm cả phần câu còn lại.

**Giới hạn.** Với câu dài $30$ từ và $40$ nhãn, giải ngược cần khoảng $30\cdot40^2=48\,000$ biểu thức (Mệnh đề 07.54) thay cho $40^{30}$ chuỗi. Chuỗi tìm được có xác suất lớn nhất theo mô hình bậc nhất; nó là chuỗi nhãn đúng chỉ khi mô hình mô tả đúng ngôn ngữ.

**Dẫn ngược lý thuyết.** Định nghĩa 07.46; Định lý 07.49 (bước kiểm tra 2 dùng cho chi phí cộng, bước kiểm tra 3 cho trạng thái đủ); Mệnh đề 07.53.

**Kiểm tra lại.** Liệt kê tám chuỗi cho chi phí $14$ ($\mathrm{NN\,VB\,NN}$: $1+3+1+3+1+3+2$), $17$ ($\mathrm{NN\,NN\,NN}$), $18$ ($\mathrm{VB\,VB\,NN}$), $19$ ($\mathrm{NN\,VB\,VB}$, $\mathrm{VB\,NN\,NN}$), $20$ ($\mathrm{NN\,NN\,VB}$), $22$ ($\mathrm{VB\,NN\,VB}$), $23$ ($\mathrm{VB\,VB\,VB}$); nhỏ nhất là $14$.
:::

### 11.4. Chi phí phụ thuộc hai nhãn trước

::: application Tình huống 07.4 (Khi chi phí phụ thuộc hai nhãn trước: trạng thái không đủ)
**Bài toán và dữ liệu.**

Cùng câu "dữ liệu huấn luyện mô hình", hai nhãn $\mathrm{NN}$, $\mathrm{VB}$ và cùng bảng chi phí của Tình huống 07.3, thêm một hiệu chỉnh bậc hai (trigram): nhãn $\mathrm{NN}$ ngay sau cặp $\mathrm{NN}\ \mathrm{VB}$ cộng thêm $4$ bit.

**Giả thiết bị vi phạm.**

Trong khung của Tình huống 07.3, trạng thái ở giai đoạn $2$ là nhãn của từ thứ hai, nhưng chi phí chọn nhãn từ thứ ba nay phụ thuộc cả nhãn từ thứ nhất. Hai lịch sử $\mathrm{NN\,VB}$ và $\mathrm{VB\,VB}$ cùng đi tới trạng thái $\mathrm{VB}$ nhưng có phần tương lai khác nhau:

- sau $\mathrm{NN\,VB}$: $\min\{1+3+2+4,\ 2+7+2\}=\min\{10,11\}=10$;
- sau $\mathrm{VB\,VB}$: $\min\{1+3+2,\ 2+7+2\}=\min\{6,11\}=6$.

Đại lượng "$J_2(\mathrm{VB})$" không xác định được: giả thiết trạng thái đủ của Định lý 07.49 bị vi phạm.

**Hậu quả quan sát được.**

Bỏ qua hiệu chỉnh và chạy Thuật toán 07.52 như Tình huống 07.3 cho $\mathrm{NN\,VB\,NN}$. Chi phí thật của chuỗi này là $14+4=18$ bit. Liệt kê tám chuỗi với hiệu chỉnh cho nghiệm thật là $\mathrm{NN\,NN\,NN}$ với $17$ bit; chuỗi trả về sai nhãn từ thứ hai.

**Sửa bằng mở rộng trạng thái.**

Theo Nhận xét 07.47, đặt trạng thái ở giai đoạn $k\ge2$ là cặp (nhãn từ $k-1$, nhãn từ $k$), nên $X_2$, $X_3$ có bốn cặp và $X_1=\{\mathrm{NN},\mathrm{VB}\}$. Chi phí giai đoạn $2$ cộng thêm $4$ khi ba nhãn liên tiếp là $\mathrm{NN}$, $\mathrm{VB}$, $\mathrm{NN}$; chi phí cuối bằng $2$.

- $J_2(\mathrm{NN},\mathrm{NN})=\min\{2+3+2,\ 1+7+2\}=7$; $J_2(\mathrm{VB},\mathrm{NN})=7$.
- $J_2(\mathrm{NN},\mathrm{VB})=\min\{1+3+2+4,\ 2+7+2\}=10$; $J_2(\mathrm{VB},\mathrm{VB})=\min\{6,11\}=6$.
- $J_1(\mathrm{NN})=\min\{2+4+7,\ 1+3+10\}=13$, chọn $\mathrm{NN}$; hai số $7$, $10$ là $J_2(\mathrm{NN},\mathrm{NN})$ và $J_2(\mathrm{NN},\mathrm{VB})$.
- $J_1(\mathrm{VB})=\min\{1+4+7,\ 2+3+6\}=11$, chọn $\mathrm{VB}$; hai số $7$, $6$ là $J_2(\mathrm{VB},\mathrm{NN})$ và $J_2(\mathrm{VB},\mathrm{VB})$.
- $J_0(\mathrm o)=\min\{1+3+13,\ 1+6+11\}=17$, chọn $\mathrm{NN}$.

Lượt xuôi: $\mathrm{NN}$, $\mathrm{NN}$, rồi từ $(\mathrm{NN},\mathrm{NN})$ chọn $\mathrm{NN}$; chuỗi $\mathrm{NN\,NN\,NN}$ với $17$ bit, khớp liệt kê.

**Chi phí tính toán tăng thêm.** Số biểu thức tăng từ $2+2\cdot2+2\cdot2=10$ lên $2+2\cdot2+4\cdot2=14$. Với $40$ nhãn, trạng thái cặp có $40^2=1\,600$ phần tử và mỗi giai đoạn cần khoảng $40^3=64\,000$ biểu thức, so với $1\,600$ của mô hình bậc nhất.

**Diễn giải.** Lỗi nằm ở cách chọn trạng thái: khi chi phí phụ thuộc vào lịch sử dài hơn trạng thái đang giữ, cách sửa là mở rộng trạng thái.

**Dẫn ngược lý thuyết.** Định nghĩa 07.46, Nhận xét 07.47 (bước phát hiện và mở rộng trạng thái); Định lý 07.49, Mệnh đề 07.53 (bước giải lại); Mệnh đề 07.54 (bước đếm chi phí).

**Kiểm tra lại.** $\mathrm{NN\,NN\,NN}$: $1+3+2+4+2+3+2=17$; $\mathrm{NN\,VB\,NN}$ với hiệu chỉnh: $1+3+1+3+1+3+2+4=18$.
:::

### 11.5. Ứng dụng trong học máy

Các ứng dụng gồm:

- **Hồi quy bền vững.** Hồi quy sai số tuyệt đối là quy hoạch tuyến tính (4.1) (Định lý 02.15; Murphy 2022, §11.6.1, tr. 402–404); Mệnh đề 07.22 cho tính chất nội suy của các điểm cực biên tối ưu của (4.1).
- **Phân bổ tài nguyên tính toán.** Chia giờ GPU, bộ nhớ hay băng thông với lợi ích tuyến tính là quy hoạch tuyến tính (Tình huống 07.2); pha I (Mệnh đề 07.43) báo khi các yêu cầu mâu thuẫn.
- **Vận chuyển tối ưu rời rạc.** Bài toán vận chuyển giữa hai phân phối rời rạc là quy hoạch tuyến tính dạng chuẩn (Murphy 2023, (6.192), tr. 316; §6.8.3, tr. 318). Vì tổng khối lượng hai phân phối bằng nhau, hệ có phương trình thừa; sau khi bỏ các phương trình thừa (Nhận xét 07.6), Hệ quả 07.13 cho số ô khác $0$ của một kế hoạch ở đỉnh không vượt số phương trình còn lại.
- **Giải mã chuỗi.** Thuật toán Viterbi (Murphy 2023, §9.2.6, tr. 409–410) cho cùng chuỗi như Thuật toán 07.52 trên đồ thị tầng của các nhãn (Tình huống 07.3).
- **Học tăng cường.** Dạng ngẫu nhiên, chân trời vô hạn của phương trình Bellman (Nhận xét 07.55) là nền của lặp giá trị (value iteration) (Murphy 2023, §34.5–34.6, tr. 1128–1135).

Hàm `scipy.optimize.linprog` của SciPy giải bài toán cực tiểu, nên bài toán cực đại $c^Tx$ được truyền vào với $-c$. Mặc định mọi biến có cận `(0, None)`, tức $x\ge0$; biến tự do như $x$ của (4.1) cần `bounds=(None, None)`. Hàm có phương pháp đơn hình đối ngẫu của HiGHS (`method="highs-ds"`) và phương pháp điểm trong (interior-point method, `method="highs-ipm"`); trường `status` báo $0$ khi có nghiệm tối ưu, $2$ khi không khả thi, $3$ khi không bị chặn.

### 11.6. Tóm tắt

Các điểm cực biên của đa diện khả thi được nhận biết bằng hạng các ràng buộc hoạt động và, trên dạng chuẩn, là các nghiệm cơ sở khả thi. Khi miền có điểm cực biên và giá trị tối ưu hữu hạn, có một điểm cực biên tối ưu, và phương pháp đơn hình tìm nó qua các đỉnh kề. Với chuỗi quyết định, phương trình Bellman tính chi phí tối ưu còn lại từ cuối về đầu với số phép tính tuyến tính theo số giai đoạn.

| Nội dung | Kết quả cần tra lại |
|---|---|
| Mô hình hóa | Mệnh đề 07.1; Nhận xét 07.2; dạng (1.1), (4.1) |
| Đa diện, dạng chuẩn, nghiệm cơ sở | Định nghĩa 07.3, 07.5, 07.7; Mệnh đề 07.4; Nhận xét 07.6 |
| Điểm cực biên | Định nghĩa 07.8, 07.9, 07.15; Định lý 07.10, 07.12, 07.17; Hệ quả 07.11, 07.13, 07.18; Nhận xét 07.14; Bổ đề 07.16 |
| Kết cục, đỉnh tối ưu, đỉnh kề | Mệnh đề 07.19, 07.22, 07.26; Định lý 07.20, 07.23; Hệ quả 07.21; Nhận xét 07.24; Định nghĩa 07.25; Thuật toán 07.27 |
| Phương pháp đơn hình | Định nghĩa 07.28, 07.34, 07.39, 07.42; Mệnh đề 07.29, 07.30, 07.37, 07.40, 07.43; Thuật toán 07.31, 07.44; Định lý 07.32, 07.35; Bổ đề 07.36; Nhận xét 07.33 |
| Quy hoạch động | Định nghĩa 07.46, 07.48, 07.51; Nhận xét 07.47, 07.55; Định lý 07.49; Mệnh đề 07.50, 07.53, 07.54; Thuật toán 07.52 |

Các công thức cần nhớ gồm:

- nghiệm cơ sở: $x_B=A_B^{-1}b$, $x_{B^{\mathrm c}}=0$;
- hướng cơ sở, chi phí rút gọn và phép thử tỉ số: $d^j_B=-A_B^{-1}A_j$, $\bar c_j=c_j-c_B^TA_B^{-1}A_j$, $\theta^*=\min_{i\in B,\ d^j_i<0}\tfrac{x_i}{-d^j_i}$; biến $j$ vào khi $\bar c_j>0$, thuật toán dừng khi mọi $\bar c_j\le0$;
- bảng đơn hình: $\begin{bmatrix}A_B^{-1}A & A_B^{-1}b\\ \bar c^T & -z\end{bmatrix}$;
- phương trình Bellman: $J_N=g_N$, $J_k(\xi)=\min_{u\in U_k(\xi)}\{g_k(\xi,u)+J_{k+1}(f_k(\xi,u))\}$.

Các giả thiết hay bị bỏ qua gồm:

- tỉ lệ, cộng tính và biến nhận giá trị thực (Nhận xét 07.2);
- (L1) chỉ bảo đảm có ít nhất một cơ sở, và cơ sở chỉ khả thi khi $A_B^{-1}b\ge0$;
- "có điểm cực biên tối ưu" cần (L2) và (L3);
- tại nghiệm cơ sở suy biến, một điểm tối ưu có thể có chi phí rút gọn dương (Bài tập 07.11(d));
- tính hữu hạn của phương pháp đơn hình được bảo đảm bởi (L4) (Định lý 07.32) hoặc quy tắc Bland (Định lý 07.35), với một cơ sở khả thi xuất phát;
- phương trình Bellman cần (D1)–(D4).

![Sơ đồ "Chọn theo cấu trúc quyết định": nhánh "một lần, tuyến tính" dẫn tới quy hoạch tuyến tính (đa diện, cơ sở, điểm cực biên); nhánh "theo giai đoạn" dẫn tới quy hoạch động (trạng thái đủ, chi phí cộng, Bellman, chính sách). Chú thích: biến nguyên hoặc chuyển ngẫu nhiên nằm ngoài hai lớp này.](img/lec-07/lp-dp-decision-map.svg)

## 12. Bài tập

Các bài tập trong thân bài và mục tiêu học tập mà mỗi bài kiểm tra:

1. **Bài tập 07.1** (Dựng mô hình từ dữ kiện cho bằng lời): mục tiêu 1.
2. **Bài tập 07.2** (Mô hình hằng với mất mát $L_1$): mục tiêu 1.
3. **Bài tập 07.3** (Đưa về dạng chuẩn khi có ràng buộc $\ge$ và biến tự do): mục tiêu 2.
4. **Bài tập 07.4** (Mười cách chọn cơ sở của bài toán hộp hạt): mục tiêu 2.
5. **Bài tập 07.5** (Dải phẳng và điểm cực biên): mục tiêu 3.
6. **Bài tập 07.6** (Điểm cực biên và đỉnh kề trên một đa giác mới): mục tiêu 4.
7. **Bài tập 07.7** (Đổi lợi ích của bài toán hộp hạt): mục tiêu 4.
8. **Bài tập 07.8–07.12** (bảng đơn hình, không bị chặn, suy biến, pha I): mục tiêu 5.
9. **Bài tập 07.13** (Bài toán Klee–Minty và đổi đơn vị): phần đọc thêm, không gắn mục tiêu.
10. **Bài tập 07.14** (Lịch bước học hai giai đoạn): mục tiêu 6.
11. **Bài tập 07.15** (Giải ngược khi hai chi phí thay đổi): mục tiêu 6.

Các bài tập tiếp theo củng cố toàn bài, chia theo ba mức.

### 12.1. Mức nhận biết

::: exercise Bài tập 07.16 (Đúng hay sai về quy hoạch tuyến tính và quy hoạch động)
Xác định đúng hay sai; giải thích bằng một kết quả có số hiệu hoặc một phản ví dụ.

1. Bài toán cực đại $2x_1+3x_2$ dưới $x_1+2x_2\le54$, $x_1,x_2\ge0$, $x_1$ nguyên là một quy hoạch tuyến tính.
2. Mọi nghiệm cơ sở của một hệ dạng chuẩn đều khả thi.
3. Nếu một quy hoạch tuyến tính có hai nghiệm tối ưu thì nó có vô số nghiệm tối ưu.
4. Mọi đa diện khác rỗng đều có ít nhất một điểm cực biên.
5. Một quy hoạch tuyến tính khả thi có giá trị tối ưu hữu hạn luôn đạt giá trị đó tại một điểm khả thi.
6. Trong bài toán quyết định hữu hạn tất định, $J_k(\xi)$ là chi phí của điều khiển rẻ nhất tại $\xi$.
7. Trong phương pháp đơn hình cho bài toán cực đại, nếu tại một nghiệm cơ sở khả thi có một chi phí rút gọn dương thì nghiệm đó chưa tối ưu.
8. Với quy tắc Bland, phương pháp đơn hình xuất phát từ một cơ sở khả thi luôn dừng sau hữu hạn bước.
:::

::: hint
Câu 2 dùng Ví dụ 07.8; câu 4 dùng nửa mặt phẳng; câu 6 so (9.2) với chi phí một giai đoạn; câu 7 xét một đỉnh suy biến.
:::

::: solution
1. Sai. Điều kiện nguyên làm miền rời rạc; bài toán là quy hoạch nguyên.
2. Sai. Ở Ví dụ 07.8, cơ sở $\{x_1,x_2,s_3\}$ của hệ hộp hạt cho $s_3=54-70=-16<0$.
3. Đúng, theo Mệnh đề 07.19(b): cả đoạn nối hai nghiệm là tối ưu.
4. Sai. Nửa mặt phẳng $\{x_2\ge0\}$ chứa đường thẳng nằm ngang và không có điểm cực biên (Định lý 07.17).
5. Đúng, theo Định lý 07.23 (khác bài toán lồi tổng quát, Nhận xét 07.24).
6. Sai. $J_k(\xi)$ là tổng chi phí tối ưu của mọi giai đoạn còn lại: trên đồ thị tầng ban đầu, Ví dụ 07.28 cho $J_0(\mathrm s)=5$, trong khi cạnh rẻ nhất ra khỏi $\mathrm s$ có chi phí $2$.
7. Sai khi nghiệm suy biến: ở Bài tập 07.11(d), cơ sở $\{x_1,x_2,s_1\}$ của đỉnh tối ưu $(30,20)$ có $\bar c_{s_2}=1>0$. Khẳng định đúng khi nghiệm không suy biến, theo Mệnh đề 07.29(c).
8. Đúng, theo Định lý 07.35.

**Kiểm tra lại.** Câu 3: trong Ví dụ 07.14, ngoài hai đỉnh $(2,0)$, $(0,2)$, mọi điểm $(\lambda\cdot2,(1-\lambda)\cdot2)$ với $\lambda\in(0,1)$ cũng tối ưu.
:::

### 12.2. Mức tính toán hoặc chứng minh

::: exercise Bài tập 07.17 (Quy hoạch tuyến tính trên đơn hình xác suất)
Cho $P=\{p\in\mathbb R^3\mid p_1+p_2+p_3=1,\ p\ge0\}$ và bài toán cực đại $c^Tp$ trên $P$ với $c\in\mathbb R^3$.

- (a) Viết $P$ ở dạng chuẩn, nêu $m$, $n$; liệt kê mọi nghiệm cơ sở khả thi.
- (b) Chứng minh bằng Định lý 07.12 rằng $(\tfrac12,\tfrac12,0)$ không phải điểm cực biên.
- (c) Chứng minh $z^*=\max_jc_j$ bằng Hệ quả 07.21.
- (d) Với $c=(1,1,0)$, xác định kết cục và tập nghiệm tối ưu.
- (e) Chứng minh trực tiếp từ Định nghĩa 07.8 rằng $(1,0,0)$ là điểm cực biên của $P$, và chỉ ra bước dùng tính độc lập của cột ứng với thành phần dương.
:::

::: hint
Ma trận ràng buộc là hàng $(1,1,1)$, nên $m=1$ và mỗi cơ sở gồm một cột.
:::

::: solution
**Câu (a).** $A=(1,1,1)$, $b=1$, $m=1$, $n=3$, $\operatorname{rank}(A)=1$. Mỗi cơ sở là một chỉ số $j$, với $A_B=(1)$ khả nghịch và $p_j=1$, hai thành phần còn lại bằng $0$. Ba nghiệm cơ sở khả thi là $(1,0,0)$, $(0,1,0)$, $(0,0,1)$, không suy biến.

**Câu (b).** $\operatorname{supp}(p)=\{1,2\}$ và hai cột $(1)$, $(1)$ của $A$ phụ thuộc tuyến tính, nên theo khẳng định (iii) của Định lý 07.12, điểm không phải điểm cực biên. Trực tiếp: $(\tfrac12,\tfrac12,0)=\tfrac12(1,0,0)+\tfrac12(0,1,0)$.

**Câu (c).** $P$ khác rỗng, bị chặn, ở dạng chuẩn, nên có điểm cực biên (Hệ quả 07.18) và giá trị hữu hạn. Theo Hệ quả 07.21, $z^*$ là giá trị lớn nhất của $c^Tp$ trên ba nghiệm cơ sở khả thi, tức $\max\{c_1,c_2,c_3\}$.

**Câu (d).** $z^*=1$, đạt tại $(1,0,0)$ và $(0,1,0)$; theo Mệnh đề 07.19, tập nghiệm tối ưu là đoạn $\{(\lambda,1-\lambda,0)\mid\lambda\in[0,1]\}$: kết cục nhiều nghiệm tối ưu.

**Câu (e).** Giả sử $(1,0,0)=\lambda p'+(1-\lambda)p''$ với $p',p''\in P$ và $0<\lambda<1$.

- Thành phần thứ hai: $0=\lambda p_2'+(1-\lambda)p_2''$ với $p_2',p_2''\ge0$ và hai hệ số dương, nên $p_2'=p_2''=0$; tương tự $p_3'=p_3''=0$.
- Hiệu $p'-p''$ chỉ có thể khác $0$ ở thành phần thứ nhất, và $A(p'-p'')=0$ cho $1\cdot(p_1'-p_1'')=0$. Cột $A_1=(1)$ khác $0$, tức họ cột trên $\operatorname{supp}=\{1\}$ độc lập, nên $p_1'=p_1''$.

Vậy $p'=p''=(1,0,0)$: điểm là điểm cực biên, và bước thứ hai là Bước 1 của chứng minh Định lý 07.12 với $m=1$.

**Kiểm tra lại.** Tại $(\tfrac12,\tfrac12,0)$ với $c=(1,1,0)$: $c^Tp=1=z^*$, một nghiệm tối ưu không phải điểm cực biên.
:::

### 12.3. Mức vận dụng

::: exercise Bài tập 07.18 (Chọn mô hình cho một tổ hợp dưới giới hạn bộ nhớ)
Một hệ thống chọn một số trong bốn mô hình để chạy song song trên một thiết bị có $8$ GB bộ nhớ. Mô hình $j$ chiếm $\omega_j$ GB và mang lại lợi ích $\kappa_j$ về độ chính xác của tổ hợp. Giả sử lợi ích của tổ hợp là tổng lợi ích các mô hình được chọn:

| Mô hình $j$ | $1$ | $2$ | $3$ | $4$ |
|---|---:|---:|---:|---:|
| Bộ nhớ $\omega_j$ (GB) | $3$ | $4$ | $2$ | $3$ |
| Lợi ích $\kappa_j$ | $5$ | $6$ | $3$ | $4$ |

- (a) Mô hình hóa thành bài toán quyết định hữu hạn tất định theo Định nghĩa 07.46, với giai đoạn $k$ là quyết định chọn hay bỏ mô hình $k+1$ và trạng thái là bộ nhớ còn lại. Viết dưới dạng cực tiểu chi phí bằng cách đặt chi phí là trừ lợi ích.
- (b) Giải bằng phương trình Bellman; nêu tập mô hình được chọn và lợi ích.
- (c) Bỏ điều kiện chọn hay bỏ trọn một mô hình, cho phép chọn một phần $x_j\in[0,1]$. Giải quy hoạch tuyến tính thu được bằng cách xếp mô hình theo lợi ích trên mỗi GB, và so với (b).
- (d) Giả sử mô hình 3 và mô hình 4 dùng chung một bộ đặc trưng, nên khi chọn cả hai, lợi ích của tổ hợp giảm $2$. Kiểm tra bộ nhớ còn lại có còn là trạng thái đủ hay không; nếu không, mở rộng trạng thái và giải lại.
:::

::: hint
Ở (c), một nghiệm đỉnh có nhiều nhất một thành phần phân số, vì chỉ có một ràng buộc bộ nhớ. Ở (d), xét chi phí của quyết định về mô hình 4.
:::

::: solution
**Câu (a).** $N=4$; $X_k=\{0,1,\ldots,8\}$ là bộ nhớ còn lại trước quyết định về mô hình $k+1$, $X_0=\{8\}$. Điều khiển $u\in\{0,1\}$ (bỏ, chọn), với $u=1$ chỉ cho phép khi $\omega_{k+1}\le\xi$. Chuyển $f_k(\xi,u)=\xi-u\omega_{k+1}$; chi phí $g_k(\xi,u)=-u\kappa_{k+1}$; $g_4=0$. Bốn giả thiết (D1)–(D4) thỏa:

- (D1) hữu hạn: bốn giai đoạn, chín mức bộ nhớ, hai điều khiển;
- (D2) tất định: bộ nhớ còn lại sau quyết định được xác định bởi $\xi-u\omega_{k+1}$;
- (D3) chi phí cộng: lợi ích của tổ hợp là tổng lợi ích các mô hình được chọn;
- (D4) trạng thái đủ: các quyết định sau chỉ cần biết bộ nhớ còn lại.

**Câu (b).** Viết $\Lambda_k(\xi)=-J_k(\xi)$ là lợi ích tối ưu còn lại; (9.3) thành $\Lambda_k(\xi)=\max\{\Lambda_{k+1}(\xi),\ \kappa_{k+1}+\Lambda_{k+1}(\xi-\omega_{k+1})\}$, vế thứ hai chỉ khi $\omega_{k+1}\le\xi$.

| $\xi$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| $\Lambda_3(\xi)$, chỉ mô hình 4 | $0$ | $0$ | $0$ | $4$ | $4$ | $4$ | $4$ | $4$ | $4$ |
| $\Lambda_2(\xi)$, thêm mô hình 3 | $0$ | $0$ | $3$ | $4$ | $4$ | $7$ | $7$ | $7$ | $7$ |
| $\Lambda_1(\xi)$, thêm mô hình 2 | $0$ | $0$ | $3$ | $4$ | $6$ | $7$ | $9$ | $10$ | $10$ |

Ở giai đoạn đầu, $\Lambda_0(8)=\max\{\Lambda_1(8),\ 5+\Lambda_1(5)\}=\max\{10,\ 12\}$, tức $12$, chọn mô hình 1.

Lượt xuôi: chọn mô hình 1 (còn $5$ GB); $\Lambda_1(5)=7=\Lambda_2(5)$ nên bỏ mô hình 2; $\Lambda_2(5)=3+\Lambda_3(3)=7$ nên chọn mô hình 3; chọn mô hình 4. Tập $\{1,3,4\}$, dùng $8$ GB, lợi ích $12$.

**Câu (c).** Lợi ích trên mỗi GB: $\tfrac53\approx1{,}67$, $1{,}5$, $1{,}5$, $\tfrac43\approx1{,}33$. Lấy trọn mô hình 1 và 2 ($7$ GB), còn $1$ GB cho nửa mô hình 3: $x=(1,1,\tfrac12,0)$, lợi ích $12{,}5$. Cận trên đến từ các hệ số nhân không âm:

- $\pi_0=1{,}5$ cho ràng buộc bộ nhớ;
- $\pi_j=\max(\kappa_j-1{,}5\,\omega_j,0)$ cho ràng buộc $x_j\le1$, tức $\pi=(0{,}5;\,0;\,0;\,0)$;
- vì $\kappa_j\le1{,}5\,\omega_j+\pi_j$ và $0\le x_j\le1$, mọi $x$ khả thi có $\sum_j\kappa_jx_j\le1{,}5\sum_j\omega_jx_j+\sum_j\pi_j\le1{,}5\cdot8+0{,}5=12{,}5$, và $x$ trên đạt cận này.

Nghiệm này không duy nhất: mô hình 2 và 3 cùng tỉ số $1{,}5$, nên mọi cách lấp $5$ GB còn lại bằng $4x_2+2x_3=5$ với $x_2,x_3\in[0,1]$, chẳng hạn $x=(1;\,0{,}75;\,1;\,0)$, cũng cho $12{,}5$.

So với (b), quy hoạch tuyến tính cho cận trên $12{,}5$ của bài toán có lựa chọn trọn vẹn và một nghiệm phân số không dùng được; làm tròn $x_3$ xuống cho $\{1,2\}$ với lợi ích $11<12$.

**Câu (d).** Chi phí của quyết định về mô hình 4 là $-4$ nếu mô hình 3 chưa được chọn và $-2$ nếu đã chọn, nên bộ nhớ còn lại không còn là trạng thái đủ (Nhận xét 07.47). Mở rộng trạng thái ở giai đoạn 3 thành cặp $(\xi,\iota)$, với $\iota=1$ khi mô hình 3 đã được chọn.

- $\Lambda_3(\xi,0)=4$ và $\Lambda_3(\xi,1)=2$ khi $\xi\ge3$; cả hai bằng $0$ khi $\xi\le2$.
- $\Lambda_2(\xi)=\max\{\Lambda_3(\xi,0),\ 3+\Lambda_3(\xi-2,1)\}$, cho $\Lambda_2(5)=\max\{4,\ 5\}=5$ và $\Lambda_2(1)=0$.
- $\Lambda_1(5)=\max\{\Lambda_2(5),\ 6+\Lambda_2(1)\}=6$ và $\Lambda_1(8)=10$.
- $\Lambda_0(8)=\max\{\Lambda_1(8),\ 5+\Lambda_1(5)\}=\max\{10,\ 11\}$, tức $11$.

Lượt xuôi cho tập $\{1,2\}$, dùng $7$ GB, lợi ích $11$; tập $\{1,3,4\}$ của câu (b) nay chỉ mang lại $12-2=10$.

**Kiểm tra lại.** Các tập không vượt $8$ GB có lợi ích lớn nhất là $\{1,3,4\}$ ($12$), $\{1,2\}$ ($11$), $\{2,4\}$ ($10$), $\{2,3\}$ và $\{1,4\}$ ($9$); với hiệu chỉnh của câu (d), $\{1,3,4\}$ còn $10$.
:::

Bài tập 07.19–07.32, có gợi ý và lời giải, nằm trong [tệp bài tập của Bài 07](material-viewer.html?doc=materials/lec-07/exercises.md&deck=lecture-07-quy-hoach-tuyen-tinh-va-dong.html).

## 13. Câu hỏi cuối buổi và cầu nối

Phương án $(14,20)$ của Ví dụ 07.2, với $z=88$, đạt sản lượng tối đa của loại 2 và dùng hết giờ máy. Tính theo giờ máy, loại 1 mang lại $2$ đơn vị lợi ích còn loại 2 mang lại $1{,}5$, nên phương án đó chưa tối ưu; nghiệm là $(30,12)$ với $z^*=96$ (Ví dụ 07.5).

**Câu hỏi.** Trên đồ thị tầng ban đầu, đổi chi phí cạnh $\mathrm s\to\mathrm B$ từ $5$ thành $1$, các cạnh khác giữ nguyên. Theo Định lý 07.49, xác định những giá trị $J_k$ thay đổi, tính $J_0(\mathrm s)$ mới và liệt kê mọi đường tối ưu.

::: solution Lời giải câu hỏi cuối buổi
$J_2$ và $J_1$ chỉ dùng chi phí các cạnh từ tầng $1$ trở đi, nên giữ nguyên: $J_2(\mathrm C)=3$, $J_2(\mathrm D)=1$, $J_1(\mathrm A)=3$, $J_1(\mathrm B)=4$. Ở tầng $0$, $J_0(\mathrm s)=\min\{2+3,\ 1+4\}=5$, đạt bởi cả hai điều khiển; vì $\mathrm B$ cũng có hai điều khiển đạt cực tiểu, có ba đường tối ưu: $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$, $\mathrm s\to\mathrm B\to\mathrm C\to\mathrm t$, $\mathrm s\to\mathrm B\to\mathrm D\to\mathrm t$.

**Kiểm tra lại.** $2+2+1=5$, $1+1+3=5$, $1+3+1=5$; đường còn lại có $2+4+3=9$.
:::

Các kết quả của bài cần mô hình tuyến tính với biến thực cho quy hoạch tuyến tính, và (D1)–(D4) cho quy hoạch động. Bài để lại hai giới hạn:

- khi biến buộc nguyên, Định lý 07.20 không còn cho nghiệm của bài toán nguyên, và Bài tập 07.18(c) cho thấy làm tròn nghiệm của quy hoạch tuyến tính có thể làm mất lợi ích;
- khi trạng thái kế tiếp là ngẫu nhiên hoặc số giai đoạn không giới hạn, (9.3) đổi dạng như Nhận xét 07.55. Bài 13 (Ra quyết định tuần tự dưới điều kiện bất định) xây dựng phương trình Bellman có kỳ vọng và chiết khấu $\gamma<1$ cho quá trình quyết định Markov và giải nó bằng lặp giá trị.

## 14. Tài liệu đọc

- **Trước buổi học:**
  - Ghi chú Bài 02, §5 (Định nghĩa 02.9 đến Định lý 02.15), và Bài 03, Mệnh đề 03.11.
- **Sau buổi học:**
  - Vanderbei, Robert J. (2014), *Linear Programming: Foundations and Extensions*, ấn bản 4, Springer, viết ở chiều cực đại: ch. 2 (tr. 11–23), ch. 3 (tr. 25–37), ch. 4 (tr. 39–52).
  - MIT OpenCourseWare 15.093J/6.255J *Optimization Methods* (2009, Bertsimas): Bài giảng 2 "The Geometry of LO" (slide 9–24); Bài giảng 3 "The Simplex Method" (slide 3–23); Bài giảng 16 "Dynamic Programming" (slide 7–10); viết ở chiều cực tiểu.
  - Nguyễn Bích Vân (2025), bài giảng *Cơ sở toán học cho AI*, ch. 8, phần 2–4, viết ở chiều cực tiểu.
  - Kupferschmid, Michael (2023), *Introduction to Mathematical Programming*, giấy phép CC BY 4.0: §1.1.3 (tr. 21), §2.2–2.6 (tr. 57–71), §2.8.2 (tr. 78–82), §4.2 (tr. 137–145), §4.4.1 (tr. 151–153), §4.5.3 (tr. 160–163), §7.8 (tr. 276–281).
- **Mở rộng:**
  - Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press: §2.2.4 (tr. 31–33), §4.3 (tr. 146–151).
  - Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả: §8.5.3 (tr. 305–306), §8.5.5 (tr. 307), §11.6.1 (tr. 402–404).
  - Murphy, Kevin P. (2023), *Probabilistic Machine Learning: Advanced Topics*, MIT Press, bản trực tuyến của tác giả: §6.8 (tr. 314–318), §9.2.6 (tr. 409–410), §34.5–34.6 (tr. 1128–1135).
