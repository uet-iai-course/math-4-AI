# Bài 07 — Quy hoạch tuyến tính và quy hoạch động

## Mục tiêu học tập

Năm mục tiêu đầu là minh chứng cho các chuẩn đầu ra bài học (LLO) của buổi 7 và buổi 8 trong đề cương, đóng góp chuẩn đầu ra học phần CLO1 và CLO2:

- LLO17 (buổi 7): hiểu định nghĩa quy hoạch tuyến tính và diễn đạt bài toán thực tế thành quy hoạch tuyến tính;
- LLO18 (buổi 7): xây dựng đa diện của quy hoạch tuyến tính, hiểu sự tồn tại và tính tối ưu của điểm cực biên, mô tả thuật toán duyệt đỉnh kề ở mức khái niệm;
- LLO19 (buổi 8): hiểu và vận dụng phương pháp đơn hình để giải quy hoạch tuyến tính;
- LLO20 (buổi 8): khắc phục các khó khăn của phương pháp đơn hình trong trường hợp suy biến;
- LLO21 (buổi 8), một phần: nhận biết số bước của phương pháp đơn hình trong trường hợp xấu nhất và cách nhìn hình học cột.

Bài 07 gồm nội dung Buổi 7 và Buổi 8 (Chương 11) của đề cương. Hai mục tiêu cuối thuộc phần quy hoạch động (dynamic programming), phần bổ trợ của bài giảng; chúng không gắn với LLO hay CLO nào của đề cương.

Sau chương này, người học có thể:

1. Lập quy hoạch tuyến tính từ dữ kiện cho bằng bảng hoặc bằng lời, gồm biến có đơn vị, mục tiêu, ràng buộc và miền biến; đưa hồi quy $L_1$ về quy hoạch tuyến tính (LLO17; CLO1).
2. Viết miền khả thi thành đa diện, chuyển về dạng chuẩn, tính nghiệm cơ sở và kiểm tra tính khả thi, suy biến (LLO18; CLO1).
3. Nhận biết điểm cực biên (extreme point) bằng định nghĩa, bằng hạng các ràng buộc hoạt động và bằng nghiệm cơ sở khả thi; chứng minh các tương đương đó và điều kiện để đa diện có điểm cực biên (LLO18; CLO1).
4. Xác định kết cục của một quy hoạch tuyến tính, áp dụng định lý điểm cực biên tối ưu sau khi kiểm tra giả thiết, và chạy thuật toán duyệt đỉnh kề kèm lý do dừng (LLO18; CLO1).
5. Giải quy hoạch tuyến tính bằng phương pháp đơn hình dạng bảng: tính chi phí rút gọn, thực hiện phép thử tỉ số và bước xoay, phát hiện bài toán không bị chặn; xử lý đỉnh suy biến bằng quy tắc Bland; tìm cơ sở xuất phát bằng pha I; giải thích vì sao số bước có thể tăng theo hàm mũ (LLO19, LLO20, LLO21 một phần; CLO1, CLO2).
6. Mô hình hóa bài toán quyết định theo giai đoạn bằng trạng thái, điều khiển, chuyển trạng thái và chi phí cộng; kiểm tra trạng thái có đủ hay không (bổ trợ).
7. Giải phương trình Bellman ngược, dựng chính sách và đường tối ưu, so số phép tính với liệt kê (bổ trợ).

## Kiến thức tiên quyết

Số hiệu `01.k`, `02.k`, `03.k`, `06c.k` chỉ ghi chú Bài 01, Bài 02, Bài 03 và Bài 06c.

- **Đại số tuyến tính.** Trong $\mathbb R^m$ có nhiều nhất $m$ vector độc lập tuyến tính; ma trận vuông có định thức khác $0$ thì khả nghịch và hệ tương ứng có nghiệm duy nhất. Định lý số chiều: hạng của các vector $a_i\in\mathbb R^n$, $i\in S$, cộng số chiều của không gian nghiệm $\{d\mid a_i^Td=0,\ i\in S\}$ bằng $n$; đặc biệt, hạng nhỏ hơn $n$ thì có $d\ne0$ với $a_i^Td=0$ cho mọi $i\in S$. Mỗi phép biến đổi hàng sơ cấp (chia một hàng cho một số khác $0$, trừ một bội của hàng này khỏi hàng khác) tương đương với nhân trái với một ma trận khả nghịch.
- **Tập lồi** (Định nghĩa 01.18, Mệnh đề 01.19(c), 01.20(a)). Tập lồi chứa mọi tổ hợp lồi $\lambda x'+(1-\lambda)x''$, $\lambda\in[0,1]$, của hai điểm của nó; nửa không gian là tập lồi, và giao của các tập lồi là tập lồi.
- **Bài toán tối ưu, cực tiểu, hàm lồi** (Định nghĩa 01.12, 01.13, Định lý 01.31, Hệ quả 01.34, Định lý 01.35). Nghiệm là điểm khả thi đạt giá trị tối ưu; cực tiểu toàn cục là khái niệm về giá trị hàm, khác điểm cực biên của Mục 3. Tổng các hàm lồi và cực đại các hàm affine là hàm lồi; tập nghiệm của bài toán lồi là tập lồi, và hàm lồi chặt (còn gọi là lồi nghiêm ngặt) có nhiều nhất một điểm cực tiểu. Bài toán cực đại đổi về bài toán cực tiểu hàm đối dấu, giữ tập nghiệm.
- **Quy hoạch tuyến tính** (Định nghĩa 02.9, Mệnh đề 02.10). Thêm biến bù cho mỗi bất đẳng thức và tách biến tự do thành hiệu hai biến không âm đưa mọi quy hoạch tuyến tính về dạng chỉ có đẳng thức và điều kiện không âm, giữ giá trị mục tiêu.
- **Chứng nhận bằng tổ hợp không âm** (Mệnh đề 02.11, 03.11, Định lý 03.15(b)). Với bài toán $\min c^Tx$ dưới $a_i^Tx\ge\beta_i$, nếu $\mu\ge0$ và $c=\sum_i\mu_ia_i$ thì $c^Tx\ge\sum_i\mu_i\beta_i$ tại mọi điểm khả thi. Bộ $\mu$ đó là điểm khả thi của bài toán đối ngẫu, và với quy hoạch tuyến tính khả thi có giá trị hữu hạn, hai giá trị tối ưu bằng nhau.
- **Biến phụ cho cực đại affine** (Bổ đề 02.14, Định lý 02.15). Điều kiện $t\ge|r|$ tương đương với $t\ge r$ và $t\ge-r$; định lý được phát biểu lại ở Mục 1.3.
- **Bước cập nhật cục bộ** (Định nghĩa 06c.2, Mệnh đề 06c.3). Các bộ tối ưu của Bài 04–06 sinh bước từ gradient và một ma trận tiền điều kiện xác định dương; bước đó là hướng giảm. Chúng cần mục tiêu khả vi và không có ràng buộc.

## Bảng ký hiệu

Bảng chỉ gồm các ký hiệu dùng xuyên suốt chương; ký hiệu chỉ dùng trong một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ. Mỗi ký hiệu trong bảng giữ một nghĩa trong cả chương; ký hiệu cục bộ chỉ mang nghĩa trong khối nơi nó được giới thiệu.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $n$, $m$ | số biến; số hàng của ma trận ràng buộc của bài toán đang xét | số nguyên dương |
| $x$, $x_j$ | biến quyết định của quy hoạch tuyến tính; thành phần thứ $j$ | $\mathbb R^n$; $\mathbb R$ |
| $c$ | vector hệ số của hàm mục tiêu | $\mathbb R^n$ |
| $A$, $a_i^T$, $A_j$ | ma trận ràng buộc của bài toán đang xét; hàng thứ $i$ (chữ thường); cột thứ $j$ (chữ hoa) | $\mathbb R^{m\times n}$; $\mathbb R^{1\times n}$; $\mathbb R^m$ |
| $b$, $b_i$ | vector vế phải; thành phần thứ $i$ | $\mathbb R^m$; $\mathbb R$ |
| $P$ | miền khả thi, trong chương luôn là một đa diện | tập con của $\mathbb R^n$ |
| $z$, $z^*$ | giá trị mục tiêu $c^Tx$; giá trị tối ưu $\sup_{x\in P}c^Tx$ | $\mathbb R$; $\mathbb R\cup\{-\infty,+\infty\}$ |
| $x^*$, $P^*$ | một nghiệm tối ưu; tập nghiệm tối ưu | phần tử của $P$; tập con của $P$ |
| $s$, $s_i$ | vector biến bù; biến bù của ràng buộc thứ $i$ | $\mathbb R^m$, $s\ge0$ |
| $B$, $B^{\mathrm c}$ | tập chỉ số cơ sở; phần bù của nó trong $\{1,\ldots,n\}$ | $\lvert B\rvert=m$ |
| $A_B$, $x_B$, $x_{B^{\mathrm c}}$ | ma trận gồm các cột $A_j$, $j\in B$; biến cơ sở; biến ngoài cơ sở | $\mathbb R^{m\times m}$; $\mathbb R^m$; $\mathbb R^{n-m}$ |
| $\mathcal I(x)$, $\operatorname{supp}(x)$ | tập chỉ số các ràng buộc hoạt động tại $x$; tập chỉ số $j$ với $x_j>0$ | tập con của $\{1,\ldots,m\}$; của $\{1,\ldots,n\}$ |
| $v$, $w$; $x'$, $x''$, $\lambda$ | điểm cực biên của $P$; các điểm khác của $P$, chẳng hạn hai điểm trong một tổ hợp lồi, và hệ số của tổ hợp | phần tử của $P$; $[0,1]$ |
| $d$, $\theta$, $\theta^*$ | hướng di chuyển; tham số dọc đường $x+\theta d$, là độ dài bước khi $\theta\ge0$; bước của phép thử tỉ số | $\mathbb R^n$; $\mathbb R$; $\theta^*\ge0$ |
| $d^j$, $\bar c_j$, $\bar c$ | hướng cơ sở ứng với biến ngoài cơ sở $j$; chi phí rút gọn $c^Td^j$; vector chi phí rút gọn của mọi biến | $\mathbb R^n$; $\mathbb R$; $\mathbb R^n$ |
| $c_B$, $l$, $B'$ | hệ số mục tiêu của các biến cơ sở; chỉ số ra của một bước xoay; cơ sở sau bước xoay | $\mathbb R^m$; $l\in B$; $\lvert B'\rvert=m$ |
| $\tilde s$, $\tilde z^*$ | vector biến nhân tạo của pha I; giá trị tối ưu của bài toán phụ | $\mathbb R^m$, $\tilde s\ge0$; $\tilde z^*\le0$ |
| $\mu$ | hệ số nhân không âm của một chứng nhận cận trên | $\mathbb R^m$, $\mu\ge0$ |
| $h_i$, $y_i$, $r_i$, $t_i$, $M$ | vector đặc trưng, giá trị đích, phần dư và biến phụ phần dư của mẫu $i$; số mẫu | $\mathbb R^n$; $\mathbb R$; $\mathbb R$; $\mathbb R$; số nguyên dương |
| $N$, $k$, $q$ | số giai đoạn; chỉ số giai đoạn; số lựa chọn ở mỗi giai đoạn trong các phép đếm | $N\ge1$; $k\in\{0,\ldots,N\}$; số nguyên dương |
| $\xi_k$, $X_k$ | trạng thái ở giai đoạn $k$; tập trạng thái | phần tử của $X_k$; tập hữu hạn khác rỗng |
| $u$, $U_k(\xi)$ | điều khiển; tập điều khiển cho phép tại trạng thái $\xi$ | tập hữu hạn khác rỗng |
| $f_k$, $g_k$, $g_N$ | hàm chuyển trạng thái; chi phí giai đoạn; chi phí cuối | $f_k(\xi,u)\in X_{k+1}$; giá trị thực |
| $G_k$, $\mathcal U_k(\xi)$ | chi phí của một chuỗi điều khiển từ giai đoạn $k$; tập các chuỗi chấp nhận được từ $\xi$ | giá trị thực; tập hữu hạn |
| $J_k$, $u_k^*$ | chi phí tối ưu còn lại (hàm giá trị); chính sách | $X_k\to\mathbb R$; $X_k\to$ điều khiển |
| $\mathrm s$, $\mathrm A$, $\mathrm B$, $\mathrm C$, $\mathrm D$, $\mathrm t$ | tên các nút của đồ thị tầng | nhãn, không phải biến |

Bất đẳng thức giữa hai vector hiểu theo từng thành phần: $Ax\le b$ là $m$ bất đẳng thức $a_i^Tx\le b_i$, và $x\ge0$ là $n$ điều kiện $x_j\ge0$. Ba chữ $n$, $m$, $A$ luôn chỉ số biến, số hàng và ma trận ràng buộc của bài toán đang xét: trong dạng (1.1), $A$ không gồm các hàng $-x_j\le0$; trong dạng chuẩn (2.2), $n$ đếm cả biến bù thêm vào. Tên nút viết chữ đứng để phân biệt với ma trận $A$ và tập chỉ số $B$. Trừ bài toán hộp hạt (nguồn ở mục tài liệu tham khảo), các bộ số của các ví dụ là số liệu sư phạm tự xây dựng.

## 1. Mô hình hóa quy hoạch tuyến tính

Trong Bài 06c, chúng ta đã xây dựng các phương pháp tối ưu cho học sâu trên khung bước có tiền điều kiện (preconditioned step), với bước là hướng giảm khi ma trận tiền điều kiện xác định dương (Mệnh đề 06c.3). Các phương pháp này, cũng như các phương pháp của Bài 04 và Bài 05, đi theo bước cục bộ. Tại điểm hiện tại, gradient của mục tiêu cho hướng, bước đủ ngắn làm mục tiêu giảm, và quá trình dừng gần điểm có gradient bằng $0$. Chúng cần mục tiêu khả vi và không có ràng buộc.

Bài toán sau có ràng buộc, và gradient của mục tiêu khác $0$ tại mọi điểm, nên không có điểm dừng nào để các phương pháp trên tiến tới. Một cơ sở đóng hai loại hộp hạt; mỗi nghìn hộp loại 1 mang lại $2$ đơn vị lợi ích và cần $1$ giờ máy, mỗi nghìn hộp loại 2 mang lại $3$ đơn vị lợi ích và cần $2$ giờ máy. Hai loại dùng chung $54$ giờ máy, và sản lượng tối đa của từng loại là $30$ và $20$ nghìn hộp. Lợi ích $2x_1+3x_2$ có gradient $(2,3)$ tại mọi điểm, nên phương án tối ưu do các giới hạn quyết định.

Trong Bài 02, chúng ta đã xếp bài toán loại này vào quy hoạch tuyến tính (Định nghĩa 02.9) và đưa nó về dạng chuẩn (Mệnh đề 02.10). Trong Bài 03, chúng ta đã chứng nhận một ứng viên là tối ưu bằng nhân tử không âm (Mệnh đề 03.11). Hai công cụ đó kiểm tra một ứng viên cho trước nhưng chưa cho biết ứng viên nằm ở đâu trong vô số điểm khả thi.

Trong chương này, chúng ta chứng minh rằng, dưới hai giả thiết nêu rõ, chỉ cần xét hữu hạn điểm gọi là đỉnh, các đỉnh tính được bằng đại số, và có thể đi từ đỉnh này sang đỉnh khác. Phép đi đó được thực hiện bằng phương pháp đơn hình. Phần cuối chương xét các quyết định chọn theo chuỗi.

![Ô "Một vector quyết định": miền khả thi của một quy hoạch tuyến tính hai biến được tô kín, ghi "vô số điểm khả thi", có năm đỉnh được đánh dấu, ghi "5 đỉnh".](img/lec-07/central-problem-lp.svg)

![Ô "Một chuỗi quyết định": đồ thị ba tầng đi từ nút s qua A, B rồi C, D tới nút t, ghi "4 đường đi s → t".](img/lec-07/central-problem-dp.svg)

Hai hình trên minh họa hai cấu trúc của chương. Ở hình thứ nhất, miền phẳng có vô số điểm nhưng chỉ năm đỉnh. Ở Mục 3–4, chúng ta chứng minh rằng khi bài toán có nghiệm tối ưu và miền có đỉnh thì có một đỉnh tối ưu, và ở Mục 5, chúng ta tìm đỉnh đó bằng phương pháp đơn hình. Ở hình thứ hai, mỗi phương án là một đường đi qua nhiều tầng. Ở Mục 6–7, chúng ta chỉ ra rằng chi phí nhỏ nhất từ một nút tới đích không phụ thuộc đường dẫn tới nút đó, nên mỗi nút chỉ cần tính một lần.

### 1.1 Biến, đơn vị và ràng buộc

Để lập mô hình, chúng ta xác định đại lượng được chọn (biến quyết định) và đại lượng cố định (dữ kiện), rồi viết lợi ích và các giới hạn thành biểu thức của biến. Đơn vị của biến được ghi ngay từ đầu, vì mỗi ràng buộc so sánh hai vế cùng đơn vị.

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

**Kiểm tra một phương án.** Phương án $(30,20)$ thỏa hai giới hạn sản lượng với dấu bằng. Nó dùng $30+2\cdot20=70$ giờ máy, vượt giới hạn $54$ giờ thêm $16$ giờ.

**Kiểm tra lại.** Phương án $(30,12)$ dùng $30+2\cdot12=54$ giờ, đúng bằng giới hạn, và $30\le30$, $12\le20$, nên thỏa mọi ràng buộc.
:::

Ví dụ 07.1 cho thấy tính khả thi phải được kiểm tra trên mọi ràng buộc cùng lúc, vì $(30,20)$ đặt mỗi loại ở mức tối đa riêng nhưng giờ máy dùng chung không đủ. Viết lại thành $x_1\le54-2x_2$, ràng buộc giờ máy cho thấy mỗi nghìn hộp loại 2 làm giảm $2$ nghìn hộp cận trên của loại 1.

Nếu thiếu điều kiện không âm, mô hình cho phép một giá trị $x_2$ âm "giải phóng" giờ máy cho loại 1. Nhầm lẫn thường gặp là coi miền biến là hiển nhiên và bỏ khỏi mô hình; miền khả thi khi đó đổi và có thể không còn bị chặn.

![Sơ đồ bốn khối nối từ trái sang phải. Khối "Dữ kiện": đơn vị nghìn hộp, giới hạn 30 và 20, nguồn 54 giờ máy, tiêu hao 1 và 2 giờ mỗi nghìn hộp. Khối "Biến": x1 là nghìn hộp loại 1, x2 là nghìn hộp loại 2, x1, x2 lớn hơn hoặc bằng 0. Khối "Ràng buộc": x1 ≤ 30, x2 ≤ 20, x1+2x2 ≤ 54. Khối "Mục tiêu": cực đại 2x1+3x2, đơn vị lợi ích. Dòng chú thích: chỉ cộng các đại lượng có đơn vị tương thích trong cùng một ràng buộc.](img/lec-07/lp-model-units.svg)

Sơ đồ trên sắp các khối theo thứ tự dựng mô hình, gồm dữ kiện có đơn vị, biến, ràng buộc và mục tiêu. Dòng chú thích là phép kiểm tra đơn vị, chẳng hạn trong ràng buộc giờ máy, $1\cdot x_1$ và $2x_2$ đều tính bằng giờ.

### 1.2 Hàm mục tiêu và định nghĩa quy hoạch tuyến tính

Các ràng buộc chỉ cho biết phương án nào được phép. Để chọn giữa các phương án khả thi, ta cần một hàm đo lợi ích, mà với bài toán hộp hạt là tổng lợi ích $z=2x_1+3x_2$, tính bằng đơn vị lợi ích.

::: example Ví dụ 07.2 (So sánh vài phương án của bài toán hộp hạt)
**Dữ kiện.** Bài toán hộp hạt: cực đại $z=2x_1+3x_2$ dưới các ràng buộc $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$ (Ví dụ 07.1).

**Hai phương án dùng hết giờ máy.**

- Phương án $(30,12)$ là giao của $x_1=30$ với $x_1+2x_2=54$; nó cho $z=2\cdot30+3\cdot12=96$.
- Phương án $(14,20)$ là giao của $x_2=20$ với cùng đường giờ máy; nó cho $z=2\cdot14+3\cdot20=88$.

**Đọc chênh lệch.** Đi từ $(14,20)$ sang $(30,12)$:

- loại 1 tăng $16$ nghìn hộp, thêm $2\cdot16=32$ đơn vị lợi ích và dùng thêm $16$ giờ máy;
- loại 2 giảm $8$ nghìn hộp, giảm $3\cdot8=24$ đơn vị lợi ích và giải phóng $2\cdot8=16$ giờ máy.

Tính trên mỗi giờ máy, loại 1 mang lại $\tfrac21=2$ đơn vị còn loại 2 mang lại $\tfrac32=1{,}5$ đơn vị.

**Phương án không khả thi.** Phương án $(30,20)$ có $z=120$, lớn hơn cả hai, nhưng dùng $70$ giờ máy nên không được đưa vào so sánh.

**Kiểm tra lại.** Chênh lệch $96-88=8$ bằng $32-24$, khớp phép đọc theo giờ máy.
:::

Tuy nhiên, so sánh vài điểm không chứng minh được điểm nào tối ưu, vì miền khả thi có vô số điểm. Chúng ta cần một lập luận chỉ ra một tập ứng viên hữu hạn, và lập luận đó phải áp dụng cho mọi bài toán có cùng dạng. Để có lập luận như vậy, trước hết chúng ta tách phần chung của các bài toán này khỏi các con số cụ thể. Chúng ta viết lại Định nghĩa 02.9 của Bài 02 ở dạng ma trận theo chiều cực đại; dạng này được dùng xuyên suốt chương.

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

Trong định nghĩa trên, bài toán có ba thành phần.

- Dữ kiện: $c$, $A$, $b$ và chiều tối ưu, cố định trước khi giải.
- Quyết định: biến $x$, đại lượng được chọn.
- Lời giải: giá trị tối ưu cùng một nghiệm tối ưu, hoặc kết luận rằng bài toán không có nghiệm tối ưu.

Dạng (1.1) là một quy ước và không làm mất tính tổng quát: bất phương trình $\ge$ nhân với $-1$ thành $\le$, phương trình thành hai bất phương trình ngược chiều, biến tự do (free variable) thành hiệu của hai biến không âm, và bài toán cực tiểu đổi thành cực đại bằng $\min c^Tx=-\max(-c^Tx)$.

Trong khi Định nghĩa 02.9 của Bài 02 viết bài toán ở chiều cực tiểu thì định nghĩa trên viết ở chiều cực đại, vì ví dụ chính của chương là bài toán lợi ích. Hai cách viết có cùng tập nghiệm và giá trị tối ưu trái dấu. Bertsimas và Tsitsiklis (1997, §1.1) cũng viết ở chiều cực tiểu, nên khi đối chiếu ta cần đổi dấu $c$.

Dạng (1.1) chứa ba giả thiết mô hình là tỉ lệ, cộng tính và biến nhận giá trị thực; chúng ta phát biểu chính xác ba giả thiết này ở Nhận xét 07.3, sau Mệnh đề 07.2.

Hai bài toán sau không phải quy hoạch tuyến tính, với hai lý do khác nhau.

- Mục tiêu $x_1x_2$ hoặc ràng buộc $x_1^2\le4$ không tuyến tính theo $x$.
- Bài toán hộp hạt với thêm điều kiện $x_1,x_2$ nguyên có mọi biểu thức tuyến tính, nhưng miền quyết định rời rạc. Bài toán khi đó là quy hoạch nguyên (integer programming), nội dung Buổi 10 (Chương 13) của đề cương học phần.

::: example Ví dụ 07.3 (Bài toán hộp hạt ở dạng (1.1))
**Dữ kiện.** Bài toán hộp hạt: cực đại $2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$.

**Ánh xạ.** Có $n=2$ biến và $m=3$ giới hạn. Xếp các giới hạn theo thứ tự sản lượng loại 1, sản lượng loại 2, giờ máy:

$$
c=\begin{bmatrix}2\\3\end{bmatrix},\qquad
A=\begin{bmatrix}1&0\\0&1\\1&2\end{bmatrix},\qquad
b=\begin{bmatrix}30\\20\\54\end{bmatrix}.
$$

**Đọc ma trận.** Hàng thứ $i$ của $A$ ứng với giới hạn thứ $i$; hàng thứ ba $(1,2)$ chứa số giờ máy trên mỗi nghìn hộp của hai loại. Cột thứ $j$ của $A$ là mức tiêu hao của sản phẩm $j$ trên ba giới hạn.

**Kiểm tra lại.** Tại $x=(30,12)$: $Ax=(30,12,54)$, không vượt $b=(30,20,54)$ ở thành phần nào, và $c^Tx=96$, khớp Ví dụ 07.2.
:::

Trước khi tìm kiếm trên miền khả thi, ta có thể loại ngay một phần của miền. Nhờ tính tuyến tính của mục tiêu, khi $c\ne0$, nghiệm tối ưu, nếu có, nằm trên biên của miền theo mệnh đề sau.

::: proposition Mệnh đề 07.2 (Điểm trong không tối ưu)
**Giả thiết.** $P\subseteq\mathbb R^n$ là một tập bất kỳ, $c\in\mathbb R^n$, $c\ne0$. Điểm $\hat x\in P$ là điểm trong của $P$: có $\varepsilon>0$ để mọi $x$ với $\lVert x-\hat x\rVert\le\varepsilon$ đều thuộc $P$, trong đó $\lVert\cdot\rVert$ là chuẩn Euclid.

**Kết luận.** Điểm $\hat x'=\hat x+\varepsilon\,c/\lVert c\rVert$ thuộc $P$ và $c^T\hat x'=c^T\hat x+\varepsilon\lVert c\rVert>c^T\hat x$. Do đó $\hat x$ không phải nghiệm tối ưu của bài toán cực đại $c^Tx$ trên $P$.

**Điều kiện áp dụng.** Chỉ cần $c\ne0$; không cần $P$ lồi hay là đa diện.

**Phạm vi.** Mệnh đề chỉ loại các điểm trong. Nó không nói nghiệm tối ưu tồn tại, cũng không nói điểm biên nào tối ưu.
:::

::: proof Chứng minh Mệnh đề 07.2
**Bước 1 (điểm mới thuộc $P$).** Khoảng cách từ $\hat x'$ tới $\hat x$ là $\lVert\varepsilon c/\lVert c\rVert\rVert=\varepsilon$, nên $\hat x'\in P$ theo giả thiết về $\varepsilon$.

**Bước 2 (mục tiêu tăng).** Theo tính tuyến tính, $c^T\hat x'=c^T\hat x+\varepsilon\,c^Tc/\lVert c\rVert=c^T\hat x+\varepsilon\lVert c\rVert$. Vì $c\ne0$, số hạng thêm vào dương. $\square$
:::

Mệnh đề 07.2 cho thấy với mục tiêu tuyến tính khác $0$, từ mọi điểm trong ta đều tìm được một điểm khả thi có giá trị mục tiêu lớn hơn theo hướng $c$. Giả thiết $c\ne0$ là cần thiết, vì với $c=0$, mọi điểm khả thi đều tối ưu, kể cả điểm trong.

Theo ngôn ngữ của Bài 04–06, đây là cách nói khác của sự kiện gradient $c$ của $c^Tx$ không bao giờ bằng $0$. Ở bài toán không ràng buộc, điều đó có nghĩa mục tiêu không có cực trị. Ở bài toán có ràng buộc, điều đó buộc nghiệm nằm trên biên, nơi một số ràng buộc thỏa với dấu bằng, và ở Mục 2–3, chúng ta làm chính xác ý "biên" thành khái niệm đỉnh.

**Trong học máy.** Bài toán phân bổ tài nguyên tính toán với lợi ích tuyến tính, chẳng hạn chia giờ chạy bộ xử lý đồ họa (graphics processing unit, GPU) giữa huấn luyện và phục vụ, có nghiệm tối ưu tại biên theo Mệnh đề 07.2, nơi ít nhất một giới hạn được dùng hết. Ở Tình huống 07.2, chúng ta đọc giới hạn đó từ các biến bù. Mệnh đề không áp dụng khi lợi ích bão hòa theo giờ huấn luyện, vì mục tiêu khi đó không tuyến tính.

Mệnh đề 07.2 và cả chương dựa trên tính tuyến tính của mô hình. Khi một giả thiết của tính tuyến tính sai, mô hình tuyến tính trả lời một câu hỏi khác với câu hỏi ban đầu.

::: remark Nhận xét 07.3 (Ba giả thiết mô hình của quy hoạch tuyến tính)
**Tỉ lệ.** Tăng gấp đôi sản lượng một loại thì lợi ích và mức tiêu hao của loại đó tăng gấp đôi. Một chi phí cố định phát sinh ngay khi bắt đầu sản xuất một loại vi phạm giả thiết này: lợi ích của loại 1 thành $2x_1-5$ khi $x_1>0$ và $0$ khi $x_1=0$, một hàm không tuyến tính.

**Cộng tính.** Đóng góp của các loại cộng với nhau. Nếu khi sản xuất đồng thời hai loại, máy quá nhiệt và sản lượng mỗi giờ giảm theo tích $x_1x_2$, giả thiết này sai.

**Biến nhận giá trị thực (chia được).** Biến nhận mọi giá trị thực trong miền. Đơn vị nghìn hộp cho phép coi sản lượng là đại lượng liên tục ở mức lập kế hoạch: $x_1=12{,}5$ ứng với $12\,500$ hộp. Khi quyết định là số lô nguyên, bài toán là quy hoạch nguyên.
:::

::: exercise Bài tập 07.1 (Dựng mô hình từ dữ kiện cho bằng lời)
Hai luồng suy luận dùng chung một GPU trong một giờ. Mỗi nghìn yêu cầu của luồng 1 và luồng 2 mang lại lợi ích $4$ và $5$ đơn vị, và dùng $2$ và $1$ phút GPU. GPU có ngân sách $14$ phút trong giờ đó; luồng 1 nhận tối đa $8$ nghìn yêu cầu, luồng 2 nhận tối đa $6$ nghìn yêu cầu.

- (a) Nêu biến quyết định và đơn vị.
- (b) Viết hàm mục tiêu và chiều tối ưu.
- (c) Viết mọi ràng buộc và miền biến; viết bài toán ở dạng (1.1) với $c$, $A$, $b$ cụ thể.
- (d) Kiểm tra tính khả thi của phương án $(4,6)$ và tính giá trị mục tiêu tại đó.
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

**Câu (d).** Phương án $(4,6)$ dùng $2\cdot4+6=14$ phút, đúng bằng ngân sách; $4\le8$ và $6\le6$. Vậy $(4,6)$ khả thi, với hai ràng buộc hoạt động là GPU và giới hạn luồng 2. Giá trị mục tiêu là $4\cdot4+5\cdot6=46$.

**Kiểm tra lại.** Ba lỗi thường gặp: đảo hệ số thành $x_1+2x_2\le14$, dùng $60$ phút thay cho ngân sách $14$ phút, và quên miền biến. Với $Ax$ tại $(4,6)$: $(14,4,6)\le(14,8,6)$. Câu hỏi chỉ yêu cầu kiểm tra khả thi; kết luận $(4,6)$ có tối ưu hay không cần công cụ của Mục 4 (Bài tập 07.6 làm việc đó trên một đa giác khác).
:::

### 1.3 Hồi quy chuẩn $L_1$ dưới dạng quy hoạch tuyến tính

Với Định nghĩa 07.1, ta có thể nhận ra quy hoạch tuyến tính trong những bài toán ban đầu không có dạng tuyến tính. Xét hồi quy với $M$ mẫu: mẫu $i$ có vector đặc trưng $h_i\in\mathbb R^n$ và giá trị đích $y_i\in\mathbb R$, tham số của mô hình tuyến tính là $x\in\mathbb R^n$, và phần dư của mẫu $i$ là

$$
r_i=h_i^Tx-y_i .
$$

Phần dư là sai lệch giữa dự đoán $h_i^Tx$ và giá trị đích; dấu của nó cho biết mô hình dự đoán thừa hay thiếu.

Bình phương nhỏ nhất của Bài 01 cực tiểu $\sum_ir_i^2$ và khuếch đại các mẫu ngoại lai (outlier): một phần dư bằng $10$ đóng góp $100$ vào tổng bình phương nhưng chỉ $10$ vào tổng trị tuyệt đối. Hồi quy chuẩn $L_1$, còn gọi là hồi quy sai số tuyệt đối (least absolute deviations, Định nghĩa 02.13), cực tiểu $\sum_i|r_i|$. Mục tiêu này không khả vi tại các điểm có $r_i=0$, nên các bước gradient của Bài 04–06 không dùng trực tiếp được. Bài 02 đã đưa bài toán này về quy hoạch tuyến tính bằng biến phụ (Bổ đề 02.14, Định lý 02.15). Ở đây chúng ta nhắc lại kỹ thuật đó với ký hiệu của chương. Bài 02 viết $r=Xw-y$ với $N$ mẫu; ở đây $h_i^T$ là hàng $i$ của $X$, tham số viết là $x$ cho thống nhất với biến quyết định của quy hoạch tuyến tính, và số mẫu viết là $M$ vì $N$ dành cho số giai đoạn ở phần quy hoạch động. Bài toán thu được là một quy hoạch tuyến tính, nên các kết quả ở Mục 3 và Mục 4 áp dụng cho nó khi đủ giả thiết: miền không chứa đường thẳng khi và chỉ khi ma trận có các hàng $h_i^T$ có hạng $n$; khi đó miền có điểm cực biên, và vì mục tiêu không âm nên giá trị tối ưu hữu hạn.

Một cách trực quan, trị tuyệt đối là giá trị nhỏ nhất của một biến thêm vào, gọi là biến phụ (auxiliary variable), khi biến đó bị chặn dưới bởi hai hàm tuyến tính. Mô tả này mới là trực giác, chưa phải phát biểu hình thức. Viết bằng công thức, ta có

$$
|r|=\min\{t\in\mathbb R:\ t\ge r,\ t\ge-r\}.
$$

Theo đẳng thức này, $t$ phải không nhỏ hơn cả $r$ và $-r$, tức không nhỏ hơn số lớn hơn trong hai số, và số đó là $|r|$.

![Mặt phẳng với trục ngang r và trục đứng t. Đồ thị chữ V của t bằng trị tuyệt đối của r, gồm hai nhánh t = r và t = −r. Vùng phía trên chữ V được tô, ghi t ≥ r và t ≥ −r. Một mũi tên thẳng đứng ghi "giảm t" chỉ xuống tới chữ V tại một r cố định.](img/lec-07/l1-residual-slack.svg)

Trên hình, chữ V là đồ thị của $t=|r|$, còn vùng tô phía trên là tập các cặp $(r,t)$ thỏa $t\ge r$ và $t\ge-r$, tức giao của hai nửa mặt phẳng. Trên đường thẳng đứng tại một $r$ cố định, điểm thấp nhất của vùng tô nằm trên chữ V, nên giá trị nhỏ nhất của $t$ bằng $|r|$. Ví dụ sau áp dụng ý này cho hai mẫu.

::: example Ví dụ 07.4 (Tổng hai trị tuyệt đối)
**Dữ kiện.** Hai mẫu một chiều với $h_1=h_2=1$, $y_1=1$, $y_2=3$; tham số $x\in\mathbb R$. Bài toán là cực tiểu $|x-1|+|x-3|$.

**Giải trực tiếp theo ba khoảng.**

- Với $x\in[1,3]$: $|x-1|+|x-3|=(x-1)+(3-x)=2$.
- Với $x>3$: tổng bằng $2x-4>2$.
- Với $x<1$: tổng bằng $4-2x>2$.

Giá trị tối ưu là $2$, đạt tại mọi $x\in[1,3]$.

**Dạng có biến phụ.** Với hai biến phụ $t_1$, $t_2$, bài toán viết thành: cực tiểu $t_1+t_2$ dưới bốn ràng buộc $-t_1\le x-1\le t_1$, $-t_2\le x-3\le t_2$. Tại $x=2$, chọn $t_1=t_2=1$ thì mọi ràng buộc thỏa và $t_1+t_2=2$.

**Kiểm tra lại.** Tại $x=2$, chọn $t_1=3$, $t_2=1$ vẫn khả thi nhưng cho $4>2$; giảm $t_1$ về $|x-1|=1$ làm mục tiêu giảm. Nghiệm không duy nhất: $x=1$ và $x=3$ cùng cho $2$.
:::

Ví dụ 07.4 cho thấy hai bất phương trình tuyến tính thay được một trị tuyệt đối, và phép cực tiểu buộc biến phụ bằng trị tuyệt đối tại nghiệm. Phát biểu chung là một trường hợp riêng của Định lý 02.15 ở Bài 02. Ta viết lại định lý đó với ký hiệu cục bộ: tập $D\subseteq\mathbb R^n$, hàm $\phi:D\to\mathbb R$, các hàm affine $\ell_{ij}$ với $i=1,\ldots,M$ và $j$ chạy trên một tập chỉ số hữu hạn, và trọng số $\gamma_i\ge0$. Định lý so sánh hai bài toán

$$
\begin{aligned}
(\mathrm P):&\quad\min_{x\in D}\ \phi(x)+\sum_{i=1}^M\gamma_i\max_j\ell_{ij}(x),\\
(\mathrm Q):&\quad\min_{x\in D,\ t\in\mathbb R^M}\ \phi(x)+\sum_{i=1}^M\gamma_it_i,\quad\ell_{ij}(x)\le t_i\ \ \forall i,j,
\end{aligned}
$$

và kết luận hai điều sau.

- (a) Hai bài toán có cùng giá trị tối ưu. Nếu $x^*$ là nghiệm của $(\mathrm P)$ thì $(x^*,t^*)$ với $t_i^*=\max_j\ell_{ij}(x^*)$ là nghiệm của $(\mathrm Q)$; nếu $(x^*,t^*)$ là nghiệm của $(\mathrm Q)$ thì $x^*$ là nghiệm của $(\mathrm P)$.
- (b) Khi $\gamma_i>0$, mọi nghiệm $(x^*,t^*)$ của $(\mathrm Q)$ có $t_i^*=\max_j\ell_{ij}(x^*)$.

Áp dụng định lý này cho tổng các trị tuyệt đối của phần dư, ta được hệ quả sau.

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

- (a) hai bài toán có cùng giá trị tối ưu;
- (b) nếu $x^*$ là nghiệm của bài toán ban đầu thì $(x^*,t^*)$ với $t_i^*=|h_i^Tx^*-y_i|$ là nghiệm của (1.2);
- (c) nếu $(x^*,t^*)$ là nghiệm của (1.2) thì $x^*$ là nghiệm của bài toán ban đầu và $t_i^*=|h_i^Tx^*-y_i|$ với mọi $i$.

**Điều kiện áp dụng.** Bài toán cực tiểu; mỗi trị tuyệt đối có hệ số dương.

**Phạm vi.** Hệ quả không cho nghiệm duy nhất, và không áp dụng cho bài toán cực đại một tổng trị tuyệt đối.
:::

::: proof Chứng minh Hệ quả 07.4
**Bước 1 (đặt vào Định lý 02.15).** Lấy $D=\mathbb R^n$, $\phi=0$, $M$ hàm cực đại với $\gamma_i=1$, mỗi hàm cực đại của hai hàm affine $\ell_{i1}(x)=h_i^Tx-y_i$, $\ell_{i2}(x)=-(h_i^Tx-y_i)$. Vì $\max(r,-r)=|r|$, bài toán ban đầu là bài toán $(\mathrm P)$ ở trên.

**Bước 2 (đọc bài toán có biến phụ; kết luận (a), (c) của hệ quả).** Hai ràng buộc $\ell_{i1}(x)\le t_i$ và $\ell_{i2}(x)\le t_i$ chính là $-t_i\le h_i^Tx-y_i\le t_i$, nên bài toán $(\mathrm Q)$ là (1.2). Phần (a) của Định lý 02.15 cho cùng giá trị tối ưu và cho chiều từ nghiệm của (1.2) sang nghiệm của bài toán ban đầu; phần (b) của Định lý 02.15, với $\gamma_i=1>0$, cho $t_i^*=|h_i^Tx^*-y_i|$ tại mọi nghiệm của (1.2).

**Bước 3 (chiều từ bài toán ban đầu sang (1.2); kết luận (b) của hệ quả).** Với nghiệm $x^*$ của bài toán ban đầu, điểm $(x^*,t^*)$ với $t_i^*=|h_i^Tx^*-y_i|$ khả thi cho (1.2) và có giá trị $\sum_i|h_i^Tx^*-y_i|$, bằng giá trị tối ưu chung, nên là nghiệm. $\square$
:::

Bài toán (1.2) có mục tiêu tuyến tính và $2M$ ràng buộc tuyến tính, nên là một quy hoạch tuyến tính theo Định nghĩa 07.1. Hai bất phương trình của mẫu $i$ tương đương với $t_i\ge|r_i|$, nên điều kiện $t_i\ge0$ không cần viết thêm.

Có hai nhầm lẫn thường gặp ở đây.

- Hai bất phương trình chỉ cho $t_i\ge|r_i|$; dấu bằng tại nghiệm xuất hiện nhờ hệ số dương của $t_i$ trong mục tiêu cực tiểu. Nếu đổi sang cực đại $\sum_it_i$, bài toán (1.2) không bị chặn.
- Không khả vi không có nghĩa không lồi: $\sum_i|r_i|$ lồi theo Định lý 01.31, nhưng gradient không xác định tại các điểm gãy.

**Trong học máy.** Hồi quy $L_1$ ước lượng trung vị có điều kiện của giá trị đích, nên ít nhạy với ngoại lai hơn bình phương nhỏ nhất. Koenker và Bassett (1978) mở rộng nó thành hồi quy phân vị. Hệ quả 07.4 cho phép giải nó bằng một bộ giải quy hoạch tuyến tính với $n+M$ biến và $2M$ ràng buộc thay cho phương pháp gradient; Mệnh đề 07.25 ở Mục 4 chứng minh thêm rằng, khi các vector đặc trưng sinh $\mathbb R^n$, bài toán (1.2) có một nghiệm làm ít nhất $n$ phần dư bằng $0$. Ở Tình huống 07.1, chúng ta dùng điều đó trên một bộ dữ liệu có ngoại lai.

::: exercise Bài tập 07.2 (Mô hình hằng với mất mát $L_1$)
Ba mẫu có giá trị đích $y_1=0$, $y_2=2$, $y_3=6$; mô hình hằng dự đoán cùng một số $x\in\mathbb R$ cho mọi mẫu, tức $h_i=1$.

- (a) Viết bài toán cực tiểu $\sum_i|x-y_i|$ thành quy hoạch tuyến tính dạng (1.2); nêu số biến và số ràng buộc.
- (b) Tìm nghiệm và giá trị tối ưu.
- (c) Tìm nghiệm của bình phương nhỏ nhất $\sum_i(x-y_i)^2$, so với (b), và xác định mẫu làm nghiệm đó lệch khỏi trung vị nhiều nhất.
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

**Câu (c).** Bình phương nhỏ nhất cho trung bình $x=\tfrac{0+2+6}3=\tfrac83$. Mẫu $y_3=6$ ở xa nhất và làm trung bình tăng; trung vị không đổi nếu thay $6$ bằng $60$, còn trung bình thành $\tfrac{62}3$.

**Kiểm tra lại.** Tại $x=2$: $|2-0|+|2-2|+|2-6|=6$; tại $x=\tfrac83$: $\tfrac83+\tfrac23+\tfrac{10}3=\tfrac{20}3>6$.
:::

Như vậy, xuất phát từ bảng dữ kiện của bài toán hộp hạt (Ví dụ 07.1 và Ví dụ 07.2), chúng ta đã tách phần chung thành dạng (1.1) của Định nghĩa 07.1. Ba giả thiết mô hình đi kèm dạng này được nêu ở Nhận xét 07.3. Mệnh đề 07.2 cho biết nghiệm tối ưu, nếu có, nằm trên biên của miền, còn Hệ quả 07.4 mở rộng phạm vi của định nghĩa sang hồi quy $L_1$. Đến đây, chúng ta đã có cách viết một bài toán quyết định thành quy hoạch tuyến tính.

Tuy nhiên, biên của miền vẫn có vô số điểm, nên chưa có tập ứng viên hữu hạn nào. Trong Mục 2, chúng ta mô tả miền khả thi bằng hữu hạn nửa không gian.

## 2. Đa diện, dạng chuẩn và nghiệm cơ sở

Trên bài toán hộp hạt, phương án $(30,12)$ cho $z=96$, lớn hơn các phương án đã thử, nhưng chưa có lập luận nào loại vô số phương án còn lại. Đầu tiên, chúng ta chứng minh $2x_1+3x_2\le96$ trên toàn miền hộp hạt, sau đó tìm cách tính các điểm góc của miền chỉ bằng đại số, để dùng được khi có nhiều biến và không còn vẽ được hình.

### 2.1 Đa diện và đường mức

Trên mặt phẳng $(x_1,x_2)$, ta có thể vẽ cùng lúc miền khả thi và các đường trên đó mục tiêu nhận một giá trị cố định. Mỗi bất phương trình $a^Tx\le\beta$ giữ lại một nửa mặt phẳng nằm về một phía của đường biên $a^Tx=\beta$, và miền khả thi là phần chung của các nửa mặt phẳng đó.

![Mặt phẳng x1, x2. Miền khả thi của bài toán hộp hạt là ngũ giác tô màu với năm đỉnh (0,0), (30,0), (30,12), (14,20), (0,20). Đường mức nét đứt z = 60 đi qua hai đỉnh (30,0) và (0,20). Đường mức song song z = 96 chỉ có điểm chung với miền tại đỉnh (30,12). Mũi tên ghi "tăng z" chỉ theo hướng vector (2,3).](img/lec-07/polyhedron-level-sets.svg)

Giao của năm nửa mặt phẳng trên hình là ngũ giác có năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$; đường giờ máy cắt hai trục tại $(54,0)$ và $(0,27)$. Các đường $2x_1+3x_2=\alpha$, gọi là đường mức (level curve) của mục tiêu, song song vì cùng vector pháp tuyến $c=(2,3)$. Tăng $\alpha$ tịnh tiến đường mức theo hướng $c$, và đường mức cuối cùng còn có điểm chung với miền là $z=96$, với điểm chung duy nhất là một đỉnh.

::: example Ví dụ 07.5 (Cận trên của mục tiêu hộp hạt)
**Dữ kiện.** Bài toán hộp hạt: cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$. Năm đỉnh của ngũ giác khả thi là $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$.

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

**Kiểm tra lại.** Hai hệ số cho $\tfrac12+\tfrac32=2$ ở $x_1$ và $\tfrac32\cdot2=3$ ở $x_2$. Tại $(14,20)$: $\tfrac12\cdot14+\tfrac32\cdot54=7+81=88$, khớp $z=88$ vì $x_1+2x_2=54$ hoạt động tại đó.
:::

Trong Ví dụ 07.5, cận $2x_1+3x_2\le96$ được chứng minh bằng cơ chế của Mệnh đề 02.11 viết cho chiều cực đại, trong đó hai hệ số $\tfrac12$, $\tfrac32$ là nhân tử của bài toán đối ngẫu (Mệnh đề 03.11). Tuy nhiên, cách làm này cần đoán đúng hai ràng buộc hoạt động tại nghiệm, điều mà hình vẽ gợi ý được trong mặt phẳng nhưng không gợi ý được trong nhiều chiều. Để có một cách tìm ứng viên có hệ thống, trước hết chúng ta cần mô tả miền khả thi trong mọi số chiều. Bài 02 đã gọi miền khả thi của quy hoạch tuyến tính là đa diện, và Bài 01 đã chứng minh nửa không gian là tập lồi (Mệnh đề 01.19(c)). Chúng ta nhắc lại các khái niệm đó và bổ sung khái niệm đa diện bị chặn trong định nghĩa sau.

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

Định nghĩa trên chỉ dùng bất phương trình, nên áp dụng được trong mọi số chiều. Một đa diện có thể rỗng, kéo dài vô hạn, hoặc có số chiều nhỏ hơn $n$, tức khái niệm "đa diện" rộng hơn "đa giác". Miền khả thi của dạng (1.1) là đa diện với $m+n$ hàng: $m$ hàng của $Ax\le b$ cộng $n$ hàng $-x_j\le0$.

Trong mặt phẳng, siêu phẳng là một đường thẳng và nửa không gian là một nửa mặt phẳng. Đường mức $c^Tx=\alpha$ của mục tiêu là một siêu phẳng với vector pháp tuyến $c$. Ràng buộc có dạng $a^Tx\ge\beta$ viết lại thành $(-a)^Tx\le-\beta$ để đúng dạng (2.1). Hai tính chất cơ bản của đa diện được phát biểu trong mệnh đề sau.

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

Phần (a) cho phép ta dùng tổ hợp lồi trên mọi miền khả thi của quy hoạch tuyến tính, và ở Mục 3, chúng ta dùng nó để định nghĩa điểm cực biên. Phần (b) cho biết mọi kết quả về đa diện dạng (2.1) vẫn áp dụng sau khi các bất phương trình được viết lại thành phương trình.

::: example Ví dụ 07.6 (Đa diện bị chặn và không bị chặn)
**Miền hộp hạt.** Mọi phương án khả thi có $0\le x_1\le30$ và $0\le x_2\le20$, nên $\lVert x\rVert\le\sqrt{30^2+20^2}=\sqrt{1300}\approx36{,}06$. Miền bị chặn với $K=\sqrt{1300}$.

**Một miền không bị chặn.** Tập $P_1=\{x\in\mathbb R^2\mid x_1+x_2\ge1,\ x\ge0\}$ viết ở dạng (2.1) với các hàng $-x_1-x_2\le-1$, $-x_1\le0$, $-x_2\le0$. Với mọi $\theta\ge1$, điểm $(\theta,0)$ thuộc $P_1$ và có chuẩn $\theta$, nên không có $K$ nào chặn được.

**Kiểm tra lại.** Tại $(\theta,0)$ với $\theta=5$: $5+0=5\ge1$, $5\ge0$, $0\ge0$.
:::

Nhầm lẫn thường gặp là đồng nhất "miền không bị chặn" với "mục tiêu không bị chặn". Trên $P_1$, bài toán cực đại $x_1$ không bị chặn trên, nhưng bài toán cực đại $-x_1-x_2$ có giá trị tối ưu $-1$, đạt trên cả đoạn $x_1+x_2=1$, $x\ge0$. Các khả năng này được phân loại đầy đủ ở Mục 4.

**Trong học máy.** Tập trọng số của một tổ hợp mười mô hình, $\{p\in\mathbb R^{10}\mid p\ge0,\ \sum_jp_j=1\}$, là đa diện dạng chuẩn theo Mệnh đề 07.6(b); giới hạn ngân sách tính toán, bộ nhớ hay độ trễ tuyến tính theo tài nguyên là các nửa không gian. Tính lồi ở phần (a) cho phép dùng các kết quả về bài toán lồi của Bài 01–03 trên các miền này.

### 2.2 Dạng chuẩn

Đỉnh $(30,12)$ là giao của hai đường biên $x_1=30$ và $x_1+2x_2=54$. Tổng quát hơn, trong $\mathbb R^n$ một đỉnh là điểm duy nhất thỏa với dấu bằng một nhóm $n$ ràng buộc độc lập tuyến tính, như sẽ được chứng minh ở Mục 3. Để tính đỉnh bằng cách giải hệ phương trình, ta cần một cách viết trong đó mọi ràng buộc, trừ điều kiện không âm, đều là phương trình, và cách viết đó được cho trong định nghĩa sau.

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

Định nghĩa trên gồm ba thành phần: phương trình $Ax=b$, điều kiện không âm và giả thiết hạng $\operatorname{rank}(A)=m$. Giả thiết hạng bảo đảm ta chọn được $m$ cột độc lập của $A$, tức một ma trận vuông khả nghịch, và ta cần đúng điều này ở Mục 2.3. Giả thiết đó cũng kéo theo $m\le n$.

So với dạng chuẩn trong Định nghĩa 02.9, định nghĩa này viết ở chiều cực đại và thêm giả thiết hạng. Một số tài liệu gọi dạng $Ax\le b$ là "dạng chuẩn", và một số tài liệu khác gọi dạng (2.2) là "dạng chính tắc"; trong chương này, dạng chuẩn luôn là (2.2). Biến bù của dạng chuẩn có nghĩa hẹp hơn biến phụ $t_i$ của Mục 1.3: biến phụ là biến thêm vào mô hình nói chung, còn biến bù đo phần giới hạn chưa dùng. Mọi quy hoạch tuyến tính đưa được về dạng (2.2) theo mệnh đề sau, phiên bản chiều cực đại của Mệnh đề 02.10.

::: proposition Mệnh đề 07.8 (Đưa quy hoạch tuyến tính về dạng chuẩn)
**Giả thiết.** Bài toán ban đầu: cực đại $c^Tx$ trên $P=\{x\in\mathbb R^n\mid Ax\le b\}$, với $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$. Đặt $\tilde x=(x^+,x^-,s)\in\mathbb R^{2n+m}$ và

$$
\tilde A=\begin{bmatrix}A&-A&I\end{bmatrix},\qquad\tilde c=\begin{bmatrix}c\\-c\\0\end{bmatrix}.
$$

Bài toán mới: cực đại $\tilde c^T\tilde x$ trên $\tilde P=\{\tilde x\mid\tilde A\tilde x=b,\ \tilde x\ge0\}$.

**Kết luận.**

- (a) $\operatorname{rank}(\tilde A)=m$, nên bài toán mới ở dạng chuẩn (2.2).
- (b) Ánh xạ $\varphi(x)=(\max(x,0),\max(-x,0),b-Ax)$, với $\max$ lấy theo từng thành phần, đưa $P$ vào $\tilde P$ và $\tilde c^T\varphi(x)=c^Tx$.
- (c) Ánh xạ $\psi(x^+,x^-,s)=x^+-x^-$ đưa $\tilde P$ vào $P$ và $c^T\psi(\tilde x)=\tilde c^T\tilde x$.
- (d) Hai bài toán có cùng giá trị tối ưu; $\varphi$ biến nghiệm tối ưu của bài toán ban đầu thành nghiệm tối ưu của bài toán mới, và $\psi$ làm điều ngược lại.

**Điều kiện áp dụng.** Mọi dữ kiện. Biến nào đã có ràng buộc không âm thì không cần tách: chỉ thêm biến bù cho các hàng còn lại.

**Phạm vi.** Ánh xạ $\psi$ không một-một: cộng cùng một số dương vào $x_j^+$ và $x_j^-$ cho một điểm khác của $\tilde P$ có cùng ảnh.
:::

::: proof Chứng minh Mệnh đề 07.8
**Bước 1 (phần (a)).** Khối $I$ gồm $m$ cột cuối của $\tilde A$, là $m$ vector đơn vị của $\mathbb R^m$, độc lập tuyến tính, nên $\operatorname{rank}(\tilde A)\ge m$; hạng không vượt số hàng $m$.

**Bước 2 (phần (b)).** Với $x\in P$, đặt $x^+=\max(x,0)$, $x^-=\max(-x,0)$, $s=b-Ax$. Ba vector không âm: hai vector đầu theo cách lấy $\max$, vector thứ ba vì $Ax\le b$. Với mỗi $j$, một trong hai số $x_j^+$, $x_j^-$ bằng $0$ và hiệu bằng $x_j$, nên $x^+-x^-=x$. Do đó

$$
\begin{aligned}
\tilde A\varphi(x)&=A(x^+-x^-)+s\\
&=Ax+(b-Ax)=b,
\end{aligned}
$$

và $\tilde c^T\varphi(x)=c^Tx^+-c^Tx^-=c^Tx$.

**Bước 3 (phần (c)).** Với $\tilde x\in\tilde P$, đặt $x=x^+-x^-$. Phương trình $\tilde A\tilde x=b$ cho $Ax=b-s\le b$ vì $s\ge0$, nên $x\in P$, và $c^Tx=c^Tx^+-c^Tx^-=\tilde c^T\tilde x$.

**Bước 4 (phần (d)).** Theo (b), mọi giá trị đạt được trên $P$ cũng đạt được trên $\tilde P$; theo (c), điều ngược lại cũng đúng. Hai tập giá trị bằng nhau, nên hai cận trên đúng bằng nhau. Nếu $x^*$ tối ưu cho bài toán ban đầu thì $\tilde c^T\varphi(x^*)=c^Tx^*$ bằng giá trị tối ưu chung, nên $\varphi(x^*)$ tối ưu; lập luận cho $\psi$ giống hệt. $\square$
:::

Mệnh đề 07.8 cho phép ta chứng minh một kết quả về sự tồn tại nghiệm cho dạng chuẩn rồi chuyển nó sang mọi quy hoạch tuyến tính. Chứng minh Định lý 07.26 ở Mục 4 đi theo đúng cách này. Bảng sau tóm tắt các phép chuyển theo từng loại ràng buộc, kể cả khi bài toán ban đầu có biến không âm sẵn hoặc có ràng buộc $\ge$.

| Dạng gốc | Dạng trong (2.2) | Tên biến thêm |
|---|---|---|
| $a^Tx\le\beta$ | $a^Tx+s=\beta$, $s\ge0$ | biến bù (slack variable) |
| $a^Tx\ge\beta$ | $a^Tx-e=\beta$, $e\ge0$ | biến dư (surplus variable) |
| $x_j$ tự do | $x_j=x_j^+-x_j^-$, $x_j^+,x_j^-\ge0$ | hai biến không âm |
| cực tiểu $c^Tx$ | cực đại $-c^Tx$ | không thêm biến |

Biến bù $s=\beta-a^Tx$ đo phần giới hạn chưa dùng; biến dư $e=a^Tx-\beta$ đo phần vượt trên một cận dưới. Ba phép đầu đều thêm biến, nên $n$ của dạng chuẩn đếm cả các biến mới. Biến phụ $t_i$ của hồi quy $L_1$ trong (1.2) cũng là biến thêm vào mô hình, nhưng nó chặn một trị tuyệt đối chứ không đo phần giới hạn chưa dùng. Vì vậy, trong chương, chỉ $s_i$ được gọi là biến bù.

::: remark Nhận xét 07.9 (Khi bài toán cho sẵn phương trình)
Nếu hệ $A'x=b'$ có nghiệm nhưng các hàng phụ thuộc tuyến tính, bỏ các hàng phụ thuộc không làm đổi tập nghiệm: mỗi hàng bỏ đi là tổ hợp của các hàng giữ lại, và vì hệ có nghiệm, vế phải tương ứng là cùng tổ hợp đó (lập luận ở phần chuẩn bị của chứng minh Định lý 03.15). Sau bước này, giả thiết hạng của Định nghĩa 07.7 thỏa. Ví dụ, hệ $x_1+x_2=2$, $2x_1+2x_2=4$ thu về một phương trình $x_1+x_2=2$.
:::

::: example Ví dụ 07.7 (Dạng chuẩn của bài toán hộp hạt)
**Dữ kiện.** Bài toán hộp hạt: cực đại $2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$.

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
\bar A=\begin{bmatrix}1&0&1&0&0\\0&1&0&1&0\\1&2&0&0&1\end{bmatrix}=\begin{bmatrix}A&I\end{bmatrix},\qquad b=\begin{bmatrix}30\\20\\54\end{bmatrix},
$$

với $A$ là ma trận $3\times2$ của Ví dụ 07.3. Dạng chuẩn có $m=3$, $n=5$ và $\operatorname{rank}(\bar A)=3$ nhờ ba cột đơn vị. Mục tiêu giữ nguyên với $c=(2,3,0,0,0)$, vì biến bù không đóng góp vào lợi ích.

**Đọc biến bù.** $s_1=30-x_1$ và $s_2=20-x_2$ là phần sản lượng tối đa chưa dùng, tính bằng nghìn hộp; $s_3=54-x_1-2x_2$ là số giờ máy còn trống.

- Tại đỉnh $(30,12)$: $(s_1,s_2,s_3)=(0,8,0)$. Hai biến bù bằng $0$ ứng với hai ràng buộc hoạt động $x_1=30$ và $x_1+2x_2=54$, cắt nhau tại đỉnh; giới hạn loại 2 còn dư $8$ nghìn hộp.
- Tại đỉnh $(0,0)$: hai biến bằng $0$ là $x_1$, $x_2$, và $(s_1,s_2,s_3)=(30,20,54)$.

**Cạnh và biến bằng không.** Mỗi cạnh của ngũ giác nằm trên một đường mà một trong năm biến bằng $0$: $s_1=0$ trên $x_1=30$, $s_2=0$ trên $x_2=20$, $s_3=0$ trên đường giờ máy, $x_1=0$ và $x_2=0$ trên hai trục. Trên hình sau, hai cạnh tô đậm nằm trên $x_1=30$ ($s_1=0$) và $x_1+2x_2=54$ ($s_3=0$); chúng cắt nhau tại đỉnh $(30,12)$, nơi hai biến bù này cùng bằng $0$.

![Ngũ giác khả thi của bài toán hộp hạt với năm đỉnh (0,0), (30,0), (30,12), (14,20), (0,20). Mỗi cạnh ghi ràng buộc thỏa với dấu bằng và biến bằng 0: x2 = 0 ở cạnh dưới; x1 = 30, tức s1 = 0, ở cạnh phải; x1 + 2x2 = 54, tức s3 = 0, ở cạnh xiên; x2 = 20, tức s2 = 0, ở cạnh trên; x1 = 0 ở cạnh trái. Hai cạnh x1 = 30 và x1 + 2x2 = 54 tô đậm, cắt nhau tại đỉnh (30,12).](img/lec-07/pentagon-edge-labels.svg)

**Kiểm tra lại.** Tại $(30,12)$: $s_3=54-30-24=0$ và $s_2=20-12=8$. Ma trận $\bar A$ nhân $(30,12,0,8,0)$ cho $(30,20,54)=b$.
:::

Trong Ví dụ 07.7, mỗi đỉnh ứng với việc cho $5-3=2$ biến bằng $0$, và ba biến còn lại được xác định từ ba phương trình khi ma trận $3\times3$ tương ứng khả nghịch. Ở Mục 2.3, chúng ta phát biểu quy trình này cho mọi hệ dạng chuẩn.

**Trong học máy.** Bộ giải quy hoạch tuyến tính tự thêm biến bù, và giá trị biến bù ở nghiệm cho biết tài nguyên nào còn dư; trong Tình huống 07.2, biến bù bằng $0$ chỉ ra ngân sách đã dùng hết. Mệnh đề 07.8(d) bảo đảm nghiệm đọc ngược về bài toán ban đầu bằng $\psi$ là nghiệm đúng.

### 2.3 Nghiệm cơ sở khả thi

Một cách trực quan, với hệ dạng chuẩn gồm $m$ phương trình và $n$ biến, ta cho $n-m$ biến bằng $0$ rồi giải $m$ biến còn lại từ một hệ vuông. Mô tả này chưa phải định nghĩa, vì quy trình có thể không thực hiện được ở hai bước: hệ vuông có thể suy biến, và nghiệm có thể có thành phần âm. Định nghĩa sau nêu đủ hai điều kiện để quy trình cho đúng một điểm khả thi.

::: definition Định nghĩa 07.10 (Cơ sở, nghiệm cơ sở, nghiệm cơ sở khả thi)
Cho $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$ với $A\in\mathbb R^{m\times n}$, $\operatorname{rank}(A)=m$.

**Cơ sở.** Một tập chỉ số $B\subseteq\{1,\ldots,n\}$ với $\lvert B\rvert=m$ là một cơ sở nếu ma trận $A_B\in\mathbb R^{m\times m}$ gồm các cột $A_j$, $j\in B$, khả nghịch. Đặt $B^{\mathrm c}=\{1,\ldots,n\}\setminus B$. Biến $x_j$ với $j\in B$ là biến cơ sở (basic variable), với $j\in B^{\mathrm c}$ là biến ngoài cơ sở (nonbasic variable).

**Nghiệm cơ sở.** Vector $x\in\mathbb R^n$ với

$$
x_B=A_B^{-1}b,\qquad x_{B^{\mathrm c}}=0
\tag{2.3}
$$

là nghiệm cơ sở ứng với $B$.

**Nghiệm cơ sở khả thi.** Nếu thêm $x_B\ge0$, nghiệm cơ sở là nghiệm cơ sở khả thi (basic feasible solution).

**Suy biến.** Nghiệm cơ sở khả thi là suy biến (degenerate) nếu có ít nhất một thành phần của $x_B$ bằng $0$.
:::

Công thức (2.3) có nghĩa như sau. Khi đặt các biến ngoài cơ sở bằng $0$, hệ $Ax=b$ thu về $A_Bx_B=b$, và do $A_B$ vuông, khả nghịch nên hệ có nghiệm duy nhất $x_B=A_B^{-1}b$. Nghiệm cơ sở luôn thỏa $Ax=b$, nên chỉ còn điều kiện $x\ge0$ phải kiểm tra.

Có ba nhầm lẫn thường gặp với định nghĩa này.

- Giả thiết hạng bảo đảm có ít nhất một cơ sở, nhưng không bảo đảm mọi tập $m$ cột đều khả nghịch.
- Khả nghịch chưa bảo đảm khả thi: vẫn phải kiểm tra $A_B^{-1}b\ge0$.
- Suy biến không có nghĩa bài toán vô nghiệm hay điểm không xác định; nó có nghĩa điểm có ít hơn $m$ thành phần dương, và một điểm như vậy có thể ứng với nhiều cơ sở.

Số tập $B$ có $m$ phần tử là $\binom nm$, và mỗi tập cho nhiều nhất một nghiệm cơ sở, nên một hệ dạng chuẩn chỉ có hữu hạn nghiệm cơ sở. Với bài toán hộp hạt, ma trận của định nghĩa là $\bar A\in\mathbb R^{3\times5}$, không phải ma trận $3\times2$ của mô hình gốc, và có $\binom53=10$ cách chọn $B$.

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

Ba biến cơ sở đều dương: đây là nghiệm cơ sở khả thi không suy biến $(30,12,0,8,0)$, ứng với đỉnh $(30,12)$.

**Cơ sở $B=\{1,2,5\}$, tức các cột của $x_1$, $x_2$, $s_3$.** Ma trận $A_B$ tam giác dưới với đường chéo $1,1,1$, nên $\det(A_B)=1$. Đặt $s_1=s_2=0$: $x_1=30$, $x_2=20$, $s_3=54-70=-16$, một giá trị âm. Đây là nghiệm cơ sở nhưng không khả thi: điểm $(30,20)$ là giao của hai đường $x_1=30$, $x_2=20$ và nằm ngoài miền vì dùng vượt $16$ giờ máy so với giới hạn.

**Kiểm tra lại.** $\bar A(30,12,0,8,0)^T=(30,20,54)^T$ và $\bar A(30,20,0,0,-16)^T=(30,20,54)^T$: cả hai thỏa $\bar Ax=b$, chỉ điểm thứ hai vi phạm $x\ge0$.
:::

Định thức khác $0$ bảo đảm nghiệm cơ sở tồn tại, còn dấu của $x_B$ quyết định tính khả thi. Về mặt hình học, mỗi nghiệm cơ sở của hệ hộp hạt là giao của hai đường biên, và chỉ giao điểm nằm trong ngũ giác mới là đỉnh.

::: example Ví dụ 07.9 (Một nghiệm cơ sở khả thi suy biến)
**Dữ kiện.** Hệ $x_1+x_3=1$, $x_2+x_4=0$, $x\in\mathbb R^4$, $x\ge0$; ma trận có hai hàng độc lập, nên $m=2$, $n=4$.

**Cơ sở $B=\{1,2\}$.** $A_B=I$, nên $x_1=1$, $x_2=0$; nghiệm cơ sở là $(1,0,0,0)$. Biến cơ sở $x_2$ bằng $0$, nên nghiệm cơ sở khả thi này suy biến.

**Cơ sở $B=\{1,4\}$.** $A_B$ có hai cột $(1,0)^T$, $(0,1)^T$, khả nghịch. Đặt $x_2=x_3=0$: $x_1=1$, $x_4=0$, cho cùng điểm $(1,0,0,0)$.

**Kiểm tra lại.** Phương trình thứ hai cùng với $x_2,x_4\ge0$ buộc $x_2=x_4=0$ tại mọi điểm khả thi; miền khả thi là đoạn $\{(x_1,0,1-x_1,0)\mid0\le x_1\le1\}$, có hai đầu mút $(1,0,0,0)$ và $(0,0,1,0)$.
:::

Trong Ví dụ 07.9, một điểm ứng với hai cơ sở, và đây là đặc trưng của suy biến: khi một biến cơ sở bằng $0$, ta thường đổi được nó với một biến ngoài cơ sở mà điểm không đổi. Hệ quả của hiện tượng này đối với phép kiểm tra tối ưu và đối với phương pháp đơn hình được trình bày ở Mục 5.1 và Mục 5.4.

::: exercise Bài tập 07.3 (Đưa về dạng chuẩn khi có ràng buộc $\ge$ và biến tự do)
Xét bài toán cực đại $3x_1+x_2$ dưới các ràng buộc $x_1-x_2\ge2$, $x_1+x_2\le6$, $x_1\ge0$, còn $x_2$ là biến tự do.

- (a) Viết bài toán ở dạng chuẩn (2.2), nêu ma trận, vế phải và số biến.
- (b) Kiểm tra tính khả thi của phương án $(x_1,x_2)=(4,-1)$ và viết một điểm của dạng chuẩn ứng với nó.
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

::: exercise Bài tập 07.4 (Mười cách chọn cơ sở của bài toán hộp hạt)
Hệ dạng chuẩn của bài toán hộp hạt, thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$: $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm.

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

Năm nghiệm cơ sở khả thi ứng đúng năm đỉnh, mỗi đỉnh một cơ sở. Ba nghiệm cơ sở không khả thi là ba giao điểm nằm ngoài ngũ giác: $(30,20)$, $(54,0)$, $(0,27)$. Trên hình sau, mỗi nghiệm cơ sở là giao của hai đường biên: chấm đặc là năm nghiệm cơ sở khả thi, chấm rỗng là ba nghiệm cơ sở không khả thi.

![Ngũ giác khả thi của bài toán hộp hạt cùng ba đường biên kéo dài x1 = 30, x2 = 20, x1 + 2x2 = 54. Năm chấm đặc tại (0,0), (30,0), (30,12), (14,20), (0,20) là nghiệm cơ sở khả thi, cũng là năm đỉnh. Ba chấm rỗng tại (30,20), (54,0), (0,27) là nghiệm cơ sở không khả thi, nằm ngoài miền.](img/lec-07/basic-solutions-boxes.svg)

**Câu (c).** Tập $\{x_1,s_1,s_3\}$ đặt $x_2=s_2=0$, tức hai đường song song $x_2=0$ và $x_2=20$; tập $\{x_2,s_2,s_3\}$ đặt $x_1=s_1=0$, tức hai đường song song $x_1=0$ và $x_1=30$. Về đại số, ở tập thứ nhất cả ba cột có hàng thứ hai bằng $0$.

**Câu (d).** Không nghiệm nào suy biến: ở cả năm nghiệm cơ sở khả thi, ba biến cơ sở đều dương, chẳng hạn $(14,20,16)$ tại đỉnh $(14,20)$ và $(30,20,54)$ tại $(0,0)$. Về hình học, mỗi đỉnh của ngũ giác có đúng hai ràng buộc hoạt động.

**Kiểm tra lại.** Tại $(14,20,16,0,0)$: $14+16=30$, $20+0=20$, $14+40+0=54$. Tại $(0,27,30,-7,0)$: $27-7=20$ và $54+0=54$.
:::

Tóm lại, chúng ta đã chứng minh $z^*=96$ cho bài toán hộp hạt bằng một tổ hợp không âm của các ràng buộc (Ví dụ 07.5). Để thay phép đoán ràng buộc hoạt động bằng một quy trình, chúng ta mô tả miền khả thi như một đa diện lồi (Định nghĩa 07.5, Mệnh đề 07.6). Sau đó, mọi quy hoạch tuyến tính được đưa về dạng chuẩn (Định nghĩa 07.7, Mệnh đề 07.8). Trên dạng chuẩn, mỗi điểm ứng viên được tính từ một hệ vuông (Định nghĩa 07.10), và ta có một quy trình đại số hữu hạn sinh ứng viên.

Tuy nhiên, quan hệ giữa nghiệm cơ sở khả thi và đỉnh mới được kiểm tra trên một hình hai chiều.

## 3. Điểm cực biên và nghiệm cơ sở khả thi

Ở Mục 2, chúng ta đã thấy năm nghiệm cơ sở khả thi của bài toán hộp hạt trùng với năm đỉnh của ngũ giác. Điều đó mới được kiểm tra trực quan trên một hình phẳng, trong khi điểm $(30,12,0,8,0)$ của dạng chuẩn nằm trong $\mathbb R^5$. Để dùng được quan hệ này khi không còn vẽ được hình, chúng ta cần trả lời ba câu hỏi: định nghĩa đỉnh thế nào cho mọi số chiều, vì sao nghiệm cơ sở khả thi và đỉnh trùng nhau, và đa diện nào có đỉnh. Câu hỏi cuối là cần thiết vì nửa mặt phẳng $\{x\in\mathbb R^2\mid x_2\ge0\}$ không có đỉnh nào.

### 3.1 Điểm cực biên

Về mặt hình học, đỉnh của một miền lồi là điểm không nằm giữa hai điểm khác nhau của miền. Một điểm trên cạnh, không phải đầu mút, nằm giữa hai điểm khác của cạnh đó, còn một điểm bên trong nằm giữa hai điểm của một đoạn ngắn đi qua nó. Mô tả này mới là trực giác, chưa phải định nghĩa.

![Ngũ giác khả thi của bài toán hộp hạt. Đỉnh có nhãn v = (30,12), ghi "điểm cực biên". Điểm có nhãn u = (30,6) nằm trên cạnh thẳng đứng x1 = 30, ghi u = ½(30,0) + ½(30,12). Điểm có nhãn w ở bên trong ngũ giác là trung điểm của một đoạn nằm ngang.](img/lec-07/extreme-point-def.svg)

Hình đánh dấu ba điểm trên miền hộp hạt; hai nhãn $u$, $w$ chỉ là tên điểm trên hình, và văn bản gọi các điểm đó bằng tọa độ. Điểm có nhãn $u$, tức $(30,6)$, là trung điểm của hai điểm khác nhau $(30,0)$ và $(30,12)$ của miền. Điểm có nhãn $w$, tức $(10,10)$, là trung điểm của đoạn nằm ngang từ $(6,10)$ đến $(14,10)$. Đỉnh $v=(30,12)$ không là trung điểm của đoạn nào trong miền, và định nghĩa sau làm chính xác tính chất đó.

::: definition Định nghĩa 07.11 (Điểm cực biên)
Cho tập lồi $C\subseteq\mathbb R^n$. Điểm $v\in C$ là một điểm cực biên (extreme point) của $C$ nếu từ

$$
v=\lambda x'+(1-\lambda)x'',\qquad x',x''\in C,\quad0<\lambda<1
\tag{3.1}
$$

suy ra $x'=x''=v$. Trong chương này, "đỉnh" (vertex) là tên gọi khác của điểm cực biên.
:::

Trong định nghĩa trên, điều kiện $0<\lambda<1$ đòi $v$ nằm thật sự giữa $x'$ và $x''$. Với $\lambda=0$ hoặc $\lambda=1$, đẳng thức (3.1) thỏa tầm thường khi chọn $x''=v$ hoặc $x'=v$, nên hai giá trị đó bị loại. Để chứng minh $v$ không phải điểm cực biên, chỉ cần một cặp điểm $x'\ne x''$ của $C$ và một $\lambda\in(0,1)$ thỏa (3.1); chọn $\lambda=\tfrac12$ thường đủ.

Điểm cực biên là tính chất hình học của tập $C$, không phụ thuộc hàm mục tiêu. Nó khác khái niệm cực đại hay cực tiểu của một hàm ở Định nghĩa 01.13: điểm $(0,0)$ là điểm cực biên của ngũ giác hộp hạt, đồng thời là điểm có giá trị mục tiêu nhỏ nhất.

Một tập lồi có thể có vô số điểm cực biên, chẳng hạn mọi điểm $v$ trên đường tròn biên của hình tròn đơn vị đều là điểm cực biên. Nếu $v=\lambda x'+(1-\lambda)x''$ với $\lVert x'\rVert,\lVert x''\rVert\le1$ và $0<\lambda<1$ thì

$$
\begin{aligned}
1=\lVert v\rVert&\le\lambda\lVert x'\rVert+(1-\lambda)\lVert x''\rVert\\
&\le1 ,
\end{aligned}
$$

nên cả hai bất đẳng thức là đẳng thức. Bất đẳng thức thứ hai buộc $\lVert x'\rVert=\lVert x''\rVert=1$; bất đẳng thức thứ nhất là bất đẳng thức tam giác, và với chuẩn Euclid nó chỉ xảy ra dấu bằng khi $x'$, $x''$ cùng hướng. Hai vector cùng hướng, cùng chuẩn $1$ thì bằng nhau, nên $x'=x''=v$; tính chất này gọi là chuẩn Euclid lồi chặt.

::: example Ví dụ 07.10 (Kiểm tra điểm cực biên trên ngũ giác hộp hạt)
**Dữ kiện.** Miền hộp hạt $P$: $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$. Ba điểm $v=(30,12)$, $(30,6)$, $(10,10)$.

**Điểm $(30,6)$.** $(30,6)=\tfrac12(30,0)+\tfrac12(30,12)$, với $(30,0)$ và $(30,12)$ khác nhau và thuộc $P$. Điểm này không phải điểm cực biên.

**Điểm $(10,10)$.** $(10,10)=\tfrac12(6,10)+\tfrac12(14,10)$. Hai điểm thuộc $P$: tại $(14,10)$, $14+20=34\le54$; tại $(6,10)$, $6+20=26\le54$. Điểm này không phải điểm cực biên.

**Điểm $v=(30,12)$.** Giả sử $v=\lambda x'+(1-\lambda)x''$ với $x',x''\in P$, $0<\lambda<1$.

- Tọa độ thứ nhất: $x_1'\le30$, $x_1''\le30$ và $\lambda x_1'+(1-\lambda)x_1''=30$. Nếu một trong hai số nhỏ hơn $30$, tổ hợp với hệ số dương nhỏ hơn $30$; vậy $x_1'=x_1''=30$.
- Ràng buộc giờ máy: $x_1'+2x_2'\le54$, $x_1''+2x_2''\le54$ và tổ hợp bằng $30+24=54$. Cùng lập luận cho $x_1'+2x_2'=x_1''+2x_2''=54$, nên $x_2'=x_2''=12$.

Vậy $x'=x''=v$, và $v$ là điểm cực biên.

**Kiểm tra lại.** Lập luận cho $v$ dùng đúng hai ràng buộc hoạt động tại $v$, có hàng $(1,0)$ và $(1,2)$ độc lập tuyến tính. Tại $(30,6)$ chỉ có một ràng buộc hoạt động, $x_1=30$.
:::

### 3.2 Tiêu chuẩn hạng của các ràng buộc hoạt động

Định nghĩa 07.11 không cho cách kiểm tra trực tiếp, vì nó đòi xét mọi cặp điểm của tập. Lập luận cho $v=(30,12)$ trong Ví dụ 07.10 gợi ý một cách kiểm tra khác: ràng buộc thỏa với dấu bằng tại $v$ cũng phải thỏa với dấu bằng tại hai điểm hai bên, và hai ràng buộc độc lập như vậy đủ để xác định một điểm duy nhất trong mặt phẳng. Để viết gợi ý này thành phép kiểm tra, trước hết ta gọi tên các ràng buộc thỏa với dấu bằng theo định nghĩa sau.

::: definition Định nghĩa 07.12 (Ràng buộc hoạt động)
Cho đa diện $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với hàng $a_i^T$, $i=1,\ldots,m$, và $x\in P$. Ràng buộc thứ $i$ hoạt động (active constraint) tại $x$ nếu $a_i^Tx=b_i$. Tập chỉ số các ràng buộc hoạt động là

$$
\mathcal I(x)=\{i\mid a_i^Tx=b_i\}.
$$
:::

Ràng buộc không hoạt động có độ dư (slack) $b_i-a_i^Tx>0$; một bước đủ ngắn theo hướng bất kỳ giữ nó thỏa. Ràng buộc hoạt động thì không như vậy: mọi bước theo hướng $d$ với $a_i^Td>0$ đều vi phạm nó. Với dạng (1.1) của bài toán hộp hạt viết thành năm hàng, tập chỉ số hoạt động tại $(30,12)$ là hai hàng $x_1\le30$ và $x_1+2x_2\le54$.

Tiêu chuẩn đại số cho điểm cực biên của một đa diện được phát biểu trong định lý sau. Chứng minh chỉ cần Định nghĩa 07.11, Định nghĩa 07.12 và một sự kiện của đại số tuyến tính: một hệ $n$ phương trình độc lập tuyến tính trong $\mathbb R^n$ có nhiều nhất một nghiệm.

::: theorem Định lý 07.13 (Tiêu chuẩn hạng cho điểm cực biên)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với hàng $a_1^T,\ldots,a_m^T$; $x\in P$.

**Kết luận.** $x$ là điểm cực biên của $P$ khi và chỉ khi họ $\{a_i\mid i\in\mathcal I(x)\}$ có hạng $n$, tức trong các ràng buộc hoạt động tại $x$ có $n$ ràng buộc với hàng độc lập tuyến tính.

**Điều kiện áp dụng.** $P$ cho bởi hữu hạn bất phương trình; phương trình được viết thành hai bất phương trình.

**Phạm vi.** Định lý nói về điểm của $P$. Một điểm ngoài $P$ có thể thỏa $n$ phương trình độc lập, như $(30,20)$ của bài toán hộp hạt, mà không phải điểm cực biên.
:::

::: proof Chứng minh Định lý 07.13
**Bước 1 (hạng $n$ kéo theo điểm cực biên).** Giả sử họ $\{a_i\mid i\in\mathcal I(x)\}$ có hạng $n$ và $x=\lambda x'+(1-\lambda)x''$ với $x',x''\in P$, $0<\lambda<1$. Với mỗi $i\in\mathcal I(x)$, hai bất đẳng thức $a_i^Tx'\le b_i$, $a_i^Tx''\le b_i$ và

$$
\lambda a_i^Tx'+(1-\lambda)a_i^Tx''=a_i^Tx=b_i .
$$

Nếu một trong hai số $a_i^Tx'$, $a_i^Tx''$ nhỏ hơn $b_i$, tổ hợp với hai hệ số dương nhỏ hơn $b_i$, mâu thuẫn. Vậy $x'$ và $x''$ cùng là nghiệm của hệ $\{a_i^T\zeta=b_i\mid i\in\mathcal I(x)\}$ với ẩn $\zeta\in\mathbb R^n$. Hệ này có hạng $n$ nên có nhiều nhất một nghiệm, và $x$ là một nghiệm, nên $x'=x''=x$.

**Bước 2 (hạng nhỏ hơn $n$ kéo theo không phải điểm cực biên).** Giả sử họ có hạng nhỏ hơn $n$. Theo phần đại số tuyến tính của mục "Kiến thức tiên quyết", có $d\ne0$ với $a_i^Td=0$ cho mọi $i\in\mathcal I(x)$. Với $i\notin\mathcal I(x)$, độ dư $b_i-a_i^Tx$ dương; chọn $\varepsilon>0$ đủ nhỏ để $\varepsilon\lvert a_i^Td\rvert<b_i-a_i^Tx$ với mọi $i\notin\mathcal I(x)$, điều làm được vì chỉ có hữu hạn chỉ số. Khi đó $x\pm\varepsilon d\in P$:

- với $i\in\mathcal I(x)$: $a_i^T(x\pm\varepsilon d)=b_i$;
- với $i\notin\mathcal I(x)$: $a_i^T(x\pm\varepsilon d)\le a_i^Tx+\varepsilon\lvert a_i^Td\rvert<b_i$.

Vì $x=\tfrac12(x+\varepsilon d)+\tfrac12(x-\varepsilon d)$ với hai điểm khác nhau của $P$, $x$ không phải điểm cực biên. $\square$
:::

Định lý 07.13 cho thấy một điểm của đa diện là đỉnh khi và chỉ khi có $n$ ràng buộc hoạt động độc lập tại điểm đó, tức điểm là nghiệm duy nhất của hệ phương trình ứng với các ràng buộc hoạt động. Bước 1 của chứng minh dùng hai giả thiết, hệ số tổ hợp dương và điểm thuộc $P$, còn Bước 2 dùng tính hữu hạn của số ràng buộc để chọn được một $\varepsilon$ chung.

So với Định nghĩa 07.11, định lý thay một điều kiện trên mọi cặp điểm của tập bằng một phép tính hạng trên hữu hạn hàng. Lập luận cho $v=(30,12)$ ở Ví dụ 07.10 là trường hợp $n=2$ của Bước 1.

Một điểm có thể có nhiều hơn $n$ ràng buộc hoạt động. Chẳng hạn miền $x_1+x_2\le100$, $3x_1+x_2\le180$, $x_2\le60$, $x\ge0$ của Tình huống 07.2 có đỉnh $(40,60)$, nơi cả ba ràng buộc đầu hoạt động: $40+60=100$, $120+60=180$, $60=60$. Định lý vẫn áp dụng vì chỉ cần hạng bằng $n=2$. Đỉnh như vậy là đỉnh suy biến theo nghĩa hình học, và ở Mục 3.3, chúng ta nối nó với khái niệm suy biến của Định nghĩa 07.10.

Từ Định lý 07.13, ta suy ra ngay tập điểm cực biên của một đa diện là hữu hạn, như hệ quả sau.

::: corollary Hệ quả 07.14 (Đa diện có hữu hạn điểm cực biên)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ với $m$ hàng.

**Kết luận.** Mỗi điểm cực biên của $P$ là nghiệm duy nhất của một hệ $a_i^Tx=b_i$, $i\in S$, với $S\subseteq\{1,\ldots,m\}$, $\lvert S\rvert=n$ và các hàng $a_i$, $i\in S$, độc lập tuyến tính. Do đó $P$ có nhiều nhất $\binom mn$ điểm cực biên.

**Điều kiện áp dụng.** Như Định lý 07.13.

**Phạm vi.** Cận $\binom mn$ thường lớn hơn nhiều so với số điểm cực biên thật; nó chỉ khẳng định tính hữu hạn.
:::

::: proof Chứng minh Hệ quả 07.14
**Bước 1 (chọn hệ $n$ phương trình).** Với điểm cực biên $v$, Định lý 07.13 cho $n$ chỉ số hoạt động có hàng độc lập; gọi tập đó là $S_v$. Hệ $a_i^Tx=b_i$, $i\in S_v$, có ma trận vuông khả nghịch nên có nghiệm duy nhất, và $v$ là nghiệm đó.

**Bước 2 (đếm).** Hai điểm cực biên khác nhau không thể có cùng tập $S$, vì $S$ xác định nghiệm duy nhất. Vậy số điểm cực biên không vượt số tập con $n$ phần tử của $\{1,\ldots,m\}$, tức $\binom mn$. $\square$
:::

Hệ quả 07.14 cho thấy tập ứng viên là hữu hạn, và đây là lý do đầu tiên để việc tìm kiếm trên các đỉnh có thể kết thúc. Hình tròn đơn vị không phải đa diện, nên việc nó có vô số điểm cực biên không mâu thuẫn với hệ quả.

**Trong học máy.** Định lý 07.13 cho một phép kiểm tra sau khi giải: lấy nghiệm do bộ giải trả về, liệt kê các ràng buộc hoạt động và tính hạng của chúng. Với hồi quy $L_1$ dạng (1.2), mỗi mẫu có phần dư bằng $0$ góp hai ràng buộc hoạt động, nên một nghiệm đỉnh phải nội suy đủ nhiều mẫu; Mệnh đề 07.25 ở Mục 4 làm chính xác điều này.

::: example Ví dụ 07.11 (Tiêu chuẩn hạng trên ba điểm)
**Dữ kiện.** Miền hộp hạt viết thành năm hàng: (1) $x_1\le30$; (2) $x_2\le20$; (3) $x_1+2x_2\le54$; (4) $-x_1\le0$; (5) $-x_2\le0$; ở đây $n=2$.

**Điểm $(30,12)$.** Hàng hoạt động: (1), (3), với $a_1=(1,0)$, $a_3=(1,2)$ độc lập. Hạng $2=n$: điểm cực biên.

**Điểm $(30,6)$.** Chỉ hàng (1) hoạt động; hạng $1<2$: không phải điểm cực biên, khớp Ví dụ 07.10.

**Điểm $(30,20)$.** Hàng (1), (2) độc lập và thỏa với dấu bằng, nhưng $30+40=70>54$: điểm không thuộc $P$, nên định lý không áp dụng.

**Liệt kê.** Mười cặp hàng cho tám giao điểm và hai cặp song song; năm giao điểm khả thi là năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$.

**Kiểm tra lại.** Ba giao điểm loại bỏ vi phạm một hàng: $(30,20)$ vi phạm (3), $(0,27)$ vi phạm (2), $(54,0)$ vi phạm (1). Bảng mười cơ sở của Bài tập 07.4 cho cùng danh sách.
:::

### 3.3 Đồng nhất giữa nghiệm cơ sở khả thi và điểm cực biên

Ví dụ 07.11 cho thấy trên bài toán hộp hạt, việc chọn $n$ ràng buộc hoạt động và việc chọn một cơ sở là cùng một phép chọn. Với dạng chuẩn, ràng buộc hoạt động có hai loại: các phương trình $Ax=b$ luôn hoạt động, và ràng buộc $x_j\ge0$ hoạt động khi $x_j=0$. Định lý sau phát biểu sự trùng khớp cho mọi đa diện dạng chuẩn, theo cách trình bày của Bertsimas và Tsitsiklis (1997, §2.2–2.3), và thêm một tiêu chuẩn thứ ba chỉ dùng các cột ứng với thành phần dương.

::: theorem Định lý 07.15 (Điểm cực biên, nghiệm cơ sở khả thi và các cột dương)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$ với $A\in\mathbb R^{m\times n}$, $\operatorname{rank}(A)=m$; $x\in P$. Đặt $\operatorname{supp}(x)=\{j\mid x_j>0\}$.

**Kết luận.** Ba khẳng định sau tương đương:

- (i) $x$ là điểm cực biên của $P$;
- (ii) $x$ là nghiệm cơ sở khả thi theo Định nghĩa 07.10;
- (iii) các cột $A_j$, $j\in \operatorname{supp}(x)$, độc lập tuyến tính.

**Điều kiện áp dụng.** Dạng chuẩn với giả thiết hạng; giả thiết hạng dùng ở chiều từ (iii) sang (ii).

**Phạm vi.** Định lý không nói mỗi điểm cực biên ứng với đúng một cơ sở; khi suy biến, một điểm cực biên có thể ứng với nhiều cơ sở (Ví dụ 07.9).
:::

::: proof Chứng minh Định lý 07.15
**Bước 1 (khẳng định (iii) kéo theo (i)).** Giả sử các cột trên $\operatorname{supp}(x)$ độc lập và $x=\lambda x'+(1-\lambda)x''$ với $x',x''\in P$, $0<\lambda<1$. Với $j\notin \operatorname{supp}(x)$, $x_j=0$ trong khi $x_j',x_j''\ge0$ và tổ hợp với hệ số dương bằng $0$, nên $x_j'=x_j''=0$. Vector $x'-x''$ do đó chỉ có thể khác $0$ trên $\operatorname{supp}(x)$, và

$$
\sum_{j\in \operatorname{supp}(x)}(x_j'-x_j'')A_j=A(x'-x'')=b-b=0 .
$$

Tính độc lập của các cột trên $\operatorname{supp}(x)$ buộc $x_j'=x_j''$ với mọi $j\in \operatorname{supp}(x)$, nên $x'=x''$, và do đó cả hai bằng $x$.

**Bước 2 (khẳng định (i) kéo theo (iii)).** Giả sử các cột trên $\operatorname{supp}(x)$ phụ thuộc tuyến tính: có các số $d_j$, $j\in \operatorname{supp}(x)$, không đồng thời bằng $0$, với $\sum_{j\in \operatorname{supp}(x)}d_jA_j=0$. Đặt $d_j=0$ cho $j\notin \operatorname{supp}(x)$, được $d\in\mathbb R^n$, $d\ne0$, $Ad=0$. Chọn $\varepsilon>0$ với $\varepsilon\lvert d_j\rvert<x_j$ cho mọi $j\in \operatorname{supp}(x)$. Khi đó $x\pm\varepsilon d$ thỏa $A(x\pm\varepsilon d)=b$ và không âm, vì thành phần dương vẫn dương và thành phần bằng $0$ không đổi. Điểm $x$ là trung điểm của hai điểm khác nhau của $P$, nên không phải điểm cực biên.

**Bước 3 (khẳng định (ii) kéo theo (iii)).** Nếu $x$ là nghiệm cơ sở khả thi theo cơ sở $B$, thì $x_j=0$ ngoài $B$, nên $\operatorname{supp}(x)\subseteq B$. Các cột của $A_B$ độc lập vì $A_B$ khả nghịch, và một họ con của họ độc lập cũng độc lập.

**Bước 4 (khẳng định (iii) kéo theo (ii)).** Giả sử các cột trên $\operatorname{supp}(x)$ độc lập. Vì $\operatorname{rank}(A)=m$, các cột của $A$ sinh $\mathbb R^m$, nên bổ sung được các cột khác vào họ đó cho tới khi được $m$ cột độc lập; gọi tập chỉ số thu được là $B\supseteq \operatorname{supp}(x)$. Khi đó $A_B$ khả nghịch, $x_j=0$ với $j\in B^{\mathrm c}$ vì $B^{\mathrm c}\cap \operatorname{supp}(x)=\varnothing$, và $Ax=b$ thu về $A_Bx_B=b$, tức $x_B=A_B^{-1}b$. Vì $x\ge0$, đây là nghiệm cơ sở khả thi. $\square$
:::

Định lý 07.15 nối khái niệm hình học (điểm cực biên) với khái niệm tính toán (nghiệm cơ sở khả thi) qua một phép kiểm tra trung gian chỉ cần hạng của vài cột. Giả thiết hạng $\operatorname{rank}(A)=m$ chỉ được dùng ở Bước 4, để bổ sung đủ $m$ cột. Nếu bỏ giả thiết đó thì có thể không tồn tại cơ sở nào, dù điểm cực biên vẫn có.

So với Định lý 07.13, định lý này là trường hợp riêng cho đa diện dạng chuẩn, viết theo ngôn ngữ cột thay cho hàng. Hai cách nói tương đương: tại $x$, các ràng buộc hoạt động gồm $m$ phương trình và $n-\lvert \operatorname{supp}(x)\rvert$ ràng buộc $x_j=0$, và họ đó có hạng $n$ đúng khi các cột trên $\operatorname{supp}(x)$ độc lập. Từ các khẳng định (ii) và (iii), ta có ngay hai phép đếm trong hệ quả sau.

::: corollary Hệ quả 07.16 (Số thành phần dương và số điểm cực biên của dạng chuẩn)
**Giả thiết.** Như Định lý 07.15.

**Kết luận.** Mỗi điểm cực biên của $P$ có nhiều nhất $m$ thành phần dương, và $P$ có nhiều nhất $\binom nm$ điểm cực biên.

**Điều kiện áp dụng.** Như Định lý 07.15.

**Phạm vi.** Một điểm có không quá $m$ thành phần dương chưa chắc là điểm cực biên; cần các cột tương ứng độc lập.
:::

::: proof Chứng minh Hệ quả 07.16
**Bước 1 (thành phần dương).** Theo khẳng định (iii) của Định lý 07.15, các cột trên $\operatorname{supp}(x)$ là các vector độc lập trong $\mathbb R^m$, nên có nhiều nhất $m$ cột.

**Bước 2 (số điểm cực biên).** Theo khẳng định (ii), mỗi điểm cực biên là nghiệm cơ sở khả thi của ít nhất một cơ sở, và mỗi cơ sở cho nhiều nhất một nghiệm cơ sở. Số cơ sở không vượt $\binom nm$. $\square$
:::

::: example Ví dụ 07.12 (Kiểm tra điểm cực biên bằng cột dương)
**Dữ kiện.** Hệ dạng chuẩn của bài toán hộp hạt, cột theo thứ tự $(x_1,x_2,s_1,s_2,s_3)$: $A_1=(1,0,1)^T$, $A_2=(0,1,2)^T$, $A_3=(1,0,0)^T$, $A_4=(0,1,0)^T$, $A_5=(0,0,1)^T$, $b=(30,20,54)^T$.

**Điểm $(30,12,0,8,0)$.** $\operatorname{supp}(x)=\{1,2,4\}$. Ma trận gồm ba cột $A_1,A_2,A_4$ có định thức $-2\ne0$, nên ba cột độc lập và điểm là điểm cực biên, ứng với đỉnh $(30,12)$ của ngũ giác.

**Điểm $(15,6,15,14,27)$.** Điểm này khả thi: $15+15=30$, $6+14=20$, $15+12+27=54$. Có năm thành phần dương, nhiều hơn $m=3$, nên theo Hệ quả 07.16 nó không phải điểm cực biên; về hình học, $(15,6)$ nằm bên trong ngũ giác.

**Kiểm tra lại.** Với $d=(1,0,-1,0,-1)$, $\bar Ad=(1-1,0,1-1)^T=0$, và $(15,6,15,14,27)$ là trung điểm của hai điểm khả thi $(16,6,14,14,26)$ và $(14,6,16,14,28)$.
:::

::: remark Nhận xét 07.17 (Điểm cực biên là duy nhất, cơ sở thì không)
Theo Định lý 07.15, mỗi cơ sở khả thi cho một điểm cực biên và mỗi điểm cực biên có ít nhất một cơ sở; tương ứng là một-một khi không có suy biến, như bài toán hộp hạt. Khi suy biến, một điểm cực biên có thể ứng với nhiều cơ sở, như $(1,0,0,0)$ với $\{1,2\}$ và $\{1,4\}$ trong hệ $x_1+x_3=1$, $x_2+x_4=0$ của Ví dụ 07.9; một thuật toán đổi cơ sở khi đó có thể đổi cơ sở mà không di chuyển (Mục 5.4).
:::

**Trong học máy.** Tính thưa của nghiệm quy hoạch tuyến tính được giải thích bằng Hệ quả 07.16: một nghiệm cơ sở khả thi của bài toán có $m$ phương trình có nhiều nhất $m$ thành phần khác $0$, bất kể số biến. Chọn trọng số trộn $p\in\mathbb R^{100}$ cho $100$ nguồn dữ liệu dưới $\sum_jp_j=1$ và một ràng buộc ngân sách gán nhãn, viết thành đẳng thức nhờ một biến bù, cho $m=2$: một nghiệm đỉnh có nhiều nhất hai thành phần dương, tính cả biến bù. Tính thưa này thuộc về nghiệm đỉnh, không thuộc về mọi nghiệm tối ưu.

### 3.4 Sự tồn tại điểm cực biên

Nửa mặt phẳng $\{x\in\mathbb R^2\mid x_2\ge0\}$ không có điểm cực biên, vì điểm $(x_1,x_2)$ của nó là trung điểm của $(x_1-1,x_2)$ và $(x_1+1,x_2)$, cả hai đều thuộc miền. Trên miền như vậy, câu "có một đỉnh tối ưu" không thể đúng.

Về mặt trực quan, nửa mặt phẳng chứa trọn một đường thẳng nằm ngang, và từ mọi điểm có thể di chuyển dọc đường đó theo cả hai chiều mà vẫn ở trong miền. Ý này chưa phải định nghĩa, và khái niệm tập chứa một đường thẳng được phát biểu chính xác như sau.

::: definition Định nghĩa 07.18 (Tập chứa đường thẳng)
Tập $C\subseteq\mathbb R^n$ chứa một đường thẳng nếu có $x\in C$ và $d\in\mathbb R^n$, $d\ne0$, sao cho $x+\theta d\in C$ với mọi $\theta\in\mathbb R$.
:::

Định nghĩa đòi cả hai chiều $\theta>0$ và $\theta<0$. Một tia, tức chỉ $\theta\ge0$, không đủ: góc phần tư $\{x\ge0\}$ chứa tia $\{(\theta,0)\mid\theta\ge0\}$ nhưng không chứa đường thẳng nào, và có điểm cực biên $(0,0)$.

Chứng minh định lý tồn tại lặp lại nhiều lần cùng một thao tác: từ một điểm chưa phải điểm cực biên, ta đi theo một hướng giữ nguyên mọi ràng buộc hoạt động cho tới khi gặp một ràng buộc hoạt động mới. Ta tách thao tác đó thành bổ đề sau để dùng lại ở Mục 4.

::: lemma Bổ đề 07.19 (Bước tăng hạng)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$, $x\in P$. Vector $d\in\mathbb R^n$ thỏa $a_i^Td=0$ với mọi $i\in\mathcal I(x)$, và có ít nhất một chỉ số $j$ với $a_j^Td>0$.

**Kết luận.** Đặt

$$
\theta^*=\min\left\{\frac{b_j-a_j^Tx}{a_j^Td}\ \middle|\ a_j^Td>0\right\}.
\tag{3.2}
$$

Khi đó $\theta^*>0$, điểm $x'=x+\theta^*d$ thuộc $P$, mọi ràng buộc hoạt động tại $x$ vẫn hoạt động tại $x'$, và hạng của họ $\{a_i\mid i\in\mathcal I(x')\}$ lớn hơn hạng của họ $\{a_i\mid i\in\mathcal I(x)\}$ ít nhất $1$.

**Điều kiện áp dụng.** Cần ít nhất một $a_j^Td>0$; nếu mọi $a_j^Td\le0$ thì $x+\theta d\in P$ với mọi $\theta\ge0$ và không có ràng buộc mới nào hoạt động.

**Phạm vi.** Bổ đề không nói giá trị mục tiêu thay đổi thế nào; ở Mục 4, $d$ được chọn để mục tiêu không giảm.
:::

::: proof Chứng minh Bổ đề 07.19
**Bước 1 ($\theta^*>0$).** Nếu $a_j^Td>0$ thì $j\notin\mathcal I(x)$, vì mọi chỉ số hoạt động có $a_i^Td=0$. Do đó $b_j-a_j^Tx>0$ cho mọi $j$ trong (3.2), và cực tiểu của hữu hạn số dương là số dương.

**Bước 2 ($x'\in P$).** Với $a_j^Td\le0$: $a_j^Tx'=a_j^Tx+\theta^*a_j^Td$, không vượt $a_j^Tx$, và $a_j^Tx\le b_j$. Với $a_j^Td>0$: theo cách chọn $\theta^*$, $\theta^*a_j^Td\le b_j-a_j^Tx$, nên $a_j^Tx'\le b_j$.

**Bước 3 (ràng buộc cũ vẫn hoạt động).** Với $i\in\mathcal I(x)$: $a_i^Tx'=a_i^Tx+\theta^*\cdot0=b_i$.

**Bước 4 (hạng tăng).** Gọi $j^*$ là chỉ số đạt cực tiểu trong (3.2); khi đó $a_{j^*}^Tx'=b_{j^*}$, nên $j^*\in\mathcal I(x')$. Vector $a_{j^*}$ không thuộc không gian sinh bởi $\{a_i\mid i\in\mathcal I(x)\}$: mọi vector trong không gian đó vuông góc với $d$, còn $a_{j^*}^Td>0$. Thêm một vector ngoài không gian sinh vào một họ làm hạng tăng $1$. $\square$
:::

Trong Bổ đề 07.19, hướng $d$ giữ nguyên mọi ràng buộc đang hoạt động, và $\theta^*$ là độ dài bước tới ràng buộc mới đầu tiên trở thành hoạt động. Công thức (3.2) được gọi là phép thử tỉ số (ratio test), và ở Mục 5.2, ta dùng lại nó ở dạng chuẩn.

Với Định lý 07.13 và Bổ đề 07.19, chúng ta trả lời được câu hỏi đa diện nào có điểm cực biên bằng ba điều kiện tương đương trong định lý sau. Điều kiện thứ ba kiểm tra được bằng một phép tính hạng.

::: theorem Định lý 07.20 (Tồn tại điểm cực biên)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ khác rỗng.

**Kết luận.** Ba khẳng định sau tương đương:

- (i) $P$ có ít nhất một điểm cực biên;
- (ii) $P$ không chứa đường thẳng;
- (iii) $\operatorname{rank}(A)=n$.

**Điều kiện áp dụng.** $P$ khác rỗng và cho bởi hữu hạn bất phương trình.

**Phạm vi.** Định lý không nói số điểm cực biên, cũng không nói điểm cực biên nào tối ưu cho một mục tiêu.
:::

::: proof Chứng minh Định lý 07.20
**Bước 1 (đường thẳng trong $P$ và hạng).** Nếu $x+\theta d\in P$ với mọi $\theta\in\mathbb R$ thì $a_i^Tx+\theta a_i^Td\le b_i$ với mọi $\theta$. Nếu $a_i^Td\ne0$, chọn $\theta$ cùng dấu với $a_i^Td$ và đủ lớn thì bất đẳng thức sai; vậy $Ad=0$. Ngược lại, nếu $Ad=0$ với $d\ne0$ thì $a_i^T(x'+\theta d)=a_i^Tx'\le b_i$ với mọi $x'\in P$, $\theta\in\mathbb R$, nên $P$ chứa đường thẳng qua mọi điểm của nó. Do đó $P$ chứa đường thẳng khi và chỉ khi có $d\ne0$ với $Ad=0$, tức $\operatorname{rank}(A)<n$. Điều này cho (ii) tương đương (iii).

**Bước 2 (khẳng định (i) kéo theo (iii)).** Nếu $v$ là điểm cực biên, Định lý 07.13 cho $n$ hàng hoạt động độc lập tại $v$, nên $\operatorname{rank}(A)\ge n$; hạng không vượt số cột $n$.

**Bước 3 (khẳng định (iii) kéo theo (i): một bước).** Giả sử $\operatorname{rank}(A)=n$. Lấy $x\in P$ và gọi $\rho$ là hạng của họ hàng hoạt động tại $x$. Nếu $\rho=n$, $x$ là điểm cực biên theo Định lý 07.13. Nếu $\rho<n$, chọn $d\ne0$ vuông góc với mọi hàng hoạt động; vì $\operatorname{rank}(A)=n$, vector $Ad$ khác $0$, và đổi $d$ thành $-d$ nếu cần để có một $a_j^Td>0$.

**Bước 4 (lặp).** Bổ đề 07.19 cho điểm $x'\in P$ với hạng hàng hoạt động ít nhất $\rho+1$. Lặp lại từ $x'$; hạng tăng sau mỗi lần và không vượt $n$, nên sau nhiều nhất $n$ lần thu được một điểm có hạng $n$, tức một điểm cực biên. $\square$
:::

Định lý 07.20 cho ba cách kiểm tra cùng một tính chất, trong đó khẳng định (iii) dễ kiểm tra nhất, (ii) trực quan nhất, còn (i) là điều các kết quả về tối ưu cần. Bước 3 và Bước 4 của chứng minh còn cho một thủ tục: từ một điểm khả thi bất kỳ, sau nhiều nhất $n$ bước tăng hạng, ta thu được một điểm cực biên.

Giả thiết khác rỗng là cần thiết vì tập rỗng không chứa đường thẳng mà cũng không có điểm cực biên. Tính hữu hạn của số ràng buộc được dùng trong Bổ đề 07.19, để bảo đảm có một ràng buộc mới đầu tiên khi đi theo $d$. Áp dụng Định lý 07.20 cho hai lớp đa diện thường gặp, ta được hệ quả sau.

::: corollary Hệ quả 07.21 (Hai lớp đa diện luôn có điểm cực biên)
**Giả thiết.** (a) $P=\{x\in\mathbb R^n\mid Ax=b,\ x\ge0\}$ khác rỗng. (b) $P=\{x\in\mathbb R^n\mid Ax\le b\}$ khác rỗng và bị chặn.

**Kết luận.** Trong cả hai trường hợp, $P$ có ít nhất một điểm cực biên. Ở trường hợp (a), nếu thêm $\operatorname{rank}(A)=m$, điểm cực biên đó là một nghiệm cơ sở khả thi.

**Điều kiện áp dụng.** Như Định lý 07.20.

**Phạm vi.** Hệ quả không áp dụng cho đa diện tổng quát không bị chặn có biến tự do.
:::

::: proof Chứng minh Hệ quả 07.21
**Bước 1 (trường hợp (a)).** Theo Mệnh đề 07.6(b), $P$ là đa diện với các hàng gồm $-I$. Ma trận $-I$ có hạng $n$, nên khẳng định (iii) của Định lý 07.20 thỏa. Khi $\operatorname{rank}(A)=m$, Định lý 07.15 cho điểm cực biên đó là nghiệm cơ sở khả thi.

**Bước 2 (trường hợp (b)).** Nếu $P$ chứa đường $x+\theta d$ với $d\ne0$, thì $\lVert x+\theta d\rVert\ge\lvert\theta\rvert\lVert d\rVert-\lVert x\rVert\to\infty$, mâu thuẫn với tính bị chặn. Vậy khẳng định (ii) thỏa. $\square$
:::

Phần (a) là lý do dạng chuẩn được ưa dùng, vì mọi quy hoạch tuyến tính khả thi viết ở dạng chuẩn đều có đỉnh. Do đó, mọi kết quả "có một đỉnh tối ưu" ở Mục 4 áp dụng được sau khi chuyển dạng bằng Mệnh đề 07.8.

::: example Ví dụ 07.13 (Áp dụng tiêu chuẩn tồn tại và chạy bước tăng hạng)
**Dữ kiện.** Hai đa diện trong $\mathbb R^2$: nửa mặt phẳng $H=\{x\mid x_2\ge0\}$, viết thành một hàng $-x_2\le0$; và $P_1=\{x\mid x_1+x_2\ge1,\ x\ge0\}$, viết thành ba hàng (1) $-x_1-x_2\le-1$, (2) $-x_1\le0$, (3) $-x_2\le0$.

**Nửa mặt phẳng.** Ma trận một hàng $(0,-1)$ có hạng $1<2$, nên $H$ không có điểm cực biên theo Định lý 07.20. Hướng $d=(1,0)$ thỏa $Ad=0$ và cho đường thẳng nằm ngang qua mọi điểm.

**Đa diện $P_1$.** Ba hàng có hạng $2$, nên $P_1$ có điểm cực biên dù không bị chặn. Chạy Bước 3–4 của chứng minh từ $x=(2,3)$.

- Tại $(2,3)$ không có ràng buộc hoạt động, hạng $0$. Chọn $d=(-1,0)$: $a_1^Td=1$, $a_2^Td=1$. Theo (3.2), $\theta^*=\min\{\tfrac{-1+5}1,\tfrac{0+2}1\}=2$, cho $x'=(0,3)$, với hàng (2) hoạt động.
- Tại $(0,3)$, hạng $1$. Chọn $d=(0,-1)$, vuông góc với $a_2=(-1,0)$: $a_1^Td=1$, $a_3^Td=1$. Theo (3.2), $\theta^*=\min\{\tfrac{-1+3}1,\tfrac{0+3}1\}=2$, cho $x''=(0,1)$, với hàng (1), (2) hoạt động.

Hai hàng $(-1,-1)$ và $(-1,0)$ độc lập, nên $(0,1)$ là điểm cực biên.

**Kiểm tra lại.** $(0,1)$ thỏa $0+1=1\ge1$ với dấu bằng và $x_1=0$. Điểm cực biên còn lại của $P_1$ là $(1,0)$, giao của hàng (1) và (3).
:::

**Trong học máy.** Bài toán (1.2) của hồi quy $L_1$ có biến tự do $x$, nên Hệ quả 07.21 không áp dụng trực tiếp. Theo Định lý 07.20, miền của (1.2) có điểm cực biên khi và chỉ khi ma trận ràng buộc có hạng $n+M$, và Mệnh đề 07.25 chỉ ra điều này tương đương với việc $h_1,\ldots,h_M$ sinh $\mathbb R^n$. Khi hai đặc trưng tỉ lệ với nhau, điều kiện bị vi phạm, miền chứa đường thẳng và tham số tối ưu không duy nhất.

::: exercise Bài tập 07.5 (Dải phẳng và điểm cực biên)
Cho $P_2=\{x\in\mathbb R^2\mid -x_1+x_2\le1,\ x_1-x_2\le1\}$.

- (a) Chứng minh $P_2$ chứa một đường thẳng và không có điểm cực biên, bằng khẳng định (ii) và (iii) của Định lý 07.20.
- (b) Thêm ràng buộc $x_1\ge0$, được $P_3$. Xác định mọi điểm cực biên của $P_3$ bằng Định lý 07.13.
:::

::: hint
Ở (a), tìm $d\ne0$ với $-d_1+d_2=0$ và $d_1-d_2=0$. Ở (b), xét ba cặp hàng của $P_3$.
:::

::: solution
**Câu (a).** Ma trận có hai hàng $(-1,1)$ và $(1,-1)$, hạng $1<2$. Hướng $d=(1,1)$ thỏa $Ad=0$, nên $(0,0)+\theta(1,1)\in P_2$ với mọi $\theta$. Theo Định lý 07.20, $P_2$ không có điểm cực biên.

**Câu (b).** $P_3$ có ba hàng: (1) $-x_1+x_2\le1$, (2) $x_1-x_2\le1$, (3) $-x_1\le0$.

- Cặp (1), (2): hai hàng song song, không có giao điểm duy nhất.
- Cặp (1), (3): $x_1=0$, $x_2=1$; kiểm tra (2): $0-1=-1\le1$. Điểm $(0,1)$ là điểm cực biên.
- Cặp (2), (3): $x_1=0$, $x_2=-1$; kiểm tra (1): $0-1=-1\le1$. Điểm $(0,-1)$ là điểm cực biên.

**Kiểm tra lại.** Tại $(0,1)$: hàng (1) cho $-0+1=1$ và hàng (3) cho $0$, cả hai hoạt động; hai hàng $(-1,1)$, $(-1,0)$ độc lập. Tại $(0,-1)$: hàng (2) cho $0+1=1$, hàng (3) hoạt động; hai hàng $(1,-1)$, $(-1,0)$ độc lập.
:::

Xuất phát từ định nghĩa đỉnh bằng tổ hợp lồi (Định nghĩa 07.11), chúng ta đã đổi định nghĩa đó thành phép kiểm tra hạng các ràng buộc hoạt động (Định lý 07.13). Từ phép kiểm tra này, ta suy ra tập điểm cực biên là hữu hạn (Hệ quả 07.14). Với dạng chuẩn, các điểm cực biên chính là các nghiệm cơ sở khả thi (Định lý 07.15). Bổ đề 07.19 và Định lý 07.20 cho điều kiện để đa diện có điểm cực biên. Hệ quả 07.21, kết quả được dùng nhiều nhất về sau, khẳng định mọi dạng chuẩn khả thi và mọi đa diện khác rỗng, bị chặn đều có điểm cực biên.

Như vậy, chúng ta đã có một tập ứng viên hữu hạn và tính được bằng đại số. Tuy nhiên, chưa có kết quả nào bảo đảm có một nghiệm tối ưu thuộc tập này. Trong Mục 4, chúng ta chứng minh điều đó khi giá trị tối ưu hữu hạn và miền có điểm cực biên, rồi phân loại mọi quy hoạch tuyến tính thành bốn kết cục. Sau cùng, chúng ta nêu cách tìm điểm cực biên tối ưu mà không cần liệt kê mọi điểm cực biên.

## 4. Kết cục, điểm cực biên tối ưu và thuật toán duyệt đỉnh kề

Tập ứng viên của Mục 3 chưa gắn với tính tối ưu. Hai bài toán nhỏ cho thấy việc nối tập điểm cực biên với tính tối ưu cần giả thiết. Bài toán cực đại $x_1+x_2$ dưới $x_1+x_2\le2$, $x\ge0$ có nghiệm tối ưu $(1,1)$ không phải điểm cực biên, còn bài toán cực đại $x_1$ trên $P_1=\{x\mid x_1+x_2\ge1,\ x\ge0\}$ có điểm cực biên nhưng không có nghiệm tối ưu, vì $x_1$ tăng không bị chặn trên miền.

### 4.1 Tập nghiệm tối ưu

Bài toán thứ nhất ở trên cho thấy câu "nghiệm tối ưu là đỉnh" sai, và ví dụ sau tính đầy đủ bài toán đó.

![Tam giác khả thi với ba đỉnh (0,0), (2,0), (0,2) trong mặt phẳng x1, x2. Đường mức nét đứt z = 1 nằm bên trong tam giác. Đường mức z = 2 trùng cạnh nối (2,0) và (0,2). Điểm (1,1) được đánh dấu ở giữa cạnh đó. Mũi tên "tăng z" chỉ theo hướng (1,1).](img/lec-07/multiple-optima.svg)

::: example Ví dụ 07.14 (Cả một cạnh tối ưu)
**Dữ kiện.** Cực đại $z=x_1+x_2$ dưới $x_1+x_2\le2$, $x_1,x_2\ge0$.

**Điểm cực biên.** Miền là tam giác với ba điểm cực biên $(0,0)$, $(2,0)$, $(0,2)$; giá trị tại đó là $0$, $2$, $2$.

**Giá trị tối ưu.** Chính ràng buộc $x_1+x_2\le2$ cho $z\le2$ trên toàn miền, và $(2,0)$ đạt $2$. Vậy $z^*=2$, và tập nghiệm tối ưu là đoạn $\{x\mid x_1+x_2=2,\ x\ge0\}$.

**Một nghiệm không phải điểm cực biên.** $(1,1)$ thuộc đoạn này nên tối ưu, nhưng $(1,1)=\tfrac12(2,0)+\tfrac12(0,2)$ nên không phải điểm cực biên.

**Kiểm tra lại.** Tại $(\tfrac12,\tfrac32)$: $z=2$ và điểm là tổ hợp $\tfrac14(2,0)+\tfrac34(0,2)$, cũng tối ưu và không phải điểm cực biên.
:::

Đường mức nét đứt $z=1$ nằm bên trong tam giác, còn đường mức $z=2$ trùng một cạnh. Hiện tượng này xảy ra khi vector mục tiêu $c=(1,1)$ vuông góc với cạnh nằm trên đường mức xa nhất. Hình dạng của tập nghiệm tối ưu trong mọi trường hợp được mô tả trong mệnh đề sau.

::: proposition Mệnh đề 07.22 (Tập nghiệm tối ưu)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$, $c\in\mathbb R^n$, giá trị tối ưu $z^*=\sup_{x\in P}c^Tx$ hữu hạn.

**Kết luận.**

- (a) Tập nghiệm tối ưu $P^*=\{x\in P\mid c^Tx=z^*\}$ là một đa diện, do đó là tập lồi.
- (b) Nếu có hai nghiệm tối ưu khác nhau $x'$, $x''$ thì mọi điểm của đoạn nối chúng đều tối ưu; bài toán có vô số nghiệm tối ưu.

**Điều kiện áp dụng.** $z^*$ hữu hạn; $P^*$ có thể rỗng nếu chưa biết giá trị tối ưu được đạt (Định lý 07.26 chứng minh nó luôn được đạt).

**Phạm vi.** Mệnh đề không nói $P^*$ chứa điểm cực biên nào.
:::

::: proof Chứng minh Mệnh đề 07.22
**Bước 1 (phần (a)).** Vì $c^Tx\le z^*$ trên $P$, tập nghiệm viết được thành $P^*=\{x\mid Ax\le b,\ -c^Tx\le-z^*\}$: thêm một hàng vào $A$. Đó là một đa diện, lồi theo Mệnh đề 07.6(a).

**Bước 2 (phần (b)).** Với $\lambda\in[0,1]$, điểm $\lambda x'+(1-\lambda)x''$ thuộc $P^*$ theo (a). Các điểm này đôi một khác nhau khi $\lambda$ thay đổi, vì $x'\ne x''$. $\square$
:::

Phần (b) của Mệnh đề 07.22 cho thấy số nghiệm tối ưu của một quy hoạch tuyến tính chỉ có thể là $0$, $1$ hoặc vô số. Phần (a) có cùng kết luận với Hệ quả 01.34 (tập nghiệm của bài toán lồi là tập lồi) và cho thêm rằng tập nghiệm là một đa diện. Do mục tiêu tuyến tính không lồi chặt, khác với bài toán lồi chặt của Định lý 01.35, nghiệm duy nhất không được bảo đảm.

### 4.2 Điểm cực biên tối ưu

Ví dụ 07.14 cho thấy phát biểu đúng chỉ có thể là "tồn tại một điểm cực biên tối ưu". Định lý sau, theo Bertsimas và Tsitsiklis (1997, §2.6, ở chiều cực tiểu), khẳng định điều đó khi miền có điểm cực biên và cho biết giá trị tối ưu hữu hạn luôn được đạt. Chứng minh dùng Bổ đề 07.19.

::: theorem Định lý 07.23 (Điểm cực biên tối ưu)
**Giả thiết.** $P=\{x\in\mathbb R^n\mid Ax\le b\}$ có ít nhất một điểm cực biên; $c\in\mathbb R^n$. Xét bài toán cực đại $c^Tx$ trên $P$.

**Kết luận.** Xảy ra đúng một trong hai trường hợp:

- (a) $z^*=+\infty$;
- (b) tồn tại một điểm cực biên $v^*$ của $P$ tối ưu, tức $c^Tv^*=z^*$.

Đặc biệt, nếu $z^*$ hữu hạn thì nó được đạt, và được đạt tại một điểm cực biên.

**Điều kiện áp dụng.** Cần $P$ có điểm cực biên; theo Định lý 07.20, điều này tương đương với $P\ne\varnothing$ và $\operatorname{rank}(A)=n$.

**Phạm vi.** Định lý không nói mọi nghiệm tối ưu là điểm cực biên (Ví dụ 07.14), cũng không cho cách tìm $v^*$ mà không liệt kê.
:::

::: proof Chứng minh Định lý 07.23
**Bước 1 (một bước không làm giảm mục tiêu).** Theo Định lý 07.20, $\operatorname{rank}(A)=n$. Lấy $x\in P$ không phải điểm cực biên. Theo Định lý 07.13, họ hàng hoạt động tại $x$ có hạng nhỏ hơn $n$, nên có $d\ne0$ vuông góc với mọi hàng hoạt động. Đổi $d$ thành $-d$ nếu cần để $c^Td\ge0$. Xét hai trường hợp.

- Có chỉ số $j$ với $a_j^Td>0$. Bổ đề 07.19 cho $x'=x+\theta^*d\in P$ với hạng hàng hoạt động tăng ít nhất $1$, và $c^Tx'=c^Tx+\theta^*c^Td\ge c^Tx$.
- Mọi $a_j^Td\le0$. Khi đó $x+\theta d\in P$ với mọi $\theta\ge0$. Nếu $c^Td>0$, mục tiêu $c^Tx+\theta c^Td\to+\infty$, tức trường hợp (a). Nếu $c^Td=0$, thay $d$ bằng $-d$: vẫn $c^T(-d)=0$, và vì $Ad\ne0$ (hạng $n$) cùng mọi $a_j^Td\le0$, có $j$ với $a_j^T(-d)>0$; quay về trường hợp thứ nhất.

**Bước 2 (một điểm cực biên có giá trị không nhỏ hơn).** Giả sử $z^*<+\infty$. Lặp Bước 1 từ một $x\in P$ bất kỳ; trường hợp (a) không xảy ra, hạng hàng hoạt động tăng sau mỗi lần và không vượt $n$. Sau nhiều nhất $n$ lần, thu được một điểm cực biên $w(x)$ với $c^Tw(x)\ge c^Tx$.

**Bước 3 (điểm cực biên có giá trị lớn nhất là tối ưu).** Theo Hệ quả 07.14, $P$ có hữu hạn điểm cực biên, và theo giả thiết có ít nhất một. Chọn $v^*$ là điểm cực biên có $c^Tv^*$ lớn nhất trong số đó. Với mọi $x\in P$:

$$
c^Tx\le c^Tw(x)\le c^Tv^* .
$$

Trong đó, bất đẳng thức thứ nhất là kết luận của Bước 2, còn bất đẳng thức thứ hai đúng vì $w(x)$ là một điểm cực biên. Vậy $c^Tv^*=z^*$. $\square$
:::

Hai giả thiết của định lý có vai trò riêng, và mỗi giả thiết bị bỏ đều có phản ví dụ.

- Bỏ "có điểm cực biên": bài toán cực đại $-x_2$ trên nửa mặt phẳng $\{x_2\ge0\}$ có $z^*=0$, đạt trên cả đường $x_2=0$, nhưng miền không có điểm cực biên nào.
- Bỏ "giá trị hữu hạn": bài toán cực đại $x_1$ trên $P_1=\{x_1+x_2\ge1,\ x\ge0\}$ có hai điểm cực biên $(1,0)$, $(0,1)$ nhưng $z^*=+\infty$.

Trong chứng minh, Bước 1 dùng giả thiết hạng để có một ràng buộc mới khi $c^Td=0$, còn Bước 3 dùng tính hữu hạn của tập điểm cực biên.

Ở Bài 02, kết quả này mới được nêu kèm nguồn trong Nhận xét 02.12 và chưa được chứng minh, còn ở đây định lý được chứng minh đầy đủ. Định lý mạnh hơn câu "nếu có nghiệm tối ưu và có điểm cực biên thì có điểm cực biên tối ưu" vì không giả sử trước nghiệm tối ưu tồn tại. Tuy nhiên, định lý cần giả thiết miền có điểm cực biên. Bước 3 của chứng minh còn cho ngay một cách tính giá trị tối ưu bằng liệt kê, phát biểu trong hệ quả sau.

::: corollary Hệ quả 07.24 (Liệt kê điểm cực biên là đủ)
**Giả thiết.** Như Định lý 07.23, và $z^*<+\infty$.

**Kết luận.** Gọi $V$ là tập điểm cực biên của $P$. Khi đó $z^*=\max_{v\in V}c^Tv$. Với bài toán dạng chuẩn (2.2) khả thi có giá trị tối ưu hữu hạn, $z^*$ bằng giá trị lớn nhất của $c^Tx$ trên các nghiệm cơ sở khả thi.

**Điều kiện áp dụng.** Như Định lý 07.23; với dạng chuẩn, cần giả thiết hạng của Định nghĩa 07.7.

**Phạm vi.** Số nghiệm cơ sở khả thi có thể lên tới $\binom nm$, nên liệt kê chỉ dùng được cho bài toán nhỏ.
:::

::: proof Chứng minh Hệ quả 07.24
**Bước 1 (đa diện tổng quát).** Theo Bước 3 của chứng minh Định lý 07.23, điểm cực biên có giá trị lớn nhất là tối ưu.

**Bước 2 (dạng chuẩn).** Theo Hệ quả 07.21(a), đa diện dạng chuẩn khác rỗng có điểm cực biên; theo Định lý 07.15, các điểm cực biên là các nghiệm cơ sở khả thi. Áp dụng Bước 1. $\square$
:::

::: example Ví dụ 07.15 (Kiểm tra giả thiết và áp dụng trên bài toán hộp hạt)
**Dữ kiện.** Cực đại $2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$; năm điểm cực biên $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$ (Ví dụ 07.11).

**Kiểm tra giả thiết.**

1. Có điểm cực biên: năm hàng chứa $(1,0)$ và $(0,1)$, nên ma trận có hạng $2$; miền khác rỗng vì chứa $(0,0)$. Định lý 07.20 cho điểm cực biên.
2. Giá trị tối ưu hữu hạn: miền bị chặn ($0\le x_1\le30$, $0\le x_2\le20$), nên $2x_1+3x_2\le2\cdot30+3\cdot20=120$.

**Áp dụng Hệ quả 07.24.** Giá trị tại năm điểm cực biên là $0$, $60$, $96$, $88$, $60$; lớn nhất là $96$ tại $(30,12)$.

**Kiểm tra lại.** Cận trên $96$ của Ví dụ 07.5 khớp. Cận $120$ ở bước kiểm tra giả thiết chỉ dùng để biết $z^*$ hữu hạn; nó không phải giá trị tối ưu.
:::

**Trong học máy.** Bộ giải dựa trên đỉnh trả về một điểm cực biên tối ưu, nên nghiệm có cấu trúc của Định lý 07.23: nhiều ràng buộc hoạt động, và với dạng chuẩn, nhiều nhất $m$ thành phần khác $0$. Trên hồi quy $L_1$, cấu trúc đó được phát biểu thành mệnh đề sau.

::: proposition Mệnh đề 07.25 (Hồi quy $L_1$ có nghiệm nội suy $n$ mẫu)
**Giả thiết.** $M$ mẫu với $h_i\in\mathbb R^n$, $y_i\in\mathbb R$; các vector $h_1,\ldots,h_M$ sinh $\mathbb R^n$. Xét quy hoạch tuyến tính (1.2) theo biến $(x,t)\in\mathbb R^{n+M}$.

**Kết luận.**

- (a) Miền khả thi của (1.2) có điểm cực biên.
- (b) Bài toán (1.2) có một điểm cực biên tối ưu $(x^*,t^*)$.
- (c) Tại mọi điểm cực biên tối ưu, tập $Z=\{i\mid h_i^Tx^*=y_i\}$ các mẫu có phần dư bằng $0$ thỏa: các vector $h_i$, $i\in Z$, sinh $\mathbb R^n$. Đặc biệt có ít nhất $n$ mẫu được nội suy chính xác.

**Điều kiện áp dụng.** Các $h_i$ sinh $\mathbb R^n$, tức ma trận có hàng $h_i^T$ có hạng $n$.

**Phạm vi.** Mệnh đề nói về một nghiệm đỉnh; nghiệm tối ưu không duy nhất có thể có nghiệm không nội suy mẫu nào (Ví dụ 07.4: $x=2$ tối ưu, cả hai phần dư khác $0$).
:::

::: proof Chứng minh Mệnh đề 07.25
**Bước 1 (viết thành đa diện).** Mẫu $i$ cho hai hàng theo biến $(x,t)$: $h_i^Tx-t_i\le y_i$ và $-h_i^Tx-t_i\le-y_i$. Một hướng $(\delta,\tau)\in\mathbb R^{n+M}$ vuông góc với cả hai hàng khi $h_i^T\delta-\tau_i=0$ và $-h_i^T\delta-\tau_i=0$, tức $\tau_i=0$ và $h_i^T\delta=0$.

**Bước 2 (phần (a)).** Theo Bước 1, hướng vuông góc với mọi hàng thỏa $h_i^T\delta=0$ với mọi $i$, nên $\delta=0$ vì các $h_i$ sinh $\mathbb R^n$, và $\tau=0$. Ma trận ràng buộc có hạng $n+M$. Miền khác rỗng, chẳng hạn $x=0$, $t_i=\lvert y_i\rvert$. Định lý 07.20 cho điểm cực biên.

**Bước 3 (phần (b)).** Viết bài toán (1.2) thành cực đại $-\sum_it_i$. Vì $t_i\ge\lvert r_i\rvert\ge0$, mục tiêu không vượt $0$, nên $z^*\le0$ hữu hạn. Định lý 07.23 cho một điểm cực biên tối ưu.

**Bước 4 (phần (c)).** Tại điểm cực biên tối ưu $(x^*,t^*)$, Hệ quả 07.4 cho $t_i^*=\lvert r_i^*\rvert$, nên mỗi mẫu có ít nhất một hàng hoạt động, và có cả hai hàng hoạt động đúng khi $r_i^*=0$, tức $i\in Z$. Theo Bước 1, một hướng vuông góc với mọi hàng hoạt động có $\tau_i$ xác định bởi $\delta$ với $i\notin Z$ (một phương trình $\tau_i=\pm h_i^T\delta$), và có $\tau_i=0$, $h_i^T\delta=0$ với $i\in Z$. Định lý 07.13 đòi hướng như vậy chỉ là $0$; điều đó xảy ra khi và chỉ khi $h_i^T\delta=0$ với mọi $i\in Z$ kéo theo $\delta=0$, tức các $h_i$, $i\in Z$, sinh $\mathbb R^n$. Một họ sinh $\mathbb R^n$ có ít nhất $n$ vector. $\square$
:::

Với mô hình đường thẳng $h_i=(1,\nu_i)$, trong đó $\nu_i$ là giá trị đầu vào của mẫu $i$, phần (c) nói: có một đường thẳng $L_1$ tối ưu đi qua ít nhất hai điểm dữ liệu có đầu vào khác nhau. Bình phương nhỏ nhất không bảo đảm tính chất này. Ở Tình huống 07.1, chúng ta kiểm tra tính chất đó trên năm mẫu có một ngoại lai.

### 4.3 Bốn kết cục của quy hoạch tuyến tính

Định lý 07.23 cần miền có điểm cực biên. Mọi quy hoạch tuyến tính đều đưa được về dạng chuẩn, và dạng chuẩn khả thi luôn có điểm cực biên (Hệ quả 07.21). Ghép hai sự kiện đó, ta được một phân loại áp dụng cho mọi quy hoạch tuyến tính, không cần giả thiết nào.

![Bốn ô. Ô "Không khả thi": hai nửa mặt phẳng x2 ≥ 2 và x2 ≤ 1 không giao nhau, ghi "giao rỗng". Ô "Mục tiêu không bị chặn": miền mở về bên phải, vector c hướng sang phải, ghi "z tăng mãi". Ô "Tối ưu duy nhất": đường mức xa nhất theo hướng c chỉ có điểm chung với miền tại một đỉnh. Ô "Nhiều nghiệm tối ưu": đường mức xa nhất trùng một cạnh vuông góc với c, ghi "cả cạnh tối ưu".](img/lec-07/lp-four-statuses.svg)

Bốn ô trên hình là bốn tình huống trong mặt phẳng. Ô thứ nhất có miền rỗng, ô thứ hai có miền kéo dài theo hướng $c$, còn ở hai ô cuối, đường mức xa nhất chỉ có điểm chung với miền tại một đỉnh hoặc trùng một cạnh. Không còn khả năng nào khác, như định lý sau khẳng định.

::: theorem Định lý 07.26 (Bốn kết cục)
**Giả thiết.** Một quy hoạch tuyến tính bất kỳ: cực đại $c^Tx$ trên $P=\{x\in\mathbb R^n\mid Ax\le b\}$, với $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$, $c\in\mathbb R^n$.

**Kết luận.** Bài toán rơi vào đúng một trong bốn kết cục (outcome):

1. không khả thi: $P=\varnothing$;
2. không bị chặn: $P\ne\varnothing$ và $z^*=+\infty$;
3. tối ưu duy nhất: $z^*$ hữu hạn, được đạt, và có đúng một nghiệm tối ưu;
4. nhiều nghiệm tối ưu: $z^*$ hữu hạn, được đạt, và có vô số nghiệm tối ưu.

Đặc biệt, không có quy hoạch tuyến tính nào có giá trị tối ưu hữu hạn mà không được đạt.

**Điều kiện áp dụng.** Mọi quy hoạch tuyến tính; bài toán cực tiểu, bài toán có phương trình hay biến không âm được viết về dạng của giả thiết như sau Định nghĩa 07.1.

**Phạm vi.** Định lý chỉ phân loại; nó không cho cách xác định kết cục mà không giải bài toán. Kết luận không đúng cho bài toán lồi không tuyến tính (Nhận xét 07.27).
:::

::: proof Chứng minh Định lý 07.26
**Bước 1 (bốn trường hợp loại trừ nhau).** Kết cục 1 và 2 tách nhau bởi $P$ rỗng hay không. Kết cục 3 và 4 có $z^*$ hữu hạn nên khác kết cục 2; chúng tách nhau bởi số nghiệm.

**Bước 2 (giá trị hữu hạn thì được đạt).** Giả sử $P\ne\varnothing$ và $z^*<+\infty$. Theo Mệnh đề 07.8, bài toán mới ở dạng chuẩn có miền $\tilde P$ khác rỗng (chứa $\varphi(x)$ với $x\in P$) và cùng giá trị tối ưu $z^*$. Theo Hệ quả 07.21(a), $\tilde P$ có điểm cực biên. Theo Định lý 07.23 áp dụng cho $\tilde P$, viết thành đa diện dạng (2.1) bằng Mệnh đề 07.6(b), có $\tilde x^*\in\tilde P$ tối ưu. Theo Mệnh đề 07.8(d), $\psi(\tilde x^*)\in P$ tối ưu cho bài toán ban đầu.

**Bước 3 (số nghiệm).** Khi $z^*$ hữu hạn và được đạt, Mệnh đề 07.22(b) cho số nghiệm là $1$ hoặc vô số. Cùng với Bước 2, mọi bài toán khả thi có $z^*<+\infty$ thuộc kết cục 3 hoặc 4. $\square$
:::

Định lý 07.26 có thể đọc thành hai câu hỏi chẩn đoán: miền khả thi có rỗng không, và nếu không rỗng thì mục tiêu có bị chặn theo chiều tối ưu không. Nếu hai câu trả lời là "không rỗng" và "bị chặn" thì bài toán có nghiệm, và theo Định lý 07.23 áp dụng cho dạng chuẩn, có một nghiệm cơ sở khả thi tối ưu.

So với Định lý 07.23, định lý này bỏ giả thiết "có điểm cực biên" nhưng chỉ kết luận nghiệm tối ưu tồn tại, không kết luận nó là điểm cực biên của miền gốc. Trên nửa mặt phẳng, bài toán cực đại $-x_2$ thuộc kết cục 4 dù miền không có đỉnh.

::: example Ví dụ 07.16 (Bốn kết cục trên bài toán một biến)
**Dữ kiện.** Bốn bài toán với biến $x\in\mathbb R$.

1. Cực đại $x$ dưới $x\le0$ và $x\ge1$: miền rỗng, không khả thi.
2. Cực đại $x$ dưới $x\ge0$: miền khác rỗng và $x$ nhận giá trị lớn tùy ý, không bị chặn.
3. Cực đại $x$ dưới $0\le x\le1$: nghiệm duy nhất $x^*=1$, $z^*=1$.
4. Cực đại $0\cdot x$ dưới $0\le x\le1$: mọi điểm đều tối ưu với $z^*=0$, vô số nghiệm.

**Cùng miền, khác mục tiêu.** Trên miền $x\ge0$ của bài 2, bài toán cực đại $-x$ có nghiệm duy nhất $x^*=0$. Miền không bị chặn không kéo theo mục tiêu không bị chặn; kết cục phụ thuộc hướng $c$.

**Kiểm tra lại.** Ở bài 3, $x\le1$ cho $z\le1$ và $x=1$ khả thi. Ở bài 2, với mọi $K$, điểm $x=K+1$ khả thi và cho $z>K$.
:::

::: remark Nhận xét 07.27 (So với bài toán lồi tổng quát và ba nhầm lẫn)
**So với Nhận xét 02.8.** Một bài toán lồi tổng quát có thêm kết cục "bị chặn nhưng không đạt" (Nhận xét 02.8 gọi các kết cục là "trạng thái"), chẳng hạn cực tiểu $\exp(x)$ trên $\mathbb R$ có cận dưới đúng $0$ không đạt. Định lý 07.26 loại kết cục đó cho quy hoạch tuyến tính; lý do nằm ở cấu trúc đa diện của miền, đi qua Định lý 07.23.

**Ba nhầm lẫn.**

- "Miền không bị chặn thì mục tiêu không bị chặn": sai, như bài toán cực đại $-x$ trên $x\ge0$.
- "Nhiều nghiệm tối ưu nghĩa là hai nghiệm": sai, theo Mệnh đề 07.22(b) là vô số.
- "Làm tròn nghiệm của quy hoạch tuyến tính cho nghiệm của bài toán có biến nguyên": sai. Bài toán cực đại $x$ dưới $2x\le1$, $x\ge0$ có nghiệm $\tfrac12$; làm tròn lên cho $1$, vi phạm $2x\le1$, còn bài toán có thêm điều kiện $x$ nguyên có nghiệm $0$. Quy hoạch nguyên cần công cụ khác.
:::

**Trong học máy.** Bộ giải quy hoạch tuyến tính báo một trong bốn kết cục của Định lý 07.26, và mỗi kết cục chỉ về một loại lỗi mô hình: không khả thi do các yêu cầu mâu thuẫn, không bị chặn do quên một giới hạn tài nguyên, nhiều nghiệm do các cấu hình có cùng giá trị mục tiêu. Cả ba loại lỗi được chẩn đoán trên một bài toán phân bổ giờ GPU ở Tình huống 07.2.

### 4.4 Đỉnh kề

Theo Hệ quả 07.24, ta có thể liệt kê mọi điểm cực biên và chọn điểm có giá trị mục tiêu lớn nhất. Tuy nhiên, số điểm cực biên có thể lên tới $\binom nm$, chẳng hạn với $n=40$ biến và $m=20$ phương trình, $\binom{40}{20}=137\,846\,528\,820\approx1{,}38\cdot10^{11}$. Do đó, chúng ta cần một cách tìm kiếm cục bộ, trong đó từ một điểm cực biên, ta chỉ xét các điểm cực biên "bên cạnh" và chuyển sang một điểm có giá trị mục tiêu lớn hơn.

Trên ngũ giác hộp hạt, hai đỉnh "bên cạnh" khi nối với nhau bằng một cạnh của ngũ giác, tức cùng nằm trên một đường biên. Trong $\mathbb R^n$, một đỉnh là nghiệm duy nhất của $n$ ràng buộc hoạt động độc lập; hai đỉnh kề nhau khi chúng chung $n-1$ ràng buộc trong số đó. Quan hệ này được phát biểu chính xác như sau.

::: definition Định nghĩa 07.28 (Điểm cực biên kề nhau, cạnh)
Cho đa diện $P\subseteq\mathbb R^n$. Hai điểm cực biên khác nhau $v$, $w$ của $P$ kề nhau (adjacent) nếu có $n-1$ ràng buộc với hàng độc lập tuyến tính cùng hoạt động tại $v$ và tại $w$. Tập các điểm của $P$ thỏa $n-1$ ràng buộc đó với dấu bằng chứa đoạn nối $v$ và $w$, và được gọi là một cạnh (edge) của $P$.
:::

Định nghĩa trên theo cách trình bày của Bertsimas và Tsitsiklis (1997, §2.2). Trong mặt phẳng, $n-1=1$: hai đỉnh kề nhau khi chung một đường biên hoạt động. Trên ngũ giác hộp hạt, $(30,0)$ và $(30,12)$ kề nhau vì cùng nằm trên $x_1=30$; $(30,12)$ và $(14,20)$ kề nhau qua đường giờ máy; còn $(0,0)$ và $(30,12)$ không chung đường biên nào nên không kề. Trên hình sau, hai đỉnh kề của $(30,0)$ là $(0,0)$ (chung $x_2=0$) và $(30,12)$ (chung $x_1=30$); đỉnh $(14,20)$ không có ràng buộc hoạt động chung với $(30,0)$ nên không kề.

![Ngũ giác khả thi của bài toán hộp hạt. Đỉnh (30,0) tô đậm; hai cạnh xuất phát từ nó tô đậm: cạnh nằm trên đường x2 = 0 nối tới (0,0) và cạnh nằm trên đường x1 = 30 nối tới (30,12), hai đỉnh này ghi kề. Đỉnh (14,20) để nhạt, nối với (30,0) bằng nét đứt có nhãn không kề.](img/lec-07/pentagon-adjacent.svg)

Với dạng chuẩn, đỉnh kề có một mô tả qua cơ sở, phát biểu trong mệnh đề sau. Chứng minh cần Định lý 07.15 (nghiệm cơ sở khả thi là điểm cực biên) và định lý số chiều (hạng của một họ hàng cộng số chiều không gian nghiệm của hệ thuần nhất tương ứng bằng $n$).

::: proposition Mệnh đề 07.29 (Hai cơ sở khác nhau một chỉ số)
**Giả thiết.** Bài toán dạng chuẩn (2.2) với $\operatorname{rank}(A)=m$. Hai cơ sở $B$, $B'$ khác nhau đúng một chỉ số, tức $\lvert B\cap B'\rvert=m-1$, cho hai nghiệm cơ sở khả thi $v\ne w$.

**Kết luận.** $v$ và $w$ là hai điểm cực biên kề nhau theo Định nghĩa 07.28.

**Điều kiện áp dụng.** Hai điểm phải khác nhau; khi suy biến, hai cơ sở khác một chỉ số có thể cho cùng một điểm.

**Phạm vi.** Mệnh đề không nói mọi cặp đỉnh kề đều có hai cơ sở như vậy; chương chỉ dùng chiều này.
:::

::: proof Chứng minh Mệnh đề 07.29
**Bước 1 (hai điểm là điểm cực biên).** Theo Định lý 07.15, mỗi nghiệm cơ sở khả thi là điểm cực biên.

**Bước 2 (ràng buộc chung).** Tập $B\cup B'$ có $m+1$ phần tử. Cả $v$ và $w$ thỏa $m$ phương trình $Ax=b$, và có $x_{j'}=0$ với mọi $j'\notin B\cup B'$, vì mỗi điểm bằng $0$ ngoài cơ sở của nó. Tổng cộng có $m+(n-m-1)=n-1$ ràng buộc cùng hoạt động tại hai điểm.

**Bước 3 (hạng của các ràng buộc chung).** Hệ thuần nhất tương ứng là $Ay=0$, $y_{j'}=0$ với $j'\notin B\cup B'$. Nghiệm của nó tựa trên $B\cup B'$ và thỏa $\sum_{j'\in B\cup B'}y_{j'}A_{j'}=0$. Các cột trên $B\cup B'$ có hạng $m$ vì chứa $A_B$ khả nghịch, nên không gian nghiệm có chiều $(m+1)-m=1$.

**Bước 4 (kết luận).** Theo định lý số chiều, $n-1$ ràng buộc ở Bước 2 có hạng $n-1$, tức độc lập tuyến tính. Hai điểm cực biên khác nhau có chung $n-1$ ràng buộc hoạt động độc lập, nên kề nhau theo Định nghĩa 07.28. $\square$
:::

Mệnh đề 07.29 chuyển Định nghĩa 07.28, phát biểu bằng các hàng hoạt động, sang ngôn ngữ cột cơ sở, theo đó đổi một cột cơ sở là đi dọc một cạnh. Trong chương, ta chỉ dùng chiều này, còn chiều ngược, mọi cặp đỉnh kề có hai cơ sở khác một chỉ số, không được phát biểu. Trên bài toán hộp hạt, hai cơ sở $\{s_1,s_2,s_3\}$ và $\{x_1,s_2,s_3\}$ khác nhau ở một chỉ số và cho hai đỉnh kề $(0,0)$, $(30,0)$.

Mệnh đề 07.29 cho biết một bước đổi một chỉ số cơ sở đưa ta sang một đỉnh kề, nếu điểm thực sự thay đổi. Việc còn lại là chọn đỉnh kề nào và chứng minh rằng một đỉnh kề tốt hơn luôn tồn tại khi đỉnh hiện tại chưa tối ưu.

### 4.5 Thuật toán duyệt đỉnh kề

Tìm kiếm cục bộ dựa trên bổ đề sau, theo đó một điểm cực biên chưa tối ưu luôn có một đỉnh kề tốt hơn. Bổ đề được phát biểu cho mọi đa diện có điểm cực biên. Chứng minh cần hướng cơ sở, chi phí rút gọn và quy tắc chống quay vòng, nên được đặt ở Mục 5: Mục 5.2 chứng minh trường hợp điểm cực biên không suy biến, Mục 5.4 chứng minh trường hợp suy biến. Trong Mục 4, bổ đề được tạm chấp nhận.

::: lemma Bổ đề 07.30 (Đỉnh kề cải thiện)
**Giả thiết.** $P$ là đa diện có ít nhất một điểm cực biên; $z^*=\sup_{x\in P}c^Tx$ hữu hạn; $v$ là điểm cực biên của $P$ với $c^Tv<z^*$.

**Kết luận.** Có một điểm cực biên $w$ kề $v$ với $c^Tw>c^Tv$.

**Điều kiện áp dụng.** Đa diện bất kỳ có điểm cực biên, với giá trị tối ưu hữu hạn.

**Phạm vi.** Bổ đề chỉ khẳng định $w$ tồn tại; cách tính $w$ bằng đại số là nội dung của Mục 5.
:::

Bổ đề 07.30 dẫn tới một quy trình: tại một điểm cực biên, nếu tồn tại đỉnh kề có giá trị mục tiêu lớn hơn thì chuyển sang đỉnh đó, nếu không thì dừng. Ghi quy trình đó ở mức khái niệm, chưa nói cách tìm đỉnh kề, ta được thuật toán sau.

::: algorithm Thuật toán 07.1 (Duyệt đỉnh kề)
**Đầu vào.** Đa diện $P$ có điểm cực biên; vector $c$ với $z^*=\sup_{x\in P}c^Tx$ hữu hạn; một điểm cực biên xuất phát $v$.

**Các bước.**

1. Tìm một điểm cực biên $w$ kề $v$ với $c^Tw>c^Tv$.
2. Nếu có, gán $v\leftarrow w$ và quay lại bước 1.
3. Nếu không có, dừng.

**Đầu ra.** Điểm cực biên $v$ khi dừng.

**Chi phí mỗi bước.** Chưa xác định ở mức khái niệm: bước 1 cần một cách liệt kê các đỉnh kề của $v$ và giá trị của chúng. Mục 5 thực hiện bước này bằng phép tính trên cơ sở.
:::

Tính dừng và tính đúng của thuật toán được khẳng định trong mệnh đề sau.

::: proposition Mệnh đề 07.31 (Thuật toán dừng tại một điểm cực biên tối ưu)
**Giả thiết.** Như đầu vào của Thuật toán 07.1.

**Kết luận.** Thuật toán dừng sau hữu hạn bước, và điểm cực biên trả về là nghiệm tối ưu.

**Điều kiện áp dụng.** Bước 1 tìm được đỉnh kề cải thiện khi có; điều này được Bổ đề 07.30 bảo đảm tồn tại.

**Phạm vi.** Số bước bị chặn bởi số điểm cực biên, có thể lớn theo hàm mũ của số chiều.
:::

::: proof Chứng minh Mệnh đề 07.31
**Bước 1 (không thăm lại).** Mỗi lần lặp làm $c^Tv$ tăng chặt, nên không điểm cực biên nào được thăm hai lần.

**Bước 2 (dừng).** Theo Hệ quả 07.14, $P$ có hữu hạn điểm cực biên, nên số lần lặp hữu hạn.

**Bước 3 (đúng).** Khi dừng, không có đỉnh kề nào có giá trị lớn hơn $c^Tv$. Nếu $c^Tv<z^*$, Bổ đề 07.30 cho một đỉnh kề có giá trị lớn hơn, mâu thuẫn. Vậy $c^Tv=z^*$. $\square$
:::

Đầu vào của thuật toán khớp giả thiết của Bổ đề 07.30, cộng thêm một điểm cực biên xuất phát. Tiêu chuẩn dừng dùng bất đẳng thức chặt, vì với bất đẳng thức không chặt, thuật toán có thể dao động giữa hai đỉnh cùng giá trị, như ở Bài tập 07.7.

![Ngũ giác khả thi của bài toán hộp hạt với giá trị z ghi cạnh mỗi đỉnh: (0,0): 0; (30,0): 60; (30,12): 96; (14,20): 88; (0,20): 60. Hai đoạn tô đậm có nhãn "bước 1" từ (0,0) tới (30,0) dọc trục x1 và "bước 2" từ (30,0) lên (30,12) dọc cạnh x1 = 30.](img/lec-07/conceptual-vertex-walk.svg)

Trên hình, giá trị $z$ được ghi cạnh mỗi đỉnh của ngũ giác hộp hạt, và hai đoạn tô đậm "bước 1", "bước 2" là hai cạnh của miền mà thuật toán đi qua. Trong ví dụ sau, đường đi đó được kiểm tra bằng giá trị đỉnh và quan hệ kề; phép tính đại số cho từng bước nằm ở Mục 5.

::: example Ví dụ 07.17 (Thuật toán duyệt đỉnh kề trên bài toán hộp hạt)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1,x_2\ge0$. Ngũ giác khả thi có năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$, với $z$ lần lượt $0$, $60$, $96$, $88$, $60$. Hai đỉnh kề nhau khi chung một đường biên hoạt động. Điểm xuất phát là $(0,0)$.

**Bước 1.** Hai đỉnh kề của $(0,0)$ là $(30,0)$, chung đường $x_2=0$, và $(0,20)$, chung đường $x_1=0$; cả hai có $z=60>0$. Chọn $(30,0)$.

**Bước 2.** Hai đỉnh kề của $(30,0)$ là $(0,0)$ với $z=0$ và $(30,12)$, chung đường $x_1=30$, với $z=96>60$. Chuyển sang $(30,12)$.

**Kiểm tra điều kiện dừng.** Hai đỉnh kề của $(30,12)$ là $(30,0)$ với $z=60$ và $(14,20)$, chung đường giờ máy, với $z=88$; cả hai nhỏ hơn $96$, nên thuật toán dừng. Theo Mệnh đề 07.31, $(30,12)$ tối ưu.

**Kiểm tra lại.** Giá trị $z^*=96$ khớp kết quả liệt kê của Ví dụ 07.15. Trong dạng chuẩn với biến bù $s_1,s_2,s_3$, mỗi bước đổi đúng một biến cơ sở: $\{s_1,s_2,s_3\}\to\{x_1,s_2,s_3\}\to\{x_1,x_2,s_2\}$.
:::

Nếu bước 1 chọn $(0,20)$, đường đi là $(0,0)\to(0,20)\to(14,20)\to(30,12)$ với $z$ lần lượt $0$, $60$, $88$, $96$. Quy tắc chọn đỉnh kề làm đổi đường đi và số bước, không làm đổi kết luận.

Trong ví dụ trên, đỉnh kề và giá trị của chúng được đọc từ hình ngũ giác. Đó là chỗ Thuật toán 07.1 còn để ngỏ, và nó gồm bốn câu hỏi.

1. Tính đỉnh kề và giá trị của nó bằng đại số ra sao, khi không có hình để đọc.
2. Chọn đỉnh kề nào khi có nhiều đỉnh kề có giá trị lớn hơn.
3. Làm gì khi suy biến làm bước đi có độ dài $0$, và tránh quay lại một cơ sở cũ thế nào.
4. Tìm điểm cực biên xuất phát thế nào khi $x=0$ không khả thi.

**Trong học máy.** Khi có nhiều nghiệm tối ưu, một bộ giải duyệt đỉnh trả về một điểm cực biên, còn một bộ giải đi qua phần trong của miền có thể trả về một điểm giữa cạnh tối ưu. Với hồi quy $L_1$ trên hai mẫu $y_1=1$, $y_2=3$ của Ví dụ 07.4, mọi $x\in[1,3]$ đều tối ưu: bộ giải duyệt đỉnh trả về $x=1$ hoặc $x=3$, bộ giải đi qua phần trong có thể trả về $x=2$. Ba nghiệm có cùng mất mát nhưng cho ba mô hình khác nhau.

::: exercise Bài tập 07.6 (Điểm cực biên và đỉnh kề trên một đa giác mới)
Xét bài toán cực đại $x_1+x_2$ dưới $x_1+2x_2\le4$, $3x_1+x_2\le6$, $x_1,x_2\ge0$.

- (a) Vẽ miền khả thi và xác định bốn đỉnh bằng tiêu chuẩn hạng.
- (b) Tính giá trị mục tiêu tại các đỉnh; xác định kết cục và nghiệm tối ưu.
- (c) Từ $(0,0)$, viết một đường đi qua đỉnh kề có giá trị tăng chặt và nêu lý do dừng.
- (d) Nêu định lý bảo đảm có điểm cực biên tối ưu và kiểm tra từng giả thiết.
:::

::: hint
Đường $x_1+2x_2=4$ cắt hai trục tại $(4,0)$, $(0,2)$; đường $3x_1+x_2=6$ cắt hai trục tại $(2,0)$, $(0,6)$. Trên mỗi trục, ràng buộc hạn chế hơn cho đỉnh.
:::

::: solution
**Câu (a).** Trên trục $x_1$, ràng buộc thứ hai hạn chế hơn, cho đỉnh $(2,0)$; trên trục $x_2$, ràng buộc thứ nhất hạn chế hơn, cho đỉnh $(0,2)$. Giao của hai đường chéo: từ $x_2=6-3x_1$ và $x_1+2(6-3x_1)=4$ được $5x_1=8$, tức $x_1=1{,}6$ và $x_2=1{,}2$. Bốn đỉnh là $(0,0)$, $(2,0)$, $(1{,}6;\,1{,}2)$, $(0,2)$, mỗi đỉnh có hai hàng hoạt động độc lập.

**Câu (b).** Giá trị lần lượt $0$, $2$, $2{,}8$, $2$. Miền bị chặn và khác rỗng, nên theo Hệ quả 07.24, $z^*=2{,}8$ tại $(1{,}6;\,1{,}2)$. Kết cục là tối ưu duy nhất: với $\mu_1=\tfrac25$, $\mu_2=\tfrac15$ giải từ $\mu_1+3\mu_2=1$, $2\mu_1+\mu_2=1$,

$$
\begin{aligned}
x_1+x_2&=\tfrac25(x_1+2x_2)+\tfrac15(3x_1+x_2)\\
&\le\tfrac25\cdot4+\tfrac15\cdot6\\
&=2{,}8,
\end{aligned}
$$

và dấu bằng chỉ khi cả hai ràng buộc chéo hoạt động, tức chỉ tại $(1{,}6;\,1{,}2)$.

**Câu (c).** Đường $(0,0)\to(2,0)\to(1{,}6;\,1{,}2)$ với giá trị $0\to2\to2{,}8$; mỗi đoạn là một cạnh. Tại $(1{,}6;\,1{,}2)$, hai đỉnh kề $(2,0)$ và $(0,2)$ đều cho $2<2{,}8$, nên thuật toán dừng. Đường qua $(0,2)$ cũng hợp lệ.

**Câu (d).** Định lý 07.23 cần hai giả thiết.

1. Có điểm cực biên: miền khác rỗng (chứa $(0,0)$), và các hàng $-x_1\le0$, $-x_2\le0$ cho hạng $2$, nên theo Định lý 07.20 có điểm cực biên.
2. Giá trị hữu hạn: $0\le x_1\le2$ và $0\le x_2\le2$, nên $z\le4$.

**Kiểm tra lại.** Tại $(1{,}6;\,1{,}2)$: $1{,}6+2{,}4=4$ và $4{,}8+1{,}2=6$. Hai hệ số: $\tfrac25+\tfrac35=1$ và $\tfrac45+\tfrac15=1$.
:::

::: exercise Bài tập 07.7 (Đổi lợi ích của bài toán hộp hạt)
Miền khả thi $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$, với năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$. Mục tiêu mới: cực đại $2x_1+4x_2$.

- (a) Tính $z$ tại năm đỉnh; xác định kết cục và tập nghiệm tối ưu.
- (b) Nêu định lý bảo đảm có điểm cực biên tối ưu và kiểm tra giả thiết.
- (c) Chạy Thuật toán 07.1 từ $(0,0)$ theo hai đường khác nhau; xác định đỉnh dừng của mỗi đường.
:::

::: hint
So sánh vector $(2,4)$ với hàng $(1,2)$ của ràng buộc giờ máy.
:::

::: solution
**Câu (a).** Giá trị tại năm đỉnh: $0$; $2\cdot30=60$; $2\cdot30+4\cdot12=108$; $2\cdot14+4\cdot20=108$; $4\cdot20=80$. Vì $2x_1+4x_2=2(x_1+2x_2)\le2\cdot54=108$, đường mức song song với ràng buộc giờ máy, và giá trị tối ưu $108$ đạt trên cả cạnh nối $(30,12)$ và $(14,20)$. Trên đường $x_1+2x_2=54$, điều kiện $x_2\le20$ cho $x_1\ge14$ và $x_1\le30$, nên tập nghiệm tối ưu là $\{x\mid x_1+2x_2=54,\ 14\le x_1\le30\}$: kết cục nhiều nghiệm tối ưu. Trên hình sau, cạnh tối ưu tô đậm nằm trên đường mức $z=108$, vuông góc với hướng $c=(2,4)$.

![Ngũ giác khả thi của bài toán hộp hạt. Đường mức 2x1 + 4x2 = 108 trùng đường giờ máy x1 + 2x2 = 54; cạnh nối (30,12) và (14,20) tô đậm, mọi điểm của cạnh tối ưu, kể cả trung điểm (22,16). Mũi tên chỉ hướng c = (2,4), vuông góc với cạnh.](img/lec-07/multiple-optima-boxes.svg)

**Câu (b).** Định lý 07.23: miền khác rỗng, có điểm cực biên (hạng $2$), bị chặn nên $z\le2\cdot30+4\cdot20=140$; cả hai giả thiết thỏa.

**Câu (c).**

- Đường thứ nhất: $(0,0)\to(30,0)\to(30,12)$ với $z$: $0\to60\to108$. Tại $(30,12)$, đỉnh kề $(14,20)$ cũng cho $108$, không lớn hơn chặt, nên thuật toán dừng tại $(30,12)$.
- Đường thứ hai: $(0,0)\to(0,20)\to(14,20)$ với $z$: $0\to80\to108$. Tại $(14,20)$, đỉnh kề $(30,12)$ không có giá trị lớn hơn chặt, nên thuật toán dừng tại $(14,20)$.

Hai đỉnh dừng khác nhau cho cùng giá trị tối ưu. Thuật toán trả về một điểm cực biên tối ưu, không trả về cả cạnh; bất đẳng thức chặt ngăn thuật toán dao động giữa hai đỉnh cùng giá trị $108$.

**Kiểm tra lại.** Trung điểm $(22,16)$ của cạnh tối ưu: $22+32=54$, $z=44+64=108$, và $16\le20$.
:::

Sau khi mô tả tập nghiệm tối ưu (Mệnh đề 07.22), chúng ta đã chứng minh kết quả đích của tuyến quy hoạch tuyến tính, Định lý 07.23, dựa trên Bổ đề 07.19 và Hệ quả 07.14. Theo định lý này, khi miền có đỉnh và giá trị tối ưu hữu hạn thì có nghiệm tối ưu ở đỉnh. Hệ quả 07.24 biến kết quả này thành phép liệt kê, còn Định lý 07.26 phân loại mọi bài toán và cho thấy mọi quy hoạch tuyến tính khả thi và bị chặn đều có nghiệm tối ưu. Từ quan hệ đỉnh kề (Định nghĩa 07.28, Mệnh đề 07.29) và Bổ đề 07.30, Thuật toán 07.1 tìm nghiệm tối ưu bằng cách đi qua các đỉnh kề (Mệnh đề 07.31).

Tuy nhiên, Thuật toán 07.1 mới ở mức khái niệm: bốn câu hỏi nêu sau Ví dụ 07.17 chưa được trả lời, và Bổ đề 07.30 chưa được chứng minh. Câu trả lời bằng phép tính trên cơ sở của dạng chuẩn cho ta phương pháp đơn hình.

## 5. Phương pháp đơn hình

Xét lại bài toán hộp hạt ở dạng chuẩn: cực đại $z=2x_1+3x_2$ dưới $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm, và giả sử ta đang đứng tại đỉnh $(14,20)$ với cơ sở $\{x_1,x_2,s_1\}$, $z=88$. Từ đỉnh này có hai cạnh, một cạnh về $(0,20)$ và một cạnh về $(30,12)$. Ở Ví dụ 07.17, hai cạnh đó và giá trị ở đầu kia được đọc từ hình. Khi bài toán có bốn mươi biến thì không có hình nào để đọc, và chúng ta cần trả lời bốn câu hỏi nêu sau Ví dụ 07.17 bằng phép tính.

Câu hỏi thứ nhất, tính đỉnh kề bằng đại số, tách thành ba phép tính: kiểm tra có cạnh nào từ đỉnh hiện tại làm $z$ tăng không, tính độ dài bước trên cạnh đó, và xác định cơ sở của đỉnh mới (Mục 5.1–5.3). Câu hỏi thứ hai, chọn cạnh nào khi có nhiều cạnh tốt, quyết định số bước (Nhận xét 07.36, Mục 5.7). Câu hỏi thứ ba về đỉnh suy biến được trả lời ở Mục 5.4, câu hỏi thứ tư về đỉnh xuất phát ở Mục 5.6, còn Mục 5.5 ghi các phép tính thành bảng. Phương pháp đơn hình (simplex method), do Dantzig đề xuất, trả lời cả bốn câu hỏi bằng phép tính trên cơ sở.

Chương giữ bài toán cực đại; quy ước dấu so với các nguồn viết cho bài toán cực tiểu được nêu ngay sau Định nghĩa 07.32.

Trong cả mục, bài toán có dạng chuẩn (2.2) với $A\in\mathbb R^{m\times n}$, $\operatorname{rank}(A)=m$. Với một cơ sở $B$, ta viết $B^{\mathrm c}$ cho tập $n-m$ chỉ số ngoài cơ sở, và $c_B\in\mathbb R^m$ cho vector các hệ số mục tiêu $c_i$, $i\in B$, xếp theo thứ tự các cột của $A_B$.

### 5.1 Hướng cơ sở, chi phí rút gọn và điều kiện tối ưu

Tại một nghiệm cơ sở khả thi, mọi biến ngoài cơ sở bằng $0$. Muốn rời đỉnh mà vẫn ở trên một cạnh, ta tăng đúng một biến ngoài cơ sở, giữ các biến ngoài cơ sở khác bằng $0$, và để các biến cơ sở tự điều chỉnh sao cho các phương trình vẫn đúng. Tại đỉnh $(14,20)$, ta thực hiện phép tính đó như sau.

::: example Ví dụ 07.18 (Tăng một biến ngoài cơ sở tại đỉnh $(14,20)$ của bài toán hộp hạt)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm, thứ tự biến $(x_1,x_2,s_1,s_2,s_3)$. Đỉnh $(14,20)$ là nghiệm cơ sở khả thi $(14,20,16,0,0)$ với cơ sở $\{x_1,x_2,s_1\}$ và $z=88$; hai biến ngoài cơ sở là $s_2$, $s_3$.

**Biểu diễn các biến cơ sở.** Giải ba phương trình theo $x_1$, $x_2$, $s_1$:

- phương trình thứ hai cho $x_2=20-s_2$;
- phương trình thứ ba cho $x_1=54-2x_2-s_3=14+2s_2-s_3$;
- phương trình thứ nhất cho $s_1=30-x_1=16-2s_2+s_3$.

**Tăng $s_2$ thêm $\theta\ge0$, giữ $s_3=0$.** Thế vào ba biểu diễn trên:

$$
x_1=14+2\theta,\qquad x_2=20-\theta,\qquad s_1=16-2\theta .
$$

Mục tiêu thành $z=2(14+2\theta)+3(20-\theta)=88+\theta$: mỗi đơn vị $s_2$ làm $z$ tăng $1$.

**Độ dài bước.** Điều kiện $x_2\ge0$ cho $\theta\le20$, điều kiện $s_1\ge0$ cho $\theta\le8$, còn $x_1$ tăng nên không chặn $\theta$. Vậy $\theta\le8$. Tại $\theta=8$, điểm là $(30,12,0,8,0)$, tức đỉnh $(30,12)$, với $z=96$.

**Tăng $s_3$ thêm $\theta$, giữ $s_2=0$.** Ba biểu diễn cho $x_1=14-\theta$, $x_2=20$, $s_1=16+\theta$, và $z=2(14-\theta)+60=88-2\theta$: mục tiêu giảm.

**Kiểm tra lại.** Tại $(30,12,0,8,0)$: $30+0=30$, $12+8=20$, $30+24+0=54$. Giá trị $2\cdot30+3\cdot12=96$ khớp $88+8$.
:::

![Ngũ giác khả thi của bài toán hộp hạt với năm đỉnh (0,0), (30,0), (30,12), (14,20), (0,20). Tại đỉnh (14,20), z bằng 88, cơ sở gồm x1, x2, s1. Mũi tên dọc cạnh xiên tới (30,12) ghi: tăng s2, z tăng 1 trên mỗi đơn vị; mũi tên dừng tại (30,12), nơi s1 bằng 0 khi θ bằng 8. Mũi tên dọc cạnh trên tới (0,20) ghi: tăng s3, z giảm 2 trên mỗi đơn vị.](img/lec-07/reduced-cost-edge.svg)

Hai mũi tên trên hình là hai cạnh xuất phát từ $(14,20)$. Tăng $s_2$ là rời đường biên $x_2=20$ và đi dọc đường giờ máy, vì $s_3$ vẫn bằng $0$; tăng $s_3$ là rời đường giờ máy và đi dọc đường $x_2=20$. Các số $+1$ và $-2$ ghi trên hình là hệ số của $\theta$ trong biểu thức của $z$, và mũi tên thứ nhất dừng ở chỗ $s_1$ về $0$.

Một cách trực quan, mỗi biến ngoài cơ sở cho một cạnh rời khỏi đỉnh, và hệ số của $\theta$ trong $z$ là tốc độ thay đổi của mục tiêu dọc cạnh đó. Mô tả này chưa phải định nghĩa, vì nó chưa nói các biến cơ sở thay đổi theo công thức nào trong trường hợp tổng quát. Hướng di chuyển và tốc độ đó được định nghĩa như sau.

::: definition Định nghĩa 07.32 (Hướng cơ sở, chi phí rút gọn)
Cho bài toán dạng chuẩn (2.2), một cơ sở $B$ và $j\in B^{\mathrm c}$. Hướng cơ sở (basic direction) $d^j\in\mathbb R^n$ có các thành phần

$$
d^j_j=1,\qquad d^j_{j'}=0\ \ (j'\in B^{\mathrm c},\ j'\ne j),\qquad d^j_B=-A_B^{-1}A_j .
\tag{5.1}
$$

Chi phí rút gọn (reduced cost) của biến $j$ là

$$
\bar c_j=c^Td^j=c_j-c_B^TA_B^{-1}A_j .
\tag{5.2}
$$
:::

Theo (5.1), hướng $d^j$ tăng $x_j$ một đơn vị, giữ các biến ngoài cơ sở khác bằng $0$, và điều chỉnh biến cơ sở để $Ad^j=A_Bd^j_B+A_j=0$, nên $A(x+\theta d^j)=b$ với mọi $\theta$. Theo (5.2), $\bar c_j$ là mức thay đổi của mục tiêu trên một đơn vị dịch chuyển: lợi ích trực tiếp $c_j$ trừ phần lợi ích thay đổi do điều chỉnh các biến cơ sở. Tên "chi phí rút gọn" được giữ theo thuật ngữ chuẩn, dù trong chương $c$ là vector lợi ích.

Chương giữ bài toán cực đại, nên biến $x_j$ đáng đưa vào cơ sở khi $\bar c_j>0$, và điều kiện dừng là mọi $\bar c_j\le0$. Bertsimas và Tsitsiklis (1997, Chương 3) và Nguyễn Bích Vân (2025, Chương 8, phần 3–4) viết cho bài toán cực tiểu; ở đó mọi điều kiện dấu đảo chiều: biến vào khi $\bar c_j<0$, dừng khi mọi $\bar c_j\ge0$.

Trong Ví dụ 07.18, với $j=s_2$ và thứ tự $(x_1,x_2,s_1,s_2,s_3)$, hướng là $d^{s_2}=(2,-1,-2,1,0)$ và $\bar c_{s_2}=2\cdot2+3\cdot(-1)=1$. Theo công thức thứ hai của (5.2): $c_{s_2}=0$ và $A_B^{-1}A_{s_2}=-d^{s_2}_B=(-2,1,2)$ với $c_B=(2,3,0)$, nên $\bar c_{s_2}=0-(-4+3)=1$. Hai cách tính cho cùng kết quả.

Hướng cơ sở là trường hợp riêng của hướng $d$ trong Bổ đề 07.19: nó giữ $m$ phương trình $Ax=b$ và $n-m-1$ điều kiện $x_{j'}=0$ hoạt động, và chỉ nới điều kiện $x_j=0$.

Một nhầm lẫn thường gặp là đồng nhất $\bar c_j$ với $c_j$. Ở Ví dụ 07.18, $c_{s_2}=0$ nhưng $\bar c_{s_2}=1$, vì tăng $s_2$ kéo theo tăng $x_1$.

Với chỉ số cơ sở $i\in B$, công thức (5.2) cho $\bar c_i=0$, vì $A_B^{-1}A_i$ là một cột của ma trận đơn vị.

Với các hướng cơ sở, mọi điểm khả thi được biểu diễn qua nghiệm cơ sở hiện tại, và từ biểu diễn đó ta có điều kiện tối ưu sau, theo Bertsimas và Tsitsiklis (1997, §3.1, Định lý 3.1) viết lại cho bài toán cực đại.

::: proposition Mệnh đề 07.33 (Điều kiện tối ưu theo chi phí rút gọn)
**Giả thiết.** Bài toán dạng chuẩn (2.2); $x$ là nghiệm cơ sở khả thi với cơ sở $B$.

**Kết luận.**

- (a) Với mọi $x'\in P$: $x'-x=\sum_{j\in B^{\mathrm c}}x'_j\,d^j$, và do đó

$$
c^Tx'-c^Tx=\sum_{j\in B^{\mathrm c}}x'_j\,\bar c_j .
$$

- (b) Nếu $\bar c_j\le0$ với mọi $j\in B^{\mathrm c}$ thì $x$ là nghiệm tối ưu.
- (c) Nếu $x$ không suy biến và là nghiệm tối ưu thì $\bar c_j\le0$ với mọi $j\in B^{\mathrm c}$.

**Điều kiện áp dụng.** Phần (a) và (b) đúng cho mọi nghiệm cơ sở khả thi, kể cả suy biến; phần (c) cần $x$ không suy biến.

**Phạm vi.** Khi $x$ suy biến, chiều ngược của (b) có thể sai: $x$ tối ưu trong khi một chi phí rút gọn dương (Bài tập 07.11, câu (d)).
:::

::: proof Chứng minh Mệnh đề 07.33
**Bước 1 (phân tích $x'-x$).** Đặt $d=x'-x$. Ta có chuỗi quan hệ

$$
\begin{aligned}
Ad&=Ax'-Ax=b-b=0,\\
A_Bd_B&=-\sum_{j\in B^{\mathrm c}}d_jA_j,\\
d_B&=-\sum_{j\in B^{\mathrm c}}d_jA_B^{-1}A_j .
\end{aligned}
$$

Dòng thứ nhất dùng $x,x'\in P$, dòng thứ hai tách $Ad$ theo các cột cơ sở và ngoài cơ sở, dòng thứ ba nhân trái với $A_B^{-1}$. Với $j\in B^{\mathrm c}$, $x_j=0$ nên $d_j=x'_j$. So từng khối với (5.1): $d=\sum_{j\in B^{\mathrm c}}x'_jd^j$.

**Bước 2 (giá trị).** Nhân với $c^T$ và dùng (5.2):

$$
c^Tx'-c^Tx=\sum_{j\in B^{\mathrm c}}x'_j\bar c_j .
$$

**Bước 3 (phần (b)).** Với $x'\in P$, mọi $x'_j\ge0$; nếu mọi $\bar c_j\le0$ thì tổng ở Bước 2 không dương, nên $c^Tx'\le c^Tx$.

**Bước 4 (phần (c)).** Giả sử có $j\in B^{\mathrm c}$ với $\bar c_j>0$. Vì $x$ không suy biến, $x_i>0$ với mọi $i\in B$. Chọn $\theta>0$ đủ nhỏ để $x_i+\theta d^j_i>0$ với mọi $i\in B$; điều này làm được vì chỉ có hữu hạn chỉ số $i$. Khi đó $x+\theta d^j\ge0$, $A(x+\theta d^j)=b$, nên $x+\theta d^j\in P$, và $c^T(x+\theta d^j)=c^Tx+\theta\bar c_j>c^Tx$, trái với tính tối ưu của $x$. $\square$
:::

Phần (a) nói rằng mọi hướng từ $x$ vào miền khả thi là tổ hợp không âm của $n-m$ hướng cơ sở, nên chỉ cần kiểm tra $n-m$ số $\bar c_j$ thay cho vô số hướng. Phần (b) là điều kiện dừng của phương pháp đơn hình. Phần (c) cho biết điều kiện này cũng cần khi đỉnh không suy biến: một chi phí rút gọn dương tại đỉnh không suy biến chứng tỏ đỉnh chưa tối ưu.

Bước 4 của chứng minh cho thấy vì sao cần giả thiết không suy biến ở (c). Nếu một biến cơ sở $x_i$ bằng $0$ và $d^j_i<0$, mọi $\theta>0$ đều làm $x_i$ âm, nên hướng $d^j$ không đi vào miền dù $\bar c_j>0$. Khi đó, $x$ có thể đã tối ưu và chỉ có cơ sở $B$ là chưa chứng nhận được điều đó.

::: example Ví dụ 07.19 (Kiểm tra tối ưu tại hai đỉnh của bài toán hộp hạt)
**Dữ kiện.** Dạng chuẩn hộp hạt: cực đại $2x_1+3x_2$ (biến bù có hệ số $0$), $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm, thứ tự $(x_1,x_2,s_1,s_2,s_3)$.

**Tại $(0,0)$.** Cơ sở $B=\{s_1,s_2,s_3\}$, $A_B=I$, $c_B=0$, nghiệm $(0,0,30,20,54)$ không suy biến. Theo (5.1), $d^{x_1}=(1,0,-1,0,-1)$ và $d^{x_2}=(0,1,0,-1,-2)$; theo (5.2), $\bar c_{x_1}=2$ và $\bar c_{x_2}=3$. Có chi phí rút gọn dương tại một đỉnh không suy biến, nên theo Mệnh đề 07.33(c), $(0,0)$ chưa tối ưu.

**Tại $(30,12)$.** Cơ sở $\{x_1,x_2,s_2\}$, nghiệm $(30,12,0,8,0)$, hai biến ngoài cơ sở $s_1$, $s_3$. Giải ba phương trình theo các biến cơ sở:

- phương trình thứ nhất cho $x_1=30-s_1$;
- phương trình thứ ba cho $x_2=\tfrac12(54-x_1-s_3)=12+\tfrac12s_1-\tfrac12s_3$;
- phương trình thứ hai cho $s_2=20-x_2=8-\tfrac12s_1+\tfrac12s_3$.

Đọc hệ số của $s_1$ và $s_3$: $d^{s_1}=(-1,\tfrac12,1,-\tfrac12,0)$ và $d^{s_3}=(0,-\tfrac12,0,\tfrac12,1)$. Do đó $\bar c_{s_1}=2\cdot(-1)+3\cdot\tfrac12=-\tfrac12$ và $\bar c_{s_3}=3\cdot(-\tfrac12)=-\tfrac32$. Cả hai âm, nên theo Mệnh đề 07.33(b), $(30,12)$ tối ưu với $z^*=96$.

**Kiểm tra lại.** $Ad^{s_1}=(-1+1,\ \tfrac12-\tfrac12,\ -1+1)=0$. Hai số $-\bar c_{s_1}=\tfrac12$ và $-\bar c_{s_3}=\tfrac32$ trùng hai hệ số nhân của Ví dụ 07.5, nơi $2x_1+3x_2=\tfrac12x_1+\tfrac32(x_1+2x_2)\le\tfrac12\cdot30+\tfrac32\cdot54=96$; giới hạn loại 2, có biến bù $s_2$ trong cơ sở, nhận hệ số $0$.
:::

Dòng kiểm tra của Ví dụ 07.19 cho thấy chi phí rút gọn của các biến bù ngoài cơ sở, đổi dấu, chính là các nhân tử không âm của chứng nhận cận trên trong Mệnh đề 02.11 và Mệnh đề 03.11. Mệnh đề 07.33(b) vì vậy vừa là điều kiện dừng vừa cho luôn một chứng nhận tối ưu, không cần đoán các ràng buộc hoạt động như ở Ví dụ 07.5.

Như vậy, chi phí rút gọn trả lời câu hỏi thứ nhất: tại một đỉnh không suy biến, đỉnh tối ưu khi và chỉ khi mọi $\bar c_j\le0$. Khi có một $\bar c_j>0$, Ví dụ 07.18 cho thấy bước đi dọc $d^j$ bị chặn bởi biến cơ sở đầu tiên về $0$, và quy tắc tổng quát cho độ dài bước là nội dung của Mục 5.2.

### 5.2 Phép thử tỉ số, bước xoay và tính không bị chặn

Trong Ví dụ 07.18, dọc hướng $d^{s_2}$ có hai biến cơ sở giảm: $x_2=20-\theta$ và $s_1=16-2\theta$. Mỗi biến cho một cận, $\tfrac{20}1=20$ và $\tfrac{16}2=8$, và độ dài bước là cận nhỏ nhất, $8$, đạt tại $s_1$. Tại điểm mới, $s_1=0$ còn $s_2=8$, nên $s_2$ thay $s_1$ trong cơ sở và cơ sở mới là $\{x_1,x_2,s_2\}$, đúng cơ sở của $(30,12)$ ở Ví dụ 07.19. Nếu không có biến cơ sở nào giảm dọc $d^j$, sẽ không có cận nào, và mục tiêu tăng mãi. Hai khả năng đó được phát biểu cho mọi bài toán dạng chuẩn trong mệnh đề sau.

::: proposition Mệnh đề 07.34 (Phép thử tỉ số, bước xoay và tính không bị chặn)
**Giả thiết.** Bài toán dạng chuẩn (2.2) với $\operatorname{rank}(A)=m$; $x$ là nghiệm cơ sở khả thi với cơ sở $B$; $j\in B^{\mathrm c}$ có $\bar c_j>0$; $d^j$ là hướng cơ sở (5.1).

**Kết luận.**

- (a) Nếu $d^j_i\ge0$ với mọi $i\in B$, thì $x+\theta d^j\in P$ với mọi $\theta\ge0$ và $c^T(x+\theta d^j)=c^Tx+\theta\bar c_j\to+\infty$ khi $\theta\to+\infty$: bài toán không bị chặn.
- (b) Nếu có $i\in B$ với $d^j_i<0$, đặt

$$
\theta^*=\min\left\{\frac{x_i}{-d^j_i}\ \middle|\ i\in B,\ d^j_i<0\right\}
\tag{5.3}
$$

và gọi $l\in B$ là một chỉ số đạt cực tiểu. Khi đó $B'=(B\setminus\{l\})\cup\{j\}$ là một cơ sở, $x^+=x+\theta^*d^j$ là nghiệm cơ sở khả thi ứng với $B'$, và $c^Tx^+=c^Tx+\theta^*\bar c_j\ge c^Tx$, với dấu bằng khi và chỉ khi $\theta^*=0$.

Phép tính (5.3) gọi là phép thử tỉ số (ratio test); phép chuyển từ $B$ sang $B'$ gọi là bước xoay (pivot), với $x_j$ là biến vào (entering variable) và $x_l$ là biến ra (leaving variable).

**Điều kiện áp dụng.** Mọi nghiệm cơ sở khả thi; khi $x$ suy biến có thể xảy ra $\theta^*=0$.

**Phạm vi.** Mệnh đề không nói chọn $j$ nào khi có nhiều $\bar c_j>0$, cũng không nói chọn $l$ nào khi nhiều chỉ số đạt cực tiểu ở (5.3).
:::

::: proof Chứng minh Mệnh đề 07.34
**Bước 1 (phương trình được giữ).** Theo (5.1), $Ad^j=A_Bd^j_B+A_j=-A_j+A_j=0$, nên $A(x+\theta d^j)=b$ với mọi $\theta$.

**Bước 2 (phần (a)).** Với $\theta\ge0$, thành phần cơ sở $x_i+\theta d^j_i\ge x_i\ge0$ vì $d^j_i\ge0$; thành phần thứ $j$ bằng $\theta\ge0$; các thành phần ngoài cơ sở khác bằng $0$. Vậy $x+\theta d^j\in P$, và theo (5.2), $c^T(x+\theta d^j)=c^Tx+\theta\bar c_j$, tăng không bị chặn vì $\bar c_j>0$.

**Bước 3 ($x^+$ khả thi và $x^+_l=0$).** Vì $x_i\ge0$ với mọi $i$, ta có $\theta^*\ge0$. Với $i\in B$ và $d^j_i\ge0$, $x^+_i\ge x_i\ge0$. Với $i\in B$ và $d^j_i<0$, định nghĩa (5.3) cho $\theta^*\le x_i/(-d^j_i)$, tức $x^+_i=x_i+\theta^*d^j_i\ge0$, với dấu bằng tại $i=l$. Ngoài ra $x^+_j=\theta^*\ge0$ và các thành phần ngoài cơ sở khác bằng $0$. Cùng với Bước 1, $x^+\in P$.

**Bước 4 ($B'$ là cơ sở).** Đặt $\alpha=A_B^{-1}A_j=-d^j_B$, nên $A_j=\sum_{i\in B}\alpha_iA_i$ và $\alpha_l=-d^j_l>0$. Giả sử $\sum_{i\in B\setminus\{l\}}\gamma_iA_i+\delta A_j=0$. Thế biểu diễn của $A_j$ vào, ta được

$$
\sum_{i\in B\setminus\{l\}}(\gamma_i+\delta\alpha_i)A_i+\delta\alpha_lA_l=0 .
$$

Các cột $A_i$, $i\in B$, độc lập tuyến tính, nên $\delta\alpha_l=0$, kéo theo $\delta=0$, rồi $\gamma_i=0$ với mọi $i$. Vậy $m$ cột của $A_{B'}$ độc lập và $A_{B'}$ khả nghịch.

**Bước 5 ($x^+$ là nghiệm cơ sở của $B'$).** Theo Bước 3, $x^+_k=0$ với mọi $k\notin B'$. Hệ $A_{B'}x^+_{B'}=b$ có nghiệm duy nhất vì $A_{B'}$ khả nghịch, nên $x^+$ là nghiệm cơ sở (2.3) ứng với $B'$; nó khả thi theo Bước 3.

**Bước 6 (giá trị).** Theo (5.2), $c^Tx^+=c^Tx+\theta^*\bar c_j$. Vì $\bar c_j>0$ và $\theta^*\ge0$, $c^Tx^+\ge c^Tx$, với dấu bằng khi và chỉ khi $\theta^*=0$. $\square$
:::

Phần (a) cho một chứng nhận không bị chặn bằng đại số: một hướng $d^j$ với $Ad^j=0$, $d^j\ge0$ và $c^Td^j>0$. Trong Định lý 07.26, kết cục "không bị chặn" chỉ được định nghĩa qua $z^*=+\infty$, còn ở đây phương pháp trả về luôn tia khả thi làm $z$ tăng.

Phép thử tỉ số (5.3) là dạng chuẩn của (3.2) trong Bổ đề 07.19. Ở dạng chuẩn, chỉ các biến cơ sở mới có thể chạm $0$ dọc $d^j$, nên chỉ có $m$ tỉ số cần so sánh. Khi $\theta^*>0$, điểm $x^+$ khác $x$ và theo Mệnh đề 07.29, $x^+$ là đỉnh kề của $x$. Khi $\theta^*=0$, cơ sở đổi mà điểm đứng yên; đây là bước xoay suy biến, được xét ở Mục 5.4.

Mệnh đề 07.33 và Mệnh đề 07.34 đủ để chứng minh Bổ đề 07.30 khi đỉnh không suy biến. Phát biểu của bổ đề áp dụng cho mọi đa diện có điểm cực biên, nên trước hết ta đưa đa diện về dạng chuẩn mà giữ điểm cực biên và quan hệ kề.

::: proof Chứng minh Bổ đề 07.30 (trường hợp không suy biến)
**Bước 1 (quy về dạng chuẩn).** Khi $P$ đã ở dạng chuẩn (2.2), bỏ qua bước này. Trong trường hợp chung, để tránh trùng với $m$, $A$, $b$ của (2.2), ta viết $P=\{x\in\mathbb R^n\mid Gx\le h\}$ với $G\in\mathbb R^{p\times n}$ có hàng $g_i^T$, $h\in\mathbb R^p$. Bước này gồm ba bước con.

*Bước 1a (dựng đa diện dạng chuẩn).* Vì $P$ có điểm cực biên, $\operatorname{rank}(G)=n$ (Định lý 07.20). Gọi $W\in\mathbb R^{(p-n)\times p}$ là ma trận có các hàng lập thành một cơ sở của không gian nghiệm trái $\{\eta\mid\eta^TG=0\}$, và đặt $Q=\{s\in\mathbb R^p\mid s\ge0,\ Ws=Wh\}$, một đa diện dạng chuẩn.

*Bước 1b (song ánh).* Ánh xạ $x\mapsto s=h-Gx$ là song ánh affine từ $P$ lên $Q$: đơn ánh vì hạng $n$, và $s\in h-\operatorname{Im}G$ khi và chỉ khi $Ws=Wh$. Nghịch ảnh là $x=(G^TG)^{-1}G^T(h-s)$, nên mục tiêu $c^Tx$ là một hàm affine của $s$. Ràng buộc $g_i^Tx\le h_i$ hoạt động khi và chỉ khi $s_i=0$, và một song ánh affine giữ các tổ hợp lồi, nên giữ điểm cực biên.

*Bước 1c (giữ quan hệ kề).* Với tập chỉ số chung $\mathcal J$, không gian nghiệm $\{d\mid g_i^Td=0,\ i\in\mathcal J\}$ được ánh xạ đơn ánh $d\mapsto\tilde d=-Gd$ lên $\{\tilde d\mid W\tilde d=0,\ \tilde d_i=0,\ i\in\mathcal J\}$. Hai không gian cùng số chiều, nên theo định lý số chiều, các ràng buộc chung có hạng $n-1$ trong $P$ khi và chỉ khi các ràng buộc chung, gồm cả $p-n$ hàng của $W$, có hạng $p-1$ trong $Q$.

Từ đây ta giả sử $P$ ở dạng chuẩn (2.2) và $v$ là nghiệm cơ sở khả thi không suy biến với cơ sở $B$.

**Bước 2 (có một chi phí rút gọn dương).** Vì $c^Tv<z^*$, có $x'\in P$ với $c^Tx'>c^Tv$. Theo Mệnh đề 07.33(a), $\sum_{j\in B^{\mathrm c}}x'_j\bar c_j=c^Tx'-c^Tv>0$. Vì mọi $x'_j\ge0$, có $j\in B^{\mathrm c}$ với $\bar c_j>0$.

**Bước 3 (hướng $d^j$ không phải một tia khả thi).** Nếu $d^j_i\ge0$ với mọi $i\in B$, Mệnh đề 07.34(a) cho $z^*=+\infty$, trái giả thiết. Vậy có $i\in B$ với $d^j_i<0$.

**Bước 4 (một nghiệm cơ sở khả thi tốt hơn).** Vì $v$ không suy biến, mọi $v_i>0$ với $i\in B$, nên $\theta^*>0$ trong (5.3). Theo Mệnh đề 07.34(b), $w=v+\theta^*d^j$ là nghiệm cơ sở khả thi của $B'=(B\setminus\{l\})\cup\{j\}$, là điểm cực biên theo Định lý 07.15, và $c^Tw=c^Tv+\theta^*\bar c_j>c^Tv$.

**Bước 5 ($w$ kề $v$).** Hai cơ sở $B$, $B'$ khác nhau đúng một chỉ số, và $w\ne v$ vì $\theta^*>0$, $d^j\ne0$. Theo Mệnh đề 07.29, $v$ và $w$ kề nhau. $\square$
:::

Chỉ Bước 4 dùng giả thiết không suy biến. Trường hợp suy biến cần một quy tắc chọn biến vào và ra bảo đảm phương pháp không quay vòng, và được chứng minh sau Định lý 07.38. Trên bài toán sau, hai bước xoay dẫn tới phần (a) của Mệnh đề 07.34.

::: example Ví dụ 07.20 (Phát hiện mục tiêu không bị chặn)
**Dữ kiện.** Cực đại $z=x_1+x_2$ dưới $-x_1+x_2\le1$, $x_1-2x_2\le2$, $x_1,x_2\ge0$. Dạng chuẩn: $-x_1+x_2+s_1=1$, $x_1-2x_2+s_2=2$, thứ tự $(x_1,x_2,s_1,s_2)$. Xuất phát từ $(0,0)$ với $B=\{s_1,s_2\}$, $A_B=I$, $c_B=0$.

**Bước 1.** $\bar c_{x_1}=\bar c_{x_2}=1$; chọn $x_1$, chỉ số nhỏ hơn. Ta có $s_1=1+x_1$ và $s_2=2-x_1$, nên $d^{x_1}=(1,0,1,-1)$. Chỉ $s_2$ giảm, và (5.3) cho $\theta^*=\tfrac21=2$, $l=s_2$. Điểm mới $(2,0)$ với $s_1=3$, $z=2$, cơ sở $\{s_1,x_1\}$.

**Bước 2.** Giải theo biến cơ sở mới: $x_1=2+2x_2-s_2$, $s_1=1+x_1-x_2=3+x_2-s_2$. Mục tiêu $z=x_1+x_2=2+3x_2-s_2$, nên $\bar c_{x_2}=3>0$ và $\bar c_{s_2}=-1$. Với $x_2$ vào, $d^{x_2}$ có $d_{x_1}=2$ và $d_{s_1}=1$, đều không âm.

**Kết luận.** Theo Mệnh đề 07.34(a), bài toán không bị chặn: dọc tia $(x_1,x_2)=(2+2\theta,\theta)$, $\theta\ge0$, mục tiêu là $z=2+3\theta$.

**Kiểm tra lại.** Trên tia, $-(2+2\theta)+\theta=-2-\theta\le1$ và $(2+2\theta)-2\theta=2\le2$, nên mọi điểm khả thi; tia nằm trên đường biên $x_1-2x_2=2$.
:::

Như vậy, Mệnh đề 07.34 trả lời câu hỏi đi bao xa và đổi cơ sở thế nào, đồng thời cho một cách phát hiện bài toán không bị chặn. Ghép nó với điều kiện dừng của Mệnh đề 07.33, ta được một thuật toán hoàn chỉnh khi đã có cơ sở xuất phát. Chúng ta phát biểu thuật toán đó và chứng minh nó dừng ở Mục 5.3.

### 5.3 Thuật toán đơn hình và tính hữu hạn

Tại $(0,0)$ của bài toán hộp hạt, Ví dụ 07.19 cho hai chi phí rút gọn dương, $\bar c_{x_1}=2$ và $\bar c_{x_2}=3$. Hai lựa chọn biến vào dẫn tới hai đỉnh kề khác nhau, và từ đó tới hai đường đi khác nhau. Thuật toán dưới đây để ngỏ lựa chọn này và chỉ dùng hai mệnh đề của Mục 5.1–5.2.

::: algorithm Thuật toán 07.2 (Phương pháp đơn hình)
**Đầu vào.** Bài toán dạng chuẩn (2.2) với $\operatorname{rank}(A)=m$; một cơ sở khả thi $B$, tức $A_B^{-1}b\ge0$.

**Các bước.**

1. Tính nghiệm cơ sở $x_B=A_B^{-1}b$, $x_{B^{\mathrm c}}=0$, và chi phí rút gọn $\bar c_j$ theo (5.2) cho mọi $j\in B^{\mathrm c}$.
2. Nếu $\bar c_j\le0$ với mọi $j\in B^{\mathrm c}$, dừng: $x$ là nghiệm tối ưu.
3. Chọn một $j\in B^{\mathrm c}$ có $\bar c_j>0$ theo một quy tắc chọn biến vào, và tính $d^j_B=-A_B^{-1}A_j$.
4. Nếu $d^j_B\ge0$, dừng: bài toán không bị chặn dọc hướng $d^j$.
5. Tính $\theta^*$ theo (5.3), chọn một chỉ số $l$ đạt cực tiểu theo một quy tắc chọn biến ra, gán $B\leftarrow(B\setminus\{l\})\cup\{j\}$ và quay lại bước 1.

**Đầu ra.** Một cơ sở tối ưu cùng nghiệm cơ sở khả thi tối ưu $x$; hoặc một hướng $d^j$ với $Ad^j=0$, $d^j\ge0$, $c^Td^j>0$.

**Điều kiện dừng.** Bước 2 hoặc bước 4.

**Chi phí mỗi bước.** Giải một hệ chuyển vị với $A_B$ để có hàng $c_B^TA_B^{-1}$, rồi $n-m$ tích vô hướng cho các $\bar c_j$; giải một hệ với $A_B$ để có $d^j_B$; $m$ phép chia cho phép thử tỉ số.
:::

Thuật toán 07.2 là Thuật toán 07.1 với bước 1 được thực hiện bằng đại số. Có hai điểm khác. Thứ nhất, một bước xoay có thể có $\theta^*=0$, khi đó cơ sở đổi mà điểm đứng yên, trong khi Thuật toán 07.1 luôn đi sang đỉnh khác. Thứ hai, Thuật toán 07.2 không cần biết trước $z^*$ hữu hạn, vì bước 4 phát hiện trường hợp không bị chặn. Trong bước 4, $d^j\ge0$ tương đương với $d^j_B\ge0$, vì các thành phần ngoài cơ sở của $d^j$ là $0$ và $1$.

Bước 5 làm $z$ tăng thêm $\theta^*\bar c_j$. Khi mọi $\theta^*$ dương, $z$ tăng chặt sau mỗi bước, và tính hữu hạn suy ra từ số cơ sở hữu hạn. Điều đó được phát biểu trong định lý sau, theo Bertsimas và Tsitsiklis (1997, §3.2, Định lý 3.3).

::: theorem Định lý 07.35 (Tính hữu hạn khi không suy biến)
**Giả thiết.** Bài toán dạng chuẩn (2.2) với $\operatorname{rank}(A)=m$ và $P\ne\varnothing$; mọi nghiệm cơ sở khả thi của $P$ không suy biến. Thuật toán 07.2 xuất phát từ một cơ sở khả thi.

**Kết luận.** Với mọi quy tắc chọn biến vào và biến ra, Thuật toán 07.2 dừng sau hữu hạn bước lặp, ở một trong hai trạng thái:

- (a) một cơ sở tối ưu, và nghiệm cơ sở khả thi tương ứng là nghiệm tối ưu;
- (b) một hướng $d$ với $Ad=0$, $d\ge0$, $c^Td>0$, và $z^*=+\infty$.

**Điều kiện áp dụng.** Giả thiết không suy biến được dùng tại mọi đỉnh mà thuật toán đi qua.

**Phạm vi.** Số bước bị chặn bởi số cơ sở, nhiều nhất $\binom nm$; định lý không cho chặn đa thức theo $m$, $n$.
:::

::: proof Chứng minh Định lý 07.35
**Bước 1 (mỗi bước xoay tăng chặt $z$).** Mỗi nghiệm cơ sở khả thi được thăm không suy biến, nên $x_i>0$ với mọi $i\in B$, và $\theta^*>0$ trong (5.3). Theo Mệnh đề 07.34(b), $z$ tăng thêm $\theta^*\bar c_j>0$.

**Bước 2 (không cơ sở nào lặp lại).** Một cơ sở xác định duy nhất nghiệm cơ sở của nó theo (2.3), do đó xác định giá trị $z$. Vì $z$ tăng chặt sau mỗi bước, không cơ sở nào xuất hiện hai lần.

**Bước 3 (hữu hạn).** Có nhiều nhất $\binom nm$ tập $m$ chỉ số, nên thuật toán dừng sau nhiều nhất $\binom nm$ bước lặp.

**Bước 4 (trạng thái khi dừng).** Thuật toán chỉ dừng ở bước 2 hoặc bước 4. Ở bước 2, Mệnh đề 07.33(b) cho (a). Ở bước 4, Mệnh đề 07.34(a) cho (b). $\square$
:::

Định lý 07.35 mạnh hơn Mệnh đề 07.31 ở chỗ nó không cần biết trước $z^*$ hữu hạn và có một chứng nhận cho từng trạng thái dừng. Đổi lại, định lý cần giả thiết không suy biến tại mọi đỉnh, một giả thiết thường không thỏa: khi bài toán hộp hạt có thêm giới hạn $x_1+x_2\le30$, đỉnh $(30,0)$ là một đỉnh suy biến (Ví dụ 07.22). Giả thiết đó được bỏ ở Mục 5.4.

Ta chạy Thuật toán 07.2 trên bài toán hộp hạt với một quy tắc chọn biến vào cụ thể như sau.

::: example Ví dụ 07.21 (Phương pháp đơn hình với quy tắc Dantzig trên bài toán hộp hạt)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm. Xuất phát từ $(0,0)$ với $B=\{s_1,s_2,s_3\}$. Quy tắc chọn biến vào: biến có chi phí rút gọn lớn nhất (quy tắc Dantzig); không có tỉ số nào hòa.

**Bước 0.** Theo Ví dụ 07.19, tại $(0,0)$: $\bar c_{x_1}=2$, $\bar c_{x_2}=3$. Chọn $x_2$; $d^{x_2}=(0,1,0,-1,-2)$, tỉ số $s_2$: $\tfrac{20}1=20$, $s_3$: $\tfrac{54}2=27$, nên $\theta^*=20$ và $s_2$ ra.

**Bước 1.** Cơ sở $\{s_1,x_2,s_3\}$, đỉnh $(0,20)$, $z=60$. Giải theo biến cơ sở: $x_2=20-s_2$, $s_1=30-x_1$, $s_3=54-x_1-2x_2=14-x_1+2s_2$, nên $z=2x_1+60-3s_2$, tức $\bar c_{x_1}=2$, $\bar c_{s_2}=-3$. Chọn $x_1$; tỉ số $s_1$: $30$, $s_3$: $14$, nên $s_3$ ra.

**Bước 2.** Cơ sở $\{x_1,x_2,s_1\}$, đỉnh $(14,20)$, $z=88$. Như ở Ví dụ 07.18, $\bar c_{s_2}=1$ và $\bar c_{s_3}=-2$. Chọn $s_2$; tỉ số $s_1$: $\tfrac{16}2=8$, $x_2$: $20$, nên $s_1$ ra.

**Bước 3.** Cơ sở $\{x_1,x_2,s_2\}$, đỉnh $(30,12)$, $z=96$. Như ở Ví dụ 07.19, $\bar c_{s_1}=-\tfrac12$, $\bar c_{s_3}=-\tfrac32$, nên thuật toán dừng ở bước 2: $(30,12)$ tối ưu.

| Bước | Cơ sở | Đỉnh $(x_1,x_2)$ | $z$ | $\bar c$ ngoài cơ sở | Vào | Tỉ số | Ra |
|---|---|---|---:|---|---|---|---|
| $0$ | $\{s_1,s_2,s_3\}$ | $(0,0)$ | $0$ | $x_1$: $2$; $x_2$: $3$ | $x_2$ | $s_2$: $20$; $s_3$: $27$ | $s_2$ |
| $1$ | $\{s_1,x_2,s_3\}$ | $(0,20)$ | $60$ | $x_1$: $2$; $s_2$: $-3$ | $x_1$ | $s_1$: $30$; $s_3$: $14$ | $s_3$ |
| $2$ | $\{x_1,x_2,s_1\}$ | $(14,20)$ | $88$ | $s_2$: $1$; $s_3$: $-2$ | $s_2$ | $s_1$: $8$; $x_2$: $20$ | $s_1$ |
| $3$ | $\{x_1,x_2,s_2\}$ | $(30,12)$ | $96$ | $s_1$: $-\tfrac12$; $s_3$: $-\tfrac32$ | dừng | | |

**Diễn giải.** Quy tắc Dantzig đi ba bước xoay qua $(0,20)$ và $(14,20)$. Nếu ở bước 0 chọn $x_1$, đường đi là $(0,0)\to(30,0)\to(30,12)$ với $z$ lần lượt $0$, $60$, $96$, chỉ hai bước xoay.

**Kiểm tra lại.** Mỗi bước, $z$ tăng đúng $\theta^*\bar c_j$: $20\cdot3=60$, $14\cdot2=28$, $8\cdot1=8$, và $60+28+8=96$ khớp $z^*$ của Ví dụ 07.15.
:::

![Ngũ giác khả thi của bài toán hộp hạt với giá trị z tại năm đỉnh: (0,0) là 0, (30,0) là 60, (30,12) là 96, (14,20) là 88, (0,20) là 60. Đường liền nét, biến vào có chi phí rút gọn lớn nhất: từ (0,0) lên (0,20), sang (14,20), xuống (30,12), ba bước, z đi 0, 60, 88, 96. Đường nét đứt, x1 vào trước: từ (0,0) sang (30,0), lên (30,12), hai bước, z đi 0, 60, 96. Cả hai đường dừng tại (30,12).](img/lec-07/simplex-two-paths.svg)

Trên hình, đường liền nét là đường của Ví dụ 07.21 và đường nét đứt là đường của Ví dụ 07.17. Biến $x_2$ có chi phí rút gọn lớn hơn tại $(0,0)$, nhưng cạnh dọc trục $x_2$ dẫn tới đường dài hơn. Chi phí rút gọn chỉ đo tốc độ tăng của $z$ trên một đơn vị biến vào, chưa tính độ dài bước và chưa tính các bước còn lại.

Hai đường dừng cùng đỉnh vì tại $(30,12)$ mọi chi phí rút gọn âm chặt: theo Mệnh đề 07.33(a), $z(x')=96-\tfrac12s_1'-\tfrac32s_3'$, nên $(30,12)$ là nghiệm tối ưu duy nhất. Khi một chi phí rút gọn bằng $0$ tại bước dừng, hai quy tắc có thể dừng ở hai đỉnh tối ưu khác nhau (Bài tập 07.8).

::: remark Nhận xét 07.36 (Quy tắc chọn biến vào)
Thuật toán 07.2 đúng với mọi quy tắc chọn biến vào có $\bar c_j>0$, nhưng số bước phụ thuộc quy tắc. Bertsimas và Tsitsiklis (1997, §3.2) và Kupferschmid (2023, §4.4.1, tr. 151–152) nêu các quy tắc thường gặp.

- Chi phí rút gọn lớn nhất (quy tắc Dantzig): rẻ, nhưng phụ thuộc đơn vị đo của biến, vì đổi $x_j$ thành $\alpha x_j$ với $\alpha>0$ chia $\bar c_j$ cho $\alpha$ (Bài tập 07.13).
- Mức tăng lớn nhất của $z$, tức $\theta^*\bar c_j$ lớn nhất: cần một phép thử tỉ số cho mỗi biến ứng viên.
- Cạnh dốc nhất, tức $\bar c_j/\lVert d^j\rVert$ lớn nhất: đo mức tăng của $z$ trên một đơn vị độ dài dọc cạnh; tốn thêm phép tính mỗi bước nhưng thường cần ít bước hơn quy tắc chọn cột đầu tiên có $\bar c_j>0$ (Kupferschmid 2023, tr. 152).
- Chỉ số nhỏ nhất: là một nửa của quy tắc Bland ở Mục 5.4.

Không quy tắc nào trong số này được chứng minh cho số bước bị chặn bởi một đa thức theo $m$ và $n$ (Mục 5.7).
:::

**Trong học máy.** Trong hồi quy $L_1$ dạng (1.2), vector biến của Thuật toán 07.2 gồm hệ số hồi quy và các biến phần dư $t_i$. Mỗi nghiệm cơ sở khả thi mà thuật toán đi qua là một đường hồi quy ứng với một đỉnh; tại đỉnh tối ưu, Mệnh đề 07.25(c) bảo đảm đường đó nội suy chính xác ít nhất $n$ mẫu. Chi phí rút gọn của một biến ngoài cơ sở cho biết mất mát $L_1$ đổi bao nhiêu trên một đơn vị khi tăng biến đó, nên điều kiện dừng của Mệnh đề 07.33(b) là phép kiểm tra tối ưu của bộ hệ số hiện tại, không cần gradient. Hai trạng thái dừng của Định lý 07.35 là hai kết quả mà một bộ giải quy hoạch tuyến tính báo về: có nghiệm tối ưu, hoặc mục tiêu không bị chặn.

Như vậy, Thuật toán 07.2 và Định lý 07.35 cho một phương pháp hoàn chỉnh khi có cơ sở xuất phát và mọi đỉnh không suy biến, với hai trạng thái dừng có chứng nhận. Tuy nhiên, chứng minh tính hữu hạn dựa hoàn toàn vào việc $z$ tăng chặt. Ở Mục 5.4, chúng ta xét điều xảy ra khi một bước xoay có $\theta^*=0$.

### 5.4 Suy biến, quay vòng và quy tắc Bland

Giả sử bài toán hộp hạt có thêm giới hạn tổng sản lượng $x_1+x_2\le30$ nghìn hộp, với biến bù $s_4$. Ba đường biên $x_2=0$, $x_1=30$ và $x_1+x_2=30$ cùng đi qua điểm $(30,0)$, nên trong $\mathbb R^2$ có ba ràng buộc hoạt động tại một đỉnh. Ở dạng chuẩn, đỉnh đó có ít hơn $m=4$ thành phần dương, tức là một nghiệm cơ sở khả thi suy biến. Ta chạy Thuật toán 07.2 qua đỉnh này như sau.

![Miền khả thi của bài toán hộp hạt khi thêm ràng buộc x1 + x2 ≤ 30: tứ giác với bốn đỉnh (0,0), (30,0), (10,20), (0,20), có giá trị z lần lượt 0, 60, 80, 60. Ba đường biên x2 = 0, x1 = 30 (tức s1 = 0) và x1 + x2 = 30 (tức s4 = 0) cùng đi qua đỉnh (30,0), nên đỉnh này suy biến. Đỉnh tối ưu là (10,20) với z bằng 80.](img/lec-07/degenerate-vertex-boxes.svg)

Trên hình, ràng buộc giờ máy $x_1+2x_2\le54$ không còn hoạt động tại đỉnh nào, vì giới hạn tổng sản lượng chặt hơn. Ba đường biên qua $(30,0)$ ứng với ba biến bằng $0$ tại đỉnh đó: $x_2$, $s_1$ và $s_4$.

::: example Ví dụ 07.22 (Bước xoay suy biến trên bài toán hộp hạt có giới hạn tổng sản lượng)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới

$$
x_1+s_1=30,\qquad x_2+s_2=20,\qquad x_1+2x_2+s_3=54,\qquad x_1+x_2+s_4=30,
$$

mọi biến không âm, thứ tự $(x_1,x_2,s_1,s_2,s_3,s_4)$. Xuất phát từ $(0,0)$ với $B=\{s_1,s_2,s_3,s_4\}$. Quy tắc chọn: biến vào có chỉ số nhỏ nhất trong các biến có $\bar c_j>0$; khi tỉ số hòa, biến ra có chỉ số nhỏ nhất. Đây là quy tắc Bland, phát biểu chính xác ở Định nghĩa 07.37.

**Bước 0.** $\bar c_{x_1}=2$, $\bar c_{x_2}=3$; chọn $x_1$. Dọc $d^{x_1}$, ba biến $s_1$, $s_3$, $s_4$ giảm với tỉ số $30$, $54$, $30$. Tỉ số $30$ hòa giữa $s_1$ và $s_4$; chọn $s_1$. Điểm mới $(30,0)$, cơ sở $\{x_1,s_2,s_3,s_4\}$, với $s_2=20$, $s_3=24$, $s_4=0$: biến cơ sở $s_4$ bằng $0$, nghiệm suy biến. $z=60$.

**Bước 1.** Giải theo biến cơ sở: $x_1=30-s_1$, $s_2=20-x_2$, $s_3=24+s_1-2x_2$, $s_4=s_1-x_2$. Mục tiêu $z=60-2s_1+3x_2$, nên $\bar c_{x_2}=3$; chọn $x_2$. Tỉ số $s_2$: $20$, $s_3$: $12$, $s_4$: $\tfrac01=0$, nên $\theta^*=0$ và $s_4$ ra. Cơ sở mới $\{x_1,x_2,s_2,s_3\}$, điểm vẫn là $(30,0)$, $z$ vẫn bằng $60$.

**Bước 2.** Giải theo biến cơ sở mới: $x_1=30-s_1$, $x_2=s_1-s_4$, $s_2=20-s_1+s_4$, $s_3=24-s_1+2s_4$. Mục tiêu $z=60+s_1-3s_4$, nên $\bar c_{s_1}=1$; chọn $s_1$. Dọc $d^{s_1}$, các biến $x_1$, $s_2$, $s_3$ giảm với tỉ số $30$, $20$, $24$, nên $\theta^*=20$ và $s_2$ ra. Điểm mới $(10,20)$, $z=60+20=80$.

**Bước 3.** Cơ sở $\{x_1,x_2,s_1,s_3\}$: $x_2=20-s_2$, $x_1=10+s_2-s_4$, $s_1=20-s_2+s_4$, $s_3=4+s_2+s_4$, và $z=80-s_2-2s_4$. Hai chi phí rút gọn $-1$ và $-2$ đều âm, nên $(10,20)$ tối ưu với $z^*=80$.

**Diễn giải.** Tỉ số hòa ở bước 0 để lại $s_4=0$ trong cơ sở, nên bước 1 là một bước xoay suy biến: $\theta^*=0$, cơ sở đổi, điểm và $z$ không đổi. Bước đó cần thiết, vì cơ sở $\{x_1,s_2,s_3,s_4\}$ không cho ra cạnh tới $(10,20)$, còn cơ sở mới thì cho.

**Kiểm tra lại.** Tại $(10,20)$: $10\le30$, $20\le20$, $10+40=50\le54$, $10+20=30\le30$. Với hai hệ số nhân $1$ và $2$ đọc từ chi phí rút gọn, $2x_1+3x_2=1\cdot x_2+2(x_1+x_2)\le20+2\cdot30=80$.
:::

Với quy tắc Dantzig, cùng bài toán đi $(0,0)\to(0,20)\to(10,20)$ trong hai bước xoay và không gặp bước suy biến: tại $(0,20)$, $x_1$ vào với các tỉ số $s_1$: $30$, $s_3$: $14$, $s_4$: $10$. Suy biến vì vậy là thuộc tính của đỉnh, còn việc có bước xoay suy biến hay không phụ thuộc đường đi.

Về mặt ý tưởng, một bước xoay suy biến không làm $z$ tăng, nên lập luận ở Bước 2 của chứng minh Định lý 07.35 không còn đúng: dãy cơ sở tại cùng một đỉnh có thể quay lại một cơ sở đã gặp, và với một quy tắc chọn tất định, thuật toán khi đó lặp mãi. Mô tả này chưa phải định nghĩa; Định nghĩa 07.37 phát biểu chính xác hiện tượng đó và một quy tắc chọn loại trừ nó.

::: definition Định nghĩa 07.37 (Quay vòng, quy tắc Bland)
**Quay vòng.** Thuật toán 07.2 với một quy tắc chọn tất định quay vòng (cycling) nếu dãy cơ sở của nó có $B^{k}=B^{k+p}$ với một $k\ge0$ và một $p\ge1$. Khi đó mọi bước xoay từ $B^k$ tới $B^{k+p}$ có $\theta^*=0$, và dãy cơ sở lặp mãi với chu kỳ $p$.

**Quy tắc Bland.** Cho bài toán dạng chuẩn với các biến được đánh số $1,\ldots,n$ theo một thứ tự cố định. Quy tắc Bland (Bland's rule), còn gọi là quy tắc chỉ số nhỏ nhất, chọn trong Thuật toán 07.2:

- ở bước 3, biến vào $x_j$ với $j$ là chỉ số nhỏ nhất trong các chỉ số $j\in B^{\mathrm c}$ có $\bar c_j>0$;
- ở bước 5, biến ra $x_l$ với $l$ là chỉ số nhỏ nhất trong các chỉ số đạt cực tiểu ở (5.3).
:::

Quy tắc Bland chỉ dùng dấu của $\bar c_j$ và thứ tự các chỉ số, không dùng độ lớn của $\bar c_j$. Ví dụ 07.22 đã chạy đúng quy tắc này với thứ tự $(x_1,x_2,s_1,s_2,s_3,s_4)$. So với quy tắc Dantzig, quy tắc Bland có thể chọn một biến vào có chi phí rút gọn nhỏ, như $x_1$ thay cho $x_2$ ở bước 0 của ví dụ đó.

Quy tắc Bland không tránh bước xoay suy biến: trong Ví dụ 07.22, nó đi qua một bước có $\theta^*=0$ mà quy tắc Dantzig tránh được. Điều quy tắc bảo đảm là dãy cơ sở không lặp lại, nên thuật toán dừng, theo định lý sau.

::: theorem Định lý 07.38 (Quy tắc Bland chống quay vòng)
**Giả thiết.** Bài toán dạng chuẩn (2.2) với $\operatorname{rank}(A)=m$; Thuật toán 07.2 xuất phát từ một cơ sở khả thi và dùng quy tắc Bland (Định nghĩa 07.37).

**Kết luận.** Thuật toán không quay vòng và dừng sau hữu hạn bước lặp, ở một trong hai trạng thái của Định lý 07.35: một cơ sở tối ưu, hoặc một hướng $d$ với $Ad=0$, $d\ge0$, $c^Td>0$.

**Điều kiện áp dụng.** Không cần giả thiết không suy biến.

**Phạm vi.** Định lý không chặn số bước theo một đa thức của $m$, $n$ (Mục 5.7).
:::

Chứng minh nằm ngoài phạm vi học phần; xem Vanderbei (2014, §3.4, tr. 31–33, Định lý 3.3) và Bertsimas và Tsitsiklis (1997, §3.4). Ý tưởng chính như sau. Giả sử thuật toán quay vòng; khi đó mọi bước trong vòng có $\theta^*=0$ và $z$ không đổi. Gọi $j_{\max}$ là chỉ số lớn nhất trong các biến vừa vào vừa ra trong vòng, rồi so sánh hai biểu diễn của mục tiêu: tại bước $x_{j_{\max}}$ rời cơ sở và tại bước $x_{j_{\max}}$ vào lại cơ sở. Đẳng thức giữa hai biểu diễn buộc có một chỉ số $j_0<j_{\max}$ cũng đạt cực tiểu ở phép thử tỉ số tại bước $x_{j_{\max}}$ rời cơ sở, nên quy tắc Bland đã phải chọn $x_{j_0}$, mâu thuẫn.

Định lý 07.38 bỏ giả thiết không suy biến của Định lý 07.35, nên phương pháp đơn hình với quy tắc Bland dừng trên mọi bài toán dạng chuẩn có cơ sở khả thi xuất phát. Nhờ đó, chúng ta hoàn tất được chứng minh Bổ đề 07.30 trong trường hợp suy biến.

::: proof Chứng minh Bổ đề 07.30 (trường hợp suy biến)
**Bước 1 (quy về dạng chuẩn).** Như Bước 1 của chứng minh trong trường hợp không suy biến, ta giả sử $P$ ở dạng chuẩn (2.2) và $v$ là nghiệm cơ sở khả thi với một cơ sở $B^0$.

**Bước 2 (chạy phương pháp đơn hình).** Chạy Thuật toán 07.2 với quy tắc Bland từ $B^0$, thu được dãy cơ sở $B^0,B^1,\ldots,B^K$ và dãy nghiệm cơ sở khả thi $x^0=v,x^1,\ldots,x^K$. Theo Định lý 07.38, dãy hữu hạn. Thuật toán không dừng ở trạng thái không bị chặn, vì khi đó Mệnh đề 07.34(a) cho $z^*=+\infty$, trái giả thiết. Vậy $x^K$ tối ưu, và $c^Tx^K=z^*>c^Tv$.

**Bước 3 (bước xoay đầu tiên có di chuyển).** Vì $x^K\ne v$, có chỉ số $k$ nhỏ nhất với $x^{k+1}\ne x^k$. Khi đó $x^0=\cdots=x^k=v$, nên $B^k$ là một cơ sở của $v$, và bước xoay thứ $k$ có $\theta^*>0$. Theo Mệnh đề 07.34(b), $w=x^{k+1}$ là nghiệm cơ sở khả thi của $B^{k+1}$, là điểm cực biên theo Định lý 07.15, và $c^Tw=c^Tv+\theta^*\bar c_j>c^Tv$.

**Bước 4 ($w$ kề $v$).** Hai cơ sở $B^k$, $B^{k+1}$ khác nhau đúng một chỉ số và cho hai điểm khác nhau $v$, $w$. Theo Mệnh đề 07.29, $v$ và $w$ kề nhau. $\square$
:::

::: remark Nhận xét 07.39 (Quy tắc thứ tự từ điển và ví dụ quay vòng)
Quay vòng không xảy ra trên các ví dụ hai biến của chương. Theo Vanderbei (2014, tr. 26–27), một bài toán có nghiệm tối ưu mà quay vòng ngoài điểm tối ưu cần ít nhất bốn biến quyết định và hai ràng buộc. Ví dụ của Vanderbei (§3.2, tr. 26–28) có bốn biến và ba ràng buộc: với quy tắc chi phí rút gọn lớn nhất và cách phá hòa tỉ số theo chỉ số nhỏ nhất, thuật toán quay lại cơ sở ban đầu sau sáu bước xoay. Bertsimas và Tsitsiklis (1997, Chương 3) cũng đưa một ví dụ quay vòng ở dạng bảng.

Ngoài quy tắc Bland còn có quy tắc thứ tự từ điển (lexicographic rule). Quy tắc này chỉ quy định cách chọn biến ra, nên biến vào vẫn được chọn tự do, chẳng hạn theo quy tắc Dantzig. Nó tương đương với việc nhiễu vế phải $b$ một lượng nhỏ tùy ý để mọi đỉnh trở thành không suy biến (Vanderbei 2014, §3.3, tr. 28–30; Bertsimas và Tsitsiklis 1997, §3.4).

Các bộ giải thực tế xử lý suy biến theo một trong ba cách: bật quy tắc chống quay vòng chỉ khi có hàng với vế phải bằng $0$, nhiễu nhẹ vế phải tại đỉnh suy biến, hoặc chọn ngẫu nhiên giữa các hàng hòa tỉ số (Kupferschmid 2023, §4.5.3, tr. 160–163).
:::

Như vậy, suy biến không làm phương pháp đơn hình sai, nhưng có thể làm nó đứng yên tại một đỉnh qua nhiều bước, và với quy tắc chọn không phù hợp, đứng yên mãi. Quy tắc Bland (Định lý 07.38) loại trừ khả năng đó. Các phép tính ở Ví dụ 07.21 và Ví dụ 07.22 đều phải giải lại hệ phương trình sau mỗi bước xoay; ở Mục 5.5, chúng ta ghi các phép tính đó thành một bảng và cập nhật bảng bằng phép biến đổi hàng.

### 5.5 Bảng đơn hình

Ở mỗi bước của Ví dụ 07.21 và Ví dụ 07.22, ta viết lại các biến cơ sở theo các biến ngoài cơ sở, chẳng hạn $x_2=12+\tfrac12s_1-\tfrac12s_3$. Các hệ số của những biểu diễn đó là các phần tử của $A_B^{-1}A$ và $A_B^{-1}b$, còn các hệ số trong biểu thức của $z$ là các chi phí rút gọn. Ghi các số đó vào một bảng, ta có thể chuyển từ cơ sở này sang cơ sở kề bằng vài phép biến đổi hàng thay cho việc giải lại hệ.

::: definition Định nghĩa 07.40 (Bảng đơn hình)
Cho bài toán dạng chuẩn (2.2) và một cơ sở $B$ với các chỉ số $B(1),\ldots,B(m)$ xếp theo thứ tự cột của $A_B$. Bảng đơn hình (simplex tableau) của $B$ là ma trận cỡ $(m+1)\times(n+1)$

$$
\begin{bmatrix}
A_B^{-1}A & A_B^{-1}b\\
\bar c^T & -z
\end{bmatrix},
\qquad
\bar c^T=c^T-c_B^TA_B^{-1}A,\quad z=c_B^TA_B^{-1}b .
\tag{5.4}
$$

Hàng thứ $p$ của phần trên ứng với biến cơ sở $x_{B(p)}$; cột thứ $j$ ứng với biến $x_j$; cột cuối, ghi tiêu đề "vế phải", là $x_B$ ở phần trên và $-z$ ở hàng cuối. Hàng cuối gọi là hàng chi phí rút gọn, ghi nhãn "$\bar c$ và $-z$".
:::

Mỗi phần của (5.4) có một nghĩa đã gặp. Cột $j$ của phần trên là $A_B^{-1}A_j=-d^j_B$, nên hướng cơ sở đọc được từ bảng bằng cách đổi dấu. Các cột ứng với biến cơ sở là các cột của ma trận đơn vị. Theo (5.2), hàng cuối chứa $\bar c_j$ tại các cột ngoài cơ sở và $0$ tại các cột cơ sở, còn ô góc là $-z$.

Đọc theo hàng, hàng thứ $p$ của phần trên là phương trình $x_{B(p)}+\sum_{j\in B^{\mathrm c}}(A_B^{-1}A)_{pj}x_j=(x_B)_p$, chính là biểu diễn của biến cơ sở mà Ví dụ 07.18 tính thủ công. Hàng cuối là phương trình $\sum_{j\in B^{\mathrm c}}\bar c_jx_j-z=-c_B^Tx_B$, tức $z=c_B^Tx_B+\sum_{j\in B^{\mathrm c}}\bar c_jx_j$, phát biểu (a) của Mệnh đề 07.33 viết theo biến. Trong phép thử tỉ số (5.3), điều kiện $d^j_i<0$ thành "phần tử ở cột $j$ dương", và tỉ số là phần tử cột cuối chia phần tử cột $j$ trên cùng hàng.

Bảng của cơ sở mới thu được từ bảng cũ bằng phép biến đổi hàng, theo mệnh đề sau.

::: proposition Mệnh đề 07.41 (Bước xoay trên bảng là phép biến đổi hàng)
**Giả thiết.** Bảng đơn hình (5.4) của một cơ sở khả thi $B$; $j\in B^{\mathrm c}$ có $\bar c_j>0$; cột $\alpha=A_B^{-1}A_j$ của biến vào có ít nhất một thành phần dương; hàng $p$ đạt cực tiểu của các tỉ số $(x_B)_i/\alpha_i$, $\alpha_i>0$, và $l=B(p)$. Phần tử $\alpha_p>0$ gọi là phần tử xoay (pivot element).

**Kết luận.** Thực hiện lần lượt:

1. chia hàng $p$ cho $\alpha_p$;
2. với mỗi hàng $i\ne p$ của phần trên, trừ $\alpha_i$ lần hàng $p$ mới;
3. trừ khỏi hàng cuối $\bar c_j$ lần hàng $p$ mới.

Bảng thu được là bảng đơn hình của $B'=(B\setminus\{l\})\cup\{j\}$, với hàng $p$ nay ứng với $x_j$.

**Điều kiện áp dụng.** Mọi bước xoay của Thuật toán 07.2, kể cả bước có $\theta^*=0$.

**Phạm vi.** Mệnh đề nói về phép tính; việc chọn $j$ và $p$ theo quy tắc nào vẫn do Thuật toán 07.2 quy định.
:::

::: proof Chứng minh Mệnh đề 07.41
**Bước 1 (phần trên).** Hai phép đầu chỉ tác động lên phần trên và tương đương với nhân trái $A_B^{-1}[A\mid b]$ với một ma trận khả nghịch $Q\in\mathbb R^{m\times m}$, vì mỗi phép là một phép biến đổi hàng sơ cấp và $\alpha_p\ne0$. Sau các phép đó, cột $j$ thành vector đơn vị $e_p$. Các cột của biến cơ sở $B(i)$, $i\ne p$, là $e_i$ và có phần tử $0$ ở hàng $p$, nên không đổi. Vậy $QA_B^{-1}A_{B'}=I$ khi các cột của $B'$ xếp theo thứ tự hàng, tức $QA_B^{-1}=A_{B'}^{-1}$, và phần trên mới là $A_{B'}^{-1}[A\mid b]$.

**Bước 2 (hàng cuối).** Hàng cuối của bảng cũ là $[c^T\mid0]-c_B^TA_B^{-1}[A\mid b]$, tức $[c^T\mid0]$ trừ một tổ hợp tuyến tính các hàng của $[A\mid b]$. Hàng $p$ mới cũng là một tổ hợp tuyến tính các hàng của $[A\mid b]$, nên sau phép 3, hàng cuối mới vẫn có dạng $[c^T\mid0]-\eta^T[A\mid b]$ với một $\eta\in\mathbb R^m$. Phần tử của nó tại cột $j$ bằng $\bar c_j-\bar c_j\cdot1=0$, và tại các cột $B(i)$, $i\ne p$, vẫn bằng $0$ vì hàng $p$ mới có $0$ ở các cột đó.

**Bước 3 (xác định $\eta$).** Hàng cuối mới bằng $0$ tại mọi cột của $B'$, tức $c_{B'}^T-\eta^TA_{B'}=0$, nên $\eta^T=c_{B'}^TA_{B'}^{-1}$. Thế vào, hàng cuối mới là $[c^T-c_{B'}^TA_{B'}^{-1}A\mid-c_{B'}^TA_{B'}^{-1}b]$, đúng hàng cuối của (5.4) cho $B'$. $\square$
:::

Mệnh đề 07.41 cho thấy một bước xoay chỉ cần các phép cộng, nhân trên $(m+1)(n+1)$ ô của bảng, không cần nghịch đảo $A_{B'}$. Khi bảng xuất phát có $A_B=I$, như khi cơ sở gồm các biến bù, bảng đầu tiên chính là $[A\mid b]$ với hàng cuối $[c^T\mid0]$.

::: example Ví dụ 07.23 (Bảng đơn hình của bài toán hộp hạt)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm, thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$. Xuất phát từ cơ sở $\{s_1,s_2,s_3\}$ với quy tắc Bland.

**Bảng 0.** Cơ sở gồm các biến bù, $A_B=I$, nên bảng là $[A\mid b]$ với hàng cuối $[c^T\mid0]$.

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|
| $s_1$ | $1$ | $0$ | $1$ | $0$ | $0$ | $30$ |
| $s_2$ | $0$ | $1$ | $0$ | $1$ | $0$ | $20$ |
| $s_3$ | $1$ | $2$ | $0$ | $0$ | $1$ | $54$ |
| $\bar c$ và $-z$ | $2$ | $3$ | $0$ | $0$ | $0$ | $0$ |

**Bước xoay thứ nhất.** Theo quy tắc Bland, $x_1$ vào vì có chỉ số nhỏ nhất trong hai cột có $\bar c_j>0$. Cột $x_1$ dương ở hàng $s_1$ và $s_3$, với tỉ số $\tfrac{30}1=30$ và $\tfrac{54}1=54$, nên $s_1$ ra và phần tử xoay là $1$ ở hàng $s_1$. Hàng $s_1$ giữ nguyên, hàng $s_3$ trừ $1$ lần hàng đó, hàng cuối trừ $2$ lần hàng đó.

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|
| $x_1$ | $1$ | $0$ | $1$ | $0$ | $0$ | $30$ |
| $s_2$ | $0$ | $1$ | $0$ | $1$ | $0$ | $20$ |
| $s_3$ | $0$ | $2$ | $-1$ | $0$ | $1$ | $24$ |
| $\bar c$ và $-z$ | $0$ | $3$ | $-2$ | $0$ | $0$ | $-60$ |

Bảng này ứng với đỉnh $(30,0)$, $z=60$.

**Bước xoay thứ hai.** Chỉ $\bar c_{x_2}=3$ dương, nên $x_2$ vào. Cột $x_2$ dương ở hàng $s_2$ và $s_3$, với tỉ số $\tfrac{20}1=20$ và $\tfrac{24}2=12$, nên $s_3$ ra và phần tử xoay là $2$. Chia hàng $s_3$ cho $2$ được $(0,1,-\tfrac12,0,\tfrac12\mid12)$; hàng $s_2$ trừ $1$ lần hàng mới; hàng cuối trừ $3$ lần hàng mới; hàng $x_1$ có $0$ ở cột $x_2$ nên giữ nguyên.

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | vế phải |
|---|---:|---:|---:|---:|---:|---:|
| $x_1$ | $1$ | $0$ | $1$ | $0$ | $0$ | $30$ |
| $s_2$ | $0$ | $0$ | $\tfrac12$ | $1$ | $-\tfrac12$ | $8$ |
| $x_2$ | $0$ | $1$ | $-\tfrac12$ | $0$ | $\tfrac12$ | $12$ |
| $\bar c$ và $-z$ | $0$ | $0$ | $-\tfrac12$ | $0$ | $-\tfrac32$ | $-96$ |

**Đọc bảng cuối.** Mọi phần tử của hàng cuối không dương, nên theo Mệnh đề 07.33(b), cơ sở $\{x_1,x_2,s_2\}$ tối ưu: $x=(30,12)$, $s_2=8$, $z^*=96$.

**Diễn giải.** Hai bước xoay đi đúng đường $(0,0)\to(30,0)\to(30,12)$ của Ví dụ 07.17, nhưng giá trị của mỗi đỉnh và chứng nhận tối ưu nay đọc từ bảng thay cho hình. Hai số $-\bar c_{s_1}=\tfrac12$ và $-\bar c_{s_3}=\tfrac32$ trùng với Ví dụ 07.19 và với hai hệ số nhân của Ví dụ 07.5.

**Kiểm tra lại.** Ba cột $s_1,s_2,s_3$ của bảng cuối là $A_B^{-1}$ với $B=\{x_1,x_2,s_2\}$ và các hàng xếp theo thứ tự $x_1,s_2,x_2$, vì ba cột đó của $A$ là ma trận đơn vị. Nhân với $b=(30,20,54)$: hàng $s_2$ cho $\tfrac12\cdot30+20-\tfrac12\cdot54=8$ và hàng $x_2$ cho $-\tfrac12\cdot30+\tfrac12\cdot54=12$, khớp cột vế phải.
:::

Dòng kiểm tra của Ví dụ 07.23 có một dạng tổng quát: khi các cột biến bù của $A$ lập thành ma trận đơn vị, các cột đó trong bảng cuối chứa $A_B^{-1}$. Vì vậy bảng cho đồng thời nghiệm, giá trị, chứng nhận tối ưu và nghịch đảo của ma trận cơ sở.

::: remark Nhận xét 07.42 (Phương pháp đơn hình cải tiến)
Phương pháp đơn hình cải tiến (còn gọi là đơn hình sửa đổi, revised simplex method) chỉ lưu $A_B^{-1}$, hoặc một phân tích của $A_B$, và ở mỗi bước chỉ tính cột $A_B^{-1}A_j$ của biến vào thay cho cả bảng; $A_B^{-1}$ được cập nhật bằng cùng các phép biến đổi hàng của Mệnh đề 07.41 (Bertsimas và Tsitsiklis 1997, §3.3; Kupferschmid 2023, §4.2, tr. 137–145). Theo so sánh của Bertsimas và Tsitsiklis (1997, §3.3), bảng và dạng cải tiến có chi phí mỗi bước cùng cỡ $mn$ trong trường hợp xấu nhất, nhưng dạng cải tiến chỉ cần bộ nhớ cỡ $m^2$ và nhanh hơn khi $n$ lớn hơn nhiều so với $m$ hoặc khi $A$ thưa. Các bộ giải thực tế dùng dạng cải tiến; bảng là cách ghi phù hợp cho tính thủ công.
:::

Như vậy, bảng đơn hình (Định nghĩa 07.40) ghi toàn bộ dữ liệu của một bước xoay, và Mệnh đề 07.41 cho phép cập nhật nó bằng phép biến đổi hàng. Mọi bảng trên đều xuất phát từ cơ sở các biến bù, khả thi vì $b\ge0$. Khi bài toán có ràng buộc $\ge$ hoặc vế phải âm, cơ sở đó không khả thi, và ở Mục 5.6, chúng ta tìm cơ sở xuất phát bằng một quy hoạch tuyến tính phụ.

### 5.6 Cơ sở khả thi xuất phát và pha I

Giả sử cơ sở đóng hộp hạt ký một hợp đồng buộc tổng sản lượng ít nhất $40$ nghìn hộp: $x_1+x_2\ge40$. Ở dạng chuẩn, ràng buộc này thành $x_1+x_2-s_4=40$ với biến dư $s_4\ge0$. Cơ sở $\{s_1,s_2,s_3,s_4\}$ cho $s_4=-40<0$, nên điểm $x=0$ không khả thi, và chưa có cơ sở xuất phát nào cho Thuật toán 07.2. Thêm vào phương trình đó một biến nhân tạo $\tilde s\ge0$, thành $x_1+x_2-s_4+\tilde s=40$, thì cơ sở $\{s_1,s_2,s_3,\tilde s\}$ khả thi với $\tilde s=40$. Một điểm của bài toán mới với $\tilde s=0$ là một điểm khả thi của bài toán gốc, nên ta cần đưa $\tilde s$ về $0$, tức cực đại $-\tilde s$. Cách làm đó cho bài toán tổng quát được phát biểu trong định nghĩa sau.

::: definition Định nghĩa 07.43 (Bài toán phụ của pha I)
Cho bài toán dạng chuẩn (2.2), trong đó các phương trình có $b_i<0$ đã được nhân với $-1$, nên $b\ge0$. Bài toán phụ (auxiliary problem) là bài toán cực đại sau, với các ràng buộc viết bên phải:

$$
\max_{x,\tilde s}\ -\sum_{i=1}^m\tilde s_i,\qquad Ax+\tilde s=b,\quad x\ge0,\quad\tilde s\ge0,
\tag{5.5}
$$

trong đó $\tilde s\in\mathbb R^m$ là vector biến nhân tạo (artificial variables). Giải (5.5) bằng phương pháp đơn hình từ cơ sở $\{\tilde s_1,\ldots,\tilde s_m\}$ gọi là pha I (Phase I); giải bài toán gốc từ cơ sở mà pha I tìm được gọi là pha II.
:::

Ta ký hiệu giá trị mục tiêu của bài toán phụ là $\tilde z$ và giá trị tối ưu của nó là $\tilde z^*$.

Cơ sở $\{\tilde s_1,\ldots,\tilde s_m\}$ của (5.5) có ma trận cơ sở là ma trận đơn vị và nghiệm $x=0$, $\tilde s=b\ge0$, nên khả thi.

Khi một phương trình đã có biến bù với hệ số $1$ và vế phải không âm, biến bù đó dùng được làm biến cơ sở, và chỉ cần biến nhân tạo cho các phương trình còn lại; ví dụ hợp đồng ở trên chỉ cần một biến nhân tạo.

Biến nhân tạo khác biến bù: biến bù đo phần giới hạn chưa dùng, còn biến nhân tạo đo mức vi phạm phương trình và phải bằng $0$ tại mọi điểm khả thi của bài toán gốc.

::: proposition Mệnh đề 07.44 (Pha I quyết định tính khả thi)
**Giả thiết.** Bài toán dạng chuẩn (2.2) với $\operatorname{rank}(A)=m$ và $b\ge0$; bài toán phụ (5.5) với giá trị tối ưu $\tilde z^*$.

**Kết luận.**

- (a) Bài toán phụ khả thi, $\tilde z^*\le0$, và $\tilde z^*$ được đạt.
- (b) Bài toán gốc khả thi khi và chỉ khi $\tilde z^*=0$.
- (c) Nếu $\tilde z^*=0$ và một cơ sở tối ưu của bài toán phụ còn chứa biến nhân tạo, thì biến đó bằng $0$, và có thể đổi cơ sở, không di chuyển điểm, cho tới khi cơ sở chỉ gồm biến của bài toán gốc. Cơ sở thu được là một cơ sở khả thi của bài toán gốc.

**Điều kiện áp dụng.** Phần (c) dùng giả thiết hạng $\operatorname{rank}(A)=m$.

**Phạm vi.** Pha I không dùng mục tiêu $c$; sau pha I, pha II vẫn có thể kết thúc ở trạng thái không bị chặn. Khi không biết trước hạng của $A$, chứng minh của (c) chỉ ra cách phát hiện và bỏ các phương trình thừa.
:::

::: proof Chứng minh Mệnh đề 07.44
**Bước 1 (phần (a)).** Điểm $(x,\tilde s)=(0,b)$ khả thi vì $b\ge0$. Vì $\tilde s\ge0$, mục tiêu $-\sum_i\tilde s_i\le0$ tại mọi điểm khả thi, nên $\tilde z^*\le0$ hữu hạn, và theo Định lý 07.26, $\tilde z^*$ được đạt.

**Bước 2 (phần (b), chiều thuận).** Nếu $\bar x$ khả thi cho bài toán gốc, $(\bar x,0)$ khả thi cho bài toán phụ với giá trị $0$, nên $\tilde z^*\ge0$. Cùng với (a), $\tilde z^*=0$.

**Bước 3 (phần (b), chiều ngược).** Nếu $\tilde z^*=0$ đạt tại $(x^*,\tilde s^*)$, thì $\sum_i\tilde s^*_i=0$ với mọi $\tilde s^*_i\ge0$, nên $\tilde s^*=0$. Khi đó $Ax^*=b$, $x^*\ge0$: bài toán gốc khả thi.

**Bước 4 (phần (c)).** Tại nghiệm tối ưu, $\tilde s^*=0$ theo Bước 3, nên biến nhân tạo trong cơ sở, nằm ở hàng $p$ của bảng, có giá trị $0$. Phần của hàng $p$ ở các cột biến gốc là $e_p^TA_{B}^{-1}A$, với $A_B$ là ma trận cơ sở của bài toán phụ. Nếu phần này bằng $0$, vector $\eta^T=e_p^TA_B^{-1}\ne0$ thỏa $\eta^TA=0$, trái giả thiết hạng $m$.

Khi không có giả thiết hạng $m$, trường hợp này cho một vector $\eta\ne0$ với $\eta^TA=0$. Vì $\tilde z^*=0$, bài toán gốc có điểm khả thi $x^*$, nên $\eta^Tb=\eta^TAx^*=0$. Gọi $r$ là chỉ số của biến nhân tạo $\tilde s_r$ nằm ở hàng $p$. Phần tử của hàng $p$ ở cột $\tilde s_r$ là $e_p^TA_B^{-1}e_r=\eta_r$, và bằng $1$ vì $\tilde s_r$ là biến cơ sở của hàng đó. Do $\eta_r\ne0$, phương trình thứ $r$ của $Ax=b$ là tổ hợp tuyến tính của các phương trình khác, nên bỏ nó không đổi tập khả thi. Ta bỏ hàng $p$ của bảng và cột $\tilde s_r$, rồi tiếp tục đưa các biến nhân tạo còn lại ra khỏi cơ sở với $m-1$ phương trình; pha I đã dừng, nên không cần chạy lại (Bertsimas và Tsitsiklis 1997, §3.5).

Với giả thiết hạng $m$, có một cột biến gốc $j$ ngoài cơ sở với phần tử khác $0$ ở hàng $p$. Xoay trên phần tử đó bằng ba phép biến đổi hàng của Mệnh đề 07.41; chứng minh của mệnh đề chỉ dùng điều kiện phần tử xoay khác $0$. Vì vế phải của hàng $p$ bằng $0$, cột vế phải không đổi, nên điểm giữ nguyên và vẫn khả thi, và cơ sở mới có ít hơn một biến nhân tạo. Lặp lại nhiều nhất $m$ lần, cơ sở chỉ còn biến gốc, ma trận cơ sở là các cột của $A$, khả nghịch, và nghiệm cơ sở là $x^*\ge0$. $\square$
:::

Mệnh đề 07.44 biến câu hỏi "miền khả thi có rỗng không" thành một quy hoạch tuyến tính có sẵn cơ sở xuất phát. Ghép pha I với Thuật toán 07.2, ta được thuật toán sau.

::: algorithm Thuật toán 07.3 (Phương pháp hai pha)
**Đầu vào.** Bài toán $\max c^Tx$ với $Ax=b$, $x\ge0$, trong đó $A\in\mathbb R^{m\times n}$ (không cần biết trước hạng) và vế phải $b$ bất kỳ.

**Các bước.**

1. Nhân với $-1$ các phương trình có $b_i<0$, để $b\ge0$.
2. Pha I: lập bài toán phụ (5.5) và chạy Thuật toán 07.2 từ cơ sở các biến nhân tạo, với một quy tắc bảo đảm dừng như quy tắc Bland.
3. Nếu $\tilde z^*<0$, dừng: bài toán gốc không khả thi.
4. Nếu $\tilde z^*=0$: đưa các biến nhân tạo còn trong cơ sở ra theo Mệnh đề 07.44(c); nếu hàng của một biến nhân tạo $\tilde s_r$ có mọi phần tử ở cột biến gốc bằng $0$, phương trình thứ $r$ thừa: bỏ hàng đó và cột $\tilde s_r$. Sau đó bỏ các cột nhân tạo còn lại.
5. Pha II: chạy Thuật toán 07.2 trên bài toán gốc từ cơ sở thu được.

**Đầu ra.** Kết luận không khả thi; hoặc kết quả của pha II: một nghiệm cơ sở khả thi tối ưu, hoặc một hướng làm mục tiêu tăng không bị chặn.

**Chi phí mỗi bước.** Pha I là một quy hoạch tuyến tính có thêm nhiều nhất $m$ cột; mỗi bước của hai pha có chi phí như Thuật toán 07.2.
:::

Với quy tắc Bland ở cả hai pha, Thuật toán 07.3 dừng trên mọi bài toán dạng chuẩn và kết thúc ở một trong ba trạng thái: không khả thi, không bị chặn, hoặc có nghiệm cơ sở khả thi tối ưu. Đây là một chứng minh bằng thuật toán cho phần chính của Định lý 07.26 ở dạng chuẩn, theo cách Vanderbei (2014, §3.5, tr. 33) phát biểu định lý cơ bản của quy hoạch tuyến tính.

::: example Ví dụ 07.24 (Pha I và pha II với hợp đồng sản lượng tối thiểu)
**Dữ kiện.** Cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1+x_2\ge40$, $x\ge0$. Dạng chuẩn: $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, $x_1+x_2-s_4=40$, mọi biến không âm. Chỉ phương trình cuối cần biến nhân tạo $\tilde s$; thứ tự biến $(x_1,x_2,s_1,s_2,s_3,s_4,\tilde s)$.

**Bài toán phụ.** Cực đại $\tilde z=-\tilde s$ với $x_1+x_2-s_4+\tilde s=40$ thay cho phương trình cuối; cơ sở xuất phát $\{s_1,s_2,s_3,\tilde s\}$, điểm $x=0$, $\tilde s=40$, $\tilde z=-40$.

**Pha I, bước 1.** Thế $\tilde s=40-x_1-x_2+s_4$: $\tilde z=-40+x_1+x_2-s_4$, nên $\bar c_{x_1}=\bar c_{x_2}=1$, $\bar c_{s_4}=-1$. Theo quy tắc Bland, $x_1$ vào; tỉ số $s_1$: $30$, $s_3$: $54$, $\tilde s$: $40$, nên $s_1$ ra. Điểm $(30,0)$, $\tilde s=10$, $\tilde z=-10$.

**Pha I, bước 2.** Với $x_1=30-s_1$: $\tilde s=10+s_1-x_2+s_4$ và $\tilde z=-10-s_1+x_2-s_4$, nên chỉ $\bar c_{x_2}=1$ dương; $x_2$ vào. Tỉ số $s_2$: $20$, $s_3$: $\tfrac{24}2=12$, $\tilde s$: $10$, nên $\tilde s$ ra. Điểm $(30,10)$, $s_2=10$, $s_3=4$, $\tilde s=0$, $\tilde z=0$.

**Kết thúc pha I.** $\tilde z^*=0$ và cơ sở $\{x_1,x_2,s_2,s_3\}$ không chứa biến nhân tạo; theo Mệnh đề 07.44(b), bài toán gốc khả thi, và đây là cơ sở xuất phát của pha II.

**Pha II.** Pha II dùng quy tắc Dantzig để đi ngắn hơn; với quy tắc Bland, $s_1$ vào trước và đường đi qua $(26,14)$ với $z=94$ trước khi tới cùng đỉnh tối ưu. Với cơ sở $\{x_1,x_2,s_2,s_3\}$: $x_1=30-s_1$, $x_2=10+s_1+s_4$, $s_2=10-s_1-s_4$, $s_3=4-s_1-2s_4$. Mục tiêu $z=2(30-s_1)+3(10+s_1+s_4)=90+s_1+3s_4$. Theo quy tắc Dantzig, $s_4$ vào ($\bar c_{s_4}=3$); tỉ số $s_2$: $10$, $s_3$: $\tfrac42=2$, nên $s_3$ ra và $\theta^*=2$. Điểm mới $(30,12)$, $s_4=2$, $z=90+3\cdot2=96$. Tại cơ sở $\{x_1,x_2,s_2,s_4\}$, $\bar c_{s_1}=-\tfrac12$, $\bar c_{s_3}=-\tfrac32$: tối ưu.

**Diễn giải.** Hợp đồng $40$ không làm đổi phương án tối ưu, vì $(30,12)$ có tổng sản lượng $42\ge40$; biến dư $s_4=2$ là phần vượt hợp đồng.

**Kiểm tra lại.** Tại $(30,10)$: $30+10=40$, $30+20=50\le54$, nên điểm cuối pha I khả thi cho bài toán gốc. Tại $(30,12)$: $42-s_4=40$ cho $s_4=2$.
:::

Nếu hợp đồng là $60$ nghìn hộp, pha I dừng với $\tilde s=18>0$, và theo Mệnh đề 07.44(b), bài toán không khả thi (Bài tập 07.12). Giá trị $18$ là mức thiếu hụt nhỏ nhất, vì tổng sản lượng lớn nhất trên ngũ giác hộp hạt là $42$.

**Trong học máy.** Khi một mô hình phân bổ tài nguyên huấn luyện gom nhiều yêu cầu, chẳng hạn ngân sách giờ GPU, hạn mức năng lượng và một mức tối thiểu cho mỗi tác vụ, các yêu cầu có thể mâu thuẫn mà không yêu cầu nào sai khi đứng riêng. Pha I phát hiện điều đó trước khi tối ưu mục tiêu: bộ giải báo bài toán không khả thi thay cho một nghiệm vô nghĩa, và bảng cuối của pha I cho một chứng nhận như ở Bài tập 07.12. Chẳng hạn, nếu mỗi giờ tinh chỉnh tốn $3$ kWh với hạn mức $180$ kWh, yêu cầu ít nhất $70$ giờ tinh chỉnh cần $210$ kWh, và pha I báo mâu thuẫn đó.

Như vậy, với Thuật toán 07.3 và quy tắc Bland, phương pháp đơn hình áp dụng được cho mọi quy hoạch tuyến tính sau khi đưa về dạng chuẩn. Câu hỏi còn lại là phương pháp cần bao nhiêu bước; Ví dụ 07.21 đã cho thấy số bước phụ thuộc quy tắc chọn, và ở Mục 5.7, chúng ta xét trường hợp xấu nhất.

### 5.7 Hiệu quả của phương pháp đơn hình

Trên ngũ giác hộp hạt, quy tắc Dantzig cần ba bước xoay, trong khi đường ngắn nhất cần hai. Với năm đỉnh, một bước thừa không đáng kể; với $m=20$ phương trình và $n=40$ biến, có thể có tới $\binom{40}{20}\approx1{,}38\cdot10^{11}$ nghiệm cơ sở khả thi. Chặn $\binom nm$ của Định lý 07.35 vì vậy không cho một số bước chấp nhận được. Bài toán sau, của Klee và Minty (1972), cho thấy quy tắc Dantzig có thể đi qua mọi đỉnh.

::: example Ví dụ 07.25 (Bài toán Klee–Minty hai biến)
**Dữ kiện.** Cực đại $z=10x_1+x_2$ dưới $x_1\le1$, $20x_1+x_2\le100$, $x_1,x_2\ge0$. Dạng chuẩn: $x_1+s_1=1$, $20x_1+x_2+s_2=100$, thứ tự $(x_1,x_2,s_1,s_2)$. Miền là tứ giác với bốn đỉnh $(0,0)$, $(1,0)$, $(1,80)$, $(0,100)$. Xuất phát từ $(0,0)$ với $B=\{s_1,s_2\}$, quy tắc Dantzig.

**Bước 1.** $\bar c_{x_1}=10$, $\bar c_{x_2}=1$; $x_1$ vào. Tỉ số $s_1$: $1$, $s_2$: $\tfrac{100}{20}=5$, nên $s_1$ ra. Đỉnh $(1,0)$, $z=10$.

**Bước 2.** Với $x_1=1-s_1$ và $s_2=80+20s_1-x_2$: $z=10-10s_1+x_2$, nên $\bar c_{x_2}=1$, $\bar c_{s_1}=-10$; $x_2$ vào. Tỉ số $s_2$: $80$; $s_2$ ra. Đỉnh $(1,80)$, $z=90$.

**Bước 3.** Với $x_1=1-s_1$ và $x_2=80+20s_1-s_2$: $z=90+10s_1-s_2$, nên $\bar c_{s_1}=10$; $s_1$ vào. Dọc $d^{s_1}$, $x_1$ giảm và $x_2$ tăng; tỉ số $x_1$: $1$, nên $x_1$ ra. Đỉnh $(0,100)$, $z=100$.

**Bước 4.** Với $s_1=1-x_1$ và $x_2=100-20x_1-s_2$: $z=100-10x_1-s_2$. Hai chi phí rút gọn âm, nên $(0,100)$ tối ưu.

**Diễn giải.** Thuật toán đi qua cả bốn đỉnh, với $3=2^2-1$ bước xoay. Nếu ở bước 1 chọn $x_2$, phép thử tỉ số cho $\theta^*=100$ và thuật toán tới $(0,100)$ sau một bước.

**Kiểm tra lại.** $10x_1+x_2=(20x_1+x_2)-10x_1\le100$ vì $x_1\ge0$, với dấu bằng tại $(0,100)$. Các giá trị $0$, $10$, $90$, $100$ tăng chặt, đúng Mệnh đề 07.34(b) với $\theta^*>0$.
:::

Miền của Ví dụ 07.25 gần với hình chữ nhật $0\le x_1\le1$, $0\le x_2\le100$, bị làm nghiêng bởi hệ số $20$ ở ràng buộc thứ hai. Hệ số lợi ích lớn của $x_1$ khiến quy tắc Dantzig chọn $x_1$ trước, và đường đi phải vòng qua hai đỉnh còn lại. Với $n$ biến, mỗi biến thêm vào nhân đôi số đỉnh mà quy tắc Dantzig đi qua (Nhận xét 07.45).

::: remark Nhận xét 07.45 (Số bước trong trường hợp xấu nhất)
Họ bài toán Klee–Minty với $n$ biến là bài toán cực đại sau, với $n$ ràng buộc và điều kiện không âm viết bên phải:

$$
\max\ \sum_{j=1}^n10^{n-j}x_j,\qquad2\sum_{j=1}^{i-1}10^{i-j}x_j+x_i\le100^{i-1}\ \ (i=1,\ldots,n),\qquad x\ge0 .
$$

Miền là một khối gần hình hộp với $2^n$ đỉnh, và phương pháp đơn hình với quy tắc Dantzig, xuất phát từ $x=0$, đi qua cả $2^n$ đỉnh, tức $2^n-1$ bước xoay (Vanderbei 2014, §4.4, tr. 41–44). Với $n=2$, bài toán là Ví dụ 07.25. Các ví dụ cùng loại đã được dựng cho hầu hết các quy tắc chọn được đề xuất, và hiện chưa biết có quy tắc nào bảo đảm số bước đa thức hay không (Vanderbei 2014, tr. 44).

Trên thực tế, số bước thường nhỏ. Trên các bài toán sinh ngẫu nhiên, Vanderbei (2014, §4.5, tr. 44–50) đo được số bước xoay tăng xấp xỉ như một lũy thừa bậc thấp của $\min(m,n)$. Quy hoạch tuyến tính cũng có thuật toán thời gian đa thức, như phương pháp ellipsoid và phương pháp điểm trong (Bertsimas và Tsitsiklis 1997, Chương 8–9).
:::

Theo Bertsimas và Tsitsiklis (1997, §3.6), tên gọi của phương pháp đến từ cách nhìn hình học cột (column geometry), áp dụng cho các bài toán có thêm ràng buộc $\sum_jx_j=1$: mỗi cột $j$ là một điểm $(A_j,c_j)\in\mathbb R^{m+1}$, và một điểm khả thi là một tổ hợp lồi của các điểm đó với phần đầu bằng $b$. Một cơ sở gồm $m+1$ điểm độc lập affine, tức các đỉnh của một đơn hình (simplex), và một bước xoay thay một đỉnh của đơn hình đó để giá trị mục tiêu dọc đường thẳng đi qua $b$ tăng lên. Chữ "đơn hình" ở đây chỉ bao lồi của các điểm độc lập affine, và đơn hình xác suất $\{p\mid\sum_jp_j=1,\ p\ge0\}$ là một trường hợp riêng của khái niệm hình học này. "Phương pháp đơn hình" là tên của thuật toán, không phải một tập.

**Trong học máy.** Hàm `scipy.optimize.linprog` của SciPy giải bài toán cực tiểu, nên bài toán cực đại $c^Tx$ được truyền vào với vector $-c$. Bộ giải HiGHS mặc định của hàm có phương pháp đơn hình đối ngẫu (`method="highs-ds"`), dùng cùng cơ sở và bước xoay như Thuật toán 07.2 nhưng giữ mọi $\bar c_j\le0$ và khôi phục dần $x_B\ge0$, và phương pháp điểm trong (`method="highs-ipm"`). Trường `status` của kết quả báo kết cục: $0$ là có nghiệm tối ưu, $2$ là không khả thi (pha I), $3$ là không bị chặn (Mệnh đề 07.34(a)). Biến thể đơn hình có ưu thế khi cần một nghiệm đỉnh, hoặc khi giải lại sau khi dữ liệu thay đổi ít, chẳng hạn thêm vài mẫu vào hồi quy $L_1$ hoặc đổi một hạn mức giờ GPU, vì cơ sở tối ưu cũ là điểm xuất phát gần nghiệm mới. Các bài toán này thường suy biến, vì nhiều phần dư hay nhiều biến bù cùng bằng $0$ tại nghiệm, nên phần lớn bộ giải thực tế kèm một trong các cơ chế chống quay vòng của Nhận xét 07.39.

::: exercise Bài tập 07.8 (Bảng đơn hình của bài toán hộp hạt với lợi ích mới)
Miền khả thi $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$; mục tiêu mới: cực đại $z=2x_1+4x_2$. Dạng chuẩn dùng biến bù $s_1,s_2,s_3$, thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$.

- (a) Chạy phương pháp đơn hình trên bảng đơn hình từ $(0,0)$, với biến vào có chi phí rút gọn lớn nhất. Ghi các bảng đơn hình, rồi tóm tắt các bước trong một bảng gồm cơ sở, đỉnh, $z$, chi phí rút gọn ngoài cơ sở, biến vào, các tỉ số và biến ra.
- (b) Đọc chi phí rút gọn ở bảng dừng và kết luận về tính tối ưu.
- (c) Ở bảng dừng có một chi phí rút gọn bằng $0$. Cho biến đó vào, thực hiện phép thử tỉ số và bước xoay; dùng Mệnh đề 07.33(a) để xác định toàn bộ tập nghiệm tối ưu.
:::

::: hint
Chi phí rút gọn bằng $0$ nghĩa là $z$ không đổi dọc hướng cơ sở tương ứng. Ở (c), viết $z$ theo hai biến ngoài cơ sở của bảng dừng.
:::

::: solution
**Câu (a).** Bảng đầu là $[A\mid b]$ với hàng cuối $(2,4,0,0,0\mid0)$.

| Bước | Cơ sở | Đỉnh | $z$ | $\bar c$ ngoài cơ sở | Vào | Tỉ số | Ra |
|---|---|---|---:|---|---|---|---|
| $0$ | $\{s_1,s_2,s_3\}$ | $(0,0)$ | $0$ | $x_1$: $2$; $x_2$: $4$ | $x_2$ | $s_2$: $20$; $s_3$: $27$ | $s_2$ |
| $1$ | $\{s_1,x_2,s_3\}$ | $(0,20)$ | $80$ | $x_1$: $2$; $s_2$: $-4$ | $x_1$ | $s_1$: $30$; $s_3$: $14$ | $s_3$ |
| $2$ | $\{x_1,x_2,s_1\}$ | $(14,20)$ | $108$ | $s_2$: $0$; $s_3$: $-2$ | dừng | | |

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

**Câu (b).** Hai chi phí rút gọn ngoài cơ sở là $\bar c_{s_2}=0$ và $\bar c_{s_3}=-2$, đều không dương, nên theo Mệnh đề 07.33(b), $(14,20)$ tối ưu với $z^*=108$.

**Câu (c).** Cho $s_2$ vào. Cột $s_2$ dương ở hàng $s_1$ (hệ số $2$) và hàng $x_2$ (hệ số $1$), với tỉ số $\tfrac{16}2=8$ và $\tfrac{20}1=20$, nên $\theta^*=8$ và $s_1$ ra. Điểm mới: $x_1=14+2\cdot8=30$, $x_2=20-8=12$, $s_2=8$, và $z=108+0\cdot8=108$. Cơ sở mới $\{x_1,x_2,s_2\}$ có $\bar c_{s_1}=0$, $\bar c_{s_3}=-2$, nên cũng tối ưu. Đây cũng là đỉnh dừng của quy tắc Bland, vốn đi $(0,0)\to(30,0)\to(30,12)$: với chi phí rút gọn bằng $0$ tại bước dừng, hai quy tắc dừng ở hai đỉnh khác nhau của cùng cạnh tối ưu.

Theo Mệnh đề 07.33(a) tại bảng dừng, với mọi $x'\in P$,

$$
z(x')-108=0\cdot s_2'-2s_3' .
$$

Vậy $x'$ tối ưu khi và chỉ khi $s_3'=0$, tức $x_1+2x_2=54$. Trên đường đó, $x_2\le20$ cho $x_1\ge14$ và $x_1\le30$, nên tập nghiệm tối ưu là cạnh $\{x\mid x_1+2x_2=54,\ 14\le x_1\le30\}$ nối $(14,20)$ và $(30,12)$.

**Kiểm tra lại.** $2\cdot30+4\cdot12=108$ và $2\cdot14+4\cdot20=108$. Kết quả khớp câu (a) của Bài tập 07.7, nơi tập nghiệm tối ưu được tìm bằng phép so sánh $2x_1+4x_2=2(x_1+2x_2)\le108$.
:::

::: exercise Bài tập 07.9 (Phương pháp đơn hình trên đa giác của Bài tập 07.6)
Xét bài toán cực đại $x_1+x_2$ dưới $x_1+2x_2\le4$, $3x_1+x_2\le6$, $x_1,x_2\ge0$, với biến bù $s_1$, $s_2$ và thứ tự cột $(x_1,x_2,s_1,s_2)$.

- (a) Chạy phương pháp đơn hình dạng bảng từ $(0,0)$ với quy tắc Bland; ghi mọi bảng.
- (b) Đọc nghiệm tối ưu, giá trị tối ưu và hai chi phí rút gọn $\bar c_{s_1}$, $\bar c_{s_2}$ ở bảng cuối. Kiểm tra lại hai chi phí rút gọn bằng (5.1)–(5.2) tại $(1{,}6;\,1{,}2)$ với cơ sở $\{x_1,x_2\}$.
- (c) Chạy lại với $x_2$ vào ở bước đầu; so sánh số bước xoay và đường đi.
:::

::: hint
Bảng đầu là $[A\mid b]$ vì cơ sở gồm hai biến bù. Ở (b), $A_B=\begin{bmatrix}1&2\\3&1\end{bmatrix}$ và hướng $d^{s_1}$ có $d_B=-A_B^{-1}(1,0)^T$.
:::

::: solution
**Câu (a).** Bảng 0 có hàng $s_1$: $(1,2,1,0\mid4)$, hàng $s_2$: $(3,1,0,1\mid6)$, hàng cuối $(1,1,0,0\mid0)$. Theo quy tắc Bland, $x_1$ vào; tỉ số $s_1$: $4$, $s_2$: $\tfrac63=2$, nên $s_2$ ra với phần tử xoay $3$.

Bảng 1: chia hàng $s_2$ cho $3$ được hàng $x_1$: $(1,\tfrac13,0,\tfrac13\mid2)$; hàng $s_1$ trừ hàng đó được $(0,\tfrac53,1,-\tfrac13\mid2)$; hàng cuối trừ hàng đó được $(0,\tfrac23,0,-\tfrac13\mid-2)$. Đỉnh $(2,0)$, $z=2$.

Chỉ $\bar c_{x_2}=\tfrac23$ dương, nên $x_2$ vào; tỉ số $s_1$: $2/\tfrac53=\tfrac65$, $x_1$: $2/\tfrac13=6$, nên $s_1$ ra với phần tử xoay $\tfrac53$.

| Cơ sở | $x_1$ | $x_2$ | $s_1$ | $s_2$ | vế phải |
|---|---:|---:|---:|---:|---:|
| $x_2$ | $0$ | $1$ | $\tfrac35$ | $-\tfrac15$ | $\tfrac65$ |
| $x_1$ | $1$ | $0$ | $-\tfrac15$ | $\tfrac25$ | $\tfrac85$ |
| $\bar c$ và $-z$ | $0$ | $0$ | $-\tfrac25$ | $-\tfrac15$ | $-\tfrac{14}5$ |

Bảng 2 thu được bằng cách chia hàng $s_1$ cho $\tfrac53$, rồi trừ $\tfrac13$ lần hàng mới khỏi hàng $x_1$ và $\tfrac23$ lần khỏi hàng cuối.

**Câu (b).** Hàng cuối không có phần tử dương, nên $(x_1,x_2)=(\tfrac85,\tfrac65)=(1{,}6;\,1{,}2)$ tối ưu với $z^*=\tfrac{14}5=2{,}8$, và $\bar c_{s_1}=-\tfrac25$, $\bar c_{s_2}=-\tfrac15$.

Kiểm tra bằng (5.1)–(5.2): $A_B=\begin{bmatrix}1&2\\3&1\end{bmatrix}$ có định thức $1-6=-5$.

- Hướng $d^{s_1}$: giải $A_Bd_B=-(1,0)^T$, tức $d_1+2d_2=-1$, $3d_1+d_2=0$, được $d_B=(\tfrac15,-\tfrac35)$; $\bar c_{s_1}=\tfrac15-\tfrac35=-\tfrac25$.
- Hướng $d^{s_2}$: giải $A_Bd_B=-(0,1)^T$, tức $d_1+2d_2=0$, $3d_1+d_2=-1$, được $d_B=(-\tfrac25,\tfrac15)$; $\bar c_{s_2}=-\tfrac25+\tfrac15=-\tfrac15$.

Hai số $-\bar c_{s_1}=\tfrac25$ và $-\bar c_{s_2}=\tfrac15$ là hai hệ số nhân $\mu_1$, $\mu_2$ ở câu (b) của Bài tập 07.6: $x_1+x_2=\tfrac25(x_1+2x_2)+\tfrac15(3x_1+x_2)\le\tfrac25\cdot4+\tfrac15\cdot6=2{,}8$.

**Câu (c).** Với $x_2$ vào trước: tỉ số $s_1$: $\tfrac42=2$, $s_2$: $6$, nên $s_1$ ra; đỉnh $(0,2)$, $z=2$, và hàng cuối thành $(\tfrac12,0,-\tfrac12,0\mid-2)$. Khi đó $x_1$ vào; tỉ số $x_2$: $2/\tfrac12=4$, $s_2$: $4/\tfrac52=\tfrac85$, nên $s_2$ ra, tới $(1{,}6;\,1{,}2)$. Cả hai đường cần hai bước xoay; chúng là hai đường đi qua đỉnh kề của câu (c) trong Bài tập 07.6.

**Kiểm tra lại.** Tại $(1{,}6;\,1{,}2)$: $1{,}6+2{,}4=4$ và $4{,}8+1{,}2=6$. Hướng $d^{s_1}=(\tfrac15,-\tfrac35,1,0)$ thỏa $\tfrac15-\tfrac65+1=0$ và $\tfrac35-\tfrac35=0$.
:::

::: exercise Bài tập 07.10 (Phát hiện mục tiêu không bị chặn)
Một biến thể của bài toán hộp hạt bỏ giới hạn sản lượng loại 1 và giới hạn giờ máy, giữ $x_2\le20$ và thêm yêu cầu sản lượng loại 2 không vượt sản lượng loại 1 quá $6$ nghìn hộp: cực đại $z=2x_1+3x_2$ dưới $x_2\le20$, $-x_1+x_2\le6$, $x_1,x_2\ge0$.

- (a) Viết dạng chuẩn với biến bù $s_1$, $s_2$, thứ tự $(x_1,x_2,s_1,s_2)$.
- (b) Chạy phương pháp đơn hình từ $(0,0)$ với biến vào có chi phí rút gọn lớn nhất, đến khi thuật toán dừng. Nêu lý do dừng và tia làm $z$ tăng không bị chặn.
- (c) Chạy lại với quy tắc Bland và so sánh với (b).
- (d) Giới hạn nào của mô hình hộp hạt ban đầu, nếu được thêm lại, làm bài toán bị chặn.
:::

::: hint
Ở mỗi bước, viết các biến cơ sở theo các biến ngoài cơ sở và xem cột của biến vào có hệ số nào làm một biến cơ sở giảm hay không.
:::

::: solution
**Câu (a).** $x_2+s_1=20$, $-x_1+x_2+s_2=6$, mọi biến không âm; cơ sở xuất phát $\{s_1,s_2\}$ khả thi vì vế phải không âm.

**Câu (b).**

- Bước 0, tại $(0,0)$: $\bar c_{x_1}=2$, $\bar c_{x_2}=3$; $x_2$ vào. Tỉ số $s_1$: $20$, $s_2$: $6$, nên $s_2$ ra. Đỉnh $(0,6)$, $z=18$.
- Bước 1: $x_2=6+x_1-s_2$, $s_1=14-x_1+s_2$, nên $z=2x_1+3(6+x_1-s_2)=18+5x_1-3s_2$. $x_1$ vào ($\bar c_{x_1}=5$); dọc $d^{x_1}$, $x_2$ tăng và $s_1$ giảm, tỉ số $s_1$: $14$. Đỉnh $(14,20)$, $z=88$.
- Bước 2: $x_2=20-s_1$, $x_1=x_2-6+s_2=14-s_1+s_2$, nên $z=2(14-s_1+s_2)+3(20-s_1)=88-5s_1+2s_2$. $s_2$ vào ($\bar c_{s_2}=2$); $d^{s_2}$ có $d_{x_1}=1$, $d_{x_2}=0$, đều không âm.

Theo Mệnh đề 07.34(a), bài toán không bị chặn: dọc tia $(x_1,x_2)=(14+\theta,20)$, $\theta\ge0$, mục tiêu là $z=88+2\theta$.

**Câu (c).** Theo quy tắc Bland, ở bước 0 $x_1$ vào vì có chỉ số nhỏ nhất với $\bar c_{x_1}=2>0$. Ta có $s_1=20-x_2$ không phụ thuộc $x_1$, và $s_2=6+x_1-x_2$ tăng theo $x_1$, nên $d^{x_1}_B\ge0$. Thuật toán dừng ngay trong lần lặp đầu, tại bước 4 của Thuật toán 07.2: bài toán không bị chặn dọc tia $(\theta,0)$, với $z=2\theta$. Hai quy tắc cho hai tia khác nhau và cùng một kết luận.

**Câu (d).** Miền bị chặn khi mọi biến bị chặn, và $x_2\le20$ đã có. Thêm lại $x_1\le30$ thì miền nằm trong hộp $[0,30]\times[0,20]$; thêm lại giờ máy $x_1+2x_2\le54$ thì $x_1\le54$. Mỗi cách đều làm miền bị chặn và khác rỗng, nên theo Định lý 07.26 bài toán có nghiệm tối ưu.

**Kiểm tra lại.** Trên tia $(14+\theta,20)$: $x_2=20\le20$ và $-(14+\theta)+20=6-\theta\le6$. Trên tia $(\theta,0)$: $0\le20$ và $-\theta\le6$.
:::

::: exercise Bài tập 07.11 (Đỉnh suy biến: quy tắc Dantzig, quy tắc Bland và bước xoay với $\theta^*=0$)
Đổi giới hạn giờ máy của bài toán hộp hạt thành $70$ giờ: cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le70$, $x\ge0$. Dạng chuẩn dùng biến bù $s_1,s_2,s_3$, thứ tự $(x_1,x_2,s_1,s_2,s_3)$.

- (a) Chứng minh $(30,20)$ là một đỉnh và nghiệm cơ sở khả thi tương ứng suy biến.
- (b) Chạy phương pháp đơn hình từ $(0,0)$ với quy tắc Dantzig; khi tỉ số hòa, chọn biến ra có chỉ số nhỏ nhất. Đếm số bước xoay.
- (c) Chạy lại với quy tắc Bland. Có bước xoay nào với $\theta^*=0$ không.
- (d) Ở bước có tỉ số hòa trong (b), cho $s_3$ ra thay cho $s_1$. Tính chi phí rút gọn tại cơ sở thu được, giải thích vì sao Mệnh đề 07.33(b) chưa kết luận được, rồi thực hiện bước xoay tiếp theo.
:::

::: hint
Ở (a), đếm số ràng buộc hoạt động tại $(30,20)$ và số thành phần dương của nghiệm dạng chuẩn. Ở (d), một biến cơ sở bằng $0$ có thể làm phép thử tỉ số cho $\theta^*=0$.
:::

::: solution
**Câu (a).** Tại $(30,20)$, ba ràng buộc $x_1\le30$, $x_2\le20$, $x_1+2x_2\le70$ cùng hoạt động: $30+40=70$. Hai hàng $(1,0)$, $(0,1)$ đã có hạng $2$, nên theo Định lý 07.13, $(30,20)$ là đỉnh. Ở dạng chuẩn, điểm là $(30,20,0,0,0)$ với hai thành phần dương, ít hơn $m=3$, nên mọi cơ sở của nó chứa một biến bù bằng $0$: nghiệm suy biến.

**Câu (b).**

- Bước 0, tại $(0,0)$: $x_2$ vào ($\bar c_{x_2}=3$); tỉ số $s_2$: $20$, $s_3$: $35$, nên $s_2$ ra. Đỉnh $(0,20)$, $z=60$.
- Bước 1: $x_2=20-s_2$, $s_1=30-x_1$, $s_3=30-x_1+2s_2$, $z=60+2x_1-3s_2$. $x_1$ vào; tỉ số $s_1$: $30$, $s_3$: $30$ hòa; $s_1$ ra vì chỉ số nhỏ hơn. Điểm $(30,20)$, $z=120$, cơ sở $\{x_1,x_2,s_3\}$ với $s_3=0$.
- Bước 2: $x_1=30-s_1$, $x_2=20-s_2$, nên $z=120-2s_1-3s_2$. Hai chi phí rút gọn âm: tối ưu.

Thuật toán cần hai bước xoay và dừng tại $(30,20)$ với $z^*=120$.

**Câu (c).** Theo quy tắc Bland, $x_1$ vào ở bước 0; tỉ số $s_1$: $30$, $s_3$: $70$, nên $s_1$ ra; đỉnh $(30,0)$, $z=60$. Khi đó $s_3=40+s_1-2x_2$ và $z=60-2s_1+3x_2$; $x_2$ vào, tỉ số $s_2$: $20$, $s_3$: $20$ hòa, $s_2$ ra vì chỉ số nhỏ hơn. Cơ sở $\{x_1,x_2,s_3\}$ cho $z=120-2s_1-3s_2$: tối ưu sau hai bước xoay. Cả hai đường đều không có bước nào với $\theta^*=0$.

**Câu (d).** Nếu $s_3$ ra, cơ sở là $\{x_1,x_2,s_1\}$ với $s_1=0$. Giải theo biến cơ sở: $x_2=20-s_2$, $x_1=70-2x_2-s_3=30+2s_2-s_3$, $s_1=30-x_1=-2s_2+s_3$. Mục tiêu

$$
z=2(30+2s_2-s_3)+3(20-s_2)=120+s_2-2s_3,
$$

nên $\bar c_{s_2}=1>0$. Mệnh đề 07.33(b) không áp dụng được vì có một chi phí rút gọn dương, và phần (c) của mệnh đề cũng không áp dụng vì nghiệm suy biến. Cho $s_2$ vào: dọc $d^{s_2}$, $x_2$ giảm với tỉ số $20$ và $s_1$ giảm với tỉ số $\tfrac02=0$, nên $\theta^*=0$ và $s_1$ ra. Cơ sở mới $\{x_1,x_2,s_2\}$ cho $x_1=30-s_1$, $x_2=20+\tfrac12s_1-\tfrac12s_3$ và

$$
z=120-\tfrac12s_1-\tfrac32s_3,
$$

nên tối ưu. Điểm $(30,20)$ không đổi qua bước xoay: một đỉnh tối ưu suy biến có thể có một cơ sở với chi phí rút gọn dương.

**Kiểm tra lại.** Trên miền, $2x_1+3x_2\le2\cdot30+3\cdot20=120$, nên $z^*=120$ đúng là giá trị tối ưu.
:::

::: exercise Bài tập 07.12 (Pha I phát hiện bài toán không khả thi)
Bài toán hộp hạt có thêm hợp đồng buộc tổng sản lượng ít nhất $60$ nghìn hộp: cực đại $z=2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x_1+x_2\ge60$, $x\ge0$.

- (a) Viết dạng chuẩn với biến bù $s_1,s_2,s_3$, biến dư $s_4$ và một biến nhân tạo $\tilde s$; viết bài toán phụ của pha I.
- (b) Chạy pha I bằng quy tắc Bland từ cơ sở $\{s_1,s_2,s_3,\tilde s\}$, thứ tự biến $(x_1,x_2,s_1,s_2,s_3,s_4,\tilde s)$.
- (c) Kết luận bằng Mệnh đề 07.44, rồi kiểm tra kết luận bằng một cận trên của $x_1+x_2$ trên miền hộp hạt.
- (d) Vận dụng vào AI. Một nhóm chia giờ GPU trong tuần giữa $x_1$ giờ tinh chỉnh mô hình và $x_2$ giờ sinh dữ liệu tổng hợp, với tổng giờ $x_1+x_2\le100$, năng lượng $3x_1+x_2\le180$ kWh, năng lực kiểm duyệt $x_2\le60$, $x\ge0$. Trưởng nhóm thêm yêu cầu ít nhất $70$ giờ tinh chỉnh. Viết bài toán phụ với biến bù $s_1,s_2,s_3$, biến dư $s_4$ và một biến nhân tạo, chạy pha I theo quy tắc Bland, kết luận, và dùng chi phí rút gọn ở bảng cuối để chỉ ra giới hạn nào mâu thuẫn với yêu cầu mới.
:::

::: hint
Ở (c), các chi phí rút gọn của $s_1$ và $s_3$ ở bảng cuối của pha I cho hai hệ số nhân của cận trên. Ở (d), một ràng buộc có biến bù nằm trong cơ sở ở bảng cuối không tham gia vào mâu thuẫn.
:::

::: solution
**Câu (a).** $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, $x_1+x_2-s_4+\tilde s=60$, mọi biến không âm. Bài toán phụ: cực đại $\tilde z=-\tilde s$.

**Câu (b).**

- Bước 1: $\tilde s=60-x_1-x_2+s_4$, nên $\tilde z=-60+x_1+x_2-s_4$. $x_1$ vào; tỉ số $s_1$: $30$, $s_3$: $54$, $\tilde s$: $60$, nên $s_1$ ra. Điểm $(30,0)$, $\tilde s=30$, $\tilde z=-30$.
- Bước 2: với $x_1=30-s_1$, $\tilde z=-30-s_1+x_2-s_4$. $x_2$ vào; tỉ số $s_2$: $20$, $s_3$: $\tfrac{24}2=12$, $\tilde s$: $30$, nên $s_3$ ra. Điểm $(30,12)$, $\tilde s=18$, $\tilde z=-18$.
- Bước 3: với $x_2=12+\tfrac12s_1-\tfrac12s_3$, $\tilde s=60-x_1-x_2+s_4=18+\tfrac12s_1+\tfrac12s_3+s_4$, nên $\tilde z=-18-\tfrac12s_1-\tfrac12s_3-s_4$. Mọi chi phí rút gọn âm: pha I dừng với $\tilde z^*=-18$.

**Câu (c).** $\tilde z^*=-18<0$, nên theo Mệnh đề 07.44(b), bài toán gốc không khả thi. Kiểm tra trực tiếp: với hai hệ số $\tfrac12$, $\tfrac12$ đọc từ chi phí rút gọn của $s_1$ và $s_3$,

$$
\begin{aligned}
x_1+x_2&=\tfrac12x_1+\tfrac12(x_1+2x_2)\\
&\le\tfrac12\cdot30+\tfrac12\cdot54\\
&=42<60 .
\end{aligned}
$$

**Câu (d).** Dạng chuẩn: $x_1+x_2+s_1=100$, $3x_1+x_2+s_2=180$, $x_2+s_3=60$, $x_1-s_4+\tilde s=70$, mọi biến không âm; bài toán phụ cực đại $\tilde z=-\tilde s$, thứ tự biến $(x_1,x_2,s_1,s_2,s_3,s_4,\tilde s)$.

- Bước 1: $\tilde z=-70+x_1-s_4$, nên chỉ $\bar c_{x_1}=1$ dương; $x_1$ vào. Tỉ số $s_1$: $100$, $s_2$: $\tfrac{180}3=60$, $\tilde s$: $70$, nên $s_2$ ra. Điểm $(60,0)$, $\tilde s=10$.
- Bước 2: $x_1=60-\tfrac13x_2-\tfrac13s_2$, nên $\tilde s=70-x_1+s_4=10+\tfrac13x_2+\tfrac13s_2+s_4$ và $\tilde z=-10-\tfrac13x_2-\tfrac13s_2-s_4$. Mọi chi phí rút gọn âm: pha I dừng với $\tilde z^*=-10<0$.

Theo Mệnh đề 07.44(b), yêu cầu mới không thực hiện được. Biến bù $s_1$ và $s_3$ nằm trong cơ sở (bằng $40$ và $60$), nên giới hạn tổng giờ và giới hạn kiểm duyệt không tham gia. Hệ số $-\bar c_{s_2}=\tfrac13$ chỉ ra giới hạn năng lượng: $x_1\le\tfrac13(3x_1+x_2)\le\tfrac13\cdot180=60<70$. Mức thiếu hụt nhỏ nhất là $-\tilde z^*=10$ giờ tinh chỉnh; muốn đạt $70$ giờ, hạn mức năng lượng phải tăng ít nhất $30$ kWh.

**Kiểm tra lại.** Giá trị $-\tilde z^*=18$ ở (b) bằng $60-42$, mức thiếu hụt nhỏ nhất của hợp đồng trên miền hộp hạt; tại $(30,12)$, $x_1+x_2=42$. Ở (d), tại $(60,0)$: $60+0\le100$, $180\le180$, $0\le60$, và $70-60=10$.
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

Quy tắc Bland cần ba bước xoay, qua các điểm ứng với $(1,0)$ và $(1,80)$ của bài toán gốc: đúng đường của quy tắc Dantzig trên bài toán gốc.

**Câu (d).** Đổi $x_j$ thành $y_j=\alpha x_j$ với $\alpha>0$ chia chi phí rút gọn của biến đó cho $\alpha$, giữ dấu của mọi $\bar c_j$. Quy tắc Dantzig so sánh độ lớn của các $\bar c_j$, nên lựa chọn đổi khi $\bar c_{x_1}=10$ thành $\bar c_{y_1}=\tfrac12$. Quy tắc Bland chỉ dùng dấu của $\bar c_j$ và thứ tự chỉ số; tập chỉ số đạt cực tiểu ở (5.3) cũng không đổi, vì mọi tỉ số cùng nhân với $\alpha$ khi biến vào được đổi đơn vị, và tử, mẫu cùng nhân với $\alpha$ khi một biến cơ sở được đổi đơn vị. Vanderbei (2014, §4.4, tr. 44) chỉ ra tính không bất biến này của quy tắc chi phí rút gọn lớn nhất trên bài toán Klee–Minty ba biến.

**Kiểm tra lại.** Tại $(y_1,x_2)=(0,100)$: $0\le20$, $0+100\le100$, $z=100$, khớp $z^*$ của bài toán gốc tại $(0,100)$.
:::

Như vậy, phương pháp đơn hình hiện thực hóa Thuật toán 07.1 bằng phép tính trên cơ sở. Hướng cơ sở và chi phí rút gọn (Định nghĩa 07.32) cho điều kiện dừng và chứng nhận tối ưu (Mệnh đề 07.33); phép thử tỉ số và bước xoay (Mệnh đề 07.34) cho đỉnh kề hoặc phát hiện bài toán không bị chặn; Thuật toán 07.2 dừng sau hữu hạn bước khi không có suy biến (Định lý 07.35), và với quy tắc Bland trong mọi trường hợp (Định lý 07.38). Bảng đơn hình (Định nghĩa 07.40, Mệnh đề 07.41) ghi các phép tính, còn phương pháp hai pha (Thuật toán 07.3, Mệnh đề 07.44) tìm cơ sở xuất phát hoặc kết luận không khả thi. Trên đường đi, Bổ đề 07.30 đã được chứng minh trọn vẹn.

Tuy nhiên, số bước có thể tăng theo hàm mũ (Nhận xét 07.45), biến nguyên nằm ngoài phạm vi của phương pháp, và mọi kết quả của Mục 1–5 xét một vector quyết định $x$ được chọn một lần.

## 6. Trạng thái và phương trình Bellman

Xét bài toán sau, gồm một chuỗi quyết định: đi từ nút $\mathrm s$ tới nút $\mathrm t$ qua ba tầng, chọn $\mathrm A$ hoặc $\mathrm B$ rồi $\mathrm C$ hoặc $\mathrm D$, trong đó mỗi cạnh có một chi phí và lựa chọn đầu quyết định các cạnh còn lại.

Với $N$ giai đoạn, mỗi giai đoạn $q$ lựa chọn, có $q^N$ chuỗi quyết định, và chỉ với $N=20$, $q=2$ đã cho $2^{20}=1\,048\,576$ chuỗi. Trong mục này, chúng ta khai thác cấu trúc theo giai đoạn thay cho cấu trúc đỉnh. Đầu tiên, chúng ta đưa vào khái niệm trạng thái, sau đó chứng minh phương trình Bellman cho chi phí tối ưu còn lại và tính nó trên đồ thị nhỏ ở trên.

Đường đi ngắn nhất cũng viết được thành quy hoạch tuyến tính trên mạng (bài toán luồng mạng, Buổi 9 (Chương 12) của đề cương). Ở đây, chúng ta dùng một cấu trúc khác, gồm chi phí cộng theo giai đoạn và tương lai chỉ phụ thuộc vị trí hiện tại.

### 6.1 Bài toán quyết định theo giai đoạn

![Đồ thị bốn tầng ghi k=0 đến k=3. Tầng 0 có nút s; tầng 1 có A, B; tầng 2 có C, D; tầng 3 có t. Chi phí cạnh: s–A 2, s–B 5, A–C 4, A–D 2, B–C 1, B–D 3, C–t 3, D–t 1.](img/lec-07/dp-layered-graph.svg)

Các nút được xếp theo tầng $k=0,1,2,3$, số trên mỗi cạnh là chi phí cạnh, và mỗi đường từ $\mathrm s$ tới $\mathrm t$ gồm ba cạnh. Ví dụ sau liệt kê mọi đường.

::: example Ví dụ 07.26 (Liệt kê bốn đường đi)
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

Trên đồ thị này, liệt kê cần ít phép tính. Tuy nhiên, với $N$ tầng, một đoạn đuôi chung được tính lại cho mọi lịch sử đi tới đầu đoạn. Để tránh tính lại, ta cần nhận ra khi nào hai lịch sử khác nhau có cùng phần tương lai, và khung bài toán trong định nghĩa sau có sẵn khái niệm đó.

::: definition Định nghĩa 07.46 (Bài toán quyết định hữu hạn tất định)
**Dữ kiện.** Số giai đoạn $N\ge1$. Với $k=0,\ldots,N$, tập trạng thái (state) $X_k$ hữu hạn, khác rỗng. Với $k=0,\ldots,N-1$ và $\xi\in X_k$:

- tập điều khiển (control) cho phép $U_k(\xi)$ hữu hạn, khác rỗng;
- hàm chuyển trạng thái $f_k$, với $f_k(\xi,u)\in X_{k+1}$ cho mọi $u\in U_k(\xi)$;
- chi phí giai đoạn $g_k(\xi,u)\in\mathbb R$.

Chi phí cuối $g_N:X_N\to\mathbb R$.

**Chuỗi điều khiển.** Từ trạng thái $\xi\in X_k$ ở giai đoạn $k$, một chuỗi điều khiển chấp nhận được là $(u_k,\ldots,u_{N-1})$ với $\xi_k=\xi$, $u_{k'}\in U_{k'}(\xi_{k'})$ và $\xi_{k'+1}=f_{k'}(\xi_{k'},u_{k'})$ cho $k'=k,\ldots,N-1$.

**Chi phí.** Chi phí của chuỗi đó là

$$
G_k(\xi;u_k,\ldots,u_{N-1})=\sum_{k'=k}^{N-1}g_{k'}(\xi_{k'},u_{k'})+g_N(\xi_N).
\tag{6.1}
$$

**Bài toán.** Cho trạng thái đầu $\xi_0\in X_0$, tìm chuỗi chấp nhận được từ $\xi_0$ ở giai đoạn $0$ có chi phí $G_0$ nhỏ nhất.
:::

Định nghĩa trên chứa bốn giả thiết, và mỗi giả thiết được gọi bằng một tên riêng trong chương.

- Hữu hạn: số giai đoạn, số trạng thái và số điều khiển đều hữu hạn.
- Tất định: mỗi điều khiển dẫn tới đúng một trạng thái kế tiếp $f_k(\xi,u)$.
- Chi phí cộng: chi phí của cả chuỗi là tổng các chi phí giai đoạn cộng chi phí cuối, theo (6.1).
- Trạng thái đủ: chi phí và trạng thái kế tiếp chỉ phụ thuộc trạng thái và điều khiển hiện tại, không phụ thuộc cách đã đi tới trạng thái đó.

Chữ $\xi_k$ chỉ trạng thái, khác biến quyết định $x$ của quy hoạch tuyến tính; chữ "kết cục" của Mục 4 khác chữ "trạng thái" ở đây.

So với quy hoạch tuyến tính, phương án ở đây là một chuỗi thay cho một điểm của đa diện. Tập phương án hữu hạn ngay từ đầu, và số phương án tăng theo hàm mũ của số giai đoạn. Khung này là trường hợp tất định của khung quy hoạch động trong bài giảng số 16 của MIT 15.093J (trang 7) và của Bertsekas (2017, §1.1–1.3), nơi trạng thái kế tiếp còn phụ thuộc một nhiễu ngẫu nhiên.

::: example Ví dụ 07.27 (Đồ thị tầng là một bài toán quyết định hữu hạn tất định)
**Dữ kiện.** Đồ thị tầng với chi phí cạnh $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$.

**Các thành phần.**

- $N=3$; $X_0=\{\mathrm s\}$, $X_1=\{\mathrm A,\mathrm B\}$, $X_2=\{\mathrm C,\mathrm D\}$, $X_3=\{\mathrm t\}$.
- Điều khiển là nút đến của cạnh đi ra: $U_0(\mathrm s)=\{\mathrm A,\mathrm B\}$, $U_1(\mathrm A)=U_1(\mathrm B)=\{\mathrm C,\mathrm D\}$, $U_2(\mathrm C)=U_2(\mathrm D)=\{\mathrm t\}$.
- Chuyển trạng thái $f_k(\xi,u)=u$; chi phí giai đoạn $g_k(\xi,u)=g(\xi,u)$; chi phí cuối $g_3(\mathrm t)=0$.

**Chi phí một chuỗi.** Chuỗi $(\mathrm A,\mathrm D,\mathrm t)$ từ $\mathrm s$ cho $\xi_1=\mathrm A$, $\xi_2=\mathrm D$, $\xi_3=\mathrm t$ và theo (6.1), $G_0=2+2+1+0=5$.

**Kiểm tra lại.** Bốn giả thiết thỏa: các tập hữu hạn, mỗi cạnh dẫn tới đúng một nút, tổng chi phí là tổng chi phí cạnh, và chi phí cạnh không phụ thuộc đường đã đi.
:::

Giả thiết trạng thái đủ là một yêu cầu về cách mô hình hóa, không phải tính chất tự có của bài toán. Nhận xét sau nêu cách kiểm tra nó và cách sửa khi nó sai.

::: remark Nhận xét 07.47 (Trạng thái đủ và mở rộng trạng thái)
**Kiểm tra.** Một lựa chọn trạng thái là đủ khi, biết trạng thái hiện tại, mọi chi phí và chuyển tiếp về sau không còn phụ thuộc vào lịch sử. Bài giảng số 16 của MIT 15.093J (trang 6) gọi trạng thái là bản tóm tắt các quyết định quá khứ còn liên quan và ghi rằng chọn trạng thái thường là bước khó nhất.

**Một trường hợp nút không đủ.** Giả sử cạnh $\mathrm C\to\mathrm t$ có thêm chi phí $4$ khi nút $\mathrm C$ được đạt từ $\mathrm A$. Chi phí tương lai từ $\mathrm C$ khi đó là $7$ với lịch sử $\mathrm s\to\mathrm A\to\mathrm C$ và $3$ với lịch sử $\mathrm s\to\mathrm B\to\mathrm C$; nút $\mathrm C$ không còn là trạng thái đủ.

**Sửa.** Mở rộng trạng thái thành cặp (nút trước, nút hiện tại): $(\mathrm A,\mathrm C)$ và $(\mathrm B,\mathrm C)$ là hai trạng thái, mỗi trạng thái có một chi phí tương lai xác định. Hệ quả là số trạng thái tăng, và mức tăng này được tính ở Tình huống 07.4.
:::

### 6.2 Chi phí tối ưu còn lại và phương trình Bellman

Về mặt ý tưởng, từ một trạng thái ở một giai đoạn, phần tương lai là một bài toán con độc lập với quá khứ. Chi phí tối ưu của bài toán con đó vì vậy chỉ cần tính một lần rồi dùng lại cho mọi lịch sử đi tới trạng thái này. Ý tưởng này chưa phải phát biểu hình thức.

![Sơ đồ ba cột với tiêu đề "Nhiều lịch sử, một phần tương lai". Cột "Các lịch sử" gồm s→A→C, s→B→C và một ô "lịch sử khác". Cả ba mũi tên đi vào "Nút C" ở cột giữa, nhãn "Trạng thái đủ", ghi "cùng phần tương lai". Cột "Bài toán con" ghi "Tính một lần chi phí nhỏ nhất từ C tới đích, rồi dùng lại". Dòng chú thích: chỉ gộp khi quá khứ không còn ảnh hưởng tới tương lai ngoài thông tin đã giữ trong trạng thái.](img/lec-07/dp-state-sufficiency.svg)

Trên hình, ba lịch sử khác nhau cùng đi tới nút $\mathrm C$. Từ $\mathrm C$, chỉ còn cạnh $\mathrm C\to\mathrm t$ với chi phí $3$, nên chi phí tối ưu từ $\mathrm C$ tới đích là $3$ cho mọi lịch sử. Trong khi liệt kê tính đoạn $\mathrm C\to\mathrm t$ một lần cho mỗi lịch sử thì quy hoạch động tính nó một lần cho nút $\mathrm C$. Dòng chú thích dưới hình là giả thiết trạng thái đủ của Nhận xét 07.47.

::: definition Định nghĩa 07.48 (Chi phí tối ưu còn lại)
Trong bài toán của Định nghĩa 07.46, với $k=0,\ldots,N$ và $\xi\in X_k$, chi phí tối ưu còn lại (optimal cost-to-go), còn gọi là hàm giá trị (value function), là

$$
J_k(\xi)=\min_{(u_k,\ldots,u_{N-1})\in\mathcal U_k(\xi)}G_k(\xi;u_k,\ldots,u_{N-1}),
\tag{6.2}
$$

trong đó $\mathcal U_k(\xi)$ là tập các chuỗi điều khiển chấp nhận được từ $\xi$ ở giai đoạn $k$. Quy ước $J_N(\xi)=g_N(\xi)$, vì ở giai đoạn $N$ không còn điều khiển nào.
:::

Định nghĩa có nghĩa vì tập $\mathcal U_k(\xi)$ hữu hạn và khác rỗng, nên cực tiểu được đạt; $J_0(\xi_0)$ là chi phí tối ưu của toàn bài toán. Đại lượng $J_k(\xi)$ là toàn bộ chi phí tối ưu còn lại, không phải chi phí của bước kế tiếp; nhầm hai đại lượng này là lỗi thường gặp khi chọn điều khiển theo chi phí trước mắt.

Giữa $J_k$ và $J_{k+1}$ có một hệ thức, phát biểu trong định lý sau. Chứng minh cần Định nghĩa 07.46, Định nghĩa 07.48 và sự kiện cực tiểu của một hàm trên tập hữu hạn luôn được đạt.

::: theorem Định lý 07.49 (Phương trình Bellman)
**Giả thiết.** Bài toán quyết định hữu hạn tất định của Định nghĩa 07.46; $J_k$ theo Định nghĩa 07.48.

**Kết luận.** Với $k=N-1,\ldots,0$ và mọi $\xi\in X_k$,

$$
J_k(\xi)=\min_{u\in U_k(\xi)}\bigl\{g_k(\xi,u)+J_{k+1}\bigl(f_k(\xi,u)\bigr)\bigr\},
\tag{6.3}
$$

cùng điều kiện cuối $J_N(\xi)=g_N(\xi)$ với $\xi\in X_N$.

**Điều kiện áp dụng.** Cả bốn giả thiết của Định nghĩa 07.46: hữu hạn (cực tiểu được đạt), tất định (không có kỳ vọng), chi phí cộng (tách được chi phí từng giai đoạn), trạng thái đủ (chi phí và chuyển tiếp chỉ phụ thuộc $(\xi,u)$).

**Phạm vi.** Với chuyển tiếp ngẫu nhiên, vế phải cần kỳ vọng; với tập điều khiển vô hạn, $\min$ thay bằng cận dưới đúng và cần thêm giả thiết để giá trị được đạt; với số giai đoạn vô hạn, phương trình thành phương trình điểm bất động. Các trường hợp đó nằm ngoài phạm vi chương.
:::

::: proof Chứng minh Định lý 07.49
Cố định $k<N$ và $\xi\in X_k$. Ký hiệu cục bộ $\Omega(u)=g_k(\xi,u)+J_{k+1}(f_k(\xi,u))$ cho $u\in U_k(\xi)$.

**Bước 1 (tách chi phí của một chuỗi).** Một chuỗi chấp nhận được từ $\xi$ ở giai đoạn $k$ là $(u,u_{k+1},\ldots,u_{N-1})$, với $u\in U_k(\xi)$ và $(u_{k+1},\ldots,u_{N-1})$ chấp nhận được từ $\xi'=f_k(\xi,u)$ ở giai đoạn $k+1$. Theo (6.1),

$$
G_k(\xi;u,u_{k+1},\ldots,u_{N-1})=g_k(\xi,u)+G_{k+1}(\xi';u_{k+1},\ldots,u_{N-1}).
$$

Đẳng thức này dùng giả thiết chi phí cộng và giả thiết trạng thái đủ, vì phần chi phí từ giai đoạn $k+1$ chỉ phụ thuộc $\xi'$ và các điều khiển sau đó.

**Bước 2 ($J_k(\xi)\ge\min_u\Omega(u)$).** Theo Định nghĩa 07.48, $G_{k+1}(\xi';\ldots)\ge J_{k+1}(\xi')$ cho mọi chuỗi từ $\xi'$. Thay vào Bước 1: mọi chuỗi từ $\xi$ có chi phí ít nhất $\Omega(u)\ge\min_u\Omega(u)$, với $u$ là điều khiển đầu của chuỗi. Lấy cực tiểu theo mọi chuỗi cho $J_k(\xi)\ge\min_u\Omega(u)$.

**Bước 3 ($J_k(\xi)\le\min_u\Omega(u)$).** Chọn $\hat u$ đạt $\min_u\Omega(u)$, có vì $U_k(\xi)$ hữu hạn, khác rỗng. Với $\hat\xi'=f_k(\xi,\hat u)$, chọn một chuỗi tối ưu $(\hat u_{k+1},\ldots,\hat u_{N-1})$ từ $\hat\xi'$, có vì tập chuỗi hữu hạn, khác rỗng; chi phí của nó là $J_{k+1}(\hat\xi')$. Chuỗi ghép $(\hat u,\hat u_{k+1},\ldots,\hat u_{N-1})$ chấp nhận được từ $\xi$, và theo Bước 1 có chi phí $\Omega(\hat u)$. Do đó $J_k(\xi)\le \Omega(\hat u)=\min_u\Omega(u)$.

**Bước 4 (kết luận).** Bước 2 và Bước 3 cho (6.3). Điều kiện cuối là quy ước của Định nghĩa 07.48. $\square$
:::

Phương trình (6.3) đọc bằng lời: chi phí tối ưu còn lại bằng chi phí giai đoạn hiện tại cộng chi phí tối ưu còn lại từ trạng thái kế tiếp, lấy nhỏ nhất theo lựa chọn hiện tại. Vế phải chỉ cần $J_{k+1}$, nên các hàm $J_N,J_{N-1},\ldots,J_0$ tính được lần lượt từ cuối về đầu.

Vai trò từng giả thiết hiện ra trong chứng minh. Bước 1 cần chi phí cộng và trạng thái đủ; Bước 3 cần tập điều khiển hữu hạn để có $\hat u$.

Mệnh đề sau là phát biểu mà Bellman (1957) gọi là nguyên lý tối ưu (principle of optimality). Bước 3 của chứng minh Định lý 07.49 dùng ý này theo chiều ghép đuôi; mệnh đề nói chiều cắt đuôi.

::: proposition Mệnh đề 07.50 (Nguyên lý tối ưu)
**Giả thiết.** Như Định lý 07.49. Chuỗi $(u_0^\circ,\ldots,u_{N-1}^\circ)$ tối ưu từ $\xi_0$, sinh các trạng thái $\xi_0^\circ=\xi_0,\xi_1^\circ,\ldots,\xi_N^\circ$.

**Kết luận.** Với mọi $k$, phần đuôi $(u_k^\circ,\ldots,u_{N-1}^\circ)$ tối ưu cho bài toán con từ $\xi_k^\circ$ ở giai đoạn $k$, tức chi phí của nó bằng $J_k(\xi_k^\circ)$.

**Điều kiện áp dụng.** Như Định lý 07.49.

**Phạm vi.** Chiều ngược lại cần thêm điều khiển đầu tối ưu: ghép một đuôi tối ưu với một điều khiển đầu tùy ý chưa cho chuỗi tối ưu.
:::

::: proof Chứng minh Mệnh đề 07.50
**Bước 1 (giả sử ngược lại).** Giả sử có chuỗi $(u_k',\ldots,u_{N-1}')$ từ $\xi_k^\circ$ có chi phí nhỏ hơn chi phí của đuôi $(u_k^\circ,\ldots,u_{N-1}^\circ)$.

**Bước 2 (ghép).** Chuỗi $(u_0^\circ,\ldots,u_{k-1}^\circ,u_k',\ldots,u_{N-1}')$ chấp nhận được từ $\xi_0$, vì phần đầu vẫn dẫn tới $\xi_k^\circ$. Theo (6.1), chi phí của nó bằng chi phí phần đầu cộng chi phí đuôi mới, nhỏ hơn chi phí của chuỗi tối ưu ban đầu, mâu thuẫn. $\square$
:::

**Trong học máy.** Phương trình (6.3) là dạng tất định, hữu hạn của phương trình Bellman trong học tăng cường (reinforcement learning), nơi chuyển tiếp ngẫu nhiên nên vế phải lấy kỳ vọng và số giai đoạn có thể vô hạn. Sutton và Barto (2018, chương 3–4) trình bày dạng đó. Trong xử lý chuỗi, thuật toán Viterbi tìm chuỗi nhãn có xác suất lớn nhất của một mô hình Markov ẩn (hidden Markov model, HMM) bằng đúng phương trình này, với chi phí giai đoạn là logarit âm của xác suất; Rabiner (1989) trình bày thuật toán, và một ví dụ được giải ở Tình huống 07.3. Giả thiết chi phí cộng ở đó được bảo đảm vì logarit biến tích xác suất thành tổng.

::: example Ví dụ 07.28 (Phương trình Bellman trên đồ thị tầng)
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

**Kiểm tra lại.** Liệt kê ở Ví dụ 07.26 cho bốn đường với chi phí $9$, $5$, $9$, $9$; nhỏ nhất là $5$, khớp $J_0(\mathrm s)$. Đuôi $\mathrm A\to\mathrm D\to\mathrm t$ của đường tối ưu có chi phí $3=J_1(\mathrm A)$, đúng Mệnh đề 07.50.
:::

![Đồ thị tầng như hình trước, với nhãn J cạnh mỗi nút: J=5 tại s, J=3 tại A, J=4 tại B, J=3 tại C, J=1 tại D, J=0 tại t. Đường s–A–D–t được tô đậm.](img/lec-07/dp-bellman-values.svg)

Giá trị $J$ được ghi không chỉ số cạnh mỗi nút, vì mỗi nút thuộc đúng một tầng: $J(\mathrm A)$ trên hình là $J_1(\mathrm A)$. Lựa chọn tại $\mathrm s$ so sánh $2+J_1(\mathrm A)=5$ với $5+J_1(\mathrm B)=9$, không so sánh riêng hai chi phí cạnh $2$ và $5$. Tại $\mathrm B$, hai lựa chọn cùng cho $4$, và trường hợp hai giá trị bằng nhau này được xử lý ở Mục 7.

::: exercise Bài tập 07.14 (Lịch bước học hai giai đoạn)
Một quá trình huấn luyện được mô tả thô bằng ba mức mất mát, ký hiệu $3$ (cao), $2$ (vừa), $1$ (thấp). Ở mỗi giai đoạn $k=0,1$ chọn một trong hai điều khiển: bước học lớn $\eta_+$ hoặc bước học nhỏ $\eta_-$. Bảng chuyển trạng thái tất định (số liệu sư phạm):

| Mức hiện tại | Sau bước lớn $\eta_+$ | Sau bước nhỏ $\eta_-$ |
|---|---|---|
| $3$ (cao) | $2$ | $3$ |
| $2$ (vừa) | $2$ | $1$ |
| $1$ (thấp) | $2$ | $1$ |

Chi phí giai đoạn là số giờ GPU: bước lớn $1$ giờ, bước nhỏ $2$ giờ. Chi phí cuối theo mức mất mát sau giai đoạn $1$: mức $1$ chịu $0$, mức $2$ chịu $3$, mức $3$ chịu $6$. Trạng thái đầu là mức $3$.

- (a) Nêu $N$, $X_k$, $U_k$, $f_k$, $g_k$, $g_N$ theo Định nghĩa 07.46.
- (b) Tính $J_2$, $J_1$ và $J_0(3)$ bằng (6.3).
- (c) Kiểm tra kết quả bằng liệt kê bốn chuỗi.
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

Bắt đầu từ nhận xét rằng liệt kê tính lại các đoạn đuôi chung (Ví dụ 07.26), chúng ta đã đặt bài toán vào khung trạng thái, điều khiển, chuyển tiếp và chi phí cộng (Định nghĩa 07.46). Giả thiết trạng thái đủ của khung này được kiểm tra và sửa theo Nhận xét 07.47. Định nghĩa 07.48 đặt tên cho chi phí tối ưu còn lại, và kết quả đích của mục là Định lý 07.49, theo đó phương trình (6.3) xác định mọi $J_k$ từ cuối về đầu. Mệnh đề 07.50 là nguyên lý tối ưu.

Tuy nhiên, phương trình chỉ cho giá trị mà chưa cho chuỗi điều khiển, và trường hợp các lựa chọn có cùng giá trị như tại $\mathrm B$ chưa được xử lý. Số phép tính của cách làm này cũng chưa được đếm.

## 7. Phép giải ngược, chính sách và chi phí tính toán

Phương trình Bellman cho $J_0(\mathrm s)=5$ nhưng chưa xác định đường đi tối ưu. Trong mục này, chúng ta ghép phương trình Bellman với một lượt dựng xuôi thành thuật toán. Đầu tiên, ta dựng đường $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ của đồ thị tầng từ các phép tính Bellman mà không liệt kê lại, kể cả khi có hai lựa chọn cùng giá trị như tại $\mathrm B$. Sau đó, ta đếm số phép tính khi đồ thị có $N=20$ giai đoạn, mỗi tầng hai nút, để so với $2^{20}$ chuỗi.

### 7.1 Chính sách và lượt dựng xuôi

Trong khi tính $J_k(\xi)$ bằng (6.3), phép lấy cực tiểu đã chỉ ra một điều khiển đạt cực tiểu tại $\xi$. Ghi lại điều khiển đó cho mọi trạng thái là đủ để dựng đường tối ưu sau này, mà không cần lưu mọi chuỗi. Quy tắc gán điều khiển như vậy được gọi là chính sách, theo định nghĩa sau.

::: definition Định nghĩa 07.51 (Chính sách)
Trong bài toán của Định nghĩa 07.46, một chính sách (policy) là một dãy ánh xạ $u_0^*,\ldots,u_{N-1}^*$, trong đó $u_k^*$ gán cho mỗi $\xi\in X_k$ một điều khiển $u_k^*(\xi)\in U_k(\xi)$. Chính sách đạt cực tiểu là chính sách có

$$
u_k^*(\xi)\in\operatorname{argmin}_{u\in U_k(\xi)}\bigl\{g_k(\xi,u)+J_{k+1}\bigl(f_k(\xi,u)\bigr)\bigr\}
\tag{7.1}
$$

với mọi $k$ và mọi $\xi\in X_k$.
:::

Trong định nghĩa trên, chính sách là một quy tắc cho mọi trạng thái, khác với một chuỗi điều khiển. Từ một chính sách và trạng thái đầu $\xi_0$, lượt dựng xuôi (forward pass) sinh một chuỗi bằng $u_k=u_k^*(\xi_k)$ và $\xi_{k+1}=f_k(\xi_k,u_k)$. Khi tập argmin trong (7.1) có nhiều phần tử, mọi cách chọn đều cho một chính sách đạt cực tiểu.

Giá trị và chính sách là hai sản phẩm khác nhau: lượt ngược (backward pass) cho giá trị $J_k$, còn lượt xuôi dùng chính sách để dựng đường. Chỉ lưu $J_k$ mà không lưu chính sách vẫn dựng được đường, với điều kiện còn giữ dữ kiện $g_k$, $f_k$ để tính lại phép lấy cực tiểu. Ghép hai lượt này, ta được thuật toán sau.

::: algorithm Thuật toán 07.4 (Giải ngược Bellman)
**Đầu vào.** Bài toán của Định nghĩa 07.46: $N$; trạng thái đầu $\xi_0$; các tập $X_k$, $U_k(\xi)$ hữu hạn, khác rỗng; các hàm $f_k$, $g_k$, $g_N$.

**Các bước.**

1. Đặt $J_N(\xi)=g_N(\xi)$ với mọi $\xi\in X_N$.
2. Với $k=N-1,\ldots,0$ và mỗi $\xi\in X_k$: tính $J_k(\xi)$ bằng (6.3) và lưu một điều khiển $u_k^*(\xi)$ đạt cực tiểu.
3. Lượt xuôi: từ $\xi_0$, với $k=0,\ldots,N-1$, đặt $u_k=u_k^*(\xi_k)$ và $\xi_{k+1}=f_k(\xi_k,u_k)$.

**Đầu ra.** Giá trị $J_0(\xi_0)$, chính sách $u_0^*,\ldots,u_{N-1}^*$ và chuỗi $(u_0,\ldots,u_{N-1})$.

**Chi phí.** Bước 2 xét mỗi cặp $(\xi,u)$ với $\xi\in X_k$, $u\in U_k(\xi)$ đúng một lần; bước 3 cần $N$ lần tra bảng.
:::

Ở bước 2, $J_k(\xi)$ được tính cho mọi $\xi\in X_k$, kể cả trạng thái không nằm trên đường tối ưu, vì trước khi có các giá trị $J$, ta chưa biết đường tối ưu đi qua đâu. Chuỗi của bước 3 là tối ưu theo mệnh đề sau, với chứng minh dựa trên Định lý 07.49 và lập luận quy nạp ngược theo $k$.

::: proposition Mệnh đề 07.52 (Chính sách đạt cực tiểu cho chuỗi tối ưu)
**Giả thiết.** Bài toán của Định nghĩa 07.46; $J_k$ theo Định nghĩa 07.48; $u_0^*,\ldots,u_{N-1}^*$ là một chính sách đạt cực tiểu.

**Kết luận.** Với mọi $k$ và $\xi\in X_k$, chuỗi sinh bởi chính sách từ $\xi$ ở giai đoạn $k$ có chi phí $J_k(\xi)$. Đặc biệt, chuỗi của lượt xuôi trong Thuật toán 07.4 là một chuỗi tối ưu từ $\xi_0$.

**Điều kiện áp dụng.** Như Định lý 07.49.

**Phạm vi.** Khi argmin có nhiều phần tử, các chính sách khác nhau có thể cho các chuỗi tối ưu khác nhau; mệnh đề chỉ nói mỗi chuỗi như vậy tối ưu.
:::

::: proof Chứng minh Mệnh đề 07.52
Gọi $\Pi_k(\xi)$ là chi phí (6.1) của chuỗi sinh bởi chính sách từ $\xi$ ở giai đoạn $k$.

**Bước 1 (giai đoạn $N$).** Không còn điều khiển, nên $\Pi_N(\xi)=g_N(\xi)=J_N(\xi)$.

**Bước 2 (quy nạp ngược).** Giả sử $\Pi_{k+1}=J_{k+1}$ trên $X_{k+1}$. Với $\xi\in X_k$, đặt $u=u_k^*(\xi)$ và $\xi'=f_k(\xi,u)$. Chuỗi sinh bởi chính sách từ $\xi$ gồm $u$ rồi chuỗi sinh bởi chính sách từ $\xi'$, nên theo (6.1) và giả thiết quy nạp,

$$
\begin{aligned}
\Pi_k(\xi)&=g_k(\xi,u)+\Pi_{k+1}(\xi')\\
&=g_k(\xi,u)+J_{k+1}(\xi')\\
&=J_k(\xi).
\end{aligned}
$$

Trong đó, dòng cuối đúng theo (7.1) và (6.3), vì $u$ đạt cực tiểu của vế phải (6.3).

**Bước 3 (kết luận).** Với $k=0$ và $\xi=\xi_0$: chuỗi của lượt xuôi có chi phí $J_0(\xi_0)$, bằng chi phí nhỏ nhất. $\square$
:::

Mệnh đề 07.52 cho phép ta tách hai việc: tính toàn bộ bảng $J$ và chính sách một lần, rồi dựng đường từ bất kỳ trạng thái đầu nào bằng $N$ lần tra bảng. Nếu trạng thái đầu đổi, không cần tính lại bảng.

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

**Trường hợp hai lựa chọn cùng giá trị.** Tại $\mathrm B$, cả hai lựa chọn cho $4$; chọn $\mathrm C$ hay $\mathrm D$ không đổi $J_1(\mathrm B)$. Trạng thái $\mathrm B$ không nằm trên đường tối ưu từ $\mathrm s$, nhưng nếu trạng thái đầu là $\mathrm B$ ở giai đoạn $1$, chính sách cho ngay đường từ $\mathrm B$ với chi phí $4$.

**Kiểm tra lại.** Tổng chi phí của đường dựng được: $2+2+1=5=J_0(\mathrm s)$.
:::

### 7.2 Chi phí tính toán

Bước 2 của Thuật toán 07.4 làm một phép cộng và nhiều nhất một phép so sánh cho mỗi cặp trạng thái, điều khiển. Số cặp đó được đếm chính xác trong mệnh đề sau và được so với số chuỗi của phép liệt kê.

::: proposition Mệnh đề 07.53 (Số phép tính của giải ngược)
**Giả thiết.** Bài toán của Định nghĩa 07.46.

**Kết luận.**

- (a) Bước 2 của Thuật toán 07.4 tính đúng $\sum_{k=0}^{N-1}\sum_{\xi\in X_k}\lvert U_k(\xi)\rvert$ biểu thức $g_k(\xi,u)+J_{k+1}(f_k(\xi,u))$.
- (b) Nếu $\lvert X_0\rvert=1$, $\lvert X_k\rvert=q$ với $k\ge1$ và mọi $\lvert U_k(\xi)\rvert=q$, số biểu thức là $q+(N-1)q^2$, trong khi số chuỗi điều khiển từ $\xi_0$ là $q^N$.

**Điều kiện áp dụng.** Mỗi lần tính $g_k$, $f_k$ và tra $J_{k+1}$ tốn một lượng việc chặn bởi một hằng số.

**Phạm vi.** Mệnh đề đếm theo số trạng thái. Khi số trạng thái lớn theo hàm mũ của một tham số khác, số phép tính cũng lớn theo hàm mũ (Nhận xét 07.54).
:::

::: proof Chứng minh Mệnh đề 07.53
**Bước 1 (phần (a)).** Bước 2 duyệt mỗi $k$ từ $N-1$ về $0$, mỗi $\xi\in X_k$, và trong (6.3) tính một biểu thức cho mỗi $u\in U_k(\xi)$. Không cặp nào được tính hai lần.

**Bước 2 (phần (b)).** Giai đoạn $0$ có một trạng thái với $q$ điều khiển; mỗi giai đoạn $k=1,\ldots,N-1$ có $q$ trạng thái, mỗi trạng thái $q$ điều khiển. Tổng là $q+(N-1)q^2$. Mỗi chuỗi chọn một trong $q$ điều khiển ở mỗi giai đoạn, nên có $q^N$ chuỗi. $\square$
:::

Theo Mệnh đề 07.53, số phép tính của giải ngược tăng tuyến tính theo $N$, còn số chuỗi tăng theo hàm mũ. Lý do nằm ở nguyên lý tối ưu (Mệnh đề 07.50): mọi chuỗi đi qua cùng một trạng thái dùng chung một đuôi tối ưu, nên chỉ cần lưu một giá trị cho mỗi trạng thái.

::: example Ví dụ 07.30 (Đếm phép tính)
**Đồ thị tầng của Mục 6.** Tại $\mathrm s$, $\mathrm A$, $\mathrm B$ mỗi nút hai điều khiển, tại $\mathrm C$, $\mathrm D$ mỗi nút một; theo Mệnh đề 07.53(a), giải ngược tính $2+2+2+1+1=8$ biểu thức, bằng số cạnh và bằng số phép cộng của liệt kê ở Ví dụ 07.26.

**Đồ thị $N=20$ giai đoạn, $q=2$.** Theo Mệnh đề 07.53(b), giải ngược tính $2+19\cdot4=78$ biểu thức. Liệt kê có $2^{20}=1\,048\,576$ chuỗi, mỗi chuỗi cần $19$ phép cộng, tổng cộng khoảng $2\cdot10^7$ phép cộng.

**Kiểm tra lại.** Với $N=3$, $q=2$, công thức (b) cho $2+2\cdot4=10$ biểu thức và $8$ chuỗi; đồ thị của Mục 6 nhỏ hơn trường hợp (b) vì tầng cuối chỉ có một nút $\mathrm t$, nên $\mathrm C$ và $\mathrm D$ mỗi nút chỉ có một điều khiển.
:::

::: remark Nhận xét 07.54 (Giới hạn của quy hoạch động hữu hạn tất định)
**Số trạng thái.** Ưu thế của Mệnh đề 07.53 phụ thuộc vào số trạng thái. Nếu trạng thái là một vector sáu thành phần, mỗi thành phần nhận mười mức, thì mỗi giai đoạn đã có $10^6$ trạng thái, và số này tăng theo hàm mũ của số thành phần. Bellman (1957) gọi hiện tượng này là lời nguyền số chiều (curse of dimensionality).

**Chuyển tiếp ngẫu nhiên.** Lời giải khi đó là một chính sách chứ không phải một chuỗi cố định (bài giảng số 16 của MIT 15.093J, trang 7 và 9; Bertsekas 2017, §1.3).

**Chân trời vô hạn.** Với số giai đoạn vô hạn và chi phí có chiết khấu, (6.3) thành một phương trình điểm bất động cho một hàm $J$ duy nhất. Các trường hợp này nằm ngoài phạm vi chương.
:::

**Trong học máy.** Giải ngược là khung chung của nhiều thuật toán trên chuỗi: thuật toán Viterbi cho mô hình Markov ẩn và căn chỉnh chuỗi bằng khoảng cách sửa (edit distance) trong xử lý ngôn ngữ. Trong học tăng cường, lặp giá trị (value iteration) dùng cùng phép tính để lập kế hoạch khi mô hình môi trường đã biết. Khi không gian trạng thái quá lớn, như bàn cờ vây, học tăng cường thay bảng $J$ bằng một mạng nơ-ron xấp xỉ, và bảo đảm của Mệnh đề 07.52 không còn đúng nguyên vẹn vì giá trị chỉ là xấp xỉ; Sutton và Barto (2018, chương 9) trình bày hướng này.

::: exercise Bài tập 07.15 (Giải ngược khi hai chi phí thay đổi)
Đồ thị tầng có cùng cấu trúc với Mục 6: nút $\mathrm s$ ở tầng 0; $\mathrm A$, $\mathrm B$ ở tầng 1; $\mathrm C$, $\mathrm D$ ở tầng 2; $\mathrm t$ ở tầng 3. Chi phí cạnh: $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=3$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=0$, $g(\mathrm D,\mathrm t)=1$.

- (a) Tính $J_2(\mathrm C)$, $J_2(\mathrm D)$.
- (b) Tính $J_1(\mathrm A)$, $J_1(\mathrm B)$; ghi điều khiển đạt cực tiểu.
- (c) Tính $J_0(\mathrm s)$ và dựng đường tối ưu bằng lượt xuôi.
- (d) Kiểm tra trực tiếp tổng chi phí của đường tìm được và của ba đường còn lại.
- (e) Tính $\sum_k\sum_{\xi\in X_k}\lvert U_k(\xi)\rvert$ cho đồ thị này và so với số đường đi. Làm lại cho một đồ thị cùng dạng với $N=10$ giai đoạn: nút $\mathrm s$, chín tầng giữa mỗi tầng hai nút, nút $\mathrm t$, mỗi nút nối với mọi nút của tầng sau; so với $q^N$ khi $q=2$.

![Đồ thị bốn tầng: s ở tầng 0; A, B ở tầng 1; C, D ở tầng 2; t ở tầng 3. Tám chi phí cạnh: s–A 2, s–B 3, A–C 4, A–D 2, B–C 1, B–D 3, C–t 0, D–t 1. Hai cạnh s–B và C–t được tô màu vì chi phí đã đổi.](img/lec-07/dp-layered-graph-new-costs.svg)
:::

::: hint
Hai cạnh tô màu trên hình có chi phí khác với đồ thị của Mục 6, nơi $g(\mathrm s,\mathrm B)=5$ và $g(\mathrm C,\mathrm t)=3$. Bắt đầu từ tầng 2. Ở (e), dùng Mệnh đề 07.53(a) và đếm riêng tầng cuối, nơi mỗi nút chỉ có một cạnh tới $\mathrm t$.
:::

::: solution
**Câu (a).** $J_2(\mathrm C)=0+0=0$ và $J_2(\mathrm D)=1+0=1$.

**Câu (b).**

- $J_1(\mathrm A)=\min\{4+0,\ 2+1\}=3$, điều khiển đạt cực tiểu là $\mathrm D$.
- $J_1(\mathrm B)=\min\{1+0,\ 3+1\}=1$, điều khiển đạt cực tiểu là $\mathrm C$.

**Câu (c).** $J_0(\mathrm s)=\min\{2+3,\ 3+1\}=4$, điều khiển đạt cực tiểu là $\mathrm B$. Lượt xuôi cho đường $\mathrm s\to\mathrm B\to\mathrm C\to\mathrm t$. Trên hình sau, giá trị $J$ ghi cạnh mỗi nút và đường tối ưu được tô đậm.

![Đồ thị tầng với chi phí mới s–A 2, s–B 3, A–C 4, A–D 2, B–C 1, B–D 3, C–t 0, D–t 1. Giá trị J(t)=0, J(C)=0, J(D)=1, J(A)=3, J(B)=1, J(s)=4; đường tối ưu s–B–C–t được tô đậm.](img/lec-07/dp-bellman-values-new-costs.svg)

**Câu (d).** Đường tìm được có chi phí $3+1+0=4$. Ba đường còn lại: $\mathrm s\to\mathrm A\to\mathrm C\to\mathrm t$ có $2+4+0=6$; $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ có $2+2+1=5$; $\mathrm s\to\mathrm B\to\mathrm D\to\mathrm t$ có $3+3+1=7$.

**Câu (e).** Tại $\mathrm s$, $\mathrm A$, $\mathrm B$ mỗi nút hai điều khiển, tại $\mathrm C$, $\mathrm D$ mỗi nút một: tổng $2+2+2+1+1=8$. Có $4$ đường đi; với đồ thị nhỏ này hai con số gần nhau. Với $N=10$:

- giai đoạn $0$: $2$ biểu thức;
- giai đoạn $1$ tới $8$: mỗi giai đoạn $2\cdot2=4$, cộng lại $32$;
- giai đoạn $9$: hai nút, mỗi nút một cạnh tới $\mathrm t$, cộng lại $2$.

Tổng $36$ biểu thức, trong khi số đường đi là $2^9=512$ và $q^N=2^{10}=1\,024$ là số chuỗi khi mọi giai đoạn đều có hai lựa chọn.

**Kiểm tra lại.** Đường tối ưu cũ $\mathrm s\to\mathrm A\to\mathrm D\to\mathrm t$ không còn tối ưu. Thay đổi ở cạnh $\mathrm C\to\mathrm t$ làm $J_1(\mathrm B)$ giảm từ $4$ xuống $1$ và, cùng chi phí $\mathrm s\to\mathrm B$ mới, đổi lựa chọn ở tầng đầu; $J_1(\mathrm A)$ vẫn bằng $3$ vì điều khiển tối ưu tại $\mathrm A$ vẫn là $\mathrm D$.
:::

Với khái niệm chính sách (Định nghĩa 07.51), chúng ta đã ghép phương trình Bellman (Định lý 07.49) với một lượt dựng xuôi thành Thuật toán 07.4, một thuật toán đầy đủ. Mệnh đề 07.52 chứng minh chuỗi thu được là tối ưu, Mệnh đề 07.53 cho số phép tính tỉ lệ với số cặp trạng thái, điều khiển, và Nhận xét 07.54 nêu giới hạn của chi phí đó. Các kết quả này được chứng minh dưới bốn giả thiết của Định nghĩa 07.46: hữu hạn, chuyển tiếp tất định, chi phí cộng và trạng thái đủ.

## Tình huống áp dụng và ứng dụng

Hai tuyến của chương được áp dụng vào bốn bài toán học máy dưới đây, và mỗi tình huống được giải trọn vẹn bằng công cụ của chương. Hai tình huống đầu dùng tuyến quy hoạch tuyến tính, còn hai tình huống sau dùng tuyến quy hoạch động, trong đó Tình huống 07.4 nêu một trường hợp giả thiết trạng thái đủ không thỏa.

::: application Tình huống 07.1 (Hồi quy $L_1$ cho thời gian huấn luyện có một số đo sai lệch)
**Bài toán và dữ liệu.**

Một nhóm đo thời gian một lượt huấn luyện (epoch) theo kích thước tập dữ liệu. Năm số đo dưới đây là số liệu sư phạm.

| Mẫu $i$ | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---:|---:|---:|---:|---:|
| Kích thước dữ liệu $\nu_i$ (chục nghìn mẫu) | $0$ | $1$ | $2$ | $3$ | $4$ |
| Thời gian $y_i$ (phút) | $1$ | $2$ | $3$ | $4$ | $10$ |

Số đo thứ năm bị sai lệch vì máy chủ bị chia sẻ trong khi đo; theo xu hướng, giá trị đúng là $5$. Cần một đường thẳng dự đoán thời gian theo kích thước dữ liệu, không bị ảnh hưởng bởi số đo sai lệch.

**Mô hình hóa.** Đặc trưng $h_i=(1,\nu_i)$, tham số $x=(x_1,x_2)$ gồm hệ số chặn và hệ số góc, phần dư $r_i=x_1+x_2\nu_i-y_i$. Theo Hệ quả 07.4, bài toán cực tiểu $\sum_i|r_i|$ là quy hoạch tuyến tính (1.2) với $7$ biến và $10$ ràng buộc.

**Kiểm tra giả thiết.** Mệnh đề 07.25 cần các $h_i$ sinh $\mathbb R^2$: $h_1=(1,0)$ và $h_2=(1,1)$ độc lập. Mục tiêu không âm nên giá trị tối ưu hữu hạn.

**Áp dụng.** Theo Mệnh đề 07.25, có một nghiệm tối ưu đi qua hai điểm dữ liệu có đầu vào khác nhau, nên chỉ cần xét $\binom52=10$ đường qua hai điểm.

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
\sum_i|r_i|&\ge\sum_i\sigma_i\bigl(h_i^Tx-y_i\bigr)=-\sum_i\sigma_iy_i\\
&=-\bigl(-\tfrac12+0+\tfrac32+4-10\bigr)=5 .
\end{aligned}
$$

Dấu bằng cần $|r_i|=\sigma_ir_i$; với $i=1,2,3$, $|\sigma_i|<1$ buộc ba phần dư $r_1$, $r_2$, $r_3$ bằng $0$, nên $x_1=1$, $x_1+x_2=2$: nghiệm duy nhất $(1,1)$. Đây là chứng nhận của Mệnh đề 02.11, và $\sigma$ là một nghiệm đối ngẫu (Mệnh đề 03.11).

**So với bình phương nhỏ nhất.** Cùng dữ liệu cho $x=(0,2)$, phần dư $(-1,0,1,2,-2)$, tổng bình phương $10$. Tại $\nu=5$, đường $L_1$ dự đoán $6$ phút, đường bình phương nhỏ nhất dự đoán $10$ phút.

**Diễn giải.** Đường $L_1$ đi qua bốn số đo tốt và dồn sai lệch vào số đo bất thường; bình phương nhỏ nhất chia sai số cho mọi mẫu nên hệ số góc tăng từ $1$ lên $2$.

**Giới hạn.** Nghiệm $L_1$ có thể không duy nhất (Ví dụ 07.4), và khi nhiều số đo cùng sai lệch theo một hướng, đường $L_1$ cũng bị lệch.

**Dẫn ngược lý thuyết.** Hệ quả 07.4; Mệnh đề 07.25, dựa trên Định lý 07.20, 07.23 (giả thiết các $h_i$ sinh $\mathbb R^2$ dùng ở bước kiểm tra); Mệnh đề 02.11.

**Kiểm tra lại.** Tại $x=(1,1)$ chỉ $r_5=-5$ khác $0$, nên $\sum_i\sigma_ir_i=(-1)(-5)=5$, bằng $\sum_i|r_i|$.
:::

::: application Tình huống 07.2 (Phân bổ giờ GPU giữa tinh chỉnh và sinh dữ liệu, có đỉnh suy biến)
**Bài toán và dữ liệu.**

Trong một tuần, một nhóm chia giờ GPU giữa $x_1$ giờ tinh chỉnh (fine-tuning) một mô hình phân loại và $x_2$ giờ sinh dữ liệu tổng hợp cho bộ đánh giá. Mỗi giờ tinh chỉnh mang lại $5$ đơn vị lợi ích, mỗi giờ sinh dữ liệu mang lại $4$ đơn vị (số liệu sư phạm). Ba giới hạn:

- tổng giờ GPU: $x_1+x_2\le100$;
- năng lượng, với $3$ kWh mỗi giờ tinh chỉnh, $1$ kWh mỗi giờ sinh dữ liệu và hạn mức $180$ kWh: $3x_1+x_2\le180$;
- năng lực kiểm duyệt dữ liệu sinh ra: $x_2\le60$.

**Mô hình hóa.** Dạng (1.1) với $c=(5,4)$, các hàng $(1,1)$, $(3,1)$, $(0,1)$ và $b=(100,180,60)$. Dạng chuẩn thêm biến bù $s_1,s_2,s_3$; thứ tự biến $(x_1,x_2,s_1,s_2,s_3)$.

**Kiểm tra giả thiết.**

1. Lợi ích và tiêu hao tỉ lệ với số giờ (Nhận xét 07.3).
2. Có điểm cực biên: miền chứa $(0,0)$ và các hàng $-x_1\le0$, $-x_2\le0$ cho hạng $2$ (Định lý 07.20).
3. Giá trị hữu hạn: $x_1\le60$ (từ hàng năng lượng) và $x_2\le60$, nên $5x_1+4x_2\le540$.

**Đỉnh.** Theo Định lý 07.13, các đỉnh là $(0,0)$, $(60,0)$, $(0,60)$, $(40,60)$, với $z$ lần lượt $0$, $300$, $240$, $440$. Tại $(40,60)$ cả ba giới hạn cùng hoạt động: $40+60=100$, $120+60=180$, $60=60$; đó là một đỉnh suy biến.

**Phương pháp đơn hình.** Hai bước xoay từ $(0,0)$ theo Thuật toán 07.2, biến vào có chi phí rút gọn lớn nhất:

- Bước 1, tại $(0,0)$ với cơ sở $\{s_1,s_2,s_3\}$: hướng $d^{x_1}=(1,0,-1,-3,0)$, $\bar c_{x_1}=5$; phép thử tỉ số $s_1$: $100$, $s_2$: $\tfrac{180}3=60$; điểm mới $(60,0)$, $z=300$, cơ sở $\{x_1,s_1,s_3\}$.
- Bước 2, tại $(60,0)$: hướng $d^{x_2}=(-\tfrac13,1,-\tfrac23,0,-1)$, $\bar c_{x_2}=\tfrac73$; phép thử tỉ số $x_1$: $\tfrac{60}{1/3}=180$, $s_1$: $\tfrac{40}{2/3}=60$, $s_3$: $60$; $s_1$ và $s_3$ hòa, và $s_1$ ra vì có chỉ số nhỏ hơn. Điểm mới $(40,60)$, $z=440$, cơ sở $\{x_1,x_2,s_3\}$, cả ba biến bù bằng $0$; nếu $s_3$ ra thì được cơ sở $\{x_1,x_2,s_1\}$.

**Kiểm tra điều kiện dừng khi suy biến.** Tại $(40,60)$ chỉ có hai thành phần dương, ít hơn $m=3$, và ba tập $\{x_1,x_2,s_i\}$, $i=1,2,3$, đều là cơ sở của cùng điểm.

| Cơ sở | Chi phí rút gọn của hai biến ngoài cơ sở | Mệnh đề 07.33(b) |
|---|---|---|
| $\{x_1,x_2,s_1\}$ | $\bar c_{s_2}=-\tfrac53$, $\bar c_{s_3}=-\tfrac73$ | tối ưu |
| $\{x_1,x_2,s_3\}$ | $\bar c_{s_1}=-\tfrac72$, $\bar c_{s_2}=-\tfrac12$ | tối ưu |
| $\{x_1,x_2,s_2\}$ | $\bar c_{s_1}=-5$, $\bar c_{s_3}=1$ | không kết luận |

Với cơ sở thứ ba, hướng $d^{s_3}=(1,-1,0,-2,1)$ có $\bar c_{s_3}=1>0$ nhưng giảm biến cơ sở $s_2$ đang bằng $0$, nên $\theta^*=0$: một bước xoay suy biến (Mục 5.4) đổi sang cơ sở $\{x_1,x_2,s_3\}$ mà không di chuyển. Ở bước 2, cả hai cách phá hòa tỉ số đều cho một cơ sở thuộc hai dòng đầu của bảng, nên thuật toán dừng ngay; cơ sở thứ ba chỉ gặp khi đi tới đỉnh này theo đường khác.

**Chứng nhận.** Từ cơ sở $\{x_1,x_2,s_3\}$, $\mu=(\tfrac72,\tfrac12,0)$, và với mọi phương án khả thi

$$
\begin{aligned}
5x_1+4x_2&=\tfrac72(x_1+x_2)+\tfrac12(3x_1+x_2)\\
&\le\tfrac72\cdot100+\tfrac12\cdot180=440 .
\end{aligned}
$$

Dấu bằng cần $x_1+x_2=100$ và $3x_1+x_2=180$, tức $(40,60)$: nghiệm duy nhất.

**Diễn giải.** Phân bổ tối ưu là $40$ giờ tinh chỉnh và $60$ giờ sinh dữ liệu; ba biến bù bằng $0$, nên cả ba tài nguyên dùng hết. Theo đối ngẫu yếu (Mệnh đề 03.11), mọi bộ hệ số nhân không âm mà tổ hợp các hàng ràng buộc bằng $c$ cho một cận trên của giá trị tối ưu, bằng tổng hệ số nhân với vế phải. Vì đỉnh suy biến, bộ hệ số đó không duy nhất:

- $\mu=(\tfrac72,\tfrac12,0)$ từ cơ sở $\{x_1,x_2,s_3\}$ cho $\tfrac72\cdot100+\tfrac12\cdot180=440$;
- $\mu'=(0,\tfrac53,\tfrac73)$ từ cơ sở $\{x_1,x_2,s_1\}$, vì $5x_1+4x_2=\tfrac53(3x_1+x_2)+\tfrac73x_2$, cho $\tfrac53\cdot180+\tfrac73\cdot60=300+140=440$.

Giá bóng (shadow price) của một tài nguyên là mức thay đổi của $z^*$ khi vế phải của ràng buộc tương ứng tăng một đơn vị (Hệ quả 03.24 gọi nhân tử là giá bóng khi giá trị tối ưu khả vi theo vế phải). Hai bộ cho hai giá khác nhau cho một giờ GPU, $\tfrac72$ và $0$; tính lại trực tiếp cho kết quả:

- thêm một giờ GPU ($100\to101$): cận $\mu'$ không chứa vế phải $100$, nên $z^*$ vẫn là $440$ tại $(40,60)$;
- bớt một giờ GPU ($100\to99$): giao của $x_1+x_2=99$ với $3x_1+x_2=180$ là $(40{,}5;\,58{,}5)$, với $z=202{,}5+234=436{,}5$, giảm đúng $\mu_1=3{,}5$.

Như vậy, tăng $b_1$ một đơn vị đổi $z^*$ một lượng $0$, giảm $b_1$ một đơn vị làm $z^*$ giảm $3{,}5$: ở đỉnh suy biến này, $z^*$ không khả vi theo $b_1$.

**Chẩn đoán khi mô hình sai.** Quên giới hạn giờ GPU và năng lượng: $x_1$ lớn tùy ý trên miền, kết cục không bị chặn (Định lý 07.26). Thêm yêu cầu $x_1\ge70$: năng lượng cần ít nhất $210>180$ kWh, kết cục không khả thi. Đổi lợi ích thành $c=(3,1)$, song song với hàng năng lượng: cả cạnh từ $(60,0)$ tới $(40,60)$ tối ưu với $z^*=180$.

**Giới hạn.** Lợi ích của tinh chỉnh thực tế bão hòa theo số giờ, nên giả thiết tỉ lệ chỉ đúng trong một khoảng.

**Dẫn ngược lý thuyết.** Nhận xét 07.3; Định lý 07.13, 07.20; Định nghĩa 07.32, Mệnh đề 07.33 (chiều ngược sai khi suy biến), Mệnh đề 07.34, Thuật toán 07.2 và quy tắc Bland (Định nghĩa 07.37, Định lý 07.38) cho bước xoay suy biến; Định lý 07.26.

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

**Mô hình hóa theo Định nghĩa 07.46.**

- $N=3$; $X_0=\{\mathrm o\}$ với $\mathrm o$ là trạng thái bắt đầu; $X_k=\{\mathrm{NN},\mathrm{VB}\}$ là nhãn của từ thứ $k$, $k=1,2,3$.
- Điều khiển ở giai đoạn $k$ là nhãn của từ thứ $k+1$; $f_k(\xi,u)=u$.
- $g_0(\mathrm o,u)$ là chi phí bắt đầu cộng phát xạ từ thứ nhất; $g_k(\xi,u)$, $k=1,2$, là chi phí chuyển $\xi\to u$ cộng phát xạ từ thứ $k+1$; $g_3(\xi)$ là chi phí kết thúc.

**Kiểm tra giả thiết.**

1. Hữu hạn, tất định: nhãn chọn xác định trạng thái kế tiếp.
2. Chi phí cộng: $-\log_2$ của một tích là tổng các $-\log_2$.
3. Trạng thái đủ: trong mô hình bậc nhất, xác suất chuyển chỉ phụ thuộc nhãn trước.

**Áp dụng Thuật toán 07.4.**

- $J_3(\mathrm{NN})=J_3(\mathrm{VB})=2$.
- $J_2(\mathrm{NN})=\min\{2+3+2,\ 1+7+2\}=7$, chọn $\mathrm{NN}$.
- $J_2(\mathrm{VB})=\min\{1+3+2,\ 2+7+2\}=6$, chọn $\mathrm{NN}$.
- $J_1(\mathrm{NN})=\min\{2+4+7,\ 1+3+6\}=10$, chọn $\mathrm{VB}$.
- $J_1(\mathrm{VB})=\min\{1+4+7,\ 2+3+6\}=11$, chọn $\mathrm{VB}$.
- $J_0(\mathrm o)=\min\{1+3+10,\ 1+6+11\}=14$, chọn $\mathrm{NN}$.

Lượt xuôi: $\mathrm{NN}$, rồi $u_1^*(\mathrm{NN})=\mathrm{VB}$, rồi $u_2^*(\mathrm{VB})=\mathrm{NN}$. Chuỗi nhãn tối ưu là $\mathrm{NN}\ \mathrm{VB}\ \mathrm{NN}$ với chi phí $14$ bit, tức xác suất đồng thời $2^{-14}$.

**Diễn giải.** Từ "huấn luyện" nhận nhãn động từ. Lựa chọn tại từ thứ hai so sánh $1+3+J_2(\mathrm{VB})$ với $2+4+J_2(\mathrm{NN})$, tức gồm cả phần câu còn lại, không chỉ chi phí phát xạ.

**Giới hạn.** Với câu dài $30$ từ và $40$ nhãn, giải ngược cần khoảng $30\cdot40^2=48\,000$ biểu thức (Mệnh đề 07.53) thay cho $40^{30}$ chuỗi. Bảo đảm chỉ đúng khi mô hình bậc nhất mô tả đúng ngôn ngữ; Tình huống 07.4 xét trường hợp không đúng.

**Dẫn ngược lý thuyết.** Định nghĩa 07.46; Định lý 07.49 (bước kiểm tra 2 dùng cho chi phí cộng, bước kiểm tra 3 cho trạng thái đủ); Mệnh đề 07.52.

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

Trong khung của Tình huống 07.3, trạng thái ở giai đoạn $2$ là nhãn của từ thứ hai. Khi đó, chi phí chọn nhãn từ thứ ba phụ thuộc cả nhãn từ thứ nhất, nên không còn là hàm của $(\xi,u)$. Hai lịch sử $\mathrm{NN\,VB}$ và $\mathrm{VB\,VB}$ cùng đi tới trạng thái $\mathrm{VB}$ nhưng có phần tương lai khác nhau:

- sau $\mathrm{NN\,VB}$: $\min\{1+3+2+4,\ 2+7+2\}=\min\{10,11\}=10$;
- sau $\mathrm{VB\,VB}$: $\min\{1+3+2,\ 2+7+2\}=\min\{6,11\}=6$.

Đại lượng "$J_2(\mathrm{VB})$" không xác định được: giả thiết trạng thái đủ của Định lý 07.49 bị vi phạm.

**Hậu quả quan sát được.**

Bỏ qua hiệu chỉnh và chạy Thuật toán 07.4 như Tình huống 07.3 cho $\mathrm{NN\,VB\,NN}$. Chi phí thật của chuỗi này là $14+4=18$ bit. Liệt kê tám chuỗi với hiệu chỉnh cho nghiệm thật là $\mathrm{NN\,NN\,NN}$ với $17$ bit; chuỗi trả về sai nhãn từ thứ hai.

**Sửa bằng mở rộng trạng thái.**

Theo Nhận xét 07.47, đặt trạng thái ở giai đoạn $k\ge2$ là cặp (nhãn từ $k-1$, nhãn từ $k$). Tập $X_2$ và $X_3$ có bốn cặp; $X_1=\{\mathrm{NN},\mathrm{VB}\}$; chuyển trạng thái ghép nhãn hiện tại với nhãn vừa chọn, rồi bỏ nhãn cũ nhất khi cặp đã có hai nhãn. Chi phí giai đoạn $2$ cộng thêm $4$ khi ba nhãn liên tiếp là $\mathrm{NN}$, $\mathrm{VB}$, $\mathrm{NN}$. Chi phí cuối chỉ phụ thuộc nhãn cuối, bằng $2$.

- $J_2(\mathrm{NN},\mathrm{NN})=\min\{2+3+2,\ 1+7+2\}=7$; $J_2(\mathrm{VB},\mathrm{NN})=7$.
- $J_2(\mathrm{NN},\mathrm{VB})=\min\{1+3+2+4,\ 2+7+2\}=10$; $J_2(\mathrm{VB},\mathrm{VB})=\min\{6,11\}=6$.
- $J_1(\mathrm{NN})=\min\{2+4+7,\ 1+3+10\}=13$, chọn $\mathrm{NN}$; hai số $7$, $10$ là $J_2(\mathrm{NN},\mathrm{NN})$ và $J_2(\mathrm{NN},\mathrm{VB})$.
- $J_1(\mathrm{VB})=\min\{1+4+7,\ 2+3+6\}=11$, chọn $\mathrm{VB}$; hai số $7$, $6$ là $J_2(\mathrm{VB},\mathrm{NN})$ và $J_2(\mathrm{VB},\mathrm{VB})$.
- $J_0(\mathrm o)=\min\{1+3+13,\ 1+6+11\}=17$, chọn $\mathrm{NN}$.

Lượt xuôi: $\mathrm{NN}$, $\mathrm{NN}$, rồi từ $(\mathrm{NN},\mathrm{NN})$ chọn $\mathrm{NN}$; chuỗi $\mathrm{NN\,NN\,NN}$ với $17$ bit, khớp liệt kê.

**Chi phí tính toán tăng thêm.** Số biểu thức tăng từ $2+2\cdot2+2\cdot2=10$ lên $2+2\cdot2+4\cdot2=14$. Với $40$ nhãn, trạng thái cặp có $40^2=1\,600$ phần tử và mỗi giai đoạn cần khoảng $40^3=64\,000$ biểu thức, so với $1\,600$ của mô hình bậc nhất.

**Diễn giải.** Lỗi nằm ở cách chọn trạng thái: phương trình Bellman vẫn đúng cho mô hình có trạng thái đủ. Khi chi phí phụ thuộc vào lịch sử dài hơn trạng thái đang giữ, cách sửa là mở rộng trạng thái, hoặc chấp nhận một lời giải xấp xỉ.

**Dẫn ngược lý thuyết.** Định nghĩa 07.46 (giả thiết trạng thái đủ bị vi phạm ở bước đầu); Nhận xét 07.47 (mở rộng trạng thái); Định lý 07.49 và Mệnh đề 07.52 áp dụng lại cho mô hình đã mở rộng; Mệnh đề 07.53 cho chi phí tính toán tăng thêm.

**Kiểm tra lại.** $\mathrm{NN\,NN\,NN}$: $1+3+2+4+2+3+2=17$; $\mathrm{NN\,VB\,NN}$ với hiệu chỉnh: $1+3+1+3+1+3+2+4=18$.
:::

**Ứng dụng.** Các khái niệm của chương xuất hiện trong học máy ở những bài toán sau.

- **Hồi quy bền vững và hồi quy phân vị.** Hồi quy $L_1$ (Hệ quả 07.4) và hồi quy phân vị của Koenker và Bassett (1978) là quy hoạch tuyến tính; Mệnh đề 07.25 cho tính chất nội suy của nghiệm đỉnh.
- **Phân bổ tài nguyên tính toán.** Chia giờ GPU, bộ nhớ hay băng thông với lợi ích tuyến tính là quy hoạch tuyến tính (Tình huống 07.2); biến bù chỉ ra nút thắt. Các bộ giải như HiGHS trong `scipy.optimize.linprog` giải bài toán này bằng biến thể của Thuật toán 07.2 hoặc bằng phương pháp điểm trong, và pha I (Mệnh đề 07.44) báo khi các yêu cầu mâu thuẫn.
- **Vận chuyển tối ưu rời rạc.** Bài toán vận chuyển giữa hai phân phối rời rạc là quy hoạch tuyến tính dạng chuẩn với ràng buộc tổng theo hàng và theo cột, trong đó một phương trình phụ thuộc các phương trình còn lại (Nhận xét 07.9). Theo Hệ quả 07.16, một kế hoạch vận chuyển ở đỉnh có số ô khác $0$ không vượt hạng của hệ; Peyré và Cuturi (2019, chương 3) trình bày bài toán này.
- **Giải mã chuỗi.** Thuật toán Viterbi (Tình huống 07.3) và khoảng cách sửa là Thuật toán 07.4 trên đồ thị tầng, với trạng thái là nhãn hoặc vị trí và chi phí cộng theo giai đoạn.
- **Học tăng cường.** Phương trình Bellman (Định lý 07.49) với kỳ vọng và chân trời vô hạn là nền của lặp giá trị và học Q (Q-learning); Sutton và Barto (2018, chương 3–4, 6) trình bày hai phương pháp này.

## Tóm tắt chương

Chương này khởi đầu bằng bài toán hộp hạt, một bài toán có ràng buộc nằm ngoài phạm vi các bước cục bộ của Bài 04–06, và viết nó thành quy hoạch tuyến tính (Định nghĩa 07.1). Hồi quy $L_1$ cũng đưa được về dạng này (Hệ quả 07.4), và mọi quy hoạch tuyến tính đưa được về dạng chuẩn (Mệnh đề 07.8). Điểm cực biên của đa diện (Định nghĩa 07.11) được nhận biết bằng hạng các ràng buộc hoạt động (Định lý 07.13), và trên dạng chuẩn, điểm cực biên chính là nghiệm cơ sở khả thi (Định lý 07.15). Tập ứng viên vì vậy hữu hạn, tính được bằng đại số, và khác rỗng dưới điều kiện của Định lý 07.20. Kết quả đích của tuyến thứ nhất là Định lý 07.23, theo đó có một điểm cực biên tối ưu khi miền có điểm cực biên và giá trị tối ưu hữu hạn. Định lý 07.26 phân loại mọi bài toán thành bốn kết cục, còn Bổ đề 07.30 cùng Thuật toán 07.1 biến kết quả đích thành một tìm kiếm cục bộ qua các đỉnh kề. Phương pháp đơn hình (Thuật toán 07.2) thực hiện tìm kiếm đó bằng chi phí rút gọn, phép thử tỉ số và bước xoay; nó dừng với chứng nhận tối ưu hoặc chứng nhận không bị chặn (Định lý 07.35), kể cả khi suy biến nếu dùng quy tắc Bland (Định lý 07.38), và pha I (Thuật toán 07.3) cho cơ sở xuất phát hoặc kết luận không khả thi. Cuối cùng, với các quyết định theo giai đoạn, tuyến thứ hai đi từ Định nghĩa 07.46 qua phương trình Bellman (Định lý 07.49) tới Thuật toán 07.4 và Mệnh đề 07.52. Khi số trạng thái và số điều khiển ở mỗi giai đoạn cố định (Mệnh đề 07.53), số phép tính của tuyến này tăng tuyến tính theo số giai đoạn $N$, thay cho hàm mũ của phép liệt kê.

**Định nghĩa và kết quả theo mục.**

- Mục 1: quy hoạch tuyến tính (Định nghĩa 07.1); điểm trong không tối ưu khi $c\ne0$ (Mệnh đề 07.2); hồi quy $L_1$ là quy hoạch tuyến tính (Hệ quả 07.4).
- Mục 2: đa diện (Định nghĩa 07.5) và tính lồi của đa diện (Mệnh đề 07.6); dạng chuẩn (Định nghĩa 07.7); mọi quy hoạch tuyến tính đưa được về dạng chuẩn, giữ giá trị tối ưu (Mệnh đề 07.8); nghiệm cơ sở khả thi (Định nghĩa 07.10).
- Mục 3: điểm cực biên, ràng buộc hoạt động (Định nghĩa 07.11, 07.12); điểm cực biên ⇔ $n$ ràng buộc hoạt động độc lập (Định lý 07.13), nên đa diện có hữu hạn điểm cực biên (Hệ quả 07.14); điểm cực biên ⇔ nghiệm cơ sở khả thi (Định lý 07.15), với nhiều nhất $m$ thành phần dương (Hệ quả 07.16); tập chứa đường thẳng (Định nghĩa 07.18); có điểm cực biên ⇔ không chứa đường thẳng ⇔ $\operatorname{rank}(A)=n$ (Định lý 07.20); dạng chuẩn khả thi luôn có điểm cực biên (Hệ quả 07.21).
- Mục 4: miền có điểm cực biên thì hoặc không bị chặn, hoặc có điểm cực biên tối ưu (Định lý 07.23); liệt kê điểm cực biên là đủ (Hệ quả 07.24); nghiệm đỉnh của hồi quy $L_1$ nội suy ít nhất $n$ mẫu (Mệnh đề 07.25); bốn kết cục, giá trị hữu hạn luôn được đạt (Định lý 07.26); điểm cực biên kề (Định nghĩa 07.28); hai cơ sở khác một chỉ số cho đỉnh kề (Mệnh đề 07.29); điểm cực biên chưa tối ưu có đỉnh kề với giá trị lớn hơn (Bổ đề 07.30); duyệt đỉnh kề (Thuật toán 07.1), dừng tại điểm cực biên tối ưu (Mệnh đề 07.31).
- Mục 5: hướng cơ sở, chi phí rút gọn (Định nghĩa 07.32); chi phí rút gọn không dương thì tối ưu, và điều ngược lại khi không suy biến (Mệnh đề 07.33); phép thử tỉ số, bước xoay, phát hiện không bị chặn (Mệnh đề 07.34); phương pháp đơn hình (Thuật toán 07.2), dừng khi không suy biến (Định lý 07.35); quay vòng và quy tắc Bland (Định nghĩa 07.37), chống quay vòng (Định lý 07.38); bảng đơn hình (Định nghĩa 07.40), bước xoay là phép biến đổi hàng (Mệnh đề 07.41); bài toán phụ của pha I (Định nghĩa 07.43), pha I quyết định tính khả thi (Mệnh đề 07.44), phương pháp hai pha (Thuật toán 07.3); số bước $2^n-1$ trên bài toán Klee–Minty (Nhận xét 07.45).
- Mục 6: bài toán quyết định hữu hạn tất định, chi phí tối ưu còn lại (Định nghĩa 07.46, 07.48); phương trình Bellman (Định lý 07.49); nguyên lý tối ưu (Mệnh đề 07.50).
- Mục 7: chính sách (Định nghĩa 07.51); giải ngược Bellman (Thuật toán 07.4); chính sách đạt cực tiểu cho chuỗi tối ưu (Mệnh đề 07.52); số phép tính $\sum_k\sum_\xi\lvert U_k(\xi)\rvert$ (Mệnh đề 07.53).

**Công thức cần nhớ.** Dạng chuẩn và nghiệm cơ sở:

$$
\max c^Tx,\quad Ax=b,\ x\ge0;\qquad x_B=A_B^{-1}b,\ x_{B^{\mathrm c}}=0 .
$$

Hướng cơ sở, chi phí rút gọn và phép thử tỉ số của phương pháp đơn hình; biến $j$ vào khi $\bar c_j>0$, thuật toán dừng khi mọi $\bar c_j\le0$:

$$
d^j_B=-A_B^{-1}A_j,\qquad\bar c_j=c_j-c_B^TA_B^{-1}A_j,\qquad\theta^*=\min_{i\in B,\ d^j_i<0}\frac{x_i}{-d^j_i}.
$$

Bảng đơn hình của cơ sở $B$:

$$
\begin{bmatrix}A_B^{-1}A & A_B^{-1}b\\ \bar c^T & -z\end{bmatrix}.
$$

Phương trình Bellman:

$$
J_N=g_N,\qquad J_k(\xi)=\min_{u\in U_k(\xi)}\bigl\{g_k(\xi,u)+J_{k+1}\bigl(f_k(\xi,u)\bigr)\bigr\}.
$$

**Giả thiết thường bị bỏ qua.**

- Mô hình tuyến tính cần tỉ lệ, cộng tính và biến nhận giá trị thực; biến nguyên đưa bài toán ra khỏi quy hoạch tuyến tính.
- Nghiệm cơ sở cần $A_B$ khả nghịch và, để khả thi, $A_B^{-1}b\ge0$; hạng $m$ không bảo đảm mọi tập $m$ cột là cơ sở.
- "Có điểm cực biên tối ưu" cần miền có điểm cực biên và giá trị tối ưu hữu hạn; không phải mọi nghiệm tối ưu là điểm cực biên.
- Chi phí rút gọn có một số dương chưa chứng minh điểm chưa tối ưu khi nghiệm cơ sở suy biến.
- Tính hữu hạn của phương pháp đơn hình cần không suy biến (Định lý 07.35) hoặc một quy tắc chống quay vòng như quy tắc Bland (Định lý 07.38); phương pháp cần một cơ sở khả thi xuất phát, do pha I cung cấp.
- Ở chiều cực tiểu, như trong Bertsimas và Tsitsiklis (1997), mọi điều kiện dấu của chi phí rút gọn đảo chiều.
- Phương trình Bellman cần trạng thái đủ, chi phí cộng, chuyển tiếp tất định và tập hữu hạn.

![Sơ đồ phân nhánh với tiêu đề "Chọn theo cấu trúc quyết định". Nút trên cùng hỏi "Quyết định có cấu trúc nào?", ghi "Kiểm tra giả thiết trước khi chọn công cụ". Nhánh trái "một lần, tuyến tính" dẫn tới ô "Quy hoạch tuyến tính": một vector quyết định; mục tiêu và ràng buộc tuyến tính; đa diện, cơ sở, điểm cực biên. Nhánh phải "theo giai đoạn" dẫn tới ô "Quy hoạch động": chuỗi quyết định hữu hạn; trạng thái đủ và chi phí cộng; Bellman, giải ngược, chính sách. Dòng chú thích: biến nguyên hoặc chuyển ngẫu nhiên nằm ngoài phạm vi hai lớp mô hình đang xét.](img/lec-07/lp-dp-decision-map.svg)

Sơ đồ trên tóm tắt cách chọn giữa hai tuyến. Câu hỏi ở nút trên cùng là về cấu trúc của quyết định: một vector chọn một lần với quan hệ tuyến tính dẫn sang quy hoạch tuyến tính, một chuỗi quyết định có trạng thái đủ dẫn sang quy hoạch động. Dòng chú thích dưới cùng ghi hai trường hợp nằm ngoài cả hai lớp mô hình của chương.

**Giới hạn còn lại.** Trong chương này, chúng ta đã nâng các công cụ của Bài 02 và Bài 03 cho quy hoạch tuyến tính từ chứng nhận một ứng viên lên tìm ứng viên trong một tập hữu hạn. Phương pháp đơn hình thực hiện việc tìm đó bằng phép tính trên cơ sở. Chúng ta cũng thêm một cấu trúc khác với bước cục bộ của Bài 04–06 cho bài toán theo giai đoạn. Chương còn bốn giới hạn sau:

- số bước của phương pháp đơn hình có thể tăng theo hàm mũ (Nhận xét 07.45), và các phương pháp thời gian đa thức như phương pháp điểm trong nằm ngoài chương;
- bài toán luồng mạng là quy hoạch tuyến tính trên đồ thị, trong đó cơ sở có cấu trúc riêng mà phương pháp đơn hình khai thác được; đó là nội dung Buổi 9 (Chương 12) của đề cương;
- khi biến buộc nguyên, Định lý 07.23 không còn cho nghiệm, và cần quy hoạch nguyên, nội dung Buổi 10 (Chương 13) của đề cương;
- khi chuyển tiếp ngẫu nhiên hoặc số giai đoạn vô hạn, phương trình Bellman cần kỳ vọng và thành phương trình điểm bất động, nền của học tăng cường.

Trong bộ học liệu này, Bài 07 là bài giảng cuối hiện có, và nguồn cho các hướng trên được dẫn ở mục cuối.

## Bài tập củng cố

Mỗi mức có ít nhất một bài tập. Các bài tập trong các mục và ba bài tập dưới đây là bộ bài tập của chương; mọi mục tiêu học tập có ít nhất một bài tập. [Tệp bài tập Bài 07](material-viewer.html?doc=materials/lec-07/exercises.md&deck=lecture-07-quy-hoach-tuyen-tinh-va-dong.html) chép lại Bài tập 07.1–07.15 kèm liên kết tới các trang chiếu tương ứng, và bổ sung bốn bài 07.19–07.22.

### Mức nhận biết

::: exercise Bài tập 07.16 (Nhận biết: đúng hay sai)
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
Câu 2 dùng Ví dụ 07.8; câu 4 dùng nửa mặt phẳng; câu 6 so (6.2) với chi phí một giai đoạn; câu 7 xét một đỉnh suy biến.
:::

::: solution
1. Sai. Điều kiện nguyên làm miền rời rạc; bài toán là quy hoạch nguyên (Định nghĩa 07.1 và đoạn sau nó).
2. Sai. Với hệ $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$ của bài toán hộp hạt, cơ sở $\{x_1,x_2,s_3\}$ có ma trận khả nghịch và cho $x_1=30$, $x_2=20$, $s_3=54-70=-16$, một giá trị âm (Ví dụ 07.8).
3. Đúng, theo Mệnh đề 07.22(b): cả đoạn nối hai nghiệm là tối ưu.
4. Sai. Nửa mặt phẳng $\{x_2\ge0\}$ chứa đường thẳng nằm ngang và không có điểm cực biên (Định lý 07.20).
5. Đúng, theo Định lý 07.26; đây là điểm khác với bài toán lồi tổng quát (Nhận xét 07.27).
6. Sai. $J_k(\xi)$ là tổng chi phí tối ưu của mọi giai đoạn còn lại. Trên đồ thị tầng với $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=5$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=3$, $g(\mathrm D,\mathrm t)=1$, Ví dụ 07.28 cho $J_0(\mathrm s)=5$, trong khi cạnh rẻ nhất ra khỏi $\mathrm s$ có chi phí $2$.
7. Sai khi nghiệm suy biến. Với bài toán cực đại $2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$, $x_1+2x_2\le70$, $x\ge0$, cơ sở $\{x_1,x_2,s_1\}$ của đỉnh $(30,20)$ có $s_1=0$ và $\bar c_{s_2}=1>0$, nhưng $(30,20)$ tối ưu với $z^*=120$ (Bài tập 07.11). Khẳng định đúng khi nghiệm không suy biến, theo Mệnh đề 07.33(c).
8. Đúng, theo Định lý 07.38; thuật toán dừng ở cơ sở tối ưu hoặc ở một hướng chứng tỏ bài toán không bị chặn.

**Kiểm tra lại.** Câu 3: trong Ví dụ 07.14, ngoài hai đỉnh $(2,0)$, $(0,2)$, mọi điểm $(\lambda\cdot2,(1-\lambda)\cdot2)$ với $\lambda\in(0,1)$ cũng tối ưu.
:::

### Mức tính toán hoặc chứng minh

::: exercise Bài tập 07.17 (Quy hoạch tuyến tính trên đơn hình xác suất)
Cho $P=\{p\in\mathbb R^3\mid p_1+p_2+p_3=1,\ p\ge0\}$ và bài toán cực đại $c^Tp$ trên $P$ với $c\in\mathbb R^3$.

- (a) Viết $P$ ở dạng chuẩn, nêu $m$, $n$; liệt kê mọi nghiệm cơ sở khả thi.
- (b) Chứng minh bằng Định lý 07.15 rằng $(\tfrac12,\tfrac12,0)$ không phải điểm cực biên.
- (c) Chứng minh $z^*=\max_jc_j$ bằng Hệ quả 07.24.
- (d) Với $c=(1,1,0)$, xác định kết cục và tập nghiệm tối ưu.
- (e) Chứng minh trực tiếp, không dùng Định lý 07.15, rằng $(1,0,0)$ là điểm cực biên của $P$; chỉ ra bước lập luận dùng tính độc lập của cột ứng với thành phần dương, tức chiều (iii) kéo theo (i) của định lý.
:::

::: hint
Ma trận ràng buộc là hàng $(1,1,1)$, nên $m=1$ và mỗi cơ sở gồm một cột.
:::

::: solution
**Câu (a).** $A=(1,1,1)$, $b=1$, $m=1$, $n=3$, $\operatorname{rank}(A)=1$. Mỗi cơ sở là một chỉ số $j$, với $A_B=(1)$ khả nghịch và $p_j=1$, hai thành phần còn lại bằng $0$. Ba nghiệm cơ sở khả thi là $(1,0,0)$, $(0,1,0)$, $(0,0,1)$, không suy biến.

**Câu (b).** $\operatorname{supp}(p)=\{1,2\}$ và hai cột $(1)$, $(1)$ của $A$ phụ thuộc tuyến tính, nên theo khẳng định (iii) của Định lý 07.15, điểm không phải điểm cực biên. Trực tiếp: $(\tfrac12,\tfrac12,0)=\tfrac12(1,0,0)+\tfrac12(0,1,0)$.

**Câu (c).** $P$ khác rỗng, bị chặn ($0\le p_j\le1$), dạng chuẩn nên có điểm cực biên (Hệ quả 07.21), và $c^Tp\le\sum_j\lvert c_j\rvert$ nên giá trị hữu hạn. Theo Hệ quả 07.24, $z^*$ là giá trị lớn nhất của $c^Tp$ trên ba nghiệm cơ sở khả thi, tức $\max\{c_1,c_2,c_3\}$.

**Câu (d).** $z^*=1$, đạt tại $(1,0,0)$ và $(0,1,0)$; theo Mệnh đề 07.22, tập nghiệm tối ưu là đoạn $\{(\lambda,1-\lambda,0)\mid\lambda\in[0,1]\}$: kết cục nhiều nghiệm tối ưu.

**Câu (e).** Giả sử $(1,0,0)=\lambda p'+(1-\lambda)p''$ với $p',p''\in P$ và $0<\lambda<1$.

- Thành phần thứ hai: $0=\lambda p_2'+(1-\lambda)p_2''$ với $p_2',p_2''\ge0$ và hai hệ số dương, nên $p_2'=p_2''=0$; tương tự $p_3'=p_3''=0$.
- Hiệu $p'-p''$ chỉ có thể khác $0$ ở thành phần thứ nhất, và $A(p'-p'')=0$ cho $1\cdot(p_1'-p_1'')=0$. Cột $A_1=(1)$ khác $0$, tức họ cột trên $\operatorname{supp}=\{1\}$ độc lập, nên $p_1'=p_1''$.

Vậy $p'=p''=(1,0,0)$, và điểm là điểm cực biên. Bước thứ hai là Bước 1 của chứng minh Định lý 07.15 với $m=1$.

**Kiểm tra lại.** Tại $(\tfrac12,\tfrac12,0)$ với $c=(1,1,0)$: $c^Tp=1=z^*$, một nghiệm tối ưu không phải điểm cực biên. Trong học máy, câu (c) nói rằng cực đại một lợi ích kỳ vọng tuyến tính trên các phân phối xác suất đạt được tại một phân phối dồn toàn bộ khối lượng vào một lựa chọn.
:::

### Mức vận dụng vào AI

::: exercise Bài tập 07.18 (Chọn mô hình cho một tổ hợp dưới giới hạn bộ nhớ)
Một hệ thống chọn một số trong bốn mô hình để chạy song song trên một thiết bị có $8$ GB bộ nhớ. Mô hình $j$ chiếm $\omega_j$ GB và mang lại lợi ích $\kappa_j$ về độ chính xác của tổ hợp (số liệu sư phạm, giả thiết lợi ích cộng):

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
Ở (b), giá trị ở giai đoạn cuối chỉ phụ thuộc bộ nhớ còn lại $\xi\in\{0,\ldots,8\}$. Ở (c), một nghiệm đỉnh của quy hoạch tuyến tính có nhiều nhất một thành phần phân số, vì chỉ có một ràng buộc bộ nhớ. Ở (d), xét chi phí của quyết định về mô hình 4: nó có phụ thuộc quyết định về mô hình 3 không.
:::

::: solution
**Câu (a).** $N=4$; $X_k=\{0,1,\ldots,8\}$ là bộ nhớ còn lại trước quyết định về mô hình $k+1$, $X_0=\{8\}$. Điều khiển $u\in\{0,1\}$ (bỏ, chọn), với $u=1$ chỉ cho phép khi $\omega_{k+1}\le\xi$. Chuyển $f_k(\xi,u)=\xi-u\omega_{k+1}$; chi phí $g_k(\xi,u)=-u\kappa_{k+1}$; $g_4=0$. Bốn giả thiết của Định nghĩa 07.46 thỏa:

- hữu hạn: bốn giai đoạn, chín mức bộ nhớ, hai điều khiển;
- tất định: bộ nhớ còn lại sau quyết định được xác định bởi $\xi-u\omega_{k+1}$;
- chi phí cộng: lợi ích của tổ hợp là tổng lợi ích các mô hình được chọn;
- trạng thái đủ: các quyết định sau chỉ cần biết bộ nhớ còn lại.

**Câu (b).** Viết $\Lambda_k(\xi)=-J_k(\xi)$ là lợi ích tối ưu còn lại; (6.3) thành $\Lambda_k(\xi)=\max\{\Lambda_{k+1}(\xi),\ \kappa_{k+1}+\Lambda_{k+1}(\xi-\omega_{k+1})\}$, vế thứ hai chỉ khi $\omega_{k+1}\le\xi$.

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

So với (b): quy hoạch tuyến tính cho cận trên $12{,}5$ của bài toán có lựa chọn trọn vẹn và một nghiệm phân số không dùng được. Làm tròn $x_3$ xuống cho $\{1,2\}$ với lợi ích $11<12$. Khoảng cách này là lý do quy hoạch nguyên cần công cụ riêng.

**Câu (d).** Khi đó, chi phí của quyết định về mô hình 4 là $-4$ nếu mô hình 3 chưa được chọn và $-2$ nếu đã chọn. Hai lịch sử cùng còn $3$ GB trước giai đoạn 3, một có mô hình 3 và một không, có phần tương lai khác nhau, nên bộ nhớ còn lại không còn là trạng thái đủ (Nhận xét 07.47). Mở rộng trạng thái ở giai đoạn 3 thành cặp $(\xi,\iota)$, với $\iota=1$ khi mô hình 3 đã được chọn.

- $\Lambda_3(\xi,0)=4$ và $\Lambda_3(\xi,1)=2$ khi $\xi\ge3$; cả hai bằng $0$ khi $\xi\le2$.
- $\Lambda_2(\xi)=\max\{\Lambda_3(\xi,0),\ 3+\Lambda_3(\xi-2,1)\}$, cho $\Lambda_2(5)=\max\{4,\ 5\}=5$ và $\Lambda_2(1)=0$.
- $\Lambda_1(5)=\max\{\Lambda_2(5),\ 6+\Lambda_2(1)\}=6$ và $\Lambda_1(8)=10$.
- $\Lambda_0(8)=\max\{\Lambda_1(8),\ 5+\Lambda_1(5)\}=\max\{10,\ 11\}$, tức $11$.

Lượt xuôi cho tập $\{1,2\}$, dùng $7$ GB, lợi ích $11$. Khi đó, tập $\{1,3,4\}$ của câu (b) chỉ mang lại $12-2=10$.

**Kiểm tra lại.** Liệt kê các tập không vượt $8$ GB có lợi ích lớn, theo câu (b): $\{1,3,4\}$: $8$ GB, $12$; $\{1,2\}$: $7$ GB, $11$; $\{2,4\}$: $7$ GB, $10$; $\{2,3\}$: $6$ GB, $9$. Lớn nhất là $12$. Với hiệu chỉnh của câu (d), $\{1,3,4\}$ giảm $2$, và lớn nhất là $11$ tại $\{1,2\}$.
:::



## Hướng dẫn đọc thêm và tài liệu tham khảo

- Bertsimas, D. và Tsitsiklis, J. N. (1997), *Introduction to Linear Optimization*, Athena Scientific, viết ở chiều cực tiểu. §1.1–1.4 cho Mục 1; §2.1–2.3 cho Mục 2 và Mục 3.1–3.3; §2.4–2.6 cho Mục 3.4 và Mục 4.1–4.3; §3.1–3.7 cho Mục 4.5 và Mục 5: §3.1 cho Mục 5.1 (Định lý 3.1), §3.2 cho Mục 5.2–5.3 (Định lý 3.3 và các quy tắc chọn), §3.3 cho Mục 5.5 (bảng và đơn hình cải tiến), §3.4 cho Mục 5.4 (quy tắc từ điển, quy tắc Bland), §3.5 cho Mục 5.6, §3.6 cho hình học cột và §3.7 cho Mục 5.7; Chương 8–9 cho các thuật toán thời gian đa thức nêu ở Nhận xét 07.45. Nguồn này không có bản cục bộ, nên chỉ được dẫn theo mục.
- MIT OpenCourseWare 15.093J/6.255J *Optimization Methods* (2009), bài giảng số 2 "The Geometry of LO", trang 9–24: đa diện, điểm cực biên, tồn tại và tối ưu của đỉnh, thuật toán ở mức khái niệm; cho Mục 2–4.
- MIT OpenCourseWare 15.093J/6.255J *Optimization Methods* (2009), bài giảng số 16 "Dynamic Programming", trang 2–9: bài toán cái túi, chọn trạng thái, khung quy hoạch động có nhiễu, phương trình Bellman; cho Mục 6–7 và Bài tập 07.18.
- Boyd, S. và Vandenberghe, L. (2004), *Convex Optimization*, Cambridge University Press. §2.2.4 (tr. 31–32) cho Mục 2.1; §4.3 (tr. 146–151) cho Mục 1–2; §5.1.5 (tr. 219) và §5.2.1 (tr. 224–225) cho đối ngẫu của quy hoạch tuyến tính dạng chuẩn, dùng trong Ví dụ 07.5 và Tình huống 07.2.
- Bertsekas, D. P. (2017), *Dynamic Programming and Optimal Control*, tập I, ấn bản 4, Athena Scientific, chương 1–2: nguyên lý tối ưu, thuật toán quy hoạch động, mở rộng trạng thái, đường đi ngắn nhất; cho Mục 6–7 và Tình huống 07.4.
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. và Stein, C. (2009), *Introduction to Algorithms*, ấn bản 3, MIT Press, §15.3: cấu trúc con tối ưu và bài toán con chồng lặp; cho Mục 7.
- Vanderbei, R. J. (2014), *Linear Programming: Foundations and Extensions*, ấn bản 4, Springer, viết ở chiều cực đại bằng từ điển (dictionary), tức hệ biểu diễn biến cơ sở theo biến ngoài cơ sở. Chương 2 (tr. 11–23): phương pháp đơn hình, khởi tạo bằng bài toán phụ với một biến phụ $x_0$ chung cho mọi ràng buộc (§2.3, tr. 16–18), khác cách dùng $m$ biến nhân tạo của (5.5) và tính không bị chặn (§2.4, tr. 18), cho Mục 5.2–5.3 và 5.6; Chương 3: suy biến và ví dụ quay vòng (§3.1–3.2, tr. 25–28), phương pháp nhiễu và quy tắc thứ tự từ điển (§3.3, tr. 28–30), quy tắc Bland (§3.4, tr. 31–33), định lý cơ bản (§3.5, tr. 33), cho Mục 5.4 và 5.6; Chương 4: bài toán Klee–Minty và tính không bất biến theo đơn vị (§4.4, tr. 41–44), số bước trên bài toán ngẫu nhiên (§4.5, tr. 44–50), cho Mục 5.7 và Bài tập 07.13.
- Kupferschmid, M. (2023), *Introduction to Mathematical Programming*, giấy phép CC BY 4.0. §2.2–2.6 (tr. 57–71): bảng đơn hình và bước xoay, cho Mục 5.5; §2.8.2 (tr. 78–82): phương pháp biến nhân tạo, cho Mục 5.6; §4.2 (tr. 137–145): đơn hình cải tiến; §4.4.1 (tr. 151–152): quy tắc chọn cột xoay; §4.5.3 (tr. 160–163): suy biến trong thực tế; cho Nhận xét 07.36, 07.39, 07.42.
- Nguyễn Bích Vân (2025), bài giảng *Cơ sở toán học cho AI*, Chương 8, phần 3 (phương pháp đơn hình: chi phí rút gọn, điều kiện tối ưu, tính không bị chặn, thuật toán, suy biến) và phần 4 (đơn hình cải tiến, bảng đơn hình, tìm nghiệm cơ sở khả thi ban đầu, hình học cột, hiệu quả), viết ở chiều cực tiểu; Bài tập chương 8, câu 5 là nguồn của bài toán hộp hạt. Cho Mục 5.
- Bellman, R. (1957), *Dynamic Programming*, Princeton University Press: nguyên lý tối ưu và lời nguyền số chiều.
- Klee, V. và Minty, G. J. (1972), "How good is the simplex algorithm?", trong *Inequalities III*, Academic Press, tr. 159–175: Ví dụ 07.25 và Nhận xét 07.45.
- Koenker, R. và Bassett, G. (1978), "Regression quantiles", *Econometrica* 46(1), tr. 33–50: Mục 1.3.
- Rabiner, L. R. (1989), "A tutorial on hidden Markov models and selected applications in speech recognition", *Proceedings of the IEEE* 77(2), tr. 257–286: Tình huống 07.3.
- Sutton, R. S. và Barto, A. G. (2018), *Reinforcement Learning: An Introduction*, ấn bản 2, MIT Press, chương 3–4, 6, 9: hướng mở rộng của Mục 6–7.
- Peyré, G. và Cuturi, M. (2019), "Computational optimal transport", *Foundations and Trends in Machine Learning* 11(5–6), chương 3: mục Ứng dụng.
- Đề cương học phần UET.AI2012: Buổi 7 (Chương 9–10, LLO17–LLO18) và Buổi 8 (Chương 11, phương pháp đơn hình, LLO19–LLO21) cho phạm vi chương; Buổi 9 (Chương 12, bài toán luồng mạng) và Buổi 10 (Chương 13, quy hoạch nguyên) cho các giới hạn và hướng tiếp theo.
- Ghi chú Bài 01, Bài 02, Bài 03 và Bài 06c, với các số hiệu ở mục "Kiến thức tiên quyết", là tiên quyết trực tiếp.
