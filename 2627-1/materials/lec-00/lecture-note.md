# Bài 00 — Ôn tập nền tảng toán học cho AI

Câu hỏi trung tâm của Bài 00 là: **từ bốn căn nhà đã quan sát, tìm trọng số của một mô hình giá và dự đoán giá của một căn nhà mới kèm mức bất định.** Để trả lời, chúng ta dùng ba nền tảng toán học, bao gồm:

- đại số tuyến tính để biểu diễn dữ liệu bằng vector và ma trận, và để biết khi nào một hệ phương trình có nghiệm;
- giải tích nhiều biến để tìm trọng số làm hàm mất mát nhỏ nhất;
- xác suất để mô tả phần giá mà mô hình không giải thích được và tính một dải chứa giá thật với xác suất cho trước.

## Câu hỏi mở đầu

Giả sử chúng ta quan sát bốn căn nhà, giá tính theo đơn vị $100$ triệu đồng:

- căn 1: $40\,\mathrm m^2$, $1$ phòng ngủ, giá $11$;
- căn 2: $50\,\mathrm m^2$, $2$ phòng ngủ, giá $12$;
- căn 3: $60\,\mathrm m^2$, $2$ phòng ngủ, giá $14$;
- căn 4: $70\,\mathrm m^2$, $3$ phòng ngủ, giá $19$.

Hai mô hình dự đoán giá theo diện tích và số phòng ngủ được khớp trên bốn căn này.

- Mô hình thứ nhất $\hat y=w_0+w_1a+w_2b$, với diện tích $a$ và số phòng ngủ $b$, có ba trọng số; tổng bình phương sai lệch giữa giá dự đoán và giá quan sát của nó bằng $4$.
- Mô hình thứ hai $\hat y=w_0+w_1a+w_2b+w_3a^2$ có bốn trọng số và cho đúng cả bốn giá quan sát.

Với một căn nhà $65\,\mathrm m^2$, $2$ phòng ngủ, mô hình thứ nhất dự đoán giá $16$ ($1{,}6$ tỷ đồng), mô hình thứ hai dự đoán $15{,}75$.

**Câu hỏi.** Nên dùng dự đoán nào cho căn nhà $65\,\mathrm m^2$, và giá thật của căn nhà này có thể lệch khỏi dự đoán bao nhiêu?

Một câu trả lời hấp dẫn là: dùng mô hình thứ hai, vì nó đúng ở cả bốn căn đã biết, nên giá $15{,}75$ là chính xác. Câu trả lời này sai vì ba lý do:

- mô hình thứ hai có bốn trọng số cho bốn phương trình với ma trận hệ số vuông, khả nghịch, nên nó khớp đúng bốn giá bất kỳ; việc khớp đúng vì thế không cho thêm thông tin về căn nhà thứ năm;
- giá quan sát còn chứa phần do các yếu tố không được đo (vị trí, chất lượng, thời điểm bán, thương lượng), và một mô hình cho đúng cả bốn giá đã khớp luôn cả phần này;
- một con số dự đoán không cho biết giá thật lệch khỏi nó bao nhiêu; muốn có một dải chứa giá thật, ta cần một mô hình xác suất cho phần sai lệch.

Để trả lời câu hỏi, chúng ta cần biết khi nào hệ phương trình của bốn căn nhà có nghiệm, trọng số nào làm tổng bình phương sai lệch nhỏ nhất, và phân phối nào mô tả phần sai lệch còn lại.

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Biểu diễn một tập dữ liệu nhỏ bằng vector đặc trưng, ma trận thiết kế, vector trọng số và vector phần dư, và kiểm tra kích thước của mọi phép nhân ma trận.
2. Xác định không gian cột, hạt nhân, hạng và tính xác định dương của một ma trận nhỏ, rồi dùng chúng để kết luận về số nghiệm của một hệ tuyến tính và của bài toán bình phương nhỏ nhất.
3. Tính gradient, ma trận Jacobian, ma trận Hessian và khai triển Taylor bậc hai của một hàm nhiều biến; giải bài toán bình phương nhỏ nhất từ điều kiện gradient bằng không và phân loại điểm dừng bằng Hessian.
4. Tính xác suất, kỳ vọng và phương sai từ hàm khối, hàm mật độ hoặc hàm phân phối tích lũy, bằng tổng hoặc tích phân; phân biệt nhiễu với phần dư và chứng minh rằng hợp lý cực đại dưới nhiễu Gauss độc lập dẫn tới bài toán bình phương nhỏ nhất.
5. Tính phân phối biên, phân phối có điều kiện, xác suất hậu nghiệm theo công thức Bayes và ma trận hiệp phương sai từ một bảng phân phối đồng thời; nêu điều kiện để dùng bình phương nhỏ nhất tổng quát.
6. Dự đoán giá trị cho một quan sát mới kèm dải nhiễu, và nhận ra nguy cơ quá khớp khi số trọng số bằng số mẫu.

## Kiến thức tiên quyết

Bài 00 dùng kiến thức phổ thông và ba học phần tiên quyết: Giải tích 1, Xác suất thống kê, Đại số tuyến tính cho kỹ thuật. Các chứng minh của bài dùng đúng các sự kiện sau.

- **Hàm một biến và đạo hàm.** Giới hạn, đạo hàm và quy tắc dây chuyền một biến $(\chi\circ\iota)'(t)=\chi'(\iota(t))\,\iota'(t)$.
- **Điều kiện cực trị một biến.** Nếu $\gamma$ khả vi tại điểm trong $t_0$ của miền xác định và đạt cực tiểu địa phương tại đó thì $\gamma'(t_0)=0$.
- **Khai triển Taylor một biến.** Nếu $\gamma$ khả vi liên tục hai lần trên một khoảng mở chứa $0$ thì $\gamma(t)=\gamma(0)+\gamma'(0)t+\tfrac12\gamma''(0)t^2+o(t^2)$ khi $t\to0$.
- **Tích phân xác định một biến** và công thức Newton–Leibniz $\int_a^b\psi'(x)\,dx=\psi(b)-\psi(a)$.
- **Hệ phương trình tuyến tính nhỏ** và phép khử Gauss (Gaussian elimination).
- **Không gian con, cơ sở và số chiều.** Không gian con của $\mathbb R^m$, cơ sở của nó và số chiều $\dim$ (số vector của một cơ sở).
- **Hàm của các biến độc lập.** Nếu các biến ngẫu nhiên $U_1,\ldots,U_k$ độc lập thì $\psi_1(U_1),\ldots,\psi_k(U_k)$ độc lập, với mọi hàm $\psi_i$ sao cho $\psi_i(U_i)$ là biến ngẫu nhiên.
- **Xác suất cổ điển.** Khi các kết quả của một phép thử đồng khả năng, xác suất của một biến cố bằng số kết quả thuận lợi chia cho số kết quả.

**Câu hỏi ôn nhanh.**

1. Tính đạo hàm của hàm $t\mapsto(1+2t)^2$ tại $t=1$.
2. Giải hệ $x_1+x_2=3$, $x_1-x_2=1$.
3. Gieo một xúc xắc đều. Tính xác suất ra mặt lớn hơn $4$.

::: hint Lời giải câu hỏi ôn nhanh
1. Đạo hàm là $2(1+2t)\cdot2=4(1+2t)$, bằng $12$ tại $t=1$.
2. Cộng hai phương trình: $2x_1=4$, nên $(x_1,x_2)=(2,1)$.
3. Hai mặt thuận lợi ($5$ và $6$) trong sáu mặt: xác suất bằng $2/6=1/3$.
:::

## 1. Thiết lập bài toán

Bài toán của bài gồm các thành phần sau.

1. **Dữ liệu.** Bốn bộ $(a_i,b_i,y_i)$, $i=1,\ldots,4$: diện tích $a_i$ (đơn vị $\mathrm m^2$), số phòng ngủ $b_i$ và giá quan sát $y_i$ (đơn vị $100$ triệu đồng) của căn nhà thứ $i$.
2. **Mô hình.** Giá dự đoán là một tổ hợp tuyến tính của các đặc trưng tính từ $(a_i,b_i)$, với vector trọng số $w$ chưa biết.
3. **Đại lượng đã quan sát và chưa quan sát.** Diện tích, số phòng ngủ và giá của bốn căn đã quan sát. Vị trí, chất lượng, thời điểm bán và thương lượng ảnh hưởng tới giá nhưng không được đo; trong mô hình xác suất, phần giá do các yếu tố này tạo ra được gom thành một biến ngẫu nhiên gọi là *nhiễu* (noise).
4. **Cơ chế sinh dữ liệu.** Trong mô hình xác suất, giá ngẫu nhiên của căn $i$ là $Y_i=w_{\mathrm{true}}^T\phi_i+\varepsilon_i$, với trọng số sinh dữ liệu $w_{\mathrm{true}}$ chưa biết và nhiễu $\varepsilon_i$; giá quan sát $y_i$ là một giá trị của $Y_i$.
5. **Mục tiêu.** Tìm trọng số $w$ làm giá dự đoán gần giá quan sát nhất theo một thước đo đã chọn; với căn nhà mới $65\,\mathrm m^2$, $2$ phòng ngủ, đưa ra một giá dự đoán và một dải chứa giá thật với xác suất cho trước.
6. **Đối tượng so sánh.** Hai mô hình của câu hỏi mở đầu: mô hình ba trọng số và mô hình bốn trọng số có thêm số hạng bậc hai của diện tích.

Sai lệch giữa giá dự đoán và giá quan sát, gọi là phần dư, có ba nguồn, bao gồm:

- dạng mô hình sai (*sai đặc tả*, misspecification) hoặc trọng số chưa phù hợp;
- giá hay diện tích bị đo hoặc ghi sai;
- các yếu tố không được đo: vị trí, chất lượng, thời điểm bán, thương lượng.

Một phần dư quan sát được gộp cả ba nguồn. Với một dạng mô hình cố định, đại số tuyến tính và giải tích chọn trọng số tốt nhất. Mô hình xác suất gom nguồn thứ hai và thứ ba thành nhiễu; giả thiết (P1) dưới đây coi dạng mô hình là đúng.

Các đại lượng của bài chia theo nguồn ngẫu nhiên như sau.

| Loại | Đại lượng |
|---|---|
| Cố định | dữ liệu đặc trưng $\phi_i$, $\phi_{\mathrm{new}}$; trọng số sinh dữ liệu $w_{\mathrm{true}}$; phương sai nhiễu $\sigma^2$ |
| Ngẫu nhiên theo mô hình xác suất | nhiễu $\varepsilon_i$; giá $Y_i$ và giá căn mới $Y_{\mathrm{new}}$; nghiệm $w_{\mathrm{LS}}$ khi được tính từ $Y_1,\ldots,Y_4$ |

## 2. Ký hiệu và giả thiết

Vô hướng và vector viết chữ thường, ma trận viết chữ hoa, không in đậm; mọi vector là vector cột. Biến ngẫu nhiên viết chữ hoa, giá trị quan sát của nó viết chữ thường; riêng nhiễu $\varepsilon_i$ chỉ cả biến ngẫu nhiên lẫn giá trị của nó, như Murphy (2022). Dấu thập phân là dấu phẩy. Kích thước khác với bảng được ghi tại chỗ.

| Ký hiệu | Ý nghĩa | Phạm vi, giả thiết |
|---|---|---|
| $m$; $n$ | số mẫu; số đặc trưng | $m=4$, $n=3$ cho bốn căn nhà |
| $a_i$, $b_i$, $y_i$ | diện tích, số phòng ngủ, giá quan sát của căn $i$ | $i=1,\ldots,4$; dữ liệu cố định |
| $a_i'$, $b_i'$ | đặc trưng đã đổi thang: $a_i'=(a_i-55)/10$, $b_i'=b_i-2$ | toàn bài |
| $\phi_i$ | vector đặc trưng $(1,a_i',b_i')^T$ của căn $i$ | $\mathbb R^3$ |
| $w$; $w^{(0)}$; $w_{\mathrm{LS}}$; $w_{\mathrm{true}}$ | vector trọng số $(w_0,w_1,w_2)^T$; trọng số thử $(14,1,1)^T$; nghiệm bình phương nhỏ nhất; trọng số sinh dữ liệu | $\mathbb R^3$; $w_{\mathrm{true}}$ không quan sát được |
| $X$; $y$ | ma trận thiết kế (hàng $i$ là $\phi_i^T$); vector giá | $X\in\mathbb R^{4\times3}$, $y\in\mathbb R^4$; $X$ chỉ dùng cho ma trận thiết kế |
| $\hat y=Xw$; $r(w)=Xw-y$ | vector dự đoán; vector phần dư | quy ước $r_i=\hat y_i-y_i$ |
| $f(w)$ | mất mát bình phương $\tfrac12\lVert Xw-y\rVert_2^2$ | $w\in\mathbb R^3$ |
| $\mathbb R^n$, $\mathbb R^{m\times n}$, $\mathbb S^n$, $\mathbb S^n_{++}$ | vector $n$ chiều, ma trận $m\times n$, ma trận đối xứng, ma trận đối xứng xác định dương | — |
| $A$; $c$ | ma trận cho trước; vector cho trước (vế phải của hệ tuyến tính, phần tịnh tiến của phép biến đổi affine) | kích thước ghi tại chỗ |
| $A^T$, $A^{-1}$, $I_n$, $e_i$ | chuyển vị, nghịch đảo, ma trận đơn vị, vector đơn vị thứ $i$ | $A^{-1}$ khi $A$ vuông, khả nghịch |
| $\operatorname{Col}$, $\operatorname{Ker}$, $\operatorname{rank}$, $\operatorname{span}$, $\det$, $\operatorname{tr}$ | không gian cột, hạt nhân, hạng, bao tuyến tính, định thức, vết | — |
| $\varrho$; $\mathcal W$ | hạng của một ma trận cho trước; một không gian con | — |
| $u^Tv$; $\lVert x\rVert_1$, $\lVert x\rVert_2$, $\lVert A\rVert_F$; $\langle A,B\rangle_F$ | tích vô hướng; chuẩn $\ell_1$, chuẩn $\ell_2$, chuẩn Frobenius; tích trong Frobenius | — |
| $A\succeq0$, $A\succ0$; $q(x)=x^TAx$ | nửa xác định dương, xác định dương; dạng toàn phương | $A\in\mathbb S^n$ |
| $A=Q\Lambda Q^T$; $\lambda_i$, $\lambda_{\min}$, $\lambda_{\max}$ | phân rã trị riêng; giá trị riêng | $A\in\mathbb S^n$, $Q$ trực giao |
| $h$; $F$ | hàm vô hướng $\mathbb R^n\to\mathbb R$; ánh xạ vector $\mathbb R^n\to\mathbb R^m$ | ví dụ chung: $h(u,v)=u^2+uv+2v^2+u-2v$, $F(u,v)=(u+v,uv,u-v)^T$ |
| $\nabla h$, $\nabla^2h$, $J_F$, $D_dh$ | gradient (vector cột), ma trận Hessian, ma trận Jacobian, đạo hàm theo hướng | $\lVert d\rVert_2=1$ trong $D_dh$ |
| $o(\cdot)$; $C^1$, $C^2$ | ký hiệu o nhỏ; khả vi liên tục một lần, hai lần | — |
| $\chi$; $K$ | hàm vô hướng ngoài, ánh xạ ngoài trong hàm hợp | — |
| $\gamma(t)=h(x+td)$; $\eta$; $g$ | hàm hạn chế lên một đường thẳng; độ dài bước; vector gradient $\nabla f(w)$ trong một bước | $t\in\mathbb R$; $\eta>0$ |
| $\psi$; $(x,y)$ trong 5.9 | hàm được lấy tích phân hoặc kỳ vọng; biến tích phân | — |
| $(\Omega,\mathcal F,\Pr)$, $E$ | không gian xác suất, biến cố | — |
| $U$, $V$; $p_U$, $F_U$; $\mathbb E$, $\operatorname{Var}$, $\operatorname{Cov}$ | biến ngẫu nhiên vô hướng; hàm khối hoặc hàm mật độ, hàm phân phối tích lũy; kỳ vọng, phương sai, hiệp phương sai | — |
| $Z$; $\mu$, $\Sigma$, $\rho$ | vector ngẫu nhiên; kỳ vọng, ma trận hiệp phương sai, hệ số tương quan | $\Sigma\in\mathbb S^n_{++}$ trong mật độ Gauss |
| $Y_i$; $\varepsilon_i$; $\sigma^2$; $G$ | giá ngẫu nhiên; nhiễu; phương sai nhiễu; biến Gauss chuẩn $\mathcal N(0,1)$ | $\sigma^2>0$; $\log$ là logarit tự nhiên |
| $L(w)$; $\mathcal L_\tau$ | hàm hợp lý; tập mức $\{x:h(x)=\tau\}$ | — |
| $\Sigma_\varepsilon$; $J_{\mathrm{GLS}}$ | ma trận hiệp phương sai của vector nhiễu; mục tiêu bình phương nhỏ nhất tổng quát | $\Sigma_\varepsilon\in\mathbb S^m_{++}$ đã biết |

Các giả thiết đại số và tối ưu dùng trong bài:

- **(A1) Hạng cột đầy đủ.** Các cột của ma trận thiết kế độc lập tuyến tính.
- **(A2) Độ trơn.** Hàm được xét thuộc lớp $C^1$ hoặc $C^2$ trên một tập mở, ghi rõ trong từng kết quả.

Các giả thiết xác suất dùng trong bài:

- **(P1) Nhiễu Gauss độc lập.** $Y_i=w_{\mathrm{true}}^T\phi_i+\varepsilon_i$, với $\varepsilon_1,\ldots,\varepsilon_m$ độc lập, cùng phân phối $\mathcal N(0,\sigma^2)$ và $\sigma^2>0$ cố định.
- **(P2) Nhiễu Gauss tương quan.** Vector nhiễu có phân phối Gauss nhiều biến với ma trận hiệp phương sai $\Sigma_\varepsilon\in\mathbb S^m_{++}$ đã biết.

## 3. Ví dụ xuyên suốt: bốn căn nhà

Ứng dụng của bài là bài toán dự đoán giá nhà từ diện tích và số phòng ngủ. Ví dụ sau cố định dữ liệu và dạng mô hình.

::: example Ví dụ 00.1 (Bốn căn nhà)
**Dữ liệu.** Giả sử bốn căn nhà có diện tích, số phòng ngủ và giá (đơn vị $100$ triệu đồng) như sau.

| Căn | $a_i$ ($\mathrm m^2$) | $b_i$ | $y_i$ | $a_i'=(a_i-55)/10$ | $b_i'=b_i-2$ |
|---:|---:|---:|---:|---:|---:|
| 1 | $40$ | $1$ | $11$ | $-1{,}5$ | $-1$ |
| 2 | $50$ | $2$ | $12$ | $-0{,}5$ | $0$ |
| 3 | $60$ | $2$ | $14$ | $0{,}5$ | $0$ |
| 4 | $70$ | $3$ | $19$ | $1{,}5$ | $1$ |

**Mô hình.** Với vector đặc trưng $\phi_i=(1,a_i',b_i')^T$ và trọng số $w=(w_0,w_1,w_2)^T$, giá dự đoán của căn $i$ là
$$
\hat y_i=w_0+w_1a_i'+w_2b_i'.
$$

**Ý nghĩa của trọng số.**
- $w_0$ là giá dự đoán của căn $55\,\mathrm m^2$, $2$ phòng ngủ, ứng với $a'=b'=0$.
- $w_1=\partial\hat y/\partial a'$ là mức tăng giá dự đoán khi diện tích tăng $10\,\mathrm m^2$ và số phòng giữ nguyên.
- $w_2=\partial\hat y/\partial b'$ là mức tăng giá dự đoán khi thêm một phòng ngủ và diện tích giữ nguyên.

**Căn nhà mới.** Căn $65\,\mathrm m^2$, $2$ phòng ngủ có $a'=(65-55)/10=1$, $b'=0$, nên $\phi_{\mathrm{new}}=(1,1,0)^T$.

**Kiểm tra lại.** $a_1'=(40-55)/10=-1{,}5$ và $b_4'=3-2=1$, khớp bảng.
:::

Phép dịch tâm làm cột $a'$ và cột $b'$ có tổng bằng $0$: $-1{,}5-0{,}5+0{,}5+1{,}5=0$ và $-1+0+0+1=0$.

Muốn so sánh hai bộ trọng số, chúng ta cần một con số đo độ khớp trên cả bốn căn. Một cách trực quan, phần dư $r_i$ là độ dài một cạnh, và $r_i^2$ là diện tích hình vuông dựng trên cạnh đó: dấu của phần dư bị bỏ, và phần dư lớn bị phạt nặng. Để làm rõ đại lượng này, xem định nghĩa sau.

::: definition Định nghĩa 00.1 (Mô hình tuyến tính theo trọng số, phần dư và mất mát bình phương)
Cho $m$ mẫu với *vector đặc trưng* (feature vector) $\phi_i\in\mathbb R^n$ và giá trị quan sát $y_i\in\mathbb R$, $i=1,\ldots,m$.

- *Mô hình tuyến tính theo trọng số* (linear-in-parameters model) với *trọng số* (weights) $w\in\mathbb R^n$ dự đoán $\hat y_i=\phi_i^Tw$.
- *Phần dư* (residual) của mẫu $i$ là $r_i(w)=\hat y_i-y_i$.
- *Mất mát bình phương* (squared loss) là
$$
f(w)=\frac12\sum_{i=1}^m r_i(w)^2 .
$$
:::

Đặc trưng $\phi_i$ có thể chứa hàm phi tuyến của dữ liệu gốc, chẳng hạn $(a_i')^2$; mô hình vẫn tuyến tính theo $w$ vì $\hat y_i$ là tích vô hướng của $\phi_i$ với $w$. Hệ số $\tfrac12$ không đổi trọng số tốt nhất và làm gọn đạo hàm. Trong Ví dụ 00.1, $m=4$ và $n=3$.

::: example Ví dụ 00.2 (Phần dư và mất mát tại trọng số thử)
**Dữ kiện.** Bốn căn nhà của Ví dụ 00.1, với $(a_i',b_i')$ lần lượt là $(-1{,}5;\,-1)$, $(-0{,}5;\,0)$, $(0{,}5;\,0)$, $(1{,}5;\,1)$ và $y=(11,12,14,19)$. Trọng số thử $w^{(0)}=(14,1,1)^T$.

**Dự đoán và phần dư.** $\hat y_i=14+a_i'+b_i'$.

| Căn | $\hat y_i$ | $y_i$ | $r_i=\hat y_i-y_i$ | $r_i^2$ |
|---:|---:|---:|---:|---:|
| 1 | $14-1{,}5-1=11{,}5$ | $11$ | $0{,}5$ | $0{,}25$ |
| 2 | $14-0{,}5=13{,}5$ | $12$ | $1{,}5$ | $2{,}25$ |
| 3 | $14+0{,}5=14{,}5$ | $14$ | $0{,}5$ | $0{,}25$ |
| 4 | $14+1{,}5+1=16{,}5$ | $19$ | $-2{,}5$ | $6{,}25$ |

**Mất mát.** $f(w^{(0)})=\tfrac12(0{,}25+2{,}25+0{,}25+6{,}25)=\tfrac12\cdot9=4{,}5$.

**Kiểm tra lại.** $\hat y_4=16{,}5<19=y_4$ nên $r_4<0$, đúng quy ước $r_i=\hat y_i-y_i$; tổng các phần dư $0{,}5+1{,}5+0{,}5-2{,}5=0$.
:::

Phần dư $r_4=-2{,}5$ nghĩa là trọng số thử dự đoán căn 4 thấp hơn giá quan sát $250$ triệu đồng. Tổng các phần dư bằng $0$, trong khi tổng bình phương bằng $9$: phần dư trái dấu triệt tiêu nhau trong tổng nhưng không triệt tiêu trong $f$. Từ đây có ba câu hỏi về Ví dụ 00.1, bao gồm:

- có trọng số nào làm mọi phần dư bằng $0$ không;
- trọng số nào làm $f$ nhỏ nhất;
- phần dư còn lại được mô tả bằng mô hình xác suất nào.

## 4. Đại số tuyến tính cho dữ liệu

Bốn căn nhà cho bốn phương trình $\phi_i^Tw=y_i$ với ba ẩn $w_0,w_1,w_2$. Muốn viết gọn bốn phương trình, biết khi nào chúng có nghiệm, và khi không có nghiệm thì chọn $w$ thế nào, chúng ta cần vector, ma trận và các khái niệm hạng, không gian cột, hạt nhân.

### 4.1. Vector, ma trận và các phép toán

Một căn nhà được mô tả bằng ba số xếp theo thứ tự cố định: hằng số $1$ (nhân với *hệ số chặn*, intercept, bias), diện tích đã đổi thang, số phòng đã dịch tâm. Đổi chỗ hai số làm đổi ý nghĩa của trọng số đi kèm. Một cách trực quan, mỗi căn nhà là một hàng của một bảng số, và mỗi đặc trưng là một cột. Để làm rõ các đối tượng này, xem định nghĩa sau.

::: definition Định nghĩa 00.2 (Vô hướng, vector, ma trận, chuyển vị)
- Một *vô hướng* (scalar) là một số thực $\alpha\in\mathbb R$.
- Một *vector* $x\in\mathbb R^n$ là một dãy có thứ tự $n$ số thực, viết thành cột kích thước $n\times1$ với các thành phần $x_1,\ldots,x_n$.
- Một *ma trận* (matrix) $A=[a_{ij}]\in\mathbb R^{m\times n}$ là một bảng $m$ hàng, $n$ cột; $a_{ij}$ là phần tử ở hàng $i$, cột $j$.
- *Chuyển vị* (transpose) của $A\in\mathbb R^{m\times n}$ là ma trận $A^T\in\mathbb R^{n\times m}$ với $(A^T)_{ij}=a_{ji}$. Với vector cột $x$, $x^T=[x_1,\ldots,x_n]$ là vector hàng $1\times n$.
- Ma trận vuông $A\in\mathbb R^{n\times n}$ là *đối xứng* (symmetric) nếu $A^T=A$; *vết* (trace) của nó là $\operatorname{tr}(A)=\sum_{i=1}^na_{ii}$.
:::

Trong kích thước $m\times n$, số hàng viết trước số cột. Một vô hướng có thể mang đơn vị: giá $y_1=11$ là một vô hướng tính bằng $100$ triệu đồng. Chuyển vị đổi hàng thành cột. Xếp các căn nhà theo hàng, ta được *ma trận thiết kế* (design matrix) $X$, với hàng $i$ là $\phi_i^T$.

Khi đã có vector và ma trận, chúng ta cần cộng, nhân và đo độ lớn của chúng.

::: definition Định nghĩa 00.3 (Phép cộng và các phép nhân)
Cho $u,v\in\mathbb R^n$, $A,B\in\mathbb R^{m\times n}$, $C\in\mathbb R^{n\times p}$, $x\in\mathbb R^n$.

- *Phép cộng* theo từng thành phần: $(u+v)_i=u_i+v_i$ và $(A+B)_{ij}=a_{ij}+b_{ij}$.
- *Tích vô hướng* (inner product, dot product): $u^Tv=\sum_{i=1}^nu_iv_i\in\mathbb R$.
- *Tích ma trận–vector*: $Ax\in\mathbb R^m$, thành phần thứ $i$ là tích vô hướng của hàng $i$ của $A$ với $x$.
- *Tích ma trận–ma trận*: $AC\in\mathbb R^{m\times p}$ với $(AC)_{ij}=\sum_{k=1}^na_{ik}c_{kj}$.
- *Tích trong Frobenius* (Frobenius inner product): $\langle A,B\rangle_F=\operatorname{tr}(A^TB)=\sum_{i=1}^m\sum_{j=1}^na_{ij}b_{ij}$.
:::

Các phép nhân chỉ xác định khi kích thước khớp nhau, theo quy tắc $(m\times n)(n\times p)=(m\times p)$: số cột của nhân tử trái bằng số hàng của nhân tử phải. Tích vô hướng và tích trong Frobenius cho một số; tích ma trận cho một ma trận. Nói chung $AC\ne CA$, kể cả khi cả hai tích xác định.

::: example Ví dụ 00.3 (Phép toán trên ma trận nhỏ)
**Dữ kiện.**
$$
\begin{aligned}
A&=\begin{bmatrix}1&-1&0\\0&-1&1\end{bmatrix},\\
x&=\begin{bmatrix}1\\2\\-1\end{bmatrix},\\
C&=\begin{bmatrix}1&2\\0&1\\2&-1\end{bmatrix},\\
B_1&=\begin{bmatrix}1&0\\2&1\end{bmatrix},\\
B_2&=\begin{bmatrix}2&1\\0&-1\end{bmatrix}.
\end{aligned}
$$

**Chuyển vị.** $A\in\mathbb R^{2\times3}$, nên $A^T=\begin{bmatrix}1&0\\-1&-1\\0&1\end{bmatrix}\in\mathbb R^{3\times2}$.

**Tích ma trận–vector.** $(2\times3)(3\times1)=(2\times1)$:
$$
Ax=\begin{bmatrix}1-2+0\\0-2-1\end{bmatrix}=\begin{bmatrix}-1\\-3\end{bmatrix}.
$$

**Tích ma trận–ma trận.** $(2\times3)(3\times2)=(2\times2)$:
$$
AC=\begin{bmatrix}1&1\\2&-2\end{bmatrix}.
$$

**Phép cộng và tích trong Frobenius.** $B_1+B_2=\begin{bmatrix}3&1\\2&0\end{bmatrix}$ và $\langle B_1,B_2\rangle_F=2+0+0-1=1$.

**Kiểm tra lại.** Phần tử $(2,1)$ của $AC$ là hàng 2 của $A$ nhân cột 1 của $C$: $0\cdot1+(-1)\cdot0+1\cdot2=2$.
:::

Áp dụng tích ma trận–vector cho bốn căn nhà, ta tính bốn dự đoán bằng một phép nhân.

::: example Ví dụ 00.4 (Ma trận thiết kế và dự đoán của bốn căn nhà)
**Dữ kiện.** Bốn vector đặc trưng của Ví dụ 00.1: $\phi_1=(1;\,-1{,}5;\,-1)^T$, $\phi_2=(1;\,-0{,}5;\,0)^T$, $\phi_3=(1;\,0{,}5;\,0)^T$, $\phi_4=(1;\,1{,}5;\,1)^T$; $y=(11,12,14,19)^T$; $w^{(0)}=(14,1,1)^T$.

**Ma trận thiết kế.** Xếp $\phi_i^T$ thành hàng $i$:
$$
\begin{aligned}
X&=\begin{bmatrix}1&-1{,}5&-1\\1&-0{,}5&0\\1&0{,}5&0\\1&1{,}5&1\end{bmatrix}\in\mathbb R^{4\times3},\\
y&=\begin{bmatrix}11\\12\\14\\19\end{bmatrix}\in\mathbb R^4.
\end{aligned}
$$

**Dự đoán.** $(4\times3)(3\times1)=(4\times1)$ và
$$
Xw^{(0)}=\begin{bmatrix}11{,}5\\13{,}5\\14{,}5\\16{,}5\end{bmatrix}.
$$

**Kiểm tra lại.** Thành phần đầu là $\phi_1^Tw^{(0)}=14-1{,}5-1=11{,}5$, khớp Ví dụ 00.2.
:::

Với ma trận thiết kế $X$, vector dự đoán là $\hat y=Xw$ và vector phần dư là $r(w)=Xw-y$. Đổi thứ tự các hàng của $X$ và $y$ cùng lúc không đổi bài toán; đổi thứ tự các cột của $X$ mà giữ nguyên $w$ thì đổi mô hình.

Để so sánh phần dư của các bộ trọng số, chúng ta cần đo độ lớn của một vector.

::: definition Định nghĩa 00.4 (Chuẩn $\ell_1$, chuẩn $\ell_2$ và chuẩn Frobenius)
Với $x\in\mathbb R^n$ và $A\in\mathbb R^{m\times n}$:
$$
\begin{aligned}
\lVert x\rVert_1&=\sum_{i=1}^n\lvert x_i\rvert,\\
\lVert x\rVert_2&=\sqrt{x^Tx},\\
\lVert A\rVert_F&=\sqrt{\langle A,A\rangle_F}.
\end{aligned}
$$
Chuẩn $\ell_2$ còn gọi là chuẩn Euclid (Euclidean norm).
:::

Ba chuẩn đều là số không âm. Với $\phi_1=(1;\,-1{,}5;\,-1)^T$, $\lVert\phi_1\rVert_1=1+1{,}5+1=3{,}5$ và $\lVert\phi_1\rVert_2=\sqrt{1+2{,}25+1}=\sqrt{4{,}25}$. Với $B_1$ của Ví dụ 00.3, $\lVert B_1\rVert_F=\sqrt{1+0+4+1}=\sqrt6$. Mất mát của Ví dụ 00.2 viết lại là $f(w^{(0)})=\tfrac12\lVert r^{(0)}\rVert_2^2=4{,}5$.

Tích vô hướng và chuẩn $\ell_2$ liên hệ với nhau qua hai bất đẳng thức sau.

::: proposition Mệnh đề 00.5 (Bất đẳng thức Cauchy–Schwarz và bất đẳng thức tam giác) — chứng minh đầy đủ
**Giả thiết.** $u,v\in\mathbb R^n$.

**Kết luận.**
1. $\lvert u^Tv\rvert\le\lVert u\rVert_2\lVert v\rVert_2$, và dấu bằng xảy ra khi và chỉ khi $u$, $v$ phụ thuộc tuyến tính (một vector là bội của vector kia).
2. $\lVert u+v\rVert_2\le\lVert u\rVert_2+\lVert v\rVert_2$.
:::

::: proof Chứng minh Mệnh đề 00.5
**Lộ trình.** Xét đa thức bậc hai $t\mapsto\lVert u+tv\rVert_2^2$, luôn không âm, nên biệt thức của nó không dương.

**Bước 1 (trường hợp $v=0$).** Hai vế của bất đẳng thức 1 bằng $0$, và $v=0\cdot u$ nên $u$, $v$ phụ thuộc tuyến tính.

**Bước 2 (biệt thức).** Với $v\ne0$ và mọi $t\in\mathbb R$,
$$
\begin{aligned}
0&\le\lVert u+tv\rVert_2^2\\
&=(u+tv)^T(u+tv)\\
&=\lVert v\rVert_2^2\,t^2+2(u^Tv)\,t+\lVert u\rVert_2^2 .
\end{aligned}
$$
Đây là đa thức bậc hai theo $t$ với hệ số bậc hai $\lVert v\rVert_2^2>0$, không âm trên $\mathbb R$, nên biệt thức thu gọn không dương: $(u^Tv)^2-\lVert u\rVert_2^2\lVert v\rVert_2^2\le0$. Lấy căn bậc hai được bất đẳng thức 1.

**Bước 3 (dấu bằng).** Biệt thức bằng $0$ khi và chỉ khi đa thức có nghiệm $t_0$, tức $\lVert u+t_0v\rVert_2=0$, tức $u=-t_0v$. Ngược lại, nếu $u=sv$ thì $\lvert u^Tv\rvert=\lvert s\rvert\lVert v\rVert_2^2=\lVert u\rVert_2\lVert v\rVert_2$.

**Bước 4 (bất đẳng thức tam giác).** Theo bất đẳng thức 1,
$$
\begin{aligned}
\lVert u+v\rVert_2^2&=\lVert u\rVert_2^2+2u^Tv+\lVert v\rVert_2^2\\
&\le\lVert u\rVert_2^2+2\lVert u\rVert_2\lVert v\rVert_2\\
&\quad+\lVert v\rVert_2^2\\
&=(\lVert u\rVert_2+\lVert v\rVert_2)^2 .
\end{aligned}
$$
Hai vế không âm, lấy căn được bất đẳng thức 2. $\square$
:::

Với $u=\phi_1$ và $v=w^{(0)}$: $\lvert\phi_1^Tw^{(0)}\rvert=11{,}5$, còn $\lVert\phi_1\rVert_2\lVert w^{(0)}\rVert_2=\sqrt{4{,}25}\cdot\sqrt{198}\approx29{,}0$, đúng bất đẳng thức 1. Khi $u,v\ne0$, bất đẳng thức 1 cho $-1\le u^Tv/(\lVert u\rVert_2\lVert v\rVert_2)\le1$, nên tỉ số này là cosin của một góc trong $[0,\pi]$ giữa hai vector; $u^Tv=0$ khi và chỉ khi hai vector *trực giao* (orthogonal).

Trong học máy, một dự đoán tuyến tính là tích vô hướng $\phi^Tw$ của vector đặc trưng với vector trọng số. Độ tương tự cosin (cosine similarity) $u^Tv/(\lVert u\rVert_2\lVert v\rVert_2)$ giữa hai biểu diễn nằm trong $[-1,1]$ nhờ Mệnh đề 00.5.

### 4.2. Không gian cột, hạt nhân và hạng

Với ma trận thiết kế $X$, có hai câu hỏi: những vector dự đoán nào tạo được dưới dạng $Xw$, và thay đổi trọng số nào không làm đổi dự đoán. Cả hai câu hỏi dùng tổ hợp tuyến tính của các vector.

::: definition Định nghĩa 00.6 (Tổ hợp tuyến tính, bao tuyến tính, độc lập tuyến tính)
Cho các vector $v_1,\ldots,v_k\in\mathbb R^m$.

- Một *tổ hợp tuyến tính* (linear combination) của chúng là $\sum_{j=1}^k\alpha_jv_j$ với $\alpha_1,\ldots,\alpha_k\in\mathbb R$.
- *Bao tuyến tính* (span) $\operatorname{span}\{v_1,\ldots,v_k\}$ là tập mọi tổ hợp tuyến tính của chúng.
- Hệ $v_1,\ldots,v_k$ *độc lập tuyến tính* (linearly independent) nếu $\sum_j\alpha_jv_j=0$ chỉ xảy ra khi $\alpha_1=\cdots=\alpha_k=0$; ngược lại, hệ *phụ thuộc tuyến tính*.
:::

Với một vector, $\operatorname{span}\{v\}=\{tv:t\in\mathbb R\}$ là đường thẳng qua gốc theo hướng $v$ khi $v\ne0$. Một hệ phụ thuộc tuyến tính khi và chỉ khi có một vector là tổ hợp tuyến tính của các vector còn lại.

Một cách trực quan, $Xw=\sum_jw_j\,(\text{cột } j\text{ của }X)$ là một tổ hợp tuyến tính của các cột của $X$, với hệ số là trọng số. Để làm rõ tập các dự đoán và tập các thay đổi trọng số vô hại, xem định nghĩa sau.

::: definition Định nghĩa 00.7 (Không gian cột, hạt nhân, hạng)
Cho $A\in\mathbb R^{m\times n}$.

- *Không gian cột* (column space, range) của $A$ là $\operatorname{Col}(A)=\{Ax:x\in\mathbb R^n\}\subseteq\mathbb R^m$, tức bao tuyến tính của các cột của $A$.
- *Hạt nhân* (kernel, null space) của $A$ là $\operatorname{Ker}(A)=\{x\in\mathbb R^n:Ax=0\}\subseteq\mathbb R^n$.
- *Hạng* (rank) của $A$, ký hiệu $\operatorname{rank}(A)$, là số lớn nhất các cột độc lập tuyến tính của $A$, tức số chiều của $\operatorname{Col}(A)$.
:::

Hai không gian nằm trong hai không gian nền khác nhau: $\operatorname{Col}(A)$ gồm các đầu ra, nằm trong $\mathbb R^m$; $\operatorname{Ker}(A)$ gồm các đầu vào bị ánh xạ về $0$, nằm trong $\mathbb R^n$. Với ma trận thiết kế, $\operatorname{Col}(X)$ là tập mọi vector dự đoán mà mô hình tạo được; nếu $v\in\operatorname{Ker}(X)$ thì $X(w+v)=Xw$, nên $w$ và $w+v$ cho cùng dự đoán.

Hạng của các cột và hạng của các hàng liên hệ với nhau qua phần bù trực giao. Với một không gian con $\mathcal W\subseteq\mathbb R^m$, *phần bù trực giao* (orthogonal complement) của $\mathcal W$ là $\mathcal W^\perp=\{z\in\mathbb R^m:z^Ts=0\ \text{với mọi}\ s\in\mathcal W\}$. Về mặt ý tưởng, $z\in\operatorname{Ker}(A^T)$ nghĩa là $z$ trực giao với mọi cột của $A$, tức trực giao với mọi tổ hợp của chúng; mệnh đề sau nói rằng hai điều kiện "nằm trong $\operatorname{Col}(A)$" và "trực giao với $\operatorname{Ker}(A^T)$" là một.

::: proposition Mệnh đề 00.8 (Phân tích trực giao, orthogonal decomposition, và hạng hàng) — ngoài phạm vi, xem Boyd và Vandenberghe (2004), Murphy (2022)
**Giả thiết.** $A\in\mathbb R^{m\times n}$.

**Kết luận.**
1. $\operatorname{Col}(A)=\operatorname{Ker}(A^T)^\perp$, và mọi $z\in\mathbb R^m$ viết duy nhất được dưới dạng $z=z_1+z_2$ với $z_1\in\operatorname{Col}(A)$, $z_2\in\operatorname{Ker}(A^T)$.
2. $\operatorname{rank}(A)=\operatorname{rank}(A^T)$: số lớn nhất các hàng độc lập tuyến tính bằng số lớn nhất các cột độc lập tuyến tính, nên $\operatorname{rank}(A)\le\min(m,n)$.
3. $\dim\operatorname{Ker}(A)=n-\operatorname{rank}(A)$.
:::

Boyd và Vandenberghe (2004), §A.5.1, tr. 645–646, nêu rằng $\operatorname{Ker}(A)$ và $\operatorname{Col}(A^T)$ là phần bù trực giao của nhau trong $\mathbb R^n$ (áp dụng cho $A^T$ được kết luận 1) và $\operatorname{rank}(A)\le\min(m,n)$. Murphy (2022), §7.1.4.3, nêu kết luận 2; §7.5.4 suy ra kết luận 3 (*định lý hạng–số chiều*, rank–nullity theorem) từ phân rã giá trị kỳ dị.

::: example Ví dụ 00.5 (Không gian cột, hạt nhân và hạng của một ma trận $2\times2$)
**Dữ kiện.** $A=\begin{bmatrix}1&2\\2&4\end{bmatrix}$.

**Hạng.** Cột thứ hai bằng hai lần cột thứ nhất, nên $\operatorname{rank}(A)=1$.

**Không gian cột và hạt nhân.**
$$
\begin{aligned}
\operatorname{Col}(A)&=\operatorname{span}\{(1,2)^T\},\\
\operatorname{Ker}(A)&=\operatorname{span}\{(-2,1)^T\}.
\end{aligned}
$$

**Kiểm tra lại.** $A(-2,1)^T=(-2+2,\,-4+4)^T=0$, và $\dim\operatorname{Ker}(A)=2-1=1$ đúng kết luận 3 của Mệnh đề 00.8. Ma trận có bốn phần tử khác không nhưng hạng bằng $1$: hạng đếm cột độc lập, khác số phần tử khác không.
:::

::: example Ví dụ 00.6 (Hạng của ma trận thiết kế bốn căn nhà)
**Dữ kiện.** $X$ của Ví dụ 00.4, với hàng $i$ là $(1,a_i',b_i')$: $(1;\,-1{,}5;\,-1)$, $(1;\,-0{,}5;\,0)$, $(1;\,0{,}5;\,0)$, $(1;\,1{,}5;\,1)$.

**Hạt nhân.** Giả sử $Xv=0$ với $v=(v_0,v_1,v_2)^T$. Hàng 2 và hàng 3 cho
$$
\begin{aligned}
v_0-0{,}5v_1&=0,\\
v_0+0{,}5v_1&=0,
\end{aligned}
$$
nên $v_0=v_1=0$. Hàng 1 khi đó cho $-v_2=0$. Vậy $\operatorname{Ker}(X)=\{0\}$.

**Hạng.** Ba cột độc lập tuyến tính, nên $\operatorname{rank}(X)=3$, và giả thiết (A1) đúng.

**Kiểm tra lại.** Kết luận 3 của Mệnh đề 00.8: $\dim\operatorname{Ker}(X)=3-3=0$.
:::

### 4.3. Hệ phương trình tuyến tính, định thức và nghịch đảo

Khớp đúng mô hình với mọi mẫu nghĩa là giải hệ $Xw=y$. Với một hệ tổng quát $Ax=c$, $A\in\mathbb R^{m\times n}$, $c\in\mathbb R^m$, *ma trận mở rộng* (augmented matrix) $[A\mid c]\in\mathbb R^{m\times(n+1)}$ ghép $c$ làm cột cuối của $A$. Về mặt ý tưởng, $Ax$ là tổ hợp tuyến tính của các cột của $A$, nên hệ có nghiệm khi và chỉ khi $c$ là một tổ hợp như vậy. Định lý sau chính xác hóa ý này và mô tả cả tập nghiệm.

::: theorem Định lý 00.9 (Tập nghiệm của hệ tuyến tính) — chứng minh đầy đủ
**Giả thiết.** $A\in\mathbb R^{m\times n}$, $c\in\mathbb R^m$.

**Kết luận.**
1. Hệ $Ax=c$ có nghiệm khi và chỉ khi $c\in\operatorname{Col}(A)$, khi và chỉ khi $\operatorname{rank}([A\mid c])=\operatorname{rank}(A)$.
2. Nếu $x_0$ là một nghiệm thì tập nghiệm là $x_0+\operatorname{Ker}(A)=\{x_0+v:v\in\operatorname{Ker}(A)\}$.
3. Khi hệ có nghiệm, nghiệm duy nhất khi và chỉ khi $\operatorname{Ker}(A)=\{0\}$, khi và chỉ khi $\operatorname{rank}(A)=n$.
:::

::: proof Chứng minh Định lý 00.9
**Lộ trình.** Kết luận 1 đọc trực tiếp từ định nghĩa không gian cột; kết luận 2 dùng tính tuyến tính của $x\mapsto Ax$; kết luận 3 suy từ 2 và kết luận 3 của Mệnh đề 00.8.

**Bước 1 (điều kiện có nghiệm).** Theo Định nghĩa 00.7, $c\in\operatorname{Col}(A)$ nghĩa là có $x$ với $Ax=c$. Ngoài ra $\operatorname{Col}(A)\subseteq\operatorname{Col}([A\mid c])=\operatorname{Col}(A)+\operatorname{span}\{c\}$; hai không gian con lồng nhau có cùng số chiều khi và chỉ khi chúng bằng nhau, nên $\operatorname{rank}([A\mid c])=\operatorname{rank}(A)$ khi và chỉ khi $c\in\operatorname{Col}(A)$.

**Bước 2 (tập nghiệm).** Nếu $Ax_0=c$ và $v\in\operatorname{Ker}(A)$ thì $A(x_0+v)=c+0=c$. Ngược lại, nếu $Ax=c$ thì $A(x-x_0)=c-c=0$, nên $x=x_0+(x-x_0)$ với $x-x_0\in\operatorname{Ker}(A)$.

**Bước 3 (tính duy nhất).** Theo bước 2, tập nghiệm có đúng một phần tử khi và chỉ khi $\operatorname{Ker}(A)=\{0\}$. Theo kết luận 3 của Mệnh đề 00.8, $\dim\operatorname{Ker}(A)=n-\operatorname{rank}(A)$, nên $\operatorname{Ker}(A)=\{0\}$ khi và chỉ khi $\operatorname{rank}(A)=n$. $\square$
:::

Hệ có nghiệm gọi là *tương thích* (consistent). Đặt $\varrho=\operatorname{rank}(A)$ và $\varrho_c=\operatorname{rank}([A\mid c])$. Định lý 00.9 chia hệ thành ba trường hợp:

- $\varrho<\varrho_c$: hệ vô nghiệm;
- $\varrho=\varrho_c=n$: hệ có nghiệm duy nhất;
- $\varrho=\varrho_c<n$: hệ có vô số nghiệm, tạo thành *tập affine* (affine set) $x_0+\operatorname{Ker}(A)$, tịnh tiến của một không gian con $n-\varrho$ chiều (một đường thẳng khi $n-\varrho=1$).

So sánh số phương trình $m$ với số ẩn $n$ không đủ để biết số nghiệm; cần so hai hạng. Ví dụ sau cho năm trường hợp.

::: example Ví dụ 00.7 (Năm trường hợp số nghiệm)
1. **Ma trận vuông, hạng đầy đủ.** $A=\begin{bmatrix}1&1\\1&-1\end{bmatrix}$, $c=(3,1)^T$: $m=n=\varrho=2$, nghiệm duy nhất $x=(2,1)^T$.
2. **Ma trận cao, hạng cột đầy đủ, hệ tương thích.** $A=\begin{bmatrix}1&0\\0&1\\1&1\end{bmatrix}$, $c=(1,2,3)^T$: $m=3>n=2$, $\varrho=\varrho_c=2$, nghiệm duy nhất $x=(1,2)^T$.
3. **Ma trận cao, hạng cột đầy đủ, hệ không tương thích.** Cùng $A$ của trường hợp 2, $c=(1,2,4)^T$: hai phương trình đầu cho $x=(1,2)^T$, phương trình thứ ba đòi $x_1+x_2=4\ne3$; $\varrho=2<\varrho_c=3$, hệ vô nghiệm.
4. **Ma trận rộng, hạng hàng đầy đủ.** $A=\begin{bmatrix}1&0&1\\0&1&1\end{bmatrix}$, $c=(1,2)^T$: $m=\varrho=\varrho_c=2<n=3$, nghiệm $x=(1-t,\,2-t,\,t)^T$ với mọi $t\in\mathbb R$.
5. **Ma trận thiếu hạng, hệ tương thích.** $A=\begin{bmatrix}1&2\\2&4\end{bmatrix}$, $c=(3,6)^T$: $\varrho=\varrho_c=1<n=2$, nghiệm $x=(3-2t,\,t)^T$ với mọi $t\in\mathbb R$.

**Kiểm tra lại.** Trường hợp 4 với $t=1$: $x=(0,1,1)^T$ và $Ax=(0+1,\,1+1)^T=(1,2)^T$. Trường hợp 5: hướng $(-2,1)^T$ của tập nghiệm sinh $\operatorname{Ker}(A)$ theo Ví dụ 00.5.
:::

::: example Ví dụ 00.8 (Hệ của bốn căn nhà vô nghiệm)
**Dữ kiện.** Hệ $Xw=y$ với $X$, $y$ của Ví dụ 00.4, tức bốn phương trình $w_0+w_1a_i'+w_2b_i'=y_i$:
$$
\begin{aligned}
w_0-1{,}5w_1-w_2&=11,\\
w_0-0{,}5w_1&=12,\\
w_0+0{,}5w_1&=14,\\
w_0+1{,}5w_1+w_2&=19.
\end{aligned}
$$

**Ba hệ quả.** Trừ phương trình 2 khỏi phương trình 3: $w_1=2$. Trừ phương trình 1 khỏi phương trình 2: $w_1+w_2=1$. Trừ phương trình 3 khỏi phương trình 4: $w_1+w_2=5$.

**Kết luận.** Hai đẳng thức cuối mâu thuẫn, nên hệ vô nghiệm. Theo kết luận 1 của Định lý 00.9, $y\notin\operatorname{Col}(X)$ và $\operatorname{rank}([X\mid y])=4>3=\operatorname{rank}(X)$.

**Kiểm tra lại.** Thế ngược: từ $w_1=2$, phương trình 2 cho $w_0=12+1=13$; khi đó phương trình 1 cho $w_2=13-3-11=-1$, còn phương trình 4 cho $w_2=19-13-3=3$, hai giá trị khác nhau.
:::

Để chọn trọng số trong trường hợp này, chúng ta cần thêm công cụ về ma trận vuông và dạng toàn phương. Trước hết, với ma trận vuông, một số duy nhất cho biết ma trận có hạng đầy đủ hay không. Về mặt hình học, phép biến đổi $x\mapsto Ax$ nhân thể tích $n$ chiều với một hệ số; định thức là hệ số đó kèm dấu.

::: definition Định nghĩa 00.10 (Định thức)
Cho $A=[a_{ij}]\in\mathbb R^{n\times n}$. *Định thức* (determinant) $\det(A)$ được định nghĩa đệ quy:

- với $n=1$, $\det([a_{11}])=a_{11}$;
- với $n\ge2$, gọi $A_{1j}$ là ma trận $(n-1)\times(n-1)$ thu được khi bỏ hàng 1 và cột $j$ của $A$; khi đó
$$
\begin{aligned}
\det(A)&=\sum_{j=1}^n(-1)^{1+j}\\
&\qquad\times a_{1j}\det(A_{1j}).
\end{aligned}
$$
:::

Công thức trên là *khai triển Laplace* (Laplace expansion) theo hàng 1; khai triển theo một hàng hoặc một cột bất kỳ cho cùng giá trị. Với $A\in\mathbb R^{2\times2}$, định nghĩa cho $\det(A)=a_{11}a_{22}-a_{12}a_{21}$. Với $A,B\in\mathbb R^{n\times n}$, $\det(AB)=\det(A)\det(B)$ và $\det(A^T)=\det(A)$ (Murphy (2022), §7.1.4.2, (7.38), (7.40)). Với ma trận tam giác, định thức bằng tích các phần tử trên đường chéo chính; với ma trận tổng quát, công thức này sai, chẳng hạn $\det\begin{bmatrix}1&1\\1&1\end{bmatrix}=0\ne1$.

Định thức dương giữ hướng, định thức âm đảo hướng, và $\det(A)=0$ khi ảnh của $\mathbb R^n$ có thể tích $n$ chiều bằng $0$.

Khi hệ vuông có nghiệm duy nhất, chúng ta muốn viết nghiệm bằng một công thức.

::: definition Định nghĩa 00.11 (Ma trận nghịch đảo)
Cho $A\in\mathbb R^{n\times n}$. Ma trận $A^{-1}\in\mathbb R^{n\times n}$ là *nghịch đảo* (inverse) của $A$ nếu $A^{-1}A=AA^{-1}=I_n$. Khi $A^{-1}$ tồn tại, $A$ được gọi là *khả nghịch* (invertible); ngược lại, $A$ *suy biến* (singular).
:::

Định lý sau gom các điều kiện tương đương với tính khả nghịch.

::: theorem Định lý 00.12 (Tiêu chuẩn khả nghịch) — ngoài phạm vi, xem Goodfellow, Bengio và Courville (2016)
**Giả thiết.** $A\in\mathbb R^{n\times n}$.

**Kết luận.** Các khẳng định sau tương đương:
1. $A$ khả nghịch;
2. $\det(A)\ne0$;
3. $\operatorname{rank}(A)=n$;
4. $\operatorname{Ker}(A)=\{0\}$;
5. với mọi $c\in\mathbb R^n$, hệ $Ax=c$ có nghiệm duy nhất, và nghiệm đó là $x=A^{-1}c$.
:::

Goodfellow, Bengio và Courville (2016), §2.3–2.4 và §2.11, và Murphy (2022), §7.1.4.2, (7.41), nêu các điều kiện này. Sự tương đương của 3 và 4 là kết luận 3 của Mệnh đề 00.8 với $n$ cột; sự tương đương của 4 và 5 là kết luận 3 của Định lý 00.9 cùng với $\operatorname{Col}(A)=\mathbb R^n$ khi hạng bằng $n$.

::: example Ví dụ 00.9 (Định thức, nghịch đảo và nghiệm của một hệ $2\times2$)
**Dữ kiện.** $A=\begin{bmatrix}1&1\\1&-1\end{bmatrix}$, $c=(3,1)^T$.

**Định thức.** $\det(A)=1\cdot(-1)-1\cdot1=-2\ne0$, nên $A$ khả nghịch theo Định lý 00.12.

**Nghịch đảo.**
$$
A^{-1}=\frac12\begin{bmatrix}1&1\\1&-1\end{bmatrix}.
$$

**Nghiệm.** $x=A^{-1}c=\tfrac12(3+1,\,3-1)^T=(2,1)^T$.

**Kiểm tra lại.** $AA^{-1}=\tfrac12\begin{bmatrix}2&0\\0&2\end{bmatrix}=I_2$. Ma trận gồm nghịch đảo từng phần tử của $A$ là $\begin{bmatrix}1&1\\1&-1\end{bmatrix}=A$, và $A\cdot A=2I_2\ne I_2$, nên phép nghịch đảo ma trận khác phép nghịch đảo từng phần tử.
:::

Trong học máy, khi chỉ cần $A^{-1}c$, ta giải hệ $Ax=c$ bằng phép khử Gauss thay vì lập $A^{-1}$. Goodfellow, Bengio và Courville (2016), §2.3, nêu rằng $A^{-1}$ chủ yếu là công cụ lý thuyết: trên máy tính, $A^{-1}$ chỉ biểu diễn được với độ chính xác hữu hạn, nên giải trực tiếp hệ $Ax=c$ thường cho nghiệm chính xác hơn.

### 4.4. Hệ cơ sở, hệ trực giao và hệ trực chuẩn

Để đọc một dạng toàn phương theo các hướng mà một ma trận đối xứng chỉ co giãn, ta cần hệ trục vuông góc có độ dài $1$. Tọa độ của một vector phụ thuộc vào hệ trục được chọn; với các trục như vậy, tọa độ lấy được bằng tích vô hướng, và độ dài của vector bằng độ dài của vector tọa độ.

::: definition Định nghĩa 00.13 (Cơ sở, hệ trực giao, hệ trực chuẩn, ma trận trực giao)
- Một hệ có thứ tự $(v_1,\ldots,v_n)$ trong $\mathbb R^n$ là một *cơ sở* (basis) nếu nó độc lập tuyến tính và $\operatorname{span}\{v_1,\ldots,v_n\}=\mathbb R^n$. Khi đó mỗi $x\in\mathbb R^n$ có duy nhất một biểu diễn $x=\sum_{i=1}^n\alpha_iv_i$; các số $\alpha_i$ là *tọa độ* của $x$ trong cơ sở.
- Hệ $(v_1,\ldots,v_k)$ là *hệ trực giao* (orthogonal system) nếu $v_i^Tv_j=0$ với mọi $i\ne j$, và *trực chuẩn* (orthonormal) nếu thêm $\lVert v_i\rVert_2=1$ với mọi $i$.
- Ma trận vuông $Q\in\mathbb R^{n\times n}$ là *ma trận trực giao* (orthogonal matrix) nếu $Q^TQ=I_n$, tức các cột của $Q$ là một hệ trực chuẩn.
:::

Một hệ độc lập tuyến tính có thể không trực giao, chẳng hạn $(1,0)^T$ và $(1,1)^T$. Với ma trận trực giao, $Q^TQ=I_n$ nghĩa là $Q^{-1}=Q^T$.

::: proposition Mệnh đề 00.14 (Hệ trực giao và tọa độ trong cơ sở trực chuẩn) — chứng minh đầy đủ
**Giả thiết.** $(v_1,\ldots,v_k)$ là một hệ trực giao trong $\mathbb R^n$ gồm các vector khác $0$; $(q_1,\ldots,q_n)$ là một cơ sở trực chuẩn của $\mathbb R^n$.

**Kết luận.**
1. Hệ $(v_1,\ldots,v_k)$ độc lập tuyến tính; nếu $k=n$ thì nó là một cơ sở của $\mathbb R^n$.
2. Với mọi $x\in\mathbb R^n$, tọa độ của $x$ trong cơ sở $(q_1,\ldots,q_n)$ là $\alpha_i=q_i^Tx$, và $\lVert x\rVert_2^2=\sum_{i=1}^n\alpha_i^2$.
:::

::: proof Chứng minh Mệnh đề 00.14
**Lộ trình.** Nhân trái một tổ hợp tuyến tính với từng vector của hệ; tính trực giao loại mọi số hạng trừ một.

**Bước 1 (độc lập tuyến tính).** Giả sử $\sum_{j=1}^k\alpha_jv_j=0$. Nhân trái với $v_i^T$ và dùng $v_i^Tv_j=0$ khi $j\ne i$: $\alpha_i\lVert v_i\rVert_2^2=0$. Vì $v_i\ne0$, $\alpha_i=0$, với mọi $i$. Khi $k=n$, ma trận vuông có các cột $v_1,\ldots,v_n$ có hạng $n$, nên theo Định lý 00.12, hệ $\sum_j\alpha_jv_j=x$ có nghiệm $(\alpha_1,\ldots,\alpha_n)$ với mọi $x\in\mathbb R^n$; do đó $\operatorname{span}\{v_1,\ldots,v_n\}=\mathbb R^n$ và hệ là một cơ sở.

**Bước 2 (tọa độ).** Viết $x=\sum_j\alpha_jq_j$. Nhân trái với $q_i^T$: $q_i^Tx=\sum_j\alpha_jq_i^Tq_j=\alpha_i$, vì $q_i^Tq_j=0$ khi $j\ne i$ và $q_i^Tq_i=1$.

**Bước 3 (chuẩn).** $\lVert x\rVert_2^2=x^Tx=\sum_{i,j}\alpha_i\alpha_jq_i^Tq_j=\sum_i\alpha_i^2$. $\square$
:::

Giả thiết "khác $0$" cần cho kết luận 1: vector $0$ trực giao với mọi vector, và một hệ chứa $0$ thì phụ thuộc tuyến tính.

::: example Ví dụ 00.10 (Cơ sở trực giao của $\mathbb R^2$)
**Dữ kiện.** $v_1=(1,1)^T$, $v_2=(1,-1)^T$, $x=(3,1)^T$.

**Trực giao.** $v_1^Tv_2=1-1=0$ và $\lVert v_1\rVert_2=\lVert v_2\rVert_2=\sqrt2$, nên $(v_1,v_2)$ là cơ sở trực giao nhưng không trực chuẩn. Hệ $q_i=v_i/\sqrt2$ là cơ sở trực chuẩn.

**Tọa độ.** Theo Mệnh đề 00.14, $q_1^Tx=4/\sqrt2=2\sqrt2$ và $q_2^Tx=2/\sqrt2=\sqrt2$, nên $x=2\sqrt2\,q_1+\sqrt2\,q_2=2v_1+v_2$.

**Kiểm tra lại.** $2v_1+v_2=(2+1,\,2-1)^T=(3,1)^T$, và $(2\sqrt2)^2+(\sqrt2)^2=10=\lVert x\rVert_2^2$.
:::

### 4.5. Vector riêng, giá trị riêng và phân rã trị riêng

Ma trận $X^TX$ của bốn căn nhà là ma trận đối xứng; độ cong của hàm mất mát đọc được từ các hướng mà trên đó một ma trận đối xứng chỉ co giãn. Một cách trực quan, $v$ là một hướng bất biến của phép biến đổi $x\mapsto Ax$ nếu $Av$ nằm trên đường thẳng $\operatorname{span}\{v\}$.

::: definition Định nghĩa 00.15 (Vector riêng, giá trị riêng)
Cho $A\in\mathbb R^{n\times n}$. Nếu $\lambda\in\mathbb R$ và $v\in\mathbb R^n$, $v\ne0$, thỏa
$$
Av=\lambda v,
$$
thì $v$ là một *vector riêng* (eigenvector) của $A$ ứng với *giá trị riêng* (eigenvalue) $\lambda$.
:::

Từ $Av=\lambda v$ ta có $(A-\lambda I_n)v=0$ với $v\ne0$, nên $\operatorname{Ker}(A-\lambda I_n)\ne\{0\}$, và theo Định lý 00.12, $\lambda$ là nghiệm của *phương trình đặc trưng* (characteristic equation)
$$
\det(A-\lambda I_n)=0 .
$$
Cách tìm cặp riêng gồm hai bước: giải phương trình đặc trưng để được $\lambda$, rồi chọn một vector khác $0$ trong $\operatorname{Ker}(A-\lambda I_n)$.

Trên hướng $v$, phép biến đổi nhân độ dài với $\lvert\lambda\rvert$. Theo giá trị của $\lambda$:

- $\lvert\lambda\rvert>1$: độ dài bị kéo giãn;
- $0<\lvert\lambda\rvert<1$: độ dài bị co lại;
- $\lambda<0$: hướng bị đảo;
- $\lambda=0$: $v\in\operatorname{Ker}(A)$, nên $A$ suy biến.

Vector riêng luôn khác $0$, còn giá trị riêng có thể bằng $0$. Mọi bội khác $0$ của một vector riêng là vector riêng cùng giá trị riêng. Phương trình đặc trưng của một ma trận thực tổng quát có thể có nghiệm phức; với ma trận đối xứng, định lý sau bảo đảm mọi nghiệm là số thực.

::: theorem Định lý 00.16 (Phân rã trị riêng của ma trận đối xứng) — ngoài phạm vi, xem Boyd và Vandenberghe (2004)
**Giả thiết.** $A\in\mathbb S^n$.

**Kết luận.** Tồn tại ma trận trực giao $Q\in\mathbb R^{n\times n}$ và $\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$ với $\lambda_i\in\mathbb R$ sao cho
$$
A=Q\Lambda Q^T .
$$
Các $\lambda_i$ là các giá trị riêng của $A$, và cột thứ $i$ của $Q$ là một vector riêng đơn vị ứng với $\lambda_i$.
:::

Boyd và Vandenberghe (2004), §A.5.2, tr. 646–647, gọi phân tích này là *phân rã phổ* (spectral decomposition) hoặc *phân rã trị riêng* (eigenvalue decomposition, EVD); xem thêm Murphy (2022), §7.4.3. Kết hợp với Mệnh đề 00.14, các cột của $Q$ là một cơ sở trực chuẩn của $\mathbb R^n$ gồm các vector riêng của $A$. Cũng theo Boyd và Vandenberghe (2004), §A.5.2, tr. 647,
$$
\det(A)=\prod_{i=1}^n\lambda_i,\qquad \operatorname{tr}(A)=\sum_{i=1}^n\lambda_i .
$$

::: example Ví dụ 00.11 (Giá trị riêng và phân rã trị riêng của một ma trận $2\times2$)
**Dữ kiện.** $A=\begin{bmatrix}2&1\\1&2\end{bmatrix}\in\mathbb S^2$.

**Phương trình đặc trưng.**
$$
\begin{aligned}
&\det(A-\lambda I_2)\\
&\quad=(2-\lambda)^2-1\\
&\quad=(\lambda-1)(\lambda-3)=0,
\end{aligned}
$$
nên $\lambda_1=3$, $\lambda_2=1$.

**Vector riêng.** $v_1=(1,1)^T$: $Av_1=(3,3)^T=3v_1$. $v_2=(1,-1)^T$: $Av_2=(1,-1)^T=v_2$.

**Phân rã.** Chuẩn hóa hai vector riêng:
$$
\begin{aligned}
Q&=\frac1{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix},\\
\Lambda&=\begin{bmatrix}3&0\\0&1\end{bmatrix}.
\end{aligned}
$$

**Kiểm tra lại.** $Q\Lambda Q^T=\tfrac12\begin{bmatrix}3&1\\3&-1\end{bmatrix}\begin{bmatrix}1&1\\1&-1\end{bmatrix}=\tfrac12\begin{bmatrix}4&2\\2&4\end{bmatrix}=A$. Ngoài ra $\lambda_1+\lambda_2=4=\operatorname{tr}(A)$ và $\lambda_1\lambda_2=3=\det(A)$.
:::

Trong học máy, phân tích thành phần chính (principal component analysis, PCA) dùng các vector riêng của ma trận hiệp phương sai làm hướng chính và giá trị riêng làm phương sai dọc mỗi hướng. Với ma trận Hessian đối xứng, vector riêng cho các hướng cong chính và giá trị riêng cho độ cong theo các hướng đó.

### 4.6. Dạng toàn phương

Mất mát $f(w)=\tfrac12\lVert Xw-y\rVert_2^2$ chứa số hạng $\tfrac12w^TX^TXw$, một biểu thức bậc hai theo $w$. Dấu của các biểu thức như vậy quyết định hàm cong lên hay cong xuống.

::: definition Định nghĩa 00.17 (Dạng toàn phương, nửa xác định dương, xác định dương)
Cho $A\in\mathbb S^n$.

- Hàm $q:\mathbb R^n\to\mathbb R$, $q(x)=x^TAx$, là *dạng toàn phương* (quadratic form) sinh bởi $A$.
- $A$ *nửa xác định dương* (positive semidefinite, PSD), ký hiệu $A\succeq0$, nếu $x^TAx\ge0$ với mọi $x\in\mathbb R^n$.
- $A$ *xác định dương* (positive definite, PD), ký hiệu $A\succ0$, nếu $x^TAx>0$ với mọi $x\ne0$.
- $A$ *xác định âm*, ký hiệu $A\prec0$, nếu $-A\succ0$; $A$ *bất định dấu* (indefinite) nếu có $x$, $x'$ với $x^TAx>0>x'^TAx'$.
:::

Xác định dương kéo theo nửa xác định dương. Một ma trận nửa xác định dương cho phép một vector khác $0$ có $x^TAx=0$. Các phần tử đường chéo dương không đủ để xác định dương: $A=\begin{bmatrix}1&2\\2&1\end{bmatrix}$ có đường chéo dương nhưng $x=(1,-1)^T$ cho $x^TAx=1-4+1=-2$.

Dấu của dạng toàn phương đọc được từ các giá trị riêng.

::: proposition Mệnh đề 00.18 (Dạng toàn phương và giá trị riêng) — chứng minh đầy đủ
**Giả thiết.** $A\in\mathbb S^n$ với giá trị riêng nhỏ nhất $\lambda_{\min}$ và lớn nhất $\lambda_{\max}$.

**Kết luận.**
1. Với mọi $x\in\mathbb R^n$,
$$
\begin{aligned}
\lambda_{\min}\,x^Tx&\le x^TAx\\
&\le\lambda_{\max}\,x^Tx,
\end{aligned}
$$
và mỗi dấu bằng xảy ra tại một vector riêng ứng với $\lambda_{\min}$, $\lambda_{\max}$ tương ứng.
2. $A\succeq0$ khi và chỉ khi $\lambda_{\min}\ge0$; $A\succ0$ khi và chỉ khi $\lambda_{\min}>0$.
:::

::: proof Chứng minh Mệnh đề 00.18
**Lộ trình.** Đổi sang tọa độ trong cơ sở vector riêng, nơi dạng toàn phương là tổng có trọng số của các bình phương.

**Bước 1 (đổi tọa độ).** Theo Định lý 00.16, $A=Q\Lambda Q^T$ với $Q$ trực giao. Đặt $z=Q^Tx$. Theo Mệnh đề 00.14, $z$ là vector tọa độ của $x$ trong cơ sở các cột của $Q$, và $z^Tz=x^Tx$. Khi đó
$$
x^TAx=z^T\Lambda z=\sum_{i=1}^n\lambda_iz_i^2 .
$$

**Bước 2 (chặn hai phía).** Vì $\lambda_{\min}\le\lambda_i\le\lambda_{\max}$ và $z_i^2\ge0$,
$$
\begin{aligned}
\lambda_{\min}\sum_iz_i^2&\le\sum_i\lambda_iz_i^2\\
&\le\lambda_{\max}\sum_iz_i^2,
\end{aligned}
$$
và $\sum_iz_i^2=x^Tx$. Nếu $x$ là vector riêng ứng với $\lambda_{\max}$ thì $x^TAx=\lambda_{\max}x^Tx$; tương tự với $\lambda_{\min}$.

**Bước 3 (dấu).** Nếu $\lambda_{\min}\ge0$, bước 2 cho $x^TAx\ge0$ với mọi $x$. Nếu $\lambda_{\min}>0$ và $x\ne0$, bước 2 cho $x^TAx\ge\lambda_{\min}x^Tx>0$. Ngược lại, gọi $v$ là một vector riêng ứng với $\lambda_{\min}$. Khi $\lambda_{\min}<0$, $v^TAv=\lambda_{\min}\lVert v\rVert_2^2<0$, nên $A$ không nửa xác định dương. Khi $\lambda_{\min}\le0$, $v^TAv\le0$ với $v\ne0$, nên $A$ không xác định dương. $\square$
:::

Tỉ số $x^TAx/x^Tx$ với $x\ne0$ gọi là *thương Rayleigh* (Rayleigh quotient); kết luận 1 nói rằng nó nằm trong $[\lambda_{\min},\lambda_{\max}]$ và đạt hai đầu mút. Cùng phép đổi tọa độ cho hệ quả sau.

::: corollary Hệ quả 00.19 (Chặn độ dài ảnh và tính khả nghịch) — chứng minh đầy đủ
**Giả thiết.** $A\in\mathbb S^n$ với các giá trị riêng $\lambda_1,\ldots,\lambda_n$.

**Kết luận.**
1. $\lVert Ax\rVert_2\le\max_i\lvert\lambda_i\rvert\,\lVert x\rVert_2$ với mọi $x\in\mathbb R^n$; khi $A\succeq0$, vế phải là $\lambda_{\max}\lVert x\rVert_2$.
2. Nếu $A\succ0$ thì $A$ khả nghịch.
:::

::: proof Chứng minh Hệ quả 00.19
**Lộ trình.** Dùng $A=Q\Lambda Q^T$ và $z=Q^Tx$ như bước 1 của chứng minh Mệnh đề 00.18.

**Bước 1 (chặn).** $Ax=Q\Lambda z$, nên theo Mệnh đề 00.14, $\lVert Ax\rVert_2^2=\lVert\Lambda z\rVert_2^2=\sum_i\lambda_i^2z_i^2\le\max_i\lambda_i^2\sum_iz_i^2=\max_i\lambda_i^2\lVert x\rVert_2^2$. Khi $A\succeq0$, mọi $\lambda_i\ge0$ theo Mệnh đề 00.18, nên $\max_i\lvert\lambda_i\rvert=\lambda_{\max}$.

**Bước 2 (khả nghịch).** Nếu $A\succ0$ và $x\ne0$ thì $x^TAx>0$, nên $Ax\ne0$. Vậy $\operatorname{Ker}(A)=\{0\}$, và $A$ khả nghịch theo Định lý 00.12. $\square$
:::

Ma trận $X^TX$ của bài toán bình phương nhỏ nhất luôn nửa xác định dương, và tính xác định dương của nó gắn với hạng của $X$.

::: proposition Mệnh đề 00.20 (Ma trận Gram, Gram matrix, $A^TA$) — chứng minh đầy đủ
**Giả thiết.** $A\in\mathbb R^{m\times n}$.

**Kết luận.**
1. $A^TA\in\mathbb S^n$ và $A^TA\succeq0$.
2. $\operatorname{Ker}(A^TA)=\operatorname{Ker}(A)$.
3. $A^TA\succ0$ khi và chỉ khi $\operatorname{Ker}(A)=\{0\}$, khi và chỉ khi $\operatorname{rank}(A)=n$.
:::

::: proof Chứng minh Mệnh đề 00.20
**Lộ trình.** Viết $x^TA^TAx=\lVert Ax\rVert_2^2$ rồi đọc ba kết luận từ đẳng thức này.

**Bước 1 (đối xứng, nửa xác định dương).** $(A^TA)^T=A^T(A^T)^T=A^TA$. Với mọi $x$,
$$
\begin{aligned}
x^TA^TAx&=(Ax)^T(Ax)\\
&=\lVert Ax\rVert_2^2\ge0 .
\end{aligned}
$$

**Bước 2 (hạt nhân).** Nếu $Ax=0$ thì $A^TAx=0$. Ngược lại, nếu $A^TAx=0$ thì $\lVert Ax\rVert_2^2=x^TA^TAx=0$, nên $Ax=0$.

**Bước 3 (xác định dương).** Theo bước 1, $x^TA^TAx=0$ khi và chỉ khi $Ax=0$. Do đó $x^TA^TAx>0$ với mọi $x\ne0$ khi và chỉ khi $\operatorname{Ker}(A)=\{0\}$, và điều này tương đương $\operatorname{rank}(A)=n$ theo kết luận 3 của Mệnh đề 00.8. $\square$
:::

::: example Ví dụ 00.12 (Hai dạng toàn phương và các tập $q(x)=\tau$)
**Dữ kiện.** $A_1=\begin{bmatrix}1&0\\0&4\end{bmatrix}$ và $A_2=\begin{bmatrix}1&0\\0&0\end{bmatrix}$; mức $\tau>0$.

**Ma trận $A_1$.** $q_1(x)=x_1^2+4x_2^2>0$ khi $x\ne0$, nên $A_1\succ0$; giá trị riêng $1$ và $4$ đều dương, đúng Mệnh đề 00.18. Tại $x=(2,-1)^T$: $q_1(x)=4+4=8$. Tập $\{x:q_1(x)=\tau\}$ là elip có bán trục $\sqrt\tau$ theo $e_1$ và $\sqrt\tau/2$ theo $e_2$: giá trị riêng lớn hơn ứng với bán trục ngắn hơn.

**Ma trận $A_2$.** $q_2(x)=x_1^2\ge0$, nên $A_2\succeq0$; nhưng $q_2(e_2)=0$ với $e_2\ne0$, nên $A_2$ không xác định dương, ứng với giá trị riêng $0$. Tập $\{x:q_2(x)=\tau\}$ là hai đường thẳng $x_1=\pm\sqrt\tau$, không bị chặn.

**Kiểm tra lại.** Điểm $(\sqrt\tau,0)$ cho $q_1=\tau$ và điểm $(0,\sqrt\tau/2)$ cho $q_1=4\cdot\tau/4=\tau$, nên cả hai nằm trên tập $\{x:q_1(x)=\tau\}$.
:::

::: example Ví dụ 00.13 (Ma trận $X^TX$ của bốn căn nhà)
**Dữ kiện.** $X$ của Ví dụ 00.4, với cột thứ hai $(-1{,}5;\,-0{,}5;\,0{,}5;\,1{,}5)$ và cột thứ ba $(-1;\,0;\,0;\,1)$.

**Tính.** Phần tử $(j,k)$ của $X^TX$ là tích vô hướng của cột $j$ và cột $k$ của $X$:
$$
X^TX=\begin{bmatrix}4&0&0\\0&5&3\\0&3&2\end{bmatrix}.
$$
Chẳng hạn $(2,2)$: $2{,}25+0{,}25+0{,}25+2{,}25=5$; $(2,3)$: $1{,}5+0+0+1{,}5=3$.

**Xác định dương.** Theo Ví dụ 00.6, $\operatorname{Ker}(X)=\{0\}$, nên $X^TX\succ0$ theo kết luận 3 của Mệnh đề 00.20.

**Kiểm tra lại.** Giá trị riêng của $X^TX$ là $4$ và hai nghiệm của $\lambda^2-7\lambda+1=0$ (khối $\begin{bmatrix}5&3\\3&2\end{bmatrix}$ có vết $7$, định thức $1$), tức $(7\pm3\sqrt5)/2\approx6{,}854$ và $0{,}146$; cả ba dương, đúng Mệnh đề 00.18.
:::

### 4.7. Bình phương nhỏ nhất và phép chiếu

Theo Ví dụ 00.8, hệ $Xw=y$ của bốn căn nhà vô nghiệm: $y\notin\operatorname{Col}(X)$. Khi không có trọng số nào cho đúng bốn giá, chúng ta chọn trọng số làm mất mát bình phương nhỏ nhất. Một cách trực quan, $Xw$ chạy trên mặt phẳng $\operatorname{Col}(X)$ trong $\mathbb R^4$, và $\lVert Xw-y\rVert_2$ là khoảng cách từ $y$ tới điểm $Xw$ của mặt phẳng đó; điểm gần $y$ nhất là chân đường vuông góc hạ từ $y$ xuống mặt phẳng. Để làm rõ bài toán này, xem định nghĩa sau.

::: definition Định nghĩa 00.21 (Bài toán bình phương nhỏ nhất và hình chiếu)
Cho $X\in\mathbb R^{m\times n}$ và $y\in\mathbb R^m$.

- *Bài toán bình phương nhỏ nhất* (least squares problem) là bài toán cực tiểu hóa
$$
\begin{aligned}
&f(w)=\tfrac12\lVert Xw-y\rVert_2^2,\\
&w\in\mathbb R^n .
\end{aligned}
$$
- Một *nghiệm bình phương nhỏ nhất* là một $w^\star\in\mathbb R^n$ thỏa $f(w^\star)\le f(w)$ với mọi $w\in\mathbb R^n$.
- *Hình chiếu trực giao* (orthogonal projection) của $y$ lên $\operatorname{Col}(X)$ là vector $\hat y\in\operatorname{Col}(X)$ thỏa $y-\hat y\in\operatorname{Ker}(X^T)$, tức $y-\hat y$ trực giao với mọi cột của $X$.
:::

Theo kết luận 1 của Mệnh đề 00.8, $y$ viết duy nhất thành tổng của một vector trong $\operatorname{Col}(X)$ và một vector trong $\operatorname{Ker}(X^T)$, nên hình chiếu trực giao tồn tại và duy nhất. Định lý sau nối nghiệm của bài toán với hình chiếu và với một hệ tuyến tính vuông.

::: theorem Định lý 00.22 (Phương trình chuẩn) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, $f(w)=\tfrac12\lVert Xw-y\rVert_2^2$, $r(w)=Xw-y$.

**Kết luận.**
1. $w$ là nghiệm bình phương nhỏ nhất khi và chỉ khi $X^Tr(w)=0$, tức
$$
X^TXw=X^Ty .
\tag{4.1}
$$
2. Hệ (4.1), gọi là *phương trình chuẩn* (normal equations), luôn có nghiệm; với mọi nghiệm $w$, $Xw$ là hình chiếu trực giao của $y$ lên $\operatorname{Col}(X)$.
3. Nghiệm bình phương nhỏ nhất duy nhất khi và chỉ khi $\operatorname{rank}(X)=n$; khi đó $X^TX$ khả nghịch và
$$
w^\star=(X^TX)^{-1}X^Ty .
$$
:::

::: proof Chứng minh Định lý 00.22
**Lộ trình.** Khai triển $f(w+v)$ theo $v$; số hạng bậc nhất cho điều kiện tối ưu, số hạng bậc hai không âm. Sự tồn tại nghiệm của (4.1) suy từ Mệnh đề 00.8 và 00.20.

**Bước 1 (khai triển).** Với mọi $w,v\in\mathbb R^n$, $r(w+v)=r(w)+Xv$, nên
$$
\begin{aligned}
f(w+v)&=\tfrac12\bigl(r(w)+Xv\bigr)^T\\
&\qquad\times\bigl(r(w)+Xv\bigr)\\
&=f(w)+v^TX^Tr(w)\\
&\quad+\tfrac12\lVert Xv\rVert_2^2 .
\end{aligned}
$$

**Bước 2 (đủ).** Nếu $X^Tr(w)=0$ thì bước 1 cho $f(w+v)=f(w)+\tfrac12\lVert Xv\rVert_2^2\ge f(w)$ với mọi $v$, nên $w$ là nghiệm.

**Bước 3 (cần).** Giả sử $g=X^Tr(w)\ne0$. Chọn $v=-tg$ với $t>0$. Bước 1 cho
$$
\begin{aligned}
f(w-tg)&=f(w)-t\lVert g\rVert_2^2\\
&\quad+\tfrac{t^2}2\lVert Xg\rVert_2^2 ,
\end{aligned}
$$
nhỏ hơn $f(w)$ khi $0<t<2\lVert g\rVert_2^2/\lVert Xg\rVert_2^2$ (hoặc với mọi $t>0$ nếu $Xg=0$). Vậy $w$ không là nghiệm. Kết hợp bước 2, ta được kết luận 1.

**Bước 4 (tồn tại).** Áp dụng kết luận 1 của Mệnh đề 00.8 cho $A=X^TX$, vốn đối xứng: $\operatorname{Col}(X^TX)=\operatorname{Ker}(X^TX)^\perp$. Theo kết luận 2 của Mệnh đề 00.20, $\operatorname{Ker}(X^TX)=\operatorname{Ker}(X)$. Áp dụng kết luận 1 của Mệnh đề 00.8 cho $A=X^T$: $\operatorname{Col}(X^T)=\operatorname{Ker}(X)^\perp$. Do đó
$$
\begin{aligned}
\operatorname{Col}(X^TX)&=\operatorname{Ker}(X)^\perp\\
&=\operatorname{Col}(X^T)\ni X^Ty,
\end{aligned}
$$
và (4.1) có nghiệm theo kết luận 1 của Định lý 00.9.

**Bước 5 (hình chiếu).** Nếu $w$ thỏa (4.1) thì $Xw\in\operatorname{Col}(X)$ và $X^T(y-Xw)=0$, tức $y-Xw\in\operatorname{Ker}(X^T)$; theo Định nghĩa 00.21, $Xw$ là hình chiếu trực giao của $y$.

**Bước 6 (duy nhất).** Theo kết luận 2 của Định lý 00.9 và kết luận 2 của Mệnh đề 00.20, tập nghiệm của (4.1) là $w+\operatorname{Ker}(X^TX)=w+\operatorname{Ker}(X)$. Tập này có một phần tử khi và chỉ khi $\operatorname{Ker}(X)=\{0\}$, tức $\operatorname{rank}(X)=n$. Khi đó $X^TX\succ0$ theo Mệnh đề 00.20, nên $X^TX$ có hạng $n$ và khả nghịch theo Định lý 00.12; nhân hai vế của (4.1) với $(X^TX)^{-1}$ được công thức của $w^\star$. $\square$
:::

Kết luận 2 đúng cả khi $X$ thiếu hạng: nghiệm luôn tồn tại, hình chiếu $\hat y$ luôn duy nhất, chỉ có trọng số là không duy nhất. Công thức nghịch đảo cần giả thiết (A1). Bước 1 cũng cho thấy $f$ là một hàm bậc hai theo $v$ với số hạng bậc hai $\tfrac12v^TX^TXv$; dạng toàn phương này nửa xác định dương theo Mệnh đề 00.20.

::: example Ví dụ 00.14 (Phương trình chuẩn của bốn căn nhà)
**Dữ kiện.** $X$, $y$ của Ví dụ 00.4: cột thứ hai của $X$ là $(-1{,}5;\,-0{,}5;\,0{,}5;\,1{,}5)$, cột thứ ba là $(-1;\,0;\,0;\,1)$, $y=(11,12,14,19)^T$; $X^TX$ của Ví dụ 00.13.

**Vế phải.** Thành phần $j$ của $X^Ty$ là tích vô hướng của cột $j$ với $y$:
$$
\begin{aligned}
X^Ty&=\begin{bmatrix}11+12+14+19\\-16{,}5-6+7+28{,}5\\-11+0+0+19\end{bmatrix}\\
&=\begin{bmatrix}56\\13\\8\end{bmatrix}.
\end{aligned}
$$

**Giải (4.1).** Hàng đầu cho $4w_0=56$, nên $w_0=14$. Hai hàng sau là
$$
\begin{aligned}
5w_1+3w_2&=13,\\
3w_1+2w_2&=8 .
\end{aligned}
$$
Khối $\begin{bmatrix}5&3\\3&2\end{bmatrix}$ có định thức $10-9=1$; nhân phương trình thứ hai với $\tfrac53$ rồi trừ được $\tfrac13w_2=\tfrac13$, nên $w_2=1$, $w_1=2$. Vậy
$$
w_{\mathrm{LS}}=(14,2,1)^T,
$$
và đây là nghiệm duy nhất vì $\operatorname{rank}(X)=3$ (Ví dụ 00.6).

**Dự đoán và phần dư.** $\hat y_{\mathrm{LS}}=Xw_{\mathrm{LS}}=(10,13,15,18)^T$, $r_{\mathrm{LS}}=(-1,1,1,-1)^T$. *Tổng bình phương sai số* (sum of squared errors, SSE) bằng $\lVert r_{\mathrm{LS}}\rVert_2^2=4$, và $f(w_{\mathrm{LS}})=2$.

**Kiểm tra lại.** $X^Tr_{\mathrm{LS}}=(-1+1+1-1;\ 1{,}5-0{,}5+0{,}5-1{,}5;\ 1+0+0-1)^T=(0,0,0)^T$, đúng kết luận 1 của Định lý 00.22.
:::

Mất mát giảm từ $4{,}5$ tại $w^{(0)}$ xuống $2$ tại $w_{\mathrm{LS}}$, nhưng cả bốn phần dư sau khớp vẫn khác $0$: điều kiện $X^Tr=0$ nói phần dư trực giao với mọi cột của $X$, từng phần dư không cần bằng $0$. Trọng số $w_1=2$ nghĩa là mô hình dự đoán thêm $200$ triệu đồng cho mỗi $10\,\mathrm m^2$ khi số phòng giữ nguyên; $w_2=1$ nghĩa là thêm $100$ triệu đồng cho mỗi phòng ngủ khi diện tích giữ nguyên.

Trong học máy, khi hai đặc trưng gần tỉ lệ với nhau, gọi là *đa cộng tuyến* (multicollinearity), ma trận thiết kế gần thiếu hạng. Khi thiếu hạng hẳn, kết luận 3 của Định lý 00.22 không áp dụng và từng hệ số riêng lẻ không xác định được từ dữ liệu. Murphy (2022), §11.7.6, nêu rằng các đặc trưng tương quan mạnh làm việc diễn giải từng hệ số khó hơn.

Như vậy, đại số tuyến tính cho ta ma trận thiết kế $X$, cho biết hệ $Xw=y$ của bốn căn nhà vô nghiệm, và cho trọng số $w_{\mathrm{LS}}=(14,2,1)^T$ qua phương trình chuẩn. Tuy nhiên, Định lý 00.22 dùng cấu trúc riêng của hàm bậc hai $f$. Với một hàm mất mát tổng quát, chúng ta cần đạo hàm để biết khi nào một điểm là cực tiểu và đi về phía nào để mất mát giảm.

### 4.8. Đọc thêm: các phép phân rã ma trận

Nhiều phép tính trên ma trận đơn giản hơn khi viết ma trận thành tích của các ma trận tam giác, trực giao hoặc đường chéo. Murphy (2022), §7.5–7.6, trình bày các phân rã dưới đây chi tiết hơn.

Trong tiểu mục này, phân rã LU viết $PA=NM$ và phân rã giá trị kỳ dị viết $A=Q_1SQ_2^T$.

::: definition Định nghĩa 00.23 (Phân rã LU có chọn phần tử trụ)
Cho $A\in\mathbb R^{n\times n}$. Một *phân rã LU có chọn phần tử trụ* (LU factorization with partial pivoting) là đẳng thức $PA=NM$, trong đó $P$ là *ma trận hoán vị* (permutation matrix), $N$ tam giác dưới với đường chéo bằng $1$, $M$ tam giác trên.
:::

Phép đổi hàng $P$ tránh phần tử trụ bằng $0$. Với $A=\begin{bmatrix}0&1\\2&1\end{bmatrix}$, phần tử trụ đầu $a_{11}=0$; đổi hai hàng bằng $P=\begin{bmatrix}0&1\\1&0\end{bmatrix}$ được $PA=\begin{bmatrix}2&1\\0&1\end{bmatrix}$, đã tam giác trên, nên $N=I_2$ và $M=PA$. Vì $\det(N)=1$ và $\det(P)=\pm1$, theo tính nhân của định thức, $\det(A)=\det(P)\prod_im_{ii}$; ở đây $\det(A)=-1\cdot2\cdot1=-2$, khớp $0\cdot1-1\cdot2=-2$. Sau một lần phân rã, mỗi hệ $Ax=c$ giải bằng hai phép thế tam giác.

::: definition Định nghĩa 00.24 (Phân rã QR rút gọn)
Cho $A\in\mathbb R^{m\times n}$ với $m\ge n$ và $\operatorname{rank}(A)=n$. *Phân rã QR rút gọn* (reduced QR decomposition) là $A=QR$, trong đó $Q\in\mathbb R^{m\times n}$ có các cột trực chuẩn ($Q^TQ=I_n$) và $R\in\mathbb R^{n\times n}$ tam giác trên, khả nghịch.
:::

Với $A=\begin{bmatrix}1&0\\0&1\\1&0\end{bmatrix}$, $Q=\begin{bmatrix}1/\sqrt2&0\\0&1\\1/\sqrt2&0\end{bmatrix}$ và $R=\begin{bmatrix}\sqrt2&0\\0&1\end{bmatrix}$ cho $Q^TQ=I_2$ và $QR=A$. Khi $m>n$, $Q$ không vuông và $QQ^T\ne I_m$. Thế $X=QR$ vào (4.1): $R^TQ^TQRw=R^TQ^Ty$, và vì $R^T$ khả nghịch, $Rw=Q^Ty$, một hệ tam giác. Murphy (2022), §11.2.2.3, khuyên giải bình phương nhỏ nhất theo cách này hoặc bằng phân rã giá trị kỳ dị, không nghịch đảo $X^TX$, vì $X^TX$ có thể *có điều kiện xấu* (ill-conditioned): với $X^TX\succ0$, *số điều kiện* (condition number) $\lambda_{\max}/\lambda_{\min}$ của nó lớn (Murphy (2022), §7.1.4.4). Với bốn căn nhà, Ví dụ 00.13 cho số điều kiện $6{,}854/0{,}146\approx47$.

::: definition Định nghĩa 00.25 (Phân rã Cholesky)
Cho $A\in\mathbb S^n_{++}$. *Phân rã Cholesky* (Cholesky decomposition) của $A$ là $A=R^TR$, trong đó $R\in\mathbb R^{n\times n}$ tam giác trên với các phần tử đường chéo dương.
:::

Murphy (2022), §7.6.3, nêu rằng mọi ma trận đối xứng xác định dương có phân rã này; Boyd và Vandenberghe (2004), §C.3.2, dùng nó để giải hệ có ma trận xác định dương. Với $A=\begin{bmatrix}4&2\\2&2\end{bmatrix}$, $R=\begin{bmatrix}2&1\\0&1\end{bmatrix}$ cho $R^TR=\begin{bmatrix}4&2\\2&1+1\end{bmatrix}=A$.

::: definition Định nghĩa 00.26 (Phân rã giá trị kỳ dị)
Cho $A\in\mathbb R^{m\times n}$ với $\operatorname{rank}(A)=\varrho$. Một *phân rã giá trị kỳ dị* (singular value decomposition, SVD) của $A$ là $A=Q_1SQ_2^T$, trong đó $Q_1\in\mathbb R^{m\times m}$ và $Q_2\in\mathbb R^{n\times n}$ trực giao, $S\in\mathbb R^{m\times n}$ chỉ có các phần tử $s_1\ge\cdots\ge s_\varrho>0$ ở vị trí $(i,i)$, $i\le\varrho$, và bằng $0$ ở mọi vị trí khác. Các $s_i$ là *giá trị kỳ dị* (singular values) của $A$. Dạng rút gọn $A=Q_{1,\varrho}S_\varrho Q_{2,\varrho}^T$ giữ $\varrho$ cột đầu của $Q_1$ và $Q_2$ và khối $\varrho\times\varrho$ đầu $S_\varrho$ của $S$.
:::

Mọi ma trận thực đều có SVD (Murphy (2022), §7.5). Với $A=\begin{bmatrix}3&0\\0&2\\0&0\end{bmatrix}$, SVD với $Q_1=I_3$, $S=A$, $Q_2=I_2$ cho các giá trị kỳ dị $3$ và $2$, và bình phương của chúng là giá trị riêng của $A^TA=\operatorname{diag}(9,4)$. Giá trị kỳ dị luôn không âm và tồn tại cả với ma trận chữ nhật. Với $A\in\mathbb S^n_{++}$, phân rã trị riêng $A=Q\Lambda Q^T$ của Định lý 00.16, sắp các giá trị riêng giảm dần, cũng là một SVD với $Q_1=Q_2=Q$ và $S=\Lambda$ (Murphy (2022), §7.5.2).

::: definition Định nghĩa 00.27 (Giả nghịch đảo)
Cho $A\in\mathbb R^{m\times n}$ với SVD rút gọn $A=Q_{1,\varrho}S_\varrho Q_{2,\varrho}^T$. *Giả nghịch đảo* (pseudo-inverse, Moore–Penrose inverse) của $A$ là
$$
A^\dagger=Q_{2,\varrho}S_\varrho^{-1}Q_{1,\varrho}^T\in\mathbb R^{n\times m}.
$$
:::

Khi $\operatorname{rank}(X)=n$, $X^\dagger=(X^TX)^{-1}X^T$, nên $w^\star=X^\dagger y$ là công thức của Định lý 00.22; khi $X$ thiếu hạng, $X^\dagger y$ vẫn là một nghiệm của (4.1), và Murphy (2022), §7.5.3 và §11.2.2.3, tính nghiệm bình phương nhỏ nhất qua SVD theo cách này.

## 5. Giải tích nhiều biến cho hàm mất mát

Mất mát $f(w)$ là một hàm của ba biến $w_0,w_1,w_2$. Muốn biết đổi trọng số theo hướng nào thì $f$ giảm, khi nào một trọng số là cực tiểu và $f$ cong thế nào quanh đó, chúng ta cần đạo hàm của hàm nhiều biến.

### 5.1. Hàm nhiều biến, đồ thị, lát cắt và tập mức

Mất mát trả về một số, còn một *tầng* (layer) của mô hình biến một vector thành một vector khác. Trước khi lấy đạo hàm, chúng ta phân biệt hai loại hàm này và các cách nhìn hình dạng của hàm vô hướng.

::: definition Định nghĩa 00.28 (Hàm vô hướng, ánh xạ vector, đồ thị, lát cắt, tập mức)
- Một *hàm vô hướng* (scalar function) $h:\mathbb R^n\to\mathbb R$ gán cho mỗi vector một số; một *ánh xạ vector* (vector-valued map) $F:\mathbb R^n\to\mathbb R^m$ gán cho mỗi vector một vector $F(x)=(F_1(x),\ldots,F_m(x))^T$.
- *Đồ thị* (graph) của $h$ là tập $\{(x,h(x)):x\in\mathbb R^n\}\subseteq\mathbb R^{n+1}$.
- Một *lát cắt* (slice) của $h$ là hàm một biến thu được khi giữ cố định mọi biến trừ một biến.
- *Tập mức* (level set) của $h$ ứng với $\tau\in\mathbb R$ là $\mathcal L_\tau=\{x\in\mathbb R^n:h(x)=\tau\}$.
:::

Đồ thị nằm trong $\mathbb R^{n+1}$, còn tập mức nằm trong $\mathbb R^n$. Một cách trực quan, $h$ là một trường độ cao trên mặt phẳng đầu vào; lát cắt là đường quan sát dọc một trục, tập mức là đường đồng mức nối các điểm cùng độ cao. Một lát cắt chỉ cho hành vi của hàm theo một hướng.

::: example Ví dụ 00.15 (Hàm hai biến $h$ và ánh xạ vector $F$)
**Dữ kiện.** $h(u,v)=u^2+uv+2v^2+u-2v$ và $F(u,v)=(u+v,\ uv,\ u-v)^T$, xét tại $(u,v)=(1,2)$.

**Giá trị.** $h(1,2)=1+2+8+1-4=8$ là một số; $F(1,2)=(3,2,-1)^T\in\mathbb R^3$.

**Lát cắt.** Giữ $v=2$: $h(u,2)=u^2+2u+8+u-4=u^2+3u+4$, một parabol theo $u$ với đỉnh tại $u=-3/2$.

**Tập mức.** $\mathcal L_0=\{(u,v):u^2+uv+2v^2+u-2v=0\}$ là một elip, vừa xoay vừa tịnh tiến so với các trục tọa độ.

**Kiểm tra lại.** $(0,0)\in\mathcal L_0$ vì $h(0,0)=0$; $(0,1)\in\mathcal L_0$ vì $h(0,1)=2-2=0$.
:::

![Ba khung cho cùng hàm h: bề mặt z bằng h(u,v) với điểm (1,2,8); parabol lát cắt v bằng 2 có đỉnh tại u bằng âm 3 phần 2; elip tập mức h bằng 0 có tâm (âm 6 phần 7, 5 phần 7) đi qua (0,0) và (0,1).](img/lec-00/calculus-graph-slice-level-set.svg)

*Bề mặt, một lát cắt và một tập mức của $h$. Lát $v=2$ cho $u^2+3u+4>0$, nên không cắt tập mức $h=0$.*

### 5.2. Đạo hàm riêng, khả vi và gradient

Lát cắt đưa hàm nhiều biến về hàm một biến, loại hàm đã có đạo hàm.

::: definition Định nghĩa 00.29 (Đạo hàm riêng)
Cho $h:\mathbb R^n\to\mathbb R$ và $x\in\mathbb R^n$. *Đạo hàm riêng* (partial derivative) của $h$ theo biến thứ $i$ tại $x$ là
$$
\frac{\partial h}{\partial x_i}(x)=\lim_{t\to0}\frac{h(x+te_i)-h(x)}{t},
$$
nếu giới hạn tồn tại.
:::

Đạo hàm riêng là độ dốc của lát cắt song song với trục thứ $i$: các biến khác giữ nguyên giá trị, không bị đặt bằng $0$. Với $h$ của Ví dụ 00.15, $\partial h/\partial u=2u+v+1$ và $\partial h/\partial v=u+4v-2$.

Đạo hàm riêng chỉ nhìn dọc các trục. Khi tối ưu, chúng ta cần biết hàm thay đổi thế nào dưới mọi dịch chuyển nhỏ. Về mặt ý tưởng, gần $x$ đồ thị của $h$ gần một *siêu phẳng* (hyperplane), và sai khác nhỏ hơn bậc nhất theo độ dài dịch chuyển. *Ký hiệu o nhỏ* (little-o notation) viết gọn ý này: $\zeta(\Delta)=o(\lVert\Delta\rVert_2^k)$ nghĩa là $\zeta(\Delta)/\lVert\Delta\rVert_2^k\to0$ khi $\Delta\to0$.

::: definition Định nghĩa 00.30 (Khả vi và gradient)
Cho $h:\mathbb R^n\to\mathbb R$ xác định trên một tập mở chứa $x$. Hàm $h$ *khả vi* (differentiable) tại $x$ nếu tồn tại vector $\nabla h(x)\in\mathbb R^n$ sao cho, khi $\Delta\to0$,
$$
\begin{aligned}
h(x+\Delta)&=h(x)+\nabla h(x)^T\Delta\\
&\quad+o(\lVert\Delta\rVert_2).
\end{aligned}
$$
Vector $\nabla h(x)$, nếu tồn tại, là duy nhất và gọi là *gradient* của $h$ tại $x$. Hàm $h$ khả vi trên một tập mở nếu nó khả vi tại mọi điểm của tập đó.
:::

Đặt $\Delta=te_i$ và chia cho $t$: thành phần thứ $i$ của $\nabla h(x)$ bằng $\partial h/\partial x_i(x)$. Do đó gradient là vector cột của các đạo hàm riêng,
$$
\nabla h(x)=\Bigl(\frac{\partial h}{\partial x_1}(x),\ldots,\frac{\partial h}{\partial x_n}(x)\Bigr)^T .
$$
Boyd và Vandenberghe (2004), §A.4.1, tr. 640–641, định nghĩa khả vi qua đạo hàm $Dh(x)$, một ma trận hàng, và gradient là $\nabla h(x)=Dh(x)^T$. Gradient là vector cột; quy ước này quyết định vị trí chuyển vị trong quy tắc dây chuyền.

Các đạo hàm riêng có thể tồn tại tại một điểm mà hàm không khả vi tại đó. Nhận xét sau nêu một điều kiện đủ và các lớp hàm dùng trong bài.

::: remark Nhận xét 00.31 (Lớp $C^1$, $C^2$ và điều kiện đủ để khả vi) — ngoài phạm vi, xem Stewart (2016)
- Hàm $h$ thuộc *lớp $C^1$* trên tập mở $D$ nếu mọi đạo hàm riêng $\partial h/\partial x_i$ tồn tại và liên tục trên $D$; *lớp $C^2$* nếu mọi đạo hàm riêng bậc hai $\partial^2h/\partial x_i\partial x_j$ tồn tại và liên tục trên $D$.
- Nếu các đạo hàm riêng của $h$ tồn tại trong một lân cận của $x$ và liên tục tại $x$ thì $h$ khả vi tại $x$. Do đó hàm lớp $C^1$ trên $D$ khả vi trên $D$.
:::

Điều kiện đủ được trình bày ở Stewart (2016), §14.1–14.7. Mọi đa thức thuộc lớp $C^2$ trên $\mathbb R^n$, nên $h$ của Ví dụ 00.15 và mất mát $f$ đều khả vi tại mọi điểm.

::: example Ví dụ 00.16 (Đạo hàm riêng, gradient và phần dư bậc hai của $h$)
**Dữ kiện.** $h(u,v)=u^2+uv+2v^2+u-2v$, điểm $x=(1,2)$, dịch chuyển $\Delta=(\Delta u,\Delta v)$.

**Đạo hàm riêng.** $\partial h/\partial u=2u+v+1$ và $\partial h/\partial v=u+4v-2$; tại $(1,2)$ chúng bằng $5$ và $7$.

**Gradient.** $\nabla h(1,2)=(5,7)^T$, có độ dài $\lVert\nabla h(1,2)\rVert_2=\sqrt{74}$.

**Phần dư sau xấp xỉ tuyến tính.** Khai triển trực tiếp:
$$
\begin{aligned}
&h(x+\Delta)-h(x)-\nabla h(x)^T\Delta\\
&\quad=\Delta u^2+\Delta u\,\Delta v+2\Delta v^2 .
\end{aligned}
$$
Vì $2\lvert\Delta u\,\Delta v\rvert\le\Delta u^2+\Delta v^2$, ta có $\lvert\Delta u\,\Delta v\rvert\le\lVert\Delta\rVert_2^2$, nên vế phải có trị tuyệt đối không quá $4\lVert\Delta\rVert_2^2=o(\lVert\Delta\rVert_2)$, nên $h$ khả vi tại $(1,2)$ theo Định nghĩa 00.30 với gradient $(5,7)^T$.

**Kiểm tra lại.** Với $\Delta=(0{,}1;\,-0{,}1)$: $h(1{,}1;\,1{,}9)=1{,}21+2{,}09+7{,}22+1{,}1-3{,}8=7{,}82$, còn $8+5\cdot0{,}1-7\cdot0{,}1=7{,}8$; hiệu $0{,}02=0{,}01-0{,}01+0{,}02$ đúng bằng phần dư bậc hai.
:::

### 5.3. Đạo hàm theo hướng và tuyến tính hóa

Một bước cập nhật trọng số đổi nhiều trọng số cùng lúc, nên chúng ta đo độ dốc theo một hướng tùy ý.

::: definition Định nghĩa 00.32 (Đạo hàm theo hướng)
Cho $h:\mathbb R^n\to\mathbb R$, $x\in\mathbb R^n$ và hướng $d\in\mathbb R^n$ với $\lVert d\rVert_2=1$. *Đạo hàm theo hướng* (directional derivative) của $h$ tại $x$ theo $d$ là
$$
D_dh(x)=\lim_{t\to0}\frac{h(x+td)-h(x)}{t},
$$
nếu giới hạn tồn tại.
:::

Đây là đạo hàm tại $0$ của *hàm hạn chế* (restriction) $t\mapsto h(x+td)$ của $h$ lên đường thẳng qua $x$ theo hướng $d$. Với $d=e_i$, nó là đạo hàm riêng thứ $i$. Điều kiện $\lVert d\rVert_2=1$ cần để so sánh các hướng: nếu thay $d$ bằng $\alpha d$ với $\alpha>0$ trong giới hạn trên, kết quả bị nhân với $\alpha$.

::: proposition Mệnh đề 00.33 (Đạo hàm theo hướng và hướng tăng nhanh nhất) — chứng minh đầy đủ
**Giả thiết.** $h$ khả vi tại $x$; $\lVert d\rVert_2=1$.

**Kết luận.**
1. $D_dh(x)=\nabla h(x)^Td$.
2. Nếu $\nabla h(x)\ne0$ thì trên các hướng đơn vị, $D_dh(x)$ lớn nhất bằng $\lVert\nabla h(x)\rVert_2$, đạt tại $d=\nabla h(x)/\lVert\nabla h(x)\rVert_2$, và nhỏ nhất bằng $-\lVert\nabla h(x)\rVert_2$, đạt tại hướng ngược lại.
:::

::: proof Chứng minh Mệnh đề 00.33
**Lộ trình.** Đặt $\Delta=td$ vào định nghĩa khả vi, rồi chặn $\nabla h(x)^Td$ bằng bất đẳng thức Cauchy–Schwarz.

**Bước 1 (công thức).** Theo Định nghĩa 00.30 với $\Delta=td$,
$$
\begin{aligned}
&\frac{h(x+td)-h(x)}{t}\\
&\quad=\nabla h(x)^Td+\frac{o(\lvert t\rvert)}{t}\\
&\quad\xrightarrow[t\to0]{}\nabla h(x)^Td,
\end{aligned}
$$
vì $\lVert td\rVert_2=\lvert t\rvert$.

**Bước 2 (cực trị theo hướng).** Theo Mệnh đề 00.5, $\lvert\nabla h(x)^Td\rvert\le\lVert\nabla h(x)\rVert_2\lVert d\rVert_2=\lVert\nabla h(x)\rVert_2$. Với $d=\nabla h(x)/\lVert\nabla h(x)\rVert_2$, $\nabla h(x)^Td=\lVert\nabla h(x)\rVert_2$; với $d=-\nabla h(x)/\lVert\nabla h(x)\rVert_2$, giá trị là $-\lVert\nabla h(x)\rVert_2$. $\square$
:::

Goodfellow, Bengio và Courville (2016), §4.3, tr. 85, dùng đúng lập luận này để chọn hướng giảm nhanh nhất $-\nabla h$. Nếu $\nabla h(x)=0$ thì mọi đạo hàm theo hướng tại $x$ bằng $0$. Phần tuyến tính của Định nghĩa 00.30 cho một xấp xỉ của $h$ quanh $x$, gọi là *tuyến tính hóa* (linearization):
$$
h(x+\Delta)\approx h(x)+\nabla h(x)^T\Delta .
$$
Với hàm hai biến, đồ thị của vế phải là *mặt phẳng tiếp xúc* (tangent plane) $z=h(u_0,v_0)+\tfrac{\partial h}{\partial u}(u_0,v_0)(u-u_0)+\tfrac{\partial h}{\partial v}(u_0,v_0)(v-v_0)$.

::: example Ví dụ 00.17 (Đạo hàm theo hướng và tuyến tính hóa của $h$)
**Dữ kiện.** $h$ của Ví dụ 00.15; $\nabla h(1,2)=(5,7)^T$ (Ví dụ 00.16); hướng $d=(3/5,4/5)^T$; dịch chuyển $\Delta=(0{,}1;\,-0{,}1)$.

**Đạo hàm theo hướng.** $\lVert d\rVert_2=\sqrt{9/25+16/25}=1$, và theo Mệnh đề 00.33,
$$
D_dh(1,2)=5\cdot\tfrac35+7\cdot\tfrac45=\tfrac{43}5 .
$$
Hướng tăng nhanh nhất là $(5,7)^T/\sqrt{74}$, với tốc độ $\sqrt{74}\approx8{,}602$.

**Tuyến tính hóa.** Mặt phẳng tiếp xúc tại $(1,2)$ là $z=8+5(u-1)+7(v-2)$. Tại $(1{,}1;\,1{,}9)$ nó cho $8+0{,}5-0{,}7=7{,}8$, còn giá trị đúng là $7{,}82$.

**Kiểm tra lại.** Kết luận 2 của Mệnh đề 00.33 đòi $43/5\le\sqrt{74}$; thật vậy, $(43/5)^2=73{,}96\le74$. Dấu bằng không xảy ra vì $d$ khác hướng $(5,7)^T/\sqrt{74}$.
:::

![Khung trái: đường mức của h qua P bằng (1,2), gradient (5,7) vuông góc với đường mức và hướng d bằng (3/5, 4/5). Khung phải: hàm hạn chế gamma theo dịch chuyển (0,1; âm 0,1) với giá trị đúng 7,82 và tuyến tính hóa 7,8.](img/lec-00/calculus-gradient-direction-tangent.svg)

*Gradient vuông góc với đường mức qua $P$; trên hàm hạn chế $\gamma$, sai khác $0{,}02$ giữa giá trị đúng và tuyến tính hóa là số hạng bậc hai.*

### 5.4. Ma trận Jacobian và quy tắc dây chuyền

Khi đầu ra là một vector, mỗi thành phần có một gradient; xếp các gradient đã chuyển vị thành các hàng ta được một ma trận.

::: definition Định nghĩa 00.34 (Ma trận Jacobian)
Cho $F:\mathbb R^n\to\mathbb R^m$ với mọi thành phần $F_i$ khả vi tại $x$. *Ma trận Jacobian* (Jacobian matrix) của $F$ tại $x$ là
$$
\begin{aligned}
&J_F(x)\in\mathbb R^{m\times n},\\
&J_F(x)_{ij}=\frac{\partial F_i}{\partial x_j}(x).
\end{aligned}
$$
Ánh xạ $F$ *khả vi* tại $x$ nếu mọi thành phần $F_i$ khả vi tại $x$. Hàng thứ $i$ của $J_F(x)$ là $\nabla F_i(x)^T$, và $F(x+\Delta)=F(x)+J_F(x)\Delta+o(\lVert\Delta\rVert_2)$.
:::

Hàng ứng với thành phần đầu ra, cột ứng với biến đầu vào, nên $J_F$ không vuông khi $m\ne n$. Với $m=1$, $J_h(x)=\nabla h(x)^T$. Boyd và Vandenberghe (2004), §A.4.1, tr. 640, gọi $J_F(x)$ là đạo hàm $DF(x)$.

Mô hình học máy là hợp của nhiều hàm, nên chúng ta cần đạo hàm của hàm hợp. Về mặt ý tưởng, một dịch chuyển nhỏ $\Delta$ ở đầu vào thành dịch chuyển $J_F\Delta$ sau $F$, rồi thành $J_K\,J_F\Delta$ sau $K$.

::: theorem Định lý 00.35 (Quy tắc dây chuyền, chain rule) — kết luận 1 ngoài phạm vi, xem Boyd và Vandenberghe (2004)
**Giả thiết.** $F:\mathbb R^n\to\mathbb R^m$ khả vi tại $x$; $K:\mathbb R^m\to\mathbb R^p$ khả vi tại $F(x)$.

**Kết luận.**
1. $K\circ F$ khả vi tại $x$ và $J_{K\circ F}(x)=J_K(F(x))\,J_F(x)$.
2. Với $p=1$, tức $\chi:\mathbb R^m\to\mathbb R$,
$$
\begin{aligned}
&\nabla(\chi\circ F)(x)\\
&\quad=J_F(x)^T\,\nabla\chi(F(x)) .
\end{aligned}
$$
:::

Boyd và Vandenberghe (2004), §A.4.2, tr. 642, phát biểu kết luận 1. Kết luận 2 suy từ kết luận 1 bằng một phép chuyển vị: $J_\chi=\nabla\chi^T$, nên $\nabla(\chi\circ F)=(\nabla\chi(F)^TJ_F)^T=J_F^T\nabla\chi(F)$. Thứ tự các Jacobian theo đúng thứ tự áp dụng các hàm, và kích thước khớp theo $(p\times m)(m\times n)=(p\times n)$.

Nhiều phép tính chỉ cần tích của Jacobian với một vector. *Tích Jacobian–vector* (Jacobian–vector product, JVP) $J_Fd\in\mathbb R^m$ truyền một hướng $d$ từ đầu vào sang đầu ra. *Tích vector–Jacobian* (vector–Jacobian product, VJP) $\nu^TJ_F$, viết theo quy ước cột là $J_F^T\nu\in\mathbb R^n$, truyền một độ nhạy $\nu$ ở đầu ra ngược về đầu vào; kết luận 2 của Định lý 00.35 là một VJP với $\nu=\nabla\chi(F(x))$.

::: example Ví dụ 00.18 (Jacobian, JVP và VJP của $F$)
**Dữ kiện.** $F(u,v)=(u+v,\ uv,\ u-v)^T$ tại $(1,2)$, $F(1,2)=(3,2,-1)^T$; $\chi(z)=\tfrac12\lVert z\rVert_2^2$ trên $\mathbb R^3$ và $\ell=\chi\circ F$; hướng $d=(1,0)^T$.

**Jacobian.** Các hàng là gradient của $u+v$, $uv$, $u-v$:
$$
\begin{aligned}
J_F(u,v)&=\begin{bmatrix}1&1\\v&u\\1&-1\end{bmatrix},\\
J_F(1,2)&=\begin{bmatrix}1&1\\2&1\\1&-1\end{bmatrix}\in\mathbb R^{3\times2}.
\end{aligned}
$$

**JVP.** $J_F(1,2)\,d=(1,2,1)^T$.

**VJP và gradient của hàm hợp.** $\nabla\chi(z)=z$, nên $\nu=\nabla\chi(F(1,2))=(3,2,-1)^T$ và theo Định lý 00.35,
$$
\begin{aligned}
\nabla\ell(1,2)&=J_F(1,2)^T\nu\\
&=\begin{bmatrix}3+4-1\\3+2+1\end{bmatrix}=\begin{bmatrix}6\\6\end{bmatrix}.
\end{aligned}
$$

**Kiểm tra lại.** Tính trực tiếp: $\ell=\tfrac12[(u+v)^2+u^2v^2+(u-v)^2]$, $\partial\ell/\partial u=(u+v)+uv^2+(u-v)=3+4-1=6$ và $\partial\ell/\partial v=(u+v)+u^2v-(u-v)=3+2+1=6$ tại $(1,2)$.
:::

![Sơ đồ truyền tiếp JVP: hướng d bằng (1,0) trong R2 qua Jacobian 3 nhân 2 thành (1,2,1) trong R3; truyền ngược VJP: độ nhạy nu bằng F bằng (3,2,âm 1) qua chuyển vị Jacobian thành gradient (6,6).](img/lec-00/calculus-jacobian-chain-jvp-vjp.svg)

*Tuyến xanh truyền hướng theo chiều thuận; tuyến cam truyền độ nhạy theo chiều ngược.*

Trong học máy, lan truyền ngược (backpropagation) tính gradient của một mất mát vô hướng theo tham số bằng cách áp dụng kết luận 2 của Định lý 00.35 qua từng tầng, tức một chuỗi VJP từ đầu ra về đầu vào (Goodfellow, Bengio và Courville (2016), §6.5). Vì mất mát chỉ có một đầu ra, mỗi tầng chỉ cần nhân chuyển vị Jacobian với một vector, không cần lập toàn bộ Jacobian.

### 5.5. Hessian, độ cong theo hướng và khai triển Taylor

Gradient cho độ dốc; để biết độ dốc thay đổi thế nào, ta lấy đạo hàm thêm một lần.

::: definition Định nghĩa 00.36 (Ma trận Hessian)
Cho $h:\mathbb R^n\to\mathbb R$ có các đạo hàm riêng bậc hai tại $x$. *Ma trận Hessian* (Hessian matrix) của $h$ tại $x$ là
$$
\begin{aligned}
&\nabla^2h(x)\in\mathbb R^{n\times n},\\
&\nabla^2h(x)_{ij}=\frac{\partial^2h}{\partial x_i\,\partial x_j}(x).
\end{aligned}
$$
:::

Hessian chỉ định nghĩa cho hàm vô hướng; khi $h$ khả vi hai lần, nó là Jacobian của ánh xạ gradient $x\mapsto\nabla h(x)$ (Boyd và Vandenberghe (2004), §A.4.3, tr. 643–644). Với $h$ của Ví dụ 00.15, $\nabla^2h=\begin{bmatrix}2&1\\1&4\end{bmatrix}$ tại mọi điểm.

::: theorem Định lý 00.37 (Tính đối xứng của Hessian; định lý Schwarz, còn gọi là định lý Clairaut) — ngoài phạm vi, xem Goodfellow, Bengio và Courville (2016)
**Giả thiết.** $h$ thuộc lớp $C^2$ trên một tập mở chứa $x$.

**Kết luận.** $\dfrac{\partial^2h}{\partial x_i\,\partial x_j}(x)=\dfrac{\partial^2h}{\partial x_j\,\partial x_i}(x)$ với mọi $i,j$, tức $\nabla^2h(x)\in\mathbb S^n$.
:::

Goodfellow, Bengio và Courville (2016), §4.3.1, tr. 87, nêu kết quả cho các điểm mà đạo hàm riêng bậc hai liên tục. Khi thiếu giả thiết liên tục, không được tự động đổi thứ tự hai đạo hàm hỗn hợp. Với Hessian đối xứng, Định lý 00.16 cho một cơ sở trực chuẩn gồm các vector riêng của $\nabla^2h(x)$.

Để đọc độ cong theo một hướng, ta hạn chế $h$ lên đường thẳng theo hướng đó. Mệnh đề sau là quy tắc dây chuyền cho hàm hạn chế.

::: proposition Mệnh đề 00.38 (Đạo hàm của hàm hạn chế lên một đường thẳng) — chứng minh đầy đủ
**Giả thiết.** $h$ thuộc lớp $C^2$ trên một tập mở $D$; $x\in D$, $d\in\mathbb R^n$; $\gamma(t)=h(x+td)$ trên khoảng mở các $t$ có $x+td\in D$.

**Kết luận.**
$$
\begin{aligned}
\gamma'(t)&=\nabla h(x+td)^Td,\\
\gamma''(t)&=d^T\,\nabla^2h(x+td)\,d .
\end{aligned}
$$
:::

::: proof Chứng minh Mệnh đề 00.38
**Lộ trình.** Viết $\gamma$ là hàm hợp của $h$ với đường thẳng $t\mapsto x+td$, áp dụng quy tắc dây chuyền một lần cho $\gamma'$, rồi một lần nữa cho từng đạo hàm riêng.

**Bước 1 (đạo hàm bậc nhất).** Ánh xạ $\kappa(t)=x+td$ từ $\mathbb R$ vào $\mathbb R^n$ có Jacobian $J_\kappa(t)=d\in\mathbb R^{n\times1}$. Theo Nhận xét 00.31, $h$ khả vi trên $D$; theo kết luận 1 của Định lý 00.35, $\gamma=h\circ\kappa$ có $\gamma'(t)=J_h(x+td)\,d=\nabla h(x+td)^Td$.

**Bước 2 (đạo hàm bậc hai).** Đặt $\beta(t)=\nabla h(x+td)^Td=\sum_id_i\,\tfrac{\partial h}{\partial x_i}(x+td)$. Mỗi $\partial h/\partial x_i$ thuộc lớp $C^1$ trên $D$, có gradient là cột thứ $i$ của $\nabla^2h$ (đối xứng theo Định lý 00.37). Áp dụng bước 1 cho từng $\partial h/\partial x_i$:
$$
\begin{aligned}
\gamma''(t)&=\beta'(t)\\
&=\sum_id_i\,\Bigl(\nabla\tfrac{\partial h}{\partial x_i}(x+td)\Bigr)^Td\\
&=\sum_{i,j}d_i\,\nabla^2h(x+td)_{ij}\,d_j\\
&=d^T\nabla^2h(x+td)\,d .\qquad\square
\end{aligned}
$$
:::

Với $\lVert d\rVert_2=1$, $\gamma''(0)=d^T\nabla^2h(x)d$ là *độ cong theo hướng* (directional curvature, directional second derivative) của $h$ tại $x$: dương thì hàm hạn chế cong lên, âm thì cong xuống. Trên một vector riêng đơn vị của $\nabla^2h(x)$, độ cong bằng giá trị riêng tương ứng; theo Mệnh đề 00.18, mọi độ cong theo hướng nằm giữa $\lambda_{\min}$ và $\lambda_{\max}$ của Hessian. Thay $d$ bằng $\alpha d$ nhân độ cong với $\alpha^2$, nên muốn so sánh các hướng cần chuẩn hóa $d$.

Bước 2 của chứng minh Mệnh đề 00.38 còn cho đạo hàm của từng thành phần gradient dọc đường thẳng. Lấy tích phân theo công thức Newton–Leibniz cho hệ quả sau, dùng khi so sánh gradient tại hai điểm.

::: corollary Hệ quả 00.39 (Hiệu hai gradient) — chứng minh đầy đủ
**Giả thiết.** $h$ thuộc lớp $C^2$ trên một tập mở $D$; $x\in D$, $d\in\mathbb R^n$ và $x+td\in D$ với mọi $t\in[0,1]$.

**Kết luận.**
$$
\begin{aligned}
&\nabla h(x+d)-\nabla h(x)\\
&\quad=\int_0^1\nabla^2h(x+td)\,d\,dt ,
\end{aligned}
$$
với tích phân lấy theo từng thành phần.
:::

::: proof Chứng minh Hệ quả 00.39
**Lộ trình.** Áp dụng công thức Newton–Leibniz cho từng thành phần của gradient dọc đoạn thẳng từ $x$ tới $x+d$.

Đặt $\beta_i(t)=\tfrac{\partial h}{\partial x_i}(x+td)$. Theo bước 2 của chứng minh Mệnh đề 00.38, $\beta_i'(t)=\bigl(\nabla^2h(x+td)\,d\bigr)_i$, liên tục theo $t$ vì $h\in C^2$. Công thức Newton–Leibniz cho $\beta_i(1)-\beta_i(0)=\int_0^1\beta_i'(t)\,dt$, tức thành phần $i$ của kết luận. $\square$
:::

Boyd và Vandenberghe (2004), §9.5.3, dùng đẳng thức này khi phân tích phương pháp Newton.

Ghép gradient với Hessian, ta được một xấp xỉ cục bộ sát hơn tuyến tính hóa.

::: theorem Định lý 00.40 (Khai triển Taylor bậc hai) — phác thảo
**Giả thiết.** $h$ thuộc lớp $C^2$ trên một tập mở chứa $x$.

**Kết luận.** Khi $\Delta\to0$,
$$
\begin{aligned}
h(x+\Delta)&=h(x)+\nabla h(x)^T\Delta\\
&\quad+\tfrac12\Delta^T\nabla^2h(x)\Delta\\
&\quad+o(\lVert\Delta\rVert_2^2).
\end{aligned}
$$
Nếu $h$ là đa thức bậc hai thì đẳng thức đúng với mọi $\Delta$ và không có số hạng $o(\lVert\Delta\rVert_2^2)$.
:::

::: proof Phác thảo chứng minh Định lý 00.40
**Lộ trình.** Viết $\Delta=td$ với $\lVert d\rVert_2=1$, $t=\lVert\Delta\rVert_2$, rồi áp dụng Taylor một biến cho $\gamma(t)=h(x+td)$.

**Bước 1 (một hướng cố định).** Theo Mệnh đề 00.38, $\gamma(0)=h(x)$, $\gamma'(0)=\nabla h(x)^Td$, $\gamma''(0)=d^T\nabla^2h(x)d$. Khai triển Taylor một biến (kiến thức tiên quyết) cho
$$
\begin{aligned}
h(x+td)&=h(x)+t\,\nabla h(x)^Td\\
&\quad+\tfrac{t^2}2\,d^T\nabla^2h(x)d\\
&\quad+o(t^2),
\end{aligned}
$$
và $t\,d=\Delta$ cho đúng các số hạng của kết luận.

**Bước 2 (đều theo hướng).** Bước 1 cho phần dư $o(t^2)$ với từng $d$; muốn phần dư nhỏ đều theo mọi hướng đơn vị, cần dùng tính liên tục của $\nabla^2h$ quanh $x$. Phần này nằm ngoài phạm vi học phần; xem Boyd và Vandenberghe (2004), §A.4.3, tr. 643–644.

**Bước 3 (đa thức bậc hai).** Nếu $h$ là đa thức bậc hai thì $\gamma$ là đa thức bậc hai theo $t$, nên khai triển Taylor của $\gamma$ tại $0$ đúng không phần dư. $\square$
:::

Bỏ số hạng chứa Hessian được tuyến tính hóa, còn gọi là *khai triển Taylor bậc nhất*. Hệ số $\tfrac12$ trước số hạng Hessian đến từ $\tfrac12\gamma''(0)t^2$ của Taylor một biến.

::: example Ví dụ 00.19 (Độ cong theo hướng và khai triển Taylor của $h$)
**Dữ kiện.** $h$ của Ví dụ 00.15, $\nabla^2h=\begin{bmatrix}2&1\\1&4\end{bmatrix}$; tại $(1,2)$: $h=8$, $\nabla h=(5,7)^T$; $\Delta=(0{,}1;\,-0{,}1)$.

**Độ cong theo hai hướng.** Hướng $e_1$: $e_1^T\nabla^2h\,e_1=2$. Hướng $d=(1,1)^T/\sqrt2$: $d^T\nabla^2h\,d=\tfrac12(2+1+1+4)=4$.

**Taylor bậc hai.** $\nabla h^T\Delta=0{,}5-0{,}7=-0{,}2$ và
$$
\begin{aligned}
&\tfrac12\Delta^T\nabla^2h\,\Delta\\
&\quad=\tfrac12\bigl(2\cdot0{,}01-2\cdot0{,}01\\
&\qquad+4\cdot0{,}01\bigr)\\
&\quad=0{,}02,
\end{aligned}
$$
nên khai triển cho $8-0{,}2+0{,}02=7{,}82$.

**Kiểm tra lại.** Giá trị đúng $h(1{,}1;\,1{,}9)=7{,}82$ (Ví dụ 00.16); khai triển không có sai số vì $h$ là đa thức bậc hai (Định lý 00.40). Phương trình đặc trưng $(2-\lambda)(4-\lambda)-1=\lambda^2-6\lambda+7=0$ cho hai giá trị riêng $3\pm\sqrt2$, và hai độ cong $2$, $4$ nằm trong $[3-\sqrt2,\,3+\sqrt2]\approx[1{,}59;\,4{,}41]$, đúng Mệnh đề 00.18.
:::

### 5.6. Điểm dừng và điều kiện tối ưu bậc nhất

Với một hàm mất mát tổng quát, không có công thức như phương trình chuẩn. Chúng ta cần một điều kiện mà mọi cực tiểu địa phương đều thỏa, để thu hẹp các ứng viên.

::: definition Định nghĩa 00.41 (Cực tiểu địa phương, điểm dừng, điểm yên ngựa)
Cho $h:D\to\mathbb R$ với $D\subseteq\mathbb R^n$ mở và $x^*\in D$.

- $x^*$ là *cực tiểu địa phương* (local minimum) của $h$ nếu có $\delta>0$ sao cho $h(x^*)\le h(x)$ với mọi $x\in D$, $\lVert x-x^*\rVert_2<\delta$; là *cực tiểu địa phương chặt* nếu bất đẳng thức là chặt với mọi $x\ne x^*$ như vậy. Cực đại địa phương định nghĩa tương tự với $\ge$.
- $x^*$ là *cực tiểu toàn cục* (global minimum) nếu $h(x^*)\le h(x)$ với mọi $x\in D$.
- Khi $h$ khả vi tại $x^*$, $x^*$ là *điểm dừng* (stationary point, critical point) nếu $\nabla h(x^*)=0$.
- Một điểm dừng không là cực tiểu địa phương cũng không là cực đại địa phương gọi là *điểm yên ngựa* (saddle point).
:::

Một cách trực quan, tại cực tiểu địa phương trong miền mở, không có hướng nào để đi xuống, nên mọi đạo hàm theo hướng phải bằng $0$.

::: theorem Định lý 00.42 (Điều kiện cần bậc nhất) — chứng minh đầy đủ
**Giả thiết.** $D\subseteq\mathbb R^n$ mở; $h:D\to\mathbb R$ khả vi tại $x^*\in D$; $x^*$ là cực tiểu địa phương hoặc cực đại địa phương của $h$.

**Kết luận.** $\nabla h(x^*)=0$.
:::

::: proof Chứng minh Định lý 00.42
**Lộ trình.** Hạn chế $h$ lên các đường thẳng qua $x^*$ và dùng điều kiện cực trị một biến.

**Bước 1 (hàm một biến).** Xét cực tiểu địa phương; trường hợp cực đại áp dụng cho $-h$. Với một hướng đơn vị $d$, đặt $\gamma(t)=h(x^*+td)$. Vì $D$ mở, $x^*+td\in D$ khi $\lvert t\rvert$ đủ nhỏ, và $\gamma$ đạt cực tiểu địa phương tại điểm trong $t=0$.

**Bước 2 (đạo hàm bằng $0$).** Theo Mệnh đề 00.33, $\gamma'(0)=D_dh(x^*)=\nabla h(x^*)^Td$. Theo điều kiện cực trị một biến (kiến thức tiên quyết), $\gamma'(0)=0$. Vậy $\nabla h(x^*)^Td=0$ với mọi hướng đơn vị $d$.

**Bước 3 (kết luận).** Nếu $\nabla h(x^*)\ne0$, chọn $d=\nabla h(x^*)/\lVert\nabla h(x^*)\rVert_2$ được $\lVert\nabla h(x^*)\rVert_2=0$, mâu thuẫn. $\square$
:::

Định lý 00.42 cho điều kiện cần, chưa đủ: một điểm dừng có thể là cực tiểu, cực đại hoặc điểm yên ngựa. Giả thiết "$D$ mở" cần cho bước 1: tại một điểm biên, chỉ đi được theo một số hướng, và hàm $t\mapsto t$ trên $[0,1]$ đạt cực tiểu tại $0$ với đạo hàm bằng $1$.

::: example Ví dụ 00.20 (Điểm dừng của $h$ và một điểm yên ngựa)
**Dữ kiện.** $h(u,v)=u^2+uv+2v^2+u-2v$ với $\nabla h=(2u+v+1,\ u+4v-2)^T$ (Ví dụ 00.16); $s(u,v)=u^2-v^2$.

**Điểm dừng của $h$.** Giải $2u+v=-1$ và $u+4v=2$: từ phương trình đầu, $v=-1-2u$; thế vào phương trình sau, $u-4-8u=2$, nên $u=-6/7$ và $v=-1+12/7=5/7$. Điểm dừng duy nhất là $x^*=(-6/7,5/7)$, với $h(x^*)=-8/7$.

**Điểm dừng của $s$.** $\nabla s=(2u,-2v)^T=0$ tại $(0,0)$. Dọc trục $u$, $s(t,0)=t^2>0$ khi $t\ne0$; dọc trục $v$, $s(0,t)=-t^2<0$. Gốc là điểm dừng nhưng là điểm yên ngựa.

**Kiểm tra lại.** $2(-6/7)+5/7+1=(-12+5+7)/7=0$ và $-6/7+20/7-2=(14-14)/7=0$. Điểm $x^*$ cũng là tâm của elip $\mathcal L_0$ ở Ví dụ 00.15.
:::

### 5.7. Phân loại điểm dừng bằng Hessian

Gradient bằng $0$ không phân biệt cực tiểu, cực đại và điểm yên ngựa. Tại điểm dừng, số hạng bậc nhất của Taylor biến mất, nên số hạng Hessian quyết định dáng điệu của hàm gần điểm đó.

::: theorem Định lý 00.43 (Điều kiện bậc hai) — chứng minh đầy đủ từ Định lý 00.40
**Giả thiết.** $h$ thuộc lớp $C^2$ trên một tập mở chứa $x^*$, và $\nabla h(x^*)=0$. Đặt $H=\nabla^2h(x^*)$.

**Kết luận.**
1. Nếu $H\succ0$ thì $x^*$ là cực tiểu địa phương chặt.
2. Nếu $H\prec0$ thì $x^*$ là cực đại địa phương chặt.
3. Nếu $H$ bất định dấu thì $x^*$ là điểm yên ngựa.
:::

::: proof Chứng minh Định lý 00.43
**Lộ trình.** Theo Định lý 00.40 với $\nabla h(x^*)=0$, $h(x^*+\Delta)-h(x^*)=\tfrac12\Delta^TH\Delta+o(\lVert\Delta\rVert_2^2)$; chặn dạng toàn phương bằng Mệnh đề 00.18.

**Bước 1 ($H\succ0$).** Theo Mệnh đề 00.18, $\lambda_{\min}(H)>0$ và $\Delta^TH\Delta\ge\lambda_{\min}\lVert\Delta\rVert_2^2$. Chọn $\delta>0$ sao cho phần dư $o(\lVert\Delta\rVert_2^2)$ có trị tuyệt đối không quá $\tfrac14\lambda_{\min}\lVert\Delta\rVert_2^2$ khi $\lVert\Delta\rVert_2<\delta$. Khi đó, với $0<\lVert\Delta\rVert_2<\delta$,
$$
\begin{aligned}
&h(x^*+\Delta)-h(x^*)\\
&\quad\ge\tfrac12\lambda_{\min}\lVert\Delta\rVert_2^2\\
&\qquad-\tfrac14\lambda_{\min}\lVert\Delta\rVert_2^2\\
&\quad=\tfrac14\lambda_{\min}\lVert\Delta\rVert_2^2>0 .
\end{aligned}
$$

**Bước 2 ($H\prec0$).** Áp dụng bước 1 cho $-h$, có Hessian $-H\succ0$.

**Bước 3 ($H$ bất định dấu).** Theo Mệnh đề 00.18, $H$ có một giá trị riêng $\lambda_+>0$ với vector riêng đơn vị $d_+$ và một giá trị riêng $\lambda_-<0$ với vector riêng đơn vị $d_-$. Với $\gamma_\pm(t)=h(x^*+td_\pm)$, Mệnh đề 00.38 cho $\gamma_\pm'(0)=0$ và $\gamma_\pm''(0)=\lambda_\pm$. Theo Taylor một biến, $\gamma_+(t)>\gamma_+(0)$ và $\gamma_-(t)<\gamma_-(0)$ khi $0<\lvert t\rvert$ đủ nhỏ. Vậy mọi lân cận của $x^*$ chứa điểm có giá trị lớn hơn và điểm có giá trị nhỏ hơn $h(x^*)$. $\square$
:::

Ba trường hợp trên không phủ hết các khả năng: khi $H$ nửa xác định dương hoặc nửa xác định âm và có giá trị riêng bằng $0$, Định lý 00.43 không kết luận được. Goodfellow, Bengio và Courville (2016), §4.3.1, tr. 89–90, nêu phép thử bậc hai và trường hợp này.

::: remark Nhận xét 00.44 (Khi bỏ giả thiết: Hessian suy biến)
Với $n=1$, Hessian là đạo hàm bậc hai. Ba hàm sau cùng có điểm dừng tại $0$ với đạo hàm bậc hai bằng $0$, nhưng cho ba kết cục khác nhau:

- $t\mapsto t^4$: cực tiểu chặt tại $0$;
- $t\mapsto-t^4$: cực đại chặt tại $0$;
- $t\mapsto t^3$: không là cực trị, vì $t^3<0$ khi $t<0$ và $t^3>0$ khi $t>0$.
:::

::: example Ví dụ 00.21 (Phân loại điểm dừng của $h$)
**Dữ kiện.** $h$ của Ví dụ 00.15, điểm dừng $x^*=(-6/7,5/7)$ (Ví dụ 00.20), $\nabla^2h=\begin{bmatrix}2&1\\1&4\end{bmatrix}$ với giá trị riêng $3\pm\sqrt2$ (Ví dụ 00.19).

**Phân loại.** $3-\sqrt2\approx1{,}59>0$, nên $\nabla^2h(x^*)\succ0$ theo Mệnh đề 00.18, và theo kết luận 1 của Định lý 00.43, $x^*$ là cực tiểu địa phương chặt, với $h(x^*)=-8/7$.

**Kiểm tra lại.** Giá trị của $h$ tại hai điểm gần $x^*$: $h(-6/7+0{,}1;\,5/7)$ và $h(-6/7;\,5/7+0{,}1)$ lớn hơn $-8/7$ lần lượt $\tfrac12\cdot2\cdot0{,}01=0{,}01$ và $\tfrac12\cdot4\cdot0{,}01=0{,}02$, vì $h$ là đa thức bậc hai và $\nabla h(x^*)=0$.
:::

![Khung trái: đường mức của h quanh điểm dừng (âm 6/7, 5/7) với hai hướng riêng, ít cong ứng với 3 trừ căn 2 và nhiều cong ứng với 3 cộng căn 2. Khung giữa: hai hàm hạn chế theo hướng e1 và (1,1)/căn 2 có độ cong khác nhau. Khung phải: Taylor tại (1,2), bậc nhất 7,8 cộng hiệu chỉnh 0,02 bằng 7,82.](img/lec-00/calculus-hessian-curvature-taylor.svg)

*Đường mức quanh cực tiểu, hai hàm hạn chế có độ cong khác nhau và hiệu chỉnh Taylor bậc hai từ $7{,}8$ lên $7{,}82$.*

### 5.8. Gradient, Hessian của mất mát bình phương và một bước hạ gradient

Các công cụ trên áp dụng trực tiếp cho mất mát $f(w)=\tfrac12\lVert Xw-y\rVert_2^2$ của bốn căn nhà.

::: proposition Mệnh đề 00.45 (Gradient và Hessian của mất mát bình phương) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, $r(w)=Xw-y$, $f(w)=\tfrac12\lVert r(w)\rVert_2^2$.

**Kết luận.**
$$
\begin{aligned}
\nabla f(w)&=X^Tr(w)\\
&=X^TXw-X^Ty,\\
\nabla^2f(w)&=X^TX .
\end{aligned}
$$
Do đó $\nabla f(w)=0$ khi và chỉ khi $w$ thỏa phương trình chuẩn (4.1).
:::

::: proof Chứng minh Mệnh đề 00.45
**Lộ trình.** Áp dụng quy tắc dây chuyền cho $f=\chi\circ r$, rồi lấy Jacobian của gradient.

**Bước 1 (gradient).** $f=\chi\circ r$ với $\chi(z)=\tfrac12\lVert z\rVert_2^2$, $\nabla\chi(z)=z$, và $r(w)=Xw-y$ có $J_r=X$. Theo kết luận 2 của Định lý 00.35, $\nabla f(w)=X^T\nabla\chi(r(w))=X^Tr(w)$.

**Bước 2 (Hessian).** $\nabla f(w)=X^TXw-X^Ty$ là ánh xạ affine của $w$, có Jacobian $X^TX$; Hessian là Jacobian của ánh xạ gradient, nên $\nabla^2f(w)=X^TX$ với mọi $w$. $\square$
:::

Mệnh đề 00.45 và Định lý 00.22 đi tới cùng phương trình (4.1) theo hai đường: một đường qua đạo hàm, một đường qua khai triển trực tiếp $f(w+v)$. Theo Mệnh đề 00.20, Hessian $X^TX$ nửa xác định dương tại mọi điểm; với bốn căn nhà nó xác định dương (Ví dụ 00.13), nên theo Định lý 00.43, $w_{\mathrm{LS}}$ là cực tiểu địa phương chặt, và theo Định lý 00.22 còn là cực tiểu toàn cục duy nhất.

::: example Ví dụ 00.22 (Gradient tại trọng số thử)
**Dữ kiện.** $X$ của Ví dụ 00.4, $w^{(0)}=(14,1,1)^T$, $r^{(0)}=(0{,}5;\,1{,}5;\,0{,}5;\,-2{,}5)^T$ (Ví dụ 00.2).

**Tính.** Theo Mệnh đề 00.45, thành phần $j$ của $\nabla f(w^{(0)})=X^Tr^{(0)}$ là tích vô hướng của cột $j$ của $X$ với $r^{(0)}$:
$$
\begin{aligned}
(\nabla f)_0&=0{,}5+1{,}5+0{,}5-2{,}5\\
&=0,\\
(\nabla f)_1&=-0{,}75-0{,}75+0{,}25\\
&\quad-3{,}75=-5,\\
(\nabla f)_2&=-0{,}5+0+0-2{,}5\\
&=-3 .
\end{aligned}
$$
Vậy $\nabla f(w^{(0)})=(0,-5,-3)^T$, và $\nabla^2f=X^TX$ của Ví dụ 00.13.

**Kiểm tra lại.** Theo (4.1), $\nabla f(w^{(0)})=X^TXw^{(0)}-X^Ty=(56,\,5+3,\,3+2)^T-(56,13,8)^T=(0,-5,-3)^T$.
:::

Gradient khác $0$, nên $w^{(0)}$ không là nghiệm. Hướng $-\nabla f(w^{(0)})=(0,5,3)^T$ tăng $w_1$ và $w_2$; theo Mệnh đề 00.33, đây là hướng $f$ giảm nhanh nhất tại $w^{(0)}$. Khi không giải được phương trình chuẩn trực tiếp, ta đi từng bước theo hướng này.

::: definition Định nghĩa 00.46 (Một bước hạ gradient)
Cho $f:\mathbb R^n\to\mathbb R$ khả vi và *độ dài bước* (step size, learning rate) $\eta>0$. *Một bước hạ gradient* (gradient descent step) từ $w$ là
$$
w^+=w-\eta\,\nabla f(w).
$$
:::

Với mất mát bình phương, khai triển ở bước 1 của chứng minh Định lý 00.22 với $v=-\eta g$, $g=\nabla f(w)$, cho công thức chính xác
$$
\begin{aligned}
f(w-\eta g)&=f(w)-\eta\lVert g\rVert_2^2\\
&\quad+\tfrac{\eta^2}2\lVert Xg\rVert_2^2 .
\end{aligned}
\tag{5.1}
$$
Khi $g\ne0$ và $Xg\ne0$, vế phải của (5.1) là đa thức bậc hai theo $\eta$, nhỏ nhất tại $\eta^\star=\lVert g\rVert_2^2/\lVert Xg\rVert_2^2$ và giảm theo $\eta$ trên $[0,\eta^\star]$. Do đó $f(w-\eta g)<f(w)$ khi và chỉ khi $0<\eta<2\eta^\star$; bước dài hơn $\eta^\star$ làm mất mát giảm ít đi, và từ $2\eta^\star$ trở lên thì mất mát không giảm.

::: example Ví dụ 00.23 (Một bước hạ gradient với $\eta=0{,}1$)
**Dữ kiện.** $X$, $y$ của Ví dụ 00.4; $w^{(0)}=(14,1,1)^T$, $f(w^{(0)})=4{,}5$, $g=\nabla f(w^{(0)})=(0,-5,-3)^T$ (Ví dụ 00.22); $\eta=0{,}1$.

**Bước.** $w^+=w^{(0)}-0{,}1\,g=(14;\ 1{,}5;\ 1{,}3)^T$.

**Mất mát mới.** $\hat y=Xw^+=(10{,}45;\ 13{,}25;\ 14{,}75;\ 17{,}55)^T$ và $r(w^+)=(-0{,}55;\ 1{,}25;\ 0{,}75;\ -1{,}45)^T$, nên
$$
\begin{aligned}
f(w^+)&=\tfrac12(0{,}3025+1{,}5625\\
&\qquad+0{,}5625+2{,}1025)\\
&=\tfrac12\cdot4{,}53=2{,}265 .
\end{aligned}
$$

**Kiểm tra lại.** Theo (5.1): $\lVert g\rVert_2^2=34$, $Xg=(10{,}5;\ 2{,}5;\ -2{,}5;\ -10{,}5)^T$, $\lVert Xg\rVert_2^2=233$, nên $f(w^+)=4{,}5-3{,}4+\tfrac{0{,}01}2\cdot233=2{,}265$. Ở đây $\eta^\star=34/233\approx0{,}146$, nên $\eta=0{,}1$ nằm trong đoạn $[0,\eta^\star]$.
:::

Mất mát giảm từ $4{,}5$ xuống $2{,}265$, còn cách giá trị nhỏ nhất $f(w_{\mathrm{LS}})=2$ của Ví dụ 00.14 một khoảng $0{,}265$.

![Khung trái: trong không gian dữ liệu R4, y, mặt phẳng Col(X), hình chiếu y mũ bằng Xw và phần dư vuông góc. Khung phải: lát w0 bằng 14 của không gian tham số, một bước theo hướng âm gradient với eta bằng 0,1 làm f giảm từ 4,5 xuống 2,265; giá trị nhỏ nhất 2 tại w LS.](img/lec-00/calculus-least-squares-projection-step.svg)

*Khung trái nằm trong không gian dữ liệu; khung phải là lát $w_0=14$ của không gian tham số.*

Trong học máy, khi số trọng số lớn, việc lập và giải hệ (4.1) tốn kém, và hạ gradient cập nhật trọng số chỉ bằng các tích $X^Tr$. Ngưỡng của $\eta$ trong (5.1) phụ thuộc $X$: đổi thang đặc trưng làm đổi $X^TX$. Goodfellow, Bengio và Courville (2016), §4.3.1, tr. 89–90, nêu rằng khi Hessian có số điều kiện $\lambda_{\max}/\lambda_{\min}$ lớn, hạ gradient hoạt động kém vì khó chọn một độ dài bước tốt cho mọi hướng. Phép dịch tâm và đổi thang của Ví dụ 00.1 làm $X^TX$ có khối đầu tách riêng: hàng đầu của $X^TX$ là $(4,0,0)$.

Bài tập sau kiểm tra cách tính phần dư, gradient và một bước hạ gradient trên bốn căn nhà.

::: exercise Bài tập 00.1 (Một bước hạ gradient với $\eta=0{,}05$)
Dùng dữ liệu bốn căn nhà của Ví dụ 00.1, với $(a_i',b_i')$ lần lượt là $(-1{,}5;\,-1)$, $(-0{,}5;\,0)$, $(0{,}5;\,0)$, $(1{,}5;\,1)$, $y=(11,12,14,19)^T$, trọng số thử $w^{(0)}=(14,1,1)^T$ và $\nabla f(w^{(0)})=(0,-5,-3)^T$.

1. Tính $w^+=w^{(0)}-\eta\nabla f(w^{(0)})$ với $\eta=0{,}05$.
2. Tính $\hat y=Xw^+$, $r(w^+)$ và $f(w^+)$.
3. So sánh $f(w^+)$ với $f(w^{(0)})=4{,}5$ và với giá trị $2{,}265$ của bước $\eta=0{,}1$ (Ví dụ 00.23).
:::

::: hint
Câu 2: $\hat y_i=w_0^++w_1^+a_i'+w_2^+b_i'$. Câu 3: viết (5.1) thành đa thức bậc hai theo $\eta$ với $\lVert g\rVert_2^2=34$ và $\lVert Xg\rVert_2^2=233$.
:::

::: solution
**Câu 1.** $w^+=(14,1,1)^T-0{,}05\,(0,-5,-3)^T=(14;\ 1{,}25;\ 1{,}15)^T$.

**Câu 2.** $\hat y=(14-1{,}875-1{,}15;\ 14-0{,}625;\ 14+0{,}625;\ 14+1{,}875+1{,}15)^T=(10{,}975;\ 13{,}375;\ 14{,}625;\ 17{,}025)^T$. Phần dư $r(w^+)=(-0{,}025;\ 1{,}375;\ 0{,}625;\ -1{,}975)^T$. Tổng bình phương là $0{,}000625+1{,}890625+0{,}390625+3{,}900625=6{,}1825$, nên $f(w^+)=3{,}09125$.

**Câu 3.** $f$ giảm từ $4{,}5$ xuống $3{,}09125$, ít hơn mức giảm xuống $2{,}265$ của bước $\eta=0{,}1$. Lý do: theo (5.1), $f(w^{(0)}-\eta g)=4{,}5-34\eta+116{,}5\eta^2$ giảm theo $\eta$ trên $[0,\eta^\star]$ với $\eta^\star=\lVert g\rVert_2^2/\lVert Xg\rVert_2^2=34/233\approx0{,}146$; cả $0{,}05$ và $0{,}1$ nằm trong đoạn này, nên bước dài hơn giảm nhiều hơn.

**Kiểm tra lại.** Theo (5.1), $f(w^+)=4{,}5-0{,}05\cdot34+\tfrac{0{,}0025}2\cdot233=4{,}5-1{,}7+0{,}29125=3{,}09125$.
:::

### 5.9. Tích phân một biến và nhiều biến

Xác suất và kỳ vọng của một đại lượng liên tục được tính bằng tích phân.

::: definition Định nghĩa 00.47 (Tích phân một biến, tích phân kép và tích phân trên hình hộp)
- Với $\psi$ liên tục trên $[a,b]$, *tích phân xác định* (definite integral) $\int_a^b\psi(x)\,dx$ là giới hạn của các tổng $\sum_k\psi(\xi_k)\,\Delta x_k$, với $\xi_k$ thuộc đoạn con thứ $k$ có độ dài $\Delta x_k$, khi lưới chia $[a,b]$ mịn dần; khi $\psi\ge0$, nó là diện tích dưới đồ thị.
- Với $\psi$ liên tục trên hình chữ nhật $D=[\alpha_1,\beta_1]\times[\alpha_2,\beta_2]$, *tích phân kép* (double integral) $\iint_D\psi(x,y)\,dA$ là giới hạn của các tổng $\sum_k\psi(\xi_k)\,\Delta A_k$, với $\xi_k$ thuộc hình chữ nhật con thứ $k$ có diện tích $\Delta A_k$, khi lưới chia $D$ mịn dần; khi $\psi\ge0$, nó là thể tích dưới mặt đồ thị.
- Tương tự, với $\psi$ liên tục trên hình hộp $B=[\alpha_1,\beta_1]\times\cdots\times[\alpha_n,\beta_n]\subset\mathbb R^n$, tích phân $\int_B\psi(z)\,dz$ là giới hạn của các tổng $\sum_k\psi(\xi_k)\,\Delta V_k$, với $\xi_k$ thuộc hình hộp con thứ $k$ có thể tích $\Delta V_k$, khi lưới chia $B$ thành các hình hộp con mịn dần.
:::

Định lý sau cho phép tính tích phân kép bằng hai tích phân một biến liên tiếp.

::: theorem Định lý 00.48 (Định lý Fubini cho hình chữ nhật) — ngoài phạm vi, xem Stewart (2016)
**Giả thiết.** $\psi$ liên tục trên $D=[\alpha_1,\beta_1]\times[\alpha_2,\beta_2]$.

**Kết luận.**
$$
\begin{aligned}
&\iint_D\psi\,dA\\
&\quad=\int_{\alpha_1}^{\beta_1}\!\Bigl(\int_{\alpha_2}^{\beta_2}\psi(x,y)\,dy\Bigr)dx\\
&\quad=\int_{\alpha_2}^{\beta_2}\!\Bigl(\int_{\alpha_1}^{\beta_1}\psi(x,y)\,dx\Bigr)dy .
\end{aligned}
$$
:::

Xem Stewart (2016), §15.1–15.2. Mỗi cận đi cùng đúng biến tích phân của nó. Khi $\psi$ là một hàm mật độ xác suất, tích phân trên toàn miền bằng $1$, và tích phân trên một miền con là xác suất của miền đó.

::: example Ví dụ 00.24 (Một tích phân đơn và một tích phân kép)
**Dữ kiện.** $\psi_1(x)=2x+1$ trên $[0,1]$; $\psi_2(x,y)=x+y$ trên $D=[0,1]\times[0,2]$.

**Tích phân đơn.** Nguyên hàm của $2x+1$ là $x^2+x$, nên $\int_0^1(2x+1)\,dx=(1+1)-0=2$.

**Tích phân kép.** Theo Định lý 00.48, tích phân theo $y$ trước:
$$
\begin{aligned}
\int_0^2(x+y)\,dy&=2x+2,\\
\int_0^1(2x+2)\,dx&=1+2=3 .
\end{aligned}
$$

**Kiểm tra lại.** Theo thứ tự ngược lại: $\int_0^1(x+y)\,dx=\tfrac12+y$ và $\int_0^2(\tfrac12+y)\,dy=1+2=3$. Hình thang dưới $2x+1$ có hai đáy $1$, $3$ và chiều cao $1$, diện tích $(1+3)/2=2$.
:::

![Khung trái: diện tích dưới đường 2x cộng 1 trên đoạn từ 0 đến 1 bằng 2. Khung phải: thể tích dưới mặt x cộng y trên hình chữ nhật [0,1] nhân [0,2] bằng 3, với một dải lát x cố định.](img/lec-00/calculus-integrals-1d-2d.svg)

*Vùng tô là miền được cộng dồn; dải tô ở khung phải ứng với tích phân theo biến thứ hai khi giữ $x$ cố định.*

Như vậy, giải tích nhiều biến cho gradient $\nabla f=X^Tr$ và Hessian $X^TX$ của mất mát, điều kiện cần $\nabla f=0$ dẫn lại phương trình chuẩn, và Hessian xác định dương xác nhận $w_{\mathrm{LS}}=(14,2,1)^T$ là cực tiểu; tích phân chuẩn bị cho xác suất của đại lượng liên tục. Tuy nhiên, tại $w_{\mathrm{LS}}$ cả bốn phần dư vẫn khác $0$, và giải tích không cho biết giá thật của một căn nhà mới lệch khỏi dự đoán bao nhiêu. Muốn trả lời, chúng ta cần mô hình hóa phần dư bằng xác suất.

## 6. Xác suất một biến

Hai căn nhà cùng diện tích, cùng số phòng ngủ vẫn có thể bán với giá khác nhau, vì vị trí, chất lượng, thời điểm bán và thương lượng không có trong vector đặc trưng. Khi đặc trưng đã cố định, giá vẫn là một đại lượng chưa biết trước. Muốn mô tả độ phân tán của giá quanh dự đoán, chúng ta cần không gian xác suất, biến ngẫu nhiên và các đại lượng tóm tắt phân phối.

### 6.1. Phép thử, không gian mẫu, biến cố và không gian xác suất

Để gán xác suất, trước hết ta xác định tập các kết quả có thể và các tập kết quả được phép đo xác suất.

::: definition Định nghĩa 00.49 (Phép thử, không gian mẫu, biến cố, không gian xác suất)
- Một *phép thử ngẫu nhiên* (random experiment) là một quy trình có kết quả chưa biết trước. *Không gian mẫu* (sample space) $\Omega$ là tập mọi kết quả có thể.
- Một *σ-đại số* (σ-algebra) $\mathcal F$ trên $\Omega$ là một họ các tập con của $\Omega$ thỏa ba tính chất:
  - $\Omega\in\mathcal F$;
  - nếu $E\in\mathcal F$ thì phần bù $\Omega\setminus E\in\mathcal F$;
  - nếu $E_1,E_2,\ldots\in\mathcal F$ thì $\bigcup_kE_k\in\mathcal F$.

  Mỗi phần tử $E\in\mathcal F$ là một *biến cố* (event).
- Một *độ đo xác suất* (probability measure) $\Pr:\mathcal F\to[0,1]$ thỏa ba tiên đề:
  - $\Pr(E)\ge0$ với mọi $E\in\mathcal F$;
  - $\Pr(\Omega)=1$;
  - nếu $E_1,E_2,\ldots$ đôi một rời nhau thì $\Pr\bigl(\bigcup_kE_k\bigr)=\sum_k\Pr(E_k)$.
- Bộ ba $(\Omega,\mathcal F,\Pr)$ là một *không gian xác suất* (probability space).
:::

Một cách trực quan, $\Omega$ chứa mọi kết quả, một biến cố gom các kết quả mà ta quan tâm, còn $\Pr$ phân bổ một đơn vị khối lượng xác suất trên $\Omega$. Một biến cố có thể chứa nhiều kết quả. Khi $\Omega$ hữu hạn và các kết quả đồng khả năng, $\Pr(E)$ bằng số phần tử của $E$ chia cho số phần tử của $\Omega$; khi các kết quả không đồng khả năng, công thức tỉ lệ này sai. Koller và Friedman (2009), §2.1.1, tr. 15–17, trình bày dạng hữu hạn của các tiên đề này (đóng với hợp hữu hạn, cộng tính hữu hạn).

::: example Ví dụ 00.25 (Gieo một xúc xắc đều)
**Dữ kiện.** Gieo một xúc xắc đều một lần.

**Không gian mẫu và biến cố.** $\Omega=\{1,2,3,4,5,6\}$, $\mathcal F$ là họ mọi tập con của $\Omega$, $\Pr(\{\omega\})=1/6$ với mọi $\omega$. Biến cố "ra số chẵn" là $E=\{2,4,6\}$.

**Xác suất.** Theo tiên đề cộng tính, $\Pr(E)=3\cdot\tfrac16=\tfrac12$.

**Kiểm tra lại.** $\Pr(\Omega\setminus E)=\Pr(\{1,3,5\})=\tfrac12$ và $\Pr(E)+\Pr(\Omega\setminus E)=1=\Pr(\Omega)$.
:::

### 6.2. Biến ngẫu nhiên và luật phân phối

Kết quả $\omega$ của một phép thử có thể là một sự việc, như việc một căn nhà được bán, trong khi mô hình làm việc với số. Một cách trực quan, một biến ngẫu nhiên là một dụng cụ đo: nó giữ lại một con số của kết quả $\omega$ và bỏ phần còn lại.

::: definition Định nghĩa 00.50 (Biến ngẫu nhiên, luật phân phối)
Cho không gian xác suất $(\Omega,\mathcal F,\Pr)$. Một *biến ngẫu nhiên* (random variable) là một hàm $U:\Omega\to\mathbb R$ sao cho $\{\omega:U(\omega)\le t\}\in\mathcal F$ với mọi $t\in\mathbb R$. *Luật phân phối* (distribution) của $U$ là hàm gán cho mỗi khoảng $B\subseteq\mathbb R$ số
$$
\begin{aligned}
P_U(B)&=\Pr(U\in B)\\
&=\Pr(\{\omega:U(\omega)\in B\}).
\end{aligned}
$$
:::

Sau khi định nghĩa, $U$ là một hàm cố định; tính ngẫu nhiên nằm ở đối số $\omega$ chưa biết trước. Một giá trị quan sát $u$ là một số, còn luật phân phối mô tả mọi giá trị có thể cùng xác suất của chúng.

::: example Ví dụ 00.26 (Biến chỉ báo số chẵn)
**Dữ kiện.** Xúc xắc đều của Ví dụ 00.25. Biến kết quả $U(\omega)=\omega$ ghi số chấm; *biến chỉ báo* (indicator variable) $V(\omega)=1$ nếu $\omega$ chẵn và $V(\omega)=0$ nếu $\omega$ lẻ.

**Luật phân phối.** $\Pr(U=k)=1/6$ với $k=1,\ldots,6$. Biến $V$ nén sáu kết quả thành hai giá trị: $\Pr(V=1)=\Pr(\{2,4,6\})=\tfrac12$ và $\Pr(V=0)=\tfrac12$.

**Kiểm tra lại.** $\Pr(V=0)+\Pr(V=1)=1$.
:::

![Không gian mẫu Omega gồm sáu mặt của xúc xắc với xác suất 1/6 mỗi mặt; biến kết quả U ghi số chấm; biến chỉ báo V bằng 1 khi U chẵn; luật phân phối Pr(V bằng 1) bằng Pr(V bằng 0) bằng 1/2.](img/lec-00/probability-space-random-variable.svg)

*Một kết quả $\omega$ được sinh trong $\Omega$; biến cố gom nhiều kết quả, còn biến ngẫu nhiên biến mỗi kết quả thành một số.*

### 6.3. Hàm khối, hàm mật độ và hàm phân phối tích lũy

Với biến chỉ nhận các giá trị rời nhau, như một nhãn phân loại, ta cho xác suất tại từng giá trị.

::: definition Định nghĩa 00.51 (Hàm khối xác suất, phân phối Bernoulli)
Cho biến ngẫu nhiên $U$ nhận hữu hạn hoặc đếm được giá trị. *Hàm khối xác suất* (probability mass function, PMF) của $U$ là
$$
p_U(u)=\Pr(U=u),
$$
thỏa $p_U(u)\ge0$ và $\sum_up_U(u)=1$, tổng lấy trên mọi giá trị có thể. Biến $U$ có *phân phối Bernoulli* với tham số $\theta\in[0,1]$, viết $U\sim\operatorname{Bernoulli}(\theta)$, nếu $p_U(1)=\theta$ và $p_U(0)=1-\theta$.
:::

Chiều cao của PMF tại $u$ là xác suất quan sát đúng giá trị $u$. Mỗi quan sát của một biến Bernoulli là $0$ hoặc $1$. Biến chỉ báo $V$ của Ví dụ 00.26 có phân phối $\operatorname{Bernoulli}(1/2)$.

::: example Ví dụ 00.27 (Bộ phân loại thư rác)
**Dữ kiện.** Giả sử một bộ phân loại thư rác báo dương tính với xác suất $0{,}3$ trên tập thư đang xét. Gọi $V=1$ nếu một thư lấy ngẫu nhiên bị báo dương tính và $V=0$ nếu không.

**Phân phối.** $V\sim\operatorname{Bernoulli}(0{,}3)$: $p_V(1)=0{,}3$, $p_V(0)=0{,}7$.

**Kiểm tra lại.** $0{,}3+0{,}7=1$. Mỗi thư cụ thể cho nhãn $0$ hoặc $1$; số $0{,}3$ mô tả tỉ lệ dương tính trên tập thư.
:::

Với đại lượng liên tục, xác suất tại từng điểm bằng $0$, nên ta cần một hàm khác: xác suất của một khoảng là diện tích dưới một đường cong.

::: definition Định nghĩa 00.52 (Hàm mật độ xác suất, phân phối đều)
Một biến ngẫu nhiên $U$ *có mật độ* nếu tồn tại hàm $p_U:\mathbb R\to[0,\infty)$ với $\int_{-\infty}^{\infty}p_U(u)\,du=1$ sao cho
$$
\Pr(U\in B)=\int_Bp_U(u)\,du
$$
với mọi khoảng $B$. Hàm $p_U$ là *hàm mật độ xác suất* (probability density function, PDF) của $U$. Với $\alpha<\beta$, biến $U$ có *phân phối đều* (uniform distribution) trên $[\alpha,\beta]$, viết $U\sim\operatorname{Unif}(\alpha,\beta)$, nếu $p_U(u)=1/(\beta-\alpha)$ trên $[\alpha,\beta]$ và bằng $0$ ngoài đoạn đó.
:::

Mật độ cao quanh $u$ nghĩa là một khoảng nhỏ quanh $u$ có xác suất lớn hơn một khoảng cùng độ dài ở nơi mật độ thấp: $\Pr(u\le U\le u+du)\approx p_U(u)\,du$ (Murphy (2022), §2.6.2). Mật độ có thể lớn hơn $1$: $\operatorname{Unif}(0;\,0{,}5)$ có mật độ $2$. Giá trị $p_U(u)$ có đơn vị là nghịch đảo đơn vị của $U$, còn xác suất không có đơn vị.

::: example Ví dụ 00.28 (Phân phối đều trên $[0,2]$)
**Dữ kiện.** $U\sim\operatorname{Unif}(0,2)$, nên $p_U(u)=1/2$ trên $[0,2]$.

**Xác suất một khoảng.** $\Pr(0{,}5\le U\le1{,}5)=\int_{0{,}5}^{1{,}5}\tfrac12\,du=\tfrac12$.

**Xác suất một điểm.** $\Pr(U=1)=\int_1^1\tfrac12\,du=0$.

**Kiểm tra lại.** $\int_0^2\tfrac12\,du=1$. Mọi điểm riêng lẻ có xác suất $0$, nhưng một lần lấy mẫu vẫn trả về một số cụ thể trong $[0,2]$.
:::

Một hàm duy nhất mô tả được mọi biến ngẫu nhiên, rời rạc hay có mật độ.

::: definition Định nghĩa 00.53 (Hàm phân phối tích lũy)
*Hàm phân phối tích lũy* (cumulative distribution function, CDF) của biến ngẫu nhiên $U$ là
$$
F_U(t)=\Pr(U\le t),\qquad t\in\mathbb R .
$$
:::

::: proposition Mệnh đề 00.54 (Tính chất của CDF và quan hệ với PMF, PDF) — phác thảo
**Giả thiết.** $U$ là một biến ngẫu nhiên với CDF $F_U$.

**Kết luận.**
1. $F_U$ không giảm, liên tục phải, $F_U(t)\to0$ khi $t\to-\infty$ và $F_U(t)\to1$ khi $t\to\infty$.
2. $\Pr(\alpha<U\le\beta)=F_U(\beta)-F_U(\alpha)$ với mọi $\alpha<\beta$.
3. Nếu $U$ rời rạc, độ nhảy của $F_U$ tại $u$ bằng $p_U(u)$.
4. Nếu $U$ có mật độ $p_U$ thì $F_U(t)=\int_{-\infty}^tp_U(u)\,du$, và $F_U'(t)=p_U(t)$ tại mọi điểm $t$ mà $p_U$ liên tục.
:::

Murphy (2022), §2.2.2, nêu tính không giảm ở kết luận 1 và kết luận 2; Koller và Friedman (2009), §2.1.6, tr. 28, nêu kết luận 4.

::: proof Phác thảo chứng minh Mệnh đề 00.54
**Lộ trình.** Viết mỗi tính chất thành xác suất của một biến cố, dùng tiên đề cộng tính của Định nghĩa 00.49 cho các dãy biến cố lồng nhau, rồi dùng định nghĩa mật độ cho kết luận 4.

**Bước 1 (kết luận 2 và tính không giảm).** $\{U\le\beta\}$ là hợp rời của $\{U\le\alpha\}$ và $\{\alpha<U\le\beta\}$, nên theo tiên đề cộng tính, $F_U(\beta)-F_U(\alpha)=\Pr(\alpha<U\le\beta)\ge0$.

**Bước 2 (dãy biến cố lồng nhau).** Nếu $E_1\supseteq E_2\supseteq\cdots$ hoặc $E_1\subseteq E_2\subseteq\cdots$ thì $\Pr(E_k)$ tiến tới xác suất của giao, tương ứng của hợp, các $E_k$; điều này suy từ tiên đề cộng tính đếm được áp dụng cho các hiệu $E_k\setminus E_{k+1}$ hoặc $E_{k+1}\setminus E_k$, đôi một rời nhau.

**Bước 3 (liên tục phải, hai giới hạn, độ nhảy).** Áp dụng bước 2 cho bốn dãy, $k=1,2,\ldots$:
- $\{U\le t+1/k\}$ giảm về $\{U\le t\}$, nên $F_U(t+1/k)\to F_U(t)$: liên tục phải;
- $\{U\le-k\}$ giảm về $\varnothing$, nên $F_U(-k)\to0$;
- $\{U\le k\}$ tăng về $\Omega$, nên $F_U(k)\to1$;
- $\{u-1/k<U\le u\}$ giảm về $\{U=u\}$, nên độ nhảy $F_U(u)-\lim_kF_U(u-1/k)$ bằng $\Pr(U=u)=p_U(u)$.

Vì $F_U$ không giảm, các giới hạn theo dãy này cho giới hạn theo biến liên tục.

**Bước 4 (mật độ).** Theo Định nghĩa 00.52 với $B=(-\infty,t]$, $F_U(t)=\int_{-\infty}^tp_U(u)\,du$. Với $s>0$, $F_U(t+s)-F_U(t)=\int_t^{t+s}p_U(u)\,du$. Nếu $p_U$ liên tục tại $t$, với mọi $\varpi>0$ có $s_0>0$ sao cho $\lvert p_U(u)-p_U(t)\rvert<\varpi$ khi $\lvert u-t\rvert<s_0$; khi đó với $0<s<s_0$,
$$
\begin{aligned}
&\Bigl\lvert\frac{F_U(t+s)-F_U(t)}{s}-p_U(t)\Bigr\rvert\\
&\quad\le\frac1s\int_t^{t+s}\lvert p_U(u)-p_U(t)\rvert\,du\\
&\quad<\varpi ,
\end{aligned}
$$
và tương tự với $s<0$. Vậy $F_U'(t)=p_U(t)$. Khi $p_U$ liên tục trên một khoảng, kết quả này cùng công thức Newton–Leibniz ở Kiến thức tiên quyết cho cách tính xác suất một khoảng bằng nguyên hàm của mật độ. $\square$
:::

::: example Ví dụ 00.29 (CDF của phân phối đều và xác suất một khoảng)
**Dữ kiện.** $U\sim\operatorname{Unif}(0,2)$ của Ví dụ 00.28.

**CDF.** Theo kết luận 4 của Mệnh đề 00.54,
$$
F_U(t)=\begin{cases}0,&t<0,\\ t/2,&0\le t\le2,\\ 1,&t>2.\end{cases}
$$

**Xác suất khoảng.** Theo kết luận 2, $\Pr(0{,}5<U\le1{,}5)=F_U(1{,}5)-F_U(0{,}5)=0{,}75-0{,}25=0{,}5$.

**Kiểm tra lại.** Kết quả trùng với tích phân mật độ ở Ví dụ 00.28; $F_U'(t)=1/2=p_U(t)$ khi $0<t<2$.
:::

![Ba khung: PMF của Bernoulli(0,3) với hai cột cao 0,7 và 0,3; PDF của Unif(0,2) cao 1/2 trên đoạn [0,2]; CDF của Unif(0,2) tăng tuyến tính từ 0 đến 1, với F(1) bằng 1/2.](img/lec-00/probability-pmf-pdf-cdf.svg)

*PMF đặt khối lượng tại các điểm; PDF phân bố mật độ trên một đoạn; CDF cộng dồn xác suất từ trái sang phải.*

### 6.4. Kỳ vọng, phương sai và biến đổi affine

Để ra quyết định, ta cần tóm tắt một phân phối bằng một con số đại diện. Một cách trực quan, kỳ vọng là tâm cân bằng khi mỗi giá trị được đặt trọng số bằng xác suất của nó.

::: definition Định nghĩa 00.55 (Kỳ vọng và kỳ vọng của một hàm)
Cho biến ngẫu nhiên $U$ và hàm $\psi:\mathbb R\to\mathbb R$.

- Nếu $U$ rời rạc và $\sum_u\lvert u\rvert\,p_U(u)<\infty$, *kỳ vọng* (expectation) của $U$ là $\mathbb E[U]=\sum_uu\,p_U(u)$.
- Nếu $U$ có mật độ và $\int\lvert u\rvert\,p_U(u)\,du<\infty$, kỳ vọng là $\mathbb E[U]=\int u\,p_U(u)\,du$.
- *Kỳ vọng của $\psi(U)$* là $\mathbb E[\psi(U)]=\sum_u\psi(u)\,p_U(u)$ hoặc $\int\psi(u)\,p_U(u)\,du$, khi tổng hoặc tích phân của $\lvert\psi\rvert$ hữu hạn.
:::

Công thức của $\mathbb E[\psi(U)]$ không cần tìm phân phối của $\psi(U)$ trước: ta biến đổi từng giá trị rồi lấy trung bình có trọng số (Goodfellow, Bengio và Courville (2016), §3.8, tr. 60, (3.9)–(3.10)). Kỳ vọng có thể là một giá trị mà biến không nhận: kỳ vọng của số chấm của xúc xắc đều là $(1+\cdots+6)/6=3{,}5$.

Kỳ vọng cho biết tâm, chưa cho biết độ trải rộng quanh tâm.

::: definition Định nghĩa 00.56 (Phương sai, độ lệch chuẩn)
Cho biến ngẫu nhiên $U$ với $\mathbb E[U^2]<\infty$. *Phương sai* (variance) của $U$ là
$$
\operatorname{Var}(U)=\mathbb E\bigl[(U-\mathbb E[U])^2\bigr],
$$
và *độ lệch chuẩn* (standard deviation) là $\operatorname{Std}(U)=\sqrt{\operatorname{Var}(U)}$.
:::

Phương sai đo độ trải rộng bình phương quanh tâm; độ lệch chuẩn đưa độ trải rộng về cùng đơn vị với $U$. Phương sai bằng $0$ khi và chỉ khi $U$ bằng hằng số $\mathbb E[U]$ *hầu chắc chắn* (almost surely), tức $\Pr(U=\mathbb E[U])=1$.

::: proposition Mệnh đề 00.57 (Kỳ vọng và phương sai dưới biến đổi affine) — chứng minh đầy đủ
**Giả thiết.** $U$ có $\mathbb E[U^2]<\infty$; $\alpha,\beta\in\mathbb R$.

**Kết luận.**
1. $\mathbb E[\alpha U+\beta]=\alpha\,\mathbb E[U]+\beta$.
2. $\operatorname{Var}(U)=\mathbb E[U^2]-(\mathbb E[U])^2$.
3. $\operatorname{Var}(\alpha U+\beta)=\alpha^2\operatorname{Var}(U)$, nên $\operatorname{Std}(\alpha U+\beta)=\lvert\alpha\rvert\operatorname{Std}(U)$.
:::

::: proof Chứng minh Mệnh đề 00.57
**Lộ trình.** Viết cho trường hợp có mật độ, dùng tính tuyến tính của tích phân; trường hợp rời rạc thay tích phân bằng tổng. Đặt $\mu=\mathbb E[U]$.

**Bước 1 (kỳ vọng).** Theo Định nghĩa 00.55 với $\psi(u)=\alpha u+\beta$ và tính tuyến tính của tích phân,
$$
\begin{aligned}
\mathbb E[\alpha U+\beta]&=\alpha\int u\,p_U(u)\,du\\
&\quad+\beta\int p_U(u)\,du\\
&=\alpha\mu+\beta .
\end{aligned}
$$

**Bước 2 (công thức phương sai).** Khai triển $(U-\mu)^2=U^2-2\mu U+\mu^2$ và dùng tính tuyến tính như bước 1:
$$
\begin{aligned}
\operatorname{Var}(U)&=\mathbb E[U^2]-2\mu\,\mathbb E[U]+\mu^2\\
&=\mathbb E[U^2]-\mu^2 .
\end{aligned}
$$

**Bước 3 (biến đổi affine).** Theo bước 1, $\mathbb E[\alpha U+\beta]=\alpha\mu+\beta$, nên $(\alpha U+\beta)-(\alpha\mu+\beta)=\alpha(U-\mu)$ và
$$
\begin{aligned}
&\operatorname{Var}(\alpha U+\beta)\\
&\quad=\mathbb E\bigl[\alpha^2(U-\mu)^2\bigr]\\
&\quad=\alpha^2\operatorname{Var}(U).\ \square
\end{aligned}
$$
:::

Phép tịnh tiến $\beta$ đổi vị trí nhưng không đổi độ phân tán; phép co giãn $\alpha$ nhân độ lệch chuẩn với $\lvert\alpha\rvert$. Kết luận 3 cho $\alpha^2\operatorname{Var}(U)$, khác $\alpha\operatorname{Var}(U)+\beta$.

::: example Ví dụ 00.30 (Chi phí kỳ vọng của bộ phân loại thư rác)
**Dữ kiện.** $V\sim\operatorname{Bernoulli}(0{,}3)$ của Ví dụ 00.27. Giả sử chi phí xử lý một thư là $\psi(1)=10$ nếu bị báo dương tính và $\psi(0)=1$ nếu không.

**Tính.** Theo Định nghĩa 00.55, $\mathbb E[\psi(V)]=0{,}3\cdot10+0{,}7\cdot1=3{,}7$.

**Kiểm tra lại.** Trên $\{0,1\}$, $\psi(V)=1+9V$, nên theo Mệnh đề 00.57, $\mathbb E[\psi(V)]=1+9\cdot0{,}3=3{,}7$.
:::

Chỉ xét trường hợp $V=0$ (xác suất $0{,}7$) cho chi phí $1$ và bỏ phần $0{,}3\cdot10=3$ của trường hợp $V=1$.

::: example Ví dụ 00.31 (Kỳ vọng, phương sai của phân phối đều và một phép đổi thang)
**Dữ kiện.** $U\sim\operatorname{Unif}(0,2)$, $p_U(u)=1/2$ trên $[0,2]$; $U_{\mathrm s}=100U+20$.

**Kỳ vọng và phương sai của $U$.**
$$
\begin{aligned}
\mathbb E[U]&=\int_0^2\tfrac u2\,du=1,\\
\mathbb E[U^2]&=\int_0^2\tfrac{u^2}2\,du=\tfrac43,\\
\operatorname{Var}(U)&=\tfrac43-1=\tfrac13 .
\end{aligned}
$$

**Đổi thang.** Theo Mệnh đề 00.57, $\mathbb E[U_{\mathrm s}]=100+20=120$ và $\operatorname{Std}(U_{\mathrm s})=100/\sqrt3\approx57{,}7$.

**Kiểm tra lại.** Tính trực tiếp $\mathbb E[(U-1)^2]=\int_0^2\tfrac{(u-1)^2}2\,du=\tfrac12\cdot\tfrac23=\tfrac13$.
:::

![Khung trái: Bernoulli(0,3) với khối lượng 0,7 tại 0 và 0,3 tại 1, kỳ vọng 0,3, phương sai 0,21. Khung phải: Unif(0,2) với tâm 1 và phương sai 1/3.](img/lec-00/probability-expectation-variance.svg)

*Kỳ vọng định vị tâm cân bằng; phương sai đo độ phân tán quanh tâm.*

### 6.5. Phân phối Gauss một biến

Để chọn trọng số theo một nguyên tắc và tính một dải chứa giá thật, ta cần một phân phối cụ thể cho sai lệch của giá quan sát quanh giá trị trung tâm của mô hình. Giả thiết dùng trong bài là phân phối Gauss.

::: definition Định nghĩa 00.58 (Phân phối Gauss một biến)
Với $\mu\in\mathbb R$ và $\sigma>0$, biến ngẫu nhiên $U$ có *phân phối Gauss* (Gaussian distribution, còn gọi là phân phối chuẩn, normal distribution) $\mathcal N(\mu,\sigma^2)$ nếu nó có mật độ
$$
\begin{aligned}
p_U(u)&=\frac1{\sqrt{2\pi\sigma^2}}\\
&\quad\times\exp\Bigl(-\frac{(u-\mu)^2}{2\sigma^2}\Bigr).
\end{aligned}
$$
Biến $G\sim\mathcal N(0,1)$ gọi là *biến Gauss chuẩn* (standard normal).
:::

Nếu $U\sim\mathcal N(\mu,\sigma^2)$ thì $\mathbb E[U]=\mu$ và $\operatorname{Var}(U)=\sigma^2$ (Murphy (2022), §2.6.1–2.6.2). Với $G\sim\mathcal N(0,1)$, $\Pr(\mu+\sigma G\le t)=\Pr\bigl(G\le(t-\mu)/\sigma\bigr)$; lấy đạo hàm theo $t$ (kết luận 4 của Mệnh đề 00.54) được đúng mật độ của Định nghĩa 00.58, nên $\mu+\sigma G\sim\mathcal N(\mu,\sigma^2)$. Tương tự, $(U-\mu)/\sigma\sim\mathcal N(0,1)$. Với biến Gauss chuẩn $G$,
$$
\begin{aligned}
&\Pr(\lvert G\rvert\le1)\approx0{,}6827,\\
&\Pr(\lvert G\rvert\le1{,}96)\approx0{,}95 .
\end{aligned}
\tag{6.1}
$$
Do đó $U\sim\mathcal N(\mu,\sigma^2)$ nằm trong $[\mu-1{,}96\sigma,\ \mu+1{,}96\sigma]$ với xác suất xấp xỉ $0{,}95$.

Như vậy, xác suất một biến cho phép mô tả giá của một căn nhà khi đặc trưng đã cố định. Tuy nhiên, muốn mô tả cùng lúc giá của bốn căn nhà, cần phân phối của nhiều biến ngẫu nhiên và khái niệm độc lập.

## 7. Vector ngẫu nhiên, nhiễu và phân phối nhiều biến

Một mẫu dữ liệu gồm nhiều đặc trưng và một nhãn, và nhiễu của nhiều quan sát có thể cùng biến thiên. Một biến ngẫu nhiên đơn lẻ không mô tả được quan hệ giữa các đại lượng này. Chúng ta định nghĩa phân phối đồng thời và tính độc lập, dùng chúng cho nhiễu độc lập của bốn căn nhà, rồi mở rộng kỳ vọng và phương sai sang vector ngẫu nhiên cho trường hợp nhiễu tương quan.

### 7.1. Phân phối đồng thời, biên, có điều kiện và công thức Bayes

Một quan sát của hai đại lượng cho một điểm $(u,v)$ trong $\mathbb R^2$. Ta cần một đối tượng gán xác suất cho từng cặp giá trị.

::: definition Định nghĩa 00.59 (Vector ngẫu nhiên, phân phối đồng thời)
Một *vector ngẫu nhiên* (random vector) $Z=(Z_1,\ldots,Z_n)^T$ gồm $n$ biến ngẫu nhiên xác định trên cùng một không gian xác suất. Với hai biến rời rạc $U$, $V$, *phân phối đồng thời* (joint distribution) là
$$
p_{U,V}(u,v)=\Pr(U=u,\ V=v),
$$
không âm và có tổng trên mọi cặp $(u,v)$ bằng $1$. Với biến liên tục, phân phối đồng thời cho bằng một *mật độ đồng thời* (joint density) $p_{U,V}$, và $\Pr((U,V)\in B)=\iint_Bp_{U,V}\,dA$. Tương tự, vector $Z$ có mật độ đồng thời $p_Z:\mathbb R^n\to[0,\infty)$ nếu $\Pr(Z\in B)=\int_Bp_Z(z)\,dz$ với mọi hình hộp $B=[\alpha_1,\beta_1]\times\cdots\times[\alpha_n,\beta_n]$, tích phân lấy theo nghĩa của Định nghĩa 00.47. Koller và Friedman (2009), §2.1.6.2, Định nghĩa 2.8, tr. 29, định nghĩa mật độ đồng thời của $n$ biến.
:::

Phân phối đồng thời cho biết khối lượng xác suất nằm ở đâu và hai tọa độ có xu hướng xuất hiện cùng nhau như thế nào.

::: example Ví dụ 00.32 (Bảng phân phối đồng thời của hai biến nhị phân)
**Dữ kiện.** Giả sử $U,V\in\{0,1\}$ có phân phối đồng thời

| $U\backslash V$ | $V=0$ | $V=1$ |
|---:|---:|---:|
| $U=0$ | $0{,}30$ | $0{,}20$ |
| $U=1$ | $0{,}10$ | $0{,}40$ |

**Đọc bảng.** $\Pr(U=1,\ V=1)=0{,}40$.

**Kiểm tra lại.** Tổng bốn ô: $0{,}30+0{,}20+0{,}10+0{,}40=1$.
:::

Từ phân phối đồng thời, ta suy ra phân phối của từng biến và phân phối của một biến khi đã biết biến kia.

::: definition Định nghĩa 00.60 (Phân phối biên, phân phối có điều kiện)
Cho $U$, $V$ rời rạc với phân phối đồng thời $p_{U,V}$.

- *Phân phối biên* (marginal distribution) của $U$ là $p_U(u)=\sum_vp_{U,V}(u,v)$; tương tự cho $V$.
- Với $p_U(u)>0$, *phân phối có điều kiện* (conditional distribution) của $V$ khi biết $U=u$ là
$$
\begin{aligned}
&p_{V\mid U}(v\mid u)\\
&\quad=\Pr(V=v\mid U=u)\\
&\quad=\frac{p_{U,V}(u,v)}{p_U(u)} .
\end{aligned}
$$
:::

Phân phối biên là tổng theo hàng hoặc theo cột của bảng; phân phối có điều kiện là một hàng hoặc một cột đã chuẩn hóa để có tổng bằng $1$. Biết hai phân phối biên chưa đủ để xác định phân phối đồng thời: phân phối đồng thời còn chứa thông tin về cách hai biến ghép cặp. Mệnh đề sau suy trực tiếp từ hai định nghĩa trên.

::: proposition Mệnh đề 00.61 (Quy tắc nhân, xác suất toàn phần, công thức Bayes) — chứng minh đầy đủ
**Giả thiết.** $U$, $V$ rời rạc với phân phối đồng thời $p_{U,V}$.

**Kết luận.**
1. *Quy tắc nhân*: $p_{U,V}(u,v)=p_{V\mid U}(v\mid u)\,p_U(u)$ khi $p_U(u)>0$.
2. *Xác suất toàn phần*: $p_V(v)=\sum_{u:\,p_U(u)>0}p_{V\mid U}(v\mid u)\,p_U(u)$.
3. *Công thức Bayes* (Bayes' rule): khi $p_U(u)>0$ và $p_V(v)>0$,
$$
\begin{aligned}
&p_{U\mid V}(u\mid v)\\
&\quad=\frac{p_{V\mid U}(v\mid u)\,p_U(u)}{p_V(v)} .
\end{aligned}
$$
:::

::: proof Chứng minh Mệnh đề 00.61
**Lộ trình.** Ba công thức là các cách viết lại định nghĩa phân phối có điều kiện.

**Bước 1 (quy tắc nhân).** Nhân hai vế của định nghĩa $p_{V\mid U}(v\mid u)=p_{U,V}(u,v)/p_U(u)$ với $p_U(u)>0$.

**Bước 2 (xác suất toàn phần).** Theo Định nghĩa 00.60, $p_V(v)=\sum_up_{U,V}(u,v)$. Với $p_U(u)=0$, $p_{U,V}(u,v)\le p_U(u)=0$, nên các số hạng đó bằng $0$; các số hạng còn lại viết lại bằng bước 1.

**Bước 3 (Bayes).** Theo định nghĩa của $p_{U\mid V}$ và bước 1,
$$
\begin{aligned}
&p_{U\mid V}(u\mid v)\\
&\quad=\frac{p_{U,V}(u,v)}{p_V(v)}\\
&\quad=\frac{p_{V\mid U}(v\mid u)\,p_U(u)}{p_V(v)} .\ \square
\end{aligned}
$$
:::

Trong công thức Bayes, $p_U(u)$ là *xác suất tiên nghiệm* (prior) của $U=u$, và $p_{U\mid V}(u\mid v)$ là *xác suất hậu nghiệm* (posterior) sau khi quan sát $V=v$. Nói chung $p_{U\mid V}(u\mid v)\ne p_{V\mid U}(v\mid u)$.

::: example Ví dụ 00.33 (Biên, điều kiện và Bayes từ bảng)
**Dữ kiện.** Bảng của Ví dụ 00.32: $p_{U,V}(0,0)=0{,}30$, $p_{U,V}(0,1)=0{,}20$, $p_{U,V}(1,0)=0{,}10$, $p_{U,V}(1,1)=0{,}40$.

**Biên.** $p_U(1)=0{,}10+0{,}40=0{,}50$ và $p_V(1)=0{,}20+0{,}40=0{,}60$.

**Có điều kiện.** $p_{V\mid U}(1\mid1)=0{,}40/0{,}50=0{,}80$.

**Bayes.** Theo Mệnh đề 00.61,
$$
p_{U\mid V}(1\mid1)=\frac{0{,}80\cdot0{,}50}{0{,}60}=\frac23 .
$$
Quan sát $V=1$ nâng xác suất của $U=1$ từ $\tfrac12$ lên $\tfrac23$.

**Kiểm tra lại.** Tính trực tiếp từ cột $V=1$: $0{,}40/0{,}60=2/3$. Với $p_{V\mid U}(1\mid0)=0{,}20/0{,}50=0{,}40$, xác suất toàn phần cho $p_V(1)=0{,}40\cdot0{,}50+0{,}80\cdot0{,}50=0{,}60$.
:::

![Bảng phân phối đồng thời với tổng hàng 0,50 và 0,50, tổng cột 0,40 và 0,60; điều kiện V bằng 1 giữ cột thứ hai và chuẩn hóa thành 1/3 và 2/3; Bayes cho cùng kết quả 0,80 nhân 0,50 chia 0,60 bằng 2/3.](img/lec-00/probability-joint-marginal-bayes.svg)

*Cộng theo hàng hoặc cột cho phân phối biên; chuẩn hóa một cột cho phân phối có điều kiện.*

Trong học máy, một bộ phân loại xác suất ước lượng $p_{V\mid U}(v\mid u)$ của nhãn $V$ khi biết đầu vào $U$; một *mô hình sinh* (generative model) mô tả $p_{U\mid V}(u\mid v)$ và $p_V(v)$. Công thức Bayes chuyển từ cách mô tả thứ hai sang cách thứ nhất. Lấy biên loại một biến khỏi phân phối đồng thời, ví dụ một biến không quan sát được.

### 7.2. Độc lập và độc lập có điều kiện

Trong Ví dụ 00.33, biết $V=1$ làm đổi xác suất của $U=1$. Tính độc lập mô tả trường hợp biết một biến không làm đổi phân phối của biến kia.

::: definition Định nghĩa 00.62 (Độc lập, độc lập có điều kiện)
- Các biến ngẫu nhiên $U_1,\ldots,U_k$, cùng rời rạc hoặc cùng có mật độ, *độc lập* (independent) nếu hàm khối hoặc mật độ đồng thời của chúng bằng tích các hàm khối hoặc mật độ biên:
$$
\begin{aligned}
&p_{U_1,\ldots,U_k}(u_1,\ldots,u_k)\\
&\quad=\prod_{i=1}^kp_{U_i}(u_i)
\end{aligned}
$$
với mọi $(u_1,\ldots,u_k)$. Với hai biến: $p_{U,V}(u,v)=p_U(u)\,p_V(v)$.
- Với $U$, $V$, $T$ rời rạc, $U$ và $V$ *độc lập có điều kiện* (conditionally independent) khi biết $T$ nếu
$$
\begin{aligned}
&p_{U,V\mid T}(u,v\mid t)\\
&\quad=p_{U\mid T}(u\mid t)\,p_{V\mid T}(v\mid t)
\end{aligned}
$$
với mọi $(u,v)$ và mọi $t$ có $p_T(t)>0$.
:::

Khi $p_U(u)>0$, độc lập tương đương $p_{V\mid U}(v\mid u)=p_V(v)$: biết $U$ không đổi phân phối của $V$. Độc lập có điều kiện nói sự phụ thuộc biến mất khi đã biết một biến chung $T$; nó không kéo theo độc lập. Giả thiết (P1) dùng định nghĩa độc lập cho các nhiễu $\varepsilon_1,\ldots,\varepsilon_m$, có mật độ. Murphy (2022), §2.2.4, (2.21)–(2.23), nêu hai định nghĩa này.

::: example Ví dụ 00.34 (Hai biến của bảng phụ thuộc nhau)
**Dữ kiện.** Bảng của Ví dụ 00.32, với $p_U(1)=0{,}50$ và $p_V(1)=0{,}60$ (Ví dụ 00.33).

**So sánh.** $p_{U,V}(1,1)=0{,}40$, còn $p_U(1)\,p_V(1)=0{,}50\cdot0{,}60=0{,}30$.

**Kết luận.** $0{,}40\ne0{,}30$, nên $U$ và $V$ không độc lập.

**Kiểm tra lại.** Theo cách đọc có điều kiện: $p_{V\mid U}(1\mid1)=0{,}80\ne0{,}60=p_V(1)$.
:::

### 7.3. Nhiễu Gauss, phần dư và hàm hợp lý

Với bốn căn nhà, mô hình xác suất viết giá như tổng của một phần trung tâm phụ thuộc đặc trưng và một phần ngẫu nhiên.

::: definition Định nghĩa 00.63 (Mô hình nhiễu cộng; nhiễu và phần dư)
Trong *mô hình nhiễu cộng* (additive noise model), giá ngẫu nhiên của căn $i$ là
$$
Y_i=w_{\mathrm{true}}^T\phi_i+\varepsilon_i,
$$
trong đó $w_{\mathrm{true}}\in\mathbb R^3$ là trọng số sinh dữ liệu, không quan sát được, và $\varepsilon_i$ là nhiễu, một biến ngẫu nhiên có $\mathbb E[\varepsilon_i]=0$. Giá quan sát $y_i$ là một giá trị của $Y_i$.

- Nhiễu $\varepsilon_i=y_i-w_{\mathrm{true}}^T\phi_i$ là đại lượng ẩn, vì $w_{\mathrm{true}}$ chưa biết.
- Phần dư $r_i(w)=w^T\phi_i-y_i$ tính được sau khi chọn $w$.
:::

Khi $w=w_{\mathrm{true}}$, $r_i(w_{\mathrm{true}})=-\varepsilon_i$; dấu ngược nhau do quy ước $r_i=\hat y_i-y_i$. Với $w\ne w_{\mathrm{true}}$, $r_i(w)=-\varepsilon_i+(w-w_{\mathrm{true}})^T\phi_i$, nên phần dư khác nhiễu một sai số ước lượng; khi dạng mô hình sai, phần dư còn chứa phần do sai đặc tả.

::: example Ví dụ 00.35 (Nhiễu và phần dư ở căn 2)
**Dữ kiện.** Căn 2 có $\phi_2=(1;\,-0{,}5;\,0)^T$ và $y_2=12$. Giả sử giá trị trung tâm thật là $w_{\mathrm{true}}^T\phi_2=13$.

**Nhiễu.** $\varepsilon_2=y_2-w_{\mathrm{true}}^T\phi_2=12-13=-1$.

**Phần dư tại trọng số thật.** $r_2(w_{\mathrm{true}})=13-12=1=-\varepsilon_2$.

**Phần dư tại trọng số thử.** Với $w^{(0)}=(14,1,1)^T$ của Ví dụ 00.2, $r_2(w^{(0)})=13{,}5-12=1{,}5\ne-\varepsilon_2$.

**Kiểm tra lại.** $r_2(w)+\varepsilon_2=w^T\phi_2-w_{\mathrm{true}}^T\phi_2$, bằng $0$ tại $w_{\mathrm{true}}$ và bằng $0{,}5$ tại $w^{(0)}$.
:::

Khi phân phối của nhiễu đã được giả thiết, mỗi bộ trọng số cho một mật độ của các giá quan sát. Một cách trực quan, nguyên tắc hợp lý cực đại chọn bộ trọng số làm cho dữ liệu đã quan sát có mật độ lớn nhất.

::: definition Định nghĩa 00.64 (Hàm hợp lý, ước lượng hợp lý cực đại)
Cho các biến $Y_1,\ldots,Y_m$ độc lập (Định nghĩa 00.62), $Y_i$ có mật độ $p(\cdot\,;w,\phi_i)$ phụ thuộc tham số $w$, và các giá trị quan sát $y_1,\ldots,y_m$. *Hàm hợp lý* (likelihood) là
$$
L(w)=\prod_{i=1}^mp(y_i;\,w,\phi_i).
$$
Một *ước lượng hợp lý cực đại* (maximum likelihood estimate, MLE) là một $w$ làm $L(w)$ lớn nhất.
:::

Hàm hợp lý là hàm của tham số khi dữ liệu đã cố định; nó không là phân phối xác suất của $w$. Theo Định nghĩa 00.62, mật độ đồng thời của các $Y_i$ độc lập bằng tích các mật độ, nên $L$ là một tích. Mệnh đề sau là căn cứ xác suất của mất mát bình phương.

::: proposition Mệnh đề 00.65 (Hợp lý cực đại dưới nhiễu Gauss độc lập là bình phương nhỏ nhất) — chứng minh đầy đủ
**Giả thiết.** (P1), với tham số $w$ ở vị trí $w_{\mathrm{true}}$: $Y_i=w^T\phi_i+\varepsilon_i$, $i=1,\ldots,m$, với $\varepsilon_1,\ldots,\varepsilon_m$ độc lập, cùng phân phối $\mathcal N(0,\sigma^2)$ và $\sigma^2>0$ cố định, không phụ thuộc $w$.

**Kết luận.**
$$
\begin{aligned}
&-\log L(w)\\
&\quad=\frac m2\log(2\pi\sigma^2)\\
&\qquad+\frac1{2\sigma^2}\sum_{i=1}^mr_i(w)^2 ,
\end{aligned}
\tag{7.1}
$$
với $r_i(w)=w^T\phi_i-y_i$. Do đó tập các ước lượng hợp lý cực đại trùng tập nghiệm bình phương nhỏ nhất của Định nghĩa 00.21.
:::

::: proof Chứng minh Mệnh đề 00.65
**Lộ trình.** Viết mật độ của từng giá quan sát, nhân lại, lấy âm log, rồi dùng tính tăng chặt của log.

**Bước 1 (mật độ của một giá).** Với $w$ cố định, $Y_i=w^T\phi_i+\sigma G_i$ với $G_i=\varepsilon_i/\sigma\sim\mathcal N(0,1)$, nên theo các tính chất sau Định nghĩa 00.58, $Y_i\sim\mathcal N(w^T\phi_i,\sigma^2)$:
$$
\begin{aligned}
&p(y_i;\,w,\phi_i)=\frac1{\sqrt{2\pi\sigma^2}}\\
&\quad\times\exp\Bigl(-\frac{(y_i-w^T\phi_i)^2}{2\sigma^2}\Bigr).
\end{aligned}
$$

**Bước 2 (tích và âm log).** Các $Y_i$ độc lập vì mỗi $Y_i$ là hàm của một $\varepsilon_i$ (kiến thức tiên quyết). Theo Định nghĩa 00.64 và $\log$ của tích bằng tổng các $\log$,
$$
\begin{aligned}
&-\log L(w)\\
&\quad=-\sum_{i=1}^m\log p(y_i;\,w,\phi_i)\\
&\quad=\sum_{i=1}^m\Bigl[\tfrac12\log(2\pi\sigma^2)\\
&\qquad+\frac{(y_i-w^T\phi_i)^2}{2\sigma^2}\Bigr],
\end{aligned}
$$
và $(y_i-w^T\phi_i)^2=r_i(w)^2$, cho (7.1).

**Bước 3 (tập nghiệm).** $L(w)>0$ và $\log$ tăng chặt trên $(0,\infty)$, nên $L(w)\ge L(w')$ khi và chỉ khi $-\log L(w)\le-\log L(w')$. Theo (7.1), $-\log L(w)=k_1+k_2\sum_ir_i(w)^2$ với $k_1=\tfrac m2\log(2\pi\sigma^2)$ và $k_2=1/(2\sigma^2)>0$ không phụ thuộc $w$; ở đây dùng giả thiết $\sigma^2$ cố định. Vì $k_2>0$, cực đại $L$ tương đương cực tiểu $\sum_ir_i(w)^2=2f(w)$. $\square$
:::

![Khung trái: giá quan sát bằng tín hiệu cộng nhiễu, với phần dư r. Khung giữa: nhiễu epsilon có phân phối N(0, sigma bình phương), khoảng cộng trừ sigma chứa 68,27 phần trăm xác suất. Khung phải: hàm hợp lý là tích các mật độ, âm log hợp lý bằng hằng số cộng tổng bình phương phần dư chia 2 sigma bình phương.](img/lec-00/probability-noise-gaussian-likelihood.svg)

*Các quan sát phân tán quanh giá trị trung tâm của mô hình; tích các mật độ tạo hàm hợp lý của tham số.*

Hai hàm mục tiêu $L$ và $f$ khác nhau, nhưng theo (7.1), $-\log L=k_1+f/\sigma^2$ là một hàm affine tăng chặt của $f$, với $k_1$ của bước 3; vì vậy cực đại $L$ và cực tiểu $f$ có cùng nghiệm. Phân phối Gauss của nhiễu là một giả thiết mô hình, đặt trước khi xem dữ liệu.

Trong học máy, *mất mát bình phương trung bình* (mean squared error, MSE) $\tfrac1m\sum_ir_i(w)^2$ dùng để huấn luyện mô hình *hồi quy* (regression) sai khác *âm log-hợp lý* (negative log-likelihood) (7.1) một hằng số cộng và một hệ số dương $2\sigma^2/m$. Do đó $\sigma^2$ không đổi trọng số tối ưu, và cần được biết hoặc ước lượng riêng khi tính dải chứa giá thật.

Như vậy, dưới giả thiết (P1), trọng số $w_{\mathrm{LS}}=(14,2,1)^T$ là ước lượng hợp lý cực đại, và (6.1) cho một dải chứa giá mới với xác suất $0{,}95$ khi $\sigma$ đã biết và coi trọng số sinh dữ liệu bằng $w_{\mathrm{LS}}$. Tuy nhiên, (P1) đòi các nhiễu độc lập và cùng phương sai. Khi sai số của các quan sát tương quan, chúng ta cần hiệp phương sai và phân phối Gauss nhiều biến.

### 7.4. Kỳ vọng vector, hiệp phương sai và tương quan

Với vector ngẫu nhiên, độ trải rộng còn gồm mức độ các tọa độ cùng biến thiên.

Mọi phép tính hiệp phương sai dưới đây dùng kỳ vọng của tổng và của tích các biến ngẫu nhiên.

::: proposition Mệnh đề 00.66 (Tính tuyến tính của kỳ vọng; kỳ vọng của tích) — ngoài phạm vi, xem Murphy (2022)
**Giả thiết.** Các biến $U_1,\ldots,U_k$ có kỳ vọng hữu hạn; $\alpha_1,\ldots,\alpha_k,\beta\in\mathbb R$.

**Kết luận.**
1. $\mathbb E\bigl[\sum_i\alpha_iU_i+\beta\bigr]=\sum_i\alpha_i\,\mathbb E[U_i]+\beta$.
2. Nếu $U$, $V$ độc lập và có kỳ vọng hữu hạn thì $\mathbb E[UV]=\mathbb E[U]\,\mathbb E[V]$.
:::

Murphy (2022), §2.2.5.1, (2.26)–(2.28), nêu hai kết luận này. Với $U$, $V$ rời rạc độc lập, kết luận 2 là phép tính $\sum_{u,v}uv\,p_U(u)\,p_V(v)=\bigl(\sum_uu\,p_U(u)\bigr)\bigl(\sum_vv\,p_V(v)\bigr)$.

Một cách trực quan, kỳ vọng là tâm của đám mây điểm, còn hiệp phương sai mô tả đám mây trải rộng theo hướng nào.

::: definition Định nghĩa 00.67 (Kỳ vọng vector, ma trận hiệp phương sai, hệ số tương quan)
Cho vector ngẫu nhiên $Z\in\mathbb R^n$ với $\mathbb E[Z_i^2]<\infty$ cho mọi $i$.

- *Kỳ vọng* của $Z$ là $\mu=\mathbb E[Z]=(\mathbb E[Z_1],\ldots,\mathbb E[Z_n])^T$.
- *Ma trận hiệp phương sai* (covariance matrix) của $Z$ là ma trận $\Sigma\in\mathbb R^{n\times n}$ cho bởi
$$
\begin{aligned}
\Sigma&=\operatorname{Cov}(Z)\\
&=\mathbb E\bigl[(Z-\mu)(Z-\mu)^T\bigr],
\end{aligned}
$$
với phần tử $\Sigma_{ij}=\operatorname{Cov}(Z_i,Z_j)=\mathbb E[(Z_i-\mu_i)(Z_j-\mu_j)]$, gọi là *hiệp phương sai* (covariance) của $Z_i$ và $Z_j$.
- Khi $\Sigma_{ii}>0$ và $\Sigma_{jj}>0$, *hệ số tương quan* (correlation coefficient) là $\rho_{ij}=\Sigma_{ij}/\sqrt{\Sigma_{ii}\Sigma_{jj}}$.
:::

Phần tử đường chéo $\Sigma_{ii}=\operatorname{Var}(Z_i)$; $\Sigma$ đối xứng vì $\Sigma_{ij}=\Sigma_{ji}$. Khai triển như bước 2 của chứng minh Mệnh đề 00.57 cho $\operatorname{Cov}(Z_i,Z_j)=\mathbb E[Z_iZ_j]-\mu_i\mu_j$. Hiệp phương sai phụ thuộc đơn vị đo; tương quan không có đơn vị, nằm trong $[-1,1]$ (Murphy (2022), §3.1.2), và chỉ đo liên hệ tuyến tính. Tương quan giữa hai đại lượng không chứng minh quan hệ nhân quả giữa chúng (Murphy (2022), §3.1.4).

Phép biến đổi affine của một vector ngẫu nhiên, như một tầng tuyến tính, biến đổi kỳ vọng và hiệp phương sai theo quy tắc sau.

::: proposition Mệnh đề 00.68 (Kỳ vọng và hiệp phương sai dưới biến đổi affine) — chứng minh đầy đủ
**Giả thiết.** $Z\in\mathbb R^n$ có kỳ vọng $\mu$ và ma trận hiệp phương sai $\Sigma$; $A\in\mathbb R^{k\times n}$, $c\in\mathbb R^k$.

**Kết luận.**
1. $\mathbb E[AZ+c]=A\mu+c$.
2. $\operatorname{Cov}(AZ+c)=A\Sigma A^T$.
3. $\Sigma\succeq0$; cụ thể, $a^T\Sigma a=\operatorname{Var}(a^TZ)$ với mọi $a\in\mathbb R^n$.
:::

::: proof Chứng minh Mệnh đề 00.68
**Lộ trình.** Áp dụng tính tuyến tính của kỳ vọng cho từng thành phần, rồi cho từng phần tử của ma trận $(Z-\mu)(Z-\mu)^T$.

**Bước 1 (kỳ vọng).** Thành phần $i$ của $AZ+c$ là $\sum_ja_{ij}Z_j+c_i$. Theo kết luận 1 của Mệnh đề 00.66, $\mathbb E[\sum_ja_{ij}Z_j+c_i]=\sum_ja_{ij}\mu_j+c_i$, tức thành phần $i$ của $A\mu+c$.

**Bước 2 (hiệp phương sai).** Theo bước 1, $(AZ+c)-(A\mu+c)=A(Z-\mu)$. Do đó, dùng bước 1 cho từng phần tử của ma trận,
$$
\begin{aligned}
&\operatorname{Cov}(AZ+c)\\
&\quad=\mathbb E\bigl[A(Z-\mu)(Z-\mu)^TA^T\bigr]\\
&\quad=A\,\mathbb E\bigl[(Z-\mu)(Z-\mu)^T\bigr]A^T\\
&\quad=A\Sigma A^T .
\end{aligned}
$$

**Bước 3 (nửa xác định dương).** Áp dụng bước 2 với $A=a^T\in\mathbb R^{1\times n}$ và $c=0$: $\operatorname{Var}(a^TZ)=a^T\Sigma a$. Phương sai không âm, nên $a^T\Sigma a\ge0$ với mọi $a$. $\square$
:::

Kết luận 2 cho phép truyền bất định qua một phép biến đổi tuyến tính: nếu sai số đầu vào có hiệp phương sai $\Sigma$, sai số sau phép biến đổi $A$ có hiệp phương sai $A\Sigma A^T$.

::: example Ví dụ 00.36 (Kỳ vọng, hiệp phương sai và tương quan của bảng)
**Dữ kiện.** Bảng của Ví dụ 00.32, $Z=(U,V)^T$, với $p_U(1)=0{,}50$, $p_V(1)=0{,}60$, $p_{U,V}(1,1)=0{,}40$.

**Kỳ vọng.** Với biến nhận giá trị $0$, $1$, $\mathbb E[U]=p_U(1)$, nên $\mu=(0{,}50;\ 0{,}60)^T$.

**Phương sai.** $U^2=U$, nên $\operatorname{Var}(U)=0{,}50-0{,}25=0{,}25$; tương tự $\operatorname{Var}(V)=0{,}60-0{,}36=0{,}24$.

**Hiệp phương sai.** $\mathbb E[UV]=\Pr(U=1,V=1)=0{,}40$, nên $\operatorname{Cov}(U,V)=0{,}40-0{,}50\cdot0{,}60=0{,}10$, và
$$
\begin{aligned}
\Sigma&=\begin{bmatrix}0{,}25&0{,}10\\0{,}10&0{,}24\end{bmatrix},\\
\rho_{UV}&=\frac{0{,}10}{\sqrt{0{,}25\cdot0{,}24}}\\
&=\frac{0{,}10}{\sqrt{0{,}06}}\approx0{,}408 .
\end{aligned}
$$

**Kiểm tra lại.** Phương trình đặc trưng của $\Sigma$ là $\lambda^2-0{,}49\lambda+0{,}05=0$, cho $\lambda\approx0{,}345$ và $0{,}145$, cả hai dương, nên $\Sigma\succ0$ theo Mệnh đề 00.18; kết luận 3 của Mệnh đề 00.68 chỉ bảo đảm $\Sigma\succeq0$. Hiệp phương sai dương ứng với $0{,}40>0{,}30$ ở Ví dụ 00.34.
:::

Hai biến độc lập thì có hiệp phương sai bằng $0$, vì $\mathbb E[UV]=\mathbb E[U]\,\mathbb E[V]$ theo kết luận 2 của Mệnh đề 00.66. Chiều ngược lại sai.

::: remark Nhận xét 00.69 (Không tương quan nhưng phụ thuộc)
Cho $U\sim\operatorname{Unif}(-1,1)$ và $V=U^2$. Khi đó
$$
\begin{aligned}
&\operatorname{Cov}(U,V)\\
&\quad=\mathbb E[U^3]-\mathbb E[U]\,\mathbb E[U^2]\\
&\quad=0-0\cdot\tfrac13=0,
\end{aligned}
$$
vì mật độ $\tfrac12$ trên $[-1,1]$ đối xứng quanh $0$ và $u^3$, $u$ là hàm lẻ. Tuy vậy $V$ hoàn toàn xác định bởi $U$: $\Pr(V\le\tfrac14)=\Pr(\lvert U\rvert\le\tfrac12)=\tfrac12$, nhưng $\Pr(V\le\tfrac14\mid\lvert U\rvert\le\tfrac12)=1$.
:::

### 7.5. Gauss nhiều biến, khoảng cách Mahalanobis và làm trắng

Để mô tả nhiễu của nhiều quan sát cùng lúc, chúng ta cần một mật độ dùng cả vector kỳ vọng lẫn ma trận hiệp phương sai.

::: definition Định nghĩa 00.70 (Phân phối Gauss nhiều biến)
Với $\mu\in\mathbb R^n$ và $\Sigma\in\mathbb S^n_{++}$, vector ngẫu nhiên $Z\in\mathbb R^n$ có *phân phối Gauss nhiều biến* (multivariate Gaussian distribution) $\mathcal N(\mu,\Sigma)$ nếu nó có mật độ
$$
\begin{aligned}
&p_Z(z)=\frac{1}{(2\pi)^{n/2}\det(\Sigma)^{1/2}}\\
&\quad\times\exp\Bigl[-\tfrac12(z-\mu)^T\Sigma^{-1}\\
&\qquad\quad\times(z-\mu)\Bigr].
\end{aligned}
$$
:::

Khi đó $\mathbb E[Z]=\mu$ và $\operatorname{Cov}(Z)=\Sigma$ (Murphy (2022), §3.2.1). Theo Định lý 00.16 và Mệnh đề 00.18, $\Sigma=Q\Lambda Q^T$ với mọi $\lambda_i>0$, nên $\det(\Sigma)=\prod_i\lambda_i>0$ và $\Sigma^{-1}=Q\Lambda^{-1}Q^T\succ0$; mật độ vì thế xác định. Với $\Sigma$ suy biến, phân phối nằm trên tập affine $\mu+\operatorname{Col}(\Sigma)$ có số chiều $\operatorname{rank}\Sigma<n$ và không có mật độ dạng trên.

Các điểm cùng mật độ thỏa $(z-\mu)^T\Sigma^{-1}(z-\mu)=\tau$, một tập mức của dạng toàn phương sinh bởi $\Sigma^{-1}$, tức một elip ($n=2$) hoặc *elipxoit* (ellipsoid) có tâm $\mu$.

::: example Ví dụ 00.37 (Gauss hai biến với tương quan $0{,}8$)
**Dữ kiện.** $Z\sim\mathcal N(0,\Sigma)$ với $\Sigma=\begin{bmatrix}1&0{,}8\\0{,}8&1\end{bmatrix}$; hai điểm $z_+=(1,1)^T$ và $z_-=(1,-1)^T$, cùng chuẩn Euclid $\sqrt2$.

**Nghịch đảo.** $\det\Sigma=1-0{,}64=0{,}36$, nên
$$
\Sigma^{-1}=\frac1{0{,}36}\begin{bmatrix}1&-0{,}8\\-0{,}8&1\end{bmatrix}.
$$

**Dạng toàn phương trong số mũ.**
$$
\begin{aligned}
z_+^T\Sigma^{-1}z_+&=\frac{1-0{,}8-0{,}8+1}{0{,}36}\\
&=\frac{0{,}4}{0{,}36}=\frac{10}9,\\
z_-^T\Sigma^{-1}z_-&=\frac{1+0{,}8+0{,}8+1}{0{,}36}\\
&=\frac{3{,}6}{0{,}36}=10 .
\end{aligned}
$$

**Diễn giải.** Hai điểm cách gốc như nhau theo chuẩn Euclid, nhưng mật độ tại $z_+$ gấp $e^{(10-10/9)/2}=e^{40/9}\approx85$ lần mật độ tại $z_-$. Điểm $z_+$ nằm dọc hướng $(1,1)$, hướng hai tọa độ cùng tăng; điểm $z_-$ nằm dọc hướng $(1,-1)$, nơi đám mây hẹp.

**Kiểm tra lại.** $\Sigma\Sigma^{-1}=\tfrac1{0{,}36}\begin{bmatrix}1-0{,}64&-0{,}8+0{,}8\\0{,}8-0{,}8&-0{,}64+1\end{bmatrix}=I_2$.
:::

![Ba đường đồng mật độ hình elip của phân phối Gauss hai biến có tương quan 0,8, trục dài dọc đường z2 bằng z1.](img/lec-00/probability-gaussian-ellipse.svg)

*Các elip đồng mật độ kéo dài theo hướng $(1,1)$; trục dài là hướng biến thiên mạnh.*

Ví dụ 00.37 cho thấy khoảng cách Euclid không phản ánh mật độ khi các tọa độ tương quan. Đại lượng trong số mũ đo khoảng cách theo thang của $\Sigma$. Để định nghĩa phép đổi tọa độ đưa $\Sigma$ về $I$, ta dùng *căn bậc hai đối xứng* (symmetric square root): với $\Sigma=Q\Lambda Q^T\in\mathbb S^n_{++}$ theo Định lý 00.16, đặt $\Sigma^{1/2}=Q\Lambda^{1/2}Q^T$ và $\Sigma^{-1/2}=Q\Lambda^{-1/2}Q^T$, với $\Lambda^{\pm1/2}=\operatorname{diag}(\lambda_i^{\pm1/2})$. Khi đó $\Sigma^{1/2}\Sigma^{1/2}=\Sigma$, $\Sigma^{-1/2}\Sigma\,\Sigma^{-1/2}=I_n$ và $(\Sigma^{-1/2})^2=\Sigma^{-1}$ (Boyd và Vandenberghe (2004), §A.5.2, tr. 647). Ma trận $\Sigma^{1/2}$ đối xứng, có giá trị riêng $\lambda_i^{1/2}>0$, nên $\Sigma^{1/2}\succ0$ theo Mệnh đề 00.18.

::: definition Định nghĩa 00.71 (Khoảng cách Mahalanobis, làm trắng)
Cho $\mu\in\mathbb R^n$ và $\Sigma\in\mathbb S^n_{++}$.

- *Khoảng cách Mahalanobis* (Mahalanobis distance) từ $z$ tới $\mu$ theo $\Sigma$ là $d_\Sigma(z)=\sqrt{(z-\mu)^T\Sigma^{-1}(z-\mu)}$.
- Với vector ngẫu nhiên $Z$ có kỳ vọng $\mu$ và hiệp phương sai $\Sigma$, phép *làm trắng* (whitening) là $\widetilde Z=\Sigma^{-1/2}(Z-\mu)$.
:::

::: proposition Mệnh đề 00.72 (Làm trắng đưa hiệp phương sai về ma trận đơn vị) — chứng minh đầy đủ
**Giả thiết.** $Z$ có kỳ vọng $\mu$ và hiệp phương sai $\Sigma\in\mathbb S^n_{++}$; $\widetilde Z=\Sigma^{-1/2}(Z-\mu)$.

**Kết luận.** $\mathbb E[\widetilde Z]=0$, $\operatorname{Cov}(\widetilde Z)=I_n$, và $d_\Sigma(z)=\lVert\Sigma^{-1/2}(z-\mu)\rVert_2$ với mọi $z$.
:::

::: proof Chứng minh Mệnh đề 00.72
**Lộ trình.** Áp dụng Mệnh đề 00.68 cho phép biến đổi affine $z\mapsto\Sigma^{-1/2}(z-\mu)$.

**Bước 1 (kỳ vọng và hiệp phương sai).** Áp dụng Mệnh đề 00.68 với $A=\Sigma^{-1/2}$ và $c=-\Sigma^{-1/2}\mu$: $\mathbb E[\widetilde Z]=\Sigma^{-1/2}\mu-\Sigma^{-1/2}\mu=0$ và, vì $\Sigma^{-1/2}$ đối xứng, $\operatorname{Cov}(\widetilde Z)=\Sigma^{-1/2}\Sigma\,\Sigma^{-1/2}=I_n$.

**Bước 2 (khoảng cách).** $\lVert\Sigma^{-1/2}(z-\mu)\rVert_2^2=(z-\mu)^T\Sigma^{-1/2}\Sigma^{-1/2}(z-\mu)=(z-\mu)^T\Sigma^{-1}(z-\mu)=d_\Sigma(z)^2$. $\square$
:::

Mật độ Gauss nhiều biến là hàm giảm của $d_\Sigma(z)$, nên các đường đồng mật độ là các tập cùng khoảng cách Mahalanobis. Trong tọa độ đã làm trắng, khoảng cách Mahalanobis là khoảng cách Euclid, và elip đồng mật độ trở thành đường tròn. Làm trắng loại bỏ tương quan giữa các tọa độ; theo Nhận xét 00.69, các tọa độ không tương quan vẫn có thể phụ thuộc nhau.

![Khung trái: hiệp phương sai từ bảng U, V với mu bằng (0,5; 0,6), Sigma và rho xấp xỉ 0,408. Khung giữa: Gauss hai biến với rho bằng 0,8, đồng mật độ là cùng khoảng cách Mahalanobis. Khung phải: sau làm trắng, elip trở thành đường tròn và Cov bằng I.](img/lec-00/probability-covariance-gaussian.svg)

*Hiệp phương sai mã hóa độ trải và hướng phụ thuộc tuyến tính; làm trắng đưa mọi hướng về cùng thang đo.*

### 7.6. Nhiễu tương quan và bình phương nhỏ nhất tổng quát

Giả thiết (P1) đòi các nhiễu độc lập và cùng phương sai. Khi nhiễu của các quan sát tương quan, giả thiết đó sai, và mất mát bình phương thông thường phạt mọi hướng của phần dư như nhau. Một cách trực quan, một sai lệch dọc hướng mà nhiễu vốn biến thiên mạnh có mật độ lớn hơn một sai lệch cùng chuẩn Euclid dọc hướng nhiễu ổn định, nên nó nên bị phạt nhẹ hơn.

::: proposition Mệnh đề 00.73 (Hợp lý cực đại dưới nhiễu Gauss tương quan là bình phương nhỏ nhất tổng quát) — chứng minh đầy đủ
**Giả thiết.** (P2): $Y=Xw+\varepsilon$ với $X\in\mathbb R^{m\times n}$, $\varepsilon\sim\mathcal N(0,\Sigma_\varepsilon)$ và $\Sigma_\varepsilon\in\mathbb S^m_{++}$ đã biết, không phụ thuộc $w$; $y$ là giá trị quan sát của $Y$ và $r(w)=Xw-y$.

**Kết luận.**
1. $-\log L(w)=\tfrac m2\log(2\pi)+\tfrac12\log\det\Sigma_\varepsilon+J_{\mathrm{GLS}}(w)$, với
$$
J_{\mathrm{GLS}}(w)=\tfrac12\,r(w)^T\Sigma_\varepsilon^{-1}r(w).
$$
Do đó ước lượng hợp lý cực đại là nghiệm cực tiểu của $J_{\mathrm{GLS}}$, gọi là *bình phương nhỏ nhất tổng quát* (generalized least squares, GLS).
2. $J_{\mathrm{GLS}}(w)=\tfrac12\lVert\widetilde Xw-\tilde y\rVert_2^2$ với $\widetilde X=\Sigma_\varepsilon^{-1/2}X$ và $\tilde y=\Sigma_\varepsilon^{-1/2}y$: GLS là *bình phương nhỏ nhất thông thường* (ordinary least squares, OLS) trên dữ liệu đã làm trắng.
3. Nếu $\Sigma_\varepsilon=\sigma^2I_m$ với $\sigma^2>0$ thì $J_{\mathrm{GLS}}=f/\sigma^2$, nên GLS và OLS có cùng tập nghiệm.
:::

::: proof Chứng minh Mệnh đề 00.73
**Lộ trình.** Viết mật độ của $Y$ bằng phép tịnh tiến, lấy âm log như chứng minh Mệnh đề 00.65, rồi làm trắng phần dư.

**Bước 1 (mật độ của $Y$).** Với $w$ cố định, $\Pr(Y\in B)=\Pr(\varepsilon\in B-Xw)$, và phép đổi biến tịnh tiến $z=y-Xw$ trong tích phân cho mật độ của $Y$ là $p_\varepsilon(y-Xw)$, tức $Y\sim\mathcal N(Xw,\Sigma_\varepsilon)$ theo Định nghĩa 00.70.

**Bước 2 (âm log).** $L(w)=p_\varepsilon(y-Xw)$, và $(y-Xw)^T\Sigma_\varepsilon^{-1}(y-Xw)=r(w)^T\Sigma_\varepsilon^{-1}r(w)$. Lấy âm log của mật độ trong Định nghĩa 00.70 với $n$ thay bằng $m$:
$$
\begin{aligned}
&-\log L(w)=\tfrac m2\log(2\pi)\\
&\quad+\tfrac12\log\det\Sigma_\varepsilon\\
&\quad+\tfrac12\,r(w)^T\Sigma_\varepsilon^{-1}r(w).
\end{aligned}
$$
Hai số hạng đầu không phụ thuộc $w$, và $\log$ tăng chặt, nên cực đại $L$ tương đương cực tiểu $J_{\mathrm{GLS}}$, như bước 3 của chứng minh Mệnh đề 00.65.

**Bước 3 (làm trắng).** Theo Mệnh đề 00.72, $r^T\Sigma_\varepsilon^{-1}r=\lVert\Sigma_\varepsilon^{-1/2}r\rVert_2^2$, và $\Sigma_\varepsilon^{-1/2}r(w)=\widetilde Xw-\tilde y$.

**Bước 4 (trường hợp cùng phương sai).** Với $\Sigma_\varepsilon=\sigma^2I_m$, $\Sigma_\varepsilon^{-1}=\sigma^{-2}I_m$ và $J_{\mathrm{GLS}}(w)=\tfrac1{2\sigma^2}\lVert r(w)\rVert_2^2=f(w)/\sigma^2$. Hệ số $1/\sigma^2>0$ không đổi tập nghiệm. $\square$
:::

Theo kết luận 2 và Định lý 00.22, nghiệm GLS thỏa $\widetilde X^T\widetilde Xw=\widetilde X^T\tilde y$, tức $X^T\Sigma_\varepsilon^{-1}Xw=X^T\Sigma_\varepsilon^{-1}y$. Mệnh đề 00.73 cần $\Sigma_\varepsilon$ đã biết: với bốn căn nhà, $\Sigma_\varepsilon$ là ma trận $4\times4$ có $10$ phần tử tự do, và bốn phần dư không đủ để ước lượng chúng.

::: example Ví dụ 00.38 (Hai phần dư cùng chuẩn dưới nhiễu tương quan)
**Dữ kiện.** Giả sử hai quan sát có nhiễu với ma trận hiệp phương sai $\Sigma_2=\begin{bmatrix}1&0{,}5\\0{,}5&1\end{bmatrix}$; hai vector phần dư $r_+=(1,1)^T$, $r_-=(1,-1)^T$ cùng có $\tfrac12\lVert r\rVert_2^2=1$. Trên hình, giá trị này ký hiệu $J_{\mathrm{OLS}}(r)$.

**Nghịch đảo.** $\det\Sigma_2=1-0{,}25=0{,}75$, nên $\Sigma_2^{-1}=\tfrac43\begin{bmatrix}1&-0{,}5\\-0{,}5&1\end{bmatrix}$.

**Mục tiêu GLS.** Viết $J_{\mathrm{GLS}}(r)=\tfrac12r^T\Sigma_2^{-1}r$ cho giá trị mục tiêu GLS tại phần dư $r$:
$$
\begin{aligned}
&J_{\mathrm{GLS}}(r_+)\\
&\quad=\tfrac12\cdot\tfrac43\,(1-0{,}5-0{,}5+1)\\
&\quad=\tfrac23,\\
&J_{\mathrm{GLS}}(r_-)\\
&\quad=\tfrac12\cdot\tfrac43\,(1+0{,}5+0{,}5+1)\\
&\quad=2 .
\end{aligned}
$$

**Diễn giải.** Hai phần dư cùng chuẩn Euclid, nhưng GLS phạt $r_-$ gấp ba lần $r_+$. Với tương quan dương $0{,}5$, hai nhiễu có xu hướng cùng dấu, nên phần dư cùng dấu $r_+$ có mật độ lớn hơn và chịu chi phí nhỏ hơn.

**Kiểm tra lại.** $\Sigma_2\Sigma_2^{-1}=\tfrac43\begin{bmatrix}1-0{,}25&-0{,}5+0{,}5\\0{,}5-0{,}5&-0{,}25+1\end{bmatrix}=I_2$.
:::

![Khung trái: OLS có đường mức là đường tròn, r cộng bằng (1,1) và r trừ bằng (1,âm 1) cùng J OLS bằng 1. Khung phải: GLS với Sigma 2 có đường mức là elip, J GLS của r cộng bằng 2/3, của r trừ bằng 2.](img/lec-00/probability-gls-weighting.svg)

*OLS dùng đường tròn mức; GLS dùng elip mức theo hiệp phương sai của nhiễu.*

Trong học máy, sai số tương quan xuất hiện ở dữ liệu chuỗi thời gian, dữ liệu cảm biến và mô hình nhiều đầu ra. Khi đó mất mát $J_{\mathrm{GLS}}$ cân sai lệch theo cấu trúc nhiễu thay vì coi mọi sai lệch là độc lập và cùng độ tin cậy.

Như vậy, phân phối đồng thời, hiệp phương sai và Gauss nhiều biến cho phép mô tả nhiễu của nhiều quan sát cùng lúc, và khi nhiễu Gauss có hiệp phương sai đã biết, hợp lý cực đại cho bình phương nhỏ nhất tổng quát.

## 8. Ý nghĩa, tác động và giới hạn

Ba nền tảng của bài trả lời câu hỏi mở đầu qua hai tình huống: dự đoán giá căn nhà $65\,\mathrm m^2$ kèm một dải chứa giá thật bằng mô hình ba trọng số, và mô hình bốn trọng số khớp đúng bốn căn nhà.

### 8.1. Dự đoán giá căn nhà mới kèm dải nhiễu

::: application Tình huống 00.1 (Dự đoán giá căn nhà $65\,\mathrm m^2$, $2$ phòng ngủ kèm dải nhiễu)
**Bài toán và dữ liệu.** Bốn căn nhà của Ví dụ 00.1: diện tích $40$, $50$, $60$, $70\,\mathrm m^2$; số phòng ngủ $1$, $2$, $2$, $3$; giá $11$, $12$, $14$, $19$ (đơn vị $100$ triệu đồng). Cần dự đoán giá căn nhà $65\,\mathrm m^2$, $2$ phòng ngủ và một dải chứa giá thật với xác suất $0{,}95$.

**Mô hình hóa.** Đặc trưng $\phi_i=(1,a_i',b_i')^T$ với $a_i'=(a_i-55)/10$, $b_i'=b_i-2$; ma trận thiết kế $X\in\mathbb R^{4\times3}$ và $y=(11,12,14,19)^T$ (Ví dụ 00.4). Mô hình xác suất: $Y_i=w^T\phi_i+\varepsilon_i$ với các $\varepsilon_i$ độc lập, cùng phân phối $\mathcal N(0,\sigma^2)$; giả sử $\sigma=1$, tức $100$ triệu đồng.

**Kiểm tra giả thiết.**
- Mệnh đề 00.65 cần (P1) với $\sigma^2$ cố định; ở đây (P1) là giả thiết của mô hình.
- Định lý 00.22, kết luận 3, cần $\operatorname{rank}(X)=3$; Ví dụ 00.6 cho $\operatorname{Ker}(X)=\{0\}$.

**Ước lượng trọng số.** Theo Mệnh đề 00.65, ước lượng hợp lý cực đại là nghiệm bình phương nhỏ nhất; theo Định lý 00.22 và Ví dụ 00.14, nghiệm duy nhất là $w_{\mathrm{LS}}=(14,2,1)^T$, với phần dư $(-1,1,1,-1)^T$ và SSE bằng $4$.

**Dự đoán điểm.** Căn mới có $a'=1$, $b'=0$, $\phi_{\mathrm{new}}=(1,1,0)^T$, nên
$$
\begin{aligned}
\hat y_{\mathrm{new}}&=w_{\mathrm{LS}}^T\phi_{\mathrm{new}}\\
&=14+2\cdot1+1\cdot0=16,
\end{aligned}
$$
tức $1{,}6$ tỷ đồng.

**Dải nhiễu.** Theo mô hình, giá của căn mới là $Y_{\mathrm{new}}=w^T\phi_{\mathrm{new}}+\varepsilon_{\mathrm{new}}$ với $\varepsilon_{\mathrm{new}}\sim\mathcal N(0,\sigma^2)$. Giá trị $\sigma^2=1$ trùng ước lượng hợp lý cực đại $\hat\sigma^2=\mathrm{SSE}/m=4/4=1$ của phương sai nhiễu, nên $\hat\sigma=1$ (Murphy (2022), §11.2.3.6, (11.49)). Thay $w$ bằng $w_{\mathrm{LS}}$ và dùng (6.1), *dải nhiễu* (noise interval) $95\%$, tức dải chứa giá thật với xác suất $0{,}95$ khi chỉ tính bất định do nhiễu, là
$$
16\pm1{,}96\,\sigma=[14{,}04;\ 17{,}96],
$$
tức từ $1{,}404$ đến $1{,}796$ tỷ đồng.

**Diễn giải và giới hạn.** Dải trên có điều kiện theo đặc trưng $a'=1$, $b'=0$ và coi trọng số là đúng bằng $w_{\mathrm{LS}}$. Dải chứa bất định do nhiễu của một quan sát. Ngoài nhiễu, dự đoán còn chịu ba nguồn bất định mà dải này bỏ qua, bao gồm:
- trọng số được ước lượng từ bốn căn, nên chính $w_{\mathrm{LS}}$ cũng ngẫu nhiên;
- dạng mô hình có thể sai, chẳng hạn thiếu đặc trưng;
- căn nhà mới có thể đến từ một phân phối khác bốn căn đã quan sát.

Nếu nhiễu của các căn tương quan với hiệp phương sai đã biết, (P1) bị vi phạm và trọng số phải tính bằng bình phương nhỏ nhất tổng quát (Mệnh đề 00.73).
:::

![Quy trình bốn khối: dữ liệu thô (diện tích, số phòng, giá) thành đặc trưng phi bằng (1, a phẩy, b phẩy), ghép thành ma trận thiết kế X 4 nhân 3, khớp trọng số bằng cực tiểu nửa bình phương chuẩn phần dư, rồi dự đoán kèm bất định.](img/lec-00/housing-model-pipeline.svg)

*Mỗi mũi tên chỉ một đầu ra được dùng ở khối kế tiếp; đại số tuyến tính biểu diễn dữ liệu, giải tích tìm $w$, xác suất mô tả bất định.*

![Hai biểu đồ cột phần dư của bốn căn: trước khi khớp, tại trọng số thử, phần dư 0,5; 1,5; 0,5; âm 2,5 với SSE bằng 9 và f bằng 4,5; sau khi khớp, phần dư âm 1; 1; 1; âm 1 với SSE bằng 4 và f bằng 2.](img/lec-00/housing-residuals-before-after.svg)

*Khớp mô hình làm tổng bình phương phần dư giảm từ $9$ xuống $4$; cả bốn phần dư sau khớp vẫn khác $0$ và trực giao với các cột của $X$.*

![Dự đoán cho căn nhà mới 65 mét vuông, 2 phòng: phân phối có điều kiện N(1,6; 0,1 bình phương) tỷ đồng, dải 95 phần trăm từ 1,404 đến 1,796 tỷ đồng, cùng danh sách các nguồn bất định không có trong dải.](img/lec-00/housing-prediction-uncertainty.svg)

*Dải $95\%$ quanh dự đoán $1{,}6$ tỷ đồng với $\sigma=0{,}1$ tỷ đồng.*

Bài tập sau tách nhiễu khỏi phần dư khi trọng số sinh dữ liệu được biết.

::: exercise Bài tập 00.2 (Nhiễu, phần dư và độ rộng dải nhiễu)
Dùng bốn căn nhà của Ví dụ 00.1, với $\phi_i=(1,a_i',b_i')^T$, $(a_i',b_i')$ lần lượt là $(-1{,}5;\,-1)$, $(-0{,}5;\,0)$, $(0{,}5;\,0)$, $(1{,}5;\,1)$, $y=(11,12,14,19)^T$, và $r_{\mathrm{LS}}=(-1,1,1,-1)^T$ của Ví dụ 00.14. Giả sử, khác với Ví dụ 00.35, trọng số sinh dữ liệu là $w_{\mathrm{true}}=(13,2,1)^T$.

1. Tính nhiễu $\varepsilon_i=y_i-w_{\mathrm{true}}^T\phi_i$ của bốn căn và so sánh với $-r_{\mathrm{LS}}$.
2. Tính $X^Tr_{\mathrm{LS}}$ và $X^T\varepsilon$, rồi giải thích vì sao hai kết quả khác nhau.
3. Giả sử độ lệch chuẩn của nhiễu là $\sigma=0{,}5$. Tính dải nhiễu $95\%$ quanh dự đoán $\hat y_{\mathrm{new}}=16$ và so độ rộng với dải của Tình huống 00.1.
:::

::: hint
Câu 2: $r_{\mathrm{LS}}$ thỏa phương trình chuẩn của Định lý 00.22, còn $\varepsilon$ không được chọn bằng tối ưu. Câu 3: độ rộng dải là $2\cdot1{,}96\,\sigma$.
:::

::: solution
**Câu 1.** $w_{\mathrm{true}}^T\phi_i=13+2a_i'+b_i'$ cho $(9,\ 12,\ 14,\ 17)$, nên $\varepsilon=(11-9,\ 12-12,\ 14-14,\ 19-17)=(2,0,0,2)^T$. Trong khi đó $-r_{\mathrm{LS}}=(1,-1,-1,1)^T$, nên $\varepsilon\ne-r_{\mathrm{LS}}$: phần dư sau khớp khác nhiễu.

**Câu 2.** $X^Tr_{\mathrm{LS}}=0$ theo Ví dụ 00.14. Với $\varepsilon$: thành phần đầu là $2+0+0+2=4$, thành phần thứ hai là $-1{,}5\cdot2+0+0+1{,}5\cdot2=0$, thành phần thứ ba là $-1\cdot2+0+0+1\cdot2=0$, nên $X^T\varepsilon=(4,0,0)^T\ne0$. Phần dư bình phương nhỏ nhất bị ép trực giao với mọi cột của $X$ (kết luận 1 của Định lý 00.22); nhiễu là một giá trị của biến ngẫu nhiên, không chịu ràng buộc đó.

**Câu 3.** $16\pm1{,}96\cdot0{,}5=16\pm0{,}98=[15{,}02;\ 16{,}98]$, độ rộng $1{,}96$, bằng một nửa độ rộng $3{,}92$ của dải với $\sigma=1$.

**Kiểm tra lại.** $y-Xw_{\mathrm{true}}=\varepsilon$ và $y-Xw_{\mathrm{LS}}=-r_{\mathrm{LS}}$, nên $Xw_{\mathrm{LS}}-Xw_{\mathrm{true}}=\varepsilon+r_{\mathrm{LS}}=(1,1,1,1)^T=X(1,0,0)^T$, khớp $w_{\mathrm{LS}}-w_{\mathrm{true}}=(1,0,0)^T$.
:::

### 8.2. Mô hình mở rộng và quá khớp

Câu hỏi mở đầu so sánh mô hình ba trọng số với một mô hình thêm đặc trưng $(a')^2$. Thêm đặc trưng làm tổng bình phương phần dư trên dữ liệu huấn luyện không tăng, vì mô hình cũ là trường hợp riêng của mô hình mới với trọng số của $(a')^2$ bằng $0$. Sai số huấn luyện nhỏ hơn không kéo theo dự đoán tốt hơn trên căn nhà mới; định nghĩa sau gọi tên hiện tượng này.

::: definition Định nghĩa 00.74 (Quá khớp)
*Quá khớp* (overfitting) là hiện tượng một mô hình có sai số nhỏ trên dữ liệu dùng để khớp (*dữ liệu huấn luyện*, training data) nhưng dự đoán kém trên dữ liệu mới.
:::

::: application Tình huống 00.2 (Mô hình bốn trọng số khớp đúng bốn căn nhà)
**Bài toán và dữ liệu.** Bốn căn nhà của Ví dụ 00.1, với $a_i'=(-1{,}5;\,-0{,}5;\,0{,}5;\,1{,}5)$, $b_i'=(-1;\,0;\,0;\,1)$, $y=(11,12,14,19)^T$. Mô hình mở rộng dùng $\phi_{\mathrm q,i}=(1,a_i',b_i',(a_i')^2)^T$ và trọng số $w_{\mathrm q}\in\mathbb R^4$.

**Mô hình hóa.** Cột mới là $((a_i')^2)=(2{,}25;\ 0{,}25;\ 0{,}25;\ 2{,}25)$, và
$$
\begin{aligned}
&X_{\mathrm q}\in\mathbb R^{4\times4},\\
&X_{\mathrm q}=\begin{bmatrix}1&-1{,}5&-1&2{,}25\\1&-0{,}5&0&0{,}25\\1&0{,}5&0&0{,}25\\1&1{,}5&1&2{,}25\end{bmatrix}.
\end{aligned}
$$

**Hạng.** Đảo thứ tự các căn ($1\leftrightarrow4$, $2\leftrightarrow3$) giữ nguyên cột $1$ và cột $(a')^2$, đổi dấu cột $a'$ và cột $b'$. Gọi $\mathbb 1=(1,1,1,1)^T$. Nếu $(a')^2=\beta_0\mathbb 1+\beta_1a'+\beta_2b'$, phép đảo cho $(a')^2=\beta_0\mathbb 1-\beta_1a'-\beta_2b'$; cộng hai đẳng thức được $(a')^2=\beta_0\mathbb 1$, vô lý vì $2{,}25\ne0{,}25$. Cùng với Ví dụ 00.6, bốn cột độc lập tuyến tính, nên $\operatorname{rank}(X_{\mathrm q})=4$ và $X_{\mathrm q}$ khả nghịch theo Định lý 00.12.

**Áp dụng kết quả.** Theo Định lý 00.12, với mọi vector giá $y$, hệ $X_{\mathrm q}w_{\mathrm q}=y$ có nghiệm duy nhất, và nghiệm đó cho phần dư bằng $0$. Với giá đã cho, trừ hàng 2 khỏi hàng 3 được $w_{\mathrm q,1}=2$; trừ hàng 1 khỏi hàng 4 được $3w_{\mathrm q,1}+2w_{\mathrm q,2}=8$, nên $w_{\mathrm q,2}=1$; khi đó hàng 2 và hàng 1 cho $w_{\mathrm q,0}+0{,}25w_{\mathrm q,3}=13$ và $w_{\mathrm q,0}+2{,}25w_{\mathrm q,3}=15$, nên $w_{\mathrm q,3}=1$ và $w_{\mathrm q,0}=12{,}75$. Vậy $w_{\mathrm q}=(12{,}75;\ 2;\ 1;\ 1)^T$. Kiểm tra: căn 1 cho $12{,}75-3-1+2{,}25=11$, căn 2 cho $12{,}75-1+0{,}25=12$, căn 3 cho $12{,}75+1+0{,}25=14$, căn 4 cho $12{,}75+3+1+2{,}25=19$. SSE bằng $0$.

**Dự đoán.** Căn mới có $\phi_{\mathrm q,\mathrm{new}}=(1,1,0,1)^T$, nên $w_{\mathrm q}^T\phi_{\mathrm q,\mathrm{new}}=12{,}75+2+0+1=15{,}75$, so với $16$ của mô hình ba trọng số.

**Điều kiện bị vi phạm và hậu quả.** Số mẫu $m=4$ bằng số trọng số $4$ và $X_{\mathrm q}$ khả nghịch, nên mô hình khớp đúng bốn giá bất kỳ. Dưới (P1) với $\sigma>0$, các giá quan sát chứa nhiễu, và phần dư bằng $0$ nghĩa là mô hình đã khớp cả phần nhiễu. Khi $\sigma$ chưa biết, các phần dư đều bằng $0$ nên không còn thông tin nào để ước lượng $\sigma$: ước lượng $\mathrm{SSE}/m$ bằng $0$. SSE bằng $0$ trên dữ liệu huấn luyện không cho biết dự đoán $15{,}75$ tốt hơn $16$; muốn so sánh hai mô hình, cần dữ liệu không dùng để khớp, và bốn căn nhà không có phần dữ liệu đó.
:::

![Hai khung: mô hình 3 trọng số với dự đoán 10, 13, 15, 18, phần dư âm 1, 1, 1, âm 1, SSE bằng 4 và dự đoán 1,6 tỷ cho căn mới; mô hình 4 trọng số nội suy đúng 11, 12, 14, 19, SSE bằng 0 và dự đoán 1,575 tỷ cho căn mới.](img/lec-00/housing-model-comparison.svg)

*Mô hình bốn trọng số đạt SSE bằng $0$ trên bốn căn huấn luyện và đổi dự đoán tại căn nhà mới.*

Trong học máy, với các mô hình lồng nhau, mô hình nhiều tham số hơn có sai số huấn luyện không lớn hơn, nên sai số huấn luyện thiên về mô hình linh hoạt. Goodfellow, Bengio và Courville (2016), §5.2, mô tả quá khớp là khi khoảng cách giữa sai số huấn luyện và sai số trên *tập kiểm thử* (test set) tách riêng lớn.

### 8.3. Tóm tắt

Chúng ta bắt đầu từ bốn căn nhà và câu hỏi nên tin dự đoán nào cho căn nhà thứ năm. Đại số tuyến tính ghép bốn căn thành ma trận thiết kế $X$; hạng cho biết hệ $Xw=y$ vô nghiệm (Định lý 00.9) và nghiệm bình phương nhỏ nhất duy nhất (Định lý 00.22). Giải tích nhiều biến cho gradient $X^Tr$ và Hessian $X^TX$ của mất mát (Mệnh đề 00.45), điều kiện cần bậc nhất (Định lý 00.42) và điều kiện bậc hai (Định lý 00.43). Xác suất đọc mất mát bình phương là âm log-hợp lý dưới nhiễu Gauss độc lập (Mệnh đề 00.65), mở rộng sang nhiễu tương quan bằng bình phương nhỏ nhất tổng quát (Mệnh đề 00.73), và cho dải nhiễu của dự đoán (Tình huống 00.1). Mô hình bốn trọng số khớp đúng bốn căn vì $X_{\mathrm q}$ khả nghịch (Tình huống 00.2).

Do đó, với câu hỏi mở đầu, SSE bằng $0$ không là căn cứ để chọn $15{,}75$. Với bốn căn nhà, ta dùng dự đoán $16$ của mô hình ba trọng số; dưới (P1) với $\sigma^2=1$, bằng ước lượng hợp lý cực đại $\hat\sigma^2=\mathrm{SSE}/m=4/4$, và coi trọng số bằng $w_{\mathrm{LS}}$, giá thật lệch khỏi $16$ không quá $1{,}96$ (tức $196$ triệu đồng) với xác suất $0{,}95$. Muốn so sánh hai mô hình, cần dữ liệu không dùng để khớp.

| Nội dung | Kết quả cần tra lại |
|---|---|
| Biểu diễn dữ liệu | Định nghĩa 00.1, 00.7; Mệnh đề 00.5, 00.8 |
| Hệ tuyến tính và nghịch đảo | Định lý 00.9, 00.12 |
| Phổ và dạng toàn phương | Định lý 00.16; Mệnh đề 00.18, 00.20; Hệ quả 00.19 |
| Bình phương nhỏ nhất | Định lý 00.22; Mệnh đề 00.45 |
| Đạo hàm và Taylor | Mệnh đề 00.33, 00.38; Hệ quả 00.39; Định lý 00.35, 00.40 |
| Điều kiện tối ưu | Định lý 00.42, 00.43; Nhận xét 00.44 |
| Xác suất một biến | Mệnh đề 00.54, 00.57; Định nghĩa 00.58 |
| Xác suất nhiều biến và nhiễu | Mệnh đề 00.61, 00.65, 00.66, 00.68, 00.72, 00.73 |

Các công thức cần nhớ là (4.1), (5.1), (6.1) và (7.1). Các kết quả chính dựa trên ba giả thiết, bao gồm:

- **Hạng cột đầy đủ** (A1) cho nghiệm bình phương nhỏ nhất duy nhất và công thức $(X^TX)^{-1}X^Ty$; phương trình chuẩn đúng cả khi thiếu hạng.
- **Nhiễu Gauss độc lập, cùng phương sai** (P1) cho sự trùng nhau của hợp lý cực đại và bình phương nhỏ nhất; nhiễu tương quan với hiệp phương sai đã biết (P2) cho bình phương nhỏ nhất tổng quát.
- **Trọng số cố định và $\sigma$ đã biết** cho dải $\hat y\pm1{,}96\,\sigma$.

## 9. Bài tập

Hai bài tập sau nằm trong thân bài; mỗi dòng ghi mục tiêu học tập mà bài kiểm tra.

1. **Bài tập 00.1** (Một bước hạ gradient với $\eta=0{,}05$): mục tiêu 1, 3; tính dự đoán, phần dư, gradient và một bước hạ gradient.
2. **Bài tập 00.2** (Nhiễu, phần dư và độ rộng dải nhiễu): mục tiêu 4, 6; phân biệt nhiễu với phần dư và tính dải nhiễu.

Bài tập 00.3–00.16, có gợi ý và lời giải, nằm trong [tệp bài tập của Bài 00](material-viewer.html?doc=materials/lec-00/exercises.md&deck=lecture-00-on-tap-nen-tang-toan-hoc.html).

## 10. Câu hỏi cuối buổi và cầu nối

**Câu hỏi.** Theo Ví dụ 00.21, $x^*=(-6/7,5/7)$ là cực tiểu địa phương chặt của $h(u,v)=u^2+uv+2v^2+u-2v$. Xác định $x^*$ có là cực tiểu toàn cục của $h$ trên $\mathbb R^2$ không, và chỉ ra chỗ lập luận dùng việc $h$ là đa thức bậc hai.

::: solution Lời giải câu hỏi cuối buổi
**Khai triển chính xác.** $h$ là đa thức bậc hai, nên theo Định lý 00.40, với mọi $\Delta\in\mathbb R^2$,
$$
\begin{aligned}
h(x^*+\Delta)&=h(x^*)+\nabla h(x^*)^T\Delta\\
&\quad+\tfrac12\Delta^T\nabla^2h\,\Delta,
\end{aligned}
$$
không có số hạng $o(\lVert\Delta\rVert_2^2)$. Đây là chỗ dùng giả thiết bậc hai: với hàm tổng quát, khai triển chứa phần dư $o(\lVert\Delta\rVert_2^2)$, nên chỉ kết luận được dấu của $h(x^*+\Delta)-h(x^*)$ khi $\lVert\Delta\rVert_2$ đủ nhỏ.

**Kết luận.** $\nabla h(x^*)=0$ (Ví dụ 00.20) và $\nabla^2h$ có $\lambda_{\min}=3-\sqrt2>0$ (Ví dụ 00.19). Theo Mệnh đề 00.18, với mọi $\Delta\ne0$,
$$
\begin{aligned}
&h(x^*+\Delta)-h(x^*)\\
&\quad=\tfrac12\Delta^T\nabla^2h\,\Delta\\
&\quad\ge\tfrac12(3-\sqrt2)\lVert\Delta\rVert_2^2>0 .
\end{aligned}
$$
Vậy $x^*$ là cực tiểu toàn cục duy nhất của $h$, với $h(x^*)=-8/7$.
:::

Với một hàm mất mát tổng quát, Định lý 00.42 và 00.43 chỉ cho kết luận địa phương và chỉ tại điểm trong của miền (phản ví dụ hàm $t\mapsto t$ trên $[0,1]$ sau Định lý 00.42): một điểm dừng có Hessian xác định dương là cực tiểu trong một lân cận, và hàm có thể có nhiều cực tiểu địa phương với giá trị khác nhau. Bài 01 xét tập lồi và hàm lồi: một hàm khả vi hai lần trên một tập lồi mở là lồi khi Hessian của nó nửa xác định dương tại mọi điểm của tập đó, và với hàm lồi khả vi, mọi điểm dừng là cực tiểu toàn cục.

## 11. Tài liệu đọc

- **Trước buổi học:** Goodfellow, Ian; Bengio, Yoshua; Courville, Aaron (2016), *Deep Learning*, MIT Press: §2.1–2.7 (vector, ma trận, nghịch đảo, chuẩn, phân rã trị riêng), §3.1–3.9 (xác suất, phân phối, độc lập, kỳ vọng, phương sai, Gauss), §4.3 (tối ưu dựa trên gradient), §5.2 (quá khớp).
- **Sau buổi học:**
  - Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press: Phụ lục §A.1 (tích trong, chuẩn, Cauchy–Schwarz), §A.4 (đạo hàm, gradient, quy tắc dây chuyền, Hessian), §A.5.1–A.5.2 (không gian cột, hạt nhân, phân rã trị riêng, xác định dương, căn bậc hai đối xứng).
  - Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả: §2.1–2.6 (xác suất một biến, độc lập, Bernoulli, Gauss), §2.8.4, §3.1–3.2 (hiệp phương sai, không tương quan và độc lập, Gauss nhiều biến, khoảng cách Mahalanobis), §4.2.7, §11.2.2 và §11.2.3.6 (hợp lý cực đại cho hồi quy tuyến tính, ước lượng phương sai nhiễu), §7.1.4 (định thức, hạng, số điều kiện), §7.4–7.6 (phân rã trị riêng, làm trắng, SVD, LU, QR, Cholesky), §7.7.3, §7.8 (bình phương nhỏ nhất, giải tích ma trận).
  - Koller, Daphne; Friedman, Nir (2009), *Probabilistic Graphical Models: Principles and Techniques*, MIT Press: §2.1 (không gian xác suất, phân phối có điều kiện, công thức Bayes, độc lập, kỳ vọng và phương sai).
  - Kupferschmid, Michael (2023), *Introduction to Mathematical Programming*: §10.7 (điều kiện tối ưu), §28.1–28.2 (đại số tuyến tính).
- **Mở rộng:**
  - Strang, Gilbert (2016), *Introduction to Linear Algebra*, ấn bản 5: §2.6 (phân rã LU), §4.4 (hệ trực chuẩn, Gram–Schmidt, phân rã QR).
  - Stewart, James (2016), *Calculus*, ấn bản 8: §5.2–5.3 (tích phân một biến), §14.1–14.7 (hàm nhiều biến, đạo hàm riêng, khả vi, điều kiện cực trị), §15.1–15.2 (tích phân kép, định lý Fubini).
  - Roe, David (2013), *Linear Methods (Math 211), Lecture 2*, tr. 5–8: tính tương thích, hạng của ma trận mở rộng và số tham số của tập nghiệm, [bản PDF](https://math.mit.edu/~roed/courses/211/lectures/Sep-11.pdf).
  - Mattuck, Arthur, *D. Determinants*, trong *18.02 Supplementary Notes and Problems*, MIT OpenCourseWare 18.02 (Fall 2007), tr. 2–5: khai triển Laplace và diễn giải diện tích, thể tích, [bản PDF](https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/60d63f4aa52f7cc54ba6b12a0c7c6080_determinants.pdf).
