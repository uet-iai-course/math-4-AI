# Bài tập Bài 02: Các bài toán tối ưu lồi

Bộ bài tập bám sáu phần của bộ trang chiếu và ghi chú Bài 02, phục vụ chuẩn đầu ra bài học số 3 (LLO3), gắn với chuẩn đầu ra học phần số 1 (CLO1). Các bài rèn nhận dạng mô hình, tính toán và chứng minh, vận dụng vào bài toán thực tế. Gợi ý và lời giải được gập để người học tự làm trước khi đối chiếu.

Các bài được biên soạn theo nội dung học phần, tham khảo Boyd–Vandenberghe (2004), [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/). Những biến thể số liệu hoặc ràng buộc được ghi rõ; đây không phải bản dịch nguyên bộ bài tập của sách.

Quy ước: quy hoạch tuyến tính (LP), quy hoạch bậc hai (QP), quy hoạch bậc hai có ràng buộc bậc hai (QCQP), quy hoạch hình học (GP).

**Dữ liệu hồi quy dùng chung cho Bài 4–8.**

$$u=(-2,-1,0,1,2),\qquad y=(-2,-1,3,1,2)^T.$$

Ma trận $X\in\mathbb R^{5\times2}$ có hàng thứ $i$ là $(u_i,1)$. Biến $a,b\in\mathbb R$, vectơ hệ số $w=(a,b)^T$ và phần dư $r=Xw-y\in\mathbb R^5$. Trong các bài chính quy hóa hồi quy, hình phạt tác động lên cả $a$ và $b$. Dữ liệu là minh họa của học phần.

## Phần 1: Mô hình hóa và chứng nhận tính lồi

### Bài 1. Mô hình, nghiệm và giá trị tối ưu

**Mức:** Nhận dạng và giải thích.

Cho hai bài toán:

$$\text{(A)}\quad \min_{0\le x\le 1}\ (x-2)^2,\qquad \text{(B)}\quad \min_{x\ge 1}\ \frac{1}{x}.$$

**a)** Với mỗi bài toán, nêu rõ: dữ liệu, biến quyết định, miền xác định của hàm mục tiêu, tập khả thi, và đầu ra cần tìm. Chứng nhận từng bài toán là bài toán tối ưu lồi (kiểm tra riêng hàm mục tiêu và tập khả thi).

**b)** Tìm nghiệm và giá trị tối ưu của bài (A) bằng lập luận trực tiếp (không suy ra sự tồn tại nghiệm từ tính lồi). Chứng minh bằng bất đẳng thức rằng giá trị tìm được là nhỏ nhất.

**c)** Với bài (B), chứng minh $\inf_{x\ge 1}1/x=0$ nhưng bài toán **không có nghiệm**. Thêm biến thể: nếu chặn thêm $x\le M$ với $M\ge 1$, chứng minh nghiệm là $x^\star=M$ và giá trị tối ưu bằng $1/M$.

::: hint
Câu a: tách hai phép kiểm tra — đạo hàm bậc hai của mục tiêu, và tính lồi của đoạn/nửa đường thẳng. Câu b: trên $[0,1]$ hàm $(x-2)^2$ giảm vì $x<2$; để chứng minh, viết $(x-2)^2\ge 1 \iff |x-2|\ge 1$ và xét dấu của $x-2$ trên đoạn. Câu c: dùng dãy $x_k=k$ để tiến tới cận dưới; với biến thể, chú ý $1/x$ giảm trên miền dương và điểm $M$ thuộc tập khả thi.
:::

::: solution
**a)** Bài (A): dữ liệu là mốc $2$ và hai cận $0,1$; biến là $x\in\mathbb R$; miền xác định của $f_0(x)=(x-2)^2$ là toàn bộ $\mathbb R$; tập khả thi $C=[0,1]$; đầu ra là $x^\star$ và $f_0(x^\star)$. Chứng nhận: $f_0''(x)=2>0$ trên $\mathbb R$ nên $f_0$ lồi chặt (còn gọi là lồi nghiêm ngặt); $C=[0,1]$ là đoạn lồi (hoặc viết qua hai ràng buộc affine $-x\le0$, $x-1\le0$). Bài (B): dữ liệu là hằng số $1$; biến $x\in\mathbb R$; miền xác định của $f_0(x)=1/x$ là $\mathbb R_{++}=(0,+\infty)$; tập khả thi là $C=[1,+\infty)$, tức phần của miền xác định bị chặn thêm $x\ge 1$ (phân biệt miền xác định của hàm mục tiêu với tập khả thi của bài toán); đầu ra là giá trị tối ưu và điểm đạt (nếu có). Chứng nhận: $f_0''(x)=2/x^3>0$ trên miền dương nên $f_0$ lồi; $[1,+\infty)$ lồi.

**b)** Trên $[0,1]$ ta có $x<2$ nên $f_0'(x)=2(x-2)<0$: hàm giảm, giá trị nhỏ nhất ứng viên tại biên phải $x=1$. Chứng minh bằng bất đẳng thức: với mọi $x\in[0,1]$,

$$(x-2)^2\ge 1 \iff |x-2|\ge 1 \iff x\le 1 \text{ hoặc } x\ge 3,$$

và trên $[0,1]$ điều kiện $x\le 1$ luôn đúng, dấu bằng chỉ khi $x=1$. Vậy $x^\star=1$, giá trị tối ưu $f_0(x^\star)=1$. Nghiệm nằm trên biên: nghiệm tự do $x=2$ của bài không ràng buộc không khả thi. Lưu ý tính lồi chỉ bảo đảm *mọi nghiệm cục bộ là toàn cục*, không tự bảo đảm nghiệm tồn tại — ở đây nghiệm tồn tại vì $[0,1]$ đóng và bị chặn và $f_0$ liên tục.

**c)** Với mọi $x\ge 1$: $1/x>0$, nên $0$ là cận dưới. Xét dãy $x_k=k\ge 1$: $1/x_k=1/k\to 0$, do đó $\inf_{x\ge1}1/x=0$. Nhưng $1/x>0$ với mọi $x$ hữu hạn, nên không có điểm khả thi nào đạt giá trị $0$: bài toán bị chặn dưới nhưng **không có nghiệm** (khác với không bị chặn dưới, khi đó $\inf=-\infty$). Không được ghi $x^\star=+\infty$ — ký hiệu đó không phải một nghiệm.

Biến thể: thêm $x\le M$, $M\ge 1$. Tập khả thi $[1,M]$ đóng và bị chặn, hàm $1/x$ giảm trên miền dương vì với $1\le x< x'$ ta có $1/x>1/x'$. Do đó giá trị nhỏ nhất đạt tại điểm lớn nhất thuộc tập khả thi: $x^\star=M$, giá trị $1/M$. Chứng minh bằng bất đẳng thức: với mọi $x\in[1,M]$, $x\le M \Rightarrow 1/x\ge 1/M$, dấu bằng khi $x=M$.
:::

*(Tham chiếu: [Ví dụ: hàm bậc hai](lecture-02-cac-bai-toan-toi-uu-loi.html#/vi-du-bac-hai) và [Ví dụ: hàm nghịch đảo](lecture-02-cac-bai-toan-toi-uu-loi.html#/vi-du-nghich-dao); Boyd–Vandenberghe, §4.1–4.2, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

### Bài 2. Tính lồi của tập khả thi

**Mức:** Tính toán và chứng minh.

Xét tập

$$C=\{x=(x_1,x_2)\in\mathbb R^2 \mid x_1^2-x_2^2\le 1\},$$

và hai điểm $a=(\sqrt2,\,1)$, $b=(\sqrt2,\,-1)$.

**a)** Kiểm tra $a,b\in C$. Tính trung điểm $\frac{a+b}{2}$ và kết luận về tính lồi của $C$.

**b)** Hàm $g(x)=x_1^2-x_2^2$ có Hessian $\operatorname{diag}(2,-2)$ bất định. Giải thích vì sao "Hessian của hàm ràng buộc không nửa xác định dương" **không đủ** để kết luận tập khả thi không lồi, bằng phản ví dụ: hàm $h(x)=-x^2$ không lồi trên $\mathbb R$ nhưng tập mức $\{x\mid h(x)\le 0\}=\mathbb R$ lại lồi.

**c)** Nêu một điều kiện đủ để tập khả thi $C=\{x\in D:g_i(x)\le0,\ h_j(x)=0\}$ lồi, trong đó $D$ là miền lồi, $g_i$ là hàm ràng buộc bất đẳng thức và $h_j$ là hàm ràng buộc đẳng thức. Giải thích vì sao điều kiện đủ này không phải điều kiện cần đối với mọi cách biểu diễn của $C$.

::: hint
Câu a: thay tọa độ vào $x_1^2-x_2^2$; trung điểm có thành phần thứ hai bằng $0$. Câu b: tính lồi của tập là tính chất của **tập**, không phải của một cách mô tả cụ thể; hàm mô tả lồi là một điều kiện đủ, còn hàm mô tả không lồi chưa quyết định tập có lồi hay không. Câu c: đối chiếu với khung chứng nhận hai bước của phần 1.
:::

::: solution
**a)** Thay vào: $a_1^2-a_2^2=2-1=1\le 1$ và $b_1^2-b_2^2=2-1=1\le 1$, nên $a,b\in C$. Trung điểm:

$$\frac{a+b}{2}=\left(\sqrt2,\,0\right),\qquad (\sqrt2)^2-0^2=2>1,$$

nên $\frac{a+b}{2}\notin C$. Vậy $C$ **không lồi**: tồn tại hai điểm thuộc tập nhưng đoạn nối giữa chúng thoát ra ngoài.

**b)** Điểm mấu chốt: tính lồi là tính chất của tập $C$, còn Hessian bất định chỉ là tính chất của **một hàm** đang dùng để mô tả $C$. Cùng một tập có thể được mô tả bởi nhiều hàm khác nhau; một biểu diễn "xấu" (hàm không lồi) không loại trừ tập lồi. Phản ví dụ: $h(x)=-x^2$ có $h''(x)=-2<0$ (nói chung không lồi, và Hessian âm xác định — nhưng điều đó cũng không quyết định tập), trong khi

$$\{x\in\mathbb R \mid -x^2\le 0\}=\mathbb R$$

là tập lồi. Kết luận: dấu Hessian là chứng nhận tính lồi của **hàm** (Hessian nửa xác định dương trên miền lồi chứng minh $g$ lồi, và từ đó tập mức dưới lồi); nhưng Hessian **không** nửa xác định dương thì **không đủ** kết luận tập mức không lồi — có thể kiểm tra trực tiếp định nghĩa tập lồi, như phép thử trung điểm ở câu a.

**c)** Điều kiện đủ: $D$ lồi, mỗi $g_i$ lồi trên $D$ và mỗi $h_j$ affine. Khi đó từng tập mức dưới $\{x\in D:g_i(x)\le0\}$ lồi, từng tập đẳng thức affine lồi; giao của chúng là tập khả thi lồi. Kết hợp với hàm mục tiêu lồi trên $D$ để chứng nhận bài toán tối ưu lồi. Đây là điều kiện đủ cho biểu diễn đang dùng, không phải điều kiện cần: câu b cho một hàm ràng buộc không lồi nhưng tập mức dưới vẫn lồi. Nếu điều kiện đủ không thỏa, cần một lập luận khác về tập, chẳng hạn kiểm tra đoạn nối như câu a.
:::

*(Tham chiếu: [Bài toán tối ưu lồi tổng quát](lecture-02-cac-bai-toan-toi-uu-loi.html#/bai-toan-toi-uu-tong-quat) và [Dạng phổ biến của tối ưu lồi](lecture-02-cac-bai-toan-toi-uu-loi.html#/dang-toan-hoc); Boyd–Vandenberghe, §4.2, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

## Phần 2: Quy hoạch tuyến tính

### Bài 3. Pha trộn có trần cung

**Mức:** Vận dụng.

Một vườn ươm pha trộn hai nguyên liệu với số liệu (đơn vị giá: 10 nghìn đồng/kg):

| Nguyên liệu | Giá (10 nghìn đồng/kg) | Nitơ (g/kg) | Phốtpho (g/kg) |
|---|---|---|---|
| I | 3 | 2 | 1 |
| II | 2 | 1 | 2 |

Cần ít nhất 4 g nitơ và 5 g phốtpho; lượng mua $x_1,x_2\ge 0$ (kg, liên tục).

**a)** Viết bài toán dưới dạng LP; chứng nhận tính lồi theo khung phần 1. Đưa bài về dạng chuẩn $Az=b,\ z\ge 0$ bằng cách đổi dấu ràng buộc $\ge$ và thêm biến dư.

**b)** Tìm ứng viên nghiệm bằng giao của hai ràng buộc dinh dưỡng, rồi chứng minh $(x_1^\star,x_2^\star)=(1,2)$ tối ưu với chi phí $7$ (tức 70 nghìn đồng) bằng tổ hợp tuyến tính hệ số không âm của các ràng buộc.

**c)** Biến thể: thêm trần mua $x_1\le \tfrac12$ (bộ số liệu bảng giữ nguyên; thay đổi chỉ là thêm một ràng buộc). Chứng minh nghiệm mới là $(\tfrac12,3)$ với chi phí $\tfrac{15}{2}$, dùng cận $3x_1+2x_2=2(2x_1+x_2)-x_1\ge 8-\tfrac12$. Có được khẳng định "hai dinh dưỡng đều không dư" ở nghiệm này không?

::: hint
Câu a: ràng buộc $2x_1+x_2\ge 4$ đổi thành $-2x_1-x_2\le -4$; biến dư $s_1\ge0$ cho đẳng thức. Câu b: giải hệ hai ràng buộc đạt dấu bằng; biểu diễn mục tiêu $\tfrac43(2x_1+x_2)+\tfrac13(x_1+2x_2)$; lưu ý đây là tổ hợp hệ số không âm, không phải tổ hợp lồi. Câu c: từ trần $x_1\le\tfrac12$ suy $-x_1\ge-\tfrac12$; kiểm tra khả thi và dấu bằng.
:::

::: solution
**a)** Mô hình:

$$\begin{aligned}\min\;& 3x_1+2x_2\\\text{với}\quad & 2x_1+x_2\ge 4,\\ & x_1+2x_2\ge 5,\\ & x_1,x_2\ge 0.\end{aligned}$$

Mục tiêu affine nên lồi; tập khả thi là giao các nửa không gian (đổi dấu các $\ge$ thành $\le$: $-2x_1-x_2\le-4$, $-x_1-2x_2\le-5$, $-x\le0$), nên lồi. Về dạng chuẩn: thêm biến dư $s_1,s_2\ge0$ để $2x_1+x_2-s_1=4$, $x_1+2x_2-s_2=5$. Bài gốc có dạng $Gx\le h$ với $G=\begin{bmatrix}-2&-1\\-1&-2\\-1&0\\0&-1\end{bmatrix}$, $h=(-4,-5,0,0)^{\mathsf T}$. Theo quy tắc chuyển biến tự do/biến dư: ở đây $x\ge0$ đã có nên không cần tách $x=x^+-x^-$; đặt $z=(x_1,x_2,s_1,s_2)^{\mathsf T}\ge0$ và

$$A=\begin{bmatrix}2&1&-1&0\\1&2&0&-1\end{bmatrix},\qquad b=\begin{bmatrix}4\\5\end{bmatrix},\qquad d=(3,2,0,0)^{\mathsf T},$$

tức $\min_{z\ge0} d^{\mathsf T}z$ với $Az=b$. (Lưu ý: ký hiệu $A,b$ chỉ dùng cục bộ cho bài 3 này dưới dạng chuẩn, không nhầm với hệ số chặn $b$ trong hồi quy dùng chung ở các bài sau; trong dạng chuẩn tổng quát ký hiệu là $Bz=e$, ở đây viết $Az=b$ cho gọn.)

**b)** Nghiệm của hệ hai ràng buộc đạt dấu bằng: $2x_1+x_2=4$, $x_1+2x_2=5$. Nhân phương trình đầu với 2 rồi trừ phương trình hai: $3x_1=3\Rightarrow x_1=1$, $x_2=2$. Ứng viên $(1,2)$, chi phí $3+4=7$. Chứng nhận: kiểm tra trực tiếp

$$3x_1+2x_2=\tfrac43(2x_1+x_2)+\tfrac13(x_1+2x_2),$$

vì $\tfrac43\cdot2+\tfrac13\cdot1=3$ và $\tfrac43\cdot1+\tfrac13\cdot2=2$; hai hệ số $\tfrac43,\tfrac13$ không âm (tổng $\tfrac53\ne1$, nên đây là tổ hợp tuyến tính hệ số không âm, không phải tổ hợp lồi). Với mọi điểm khả thi:

$$3x_1+2x_2\ge \tfrac43\cdot4+\tfrac13\cdot5=\tfrac{16}{3}+\tfrac53=7.$$

Điểm $(1,2)$ khả thi ($2+2=4$, $1+4=5$) và đạt đúng $7$. Vậy $(1,2)$ tối ưu, chi phí 7 đơn vị = 70 nghìn đồng; cả hai dinh dưỡng đều dùng đúng hết (nitơ 4 g, phốtpho 5 g) — điều này là tính chất của **nghiệm này**, không phải khẳng định tổng quát cho mọi nghiệm LP.

**c)** Biến thể với trần $x_1\le\tfrac12$. Cận: với mọi điểm khả thi của bài mới,

$$3x_1+2x_2=2(2x_1+x_2)-x_1\ge 2\cdot4-\tfrac12=\tfrac{15}{2}.$$

Đạt tại $x=(\tfrac12,3)$: kiểm tra khả thi — nitơ $2\cdot\tfrac12+3=4\ge4$; phốtpho $\tfrac12+6=6{,}5\ge5$; $x\ge0$, $x_1\le\tfrac12$. Chi phí $3\cdot\tfrac12+2\cdot3=\tfrac32+6=\tfrac{15}{2}$. Vậy nghiệm $(\tfrac12,3)$, chi phí $\tfrac{15}{2}$ (75 nghìn đồng). Ở nghiệm này phốtpho dư $1{,}5$ g — nên **không** khẳng định "không dư từng dinh dưỡng"; ràng buộc là bất đẳng thức nên dư là bình thường, chỉ nitơ dùng đúng 4 g.
:::

*(Tham chiếu: [Mô hình pha trộn](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-pha-tron), [Nghiệm của bài toán pha trộn](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-nghiem-pha-tron), [Dạng chuẩn của quy hoạch tuyến tính](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-chuan-tac); Boyd–Vandenberghe, §4.3.1, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

### Bài 4. Hai tiêu chí sai số hồi quy

**Mức:** Tính toán và chứng minh.

Dùng dữ liệu hồi quy chung: $u=(-2,-1,0,1,2)$, $y=(-2,-1,3,1,2)$, $X$ có hàng $i$ là $(u_i,1)$, $w=(a,b)^{\mathsf T}$, $r=Xw-y$.

**a)** Cải dạng hai bài toán sau thành LP và chứng minh tương đương chính xác (hai chiều):
- Hồi quy sai số tuyệt đối $\min_w \sum_{i=1}^5|r_i|$, dùng **5 biến phụ** $t_i$;
- Hồi quy minimax $\min_w \max_i|r_i|$, dùng **1 biến phụ chung** $t$.

Cho biết số biến và số ràng buộc của mỗi bài LP (có thể đếm nhanh, không bắt buộc liệt kê từng dòng), và giải thích vì sao không dùng đạo hàm của $|\cdot|$ tại $0$.

**b)** Chứng minh nghiệm của bài sai số tuyệt đối là $w^\star=(1,0)$ với giá trị $3$; và nghiệm của bài minimax là $w^\star=(1,\tfrac32)$ với giá trị $t^\star=\tfrac32$. Chỉ rõ chỗ lập luận dựa vào tính đối xứng riêng của bộ dữ liệu.

**c)** Bài tập chuyển giao (thay duy nhất $y$ tại $u=0$ từ $3$ thành $4$, các giá trị khác giữ nguyên): xây dựng cận kiểm nghiệm cho hai bài trên bộ dữ liệu mới, chứng minh $w=(1,0)$ đạt giá trị $4$ cho bài L1 và $w=(1,2)$ đạt giá trị $2$ cho bài minimax. Có được khẳng định nghiệm minimax **duy nhất** không? Cuối cùng, phân biệt rõ hai khái niệm: **đổi tiêu chí** (đổi $\sum|r_i|$ thành $\max|r_i|$) và **cải dạng** (thêm biến phụ).

::: hint
Câu a: với vô hướng $r$, $t\ge|r|\iff t\ge r$ và $t\ge -r$; với L1 một biến $t_i$ mỗi phần dư, với minimax một biến chung. Câu b: đặt $d=a-1$; cặp phần dư $b\pm d$, $b\pm 2d$ cho cận qua bất đẳng thức tam giác (dấu **cộng** trong $|(b-d)+(b+d)|$ triệt tiêu $d$); điểm $u=0$ cho $|b-3|$. Câu c: với dữ liệu mới phần dư tại $u=0$ là $b-4$; với minimax xét trung bình của cặp $b\pm d$ và điểm $u=0$.
:::

::: solution
**a)** *Bài L1:*

$$\min_{w,\,t}\ \mathbf 1^{\mathsf T}t\quad\text{với}\quad -t\le Xw-y\le t,\quad t\in\mathbb R^5.$$

Số biến: $2+5=7$; mỗi điểm cho hai ràng buộc bất đẳng thức, tổng $10$ ràng buộc; điều kiện $t_i\ge0$ không cần nêu riêng vì $t_i\ge|r_i|\ge0$ là hệ quả của hai ràng buộc. *Bài minimax:*

$$\min_{w,\,t}\ t\quad\text{với}\quad -t\mathbf 1\le Xw-y\le t\mathbf 1,\quad t\in\mathbb R.$$

Số biến: $3$; số ràng buộc: $10$ (mỗi điểm hai bất đẳng thức). *Tương đương hai chiều (L1):* chiều thuận, với mọi $w$ chọn $t_i=|r_i|$ thì $(w,t)$ khả thi và mục tiêu $\sum|r_i|$, nên giá trị LP $\le$ giá trị gốc. Chiều ngược, mọi $(w,t)$ khả thi có $t_i\ge|r_i|$ với mọi $i$ nên $\sum t_i\ge\sum|r_i|$, nên giá trị gốc $\le$ giá trị LP. Vậy hai giá trị bằng nhau; hơn nữa tại nghiệm tối ưu nếu $t_i>|r_i|$ thì giảm $t_i$ xuống $|r_i|$ vẫn khả thi và giảm mục tiêu — mâu thuẫn, nên $t_i^\star=|r_i^\star|$. *Tương đương (minimax):* với $w$ bất kỳ, $t$ nhỏ nhất thỏa $|r_i|\le t\ \forall i$ là đúng $\max_i|r_i|$; do đó tối thiểu $t$ theo $(w,t)$ cho cùng giá trị với tối thiểu $\max_i|r_i|$ theo $w$. Mục tiêu và ràng buộc mới đều affine, nên cả hai bài là LP. Không dùng đạo hàm tại $0$ vì $|\cdot|$ **không khả vi** tại đó (đạo hàm trái $-1$, phải $+1$); biến phụ thay thế hoàn toàn, và cải dạng là tương đương chính xác, không phải xấp xỉ.

**b)** *L1:* đặt $d=a-1$; phần dư: $b-2d$ (u=−2), $b-d$ (u=−1), $b-3$ (u=0), $b+d$ (u=1), $b+2d$ (u=2). Bất đẳng thức tam giác với dấu **cộng**:

$$|b-d|+|b+d|\ge|(b-d)+(b+d)|=2|b|,\qquad |b-2d|+|b+2d|\ge2|b|,$$

và $|b-3|\ge3-|b|$. Ghép: $\sum|r_i|\ge 2|b|+2|b|+3-|b|=3+3|b|\ge3$. Đạt tại $b=0,d=0$ ($w=(1,0)$): phần dư $(0,0,-3,0,0)$, tổng đúng $3$. Duy nhất: nếu tối ưu thì tổng $=3$ buộc $b=0$; khi đó tổng $=6|d|+3$ buộc $d=0$. Lưu ý lập luận dựa vào cặp điểm đối xứng $\pm1,\pm2$ quanh $0$ — tính chất riêng của bộ dữ liệu này, không tổng quát. *Minimax:* nếu mọi $|r_i|\le t$ thì $|b|=\left|\tfrac{(b-d)+(b+d)}{2}\right|\le t$ và $|b-3|\le t$, nên $3=|b+(3-b)|\le|b|+|b-3|\le2t$, tức $t\ge\tfrac32$. Đạt tại $w=(1,\tfrac32)$: phần dư lần lượt $1{,}5;\,1{,}5;\,-1{,}5;\,1{,}5;\,1{,}5$, max đúng $\tfrac32$. (Đánh đổi: tổng sai số tăng $3\to7{,}5$, sai số tệ nhất giảm $3\to1{,}5$.)

**c)** Bộ dữ liệu mới: $y=(-2,-1,4,1,2)$; phần dư tại $u=0$ là $b-4$, các cặp $b\pm d$, $b\pm2d$ không đổi. *L1:* cận $\sum|r_i|\ge 4|b|+|b-4|\ge4|b|+4-|b|=4+3|b|\ge4$; đạt tại $w=(1,0)$: phần dư $(0,0,-4,0,0)$, tổng $4$. *Minimax:* nếu mọi $|r_i|\le t$ thì $|b|\le t$ (từ cặp $\pm1$) và $|b-4|\le t$, nên $4\le|b|+|b-4|\le2t$, tức $t\ge2$; đạt tại $w=(1,2)$: phần dư $2;2;-2;2;2$, max $=2$. *Về duy nhất:* với L1 lập luận cận buộc $b=0$ rồi $d=0$, nên nghiệm duy nhất. Với minimax, mọi nghiệm tối ưu thỏa $t=2$ và $|r_i|\le2$ với mọi $i$; từ cặp $\pm1$: $|b|\le2$; từ điểm $u=0$: $|b-4|\le2$. Hai điều kiện này buộc $b=2$. Từ hai cặp: $|b-2d|\le2$ và $|b+2d|\le2$; thay $b=2$ ta được $|2-2d|\le2 \Rightarrow 0\le d\le2$ và $|2+2d|\le2 \Rightarrow -2\le d\le0$, nên $d=0$. Vậy nghiệm minimax là **duy nhất**, $w=(1,2)$ với giá trị $t^*=2$. *Đổi tiêu chí và cải dạng:* đổi tiêu chí là thay hàm mục tiêu của bài toán gốc ($\sum|r_i|$ → $\max|r_i|$) — hai bài này khác nhau, nghiệm và giá trị khác nhau; cải dạng là viết **cùng một bài toán** dưới dạng khác bằng biến phụ mà giá trị tối ưu và nghiệm gốc không đổi — là phép biến đổi tương đương, không đổi bản chất bài toán.
:::

*(Tham chiếu: [Hồi quy với sai số tuyệt đối](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-hoi-quy-tuyet-doi), [Biến phụ cho giá trị tuyệt đối](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-bien-phu), [Tính tương đương của phép cải dạng](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-tuong-duong), [Nghiệm hồi quy với sai số tuyệt đối](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-nghiem-hoi-quy), [Hồi quy với sai số lớn nhất](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-sai-so-lon-nhat); Boyd–Vandenberghe, §6.1.1, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

## Phần 3: Quy hoạch bậc hai và chính quy hóa

### Bài 5. Bình phương tối thiểu

**Mức:** Tính toán và chứng minh.

Dùng dữ liệu hồi quy chung ($u=(-2,-1,0,1,2)$, $y=(-2,-1,3,1,2)$, $X$ hàng $i$ là $(u_i,1)$, $w=(a,b)^{\mathsf T}$). Với $E(w)=\sum_{i=1}^5(au_i+b-y_i)^2$.

**a)** Chứng minh $E(w)=10(a-1)^2+5\left(b-\tfrac35\right)^2+\tfrac{36}{5}$, rồi viết $E$ dưới dạng phổ biến QP $\tfrac12w^{\mathsf T}Pw+q^{\mathsf T}w+r_0$: chỉ rõ $P=\operatorname{diag}(20,10)$, $q=(-20,-6)^{\mathsf T}$, $r_0=19$. Chứng nhận tính lồi (và lồi chặt) của mục tiêu.

**b)** Từ dạng hoàn thành bình phương, chứng minh nghiệm không ràng buộc là $w^\star=(1,\tfrac35)$ với $E(w^\star)=\tfrac{36}{5}$.

**c)** Biến thể: thêm ràng buộc $a\le\tfrac12$. Chứng minh nghiệm là $(\tfrac12,\tfrac35)$ với $E=\tfrac{97}{10}$, và đối chiếu nghiệm này với hai nghiệm của Bài 4 (L1 và minimax trên cùng dữ liệu): vì sao chúng khác nhau?

::: hint
Câu a: tính các tổng $\sum u_i^2$, $\sum u_i$, $\sum y_i$, $\sum u_iy_i$, $\sum y_i^2$; hoàn thành bình phương từng biến. Câu b: mỗi bình phương không âm và độc lập. Câu c: với $a$ cố định, số hạng theo $b$ không phụ thuộc $a$; còn $E$ theo $a$ giảm khi $a$ tiến về 1.
:::

::: solution
**a)** Các tổng: $\sum u_i^2=10$, $\sum u_i=0$, $\sum y_i=3$, $\sum u_iy_i=10$, $\sum y_i^2=19$. Vì cột hai của $X$ toàn 1: $X^{\mathsf T}X=\operatorname{diag}(10,5)$, $X^{\mathsf T}y=(10,3)^{\mathsf T}$. Do đó

$$E=w^{\mathsf T}X^{\mathsf T}Xw-2y^{\mathsf T}Xw+y^{\mathsf T}y=10a^2+5b^2-20a-6b+19.$$

Hoàn thành bình phương: $10a^2-20a=10(a-1)^2-10$; $5b^2-6b=5\left(b-\tfrac35\right)^2-\tfrac95$. Ghép:

$$E=10(a-1)^2+5\left(b-\tfrac35\right)^2+19-10-\tfrac95=10(a-1)^2+5\left(b-\tfrac35\right)^2+\tfrac{36}{5}.$$

Đối chiếu dạng QP: $\tfrac12w^{\mathsf T}Pw=10a^2+5b^2$ cần $P=\operatorname{diag}(20,10)$; $q^{\mathsf T}w=-20a-6b$ cần $q=(-20,-6)^{\mathsf T}$; $r_0=19$. Chứng nhận: $P\succeq0$ (thực ra $P\succ0$) nên mục tiêu lồi, và vì $P$ xác định dương nên **lồi chặt**; tập khả thi (toàn $\mathbb R^2$) lồi. Hạng đầy cột của $X$ không cần cho tính lồi, chỉ cần cho lồi chặt ở dạng tổng quát.

**b)** Mỗi số hạng bình phương không âm, đạt $0$ độc lập nhau: $a=1$, $b=\tfrac35$; khi đó $E=\tfrac{36}{5}$. Dự đoán $\hat y=u+0{,}6$.

**c)** Nghiệm tự do $(1,\tfrac35)$ vi phạm $a\le\tfrac12$. Số hạng $5\left(b-\tfrac35\right)^2$ không phụ thuộc $a$ và đạt $0$ tại $b=\tfrac35$, nên với **mọi** $a$ khả thi, tối ưu theo $b$ vẫn là $b=\tfrac35$. Còn lại $\min_{a\le1/2}10(a-1)^2$: hàm giảm khi $a<1$, nên trên $(-\infty,\tfrac12]$ nhỏ nhất tại $a=\tfrac12$. Vậy $w^\star=(\tfrac12,\tfrac35)$ và

$$E=10\left(\tfrac12-1\right)^2+\tfrac{36}{5}=\tfrac{10}{4}+\tfrac{36}{5}=\tfrac{50+144}{20}=\tfrac{97}{10}.$$

Nghiệm nằm trên mép miền khả thi. Đối chiếu Bài 4: trên cùng dữ liệu, tiêu chí L1 cho $(1,0)$, minimax cho $(1,\tfrac32)$, tiêu chí bình phương cho $(1,\tfrac35)$ (và bản có ràng buộc cho $(\tfrac12,\tfrac35)$). Lưu ý: $(\tfrac12,\tfrac35)$ khác nghiệm bình phương tối thiểu tự do $(1,\tfrac35)$ **chỉ vì ràng buộc thêm** $a\le\tfrac12$, không phải vì đổi mục tiêu — cùng một mục tiêu bình phương được dùng ở cả hai bản. Còn khác nhau giữa L1/minimax/bình phương là vì **tiêu chí đo sai số khác nhau là các bài toán khác nhau** — đây là đổi tiêu chí, không phải cải dạng; không có tiêu chí nào "tốt hơn" tuyệt đối.
:::

*(Tham chiếu: [Nghiệm hồi quy bình phương tối thiểu](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-nghiem-hoi-quy), [Dạng phổ biến của quy hoạch bậc hai](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-dang-pho-bien); Boyd–Vandenberghe, §4.4.1, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

### Bài 6. Bốn tổ hợp sai số và hình phạt

**Mức:** Nhận dạng, tính toán và chứng minh.

Với dữ liệu chung, xét bốn mô hình $\min_w L(w)+\lambda R(w)$, $\lambda>0$, với $L\in\{\|r\|_1,\|r\|_2^2\}$, $R\in\{\|w\|_1,\|w\|_2^2\}$, $r=Xw-y$.

**a)** Với mỗi tổ hợp, viết cải dạng có biến phụ (nếu cần) và phân lớp LP hay QP. Yêu cầu: biến phụ cho trị tuyệt đối phải **đủ hai phía** ($t_i\ge r_i$ và $t_i\ge -r_i$) — giải thích vì sao không được thay bằng một phía; không dùng đạo hàm của $|\cdot|$ tại $0$.

**b)** Xét mô hình Tikhonov ($\ell_2^2+\ell_2^2$) với **$\lambda=5$** (biến thể so với $\lambda=10$ trong ghi chú): giải hệ điều kiện dừng, chứng minh $w^\star=(\tfrac23,\tfrac3{10})$ và tính $E=\tfrac{1577}{180}$, mục tiêu $J=\tfrac{343}{30}$. Chứng minh nghiệm duy nhất.

**c)** Giải thích vì sao không thể so sánh $J=\tfrac{343}{30}$ (bài có phạt) với $E=\tfrac{36}{5}$ (bài không phạt) như hai giá trị cùng tiêu chí.

::: hint
Câu a: bốn hàng — $\ell_1+\ell_1$ (biến $t$ và $v$), $\ell_1+\ell_2^2$ (chỉ $t$), $\ell_2^2+\ell_1$ (chỉ $v$), $\ell_2^2+\ell_2^2$ (không biến phụ). Câu b: điều kiện dừng $(X^{\mathsf T}X+\lambda I)w=X^{\mathsf T}y$; tính $E$ từ dạng hoàn thành bình phương của Bài 5. Câu c: thêm $\lambda\|w\|_2^2$ thay đổi hàm mục tiêu.
:::

::: solution
**a)** Bốn tổ hợp:

1. $\min\|r\|_1+\lambda\|w\|_1$: thêm $t\in\mathbb R^5$, $v\in\mathbb R^2$: $\min_{w,t,v}\mathbf1^{\mathsf T}t+\lambda\mathbf1^{\mathsf T}v$ với $-t\le Xw-y\le t$, $-v\le w\le v$ — **LP**.
2. $\min\|r\|_1+\lambda\|w\|_2^2$: thêm $t$: $\min_{w,t}\mathbf1^{\mathsf T}t+\lambda w^{\mathsf T}w$ với $-t\le Xw-y\le t$ — **QP** (mục tiêu bậc hai, ràng buộc affine).
3. $\min\|r\|_2^2+\lambda\|w\|_1$: thêm $v$: $\min_{w,v}\|Xw-y\|_2^2+\lambda\mathbf1^{\mathsf T}v$ với $-v\le w\le v$ — **QP**.
4. $\min\|r\|_2^2+\lambda\|w\|_2^2$: không cần biến phụ — **QP**.

Về "đủ hai phía": $t_i\ge|r_i|\iff t_i\ge r_i$ **và** $t_i\ge -r_i$. Nếu chỉ giữ $t_i\ge r_i$ thì $t_i$ không còn chặn $|r_i|$: ví dụ $r_i=-3$, $t_i=-3$ thỏa $t_i\ge r_i$ nhưng $t_i=-3\ne|r_i|=3$, nên $\min\sum t_i$ không còn đo $\sum|r_i|$ — bài cải dạng sai giá trị. Lưu ý: không khẳng định vội rằng mọi bài thiếu một phía đều không bị chặn dưới — với hình phạt bậc hai theo $w$, bài vẫn có thể hữu hạn dù sai; sai sót nằm ở **giá trị**, không nhất thiết ở tính không bị chặn. (Chẳng hạn, trong mô hình một phía của bài L1 **không phạt**, chọn $a=1$, $b\to-\infty$, $t_i=r_i$ cho mọi $i$ thỏa $t_i\ge r_i$ và $\sum t_i=5b-3\to-\infty$.) Không đạo hàm tại $0$ vì $|\cdot|$ không khả vi tại đó; biến phụ thay thế và cải dạng vẫn tương đương chính xác (cùng lập luận hai chiều như Bài 4a, nhân với $\lambda\ge0$ bảo toàn bất đẳng thức cho khối $v$).

**b)** Mục tiêu $=w^{\mathsf T}(X^{\mathsf T}X+5I)w-2y^{\mathsf T}Xw+y^{\mathsf T}y$. Điều kiện dừng của hàm bậc hai: $(X^{\mathsf T}X+5I)w=X^{\mathsf T}y$. Theo thành phần: $(10+5)a=10\Rightarrow a=\tfrac23$; $(5+5)b=3\Rightarrow b=\tfrac3{10}$. Vậy $w^\star=(\tfrac23,\tfrac3{10})$. Tính $E$ từ Bài 5a:

$$E=10\left(\tfrac23-1\right)^2+5\left(\tfrac3{10}-\tfrac35\right)^2+\tfrac{36}{5}=\tfrac{10}{9}+5\cdot\tfrac9{100}+\tfrac{36}{5}=\tfrac{200}{180}+\tfrac{81}{180}+\tfrac{1296}{180}=\tfrac{1577}{180}.$$

Phạt $5\|w^\star\|_2^2=5\left(\tfrac49+\tfrac9{100}\right)=5\cdot\tfrac{481}{900}=\tfrac{481}{180}$. Mục tiêu:

$$J=\tfrac{1577}{180}+\tfrac{481}{180}=\tfrac{2058}{180}=\tfrac{343}{30}.$$

Duy nhất: với mọi $d\ne0$, $d^{\mathsf T}(X^{\mathsf T}X+5I)d=\|Xd\|_2^2+5\|d\|_2^2>0$, nên $X^{\mathsf T}X+5I\succ0$, mục tiêu lồi chặt, cực tiểu toàn cục duy nhất.

**c)** $J=L+\lambda R$ và $E=L$ là **hai hàm mục tiêu khác nhau**: $J=\tfrac{343}{30}\approx11{,}43$ còn $E$ của nghiệm Tikhonov là $\tfrac{1577}{180}\approx8{,}76$, nhưng $E$ của nghiệm không phạt là $\tfrac{36}{5}=7{,}2$. So $J$ với $E$ như cùng một thước đo không cho phép đánh giá trực tiếp mô hình nào khớp dữ liệu tốt hơn. Để so độ khớp dữ liệu, cần tính $E$ tại cả hai nghiệm; để so mục tiêu có phạt, cần dùng cùng $J$ và cùng hệ số phạt. Chính quy hóa **thay đổi mô hình** (đánh đổi khớp dữ liệu lấy hệ số nhỏ), không phải cải dạng tương đương của bài cũ.
:::

*(Tham chiếu: [Chính quy hóa trong hồi quy](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-chinh-quy-hoa), [Nghiệm hồi quy có chính quy hóa](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-so-sanh-chinh-quy), [Tổng bình phương sai số và chính quy hóa bậc hai](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-ls-l2); Boyd–Vandenberghe, §6.3.2, §4.4.1, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

### Bài 7. Ngưỡng triệt tiêu hệ số

**Mức:** Tính toán và chứng minh.

Xét $J_\lambda(w)=E(w)+\lambda(|a|+|b|)$, $\lambda\ge0$, với $E(w)=10(a-1)^2+5\left(b-\tfrac35\right)^2+\tfrac{36}{5}$ trên dữ liệu chung.

**a)** Bằng cách tách hai biến độc lập và xét dấu từng vùng, chứng minh nghiệm có công thức

$$a_\lambda=\max\left(1-\tfrac{\lambda}{20},\,0\right),\qquad b_\lambda=\max\left(\tfrac{6-\lambda}{10},\,0\right).$$

Đây là biến thể theo tham số của ví dụ $\ell_2^2+\ell_1$ trong ghi chú.

**b)** Tính nghiệm và mục tiêu tại $\lambda=6$ và $\lambda=20$; giải thích hiện tượng một hệ số bằng $0$ và thứ tự triệt tiêu giữa $a$ và $b$.

**c)** Chứng minh rằng với mọi $\lambda>0$, hàm $J_\lambda$ **lồi chặt** dù nó không khả vi tại các điểm có $a=0$ hoặc $b=0$.

::: hint
Câu a: bài tách thành $\min_s\alpha(s-\mu)^2+\lambda|s|$; xét vùng $s<0$, $s=0$, $s>0$; điều kiện nghiệm dương là $\lambda<2\alpha\mu$. Câu b: thay số vào công thức; ngưỡng triệt tiêu là giá trị $\lambda$ làm công thức về $0$. Câu c: tổng của hàm lồi chặt với hàm lồi là lồi chặt — dùng định nghĩa ngặt với $u\ne v$.
:::

::: solution
**a)** Vì hai số hạng của $E$ tách theo biến, bài tách thành hai bài một biến độc lập:

$$\min_a\ 10(a-1)^2+\lambda|a|,\qquad \min_b\ 5\left(b-\tfrac35\right)^2+\lambda|b|.$$

Xét bài chuẩn $\min_s\alpha(s-\mu)^2+\lambda|s|$ với $\alpha,\mu>0$. *Vùng $s<0$:* hàm $=\alpha(s-\mu)^2-\lambda s$, đạo hàm $2\alpha(s-\mu)-\lambda<0$ (vì $s-\mu<0$ và $-\lambda\le0$), hàm giảm trên vùng mở — không có điểm nhỏ nhất trong vùng. *Vùng $s>0$:* đạo hàm $2\alpha(s-\mu)+\lambda=0$ cho $s^\ast=\mu-\tfrac{\lambda}{2\alpha}$, hợp lệ (dương) khi và chỉ khi $\lambda<2\alpha\mu$. *Điểm $s=0$:* giá trị $\alpha\mu^2$. Nếu $\lambda\ge2\alpha\mu$: với $s>0$ đạo hàm $2\alpha(s-\mu)+\lambda\ge2\alpha s>0$, hàm tăng từ giá trị tại $0$, nên nhỏ nhất tại $s=0$. Nếu $\lambda<2\alpha\mu$: so giá trị tại $s^\ast$ với tại $0$:

$$\alpha\left(\tfrac{\lambda}{2\alpha}\right)^2+\lambda\left(\mu-\tfrac{\lambda}{2\alpha}\right)=\lambda\mu-\tfrac{\lambda^2}{4\alpha}\le\alpha\mu^2\iff \alpha\left(\mu-\tfrac{\lambda}{2\alpha}\right)^2\ge0,$$

luôn đúng (dấu bằng chỉ khi $\lambda=2\alpha\mu$, ngoài trường hợp đang xét). Kết luận $s^\ast=\max\left(\mu-\tfrac{\lambda}{2\alpha},0\right)$. Áp dụng: $a$: $\alpha=10,\mu=1\Rightarrow a_\lambda=\max(1-\tfrac{\lambda}{20},0)$; $b$: $\alpha=5,\mu=\tfrac35\Rightarrow b_\lambda=\max\left(\tfrac35-\tfrac{\lambda}{10},0\right)=\max\left(\tfrac{6-\lambda}{10},0\right)$. Công thức **chỉ** hợp lệ cho cấu trúc $X^{\mathsf T}X=\operatorname{diag}(10,5)$ của bộ dữ liệu này.

**b)** $\lambda=6$: $a_6=1-\tfrac6{20}=\tfrac7{10}$, $b_6=\max(0,0)=0$. Nghiệm $(\tfrac7{10},0)$ — hệ số chặn bị triệt tiêu. Mục tiêu: $E(\tfrac7{10},0)=10\left(\tfrac7{10}-1\right)^2+5\left(0-\tfrac35\right)^2+\tfrac{36}{5}=\tfrac9{10}+\tfrac95+\tfrac{36}{5}=\tfrac{99}{10}$; phạt $\lambda(|a|+|b|)=6\cdot\tfrac7{10}=\tfrac{21}{5}$; vậy $J_6=\tfrac{99}{10}+\tfrac{21}{5}=\tfrac{141}{10}$. $\lambda=20$: $a_{20}=\max(1-\tfrac{20}{20},0)=\max(0,0)=0$; với $b$: $(6-20)/10<0$ nên $b_{20}=0$; nghiệm $(0,0)$ — mô hình dự đoán bằng 0, mục tiêu $J_{20}=E(0,0)+0=10+5\cdot\tfrac9{25}+\tfrac{36}{5}=10+\tfrac95+\tfrac{36}{5}=19$. Hiện tượng: phạt chuẩn một đẩy hệ số về **đúng** $0$ khi $\lambda$ vượt ngưỡng $2\alpha\mu$ — ở đây $b$ về $0$ trước vì ngưỡng của $b$ ($\lambda=6$) nhỏ hơn của $a$ ($\lambda=20$), hệ số có "điểm tối ưu tự do" nhỏ hơn hoặc trọng số $\alpha$ nhỏ hơn bị triệt tiêu trước. Đây là tính chất của **bộ dữ liệu và cấu trúc này**, không bảo đảm cho mọi dữ liệu.

**c)** $E$ lồi chặt: với $u\ne v$ và $\theta\in(0,1)$, $E(\theta u+(1-\theta)v)<\theta E(u)+(1-\theta)E(v)$ (phần bậc hai xác định dương và phần affine không phá vỡ bất đẳng thức ngặt — cụ thể $w^{\mathsf T}X^{\mathsf T}Xw$ với $X$ hạng đầy cột cho chênh lệch $\theta(1-\theta)\|X(u-v)\|_2^2>0$ khi $u\ne v$). Hàm $\lambda(|a|+|b|)$ lồi (tổng các hàm lồi). Tổng của hàm lồi chặt với hàm lồi là lồi chặt:

$$J_\lambda(\theta u+(1-\theta)v)\le\theta J_\lambda(u)+(1-\theta)J_\lambda(v)-\theta(1-\theta)\|X(u-v)\|_2^2<\theta J_\lambda(u)+(1-\theta)J_\lambda(v),$$

với mọi $u,v\in\mathbb R^2$, $u\ne v$, $\theta\in(0,1)$, và $X$ hạng đầy cột nên $\|X(u-v)\|_2^2>0$. Bất đẳng thức đầu cộng hai bất đẳng thức định nghĩa của $E$ (lồi chặt) và của chuẩn một (lồi); bất đẳng thức sau là ngặt nhờ việc trừ số hạng dương $\theta(1-\theta)\|X(u-v)\|_2^2$. Tính không khả vi của $|\cdot|$ tại $0$ không cản trở **định nghĩa** lồi chặt — tính lồi là tính chất giá trị, không đòi hỏi trơn. (Với $\lambda=0$, $J_0=E$ vẫn lồi chặt.)
:::

*(Tham chiếu: [Tổng bình phương sai số và chính quy hóa chuẩn một](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-ls-l1); Boyd–Vandenberghe, §6.3.2, §6.5.4, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

### Bài 8. Giới hạn độ lớn hệ số

**Mức:** Tính toán và chứng minh.

Trên dữ liệu chung, xét bài toán trần cứng:

$$\min_w\ E(w)\quad\text{với}\quad \|w\|_2^2\le\tfrac{481}{900},$$

trong đó $\tfrac{481}{900}$ là **bình phương** chuẩn của nghiệm Tikhonov $\lambda=5$ ở Bài 6 (biến thể so với ví dụ $29/100$ của ghi chú).

**a)** Nhận dạng lớp bài toán (QCQP); xác định bán kính $R$ của hình tròn khả thi; chứng nhận tính lồi của mục tiêu và tập khả thi.

**b)** Chứng nhận tối ưu: dùng rằng $(\tfrac23,\tfrac3{10})$ là nghiệm toàn cục của $\min_w\big(E(w)+5\|w\|_2^2\big)$ với giá trị $J=\tfrac{343}{30}$ (Bài 6b), suy ra cận $E(w)+5\|w\|_2^2\ge\tfrac{343}{30}$, rồi chứng minh $w^\star=(\tfrac23,\tfrac3{10})$ tối ưu cho bài trần cứng với $E(w^\star)=\tfrac{1577}{180}$. Nêu rõ giới hạn của lập luận: trần **không** tương đương việc đặt $\lambda$ nói chung.

**c)** Xét hai trường hợp biên: $R=0$ và $R^2\ge\tfrac{34}{25}$. Nghiệm là gì trong từng trường hợp?

::: hint
Câu a: hàm $g(w)=w^{\mathsf T}w-R^2$ có Hessian $2I$; tập mức dưới của hàm lồi là tập lồi. Câu b: từ $E(w)+5\|w\|_2^2\ge J$ và $\|w\|_2^2\le\tfrac{481}{900}$ suy $E(w)\ge J-5\cdot\tfrac{481}{900}$; tính $J-5\cdot\tfrac{481}{900}$. Câu c: $R=0$ cho miền một điểm; $\tfrac{34}{25}=1+\tfrac9{25}=\|(1,\tfrac35)\|_2^2$.
:::

::: solution
**a)** Bài có mục tiêu bậc hai và ràng buộc bất đẳng thức bậc hai: đây là **QCQP** (quy hoạch bậc hai với ràng buộc bậc hai). Bán kính $R=\sqrt{481/900}=\tfrac{\sqrt{481}}{30}$. Chứng nhận: mục tiêu $E$ lồi (Bài 5a); hàm $g(w)=w^{\mathsf T}w-\tfrac{481}{900}$ có Hessian $2I\succ0$ nên lồi, tập mức $\{w\mid g(w)\le0\}$ là tập lồi (theo khung phần 1: với $u,v$ khả thi và $\theta\in[0,1]$, $\|\theta u+(1-\theta)v\|_2^2\le\theta\|u\|_2^2+(1-\theta)\|v\|_2^2\le R^2$). Vậy bài là QCQP lồi. Đơn vị: $481/900$ là bình phương bán kính, tức $R^2$; không nhầm với $R$.

**b)** Theo Bài 6b, $w^\star=(\tfrac23,\tfrac3{10})$ là nghiệm toàn cục của $\min_w\big(E(w)+5\|w\|_2^2\big)$ với giá trị $\tfrac{343}{30}$, nên với mọi $w$:

$$E(w)+5\|w\|_2^2\ \ge\ \tfrac{343}{30}.$$

Với mọi $w$ khả thi của bài trần cứng, $\|w\|_2^2\le\tfrac{481}{900}$, do đó

$$E(w)\ \ge\ \tfrac{343}{30}-5\|w\|_2^2\ \ge\ \tfrac{343}{30}-5\cdot\tfrac{481}{900}=\tfrac{343}{30}-\tfrac{481}{180}=\tfrac{2058-481}{180}=\tfrac{1577}{180}=E(w^\star).$$

Và $w^\star$ khả thi vì $\|w^\star\|_2^2=\tfrac49+\tfrac9{100}=\tfrac{400+81}{900}=\tfrac{481}{900}$ đúng bằng trần. Vậy $w^\star$ tối ưu, $E(w^\star)=\tfrac{1577}{180}$. **Giới hạn của lập luận:** trần cứng và phạt mềm là hai mô hình khác nhau; điều ta chứng minh là **tồn tại** một tham số ($\lambda=5$) mà nghiệm bài phạt trùng nghiệm bài trần — vì bán kính được chọn **chủ đích** bằng chuẩn của nghiệm bài phạt đó. Không được khẳng định "trần $R^2$ tương đương $\lambda=R$" hay dùng cách này như thuật toán quy đổi tổng quát; với bán kính khác, nghiệm hai bài nói chung khác nhau.

**c)** *$R=0$:* tập khả thi $\{w\mid\|w\|_2^2\le0\}=\{0\}$ chỉ có một điểm, nên nghiệm $w=0$, $E(0)=19$. *$R^2\ge\tfrac{34}{25}$:* nghiệm không ràng buộc $(1,\tfrac35)$ có $\|w\|_2^2=1+\tfrac9{25}=\tfrac{34}{25}$, nên khi $R^2\ge\tfrac{34}{25}$ nghiệm tự do **khả thi**; vì nghiệm không ràng buộc là giá trị nhỏ nhất toàn cục của $E$ trên toàn $\mathbb R^2$, nó cũng nhỏ nhất trên mọi tập con chứa nó. Vậy nghiệm là $(1,\tfrac35)$ với $E=\tfrac{36}{5}$ — ràng buộc trở nên không tác động (nghiệm nằm trong miền, có thể nằm trên biên nếu đẳng thức).
:::

*(Tham chiếu: [Hồi quy với giới hạn độ lớn hệ số](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-gioi-han-he-so), [Quy hoạch bậc hai với ràng buộc bậc hai](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-rang-buoc-bac-hai); Boyd–Vandenberghe, §4.4, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

## Phần 4: Quy hoạch hình học

### Bài 9. Thiết kế hộp kín

**Mức:** Vận dụng.

**Biến thể:** bài này dùng **thể tích 27 dm³** — biến thể của ví dụ hộp 8 dm³ trong bộ trang chiếu. Kích thước $a,b,c>0$ là số đo chuẩn hóa theo đơn vị $1\,\mathrm{dm}$ (để lấy logarit của số không thứ nguyên); chi phí tỷ lệ với diện tích bề mặt $S=2(ab+ac+bc)$.

**a)** Viết mô hình tối thiểu hóa $S$ với thể tích đúng 27 dm³; nhận dạng nó là GP với đẳng thức đơn thức $abc/27=1$. Chứng minh bài **không lồi** theo biến gốc $(a,b,c)$.

**b)** Đổi biến $A=\log a$, $B=\log b$, $C=\log c$; viết bài sau đổi biến và chứng minh nó lồi bằng kiến thức về logarit tổng hàm mũ đã học (trình bày ý chính của chứng minh Hessian, không cần khai triển đầy đủ).

**c)** Chứng minh bằng bất đẳng thức trung bình cộng – trung bình nhân rằng nghiệm là hộp lập phương cạnh $3\,\mathrm{dm}$ với $S_{\min}=54\,\mathrm{dm}^2$; trình bày cách khôi phục nghiệm từ giá trị logarit $\log 54$ và biến $A^\star=B^\star=C^\star=\log 3$, và cách báo cáo đơn vị. Cuối cùng: nếu yêu cầu đổi thành $abc\ge27$, nghiệm thay đổi không? Chứng minh.

::: hint
Câu a: thử hai điểm khả thi và trung điểm của chúng; xét Hessian của $S$ trên miền dương. Câu b: $\log$ của đơn thức cho hàm affine; $\log$ của tổng đơn thức dương cho logarit tổng hàm mũ; chứng minh lồi qua trọng số $\pi_k$ và dạng hiệp phương sai của Hessian. Câu c: bất đẳng thức trung bình cộng – trung bình nhân cho ba số $ab,ac,bc$; dấu bằng khi $ab=ac=bc$.
:::

::: solution
**a)** Mô hình:

$$\min_{a,b,c>0}\ 2(ab+ac+bc)\quad\text{với}\quad abc=27.$$

Chuẩn hóa đẳng thức: $abc/27=1$ — đơn thức (hệ số dương, số mũ thực) so với 1; mục tiêu $2ab+2ac+2bc$ là tổng ba đơn thức dương. Vậy bài đúng **dạng chuẩn GP**. Nhưng GP dạng chuẩn chưa chắc lồi theo biến gốc: (i) tập khả thi không lồi — hai điểm $(1,3,9)$ và $(9,3,1)$ đều có tích 27, trung điểm $(5,3,5)$ có tích $75\ne27$; (ii) hàm $S$ không lồi — Hessian $\begin{bmatrix}0&2&2\\2&0&2\\2&2&0\end{bmatrix}$ có trị riêng $4$ (vectơ $(1,1,1)$) và $-2$ (bội hai), có trị riêng âm nên $S$ không lồi trên miền dương.

**b)** Đặt $A=\log a$, $B=\log b$, $C=\log c$ (song ánh giữa $\mathbb R_{++}^3$ và $\mathbb R^3$). Đơn thức: $\log(abc/27)=A+B+C-\log27$ — affine. Tổng đơn thức dương:

$$\log S(e^{A},e^{B},e^{C})=\log\left(2e^{A+B}+2e^{A+C}+2e^{B+C}\right)$$

— logarit tổng hàm mũ với số mũ affine ($e^{A+B+\log2}$, v.v.). Bài sau đổi biến:

$$\min_{A,B,C\in\mathbb R}\ \log\left(2e^{A+B}+2e^{A+C}+2e^{B+C}\right)\quad\text{với}\quad A+B+C=\log27.$$

Tính lồi của $F(z)=\log\sum_{k=1}^{3} e^{\alpha_k^{\mathsf T}z+\beta_k}$ với $z=(A,B,C)^{\mathsf T}\in\mathbb R^3$; khai báo cụ thể $\alpha_1=(1,1,0)^{\mathsf T}$, $\alpha_2=(1,0,1)^{\mathsf T}$, $\alpha_3=(0,1,1)^{\mathsf T}$, $\beta_k=\log2$ với $k=1,2,3$. Đặt $Z=\sum_k e^{\alpha_k^{\mathsf T}z+\beta_k}$, $\pi_k=e^{\alpha_k^{\mathsf T}z+\beta_k}/Z>0$ với $\sum_k\pi_k=1$, và $\bar\alpha=\sum_k\pi_k\alpha_k\in\mathbb R^3$. Tính trực tiếp $\nabla F=\bar\alpha$ và

$$\nabla^2F=\sum_k\pi_k\alpha_k\alpha_k^{\mathsf T}-\bar\alpha\bar\alpha^{\mathsf T}=\sum_k\pi_k(\alpha_k-\bar\alpha)(\alpha_k-\bar\alpha)^{\mathsf T},$$

nên với mọi $v\in\mathbb R^3$, $v^{\mathsf T}\nabla^2Fv=\sum_{k=1}^{3}\pi_k\big[v^{\mathsf T}(\alpha_k-\bar\alpha)\big]^2\ge0$ — Hessian nửa xác định dương tại mọi điểm, $F$ lồi trên toàn $\mathbb R^3$. Đây là chứng minh trực tiếp; **không** được suy từ "log là hàm tăng". Logarit tăng chặt bảo toàn thứ tự giá trị dương, nên bài log tương đương bài gốc: nghiệm gốc $(a^\star,b^\star,c^\star)=(e^{A^\star},e^{B^\star},e^{C^\star})$ và $S_{\min}=e^{F(z^\star)}$ — hai giá trị mục tiêu **không** bằng nhau, chỉ là hàm mũ của nhau.

**c)** Bất đẳng thức trung bình cộng – trung bình nhân với ba số dương $ab,ac,bc$:

$$\frac{ab+ac+bc}{3}\ge\sqrt[3]{(ab)(ac)(bc)}=\sqrt[3]{a^2b^2c^2}=(abc)^{2/3}=27^{2/3}=9,$$

dấu bằng khi và chỉ khi $ab=ac=bc$; chia cho $abc>0$ cho $1/c=1/b=1/a$, tương đương $a=b=c$. Vậy $ab+ac+bc\ge27$, do đó $S=2(ab+ac+bc)\ge54$, và lập phương $(3,3,3)$ khả thi ($abc=27$) đạt đúng $54$: $S_{\min}=54\,\mathrm{dm}^2$. Khôi phục từ bài log: giá trị tối ưu log là $\log54$ (lưu ý $\log54\ne3\log3$, vì $3\log3=\log27$); biến log $A^\star=B^\star=C^\star=\log3$; lấy hàm mũ cho $S_{\min}=e^{\log54}=54$ và $(a,b,c)=(e^{\log3},e^{\log3},e^{\log3})=(3,3,3)$ — giá trị mục tiêu log một mình chưa đủ xác định ba kích thước; tính duy nhất của nghiệm (dấu bằng của bất đẳng thức trung bình cộng – trung bình nhân buộc $a=b=c$) mới khép lại lập luận. Báo cáo kích thước theo dm, diện tích theo dm², **không** báo giá trị logarit như kết quả cuối. *Biến thể $abc\ge27$:* ràng buộc viết thành $\dfrac{27}{abc}\le1$ — vẫn GP. Nếu $abc>27$, thu nhỏ đều ba kích thước theo hệ số $\alpha=(27/abc)^{1/3}<1$ cho tích đúng 27 và mọi cặp tích $ab,ac,bc$ giảm theo $\alpha^2$, nên $S$ giảm. Do đó nghiệm tối ưu vẫn đạt thể tích đúng 27 và cạnh 3, $S_{\min}=54$ — đổi yêu cầu sang “ít nhất” không làm thay đổi nghiệm; ràng buộc thể tích vẫn đạt dấu bằng.
:::

*(Tham chiếu: [Mô hình thiết kế hộp](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-hop-mo-hinh), [Cải dạng bài toán thiết kế hộp](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-hop-log), [Kích thước hộp tối ưu](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-hop-nghiem); Boyd–Vandenberghe, §4.5, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

### Bài 10. Phân bổ công suất

**Mức:** Vận dụng.

Dùng dữ liệu công suất trong bộ trang chiếu: $p_1,p_2>0$ (đơn vị chuẩn hóa), ngân sách $p_1+p_2\le6$, nhiễu nền 1, chất lượng hai đường:

$$S_1(p)=\frac{p_1}{1+p_2/4},\qquad S_2(p)=\frac{p_2}{1+3p_1/2}.$$

Mục tiêu: $\max_{p>0}\min\{S_1,S_2\}$ với ràng buộc ngân sách.

**a)** Đặt ngưỡng $t>0$ và cải dạng thành GP: tối thiểu $1/t$ với các ràng buộc dạng tổng đơn thức dương; rồi đặt $v_i=\log p_i$, $s=\log t$ để viết dạng lồi. Chứng minh tính tương đương max–min qua ngưỡng (hai chiều).

**b)** Kiểm tra $(p_1,p_2)=(3,3)$: tính $S_1,S_2$. Rồi chứng minh $t^\star=1$ đạt tại $(p_1,p_2)=(2,4)$ bằng lập luận: nếu $t>1$ thì các ràng buộc ngưỡng có dấu ngặt cho $p_1>2$, $p_2>4$, mâu thuẫn ngân sách. Kiểm tra trực tiếp $S_1=S_2=1$ tại nghiệm.

**c)** Cố định ngưỡng $t=1$ và thay ngân sách bởi $p_1+p_2\le B$ với $B>0$. Chứng minh hệ ràng buộc khả thi khi và chỉ khi $B\ge6$. Kết quả này có chứng minh $t^\star=1$ trong bài tối ưu ngưỡng khi $B>6$ không? Kiểm tra chất lượng của phương án $(2\rho,4\rho)$ với $\rho=B/6$.

::: hint
Câu a: $t\le p_1/(1+p_2/4)\iff t(1+p_2/4)\le p_1$, chia cho $p_1>0$; sau đổi log, các vế trái là logarit tổng hàm mũ. Câu b: thế hai bất đẳng thức ngưỡng vào nhau. Câu c: với $t=1$, các ràng buộc là hệ bất đẳng thức **tuyến tính** theo $p$; giải hệ $p_1\ge1+p_2/4$, $p_2\ge1+\tfrac32p_1$.
:::

::: solution
**a)** Với $t>0$: $t\le S_1(p)\iff t(1+p_2/4)\le p_1\iff tp_1^{-1}+\tfrac14tp_2p_1^{-1}\le1$ (chia cho $p_1>0$); tương tự $tp_2^{-1}+\tfrac32tp_1p_2^{-1}\le1$; ngân sách $(p_1+p_2)/6\le1$. Vì $t>0$, $\max t\iff\min t^{-1}$ (nghịch đảo giảm chặt trên số dương; giá trị hai mục tiêu nghịch đảo nhau, không bằng nhau). Bài GP:

$$\min_{p_1,p_2,t>0}\ t^{-1}\quad\text{với}\quad tp_1^{-1}+\tfrac14tp_2p_1^{-1}\le1,\ \ tp_2^{-1}+\tfrac32tp_1p_2^{-1}\le1,\ \ (p_1+p_2)/6\le1.$$

*Tương đương hai chiều:* chiều thuận, với mỗi $p$ khả thi chọn $t=\min\{S_1,S_2\}>0$ thì $(p,t)$ khả thi với mục tiêu $t^{-1}$; chiều ngược, mọi $(p,t)$ khả thi có $\min\{S_1,S_2\}\ge t$. Tại tối ưu ngưỡng phải chạm chất lượng nhỏ nhất (nếu $t<\min$ thì tăng $t$ giảm mục tiêu — mâu thuẫn). Vậy hai bài cùng chất lượng tối ưu; lấy khối $p$ khôi phục phương án. *Đổi log* $v_i=\log p_i$, $s=\log t$:

$$\min\ -s\quad\text{với}\quad \log\left(e^{s-v_1}+\tfrac14e^{s+v_2-v_1}\right)\le0,\ \ \log\left(e^{s-v_2}+\tfrac32e^{s+v_1-v_2}\right)\le0,\ \ \log\left(e^{v_1}+e^{v_2}\right)\le\log6.$$

Mục tiêu affine, các vế trái là logarit tổng hàm mũ của biểu thức affine — lồi (theo chứng minh Hessian của Bài 9b). Bài **không phải LP**. Khôi phục $p_i=e^{v_i}$, $t=e^s$.

**b)** $(3,3)$: $S_1=\dfrac{3}{1+3/4}=\dfrac{12}{7}\approx1{,}71$; $S_2=\dfrac{3}{1+9/2}=\dfrac{6}{11}\approx0{,}55$ — chất lượng yếu nhất chỉ $\tfrac6{11}$, chia đều chưa tốt. *Chứng minh $t^\star=1$ tại $(2,4)$:* để đạt $t=1$ phải có $p_1\ge1+\tfrac{p_2}4$ và $p_2\ge1+\tfrac32p_1$. Thế bất đẳng thức hai vào một:

$$p_1\ge1+\tfrac14\left(1+\tfrac32p_1\right)=\tfrac54+\tfrac38p_1\ \Rightarrow\ \tfrac58p_1\ge\tfrac54\ \Rightarrow\ p_1\ge2,\qquad p_2\ge1+\tfrac32\cdot2=4.$$

Cùng ngân sách $p_1+p_2\le6$ với $p_1\ge2$, $p_2\ge4$ buộc $p=(2,4)$. Kiểm tra: $S_1=2/(1+4/4)=1$, $S_2=4/(1+3\cdot2/2)=4/4=1$. *Loại $t>1$:* nếu $t>1$, hai ràng buộc ngưỡng phải **ngặt**: $p_1>1+\tfrac{p_2}4$, $p_2>1+\tfrac32p_1$; thế vào nhau cho $p_1>\tfrac54+\tfrac38p_1$, tức $p_1>2$ và $p_2>4$, nên $p_1+p_2>6$ — mâu thuẫn ngân sách. Vậy không phương án nào đạt chất lượng lớn hơn 1: $t^\star=1$, mục tiêu GP $t^{-1}=1$, mục tiêu log $=0$.

**c)** Với $t=1$ cố định, các ràng buộc $p_1\ge1+\tfrac{p_2}4$ và $p_2\ge1+\tfrac32p_1$ là **tuyến tính** theo $p$. *Chiều khả thi ⇒ $B\ge6$:* từ lập luận câu b (chỉ dùng hai bất đẳng thức, không dùng ngân sách), mọi $p$ thỏa hai ràng buộc đều có $p_1\ge2$ và $p_2\ge4$, nên $p_1+p_2\ge6$; kết hợp $p_1+p_2\le B$ buộc $B\ge6$. *Chiều $B\ge6$ ⇒ khả thi:* điểm $p=(2,4)$ thỏa hai ràng buộc ngưỡng (dấu bằng cả hai) và $p_1+p_2=6\le B$, nên khả thi (và $p>0$). Vậy khả thi $\iff B\ge6$. *Về $B>6$:* kết quả khả thi ở trên **không** chứng minh $t^\star=1$ khi $B>6$ — trả lời: không. Phản ví dụ: với $B>6$, chọn $p=(2\rho,4\rho)$ với $\rho=B/6>1$ thì ngân sách $2\rho+4\rho=B$ thỏa, và $S_1=\dfrac{2\rho}{1+\rho}>1\iff \rho>1$, đồng thời $S_2=\dfrac{4\rho}{1+3\rho}>1\iff 4\rho>1+3\rho\iff \rho>1$. Vậy cả hai chất lượng đều vượt $1$, nên $t^\star>1$ khi $B>6$: nghiệm thay đổi so với trường hợp $B=6$.
:::

*(Tham chiếu: [Mô hình chất lượng đường truyền](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-cong-suat-mo-hinh), [Cải dạng bài phân bổ công suất](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-cong-suat-chuan), [Dạng lồi của bài phân bổ công suất](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-cong-suat-log), [Nghiệm phân bổ công suất](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-cong-suat-nghiem); Boyd–Vandenberghe, §4.5, Bài tập 4.20, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

## Phần 5: Xấp xỉ lồi và nới lỏng

### Bài 11. Ngưỡng phân loại và hàm bản lề

**Mức:** Vận dụng.

Dữ liệu đúng như ghi chú: $u=(-2,-1,1,2)$, $y=(-1,+1,-1,+1)$; điểm số $s_\theta(u)=u-\theta$; biên có dấu $r_i(\theta)=y_i(u_i-\theta)$, $r_i\le0$ là lỗi (kể cả $r=0$).

**a)** Lập bảng số lỗi $E(\theta)$ theo các khoảng và mốc $\theta$ cần thiết; chứng minh $E$ không lồi bằng phản ví dụ trung điểm.

**b)** Tính $H(\theta)=\sum_i\max(0,1-r_i(\theta))$ tại $\theta=-\tfrac32$, $0$, $\tfrac32$ và tại các biên cần thiết; chứng minh $\min_\theta H=4$ đạt trên đúng đoạn $[-1,1]$, và $\min_\theta E=1$ đạt trên $(-2,-1)\cup(1,2)$.

**c)** Viết cải dạng LP của $H$ bằng biến phụ $\xi\in\mathbb R^4$ (với $\theta\in\mathbb R$, $i=1,\dots,4$) và chứng minh tương đương hai chiều. Sau đó chứng minh bất đẳng thức $\ell_{01}(r)\le\max(0,1-r)$ với $\ell_{01}(r)=1$ khi $r\le0$, $=0$ khi $r>0$. Tại nghiệm tối ưu của $H$, số lỗi là bao nhiêu; tại nghiệm tối ưu của $E$, giá trị $H$ là bao nhiêu? Rút ra kết luận: hai mục tiêu không tương đương và điều này không hứa tổng quát hóa.

::: hint
Câu a: lỗi của từng điểm là các điều kiện $\theta\le-2$, $\theta\ge-1$, $\theta\le1$, $\theta\ge2$; ghép theo khoảng, chú ý quy ước mốc là lỗi. Câu b: viết bốn số hạng tường minh; hai số hạng "giữa" có tổng $\ge4$ với mọi $\theta$. Câu c: $\xi_i\ge1-y_i(u_i-\theta)$, $\xi_i\ge0$; quan hệ đúng là $\min E\le\min H$; chứng minh $\ell_{01}(r)\le\max(0,1-r)$ theo hai trường hợp $r\le0$ và $r>0$.
:::

::: solution
**a)** Điều kiện lỗi từng điểm: điểm 1 ($u=-2,y=-1$): $r_1=2+\theta\le0\iff\theta\le-2$; điểm 2 ($u=-1,y=+1$): $r_2=-1-\theta\le0\iff\theta\ge-1$; điểm 3 ($u=1,y=-1$): $r_3=\theta-1\le0\iff\theta\le1$; điểm 4 ($u=2,y=+1$): $r_4=2-\theta\le0\iff\theta\ge2$. Bảng (mốc tính là lỗi):

| Khoảng $\theta$ | Điểm lỗi | $E(\theta)$ |
|---|---|---|
| $\theta\le-2$ | 1, 3 | 2 |
| $-2<\theta<-1$ | 3 | 1 |
| $-1\le\theta\le1$ | 2, 3 | 2 |
| $1<\theta<2$ | 2 | 1 |
| $\theta\ge2$ | 2, 4 | 2 |

Không lồi: $E(-\tfrac32)=E(\tfrac32)=1$ nhưng $E(0)=2>\tfrac12\cdot1+\tfrac12\cdot1=1$ — vi phạm bất đẳng thức lồi tại trung điểm. Nhãn xen kẽ khiến một ngưỡng không phân loại đúng cả bốn điểm.

**b)** Bốn số hạng: $H(\theta)=\max(0,-1-\theta)+\max(0,2+\theta)+\max(0,2-\theta)+\max(0,\theta-1)$. Tính:
- $\theta=-\tfrac32$: $0{,}5+0{,}5+3{,}5+0=4{,}5$;
- $\theta=0$: $0+2+2+0=4$;
- $\theta=\tfrac32$: $0+3{,}5+0{,}5+0{,}5=4{,}5$;
- biên $\theta=-1$: $0+1+3+0=4$; $\theta=1$: $0+3+1+0=4$.

*Chứng minh $\min H=4$ trên $[-1,1]$:* hai số hạng giữa $\max(0,2+\theta)+\max(0,2-\theta)\ge4$ với mọi $\theta$ (bằng 4 khi $|\theta|\le2$, lớn hơn ngoài đó); hai số hạng ngoài dương khi $\theta<-1$ và $\theta>1$ tương ứng. Trên $[-1,1]$ cả hai số hạng ngoài bằng 0 nên $H=4$; ngoài đoạn đó ít nhất một số hạng ngoài dương nên $H>4$. Vậy mọi $\theta\in[-1,1]$ tối ưu cho $H$, $\min H=4$. *Chứng minh $\min E=1$:* từ bảng câu a, $E=1$ trên $(-2,-1)\cup(1,2)$ và $E\ge2$ ngoài đó; tại biên $E=2$ (quy ước mốc là lỗi), nên giá trị tối ưu 1 đạt trên hai khoảng mở.

**c)** LP:

$$\min_{\theta,\xi}\ \sum_{i=1}^4\xi_i\quad\text{với}\quad \xi_i\ge1-y_i(u_i-\theta),\ \ \xi_i\ge0,\ i=1,\dots,4.$$

*Cận cho số lỗi và cải dạng $H$:* trước hết chứng minh $\ell_{01}(r)\le\max(0,1-r)$ theo hai trường hợp. Nếu $r\le0$: $\ell_{01}(r)=1\le1-r\le\max(0,1-r)$ (vì $1-r\ge1$). Nếu $r>0$: $\ell_{01}(r)=0\le\max(0,1-r)$ hiển nhiên. Chiều thuận, với mọi $\theta$ chọn $\xi_i=\max(0,1-y_i(u_i-\theta))$ thì khả thi và mục tiêu $=H(\theta)$; chiều ngược, mọi $(\theta,\xi)$ khả thi có $\xi_i\ge\max(0,1-r_i)$ nên $\sum\xi_i\ge H(\theta)$. Vậy giá trị tối ưu LP $=\min H=4$; mục tiêu và ràng buộc affine nên là LP. *So sánh nghiệm:* mọi $\theta\in[-1,1]$ đều tối ưu cho $H$ và có $E=2$; với $\theta\in(-2,-1)\cup(1,2)$, $H=3+|\theta|\in(4,5)$. Do đó tại **mọi** nghiệm tối ưu của $H$, số lỗi $E=2$ — không chỉ ở ví dụ $\theta=0$. Ngược lại, tối ưu $E$ đạt trên $(-2,-1)\cup(1,2)$ với $E=1$; giá trị $H$ tại những điểm đó là $3+|\theta|\in(4,5)$, bằng $\tfrac92$ chỉ tại $\theta=\pm\tfrac32$. Kết luận: mặc dù $\ell_{01}(r)\le\max(0,1-r)$ tại **mọi** $r$ nên $E(\theta)\le H(\theta)$ mọi $\theta$, hai bài tối ưu cho nghiệm khác nhau — quan hệ đúng chỉ là $\min E\le\min H$ ($1\le4$), nên tối ưu $H$ không cung cấp cận dưới cho $\min E$ và không bảo đảm giảm số lỗi nhiều nhất. Đây là **hàm thay thế** (đổi mục tiêu), không phải cải dạng; và mọi kết luận chỉ trên tập huấn luyện — không hứa tổng quát hóa sang dữ liệu mới.
:::

*(Tham chiếu: [Mô hình giảm số lỗi phân loại](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-dem-loi), [Hàm mất mát bản lề](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-ban-le), [Nghiệm của hàm thay thế](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-nghiem-phan-loai), [Cải dạng hàm bản lề thành LP](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-ban-le-lp); Boyd–Vandenberghe, §8.6.1, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

### Bài 12. Nới lỏng bài toán chọn gói

**Mức:** Vận dụng.

**Biến thể:** cấu trúc phủ đúng như bộ trang chiếu (ba gói, ba bối cảnh, ràng buộc $x_1+x_3\ge1$, $x_1+x_2\ge1$, $x_2+x_3\ge1$, $x$ nhị phân), nhưng **giá là biến thể tự tạo** $(2,3,4)$ triệu đồng cho gói 1, 2, 3 — không phải dữ liệu thị trường, cũng không phải bộ giá 2 triệu/gói của bộ trang chiếu.

**a)** Viết mô hình nhị phân với $x=(x_1,x_2,x_3)\in\{0,1\}^3$ và giá mới; liệt kê toàn bộ phương án khả thi và chi phí tương ứng (gói 1 phủ ngày khô/đêm khô; gói 2 phủ đêm khô/mưa; gói 3 phủ ngày khô/mưa); chứng minh tập khả thi không lồi.

**b)** Nới lỏng $x\in\{0,1\}^3$ thành $x\in[0,1]^3$; chứng minh nghiệm tối ưu LP là $x^R=(\tfrac12,\tfrac12,\tfrac12)$ với giá trị $\tfrac92$ triệu đồng, bằng cách chứng nhận cận dưới $\tfrac32\cdot(\text{ràng buộc 1})+\tfrac12\cdot(\text{ràng buộc 2})+\tfrac52\cdot(\text{ràng buộc 3})$.

**c)** Khôi phục phương án nhị phân: chứng minh $(1,1,0)$ khả thi với giá 5 triệu; giải thích vì sao làm tròn xuống của $x^R$ không khả thi và làm tròn lên cho cả ba gói giá 9 triệu chưa tối ưu. Ghép cận để kết luận về $p^\star$.

::: hint
Câu a: kiểm tra 8 bộ nhị phân. Câu b: tìm hệ số không âm $\alpha,\beta,\gamma$ sao cho mục tiêu $2x_1+3x_2+4x_3=\alpha(x_1+x_3)+\beta(x_1+x_2)+\gamma(x_2+x_3)$; khi đó cận $=\alpha+\beta+\gamma$. Câu c: khung $L\le p^\star\le U$.
:::

::: solution
**a)** Mô hình:

$$\min_x\ 2x_1+3x_2+4x_3\ \text{(triệu đồng)}\quad\text{với}\quad x_1+x_3\ge1,\ x_1+x_2\ge1,\ x_2+x_3\ge1,\ x_j\in\{0,1\}.$$

Kiểm tra 8 bộ: $(0,0,0)$ vi phạm cả ba; $(1,0,0)$ vi phạm mưa; $(0,1,0)$ vi phạm ngày khô; $(0,0,1)$ vi phạm đêm khô; bốn bộ còn lại khả thi:

| Phương án | Kiểm tra | Chi phí (triệu) |
|---|---|---|
| $(1,1,0)$ | $1,2,1\ge1$ | $2+3=5$ |
| $(1,0,1)$ | $2,1,1\ge1$ | $2+4=6$ |
| $(0,1,1)$ | $1,1,2\ge1$ | $3+4=7$ |
| $(1,1,1)$ | $2,2,2\ge1$ | $9$ |

Tập khả thi

$$F=\{(1,1,0),\,(1,0,1),\,(0,1,1),\,(1,1,1)\}$$

rời rạc, không lồi: trung điểm của $(1,1,0)$ và $(1,0,1)$ là $(1,\tfrac12,\tfrac12)$ không nhị phân. Mục tiêu và ràng buộc affine nhưng **không phải LP** vì miền nhị phân.

**b)** Bài nới lỏng: giữ mục tiêu và ba ràng buộc phủ, thay $x_j\in\{0,1\}$ bằng $0\le x_j\le1$ — LP đúng nghĩa, tập khả thi $R\supseteq F$ lồi, nên $\min_R f\le\min_F f=p^\star$ (cận dưới). *Chứng nhận cận:* tìm tổ hợp hệ số không âm của ba ràng buộc tái tạo mục tiêu:

$$2x_1+3x_2+4x_3=\tfrac32(x_1+x_3)+\tfrac12(x_1+x_2)+\tfrac52(x_2+x_3),$$

kiểm tra: hệ số $x_1$: $\tfrac32+\tfrac12=2$; $x_2$: $\tfrac12+\tfrac52=3$; $x_3$: $\tfrac32+\tfrac52=4$. Với mọi điểm khả thi của LP:

$$2x_1+3x_2+4x_3\ \ge\ \tfrac32\cdot1+\tfrac12\cdot1+\tfrac52\cdot1=\tfrac92.$$

Đạt tại $x^R=(\tfrac12,\tfrac12,\tfrac12)$: cả ba ràng buộc đều $=1$, từng $x_j$ thuộc $[0,1]$, chi phí $2\cdot\tfrac12+3\cdot\tfrac12+4\cdot\tfrac12=\tfrac92$. Vậy $x^R$ tối ưu LP, $L=\tfrac92$. Lưu ý $x_j=\tfrac12$ không phải tỷ lệ ảnh hay xác suất mua — chỉ là giá trị biến trong bài nới lỏng.

**c)** Khôi phục: *làm tròn xuống* cho $(0,0,0)$ — không mua gói nào, cả ba bối cảnh thiếu, **bất khả thi**. *Làm tròn lên* cho $(1,1,1)$ — khả thi nhưng giá 9 triệu, cao hơn mức cần thiết. *Phương án tốt hơn:* $(1,1,0)$ khả thi (bảng câu a) với giá 5 triệu. *Ghép cận:* $L=\tfrac92\le p^\star\le U=5$ (với $U$ từ phương án $(1,1,0)$). Khác với ví dụ giá đều của bộ trang chiếu, ở đây **mọi phương án nhị phân đều có giá nguyên (triệu đồng)** vì ba giá $2,3,4$ đều nguyên và $x_j\in\{0,1\}$, nên $p^\star\in\mathbb Z$. Kết hợp $p^\star\in\{5,6,7,9\}$ (liệt kê câu a) và $p^\star\le5$, và $\tfrac92\le p^\star\in\mathbb Z$ buộc $p^\star\ge5$: vậy $p^\star=5$ — nghiệm tối ưu $(1,1,0)$, có thể kiểm tra độc lập bằng liệt kê. Bài học: cận dưới từ LP và cận trên từ phương án khả thi luôn có; để khép khoảng cần thêm cấu trúc (như tính nguyên của chi phí ở đây) hoặc liệt kê đầy đủ.
:::

*(Tham chiếu: [Mô hình chọn gói dữ liệu](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-mo-hinh-nhi-phan), [Nới lỏng điều kiện nhị phân](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-noi-long-lp), [Nghiệm phân số của bài nới lỏng](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-nghiem-phan-so), [Cận dưới và chứng nhận nghiệm](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-chung-nhan-can); Boyd–Vandenberghe, Bài tập 4.15, [Boyd–Vandenberghe (2004)](https://web.stanford.edu/~boyd/cvxbook/).)*

## Phần 6: Tổng hợp và vận dụng

**Mục tiêu (LLO3, gắn CLO1).** Sau khi hoàn thành phần này, người học tự thực hiện trọn vẹn chu trình "nhận dạng → cải dạng/xấp xỉ → chứng nhận lồi → kiểm tra nghiệm trong ngữ cảnh" cho một mô hình mới: nhận dạng LP/QP/QCQP/GP từ cấu trúc mục tiêu và ràng buộc; cải dạng hoặc xấp xỉ kèm giả thiết và quan hệ với bài gốc; chứng nhận mục tiêu và tập khả thi lồi, rồi diễn giải nghiệm theo nhu cầu ban đầu.

### Bài 13. Giới hạn số đặc trưng

**Mức:** Tính toán và chứng minh.


Trang chiếu liên quan: [Giới hạn số đặc trưng](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-gioi-han-dac-trung), [Miền giới hạn đặc trưng không lồi](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-mien-khong-loi), [Thay bằng hình phạt chuẩn một](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-phat-chuan-mot). Ý tưởng nguồn: Boyd–Vandenberghe (2004), §6.5.4 (biểu diễn thưa) và §6.3.2 (chính quy hóa); nội dung và dữ liệu dưới đây là biên soạn của học phần, không phải bản dịch nguyên đề.

**Đề bài.** Cho dữ liệu $u_i\in\mathbb R^d$, $y_i\in\{\pm1\}$, $i=1,\dots,m$, và số nguyên dương $k$ với $m,d$ nguyên dương, $d\ge2$, $1\le k<d$. Biến $w\in\mathbb R^d$, $b\in\mathbb R$ (tự do, không bị phạt/đếm):

$$H(w,b)=\sum_{i=1}^m \max\bigl(0,\,1-y_i(w^Tu_i+b)\bigr),\qquad \min_{w,b}\ H(w,b)\quad\text{với}\quad \|w\|_0\le k,$$

trong đó $\|w\|_0=\#\{j: w_j\ne0\}$.

**a)** Chứng minh $\|\cdot\|_0$ không phải một chuẩn trên $\mathbb R^d$, và với $1\le k<d$, tập $F=\{w:\|w\|_0\le k\}$ không lồi. Nêu riêng hai trường hợp $k=0$ và $k=d$.

**b)** Chứng minh rằng bài toán trên **không phải bài toán lồi**, mặc dù hàm mất mát $H$ lồi.

**c)** Xét mô hình thay thế $\min_{w,b}\ H(w,b)+\lambda\|w\|_1$ với $\lambda>0$ chọn trước. Cải dạng thành LP bằng biến phụ; chứng minh tương đương hai chiều giữa LP và bài có phạt. Mô hình thay thế có bảo đảm $\|w\|_0\le k$ không? Phát biểu cẩn thận quan hệ của cải dạng này với ràng buộc đếm của bài gốc.

::: hint
**a)** Chuẩn phải thỏa tính thuần nhất $\|\alpha x\|=|\alpha|\|x\|$; thử $x=e_1$, $\alpha=2$. Cho không lồi: theo phần 1, tập lồi phải chứa trung điểm của hai điểm bất kỳ thuộc tập; chọn hai vectơ có tập hỗ trợ khác nhau độ lớn $k$ sao cho trung điểm dùng $k+1$ đặc trưng.

**b)** Một bài toán lồi cần **cả** mục tiêu lồi **lẫn** tập khả thi lồi (bốn bước chứng nhận ở mục "Chứng nhận một bài toán lồi" của ghi chú); hãy kiểm từng thành phần.

**c)** Thay $|w_j|$ bằng biến phụ $t_j$ (không nhầm với biến dư) với hai bất đẳng thức $t_j\ge w_j$, $t_j\ge -w_j$ (cùng kỹ thuật biến phụ ở phần 2), và thay phần bản lề bằng $\xi_i\ge0$, $\xi_i\ge 1-y_i(w^Tu_i+b)$. Kiểm tra chiều thuận (lựa chọn biến phụ tối ưu) và chiều ngược (mọi bộ khả thi cho mục tiêu không nhỏ hơn).
:::

::: solution
**a) Không phải chuẩn; $F$ không lồi.** *Không phải chuẩn:* lấy $e_1=(1,0,\dots,0)$, khi đó $\|e_1\|_0=1$ nhưng $\|2e_1\|_0=1\ne2=2\|e_1\|_0$: tính thuần nhất bị vi phạm, nên $\|\cdot\|_0$ chỉ là một cách đếm, không phải chuẩn.

*Không lồi với $1\le k<d$:* đặt các vectơ
$$v^{(1)}:\ v^{(1)}_j=1\ \text{khi}\ j\in S_1=\{1,\dots,k\},\ 0\ \text{khi không};\qquad v^{(2)}:\ v^{(2)}_j=1\ \text{khi}\ j\in S_2=\{1,\dots,k-1\}\cup\{k+1\},\ 0\ \text{khi không}.$$
Mỗi vectơ dùng đúng $k$ đặc trưng nên $v^{(1)},v^{(2)}\in F$. Trung điểm $M=\tfrac12(v^{(1)}+v^{(2)})$ có hệ số $1$ tại $k-1$ vị trí chung và hệ số $\tfrac12$ tại hai vị trí riêng, nên $\|M\|_0=(k-1)+2=k+1>k$: $M\notin F$. Tồn tại hai điểm thuộc $F$ có trung điểm không thuộc $F$, vậy $F$ không lồi. (Khi $k=1$, phần chung rỗng và $S_2=\{2\}$, tức đúng hình hai trục trong ghi chú với $A=(1,0)$, $B=(0,1)$, $M=(\tfrac12,\tfrac12)$.) *Trường hợp biên:* $k=0$ thì $F=\{0\}$ lồi; $k=d$ thì $F=\mathbb R^d$ lồi — hai trường hợp này không nằm trong phạm vi giả thiết $1\le k<d$.

**b) Không phải bài toán lồi.** Mục tiêu $H(w,b)$ lồi: mỗi hàm $\max(0,1-y_i(w^Tu_i+b))$ là hợp của hàm lồi $\max(0,\cdot)$ với hàm affine theo $(w,b)$; tổng các hàm lồi là lồi. Tuy nhiên tập khả thi $T=\{(w,b):\|w\|_0\le k\}$ **bằng** $F\times\mathbb R$ với $F=\{w:\|w\|_0\le k\}$: mọi $w\in F$ hợp với mọi $b\in\mathbb R$ đều khả thi và ngược lại. Tích Cartesian không lồi khi một thành phần không lồi (lấy hai điểm trong $F\times\{0\}$ có trung điểm thoát $F$, như câu a), vậy $T$ không lồi. (Trực tiếp: $(v^{(1)},0)$ và $(v^{(2)},0)$ khả thi nhưng trung điểm $(M,0)$ với $M\notin F$.) Vậy bài toán **không lồi**: mục tiêu lồi nhưng tập khả thi không lồi.

**c) Cải dạng LP.** Xét bài có phạt
$$\min_{w,b}\ H(w,b)+\lambda\|w\|_1,\qquad \lambda>0.$$
Viết hệ với biến $w\in\mathbb R^d$, $b\in\mathbb R$, $\xi\in\mathbb R^m$, $t\in\mathbb R^d$:
$$\begin{aligned}
\min_{w,b,\,\xi,\,t}\;&\sum_{i=1}^m\xi_i+\lambda\sum_{j=1}^d t_j\\
\text{với}\quad&\xi_i\ge0,\quad \xi_i\ge 1-y_i(w^Tu_i+b),\quad i=1,\dots,m,\\
&t_j\ge w_j,\quad t_j\ge -w_j,\quad j=1,\dots,d.
\end{aligned}$$
Mục tiêu và mọi ràng buộc đều affine: đây là **LP**.

*Chiều thuận:* với mọi $(w,b)$, chọn $\xi_i=\max(0,1-y_i(w^Tu_i+b))$ và $t_j=|w_j|$ (tối thiểu hóa từng biến phụ độc lập) — mọi ràng buộc thỏa và mục tiêu đúng bằng $H(w,b)+\lambda\|w\|_1$.

*Chiều ngược:* mọi bộ $(w,b,\xi,t)$ khả thi có $\xi_i\ge\max(0,1-y_i(w^Tu_i+b))$ và $\sum_j t_j\ge\sum_j |w_j|=\|w\|_1$ (vì $t_j\ge\max(w_j,-w_j)=|w_j|$), nên mục tiêu $\ge H(w,b)+\lambda\|w\|_1$ (nhân với $\lambda>0$ bảo toàn bất đẳng thức).

Vậy hai bài có cùng giá trị tối ưu, và từ nghiệm LP lấy $(w,b)$ khôi phục nghiệm của bài có phạt.

*Quan hệ với ràng buộc đếm:* phạt chuẩn một **không phải cải dạng chính xác** của ràng buộc $\|w\|_0\le k$: mô hình thay thế lồi và giải được, nhưng chỉ *khuyến khích* hệ số bằng 0, **không bảo đảm** $\|w\|_0\le k$. Hai giá trị $H$ và $H+\lambda\|w\|_1$ không cùng thước đo; nghiệm của bài có phạt phải được kiểm tra lại bằng mục tiêu và ràng buộc của bài gốc, không dùng chung lập luận khôi phục như trên.
:::

### Bài 14. Kiểm định mô hình thay thế

**Mức:** Vận dụng tổng hợp.


Trang chiếu liên quan: [Miền giới hạn đặc trưng không lồi](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-mien-khong-loi), [Thay bằng hình phạt chuẩn một](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-phat-chuan-mot), [Tổng kết bài giảng](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-ket-bai). Ý tưởng nguồn: Boyd–Vandenberghe, [§6.2](https://web.stanford.edu/~boyd/cvxbook/) và [§6.3.2](https://web.stanford.edu/~boyd/cvxbook/) (xấp xỉ chuẩn một, chính quy hóa); dữ liệu bốn điểm đối xứng dưới đây là minh họa tự biên soạn của học phần.

**Đề bài.** Dữ liệu bốn điểm đối xứng:
$$u_1=(1,0),y_1=1;\quad u_2=(-1,0),y_2=-1;\quad u_3=(0,1),y_3=1;\quad u_4=(0,-1),y_4=-1.$$
Biến $w=(w_1,w_2)\in\mathbb R^2$, $b\in\mathbb R$ **tự do**; $\lambda=1$; $J(w,b)=H(w,b)+\|w\|_1$.

**a)** Chứng minh rằng nghiệm của $\min_{w,b}J(w,b)$ duy nhất là $w=(1,1)$, $b=0$, với $J=2$; kết luận rằng nghiệm này dùng 2 đặc trưng.

**b)** Giải bài giới hạn **cứng** $k=1$: $\min_{w,b} H(w,b)$ với $\|w\|_0\le1$ (không có phạt). Chứng minh giá trị tối ưu bằng $2$, đạt tại $w=(1,0)$, $b=0$; rồi chứng minh rằng với **mọi** phương án bỏ một tọa độ, mất mát của cặp điểm tương ứng luôn $\ge2$ (giải thích vì sao không thể có nghiệm tốt hơn trong mô hình cứng).

**c)** Tổng hợp: phân biệt bốn phép xử lý đã học trong bộ bài — **cải dạng tương đương**, **thay mất mát**, **thêm hình phạt**, **nới lỏng miền** — và nêu ở bài nào trong bộ bài mỗi phép xuất hiện, kèm ý nghĩa "bảo đảm / không bảo đảm" của từng phép.

::: hint
**a)** Dùng cận theo từng tọa độ: cặp điểm đối xứng $1,2$ cho hai bản lề $\max(0,1-w_1-b)$ và $\max(0,1-w_1+b)$; đặt $a=1-w_1-b$, $c=1-w_1+b$ và chú ý $a+c=2(1-w_1)$, rồi dùng $\max(0,a)+\max(0,c)\ge 2\max\bigl(0,\tfrac{a+c}{2}\bigr)$. Sau đó xét ba trường hợp dấu của $w_j$ cho bất đẳng thức $2\max(0,1-w_j)+|w_j|\ge1$. Dấu bằng buộc $w_j=1$.

**b)** Trong mô hình cứng, một trong hai tọa độ bằng 0; hai bản lề của cặp điểm tương ứng tọa độ bị bỏ là $\max(0,1-b)+\max(0,1+b)$ và luôn $\ge2$ bất kể $b$. Tính trực tiếp giá trị tại $w=(1,0),b=0$ để chứng nhận đạt cận.
:::

::: solution
**a) Nghiệm duy nhất của bài có phạt.**

*Bước 1 — cận dưới theo từng tọa độ.* Điểm 1, 2 cho hai bản lề $\max(0,1-w_1-b)$ và $\max(0,1-w_1+b)$. Đặt $a=1-w_1-b$, $c=1-w_1+b$; khi đó $a+c=2(1-w_1)$. Vì $\phi(s)=\max(0,s)$ lồi,
$$\max(0,a)+\max(0,c)\ \ge\ 2\,\phi\!\left(\tfrac{a+c}{2}\right)=2\max(0,1-w_1).$$
Tương tự, điểm 3, 4 cho $\ge 2\max(0,1-w_2)$. Vậy với mọi $(w,b)$:
$$H(w,b)\ \ge\ \sum_{j=1}^2 2\max(0,1-w_j).$$

*Bước 2 — bất đẳng thức ba trường hợp.* Với mọi $w_j$:
- $w_j<0$: $2\max(0,1-w_j)+|w_j|=2(1-w_j)+(-w_j)=2-3w_j>2\ge1$;
- $0\le w_j\le1$: $2(1-w_j)+w_j=2-w_j\ge1$;
- $w_j>1$: $0+w_j=w_j>1$.

Vậy $2\max(0,1-w_j)+|w_j|\ge1$ với mọi $w_j$.

*Bước 3 — ghép với $\lambda=1$:*
$$J(w,b)=H(w,b)+\|w\|_1\ \ge\ \sum_{j=1}^2\bigl[2\max(0,1-w_j)+|w_j|\bigr]\ \ge\ 2.$$

*Bước 4 — đạt cận và duy nhất.* Tại $w=(1,1)$, $b=0$: bản lề từng điểm là $\max(0,1-1)=0$, nên $H=0$; $\|w\|_1=2$; $J=2$. Vậy giá trị tối ưu bằng 2. Xét nghiệm đạt cận: tổng hai thành phần ở bước 3 bằng 2 buộc mỗi thành phần bằng 1; theo ba trường hợp ở bước 2, dấu bằng chỉ xảy ra khi $w_j=1$. Vậy mọi nghiệm có $w_1=w_2=1$. Với $w=(1,1)$, bản lề điểm 1 là $\max(0,1-(1+b))=\max(0,-b)$ và điểm 2 là $\max(0,b)$, tổng $\max(0,-b)+\max(0,b)=|b|$; tương tự điểm 3, 4 cho $|b|$. Suy ra $H((1,1),b)=2|b|$ và $J(b)=2+2|b|$, nhỏ nhất **duy nhất** tại $b=0$.

*Kết luận:* nghiệm duy nhất $w=(1,1)$, $b=0$, $J=2$; vectơ $w$ có **2** hệ số khác 0 — nếu đặt mục tiêu chỉ dùng tối đa $k=1$ đặc trưng, nghiệm này **vi phạm** giới hạn đếm. Đây là phản ví dụ mạnh cho ý "phạt $\lambda>0$ bảo đảm $\|w\|_0\le k$" (khớp phân tích ở bài 13c).

**b) Mô hình giới hạn cứng $k=1$, không phạt.** Ràng buộc $\|w\|_0\le1$ nghĩa là $w=(w_1,0)$ hoặc $w=(0,w_2)$.

*Xét $w=(w_1,0)$:* tọa độ thứ hai bằng 0, nên cặp điểm 3, 4 cho hai đối số bản lề $1-y_3b=1-b$ (điểm 3) và $1-y_4b=1+b$ (điểm 4); tổng hai điểm là
$$\max(0,1-b)+\max(0,1+b)\ \ge\ (1-b)+(1+b)=2$$
(vì $\max(0,s)\ge s$ với mọi $s$). Vậy $H\ge2$ với mọi $w_1$ và mọi $b$. Cặp điểm 1, 2 khi đó cho $\max(0,1-w_1-b)+\max(0,1-w_1+b)$: chọn $w_1=1$, $b=0$ thì phần này bằng 0. Vậy tại $w=(1,0)$, $b=0$: $H=0+0+1+1=2$. Hoàn toàn đối xứng, $w=(0,1)$, $b=0$ cũng cho $H=2$.

*Chứng minh cận dưới đầy đủ:* với mọi $(w,b)$ khả thi ($\|w\|_0\le1$), một trong hai tọa độ bằng 0; cặp điểm tương ứng với tọa độ bằng 0 cho tổng hai bản lề $\max(0,1-b)+\max(0,1+b)\ge2$. Vậy $H\ge2$ trên toàn miền khả thi, và giá trị tối ưu bằng 2, đạt tại $w=(1,0)$, $b=0$ (hoặc $w=(0,1)$, $b=0$) — nghiệm dùng đúng 1 đặc trưng. (Không cần phân loại dấu bằng của cận: cận $\ge2$ với mọi $b$ và một điểm đạt cận là đủ.)

*Giải thích vì sao "bỏ tọa độ thì mất mát cặp đó $\ge2$":* khi $w_j=0$, hai bản lề của cặp điểm đối xứng trên trục $j$ chỉ còn phụ thuộc $b$, và $\max(0,1-b)+\max(0,1+b)\ge(1-b)+(1+b)=2$ — bất kể $b$. Đây là lý do định lượng: mô hình cứng $k=1$ không thể đạt $H<2$ trên dữ liệu này, trong khi mô hình có phạt đạt $H=0$ nhưng phải trả giá $\|w\|_1=2$ và vi phạm giới hạn đếm. Hai mô hình có mục tiêu khác nhau nên giá trị số không so sánh trực tiếp.

**c) Tổng hợp bốn phép xử lý.**

| Phép xử lý | Bản chất | Xuất hiện ở | Bảo đảm gì / không bảo đảm gì |
|---|---|---|---|
| Cải dạng tương đương | Viết lại bài toán bằng biến phụ, giữ giá trị tối ưu và khôi phục nghiệm gốc qua phép chiếu bỏ biến phụ | Bài 3 (biến dư đưa về dạng chuẩn LP), Bài 4 (cải dạng L1/minimax), Bài 11 (biến phụ LP), Bài 13c (LP cho bài có phạt) | Bảo đảm hai bài cùng giá trị tối ưu; cần chứng minh tương đương hai chiều |
| Thay mất mát | Đổi hàm mục tiêu sang mất mát khác (cùng dữ liệu) | Bài 4 (L1 so với minimax; đối chiếu bình phương ở Bài 5), Bài 11 (H so với E: nghiệm khác nhau) | Không bảo đảm cùng nghiệm; phải đối chiếu nghiệm theo từng tiêu chí |
| Thêm hình phạt | Cộng $\lambda R(w)$ vào mục tiêu với $R$ lồi và $\lambda\ge0$; với $L,R$ lồi thì mục tiêu $L+\lambda R$ lồi | Bài 6, 7 (chính quy hóa), Bài 13c, Bài 14a (phạt chuẩn một) | Phạt **không** đồng nghĩa "gộp ràng buộc" hay tự động làm mục tiêu lồi trong mọi tình huống; ở các bài đang xét là cộng $\lambda R$ với hàm $L,R$ lồi nên mục tiêu lồi. Phạt chuẩn một có thể tạo hệ số bằng 0; phạt bình phương chuẩn hai chủ yếu thu nhỏ hệ số; không bảo đảm thỏa ràng buộc gốc (Bài 13c, 14a: nghiệm vi phạm $\|w\|_0\le k$) |
| Nới lỏng miền | Giữ nguyên mục tiêu, mở rộng tập khả thi để bài dễ giải | Bài 12 (bỏ ràng buộc nhị phân, $x\in[0,1]^3$) | Cho cận dưới **chỉ khi giữ nguyên mục tiêu và mở rộng tập khả thi**; nghiệm nới lỏng có thể không khả thi cho bài gốc, phải làm tròn/kiểm lại (Bài 12). Bài 13 thay đếm bằng phạt là **thay mục tiêu**, không phải nới lỏng thuần túy, nên không gắn cận dưới cho bài đếm |

Chu trình sáu thành phần cần tự đi đủ cho mỗi mô hình: **dữ liệu, biến, mục tiêu, ràng buộc, chứng nhận, ý nghĩa nghiệm** — và khi nghiệm của mô hình thay thế được tìm ra, phải kiểm tra lại bằng mục tiêu và ràng buộc của bài gốc, không đọc giá trị có phạt như giá trị bài gốc.
:::

**Đọc ôn và nguồn tham khảo**

| Bài | Chủ đề | Mục ghi chú bài giảng (Bài 02) | Boyd–Vandenberghe (2004) |
|---|---|---|---|
| 1 | Nghiệm, infimum trên miền có trần | Phần 1 — Mô hình hóa: dữ liệu, biến, miền, nghiệm và infimum | §4.1–4.2 (bài toán tối ưu lồi, định nghĩa nghiệm) |
| 2 | Phản ví dụ tập không lồi | Phần 1 — Chứng nhận tính lồi của tập và hàm | §4.1–4.2 |
| 3 | Pha trộn, dạng chuẩn LP | Phần 2 — LP: mô hình hóa và dạng chuẩn | §4.3 |
| 4 | Hồi quy: cải dạng L1 và minimax | Phần 2 — Hồi quy sai số tuyệt đối và minimax | §4.3; §6.1.1 |
| 5 | Hồi quy bình phương tối thiểu | Phần 3 — QP: hồi quy bình phương tối thiểu | §4.4; §6.1.1 |
| 6 | Chính quy hóa L1/L2² | Phần 3 — Chính quy hóa và Tikhonov | §4.4; §6.3.2 |
| 7 | Phạt chuẩn một theo $\lambda$, hoàn thành bình phương | Phần 3 — Phạt chuẩn một, ví dụ 3.5 (biến thể) | §6.3.2 |
| 8 | Trần cứng $\|w\|^2\le R^2$, QCQP | Phần 3 — Giới hạn cứng độ lớn hệ số | §4.4 (QCQP) |
| 9 | Hộp kín thể tích, GP và bất đẳng thức trung bình cộng – trung bình nhân | Phần 4 — GP: thiết kế hộp, đổi biến log | §4.5 |
| 10 | Phân bổ công suất hai đường truyền | Phần 4 — GP: phân bổ công suất (bài 4.20 của Boyd là ý tưởng nguồn) | §4.5; bài 4.20 (ý tưởng) |
| 11 | Phân loại ngưỡng: H so với E | Phần 5 — Xấp xỉ lồi: phân loại và mất mát | §6.1.1; §8.6.1 (phân loại tuyến tính, ý tưởng) |
| 12 | Phủ tập yêu cầu, nới lỏng nhị phân | Phần 5 — Nới lỏng và làm tròn (bài 4.15 ý tưởng nới lỏng) | bài 4.15 (ý tưởng nới lỏng) |
| 13 | Giới hạn $\|w\|_0\le k$, phạt chuẩn một | Phần 6 — Giới hạn số đặc trưng; Thay bằng hình phạt chuẩn một | §6.2; §6.3.2; §6.5.4 (biểu diễn thưa) |
| 14 | Chuyển giao mô hình thưa, bốn phép xử lý | Phần 6 — Miền không lồi; Thay bằng hình phạt chuẩn một; Tổng kết | §6.2; §6.3.2 |

Ghi chú nguồn: bài 10 dùng ý tưởng công suất từ bài 4.20 và cải dạng GP §4.5; bài 12 dùng ý tưởng nới lỏng từ bài 4.15 của Boyd–Vandenberghe; bối cảnh và toàn bộ dữ liệu số của 14 bài là biên soạn của học phần, không phải bản dịch nguyên đề của Boyd. Liên kết Boyd dùng trang chính thức: [Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/). Ghi chú đầy đủ: [Ghi chú Bài 02](material-viewer.html?doc=materials/lec-02/lecture-note.md&deck=lecture-02-cac-bai-toan-toi-uu-loi.html).
