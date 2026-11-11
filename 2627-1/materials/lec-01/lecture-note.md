# Bài 01 — Giới thiệu tối ưu, tập lồi và hàm lồi

Bài 00 cho hai điều kiện tối ưu của hàm khả vi trên tập mở: một cực tiểu địa phương có gradient bằng $0$ (Định lý 00.42), và một điểm dừng có Hessian xác định dương là cực tiểu địa phương chặt (Định lý 00.43). Cả hai chỉ cho kết luận địa phương. Câu hỏi trung tâm của Bài 01 là: **khi nào một điểm tìm được là nghiệm toàn cục, khi nào nghiệm tồn tại và khi nào nghiệm duy nhất.** Để trả lời, chúng ta xây dựng ba nhóm đối tượng, bao gồm:

- ba bài toán tối ưu cụ thể (điều khiển một bước, bình phương nhỏ nhất, hồi quy logistic) và dạng tổng quát chứa cả ba;
- tập lồi và hàm lồi cùng các tiêu chuẩn kiểm tra;
- ba điều kiện đủ riêng cho ba kết luận về nghiệm, ghép thành một quy trình chứng nhận.

## Câu hỏi mở đầu

Một bộ phân loại một chiều dự đoán nhãn $+1$ khi $wa>0$ và nhãn $-1$ khi $wa<0$, với đặc trưng $a\in\mathbb R$ và tham số $w\in\mathbb R$. Giả sử tập huấn luyện gồm hai mẫu

- $(a_1,y_1)=(1,+1)$,
- $(a_2,y_2)=(-1,-1)$,

và $w$ được chọn bằng cách cực tiểu tổng mất mát logistic $L(w)=2\log(1+e^{-w})$. Khi $w$ tăng, mất mát giảm:

| $w$ | $0$ | $1$ | $2$ | $4$ | $8$ |
|---:|---:|---:|---:|---:|---:|
| $L(w)$ | $1{,}3863$ | $0{,}6265$ | $0{,}2539$ | $0{,}0363$ | $0{,}0007$ |

Đạo hàm bậc hai $L''(w)=2e^w/(1+e^w)^2$ dương tại mọi $w$. Một thuật toán huấn luyện dừng khi mất mát nhỏ hơn $0{,}001$ và trả về $w=8$.

**Câu hỏi.** Bài toán $\min_{w\in\mathbb R}L(w)$ có nghiệm không, và $w=8$ có là nghiệm của nó không?

Một câu trả lời hấp dẫn là: có, vì đồ thị của $L$ cong lên tại mọi điểm nên $L$ có đúng một điểm cực tiểu, và mất mát giảm đều chứng tỏ thuật toán đã tới gần điểm đó. Lập luận này có ba lỗ hổng:

- bảng chỉ cho biết $L$ dương và giảm tại năm điểm; nó không cho biết $L$ đạt giá trị nhỏ nhất tại một điểm hữu hạn hay không;
- độ cong dương tại từng điểm không ngăn một hàm giảm mãi theo một hướng;
- một dãy tham số có mất mát giảm chỉ cho biết giá trị hàm tiến về một số; bản thân dãy tham số có thể tiến ra vô cực.

Để trả lời câu hỏi cho một bài toán tối ưu bất kỳ, chúng ta tách ba kết luận về nghiệm (toàn cục, tồn tại, duy nhất), mỗi kết luận với một giả thiết riêng.

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Tách dữ kiện, biến quyết định, hàm mục tiêu và miền khả thi của một tình huống ra quyết định, rồi viết bài toán tối ưu ở dạng tổng quát.
2. Lập và giải bài toán điều khiển một bước, bài toán bình phương nhỏ nhất và bài toán hồi quy logistic trên dữ liệu nhỏ.
3. Kiểm tra tính lồi của một tập bằng định nghĩa và các phép toán bảo toàn tính lồi; kiểm tra tính lồi của một hàm bằng định nghĩa, điều kiện bậc nhất, điều kiện bậc hai hoặc các phép toán bảo toàn tính lồi.
4. Chứng nhận riêng từng kết luận về nghiệm (cực tiểu địa phương là toàn cục, nghiệm tồn tại, nghiệm duy nhất) và nêu đúng giả thiết của từng kết luận.
5. Áp dụng quy trình chứng nhận cho một mô hình học máy mới và chỉ ra kết luận nào mất khi một giả thiết bị vi phạm.

## Kiến thức tiên quyết

Bài 01 dùng các kết quả sau của Bài 00 và của học phần Giải tích 1.

- **Gradient, Hessian và hàm hạn chế lên đường thẳng** (Định nghĩa 00.30, Định nghĩa 00.36, Mệnh đề 00.38). Với $f$ thuộc lớp $C^2$ trên tập mở $D\subseteq\mathbb R^d$, $x\in D$ và hướng $v\in\mathbb R^d$, hàm $\varphi(\tau)=f(x+\tau v)$ có
$$
\begin{aligned}
\varphi'(\tau)&=\nabla f(x+\tau v)^Tv,\\
\varphi''(\tau)&=v^T\nabla^2f(x+\tau v)\,v .
\end{aligned}
$$
(Bài 00 viết hàm này là $\gamma(t)$ với hướng $d$.) Một bước hạ gradient từ $w$ với độ dài bước $\eta>0$ là $w^+=w-\eta\nabla f(w)$ (Định nghĩa 00.46).
- **Cực tiểu địa phương, điểm dừng và hai điều kiện tối ưu** (Định nghĩa 00.41, Định lý 00.42, Định lý 00.43). Trên tập mở, cực tiểu địa phương của hàm khả vi có gradient bằng $0$; điểm dừng có Hessian xác định dương là cực tiểu địa phương chặt, điểm dừng có Hessian bất định dấu là điểm yên ngựa.
- **Dạng toàn phương** (Định nghĩa 00.17, Mệnh đề 00.18, Hệ quả 00.19). Ma trận đối xứng $Q$ thỏa $Q\succeq0$ nếu $v^TQv\ge0$ với mọi $v$, và $Q\succ0$ nếu $v^TQv>0$ với mọi $v\ne0$; $\lambda_{\min}(Q)\,v^Tv\le v^TQv$; ma trận xác định dương thì khả nghịch.
- **Ma trận Gram** (Mệnh đề 00.20). Với $X\in\mathbb R^{n\times d}$: $X^TX\succeq0$, $\operatorname{Ker}(X^TX)=\operatorname{Ker}(X)$, và $X^TX\succ0$ khi và chỉ khi $\operatorname{rank}(X)=d$.
- **Phân tích trực giao và hạng** (Mệnh đề 00.8). Với $A\in\mathbb R^{m\times n}$: $\operatorname{Col}(A)=\operatorname{Ker}(A^T)^\perp$, hạng hàng bằng hạng cột, và $\dim\operatorname{Ker}(A)=n-\operatorname{rank}(A)$.
- **Phân rã trị riêng** (Định lý 00.16 và hệ thức ngay sau nó). Ma trận đối xứng $A=Q\Lambda Q^T$ với $Q$ trực giao, $\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$; $\det(A)=\prod_i\lambda_i$, $\operatorname{tr}(A)=\sum_i\lambda_i$.
- **Tập nghiệm của hệ tuyến tính** (Định lý 00.9). Nếu $x'$ là một nghiệm của $Ax=c$ thì tập nghiệm là $x'+\operatorname{Ker}(A)$.
- **Phương trình chuẩn** (Định nghĩa 00.21, Định lý 00.22, Mệnh đề 00.45). Với $f(w)=\tfrac12\lVert Xw-y\rVert_2^2$: $w$ là nghiệm bình phương nhỏ nhất khi và chỉ khi $X^TXw=X^Ty$; hệ này luôn có nghiệm; nghiệm duy nhất khi và chỉ khi $\operatorname{rank}(X)=d$; $\nabla f(w)=X^T(Xw-y)$ và $\nabla^2f=X^TX$.
- **Cauchy–Schwarz và bất đẳng thức tam giác** (Mệnh đề 00.5). $\lvert u^Tv\rvert\le\lVert u\rVert_2\lVert v\rVert_2$ và $\lVert u+v\rVert_2\le\lVert u\rVert_2+\lVert v\rVert_2$.
- **Hàm hợp lý** (Định nghĩa 00.64, Mệnh đề 00.65). Với các quan sát độc lập, hàm hợp lý là tích các mật độ; dưới nhiễu Gauss độc lập, ước lượng hợp lý cực đại là nghiệm bình phương nhỏ nhất.
- **Giải tích 1.** Các kết quả sau:
  - định lý giá trị trung bình;
  - định lý giá trị trung gian;
  - hàm có đạo hàm không âm trên một khoảng thì không giảm trên khoảng đó;
  - định lý Bolzano–Weierstrass: mọi dãy bị chặn trong $\mathbb R^d$ có một dãy con hội tụ;
  - *cận dưới đúng* (infimum) $\inf$ của một tập số thực là cận dưới lớn nhất của tập đó.
- **Tập mở, tập đóng, tập bị chặn.** Cho $C\subseteq\mathbb R^d$.
  - Điểm $x\in C$ là *điểm trong* (interior point) của $C$ nếu có $r>0$ sao cho mọi $z$ thỏa $\lVert z-x\rVert_2<r$ thuộc $C$; $C$ là *mở* (open) nếu mọi điểm của $C$ là điểm trong; *biên* (boundary) của $C$ gồm các điểm $x$ mà mọi quả cầu tâm $x$ đều chứa điểm thuộc $C$ và điểm không thuộc $C$; với $C$ đóng, đó là các điểm của $C$ không là điểm trong, như hai đầu mút của một đoạn.
  - $C$ là *đóng* (closed) nếu giới hạn của mọi dãy hội tụ gồm các điểm của $C$ cũng thuộc $C$.
  - $C$ là *bị chặn* (bounded) nếu có $R>0$ sao cho $\lVert x\rVert_2\le R$ với mọi $x\in C$.

**Câu hỏi ôn nhanh.**

1. Cho $X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix}$. Tính $X^TX$ và xác định $X^TX$ có xác định dương không.
2. Tính đạo hàm của $m\mapsto\log(1+e^{-m})$.
3. Xác định $\inf_{x\in(0,1]}x$ và cho biết giá trị đó có đạt tại một điểm của $(0,1]$ không.

::: hint Lời giải câu hỏi ôn nhanh
1. $X^TX=\begin{bmatrix}3&3\\3&5\end{bmatrix}$. Hai cột của $X$ độc lập tuyến tính nên $\operatorname{rank}(X)=2$ và $X^TX\succ0$ theo Mệnh đề 00.20.
2. Theo quy tắc dây chuyền, đạo hàm là $-e^{-m}/(1+e^{-m})=-1/(1+e^m)$.
3. $\inf_{x\in(0,1]}x=0$; giá trị này không đạt, vì $0\notin(0,1]$.
:::

## 1. Thiết lập bài toán

Một *bài toán tối ưu* (optimization problem) chọn một đại lượng làm nhỏ nhất một tiêu chí trên một tập lựa chọn cho phép. Bài 01 xét bài toán gồm các thành phần sau.

1. **Dữ kiện.** Các đại lượng đã biết và cố định: trạng thái, đích, dữ liệu $(a_i,y_i)$, giới hạn vật lý.
2. **Biến quyết định.** Tác động $u\in\mathbb R$, tham số $w\in\mathbb R^d$, hoặc tổng quát $x\in\mathbb R^d$.
3. **Hàm mục tiêu.** Một hàm thực $f_0$ của biến quyết định, giá trị nhỏ hơn được ưu tiên.
4. **Miền khả thi.** Tập $C$ các giá trị được phép, mô tả bằng ràng buộc bất đẳng thức và đẳng thức.
5. **Câu hỏi về nghiệm.** Một *nghiệm* là một điểm của miền khả thi có giá trị hàm mục tiêu không lớn hơn giá trị tại mọi điểm khả thi khác. Ba câu hỏi là: một điểm cho trước có là nghiệm không; bài toán có nghiệm không; nghiệm có duy nhất không.
6. **Đối tượng so sánh.** Ba bài toán của ví dụ xuyên suốt (điều khiển một bước, bình phương nhỏ nhất, hồi quy logistic), mỗi bài cho một kết luận khác về nghiệm.

## 2. Ký hiệu và giả thiết

Vô hướng và vector viết chữ thường, ma trận viết chữ hoa, không in đậm; mọi vector là vector cột. Bất đẳng thức giữa hai vector, như $w\ge0$, hiểu theo từng tọa độ. Ký hiệu $\log$ là logarit tự nhiên. Ký hiệu chỉ dùng trong một ví dụ, một chứng minh hoặc một bài tập được giới thiệu tại chỗ.

| Ký hiệu | Ý nghĩa | Phạm vi, giả thiết |
|---|---|---|
| $x\in\mathbb R^d$, $x_j$, $x^*$ | biến quyết định của bài toán tổng quát, tọa độ thứ $j$, một nghiệm | từ §5 |
| $D$; $f_0$; $f_i$, $h_j$; $n_{\mathrm{in}}$, $n_{\mathrm{eq}}$ | miền xác định; hàm mục tiêu; hàm ràng buộc bất đẳng thức, đẳng thức; số ràng buộc mỗi loại | §5 |
| $C$; $p^*$; $S^*$ | tập khả thi; giá trị tối ưu $\inf_{x\in C}f_0(x)$; tập nghiệm | $p^*\in\mathbb R\cup\{-\infty,+\infty\}$ |
| $x_0$, $x_1$; $t$ | trạng thái đầu và trạng thái sau một bước; đích | chỉ trong mô hình điều khiển |
| $u$; $u_{\max}$; $\lambda$ | tác động; biên độ lớn nhất; trọng số năng lượng | $u_{\max}\ge0$, $\lambda\ge0$ |
| $q$; $u_{\mathrm{free}}$; $\operatorname{clip}(u,[\underline u,\overline u])$ | hàm chi phí điều khiển; điểm cực tiểu của $q$ trên $\mathbb R$; $\min(\max(u,\underline u),\overline u)$ | §4.1 |
| $X\in\mathbb R^{n\times d}$; $a_i\in\mathbb R^d$; $y\in\mathbb R^n$ | ma trận thiết kế (hàng $i$ là $a_i^T$); vector đặc trưng của mẫu $i$; vector đầu ra | $n$ mẫu, $d$ tham số |
| $s_i$, $y_i$ | đầu vào một chiều và đầu ra của mẫu $i$ | hồi quy một biến |
| $w$; $w_0$, $w_1$ | vector tham số; hệ số chặn và hệ số góc khi $\hat y=w_0+w_1s$ | $w=(w_0,w_1)^T$ khi $d=2$ |
| $J(w)=\lVert Xw-y\rVert_2^2$ | tổng bình phương phần dư | $J=2f$ với $f$ của Định nghĩa 00.21 |
| $m_i=y_ia_i^Tw$ | biên có dấu của mẫu $i$ | $y_i\in\{-1,+1\}$ |
| $\ell(m)$; $\sigma(\zeta)$; $L(w)$ | $\log(1+e^{-m})$; $1/(1+e^{-\zeta})$; $\sum_i\ell(m_i)$ | — |
| $\ell_{\mathrm{hinge}}(m)$ | $\max(0,1-m)$ | — |
| $\inf$, $\min$ | cận dưới đúng, giá trị nhỏ nhất | §4.3 |
| $\theta$; $z_\theta=\theta x+(1-\theta)y$ | hệ số và điểm trên đoạn nối hai điểm $x$, $y$ | $\theta\in[0,1]$; ở §6–§8, $y$ là một điểm, không là vector đầu ra |
| $\mathbb 1$ | vector có mọi tọa độ bằng $1$ | kích thước theo ngữ cảnh |
| $\omega$; $\Delta_K$ | trọng số trộn; $\{\omega\in\mathbb R^K\mid\omega\ge0,\ \mathbb 1^T\omega=1\}$ | — |
| $B(x_{\mathrm c},r)$ | quả cầu Euclid đóng tâm $x_{\mathrm c}$ bán kính $r$ | $r\ge0$ |
| $S_\alpha(f)$ | $\{x\in C\mid f(x)\le\alpha\}$ | $\alpha\in\mathbb R$ |
| $\nabla f$, $\nabla^2f$; $\varphi_{x,v}(\tau)=f(x+\tau v)$ | gradient, Hessian; hàm hạn chế lên đường thẳng | $\tau\in\mathbb R$ |
| $Q\succeq0$, $Q\succ0$; $I_d$; $\lambda_{\min}$ | nửa xác định dương, xác định dương; ma trận đơn vị; giá trị riêng nhỏ nhất | $Q$ đối xứng |
| $\mu$; $F_\mu(w)=F(w)+\tfrac\mu2\lVert w\rVert_2^2$ | hệ số của hạng $\tfrac\mu2\lVert w\rVert_2^2$ | $\mu>0$ |

Các giả thiết về dữ liệu:

- $X$ và $y$ tùy ý; hạng của $X$ chỉ được giả thiết khi kết quả nêu rõ;
- nhãn $y_i\in\{-1,+1\}$ trong hồi quy logistic;
- khi đọc mất mát logistic theo xác suất, các mẫu độc lập và $\Pr(y=+1\mid a)=\sigma(a^Tw)$.

## 3. Ví dụ xuyên suốt: ba quyết định

Ba tình huống ra quyết định sau được dùng trong toàn bài:

- **điều khiển một bước:** chọn tác động $u$ để trạng thái mới $x_1=x_0+u$ gần đích $t$, tốn ít năng lượng và không vượt giới hạn $u_{\max}$ (hình thứ nhất);
- **hồi quy tuyến tính** (linear regression): chọn hai hệ số của một đường thẳng làm các sai lệch thẳng đứng nhỏ (hình thứ hai);
- **hồi quy logistic:** chọn các hệ số của một đường biên chia mặt phẳng thành hai nửa ứng với hai lớp dự đoán (hình thứ ba).

![Trạng thái x0 cộng tác động u cho trạng thái x1, được so với đích t; hai hạng chi phí là (x1 − t) bình phương và lambda nhân u bình phương; tác động bị giới hạn bởi trị tuyệt đối của u không vượt quá u max.](img/lec-01/m03-control-target.svg)

![Năm điểm dữ liệu, một đường thẳng khớp dữ liệu và các đoạn thẳng đứng nối mỗi điểm với đường thẳng, biểu diễn phần dư được bình phương trong hàm mục tiêu.](img/lec-01/m03-linear-fit-sketch.svg)

![Hai lớp điểm, một lớp hình tròn và một lớp hình vuông, được tách bởi một đường biên quyết định.](img/lec-01/m03-logistic-classes.svg)

Ví dụ sau cố định dữ kiện số của ba tình huống.

::: example Ví dụ 01.1 (Ba quyết định)
**Điều khiển một bước.** Một vật ở vị trí $x_0=0$ trên một trục thẳng cần tới đích $t=3$ sau một bước. Bộ chấp hành tạo được tác động $u$ với $\lvert u\rvert\le u_{\max}=1$, và trọng số năng lượng là $\lambda=\tfrac12$.

**Hồi quy tuyến tính.** Giả sử năm người có cân nặng $s_i$ (kg) và chiều cao $y_i$ (cm) như sau.

| $s_i$ | $50$ | $55$ | $60$ | $65$ | $70$ |
|---:|---:|---:|---:|---:|---:|
| $y_i$ | $158$ | $162$ | $164$ | $169$ | $172$ |

Bộ dữ liệu thứ hai gồm ba điểm không đơn vị:

- $(s_1,y_1)=(0,1)$,
- $(s_2,y_2)=(1,2)$,
- $(s_3,y_3)=(2,2)$.

**Hồi quy logistic.** Mỗi quả cam trên một dây chuyền đóng gói được mô tả bằng hai đặc trưng đo từ ảnh và nhãn $y=+1$ (cam tốt) hoặc $y=-1$ (cam xấu). Giả sử chỉ dùng một đặc trưng $a\in\mathbb R$. Bộ hai mẫu gồm:

- $(a_1,y_1)=(1,+1)$,
- $(a_2,y_2)=(-1,-1)$.

Bộ ba mẫu gồm hai mẫu trên và $(a_3,y_3)=(1,-1)$.

**Kiểm tra lại.** Muốn tới đúng đích, vật cần tác động $t-x_0=3>u_{\max}=1$, nên giới hạn $\lvert u\rvert\le1$ ngăn vật tới đích trong một bước. Với năm người, $\sum_is_i=300$ và $\sum_iy_i=825$, nên cân nặng trung bình là $60$ kg và chiều cao trung bình là $165$ cm.
:::

Ba tình huống cho ba hiện tượng về nghiệm, bao gồm:

- bài toán điều khiển có nghiệm nằm trên biên của miền cho phép, tại đó đạo hàm của hàm chi phí khác $0$;
- bài toán bình phương nhỏ nhất có vô số nghiệm khi hai cột của ma trận thiết kế trùng nhau;
- bài toán hồi quy logistic trên hai mẫu có cận dưới đúng của mất mát mà không tham số nào đạt được.

## 4. Ba mô hình tối ưu

Mỗi tình huống của Ví dụ 01.1 trở thành một bài toán tối ưu khi ta chỉ rõ biến quyết định, hàm mục tiêu và miền.

### 4.1. Điều khiển một bước và nghiệm trên biên

Hai yêu cầu của bài toán điều khiển xung đột nhau: muốn trạng thái mới gần đích thì cần tác động lớn, muốn tiết kiệm năng lượng thì cần tác động nhỏ. Một cách trực quan, mỗi tác động $u$ sinh ra một chi phí bám đích và một chi phí năng lượng, và ta chọn $u$ có tổng chi phí nhỏ nhất trong các tác động được phép.

![Sơ đồ: trạng thái đầu x0 cộng tác động u cho trạng thái mới x1 bằng x0 cộng u; nhánh trên tính sai lệch bám đích (x1 − t) bình phương, nhánh dưới tính năng lượng lambda nhân u bình phương; hai hạng cộng thành chi phí q(u); một khung ghi giới hạn trị tuyệt đối của u không vượt quá u max.](img/lec-01/one-step-control.svg)

Trên sơ đồ, phép cộng $x_1=x_0+u$ là *phương trình trạng thái* (state equation; còn gọi là động lực học, dynamics) của một bước, hai nhánh ra từ $u$ là hai chi phí, và khung giới hạn vật lý loại hẳn các tác động có $\lvert u\rvert>u_{\max}$ khỏi tập lựa chọn. Để làm rõ mô hình này, xem định nghĩa sau.

::: definition Định nghĩa 01.1 (Bài toán điều khiển một bước)
Cho các dữ kiện: trạng thái đầu $x_0\in\mathbb R$, *đích* (target) $t\in\mathbb R$, biên độ tác động lớn nhất $u_{\max}\ge0$ và trọng số năng lượng $\lambda\ge0$. Biến quyết định là *tác động* (control input) $u\in\mathbb R$, và trạng thái sau một bước là $x_1=x_0+u$. Hàm chi phí $q:\mathbb R\to\mathbb R$ là
$$
q(u)=(x_0+u-t)^2+\lambda u^2 .
$$
Miền khả thi là đoạn $C=[-u_{\max},u_{\max}]$. *Bài toán điều khiển một bước* là
$$
\underset{u\in C}{\operatorname{minimize}}\quad q(u).
\tag{4.1}
$$
:::

Hạng thứ nhất $(x_1-t)^2$ bằng $0$ khi tác động đưa vật đúng tới đích, $u=t-x_0$; hạng thứ hai phạt độ lớn của tác động với trọng số $\lambda$. Ràng buộc $u\in C$ là *ràng buộc cứng* (hard constraint): mọi $u$ ngoài đoạn bị loại, còn một *số hạng phạt* (penalty term) như $\lambda u^2$ chỉ làm tăng chi phí. Do đó tăng $\lambda$ làm tác động lớn tốn kém hơn nhưng không cấm tác động nào, còn giảm $u_{\max}$ cấm thêm tác động nhưng không đổi chi phí của các tác động còn lại.

Hàm $q$ là đa thức bậc hai một biến, nên nghiệm của (4.1) tính được bằng phép bù bình phương. Kết quả là mệnh đề sau.

::: proposition Mệnh đề 01.2 (Cực tiểu không ràng buộc và quy tắc cắt) — chứng minh đầy đủ
**Giả thiết.** Các dữ kiện $x_0,t,u_{\max},\lambda$ thỏa Định nghĩa 01.1.

**Kết luận.**

- (a) Trên toàn $\mathbb R$, hàm $q$ có đúng một điểm cực tiểu, gọi là *cực tiểu không ràng buộc* (unconstrained minimizer),
$$
u_{\mathrm{free}}=\frac{t-x_0}{1+\lambda}.
\tag{4.2}
$$
- (b) Bài toán (4.1), với $C=[-u_{\max},u_{\max}]$, có đúng một nghiệm
$$
u^*=\operatorname{clip}\bigl(u_{\mathrm{free}},C\bigr),
\tag{4.3}
$$
trong đó, với $\underline u\le\overline u$, $\operatorname{clip}(u,[\underline u,\overline u])=\min(\max(u,\underline u),\overline u)$ là điểm của đoạn $[\underline u,\overline u]$ gần $u$ nhất: bằng $\underline u$ khi $u<\underline u$, bằng $u$ khi $\underline u\le u\le\overline u$, bằng $\overline u$ khi $u>\overline u$.
:::

::: proof Chứng minh Mệnh đề 01.2
**Lộ trình.** Viết $q$ dưới dạng bình phương của khoảng cách tới $u_{\mathrm{free}}$ cộng một hằng số; khi đó cực tiểu $q$ trên một đoạn là tìm điểm của đoạn gần $u_{\mathrm{free}}$ nhất.

**Bước 1 (khai triển).** Theo lũy thừa của $u$,
$$
\begin{aligned}
q(u)&=(u-(t-x_0))^2+\lambda u^2\\
&=(1+\lambda)u^2-2(t-x_0)u\\
&\quad+(t-x_0)^2 .
\end{aligned}
$$

**Bước 2 (bù bình phương).** Vì $\lambda\ge0$ nên $1+\lambda>0$, và với $u_{\mathrm{free}}$ cho bởi (4.2),
$$
\begin{aligned}
q(u)={}&(1+\lambda)(u-u_{\mathrm{free}})^2\\
&+\tfrac{\lambda\,(t-x_0)^2}{1+\lambda}.
\end{aligned}
\tag{4.4}
$$
Khai triển vế phải của (4.4): hệ số của $u^2$ là $1+\lambda$; hệ số của $u$ là $-2(1+\lambda)u_{\mathrm{free}}=-2(t-x_0)$; hằng số là
$$
\begin{aligned}
&\frac{(t-x_0)^2}{1+\lambda}+\frac{\lambda(t-x_0)^2}{1+\lambda}\\
&\quad=(t-x_0)^2,
\end{aligned}
$$
khớp với bước 1.

**Bước 3 (phần (a)).** Trong (4.4), hạng thứ hai không phụ thuộc $u$, còn hạng thứ nhất không âm và bằng $0$ khi và chỉ khi $u=u_{\mathrm{free}}$. Do đó $q(u)>q(u_{\mathrm{free}})$ với mọi $u\ne u_{\mathrm{free}}$.

**Bước 4 (phần (b)).** Theo (4.4), $q(u)$ là hàm tăng chặt của khoảng cách $\lvert u-u_{\mathrm{free}}\rvert$, nên cực tiểu $q$ trên $C$ là tìm điểm của $C$ gần $u_{\mathrm{free}}$ nhất. Điều kiện $u_{\max}\ge0$ cho $0\in C$, nên $C$ không rỗng. Có ba trường hợp:

- nếu $u_{\mathrm{free}}\in C$, khoảng cách nhỏ nhất bằng $0$ và chỉ đạt tại $u=u_{\mathrm{free}}$;
- nếu $u_{\mathrm{free}}>u_{\max}$, mọi $u\in C$ thỏa $\lvert u-u_{\mathrm{free}}\rvert=u_{\mathrm{free}}-u\ge u_{\mathrm{free}}-u_{\max}$, với dấu bằng chỉ khi $u=u_{\max}$;
- trường hợp $u_{\mathrm{free}}<-u_{\max}$ đối xứng, cho nghiệm duy nhất $u=-u_{\max}$.

Ba trường hợp trùng với ba nhánh của $\operatorname{clip}$ trong (4.3). $\square$
:::

Giả thiết $\lambda\ge0$ chỉ dùng ở bước 2: với $\lambda=-2$, hệ số bậc hai bằng $-1$, $q$ không bị chặn dưới trên $\mathbb R$, và trên $C$ cực tiểu nằm ở đầu mút xa điểm $x_0-t$ hơn. Điểm $x_0-t$, cho bởi (4.2), nay là cực đại của $q$; khi $t=x_0$, cả hai đầu mút là nghiệm. Với $u_{\max}<0$, đoạn $C$ rỗng và (4.1) không có phương án khả thi. Với nhiều biến ràng buộc trong một hộp, cắt từng tọa độ của cực tiểu không ràng buộc nói chung không cho nghiệm khi các biến liên kết với nhau qua hàm mục tiêu.

Đạo hàm của $q$ đọc được từ (4.4): $q'(u)=2(1+\lambda)(u-u_{\mathrm{free}})$, nên $u_{\mathrm{free}}$ cũng là nghiệm duy nhất của $q'(u)=0$.

Trong học máy, hàm $\operatorname{clip}$ là phép chiếu lên một đoạn và xuất hiện khi một đại lượng của mô hình bị giới hạn trong một khoảng. Ví dụ: xác suất ước lượng được cắt về đoạn $[\epsilon,1-\epsilon]$ trước khi lấy logarit trong mất mát *entropy chéo* (cross-entropy); trọng số của bộ phân biệt (discriminator, trong WGAN gọi là critic) trong mạng đối sinh Wasserstein (Wasserstein generative adversarial network, WGAN) được cắt về $[-c_0,c_0]$ sau mỗi bước cập nhật.

::: example Ví dụ 01.2 (Bộ số chuẩn của bài toán điều khiển)
**Dữ kiện.** Ví dụ 01.1: $x_0=0$, $t=3$, $\lambda=\tfrac12$, $u_{\max}=1$. Thay vào Định nghĩa 01.1:
$$
\begin{aligned}
q(u)&=(u-3)^2+\tfrac12u^2\\
&=\tfrac32u^2-6u+9,\\
C&=[-1,1].
\end{aligned}
$$

**Cực tiểu không ràng buộc.** Theo (4.2), $u_{\mathrm{free}}=3/(1+\tfrac12)=2$, với $q(2)=6-12+9=3$.

**Nghiệm.** Vì $2>u_{\max}=1$, quy tắc cắt (4.3) cho $u^*=1$, với
$$
\begin{aligned}
q(1)&=\tfrac32-6+9=\tfrac92,\\
x_1&=0+1=1.
\end{aligned}
$$

**Kiểm tra lại.** Theo (4.4), $q(1)=\tfrac32(1-2)^2+\tfrac{(1/2)\cdot9}{3/2}=\tfrac32+3=\tfrac92$, khớp với phép thế trực tiếp. Hai điểm khả thi khác cho $q(0)=9$ và $q(-1)=\tfrac32+6+9=\tfrac{33}2$, đều lớn hơn $\tfrac92$.
:::

![Parabol q(u) bằng ba phần hai u bình phương trừ sáu u cộng chín; dải tô từ u bằng −1 đến 1 là miền khả thi; điểm rỗng tại u bằng 2, giá trị 3, nằm ngoài dải là cực tiểu không ràng buộc; điểm kín tại u bằng 1, giá trị chín phần hai, trên biên phải của dải là nghiệm có ràng buộc.](img/lec-01/d03-cost-parabola-feasible.svg)

Trên hình, đỉnh của parabol tại $u=2$ nằm bên phải dải khả thi, nên $q$ giảm trên toàn bộ dải và đạt giá trị nhỏ nhất tại đầu mút phải; ràng buộc làm giá trị tối ưu tăng từ $3$ lên $\tfrac92$.

::: remark Nhận xét 01.3 (Đạo hàm khác không tại nghiệm biên)
Tại nghiệm $u^*=1$ của Ví dụ 01.2, $q'(1)=3\cdot1-6=-3\ne0$. Điểm $u=1$ là đầu mút phải của $C$, nên mọi điểm khả thi khác có dạng $1+\Delta$ với $\Delta\in[-2,0)$: chỉ dịch chuyển sang trái là được phép. Phép tính chính xác cho
$$
q(1+\Delta)-q(1)=-3\Delta+\tfrac32\Delta^2,
$$
và với $\Delta<0$ cả hai số hạng đều dương, nên $q(u)>q(1)$ với mọi $u\in C$ khác $1$.

Phương trình $q'(u)=0$ đòi không có hướng giảm theo cả hai chiều, nên chỉ áp dụng tại điểm trong. Tại biên, điều kiện thay thế là $q'(u^*)\,\Delta\ge0$ với mọi dịch chuyển khả thi $\Delta$; ở đây $q'(1)\Delta=-3\Delta\ge0$ khi $\Delta\le0$.

Hai lỗi cần tránh là báo cáo $u=2$ làm nghiệm, trong khi điểm này không khả thi, và kết luận bài toán vô nghiệm vì $q'$ không triệt tiêu trên $C$.
:::

::: example Ví dụ 01.3 (Ảnh hưởng của trọng số năng lượng)
**Dữ kiện.** $x_0=0$, $t=3$, $u_{\max}=1$ như Ví dụ 01.2, với $\lambda\ge0$ thay đổi: $q(u)=(u-3)^2+\lambda u^2$ trên $C=[-1,1]$, $q'(u)=2(u-3)+2\lambda u$, $u_{\mathrm{free}}=3/(1+\lambda)$. Do đó $u_{\mathrm{free}}\le1$ khi và chỉ khi $\lambda\ge2$.

| $\lambda$ | $u_{\mathrm{free}}$ | $u^*$ | $q(u^*)$ | $q'(u^*)$ | Vị trí nghiệm |
|---:|---:|---:|---:|---:|---|
| $0$ | $3$ | $1$ | $4$ | $-4$ | biên phải, ràng buộc chặn |
| $1/2$ | $2$ | $1$ | $9/2$ | $-3$ | biên phải, ràng buộc chặn |
| $2$ | $1$ | $1$ | $6$ | $0$ | biên phải, $u_{\mathrm{free}}=u_{\max}$ |
| $5$ | $1/2$ | $1/2$ | $15/2$ | $0$ | điểm trong |

**Tính.**

- Với $\lambda=0$: $q(1)=(1-3)^2=4$, $q'(1)=2(1-3)=-4$.
- Với $\lambda=2$: $q(1)=4+2=6$, $q'(1)=2(1-3)+4=0$.
- Với $\lambda=5$: $q(\tfrac12)=\tfrac{25}4+\tfrac54=\tfrac{15}2$, $q'(\tfrac12)=2(\tfrac12-3)+5=0$.

**Kiểm tra lại.** Với $\lambda=2$ và $\lambda=5$, nghiệm trùng $u_{\mathrm{free}}$, nên theo (4.4) giá trị tối ưu bằng $\lambda(t-x_0)^2/(1+\lambda)$: $2\cdot9/3=6$ và $5\cdot9/6=\tfrac{15}2$, khớp với bảng.
:::

Tại $\lambda=2$, nghiệm nằm ở biên mà $q'(u^*)=0$: nghiệm trên biên không kéo theo đạo hàm khác $0$. Ràng buộc làm thay đổi nghiệm khi và chỉ khi $u_{\mathrm{free}}\notin C$, tức $\lambda<2$ với bộ số này.

::: exercise Bài tập 01.1 (Điều khiển một bước với hai biên độ)
Cho $x_0=1$, $t=-2$ và $\lambda=1$ trong Định nghĩa 01.1.

(a) Với $u_{\max}=2$, tính $u_{\mathrm{free}}$, $u^*$, $x_1$ và $q(u^*)$.

(b) Với $u_{\max}=1$, tính lại các đại lượng đó và kiểm tra điều kiện $q'(u^*)\Delta\ge0$ cho mọi dịch chuyển khả thi $\Delta$.

(c) Tìm giá trị nhỏ nhất của $u_{\max}$ để ràng buộc không làm thay đổi nghiệm.
:::

::: hint
Dùng (4.2), rồi so $u_{\mathrm{free}}$ với hai đầu mút. Ở câu (b), xác định chiều dịch chuyển được phép từ đầu mút; dạng (4.4) cho phép tính chính xác $q(u^*+\Delta)-q(u^*)$.
:::

::: solution
**(a)** $u_{\mathrm{free}}=(-2-1)/2=-\tfrac32\in[-2,2]$, nên $u^*=-\tfrac32$ và $x_1=1-\tfrac32=-\tfrac12$. Giá trị tối ưu là $q(-\tfrac32)=(-\tfrac12+2)^2+\tfrac94=\tfrac92$.

**(b) Nghiệm.** Với $u_{\max}=1$, $u_{\mathrm{free}}=-\tfrac32<-1$, nên $u^*=-1$, $x_1=0$ và $q(-1)=(1-1+2)^2+1=5$.

**(b) Điều kiện biên.** $q'(u)=2(x_0+u-t)+2\lambda u$ cho $q'(-1)=2\cdot2-2=2$. Từ đầu mút trái chỉ được dịch sang phải, $\Delta\in(0,2]$, nên $q'(-1)\Delta=2\Delta>0$. Theo (4.4),
$$
\begin{aligned}
&q(-1+\Delta)-q(-1)\\
&\quad=2\Delta^2+2\Delta>0
\end{aligned}
$$
với mọi $\Delta\in(0,2]$.

**(c)** Ràng buộc không đổi nghiệm khi $u_{\mathrm{free}}\in[-u_{\max},u_{\max}]$, tức $u_{\max}\ge\tfrac32$. Giá trị nhỏ nhất là $u_{\max}=\tfrac32$.

**Kiểm tra lại.** Theo (4.4), giá trị tối ưu ở (a) bằng $\lambda(t-x_0)^2/(1+\lambda)=\tfrac92$; ở (b), $2(-1+\tfrac32)^2+\tfrac92=\tfrac12+\tfrac92=5$.
:::

Phép bù bình phương (4.4) chỉ có cho hàm bậc hai, và quy tắc cắt dùng việc biến có một chiều. Bài toán tiếp theo có nhiều biến và không có ràng buộc, và nghiệm của nó có thể không duy nhất.

### 4.2. Bình phương nhỏ nhất và tập nghiệm

Với năm người của Ví dụ 01.1, chúng ta cần một quy tắc dự đoán chiều cao từ cân nặng. Giả thuyết đơn giản nhất là $\hat y_i=w_0+w_1s_i$, với *hệ số chặn* (intercept) $w_0$ (cm) và *hệ số góc* (slope) $w_1$ (cm/kg); không đường thẳng nào đi qua cả năm điểm.

![Năm điểm dữ liệu cân nặng – chiều cao: (50; 158), (55; 162), (60; 164), (65; 169), (70; 172). Đường thẳng y mũ bằng 123 cộng 0,7 s đi qua vùng dữ liệu. Hình tròn là quan sát, hình vuông là dự đoán trên đường thẳng; ba đoạn nét đứt thẳng đứng tại 55, 60 và 65 ki-lô-gam biểu diễn phần dư.](img/lec-01/height-weight-regression-note.svg)

Trên hình, đường thẳng $\hat y=123+0{,}7s$ là nghiệm của bài toán bình phương nhỏ nhất tính ở ví dụ dưới, và đoạn thẳng đứng tại mỗi cân nặng có độ dài có dấu, dự đoán trừ quan sát, là *phần dư* (residual): $0$ tại $s=50$ và $s=70$; $-0{,}5$, $1$, $-0{,}5$ tại $s=55$, $60$, $65$.

Về mặt ý tưởng, ta gộp các phần dư thành một số không âm và chọn đường thẳng có số đó nhỏ nhất. Tổng các phần dư không dùng được vì phần dư trái dấu triệt tiêu nhau; tổng bình phương loại được dấu và cho một hàm khả vi của tham số. Phần dư gấp đôi bị phạt gấp bốn, nên một *điểm ngoại lai* (outlier) ảnh hưởng mạnh tới nghiệm.

Viết giả thuyết thành tích vô hướng: với hàng đặc trưng $a_i^T=[1\ \ s_i]$ và $w=(w_0,w_1)^T$, ta có $a_i^Tw=w_0+w_1s_i=\hat y_i$. Thành phần hằng $1$ đưa hệ số chặn vào vector tham số, và mỗi đặc trưng mới chỉ thêm một cột. Để làm rõ bài toán với $n$ mẫu và $d$ cột, xem định nghĩa sau.

::: definition Định nghĩa 01.4 (Ma trận thiết kế và bài toán bình phương nhỏ nhất)
Cho $n$ mẫu, mỗi mẫu có vector đặc trưng $a_i\in\mathbb R^d$ và đầu ra quan sát $y_i\in\mathbb R$, $i=1,\ldots,n$. *Ma trận thiết kế* (design matrix) $X\in\mathbb R^{n\times d}$ có hàng thứ $i$ là $a_i^T$, và $y=(y_1,\ldots,y_n)^T$. Với vector tham số $w\in\mathbb R^d$, vector dự đoán là $\hat y=Xw$ và vector phần dư là $Xw-y$. *Bài toán bình phương nhỏ nhất* (least squares problem) là
$$
\begin{aligned}
&\underset{w\in\mathbb R^d}{\operatorname{minimize}}\\
&\quad J(w)=\lVert Xw-y\rVert_2^2 .
\end{aligned}
\tag{4.5}
$$
:::

Phép nhân $Xw$ gom $n$ dự đoán $a_i^Tw$, với kích thước $(n\times d)(d\times1)=n\times1$; với năm người, $n=5$, $d=2$ và cột đầu của $X$ toàn số $1$. Hệ số $w_j$ là lượng thay đổi của dự đoán khi đặc trưng $j$ tăng một đơn vị và các đặc trưng khác giữ nguyên.

Hàm chi phí $q$ của Định nghĩa 01.1 là trường hợp $n=2$, $d=1$ của (4.5): với $X=(1,\sqrt\lambda)^T$ và $y=(t-x_0,0)^T$,
$$
\begin{aligned}
q(u)&=(u-(t-x_0))^2+(\sqrt\lambda\,u)^2\\
&=\lVert Xu-y\rVert_2^2 ,
\end{aligned}
$$
và hai bài toán chỉ khác nhau ở miền.

![Ba điểm tại đầu vào s bằng 0, 1, 2 với đầu ra 1, 2, 2 và đường hồi quy y mũ bằng bảy phần sáu cộng s chia hai; ba đoạn nét đứt thẳng đứng là các phần dư một phần sáu, âm một phần ba, một phần sáu; tổng bình phương phần dư bằng một phần sáu.](img/lec-01/linear-regression-fit.svg)

Ba điểm $(0,1)$, $(1,2)$, $(2,2)$ của Ví dụ 01.1 và đường hồi quy của chúng được vẽ trên hình. Các đoạn nét đứt đo sai lệch theo phương thẳng đứng, tức theo trục đầu ra, vì bình phương nhỏ nhất chỉ đo sai số của đầu ra.

Hàm $J$ bằng $2f$, với $f(w)=\tfrac12\lVert Xw-y\rVert_2^2$ của Định nghĩa 00.21, nên $J$ và $f$ có cùng tập điểm cực tiểu. Theo Mệnh đề 00.45 và Định lý 00.22 (Bài 00 ký hiệu số cột là $n$), $J$ có gradient và Hessian
$$
\begin{aligned}
\nabla J(w)&=2X^T(Xw-y),\\
\nabla^2J(w)&=2X^TX,
\end{aligned}
$$
và $w^*$ là điểm cực tiểu của $J$ trên $\mathbb R^d$ khi và chỉ khi $w^*$ thỏa *phương trình chuẩn* (normal equations)
$$
X^TXw^*=X^Ty .
\tag{4.6}
$$
Hệ quả sau mô tả toàn bộ tập nghiệm của (4.5).

::: corollary Hệ quả 01.5 (Tập nghiệm của bài toán bình phương nhỏ nhất) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{n\times d}$, $y\in\mathbb R^n$ tùy ý; $J$ như trong (4.5).

**Kết luận.**

- (a) Bài toán (4.5) luôn có nghiệm.
- (b) Nếu $w^*$ là một nghiệm thì tập nghiệm là $S^*=\{w^*+v\mid v\in\operatorname{Ker}(X)\}$, và mọi nghiệm cho cùng vector dự đoán $Xw^*$.
- (c) Nghiệm duy nhất khi và chỉ khi $\operatorname{rank}(X)=d$, gọi là *hạng cột đầy đủ* (full column rank); khi đó $w^*=(X^TX)^{-1}X^Ty$.
:::

::: proof Chứng minh Hệ quả 01.5
**Lộ trình.** Tập nghiệm của (4.5) là tập nghiệm của hệ tuyến tính (4.6); áp dụng Định lý 00.22 cho sự tồn tại và tính duy nhất, và Định lý 00.9 cho dạng của tập nghiệm.

**Bước 1 (phần (a), (c)).** Vì $J=2f$, nghiệm của (4.5) là nghiệm bình phương nhỏ nhất theo Định nghĩa 00.21. Kết luận 2 của Định lý 00.22 cho (4.6) luôn có nghiệm, và kết luận 1 cho mọi nghiệm của (4.6) là nghiệm của (4.5); đó là (a). Kết luận 3 của Định lý 00.22 là (c).

**Bước 2 (phần (b)).** Áp dụng kết luận 2 của Định lý 00.9 cho hệ (4.6), với ma trận $X^TX$ và nghiệm $w^*$: tập nghiệm là $w^*+\operatorname{Ker}(X^TX)$. Theo kết luận 2 của Mệnh đề 00.20, $\operatorname{Ker}(X^TX)=\operatorname{Ker}(X)$. Với $w\in S^*$, $X(w-w^*)=0$, nên $Xw=Xw^*$. $\square$
:::

Hạng cột đầy đủ đòi $n\ge d$.

Trong học máy, giả thiết hạng cột đầy đủ bị vi phạm khi một *đặc trưng phân loại* (categorical feature) được *mã hóa one-hot* (one-hot encoding, dummy encoding), một cột nhị phân cho mỗi giá trị, trong khi $X$ đã có cột hệ số chặn: tổng các cột nhị phân bằng $\mathbb 1$, nên $\operatorname{Ker}(X)\ne\{0\}$. Khi đó các bộ giải hoặc các điểm khởi tạo khác nhau có thể cho các hệ số khác nhau với cùng dự đoán và cùng sai số. Hai cách khắc phục là bỏ một cột, hoặc cộng vào hàm mục tiêu số hạng phạt $\tfrac\mu2\lVert w\rVert_2^2$ với $\mu>0$.

::: example Ví dụ 01.4 (Đường hồi quy cân nặng – chiều cao)
**Dữ kiện.** Năm người của Ví dụ 01.1: $s=(50,55,60,65,70)$ kg, $y=(158,162,164,169,172)$ cm; $a_i^T=[1\ \ s_i]$, $w=(w_0,w_1)^T$.

**Phương trình chuẩn.** Các tổng cần dùng là
$$
\begin{aligned}
\textstyle\sum_i s_i&=300,\\
\textstyle\sum_i s_i^2&=18\,250,\\
\textstyle\sum_i y_i&=825,\\
\textstyle\sum_i s_iy_i&=49\,675,
\end{aligned}
$$
với $\sum_is_i^2=2500+3025+3600+4225+4900$ và $\sum_is_iy_i=7900+8910+9840+10\,985+12\,040$. Phương trình (4.6) là
$$
\begin{aligned}
&\begin{bmatrix}5&300\\300&18\,250\end{bmatrix}\begin{bmatrix}w_0\\w_1\end{bmatrix}\\
&\quad=\begin{bmatrix}825\\49\,675\end{bmatrix}.
\end{aligned}
$$

**Nghiệm.** Định thức bằng $5\cdot18\,250-300^2=1250>0$, nên $X^TX$ khả nghịch, $\operatorname{Ker}(X)=\operatorname{Ker}(X^TX)=\{0\}$ (Mệnh đề 00.20), $\operatorname{rank}(X)=2$, và theo Hệ quả 01.5(c) nghiệm duy nhất:
$$
\begin{aligned}
\begin{bmatrix}w_0^*\\w_1^*\end{bmatrix}&=\tfrac1{1250}\begin{bmatrix}18\,250&-300\\-300&5\end{bmatrix}\\
&\qquad\times\begin{bmatrix}825\\49\,675\end{bmatrix}\\
&=\tfrac1{1250}\begin{bmatrix}153\,750\\875\end{bmatrix}\\
&=\begin{bmatrix}123\\0{,}7\end{bmatrix}.
\end{aligned}
$$
Dự đoán tại năm cân nặng là $158;\ 161{,}5;\ 165;\ 168{,}5;\ 172$, phần dư là $0;\ -0{,}5;\ 1;\ -0{,}5;\ 0$, và $J(w^*)=0{,}25+1+0{,}25=1{,}5$. Hệ số góc $w_1^*=0{,}7$ nghĩa là mỗi ki-lô-gam tăng thêm làm chiều cao dự đoán tăng $0{,}7$ cm.

**Kiểm tra lại.** Phương trình chuẩn tương đương với $X^T(Xw^*-y)=0$. Hàng thứ nhất: tổng phần dư $0-0{,}5+1-0{,}5+0=0$. Hàng thứ hai: $55\cdot(-0{,}5)+60\cdot1+65\cdot(-0{,}5)=0$. Khử $w_0$ khỏi hai hàng của (4.6) cho công thức hồi quy một biến, với cùng kết quả: với $\bar s=60$, $\bar y=165$,
$$
\begin{aligned}
w_1^*&=\frac{\sum_i(s_i-\bar s)(y_i-\bar y)}{\sum_i(s_i-\bar s)^2}\\
&=\frac{175}{250}=0{,}7,
\end{aligned}
$$
và $w_0^*=\bar y-w_1^*\bar s=165-42=123$.
:::

::: example Ví dụ 01.5 (Ba điểm dữ liệu)
**Dữ kiện.** Ba điểm $(0,1)$, $(1,2)$, $(2,2)$ của Ví dụ 01.1, mô hình $\hat y_i=w_0+w_1s_i$:
$$
X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix},\qquad y=\begin{bmatrix}1\\2\\2\end{bmatrix}.
$$

**Nghiệm.** $X^TX=\begin{bmatrix}3&3\\3&5\end{bmatrix}$, $X^Ty=(5,6)^T$, định thức $15-9=6>0$, nên
$$
\begin{aligned}
w^*&=\tfrac16\begin{bmatrix}5&-3\\-3&3\end{bmatrix}\begin{bmatrix}5\\6\end{bmatrix}\\
&=\begin{bmatrix}7/6\\1/2\end{bmatrix}.
\end{aligned}
$$
Dự đoán, phần dư và giá trị tối ưu là
$$
\begin{aligned}
Xw^*&=(7/6,\ 5/3,\ 13/6)^T,\\
Xw^*-y&=(1/6,\ -1/3,\ 1/6)^T,\\
J(w^*)&=\tfrac1{36}+\tfrac4{36}+\tfrac1{36}=\tfrac16 .
\end{aligned}
$$
Hệ số chặn $w_0^*=7/6$ là dự đoán tại đầu vào $0$; hệ số góc $w_1^*=1/2$ là mức tăng của dự đoán khi đầu vào tăng một đơn vị.

**Kiểm tra lại.** $X^T(Xw^*-y)=(\tfrac16-\tfrac13+\tfrac16,\ 0-\tfrac13+\tfrac26)^T=(0,0)^T$, đúng (4.6).
:::

::: example Ví dụ 01.6 (Hai cột trùng nhau)
**Dữ kiện.** Ba điểm của Ví dụ 01.5, $y=(1,2,2)^T$, nghiệm $w^*=(7/6,1/2)^T$ với dự đoán $(7/6,5/3,13/6)^T$ và $J(w^*)=\tfrac16$. Thêm vào $X$ một cột thứ ba trùng cột thứ hai:
$$
\begin{aligned}
X'&=\begin{bmatrix}1&0&0\\1&1&1\\1&2&2\end{bmatrix},\\
w'&=(w_0,w_1,w_2)^T .
\end{aligned}
$$

**Hạt nhân.** Dự đoán $X'w'=w_0\mathbb 1+(w_1+w_2)(0,1,2)^T$ chỉ phụ thuộc tổng $w_1+w_2$. Hai cột đầu của $X'$ độc lập tuyến tính và cột thứ ba trùng cột thứ hai, nên $\operatorname{rank}(X')=2$ và $\dim\operatorname{Ker}(X')=3-2=1$ (Mệnh đề 00.8); vector $v=(0,1,-1)^T$ thỏa $X'v=0$, nên $\operatorname{Ker}(X')$ là đường thẳng sinh bởi $v$.

**Tập nghiệm.** Vector $(7/6,1/2,0)^T$ cho cùng dự đoán như $w^*$ nên là một nghiệm. Theo Hệ quả 01.5(b),
$$
\begin{aligned}
S^*=\bigl\{&(7/6,\ \kappa,\ 1/2-\kappa)^T\\
&\mid \kappa\in\mathbb R\bigr\}.
\end{aligned}
$$
Mọi nghiệm cho cùng dự đoán $(7/6,5/3,13/6)^T$ và cùng giá trị tối ưu $\tfrac16$.

**Kiểm tra lại.** Với $\kappa=\tfrac14$: $X'w'=\tfrac76\mathbb 1+(\tfrac14+\tfrac14)(0,1,2)^T=(7/6,5/3,13/6)^T$, đúng dự đoán của Ví dụ 01.5.
:::

::: remark Nhận xét 01.6 (Thang đo, công thức nghịch đảo và Hessian)
Ba điểm sau cần nhớ khi dùng (4.5):

- so sánh độ lớn các $w_j$ như mức ảnh hưởng chỉ có nghĩa khi các đặc trưng dùng thang đo tương thích: đổi đơn vị một cột từ kg sang g làm hệ số tương ứng chia cho $1000$ mà dự đoán không đổi;
- công thức $w^*=(X^TX)^{-1}X^Ty$ chỉ hợp lệ khi $\operatorname{rank}(X)=d$; khi thiếu hạng, $X^TX$ suy biến, công thức không xác định, nhưng bài toán vẫn có nghiệm theo Hệ quả 01.5(a);
- Hessian $2X^TX\succeq0$ không kéo theo nghiệm duy nhất: Ví dụ 01.6 có Hessian nửa xác định dương và vô số nghiệm.
:::

::: exercise Bài tập 01.2 (Phương trình chuẩn với cột quy tâm)
Cho ba điểm có đầu vào $-1,0,1$ và đầu ra $2,1,3$, với mô hình $\hat y=w_0+w_1s$.

(a) Viết $X$ và $y$, tính $X^TX$, $X^Ty$, nghiệm $w^*$ và $J(w^*)$.

(b) Giải thích vì sao $X^TX$ ở đây là ma trận chéo, và nêu điều kiện tổng quát trên các cột của $X$ để điều đó xảy ra.
:::

::: hint
Cột thứ hai của $X$ có tổng bằng $0$. Phần tử $(j,k)$ của $X^TX$ là tích vô hướng của cột $j$ và cột $k$ của $X$.
:::

::: solution
**(a)** $X=\begin{bmatrix}1&-1\\1&0\\1&1\end{bmatrix}$, $y=(2,1,3)^T$, $X^TX=\begin{bmatrix}3&0\\0&2\end{bmatrix}$ và $X^Ty=(6,1)^T$. Phương trình chuẩn (4.6) tách thành $3w_0=6$ và $2w_1=1$, nên $w^*=(2,\tfrac12)^T$. Dự đoán là $(1{,}5;\ 2;\ 2{,}5)$, phần dư là $(-0{,}5;\ 1;\ -0{,}5)$ và $J(w^*)=0{,}25+1+0{,}25=1{,}5$.

**(b)** Phần tử $(1,2)$ của $X^TX$ là tích vô hướng của cột toàn số $1$ với cột đầu vào, tức tổng các đầu vào, bằng $0$. Tổng quát, $X^TX$ là ma trận chéo khi và chỉ khi các cột của $X$ đôi một trực giao. Với một cột đặc trưng và cột hệ số chặn, điều kiện là cột đặc trưng có tổng bằng $0$, tức đã được quy tâm (trừ đi trung bình). Với nhiều cột đặc trưng, quy tâm chỉ làm các cột đặc trưng trực giao với cột hệ số chặn; các cột đặc trưng còn phải đôi một trực giao với nhau.

**Kiểm tra lại.** Ở (a), tổng phần dư bằng $0$ và $(-1)(-0{,}5)+0\cdot1+1\cdot(-0{,}5)=0$, đúng $X^T(Xw^*-y)=0$. Ở (b), với $X$ của Ví dụ 01.5, cột đầu vào $(0,1,2)$ có tổng $3\ne0$, và phần tử ngoài đường chéo của $X^TX$ bằng đúng $3$.
:::

::: exercise Bài tập 01.3 (Phần dư tại nghiệm bình phương nhỏ nhất)
Cho $X\in\mathbb R^{n\times d}$ có cột thứ nhất là $\mathbb 1$, và $w^*$ là một nghiệm bất kỳ của (4.5). Chứng minh tổng các phần dư $\sum_i(a_i^Tw^*-y_i)$ bằng $0$, và tổng có trọng số $\sum_iX_{ij}(a_i^Tw^*-y_i)$ bằng $0$ với mọi cột $j$. Xác định hai kết luận này có còn đúng khi $w^*$ không duy nhất không.
:::

::: hint
Viết (4.6) dưới dạng $X^T(Xw^*-y)=0$ và đọc từng hàng.
:::

::: solution
**Bước 1 (đọc từng hàng).** Theo kết luận 1 của Định lý 00.22 áp dụng cho $J=2f$, mọi nghiệm thỏa $X^T(Xw^*-y)=0$. Thành phần thứ $j$ của vế trái là $\sum_iX_{ij}(a_i^Tw^*-y_i)$, nên mọi tổng có trọng số theo một cột bằng $0$. Với $j=1$, $X_{i1}=1$, nên tổng các phần dư bằng $0$.

**Bước 2 (khi nghiệm không duy nhất).** Lập luận chỉ dùng phương trình chuẩn, nên đúng cho mọi nghiệm. Theo Hệ quả 01.5(b), các nghiệm khác nhau còn có cùng vector phần dư, vì chúng cho cùng dự đoán.

**Kiểm tra lại.** Ở Ví dụ 01.6, mọi nghiệm có phần dư $(1/6,-1/3,1/6)$: tổng bằng $0$, và tổng có trọng số theo cột thứ hai là $0-\tfrac13+\tfrac26=0$.
:::

Bài toán phân loại tiếp theo không có cấu trúc bậc hai của $J$ và cấu trúc tuyến tính của phương trình chuẩn, và nghiệm của nó có thể không tồn tại.

### 4.3. Hồi quy logistic và nghiệm không tồn tại

Một dây chuyền đóng gói cần tách cam tốt khỏi cam xấu bằng camera. Từ ảnh mỗi quả cam, hệ thống đo hai con số, và một quy tắc học từ các quả cam đã gán nhãn biến hai con số đó thành quyết định "tốt" hoặc "xấu".

![Sơ đồ ba bước: cam đi dưới camera trên dây chuyền; trích hai đặc trưng z1 bằng d max chia d min và z2 bằng phần trăm diện tích vết sẫm; trên mặt phẳng (z1, z2), cam tốt (nhãn +1, hình tròn) ở gần góc z1 bằng 1, z2 bằng 0, cam xấu (nhãn −1, hình vuông) ở xa, ngăn cách bởi một đường biên quyết định tuyến tính vuông góc với vector w.](img/lec-01/g00-orange-quality-pipeline-note.svg)

Quy trình trên hình cho dữ liệu gồm ba thành phần:

- đặc trưng thứ nhất $z_1=d_{\max}/d_{\min}$ là tỉ lệ giữa kích thước lớn nhất và nhỏ nhất của quả; $z_1\ge1$, và $z_1$ gần $1$ khi quả tròn đều;
- đặc trưng thứ hai $z_2=100\,A_{\mathrm{spot}}/A_{\mathrm{fruit}}\in[0,100]$ là phần trăm diện tích bề mặt có vết sẫm, với diện tích vết $A_{\mathrm{spot}}$ và diện tích quả $A_{\mathrm{fruit}}$ đo trên ảnh;
- nhãn $y=+1$ cho cam tốt và $y=-1$ cho cam xấu, để có thể so dấu của một biểu thức với nhãn.

Thêm thành phần hằng, mỗi quả cam $i$ có vector đặc trưng $a_i=(1,z_{i1},z_{i2})^T\in\mathbb R^3$. Một đường thẳng trong mặt phẳng $(z_1,z_2)$ có dạng $a^Tw=0$ với $w=(w_0,w_1,w_2)^T$. Đại lượng $a_i^Tw$ là *điểm số* (score, logit) của mẫu $i$, và quy tắc phân loại dự đoán nhãn bằng dấu của điểm số.

![Mặt phẳng hai trục z1, z2; đường a chuyển vị w bằng 0 qua gốc chia mặt phẳng thành miền dương chứa các điểm hình tròn lớp +1 và miền âm chứa các điểm hình vuông lớp −1; vector w vuông góc với đường biên, hướng vào miền dương.](img/lec-01/g01-linear-boundary-2d-note.svg)

Hình vẽ trường hợp không có thành phần hằng, với $a=(z_1,z_2)^T$, nên biên đi qua gốc. *Biên quyết định* (decision boundary) $\{a\mid a^Tw=0\}$ vuông góc với $w$; nửa mặt phẳng mà $w$ chỉ tới được dự đoán là lớp $+1$.

Mẫu $i$ được phân loại đúng khi và chỉ khi $y_ia_i^Tw>0$, và $y_ia_i^Tw$ lớn nghĩa là mẫu nằm đúng phía và xa biên quyết định. Về mặt ý tưởng, học $w$ là làm các đại lượng $y_ia_i^Tw$ lớn, nên cần một hàm phạt giảm theo đại lượng đó. Bình phương nhỏ nhất với nhãn $\pm1$ không có tính chất này: với $y_i=+1$ và điểm số $a_i^Tw=3$, mẫu được phân loại đúng nhưng sai số bình phương $(3-1)^2=4$ vẫn phạt nó. Để làm rõ mô hình dùng hàm phạt $\log(1+e^{-m})$, xem định nghĩa sau.

::: definition Định nghĩa 01.7 (Biên có dấu, mất mát logistic và bài toán hồi quy logistic)
Cho $n$ mẫu với vector đặc trưng $a_i\in\mathbb R^d$ và nhãn $y_i\in\{-1,+1\}$, $i=1,\ldots,n$. Với vector tham số $w\in\mathbb R^d$, *biên có dấu* (signed margin) của mẫu $i$ là $m_i=y_ia_i^Tw$. *Mất mát logistic* (logistic loss) của một biên có dấu $m\in\mathbb R$ là
$$
\ell(m)=\log\bigl(1+e^{-m}\bigr),
$$
và *bài toán hồi quy logistic* (logistic regression) là
$$
\begin{aligned}
&\underset{w\in\mathbb R^d}{\operatorname{minimize}}\\
&\quad L(w)=\sum_{i=1}^{n}\ell\bigl(y_ia_i^Tw\bigr).
\end{aligned}
\tag{4.7}
$$
:::

Trong học máy, $L$ có cách đọc xác suất. Với *hàm sigmoid* (sigmoid function) $\sigma(\zeta)=1/(1+e^{-\zeta})$, thỏa $1-\sigma(\zeta)=\sigma(-\zeta)$, mô hình gán $\Pr(y=+1\mid a)=\sigma(a^Tw)$, nên $\Pr(y_i\mid a_i)=\sigma(y_ia_i^Tw)$ với cả hai nhãn. Vì $-\log\sigma(m)=\ell(m)$, khi các mẫu độc lập, $L(w)=-\log\prod_i\sigma(y_ia_i^Tw)$, tức âm logarit của hàm hợp lý (Định nghĩa 00.64), còn gọi là mất mát entropy chéo nhị phân (binary cross-entropy), tương tự cách đọc bình phương nhỏ nhất ở Mệnh đề 00.65.

Thay cho phép khai triển chính xác của Định lý 00.22 và phương trình chuẩn tuyến tính, chúng ta dùng các tính chất của hàm một biến $\ell$ trong mệnh đề sau.

::: proposition Mệnh đề 01.8 (Tính chất của mất mát logistic) — chứng minh đầy đủ
**Giả thiết.** $\ell(m)=\log(1+e^{-m})$ với $m\in\mathbb R$; $L$ như trong (4.7).

**Kết luận.**

- (a) $\ell(m)>0$ với mọi $m$.
- (b) $\ell'(m)=-1/(1+e^m)\in(-1,0)$, nên $\ell$ giảm chặt.
- (c) $\ell''(m)=e^m/(1+e^m)^2\in(0,\tfrac14]$, với giá trị lớn nhất $\tfrac14$ tại $m=0$, và $\ell''(m)\to0$ khi $\lvert m\rvert\to\infty$.
- (d) $\ell(m)\to0$ khi $m\to+\infty$, và $\ell(m)+m\to0$ khi $m\to-\infty$.
- (e) $L(w)>0$ với mọi $w$, nên $\inf_wL(w)\ge0$.
:::

::: proof Chứng minh Mệnh đề 01.8
**Lộ trình.** Tính trực tiếp $\ell'$, $\ell''$ và các giới hạn; (e) suy từ (a).

**Bước 1 (phần (a)).** Vì $e^{-m}>0$, ta có $1+e^{-m}>1$ và $\log(1+e^{-m})>0$.

**Bước 2 (phần (b)).** Theo quy tắc đạo hàm hàm hợp, rồi nhân tử và mẫu với $e^m$,
$$
\ell'(m)=\frac{-e^{-m}}{1+e^{-m}}=-\frac1{e^m+1}.
$$
Vì $e^m+1>1$, ta có $-1<\ell'(m)<0$, và đạo hàm âm trên $\mathbb R$ cho $\ell$ giảm chặt.

**Bước 3 (phần (c)).** Đạo hàm của $-(1+e^m)^{-1}$ là $e^m(1+e^m)^{-2}>0$. Theo bất đẳng thức giữa trung bình cộng và trung bình nhân, $(1+e^m)^2\ge4e^m$, với dấu bằng khi và chỉ khi $m=0$, nên $\ell''(m)\le\tfrac14$. Viết $\ell''(m)=1/(e^{-m}+2+e^m)$: mẫu số dần tới $+\infty$ khi $\lvert m\rvert\to\infty$, nên $\ell''(m)\to0$.

**Bước 4 (phần (d)).** Khi $m\to+\infty$, $e^{-m}\to0$, nên $\ell(m)\to\log1=0$. Khi $m\to-\infty$,
$$
\begin{aligned}
\ell(m)+m&=\log(1+e^{-m})\\
&\quad+\log e^m\\
&=\log(e^m+1)\\
&\to\log1=0 .
\end{aligned}
$$

**Bước 5 (phần (e)).** Mỗi hạng của $L$ dương theo (a), nên tổng dương và $0$ là một cận dưới. $\square$
:::

Khi mẫu bị phân loại sai với biên có dấu âm và có trị tuyệt đối lớn, mất mát tăng gần như tuyến tính với hệ số góc gần $1$; độ cong $\ell''$ dương ở mọi nơi nhưng tiến về $0$ khi $\lvert m\rvert\to\infty$.

Trong học máy, gradient của $L$ là $\nabla L(w)=\sum_i\ell'(m_i)\,y_ia_i$. Vì $\lvert\ell'(m_i)\rvert$ nhỏ khi $m_i$ lớn, một bước hạ gradient $w^+=w-\eta\nabla L(w)$ (Định nghĩa 00.46) chủ yếu điều chỉnh $w$ theo các mẫu bị phân loại sai hoặc có biên có dấu nhỏ; một mẫu có biên có dấu âm lớn đóng góp gần bằng $-y_ia_i$.

::: example Ví dụ 01.7 (Dữ liệu tách được tuyến tính, không có nghiệm)
**Dữ kiện.** Hai mẫu của Ví dụ 01.1, $d=1$: $(a_1,y_1)=(1,+1)$, $(a_2,y_2)=(-1,-1)$. Hai biên có dấu là $m_1=(+1)(1)w=w$ và $m_2=(-1)(-1)w=w$, nên
$$
\begin{aligned}
L(w)&=2\log\bigl(1+e^{-w}\bigr),\\
L'(w)&=-\frac{2}{1+e^w}<0 .
\end{aligned}
$$
Mọi $w>0$ phân loại đúng cả hai mẫu: dữ liệu *tách được tuyến tính* (linearly separable), tức tách được bằng một biên quyết định tuyến tính.

**Giá trị.** Làm tròn bốn chữ số thập phân:

| $w$ | $0$ | $1$ | $2$ | $4$ | $8$ |
|---:|---:|---:|---:|---:|---:|
| $L(w)$ | $1{,}3863$ | $0{,}6265$ | $0{,}2539$ | $0{,}0363$ | $0{,}0007$ |

**Kết luận.** Vì $L'<0$ trên $\mathbb R$, $L$ giảm chặt. Theo Mệnh đề 01.8(d), $L(w)\to0$ khi $w\to+\infty$; theo Mệnh đề 01.8(a), $L(w)>0$ với mọi $w$. Do đó cận dưới của $L$ bằng $0$ nhưng không $w$ nào cho $L(w)=0$, và mọi $w$ đều bị $w+1$ vượt qua: bài toán (4.7) không có nghiệm.

**Kiểm tra lại.** $L(0)=2\log2=2\cdot0{,}6931=1{,}3863$. Với $w$ lớn, $\log(1+e^{-w})\approx e^{-w}$, nên $L(w)\approx2e^{-w}$; tại $w=4$, $2e^{-4}=0{,}0366$, gần $0{,}0363$ trong bảng.
:::

![Hai phần. Trái: trục a với mẫu lớp +1 (hình tròn) tại a bằng 1 và mẫu lớp −1 (hình vuông) tại a bằng −1; cả hai biên có dấu bằng w. Phải: đồ thị L(w) bằng 2 log(1 + e mũ âm w) với w từ 0 đến khoảng 4, giảm dần và tiến sát đường L bằng 0 mà không đạt; ghi chú: cận dưới đúng bằng 0, giá trị nhỏ nhất không tồn tại.](img/lec-01/logistic-loss-convex-case.svg)

Trên hình, đồ thị $L$ tiệm cận đường $L=0$ và nằm hẳn phía trên đường đó.

::: example Ví dụ 01.8 (Dữ liệu không tách được, có nghiệm)
**Dữ kiện.** Ba mẫu của Ví dụ 01.1, $d=1$: $(1,+1)$, $(-1,-1)$, $(1,-1)$. Hai mẫu tại $a=1$ có nhãn trái nhau, nên không $w$ nào phân loại đúng cả ba mẫu. Biên có dấu là $m_1=m_2=w$ và $m_3=-w$, nên
$$
\begin{aligned}
L(w)&=2\log\bigl(1+e^{-w}\bigr)\\
&\quad+\log\bigl(1+e^{w}\bigr),\\
L'(w)&=-\frac{2}{1+e^w}+\frac{e^w}{1+e^w}\\
&=\frac{e^w-2}{1+e^w}.
\end{aligned}
$$

**Xét dấu đạo hàm.** Mẫu số dương, nên $L'(w)<0$ khi $w<\log2$, $L'(\log2)=0$ và $L'(w)>0$ khi $w>\log2$. Do đó $L$ giảm chặt trên $(-\infty,\log2]$, tăng chặt trên $[\log2,\infty)$, và $w^*=\log2\approx0{,}6931$ là nghiệm duy nhất, với
$$
\begin{aligned}
L(\log2)&=2\log\tfrac32+\log3\\
&=\log\tfrac{27}4\approx1{,}9095 .
\end{aligned}
$$
Mô hình gán $\Pr(y=+1\mid a=1)=\sigma(\log2)=1/(1+\tfrac12)=\tfrac23$ và $\Pr(y=-1\mid a=-1)=\tfrac23$.

**Kiểm tra lại.** $L(0)=3\log2\approx2{,}0794$ và $L(1)=2\log(1+e^{-1})+\log(1+e)\approx0{,}6265+1{,}3133=1{,}9398$, cả hai lớn hơn $1{,}9095$. Vì $\ell''(-m)=e^{-m}/(1+e^{-m})^2=\ell''(m)$, độ cong tại nghiệm là $L''(\log2)=3\ell''(\log2)=3\cdot\tfrac29=\tfrac23>0$.
:::

Hai ví dụ có cùng hàm mất mát, cùng miền, cùng tính chất $L''>0$, nhưng cho hai kết luận trái ngược về nghiệm vì dữ liệu khác nhau:

- ở Ví dụ 01.7, dữ liệu tách được, nên mọi biên có dấu cùng tăng khi $w\to+\infty$ và mọi hạng dần về $0$;
- ở Ví dụ 01.8, mẫu thứ ba làm hạng $\log(1+e^w)$ tăng gần tuyến tính khi $w\to+\infty$, nên $L$ không tiến về cận dưới theo hướng đó.

Hai ví dụ phân biệt số mà giá trị hàm tiến tới, giá trị đạt được, và dãy điểm tiến tới số đó. Để làm rõ ba khái niệm này, xem định nghĩa sau.

::: definition Định nghĩa 01.9 (Cận dưới đúng, giá trị nhỏ nhất, dãy cực tiểu hóa)
Cho tập không rỗng $C\subseteq\mathbb R^d$ và $f:C\to\mathbb R$.

- Cận dưới đúng của $f$ trên $C$, ký hiệu $\inf_{x\in C}f(x)$, là số lớn nhất không vượt quá mọi giá trị $f(x)$ với $x\in C$, với quy ước bằng $-\infty$ khi $f$ không bị chặn dưới.
- Nếu có $x^*\in C$ với $f(x^*)=\inf_{x\in C}f(x)$ thì cận dưới đúng *được đạt*, và số đó là *giá trị nhỏ nhất* (minimum) của $f$ trên $C$, ký hiệu $\min_{x\in C}f(x)$.
- Một dãy $x^{(k)}\in C$ với $f(x^{(k)})\to\inf_{x\in C}f(x)$ là một *dãy cực tiểu hóa* (minimizing sequence).
:::

Cận dưới đúng luôn tồn tại (có thể bằng $-\infty$), còn giá trị nhỏ nhất có thể không tồn tại: $x^2$ trên $\mathbb R$ có cận dưới đúng $0$ đạt tại $0$, còn $L$ của Ví dụ 01.7 có cận dưới đúng $0$ không được đạt.

::: remark Nhận xét 01.10 (Dãy cực tiểu hóa luôn tồn tại và có thể không dẫn tới nghiệm)
Với $C$ không rỗng, dãy cực tiểu hóa luôn tồn tại:

- nếu cận dưới đúng là số hữu hạn $p$ thì với mỗi $k$, số $p+1/k$ không còn là cận dưới, nên có $x^{(k)}\in C$ với $f(x^{(k)})<p+1/k$;
- nếu cận dưới đúng là $-\infty$, chọn $x^{(k)}$ với $f(x^{(k)})<-k$.

Trong Ví dụ 01.7, dãy $w^{(k)}=k$ thỏa $L(w^{(k+1)})<L(w^{(k)})$ và $L(w^{(k)})\to0$, nên là một dãy cực tiểu hóa. Không phần tử nào của dãy là nghiệm, vì phần tử kế tiếp luôn tốt hơn, và dãy không hội tụ trong $\mathbb R$ vì $w^{(k)}\to+\infty$. Do đó giá trị mất mát giảm đều trong quá trình huấn luyện không chứng tỏ bài toán có nghiệm.
:::

Trong học máy, dữ liệu tách được tuyến tính xuất hiện mỗi khi $d\ge n$ và các vector $a_1,\ldots,a_n$ độc lập tuyến tính: khi đó $X$ có $n$ hàng độc lập tuyến tính, nên $\operatorname{rank}(X)=n$ (Mệnh đề 00.8), $\operatorname{Col}(X)=\mathbb R^n$, và hệ $Xw=y$ có một nghiệm $\bar w$ (Định lý 00.9), với $m_i=y_i^2=1$, và $L(\tau\bar w)=n\,\ell(\tau)\to0$ khi $\tau\to+\infty$ theo Mệnh đề 01.8(d), nên (4.7) không có nghiệm. Hậu quả quan sát được là chuẩn của tham số tăng không giới hạn và xác suất dự đoán tiến về $0$ hoặc $1$.

::: exercise Bài tập 01.4 (Hồi quy logistic một chiều không hệ số chặn)
Dữ liệu một chiều, không có hệ số chặn, $L(w)=\sum_i\ell(y_ia_iw)$ như trong (4.7).

(a) Với hai mẫu $(a_1,y_1)=(1,+1)$ và $(a_2,y_2)=(2,+1)$, viết $L(w)$, xác định $\inf_wL(w)$ và cho biết bài toán có nghiệm không.

(b) Với hai mẫu $(1,+1)$ và $(2,-1)$, viết $L(w)$ và $L'(w)$, chứng minh bài toán có đúng một nghiệm $w^*$ và $w^*<0$.

(c) Giải thích vì sao nghiệm ở (b) phân loại sai một trong hai mẫu.
:::

::: hint
Ở (b), dùng ba sự kiện về $L'$: dấu của $L'(0)$, giới hạn của $L'(w)$ khi $w\to-\infty$, và dấu của $L''$ theo Mệnh đề 01.8(c).
:::

::: solution
**(a)** Biên có dấu là $w$ và $2w$, nên $L(w)=\log(1+e^{-w})+\log(1+e^{-2w})$. Cả hai hạng dương, giảm chặt và dần tới $0$ khi $w\to+\infty$ theo Mệnh đề 01.8(a), (b), (d). Vậy $\inf_wL(w)=0$ không được đạt, và bài toán không có nghiệm. Dữ liệu tách được vì mọi $w>0$ phân loại đúng cả hai mẫu.

**(b) Bước 1 (lập $L$ và $L'$).** Biên có dấu là $w$ và $-2w$, nên
$$
\begin{aligned}
L(w)&=\log(1+e^{-w})\\
&\quad+\log(1+e^{2w}),\\
L'(w)&=-\frac1{1+e^w}+\frac{2}{1+e^{-2w}}.
\end{aligned}
$$

**(b) Bước 2 (có điểm dừng âm).** $L'(0)=-\tfrac12+1=\tfrac12>0$. Khi $w\to-\infty$, hạng thứ nhất dần tới $-1$ và hạng thứ hai dần tới $0$, nên $L'(w)\to-1<0$. Hàm $L'$ liên tục, nên theo định lý giá trị trung gian có $w^*<0$ với $L'(w^*)=0$.

**(b) Bước 3 (duy nhất).** Đạo hàm bậc hai của $\ell(cw)$ là $c^2\ell''(cw)>0$ theo Mệnh đề 01.8(c), nên $L''>0$ và $L'$ tăng chặt; $w^*$ là nghiệm duy nhất của $L'=0$. Khi đó $L$ giảm chặt trên $(-\infty,w^*]$ và tăng chặt trên $[w^*,\infty)$, nên $w^*$ là nghiệm duy nhất của bài toán.

**(b) Bước 4 (giải số).** Đặt $\rho=e^{w}$; phương trình $L'(w)=0$ trở thành $2\rho^3+\rho^2-1=0$, cho $\rho\approx0{,}6573$ và $w^*\approx-0{,}4196$.

**(c)** Không có hệ số chặn, dấu dự đoán tại mọi $a>0$ là dấu của $w$. Hai mẫu $a=1$ và $a=2$ có nhãn trái nhau nên không $w$ nào phân loại đúng cả hai. Với $w^*<0$, mẫu $(2,-1)$ được phân loại đúng và mẫu $(1,+1)$ bị phân loại sai; biên có dấu của mẫu $a=2$ nhân đôi tác động của $w$, nên mô hình ưu tiên mẫu này.

**Kiểm tra lại.** Với $\rho=0{,}6573$: $2\rho^3+\rho^2\approx0{,}5680+0{,}4320=1{,}0000$. Tại $w^*\approx-0{,}4196$: $-1/(1+0{,}6573)+2/(1+e^{0{,}8392})\approx-0{,}6034+0{,}6034=0$.
:::

Ba bài toán của §4 được giải bằng ba công cụ riêng: phép bù bình phương, phương trình chuẩn và xét dấu đạo hàm một biến. Không công cụ nào dùng được cho hai bài toán còn lại, và phép xét dấu $L'$ chỉ dùng được khi $d=1$.

## 5. Dạng tổng quát của bài toán tối ưu

Trong ba kết quả của §4, "giải được bài toán" mang ba nghĩa:

- Mệnh đề 01.2: có đúng một nghiệm;
- Hệ quả 01.5: luôn có nghiệm, có thể có vô số nghiệm;
- Ví dụ 01.7: không có nghiệm.

Để so sánh, chúng ta đặt ba mô hình vào cùng một dạng và định nghĩa chính xác các khái niệm nghiệm.

### 5.1. Bài toán tối ưu tổng quát

![Sơ đồ năm khung từ trái sang phải: dữ kiện (quan sát, tham số đã biết, nguồn lực, thuật toán không thay đổi); biến quyết định x có n thành phần; hàm mục tiêu f0(x) cần cực tiểu; ràng buộc f_i(x) nhỏ hơn hoặc bằng 0 và h_j(x) bằng 0; miền khả thi C với x sao thuộc C và f0(x sao) không lớn hơn f0(x) với mọi x thuộc C. Dòng cuối: khả thi là thuộc C, tối ưu còn đòi hỏi không có điểm khả thi nào tốt hơn.](img/lec-01/optimization-model-anatomy.svg)

Sơ đồ trên tách một mô hình tối ưu thành các khối: dữ kiện xác định dạng của mục tiêu và ràng buộc, ràng buộc xác định miền khả thi, hàm mục tiêu so sánh các điểm khả thi. Sơ đồ ghi số chiều của biến là $n$; trong Bài 01, số chiều của biến là $d$ và $n$ là số mẫu.

::: definition Định nghĩa 01.11 (Bài toán tối ưu, khả thi, giá trị tối ưu và nghiệm)
Cho tập $D\subseteq\mathbb R^d$, *hàm mục tiêu* (objective function) $f_0:D\to\mathbb R$, các hàm ràng buộc bất đẳng thức $f_i:D\to\mathbb R$, $i=1,\ldots,n_{\mathrm{in}}$, và các hàm ràng buộc đẳng thức $h_j:D\to\mathbb R$, $j=1,\ldots,n_{\mathrm{eq}}$. Biến $x\in D$ là *biến quyết định* (decision variable), và các điều kiện $f_i(x)\le0$, $h_j(x)=0$ là các *ràng buộc* (constraints). *Tập khả thi* (feasible set) là
$$
\begin{aligned}
C=\{x\in D\mid\ &f_i(x)\le0\ \forall i;\\
&h_j(x)=0\ \forall j\}.
\end{aligned}
$$
*Bài toán tối ưu* là
$$
\underset{x\in C}{\operatorname{minimize}}\quad f_0(x).
\tag{5.1}
$$

- Mỗi $x\in C$ là một *điểm khả thi* (feasible point).
- *Giá trị tối ưu* (optimal value) là $p^*=\inf_{x\in C}f_0(x)$, với quy ước $p^*=+\infty$ khi $C$ rỗng và $p^*=-\infty$ khi $f_0$ không bị chặn dưới trên $C$.
- Một điểm $x^*\in C$ là *nghiệm tối ưu* (optimal point) nếu $f_0(x^*)\le f_0(x)$ với mọi $x\in C$, tương đương $f_0(x^*)=p^*$.
- *Tập nghiệm* (optimal set) là $S^*=\{x\in C\mid f_0(x)=p^*\}$.
:::

Bài toán cực đại một hàm $g$ được đưa về (5.1) bằng cách cực tiểu $f_0=-g$; nghiệm giữ nguyên còn giá trị tối ưu đổi dấu. $C$ và $S^*$ là tập, $p^*$ là một số (có thể bằng $\pm\infty$), $x^*$ là một điểm. Một điểm khả thi chưa chắc là nghiệm: ở Ví dụ 01.2, $u=0$ khả thi nhưng $q(0)=9>\tfrac92$.

Ba mô hình của §4 là ba trường hợp riêng của Định nghĩa 01.11.

| Mô hình | Biến | Mục tiêu $f_0$ | Miền $C$ | Dữ kiện |
|---|---|---|---|---|
| Điều khiển (Định nghĩa 01.1) | $u\in\mathbb R$ | $q(u)$ | $[-u_{\max},u_{\max}]$ | $x_0,t,u_{\max},\lambda$ |
| Bình phương nhỏ nhất (Định nghĩa 01.4) | $w\in\mathbb R^d$ | $J(w)=\lVert Xw-y\rVert_2^2$ | $\mathbb R^d$ | $X,y$ |
| Hồi quy logistic (Định nghĩa 01.7) | $w\in\mathbb R^d$ | $L(w)=\sum_i\ell(y_ia_i^Tw)$ | $\mathbb R^d$ | $(a_i,y_i)$ |

Bài toán điều khiển có hai ràng buộc bất đẳng thức $f_1(u)=u-u_{\max}\le0$ và $f_2(u)=-u-u_{\max}\le0$. Hai bài toán hồi quy không có ràng buộc, nên $C=D=\mathbb R^d$.

Trong học máy, huấn luyện một mô hình có tham số là giải một bài toán dạng (5.1), với bốn thành phần:

- biến quyết định là vector tham số;
- hàm mục tiêu là tổng hoặc trung bình mất mát trên tập huấn luyện, có thể cộng thêm một số hạng phạt;
- dữ kiện là tập huấn luyện;
- miền là toàn không gian tham số, hoặc có ràng buộc như giới hạn chuẩn của trọng số, hay yêu cầu các trọng số trộn không âm và có tổng bằng $1$.

### 5.2. Cực tiểu địa phương và cực tiểu toàn cục

Một thuật toán lặp chỉ quan sát được hàm mục tiêu quanh điểm hiện tại. Xét $f(x)=x^3-3x$ trên $C=[-3,3]$: tại $x=1$, $f'(1)=0$, $f(1)=-2$ và mọi điểm gần $1$ cho giá trị lớn hơn, nên một thuật toán chỉ nhận các bước làm giảm $f$ không rời khỏi điểm này; trong khi đó $f(-3)=-18$. Để phân biệt hai loại cực tiểu này, xem định nghĩa sau.

::: definition Định nghĩa 01.12 (Cực tiểu địa phương, cực tiểu toàn cục, cực tiểu chặt)
Cho bài toán (5.1) và $x^*\in C$.

- $x^*$ là *cực tiểu địa phương* (local minimum) tương đối với $C$ nếu có $r>0$ sao cho $f_0(x^*)\le f_0(x)$ với mọi $x\in C$ thỏa $\lVert x-x^*\rVert_2\le r$. Nếu thêm $f_0(x^*)<f_0(x)$ với mọi $x$ như vậy mà $x\ne x^*$ thì $x^*$ là *cực tiểu địa phương chặt* (strict local minimum).
- $x^*$ là *cực tiểu toàn cục* (global minimum) nếu $f_0(x^*)\le f_0(x)$ với mọi $x\in C$, và là *cực tiểu toàn cục chặt* nếu $f_0(x^*)<f_0(x)$ với mọi $x\in C$, $x\ne x^*$.
:::

Cực tiểu toàn cục trùng với nghiệm tối ưu của Định nghĩa 01.11. Định nghĩa 00.41 xét miền mở; ở đây chỉ so sánh với các điểm vừa gần $x^*$ vừa khả thi, nên một điểm trên biên của $C$ có thể là cực tiểu địa phương dù hàm tiếp tục giảm ra ngoài $C$. *Cực đại địa phương* (chặt) tương đối với $C$ được định nghĩa tương tự với $\ge$ ($>$); một *cực trị* là một cực tiểu hoặc một cực đại.

::: proposition Mệnh đề 01.13 (Quan hệ giữa các loại cực tiểu) — chứng minh đầy đủ
**Giả thiết.** Bài toán (5.1) và một điểm $x^*\in C$.

**Kết luận.**

- (a) Nếu $x^*$ là cực tiểu toàn cục (toàn cục chặt) thì $x^*$ là cực tiểu địa phương (địa phương chặt), với mọi bán kính $r>0$.
- (b) Tập nghiệm $S^*$ có đúng một phần tử khi và chỉ khi bài toán có một cực tiểu toàn cục chặt.
:::

::: proof Chứng minh Mệnh đề 01.13
**Lộ trình.** Cả hai phần suy trực tiếp từ Định nghĩa 01.11 và Định nghĩa 01.12.

**Bước 1 (phần (a)).** Bất đẳng thức $f_0(x^*)\le f_0(x)$ (hoặc $<$ khi $x\ne x^*$) đúng với mọi $x\in C$ thì đúng với mọi $x\in C$ thỏa $\lVert x-x^*\rVert_2\le r$.

**Bước 2 (phần (b), chiều thuận).** Nếu $S^*=\{x^*\}$ thì $f_0(x^*)=p^*$, và mọi $x\in C$ khác $x^*$ không thuộc $S^*$ nên $f_0(x)\ne p^*$. Vì $f_0(x)\ge p^*$, ta có $f_0(x)>f_0(x^*)$: $x^*$ là cực tiểu toàn cục chặt.

**Bước 3 (phần (b), chiều ngược).** Nếu $x^*$ là cực tiểu toàn cục chặt thì $f_0(x^*)=p^*$ và mọi điểm khác có giá trị lớn hơn $p^*$, nên $S^*=\{x^*\}$. $\square$
:::

Mệnh đề 01.13 dịch câu hỏi "nghiệm có duy nhất không" thành câu hỏi "có cực tiểu toàn cục chặt không". Chiều ngược của (a) sai: một kiểm tra địa phương không đủ để kết luận toàn cục. Để thấy điều này, xem ví dụ sau.

::: example Ví dụ 01.9 (Cực tiểu địa phương không toàn cục)
**Dữ kiện.** $f(x)=x^3-3x$ trên $C=[-3,3]$.

**Xét dấu đạo hàm.** $f'(x)=3(x-1)(x+1)$ dương trên $[-3,-1)$, âm trên $(-1,1)$ và dương trên $(1,3]$, nên $f$ tăng trên $[-3,-1]$, giảm trên $[-1,1]$ và tăng trên $[1,3]$. Các giá trị tại hai điểm dừng và hai đầu mút là $f(-3)=-18$, $f(-1)=2$, $f(1)=-2$, $f(3)=18$.

**Phân loại.**

- $x=1$ là cực tiểu địa phương chặt: với $r=1$, mọi $x\in[0,2]$ khác $1$ có $f(x)>f(1)$, vì $f$ giảm chặt trước $1$ và tăng chặt sau $1$.
- $x=-3$ là cực tiểu toàn cục chặt: trên $[-3,-1]$, $f$ tăng nên giá trị nhỏ nhất là $f(-3)$; trên $[-1,3]$, giá trị nhỏ nhất là $f(1)=-2>-18$.

Vậy $p^*=-18$ và $S^*=\{-3\}$. Tại nghiệm $x=-3$, $f'(-3)=24\ne0$, cùng hiện tượng nghiệm biên của Nhận xét 01.3.

**Kiểm tra lại.** $f(-3)=-27+9=-18$ và $f(1)=1-3=-2$; $f(0)=0$ nằm giữa hai giá trị này và lớn hơn $f(1)$, khớp với việc $f$ giảm trên $[-1,1]$.
:::

![Hai khung. Trái: hàm không lồi trên đoạn từ −2 đến 0,5, cực tiểu toàn cục (hình thoi) tại x bằng −1, cực tiểu địa phương (hình tròn) tại đầu mút phải 0,5, nơi hàm giảm khi tiến tới biên. Phải: hàm lồi có một điểm cực tiểu vừa địa phương vừa toàn cục và một dây cung nằm trên đồ thị.](img/lec-01/local-versus-global-minimum.svg)

Khung trái của hình có cùng hiện tượng với Ví dụ 01.9; khung phải có một điểm cực tiểu vừa địa phương vừa toàn cục.

::: remark Nhận xét 01.14 (Điểm dừng và cực tiểu trên biên)
Hai nhầm lẫn liên quan tới điều kiện đạo hàm:

- coi mọi *điểm dừng* (stationary point, Định nghĩa 00.41) là cực tiểu: $x^3$ có đạo hàm bằng $0$ tại $0$ nhưng $0$ không là cực trị, $x=-1$ của Ví dụ 01.9 là cực đại địa phương, và với nhiều biến một điểm dừng có thể là điểm yên ngựa (Định lý 00.43);
- coi mọi cực tiểu địa phương đều có đạo hàm bằng $0$: Định lý 00.42 chỉ áp dụng cho điểm trong, còn cực tiểu toàn cục $x=-3$ của Ví dụ 01.9 nằm trên biên với $f'(-3)=24$.
:::

::: exercise Bài tập 01.5 (Phân loại cực tiểu trên một đoạn)
Cho $f(x)=x^4-2x^2$ trên $C=[-2,\tfrac12]$. Tìm mọi điểm dừng trong $C$, xác định các khoảng đơn điệu của $f$ trên $C$, rồi phân loại bốn điểm $-2$, $-1$, $0$, $\tfrac12$: điểm nào là cực tiểu địa phương (chặt hay không), cực đại địa phương, cực tiểu toàn cục.
:::

::: hint
$f'(x)=4x(x-1)(x+1)$. Một đầu mút là cực tiểu địa phương tương đối với $C$ nếu hàm giảm khi tiến tới đầu mút đó từ phía trong đoạn.
:::

::: solution
**Điểm dừng.** Điểm dừng trong $C$ là $-1$ và $0$; điểm $1$ nằm ngoài $C$.

**Đơn điệu.** $f'(x)=4x(x-1)(x+1)$ âm trên $[-2,-1)$ (ba thừa số đều âm), dương trên $(-1,0)$ và âm trên $(0,\tfrac12]$. Vậy $f$ giảm trên $[-2,-1]$, tăng trên $[-1,0]$, giảm trên $[0,\tfrac12]$. Các giá trị: $f(-2)=8$, $f(-1)=-1$, $f(0)=0$, $f(\tfrac12)=\tfrac1{16}-\tfrac12=-\tfrac7{16}$.

**Phân loại.**

- $x=-2$ là cực đại địa phương tương đối với $C$, vì $f$ giảm khi rời $-2$ vào trong đoạn.
- $x=-1$ là cực tiểu địa phương chặt và cực tiểu toàn cục chặt: trên $[-2,0]$, giá trị nhỏ nhất $-1$ đạt duy nhất tại $-1$; trên $[0,\tfrac12]$, $f\ge f(\tfrac12)=-\tfrac7{16}>-1$.
- $x=0$ là cực đại địa phương chặt, vì $f$ tăng chặt trước $0$ và giảm chặt sau $0$.
- $x=\tfrac12$ là cực tiểu địa phương chặt tương đối với $C$, với $f'(\tfrac12)=\tfrac12-2=-\tfrac32\ne0$, nhưng không toàn cục.

**Kiểm tra lại.** $p^*=-1$ và $S^*=\{-1\}$; theo Mệnh đề 01.13(b), $-1$ là cực tiểu toàn cục chặt. Trực tiếp, $f(-1)=1-2=-1<-\tfrac7{16}=f(\tfrac12)$.
:::

### 5.3. Miền lồng nhau và bốn loại kết luận

Hai bài toán cùng hàm mục tiêu trên hai miền lồng nhau có quan hệ sau.

::: proposition Mệnh đề 01.15 (So sánh hai bài toán có miền lồng nhau) — chứng minh đầy đủ
**Giả thiết.** $C'\subseteq C\subseteq D$ và $f_0:D\to\mathbb R$. Ký hiệu $p^*(C)=\inf_{x\in C}f_0(x)$.

**Kết luận.**

- (a) $p^*(C)\le p^*(C')$.
- (b) Nếu $x^*\in C'$ là nghiệm của bài toán trên $C$ thì $x^*$ cũng là nghiệm của bài toán trên $C'$, và $p^*(C')=p^*(C)$.
:::

::: proof Chứng minh Mệnh đề 01.15
**Lộ trình.** So sánh hai cận dưới đúng theo Định nghĩa 01.9.

**Bước 1 (phần (a)).** Với mọi $x\in C'$, ta có $x\in C$, nên $f_0(x)\ge p^*(C)$. Vậy $p^*(C)$ là một cận dưới của $f_0$ trên $C'$, nên không lớn hơn cận dưới lớn nhất $p^*(C')$.

**Bước 2 (phần (b)).** Vì $x^*$ là nghiệm trên $C$, $f_0(x^*)\le f_0(x)$ với mọi $x\in C$, nên cũng với mọi $x\in C'\subseteq C$. Cùng với $x^*\in C'$, điều này nghĩa là $x^*$ là nghiệm trên $C'$, và $p^*(C')=f_0(x^*)=p^*(C)$. $\square$
:::

Mệnh đề 01.15 không cho biết nghiệm trên $C'$ khi nghiệm trên $C$ nằm ngoài $C'$. Nó giải thích hai hiện tượng đã gặp:

- ở Ví dụ 01.2, ràng buộc làm giá trị tối ưu tăng từ $3$ lên $\tfrac92$, đúng chiều của (a);
- ở Ví dụ 01.3 với $\lambda=5$, cực tiểu không ràng buộc $u_{\mathrm{free}}=\tfrac12$ nằm trong $C$, nên theo (b) nó là nghiệm của bài toán có ràng buộc.

::: example Ví dụ 01.10 (Bốn loại kết luận trên ba trường hợp)
**Dữ kiện.** Ba bài toán đã giải:

- Ví dụ 01.2: $\min_{u\in[-1,1]}q(u)$ với $q(u)=\tfrac32u^2-6u+9$, nghiệm $u^*=1$, giá trị tối ưu $\tfrac92$;
- Ví dụ 01.6: $\min_{w'}\lVert X'w'-y\rVert_2^2$ với $y=(1,2,2)^T$, giá trị tối ưu $\tfrac16$, tập nghiệm $\{(7/6,\kappa,1/2-\kappa)^T\mid\kappa\in\mathbb R\}$;
- Ví dụ 01.7: $\min_{w\in\mathbb R}L(w)$ với $L(w)=2\log(1+e^{-w})$, cận dưới $0$ không được đạt.

Bốn loại kết luận về một bài toán là: một điểm khả thi; giá trị tối ưu $p^*$; sự tồn tại của nghiệm ($S^*\ne\varnothing$); tính duy nhất của nghiệm ($S^*$ có đúng một phần tử).

| Bài toán | Điểm khả thi | $p^*$ | Tồn tại | Duy nhất |
|---|---|---|---|---|
| Điều khiển, Ví dụ 01.2 | $u=0$, $q(0)=9$ | $9/2$ | có, $u^*=1$ | có |
| Hai cột trùng nhau, Ví dụ 01.6 | $w'=0$, $J=9$ | $1/6$ | có | không, $S^*$ là một đường thẳng |
| Logistic tách được, Ví dụ 01.7 | $w=0$, $L=2\log2$ | $0$ | không | không đặt ra |

Giá trị $J(0)=\lVert y\rVert_2^2=1+4+4=9$.

**Kiểm tra lại.** Trong mỗi hàng, giá trị tại điểm khả thi không nhỏ hơn $p^*$: $9\ge\tfrac92$, $9\ge\tfrac16$, $2\log2\ge0$, đúng Định nghĩa 01.9.
:::

::: remark Nhận xét 01.16 (Sáu câu hỏi chứng nhận)
Bốn loại kết luận của Ví dụ 01.10, cùng câu hỏi về tính toàn cục của một điểm ứng viên và về hình dạng của miền và của hàm, cho sáu câu hỏi sau, theo thứ tự dùng khi phân tích một mô hình mới:

1. Điểm $x$ đang xét có thuộc $C$ không.
2. Tập khả thi $C$ có lồi không.
3. Hàm mục tiêu $f_0$ có lồi trên $C$ không.
4. Một điểm ứng viên (điểm có gradient bằng $0$, hoặc một cực tiểu địa phương) có là cực tiểu toàn cục không.
5. Nghiệm tối ưu có tồn tại không.
6. Nếu tồn tại, nghiệm có duy nhất không.

Câu 6 chỉ đặt ra khi câu 5 được trả lời khẳng định. Miền $\mathbb R$ và độ cong dương tại mọi điểm chưa đủ cho câu 5: ở Ví dụ 01.7, hàm $L$ có cả hai tính chất đó và bài toán vẫn không có nghiệm.
:::

::: exercise Bài tập 01.6 (Trạm cấp nước)
Ba hộ dân ở các vị trí $p_1=(0,0)$, $p_2=(4,0)$, $p_3=(0,2)$ trên mặt phẳng (đơn vị km). Cần đặt một trạm cấp nước tại $x\in\mathbb R^2$ để tổng bình phương khoảng cách $f(x)=\sum_{i=1}^3\lVert x-p_i\rVert_2^2$ nhỏ nhất, với quy hoạch yêu cầu trạm nằm trong nửa mặt phẳng $x_1\le1$.

(a) Chỉ ra dữ kiện, biến quyết định, hàm mục tiêu, miền khả thi và viết bài toán theo dạng (5.1).

(b) Chứng minh $f(x)=3\lVert x-x_{\mathrm c}\rVert_2^2+\tfrac{40}3$ với $x_{\mathrm c}=(\tfrac43,\tfrac23)$.

(c) Tìm nghiệm và giá trị tối ưu khi bỏ ràng buộc và khi có ràng buộc.

(d) Kiểm tra kết quả với Mệnh đề 01.15(a).
:::

::: hint
Ở (b), khai triển $\lVert x-p_i\rVert_2^2=\lVert x\rVert_2^2-2p_i^Tx+\lVert p_i\rVert_2^2$ và cộng ba đẳng thức. Ở (c), dạng của (b) đưa bài toán về tìm điểm của miền gần $x_{\mathrm c}$ nhất.
:::

::: solution
**(a)** Dữ kiện là ba vị trí $p_1,p_2,p_3\in\mathbb R^2$ và hằng số $1$ trong ràng buộc; biến quyết định là $x\in\mathbb R^2$; hàm mục tiêu là $f$; miền khả thi là $C=\{x\in\mathbb R^2\mid x_1-1\le0\}$, ứng với một ràng buộc bất đẳng thức $f_1(x)=x_1-1\le0$. Bài toán là $\min_{x\in C}f(x)$.

**(b)** Cộng ba khai triển:
$$
\begin{aligned}
f(x)&=3\lVert x\rVert_2^2\\
&\quad-2(p_1+p_2+p_3)^Tx\\
&\quad+\textstyle\sum_i\lVert p_i\rVert_2^2 ,
\end{aligned}
$$
với $p_1+p_2+p_3=(4,2)=3x_{\mathrm c}$ và $\sum_i\lVert p_i\rVert_2^2=0+16+4=20$. Mặt khác $3\lVert x-x_{\mathrm c}\rVert_2^2=3\lVert x\rVert_2^2-6x_{\mathrm c}^Tx+3\lVert x_{\mathrm c}\rVert_2^2$ với $3\lVert x_{\mathrm c}\rVert_2^2=3(\tfrac{16}9+\tfrac49)=\tfrac{20}3$. Trừ hai biểu thức: $f(x)-3\lVert x-x_{\mathrm c}\rVert_2^2=20-\tfrac{20}3=\tfrac{40}3$.

**(c) Không ràng buộc.** Theo (b), $f(x)\ge\tfrac{40}3$ với dấu bằng khi và chỉ khi $x=x_{\mathrm c}$. Nghiệm duy nhất là trọng tâm $x_{\mathrm c}=(\tfrac43,\tfrac23)$ của ba hộ, với $p^*=\tfrac{40}3$.

**(c) Có ràng buộc.** $x_{\mathrm c}$ không khả thi vì $\tfrac43>1$. Với $x\in C$, $(x_1-\tfrac43)^2\ge\tfrac19$, với dấu bằng khi và chỉ khi $x_1=1$, và $(x_2-\tfrac23)^2\ge0$, với dấu bằng khi và chỉ khi $x_2=\tfrac23$. Vậy nghiệm duy nhất là $x^*=(1,\tfrac23)$ và $p^*=\tfrac{40}3+3\cdot\tfrac19=\tfrac{41}3$.

**(d) Kiểm tra lại.** $C\subseteq\mathbb R^2$, và Mệnh đề 01.15(a) cho $p^*(\mathbb R^2)\le p^*(C)$: $\tfrac{40}3\le\tfrac{41}3$. Trực tiếp,
$$
\begin{aligned}
f(1,\tfrac23)&=(1+\tfrac49)+(9+\tfrac49)\\
&\quad+(1+\tfrac{16}9)=\tfrac{41}3 .
\end{aligned}
$$
:::

Câu 1 của Nhận xét 01.16 trả lời được ngay bằng cách thay $x$ vào các ràng buộc. Các câu 2 đến 6 cần thêm cấu trúc của miền và của hàm mục tiêu, vì Ví dụ 01.9 có một cực tiểu địa phương không toàn cục.

## 6. Tập lồi

Giả sử bộ chấp hành của Ví dụ 01.1 có *vùng chết* (dead zone): nó chỉ tạo được tác động có độ lớn từ $\tfrac12$ đến $1$. Miền khả thi là $C=[-1,-\tfrac12]\cup[\tfrac12,1]$; hai tác động $-1$ và $1$ khả thi, nhưng tác động trung bình $0$ không khả thi. Trên miền này, $u\mapsto u^2$ có hai nghiệm cách xa nhau $u=\pm\tfrac12$, và một phương pháp chỉ dịch chuyển dần từ một điểm khả thi không đi được từ nhánh này sang nhánh kia.

### 6.1. Đoạn nối và tổ hợp lồi

Với hai phương án $x,y\in\mathbb R^d$ và một hệ số $\theta\in[0,1]$, điểm $z_\theta=\theta x+(1-\theta)y$ là phương án trộn $x$ với tỉ lệ $\theta$ và $y$ với tỉ lệ $1-\theta$: $\theta=1$ cho $x$, $\theta=0$ cho $y$, $\theta=\tfrac12$ cho trung điểm. Khi $\theta$ chạy trên $[0,1]$, $z_\theta$ quét hết đoạn thẳng nối $x$ và $y$.

![Hai khung. Trái: tập lồi C hình elip chứa hai điểm x, y và điểm z bằng theta x cộng (1 − theta) y; cả đoạn nối x với y nằm trong C. Phải: tập không lồi D gồm hai thùy nối qua một chỗ thắt; phần giữa của đoạn nối x với y, vẽ nét đứt, nằm ngoài D. Chú thích: một cặp phản ví dụ đủ để bác bỏ tính lồi.](img/lec-01/convex-set-and-combination.svg)

Ở khung trái của hình, mọi đoạn nối hai điểm của $C$ nằm trọn trong $C$; ở khung phải, như tập vùng chết, có một đoạn nối đi ra ngoài tập. Một cách trực quan, miền thích hợp cho tối ưu chứa mọi phương án trộn của hai phương án khả thi. Để làm rõ điều kiện này, xem định nghĩa sau.

::: definition Định nghĩa 01.17 (Tổ hợp lồi của hai điểm và tập lồi)
Cho $x,y\in\mathbb R^d$ và $\theta\in[0,1]$. Điểm $\theta x+(1-\theta)y$ là một *tổ hợp lồi* (convex combination) của $x$ và $y$; tập mọi tổ hợp lồi của $x$ và $y$ là đoạn thẳng nối $x$ và $y$. Một tập $C\subseteq\mathbb R^d$ là *tập lồi* (convex set) nếu
$$
\begin{aligned}
&\theta x+(1-\theta)y\in C\\
&\forall x,y\in C,\ \forall\theta\in[0,1].
\end{aligned}
\tag{6.1}
$$
:::

Định nghĩa có hai lượng từ "với mọi": cho mọi cặp điểm của tập, và cho mọi $\theta\in[0,1]$. Để bác bỏ tính lồi, chỉ cần một bộ $x,y,\theta$ với $z_\theta\notin C$. Tập rỗng và tập một điểm đều lồi. Ví dụ:

- đoạn $[-u_{\max},u_{\max}]$ lồi: nếu $\lvert u\rvert,\lvert v\rvert\le u_{\max}$ thì $\lvert\theta u+(1-\theta)v\rvert\le\theta\lvert u\rvert+(1-\theta)\lvert v\rvert\le u_{\max}$;
- toàn không gian $\mathbb R^d$ lồi;
- tập vùng chết $[-1,-\tfrac12]\cup[\tfrac12,1]$ không lồi, với bộ $x=-1$, $y=1$, $\theta=\tfrac12$;
- đường tròn đơn vị $\{x\in\mathbb R^2\mid\lVert x\rVert_2=1\}$ không lồi, với bộ $x=(1,0)$, $y=(-1,0)$, $\theta=\tfrac12$.

Kiểm tra chỉ trung điểm là không đủ: tập số hữu tỉ $\mathbb Q$ chứa trung điểm của mọi cặp phần tử của nó nhưng không lồi, vì đoạn $[0,1]$ chứa số vô tỉ $1/\sqrt2$.

Một *tập affine* (affine set) chứa mọi tổ hợp $\theta x+(1-\theta)y$ với $\theta\in\mathbb R$, nên mọi không gian con là tập affine và mọi tập affine là tập lồi; đường thẳng $\{x\in\mathbb R^2\mid x_1+x_2=1\}$ là tập affine nhưng không là không gian con, và đoạn $[0,1]$ lồi nhưng không affine.

### 6.2. Các tập lồi cơ bản và phép toán bảo toàn tính lồi

Thay vì kiểm tra (6.1) cho từng miền, chúng ta lập một danh sách tập lồi cơ bản và một danh sách *phép toán bảo toàn tính lồi* (operations that preserve convexity), rồi nhận dạng miền như một kết quả ghép.

::: proposition Mệnh đề 01.18 (Các tập lồi cơ bản) — chứng minh đầy đủ
**Giả thiết.** $A\in\mathbb R^{d'\times d}$, $c\in\mathbb R^{d'}$; $g\in\mathbb R^d$, $g\ne0$, và $\beta\in\mathbb R$; các số $\underline x_j\le\overline x_j$, $j=1,\ldots,d$; $x_{\mathrm c}\in\mathbb R^d$ và $r\ge0$.

**Kết luận.** Các tập sau đều lồi:

- (a) toàn không gian $\mathbb R^d$;
- (b) tập affine $\{x\mid Ax=c\}$;
- (c) *nửa không gian* (halfspace) $\{x\mid g^Tx\le\beta\}$;
- (d) *hộp* (box) $\{x\mid\underline x_j\le x_j\le\overline x_j,\ j=1,\ldots,d\}$;
- (e) *quả cầu Euclid đóng* (closed Euclidean ball) $B(x_{\mathrm c},r)=\{x\mid\lVert x-x_{\mathrm c}\rVert_2\le r\}$.
:::

::: proof Chứng minh Mệnh đề 01.18
**Lộ trình.** Với mỗi tập, lấy hai điểm $x,y$ của tập, $\theta\in[0,1]$, $z=\theta x+(1-\theta)y$, và kiểm tra $z$ thỏa điều kiện xác định tập.

**Bước 1 (phần (a), (b)).** $z\in\mathbb R^d$. Với tập affine, $Az=\theta Ax+(1-\theta)Ay=\theta c+(1-\theta)c=c$.

**Bước 2 (phần (c), (d)).** $g^Tz=\theta g^Tx+(1-\theta)g^Ty\le\theta\beta+(1-\theta)\beta=\beta$, trong đó bất đẳng thức dùng $\theta\ge0$ và $1-\theta\ge0$. Với hộp, mỗi tọa độ $z_j$ là tổ hợp lồi của hai số trong đoạn $[\underline x_j,\overline x_j]$, nên nằm trong đoạn đó theo cùng lập luận.

**Bước 3 (phần (e)).** Theo bất đẳng thức tam giác (Mệnh đề 00.5) và tính thuần nhất của chuẩn,
$$
\begin{aligned}
&\lVert z-x_{\mathrm c}\rVert_2\\
&=\lVert\theta(x-x_{\mathrm c})\\
&\qquad+(1-\theta)(y-x_{\mathrm c})\rVert_2\\
&\le\theta\lVert x-x_{\mathrm c}\rVert_2\\
&\quad+(1-\theta)\lVert y-x_{\mathrm c}\rVert_2\\
&\le r. \qquad\square
\end{aligned}
$$
:::

Bước 1 đúng với mọi $\theta\in\mathbb R$; các bước còn lại cần $\theta\in[0,1]$. Tập $\{x\mid g^Tx=\beta\}$ là một *siêu phẳng* (hyperplane), trường hợp riêng của (b). Từ các tập cơ bản, ta tạo được tập lồi mới bằng các phép ghép sau.

::: proposition Mệnh đề 01.19 (Các phép toán bảo toàn tính lồi của tập) — chứng minh đầy đủ
**Giả thiết.** $C_j\subseteq\mathbb R^d$ lồi với mọi $j$ trong một tập chỉ số $\mathcal J$ (hữu hạn hoặc vô hạn); $C\subseteq\mathbb R^d$ và $E\subseteq\mathbb R^{d'}$ lồi; $A\in\mathbb R^{d'\times d}$, $c\in\mathbb R^{d'}$.

**Kết luận.**

- (a) Giao $\bigcap_{j\in\mathcal J}C_j$ lồi.
- (b) Ảnh affine $\{Ax+c\mid x\in C\}$ lồi.
- (c) Nghịch ảnh affine $\{x\in\mathbb R^d\mid Ax+c\in E\}$ lồi.
:::

::: proof Chứng minh Mệnh đề 01.19
**Lộ trình.** Kiểm tra (6.1) cho mỗi tập; với (b) và (c), dùng đẳng thức $Az+c=\theta(Ax+c)+(1-\theta)(Ay+c)$, đúng vì $\theta+(1-\theta)=1$.

**Bước 1 (phần (a)).** Gọi $z=\theta x+(1-\theta)y$ với $\theta\in[0,1]$. Nếu $x,y$ thuộc giao thì $x,y\in C_j$ với mọi $j$; vì mỗi $C_j$ lồi, $z\in C_j$ với mọi $j$, tức $z$ thuộc giao.

**Bước 2 (phần (b)).** Hai điểm của ảnh có dạng $Ax+c$ và $Ay+c$ với $x,y\in C$. Tổ hợp lồi của chúng là $Az+c$, với $z\in C$ vì $C$ lồi, nên thuộc ảnh.

**Bước 3 (phần (c)).** Nếu $Ax+c\in E$ và $Ay+c\in E$ thì $Az+c=\theta(Ax+c)+(1-\theta)(Ay+c)\in E$ vì $E$ lồi, nên $z$ thuộc nghịch ảnh. $\square$
:::

Trong mô hình hóa, giao dùng khi một điểm phải thỏa đồng thời nhiều ràng buộc, vì điểm đó thuộc giao của các tập ràng buộc; nghịch ảnh affine dùng khi ràng buộc đặt lên một đại lượng affine theo biến, như dự đoán $Xw$.

::: example Ví dụ 01.11 (Chứng nhận miền bằng phép ghép)
**Dữ kiện.** Đoạn $[-u_{\max},u_{\max}]$; dữ liệu $(a_i,y_i)$ của Định nghĩa 01.7; một ảnh $x\in[0,1]^d$ và ngân sách $\varepsilon>0$; đơn hình $\Delta_K$.

**(a) Ba bài toán của bài.** $[-u_{\max},u_{\max}]=\{u\mid u\le u_{\max}\}\cap\{u\mid-u\le u_{\max}\}$ là giao của hai nửa không gian trong $\mathbb R$ ($g=1$ và $g=-1$ trong Mệnh đề 01.18(c)), nên lồi theo Mệnh đề 01.19(a). Miền $\mathbb R^d$ lồi theo Mệnh đề 01.18(a).

**(b) Máy vector hỗ trợ lề cứng.** *Lề* (margin) của một bộ phân loại tuyến tính $w$ trên dữ liệu $(a_i,y_i)$ là biên có dấu nhỏ nhất $\min_iy_ia_i^Tw$. Tập các bộ phân loại có lề ít nhất $1$,
$$
\begin{aligned}
W=\{w\in\mathbb R^d\mid\ &y_ia_i^Tw\ge1,\\
&i=1,\ldots,n\},
\end{aligned}
$$
là giao của $n$ nửa không gian $\{w\mid(-y_ia_i)^Tw\le-1\}$, nên lồi. Tập này là miền khả thi của *máy vector hỗ trợ lề cứng* (hard-margin support vector machine, hard-margin SVM).

**(c) Nhiễu đối kháng.** Tập *nhiễu đối kháng* (adversarial perturbation) hợp lệ cho ảnh $x$ với ngân sách $\varepsilon$ là
$$
\begin{aligned}
\{\delta\in\mathbb R^d\mid\ &\lvert\delta_j\rvert\le\varepsilon,\\
&0\le x_j+\delta_j\le1\ \forall j\}.
\end{aligned}
$$
Đây là giao của một hộp theo $\delta$ và nghịch ảnh của hộp $[0,1]^d$ qua ánh xạ affine $\delta\mapsto x+\delta$, nên lồi theo Mệnh đề 01.18(d) và Mệnh đề 01.19(a), (c).

**(d) Đơn hình xác suất.** *Đơn hình xác suất* (probability simplex) $\Delta_K=\{\omega\in\mathbb R^K\mid\omega\ge0,\ \mathbb 1^T\omega=1\}$ là giao của $K$ nửa không gian $\{\omega\mid-\omega_j\le0\}$ và tập affine $\{\omega\mid\mathbb 1^T\omega=1\}$, nên lồi theo Mệnh đề 01.18(b), (c) và Mệnh đề 01.19(a). Đầu ra của hàm softmax, trọng số chú ý (attention) và vector trọng số trộn của một tổ hợp mô hình nằm trong $\Delta_K$.

**Kiểm tra lại.** Ở (a) với $u_{\max}=1$: hai phương án $-1$ và $1$ khả thi, và mọi tổ hợp lồi $\theta\cdot1+(1-\theta)(-1)=2\theta-1$ thuộc $[-1,1]$ khi $\theta\in[0,1]$. Ở (d) với $K=3$: $(\tfrac12,\tfrac12,0)$ và $(0,0,1)$ thuộc $\Delta_3$, và trung điểm $(\tfrac14,\tfrac14,\tfrac12)$ có tọa độ không âm, tổng bằng $1$.
:::

::: remark Nhận xét 01.20 (Khi bỏ giả thiết: hợp, phần bù, ánh xạ phi tuyến, tính đóng và tính bị chặn)
Bốn phản ví dụ sau chỉ ra giới hạn của Mệnh đề 01.19 và của tính lồi:

- hợp của hai tập lồi nói chung không lồi: $[0,1]\cup[2,3]$ chứa $1$ và $2$ nhưng không chứa $\tfrac32$; tập vùng chết cũng là một hợp như vậy;
- phần bù của tập lồi nói chung không lồi: $\{w\in\mathbb R^2\mid\lVert w\rVert_2\ge1\}$, phần bù của quả cầu mở, chứa $(1,0)$ và $(-1,0)$ nhưng không chứa $(0,0)$;
- Mệnh đề 01.19(b), (c) cần ánh xạ affine: tập vùng chết là nghịch ảnh của đoạn lồi $[\tfrac14,1]$ qua ánh xạ $u\mapsto u^2$, và không lồi;
- tính lồi độc lập với tính đóng và tính bị chặn: nửa không gian lồi nhưng không bị chặn, khoảng mở $(0,1)$ lồi nhưng không đóng.
:::

::: exercise Bài tập 01.7 (Nhận dạng tập lồi)
Xác định tập nào sau đây lồi; với tập lồi, nêu căn cứ theo Mệnh đề 01.18 và Mệnh đề 01.19; với tập không lồi, cho một bộ $x,y,\theta$ vi phạm (6.1).

(a) $\{x\in\mathbb R^2\mid\lvert x_1\rvert+\lvert x_2\rvert\le1\}$.

(b) $\{x\in\mathbb R^2\mid x_1x_2\ge0\}$.

(c) $\{\omega\in\mathbb R^3\mid\omega\ge0,\ \omega_1+\omega_2+\omega_3=1,\ \omega_1\le\tfrac12\}$.
:::

::: hint
Ở (a), viết $\lvert x_1\rvert+\lvert x_2\rvert\le1$ thành bốn bất đẳng thức tuyến tính $\pm x_1\pm x_2\le1$. Ở (b), thử một điểm trên trục hoành dương và một điểm trên trục tung âm.
:::

::: solution
**(a) Lồi.** Với mọi $x$, $\lvert x_1\rvert+\lvert x_2\rvert$ là giá trị lớn nhất của $\pm x_1\pm x_2$ trên bốn tổ hợp dấu. Do đó tập bằng giao của bốn nửa không gian $\{x\mid\pm x_1\pm x_2\le1\}$ (bốn tổ hợp dấu), và lồi theo Mệnh đề 01.18(c) và Mệnh đề 01.19(a).

**(b) Không lồi.** $x=(1,0)$ và $y=(0,-1)$ có tích tọa độ bằng $0$ nên thuộc tập. Với $\theta=\tfrac12$, $z=(\tfrac12,-\tfrac12)$ có $z_1z_2=-\tfrac14<0$.

**(c) Lồi.** Tập là giao của ba nửa không gian $\{-\omega_j\le0\}$, tập affine $\{\mathbb 1^T\omega=1\}$ và nửa không gian $\{\omega_1\le\tfrac12\}$; lồi theo Mệnh đề 01.18(b), (c) và Mệnh đề 01.19(a).

**Kiểm tra lại.** Ở (a), $(1,0)$ và $(0,1)$ thuộc tập và trung điểm $(\tfrac12,\tfrac12)$ có $\lvert x_1\rvert+\lvert x_2\rvert=1$, vẫn thuộc tập. Ở (c), $(\tfrac12,\tfrac14,\tfrac14)$ và $(0,0,1)$ thuộc tập, và trung điểm $(\tfrac14,\tfrac18,\tfrac58)$ có tổng $1$ và $\omega_1=\tfrac14\le\tfrac12$.
:::

::: exercise Bài tập 01.8 (Tập trên parabol)
Chứng minh trực tiếp từ Định nghĩa 01.17 rằng tập $P=\{x\in\mathbb R^2\mid x_2\ge x_1^2\}$, phần mặt phẳng nằm trên parabol, là tập lồi.
:::

::: hint
Với hai số thực $\xi_1,\xi_2$ và $\theta\in[0,1]$, tính hiệu $\theta \xi_1^2+(1-\theta)\xi_2^2-(\theta \xi_1+(1-\theta)\xi_2)^2$.
:::

::: solution
**Bước 1 (một bất đẳng thức cho hai số).** Vì $\theta-\theta^2=\theta(1-\theta)$ và $(1-\theta)-(1-\theta)^2=\theta(1-\theta)$,
$$
\begin{aligned}
&\theta \xi_1^2+(1-\theta)\xi_2^2\\
&\quad-(\theta \xi_1+(1-\theta)\xi_2)^2\\
&\quad=\theta(1-\theta)\\
&\qquad\times(\xi_1^2+\xi_2^2-2\xi_1\xi_2)\\
&\quad=\theta(1-\theta)(\xi_1-\xi_2)^2\ge0 .
\end{aligned}
$$

**Bước 2 (kiểm tra (6.1)).** Lấy $x,y\in P$ và $z=\theta x+(1-\theta)y$. Khi đó
$$
\begin{aligned}
z_2&=\theta x_2+(1-\theta)y_2\\
&\ge\theta x_1^2+(1-\theta)y_1^2\\
&\ge(\theta x_1+(1-\theta)y_1)^2=z_1^2 .
\end{aligned}
$$
Bất đẳng thức thứ nhất dùng $x,y\in P$ và $\theta,1-\theta\ge0$; bất đẳng thức thứ hai là bước 1 với $\xi_1=x_1$, $\xi_2=y_1$. Vậy $z\in P$.

**Kiểm tra lại.** Với $x=(-1,1)$, $y=(1,1)$, $\theta=\tfrac12$: $z=(0,1)$ và $z_2=1\ge0=z_1^2$; hiệu ở bước 1 với $\xi_1=-1$, $\xi_2=1$ bằng $1-0=1=\tfrac14\cdot4$.
:::

Miền lồi mới là một nửa của chứng nhận. Hàm $f(x)=x^3-3x$ của Ví dụ 01.9 được xét trên đoạn $[-3,3]$, một tập lồi theo Mệnh đề 01.18(d), và vẫn có cực tiểu địa phương $x=1$ không toàn cục. Hàm mục tiêu cũng phải có hình dạng phù hợp.

## 7. Hàm lồi

Giữa hai cực tiểu $x=-3$ và $x=1$ của Ví dụ 01.9, $f$ đạt cực đại địa phương tại $x=-1$. Một hàm thích hợp cho tối ưu không có cực đại như vậy nằm giữa hai cực tiểu.

### 7.1. Định nghĩa qua dây cung

Với $x,y$ trong một miền lồi $C$, *dây cung* (chord) là đoạn thẳng nối $(x,f(x))$ và $(y,f(y))$; tại $z=\theta x+(1-\theta)y$, độ cao của dây cung là $\theta f(x)+(1-\theta)f(y)$. Dây cung của $x^3-3x$ nối $(-3,-18)$ với $(1,-2)$ có độ cao $-10$ tại $x=-1$, còn đồ thị ở độ cao $2$. Dây cung của $q(u)=\tfrac32u^2-6u+9$ nối $(-1,\tfrac{33}2)$ với $(1,\tfrac92)$ có độ cao $\tfrac{21}2$ tại $u=0$, còn đồ thị ở độ cao $q(0)=9$.

![Ba khung so sánh đồ thị với dây cung. Hàm lồi: đồ thị không vượt lên trên dây cung, có thể trùng dây cung trên một đoạn. Lồi chặt: đồ thị nằm hẳn dưới dây cung tại mọi điểm trong của dây cung. Hàm lõm: đồ thị không thấp hơn dây cung. Chú thích: lồi chặt mạnh hơn lồi nhưng không tự suy ra nghiệm tối ưu tồn tại.](img/lec-01/convex-concave-strict.svg)

Một cách trực quan, một hàm thích hợp cho tối ưu có đồ thị không vượt lên trên dây cung (khung trái của hình); khung giữa có đồ thị nằm hẳn dưới mọi dây cung nối hai điểm khác nhau; khung phải là trường hợp ngược chiều. Để làm rõ ba hình dạng này, xem định nghĩa sau.

::: definition Định nghĩa 01.21 (Hàm lồi, hàm lồi chặt, hàm lõm)
Cho $C\subseteq\mathbb R^d$ lồi và $f:C\to\mathbb R$.

- $f$ là *hàm lồi* (convex function) nếu
$$
\begin{aligned}
&f(\theta x+(1-\theta)y)\\
&\ \le\theta f(x)\\
&\ \quad+(1-\theta)f(y)
\end{aligned}
\tag{7.1}
$$
với mọi $x,y\in C$ và mọi $\theta\in[0,1]$.
- $f$ là *lồi chặt* (strictly convex; còn gọi là lồi nghiêm ngặt) nếu (7.1) là bất đẳng thức chặt với mọi $x\ne y$ thuộc $C$ và mọi $\theta\in(0,1)$.
- $f$ là *hàm lõm* (concave function) nếu $-f$ lồi.
:::

Giả thiết $C$ lồi bảo đảm vế trái của (7.1) xác định; vế phải là độ cao của dây cung. Trong định nghĩa lồi chặt, hai trường hợp $x=y$ và $\theta\in\{0,1\}$ bị loại vì khi đó hai vế luôn bằng nhau. Mọi hàm lồi chặt là hàm lồi.

::: example Ví dụ 01.12 (Kiểm tra bằng định nghĩa)
**Dữ kiện.** Điều kiện (7.1). Với $\xi_1,\xi_2\in\mathbb R$ và $\theta\in[0,1]$,
$$
\begin{aligned}
&\theta\xi_1^2+(1-\theta)\xi_2^2\\
&\quad-(\theta\xi_1+(1-\theta)\xi_2)^2\\
&\quad=\theta(1-\theta)(\xi_1-\xi_2)^2 .
\end{aligned}
$$

**(a) Hàm $x^2$.** $f(x)=x^2$ lồi chặt trên $\mathbb R$: vế phải trừ vế trái của (7.1) bằng $\theta(1-\theta)(x-y)^2$, dương khi $x\ne y$ và $\theta\in(0,1)$.

**(b) Hàm affine.** $f(x)=g^Tx+\beta$ vừa lồi vừa lõm, và không lồi chặt: hai vế của (7.1) bằng nhau với mọi $x,y,\theta$.

**(c) Chuẩn Euclid.** $f(x)=\lVert x\rVert_2$ lồi trên $\mathbb R^d$ theo bất đẳng thức tam giác: $\lVert\theta x+(1-\theta)y\rVert_2\le\theta\lVert x\rVert_2+(1-\theta)\lVert y\rVert_2$. Với $d=1$, $f(x)=\lvert x\rvert$ không lồi chặt: với $x=1$, $y=2$, $\theta=\tfrac12$, hai vế cùng bằng $\tfrac32$.

**(d) Hàm $x^3-3x$.** $f(x)=x^3-3x$ không lồi trên $\mathbb R$: với $x=-3$, $y=1$, $\theta=\tfrac12$, vế trái là $f(-1)=2$, vế phải là $\tfrac12(-18)+\tfrac12(-2)=-10$, và $2>-10$.

**Kiểm tra lại.** Ở (a) với $x=0$, $y=2$, $\theta=\tfrac12$: vế trái $1$, vế phải $2$, hiệu bằng $1=\tfrac14\cdot4$, khớp với $\theta(1-\theta)(x-y)^2$.
:::

::: remark Nhận xét 01.22 (Hạn chế hàm lồi xuống tập con lồi)
Nếu $f$ lồi (lồi chặt) trên $C$ và $C'\subseteq C$ là tập lồi thì $f$ lồi (lồi chặt) trên $C'$, vì (7.1) đúng cho mọi cặp điểm của $C$ thì đúng cho mọi cặp điểm của $C'$. Nhờ đó, ta chứng nhận tính lồi trên một miền mở như $\mathbb R$ rồi hạn chế xuống miền khả thi đóng, như đoạn của bài toán điều khiển.
:::

### 7.2. Tập mức dưới

Ràng buộc trong Định nghĩa 01.11 có dạng $f_i(x)\le0$, nên muốn chứng nhận miền khả thi lồi, chúng ta cần biết khi nào tập $\{x\mid f_i(x)\le0\}$ lồi. Một cách trực quan, phần miền nằm dưới mặt cắt ngang ở độ cao $\alpha$ chứa đoạn nối hai điểm bất kỳ của nó, vì trên đoạn đó đồ thị nằm dưới một dây cung có hai đầu không cao hơn $\alpha$. Để làm rõ tập này, xem định nghĩa sau.

::: definition Định nghĩa 01.23 (Tập mức dưới)
Cho $C\subseteq\mathbb R^d$, $f:C\to\mathbb R$ và $\alpha\in\mathbb R$. *Tập mức dưới* (sublevel set) của $f$ ở mức $\alpha$ là $S_\alpha(f)=\{x\in C\mid f(x)\le\alpha\}$.
:::

Tập mức dưới là miền khả thi của ràng buộc $f(x)\le\alpha$. Ví dụ: với $f(x)=\lVert x-x_{\mathrm c}\rVert_2$, $S_r(f)$ là quả cầu $B(x_{\mathrm c},r)$ của Mệnh đề 01.18(e); một tập mức dưới có thể rỗng, như $S_{-1}(x^2)$.

::: proposition Mệnh đề 01.24 (Tập mức dưới của hàm lồi) — chứng minh đầy đủ
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi và $f:C\to\mathbb R$ lồi.

**Kết luận.** Với mọi $\alpha\in\mathbb R$, tập mức dưới $S_\alpha(f)$ lồi.
:::

::: proof Chứng minh Mệnh đề 01.24
**Lộ trình.** Áp dụng (7.1) cho hai điểm cùng nằm dưới mức $\alpha$.

**Bước 1 (tổ hợp lồi khả thi).** Lấy $x,y\in S_\alpha(f)$ và $\theta\in[0,1]$. Điểm $\theta x+(1-\theta)y$ thuộc $C$ vì $C$ lồi.

**Bước 2 (giá trị không vượt $\alpha$).** Theo (7.1),
$$
\begin{aligned}
&f(\theta x+(1-\theta)y)\\
&\quad\le\theta f(x)+(1-\theta)f(y)\\
&\quad\le\theta\alpha+(1-\theta)\alpha=\alpha ,
\end{aligned}
$$
trong đó bất đẳng thức thứ hai dùng $f(x),f(y)\le\alpha$ và $\theta,1-\theta\ge0$. $\square$
:::

Chứng minh không cần $f$ khả vi hay liên tục. Chiều ngược sai: $\sqrt{\lvert x\rvert}$ có mọi tập mức dưới là đoạn hoặc tập rỗng nhưng không lồi; bài tập sau chứng minh điều này.

Trong học máy, ràng buộc chuẩn trọng số $\lVert w\rVert_2\le r$ là tập mức dưới của hàm lồi $\lVert w\rVert_2$ (Ví dụ 01.12(c)), nên lồi.

::: exercise Bài tập 01.9 (Tập mức dưới lồi, hàm không lồi)
Cho $f(x)=\sqrt{\lvert x\rvert}$ trên $\mathbb R$. Chứng minh mọi tập mức dưới $S_\alpha(f)$ đều lồi, nhưng $f$ không lồi. Rút ra kết luận về chiều ngược của Mệnh đề 01.24.
:::

::: hint
Với $\alpha\ge0$, giải $\sqrt{\lvert x\rvert}\le\alpha$. Để bác bỏ tính lồi, thử $x=0$, $y=1$, $\theta=\tfrac12$.
:::

::: solution
**Bước 1 (tập mức dưới lồi).** Với $\alpha<0$, $S_\alpha(f)=\varnothing$, lồi. Với $\alpha\ge0$, $\sqrt{\lvert x\rvert}\le\alpha$ tương đương $\lvert x\rvert\le\alpha^2$, nên $S_\alpha(f)=[-\alpha^2,\alpha^2]$, một đoạn, lồi.

**Bước 2 (hàm không lồi).** Với $x=0$, $y=1$, $\theta=\tfrac12$: $f(\tfrac12)=\sqrt{1/2}\approx0{,}707>\tfrac12f(0)+\tfrac12f(1)=0{,}5$, vi phạm (7.1).

**Kết luận.** Tập mức dưới lồi không kéo theo hàm lồi; Mệnh đề 01.24 không đảo được.

**Kiểm tra lại.** Với $\alpha=1$: $S_1(f)=[-1,1]$, và $f(\pm1)=1\le1$, $f(\pm1{,}1)=\sqrt{1{,}1}>1$, khớp với hai đầu mút của đoạn.
:::

### 7.3. Điều kiện bậc nhất

Kiểm tra (7.1) trực tiếp đòi hỏi xét mọi bộ $x,y,\theta$. Với hàm khả vi, có một tiêu chuẩn tương đương qua gradient. Một cách trực quan, với hàm có đồ thị không vượt lên trên dây cung, tiếp tuyến tại mọi điểm nằm dưới đồ thị. Với $q(u)=\tfrac32u^2-6u+9$ của Ví dụ 01.2 tại $u=1$, ta có $q(1)=\tfrac92$ và $q'(1)=-3$, nên tiếp tuyến là $\tilde q(u)=\tfrac92-3(u-1)$, và với mọi $u$,
$$
\begin{aligned}
q(u)-\tilde q(u)&=\tfrac32u^2-3u+\tfrac32\\
&=\tfrac32(u-1)^2\ge0 .
\end{aligned}
$$
Chẳng hạn $\tilde q(-1)=\tfrac{21}2\le q(-1)=\tfrac{33}2$ và $\tilde q(3)=-\tfrac32\le q(3)=\tfrac92$. Định lý sau biến quan sát này thành một tiêu chuẩn tương đương với tính lồi.

::: theorem Định lý 01.25 (Điều kiện bậc nhất, first-order condition) — chứng minh đầy đủ
**Giả thiết.** $C\subseteq\mathbb R^d$ mở và lồi; $f:C\to\mathbb R$ khả vi trên $C$ (Định nghĩa 00.30).

**Kết luận.** $f$ lồi khi và chỉ khi
$$
\begin{aligned}
&f(y)\ge f(x)\\
&\quad+\nabla f(x)^T(y-x)\\
&\forall x,y\in C.
\end{aligned}
\tag{7.2}
$$
Hơn nữa, nếu (7.2) đúng với dấu $>$ cho mọi $x\ne y$ thì $f$ lồi chặt.
:::

::: proof Chứng minh Định lý 01.25
**Lộ trình.** Chiều thuận: viết (7.1) thành một thương sai phân rồi cho $\theta\to0^+$. Chiều đảo: áp dụng (7.2) tại $z=\theta x+(1-\theta)y$ cho hai điểm $x$, $y$ rồi lấy tổ hợp lồi.

**Bước 1 (chiều thuận: thương sai phân).** Giả sử $f$ lồi; lấy $x,y\in C$ và $\theta\in(0,1]$. Theo (7.1) với trọng số $\theta$ đặt lên $y$,
$$
\begin{aligned}
&f(x+\theta(y-x))\\
&\quad\le f(x)+\theta\bigl(f(y)-f(x)\bigr).
\end{aligned}
$$
Trừ $f(x)$ ở hai vế rồi chia cho $\theta>0$:
$$
\begin{aligned}
&\frac{f(x+\theta(y-x))-f(x)}{\theta}\\
&\quad\le f(y)-f(x).
\end{aligned}
$$

**Bước 2 (chiều thuận: qua giới hạn).** Vì $C$ mở và $f$ khả vi tại $x$, theo Định nghĩa 00.30 với $\Delta=\theta(y-x)$, vế trái bằng $\nabla f(x)^T(y-x)+o(\theta\lVert y-x\rVert_2)/\theta$ và dần tới $\nabla f(x)^T(y-x)$ khi $\theta\to0^+$. Giới hạn giữ chiều bất đẳng thức, cho (7.2).

**Bước 3 (chiều đảo).** Giả sử (7.2) đúng. Lấy $x,y\in C$, $\theta\in[0,1]$ và $z=\theta x+(1-\theta)y\in C$. Áp dụng (7.2) tại $z$:
$$
\begin{aligned}
f(x)&\ge f(z)+\nabla f(z)^T(x-z),\\
f(y)&\ge f(z)+\nabla f(z)^T(y-z).
\end{aligned}
$$
Nhân bất đẳng thức thứ nhất với $\theta\ge0$, bất đẳng thức thứ hai với $1-\theta\ge0$ rồi cộng lại:
$$
\begin{aligned}
&\theta f(x)+(1-\theta)f(y)\\
&\quad\ge f(z)+\nabla f(z)^T\\
&\qquad\times\bigl(\theta x+(1-\theta)y-z\bigr)\\
&\quad=f(z),
\end{aligned}
$$
vì $\theta x+(1-\theta)y-z=0$. Đó là (7.1).

**Bước 4 (trường hợp chặt).** Nếu (7.2) chặt với mọi cặp điểm khác nhau, thì với $x\ne y$ và $\theta\in(0,1)$ ta có $z\ne x$, $z\ne y$, nên cả hai bất đẳng thức ở bước 3 chặt, và tổng với hệ số dương cho (7.1) chặt. $\square$
:::

Vế phải của (7.2) là xấp xỉ tuyến tính của $f$ quanh $x$; đồ thị của nó là siêu phẳng tiếp xúc với đồ thị $f$ tại $(x,f(x))$. Vậy đạo hàm tại một điểm cho một thông tin toàn cục: $f$ ở mọi nơi không nhỏ hơn một hàm affine xác định tại $x$. Định lý không áp dụng trực tiếp cho hàm không khả vi như $\lvert x\rvert$; với miền đóng, ta áp dụng cho một miền mở chứa nó rồi hạn chế xuống theo Nhận xét 01.22. Hệ quả sau dùng thông tin toàn cục đó để chứng nhận tối ưu.

::: corollary Hệ quả 01.26 (Điều kiện đủ tối ưu cho hàm lồi khả vi) — chứng minh đầy đủ
**Giả thiết.** $D\subseteq\mathbb R^d$ mở và lồi; $f:D\to\mathbb R$ lồi và khả vi; $C\subseteq D$; $x^*\in C$ thỏa
$$
\begin{aligned}
&\nabla f(x^*)^T(x-x^*)\ge0\\
&\forall x\in C.
\end{aligned}
\tag{7.3}
$$

**Kết luận.** $x^*$ là cực tiểu toàn cục của $f$ trên $C$. Nếu $\nabla f(x^*)=0$ thì $x^*$ là cực tiểu toàn cục của $f$ trên $D$.
:::

::: proof Chứng minh Hệ quả 01.26
**Lộ trình.** Kết hợp (7.2) tại $x^*$ với dấu của số hạng bậc nhất.

**Bước 1 (trên $C$).** Với mọi $x\in C\subseteq D$, Định lý 01.25 áp dụng trên $D$ cho $f(x)\ge f(x^*)+\nabla f(x^*)^T(x-x^*)$. Theo (7.3) hạng cuối không âm, nên $f(x)\ge f(x^*)$.

**Bước 2 (gradient bằng $0$).** Nếu $\nabla f(x^*)=0$ thì (7.3) đúng với mọi $x\in D$, và bước 1 cho $f(x)\ge f(x^*)$ trên $D$. $\square$
:::

Khi $C$ lồi, (7.3) cũng là điều kiện cần; chứng minh nằm ngoài phạm vi học phần (Boyd và Vandenberghe (2004), §4.2.3, tr. 139–140). So với Định lý 00.42, điều kiện cần thành điều kiện đủ và áp dụng được cho nghiệm trên biên. Giả thiết lồi không bỏ được: $f(x)=x^3$ trên $\mathbb R$ có $f'(0)=0$ nhưng $0$ không là cực tiểu, và $x^3$ không lồi: với $x=-2$, $y=0$, $\theta=\tfrac12$, vế trái của (7.1) là $(-1)^3=-1$ còn vế phải là $\tfrac12(-8)+0=-4$.

::: example Ví dụ 01.13 (Điều kiện bậc nhất trên hai bài toán)
**Dữ kiện.** Ví dụ 01.2: $q(u)=\tfrac32u^2-6u+9$ trên $C=[-1,1]$, $u^*=1$, $q'(1)=-3$. Ví dụ 01.5: $J(w)=\lVert Xw-y\rVert_2^2$ với $X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix}$, $y=(1,2,2)^T$, $w^*=(7/6,1/2)^T$ và $X^T(Xw^*-y)=0$.

**(a) Bài toán điều khiển.** Với mọi $u,v\in\mathbb R$, từ khai triển $q(u)=(1+\lambda)u^2-2(t-x_0)u+(t-x_0)^2$,
$$
\begin{aligned}
&q(v)-q(u)-q'(u)(v-u)\\
&\quad=(1+\lambda)(v-u)^2\ge0,
\end{aligned}
$$
nên $q$ lồi trên miền mở $\mathbb R$ theo Định lý 01.25. Tại $u^*=1$, với mọi $u\in C$, $q'(1)(u-1)=-3(u-1)\ge0$ vì $u-1\le0$. Theo Hệ quả 01.26, $u^*=1$ là cực tiểu toàn cục trên $C$; đây là dạng tổng quát của lập luận ở Nhận xét 01.3.

**(b) Bình phương nhỏ nhất.** Với mọi $w,\Delta\in\mathbb R^d$, khai triển ở bước 1 của chứng minh Định lý 00.22, nhân với $2$, cho $J(w+\Delta)=J(w)+\nabla J(w)^T\Delta+\lVert X\Delta\rVert_2^2$. Do đó
$$
\begin{aligned}
&J(v)-J(w)-\nabla J(w)^T(v-w)\\
&\quad=\lVert X(v-w)\rVert_2^2\ge0,
\end{aligned}
$$
và $J$ lồi theo Định lý 01.25. Tại $w^*$, $\nabla J(w^*)=2X^T(Xw^*-y)=0$, nên theo Hệ quả 01.26, $w^*$ là cực tiểu toàn cục trên $\mathbb R^2$.

**Kiểm tra lại.** Ở (a) với $\lambda=\tfrac12$, $(1+\lambda)(u-1)^2=\tfrac32(u-1)^2$, khớp với $q-\tilde q$ ở đầu mục; tại $u=-1$, $q'(1)(-1-1)=6\ge0$ và $q(-1)=\tfrac{33}2\ge\tfrac92$. Ở (b), $J(0)=9\ge J(w^*)=\tfrac16$.
:::

Trong học máy, nếu mất mát huấn luyện lồi theo tham số, như $J$, thì mọi điểm có gradient bằng $0$ là nghiệm toàn cục.

### 7.4. Điều kiện bậc hai

Khi $f$ khả vi hai lần, ta thay bất đẳng thức (7.2) cho mọi cặp điểm bằng một kiểm tra tại từng điểm trên Hessian. Về mặt ý tưởng, $\nabla^2f(x)\succeq0$ nghĩa là độ cong $v^T\nabla^2f(x)v$ của $f$ theo mọi hướng $v$ tại $x$ không âm, nên mọi hàm hạn chế $\varphi(\tau)=f(x+\tau v)$ của $f$ lên một đường thẳng có $\varphi''\ge0$. Với $q$ của Ví dụ 01.2, chỉ có một hướng và $q''(u)=3>0$ tại mọi $u$. Chứng minh đi qua hai bổ đề: bổ đề thứ nhất đưa tính lồi nhiều biến về tính lồi trên các đường thẳng, bổ đề thứ hai xử lý hàm một biến bằng đạo hàm bậc hai.

::: lemma Bổ đề 01.27 (Hạn chế lên đường thẳng) — chứng minh đầy đủ
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi, $f:C\to\mathbb R$. Với $x\in C$ và $v\in\mathbb R^d$, đặt $\mathcal T_{x,v}=\{\tau\in\mathbb R\mid x+\tau v\in C\}$ và $\varphi_{x,v}(\tau)=f(x+\tau v)$ trên $\mathcal T_{x,v}$.

**Kết luận.** $\mathcal T_{x,v}$ là một khoảng, và $f$ lồi (lồi chặt) trên $C$ khi và chỉ khi với mọi $x\in C$ và mọi $v\ne0$, hàm một biến $\varphi_{x,v}$ lồi (lồi chặt) trên $\mathcal T_{x,v}$.
:::

::: proof Chứng minh Bổ đề 01.27
**Lộ trình.** Tổ hợp lồi của hai tham số $\tau_1,\tau_2$ ứng với tổ hợp lồi của hai điểm $x+\tau_1v$, $x+\tau_2v$, nên (7.1) cho $f$ và cho $\varphi_{x,v}$ là cùng một bất đẳng thức.

**Bước 1 (miền của $\varphi_{x,v}$).** $\mathcal T_{x,v}$ là nghịch ảnh của tập lồi $C$ qua ánh xạ affine $\tau\mapsto x+\tau v$, nên lồi theo Mệnh đề 01.19(c); tập con lồi của $\mathbb R$ là một khoảng.

**Bước 2 (chiều thuận).** Với $\tau_1,\tau_2\in\mathcal T_{x,v}$ và $\theta\in[0,1]$,
$$
\begin{aligned}
&x+(\theta\tau_1+(1-\theta)\tau_2)v\\
&\quad=\theta(x+\tau_1v)\\
&\qquad+(1-\theta)(x+\tau_2v),
\end{aligned}
$$
nên (7.1) cho $f$ tại hai điểm $x+\tau_1v$, $x+\tau_2v$ là (7.1) cho $\varphi_{x,v}$ tại $\tau_1,\tau_2$. Nếu $f$ lồi chặt và $\tau_1\ne\tau_2$, hai điểm khác nhau vì $v\ne0$, nên bất đẳng thức chặt được giữ.

**Bước 3 (chiều đảo).** Với $y,y'\in C$ khác nhau, chọn $x=y'$ và $v=y-y'\ne0$. Khi đó $0,1\in\mathcal T_{x,v}$, $\varphi_{x,v}(0)=f(y')$, $\varphi_{x,v}(1)=f(y)$ và $\varphi_{x,v}(\theta)=f(\theta y+(1-\theta)y')$. Tính lồi (lồi chặt) của $\varphi_{x,v}$ tại $0$ và $1$ cho đúng (7.1) (chặt) cho $f$ tại $y,y'$. Khi $y=y'$, hai vế của (7.1) bằng nhau. $\square$
:::

::: lemma Bổ đề 01.28 (Tiêu chuẩn bậc hai một biến) — chứng minh đầy đủ
**Giả thiết.** $\mathcal T\subseteq\mathbb R$ là khoảng mở, $\varphi:\mathcal T\to\mathbb R$ khả vi hai lần.

**Kết luận.**

- (a) $\varphi$ lồi khi và chỉ khi $\varphi''(\tau)\ge0$ với mọi $\tau\in\mathcal T$.
- (b) Nếu $\varphi''(\tau)>0$ với mọi $\tau\in\mathcal T$ thì $\varphi$ lồi chặt.
:::

::: proof Chứng minh Bổ đề 01.28
**Lộ trình.** Theo Định lý 01.25 với $d=1$, tính lồi tương đương với tiếp tuyến nằm dưới đồ thị. Tiếp tuyến nằm dưới đồ thị khi và chỉ khi $\varphi'$ không giảm, và $\varphi'$ không giảm khi và chỉ khi $\varphi''\ge0$.

**Bước 1 (phần (a), chiều thuận: $\varphi'$ không giảm).** Theo Định lý 01.25 với $d=1$, với $\tau,\tau'\in\mathcal T$,
$$
\begin{aligned}
\varphi(\tau')&\ge\varphi(\tau)+\varphi'(\tau)(\tau'-\tau),\\
\varphi(\tau)&\ge\varphi(\tau')+\varphi'(\tau')(\tau-\tau').
\end{aligned}
$$
Cộng hai bất đẳng thức: $(\varphi'(\tau')-\varphi'(\tau))(\tau'-\tau)\ge0$, nên $\varphi'$ không giảm.

**Bước 2 (phần (a), chiều thuận: $\varphi''\ge0$).** Đạo hàm của một hàm không giảm không âm:
$$
\varphi''(\tau)=\lim_{\tau'\to\tau}\frac{\varphi'(\tau')-\varphi'(\tau)}{\tau'-\tau}\ge0 .
$$

**Bước 3 (phần (a), chiều đảo).** Nếu $\varphi''\ge0$ thì $\varphi'$ không giảm. Với $\tau'\ne\tau$ thuộc $\mathcal T$, định lý giá trị trung bình cho $\tilde\tau$ nằm giữa $\tau$ và $\tau'$ với $\varphi(\tau')-\varphi(\tau)=\varphi'(\tilde\tau)(\tau'-\tau)$. Có hai trường hợp:

- nếu $\tau'>\tau$ thì $\tilde\tau>\tau$, $\varphi'(\tilde\tau)\ge\varphi'(\tau)$, và nhân với $\tau'-\tau>0$ được $\varphi'(\tilde\tau)(\tau'-\tau)\ge\varphi'(\tau)(\tau'-\tau)$;
- nếu $\tau'<\tau$ thì $\tilde\tau<\tau$, $\varphi'(\tilde\tau)\le\varphi'(\tau)$, và nhân với $\tau'-\tau<0$ đổi chiều, cho cùng bất đẳng thức.

Vậy $\varphi(\tau')\ge\varphi(\tau)+\varphi'(\tau)(\tau'-\tau)$, và Định lý 01.25 cho $\varphi$ lồi.

**Bước 4 (phần (b)).** Nếu $\varphi''>0$ thì $\varphi'$ tăng chặt, nên các bất đẳng thức $\varphi'(\tilde\tau)\ge\varphi'(\tau)$ và $\varphi'(\tilde\tau)\le\varphi'(\tau)$ ở bước 3 trở thành chặt. Do đó $\varphi(\tau')>\varphi(\tau)+\varphi'(\tau)(\tau'-\tau)$ với $\tau'\ne\tau$, và phần cuối của Định lý 01.25 cho $\varphi$ lồi chặt. $\square$
:::

Chiều ngược của (b) sai: $\varphi(\tau)=\tau^4$ lồi chặt nhưng $\varphi''(0)=0$. Ghép hai bổ đề, ta được điều kiện bậc hai cho hàm nhiều biến.

::: theorem Định lý 01.29 (Điều kiện bậc hai, second-order condition) — chứng minh đầy đủ
**Giả thiết.** $C\subseteq\mathbb R^d$ mở và lồi; $f$ có các đạo hàm riêng bậc hai liên tục trên $C$ (lớp $C^2$).

**Kết luận.**

- (a) $f$ lồi khi và chỉ khi $\nabla^2f(x)\succeq0$ với mọi $x\in C$.
- (b) Nếu $\nabla^2f(x)\succ0$ với mọi $x\in C$ thì $f$ lồi chặt.
:::

::: proof Chứng minh Định lý 01.29
**Lộ trình.** Tính $\varphi_{x,v}''$ bằng Mệnh đề 00.38, rồi áp dụng Bổ đề 01.28 cho hàm một biến và Bổ đề 01.27 để quay về $f$.

**Bước 1 (đạo hàm bậc hai của hàm hạn chế).** Với $x\in C$ và $v\ne0$, $\mathcal T_{x,v}$ là một khoảng mở chứa $0$, vì $C$ mở. Theo Mệnh đề 00.38,
$$
\varphi_{x,v}''(\tau)=v^T\nabla^2f(x+\tau v)\,v .
$$

**Bước 2 (phần (a), chiều đảo).** Nếu $\nabla^2f\succeq0$ trên $C$ thì $\varphi_{x,v}''\ge0$ trên $\mathcal T_{x,v}$ với mọi $x,v$. Do đó mọi $\varphi_{x,v}$ lồi theo Bổ đề 01.28(a), và $f$ lồi theo Bổ đề 01.27.

**Bước 3 (phần (a), chiều thuận).** Nếu $f$ lồi thì mọi $\varphi_{x,v}$ lồi theo Bổ đề 01.27, nên $\varphi_{x,v}''(0)=v^T\nabla^2f(x)v\ge0$ theo Bổ đề 01.28(a). Với $v=0$, $v^T\nabla^2f(x)v=0$. Vậy $\nabla^2f(x)\succeq0$.

**Bước 4 (phần (b)).** Nếu $\nabla^2f\succ0$ thì $\varphi_{x,v}''>0$ với mọi $v\ne0$, nên mọi $\varphi_{x,v}$ lồi chặt theo Bổ đề 01.28(b), và $f$ lồi chặt theo Bổ đề 01.27. $\square$
:::

Trong học máy, với bình phương nhỏ nhất, Hessian $2X^TX$ không phụ thuộc tham số, nên Định lý 01.29 chứng nhận tính lồi bằng một phép kiểm tra trên dữ liệu.

![Hai khung. Trái: đồ thị hàm lồi một biến nằm trên tiếp tuyến tại x, tức f(y) không nhỏ hơn f(x) cộng gradient tại x nhân (y − x). Phải: các đường mức elip của một hàm hai biến và một đường thẳng theo hướng d; hàm hạn chế phi(t) trên đường đó có đạo hàm bậc hai không âm, tức d chuyển vị H(x) d không âm với mọi d, nghĩa là H(x) nửa xác định dương.](img/lec-01/first-second-order-convexity.svg)

Khung trái của hình ứng với (7.2), khung phải ứng với chứng minh Định lý 01.29; trên hình, vector hướng $d$ đóng vai trò của $v$, biến $t$ đóng vai trò của $\tau$, $H(x)$ là Hessian, và PSD (positive semidefinite) nghĩa là nửa xác định dương.

::: example Ví dụ 01.14 (Điều kiện bậc hai trên các hàm của bài)
**Dữ kiện.** Các hàm: $q(u)=(x_0+u-t)^2+\lambda u^2$ với $\lambda\ge0$, bằng $\tfrac32u^2-6u+9$ với bộ số của Ví dụ 01.2; $f(x)=\tfrac12x^TQx+g^Tx$ với $Q$ đối xứng; $J(w)=\lVert Xw-y\rVert_2^2$ với $X\in\mathbb R^{n\times d}$; $\ell(m)=\log(1+e^{-m})$; $x^4$.

**(a) Bài toán điều khiển.** $q''(u)=2(1+\lambda)\ge2>0$, nên $q$ lồi chặt trên $\mathbb R$ theo Định lý 01.29(b), và lồi chặt trên đoạn $C$ theo Nhận xét 01.22.

**(b) Dạng toàn phương.** $\nabla^2f(x)=Q$, nên $f$ lồi khi và chỉ khi $Q\succeq0$, và lồi chặt khi $Q\succ0$. Với $Q=\begin{bmatrix}3&1\\1&2\end{bmatrix}$ và $v\ne0$,
$$
\begin{aligned}
v^TQv&=3v_1^2+2v_1v_2+2v_2^2\\
&=(v_1+v_2)^2+2v_1^2+v_2^2\\
&>0,
\end{aligned}
$$
nên $Q\succ0$.

**(c) Bình phương nhỏ nhất.** $\nabla^2J=2X^TX$ (§4.2), và $v^T(2X^TX)v=2\lVert Xv\rVert_2^2\ge0$, nên $J$ lồi. Khi $\operatorname{rank}(X)=d$, $Xv\ne0$ với mọi $v\ne0$, nên $J$ lồi chặt.

**(d) Hàm mũ và mất mát logistic.** $(e^x)''=e^x>0$ và $\ell''(m)>0$ theo Mệnh đề 01.8(c), nên $e^x$ và $\ell$ lồi chặt trên $\mathbb R$.

**(e) Hàm $x^4$.** $f(x)=x^4$ có $f''(x)=12x^2\ge0$, nên lồi. Nó lồi chặt dù $f''(0)=0$: $f'(x)=4x^3$ tăng chặt trên $\mathbb R$, và chứng minh Bổ đề 01.28(b) chỉ dùng tính tăng chặt của $\varphi'$.

**Kiểm tra lại.** Ở (b), hai giá trị riêng của $Q$ là $\tfrac{5\pm\sqrt5}2\approx1{,}382$ và $3{,}618$, cả hai dương. Ở (a) với $\lambda=\tfrac12$, $q''=3$, gấp đôi hệ số $\tfrac32$ của $u^2$.
:::

::: exercise Bài tập 01.10 (Điều kiện bậc nhất và điều kiện (7.3))
(a) Dùng (7.2) chứng minh $f(x)=e^x$ lồi chặt trên $\mathbb R$.

(b) Cho $f(x)=(x_1-2)^2+(x_2+1)^2$ trên hộp $C=[0,1]^2$. Dùng (7.3) chứng minh $x^*=(1,0)$ là nghiệm, tính giá trị tối ưu, và chứng minh nghiệm duy nhất.
:::

::: hint
(a) Đặt $\Delta=y-x$; sau khi chia cho $e^x>0$, (7.2) trở thành $e^\Delta\ge1+\Delta$. Khảo sát hàm $\Delta\mapsto e^\Delta-1-\Delta$. (b) Tính $\nabla f(x^*)$ rồi xét dấu của từng thành phần của $x-x^*$ trên hộp.
:::

::: solution
**(a) Bước 1 (quy về một bất đẳng thức).** $f'(x)=e^x$, nên (7.2) là $e^y\ge e^x+e^x(y-x)$. Chia cho $e^x>0$ và đặt $\Delta=y-x$, ta cần $e^\Delta\ge1+\Delta$.

**(a) Bước 2 (khảo sát).** Hàm $\Delta\mapsto e^\Delta-1-\Delta$ có đạo hàm $e^\Delta-1$, âm khi $\Delta<0$ và dương khi $\Delta>0$. Do đó hàm giảm chặt trên $(-\infty,0]$, tăng chặt trên $[0,\infty)$, và dương khi $\Delta\ne0$. Vậy (7.2) đúng với dấu $>$ khi $x\ne y$, và phần cuối của Định lý 01.25 cho $e^x$ lồi chặt.

**(b) Bước 1 (tính lồi).** $f$ xác định trên miền mở $\mathbb R^2$ chứa $C$, có $\nabla^2f=2I_2\succ0$, nên lồi theo Định lý 01.29.

**(b) Bước 2 (kiểm tra (7.3)).** $\nabla f(x)=(2(x_1-2),\ 2(x_2+1))$, nên $\nabla f(1,0)=(-2,2)$. Với $x\in C$,
$$
\begin{aligned}
&\nabla f(x^*)^T(x-x^*)\\
&\quad=2(1-x_1)+2x_2\ge0,
\end{aligned}
$$
vì $x_1\le1$ và $x_2\ge0$. Theo Hệ quả 01.26, $x^*$ là cực tiểu toàn cục trên $C$, với $f(x^*)=1+1=2$.

**(b) Bước 3 (duy nhất).** Trên $C$, $2-x_1\ge1$ và $x_2+1\ge1$, nên $f(x)\ge2$, với dấu bằng khi và chỉ khi $x_1=1$ và $x_2=0$.

**Kiểm tra lại.** Ở (a) với $\Delta=1$: $e\approx2{,}718>2$. Ở (b), $f(0,0)=4+1=5$ và $f(1,1)=1+4=5$, đều lớn hơn $2$.
:::

### 7.5. Các phép toán bảo toàn tính lồi

Định lý 01.29 cần lớp $C^2$, còn mất mát bản lề $\max(0,1-m)$ không khả vi tại $m=1$; hàm $L$ là tổng của $n$ hạng $\ell(y_ia_i^Tw)$. Chúng ta xây dựng hàm lồi từ các khối đã biết. Về mặt ý tưởng, dây cung của tổng hai hàm là tổng hai dây cung, nên nếu đồ thị của mỗi hàm không vượt lên trên dây cung của nó thì đồ thị của tổng cũng vậy; một phép đổi biến affine biến đoạn thẳng thành đoạn thẳng, nên giữ nguyên quan hệ giữa đồ thị và dây cung. Định lý sau phát biểu chính xác các quan sát này.

::: theorem Định lý 01.30 (Các phép toán bảo toàn tính lồi của hàm) — chứng minh đầy đủ
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi; $f_1,\ldots,f_N:C\to\mathbb R$ lồi; $\gamma_1,\ldots,\gamma_N\ge0$; $\psi:\mathbb R^{d'}\to\mathbb R$ lồi; $A\in\mathbb R^{d'\times d}$, $c\in\mathbb R^{d'}$.

**Kết luận.**

- (a) Tổng không âm $\sum_j\gamma_jf_j$ lồi trên $C$. Nếu thêm một $f_j$ lồi chặt với $\gamma_j>0$ thì tổng lồi chặt.
- (b) Hợp với ánh xạ affine $x\mapsto\psi(Ax+c)$ lồi trên $\mathbb R^d$.
- (c) Cực đại từng điểm (pointwise maximum) $x\mapsto\max_jf_j(x)$ lồi trên $C$.
:::

::: proof Chứng minh Định lý 01.30
**Lộ trình.** Với mỗi phép toán, viết (7.1) của hàm mới từ (7.1) của các hàm thành phần. Gọi $z=\theta x+(1-\theta)y$ với $\theta\in[0,1]$.

**Bước 1 (phần (a)).** Nhân (7.1) của từng $f_j$ với $\gamma_j\ge0$ rồi cộng lại:
$$
\begin{aligned}
&\textstyle\sum_j\gamma_jf_j(z)\\
&\quad\le\theta\textstyle\sum_j\gamma_jf_j(x)\\
&\qquad+(1-\theta)\textstyle\sum_j\gamma_jf_j(y).
\end{aligned}
$$
Nếu $f_{j_0}$ lồi chặt và $\gamma_{j_0}>0$, thì với $x\ne y$ và $\theta\in(0,1)$ bất đẳng thức của hạng $j_0$ chặt và được nhân với số dương, nên tổng chặt.

**Bước 2 (phần (b)).** Đặt $h(x)=\psi(Ax+c)$. Vì $Az+c=\theta(Ax+c)+(1-\theta)(Ay+c)$, (7.1) của $\psi$ tại hai điểm $Ax+c$ và $Ay+c$ cho $h(z)\le\theta h(x)+(1-\theta)h(y)$.

**Bước 3 (phần (c)).** Với mỗi $j$,
$$
\begin{aligned}
f_j(z)&\le\theta f_j(x)+(1-\theta)f_j(y)\\
&\le\theta\max_if_i(x)\\
&\quad+(1-\theta)\max_if_i(y).
\end{aligned}
$$
Lấy cực đại theo $j$ ở vế trái. $\square$
:::

Định lý 01.30 không cần khả vi, nên chứng nhận được cả hàm có điểm gãy như cực đại của các hàm affine.

Trong học máy, hàm mất mát thực nghiệm có dạng $\frac1n\sum_i\operatorname{loss}\bigl(\hat y(a_i;w),y_i\bigr)$, với hàm dự đoán $\hat y(a;w)$ và mất mát $\operatorname{loss}(\cdot,y)$ của một mẫu; với hồi quy logistic, $\operatorname{loss}(\hat y,y)=\ell(y\hat y)$. Khi $\hat y(a_i;w)=a_i^Tw$, mỗi hạng là hợp của một mất mát lồi với ánh xạ tuyến tính, nên Định lý 01.30(a), (b) cho mất mát lồi với mọi dữ liệu. Khi $\hat y$ phi tuyến theo tham số, như ở *mạng nơ-ron* (neural network), phép hợp ở (b) không còn affine.

::: example Ví dụ 01.15 (Chứng nhận tính lồi của các hàm mất mát)
**Dữ kiện.** $J(w)=\sum_i(a_i^Tw-y_i)^2$; $L(w)=\sum_i\ell(y_ia_i^Tw)$ với $\ell''(m)=e^m/(1+e^m)^2>0$ (Mệnh đề 01.8(c)); $\ell_{\mathrm{hinge}}(m)=\max(0,1-m)$; $\mu>0$.

**(a) Bình phương nhỏ nhất.** $\xi\mapsto\xi^2$ lồi (Ví dụ 01.12(a)) và $w\mapsto a_i^Tw-y_i$ affine, nên mỗi $(a_i^Tw-y_i)^2$ lồi theo Định lý 01.30(b), và $J$ lồi theo Định lý 01.30(a). Kết luận trùng với Ví dụ 01.14(c).

**(b) Hồi quy logistic.** $\ell$ lồi (Ví dụ 01.14(d)) và $w\mapsto y_ia_i^Tw$ tuyến tính, nên mỗi $\ell(y_ia_i^Tw)$ lồi theo Định lý 01.30(b), và $L$ lồi theo Định lý 01.30(a). Vì $y_i^2=1$, Hessian là
$$
\nabla^2L(w)=\sum_i\ell''(m_i)\,a_ia_i^T,
$$
một tổng với hệ số dương của các ma trận nửa xác định dương $a_ia_i^T$ ($v^Ta_ia_i^Tv=(a_i^Tv)^2\ge0$).

**(c) Mất mát bản lề.** *Mất mát bản lề* (hinge loss) $\ell_{\mathrm{hinge}}$ của máy vector hỗ trợ là cực đại của hai hàm affine $0$ và $1-m$, nên lồi theo Định lý 01.30(c), dù không khả vi tại $m=1$. Định lý 01.29 không áp dụng được cho nó.

**(d) Chính quy hóa.** $L(w)+\tfrac\mu2\lVert w\rVert_2^2$ lồi chặt theo Định lý 01.30(a), vì $L$ lồi và $\tfrac\mu2\lVert w\rVert_2^2$ lồi chặt (Hessian $\mu I_d\succ0$, Định lý 01.29(b)).

**Kiểm tra lại.** Với hai mẫu của Ví dụ 01.7 ($a_1=1$, $y_1=+1$, $a_2=-1$, $y_2=-1$, $m_1=m_2=w$): công thức ở (b) cho $L''(w)=2e^w/(1+e^w)^2$, trùng với đạo hàm của $L'(w)=-2/(1+e^w)$; vì $L''>0$, $L$ lồi chặt trên $\mathbb R$ theo Bổ đề 01.28(b).
:::

::: remark Nhận xét 01.31 (Khi bỏ giả thiết: các phép toán không bảo toàn tính lồi)
Bốn phép toán sau nằm ngoài Định lý 01.30 và nói chung phá tính lồi:

- **hệ số âm:** $-x^2$ không lồi;
- **tích:** $x$ và $x^2$ lồi trên $\mathbb R$ nhưng tích $x^3$ không lồi (phép kiểm sau Hệ quả 01.26);
- **hợp không affine:** $\psi(\xi)=(\xi-1)^2$ và $\xi=x^2$ đều lồi nhưng $(x^2-1)^2$ có hai cực tiểu $x=\pm1$ và một cực đại địa phương tại $0$; với $x=-1$, $y=1$, $\theta=\tfrac12$, giá trị tại trung điểm là $1>0=\tfrac12\cdot0+\tfrac12\cdot0$;
- **tính lồi chặt qua hợp affine:** $\ell(w_1+w_2)$ là hợp của hàm lồi chặt $\ell$ với ánh xạ $w\mapsto w_1+w_2$, nhưng không đổi dọc mỗi đường thẳng $w_1+w_2=\text{hằng số}$, nên không lồi chặt trên $\mathbb R^2$.
:::

::: exercise Bài tập 01.11 (Tiêu chuẩn Hessian)
Dùng Định lý 01.29 xác định tính lồi của các hàm sau trên $\mathbb R^2$:

(a) $f(x)=x_1^2+x_1x_2+x_2^2$;

(b) $g(x)=x_1^2-x_2^2$;

(c) $h(x)=e^{x_1+2x_2}$.
:::

::: hint
Tính Hessian rồi xét dấu các giá trị riêng (Mệnh đề 00.18); với ma trận $2\times2$ đối xứng, $\lambda_1\lambda_2=\det$ và $\lambda_1+\lambda_2=\operatorname{tr}$ (hệ thức sau Định lý 00.16). Ở (c), có thể dùng Định lý 01.30(b) thay cho Hessian.
:::

::: solution
**(a)** $\nabla^2f=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ có $\lambda_1\lambda_2=\det=3$ và $\lambda_1+\lambda_2=\operatorname{tr}=4$, nên hai giá trị riêng là $1$ và $3$, đều dương, và ma trận xác định dương theo Mệnh đề 00.18; $f$ lồi chặt theo Định lý 01.29(b).

**(b)** $\nabla^2g=\operatorname{diag}(2,-2)$. Với $v=(0,1)$, $v^T\nabla^2g\,v=-2<0$, nên $g$ không lồi theo Định lý 01.29(a). Trực tiếp: $x=(0,-1)$, $y=(0,1)$, $\theta=\tfrac12$ cho $g(0)=0>\tfrac12(-1)+\tfrac12(-1)=-1$.

**(c)** $h$ là hợp của hàm lồi $e^\xi$ với ánh xạ tuyến tính $x\mapsto x_1+2x_2$, nên lồi theo Định lý 01.30(b). Hessian $e^{x_1+2x_2}\begin{bmatrix}1&2\\2&4\end{bmatrix}$ có định thức $0$, nên chỉ nửa xác định dương; $h$ không lồi chặt vì $h$ không đổi dọc mỗi đường thẳng $x_1+2x_2=\text{hằng số}$.

**Kiểm tra lại.** Ở (a), $v^T\nabla^2f\,v=2v_1^2+2v_1v_2+2v_2^2=(v_1+v_2)^2+v_1^2+v_2^2>0$ khi $v\ne0$. Ở (c), $h(2,0)=h(0,1)=e^2$, và trung điểm $(1,\tfrac12)$ cũng cho $e^2$: dấu bằng trong (7.1), đúng với kết luận không lồi chặt.
:::

Bộ tiêu chuẩn của §7 chứng nhận được hàm mục tiêu lồi, và Hệ quả 01.26 cho một kết luận toàn cục khi hàm khả vi. Còn ba câu hỏi chưa được trả lời, bao gồm:

- cực tiểu địa phương của một hàm lồi không khả vi có là cực tiểu toàn cục không;
- tính lồi chặt liên hệ thế nào với số nghiệm;
- hàm lồi chặt $L$ của Ví dụ 01.7 không có nghiệm, nên tính lồi không bảo đảm sự tồn tại; điều kiện nào bảo đảm sự tồn tại.

## 8. Tính toàn cục, sự tồn tại và tính duy nhất của nghiệm

Ba hàm một biến sau cho thấy ba câu hỏi về nghiệm độc lập với nhau, bao gồm:

- $e^x$ trên $\mathbb R$ lồi chặt nhưng không có cực tiểu: giá trị giảm về $0$ khi $x\to-\infty$ mà không đạt;
- hàm hằng $0$ trên $[-1,1]$ lồi và có cực tiểu, nhưng mọi điểm đều là cực tiểu;
- $x^2$ trên $\mathbb R$ có đúng một cực tiểu tại $0$.

Ba hàm đều lồi, nên riêng tính lồi không phân biệt được ba trường hợp.

![Ba đồ thị. Trái: hàm e mũ x trên toàn trục số, cận dưới đúng bằng 0 nhưng không có nghiệm. Giữa: hàm hằng 0 trên đoạn từ −1 đến 1, mọi điểm của đoạn đều tối ưu. Phải: hàm x bình phương trên toàn trục số, nghiệm duy nhất x sao bằng 0.](img/lec-01/existence-and-uniqueness.svg)

Đồ thị trái giống $L$ của Ví dụ 01.7, đồ thị giữa giống $J$ của Ví dụ 01.6 dọc theo $\operatorname{Ker}(X')$.

### 8.1. Tính toàn cục

Câu hỏi 4 của Nhận xét 01.16 hỏi khi nào một cực tiểu địa phương là cực tiểu toàn cục; Ví dụ 01.9 cho thấy điều này có thể sai khi hàm không lồi.

::: theorem Định lý 01.32 (Cực tiểu địa phương của hàm lồi là cực tiểu toàn cục) — chứng minh đầy đủ
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi; $f:C\to\mathbb R$ lồi; $x^*\in C$ là cực tiểu địa phương của $f$ tương đối với $C$.

**Kết luận.** $x^*$ là cực tiểu toàn cục của $f$ trên $C$.
:::

::: proof Chứng minh Định lý 01.32
**Lộ trình.** Phản chứng: nếu có một điểm tốt hơn $x^*$, các tổ hợp lồi giữa $x^*$ và điểm đó vừa khả thi, vừa tốt hơn $x^*$, vừa nằm gần $x^*$ tùy ý.

**Bước 1 (giả thiết phản chứng).** Giả sử có $y\in C$ với $f(y)<f(x^*)$. Gọi $r>0$ là bán kính trong Định nghĩa 01.12, và với $\theta\in(0,1]$ đặt $z_\theta=(1-\theta)x^*+\theta y$.

**Bước 2 (tổ hợp lồi khả thi và tốt hơn).** Vì $C$ lồi, $z_\theta\in C$. Vì $f$ lồi, theo (7.1),
$$
\begin{aligned}
f(z_\theta)&\le(1-\theta)f(x^*)+\theta f(y)\\
&<(1-\theta)f(x^*)+\theta f(x^*)\\
&=f(x^*),
\end{aligned}
$$
trong đó bất đẳng thức chặt dùng $f(y)<f(x^*)$ và $\theta>0$.

**Bước 3 (tổ hợp lồi nằm trong lân cận).** $\lVert z_\theta-x^*\rVert_2=\theta\lVert y-x^*\rVert_2\le r$ khi $\theta\le r/\lVert y-x^*\rVert_2$. Với $\theta$ như vậy và $\theta\le1$, $z_\theta$ là một điểm khả thi trong lân cận bán kính $r$ của $x^*$ có giá trị nhỏ hơn $f(x^*)$, mâu thuẫn với tính cực tiểu địa phương. $\square$
:::

Mỗi giả thiết lồi dùng ở đúng một bước: miền lồi bảo đảm $z_\theta$ khả thi, hàm lồi bảo đảm $f(z_\theta)<f(x^*)$. Bỏ miền lồi, tập vùng chết với $f(u)=(u-1)^2$ có cực tiểu địa phương $u=-\tfrac12$ với giá trị $\tfrac94$, trong khi $u=1$ cho $0$. Bỏ hàm lồi, Ví dụ 01.9 có cực tiểu địa phương $x=1$ không toàn cục. So với Hệ quả 01.26, định lý không cần khả vi.

Bài toán (5.1) với $C$ lồi và $f_0$ lồi trên $C$ được gọi là *bài toán lồi* (convex problem). *Bài toán tối ưu lồi* (convex optimization problem) của Boyd và Vandenberghe (2004), §4.2.1, với $D$ lồi, $f_0,f_i$ lồi và $h_j$ affine, là một trường hợp riêng: $C$ khi đó là giao của các tập mức dưới và tập affine, nên lồi. Áp dụng Mệnh đề 01.24 ở đúng mức $p^*$, ta có hệ quả sau.

::: corollary Hệ quả 01.33 (Tập nghiệm của bài toán lồi là tập lồi) — chứng minh đầy đủ
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi, $f:C\to\mathbb R$ lồi.

**Kết luận.** Tập nghiệm $S^*=\{x\in C\mid f(x)=p^*\}$ lồi (có thể rỗng).
:::

::: proof Chứng minh Hệ quả 01.33
**Lộ trình.** Khi $p^*$ hữu hạn, $S^*$ là một tập mức dưới; khi $p^*=\pm\infty$, $S^*$ rỗng.

**Bước 1 (ba trường hợp của $p^*$).** Nếu $p^*=+\infty$ thì $C$ rỗng nên $S^*$ rỗng. Nếu $p^*=-\infty$ thì không điểm nào có giá trị bằng $p^*$, nên $S^*$ rỗng. Tập rỗng lồi.

**Bước 2 ($p^*$ hữu hạn).** Không điểm nào có giá trị nhỏ hơn $p^*$, nên $S^*=\{x\in C\mid f(x)\le p^*\}=S_{p^*}(f)$, lồi theo Mệnh đề 01.24. $\square$
:::

Một bài toán lồi không có đúng hai nghiệm tách rời: nếu có hai nghiệm thì cả đoạn nối chúng là nghiệm. Tập nghiệm của Ví dụ 01.6 là một đường thẳng, đúng với hệ quả. Giả thiết miền lồi cần thiết: hàm $u^2$ trên tập vùng chết có tập nghiệm $\{-\tfrac12,\tfrac12\}$, không lồi.

Trong học máy, với mất mát lồi theo tham số, như bình phương nhỏ nhất, hồi quy logistic hay máy vector hỗ trợ, mọi cực tiểu địa phương cho cùng giá trị mất mát nhỏ nhất, và các nghiệm khác nhau tạo thành một tập lồi.

### 8.2. Tính duy nhất

Câu hỏi 6 hỏi khi nào có nhiều nhất một nghiệm. Đồ thị giữa của hình đầu mục cho thấy tính lồi không đủ, vì hàm lồi có thể phẳng trên cả một đoạn. Lồi chặt loại trừ đoạn phẳng.

::: theorem Định lý 01.34 (Lồi chặt cho nhiều nhất một nghiệm) — chứng minh đầy đủ
**Giả thiết.** $C\subseteq\mathbb R^d$ lồi; $f:C\to\mathbb R$ lồi chặt.

**Kết luận.** $f$ có nhiều nhất một điểm cực tiểu toàn cục trên $C$.
:::

::: proof Chứng minh Định lý 01.34
**Lộ trình.** Phản chứng: trung điểm của hai nghiệm khác nhau cho giá trị nhỏ hơn giá trị tối ưu.

**Bước 1 (giả thiết phản chứng).** Giả sử có hai nghiệm $x\ne y$ trong $C$, cùng giá trị $p^*$.

**Bước 2 (trung điểm tốt hơn).** Trung điểm $z=\tfrac12x+\tfrac12y$ thuộc $C$ vì $C$ lồi. Theo định nghĩa lồi chặt với $\theta=\tfrac12$,
$$
f(z)<\tfrac12f(x)+\tfrac12f(y)=p^*,
$$
mâu thuẫn với việc $p^*$ là giá trị nhỏ nhất của $f$ trên $C$. $\square$
:::

"Nhiều nhất một" bao gồm cả trường hợp không có nghiệm: $e^x$ lồi chặt và không có nghiệm. Lồi không chặt không đủ: $J$ của Ví dụ 01.6 lồi và có vô số nghiệm. Với $J$ khi $\operatorname{rank}(X)=d$ (Ví dụ 01.14(c)), Định lý 01.34 cho lại phần "nếu" của Hệ quả 01.5(c) bằng một lập luận khác.

### 8.3. Sự tồn tại

Câu hỏi 5 hỏi khi nào cận dưới đúng được đạt. Hàm $e^x$ trên $\mathbb R$ có hai nguyên nhân khiến cận dưới không đạt: miền không bị chặn, nên dãy cực tiểu hóa có thể tiến ra vô cực, và hàm không tăng ra vô cực theo hướng đó. Khi miền bị chặn, ta có kết quả cổ điển sau.

::: theorem Định lý 01.35 (Định lý Weierstrass; còn gọi là định lý giá trị cực trị, extreme value theorem) — phác thảo, chứng minh đầy đủ ở Rudin (1976)
**Giả thiết.** $C\subseteq\mathbb R^d$ không rỗng, đóng và bị chặn; $f:C\to\mathbb R$ liên tục.

**Kết luận.** $f$ đạt giá trị nhỏ nhất trên $C$: có $x^*\in C$ với $f(x^*)=\inf_{x\in C}f(x)$, và giá trị này hữu hạn.
:::

::: proof Phác thảo chứng minh Định lý 01.35
**Lộ trình.** Lấy một dãy cực tiểu hóa, trích một dãy con hội tụ trong $C$, rồi dùng tính liên tục. Chứng minh đầy đủ ở Rudin (1976), Định lý 2.41 (tr. 40: tập đóng và bị chặn trong $\mathbb R^d$ là compact) và Định lý 4.16 (tr. 89: hàm liên tục trên tập compact đạt giá trị nhỏ nhất).

**Bước 1 (dãy cực tiểu hóa).** Theo Nhận xét 01.10, có $x^{(k)}\in C$ với $f(x^{(k)})\to\inf_Cf$.

**Bước 2 (dãy con hội tụ).** Vì $C$ bị chặn, theo định lý Bolzano–Weierstrass dãy có một dãy con hội tụ; vì $C$ đóng, giới hạn $x^*$ thuộc $C$.

**Bước 3 (tính liên tục).** Vì $f$ liên tục, $f(x^*)$ bằng giới hạn của $f$ trên dãy con, tức bằng $\inf_Cf$; giá trị $f(x^*)$ là một số thực nên cận dưới hữu hạn. $\square$
:::

Định lý 01.35 không cần tính lồi và không cho tính duy nhất.

::: remark Nhận xét 01.36 (Khi bỏ giả thiết của Định lý 01.35)
Bỏ một giả thiết, kết luận có thể sai:

- bỏ "bị chặn": $e^x$ trên $\mathbb R$ không đạt cận dưới đúng $0$;
- bỏ "đóng": $x$ trên $(0,1]$ có cận dưới đúng $0$ không đạt;
- bỏ "liên tục": hàm bằng $x$ trên $(0,1]$ và bằng $1$ tại $0$ không đạt cận dưới đúng $0$ trên $[0,1]$.
:::

Trong học máy, Định lý 01.35 áp dụng được cả cho mạng nơ-ron vì không cần tính lồi: nếu tham số bị ràng buộc trong quả cầu $\{w\mid\lVert w\rVert_2\le r\}$ thì mọi hàm mất mát liên tục theo tham số đạt giá trị nhỏ nhất trên quả cầu đó.

Hai bài toán hồi quy có miền $\mathbb R^d$, không bị chặn. Một cách trực quan, nếu $f(x)\to+\infty$ khi $\lVert x\rVert_2\to\infty$ thì chỉ cần tìm nghiệm trong một vùng bị chặn. Để làm rõ điều kiện này, xem định nghĩa sau.

::: definition Định nghĩa 01.37 (Hàm cưỡng bức)
Cho $C\subseteq\mathbb R^d$ không bị chặn. Hàm $f:C\to\mathbb R$ là *cưỡng bức* (coercive) trên $C$ nếu $f(x)\to+\infty$ khi $\lVert x\rVert_2\to\infty$ với $x\in C$; nghĩa là với mọi $M\in\mathbb R$ có $R>0$ sao cho $f(x)>M$ với mọi $x\in C$ thỏa $\lVert x\rVert_2>R$.
:::

Ví dụ: $x^2$ cưỡng bức trên $\mathbb R$; $e^x$ không cưỡng bức vì $e^x\to0$ khi $x\to-\infty$; $J$ với ma trận $X'$ của Ví dụ 01.6 không cưỡng bức vì $J$ giữ giá trị $\tfrac16$ dọc đường thẳng $(7/6,\kappa,1/2-\kappa)^T$ khi $\kappa\to\infty$. Tính cưỡng bức độc lập với tính lồi: $x^4-2x^2$ cưỡng bức mà không lồi, còn $e^x$ lồi mà không cưỡng bức.

::: theorem Định lý 01.38 (Tồn tại nghiệm với hàm cưỡng bức) — chứng minh đầy đủ
**Giả thiết.** $C\subseteq\mathbb R^d$ không rỗng và đóng; $f:C\to\mathbb R$ liên tục, và cưỡng bức trên $C$ khi $C$ không bị chặn.

**Kết luận.** $f$ đạt giá trị nhỏ nhất trên $C$.
:::

::: proof Chứng minh Định lý 01.38
**Lộ trình.** Thu hẹp bài toán về một tập mức dưới; tính cưỡng bức làm tập này bị chặn, tính liên tục và tính đóng của $C$ làm nó đóng, rồi áp dụng Định lý 01.35.

**Bước 1 (quy về tập mức dưới).** Nếu $C$ bị chặn, kết luận là Định lý 01.35. Giả sử $C$ không bị chặn. Chọn $\bar x\in C$ và đặt $\mathcal K=S_{f(\bar x)}(f)=\{x\in C\mid f(x)\le f(\bar x)\}$; $\mathcal K$ không rỗng vì chứa $\bar x$.

**Bước 2 ($\mathcal K$ bị chặn).** Theo Định nghĩa 01.37 với $M=f(\bar x)$, có $R$ sao cho $f(x)>f(\bar x)$ khi $\lVert x\rVert_2>R$. Do đó mọi $x\in\mathcal K$ thỏa $\lVert x\rVert_2\le R$.

**Bước 3 ($\mathcal K$ đóng).** Nếu $x^{(k)}\in\mathcal K$ và $x^{(k)}\to x'$ thì $x'\in C$ vì $C$ đóng, và $f(x')=\lim_kf(x^{(k)})\le f(\bar x)$ vì $f$ liên tục; vậy $x'\in\mathcal K$.

**Bước 4 (cực tiểu trên $\mathcal K$ là cực tiểu trên $C$).** Theo Định lý 01.35, $f$ đạt giá trị nhỏ nhất trên $\mathcal K$ tại một điểm $x^*$. Với $x\in C\setminus\mathcal K$, $f(x)>f(\bar x)\ge f(x^*)$; với $x\in\mathcal K$, $f(x)\ge f(x^*)$. Vậy $x^*$ là cực tiểu trên toàn $C$. $\square$
:::

Định lý 01.38 đổi giả thiết "miền bị chặn" thành "hàm cưỡng bức", và không cho tính duy nhất. Trong học máy, một mất mát liên tục, không âm cộng hạng $\tfrac\mu2\lVert w\rVert_2^2$ với $\mu>0$ là cưỡng bức, vì tổng không nhỏ hơn $\tfrac\mu2\lVert w\rVert_2^2$, nên bài toán huấn luyện có hạng này có nghiệm, kể cả khi mất mát không lồi.

### 8.4. Lồi mạnh và chính quy hóa bậc hai

Với hàm khả vi trên $\mathbb R^d$, có một điều kiện đủ cho cả tồn tại và duy nhất. Một cách trực quan, $e^x$ lồi chặt nhưng độ cong $e^x$ tiến về $0$ khi $x\to-\infty$; nếu độ cong theo mọi hướng không nhỏ hơn $\mu>0$, hàm tăng ít nhất như $\tfrac\mu2\lVert x\rVert_2^2$. Để làm rõ điều kiện này mà không cần đạo hàm bậc hai, xem định nghĩa sau.

::: definition Định nghĩa 01.39 (Hàm lồi mạnh)
Cho $C\subseteq\mathbb R^d$ lồi và $\mu>0$. Hàm $f:C\to\mathbb R$ là *lồi mạnh* (strongly convex) với *hằng số lồi mạnh* (strong convexity parameter) $\mu$ nếu $x\mapsto f(x)-\tfrac\mu2\lVert x\rVert_2^2$ lồi trên $C$.
:::

Ví dụ: $x^2$ lồi mạnh với hằng số $2$, vì $x^2-x^2=0$ lồi.

::: remark Nhận xét 01.40 (Lồi mạnh qua Hessian; quan hệ với lồi chặt)
**Tiêu chuẩn Hessian.** Với $f$ thuộc lớp $C^2$ trên một miền mở và lồi, theo Định lý 01.29(a) áp dụng cho $f-\tfrac\mu2\lVert\cdot\rVert_2^2$, $f$ lồi mạnh với hằng số $\mu$ khi và chỉ khi $\nabla^2f(x)-\mu I_d\succeq0$, tức $\nabla^2f(x)\succeq\mu I_d$, với mọi $x$. Với $e^x$, đạo hàm bậc hai dần tới $0$ khi $x\to-\infty$, nên không có $\mu>0$ nào thỏa điều kiện.

**Quan hệ với lồi chặt.** Mọi hàm lồi mạnh là lồi chặt theo Định lý 01.30(a), vì $f=(f-\tfrac\mu2\lVert\cdot\rVert_2^2)+\tfrac\mu2\lVert\cdot\rVert_2^2$ là tổng của một hàm lồi và một hàm lồi chặt. Chiều ngược sai: $\ell$ lồi chặt nhưng không lồi mạnh, vì $\ell''(m)\to0$ (Mệnh đề 01.8(c)).
:::

::: corollary Hệ quả 01.41 (Hàm lồi mạnh khả vi có nghiệm duy nhất) — chứng minh đầy đủ
**Giả thiết.** $f:\mathbb R^d\to\mathbb R$ khả vi và lồi mạnh với hằng số $\mu>0$.

**Kết luận.** $f$ cưỡng bức, và bài toán $\min_{x\in\mathbb R^d}f(x)$ có đúng một nghiệm.
:::

::: proof Chứng minh Hệ quả 01.41
**Lộ trình.** Điều kiện bậc nhất cho $f-\tfrac\mu2\lVert\cdot\rVert_2^2$ tại $0$ chặn dưới $f$ bởi một hàm bậc hai của $\lVert x\rVert_2$; từ đó suy ra tính cưỡng bức, rồi tồn tại theo Định lý 01.38 và duy nhất theo Định lý 01.34.

**Bước 1 (chặn dưới bậc hai).** Đặt $\tilde f(x)=f(x)-\tfrac\mu2\lVert x\rVert_2^2$, lồi và khả vi với $\nabla\tilde f(0)=\nabla f(0)$. Định lý 01.25 tại $x=0$ cho $\tilde f(x)\ge\tilde f(0)+\nabla f(0)^Tx$, tức
$$
\begin{aligned}
f(x)&\ge f(0)+\nabla f(0)^Tx\\
&\quad+\tfrac\mu2\lVert x\rVert_2^2 .
\end{aligned}
$$
Theo bất đẳng thức Cauchy–Schwarz (Mệnh đề 00.5), $\nabla f(0)^Tx\ge-\lVert\nabla f(0)\rVert_2\lVert x\rVert_2$, nên
$$
\begin{aligned}
f(x)&\ge f(0)-\lVert\nabla f(0)\rVert_2\lVert x\rVert_2\\
&\quad+\tfrac\mu2\lVert x\rVert_2^2 .
\end{aligned}
$$

**Bước 2 (cưỡng bức và tồn tại).** Vế phải là đa thức bậc hai của $\lVert x\rVert_2$ với hệ số bậc hai dương, nên dần tới $+\infty$ khi $\lVert x\rVert_2\to\infty$: $f$ cưỡng bức. Hàm khả vi thì liên tục, và $\mathbb R^d$ không rỗng, đóng, nên Định lý 01.38 cho nghiệm tồn tại.

**Bước 3 (duy nhất).** Hàm lồi mạnh là lồi chặt (Nhận xét 01.40), nên Định lý 01.34 cho nghiệm duy nhất. $\square$
:::

Hệ quả 01.41 là điều kiện đủ: $x^4$ có nghiệm duy nhất nhưng không lồi mạnh trên $\mathbb R$. Một cách để có tính lồi mạnh là cộng vào hàm mục tiêu một hạng bậc hai, chẳng hạn để ngăn chuẩn của tham số tăng không giới hạn như ở Ví dụ 01.7. Để làm rõ cách cộng này, xem định nghĩa sau.

::: definition Định nghĩa 01.42 (Chính quy hóa bậc hai)
Cho $F:\mathbb R^d\to\mathbb R$ và $\mu>0$. *Chính quy hóa bậc hai* (quadratic regularization; còn gọi là *chính quy hóa $\ell_2$*, $\ell_2$ regularization, hay *chính quy hóa Tikhonov*, Tikhonov regularization; trong học sâu còn gọi là *suy giảm trọng số*, weight decay) của $F$ là hàm $F_\mu(w)=F(w)+\tfrac\mu2\lVert w\rVert_2^2$. Với mất mát logistic $L$ của Định nghĩa 01.7, $L_\mu(w)=L(w)+\tfrac\mu2\lVert w\rVert_2^2$. Với bình phương nhỏ nhất, $J_\mu(w)=J(w)+\tfrac\mu2\lVert w\rVert_2^2$ là mục tiêu của *hồi quy ridge* (ridge regression).
:::

Nếu $F$ lồi thì $F_\mu-\tfrac\mu2\lVert w\rVert_2^2=F$ lồi, nên $F_\mu$ lồi mạnh với hằng số $\mu$ (Định nghĩa 01.39); khi $F$ khả vi, Hệ quả 01.41 cho $F_\mu$ có đúng một nghiệm. Định nghĩa 01.42 không đòi $F$ lồi; khi $F$ không lồi, $F_\mu$ nói chung không lồi.

Trong học máy, với mất mát lồi, khả vi $F$, bài toán $\min_wF_\mu(w)$ có đúng một nghiệm, bất kể dữ liệu tách được hay đặc trưng trùng lặp; nghiệm này ưu tiên tham số có chuẩn nhỏ, và $\mu$ là một *siêu tham số* (hyperparameter) cần chọn.

::: example Ví dụ 01.16 (Chính quy hóa bậc hai với hai đặc trưng trùng nhau)
**Dữ kiện.** Một mẫu với hai đặc trưng cùng bằng $1$ và đầu ra $y=1$; mô hình $\hat y=w_1+w_2$; mất mát $F(w)=(w_1+w_2-1)^2$, có tập nghiệm là đường thẳng $w_1+w_2=1$. Với $\mu>0$,
$$
\begin{aligned}
F_\mu(w)&=(w_1+w_2-1)^2\\
&\quad+\tfrac\mu2(w_1^2+w_2^2).
\end{aligned}
$$

**Kiểm tra giả thiết.** Hessian là $\begin{bmatrix}2+\mu&2\\2&2+\mu\end{bmatrix}\succeq\mu I_2$, vì hiệu $\begin{bmatrix}2&2\\2&2\end{bmatrix}$ có $v^T\begin{bmatrix}2&2\\2&2\end{bmatrix}v=2(v_1+v_2)^2\ge0$. Do đó $F_\mu$ lồi mạnh, và theo Hệ quả 01.41 có đúng một nghiệm.

**Nghiệm.** Gradient bằng $0$:
$$
\begin{aligned}
2(w_1+w_2-1)+\mu w_1&=0,\\
2(w_1+w_2-1)+\mu w_2&=0 .
\end{aligned}
$$
Trừ hai phương trình: $\mu(w_1-w_2)=0$, nên $w_1=w_2$; thế vào: $2(2w_1-1)+\mu w_1=0$, nên $w_1=w_2=2/(4+\mu)$. Với $\mu=1$: $w^*=(0{,}4;\ 0{,}4)$, dự đoán $0{,}8$.

**Kiểm tra lại.** Với $\mu=1$, $w_1=0{,}4$: $2(0{,}8-1)+0{,}4=0$. Khi $\mu\to0$, $2/(4+\mu)\to\tfrac12$, và nghiệm tiến tới $(\tfrac12,\tfrac12)$, điểm có chuẩn nhỏ nhất trên đường thẳng nghiệm ban đầu.
:::

::: remark Nhận xét 01.43 (Các suy diễn sai về tồn tại và duy nhất)
Ba suy diễn sau đều sai:

1. "Hàm lồi chặt thì có nghiệm": sai với $e^x$ và với $L$ của Ví dụ 01.7.
2. "Hessian xác định dương tại mọi điểm thì có nghiệm": sai với cùng hai ví dụ. Ở Ví dụ 01.7, $L''(w)>0$ với mọi $w$ nhưng $L''(w)\to0$ khi $w\to\infty$, nên độ cong không đủ để chặn hàm ra vô cực; đây là khác biệt giữa lồi chặt và lồi mạnh.
3. "Có nghiệm và Hessian nửa xác định dương thì nghiệm duy nhất": sai với $J$ của Ví dụ 01.6.
:::

::: exercise Bài tập 01.12 (Hàm cưỡng bức không lồi)
Cho $f(x)=x^4-2x^2$ trên $\mathbb R$.

(a) Chứng minh $f$ cưỡng bức và suy ra bài toán $\min_{x\in\mathbb R}f(x)$ có nghiệm.

(b) Tìm mọi nghiệm và giá trị tối ưu.

(c) Chỉ ra $f$ không lồi, và giải thích vì sao Hệ quả 01.33 không mâu thuẫn với kết quả ở (b).
:::

::: hint
Viết $f(x)=(x^2-1)^2-1$.
:::

::: solution
**(a)** $f(x)=(x^2-1)^2-1$, và $(x^2-1)^2\to+\infty$ khi $\lvert x\rvert\to\infty$, nên $f$ cưỡng bức. $f$ là đa thức nên liên tục, $\mathbb R$ đóng và không rỗng; Định lý 01.38 cho nghiệm tồn tại.

**(b)** $f(x)\ge-1$, với dấu bằng khi và chỉ khi $x^2=1$, nên $S^*=\{-1,1\}$ và $p^*=-1$.

**(c)** $f''(x)=12x^2-4$, âm tại $x=0$, nên $f$ không lồi theo Định lý 01.29(a); trực tiếp, $f(0)=0>\tfrac12f(-1)+\tfrac12f(1)=-1$. Hệ quả 01.33 cần $f$ lồi, nên tập nghiệm gồm hai điểm tách rời không mâu thuẫn với nó.

**Kiểm tra lại.** $f(\pm1)=1-2=-1$, $f(0)=0$ và $f(2)=16-8=8$, đều không nhỏ hơn $-1$.
:::

Bộ công cụ của §6–§8 trả lời được cả sáu câu hỏi của Nhận xét 01.16. Bộ công cụ đó dùng năm giả thiết về miền và hàm mục tiêu:

- **(K1) Miền lồi.** Tập khả thi $C$ lồi.
- **(K2) Mục tiêu lồi.** $f_0$ lồi trên $C$; khi dùng tiêu chuẩn vi phân, $f_0$ khả vi (hoặc thuộc lớp $C^2$) trên một tập mở lồi chứa $C$.
- **(K3) Đóng và liên tục.** $C$ không rỗng và đóng, $f_0$ liên tục trên $C$.
- **(K4) Bị chặn hoặc cưỡng bức.** $C$ bị chặn, hoặc $f_0$ cưỡng bức trên $C$.
- **(K5) Lồi chặt hoặc lồi mạnh.** $f_0$ lồi chặt trên $C$, hoặc $f_0$ khả vi và lồi mạnh khi $C=\mathbb R^d$.

Ba kết luận về nghiệm dùng ba nhóm giả thiết:

- kết luận toàn cục dùng (K1) và (K2) (Định lý 01.32, Hệ quả 01.26);
- sự tồn tại dùng (K3) và (K4) (Định lý 01.35, Định lý 01.38), hoặc (K5) dạng lồi mạnh (Hệ quả 01.41);
- tính duy nhất dùng (K1) và (K5) (Định lý 01.34, Hệ quả 01.41).

## 9. Chứng nhận nghiệm

Ở §4, kết luận về nghiệm của mỗi bài toán được rút ra bằng một lập luận riêng. Chúng ta viết lại mỗi kết luận thành một chứng nhận gắn với đúng kết quả cung cấp nó.

### 9.1. Ba trường hợp xuyên suốt

::: proposition Mệnh đề 01.44 (Chứng nhận bài toán điều khiển) — chứng minh đầy đủ
**Giả thiết.** Dữ kiện như Định nghĩa 01.1.

**Kết luận.** Bài toán (4.1) có miền lồi, mục tiêu lồi chặt, và có đúng một nghiệm, cho bởi (4.3).
:::

::: proof Chứng minh Mệnh đề 01.44
**Lộ trình.** Kiểm tra (K1)–(K5) cho đoạn $C$ và hàm $q$, rồi chứng nhận nghiệm cụ thể (4.3) bằng (7.3).

**Bước 1 (miền: (K1), (K3), (K4)).** $C=[-u_{\max},u_{\max}]$ lồi theo Ví dụ 01.11(a); không rỗng vì chứa $0$; đóng và bị chặn vì là đoạn với hai đầu mút hữu hạn.

**Bước 2 (mục tiêu: (K2), (K5)).** $q$ lồi chặt trên $\mathbb R$ theo Ví dụ 01.14(a), nên lồi chặt trên $C$ (Nhận xét 01.22).

**Bước 3 (ba kết luận).** Cực tiểu địa phương là toàn cục theo Định lý 01.32; $q$ là đa thức nên liên tục, và Định lý 01.35 cho nghiệm tồn tại; Định lý 01.34 cho nghiệm duy nhất.

**Bước 4 (nghiệm cụ thể).** Theo (4.4), $q'(u^*)(u-u^*)=2(1+\lambda)(u^*-u_{\mathrm{free}})(u-u^*)$. Trong mỗi nhánh của $\operatorname{clip}$, tích này không âm với mọi $u\in C$:

- hoặc $u^*=u_{\mathrm{free}}$;
- hoặc $u^*=u_{\max}<u_{\mathrm{free}}$ và $u-u^*\le0$;
- hoặc $u^*=-u_{\max}>u_{\mathrm{free}}$ và $u-u^*\ge0$.

Do đó $u^*$ thỏa (7.3), và Hệ quả 01.26 cho $u^*$ là nghiệm. $\square$
:::

::: proposition Mệnh đề 01.45 (Chứng nhận bình phương nhỏ nhất) — chứng minh đầy đủ
**Giả thiết.** $X\in\mathbb R^{n\times d}$, $y\in\mathbb R^n$.

**Kết luận.** Bài toán (4.5) có miền lồi, mục tiêu lồi, luôn có nghiệm; nghiệm duy nhất khi và chỉ khi $\operatorname{rank}(X)=d$.
:::

::: proof Chứng minh Mệnh đề 01.45
**Lộ trình.** Tính lồi và kết luận toàn cục đến từ §6–§8; sự tồn tại đến từ phương trình chuẩn, vì các điều kiện tồn tại tổng quát không áp dụng được khi $X$ thiếu hạng.

**Bước 1 (miền, mục tiêu, toàn cục).** Miền $\mathbb R^d$ lồi; $J$ lồi theo Ví dụ 01.14(c); cực tiểu địa phương là toàn cục theo Định lý 01.32.

**Bước 2 (tồn tại).** Định lý 01.35 không áp dụng vì $\mathbb R^d$ không bị chặn, và Định lý 01.38 không áp dụng khi $X$ thiếu hạng: với $v\in\operatorname{Ker}(X)$, $v\ne0$, Hệ quả 01.5(b) cho $J(w^*+\tau v)=J(w^*)$ với mọi $\tau$, nên $J$ không cưỡng bức. Sự tồn tại đến từ Hệ quả 01.5(a).

**Bước 3 (duy nhất).** Khi $\operatorname{rank}(X)=d$, $\nabla^2J=2X^TX\succ0$ nên $J$ lồi chặt theo Định lý 01.29(b), và Định lý 01.34 cho nghiệm duy nhất. Khi $\operatorname{rank}(X)<d$, $\operatorname{Ker}(X)\ne\{0\}$ và Hệ quả 01.5(b) cho vô số nghiệm. $\square$
:::

::: proposition Mệnh đề 01.46 (Chứng nhận hồi quy logistic, có và không có chính quy hóa) — chứng minh đầy đủ
**Giả thiết.** Dữ liệu $(a_i,y_i)$ như Định nghĩa 01.7; $\mu>0$.

**Kết luận.**

- (a) $L$ lồi trên $\mathbb R^d$ và mọi cực tiểu địa phương là toàn cục; có dữ liệu (Ví dụ 01.7) mà (4.7) không có nghiệm. Với ba mẫu của Ví dụ 01.8, $w^*=\log2$ là nghiệm duy nhất.
- (b) $L_\mu$ có đúng một nghiệm, với mọi dữ liệu.
:::

::: proof Chứng minh Mệnh đề 01.46
**Lộ trình.** (a) dùng tính lồi của $L$, Định lý 01.32 và Ví dụ 01.7; nghiệm của Ví dụ 01.8 được chứng nhận bằng Hệ quả 01.26 và Định lý 01.34. (b) dùng tiêu chuẩn Hessian của tính lồi mạnh.

**Bước 1 (phần (a): lồi, toàn cục, phản ví dụ tồn tại).** $L$ lồi theo Ví dụ 01.15(b); cực tiểu địa phương là toàn cục theo Định lý 01.32; Ví dụ 01.7 là một dữ liệu không có nghiệm.

**Bước 2 (phần (a): ba mẫu).** Với dữ liệu của Ví dụ 01.8, $L'(\log2)=(2-2)/(1+2)=0$, nên $w^*=\log2$ là cực tiểu toàn cục theo Hệ quả 01.26. Vì $L''(w)=2\ell''(w)+\ell''(-w)>0$ với mọi $w$, $L$ lồi chặt theo Bổ đề 01.28(b), và Định lý 01.34 cho $w^*$ là nghiệm duy nhất.

**Bước 3 (phần (b)).** Theo Ví dụ 01.15(b),
$$
\begin{aligned}
\nabla^2L_\mu(w)&=\textstyle\sum_i\ell''(m_i)a_ia_i^T\\
&\quad+\mu I_d\\
&\succeq\mu I_d .
\end{aligned}
$$
Theo Nhận xét 01.40, $L_\mu$ lồi mạnh với hằng số $\mu$, và Hệ quả 01.41 cho đúng một nghiệm. $\square$
:::

Nghiệm ở (b) phụ thuộc $\mu$; khi bài toán gốc có nghiệm $w^*\ne0$, hai nghiệm khác nhau vì $\nabla L_\mu(w^*)=\mu w^*\ne0$. Năm trường hợp được đặt cạnh nhau trong bảng sau.

| Bài toán | Miền | Mục tiêu | Tồn tại, theo | Duy nhất, theo |
|---|---|---|---|---|
| Điều khiển | đoạn đóng, bị chặn | lồi chặt | có, Định lý 01.35 | có, Định lý 01.34 |
| Bình phương nhỏ nhất | $\mathbb R^d$ | lồi | luôn có, Hệ quả 01.5(a) | khi và chỉ khi $\operatorname{rank}(X)=d$ |
| Logistic, dữ liệu tách được | $\mathbb R^d$ | lồi; lồi chặt ở Ví dụ 01.7 | không | không đặt ra |
| Logistic, Ví dụ 01.8 | $\mathbb R$ | lồi chặt | có, $w^*=\log2$ (Hệ quả 01.26) | có, Định lý 01.34 |
| Logistic có chính quy hóa | $\mathbb R^d$ | lồi mạnh | có, Hệ quả 01.41 | có, Hệ quả 01.41 |

Cả năm hàng có miền lồi và mục tiêu lồi, nên đều có bảo đảm toàn cục của Định lý 01.32; hai cột cuối khác nhau vì:

- bài toán điều khiển, logistic hai mẫu và logistic ba mẫu đều có mục tiêu lồi chặt; bài toán điều khiển có nghiệm nhờ miền bị chặn, bài toán ba mẫu có nghiệm theo Hệ quả 01.26, còn bài toán hai mẫu không có nghiệm;
- hai bài toán hồi quy có cùng miền $\mathbb R^d$ nhưng kết luận tồn tại khác nhau, nên sự tồn tại phụ thuộc cả mục tiêu.

### 9.2. Quy trình chứng nhận

Ghép các bước đã dùng cho ba bài toán, ta được một quy trình cho mô hình mới. Mỗi bước kiểm tra ghi câu hỏi tương ứng của Nhận xét 01.16 và giả thiết tương ứng trong (K1)–(K5).

::: algorithm Thuật toán 01.47 (Quy trình chứng nhận một mô hình tối ưu)
**Đầu vào.** Mô tả bằng lời của một tình huống cần ra quyết định.

**Đầu ra.** Một bài toán dạng (5.1) và một chứng nhận cho từng kết luận toàn cục, tồn tại, duy nhất, hoặc chỉ ra kết luận nào không được bảo đảm.

**Giai đoạn 1 — Lập mô hình.**

1. Nêu kiểu và kích thước của mọi dữ kiện.
2. Chỉ ra biến quyết định $x\in\mathbb R^d$ và miền xác định $D$.
3. Viết $f_0$ và từng ràng buộc $f_i\le0$, $h_j=0$; xác định $C$ và kiểm tra một điểm cho trước có thuộc $C$ không (câu 1).

**Giai đoạn 2 — Kiểm tra tính lồi.**

4. Kiểm tra $C$ lồi (câu 2; (K1)) bằng Mệnh đề 01.18, Mệnh đề 01.19 và Mệnh đề 01.24.
5. Kiểm tra $f_0$ lồi trên $C$ (câu 3; (K2)) bằng Định nghĩa 01.21, Định lý 01.25, Định lý 01.29 hoặc Định lý 01.30; ghi rõ giả thiết của công cụ (miền mở, khả vi).

**Giai đoạn 3 — Ba kết luận.**

6. Nếu bước 4 và bước 5 thành công, kết luận mọi cực tiểu địa phương là toàn cục bằng Định lý 01.32, và chứng nhận một điểm ứng viên bằng Hệ quả 01.26 khi $f_0$ khả vi (câu 4).
7. Kiểm tra tồn tại (câu 5; (K3), (K4)): $C$ không rỗng; rồi $C$ đóng, bị chặn và $f_0$ liên tục (Định lý 01.35), hoặc $C$ đóng và $f_0$ liên tục, cưỡng bức (Định lý 01.38), hoặc $C=\mathbb R^d$ và $f_0$ khả vi, lồi mạnh (Hệ quả 01.41).
8. Nếu nghiệm tồn tại, kiểm tra duy nhất bằng lồi chặt (câu 6; (K5); Định lý 01.34).

**Giai đoạn 4 — Diễn giải.**

9. Diễn giải nghiệm trong ngữ cảnh ban đầu.

**Điều kiện dừng.** Quy trình kết thúc sau bước 9. Nếu bước 4 hoặc bước 5 thất bại, bỏ qua bước 6, ghi rằng không có bảo đảm toàn cục, rồi tiếp tục bước 7. Nếu bước 7 thất bại, bỏ qua bước 8 và ghi rằng sự tồn tại chưa được bảo đảm.

**Chi phí.** Mỗi bước là một phép kiểm tra trên công thức; bước 5 với Định lý 01.29 cần tính Hessian.
:::

Ví dụ sau áp dụng quy trình cho một bài toán phân bổ công suất.

::: example Ví dụ 01.17 (Phân bố công suất chiếu sáng)
**Dữ kiện.** $d$ đèn chiếu sáng $n$ vùng; đèn $j$ có công suất $p_j\in[0,p_{\max}]$, và độ sáng tại vùng $i$ là $\mathcal I_i=\sum_jA_{ij}p_j$, tức $\mathcal I=Ap$ với $A\in\mathbb R^{n\times d}$ có mọi phần tử không âm. Mục tiêu là đưa $\mathcal I$ gần mức đích $\mathcal I_{\mathrm{des}}\in\mathbb R^n$. Giả sử $d=n=2$, $A=\begin{bmatrix}2&1\\1&2\end{bmatrix}$, $\mathcal I_{\mathrm{des}}=(3,3)^T$ và $p_{\max}=0{,}8$.

**Giai đoạn 1 (lập mô hình).** Dữ kiện $A$, $\mathcal I_{\mathrm{des}}$, $p_{\max}\ge0$; biến $p\in\mathbb R^d$; bài toán
$$
\underset{0\le p\le p_{\max}}{\operatorname{minimize}}\quad f(p)=\lVert Ap-\mathcal I_{\mathrm{des}}\rVert_2^2 .
$$

**Giai đoạn 2 (tính lồi).** Miền là một hộp, lồi theo Mệnh đề 01.18(d). Hàm $f$ là $J$ của (4.5) với $X=A$ và $y=\mathcal I_{\mathrm{des}}$, nên lồi theo Ví dụ 01.14(c), với Hessian $2A^TA\succeq0$.

**Giai đoạn 3 (ba kết luận).** Cực tiểu địa phương là toàn cục theo Định lý 01.32. Hộp chứa $p=0$, đóng và bị chặn, và $f$ liên tục, nên Định lý 01.35 cho nghiệm tồn tại. Nếu $\operatorname{rank}(A)=d$, như ở đây với $\det A=3$, thì $f$ lồi chặt theo Định lý 01.29(b), và Định lý 01.34 cho nghiệm duy nhất.

**Nghiệm.** Không có ràng buộc, $Ap=\mathcal I_{\mathrm{des}}$ cho $p=(1,1)$, nằm ngoài hộp vì $1>0{,}8$. Xét $p^{\mathrm{opt}}=(0{,}8;\ 0{,}8)$:
$$
\begin{aligned}
Ap^{\mathrm{opt}}-\mathcal I_{\mathrm{des}}&=(-0{,}6;\ -0{,}6),\\
\nabla f(p^{\mathrm{opt}})&=2A^T\bigl(Ap^{\mathrm{opt}}\\
&\qquad-\mathcal I_{\mathrm{des}}\bigr)\\
&=(-3{,}6;\ -3{,}6).
\end{aligned}
$$
Với mọi $p$ trong hộp, $\nabla f(p^{\mathrm{opt}})^T(p-p^{\mathrm{opt}})=3{,}6\,(1{,}6-p_1-p_2)\ge0$, vì $p_1,p_2\le0{,}8$. Theo Hệ quả 01.26, $p^{\mathrm{opt}}$ là nghiệm, với $f(p^{\mathrm{opt}})=0{,}36+0{,}36=0{,}72$.

**Giai đoạn 4 (diễn giải).** Cả hai đèn chạy ở công suất tối đa, và độ sáng đạt được $(2{,}4;\ 2{,}4)$ vẫn thấp hơn mức đích $3$ ở cả hai vùng.

**Kiểm tra lại.** $f(0{,}8;\ 0{,}5)=0{,}9^2+1{,}2^2=2{,}25>0{,}72$ và $f(0,0)=3^2+3^2=18>0{,}72$.
:::

Bài toán chiếu sáng gốc trong slide của Boyd và Vandenberghe cho khóa MIT OpenCourseWare 6.079 (Boyd, Parrilo, 2009) cực tiểu $\max_i\lvert\log\mathcal I_i-\log\mathcal I_{\mathrm{des}}\rvert$ với một mức đích chung $\mathcal I_{\mathrm{des}}>0$; bài toán này tương đương với cực tiểu $\max_i\chi(\mathcal I_i/\mathcal I_{\mathrm{des}})$, với $\chi(\nu)=\max\{\nu,1/\nu\}$, một cực đại của các hàm lồi (lec01, tr. 1–9 đến 1–12).

::: exercise Bài tập 01.13 (Bình phương nhỏ nhất với tham số không âm)
Xét bài toán bình phương nhỏ nhất với tham số không âm, $\min_{w\ge0}\lVert Xw-y\rVert_2^2$, với $X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix}$ của Ví dụ 01.5.

(a) Áp dụng Thuật toán 01.47, nêu căn cứ cho tồn tại và duy nhất.

(b) Với $y=(1,2,2)^T$, tìm nghiệm.

(c) Với $y=(2,1,1)^T$, chứng minh nghiệm là $w^*=(\tfrac43,0)^T$ và tính giá trị tối ưu.
:::

::: hint
Ở (a), miền $\{w\ge0\}$ không bị chặn; dùng $\lambda_{\min}(X^TX)>0$ để chặn dưới $J$ bởi một hàm bậc hai của $\lVert w\rVert_2$, như bước 1 của chứng minh Hệ quả 01.41. Ở (b), so nghiệm không ràng buộc với miền rồi dùng Mệnh đề 01.15(b). Ở (c), kiểm tra (7.3) tại $w^*$.
:::

::: solution
**(a) Lập mô hình và tính lồi.** Dữ kiện $X\in\mathbb R^{3\times2}$, $y\in\mathbb R^3$; biến $w\in\mathbb R^2$; mục tiêu $J$; miền $C=\{w\mid w\ge0\}$, giao của hai nửa không gian $\{w\mid-w_j\le0\}$, nên lồi (Mệnh đề 01.18(c), Mệnh đề 01.19(a)), không rỗng vì chứa $0$, và đóng vì là giao của hai tập đóng. $J$ lồi theo Ví dụ 01.14(c).

**(a) Cưỡng bức.** $X^TX=\begin{bmatrix}3&3\\3&5\end{bmatrix}$ có giá trị riêng $4\pm\sqrt{10}$, nên $\lambda_{\min}=4-\sqrt{10}\approx0{,}838>0$. Theo Mệnh đề 00.18, $v^T(2X^TX)v\ge2\lambda_{\min}v^Tv$, nên $J-\lambda_{\min}\lVert\cdot\rVert_2^2$ có Hessian $2X^TX-2\lambda_{\min}I_2\succeq0$ và lồi theo Định lý 01.29(a). Định lý 01.25 tại $0$ cho $J(w)-\lambda_{\min}\lVert w\rVert_2^2\ge J(0)+\nabla J(0)^Tw$; cùng với Cauchy–Schwarz (Mệnh đề 00.5),
$$
\begin{aligned}
J(w)&\ge J(0)-\lVert\nabla J(0)\rVert_2\lVert w\rVert_2\\
&\quad+\lambda_{\min}\lVert w\rVert_2^2\to+\infty
\end{aligned}
$$
khi $\lVert w\rVert_2\to\infty$, nên $J$ cưỡng bức trên $C$.

**(a) Ba kết luận.** Cực tiểu địa phương là toàn cục theo Định lý 01.32. $J$ liên tục, nên Định lý 01.38 cho nghiệm tồn tại. $\nabla^2J=2X^TX\succ0$, nên $J$ lồi chặt theo Định lý 01.29(b), và Định lý 01.34 cho nghiệm duy nhất. Hệ quả 01.41 không dùng được trực tiếp vì nó phát biểu cho miền $\mathbb R^d$.

**(b)** Nghiệm không ràng buộc $w^*=(7/6,1/2)^T$ (Ví dụ 01.5) thuộc $C$, nên theo Mệnh đề 01.15(b) nó là nghiệm của bài toán có ràng buộc, với giá trị $\tfrac16$.

**(c) Nghiệm không ràng buộc.** $X^Ty=(4,3)^T$ và
$$
\begin{aligned}
&\tfrac16\begin{bmatrix}5&-3\\-3&3\end{bmatrix}\begin{bmatrix}4\\3\end{bmatrix}\\
&\quad=\begin{bmatrix}11/6\\-1/2\end{bmatrix}\notin C .
\end{aligned}
$$

**(c) Kiểm tra (7.3).** Tại $w^*=(\tfrac43,0)^T$:
$$
\begin{aligned}
Xw^*-y&=(-\tfrac23,\ \tfrac13,\ \tfrac13)^T,\\
\nabla J(w^*)&=2X^T(Xw^*-y)\\
&=(0,\ 2)^T .
\end{aligned}
$$
Với mọi $w\in C$, $\nabla J(w^*)^T(w-w^*)=2w_2\ge0$, nên Hệ quả 01.26 cho $w^*$ là nghiệm; theo (a), nghiệm duy nhất. Giá trị tối ưu là $J(w^*)=\tfrac49+\tfrac19+\tfrac19=\tfrac23$. Khi hệ số góc bị ràng buộc không âm, mô hình tốt nhất là đường nằm ngang ở mức trung bình $\tfrac43$ của $y$.

**Kiểm tra lại.** Ở (c), $w=(1,0)$ khả thi và cho phần dư $(-1,0,0)$, $J=1>\tfrac23$; $w=(\tfrac43,\tfrac12)$ cho phần dư $(-\tfrac23,\tfrac56,\tfrac43)$, $J=\tfrac{16+25+64}{36}=\tfrac{105}{36}>\tfrac23$.
:::

## 10. Ý nghĩa, tác động và giới hạn

Ba tình huống sau áp dụng Thuật toán 01.47; tình huống thứ ba vi phạm giả thiết lồi.

### 10.1. Chính quy hóa khi dữ liệu tách được

::: application Tình huống 01.1 (Hồi quy logistic có chính quy hóa trên dữ liệu tách được tuyến tính)
**Bài toán và dữ liệu.** Hai mẫu $(a_1,y_1)=(1,+1)$, $(a_2,y_2)=(-1,-1)$ của Ví dụ 01.7, tách được bởi mọi $w>0$. Bài toán hồi quy logistic trên dữ liệu này không có nghiệm: tham số tăng không giới hạn và xác suất dự đoán $\sigma(w)$ tiến về $1$. Cần một tham số hữu hạn với xác suất dự đoán bị chặn xa $1$.

**Mô hình hóa (bước 1–3).** Chính quy hóa bậc hai với $\mu>0$: biến $w\in\mathbb R$, miền $\mathbb R$, mục tiêu
$$
L_\mu(w)=2\log(1+e^{-w})+\tfrac\mu2w^2 .
$$

**Kiểm tra giả thiết (bước 4–8).** Miền $\mathbb R$ lồi. $L_\mu''(w)=2\ell''(w)+\mu\ge\mu>0$ theo Mệnh đề 01.8(c), nên $L_\mu$ lồi mạnh (Nhận xét 01.40) và theo Hệ quả 01.41 có đúng một nghiệm $w^*_\mu$. Theo Định lý 00.42 và Hệ quả 01.26, $w^*_\mu$ là nghiệm duy nhất của $L_\mu'(w)=0$.

**Áp dụng.** Phương trình là
$$
L_\mu'(w)=-\frac{2}{1+e^w}+\mu w=0 .
$$
Vì $L_\mu'(0)=-1<0$ và $L_\mu'$ tăng chặt, $w^*_\mu>0$; từ phương trình, $\mu w^*_\mu=2/(1+e^{w^*_\mu})<1$, nên $0<w^*_\mu<1/\mu$. Giải bằng *phép chia đôi khoảng* (bisection method), tức lặp chia đôi khoảng mà $L_\mu'$ đổi dấu ở hai đầu, trên $(0,1/\mu)$, cho bảng sau (làm tròn bốn chữ số).

| $\mu$ | $w^*_\mu$ | $L(w^*_\mu)$ | $L_\mu(w^*_\mu)$ | $\sigma(w^*_\mu)$ |
|---:|---:|---:|---:|---:|
| $1$ | $0{,}6748$ | $0{,}8232$ | $1{,}0509$ | $0{,}6626$ |
| $0{,}1$ | $2{,}1280$ | $0{,}2250$ | $0{,}4514$ | $0{,}8936$ |
| $0{,}01$ | $3{,}9140$ | $0{,}0395$ | $0{,}1161$ | $0{,}9804$ |

**Kiểm tra lại.** Với $\mu=1$: $2/(1+e^{0{,}6748})=2/(1+1{,}9637)=0{,}6748=\mu w^*_\mu$. Với $\mu=0{,}1$: $2/(1+e^{2{,}128})=0{,}2128=0{,}1\cdot2{,}128$.

**Diễn giải và giới hạn.** Với mỗi $\mu>0$, tham số hữu hạn và xác suất đúng nhãn $\sigma(w^*_\mu)<1$; khi $\mu$ giảm từ $1$ xuống $0{,}01$, xác suất này tăng từ $0{,}66$ lên $0{,}98$. Nghiệm $w^*_\mu$ thuộc một bài toán khác bài toán gốc, và $\mu$ được chọn bằng *tập kiểm định* (validation set). Chính quy hóa bảo đảm tồn tại và duy nhất; nó không bảo đảm mô hình dự đoán tốt trên dữ liệu mới.

**Dẫn ngược lý thuyết.** Định nghĩa 01.7 và Định nghĩa 01.42 (mô hình), Mệnh đề 01.8(c) (độ cong của $\ell$), Nhận xét 01.40 và Hệ quả 01.41 (tồn tại và duy nhất, bước 7 và 8 của Thuật toán 01.47), Hệ quả 01.26 (gradient bằng $0$ là đủ), Mệnh đề 01.46(b) (trường hợp tổng quát).
:::

### 10.2. Trọng số trộn của ba mô hình

::: application Tình huống 01.2 (Trọng số trộn của tổ hợp ba mô hình)
**Bài toán và dữ liệu.** Giả sử ba mô hình hồi quy đã huấn luyện cho dự đoán trên $n=3$ mẫu kiểm định có đầu ra thật $y=(1,1,2)^T$:

- mô hình 1 dự đoán $(0,2,1)$;
- mô hình 2 dự đoán $(2,0,1)$;
- mô hình 3 dự đoán $(3,3,0)$.

Gọi $\hat y^{(j)}$ là vector dự đoán của mô hình $j$. Cần trọng số $\omega\in\Delta_3$ để dự đoán trộn $\sum_j\omega_j\hat y^{(j)}$ gần $y$ nhất.

**Mô hình hóa (bước 1–3).** Xếp ba vector dự đoán thành ba cột của
$$
P=\begin{bmatrix}0&2&3\\2&0&3\\1&1&0\end{bmatrix},
$$
với hàng $i$ là mẫu, cột $j$ là mô hình. Biến $\omega\in\mathbb R^3$; mục tiêu $f(\omega)=\lVert P\omega-y\rVert_2^2$; miền là đơn hình $\Delta_3$.

**Kiểm tra giả thiết (bước 4–8).**

- $\Delta_3$ lồi (Ví dụ 01.11(d)), không rỗng (chứa $(1,0,0)$), đóng vì là giao của các tập đóng, và bị chặn vì $0\le\omega_j\le1$.
- $f$ là $J$ của (4.5) với $X=P$, nên lồi (Ví dụ 01.14(c)) và liên tục.
- $\det P=0\cdot(0-3)-2\cdot(0-3)+3\cdot(2-0)=12\ne0$, nên $\operatorname{rank}(P)=3$, $\nabla^2f=2P^TP\succ0$ và $f$ lồi chặt (Định lý 01.29(b)).

Tồn tại theo Định lý 01.35, duy nhất theo Định lý 01.34.

**Áp dụng.** Bỏ ràng buộc, hệ $P\omega=y$ có nghiệm duy nhất $\omega=(1,1,-\tfrac13)$, với trọng số âm và tổng $\tfrac53$, nên ràng buộc có hiệu lực. Xét $\omega^*=(\tfrac12,\tfrac12,0)$ trên một cạnh của đơn hình:
$$
\begin{aligned}
P\omega^*-y&=(1,1,1)-(1,1,2)\\
&=(0,0,-1),\\
\nabla f(\omega^*)&=2P^T(P\omega^*-y)\\
&=(-2,-2,0).
\end{aligned}
$$
Với mọi $\omega\in\Delta_3$, dùng $\omega_1+\omega_2=1-\omega_3$:
$$
\begin{aligned}
&\nabla f(\omega^*)^T(\omega-\omega^*)\\
&\quad=-2(\omega_1+\omega_2)+2\\
&\quad=2\omega_3\ge0 .
\end{aligned}
$$
Theo Hệ quả 01.26, $\omega^*$ là nghiệm, và là nghiệm duy nhất; giá trị tối ưu là $f(\omega^*)=1$.

**Kiểm tra lại.** Từng mô hình riêng lẻ cho $f(1,0,0)=1+1+1=3$, $f(0,1,0)=3$, $f(0,0,1)=4+4+4=12$; trọng số đều $(\tfrac13,\tfrac13,\tfrac13)$ cho dự đoán $(\tfrac53,\tfrac53,\tfrac23)$ và $f=\tfrac49+\tfrac49+\tfrac{16}9=\tfrac83$. Cả bốn giá trị lớn hơn $1$.

**Diễn giải và giới hạn.** Tổ hợp tối ưu bỏ hẳn mô hình 3 (nghiệm trên biên của $\Delta_3$) và chia đều cho hai mô hình còn lại; tổng bình phương sai số giảm từ $3$ của mô hình đơn tốt nhất xuống $1$. Trọng số được chọn trên chính ba mẫu kiểm định nên có thể *quá khớp* (overfitting) với chúng; đánh giá cần một *tập kiểm tra* (test set) riêng.

**Dẫn ngược lý thuyết.** Ví dụ 01.11(d) (bước 4), Ví dụ 01.14(c) và Định lý 01.29(b) (bước 5), Định lý 01.35 (bước 7), Định lý 01.34 (bước 8), Hệ quả 01.26 (nghiệm trên biên).
:::

### 10.3. Khi giả thiết lồi bị vi phạm

::: application Tình huống 01.3 (Mạng một nơ-ron ẩn: giả thiết lồi bị vi phạm)
**Bài toán và dữ liệu.** Một mạng nơ-ron có một *lớp ẩn* (hidden layer) gồm một nơ-ron với *hàm kích hoạt* (activation function) $\tanh$ dự đoán $\hat y=w_{\mathrm r}\tanh(w_{\mathrm v} a)$ từ đầu vào $a$, với trọng số vào $w_{\mathrm v}\in\mathbb R$ và trọng số ra $w_{\mathrm r}\in\mathbb R$. Dữ liệu là một mẫu $(a,y)=(1,\tfrac12)$.

**Mô hình hóa (bước 1–3).** Biến $(w_{\mathrm r},w_{\mathrm v})\in\mathbb R^2$, miền $\mathbb R^2$, mục tiêu $F(w_{\mathrm r},w_{\mathrm v})=(w_{\mathrm r}\tanh w_{\mathrm v}-\tfrac12)^2$.

**Kiểm tra giả thiết (bước 4–5).** Miền lồi nhưng mục tiêu không lồi. Vì $\tanh$ là hàm lẻ, hai điểm $\pi^{(1)}=(1,b_0)$ và $\pi^{(2)}=(-1,-b_0)$ với $b_0=\operatorname{artanh}\tfrac12\approx0{,}5493$ đều cho $w_{\mathrm r}\tanh w_{\mathrm v}=\tfrac12$ và $F=0$. Trung điểm của chúng là $(0,0)$, với
$$
\begin{aligned}
F(0,0)&=\tfrac14\\
&>\tfrac12F(\pi^{(1)})+\tfrac12F(\pi^{(2)})\\
&=0,
\end{aligned}
$$
vi phạm (7.1). Bước 5 của Thuật toán 01.47 thất bại, nên Định lý 01.32, Hệ quả 01.26 và Hệ quả 01.33 không áp dụng.

**Hậu quả thứ nhất: điểm dừng không là cực tiểu.** Đặt $\varrho=w_{\mathrm r}\tanh w_{\mathrm v}-\tfrac12$. Khi đó
$$
\begin{aligned}
\frac{\partial F}{\partial w_{\mathrm r}}&=2\varrho\tanh w_{\mathrm v},\\
\frac{\partial F}{\partial w_{\mathrm v}}&=2\varrho\, w_{\mathrm r}(1-\tanh^2 w_{\mathrm v}),
\end{aligned}
$$
cả hai bằng $0$ tại $(0,0)$. Tại $(0,0)$, các đạo hàm bậc hai là:

- $\partial^2F/\partial w_{\mathrm r}^2=2\tanh^2 w_{\mathrm v}=0$;
- $\partial^2F/\partial w_{\mathrm v}^2=0$, vì mọi hạng chứa thừa số $w_{\mathrm r}$ hoặc $\tanh w_{\mathrm v}$;
- $\partial^2F/\partial w_{\mathrm r}\partial w_{\mathrm v}=2\bigl[w_{\mathrm r}(1-\tanh^2 w_{\mathrm v})\tanh w_{\mathrm v}+\varrho(1-\tanh^2 w_{\mathrm v})\bigr]=2\cdot(-\tfrac12)=-1$.

Hessian $\begin{bmatrix}0&-1\\-1&0\end{bmatrix}$ có hai giá trị riêng $\pm1$, nên $(0,0)$ là điểm yên ngựa (Định lý 00.43). Hạ gradient khởi tạo đúng tại $(0,0)$ không rời điểm này, vì gradient bằng $0$; đây là một lý do để khởi tạo trọng số của mạng ngẫu nhiên.

**Hậu quả thứ hai: tập nghiệm không lồi.** Tập nghiệm $\{(w_{\mathrm r},w_{\mathrm v})\mid w_{\mathrm r}\tanh w_{\mathrm v}=\tfrac12\}$ gồm hai nhánh rời nhau ($w_{\mathrm r}, w_{\mathrm v}>0$ và $w_{\mathrm r}, w_{\mathrm v}<0$), không lồi và có vô số điểm, nên tham số không xác định duy nhất từ dữ liệu.

**Hậu quả thứ ba: hàm không cưỡng bức.** Dọc nhánh $w_{\mathrm v}\to0^+$, $w_{\mathrm r}=1/(2\tanh w_{\mathrm v})\to\infty$ trong khi $F=0$. Nghiệm tồn tại ở đây nhờ tính trực tiếp, không nhờ Định lý 01.38.

**Chính quy hóa với $\mu<1$ không khôi phục tính lồi.** Với $F_\mu=F+\tfrac\mu2(w_{\mathrm r}^2+w_{\mathrm v}^2)$, Hessian tại $(0,0)$ là $\begin{bmatrix}\mu&-1\\-1&\mu\end{bmatrix}$, có giá trị riêng $\mu-1$ âm khi $\mu<1$, nên $F_\mu$ không lồi theo Định lý 01.29(a).

**Kiểm tra lại.** $F(0{,}3;\ 0{,}3)=(0{,}3\tanh0{,}3-\tfrac12)^2\approx0{,}170<\tfrac14=F(0,0)$ còn $F(0{,}3;\ -0{,}3)\approx0{,}345>\tfrac14$, đúng với một điểm yên ngựa tại $(0,0)$.

**Diễn giải.** Hai mạng $\pi^{(1)}$ và $\pi^{(2)}$ biểu diễn cùng một hàm dự đoán; phép đối xứng $(w_{\mathrm r},w_{\mathrm v})\mapsto(-w_{\mathrm r},-w_{\mathrm v})$ của tham số giữ nguyên hàm dự đoán vì $\tanh$ là hàm lẻ, và là nguồn của tính không lồi ở đây.

**Dẫn ngược lý thuyết.** Định nghĩa 01.21 (kiểm tra bằng định nghĩa thất bại), Định lý 01.29(a) (Hessian không nửa xác định dương), Định lý 01.32 và Hệ quả 01.33 (kết luận mất khi giả thiết lồi bị vi phạm), Định nghĩa 01.37 (tính cưỡng bức thất bại).
:::

### 10.4. Ứng dụng trong học máy

Các công cụ của bài áp dụng cho năm bài toán học máy, bao gồm:

- hồi quy tuyến tính, có hoặc không có chính quy hóa bậc hai;
- hồi quy logistic với mất mát entropy chéo;
- máy vector hỗ trợ, với miền lề cứng và mất mát bản lề;
- trộn mô hình và phân bổ tài nguyên trên đơn hình hoặc hộp;
- tìm nhiễu đối kháng trên một tập nhiễu lồi.

### 10.5. Tóm tắt

Chúng ta bắt đầu từ ba quyết định cho ba hiện tượng về nghiệm: nghiệm trên biên với đạo hàm khác $0$, vô số nghiệm khi ma trận thiết kế thiếu hạng, và cận dưới đúng không đạt khi dữ liệu tách được. Dạng tổng quát (5.1) đặt cả ba vào một ngôn ngữ và tách sáu câu hỏi chứng nhận. Tập lồi trả lời câu hỏi về miền; hàm lồi cùng ba tiêu chuẩn trả lời câu hỏi về mục tiêu. Tính lồi cho kết luận toàn cục, miền bị chặn hoặc tính cưỡng bức cho sự tồn tại, tính lồi chặt cho tính duy nhất, và tính lồi mạnh gộp hai kết luận sau; Thuật toán 01.47 ghép các bước thành một quy trình.

Do đó, với câu hỏi mở đầu, bài toán $\min_{w\in\mathbb R}2\log(1+e^{-w})$ không có nghiệm (Ví dụ 01.7), nên $w=8$ không là nghiệm: $L(9)<L(8)$. Hàm $L$ lồi chặt, nên nó có nhiều nhất một nghiệm (Định lý 01.34), nhưng $L$ không cưỡng bức và miền không bị chặn, nên không điều kiện tồn tại nào áp dụng; dãy $w^{(k)}=k$ là dãy cực tiểu hóa nhưng không hội tụ (Nhận xét 01.10). Cộng $\tfrac\mu2w^2$ cho một bài toán có đúng một nghiệm hữu hạn (Tình huống 01.1).

| Nội dung | Kết quả cần tra lại |
|---|---|
| Ba bài toán | Định nghĩa 01.1, 01.4, 01.7; Mệnh đề 01.2, 01.8; Hệ quả 01.5 |
| Dạng tổng quát | Định nghĩa 01.9, 01.11, 01.12; Mệnh đề 01.13, 01.15; Nhận xét 01.16 |
| Tập lồi | Định nghĩa 01.17; Mệnh đề 01.18, 01.19 |
| Hàm lồi | Định nghĩa 01.21, 01.23; Mệnh đề 01.24; Định lý 01.25, 01.29, 01.30; Hệ quả 01.26 |
| Toàn cục, tồn tại, duy nhất | Định lý 01.32, 01.34, 01.35, 01.38; Hệ quả 01.33, 01.41; Định nghĩa 01.37, 01.39, 01.42 |
| Chứng nhận | Mệnh đề 01.44, 01.45, 01.46; Thuật toán 01.47 |

Các công thức cần nhớ là (4.3), (4.6), (6.1), (7.1), (7.2) và (7.3). Các giả thiết sau cần nhớ:

- Định lý 01.25 và Định lý 01.29 cần miền mở; Định lý 01.32 cần cả miền lồi và hàm lồi; Định lý 01.35 cần miền không rỗng, đóng và bị chặn.
- Lồi chặt (Định lý 01.34) chỉ cho "nhiều nhất một" nghiệm; tồn tại cần Định lý 01.35, Định lý 01.38 hoặc Hệ quả 01.41.
- Hessian xác định dương tại mọi điểm không thay được lồi mạnh (Nhận xét 01.43).
- Hệ quả 01.26 chỉ cho chiều đủ; chiều cần "nghiệm thì gradient bằng $0$" là Định lý 00.42 và chỉ đúng tại điểm trong của miền mở.
- Công thức $(X^TX)^{-1}X^Ty$ cần $\operatorname{rank}(X)=d$.

## 11. Bài tập

Các bài tập trong thân bài và mục tiêu học tập mà mỗi bài kiểm tra:

1. **Bài tập 01.1** (Điều khiển một bước với hai biên độ): mục tiêu 2; nghiệm biên và điều kiện $q'(u^*)\Delta\ge0$.
2. **Bài tập 01.2** (Phương trình chuẩn với cột quy tâm): mục tiêu 2; giải (4.6).
3. **Bài tập 01.3** (Phần dư tại nghiệm bình phương nhỏ nhất): mục tiêu 2; đọc phương trình chuẩn theo hàng.
4. **Bài tập 01.4** (Hồi quy logistic một chiều không hệ số chặn): mục tiêu 2, 4; có và không có nghiệm.
5. **Bài tập 01.5** (Phân loại cực tiểu trên một đoạn): mục tiêu 4; cực tiểu trên biên.
6. **Bài tập 01.6** (Trạm cấp nước): mục tiêu 1, 4; lập mô hình, miền lồng nhau.
7. **Bài tập 01.7** (Nhận dạng tập lồi): mục tiêu 3; phép ghép hoặc phản ví dụ.
8. **Bài tập 01.8** (Tập trên parabol): mục tiêu 3; kiểm (6.1) trực tiếp.
9. **Bài tập 01.9** (Tập mức dưới lồi, hàm không lồi): mục tiêu 3; chiều ngược sai.
10. **Bài tập 01.10** (Điều kiện bậc nhất và điều kiện (7.3)): mục tiêu 3, 4; nghiệm trên hộp.
11. **Bài tập 01.11** (Tiêu chuẩn Hessian): mục tiêu 3; dấu giá trị riêng.
12. **Bài tập 01.12** (Hàm cưỡng bức không lồi): mục tiêu 4; tồn tại không cần lồi.
13. **Bài tập 01.13** (Bình phương nhỏ nhất với tham số không âm): mục tiêu 2, 4, 5; quy trình chứng nhận.

Các bài tập tiếp theo củng cố toàn bài, chia theo ba mức.

### 11.1. Mức nhận biết

::: exercise Bài tập 01.14 (Lập lịch sạc pin)
Một trạm sạc chọn công suất sạc $p_j$ trong $T$ giờ, $j=1,\ldots,T$, với $0\le p_j\le p_{\max}$, sao cho tổng năng lượng $\sum_jp_j=E$. Giá điện giờ $j$ là $c_j\ge0$, và độ thay đổi công suất bị phạt với hệ số $\gamma\ge0$. Chi phí là $\sum_{j=1}^Tc_jp_j+\gamma\sum_{j=2}^T(p_j-p_{j-1})^2$.

(a) Chỉ ra dữ kiện, biến quyết định, hàm mục tiêu và miền khả thi.

(b) Chứng nhận miền lồi và mục tiêu lồi, nêu căn cứ.
:::

::: hint
Miền là giao của một hộp và một tập affine. Mỗi hạng $(p_j-p_{j-1})^2$ là hợp của $\xi\mapsto\xi^2$ với một ánh xạ tuyến tính.
:::

::: solution
**(a)** Dữ kiện: $T$, $p_{\max}\ge0$, $E$, $c\in\mathbb R^T$, $\gamma\ge0$. Biến: $p\in\mathbb R^T$. Mục tiêu: $f_0(p)=c^Tp+\gamma\sum_{j\ge2}(p_j-p_{j-1})^2$. Miền: $C=\{p\mid0\le p_j\le p_{\max}\ \forall j,\ \mathbb 1^Tp=E\}$.

**(b) Miền lồi.** $C$ là giao của một hộp (Mệnh đề 01.18(d)) và tập affine $\{\mathbb 1^Tp=E\}$ (Mệnh đề 01.18(b)), lồi theo Mệnh đề 01.19(a). $C$ không rỗng khi và chỉ khi $0\le E\le Tp_{\max}$.

**(b) Mục tiêu lồi.** $c^Tp$ affine nên lồi. Mỗi $(p_j-p_{j-1})^2$ lồi theo Định lý 01.30(b). Tổng với hệ số $1$ và $\gamma\ge0$ lồi theo Định lý 01.30(a).

**Kiểm tra lại.** Khi $0\le E\le Tp_{\max}$, điểm $p=(E/T)\mathbb 1$ có $0\le p_j\le p_{\max}$ và $\mathbb 1^Tp=E$, nên thuộc $C$; với $p$ hằng, hạng phạt bằng $0$ và $f_0(p)=(E/T)\sum_jc_j$.
:::

::: exercise Bài tập 01.15 (Đúng hay sai)
Với mỗi phát biểu, xác định đúng hay sai; nếu đúng, dẫn số hiệu kết quả; nếu sai, cho phản ví dụ.

(a) Hàm lồi chặt trên $\mathbb R$ luôn có điểm cực tiểu.

(b) Nếu $f:\mathbb R^d\to\mathbb R$ lồi, khả vi và $\nabla f(x^*)=0$ thì $x^*$ là cực tiểu toàn cục.

(c) Một bài toán với miền lồi và mục tiêu lồi có thể có đúng hai nghiệm.

(d) Hàm liên tục trên tập đóng, không rỗng luôn đạt giá trị nhỏ nhất.
:::

::: hint
Mỗi phát biểu ứng với một kết quả về hàm lồi, sự tồn tại hoặc tính duy nhất; tìm giả thiết bị thiếu.
:::

::: solution
- **(a) Sai.** $e^x$ lồi chặt trên $\mathbb R$ và không đạt cận dưới đúng $0$.
- **(b) Đúng.** Hệ quả 01.26 với $C=D=\mathbb R^d$.
- **(c) Sai.** Theo Hệ quả 01.33, tập nghiệm lồi, nên nếu chứa hai điểm thì chứa cả đoạn nối, tức vô số điểm.
- **(d) Sai.** $e^x$ trên tập đóng $\mathbb R$; thiếu giả thiết bị chặn của Định lý 01.35 hoặc giả thiết cưỡng bức của Định lý 01.38.

**Kiểm tra lại.** Ở (c), hàm hằng $0$ trên $[-1,1]$ lồi và có tập nghiệm $[-1,1]$, vô số điểm, đúng với Hệ quả 01.33.
:::

### 11.2. Mức tính toán hoặc chứng minh

::: exercise Bài tập 01.16 (Điều khiển với cận không đối xứng)
Bộ chấp hành chỉ cho phép $u\in[-1,2]$. Cho $x_0=2$, $t=-4$, $\lambda=1$ và $q(u)=(x_0+u-t)^2+\lambda u^2$. Tính $u_{\mathrm{free}}$ theo (4.2), đoán nghiệm $u^*$ bằng cách cắt về đầu mút gần nhất, rồi chứng minh nó là nghiệm bằng (7.3); tính $x_1=x_0+u^*$ và $q(u^*)$.
:::

::: hint
Tính $q'(u^*)$ và xác định chiều dịch chuyển được phép từ đầu mút; $q$ lồi theo Ví dụ 01.14(a).
:::

::: solution
**Đoán nghiệm.** $u_{\mathrm{free}}=(-4-2)/2=-3<-1$, nên đầu mút gần nhất là $u^*=-1$ và $x_1=2-1=1$.

**Kiểm tra (7.3).** $q'(u)=2(x_0+u-t)+2\lambda u$ cho $q'(-1)=2\cdot5-2=8$. Với $u\in[-1,2]$, $q'(-1)(u+1)=8(u+1)\ge0$. Theo Hệ quả 01.26 ($q$ lồi trên $\mathbb R$), $u^*=-1$ là nghiệm, duy nhất vì $q$ lồi chặt (Định lý 01.34).

**Kiểm tra lại.** $q(-1)=(2-1+4)^2+1=26$, và theo (4.4), $2(-1+3)^2+\tfrac{36}2=8+18=26$.
:::

::: exercise Bài tập 01.17 (Hessian xác định dương nhưng không có nghiệm)
Cho $f(x)=(x_1+x_2)^2+e^{x_1}$ trên $\mathbb R^2$.

(a) Chứng minh $\nabla^2f(x)\succ0$ với mọi $x$, nên $f$ lồi chặt.

(b) Chứng minh $\inf f=0$ và không được đạt.

(c) Chỉ ra giả thiết nào của Hệ quả 01.41 và Định lý 01.38 bị vi phạm.
:::

::: hint
Ở (b), xét $f$ dọc đường thẳng $x=(-\tau,\tau)$ khi $\tau\to+\infty$.
:::

::: solution
**(a)** $\nabla^2f(x)=\begin{bmatrix}2+e^{x_1}&2\\2&2\end{bmatrix}$ có định thức $\lambda_1\lambda_2=2(2+e^{x_1})-4=2e^{x_1}>0$ và vết $\lambda_1+\lambda_2=4+e^{x_1}>0$ (hệ thức sau Định lý 00.16), nên hai giá trị riêng cùng dương. Vậy $\nabla^2f\succ0$ (Mệnh đề 00.18) và $f$ lồi chặt theo Định lý 01.29(b).

**(b)** $f(x)>0$ vì $e^{x_1}>0$. Dọc $x=(-\tau,\tau)$, $f=e^{-\tau}\to0$. Vậy $\inf f=0$, không đạt.

**(c)** $\lambda_{\min}\lambda_{\max}=2e^{x_1}$ và $\lambda_{\max}\ge\tfrac12\operatorname{tr}\ge2$, nên $\lambda_{\min}\le e^{x_1}\to0$ khi $x_1\to-\infty$: không có $\mu>0$ với $\nabla^2f\succeq\mu I_2$, tức $f$ không lồi mạnh (Nhận xét 01.40). $f$ không cưỡng bức, vì $\lVert(-\tau,\tau)\rVert_2\to\infty$ mà $f\to0$.

**Kiểm tra lại.** Tại $x=(-5,5)$, $f=e^{-5}\approx0{,}0067>0$; tại $x=(0,0)$, $f=1$.
:::

::: exercise Bài tập 01.18 (Máy vector hỗ trợ lề mềm)
Mục tiêu của *máy vector hỗ trợ lề mềm* (soft-margin SVM) trên dữ liệu $(a_i,y_i)$, $a_i\in\mathbb R^d$, $y_i\in\{-1,+1\}$, với $\mu>0$, là $G$ dưới đây. Chứng minh bài toán $\min_{w\in\mathbb R^d}G(w)$ với $G(w)=\sum_{i=1}^n\ell_{\mathrm{hinge}}(y_ia_i^Tw)+\tfrac\mu2\lVert w\rVert_2^2$ có đúng một nghiệm. Giải thích vì sao không dùng được Hệ quả 01.41 trực tiếp.
:::

::: hint
Tách chứng minh thành ba phần: lồi chặt (Định lý 01.30), liên tục và cưỡng bức, rồi Định lý 01.38 và Định lý 01.34.
:::

::: solution
**Bước 1 (lồi chặt).** Mỗi hạng $\ell_{\mathrm{hinge}}(y_ia_i^Tw)=\max(0,1-y_ia_i^Tw)$ là cực đại của hai hàm affine theo $w$, lồi theo Định lý 01.30(c). Hạng $\tfrac\mu2\lVert w\rVert_2^2$ lồi chặt (Hessian $\mu I_d\succ0$). Theo Định lý 01.30(a), $G$ lồi chặt.

**Bước 2 (liên tục và cưỡng bức).** $G$ liên tục vì là tổng và cực đại của các hàm liên tục. Mỗi hạng bản lề không âm, nên $G(w)\ge\tfrac\mu2\lVert w\rVert_2^2\to\infty$: $G$ cưỡng bức.

**Bước 3 (tồn tại và duy nhất).** Định lý 01.38 trên miền đóng $\mathbb R^d$ cho nghiệm tồn tại, Định lý 01.34 cho duy nhất. Hệ quả 01.41 giả thiết hàm khả vi, mà hạng bản lề không khả vi tại $y_ia_i^Tw=1$.

**Kiểm tra lại.** Với hai mẫu của Ví dụ 01.7 và $\mu=1$, $G(w)=2\max(0,1-w)+\tfrac12w^2$: trên $[0,1]$, $G'(w)=w-2<0$; trên $[1,\infty)$, $G'(w)=w>0$; trên $(-\infty,0]$, $G'(w)=w-2<0$. Nghiệm duy nhất là $w=1$ với $G(1)=\tfrac12<G(0)=G(2)=2$.
:::

### 11.3. Mức vận dụng

::: exercise Bài tập 01.19 (Hồi quy ridge)
Với $X=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix}$, $y=(1,2,2)^T$ của Ví dụ 01.5 (nghiệm không chính quy hóa $w^*=(7/6,1/2)^T$, $J(w^*)=\tfrac16$), xét $J_\mu(w)=\lVert Xw-y\rVert_2^2+\tfrac\mu2\lVert w\rVert_2^2$ của Định nghĩa 01.42.

(a) Chứng minh với mọi $X$ và mọi $\mu>0$, $J_\mu$ có đúng một nghiệm, là nghiệm của $(X^TX+\tfrac\mu2I_d)w=X^Ty$.

(b) Với $\mu=2$, tính nghiệm, rồi so với $w^*$ về chuẩn và về $J$.
:::

::: hint
$\nabla^2J_\mu=2X^TX+\mu I_d$. Ở (b), giải hệ $2\times2$.
:::

::: solution
**(a) Tồn tại và duy nhất.** $\nabla^2J_\mu=2X^TX+\mu I_d\succeq\mu I_d$, nên $J_\mu$ lồi mạnh với hằng số $\mu$ (Nhận xét 01.40), và Hệ quả 01.41 cho đúng một nghiệm.

**(a) Phương trình nghiệm.** $\nabla J_\mu(w)=2X^T(Xw-y)+\mu w$, nên $\nabla J_\mu(w)=0$ tương đương $(X^TX+\tfrac\mu2I_d)w=X^Ty$. Ma trận $X^TX+\tfrac\mu2I_d$ xác định dương, vì $v^T(X^TX+\tfrac\mu2I_d)v=\lVert Xv\rVert_2^2+\tfrac\mu2\lVert v\rVert_2^2>0$ với $v\ne0$, nên khả nghịch (Hệ quả 00.19) và hệ có đúng một nghiệm $\bar w$. Theo Hệ quả 01.26, $\bar w$ là cực tiểu toàn cục, nên trùng với nghiệm duy nhất.

**(b) Tính.** Với $\mu=2$: $X^TX+I_2=\begin{bmatrix}4&3\\3&6\end{bmatrix}$, $X^Ty=(5,6)^T$, định thức $15$, nên
$$
\begin{aligned}
\bar w&=\tfrac1{15}\begin{bmatrix}6&-3\\-3&4\end{bmatrix}\begin{bmatrix}5\\6\end{bmatrix}\\
&=(0{,}8;\ 0{,}6).
\end{aligned}
$$
Chuẩn bình phương giảm từ $\tfrac{49}{36}+\tfrac14\approx1{,}611$ xuống $0{,}64+0{,}36=1$. Dự đoán $(0{,}8;\ 1{,}4;\ 2{,}0)$, phần dư $(-0{,}2;\ -0{,}6;\ 0)$, $J(\bar w)=0{,}4>\tfrac16$. Chính quy hóa làm giảm chuẩn tham số và làm tăng sai số huấn luyện; nó không co từng hệ số, vì hệ số góc tăng từ $0{,}5$ lên $0{,}6$.

**Kiểm tra lại.** $4\cdot0{,}8+3\cdot0{,}6=5$ và $3\cdot0{,}8+6\cdot0{,}6=6$.
:::

::: exercise Bài tập 01.20 (Trung bình hai mô hình)
(a) Với $L(w)=2\log(1+e^{-w})$ của Ví dụ 01.7 ($L(0)\approx1{,}3863$, $L(1)\approx0{,}6265$, $L(2)\approx0{,}2539$) và hai mô hình $w_a=0$, $w_b=2$, so sánh $L(\tfrac{w_a+w_b}2)$ với $\tfrac12L(w_a)+\tfrac12L(w_b)$ và chỉ ra kết quả nào bảo đảm chiều bất đẳng thức.

(b) Với mạng của Tình huống 01.3, $F(w_{\mathrm r},w_{\mathrm v})=(w_{\mathrm r}\tanh w_{\mathrm v}-\tfrac12)^2$ và hai nghiệm $\pi^{(1)}=(1,b_0)$, $\pi^{(2)}=(-1,-b_0)$, $b_0=\operatorname{artanh}\tfrac12$, lấy trung bình hai nghiệm và tính mất mát.

(c) Giải thích sự khác nhau.
:::

::: hint
Dùng bảng của Ví dụ 01.7 và giá trị $F(0,0)$ của Tình huống 01.3.
:::

::: solution
**(a)** $L(1)\approx0{,}6265$ và $\tfrac12(1{,}3863+0{,}2539)=0{,}8201$, nên $L(1)<\tfrac12L(0)+\tfrac12L(2)$. Chiều này được bảo đảm bởi (7.1) với $\theta=\tfrac12$, vì $L$ lồi (Ví dụ 01.15(b)).

**(b)** Trung bình của $\pi^{(1)}$ và $\pi^{(2)}$ là $(0,0)$, với $F(0,0)=\tfrac14$, trong khi cả hai mô hình có mất mát $0$.

**(c)** Mất mát của mạng không lồi theo tham số, nên (7.1) không được bảo đảm, và trộn tham số của hai mạng có mất mát $0$ cho một mạng có mất mát lớn hơn. Trộn dự đoán của hai mạng cho kết quả khác: dự đoán trung bình $\tfrac12(\tfrac12+\tfrac12)=\tfrac12$ vẫn đúng, vì mất mát lồi theo dự đoán.

**Kiểm tra lại.** $\pi^{(1)}$: $1\cdot\tanh(0{,}5493)=0{,}5000$, nên $F(\pi^{(1)})=0$; $(0,0)$: $(0-\tfrac12)^2=\tfrac14$.
:::

::: exercise Bài tập 01.21 (Ràng buộc chuẩn thay cho chính quy hóa)
Với dữ liệu tách được của Ví dụ 01.7, thay vì chính quy hóa, giới hạn độ lớn tham số: $\min_{\lvert w\rvert\le R}L(w)$ với $L(w)=2\log(1+e^{-w})$ và $R>0$.

(a) Chứng nhận bài toán có đúng một nghiệm với mọi $R>0$.

(b) Chứng minh nghiệm là $w^*=R$ bằng (7.3).

(c) Với $R=2$, tính giá trị tối ưu và xác suất đúng nhãn $\sigma(w^*)$, rồi so với Tình huống 01.1 khi $\mu=0{,}1$.
:::

::: hint
Miền là một đoạn; $L'(w)=-2/(1+e^w)<0$. Dùng bảng của Ví dụ 01.7.
:::

::: solution
**(a) Tồn tại.** Miền $[-R,R]$ không rỗng, đóng, bị chặn và lồi (Ví dụ 01.11(a)); $L$ liên tục, nên Định lý 01.35 cho nghiệm tồn tại.

**(a) Duy nhất.** $L''(w)=2e^w/(1+e^w)^2>0$, nên $L$ lồi chặt trên $\mathbb R$ (Bổ đề 01.28(b)) và trên đoạn (Nhận xét 01.22); Định lý 01.34 cho nghiệm duy nhất.

**(b)** $L'(R)=-2/(1+e^R)<0$, và với $w\in[-R,R]$, $w-R\le0$, nên $L'(R)(w-R)\ge0$. Theo Hệ quả 01.26, $w^*=R$ là nghiệm.

**(c)** $L(2)\approx0{,}2539$ và $\sigma(2)=1/(1+e^{-2})\approx0{,}8808$. Tình huống 01.1 với $\mu=0{,}1$ cho $w^*_\mu\approx2{,}128$ và $\sigma\approx0{,}8936$, gần với ràng buộc $R=2$. Cả hai cách giữ tham số hữu hạn: một cách bằng số hạng phạt trong mục tiêu, một cách bằng biên của miền.

**Kiểm tra lại.** $L(1{,}9)=2\log(1+e^{-1{,}9})\approx0{,}2788>L(2)$, đúng với $L$ giảm chặt trên đoạn.
:::

Bài tập 01.22–01.34, lấy từ Boyd và Vandenberghe (2004), có gợi ý và lời giải, nằm trong [tệp bài tập của Bài 01](material-viewer.html?doc=materials/lec-01/exercises.md&deck=lecture-01-gioi-thieu-toi-uu-tap-loi-ham-loi.html).

## 12. Câu hỏi cuối buổi và cầu nối

**Câu hỏi.** Với hai mẫu $(a_1,y_1)=(1,+1)$, $(a_2,y_2)=(-1,-1)$ của Câu hỏi mở đầu, thay mất mát logistic bằng mất mát bản lề: $L_{\mathrm{hinge}}(w)=\ell_{\mathrm{hinge}}(m_1)+\ell_{\mathrm{hinge}}(m_2)$. Xác định ba kết luận (toàn cục, tồn tại, duy nhất) cho bài toán $\min_{w\in\mathbb R}L_{\mathrm{hinge}}(w)$, nêu kết quả dùng cho mỗi kết luận.

::: solution Lời giải câu hỏi cuối buổi
**Mục tiêu.** $m_1=m_2=w$, nên $L_{\mathrm{hinge}}(w)=2\max(0,1-w)$.

**Toàn cục.** $L_{\mathrm{hinge}}$ lồi (Ví dụ 01.15(c), Định lý 01.30(a)), nên mọi cực tiểu địa phương là toàn cục (Định lý 01.32).

**Tồn tại.** $L_{\mathrm{hinge}}\ge0$ và $L_{\mathrm{hinge}}(w)=0$ khi $w\ge1$, nên nghiệm tồn tại, $p^*=0$ và $S^*=[1,+\infty)$; tập nghiệm lồi đúng Hệ quả 01.33 và không bị chặn. $L_{\mathrm{hinge}}$ không cưỡng bức, nên Định lý 01.38 không áp dụng; sự tồn tại suy ra trực tiếp.

**Duy nhất.** Nghiệm không duy nhất: $L_{\mathrm{hinge}}$ hằng trên $[1,+\infty)$, nên không lồi chặt và Định lý 01.34 không áp dụng.

**Kiểm tra lại.** $L_{\mathrm{hinge}}(1)=L_{\mathrm{hinge}}(5)=0$ và $L_{\mathrm{hinge}}(0)=2$.
:::

Với một bài toán có nhiều ràng buộc và không có công thức đóng, chúng ta cần nhận dạng lớp của bài toán và một phương pháp giải. Bài 02 xếp các bài toán vào các lớp chuẩn (quy hoạch tuyến tính, bậc hai, hình học) và đưa bài toán cực tiểu tổng mất mát bản lề về quy hoạch tuyến tính bằng biến phụ. Bài 03 dùng nhân tử Lagrange để thay (7.3) bằng điều kiện Karush–Kuhn–Tucker, một hệ hữu hạn phương trình và bất phương trình. Bài 04 xây dựng phương pháp Newton cho bài toán không ràng buộc và bài toán ràng buộc đẳng thức. Bài 05b xét tốc độ của hạ gradient, trong đó hệ số co của hội tụ tuyến tính phụ thuộc tỉ số giữa hằng số lồi mạnh $\mu$ và hằng số Lipschitz của gradient; Bài 06b và 06c xét các phương pháp tối ưu cho mạng sâu, nơi giả thiết lồi bị vi phạm.

## 13. Tài liệu đọc

- **Trước buổi học:** Boyd, Stephen; Vandenberghe, Lieven (2004), *Convex Optimization*, Cambridge University Press: §1.1–1.2.1 (tr. 1–6: bài toán tối ưu, bình phương nhỏ nhất), §2.1 (tr. 21–26: tập affine, tập lồi, tổ hợp lồi), §3.1.1 (tr. 67–68: định nghĩa hàm lồi, hạn chế lên đường thẳng).
- **Sau buổi học:**
  - Boyd và Vandenberghe (2004): §2.2.1–2.2.3 (tr. 27–31: siêu phẳng, nửa không gian, quả cầu), §2.3.1–2.3.2 (tr. 36–39: giao, ảnh và nghịch ảnh affine), §3.1.3–3.1.4 (tr. 69–71: điều kiện bậc nhất và bậc hai), §3.1.6 (tr. 75: tập mức dưới), §3.2.1–3.2.3 (tr. 79–81: phép toán bảo toàn tính lồi), §4.1.1 (tr. 127–128: bài toán tối ưu, giá trị tối ưu), §4.2.2–4.2.3 (tr. 138–140: địa phương và toàn cục, điều kiện tối ưu cho hàm khả vi), §6.3.2 (tr. 306: chính quy hóa), §8.6.1 (tr. 423–429: phân loại tuyến tính có lề), §9.1.2 (tr. 459: lồi mạnh).
  - Murphy, Kevin P. (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press, bản trực tuyến của tác giả: §8.1.1 (tối ưu địa phương và toàn cục), §8.1.3 (tối ưu lồi và không lồi), §10.2.1 (bộ phân loại tuyến tính), §10.2.3 (hợp lý cực đại cho hồi quy logistic), §8.1.3.4 (hàm lồi mạnh), §10.2.7 (ước lượng MAP và chính quy hóa $\ell_2$).
  - Rudin, Walter (1976), *Principles of Mathematical Analysis*, ấn bản 3, McGraw-Hill: Định lý 2.41 (tr. 40) và Định lý 4.16 (tr. 89), dùng cho Định lý 01.35.
- **Mở rộng:** Boyd, Stephen; Vandenberghe, Lieven, slide bài giảng cho MIT OpenCourseWare 6.079/6.975 *Introduction to Convex Optimization* (Boyd, Parrilo, 2009): lec01 (mô hình tối ưu, bài toán chiếu sáng tr. 1–9 đến 1–12, tối ưu địa phương và toàn cục tr. 1–14), lec02 (tập lồi, tr. 2–3 đến 2–13), lec03 (hàm lồi, tr. 3–2 đến 3–15); tài liệu theo giấy phép CC BY-NC-SA 4.0.
