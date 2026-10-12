# Bài 01 — Giới thiệu tối ưu, tập lồi và hàm lồi

## Mục tiêu học tập

Sau khi học chương này, người học làm được các việc sau. Mỗi mục tiêu ghi chuẩn đầu ra bài học (LLO) và chuẩn đầu ra học phần (CLO) tương ứng trong đề cương.

1. Tách dữ kiện, biến quyết định, hàm mục tiêu và miền khả thi trong một tình huống đơn giản, rồi viết mô hình tối ưu dạng $\min_{x\in C}f_0(x)$ (LLO1, CLO1).
2. Lập và giải mô hình điều khiển một bước, hồi quy tuyến tính và hồi quy logistic trên dữ liệu nhỏ, kể cả nghiệm nằm trên biên (LLO1, CLO1).
3. Kiểm tra tính lồi của một tập bằng định nghĩa và phép toán bảo toàn, và tính lồi của một hàm bằng định nghĩa, điều kiện bậc nhất, điều kiện bậc hai hoặc phép ghép (LLO2, CLO1).
4. Phân biệt và chứng nhận riêng ba kết luận: cực tiểu địa phương là toàn cục, nghiệm tồn tại, nghiệm duy nhất; nêu đúng giả thiết cho từng kết luận (LLO1, LLO2, CLO1).
5. Vận dụng chuỗi chứng nhận vào một mô hình học máy mới và nhận ra hậu quả khi một giả thiết bị vi phạm (LLO1, LLO2, CLO1).

## Kiến thức tiên quyết

Chương dùng các kết quả sau, đều đã có trong Bài 00 hoặc trong các học phần tiên quyết Giải tích 1 và Đại số tuyến tính cho kỹ thuật.

- **Đạo hàm một biến và định lý giá trị trung bình.** Nếu $\varphi$ khả vi trên khoảng mở chứa đoạn nối $s$ và $t$ thì tồn tại $\xi$ nằm giữa $s$ và $t$ sao cho $\varphi(s)-\varphi(t)=\varphi'(\xi)(s-t)$. Nếu $\varphi'\ge0$ trên một khoảng thì $\varphi$ không giảm trên khoảng đó.
- **Gradient, Hessian và quy tắc dây chuyền** (Bài 00, mục "Quy tắc dây chuyền" và "Đạo hàm riêng bậc hai và ma trận Hessian"). Với $f:\mathbb R^d\to\mathbb R$ khả vi hai lần, $x\in\mathbb R^d$ và hướng $v\in\mathbb R^d$, hàm một biến $\varphi(t)=f(x+tv)$ có $\varphi'(t)=\nabla f(x+tv)^Tv$ và $\varphi''(t)=v^T\nabla^2f(x+tv)v$.
- **Dạng toàn phương** (Bài 00, mục "Dạng toàn phương"). Ma trận đối xứng $Q$ là nửa xác định dương, ký hiệu $Q\succeq0$, nếu $v^TQv\ge0$ với mọi $v$; là xác định dương, ký hiệu $Q\succ0$, nếu $v^TQv>0$ với mọi $v\ne0$. Với mọi ma trận $X\in\mathbb R^{n\times d}$, $X^TX\succeq0$, và $X^TX\succ0$ khi và chỉ khi $\operatorname{rank}X=d$.
- **Không gian cột, hạt nhân và hạng** (Bài 00, mục "Không gian cột và hạt nhân" và "Hạng của ma trận"). Không gian cột $\mathcal R(X)=\{Xw\mid w\in\mathbb R^d\}$, hạt nhân $\ker X=\{v\mid Xv=0\}$, và $\operatorname{rank}X=d$ khi và chỉ khi $\ker X=\{0\}$. Với mọi ma trận $M$, $\mathcal R(M)=\ker(M^T)^\perp$, trong đó $V^\perp$ là tập các vector trực giao với mọi phần tử của $V$ (định lý cơ bản của đại số tuyến tính).
- **Chuẩn Euclid và bất đẳng thức tam giác.** $\lVert x\rVert_2=\sqrt{x^Tx}$ và $\lVert x+y\rVert_2\le\lVert x\rVert_2+\lVert y\rVert_2$.
- **Dãy và tập đóng.** Một tập $C\subseteq\mathbb R^d$ là đóng nếu giới hạn của mọi dãy hội tụ gồm các điểm của $C$ cũng thuộc $C$; là bị chặn nếu có $R>0$ sao cho $\lVert x\rVert_2\le R$ với mọi $x\in C$.
- **Hàm mũ và logarit tự nhiên.** Trong chương, $\log$ là logarit cơ số $e$.

## Bảng ký hiệu

Bảng liệt kê các ký hiệu dùng xuyên suốt chương; ký hiệu chỉ dùng trong một ví dụ hoặc một chứng minh được giới thiệu tại chỗ.

Khác với Bài 00, chương này viết vector và ma trận bằng chữ thường, không in đậm. Một vài chữ cái mang nghĩa khác nhau ở các mục khác nhau; cột thứ hai ghi rõ phạm vi. Các ký hiệu chỉ dùng trong một chứng minh, một ví dụ hay một bài tập được ghi "nêu tại chỗ".

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $x$, $x^*$ | biến quyết định của bài toán tổng quát (Mục 5 trở đi) và một nghiệm tối ưu | $\mathbb R^d$ |
| $f_0$ | hàm mục tiêu | $D\to\mathbb R$ |
| $C$ | miền khả thi | tập con của $\mathbb R^d$ |
| $p^*$ | giá trị tối ưu $\inf_{x\in C}f_0(x)$ | $\mathbb R\cup\{-\infty,+\infty\}$ |
| $S^*$ | tập nghiệm tối ưu | tập con của $C$ |
| $u$, $u_{\max}$, $\lambda$ | tác động điều khiển, biên độ lớn nhất của nó và trọng số chi phí năng lượng (Mục 2) | $\mathbb R$; $u_{\max}\ge0$; $\lambda\ge0$ |
| $q$ | hàm chi phí của trường hợp điều khiển | $\mathbb R\to\mathbb R$ |
| $X$ | ma trận thiết kế, $n$ mẫu và $d$ cột đặc trưng, hàng $i$ là $x_i^T$ | $\mathbb R^{n\times d}$ |
| $y$ | vector đầu ra quan sát (Mục 3, Tình huống 01.2) | $\mathbb R^n$ |
| $w$ | vector tham số của mô hình | $\mathbb R^d$ |
| $J$ | tổng bình phương phần dư $\lVert Xw-y\rVert_2^2$ | $\mathbb R^d\to\mathbb R$ |
| $m_i$ | biên có dấu $y_ia_i^Tw$ của mẫu $(a_i,y_i)$, $y_i\in\{-1,+1\}$ (Mục 4 trở đi) | $\mathbb R$ |
| $\ell$ | mất mát logistic của một mẫu, $\ell(m)=\log(1+e^{-m})$; $\sigma(s)=1/(1+e^{-s})$ là hàm sigmoid | $\mathbb R\to(0,\infty)$ |
| $L$ | tổng mất mát logistic | $\mathbb R^d\to\mathbb R$ |
| $\theta$ | hệ số của tổ hợp lồi (Mục 6, 7); vector trọng số trộn (Tình huống 01.2) | $[0,1]$; $\Delta_3$ |
| $\Delta_k$ | đơn hình xác suất $\{\theta\in\mathbb R^k\mid\theta\ge0,\ \mathbf 1^T\theta=1\}$ | tập con của $\mathbb R^k$ |
| $S_\alpha(f),\ \alpha$ | tập mức dưới $\{x\mid f(x)\le\alpha\}$ và mức $\alpha$ | tập con của $\mathbb R^d$; $\mathbb R$ |
| $\nabla f,\ \nabla^2f$ | gradient và Hessian của $f$ | $\mathbb R^d$, $\mathbb R^{d\times d}$ |
| $Q,\ Q\succeq0,\ Q\succ0$ | ma trận đối xứng; nửa xác định dương, xác định dương | $\mathbb R^{d\times d}$ |
| $\mu$ | hệ số chính quy hóa hoặc hằng số lồi mạnh | $\mu>0$ |

## 1. Ba quyết định cần tối ưu

Trong Bài 00, chúng ta đã ôn lại gradient, Hessian và điều kiện điểm dừng: nếu một hàm khả vi đạt cực tiểu địa phương tại một điểm nằm trong miền mở thì gradient tại đó bằng không. Điều kiện này chỉ là điều kiện cần và chỉ nói về điểm trong, nên nó không xác định được một điểm dừng có phải cực tiểu toàn cục hay không, và không áp dụng được khi nghiệm nằm trên biên hoặc khi giá trị nhỏ nhất không đạt tại điểm nào. Chọn tác động điều khiển hay chọn tham số cho một mô hình học máy đều là chọn một điểm làm nhỏ nhất một tiêu chí trên một miền cho phép. Bài toán này được gọi là bài toán tối ưu. Trong chương này, chúng ta viết ba quyết định cụ thể thành ba bài toán tối ưu, rồi xây dựng tập lồi và hàm lồi để chứng nhận khi nào nghiệm là toàn cục, tồn tại và duy nhất.

Ba tình huống sau đây được dùng xuyên suốt chương. Mỗi tình huống có một đại lượng được chọn, một tiêu chí để so sánh các lựa chọn và có thể có giới hạn về lựa chọn.

![Trạng thái x0 cộng tác động u cho trạng thái x1, được so với đích t; hai hạng chi phí là (x1 − t) bình phương và lambda nhân u bình phương; tác động bị giới hạn bởi trị tuyệt đối của u không vượt quá u max.](img/lec-01/m03-control-target.svg)

![Năm điểm dữ liệu, một đường thẳng khớp dữ liệu và các đoạn thẳng đứng nối mỗi điểm với đường thẳng, biểu diễn phần dư được bình phương trong hàm mục tiêu.](img/lec-01/m03-linear-fit-sketch.svg)

![Hai lớp điểm, một lớp hình tròn và một lớp hình vuông, được tách bởi một đường biên quyết định.](img/lec-01/m03-logistic-classes.svg)

Ba hình trên, theo thứ tự, minh họa ba trường hợp.

- **Trường hợp điều khiển một bước.** Trạng thái $x_0$ nhận tác động $u$ và trở thành $x_1=x_0+u$. Người điều khiển muốn $x_1$ gần đích $t$, muốn tác động nhỏ để tiết kiệm năng lượng, và không được vượt giới hạn vật lý $u_{\max}$.
- **Trường hợp hồi quy tuyến tính.** Mỗi điểm là một quan sát gồm đầu vào và đầu ra. Một đường thẳng cho một dự đoán tại mỗi đầu vào, và đoạn thẳng đứng từ điểm tới đường là sai lệch. Đại lượng được chọn là hai hệ số của đường thẳng.
- **Trường hợp hồi quy logistic.** Mỗi điểm có nhãn thuộc một trong hai lớp. Một đường biên chia mặt phẳng thành hai nửa ứng với hai lớp dự đoán, và đại lượng được chọn là các hệ số của đường biên.

Trong cả ba trường hợp, một đại lượng được chọn để làm nhỏ nhất một tiêu chí: tác động $u$ trong bài toán điều khiển, tham số của mô hình trong hai bài toán hồi quy. Ba trường hợp được xét theo thứ tự này vì mỗi trường hợp bộc lộ một khó khăn khác nhau về nghiệm.

- Trường hợp điều khiển có nghiệm nằm trên biên của miền cho phép, tại đó đạo hàm khác không.
- Trường hợp hồi quy tuyến tính có thể có vô số nghiệm.
- Trường hợp hồi quy logistic có thể có cận dưới đúng của giá trị mất mát mà không tham số nào đạt được.

Ba khó khăn này dẫn tới ba vấn đề chung: chứng nhận một điểm là cực tiểu toàn cục, điều kiện để nghiệm tồn tại và điều kiện để nghiệm duy nhất.

Như vậy, ba quyết định cụ thể cho ba khó khăn về nghiệm, và ba khó khăn đó trở thành ba câu hỏi được trả lời ở Mục 6 đến Mục 8. Ở giai đoạn này, ba tình huống mới được mô tả bằng lời, chưa có mô hình toán học, nên chưa thể tính nghiệm hay kiểm chứng ba khó khăn trên. Trong Mục 2, chúng ta lập mô hình đầy đủ cho trường hợp đơn giản nhất, có một biến thực và một ràng buộc, để mọi tính toán làm được bằng giải tích một biến.

## 2. Điều khiển một bước

Một vật đang ở vị trí $x_0=0$ trên một trục thẳng và cần tới vị trí đích $t=3$ sau một bước điều khiển. Bộ chấp hành chỉ tạo được tác động có độ lớn không quá $u_{\max}=1$, và mỗi đơn vị tác động tiêu tốn năng lượng. Với dữ kiện đó, tác động cần chọn chưa xác định được, vì chưa có tiêu chí để so sánh hai tác động, chẳng hạn $u=0{,}5$ với $u=1$. Trong mục này, chúng ta lập tiêu chí đó rồi tính tác động tối ưu, và kết quả cho thấy tác động tối ưu nằm trên biên của miền cho phép, tại đó quy tắc "đạo hàm bằng không" không áp dụng được.

### 2.1 Chi phí bám đích và chi phí năng lượng

Hai yêu cầu trong tình huống trên xung đột nhau: muốn trạng thái mới gần đích thì cần tác động lớn, còn muốn tiết kiệm năng lượng thì cần tác động nhỏ. Do không có tác động nào thỏa tối đa cả hai yêu cầu, người lập mô hình phải gộp hai yêu cầu thành một tiêu chí vô hướng.

Cách gộp đơn giản nhất là cộng hai chi phí với một trọng số. Một cách trực quan, mỗi tác động $u$ sinh ra một chi phí bám đích và một chi phí năng lượng, và ta chọn $u$ có tổng chi phí nhỏ nhất trong các tác động được phép. Mô tả này chưa phải định nghĩa. Trong Mục 2.2, chúng ta viết nó thành một bài toán chính xác.

![Sơ đồ đọc từ trái sang phải: trạng thái đầu x0 cộng tác động u cho trạng thái mới x1 bằng x0 cộng u. Nhánh trên so x1 với đích t để tính sai lệch bám đích (x1 − t) bình phương. Nhánh dưới tính năng lượng lambda nhân u bình phương. Hai hạng cộng lại thành chi phí q(u). Một khung ghi giới hạn vật lý: trị tuyệt đối của u không vượt quá u max.](img/lec-01/one-step-control.svg)

Hình trên tách ba thành phần của mô hình.

- Phép cộng $x_1=x_0+u$ là phương trình trạng thái (động lực học, dynamics) của một bước: trạng thái mới phụ thuộc tuyến tính vào tác động.
- Hai nhánh ra từ $u$ là hai chi phí.
- Khung giới hạn vật lý loại hẳn các tác động có $\lvert u\rvert>u_{\max}$ khỏi tập lựa chọn, thay vì cộng thêm một chi phí.

### 2.2 Bài toán điều khiển một bước

Để viết được bài toán, chúng ta cần tách rõ đại lượng nào đã biết, đại lượng nào được chọn, tiêu chí so sánh là gì và lựa chọn bị giới hạn như thế nào. Bài toán điều khiển một bước được phát biểu theo định nghĩa sau.

::: definition Định nghĩa 01.1 (Bài toán điều khiển một bước)
Cho các dữ kiện: trạng thái đầu $x_0\in\mathbb R$, đích $t\in\mathbb R$ (target), biên độ tác động lớn nhất $u_{\max}\ge0$ và trọng số năng lượng $\lambda\ge0$. Biến quyết định là tác động $u\in\mathbb R$, và trạng thái sau một bước là $x_1=x_0+u$. Hàm chi phí $q:\mathbb R\to\mathbb R$ là

$$
q(u)=(x_0+u-t)^2+\lambda u^2 .
$$

Miền khả thi là đoạn $C=[-u_{\max},u_{\max}]$. Bài toán điều khiển một bước là

$$
\underset{u\in C}{\operatorname{minimize}}\quad q(u).
\tag{2.1}
$$
:::

Trong định nghĩa trên, hạng thứ nhất $(x_0+u-t)^2=(x_1-t)^2$ là bình phương sai lệch giữa trạng thái mới và đích, bằng $0$ khi $u=t-x_0$, tức khi tác động đưa vật đúng tới đích. Hạng thứ hai $\lambda u^2$ phạt độ lớn của tác động, trong đó trọng số $\lambda$ đo mức ưu tiên tiết kiệm năng lượng so với bám đích. Khi $\lambda=0$, chỉ còn yêu cầu bám đích.

Ràng buộc $u\in C$ là ràng buộc cứng, tức mọi $u$ ngoài đoạn bị loại, trong khi một số hạng phạt (penalty term) trong $q$ chỉ làm tăng chi phí của phương án mà không loại phương án đó. Điều kiện $u_{\max}\ge0$ bảo đảm $C$ không rỗng, vì $0\in C$.

Hai tham số $\lambda$ và $u_{\max}$ dễ bị đồng nhất nhưng có vai trò khác nhau. Tăng $\lambda$ làm mọi tác động lớn tốn kém hơn nhưng không cấm tác động nào. Giảm $u_{\max}$ cấm thêm tác động nhưng không đổi chi phí của các tác động còn lại.

Lưu ý rằng cách gộp bằng tổng có trọng số là một lựa chọn của người lập mô hình, dữ kiện không quyết định nó. Chẳng hạn, chọn $\lvert x_1-t\rvert+\lambda\lvert u\rvert$ cho một mô hình khác với nghiệm khác.

Hàm $q$ có quan hệ trực tiếp với bình phương nhỏ nhất của Mục 3. Với $X=(1,\sqrt\lambda)^T\in\mathbb R^{2\times1}$ và $y=(t-x_0,0)^T$, ta có

$$
q(u)=(u-(t-x_0))^2+(\sqrt\lambda\,u-0)^2=\lVert Xu-y\rVert_2^2 .
$$

Như vậy, trường hợp điều khiển có cùng thiết lập với bài toán bình phương nhỏ nhất của Mục 3 khi chỉ có một biến, và điểm khác duy nhất là ràng buộc đoạn.

### 2.3 Cực tiểu không ràng buộc và quy tắc cắt

Bài toán đặt ra ở đầu mục là xác định tác động tối ưu. Do $q$ là đa thức bậc hai một biến, nghiệm của (2.1) tính được bằng phép bù bình phương mà không cần công cụ nào ngoài đại số, và chỉ cần Định nghĩa 01.1. Câu trả lời được phát biểu trong mệnh đề sau.

::: proposition Mệnh đề 01.2 (Cực tiểu không ràng buộc và quy tắc cắt)
**Giả thiết.** Các dữ kiện $x_0,t,u_{\max},\lambda$ thỏa Định nghĩa 01.1.

**Kết luận.** (a) Trên toàn $\mathbb R$, hàm $q$ có đúng một điểm cực tiểu, gọi là cực tiểu không ràng buộc (unconstrained minimizer),

$$
u_{\mathrm{free}}=\frac{t-x_0}{1+\lambda}.
\tag{2.2}
$$

(b) Trên $C=[-u_{\max},u_{\max}]$, bài toán (2.1) có đúng một nghiệm

$$
u^*=\operatorname{clip}\bigl(u_{\mathrm{free}},[-u_{\max},u_{\max}]\bigr),
\tag{2.3}
$$

trong đó, với $\alpha\le\beta$, $\operatorname{clip}(s,[\alpha,\beta])=\min(\max(s,\alpha),\beta)$ là điểm của đoạn $[\alpha,\beta]$ gần $s$ nhất: bằng $\alpha$ khi $s<\alpha$, bằng $s$ khi $\alpha\le s\le\beta$, bằng $\beta$ khi $s>\beta$.

**Điều kiện áp dụng.** Cần $\lambda\ge0$ để $1+\lambda>0$, và $u_{\max}\ge0$ để $C$ không rỗng.

**Phạm vi.** Kết quả chỉ dành cho hàm bậc hai một biến có hệ số bậc hai dương trên một đoạn. Với nhiều biến bị ràng buộc trong một hộp, cắt từng tọa độ của cực tiểu không ràng buộc nói chung không cho nghiệm, vì các biến ảnh hưởng lẫn nhau qua hàm mục tiêu.
:::

::: proof Chứng minh Mệnh đề 01.2
**Bước 1 (khai triển $q$).** Khai triển $q$ theo lũy thừa của $u$, ta có

$$
\begin{aligned}
q(u)&=(u-(t-x_0))^2+\lambda u^2\\
&=(1+\lambda)u^2-2(t-x_0)u+(t-x_0)^2 .
\end{aligned}
$$

**Bước 2 (bù bình phương).** Do $1+\lambda>0$ theo điều kiện áp dụng, ta có thể bù bình phương với $u_{\mathrm{free}}$ cho bởi (2.2) và thu được

$$
q(u)=(1+\lambda)\bigl(u-u_{\mathrm{free}}\bigr)^2+\frac{\lambda\,(t-x_0)^2}{1+\lambda}.
\tag{2.4}
$$

Để kiểm tra (2.4), ta khai triển vế phải:

$$
(1+\lambda)u^2-2(1+\lambda)u_{\mathrm{free}}u+(1+\lambda)u_{\mathrm{free}}^2+\lambda(t-x_0)^2/(1+\lambda).
$$

Hệ số của $u$ là $-2(t-x_0)$ theo (2.2). Hằng số bằng

$$
(t-x_0)^2/(1+\lambda)+\lambda(t-x_0)^2/(1+\lambda)=(t-x_0)^2 .
$$

**Bước 3 (phần (a)).** Trong (2.4), hạng thứ hai không phụ thuộc $u$, còn hạng thứ nhất không âm và bằng $0$ khi và chỉ khi $u=u_{\mathrm{free}}$. Do đó $q(u)\ge q(u_{\mathrm{free}})$ với mọi $u\in\mathbb R$, và dấu bằng chỉ xảy ra tại $u=u_{\mathrm{free}}$.

**Bước 4 (phần (b): quy về điểm gần nhất).** Theo (2.4), $q(u)$ là hàm tăng chặt của khoảng cách $\lvert u-u_{\mathrm{free}}\rvert$. Vì vậy cực tiểu $q$ trên $C$ tương đương với tìm điểm của $C$ gần $u_{\mathrm{free}}$ nhất. Xét ba trường hợp.

- Nếu $u_{\mathrm{free}}\in C$, khoảng cách nhỏ nhất bằng $0$ và chỉ đạt tại $u=u_{\mathrm{free}}$.
- Nếu $u_{\mathrm{free}}>u_{\max}$, mọi $u\in C$ thỏa $u\le u_{\max}<u_{\mathrm{free}}$, nên $\lvert u-u_{\mathrm{free}}\rvert=u_{\mathrm{free}}-u\ge u_{\mathrm{free}}-u_{\max}$, với dấu bằng chỉ khi $u=u_{\max}$.
- Trường hợp $u_{\mathrm{free}}<-u_{\max}$ đối xứng, cho nghiệm duy nhất $u=-u_{\max}$.

Ba trường hợp trùng với ba nhánh của hàm $\operatorname{clip}$ trong (2.3). $\square$
:::

Mệnh đề 01.2 cho thấy tác động tối ưu thu được bằng cách chiếu $u_{\mathrm{free}}$ lên đoạn cho phép, tức thay $u_{\mathrm{free}}$ bằng đầu mút gần nhất khi nó nằm ngoài đoạn.

Giả thiết $\lambda\ge0$ chỉ được dùng tại một bước, đó là bảo đảm hệ số $1+\lambda$ dương để $q$ là parabol hướng lên. Nếu bỏ giả thiết và cho $\lambda=-2$, hệ số bậc hai bằng $-1$ và parabol hướng xuống. Khi đó $q$ không bị chặn dưới trên $\mathbb R$, và trên đoạn $C$ cực tiểu nằm ở một đầu mút được chọn theo một quy tắc khác với (2.3).

Giả thiết $u_{\max}\ge0$ dùng để $C$ không rỗng. Với $u_{\max}<0$, đoạn $C$ rỗng và (2.1) không có phương án khả thi nào.

Đạo hàm của $q$ đọc được từ (2.4): $q'(u)=2(1+\lambda)(u-u_{\mathrm{free}})$, nên $u_{\mathrm{free}}$ cũng là nghiệm duy nhất của phương trình $q'(u)=0$. Phép bù bình phương còn cho nhiều thông tin hơn phương trình đạo hàm, vì nó cho biết $q$ giảm bên trái và tăng bên phải $u_{\mathrm{free}}$. Chính thông tin này là cơ sở của phần (b) trong Mệnh đề 01.2, nơi có ràng buộc.

**Trong học máy.** Hàm $\operatorname{clip}$ trong (2.3) là phép chiếu lên một đoạn. Nó xuất hiện khi một đại lượng của mô hình bị giới hạn trong một khoảng. Xác suất ước lượng được cắt về một đoạn $[\epsilon,1-\epsilon]$ trước khi lấy logarit trong mất mát entropy chéo. Trọng số của bộ phân biệt trong mạng đối sinh Wasserstein (WGAN) được cắt về $[-c,c]$ sau mỗi bước cập nhật.

Theo Mệnh đề 01.2, phép cắt cho đúng nghiệm khi mục tiêu là bậc hai một biến. Tuy nhiên, như phần Phạm vi của mệnh đề đã nêu, với nhiều tham số liên kết, cắt cực tiểu không ràng buộc không thay được việc giải bài toán có ràng buộc. Tình huống 01.2 giải một bài toán có ràng buộc trên đơn hình bằng điều kiện (7.3).

::: example Ví dụ 01.1 (Bộ số chuẩn của trường hợp điều khiển)
**Dữ kiện.** Bài toán điều khiển một bước (Định nghĩa 01.1) cực tiểu $q(u)=(x_0+u-t)^2+\lambda u^2$ trên $C=[-u_{\max},u_{\max}]$, với trạng thái mới $x_1=x_0+u$. Mệnh đề 01.2 cho cực tiểu không ràng buộc $u_{\mathrm{free}}=\frac{t-x_0}{1+\lambda}$ (2.2), nghiệm $u^*=\operatorname{clip}(u_{\mathrm{free}},[-u_{\max},u_{\max}])$ (2.3) và dạng bù bình phương $q(u)=(1+\lambda)(u-u_{\mathrm{free}})^2+\frac{\lambda(t-x_0)^2}{1+\lambda}$ (2.4).

**Lập mô hình.** Cho $x_0=0$, $t=3$, $\lambda=1/2$ và $u_{\max}=1$. Thay vào Định nghĩa 01.1:

$$
q(u)=(u-3)^2+\tfrac12u^2=\tfrac32u^2-6u+9,\qquad C=[-1,1].
$$

**Tính.** Theo (2.2), $u_{\mathrm{free}}=(3-0)/(1+1/2)=2$, với $q(2)=6-12+9=3$. Vì $2>u_{\max}=1$, quy tắc cắt (2.3) cho $u^*=1$. Giá trị tối ưu và trạng thái mới là

$$
q(1)=\tfrac32-6+9=\tfrac92,\qquad x_1=0+1=1.
$$

**Kiểm tra lại.** Theo (2.4), $q(1)=\tfrac32(1-2)^2+\tfrac{(1/2)\cdot9}{3/2}=\tfrac32+3=\tfrac92$, khớp với phép thế trực tiếp. So với hai điểm khả thi khác: $q(0)=9$ và $q(-1)=\tfrac32+6+9=\tfrac{33}2$, đều lớn hơn $\tfrac92$.
:::

![Đồ thị parabol q(u) bằng ba phần hai u bình phương trừ sáu u cộng chín. Dải tô từ u bằng âm một đến u bằng một là miền khả thi C. Điểm rỗng tại u bằng hai, giá trị ba, nằm ngoài dải: đó là cực tiểu không ràng buộc. Điểm kín tại u bằng một, giá trị chín phần hai, nằm trên biên phải của dải: đó là nghiệm có ràng buộc.](img/lec-01/d03-cost-parabola-feasible.svg)

Hình trên đặt kết quả của Ví dụ 01.1 lên đồ thị. Do đỉnh của parabol tại $u=2$ nằm bên phải dải khả thi, $q$ giảm trên toàn bộ dải, nên giá trị nhỏ nhất trên dải đạt tại đầu mút phải.

Ràng buộc làm giá trị tối ưu tăng từ $3$ lên $\tfrac92$. Chiều thay đổi này luôn không giảm, vì cực tiểu trên một tập con không thể nhỏ hơn cực tiểu trên tập chứa nó. Mệnh đề 01.16 ở Mục 5 phát biểu và chứng minh điều này cho bài toán tổng quát.

::: remark Nhận xét 01.3 (Đạo hàm khác không tại nghiệm biên)
Tại nghiệm $u^*=1$ của Ví dụ 01.1, $q'(1)=3\cdot1-6=-3\ne0$. Điều này không mâu thuẫn với tính tối ưu. Điểm $u=1$ là đầu mút phải của $C$, nên mọi điểm khả thi khác có dạng $1+\Delta$ với $\Delta\in[-2,0)$: chỉ dịch chuyển sang trái là được phép. Phép tính chính xác cho

$$
q(1+\Delta)-q(1)=\tfrac32(1+\Delta)^2-6(1+\Delta)+9-\tfrac92=-3\Delta+\tfrac32\Delta^2 .
$$

Với $\Delta<0$, cả hai số hạng $-3\Delta$ và $\tfrac32\Delta^2$ đều dương, nên $q(u)>q(1)$ với mọi $u\in C$ khác $1$.

Phương trình $q'(u)=0$ xuất phát từ yêu cầu không có hướng giảm nào khi được dịch chuyển theo cả hai chiều, điều chỉ đúng tại điểm trong của miền. Tại biên, điều kiện thay thế là $q'(u^*)\,\Delta\ge0$ với mọi dịch chuyển khả thi $\Delta$. Điều kiện này cần cho cực tiểu. Ở đây $q'(1)\Delta=-3\Delta\ge0$ khi $\Delta\le0$.

Hai lỗi thường gặp là báo cáo $u=2$ làm nghiệm, trong khi điểm này không khả thi, và kết luận bài toán vô nghiệm vì $q'$ không triệt tiêu trên $C$.

Khi $q$ lồi, điều kiện này cũng đủ: Hệ quả 01.27 ở Mục 7 tổng quát nó thành điều kiện $\nabla f(x^*)^T(x-x^*)\ge0$, đủ cho tối ưu với hàm lồi khả vi.
:::

::: example Ví dụ 01.2 (Ảnh hưởng của trọng số năng lượng)
**Dữ kiện.** Với $x_0=0$, $t=3$, $u_{\max}=1$ (Ví dụ 01.1), hàm chi phí của Định nghĩa 01.1 là $q(u)=(u-3)^2+\lambda u^2$ trên $C=[-1,1]$, với $q'(u)=2(u-3)+2\lambda u$. Cực tiểu không ràng buộc là $u_{\mathrm{free}}=\frac3{1+\lambda}$ (2.2), nghiệm là $u^*=\operatorname{clip}(u_{\mathrm{free}},[-1,1])$ (2.3), và $q(u)=(1+\lambda)(u-u_{\mathrm{free}})^2+\frac{9\lambda}{1+\lambda}$ (2.4).

Giữ các dữ kiện trên và thay đổi $\lambda$. Khi đó $u_{\mathrm{free}}\le1$ khi và chỉ khi $\lambda\ge2$.

| $\lambda$ | $u_{\mathrm{free}}$ | $u^*$ | $q(u^*)$ | $q'(u^*)$ | Vị trí nghiệm |
|---:|---:|---:|---:|---:|---|
| $0$ | $3$ | $1$ | $4$ | $-4$ | biên phải, ràng buộc chặn |
| $1/2$ | $2$ | $1$ | $9/2$ | $-3$ | biên phải, ràng buộc chặn |
| $2$ | $1$ | $1$ | $6$ | $0$ | biên phải, ràng buộc vừa đạt dấu bằng |
| $5$ | $1/2$ | $1/2$ | $15/2$ | $0$ | điểm trong |

**Tính.** Các giá trị được tính như sau.

- Với $\lambda=0$: $q(1)=(1-3)^2=4$, $q'(1)=2(1-3)=-4$.
- Với $\lambda=2$: $q(1)=4+2=6$, $q'(1)=2(1-3)+4\cdot1=0$.
- Với $\lambda=5$: $q(1/2)=(1/2-3)^2+5/4=25/4+5/4=15/2$, $q'(1/2)=2(1/2-3)+10\cdot\tfrac12=0$.

**Kiểm tra lại.** Với $\lambda=2$ và $\lambda=5$, nghiệm trùng $u_{\mathrm{free}}$, nên theo (2.4) giá trị tối ưu bằng $\lambda(t-x_0)^2/(1+\lambda)$: $2\cdot9/3=6$ và $5\cdot9/6=15/2$, khớp với bảng. Khi $\lambda$ tăng, tác động tối ưu không tăng, đúng với vai trò phạt năng lượng của $\lambda$.
:::

Bảng của Ví dụ 01.2 cho thấy nghiệm nằm trên biên không đồng nghĩa với đạo hàm khác không, vì tại $\lambda=2$ nghiệm nằm ở biên mà $q'(u^*)=0$. Ràng buộc có hiệu lực (làm thay đổi nghiệm) khi và chỉ khi $u_{\mathrm{free}}\notin C$, tức $\lambda<2$ với bộ số này.

::: exercise Bài tập 01.1
**Dữ kiện.** Bài toán điều khiển một bước (Định nghĩa 01.1): chọn $u\in C=[-u_{\max},u_{\max}]$ cực tiểu $q(u)=(x_0+u-t)^2+\lambda u^2$; trạng thái mới là $x_1=x_0+u$. Mệnh đề 01.2 cho $u_{\mathrm{free}}=\frac{t-x_0}{1+\lambda}$ (2.2), $u^*=\operatorname{clip}(u_{\mathrm{free}},[-u_{\max},u_{\max}])$ (2.3) và $q(u)=(1+\lambda)(u-u_{\mathrm{free}})^2+\frac{\lambda(t-x_0)^2}{1+\lambda}$ (2.4).

Cho $x_0=1$, $t=-2$ và $\lambda=1$ trong Định nghĩa 01.1.

(a) Với $u_{\max}=2$, tính $u_{\mathrm{free}}$, $u^*$, $x_1$ và $q(u^*)$.

(b) Với $u_{\max}=1$, tính lại các đại lượng đó và kiểm tra điều kiện $q'(u^*)\Delta\ge0$ cho mọi dịch chuyển khả thi $\Delta$.

(c) Tìm giá trị nhỏ nhất của $u_{\max}$ để ràng buộc không làm thay đổi nghiệm.
:::

::: hint
Dùng (2.2) để tính $u_{\mathrm{free}}=(t-x_0)/(1+\lambda)$, rồi so $u_{\mathrm{free}}$ với hai đầu mút. Ở câu (b), xác định chiều dịch chuyển được phép từ đầu mút.
:::

::: solution
**(a)** $u_{\mathrm{free}}=(-2-1)/2=-\tfrac32\in[-2,2]$, nên $u^*=-\tfrac32$ và $x_1=1-\tfrac32=-\tfrac12$. Giá trị tối ưu là

$$
q(-\tfrac32)=(-\tfrac12+2)^2+\tfrac94=\tfrac94+\tfrac94=\tfrac92 .
$$

Kiểm tra bằng (2.4): $\lambda(t-x_0)^2/(1+\lambda)=9/2$.

**(b) Tính nghiệm.** Với $u_{\max}=1$, $u_{\mathrm{free}}=-\tfrac32<-1$, nên $u^*=-1$ và $x_1=0$. Giá trị $q(-1)=(1-1+2)^2+1=5$. Theo (2.4), $2(-1+\tfrac32)^2+\tfrac92=\tfrac12+\tfrac92=5$.

**(b) Kiểm tra điều kiện biên.** Đạo hàm $q'(u)=2(x_0+u-t)+2\lambda u$ cho $q'(-1)=2\cdot2-2=2$. Từ đầu mút trái chỉ được dịch sang phải, $\Delta\in(0,2]$, nên $q'(-1)\Delta=2\Delta>0$. Không có dịch chuyển khả thi nào làm $q$ giảm theo xấp xỉ bậc nhất. Phép tính chính xác bằng (2.4) xác nhận điều này:

$$
q(-1+\Delta)-q(-1)=2(\Delta+\tfrac12)^2+\tfrac92-5=2\Delta^2+2\Delta>0
$$

với mọi $\Delta\in(0,2]$.

**(c)** Ràng buộc không đổi nghiệm khi $u_{\mathrm{free}}\in[-u_{\max},u_{\max}]$, tức $u_{\max}\ge\tfrac32$. Giá trị nhỏ nhất là $u_{\max}=\tfrac32$.
:::

Xuất phát từ mô hình của Định nghĩa 01.1, phép bù bình phương (2.4) cho nghiệm chính xác của trường hợp điều khiển với mọi bộ dữ kiện: nghiệm tồn tại, duy nhất và cho bởi quy tắc cắt (2.3) (Mệnh đề 01.2). Ví dụ 01.1 áp dụng Mệnh đề 01.2 cho bộ số chuẩn. Nhận xét 01.3 giải thích vì sao đạo hàm khác không tại nghiệm biên, tức phương trình $q'(u)=0$ không mô tả được nghiệm có ràng buộc.

Tuy nhiên, lập luận trên dựa hoàn toàn vào phép bù bình phương (2.4), vốn chỉ có cho hàm bậc hai, và vào việc biến chỉ có một chiều. Tính tối ưu tại biên mới được kiểm tra bằng tính toán trực tiếp cho một bộ số (Nhận xét 01.3), chưa có tiêu chuẩn chung. Trong Mục 3, chúng ta chuyển sang bài toán nhiều biến, không ràng buộc, nơi phép bù bình phương được thay bằng một đẳng thức khai triển cho hàm bậc hai nhiều biến. Ở đó xuất hiện một hiện tượng mới là nghiệm có thể không duy nhất.

## 3. Hồi quy tuyến tính

Bài toán của mục này có nhiều biến và được lập từ dữ liệu quan sát. Xét năm người có cân nặng và chiều cao như trong bảng dưới (số liệu minh họa tự tạo, không phải kết quả đo).

| Cân nặng $m_i$ (kg) | 50 | 55 | 60 | 65 | 70 |
|---:|---:|---:|---:|---:|---:|
| Chiều cao $h_i$ (cm) | 158 | 162 | 164 | 169 | 172 |

Chúng ta cần một quy tắc dự đoán chiều cao từ cân nặng. Giả thuyết đơn giản nhất là chiều cao dự đoán $\widehat h_i$ phụ thuộc tuyến tính vào cân nặng, $\widehat h_i=b+am_i$, với hệ số chặn $b$ (cm) và hệ số góc $a$ (cm/kg). Mỗi cặp $(b,a)$ cho một đường thẳng, và không đường thẳng nào đi qua cả năm điểm. Đầu tiên, chúng ta chọn một đại lượng đo độ khớp và lập bài toán bình phương nhỏ nhất cho số đặc trưng tùy ý, sau đó chứng minh bài toán luôn có nghiệm và xác định chính xác khi nào nghiệm duy nhất.

### 3.1 Phần dư và độ khớp của đường thẳng

![Năm điểm dữ liệu cân nặng – chiều cao: (50; 158), (55; 162), (60; 164), (65; 169), (70; 172). Đường thẳng h mũ bằng 123 cộng 0,7 lần cân nặng đi qua vùng dữ liệu. Hình tròn là quan sát, hình vuông là dự đoán trên đường thẳng; ba đoạn nét đứt thẳng đứng tại 55, 60 và 65 ki-lô-gam biểu diễn phần dư.](img/lec-01/height-weight-regression.svg)

Hình trên minh họa năm quan sát và một đường thẳng ứng viên $\widehat h=123+0{,}7m$. Tại mỗi cân nặng, đoạn thẳng đứng nối quan sát với dự đoán, và độ dài có dấu của đoạn này, dự đoán trừ quan sát, được gọi là phần dư. Tại $m=50$ và $m=70$, phần dư bằng $0$. Tại $m=55$, $60$, $65$, phần dư lần lượt là $-0{,}5$, $1$, $-0{,}5$.

Một đường thẳng khớp dữ liệu cần làm đồng thời cả năm phần dư nhỏ. Về mặt ý tưởng, ta gộp các phần dư thành một số không âm và chọn đường thẳng có số đó nhỏ nhất. Để thành một bài toán chính xác, ý tưởng này còn cần chỉ rõ các phần dư được gộp bằng phép toán nào.

Tổng các phần dư không dùng được, vì phần dư âm và dương triệt tiêu nhau. Tổng bình phương thì loại được dấu và cho một hàm khả vi của tham số, nên chúng ta chọn cách gộp này.

### 3.2 Ma trận thiết kế và bài toán bình phương nhỏ nhất

Để cho gọn, ta viết giả thuyết $\widehat h_i=b+am_i$ thành tích vô hướng. Đặt hàng đặc trưng $x_i^T=[1\ \ m_i]$ và vector tham số $w=(b,a)^T$. Khi đó $x_i^Tw=1\cdot b+m_i\cdot a=\widehat h_i$.

Thành phần hằng $1$ đưa hệ số chặn vào cùng vector tham số. Cách viết này giữ nguyên dạng khi có thêm đặc trưng, chẳng hạn tuổi hoặc chiều cao của cha mẹ, vì mỗi đặc trưng chỉ thêm một cột. Bài toán tổng quát với $n$ mẫu và $d$ đặc trưng được phát biểu theo định nghĩa sau.

::: definition Định nghĩa 01.4 (Ma trận thiết kế và bài toán bình phương nhỏ nhất)
Cho $n$ mẫu, mỗi mẫu có vector đặc trưng $x_i\in\mathbb R^d$ và đầu ra quan sát $y_i\in\mathbb R$, $i=1,\ldots,n$. Ma trận thiết kế $X\in\mathbb R^{n\times d}$ có hàng thứ $i$ là $x_i^T$, và $y=(y_1,\ldots,y_n)^T\in\mathbb R^n$. Với vector tham số $w\in\mathbb R^d$, vector dự đoán là $\widehat y=Xw\in\mathbb R^n$ và vector phần dư là $Xw-y$. Bài toán bình phương nhỏ nhất là

$$
\underset{w\in\mathbb R^d}{\operatorname{minimize}}\quad J(w)\triangleq\lVert Xw-y\rVert_2^2=\sum_{i=1}^{n}\bigl(x_i^Tw-y_i\bigr)^2 .
\tag{3.1}
$$
:::

Trong Định nghĩa 01.4, hàng $i$ của $X$ chứa các đặc trưng của mẫu thứ $i$, còn cột $j$ chứa giá trị của đặc trưng thứ $j$ trên cả $n$ mẫu. Phép nhân $Xw$ gom $n$ dự đoán $x_i^Tw$ vào một phép toán. Kích thước khớp vì $(n\times d)(d\times1)$ cho $n\times1$. Với dữ liệu cân nặng, $n=5$, $d=2$, cột đầu của $X$ toàn số $1$ và $y=(158,162,164,169,172)^T$.

Ký hiệu $\triangleq$ đọc là "được định nghĩa bằng". Miền của bài toán là toàn bộ $\mathbb R^d$, tức không có ràng buộc nào trên tham số. Hệ số $w_j$ là lượng thay đổi của dự đoán khi đặc trưng $j$ tăng một đơn vị và các đặc trưng khác giữ nguyên.

Tổng giá trị tuyệt đối $\sum_i\lvert x_i^Tw-y_i\rvert$ là một cách đo sai số khác và cho đường thẳng khác. So với giá trị tuyệt đối, bình phương phạt phần dư lớn mạnh hơn, vì phần dư gấp đôi bị phạt gấp bốn, nên một điểm ngoại lai (outlier) có ảnh hưởng lớn tới nghiệm.

Hàm chi phí $q$ của Định nghĩa 01.1 là trường hợp $d=1$, $n=2$ của (3.1), như ta đã thấy ở Mục 2.2, và hai bài toán chỉ khác nhau ở miền.

![Ba điểm dữ liệu tại đầu vào s bằng 0, 1, 2 với đầu ra 1, 2, 2. Đường hồi quy y mũ bằng bảy phần sáu cộng s chia hai. Ba đoạn nét đứt thẳng đứng là các phần dư một phần sáu, âm một phần ba và một phần sáu theo quy ước dự đoán trừ quan sát; tổng phần dư bằng 0 và tổng bình phương sai số bằng một phần sáu.](img/lec-01/linear-regression-fit.svg)

Hình trên minh họa (3.1) với ba điểm có đầu vào $s=0,1,2$ và đầu ra $1,2,2$. Trên trục hoành của hình và trong Ví dụ 01.4, đầu vào được ký hiệu là $s$ để không trùng với đích $t$ của Mục 2.

Các đoạn nét đứt đo sai lệch theo phương thẳng đứng, tức theo trục đầu ra. Chúng không phải khoảng cách vuông góc từ điểm tới đường thẳng, vì bình phương nhỏ nhất chỉ đo sai số của đầu ra. Ví dụ 01.4 dưới đây tính chính xác đường thẳng trong hình.

### 3.3 Phương trình chuẩn, tồn tại và tập nghiệm

Ở Mục 2, phép bù bình phương cho biết $q$ tăng khi $\lvert u-u_{\mathrm{free}}\rvert$ tăng, và từ đó ta suy ra nghiệm. Với $J$ nhiều biến, công cụ đóng cùng vai trò là khai triển $J(w+v)$ theo độ dịch chuyển $v$, chính xác vì $J$ là hàm bậc hai. Từ khai triển này, ta đọc được gradient, Hessian và điều kiện cực tiểu toàn cục theo mệnh đề sau. Mệnh đề chỉ cần Định nghĩa 01.4 và các phép toán ma trận.

::: proposition Mệnh đề 01.5 (Khai triển của J và phương trình chuẩn)
**Giả thiết.** $X\in\mathbb R^{n\times d}$, $y\in\mathbb R^n$ và $J$ như trong (3.1).

**Kết luận.** (a) Với mọi $w,v\in\mathbb R^d$,

$$
J(w+v)=J(w)+2v^TX^T(Xw-y)+\lVert Xv\rVert_2^2 .
\tag{3.2}
$$

(b) $J$ khả vi hai lần với $\nabla J(w)=2X^T(Xw-y)$ và $\nabla^2J(w)=2X^TX$.

(c) Một vector $w^*$ là điểm cực tiểu toàn cục của $J$ trên $\mathbb R^d$ khi và chỉ khi nó thỏa phương trình chuẩn

$$
X^TXw^*=X^Ty .
\tag{3.3}
$$

**Điều kiện áp dụng.** Mọi $X$ và $y$; không cần giả thiết về hạng.

**Phạm vi.** Đẳng thức (3.2) dùng tính bậc hai của $J$; với hàm mục tiêu không phải bậc hai, không có đẳng thức chính xác tương tự.
:::

::: proof Chứng minh Mệnh đề 01.5
**Bước 1 (phần (a): khai triển).** Đặt $r=Xw-y$. Khi đó $X(w+v)-y=r+Xv$, và khai triển bình phương chuẩn, ta có

$$
\begin{aligned}
\lVert r+Xv\rVert_2^2&=r^Tr+2(Xv)^Tr+(Xv)^T(Xv)\\
&=J(w)+2v^TX^Tr+\lVert Xv\rVert_2^2,
\end{aligned}
$$

trong đó dòng thứ hai dùng $(Xv)^Tr=v^TX^Tr$.

**Bước 2 (phần (b): gradient và Hessian).** Trong (3.2), hạng $2v^TX^T(Xw-y)$ tuyến tính theo $v$. Hạng dư thỏa

$$
0\le\lVert Xv\rVert_2^2\le\lVert X\rVert_F^2\lVert v\rVert_2^2
$$

theo bất đẳng thức Cauchy–Schwarz áp dụng cho từng hàng, với $\lVert X\rVert_F$ là chuẩn Frobenius của $X$ (Bài 00, mục "Chuẩn ma trận"). Do đó hạng dư chia cho $\lVert v\rVert_2$ dần tới $0$ khi $v\to0$. Theo định nghĩa khả vi (Bài 00, mục "Khả vi của hàm nhiều biến"), $\nabla J(w)=2X^T(Xw-y)$. Ánh xạ $w\mapsto2X^TXw-2X^Ty$ là affine với ma trận $2X^TX$, nên $\nabla^2J(w)=2X^TX$.

**Bước 3 (phần (c), chiều đủ).** Nếu $w^*$ thỏa (3.3) thì $X^T(Xw^*-y)=0$. Thay $w=w^*$ vào (3.2), ta có

$$
J(w^*+v)=J(w^*)+\lVert Xv\rVert_2^2\ge J(w^*)
$$

với mọi $v$.

**Bước 4 (phần (c), chiều cần).** Giả sử $w^*$ là điểm cực tiểu toàn cục và đặt $g=X^T(Xw^*-y)$. Với mọi $v$ và mọi số thực $s$, thay $w=w^*$ và thay $v$ bởi $sv$ vào (3.2), ta có

$$
0\le J(w^*+sv)-J(w^*)=2s\,v^Tg+s^2\lVert Xv\rVert_2^2 .
$$

- Chia cho $s>0$ rồi cho $s\to0^+$, ta được $v^Tg\ge0$.
- Chia cho $s<0$ rồi cho $s\to0^-$, ta được $v^Tg\le0$.

Suy ra $v^Tg=0$ với mọi $v$. Chọn $v=g$, ta được $\lVert g\rVert_2^2=0$, tức $g=0$, đó là (3.3). $\square$
:::

Mệnh đề 01.5 cho thấy với bình phương nhỏ nhất, điều kiện gradient bằng không vừa cần vừa đủ cho cực tiểu toàn cục, trong khi ở Bài 00 điều kiện này mới chỉ là điều kiện cần.

Phần (c) mạnh hơn kết quả của Bài 00 do dùng thêm cấu trúc bậc hai của $J$ qua (3.2). Phạm vi áp dụng của nó vì thế hẹp, do chứng minh không dùng được cho hàm mất mát khác. Mệnh đề này chưa cho biết phương trình (3.3) có nghiệm hay không và có bao nhiêu nghiệm, nên chúng ta cần mệnh đề sau.

::: proposition Mệnh đề 01.6 (Tồn tại và tập nghiệm của bình phương nhỏ nhất)
**Giả thiết.** $X\in\mathbb R^{n\times d}$ và $y\in\mathbb R^n$ tùy ý.

**Kết luận.**

- (a) Phương trình chuẩn (3.3) luôn có ít nhất một nghiệm; do đó $J$ đạt giá trị nhỏ nhất trên $\mathbb R^d$.
- (b) Nếu $w^*$ là một nghiệm thì tập nghiệm của (3.1) là $S^*=\{w^*+v\mid v\in\ker X\}$, và mọi nghiệm cho cùng vector dự đoán $Xw^*$.
- (c) Nghiệm duy nhất khi và chỉ khi $\operatorname{rank}X=d$; khi đó $w^*=(X^TX)^{-1}X^Ty$.

**Điều kiện áp dụng.** Không cần giả thiết gì thêm. Điều kiện $\operatorname{rank}X=d$ đòi hỏi $n\ge d$.

**Phạm vi.** Mệnh đề dành riêng cho mục tiêu (3.1) trên miền $\mathbb R^d$; khi thêm ràng buộc, cần các công cụ của Mục 8.
:::

::: proof Chứng minh Mệnh đề 01.6
**Bước 1 ($\ker(X^TX)=\ker X$).** Nếu $Xv=0$ thì $X^TXv=0$. Ngược lại, nếu $X^TXv=0$ thì $0=v^TX^TXv=\lVert Xv\rVert_2^2$, nên $Xv=0$.

**Bước 2 ($X^Ty$ thuộc không gian cột của $X^TX$; phần (a)).** Dùng đẳng thức $\mathcal R(M)=\ker(M^T)^\perp$, đúng với mọi ma trận $M$ (xem Kiến thức tiên quyết): không gian cột của $M$ là phần bù trực giao của hạt nhân của $M^T$.

- Áp dụng cho $M=X^TX$, vốn đối xứng, và dùng Bước 1: $\mathcal R(X^TX)=(\ker X^TX)^\perp=(\ker X)^\perp$.
- Áp dụng cho $M=X^T$: $\mathcal R(X^T)=(\ker X)^\perp$.

Vậy $\mathcal R(X^TX)=\mathcal R(X^T)$, và $X^Ty\in\mathcal R(X^T)$ nên có $w^*$ với $X^TXw^*=X^Ty$. Theo Mệnh đề 01.5(c), $w^*$ là điểm cực tiểu toàn cục, nên $J$ đạt giá trị nhỏ nhất. Đó là (a).

**Bước 3 (tập nghiệm; phần (b)).** Theo Mệnh đề 01.5(c), $w$ là nghiệm khi và chỉ khi $X^TXw=X^Ty=X^TXw^*$, tức $X^TX(w-w^*)=0$, và theo Bước 1, tức $X(w-w^*)=0$. Vậy $w-w^*\in\ker X$, và $Xw=Xw^*$. Đó là (b).

**Bước 4 (tính duy nhất; phần (c)).** Theo (b), $S^*$ có đúng một phần tử khi và chỉ khi $\ker X=\{0\}$, tức $\operatorname{rank}X=d$. Khi đó $X^TX\succ0$ (Bài 00, mục "Dạng toàn phương") nên khả nghịch, và (3.3) cho $w^*=(X^TX)^{-1}X^Ty$. Đó là (c). $\square$
:::

Về mặt hình học, Mệnh đề 01.6 có cách đọc như sau. Tập các vector dự đoán đạt được là không gian cột $\mathcal R(X)$, một không gian con của $\mathbb R^n$. Cực tiểu $\lVert Xw-y\rVert_2$ là tìm điểm của $\mathcal R(X)$ gần $y$ nhất, tức hình chiếu trực giao $\widehat y$ của $y$. Điểm này luôn tồn tại và duy nhất.

Tham số $w$ chỉ là tọa độ của $\widehat y$ theo các cột của $X$. Tọa độ đó duy nhất khi các cột độc lập tuyến tính, và có vô số lựa chọn khi các cột phụ thuộc tuyến tính.

Như vậy, (a) nói về sự tồn tại của dự đoán tốt nhất, còn (c) nói về khả năng xác định tham số từ dữ liệu. Hai kết luận này cần hai giả thiết khác nhau, vì (a) không cần giả thiết nào về $X$, còn (c) cần hạng cột đầy đủ.

**Trong học máy.** Trong hồi quy tuyến tính, $X$ là bảng đặc trưng của tập huấn luyện, $w$ là tham số mô hình và $J$ là tổng bình phương sai số huấn luyện. Mệnh đề 01.6(a) bảo đảm bài toán huấn luyện luôn có nghiệm, bất kể dữ liệu.

Tuy nhiên, giả thiết hạng cột đầy đủ của (c) thường bị vi phạm trong thực tế. Ví dụ điển hình là mã hóa một nóng (one-hot) một đặc trưng phân loại có $k$ giá trị bằng $k$ cột nhị phân, trong khi $X$ đã có cột hệ số chặn. Tổng $k$ cột nhị phân bằng cột toàn số $1$, nên $\ker X\ne\{0\}$ và tham số không duy nhất, dù dự đoán vẫn duy nhất.

Hậu quả quan sát được là các hệ số mô hình thay đổi lớn giữa các lần huấn luyện mà sai số không đổi, nên không thể đọc hệ số như mức ảnh hưởng của đặc trưng.

Có hai cách khắc phục: bỏ một cột, hoặc chính quy hóa, tức cộng vào hàm mục tiêu một số hạng phạt độ lớn của tham số như $\mu\lVert w\rVert_2^2$ với $\mu>0$. Chính quy hóa bậc hai được định nghĩa ở Mục 8 (Định nghĩa 01.42), và Ví dụ 01.15 chứng nhận cách thứ hai.

::: example Ví dụ 01.3 (Đường hồi quy cho dữ liệu cân nặng – chiều cao)
**Dữ kiện.** Năm người ở bảng đầu Mục 3 có cân nặng $m_1,\ldots,m_5$ lần lượt là $50,55,60,65,70$ (kg) và chiều cao $h_1,\ldots,h_5$ lần lượt là $158,162,164,169,172$ (cm). Mô hình là $\widehat h_i=b+am_i$: ma trận thiết kế $X$ có hàng $x_i^T=[1\ \ m_i]$, $y=h$, $w=(b,a)^T$ và $J(w)=\lVert Xw-y\rVert_2^2$ (3.1). Nghiệm thỏa phương trình chuẩn $X^TXw^*=X^Ty$ (3.3) và duy nhất khi $\operatorname{rank}X=2$ (Mệnh đề 01.6(c)).

**Lập mô hình.** Với $x_i^T=[1\ \ m_i]$, các tổng cần dùng là

$$
\begin{aligned}
\textstyle\sum m_i&=300,\\
\textstyle\sum m_i^2&=2500+3025+3600+4225+4900=18250,\\
\textstyle\sum h_i&=825,\\
\textstyle\sum m_ih_i&=7900+8910+9840+10985+12040=49675.
\end{aligned}
$$

Phương trình chuẩn (3.3) là

$$
\begin{bmatrix}5&300\\300&18250\end{bmatrix}\begin{bmatrix}b\\a\end{bmatrix}=\begin{bmatrix}825\\49675\end{bmatrix}.
$$

**Tính.** Định thức bằng $5\cdot18250-300^2=1250>0$, nên ma trận khả nghịch và theo Mệnh đề 01.6(c) nghiệm duy nhất:

$$
\begin{aligned}
\begin{bmatrix}b^*\\a^*\end{bmatrix}&=\frac1{1250}\begin{bmatrix}18250&-300\\-300&5\end{bmatrix}\begin{bmatrix}825\\49675\end{bmatrix}\\
&=\frac1{1250}\begin{bmatrix}153750\\875\end{bmatrix}\\
&=\begin{bmatrix}123\\0{,}7\end{bmatrix}.
\end{aligned}
$$

Dự đoán tại $m=50,55,60,65,70$ là $158;\ 161{,}5;\ 165;\ 168{,}5;\ 172$. Phần dư (dự đoán trừ quan sát) là $0;\ -0{,}5;\ 1;\ -0{,}5;\ 0$, và $J(w^*)=0{,}25+1+0{,}25=1{,}5$.

**Diễn giải.** Hệ số góc $a^*=0{,}7$ nghĩa là mỗi ki-lô-gam tăng thêm làm chiều cao dự đoán tăng $0{,}7$ cm.

**Kiểm tra lại.** Phương trình chuẩn tương đương với $X^T(Xw^*-y)=0$.

- Hàng thứ nhất: tổng phần dư $0-0{,}5+1-0{,}5+0=0$.
- Hàng thứ hai: $50\cdot0+55\cdot(-0{,}5)+60\cdot1+65\cdot(-0{,}5)+70\cdot0=-27{,}5+60-32{,}5=0$.

Công thức quen thuộc của hồi quy một biến cho cùng kết quả. Với $\bar m=60$, $\bar h=165$,

$$
a^*=\frac{\sum(m_i-\bar m)(h_i-\bar h)}{\sum(m_i-\bar m)^2}=\frac{175}{250}=0{,}7,\qquad b^*=\bar h-a^*\bar m=123 .
$$
:::

::: example Ví dụ 01.4 (Ba điểm dữ liệu)
**Lập mô hình.** Cho

$$
X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix},\qquad y=\begin{bmatrix}1\\2\\2\end{bmatrix}.
$$

Hàng $i$ của $X$ là $(1,s_i)$ với đầu vào $s_i\in\{0,1,2\}$, và $w=(b,a)^T$ nên $\widehat y_i=b+as_i$.

**Tính.** Ta có $X^TX=\begin{bmatrix}3&3\\3&5\end{bmatrix}$ và $X^Ty=(1+2+2,\ 0+2+4)^T=(5,6)^T$. Định thức bằng $15-9=6>0$, nên

$$
w^*=\frac16\begin{bmatrix}5&-3\\-3&3\end{bmatrix}\begin{bmatrix}5\\6\end{bmatrix}=\frac16\begin{bmatrix}7\\3\end{bmatrix}=\begin{bmatrix}7/6\\1/2\end{bmatrix}.
$$

Dự đoán, phần dư và giá trị tối ưu là

$$
\begin{aligned}
Xw^*&=(7/6,\ 5/3,\ 13/6)^T,\\
Xw^*-y&=(1/6,\ -1/3,\ 1/6)^T,\\
J(w^*)&=\tfrac1{36}+\tfrac4{36}+\tfrac1{36}=\tfrac16 .
\end{aligned}
$$

**Diễn giải.** Hệ số chặn $b^*=7/6$ là dự đoán tại đầu vào $0$. Hệ số góc $a^*=1/2$ là mức tăng của dự đoán khi đầu vào tăng một đơn vị.

**Kiểm tra lại.** $X^T(Xw^*-y)=(\tfrac16-\tfrac13+\tfrac16,\ 0-\tfrac13+\tfrac26)^T=(0,0)^T$, đúng phương trình chuẩn.
:::

::: example Ví dụ 01.5 (Hai cột trùng nhau)
**Dữ kiện.** Ví dụ 01.4 có $X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix}$, $y=(1,2,2)^T$, $J(w)=\lVert Xw-y\rVert_2^2$, nghiệm $w^*=(7/6,1/2)^T$, dự đoán $Xw^*=(7/6,5/3,13/6)^T$ và $J(w^*)=\tfrac16$. Mệnh đề 01.6(b): nếu $w^*$ là một nghiệm thì tập nghiệm là $\{w^*+v\mid v\in\ker X\}$, và mọi nghiệm cho cùng dự đoán.

**Lập mô hình.** Thêm vào $X$ của Ví dụ 01.4 một cột thứ ba trùng cột thứ hai:

$$
X'=\begin{bmatrix}1&0&0\\1&1&1\\1&2&2\end{bmatrix},\qquad w'=(b,a_1,a_2)^T .
$$

**Hạt nhân.** Dự đoán $X'w'=b\mathbf 1+(a_1+a_2)(0,1,2)^T$ chỉ phụ thuộc vào tổng $a_1+a_2$. Vector $v=(0,1,-1)^T$ thỏa $X'v=0$, và $\ker X'$ là đường thẳng sinh bởi $v$ vì $\operatorname{rank}X'=2$.

**Tập nghiệm.** Vector $(7/6,1/2,0)^T$ cho cùng dự đoán như $w^*$ của Ví dụ 01.4 nên thỏa phương trình chuẩn của $X'$. Theo Mệnh đề 01.6(b), tập nghiệm là

$$
S^*=\bigl\{(7/6,\ c,\ 1/2-c)^T\mid c\in\mathbb R\bigr\}.
$$

Mọi nghiệm cho cùng dự đoán $(7/6,5/3,13/6)^T$ và cùng giá trị tối ưu $1/6$.

**Kiểm tra lại.** Với $c=1/4$: $X'w'=7/6\cdot\mathbf 1+(1/4+1/4)(0,1,2)^T=(7/6,5/3,13/6)^T$, đúng dự đoán của Ví dụ 01.4.
:::

::: remark Nhận xét 01.7 (Phần dư, thang đo và các nhầm lẫn thường gặp)
Thứ nhất, khi $X$ có một cột toàn số $1$, tổng các phần dư tại nghiệm bằng $0$, vì hàng tương ứng của phương trình chuẩn là $\mathbf 1^T(Xw^*-y)=0$. Mô hình không có hệ số chặn nói chung không có tính chất này.

Thứ hai, so sánh độ lớn các $w_j$ như mức ảnh hưởng chỉ có nghĩa khi các đặc trưng dùng thang đo tương thích. Đổi đơn vị một cột từ kg sang g làm hệ số tương ứng chia cho $1000$ mà dự đoán không đổi.

Thứ ba, công thức $w^*=(X^TX)^{-1}X^Ty$ chỉ hợp lệ khi $\operatorname{rank}X=d$. Khi $X$ không có hạng cột đầy đủ, $X^TX$ suy biến và công thức không xác định, nhưng bài toán vẫn có nghiệm theo Mệnh đề 01.6(a).

Thứ tư, Hessian $2X^TX\succeq0$ không kéo theo nghiệm duy nhất. Ví dụ 01.5 có Hessian nửa xác định dương mà có vô số nghiệm.
:::

::: exercise Bài tập 01.2
Cho ba điểm có đầu vào $-1,0,1$ và đầu ra $2,1,3$, với mô hình $\widehat y=b+as$ theo đầu vào $s$.

(a) Viết $X$ và $y$, tính $X^TX$, $X^Ty$, nghiệm $w^*$ và $J(w^*)$.

(b) Giải thích vì sao $X^TX$ ở đây là ma trận chéo, và nêu điều kiện tổng quát trên các cột của $X$ để điều đó xảy ra.
:::

::: hint
Cột thứ hai của $X$ có tổng bằng $0$. Tích vô hướng của hai cột cho phần tử ngoài đường chéo của $X^TX$.
:::

::: solution
**(a) Lập mô hình.** $X=\begin{bmatrix}1&-1\\1&0\\1&1\end{bmatrix}$, $y=(2,1,3)^T$.

**(a) Tính.** Khi đó $X^TX=\begin{bmatrix}3&0\\0&2\end{bmatrix}$ và $X^Ty=(2+1+3,\ -2+0+3)^T=(6,1)^T$. Phương trình chuẩn tách thành $3b=6$ và $2a=1$, nên $w^*=(2,\ 1/2)^T$. Dự đoán là $(1{,}5;\ 2;\ 2{,}5)$, phần dư là $(-0{,}5;\ 1;\ -0{,}5)$ và $J(w^*)=0{,}25+1+0{,}25=1{,}5$.

**(a) Kiểm tra lại.** Tổng phần dư bằng $0$ và $(-1)(-0{,}5)+0\cdot1+1\cdot(-0{,}5)=0$, đúng $X^T(Xw^*-y)=0$.

**(b)** Phần tử $(1,2)$ của $X^TX$ là tích vô hướng của cột toàn số $1$ với cột đầu vào, tức tổng các đầu vào, bằng $0$. Tổng quát, $X^TX$ là ma trận chéo khi và chỉ khi các cột của $X$ đôi một trực giao.

Với một cột đặc trưng và cột hệ số chặn, điều kiện là cột đặc trưng có tổng bằng $0$, tức đã được quy tâm (trừ đi trung bình). Với nhiều cột đặc trưng, quy tâm từng cột chỉ làm các cột đặc trưng trực giao với cột hệ số chặn. Để $X^TX$ là ma trận chéo, các cột đặc trưng còn phải đôi một trực giao với nhau.
:::

::: exercise Bài tập 01.3
Cho $X\in\mathbb R^{n\times d}$ có cột thứ nhất là $\mathbf 1$, và $w^*$ là một nghiệm bất kỳ của bài toán bình phương nhỏ nhất (3.1), $\min_{w\in\mathbb R^d}J(w)$ với $J(w)=\lVert Xw-y\rVert_2^2$. Chứng minh rằng tổng các phần dư $\sum_i(x_i^Tw^*-y_i)$ bằng $0$, và tổng có trọng số $\sum_i X_{ij}(x_i^Tw^*-y_i)$ bằng $0$ với mọi cột $j$. Kết luận còn đúng không khi $w^*$ không duy nhất.
:::

::: hint
Viết phương trình chuẩn (3.3) dưới dạng $X^T(Xw^*-y)=0$ và đọc từng hàng.
:::

::: solution
**Bước 1 (đọc từng hàng của phương trình chuẩn).** Theo Mệnh đề 01.5(c), mọi nghiệm thỏa $X^T(Xw^*-y)=0$. Thành phần thứ $j$ của vế trái là $\sum_iX_{ij}(x_i^Tw^*-y_i)$, nên mọi tổng có trọng số theo một cột đều bằng $0$. Với $j=1$, $X_{i1}=1$ nên tổng các phần dư bằng $0$.

**Bước 2 (khi nghiệm không duy nhất).** Lập luận chỉ dùng phương trình chuẩn, nên đúng cho mọi nghiệm, kể cả khi nghiệm không duy nhất. Theo Mệnh đề 01.6(b), các nghiệm khác nhau còn có cùng vector phần dư, vì chúng cho cùng dự đoán.
:::

Với mô hình của Định nghĩa 01.4, đẳng thức khai triển (3.2) cho Mệnh đề 01.5, theo đó phương trình chuẩn vừa cần vừa đủ cho cực tiểu toàn cục. Dựa trên đẳng thức $\ker(X^TX)=\ker X$, Mệnh đề 01.6 chứng minh nghiệm luôn tồn tại, còn nghiệm duy nhất khi và chỉ khi $X$ có hạng cột đầy đủ. Ví dụ 01.3 và 01.4 là trường hợp nghiệm duy nhất, Ví dụ 01.5 là trường hợp vô số nghiệm. Hai trường hợp này cho thấy tồn tại (luôn có) và duy nhất (cần hạng cột đầy đủ) là hai kết luận tách bạch.

Các kết quả này đúng với mọi dữ liệu nhưng chỉ cho một hàm mục tiêu, vì bằng chứng tối ưu toàn cục dựa vào đẳng thức (3.2), còn bằng chứng tồn tại dựa vào cấu trúc tuyến tính của phương trình chuẩn. Một hàm mất mát không phải bậc hai không có đẳng thức khai triển chính xác, và gradient của nó không tuyến tính theo tham số. Trong Mục 4, chúng ta xét bài toán phân loại với mất mát logistic, nơi cả hai công cụ này không còn áp dụng được và nghiệm có thể không tồn tại.

## 4. Hồi quy logistic

Một dây chuyền đóng gói cần tách cam tốt khỏi cam xấu bằng camera. Từ ảnh mỗi quả cam, hệ thống đo được hai con số. Chúng ta cần một quy tắc biến hai con số đó thành quyết định "tốt" hoặc "xấu", và quy tắc này phải được học từ các quả cam đã gán nhãn.

Trong mục này, chúng ta lập mô hình hồi quy logistic cho bài toán đó. Chúng ta sẽ thấy một bộ dữ liệu hai mẫu (Ví dụ 01.6) trên đó mất mát tiến về $0$ mà không tham số hữu hạn nào đạt $0$, và một bộ dữ liệu ba mẫu (Ví dụ 01.7) có nghiệm tính được.

### 4.1 Bài toán phân loại cam trên dây chuyền

![Sơ đồ ba bước. Bước một: ba quả cam (tròn, méo, có vết) đi dưới camera trên dây chuyền. Bước hai: trích hai đặc trưng do con người chọn, z1 bằng d max chia d min (tỉ lệ hai kích thước chính) và z2 bằng 100 nhân diện tích vết chia diện tích quả (phần trăm diện tích vết sẫm). Bước ba: mặt phẳng đặc trưng với trục z1 từ 1,0 đến 1,4 và trục z2 từ 0 đến 20 phần trăm; cam tốt (nhãn +1) là hình tròn ở vùng gần gốc, cam xấu (nhãn −1) là hình vuông ở vùng xa; một đường biên quyết định tuyến tính minh họa ngăn hai vùng, vector w vuông góc với biên.](img/lec-01/g00-orange-quality-pipeline.svg)

Hình trên mô tả quy trình từ ảnh tới dữ liệu.

- Đặc trưng thứ nhất $z_1=d_{\max}/d_{\min}$ là tỉ lệ giữa kích thước lớn nhất và nhỏ nhất của quả. Nó luôn không nhỏ hơn $1$ và gần $1$ khi quả tròn đều.
- Đặc trưng thứ hai $z_2=100\,A_{\mathrm{spot}}/A_{\mathrm{fruit}}$ là phần trăm diện tích bề mặt có vết sẫm, trong đó $A_{\mathrm{spot}}$ là diện tích vết và $A_{\mathrm{fruit}}$ là diện tích quả đo trên ảnh. Đặc trưng $z_2$ nằm trong $[0,100]$.
- Nhãn được mã hóa bằng $y=+1$ cho cam tốt và $y=-1$ cho cam xấu, để có thể so dấu của một biểu thức với nhãn.

Việc chọn hai đặc trưng này là một phần của mô hình do con người xây dựng. Các điểm trong hình là dữ liệu minh họa tự tạo, không phải kết quả thực nghiệm.

Trên mặt phẳng $(z_1,z_2)$, cam tốt tập trung gần góc $z_1\approx1$, $z_2\approx0$, còn cam xấu nằm xa góc đó. Bài toán đặt ra là xác định từ dữ liệu một đường thẳng tách hai nhóm, nếu đường thẳng như vậy tồn tại.

### 4.2 Biên tuyến tính và biên có dấu

Thêm thành phần hằng như ở Mục 3, mỗi quả cam $i$ có vector đặc trưng $a_i=(1,z_{i1},z_{i2})^T\in\mathbb R^3$. Một đường thẳng trong mặt phẳng $(z_1,z_2)$ có dạng $w_0+w_1z_1+w_2z_2=0$, tức $a^Tw=0$ với $w=(w_0,w_1,w_2)^T$. Đại lượng $a_i^Tw$ là điểm số (score) của mẫu $i$, và quy tắc phân loại dự đoán nhãn bằng dấu của điểm số. Ký hiệu $a_i$ được dùng thay cho $x_i$ của Mục 3 để phân biệt hai trường hợp.

![Mặt phẳng hai trục a1 và a2 cắt nhau tại gốc. Đường a chuyển vị w bằng 0 đi qua gốc, chia mặt phẳng thành miền a chuyển vị w dương phía trên bên trái, chứa các điểm hình tròn thuộc lớp +1, và miền a chuyển vị w âm phía dưới bên phải, chứa các điểm hình vuông thuộc lớp −1. Vector w xuất phát từ gốc, vuông góc với đường biên và hướng vào miền dương.](img/lec-01/g01-linear-boundary-2d.svg)

Hình trên vẽ một mặt phẳng đặc trưng tổng quát, trong đó nhãn trục $a_1$, $a_2$ là hai tọa độ của một vector đặc trưng $a$, không phải mẫu thứ nhất và mẫu thứ hai.

Đường biên quyết định $a^Tw=0$ vuông góc với $w$. Nửa mặt phẳng mà $w$ chỉ tới có $a^Tw>0$ và được dự đoán là lớp $+1$. Nửa còn lại có $a^Tw<0$ và được dự đoán là lớp $-1$.

Đường biên trong hình đi qua gốc vì hình không có thành phần hằng. Với thành phần hằng như trong bài toán phân loại cam, biên là một đường thẳng bất kỳ trong mặt phẳng $(z_1,z_2)$.

Để gộp hai trường hợp đúng nhãn thành một điều kiện, ta nhân điểm số với nhãn.

- Nếu $y_i=+1$, dự đoán đúng khi $a_i^Tw>0$.
- Nếu $y_i=-1$, dự đoán đúng khi $a_i^Tw<0$.

Cả hai tương đương với $y_ia_i^Tw>0$. Đại lượng $y_ia_i^Tw$ dương và lớn nghĩa là mẫu nằm đúng phía và xa biên.

Về mặt ý tưởng, học $w$ có nghĩa là làm các đại lượng $y_ia_i^Tw$ lớn. Ý tưởng này chỉ trở thành một bài toán cực tiểu chính xác khi có một hàm phạt giảm theo đại lượng đó.

Bình phương nhỏ nhất của Mục 3 áp dụng trực tiếp cho nhãn $\pm1$ không phù hợp với mục đích này. Với $y_i=+1$ và điểm số $a_i^Tw=3$, mẫu được phân loại đúng với độ tin cậy cao, nhưng sai số bình phương $(3-1)^2=4$ vẫn phạt nó. Hàm phạt cần giảm khi biên tăng, kể cả khi biên đã lớn hơn $1$.

### 4.3 Mất mát logistic

Hàm $m\mapsto\log(1+e^{-m})$ là một hàm phạt như vậy (Mệnh đề 01.9(b) chứng minh nó giảm chặt), và bài toán hồi quy logistic được phát biểu theo định nghĩa sau.

::: definition Định nghĩa 01.8 (Biên có dấu, mất mát logistic và bài toán hồi quy logistic)
Cho $n$ mẫu với vector đặc trưng $a_i\in\mathbb R^d$ và nhãn $y_i\in\{-1,+1\}$, $i=1,\ldots,n$. Với vector tham số $w\in\mathbb R^d$, biên có dấu (signed margin) của mẫu $i$ là $m_i=y_ia_i^Tw\in\mathbb R$. Mất mát logistic của một biên $m\in\mathbb R$ là

$$
\ell(m)=\log\bigl(1+e^{-m}\bigr),
$$

và bài toán hồi quy logistic là

$$
\underset{w\in\mathbb R^d}{\operatorname{minimize}}\quad L(w)=\sum_{i=1}^{n}\ell\bigl(y_ia_i^Tw\bigr).
\tag{4.1}
$$
:::

Trong Định nghĩa 01.8, $a_i$ và $y_i$ là dữ kiện, $w$ là biến quyết định, và miền là toàn $\mathbb R^d$ như ở hồi quy tuyến tính. Từ mục này trở đi, $m_i$ là biên có dấu, không còn là cân nặng như ở Mục 3.

Lưu ý rằng chữ "biên" mang ba nghĩa trong chương, được phân biệt bằng từ đi kèm.

- Biên của miền khả thi là tập các điểm của miền không phải điểm trong, như hai đầu mút của đoạn ở Mục 2.
- Biên quyết định là tập $\{a\mid a^Tw=0\}$ các vector đặc trưng có điểm số bằng $0$.
- Biên có dấu $m_i$ là một số gắn với từng mẫu.

Mất mát logistic còn có một cách đọc theo xác suất. Đặt hàm sigmoid $\sigma(s)=1/(1+e^{-s})$, có giá trị trong $(0,1)$ và thỏa $1-\sigma(s)=\sigma(-s)$. Nếu mô hình gán xác suất $P(y=+1\mid a)=\sigma(a^Tw)$ thì $P(y=-1\mid a)=\sigma(-a^Tw)$. Do đó trong cả hai trường hợp $P(y_i\mid a_i)=\sigma(y_ia_i^Tw)$, và $-\log\sigma(m)=\log(1+e^{-m})=\ell(m)$.

Như vậy, $L(w)$ là âm logarit hàm hợp lý của dữ liệu khi các mẫu độc lập, và trong học máy nó còn được gọi là mất mát entropy chéo nhị phân (binary cross-entropy). Trong Bài 00 (mục "Nhiễu Gauss, hàm hợp lý và bình phương nhỏ nhất"), bình phương nhỏ nhất cũng đã được đọc là ước lượng hợp lý cực đại dưới nhiễu Gauss; mất mát logistic là cách đọc tương tự cho nhãn nhị phân.

So với Định nghĩa 01.4, Định nghĩa 01.8 giữ nguyên miền $\mathbb R^d$ và cấu trúc dữ liệu theo hàng, nhưng thay hàm bình phương của phần dư bằng hàm $\ell$ của biên. Hàm $L$ không phải đa thức bậc hai, nên không có đẳng thức khai triển chính xác kiểu (3.2), và gradient của nó không tuyến tính theo $w$. Thay cho hai công cụ đó, chúng ta dùng các tính chất của hàm một biến $\ell$ trong mệnh đề sau.

::: proposition Mệnh đề 01.9 (Tính chất của mất mát logistic)
**Giả thiết.** $\ell(m)=\log(1+e^{-m})$ với $m\in\mathbb R$.

**Kết luận.**

- (a) $\ell(m)>0$ với mọi $m$.
- (b) $\ell'(m)=-1/(1+e^m)\in(-1,0)$, nên $\ell$ giảm chặt.
- (c) $\ell''(m)=e^m/(1+e^m)^2\in(0,\tfrac14]$, với giá trị lớn nhất $\tfrac14$ tại $m=0$, và $\ell''(m)\to0$ khi $\lvert m\rvert\to\infty$.
- (d) $\ell(m)\to0$ khi $m\to+\infty$, và $\ell(m)+m\to0$ khi $m\to-\infty$.

Hệ quả: $L(w)>0$ với mọi $w$, nên $\inf_wL(w)\ge0$.

**Điều kiện áp dụng.** Mọi $m\in\mathbb R$.

**Phạm vi.** Các tính chất nói về $\ell$ như hàm một biến; tính chất của $L$ theo $w$ phụ thuộc thêm vào dữ liệu $(a_i,y_i)$.
:::

::: proof Chứng minh Mệnh đề 01.9
**Bước 1 (phần (a)).** Vì $e^{-m}>0$ nên $1+e^{-m}>1$, và logarit của một số lớn hơn $1$ là số dương.

**Bước 2 (phần (b)).** Theo quy tắc đạo hàm hàm hợp,

$$
\ell'(m)=\dfrac{-e^{-m}}{1+e^{-m}}=-\frac1{e^m+1},
$$

trong đó đẳng thức thứ hai có được khi nhân tử và mẫu với $e^m$. Vì $e^m+1>1$, ta có $-1<\ell'(m)<0$. Đạo hàm âm trên $\mathbb R$ kéo theo $\ell$ giảm chặt.

**Bước 3 (phần (c)).** Đạo hàm của $-(1+e^m)^{-1}$ là $(1+e^m)^{-2}e^m$, dương với mọi $m$. Theo bất đẳng thức giữa trung bình cộng và trung bình nhân, $(1+e^m)^2\ge4e^m$, với dấu bằng khi $e^m=1$, tức $m=0$. Do đó $\ell''(m)\le\tfrac14$. Khi $m\to+\infty$, $\ell''(m)=1/(e^{-m}+2+e^m)\to0$. Khi $m\to-\infty$, cùng biểu thức cũng dần tới $0$.

**Bước 4 (phần (d)).** Khi $m\to+\infty$, $e^{-m}\to0$ và $\log(1+s)\to0$ khi $s\to0$, nên $\ell(m)\to0$. Khi $m\to-\infty$, viết

$$
\ell(m)+m=\log(1+e^{-m})+\log e^m=\log(e^m+1),
$$

và biểu thức này dần tới $\log1=0$.

**Bước 5 (hệ quả).** Mỗi hạng của $L$ dương theo (a), nên tổng dương và $0$ là một cận dưới. $\square$
:::

Mệnh đề trên cho thấy mất mát của một mẫu giảm khi biên tăng và tiến về $0$ khi mẫu được phân loại đúng với biên lớn. Khi mẫu bị phân loại sai với biên âm lớn, mất mát tăng gần như tuyến tính, với hệ số góc gần $1$. Độ cong $\ell''$ dương ở mọi nơi nhưng tiến về $0$ khi $\lvert m\rvert\to\infty$.

Trong Ví dụ 01.6 dưới đây, tính chất $\ell(m)\to0$ khi $m\to+\infty$ (Mệnh đề 01.9(d)) cùng với dữ liệu tách được là điều kiện để mất mát tiến về $0$. Do độ cong tiến về $0$, tính lồi chặt không ngăn được điều đó (Nhận xét 01.43).

**Trong học máy.** Gradient của $L$ theo $w$ là $\nabla L(w)=\sum_i\ell'(m_i)\,y_ia_i$, suy ra từ (b) và quy tắc dây chuyền. Vì $\lvert\ell'(m_i)\rvert$ nhỏ khi $m_i$ lớn, các mẫu đã được phân loại đúng với biên lớn đóng góp ít vào gradient. Các mẫu bị phân loại sai với biên âm lớn đóng góp gần bằng $-y_ia_i$.

Một bước hạ gradient (gradient descent) $w\leftarrow w-\eta\nabla L(w)$ với độ dài bước (step length) $\eta>0$ vì vậy chủ yếu điều chỉnh $w$ theo các mẫu đang bị phân loại sai. Tính chất (c) về độ cong được dùng ở Mục 7 để chứng nhận $L$ lồi.

::: example Ví dụ 01.6 (Dữ liệu tách được tuyến tính, không có nghiệm)
**Lập mô hình.** Xét dữ liệu một chiều, $d=1$, gồm hai mẫu $(a_1,y_1)=(1,+1)$ và $(a_2,y_2)=(-1,-1)$. Hai biên có dấu là $m_1=(+1)(1)w=w$ và $m_2=(-1)(-1)w=w$, nên

$$
L(w)=2\log\bigl(1+e^{-w}\bigr),\qquad L'(w)=-\frac{2}{1+e^w}<0 .
$$

Mọi $w>0$ phân loại đúng cả hai mẫu, nên dữ liệu tách được tuyến tính (linearly separable), tức tách được bằng một biên quyết định tuyến tính.

**Tính.** Một số giá trị (làm tròn bốn chữ số thập phân):

| $w$ | $0$ | $1$ | $2$ | $4$ | $8$ |
|---:|---:|---:|---:|---:|---:|
| $L(w)$ | $1{,}3863$ | $0{,}6265$ | $0{,}2539$ | $0{,}0363$ | $0{,}0007$ |

**Kết luận.** Vì $L'<0$ trên $\mathbb R$, $L$ giảm chặt. Theo Mệnh đề 01.9(d), $L(w)\to0$ khi $w\to+\infty$. Theo Mệnh đề 01.9(a), $L(w)>0$ với mọi $w$ hữu hạn. Do đó $\inf_{w\in\mathbb R}L(w)=0$, nhưng không có $w$ nào đạt giá trị $0$, và bài toán (4.1) không có nghiệm.

**Kiểm tra lại.** $L(0)=2\log2=2\cdot0{,}6931=1{,}3863$. Với $w$ lớn, $\log(1+s)\approx s$ khi $s$ nhỏ, nên $L(w)\approx2e^{-w}$. Tại $w=4$, $2e^{-4}=0{,}0366$, gần với $0{,}0363$ trong bảng.
:::

![Hình gồm hai phần. Phần trái: trục a với mẫu lớp +1 (hình tròn) tại a bằng 1 và mẫu lớp −1 (hình vuông) tại a bằng −1; cả hai biên có dấu bằng w, nên tăng w làm cả hai biên cùng tăng. Phần phải: đồ thị L(w) bằng 2 log(1 + e mũ âm w) theo w từ 0 đến khoảng 4, giảm dần và tiến sát đường nằm ngang L bằng 0 mà không đạt tới. Hai khung ghi: cận dưới đúng của L bằng 0 và có thể tiến gần tùy ý; giá trị nhỏ nhất không tồn tại vì không có w hữu hạn nào cho L(w) bằng 0.](img/lec-01/logistic-loss-convex-case.svg)

Hình trên thể hiện Ví dụ 01.6 bằng đồ thị. Phần trái cho thấy biên có dấu của hai mẫu cùng tăng khi $w$ tăng, vì $m_1=m_2=w$. Phần phải cho thấy đồ thị $L$ tiệm cận đường $L=0$ nhưng mọi điểm hữu hạn của đồ thị đều nằm phía trên đường đó.

Miền của bài toán là toàn $\mathbb R$. Nếu thêm ràng buộc nhân tạo $\lvert w\rvert\le1$, nghiệm sẽ tồn tại tại $w=1$, nhưng đó là một bài toán khác.

::: example Ví dụ 01.7 (Dữ liệu không tách được, có nghiệm)
**Dữ kiện.** Với $d=1$, biên có dấu là $m_i=y_ia_iw$ và $L(w)=\sum_i\log(1+e^{-m_i})$ (Định nghĩa 01.8); hàm sigmoid là $\sigma(s)=1/(1+e^{-s})$. Ví dụ 01.6 có hai mẫu $(a_1,y_1)=(1,+1)$ và $(a_2,y_2)=(-1,-1)$, với $m_1=m_2=w$.

**Lập mô hình.** Thêm vào Ví dụ 01.6 mẫu thứ ba $(a_3,y_3)=(1,-1)$. Hai mẫu tại $a=1$ có nhãn trái nhau, nên không $w$ nào phân loại đúng cả ba mẫu. Biên có dấu là $m_1=m_2=w$ và $m_3=-w$, nên

$$
\begin{aligned}
L(w)&=2\log\bigl(1+e^{-w}\bigr)+\log\bigl(1+e^{w}\bigr),\\
L'(w)&=-\frac{2}{1+e^w}+\frac{e^w}{1+e^w}=\frac{e^w-2}{1+e^w}.
\end{aligned}
$$

**Xét dấu đạo hàm.** Mẫu số dương, nên

- $L'(w)<0$ khi $w<\log2$;
- $L'(\log2)=0$;
- $L'(w)>0$ khi $w>\log2$.

Do đó $L$ giảm chặt trên $(-\infty,\log2]$ và tăng chặt trên $[\log2,\infty)$, và $w^*=\log2\approx0{,}6931$ là nghiệm duy nhất. Giá trị tối ưu là

$$
L(\log2)=2\log\tfrac32+\log3=\log\tfrac{27}4\approx1{,}9095 .
$$

**Diễn giải.** Mô hình gán xác suất $P(y=+1\mid a=1)=\sigma(\log2)=1/(1+\tfrac12)=\tfrac23$ và $P(y=-1\mid a=-1)=\sigma(\log2)=\tfrac23$.

**Kiểm tra lại.** $L(0)=3\log2\approx2{,}0794$ và $L(1)=2\log(1+e^{-1})+\log(1+e)\approx0{,}6265+1{,}3133=1{,}9398$, cả hai lớn hơn $1{,}9095$.
:::

Ví dụ 01.6 và Ví dụ 01.7 có cùng hàm mất mát, cùng miền, và cùng tính chất $L''>0$ (Mệnh đề 01.9(c) cho mỗi hạng một độ cong dương). Hai ví dụ lại cho hai kết luận trái ngược về nghiệm, và sự khác biệt đến từ dữ liệu.

- Trong Ví dụ 01.6, dữ liệu tách được nên mọi biên có dấu cùng tăng khi $w\to+\infty$ và mọi hạng dần về $0$.
- Trong Ví dụ 01.7, mẫu thứ ba làm hạng $\log(1+e^w)$ tăng gần tuyến tính khi $w\to+\infty$, nên $L$ không thể tiến về cận dưới đúng theo hướng đó.

Để phát biểu chính xác sự khác biệt này, chúng ta cần tách ba khái niệm mà hai ví dụ trên đã dùng: một số mà giá trị hàm tiến tới nhưng có thể không đạt, giá trị thực sự đạt được, và một dãy điểm dùng để tiến tới số đó. Ba khái niệm này được định nghĩa như sau.

::: definition Định nghĩa 01.10 (Cận dưới đúng, giá trị nhỏ nhất, dãy cực tiểu hóa)
Cho tập không rỗng $C\subseteq\mathbb R^d$ và $f:C\to\mathbb R$.

Cận dưới đúng (infimum) của $f$ trên $C$, ký hiệu $\inf_{x\in C}f(x)$, là số lớn nhất không vượt quá mọi giá trị $f(x)$ với $x\in C$, với quy ước bằng $-\infty$ khi $f$ không bị chặn dưới.

Nếu có $x^*\in C$ với $f(x^*)=\inf_{x\in C}f(x)$ thì cận dưới đúng được đạt, và số đó là giá trị nhỏ nhất (minimum) của $f$ trên $C$, ký hiệu $\min_{x\in C}f(x)$.

Một dãy $x_k\in C$ với $f(x_k)\to\inf_{x\in C}f(x)$ là một dãy cực tiểu hóa (minimizing sequence).
:::

Trong định nghĩa trên, giá trị nhỏ nhất là trường hợp riêng của cận dưới đúng, tức khi giá trị nhỏ nhất tồn tại thì hai số trùng nhau. Cận dưới đúng luôn tồn tại (có thể bằng $-\infty$), còn giá trị nhỏ nhất có thể không tồn tại. Hàm $x^2$ trên $\mathbb R$ có cận dưới đúng $0$ được đạt tại $0$. Hàm $L$ của Ví dụ 01.6 có cận dưới đúng $0$ không được đạt.

Dãy tối ưu hóa luôn tồn tại khi $C$ không rỗng.

- Nếu cận dưới đúng là số hữu hạn $p$ thì với mỗi $k$, số $p+1/k$ không còn là cận dưới, nên có $x_k\in C$ với $f(x_k)<p+1/k$.
- Nếu cận dưới đúng là $-\infty$, chọn $x_k$ với $f(x_k)<-k$.

::: remark Nhận xét 01.11 (Dãy tối ưu hóa không phải là nghiệm)
Trong Ví dụ 01.6, dãy $w_k=k$ thỏa $L(w_{k+1})<L(w_k)$ và $L(w_k)\to0$, nên là một dãy cực tiểu hóa. Không phần tử nào của dãy là nghiệm, vì phần tử kế tiếp luôn tốt hơn. Dãy cũng không hội tụ trong $\mathbb R$ vì $w_k\to+\infty$.

Nhầm lẫn thường gặp là coi việc giá trị mất mát giảm đều trong quá trình huấn luyện là bằng chứng bài toán có nghiệm.
:::

**Trong học máy.** Dữ liệu tách được tuyến tính không phải trường hợp hiếm. Nếu số đặc trưng không nhỏ hơn số mẫu và các vector $a_1,\ldots,a_n$ độc lập tuyến tính, thì hệ $a_i^Tw=y_i$, $i=1,\ldots,n$, có nghiệm $\bar w$, vì ma trận có các hàng $a_i^T$ có hạng hàng đầy đủ. Khi đó $m_i=y_i^2=1>0$ với mọi $i$, và $L(s\bar w)=n\,\ell(s)\to0$ khi $s\to+\infty$ theo Mệnh đề 01.9(d). Bài toán (4.1) vì vậy không có nghiệm.

Đây là tình huống thường gặp khi phân loại văn bản với hàng chục nghìn đặc trưng từ vựng và vài nghìn mẫu. Hậu quả quan sát được là chuẩn của tham số tăng không giới hạn trong quá trình huấn luyện và xác suất dự đoán tiến về $0$ hoặc $1$. Tình huống 01.1 ở cuối chương chứng nhận cách khắc phục bằng chính quy hóa.

::: exercise Bài tập 01.4
**Dữ kiện.** Với $d=1$, biên có dấu là $m_i=y_ia_iw$ và $L(w)=\sum_i\ell(m_i)$, $\ell(m)=\log(1+e^{-m})$ (Định nghĩa 01.8). Mệnh đề 01.9: (a) $\ell(m)>0$; (b) $\ell'(m)=-\frac1{1+e^m}$, nên $\ell$ giảm chặt; (c) $\ell''(m)=\frac{e^m}{(1+e^m)^2}>0$; (d) $\ell(m)\to0$ khi $m\to+\infty$.

Dữ liệu một chiều, không có hệ số chặn.

(a) Với hai mẫu $(a_1,y_1)=(1,+1)$ và $(a_2,y_2)=(2,+1)$, viết $L(w)$, xác định $\inf_wL(w)$ và cho biết bài toán có nghiệm không.

(b) Với hai mẫu $(1,+1)$ và $(2,-1)$, viết $L(w)$ và $L'(w)$, chứng minh bài toán có đúng một nghiệm $w^*$ và $w^*<0$.

(c) Giải thích bằng lời vì sao nghiệm ở (b) phân loại sai một trong hai mẫu.
:::

::: hint
Ở (b), dùng ba sự kiện về $L'$: dấu của $L'(0)$, giới hạn của $L'(w)$ khi $w\to-\infty$, và dấu của $L''$ theo Mệnh đề 01.9(c).
:::

::: solution
**(a)** Biên có dấu là $w$ và $2w$, nên $L(w)=\log(1+e^{-w})+\log(1+e^{-2w})$. Cả hai hạng giảm chặt và dần tới $0$ khi $w\to+\infty$ theo Mệnh đề 01.9(b), (d), và đều dương theo Mệnh đề 01.9(a). Vậy $\inf_wL(w)=0$ không được đạt, và bài toán không có nghiệm. Dữ liệu tách được vì mọi $w>0$ phân loại đúng cả hai mẫu.

**(b) Bước 1 (lập $L$ và $L'$).** Biên có dấu là $w$ và $-2w$, nên

$$
L(w)=\log(1+e^{-w})+\log(1+e^{2w}),\qquad L'(w)=-\dfrac1{1+e^w}+\dfrac{2}{1+e^{-2w}}.
$$

**(b) Bước 2 (tồn tại điểm dừng âm).** Ta có $L'(0)=-\tfrac12+1=\tfrac12>0$. Khi $w\to-\infty$, hạng thứ nhất dần tới $-1$ và hạng thứ hai dần tới $0$, nên $L'(w)\to-1<0$. Hàm $L'$ liên tục, nên theo định lý giá trị trung gian có $w^*<0$ với $L'(w^*)=0$.

**(b) Bước 3 (duy nhất).** Mỗi hạng của $L$ có đạo hàm bậc hai dương theo Mệnh đề 01.9(c) và quy tắc dây chuyền: đạo hàm bậc hai của $\ell(cw)$ là $c^2\ell''(cw)$. Do đó $L''>0$ và $L'$ tăng chặt, nên $w^*$ là nghiệm duy nhất của $L'=0$. Khi đó $L$ giảm chặt trên $(-\infty,w^*]$ và tăng chặt trên $[w^*,\infty)$, nên $w^*$ là nghiệm duy nhất của bài toán.

**(b) Bước 4 (giải số).** Đặt $s=e^{w}$, phương trình $L'(w)=0$ trở thành $2s^3+s^2-1=0$, cho $s\approx0{,}6573$ và $w^*\approx-0{,}4196$.

**(c)** Không có hệ số chặn, dấu dự đoán tại $a>0$ là dấu của $w$ cho mọi mẫu dương. Hai mẫu $a=1$ và $a=2$ có nhãn trái nhau nên không $w$ nào phân loại đúng cả hai. Với $w^*<0$, mẫu $(2,-1)$ được phân loại đúng và mẫu $(1,+1)$ bị phân loại sai. Mô hình ưu tiên mẫu $a=2$ vì biên của nó nhân đôi tác động của $w$.
:::

Như vậy, từ biên có dấu, Định nghĩa 01.8 lập mô hình hồi quy logistic và Mệnh đề 01.9 cho các tính chất của $\ell$. Dùng tính chất (a) và (d), Ví dụ 01.6 chỉ ra một bài toán không có nghiệm, còn Ví dụ 01.7 dùng dấu của $L'$ để chỉ ra một bài toán có nghiệm duy nhất. Định nghĩa 01.10 tách cận dưới đúng khỏi giá trị nhỏ nhất, và Nhận xét 01.11 tách dãy cực tiểu hóa khỏi nghiệm. Kết quả chính của mục là phản ví dụ hai mẫu này, theo đó một hàm mất mát có độ cong dương ở mọi nơi vẫn có thể không có nghiệm.

Ba mục vừa qua giải ba bài toán bằng ba công cụ riêng là phép bù bình phương, phương trình chuẩn và xét dấu đạo hàm một biến. Không công cụ nào áp dụng được cho hai bài toán còn lại, và kết luận về nghiệm khác nhau ở mỗi trường hợp. Ngay ở bộ dữ liệu ba mẫu, phép xét dấu $L'$ chỉ áp dụng được do $d=1$, còn với $d\ge2$ không có "bên trái" và "bên phải" của một điểm. Dạng tổng quát ở Mục 5 cho phép phát biểu các câu hỏi về nghiệm một lần cho mọi bài toán.

## 5. Dạng tổng quát của bài toán tối ưu

Sau Mục 2 đến Mục 4, chúng ta có ba kết quả rời nhau.

- Trường hợp điều khiển có nghiệm duy nhất nằm trên biên (Mệnh đề 01.2).
- Hồi quy tuyến tính luôn có nghiệm nhưng có thể có vô số nghiệm (Mệnh đề 01.6).
- Hồi quy logistic có thể không có nghiệm (Ví dụ 01.6).

Cụm từ "giải được bài toán" mang ba nghĩa khác nhau trong ba câu đó. Để so sánh được ba kết quả, trong mục này chúng ta đặt ba mô hình vào cùng một dạng tổng quát (standard form) gồm biến, mục tiêu và miền, định nghĩa chính xác các khái niệm nghiệm, rồi chuyển chúng thành sáu câu hỏi chứng nhận được trả lời ở Mục 6 đến Mục 8.

### 5.1 Bài toán tối ưu tổng quát

![Sơ đồ đọc từ trái sang phải. Khung dữ kiện gồm quan sát, tham số đã biết và nguồn lực; dữ kiện không phải đại lượng thuật toán được phép thay đổi. Khung biến quyết định x có n thành phần, ví dụ trọng số, phân bổ, lịch hoặc phương án điều khiển. Khung hàm mục tiêu: cực tiểu f0(x), giá trị nhỏ hơn được ưu tiên. Khung ràng buộc: f_i(x) nhỏ hơn hoặc bằng 0 và h_j(x) bằng 0, quy định phương án được phép. Khung miền khả thi C: x sao thuộc C và f0(x sao) nhỏ hơn hoặc bằng f0(x) với mọi x thuộc C. Dòng cuối: khả thi chỉ có nghĩa là thuộc C; tối ưu còn đòi hỏi không có điểm khả thi nào tốt hơn.](img/lec-01/optimization-model-anatomy.svg)

Hình trên tách một mô hình tối ưu thành các khối. Dữ kiện xác định dạng của hàm mục tiêu và của các ràng buộc nhưng không bị thuật toán thay đổi. Ràng buộc xác định miền khả thi, còn hàm mục tiêu so sánh các điểm khả thi.

Trong hình, số chiều của biến được ghi là $n$. Trong chương này, $d$ là số chiều của biến và $n$ là số mẫu dữ liệu. Với quy ước đó, bài toán tối ưu tổng quát được phát biểu theo định nghĩa sau.

::: definition Định nghĩa 01.12 (Bài toán tối ưu, khả thi, giá trị tối ưu và nghiệm)
Cho tập $D\subseteq\mathbb R^d$, hàm mục tiêu $f_0:D\to\mathbb R$, các hàm ràng buộc bất đẳng thức $f_i:D\to\mathbb R$, $i=1,\ldots,k$, và các hàm ràng buộc đẳng thức $h_j:D\to\mathbb R$, $j=1,\ldots,k'$. Tập khả thi là

$$
C=\{x\in D\mid f_i(x)\le0,\ i=1,\ldots,k;\ \ h_j(x)=0,\ j=1,\ldots,k'\}.
$$

Bài toán tối ưu là

$$
\underset{x\in C}{\operatorname{minimize}}\quad f_0(x).
\tag{5.1}
$$

Mỗi $x\in C$ là một điểm khả thi.

Giá trị tối ưu là $p^*=\inf_{x\in C}f_0(x)$, với quy ước $p^*=+\infty$ khi $C$ rỗng và $p^*=-\infty$ khi $f_0$ không bị chặn dưới trên $C$.

Một điểm $x^*\in C$ là nghiệm tối ưu nếu $f_0(x^*)\le f_0(x)$ với mọi $x\in C$, tương đương $f_0(x^*)=p^*$.

Tập nghiệm là $S^*=\{x\in C\mid f_0(x)=p^*\}$.
:::

Định nghĩa 01.12 tách bốn thành phần của một mô hình: dữ kiện (những gì xác định $f_0$, $f_i$, $h_j$), biến quyết định $x$, hàm mục tiêu $f_0$ và miền khả thi $C$. Chỉ số $0$ dành cho hàm mục tiêu vì $f_1,\ldots,f_k$ đã dùng cho ràng buộc. Bài toán cực đại một hàm $g$ được đưa về dạng (5.1) bằng cách cực tiểu $f_0=-g$, khi đó nghiệm giữ nguyên còn giá trị tối ưu đổi dấu.

Bốn đối tượng $C$, $p^*$, $x^*$ và $S^*$ khác nhau về kiểu: $C$ và $S^*$ là tập, $p^*$ là một số (có thể bằng $\pm\infty$), $x^*$ là một điểm. Một điểm khả thi chưa chắc là nghiệm, chẳng hạn trong Ví dụ 01.1, $u=0$ khả thi nhưng $q(0)=9>\tfrac92$.

Ba mô hình của Mục 2 đến Mục 4 là ba trường hợp riêng của Định nghĩa 01.12.

| Mô hình | Biến $x$ | Mục tiêu $f_0$ | Miền $C$ | Dữ kiện |
|---|---|---|---|---|
| Điều khiển (Định nghĩa 01.1) | $u\in\mathbb R$, $d=1$ | $q(u)=(x_0+u-t)^2+\lambda u^2$ | $[-u_{\max},u_{\max}]$ | $x_0,t,u_{\max},\lambda$ |
| Hồi quy tuyến tính (Định nghĩa 01.4) | $w\in\mathbb R^d$ | $J(w)=\lVert Xw-y\rVert_2^2$ | $\mathbb R^d$ | $X,y$ |
| Hồi quy logistic (Định nghĩa 01.8) | $w\in\mathbb R^d$ | $L(w)=\sum_i\log(1+e^{-y_ia_i^Tw})$ | $\mathbb R^d$ | $(a_i,y_i)$, $i=1,\ldots,n$ |

Trường hợp điều khiển có hai ràng buộc bất đẳng thức $f_1(u)=u-u_{\max}\le0$ và $f_2(u)=-u-u_{\max}\le0$. Hai trường hợp hồi quy không có ràng buộc, nên $C=D=\mathbb R^d$.

Cùng chữ $x$ trong dạng tổng quát có thể là tác động vật lý hoặc tham số của mô hình học máy, vì dạng tổng quát chỉ ghi nhận vai trò của đại lượng trong bài toán. Chữ $x$ ở đây cũng khác trạng thái $x_0$, $x_1$ của Mục 2 và hàng $x_i$ của Mục 3.

**Trong học máy.** Huấn luyện một mô hình có tham số là giải một bài toán dạng (5.1).

- Biến quyết định là vector tham số.
- Hàm mục tiêu là tổng hoặc trung bình mất mát trên tập huấn luyện, có thể cộng thêm hạng chính quy hóa.
- Dữ kiện là tập huấn luyện.
- Miền thường là toàn không gian tham số, đôi khi có ràng buộc như giới hạn chuẩn của trọng số hoặc yêu cầu các trọng số trộn không âm và có tổng bằng $1$.

Như vậy, Định nghĩa 01.12 tách tham số, đại lượng mà thuật toán thay đổi, khỏi dữ liệu, đại lượng cố định trong quá trình giải.

### 5.2 Cực tiểu địa phương và cực tiểu toàn cục

Một thuật toán lặp chỉ quan sát được hàm mục tiêu quanh điểm hiện tại. Xét hàm $f(x)=x^3-3x$ trên đoạn $C=[-3,3]$. Đạo hàm $f'(x)=3x^2-3$ bằng $0$ tại $x=\pm1$.

Tại $x=1$, $f(1)=-2$, và mọi điểm gần $1$ đều cho giá trị lớn hơn. Một thuật toán xuất phát gần $1$ và chỉ nhận các bước làm giảm $f$ sẽ không rời khỏi điểm này. Trong khi đó, tại đầu mút trái, $f(-3)=-27+9=-18$, nhỏ hơn nhiều. Như vậy, cần phân biệt hai khái niệm cực tiểu theo định nghĩa sau.

::: definition Định nghĩa 01.13 (Cực tiểu địa phương, cực tiểu toàn cục, cực tiểu chặt)
Cho bài toán (5.1) và $x^*\in C$.

Điểm $x^*$ là cực tiểu địa phương tương đối với $C$ nếu có $r>0$ sao cho $f_0(x^*)\le f_0(x)$ với mọi $x\in C$ thỏa $\lVert x-x^*\rVert_2\le r$. Nếu thêm $f_0(x^*)<f_0(x)$ với mọi $x\in C$ như vậy mà $x\ne x^*$, thì $x^*$ là cực tiểu địa phương chặt.

Điểm $x^*$ là cực tiểu toàn cục nếu $f_0(x^*)\le f_0(x)$ với mọi $x\in C$, và là cực tiểu toàn cục chặt nếu $f_0(x^*)<f_0(x)$ với mọi $x\in C$, $x\ne x^*$.
:::

Trong định nghĩa trên, cực tiểu toàn cục trùng với nghiệm tối ưu của Định nghĩa 01.12, còn cụm "tương đối với $C$" nghĩa là chỉ so sánh với các điểm vừa gần $x^*$ vừa khả thi. Một điểm trên biên của $C$ có thể là cực tiểu địa phương dù hàm tiếp tục giảm ra ngoài $C$. Số $r$ là bán kính của lân cận được xét.

Câu hỏi đặt ra là các loại cực tiểu này quan hệ với nhau và với tập nghiệm $S^*$ như thế nào. Chỉ từ Định nghĩa 01.12 và 01.13, ta có mệnh đề sau.

::: proposition Mệnh đề 01.14 (Quan hệ giữa các loại cực tiểu)
**Giả thiết.** Bài toán (5.1) và một điểm $x^*\in C$.

**Kết luận.**

- (a) Nếu $x^*$ là cực tiểu toàn cục (toàn cục chặt) thì $x^*$ là cực tiểu địa phương (địa phương chặt) với mọi bán kính $r>0$.
- (b) Tập nghiệm $S^*$ có đúng một phần tử khi và chỉ khi bài toán có một cực tiểu toàn cục chặt.

**Điều kiện áp dụng.** Không cần giả thiết nào về $f_0$ hay $C$.

**Phạm vi.** Chiều ngược của (a) sai nói chung (Ví dụ 01.8 ngay sau đây); mệnh đề không nói gì về sự tồn tại của cực tiểu.
:::

::: proof Chứng minh Mệnh đề 01.14
**Bước 1 (phần (a)).** Bất đẳng thức $f_0(x^*)\le f_0(x)$ (hoặc $<$ khi $x\ne x^*$) đúng với mọi $x\in C$ thì đúng với mọi $x\in C$ thỏa $\lVert x-x^*\rVert_2\le r$.

**Bước 2 (phần (b), chiều thuận).** Nếu $S^*=\{x^*\}$ thì $f_0(x^*)=p^*$, và mọi $x\in C$ khác $x^*$ không thuộc $S^*$ nên $f_0(x)\ne p^*$. Vì $f_0(x)\ge p^*$ theo định nghĩa cận dưới đúng, ta có $f_0(x)>f_0(x^*)$, tức $x^*$ là cực tiểu toàn cục chặt.

**Bước 3 (phần (b), chiều ngược).** Nếu $x^*$ là cực tiểu toàn cục chặt thì $f_0(x^*)=p^*$ và mọi điểm khác có giá trị lớn hơn $p^*$, nên $S^*=\{x^*\}$. $\square$
:::

Mệnh đề 01.14 cho phép dịch câu hỏi "nghiệm có duy nhất không" sang câu hỏi "có cực tiểu toàn cục chặt không". Tuy nhiên, như phần Phạm vi của mệnh đề đã nêu và Ví dụ 01.8 dưới đây cho thấy, chiều ngược của (a) sai, nên khi không có thêm cấu trúc, một kiểm tra địa phương chưa đủ để kết luận toàn cục.

::: example Ví dụ 01.8 (Cực tiểu địa phương không toàn cục)
**Xét dấu đạo hàm.** Cho $f(x)=x^3-3x$ trên $C=[-3,3]$. Đạo hàm $f'(x)=3(x-1)(x+1)$ dương trên $[-3,-1)$, âm trên $(-1,1)$ và dương trên $(1,3]$. Do đó $f$ tăng trên $[-3,-1]$, giảm trên $[-1,1]$ và tăng trên $[1,3]$.

**Tính.** Các giá trị tại hai điểm tới hạn và hai đầu mút là $f(-3)=-18$, $f(-1)=2$, $f(1)=-2$, $f(3)=18$.

**Phân loại.**

- Điểm $x=1$ là cực tiểu địa phương chặt: với $r=1$, mọi $x\in[0,2]$ khác $1$ có $f(x)>f(1)$ vì $f$ giảm chặt trước $1$ và tăng chặt sau $1$.
- Điểm $x=-3$ là cực tiểu toàn cục chặt: giá trị nhỏ nhất của $f$ trên $[-3,-1]$ đạt tại $-3$ vì $f$ tăng, còn trên $[-1,3]$ giá trị nhỏ nhất là $f(1)=-2>-18$.

Vậy $p^*=-18$ và $S^*=\{-3\}$. Tại nghiệm toàn cục $x=-3$, $f'(-3)=24\ne0$, giống hiện tượng nghiệm biên ở Nhận xét 01.3.

**Kiểm tra lại.** $f(-3)=(-3)^3-3(-3)=-27+9=-18$ và $f(1)=1-3=-2$; so sánh $-18<-2$.
:::

![Hai khung. Khung trái: đồ thị một hàm không lồi trên đoạn C từ −2 đến 0,5; cực tiểu toàn cục (hình thoi) tại x bằng −1 với f bằng 0; cực tiểu địa phương (hình tròn) tại điểm biên phải x bằng 0,5, vì lân cận của điểm biên chỉ gồm các điểm bên trái và hàm giảm khi tiến tới 0,5. Khung phải: đồ thị một hàm lồi có một điểm cực tiểu được đánh dấu là vừa địa phương vừa toàn cục, và một dây cung nằm phía trên đồ thị.](img/lec-01/local-versus-global-minimum.svg)

Hình trên đặt hai tình huống cạnh nhau.

Khung trái là một hàm không lồi trên $C=[-2;\,0{,}5]$ có hai loại cực tiểu: cực tiểu toàn cục tại $x=-1$ và cực tiểu địa phương tại đầu mút phải $x=0{,}5$, nơi hàm đang giảm khi tiến tới biên. Hiện tượng này cùng loại với Ví dụ 01.8.

Khung phải là một hàm lồi. Điểm cực tiểu được đánh dấu vừa là cực tiểu địa phương vừa là cực tiểu toàn cục, và dây cung nằm trên đồ thị. Định lý 01.33 ở Mục 8 chứng minh rằng điều quan sát được ở khung phải đúng cho mọi hàm lồi trên mọi miền lồi.

::: remark Nhận xét 01.15 (Điểm dừng và cực tiểu trên biên)
Hai nhầm lẫn thường gặp liên quan tới điều kiện đạo hàm.

Thứ nhất, coi mọi điểm dừng là cực tiểu. Hàm $x^3$ có $f'(0)=0$ nhưng $0$ không phải cực trị, và điểm $x=-1$ của Ví dụ 01.8 có $f'(-1)=0$ nhưng là cực đại địa phương. Với nhiều biến, điểm dừng có thể là điểm yên ngựa (Bài 00, mục "Phân loại điểm dừng bằng Hessian").

Thứ hai, coi mọi cực tiểu địa phương đều có đạo hàm bằng không. Điều kiện cần $\nabla f_0(x^*)=0$ của Bài 00 chỉ áp dụng cho điểm trong của miền, còn cực tiểu toàn cục $x=-3$ của Ví dụ 01.8 nằm trên biên và có $f'(-3)=24$.
:::

::: exercise Bài tập 01.5
Cho $f(x)=x^4-2x^2$ trên $C=[-2,\tfrac12]$. Tìm mọi điểm dừng trong $C$, xác định các khoảng đơn điệu của $f$ trên $C$, rồi phân loại bốn điểm $-2$, $-1$, $0$, $\tfrac12$: điểm nào là cực tiểu địa phương (chặt hay không), cực đại địa phương, cực tiểu toàn cục.
:::

::: hint
$f'(x)=4x(x-1)(x+1)$. Một đầu mút là cực tiểu địa phương tương đối với $C$ nếu hàm giảm khi tiến tới đầu mút đó từ phía bên trong đoạn.
:::

::: solution
**Điểm dừng.** Điểm dừng trong $C$ là $-1$ và $0$ (điểm $1$ nằm ngoài $C$).

**Xét dấu đạo hàm.** Dấu của $f'(x)=4x(x-1)(x+1)$:

- âm trên $[-2,-1)$, vì ba thừa số $x$, $x-1$, $x+1$ đều âm;
- dương trên $(-1,0)$;
- âm trên $(0,\tfrac12]$.

Vậy $f$ giảm trên $[-2,-1]$, tăng trên $[-1,0]$, giảm trên $[0,\tfrac12]$.

**Tính.** $f(-2)=8$, $f(-1)=-1$, $f(0)=0$, $f(\tfrac12)=\tfrac1{16}-\tfrac12=-\tfrac7{16}$.

**Phân loại.**

- $x=-2$ là cực đại địa phương tương đối với $C$ ($f$ giảm khi rời $-2$ vào trong đoạn).
- $x=-1$ là cực tiểu địa phương chặt và là cực tiểu toàn cục chặt. Trên $[-2,0]$, giá trị nhỏ nhất là $f(-1)=-1$, đạt duy nhất tại $-1$ vì $f$ giảm chặt rồi tăng chặt. Trên $[0,\tfrac12]$, $f$ giảm nên $f\ge f(\tfrac12)=-\tfrac7{16}>-1$.
- $x=0$ là cực đại địa phương chặt ($f''(0)=-4<0$).
- $x=\tfrac12$ là cực tiểu địa phương chặt tương đối với $C$ dù $f'(\tfrac12)=\tfrac12-2=-\tfrac32\ne0$, nhưng không toàn cục.

**Kiểm tra lại.** $p^*=-1$ và $S^*=\{-1\}$; theo Mệnh đề 01.14(b), $-1$ là cực tiểu toàn cục chặt.
:::

### 5.3 Miền lồng nhau và bốn loại kết luận

Trước khi xét cấu trúc của $f_0$ và $C$, chúng ta cần một quan hệ đơn giản giữa các bài toán có miền lồng nhau. Quan hệ này được dùng nhiều lần trong chương và được phát biểu trong mệnh đề sau.

::: proposition Mệnh đề 01.16 (So sánh hai bài toán có miền lồng nhau)
**Giả thiết.** $C'\subseteq C\subseteq D$ và $f_0:D\to\mathbb R$. Ký hiệu $p^*(C)=\inf_{x\in C}f_0(x)$.

**Kết luận.**

- (a) $p^*(C)\le p^*(C')$.
- (b) Nếu $x^*\in C'$ là nghiệm của bài toán trên $C$ thì $x^*$ cũng là nghiệm của bài toán trên $C'$, và $p^*(C')=p^*(C)$.

**Điều kiện áp dụng.** Không cần giả thiết gì về $f_0$ hay về các tập.

**Phạm vi.** Mệnh đề so sánh hai bài toán; nó không cho biết nghiệm của bài toán trên $C'$ khi nghiệm của bài toán trên $C$ nằm ngoài $C'$.
:::

::: proof Chứng minh Mệnh đề 01.16
**Bước 1 (phần (a)).** Với mọi $x\in C'$, ta có $x\in C$, nên $f_0(x)\ge p^*(C)$ theo định nghĩa cận dưới đúng trên $C$ (Định nghĩa 01.10). Vậy $p^*(C)$ là một cận dưới của $f_0$ trên $C'$, và không lớn hơn cận dưới lớn nhất $p^*(C')$.

**Bước 2 (phần (b)).** Vì $x^*$ là nghiệm trên $C$, $f_0(x^*)\le f_0(x)$ với mọi $x\in C$, nên cũng với mọi $x\in C'\subseteq C$. Cùng với $x^*\in C'$, điều này nói $x^*$ là nghiệm trên $C'$. Khi đó $p^*(C')=f_0(x^*)=p^*(C)$. $\square$
:::

Mệnh đề 01.16 giải thích hai hiện tượng đã gặp.

- Ở Ví dụ 01.1, ràng buộc làm giá trị tối ưu tăng từ $3$ lên $\tfrac92$, đúng chiều của (a).
- Ở Ví dụ 01.2 với $\lambda=5$, cực tiểu không ràng buộc $u_{\mathrm{free}}=\tfrac12$ nằm trong $C$, nên theo (b) nó là nghiệm của bài toán có ràng buộc mà không cần tính thêm.

::: example Ví dụ 01.9 (Bốn loại kết luận trên ba trường hợp)
**Dữ kiện.** Ba trường hợp đã giải:

- Ví dụ 01.1: $\min_{u\in[-1,1]}q(u)$ với $q(u)=\tfrac32u^2-6u+9$, nghiệm $u^*=1$, giá trị tối ưu $\tfrac92$;
- Ví dụ 01.5: $\min_{w'}\lVert X'w'-y\rVert_2^2$ với $X'=\begin{bmatrix}1&0&0\\1&1&1\\1&2&2\end{bmatrix}$, $y=(1,2,2)^T$, giá trị tối ưu $\tfrac16$, tập nghiệm $\{(7/6,c,1/2-c)^T\mid c\in\mathbb R\}$;
- Ví dụ 01.6: $\min_{w\in\mathbb R}L(w)$ với $L(w)=2\log(1+e^{-w})$, $\inf L=0$ không được đạt.

Bốn loại kết luận về một bài toán là:

1. một điểm khả thi;
2. giá trị tối ưu $p^*$;
3. sự tồn tại của nghiệm ($S^*\ne\varnothing$);
4. tính duy nhất của nghiệm ($S^*$ có đúng một phần tử).

Ba trường hợp đã gặp cho ba tổ hợp khác nhau.

| Trường hợp | Điểm khả thi | $p^*$ | Tồn tại | Duy nhất |
|---|---|---|---|---|
| Điều khiển, Ví dụ 01.1 | $u=0$, $q(0)=9$ | $9/2$ | có, $u^*=1$ | có |
| Hai cột trùng nhau, Ví dụ 01.5 | $w'=0$, $J=9$ | $1/6$ | có | không, $S^*$ là một đường thẳng |
| Logistic tách được tuyến tính, Ví dụ 01.6 | $w=0$, $L=2\log2$ | $0$ | không | không đặt ra |

Giá trị $J(0)=\lVert y\rVert_2^2=1+4+4=9$ với $y=(1,2,2)^T$.

**Kiểm tra lại.** Trong mỗi hàng, giá trị tại điểm khả thi không nhỏ hơn $p^*$: $9\ge\tfrac92$, $9\ge\tfrac16$, $2\log2\ge0$, đúng với định nghĩa cận dưới đúng.
:::

::: remark Nhận xét 01.17 (Sáu câu hỏi chứng nhận)
Bốn loại kết luận của Ví dụ 01.9 được chuyển thành sáu câu hỏi theo thứ tự thường dùng khi phân tích một mô hình mới:

1. Điểm $x$ đang xét có thuộc $C$ không.
2. Tập khả thi $C$ có lồi không.
3. Hàm mục tiêu $f_0$ có lồi trên $C$ không.
4. Một điểm ứng viên (điểm có gradient bằng không, hoặc cực tiểu địa phương) có là cực tiểu toàn cục không.
5. Nghiệm tối ưu có tồn tại không.
6. Nếu tồn tại, nghiệm có duy nhất không.

Câu 6 chỉ đặt ra khi câu 5 được trả lời khẳng định. Trả lời "có" cho câu 2 và câu 3 không suy ra câu trả lời cho câu 5: trong Ví dụ 01.6, miền $\mathbb R$ và hàm $L$ đều lồi (chứng minh ở Mục 7) nhưng không có nghiệm.

Câu 2 được xét trước câu 3 vì định nghĩa hàm lồi ở Mục 7 cần điểm nằm giữa hai điểm khả thi còn khả thi, tức cần miền lồi. Câu 2 được trả lời ở Mục 6, câu 3 ở Mục 7, còn câu 4, 5 và 6 ở Mục 8.
:::

::: exercise Bài tập 01.6
Ba hộ dân ở các vị trí $p_1=(0,0)$, $p_2=(4,0)$, $p_3=(0,2)$ trên mặt phẳng (đơn vị km). Cần đặt một trạm cấp nước tại $x\in\mathbb R^2$ để tổng bình phương khoảng cách $f(x)=\sum_{i=1}^3\lVert x-p_i\rVert_2^2$ nhỏ nhất, với quy hoạch yêu cầu trạm nằm trong nửa mặt phẳng $x_1\le1$.

(a) Chỉ ra dữ kiện, biến quyết định, hàm mục tiêu, miền khả thi và viết bài toán theo dạng (5.1), $\min_{x\in C}f_0(x)$ với $C=\{x\in D\mid f_i(x)\le0,\ h_j(x)=0\}$.

(b) Chứng minh $f(x)=3\lVert x-c\rVert_2^2+\tfrac{40}3$ với $c=(\tfrac43,\tfrac23)$.

(c) Tìm nghiệm và giá trị tối ưu khi bỏ ràng buộc và khi có ràng buộc.

(d) Kiểm tra kết quả với Mệnh đề 01.16(a): nếu $C'\subseteq C$ thì $p^*(C)\le p^*(C')$, với $p^*(C)=\inf_{x\in C}f_0(x)$.
:::

::: hint
Ở (b), khai triển $\lVert x-p_i\rVert_2^2=\lVert x\rVert_2^2-2p_i^Tx+\lVert p_i\rVert_2^2$ và cộng ba đẳng thức. Ở (c), dạng của (b) đưa bài toán về tìm điểm của miền gần $c$ nhất.
:::

::: solution
**(a) Lập mô hình.**

- Dữ kiện là ba vị trí $p_1,p_2,p_3\in\mathbb R^2$ và hằng số $1$ trong ràng buộc.
- Biến quyết định là $x\in\mathbb R^2$.
- Hàm mục tiêu là $f(x)=\sum_i\lVert x-p_i\rVert_2^2$.
- Miền khả thi là $C=\{x\in\mathbb R^2\mid x_1-1\le0\}$, ứng với một ràng buộc bất đẳng thức $f_1(x)=x_1-1$.

Bài toán là $\min_{x\in C}f(x)$.

**(b) Khai triển.** Cộng ba khai triển:

$$
f(x)=3\lVert x\rVert_2^2-2(p_1+p_2+p_3)^Tx+\textstyle\sum_i\lVert p_i\rVert_2^2 .
$$

Ta có $p_1+p_2+p_3=(4,2)=3c$ và $\sum_i\lVert p_i\rVert_2^2=0+16+4=20$. Mặt khác

$$
3\lVert x-c\rVert_2^2=3\lVert x\rVert_2^2-6c^Tx+3\lVert c\rVert_2^2,\qquad 3\lVert c\rVert_2^2=3(\tfrac{16}9+\tfrac49)=\tfrac{20}3 .
$$

Trừ hai biểu thức: $f(x)-3\lVert x-c\rVert_2^2=20-\tfrac{20}3=\tfrac{40}3$.

**(c) Không ràng buộc.** Theo (b), $f(x)\ge\tfrac{40}3$ với dấu bằng khi và chỉ khi $x=c$. Nghiệm duy nhất là $c=(\tfrac43,\tfrac23)$, trọng tâm ba hộ, với $p^*=\tfrac{40}3$.

**(c) Có ràng buộc.** $c$ không khả thi vì $\tfrac43>1$. Với $x\in C$:

- $(x_1-\tfrac43)^2\ge(\tfrac13)^2$ vì $x_1\le1$, với dấu bằng khi và chỉ khi $x_1=1$;
- $(x_2-\tfrac23)^2\ge0$ với dấu bằng khi và chỉ khi $x_2=\tfrac23$.

Vậy nghiệm duy nhất là $x^*=(1,\tfrac23)$ và $p^*=\tfrac{40}3+3\cdot\tfrac19=\tfrac{41}3$.

**(d) Kiểm tra lại.** $C\subseteq\mathbb R^2$, và Mệnh đề 01.16(a) cho $p^*(\mathbb R^2)\le p^*(C)$; thật vậy $\tfrac{40}3\le\tfrac{41}3$. Kiểm tra trực tiếp:

$$
f(1,\tfrac23)=(1+\tfrac49)+(9+\tfrac49)+(1+\tfrac{16}9)=11+\tfrac{24}9=\tfrac{41}3 .
$$
:::

Trong mục này, Định nghĩa 01.12 đặt ba mô hình vào dạng tổng quát (5.1), và Định nghĩa 01.13 tách cực tiểu địa phương khỏi cực tiểu toàn cục, với Ví dụ 01.8 làm phản ví dụ. Mệnh đề 01.14 cho quan hệ giữa các loại cực tiểu, Nhận xét 01.15 nêu hai nhầm lẫn về điểm dừng và cực tiểu trên biên, còn Mệnh đề 01.16 so sánh các bài toán có miền lồng nhau. Cuối cùng, Ví dụ 01.9 và Nhận xét 01.17 chuyển bốn loại kết luận thành sáu câu hỏi chứng nhận, và danh sách sáu câu hỏi đó là kết quả chính của mục.

Dạng tổng quát cho chúng ta một ngôn ngữ nhưng chưa cho công cụ trả lời câu hỏi nào trong sáu câu ngoài câu 1. Các lập luận ở Mục 2 đến Mục 4 trả lời được câu 4, 5, 6 cho từng trường hợp nhờ cấu trúc riêng của nó, và Ví dụ 01.8 cho thấy nếu không có thêm cấu trúc thì một cực tiểu địa phương có thể không toàn cục. Cấu trúc cần thêm gồm hai phần, hình dạng của miền được xét ở Mục 6 và hình dạng của hàm mục tiêu được xét ở Mục 7.

## 6. Tập lồi

Ví dụ sau gợi ý miền cần có cấu trúc nào.

Giả sử bộ chấp hành của Mục 2 có vùng chết: nó tạo được tác động có độ lớn từ $\tfrac12$ đến $1$ nhưng không tạo được tác động nhỏ hơn $\tfrac12$, kể cả $0$. Miền khả thi là $C=[-1,-\tfrac12]\cup[\tfrac12,1]$. Hai tác động $-1$ và $1$ khả thi, nhưng tác động trung bình $\tfrac12(-1)+\tfrac12(1)=0$ không khả thi.

Trên miền như vậy, hàm $u\mapsto u^2$ có hai nghiệm cách xa nhau $u=\pm\tfrac12$. Một phương pháp chỉ dịch chuyển dần từ một điểm khả thi không thể đi từ nhánh này sang nhánh kia.

Trong mục này, chúng ta định nghĩa lớp tập không có khoảng trống như vậy. Đầu tiên, chúng ta xây dựng danh sách các tập cơ bản của lớp đó cùng các phép ghép giữ lớp, sau đó dùng chúng để chứng nhận miền của ba trường hợp.

### 6.1 Đoạn nối giữa hai phương án

Với hai phương án $x,y\in\mathbb R^d$ và một hệ số $\theta\in[0,1]$, điểm $z_\theta=\theta x+(1-\theta)y$ là phương án trộn $x$ với tỉ lệ $\theta$ và $y$ với tỉ lệ $1-\theta$. Với $\theta=1$ được $x$, với $\theta=0$ được $y$, với $\theta=\tfrac12$ được trung điểm. Khi $\theta$ chạy trên $[0,1]$, $z_\theta$ quét hết đoạn thẳng nối $x$ và $y$.

![Hai khung. Khung trái: một tập lồi C hình elip chứa hai điểm tròn x và y, một điểm thoi z bằng theta x cộng (1 − theta) y với theta từ 0 đến 1, và toàn bộ đoạn nối x với y đều nằm trong C. Khung phải: một tập không lồi D gồm hai thùy nối với nhau qua một chỗ thắt; đoạn nối điểm x ở thùy trái với điểm y ở thùy phải đi qua chỗ thắt, và phần giữa của đoạn, vẽ nét đứt có một ô vuông, nằm ngoài D. Chú thích: chỉ cần một cặp phản ví dụ để bác bỏ tính lồi.](img/lec-01/convex-set-and-combination.svg)

Hình trên so sánh hai tập: ở khung trái, mọi đoạn nối hai điểm của $C$ nằm trọn trong $C$, còn ở khung phải, có một đoạn nối đi ra ngoài $D$. Tập vùng chết ở đầu mục giống khung phải.

Về mặt trực quan, miền thích hợp cho tối ưu là miền chứa mọi phương án trộn của hai phương án khả thi. Trực giác này được phát biểu chính xác ở Mục 6.2.

### 6.2 Tổ hợp lồi và tập lồi

Phương án trộn của hai điểm được gọi là tổ hợp lồi (convex combination), và tập lồi được định nghĩa qua tổ hợp lồi như sau.

::: definition Định nghĩa 01.18 (Tổ hợp lồi của hai điểm và tập lồi)
Cho $x,y\in\mathbb R^d$ và $\theta\in[0,1]$. Điểm $\theta x+(1-\theta)y$ là một tổ hợp lồi của $x$ và $y$; tập mọi tổ hợp lồi của $x$ và $y$ là đoạn thẳng nối $x$ và $y$.

Một tập $C\subseteq\mathbb R^d$ là lồi nếu

$$
\theta x+(1-\theta)y\in C\qquad\forall x,y\in C,\ \forall\theta\in[0,1].
\tag{6.1}
$$
:::

Định nghĩa có hai lượng từ "với mọi": điều kiện phải đúng cho mọi cặp điểm của tập, và với mỗi cặp phải đúng cho toàn bộ $\theta$ trong $[0,1]$.

Để chứng minh một tập lồi, ta lấy $x,y\in C$ và $\theta\in[0,1]$ tùy ý rồi suy ra $z_\theta\in C$, còn để bác bỏ, chỉ cần một bộ $x,y,\theta$ với $z_\theta\notin C$. Theo định nghĩa, tập rỗng và tập một điểm đều lồi, vì không có cặp điểm nào vi phạm (6.1).

Hai ví dụ và hai phản ví dụ sau minh họa định nghĩa.

- Đoạn $C=[-u_{\max},u_{\max}]$ của trường hợp điều khiển lồi. Nếu $\lvert u\rvert\le u_{\max}$ và $\lvert v\rvert\le u_{\max}$ thì theo bất đẳng thức tam giác $\lvert\theta u+(1-\theta)v\rvert\le\theta\lvert u\rvert+(1-\theta)\lvert v\rvert\le u_{\max}$.
- Toàn không gian $\mathbb R^d$ lồi vì mọi tổ hợp của hai vector vẫn là một vector của $\mathbb R^d$.
- Tập vùng chết $[-1,-\tfrac12]\cup[\tfrac12,1]$ không lồi với bộ $x=-1$, $y=1$, $\theta=\tfrac12$.
- Đường tròn đơn vị $\{x\in\mathbb R^2\mid\lVert x\rVert_2=1\}$ không lồi với $x=(1,0)$, $y=(-1,0)$, $\theta=\tfrac12$.

Một nhầm lẫn thường gặp là chỉ kiểm tra trung điểm. Tập số hữu tỉ $\mathbb Q$ chứa trung điểm của mọi cặp phần tử của nó nhưng không lồi, vì đoạn $[0,1]$ nối hai số hữu tỉ chứa số vô tỉ $1/\sqrt2$.

Tập lồi là khái niệm tổng quát hơn hai khái niệm quen thuộc của đại số tuyến tính.

- Một không gian con chứa mọi tổ hợp $\theta x+\eta y$ với $\theta,\eta\in\mathbb R$.
- Một tập affine chứa mọi tổ hợp $\theta x+(1-\theta)y$ với $\theta\in\mathbb R$.
- Một tập lồi chỉ cần chứa các tổ hợp với $\theta\in[0,1]$.

Do đó mọi không gian con là tập affine, mọi tập affine là tập lồi, và chiều ngược lại sai ở cả hai bước. Đường thẳng $\{x\in\mathbb R^2\mid x_1+x_2=1\}$ là tập affine nhưng không phải không gian con vì không chứa $0$. Đoạn $[0,1]$ lồi nhưng không affine.

### 6.3 Các tập lồi cơ bản và phép toán bảo toàn

Kiểm tra (6.1) trực tiếp cho từng miền là việc lặp lại. Thay vào đó, chúng ta lập sẵn một danh sách tập lồi cơ bản và một danh sách phép toán bảo toàn tính lồi (operations that preserve convexity), rồi nhận dạng miền như một kết quả ghép. Các tập lồi cơ bản cần cho chương được liệt kê trong mệnh đề sau.

::: proposition Mệnh đề 01.19 (Các tập lồi cơ bản)
**Giả thiết.** $A\in\mathbb R^{k\times d}$, $b\in\mathbb R^k$; $a\in\mathbb R^d$, $a\ne0$, và $\beta\in\mathbb R$; các số $\alpha_j\le\beta_j$, $j=1,\ldots,d$; $c\in\mathbb R^d$ và $r\ge0$.

**Kết luận.** Các tập sau đều lồi:

- (a) toàn không gian $\mathbb R^d$;
- (b) tập affine $\{x\mid Ax=b\}$;
- (c) nửa không gian $\{x\mid a^Tx\le\beta\}$;
- (d) hộp $\{x\mid\alpha_j\le x_j\le\beta_j,\ j=1,\ldots,d\}$;
- (e) quả cầu Euclid đóng $B(c,r)=\{x\mid\lVert x-c\rVert_2\le r\}$.

**Điều kiện áp dụng.** Không cần giả thiết thêm; điều kiện $a\ne0$ chỉ để tập ở (c) là nửa không gian thực sự.

**Phạm vi.** Danh sách chỉ gồm các tập cần cho chương này; các tập lồi khác như elip, đa diện và nón bậc hai được trình bày trong Boyd và Vandenberghe (2004), mục 2.2.
:::

::: proof Chứng minh Mệnh đề 01.19
Lấy $x,y$ trong tập đang xét, $\theta\in[0,1]$ và $z=\theta x+(1-\theta)y$.

**(a) Toàn không gian.** $z\in\mathbb R^d$.

**(b) Tập affine.** $Az=\theta Ax+(1-\theta)Ay=\theta b+(1-\theta)b=b$, dùng tính tuyến tính của phép nhân ma trận.

**(c) Nửa không gian.** $a^Tz=\theta a^Tx+(1-\theta)a^Ty\le\theta\beta+(1-\theta)\beta=\beta$. Bước bất đẳng thức dùng $\theta\ge0$ và $1-\theta\ge0$.

**(d) Hộp.** Với mỗi tọa độ $j$, $z_j=\theta x_j+(1-\theta)y_j$ nằm giữa $\alpha_j$ và $\beta_j$ vì là tổ hợp lồi của hai số trong đoạn $[\alpha_j,\beta_j]$, theo cùng lập luận như (c).

**(e) Quả cầu.** Theo bất đẳng thức tam giác và tính thuần nhất của chuẩn,

$$
\begin{aligned}
\lVert z-c\rVert_2&=\lVert\theta(x-c)+(1-\theta)(y-c)\rVert_2\\
&\le\theta\lVert x-c\rVert_2+(1-\theta)\lVert y-c\rVert_2\\
&\le r. \qquad\square
\end{aligned}
$$
:::

Trong chứng minh (b), đẳng thức đúng với mọi $\theta\in\mathbb R$, nên tập affine còn chứa cả đường thẳng qua hai điểm của nó. Trong (c), (d), (e), bước bất đẳng thức cần $\theta\in[0,1]$. Đó là bước sử dụng hai lượng từ của Định nghĩa 01.18.

Từ các tập cơ bản, ta tạo được tập lồi mới bằng các phép ghép trong mệnh đề sau.

::: proposition Mệnh đề 01.20 (Các phép toán bảo toàn tính lồi của tập)
**Giả thiết.** $C_\gamma\subseteq\mathbb R^d$ lồi với mọi $\gamma$ trong một tập chỉ số $\Gamma$ (hữu hạn hay vô hạn); $C\subseteq\mathbb R^d$ và $E\subseteq\mathbb R^k$ lồi; $A\in\mathbb R^{k\times d}$, $b\in\mathbb R^k$.

**Kết luận.**

- (a) Giao $\bigcap_{\gamma\in\Gamma}C_\gamma$ lồi.
- (b) Ảnh affine $\{Ax+b\mid x\in C\}$ lồi.
- (c) Nghịch ảnh affine $\{x\in\mathbb R^d\mid Ax+b\in E\}$ lồi.

**Điều kiện áp dụng.** Ánh xạ phải affine; ảnh hay nghịch ảnh của tập lồi qua ánh xạ phi tuyến nói chung không lồi.

**Phạm vi.** Hợp của hai tập lồi nói chung không lồi.
:::

::: proof Chứng minh Mệnh đề 01.20
Gọi $z=\theta x+(1-\theta)y$ với $\theta\in[0,1]$.

**(a) Giao.** Nếu $x,y$ thuộc giao thì $x,y\in C_\gamma$ với mọi $\gamma$. Vì mỗi $C_\gamma$ lồi, $z\in C_\gamma$ với mọi $\gamma$, tức $z$ thuộc giao.

**(b) Ảnh affine.** Hai điểm của ảnh có dạng $Ax+b$ và $Ay+b$ với $x,y\in C$. Khi đó $\theta(Ax+b)+(1-\theta)(Ay+b)=Az+b$ và $z\in C$ vì $C$ lồi, nên tổ hợp thuộc ảnh.

**(c) Nghịch ảnh affine.** Nếu $Ax+b\in E$ và $Ay+b\in E$ thì $Az+b=\theta(Ax+b)+(1-\theta)(Ay+b)\in E$ vì $E$ lồi, nên $z$ thuộc nghịch ảnh.

Trong cả (b) và (c), đẳng thức $A z+b=\theta(Ax+b)+(1-\theta)(Ay+b)$ dùng $\theta+(1-\theta)=1$ để tách hằng số $b$. $\square$
:::

Trong mô hình hóa, giao là phép được dùng nhiều nhất, vì một điểm thỏa đồng thời nhiều ràng buộc là một điểm thuộc giao của các tập ràng buộc.

Nghịch ảnh affine dùng khi ràng buộc đặt lên một đại lượng phụ thuộc affine vào biến, chẳng hạn dự đoán $Xw$ của một mô hình tuyến tính bị yêu cầu nằm trong một khoảng.

::: example Ví dụ 01.10 (Chứng nhận miền bằng phép ghép)
**(a) Ba trường hợp của chương.** Trường hợp điều khiển có miền

$$
[-u_{\max},u_{\max}]=\{u\mid u\le u_{\max}\}\cap\{u\mid-u\le u_{\max}\},
$$

là giao của hai nửa không gian trong $\mathbb R$, ứng với $a=1$ và $a=-1$ trong Mệnh đề 01.19(c), nên lồi theo Mệnh đề 01.20(a). Hai trường hợp hồi quy có miền $\mathbb R^d$, lồi theo Mệnh đề 01.19(a).

**(b) Máy vector hỗ trợ lề cứng.** Lề (margin) của một bộ phân loại tuyến tính $w$ trên dữ liệu $(a_i,y_i)$ là biên có dấu nhỏ nhất $\min_iy_ia_i^Tw$ (Định nghĩa 01.8). Tập các bộ phân loại có lề ít nhất $1$,

$$
W=\{w\in\mathbb R^d\mid y_ia_i^Tw\ge1,\ i=1,\ldots,n\},
$$

là giao của $n$ nửa không gian $\{w\mid(-y_ia_i)^Tw\le-1\}$, nên lồi. Tập này là miền khả thi của máy vector hỗ trợ lề cứng (hard-margin SVM).

**(c) Nhiễu đối kháng.** Tập nhiễu đối kháng hợp lệ cho ảnh $x\in[0,1]^d$ với ngân sách $\varepsilon>0$ là

$$
\{\delta\in\mathbb R^d\mid\lvert\delta_j\rvert\le\varepsilon,\ 0\le x_j+\delta_j\le1,\ j=1,\ldots,d\}.
$$

Đây là giao của một hộp theo $\delta$ và nghịch ảnh của hộp $[0,1]^d$ qua ánh xạ affine $\delta\mapsto x+\delta$, nên lồi theo Mệnh đề 01.19(d) và Mệnh đề 01.20(a), (c).

**(d) Đơn hình xác suất.** Đơn hình $\Delta_k=\{\theta\in\mathbb R^k\mid\theta\ge0,\ \mathbf 1^T\theta=1\}$, tập các vector trọng số không âm có tổng bằng $1$, là giao của $k$ nửa không gian $\{\theta\mid-\theta_j\le0\}$ và tập affine $\{\theta\mid\mathbf 1^T\theta=1\}$. Do đó nó lồi theo Mệnh đề 01.19(b), (c) và 01.20(a). Đầu ra của hàm softmax và vector trọng số trộn của một tổ hợp mô hình nằm trong $\Delta_k$.

**Kiểm tra lại.** Ở (a) với $u_{\max}=1$: hai phương án $-1$ và $1$ khả thi, và mọi tổ hợp lồi $\theta\cdot1+(1-\theta)(-1)=2\theta-1$ thuộc $[-1,1]$ khi $\theta\in[0,1]$.
:::

::: remark Nhận xét 01.21 (Giới hạn của các phép toán bảo toàn)
Hợp của hai tập lồi nói chung không lồi: $[0,1]\cup[2,3]$ chứa $1$ và $2$ nhưng không chứa $\tfrac32$. Tập vùng chết ở đầu mục cũng là một hợp như vậy.

Phần bù của tập lồi nói chung không lồi: $\{w\mid\lVert w\rVert_2\ge1\}$, phần bù của quả cầu mở, chứa $(1,0)$ và $(-1,0)$ nhưng không chứa $(0,0)$.

Tính lồi độc lập với tính đóng và tính bị chặn: nửa không gian lồi nhưng không bị chặn, khoảng mở $(0,1)$ lồi nhưng không đóng. Ba tính chất này được dùng cho ba kết luận khác nhau ở Mục 8, nên phải được kiểm tra riêng.
:::

**Trong học máy.** Ràng buộc lồi xuất hiện trong học máy dưới ba dạng chính.

- Đơn hình xác suất $\Delta_k$ (Ví dụ 01.10(d)) là miền của trọng số trộn và của trọng số chú ý (attention).
- Quả cầu chuẩn $\{w\mid\lVert w\rVert_2\le r\}$ là miền của tham số khi chuẩn trọng số bị giới hạn.
- Hộp và giao của hộp với nghịch ảnh affine là miền của nhiễu đối kháng trong Ví dụ 01.10(c).

Mệnh đề 01.19 và 01.20 cho phép chứng nhận các miền này lồi mà không tính trực tiếp (6.1), và kết luận đó là một nửa giả thiết của Định lý 01.33 ở Mục 8.

::: exercise Bài tập 01.7
Xác định tập nào sau đây lồi; với tập lồi, nêu căn cứ theo Mệnh đề 01.19 và 01.20; với tập không lồi, cho bộ $x,y,\theta$ vi phạm điều kiện (6.1), $\theta x+(1-\theta)y\in C$ với mọi $x,y\in C$, $\theta\in[0,1]$.

(a) $\{x\in\mathbb R^2\mid\lvert x_1\rvert+\lvert x_2\rvert\le1\}$.

(b) $\{x\in\mathbb R^2\mid x_1x_2\ge0\}$.

(c) $\{\theta\in\mathbb R^3\mid\theta\ge0,\ \theta_1+\theta_2+\theta_3=1,\ \theta_1\le\tfrac12\}$.
:::

::: hint
Ở (a), viết $\lvert x_1\rvert+\lvert x_2\rvert\le1$ thành bốn bất đẳng thức tuyến tính $\pm x_1\pm x_2\le1$. Ở (b), thử một điểm trên trục hoành dương và một điểm trên trục tung âm.
:::

::: solution
**(a) Lồi.** Với mọi $x$, $\lvert x_1\rvert+\lvert x_2\rvert=\max(\pm x_1\pm x_2)$ lấy trên bốn tổ hợp dấu. Do đó tập bằng giao của bốn nửa không gian $\{x\mid s_1x_1+s_2x_2\le1\}$ với $s_1,s_2\in\{-1,+1\}$, và lồi theo Mệnh đề 01.19(c) và 01.20(a).

**(b) Không lồi.** Với $x=(1,0)$, $y=(0,-1)$, cả hai có tích tọa độ bằng $0$ nên thuộc tập. Với $\theta=\tfrac12$, $z=(\tfrac12,-\tfrac12)$ có $z_1z_2=-\tfrac14<0$.

**(c) Lồi.** Tập là giao của ba nửa không gian $\{-\theta_j\le0\}$, tập affine $\{\mathbf 1^T\theta=1\}$ và nửa không gian $\{\theta_1\le\tfrac12\}$; lồi theo Mệnh đề 01.19(b), (c) và 01.20(a). Kiểm tra một điểm: $(\tfrac12,\tfrac14,\tfrac14)$ thuộc tập.
:::

::: exercise Bài tập 01.8
Chứng minh trực tiếp từ Định nghĩa 01.18 (tập $C$ lồi nếu $\theta x+(1-\theta)y\in C$ với mọi $x,y\in C$, $\theta\in[0,1]$) rằng tập $P=\{x\in\mathbb R^2\mid x_2\ge x_1^2\}$, phần mặt phẳng nằm trên parabol, là tập lồi.
:::

::: hint
Với hai số $s_1,s_2$ và $\theta\in[0,1]$, tính hiệu $\theta s_1^2+(1-\theta)s_2^2-(\theta s_1+(1-\theta)s_2)^2$.
:::

::: solution
**Bước 1 (một bất đẳng thức cho hai số).** Khai triển hiệu cần xét, ta có

$$
\begin{aligned}
\theta s_1^2+(1-\theta)s_2^2-(\theta s_1+(1-\theta)s_2)^2&=\theta(1-\theta)(s_1^2+s_2^2)-2\theta(1-\theta)s_1s_2\\
&=\theta(1-\theta)(s_1-s_2)^2\\
&\ge0,
\end{aligned}
$$

trong đó dòng thứ nhất dùng $\theta-\theta^2=\theta(1-\theta)$ và $(1-\theta)-(1-\theta)^2=\theta(1-\theta)$.

**Bước 2 (kiểm tra (6.1)).** Lấy $x,y\in P$ và $z=\theta x+(1-\theta)y$. Khi đó

$$
\begin{aligned}
z_2&=\theta x_2+(1-\theta)y_2\\
&\ge\theta x_1^2+(1-\theta)y_1^2\\
&\ge(\theta x_1+(1-\theta)y_1)^2=z_1^2 .
\end{aligned}
$$

Bất đẳng thức thứ nhất dùng $x,y\in P$ và $\theta,1-\theta\ge0$. Bất đẳng thức thứ hai là đẳng thức vừa chứng minh với $s_1=x_1$, $s_2=y_1$. Vậy $z\in P$.

Phép tính ở Bước 1 cũng là phép kiểm tra hàm $s\mapsto s^2$ lồi theo định nghĩa ở Mục 7 (Ví dụ 01.11(a)).
:::

Với định nghĩa tập lồi (Định nghĩa 01.18), Mệnh đề 01.19 cho danh sách tập cơ bản và Mệnh đề 01.20 cho các phép toán bảo toàn tính lồi. Ghép hai danh sách này, ta chứng nhận được miền của ba trường hợp đều lồi (Ví dụ 01.10), và đó là câu trả lời cho câu hỏi 2 của Nhận xét 01.17.

Tuy nhiên, miền lồi mới là một nửa của chứng nhận. Hàm $f(x)=x^3-3x$ trong Ví dụ 01.8 được xét trên đoạn $[-3,3]$, một tập lồi theo Mệnh đề 01.19(d), mà vẫn có cực tiểu địa phương $x=1$ không toàn cục, nên hình dạng của miền không đủ và hàm mục tiêu cũng phải có hình dạng phù hợp. Hình dạng đó, cùng các tiêu chuẩn để kiểm tra nó, là nội dung của Mục 7.

## 7. Hàm lồi

Hàm $f(x)=x^3-3x$ trên $[-3,3]$ có hai điểm cực tiểu: cực tiểu địa phương tại $x=1$ và cực tiểu toàn cục tại đầu mút $x=-3$. Giữa hai điểm này, $f$ đạt cực đại địa phương tại $x=-1$. Một hàm phù hợp cho tối ưu không được có cực đại như vậy nằm giữa hai cực tiểu.

Trong mục này, chúng ta định nghĩa hàm lồi và liên hệ nó với tập lồi qua tập mức dưới. Sau đó, chúng ta chứng minh hai tiêu chuẩn vi phân (bậc nhất và bậc hai) cùng các phép toán bảo toàn tính lồi, rồi dùng các công cụ này để chứng nhận ba hàm $q$, $J$ và $L$ lồi.

### 7.1 Dây cung và đồ thị

Với $x,y$ trong một miền lồi $C$, dây cung (chord) là đoạn thẳng nối hai điểm $(x,f(x))$ và $(y,f(y))$ trên đồ thị. Tại $z=\theta x+(1-\theta)y$, độ cao của dây cung là $\theta f(x)+(1-\theta)f(y)$, trung bình có trọng số của hai giá trị hàm.

Hàm $x^3-3x$ có dây cung nối $(-3,-18)$ với $(1,-2)$. Tại trung điểm $x=-1$, dây cung ở độ cao $-10$ còn đồ thị ở độ cao $2$, tức đồ thị vượt lên trên dây cung.

Ngược lại, hàm chi phí $q(u)=\tfrac32u^2-6u+9$ của Ví dụ 01.1 có dây cung nối $(-1,\tfrac{33}2)$ với $(1,\tfrac92)$. Tại trung điểm $u=0$, dây cung ở độ cao $\tfrac12(\tfrac{33}2+\tfrac92)=\tfrac{21}2$ còn đồ thị ở độ cao $q(0)=9\le\tfrac{21}2$.

![Ba khung so sánh đồ thị với dây cung. Khung hàm lồi: đồ thị không vượt lên trên dây cung, cho phép dấu bằng trên một đoạn. Khung giữa: tại điểm trong của dây cung, đồ thị nằm hẳn dưới dây cung khi x khác y và 0 nhỏ hơn theta nhỏ hơn 1. Khung hàm lõm: đồ thị không thấp hơn dây cung, tương đương âm f là hàm lồi. Dòng chú thích: tính chất của khung giữa mạnh hơn tính chất của khung trái nhưng không tự động suy ra nghiệm tối ưu tồn tại.](img/lec-01/convex-concave-strict.svg)

Hình trên cho thấy ba hình dạng. Một cách trực quan, một hàm phù hợp cho tối ưu có đồ thị không bao giờ vượt lên trên dây cung, như ở khung trái, và mô tả này được viết thành định nghĩa ở Mục 7.2. Khung giữa cho một tính chất mạnh hơn, vì đồ thị nằm hẳn dưới mọi dây cung giữa hai điểm khác nhau nên không chứa đoạn thẳng nào. Khung phải là trường hợp ngược chiều.

Dòng chú thích của hình khẳng định tính chất ở khung giữa không kéo theo sự tồn tại nghiệm. Khẳng định này được tạm chấp nhận ở đây, với Ví dụ 01.6 là một trường hợp đã tính, và được phát biểu chính xác ở Nhận xét 01.43 của Mục 8.

### 7.2 Hàm lồi và hàm lõm

Điều kiện "đồ thị không vượt lên trên dây cung" được viết thành một bất đẳng thức theo định nghĩa sau.

::: definition Định nghĩa 01.22 (Hàm lồi, hàm lồi chặt, hàm lõm)
Cho $C\subseteq\mathbb R^d$ lồi và $f:C\to\mathbb R$. Hàm $f$ là lồi nếu

$$
f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y)\qquad\forall x,y\in C,\ \forall\theta\in[0,1].
\tag{7.1}
$$

Hàm $f$ là lồi chặt (còn gọi là lồi nghiêm ngặt) nếu bất đẳng thức (7.1) là chặt, $<$, với mọi $x\ne y$ thuộc $C$ và mọi $\theta\in(0,1)$.

Hàm $f$ là lõm nếu $-f$ lồi.
:::

Trong định nghĩa trên, giả thiết $C$ lồi là cần thiết, vì nếu thiếu nó, điểm $\theta x+(1-\theta)y$ có thể nằm ngoài miền và vế trái của (7.1) không xác định. Vế trái là giá trị của hàm tại tổ hợp lồi của $x$ và $y$, còn vế phải là tổ hợp lồi của $f(x)$ và $f(y)$ với cùng trọng số, tức độ cao của dây cung.

Trong định nghĩa lồi chặt, hai trường hợp $x=y$ và $\theta\in\{0,1\}$ bị loại vì khi đó hai vế luôn bằng nhau. Từ đây trở đi chỉ dùng "lồi chặt".

::: example Ví dụ 01.11 (Kiểm tra bằng định nghĩa)
**Dữ kiện.** Điều kiện lồi (7.1): $f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y)$ với mọi $x,y\in C$, $\theta\in[0,1]$; lồi chặt khi bất đẳng thức chặt với mọi $x\ne y$, $\theta\in(0,1)$. Đồng nhất thức trong lời giải Bài tập 01.8: $\theta x^2+(1-\theta)y^2-(\theta x+(1-\theta)y)^2=\theta(1-\theta)(x-y)^2$.

**(a) Hàm $x^2$.** $f(x)=x^2$ lồi chặt trên $\mathbb R$: theo phép tính trong lời giải Bài tập 01.8, vế phải trừ vế trái của (7.1) bằng $\theta(1-\theta)(x-y)^2$, dương khi $x\ne y$ và $\theta\in(0,1)$.

**(b) Hàm affine.** Hàm affine $f(x)=a^Tx+\beta$ vừa lồi vừa lõm, và không lồi chặt: hai vế của (7.1) bằng nhau với mọi $x,y,\theta$, vì $f$ giữ nguyên tổ hợp lồi.

**(c) Chuẩn Euclid.** $f(x)=\lVert x\rVert_2$ lồi trên $\mathbb R^d$ theo bất đẳng thức tam giác: $\lVert\theta x+(1-\theta)y\rVert_2\le\theta\lVert x\rVert_2+(1-\theta)\lVert y\rVert_2$. Với $d=1$, $f(x)=\lvert x\rvert$ không lồi chặt: với $x=1$, $y=2$, $\theta=\tfrac12$, hai vế cùng bằng $\tfrac32$.

**(d) Hàm $x^3-3x$.** $f(x)=x^3-3x$ không lồi trên $\mathbb R$. Đây là dây cung đã xét ở Mục 7.1: với $x=-3$, $y=1$, $\theta=\tfrac12$, vế trái là $f(-1)=2$, vế phải là $\tfrac12(-18)+\tfrac12(-2)=-10$, và $2>-10$.

**Kiểm tra lại.** Ở (a) với $x=0$, $y=2$, $\theta=\tfrac12$: vế trái $1$, vế phải $2$, hiệu $1=\tfrac14\cdot4$, khớp với $\theta(1-\theta)(x-y)^2$.
:::

Định nghĩa 01.22 có quan hệ chặt chẽ với các khái niệm đã có. Mọi hàm lồi chặt là hàm lồi; chiều ngược lại sai, với phản ví dụ $\lvert x\rvert$ ở Ví dụ 01.11(c).

Định nghĩa 01.22 là phiên bản cho hàm của Định nghĩa 01.18, vì cả hai đặt điều kiện lên tổ hợp lồi $\theta x+(1-\theta)y$ của hai điểm. Mệnh đề 01.25 dưới đây chuyển tính lồi của hàm thành tính lồi của các tập mức dưới.

::: remark Nhận xét 01.23 (Hạn chế hàm lồi xuống tập con lồi)
Nếu $f$ lồi (lồi chặt) trên $C$ và $C'\subseteq C$ là tập lồi thì $f$ lồi (lồi chặt) trên $C'$, vì (7.1) đúng cho mọi cặp điểm của $C$ thì đúng cho mọi cặp điểm của $C'$.

Nhận xét này cho phép chứng nhận một hàm lồi trên một miền mở như $\mathbb R$ bằng các điều kiện vi phân ở Mục 7.4 và 7.5, rồi hạn chế xuống miền khả thi đóng, như đoạn của trường hợp điều khiển.
:::

### 7.3 Tập mức dưới

Ràng buộc trong Định nghĩa 01.12 có dạng $f_i(x)\le0$, nên để chứng nhận miền khả thi lồi, chúng ta cần biết khi nào tập $\{x\mid f_i(x)\le0\}$ lồi.

Về mặt hình học, ta cắt đồ thị của hàm bằng một mặt nằm ngang ở độ cao $\alpha$, và phần miền nằm dưới mặt cắt gồm các điểm có giá trị hàm không vượt $\alpha$. Với hàm có đồ thị không vượt lên trên dây cung, phần miền này chứa đoạn thẳng nối hai điểm bất kỳ của nó, vì trên đoạn đó, đồ thị nằm dưới một dây cung có hai đầu không cao hơn $\alpha$. Định nghĩa sau gọi tên tập này một cách chính xác.

::: definition Định nghĩa 01.24 (Tập mức dưới)
Cho $C\subseteq\mathbb R^d$, $f:C\to\mathbb R$ và $\alpha\in\mathbb R$. Tập mức dưới (sublevel set) của $f$ ở mức $\alpha$ là $S_\alpha(f)=\{x\in C\mid f(x)\le\alpha\}$.
:::

Trong định nghĩa trên, tập mức dưới là phần miền nơi $f$ không vượt mức $\alpha$, một tập con của $\mathbb R^d$, và là miền khả thi của một ràng buộc $f(x)\le\alpha$.

So với Định nghĩa 01.18, tập mức dưới là một cách sinh ra tập từ một hàm, chẳng hạn với $f(x)=\lVert x-c\rVert_2$, tập $S_r(f)$ là quả cầu $B(c,r)$ của Mệnh đề 01.19(e). Một tập mức dưới có thể rỗng, chẳng hạn $S_{-1}(x^2)$. Quan hệ giữa tính lồi của hàm và tính lồi của tập mức dưới được phát biểu trong mệnh đề sau.

::: proposition Mệnh đề 01.25 (Tập mức dưới của hàm lồi)
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi và $f:C\to\mathbb R$ lồi.

**Kết luận.** Với mọi $\alpha\in\mathbb R$, tập mức dưới $S_\alpha(f)$ là tập lồi.

**Điều kiện áp dụng.** Cần miền $C$ lồi để tính lồi của $f$ có nghĩa; không cần $f$ khả vi hay liên tục.

**Phạm vi.** Chiều ngược sai: tồn tại hàm không lồi mà mọi tập mức dưới đều lồi (Bài tập 01.9).
:::

::: proof Chứng minh Mệnh đề 01.25
Lấy $x,y\in S_\alpha(f)$ và $\theta\in[0,1]$. Điểm $\theta x+(1-\theta)y$ thuộc $C$ vì $C$ lồi, và theo (7.1),

$$
\begin{aligned}
f(\theta x+(1-\theta)y)&\le\theta f(x)+(1-\theta)f(y)\\
&\le\theta\alpha+(1-\theta)\alpha=\alpha .
\end{aligned}
$$

Trong đó, bất đẳng thức thứ hai dùng $f(x),f(y)\le\alpha$ và $\theta,1-\theta\ge0$. $\square$
:::

Mệnh đề 01.25 suy trực tiếp từ Định nghĩa 01.22 áp dụng cho hai điểm cùng nằm dưới mức $\alpha$, nên không cần kết quả nào khác.

Tuy nhiên, kết luận của nó yếu hơn tính lồi, vì tính lồi của mọi tập mức dưới không kéo theo tính lồi của hàm (Bài tập 01.9). Do đó, mệnh đề chỉ dùng được theo một chiều, từ hàm sang tập.

**Trong học máy.** Mệnh đề 01.25 chứng nhận các ràng buộc dạng "một hàm lồi không vượt ngưỡng". Ràng buộc chuẩn trọng số $\lVert w\rVert_2\le r$ là tập mức dưới của hàm lồi $\lVert w\rVert_2$ (Ví dụ 01.11(c)), nên lồi. Ràng buộc "mất mát logistic trên một tập dữ liệu kiểm định không vượt $\alpha$", tức $\{w\mid L(w)\le\alpha\}$, lồi khi $L$ lồi, điều sẽ được chứng nhận ở Ví dụ 01.14.

::: exercise Bài tập 01.9
Cho $f(x)=\sqrt{\lvert x\rvert}$ trên $\mathbb R$. Chứng minh mọi tập mức dưới $S_\alpha(f)$ đều lồi, nhưng $f$ không lồi. Kết quả này nói gì về chiều ngược của Mệnh đề 01.25 (với $f$ lồi trên tập lồi $C$, mọi tập mức dưới $S_\alpha(f)=\{x\in C\mid f(x)\le\alpha\}$ đều lồi).
:::

::: hint
Với $\alpha\ge0$, giải $\sqrt{\lvert x\rvert}\le\alpha$. Để bác bỏ tính lồi, thử $x=0$, $y=1$, $\theta=\tfrac12$.
:::

::: solution
**Bước 1 (tập mức dưới lồi).**

- Với $\alpha<0$, $S_\alpha(f)=\varnothing$, lồi.
- Với $\alpha\ge0$, $\sqrt{\lvert x\rvert}\le\alpha$ tương đương $\lvert x\rvert\le\alpha^2$, nên $S_\alpha(f)=[-\alpha^2,\alpha^2]$, một đoạn, lồi.

**Bước 2 (hàm không lồi).** Với $x=0$, $y=1$, $\theta=\tfrac12$: $f(\tfrac12)=\sqrt{1/2}\approx0{,}707>\tfrac12f(0)+\tfrac12f(1)=0{,}5$, vi phạm (7.1), $f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y)$.

**Kết luận.** Tập mức dưới lồi không kéo theo hàm lồi; Mệnh đề 01.25 không đảo được.
:::

### 7.4 Điều kiện bậc nhất

Kiểm tra (7.1) trực tiếp đòi hỏi xét mọi bộ $x,y,\theta$. Với hàm khả vi, có một tiêu chuẩn tương đương qua gradient, và tiêu chuẩn này còn biến điều kiện gradient bằng không thành điều kiện đủ cho cực tiểu toàn cục. Tiêu chuẩn này chỉ cần Định nghĩa 01.22 và khái niệm gradient của Bài 00.

Một cách trực quan, với hàm có đồ thị không vượt lên trên dây cung, tiếp tuyến tại mọi điểm nằm dưới đồ thị. Quan sát này được chứng minh ở định lý dưới đây, còn phép tính thủ công với hàm $q(u)=\tfrac32u^2-6u+9$ của Ví dụ 01.1 tại $u=1$ minh họa điều này. Ta có $q(1)=\tfrac92$ và $q'(1)=-3$, nên tiếp tuyến là $T(u)=\tfrac92-3(u-1)$.

- Tại $u=-1$, $T(-1)=\tfrac92+6=\tfrac{21}2$ còn $q(-1)=\tfrac{33}2\ge\tfrac{21}2$.
- Tại $u=3$, $T(3)=-\tfrac32$ còn $q(3)=\tfrac{27}2-18+9=\tfrac92\ge-\tfrac32$.

Tổng quát, với mọi $u$,

$$
q(u)-T(u)=\tfrac32u^2-3u+\tfrac32=\tfrac32(u-1)^2\ge0 .
$$

Định lý sau biến quan sát này thành một tiêu chuẩn tương đương với tính lồi.

::: theorem Định lý 01.26 (Điều kiện bậc nhất)
**Giả thiết.** $C\subseteq\mathbb R^d$ mở và lồi; $f:C\to\mathbb R$ khả vi trên $C$.

**Kết luận.** $f$ lồi khi và chỉ khi

$$
f(y)\ge f(x)+\nabla f(x)^T(y-x)\qquad\forall x,y\in C.
\tag{7.2}
$$

Hơn nữa, nếu (7.2) đúng với dấu $>$ cho mọi $x\ne y$ thì $f$ lồi chặt.

**Điều kiện áp dụng.** $C$ mở để mọi điểm là điểm trong, nơi gradient xác định theo Bài 00.

**Phạm vi.** Không áp dụng trực tiếp cho hàm không khả vi như $\lvert x\rvert$ tại $0$, hoặc cho miền đóng có biên; khi miền đóng, áp dụng cho một miền mở chứa nó rồi hạn chế xuống.
:::

::: proof Chứng minh Định lý 01.26
**Bước 1 (chiều thuận: thương sai phân).** Giả sử $f$ lồi, lấy $x,y\in C$ và $\theta\in(0,1]$. Theo (7.1) với vai trò của $\theta$ đặt lên $y$,

$$
f(x+\theta(y-x))=f(\theta y+(1-\theta)x)\le f(x)+\theta(f(y)-f(x)).
$$

Trừ $f(x)$ ở hai vế rồi chia cho $\theta>0$, ta có

$$
\frac{f(x+\theta(y-x))-f(x)}{\theta}\le f(y)-f(x).
$$

**Bước 2 (chiều thuận: qua giới hạn).** Khi $\theta\to0^+$, vế trái dần tới đạo hàm theo hướng $y-x$ tại $x$, bằng $\nabla f(x)^T(y-x)$ vì $f$ khả vi tại điểm trong $x$ (Bài 00, mục "Đạo hàm theo hướng"). Giới hạn giữ chiều bất đẳng thức, cho (7.2).

**Bước 3 (chiều đảo).** Giả sử (7.2) đúng. Lấy $x,y\in C$, $\theta\in[0,1]$ và $z=\theta x+(1-\theta)y$, thuộc $C$ vì $C$ lồi. Áp dụng (7.2) tại điểm $z$ cho hai điểm $x$ và $y$, ta có

$$
f(x)\ge f(z)+\nabla f(z)^T(x-z),\qquad f(y)\ge f(z)+\nabla f(z)^T(y-z).
$$

Nhân bất đẳng thức thứ nhất với $\theta\ge0$, bất đẳng thức thứ hai với $1-\theta\ge0$ rồi cộng lại, ta được

$$
\begin{aligned}
\theta f(x)+(1-\theta)f(y)&\ge f(z)+\nabla f(z)^T(\theta x+(1-\theta)y-z)\\
&=f(z),
\end{aligned}
$$

vì $\theta x+(1-\theta)y-z=0$. Đó là (7.1).

**Bước 4 (trường hợp chặt).** Nếu (7.2) chặt với mọi cặp điểm khác nhau, thì với $x\ne y$ và $\theta\in(0,1)$, ta có $z\ne x$ và $z\ne y$. Do đó cả hai bất đẳng thức ở Bước 3 là chặt, và tổng với hệ số dương cho (7.1) chặt. $\square$
:::

Vế phải của (7.2) là xấp xỉ tuyến tính (khai triển Taylor bậc nhất) của $f$ quanh $x$, đánh giá tại $y$. Đồ thị của nó là siêu phẳng tiếp xúc với đồ thị $f$ tại $(x,f(x))$. Định lý 01.26 cho thấy $f$ lồi khi và chỉ khi mọi siêu phẳng tiếp xúc nằm dưới đồ thị. Trong một chiều, (7.2) là $f(y)\ge f(x)+f'(x)(y-x)$, tức tiếp tuyến nằm dưới đồ thị.

So với Định nghĩa 01.22, điều kiện bậc nhất cần thêm giả thiết khả vi và miền mở. Với các giả thiết thêm đó, từ đạo hàm tại một điểm $x$, điều kiện bậc nhất cho một thông tin toàn cục, đó là giá trị của $f$ ở mọi nơi bị chặn dưới bởi một hàm affine xác định tại $x$. Hệ quả sau dùng thông tin này để chứng nhận tối ưu toàn cục.

::: corollary Hệ quả 01.27 (Điều kiện đủ tối ưu cho hàm lồi khả vi)
**Giả thiết.** $D\subseteq\mathbb R^d$ mở và lồi; $f:D\to\mathbb R$ lồi và khả vi; $C\subseteq D$; $x^*\in C$ thỏa

$$
\nabla f(x^*)^T(x-x^*)\ge0\qquad\forall x\in C.
\tag{7.3}
$$

**Kết luận.** $x^*$ là cực tiểu toàn cục của $f$ trên $C$. Trường hợp riêng: nếu $\nabla f(x^*)=0$ thì $x^*$ là cực tiểu toàn cục của $f$ trên cả $D$.

**Điều kiện áp dụng.** $f$ lồi và khả vi trên một tập mở chứa $C$.

**Phạm vi.** Hệ quả cho điều kiện đủ. Khi $C$ lồi, (7.3) cũng là điều kiện cần (Boyd và Vandenberghe 2004, mục 4.2.3, trang 139); chiều cần không được chứng minh trong chương này.
:::

::: proof Chứng minh Hệ quả 01.27
**Bước 1 (trên $C$).** Với mọi $x\in C\subseteq D$, Định lý 01.26 áp dụng trên $D$ cho $f(x)\ge f(x^*)+\nabla f(x^*)^T(x-x^*)$. Theo (7.3) hạng cuối không âm, nên $f(x)\ge f(x^*)$.

**Bước 2 (trường hợp gradient bằng không).** Nếu $\nabla f(x^*)=0$, (7.3) đúng với mọi $x\in D$, và cùng lập luận cho $f(x)\ge f(x^*)$ trên $D$. $\square$
:::

Hệ quả 01.27 là bước suy ra đầu tiên từ tính lồi tới tính tối ưu toàn cục. Nó mạnh hơn điều kiện "gradient bằng không" của Bài 00 theo hai nghĩa: điều kiện cần trở thành điều kiện đủ, và áp dụng được cho nghiệm trên biên qua (7.3).

Tuy nhiên, hệ quả cần giả thiết lồi. Với $f(x)=x^3$ trên $\mathbb R$, $f'(0)=0$ nhưng $0$ không phải cực tiểu, và giả thiết lồi bị vi phạm theo Nhận xét 01.32.

::: example Ví dụ 01.12 (Điều kiện bậc nhất trên ba trường hợp)
**Dữ kiện.** Hệ quả 01.27: nếu $f$ lồi, khả vi trên một tập mở lồi $D\supseteq C$ và $x^*\in C$ thỏa $\nabla f(x^*)^T(x-x^*)\ge0$ với mọi $x\in C$ (7.3), thì $x^*$ là cực tiểu toàn cục của $f$ trên $C$. Ví dụ 01.4: $J(w)=\lVert Xw-y\rVert_2^2$ với $X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix}$, $y=(1,2,2)^T$, $\nabla J(w)=2X^T(Xw-y)$; tại $w^*=(7/6,1/2)^T$, $Xw^*-y=(1/6,-1/3,1/6)^T$ và $X^T(Xw^*-y)=0$.

**(a) Trường hợp điều khiển, Ví dụ 01.1.** Hàm $q(u)=\tfrac32u^2-6u+9$ xác định và khả vi trên miền mở $D=\mathbb R$, và lồi trên $\mathbb R$ (Ví dụ 01.13(a) dưới đây chứng nhận). Tại $u^*=1$, $q'(1)=-3$, và với mọi $u\in C=[-1,1]$, $q'(1)(u-1)=-3(u-1)\ge0$ vì $u-1\le0$. Theo Hệ quả 01.27, $u^*=1$ là cực tiểu toàn cục trên $C$. Đây là phiên bản tổng quát của lập luận trong Nhận xét 01.3.

**(b) Hồi quy tuyến tính, Ví dụ 01.4.** Tại $w^*=(7/6,1/2)^T$, $\nabla J(w^*)=2X^T(Xw^*-y)=0$ theo phần kiểm tra lại của Ví dụ 01.4. Vì $J$ lồi (Ví dụ 01.13(c) dưới đây chứng nhận bằng Hessian), $w^*$ là cực tiểu toàn cục trên $\mathbb R^2$. Kết luận trùng với Mệnh đề 01.5(c), nhưng lần này chỉ dùng tính lồi, không dùng đẳng thức khai triển (3.2).

**(c) Hồi quy logistic, Ví dụ 01.7.** Hàm $L(w)=2\log(1+e^{-w})+\log(1+e^w)$ khả vi trên $\mathbb R$ và có $L''>0$, vì mỗi hạng có đạo hàm bậc hai dương theo Mệnh đề 01.9(c). Do đó $L$ lồi; tiêu chuẩn một biến "đạo hàm bậc hai dương thì lồi" được tạm chấp nhận ở đây và chứng minh ở Bổ đề 01.29 dưới đây. Tại $w^*=\log2$, $L'(\log2)=(2-2)/(1+2)=0$, nên theo Hệ quả 01.27, $w^*=\log2$ là cực tiểu toàn cục trên $\mathbb R$, khớp với lập luận xét dấu ở Ví dụ 01.7.

**Kiểm tra lại.** Ở (a), tại $u=-1$: $q'(1)(-1-1)=6\ge0$, và trực tiếp $q(-1)=\tfrac{33}2\ge\tfrac92$.
:::

**Trong học máy.** Trong huấn luyện, $f$ là hàm mất mát trên tập huấn luyện và $x^*$ là tham số mà thuật toán dừng lại. Hệ quả 01.27 cho biết nếu mất mát lồi theo tham số, như $J$ của hồi quy tuyến tính hay $L$ của hồi quy logistic, thì mọi điểm có gradient bằng không là nghiệm toàn cục.

Trong thực hành, người ta dừng thuật toán khi chuẩn gradient nhỏ thay vì yêu cầu gradient bằng không. Hệ quả 01.27 chỉ nói về gradient bằng không, và để suy ra một điểm có gradient nhỏ là gần tối ưu cần thêm giả thiết như lồi mạnh (Định nghĩa 01.39).

Với mạng nơ-ron, mất mát không lồi theo tham số, giả thiết của hệ quả bị vi phạm, và một điểm có gradient bằng không có thể là điểm yên ngựa. Tình huống 01.3 tính cụ thể một trường hợp như vậy. Trong Bài 05b, chúng ta nghiên cứu tốc độ mà hạ gradient tiến tới điểm có $\nabla f=0$ trong cả hai trường hợp.

### 7.5 Điều kiện bậc hai

Điều kiện bậc nhất vẫn đòi hỏi kiểm tra một bất đẳng thức cho mọi cặp điểm. Khi $f$ khả vi hai lần, ta có thể thay nó bằng một kiểm tra tại từng điểm trên ma trận Hessian.

Đầu tiên, chúng ta đưa bài toán nhiều biến về các hàm một biến trên các đường thẳng, sau đó xử lý hàm một biến bằng đạo hàm bậc hai. Định lý 01.30 cần hai bổ đề ứng với hai bước đó, và qua Bổ đề 01.29 nó dùng lại Định lý 01.26.

Về mặt hình học, điều kiện $\nabla^2f(x)\succeq0$ nghĩa là độ cong của $f$ theo mọi hướng $v$ tại $x$, tức $v^T\nabla^2f(x)v$, không âm, nên mọi hàm hạn chế $\varphi(t)=f(x+tv)$ của $f$ lên một đường thẳng có $\varphi''\ge0$. Hai bổ đề dưới đây biến trực giác này thành một chứng minh. Với hàm $q(u)=\tfrac32u^2-6u+9$ của Ví dụ 01.1, chỉ có một hướng và $q''(u)=3>0$ tại mọi $u$, nên parabol cong lên ở mọi điểm, khớp với các dây cung và tiếp tuyến đã tính ở Mục 7.1 và 7.4.

::: lemma Bổ đề 01.28 (Hạn chế lên đường thẳng)
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi, $f:C\to\mathbb R$. Với $x\in C$ và $v\in\mathbb R^d$, đặt $T_{x,v}=\{t\in\mathbb R\mid x+tv\in C\}$ và $\varphi_{x,v}(t)=f(x+tv)$ trên $T_{x,v}$.

**Kết luận.** $f$ lồi (lồi chặt) trên $C$ khi và chỉ khi với mọi $x\in C$ và mọi $v\ne0$, hàm một biến $\varphi_{x,v}$ lồi (lồi chặt) trên $T_{x,v}$.

**Điều kiện áp dụng.** $T_{x,v}$ là một khoảng vì là nghịch ảnh của tập lồi $C$ qua ánh xạ affine $t\mapsto x+tv$ (Mệnh đề 01.20(c)).

**Phạm vi.** Bổ đề chỉ chuyển bài toán về một chiều; nó không tự cho tiêu chuẩn kiểm tra.
:::

::: proof Chứng minh Bổ đề 01.28
**Bước 1 (chiều thuận).** Với $t_1,t_2\in T_{x,v}$ và $\theta\in[0,1]$, ta có

$$
x+(\theta t_1+(1-\theta)t_2)v=\theta(x+t_1v)+(1-\theta)(x+t_2v).
$$

Do đó (7.1) cho $f$ tại hai điểm $x+t_1v$, $x+t_2v$ trùng với (7.1) cho $\varphi_{x,v}$ tại $t_1,t_2$. Nếu $f$ lồi chặt và $t_1\ne t_2$, hai điểm khác nhau vì $v\ne0$, nên bất đẳng thức chặt được giữ.

**Bước 2 (chiều đảo).** Với $y,y'\in C$ khác nhau, chọn $x=y'$, $v=y-y'\ne0$. Khi đó $0,1\in T_{x,v}$ và

$$
\varphi_{x,v}(0)=f(y'),\qquad\varphi_{x,v}(1)=f(y),\qquad\varphi_{x,v}(\theta)=f(\theta y+(1-\theta)y').
$$

Tính lồi (lồi chặt) của $\varphi_{x,v}$ tại $0$ và $1$ cho đúng (7.1) (chặt) cho $f$ tại $y,y'$. Khi $y=y'$, hai vế của (7.1) bằng nhau. $\square$
:::

::: lemma Bổ đề 01.29 (Tiêu chuẩn bậc hai một biến)
**Giả thiết.** $T\subseteq\mathbb R$ là khoảng mở, $\varphi:T\to\mathbb R$ khả vi hai lần.

**Kết luận.**

- (a) $\varphi$ lồi khi và chỉ khi $\varphi''(t)\ge0$ với mọi $t\in T$.
- (b) Nếu $\varphi''(t)>0$ với mọi $t\in T$ thì $\varphi$ lồi chặt.

**Điều kiện áp dụng.** Khoảng mở để đạo hàm xác định tại mọi điểm.

**Phạm vi.** Chiều ngược của (b) sai: $\varphi(t)=t^4$ lồi chặt nhưng $\varphi''(0)=0$.
:::

::: proof Chứng minh Bổ đề 01.29
**Bước 1 (phần (a), chiều thuận: $\varphi'$ không giảm).** Theo Định lý 01.26 với $d=1$, với $s,t\in T$, ta có

$$
\varphi(s)\ge\varphi(t)+\varphi'(t)(s-t),\qquad\varphi(t)\ge\varphi(s)+\varphi'(s)(t-s).
$$

Cộng hai bất đẳng thức, ta được $0\ge(\varphi'(t)-\varphi'(s))(s-t)$, tức $(\varphi'(s)-\varphi'(t))(s-t)\ge0$. Suy ra $\varphi'$ không giảm.

**Bước 2 (phần (a), chiều thuận: $\varphi''\ge0$).** Đạo hàm của một hàm không giảm là không âm:

$$
\varphi''(t)=\lim_{s\to t}\frac{\varphi'(s)-\varphi'(t)}{s-t}\ge0 .
$$

**Bước 3 (phần (a), chiều đảo).** Nếu $\varphi''\ge0$ thì $\varphi'$ không giảm. Với $s\ne t$ thuộc $T$, định lý giá trị trung bình cho $\xi$ nằm giữa $s$ và $t$ với $\varphi(s)-\varphi(t)=\varphi'(\xi)(s-t)$. Xét hai trường hợp.

- Nếu $s>t$ thì $\xi>t$, $\varphi'(\xi)\ge\varphi'(t)$, và nhân với $s-t>0$, ta được $\varphi'(\xi)(s-t)\ge\varphi'(t)(s-t)$.
- Nếu $s<t$ thì $\xi<t$, $\varphi'(\xi)\le\varphi'(t)$, và nhân với $s-t<0$ đổi chiều, cho cùng bất đẳng thức.

Vậy $\varphi(s)\ge\varphi(t)+\varphi'(t)(s-t)$, và Định lý 01.26 cho $\varphi$ lồi.

**Bước 4 (phần (b)).** Nếu $\varphi''>0$ thì $\varphi'$ tăng chặt. Các bất đẳng thức $\varphi'(\xi)\ge\varphi'(t)$ và $\varphi'(\xi)\le\varphi'(t)$ ở Bước 3 trở thành chặt, nên $\varphi(s)>\varphi(t)+\varphi'(t)(s-t)$ với $s\ne t$. Phần cuối của Định lý 01.26 cho $\varphi$ lồi chặt. $\square$
:::

Ghép hai bổ đề trên, ta được điều kiện bậc hai cho hàm nhiều biến.

::: theorem Định lý 01.30 (Điều kiện bậc hai)
**Giả thiết.** $C\subseteq\mathbb R^d$ mở và lồi; $f:C\to\mathbb R$ khả vi hai lần.

**Kết luận.**

- (a) $f$ lồi khi và chỉ khi $\nabla^2f(x)\succeq0$ với mọi $x\in C$.
- (b) Nếu $\nabla^2f(x)\succ0$ với mọi $x\in C$ thì $f$ lồi chặt.

**Điều kiện áp dụng.** Miền mở; khi miền đóng (như đoạn của trường hợp điều khiển), áp dụng cho một miền mở chứa nó rồi hạn chế xuống theo Nhận xét 01.23.

**Phạm vi.** Chiều ngược của (b) sai, với phản ví dụ $f(x)=x^4$. Định lý không áp dụng cho hàm không khả vi hai lần.
:::

::: proof Chứng minh Định lý 01.30
**Bước 1 (đạo hàm bậc hai của hàm hạn chế).** Với $x\in C$ và $v\ne0$, tập $T_{x,v}$ là một khoảng mở chứa $0$, vì $C$ mở. Theo quy tắc dây chuyền (Bài 00), ta có

$$
\varphi_{x,v}''(t)=v^T\nabla^2f(x+tv)v .
$$

**Bước 2 (phần (a), chiều đảo).** Nếu $\nabla^2f\succeq0$ trên $C$ thì $\varphi_{x,v}''\ge0$ trên $T_{x,v}$ với mọi $x,v$. Do đó mọi $\varphi_{x,v}$ lồi theo Bổ đề 01.29(a), và $f$ lồi theo Bổ đề 01.28.

**Bước 3 (phần (a), chiều thuận).** Nếu $f$ lồi thì mọi $\varphi_{x,v}$ lồi theo Bổ đề 01.28, nên $\varphi_{x,v}''(0)=v^T\nabla^2f(x)v\ge0$ theo Bổ đề 01.29(a). Với $v=0$ hai vế bằng $0$, nên $\nabla^2f(x)\succeq0$.

**Bước 4 (phần (b)).** Nếu $\nabla^2f\succ0$ thì $\varphi_{x,v}''>0$ với mọi $v\ne0$. Do đó mọi $\varphi_{x,v}$ lồi chặt theo Bổ đề 01.29(b), và $f$ lồi chặt theo Bổ đề 01.28. $\square$
:::

So với Định lý 01.26, Định lý 01.30 cần thêm giả thiết khả vi hai lần nhưng thay bất đẳng thức cho mọi cặp điểm bằng một điều kiện tại từng điểm. Phần (a) là tương đương, còn phần (b) chỉ là điều kiện đủ.

**Trong học máy.** Hessian của hàm mất mát theo tham số mô tả độ cong của bề mặt mất mát. Với hồi quy tuyến tính, Hessian $2X^TX$ không phụ thuộc tham số, và Định lý 01.30 chứng nhận tính lồi bằng một phép kiểm tra trên dữ liệu.

Với mạng nơ-ron, Hessian thường có giá trị riêng âm tại một số điểm, và Định lý 01.30(a) cho thấy mất mát không lồi. Tình huống 01.3 tính một Hessian như vậy. Trong Bài 06c, chúng ta dùng độ cong này để xây dựng các phương pháp bậc hai.

![Hai khung. Khung trái: đồ thị một hàm lồi một biến luôn nằm trên tiếp tuyến tại x, minh họa f(y) lớn hơn hoặc bằng f(x) cộng gradient của f tại x nhân (y − x). Khung phải: các đường mức elip của một hàm hai biến và một đường thẳng theo hướng d; hàm hạn chế một biến phi(t) trên đường thẳng đó có đạo hàm bậc hai không âm, minh họa d chuyển vị H(x) d lớn hơn hoặc bằng 0 với mọi d, tương đương H(x) nửa xác định dương.](img/lec-01/first-second-order-convexity.svg)

Hình trên đặt hai tiêu chuẩn cạnh nhau, khung trái cho (7.2) và khung phải cho chứng minh của Định lý 01.30. Ở khung phải, hạn chế $f$ lên đường thẳng theo một hướng $d$ cho một hàm một biến $\varphi(t)$, và điều kiện bậc hai đòi $\varphi''\ge0$ theo mọi hướng.

Trong hình, $d$ là vector hướng, đóng vai trò của $v$ trong Định lý 01.30 (không phải số chiều). $H(x)$ là Hessian, và chữ viết tắt PSD nghĩa là nửa xác định dương (positive semidefinite).

::: example Ví dụ 01.13 (Điều kiện bậc hai trên các hàm của chương)
**Dữ kiện.** Định lý 01.30, cho $f$ khả vi hai lần trên tập mở lồi: (a) $f$ lồi khi và chỉ khi $\nabla^2f(x)\succeq0$ với mọi $x$; (b) nếu $\nabla^2f(x)\succ0$ với mọi $x$ thì $f$ lồi chặt. Các hàm được xét: $q(u)=(x_0+u-t)^2+\lambda u^2$ với $\lambda\ge0$ (Định nghĩa 01.1), bằng $\tfrac32u^2-6u+9$ với bộ số của Ví dụ 01.1 ($x_0=0$, $t=3$, $\lambda=\tfrac12$); $J(w)=\lVert Xw-y\rVert_2^2$ với $X\in\mathbb R^{n\times d}$ (Định nghĩa 01.4); $\ell(m)=\log(1+e^{-m})$ (Định nghĩa 01.8).

**(a) Trường hợp điều khiển.** Trên $\mathbb R$, $q''(u)=2(1+\lambda)\ge2>0$ khi $\lambda\ge0$, nên $q$ lồi chặt trên $\mathbb R$ theo Định lý 01.30(b), và do đó lồi chặt trên đoạn $C$.

**(b) Dạng toàn phương.** Với $Q\in\mathbb R^{d\times d}$ đối xứng, $c\in\mathbb R^d$ và $f(x)=\tfrac12x^TQx+c^Tx$, ta có $\nabla^2f(x)=Q$. Vậy $f$ lồi khi và chỉ khi $Q\succeq0$, và lồi chặt khi $Q\succ0$. Với $Q=\begin{bmatrix}3&1\\1&2\end{bmatrix}$,

$$
v^TQv=3v_1^2+2v_1v_2+2v_2^2=(v_1+v_2)^2+2v_1^2+v_2^2>0\quad(v\ne0),
$$

nên $Q\succ0$.

**(c) Hồi quy tuyến tính.** $\nabla^2J(w)=2X^TX$ theo Mệnh đề 01.5(b), và $v^T(2X^TX)v=2\lVert Xv\rVert_2^2\ge0$, nên $J$ lồi. $J$ lồi chặt khi $\operatorname{rank}X=d$, vì khi đó $Xv\ne0$ với mọi $v\ne0$.

**(d) Hàm mũ và mất mát logistic.** $(e^t)''=e^t>0$ và $\ell''(m)>0$ theo Mệnh đề 01.9(c), nên $e^t$ và $\ell$ lồi chặt trên $\mathbb R$.

**(e) Hàm $x^4$.** $f(x)=x^4$ có $f''(x)=12x^2\ge0$, nên lồi. Nó còn lồi chặt, dù $f''(0)=0$: đạo hàm $f'(x)=4x^3$ tăng chặt trên $\mathbb R$, và chứng minh Bổ đề 01.29(b) chỉ dùng tính tăng chặt của đạo hàm bậc nhất, không dùng $\varphi''>0$ tại mọi điểm. Đây là phản ví dụ cho chiều ngược của Định lý 01.30(b).

**Kiểm tra lại.** Ở (b), hai giá trị riêng của $Q$ là $\tfrac{5\pm\sqrt5}2$, cả hai dương. Ở (a) với $\lambda=\tfrac12$, $q''=3$, khớp với hệ số $\tfrac32$ của $u^2$ trong Ví dụ 01.1.
:::

Ví dụ 01.13(e) cho thấy phần (b) của Định lý 01.30 chỉ là điều kiện đủ, vì Hessian suy biến tại một điểm không loại trừ tính lồi chặt. Điều này không ảnh hưởng tới chương, do mọi hàm cần chứng nhận lồi chặt ở đây đều có Hessian xác định dương.

::: exercise Bài tập 01.10
(a) Dùng điều kiện bậc nhất (7.2), $f(y)\ge f(x)+\nabla f(x)^T(y-x)$ với mọi $x,y$ (dấu $>$ khi $x\ne y$ cho lồi chặt), chứng minh $f(x)=e^x$ lồi chặt trên $\mathbb R$.

(b) Cho $f(x)=(x_1-2)^2+(x_2+1)^2$ trên hộp $C=[0,1]^2$. Dùng điều kiện (7.3), $\nabla f(x^*)^T(x-x^*)\ge0$ với mọi $x\in C$ (đủ cho tối ưu khi $f$ lồi, khả vi), chứng minh $x^*=(1,0)$ là nghiệm và tính giá trị tối ưu; chứng minh nghiệm duy nhất.
:::

::: hint
(a) Đặt $s=y-x$; sau khi chia cho $e^x>0$, (7.2) trở thành $e^s\ge1+s$. Khảo sát $g(s)=e^s-1-s$. (b) Tính $\nabla f(x^*)$ rồi xét dấu của từng thành phần của $x-x^*$ trên hộp.
:::

::: solution
**(a) Bước 1 (quy về một bất đẳng thức).** $f'(x)=e^x$, nên (7.2) là $e^y\ge e^x+e^x(y-x)$. Chia cho $e^x>0$ và đặt $s=y-x$, ta cần chứng minh $e^s\ge1+s$.

**(a) Bước 2 (khảo sát $g$).** Hàm $g(s)=e^s-1-s$ có $g'(s)=e^s-1$, âm khi $s<0$ và dương khi $s>0$. Do đó $g$ giảm chặt trên $(-\infty,0]$, tăng chặt trên $[0,\infty)$, và $g(s)>g(0)=0$ khi $s\ne0$. Vậy (7.2) đúng với dấu $>$ khi $x\ne y$, và phần cuối của Định lý 01.26 cho $e^x$ lồi chặt.

**(b) Bước 1 (tính lồi).** $f$ xác định trên miền mở $\mathbb R^2$ chứa $C$, có $\nabla^2f=2I_2\succ0$, nên lồi theo Định lý 01.30.

**(b) Bước 2 (kiểm tra (7.3)).** $\nabla f(x)=(2(x_1-2),\ 2(x_2+1))$, nên $\nabla f(1,0)=(-2,2)$. Với $x\in C$, ta có

$$
\nabla f(x^*)^T(x-x^*)=-2(x_1-1)+2x_2=2(1-x_1)+2x_2\ge0,
$$

vì $x_1\le1$ và $x_2\ge0$. Theo Hệ quả 01.27, $x^*$ là cực tiểu toàn cục trên $C$, với $f(x^*)=1+1=2$.

**(b) Bước 3 (duy nhất).** Trên $C$, $2-x_1\ge1$ và $x_2+1\ge1$, nên $f(x)\ge2$ với dấu bằng khi và chỉ khi $x_1=1$ và $x_2=0$.
:::

### 7.6 Các phép toán bảo toàn tính lồi

Hessian của $L$ phụ thuộc $w$ qua từng mẫu, nên phép tính trực tiếp phức tạp. Thay vào đó, chúng ta xây dựng hàm lồi từ các khối đã biết bằng các phép toán bảo toàn tính lồi.

Về mặt ý tưởng, dây cung của tổng hai hàm là tổng hai dây cung, nên nếu đồ thị của mỗi hàm không vượt lên trên dây cung của nó thì đồ thị của tổng cũng vậy. Một phép đổi biến affine biến đoạn thẳng thành đoạn thẳng, nên giữ nguyên quan hệ giữa đồ thị và dây cung. Các quan sát này chưa phải định lý, và định lý sau phát biểu chúng chính xác.

::: theorem Định lý 01.31 (Các phép toán bảo toàn tính lồi của hàm)
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi; $f_1,\ldots,f_k:C\to\mathbb R$ lồi; $\alpha_1,\ldots,\alpha_k\ge0$; $g:\mathbb R^p\to\mathbb R$ lồi; $A\in\mathbb R^{p\times d}$, $b\in\mathbb R^p$.

**Kết luận.**

- (a) Tổng không âm $\sum_j\alpha_jf_j$ lồi trên $C$. Nếu thêm một $f_j$ lồi chặt với $\alpha_j>0$ thì tổng lồi chặt.
- (b) Hợp với ánh xạ affine $x\mapsto g(Ax+b)$ lồi trên $\mathbb R^d$.
- (c) Cực đại từng điểm $x\mapsto\max_jf_j(x)$ lồi trên $C$.

**Điều kiện áp dụng.** Hệ số không âm ở (a); ánh xạ bên trong affine ở (b).

**Phạm vi.** Hợp ở (b) không giữ tính lồi chặt khi $A$ không có hạng cột đầy đủ; hợp với ánh xạ phi tuyến và tích của hai hàm lồi nói chung không lồi (Nhận xét 01.32).
:::

::: proof Chứng minh Định lý 01.31
Gọi $z=\theta x+(1-\theta)y$ với $\theta\in[0,1]$.

**(a) Tổng không âm.** Nhân (7.1) của từng $f_j$ với $\alpha_j\ge0$ (phép nhân với số không âm giữ chiều bất đẳng thức) rồi cộng lại, ta được

$$
\textstyle\sum_j\alpha_jf_j(z)\le\theta\sum_j\alpha_jf_j(x)+(1-\theta)\sum_j\alpha_jf_j(y).
$$

Nếu $f_{j_0}$ lồi chặt và $\alpha_{j_0}>0$, thì với $x\ne y$ và $\theta\in(0,1)$ bất đẳng thức của hạng $j_0$ là chặt và được nhân với số dương, nên tổng chặt.

**(b) Hợp affine.** Đặt $h(x)=g(Ax+b)$. Vì $Az+b=\theta(Ax+b)+(1-\theta)(Ay+b)$, (7.1) của $g$ tại hai điểm $Ax+b$ và $Ay+b$ cho $h(z)\le\theta h(x)+(1-\theta)h(y)$.

**(c) Cực đại từng điểm.** Với mỗi $j$, ta có

$$
\begin{aligned}
f_j(z)&\le\theta f_j(x)+(1-\theta)f_j(y)\\
&\le\theta\max_if_i(x)+(1-\theta)\max_if_i(y).
\end{aligned}
$$

Lấy cực đại theo $j$ ở vế trái. $\square$
:::

Định lý 01.31 cho cách xây dựng hàm lồi từ các khối đã được chứng nhận, thay vì thêm một tiêu chuẩn kiểm tra mới. So với Định lý 01.30, nó không cần khả vi, nên chứng nhận được cả hàm có điểm gãy như cực đại của các hàm affine.

Tuy nhiên, định lý chỉ áp dụng khi hàm có cấu trúc ghép đã biết, và không cho kết luận ngược, vì một hàm lồi không nhất thiết phân tích được thành các khối của định lý.

**Trong học máy.** Hàm mất mát thực nghiệm có dạng $\frac1n\sum_i\ell(g(a_i;w),y_i)$, trong đó $g(a;w)$ là hàm dự đoán của mô hình với tham số $w$, còn $\ell(\cdot,y)$ là mất mát của một mẫu có nhãn $y$. Với hồi quy logistic, $\ell(s,y)=\log(1+e^{-ys})$, trùng với hàm $\ell$ của Định nghĩa 01.8 viết theo biên $m=ys$. Biểu thức là một tổng không âm theo mẫu.

Khi mô hình tuyến tính theo tham số, $g(a_i;w)=a_i^Tw$, mỗi hạng là hợp của một hàm mất mát lồi với ánh xạ tuyến tính. Định lý 01.31(a), (b) khi đó cho tính lồi của mất mát với mọi dữ liệu, và Định lý 01.30 chỉ cần cho khối một biến.

Khi $g$ phi tuyến theo tham số, như ở mạng nơ-ron, phép hợp ở (b) không còn affine, nên định lý không còn cho kết luận (Tình huống 01.3).

::: example Ví dụ 01.14 (Chứng nhận tính lồi của các hàm mất mát)
**Dữ kiện.** Các hàm mất mát: $J(w)=\sum_i(x_i^Tw-y_i)^2$ (Định nghĩa 01.4); $L(w)=\sum_i\ell(y_ia_i^Tw)$ với $\ell(m)=\log(1+e^{-m})$, $\ell''(m)=\frac{e^m}{(1+e^m)^2}>0$ (Định nghĩa 01.8, Mệnh đề 01.9(c)). Định lý 01.31: (a) tổng với hệ số không âm của các hàm lồi là lồi, và lồi chặt nếu có một hạng lồi chặt với hệ số dương; (b) $x\mapsto g(Ax+b)$ lồi khi $g$ lồi; (c) cực đại từng điểm của các hàm lồi là lồi.

**(a) Hồi quy tuyến tính.** Hàm $s\mapsto s^2$ lồi (Ví dụ 01.11(a)) và $w\mapsto x_i^Tw-y_i$ affine, nên mỗi $(x_i^Tw-y_i)^2$ lồi theo Định lý 01.31(b). $J$ là tổng với hệ số $1$, lồi theo (a). Kết luận trùng với Ví dụ 01.13(c).

**(b) Hồi quy logistic.** $\ell$ lồi theo Ví dụ 01.13(d) và $w\mapsto y_ia_i^Tw$ tuyến tính, nên mỗi $\ell(y_ia_i^Tw)$ lồi theo (b), và $L$ lồi theo (a). Hessian xác nhận điều này:

$$
\nabla^2L(w)=\sum_i\ell''(m_i)a_ia_i^T,
$$

vì $y_i^2=1$. Đây là tổng không âm của các ma trận nửa xác định dương $a_ia_i^T$.

**(c) Mất mát bản lề.** Mất mát bản lề (hinge) $h(m)=\max(0,1-m)$ của máy vector hỗ trợ là cực đại của hai hàm affine, lồi theo (c), dù không khả vi tại $m=1$. Định lý 01.30 không áp dụng được cho nó, nhưng Định lý 01.31 thì có.

**(d) Chính quy hóa.** Hàm $L(w)+\tfrac\mu2\lVert w\rVert_2^2$ với $\mu>0$, được ký hiệu $L_\mu$ ở Định nghĩa 01.42 của Mục 8, lồi chặt theo (a). Lý do là $L$ lồi và $\tfrac\mu2\lVert w\rVert_2^2=\tfrac\mu2\sum_jw_j^2$ lồi chặt (Hessian $\mu I_d\succ0$).

**Kiểm tra lại.** Với Ví dụ 01.6 ($d=1$, $a_1=1$, $y_1=+1$, $a_2=-1$, $y_2=-1$): công thức ở (b) cho $L''(w)=\ell''(w)\cdot1+\ell''(w)\cdot1=2e^w/(1+e^w)^2$, trùng với đạo hàm của $L'(w)=-2/(1+e^w)$.
:::

::: remark Nhận xét 01.32 (Các phép toán không bảo toàn tính lồi)
**Hệ số âm.** Hệ số âm phá tính lồi: $-x^2$ không lồi.

**Tích.** Tích hai hàm lồi nói chung không lồi: $x$ và $x^2$ đều lồi trên $\mathbb R$ nhưng tích $x^3$ không lồi. Với $x=-2$, $y=0$, $\theta=\tfrac12$, vế trái của (7.1) là $(-1)^3=-1$ còn vế phải là $\tfrac12(-8)+0=-4$.

**Hợp không affine.** Hợp của hàm lồi với hàm lồi không affine nói chung không lồi. Hàm $g(s)=(s-1)^2$ và $s=x^2$ đều lồi nhưng $(x^2-1)^2$ có hai cực tiểu $x=\pm1$ và một cực đại địa phương tại $0$, nên không lồi. Cụ thể, với $x=-1$, $y=1$, $\theta=\tfrac12$, giá trị tại trung điểm là $f(0)=1>0=\tfrac12f(-1)+\tfrac12f(1)$, vi phạm (7.1).

**Tính lồi chặt qua hợp affine.** Hợp affine không giữ tính lồi chặt: $\ell(w_1+w_2)$ là hợp của hàm lồi chặt $\ell$ với ánh xạ $w\mapsto w_1+w_2$, nhưng không đổi dọc đường thẳng $w_1+w_2=\text{const}$, nên không lồi chặt trên $\mathbb R^2$.
:::

::: exercise Bài tập 01.11
Dùng Định lý 01.30 để xác định tính lồi của các hàm sau trên $\mathbb R^2$:

(a) $f(x)=x_1^2+x_1x_2+x_2^2$;

(b) $g(x)=x_1^2-x_2^2$;

(c) $h(x)=e^{x_1+2x_2}$.
:::

::: hint
Tính Hessian rồi kiểm tra dấu của $v^THv$; với ma trận $2\times2$ đối xứng, xác định dương khi và chỉ khi phần tử góc trên và định thức đều dương. Ở (c), có thể dùng Định lý 01.31(b) thay cho Hessian.
:::

::: solution
**(a)** $\nabla^2f=\begin{bmatrix}2&1\\1&2\end{bmatrix}$, với phần tử góc trên $2>0$ và định thức $3>0$, nên xác định dương; $f$ lồi chặt theo Định lý 01.30(b). Kiểm tra: $v^THv=2v_1^2+2v_1v_2+2v_2^2=(v_1+v_2)^2+v_1^2+v_2^2>0$ khi $v\ne0$.

**(b)** $\nabla^2g=\operatorname{diag}(2,-2)$. Với $v=(0,1)$, $v^THv=-2<0$, nên $g$ không lồi theo Định lý 01.30(a). Phản ví dụ trực tiếp: $x=(0,-1)$, $y=(0,1)$, $\theta=\tfrac12$ cho $g(0)=0>\tfrac12(-1)+\tfrac12(-1)=-1$.

**(c)** $h$ là hợp của hàm lồi $e^s$ với ánh xạ tuyến tính $x\mapsto x_1+2x_2$, nên lồi theo Định lý 01.31(b). Hessian $e^{x_1+2x_2}\begin{bmatrix}1&2\\2&4\end{bmatrix}$ có định thức $0$, nên chỉ nửa xác định dương. $h$ không lồi chặt vì $h$ không đổi dọc đường thẳng $x_1+2x_2=\text{const}$.
:::

Như vậy, Định nghĩa 01.22 nêu hàm lồi, và Nhận xét 01.23 cho phép hạn chế nó xuống tập con lồi. Định nghĩa 01.24 và Mệnh đề 01.25 chuyển tính lồi của hàm thành tính lồi của tập mức dưới. Định lý 01.26 cho điều kiện bậc nhất, và Hệ quả 01.27 biến nó thành điều kiện đủ tối ưu. Bổ đề 01.28 và 01.29 đưa bài toán về một chiều để chứng minh điều kiện bậc hai (Định lý 01.30), còn Định lý 01.31 cho các phép ghép. Dùng các kết quả này, Ví dụ 01.13 và 01.14 chứng nhận $q$ lồi chặt, $J$ lồi (lồi chặt khi hạng cột đầy đủ), $L$ lồi và $L+\tfrac\mu2\lVert w\rVert_2^2$ lồi chặt, tức câu hỏi 3 của Nhận xét 01.17 đã có câu trả lời cho cả ba trường hợp.

Bộ tiêu chuẩn này chứng nhận được hàm mục tiêu lồi, và Hệ quả 01.27 đã cho một kết luận toàn cục dưới giả thiết khả vi. Bộ tiêu chuẩn này còn ba thiếu hụt. Kết luận toàn cục cho cực tiểu địa phương nói chung, khi không có tính khả vi, chưa được chứng minh. Tính lồi không bảo đảm sự tồn tại nghiệm, vì hàm $L$ của Ví dụ 01.6 lồi chặt mà không có nghiệm. Tính lồi chặt chưa được liên hệ với tính duy nhất. Trong Mục 8, chúng ta giải quyết cả ba thiếu hụt này.

## 8. Tính toàn cục, sự tồn tại và tính duy nhất của nghiệm

Ba hàm một biến sau cho thấy ba thiếu hụt về toàn cục, tồn tại và duy nhất độc lập với nhau.

- Hàm $e^x$ trên $\mathbb R$ lồi chặt nhưng không có cực tiểu: giá trị giảm về $0$ khi $x\to-\infty$ mà không đạt.
- Hàm hằng $0$ trên $[-1,1]$ lồi và có cực tiểu, nhưng mọi điểm đều là cực tiểu.
- Hàm $x^2$ trên $\mathbb R$ có đúng một cực tiểu tại $0$.

Ba hàm đều lồi, nên riêng tính lồi không phân biệt được ba trường hợp: không có nghiệm, có vô số nghiệm và có đúng một nghiệm.

Trong mục này, chúng ta chứng minh định lý cực tiểu địa phương là toàn cục và nối tính lồi chặt với tính duy nhất. Sau đó, chúng ta phát biểu hai điều kiện đủ cho sự tồn tại: miền đóng, bị chặn (định lý Weierstrass) và hàm cưỡng bức (coercive).

![Ba đồ thị. Trái: hàm e mũ x trên toàn trục số, cận dưới đúng bằng 0 nhưng không có nghiệm. Giữa: hàm hằng 0 trên đoạn từ −1 đến 1, mọi điểm của đoạn đều tối ưu. Phải: hàm x bình phương trên toàn trục số, nghiệm duy nhất x sao bằng 0.](img/lec-01/existence-and-uniqueness.svg)

Hình trên đặt ba hàm cạnh nhau.

- Đồ thị trái tiệm cận trục hoành nhưng không đạt giá trị $0$, giống Ví dụ 01.6.
- Đồ thị giữa phẳng trên cả đoạn, giống hàm $J$ với ma trận $X'$ của Ví dụ 01.5 dọc theo hướng $\ker X'$.
- Đồ thị phải có đúng một điểm cực tiểu, giống trường hợp điều khiển.

### 8.1 Tính toàn cục của cực tiểu địa phương trong bài toán lồi

Câu hỏi 4 của Nhận xét 01.17 là khi nào một cực tiểu địa phương là cực tiểu toàn cục, và Ví dụ 01.8 cho thấy điều này không phải luôn đúng khi hàm không lồi. Khi cả miền và hàm đều lồi, câu trả lời được cho bởi định lý sau. Chứng minh chỉ dùng Định nghĩa 01.13, Định nghĩa 01.18 và Định nghĩa 01.22, không cần khả vi.

::: theorem Định lý 01.33 (Cực tiểu địa phương của hàm lồi là cực tiểu toàn cục)
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi; $f:C\to\mathbb R$ lồi; $x^*\in C$ là cực tiểu địa phương của $f$ tương đối với $C$.

**Kết luận.** $x^*$ là cực tiểu toàn cục của $f$ trên $C$.

**Điều kiện áp dụng.** Cần cả hai giả thiết lồi: miền và hàm.

**Phạm vi.** Định lý không khẳng định cực tiểu tồn tại, cũng không khẳng định nó duy nhất.
:::

::: proof Chứng minh Định lý 01.33
**Bước 1 (giả thiết phản chứng).** Giả sử ngược lại có $y\in C$ với $f(y)<f(x^*)$. Gọi $r>0$ là bán kính trong Định nghĩa 01.13. Với $\theta\in(0,1]$, đặt $z_\theta=(1-\theta)x^*+\theta y$.

**Bước 2 (tổ hợp lồi khả thi và tốt hơn).** Vì $C$ lồi (Định nghĩa 01.18), $z_\theta\in C$. Vì $f$ lồi, theo (7.1) ta có

$$
\begin{aligned}
f(z_\theta)&\le(1-\theta)f(x^*)+\theta f(y)\\
&<(1-\theta)f(x^*)+\theta f(x^*)\\
&=f(x^*),
\end{aligned}
$$

trong đó bất đẳng thức chặt dùng $f(y)<f(x^*)$ và $\theta>0$.

**Bước 3 (tổ hợp lồi nằm trong lân cận).** Mặt khác $\lVert z_\theta-x^*\rVert_2=\theta\lVert y-x^*\rVert_2$, nên với $\theta\le r/\lVert y-x^*\rVert_2$ và $\theta\le1$, điểm $z_\theta$ nằm trong lân cận bán kính $r$ của $x^*$. Khi đó $z_\theta$ là một điểm khả thi gần $x^*$ có giá trị nhỏ hơn $f(x^*)$, mâu thuẫn với tính cực tiểu địa phương. $\square$
:::

Chứng minh dùng mỗi giả thiết lồi ở đúng một bước, trong đó miền lồi bảo đảm $z_\theta$ khả thi, còn hàm lồi bảo đảm $f(z_\theta)<f(x^*)$. Hai phản ví dụ sau cho thấy bỏ một trong hai giả thiết thì kết luận sai.

- Bỏ giả thiết miền lồi: tập vùng chết của Mục 6 với $f(u)=(u-1)^2$ có cực tiểu địa phương $u=-\tfrac12$ không toàn cục, với giá trị $\tfrac94$ trong khi $u=1$ cho $0$.
- Bỏ giả thiết hàm lồi: Ví dụ 01.8 có cực tiểu địa phương $x=1$ không toàn cục trên đoạn lồi $[-3,3]$.

So với Hệ quả 01.27, Định lý 01.33 không cần khả vi, nhưng cần biết trước $x^*$ là cực tiểu địa phương.

Áp dụng Mệnh đề 01.25 cho tập mức dưới ở đúng mức $p^*$, ta có hệ quả sau.

::: corollary Hệ quả 01.34 (Tập nghiệm của bài toán lồi là tập lồi)
**Giả thiết.** $C$ lồi, $f:C\to\mathbb R$ lồi.

**Kết luận.** Tập nghiệm $S^*=\{x\in C\mid f(x)=p^*\}$ là tập lồi (có thể rỗng).

**Điều kiện áp dụng.** Cần cả miền lồi và hàm lồi; tập vùng chết của Mục 6, một miền không lồi, cho tập nghiệm không lồi $\{-\tfrac12,\tfrac12\}$ với hàm $u^2$.

**Phạm vi.** Không nói gì về $S^*$ rỗng hay không.
:::

::: proof Chứng minh Hệ quả 01.34
Xét ba trường hợp của $p^*$.

- Nếu $p^*=+\infty$ thì $C$ rỗng nên $S^*$ rỗng, lồi.
- Nếu $p^*=-\infty$ thì không điểm nào có giá trị bằng $p^*$, nên $S^*$ rỗng, lồi.
- Nếu $p^*$ hữu hạn thì $S^*=\{x\in C\mid f(x)\le p^*\}$, vì không điểm nào có giá trị nhỏ hơn $p^*$. Đây là tập mức dưới $S_{p^*}(f)$, lồi theo Mệnh đề 01.25. $\square$
:::

Hệ quả 01.34 loại trừ khả năng một bài toán lồi có đúng hai nghiệm tách rời: nếu có hai nghiệm thì cả đoạn nối chúng là nghiệm. Tập nghiệm $S^*$ ở Ví dụ 01.5 là một đường thẳng, phù hợp với hệ quả. Tập nghiệm $\{-\tfrac12,\tfrac12\}$ của hàm $u^2$ trên tập vùng chết thì không lồi, vì miền không lồi.

**Trong học máy.** Với mất mát lồi theo tham số, như hồi quy tuyến tính, hồi quy logistic hay máy vector hỗ trợ, Định lý 01.33 cho phép dừng thuật toán tại một cực tiểu địa phương mà không phải tìm thêm. Lý do là mọi cực tiểu địa phương đều cho cùng giá trị mất mát nhỏ nhất. Hệ quả 01.34 cho thấy các nghiệm khác nhau, nếu có, tạo thành một tập lồi, nên mọi tổ hợp lồi của hai nghiệm vẫn là nghiệm.

Với mạng nhiều tầng, mất mát không lồi theo tham số và cả hai kết luận đều có thể sai. Tình huống 01.3 cho một ví dụ với hai nghiệm mà trung điểm không phải nghiệm.

### 8.2 Tính duy nhất

Câu hỏi 6 là khi nào có nhiều nhất một nghiệm. Đồ thị giữa của hình đầu mục cho thấy tính lồi không đủ, vì hàm lồi có thể phẳng trên cả một đoạn. Lồi chặt loại trừ đoạn phẳng, và do đó cho câu trả lời theo định lý sau.

::: theorem Định lý 01.35 (Lồi chặt cho nhiều nhất một nghiệm)
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi; $f:C\to\mathbb R$ lồi chặt.

**Kết luận.** $f$ có nhiều nhất một điểm cực tiểu toàn cục trên $C$.

**Điều kiện áp dụng.** Cần miền lồi để trung điểm của hai nghiệm khả thi; lồi không chặt không đủ, xem Ví dụ 01.5 với vô số nghiệm.

**Phạm vi.** "Nhiều nhất một" bao gồm cả trường hợp không có nghiệm nào; định lý không cho sự tồn tại.
:::

::: proof Chứng minh Định lý 01.35
**Bước 1 (giả thiết phản chứng).** Giả sử có hai nghiệm khác nhau $x\ne y$ trong $C$, cùng giá trị $p^*$.

**Bước 2 (trung điểm tốt hơn).** Trung điểm $z=\tfrac12x+\tfrac12y$ thuộc $C$ vì $C$ lồi. Theo định nghĩa lồi chặt với $\theta=\tfrac12\in(0,1)$, ta có

$$
f(z)<\tfrac12f(x)+\tfrac12f(y)=p^* .
$$

Điều này mâu thuẫn với việc $p^*$ là giá trị nhỏ nhất của $f$ trên $C$. $\square$
:::

Định lý 01.35 và Định lý 01.33 dùng cùng một kỹ thuật, so sánh giá trị tại tổ hợp lồi, nhưng cho hai kết luận khác loại. Định lý 01.35 cần giả thiết mạnh hơn (lồi chặt) và cho kết luận về số lượng nghiệm. Định lý không khẳng định sự tồn tại nghiệm, như ví dụ hàm $e^x$ cho thấy.

Với hàm khả vi hai lần trên miền mở, giả thiết lồi chặt thường được kiểm tra qua Định lý 01.30(b). Chẳng hạn $J$ lồi chặt khi $\operatorname{rank}X=d$, và Định lý 01.35 cho lại phần "nếu" của Mệnh đề 01.6(c) bằng một lập luận khác.

**Trong học máy.** Khi mất mát lồi chặt và có nghiệm, nghiệm là duy nhất (Định lý 01.35). Mọi thuật toán hội tụ tới một cực tiểu khi đó đều cho cùng một tham số, và tham số đó có thể được diễn giải.

Sự tồn tại cần thêm giả thiết (Định lý 01.38, Hệ quả 01.41), vì mất mát logistic của Ví dụ 01.6 lồi chặt mà không có nghiệm.

Khi mất mát chỉ lồi, như hồi quy tuyến tính với đặc trưng phụ thuộc tuyến tính, các lần huấn luyện có thể kết thúc tại các tham số khác nhau trong tập nghiệm lồi $S^*$ (Hệ quả 01.34) với cùng sai số. Chính quy hóa bậc hai làm mất mát lồi chặt và loại bỏ sự mơ hồ này (Ví dụ 01.15).

### 8.3 Sự tồn tại: miền đóng, bị chặn và hàm cưỡng bức

Câu hỏi 5 là khi nào cận dưới đúng được đạt. Hàm $e^x$ trên $\mathbb R$ cho thấy hai nguyên nhân khiến cận dưới đúng không đạt: miền không bị chặn, nên chuẩn của dãy cực tiểu hóa có thể tiến ra vô cực, và hàm không tăng ra vô cực theo hướng đó. Trường hợp miền bị chặn được giải quyết bằng kết quả cổ điển sau.

::: theorem Định lý 01.36 (Weierstrass)
**Giả thiết.** $C\subseteq\mathbb R^d$ không rỗng, đóng và bị chặn; $f:C\to\mathbb R$ liên tục.

**Kết luận.** $f$ đạt giá trị nhỏ nhất trên $C$: có $x^*\in C$ với $f(x^*)=\inf_{x\in C}f(x)$, và giá trị này hữu hạn.

**Điều kiện áp dụng.** Cả ba tính chất của $C$ và tính liên tục của $f$ đều cần.

**Phạm vi.** Không cần tính lồi; không cho tính duy nhất.
:::

Chúng ta không đi sâu vào chứng minh của định lý này, vì nó nằm ngoài phạm vi học phần. Chứng minh có thể tìm thấy trong Rudin (1976), *Principles of Mathematical Analysis*, Định lý 2.41, trang 40 (tập đóng và bị chặn trong $\mathbb R^d$ là compact) và Định lý 4.16, trang 89 (hàm liên tục trên tập compact đạt giá trị nhỏ nhất).

Ý tưởng chính gồm ba bước.

1. Lấy một dãy cực tiểu hóa $x_k\in C$ với $f(x_k)\to\inf_Cf$ (Định nghĩa 01.10).
2. Vì $C$ bị chặn, dãy có một dãy con hội tụ (định lý Bolzano–Weierstrass); vì $C$ đóng, giới hạn $x^*$ thuộc $C$.
3. Vì $f$ liên tục, $f(x^*)$ bằng giới hạn của $f$ trên dãy con, tức bằng $\inf_Cf$.

Mỗi giả thiết của định lý loại trừ một nguyên nhân, như các phản ví dụ sau cho thấy.

- Bỏ "bị chặn": $e^x$ trên $\mathbb R$ không đạt cận dưới đúng.
- Bỏ "đóng": $x$ trên $(0,1]$ có cận dưới đúng $0$ không đạt.
- Bỏ "liên tục": hàm bằng $x$ trên $(0,1]$ và bằng $1$ tại $0$ cũng không đạt cận dưới đúng $0$ trên $[0,1]$.

**Trong học máy.** Định lý 01.36 không cần tính lồi, nên áp dụng được cả cho mạng nơ-ron. Nếu tham số bị ràng buộc trong một quả cầu $\{w\mid\lVert w\rVert_2\le r\}$, một tập không rỗng, đóng và bị chặn, thì mọi hàm mất mát liên tục theo tham số đều đạt giá trị nhỏ nhất trên quả cầu đó.

Tuy nhiên, định lý chỉ khẳng định nghiệm tồn tại, không cho cách tìm nghiệm và không bảo đảm cực tiểu địa phương mà thuật toán tìm được là toàn cục khi mất mát không lồi. Bài tập 01.21 áp dụng định lý cho hồi quy logistic có ràng buộc chuẩn.

Hai trường hợp hồi quy có miền $\mathbb R^d$, không bị chặn, nên Định lý 01.36 không áp dụng trực tiếp. Điều kiện sau thay tính bị chặn của miền bằng một tính chất của hàm.

Về mặt trực quan, nếu $f(x)\to+\infty$ khi $\lVert x\rVert_2\to\infty$ thì mọi điểm có chuẩn đủ lớn đều có giá trị hàm lớn hơn giá trị tại một điểm cố định, nên chỉ cần tìm nghiệm trong một vùng bị chặn. Định nghĩa sau làm chính xác điều kiện này.

::: definition Định nghĩa 01.37 (Hàm cưỡng bức)
Cho $C\subseteq\mathbb R^d$ không bị chặn. Hàm $f:C\to\mathbb R$ là cưỡng bức (coercive) trên $C$ nếu $f(x)\to+\infty$ khi $\lVert x\rVert_2\to\infty$ với $x\in C$; nghĩa là với mọi $M$ có $R$ sao cho $f(x)>M$ với mọi $x\in C$ thỏa $\lVert x\rVert_2>R$.
:::

Hàm $x^2$ cưỡng bức trên $\mathbb R$. Hàm $e^x$ không cưỡng bức, vì $e^x\to0$ khi $x\to-\infty$. Hàm $J$ với ma trận $X'$ của Ví dụ 01.5 không cưỡng bức, vì $J$ giữ giá trị $\tfrac16$ dọc theo đường thẳng $(7/6,\ c,\ 1/2-c)^T$ khi $c\to\infty$.

Tính cưỡng bức độc lập với tính lồi, vì $x^4-2x^2$ cưỡng bức mà không lồi (Bài tập 01.12), còn $e^x$ lồi mà không cưỡng bức. Với khái niệm này, sự tồn tại nghiệm trên miền không bị chặn được phát biểu như sau.

::: theorem Định lý 01.38 (Tồn tại nghiệm với hàm cưỡng bức)
**Giả thiết.** $C\subseteq\mathbb R^d$ không rỗng và đóng; $f:C\to\mathbb R$ liên tục và cưỡng bức trên $C$ (khi $C$ bị chặn, chỉ cần liên tục).

**Kết luận.** $f$ đạt giá trị nhỏ nhất trên $C$.

**Điều kiện áp dụng.** Cần $C$ đóng để tập mức dưới dùng trong chứng minh là tập đóng, và $f$ liên tục; không cần tính lồi. Với $C=\mathbb R^d$, tính cưỡng bức là điều kiện thay cho tính bị chặn của miền trong Định lý 01.36.

**Phạm vi.** Không cho tính duy nhất.
:::

::: proof Chứng minh Định lý 01.38
**Bước 1 (quy về tập mức dưới).** Nếu $C$ bị chặn, kết luận là Định lý 01.36. Giả sử $C$ không bị chặn. Chọn $x_0\in C$ và đặt $K=\{x\in C\mid f(x)\le f(x_0)\}$. Tập $K$ không rỗng vì chứa $x_0$.

**Bước 2 ($K$ bị chặn).** Theo Định nghĩa 01.37 với $M=f(x_0)$, có $R$ sao cho $f(x)>f(x_0)$ khi $\lVert x\rVert_2>R$. Do đó mọi $x\in K$ thỏa $\lVert x\rVert_2\le R$.

**Bước 3 ($K$ đóng).** Nếu $x_k\in K$ và $x_k\to\bar x$ thì $\bar x\in C$ vì $C$ đóng, và $f(\bar x)=\lim f(x_k)\le f(x_0)$ vì $f$ liên tục.

**Bước 4 (cực tiểu trên $K$ là cực tiểu trên $C$).** Theo Định lý 01.36, $f$ đạt giá trị nhỏ nhất trên $K$ tại một điểm $x^*$.

- Với $x\in C\setminus K$, $f(x)>f(x_0)\ge f(x^*)$.
- Với $x\in K$, $f(x)\ge f(x^*)$.

Vậy $x^*$ là cực tiểu trên toàn $C$. $\square$
:::

Định lý 01.38 mở rộng Định lý 01.36 sang miền không bị chặn, đổi giả thiết "miền bị chặn" thành "hàm cưỡng bức". Chứng minh dùng Định lý 01.36 trên một tập mức dưới, nên nó kế thừa yêu cầu miền đóng và hàm liên tục.

**Trong học máy.** Hàm mất mát cộng hạng chính quy hóa $\tfrac\mu2\lVert w\rVert_2^2$ với $\mu>0$ là cưỡng bức khi mất mát không âm, vì tổng không nhỏ hơn $\tfrac\mu2\lVert w\rVert_2^2$. Định lý 01.38 vì vậy bảo đảm bài toán huấn luyện có chính quy hóa có nghiệm với mọi hàm mất mát liên tục không âm, kể cả khi mất mát không lồi. Tính duy nhất cần thêm tính lồi chặt.

Với hàm khả vi trên $\mathbb R^d$, ta có một điều kiện đủ dễ kiểm tra cho cả tồn tại và duy nhất, dựa trên một dạng lồi mạnh hơn lồi chặt.

Một cách trực quan, hàm $e^x$ lồi chặt nhưng độ cong $e^x$ tiến về $0$ khi $x\to-\infty$, nên hàm không tăng ra vô cực theo hướng đó. Nếu độ cong theo mọi hướng không nhỏ hơn $\mu$, hàm tăng ít nhất như $\tfrac\mu2\lVert x\rVert_2^2$ khi $\lVert x\rVert_2\to\infty$. Định nghĩa sau phát biểu chính xác trực giác này mà không cần đạo hàm bậc hai.

::: definition Định nghĩa 01.39 (Hàm lồi mạnh)
Cho $C\subseteq\mathbb R^d$ lồi và $\mu>0$. Hàm $f:C\to\mathbb R$ là lồi mạnh (strongly convex) với hằng số $\mu$ nếu $x\mapsto f(x)-\tfrac\mu2\lVert x\rVert_2^2$ lồi trên $C$.
:::

Theo Định nghĩa 01.39, hàm $x^2$ của Ví dụ 01.11(a) lồi mạnh với hằng số $2$, vì $x^2-x^2=0$ lồi. Hàm $e^x$ không lồi mạnh với bất kỳ $\mu>0$ nào, như nhận xét dưới đây chỉ ra.

::: remark Nhận xét 01.40 (Lồi mạnh qua Hessian; quan hệ với lồi chặt)
**Tiêu chuẩn Hessian.** Với $f$ khả vi hai lần trên miền mở, theo Định lý 01.30(a) áp dụng cho $f-\tfrac\mu2\lVert\cdot\rVert_2^2$, $f$ lồi mạnh với hằng số $\mu$ khi và chỉ khi $\nabla^2f(x)-\mu I_d\succeq0$, tức $\nabla^2f(x)\succeq\mu I_d$, với mọi $x$. Với $e^x$, đạo hàm bậc hai $e^x$ dần tới $0$ khi $x\to-\infty$, nên không có $\mu>0$ nào thỏa điều kiện.

**Quan hệ với lồi chặt.** Mọi hàm lồi mạnh là lồi chặt, theo Định lý 01.31(a), vì $f=(f-\tfrac\mu2\lVert\cdot\rVert_2^2)+\tfrac\mu2\lVert\cdot\rVert_2^2$ là tổng của một hàm lồi và một hàm lồi chặt. Chiều ngược lại sai: $\ell$ lồi chặt nhưng không lồi mạnh, vì $\ell''(m)\to0$ (Mệnh đề 01.9(c)).
:::

Từ tính lồi mạnh, ta có cả tồn tại lẫn duy nhất theo hệ quả sau.

::: corollary Hệ quả 01.41 (Hàm lồi mạnh khả vi có nghiệm duy nhất)
**Giả thiết.** $f:\mathbb R^d\to\mathbb R$ khả vi và lồi mạnh với hằng số $\mu>0$.

**Kết luận.** $f$ cưỡng bức, và bài toán $\min_{x\in\mathbb R^d}f(x)$ có đúng một nghiệm.

**Điều kiện áp dụng.** Miền $\mathbb R^d$; $\mu>0$.

**Phạm vi.** Điều kiện đủ, không cần; $x^4$ có nghiệm duy nhất nhưng không lồi mạnh trên $\mathbb R$.
:::

::: proof Chứng minh Hệ quả 01.41
**Bước 1 (chặn dưới bậc hai).** Đặt $g(x)=f(x)-\tfrac\mu2\lVert x\rVert_2^2$, lồi và khả vi với $\nabla g(0)=\nabla f(0)$. Áp dụng Định lý 01.26 tại $x=0$, ta có $g(x)\ge g(0)+\nabla f(0)^Tx$, tức

$$
f(x)\ge f(0)+\nabla f(0)^Tx+\tfrac\mu2\lVert x\rVert_2^2 .
$$

Theo bất đẳng thức Cauchy–Schwarz, $\nabla f(0)^Tx\ge-\lVert\nabla f(0)\rVert_2\lVert x\rVert_2$, nên

$$
f(x)\ge f(0)-\lVert\nabla f(0)\rVert_2\lVert x\rVert_2+\tfrac\mu2\lVert x\rVert_2^2 .
$$

**Bước 2 (tính cưỡng bức và tồn tại).** Vế phải là một đa thức bậc hai của $\lVert x\rVert_2$ với hệ số bậc hai dương, nên dần tới $+\infty$ khi $\lVert x\rVert_2\to\infty$, tức $f$ cưỡng bức. Hàm khả vi thì liên tục, và $\mathbb R^d$ không rỗng, đóng, nên Định lý 01.38 cho nghiệm tồn tại.

**Bước 3 (duy nhất).** Hàm lồi mạnh là lồi chặt, nên Định lý 01.35 cho nghiệm duy nhất. $\square$
:::

Hệ quả 01.41 mạnh hơn Định lý 01.38 theo nghĩa nó gộp cả tồn tại lẫn duy nhất trong một giả thiết, và tính cưỡng bức không cần kiểm tra riêng mà suy ra từ lồi mạnh. Điều kiện áp dụng của hệ quả cũng chặt hơn, vì nó cần $f$ khả vi, miền là $\mathbb R^d$ và tính lồi mạnh, một giả thiết mạnh hơn lồi chặt (Nhận xét 01.40).

Cách thông dụng nhất để có tính lồi mạnh là cộng vào hàm mục tiêu một hạng bậc hai. Nhu cầu này đã xuất hiện ở Ví dụ 01.6, nơi mất mát logistic trên dữ liệu tách được không có nghiệm, và một số hạng phạt độ lớn của tham số ngăn chuẩn của tham số tăng không giới hạn. Hạng bậc hai đó được định nghĩa như sau.

::: definition Định nghĩa 01.42 (Chính quy hóa bậc hai)
Cho hàm $F:\mathbb R^d\to\mathbb R$ và hệ số $\mu>0$. Hàm chính quy hóa bậc hai của $F$ là $F_\mu(w)=F(w)+\tfrac\mu2\lVert w\rVert_2^2$.

Với mất mát logistic $L$ của Định nghĩa 01.8, ký hiệu $L_\mu(w)=L(w)+\tfrac\mu2\lVert w\rVert_2^2$.

Với bình phương nhỏ nhất, hồi quy với chính quy hóa bậc hai (ridge regression) cực tiểu $J(w)+\mu\lVert w\rVert_2^2$, tức $J_{2\mu}$.
:::

Nếu $F$ lồi và khả vi hai lần thì $\nabla^2F_\mu=\nabla^2F+\mu I_d\succeq\mu I_d$, nên $F_\mu$ lồi mạnh với hằng số $\mu$ theo Nhận xét 01.40, và Hệ quả 01.41 cho $F_\mu$ có đúng một nghiệm. Lưu ý rằng Định nghĩa 01.42 không đòi $F$ lồi, và khi $F$ không lồi, $F_\mu$ nói chung không lồi.

**Trong học máy.** Hệ quả 01.41 là lý do kỹ thuật đằng sau chính quy hóa bậc hai (weight decay). Với mất mát lồi khả vi $F$, hàm $F_\mu$ của Định nghĩa 01.42 lồi mạnh với hằng số $\mu$, và bài toán huấn luyện có đúng một nghiệm, bất kể dữ liệu tách được hay đặc trưng trùng lặp.

Nghiệm của bài toán có chính quy hóa khác nghiệm ban đầu, vì số hạng phạt ưu tiên tham số có chuẩn nhỏ, và $\mu$ trở thành một siêu tham số cần chọn. Trong Bài 05b, chúng ta dùng hằng số $\mu$ này để chứng minh hạ gradient hội tụ tuyến tính.

Với mạng nhiều tầng, thêm $\tfrac\mu2\lVert w\rVert_2^2$ nói chung không làm mất mát trở thành lồi, vì Hessian của phần không lồi có thể có giá trị riêng âm lớn hơn $\mu$ về độ lớn (Tình huống 01.3).

::: example Ví dụ 01.15 (Chính quy hóa bậc hai với hai đặc trưng trùng nhau)
**Lập mô hình.** Đây là bài toán hồi quy với chính quy hóa bậc hai nhỏ nhất có thể, với một mẫu và hai đặc trưng. Cho mô hình $\widehat y=w_1z+w_2z$ với hai cột đặc trưng trùng nhau, một mẫu $z=1$, $y=1$, và mất mát $F(w)=(w_1+w_2-1)^2$. Tập nghiệm là đường thẳng $w_1+w_2=1$, không duy nhất. Thêm hạng $\tfrac\mu2(w_1^2+w_2^2)$ với $\mu>0$:

$$
F_\mu(w)=(w_1+w_2-1)^2+\tfrac\mu2(w_1^2+w_2^2).
$$

**Kiểm tra giả thiết.** Hessian là $\begin{bmatrix}2+\mu&2\\2&2+\mu\end{bmatrix}\succeq\mu I_2$, vì hiệu là $\begin{bmatrix}2&2\\2&2\end{bmatrix}\succeq0$. Do đó $F_\mu$ lồi mạnh và theo Hệ quả 01.41 có đúng một nghiệm.

**Tính.** Đặt gradient bằng không:

$$
2(w_1+w_2-1)+\mu w_1=0,\qquad 2(w_1+w_2-1)+\mu w_2=0 .
$$

Trừ hai phương trình, ta được $\mu(w_1-w_2)=0$, nên $w_1=w_2=s$, và $2(2s-1)+\mu s=0$ cho $s=2/(4+\mu)$. Với $\mu=1$: $w^*=(0{,}4;\ 0{,}4)$, dự đoán $0{,}8$.

**Kiểm tra lại.** Với $\mu=1$, $s=0{,}4$: $2(0{,}8-1)+0{,}4=-0{,}4+0{,}4=0$. Khi $\mu\to0$, $s\to\tfrac12$, và nghiệm tiến tới điểm $(\tfrac12,\tfrac12)$ của đường thẳng nghiệm ban đầu, điểm có chuẩn nhỏ nhất trên đường thẳng đó.
:::

::: remark Nhận xét 01.43 (Các suy diễn sai về tồn tại và duy nhất)
Ba suy diễn sau đều sai.

1. "Hàm lồi chặt thì có nghiệm": sai với $e^x$ và với $L$ của Ví dụ 01.6.
2. "Hessian xác định dương tại mọi điểm thì có nghiệm": sai với cùng hai ví dụ. Ở Ví dụ 01.6, $L''(w)>0$ với mọi $w$, nhưng $L''(w)\to0$ khi $w\to\infty$, nên độ cong tiến về $0$ và không đủ để chặn hàm ra vô cực. Đây là khác biệt giữa lồi chặt và lồi mạnh.
3. "Có nghiệm và Hessian nửa xác định dương thì nghiệm duy nhất": sai với $J$ của Ví dụ 01.5.

Mỗi kết luận phải được chứng nhận bằng giả thiết của riêng nó: Định lý 01.33 cho toàn cục, Định lý 01.36 hoặc 01.38 cho tồn tại, Định lý 01.35 cho duy nhất.
:::

::: exercise Bài tập 01.12
Cho $f(x)=x^4-2x^2$ trên $\mathbb R$.

(a) Chứng minh $f$ cưỡng bức và suy ra bài toán $\min_{x\in\mathbb R}f(x)$ có nghiệm.

(b) Tìm mọi nghiệm và giá trị tối ưu.

(c) Chỉ ra $f$ không lồi, và giải thích vì sao Hệ quả 01.34 không mâu thuẫn với kết quả ở (b).
:::

::: hint
Viết $f(x)=(x^2-1)^2-1$.
:::

::: solution
**(a)** $f(x)=(x^2-1)^2-1$, và $(x^2-1)^2\to+\infty$ khi $\lvert x\rvert\to\infty$, nên $f$ cưỡng bức. $f$ là đa thức nên liên tục, $\mathbb R$ đóng và không rỗng; Định lý 01.38 cho nghiệm tồn tại.

**(b)** $f(x)\ge-1$ với dấu bằng khi và chỉ khi $x^2=1$, nên $S^*=\{-1,1\}$ và $p^*=-1$. Kiểm tra: $f(\pm1)=1-2=-1$.

**(c)** $f''(x)=12x^2-4$, âm tại $x=0$, nên $f$ không lồi theo Định lý 01.30(a). Trực tiếp, $f(0)=0>\tfrac12f(-1)+\tfrac12f(1)=-1$. Hệ quả 01.34 cần $f$ lồi, và giả thiết này bị vi phạm, nên tập nghiệm gồm hai điểm tách rời không mâu thuẫn với nó.
:::

Như vậy, Định lý 01.33 trả lời câu hỏi toàn cục, với Hệ quả 01.34 về hình dạng tập nghiệm, và Định lý 01.35 trả lời câu hỏi duy nhất. Định lý 01.36 (miền đóng và bị chặn) và Định lý 01.38 (hàm cưỡng bức, Định nghĩa 01.37) trả lời câu hỏi tồn tại. Với hàm lồi mạnh, Định nghĩa 01.39, Nhận xét 01.40 và Hệ quả 01.41 gộp tồn tại và duy nhất vào một giả thiết, còn Định nghĩa 01.42 cho cách tạo ra tính lồi mạnh. Kết quả của mục là ba điều kiện đủ riêng biệt cho ba kết luận, được tóm tắt trong Nhận xét 01.43.

Đến đây, bộ công cụ cho sáu câu hỏi của Nhận xét 01.17 đã hoàn tất, nhưng mới được áp dụng cho các ví dụ nhỏ, và ba trường hợp đầu chương chưa được chứng nhận đầy đủ bằng chúng. Việc áp dụng bộ công cụ cho từng trường hợp, đặt kết quả cạnh nhau và rút ra một quy trình cho mô hình mới là nội dung của Mục 9.

## 9. Chứng nhận nghiệm cho ba trường hợp

Ở Mục 2 đến Mục 4, kết luận của mỗi trường hợp được rút ra bằng một lập luận riêng. Trong mục này, chúng ta viết lại mỗi kết luận đó thành một chứng nhận, trong đó mỗi kết luận được gắn với đúng định lý cung cấp nó. Sau đó, việc so sánh ba chứng nhận cho biết giả thiết nào sinh ra kết luận nào.

::: proposition Mệnh đề 01.44 (Chứng nhận trường hợp điều khiển)
**Giả thiết.** Dữ kiện như Định nghĩa 01.1.

**Kết luận.** Bài toán (2.1) có miền lồi, mục tiêu lồi chặt, và có đúng một nghiệm, cho bởi (2.3).

**Điều kiện áp dụng.** $u_{\max}\ge0$, $\lambda\ge0$.

**Phạm vi.** Một biến; công thức (2.3) không mở rộng trực tiếp sang nhiều biến.
:::

::: proof Chứng minh Mệnh đề 01.44
**Bước 1 (miền).** $C=[-u_{\max},u_{\max}]$ lồi theo Ví dụ 01.10(a); không rỗng vì chứa $0$; đóng và bị chặn vì là đoạn với hai đầu mút hữu hạn.

**Bước 2 (mục tiêu).** $q$ lồi chặt trên $\mathbb R$ theo Ví dụ 01.13(a), nên lồi chặt trên $C$.

**Bước 3 (toàn cục, tồn tại, duy nhất).**

- Toàn cục: Định lý 01.33.
- Tồn tại: $q$ là đa thức nên liên tục, và Định lý 01.36 áp dụng.
- Duy nhất: Định lý 01.35.

**Bước 4 (nghiệm cụ thể).** Điểm $u^*$ của (2.3) thỏa (7.3), vì $q'(u^*)(u-u^*)=2(1+\lambda)(u^*-u_{\mathrm{free}})(u-u^*)$ và trong mỗi nhánh của $\operatorname{clip}$:

- hoặc $u^*=u_{\mathrm{free}}$;
- hoặc $u^*=u_{\max}<u_{\mathrm{free}}$ với $u-u^*\le0$;
- hoặc $u^*=-u_{\max}>u_{\mathrm{free}}$ với $u-u^*\ge0$.

Trong cả ba nhánh tích không âm, và Hệ quả 01.27 cho $u^*$ tối ưu. $\square$
:::

::: proposition Mệnh đề 01.45 (Chứng nhận hồi quy tuyến tính)
**Giả thiết.** $X\in\mathbb R^{n\times d}$, $y\in\mathbb R^n$.

**Kết luận.** Bài toán (3.1) có miền lồi, mục tiêu lồi, luôn có nghiệm; nghiệm duy nhất khi và chỉ khi $\operatorname{rank}X=d$.

**Điều kiện áp dụng.** Mọi dữ liệu.

**Phạm vi.** Không có ràng buộc trên $w$.
:::

::: proof Chứng minh Mệnh đề 01.45
**Bước 1 (miền, mục tiêu, toàn cục).** Miền $\mathbb R^d$ lồi; $J$ lồi theo Ví dụ 01.13(c); toàn cục theo Định lý 01.33.

**Bước 2 (tồn tại).** Định lý 01.36 không áp dụng vì $\mathbb R^d$ không bị chặn, và Định lý 01.38 không áp dụng khi $X$ không có hạng cột đầy đủ vì $J$ không cưỡng bức (Ví dụ 01.5). Sự tồn tại đến từ Mệnh đề 01.6(a), một lập luận riêng của bình phương nhỏ nhất dựa trên phương trình chuẩn.

**Bước 3 (duy nhất).**

- Khi $\operatorname{rank}X=d$, $\nabla^2J=2X^TX\succ0$ nên $J$ lồi chặt theo Định lý 01.30(b), và Định lý 01.35 cho duy nhất.
- Khi $\operatorname{rank}X<d$, Mệnh đề 01.6(b) cho vô số nghiệm. $\square$
:::

::: proposition Mệnh đề 01.46 (Chứng nhận hồi quy logistic, có và không có chính quy hóa)
**Giả thiết.** Dữ liệu $(a_i,y_i)$ như Định nghĩa 01.8; $\mu>0$.

**Kết luận.**

- (a) $L$ lồi trên $\mathbb R^d$, và mọi cực tiểu địa phương là toàn cục; nghiệm có thể không tồn tại (Ví dụ 01.6). Khi nghiệm tồn tại, như với dữ liệu của Ví dụ 01.7, nó là cực tiểu toàn cục, và là nghiệm duy nhất nếu $L$ lồi chặt.
- (b) $L_\mu$ của Định nghĩa 01.42 có đúng một nghiệm, với mọi dữ liệu.

**Điều kiện áp dụng.** $\mu>0$ cho (b).

**Phạm vi.** Nghiệm của (b) phụ thuộc $\mu$ và không phải nghiệm của bài toán gốc.
:::

::: proof Chứng minh Mệnh đề 01.46
**Bước 1 (phần (a): lồi, toàn cục, phản ví dụ tồn tại).** $L$ lồi theo Ví dụ 01.14(b); toàn cục theo Định lý 01.33; Ví dụ 01.6 là phản ví dụ cho sự tồn tại.

**Bước 2 (phần (a): chứng nhận nghiệm khi tồn tại).** Khi nghiệm tồn tại, có thể chứng nhận nó trực tiếp. Với dữ liệu của Ví dụ 01.7, $w^*=\log2$ thỏa $L'(w^*)=0$, nên là cực tiểu toàn cục theo Hệ quả 01.27. Vì $L''(w)=2\ell''(w)+\ell''(-w)>0$ với mọi $w$, $L$ lồi chặt theo Định lý 01.30(b), và Định lý 01.35 cho $w^*$ là nghiệm duy nhất. Tại nghiệm,

$$
L''(\log2)=3\cdot\tfrac{2}{(1+2)^2}=\tfrac23,
$$

dùng $\ell''(m)=e^m/(1+e^m)^2$ và $\ell''(-m)=\ell''(m)$. Lập luận này không cần xét dấu của $L'$ trên toàn trục như ở Ví dụ 01.7, nên dùng được cho $d\ge2$.

**Bước 3 (phần (b)).** Ta có

$$
\nabla^2L_\mu(w)=\sum_i\ell''(m_i)a_ia_i^T+\mu I_d\succeq\mu I_d,
$$

vì tổng đầu nửa xác định dương (Ví dụ 01.14(b)). Theo Nhận xét 01.40, $L_\mu$ lồi mạnh với hằng số $\mu$, và Hệ quả 01.41 cho đúng một nghiệm. $\square$
:::

Ba chứng nhận được đặt cạnh nhau trong bảng sau.

| Trường hợp | Miền lồi | Mục tiêu | Tồn tại, theo | Duy nhất, theo |
|---|---|---|---|---|
| Điều khiển | đoạn đóng, bị chặn | lồi chặt | có, Định lý 01.36 | có, Định lý 01.35 |
| Hồi quy tuyến tính | $\mathbb R^d$ | lồi | luôn có, Mệnh đề 01.6(a) | khi và chỉ khi $\operatorname{rank}X=d$ |
| Logistic, dữ liệu tách được | $\mathbb R^d$ | lồi, lồi chặt ở Ví dụ 01.6 | không | không đặt ra |
| Logistic có chính quy hóa | $\mathbb R^d$ | lồi mạnh | có, Hệ quả 01.41 | có, Hệ quả 01.41 |

Cả bốn hàng đều có miền lồi và mục tiêu lồi, nên cả bốn có bảo đảm toàn cục của Định lý 01.33. Hai cột cuối khác nhau giữa các hàng, và sự khác nhau được giải thích bằng giả thiết riêng.

- Bài toán điều khiển và bài toán logistic hai mẫu đều có mục tiêu lồi chặt, nhưng chỉ bài toán điều khiển có nghiệm, vì chỉ nó có miền bị chặn, tức lồi chặt không kéo theo tồn tại.
- Hai trường hợp hồi quy có cùng miền $\mathbb R^d$ nhưng kết luận tồn tại khác nhau, nên tồn tại phụ thuộc cả mục tiêu chứ không chỉ miền.

Như vậy, bảng cho ba cơ sở tồn tại khác nhau: miền bị chặn, cấu trúc phương trình chuẩn, và tính cưỡng bức sau chính quy hóa.

Ghép các bước đã dùng cho ba trường hợp, ta được một quy trình cho mô hình mới, phát biểu dưới dạng thuật toán sau.

::: algorithm Thuật toán 01.1 (Quy trình chứng nhận một mô hình tối ưu)
**Đầu vào.** Mô tả bằng lời của một tình huống cần ra quyết định.

**Đầu ra.** Mô hình dạng (5.1) và một chứng nhận cho từng kết luận toàn cục, tồn tại, duy nhất, hoặc chỉ ra kết luận nào không được bảo đảm.

1. Nêu kiểu và kích thước của mọi dữ kiện.
2. Chỉ ra biến quyết định $x\in\mathbb R^d$ và miền xác định $D$.
3. Viết hàm mục tiêu $f_0$ và từng ràng buộc $f_i\le0$, $h_j=0$; xác định $C$.
4. Kiểm tra $C$ lồi bằng Mệnh đề 01.19, 01.20 và 01.25.
5. Kiểm tra $f_0$ lồi trên $C$ bằng Định nghĩa 01.22, Định lý 01.26, Định lý 01.30 hoặc Định lý 01.31; ghi rõ giả thiết của công cụ (miền mở, khả vi).
6. Kết luận toàn cục bằng Định lý 01.33 nếu bước 4 và 5 thành công.
7. Kiểm tra tồn tại: $C$ không rỗng; rồi $C$ đóng, bị chặn và $f_0$ liên tục (Định lý 01.36), hoặc $C$ đóng và $f_0$ liên tục, cưỡng bức (Định lý 01.38), hoặc $C=\mathbb R^d$ và $f_0$ khả vi, lồi mạnh (Hệ quả 01.41).
8. Nếu nghiệm tồn tại, kiểm tra duy nhất bằng lồi chặt (Định lý 01.35).
9. Diễn giải nghiệm trong ngữ cảnh ban đầu.

**Điều kiện dừng.** Quy trình kết thúc sau bước 9. Nếu bước 4 hoặc bước 5 thất bại, bỏ qua bước 6, ghi rằng không có bảo đảm toàn cục, rồi tiếp tục bước 7. Nếu bước 7 thất bại, bỏ qua bước 8 và ghi rằng sự tồn tại chưa được bảo đảm.

**Chi phí.** Mỗi bước là một phép kiểm tra trên công thức, không phải một phép tính số; bước 5 với Định lý 01.30 cần tính Hessian.
:::

::: exercise Bài tập 01.13
**Dữ kiện.** Ví dụ 01.4: $X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix}$ (hàng $(1,s_i)$ với $s=(0,1,2)$), $J(w)=\lVert Xw-y\rVert_2^2$, $X^TX=\begin{bmatrix}3&3\\3&5\end{bmatrix}$; với $y=(1,2,2)^T$, nghiệm không ràng buộc là $w^*=(7/6,1/2)^T$ và $J(w^*)=\tfrac16$. Mệnh đề 01.16(b): nghiệm trên miền lớn mà thuộc miền con thì là nghiệm trên miền con. Hệ quả 01.27: với $J$ lồi khả vi, $w^*\in C$ thỏa $\nabla J(w^*)^T(w-w^*)\ge0$ với mọi $w\in C$ (7.3) là nghiệm trên $C$.

Bài toán bình phương nhỏ nhất với tham số không âm: $\min_{w\ge0}\lVert Xw-y\rVert_2^2$ với $X$ của Ví dụ 01.4.

(a) Áp dụng Thuật toán 01.1 khi $\operatorname{rank}X=d$, nêu căn cứ cho tồn tại và duy nhất.

(b) Với $y=(1,2,2)^T$, tìm nghiệm.

(c) Với $y=(2,1,1)^T$, chứng minh nghiệm là $w^*=(\tfrac43,0)^T$ và tính giá trị tối ưu.
:::

::: hint
Ở (b), so nghiệm không ràng buộc với miền rồi dùng Mệnh đề 01.16(b). Ở (c), kiểm tra điều kiện (7.3) của Hệ quả 01.27 tại $w^*$.
:::

::: solution
**(a) Lập mô hình.** Dữ kiện $X\in\mathbb R^{3\times2}$, $y\in\mathbb R^3$; biến $w\in\mathbb R^2$; mục tiêu $J$; miền $C=\{w\mid w\ge0\}$.

**(a) Kiểm tra giả thiết.**

- Miền $C$ là giao của hai nửa không gian $\{w\mid-w_j\le0\}$, nên lồi (Mệnh đề 01.19(c), 01.20(a)), không rỗng vì chứa $0$, và đóng vì là giao của hai tập đóng.
- $J$ lồi. Vì $\operatorname{rank}X=2$, $\nabla^2J=2X^TX\succeq\lambda_{\min}I_2$ với $\lambda_{\min}>0$ là giá trị riêng nhỏ nhất của $2X^TX$, nên $J$ lồi mạnh, cưỡng bức theo Hệ quả 01.41.

Tồn tại theo Định lý 01.38, duy nhất theo Định lý 01.35.

**(b)** Nghiệm không ràng buộc $w^*=(7/6,1/2)^T$ (Ví dụ 01.4) thuộc $C$, nên theo Mệnh đề 01.16(b) nó là nghiệm của bài toán có ràng buộc, với giá trị $\tfrac16$.

**(c) Nghiệm không ràng buộc.** $X^Ty=(4,3)^T$ và

$$
w=\tfrac16\begin{bmatrix}5&-3\\-3&3\end{bmatrix}(4,3)^T=(\tfrac{11}6,-\tfrac12)^T\notin C .
$$

**(c) Kiểm tra (7.3) tại $w^*$.** Tại $w^*=(\tfrac43,0)^T$:

$$
\begin{aligned}
Xw^*-y&=(\tfrac43-2,\tfrac43-1,\tfrac43-1)=(-\tfrac23,\tfrac13,\tfrac13),\\
\nabla J(w^*)&=2X^T(Xw^*-y)=2(0,\ 0+\tfrac13+\tfrac23)^T=(0,2)^T .
\end{aligned}
$$

Với mọi $w\in C$, $\nabla J(w^*)^T(w-w^*)=0\cdot(w_1-\tfrac43)+2(w_2-0)=2w_2\ge0$. Do đó (7.3) đúng và Hệ quả 01.27 cho $w^*$ tối ưu; duy nhất theo (a). Giá trị tối ưu $J(w^*)=\tfrac49+\tfrac19+\tfrac19=\tfrac23$.

**(c) Diễn giải.** Khi ràng buộc hệ số góc không âm, mô hình tốt nhất là đường nằm ngang ở mức trung bình $\tfrac43$ của $y$.
:::

Tóm lại, Mệnh đề 01.44, 01.45 và 01.46 ghép các kết quả của Mục 6 đến Mục 8 thành chứng nhận cho từng trường hợp, bảng so sánh tách bảo đảm toàn cục khỏi tồn tại và duy nhất, và Thuật toán 01.1 tổng quát hóa quy trình. Chuỗi chứng nhận trong Thuật toán 01.1 là kết quả chính của mục này và của cả chương.

Ba chứng nhận trên đều dựa trên những bài toán đã được thiết kế để minh họa. Ở phần sau, chúng ta áp dụng Thuật toán 01.1 cho ba bài toán mới.

## Tình huống áp dụng và ứng dụng

Ba tình huống dưới đây được giải trọn vẹn bằng Thuật toán 01.1.

- Tình huống 01.1 khắc phục việc không tồn tại nghiệm ở Ví dụ 01.6 bằng chính quy hóa.
- Tình huống 01.2 chọn trọng số trộn của ba mô hình trên đơn hình, với nghiệm nằm trên biên.
- Tình huống 01.3 vi phạm giả thiết lồi và cho thấy hậu quả.

::: application Tình huống 01.1 (Hồi quy logistic có chính quy hóa trên dữ liệu tách được tuyến tính)
**Bài toán và dữ liệu.** Dữ liệu là hai mẫu của Ví dụ 01.6, $(a_1,y_1)=(1,+1)$ và $(a_2,y_2)=(-1,-1)$, tách được bởi mọi $w>0$. Theo Ví dụ 01.6, bài toán hồi quy logistic không có nghiệm: tham số tăng không giới hạn và xác suất dự đoán $\sigma(w)$ tiến về $1$. Chúng ta cần một tham số hữu hạn với xác suất dự đoán không tiến tới $1$.

**Mô hình hóa.** Dùng chính quy hóa bậc hai (Định nghĩa 01.42) với hệ số $\mu>0$ (bước 1–3 của Thuật toán 01.1): biến $w\in\mathbb R$, miền $\mathbb R$, mục tiêu

$$
L_\mu(w)=2\log(1+e^{-w})+\tfrac\mu2w^2 .
$$

**Xác minh giả thiết.** Miền $\mathbb R$ lồi (Mệnh đề 01.19(a)). $L_\mu''(w)=2\ell''(w)+\mu\ge\mu>0$ theo Mệnh đề 01.9(c), nên $L_\mu$ lồi mạnh với hằng số $\mu$ (Định nghĩa 01.39) và khả vi. Theo Hệ quả 01.41, bài toán có đúng một nghiệm $w^*_\mu$.

Điều kiện cần bậc nhất của Bài 00 cho $L_\mu'(w^*_\mu)=0$. Điều kiện này nằm ở mục "Điểm dừng và điều kiện tối ưu bậc nhất" của Bài 00: hàm khả vi đạt cực tiểu địa phương tại một điểm trong của miền mở thì có gradient bằng không tại đó. Ngược lại, theo Hệ quả 01.27, mọi nghiệm của $L_\mu'(w)=0$ là cực tiểu toàn cục, nên trùng với $w^*_\mu$. Vậy $w^*_\mu$ là nghiệm duy nhất của phương trình $L_\mu'(w)=0$. Đây là trường hợp $d=1$ của Mệnh đề 01.46(b).

**Áp dụng.** Phương trình là

$$
L_\mu'(w)=-\dfrac{2}{1+e^w}+\mu w=0 .
$$

Ta có $L_\mu'(0)=-1<0$ và $L_\mu'$ tăng chặt, nên $w^*_\mu>0$. Từ phương trình, $\mu w^*_\mu=2/(1+e^{w^*_\mu})<1$, nên $0<w^*_\mu<1/\mu$. Giải số bằng phép chia đôi khoảng trên $(0,1/\mu)$ cho bảng sau (làm tròn bốn chữ số).

| $\mu$ | $w^*_\mu$ | $L(w^*_\mu)$ | $L_\mu(w^*_\mu)$ | $\sigma(w^*_\mu)$ |
|---:|---:|---:|---:|---:|
| $1$ | $0{,}6748$ | $0{,}8232$ | $1{,}0509$ | $0{,}6626$ |
| $0{,}1$ | $2{,}1280$ | $0{,}2250$ | $0{,}4514$ | $0{,}8936$ |
| $0{,}01$ | $3{,}9140$ | $0{,}0395$ | $0{,}1161$ | $0{,}9804$ |

**Kiểm tra lại.**

- Với $\mu=1$: $2/(1+e^{0{,}6748})=2/(1+1{,}9637)=0{,}6748=\mu w^*_\mu$.
- Với $\mu=0{,}1$: $2/(1+e^{2{,}128})=0{,}2128=0{,}1\cdot2{,}128$.

**Diễn giải.** Với mỗi $\mu>0$, mô hình có một tham số hữu hạn và gán cho mỗi mẫu huấn luyện xác suất đúng nhãn $\sigma(w^*_\mu)<1$. Khi $\mu$ giảm, $w^*_\mu$ tăng (tối đa tới $1/\mu$) và xác suất tiến về $1$; giới hạn $\mu\to0$ trở lại hành vi của Ví dụ 01.6. Theo bảng, xác suất đúng nhãn $\sigma(w^*_\mu)$ tăng từ $0{,}66$ khi $\mu=1$ lên $0{,}89$ khi $\mu=0{,}1$ và $0{,}98$ khi $\mu=0{,}01$.

**Giới hạn.** Nghiệm $w^*_\mu$ là nghiệm của một bài toán khác bài toán gốc. Nó phụ thuộc $\mu$, và $\mu$ phải được chọn bằng dữ liệu kiểm định chứ không suy ra từ định lý. Chính quy hóa bảo đảm tồn tại và duy nhất nhờ tính lồi mạnh; nó không bảo đảm mô hình dự đoán tốt trên dữ liệu mới.

**Dẫn ngược lý thuyết.** Định nghĩa 01.8 (mô hình), Định nghĩa 01.42 (chính quy hóa), Mệnh đề 01.9 (độ cong của $\ell$), Định lý 01.31(a) (tổng lồi), Định nghĩa 01.39 và Hệ quả 01.41 (tồn tại và duy nhất, ứng với bước 7 và 8 của Thuật toán 01.1), Hệ quả 01.27 (điều kiện gradient bằng không là đủ).
:::

::: application Tình huống 01.2 (Trọng số trộn của tổ hợp ba mô hình)
**Bài toán và dữ liệu.** Ba mô hình hồi quy đã huấn luyện cho dự đoán trên $n=3$ mẫu kiểm định có đầu ra thật $y=(1,1,2)^T$.

- Mô hình 1 dự đoán $(0,2,1)$.
- Mô hình 2 dự đoán $(2,0,1)$.
- Mô hình 3 dự đoán $(3,3,0)$.

Chúng ta cần một dự đoán trộn, bằng tổng các dự đoán của ba mô hình nhân với trọng số $\theta_1,\theta_2,\theta_3$ không âm có tổng bằng $1$, sao cho dự đoán trộn gần $y$ nhất. Số liệu là giả lập sư phạm.

**Mô hình hóa.** Xếp ba vector dự đoán thành ba cột của ma trận

$$
P=\begin{bmatrix}0&2&3\\2&0&3\\1&1&0\end{bmatrix},
$$

trong đó hàng $i$ là mẫu, cột $j$ là mô hình. Biến quyết định là $\theta\in\mathbb R^3$; mục tiêu $f(\theta)=\lVert P\theta-y\rVert_2^2$; miền là đơn hình $\Delta_3=\{\theta\in\mathbb R^3\mid\theta\succeq0,\ \sum_j\theta_j=1\}$ của Ví dụ 01.10(d).

**Xác minh giả thiết.**

- $\Delta_3$ lồi (Ví dụ 01.10(d)), không rỗng (chứa $(1,0,0)$), đóng vì là giao của các tập đóng, và bị chặn vì $0\le\theta_j\le1$.
- $f$ là hợp của $\lVert\cdot\rVert_2^2$ với ánh xạ affine, lồi theo Định lý 01.31(b), và liên tục.
- Định thức của $P$ bằng $0\cdot(0-3)-2\cdot(0-3)+3\cdot(2-0)=12\ne0$, nên $\operatorname{rank}P=3$, $\nabla^2f=2P^TP\succ0$ và $f$ lồi chặt (Định lý 01.30(b)).

Tồn tại theo Định lý 01.36, duy nhất theo Định lý 01.35.

**Áp dụng.** Bỏ ràng buộc, hệ $P\theta=y$ có nghiệm duy nhất $\theta=(1,1,-\tfrac13)$. Trọng số âm và tổng bằng $\tfrac53$, nên nghiệm không ràng buộc không thuộc $\Delta_3$ và ràng buộc có hiệu lực.

Xét ứng viên $\theta^*=(\tfrac12,\tfrac12,0)$ trên một cạnh của đơn hình. Khi đó

$$
P\theta^*=(1,1,1),\qquad P\theta^*-y=(0,0,-1),\qquad\nabla f(\theta^*)=2P^T(P\theta^*-y)=(-2,-2,0).
$$

Với mọi $\theta\in\Delta_3$, dùng $\theta_1+\theta_2=1-\theta_3$:

$$
\begin{aligned}
\nabla f(\theta^*)^T(\theta-\theta^*)&=-2\theta_1-2\theta_2+0\cdot\theta_3-\bigl(-2\cdot\tfrac12-2\cdot\tfrac12\bigr)\\
&=-2(1-\theta_3)+2\\
&=2\theta_3\ge0 .
\end{aligned}
$$

Điều kiện (7.3) thỏa, nên theo Hệ quả 01.27, $\theta^*$ là nghiệm, và là nghiệm duy nhất. Giá trị tối ưu là $f(\theta^*)=1$.

**Kiểm tra lại.**

- Từng mô hình riêng lẻ cho $f(1,0,0)=1+1+1=3$, $f(0,1,0)=3$, $f(0,0,1)=4+4+4=12$.
- Trọng số đều $(\tfrac13,\tfrac13,\tfrac13)$ cho dự đoán $(\tfrac53,\tfrac53,\tfrac23)$ và $f=\tfrac49+\tfrac49+\tfrac{16}9=\tfrac83$.

Cả bốn giá trị đều lớn hơn $1$.

**Diễn giải.** Tổ hợp tối ưu bỏ hẳn mô hình 3 (trọng số $0$, nghiệm nằm trên biên của $\Delta_3$) và chia đều cho hai mô hình còn lại. Tổng bình phương sai số giảm từ $3$ của mô hình đơn tốt nhất xuống $1$.

Thành phần thứ ba của gradient lớn hơn hai thành phần kia ($0>-2$), nên chuyển trọng số sang mô hình 3 làm mục tiêu tăng, đúng như $2\theta_3\ge0$ cho thấy.

**Giới hạn.** Trọng số được chọn trên chính tập kiểm định nên có thể quá khớp với ba mẫu này; trong thực tế cần nhiều mẫu hơn và một tập kiểm tra riêng. Ràng buộc đơn hình là lựa chọn mô hình. Bỏ ràng buộc cho sai số $0$ trên ba mẫu nhưng với trọng số âm khó diễn giải.

**Dẫn ngược lý thuyết.** Ví dụ 01.10(d) và Mệnh đề 01.20(a) (bước 4 của Thuật toán 01.1), Định lý 01.31(b) và 01.30(b) (bước 5), Định lý 01.36 (bước 7), Định lý 01.35 (bước 8), Hệ quả 01.27 (nghiệm trên biên).
:::

::: application Tình huống 01.3 (Mạng một nơ-ron ẩn: giả thiết lồi bị vi phạm)
**Bài toán và dữ liệu.** Một mạng nơ-ron có một lớp ẩn gồm một nơ-ron với hàm kích hoạt $\tanh$ dự đoán $\widehat y=\alpha\tanh(\beta z)$ từ đầu vào $z$, với trọng số vào $\beta\in\mathbb R$ và trọng số ra $\alpha\in\mathbb R$. Dữ liệu là một mẫu $(z,y)=(1,\tfrac12)$.

**Mô hình hóa.** Biến $(\alpha,\beta)\in\mathbb R^2$, miền $\mathbb R^2$, mục tiêu $F(\alpha,\beta)=(\alpha\tanh\beta-\tfrac12)^2$.

**Xác minh giả thiết.** Miền lồi nhưng mục tiêu không lồi. Vì $\tanh$ là hàm lẻ, hai điểm $P_1=(1,\beta_0)$ và $P_2=(-1,-\beta_0)$ với $\beta_0=\operatorname{artanh}\tfrac12\approx0{,}5493$ đều cho $\alpha\tanh\beta=\tfrac12$ và $F=0$. Trung điểm của chúng là $(0,0)$, với

$$
F(0,0)=\tfrac14>\tfrac12F(P_1)+\tfrac12F(P_2)=0,
$$

vi phạm (7.1). Bước 5 của Thuật toán 01.1 thất bại, nên Định lý 01.33, Hệ quả 01.27 và Hệ quả 01.34 không áp dụng.

**Hậu quả thứ nhất: có điểm dừng không phải cực tiểu.** Đặt $r=\alpha\tanh\beta-\tfrac12$. Khi đó

$$
\partial F/\partial\alpha=2r\tanh\beta,\qquad\partial F/\partial\beta=2r\alpha(1-\tanh^2\beta),
$$

cả hai bằng $0$ tại $(0,0)$. Các đạo hàm bậc hai tại $(0,0)$ là:

- $\partial^2F/\partial\alpha^2=2\tanh^2\beta=0$;
- $\partial^2F/\partial\beta^2=0$, vì mọi hạng chứa thừa số $\alpha$ hoặc $\tanh\beta$;
- $\partial^2F/\partial\alpha\partial\beta=2\bigl[\alpha(1-\tanh^2\beta)\tanh\beta+r(1-\tanh^2\beta)\bigr]$, bằng $2\bigl[0+(-\tfrac12)\cdot1\bigr]=-1$ tại $(0,0)$.

Hessian $\begin{bmatrix}0&-1\\-1&0\end{bmatrix}$ có hai giá trị riêng $\pm1$, nên $(0,0)$ là điểm yên ngựa (Bài 00, mục "Phân loại điểm dừng bằng Hessian"). Kiểm tra trực tiếp, $F(0{,}3;\ 0{,}3)\approx0{,}170<\tfrac14$ còn $F(0{,}3;\ -0{,}3)\approx0{,}345>\tfrac14$.

Hạ gradient khởi tạo đúng tại $(0,0)$ không bao giờ rời điểm này, vì gradient bằng $0$. Đây là lý do trọng số của mạng được khởi tạo ngẫu nhiên.

**Hậu quả thứ hai: tập nghiệm không lồi.** Tập nghiệm $\{(\alpha,\beta)\mid\alpha\tanh\beta=\tfrac12\}$ gồm hai nhánh rời nhau ($\alpha,\beta>0$ và $\alpha,\beta<0$), không lồi và có vô số điểm. Do đó tham số không xác định duy nhất từ dữ liệu.

**Hậu quả thứ ba: hàm không cưỡng bức.** Dọc nhánh $\beta\to0^+$, $\alpha=1/(2\tanh\beta)\to\infty$, $F$ giữ bằng $0$. Nghiệm tồn tại ở đây nhờ tính trực tiếp, không nhờ Định lý 01.38.

**Chính quy hóa không khôi phục tính lồi.** Với $F_\mu=F+\tfrac\mu2(\alpha^2+\beta^2)$, Hessian tại $(0,0)$ là $\begin{bmatrix}\mu&-1\\-1&\mu\end{bmatrix}$, có giá trị riêng $\mu-1$ âm khi $\mu<1$. Khi đó $F_\mu$ không lồi theo Định lý 01.30(a), khác với Tình huống 01.1 nơi hạng $\tfrac\mu2w^2$ cộng vào một hàm đã lồi.

**Diễn giải.** Hai mạng $P_1$ và $P_2$ biểu diễn cùng một hàm dự đoán. Sự đối xứng $(\alpha,\beta)\mapsto(-\alpha,-\beta)$ của tham số là một nguồn của tính không lồi, và nó có mặt trong mọi mạng dùng hàm kích hoạt lẻ.

Với mạng sâu, các bảo đảm của chương này thay bằng bảo đảm yếu hơn: thuật toán tìm được điểm có chuẩn gradient nhỏ, không chắc là cực tiểu toàn cục (Bài 05b, phần mục tiêu không lồi; Bài 06).

**Dẫn ngược lý thuyết.** Định nghĩa 01.22 (kiểm tra bằng định nghĩa thất bại), Định lý 01.30(a) (Hessian không nửa xác định dương), Định lý 01.33 và Hệ quả 01.34 (kết luận bị mất khi giả thiết lồi bị vi phạm), Định nghĩa 01.37 (tính cưỡng bức thất bại).
:::

Các khái niệm của chương xuất hiện trong các vấn đề sau của học máy.

- **Hồi quy tuyến tính và chính quy hóa bậc hai.** Mệnh đề 01.6 cho tồn tại và điều kiện duy nhất. Hệ quả 01.41 giải thích vì sao chính quy hóa bậc hai làm nghiệm duy nhất khi đặc trưng phụ thuộc tuyến tính (Ví dụ 01.15). Bài 02, phần quy hoạch bậc hai và chính quy hóa, xử lý tiếp.
- **Hồi quy logistic và mất mát entropy chéo.** Định nghĩa 01.8 và Mệnh đề 01.46 cho tính lồi và điều kiện tồn tại. Cách đọc $L$ là âm logarit hàm hợp lý nối tới phần học tham số của mô hình xác suất trong học phần.
- **Máy vector hỗ trợ.** Miền lề cứng (Ví dụ 01.10(b)) và mất mát bản lề (Ví dụ 01.14(c)) lồi. Bài toán phân loại tuyến tính có lề được trình bày trong Boyd và Vandenberghe (2004), mục 8.6.1.
- **Trộn mô hình và phân bổ tài nguyên.** Tình huống 01.2 dùng đơn hình (Ví dụ 01.10(d)) và điều kiện (7.3) để chọn trọng số trộn. Bài toán phân bổ công suất chiếu sáng, phỏng theo Bài giảng 1 của MIT 6.079, có cùng cấu trúc với miền là một hộp; nó là Bài 9 trong tệp bài tập của Bài 01.
- **Tốc độ hội tụ.** Hằng số lồi mạnh $\mu$ của Định nghĩa 01.39 quyết định tốc độ hội tụ tuyến tính của hạ gradient ở Bài 05b.
- **Nhiễu đối kháng.** Tập nhiễu hợp lệ của Ví dụ 01.10(c) lồi, nên bài toán tìm nhiễu tối ưu cho một mô hình tuyến tính là bài toán lồi.
- **Mạng sâu.** Tình huống 01.3 cho thấy mất mát của mạng không lồi theo tham số. Bài 06 dành cho các phương pháp tối ưu dùng trong trường hợp này.

## Tóm tắt chương

Chương này khởi đầu bằng ba quyết định cụ thể là điều khiển một bước, hồi quy tuyến tính và hồi quy logistic (Định nghĩa 01.1, 01.4, 01.8). Mỗi trường hợp bộc lộ một khó khăn về nghiệm: nghiệm nằm trên biên (Nhận xét 01.3), vô số nghiệm (Ví dụ 01.5) và không có nghiệm (Ví dụ 01.6). Để phát biểu các khó khăn này một lần cho mọi bài toán, chúng ta đặt ba trường hợp vào dạng tổng quát của bài toán tối ưu (Định nghĩa 01.12, 01.13, Mệnh đề 01.14) và chuyển chúng thành sáu câu hỏi chứng nhận (Nhận xét 01.17). Tập lồi (Định nghĩa 01.18, Mệnh đề 01.19, 01.20) trả lời câu hỏi về miền. Hàm lồi (Định nghĩa 01.22) cùng các tiêu chuẩn của Định lý 01.26, 01.30 và 01.31 trả lời câu hỏi về mục tiêu. Từ đó, Định lý 01.33 cho kết luận toàn cục, Định lý 01.36 và 01.38 cho sự tồn tại, Định lý 01.35 cho tính duy nhất, và Hệ quả 01.41 gộp hai kết luận sau. Cuối cùng, Mệnh đề 01.44 đến 01.46 chứng nhận ba trường hợp, và Thuật toán 01.1 tổng quát hóa quy trình cho mô hình mới.

**Định nghĩa và kết quả theo mục.**

- Mục 2: bài toán điều khiển một bước (Định nghĩa 01.1); quy tắc cắt (Mệnh đề 01.2).
- Mục 3: bình phương nhỏ nhất (Định nghĩa 01.4); khai triển của $J$ và phương trình chuẩn (Mệnh đề 01.5); tồn tại và tập nghiệm bình phương nhỏ nhất (Mệnh đề 01.6).
- Mục 4: hồi quy logistic (Định nghĩa 01.8); tính chất của $\ell$ (Mệnh đề 01.9); cận dưới đúng, giá trị nhỏ nhất, dãy cực tiểu hóa (Định nghĩa 01.10).
- Mục 5: bài toán tối ưu, giá trị tối ưu, nghiệm (Định nghĩa 01.12); cực tiểu địa phương, toàn cục, chặt (Định nghĩa 01.13); quan hệ giữa các loại cực tiểu (Mệnh đề 01.14); miền lồng nhau (Mệnh đề 01.16).
- Mục 6: tập lồi (Định nghĩa 01.18); tập lồi cơ bản (Mệnh đề 01.19); phép toán bảo toàn tập lồi (Mệnh đề 01.20).
- Mục 7: hàm lồi, lồi chặt, lõm (Định nghĩa 01.22); tập mức dưới (Định nghĩa 01.24); tập mức dưới của hàm lồi (Mệnh đề 01.25); điều kiện bậc nhất (Định lý 01.26) và điều kiện đủ tối ưu (Hệ quả 01.27); hạn chế lên đường thẳng (Bổ đề 01.28), tiêu chuẩn một biến (Bổ đề 01.29), điều kiện bậc hai (Định lý 01.30); phép toán bảo toàn hàm lồi (Định lý 01.31).
- Mục 8: địa phương là toàn cục (Định lý 01.33) và tập nghiệm lồi (Hệ quả 01.34); lồi chặt cho duy nhất (Định lý 01.35); Weierstrass (Định lý 01.36); hàm cưỡng bức (Định nghĩa 01.37); tồn tại với hàm cưỡng bức (Định lý 01.38); hàm lồi mạnh (Định nghĩa 01.39); lồi mạnh cho tồn tại và duy nhất (Hệ quả 01.41); chính quy hóa bậc hai (Định nghĩa 01.42).
- Mục 9: chứng nhận ba trường hợp (Mệnh đề 01.44, 01.45, 01.46); quy trình chứng nhận (Thuật toán 01.1).

**Công thức cần nhớ.**

$$
\theta x+(1-\theta)y\in C,\qquad f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y),\qquad \theta\in[0,1],
$$

$$
f(y)\ge f(x)+\nabla f(x)^T(y-x),\qquad \nabla^2f(x)\succeq0,\qquad \nabla f(x^*)^T(x-x^*)\ge0\ \ \forall x\in C,
$$

$$
X^TXw=X^Ty,\qquad u^*=\operatorname{clip}\Bigl(\frac{t-x_0}{1+\lambda},[-u_{\max},u_{\max}]\Bigr),\qquad \ell(m)=\log(1+e^{-m}).
$$

Dòng đầu là định nghĩa tập lồi và hàm lồi. Dòng thứ hai là hai tiêu chuẩn vi phân và điều kiện đủ tối ưu. Dòng cuối là ba công thức của ba trường hợp.

**Giả thiết thường bị bỏ qua.**

- Định lý 01.26 và 01.30 cần miền mở; với miền đóng, chứng nhận trên một miền mở chứa nó rồi hạn chế xuống.
- Định lý 01.33 cần cả miền lồi và hàm lồi.
- Lồi chặt (Định lý 01.35) chỉ cho "nhiều nhất một" nghiệm; tồn tại cần Định lý 01.36, 01.38 hoặc Hệ quả 01.41.
- Hessian xác định dương tại mọi điểm không thay được lồi mạnh (Nhận xét 01.43).
- Hệ quả 01.27 chỉ cho chiều đủ. Chiều cần "nghiệm thì gradient bằng không" là điều kiện bậc nhất của Bài 00 và chỉ đúng tại điểm trong của miền mở.
- Định lý 01.36 cần miền không rỗng, đóng và bị chặn, cả ba.
- Công thức $(X^TX)^{-1}X^Ty$ cần $\operatorname{rank}X=d$.

**Giới hạn còn lại và bài sau.** Đến đây, chúng ta chứng nhận được tính tối ưu của một điểm cho trước nhưng chưa có cách nhận dạng nhanh một bài toán là lồi khi nó có nhiều ràng buộc, và chưa có phương pháp tìm nghiệm khi không có công thức đóng.

Trong Bài 02 (Các bài toán tối ưu lồi), chúng ta xây dựng các lớp bài toán chuẩn (quy hoạch tuyến tính, quy hoạch bậc hai, quy hoạch hình học) và quy tắc nhận dạng chúng dựa trên định nghĩa và phép toán bảo toàn của chương này.

Điều kiện (7.3) mới là điều kiện đủ, và chỉ dễ kiểm tra khi miền đơn giản như một hộp. Trong Bài 03 (Đối ngẫu Lagrange), chúng ta biến các ràng buộc thành nhân tử để có cận dưới của giá trị tối ưu và điều kiện tối ưu dạng hệ phương trình. Trong Bài 04, chúng ta nghiên cứu điều kiện tối ưu với ràng buộc đẳng thức và phương pháp Newton.

## Bài tập củng cố

Bảng sau ánh xạ các bài tập của chương, cả bài tập trong mục và bài tập củng cố, tới năm mục tiêu học tập. Các bài trong mục này không trùng với bộ bài giao chính thức trong tệp bài tập của Bài 01.

| Mục tiêu | Bài tập trong mục | Bài tập củng cố |
|---|---|---|
| 1. Lập mô hình | 01.6 | 01.14 |
| 2. Giải ba trường hợp | 01.1, 01.2, 01.3, 01.4 | 01.16, 01.19 |
| 3. Kiểm tra tính lồi | 01.7, 01.8, 01.9, 01.10, 01.11 | 01.14, 01.17, 01.18 |
| 4. Ba kết luận về nghiệm | 01.5, 01.10, 01.12, 01.13 | 01.15, 01.17, 01.18, 01.21 |
| 5. Vận dụng vào AI | 01.13 | 01.19, 01.20, 01.21 |

### Mức nhận biết

::: exercise Bài tập 01.14 (Nhận biết: lập lịch sạc pin)
Một trạm sạc chọn công suất sạc $p_k$ trong $T$ giờ, $k=1,\ldots,T$, với $0\le p_k\le p_{\max}$, sao cho tổng năng lượng $\sum_kp_k=E$. Giá điện giờ $k$ là $c_k\ge0$, và để giảm hao mòn, độ thay đổi công suất bị phạt với hệ số $\gamma\ge0$. Chi phí là $\sum_{k=1}^Tc_kp_k+\gamma\sum_{k=2}^T(p_k-p_{k-1})^2$.

(a) Chỉ ra dữ kiện, biến quyết định, hàm mục tiêu và miền khả thi.

(b) Chứng nhận miền lồi và mục tiêu lồi, nêu căn cứ.
:::

::: hint
Miền là giao của một hộp và một tập affine. Mỗi hạng $(p_k-p_{k-1})^2$ là hợp của $s\mapsto s^2$ với một ánh xạ tuyến tính.
:::

::: solution
**(a) Lập mô hình.**

- Dữ kiện: $T$, $p_{\max}\ge0$, $E$, $c\in\mathbb R^T$, $\gamma\ge0$.
- Biến: $p\in\mathbb R^T$.
- Mục tiêu: $f_0(p)=c^Tp+\gamma\sum_{k\ge2}(p_k-p_{k-1})^2$.
- Miền: $C=\{p\mid0\le p_k\le p_{\max},\ \mathbf 1^Tp=E\}$.

**(b) Miền lồi.** $C$ là giao của hộp (Mệnh đề 01.19(d)) và tập affine $\{\mathbf 1^Tp=E\}$ (Mệnh đề 01.19(b)), lồi theo Mệnh đề 01.20(a). $C$ không rỗng khi và chỉ khi $0\le E\le Tp_{\max}$.

**(b) Mục tiêu lồi.** Hạng $c^Tp$ affine nên lồi. Mỗi $(p_k-p_{k-1})^2$ lồi theo Định lý 01.31(b). Tổng với hệ số $1$ và $\gamma\ge0$ lồi theo Định lý 01.31(a).
:::

::: exercise Bài tập 01.15 (Nhận biết: đúng hay sai)
Với mỗi phát biểu, cho biết đúng hay sai; nếu đúng, dẫn số hiệu kết quả; nếu sai, cho phản ví dụ.

(a) Hàm lồi chặt trên $\mathbb R$ luôn có điểm cực tiểu.

(b) Nếu $f:\mathbb R^d\to\mathbb R$ lồi, khả vi và $\nabla f(x^*)=0$ thì $x^*$ là cực tiểu toàn cục.

(c) Một bài toán với miền lồi và mục tiêu lồi có thể có đúng hai nghiệm.

(d) Hàm liên tục trên tập đóng, không rỗng luôn đạt giá trị nhỏ nhất.
:::

::: hint
Mỗi phát biểu ứng với một trong các kết quả của Mục 7 và Mục 8; kiểm tra giả thiết bị thiếu.
:::

::: solution
- **(a) Sai.** $e^x$ lồi chặt trên $\mathbb R$ và không đạt cận dưới đúng $0$.
- **(b) Đúng.** Hệ quả 01.27 với $C=D=\mathbb R^d$.
- **(c) Sai.** Theo Hệ quả 01.34 tập nghiệm lồi, nên nếu chứa hai điểm thì chứa cả đoạn nối, tức vô số điểm.
- **(d) Sai.** $f(x)=e^x$ trên tập đóng $\mathbb R$; thiếu giả thiết bị chặn của Định lý 01.36 hoặc giả thiết cưỡng bức của Định lý 01.38.
:::

### Mức tính toán hoặc chứng minh

::: exercise Bài tập 01.16 (Tính toán: điều khiển với cận không đối xứng)
Bộ chấp hành chỉ cho phép $u\in[-1,2]$. Cho $x_0=2$, $t=-4$, $\lambda=1$ và $q(u)=(x_0+u-t)^2+\lambda u^2$. Tính $u_{\mathrm{free}}=\frac{t-x_0}{1+\lambda}$ (2.2), đoán nghiệm $u^*$ bằng quy tắc cắt về đầu mút gần nhất, rồi chứng minh nó là nghiệm bằng điều kiện (7.3), $q'(u^*)(u-u^*)\ge0$ với mọi $u\in[-1,2]$; tính $x_1=x_0+u^*$ và $q(u^*)$.
:::

::: hint
Tính $q'(u^*)$ và xác định chiều dịch chuyển được phép từ đầu mút; $q$ lồi theo Ví dụ 01.13(a).
:::

::: solution
**Đoán nghiệm.** $u_{\mathrm{free}}=(-4-2)/2=-3<-1$, nên đầu mút gần nhất là $u^*=-1$ và $x_1=2-1=1$.

**Kiểm tra (7.3).** $q'(u)=2(x_0+u-t)+2\lambda u$ cho $q'(-1)=2\cdot5-2=8$. Với $u\in[-1,2]$, $q'(-1)(u+1)=8(u+1)\ge0$. Theo Hệ quả 01.27 ($q$ lồi trên $\mathbb R$), $u^*=-1$ là nghiệm, duy nhất vì $q$ lồi chặt.

**Tính và kiểm tra lại.** $q(-1)=(2-1+4)^2+1=26$. Kiểm tra theo (2.4), $q(u)=(1+\lambda)(u-u_{\mathrm{free}})^2+\frac{\lambda(t-x_0)^2}{1+\lambda}$: $2(-1+3)^2+\tfrac{1\cdot36}2=8+18=26$.
:::

::: exercise Bài tập 01.17 (Chứng minh: Hessian xác định dương nhưng không có nghiệm)
Cho $f(x)=(x_1+x_2)^2+e^{x_1}$ trên $\mathbb R^2$.

(a) Chứng minh $\nabla^2f(x)\succ0$ với mọi $x$, nên $f$ lồi chặt.

(b) Chứng minh $\inf f=0$ và không được đạt.

(c) Chỉ ra giả thiết nào của Hệ quả 01.41 và Định lý 01.38 bị vi phạm.
:::

::: hint
Ở (b), xét $f$ dọc đường thẳng $x=(-s,s)$ khi $s\to+\infty$.
:::

::: solution
**(a)** $\nabla^2f(x)=\begin{bmatrix}2+e^{x_1}&2\\2&2\end{bmatrix}$, với phần tử góc $2+e^{x_1}>0$ và định thức $2(2+e^{x_1})-4=2e^{x_1}>0$. Vậy $\nabla^2f\succ0$ và $f$ lồi chặt theo Định lý 01.30(b).

**(b)** $f(x)>0$ vì $e^{x_1}>0$. Dọc $x=(-s,s)$, $f=0+e^{-s}\to0$. Vậy $\inf f=0$, không đạt.

**(c) Không lồi mạnh.** Giá trị riêng nhỏ nhất của Hessian dần tới $0$ khi $x_1\to-\infty$, vì định thức $2e^{x_1}\to0$ trong khi vết bị chặn trên dọc hướng đó. Do đó không có $\mu>0$ với $\nabla^2f\succeq\mu I_2$: $f$ không lồi mạnh.

**(c) Không cưỡng bức.** $f$ không cưỡng bức, vì $\lVert(-s,s)\rVert_2\to\infty$ mà $f\to0$. Đây là phiên bản hai chiều của Nhận xét 01.43.
:::

::: exercise Bài tập 01.18 (Chứng minh: máy vector hỗ trợ lề mềm)
Cho dữ liệu $(a_i,y_i)$, $a_i\in\mathbb R^d$, $y_i\in\{-1,+1\}$, và $\mu>0$. Chứng minh bài toán $\min_{w\in\mathbb R^d}G(w)$ với $G(w)=\sum_{i=1}^n\max(0,1-y_ia_i^Tw)+\tfrac\mu2\lVert w\rVert_2^2$ có đúng một nghiệm. Giải thích vì sao không dùng được Hệ quả 01.41 trực tiếp.
:::

::: hint
Tách chứng minh thành ba phần: lồi chặt (Định lý 01.31), liên tục và cưỡng bức, rồi Định lý 01.38 và Định lý 01.35.
:::

::: solution
**Bước 1 (lồi chặt).** Mỗi hạng $\max(0,1-y_ia_i^Tw)$ là cực đại của hai hàm affine theo $w$, lồi theo Định lý 01.31(c). Hạng $\tfrac\mu2\lVert w\rVert_2^2$ lồi chặt (Hessian $\mu I_d\succ0$). Theo Định lý 01.31(a), $G$ lồi chặt.

**Bước 2 (liên tục và cưỡng bức).** $G$ liên tục vì là tổng và cực đại của các hàm liên tục. Vì mỗi hạng bản lề không âm, $G(w)\ge\tfrac\mu2\lVert w\rVert_2^2\to\infty$, nên $G$ cưỡng bức.

**Bước 3 (tồn tại và duy nhất).** Định lý 01.38 trên miền đóng $\mathbb R^d$ cho nghiệm tồn tại, Định lý 01.35 cho duy nhất.

**Vì sao không dùng Hệ quả 01.41.** Hệ quả 01.41 giả thiết $f$ khả vi, mà hạng bản lề không khả vi tại $y_ia_i^Tw=1$. Vì vậy chứng minh đi qua Định lý 01.38 và 01.35.
:::

### Mức vận dụng vào AI

::: exercise Bài tập 01.19 (Vận dụng: hồi quy với chính quy hóa bậc hai)
**Dữ kiện.** Ví dụ 01.4: $X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix}$, $y=(1,2,2)^T$, $J(w)=\lVert Xw-y\rVert_2^2$, nghiệm $w^*=(7/6,1/2)^T$ với $J(w^*)=\tfrac16$. Định nghĩa 01.42: $J_\mu(w)=J(w)+\tfrac\mu2\lVert w\rVert_2^2$.

Với dữ liệu của Ví dụ 01.4, xét $R_\mu(w)=\lVert Xw-y\rVert_2^2+\mu\lVert w\rVert_2^2$ với $\mu=1$, tức $R_\mu=J_{2\mu}$ theo Định nghĩa 01.42.

(a) Chứng minh với mọi $X$ và mọi $\mu>0$, $R_\mu$ có đúng một nghiệm, nghiệm của $(X^TX+\mu I_d)w=X^Ty$.

(b) Tính nghiệm với $\mu=1$, so với $w^*=(7/6,1/2)^T$ về chuẩn và về $J$.
:::

::: hint
$\nabla^2R_\mu=2X^TX+2\mu I_d$. Ở (b), giải hệ $2\times2$.
:::

::: solution
**(a) Bước 1 (tồn tại và duy nhất).** $\nabla^2R_\mu=2X^TX+2\mu I_d\succeq2\mu I_d$, nên $R_\mu$ lồi mạnh với hằng số $2\mu$ (Nhận xét 01.40), và Hệ quả 01.41 cho $R_\mu$ có đúng một nghiệm.

**(a) Bước 2 (phương trình nghiệm).** Gradient là $\nabla R_\mu(w)=2X^T(Xw-y)+2\mu w$, nên $\nabla R_\mu(w)=0$ tương đương $(X^TX+\mu I_d)w=X^Ty$. Ma trận $X^TX+\mu I_d$ xác định dương, vì $v^T(X^TX+\mu I_d)v=\lVert Xv\rVert_2^2+\mu\lVert v\rVert_2^2>0$ với $v\ne0$. Do đó nó khả nghịch và hệ có đúng một nghiệm $\bar w$.

**(a) Bước 3 (khớp hai nghiệm).** Theo Hệ quả 01.27, $\bar w$ là cực tiểu toàn cục; vì nghiệm tối ưu duy nhất, nó trùng với $\bar w$.

**(b) Tính.** $X^TX+I_2=\begin{bmatrix}4&3\\3&6\end{bmatrix}$, $X^Ty=(5,6)^T$, định thức $15$, nên

$$
w_1^*=\tfrac1{15}\begin{bmatrix}6&-3\\-3&4\end{bmatrix}\begin{bmatrix}5\\6\end{bmatrix}=(0{,}8;\ 0{,}6).
$$

**(b) Kiểm tra lại.** $4\cdot0{,}8+3\cdot0{,}6=5$ và $3\cdot0{,}8+6\cdot0{,}6=6$.

**(b) So sánh.** Chuẩn bình phương giảm từ $\tfrac{49}{36}+\tfrac14\approx1{,}611$ xuống $0{,}64+0{,}36=1$. Dự đoán $(0{,}8;\ 1{,}4;\ 2{,}0)$, phần dư $(-0{,}2;\ -0{,}6;\ 0)$, $J=0{,}4>\tfrac16$.

**(b) Diễn giải.** Chính quy hóa làm giảm chuẩn tham số và làm tăng sai số huấn luyện. Nó không co từng hệ số, vì hệ số góc tăng từ $0{,}5$ lên $0{,}6$.
:::

::: exercise Bài tập 01.20 (Vận dụng: trung bình hai mô hình)
**Dữ kiện.** Ví dụ 01.6: $L(0)=2\log2\approx1{,}3863$, $L(1)\approx0{,}6265$, $L(2)\approx0{,}2539$. Tình huống 01.3: mạng $\widehat y=\alpha\tanh(\beta z)$, một mẫu $(z,y)=(1,\tfrac12)$, mất mát $F(\alpha,\beta)=(\alpha\tanh\beta-\tfrac12)^2$; hai nghiệm $P_1=(1,\beta_0)$, $P_2=(-1,-\beta_0)$ với $\beta_0=\operatorname{artanh}\tfrac12\approx0{,}5493$, $F(P_1)=F(P_2)=0$.

(a) Với $L(w)=2\log(1+e^{-w})$ của Ví dụ 01.6 và hai mô hình $w_a=0$, $w_b=2$, so sánh trực tiếp $L(\tfrac{w_a+w_b}2)$ với $\tfrac12L(w_a)+\tfrac12L(w_b)$ và chỉ ra định nghĩa nào bảo đảm chiều bất đẳng thức.

(b) Với mạng của Tình huống 01.3, lấy trung bình hai nghiệm $P_1$, $P_2$ và tính mất mát.

(c) Giải thích sự khác nhau.
:::

::: hint
Dùng bảng của Ví dụ 01.6 và giá trị $F(0,0)$ trong Tình huống 01.3.
:::

::: solution
**(a)** $L(1)\approx0{,}6265$ và $\tfrac12(1{,}3863+0{,}2539)=0{,}8201$, nên $L(1)<\tfrac12L(0)+\tfrac12L(2)$. Chiều này được bảo đảm bởi (7.1) với $\theta=\tfrac12$, vì $L$ lồi (Ví dụ 01.14(b)).

**(b)** Trung bình của $P_1=(1,\beta_0)$ và $P_2=(-1,-\beta_0)$ là $(0,0)$, với $F(0,0)=\tfrac14$, trong khi cả hai mô hình có mất mát $0$.

**(c)** Mất mát của mạng không lồi theo tham số, nên (7.1) không được bảo đảm; trộn tham số của hai mạng có mất mát $0$ có thể cho một mạng có mất mát lớn hơn. Trộn dự đoán của hai mạng cho kết quả khác: dự đoán trung bình $\tfrac12(\tfrac12+\tfrac12)=\tfrac12$ vẫn đúng, vì mất mát lồi theo dự đoán.
:::

::: exercise Bài tập 01.21 (Vận dụng: ràng buộc chuẩn thay cho chính quy hóa)
**Dữ kiện.** Ví dụ 01.6: hai mẫu $(1,+1)$, $(-1,-1)$, $L(w)=2\log(1+e^{-w})$, $L(2)\approx0{,}2539$. Tình huống 01.1: $L_\mu(w)=L(w)+\tfrac\mu2w^2$; với $\mu=0{,}1$, nghiệm $w^*_\mu\approx2{,}1280$ và $\sigma(w^*_\mu)\approx0{,}8936$, trong đó $\sigma(s)=1/(1+e^{-s})$. Điều kiện (7.3) trên đoạn: $L'(w^*)(w-w^*)\ge0$ với mọi $w\in[-R,R]$.

Với dữ liệu tách được của Ví dụ 01.6, thay vì chính quy hóa, giới hạn độ lớn tham số: $\min_{\lvert w\rvert\le R}L(w)$ với $L(w)=2\log(1+e^{-w})$ và $R>0$.

(a) Chứng nhận bài toán có đúng một nghiệm với mọi $R>0$.

(b) Chứng minh nghiệm là $w^*=R$ bằng điều kiện (7.3).

(c) Với $R=2$, tính giá trị tối ưu và xác suất đúng nhãn $\sigma(w^*)$, rồi so với Tình huống 01.1 khi $\mu=0{,}1$.
:::

::: hint
Miền là một đoạn; $L'(w)=-2/(1+e^w)<0$. Dùng bảng của Ví dụ 01.6.
:::

::: solution
**(a) Tồn tại.** Miền $[-R,R]$ không rỗng, đóng, bị chặn và lồi (Ví dụ 01.10(a)); $L$ liên tục, nên Định lý 01.36 cho nghiệm tồn tại.

**(a) Duy nhất.** $L''(w)=2e^w/(1+e^w)^2>0$, nên $L$ lồi chặt trên $\mathbb R$ (Định lý 01.30(b)) và trên đoạn (Nhận xét 01.23). Định lý 01.35 cho nghiệm duy nhất.

**(b)** $L'(R)=-2/(1+e^R)<0$, và với $w\in[-R,R]$, $w-R\le0$, nên $L'(R)(w-R)\ge0$. Theo Hệ quả 01.27, $w^*=R$ là nghiệm.

**(c) Tính.** $L(2)\approx0{,}2539$ và $\sigma(2)=1/(1+e^{-2})\approx0{,}8808$.

**(c) So sánh.** Tình huống 01.1 với $\mu=0{,}1$ cho $w^*_\mu\approx2{,}128$ và $\sigma\approx0{,}8936$, gần với ràng buộc $R=2$. Cả hai cách đều giữ tham số hữu hạn, một cách bằng số hạng phạt trong mục tiêu, một cách bằng biên của miền.
:::

## Hướng dẫn đọc thêm và tài liệu tham khảo

- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press. Mục 1.1–1.3 cho mô hình tối ưu và bình phương nhỏ nhất (Mục 2, 3, 5 của chương). Mục 2.1–2.3 cho tập lồi, các tập cơ bản và phép toán bảo toàn (Mục 6). Mục 3.1 cho định nghĩa hàm lồi, điều kiện bậc nhất (3.1.3), bậc hai (3.1.4) và tập mức dưới (3.1.6); mục 3.2.1–3.2.3 cho phép toán bảo toàn (Mục 7). Mục 4.1–4.2, đặc biệt 4.2.2 (địa phương và toàn cục) và 4.2.3 (điều kiện tối ưu cho hàm khả vi, trang 139), cho Mục 5, 7 và 8. Mục 8.6.1 cho phân loại tuyến tính có lề. Mục 9.1.2 (trang 459) cho tính lồi mạnh.
- Walter Rudin (1976), *Principles of Mathematical Analysis*, xuất bản lần thứ ba, McGraw-Hill, Định lý 2.41 (trang 40) và Định lý 4.16 (trang 89): tập đóng và bị chặn trong $\mathbb R^d$ là compact, và hàm liên tục trên tập compact đạt giá trị nhỏ nhất (Định lý 01.36).
- Stephen Boyd và Pablo Parrilo, MIT OpenCourseWare 6.079/6.975 *Introduction to Convex Optimization*, Fall 2009: lec01, tức Bài giảng 1 (mô hình tối ưu, bình phương nhỏ nhất, bài toán chiếu sáng trang 1-9 đến 1-12, quan hệ địa phương – toàn cục trang 1-14), lec02 (tập lồi, trang 2-3 đến 2-13), lec03 (hàm lồi, trang 3-2 đến 3-15). Tài liệu dùng theo giấy phép CC BY-NC-SA 4.0; các hình của chương được vẽ lại cục bộ.
- Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội, đề cương học phần UET.AI2012 *Cơ sở toán học của Trí tuệ nhân tạo*, mục I và III: cấu trúc hai phần của học phần, phạm vi và chuẩn đầu ra LLO1, LLO2, CLO1.
- Đọc tiếp trong học phần: Bài 00 cho các công cụ đại số tuyến tính và giải tích được nhắc lại ở phần kiến thức tiên quyết; Bài 02 cho các lớp bài toán tối ưu lồi; Bài 05b cho vai trò của tính lồi và lồi mạnh trong hội tụ của hạ gradient.
