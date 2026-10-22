# Bài tập Bài 07 — Quy hoạch tuyến tính và quy hoạch động

Bộ bài tập gồm mười ba bài theo bốn mạch nội dung của bài học, ở ba mức: nhận biết, tính toán hoặc chứng minh, và vận dụng vào AI. Bài tập 07.1–07.9 giữ số hiệu, đề bài và lời giải của ghi chú bài giảng Bài 07. Bài tập 07.10–07.12 nằm ở mục "Bài tập củng cố" của [ghi chú bài giảng](material-viewer.html?doc=materials/lec-07/lecture-note.md&deck=lecture-07-quy-hoach-tuyen-tinh-va-dong.html) và không chép lại ở đây. Bài tập 07.13 là bài tập trên trang chiếu về nghiệm cơ sở. Ba bài 07.14–07.16 là bài vận dụng vào AI, chỉ có trong tệp này. Khi một bài trùng bài tập trên trang chiếu, dòng "Trùng trang chiếu" dẫn tới trang đó, và lời giải trong tệp có cùng kết quả với lời giải trên trang.

| Mạch | Mở phần | Bài tập |
| --- | --- | --- |
| 1. Mở đầu | [Mở phần](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/1/1) | — |
| 2. Mô hình hóa quy hoạch tuyến tính | [Mở phần](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/2/1) | 07.1, 07.2 |
| 3. Đa diện và dạng chuẩn | [Mở phần](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/3/1) | 07.3, 07.13, 07.4 |
| 4. Điểm cực biên và bảo đảm tối ưu | [Mở phần](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/4/1) | 07.5, 07.6, 07.7, 07.14, 07.15 |
| 5. Quy hoạch động | [Mở phần](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/5/1) | 07.8, 07.9, 07.16 |
| 6. Tổng kết và chuyển tiếp | [Mở phần](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/6/1) | — |

## Hướng dẫn và ký hiệu

Ký hiệu, giả thiết và số hiệu theo ghi chú bài giảng Bài 07. Biến quyết định là $x\in\mathbb R^n$; bất đẳng thức giữa hai vector hiểu theo từng thành phần. Mỗi mục tiêu ghi rõ cực đại hay cực tiểu. Tên nút của đồ thị viết chữ đứng ($\mathrm s$, $\mathrm A$, …) để phân biệt với ma trận $A$ và tập chỉ số cơ sở $B$. Số thập phân viết với dấu phẩy; khi một vector có thành phần thập phân, các thành phần cách nhau bằng dấu chấm phẩy, như $(1{,}6;\,1{,}2)$.

Bài toán hộp hạt được dùng ở nhiều bài và được nêu lại trong từng bài dùng nó. Dữ kiện gốc: sản lượng hai loại hộp hạt là $x_1$, $x_2$ (nghìn hộp); mỗi nghìn hộp loại 1 và loại 2 đem lợi ích $2$ và $3$ đơn vị, dùng $1$ và $2$ giờ máy; hai loại dùng chung $54$ giờ máy; sản lượng tối đa của loại 1 là $30$, của loại 2 là $20$ nghìn hộp. Mô hình là cực đại $2x_1+3x_2$ dưới các ràng buộc

$$
\begin{aligned}
x_1&\le30,\qquad x_2\le20,\\
x_1+2x_2&\le54,\qquad x_1,x_2\ge0 .
\end{aligned}
$$

Miền khả thi là ngũ giác có năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$; nghiệm tối ưu duy nhất là $(30,12)$ với $z^*=96$.

Lời giải cần nêu kết quả được dùng ở từng bước. Mọi bộ số là số liệu sư phạm tự xây dựng. Viết tắt: chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), bộ xử lý đồ họa (GPU).

## Mô hình hóa quy hoạch tuyến tính

### Bài tập 07.1. Dựng mô hình từ dữ kiện cho bằng lời

Mức độ: tính toán. LLO17; CLO1. Trùng trang chiếu [Bài tập: dựng mô hình phân bổ GPU](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/2/8) và [trang lời giải](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/2/9): câu (a), (b), (d) và phần ràng buộc của câu (c).

::: exercise Bài tập 07.1 (Dựng mô hình từ dữ kiện cho bằng lời)
Hai luồng suy luận dùng chung một GPU trong một giờ. Mỗi nghìn yêu cầu của luồng 1 và luồng 2 mang lại lợi ích $4$ và $5$ đơn vị, và dùng $2$ và $1$ phút GPU. GPU có ngân sách $14$ phút trong giờ đó; luồng 1 nhận tối đa $8$ nghìn yêu cầu, luồng 2 nhận tối đa $6$ nghìn yêu cầu.

- (a) Nêu biến quyết định và đơn vị.
- (b) Viết hàm mục tiêu và chiều tối ưu.
- (c) Viết mọi ràng buộc và miền biến; viết bài toán ở dạng (1.1) với $c$, $A$, $b$ cụ thể.
- (d) Kiểm tra tính khả thi của phương án $(4,6)$ và tính giá trị mục tiêu tại đó.
:::

::: hint Gợi ý Bài tập 07.1
Một nghìn yêu cầu luồng 1 dùng $2$ phút; ràng buộc GPU so sánh tổng số phút với $14$ phút, không phải với $60$ phút của cả giờ.
:::

::: solution Lời giải Bài tập 07.1
**Câu (a).** $x_1$, $x_2$ là số nghìn yêu cầu của luồng 1 và luồng 2 được phục vụ trong giờ đó.

**Câu (b).** Cực đại $4x_1+5x_2$, tính bằng đơn vị lợi ích.

**Câu (c).** Ràng buộc GPU, tính bằng phút: $2x_1+x_2\le14$. Hai giới hạn yêu cầu, tính bằng nghìn yêu cầu: $x_1\le8$, $x_2\le6$. Miền biến: $x_1,x_2\ge0$. Dạng (1.1) có

$$
c=\begin{bmatrix}4\\5\end{bmatrix},\qquad A=\begin{bmatrix}2&1\\1&0\\0&1\end{bmatrix},\qquad b=\begin{bmatrix}14\\8\\6\end{bmatrix}.
$$

**Câu (d).** Phương án $(4,6)$ dùng $2\cdot4+6=14$ phút, đúng bằng ngân sách; $4\le8$ và $6\le6$. Vậy $(4,6)$ khả thi, với hai ràng buộc hoạt động là GPU và giới hạn luồng 2. Giá trị mục tiêu là $4\cdot4+5\cdot6=46$.

**Kiểm tra lại.** Ba lỗi thường gặp: đảo hệ số thành $x_1+2x_2\le14$, dùng $60$ phút thay cho ngân sách $14$ phút, và quên miền biến. Với $Ax$ tại $(4,6)$: $(14,4,6)\le(14,8,6)$. Câu hỏi chỉ yêu cầu kiểm tra khả thi; kết luận $(4,6)$ có tối ưu hay không cần công cụ của Mục 4 (Bài tập 07.6 làm việc đó trên một đa giác khác).
:::

### Bài tập 07.2. Mô hình hằng với mất mát $L_1$

Mức độ: tính toán. LLO17; CLO1.

::: exercise Bài tập 07.2 (Mô hình hằng với mất mát $L_1$)
Ba mẫu có giá trị đích $y_1=0$, $y_2=2$, $y_3=6$; mô hình hằng dự đoán cùng một số $x\in\mathbb R$ cho mọi mẫu, tức $h_i=1$.

- (a) Viết bài toán cực tiểu $\sum_i|x-y_i|$ thành quy hoạch tuyến tính dạng (1.2); nêu số biến và số ràng buộc.
- (b) Tìm nghiệm và giá trị tối ưu.
- (c) Tìm nghiệm của bình phương nhỏ nhất $\sum_i(x-y_i)^2$, so với (b), và xác định mẫu làm nghiệm đó lệch khỏi trung vị nhiều nhất.
:::

::: hint Gợi ý Bài tập 07.2
Ở (b), viết hàm $\sum_i|x-y_i|$ trên từng khoảng $(-\infty,0]$, $[0,2]$, $[2,6]$, $[6,\infty)$ và xét độ dốc.
:::

::: solution Lời giải Bài tập 07.2
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

## Đa diện và dạng chuẩn

### Bài tập 07.3. Đưa về dạng chuẩn khi có ràng buộc $\ge$ và biến tự do

Mức độ: tính toán. LLO18; CLO1.

::: exercise Bài tập 07.3 (Đưa về dạng chuẩn khi có ràng buộc $\ge$ và biến tự do)
Xét bài toán cực đại $3x_1+x_2$ dưới các ràng buộc $x_1-x_2\ge2$, $x_1+x_2\le6$, $x_1\ge0$, còn $x_2$ là biến tự do.

- (a) Viết bài toán ở dạng chuẩn (2.2), nêu ma trận, vế phải và số biến.
- (b) Kiểm tra tính khả thi của phương án $(x_1,x_2)=(4,-1)$ và viết một điểm của dạng chuẩn ứng với nó.
- (c) Chỉ ra hai điểm khác nhau của dạng chuẩn cùng ứng với $(4,-1)$.
:::

::: hint Gợi ý Bài tập 07.3
Ràng buộc $\ge$ nhận một biến dư $e_1\ge0$ với dấu trừ; biến tự do $x_2$ thay bằng $x_2^+-x_2^-$.
:::

::: solution Lời giải Bài tập 07.3
**Câu (a).** Biến của dạng chuẩn là $(x_1,x_2^+,x_2^-,e_1,s_2)\in\mathbb R^5$, mọi biến không âm. Hai phương trình là $x_1-x_2^++x_2^--e_1=2$ và $x_1+x_2^+-x_2^-+s_2=6$; mục tiêu là cực đại $3x_1+x_2^+-x_2^-$. Ma trận và vế phải

$$
A=\begin{bmatrix}1&-1&1&-1&0\\1&1&-1&0&1\end{bmatrix},\qquad b=\begin{bmatrix}2\\6\end{bmatrix},
$$

có hai hàng độc lập (hai cột cuối là $(-1,0)^T$ và $(0,1)^T$), nên $\operatorname{rank}(A)=2=m$ và $n=5$.

**Câu (b).** $4-(-1)=5\ge2$ và $4+(-1)=3\le6$, nên khả thi. Với $x_2^+=0$, $x_2^-=1$: $e_1=5-2=3$ và $s_2=6-3=3$, cho điểm $(4,0,1,3,3)$.

**Câu (c).** Điểm $(4,0,1,3,3)$ và điểm $(4,2,3,3,3)$ đều thỏa hai phương trình và cùng cho $x_2=x_2^+-x_2^-=-1$.

**Kiểm tra lại.** Tại $(4,2,3,3,3)$: $4-2+3-3=2$ và $4+2-3+3=6$; mục tiêu $12+2-3=11=3\cdot4+(-1)$.
:::

### Bài tập 07.13. Nghiệm cơ sở của bài toán hộp hạt

Mức độ: nhận biết. LLO18; CLO1. Trùng trang chiếu [Bài tập: nghiệm cơ sở của bài toán hộp hạt](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/3/8) và [trang lời giải](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/3/9). Hai cơ sở của bài là hai dòng trong bảng mười cơ sở của Bài tập 07.4.

::: exercise Bài tập 07.13 (Nghiệm cơ sở của bài toán hộp hạt)
Bài toán hộp hạt: cực đại $2x_1+3x_2$ dưới $x_1\le30$, $x_2\le20$ (sản lượng tối đa, nghìn hộp), $x_1+2x_2\le54$ (giờ máy), $x_1,x_2\ge0$. Mỗi giới hạn nhận một biến bù, cho hệ dạng chuẩn với thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$:

$$
\begin{aligned}
x_1+s_1&=30,\\
x_2+s_2&=20,\\
x_1+2x_2+s_3&=54,\\
x_1,x_2,s_1,s_2,s_3&\ge0 .
\end{aligned}
$$

Chỉ số cột: $1,2$ là $x_1,x_2$; $3,4,5$ là $s_1,s_2,s_3$. Gọi $\bar A$ là ma trận hệ số $3\times5$ của hệ này; với tập chỉ số $B$, ma trận $A_B$ gồm các cột của $\bar A$ có chỉ số thuộc $B$.

1. Với $B=\{1,2,4\}$: viết $A_B$, tính $\det(A_B)$ và $x_B$; xác định điểm $(x_1,x_2)$.
2. Với $B=\{1,2,5\}$: tính $x_B$ và giải thích vì sao nghiệm này không khả thi.
:::

::: hint Gợi ý Bài tập 07.13
Với mỗi $B$, đặt hai biến ngoài cơ sở bằng $0$ rồi giải ba phương trình theo thứ tự thuận tiện. Định thức chỉ kiểm tra hệ có nghiệm duy nhất; dấu của $x_B$ quyết định tính khả thi.
:::

::: solution Lời giải Bài tập 07.13
**Câu 1.** $A_B$ gồm các cột $x_1,x_2,s_2$:

$$
A_B=\begin{bmatrix}1&0&0\\0&1&1\\1&2&0\end{bmatrix},\qquad \det(A_B)=1\cdot(1\cdot0-1\cdot2)=-2\ne0,
$$

khai triển theo hàng đầu. Đặt $s_1=s_3=0$: phương trình thứ nhất cho $x_1=30$, phương trình thứ ba cho $30+2x_2=54$, tức $x_2=12$, phương trình thứ hai cho $s_2=20-12=8$. Vậy $x_B=(x_1,x_2,s_2)=(30,12,8)\ge0$. Ba biến cơ sở đều dương, nên đây là nghiệm cơ sở khả thi không suy biến, ứng với đỉnh $(30,12)$.

**Câu 2.** $A_B$ gồm các cột $x_1,x_2,s_3$:

$$
A_B=\begin{bmatrix}1&0&0\\0&1&0\\1&2&1\end{bmatrix},\qquad \det(A_B)=1,
$$

vì $A_B$ là ma trận tam giác dưới. Đặt $s_1=s_2=0$: $x_1=30$, $x_2=20$, $s_3=54-70=-16<0$. Đây là nghiệm cơ sở nhưng không khả thi. Điểm $(30,20)$ là giao của hai đường $x_1=30$ và $x_2=20$, nằm ngoài miền vì vượt $16$ giờ máy.

Về hình học, mỗi nghiệm cơ sở của hệ này là giao của hai đường biên, và chỉ những giao điểm nằm trong ngũ giác mới là đỉnh.

**Kiểm tra lại.** Tại $(30,12,0,8,0)$: $30+0=30$, $12+8=20$, $30+24+0=54$.
:::

### Bài tập 07.4. Mười cách chọn cơ sở của bài toán hộp hạt

Mức độ: tính toán. LLO18; CLO1.

::: exercise Bài tập 07.4 (Mười cách chọn cơ sở của bài toán hộp hạt)
Hệ dạng chuẩn của bài toán hộp hạt, thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$: $x_1+s_1=30$, $x_2+s_2=20$, $x_1+2x_2+s_3=54$, mọi biến không âm.

- (a) Liệt kê mười tập $B$ có ba phần tử. Với mỗi tập, xác định $A_B$ có khả nghịch không; nếu có, tính nghiệm cơ sở.
- (b) Xác định các nghiệm cơ sở khả thi và điểm $(x_1,x_2)$ tương ứng. Đối chiếu với năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$.
- (c) Giải thích bằng hình vì sao hai tập không khả nghịch.
- (d) Trong các nghiệm cơ sở khả thi, nghiệm nào suy biến.
:::

::: hint Gợi ý Bài tập 07.4
Một tập $B$ cho nghiệm cơ sở bằng cách đặt hai biến ngoài $B$ bằng $0$; hai biến đó ứng với hai đường biên, và nghiệm là giao điểm của hai đường.
:::

::: solution Lời giải Bài tập 07.4
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

**Câu (d).** Không nghiệm nào suy biến: ở cả năm nghiệm cơ sở khả thi, ba biến cơ sở đều dương, chẳng hạn $(14,20,16)$ tại đỉnh $(14,20)$ và $(30,20,54)$ tại $(0,0)$. Về hình học, mỗi đỉnh của ngũ giác có đúng hai ràng buộc hoạt động.

**Kiểm tra lại.** Tại $(14,20,16,0,0)$: $14+16=30$, $20+0=20$, $14+40+0=54$. Tại $(0,27,30,-7,0)$: $27-7=20$ và $54+0=54$.
:::

## Điểm cực biên và bảo đảm tối ưu

### Bài tập 07.5. Dải phẳng và điểm cực biên

Mức độ: chứng minh. LLO18; CLO1.

::: exercise Bài tập 07.5 (Dải phẳng và điểm cực biên)
Cho $P_2=\{x\in\mathbb R^2\mid -x_1+x_2\le1,\ x_1-x_2\le1\}$.

- (a) Chứng minh $P_2$ chứa một đường thẳng và không có điểm cực biên, bằng khẳng định (ii) và (iii) của Định lý 07.20.
- (b) Thêm ràng buộc $x_1\ge0$, được $P_3$. Xác định mọi điểm cực biên của $P_3$ bằng Định lý 07.13.
:::

::: hint Gợi ý Bài tập 07.5
Ở (a), tìm $d\ne0$ với $-d_1+d_2=0$ và $d_1-d_2=0$. Ở (b), xét ba cặp hàng của $P_3$.
:::

::: solution Lời giải Bài tập 07.5
**Câu (a).** Ma trận có hai hàng $(-1,1)$ và $(1,-1)$, hạng $1<2$. Hướng $d=(1,1)$ thỏa $Ad=0$, nên $(0,0)+\theta(1,1)\in P_2$ với mọi $\theta$. Theo Định lý 07.20, $P_2$ không có điểm cực biên.

**Câu (b).** $P_3$ có ba hàng: (1) $-x_1+x_2\le1$, (2) $x_1-x_2\le1$, (3) $-x_1\le0$.

- Cặp (1), (2): hai hàng song song, không có giao điểm duy nhất.
- Cặp (1), (3): $x_1=0$, $x_2=1$; kiểm tra (2): $0-1=-1\le1$. Điểm $(0,1)$ là điểm cực biên.
- Cặp (2), (3): $x_1=0$, $x_2=-1$; kiểm tra (1): $0-1=-1\le1$. Điểm $(0,-1)$ là điểm cực biên.

**Kiểm tra lại.** Tại $(0,1)$: hàng (1) cho $-0+1=1$ và hàng (3) cho $0$, cả hai hoạt động; hai hàng $(-1,1)$, $(-1,0)$ độc lập. Tại $(0,-1)$: hàng (2) cho $0+1=1$, hàng (3) hoạt động; hai hàng $(1,-1)$, $(-1,0)$ độc lập.
:::

### Bài tập 07.6. Điểm cực biên và đỉnh kề trên một đa giác mới

Mức độ: tính toán. LLO18; CLO1. Câu (a)–(d) trùng trang chiếu [Bài tập: điểm cực biên và đỉnh kề trên đa giác mới](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/4/14); đáp án của trang nằm trong ghi chú diễn giả của trang đó. Câu (e) chỉ có trong ghi chú bài giảng.

::: exercise Bài tập 07.6 (Điểm cực biên và đỉnh kề trên một đa giác mới)
Xét bài toán cực đại $x_1+x_2$ dưới $x_1+2x_2\le4$, $3x_1+x_2\le6$, $x_1,x_2\ge0$.

- (a) Vẽ miền khả thi và xác định bốn đỉnh bằng tiêu chuẩn hạng.
- (b) Tính giá trị mục tiêu tại các đỉnh; xác định kết cục và nghiệm tối ưu.
- (c) Từ $(0,0)$, viết một đường đi qua đỉnh kề có giá trị tăng chặt và nêu lý do dừng.
- (d) Nêu định lý bảo đảm có điểm cực biên tối ưu và kiểm tra từng giả thiết.
- (e) Viết dạng chuẩn với biến bù $s_1$, $s_2$; tại $(1{,}6;\,1{,}2)$ với cơ sở $\{x_1,x_2\}$, tính hai chi phí rút gọn $\bar c_{s_1}$, $\bar c_{s_2}$ theo (4.1)–(4.2) và kết luận bằng Mệnh đề 07.31.
:::

::: hint Gợi ý Bài tập 07.6
Đường $x_1+2x_2=4$ cắt hai trục tại $(4,0)$, $(0,2)$; đường $3x_1+x_2=6$ cắt hai trục tại $(2,0)$, $(0,6)$. Trên mỗi trục, ràng buộc hạn chế hơn cho đỉnh.
:::

::: solution Lời giải Bài tập 07.6
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

**Câu (e).** Dạng chuẩn: $x_1+2x_2+s_1=4$, $3x_1+x_2+s_2=6$, mọi biến không âm, mục tiêu $x_1+x_2$. Tại $(1{,}6;\,1{,}2;\,0;\,0)$, $A_B=\begin{bmatrix}1&2\\3&1\end{bmatrix}$ có định thức $1-6=-5$.

- Hướng $d^{s_1}$: giải $A_Bd_B=-(1,0)^T$, tức $d_1+2d_2=-1$, $3d_1+d_2=0$, được $d_B=(\tfrac15,-\tfrac35)$; $\bar c_{s_1}=\tfrac15-\tfrac35=-\tfrac25$.
- Hướng $d^{s_2}$: giải $A_Bd_B=-(0,1)^T$, tức $d_1+2d_2=0$, $3d_1+d_2=-1$, được $d_B=(-\tfrac25,\tfrac15)$; $\bar c_{s_2}=-\tfrac25+\tfrac15=-\tfrac15$.

Hai chi phí rút gọn âm, nên theo Mệnh đề 07.31(b) điểm tối ưu; $-\bar c_{s_1}=\tfrac25$ và $-\bar c_{s_2}=\tfrac15$ là hai hệ số nhân $\mu_1$, $\mu_2$ ở câu (b).

**Kiểm tra lại.** Tại $(1{,}6;\,1{,}2)$: $1{,}6+2{,}4=4$ và $4{,}8+1{,}2=6$. Hai hệ số: $\tfrac25+\tfrac35=1$ và $\tfrac45+\tfrac15=1$. Hướng $d^{s_1}=(\tfrac15,-\tfrac35,1,0)$ thỏa $\tfrac15-\tfrac65+1=0$ và $\tfrac35-\tfrac35=0$.
:::

### Bài tập 07.7. Đổi lợi ích của bài toán hộp hạt

Mức độ: tính toán, bài tổng hợp. LLO18; CLO1. Trùng trang chiếu [Bài tập: bài toán hộp hạt với lợi ích mới](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/4/15) và [trang lời giải](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/4/16); trang lời giải chạy đường thứ nhất của câu (c) và nêu đường thứ hai trong ghi chú diễn giả.

::: exercise Bài tập 07.7 (Bài tập tổng hợp: đổi lợi ích của bài toán hộp hạt)
Miền khả thi $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$, với năm đỉnh $(0,0)$, $(30,0)$, $(30,12)$, $(14,20)$, $(0,20)$. Mục tiêu mới: cực đại $2x_1+4x_2$.

- (a) Tính $z$ tại năm đỉnh; xác định kết cục và tập nghiệm tối ưu.
- (b) Nêu định lý bảo đảm có điểm cực biên tối ưu và kiểm tra giả thiết.
- (c) Chạy Thuật toán 07.1 từ $(0,0)$ theo hai đường khác nhau; xác định đỉnh dừng của mỗi đường.
:::

::: hint Gợi ý Bài tập 07.7
So sánh vector $(2,4)$ với hàng $(1,2)$ của ràng buộc giờ máy. Ở câu (c), tiêu chuẩn dừng dùng bất đẳng thức chặt.
:::

::: solution Lời giải Bài tập 07.7
**Câu (a).** Giá trị tại năm đỉnh: $0$; $2\cdot30=60$; $2\cdot30+4\cdot12=108$; $2\cdot14+4\cdot20=108$; $4\cdot20=80$. Vì $2x_1+4x_2=2(x_1+2x_2)\le2\cdot54=108$, đường mức song song với ràng buộc giờ máy, và giá trị tối ưu $108$ đạt trên cả cạnh nối $(30,12)$ và $(14,20)$. Trên đường $x_1+2x_2=54$, điều kiện $x_2\le20$ cho $x_1\ge14$ và $x_1\le30$, nên tập nghiệm tối ưu là $\{x\mid x_1+2x_2=54,\ 14\le x_1\le30\}$: kết cục nhiều nghiệm tối ưu.

**Câu (b).** Định lý 07.23: miền khác rỗng, có điểm cực biên (hạng $2$), bị chặn nên $z\le2\cdot30+4\cdot20=140$; cả hai giả thiết thỏa.

**Câu (c).**

- Đường thứ nhất: $(0,0)\to(30,0)\to(30,12)$ với $z$: $0\to60\to108$. Tại $(30,12)$, đỉnh kề $(14,20)$ cũng cho $108$, không lớn hơn chặt, nên thuật toán dừng tại $(30,12)$.
- Đường thứ hai: $(0,0)\to(0,20)\to(14,20)$ với $z$: $0\to80\to108$. Tại $(14,20)$, đỉnh kề $(30,12)$ không có giá trị lớn hơn chặt, nên thuật toán dừng tại $(14,20)$.

Hai đỉnh dừng khác nhau cho cùng giá trị tối ưu. Thuật toán trả về một điểm cực biên tối ưu, không trả về cả cạnh; bất đẳng thức chặt ngăn thuật toán dao động giữa hai đỉnh cùng giá trị $108$.

**Kiểm tra lại.** Trung điểm $(22,16)$ của cạnh tối ưu: $22+32=54$, $z=44+64=108$, và $16\le20$.
:::

### Bài tập 07.14. Trọng số trộn dữ liệu và điểm cực biên

Mức độ: nhận biết (câu (a)–(c)) và tính toán (câu (d)), vận dụng vào AI. LLO18; CLO1. Bài dùng Định lý 07.15, Hệ quả 07.16 và Hệ quả 07.24.

::: exercise Bài tập 07.14 (Trọng số trộn dữ liệu và điểm cực biên)
Một nhóm huấn luyện mô hình ngôn ngữ trộn ba nguồn dữ liệu: nguồn 1 là văn bản web đã lọc, nguồn 2 là sách và bài báo khoa học, nguồn 3 là dữ liệu tổng hợp do một mô hình khác sinh ra. Trọng số $p_j$ là tỉ lệ của nguồn $j$ trong tập huấn luyện, với $p_j\ge0$ và $p_1+p_2+p_3=1$. Dữ liệu tổng hợp chiếm không quá $0{,}2$, tức $p_3\le0{,}2$. Thêm biến bù $s\ge0$ cho giới hạn này, được hệ dạng chuẩn với biến $(p_1,p_2,p_3,s)$:

$$
\begin{aligned}
p_1+p_2+p_3&=1,\\
p_3+s&=0{,}2,\\
p_1,p_2,p_3,s&\ge0 .
\end{aligned}
$$

- (a) Viết ma trận $A$, vế phải $b$, nêu $m$, $n$ và kiểm tra $\operatorname{rank}(A)=m$.
- (b) Với mỗi điểm $q^{(1)}=(0{,}8;\,0;\,0{,}2;\,0)$, $q^{(2)}=(0{,}5;\,0{,}5;\,0;\,0{,}2)$, $q^{(3)}=(1;\,0;\,0;\,0{,}2)$, kiểm tra tính khả thi, rồi xác định điểm đó có là điểm cực biên hay không bằng khẳng định (iii) của Định lý 07.15. Với điểm không phải điểm cực biên, viết nó thành trung điểm của hai điểm khả thi khác nhau.
- (c) Tính nghiệm cơ sở ứng với cơ sở gồm hai biến $p_3$, $s$, và giải thích vì sao nó không khả thi.
- (d) Liệt kê mọi nghiệm cơ sở khả thi. Giả sử điểm đánh giá của mô hình sau huấn luyện xấp xỉ tuyến tính theo trọng số, bằng $3p_1+4p_2+6p_3$ (số liệu sư phạm). Dùng Hệ quả 07.24 để tìm trọng số trộn tối ưu.
:::

::: hint Gợi ý Bài tập 07.14
Cột của $A$ là $A_1=A_2=(1,0)^T$, $A_3=(1,1)^T$, $A_4=(0,1)^T$. Ở (b), ba vector trong $\mathbb R^2$ luôn phụ thuộc tuyến tính. Ở (d), có $\binom42=6$ cách chọn cơ sở.
:::

::: solution Lời giải Bài tập 07.14
**Câu (a).**

$$
A=\begin{bmatrix}1&1&1&0\\0&0&1&1\end{bmatrix},\qquad b=\begin{bmatrix}1\\0{,}2\end{bmatrix},
$$

với $m=2$ phương trình và $n=4$ biến. Hai cột $A_3=(1,1)^T$ và $A_4=(0,1)^T$ có định thức $1\cdot1-0\cdot1=1\ne0$, nên $\operatorname{rank}(A)=2=m$.

**Câu (b).**

- $q^{(1)}$: $0{,}8+0+0{,}2=1$ và $0{,}2+0=0{,}2$, khả thi. $\operatorname{supp}(q^{(1)})=\{1,3\}$; hai cột $A_1=(1,0)^T$, $A_3=(1,1)^T$ có định thức $1\ne0$, nên độc lập. Theo Định lý 07.15, $q^{(1)}$ là điểm cực biên, và là nghiệm cơ sở khả thi của cơ sở $\{p_1,p_3\}$.
- $q^{(2)}$: $0{,}5+0{,}5+0=1$ và $0+0{,}2=0{,}2$, khả thi. $\operatorname{supp}(q^{(2)})=\{1,2,4\}$ gồm ba cột trong $\mathbb R^2$, phụ thuộc tuyến tính (ở đây $A_1=A_2$). Vậy $q^{(2)}$ không phải điểm cực biên; cũng theo Hệ quả 07.16, nó có ba thành phần dương, nhiều hơn $m=2$. Cụ thể, $q^{(2)}=\tfrac12(1;\,0;\,0;\,0{,}2)+\tfrac12(0;\,1;\,0;\,0{,}2)$, và hai điểm này đều khả thi.
- $q^{(3)}$: $1+0+0=1$ và $0+0{,}2=0{,}2$, khả thi. $\operatorname{supp}(q^{(3)})=\{1,4\}$; hai cột $A_1=(1,0)^T$, $A_4=(0,1)^T$ độc lập. Vậy $q^{(3)}$ là điểm cực biên.

**Câu (c).** Đặt $p_1=p_2=0$. Phương trình thứ nhất cho $p_3=1$, phương trình thứ hai cho $s=0{,}2-1=-0{,}8<0$. Ma trận $A_B=\begin{bmatrix}1&0\\1&1\end{bmatrix}$ có định thức $1$, nên đây là nghiệm cơ sở, nhưng không khả thi: tập huấn luyện chỉ gồm dữ liệu tổng hợp vượt giới hạn $0{,}2$.

**Câu (d).** Mọi định thức khác $0$ dưới đây đều bằng $1$.

| Cơ sở | $\det(A_B)$ | Nghiệm cơ sở $(p_1,p_2,p_3,s)$ | Khả thi | $3p_1+4p_2+6p_3$ |
|---|---:|---|---|---:|
| $p_1,p_2$ | $0$ | không có | | |
| $p_1,p_3$ | $1$ | $(0{,}8;\,0;\,0{,}2;\,0)$ | có | $3{,}6$ |
| $p_1,s$ | $1$ | $(1;\,0;\,0;\,0{,}2)$ | có | $3$ |
| $p_2,p_3$ | $1$ | $(0;\,0{,}8;\,0{,}2;\,0)$ | có | $4{,}4$ |
| $p_2,s$ | $1$ | $(0;\,1;\,0;\,0{,}2)$ | có | $4$ |
| $p_3,s$ | $1$ | $(0;\,0;\,1;\,-0{,}8)$ | không | |

Giả thiết của Hệ quả 07.24 thỏa: bài toán ở dạng chuẩn với $\operatorname{rank}(A)=2$, khả thi (chứa $q^{(1)}$), và bị chặn vì $0\le p_j\le1$, $0\le s\le0{,}2$, nên giá trị tối ưu hữu hạn. Do đó $z^*=4{,}4$, đạt tại $p=(0;\,0{,}8;\,0{,}2)$: dùng hết giới hạn dữ liệu tổng hợp, phần còn lại dành cho nguồn 2, không dùng nguồn 1.

Kết luận này phụ thuộc giả thiết điểm đánh giá tuyến tính theo trọng số. Khi lợi ích của mỗi nguồn giảm dần theo tỉ lệ của nó, mục tiêu không còn tuyến tính và Hệ quả 07.24 không áp dụng. Nghiệm tối ưu có hai thành phần dương, bằng $m$, đúng với Hệ quả 07.16; với $100$ nguồn và cùng hai phương trình, một nghiệm đỉnh vẫn có nhiều nhất hai thành phần dương, tính cả biến bù.

**Kiểm tra lại.** Cận trực tiếp: $3p_1+4p_2+6p_3\le4(p_1+p_2+p_3)+2p_3\le4+2\cdot0{,}2=4{,}4$, dùng $3p_1\le4p_1$ và $p_3\le0{,}2$. Dấu bằng cần $p_1=0$ và $p_3=0{,}2$, tức đúng điểm $(0;\,0{,}8;\,0{,}2)$.
:::

### Bài tập 07.15. Phân bổ giờ gán nhãn dữ liệu

Mức độ: tính toán, vận dụng vào AI. LLO17, LLO18; CLO1. Bài dùng Định lý 07.13 (tiêu chuẩn hạng) và cách chứng nhận cận trên bằng tổ hợp không âm của Ví dụ 07.5.

::: exercise Bài tập 07.15 (Phân bổ giờ gán nhãn dữ liệu)
Một nhóm chuẩn bị dữ liệu huấn luyện cho một mô hình phân loại ảnh thuê hai hình thức gán nhãn trong một tuần: chuyên gia và cộng tác viên. Nhãn dùng được là nhãn đã qua khâu kiểm duyệt. Năng lực kiểm duyệt chỉ đủ cho nhãn của tối đa $12$ giờ cộng tác viên; chuyên gia nhận tối đa $8$ giờ.

| Dữ kiện | Chuyên gia | Cộng tác viên | Giới hạn chung |
|---|---:|---:|---:|
| Nhãn dùng được mỗi giờ | $40$ | $50$ | |
| Chi phí mỗi giờ (trăm nghìn đồng) | $4$ | $2$ | $40$ |
| Số giờ tối đa | $8$ | $12$ | |

- (a) Nêu biến quyết định và đơn vị, hàm mục tiêu, các ràng buộc và miền biến; viết bài toán ở dạng (1.1) với $c$, $A$, $b$ cụ thể.
- (b) Xác định năm đỉnh của miền khả thi bằng tiêu chuẩn hạng của Định lý 07.13, nêu các ràng buộc hoạt động tại mỗi đỉnh, và tính số nhãn dùng được tại mỗi đỉnh.
- (c) Tìm các hệ số không âm như ở Ví dụ 07.5 để chứng minh một cận trên của số nhãn; chứng minh nghiệm tối ưu là duy nhất.
- (d) Ngân sách tăng từ $40$ lên $42$. Dùng cùng các hệ số để tính cận trên mới, rồi tìm điểm khả thi đạt cận đó.
:::

::: hint Gợi ý Bài tập 07.15
Ở (b), đường ngân sách $4x_1+2x_2=40$ cắt hai trục tại $(10,0)$ và $(0,20)$; mỗi giao điểm này vi phạm một giới hạn số giờ. Ở (c), viết $40x_1+50x_2=\mu_1(4x_1+2x_2)+\mu_3x_2$ với chỉ số hệ số theo hàng của $A$, rồi so hệ số của $x_1$ trước.
:::

::: solution Lời giải Bài tập 07.15
**Câu (a).** $x_1$, $x_2$ là số giờ thuê chuyên gia và cộng tác viên trong tuần (giờ). Mục tiêu: cực đại số nhãn dùng được $40x_1+50x_2$. Ràng buộc:

- ngân sách, tính bằng trăm nghìn đồng: $4x_1+2x_2\le40$;
- số giờ tối đa, tính bằng giờ: $x_1\le8$, $x_2\le12$;
- miền biến: $x_1,x_2\ge0$.

Dạng (1.1) có

$$
c=\begin{bmatrix}40\\50\end{bmatrix},\qquad A=\begin{bmatrix}4&2\\1&0\\0&1\end{bmatrix},\qquad b=\begin{bmatrix}40\\8\\12\end{bmatrix}.
$$

**Câu (b).** Miền có năm đường biên: $4x_1+2x_2=40$, $x_1=8$, $x_2=12$, $x_1=0$, $x_2=0$. Trong mười cặp đường, hai cặp song song ($x_1=0$ với $x_1=8$, $x_2=0$ với $x_2=12$). Tám cặp còn lại có hai hàng độc lập, nên mỗi cặp cho đúng một giao điểm; theo Định lý 07.13, giao điểm là đỉnh khi và chỉ khi nó khả thi.

| Đỉnh | Ràng buộc hoạt động | Số nhãn $40x_1+50x_2$ |
|---|---|---:|
| $(0,0)$ | $x_1=0$, $x_2=0$ | $0$ |
| $(8,0)$ | $x_1=8$, $x_2=0$ | $320$ |
| $(8,4)$ | $x_1=8$, ngân sách | $320+200=520$ |
| $(4,12)$ | ngân sách, $x_2=12$ | $160+600=760$ |
| $(0,12)$ | $x_1=0$, $x_2=12$ | $600$ |

Ba giao điểm còn lại không khả thi: $(10,0)$ vi phạm $x_1\le8$, $(0,20)$ vi phạm $x_2\le12$, và $(8,12)$ dùng $32+24=56>40$ trăm nghìn đồng.

**Câu (c).** So hệ số trong $40x_1+50x_2=\mu_1(4x_1+2x_2)+\mu_3x_2$:

- hệ số của $x_1$: $4\mu_1=40$, nên $\mu_1=10$;
- hệ số của $x_2$: $2\mu_1+\mu_3=50$, nên $\mu_3=30$.

Hai hệ số không âm, nên với mọi phương án khả thi

$$
\begin{aligned}
40x_1+50x_2&=10(4x_1+2x_2)+30x_2\\
&\le10\cdot40+30\cdot12\\
&=760 .
\end{aligned}
$$

Vì $\mu_1>0$ và $\mu_3>0$, dấu bằng xảy ra khi và chỉ khi $4x_1+2x_2=40$ và $x_2=12$, tức $x=(4,12)$. Điểm này khả thi ($4\le8$), nên nó là nghiệm tối ưu duy nhất với $z^*=760$: thuê $4$ giờ chuyên gia và $12$ giờ cộng tác viên.

**Câu (d).** Các hệ số $\mu_1=10$, $\mu_3=30$ chỉ phụ thuộc $c$ và các hàng của $A$, nên vẫn dùng được. Cận mới là $10\cdot42+30\cdot12=780$. Dấu bằng cần $4x_1+2x_2=42$ và $x_2=12$, tức $x_1=4{,}5\le8$; điểm $(4{,}5;\,12)$ khả thi và cho $40\cdot4{,}5+50\cdot12=180+600=780$. Vậy mỗi trăm nghìn đồng ngân sách thêm cho $\mu_1=10$ nhãn dùng được, chừng nào giao điểm của hai ràng buộc hoạt động còn khả thi, tức $0\le x_1=\tfrac{\beta-24}4\le8$ với ngân sách $\beta$, hay $24\le\beta\le56$.

**Kiểm tra lại.** Tại $(4,12)$: $16+24=40$, $4\le8$, $12\le12$. Hệ số $\mu_3=30$ cũng đo giá trị của năng lực kiểm duyệt: nâng giới hạn lên $x_2\le13$ cho giao điểm $4x_1=40-26$, tức $x_1=3{,}5$, và số nhãn $140+650=790=760+30$. Trong bài toán này, nâng năng lực kiểm duyệt thêm một giờ cộng tác viên đem lại $30$ nhãn, bằng mức tăng do ba trăm nghìn đồng ngân sách thêm.
:::

## Quy hoạch động

### Bài tập 07.8. Lịch bước học hai giai đoạn

Mức độ: vận dụng vào AI. Phần bổ trợ, không gắn LLO của đề cương.

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
- (c) Kiểm tra kết quả bằng liệt kê bốn chuỗi.
:::

::: hint Gợi ý Bài tập 07.8
$J_1(\xi)$ cần cho cả ba mức $\xi$, kể cả mức không đi tới được từ mức $3$ sau một giai đoạn.
:::

::: solution Lời giải Bài tập 07.8
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

### Bài tập 07.9. Giải ngược khi hai chi phí thay đổi

Mức độ: tính toán. Phần bổ trợ, không gắn LLO của đề cương. Câu (a)–(d) trùng trang chiếu [Bài tập: giải ngược Bellman với chi phí mới](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/5/9) và [trang lời giải](lecture-07-quy-hoach-tuyen-tinh-va-dong.html#/5/10). Câu (e) chỉ có trong ghi chú bài giảng.

::: exercise Bài tập 07.9 (Giải ngược khi hai chi phí thay đổi)
Đồ thị tầng có cùng cấu trúc với Mục 5 của ghi chú: nút $\mathrm s$ ở tầng 0; $\mathrm A$, $\mathrm B$ ở tầng 1; $\mathrm C$, $\mathrm D$ ở tầng 2; $\mathrm t$ ở tầng 3. Chi phí cạnh: $g(\mathrm s,\mathrm A)=2$, $g(\mathrm s,\mathrm B)=3$, $g(\mathrm A,\mathrm C)=4$, $g(\mathrm A,\mathrm D)=2$, $g(\mathrm B,\mathrm C)=1$, $g(\mathrm B,\mathrm D)=3$, $g(\mathrm C,\mathrm t)=0$, $g(\mathrm D,\mathrm t)=1$.

- (a) Tính $J_2(\mathrm C)$, $J_2(\mathrm D)$.
- (b) Tính $J_1(\mathrm A)$, $J_1(\mathrm B)$; ghi điều khiển đạt cực tiểu.
- (c) Tính $J_0(\mathrm s)$ và dựng đường tối ưu bằng lượt xuôi.
- (d) Kiểm tra trực tiếp tổng chi phí của đường tìm được và của ba đường còn lại.
- (e) Tính $\sum_k\sum_{\xi\in X_k}\lvert U_k(\xi)\rvert$ cho đồ thị này và so với số đường đi. Làm lại cho một đồ thị cùng dạng với $N=10$ giai đoạn: nút $\mathrm s$, chín tầng giữa mỗi tầng hai nút, nút $\mathrm t$, mỗi nút nối với mọi nút của tầng sau; so với $q^N$ khi $q=2$.

![Đồ thị bốn tầng: s ở tầng 0; A, B ở tầng 1; C, D ở tầng 2; t ở tầng 3. Tám chi phí cạnh: s–A 2, s–B 3, A–C 4, A–D 2, B–C 1, B–D 3, C–t 0, D–t 1. Hai cạnh s–B và C–t được tô màu vì chi phí đã đổi.](img/lec-07/dp-layered-graph-new-costs.svg)
:::

::: hint Gợi ý Bài tập 07.9
Hai cạnh tô màu trên hình có chi phí khác với đồ thị của Mục 5, nơi $g(\mathrm s,\mathrm B)=5$ và $g(\mathrm C,\mathrm t)=3$. Bắt đầu từ tầng 2; tại mỗi nút, so sánh chi phí cạnh cộng giá trị $J$ ở nút cuối cạnh, không so sánh riêng chi phí cạnh. Ở (e), dùng Mệnh đề 07.42(a) và đếm riêng tầng cuối, nơi mỗi nút chỉ có một cạnh tới $\mathrm t$.
:::

::: solution Lời giải Bài tập 07.9
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

### Bài tập 07.16. Lập kế hoạch cho tác tử với giới hạn số hành động

Mức độ: vận dụng vào AI. Phần bổ trợ, không gắn LLO của đề cương. Bài dùng Mệnh đề 07.39 (nguyên lý tối ưu), Nhận xét 07.36 (trạng thái đủ) và Định lý 07.38 (phương trình Bellman).

::: exercise Bài tập 07.16 (Lập kế hoạch cho tác tử với giới hạn số hành động)
Một tác tử (agent) lập kế hoạch trong một môi trường đã biết mô hình, như trong học tăng cường dựa trên mô hình. Môi trường có năm trạng thái $\mathrm s$, $\mathrm E$, $\mathrm F$, $\mathrm G$, $\mathrm t$; $\mathrm s$ là trạng thái đầu, $\mathrm t$ là đích. Mỗi hành động đi theo một cạnh có hướng, cho kết quả tất định và tốn một thời gian $g$ (giây):

| Cạnh | $\mathrm s\to\mathrm E$ | $\mathrm s\to\mathrm F$ | $\mathrm E\to\mathrm F$ | $\mathrm E\to\mathrm G$ | $\mathrm F\to\mathrm G$ | $\mathrm F\to\mathrm t$ | $\mathrm G\to\mathrm t$ |
|---|---:|---:|---:|---:|---:|---:|---:|
| Thời gian $g$ | $1$ | $5$ | $2$ | $6$ | $3$ | $7$ | $2$ |

Mọi cạnh đi theo thứ tự $\mathrm s,\mathrm E,\mathrm F,\mathrm G,\mathrm t$, nên đồ thị không có chu trình. Một đường từ $\mathrm s$ tới $\mathrm t$ có thể dùng $2$, $3$ hoặc $4$ hành động, nên các nút không xếp được thành tầng như đồ thị tầng của Mục 5.

- (a) Đặt $J(v)$ là thời gian nhỏ nhất từ nút $v$ tới $\mathrm t$. Chứng minh $J(\mathrm t)=0$ và $J(v)=\min_{(v,w)}\{g(v,w)+J(w)\}$ với $v\ne\mathrm t$, trong đó cực tiểu lấy theo các cạnh đi ra từ $v$. Tính $J$ theo thứ tự $\mathrm G$, $\mathrm F$, $\mathrm E$, $\mathrm s$ và dựng đường tối ưu bằng lượt xuôi.
- (b) Kiểm tra kết quả bằng liệt kê mọi đường từ $\mathrm s$ tới $\mathrm t$.
- (c) Mỗi lượt chạy (episode) chỉ cho phép tối đa ba hành động. Chứng minh nút hiện tại không còn là trạng thái đủ. Mở rộng trạng thái, viết phương trình Bellman cho trạng thái mở rộng, rồi tính thời gian tối ưu từ $\mathrm s$ và đường tối ưu.
- (d) Giả sử kết quả của một hành động là ngẫu nhiên. Xác định giả thiết nào của Định nghĩa 07.35 không còn thỏa và nêu vế phải của phương trình Bellman thay đổi thế nào.
:::

::: hint Gợi ý Bài tập 07.16
Ở (a), mọi đường từ $v\ne\mathrm t$ bắt đầu bằng một cạnh $(v,w)$, phần còn lại là một đường từ $w$. Ở (c), so phần tương lai từ $\mathrm F$ của hai lịch sử $\mathrm s\to\mathrm F$ và $\mathrm s\to\mathrm E\to\mathrm F$; thêm vào trạng thái số hành động còn được dùng.
:::

::: solution Lời giải Bài tập 07.16
**Câu (a).** Tại $\mathrm t$, tác tử đã ở đích, nên $J(\mathrm t)=0$. Với $v\ne\mathrm t$, mọi đường từ $v$ tới $\mathrm t$ gồm một cạnh $(v,w)$ và một đường từ $w$ tới $\mathrm t$. Thời gian của phần sau không phụ thuộc cách đã đi tới $w$, nên phần sau tốt nhất có thời gian $J(w)$, và ghép cạnh $(v,w)$ với phần sau tốt nhất cho thời gian $g(v,w)+J(w)$. Lấy nhỏ nhất theo $w$ được công thức cần chứng minh; đây là lập luận của Mệnh đề 07.39. Vì mọi cạnh đi theo thứ tự $\mathrm s,\mathrm E,\mathrm F,\mathrm G,\mathrm t$, khi tính theo thứ tự ngược, mọi giá trị $J$ ở vế phải đã có sẵn.

$$
\begin{aligned}
J(\mathrm G)&=2+0=2,\\
J(\mathrm F)&=\min\{3+J(\mathrm G),\ 7+J(\mathrm t)\}=\min\{5,\ 7\}=5,\\
J(\mathrm E)&=\min\{2+J(\mathrm F),\ 6+J(\mathrm G)\}=\min\{7,\ 8\}=7,\\
J(\mathrm s)&=\min\{1+J(\mathrm E),\ 5+J(\mathrm F)\}=\min\{8,\ 10\}=8.
\end{aligned}
$$

Điều khiển đạt cực tiểu tại $\mathrm G$, $\mathrm F$, $\mathrm E$, $\mathrm s$ lần lượt là $\mathrm t$, $\mathrm G$, $\mathrm F$, $\mathrm E$. Lượt xuôi cho đường $\mathrm s\to\mathrm E\to\mathrm F\to\mathrm G\to\mathrm t$, thời gian $1+2+3+2=8$ giây, dùng bốn hành động.

**Câu (b).** Có năm đường:

| Đường | Số hành động | Thời gian |
|---|---:|---:|
| $\mathrm s\to\mathrm E\to\mathrm F\to\mathrm G\to\mathrm t$ | $4$ | $1+2+3+2=8$ |
| $\mathrm s\to\mathrm E\to\mathrm F\to\mathrm t$ | $3$ | $1+2+7=10$ |
| $\mathrm s\to\mathrm E\to\mathrm G\to\mathrm t$ | $3$ | $1+6+2=9$ |
| $\mathrm s\to\mathrm F\to\mathrm G\to\mathrm t$ | $3$ | $5+3+2=10$ |
| $\mathrm s\to\mathrm F\to\mathrm t$ | $2$ | $5+7=12$ |

Nhỏ nhất là $8$, khớp $J(\mathrm s)$.

**Câu (c).** Đường tối ưu ở (a) dùng bốn hành động nên bị loại. Tại $\mathrm F$, lịch sử $\mathrm s\to\mathrm F$ còn hai hành động, và phần tương lai tốt nhất là $\mathrm F\to\mathrm G\to\mathrm t$ với thời gian $5$. Lịch sử $\mathrm s\to\mathrm E\to\mathrm F$ chỉ còn một hành động, và phần tương lai duy nhất là $\mathrm F\to\mathrm t$ với thời gian $7$. Cùng nút $\mathrm F$ nhưng phần tương lai khác nhau theo lịch sử, nên nút không còn là trạng thái đủ (Nhận xét 07.36).

Mở rộng trạng thái thành cặp $(v,r)$, với $r$ là số hành động còn được dùng. Ta dùng quy ước $J(v,0)=+\infty$ khi $v\ne\mathrm t$, nghĩa là từ $v$ không còn tới được đích. Phương trình Bellman cho trạng thái mở rộng là

$$
J(\mathrm t,r)=0,\qquad r\ge0,
$$

và với $v\ne\mathrm t$, $r\ge1$,

$$
J(v,r)=\min_{(v,w)}\{g(v,w)+J(w,r-1)\}.
$$

Chỉ các trạng thái đi tới được từ $(\mathrm s,3)$ cần tính:

$$
\begin{aligned}
J(\mathrm G,1)&=2+J(\mathrm t,0)=2,\\
J(\mathrm F,1)&=\min\{3+J(\mathrm G,0),\ 7+J(\mathrm t,0)\}=\min\{+\infty,\ 7\}=7,\\
J(\mathrm F,2)&=\min\{3+J(\mathrm G,1),\ 7+J(\mathrm t,1)\}=\min\{5,\ 7\}=5,\\
J(\mathrm E,2)&=\min\{2+J(\mathrm F,1),\ 6+J(\mathrm G,1)\}=\min\{9,\ 8\}=8,\\
J(\mathrm s,3)&=\min\{1+J(\mathrm E,2),\ 5+J(\mathrm F,2)\}=\min\{9,\ 10\}=9.
\end{aligned}
$$

Điều khiển đạt cực tiểu tại $(\mathrm F,2)$, $(\mathrm E,2)$, $(\mathrm s,3)$ lần lượt là $\mathrm G$, $\mathrm G$, $\mathrm E$. Lượt xuôi: $(\mathrm s,3)\to(\mathrm E,2)\to(\mathrm G,1)\to(\mathrm t,0)$, tức đường $\mathrm s\to\mathrm E\to\mathrm G\to\mathrm t$ với thời gian $1+6+2=9$ giây. Tại $\mathrm E$, lựa chọn đổi từ $\mathrm F$ ở (a) sang $\mathrm G$: chính sách phụ thuộc cả số hành động còn lại. Với $k=3-r$, cặp $(v,r)$ là nút $v$ ở giai đoạn $k$ của một bài toán ba giai đoạn theo Định nghĩa 07.35, khi thêm tại $\mathrm t$ một điều khiển ở lại với thời gian $0$ và bỏ khỏi $X_k$ các nút không còn tới được đích. Số trạng thái tăng từ $5$ lên nhiều nhất $5\cdot4=20$. Trong học tăng cường với chân trời hữu hạn, hàm giá trị vì vậy được đánh chỉ số theo số bước còn lại, như $J(v,r)$ ở đây.

**Câu (d).** Giả thiết tất định không còn thỏa: một hành động không dẫn tới đúng một trạng thái kế tiếp. Vế phải của phương trình Bellman lấy kỳ vọng theo trạng thái kế tiếp, $J(v)=\min_u\{g(v,u)+\mathbb E[J(w)]\}$, với $w$ là trạng thái kế tiếp ngẫu nhiên khi chọn $u$ tại $v$ (MIT 15.093J, bài giảng 16, trang 9; Sutton và Barto 2018, chương 3–4).

**Kiểm tra lại.** Trong bảng ở (b), các đường dùng không quá ba hành động có thời gian $10$, $9$, $10$, $12$; nhỏ nhất là $9$ tại $\mathrm s\to\mathrm E\to\mathrm G\to\mathrm t$, khớp $J(\mathrm s,3)$.
:::

## Nguồn

- Bertsimas, D. và Tsitsiklis, J. N. (1997), *Introduction to Linear Optimization*, Athena Scientific, §1.1–1.4 (mô hình hóa, Bài tập 07.1, 07.2, 07.15), §2.1–2.6 (đa diện, nghiệm cơ sở, điểm cực biên; Bài tập 07.3–07.7, 07.13, 07.14).
- MIT OpenCourseWare 15.093J/6.255J *Optimization Methods* (2009), bài giảng số 16 "Dynamic Programming", trang 2–9: khung quy hoạch động và phương trình Bellman; Bài tập 07.8, 07.9, 07.16.
- Bertsekas, D. P. (2017), *Dynamic Programming and Optimal Control*, tập I, ấn bản 4, Athena Scientific, chương 1–2: mở rộng trạng thái và đường đi ngắn nhất; Bài tập 07.16.
- Sutton, R. S. và Barto, A. G. (2018), *Reinforcement Learning: An Introduction*, ấn bản 2, MIT Press, chương 3–4: phương trình Bellman với chuyển tiếp ngẫu nhiên; Bài tập 07.16(d).
- Ghi chú bài giảng Bài 07 cho phát biểu và chứng minh của các kết quả được dùng.
