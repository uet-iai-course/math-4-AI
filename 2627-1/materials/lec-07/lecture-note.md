# Bài 07 — Quy hoạch tuyến tính và quy hoạch động

## Mục tiêu học tập

Bốn mục tiêu đầu là minh chứng cho hai chuẩn đầu ra bài học (LLO) của buổi 7, cả hai đóng góp chuẩn đầu ra học phần CLO1:

- LLO17: hiểu định nghĩa quy hoạch tuyến tính và diễn đạt bài toán thực tế thành quy hoạch tuyến tính;
- LLO18: xây dựng đa diện của quy hoạch tuyến tính, hiểu sự tồn tại và tính tối ưu của điểm cực, mô tả thuật toán đi qua đỉnh kề ở mức ý niệm.

Hai mục tiêu cuối thuộc phần quy hoạch động (dynamic programming), phần bổ trợ của bài; chúng không gắn với LLO hay CLO nào của đề cương.

Sau chương này, người học có thể:

1. Lập quy hoạch tuyến tính từ dữ kiện cho bằng bảng hoặc bằng lời, gồm biến có đơn vị, mục tiêu, ràng buộc và miền biến; đưa hồi quy $L_1$ về quy hoạch tuyến tính (LLO17; CLO1).
2. Viết miền khả thi thành đa diện, chuyển về dạng chuẩn, tính nghiệm cơ sở và kiểm tính khả thi, suy biến (LLO18; CLO1).
3. Nhận biết điểm cực bằng định nghĩa, bằng hạng các ràng buộc chặt và bằng nghiệm cơ sở khả thi; chứng minh các tương đương đó và điều kiện để đa diện có điểm cực (LLO18; CLO1).
4. Xác định kết cục của một quy hoạch tuyến tính, áp dụng định lý điểm cực tối ưu sau khi kiểm giả thiết, và chạy thuật toán đi qua đỉnh kề kèm lý do dừng (LLO18; CLO1).
5. Mô hình hóa bài toán quyết định theo giai đoạn bằng trạng thái, điều khiển, chuyển trạng thái và chi phí cộng; kiểm trạng thái có đủ hay không (bổ trợ).
6. Giải phương trình Bellman ngược, dựng chính sách và đường tối ưu, so số phép tính với liệt kê (bổ trợ).

## Kiến thức tiên quyết

Số hiệu `01.k`, `02.k`, `03.k`, `06.k` chỉ ghi chú Bài 01, Bài 02, Bài 03 và Bài 06.

- **Đại số tuyến tính.** Trong $\mathbb R^m$ có nhiều nhất $m$ véc-tơ độc lập tuyến tính; ma trận vuông có định thức khác $0$ thì khả nghịch và hệ tương ứng có nghiệm duy nhất. Định lý số chiều: hạng của các véc-tơ $a_i\in\mathbb R^n$, $i\in S$, cộng số chiều của không gian nghiệm $\{d\mid a_i^Td=0,\ i\in S\}$ bằng $n$; đặc biệt, hạng nhỏ hơn $n$ thì có $d\ne0$ với $a_i^Td=0$ cho mọi $i\in S$.
- **Tập lồi** (Định nghĩa 01.18, Mệnh đề 01.19(c), 01.20(a)). Tập lồi chứa mọi tổ hợp lồi $\lambda x'+(1-\lambda)x''$, $\lambda\in[0,1]$, của hai điểm của nó; nửa không gian là tập lồi, và giao của các tập lồi là tập lồi.
- **Bài toán tối ưu, cực tiểu, hàm lồi** (Định nghĩa 01.12, 01.13, Định lý 01.31, Hệ quả 01.34, Định lý 01.35). Nghiệm là điểm khả thi đạt giá trị tối ưu; cực tiểu toàn cục là khái niệm về giá trị hàm, khác điểm cực của Mục 3. Tổng các hàm lồi và cực đại các hàm affine là hàm lồi; tập nghiệm của bài lồi là tập lồi, và hàm lồi chặt (còn gọi là lồi nghiêm ngặt) có nhiều nhất một điểm cực tiểu. Bài cực đại đổi về bài cực tiểu hàm đối dấu, giữ tập nghiệm.
- **Quy hoạch tuyến tính** (Định nghĩa 02.9, Mệnh đề 02.10). Thêm biến phụ cho mỗi bất đẳng thức và tách biến tự do thành hiệu hai biến không âm đưa mọi quy hoạch tuyến tính về dạng chỉ có đẳng thức và điều kiện không âm, giữ giá trị mục tiêu.
- **Chứng nhận bằng tổ hợp không âm** (Mệnh đề 02.11, 03.11, Định lý 03.15(b)). Với bài $\min c^Tx$ dưới $a_i^Tx\ge\beta_i$, nếu $\mu\ge0$ và $c=\sum_i\mu_ia_i$ thì $c^Tx\ge\sum_i\mu_i\beta_i$ tại mọi điểm khả thi. Bộ $\mu$ đó là điểm khả thi của bài đối ngẫu, và với quy hoạch tuyến tính khả thi có giá trị hữu hạn, hai giá trị tối ưu bằng nhau.
- **Biến chặn cho cực đại affine** (Bổ đề 02.14, Định lý 02.15). Điều kiện $t\ge|r|$ tương đương với $t\ge r$ và $t\ge-r$; Mục 1.3 phát biểu lại định lý.
- **Bước cập nhật cục bộ** (Định nghĩa 06.2, Mệnh đề 06.3). Các bộ tối ưu của Bài 04–06 sinh bước từ gradient và một ma trận phạt xác định dương; bước đó là hướng giảm. Chúng cần mục tiêu khả vi và không có ràng buộc.

## Bảng ký hiệu

Bảng chỉ gồm các ký hiệu dùng xuyên suốt chương; ký hiệu chỉ dùng trong một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ. Mỗi chữ giữ một nghĩa trong cả chương.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $n$, $m$ | số biến; số hàng của ma trận ràng buộc của bài đang xét | số nguyên dương |
| $x$, $x_j$ | biến quyết định của quy hoạch tuyến tính; thành phần thứ $j$ | $\mathbb R^n$; $\mathbb R$ |
| $c$ | véc-tơ hệ số của hàm mục tiêu | $\mathbb R^n$ |
| $A$, $a_i^T$, $A_j$ | ma trận ràng buộc của bài đang xét; hàng thứ $i$ (chữ thường); cột thứ $j$ (chữ hoa) | $\mathbb R^{m\times n}$; $\mathbb R^{1\times n}$; $\mathbb R^m$ |
| $b$, $b_i$ | véc-tơ vế phải; thành phần thứ $i$ | $\mathbb R^m$; $\mathbb R$ |
| $P$ | miền khả thi, trong chương luôn là một đa diện | tập con của $\mathbb R^n$ |
| $z$, $z^*$ | giá trị mục tiêu $c^Tx$; giá trị tối ưu $\sup_{x\in P}c^Tx$ | $\mathbb R$; $\mathbb R\cup\{-\infty,+\infty\}$ |
| $x^*$, $P^*$ | một nghiệm tối ưu; tập nghiệm tối ưu | phần tử của $P$; tập con của $P$ |
| $s$, $s_i$ | véc-tơ biến phụ; biến phụ của ràng buộc thứ $i$ | $\mathbb R^m$, $s\ge0$ |
| $B$, $B^{\mathrm c}$ | tập chỉ số cơ sở; phần bù của nó trong $\{1,\ldots,n\}$ | $\lvert B\rvert=m$ |
| $A_B$, $x_B$, $x_{B^{\mathrm c}}$ | ma trận gồm các cột $A_j$, $j\in B$; biến cơ sở; biến ngoài cơ sở | $\mathbb R^{m\times m}$; $\mathbb R^m$; $\mathbb R^{n-m}$ |
| $\mathcal I(x)$, $\operatorname{supp}(x)$ | tập chỉ số các ràng buộc chặt tại $x$; tập chỉ số $j$ với $x_j>0$ | tập con của $\{1,\ldots,m\}$; của $\{1,\ldots,n\}$ |
| $v$, $w$ | điểm cực của $P$ | phần tử của $P$ |
| $x'$, $x''$, $\lambda$ | các điểm khác của $P$, chẳng hạn hai điểm trong một tổ hợp lồi; hệ số của tổ hợp | $P$; $[0,1]$ |
| $d$, $\theta$, $\theta^*$ | hướng di chuyển; tham số dọc đường $x+\theta d$, là độ dài bước khi $\theta\ge0$; bước của phép thử tỉ số | $\mathbb R^n$; $\mathbb R$; $\theta^*\ge0$ |
| $d^j$, $\bar c_j$ | hướng cơ sở ứng với biến ngoài cơ sở $j$; lợi ích rút gọn $c^Td^j$ | $\mathbb R^n$; $\mathbb R$ |
| $\mu$ | hệ số nhân không âm của một chứng nhận cận trên | $\mathbb R^m$, $\mu\ge0$ |
| $h_i$, $y_i$, $r_i$, $t_i$, $M$ | véc-tơ đặc trưng, giá trị đích, phần dư và biến chặn phần dư của mẫu $i$; số mẫu | $\mathbb R^n$; $\mathbb R$; $\mathbb R$; $\mathbb R$; số nguyên dương |
| $N$, $k$ | số giai đoạn; chỉ số giai đoạn | $N\ge1$; $k\in\{0,\ldots,N\}$ |
| $\xi_k$, $X_k$ | trạng thái ở giai đoạn $k$; tập trạng thái | phần tử của $X_k$; tập hữu hạn khác rỗng |
| $u$, $U_k(\xi)$ | điều khiển; tập điều khiển cho phép tại trạng thái $\xi$ | tập hữu hạn khác rỗng |
| $f_k$, $g_k$, $g_N$ | hàm chuyển trạng thái; chi phí giai đoạn; chi phí cuối | $f_k(\xi,u)\in X_{k+1}$; giá trị thực |
| $G_k$, $\mathcal U_k(\xi)$ | chi phí của một chuỗi điều khiển từ giai đoạn $k$; tập các chuỗi chấp nhận được từ $\xi$ | giá trị thực; tập hữu hạn |
| $J_k$, $u_k^*$ | chi phí tối ưu còn lại (hàm giá trị); chính sách | $X_k\to\mathbb R$; $X_k\to$ điều khiển |
| $q$ | số lựa chọn ở mỗi giai đoạn trong các phép đếm | số nguyên dương |
| $\mathrm s$, $\mathrm A$, $\mathrm B$, $\mathrm C$, $\mathrm D$, $\mathrm t$ | tên các nút của đồ thị tầng | nhãn, không phải biến |

Bất đẳng thức giữa hai véc-tơ hiểu theo từng thành phần: $Ax\le b$ là $m$ bất đẳng thức $a_i^Tx\le b_i$, và $x\ge0$ là $n$ điều kiện $x_j\ge0$. Ba chữ $n$, $m$, $A$ luôn chỉ số biến, số hàng và ma trận ràng buộc của bài đang xét: trong dạng (1.1), $A$ không gồm các hàng $-x_j\le0$; trong dạng chuẩn (2.2), $n$ đếm cả biến phụ thêm vào. Tên nút viết chữ đứng để phân biệt với ma trận $A$ và tập chỉ số $B$. Mọi bộ số của các ví dụ là số liệu sư phạm tự xây dựng.

## 1. Mô hình hóa quy hoạch tuyến tính

Các phương pháp của Bài 04–06 đi theo bước cục bộ. Tại điểm hiện tại, gradient của mục tiêu cho hướng, và bước của Mệnh đề 06.3 làm mục tiêu giảm khi đủ ngắn; các phương pháp dừng gần điểm có gradient bằng $0$. Chúng cần hai điều: mục tiêu khả vi và không có ràng buộc.

Bài toán sau có ràng buộc, và gradient của mục tiêu khác $0$ tại mọi điểm. Một cơ sở đóng hai loại hộp hạt; mỗi nghìn hộp loại 1 đem lợi ích $2$ đơn vị và cần $1$ giờ máy, mỗi nghìn hộp loại 2 đem lợi ích $3$ đơn vị và cần $2$ giờ máy. Hai loại dùng chung $54$ giờ máy, và sản lượng tối đa của từng loại là $30$ và $20$ nghìn hộp. Lợi ích $2x_1+3x_2$ có gradient $(2,3)$ tại mọi điểm, nên phương án tốt nhất do các giới hạn quyết định.

Bài 02 xếp bài toán này vào quy hoạch tuyến tính (Định nghĩa 02.9) và đưa nó về dạng chuẩn (Mệnh đề 02.10); Bài 03 chứng nhận một ứng viên là tối ưu bằng nhân tử không âm (Mệnh đề 03.11). Hai công cụ đó kiểm một ứng viên cho trước, nhưng chưa nói ứng viên nằm ở đâu trong vô số điểm khả thi. Chương này chứng minh rằng, dưới hai giả thiết nêu rõ, chỉ cần xét hữu hạn điểm gọi là đỉnh, tính được chúng bằng đại số và đi từ đỉnh này sang đỉnh khác; phần cuối chương xét các quyết định chọn theo chuỗi.

![Hai ô cạnh nhau. Ô trái, nhãn "Một véc-tơ quyết định": miền khả thi của một quy hoạch tuyến tính hai biến được tô kín, ghi "vô số điểm khả thi", có năm đỉnh được đánh dấu, ghi "5 đỉnh". Ô phải, nhãn "Một chuỗi quyết định": đồ thị ba tầng đi từ nút s qua A, B rồi C, D tới nút t, ghi "4 đường đi s → t".](img/lec-07/central-problem.svg)

Hình đặt hai cấu trúc của chương cạnh nhau. Ở ô trái, miền phẳng có vô số điểm nhưng chỉ năm đỉnh; Mục 3–4 chứng minh rằng khi bài toán có nghiệm tối ưu và miền có đỉnh, có một đỉnh tối ưu. Ở ô phải, mỗi phương án là một đường đi qua nhiều tầng; Mục 5–6 chỉ ra rằng chi phí tốt nhất từ một nút tới đích không phụ thuộc đường đã đi tới nút đó, nên mỗi nút chỉ cần tính một lần.

### 1.1 Biến, đơn vị và ràng buộc

Một mô hình xác định đại lượng được chọn (biến quyết định), đại lượng cố định (dữ kiện), rồi viết lợi ích và các giới hạn thành biểu thức của biến. Đơn vị của biến được ghi ngay từ đầu, vì mỗi ràng buộc so sánh hai vế cùng đơn vị.

::: example Ví dụ 07.1 (Bài toán hộp hạt: từ bảng dữ kiện đến ràng buộc)
**Dữ kiện.** Một cơ sở đóng hai loại hộp hạt. Biến quyết định $x_1$, $x_2$ là sản lượng loại 1 và loại 2, tính theo nghìn hộp.

| Dữ kiện | Loại 1 | Loại 2 | Giới hạn chung |
|---|---:|---:|---:|
| Lợi ích (đơn vị / nghìn hộp) | $2$ | $3$ | không có |
| Giờ máy (giờ / nghìn hộp) | $1$ | $2$ | $54$ giờ |
| Sản lượng tối đa (nghìn hộp) | $30$ | $20$ | không có |

**Ràng buộc sản lượng.** Hai giới hạn sản lượng áp dụng riêng cho từng loại, đơn vị nghìn hộp:

$$
x_1\le30,\qquad x_2\le20 .
$$

**Ràng buộc giờ máy.** Loại 1 dùng $1\cdot x_1$ giờ, loại 2 dùng $2x_2$ giờ; hai loại dùng chung $54$ giờ, nên vế trái và vế phải cùng tính bằng giờ:

$$
x_1+2x_2\le54 .
$$

**Miền biến.** Sản lượng không âm: $x_1\ge0$, $x_2\ge0$.

**Kiểm một phương án.** Phương án $(30,20)$ thỏa hai giới hạn sản lượng với dấu bằng. Nó dùng $30+2\cdot20=70$ giờ máy, vượt giới hạn $16$ giờ.

**Kiểm tra lại.** Phương án $(30,12)$ dùng $30+2\cdot12=54$ giờ, đúng bằng giới hạn, và $30\le30$, $12\le20$, nên thỏa mọi ràng buộc.
:::

Ví dụ cho thấy khả thi phải kiểm trên mọi ràng buộc cùng lúc: $(30,20)$ đặt mỗi loại ở mức tối đa riêng, còn giờ máy dùng chung không đủ. Viết lại thành $x_1\le54-2x_2$, ràng buộc giờ máy cho thấy mỗi nghìn hộp loại 2 làm giảm $2$ nghìn hộp cận trên của loại 1.

Thiếu điều kiện không âm, mô hình cho phép một giá trị $x_2$ âm "giải phóng" giờ máy cho loại 1. Nhầm lẫn thường gặp là coi miền biến là hiển nhiên và bỏ khỏi mô hình; miền khả thi khi đó đổi và có thể không còn bị chặn.

![Sơ đồ bốn khối nối từ trái sang phải. Khối "Dữ kiện": đơn vị nghìn hộp, giới hạn 30 và 20, nguồn 54 giờ máy, tiêu hao 1 và 2 giờ mỗi nghìn hộp. Khối "Biến": x1 là nghìn hộp loại 1, x2 là nghìn hộp loại 2, x1, x2 lớn hơn hoặc bằng 0. Khối "Ràng buộc": x1 ≤ 30, x2 ≤ 20, x1+2x2 ≤ 54. Khối "Mục tiêu": cực đại 2x1+3x2, đơn vị lợi ích. Dòng chú thích: chỉ cộng các đại lượng có đơn vị tương thích trong cùng một ràng buộc.](img/lec-07/lp-model-units.svg)

Sơ đồ theo thứ tự dựng mô hình: dữ kiện có đơn vị, biến, ràng buộc, mục tiêu. Dòng chú thích là phép kiểm đơn vị: trong ràng buộc giờ máy, $1\cdot x_1$ và $2x_2$ đều tính bằng giờ.

### 1.2 Hàm mục tiêu và định nghĩa quy hoạch tuyến tính

Các ràng buộc chỉ cho biết phương án nào được phép. Để chọn giữa các phương án khả thi, mô hình cần một hàm đo lợi ích; với bài hộp hạt, đó là tổng lợi ích $z=2x_1+3x_2$, tính bằng đơn vị lợi ích.

::: example Ví dụ 07.2 (So sánh vài phương án của bài hộp hạt)
**Dữ kiện.** Bài hộp hạt: cực đại $z=2x_1+3x_2$ dưới các ràng buộc $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$ (Ví dụ 07.1).

**Hai phương án dùng hết giờ máy.**

- Phương án $(30,12)$ là giao của $x_1=30$ với $x_1+2x_2=54$; nó cho $z=2\cdot30+3\cdot12=96$.
- Phương án $(14,20)$ là giao của $x_2=20$ với cùng đường giờ máy; nó cho $z=2\cdot14+3\cdot20=88$.

**Đọc chênh lệch.** Đi từ $(14,20)$ sang $(30,12)$:

- loại 1 tăng $16$ nghìn hộp, thêm $2\cdot16=32$ đơn vị lợi ích và dùng thêm $16$ giờ máy;
- loại 2 giảm $8$ nghìn hộp, mất $3\cdot8=24$ đơn vị và trả lại $2\cdot8=16$ giờ máy.

Tính trên mỗi giờ máy, loại 1 đem $\tfrac21=2$ đơn vị còn loại 2 đem $\tfrac32=1{,}5$ đơn vị.

**Phương án không khả thi.** Phương án $(30,20)$ có $z=120$, lớn hơn cả hai, nhưng dùng $70$ giờ máy nên không được đưa vào so sánh.

**Kiểm tra lại.** Chênh lệch $96-88=8$ bằng $32-24$, khớp phép đọc theo giờ máy.
:::

So sánh vài điểm không chứng minh được điểm nào tối ưu, vì miền khả thi có vô số điểm. Cần một lập luận chỉ ra một tập ứng viên hữu hạn, và lập luận đó phải áp dụng cho mọi bài toán có cùng dạng. Định nghĩa sau tách phần chung của các bài toán như vậy khỏi các con số cụ thể.

::: definition Định nghĩa 07.1 (Quy hoạch tuyến tính)
**Bài toán.** Quy hoạch tuyến tính (linear programming, LP) là bài toán cực đại hoặc cực tiểu một hàm tuyến tính $c^Tx$ của biến $x\in\mathbb R^n$ trên tập các điểm thỏa hữu hạn phương trình và bất phương trình tuyến tính. Dạng dùng trong Mục 1, với dữ kiện $c\in\mathbb R^n$, $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$, là

$$
\begin{aligned}
\max_{x\in\mathbb R^n}\quad&c^Tx\\
&Ax\le b,\quad x\ge0,
\end{aligned}
\tag{1.1}
$$

trong đó dòng thứ nhất là mục tiêu và dòng thứ hai là các ràng buộc. Chương dùng cách viết hai dòng này cho mọi bài toán có ràng buộc.

**Phương án và miền khả thi.** Mỗi $x\in\mathbb R^n$ là một phương án; phương án thỏa mọi ràng buộc là phương án khả thi; tập $P$ các phương án khả thi là miền khả thi.

**Giá trị và nghiệm tối ưu.** Giá trị tối ưu là $z^*=\sup_{x\in P}c^Tx$, với quy ước $z^*=-\infty$ khi $P=\varnothing$. Một nghiệm tối ưu là $x^*\in P$ với $c^Tx^*=z^*$.
:::

Định nghĩa có ba thành phần.

- Dữ kiện: $c$, $A$, $b$ và chiều tối ưu, cố định trước khi giải.
- Quyết định: biến $x$, đại lượng được chọn.
- Lời giải: giá trị tối ưu cùng một nghiệm tối ưu, hoặc kết luận rằng bài toán không có nghiệm tối ưu.

Dạng (1.1) là một quy ước chứ không hạn chế tính tổng quát: bất phương trình $\ge$ nhân với $-1$ thành $\le$, phương trình thành hai bất phương trình ngược chiều, biến tự do (free variable) thành hiệu của hai biến không âm, và bài cực tiểu đổi thành cực đại bằng $\min c^Tx=-\max(-c^Tx)$.

So với Định nghĩa 02.9, định nghĩa này viết bài toán ở chiều cực đại vì ví dụ chính của chương là bài lợi ích; Bài 02 viết ở chiều cực tiểu. Hai cách viết có cùng tập nghiệm và giá trị tối ưu trái dấu. Bertsimas và Tsitsiklis (1997, §1.1) cũng viết ở chiều cực tiểu, nên khi đối chiếu cần đổi dấu $c$.

Hai bài toán sau không phải quy hoạch tuyến tính, và lý do khác nhau.

- Mục tiêu $x_1x_2$ hoặc ràng buộc $x_1^2\le4$ không tuyến tính theo $x$.
- Bài hộp hạt với thêm điều kiện $x_1,x_2$ nguyên có mọi biểu thức tuyến tính, nhưng miền quyết định rời rạc. Bài toán khi đó là quy hoạch nguyên (integer programming), nội dung Buổi 10 (Chương 13) của đề cương học phần.

::: example Ví dụ 07.3 (Bài hộp hạt ở dạng (1.1))
**Dữ kiện.** Bài hộp hạt: cực đại $2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$.

**Ánh xạ.** Có $n=2$ biến và $m=3$ giới hạn. Xếp các giới hạn theo thứ tự sản lượng loại 1, sản lượng loại 2, giờ máy:

$$
c=\begin{bmatrix}2\\3\end{bmatrix},\qquad
A=\begin{bmatrix}1&0\\0&1\\1&2\end{bmatrix},\qquad
b=\begin{bmatrix}30\\20\\54\end{bmatrix}.
$$

**Đọc ma trận.** Hàng thứ $i$ của $A$ ứng với giới hạn thứ $i$; hàng thứ ba $(1,2)$ chứa số giờ máy trên mỗi nghìn hộp của hai loại. Cột thứ $j$ của $A$ là mức tiêu hao của sản phẩm $j$ trên ba giới hạn.

**Kiểm tra lại.** Tại $x=(30,12)$: $Ax=(30,12,54)$, không vượt $b=(30,20,54)$ ở thành phần nào, và $c^Tx=96$, khớp Ví dụ 07.2.
:::

Trước khi tìm kiếm trên miền khả thi, có thể loại ngay một phần của miền. Kết quả sau dùng tính tuyến tính của mục tiêu để chỉ ra rằng nghiệm tối ưu, nếu có, nằm trên biên của miền.

::: proposition Mệnh đề 07.2 (Điểm trong không tối ưu)
**Giả thiết.** $P\subseteq\mathbb R^n$ là một tập bất kỳ, $c\in\mathbb R^n$, $c\ne0$. Điểm $\hat x\in P$ là điểm trong của $P$: có $\varepsilon>0$ để mọi $x$ với $\lVert x-\hat x\rVert\le\varepsilon$ đều thuộc $P$, trong đó $\lVert\cdot\rVert$ là chuẩn Euclid.

**Kết luận.** Điểm $\hat x'=\hat x+\varepsilon\,c/\lVert c\rVert$ thuộc $P$ và $c^T\hat x'=c^T\hat x+\varepsilon\lVert c\rVert>c^T\hat x$. Do đó $\hat x$ không phải nghiệm tối ưu của bài cực đại $c^Tx$ trên $P$.

**Điều kiện áp dụng.** Chỉ cần $c\ne0$; không cần $P$ lồi hay là đa diện.

**Phạm vi.** Mệnh đề chỉ loại các điểm trong. Nó không nói nghiệm tối ưu tồn tại, cũng không nói điểm biên nào tối ưu.
:::

::: proof Chứng minh Mệnh đề 07.2
**Bước 1 (điểm mới thuộc $P$).** Khoảng cách từ $\hat x'$ tới $\hat x$ là $\lVert\varepsilon c/\lVert c\rVert\rVert=\varepsilon$, nên $\hat x'\in P$ theo giả thiết về $\varepsilon$.

**Bước 2 (mục tiêu tăng).** Theo tính tuyến tính, $c^T\hat x'=c^T\hat x+\varepsilon\,c^Tc/\lVert c\rVert=c^T\hat x+\varepsilon\lVert c\rVert$. Vì $c\ne0$, số hạng thêm vào dương. $\square$
:::

Mệnh đề nói rằng với mục tiêu tuyến tính khác $0$, mọi điểm trong đều có một điểm khả thi tốt hơn theo hướng $c$. Giả thiết $c\ne0$ cần thiết: với $c=0$, mọi điểm khả thi đều tối ưu, kể cả điểm trong.

So với Bài 04–06, đây là cách nói khác của sự kiện gradient $c$ của $c^Tx$ không bao giờ bằng $0$. Ở bài không ràng buộc, điều đó có nghĩa mục tiêu không có cực trị; ở bài có ràng buộc, nó đẩy nghiệm ra biên, nơi một số ràng buộc thỏa với dấu bằng. Mục 2–3 làm chính xác ý "biên" thành khái niệm đỉnh.

**Trong học máy.** Bài phân bổ tài nguyên tính toán với lợi ích tuyến tính, chẳng hạn chia giờ chạy bộ xử lý đồ họa (graphics processing unit, GPU) giữa huấn luyện và phục vụ, có nghiệm tối ưu tại biên theo Mệnh đề 07.2, nơi ít nhất một giới hạn được dùng hết; Tình huống 07.2 đọc giới hạn đó từ các biến phụ. Mệnh đề không áp dụng khi lợi ích bão hòa theo giờ huấn luyện, vì mục tiêu khi đó không tuyến tính.

Mệnh đề 07.2 và cả chương dùng tính tuyến tính của mô hình, và tính tuyến tính chứa những giả thiết về thực tế. Nhận xét sau nêu chúng, vì khi một giả thiết sai, mô hình tuyến tính trả lời một câu hỏi khác với câu hỏi ban đầu.

::: remark Nhận xét 07.3 (Ba giả thiết mô hình của quy hoạch tuyến tính)
**Tỉ lệ.** Tăng gấp đôi sản lượng một loại thì lợi ích và mức tiêu hao của loại đó tăng gấp đôi. Một chi phí cố định phát sinh ngay khi bắt đầu sản xuất một loại vi phạm giả thiết này: lợi ích của loại 1 thành $2x_1-5$ khi $x_1>0$ và $0$ khi $x_1=0$, một hàm không tuyến tính.

**Cộng tính.** Đóng góp của các loại cộng với nhau. Nếu hai loại chạy chung làm máy nóng và sản lượng mỗi giờ giảm theo tích $x_1x_2$, giả thiết này sai.

**Chia được.** Biến nhận mọi giá trị thực trong miền. Đơn vị nghìn hộp cho phép coi sản lượng là đại lượng liên tục ở mức lập kế hoạch: $x_1=12{,}5$ ứng với $12\,500$ hộp. Khi quyết định là số lô nguyên, bài toán là quy hoạch nguyên.
:::

::: exercise Bài tập 07.1 (Dựng mô hình từ dữ kiện cho bằng lời)
Hai luồng suy luận dùng chung một GPU trong một giờ. Mỗi nghìn yêu cầu của luồng 1 và luồng 2 đem lợi ích $4$ và $5$ đơn vị, và dùng $2$ và $1$ phút GPU. GPU có ngân sách $14$ phút trong giờ đó; luồng 1 nhận tối đa $8$ nghìn yêu cầu, luồng 2 nhận tối đa $6$ nghìn yêu cầu.

- (a) Nêu biến quyết định và đơn vị.
- (b) Viết hàm mục tiêu và chiều tối ưu.
- (c) Viết mọi ràng buộc và miền biến; viết bài toán ở dạng (1.1) với $c$, $A$, $b$ cụ thể.
- (d) Kiểm tính khả thi của phương án $(4,6)$ và tính giá trị mục tiêu tại đó.
:::

::: hint
Một nghìn yêu cầu luồng 1 dùng $2$ phút; ràng buộc GPU so sánh tổng số phút với $14$ phút, không phải với $60$ phút của cả giờ.
:::

::: solution
**Câu (a).** $x_1$, $x_2$ là số nghìn yêu cầu của luồng 1 và luồng 2 được phục vụ trong giờ đó.

**Câu (b).** Cực đại $4x_1+5x_2$, tính bằng đơn vị lợi ích.

**Câu (c).** Ràng buộc GPU, tính bằng phút: $2x_1+x_2\le14$. Hai giới hạn yêu cầu, tính bằng nghìn yêu cầu: $x_1\le8$, $x_2\le6$. Miền biến: $x_1,x_2\ge0$. Dạng (1.1) có

$$
c=\begin{bmatrix}4\\5\end{bmatrix},\qquad A=\begin{bmatrix}2&1\\1&0\\0&1\end{bmatrix},\qquad b=\begin{bmatrix}14\\8\\6\end{bmatrix}.
$$

**Câu (d).** Phương án $(4,6)$ dùng $2\cdot4+6=14$ phút, đúng bằng ngân sách; $4\le8$ và $6\le6$. Vậy $(4,6)$ khả thi, với hai ràng buộc chặt là GPU và giới hạn luồng 2. Giá trị mục tiêu là $4\cdot4+5\cdot6=46$.

**Kiểm tra lại.** Ba lỗi thường gặp: đảo hệ số thành $x_1+2x_2\le14$, dùng $60$ phút thay cho ngân sách $14$ phút, và quên miền biến. Với $Ax$ tại $(4,6)$: $(14,4,6)\le(14,8,6)$. Câu hỏi chỉ yêu cầu kiểm khả thi; kết luận $(4,6)$ có tối ưu hay không cần công cụ của Mục 4 (Bài tập 07.6 làm việc đó trên một đa giác khác).
:::

### 1.3 Hồi quy chuẩn $L_1$ dưới dạng quy hoạch tuyến tính

Định nghĩa 07.1 cho phép nhận ra quy hoạch tuyến tính trong những bài toán ban đầu không có dạng tuyến tính. Xét hồi quy với $M$ mẫu: mẫu $i$ có véc-tơ đặc trưng $h_i\in\mathbb R^n$ và giá trị đích $y_i\in\mathbb R$, tham số của mô hình tuyến tính là $x\in\mathbb R^n$, và phần dư của mẫu $i$ là

$$
r_i=h_i^Tx-y_i .
$$

Phần dư là sai lệch giữa dự đoán $h_i^Tx$ và giá trị đích; dấu của nó cho biết mô hình dự đoán thừa hay thiếu.

Bình phương nhỏ nhất của Bài 01 cực tiểu $\sum_ir_i^2$ và khuếch đại các mẫu ngoại lai (outlier): một phần dư bằng $10$ đóng góp $100$ vào tổng bình phương nhưng chỉ $10$ vào tổng trị tuyệt đối. Hồi quy chuẩn $L_1$, còn gọi là hồi quy sai số tuyệt đối (least absolute deviations, Định nghĩa 02.13), cực tiểu $\sum_i|r_i|$. Mục tiêu này không khả vi tại các điểm có $r_i=0$, nên các bước gradient của Bài 04–06 không dùng trực tiếp được.

Trực giác, chưa phải phát biểu hình thức: trị tuyệt đối là giá trị nhỏ nhất của một biến thêm vào, gọi là biến chặn, khi biến đó bị chặn dưới bởi hai hàm tuyến tính,

$$
|r|=\min\{t\in\mathbb R:\ t\ge r,\ t\ge-r\}.
$$

Theo đẳng thức này, $t$ phải không nhỏ hơn cả $r$ và $-r$, tức không nhỏ hơn số lớn hơn trong hai số, và số đó là $|r|$.

![Mặt phẳng với trục ngang r và trục đứng t. Đồ thị chữ V của t bằng trị tuyệt đối của r, gồm hai nhánh t = r và t = −r. Vùng phía trên chữ V được tô, ghi t ≥ r và t ≥ −r. Một mũi tên thẳng đứng ghi "giảm t" chỉ xuống tới chữ V tại một r cố định.](img/lec-07/l1-residual-slack.svg)

Hình vẽ đồ thị chữ V của $t=|r|$; vùng tô phía trên là tập các cặp $(r,t)$ thỏa $t\ge r$ và $t\ge-r$, giao của hai nửa mặt phẳng. Trên đường thẳng đứng tại một $r$ cố định, điểm thấp nhất của vùng tô nằm trên chữ V, nên giá trị nhỏ nhất của $t$ bằng $|r|$. Ví dụ sau dùng ý này trên hai mẫu.

::: example Ví dụ 07.4 (Tổng hai trị tuyệt đối)
**Dữ kiện.** Hai mẫu một chiều với $h_1=h_2=1$, $y_1=1$, $y_2=3$; tham số $x\in\mathbb R$. Bài toán là cực tiểu $|x-1|+|x-3|$.

**Giải trực tiếp theo ba khoảng.**

- Với $x\in[1,3]$: $|x-1|+|x-3|=(x-1)+(3-x)=2$.
- Với $x>3$: tổng bằng $2x-4>2$.
- Với $x<1$: tổng bằng $4-2x>2$.

Giá trị tối ưu là $2$, đạt tại mọi $x\in[1,3]$.

**Dạng có biến chặn.** Với hai biến chặn $t_1$, $t_2$, bài toán viết thành: cực tiểu $t_1+t_2$ dưới bốn ràng buộc $-t_1\le x-1\le t_1$, $-t_2\le x-3\le t_2$. Tại $x=2$, chọn $t_1=t_2=1$ thì mọi ràng buộc thỏa và $t_1+t_2=2$.

**Kiểm tra lại.** Tại $x=2$, chọn $t_1=3$, $t_2=1$ vẫn khả thi nhưng cho $4>2$; giảm $t_1$ về $|x-1|=1$ làm mục tiêu giảm. Nghiệm không duy nhất: $x=1$ và $x=3$ cùng cho $2$.
:::

Ví dụ cho thấy hai bất phương trình tuyến tính thay được một trị tuyệt đối, và mục tiêu cực tiểu tự đẩy biến chặn xuống bằng trị tuyệt đối. Phát biểu chung là một trường hợp riêng của Định lý 02.15. Viết lại định lý đó với ký hiệu cục bộ: tập $D\subseteq\mathbb R^n$, hàm $\phi:D\to\mathbb R$, các hàm affine $\ell_{ij}$ với $i=1,\ldots,M$ và $j$ chạy trên một tập chỉ số hữu hạn, và trọng số $\gamma_i\ge0$. Định lý so sánh hai bài

$$
\begin{aligned}
(\mathrm P):&\quad\min_{x\in D}\ \phi(x)+\sum_{i=1}^M\gamma_i\max_j\ell_{ij}(x),\\
(\mathrm Q):&\quad\min_{x\in D,\ t\in\mathbb R^M}\ \phi(x)+\sum_{i=1}^M\gamma_it_i,\quad\ell_{ij}(x)\le t_i\ \ \forall i,j,
\end{aligned}
$$

và kết luận hai điều sau.

- (a) Hai bài có cùng giá trị tối ưu. Nếu $x^*$ là nghiệm của $(\mathrm P)$ thì $(x^*,t^*)$ với $t_i^*=\max_j\ell_{ij}(x^*)$ là nghiệm của $(\mathrm Q)$; nếu $(x^*,t^*)$ là nghiệm của $(\mathrm Q)$ thì $x^*$ là nghiệm của $(\mathrm P)$.
- (b) Khi $\gamma_i>0$, mọi nghiệm $(x^*,t^*)$ của $(\mathrm Q)$ có $t_i^*=\max_j\ell_{ij}(x^*)$.

::: corollary Hệ quả 07.4 (Hồi quy $L_1$ là một quy hoạch tuyến tính)
**Giả thiết.** $M$ mẫu với $h_i\in\mathbb R^n$, $y_i\in\mathbb R$, phần dư $r_i=h_i^Tx-y_i$.

**Kết luận.** Bài toán $\min_{x\in\mathbb R^n}\sum_{i=1}^M|r_i|$ tương đương với quy hoạch tuyến tính theo biến $(x,t)\in\mathbb R^{n+M}$

$$
\begin{aligned}
\min_{x,\,t}\quad&\sum_{i=1}^Mt_i\\
&-t_i\le h_i^Tx-y_i\le t_i,\quad i=1,\ldots,M .
\end{aligned}
\tag{1.2}
$$

Cụ thể:

- (a) hai bài có cùng giá trị tối ưu;
- (b) nếu $x^*$ là nghiệm của bài gốc thì $(x^*,t^*)$ với $t_i^*=|h_i^Tx^*-y_i|$ là nghiệm của (1.2);
- (c) nếu $(x^*,t^*)$ là nghiệm của (1.2) thì $x^*$ là nghiệm của bài gốc và $t_i^*=|h_i^Tx^*-y_i|$ với mọi $i$.

**Điều kiện áp dụng.** Bài cực tiểu; mỗi trị tuyệt đối có hệ số dương.

**Phạm vi.** Hệ quả không cho nghiệm duy nhất, và không áp dụng cho bài cực đại một tổng trị tuyệt đối.
:::

::: proof Chứng minh Hệ quả 07.4
**Bước 1 (đặt vào Định lý 02.15).** Lấy $D=\mathbb R^n$, $\phi=0$, $M$ hàm cực đại với $\gamma_i=1$, mỗi hàm cực đại của hai hàm affine $\ell_{i1}(x)=h_i^Tx-y_i$, $\ell_{i2}(x)=-(h_i^Tx-y_i)$. Vì $\max(r,-r)=|r|$, bài gốc là bài $(\mathrm P)$ ở trên.

**Bước 2 (đọc bài có biến chặn; kết luận (a), (c) của hệ quả).** Hai ràng buộc $\ell_{i1}(x)\le t_i$ và $\ell_{i2}(x)\le t_i$ chính là $-t_i\le h_i^Tx-y_i\le t_i$, nên bài $(\mathrm Q)$ là (1.2). Phần (a) của Định lý 02.15 cho cùng giá trị tối ưu và cho chiều từ nghiệm của (1.2) sang nghiệm của bài gốc; phần (b) của Định lý 02.15, với $\gamma_i=1>0$, cho $t_i^*=|h_i^Tx^*-y_i|$ tại mọi nghiệm của (1.2).

**Bước 3 (chiều từ bài gốc sang (1.2); kết luận (b) của hệ quả).** Với nghiệm $x^*$ của bài gốc, điểm $(x^*,t^*)$ với $t_i^*=|h_i^Tx^*-y_i|$ khả thi cho (1.2) và có giá trị $\sum_i|h_i^Tx^*-y_i|$, bằng giá trị tối ưu chung, nên là nghiệm. $\square$
:::

Bài (1.2) có mục tiêu tuyến tính và $2M$ ràng buộc tuyến tính, nên là một quy hoạch tuyến tính theo Định nghĩa 07.1. Hai bất phương trình của mẫu $i$ tương đương với $t_i\ge|r_i|$, nên điều kiện $t_i\ge0$ không cần viết thêm.

Hai nhầm lẫn thường gặp.

- Hai bất phương trình chỉ cho $t_i\ge|r_i|$; dấu bằng tại nghiệm xuất hiện nhờ hệ số dương của $t_i$ trong mục tiêu cực tiểu. Nếu đổi sang cực đại $\sum_it_i$, bài (1.2) không bị chặn.
- Không khả vi không có nghĩa không lồi: $\sum_i|r_i|$ lồi theo Định lý 01.31, chỉ có điều gradient không xác định tại các điểm gãy.

**Trong học máy.** Hồi quy $L_1$ ước lượng trung vị có điều kiện của giá trị đích, nên ít nhạy với ngoại lai hơn bình phương nhỏ nhất. Koenker và Bassett (1978) mở rộng nó thành hồi quy phân vị. Hệ quả 07.4 cho phép giải nó bằng một bộ giải quy hoạch tuyến tính với $n+M$ biến và $2M$ ràng buộc thay cho phương pháp gradient; Mệnh đề 07.25 ở Mục 4 chứng minh thêm rằng, khi các véc-tơ đặc trưng sinh $\mathbb R^n$, bài (1.2) có một nghiệm làm ít nhất $n$ phần dư bằng $0$, và Tình huống 07.1 dùng điều đó trên một bộ dữ liệu có ngoại lai.

::: exercise Bài tập 07.2 (Mô hình hằng với mất mát $L_1$)
Ba mẫu có giá trị đích $y_1=0$, $y_2=2$, $y_3=6$; mô hình hằng dự đoán cùng một số $x\in\mathbb R$ cho mọi mẫu, tức $h_i=1$.

- (a) Viết bài cực tiểu $\sum_i|x-y_i|$ thành quy hoạch tuyến tính dạng (1.2); nêu số biến và số ràng buộc.
- (b) Tìm nghiệm và giá trị tối ưu.
- (c) Tìm nghiệm của bình phương nhỏ nhất $\sum_i(x-y_i)^2$, so với (b), và xác định mẫu kéo nghiệm đó ra xa trung vị nhất.
:::

::: hint
Ở (b), viết hàm $\sum_i|x-y_i|$ trên từng khoảng $(-\infty,0]$, $[0,2]$, $[2,6]$, $[6,\infty)$ và xét độ dốc.
:::

::: solution
**Câu (a).** Biến $(x,t_1,t_2,t_3)\in\mathbb R^4$; cực tiểu $t_1+t_2+t_3$ dưới sáu ràng buộc $-t_1\le x\le t_1$, $-t_2\le x-2\le t_2$, $-t_3\le x-6\le t_3$.

**Câu (b).** Độ dốc của $\sum_i|x-y_i|$ bằng số mẫu có $y_i<x$ trừ số mẫu có $y_i>x$.

- Trên $(-\infty,0)$ độ dốc là $0-3=-3$.
- Trên $(0,2)$ độ dốc là $1-2=-1$.
- Trên $(2,6)$ độ dốc là $2-1=1$.
- Trên $(6,\infty)$ độ dốc là $3-0=3$.

Hàm giảm tới $x=2$ rồi tăng, nên nghiệm duy nhất là $x^*=2$, trung vị của ba giá trị, với giá trị $2+0+4=6$. Nghiệm của (1.2) là $(2,2,0,4)$.

**Câu (c).** Bình phương nhỏ nhất cho trung bình $x=\tfrac{0+2+6}3=\tfrac83$. Mẫu $y_3=6$ ở xa nhất và kéo trung bình lên; trung vị không đổi nếu thay $6$ bằng $60$, còn trung bình thành $\tfrac{62}3$.

**Kiểm tra lại.** Tại $x=2$: $|2-0|+|2-2|+|2-6|=6$; tại $x=\tfrac83$: $\tfrac83+\tfrac23+\tfrac{10}3=\tfrac{20}3>6$.
:::

**Chuỗi suy luận của mục.** Ví dụ 07.1 và Ví dụ 07.2 dựng mô hình hộp hạt từ bảng dữ kiện. Định nghĩa 07.1 tách phần chung thành dạng (1.1), Nhận xét 07.3 nêu giả thiết mô hình, và Mệnh đề 07.2 cho biết nghiệm nằm trên biên. Hệ quả 07.4 mở rộng phạm vi của định nghĩa sang hồi quy $L_1$.

**Kết mục.** Mục đã cho cách viết một bài toán quyết định thành quy hoạch tuyến tính (Định nghĩa 07.1, Hệ quả 07.4) và biết nghiệm tối ưu, nếu có, nằm trên biên (Mệnh đề 07.2). Biên vẫn có vô số điểm. Mục 2 mô tả miền khả thi bằng hữu hạn nửa không gian và tính các điểm góc bằng hệ phương trình.

## 2. Đa diện, dạng chuẩn và nghiệm cơ sở

Mục 1 để lại một khoảng trống: phương án $(30,12)$ cho $z=96$ lớn hơn các phương án đã thử, nhưng chưa có lập luận nào loại vô số phương án còn lại. Mục này chứng minh $2x_1+3x_2\le96$ trên toàn miền hộp hạt, rồi tìm cách tính các điểm góc của miền chỉ bằng đại số, để dùng được khi có nhiều biến và không còn vẽ được hình.

### 2.1 Đa diện và đường mức

Trên mặt phẳng $(x_1,x_2)$, có thể vẽ cùng lúc miền khả thi và các đường trên đó mục tiêu nhận một giá trị cố định. Mỗi bất phương trình $a^Tx\le\beta$ giữ lại một nửa mặt phẳng nằm về một phía của đường biên $a^Tx=\beta$, và miền khả thi là phần chung của các nửa mặt phẳng đó.

![Mặt phẳng x1, x2. Miền khả thi của bài hộp hạt là ngũ giác tô màu với năm đỉnh (0,0), (30,0), (30,12), (14,20), (0,20). Đường mức nét đứt z = 60 đi qua hai đỉnh (30,0) và (0,20). Đường mức song song z = 96 chỉ chạm miền tại đỉnh (30,12). Mũi tên ghi "tăng z" chỉ theo hướng véc-tơ (2,3).](img/lec-07/polyhedron-level-sets.svg)

Giao của năm nửa mặt phẳng trên hình là ngũ giác có năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$; đường giờ máy cắt hai trục tại $(54,0)$ và $(0,27)$. Các đường $2x_1+3x_2=\alpha$, gọi là đường mức (level set) của mục tiêu, song song vì cùng véc-tơ pháp tuyến $c=(2,3)$. Tăng $\alpha$ tịnh tiến đường mức theo hướng $c$, và đường mức cuối cùng còn chạm miền là $z=96$, tại đúng một đỉnh.

::: example Ví dụ 07.5 (Cận trên của mục tiêu hộp hạt)
**Dữ kiện.** Bài hộp hạt: cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$. Năm đỉnh của ngũ giác khả thi là $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$.

**Giá trị tại năm đỉnh.** Lần lượt là $0$, $60$, $96$, $88$, $60$. Đường mức $z=60$ cắt miền theo đoạn nối $(30,0)$ và $(0,20)$.

**Cận trên bằng tổ hợp không âm.** Tìm hệ số $\mu_1,\mu_3\ge0$ để $2x_1+3x_2=\mu_1x_1+\mu_3(x_1+2x_2)$. So hệ số của $x_2$: $2\mu_3=3$, nên $\mu_3=\tfrac32$. So hệ số của $x_1$: $\mu_1+\mu_3=2$, nên $\mu_1=\tfrac12$. Với mọi phương án khả thi,

$$
\begin{aligned}
2x_1+3x_2&=\tfrac12x_1+\tfrac32(x_1+2x_2)\\
&\le\tfrac12\cdot30+\tfrac32\cdot54\\
&=96 .
\end{aligned}
$$

Dòng thứ hai dùng $x_1\le30$, $x_1+2x_2\le54$ và hai hệ số không âm.

**Dấu bằng.** Dấu bằng xảy ra khi và chỉ khi $x_1=30$ và $x_1+2x_2=54$, tức $x=(30,12)$. Điểm này khả thi, nên nó là nghiệm tối ưu duy nhất và $z^*=96$.

**Kiểm tra lại.** Hai hệ số cho $\tfrac12+\tfrac32=2$ ở $x_1$ và $\tfrac32\cdot2=3$ ở $x_2$. Tại $(14,20)$: $\tfrac12\cdot14+\tfrac32\cdot54=7+81=88$, khớp $z=88$ vì $x_1+2x_2=54$ chặt tại đó.
:::

Ví dụ trả lời phần thứ nhất của bài toán bằng cơ chế của Mệnh đề 02.11 viết cho chiều cực đại; hai hệ số $\tfrac12$, $\tfrac32$ là nhân tử của bài đối ngẫu (Mệnh đề 03.11). Cách làm này cần đoán đúng hai ràng buộc chặt tại nghiệm, điều hình gợi ý được trong mặt phẳng nhưng không trong nhiều chiều. Các mục sau cho một cách tìm ứng viên có hệ thống.

::: definition Định nghĩa 07.5 (Siêu phẳng, nửa không gian, đa diện)
Cho $a\in\mathbb R^n$, $a\ne0$, và $\beta\in\mathbb R$.

**Siêu phẳng và nửa không gian.** Tập $\{x\in\mathbb R^n\mid a^Tx=\beta\}$ là một siêu phẳng (hyperplane); tập $\{x\in\mathbb R^n\mid a^Tx\le\beta\}$ là một nửa không gian (halfspace).

**Đa diện.** Cho $A\in\mathbb R^{m\times n}$ với các hàng $a_1^T,\ldots,a_m^T$ và $b\in\mathbb R^m$. Tập

$$
P=\{x\in\mathbb R^n\mid Ax\le b\}
\tag{2.1}
$$

là một đa diện (polyhedron); nó là giao của $m$ nửa không gian $\{x\mid a_i^Tx\le b_i\}$.

**Bị chặn.** Đa diện $P$ bị chặn nếu có $K\ge0$ để $\lVert x\rVert\le K$ với mọi $x\in P$.
:::

Định nghĩa chỉ dùng bất phương trình nên áp dụng được trong mọi chiều. Một đa diện có thể rỗng, kéo dài vô hạn, hoặc có số chiều nhỏ hơn $n$, nên "đa diện" rộng hơn "đa giác". Miền khả thi của dạng (1.1) là đa diện với $m+n$ hàng: $m$ hàng của $Ax\le b$ cộng $n$ hàng $-x_j\le0$.

Trong mặt phẳng, siêu phẳng là một đường thẳng và nửa không gian là một nửa mặt phẳng. Đường mức $c^Tx=\alpha$ của mục tiêu là một siêu phẳng với véc-tơ pháp tuyến $c$. Ràng buộc có dạng $a^Tx\ge\beta$ viết lại thành $(-a)^Tx\le-\beta$ để đúng dạng (2.1).

::: proposition Mệnh đề 07.6 (Đa diện là tập lồi; tập dạng chuẩn là đa diện)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$. Riêng cho phần (b): $A'\in\mathbb R^{m'\times n}$, $b'\in\mathbb R^{m'}$.

**Kết luận.**

- (a) $P$ là tập lồi.
- (b) Tập $Q=\{x\in\mathbb R^n\mid A'x=b',\ x\ge0\}$ là một đa diện, với $2m'+n$ bất phương trình.

**Điều kiện áp dụng.** Không cần giả thiết thêm.

**Phạm vi.** Mệnh đề không nói $P$ khác rỗng hay bị chặn.
:::

::: proof Chứng minh Mệnh đề 07.6
**Bước 1 (phần (a)).** Mỗi tập $\{x\mid a_i^Tx\le b_i\}$ lồi: với $a_i\ne0$ đó là nửa không gian, lồi theo Mệnh đề 01.19(c); với $a_i=0$ tập là $\mathbb R^n$ hoặc rỗng, cả hai đều lồi. $P$ là giao của $m$ tập lồi, nên lồi theo Mệnh đề 01.20(a).

**Bước 2 (phần (b)).** Phương trình $A'x=b'$ tương đương với hai bất phương trình $A'x\le b'$ và $-A'x\le-b'$, còn $x\ge0$ tương đương với $-x\le0$. Do đó $Q=\{x\mid\tilde Ax\le\tilde b\}$ với $\tilde A$ xếp chồng $A'$, $-A'$, $-I$ và $\tilde b$ xếp chồng $b'$, $-b'$, $0$. $\square$
:::

Phần (a) cho phép dùng tổ hợp lồi trên mọi miền khả thi của quy hoạch tuyến tính; Mục 3 dùng nó để định nghĩa điểm cực. Phần (b) cho biết mọi kết quả về đa diện dạng (2.1) vẫn áp dụng sau khi các bất phương trình được viết lại thành phương trình.

::: example Ví dụ 07.6 (Đa diện bị chặn và không bị chặn)
**Miền hộp hạt.** Mọi phương án khả thi có $0\le x_1\le30$ và $0\le x_2\le20$, nên $\lVert x\rVert\le\sqrt{30^2+20^2}=\sqrt{1300}\approx36{,}06$. Miền bị chặn với $K=\sqrt{1300}$.

**Một miền không bị chặn.** Tập $P_1=\{x\in\mathbb R^2\mid x_1+x_2\ge1,\ x\ge0\}$ viết ở dạng (2.1) với các hàng $-x_1-x_2\le-1$, $-x_1\le0$, $-x_2\le0$. Với mọi $\theta\ge1$, điểm $(\theta,0)$ thuộc $P_1$ và có chuẩn $\theta$, nên không có $K$ nào chặn được.

**Kiểm tra lại.** Tại $(\theta,0)$ với $\theta=5$: $5+0=5\ge1$, $5\ge0$, $0\ge0$.
:::

Nhầm lẫn thường gặp là đồng nhất "miền không bị chặn" với "mục tiêu không bị chặn". Trên $P_1$, bài cực đại $x_1$ không bị chặn trên, nhưng bài cực đại $-x_1-x_2$ có giá trị tối ưu $-1$, đạt trên cả đoạn $x_1+x_2=1$, $x\ge0$. Mục 4 phân loại đầy đủ các khả năng này.

**Trong học máy.** Tập trọng số của một tổ hợp mười mô hình, $\{p\in\mathbb R^{10}\mid p\ge0,\ \sum_jp_j=1\}$, là đa diện dạng chuẩn theo Mệnh đề 07.6(b); giới hạn ngân sách tính toán, bộ nhớ hay độ trễ tuyến tính theo tài nguyên là các nửa không gian. Tính lồi ở phần (a) cho phép dùng các kết quả về bài lồi của Bài 01–03 trên các miền này.

### 2.2 Dạng chuẩn

Đỉnh $(30,12)$ là giao của hai đường biên $x_1=30$ và $x_1+2x_2=54$. Tổng quát hơn, trong $\mathbb R^n$ một đỉnh là điểm duy nhất thỏa với dấu bằng một nhóm $n$ ràng buộc độc lập tuyến tính (Mục 3 chứng minh điều này). Để tính đỉnh bằng giải hệ phương trình, cần một cách viết trong đó mọi ràng buộc, trừ điều kiện không âm, đều là phương trình.

::: definition Định nghĩa 07.7 (Dạng chuẩn)
Cho $A\in\mathbb R^{m\times n}$ với $\operatorname{rank}(A)=m\le n$, $b\in\mathbb R^m$ và $c\in\mathbb R^n$. Quy hoạch tuyến tính dạng chuẩn (standard form) là

$$
\begin{aligned}
\max_{x\in\mathbb R^n}\quad&c^Tx\\
&Ax=b,\quad x\ge0 .
\end{aligned}
\tag{2.2}
$$

Miền khả thi của nó là $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$.
:::

Định nghĩa gồm ba thành phần: phương trình $Ax=b$, điều kiện không âm, và giả thiết hạng $\operatorname{rank}(A)=m$. Giả thiết hạng bảo đảm chọn được $m$ cột độc lập của $A$, tức một ma trận vuông khả nghịch, điều Mục 2.3 cần; nó kéo theo $m\le n$.

So với dạng chuẩn trong Định nghĩa 02.9, định nghĩa này viết ở chiều cực đại và thêm giả thiết hạng. Một số tài liệu gọi dạng $Ax\le b$ là "dạng chuẩn"; trong chương này, dạng chuẩn luôn là (2.2). Mệnh đề sau, phiên bản chiều cực đại của Mệnh đề 02.10, đưa mọi quy hoạch tuyến tính về dạng (2.2).

::: proposition Mệnh đề 07.8 (Đưa quy hoạch tuyến tính về dạng chuẩn)
**Giả thiết.** Bài gốc: cực đại $c^Tx$ trên $P=\{x\in\mathbb R^n\mid Ax\le b\}$, với $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$. Đặt $\tilde x=(x^+,x^-,s)\in\mathbb R^{2n+m}$ và

$$
\tilde A=\begin{bmatrix}A&-A&I\end{bmatrix},\qquad\tilde c=\begin{bmatrix}c\\-c\\0\end{bmatrix}.
$$

Bài mới: cực đại $\tilde c^T\tilde x$ trên $\tilde P=\{\tilde x\mid\tilde A\tilde x=b,\ \tilde x\ge0\}$.

**Kết luận.**

- (a) $\operatorname{rank}(\tilde A)=m$, nên bài mới ở dạng chuẩn (2.2).
- (b) Ánh xạ $\varphi(x)=(\max(x,0),\max(-x,0),b-Ax)$, với $\max$ lấy theo từng thành phần, đưa $P$ vào $\tilde P$ và $\tilde c^T\varphi(x)=c^Tx$.
- (c) Ánh xạ $\psi(x^+,x^-,s)=x^+-x^-$ đưa $\tilde P$ vào $P$ và $c^T\psi(\tilde x)=\tilde c^T\tilde x$.
- (d) Hai bài có cùng giá trị tối ưu; $\varphi$ biến nghiệm tối ưu của bài gốc thành nghiệm tối ưu của bài mới, và $\psi$ làm điều ngược lại.

**Điều kiện áp dụng.** Mọi dữ kiện. Biến nào đã có ràng buộc không âm thì không cần tách: chỉ thêm biến phụ cho các hàng còn lại.

**Phạm vi.** Ánh xạ $\psi$ không một-một: cộng cùng một số dương vào $x_j^+$ và $x_j^-$ cho một điểm khác của $\tilde P$ có cùng ảnh.
:::

::: proof Chứng minh Mệnh đề 07.8
**Bước 1 (phần (a)).** Khối $I$ gồm $m$ cột cuối của $\tilde A$, là $m$ véc-tơ đơn vị của $\mathbb R^m$, độc lập tuyến tính, nên $\operatorname{rank}(\tilde A)\ge m$; hạng không vượt số hàng $m$.

**Bước 2 (phần (b)).** Với $x\in P$, đặt $x^+=\max(x,0)$, $x^-=\max(-x,0)$, $s=b-Ax$. Ba véc-tơ không âm: hai véc-tơ đầu theo cách lấy $\max$, véc-tơ thứ ba vì $Ax\le b$. Với mỗi $j$, một trong hai số $x_j^+$, $x_j^-$ bằng $0$ và hiệu bằng $x_j$, nên $x^+-x^-=x$. Do đó

$$
\begin{aligned}
\tilde A\varphi(x)&=A(x^+-x^-)+s\\
&=Ax+(b-Ax)=b,
\end{aligned}
$$

và $\tilde c^T\varphi(x)=c^Tx^+-c^Tx^-=c^Tx$.

**Bước 3 (phần (c)).** Với $\tilde x\in\tilde P$, đặt $x=x^+-x^-$. Phương trình $\tilde A\tilde x=b$ cho $Ax=b-s\le b$ vì $s\ge0$, nên $x\in P$, và $c^Tx=c^Tx^+-c^Tx^-=\tilde c^T\tilde x$.

**Bước 4 (phần (d)).** Theo (b), mọi giá trị đạt được trên $P$ cũng đạt được trên $\tilde P$; theo (c), điều ngược lại cũng đúng. Hai tập giá trị bằng nhau, nên hai cận trên đúng bằng nhau. Nếu $x^*$ tối ưu cho bài gốc thì $\tilde c^T\varphi(x^*)=c^Tx^*$ bằng giá trị tối ưu chung, nên $\varphi(x^*)$ tối ưu; lập luận cho $\psi$ giống hệt. $\square$
:::

Mệnh đề cho phép chứng minh một kết quả về sự tồn tại nghiệm cho dạng chuẩn rồi chuyển nó sang mọi quy hoạch tuyến tính; Định lý 07.26 ở Mục 4 dùng đúng cách này. Bảng sau tóm tắt các phép chuyển theo từng loại ràng buộc, kể cả khi bài gốc có biến không âm sẵn hoặc có ràng buộc $\ge$.

| Dạng gốc | Dạng trong (2.2) | Tên biến thêm |
|---|---|---|
| $a^Tx\le\beta$ | $a^Tx+s=\beta$, $s\ge0$ | biến phụ (slack variable) |
| $a^Tx\ge\beta$ | $a^Tx-e=\beta$, $e\ge0$ | biến dư (surplus variable) |
| $x_j$ tự do | $x_j=x_j^+-x_j^-$, $x_j^+,x_j^-\ge0$ | hai biến không âm |
| cực tiểu $c^Tx$ | cực đại $-c^Tx$ | không thêm biến |

Biến phụ $s=\beta-a^Tx$ đo phần giới hạn chưa dùng; biến dư $e=a^Tx-\beta$ đo phần vượt trên một cận dưới. Ba phép đầu đều thêm biến, nên $n$ của dạng chuẩn đếm cả các biến mới. Biến chặn $t_i$ của hồi quy $L_1$ trong (1.2) cũng là biến thêm vào mô hình, nhưng nó chặn một trị tuyệt đối chứ không đo phần giới hạn chưa dùng; chương chỉ gọi $s_i$ là biến phụ.

::: remark Nhận xét 07.9 (Khi bài cho sẵn phương trình)
Nếu hệ $A'x=b'$ có nghiệm nhưng các hàng phụ thuộc tuyến tính, bỏ các hàng phụ thuộc không làm đổi tập nghiệm: mỗi hàng bỏ đi là tổ hợp của các hàng giữ lại, và vì hệ có nghiệm, vế phải tương ứng là cùng tổ hợp đó (lập luận ở phần chuẩn bị của chứng minh Định lý 03.15). Sau bước này, giả thiết hạng của Định nghĩa 07.7 thỏa. Ví dụ, hệ $x_1+x_2=2$, $2x_1+2x_2=4$ thu về một phương trình $x_1+x_2=2$.
:::

::: example Ví dụ 07.7 (Dạng chuẩn của bài hộp hạt)
**Dữ kiện.** Bài hộp hạt: cực đại $2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$.

**Thêm biến phụ.** Hai biến đã không âm nên không cần tách. Mỗi giới hạn nhận một biến phụ $s_i\ge0$:

$$
\begin{aligned}
x_1+s_1&=30,\\
x_2+s_2&=20,\\
x_1+2x_2+s_3&=54,
\end{aligned}
$$

cùng điều kiện $x_1,x_2,s_1,s_2,s_3\ge0$. Với thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$, ma trận và vế phải là

$$
\bar A=\begin{bmatrix}1&0&1&0&0\\0&1&0&1&0\\1&2&0&0&1\end{bmatrix}=\begin{bmatrix}A&I\end{bmatrix},\qquad b=\begin{bmatrix}30\\20\\54\end{bmatrix},
$$

với $A$ là ma trận $3\times2$ của Ví dụ 07.3. Dạng chuẩn có $m=3$, $n=5$ và $\operatorname{rank}(\bar A)=3$ nhờ ba cột đơn vị.

**Đọc biến phụ.** $s_1=30-x_1$ và $s_2=20-x_2$ là phần sản lượng tối đa chưa dùng, tính bằng nghìn hộp; $s_3=54-x_1-2x_2$ là số giờ máy còn trống.

- Tại đỉnh $(30,12)$: $(s_1,s_2,s_3)=(0,8,0)$. Hai biến phụ bằng $0$ ứng với hai ràng buộc chặt $x_1=30$ và $x_1+2x_2=54$, cắt nhau tại đỉnh; giới hạn loại 2 còn dư $8$ nghìn hộp.
- Tại đỉnh $(0,0)$: hai biến bằng $0$ là $x_1$, $x_2$, và $(s_1,s_2,s_3)=(30,20,54)$.

**Cạnh và biến bằng không.** Mỗi cạnh của ngũ giác nằm trên một đường mà một trong năm biến bằng $0$: $s_1=0$ trên $x_1=30$, $s_2=0$ trên $x_2=20$, $s_3=0$ trên đường giờ máy, $x_1=0$ và $x_2=0$ trên hai trục.

**Kiểm tra lại.** Tại $(30,12)$: $s_3=54-30-24=0$ và $s_2=20-12=8$. Ma trận $\bar A$ nhân $(30,12,0,8,0)$ cho $(30,20,54)=b$.
:::

Trong ví dụ, mỗi đỉnh ứng với việc cho $5-3=2$ biến bằng $0$; ba biến còn lại xác định từ ba phương trình khi ma trận $3\times3$ tương ứng khả nghịch. Mục 2.3 phát biểu quy trình này cho mọi hệ dạng chuẩn.

**Trong học máy.** Bộ giải quy hoạch tuyến tính tự thêm biến phụ, và giá trị biến phụ ở nghiệm cho biết tài nguyên nào còn dư; trong Tình huống 07.2, biến phụ bằng $0$ chỉ ra ngân sách đã dùng hết. Mệnh đề 07.8(d) bảo đảm nghiệm đọc ngược về bài gốc bằng $\psi$ là nghiệm đúng.

### 2.3 Nghiệm cơ sở khả thi

Trực giác, chưa phải định nghĩa: với hệ dạng chuẩn gồm $m$ phương trình và $n$ biến, cho $n-m$ biến bằng $0$ rồi giải $m$ biến còn lại từ một hệ vuông. Hai điều có thể hỏng: hệ vuông có thể suy biến, và nghiệm có thể có thành phần âm. Định nghĩa sau nêu đủ hai điều kiện để quy trình cho đúng một điểm khả thi.

::: definition Định nghĩa 07.10 (Cơ sở, nghiệm cơ sở, nghiệm cơ sở khả thi)
Cho $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$ với $A\in\mathbb R^{m\times n}$, $\operatorname{rank}(A)=m$.

**Cơ sở.** Một tập chỉ số $B\subseteq\{1,\ldots,n\}$ với $\lvert B\rvert=m$ là một cơ sở nếu ma trận $A_B\in\mathbb R^{m\times m}$ gồm các cột $A_j$, $j\in B$, khả nghịch. Đặt $B^{\mathrm c}=\{1,\ldots,n\}\setminus B$. Biến $x_j$ với $j\in B$ là biến cơ sở (basic variable), với $j\in B^{\mathrm c}$ là biến ngoài cơ sở (nonbasic variable).

**Nghiệm cơ sở.** Véc-tơ $x\in\mathbb R^n$ với

$$
x_B=A_B^{-1}b,\qquad x_{B^{\mathrm c}}=0
\tag{2.3}
$$

là nghiệm cơ sở ứng với $B$.

**Nghiệm cơ sở khả thi.** Nếu thêm $x_B\ge0$, nghiệm cơ sở là nghiệm cơ sở khả thi (basic feasible solution, BFS).

**Suy biến.** Nghiệm cơ sở khả thi là suy biến (degenerate) nếu có ít nhất một thành phần của $x_B$ bằng $0$.
:::

Công thức (2.3) đọc như sau. Đặt các biến ngoài cơ sở bằng $0$, hệ $Ax=b$ thu về $A_Bx_B=b$; vì $A_B$ vuông và khả nghịch, hệ có nghiệm duy nhất $x_B=A_B^{-1}b$. Nghiệm cơ sở luôn thỏa $Ax=b$; chỉ còn điều kiện $x\ge0$ phải kiểm.

Ba nhầm lẫn thường gặp.

- Giả thiết hạng bảo đảm có ít nhất một cơ sở, nhưng không bảo đảm mọi tập $m$ cột đều khả nghịch.
- Khả nghịch chưa bảo đảm khả thi: vẫn phải kiểm $A_B^{-1}b\ge0$.
- Suy biến không có nghĩa bài toán vô nghiệm hay điểm không xác định; nó có nghĩa điểm có ít hơn $m$ thành phần dương, và một điểm như vậy có thể ứng với nhiều cơ sở.

Số tập $B$ có $m$ phần tử là $\binom nm$, và mỗi tập cho nhiều nhất một nghiệm cơ sở, nên một hệ dạng chuẩn chỉ có hữu hạn nghiệm cơ sở. Với bài hộp hạt, ma trận của định nghĩa là $\bar A\in\mathbb R^{3\times5}$, không phải ma trận $3\times2$ của mô hình gốc, và có $\binom53=10$ cách chọn $B$.

::: example Ví dụ 07.8 (Hai cơ sở của bài hộp hạt)
**Dữ kiện.** Hệ dạng chuẩn của bài hộp hạt với thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$: $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm.

**Cơ sở $B=\{1,2,4\}$, tức các cột của $x_1$, $x_2$, $s_2$.**

$$
A_B=\begin{bmatrix}1&0&0\\0&1&1\\1&2&0\end{bmatrix}.
$$

Khai triển theo hàng thứ nhất, $\det(A_B)=1\cdot(1\cdot0-1\cdot2)=-2\ne0$. Đặt $s_1=s_3=0$.

- Phương trình thứ nhất cho $x_1=30$.
- Phương trình thứ ba cho $30+2x_2=54$, tức $x_2=12$.
- Phương trình thứ hai cho $s_2=20-12=8$.

Ba biến cơ sở đều dương: đây là nghiệm cơ sở khả thi không suy biến $(30,12,0,8,0)$, ứng với đỉnh $(30,12)$.

**Cơ sở $B=\{1,2,5\}$, tức các cột của $x_1$, $x_2$, $s_3$.** Ma trận $A_B$ tam giác dưới với đường chéo $1,1,1$, nên $\det(A_B)=1$. Đặt $s_1=s_2=0$: $x_1=30$, $x_2=20$, $s_3=54-70=-16$, một giá trị âm. Đây là nghiệm cơ sở nhưng không khả thi: điểm $(30,20)$ là giao của hai đường $x_1=30$, $x_2=20$ và nằm ngoài miền vì vượt $16$ giờ máy.

**Kiểm tra lại.** $\bar A(30,12,0,8,0)^T=(30,20,54)^T$ và $\bar A(30,20,0,0,-16)^T=(30,20,54)^T$: cả hai thỏa $\bar Ax=b$, chỉ điểm thứ hai vi phạm $x\ge0$.
:::

Định thức khác $0$ bảo đảm nghiệm cơ sở tồn tại, còn dấu của $x_B$ quyết định tính khả thi: mỗi nghiệm cơ sở của hệ hộp hạt là giao của hai đường biên, và chỉ giao điểm nằm trong ngũ giác mới là đỉnh.

::: example Ví dụ 07.9 (Một nghiệm cơ sở khả thi suy biến)
**Dữ kiện.** Hệ $x_1+x_3=1$, $x_2+x_4=0$, $x\in\mathbb R^4$, $x\ge0$; ma trận có hai hàng độc lập, nên $m=2$, $n=4$.

**Cơ sở $B=\{1,2\}$.** $A_B=I$, nên $x_1=1$, $x_2=0$; nghiệm cơ sở là $(1,0,0,0)$. Biến cơ sở $x_2$ bằng $0$, nên nghiệm cơ sở khả thi này suy biến.

**Cơ sở $B=\{1,4\}$.** $A_B$ có hai cột $(1,0)^T$, $(0,1)^T$, khả nghịch. Đặt $x_2=x_3=0$: $x_1=1$, $x_4=0$, cho cùng điểm $(1,0,0,0)$.

**Kiểm tra lại.** Phương trình thứ hai cùng với $x_2,x_4\ge0$ buộc $x_2=x_4=0$ tại mọi điểm khả thi; miền khả thi là đoạn $\{(x_1,0,1-x_1,0)\mid0\le x_1\le1\}$, có hai đầu mút $(1,0,0,0)$ và $(0,0,1,0)$.
:::

Trong ví dụ, một điểm ứng với hai cơ sở, đặc trưng của suy biến: khi một biến cơ sở bằng $0$, thường đổi được nó với một biến ngoài cơ sở mà điểm không đổi. Mục 4.4 cho thấy hệ quả của điều này đối với phép kiểm tối ưu.

::: exercise Bài tập 07.3 (Đưa về dạng chuẩn khi có ràng buộc $\ge$ và biến tự do)
Xét bài cực đại $3x_1+x_2$ dưới các ràng buộc $x_1-x_2\ge2$, $x_1+x_2\le6$, $x_1\ge0$, còn $x_2$ là biến tự do.

- (a) Viết bài toán ở dạng chuẩn (2.2), nêu ma trận, vế phải và số biến.
- (b) Kiểm tính khả thi của phương án $(x_1,x_2)=(4,-1)$ và viết một điểm của dạng chuẩn ứng với nó.
- (c) Chỉ ra hai điểm khác nhau của dạng chuẩn cùng ứng với $(4,-1)$.
:::

::: hint
Ràng buộc $\ge$ nhận một biến dư $e_1\ge0$ với dấu trừ; biến tự do $x_2$ thay bằng $x_2^+-x_2^-$.
:::

::: solution
**Câu (a).** Biến của dạng chuẩn là $(x_1,x_2^+,x_2^-,e_1,s_2)\in\mathbb R^5$, mọi biến không âm. Hai phương trình là $x_1-x_2^++x_2^--e_1=2$ và $x_1+x_2^+-x_2^-+s_2=6$; mục tiêu là cực đại $3x_1+x_2^+-x_2^-$. Ma trận và vế phải

$$
A=\begin{bmatrix}1&-1&1&-1&0\\1&1&-1&0&1\end{bmatrix},\qquad b=\begin{bmatrix}2\\6\end{bmatrix},
$$

có hai hàng độc lập (hai cột cuối là $(-1,0)^T$ và $(0,1)^T$), nên $\operatorname{rank}(A)=2=m$ và $n=5$.

**Câu (b).** $4-(-1)=5\ge2$ và $4+(-1)=3\le6$, nên khả thi. Với $x_2^+=0$, $x_2^-=1$: $e_1=5-2=3$ và $s_2=6-3=3$, cho điểm $(4,0,1,3,3)$.

**Câu (c).** Điểm $(4,0,1,3,3)$ và điểm $(4,2,3,3,3)$ đều thỏa hai phương trình và cùng cho $x_2=x_2^+-x_2^-=-1$.

**Kiểm tra lại.** Tại $(4,2,3,3,3)$: $4-2+3-3=2$ và $4+2-3+3=6$; mục tiêu $12+2-3=11=3\cdot4+(-1)$.
:::

::: exercise Bài tập 07.4 (Mười cách chọn cơ sở của bài hộp hạt)
Hệ dạng chuẩn của bài hộp hạt, thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$: $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm.

- (a) Liệt kê mười tập $B$ có ba phần tử. Với mỗi tập, xác định $A_B$ có khả nghịch không; nếu có, tính nghiệm cơ sở.
- (b) Xác định các nghiệm cơ sở khả thi và điểm $(x_1,x_2)$ tương ứng. Đối chiếu với năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$.
- (c) Giải thích bằng hình vì sao hai tập không khả nghịch.
- (d) Trong các nghiệm cơ sở khả thi, nghiệm nào suy biến.
:::

::: hint
Một tập $B$ cho nghiệm cơ sở bằng cách đặt hai biến ngoài $B$ bằng $0$; hai biến đó ứng với hai đường biên, và nghiệm là giao điểm của hai đường.
:::

::: solution
**Câu (a) và (b).** Bảng ghi tập $B$ theo tên biến, hai biến ngoài cơ sở đặt bằng $0$, và nghiệm $(x_1,x_2,s_1,s_2,s_3)$.

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

**Câu (c).** Tập $\{x_1,s_1,s_3\}$ đặt $x_2=s_2=0$, tức hai đường song song $x_2=0$ và $x_2=20$; tập $\{x_2,s_2,s_3\}$ đặt $x_1=s_1=0$, tức hai đường song song $x_1=0$ và $x_1=30$. Về đại số, ở tập thứ nhất cả ba cột có hàng thứ hai bằng $0$.

**Câu (d).** Không nghiệm nào suy biến: ở cả năm nghiệm cơ sở khả thi, ba biến cơ sở đều dương, chẳng hạn $(14,20,16)$ tại đỉnh $(14,20)$ và $(30,20,54)$ tại $(0,0)$. Về hình học, mỗi đỉnh của ngũ giác có đúng hai ràng buộc chặt.

**Kiểm tra lại.** Tại $(14,20,16,0,0)$: $14+16=30$, $20+0=20$, $14+40+0=54$. Tại $(0,27,30,-7,0)$: $27-7=20$ và $54+0=54$.
:::

**Chuỗi suy luận của mục.** Ví dụ 07.5 chứng minh $z^*=96$ bằng một tổ hợp không âm của các ràng buộc. Định nghĩa 07.5, Mệnh đề 07.6 mô tả miền khả thi như một đa diện lồi; Định nghĩa 07.7, Mệnh đề 07.8 đưa mọi quy hoạch tuyến tính về dạng chuẩn; Định nghĩa 07.10 tính một điểm bằng một hệ vuông.

**Kết mục.** Mục đã cho một quy trình đại số hữu hạn sinh ứng viên (Định nghĩa 07.10); trên bài hộp hạt, năm nghiệm cơ sở khả thi trùng năm đỉnh. Quan hệ đó mới được kiểm trên một hình hai chiều, và chưa có kết quả nào nói nghiệm tối ưu nằm ở một nghiệm cơ sở khả thi. Mục 3 định nghĩa đỉnh không dựa vào hình, chứng minh đỉnh và nghiệm cơ sở khả thi là một, và nêu điều kiện để đa diện có đỉnh.

## 3. Điểm cực và nghiệm cơ sở khả thi

Mục 2 thấy năm nghiệm cơ sở khả thi của bài hộp hạt trùng năm đỉnh của ngũ giác, nhưng mới kiểm bằng mắt trên một hình phẳng; điểm $(30,12,0,8,0)$ của dạng chuẩn nằm trong $\mathbb R^5$. Mục này trả lời ba câu hỏi: định nghĩa đỉnh thế nào cho mọi chiều, vì sao nghiệm cơ sở khả thi và đỉnh là một, và đa diện nào có đỉnh. Câu hỏi cuối cần thiết vì nửa mặt phẳng $\{x\in\mathbb R^2\mid x_2\ge0\}$ không có đỉnh nào.

### 3.1 Điểm cực

Trực giác, chưa phải định nghĩa: đỉnh của một miền lồi là điểm không nằm giữa hai điểm khác nhau của miền. Một điểm trên cạnh, không phải đầu mút, nằm giữa hai điểm khác của cạnh đó; một điểm bên trong nằm giữa hai điểm của một đoạn ngắn đi qua nó.

![Ngũ giác khả thi của bài hộp hạt. Đỉnh có nhãn v = (30,12), ghi "điểm cực". Điểm có nhãn u = (30,6) nằm trên cạnh thẳng đứng x1 = 30, ghi u = ½(30,0) + ½(30,12). Điểm có nhãn w ở bên trong ngũ giác là trung điểm của một đoạn nằm ngang.](img/lec-07/extreme-point-def.svg)

Hình đánh dấu ba điểm trên miền hộp hạt; hai nhãn $u$, $w$ chỉ là tên điểm trên hình, và văn bản gọi các điểm đó bằng tọa độ. Điểm có nhãn $u$, tức $(30,6)$, là trung điểm của hai điểm khác nhau $(30,0)$ và $(30,12)$ của miền. Điểm có nhãn $w$, tức $(10,10)$, là trung điểm của đoạn nằm ngang từ $(6,10)$ đến $(14,10)$. Đỉnh $v=(30,12)$ không là trung điểm của đoạn nào trong miền, và định nghĩa sau làm chính xác tính chất đó.

::: definition Định nghĩa 07.11 (Điểm cực)
Cho tập lồi $C\subseteq\mathbb R^n$. Điểm $v\in C$ là một điểm cực (extreme point) của $C$ nếu từ

$$
v=\lambda x'+(1-\lambda)x'',\qquad x',x''\in C,\quad0<\lambda<1
\tag{3.1}
$$

suy ra $x'=x''=v$. Trong chương này, "đỉnh" (vertex) là tên gọi khác của điểm cực.
:::

Điều kiện $0<\lambda<1$ đòi $v$ nằm thật sự giữa $x'$ và $x''$. Với $\lambda=0$ hoặc $\lambda=1$, đẳng thức (3.1) thỏa tầm thường khi chọn $x''=v$ hoặc $x'=v$, nên hai giá trị đó bị loại. Để chứng minh $v$ không phải điểm cực, chỉ cần một cặp điểm $x'\ne x''$ của $C$ và một $\lambda\in(0,1)$ thỏa (3.1); chọn $\lambda=\tfrac12$ thường đủ.

Điểm cực là tính chất hình học của tập $C$, không phụ thuộc hàm mục tiêu. Nó khác khái niệm cực đại hay cực tiểu của một hàm ở Định nghĩa 01.13: điểm $(0,0)$ là điểm cực của ngũ giác hộp hạt và lại là điểm có lợi ích nhỏ nhất.

Tập lồi có thể có vô số điểm cực: mọi điểm $v$ trên đường tròn biên của hình tròn đơn vị là điểm cực. Nếu $v=\lambda x'+(1-\lambda)x''$ với $\lVert x'\rVert,\lVert x''\rVert\le1$ và $0<\lambda<1$ thì

$$
\begin{aligned}
1=\lVert v\rVert&\le\lambda\lVert x'\rVert+(1-\lambda)\lVert x''\rVert\\
&\le1 ,
\end{aligned}
$$

nên cả hai bất đẳng thức là đẳng thức. Bất đẳng thức thứ hai buộc $\lVert x'\rVert=\lVert x''\rVert=1$; bất đẳng thức thứ nhất là bất đẳng thức tam giác, và với chuẩn Euclid nó chỉ xảy ra dấu bằng khi $x'$, $x''$ cùng hướng. Hai véc-tơ cùng hướng, cùng chuẩn $1$ thì bằng nhau, nên $x'=x''=v$; tính chất này gọi là chuẩn Euclid lồi chặt.

::: example Ví dụ 07.10 (Kiểm điểm cực trên ngũ giác hộp hạt)
**Dữ kiện.** Miền hộp hạt $P$: $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$. Ba điểm $v=(30,12)$, $(30,6)$, $(10,10)$.

**Điểm $(30,6)$.** $(30,6)=\tfrac12(30,0)+\tfrac12(30,12)$, với $(30,0)$ và $(30,12)$ khác nhau và thuộc $P$. Điểm này không phải điểm cực.

**Điểm $(10,10)$.** $(10,10)=\tfrac12(6,10)+\tfrac12(14,10)$. Hai điểm thuộc $P$: tại $(14,10)$, $14+20=34\le54$; tại $(6,10)$, $6+20=26\le54$. Điểm này không phải điểm cực.

**Điểm $v=(30,12)$.** Giả sử $v=\lambda x'+(1-\lambda)x''$ với $x',x''\in P$, $0<\lambda<1$.

- Tọa độ thứ nhất: $x_1'\le30$, $x_1''\le30$ và $\lambda x_1'+(1-\lambda)x_1''=30$. Nếu một trong hai số nhỏ hơn $30$, tổ hợp với hệ số dương nhỏ hơn $30$; vậy $x_1'=x_1''=30$.
- Ràng buộc giờ máy: $x_1'+2x_2'\le54$, $x_1''+2x_2''\le54$ và tổ hợp bằng $30+24=54$. Cùng lập luận cho $x_1'+2x_2'=x_1''+2x_2''=54$, nên $x_2'=x_2''=12$.

Vậy $x'=x''=v$, và $v$ là điểm cực.

**Kiểm tra lại.** Lập luận cho $v$ dùng đúng hai ràng buộc chặt tại $v$, có hàng $(1,0)$ và $(1,2)$ độc lập tuyến tính. Tại $(30,6)$ chỉ có một ràng buộc chặt, $x_1=30$.
:::

### 3.2 Tiêu chuẩn hạng của các ràng buộc chặt

Định nghĩa 07.11 không cho cách kiểm trực tiếp: nó đòi xét mọi cặp điểm của tập. Lập luận cho $v=(30,12)$ trong Ví dụ 07.10 gợi ý một cách kiểm: ràng buộc thỏa với dấu bằng tại $v$ cũng phải thỏa với dấu bằng tại hai điểm hai bên, và hai ràng buộc độc lập như vậy đủ để xác định một điểm duy nhất trong mặt phẳng.

::: definition Định nghĩa 07.12 (Ràng buộc chặt)
Cho đa diện $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với hàng $a_i^T$, $i=1,\ldots,m$, và $x\in P$. Ràng buộc thứ $i$ chặt (active) tại $x$ nếu $a_i^Tx=b_i$. Tập chỉ số các ràng buộc chặt là

$$
\mathcal I(x)=\{i\mid a_i^Tx=b_i\}.
$$
:::

Ràng buộc không chặt có khoảng dư $b_i-a_i^Tx>0$; một bước đủ ngắn theo hướng bất kỳ giữ nó thỏa. Ràng buộc chặt thì không: đi theo hướng $d$ với $a_i^Td>0$ vi phạm nó ngay. Với dạng (1.1) của bài hộp hạt viết thành năm hàng, tập chỉ số chặt tại $(30,12)$ là hai hàng $x_1\le30$ và $x_1+2x_2\le54$.

Kết quả sau là tiêu chuẩn đại số cho điểm cực của một đa diện. Nó cần Định nghĩa 07.11, Định nghĩa 07.12 và một sự kiện của đại số tuyến tính: một hệ $n$ phương trình độc lập tuyến tính trong $\mathbb R^n$ có nhiều nhất một nghiệm.

::: theorem Định lý 07.13 (Tiêu chuẩn hạng cho điểm cực)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với hàng $a_1^T,\ldots,a_m^T$; $x\in P$.

**Kết luận.** $x$ là điểm cực của $P$ khi và chỉ khi họ $\{a_i\mid i\in\mathcal I(x)\}$ có hạng $n$, tức trong các ràng buộc chặt tại $x$ có $n$ ràng buộc với hàng độc lập tuyến tính.

**Điều kiện áp dụng.** $P$ cho bởi hữu hạn bất phương trình; phương trình được viết thành hai bất phương trình.

**Phạm vi.** Định lý nói về điểm của $P$. Một điểm ngoài $P$ có thể thỏa $n$ phương trình độc lập, như $(30,20)$ của bài hộp hạt, mà không phải điểm cực.
:::

::: proof Chứng minh Định lý 07.13
**Bước 1 (hạng $n$ kéo theo điểm cực).** Giả sử họ $\{a_i\mid i\in\mathcal I(x)\}$ có hạng $n$ và $x=\lambda x'+(1-\lambda)x''$ với $x',x''\in P$, $0<\lambda<1$. Với mỗi $i\in\mathcal I(x)$, hai bất đẳng thức $a_i^Tx'\le b_i$, $a_i^Tx''\le b_i$ và

$$
\lambda a_i^Tx'+(1-\lambda)a_i^Tx''=a_i^Tx=b_i .
$$

Nếu một trong hai số $a_i^Tx'$, $a_i^Tx''$ nhỏ hơn $b_i$, tổ hợp với hai hệ số dương nhỏ hơn $b_i$, mâu thuẫn. Vậy $x'$ và $x''$ cùng là nghiệm của hệ $\{a_i^T\zeta=b_i\mid i\in\mathcal I(x)\}$ với ẩn $\zeta\in\mathbb R^n$. Hệ này có hạng $n$ nên có nhiều nhất một nghiệm, và $x$ là một nghiệm, nên $x'=x''=x$.

**Bước 2 (hạng nhỏ hơn $n$ kéo theo không phải điểm cực).** Giả sử họ có hạng nhỏ hơn $n$. Theo phần đại số tuyến tính của mục "Kiến thức tiên quyết", có $d\ne0$ với $a_i^Td=0$ cho mọi $i\in\mathcal I(x)$. Với $i\notin\mathcal I(x)$, khoảng dư $b_i-a_i^Tx$ dương; chọn $\varepsilon>0$ đủ nhỏ để $\varepsilon\lvert a_i^Td\rvert<b_i-a_i^Tx$ với mọi $i\notin\mathcal I(x)$, điều làm được vì chỉ có hữu hạn chỉ số. Khi đó $x\pm\varepsilon d\in P$:

- với $i\in\mathcal I(x)$: $a_i^T(x\pm\varepsilon d)=b_i$;
- với $i\notin\mathcal I(x)$: $a_i^T(x\pm\varepsilon d)\le a_i^Tx+\varepsilon\lvert a_i^Td\rvert<b_i$.

Vì $x=\tfrac12(x+\varepsilon d)+\tfrac12(x-\varepsilon d)$ với hai điểm khác nhau của $P$, $x$ không phải điểm cực. $\square$
:::

Theo định lý, một điểm của đa diện là đỉnh khi và chỉ khi có $n$ ràng buộc chặt độc lập tại điểm đó, tức điểm là nghiệm duy nhất của các phương trình chặt. Bước 1 dùng hai giả thiết: hệ số tổ hợp dương và điểm thuộc $P$. Bước 2 dùng tính hữu hạn của số ràng buộc để chọn được một $\varepsilon$ chung.

So với Định nghĩa 07.11, định lý thay một điều kiện trên mọi cặp điểm của tập bằng một phép tính hạng trên hữu hạn hàng. Lập luận cho $v=(30,12)$ ở Ví dụ 07.10 là trường hợp $n=2$ của Bước 1.

Một điểm có thể có nhiều hơn $n$ ràng buộc chặt. Chẳng hạn miền $x_1+x_2\le100$, $3x_1+x_2\le180$, $x_2\le60$, $x\ge0$ của Tình huống 07.2 có đỉnh $(40,60)$, nơi cả ba ràng buộc đầu chặt: $40+60=100$, $120+60=180$, $60=60$. Định lý vẫn áp dụng vì chỉ cần hạng bằng $n=2$. Đỉnh như vậy là đỉnh suy biến theo nghĩa hình học, và Mục 3.3 nối nó với khái niệm suy biến của Định nghĩa 07.10.

::: corollary Hệ quả 07.14 (Đa diện có hữu hạn điểm cực)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với $m$ hàng.

**Kết luận.** Mỗi điểm cực của $P$ là nghiệm duy nhất của một hệ $a_i^Tx=b_i$, $i\in S$, với $S\subseteq\{1,\ldots,m\}$, $\lvert S\rvert=n$ và các hàng $a_i$, $i\in S$, độc lập tuyến tính. Do đó $P$ có nhiều nhất $\binom mn$ điểm cực.

**Điều kiện áp dụng.** Như Định lý 07.13.

**Phạm vi.** Cận $\binom mn$ thường lớn hơn nhiều so với số điểm cực thật; nó chỉ khẳng định tính hữu hạn.
:::

::: proof Chứng minh Hệ quả 07.14
**Bước 1 (chọn hệ $n$ phương trình).** Với điểm cực $v$, Định lý 07.13 cho $n$ chỉ số chặt có hàng độc lập; gọi tập đó là $S_v$. Hệ $a_i^Tx=b_i$, $i\in S_v$, có ma trận vuông khả nghịch nên có nghiệm duy nhất, và $v$ là nghiệm đó.

**Bước 2 (đếm).** Hai điểm cực khác nhau không thể có cùng tập $S$, vì $S$ xác định nghiệm duy nhất. Vậy số điểm cực không vượt số tập con $n$ phần tử của $\{1,\ldots,m\}$, tức $\binom mn$. $\square$
:::

Hệ quả là lý do đầu tiên khiến việc tìm kiếm trên các đỉnh có thể kết thúc: tập ứng viên hữu hạn. Hình tròn đơn vị không phải đa diện, nên có vô số điểm cực mà không mâu thuẫn với hệ quả.

**Trong học máy.** Định lý 07.13 cho một phép kiểm sau khi giải: lấy nghiệm do bộ giải trả về, liệt kê các ràng buộc chặt và tính hạng của chúng. Với hồi quy $L_1$ dạng (1.2), mỗi mẫu có phần dư bằng $0$ góp hai ràng buộc chặt, nên một nghiệm đỉnh phải nội suy đủ nhiều mẫu; Mệnh đề 07.25 ở Mục 4 làm chính xác điều này.

::: example Ví dụ 07.11 (Tiêu chuẩn hạng trên ba điểm)
**Dữ kiện.** Miền hộp hạt viết thành năm hàng: (1) $x_1\le30$; (2) $x_2\le20$; (3) $x_1+2x_2\le54$; (4) $-x_1\le0$; (5) $-x_2\le0$; ở đây $n=2$.

**Điểm $(30,12)$.** Hàng chặt: (1), (3), với $a_1=(1,0)$, $a_3=(1,2)$ độc lập. Hạng $2=n$: điểm cực.

**Điểm $(30,6)$.** Chỉ hàng (1) chặt; hạng $1<2$: không phải điểm cực, khớp Ví dụ 07.10.

**Điểm $(30,20)$.** Hàng (1), (2) độc lập và thỏa với dấu bằng, nhưng $30+40=70>54$: điểm không thuộc $P$, nên định lý không áp dụng.

**Liệt kê.** Mười cặp hàng cho tám giao điểm và hai cặp song song; năm giao điểm khả thi là năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$.

**Kiểm tra lại.** Ba giao điểm loại bỏ vi phạm một hàng: $(30,20)$ vi phạm (3), $(0,27)$ vi phạm (2), $(54,0)$ vi phạm (1). Bảng mười cơ sở của Bài tập 07.4 cho cùng danh sách.
:::

### 3.3 Nghiệm cơ sở khả thi là điểm cực

Ví dụ 07.11 cho thấy trên bài hộp hạt, việc chọn $n$ ràng buộc chặt và việc chọn một cơ sở là cùng một phép chọn. Với dạng chuẩn, ràng buộc chặt có hai loại: các phương trình $Ax=b$ luôn chặt, và ràng buộc $x_j\ge0$ chặt khi $x_j=0$. Định lý sau phát biểu sự trùng khớp cho mọi đa diện dạng chuẩn, theo cách trình bày của Bertsimas và Tsitsiklis (1997, §2.2–2.3), và thêm một tiêu chuẩn thứ ba chỉ dùng các cột ứng với thành phần dương.

::: theorem Định lý 07.15 (Điểm cực, nghiệm cơ sở khả thi và các cột dương)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$ với $A\in\mathbb R^{m\times n}$, $\operatorname{rank}(A)=m$; $x\in P$. Đặt $\operatorname{supp}(x)=\{j\mid x_j>0\}$.

**Kết luận.** Ba khẳng định sau tương đương:

- (i) $x$ là điểm cực của $P$;
- (ii) $x$ là nghiệm cơ sở khả thi theo Định nghĩa 07.10;
- (iii) các cột $A_j$, $j\in \operatorname{supp}(x)$, độc lập tuyến tính.

**Điều kiện áp dụng.** Dạng chuẩn với giả thiết hạng; giả thiết hạng dùng ở chiều từ (iii) sang (ii).

**Phạm vi.** Định lý không nói mỗi điểm cực ứng với đúng một cơ sở; khi suy biến, một điểm cực có thể ứng với nhiều cơ sở (Ví dụ 07.9).
:::

::: proof Chứng minh Định lý 07.15
**Bước 1 (khẳng định (iii) kéo theo (i)).** Giả sử các cột trên $\operatorname{supp}(x)$ độc lập và $x=\lambda x'+(1-\lambda)x''$ với $x',x''\in P$, $0<\lambda<1$. Với $j\notin \operatorname{supp}(x)$, $x_j=0$ trong khi $x_j',x_j''\ge0$ và tổ hợp với hệ số dương bằng $0$, nên $x_j'=x_j''=0$. Véc-tơ $x'-x''$ do đó chỉ có thể khác $0$ trên $\operatorname{supp}(x)$, và

$$
\sum_{j\in \operatorname{supp}(x)}(x_j'-x_j'')A_j=A(x'-x'')=b-b=0 .
$$

Tính độc lập của các cột trên $\operatorname{supp}(x)$ buộc $x_j'=x_j''$ với mọi $j\in \operatorname{supp}(x)$, nên $x'=x''$, và do đó cả hai bằng $x$.

**Bước 2 (khẳng định (i) kéo theo (iii)).** Giả sử các cột trên $\operatorname{supp}(x)$ phụ thuộc tuyến tính: có các số $d_j$, $j\in \operatorname{supp}(x)$, không đồng thời bằng $0$, với $\sum_{j\in \operatorname{supp}(x)}d_jA_j=0$. Đặt $d_j=0$ cho $j\notin \operatorname{supp}(x)$, được $d\in\mathbb R^n$, $d\ne0$, $Ad=0$. Chọn $\varepsilon>0$ với $\varepsilon\lvert d_j\rvert<x_j$ cho mọi $j\in \operatorname{supp}(x)$. Khi đó $x\pm\varepsilon d$ thỏa $A(x\pm\varepsilon d)=b$ và không âm, vì thành phần dương vẫn dương và thành phần bằng $0$ không đổi. Điểm $x$ là trung điểm của hai điểm khác nhau của $P$, nên không phải điểm cực.

**Bước 3 (khẳng định (ii) kéo theo (iii)).** Nếu $x$ là nghiệm cơ sở khả thi theo cơ sở $B$, thì $x_j=0$ ngoài $B$, nên $\operatorname{supp}(x)\subseteq B$. Các cột của $A_B$ độc lập vì $A_B$ khả nghịch, và một họ con của họ độc lập cũng độc lập.

**Bước 4 (khẳng định (iii) kéo theo (ii)).** Giả sử các cột trên $\operatorname{supp}(x)$ độc lập. Vì $\operatorname{rank}(A)=m$, các cột của $A$ sinh $\mathbb R^m$, nên bổ sung được các cột khác vào họ đó cho tới khi được $m$ cột độc lập; gọi tập chỉ số thu được là $B\supseteq \operatorname{supp}(x)$. Khi đó $A_B$ khả nghịch, $x_j=0$ với $j\in B^{\mathrm c}$ vì $B^{\mathrm c}\cap \operatorname{supp}(x)=\varnothing$, và $Ax=b$ thu về $A_Bx_B=b$, tức $x_B=A_B^{-1}b$. Vì $x\ge0$, đây là nghiệm cơ sở khả thi. $\square$
:::

Định lý nối khái niệm hình học (điểm cực) với khái niệm tính toán (nghiệm cơ sở khả thi) qua một phép kiểm trung gian chỉ cần hạng của vài cột. Giả thiết hạng $\operatorname{rank}(A)=m$ chỉ dùng ở Bước 4, để bổ sung đủ $m$ cột; bỏ giả thiết đó thì có thể không tồn tại cơ sở nào, dù điểm cực vẫn có.

So với Định lý 07.13, định lý này là trường hợp riêng cho đa diện dạng chuẩn, viết theo ngôn ngữ cột thay cho hàng. Hai cách nói tương đương: tại $x$, các ràng buộc chặt gồm $m$ phương trình và $n-\lvert \operatorname{supp}(x)\rvert$ ràng buộc $x_j=0$, và họ đó có hạng $n$ đúng khi các cột trên $\operatorname{supp}(x)$ độc lập.

::: corollary Hệ quả 07.16 (Số thành phần dương và số điểm cực của dạng chuẩn)
**Giả thiết.** Như Định lý 07.15.

**Kết luận.** Mỗi điểm cực của $P$ có nhiều nhất $m$ thành phần dương, và $P$ có nhiều nhất $\binom nm$ điểm cực.

**Điều kiện áp dụng.** Như Định lý 07.15.

**Phạm vi.** Một điểm có không quá $m$ thành phần dương chưa chắc là điểm cực; cần các cột tương ứng độc lập.
:::

::: proof Chứng minh Hệ quả 07.16
**Bước 1 (thành phần dương).** Theo khẳng định (iii) của Định lý 07.15, các cột trên $\operatorname{supp}(x)$ là các véc-tơ độc lập trong $\mathbb R^m$, nên có nhiều nhất $m$ cột.

**Bước 2 (số điểm cực).** Theo khẳng định (ii), mỗi điểm cực là nghiệm cơ sở khả thi của ít nhất một cơ sở, và mỗi cơ sở cho nhiều nhất một nghiệm cơ sở. Số cơ sở không vượt $\binom nm$. $\square$
:::

::: example Ví dụ 07.12 (Kiểm điểm cực bằng cột dương)
**Dữ kiện.** Hệ dạng chuẩn của bài hộp hạt, cột theo thứ tự $(x_1,x_2,s_1,s_2,s_3)$: $A_1=(1,0,1)^T$, $A_2=(0,1,2)^T$, $A_3=(1,0,0)^T$, $A_4=(0,1,0)^T$, $A_5=(0,0,1)^T$, $b=(30,20,54)^T$.

**Điểm $(30,12,0,8,0)$.** $\operatorname{supp}(x)=\{1,2,4\}$. Ma trận gồm ba cột $A_1,A_2,A_4$ có định thức $-2\ne0$, nên ba cột độc lập và điểm là điểm cực, ứng với đỉnh $(30,12)$ của ngũ giác.

**Điểm $(15,6,15,14,27)$.** Điểm này khả thi: $15+15=30$, $6+14=20$, $15+12+27=54$. Có năm thành phần dương, nhiều hơn $m=3$, nên theo Hệ quả 07.16 nó không phải điểm cực; về hình học, $(15,6)$ nằm bên trong ngũ giác.

**Kiểm tra lại.** Với $d=(1,0,-1,0,-1)$, $\bar Ad=(1-1,0,1-1)^T=0$, và $(15,6,15,14,27)$ là trung điểm của hai điểm khả thi $(16,6,14,14,26)$ và $(14,6,16,14,28)$.
:::

::: remark Nhận xét 07.17 (Điểm cực là duy nhất, cơ sở thì không)
Theo Định lý 07.15, mỗi cơ sở khả thi cho một điểm cực và mỗi điểm cực có ít nhất một cơ sở; tương ứng là một-một khi không có suy biến, như bài hộp hạt. Khi suy biến, một điểm cực có thể ứng với nhiều cơ sở, như $(1,0,0,0)$ với $\{1,2\}$ và $\{1,4\}$ trong hệ $x_1+x_3=1$, $x_2+x_4=0$ của Ví dụ 07.9; một thuật toán đổi cơ sở khi đó có thể đổi cơ sở mà không di chuyển (Mục 4.4).
:::

**Trong học máy.** Hệ quả 07.16 giải thích tính thưa của nghiệm quy hoạch tuyến tính: một nghiệm cơ sở khả thi của bài có $m$ phương trình có nhiều nhất $m$ thành phần khác $0$, bất kể số biến. Chọn trọng số trộn $p\in\mathbb R^{100}$ cho $100$ nguồn dữ liệu dưới $\sum_jp_j=1$ và một ràng buộc ngân sách gán nhãn, viết thành đẳng thức nhờ một biến phụ, cho $m=2$: một nghiệm đỉnh có nhiều nhất hai thành phần dương, tính cả biến phụ. Tính thưa này thuộc về nghiệm đỉnh, không thuộc về mọi nghiệm tối ưu.

### 3.4 Tồn tại điểm cực

Nửa mặt phẳng $\{x\in\mathbb R^2\mid x_2\ge0\}$ không có điểm cực: điểm $(x_1,x_2)$ của nó là trung điểm của $(x_1-1,x_2)$ và $(x_1+1,x_2)$, cả hai đều thuộc miền. Trên miền như vậy, câu "có một đỉnh tối ưu" không thể đúng. Trực giác, chưa phải định nghĩa: nửa mặt phẳng chứa trọn một đường thẳng nằm ngang, và mọi điểm đều có thể trượt theo đường đó hai phía.

::: definition Định nghĩa 07.18 (Tập chứa đường thẳng)
Tập $C\subseteq\mathbb R^n$ chứa một đường thẳng nếu có $x\in C$ và $d\in\mathbb R^n$, $d\ne0$, với $x+\theta d\in C$ cho mọi $\theta\in\mathbb R$.
:::

Định nghĩa đòi cả hai chiều $\theta>0$ và $\theta<0$. Một tia, tức chỉ $\theta\ge0$, không đủ: góc phần tư $\{x\ge0\}$ chứa tia $\{(\theta,0)\mid\theta\ge0\}$ nhưng không chứa đường thẳng nào, và có điểm cực $(0,0)$.

Chứng minh định lý tồn tại dùng một thao tác lặp lại nhiều lần: từ một điểm chưa phải điểm cực, đi theo một hướng giữ nguyên mọi ràng buộc chặt cho tới khi gặp một ràng buộc chặt mới. Bổ đề sau tách thao tác đó ra để dùng lại ở Mục 4.

::: lemma Bổ đề 07.19 (Bước tăng hạng)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$, $x\in P$. Véc-tơ $d\in\mathbb R^n$ thỏa $a_i^Td=0$ với mọi $i\in\mathcal I(x)$, và có ít nhất một chỉ số $j$ với $a_j^Td>0$.

**Kết luận.** Đặt

$$
\theta^*=\min\left\{\frac{b_j-a_j^Tx}{a_j^Td}\ \middle|\ a_j^Td>0\right\}.
\tag{3.2}
$$

Khi đó $\theta^*>0$, điểm $x'=x+\theta^*d$ thuộc $P$, mọi ràng buộc chặt tại $x$ vẫn chặt tại $x'$, và hạng của họ $\{a_i\mid i\in\mathcal I(x')\}$ lớn hơn hạng của họ $\{a_i\mid i\in\mathcal I(x)\}$ ít nhất $1$.

**Điều kiện áp dụng.** Cần ít nhất một $a_j^Td>0$; nếu mọi $a_j^Td\le0$ thì $x+\theta d\in P$ với mọi $\theta\ge0$ và không có ràng buộc mới nào chặt.

**Phạm vi.** Bổ đề không nói giá trị mục tiêu thay đổi thế nào; Mục 4 chọn $d$ để mục tiêu không giảm.
:::

::: proof Chứng minh Bổ đề 07.19
**Bước 1 ($\theta^*>0$).** Nếu $a_j^Td>0$ thì $j\notin\mathcal I(x)$, vì mọi chỉ số chặt có $a_i^Td=0$. Do đó $b_j-a_j^Tx>0$ cho mọi $j$ trong (3.2), và cực tiểu của hữu hạn số dương là số dương.

**Bước 2 ($x'\in P$).** Với $a_j^Td\le0$: $a_j^Tx'=a_j^Tx+\theta^*a_j^Td$, không vượt $a_j^Tx$, và $a_j^Tx\le b_j$. Với $a_j^Td>0$: theo cách chọn $\theta^*$, $\theta^*a_j^Td\le b_j-a_j^Tx$, nên $a_j^Tx'\le b_j$.

**Bước 3 (ràng buộc cũ vẫn chặt).** Với $i\in\mathcal I(x)$: $a_i^Tx'=a_i^Tx+\theta^*\cdot0=b_i$.

**Bước 4 (hạng tăng).** Gọi $j^*$ là chỉ số đạt cực tiểu trong (3.2); khi đó $a_{j^*}^Tx'=b_{j^*}$, nên $j^*\in\mathcal I(x')$. Véc-tơ $a_{j^*}$ không thuộc không gian sinh bởi $\{a_i\mid i\in\mathcal I(x)\}$: mọi véc-tơ trong không gian đó vuông góc với $d$, còn $a_{j^*}^Td>0$. Thêm một véc-tơ ngoài không gian sinh vào một họ làm hạng tăng $1$. $\square$
:::

Theo bổ đề, hướng $d$ giữ nguyên mọi ràng buộc đang chặt, và $\theta^*$ là độ dài bước tới ràng buộc mới đầu tiên trở thành chặt. Công thức (3.2) là phép thử tỉ số (ratio test); Mục 4.4 dùng lại nó ở dạng chuẩn.

Định lý sau cần Định lý 07.13 và Bổ đề 07.19, và trả lời câu hỏi đa diện nào có điểm cực bằng ba điều kiện tương đương; điều kiện thứ ba kiểm được bằng một phép tính hạng.

::: theorem Định lý 07.20 (Tồn tại điểm cực)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ khác rỗng.

**Kết luận.** Ba khẳng định sau tương đương:

- (i) $P$ có ít nhất một điểm cực;
- (ii) $P$ không chứa đường thẳng;
- (iii) $\operatorname{rank}(A)=n$.

**Điều kiện áp dụng.** $P$ khác rỗng và cho bởi hữu hạn bất phương trình.

**Phạm vi.** Định lý không nói số điểm cực, cũng không nói điểm cực nào tối ưu cho một mục tiêu.
:::

::: proof Chứng minh Định lý 07.20
**Bước 1 (đường thẳng trong $P$ và hạng).** Nếu $x+\theta d\in P$ với mọi $\theta\in\mathbb R$ thì $a_i^Tx+\theta a_i^Td\le b_i$ với mọi $\theta$. Nếu $a_i^Td\ne0$, chọn $\theta$ cùng dấu với $a_i^Td$ và đủ lớn thì bất đẳng thức sai; vậy $Ad=0$. Ngược lại, nếu $Ad=0$ với $d\ne0$ thì $a_i^T(x'+\theta d)=a_i^Tx'\le b_i$ với mọi $x'\in P$, $\theta\in\mathbb R$, nên $P$ chứa đường thẳng qua mọi điểm của nó. Do đó $P$ chứa đường thẳng khi và chỉ khi có $d\ne0$ với $Ad=0$, tức $\operatorname{rank}(A)<n$. Điều này cho (ii) tương đương (iii).

**Bước 2 (khẳng định (i) kéo theo (iii)).** Nếu $v$ là điểm cực, Định lý 07.13 cho $n$ hàng chặt độc lập tại $v$, nên $\operatorname{rank}(A)\ge n$; hạng không vượt số cột $n$.

**Bước 3 (khẳng định (iii) kéo theo (i): một bước).** Giả sử $\operatorname{rank}(A)=n$. Lấy $x\in P$ và gọi $\rho$ là hạng của họ hàng chặt tại $x$. Nếu $\rho=n$, $x$ là điểm cực theo Định lý 07.13. Nếu $\rho<n$, chọn $d\ne0$ vuông góc với mọi hàng chặt; vì $\operatorname{rank}(A)=n$, véc-tơ $Ad$ khác $0$, và đổi $d$ thành $-d$ nếu cần để có một $a_j^Td>0$.

**Bước 4 (lặp).** Bổ đề 07.19 cho điểm $x'\in P$ với hạng hàng chặt ít nhất $\rho+1$. Lặp lại từ $x'$; hạng tăng sau mỗi lần và không vượt $n$, nên sau nhiều nhất $n$ lần thu được một điểm có hạng $n$, tức một điểm cực. $\square$
:::

Định lý cho ba cách kiểm cùng một tính chất: khẳng định (iii) dễ kiểm nhất, (ii) dễ hình dung nhất, (i) là điều các kết quả về tối ưu cần. Bước 3 và Bước 4 của chứng minh là một thủ tục: từ một điểm khả thi bất kỳ, sau nhiều nhất $n$ bước tăng hạng thu được một điểm cực.

Giả thiết khác rỗng cần thiết vì tập rỗng không chứa đường thẳng mà cũng không có điểm cực. Tính hữu hạn của số ràng buộc dùng trong Bổ đề 07.19: nó bảo đảm có một ràng buộc mới đầu tiên khi đi theo $d$.

::: corollary Hệ quả 07.21 (Hai lớp đa diện luôn có điểm cực)
**Giả thiết.** (a) $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$ khác rỗng. (b) $P=\{x\in\mathbb R^n\mid Ax\le b\}$ khác rỗng và bị chặn.

**Kết luận.** Trong cả hai trường hợp, $P$ có ít nhất một điểm cực. Ở trường hợp (a), nếu thêm $\operatorname{rank}(A)=m$, điểm cực đó là một nghiệm cơ sở khả thi.

**Điều kiện áp dụng.** Như Định lý 07.20.

**Phạm vi.** Hệ quả không áp dụng cho đa diện tổng quát không bị chặn có biến tự do.
:::

::: proof Chứng minh Hệ quả 07.21
**Bước 1 (trường hợp (a)).** Theo Mệnh đề 07.6(b), $P$ là đa diện với các hàng gồm $-I$. Ma trận $-I$ có hạng $n$, nên khẳng định (iii) của Định lý 07.20 thỏa. Khi $\operatorname{rank}(A)=m$, Định lý 07.15 cho điểm cực đó là nghiệm cơ sở khả thi.

**Bước 2 (trường hợp (b)).** Nếu $P$ chứa đường $x+\theta d$ với $d\ne0$, thì $\lVert x+\theta d\rVert\ge\lvert\theta\rvert\lVert d\rVert-\lVert x\rVert\to\infty$, mâu thuẫn với tính bị chặn. Vậy khẳng định (ii) thỏa. $\square$
:::

Phần (a) là lý do dạng chuẩn được ưa dùng: mọi quy hoạch tuyến tính khả thi viết ở dạng chuẩn có đỉnh, nên mọi kết quả "có một đỉnh tối ưu" ở Mục 4 áp dụng được sau khi chuyển dạng bằng Mệnh đề 07.8.

::: example Ví dụ 07.13 (Áp dụng tiêu chuẩn tồn tại và chạy bước tăng hạng)
**Dữ kiện.** Hai đa diện trong $\mathbb R^2$: nửa mặt phẳng $H=\{x\mid x_2\ge0\}$, viết thành một hàng $-x_2\le0$; và $P_1=\{x\mid x_1+x_2\ge1,\ x\ge0\}$, viết thành ba hàng (1) $-x_1-x_2\le-1$, (2) $-x_1\le0$, (3) $-x_2\le0$.

**Nửa mặt phẳng.** Ma trận một hàng $(0,-1)$ có hạng $1<2$, nên $H$ không có điểm cực theo Định lý 07.20. Hướng $d=(1,0)$ thỏa $Ad=0$ và cho đường thẳng nằm ngang qua mọi điểm.

**Đa diện $P_1$.** Ba hàng có hạng $2$, nên $P_1$ có điểm cực dù không bị chặn. Chạy Bước 3–4 của chứng minh từ $x=(2,3)$.

- Tại $(2,3)$ không có ràng buộc chặt, hạng $0$. Chọn $d=(-1,0)$: $a_1^Td=1$, $a_2^Td=1$. Theo (3.2), $\theta^*=\min\{\tfrac{-1+5}1,\tfrac{0+2}1\}=2$, cho $x'=(0,3)$, với hàng (2) chặt.
- Tại $(0,3)$, hạng $1$. Chọn $d=(0,-1)$, vuông góc với $a_2=(-1,0)$: $a_1^Td=1$, $a_3^Td=1$. Theo (3.2), $\theta^*=\min\{\tfrac{-1+3}1,\tfrac{0+3}1\}=2$, cho $x''=(0,1)$, với hàng (1), (2) chặt.

Hai hàng $(-1,-1)$ và $(-1,0)$ độc lập, nên $(0,1)$ là điểm cực.

**Kiểm tra lại.** $(0,1)$ thỏa $0+1=1\ge1$ với dấu bằng và $x_1=0$. Điểm cực còn lại của $P_1$ là $(1,0)$, giao của hàng (1) và (3).
:::

**Trong học máy.** Bài (1.2) của hồi quy $L_1$ có biến tự do $x$, nên Hệ quả 07.21 không áp dụng trực tiếp. Theo Định lý 07.20, miền của (1.2) có điểm cực khi và chỉ khi ma trận ràng buộc có hạng $n+M$, và Mệnh đề 07.25 chỉ ra điều này tương đương với việc $h_1,\ldots,h_M$ sinh $\mathbb R^n$. Khi hai đặc trưng tỉ lệ với nhau, điều kiện bị vi phạm, miền chứa đường thẳng và tham số tối ưu không duy nhất.

::: exercise Bài tập 07.5 (Dải phẳng và điểm cực)
Cho $P_2=\{x\in\mathbb R^2\mid -x_1+x_2\le1,\ x_1-x_2\le1\}$.

- (a) Chứng minh $P_2$ chứa một đường thẳng và không có điểm cực, bằng khẳng định (ii) và (iii) của Định lý 07.20.
- (b) Thêm ràng buộc $x_1\ge0$, được $P_3$. Xác định mọi điểm cực của $P_3$ bằng Định lý 07.13.
:::

::: hint
Ở (a), tìm $d\ne0$ với $-d_1+d_2=0$ và $d_1-d_2=0$. Ở (b), xét ba cặp hàng của $P_3$.
:::

::: solution
**Câu (a).** Ma trận có hai hàng $(-1,1)$ và $(1,-1)$, hạng $1<2$. Hướng $d=(1,1)$ thỏa $Ad=0$, nên $(0,0)+\theta(1,1)\in P_2$ với mọi $\theta$. Theo Định lý 07.20, $P_2$ không có điểm cực.

**Câu (b).** $P_3$ có ba hàng: (1) $-x_1+x_2\le1$, (2) $x_1-x_2\le1$, (3) $-x_1\le0$.

- Cặp (1), (2): hai hàng song song, không có giao điểm duy nhất.
- Cặp (1), (3): $x_1=0$, $x_2=1$; kiểm (2): $0-1=-1\le1$. Điểm $(0,1)$ là điểm cực.
- Cặp (2), (3): $x_1=0$, $x_2=-1$; kiểm (1): $0-1=-1\le1$. Điểm $(0,-1)$ là điểm cực.

**Kiểm tra lại.** Tại $(0,1)$: hàng (1) cho $-0+1=1$ và hàng (3) cho $0$, cả hai chặt; hai hàng $(-1,1)$, $(-1,0)$ độc lập. Tại $(0,-1)$: hàng (2) cho $0+1=1$, hàng (3) chặt; hai hàng $(1,-1)$, $(-1,0)$ độc lập.
:::

**Chuỗi suy luận của mục.** Định nghĩa 07.11 định nghĩa đỉnh bằng tổ hợp lồi. Định lý 07.13 đổi định nghĩa đó thành phép kiểm hạng các ràng buộc chặt, và Hệ quả 07.14 cho tính hữu hạn. Định lý 07.15 chứng minh đỉnh của dạng chuẩn chính là nghiệm cơ sở khả thi; Bổ đề 07.19 và Định lý 07.20 cho điều kiện có đỉnh, với Hệ quả 07.21 là kết quả dùng nhiều nhất về sau.

**Kết mục.** Mục đã cho một tập ứng viên hữu hạn, tính được bằng đại số: các điểm cực, tức các nghiệm cơ sở khả thi (Định lý 07.15, Hệ quả 07.16), và mọi dạng chuẩn khả thi có điểm cực (Hệ quả 07.21). Chưa có kết quả nào nói nghiệm tối ưu nằm trong tập này. Mục 4 chứng minh điều đó khi giá trị tối ưu hữu hạn và miền có điểm cực, rồi chỉ cách tìm điểm cực tối ưu mà không liệt kê hết.

## 4. Kết cục, điểm cực tối ưu và thuật toán đi qua đỉnh kề

Mục 3 cho tập ứng viên hữu hạn là các điểm cực, nhưng chưa nối nó với tính tối ưu. Hai bài toán nhỏ cho thấy nối như vậy cần giả thiết: bài cực đại $x_1+x_2$ dưới $x_1+x_2\le2$, $x\ge0$ có nghiệm tối ưu $(1,1)$ không phải điểm cực; bài cực đại $x_1$ trên $P_1=\{x\mid x_1+x_2\ge1,\ x\ge0\}$ có điểm cực nhưng không có nghiệm tối ưu, vì $x_1$ tăng mãi. Mục này nêu đúng giả thiết dưới đó có một điểm cực tối ưu, phân loại mọi quy hoạch tuyến tính thành bốn kết cục, rồi chỉ cách đi tới một điểm cực tối ưu mà không liệt kê hết các điểm cực.

### 4.1 Tập nghiệm tối ưu

Bài toán thứ nhất ở trên cho thấy câu "nghiệm tối ưu là đỉnh" sai. Ví dụ sau tính đầy đủ.

![Tam giác khả thi với ba đỉnh (0,0), (2,0), (0,2) trong mặt phẳng x1, x2. Đường mức nét đứt z = 1 nằm bên trong tam giác. Đường mức z = 2 trùng cạnh nối (2,0) và (0,2). Điểm (1,1) được đánh dấu ở giữa cạnh đó. Mũi tên "tăng z" chỉ theo hướng (1,1).](img/lec-07/multiple-optima.svg)

::: example Ví dụ 07.14 (Cả một cạnh tối ưu)
**Dữ kiện.** Cực đại $z=x_1+x_2$ dưới $x_1+x_2\le2$, $x_1,x_2\ge0$.

**Điểm cực.** Miền là tam giác với ba điểm cực $(0,0)$, $(2,0)$, $(0,2)$; giá trị tại đó là $0$, $2$, $2$.

**Giá trị tối ưu.** Chính ràng buộc $x_1+x_2\le2$ cho $z\le2$ trên toàn miền, và $(2,0)$ đạt $2$. Vậy $z^*=2$, và tập nghiệm tối ưu là đoạn $\{x\mid x_1+x_2=2,\ x\ge0\}$.

**Một nghiệm không phải điểm cực.** $(1,1)$ thuộc đoạn này nên tối ưu, nhưng $(1,1)=\tfrac12(2,0)+\tfrac12(0,2)$ nên không phải điểm cực.

**Kiểm tra lại.** Tại $(\tfrac12,\tfrac32)$: $z=2$ và điểm là tổ hợp $\tfrac14(2,0)+\tfrac34(0,2)$, cũng tối ưu và không phải điểm cực.
:::

Trên hình, đường mức nét đứt $z=1$ nằm bên trong tam giác, và đường mức $z=2$ trùng một cạnh. Hiện tượng này xảy ra khi véc-tơ mục tiêu $c=(1,1)$ vuông góc với cạnh nằm trên đường mức xa nhất. Kết quả sau mô tả hình dạng của tập nghiệm tối ưu trong mọi trường hợp.

::: proposition Mệnh đề 07.22 (Tập nghiệm tối ưu)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$, $c\in\mathbb R^n$, giá trị tối ưu $z^*=\sup_{x\in P}c^Tx$ hữu hạn.

**Kết luận.**

- (a) Tập nghiệm tối ưu $P^*=\{x\in P\mid c^Tx=z^*\}$ là một đa diện, do đó là tập lồi.
- (b) Nếu có hai nghiệm tối ưu khác nhau $x'$, $x''$ thì mọi điểm của đoạn nối chúng đều tối ưu; bài toán có vô số nghiệm tối ưu.

**Điều kiện áp dụng.** $z^*$ hữu hạn; $P^*$ có thể rỗng nếu chưa biết giá trị tối ưu được đạt (Định lý 07.26 chứng minh nó luôn được đạt).

**Phạm vi.** Mệnh đề không nói $P^*$ chứa điểm cực nào.
:::

::: proof Chứng minh Mệnh đề 07.22
**Bước 1 (phần (a)).** Vì $c^Tx\le z^*$ trên $P$, tập nghiệm viết được thành $P^*=\{x\mid Ax\le b,\ -c^Tx\le-z^*\}$: thêm một hàng vào $A$. Đó là một đa diện, lồi theo Mệnh đề 07.6(a).

**Bước 2 (phần (b)).** Với $\lambda\in[0,1]$, điểm $\lambda x'+(1-\lambda)x''$ thuộc $P^*$ theo (a). Các điểm này đôi một khác nhau khi $\lambda$ thay đổi, vì $x'\ne x''$. $\square$
:::

Phần (b) cho biết số nghiệm tối ưu của một quy hoạch tuyến tính chỉ có thể là $0$, $1$ hoặc vô số. Phần (a) cùng kết luận với Hệ quả 01.34 (tập nghiệm của bài lồi là tập lồi) và thêm rằng tập nghiệm là một đa diện. Khác bài lồi chặt của Định lý 01.35, mục tiêu tuyến tính không lồi chặt, nên nghiệm duy nhất không được bảo đảm.

### 4.2 Điểm cực tối ưu

Ví dụ 07.14 cho thấy phát biểu đúng chỉ có thể là "tồn tại một điểm cực tối ưu". Định lý sau, theo Bertsimas và Tsitsiklis (1997, §2.6, ở chiều cực tiểu), chứng minh điều đó khi miền có điểm cực, và cho biết giá trị tối ưu hữu hạn luôn được đạt; chứng minh dùng Bổ đề 07.19.

::: theorem Định lý 07.23 (Điểm cực tối ưu)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ có ít nhất một điểm cực; $c\in\mathbb R^n$. Xét bài cực đại $c^Tx$ trên $P$.

**Kết luận.** Xảy ra đúng một trong hai trường hợp:

- (a) $z^*=+\infty$;
- (b) tồn tại một điểm cực $v^*$ của $P$ tối ưu, tức $c^Tv^*=z^*$.

Đặc biệt, nếu $z^*$ hữu hạn thì nó được đạt, và được đạt tại một điểm cực.

**Điều kiện áp dụng.** Cần $P$ có điểm cực; theo Định lý 07.20, điều này tương đương với $P\ne\varnothing$ và $\operatorname{rank}(A)=n$.

**Phạm vi.** Định lý không nói mọi nghiệm tối ưu là điểm cực (Ví dụ 07.14), cũng không cho cách tìm $v^*$ mà không liệt kê.
:::

::: proof Chứng minh Định lý 07.23
**Bước 1 (một bước không làm giảm mục tiêu).** Theo Định lý 07.20, $\operatorname{rank}(A)=n$. Lấy $x\in P$ không phải điểm cực. Theo Định lý 07.13, họ hàng chặt tại $x$ có hạng nhỏ hơn $n$, nên có $d\ne0$ vuông góc với mọi hàng chặt. Đổi $d$ thành $-d$ nếu cần để $c^Td\ge0$. Xét hai trường hợp.

- Có chỉ số $j$ với $a_j^Td>0$. Bổ đề 07.19 cho $x'=x+\theta^*d\in P$ với hạng hàng chặt tăng ít nhất $1$, và $c^Tx'=c^Tx+\theta^*c^Td\ge c^Tx$.
- Mọi $a_j^Td\le0$. Khi đó $x+\theta d\in P$ với mọi $\theta\ge0$. Nếu $c^Td>0$, mục tiêu $c^Tx+\theta c^Td\to+\infty$, tức trường hợp (a). Nếu $c^Td=0$, thay $d$ bằng $-d$: vẫn $c^T(-d)=0$, và vì $Ad\ne0$ (hạng $n$) cùng mọi $a_j^Td\le0$, có $j$ với $a_j^T(-d)>0$; quay về trường hợp thứ nhất.

**Bước 2 (đi tới một điểm cực không tệ hơn).** Giả sử $z^*<+\infty$. Lặp Bước 1 từ một $x\in P$ bất kỳ; trường hợp (a) không xảy ra, hạng hàng chặt tăng sau mỗi lần và không vượt $n$. Sau nhiều nhất $n$ lần, thu được một điểm cực $w(x)$ với $c^Tw(x)\ge c^Tx$.

**Bước 3 (điểm cực tốt nhất là tối ưu).** Theo Hệ quả 07.14, $P$ có hữu hạn điểm cực, và theo giả thiết có ít nhất một. Chọn $v^*$ là điểm cực có $c^Tv^*$ lớn nhất trong số đó. Với mọi $x\in P$:

$$
c^Tx\le c^Tw(x)\le c^Tv^* .
$$

Bất đẳng thức thứ nhất là kết luận của Bước 2; bất đẳng thức thứ hai đúng vì $w(x)$ là một điểm cực. Vậy $c^Tv^*=z^*$. $\square$
:::

Hai giả thiết của định lý có vai trò riêng, và mỗi giả thiết bị bỏ đều có phản ví dụ.

- Bỏ "có điểm cực": bài cực đại $-x_2$ trên nửa mặt phẳng $\{x_2\ge0\}$ có $z^*=0$, đạt trên cả đường $x_2=0$, nhưng miền không có điểm cực nào.
- Bỏ "giá trị hữu hạn": bài cực đại $x_1$ trên $P_1=\{x_1+x_2\ge1,\ x\ge0\}$ có hai điểm cực $(1,0)$, $(0,1)$ nhưng $z^*=+\infty$.

Bước 1 dùng giả thiết hạng để có một ràng buộc mới khi $c^Td=0$; Bước 3 dùng tính hữu hạn của tập điểm cực.

So với Nhận xét 02.12, nơi Bài 02 nêu kết quả này kèm nguồn và chưa chứng minh, định lý được chứng minh đầy đủ ở đây. Nó mạnh hơn câu "nếu có nghiệm tối ưu và có điểm cực thì có điểm cực tối ưu" vì không giả sử trước nghiệm tối ưu tồn tại; cái giá là giả thiết miền có điểm cực.

::: corollary Hệ quả 07.24 (Liệt kê điểm cực là đủ)
**Giả thiết.** Như Định lý 07.23, và $z^*<+\infty$.

**Kết luận.** Gọi $V$ là tập điểm cực của $P$. Khi đó $z^*=\max_{v\in V}c^Tv$. Với bài dạng chuẩn (2.2) khả thi có giá trị tối ưu hữu hạn, $z^*$ bằng giá trị lớn nhất của $c^Tx$ trên các nghiệm cơ sở khả thi.

**Điều kiện áp dụng.** Như Định lý 07.23; với dạng chuẩn, cần giả thiết hạng của Định nghĩa 07.7.

**Phạm vi.** Số nghiệm cơ sở khả thi có thể lên tới $\binom nm$, nên liệt kê chỉ dùng được cho bài nhỏ.
:::

::: proof Chứng minh Hệ quả 07.24
**Bước 1 (đa diện tổng quát).** Theo Bước 3 của chứng minh Định lý 07.23, điểm cực có giá trị lớn nhất là tối ưu.

**Bước 2 (dạng chuẩn).** Theo Hệ quả 07.21(a), đa diện dạng chuẩn khác rỗng có điểm cực; theo Định lý 07.15, các điểm cực là các nghiệm cơ sở khả thi. Áp dụng Bước 1. $\square$
:::

::: example Ví dụ 07.15 (Kiểm giả thiết và áp dụng trên bài hộp hạt)
**Dữ kiện.** Cực đại $2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$; năm điểm cực $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$ (Ví dụ 07.11).

**Kiểm giả thiết.**

1. Có điểm cực: năm hàng chứa $(1,0)$ và $(0,1)$, nên ma trận có hạng $2$; miền khác rỗng vì chứa $(0,0)$. Định lý 07.20 cho điểm cực.
2. Giá trị tối ưu hữu hạn: miền bị chặn ($0\le x_1\le30$, $0\le x_2\le20$), nên $2x_1+3x_2\le2\cdot30+3\cdot20=120$.

**Áp dụng Hệ quả 07.24.** Giá trị tại năm điểm cực là $0$, $60$, $96$, $88$, $60$; lớn nhất là $96$ tại $(30,12)$.

**Kiểm tra lại.** Cận trên $96$ của Ví dụ 07.5 khớp. Cận $120$ ở bước kiểm giả thiết chỉ dùng để biết $z^*$ hữu hạn; nó không phải giá trị tối ưu.
:::

**Trong học máy.** Bộ giải dựa trên đỉnh trả về một điểm cực tối ưu, nên nghiệm có cấu trúc của Định lý 07.23: nhiều ràng buộc chặt, và với dạng chuẩn, nhiều nhất $m$ thành phần khác $0$. Mệnh đề sau đọc cấu trúc đó trên hồi quy $L_1$.

::: proposition Mệnh đề 07.25 (Hồi quy $L_1$ có nghiệm nội suy $n$ mẫu)
**Giả thiết.** $M$ mẫu với $h_i\in\mathbb R^n$, $y_i\in\mathbb R$; các véc-tơ $h_1,\ldots,h_M$ sinh $\mathbb R^n$. Xét quy hoạch tuyến tính (1.2) theo biến $(x,t)\in\mathbb R^{n+M}$.

**Kết luận.**

- (a) Miền khả thi của (1.2) có điểm cực.
- (b) Bài (1.2) có một điểm cực tối ưu $(x^*,t^*)$.
- (c) Tại mọi điểm cực tối ưu, tập $Z=\{i\mid h_i^Tx^*=y_i\}$ các mẫu có phần dư bằng $0$ thỏa: các véc-tơ $h_i$, $i\in Z$, sinh $\mathbb R^n$. Đặc biệt có ít nhất $n$ mẫu được nội suy chính xác.

**Điều kiện áp dụng.** Các $h_i$ sinh $\mathbb R^n$, tức ma trận có hàng $h_i^T$ có hạng $n$.

**Phạm vi.** Mệnh đề nói về một nghiệm đỉnh; nghiệm tối ưu không duy nhất có thể có nghiệm không nội suy mẫu nào (Ví dụ 07.4: $x=2$ tối ưu, cả hai phần dư khác $0$).
:::

::: proof Chứng minh Mệnh đề 07.25
**Bước 1 (viết thành đa diện).** Mẫu $i$ cho hai hàng theo biến $(x,t)$: $h_i^Tx-t_i\le y_i$ và $-h_i^Tx-t_i\le-y_i$. Một hướng $(\delta,\tau)\in\mathbb R^{n+M}$ vuông góc với cả hai hàng khi $h_i^T\delta-\tau_i=0$ và $-h_i^T\delta-\tau_i=0$, tức $\tau_i=0$ và $h_i^T\delta=0$.

**Bước 2 (phần (a)).** Theo Bước 1, hướng vuông góc với mọi hàng thỏa $h_i^T\delta=0$ với mọi $i$, nên $\delta=0$ vì các $h_i$ sinh $\mathbb R^n$, và $\tau=0$. Ma trận ràng buộc có hạng $n+M$. Miền khác rỗng, chẳng hạn $x=0$, $t_i=\lvert y_i\rvert$. Định lý 07.20 cho điểm cực.

**Bước 3 (phần (b)).** Viết bài (1.2) thành cực đại $-\sum_it_i$. Vì $t_i\ge\lvert r_i\rvert\ge0$, mục tiêu không vượt $0$, nên $z^*\le0$ hữu hạn. Định lý 07.23 cho một điểm cực tối ưu.

**Bước 4 (phần (c)).** Tại điểm cực tối ưu $(x^*,t^*)$, Hệ quả 07.4 cho $t_i^*=\lvert r_i^*\rvert$, nên mỗi mẫu có ít nhất một hàng chặt, và có cả hai hàng chặt đúng khi $r_i^*=0$, tức $i\in Z$. Theo Bước 1, một hướng vuông góc với mọi hàng chặt có $\tau_i$ xác định bởi $\delta$ với $i\notin Z$ (một phương trình $\tau_i=\pm h_i^T\delta$), và có $\tau_i=0$, $h_i^T\delta=0$ với $i\in Z$. Định lý 07.13 đòi hướng như vậy chỉ là $0$; điều đó xảy ra khi và chỉ khi $h_i^T\delta=0$ với mọi $i\in Z$ kéo theo $\delta=0$, tức các $h_i$, $i\in Z$, sinh $\mathbb R^n$. Một họ sinh $\mathbb R^n$ có ít nhất $n$ véc-tơ. $\square$
:::

Với mô hình đường thẳng $h_i=(1,\nu_i)$, trong đó $\nu_i$ là giá trị đầu vào của mẫu $i$, phần (c) nói: có một đường thẳng $L_1$ tối ưu đi qua ít nhất hai điểm dữ liệu có đầu vào khác nhau. Bình phương nhỏ nhất không bảo đảm tính chất này. Tình huống 07.1 kiểm điều này trên năm mẫu có một ngoại lai.

### 4.3 Bốn kết cục của quy hoạch tuyến tính

Định lý 07.23 cần miền có điểm cực. Mọi quy hoạch tuyến tính đều đưa được về dạng chuẩn, và dạng chuẩn khả thi luôn có điểm cực (Hệ quả 07.21). Ghép hai sự kiện đó cho một phân loại áp dụng cho mọi quy hoạch tuyến tính, không cần giả thiết nào.

![Bốn ô. Ô "Không khả thi": hai nửa mặt phẳng x2 ≥ 2 và x2 ≤ 1 không giao nhau, ghi "giao rỗng". Ô "Mục tiêu không bị chặn": miền mở về bên phải, véc-tơ c hướng sang phải, ghi "z tăng mãi". Ô "Tối ưu duy nhất": đường mức xa nhất theo hướng c chạm miền tại một đỉnh. Ô "Nhiều nghiệm tối ưu": đường mức xa nhất trùng một cạnh vuông góc với c, ghi "cả cạnh tối ưu".](img/lec-07/lp-four-statuses.svg)

Hình vẽ bốn tình huống trong mặt phẳng. Ô thứ nhất có miền rỗng; ô thứ hai có miền kéo dài theo hướng $c$; hai ô cuối có đường mức xa nhất chạm miền tại một đỉnh hoặc trùng một cạnh. Định lý sau chứng minh không còn khả năng nào khác.

::: theorem Định lý 07.26 (Bốn kết cục)
**Giả thiết.** Một quy hoạch tuyến tính bất kỳ: cực đại $c^Tx$ trên $P=\{x\in\mathbb R^n\mid Ax\le b\}$, với $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$, $c\in\mathbb R^n$.

**Kết luận.** Bài toán rơi vào đúng một trong bốn kết cục (outcome):

1. không khả thi: $P=\varnothing$;
2. không bị chặn: $P\ne\varnothing$ và $z^*=+\infty$;
3. tối ưu duy nhất: $z^*$ hữu hạn, được đạt, và có đúng một nghiệm tối ưu;
4. nhiều nghiệm tối ưu: $z^*$ hữu hạn, được đạt, và có vô số nghiệm tối ưu.

Đặc biệt, không có quy hoạch tuyến tính nào có giá trị tối ưu hữu hạn mà không được đạt.

**Điều kiện áp dụng.** Mọi quy hoạch tuyến tính; bài cực tiểu, bài có phương trình hay biến không âm được viết về dạng của giả thiết như sau Định nghĩa 07.1.

**Phạm vi.** Định lý chỉ phân loại; nó không cho cách xác định kết cục mà không giải bài toán. Kết luận không đúng cho bài lồi không tuyến tính (Nhận xét 07.27).
:::

::: proof Chứng minh Định lý 07.26
**Bước 1 (bốn trường hợp loại trừ nhau).** Kết cục 1 và 2 tách nhau bởi $P$ rỗng hay không. Kết cục 3 và 4 có $z^*$ hữu hạn nên khác kết cục 2; chúng tách nhau bởi số nghiệm.

**Bước 2 (giá trị hữu hạn thì được đạt).** Giả sử $P\ne\varnothing$ và $z^*<+\infty$. Theo Mệnh đề 07.8, bài mới ở dạng chuẩn có miền $\tilde P$ khác rỗng (chứa $\varphi(x)$ với $x\in P$) và cùng giá trị tối ưu $z^*$. Theo Hệ quả 07.21(a), $\tilde P$ có điểm cực. Theo Định lý 07.23 áp dụng cho $\tilde P$, viết thành đa diện dạng (2.1) bằng Mệnh đề 07.6(b), có $\tilde x^*\in\tilde P$ tối ưu. Theo Mệnh đề 07.8(d), $\psi(\tilde x^*)\in P$ tối ưu cho bài gốc.

**Bước 3 (số nghiệm).** Khi $z^*$ hữu hạn và được đạt, Mệnh đề 07.22(b) cho số nghiệm là $1$ hoặc vô số. Cùng với Bước 2, mọi bài toán khả thi có $z^*<+\infty$ thuộc kết cục 3 hoặc 4. $\square$
:::

Định lý đọc thành hai câu hỏi chẩn đoán: miền khả thi có rỗng không, và nếu không, mục tiêu có bị chặn theo chiều tối ưu không. Nếu cả hai câu trả lời là "không rỗng" và "bị chặn", bài toán có nghiệm, và theo Định lý 07.23 áp dụng cho dạng chuẩn, có một nghiệm cơ sở khả thi tối ưu.

So với Định lý 07.23, định lý này bỏ giả thiết "có điểm cực" và đổi lại chỉ kết luận nghiệm tối ưu tồn tại, không kết luận nó là điểm cực của miền gốc. Trên nửa mặt phẳng, bài cực đại $-x_2$ thuộc kết cục 4 dù miền không có đỉnh.

::: example Ví dụ 07.16 (Bốn kết cục trên bài một biến)
**Dữ kiện.** Bốn bài với biến $x\in\mathbb R$.

1. Cực đại $x$ dưới $x\le0$ và $x\ge1$: miền rỗng, không khả thi.
2. Cực đại $x$ dưới $x\ge0$: miền khác rỗng và $x$ tăng mãi, không bị chặn.
3. Cực đại $x$ dưới $0\le x\le1$: nghiệm duy nhất $x^*=1$, $z^*=1$.
4. Cực đại $0\cdot x$ dưới $0\le x\le1$: mọi điểm đều tối ưu với $z^*=0$, vô số nghiệm.

**Cùng miền, khác mục tiêu.** Trên miền $x\ge0$ của bài 2, bài cực đại $-x$ có nghiệm duy nhất $x^*=0$. Miền không bị chặn không kéo theo mục tiêu không bị chặn; kết cục phụ thuộc hướng $c$.

**Kiểm tra lại.** Ở bài 3, $x\le1$ cho $z\le1$ và $x=1$ khả thi. Ở bài 2, với mọi $K$, điểm $x=K+1$ khả thi và cho $z>K$.
:::

::: remark Nhận xét 07.27 (So với bài lồi tổng quát và ba nhầm lẫn)
**So với Nhận xét 02.8.** Một bài lồi tổng quát có thêm kết cục "bị chặn nhưng không đạt" (Nhận xét 02.8 gọi các kết cục là "trạng thái"), chẳng hạn cực tiểu $\exp(x)$ trên $\mathbb R$ có cận dưới đúng $0$ không đạt. Định lý 07.26 loại kết cục đó cho quy hoạch tuyến tính; lý do nằm ở cấu trúc đa diện của miền, đi qua Định lý 07.23.

**Ba nhầm lẫn.**

- "Miền không bị chặn thì mục tiêu không bị chặn": sai, như bài cực đại $-x$ trên $x\ge0$.
- "Nhiều nghiệm tối ưu nghĩa là hai nghiệm": sai, theo Mệnh đề 07.22(b) là vô số.
- "Làm tròn nghiệm của quy hoạch tuyến tính cho nghiệm của bài có biến nguyên": sai. Bài cực đại $x$ dưới $2x\le1$, $x\ge0$ có nghiệm $\tfrac12$; làm tròn lên cho $1$, vi phạm $2x\le1$, còn bài có thêm điều kiện $x$ nguyên có nghiệm $0$. Quy hoạch nguyên cần công cụ khác.
:::

**Trong học máy.** Bộ giải quy hoạch tuyến tính báo một trong bốn kết cục của Định lý 07.26, và mỗi kết cục chỉ về một loại lỗi mô hình: không khả thi do các yêu cầu mâu thuẫn, không bị chặn do quên một giới hạn tài nguyên, nhiều nghiệm do các cấu hình hòa nhau về mục tiêu. Tình huống 07.2 chẩn đoán cả ba trên một bài phân bổ giờ GPU.

### 4.4 Đỉnh kề và lợi ích rút gọn

Hệ quả 07.24 cho một thuật toán: liệt kê mọi điểm cực và chọn điểm tốt nhất. Số điểm cực có thể lên tới $\binom nm$; với $n=40$ biến và $m=20$ phương trình, $\binom{40}{20}=137\,846\,528\,820\approx1{,}38\cdot10^{11}$. Cần một cách tìm kiếm cục bộ: từ một điểm cực, chỉ xét các điểm cực "bên cạnh" và đi sang một điểm tốt hơn.

Trên ngũ giác hộp hạt, hai đỉnh "bên cạnh" khi nối với nhau bằng một cạnh của ngũ giác, tức cùng nằm trên một đường biên. Trong $\mathbb R^n$, một đỉnh là nghiệm duy nhất của $n$ ràng buộc chặt độc lập; hai đỉnh kề nhau khi chúng chung $n-1$ ràng buộc trong số đó.

::: definition Định nghĩa 07.28 (Điểm cực kề nhau, cạnh)
Cho đa diện $P\subseteq\mathbb R^n$. Hai điểm cực khác nhau $v$, $w$ của $P$ kề nhau (adjacent) nếu có $n-1$ ràng buộc với hàng độc lập tuyến tính cùng chặt tại $v$ và tại $w$. Tập các điểm của $P$ thỏa $n-1$ ràng buộc đó với dấu bằng chứa đoạn nối $v$ và $w$, và được gọi là một cạnh (edge) của $P$.
:::

Định nghĩa theo Bertsimas và Tsitsiklis (1997, §2.2). Trong mặt phẳng, $n-1=1$: hai đỉnh kề nhau khi chung một đường biên chặt. Trên ngũ giác hộp hạt, $(30,0)$ và $(30,12)$ kề nhau vì cùng nằm trên $x_1=30$; $(30,12)$ và $(14,20)$ kề nhau qua đường giờ máy; còn $(0,0)$ và $(30,12)$ không chung đường biên nào nên không kề.

Với dạng chuẩn, đỉnh kề có một mô tả qua cơ sở. Mệnh đề sau cần Định lý 07.15 (nghiệm cơ sở khả thi là điểm cực) và định lý số chiều (hạng của một họ hàng cộng số chiều không gian nghiệm của hệ thuần nhất tương ứng bằng $n$).

::: proposition Mệnh đề 07.29 (Hai cơ sở khác nhau một chỉ số)
**Giả thiết.** Bài dạng chuẩn (2.2) với $\operatorname{rank}(A)=m$. Hai cơ sở $B$, $B'$ khác nhau đúng một chỉ số, tức $\lvert B\cap B'\rvert=m-1$, cho hai nghiệm cơ sở khả thi $v\ne w$.

**Kết luận.** $v$ và $w$ là hai điểm cực kề nhau theo Định nghĩa 07.28.

**Điều kiện áp dụng.** Hai điểm phải khác nhau; khi suy biến, hai cơ sở khác một chỉ số có thể cho cùng một điểm.

**Phạm vi.** Mệnh đề không nói mọi cặp đỉnh kề đều có hai cơ sở như vậy; chương chỉ dùng chiều này.
:::

::: proof Chứng minh Mệnh đề 07.29
**Bước 1 (hai điểm là điểm cực).** Theo Định lý 07.15, mỗi nghiệm cơ sở khả thi là điểm cực.

**Bước 2 (ràng buộc chung).** Tập $B\cup B'$ có $m+1$ phần tử. Cả $v$ và $w$ thỏa $m$ phương trình $Ax=b$, và có $x_{j'}=0$ với mọi $j'\notin B\cup B'$, vì mỗi điểm bằng $0$ ngoài cơ sở của nó. Tổng cộng có $m+(n-m-1)=n-1$ ràng buộc cùng chặt tại hai điểm.

**Bước 3 (hạng của các ràng buộc chung).** Hệ thuần nhất tương ứng là $Ay=0$, $y_{j'}=0$ với $j'\notin B\cup B'$. Nghiệm của nó tựa trên $B\cup B'$ và thỏa $\sum_{j'\in B\cup B'}y_{j'}A_{j'}=0$. Các cột trên $B\cup B'$ có hạng $m$ vì chứa $A_B$ khả nghịch, nên không gian nghiệm có chiều $(m+1)-m=1$.

**Bước 4 (kết luận).** Theo định lý số chiều, $n-1$ ràng buộc ở Bước 2 có hạng $n-1$, tức độc lập tuyến tính. Hai điểm cực khác nhau cùng chặt $n-1$ ràng buộc độc lập, nên kề nhau theo Định nghĩa 07.28. $\square$
:::

Mệnh đề chuyển Định nghĩa 07.28, phát biểu bằng các hàng chặt, sang ngôn ngữ cột cơ sở: đổi một cột cơ sở là đi dọc một cạnh. Chương chỉ dùng chiều này; chiều ngược, mọi cặp đỉnh kề có hai cơ sở khác một chỉ số, không được phát biểu. Trên bài hộp hạt, hai cơ sở $\{s_1,s_2,s_3\}$ và $\{x_1,s_2,s_3\}$ khác nhau ở một chỉ số và cho hai đỉnh kề $(0,0)$, $(30,0)$.

Để tìm đỉnh kề bằng đại số, cần biết đi theo hướng nào từ một nghiệm cơ sở khả thi. Trên dạng chuẩn hộp hạt, xét đỉnh $(0,0)$ với cơ sở $\{s_1,s_2,s_3\}$ và tăng $x_1$ thêm $\theta$ đơn vị, giữ $x_2=0$.

- Ba phương trình buộc $s_1=30-\theta$, $s_2=20$, $s_3=54-\theta$; điểm đi theo hướng $(1,0,-1,0,-1)$.
- Mục tiêu tăng $2\theta$.
- Điểm còn khả thi tới $\theta=30$, khi $s_1$ về $0$; khi đó điểm là $(30,0,0,20,24)$, tức đỉnh $(30,0)$.

Hướng trong phép tính này tăng một biến ngoài cơ sở, giữ các biến ngoài cơ sở khác bằng $0$, và điều chỉnh các biến cơ sở để vẫn thỏa $Ax=b$. Định nghĩa sau gọi tên hướng đó và mức tăng của mục tiêu.

::: definition Định nghĩa 07.30 (Hướng cơ sở, lợi ích rút gọn)
Cho bài dạng chuẩn (2.2), một cơ sở $B$ và $j\in B^{\mathrm c}$. Hướng cơ sở (basic direction) $d^j\in\mathbb R^n$ có các thành phần

$$
d^j_j=1,\qquad d^j_{j'}=0\ \ (j'\in B^{\mathrm c},\ j'\ne j),\qquad d^j_B=-A_B^{-1}A_j .
\tag{4.1}
$$

Lợi ích rút gọn (reduced cost, viết cho chiều cực đại) của biến $j$ là

$$
\bar c_j=c^Td^j=c_j-c_B^TA_B^{-1}A_j .
\tag{4.2}
$$
:::

Theo (4.1), hướng $d^j$ tăng $x_j$ một đơn vị, giữ các biến ngoài cơ sở khác bằng $0$, và điều chỉnh biến cơ sở để $Ad^j=A_B d^j_B+A_j=0$. Theo (4.2), $\bar c_j$ là mức thay đổi của mục tiêu trên một đơn vị dịch chuyển: lợi ích trực tiếp $c_j$ trừ lợi ích mất ở các biến cơ sở. Bertsimas và Tsitsiklis (1997, §3.1) viết cho bài cực tiểu và gọi nó là chi phí rút gọn.

::: proposition Mệnh đề 07.31 (Tiêu chuẩn tối ưu theo lợi ích rút gọn)
**Giả thiết.** Bài dạng chuẩn (2.2); $x$ là nghiệm cơ sở khả thi với cơ sở $B$.

**Kết luận.**

- (a) Với mọi $x'\in P$: $x'-x=\sum_{j\in B^{\mathrm c}}x'_j\,d^j$, và do đó $c^Tx'-c^Tx=\sum_{j\in B^{\mathrm c}}x'_j\,\bar c_j$.
- (b) Nếu $\bar c_j\le0$ với mọi $j\in B^{\mathrm c}$ thì $x$ là nghiệm tối ưu.

**Điều kiện áp dụng.** Mọi nghiệm cơ sở khả thi, kể cả suy biến.

**Phạm vi.** Chiều ngược của (b) sai khi $x$ suy biến: $x$ có thể tối ưu trong khi một lợi ích rút gọn dương (Tình huống 07.2).
:::

::: proof Chứng minh Mệnh đề 07.31
**Bước 1 (phân tích $x'-x$).** Đặt $d=x'-x$. Vì $Ax'$ và $Ax$ cùng bằng $b$, nên $Ad=0$, tức $A_Bd_B+\sum_{j\in B^{\mathrm c}}d_jA_j=0$, nên $d_B=-\sum_{j\in B^{\mathrm c}}d_jA_B^{-1}A_j$. Với $j\in B^{\mathrm c}$, $x_j=0$ nên $d_j=x'_j$. So từng khối với (4.1): $d=\sum_{j\in B^{\mathrm c}}x'_jd^j$.

**Bước 2 (giá trị).** Nhân với $c^T$ và dùng (4.2): $c^Tx'-c^Tx=\sum_{j\in B^{\mathrm c}}x'_j\bar c_j$.

**Bước 3 (phần (b)).** Với $x'\in P$, mọi $x'_j\ge0$; nếu mọi $\bar c_j\le0$ thì tổng ở Bước 2 không dương, nên $c^Tx'\le c^Tx$. $\square$
:::

Theo mệnh đề, mọi hướng từ $x$ vào miền khả thi là tổ hợp không âm của các hướng cơ sở, nên chỉ cần kiểm $n-m$ hướng. Tại cơ sở tối ưu $\{x_1,x_2,s_2\}$ của bài hộp hạt, các số $-\bar c_j$ của biến phụ ngoài cơ sở là hệ số nhân của Ví dụ 07.5 (Ví dụ 07.18 kiểm), tức nhân tử đối ngẫu của Bài 03.

Kết quả sau là cơ sở của tìm kiếm cục bộ. Phát biểu áp dụng cho mọi đa diện có điểm cực; chứng minh dưới đây viết cho dạng chuẩn với điểm cực không suy biến, dùng Định nghĩa 07.30, Mệnh đề 07.31 và Mệnh đề 07.29.

::: lemma Bổ đề 07.32 (Đỉnh kề cải thiện)
**Giả thiết.** $P$ là đa diện có ít nhất một điểm cực; $z^*=\sup_{x\in P}c^Tx$ hữu hạn; $v$ là điểm cực của $P$ với $c^Tv<z^*$.

**Kết luận.** Có một điểm cực $w$ kề $v$ với $c^Tw>c^Tv$.

**Điều kiện áp dụng.** Đa diện bất kỳ có điểm cực, với giá trị tối ưu hữu hạn.

**Phạm vi.** Chương chứng minh bổ đề khi $P$ ở dạng chuẩn và $v$ không suy biến.

*Quy về dạng chuẩn.* Cho $P=\{x\mid Ax\le b\}$ với $A\in\mathbb R^{m\times n}$ có điểm cực, nên $\operatorname{rank}(A)=n$ (Định lý 07.20). Gọi $W$ là ma trận có $m-n$ hàng lập thành một cơ sở của không gian nghiệm trái $\{y\mid y^TA=0\}$, và đặt $Q=\{s\in\mathbb R^m\mid s\ge0,\ Ws=Wb\}$, một đa diện dạng chuẩn. Ánh xạ $x\mapsto s=b-Ax$ là song ánh affine từ $P$ lên $Q$ (đơn ánh vì hạng $n$; $s\in b-\operatorname{Im}A$ khi và chỉ khi $Ws=Wb$), nên giữ điểm cực, và ràng buộc $a_i^Tx\le b_i$ chặt khi và chỉ khi $s_i=0$. Quan hệ kề cũng được giữ: với tập chỉ số chung $\mathcal J$, không gian nghiệm $\{d\mid a_i^Td=0,\ i\in\mathcal J\}$ được ánh xạ đơn ánh $d\mapsto\tilde d=-Ad$ lên $\{\tilde d\mid W\tilde d=0,\ \tilde d_i=0,\ i\in\mathcal J\}$, nên hai không gian cùng số chiều, và theo định lý số chiều, các ràng buộc chung có hạng $n-1$ trong $P$ khi và chỉ khi các ràng buộc chung (gồm $m-n$ hàng của $W$) có hạng $m-1$ trong $Q$.

*Trường hợp suy biến* nằm ngoài phạm vi học phần. Ý tưởng: từ cơ sở của $v$, chạy phương pháp đơn hình với một quy tắc chống quay vòng như quy tắc Bland; phương pháp không dừng tại $v$ vì $v$ không tối ưu, nên tới một lúc nó đổi cơ sở mà điểm di chuyển, và điểm mới là một đỉnh kề tốt hơn (Bertsimas và Tsitsiklis 1997, §3.2 và §3.4; dẫn số mục, chưa đối chiếu trang).
:::

::: proof Chứng minh Bổ đề 07.32 (dạng chuẩn, $v$ không suy biến)
**Bước 1 (có một lợi ích rút gọn dương).** Vì $c^Tv<z^*$, có $x'\in P$ với $c^Tx'>c^Tv$. Theo Mệnh đề 07.31(a), $\sum_{j\in B^{\mathrm c}}x'_j\bar c_j=c^Tx'-c^Tv>0$; vì mọi $x'_j\ge0$, có $j\in B^{\mathrm c}$ với $\bar c_j>0$.

**Bước 2 (hướng $d^j$ không phải một tia khả thi).** Điểm $v+\theta d^j$ thỏa $A(v+\theta d^j)=b$ với mọi $\theta$. Nếu $d^j_B\ge0$, mọi thành phần của $v+\theta d^j$ không âm với $\theta\ge0$, nên nó thuộc $P$ và $c^T(v+\theta d^j)=c^Tv+\theta\bar c_j\to+\infty$, trái giả thiết $z^*$ hữu hạn. Vậy có $j'\in B$ với $d^j_{j'}<0$.

**Bước 3 (phép thử tỉ số).** Đặt

$$
\theta^*=\min\left\{\frac{v_{j'}}{-d^j_{j'}}\ \middle|\ j'\in B,\ d^j_{j'}<0\right\}.
$$

Vì $v$ không suy biến, mọi $v_{j'}>0$ với $j'\in B$, nên $\theta^*>0$. Điểm $w=v+\theta^*d^j$ không âm theo cách chọn $\theta^*$, thuộc $P$, và $c^Tw=c^Tv+\theta^*\bar c_j>c^Tv$.

**Bước 4 ($w$ là điểm cực).** Gọi $l\in B$ là chỉ số đạt cực tiểu, nên $w_l=0$, và đặt $B'=(B\setminus\{l\})\cup\{j\}$. Véc-tơ $A_B^{-1}A_j=-d^j_B$ có thành phần ứng với $l$ khác $0$, nên thay cột $A_l$ bằng $A_j$ giữ $m$ cột độc lập: $A_{B'}$ khả nghịch. Các thành phần dương của $w$ nằm trong $B'$, nên $w$ là nghiệm cơ sở khả thi của $B'$ và là điểm cực theo Định lý 07.15.

**Bước 5 ($w$ kề $v$).** Hai cơ sở $B$, $B'$ khác nhau đúng một chỉ số, và $w\ne v$ vì $\theta^*>0$, $d^j\ne0$. Theo Mệnh đề 07.29, $v$ và $w$ kề nhau. $\square$
:::

Bước 3 là chỗ duy nhất cần giả thiết không suy biến. Khi một biến cơ sở $x_{j'}$ bằng $0$ và $d^j_{j'}<0$, $\theta^*=0$: cơ sở đổi nhưng điểm không di chuyển, và một quy tắc chọn kém có thể quay lại một cơ sở cũ, hiện tượng gọi là quay vòng (cycling).

::: example Ví dụ 07.17 (Hướng cơ sở tại đỉnh $(0,0)$ của bài hộp hạt)
**Dữ kiện.** Dạng chuẩn hộp hạt: cực đại $2x_1+3x_2$ (biến phụ có hệ số $0$), $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm, thứ tự $(x_1,x_2,s_1,s_2,s_3)$. Nghiệm cơ sở khả thi $(0,0,30,20,54)$ với $B=\{s_1,s_2,s_3\}$, $A_B=I$.

**Hướng tăng $x_1$.** $d_B=-A_1=-(1,0,1)$, nên $d^{x_1}=(1,0,-1,0,-1)$ và $\bar c_{x_1}=2>0$. Phép thử tỉ số: $s_1$ cho $\tfrac{30}1=30$, $s_3$ cho $\tfrac{54}1=54$; $\theta^*=30$. Điểm mới $(30,0,0,20,24)$, tức đỉnh $(30,0)$, với $z=60$.

**Hướng tăng $x_2$.** $d_B=-A_2=-(0,1,2)$, nên $d^{x_2}=(0,1,0,-1,-2)$ và $\bar c_{x_2}=3>0$. Phép thử tỉ số: $s_2$ cho $\tfrac{20}1=20$, $s_3$ cho $\tfrac{54}2=27$; $\theta^*=20$. Điểm mới $(0,20,30,0,14)$, tức đỉnh $(0,20)$, với $z=60$.

**Kiểm tra lại.** $\bar Ad^{x_1}=(1-1,0,1-1)=0$ và $\bar Ad^{x_2}=(0,1-1,2-2)=0$. Cơ sở mới $\{x_1,s_2,s_3\}$ và $\{x_2,s_1,s_3\}$ mỗi cơ sở khác $\{s_1,s_2,s_3\}$ một chỉ số, nên theo Mệnh đề 07.29 hai đỉnh mới kề $(0,0)$.
:::

### 4.5 Thuật toán đi qua đỉnh kề

Bổ đề 07.32 cho một quy trình: đứng ở một điểm cực, nếu có đỉnh kề tốt hơn thì sang đó, nếu không thì dừng. Thuật toán sau ghi quy trình đó ở mức ý niệm, chưa nói cách tìm đỉnh kề trong mọi trường hợp.

::: algorithm Thuật toán 07.1 (Đi qua đỉnh kề)
**Đầu vào.** Đa diện $P$ có điểm cực; véc-tơ $c$ với $z^*=\sup_{x\in P}c^Tx$ hữu hạn; một điểm cực xuất phát $v$.

**Các bước.**

1. Tìm một điểm cực $w$ kề $v$ với $c^Tw>c^Tv$.
2. Nếu có, gán $v\leftarrow w$ và quay lại bước 1.
3. Nếu không có, dừng.

**Đầu ra.** Điểm cực $v$ khi dừng.

**Chi phí mỗi bước.** Ở dạng chuẩn với $v$ không suy biến: tính $n-m$ lợi ích rút gọn (4.2) và một phép thử tỉ số, mỗi việc cần giải một hệ với ma trận $A_B$.
:::

::: proposition Mệnh đề 07.33 (Thuật toán dừng tại một điểm cực tối ưu)
**Giả thiết.** Như đầu vào của Thuật toán 07.1.

**Kết luận.** Thuật toán dừng sau hữu hạn bước, và điểm cực trả về là nghiệm tối ưu.

**Điều kiện áp dụng.** Bước 1 tìm được đỉnh kề cải thiện khi có; điều này được Bổ đề 07.32 bảo đảm tồn tại.

**Phạm vi.** Số bước bị chặn bởi số điểm cực, có thể lớn theo hàm mũ của số chiều.
:::

::: proof Chứng minh Mệnh đề 07.33
**Bước 1 (không thăm lại).** Mỗi lần lặp tăng $c^Tv$ nghiêm ngặt, nên không điểm cực nào được thăm hai lần.

**Bước 2 (dừng).** Theo Hệ quả 07.14, $P$ có hữu hạn điểm cực, nên số lần lặp hữu hạn.

**Bước 3 (đúng).** Khi dừng, không có đỉnh kề nào tốt hơn $v$. Nếu $c^Tv<z^*$, Bổ đề 07.32 cho một đỉnh kề tốt hơn, mâu thuẫn. Vậy $c^Tv=z^*$. $\square$
:::

Đầu vào khớp giả thiết của Bổ đề 07.32, cộng thêm một điểm cực xuất phát. Tiêu chuẩn dừng dùng so sánh nghiêm ngặt: với so sánh không nghiêm ngặt, thuật toán có thể đi qua lại giữa hai đỉnh cùng giá trị, như ở Bài tập 07.7.

![Ngũ giác khả thi của bài hộp hạt với giá trị z ghi cạnh mỗi đỉnh: (0,0): 0; (30,0): 60; (30,12): 96; (14,20): 88; (0,20): 60. Hai đoạn tô đậm có nhãn "bước 1" từ (0,0) tới (30,0) dọc trục x1 và "bước 2" từ (30,0) lên (30,12) dọc cạnh x1 = 30.](img/lec-07/conceptual-vertex-walk.svg)

Hình ghi giá trị $z$ cạnh mỗi đỉnh của ngũ giác hộp hạt; hai đoạn tô đậm "bước 1" và "bước 2" là hai cạnh của miền mà thuật toán đi qua. Ví dụ sau tính đường đi đó bằng đại số của Mục 4.4.

::: example Ví dụ 07.18 (Thuật toán trên bài hộp hạt)
**Dữ kiện.** Dạng chuẩn hộp hạt: cực đại $2x_1+3x_2$, $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm. Điểm xuất phát $(0,0)$, tức nghiệm cơ sở khả thi $(0,0,30,20,54)$ với $B=\{s_1,s_2,s_3\}$; nó khả thi vì $b\ge0$.

**Bước 1.** Theo Ví dụ 07.17, $\bar c_{x_1}=2$, $\bar c_{x_2}=3$, và hai đỉnh kề là $(30,0)$, $(0,20)$, cùng $z=60$. Chọn $(30,0)$; cơ sở mới $\{x_1,s_2,s_3\}$, điểm $(30,0,0,20,24)$.

**Bước 2.** Tại $(30,0)$, hai biến ngoài cơ sở là $x_2$, $s_1$.

- Tăng $x_2$: $d^{x_2}=(0,1,0,-1,-2)$, $\bar c_{x_2}=3$. Phép thử tỉ số: $s_2$ cho $\tfrac{20}1=20$, $s_3$ cho $\tfrac{24}2=12$; $\theta^*=12$, điểm mới $(30,12,0,8,0)$.
- Tăng $s_1$: $d^{s_1}=(-1,0,1,0,1)$, $\bar c_{s_1}=-2$; hướng này làm giảm $z$.

Sang $(30,12)$ với $z=96$; cơ sở mới $\{x_1,x_2,s_2\}$.

**Kiểm dừng.** Tại $(30,12)$, biến ngoài cơ sở là $s_1$, $s_3$.

- $d^{s_1}=(-1,\tfrac12,1,-\tfrac12,0)$ và $\bar c_{s_1}=-2+\tfrac32=-\tfrac12$.
- $d^{s_3}=(0,-\tfrac12,0,\tfrac12,1)$ và $\bar c_{s_3}=-\tfrac32$.

Mọi lợi ích rút gọn âm, nên theo Mệnh đề 07.31(b), $(30,12)$ tối ưu. Hai đỉnh kề $(30,0)$ và $(14,20)$ có $z=60$ và $88$, cùng nhỏ hơn $96$.

**Kiểm tra lại.** Các số $-\bar c_{s_1}=\tfrac12$ và $-\bar c_{s_3}=\tfrac32$ trùng hai hệ số nhân $\mu_1$, $\mu_3$ của Ví dụ 07.5; giới hạn loại 2, có biến phụ $s_2$ trong cơ sở, nhận hệ số $0$. Đi theo $d^{s_1}$ với $\theta=16$ cho $(14,20,16,0,0)$, đúng đỉnh $(14,20)$.
:::

Nếu bước 1 chọn $(0,20)$, đường đi là $(0,0)\to(0,20)\to(14,20)\to(30,12)$ với $z$ lần lượt $0$, $60$, $88$, $96$. Quy tắc chọn đỉnh kề làm đổi đường đi và số bước, không làm đổi kết luận. Trong dạng chuẩn, mỗi bước đổi đúng một biến cơ sở: $\{s_1,s_2,s_3\}\to\{x_1,s_2,s_3\}\to\{x_1,x_2,s_2\}$.

::: remark Nhận xét 07.34 (Từ thuật toán ý niệm tới phương pháp đơn hình)
Thuật toán 07.1 để ngỏ bốn câu hỏi.

1. Tìm điểm cực xuất phát thế nào khi $b$ có thành phần âm, nên $x=0$ không khả thi.
2. Chọn đỉnh kề nào khi có nhiều đỉnh kề tốt hơn.
3. Tính đỉnh kề bằng đại số ra sao khi suy biến làm $\theta^*=0$.
4. Tránh quay vòng thế nào.

Phương pháp đơn hình (simplex method) trả lời bốn câu hỏi đó bằng phép tính trên cơ sở; đó là nội dung Buổi 8 (Chương 11) của đề cương học phần. Số bước của nó có thể tăng theo hàm mũ của số chiều trên những ví dụ được dựng riêng (Klee và Minty 1972), dù trên các bài thực tế số bước thường nhỏ.
:::

**Trong học máy.** Bộ giải quy hoạch tuyến tính cài đặt phương pháp đơn hình hoặc phương pháp điểm trong; hàm `linprog` của SciPy dùng bộ giải HiGHS, có cả hai loại. Khi có nhiều nghiệm tối ưu, bộ giải dựa trên đỉnh trả về một điểm cực, còn phương pháp điểm trong có thể trả về một điểm giữa cạnh tối ưu. Với hồi quy $L_1$ trên hai mẫu $y_1=1$, $y_2=3$ của Ví dụ 07.4, mọi $x\in[1,3]$ đều tối ưu: bộ giải dựa trên đỉnh trả về $x=1$ hoặc $x=3$, bộ giải điểm trong có thể trả về $x=2$, cùng mất mát mà khác mô hình.

::: exercise Bài tập 07.6 (Điểm cực và đỉnh kề trên một đa giác mới)
Xét bài cực đại $x_1+x_2$ dưới $x_1+2x_2\le4$, $3x_1+x_2\le6$, $x_1,x_2\ge0$.

- (a) Vẽ miền khả thi và xác định bốn đỉnh bằng tiêu chuẩn hạng.
- (b) Tính giá trị mục tiêu tại các đỉnh; xác định kết cục và nghiệm tối ưu.
- (c) Từ $(0,0)$, viết một đường đi qua đỉnh kề có giá trị tăng nghiêm ngặt và nêu lý do dừng.
- (d) Nêu định lý bảo đảm có điểm cực tối ưu và kiểm từng giả thiết.
- (e) Viết dạng chuẩn với biến phụ $s_1$, $s_2$; tại $(1{,}6;\,1{,}2)$ với cơ sở $\{x_1,x_2\}$, tính hai lợi ích rút gọn $\bar c_{s_1}$, $\bar c_{s_2}$ theo (4.1)–(4.2) và kết luận bằng Mệnh đề 07.31.
:::

::: hint
Đường $x_1+2x_2=4$ cắt hai trục tại $(4,0)$, $(0,2)$; đường $3x_1+x_2=6$ cắt hai trục tại $(2,0)$, $(0,6)$. Trên mỗi trục, ràng buộc chặt hơn cho đỉnh.
:::

::: solution
**Câu (a).** Trên trục $x_1$, ràng buộc thứ hai chặt hơn, cho đỉnh $(2,0)$; trên trục $x_2$, ràng buộc thứ nhất chặt hơn, cho đỉnh $(0,2)$. Giao của hai đường chéo: từ $x_2=6-3x_1$ và $x_1+2(6-3x_1)=4$ được $5x_1=8$, tức $x_1=1{,}6$ và $x_2=1{,}2$. Bốn đỉnh là $(0,0)$, $(2,0)$, $(1{,}6;\,1{,}2)$, $(0,2)$, mỗi đỉnh có hai hàng chặt độc lập.

**Câu (b).** Giá trị lần lượt $0$, $2$, $2{,}8$, $2$. Miền bị chặn và khác rỗng, nên theo Hệ quả 07.24, $z^*=2{,}8$ tại $(1{,}6;\,1{,}2)$. Kết cục là tối ưu duy nhất: với $\mu_1=\tfrac25$, $\mu_2=\tfrac15$ giải từ $\mu_1+3\mu_2=1$, $2\mu_1+\mu_2=1$,

$$
\begin{aligned}
x_1+x_2&=\tfrac25(x_1+2x_2)+\tfrac15(3x_1+x_2)\\
&\le\tfrac25\cdot4+\tfrac15\cdot6\\
&=2{,}8,
\end{aligned}
$$

và dấu bằng chỉ khi cả hai ràng buộc chéo chặt, tức chỉ tại $(1{,}6;\,1{,}2)$.

**Câu (c).** Đường $(0,0)\to(2,0)\to(1{,}6;\,1{,}2)$ với giá trị $0\to2\to2{,}8$; mỗi đoạn là một cạnh. Tại $(1{,}6;\,1{,}2)$, hai đỉnh kề $(2,0)$ và $(0,2)$ đều cho $2<2{,}8$, nên thuật toán dừng. Đường qua $(0,2)$ cũng hợp lệ.

**Câu (d).** Định lý 07.23 cần hai giả thiết.

1. Có điểm cực: miền khác rỗng (chứa $(0,0)$), và các hàng $-x_1\le0$, $-x_2\le0$ cho hạng $2$, nên theo Định lý 07.20 có điểm cực.
2. Giá trị hữu hạn: $0\le x_1\le2$ và $0\le x_2\le2$, nên $z\le4$.

**Câu (e).** Dạng chuẩn: $x_1+2x_2+s_1=4$, $3x_1+x_2+s_2=6$, mọi biến không âm, mục tiêu $x_1+x_2$. Tại $(1{,}6;\,1{,}2;\,0;\,0)$, $A_B=\begin{bmatrix}1&2\\3&1\end{bmatrix}$ có định thức $1-6=-5$.

- Hướng $d^{s_1}$: giải $A_Bd_B=-(1,0)^T$, tức $d_1+2d_2=-1$, $3d_1+d_2=0$, được $d_B=(\tfrac15,-\tfrac35)$; $\bar c_{s_1}=\tfrac15-\tfrac35=-\tfrac25$.
- Hướng $d^{s_2}$: giải $A_Bd_B=-(0,1)^T$, tức $d_1+2d_2=0$, $3d_1+d_2=-1$, được $d_B=(-\tfrac25,\tfrac15)$; $\bar c_{s_2}=-\tfrac25+\tfrac15=-\tfrac15$.

Hai lợi ích rút gọn âm, nên theo Mệnh đề 07.31(b) điểm tối ưu; $-\bar c_{s_1}=\tfrac25$ và $-\bar c_{s_2}=\tfrac15$ là hai hệ số nhân $\mu_1$, $\mu_2$ ở câu (b).

**Kiểm tra lại.** Tại $(1{,}6;\,1{,}2)$: $1{,}6+2{,}4=4$ và $4{,}8+1{,}2=6$. Hai hệ số: $\tfrac25+\tfrac35=1$ và $\tfrac45+\tfrac15=1$. Hướng $d^{s_1}=(\tfrac15,-\tfrac35,1,0)$ thỏa $\tfrac15-\tfrac65+1=0$ và $\tfrac35-\tfrac35=0$.
:::

::: exercise Bài tập 07.7 (Bài tổng hợp: đổi lợi ích của bài hộp hạt)
Miền khả thi $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$, với năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$. Mục tiêu mới: cực đại $2x_1+4x_2$.

- (a) Tính $z$ tại năm đỉnh; xác định kết cục và tập nghiệm tối ưu.
- (b) Nêu định lý bảo đảm có điểm cực tối ưu và kiểm giả thiết.
- (c) Chạy Thuật toán 07.1 từ $(0,0)$ theo hai đường khác nhau; xác định đỉnh dừng của mỗi đường.
:::

::: hint
So sánh véc-tơ $(2,4)$ với hàng $(1,2)$ của ràng buộc giờ máy.
:::

::: solution
**Câu (a).** Giá trị tại năm đỉnh: $0$; $2\cdot30=60$; $2\cdot30+4\cdot12=108$; $2\cdot14+4\cdot20=108$; $4\cdot20=80$. Vì $2x_1+4x_2=2(x_1+2x_2)\le2\cdot54=108$, đường mức song song với ràng buộc giờ máy, và giá trị tối ưu $108$ đạt trên cả cạnh nối $(30,12)$ và $(14,20)$. Trên đường $x_1+2x_2=54$, điều kiện $x_2\le20$ cho $x_1\ge14$ và $x_1\le30$, nên tập nghiệm tối ưu là $\{x\mid x_1+2x_2=54,\ 14\le x_1\le30\}$: kết cục nhiều nghiệm tối ưu.

**Câu (b).** Định lý 07.23: miền khác rỗng, có điểm cực (hạng $2$), bị chặn nên $z\le2\cdot30+4\cdot20=140$; cả hai giả thiết thỏa.

**Câu (c).**

- Đường thứ nhất: $(0,0)\to(30,0)\to(30,12)$ với $z$: $0\to60\to108$. Tại $(30,12)$, đỉnh kề $(14,20)$ cũng cho $108$, không lớn hơn nghiêm ngặt, nên thuật toán dừng tại $(30,12)$.
- Đường thứ hai: $(0,0)\to(0,20)\to(14,20)$ với $z$: $0\to80\to108$. Tại $(14,20)$, đỉnh kề $(30,12)$ không tốt hơn nghiêm ngặt, nên thuật toán dừng tại $(14,20)$.

Hai đỉnh dừng khác nhau cho cùng giá trị tối ưu. Thuật toán trả về một điểm cực tối ưu, không trả về cả cạnh; so sánh nghiêm ngặt ngăn nó đi qua lại giữa hai đỉnh cùng giá trị $108$.

**Kiểm tra lại.** Trung điểm $(22,16)$ của cạnh tối ưu: $22+32=54$, $z=44+64=108$, và $16\le20$.
:::

**Chuỗi suy luận của mục.** Mệnh đề 07.22 mô tả tập nghiệm tối ưu. Định lý 07.23, dựa trên Bổ đề 07.19 và Hệ quả 07.14, là kết quả đích của tuyến quy hoạch tuyến tính; Hệ quả 07.24 biến nó thành phép liệt kê, và Định lý 07.26 phân loại mọi bài toán. Định nghĩa 07.28, 07.30, Mệnh đề 07.29, 07.31 và Bổ đề 07.32 dẫn tới Thuật toán 07.1 và Mệnh đề 07.33.

**Kết mục.** Mục đã chứng minh rằng mọi quy hoạch tuyến tính khả thi và bị chặn có nghiệm tối ưu (Định lý 07.26), có nghiệm tối ưu ở đỉnh khi miền có đỉnh (Định lý 07.23), và tìm được bằng cách đi qua các đỉnh kề (Mệnh đề 07.33). Các kết quả đó xét một quyết định chọn một lần. Khi quyết định gồm nhiều giai đoạn, số phương án tăng theo hàm mũ của số giai đoạn; Mục 5 khai thác cấu trúc theo giai đoạn thay cho cấu trúc đỉnh.

## 5. Trạng thái và phương trình Bellman

Mục 4 xét một quyết định chọn một lần. Bài toán sau gồm một chuỗi quyết định: từ nút $\mathrm s$ tới nút $\mathrm t$ qua ba tầng, chọn $\mathrm A$ hoặc $\mathrm B$ rồi $\mathrm C$ hoặc $\mathrm D$, mỗi cạnh có một chi phí, và lựa chọn đầu quyết định các cạnh còn lại.

Với $N$ giai đoạn, mỗi giai đoạn $q$ lựa chọn, có $q^N$ chuỗi quyết định: $N=20$, $q=2$ đã cho $2^{20}=1\,048\,576$ chuỗi. Mục này đưa vào khái niệm trạng thái, chứng minh phương trình Bellman cho chi phí tối ưu còn lại, và tính nó trên đồ thị nhỏ ở trên.

Đường đi ngắn nhất cũng viết được thành quy hoạch tuyến tính trên mạng (bài toán luồng mạng, Buổi 9 (Chương 12) của đề cương); chương dùng cấu trúc khác: chi phí cộng theo giai đoạn, và tương lai chỉ phụ thuộc vị trí hiện tại.

### 5.1 Bài toán quyết định theo giai đoạn

![Đồ thị bốn tầng ghi k=0 đến k=3. Tầng 0 có nút s; tầng 1 có A, B; tầng 2 có C, D; tầng 3 có t. Chi phí cạnh: s–A 2, s–B 5, A–C 4, A–D 2, B–C 1, B–D 3, C–t 3, D–t 1.](img/lec-07/dp-layered-graph.svg)

Hình xếp các nút theo tầng $k=0,1,2,3$, số trên mỗi cạnh là chi phí cạnh, và mỗi đường từ $\mathrm s$ tới $\mathrm t$ gồm ba cạnh. Ví dụ sau liệt kê mọi đường.

::: example Ví dụ 07.19 (Liệt kê bốn đường đi)
**Dữ kiện.** Đồ thị tầng với chi phí cạnh $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$. Cần đường $\mathrm s\to\mathrm t$ có tổng chi phí nhỏ nhất.

**Liệt kê.**

| Đường | Tổng chi phí |
|---|---:|
| $\mathrm s\to\mathrm A\to\mathrm C\to\mathrm t$ | $2+4+3=9$ |
| $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ | $2+2+1=5$ |
| $\mathrm s\to\mathrm B\to\mathrm C\to\mathrm t$ | $5+1+3=9$ |
| $\mathrm s\to\mathrm B\to\mathrm D\to\mathrm t$ | $5+3+1=9$ |

Đường tối ưu là $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ với chi phí $5$.

**Phần lặp lại.** Đoạn cuối $\mathrm C\to\mathrm t$ xuất hiện trong hai đường và được cộng hai lần; đoạn $\mathrm D\to\mathrm t$ cũng vậy. Mỗi đường cần hai phép cộng, tổng cộng $8$ phép cộng và $3$ phép so sánh.

**Kiểm tra lại.** Có $2\cdot2=4$ đường, đúng bằng số cách chọn một nút ở tầng 1 và một nút ở tầng 2.
:::

Trên đồ thị này, liệt kê cần ít phép tính. Với $N$ tầng, một đoạn đuôi chung được tính lại cho mọi lịch sử đi tới đầu đoạn. Để tránh tính lại, cần nhận ra khi nào hai lịch sử khác nhau có cùng phần tương lai; định nghĩa sau đặt bài toán vào một khung có khái niệm đó.

::: definition Định nghĩa 07.35 (Bài toán quyết định hữu hạn tất định)
**Dữ kiện.** Số giai đoạn $N\ge1$. Với $k=0,\ldots,N$, tập trạng thái (state) $X_k$ hữu hạn, khác rỗng. Với $k=0,\ldots,N-1$ và $\xi\in X_k$:

- tập điều khiển (control) cho phép $U_k(\xi)$ hữu hạn, khác rỗng;
- hàm chuyển trạng thái $f_k$, với $f_k(\xi,u)\in X_{k+1}$ cho mọi $u\in U_k(\xi)$;
- chi phí giai đoạn $g_k(\xi,u)\in\mathbb R$.

Chi phí cuối $g_N:X_N\to\mathbb R$.

**Chuỗi điều khiển.** Từ trạng thái $\xi\in X_k$ ở giai đoạn $k$, một chuỗi điều khiển chấp nhận được là $(u_k,\ldots,u_{N-1})$ với $\xi_k=\xi$, $u_{k'}\in U_{k'}(\xi_{k'})$ và $\xi_{k'+1}=f_{k'}(\xi_{k'},u_{k'})$ cho $k'=k,\ldots,N-1$.

**Chi phí.** Chi phí của chuỗi đó là

$$
G_k(\xi;u_k,\ldots,u_{N-1})=\sum_{k'=k}^{N-1}g_{k'}(\xi_{k'},u_{k'})+g_N(\xi_N).
\tag{5.1}
$$

**Bài toán.** Cho trạng thái đầu $\xi_0\in X_0$, tìm chuỗi chấp nhận được từ $\xi_0$ ở giai đoạn $0$ có chi phí $G_0$ nhỏ nhất.
:::

Định nghĩa có bốn giả thiết, mỗi giả thiết có tên riêng trong chương.

- Hữu hạn: số giai đoạn, số trạng thái và số điều khiển đều hữu hạn.
- Tất định: mỗi điều khiển dẫn tới đúng một trạng thái kế tiếp $f_k(\xi,u)$.
- Chi phí cộng: chi phí của cả chuỗi là tổng các chi phí giai đoạn cộng chi phí cuối, theo (5.1).
- Trạng thái đủ: chi phí và trạng thái kế chỉ phụ thuộc trạng thái và điều khiển hiện tại, không phụ thuộc cách đã đi tới trạng thái đó.

Chữ $\xi_k$ chỉ trạng thái, khác biến quyết định $x$ của quy hoạch tuyến tính; chữ "kết cục" của Mục 4 khác chữ "trạng thái" ở đây.

So với quy hoạch tuyến tính, phương án ở đây là một chuỗi chứ không phải một điểm của đa diện. Tập phương án hữu hạn ngay từ đầu, và số phương án tăng theo hàm mũ của số giai đoạn. Khung này là trường hợp tất định của khung quy hoạch động trong bài giảng số 16 của MIT 15.093J (trang 7) và của Bertsekas (2017, §1.1–1.3), nơi trạng thái kế còn phụ thuộc một nhiễu ngẫu nhiên.

::: example Ví dụ 07.20 (Đồ thị tầng là một bài toán quyết định hữu hạn tất định)
**Dữ kiện.** Đồ thị tầng với chi phí cạnh $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$.

**Các thành phần.**

- $N=3$; $X_0=\{\mathrm s\}$, $X_1=\{\mathrm A,\mathrm B\}$, $X_2=\{\mathrm C,\mathrm D\}$, $X_3=\{\mathrm t\}$.
- Điều khiển là nút đến của cạnh đi ra: $U_0(\mathrm s)=\{\mathrm A,\mathrm B\}$, $U_1(\mathrm A)=U_1(\mathrm B)=\{\mathrm C,\mathrm D\}$, $U_2(\mathrm C)=U_2(\mathrm D)=\{\mathrm t\}$.
- Chuyển trạng thái $f_k(\xi,u)=u$; chi phí giai đoạn $g_k(\xi,u)=g(\xi,u)$; chi phí cuối $g_3(\mathrm t)=0$.

**Chi phí một chuỗi.** Chuỗi $(\mathrm A,\mathrm D,\mathrm t)$ từ $\mathrm s$ cho $\xi_1=\mathrm A$, $\xi_2=\mathrm D$, $\xi_3=\mathrm t$ và theo (5.1), $G_0=2+2+1+0=5$.

**Kiểm tra lại.** Bốn giả thiết thỏa: các tập hữu hạn, mỗi cạnh dẫn tới đúng một nút, tổng chi phí là tổng chi phí cạnh, và chi phí cạnh không phụ thuộc đường đã đi.
:::

Giả thiết trạng thái đủ là một yêu cầu về cách mô hình hóa, không phải tính chất tự có của bài toán. Nhận xét sau nêu cách kiểm nó và cách sửa khi nó sai.

::: remark Nhận xét 07.36 (Trạng thái đủ và mở rộng trạng thái)
**Kiểm.** Một lựa chọn trạng thái là đủ khi, biết trạng thái hiện tại, mọi chi phí và chuyển tiếp về sau không còn phụ thuộc vào lịch sử. Bài giảng số 16 của MIT 15.093J (trang 6) gọi trạng thái là bản tóm tắt các quyết định quá khứ còn liên quan và ghi rằng chọn trạng thái thường là bước khó nhất.

**Một trường hợp nút không đủ.** Giả sử đi cạnh $\mathrm C\to\mathrm t$ chịu thêm chi phí $4$ nếu đã tới $\mathrm C$ từ $\mathrm A$. Chi phí tương lai từ $\mathrm C$ khi đó là $7$ với lịch sử $\mathrm s\to\mathrm A\to\mathrm C$ và $3$ với lịch sử $\mathrm s\to\mathrm B\to\mathrm C$; nút $\mathrm C$ không còn là trạng thái đủ.

**Sửa.** Mở rộng trạng thái thành cặp (nút trước, nút hiện tại): $(\mathrm A,\mathrm C)$ và $(\mathrm B,\mathrm C)$ là hai trạng thái, mỗi trạng thái có một chi phí tương lai xác định. Cái giá là số trạng thái tăng; Tình huống 07.4 tính cái giá đó.
:::

### 5.2 Chi phí tối ưu còn lại và phương trình Bellman

Trực giác, chưa phải phát biểu hình thức: từ một trạng thái ở một giai đoạn, phần tương lai là một bài toán con độc lập với quá khứ; chi phí tốt nhất của bài toán con đó tính một lần rồi dùng lại cho mọi lịch sử đi tới trạng thái này.

![Sơ đồ ba cột với tiêu đề "Nhiều lịch sử, một phần tương lai". Cột "Các lịch sử" gồm s→A→C, s→B→C và một ô "lịch sử khác". Cả ba mũi tên đi vào "Nút C" ở cột giữa, nhãn "Trạng thái đủ", ghi "cùng phần tương lai". Cột "Bài toán con" ghi "Tính một lần J(C)=3 rồi dùng lại". Dòng chú thích: chỉ gộp khi quá khứ không còn ảnh hưởng tới tương lai ngoài thông tin đã giữ trong trạng thái.](img/lec-07/dp-state-sufficiency.svg)

Hình cho thấy ba lịch sử khác nhau cùng đi tới nút $\mathrm C$. Từ $\mathrm C$, chỉ còn cạnh $\mathrm C\to\mathrm t$ với chi phí $3$, nên chi phí tốt nhất từ $\mathrm C$ tới đích là $3$ cho mọi lịch sử. Liệt kê tính đoạn $\mathrm C\to\mathrm t$ một lần cho mỗi lịch sử; quy hoạch động tính nó một lần cho nút $\mathrm C$. Dòng chú thích dưới hình là giả thiết trạng thái đủ của Nhận xét 07.36.

::: definition Định nghĩa 07.37 (Chi phí tối ưu còn lại)
Trong bài toán của Định nghĩa 07.35, với $k=0,\ldots,N$ và $\xi\in X_k$, chi phí tối ưu còn lại (optimal cost-to-go), còn gọi là hàm giá trị (value function), là

$$
J_k(\xi)=\min_{(u_k,\ldots,u_{N-1})\in\mathcal U_k(\xi)}G_k(\xi;u_k,\ldots,u_{N-1}),
\tag{5.2}
$$

trong đó $\mathcal U_k(\xi)$ là tập các chuỗi điều khiển chấp nhận được từ $\xi$ ở giai đoạn $k$. Quy ước $J_N(\xi)=g_N(\xi)$, vì ở giai đoạn $N$ không còn điều khiển nào.
:::

Định nghĩa có nghĩa vì tập $\mathcal U_k(\xi)$ hữu hạn và khác rỗng, nên cực tiểu được đạt; $J_0(\xi_0)$ là chi phí tối ưu của toàn bài toán. Đại lượng $J_k(\xi)$ là toàn bộ chi phí tối ưu còn lại, không phải chi phí của bước kế tiếp; nhầm hai đại lượng này là lỗi thường gặp khi chọn điều khiển theo chi phí trước mắt.

Định lý sau cho một hệ thức giữa $J_k$ và $J_{k+1}$. Nó cần Định nghĩa 07.35, Định nghĩa 07.37 và một sự kiện về cực tiểu: cực tiểu của một hàm trên tập hữu hạn được đạt.

::: theorem Định lý 07.38 (Phương trình Bellman)
**Giả thiết.** Bài toán quyết định hữu hạn tất định của Định nghĩa 07.35; $J_k$ theo Định nghĩa 07.37.

**Kết luận.** Với $k=N-1,\ldots,0$ và mọi $\xi\in X_k$,

$$
J_k(\xi)=\min_{u\in U_k(\xi)}\bigl\{g_k(\xi,u)+J_{k+1}\bigl(f_k(\xi,u)\bigr)\bigr\},
\tag{5.3}
$$

cùng điều kiện cuối $J_N(\xi)=g_N(\xi)$ với $\xi\in X_N$.

**Điều kiện áp dụng.** Cả bốn giả thiết của Định nghĩa 07.35: hữu hạn (cực tiểu được đạt), tất định (không có kỳ vọng), chi phí cộng (tách được chi phí trả ngay), trạng thái đủ (chi phí và chuyển tiếp chỉ phụ thuộc $(\xi,u)$).

**Phạm vi.** Với chuyển tiếp ngẫu nhiên, vế phải cần kỳ vọng; với tập điều khiển vô hạn, $\min$ thay bằng cận dưới đúng và cần thêm giả thiết để giá trị được đạt; với số giai đoạn vô hạn, phương trình thành phương trình điểm bất động. Các trường hợp đó nằm ngoài phạm vi chương.
:::

::: proof Chứng minh Định lý 07.38
Cố định $k<N$ và $\xi\in X_k$. Ký hiệu cục bộ $\Omega(u)=g_k(\xi,u)+J_{k+1}(f_k(\xi,u))$ cho $u\in U_k(\xi)$.

**Bước 1 (tách chi phí của một chuỗi).** Một chuỗi chấp nhận được từ $\xi$ ở giai đoạn $k$ là $(u,u_{k+1},\ldots,u_{N-1})$, với $u\in U_k(\xi)$ và $(u_{k+1},\ldots,u_{N-1})$ chấp nhận được từ $\xi'=f_k(\xi,u)$ ở giai đoạn $k+1$. Theo (5.1),

$$
G_k(\xi;u,u_{k+1},\ldots,u_{N-1})=g_k(\xi,u)+G_{k+1}(\xi';u_{k+1},\ldots,u_{N-1}).
$$

Đẳng thức dùng giả thiết chi phí cộng và giả thiết trạng thái đủ: phần chi phí từ giai đoạn $k+1$ chỉ phụ thuộc $\xi'$ và các điều khiển sau đó.

**Bước 2 ($J_k(\xi)\ge\min_u\Omega(u)$).** Theo Định nghĩa 07.37, $G_{k+1}(\xi';\ldots)\ge J_{k+1}(\xi')$ cho mọi chuỗi từ $\xi'$. Thay vào Bước 1: mọi chuỗi từ $\xi$ có chi phí ít nhất $\Omega(u)\ge\min_u\Omega(u)$, với $u$ là điều khiển đầu của chuỗi. Lấy cực tiểu theo mọi chuỗi cho $J_k(\xi)\ge\min_u\Omega(u)$.

**Bước 3 ($J_k(\xi)\le\min_u\Omega(u)$).** Chọn $\hat u$ đạt $\min_u\Omega(u)$, có vì $U_k(\xi)$ hữu hạn, khác rỗng. Với $\hat\xi'=f_k(\xi,\hat u)$, chọn một chuỗi tối ưu $(\hat u_{k+1},\ldots,\hat u_{N-1})$ từ $\hat\xi'$, có vì tập chuỗi hữu hạn, khác rỗng; chi phí của nó là $J_{k+1}(\hat\xi')$. Chuỗi ghép $(\hat u,\hat u_{k+1},\ldots,\hat u_{N-1})$ chấp nhận được từ $\xi$, và theo Bước 1 có chi phí $\Omega(\hat u)$. Do đó $J_k(\xi)\le \Omega(\hat u)=\min_u\Omega(u)$.

**Bước 4 (kết luận).** Bước 2 và Bước 3 cho (5.3). Điều kiện cuối là quy ước của Định nghĩa 07.37. $\square$
:::

Phương trình (5.3) đọc bằng lời: chi phí tối ưu còn lại bằng chi phí trả ngay cộng chi phí tối ưu còn lại từ trạng thái kế, lấy nhỏ nhất theo lựa chọn hiện tại. Vế phải chỉ cần $J_{k+1}$, nên các hàm $J_N,J_{N-1},\ldots,J_0$ tính được lần lượt từ cuối về đầu.

Vai trò từng giả thiết hiện ra trong chứng minh. Bước 1 cần chi phí cộng và trạng thái đủ; Bước 3 cần tập điều khiển hữu hạn để có $\hat u$.

Mệnh đề sau là phát biểu mà Bellman (1957) gọi là nguyên lý tối ưu (principle of optimality). Bước 3 của chứng minh Định lý 07.38 dùng ý này theo chiều ghép đuôi; mệnh đề nói chiều cắt đuôi.

::: proposition Mệnh đề 07.39 (Nguyên lý tối ưu)
**Giả thiết.** Như Định lý 07.38. Chuỗi $(u_0^\circ,\ldots,u_{N-1}^\circ)$ tối ưu từ $\xi_0$, sinh các trạng thái $\xi_0^\circ=\xi_0,\xi_1^\circ,\ldots,\xi_N^\circ$.

**Kết luận.** Với mọi $k$, phần đuôi $(u_k^\circ,\ldots,u_{N-1}^\circ)$ tối ưu cho bài toán con từ $\xi_k^\circ$ ở giai đoạn $k$, tức chi phí của nó bằng $J_k(\xi_k^\circ)$.

**Điều kiện áp dụng.** Như Định lý 07.38.

**Phạm vi.** Chiều ngược lại cần thêm điều khiển đầu tốt: ghép một đuôi tối ưu với một điều khiển đầu tùy ý chưa cho chuỗi tối ưu.
:::

::: proof Chứng minh Mệnh đề 07.39
**Bước 1 (giả sử ngược lại).** Giả sử có chuỗi $(u_k',\ldots,u_{N-1}')$ từ $\xi_k^\circ$ có chi phí nhỏ hơn chi phí của đuôi $(u_k^\circ,\ldots,u_{N-1}^\circ)$.

**Bước 2 (ghép).** Chuỗi $(u_0^\circ,\ldots,u_{k-1}^\circ,u_k',\ldots,u_{N-1}')$ chấp nhận được từ $\xi_0$, vì phần đầu vẫn dẫn tới $\xi_k^\circ$. Theo (5.1), chi phí của nó bằng chi phí phần đầu cộng chi phí đuôi mới, nhỏ hơn chi phí của chuỗi tối ưu ban đầu, mâu thuẫn. $\square$
:::

**Trong học máy.** Phương trình (5.3) là dạng tất định, hữu hạn của phương trình Bellman trong học tăng cường (reinforcement learning), nơi chuyển tiếp ngẫu nhiên nên vế phải lấy kỳ vọng và số giai đoạn có thể vô hạn. Sutton và Barto (2018, chương 3–4) trình bày dạng đó. Trong xử lý chuỗi, thuật toán Viterbi tìm chuỗi nhãn có xác suất lớn nhất của một mô hình Markov ẩn (hidden Markov model, HMM) bằng đúng phương trình này, với chi phí giai đoạn là logarit âm của xác suất; Rabiner (1989) trình bày thuật toán, và Tình huống 07.3 giải một ví dụ. Giả thiết chi phí cộng ở đó được bảo đảm vì logarit biến tích xác suất thành tổng.

::: example Ví dụ 07.21 (Phương trình Bellman trên đồ thị tầng)
**Dữ kiện.** Đồ thị tầng với chi phí cạnh $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$; $N=3$, $g_3(\mathrm t)=0$, điều khiển là nút đến.

**Giai đoạn 3.** $J_3(\mathrm t)=0$.

**Giai đoạn 2.** Mỗi nút có một cạnh tới $\mathrm t$:

$$
J_2(\mathrm C)=3+0=3,\qquad J_2(\mathrm D)=1+0=1 .
$$

**Giai đoạn 1.**

$$
\begin{aligned}
J_1(\mathrm A)&=\min\{4+J_2(\mathrm C),\ 2+J_2(\mathrm D)\}=\min\{7,3\}=3,\\
J_1(\mathrm B)&=\min\{1+J_2(\mathrm C),\ 3+J_2(\mathrm D)\}=\min\{4,4\}=4 .
\end{aligned}
$$

**Giai đoạn 0.**

$$
J_0(\mathrm s)=\min\{2+J_1(\mathrm A),\ 5+J_1(\mathrm B)\}=\min\{5,9\}=5 .
$$

**Kiểm tra lại.** Liệt kê ở Ví dụ 07.19 cho bốn đường với chi phí $9$, $5$, $9$, $9$; nhỏ nhất là $5$, khớp $J_0(\mathrm s)$. Đuôi $\mathrm A\to\mathrm D\to\mathrm t$ của đường tối ưu có chi phí $3=J_1(\mathrm A)$, đúng Mệnh đề 07.39.
:::

![Đồ thị tầng như hình trước, với nhãn J cạnh mỗi nút: J=5 tại s, J=3 tại A, J=4 tại B, J=3 tại C, J=1 tại D, J=0 tại t. Đường s–A–D–t được tô đậm.](img/lec-07/dp-bellman-values.svg)

Hình ghi giá trị $J$ không chỉ số cạnh mỗi nút, vì mỗi nút thuộc đúng một tầng: $J(\mathrm A)$ trên hình là $J_1(\mathrm A)$. Lựa chọn tại $\mathrm s$ so sánh $2+J_1(\mathrm A)=5$ với $5+J_1(\mathrm B)=9$, không so sánh riêng hai chi phí cạnh $2$ và $5$. Tại $\mathrm B$, hai lựa chọn cùng cho $4$; Mục 6 xử lý trường hợp hòa này.

::: exercise Bài tập 07.8 (Lịch bước học hai giai đoạn)
Một quá trình huấn luyện được mô tả thô bằng ba mức mất mát, ký hiệu $3$ (cao), $2$ (vừa), $1$ (thấp). Ở mỗi giai đoạn $k=0,1$ chọn một trong hai điều khiển: bước học lớn $\eta_+$ hoặc bước học nhỏ $\eta_-$. Bảng chuyển trạng thái tất định (số liệu sư phạm):

| Mức hiện tại | Sau bước lớn $\eta_+$ | Sau bước nhỏ $\eta_-$ |
|---|---|---|
| $3$ (cao) | $2$ | $3$ |
| $2$ (vừa) | $2$ | $1$ |
| $1$ (thấp) | $2$ | $1$ |

Chi phí giai đoạn là số giờ GPU: bước lớn $1$ giờ, bước nhỏ $2$ giờ. Chi phí cuối theo mức mất mát sau giai đoạn $1$: mức $1$ chịu $0$, mức $2$ chịu $3$, mức $3$ chịu $6$. Trạng thái đầu là mức $3$.

- (a) Nêu $N$, $X_k$, $U_k$, $f_k$, $g_k$, $g_N$ theo Định nghĩa 07.35.
- (b) Tính $J_2$, $J_1$ và $J_0(3)$ bằng (5.3).
- (c) Kiểm kết quả bằng liệt kê bốn chuỗi.
:::

::: hint
$J_1(\xi)$ cần cho cả ba mức $\xi$, kể cả mức không đi tới được từ mức $3$ sau một giai đoạn.
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

**Kiểm tra lại.** Nhỏ nhất là $3$ với chuỗi $\eta_+,\eta_-$, khớp $J_0(3)$. Lịch giảm bước học sau giai đoạn đầu xuất hiện từ phép tính, không được giả định trước.
:::

**Chuỗi suy luận của mục.** Ví dụ 07.19 cho thấy liệt kê tính lại các đoạn đuôi chung. Định nghĩa 07.35 đặt bài toán vào khung trạng thái, điều khiển, chuyển tiếp và chi phí cộng, với Nhận xét 07.36 về trạng thái đủ. Định nghĩa 07.37 đặt tên cho chi phí tối ưu còn lại, Định lý 07.38 là kết quả đích của mục, và Mệnh đề 07.39 là nguyên lý tối ưu.

**Kết mục.** Mục đã cho phương trình (5.3) xác định mọi $J_k$ từ cuối về đầu (Định lý 07.38). Phương trình cho giá trị, chưa cho chuỗi điều khiển, chưa xử lý lựa chọn hòa như tại $\mathrm B$, và chưa đếm số phép tính. Mục 6 ghép nó với một lượt dựng xuôi thành thuật toán và đếm chi phí.

## 6. Giải ngược, chính sách và chi phí tính toán

Mục 5 tính được $J_0(\mathrm s)=5$ cho đồ thị tầng, nhưng chưa nói phải đi đường nào. Mục này giải hai việc: dựng đường $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ từ các phép tính Bellman mà không liệt kê lại, kể cả khi có lựa chọn hòa như tại $\mathrm B$; và đếm số phép tính khi đồ thị có $N=20$ giai đoạn, mỗi tầng hai nút, so với $2^{20}$ chuỗi.

### 6.1 Chính sách và lượt dựng xuôi

Trong khi tính $J_k(\xi)$ bằng (5.3), phép lấy cực tiểu đã chỉ ra một điều khiển tốt nhất tại $\xi$. Ghi lại điều khiển đó cho mọi trạng thái là đủ để dựng đường tối ưu sau này, mà không cần lưu mọi chuỗi.

::: definition Định nghĩa 07.40 (Chính sách)
Trong bài toán của Định nghĩa 07.35, một chính sách (policy) là một dãy ánh xạ $u_0^*,\ldots,u_{N-1}^*$, trong đó $u_k^*$ gán cho mỗi $\xi\in X_k$ một điều khiển $u_k^*(\xi)\in U_k(\xi)$. Chính sách đạt cực tiểu là chính sách có

$$
u_k^*(\xi)\in\operatorname{argmin}_{u\in U_k(\xi)}\bigl\{g_k(\xi,u)+J_{k+1}\bigl(f_k(\xi,u)\bigr)\bigr\}
\tag{6.1}
$$

với mọi $k$ và mọi $\xi\in X_k$.
:::

Chính sách là một quy tắc cho mọi trạng thái, không phải một chuỗi điều khiển. Từ một chính sách và trạng thái đầu $\xi_0$, lượt dựng xuôi (forward pass) sinh một chuỗi bằng $u_k=u_k^*(\xi_k)$ và $\xi_{k+1}=f_k(\xi_k,u_k)$. Khi tập argmin trong (6.1) có nhiều phần tử, mọi cách chọn đều cho một chính sách đạt cực tiểu.

Giá trị và chính sách là hai sản phẩm khác nhau. Lượt ngược (backward pass) cho giá trị $J_k$; lượt xuôi dùng chính sách để dựng đường. Chỉ lưu $J_k$ mà không lưu chính sách vẫn dựng được đường, với điều kiện còn giữ dữ kiện $g_k$, $f_k$ để tính lại phép lấy cực tiểu.

::: algorithm Thuật toán 07.2 (Giải ngược Bellman)
**Đầu vào.** Bài toán của Định nghĩa 07.35: $N$; trạng thái đầu $\xi_0$; các tập $X_k$, $U_k(\xi)$ hữu hạn, khác rỗng; các hàm $f_k$, $g_k$, $g_N$.

**Các bước.**

1. Đặt $J_N(\xi)=g_N(\xi)$ với mọi $\xi\in X_N$.
2. Với $k=N-1,\ldots,0$ và mỗi $\xi\in X_k$: tính $J_k(\xi)$ bằng (5.3) và lưu một điều khiển $u_k^*(\xi)$ đạt cực tiểu.
3. Lượt xuôi: từ $\xi_0$, với $k=0,\ldots,N-1$, đặt $u_k=u_k^*(\xi_k)$ và $\xi_{k+1}=f_k(\xi_k,u_k)$.

**Đầu ra.** Giá trị $J_0(\xi_0)$, chính sách $u_0^*,\ldots,u_{N-1}^*$ và chuỗi $(u_0,\ldots,u_{N-1})$.

**Chi phí.** Bước 2 xét mỗi cặp $(\xi,u)$ với $\xi\in X_k$, $u\in U_k(\xi)$ đúng một lần; bước 3 cần $N$ lần tra bảng.
:::

Ở bước 2, $J_k(\xi)$ được tính cho mọi $\xi\in X_k$, kể cả trạng thái không nằm trên đường tối ưu. Lý do: trước khi có các giá trị $J$, chưa biết đường tối ưu đi qua đâu. Mệnh đề sau chứng minh chuỗi của bước 3 là tối ưu; nó cần Định lý 07.38 và lập luận quy nạp ngược theo $k$.

::: proposition Mệnh đề 07.41 (Chính sách đạt cực tiểu cho chuỗi tối ưu)
**Giả thiết.** Bài toán của Định nghĩa 07.35; $J_k$ theo Định nghĩa 07.37; $u_0^*,\ldots,u_{N-1}^*$ là một chính sách đạt cực tiểu.

**Kết luận.** Với mọi $k$ và $\xi\in X_k$, chuỗi sinh bởi chính sách từ $\xi$ ở giai đoạn $k$ có chi phí $J_k(\xi)$. Đặc biệt, chuỗi của lượt xuôi trong Thuật toán 07.2 là một chuỗi tối ưu từ $\xi_0$.

**Điều kiện áp dụng.** Như Định lý 07.38.

**Phạm vi.** Khi argmin có nhiều phần tử, các chính sách khác nhau có thể cho các chuỗi tối ưu khác nhau; mệnh đề chỉ nói mỗi chuỗi như vậy tối ưu.
:::

::: proof Chứng minh Mệnh đề 07.41
Gọi $\Pi_k(\xi)$ là chi phí (5.1) của chuỗi sinh bởi chính sách từ $\xi$ ở giai đoạn $k$.

**Bước 1 (giai đoạn $N$).** Không còn điều khiển, nên $\Pi_N(\xi)=g_N(\xi)=J_N(\xi)$.

**Bước 2 (quy nạp ngược).** Giả sử $\Pi_{k+1}=J_{k+1}$ trên $X_{k+1}$. Với $\xi\in X_k$, đặt $u=u_k^*(\xi)$ và $\xi'=f_k(\xi,u)$. Chuỗi sinh bởi chính sách từ $\xi$ gồm $u$ rồi chuỗi sinh bởi chính sách từ $\xi'$, nên theo (5.1) và giả thiết quy nạp,

$$
\begin{aligned}
\Pi_k(\xi)&=g_k(\xi,u)+\Pi_{k+1}(\xi')\\
&=g_k(\xi,u)+J_{k+1}(\xi')\\
&=J_k(\xi).
\end{aligned}
$$

Dòng cuối dùng (6.1) và (5.3): $u$ đạt cực tiểu của vế phải (5.3).

**Bước 3 (kết luận).** Với $k=0$ và $\xi=\xi_0$: chuỗi của lượt xuôi có chi phí $J_0(\xi_0)$, bằng chi phí nhỏ nhất. $\square$
:::

Mệnh đề cho phép tách hai việc: tính toàn bộ bảng $J$ và chính sách một lần, rồi dựng đường từ bất kỳ trạng thái đầu nào bằng $N$ lần tra bảng. Nếu trạng thái đầu đổi, không cần tính lại bảng.

::: example Ví dụ 07.22 (Chính sách và lượt xuôi trên đồ thị tầng)
**Dữ kiện.** Đồ thị tầng với $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$. Giá trị từ Ví dụ 07.21: $J_2(\mathrm C)=3$, $J_2(\mathrm D)=1$, $J_1(\mathrm A)=3$, $J_1(\mathrm B)=4$, $J_0(\mathrm s)=5$.

**Chính sách.**

| Trạng thái | Hai giá trị so sánh | $u_k^*$ |
|---|---|---|
| $\mathrm s$ | $2+3=5$; $5+4=9$ | $\mathrm A$ |
| $\mathrm A$ | $4+3=7$; $2+1=3$ | $\mathrm D$ |
| $\mathrm B$ | $1+3=4$; $3+1=4$ | $\mathrm C$ hoặc $\mathrm D$ |
| $\mathrm C$ | $3+0=3$ | $\mathrm t$ |
| $\mathrm D$ | $1+0=1$ | $\mathrm t$ |

**Lượt xuôi.** Từ $\mathrm s$: $u_0^*(\mathrm s)=\mathrm A$, $u_1^*(\mathrm A)=\mathrm D$, $u_2^*(\mathrm D)=\mathrm t$, cho đường $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$.

**Trường hợp hòa.** Tại $\mathrm B$, cả hai lựa chọn cho $4$; chọn $\mathrm C$ hay $\mathrm D$ không đổi $J_1(\mathrm B)$. Trạng thái $\mathrm B$ không nằm trên đường tối ưu từ $\mathrm s$, nhưng nếu trạng thái đầu là $\mathrm B$ ở giai đoạn $1$, chính sách cho ngay đường từ $\mathrm B$ với chi phí $4$.

**Kiểm tra lại.** Tổng chi phí của đường dựng được: $2+2+1=5=J_0(\mathrm s)$.
:::

### 6.2 Chi phí tính toán

Bước 2 của Thuật toán 07.2 làm một phép cộng và nhiều nhất một phép so sánh cho mỗi cặp trạng thái, điều khiển. Mệnh đề sau đếm chính xác số cặp và so với số chuỗi của phép liệt kê.

::: proposition Mệnh đề 07.42 (Số phép tính của giải ngược)
**Giả thiết.** Bài toán của Định nghĩa 07.35.

**Kết luận.**

- (a) Bước 2 của Thuật toán 07.2 tính đúng $\sum_{k=0}^{N-1}\sum_{\xi\in X_k}\lvert U_k(\xi)\rvert$ biểu thức $g_k(\xi,u)+J_{k+1}(f_k(\xi,u))$.
- (b) Nếu $\lvert X_0\rvert=1$, $\lvert X_k\rvert=q$ với $k\ge1$ và mọi $\lvert U_k(\xi)\rvert=q$, số biểu thức là $q+(N-1)q^2$, trong khi số chuỗi điều khiển từ $\xi_0$ là $q^N$.

**Điều kiện áp dụng.** Mỗi lần tính $g_k$, $f_k$ và tra $J_{k+1}$ tốn một lượng việc chặn bởi một hằng số.

**Phạm vi.** Mệnh đề đếm theo số trạng thái. Khi số trạng thái lớn theo hàm mũ của một tham số khác, số phép tính cũng lớn theo hàm mũ (Nhận xét 07.43).
:::

::: proof Chứng minh Mệnh đề 07.42
**Bước 1 (phần (a)).** Bước 2 duyệt mỗi $k$ từ $N-1$ về $0$, mỗi $\xi\in X_k$, và trong (5.3) tính một biểu thức cho mỗi $u\in U_k(\xi)$. Không cặp nào được tính hai lần.

**Bước 2 (phần (b)).** Giai đoạn $0$ có một trạng thái với $q$ điều khiển; mỗi giai đoạn $k=1,\ldots,N-1$ có $q$ trạng thái, mỗi trạng thái $q$ điều khiển. Tổng là $q+(N-1)q^2$. Mỗi chuỗi chọn một trong $q$ điều khiển ở mỗi giai đoạn, nên có $q^N$ chuỗi. $\square$
:::

Số phép tính của giải ngược tăng tuyến tính theo $N$, còn số chuỗi tăng theo hàm mũ. Lý do nằm ở Mệnh đề 07.39: mọi chuỗi đi qua cùng một trạng thái dùng chung một đuôi tối ưu, nên chỉ cần lưu một giá trị cho mỗi trạng thái.

::: example Ví dụ 07.23 (Đếm phép tính)
**Đồ thị tầng của Mục 5.** Tại $\mathrm s$, $\mathrm A$, $\mathrm B$ mỗi nút hai điều khiển, tại $\mathrm C$, $\mathrm D$ mỗi nút một; theo Mệnh đề 07.42(a), giải ngược tính $2+2+2+1+1=8$ biểu thức, bằng số cạnh và bằng số phép cộng của liệt kê ở Ví dụ 07.19.

**Đồ thị $N=20$ giai đoạn, $q=2$.** Theo Mệnh đề 07.42(b), giải ngược tính $2+19\cdot4=78$ biểu thức. Liệt kê có $2^{20}=1\,048\,576$ chuỗi, mỗi chuỗi cần $19$ phép cộng, tổng cộng khoảng $2\cdot10^7$ phép cộng.

**Kiểm tra lại.** Với $N=3$, $q=2$, công thức (b) cho $2+2\cdot4=10$ biểu thức và $8$ chuỗi; đồ thị của Mục 5 nhỏ hơn trường hợp (b) vì tầng cuối chỉ có một nút $\mathrm t$, nên $\mathrm C$ và $\mathrm D$ mỗi nút chỉ có một điều khiển.
:::

::: remark Nhận xét 07.43 (Giới hạn của quy hoạch động hữu hạn tất định)
**Số trạng thái.** Ưu thế của Mệnh đề 07.42 phụ thuộc vào số trạng thái. Nếu trạng thái là một véc-tơ sáu thành phần, mỗi thành phần nhận mười mức, thì mỗi giai đoạn đã có $10^6$ trạng thái, và số này tăng theo hàm mũ của số thành phần. Bellman (1957) gọi hiện tượng này là lời nguyền số chiều (curse of dimensionality).

**Chuyển tiếp ngẫu nhiên.** Lời giải khi đó là một chính sách chứ không phải một chuỗi cố định (bài giảng số 16 của MIT 15.093J, trang 7 và 9; Bertsekas 2017, §1.3).

**Chân trời vô hạn.** Với số giai đoạn vô hạn và chi phí có chiết khấu, (5.3) thành một phương trình điểm bất động cho một hàm $J$ duy nhất. Các trường hợp này nằm ngoài phạm vi chương.
:::

**Trong học máy.** Giải ngược là khung chung của nhiều thuật toán trên chuỗi: thuật toán Viterbi cho mô hình Markov ẩn và căn chỉnh chuỗi bằng khoảng cách sửa (edit distance) trong xử lý ngôn ngữ. Trong học tăng cường, lặp giá trị (value iteration) dùng cùng phép tính để lập kế hoạch khi mô hình môi trường đã biết. Khi không gian trạng thái quá lớn, như bàn cờ vây, học tăng cường thay bảng $J$ bằng một mạng nơ-ron xấp xỉ, và bảo đảm của Mệnh đề 07.41 không còn đúng nguyên vẹn vì giá trị chỉ là xấp xỉ; Sutton và Barto (2018, chương 9) trình bày hướng này.

::: exercise Bài tập 07.9 (Giải ngược khi hai chi phí thay đổi)
Đồ thị tầng có cùng cấu trúc với Mục 5: nút $\mathrm s$ ở tầng 0; $\mathrm A$, $\mathrm B$ ở tầng 1; $\mathrm C$, $\mathrm D$ ở tầng 2; $\mathrm t$ ở tầng 3. Chi phí cạnh: $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=3$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=0$, $g(\mathrm D,\mathrm t)=1$.

- (a) Tính $J_2(\mathrm C)$, $J_2(\mathrm D)$.
- (b) Tính $J_1(\mathrm A)$, $J_1(\mathrm B)$; ghi điều khiển đạt cực tiểu.
- (c) Tính $J_0(\mathrm s)$ và dựng đường tối ưu bằng lượt xuôi.
- (d) Kiểm trực tiếp tổng chi phí của đường tìm được và của ba đường còn lại.
- (e) Tính $\sum_k\sum_{\xi\in X_k}\lvert U_k(\xi)\rvert$ cho đồ thị này và so với số đường đi. Làm lại cho một đồ thị cùng dạng với $N=10$ giai đoạn: nút $\mathrm s$, chín tầng giữa mỗi tầng hai nút, nút $\mathrm t$, mỗi nút nối với mọi nút của tầng sau; so với $q^N$ khi $q=2$.

![Đồ thị bốn tầng: s ở tầng 0; A, B ở tầng 1; C, D ở tầng 2; t ở tầng 3. Tám chi phí cạnh: s–A 2, s–B 3, A–C 4, A–D 2, B–C 1, B–D 3, C–t 0, D–t 1. Hai cạnh s–B và C–t được tô màu vì chi phí đã đổi.](img/lec-07/dp-layered-graph-new-costs.svg)
:::

::: hint
Hai cạnh tô màu trên hình có chi phí khác với đồ thị của Mục 5, nơi $g(\mathrm s,\mathrm B)=5$ và $g(\mathrm C,\mathrm t)=3$. Bắt đầu từ tầng 2. Ở (e), dùng Mệnh đề 07.42(a) và đếm riêng tầng cuối, nơi mỗi nút chỉ có một cạnh tới $\mathrm t$.
:::

::: solution
**Câu (a).** $J_2(\mathrm C)=0+0=0$ và $J_2(\mathrm D)=1+0=1$.

**Câu (b).**

- $J_1(\mathrm A)=\min\{4+0,\ 2+1\}=3$, điều khiển đạt cực tiểu là $\mathrm D$.
- $J_1(\mathrm B)=\min\{1+0,\ 3+1\}=1$, điều khiển đạt cực tiểu là $\mathrm C$.

**Câu (c).** $J_0(\mathrm s)=\min\{2+3,\ 3+1\}=4$, điều khiển đạt cực tiểu là $\mathrm B$. Lượt xuôi cho đường $\mathrm s\to\mathrm B\to\mathrm C\to\mathrm t$.

**Câu (d).** Đường tìm được có chi phí $3+1+0=4$. Ba đường còn lại: $\mathrm s\to\mathrm A\to\mathrm C\to\mathrm t$ có $2+4+0=6$; $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ có $2+2+1=5$; $\mathrm s\to\mathrm B\to\mathrm D\to\mathrm t$ có $3+3+1=7$.

**Câu (e).** Tại $\mathrm s$, $\mathrm A$, $\mathrm B$ mỗi nút hai điều khiển, tại $\mathrm C$, $\mathrm D$ mỗi nút một: tổng $2+2+2+1+1=8$. Có $4$ đường đi; với đồ thị nhỏ này hai con số gần nhau. Với $N=10$:

- giai đoạn $0$: $2$ biểu thức;
- giai đoạn $1$ tới $8$: mỗi giai đoạn $2\cdot2=4$, cộng lại $32$;
- giai đoạn $9$: hai nút, mỗi nút một cạnh tới $\mathrm t$, cộng lại $2$.

Tổng $36$ biểu thức, trong khi số đường đi là $2^9=512$ và $q^N=2^{10}=1\,024$ là số chuỗi khi mọi giai đoạn đều có hai lựa chọn.

**Kiểm tra lại.** Đường tối ưu cũ $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ không còn tối ưu. Thay đổi ở cạnh $\mathrm C\to\mathrm t$ làm $J_1(\mathrm B)$ giảm từ $4$ xuống $1$ và, cùng chi phí $\mathrm s\to\mathrm B$ mới, đổi lựa chọn ở tầng đầu; $J_1(\mathrm A)$ vẫn bằng $3$ vì điều khiển tối ưu tại $\mathrm A$ vẫn là $\mathrm D$.
:::

**Chuỗi suy luận của mục.** Định nghĩa 07.40 và Thuật toán 07.2 ghép phương trình Bellman (Định lý 07.38) với một lượt dựng xuôi. Mệnh đề 07.41 chứng minh chuỗi thu được là tối ưu, và Mệnh đề 07.42 đếm chi phí; Nhận xét 07.43 nêu giới hạn của chi phí đó.

**Kết mục.** Mục đã cho một thuật toán đầy đủ (Thuật toán 07.2, Mệnh đề 07.41) với số phép tính tỉ lệ với số cặp trạng thái, điều khiển (Mệnh đề 07.42), dưới giả thiết trạng thái đủ, chi phí cộng và chuyển tiếp tất định. Mục sau áp dụng hai tuyến của chương vào bốn bài toán học máy, trong đó một bài vi phạm giả thiết trạng thái đủ.

## Tình huống áp dụng và ứng dụng

Bốn tình huống dưới đây giải trọn vẹn bằng công cụ của chương. Hai tình huống đầu dùng tuyến quy hoạch tuyến tính, hai tình huống sau dùng tuyến quy hoạch động; Tình huống 07.4 nêu một trường hợp giả thiết trạng thái đủ không thỏa.

::: application Tình huống 07.1 (Hồi quy $L_1$ cho thời gian huấn luyện có một số đo hỏng)
**Bài toán và dữ liệu.**

Một nhóm đo thời gian một lượt huấn luyện (epoch) theo cỡ tập dữ liệu. Năm số đo dưới đây là số liệu sư phạm.

| Mẫu $i$ | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---:|---:|---:|---:|---:|
| Cỡ dữ liệu $\nu_i$ (chục nghìn mẫu) | $0$ | $1$ | $2$ | $3$ | $4$ |
| Thời gian $y_i$ (phút) | $1$ | $2$ | $3$ | $4$ | $10$ |

Số đo thứ năm bị hỏng vì máy chủ bị chia sẻ lúc đo; theo xu hướng, giá trị đúng là $5$. Cần một đường thẳng dự đoán thời gian theo cỡ dữ liệu, không bị số đo hỏng kéo lệch.

**Mô hình hóa.** Đặc trưng $h_i=(1,\nu_i)$, tham số $x=(x_1,x_2)$ gồm hệ số chặn và hệ số góc, phần dư $r_i=x_1+x_2\nu_i-y_i$. Theo Hệ quả 07.4, bài cực tiểu $\sum_i|r_i|$ là quy hoạch tuyến tính (1.2) với $7$ biến và $10$ ràng buộc.

**Kiểm giả thiết.** Mệnh đề 07.25 cần các $h_i$ sinh $\mathbb R^2$: $h_1=(1,0)$ và $h_2=(1,1)$ độc lập. Mục tiêu không âm nên giá trị tối ưu hữu hạn.

**Áp dụng.** Theo Mệnh đề 07.25, có một nghiệm tối ưu đi qua hai điểm dữ liệu có đầu vào khác nhau, nên chỉ cần xét $\binom52=10$ đường qua hai điểm.

| Cặp mẫu | Đường qua hai điểm, $x=(x_1,x_2)$ | Phần dư $(r_1,\ldots,r_5)$ | $\sum_i\lvert r_i\rvert$ |
|---|---|---|---:|
| sáu cặp trong mẫu 1–4 | $(1,1)$ | $(0,0,0,0,-5)$ | $5$ |
| 1 và 5 | $(1,\tfrac94)$ | $(0,\tfrac54,\tfrac52,\tfrac{15}4,0)$ | $7{,}5$ |
| 2 và 5 | $(-\tfrac23,\tfrac83)$ | $(-\tfrac53,0,\tfrac53,\tfrac{10}3,0)$ | $\tfrac{20}3$ |
| 3 và 5 | $(-4,\tfrac72)$ | $(-5,-\tfrac52,0,\tfrac52,0)$ | $10$ |
| 4 và 5 | $(-14,6)$ | $(-15,-10,-5,0,0)$ | $30$ |

Giá trị tối ưu là $5$, đạt tại $x^*=(1,1)$.

**Chứng nhận và tính duy nhất.** Với véc-tơ $\sigma\in\mathbb R^5$, $\sigma=(-\tfrac12,0,\tfrac12,1,-1)$, mỗi $|\sigma_i|\le1$ nên $|r_i|\ge\sigma_ir_i$; hai tổng $\sum_i\sigma_i$ và $\sum_i\sigma_i\nu_i=0+0+1+3-4$ bằng $0$, nên $\sum_i\sigma_ih_i=0$. Với mọi $x$:

$$
\begin{aligned}
\sum_i|r_i|&\ge\sum_i\sigma_i\bigl(h_i^Tx-y_i\bigr)=-\sum_i\sigma_iy_i\\
&=-\bigl(-\tfrac12+0+\tfrac32+4-10\bigr)=5 .
\end{aligned}
$$

Dấu bằng cần $|r_i|=\sigma_ir_i$; với $i=1,2,3$, $|\sigma_i|<1$ buộc ba phần dư $r_1$, $r_2$, $r_3$ bằng $0$, nên $x_1=1$, $x_1+x_2=2$: nghiệm duy nhất $(1,1)$. Đây là chứng nhận của Mệnh đề 02.11, và $\sigma$ là một nghiệm đối ngẫu (Mệnh đề 03.11).

**So với bình phương nhỏ nhất.** Cùng dữ liệu cho $x=(0,2)$, phần dư $(-1,0,1,2,-2)$, tổng bình phương $10$. Tại $\nu=5$, đường $L_1$ dự đoán $6$ phút, đường bình phương nhỏ nhất dự đoán $10$ phút.

**Diễn giải.** Đường $L_1$ đi qua bốn số đo tốt và dồn sai lệch vào số đo hỏng; bình phương nhỏ nhất chia sai số cho mọi mẫu nên hệ số góc bị kéo từ $1$ lên $2$.

**Giới hạn.** Nghiệm $L_1$ có thể không duy nhất (Ví dụ 07.4), và khi nhiều số đo cùng hỏng theo một hướng, đường $L_1$ cũng bị kéo.

**Dẫn ngược lý thuyết.** Hệ quả 07.4; Mệnh đề 07.25, dựa trên Định lý 07.20, 07.23 (giả thiết các $h_i$ sinh $\mathbb R^2$ dùng ở bước kiểm); Mệnh đề 02.11.

**Kiểm tra lại.** Tại $x=(1,1)$ chỉ $r_5=-5$ khác $0$, nên $\sum_i\sigma_ir_i=(-1)(-5)=5$, bằng $\sum_i|r_i|$.
:::

::: application Tình huống 07.2 (Phân bổ giờ GPU giữa tinh chỉnh và sinh dữ liệu, có đỉnh suy biến)
**Bài toán và dữ liệu.**

Trong một tuần, một nhóm chia giờ GPU giữa $x_1$ giờ tinh chỉnh (fine-tuning) một mô hình phân loại và $x_2$ giờ sinh dữ liệu tổng hợp cho bộ đánh giá. Mỗi giờ tinh chỉnh đem $5$ đơn vị lợi ích, mỗi giờ sinh dữ liệu đem $4$ đơn vị (số liệu sư phạm). Ba giới hạn:

- tổng giờ GPU: $x_1+x_2\le100$;
- năng lượng, với $3$ kWh mỗi giờ tinh chỉnh, $1$ kWh mỗi giờ sinh dữ liệu và hạn mức $180$ kWh: $3x_1+x_2\le180$;
- năng lực kiểm duyệt dữ liệu sinh ra: $x_2\le60$.

**Mô hình hóa.** Dạng (1.1) với $c=(5,4)$, các hàng $(1,1)$, $(3,1)$, $(0,1)$ và $b=(100,180,60)$. Dạng chuẩn thêm biến phụ $s_1,s_2,s_3$; thứ tự biến $(x_1,x_2,s_1,s_2,s_3)$.

**Kiểm giả thiết.**

1. Lợi ích và tiêu hao tỉ lệ với số giờ (Nhận xét 07.3).
2. Có điểm cực: miền chứa $(0,0)$ và các hàng $-x_1\le0$, $-x_2\le0$ cho hạng $2$ (Định lý 07.20).
3. Giá trị hữu hạn: $x_1\le60$ (từ hàng năng lượng) và $x_2\le60$, nên $5x_1+4x_2\le540$.

**Đỉnh.** Theo Định lý 07.13, các đỉnh là $(0,0)$, $(60,0)$, $(0,60)$, $(40,60)$, với $z$ lần lượt $0$, $300$, $240$, $440$. Tại $(40,60)$ cả ba giới hạn cùng chặt: $40+60=100$, $120+60=180$, $60=60$; đó là một đỉnh suy biến.

**Thuật toán đi qua đỉnh kề.** Hai bước từ $(0,0)$:

- Bước 1, tại $(0,0)$ với cơ sở $\{s_1,s_2,s_3\}$: hướng $d^{x_1}=(1,0,-1,-3,0)$, $\bar c_{x_1}=5$; phép thử tỉ số $s_1$: $100$, $s_2$: $\tfrac{180}3=60$; điểm mới $(60,0)$, $z=300$, cơ sở $\{x_1,s_1,s_3\}$.
- Bước 2, tại $(60,0)$: hướng $d^{x_2}=(-\tfrac13,1,-\tfrac23,0,-1)$, $\bar c_{x_2}=\tfrac73$; phép thử tỉ số $s_1$: $\tfrac{40}{2/3}=60$, $s_3$: $60$, hòa nhau; điểm mới $(40,60)$, $z=440$, cả ba biến phụ bằng $0$.

**Kiểm dừng khi suy biến.** Tại $(40,60)$ chỉ có hai thành phần dương, ít hơn $m=3$, và ba tập $\{x_1,x_2,s_i\}$, $i=1,2,3$, đều là cơ sở của cùng điểm.

| Cơ sở | Lợi ích rút gọn của hai biến ngoài cơ sở | Mệnh đề 07.31(b) |
|---|---|---|
| $\{x_1,x_2,s_1\}$ | $\bar c_{s_2}=-\tfrac53$, $\bar c_{s_3}=-\tfrac73$ | tối ưu |
| $\{x_1,x_2,s_3\}$ | $\bar c_{s_1}=-\tfrac72$, $\bar c_{s_2}=-\tfrac12$ | tối ưu |
| $\{x_1,x_2,s_2\}$ | $\bar c_{s_1}=-5$, $\bar c_{s_3}=1$ | không kết luận |

Với cơ sở thứ ba, hướng $d^{s_3}=(1,-1,0,-2,1)$ có $\bar c_{s_3}=1>0$ nhưng giảm biến cơ sở $s_2$ đang bằng $0$, nên $\theta^*=0$: đổi cơ sở mà không di chuyển.

**Chứng nhận.** Từ cơ sở $\{x_1,x_2,s_3\}$, $\mu=(\tfrac72,\tfrac12,0)$, và với mọi phương án khả thi

$$
\begin{aligned}
5x_1+4x_2&=\tfrac72(x_1+x_2)+\tfrac12(3x_1+x_2)\\
&\le\tfrac72\cdot100+\tfrac12\cdot180=440 .
\end{aligned}
$$

Dấu bằng cần $x_1+x_2=100$ và $3x_1+x_2=180$, tức $(40,60)$: nghiệm duy nhất.

**Diễn giải.** Phân bổ tối ưu là $40$ giờ tinh chỉnh và $60$ giờ sinh dữ liệu; ba biến phụ bằng $0$, nên cả ba tài nguyên dùng hết. Theo đối ngẫu yếu (Mệnh đề 03.11), mọi bộ hệ số nhân không âm mà tổ hợp các hàng ràng buộc bằng $c$ cho một cận trên của giá trị tối ưu, bằng tổng hệ số nhân với vế phải. Vì đỉnh suy biến, bộ hệ số đó không duy nhất:

- $\mu=(\tfrac72,\tfrac12,0)$ từ cơ sở $\{x_1,x_2,s_3\}$ cho $\tfrac72\cdot100+\tfrac12\cdot180=440$;
- $\mu'=(0,\tfrac53,\tfrac73)$ từ cơ sở $\{x_1,x_2,s_1\}$, vì $5x_1+4x_2=\tfrac53(3x_1+x_2)+\tfrac73x_2$, cho $\tfrac53\cdot180+\tfrac73\cdot60=300+140=440$.

Giá bóng (shadow price) của một tài nguyên là mức thay đổi của $z^*$ khi vế phải của ràng buộc tương ứng tăng một đơn vị (Hệ quả 03.24 gọi nhân tử là giá bóng khi giá trị tối ưu khả vi theo vế phải). Hai bộ cho hai giá khác nhau cho một giờ GPU, $\tfrac72$ và $0$; tính lại trực tiếp cho kết quả:

- thêm một giờ GPU ($100\to101$): cận $\mu'$ không chứa vế phải $100$, nên $z^*$ vẫn là $440$ tại $(40,60)$;
- bớt một giờ GPU ($100\to99$): giao của $x_1+x_2=99$ với $3x_1+x_2=180$ là $(40{,}5;\,58{,}5)$, với $z=202{,}5+234=436{,}5$, giảm đúng $\mu_1=3{,}5$.

Như vậy tăng $b_1$ một đơn vị đổi $z^*$ một lượng $0$, giảm $b_1$ một đơn vị làm $z^*$ giảm $3{,}5$: ở đỉnh suy biến này, $z^*$ không khả vi theo $b_1$.

**Chẩn đoán khi mô hình sai.** Quên giới hạn giờ GPU và năng lượng: $x_1$ tăng mãi, kết cục không bị chặn (Định lý 07.26). Thêm yêu cầu $x_1\ge70$: năng lượng cần ít nhất $210>180$ kWh, kết cục không khả thi. Đổi lợi ích thành $c=(3,1)$, song song với hàng năng lượng: cả cạnh từ $(60,0)$ tới $(40,60)$ tối ưu với $z^*=180$.

**Giới hạn.** Lợi ích của tinh chỉnh thực tế bão hòa theo số giờ, nên giả thiết tỉ lệ chỉ đúng trong một khoảng.

**Dẫn ngược lý thuyết.** Nhận xét 07.3; Định lý 07.13, 07.20; Định nghĩa 07.30, Mệnh đề 07.31 (chiều ngược sai khi suy biến), Thuật toán 07.1; Định lý 07.26.

**Kiểm tra lại.** $5\cdot40+4\cdot60=440$; theo cơ sở $\{x_1,x_2,s_3\}$, $-\bar c_{s_1}=\tfrac72=\mu_1$ và $-\bar c_{s_2}=\tfrac12=\mu_2$.
:::

::: application Tình huống 07.3 (Giải mã Viterbi cho gán nhãn từ loại)
**Bài toán và dữ liệu.**

Gán nhãn từ loại cho câu ba từ "dữ liệu huấn luyện mô hình" với hai nhãn: danh từ $\mathrm{NN}$ và động từ $\mathrm{VB}$ (tên nhãn theo bộ nhãn Penn Treebank). Một mô hình Markov ẩn bậc nhất cho xác suất của chuỗi nhãn và chuỗi từ là tích các xác suất bắt đầu, chuyển nhãn, phát xạ từ và kết thúc. Mọi xác suất chọn là lũy thừa của $\tfrac12$ (số liệu sư phạm), nên chi phí $-\log_2$ của chúng là số nguyên, tính bằng bit:

| Thành phần | Giá trị $-\log_2$ (bit) |
|---|---|
| bắt đầu bằng $\mathrm{NN}$ hoặc $\mathrm{VB}$ | $1$, $1$ |
| chuyển $\mathrm{NN}\to\mathrm{NN}$, $\mathrm{NN}\to\mathrm{VB}$, $\mathrm{VB}\to\mathrm{NN}$, $\mathrm{VB}\to\mathrm{VB}$ | $2$, $1$, $1$, $2$ |
| kết thúc sau $\mathrm{NN}$ hoặc $\mathrm{VB}$ | $2$, $2$ |
| "dữ liệu" khi nhãn $\mathrm{NN}$, $\mathrm{VB}$ | $3$, $6$ |
| "huấn luyện" khi nhãn $\mathrm{NN}$, $\mathrm{VB}$ | $4$, $3$ |
| "mô hình" khi nhãn $\mathrm{NN}$, $\mathrm{VB}$ | $3$, $7$ |

Cần chuỗi nhãn có xác suất lớn nhất, tức tổng chi phí nhỏ nhất.

**Mô hình hóa theo Định nghĩa 07.35.**

- $N=3$; $X_0=\{\mathrm o\}$ với $\mathrm o$ là trạng thái bắt đầu; $X_k=\{\mathrm{NN},\mathrm{VB}\}$ là nhãn của từ thứ $k$, $k=1,2,3$.
- Điều khiển ở giai đoạn $k$ là nhãn của từ thứ $k+1$; $f_k(\xi,u)=u$.
- $g_0(\mathrm o,u)$ là chi phí bắt đầu cộng phát xạ từ thứ nhất; $g_k(\xi,u)$, $k=1,2$, là chi phí chuyển $\xi\to u$ cộng phát xạ từ thứ $k+1$; $g_3(\xi)$ là chi phí kết thúc.

**Kiểm giả thiết.**

1. Hữu hạn, tất định: nhãn chọn xác định trạng thái kế.
2. Chi phí cộng: $-\log_2$ của một tích là tổng các $-\log_2$.
3. Trạng thái đủ: trong mô hình bậc nhất, xác suất chuyển chỉ phụ thuộc nhãn trước.

**Áp dụng Thuật toán 07.2.**

- $J_3(\mathrm{NN})=J_3(\mathrm{VB})=2$.
- $J_2(\mathrm{NN})=\min\{2+3+2,\ 1+7+2\}=7$, chọn $\mathrm{NN}$.
- $J_2(\mathrm{VB})=\min\{1+3+2,\ 2+7+2\}=6$, chọn $\mathrm{NN}$.
- $J_1(\mathrm{NN})=\min\{2+4+7,\ 1+3+6\}=10$, chọn $\mathrm{VB}$.
- $J_1(\mathrm{VB})=\min\{1+4+7,\ 2+3+6\}=11$, chọn $\mathrm{VB}$.
- $J_0(\mathrm o)=\min\{1+3+10,\ 1+6+11\}=14$, chọn $\mathrm{NN}$.

Lượt xuôi: $\mathrm{NN}$, rồi $u_1^*(\mathrm{NN})=\mathrm{VB}$, rồi $u_2^*(\mathrm{VB})=\mathrm{NN}$. Chuỗi nhãn tối ưu là $\mathrm{NN}\ \mathrm{VB}\ \mathrm{NN}$ với chi phí $14$ bit, tức xác suất đồng thời $2^{-14}$.

**Diễn giải.** Từ "huấn luyện" nhận nhãn động từ. Lựa chọn tại từ thứ hai so sánh $1+3+J_2(\mathrm{VB})$ với $2+4+J_2(\mathrm{NN})$, tức gồm cả phần câu còn lại, không chỉ chi phí phát xạ.

**Giới hạn.** Với câu dài $30$ từ và $40$ nhãn, giải ngược cần cỡ $30\cdot40^2=48\,000$ biểu thức (Mệnh đề 07.42) thay cho $40^{30}$ chuỗi. Bảo đảm chỉ đúng khi mô hình bậc nhất mô tả đúng ngôn ngữ; Tình huống 07.4 xét trường hợp không đúng.

**Dẫn ngược lý thuyết.** Định nghĩa 07.35; Định lý 07.38 (bước kiểm 2 dùng cho chi phí cộng, bước kiểm 3 cho trạng thái đủ); Mệnh đề 07.41.

**Kiểm tra lại.** Liệt kê tám chuỗi:

| Chuỗi nhãn | Chi phí (bit) |
|---|---:|
| $\mathrm{NN\,VB\,NN}$ | $1+3+1+3+1+3+2=14$ |
| $\mathrm{NN\,NN\,NN}$ | $17$ |
| $\mathrm{VB\,VB\,NN}$ | $18$ |
| $\mathrm{NN\,VB\,VB}$ | $19$ |
| $\mathrm{VB\,NN\,NN}$ | $19$ |
| $\mathrm{NN\,NN\,VB}$ | $20$ |
| $\mathrm{VB\,NN\,VB}$ | $22$ |
| $\mathrm{VB\,VB\,VB}$ | $23$ |

Nhỏ nhất là $14$.
:::

::: application Tình huống 07.4 (Khi chi phí phụ thuộc hai nhãn trước: trạng thái không đủ)
**Bài toán và dữ liệu.**

Cùng câu "dữ liệu huấn luyện mô hình", hai nhãn $\mathrm{NN}$, $\mathrm{VB}$ và cùng bảng chi phí của Tình huống 07.3, chép lại dưới đây (bit):

| Thành phần | Giá trị $-\log_2$ (bit) |
|---|---|
| bắt đầu bằng $\mathrm{NN}$ hoặc $\mathrm{VB}$ | $1$, $1$ |
| chuyển $\mathrm{NN}\to\mathrm{NN}$, $\mathrm{NN}\to\mathrm{VB}$, $\mathrm{VB}\to\mathrm{NN}$, $\mathrm{VB}\to\mathrm{VB}$ | $2$, $1$, $1$, $2$ |
| kết thúc sau $\mathrm{NN}$ hoặc $\mathrm{VB}$ | $2$, $2$ |
| "dữ liệu" khi nhãn $\mathrm{NN}$, $\mathrm{VB}$ | $3$, $6$ |
| "huấn luyện" khi nhãn $\mathrm{NN}$, $\mathrm{VB}$ | $4$, $3$ |
| "mô hình" khi nhãn $\mathrm{NN}$, $\mathrm{VB}$ | $3$, $7$ |
| hiệu chỉnh bậc hai (trigram): nhãn $\mathrm{NN}$ ngay sau cặp $\mathrm{NN}\ \mathrm{VB}$ | thêm $4$ |

**Giả thiết bị vi phạm.**

Trong khung của Tình huống 07.3, trạng thái ở giai đoạn $2$ là nhãn của từ thứ hai. Chi phí chọn nhãn từ thứ ba giờ phụ thuộc cả nhãn từ thứ nhất, nên không còn là hàm của $(\xi,u)$. Hai lịch sử $\mathrm{NN\,VB}$ và $\mathrm{VB\,VB}$ cùng đi tới trạng thái $\mathrm{VB}$ nhưng có phần tương lai khác nhau:

- sau $\mathrm{NN\,VB}$: $\min\{1+3+2+4,\ 2+7+2\}=\min\{10,11\}=10$;
- sau $\mathrm{VB\,VB}$: $\min\{1+3+2,\ 2+7+2\}=\min\{6,11\}=6$.

Đại lượng "$J_2(\mathrm{VB})$" không xác định được: giả thiết trạng thái đủ của Định lý 07.38 bị vi phạm.

**Hậu quả quan sát được.**

Bỏ qua hiệu chỉnh và chạy Thuật toán 07.2 như Tình huống 07.3 cho $\mathrm{NN\,VB\,NN}$. Chi phí thật của chuỗi này là $14+4=18$ bit. Liệt kê tám chuỗi với hiệu chỉnh cho nghiệm thật là $\mathrm{NN\,NN\,NN}$ với $17$ bit; chuỗi trả về sai nhãn từ thứ hai.

**Sửa bằng mở rộng trạng thái.**

Theo Nhận xét 07.36, đặt trạng thái ở giai đoạn $k\ge2$ là cặp (nhãn từ $k-1$, nhãn từ $k$). Tập $X_2$ và $X_3$ có bốn cặp; $X_1=\{\mathrm{NN},\mathrm{VB}\}$; chuyển trạng thái ghép nhãn hiện tại với nhãn vừa chọn, rồi bỏ nhãn cũ nhất khi cặp đã có hai nhãn. Chi phí giai đoạn $2$ cộng thêm $4$ khi ba nhãn liên tiếp là $\mathrm{NN}$, $\mathrm{VB}$, $\mathrm{NN}$. Chi phí cuối chỉ phụ thuộc nhãn cuối, bằng $2$.

- $J_2(\mathrm{NN},\mathrm{NN})=\min\{2+3+2,\ 1+7+2\}=7$; $J_2(\mathrm{VB},\mathrm{NN})=7$.
- $J_2(\mathrm{NN},\mathrm{VB})=\min\{1+3+2+4,\ 2+7+2\}=10$; $J_2(\mathrm{VB},\mathrm{VB})=\min\{6,11\}=6$.
- $J_1(\mathrm{NN})=\min\{2+4+7,\ 1+3+10\}=13$, chọn $\mathrm{NN}$; hai số $7$, $10$ là $J_2(\mathrm{NN},\mathrm{NN})$ và $J_2(\mathrm{NN},\mathrm{VB})$.
- $J_1(\mathrm{VB})=\min\{1+4+7,\ 2+3+6\}=11$, chọn $\mathrm{VB}$; hai số $7$, $6$ là $J_2(\mathrm{VB},\mathrm{NN})$ và $J_2(\mathrm{VB},\mathrm{VB})$.
- $J_0(\mathrm o)=\min\{1+3+13,\ 1+6+11\}=17$, chọn $\mathrm{NN}$.

Lượt xuôi: $\mathrm{NN}$, $\mathrm{NN}$, rồi từ $(\mathrm{NN},\mathrm{NN})$ chọn $\mathrm{NN}$; chuỗi $\mathrm{NN\,NN\,NN}$ với $17$ bit, khớp liệt kê.

**Cái giá.** Số biểu thức tăng từ $2+2\cdot2+2\cdot2=10$ lên $2+2\cdot2+4\cdot2=14$. Với $40$ nhãn, trạng thái cặp có $40^2=1\,600$ phần tử và mỗi giai đoạn cần cỡ $40^3=64\,000$ biểu thức, so với $1\,600$ của mô hình bậc nhất.

**Diễn giải.** Lỗi nằm ở cách chọn trạng thái: phương trình Bellman vẫn đúng cho mô hình có trạng thái đủ. Khi chi phí phụ thuộc vào lịch sử dài hơn trạng thái đang giữ, cách sửa là mở rộng trạng thái, hoặc chấp nhận một lời giải xấp xỉ.

**Dẫn ngược lý thuyết.** Định nghĩa 07.35 (giả thiết trạng thái đủ bị vi phạm ở bước đầu); Nhận xét 07.36 (mở rộng trạng thái); Định lý 07.38 và Mệnh đề 07.41 áp dụng lại cho mô hình đã mở rộng; Mệnh đề 07.42 cho cái giá.

**Kiểm tra lại.** $\mathrm{NN\,NN\,NN}$: $1+3+2+4+2+3+2=17$; $\mathrm{NN\,VB\,NN}$ với hiệu chỉnh: $1+3+1+3+1+3+2+4=18$.
:::

**Ứng dụng.** Các khái niệm của chương xuất hiện trong học máy ở những chỗ sau.

- **Hồi quy bền vững và hồi quy phân vị.** Hồi quy $L_1$ (Hệ quả 07.4) và hồi quy phân vị của Koenker và Bassett (1978) là quy hoạch tuyến tính; Mệnh đề 07.25 cho tính chất nội suy của nghiệm đỉnh.
- **Phân bổ tài nguyên tính toán.** Chia giờ GPU, bộ nhớ hay băng thông với lợi ích tuyến tính là quy hoạch tuyến tính (Tình huống 07.2); biến phụ chỉ ra nút thắt.
- **Vận chuyển tối ưu rời rạc.** Bài toán vận chuyển giữa hai phân phối rời rạc là quy hoạch tuyến tính dạng chuẩn với ràng buộc tổng theo hàng và theo cột, trong đó một phương trình phụ thuộc các phương trình còn lại (Nhận xét 07.9). Theo Hệ quả 07.16, một kế hoạch vận chuyển ở đỉnh có số ô khác $0$ không vượt hạng của hệ; Peyré và Cuturi (2019, chương 3) trình bày bài toán này.
- **Giải mã chuỗi.** Thuật toán Viterbi (Tình huống 07.3) và khoảng cách sửa là Thuật toán 07.2 trên đồ thị tầng, với trạng thái là nhãn hoặc vị trí và chi phí cộng theo giai đoạn.
- **Học tăng cường.** Phương trình Bellman (Định lý 07.38) với kỳ vọng và chân trời vô hạn là nền của lặp giá trị và học Q (Q-learning); Sutton và Barto (2018, chương 3–4, 6) trình bày hai phương pháp này.

## Tóm tắt chương

**Định nghĩa và thuật toán.** Quy hoạch tuyến tính (Định nghĩa 07.1); đa diện (Định nghĩa 07.5); dạng chuẩn (Định nghĩa 07.7); nghiệm cơ sở khả thi (Định nghĩa 07.10); điểm cực, ràng buộc chặt, tập chứa đường thẳng (Định nghĩa 07.11, 07.12, 07.18); điểm cực kề, hướng cơ sở, lợi ích rút gọn (Định nghĩa 07.28, 07.30); bài toán quyết định hữu hạn tất định, chi phí tối ưu còn lại, chính sách (Định nghĩa 07.35, 07.37, 07.40); Thuật toán 07.1, 07.2.

**Kết quả chính.**

- Mệnh đề 07.2: điểm trong không tối ưu khi $c\ne0$; Hệ quả 07.4: hồi quy $L_1$ là quy hoạch tuyến tính.
- Mệnh đề 07.6, 07.8: đa diện lồi; mọi quy hoạch tuyến tính đưa được về dạng chuẩn, giữ giá trị tối ưu.
- Định lý 07.13, 07.15, Hệ quả 07.14, 07.16: điểm cực ⇔ $n$ ràng buộc chặt độc lập ⇔ nghiệm cơ sở khả thi; hữu hạn điểm cực, nhiều nhất $m$ thành phần dương.
- Định lý 07.20, Hệ quả 07.21: có điểm cực ⇔ không chứa đường thẳng ⇔ $\operatorname{rank}(A)=n$; dạng chuẩn khả thi luôn có điểm cực.
- Định lý 07.23, Hệ quả 07.24, Mệnh đề 07.25: miền có điểm cực thì hoặc không bị chặn, hoặc có điểm cực tối ưu; nghiệm đỉnh của hồi quy $L_1$ nội suy ít nhất $n$ mẫu.
- Định lý 07.26: bốn kết cục; giá trị hữu hạn luôn được đạt.
- Mệnh đề 07.29, 07.31, Bổ đề 07.32, Mệnh đề 07.33: hai cơ sở khác một chỉ số cho đỉnh kề; lợi ích rút gọn không dương thì tối ưu; điểm cực chưa tối ưu có đỉnh kề tốt hơn; thuật toán dừng tại điểm cực tối ưu.
- Định lý 07.38, Mệnh đề 07.39, 07.41, 07.42: phương trình Bellman, nguyên lý tối ưu, chính sách đạt cực tiểu cho chuỗi tối ưu, số phép tính $\sum_k\sum_\xi\lvert U_k(\xi)\rvert$.

**Công thức cần nhớ.** Dạng chuẩn và nghiệm cơ sở:

$$
\max c^Tx,\quad Ax=b,\ x\ge0;\qquad x_B=A_B^{-1}b,\ x_{B^{\mathrm c}}=0 .
$$

Hướng cơ sở, lợi ích rút gọn và phép thử tỉ số:

$$
d^j_B=-A_B^{-1}A_j,\qquad\bar c_j=c_j-c_B^TA_B^{-1}A_j,\qquad\theta^*=\min_{j'\in B,\ d^j_{j'}<0}\frac{x_{j'}}{-d^j_{j'}}.
$$

Phương trình Bellman:

$$
J_N=g_N,\qquad J_k(\xi)=\min_{u\in U_k(\xi)}\bigl\{g_k(\xi,u)+J_{k+1}\bigl(f_k(\xi,u)\bigr)\bigr\}.
$$

**Giả thiết hay bị bỏ quên.**

- Mô hình tuyến tính cần tỉ lệ, cộng tính và chia được; biến nguyên đưa bài ra khỏi quy hoạch tuyến tính.
- Nghiệm cơ sở cần $A_B$ khả nghịch và, để khả thi, $A_B^{-1}b\ge0$; hạng $m$ không bảo đảm mọi tập $m$ cột là cơ sở.
- "Có điểm cực tối ưu" cần miền có điểm cực và giá trị tối ưu hữu hạn; không phải mọi nghiệm tối ưu là điểm cực.
- Lợi ích rút gọn có một số dương chưa chứng minh điểm chưa tối ưu khi nghiệm cơ sở suy biến.
- Phương trình Bellman cần trạng thái đủ, chi phí cộng, chuyển tiếp tất định và tập hữu hạn.

**Chuỗi suy luận của toàn chương.** Định nghĩa 07.1 và Hệ quả 07.4 đưa bài toán về quy hoạch tuyến tính; Mệnh đề 07.8 đưa nó về dạng chuẩn. Định nghĩa 07.11, Định lý 07.13 và Định lý 07.15 cho tập ứng viên hữu hạn; Định lý 07.20 cho điều kiện tồn tại.

Định lý 07.23 là kết quả đích: có điểm cực tối ưu. Định lý 07.26 phân loại mọi bài toán, và Bổ đề 07.32 cùng Thuật toán 07.1 biến kết quả đích thành một tìm kiếm cục bộ. Tuyến thứ hai đi từ Định nghĩa 07.35 qua Định lý 07.38 tới Thuật toán 07.2 và Mệnh đề 07.41.

![Sơ đồ phân nhánh với tiêu đề "Chọn theo cấu trúc quyết định". Nút trên cùng hỏi "Quyết định có cấu trúc nào?", ghi "Kiểm giả thiết trước khi chọn công cụ". Nhánh trái "một lần, tuyến tính" dẫn tới ô "Quy hoạch tuyến tính": một véc-tơ quyết định; mục tiêu và ràng buộc tuyến tính; đa diện, cơ sở, điểm cực. Nhánh phải "theo giai đoạn" dẫn tới ô "Quy hoạch động": chuỗi quyết định hữu hạn; trạng thái đủ và chi phí cộng; Bellman, giải ngược, chính sách. Dòng chú thích: biến nguyên hoặc chuyển ngẫu nhiên nằm ngoài phạm vi hai khuôn đang xét.](img/lec-07/lp-dp-decision-map.svg)

Sơ đồ tóm tắt cách chọn giữa hai tuyến. Câu hỏi ở nút trên cùng là về cấu trúc của quyết định: một véc-tơ chọn một lần với quan hệ tuyến tính dẫn sang quy hoạch tuyến tính, một chuỗi quyết định có trạng thái đủ dẫn sang quy hoạch động. Dòng chú thích dưới cùng ghi hai trường hợp nằm ngoài cả hai khuôn của chương.

**Giới hạn còn lại.** Chương nâng các công cụ của Bài 02 và Bài 03 cho quy hoạch tuyến tính từ chứng nhận một ứng viên lên tìm ứng viên trong một tập hữu hạn, và thêm một cấu trúc khác với bước cục bộ của Bài 04–06 cho bài toán theo giai đoạn. Ba giới hạn còn lại:

- thuật toán đi qua đỉnh kề chưa phải phương pháp đơn hình đầy đủ; phương pháp đơn hình, với điểm xuất phát, quy tắc chọn và chống quay vòng, là nội dung Buổi 8 (Chương 11) của đề cương học phần;
- khi biến buộc nguyên, Định lý 07.23 không còn cho nghiệm, và cần quy hoạch nguyên, nội dung Buổi 10 (Chương 13) của đề cương;
- khi chuyển tiếp ngẫu nhiên hoặc số giai đoạn vô hạn, phương trình Bellman cần kỳ vọng và thành phương trình điểm bất động, nền của học tăng cường.

Trong bộ học liệu này, Bài 07 là bài cuối hiện có; các hướng trên được dẫn tới nguồn ở mục cuối.

## Bài tập củng cố

Mỗi mức có ít nhất một bài. Bài 07 không có tệp bài tập riêng, nên các bài trong mục và ba bài dưới đây là bộ bài tập của chương; mọi mục tiêu học tập có ít nhất một bài.

### Mức nhận biết

::: exercise Bài tập 07.10 (Nhận biết: đúng hay sai)
Xác định đúng hay sai; giải thích bằng một kết quả có số hiệu hoặc một phản ví dụ.

1. Bài cực đại $2x_1+3x_2$ dưới $x_1+2x_2\le54$, $x_1,x_2\ge0$, $x_1$ nguyên là một quy hoạch tuyến tính.
2. Mọi nghiệm cơ sở của một hệ dạng chuẩn đều khả thi.
3. Nếu một quy hoạch tuyến tính có hai nghiệm tối ưu thì nó có vô số nghiệm tối ưu.
4. Mọi đa diện khác rỗng đều có ít nhất một điểm cực.
5. Một quy hoạch tuyến tính khả thi có giá trị tối ưu hữu hạn luôn đạt giá trị đó tại một điểm khả thi.
6. Trong bài toán quyết định hữu hạn tất định, $J_k(\xi)$ là chi phí của điều khiển rẻ nhất tại $\xi$.
:::

::: hint
Câu 2 dùng Ví dụ 07.8; câu 4 dùng nửa mặt phẳng; câu 6 so (5.2) với chi phí một giai đoạn.
:::

::: solution
1. Sai. Điều kiện nguyên làm miền rời rạc; bài toán là quy hoạch nguyên (Định nghĩa 07.1 và đoạn sau nó).
2. Sai. Với hệ $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$ của bài hộp hạt, cơ sở $\{x_1,x_2,s_3\}$ có ma trận khả nghịch và cho $x_1=30$, $x_2=20$, $s_3=54-70=-16$, một giá trị âm (Ví dụ 07.8).
3. Đúng, theo Mệnh đề 07.22(b): cả đoạn nối hai nghiệm là tối ưu.
4. Sai. Nửa mặt phẳng $\{x_2\ge0\}$ chứa đường thẳng nằm ngang và không có điểm cực (Định lý 07.20).
5. Đúng, theo Định lý 07.26; đây là điểm khác với bài lồi tổng quát (Nhận xét 07.27).
6. Sai. $J_k(\xi)$ là tổng chi phí tối ưu của mọi giai đoạn còn lại. Trên đồ thị tầng với $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$, Ví dụ 07.21 cho $J_0(\mathrm s)=5$, trong khi cạnh rẻ nhất ra khỏi $\mathrm s$ có chi phí $2$.

**Kiểm tra lại.** Câu 3: trong Ví dụ 07.14, ngoài hai đỉnh $(2,0)$, $(0,2)$, mọi điểm $(\lambda\cdot2,(1-\lambda)\cdot2)$ với $\lambda\in(0,1)$ cũng tối ưu.
:::

### Mức tính toán hoặc chứng minh

::: exercise Bài tập 07.11 (Quy hoạch tuyến tính trên đơn hình xác suất)
Cho $P=\{p\in\mathbb R^3\mid p_1+p_2+p_3=1,\ p\ge0\}$ và bài cực đại $c^Tp$ trên $P$ với $c\in\mathbb R^3$.

- (a) Viết $P$ ở dạng chuẩn, nêu $m$, $n$; liệt kê mọi nghiệm cơ sở khả thi.
- (b) Chứng minh bằng Định lý 07.15 rằng $(\tfrac12,\tfrac12,0)$ không phải điểm cực.
- (c) Chứng minh $z^*=\max_jc_j$ bằng Hệ quả 07.24.
- (d) Với $c=(1,1,0)$, xác định kết cục và tập nghiệm tối ưu.
- (e) Chứng minh trực tiếp, không dùng Định lý 07.15, rằng $(1,0,0)$ là điểm cực của $P$; chỉ ra chỗ lập luận dùng tính độc lập của cột ứng với thành phần dương, tức chiều (iii) kéo theo (i) của định lý.
:::

::: hint
Ma trận ràng buộc là hàng $(1,1,1)$, nên $m=1$ và mỗi cơ sở gồm một cột.
:::

::: solution
**Câu (a).** $A=(1,1,1)$, $b=1$, $m=1$, $n=3$, $\operatorname{rank}(A)=1$. Mỗi cơ sở là một chỉ số $j$, với $A_B=(1)$ khả nghịch và $p_j=1$, hai thành phần còn lại bằng $0$. Ba nghiệm cơ sở khả thi là $(1,0,0)$, $(0,1,0)$, $(0,0,1)$, không suy biến.

**Câu (b).** $\operatorname{supp}(p)=\{1,2\}$ và hai cột $(1)$, $(1)$ của $A$ phụ thuộc tuyến tính, nên theo khẳng định (iii) của Định lý 07.15, điểm không phải điểm cực. Trực tiếp: $(\tfrac12,\tfrac12,0)=\tfrac12(1,0,0)+\tfrac12(0,1,0)$.

**Câu (c).** $P$ khác rỗng, bị chặn ($0\le p_j\le1$), dạng chuẩn nên có điểm cực (Hệ quả 07.21), và $c^Tp\le\sum_j\lvert c_j\rvert$ nên giá trị hữu hạn. Theo Hệ quả 07.24, $z^*$ là giá trị lớn nhất của $c^Tp$ trên ba nghiệm cơ sở khả thi, tức $\max\{c_1,c_2,c_3\}$.

**Câu (d).** $z^*=1$, đạt tại $(1,0,0)$ và $(0,1,0)$; theo Mệnh đề 07.22, tập nghiệm tối ưu là đoạn $\{(\lambda,1-\lambda,0)\mid\lambda\in[0,1]\}$: kết cục nhiều nghiệm tối ưu.

**Câu (e).** Giả sử $(1,0,0)=\lambda p'+(1-\lambda)p''$ với $p',p''\in P$ và $0<\lambda<1$.

- Thành phần thứ hai: $0=\lambda p_2'+(1-\lambda)p_2''$ với $p_2',p_2''\ge0$ và hai hệ số dương, nên $p_2'=p_2''=0$; tương tự $p_3'=p_3''=0$.
- Hiệu $p'-p''$ chỉ có thể khác $0$ ở thành phần thứ nhất, và $A(p'-p'')=0$ cho $1\cdot(p_1'-p_1'')=0$. Cột $A_1=(1)$ khác $0$, tức họ cột trên $\operatorname{supp}=\{1\}$ độc lập, nên $p_1'=p_1''$.

Vậy $p'=p''=(1,0,0)$, và điểm là điểm cực. Bước thứ hai là Bước 1 của chứng minh Định lý 07.15 với $m=1$.

**Kiểm tra lại.** Tại $(\tfrac12,\tfrac12,0)$ với $c=(1,1,0)$: $c^Tp=1=z^*$, một nghiệm tối ưu không phải điểm cực. Trong học máy, câu (c) nói rằng cực đại một lợi ích kỳ vọng tuyến tính trên các phân phối xác suất đạt được tại một phân phối dồn toàn bộ khối lượng vào một lựa chọn.
:::

### Mức vận dụng vào AI

::: exercise Bài tập 07.12 (Chọn mô hình cho một tổ hợp dưới giới hạn bộ nhớ)
Một hệ thống chọn một số trong bốn mô hình để chạy song song trên một thiết bị có $8$ GB bộ nhớ. Mô hình $j$ chiếm $\omega_j$ GB và đem lợi ích $\kappa_j$ về độ chính xác của tổ hợp (số liệu sư phạm, giả thiết lợi ích cộng):

| Mô hình $j$ | $1$ | $2$ | $3$ | $4$ |
|---|---:|---:|---:|---:|
| Bộ nhớ $\omega_j$ (GB) | $3$ | $4$ | $2$ | $3$ |
| Lợi ích $\kappa_j$ | $5$ | $6$ | $3$ | $4$ |

- (a) Mô hình hóa thành bài toán quyết định hữu hạn tất định theo Định nghĩa 07.35, với giai đoạn $k$ là quyết định chọn hay bỏ mô hình $k+1$ và trạng thái là bộ nhớ còn lại. Viết dưới dạng cực tiểu chi phí bằng cách đặt chi phí là trừ lợi ích.
- (b) Giải bằng phương trình Bellman; nêu tập mô hình được chọn và lợi ích.
- (c) Bỏ điều kiện chọn hay bỏ trọn một mô hình, cho phép chọn một phần $x_j\in[0,1]$. Giải quy hoạch tuyến tính thu được bằng cách xếp mô hình theo lợi ích trên mỗi GB, và so với (b).
- (d) Giả sử mô hình 3 và mô hình 4 dùng chung một bộ đặc trưng, nên khi chọn cả hai, lợi ích của tổ hợp giảm $2$. Kiểm xem bộ nhớ còn lại có còn là trạng thái đủ không; nếu không, mở rộng trạng thái và giải lại.
:::

::: hint
Ở (b), giá trị ở giai đoạn cuối chỉ phụ thuộc bộ nhớ còn lại $\xi\in\{0,\ldots,8\}$. Ở (c), một nghiệm đỉnh của quy hoạch tuyến tính có nhiều nhất một thành phần phân số, vì chỉ có một ràng buộc bộ nhớ. Ở (d), xét chi phí của quyết định về mô hình 4: nó có phụ thuộc quyết định về mô hình 3 không.
:::

::: solution
**Câu (a).** $N=4$; $X_k=\{0,1,\ldots,8\}$ là bộ nhớ còn lại trước quyết định về mô hình $k+1$, $X_0=\{8\}$. Điều khiển $u\in\{0,1\}$ (bỏ, chọn), với $u=1$ chỉ cho phép khi $\omega_{k+1}\le\xi$. Chuyển $f_k(\xi,u)=\xi-u\omega_{k+1}$; chi phí $g_k(\xi,u)=-u\kappa_{k+1}$; $g_4=0$. Bốn giả thiết của Định nghĩa 07.35 thỏa:

- hữu hạn: bốn giai đoạn, chín mức bộ nhớ, hai điều khiển;
- tất định: bộ nhớ còn lại sau quyết định được xác định bởi $\xi-u\omega_{k+1}$;
- chi phí cộng: lợi ích của tổ hợp là tổng lợi ích các mô hình được chọn;
- trạng thái đủ: các quyết định sau chỉ cần biết bộ nhớ còn lại.

**Câu (b).** Viết $\Lambda_k(\xi)=-J_k(\xi)$ là lợi ích tối ưu còn lại; (5.3) thành $\Lambda_k(\xi)=\max\{\Lambda_{k+1}(\xi),\ \kappa_{k+1}+\Lambda_{k+1}(\xi-\omega_{k+1})\}$, vế thứ hai chỉ khi $\omega_{k+1}\le\xi$.

| $\xi$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| $\Lambda_3(\xi)$, chỉ mô hình 4 | $0$ | $0$ | $0$ | $4$ | $4$ | $4$ | $4$ | $4$ | $4$ |
| $\Lambda_2(\xi)$, thêm mô hình 3 | $0$ | $0$ | $3$ | $4$ | $4$ | $7$ | $7$ | $7$ | $7$ |
| $\Lambda_1(\xi)$, thêm mô hình 2 | $0$ | $0$ | $3$ | $4$ | $6$ | $7$ | $9$ | $10$ | $10$ |

Chẳng hạn $\Lambda_1(8)=\max\{\Lambda_2(8),\ 6+\Lambda_2(4)\}=\max\{7,\ 10\}$, tức $10$. Ở giai đoạn đầu, $\Lambda_0(8)=\max\{\Lambda_1(8),\ 5+\Lambda_1(5)\}=\max\{10,\ 12\}$, tức $12$, chọn mô hình 1.

Lượt xuôi: chọn mô hình 1 (còn $5$ GB); $\Lambda_1(5)=7=\Lambda_2(5)$ nên bỏ mô hình 2; $\Lambda_2(5)=\max\{\Lambda_3(5),\ 3+\Lambda_3(3)\}=\max\{4,\ 3+4\}$ nên chọn mô hình 3 (còn $3$ GB); chọn mô hình 4. Tập $\{1,3,4\}$, dùng $8$ GB, lợi ích $12$.

**Câu (c).** Lợi ích trên mỗi GB: $\tfrac53\approx1{,}67$, $1{,}5$, $1{,}5$, $\tfrac43\approx1{,}33$. Lấy trọn mô hình 1 ($3$ GB) và mô hình 2 ($4$ GB), còn $1$ GB cho nửa mô hình 3: $x=(1,1,\tfrac12,0)$, lợi ích $5+6+1{,}5=12{,}5$. Đây là một nghiệm của quy hoạch tuyến tính, và cận trên đến từ các hệ số nhân không âm:

- $\pi_0=1{,}5$ cho ràng buộc bộ nhớ;
- $\pi_j=\max(\kappa_j-1{,}5\,\omega_j,0)$ cho ràng buộc $x_j\le1$, tức $\pi=(0{,}5;\,0;\,0;\,0)$;
- cận trên $1{,}5\cdot8+0{,}5=12{,}5$ đạt được.

Nghiệm này không duy nhất: mô hình 2 và 3 cùng tỉ số $1{,}5$, nên mọi cách lấp $5$ GB còn lại bằng $4x_2+2x_3=5$ với $x_2,x_3\in[0,1]$, chẳng hạn $x=(1;\,0{,}75;\,1;\,0)$, cũng cho $12{,}5$.

So với (b): quy hoạch tuyến tính cho cận trên $12{,}5$ của bài có lựa chọn trọn vẹn và một nghiệm phân số không dùng được. Làm tròn $x_3$ xuống cho $\{1,2\}$ với lợi ích $11<12$. Khoảng cách này là lý do quy hoạch nguyên cần công cụ riêng.

**Câu (d).** Chi phí của quyết định về mô hình 4 bây giờ là $-4$ nếu mô hình 3 chưa được chọn và $-2$ nếu đã chọn. Hai lịch sử cùng còn $3$ GB trước giai đoạn 3, một có mô hình 3 và một không, có phần tương lai khác nhau, nên bộ nhớ còn lại không còn là trạng thái đủ (Nhận xét 07.36). Mở rộng trạng thái ở giai đoạn 3 thành cặp $(\xi,\iota)$, với $\iota=1$ khi mô hình 3 đã được chọn.

- $\Lambda_3(\xi,0)=4$ và $\Lambda_3(\xi,1)=2$ khi $\xi\ge3$; cả hai bằng $0$ khi $\xi\le2$.
- $\Lambda_2(\xi)=\max\{\Lambda_3(\xi,0),\ 3+\Lambda_3(\xi-2,1)\}$, cho $\Lambda_2(5)=\max\{4,\ 5\}=5$ và $\Lambda_2(1)=0$.
- $\Lambda_1(5)=\max\{\Lambda_2(5),\ 6+\Lambda_2(1)\}=6$ và $\Lambda_1(8)=10$.
- $\Lambda_0(8)=\max\{\Lambda_1(8),\ 5+\Lambda_1(5)\}=\max\{10,\ 11\}$, tức $11$.

Lượt xuôi cho tập $\{1,2\}$, dùng $7$ GB, lợi ích $11$. Tập $\{1,3,4\}$ của câu (b) bây giờ chỉ đem $12-2=10$.

**Kiểm tra lại.** Liệt kê các tập không vượt $8$ GB có lợi ích lớn, theo câu (b): $\{1,3,4\}$: $8$ GB, $12$; $\{1,2\}$: $7$ GB, $11$; $\{2,4\}$: $7$ GB, $10$; $\{2,3\}$: $6$ GB, $9$. Lớn nhất là $12$. Với hiệu chỉnh của câu (d), $\{1,3,4\}$ mất $2$, và lớn nhất là $11$ tại $\{1,2\}$.
:::



## Hướng dẫn đọc thêm và tài liệu tham khảo

- Bertsimas, D. và Tsitsiklis, J. N. (1997), *Introduction to Linear Optimization*, Athena Scientific, viết ở chiều cực tiểu. §1.1–1.4 cho Mục 1; §2.1–2.3 cho Mục 2 và Mục 3.1–3.3; §2.4–2.6 cho Mục 3.4 và Mục 4.1–4.3; §3.1–3.2, §3.4 cho Mục 4.4–4.5.
- MIT OpenCourseWare 15.093J/6.255J *Optimization Methods* (2009), bài giảng số 2 "The Geometry of LO", trang 9–24: đa diện, điểm cực, tồn tại và tối ưu của đỉnh, thuật toán ý niệm; cho Mục 2–4.
- MIT OpenCourseWare 15.093J/6.255J *Optimization Methods* (2009), bài giảng số 16 "Dynamic Programming", trang 2–9: bài toán cái túi, chọn trạng thái, khung quy hoạch động có nhiễu, phương trình Bellman; cho Mục 5–6 và Bài tập 07.12.
- Boyd, S. và Vandenberghe, L. (2004), *Convex Optimization*, Cambridge University Press. §2.2.4 (tr. 31–32) cho Mục 2.1; §4.3 (tr. 146–151) cho Mục 1–2; §5.1.5 (tr. 219) và §5.2.1 (tr. 224–225) cho đối ngẫu của quy hoạch tuyến tính dạng chuẩn, dùng trong Ví dụ 07.5 và Tình huống 07.2.
- Bertsekas, D. P. (2017), *Dynamic Programming and Optimal Control*, tập I, ấn bản 4, Athena Scientific, chương 1–2: nguyên lý tối ưu, thuật toán quy hoạch động, mở rộng trạng thái, đường đi ngắn nhất; cho Mục 5–6 và Tình huống 07.4.
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. và Stein, C. (2009), *Introduction to Algorithms*, ấn bản 3, MIT Press, §15.3: cấu trúc con tối ưu và bài toán con chồng lặp; cho Mục 6.
- Bellman, R. (1957), *Dynamic Programming*, Princeton University Press: nguyên lý tối ưu và lời nguyền số chiều.
- Klee, V. và Minty, G. J. (1972), "How good is the simplex algorithm?", trong *Inequalities III*, Academic Press, tr. 159–175: Nhận xét 07.34.
- Koenker, R. và Bassett, G. (1978), "Regression quantiles", *Econometrica* 46(1), tr. 33–50: Mục 1.3.
- Rabiner, L. R. (1989), "A tutorial on hidden Markov models and selected applications in speech recognition", *Proceedings of the IEEE* 77(2), tr. 257–286: Tình huống 07.3.
- Sutton, R. S. và Barto, A. G. (2018), *Reinforcement Learning: An Introduction*, ấn bản 2, MIT Press, chương 3–4, 6, 9: hướng mở rộng của Mục 5–6.
- Peyré, G. và Cuturi, M. (2019), "Computational optimal transport", *Foundations and Trends in Machine Learning* 11(5–6), chương 3: mục Ứng dụng.
- Đề cương học phần UET.AI2012: Buổi 7 (Chương 9–10, LLO17–LLO18) cho phạm vi chương; Buổi 8 (Chương 11, phương pháp đơn hình), Buổi 9 (Chương 12, bài toán luồng mạng) và Buổi 10 (Chương 13, quy hoạch nguyên) cho các giới hạn và hướng tiếp theo.
- Ghi chú Bài 01, Bài 02, Bài 03 và Bài 06, với các số hiệu ở mục "Kiến thức tiên quyết", là tiên quyết trực tiếp.
