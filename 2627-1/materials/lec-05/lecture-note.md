# Bài 05 — Các phương pháp tối ưu trong huấn luyện mô hình học sâu

## Mục tiêu học tập

Các mục tiêu sau là minh chứng bộ phận của ba chuẩn đầu ra bài học (LLO) của buổi 5:

- LLO11 đóng góp chuẩn đầu ra học phần CLO1: phân biệt mục tiêu huấn luyện với đánh giá và nhận diện các trở ngại của tối ưu trong học sâu;
- LLO12 và LLO13 đóng góp CLO2: thực hiện các phép cập nhật bằng gradient nhóm, momentum, Nesterov và khởi tạo tham số có căn cứ.

Sau chương này, người học có thể:

1. Phân biệt mất mát huấn luyện, rủi ro kỳ vọng, mất mát xác thực và mất mát kiểm thử; giải thích vì sao bản lưu được chọn theo tập xác thực và vì sao giá trị xác thực của bản được chọn lệch về phía lạc quan (LLO11; CLO1).
2. Phân loại một điểm dừng của hàm không lồi bằng Hessian và nêu giới hạn của tiêu chí dừng theo chuẩn gradient (LLO11; CLO1).
3. Tính gradient nhóm, chứng minh nó là ước lượng không chệch của gradient đầy đủ với hiệp phương sai $\Sigma/b$, tính sai số chuẩn, một bước hạ gradient ngẫu nhiên (stochastic gradient descent, SGD) và kỳ vọng thay đổi của mất mát sau bước đó (LLO12; CLO2).
4. Xác định điều kiện co của bước gradient trên hàm bậc hai, tính các bước momentum và Nesterov, viết hai phương pháp thành hệ tuyến tính hai biến và xác định miền bước học làm hệ hội tụ (LLO11, LLO12; CLO1, CLO2).
5. Tính đạo hàm của một mạng nhỏ bằng quy tắc dây chuyền, chứng minh tính đối xứng giữa hai đơn vị ẩn được bảo toàn qua các bước lặp và giải thích vì sao khởi tạo ngẫu nhiên phá được đối xứng (LLO13; CLO2).
6. Suy ra phương sai của tín hiệu chiều tiến và của gradient chiều lùi qua một lớp tuyến tính, suy ra quy tắc khởi tạo Glorot và nêu các giả thiết của nó (LLO13; CLO2).
7. Phối hợp các quyết định về mục tiêu, gradient, quy tắc cập nhật và khởi tạo thành một quy trình huấn luyện, rồi chẩn đoán một phiên huấn luyện cụ thể (LLO11–LLO13; CLO1, CLO2).

## Kiến thức tiên quyết

Số hiệu `01.k`, `04.k`, `05b.k` và `05c.k` chỉ ghi chú Bài 01, Bài 04 và hai ghi chú bổ trợ Bài 05b, Bài 05c. Ghi chú Bài 00 không đánh số, nên các kết quả của nó được phát biểu lại.

- **Giải tích** (Bài 00). Với $F:\mathbb R^p\to\mathbb R$ khả vi hai lần liên tục, $F(\theta+\Delta)=F(\theta)+\nabla F(\theta)^T\Delta+\tfrac12\Delta^T\nabla^2F(\theta)\Delta+o(\lVert\Delta\rVert_2^2)$, và với $F$ bậc hai đẳng thức đúng không có phần dư. Đạo hàm của hàm hợp là tích các đạo hàm dọc chuỗi hợp (quy tắc dây chuyền). Nếu $\theta$ là cực tiểu địa phương của $F$ khả vi thì $\nabla F(\theta)=0$.
- **Xác suất** (Bài 00; Định lý 05c.35). Kỳ vọng tuyến tính; $\operatorname{Var}(aX)=a^2\operatorname{Var}X$; nếu $X$, $Y$ độc lập thì $\mathbb E[XY]=\mathbb EX\,\mathbb EY$. Hiệp phương sai của vectơ ngẫu nhiên $U$ là $\mathbb E[(U-\mathbb EU)(U-\mathbb EU)^T]$, có vết bằng $\mathbb E\lVert U-\mathbb EU\rVert_2^2$. Trung bình của $n$ biến không tương quan đôi một, cùng kỳ vọng và cùng phương sai có cùng kỳ vọng và phương sai chia cho $n$.
- **Số phức.** Số phức $\zeta=\operatorname{Re}\zeta+\mathrm i\operatorname{Im}\zeta$, với $\mathrm i$ là đơn vị ảo, $\mathrm i^2=-1$, có môđun $\lvert\zeta\rvert=\sqrt{(\operatorname{Re}\zeta)^2+(\operatorname{Im}\zeta)^2}$ và viết được dưới dạng $\lvert\zeta\rvert(\cos\varpi+\mathrm i\sin\varpi)$, với $\varpi$ là góc của $\zeta$; môđun của tích bằng tích các môđun. Đa thức bậc hai hệ số thực có hai nghiệm phức liên hợp khi biệt thức âm.
- **Tính lồi** (Hệ quả 01.27, Định lý 01.30, Định nghĩa 01.39, Nhận xét 01.40, Mệnh đề 04.2(a)). Với $F$ lồi khả vi trên $\mathbb R^p$, $\nabla F(\theta^*)=0$ vừa cần vừa đủ cho cực tiểu toàn cục. Hàm khả vi hai lần là lồi khi và chỉ khi Hessian nửa xác định dương mọi nơi, và lồi mạnh với hằng số $\mu>0$ khi và chỉ khi $\nabla^2F\succeq\mu \mathrm I$ mọi nơi.
- **Mất mát logistic** (Định nghĩa 01.8, Mệnh đề 01.9). Với biên có dấu $m$, mất mát $\log(1+\exp(-m))$ có đạo hàm bậc hai thuộc $(0,\tfrac14]$.
- **Gradient Lipschitz** (Định nghĩa 04.17, Bổ đề 04.18, Nhận xét 04.19). $\nabla F$ là $L$-Lipschitz nếu $\lVert\nabla F(\theta)-\nabla F(\theta')\rVert_2\le L\lVert\theta-\theta'\rVert_2$ với mọi $\theta,\theta'$; khi đó $F(\theta')\le F(\theta)+\nabla F(\theta)^T(\theta'-\theta)+\tfrac L2\lVert\theta'-\theta\rVert_2^2$. Với $F$ lồi khả vi hai lần, $\nabla^2F\preceq L\mathrm I$ mọi nơi là đủ.
- **Giảm gradient** (Bổ đề 04.20, Định lý 04.26, Nhận xét 04.13). Với bước $\eta\in(0,\tfrac1L]$, một bước gradient làm $F$ giảm ít nhất $\tfrac\eta2\lVert\nabla F\rVert_2^2$; nếu thêm $F$ lồi mạnh thì bước $\tfrac1L$ cho sai số co theo hệ số $1-\mu/L$. Trên hàm bậc hai, bước cố định nhân thành phần theo vectơ riêng thứ $i$ của Hessian với $1-\eta\lambda_i$.
- **Hai ví dụ của Bài 04.** Ví dụ 04.7 chạy bước $\tfrac14$ trên chính hàm $q$ của Mục 3. Tình huống 04.3 cho hàm $\tfrac12(ab-1)^2$ có gốc là điểm yên ngựa, nơi giảm gradient xuất phát trên đường chéo $a=-b$ dừng lại.

## Bảng ký hiệu

Bảng chỉ gồm ký hiệu dùng xuyên suốt chương; ký hiệu của một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ. Mỗi chữ trong bảng giữ một nghĩa trong cả chương.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $N$, $D$, $(x_i,y_i)$ | số quan sát huấn luyện; tập huấn luyện; quan sát thứ $i$ | $N\ge1$; $x_i\in\mathbb R^d$, $y_i\in\mathcal Y$ |
| $d$, $p$ | số đặc trưng; số tham số | số nguyên dương |
| $\theta$, $[\theta]_i$, $\theta_t$, $\theta^*$ | tham số; tọa độ thứ $i$ của nó; tham số ở vòng lặp $t$; một điểm cực tiểu của $J$ | $\mathbb R^p$; $\mathbb R$; $\mathbb R^p$; $\mathbb R^p$ |
| $f_\theta$, $\ell$, $\ell_i$ | mô hình dự đoán; hàm mất mát; mất mát trên quan sát $i$ | $\mathbb R^d\to\mathcal Z$; $\mathcal Z\times\mathcal Y\to\mathbb R_{\ge0}$; $\mathbb R^p\to\mathbb R_{\ge0}$ |
| $J$, $R$ | mất mát huấn luyện; rủi ro kỳ vọng | $\mathbb R^p\to\mathbb R_{\ge0}$ |
| $F$ | hàm mục tiêu tổng quát trong các phát biểu không gắn với dữ liệu | $\mathbb R^p\to\mathbb R$ |
| $P$, $(X,Y)$ | phân phối dữ liệu; một cặp ngẫu nhiên theo $P$ | trên $\mathbb R^d\times\mathcal Y$ |
| $N_{\rm val}$, $\widehat R_{\rm val}$ | cỡ tập xác thực; mất mát xác thực | $N_{\rm val}\ge1$; $\mathbb R^p\to\mathbb R_{\ge0}$ |
| $g_i$, $\bar g$, $\widehat g$, $\widehat g_t$ | gradient mẫu $\nabla\ell_i$; gradient đầy đủ $\nabla J$; gradient nhóm; gradient nhóm ở vòng $t$ | $\mathbb R^p$ |
| $b$, $I_1,\ldots,I_b$, $C$ | cỡ nhóm; các chỉ số được rút; chi phí tính một gradient mẫu | $b\ge1$; $\{1,\ldots,N\}$; $C>0$ |
| $\Sigma(\theta)$ | hiệp phương sai của gradient một mẫu tại $\theta$ | ma trận $p\times p$, nửa xác định dương |
| $\eta$, $\eta_t$, $T$, $K_{\rm stop}$, $\varepsilon$ | bước học (learning rate); bước học ở vòng $t$; số vòng lặp tối đa; số lần chờ và ngưỡng cải thiện của quy tắc dừng sớm | $\eta>0$; $T,K_{\rm stop}\ge1$; $\varepsilon\ge0$ |
| $q$, $H$, $\lambda_i$ | hàm bậc hai ví dụ; Hessian của nó; giá trị riêng thứ $i$ của Hessian | $\mathbb R^p\to\mathbb R$; đối xứng; $\lambda_i>0$ |
| $L$, $\mu$, $\kappa$ | hằng số Lipschitz của gradient; hằng số lồi mạnh; số điều kiện $L/\mu$ | $0<\mu\le L$; $\kappa\ge1$ |
| $v_t$, $\beta$, $\widetilde\theta_t$ | vận tốc (velocity) ở vòng $t$; hệ số momentum; điểm dự báo $\theta_t+\beta v_t$ | $\mathbb R^p$; $0\le\beta<1$; $\mathbb R^p$ |
| $Q$, $\Lambda$ | ma trận trực giao có các cột là vectơ riêng của Hessian; ma trận chéo các giá trị riêng, $H=Q\Lambda Q^T$ | $\mathbb R^{p\times p}$ |
| $\chi_t$, $\zeta$, $\rho$ | tọa độ của $\theta_t-\theta^*$ trong cơ sở vectơ riêng của Hessian; nghiệm của đa thức đặc trưng; bán kính phổ, tức môđun lớn nhất của các nghiệm | $\mathbb R^p$; $\mathbb C$; $\rho\ge0$ |
| $x$, $y$, $w_j$, $c_j$, $a_j$ | đầu vào và nhãn của mạng hai đơn vị ẩn; trọng số vào, độ lệch, trọng số ra của đơn vị $j$ | số thực, $j\in\{1,2\}$ |
| $z_j$, $h_j$, $\phi$, $e$ | tiền kích hoạt; kích hoạt; hàm kích hoạt; sai số dự đoán $f_\theta(x)-y$ | số thực; $\phi:\mathbb R\to\mathbb R$ |
| $M$, $\gamma_k$, $h^{(k)}$ | số lớp; hệ số của lớp $k$ trong chuỗi tuyến tính; tín hiệu sau lớp $k$ | $M\ge1$; $\mathbb R$; $\mathbb R$ hoặc $\mathbb R^{n_k}$ |
| $W$, $n_{\rm in}$, $n_{\rm out}$, $s^2$, $\alpha$ | ma trận trọng số của một lớp; số đầu vào, số đầu ra; phương sai của mỗi trọng số; biên của phân phối đều $U[-\alpha,\alpha]$ khi khởi tạo | $\mathbb R^{n_{\rm out}\times n_{\rm in}}$; số nguyên dương; $s^2>0$; $\alpha>0$ |
| $\delta_z$, $\delta_h$ | gradient của mất mát theo tiền kích hoạt $z$ và theo đầu vào $h$ của lớp | $\mathbb R^{n_{\rm out}}$; $\mathbb R^{n_{\rm in}}$ |
| $V_h$, $V_\delta$, $V^{(k)}$ | phương sai mỗi thành phần của $h$; của $\delta_z$; của tín hiệu sau lớp $k$ | số dương |

Ba ví dụ xuyên suốt được giới thiệu tại chỗ và dùng lại ở nhiều mục:

- **ví dụ ba quan sát**: dữ liệu $y=(-1,1,3)$, mô hình hằng $f_\theta=\theta\in\mathbb R$, mất mát bình phương (Mục 1, 2);
- **hàm bậc hai $q$**: $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$ trên $\mathbb R^2$ với điểm đầu $\theta_0=(2,4)^T$, là ví dụ xuyên suốt VD1 của Bài 04 (Ví dụ 04.2–04.7) viết theo biến $\theta$ (Mục 3);
- **mạng hai đơn vị ẩn**: $f_\theta(x)=a_1\phi(w_1x+c_1)+a_2\phi(w_2x+c_2)$ với hàm kích hoạt tuyến tính chỉnh lưu (ReLU), dùng ở Mục 4.

Trong cả chương, $\log$ là logarit tự nhiên, $\exp$ là hàm mũ cơ số tự nhiên và $\mathrm I$ là ma trận đơn vị; chữ $e$ chỉ dùng cho sai số dự đoán, chữ $I$ có chỉ số chỉ dùng cho chỉ số được rút. Mọi bộ số của các ví dụ là số liệu sư phạm tự xây dựng, không phải kết quả đo trên dữ liệu thật.

## 1. Bài toán huấn luyện và tiêu chí đánh giá

Bài 04 kết thúc với các bảo đảm cho giảm gradient trên một hàm $F$ cho trước: theo Bổ đề 04.20, bước $\tfrac1L$ làm $F$ giảm ít nhất $\tfrac1{2L}\lVert\nabla F\rVert_2^2$, và theo Định lý 04.26, khi $F$ lồi mạnh, sai số co theo hệ số $1-\mu/L$ ở mỗi bước. Các kết quả đó dựa trên ba giả định ngầm: hàm cần cực tiểu đã được cho, gradient đầy đủ tính được ở mỗi bước, và điểm đầu không ảnh hưởng tới chất lượng của nghiệm vì hàm lồi.

Khi huấn luyện một mạng nơ ron, cả ba giả định đều phải xem lại. Hàm cần cực tiểu được dựng từ một tập dữ liệu hữu hạn, trong khi điều cần đạt là dự đoán tốt trên quan sát mới. Gradient đầy đủ là trung bình trên $N$ quan sát, với $N$ có thể tới hàng triệu. Mất mát của mạng không lồi, nên điểm đầu và cách tham số khởi đầu ảnh hưởng tới nơi thuật toán dừng lại.

Mục này xử lý giả định thứ nhất. Mục cho một định nghĩa chính xác của đại lượng được cực tiểu và của đại lượng cần đạt, một phép đo khoảng cách giữa hai đại lượng trên một mô hình nhỏ, một quy tắc chọn kết quả bằng dữ liệu tách riêng, và một phép phân loại điểm có gradient bằng $0$ khi hàm không lồi.

### 1.1 Nhu cầu: chọn một dự đoán từ dữ liệu hữu hạn

Bài toán nhỏ nhất có đủ các thành phần của huấn luyện gồm ba quan sát số thực và một dự đoán chung cho cả ba. Ví dụ sau tính dự đoán đó và chỉ ra câu hỏi mà phép tính chưa trả lời.

::: example Ví dụ 05.1 (Ba quan sát và mô hình hằng)
**Dữ kiện.**

Ba quan sát $y=(y_1,y_2,y_3)=(-1,1,3)$. Mô hình hằng $f_\theta=\theta$ gán cùng một dự đoán $\theta\in\mathbb R$ cho mọi quan sát. Mất mát bình phương trên quan sát thứ $i$ là $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$; hệ số $\tfrac12$ làm đạo hàm gọn thành $\theta-y_i$.

**Mất mát trung bình.**

Trung bình của ba mất mát riêng là

$$
J(\theta)=\frac13\sum_{i=1}^3\ell_i(\theta)=\frac16\bigl[(\theta+1)^2+(\theta-1)^2+(\theta-3)^2\bigr].
$$

Khai triển ba bình phương cho $\tfrac16(3\theta^2-6\theta+11)=\tfrac12\theta^2-\theta+\tfrac{11}6$. Hoàn thành bình phương:

$$
J(\theta)=\frac12(\theta-1)^2+\frac43 .
\tag{1.1}
$$

**Nghiệm.**

Dạng (1.1) cho thấy $J$ đạt cực tiểu duy nhất tại $\theta^*=1$, đúng bằng trung bình mẫu $\tfrac{-1+1+3}3$, với giá trị $J(\theta^*)=\tfrac43$. Tại nghiệm, ba mất mát riêng là $2$, $0$, $2$.

**Kiểm tra lại.**

Tại $\theta=0$, định nghĩa cho $J(0)=\tfrac16(1+1+9)=\tfrac{11}6$, còn (1.1) cho $\tfrac12+\tfrac43=\tfrac{11}6$.
:::

Công thức (1.1) đọc như sau: mất mát trung bình bằng nửa bình phương khoảng cách từ dự đoán tới trung bình mẫu, cộng với một hằng số. Hằng số $\tfrac43$ là nửa phương sai thực nghiệm của ba quan sát, tức phương sai tính với mẫu số $N=3$, nên không mô hình hằng nào làm nó nhỏ hơn. Cực tiểu của mất mát trung bình không làm từng mất mát riêng bằng $0$, vì ba quan sát không trùng nhau.

![Trục số dọc với ba quan sát tại −1, 1 và 3 (chấm tròn) và vạch ngang tại dự đoán θ = 1. Hai mũi tên chỉ sai số có dấu θ − y bằng 2 với quan sát −1 và bằng −2 với quan sát 3; quan sát 1 có sai số 0.](img/lec-05/observations.svg)

Hình đặt ba quan sát trên một trục và vạch dự đoán $\theta=1$. Hai sai số có dấu $\theta-y_1=2$ và $\theta-y_3=-2$ có độ lớn bằng nhau và ngược dấu, nên dịch vạch theo hướng nào cũng làm tổng bình phương tăng; đó là nội dung của (1.1).

Ví dụ 05.1 trả lời câu hỏi "dự đoán nào khớp ba quan sát đã có tốt nhất". Nó chưa trả lời câu hỏi cần thiết hơn khi dùng mô hình: dự đoán $\theta=1$ sai bao nhiêu trên một quan sát thứ tư chưa thấy. Câu hỏi đó cần một giả thiết về cách dữ liệu được sinh ra.

### 1.2 Mất mát huấn luyện và rủi ro kỳ vọng

Trực giác, chưa phải phát biểu hình thức: ba quan sát của Ví dụ 05.1 được coi là ba lần rút từ một nguồn sinh dữ liệu, và quan sát mới là một lần rút nữa từ cùng nguồn. Mất mát trung bình trên ba quan sát là một ước lượng, dựa trên ba lần rút, của mất mát trung bình theo nguồn đó. Định nghĩa sau đặt tên cho hai đại lượng và cho nguồn sinh dữ liệu.

::: definition Định nghĩa 05.1 (Mất mát huấn luyện và rủi ro kỳ vọng)
Cho các số nguyên dương $d$ và $p$, miền nhãn $\mathcal Y$ và miền dự đoán $\mathcal Z$.

**Mô hình và mất mát.** Một mô hình tham số hóa là họ hàm $f_\theta:\mathbb R^d\to\mathcal Z$ với tham số $\theta\in\mathbb R^p$. Hàm mất mát $\ell:\mathcal Z\times\mathcal Y\to\mathbb R_{\ge0}$ đo mức phạt khi dự đoán $f_\theta(x)$ được dùng cho nhãn $y$.

**Mất mát huấn luyện.** Cho tập huấn luyện $D=\{(x_i,y_i)\}_{i=1}^N$ với $N\ge1$, $x_i\in\mathbb R^d$, $y_i\in\mathcal Y$. Mất mát trên quan sát $i$ là $\ell_i(\theta)=\ell(f_\theta(x_i),y_i)$, và mất mát huấn luyện (training loss) là

$$
J(\theta)=\frac1N\sum_{i=1}^N\ell_i(\theta).
\tag{1.2}
$$

**Rủi ro kỳ vọng.** Cho phân phối dữ liệu $P$ trên $\mathbb R^d\times\mathcal Y$ và cặp ngẫu nhiên $(X,Y)\sim P$. Rủi ro kỳ vọng (expected risk) là

$$
R(\theta)=\mathbb E_{(X,Y)\sim P}\,\ell(f_\theta(X),Y),
\tag{1.3}
$$

với giả thiết kỳ vọng này hữu hạn tại mọi $\theta$ được xét.
:::

Hai công thức dùng chung mô hình $f_\theta$ và hàm mất mát $\ell$, chỉ khác phép lấy trung bình. Công thức (1.2) lấy trung bình cộng trên $N$ cặp đã quan sát, nên tính được. Công thức (1.3) lấy kỳ vọng theo phân phối $P$, đại lượng chưa biết trong thực tế, nên không tính trực tiếp được. Giả thiết hữu hạn cần thiết vì kỳ vọng của một biến không âm có thể bằng $+\infty$.

Mất mát huấn luyện là trường hợp riêng của rủi ro kỳ vọng. Nếu $\widehat P_N$ là phân phối gán xác suất $\tfrac1N$ cho mỗi cặp $(x_i,y_i)$ của $D$, gọi là phân phối thực nghiệm, thì kỳ vọng theo $\widehat P_N$ trong (1.3) đúng bằng (1.2). Vì vậy $J$ còn được gọi là rủi ro thực nghiệm (empirical risk), và việc cực tiểu $J$ gọi là cực tiểu hóa rủi ro thực nghiệm. Ký hiệu $R$ được dùng thay cho $J^*$ của Goodfellow, Bengio và Courville (2016, mục 8.1, tr. 275) để không nhầm với giá trị tối ưu.

Ví dụ 05.1 là trường hợp $d$ không dùng tới, $p=1$, $\mathcal Y=\mathcal Z=\mathbb R$ và $N=3$. Một phản ví dụ cho việc đồng nhất hai đại lượng: nếu $P$ chỉ gồm một điểm $Y=7$ thì $R(\theta)=\tfrac12(\theta-7)^2$, có nghiệm $7$, trong khi một tập huấn luyện $D$ không lấy từ $P$ vẫn cho nghiệm $1$ của $J$. Định nghĩa không đòi $D$ được rút từ $P$; quan hệ giữa hai đại lượng chỉ xuất hiện khi thêm giả thiết đó, như ví dụ sau.

::: example Ví dụ 05.2 (Rủi ro kỳ vọng của mô hình hằng)
**Dữ kiện.**

Giả sử nhãn $Y$ nhận bốn giá trị $-1$, $1$, $3$, $5$ với cùng xác suất $\tfrac14$, và ba quan sát $(-1,1,3)$ của Ví dụ 05.1 là ba lần rút độc lập từ phân phối đó.

**Kỳ vọng và phương sai của nhãn.**

$\mathbb EY=\tfrac14(-1+1+3+5)=2$. Các độ lệch $-3,-1,1,3$ cho $\operatorname{Var}Y=\tfrac14(9+1+1+9)=5$.

**Rủi ro kỳ vọng.**

Với mất mát bình phương,

$$
\begin{aligned}
R(\theta)&=\tfrac12\,\mathbb E(\theta-Y)^2\\
&=\tfrac12\bigl[(\theta-\mathbb EY)^2+\operatorname{Var}Y\bigr]\\
&=\tfrac12(\theta-2)^2+\tfrac52 .
\end{aligned}
$$

Đẳng thức thứ hai khai triển $\theta-Y=(\theta-\mathbb EY)-(Y-\mathbb EY)$ và dùng $\mathbb E(Y-\mathbb EY)=0$.

**So sánh.**

Nghiệm của $J$ là $\theta^*=1$, với $J(\theta^*)=\tfrac43\approx1{,}33$. Tại cùng điểm, $R(1)=\tfrac12+\tfrac52=3$. Giá trị nhỏ nhất của $R$ là $\tfrac52$, đạt tại $\theta=2$.

**Kiểm tra lại.**

Tính trực tiếp $R(1)=\tfrac14\cdot\tfrac12\bigl(4+0+4+16\bigr)=3$.
:::

Ví dụ cho thấy hai khoảng cách khác nhau. Giá trị $J(\theta^*)=\tfrac43$ nhỏ hơn giá trị nhỏ nhất $\tfrac52$ của $R$, vì $\theta^*$ được chọn chính trên ba quan sát dùng để tính $J$. Rủi ro của nghiệm, $R(\theta^*)=3$, lớn hơn $\tfrac52$, vì ba quan sát cho trung bình $1$ thay cho kỳ vọng $2$. Mệnh đề sau cho thấy hai bất đẳng thức này đúng theo kỳ vọng với mọi phân phối có phương sai hữu hạn.

::: proposition Mệnh đề 05.2 (Khoảng cách giữa mất mát huấn luyện và rủi ro của mô hình hằng)
**Giả thiết.** Mô hình hằng $f_\theta=\theta\in\mathbb R$, mất mát bình phương $\ell(\theta,y)=\tfrac12(\theta-y)^2$. Nhãn $Y$ có phương sai $\operatorname{Var}Y<\infty$. Tập huấn luyện gồm $N\ge2$ nhãn $Y_1,\ldots,Y_N$ độc lập, cùng phân phối với $Y$. Nghiệm của $J$ là trung bình mẫu $\widehat\theta=\tfrac1N\sum_iY_i$.

**Kết luận.**

$$
\mathbb E\,J(\widehat\theta)=\frac{N-1}{2N}\operatorname{Var}Y,\qquad\min_\theta R(\theta)=\frac12\operatorname{Var}Y,\qquad\mathbb E\,R(\widehat\theta)=\frac{N+1}{2N}\operatorname{Var}Y ,
\tag{1.4}
$$

với kỳ vọng lấy theo tập huấn luyện. Do đó, khi $\operatorname{Var}Y>0$, $\mathbb E\,J(\widehat\theta)<\min_\theta R(\theta)<\mathbb E\,R(\widehat\theta)$.

**Điều kiện áp dụng.** Cần các nhãn huấn luyện độc lập và cùng phân phối với nhãn mới; cần phương sai hữu hạn.

**Phạm vi.** Mệnh đề chỉ nói về mô hình hằng với mất mát bình phương. Nó cho hai khoảng cách theo kỳ vọng, không cho cận trên một tập huấn luyện cụ thể.
:::

::: proof Chứng minh Mệnh đề 05.2
**Bước 1 (cực tiểu của $R$).**

Như ở Ví dụ 05.2, $R(\theta)=\tfrac12(\theta-\mathbb EY)^2+\tfrac12\operatorname{Var}Y$, nên giá trị nhỏ nhất là $\tfrac12\operatorname{Var}Y$, đạt tại $\theta=\mathbb EY$.

**Bước 2 (rủi ro của nghiệm).**

Thay $\theta=\widehat\theta$ vào biểu thức của Bước 1 rồi lấy kỳ vọng. Theo Định lý 05c.35, $\mathbb E\widehat\theta=\mathbb EY$ và $\operatorname{Var}\widehat\theta=\operatorname{Var}Y/N$, nên $\mathbb E(\widehat\theta-\mathbb EY)^2=\operatorname{Var}Y/N$. Do đó

$$
\mathbb E\,R(\widehat\theta)=\frac12\cdot\frac{\operatorname{Var}Y}N+\frac12\operatorname{Var}Y=\frac{N+1}{2N}\operatorname{Var}Y .
$$

**Bước 3 (mất mát huấn luyện tại nghiệm).**

Với mỗi $i$, viết $Y_i-\widehat\theta=(Y_i-\mathbb EY)-(\widehat\theta-\mathbb EY)$. Cộng bình phương theo $i$ và dùng $\sum_i(Y_i-\mathbb EY)=N(\widehat\theta-\mathbb EY)$:

$$
\begin{aligned}
\sum_{i=1}^N(Y_i-\widehat\theta)^2&=\sum_{i=1}^N(Y_i-\mathbb EY)^2-2(\widehat\theta-\mathbb EY)\sum_{i=1}^N(Y_i-\mathbb EY)+N(\widehat\theta-\mathbb EY)^2\\
&=\sum_{i=1}^N(Y_i-\mathbb EY)^2-N(\widehat\theta-\mathbb EY)^2 .
\end{aligned}
$$

Lấy kỳ vọng: số hạng đầu có kỳ vọng $N\operatorname{Var}Y$, số hạng sau có kỳ vọng $N\cdot\operatorname{Var}Y/N=\operatorname{Var}Y$ theo Bước 2. Vì $J(\widehat\theta)=\tfrac1{2N}\sum_i(Y_i-\widehat\theta)^2$, ta được $\mathbb E\,J(\widehat\theta)=\tfrac{(N-1)\operatorname{Var}Y}{2N}$.

**Bước 4 (thứ tự).**

Khi $\operatorname{Var}Y>0$, ba hệ số $\tfrac{N-1}{2N}<\tfrac12<\tfrac{N+1}{2N}$ cho hai bất đẳng thức chặt nêu sau (1.4). $\square$
:::

Mệnh đề 05.2 nói rằng, trung bình trên mọi tập huấn luyện có thể, mất mát huấn luyện của nghiệm thấp hơn mức tốt nhất mà mô hình đạt được trên dữ liệu mới, còn rủi ro thật của nghiệm cao hơn mức đó. Cả hai khoảng cách bằng $\tfrac{\operatorname{Var}Y}{2N}$ và giảm như $\tfrac1N$ khi có thêm dữ liệu. Với Ví dụ 05.2, $N=3$ và $\operatorname{Var}Y=5$ cho $\mathbb EJ(\widehat\theta)=\tfrac53$, $\min R=\tfrac52$, $\mathbb ER(\widehat\theta)=\tfrac{10}3$; ba quan sát cụ thể $(-1,1,3)$ cho $J=\tfrac43$ và $R=3$, nằm cùng phía với kỳ vọng.

Bỏ giả thiết độc lập, chẳng hạn ba quan sát là ba bản sao của cùng một lần rút, thì $J(\widehat\theta)=0$ trong khi $\mathbb ER(\widehat\theta)=\operatorname{Var}Y$: khoảng cách không giảm theo $N$. Bỏ giả thiết cùng phân phối giữa dữ liệu huấn luyện và dữ liệu mới thì không còn quan hệ nào, như phản ví dụ $Y=7$ ở trên.

**Trong học máy.** Tham số $\theta$ ứng với trọng số của mô hình, $J$ là mất mát mà bộ tối ưu cực tiểu, $R$ là mất mát khi mô hình được dùng cho dữ liệu mới. Với mạng sâu, không có công thức đóng như (1.4), nhưng cơ chế giữ nguyên: tham số được chọn trên chính dữ liệu dùng để tính $J$, nên mất mát huấn luyện tại tham số học được có xu hướng thấp hơn rủi ro (Goodfellow, Bengio và Courville 2016, mục 5.2, tr. 110–114). Hệ quả cho các mục sau là bộ tối ưu chỉ tác động lên $J$; muốn biết $R$ cần dữ liệu không tham gia cập nhật, chủ đề của Mục 1.3.

::: remark Nhận xét 05.3 (Mất mát huấn luyện nhỏ không kéo theo rủi ro nhỏ)
**Nhầm lẫn thường gặp.** Một cách hiểu sai là coi cực tiểu của $J$ cũng là cực tiểu của $R$, hoặc coi $J$ nhỏ là bằng chứng $R$ nhỏ. Ví dụ 05.2 cho nghiệm của $J$ là $1$, nghiệm của $R$ là $2$, và $J(1)=\tfrac43$ nhỏ hơn $R(1)=3$.

**Quá khớp.** Khi một mô hình có nhiều tham số được huấn luyện lâu trên một tập nhỏ, $J$ có thể tiếp tục giảm trong khi rủi ro tăng. Hiện tượng khoảng cách giữa $J$ và $R$ tăng tới mức làm dự đoán trên dữ liệu mới kém đi gọi là quá khớp (overfitting). Mục 1.3 cho cách phát hiện nó bằng số đo.
:::

### 1.3 Tập xác thực và tập kiểm thử

Mục 1.2 chỉ ra rằng $R$ là đại lượng cần đạt nhưng không tính được, vì $P$ chưa biết. Đại lượng tính được và gần $R$ nhất là mất mát trung bình trên những quan sát rút từ $P$ nhưng không tham gia cập nhật tham số. Trực giác, chưa phải phát biểu hình thức: nếu tham số được cố định trước khi nhìn các quan sát này thì mỗi quan sát là một lần thử độc lập của mô hình trên dữ liệu mới.

Ví dụ sau dùng một tập như vậy để chọn giữa hai thời điểm lưu, trước khi các khái niệm được định nghĩa.

::: example Ví dụ 05.3 (Chọn thời điểm lưu theo dữ liệu giữ riêng)
**Dữ kiện.**

Một phiên huấn luyện lưu tham số ở hai thời điểm, tính bằng số bước cập nhật đã thực hiện. Số liệu giả lập:

| Thời điểm | Mất mát huấn luyện $J$ | Mất mát trên dữ liệu giữ riêng |
|---|---|---|
| 1 | $0{,}30$ | $0{,}35$ |
| 2 | $0{,}20$ | $0{,}42$ |

**Lựa chọn.**

Theo tiêu chí mất mát trên dữ liệu giữ riêng, thời điểm 1 được lưu vì $0{,}35<0{,}42$, dù mất mát huấn luyện của nó lớn hơn ($0{,}30$ so với $0{,}20$).

**Diễn giải.**

Từ thời điểm 1 tới thời điểm 2, $J$ giảm $0{,}10$ trong khi mất mát trên dữ liệu giữ riêng tăng $0{,}07$. Đây là dấu hiệu thường gặp của quá khớp (Nhận xét 05.3), nhưng hai số đo chưa chứng minh cơ chế đó.

**Kiểm tra lại.**

Hiệu hai cột: thời điểm 1 có $0{,}35-0{,}30=0{,}05$, thời điểm 2 có $0{,}42-0{,}20=0{,}22$; khoảng cách giữa hai mất mát tăng hơn bốn lần. Mệnh đề 05.5(b) ở dưới cho biết giá trị $0{,}35$ của bản được chọn là ước lượng lạc quan, nên con số báo cáo lấy từ một tập thứ ba.
:::

::: definition Định nghĩa 05.4 (Tập xác thực, mất mát xác thực và tập kiểm thử)
Cho $N_{\rm val}\ge1$ cặp $(x'_i,y'_i)$, $i=1,\ldots,N_{\rm val}$, không thuộc tập huấn luyện $D$ và không được dùng trong bất kỳ phép cập nhật tham số nào.

**Tập xác thực.** Tập các cặp đó gọi là tập xác thực (validation set) khi được dùng để chọn cấu hình huấn luyện và chọn thời điểm lưu tham số. Cấu hình gồm các lựa chọn đặt trước khi chạy như cỡ nhóm, bước học hay số lớp, gọi là siêu tham số (hyperparameter).

**Mất mát xác thực.** Với tham số $\theta$,

$$
\widehat R_{\rm val}(\theta)=\frac1{N_{\rm val}}\sum_{i=1}^{N_{\rm val}}\ell(f_\theta(x'_i),y'_i).
$$

**Tập kiểm thử.** Một tập thứ ba, cũng tách khỏi $D$ và khỏi tập xác thực, chỉ dùng một lần sau khi mọi lựa chọn đã xong, gọi là tập kiểm thử (test set).
:::

Mất mát xác thực có cùng dạng với (1.2), chỉ đổi tập quan sát. Nó khác $J$ ở quan hệ giữa tham số và dữ liệu: $J$ được tính trên các quan sát đã quyết định $\theta$, còn $\widehat R_{\rm val}$ được tính trên các quan sát mà $\theta$ chưa thấy. Tập kiểm thử khác tập xác thực ở cách dùng: tập xác thực tham gia vào việc chọn, tập kiểm thử chỉ đo kết quả sau khi chọn.

Với mất mát phân loại 0–1, $\widehat R_{\rm val}$ là tỷ lệ dự đoán sai trên tập xác thực, gọi là lỗi xác thực. Lỗi này là hàm hằng từng khúc theo $\theta$: gradient của nó bằng $0$ ở nơi tồn tại, nên không dùng được để cập nhật, nhưng vẫn dùng được để chọn. Đây là một lý do thực tế khiến đại lượng được cực tiểu khác đại lượng được dùng để đánh giá.

Mệnh đề sau cho biết mất mát xác thực ước lượng $R$ tốt đến đâu, và điều gì xảy ra khi chính nó được dùng để chọn.

::: proposition Mệnh đề 05.5 (Mất mát xác thực khi tham số cố định và khi được chọn)
**Giả thiết.** Các cặp $(x'_i,y'_i)$ của tập xác thực độc lập, cùng phân phối $P$, và độc lập với tập huấn luyện.

**Kết luận.**

- (a) Nếu $\theta$ được xác định chỉ từ tập huấn luyện thì $\mathbb E[\widehat R_{\rm val}(\theta)\mid\theta]=R(\theta)$. Nếu thêm $V_\ell(\theta)=\operatorname{Var}\ell(f_\theta(X),Y)<\infty$ thì phương sai có điều kiện của $\widehat R_{\rm val}(\theta)$ bằng $V_\ell(\theta)/N_{\rm val}$.
- (b) Cho $K$ ứng viên $\theta_1,\ldots,\theta_K$ xác định chỉ từ tập huấn luyện, và $\widehat k$ là chỉ số có mất mát xác thực nhỏ nhất. Khi giữ các ứng viên cố định và lấy kỳ vọng theo tập xác thực,

$$
\mathbb E\bigl[\widehat R_{\rm val}(\theta_{\widehat k})\bigr]\le\min_{1\le k\le K}R(\theta_k)\le\mathbb E\bigl[R(\theta_{\widehat k})\bigr].
\tag{1.5}
$$

**Điều kiện áp dụng.** Phần (a) cần tham số không phụ thuộc tập xác thực. Phần (b) cho phép chỉ số được chọn phụ thuộc tập xác thực.

**Phạm vi.** Mệnh đề so các kỳ vọng; một lần chia dữ liệu cụ thể có thể cho $\widehat R_{\rm val}$ lớn hơn hoặc nhỏ hơn $R$.
:::

::: proof Chứng minh Mệnh đề 05.5
**Bước 1 (không chệch khi tham số cố định).**

Khi biết $\theta$, mỗi số hạng $\ell(f_\theta(x'_i),y'_i)$ có kỳ vọng $R(\theta)$ theo (1.3), vì cặp thứ $i$ có phân phối $P$ và độc lập với dữ liệu đã quyết định $\theta$. Tính tuyến tính của kỳ vọng cho $\mathbb E[\widehat R_{\rm val}(\theta)\mid\theta]=R(\theta)$.

**Bước 2 (phương sai).**

Các số hạng độc lập, cùng phương sai $V_\ell(\theta)$, nên theo Định lý 05c.35, phương sai của trung bình bằng $V_\ell(\theta)/N_{\rm val}$.

**Bước 3 (cận dưới cho giá trị được chọn).**

Với mỗi $j$ cố định, $\widehat R_{\rm val}(\theta_{\widehat k})=\min_k\widehat R_{\rm val}(\theta_k)\le\widehat R_{\rm val}(\theta_j)$. Lấy kỳ vọng theo tập xác thực, với các ứng viên cố định, và dùng Bước 1 cho ứng viên $j$:

$$
\mathbb E\bigl[\widehat R_{\rm val}(\theta_{\widehat k})\bigr]\le\mathbb E\bigl[\widehat R_{\rm val}(\theta_j)\bigr]=R(\theta_j).
$$

Bất đẳng thức đúng với mọi $j$, nên đúng với $j$ cho $R(\theta_j)$ nhỏ nhất.

**Bước 4 (cận trên cho rủi ro được chọn).**

Với mọi kết quả rút, $R(\theta_{\widehat k})\ge\min_kR(\theta_k)$ vì $\theta_{\widehat k}$ là một trong các ứng viên. Lấy kỳ vọng được bất đẳng thức thứ hai của (1.5). $\square$
:::

Phần (a) là lý do dùng tập xác thực: với tham số cố định, mất mát xác thực không lệch về phía nào, và sai số chuẩn của nó là $\sqrt{V_\ell(\theta)/N_{\rm val}}$. Phần (b) nói rằng ngay khi tập xác thực được dùng để chọn giữa nhiều ứng viên, giá trị xác thực của ứng viên thắng trở thành ước lượng lạc quan, cùng cơ chế với $J(\widehat\theta)$ ở Mệnh đề 05.2. Vì vậy cần một tập thứ ba, tập kiểm thử, cho con số báo cáo cuối cùng.

So với Mệnh đề 05.2, Mệnh đề 05.5 không cần biết dạng mô hình: nó chỉ dùng tính độc lập giữa dữ liệu chọn và dữ liệu đo. Cái giá là nó chỉ chặn một phía, không cho độ lớn của khoảng cách.

::: example Ví dụ 05.4 (Độ lệch lạc quan khi chọn giữa hai ứng viên ngang nhau)
**Dữ kiện.**

Hai ứng viên có cùng rủi ro $R(\theta_1)=R(\theta_2)=1$. Mất mát xác thực của mỗi ứng viên bằng $1+\xi_k$, trong đó $\xi_1$, $\xi_2$ độc lập, mỗi biến nhận $-0{,}1$ hoặc $+0{,}1$ với xác suất $\tfrac12$.

**Tính.**

Bốn tổ hợp $(\xi_1,\xi_2)$ đồng khả năng. Giá trị nhỏ nhất của hai mất mát xác thực bằng $0{,}9$ trong ba tổ hợp có ít nhất một $\xi_k=-0{,}1$, và bằng $1{,}1$ trong tổ hợp còn lại. Do đó

$$
\mathbb E\bigl[\min(1+\xi_1,1+\xi_2)\bigr]=\tfrac34\cdot0{,}9+\tfrac14\cdot1{,}1=0{,}95 .
$$

**Diễn giải.**

Mỗi mất mát xác thực riêng lẻ không chệch, với kỳ vọng $1$. Giá trị của ứng viên thắng có kỳ vọng $0{,}95$, thấp hơn rủi ro thật $1$ của bất kỳ ứng viên nào, đúng chiều bất đẳng thức thứ nhất của (1.5), $\mathbb E[\widehat R_{\rm val}(\theta_{\widehat k})]\le\min_kR(\theta_k)\le\mathbb E[R(\theta_{\widehat k})]$.

**Kiểm tra lại.**

Liệt kê: $(-0{,}1;\,-0{,}1)$, $(-0{,}1;\,0{,}1)$, $(0{,}1;\,-0{,}1)$ cho giá trị nhỏ nhất $0{,}9$, còn $(0{,}1;\,0{,}1)$ cho $1{,}1$; trung bình $\tfrac{0{,}9\cdot3+1{,}1}4=0{,}95$.
:::

::: remark Nhận xét 05.6 (Vai trò của ba tập dữ liệu)
**Phân vai.** Tập huấn luyện quyết định $\theta$, tập xác thực quyết định cấu hình và bản lưu, tập kiểm thử chỉ đo bản cuối cùng.

**Nhầm lẫn thường gặp.** Dùng tập kiểm thử để chọn bước học hay thời điểm dừng biến nó thành một tập xác thực thứ hai, và con số kiểm thử mất tính không chệch theo đúng cơ chế của Mệnh đề 05.5(b).

**Lỗi và mất mát.** Bộ tối ưu có thể cực tiểu mất mát logistic khả vi trong khi bản lưu được chọn theo lỗi phân loại; mất mát khả vi khi đó gọi là mất mát thay thế (surrogate loss) (Goodfellow, Bengio và Courville 2016, mục 8.1.2, tr. 276).
:::

**Trong học máy.** Quy tắc lưu bản có mất mát xác thực nhỏ nhất và dừng khi mất mát này thôi giảm gọi là dừng sớm (early stopping); Thuật toán 05.1 ở Mục 2 viết nó thành các bước. Mệnh đề 05.5 giải thích hai thói quen của thực hành: báo cáo kết quả trên tập kiểm thử chứ không trên tập xác thực, và nghi ngờ con số xác thực khi đã thử nhiều cấu hình (Goodfellow, Bengio và Courville 2016, mục 5.3, tr. 120–122).

Giả thiết của Mệnh đề 05.5 là các quan sát xác thực độc lập với tập huấn luyện và cùng phân phối với dữ liệu khi triển khai. Giả thiết thứ nhất bị vi phạm khi có rò rỉ dữ liệu, chẳng hạn cùng một bệnh nhân hay cùng một tài liệu xuất hiện ở cả hai tập; khi đó mất mát xác thực lạc quan ngay cả với tham số cố định. Giả thiết thứ hai bị vi phạm khi phân phối thay đổi giữa lúc thu thập và lúc dùng, gọi là lệch phân phối (distribution shift); khi đó $\widehat R_{\rm val}$ ước lượng đúng rủi ro trên phân phối cũ nhưng không trên phân phối mới.

::: exercise Bài tập 05.1
**Dữ kiện.**

Mệnh đề 05.2, (1.4): với mô hình hằng, mất mát $\tfrac12(\theta-y)^2$ và $N$ nhãn huấn luyện độc lập, cùng phân phối với $Y$, nghiệm $\widehat\theta$ của $J$ thỏa $\mathbb EJ(\widehat\theta)=\frac{N-1}{2N}\operatorname{Var}Y$, $\min_\theta R(\theta)=\tfrac12\operatorname{Var}Y$ và $\mathbb ER(\widehat\theta)=\frac{N+1}{2N}\operatorname{Var}Y$.

Một mô hình hằng được huấn luyện trên $N=5$ nhãn độc lập, cùng phân phối với $Y$, có $\operatorname{Var}Y=2$.

- (a) Tính $\mathbb EJ(\widehat\theta)$, $\min_\theta R(\theta)$ và $\mathbb ER(\widehat\theta)$ theo Mệnh đề 05.2.
- (b) Cần bao nhiêu nhãn để $\mathbb ER(\widehat\theta)-\min_\theta R(\theta)\le0{,}01$.
- (c) Ba ứng viên có cùng rủi ro $2$; mất mát xác thực của ứng viên $k$ là $2+\xi_k$, với $\xi_1,\xi_2,\xi_3$ độc lập, mỗi biến bằng $-0{,}3$ hoặc $0{,}3$ với xác suất $\tfrac12$. Tính kỳ vọng của mất mát xác thực nhỏ nhất, so với $2$ và với trường hợp hai ứng viên.
:::

::: hint
Ở (b), khoảng cách bằng $\tfrac{\operatorname{Var}Y}{2N}$. Ở (c), giá trị nhỏ nhất bằng $1{,}7$ trừ khi cả ba $\xi_k$ đều bằng $0{,}3$.
:::

::: solution
**Câu (a).**

Theo (1.4) với $N=5$ và $\operatorname{Var}Y=2$: $\mathbb EJ(\widehat\theta)=\tfrac{4}{10}\cdot2=0{,}8$; $\min R=\tfrac12\cdot2=1$; $\mathbb ER(\widehat\theta)=\tfrac6{10}\cdot2=1{,}2$.

**Câu (b).**

Theo (1.4), khoảng cách giữa rủi ro của nghiệm và rủi ro nhỏ nhất là

$$
\begin{aligned}
\mathbb ER(\widehat\theta)-\min R&=\frac{N+1}{2N}\operatorname{Var}Y-\frac12\operatorname{Var}Y\\
&=\frac{\operatorname{Var}Y}{2N}\\
&=\frac1N .
\end{aligned}
$$

Điều kiện $\tfrac1N\le0{,}01$ cho $N\ge100$.

**Câu (c).**

Cả ba $\xi_k$ bằng $0{,}3$ với xác suất $\tfrac18$; khi đó giá trị nhỏ nhất là $2{,}3$. Trong các trường hợp còn lại, với xác suất $\tfrac78$, giá trị nhỏ nhất là $1{,}7$. Kỳ vọng là

$$
\tfrac78\cdot1{,}7+\tfrac18\cdot2{,}3=1{,}775 ,
$$

nhỏ hơn rủi ro $2$ của mọi ứng viên, đúng chiều Mệnh đề 05.5(b). Với hai ứng viên, kỳ vọng là $\tfrac34\cdot1{,}7+\tfrac14\cdot2{,}3=1{,}85$: thêm ứng viên làm độ lệch lạc quan tăng từ $0{,}15$ lên $0{,}225$.

**Kiểm tra lại.**

Ở (a), $0{,}8<1<1{,}2$ đúng thứ tự của Mệnh đề 05.2, và hai khoảng cách cùng bằng $0{,}2=\tfrac{\operatorname{Var}Y}{2N}$. Ở (c), $1{,}4875+0{,}2875=1{,}775$.
:::

### 1.4 Điểm dừng của hàm không lồi

Thuật toán giảm gradient của Bài 04 dừng khi $\lVert\nabla F\rVert_2$ đủ nhỏ. Kết luận "điểm này gần nghiệm" dựa vào tính lồi: theo Mệnh đề 04.2(a), với $F$ lồi, $\nabla F=0$ là điều kiện đủ cho cực tiểu toàn cục. Tình huống 04.3 đã cho một hàm không lồi, $\tfrac12(ab-1)^2$, tại đó giảm gradient trượt về gốc, nơi gradient bằng $0$ nhưng giá trị bằng $\tfrac12$, trong khi giá trị nhỏ nhất bằng $0$. Mất mát của mạng nơ ron nói chung không lồi, nên cần biết một điểm có gradient bằng $0$ có thể là những loại điểm nào và phân biệt chúng bằng công cụ gì.

Trực giác, chưa phải phát biểu hình thức: tại một điểm có gradient bằng $0$, mặt đồ thị nằm ngang theo mọi hướng ở bậc nhất. Hình dạng thật được quyết định bởi độ cong theo từng hướng. Nếu mọi hướng đều cong lên, điểm là đáy; nếu có hướng cong lên và hướng cong xuống, điểm là yên ngựa.

::: definition Định nghĩa 05.7 (Điểm dừng và phân loại)
Cho $F:\mathbb R^p\to\mathbb R$ khả vi và $\theta^\circ\in\mathbb R^p$.

**Điểm dừng.** $\theta^\circ$ là điểm dừng (stationary point) của $F$ nếu $\nabla F(\theta^\circ)=0$.

**Cực tiểu và cực đại địa phương.** $\theta^\circ$ là cực tiểu địa phương nếu có $r>0$ để $F(\theta)\ge F(\theta^\circ)$ với mọi $\theta$ thỏa $\lVert\theta-\theta^\circ\rVert_2<r$; cực đại địa phương được định nghĩa với bất đẳng thức ngược lại. Nếu bất đẳng thức của cực tiểu địa phương là chặt với mọi $\theta\ne\theta^\circ$ trong lân cận, $\theta^\circ$ là cực tiểu địa phương chặt.

**Điểm yên ngựa.** Một điểm dừng không là cực tiểu địa phương và không là cực đại địa phương gọi là điểm yên ngựa (saddle point). Tương đương, mọi lân cận của nó chứa cả điểm có giá trị lớn hơn và điểm có giá trị nhỏ hơn $F(\theta^\circ)$.
:::

Định nghĩa phân biệt hai việc thường bị gọi chung là "dừng". Điểm dừng là một tính chất của hàm tại một điểm; thời điểm thuật toán ngừng lặp là một quyết định của quy trình. Theo điều kiện cần bậc nhất, mọi cực tiểu địa phương của hàm khả vi là điểm dừng; chiều ngược lại sai, và điểm yên ngựa là phản ví dụ.

So với các khái niệm của Bài 01, cực tiểu địa phương của hàm lồi luôn là cực tiểu toàn cục, nên với hàm lồi khả vi, ba khái niệm điểm dừng, cực tiểu địa phương và cực tiểu toàn cục trùng nhau. Khi bỏ tính lồi, ba khái niệm tách rời, và cần thêm thông tin bậc hai để phân loại.

::: proposition Mệnh đề 05.8 (Phân loại điểm dừng bằng Hessian)
**Giả thiết.** $F:\mathbb R^p\to\mathbb R$ khả vi hai lần liên tục; $\theta^\circ$ là điểm dừng của $F$; $\lambda_{\min}$ và $\lambda_{\max}$ là giá trị riêng nhỏ nhất và lớn nhất của $\nabla^2F(\theta^\circ)$.

**Kết luận.**

- (a) Nếu $\lambda_{\min}<0$ thì $\theta^\circ$ không là cực tiểu địa phương.
- (b) Nếu $\lambda_{\max}>0$ thì $\theta^\circ$ không là cực đại địa phương.
- (c) Nếu $\lambda_{\min}<0<\lambda_{\max}$ thì $\theta^\circ$ là điểm yên ngựa.
- (d) Nếu $\lambda_{\min}>0$ thì $\theta^\circ$ là cực tiểu địa phương chặt.

**Điều kiện áp dụng.** Cần $\nabla F(\theta^\circ)=0$ và Hessian liên tục.

**Phạm vi.** Khi Hessian suy biến và không có giá trị riêng âm, mệnh đề không kết luận; chẳng hạn $u^4$ và $-u^4$ đều có đạo hàm bậc hai bằng $0$ tại gốc.
:::

::: proof Chứng minh Mệnh đề 05.8
**Bước 1 (khai triển dọc một hướng).**

Lấy vectơ riêng đơn vị $\Delta$ của $\nabla^2F(\theta^\circ)$ ứng với giá trị riêng $\lambda$. Theo khai triển Taylor bậc hai và $\nabla F(\theta^\circ)=0$,

$$
F(\theta^\circ+\tau\Delta)-F(\theta^\circ)=\frac{\tau^2}2\,\Delta^T\nabla^2F(\theta^\circ)\Delta+o(\tau^2)=\frac{\lambda\tau^2}2+o(\tau^2)
$$

khi $\tau\to0$.

**Bước 2 (phần a và b).**

Nếu $\lambda<0$, số hạng $\tfrac{\lambda\tau^2}2$ chiếm ưu thế khi $\tau$ đủ nhỏ, nên $F(\theta^\circ+\tau\Delta)<F(\theta^\circ)$ với mọi $\tau\ne0$ đủ nhỏ; trong mọi lân cận có điểm giá trị nhỏ hơn, nên $\theta^\circ$ không là cực tiểu địa phương. Với $\lambda>0$, lập luận đối xứng cho điểm giá trị lớn hơn.

**Bước 3 (phần c).**

Ghép (a) cho vectơ riêng của $\lambda_{\min}$ và (b) cho vectơ riêng của $\lambda_{\max}$: $\theta^\circ$ không là cực tiểu, không là cực đại, nên là điểm yên ngựa theo Định nghĩa 05.7.

**Bước 4 (phần d).**

Với mọi $\Delta\in\mathbb R^p$, $\Delta^T\nabla^2F(\theta^\circ)\Delta\ge\lambda_{\min}\lVert\Delta\rVert_2^2$. Khai triển Taylor cho $F(\theta^\circ+\Delta)-F(\theta^\circ)\ge\tfrac{\lambda_{\min}}2\lVert\Delta\rVert_2^2+o(\lVert\Delta\rVert_2^2)$. Khi $\lVert\Delta\rVert_2$ đủ nhỏ, phần dư không vượt $\tfrac{\lambda_{\min}}4\lVert\Delta\rVert_2^2$, nên $F(\theta^\circ+\Delta)-F(\theta^\circ)\ge\tfrac{\lambda_{\min}}4\lVert\Delta\rVert_2^2>0$ với $\Delta\ne0$. $\square$
:::

Mệnh đề 05.8 thay câu hỏi "điểm dừng này là gì" bằng phép kiểm dấu các giá trị riêng của Hessian. Giá trị riêng âm chỉ ra một hướng mà dọc theo đó hàm cong xuống, nên đi theo hướng đó làm giá trị giảm dù gradient bằng $0$. Đây cũng là lý do một thuật toán chỉ dùng gradient có thể dừng lâu gần điểm yên ngựa: gradient nhỏ ở cả vùng quanh điểm đó.

So với Mệnh đề 04.2(a), mệnh đề này không cần tính lồi nhưng chỉ cho kết luận địa phương. Phần (d) không nói gì về cực tiểu toàn cục; Ví dụ 05.6 dưới đây có hai cực tiểu địa phương và cả hai là toàn cục, còn hàm $u^4-u^2+\tfrac u2$ có một cực tiểu địa phương không toàn cục.

::: example Ví dụ 05.5 (Điểm yên ngựa)
**Dữ kiện.** $\psi(u_1,u_2)=u_1^2-u_2^2$ trên $\mathbb R^2$.

**Điểm dừng.** $\nabla\psi(u)=(2u_1,-2u_2)^T$ bằng $0$ chỉ tại gốc.

**Hessian.** $\nabla^2\psi=\operatorname{diag}(2,-2)$, với $\lambda_{\min}=-2$ âm và $\lambda_{\max}=2$ dương. Theo Mệnh đề 05.8(c), gốc là điểm yên ngựa.

**Kiểm tra lại.** Trực tiếp theo định nghĩa: với $u_1\ne0$, $\psi(u_1,0)=u_1^2$ lớn hơn $\psi(0,0)=0$; với $u_2\ne0$, $\psi(0,u_2)=-u_2^2<0$. Mọi lân cận của gốc chứa cả hai loại điểm. Hàm $\psi$ không lồi vì Hessian có giá trị riêng âm (Định lý 01.30).
:::

::: example Ví dụ 05.6 (Hai cực tiểu cùng giá trị)
**Dữ kiện.** $\omega(u)=(u^2-1)^2$ trên $\mathbb R$.

**Điểm dừng.** $\omega'(u)=4u(u^2-1)$ triệt tiêu tại $u=-1$, $0$, $1$.

**Phân loại.** $\omega''(u)=12u^2-4$. Tại $u=\pm1$, $\omega''=8>0$, nên đó là hai cực tiểu địa phương chặt theo Mệnh đề 05.8(d); cả hai có $\omega=0$, giá trị nhỏ nhất của hàm không âm này, nên là cực tiểu toàn cục. Tại $u=0$, $\omega''=-4<0$, nên đó là cực đại địa phương, với $\omega(0)=1$.

**Kiểm tra lại.** $\omega(\pm1)=0$ và $\omega(0)=1$; $\omega(\pm\tfrac12)=\tfrac9{16}<1$, khớp với việc $0$ là cực đại địa phương.
:::

![Hai đồ thị. Bên trái, hàm ghi là s: lát cắt s(u,0) = u² cong lên và lát cắt s(0,v) = −v² cong xuống, cắt nhau tại gốc; s ứng với ψ của ghi chú, u và v ứng với u₁ và u₂. Bên phải, hàm ghi là r(u) = (u² − 1)², tức ω(u) của ghi chú, với hai đáy bằng 0 tại u = −1 và u = 1 và một đỉnh cục bộ bằng 1 tại u = 0.](img/lec-05/critical-points.svg)

Hình bên trái vẽ hai lát cắt của $\psi$ qua gốc: một parabol cong lên và một parabol cong xuống, ứng với hai giá trị riêng $2$ và $-2$. Hình bên phải vẽ $\omega$ với hai đáy cùng độ sâu. Hàm $\psi$ có hai biến $u_1$, $u_2$, còn $\omega$ chỉ có một biến $u$. Trên hình, $\psi$ được ghi là $s$ với hai biến $u$, $v$, và $\omega$ được ghi là $r$; ghi chú đổi tên vì chữ $s$, $r$ và $v$ đã có nghĩa khác trong chương.

::: remark Nhận xét 05.9 (Nhiều cực tiểu cùng giá trị và giới hạn của điểm dừng)
**Đối xứng hoán vị.** Hoán đổi hai đơn vị ẩn cùng các trọng số vào và ra của chúng cho một bộ tham số khác có cùng hàm dự đoán, nên mất mát của mạng có nhiều cực tiểu cùng giá trị, giống $\omega$. Nhận xét 05.30 nêu lại đối xứng này trên mạng hai đơn vị ẩn.

**Giới hạn của tiêu chí gradient nhỏ.** Với hàm không lồi, $\lVert\nabla J\rVert_2$ nhỏ không chứng nhận cực tiểu toàn cục, cũng không chứng nhận cực tiểu địa phương. Kiểm giá trị riêng của Hessian theo Mệnh đề 05.8 cần ma trận $p\times p$, không khả thi khi $p$ lên tới hàng triệu. Thực hành vì vậy chọn bản lưu theo tiêu chí xác thực (Mục 1.3), không theo phân loại điểm dừng.

**Nhầm lẫn thường gặp.** Mất mát không lồi không có nghĩa huấn luyện thất bại. Mệnh đề 05.8 chỉ nói rằng gradient bằng $0$ không đủ để kết luận; nó không nói các điểm dừng gặp trong thực tế là xấu (Goodfellow, Bengio và Courville 2016, mục 8.2.2–8.2.3, tr. 283–288).
:::

**Trong học máy.** Đối tượng của Mệnh đề 05.8 là mất mát huấn luyện $J$ của một mạng, với $\theta$ là toàn bộ trọng số. Giả thiết khả vi hai lần bị vi phạm ở các điểm gãy của ReLU, nên mệnh đề chỉ áp dụng ở những vùng tham số mà mọi tiền kích hoạt trên dữ liệu khác $0$. Kết luận của nó giải thích hiện tượng mất mát đứng yên nhiều bước rồi giảm tiếp: quỹ đạo đi qua gần một điểm yên ngựa, nơi gradient nhỏ nhưng tồn tại hướng cong xuống. Tình huống 04.3 là một trường hợp tính được bằng tay.

::: exercise Bài tập 05.2
Cho $F(u_1,u_2)=u_1^3-3u_1+u_2^2$ trên $\mathbb R^2$.

- (a) Tìm mọi điểm dừng.
- (b) Phân loại từng điểm bằng Mệnh đề 05.8.
- (c) Chỉ ra một hướng $\Delta$ và một số $\tau>0$ làm $F$ giảm khi đi từ điểm yên ngựa theo $\tau\Delta$, rồi giải thích vì sao gradient tại đó không chỉ ra hướng này.
:::

::: hint
$\nabla F=(3u_1^2-3,\,2u_2)^T$ và $\nabla^2F=\operatorname{diag}(6u_1,2)$.
:::

::: solution
**Câu (a).**

$3u_1^2-3=0$ cho $u_1=\pm1$; $2u_2=0$ cho $u_2=0$. Hai điểm dừng là $(1,0)$ và $(-1,0)$.

**Câu (b).**

- Tại $(1,0)$: Hessian $\operatorname{diag}(6,2)$, hai giá trị riêng dương, nên đây là cực tiểu địa phương chặt theo Mệnh đề 05.8(d), với $F=-2$.
- Tại $(-1,0)$: Hessian $\operatorname{diag}(-6,2)$, có giá trị riêng âm và dương, nên đây là điểm yên ngựa theo Mệnh đề 05.8(c), với $F=2$.

**Câu (c).**

Hướng riêng của giá trị riêng $-6$ là $\Delta=(1,0)^T$. Dọc hướng này, $F(-1+\tau,0)=(-1+\tau)^3-3(-1+\tau)=2-3\tau^2+\tau^3$. Với $\tau=1$: $F(0,0)=0<2$. Gradient tại $(-1,0)$ bằng $0$, nên khai triển bậc nhất không phân biệt hướng nào; sự giảm đến từ số hạng bậc hai $-3\tau^2$.

**Kiểm tra lại.**

$F(0,0)=0$ tính trực tiếp từ công thức; $2-3+1=0$ khớp. Cực tiểu $(1,0)$ không toàn cục: $F(-3,0)=-27+9=-18$, nhỏ hơn $F(1,0)=-2$.
:::

**Chuỗi suy luận của mục.**

1. Ví dụ 05.1 đặt bài toán chọn tham số từ dữ liệu hữu hạn.
2. Định nghĩa 05.1 tách mất mát huấn luyện $J$ khỏi rủi ro kỳ vọng $R$; Mệnh đề 05.2 đo khoảng cách giữa chúng trên mô hình hằng.
3. Định nghĩa 05.4 và Mệnh đề 05.5 cho cách ước lượng $R$ bằng tập xác thực và chỉ ra độ lệch khi chọn.
4. Định nghĩa 05.7 và Mệnh đề 05.8 phân loại điểm dừng khi bỏ tính lồi.

Đích của mục là cặp quyết định: cực tiểu $J$ bằng bộ tối ưu, chọn bản lưu bằng $\widehat R_{\rm val}$.

**Kết mục.** Mục này xác định đại lượng mà mọi phương pháp của chương sẽ cực tiểu là $J$ trong (1.2), và tiêu chí chọn kết quả là mất mát xác thực (Định nghĩa 05.4, Mệnh đề 05.5). Mục chưa nói gì về chi phí tính $\nabla J$: theo (1.2), $\nabla J$ là trung bình của $N$ gradient mẫu, nên một bước giảm gradient của Bài 04 tốn $N$ lần chi phí một gradient mẫu. Mục 2 thay trung bình đầy đủ đó bằng trung bình trên một nhóm nhỏ quan sát rút ngẫu nhiên, rồi tính kỳ vọng và phương sai của ước lượng thu được.

## 2. Ước lượng gradient và hạ gradient ngẫu nhiên

Mục 1 cố định đại lượng cần cực tiểu là $J(\theta)=\tfrac1N\sum_i\ell_i(\theta)$. Phương pháp giảm gradient của Bài 04 cần $\nabla J(\theta_t)$ ở mỗi bước, và theo tính tuyến tính của đạo hàm, vectơ này là trung bình của $N$ gradient mẫu. Với $N=10^6$ quan sát, một bước cần một triệu gradient mẫu, và chi phí đó lặp lại ở mọi bước.

Mục này thay trung bình đầy đủ bằng trung bình trên $b$ quan sát rút ngẫu nhiên. Mục chứng minh ước lượng thu được có kỳ vọng bằng $\nabla J$ và hiệp phương sai bằng $\Sigma/b$, tính kỳ vọng thay đổi của $J$ sau một bước, viết thuật toán hạ gradient ngẫu nhiên kèm quy tắc dừng sớm của Mục 1.3, rồi đọc vai trò của cỡ nhóm $b$ và bước học $\eta$.

### 2.1 Nhu cầu: chi phí của gradient đầy đủ

Giả sử mọi $\ell_i$ khả vi tại $\theta$ và đặt gradient mẫu (per-example gradient) $g_i(\theta)=\nabla\ell_i(\theta)\in\mathbb R^p$. Đạo hàm của một tổng hữu hạn là tổng các đạo hàm, nên

$$
\nabla J(\theta)=\frac1N\sum_{i=1}^Ng_i(\theta).
\tag{2.1}
$$

Công thức (2.1) nói rằng gradient đầy đủ là trung bình cộng của $N$ vectơ cùng kích thước với $\theta$. Chi phí tính nó tăng tuyến tính theo $N$, và đó là toàn bộ nguồn chi phí mà mục này xử lý.

::: example Ví dụ 05.7 (Chi phí một bước)
**Dữ kiện.**

Giả sử mỗi gradient mẫu tốn cùng một chi phí $C$, đo bằng số phép tính. Tập huấn luyện có $N=10^6$ quan sát.

**Tính.**

| Một bước dùng | Số gradient mẫu | Chi phí |
|---|---|---|
| gradient đầy đủ | $10^6$ | $10^6C$ |
| nhóm $b=100$ quan sát | $100$ | $100C$ |

Một nghìn bước giảm gradient tốn $10^9C$; cùng chi phí đó đủ cho $10^7$ bước với nhóm $100$ quan sát.

**Diễn giải.**

Tỷ số $10^{-4}$ là tỷ số số phép tính, chưa phải tỷ số thời gian trên phần cứng: các gradient trong một nhóm có thể tính song song. Tỷ số chi phí một bước cũng chưa phải tỷ số chi phí để đạt một mức chất lượng, vì bước rẻ hơn dùng thông tin không đầy đủ.

**Kiểm tra lại.**

$100C/(10^6C)=10^{-4}$; $10^9C/(100C)=10^7$.
:::

Việc dùng $b$ thay cho $N$ gradient mẫu chỉ có căn cứ khi biết các $g_i$ quan hệ thế nào với trung bình của chúng. Ví dụ ba quan sát cho phép tính từng $g_i$ tại cùng một điểm.

::: example Ví dụ 05.8 (Gradient của từng quan sát tại nghiệm)
**Dữ kiện.** Ví dụ 05.1: $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$, $y=(-1,1,3)$, $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$ (1.1), nên $J'(\theta)=\theta-1$.

**Gradient mẫu.** $g_i(\theta)=\theta-y_i$. Tại $\theta=1$:

| Quan sát $y_i$ | $-1$ | $1$ | $3$ |
|---|---|---|---|
| $g_i(1)$ | $2$ | $0$ | $-2$ |

**Trung bình.** $\bar g=\tfrac13(2+0-2)=0$, trùng $J'(1)$ theo (1.1). Tổng quát hơn, $J'(\theta)=\theta-1$ bằng trung bình $\tfrac13\sum_i(\theta-y_i)$ tại mọi $\theta$.

**Kiểm tra lại.** Ba giá trị $g_i(\theta)-J'(\theta)=1-y_i$ bằng $2,0,-2$ tại mọi $\theta$: độ lệch giữa gradient mẫu và gradient đầy đủ không phụ thuộc $\theta$ trong ví dụ này.
:::

![Trục θ với điểm θ = 1. Ba mũi tên biểu diễn hướng âm gradient của ba quan sát: quan sát y = −1 cho −g = −2, mũi tên sang trái; quan sát y = 1 cho −g = 0, không dịch chuyển; quan sát y = 3 cho −g = 2, mũi tên sang phải.](img/lec-05/sample-directions.svg)

Hình vẽ hướng âm gradient của từng quan sát tại nghiệm, tức hướng mà một bước cập nhật theo riêng quan sát đó sẽ đi. Hai trong ba hướng khác $0$ dù nghiệm đã đạt: một nhóm chỉ chứa quan sát $y=-1$ sẽ đẩy tham số sang trái. Độ lệch đó đến từ sự khác nhau giữa các quan sát, không từ việc tham số chưa tối ưu.

Trực giác, chưa phải phát biểu hình thức: nếu chọn ngẫu nhiên một chỉ số $I_1$ với cùng xác suất $\tfrac1N$ cho mỗi quan sát, thì trung bình theo phép chọn của $g_{I_1}$ là trung bình cộng (2.1). Từng gradient mẫu có thể lệch khỏi trung bình, nhưng các độ lệch triệt tiêu theo kỳ vọng.

### 2.2 Gradient nhóm và hiệp phương sai

::: definition Định nghĩa 05.10 (Gradient nhóm và hiệp phương sai của gradient mẫu)
Cố định tập huấn luyện $D$ và tham số $\theta\in\mathbb R^p$; giả sử mọi $\ell_i$ khả vi tại $\theta$, và viết $g_i=g_i(\theta)$, $\bar g=\nabla J(\theta)$.

**Lấy mẫu.** Cho cỡ nhóm $b\ge1$. Các chỉ số $I_1,\ldots,I_b$ độc lập, mỗi chỉ số phân phối đều trên $\{1,\ldots,N\}$; nhóm được lấy có hoàn lại, nên một chỉ số có thể xuất hiện nhiều lần.

**Gradient nhóm.** Gradient nhóm (minibatch gradient) là

$$
\widehat g=\frac1b\sum_{r=1}^bg_{I_r}\in\mathbb R^p .
$$

**Hiệp phương sai của gradient mẫu.** Ma trận

$$
\Sigma(\theta)=\frac1N\sum_{i=1}^N(g_i-\bar g)(g_i-\bar g)^T\in\mathbb R^{p\times p}
\tag{2.2}
$$

là hiệp phương sai của $g_{I_1}$ khi $I_1$ phân phối đều.
:::

Định nghĩa có ba thành phần. Phép lấy mẫu là nguồn ngẫu nhiên duy nhất: dữ liệu và tham số được giữ cố định. Gradient nhóm là trung bình cộng của $b$ gradient mẫu được rút, cùng kích thước với $\theta$. Ma trận $\Sigma(\theta)$ có phần tử $(k,l)$ bằng trung bình của tích độ lệch tọa độ $k$ với độ lệch tọa độ $l$; nó không phụ thuộc $b$ và đo mức khác nhau giữa các gradient mẫu tại $\theta$.

Gradient nhóm là trường hợp vectơ của trung bình mẫu ở Định lý 05c.35, với $X_r=g_{I_r}$ và $n=b$. Trường hợp $b=N$ không cho gradient đầy đủ, vì lấy có hoàn lại vẫn có thể lặp chỉ số. Phản ví dụ cho việc bỏ giả thiết phân phối đều: ở Ví dụ 05.8, nếu chỉ số $3$ được chọn với xác suất $\tfrac12$ và hai chỉ số còn lại với xác suất $\tfrac14$, thì kỳ vọng của $g_{I_1}(1)$ là $\tfrac14\cdot2+\tfrac14\cdot0+\tfrac12\cdot(-2)=-\tfrac12\ne0=J'(1)$.

Định lý sau chỉ cần tính tuyến tính của kỳ vọng và tính độc lập giữa các lần rút.

::: theorem Định lý 05.11 (Gradient nhóm không chệch, hiệp phương sai $\Sigma/b$)
**Giả thiết.** Như Định nghĩa 05.10: $D$, $\theta$ cố định; mọi $\ell_i$ khả vi tại $\theta$; $I_1,\ldots,I_b$ độc lập, đều trên $\{1,\ldots,N\}$.

**Kết luận.**

$$
\mathbb E\bigl[\widehat g\mid D,\theta\bigr]=\nabla J(\theta),\qquad\operatorname{Cov}\bigl(\widehat g\mid D,\theta\bigr)=\frac{\Sigma(\theta)}b .
\tag{2.3}
$$

**Điều kiện áp dụng.** Phân phối đều cần cho cả hai kết luận; kết luận thứ hai cần thêm tính độc lập giữa các chỉ số.

**Phạm vi.** Đích của ước lượng là gradient của mất mát huấn luyện $J$, không phải gradient của rủi ro $R$. Định lý nói về một bước tại một $\theta$ cố định; nó không nói gì về dãy tham số sinh ra khi lặp.
:::

::: proof Chứng minh Định lý 05.11
**Bước 1 (một chỉ số).**

Với $I_1$ đều trên $\{1,\ldots,N\}$, định nghĩa kỳ vọng của biến rời rạc cho $\mathbb E[g_{I_1}\mid D,\theta]=\sum_{i=1}^N\tfrac1Ng_i$, và tổng này là $\bar g=\nabla J(\theta)$ theo (2.1). Tương tự, $\operatorname{Cov}(g_{I_1}\mid D,\theta)=\sum_i\tfrac1N(g_i-\bar g)(g_i-\bar g)^T=\Sigma(\theta)$ theo (2.2).

**Bước 2 (kỳ vọng của gradient nhóm).**

Mỗi $I_r$ có cùng phân phối đều như $I_1$ ở Bước 1. Tính tuyến tính của kỳ vọng cho

$$
\begin{aligned}
\mathbb E[\widehat g\mid D,\theta]&=\frac1b\sum_{r=1}^b\mathbb E[g_{I_r}\mid D,\theta]\\
&=\frac1b\cdot b\,\bar g\\
&=\bar g .
\end{aligned}
$$

**Bước 3 (khai triển hiệp phương sai).**

Đặt $\xi_r=g_{I_r}-\bar g$, nên $\widehat g-\bar g=\tfrac1b\sum_r\xi_r$ và $\mathbb E\xi_r=0$. Khi đó

$$
\operatorname{Cov}(\widehat g\mid D,\theta)=\frac1{b^2}\sum_{r=1}^b\sum_{r'=1}^b\mathbb E\bigl[\xi_r\xi_{r'}^T\bigr].
$$

**Bước 4 (hạng chéo triệt tiêu).**

Với $r\ne r'$, $\xi_r$ và $\xi_{r'}$ độc lập vì $I_r$ và $I_{r'}$ độc lập, nên $\mathbb E[\xi_r\xi_{r'}^T]=\mathbb E\xi_r\,(\mathbb E\xi_{r'})^T=0$. Với $r=r'$, $\mathbb E[\xi_r\xi_r^T]=\Sigma(\theta)$ theo Bước 1. Còn lại $b$ số hạng bằng $\Sigma(\theta)$, nên hiệp phương sai bằng $\tfrac{b\,\Sigma(\theta)}{b^2}=\tfrac{\Sigma(\theta)}b$. $\square$
:::

Định lý 05.11 có hai nửa với hai vai trò:

- nửa thứ nhất nói rằng, trung bình trên mọi nhóm có thể, gradient nhóm trỏ đúng hướng của gradient đầy đủ;
- nửa thứ hai nói rằng độ phân tán quanh hướng đó giảm theo $\tfrac1b$, với hằng số $\Sigma(\theta)$ do dữ liệu và tham số quyết định.

Không chệch là tính chất của trung bình trên mọi nhóm; một nhóm cụ thể vẫn có thể cho hướng lệch xa $-\nabla J$.

Hệ quả sau gom hiệp phương sai thành một số, dạng dùng trong mọi phân tích bước lặp ở phần còn lại của chương.

::: corollary Hệ quả 05.12 (Sai số bình phương trung bình và sai số chuẩn)
**Giả thiết.** Như Định lý 05.11.

**Kết luận.**

- (a) $\mathbb E\bigl[\lVert\widehat g-\nabla J(\theta)\rVert_2^2\mid D,\theta\bigr]=\dfrac{\operatorname{tr}\Sigma(\theta)}b$.
- (b) $\mathbb E\bigl[\lVert\widehat g\rVert_2^2\mid D,\theta\bigr]=\lVert\nabla J(\theta)\rVert_2^2+\dfrac{\operatorname{tr}\Sigma(\theta)}b$.
- (c) Khi $p=1$, $\Sigma(\theta)$ là một số. Sai số chuẩn (standard error) của $\widehat g$ là độ lệch chuẩn của nó, bằng $\sqrt{\Sigma(\theta)/b}$.

**Điều kiện áp dụng.** Như Định lý 05.11.

**Phạm vi.** Sai số chuẩn đo độ phân tán điển hình; nó không chặn sai số của một nhóm cụ thể.
:::

::: proof Chứng minh Hệ quả 05.12
**Bước 1 (phần a).**

Bình phương chuẩn của một vectơ là vết của tích ngoài: $\lVert u\rVert_2^2=\operatorname{tr}(uu^T)$. Lấy $u=\widehat g-\nabla J(\theta)$, rồi đổi thứ tự vết và kỳ vọng: kỳ vọng của $\lVert u\rVert_2^2$ bằng $\operatorname{tr}\operatorname{Cov}(\widehat g)$, tức $\operatorname{tr}\Sigma(\theta)/b$ theo (2.3).

**Bước 2 (phần b).**

Viết $\widehat g=\nabla J(\theta)+u$ và khai triển: $\lVert\widehat g\rVert_2^2=\lVert\nabla J(\theta)\rVert_2^2+2\nabla J(\theta)^Tu+\lVert u\rVert_2^2$. Số hạng giữa có kỳ vọng $0$ vì $\mathbb Eu=0$ theo (2.3); số hạng cuối có kỳ vọng như Bước 1.

**Bước 3 (phần c).**

Với $p=1$, hiệp phương sai là phương sai, và sai số chuẩn là căn bậc hai của phương sai. $\square$
:::

Phần (b) gọi là phân tích phương sai của mômen bậc hai: bình phương chuẩn kỳ vọng của gradient nhóm bằng phần "tín hiệu" $\lVert\nabla J\rVert_2^2$ cộng phần "nhiễu" $\operatorname{tr}\Sigma/b$. Phần (c) cho quy luật căn bậc hai: muốn sai số chuẩn giảm một nửa cần tăng $b$ bốn lần.

**Trong học máy.** Trong huấn luyện, $\theta$ là trọng số của mạng, $\ell_i$ là mất mát trên ảnh hay câu thứ $i$, và $\widehat g$ là vectơ mà mọi thư viện học sâu tính trên một nhóm (minibatch). Giả thiết lấy mẫu đều, độc lập, có hoàn lại thường được thay bằng việc xáo trộn dữ liệu rồi cắt thành các nhóm liên tiếp, tức lấy không hoàn lại trong một lượt; Nhận xét 05.13 nêu sự khác biệt. Kết luận (2.3) là lý do bộ tối ưu dùng được $\widehat g$ như thể nó là $\nabla J$ "trung bình", và Mệnh đề 05.14 dưới đây chỉ ra cái giá của phần nhiễu $\operatorname{tr}\Sigma/b$ (Goodfellow, Bengio và Courville 2016, mục 8.1.3, tr. 277–280).

::: example Ví dụ 05.9 (Gradient nhóm trên ví dụ ba quan sát)
**Dữ kiện.** Ví dụ 05.8 tại $\theta=1$, với ba gradient mẫu $2,0,-2$.

**Hiệp phương sai.** $p=1$ và $\bar g=0$, nên $\Sigma(1)=\tfrac13(2^2+0^2+(-2)^2)=\tfrac83$.

**Áp dụng Định lý 05.11.** Với mọi $b$: $\mathbb E\widehat g=0$ và $\operatorname{Var}\widehat g=\tfrac8{3b}$. Với $b=4$, phương sai bằng $\tfrac23$ và sai số chuẩn bằng $\sqrt{2/3}\approx0{,}816$.

**Diễn giải.** Tại nghiệm, gradient đầy đủ bằng $0$ nhưng gradient nhóm có độ lệch điển hình $0{,}816$ khi $b=4$. Mọi bước cập nhật tại đây do nhiễu lấy mẫu gây ra.

**Kiểm tra lại.** Với $b=1$, $\widehat g$ nhận $2,0,-2$ với xác suất $\tfrac13$ mỗi giá trị; phương sai trực tiếp bằng $\tfrac13(4+0+4)=\tfrac83=\tfrac8{3\cdot1}$.
:::

::: remark Nhận xét 05.13 (Rút không hoàn lại và đích của ước lượng)
**Không hoàn lại.** Khi $b\le N$ chỉ số khác nhau được rút đều trong mọi bộ $b$ chỉ số, gradient nhóm vẫn không chệch, còn hiệp phương sai nhân thêm hệ số $\tfrac{N-b}{N-1}$, theo Mệnh đề 05c.36 phát biểu cho từng tọa độ. Hệ số này gần $1$ khi $b\ll N$ và bằng $0$ khi $b=N$, lúc nhóm là toàn bộ dữ liệu.

**Đích là $\nabla J$.** Định lý 05.11 nói về gradient của mất mát huấn luyện. Nếu mỗi quan sát trong nhóm là một lần rút mới từ $P$ và chưa từng được dùng, thì cùng lập luận cho gradient nhóm là ước lượng không chệch của $\nabla R$; điều này chỉ đúng trong lượt đầu qua dữ liệu, trước khi quan sát được dùng lại (Goodfellow, Bengio và Courville 2016, mục 8.1.3, tr. 280).

**Nhầm lẫn thường gặp.** Một cách hiểu sai là gọi $\widehat g$ là "gradient xấp xỉ có sai số nhỏ" mà không nêu $b$ và $\Sigma$. Sai số của nó là ngẫu nhiên, với độ lớn điển hình $\sqrt{\operatorname{tr}\Sigma/b}$ có thể lớn hơn cả $\lVert\nabla J\rVert_2$, như tại nghiệm của Ví dụ 05.9.
:::

### 2.3 Một bước hạ gradient ngẫu nhiên

Định lý 05.11 nói về gradient nhóm tại một điểm, chưa nói gì về mất mát sau khi cập nhật theo nó. Thiếu hụt đó là thay đổi của $J$ sau một bước $\theta^+=\theta-\eta\widehat g$, với $\eta>0$ là bước học (learning rate), cùng vai trò với độ dài bước của Bài 04 (ở đó ký hiệu $t$). Ví dụ sau cho một bước cụ thể.

::: example Ví dụ 05.10 (Một bước làm mất mát huấn luyện tăng)
**Dữ kiện.** Ví dụ 05.1: $y=(-1,1,3)$, $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$, $J(\theta)=\tfrac16\bigl[(\theta+1)^2+(\theta-1)^2+(\theta-3)^2\bigr]=\tfrac12(\theta-1)^2+\tfrac43$ (1.1), nghiệm $\theta=1$. Nhóm một phần tử, quan sát được rút là $y=-1$; bước học $\eta=0{,}1$.

**Bước.** Gradient mẫu $g=1-(-1)=2$. Tham số mới $\theta^+=1-0{,}1\cdot2=0{,}8$.

**Thay đổi của hai mất mát.**

- Theo (1.1), $J(0{,}8)-J(1)=\tfrac12(0{,}8-1)^2=0{,}02$: mất mát huấn luyện tăng.
- Mất mát của chính quan sát được rút giảm từ $\tfrac12(1+1)^2=2$ xuống $\tfrac12(0{,}8+1)^2=1{,}62$.

**Diễn giải.** Bước đi xuống trên $\ell$ của quan sát được rút nhưng đi lên trên $J$. Tại nghiệm duy nhất của $J$, mọi bước khác $0$ đều làm $J$ tăng.

**Kiểm tra lại.** Tính trực tiếp từ định nghĩa:

$$
\begin{aligned}
J(0{,}8)&=\tfrac16\bigl(1{,}8^2+0{,}2^2+2{,}2^2\bigr)\\
&=\tfrac16(3{,}24+0{,}04+4{,}84)\\
&\approx1{,}3533 ,
\end{aligned}
$$

đúng bằng $\tfrac43+0{,}02$.
:::

![Hai đường cong theo θ: đường J(θ) có đáy tại θ = 1 và đường mất mát của quan sát y = −1. Mũi tên từ θ = 1 tới θ = 0,8 đi xuống trên đường mất mát mẫu nhưng đi lên trên đường J, với J tăng thêm 0,02.](img/lec-05/sample-step.svg)

Hình vẽ hai hàm theo $\theta$ từ công thức, không phải đường học đo được. Mũi tên từ $1$ tới $0{,}8$ đi xuống trên đường mất mát mẫu và đi lên trên $J$. Kết quả không mâu thuẫn với Định lý 05.11: kỳ vọng được tính trước khi biết nhóm, còn bước này là một hiện thực.

Mệnh đề sau cho kỳ vọng của thay đổi đó. Nó ghép cận trên bậc hai của Bổ đề 04.18 với Hệ quả 05.12.

::: proposition Mệnh đề 05.14 (Kỳ vọng mất mát sau một bước)
**Giả thiết.** $J:\mathbb R^p\to\mathbb R$ khả vi với gradient $L$-Lipschitz (Định nghĩa 04.17). Tại $\theta$ cố định, $\widehat g$ là gradient nhóm của Định nghĩa 05.10 với cỡ nhóm $b$; bước học $\eta>0$; $\theta^+=\theta-\eta\widehat g$.

**Kết luận.**

- (a) Kỳ vọng theo phép rút nhóm thỏa

$$
\mathbb E\,J(\theta^+)\le J(\theta)-\eta\Bigl(1-\frac{L\eta}2\Bigr)\lVert\nabla J(\theta)\rVert_2^2+\frac{L\eta^2}2\cdot\frac{\operatorname{tr}\Sigma(\theta)}b .
\tag{2.4}
$$

- (b) Nếu $J$ là hàm bậc hai với Hessian $L\mathrm I$ thì (2.4) xảy ra dấu bằng.
- (c) Với $\eta=\tfrac1L$: $\mathbb E\,J(\theta^+)\le J(\theta)-\dfrac1{2L}\Bigl(\lVert\nabla J(\theta)\rVert_2^2-\dfrac{\operatorname{tr}\Sigma(\theta)}b\Bigr)$.

**Điều kiện áp dụng.** Không cần tính lồi. Cần gradient Lipschitz trên đoạn nối $\theta$ với mọi điểm $\theta^+$ có thể.

**Phạm vi.** Mệnh đề nói về kỳ vọng sau một bước; nó không chặn $J(\theta^+)$ với một nhóm cụ thể và không cho tốc độ hội tụ.
:::

::: proof Chứng minh Mệnh đề 05.14
**Bước 1 (cận trên cho mỗi nhóm).**

Áp dụng Bổ đề 04.18 với hai điểm $\theta$ và $\theta^+=\theta-\eta\widehat g$:

$$
J(\theta^+)\le J(\theta)-\eta\nabla J(\theta)^T\widehat g+\frac{L\eta^2}2\lVert\widehat g\rVert_2^2 .
$$

Bất đẳng thức đúng với mọi giá trị của nhóm, vì bổ đề không dùng tính ngẫu nhiên.

**Bước 2 (lấy kỳ vọng).**

$\nabla J(\theta)$ cố định nên ra khỏi kỳ vọng. Theo (2.3), $\mathbb E[\nabla J(\theta)^T\widehat g]=\lVert\nabla J(\theta)\rVert_2^2$. Theo Hệ quả 05.12(b), $\mathbb E\lVert\widehat g\rVert_2^2=\lVert\nabla J(\theta)\rVert_2^2+\operatorname{tr}\Sigma(\theta)/b$. Thay vào và gom các số hạng chứa $\lVert\nabla J(\theta)\rVert_2^2$ được (2.4).

**Bước 3 (phần b).**

Nếu $J(\theta)=J(\theta^*)+\tfrac L2\lVert\theta-\theta^*\rVert_2^2$ thì khai triển Taylor là đẳng thức, nên Bước 1 có dấu bằng với mọi nhóm, và Bước 2 giữ dấu bằng.

**Bước 4 (phần c).**

Với $\eta=\tfrac1L$: $\eta(1-\tfrac{L\eta}2)=\tfrac1{2L}$ và $\tfrac{L\eta^2}2=\tfrac1{2L}$. $\square$
:::

Vế phải của (2.4) có ba số hạng. Số hạng đầu là giá trị hiện tại. Số hạng thứ hai là mức giảm của một bước gradient đầy đủ, như Bổ đề 04.20 khi $\eta\le\tfrac1L$. Số hạng thứ ba là cái giá của nhiễu, tỷ lệ với $\eta^2$ và với $\operatorname{tr}\Sigma/b$; nó dương ngay cả khi $\nabla J(\theta)=0$.

So với Bổ đề 04.20, mệnh đề thay gradient đầy đủ bằng một ước lượng không chệch và đổi kết luận từ "giảm chắc chắn" thành "giảm theo kỳ vọng khi tín hiệu lớn hơn nhiễu". Phần (c) cho điều kiện cụ thể: với $\eta=\tfrac1L$, kỳ vọng của $J$ giảm khi

$$
b>\frac{\operatorname{tr}\Sigma(\theta)}{\lVert\nabla J(\theta)\rVert_2^2}.
\tag{2.5}
$$

Tỷ số ở vế phải là tỷ số nhiễu trên tín hiệu tại $\theta$. Xa nghiệm, $\lVert\nabla J\rVert_2$ lớn và nhóm nhỏ đã đủ; gần nghiệm, $\lVert\nabla J\rVert_2\to0$ trong khi $\operatorname{tr}\Sigma$ thường dương, nên không cỡ nhóm cố định nào thỏa (2.5) mãi.

::: example Ví dụ 05.11 (Kiểm Mệnh đề 05.14 trên ví dụ ba quan sát)
**Dữ kiện.** (2.4), Mệnh đề 05.14(a): với $J$ có gradient $L$-Lipschitz, $\mathbb EJ(\theta^+)\le J(\theta)-\eta\bigl(1-\frac{L\eta}2\bigr)\lVert\nabla J(\theta)\rVert_2^2+\frac{L\eta^2}2\cdot\frac{\operatorname{tr}\Sigma(\theta)}b$; Mệnh đề 05.14(b): dấu bằng xảy ra khi $J$ bậc hai với Hessian $L\mathrm I$. Ví dụ ba quan sát: $y=(-1,1,3)$, gradient mẫu $g_i(\theta)=\theta-y_i$ và $\Sigma=\tfrac83$ tại mọi $\theta$ (Ví dụ 05.8); $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$ có $J''=L=1$, nên (b) áp dụng.

**Công thức.**

$$
\mathbb E\,J(\theta^+)-J(\theta)=-\eta\Bigl(1-\frac\eta2\Bigr)(\theta-1)^2+\frac{\eta^2}2\cdot\frac8{3b}.
$$

**Tại nghiệm, $\eta=0{,}1$, $b=1$.** Số hạng đầu bằng $0$, số hạng sau bằng $\tfrac{0{,}01}2\cdot\tfrac83=\tfrac1{75}\approx0{,}0133$.

**Ngưỡng giảm theo kỳ vọng.** Kỳ vọng giảm khi $(\theta-1)^2>\tfrac{\eta\cdot8/3}{(2-\eta)b}$. Với $\eta=0{,}1$, $b=1$: $(\theta-1)^2>\tfrac{8}{57}\approx0{,}140$, tức $\lvert\theta-1\rvert>0{,}375$.

**Kiểm tra lại.** Liệt kê ba nhóm tại $\theta=1$: $\theta^+$ bằng $0{,}8$, $1$, $1{,}2$ với $J$ tăng $0{,}02$, $0$, $0{,}02$. Trung bình $\tfrac{0{,}04}3=\tfrac1{75}$, khớp công thức.
:::

**Trong học máy.** Đối tượng của Mệnh đề 05.14 là một bước của bộ tối ưu SGD trên mất mát huấn luyện. Giả thiết gradient $L$-Lipschitz đúng với hồi quy tuyến tính và logistic (Nhận xét 04.19), nhưng với mạng sâu chỉ đúng cục bộ, trên một vùng tham số bị chặn; ngoài vùng đó (2.4) không được bảo đảm. Kết luận giải thích hai quan sát thực nghiệm: đường mất mát huấn luyện của SGD dao động chứ không giảm đơn điệu, và mức dao động giảm khi tăng cỡ nhóm hoặc giảm bước học. Tình huống 05.1 dùng (2.5) để chọn cỡ nhóm cho một bài hồi quy logistic.

### 2.4 Thuật toán và quy tắc dừng sớm

Vì một bước có thể làm $J$ tăng và vì $J$ khác $R$, thuật toán không thể trả về tham số cuối cùng một cách mặc định. Nó phải theo dõi mất mát xác thực định kỳ và trả về bản lưu tốt nhất, đúng quy tắc chọn của Mục 1.3.

::: algorithm Thuật toán 05.1 (Hạ gradient ngẫu nhiên với dừng sớm)
**Đầu vào.** Dữ liệu $D$, mô hình $f_\theta$, mất mát $\ell$; điểm đầu $\theta_0$; cỡ nhóm $b$; lịch bước học $\eta_t>0$; số vòng lặp tối đa $T$; tập xác thực và lịch đánh giá định trước; số lần chờ $K_{\rm stop}\ge1$; ngưỡng cải thiện $\varepsilon\ge0$.

**Khởi tạo.** Bản lưu $\theta_{\rm best}=\theta_0$, giá trị tốt nhất $\widehat R_{\rm val}(\theta_0)$, bộ đếm chờ bằng $0$.

**Các bước.** Với $t=0,1,\ldots,T-1$:

1. Rút $b$ chỉ số độc lập, đều trên $\{1,\ldots,N\}$, độc lập với các lần rút trước.
2. Tính $\widehat g_t=\tfrac1b\sum_{r=1}^b\nabla\ell_{I_r}(\theta_t)$.
3. Cập nhật $\theta_{t+1}=\theta_t-\eta_t\widehat g_t$.
4. Nếu $t+1$ là thời điểm đánh giá: tính $\widehat R_{\rm val}(\theta_{t+1})$.
    - Nếu giá trị mới nhỏ hơn giá trị tốt nhất, thay bản lưu bằng $\theta_{t+1}$ và giá trị tốt nhất bằng giá trị mới.
    - Nếu mức giảm so với giá trị tốt nhất trước lần đánh giá này lớn hơn $\varepsilon$, đặt bộ đếm về $0$; nếu không, tăng bộ đếm thêm $1$.
    - Nếu bộ đếm bằng $K_{\rm stop}$, dừng.

**Đầu ra.** Bản lưu $\theta_{\rm best}$.

**Chi phí.** Mỗi vòng tốn $bC$ cho gradient và $O(p)$ cho cập nhật; mỗi lần đánh giá tốn $N_{\rm val}$ lần tính mất mát.
:::

Thuật toán gồm hai vòng điều khiển lồng nhau. Vòng trong là phép cập nhật $\theta_{t+1}=\theta_t-\eta_t\widehat g_t$, chỉ dùng tập huấn luyện. Vòng ngoài là quy tắc dừng sớm, chỉ dùng tập xác thực. Khi mức giảm dương nhưng không vượt $\varepsilon$, bản lưu vẫn được thay còn bộ đếm vẫn tăng: cải thiện nhỏ được giữ lại nhưng không gia hạn thời gian chạy.

Một lượt qua dữ liệu (epoch) thường được hiểu là $N/b$ vòng, dùng tổng cộng $N$ gradient mẫu. Với lấy mẫu có hoàn lại, $N/b$ vòng chưa bảo đảm gặp mọi quan sát. Thuật toán là một quy trình vận hành, không kèm định lý hội tụ toàn cục; Nhận xét 05.16 ở cuối mục nêu các bảo đảm có điều kiện của Bài 05b.

::: example Ví dụ 05.12 (Bộ đếm dừng sớm)
**Dữ kiện.** $K_{\rm stop}=2$, $\varepsilon=0{,}01$. Trước chuỗi đánh giá, giá trị tốt nhất là $0{,}62$ và bộ đếm bằng $0$. Năm lần đánh giá kế tiếp cho $0{,}58$; $0{,}575$; $0{,}56$; $0{,}555$; $0{,}553$.

**Diễn biến.**

| Lần | Giá trị mới | Tốt nhất trước | Mức giảm | Tốt nhất sau | Bộ đếm |
|---|---|---|---|---|---|
| 1 | $0{,}580$ | $0{,}620$ | $0{,}040$ | $0{,}580$ | $0$ |
| 2 | $0{,}575$ | $0{,}580$ | $0{,}005$ | $0{,}575$ | $1$ |
| 3 | $0{,}560$ | $0{,}575$ | $0{,}015$ | $0{,}560$ | $0$ |
| 4 | $0{,}555$ | $0{,}560$ | $0{,}005$ | $0{,}555$ | $1$ |
| 5 | $0{,}553$ | $0{,}555$ | $0{,}002$ | $0{,}553$ | $2$ |

**Kết luận.** Bộ đếm đạt $K_{\rm stop}=2$ ở lần 5, thuật toán dừng và trả về bản lưu có mất mát xác thực $0{,}553$.

**Kiểm tra lại.** Lần 3 có mức giảm $0{,}015>0{,}01$, nên bộ đếm về $0$ dù lần 2 đã làm nó bằng $1$. Mọi giá trị mới đều nhỏ hơn giá trị tốt nhất trước đó, nên bản lưu được thay ở cả năm lần.
:::

::: exercise Bài tập 05.3
**Dữ kiện.** Ví dụ ba quan sát: $y=(-1,1,3)$, $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$, $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, $J''=L=1$; gradient mẫu $g_i(\theta)=\theta-y_i$, $\Sigma(\theta)=\tfrac83$ tại mọi $\theta$ (Ví dụ 05.1, 05.8, 05.9). Gradient nhóm $\widehat g=\tfrac1b\sum_{r=1}^bg_{I_r}(\theta)$ với các chỉ số rút đều, có hoàn lại; $\theta^+=\theta-\eta\widehat g$. (2.4), Mệnh đề 05.14(a): với $J$ có gradient $L$-Lipschitz, $\mathbb EJ(\theta^+)\le J(\theta)-\eta\bigl(1-\frac{L\eta}2\bigr)\lVert\nabla J(\theta)\rVert_2^2+\frac{L\eta^2}2\cdot\frac{\operatorname{tr}\Sigma(\theta)}b$; Mệnh đề 05.14(b): dấu bằng xảy ra khi $J$ bậc hai với Hessian $L\mathrm I$.

Trên ví dụ ba quan sát, xét tham số $\theta=0$, bước học $\eta=0{,}5$ và cỡ nhóm $b=2$ lấy có hoàn lại.

- (a) Một lần rút cho hai quan sát $y=3$ và $y=1$. Tính gradient nhóm, tham số mới và thay đổi của $J$.
- (b) Tính $\mathbb E\,J(\theta^+)-J(0)$ bằng Mệnh đề 05.14.
- (c) Xác định mọi cỡ nhóm $b$ để kỳ vọng của $J$ giảm tại $\theta=0$ với $\eta=0{,}5$.
:::

::: hint
$g_i(0)=-y_i$ và $J'(0)=-1$. Dấu bằng trong (2.4) xảy ra vì $J''=1$.
:::

::: solution
**Câu (a).**

Hai gradient mẫu là $-3$ và $-1$, nên $\widehat g=-2$. Tham số mới $\theta^+=0-0{,}5\cdot(-2)=1$, trùng nghiệm. Theo (1.1), $J(1)-J(0)=\tfrac43-\tfrac{11}6=-\tfrac12$.

**Câu (b).**

Với $L=1$, $\theta-1=-1$, $\Sigma=\tfrac83$, $b=2$:

$$
\begin{aligned}
\mathbb E\,J(\theta^+)-J(0)&=-0{,}5\cdot0{,}75\cdot1+\frac{0{,}25}2\cdot\frac86\\
&=-0{,}375+\frac16\\
&\approx-0{,}208 .
\end{aligned}
$$

**Câu (c).**

Kỳ vọng giảm khi $0{,}375>\tfrac{0{,}125\cdot8/3}{b}=\tfrac1{3b}$, tức $b>\tfrac89$. Mọi $b\ge1$ đều thỏa.

**Kiểm tra lại.**

Ở (a), mức giảm $-\tfrac12$ của một nhóm cụ thể lớn hơn mức giảm kỳ vọng $0{,}208$; một nhóm khác, chẳng hạn hai lần $y=-1$, cho $\widehat g=1$, $\theta^+=-0{,}5$ và $J$ tăng $\tfrac12(1{,}5^2-1)=0{,}625$. Trung bình trên chín cặp chỉ số có thứ tự cho đúng $-\tfrac{5}{24}\approx-0{,}208$.
:::

### 2.5 Cỡ nhóm và sai số chuẩn

Thuật toán 05.1 còn để mở hai đầu vào số: cỡ nhóm $b$ và bước học $\eta_t$. Hệ quả 05.12(c) cho căn cứ định lượng để chọn $b$: sai số chuẩn của gradient nhóm tỷ lệ với $1/\sqrt b$, trong khi chi phí tỷ lệ với $b$.

::: example Ví dụ 05.13 (Sai số chuẩn theo cỡ nhóm)
**Dữ kiện.** Ví dụ 05.9 tại $\theta=1$, $\Sigma=\tfrac83$, lấy có hoàn lại.

**Tính.** Sai số chuẩn $\sqrt{8/(3b)}$:

| $b$ | Phương sai $\tfrac8{3b}$ | Sai số chuẩn | Chi phí |
|---|---|---|---|
| $1$ | $\tfrac83$ | $1{,}633$ | $C$ |
| $4$ | $\tfrac23$ | $0{,}816$ | $4C$ |
| $16$ | $\tfrac16$ | $0{,}408$ | $16C$ |

**Diễn giải.** Mỗi lần tăng $b$ bốn lần, chi phí gấp bốn và sai số chuẩn giảm một nửa.

**Kiểm tra lại.** $\sqrt{8/3}\approx1{,}633$; $1{,}633/2\approx0{,}816$; $0{,}816/2=0{,}408$.
:::

![Đồ thị sai số chuẩn theo số gradient mẫu b tại θ = 1 cố định: ba điểm (1; 1,633), (4; 0,816), (16; 0,408) nằm trên đường cong căn bậc hai của 8/(3b).](img/lec-05/batch-standard-error.svg)

Đồ thị là phép tính tại một tham số cố định, không phải đường hội tụ qua các bước. Độ dốc giảm dần của đường cong là nội dung của Ví dụ 05.13: mỗi gradient mẫu thêm vào mang lại ít độ chính xác hơn gradient mẫu trước.

::: remark Nhận xét 05.15 (Ngân sách cố định và phần cứng)
**Ngân sách cố định.** Với ngân sách $B_{\rm tot}$ gradient mẫu, cỡ nhóm $b$ cho khoảng $B_{\rm tot}/b$ bước. Nhóm lớn cho ít bước chính xác, nhóm nhỏ cho nhiều bước nhiễu; Bài 05c, Mục 6.6 (Mệnh đề 05c.57, Ví dụ 05c.39), tính trên ví dụ ba quan sát rằng sai số cuối cùng có dạng chữ U theo $b$, với đáy ở $b=75$ khi $B_{\rm tot}=3000$ và bước học $0{,}1$.

**Phần cứng.** Khi $b$ chưa vượt mức song song của phần cứng, một nhóm $b$ quan sát tốn thời gian gần bằng một quan sát (Goodfellow, Bengio và Courville 2016, mục 8.1.3, tr. 279). Ngưỡng (2.5) cho cỡ nhóm tối thiểu tại điểm hiện tại; các công thức không xác định một cỡ nhóm tốt nhất cho mọi bài toán.
:::

### 2.6 Bước học và dao động gần nghiệm

Tăng $b$ làm giảm nhiễu nhưng tăng chi phí. Đại lượng thứ hai tác động lên biên độ của bước ngẫu nhiên mà không thêm phép tính là bước học $\eta$, hệ số nhân trực tiếp với $\widehat g$.

Đặt tham số tại nghiệm $\theta_t=1$ của ví dụ ba quan sát, nơi gradient đầy đủ bằng $0$, để tách riêng tác dụng của nhiễu. Theo Ví dụ 05.9, $\theta_{t+1}=1-\eta_t\widehat g_t$ có kỳ vọng $1$ và phương sai

$$
\operatorname{Var}(\theta_{t+1}\mid\theta_t=1)=\eta_t^2\tfrac8{3b} .
$$

Với $b=1$, $\eta_t=0{,}1$ cho $\approx0{,}0267$ và $\eta_t=0{,}05$ cho $\approx0{,}0067$. Giảm bước học một nửa làm phương sai của bước giảm bốn lần, nhưng cũng làm phần dịch chuyển có hướng $-\eta_t\nabla J$ ngắn đi một nửa khi tham số còn xa nghiệm.

![Hai hàng mũi tên từ cùng điểm θ = 1. Hàng trên với η = 0,1: ba bước có thể −0,2, 0 và 0,2. Hàng dưới với η = 0,05: ba bước −0,1, 0 và 0,1, ngắn đi một nửa.](img/lec-05/step-noise.svg)

Hình đặt ba bước có thể, $-2\eta$, $0$, $2\eta$ với $b=1$, trên cùng một trục cho hai bước học. Độ dài mỗi mũi tên tỷ lệ với $\eta$, nên hàng dưới là hàng trên thu nhỏ một nửa; phương sai, tỷ lệ với bình phương độ dài, giảm bốn lần, đúng công thức $\eta_t^2\tfrac8{3b}$.

Phép tính trên xét một bước. Khi lặp, nhiễu tích lũy nhưng phần có hướng kéo tham số về nghiệm, và hai tác dụng cân bằng ở một mức xác định. Ví dụ sau tính mức đó chính xác.

::: example Ví dụ 05.14 (Sai số bình phương trung bình của SGD với bước học cố định)
**Dữ kiện.** Ví dụ ba quan sát: $y=(-1,1,3)$, $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, gradient mẫu $g_i(\theta)=(\theta-1)-(y_i-1)$, $\Sigma=\tfrac83$ (Ví dụ 05.8, 05.9). Ví dụ 05.11: với $\eta=0{,}1$, $b=1$, kỳ vọng của $J$ giảm khi $(\theta-1)^2>\tfrac8{57}$. Điểm đầu $\theta_0=0$, bước học cố định $\eta\in(0,2)$, cỡ nhóm $b$; nhóm ở mỗi vòng độc lập với các nhóm trước. Đặt $\mathrm{MSE}_t=\mathbb E(\theta_t-1)^2$.

**Phương trình một bước.**

Theo Ví dụ 05.8, $\widehat g_t=(\theta_t-1)-\xi_t$, với $\xi_t$ là trung bình của $y_{I_r}-1$ trên nhóm thứ $t$; $\xi_t$ có kỳ vọng $0$, phương sai $\tfrac8{3b}$, và độc lập với $\theta_t$ vì $\theta_t$ chỉ phụ thuộc các nhóm trước. Do đó

$$
\theta_{t+1}-1=(1-\eta)(\theta_t-1)+\eta\,\xi_t .
$$

**Đệ quy cho $\mathrm{MSE}_t$.**

Bình phương, lấy kỳ vọng; hạng chéo $2\eta(1-\eta)\mathbb E[(\theta_t-1)\xi_t]$ bằng $0$ do độc lập và $\mathbb E\xi_t=0$:

$$
\mathrm{MSE}_{t+1}=(1-\eta)^2\mathrm{MSE}_t+\eta^2\,\frac8{3b}.
$$

**Giá trị giới hạn.**

Điểm bất động $\mathrm{MSE}_\infty$ thỏa $\mathrm{MSE}_\infty=(1-\eta)^2\mathrm{MSE}_\infty+\tfrac{8\eta^2}{3b}$, nên

$$
\mathrm{MSE}_\infty=\frac{8\eta^2/(3b)}{1-(1-\eta)^2}=\frac{8\eta}{3b(2-\eta)} ,
$$

và $\mathrm{MSE}_t-\mathrm{MSE}_\infty=(1-\eta)^{2t}(\mathrm{MSE}_0-\mathrm{MSE}_\infty)$.

**Số liệu với $b=1$, $\mathrm{MSE}_0=1$.**

| $\eta$ | $\mathrm{MSE}_\infty$ | $\mathrm{MSE}_{10}$ | $\mathrm{MSE}_{20}$ | $\mathrm{MSE}_{40}$ |
|---|---|---|---|---|
| $0{,}1$ | $\tfrac8{57}\approx0{,}140$ | $0{,}245$ | $0{,}153$ | $0{,}141$ |
| $0{,}05$ | $\tfrac8{117}\approx0{,}068$ | $0{,}402$ | $0{,}188$ | $0{,}084$ |

**Diễn giải.** Bước học $0{,}1$ tới gần mức giới hạn nhanh hơn nhưng mức đó cao gấp khoảng hai lần mức của bước $0{,}05$. Không giá trị cố định nào của $\eta$ vừa co nhanh vừa có mức giới hạn thấp.

**Kiểm tra lại.** $\mathrm{MSE}_1=0{,}81\cdot1+0{,}01\cdot\tfrac83\approx0{,}8367$, khớp $\mathrm{MSE}_\infty+0{,}81(1-\mathrm{MSE}_\infty)=0{,}1404+0{,}81\cdot0{,}8596\approx0{,}8367$. Mức $\tfrac8{57}$ trùng ngưỡng giảm theo kỳ vọng của Ví dụ 05.11: ở trạng thái giới hạn, phần giảm có hướng và phần tăng do nhiễu cân bằng nhau theo kỳ vọng.
:::

::: remark Nhận xét 05.16 (Bảo đảm hội tụ của Bài 05b và lịch bước học)
Hai định lý của Bài 05b, phát biểu lại theo ký hiệu của chương này với giả thiết $\operatorname{tr}\Sigma(\theta)\le\Gamma$ với mọi $\theta$:

- **Định lý 05b.36 (lồi mạnh).** Nếu $J$ lồi mạnh với hằng số $\mu$, gradient $L$-Lipschitz và $0<\eta\le\tfrac1L$, thì SGD bước học cố định thỏa $\mathbb E\lVert\theta_t-\theta^*\rVert_2^2\le(1-\eta\mu)^t\lVert\theta_0-\theta^*\rVert_2^2+\tfrac{\eta\Gamma}{\mu b}$.
- **Định lý 05b.43 (không lồi).** Nếu $J$ bị chặn dưới, gradient $L$-Lipschitz và $0<\eta\le\tfrac1L$, thì $\tfrac1T\sum_{t<T}\mathbb E\lVert\nabla J(\theta_t)\rVert_2^2\le\tfrac{2(J(\theta_0)-\inf J)}{\eta T}+\tfrac{L\eta\Gamma}b$.

Cả hai cận có một số hạng không giảm theo số vòng lặp, tỷ lệ với $\eta\Gamma/b$; Ví dụ 05.14 là trường hợp tính được chính xác, với $\mu=L=1$, $\Gamma=\tfrac83$, cho mức giới hạn thật $\tfrac8{57}$ dưới cận $\tfrac{8\eta}{3b}=\tfrac4{15}$ của Định lý 05b.36 khi $\eta=0{,}1$. Lịch bước học (learning-rate schedule), quy định $\eta_t$ giảm theo $t$, là cách đưa số hạng đó về $0$; Bài 05b chứng minh các lịch cụ thể, chương này không chứng minh lại.

**Nhầm lẫn thường gặp.** Định lý 05b.43 chỉ kết luận về chuẩn gradient, không về giá trị $J$ hay chất lượng nghiệm, phù hợp với Mệnh đề 05.8: với hàm không lồi, gradient nhỏ không chứng nhận cực tiểu.
:::

::: exercise Bài tập 05.4
**Dữ kiện.** Ví dụ ba quan sát: $y=(-1,1,3)$, nghiệm $\theta^*=1$, $\Sigma=\tfrac83$. Ví dụ 05.14: với bước học cố định $\eta\in(0,2)$, cỡ nhóm $b$ và nhóm độc lập giữa các vòng, $\mathrm{MSE}_t=\mathbb E(\theta_t-1)^2$ hội tụ về $\mathrm{MSE}_\infty=\frac{8\eta}{3b(2-\eta)}$.

Trên ví dụ ba quan sát với bước học cố định và nhóm độc lập giữa các vòng:

- (a) Tính mức giới hạn $\mathrm{MSE}_\infty$ của Ví dụ 05.14 với $\eta=0{,}2$, $b=4$.
- (b) Với $\eta=0{,}1$, tìm cỡ nhóm nhỏ nhất để $\mathrm{MSE}_\infty\le0{,}01$.
:::

::: hint
$\mathrm{MSE}_\infty=\tfrac{8\eta}{3b(2-\eta)}$.
:::

::: solution
**Câu (a).**

$\mathrm{MSE}_\infty=\tfrac{8\cdot0{,}2}{3\cdot4\cdot1{,}8}=\tfrac2{27}$, tức khoảng $0{,}0741$.

**Câu (b).**

$\tfrac{8\cdot0{,}1}{3b\cdot1{,}9}=\tfrac8{57b}\le0{,}01$ khi $b\ge\tfrac{800}{57}\approx14{,}04$, nên $b=15$.

**Kiểm tra lại.**

Ở (b), $b=14$ cho $\approx0{,}01003$ và $b=15$ cho $\approx0{,}00936$.
:::

**Chuỗi suy luận của mục.**

1. Công thức (2.1) và Ví dụ 05.8 cho thấy gradient đầy đủ là trung bình của các gradient mẫu, vốn khác nhau ngay cả tại nghiệm.
2. Định nghĩa 05.10, Định lý 05.11 và Hệ quả 05.12 cho gradient nhóm không chệch với sai số bình phương trung bình $\operatorname{tr}\Sigma/b$.
3. Mệnh đề 05.14 chuyển hai tính chất đó thành kỳ vọng thay đổi của $J$ sau một bước, với ngưỡng cỡ nhóm (2.5).
4. Thuật toán 05.1 ghép bước cập nhật với quy tắc dừng sớm của Mục 1.3.
5. Ví dụ 05.13 và 05.14 đo vai trò của $b$ và $\eta$; Nhận xét 05.16 dẫn tới các định lý hội tụ của Bài 05b.

Đích của mục là Thuật toán 05.1 cùng hai kết quả định lượng (2.3) và (2.4).

**Kết mục.** Mục này cho một nguồn gradient rẻ và không chệch (Định lý 05.11) và một quy trình dùng nó (Thuật toán 05.1). Nhiễu lấy mẫu được kiểm soát bằng $b$ và $\eta$, nhưng ngay cả khi bỏ hẳn nhiễu, tức $b$ lớn, phép cập nhật $\theta-\eta\nabla J$ vẫn tiến chậm khi độ cong của $J$ khác nhau theo các hướng: Ví dụ 04.7 của Bài 04 cho thấy trên hàm bậc hai $q$ của Mục 3, không bước cố định nào làm cả hai tọa độ co nhanh. Mục 3 phân tích hiện tượng đó bằng gradient đầy đủ trên cùng hàm bậc hai, rồi thay đổi cách dùng gradient bằng momentum và Nesterov.

## 3. Phương pháp momentum và Nesterov

Mục 2 kết thúc với nhận xét rằng bỏ nhiễu lấy mẫu chưa đủ để giảm gradient tiến nhanh. Xét hàm bậc hai

$$
q(\theta)=\tfrac12\bigl(3[\theta]_1^2+7[\theta]_2^2\bigr),\qquad\theta\in\mathbb R^2,
\tag{3.1}
$$

là ví dụ xuyên suốt VD1 của Bài 04 (Ví dụ 04.2–04.7) viết theo biến $\theta$, với điểm đầu $\theta_0=(2,4)^T$; ký hiệu $[\theta]_i$ chỉ tọa độ thứ $i$ của vectơ $\theta$, còn $\theta_t$ chỉ vectơ ở vòng $t$. Hàm có Hessian hằng $H=\operatorname{diag}(3,7)$, gradient $\nabla q(\theta)=H\theta$ và cực tiểu duy nhất tại gốc. Theo Ví dụ 04.7, bước cố định $\tfrac14$ làm tọa độ thứ hai đổi dấu ở mỗi bước, còn một bước nhỏ đủ để tránh đổi dấu thì làm tọa độ thứ nhất co chậm.

Mục này giữ nguyên hàm $q$, điểm đầu và gradient đầy đủ trong mọi phép so sánh, để khác biệt giữa các phương pháp không lẫn với khác biệt giữa các bài toán. Mục cho điều kiện co của bước gradient trên hàm bậc hai, quy tắc momentum cùng dạng tổng có trọng số của nó, phân tích momentum như một hệ tuyến tính hai biến, và quy tắc Nesterov với điểm tính gradient dời về phía trước.

### 3.1 Nhu cầu: hướng gradient trên hàm bậc hai

::: example Ví dụ 05.15 (Hướng âm gradient lệch khỏi hướng tới cực tiểu)
**Dữ kiện.** $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$ (3.1), $\nabla q(\theta)=(3[\theta]_1,7[\theta]_2)^T$, cực tiểu $\theta^*=0$; điểm $\theta_0=(2,4)^T$.

**Gradient.** $g_0=\nabla q(\theta_0)=(3\cdot2,\,7\cdot4)^T$, tức $g_0=(6,28)^T$.

**So hai hướng.** Hướng tới cực tiểu là $-\theta_0=-2(1,2)^T$. Hướng âm gradient là $-g_0=-2(3,14)^T$. Tỷ số thành phần thứ hai trên thứ nhất là $2$ ở hướng thứ nhất và $\tfrac{14}3\approx4{,}67$ ở hướng thứ hai, nên hai hướng khác phương.

**Góc lệch.** Côsin của góc giữa hai hướng là

$$
\begin{aligned}
\cos\angle(-g_0,-\theta_0)&=\frac{g_0^T\theta_0}{\lVert g_0\rVert_2\lVert\theta_0\rVert_2}\\
&=\frac{12+112}{\sqrt{820}\,\sqrt{20}}\\
&\approx0{,}968 ,
\end{aligned}
$$

tức góc lệch khoảng $14{,}5^\circ$.

**Kiểm tra lại.** Mỗi tọa độ của gradient bằng tọa độ của $\theta$ nhân với độ cong riêng: $[g_0]_1=3\cdot2$, $[g_0]_2=7\cdot4$. Hai độ cong khác nhau là nguồn gốc của độ lệch.
:::

![Các đường mức elip của q trên mặt phẳng hai tọa độ của θ, dài theo trục tọa độ thứ nhất và hẹp theo trục tọa độ thứ hai. Điểm θ₀ = (2, 4) và mũi tên âm gradient tại đó, vuông góc với đường mức qua θ₀, lệch khỏi hướng về gốc.](img/lec-05/quadratic-initial.svg)

Hình vẽ các đường mức của $q$: elip dài theo trục $[\theta]_1$, nơi độ cong nhỏ, và hẹp theo trục $[\theta]_2$, nơi độ cong lớn. Mũi tên âm gradient vuông góc với đường mức qua $\theta_0$, nên nó chỉ về phía thành dốc của "thung lũng" hơn là dọc theo đáy. Trực giác, chưa phải phát biểu hình thức: mỗi tọa độ được cập nhật theo độ cong riêng của nó, và một bước học chung không thể hợp với cả hai độ cong.

Mệnh đề sau phát biểu trực giác đó cho mọi hàm bậc hai lồi chặt (còn gọi là lồi nghiêm ngặt). Nó là phiên bản chặt hơn của Nhận xét 04.13, với chứng minh đầy đủ.

::: proposition Mệnh đề 05.17 (Bước gradient trên hàm bậc hai)
**Giả thiết.** $q(\theta)=\tfrac12(\theta-\theta^*)^TH(\theta-\theta^*)$, với $H\in\mathbb R^{p\times p}$ đối xứng xác định dương, có phân tích $H=Q\Lambda Q^T$ trong đó $Q$ trực giao và $\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_p)$; $\mu=\min_i\lambda_i$, $L=\max_i\lambda_i$, $\kappa=L/\mu$. Dãy giảm gradient $\theta_{t+1}=\theta_t-\eta\nabla q(\theta_t)$ với bước cố định $\eta>0$.

**Kết luận.**

- (a) Với $g=\nabla q(\theta)$, $q(\theta-\eta g)=q(\theta)-\eta\lVert g\rVert_2^2+\tfrac{\eta^2}2g^THg$ là đẳng thức.
- (b) Đặt $\chi_t=Q^T(\theta_t-\theta^*)$. Khi đó $[\chi_{t}]_i=(1-\eta\lambda_i)^t[\chi_0]_i$ với mọi $i$ và $t$.
- (c) $\theta_t\to\theta^*$ với mọi $\theta_0$ khi và chỉ khi $0<\eta<\tfrac2L$.
- (d) $\max_i\lvert1-\eta\lambda_i\rvert\ge\tfrac{\kappa-1}{\kappa+1}$ với mọi $\eta>0$, dấu bằng khi $\eta=\tfrac2{\mu+L}$.

**Điều kiện áp dụng.** Hàm bậc hai lồi chặt, gradient đầy đủ, bước cố định.

**Phạm vi.** Với hàm khả vi hai lần không bậc hai, (a) chỉ là xấp xỉ Taylor cục bộ và (c) chỉ mô tả hành vi gần một cực tiểu có Hessian xác định dương.
:::

::: proof Chứng minh Mệnh đề 05.17
**Bước 1 (phần a).**

$q$ là đa thức bậc hai nên khai triển Taylor tại $\theta$ là đẳng thức: $q(\theta+\Delta)=q(\theta)+g^T\Delta+\tfrac12\Delta^TH\Delta$ với mọi $\Delta\in\mathbb R^p$. Thay $\Delta=-\eta g$ được (a).

**Bước 2 (phần b).**

$\nabla q(\theta)=H(\theta-\theta^*)$, nên $\theta_{t+1}-\theta^*=(\mathrm I-\eta H)(\theta_t-\theta^*)$. Nhân trái với $Q^T$ và dùng $Q^THQ=\Lambda$:

$$
\chi_{t+1}=Q^T(\mathrm I-\eta H)Q\,\chi_t=(\mathrm I-\eta\Lambda)\chi_t .
$$

Ma trận $\mathrm I-\eta\Lambda$ chéo, nên tọa độ thứ $i$ nhân với $1-\eta\lambda_i$ ở mỗi bước; quy nạp theo $t$ cho (b).

**Bước 3 (phần c).**

Vì $Q$ trực giao, $\lVert\theta_t-\theta^*\rVert_2=\lVert\chi_t\rVert_2$. Theo (b), mọi tọa độ về $0$ với mọi $\chi_0$ khi và chỉ khi $\lvert1-\eta\lambda_i\rvert<1$ với mọi $i$, tức $0<\eta\lambda_i<2$ với mọi $i$. Điều kiện chặt nhất ứng với $\lambda_i=L$, cho $0<\eta<\tfrac2L$. Nếu $\eta\ge\tfrac2L$, chọn $\theta_0-\theta^*$ là vectơ riêng của $L$; khi đó $\lvert[\chi_t]_i\rvert=\lvert1-\eta L\rvert^t\lvert[\chi_0]_i\rvert$ không giảm.

**Bước 4 (phần d).**

Mọi $\lambda_i$ nằm trong $[\mu,L]$, và hàm $\lambda\mapsto\lvert1-\eta\lambda\rvert$ lồi, nên giá trị lớn nhất trên đoạn đạt tại một đầu mút: $\max_i\lvert1-\eta\lambda_i\rvert=\max\{\lvert1-\eta\mu\rvert,\lvert1-\eta L\rvert\}$. Xét hai trường hợp.

- Nếu $\eta\le\tfrac2{\mu+L}$: $1-\eta\mu\ge1-\tfrac{2\mu}{\mu+L}=\tfrac{L-\mu}{L+\mu}$.
- Nếu $\eta\ge\tfrac2{\mu+L}$: $\eta L-1\ge\tfrac{2L}{\mu+L}-1=\tfrac{L-\mu}{L+\mu}$.

Trong cả hai trường hợp, giá trị lớn nhất không nhỏ hơn $\tfrac{L-\mu}{L+\mu}=\tfrac{\kappa-1}{\kappa+1}$, và tại $\eta=\tfrac2{\mu+L}$ cả hai biểu thức bằng đúng giá trị này. $\square$
:::

Mệnh đề đọc theo từng phần như sau.

- Phần (a): một bước gradient làm $q$ giảm một lượng bậc nhất $\eta\lVert g\rVert_2^2$ và tăng một lượng bậc hai $\tfrac{\eta^2}2g^THg$; khi $\eta$ lớn, số hạng chứa $H$ thắng.
- Phần (b): trong hệ tọa độ của các vectơ riêng, giảm gradient là $p$ phép nhân vô hướng độc lập, mỗi phép có hệ số co $1-\eta\lambda_i$.
- Phần (c) và (d): độ cong lớn nhất chặn bước học, còn độ cong nhỏ nhất quyết định tốc độ; với bước tốt nhất, hệ số co là $\tfrac{\kappa-1}{\kappa+1}$, gần $1$ khi $\kappa$ lớn.

So với Định lý 04.26, mệnh đề hẹp hơn vì chỉ xét hàm bậc hai, nhưng chính xác hơn: Định lý 04.26 cho cận $1-\tfrac1\kappa$ với bước $\tfrac1L$, còn phần (b) cho đúng hệ số co của từng tọa độ. Phần (c) cũng cho điều kiện cần, điều mà một cận trên không cho.

::: example Ví dụ 05.16 (Bước $\tfrac14$ và bước $\tfrac1{20}$ trên $q$)
**Dữ kiện.** $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$ (3.1), $\nabla q(\theta)=(3[\theta]_1,7[\theta]_2)^T$, Hessian $H=\operatorname{diag}(3,7)$, $Q=\mathrm I$, $\lambda_1=\mu=3$, $\lambda_2=L=7$, $\kappa=\tfrac73$; $\theta_0=(2,4)^T$, $g_0=(6,28)^T$ (Ví dụ 05.15). Mệnh đề 05.17: (a) $q(\theta-\eta g)=q(\theta)-\eta\lVert g\rVert_2^2+\tfrac{\eta^2}2g^THg$; (b) $[\chi_t]_i=(1-\eta\lambda_i)^t[\chi_0]_i$ với $\chi_t=Q^T(\theta_t-\theta^*)$; (c) dãy hội tụ với mọi $\theta_0$ khi và chỉ khi $0<\eta<\tfrac2L$; (d) $\max_i\lvert1-\eta\lambda_i\rvert\ge\frac{\kappa-1}{\kappa+1}$, dấu bằng tại $\eta=\frac2{\mu+L}$.

**Hệ số co.** Với (3.1), $Q=\mathrm I$, $\lambda_1=3$, $\lambda_2=7$, $L=7$. Điều kiện (c) là $0<\eta<\tfrac27$, tức $\eta$ dưới khoảng $0{,}286$. Bước tốt nhất theo (d) là $\eta=\tfrac2{10}=0{,}2$, với hệ số $\tfrac{7/3-1}{7/3+1}=0{,}4$.

**Bước $\eta=\tfrac14$.** Hai hệ số là $1-\tfrac34=\tfrac14$ và $1-\tfrac74=-\tfrac34$. Từ $(2,4)^T$: $\theta_1=(0{,}5;\,-3)^T$, $\theta_2=(0{,}125;\,2{,}25)^T$. Tọa độ thứ hai đổi dấu ở mỗi bước và chỉ co theo hệ số $\tfrac34$.

**Bước $\eta=\tfrac1{20}$.** Hai hệ số là $0{,}85$ và $0{,}65$, cùng dương, nên tham số không vượt trục. Đổi lại, sau mười bước tọa độ thứ nhất còn $0{,}85^{10}\approx0{,}197$ lần giá trị ban đầu.

**Kiểm tra lại.** Theo (a) với $\eta=\tfrac14$ tại $\theta_0$: $q(\theta_0)=\tfrac12(12+112)=62$, $\lVert g_0\rVert_2^2=820$, $g_0^THg_0=3\cdot36+7\cdot784=5596$, nên $q(\theta_1)=62-205+\tfrac{5596}{32}=31{,}875$; tính trực tiếp $q(0{,}5;\,-3)=\tfrac12(0{,}75+63)=31{,}875$.
:::

![Hai bước giảm gradient với η = 1/4 trên các đường mức của q: từ (2, 4) tới (0,5; −3) rồi tới (0,125; 2,25). Tọa độ thứ hai đổi dấu qua các bước, quỹ đạo nhảy qua lại hai phía trục tọa độ thứ nhất.](img/lec-05/quadratic-step.svg)

Hình cho thấy hai bước với $\eta=\tfrac14$: tọa độ thứ nhất gần như về $0$ ngay, tọa độ thứ hai nhảy qua lại hai phía trục $[\theta]_1$. Với $\eta=\tfrac1{20}$, các bước liên tiếp giữ cùng dấu ở cả hai tọa độ. Tính nhất quán đó là căn cứ cho ý tưởng của mục kế tiếp: cộng một phần bước cũ vào bước mới để dịch chuyển dài hơn theo hướng mà các bước đồng thuận.

**Trong học máy.** Hàm bậc hai là mô hình cục bộ của mất mát gần một cực tiểu có Hessian xác định dương, nên Mệnh đề 05.17 mô tả hành vi của giảm gradient ở giai đoạn cuối huấn luyện. Với mạng sâu, Hessian không hằng và không biết trước, nên $L$ và $\kappa$ chỉ được ước lượng; hiện tượng mất mát "nhảy" khi tăng bước học là phần (c) quan sát được trên một hướng có độ cong lớn (Goodfellow, Bengio và Courville 2016, mục 8.2.1, tr. 282–283). Với hồi quy tuyến tính và logistic, $\kappa$ lớn khi các đặc trưng có thang đo lệch nhau; Tình huống 05.2 tính trường hợp $\kappa=100$.

### 3.2 Momentum: tích lũy hướng cập nhật

Ví dụ 05.16 đặt ra một mâu thuẫn: bước học lớn làm hướng cong mạnh dao động, bước học nhỏ làm hướng cong yếu tiến chậm. Trực giác, chưa phải phát biểu hình thức: nếu mỗi bước giữ lại một phần bước trước, các thành phần cùng dấu qua nhiều bước được cộng dồn, còn các thành phần đổi dấu triệt tiêu một phần. Ví dụ sau tính hai bước của ý tưởng đó với bước học $\tfrac1{20}$ giữ nguyên, để tách tác dụng của phần giữ lại khỏi tác dụng của bước học.

::: example Ví dụ 05.17 (Hai bước tích lũy trên $q$)
**Dữ kiện.** $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$ (3.1), $\nabla q(\theta)=(3[\theta]_1,7[\theta]_2)^T$, $\theta_0=(2,4)^T$, $\nabla q(\theta_0)=(6,28)^T$, bước học $\eta=0{,}05$, hệ số giữ lại $\beta=0{,}5$. Bước dịch chuyển ở vòng $t$, gọi là vận tốc $v_t$, bắt đầu từ $v_0=0$; quy tắc cập nhật là $v_{t+1}=\beta v_t-\eta\nabla q(\theta_t)$, $\theta_{t+1}=\theta_t+v_{t+1}$.

**Vòng 1.** $v_1=0{,}5\cdot0-0{,}05\cdot(6,28)^T=(-0{,}3;\,-1{,}4)^T$ và $\theta_1=\theta_0+v_1=(1{,}7;\,2{,}6)^T$. Vì $v_0=0$, vòng này trùng một bước giảm gradient.

**Vòng 2.** Gradient tại $\theta_1$ là $(3\cdot1{,}7;\,7\cdot2{,}6)^T=(5{,}1;\,18{,}2)^T$.

- Phần giữ lại: $\beta v_1=(-0{,}15;\,-0{,}7)^T$.
- Phần gradient mới: $-0{,}05\cdot(5{,}1;\,18{,}2)^T=(-0{,}255;\,-0{,}91)^T$.
- Tổng: $v_2=(-0{,}405;\,-1{,}61)^T$, và $\theta_2=\theta_1+v_2=(1{,}295;\,0{,}99)^T$.

**Kiểm tra lại.** Giảm gradient cùng bước cho $\theta_2=(0{,}85^2\cdot2;\,0{,}65^2\cdot4)^T=(1{,}445;\,1{,}69)^T$. Hai thành phần của $\beta v_1$ cùng dấu với phần gradient mới, nên momentum đi xa hơn theo cả hai tọa độ.
:::

![Từ điểm θ₁ = (1,7; 2,6), hai vectơ nối tiếp: trước là βv₁ = (−0,15; −0,7), sau là bước âm gradient −η∇q(θ₁) = (−0,255; −0,91). Điểm cuối là θ₂ = (1,295; 0,99), vẽ trên các đường mức của q.](img/lec-05/momentum-vectors.svg)

Hình ghép hai vectơ nối tiếp từ $\theta_1$: phần quán tính $\beta v_1$, rồi phần âm gradient tại $\theta_1$. Viết cấu trúc của hai vòng cho mọi $t$ và cho phép gradient nhóm thay gradient đầy đủ được quy tắc sau.

::: algorithm Thuật toán 05.2 (Momentum)
**Đầu vào.** Như Thuật toán 05.1, với bước học cố định $\eta>0$; thêm hệ số momentum $0\le\beta<1$.

**Khởi tạo.** $v_0=0$.

**Các bước.** Với $t=0,1,\ldots$:

1. Rút nhóm $I_1,\ldots,I_b$ như Thuật toán 05.1 và tính $\widehat g_t=\tfrac1b\sum_r\nabla\ell_{I_r}(\theta_t)$.
2. Cập nhật vận tốc: $v_{t+1}=\beta v_t-\eta\widehat g_t$.
3. Cập nhật tham số: $\theta_{t+1}=\theta_t+v_{t+1}$.

Quy tắc dừng sớm, bản lưu và đầu ra giữ như Thuật toán 05.1.

**Chi phí.** Một gradient nhóm mỗi vòng như SGD; thêm bộ nhớ cho $v_t$ gồm $p$ số và $O(p)$ phép tính cập nhật.
:::

Thuật toán đổi một điều so với SGD: tham số không dịch theo $-\eta\widehat g_t$ mà theo vận tốc $v_{t+1}$, tổng của phần vận tốc cũ được giữ lại và bước âm gradient mới. Khi $\beta=0$, quy tắc trở lại SGD. Tên gọi vận tốc theo Goodfellow, Bengio và Courville (2016, mục 8.3.2, tr. 296), xuất phát từ cách đọc vật lý: $\theta$ là vị trí của một hạt, $-\widehat g$ là lực, và $1-\beta$ đóng vai lực cản.

Mệnh đề sau viết vận tốc theo toàn bộ lịch sử gradient. Nó cho biết gradient cũ ảnh hưởng tới bước hiện tại với trọng số nào.

::: proposition Mệnh đề 05.18 (Vận tốc là tổng có trọng số của các gradient)
**Giả thiết.** Thuật toán 05.2 với $\eta$, $\beta$ cố định, $v_0=0$, và dãy gradient bất kỳ $\widehat g_0,\widehat g_1,\ldots$.

**Kết luận.**

- (a) Với mọi $t\ge0$,

$$
v_{t+1}=-\eta\sum_{t'=0}^t\beta^{t-t'}\widehat g_{t'} .
\tag{3.2}
$$

- (b) Nếu mọi $\widehat g_{t'}$ bằng cùng một vectơ $g$ thì $v_{t+1}=-\eta\tfrac{1-\beta^{t+1}}{1-\beta}g$, và $v_{t+1}\to-\tfrac\eta{1-\beta}g$ khi $t\to\infty$.

**Điều kiện áp dụng.** Bước học và hệ số cố định.

**Phạm vi.** Mệnh đề là đồng nhất thức đại số; nó không nói $J$ giảm.
:::

::: proof Chứng minh Mệnh đề 05.18
**Bước 1 (cơ sở).**

Với $t=0$: $v_1=\beta\cdot0-\eta\widehat g_0=-\eta\widehat g_0$, đúng (3.2).

**Bước 2 (quy nạp).**

Giả sử (3.2) đúng cho $v_t$, tức $v_t=-\eta\sum_{t'=0}^{t-1}\beta^{t-1-t'}\widehat g_{t'}$. Thay vào bước 2 của thuật toán:

$$
\begin{aligned}
v_{t+1}&=\beta v_t-\eta\widehat g_t\\
&=-\eta\sum_{t'=0}^{t-1}\beta^{t-t'}\widehat g_{t'}-\eta\widehat g_t\\
&=-\eta\sum_{t'=0}^{t}\beta^{t-t'}\widehat g_{t'} .
\end{aligned}
$$

Dòng thứ hai đưa $\beta$ vào trong tổng; dòng thứ ba nhập số hạng $t'=t$ với $\beta^0=1$.

**Bước 3 (gradient hằng).**

Với $\widehat g_{t'}=g$, (3.2) cho $v_{t+1}=-\eta g\sum_{t'=0}^t\beta^{t'}$, và tổng cấp số nhân bằng $\tfrac{1-\beta^{t+1}}{1-\beta}$. Vì $0\le\beta<1$, $\beta^{t+1}\to0$. $\square$
:::

Công thức (3.2) nói rằng gradient ở vòng $t'$ góp vào bước hiện tại với trọng số $\beta^{t-t'}$: gradient càng cũ càng nhẹ, theo cấp số nhân. Phần (b) cho trường hợp các gradient đồng thuận hoàn toàn: bước dài dần tới $\tfrac1{1-\beta}$ lần bước SGD, tức gấp $2$ khi $\beta=0{,}5$ và gấp $10$ khi $\beta=0{,}9$. Khi các gradient đổi dấu luân phiên, các số hạng của (3.2) triệt tiêu một phần, nên bước theo hướng đó ngắn lại.

Nhầm lẫn thường gặp là gọi (3.2) là trung bình trượt của gradient. Các trọng số $\beta^{t-t'}$ có tổng $\tfrac{1-\beta^{t+1}}{1-\beta}$, khác $1$, nên $v_{t+1}$ không cùng thang với một gradient; so phương sai của $v_t$ với phương sai của $\widehat g_t$ như hai đại lượng cùng thang là sai.

::: example Ví dụ 05.18 (Đối chứng giảm gradient với momentum trong sáu bước)
**Dữ kiện.** $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$ (3.1), $\nabla q(\theta)=(3[\theta]_1,7[\theta]_2)^T$, $\theta_0=(2,4)^T$, $\eta=0{,}05$, gradient đầy đủ; momentum dùng $\beta=0{,}5$, $v_0=0$. Hai quy tắc: giảm gradient: $\theta_{t+1}=\theta_t-\eta\nabla q(\theta_t)$; momentum (Thuật toán 05.2, gradient đầy đủ): $v_{t+1}=\beta v_t-\eta\nabla q(\theta_t)$, $\theta_{t+1}=\theta_t+v_{t+1}$.

**Kết quả.** Các giá trị $q(\theta_t)$, tính từ hai quy tắc và làm tròn bốn chữ số:

| $t$ | Giảm gradient | Momentum |
|---|---|---|
| $0$ | $62$ | $62$ |
| $1$ | $27{,}995$ | $27{,}995$ |
| $2$ | $13{,}1284$ | $5{,}9459$ |
| $3$ | $6{,}4864$ | $1{,}3016$ |
| $4$ | $3{,}4194$ | $2{,}1009$ |
| $5$ | $1{,}9352$ | $1{,}8729$ |
| $6$ | $1{,}1720$ | $0{,}7933$ |

**Diễn giải.** Momentum cho giá trị nhỏ hơn ở mọi bước từ bước hai. Nhưng giá trị của nó không giảm đơn điệu: từ bước 3 sang bước 4, $q$ tăng từ $1{,}30$ lên $2{,}10$, vì tọa độ thứ hai, $[\theta_3]_2=-0{,}1615$, tiếp tục bị phần quán tính đẩy xa thành $[\theta_4]_2\approx-0{,}681$.

**Kiểm tra lại.** Bước 2: $q(1{,}445;\,1{,}69)=\tfrac12(3\cdot2{,}088025+7\cdot2{,}8561)=13{,}1283875$; $q(1{,}295;\,0{,}99)=\tfrac12(3\cdot1{,}677025+7\cdot0{,}9801)=5{,}9458875$.
:::

![Quỹ đạo sáu bước trên các đường mức của q, cùng η = 0,05: giảm gradient nét đứt đi chậm dọc theo thung lũng; momentum với β = 0,5 nét liền đi xa hơn và vượt qua trục tọa độ thứ nhất ở bước 3 rồi quay lại.](img/lec-05/momentum-comparison.svg)

Hình vẽ hai quỹ đạo. Đường nét đứt của giảm gradient luôn ở phía trên trục $[\theta]_1$ và đi chậm. Đường nét liền của momentum đi nhanh hơn dọc thung lũng nhưng vượt qua trục $[\theta]_1$, đúng hiện tượng không đơn điệu của bảng.

::: remark Nhận xét 05.19 (Hai giới hạn của đối chứng)
**Một ví dụ không xếp hạng phương pháp.** Bảng của Ví dụ 05.18 dùng một hàm, một điểm đầu, một cặp $(\eta,\beta)$. Nó không chứng minh momentum luôn nhanh hơn; Mục 3.3 cho kết quả tổng quát trên hàm bậc hai.

**Momentum không bảo đảm giảm từng bước.** Bước 4 của Ví dụ 05.18 làm $q$ tăng dù gradient đầy đủ, không có nhiễu. Tiêu chí dừng dựa trên một lần tăng của mất mát vì vậy không hợp với momentum; quy tắc dừng sớm của Thuật toán 05.1 dùng bộ đếm qua nhiều lần đánh giá.
:::

### 3.3 Momentum như hệ tuyến tính hai biến

Ví dụ 05.18 cho thấy momentum nhanh hơn nhưng dao động, và chưa cho biết với $(\eta,\beta)$ nào thì nó hội tụ. Trên hàm bậc hai, phép cập nhật của momentum là tuyến tính theo cặp $(\theta_t,v_t)$, nên câu hỏi đưa được về nghiệm của một đa thức bậc hai. Bổ đề sau thu thập các sự kiện về dãy số thỏa một đệ quy tuyến tính cấp hai mà phần còn lại cần.

::: lemma Bổ đề 05.20 (Đệ quy tuyến tính cấp hai)
**Giả thiết.** $\pi_1,\pi_0\in\mathbb R$; đa thức $\pi(\zeta)=\zeta^2+\pi_1\zeta+\pi_0$ có hai nghiệm $\zeta_1,\zeta_2\in\mathbb C$, đánh số sao cho $\lvert\zeta_1\rvert\ge\lvert\zeta_2\rvert$. Dãy thực $(Z_t)_{t\ge0}$ thỏa

$$
Z_{t+1}+\pi_1Z_t+\pi_0Z_{t-1}=0\qquad(t\ge1).
\tag{3.3}
$$

**Kết luận.**

- (a) Nếu $\zeta_1\ne\zeta_2$, có hằng số $A,B\in\mathbb C$ với $Z_t=A\zeta_1^t+B\zeta_2^t$ cho mọi $t$; cụ thể $A=\tfrac{Z_1-\zeta_2Z_0}{\zeta_1-\zeta_2}$, $B=\tfrac{\zeta_1Z_0-Z_1}{\zeta_1-\zeta_2}$. Nếu $\zeta_1=\zeta_2\ne0$, có $Z_t=(A+Bt)\zeta_1^t$ với $A=Z_0$.
- (b) $\lvert\zeta_1\rvert<1$ và $\lvert\zeta_2\rvert<1$ khi và chỉ khi $\lvert\pi_0\rvert<1$ và $\lvert\pi_1\rvert<1+\pi_0$.
- (c) Nếu điều kiện của (b) đúng thì $Z_t\to0$ với mọi $Z_0,Z_1$.
- (d) Nếu $\lvert\zeta_1\rvert\ge1$, $Z_0\ne0$, $Z_1=\nu Z_0$ với một số thực $\nu$ thỏa $\pi(\nu)\ne0$, thì $Z_t$ không hội tụ về $0$.

**Điều kiện áp dụng.** Hệ số thực, đệ quy cấp hai.

**Phạm vi.** Bổ đề là công cụ đại số; nó không dùng cấu trúc tối ưu nào.
:::

::: proof Chứng minh Bổ đề 05.20
**Bước 1 (phần a, nghiệm phân biệt).**

Với $\zeta$ là nghiệm của $\pi$, dãy $\zeta^t$ thỏa (3.3) vì $\zeta^{t+1}+\pi_1\zeta^t+\pi_0\zeta^{t-1}=\zeta^{t-1}\pi(\zeta)=0$. Tổ hợp tuyến tính của hai nghiệm cũng thỏa (3.3). Hai hằng số $A$, $B$ cho trong phát biểu thỏa $A+B=Z_0$ và $A\zeta_1+B\zeta_2=Z_1$; một dãy thỏa (3.3) được xác định hoàn toàn bởi $Z_0$ và $Z_1$, nên dãy $A\zeta_1^t+B\zeta_2^t$ trùng $Z_t$.

**Bước 2 (phần a, nghiệm kép).**

Khi $\zeta_1=\zeta_2=\zeta$, ta có $\pi_1=-2\zeta$ và $\pi_0=\zeta^2$. Thay $t\zeta^t$ vào vế trái của (3.3):

$$
\begin{aligned}
(t+1)\zeta^{t+1}+\pi_1t\zeta^t+\pi_0(t-1)\zeta^{t-1}&=\zeta^{t-1}\bigl[t\,\pi(\zeta)+\zeta^2-\pi_0\bigr]\\
&=0 .
\end{aligned}
$$

Dòng thứ hai dùng $\pi(\zeta)=0$ và $\pi_0=\zeta^2$. Hằng số $A=Z_0$ và $B=Z_1/\zeta-Z_0$ khớp hai giá trị đầu, nên như Bước 1, $Z_t=(A+Bt)\zeta^t$.

**Bước 3 (phần b, chiều thuận).**

Giả sử hai nghiệm có môđun nhỏ hơn $1$. Khi đó $\lvert\pi_0\rvert=\lvert\zeta_1\zeta_2\rvert<1$. Nếu hai nghiệm phức liên hợp, $\pi_0=\lvert\zeta_1\rvert^2$ và

$$
\begin{aligned}
\lvert\pi_1\rvert&=\lvert\zeta_1+\zeta_2\rvert\\
&\le2\lvert\zeta_1\rvert\\
&<1+\lvert\zeta_1\rvert^2\\
&=1+\pi_0 ,
\end{aligned}
$$

trong đó bất đẳng thức chặt đúng vì $(1-\lvert\zeta_1\rvert)^2>0$. Nếu hai nghiệm thực trong $(-1,1)$, thì $\pi(1)=(1-\zeta_1)(1-\zeta_2)>0$ và $\pi(-1)=(1+\zeta_1)(1+\zeta_2)>0$, tức $1+\pi_1+\pi_0>0$ và $1-\pi_1+\pi_0>0$, nên $\lvert\pi_1\rvert<1+\pi_0$.

**Bước 4 (phần b, chiều nghịch).**

Giả sử $\lvert\pi_0\rvert<1$ và $\lvert\pi_1\rvert<1+\pi_0$; khi đó $\pi(1)>0$ và $\pi(-1)>0$. Nếu hai nghiệm phức không thực, chúng liên hợp và $\lvert\zeta_1\rvert^2=\pi_0<1$. Nếu hai nghiệm thực, $\pi$ âm giữa hai nghiệm và dương ngoài đoạn nối chúng, nên mỗi số $1$ và $-1$ nằm ngoài đoạn $[\zeta_2,\zeta_1]$. Có ba khả năng:

1. cả hai nghiệm lớn hơn $1$: khi đó $\pi_0=\zeta_1\zeta_2>1$, trái giả thiết;
2. cả hai nghiệm nhỏ hơn $-1$: khi đó $\pi_0>1$, trái giả thiết;
3. cả hai nghiệm thuộc $(-1,1)$.

Khả năng một nghiệm nhỏ hơn $-1$, nghiệm kia lớn hơn $1$ bị loại vì khi đó $1$ nằm giữa hai nghiệm và $\pi(1)<0$. Vậy cả hai nghiệm thuộc $(-1,1)$.

**Bước 5 (phần c).**

Theo (a), $Z_t$ là tổ hợp của $\zeta_1^t$, $\zeta_2^t$, hoặc của $\zeta^t$ và $t\zeta^t$. Với $\lvert\zeta\rvert<1$, cả $\zeta^t$ và $t\zeta^t$ tiến về $0$. Trường hợp $\zeta_1=\zeta_2=0$ cho $Z_t=0$ với $t\ge2$.

**Bước 6 (phần d).**

Vì $\pi(\nu)\ne0$, $\nu$ không là nghiệm. Nếu $\zeta_1\ne\zeta_2$, thì $A=Z_0\tfrac{\nu-\zeta_2}{\zeta_1-\zeta_2}\ne0$ và $B=Z_0\tfrac{\zeta_1-\nu}{\zeta_1-\zeta_2}\ne0$. Xét hai trường hợp.

- $\lvert\zeta_2\rvert<\lvert\zeta_1\rvert$: $\lvert Z_t\rvert\ge\lvert\zeta_1\rvert^t\bigl(\lvert A\rvert-\lvert B\rvert(\lvert\zeta_2\rvert/\lvert\zeta_1\rvert)^t\bigr)$, và vế phải lớn hơn $\lvert A\rvert/2$ khi $t$ đủ lớn, vì $\lvert\zeta_1\rvert\ge1$.
- $\lvert\zeta_2\rvert=\lvert\zeta_1\rvert$: đặt $\varrho=\zeta_2/\zeta_1$, với $\lvert\varrho\rvert=1$ và $\varrho\ne1$. Nếu $Z_t\to0$ thì $Z_t/\zeta_1^t=A+B\varrho^t\to0$ vì $\lvert\zeta_1\rvert\ge1$; trừ hai số hạng liên tiếp được $B\varrho^t(\varrho-1)\to0$, trong khi môđun của nó luôn bằng $\lvert B\rvert\lvert\varrho-1\rvert>0$, mâu thuẫn.

Nếu $\zeta_1=\zeta_2=\zeta$ với $\lvert\zeta\rvert\ge1$, thì $\lvert Z_t\rvert\ge\lvert A+Bt\rvert$ với $A=Z_0\ne0$, và $A+Bt$ không tiến về $0$. $\square$
:::

Bổ đề tách bài toán hội tụ thành hai việc: tìm hai nghiệm của một đa thức bậc hai, và kiểm hai bất đẳng thức của phần (b). Phần (d) là chiều ngược cần thiết: khi một nghiệm nằm ngoài đĩa đơn vị, dãy không hội tụ, trừ trường hợp dữ kiện đầu loại bỏ đúng thành phần đó, và điều kiện $\pi(\nu)\ne0$ loại trừ trường hợp này.

Định lý sau áp dụng bổ đề cho momentum trên hàm bậc hai. Nó dùng phép đổi biến của Mệnh đề 05.17 để tách bài toán $p$ chiều thành $p$ bài một chiều.

::: theorem Định lý 05.21 (Momentum trên hàm bậc hai)
**Giả thiết.** $q$, $H=Q\Lambda Q^T$, $\mu$, $L$, $\kappa$ như Mệnh đề 05.17. Thuật toán 05.2 với gradient đầy đủ $\nabla q$, bước học $\eta>0$, hệ số $0\le\beta<1$, $v_0=0$. Đặt $\chi_t=Q^T(\theta_t-\theta^*)$.

**Kết luận.**

- (a) Với mỗi $i$, dãy $[\chi_t]_i$ thỏa $[\chi_1]_i=(1-\eta\lambda_i)[\chi_0]_i$ và

$$
[\chi_{t+1}]_i=(1+\beta-\eta\lambda_i)[\chi_t]_i-\beta[\chi_{t-1}]_i\qquad(t\ge1),
\tag{3.4}
$$

với đa thức đặc trưng $\zeta^2-(1+\beta-\eta\lambda_i)\zeta+\beta$.
- (b) $\theta_t\to\theta^*$ với mọi $\theta_0$ khi và chỉ khi $0<\eta L<2(1+\beta)$.
- (c) Nếu $(1-\sqrt\beta)^2\le\eta\lambda_i\le(1+\sqrt\beta)^2$ thì hai nghiệm của đa thức thứ $i$ có môđun đúng bằng $\sqrt\beta$, và có hằng số $\Omega_i$ với $\lvert[\chi_t]_i\rvert\le\Omega_i(1+t)\beta^{t/2}$.

**Điều kiện áp dụng.** Hàm bậc hai lồi chặt, gradient đầy đủ, $\eta$ và $\beta$ cố định.

**Phạm vi.** Với hàm không bậc hai, định lý chỉ mô tả hệ tuyến tính hóa quanh một cực tiểu; với gradient nhóm, hệ có thêm một số hạng nhiễu và (b) chỉ nói về kỳ vọng của $\theta_t$.
:::

::: proof Chứng minh Định lý 05.21
**Bước 1 (tách tọa độ).**

$\nabla q(\theta)=H(\theta-\theta^*)$. Nhân hai bước cập nhật với $Q^T$: tọa độ thứ $i$ của $Q^Tv_{t+1}$ bằng $\beta$ nhân tọa độ thứ $i$ của $Q^Tv_t$ trừ $\eta\lambda_i[\chi_t]_i$, và $\chi_{t+1}=\chi_t+Q^Tv_{t+1}$. Vì $\Lambda$ chéo, tọa độ thứ $i$ của hai đẳng thức chỉ chứa $\lambda_i$ và các tọa độ thứ $i$.

**Bước 2 (phần a).**

Cố định $i$, đặt $Z_t=[\chi_t]_i$ và viết $\lambda$ cho $\lambda_i$. Từ $\theta_t=\theta_{t-1}+v_t$, tọa độ thứ $i$ của $Q^Tv_t$ bằng $Z_t-Z_{t-1}$ với $t\ge1$. Thay vào:

$$
\begin{aligned}
Z_{t+1}&=Z_t+\beta(Z_t-Z_{t-1})-\eta\lambda Z_t\\
&=(1+\beta-\eta\lambda)Z_t-\beta Z_{t-1}.
\end{aligned}
$$

Với $t=0$, $v_0=0$ cho $Z_1=(1-\eta\lambda)Z_0$. Đệ quy (3.4) có dạng (3.3) với $\pi_1=-(1+\beta-\eta\lambda)$ và $\pi_0=\beta$.

**Bước 3 (phần b, chiều đủ).**

Điều kiện $\lvert\pi_0\rvert<1$ đúng vì $0\le\beta<1$. Điều kiện $\lvert\pi_1\rvert<1+\pi_0$ là $\lvert1+\beta-\eta\lambda\rvert<1+\beta$, tương đương $0<\eta\lambda<2(1+\beta)$. Nếu $0<\eta L<2(1+\beta)$ thì mọi $\lambda_i\in(0,L]$ thỏa điều kiện này, nên theo Bổ đề 05.20(b), (c), mọi tọa độ của $\chi_t$ về $0$, và $\lVert\theta_t-\theta^*\rVert_2=\lVert\chi_t\rVert_2\to0$.

**Bước 4 (phần b, chiều cần).**

Giả sử $\eta L\ge2(1+\beta)$. Chọn $\theta_0-\theta^*$ là vectơ riêng của $L$, nên chỉ một tọa độ $Z_t$ của $\chi_t$ có $Z_0\ne0$. Với tọa độ đó, điều kiện của Bổ đề 05.20(b) sai, nên $\lvert\zeta_1\rvert\ge1$, và dữ kiện đầu là $Z_1=\nu Z_0$ với $\nu=1-\eta L$.

Nếu $\beta=0$, momentum là giảm gradient và $\lvert Z_t\rvert=\lvert1-\eta L\rvert^t\lvert Z_0\rvert$ không giảm vì $\eta L\ge2$. Nếu $\beta>0$, thay $\nu$ vào đa thức:

$$
\begin{aligned}
\pi(\nu)&=\nu^2-(\nu+\beta)\nu+\beta\\
&=\beta(1-\nu)\\
&=\beta\eta L\ne0 .
\end{aligned}
$$

Theo Bổ đề 05.20(d), $Z_t$ không về $0$.

**Bước 5 (phần c).**

Biệt thức của $\zeta^2-(1+\beta-\eta\lambda)\zeta+\beta$ là $(1+\beta-\eta\lambda)^2-4\beta$. Nó không dương khi và chỉ khi $\lvert1+\beta-\eta\lambda\rvert\le2\sqrt\beta$, tức

$$
1+\beta-2\sqrt\beta\le\eta\lambda\le1+\beta+2\sqrt\beta ,
$$

đúng là $(1-\sqrt\beta)^2\le\eta\lambda\le(1+\sqrt\beta)^2$. Khi đó hai nghiệm liên hợp phức hoặc trùng nhau, có tích $\beta$, nên môđun chung bằng $\sqrt\beta$. Xét ba trường hợp.

- Hai nghiệm phân biệt: theo Bổ đề 05.20(a), $\lvert Z_t\rvert\le(\lvert A\rvert+\lvert B\rvert)\beta^{t/2}$.
- Nghiệm kép khác $0$: $\lvert Z_t\rvert\le(\lvert A\rvert+\lvert B\rvert t)\beta^{t/2}$.
- Nghiệm kép bằng $0$, xảy ra khi $\beta=0$ và $\eta\lambda=1$: $Z_1=(1-\eta\lambda)Z_0=0$ và đệ quy cho $Z_t=0$ với mọi $t\ge1$.

Trong cả ba trường hợp, cận đúng với $\Omega_i=\lvert A\rvert+\lvert B\rvert+\lvert Z_0\rvert$. $\square$
:::

Định lý đọc theo từng phần như sau.

- Phần (a): momentum trên hàm bậc hai là $p$ dao động tử độc lập, mỗi dao động tử nhớ hai giá trị trước, tức một hệ bậc nhất hai biến gồm tọa độ của $\chi_t$ và tọa độ của $Q^Tv_t$ cho mỗi hướng riêng.
- Phần (b): momentum chịu được $\eta$ tới gần $\tfrac{2(1+\beta)}L$, rộng hơn giới hạn $\tfrac2L$ của giảm gradient.
- Phần (c): trong một dải độ cong, tốc độ co không phụ thuộc $\lambda_i$ mà chỉ phụ thuộc $\beta$; mọi hướng co với cùng hệ số $\sqrt\beta$, và đó là cơ chế giúp hướng cong yếu không còn chậm.

Khi $\beta=0$, định lý trở lại Mệnh đề 05.17: đa thức thành $\zeta(\zeta-(1-\eta\lambda_i))$ và điều kiện (b) thành $0<\eta L<2$. Đổi lại sự mở rộng, momentum dao động: trong dải của phần (c), nghiệm phức nên $[\chi_t]_i$ đổi dấu theo chu kỳ, như bước 3–4 của Ví dụ 05.18.

::: example Ví dụ 05.19 (Nghiệm dạng đóng trên tọa độ thứ nhất của $q$)
**Dữ kiện.** Ví dụ 05.18: momentum trên $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$ từ $\theta_0=(2,4)^T$, $v_0=0$, gradient đầy đủ; tọa độ thứ nhất có $\lambda=3$, $\eta=0{,}05$, $\beta=0{,}5$. Dãy $Z_t=[\chi_t]_1$ bằng $[\theta_t]_1$ vì $\theta^*=0$ và $Q=\mathrm I$, với $Z_0=2$. Theo (3.4), $Z_1=(1-\eta\lambda)Z_0$ và $Z_{t+1}=(1+\beta-\eta\lambda)Z_t-\beta Z_{t-1}$, với đa thức đặc trưng $\zeta^2-(1+\beta-\eta\lambda)\zeta+\beta$. Định lý 05.21(c): nếu $(1-\sqrt\beta)^2\le\eta\lambda\le(1+\sqrt\beta)^2$ thì hai nghiệm có môđun $\sqrt\beta$. Ví dụ 05.17: $[\theta_2]_1=1{,}295$.

**Đa thức đặc trưng.** $\eta\lambda=0{,}15$, nên $\zeta^2-1{,}35\zeta+0{,}5=0$, với biệt thức $1{,}35^2-2=-0{,}1775<0$. Hai nghiệm là $\zeta=0{,}675\pm0{,}2107\,\mathrm i$, với $\mathrm i$ là đơn vị ảo, $\mathrm i^2=-1$; môđun chung là $\sqrt{0{,}5}\approx0{,}7071$. Giá trị $0{,}15$ nằm trong dải của Định lý 05.21(c), từ $(1-\sqrt{0{,}5})^2\approx0{,}086$ tới $2{,}914$.

**Dạng đóng.** Viết hai nghiệm dưới dạng $\rho(\cos\varpi\pm\mathrm i\sin\varpi)$, trong đó $\rho=\sqrt{0{,}5}$ là môđun và $\varpi$ là góc của nghiệm, với $\rho\cos\varpi=0{,}675$ và $\rho\sin\varpi=\tfrac{\sqrt{0{,}1775}}2\approx0{,}2107$. Nghiệm thực của (3.4) có dạng $Z_t=\rho^t(A'\cos\varpi t+B'\sin\varpi t)$. Từ $Z_0=2$ có $A'=2$. Từ $Z_1=0{,}85\cdot2=1{,}7$:

$$
1{,}7=2\cdot0{,}675+B'\cdot0{,}2107,\qquad B'=\frac{0{,}35}{0{,}2107}\approx1{,}661 .
$$

**Kiểm tra lại.** Tại $t=2$:

- $\rho^2\cos2\varpi=0{,}675^2-0{,}2107^2\approx0{,}41125$;
- $\rho^2\sin2\varpi=2\cdot0{,}675\cdot0{,}2107\approx0{,}2844$;
- $Z_2\approx2\cdot0{,}41125+1{,}661\cdot0{,}2844\approx1{,}295$.

Giá trị này khớp $[\theta_2]_1=1{,}295$ của Ví dụ 05.17. Biên độ không vượt $\rho^t\sqrt{4+1{,}661^2}\approx2{,}60\cdot0{,}7071^t$.
:::

Tọa độ thứ hai có $\eta\lambda=0{,}35$, cũng nằm trong dải, nên cũng co với môđun $\sqrt{0{,}5}$. Do đó trong Ví dụ 05.18, momentum co mọi tọa độ với hệ số tiệm cận $0{,}707$ mỗi bước, còn giảm gradient co tọa độ chậm nhất với hệ số $0{,}85$. Định lý 05.21 chưa cho biết cặp $(\eta,\beta)$ nào làm hệ số chung nhỏ nhất; hệ quả sau chọn cặp đó.

::: corollary Hệ quả 05.22 (Tham số momentum của Polyak cho hàm bậc hai)
**Giả thiết.** Như Định lý 05.21, với $\kappa=L/\mu$. Chọn

$$
\sqrt\beta=\frac{\sqrt\kappa-1}{\sqrt\kappa+1},\qquad\eta=\frac4{(\sqrt L+\sqrt\mu)^2}.
\tag{3.5}
$$

**Kết luận.** Với mọi $\theta_0$ có hằng số $\Omega$ để $\lVert\theta_t-\theta^*\rVert_2\le\Omega(1+t)\Bigl(\dfrac{\sqrt\kappa-1}{\sqrt\kappa+1}\Bigr)^t$.

**Điều kiện áp dụng.** Cần biết $\mu$ và $L$.

**Phạm vi.** So với hệ số tốt nhất $\tfrac{\kappa-1}{\kappa+1}$ của giảm gradient (Mệnh đề 05.17(d)), hệ số mới thay $\kappa$ bằng $\sqrt\kappa$. Kết quả chỉ đúng cho hàm bậc hai; với hàm lồi mạnh tổng quát có gradient Lipschitz, Lessard, Recht và Packard (2016) cho một phản ví dụ mà momentum với tham số (3.5) không hội tụ.
:::

::: proof Chứng minh Hệ quả 05.22
**Bước 1 (hai đầu mút).**

Từ (3.5), $\sqrt\beta=\tfrac{\sqrt L-\sqrt\mu}{\sqrt L+\sqrt\mu}$, nên $1-\sqrt\beta=\tfrac{2\sqrt\mu}{\sqrt L+\sqrt\mu}$ và $1+\sqrt\beta=\tfrac{2\sqrt L}{\sqrt L+\sqrt\mu}$. Do đó $(1-\sqrt\beta)^2=\tfrac{4\mu}{(\sqrt L+\sqrt\mu)^2}=\eta\mu$ và $(1+\sqrt\beta)^2=\eta L$.

**Bước 2 (mọi độ cong nằm trong dải).**

Mọi $\lambda_i\in[\mu,L]$ cho $\eta\lambda_i\in[\eta\mu,\eta L]=[(1-\sqrt\beta)^2,(1+\sqrt\beta)^2]$, nên Định lý 05.21(c) áp dụng cho mọi tọa độ, với cùng hệ số $\sqrt\beta$.

**Bước 3 (hội tụ).**

Điều kiện (b) của định lý đúng:

$$
\begin{aligned}
\eta L&=(1+\sqrt\beta)^2\\
&=1+2\sqrt\beta+\beta\\
&<2+2\beta ,
\end{aligned}
$$

vì $2\sqrt\beta<1+\beta$ khi $\beta<1$. Cộng các cận của từng tọa độ và dùng $\lVert\theta_t-\theta^*\rVert_2=\lVert\chi_t\rVert_2\le\sum_i\lvert[\chi_t]_i\rvert$ được kết luận với $\Omega=\sum_i\Omega_i$. $\square$
:::

Hệ quả cho thấy lợi ích của momentum lớn dần theo $\kappa$. Số bước để sai số giảm $\mathrm e\approx2{,}72$ lần xấp xỉ $\tfrac1{-\log\rho}$, với $\rho$ là hệ số co: với $\kappa=100$, giảm gradient bước tốt nhất có $\rho=\tfrac{99}{101}$ và cần khoảng $50$ bước; momentum với (3.5) có $\rho=\tfrac9{11}$ và cần khoảng $5$ bước. Phương pháp này còn gọi là phương pháp quả cầu nặng (heavy ball) của Polyak (1964).

**Trong học máy.** Thực hành chọn $\beta$ trong khoảng $0{,}5$ đến $0{,}99$ và không biết $\mu$, $L$ của mất mát mạng sâu, nên (3.5) không được dùng trực tiếp. Định lý 05.21 giải thích hai thói quen, theo Goodfellow, Bengio và Courville (2016, mục 8.3.2, tr. 296–298):

- khi tăng $\beta$ thường giảm $\eta$, vì giới hạn ổn định trong (b) và dải của (c) cùng phụ thuộc $\eta\lambda$;
- đường mất mát với momentum dao động hơn SGD, vì nghiệm phức sinh dao động.

Với gradient nhóm, hệ có thêm nhiễu; theo (3.2), nhiễu ở mỗi vòng bị cộng dồn với trọng số $\beta^{t-t'}$, nên momentum không tự làm giảm phương sai của bước.

### 3.4 Gradient tại điểm dự báo: phương pháp Nesterov

Momentum luôn dịch thêm $\beta v_t$, độc lập với gradient mới. Như vậy trước khi tính gradient đã biết tham số sẽ tới gần điểm $\theta_t+\beta v_t$, nhưng gradient lại được tính tại $\theta_t$, nơi tham số sắp rời đi. Trên hàm bậc hai, hai gradient khác nhau đúng $H\beta v_t$. Trực giác, chưa phải phát biểu hình thức: tính gradient tại điểm sẽ tới cho phép hiệu chỉnh trước khi đi quá.

::: example Ví dụ 05.20 (Gradient tại điểm dự báo)
**Dữ kiện.** $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$, $\nabla q(\theta)=H\theta$ với $H=\operatorname{diag}(3,7)$. Trạng thái sau vòng 1 của Ví dụ 05.17: $\theta_1=(1{,}7;\,2{,}6)^T$, $v_1=(-0{,}3;\,-1{,}4)^T$; $\eta=0{,}05$, $\beta=0{,}5$. Nesterov (Thuật toán 05.3, gradient đầy đủ): $v_{t+1}=\beta v_t-\eta\nabla q(\theta_t+\beta v_t)$, $\theta_{t+1}=\theta_t+v_{t+1}$. Momentum ở bước 2 cho $q(\theta_2)=5{,}9458875$ (Ví dụ 05.18).

**Dự báo.** Điểm dự báo (look-ahead point) là $\widetilde\theta_1=\theta_1+\beta v_1=(1{,}55;\,1{,}9)^T$.

**Hai gradient.** $\nabla q(\theta_1)=(5{,}1;\,18{,}2)^T$ và $\nabla q(\widetilde\theta_1)=(4{,}65;\,13{,}3)^T$. Hiệu bằng $H\beta v_1=\operatorname{diag}(3,7)(-0{,}15;\,-0{,}7)^T=(-0{,}45;\,-4{,}9)^T$.

**Hiệu chỉnh.** Vận tốc mới là

$$
\begin{aligned}
v_2&=\beta v_1-\eta\nabla q(\widetilde\theta_1)\\
&=(-0{,}15;\,-0{,}7)^T+(-0{,}2325;\,-0{,}665)^T\\
&=(-0{,}3825;\,-1{,}365)^T ,
\end{aligned}
$$

và $\theta_2=\theta_1+v_2=(1{,}3175;\,1{,}235)^T$.

**Kiểm tra lại.** $q(\theta_2)=\tfrac12(3\cdot1{,}73580625+7\cdot1{,}525225)=7{,}941996875$. Giá trị này lớn hơn $5{,}9458875$ của momentum ở cùng bước; phép tính minh họa điểm tính gradient, không cho thứ hạng.
:::

![Trên các đường mức của q: từ θ₁ = (1,7; 2,6), đoạn dự báo βv₁ tới điểm θ̃₁ = (1,55; 1,9); từ đó đoạn hiệu chỉnh −η∇q(θ̃₁) dẫn tới θ₂ = (1,3175; 1,235).](img/lec-05/nesterov-points.svg)

Hình vẽ ba điểm $\theta_1$, $\widetilde\theta_1$, $\theta_2$ với hai đoạn mang nhãn dự báo và hiệu chỉnh. Gradient tại điểm dự báo nhỏ hơn theo tọa độ thứ hai ($13{,}3$ so với $18{,}2$), vì điểm dự báo đã gần đáy thung lũng hơn; phần hiệu chỉnh vì vậy ngắn hơn theo hướng cong mạnh. Ba thao tác của ví dụ, viết cho mọi $t$ với gradient nhóm, là quy tắc sau.

::: algorithm Thuật toán 05.3 (Gradient gia tốc Nesterov)
**Đầu vào.** Như Thuật toán 05.2.

**Khởi tạo.** $v_0=0$.

**Các bước.** Với $t=0,1,\ldots$:

1. Rút nhóm $I_1,\ldots,I_b$ và tính điểm dự báo $\widetilde\theta_t=\theta_t+\beta v_t$.
2. Tính gradient nhóm tại điểm dự báo, trên chính nhóm vừa rút: $\widehat g_t=\tfrac1b\sum_r\nabla\ell_{I_r}(\widetilde\theta_t)$.
3. Cập nhật $v_{t+1}=\beta v_t-\eta\widehat g_t$ và $\theta_{t+1}=\theta_t+v_{t+1}$.

Quy tắc dừng sớm, bản lưu và đầu ra giữ như Thuật toán 05.1.

**Chi phí.** Như momentum: một gradient nhóm và $p$ số trạng thái mỗi vòng.
:::

Phương pháp gradient gia tốc Nesterov (Nesterov accelerated gradient) chỉ đổi điểm tính gradient; mọi thành phần khác giữ như momentum. Vận tốc mới được cộng vào $\theta_t$, không vào $\widetilde\theta_t$: cộng vào điểm dự báo sẽ tính phần quán tính hai lần, vì $\widetilde\theta_t+v_{t+1}=\theta_t+2\beta v_t-\eta\widehat g_t$. Quy ước trạng thái này theo Goodfellow, Bengio và Courville (2016, thuật toán 8.3, tr. 300) và Sutskever cùng cộng sự (2013).

Định lý sau là phiên bản Nesterov của Định lý 05.21. Chứng minh dùng cùng phép tách tọa độ và cùng Bổ đề 05.20.

::: theorem Định lý 05.23 (Nesterov trên hàm bậc hai)
**Giả thiết.** Như Định lý 05.21, với Thuật toán 05.3 dùng gradient đầy đủ.

**Kết luận.**

- (a) Với mỗi $i$, $[\chi_1]_i=(1-\eta\lambda_i)[\chi_0]_i$ và

$$
[\chi_{t+1}]_i=(1+\beta)(1-\eta\lambda_i)[\chi_t]_i-\beta(1-\eta\lambda_i)[\chi_{t-1}]_i\qquad(t\ge1),
\tag{3.6}
$$

với đa thức đặc trưng $\zeta^2-(1+\beta)(1-\eta\lambda_i)\zeta+\beta(1-\eta\lambda_i)$.
- (b) $\theta_t\to\theta^*$ với mọi $\theta_0$ khi và chỉ khi $0<\eta L<\dfrac{2(1+\beta)}{1+2\beta}$.
- (c) Với $\eta=\tfrac1L$ và $\beta=\tfrac{\sqrt\kappa-1}{\sqrt\kappa+1}$, mọi nghiệm của mọi đa thức thứ $i$ có môđun không vượt $1-\tfrac1{\sqrt\kappa}$.

**Điều kiện áp dụng.** Như Định lý 05.21.

**Phạm vi.** Miền ổn định (b) hẹp hơn miền $\tfrac2L$ của giảm gradient khi $\beta>0$. Bảo đảm $J(\theta_t)-\inf J=O(1/t^2)$ cho hàm lồi có gradient Lipschitz với lịch hệ số thích hợp là kết quả của Nesterov (1983), nằm ngoài phạm vi chương.
:::

::: proof Chứng minh Định lý 05.23
**Bước 1 (phần a).**

Như Bước 1 và Bước 2 của Định lý 05.21, cố định $i$, đặt $Z_t=[\chi_t]_i$, và tọa độ thứ $i$ của $Q^Tv_t$ bằng $Z_t-Z_{t-1}$ với $t\ge1$. Gradient tại điểm dự báo có tọa độ thứ $i$ bằng $\lambda\bigl(Z_t+\beta(Z_t-Z_{t-1})\bigr)$, nên tọa độ thứ $i$ của $Q^Tv_{t+1}$ là $\beta(Z_t-Z_{t-1})-\eta\lambda\bigl(Z_t+\beta(Z_t-Z_{t-1})\bigr)$. Cộng với $Z_t$:

$$
\begin{aligned}
Z_{t+1}&=(1-\eta\lambda)Z_t+\beta(1-\eta\lambda)(Z_t-Z_{t-1})\\
&=(1+\beta)(1-\eta\lambda)Z_t-\beta(1-\eta\lambda)Z_{t-1}.
\end{aligned}
$$

Với $t=0$, $v_0=0$ cho $Z_1=(1-\eta\lambda)Z_0$.

**Bước 2 (phần b, chiều đủ).**

Đặt $\nu=1-\eta\lambda$, nên $\pi_1=-(1+\beta)\nu$ và $\pi_0=\beta\nu$. Điều kiện $\lvert\pi_1\rvert<1+\pi_0$ là $(1+\beta)\lvert\nu\rvert<1+\beta\nu$. Xét hai trường hợp.

- $\nu\ge0$: điều kiện thành $(1+\beta)\nu<1+\beta\nu$, tức $\nu<1$, tức $\eta\lambda>0$.
- $\nu<0$: điều kiện thành $-(1+\beta)\nu<1+\beta\nu$, tức $-\nu(1+2\beta)<1$, tức $\nu>-\tfrac1{1+2\beta}$.

Gộp lại: $-\tfrac1{1+2\beta}<1-\eta\lambda<1$, tương đương $0<\eta\lambda<1+\tfrac1{1+2\beta}$, và vế phải bằng $\tfrac{2(1+\beta)}{1+2\beta}$. Trên khoảng này $\lvert\pi_0\rvert=\beta\lvert\nu\rvert<1$. Như Bước 3 của Định lý 05.21, điều kiện với $\lambda=L$ kéo theo điều kiện với mọi $\lambda_i$.

**Bước 3 (phần b, chiều cần).**

Giả sử $\eta L\ge\tfrac{2(1+\beta)}{1+2\beta}$ và chọn $\theta_0-\theta^*$ là vectơ riêng của $L$. Khi đó $\nu=1-\eta L<0$ và điều kiện của Bổ đề 05.20(b) sai. Dữ kiện đầu là $Z_1=\nu Z_0$, và

$$
\begin{aligned}
\pi(\nu)&=\nu^2-(1+\beta)\nu^2+\beta\nu\\
&=\beta\nu(1-\nu)\\
&=\beta\nu\,\eta L .
\end{aligned}
$$

Nếu $\beta>0$, $\pi(\nu)\ne0$ vì $\nu\ne0$; Bổ đề 05.20(d) cho $Z_t$ không về $0$. Nếu $\beta=0$, quy tắc là giảm gradient với $\eta L\ge2$, đã xét ở Mệnh đề 05.17(c).

**Bước 4 (phần c).**

Với $\eta=\tfrac1L$, $\nu_i=1-\lambda_i/L\in[0,1-\tfrac1\kappa]$. Biệt thức là $(1+\beta)^2\nu_i^2-4\beta\nu_i=\nu_i\bigl[(1+\beta)^2\nu_i-4\beta\bigr]$. Với $\beta$ đã chọn, $1+\beta=\tfrac{2\sqrt\kappa}{\sqrt\kappa+1}$, nên

$$
\begin{aligned}
\frac{4\beta}{(1+\beta)^2}&=\frac{4(\sqrt\kappa-1)}{\sqrt\kappa+1}\cdot\frac{(\sqrt\kappa+1)^2}{4\kappa}\\
&=\frac{\kappa-1}\kappa\\
&=1-\frac1\kappa .
\end{aligned}
$$

Do đó biệt thức không dương với mọi $\nu_i\in[0,1-\tfrac1\kappa]$, hai nghiệm liên hợp hoặc trùng nhau, có môđun $\sqrt{\beta\nu_i}\le\sqrt{\beta(1-\tfrac1\kappa)}$. Thay $\beta$ và dùng $\kappa-1=(\sqrt\kappa-1)(\sqrt\kappa+1)$:

$$
\begin{aligned}
\beta\Bigl(1-\frac1\kappa\Bigr)&=\frac{\sqrt\kappa-1}{\sqrt\kappa+1}\cdot\frac{(\sqrt\kappa-1)(\sqrt\kappa+1)}\kappa\\
&=\frac{(\sqrt\kappa-1)^2}\kappa ,
\end{aligned}
$$

nên môđun không vượt $\tfrac{\sqrt\kappa-1}{\sqrt\kappa}=1-\tfrac1{\sqrt\kappa}$. $\square$
:::

Định lý 05.23 cho hai thông tin trái chiều.

- Phần (b): Nesterov chịu được bước học nhỏ hơn momentum, và nhỏ hơn cả giảm gradient; với $\beta=0{,}5$, giới hạn là $\eta L<1{,}5$, so với $3$ của momentum và $2$ của giảm gradient.
- Phần (c): với bước an toàn $\tfrac1L$ của Bổ đề 04.20 và một $\beta$ thích hợp, Nesterov đạt hệ số co $1-\tfrac1{\sqrt\kappa}$, cùng bậc $\sqrt\kappa$ với Hệ quả 05.22, mà không cần biết $\mu$ để chọn bước học.

So với Định lý 05.21, điểm khác duy nhất trong đa thức là thừa số $1-\eta\lambda_i$ nhân vào cả hai hệ số. Thừa số này giảm biên độ của thành phần cong mạnh: khi $\eta\lambda_i$ gần $1$, cả hai nghiệm gần $0$, nên hướng cong mạnh bị triệt tiêu nhanh thay vì dao động như ở momentum.

![Ba đường bán kính phổ ρ theo tích ηλ trên đoạn từ 0 tới 3,2: giảm gradient |1 − ηλ| (nét đứt) vượt 1 tại ηλ = 2; momentum β = 0,5 (nét liền) bằng √0,5 ≈ 0,707 trên dải từ 0,086 tới 2,914 và vượt 1 tại ηλ = 3; Nesterov β = 0,5 (nét chấm gạch) bằng 0 tại ηλ = 1 và vượt 1 tại ηλ = 1,5. Hai vạch đứng đánh dấu ηλ = 0,15 và 0,35, hai độ cong của q khi η = 0,05.](img/lec-05/spectral-radius.svg)

Hình vẽ bán kính phổ, tức môđun lớn nhất của hai nghiệm, theo tích $\eta\lambda$ cho ba phương pháp với $\beta=0{,}5$. Đường momentum nằm ngang ở $\sqrt{0{,}5}$ trên cả dải của Định lý 05.21(c), rồi vượt $1$ tại $\eta\lambda=3$. Đường Nesterov thấp hơn ở vùng $\eta\lambda$ trung bình nhưng vượt $1$ sớm, tại $1{,}5$. Hai vạch đứng là hai độ cong của $q$ với $\eta=0{,}05$: tại đó Nesterov có $\rho\approx0{,}652$ và $0{,}570$, momentum có $0{,}707$, giảm gradient có $0{,}85$ và $0{,}65$.

::: example Ví dụ 05.21 (Ba phương pháp trên $q$ trong sáu bước)
**Dữ kiện.** $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$, $\theta_0=(2,4)^T$, gradient đầy đủ, $\eta=0{,}05$, $\beta=0{,}5$, $v_0=0$. Ba quy tắc:

- giảm gradient: $\theta_{t+1}=\theta_t-\eta\nabla q(\theta_t)$;
- momentum (Thuật toán 05.2, gradient đầy đủ): $v_{t+1}=\beta v_t-\eta\nabla q(\theta_t)$, $\theta_{t+1}=\theta_t+v_{t+1}$;
- Nesterov (Thuật toán 05.3, gradient đầy đủ): $v_{t+1}=\beta v_t-\eta\nabla q(\theta_t+\beta v_t)$, $\theta_{t+1}=\theta_t+v_{t+1}$.

Theo (3.6), với $Z_t=[\chi_t]_i$ và $\lambda=\lambda_i$, Nesterov thỏa $Z_1=(1-\eta\lambda)Z_0$, $Z_{t+1}=(1+\beta)(1-\eta\lambda)Z_t-\beta(1-\eta\lambda)Z_{t-1}$. Ví dụ 05.20: $[\theta_2]_1=1{,}3175$ với Nesterov. Các hệ số tiệm cận là bán kính phổ ứng với $(\eta,\beta)$ này: $\max_i\lvert1-\eta\lambda_i\rvert=0{,}85$ cho giảm gradient, $\sqrt\beta\approx0{,}707$ cho momentum, và $\approx0{,}652$ cho Nesterov.

**Giá trị $q(\theta_t)$.**

| $t$ | Giảm gradient | Momentum | Nesterov |
|---|---|---|---|
| $2$ | $13{,}1284$ | $5{,}9459$ | $7{,}9420$ |
| $3$ | $6{,}4864$ | $1{,}3016$ | $1{,}8261$ |
| $4$ | $3{,}4194$ | $2{,}1009$ | $0{,}6638$ |
| $5$ | $1{,}9352$ | $1{,}8729$ | $0{,}3816$ |
| $6$ | $1{,}1720$ | $0{,}7933$ | $0{,}1874$ |

**Diễn giải.** Ở bước 2, momentum dẫn trước; từ bước 4, Nesterov dẫn trước, đúng thứ tự của các hệ số tiệm cận $0{,}652$, $0{,}707$ và $0{,}85$ đọc trên hình bán kính phổ. Thứ hạng sau một hay hai bước không dự báo thứ hạng về sau.

**Kiểm tra lại.** Theo (3.6), tọa độ thứ nhất $Z_t=[\chi_t]_1$ của Nesterov thỏa:

- $Z_1=0{,}85\cdot2=1{,}7$;
- $Z_2$ tính như sau, với hai hệ số $1{,}5\cdot0{,}85=1{,}275$ và $0{,}5\cdot0{,}85=0{,}425$, khớp Ví dụ 05.20:

$$
\begin{aligned}
Z_2&=1{,}275\cdot1{,}7-0{,}425\cdot2\\
&=2{,}1675-0{,}85\\
&=1{,}3175 .
\end{aligned}
$$
:::

::: remark Nhận xét 05.24 (Momentum và Nesterov ngoài hàm bậc hai)
**Không phương pháp nào luôn tốt hơn.** Ví dụ 05.20 cho Nesterov kém momentum sau hai bước, Ví dụ 05.21 cho điều ngược lại sau bốn bước, và Định lý 05.23(b) cho thấy Nesterov kém ổn định hơn với bước học lớn.

**Chi phí như nhau.** Hai phương pháp lưu một vectơ trạng thái $p$ phần tử và tính một gradient nhóm mỗi vòng.

**Bảo đảm lý thuyết.** Với hàm lồi có gradient $L$-Lipschitz, gradient đầy đủ và lịch hệ số $\beta_t$ thích hợp, phương pháp gia tốc của Nesterov (1983) đạt $J(\theta_t)-\inf J=O(1/t^2)$, so với $O(1/t)$ của Định lý 04.22. Bản dùng gradient nhóm, hệ số cố định, trên mạng không lồi không có bảo đảm đó; Sutskever cùng cộng sự (2013) báo cáo lợi ích thực nghiệm khi huấn luyện mạng sâu với khởi tạo cẩn thận.

**Cách cài đặt trong thư viện.** Một số thư viện, chẳng hạn PyTorch và Keras, cài Nesterov theo một tham số hóa tương đương, lưu điểm dự báo thay cho $\theta_t$, tức Thuật toán 05.3 sau phép đổi biến $\theta\mapsto\theta+\beta v$.
:::

**Trong học máy.** Momentum và Nesterov là hai lựa chọn của tham số "momentum" và "nesterov" trong các bộ tối ưu SGD của thư viện học sâu. Định lý 05.21 và 05.23 áp dụng cho mất mát được xấp xỉ bằng hàm bậc hai quanh một cực tiểu, với $\lambda_i$ là các giá trị riêng của Hessian của mất mát; giả thiết hàm bậc hai và gradient đầy đủ đều bị vi phạm khi huấn luyện mạng, nên các định lý giải thích cơ chế chứ không cho tham số. Tình huống 05.2 áp dụng chúng cho một bài hồi quy tuyến tính có $\kappa=100$, nơi giả thiết thỏa đúng.

::: exercise Bài tập 05.5
Xét hàm một biến $2\theta^2$, tức hàm bậc hai với $\lambda=4$ và nghiệm $\theta^*=0$, điểm đầu $\theta_0=1$, gradient đầy đủ, $\eta=0{,}25$, $\beta=0{,}25$, $v_0=0$.

- (a) Với momentum, tính $\theta_1,\theta_2,\theta_3,\theta_4$.
- (b) Viết đa thức đặc trưng của momentum, tìm hai nghiệm và môđun của chúng.
- (c) Với $\beta=0{,}25$, tìm mọi $\eta$ để momentum hội tụ với mọi điểm đầu, và so với giảm gradient.
- (d) Với Nesterov và cùng $\eta$, $\beta$, tính $\theta_1,\theta_2$, giải thích vì sao $\theta_t=0$ với mọi $t\ge1$, và tìm mọi $\eta$ để Nesterov hội tụ khi $\beta=0{,}25$.
:::

::: hint
Ở đây $\eta\lambda=1$. Phần (a) dùng (3.4): $\theta_1=(1-\eta\lambda)\theta_0$ và $\theta_{t+1}=(1+\beta-\eta\lambda)\theta_t-\beta\theta_{t-1}$. Phần (c) dùng Định lý 05.21(b): momentum hội tụ với mọi điểm đầu khi và chỉ khi $0<\eta L<2(1+\beta)$. Phần (d) dùng Định lý 05.23 với $L=4$: theo (3.6), $\theta_{t+1}=(1+\beta)(1-\eta\lambda)\theta_t-\beta(1-\eta\lambda)\theta_{t-1}$, và Nesterov hội tụ với mọi điểm đầu khi và chỉ khi $0<\eta L<\frac{2(1+\beta)}{1+2\beta}$.
:::

::: solution
**Câu (a).**

Vì $\eta\lambda=1$, $\theta_1=(1-1)\cdot1=0$, và (3.4) thành $\theta_{t+1}=0{,}25\theta_t-0{,}25\theta_{t-1}$:

- $\theta_2=0{,}25\cdot0-0{,}25\cdot1=-0{,}25$;
- $\theta_3=0{,}25\cdot(-0{,}25)-0{,}25\cdot0=-0{,}0625$;
- $\theta_4=0{,}25\cdot(-0{,}0625)-0{,}25\cdot(-0{,}25)=0{,}046875$.

**Câu (b).**

Đa thức $\zeta^2-0{,}25\zeta+0{,}25$ có biệt thức $0{,}0625-1=-0{,}9375<0$. Hai nghiệm là $\zeta=0{,}125\pm\tfrac{\sqrt{0{,}9375}}2\mathrm i\approx0{,}125\pm0{,}484\,\mathrm i$, với $\mathrm i$ là đơn vị ảo; môđun chung là $\sqrt{0{,}25}=0{,}5$.

**Câu (c).**

Định lý 05.21(b) cho điều kiện $0<4\eta<2(1+0{,}25)$, tức $0<\eta<0{,}625$. Giảm gradient cần $0<4\eta<2$, tức $\eta<0{,}5$.

**Câu (d).**

Theo (3.6), hai hệ số của đệ quy chứa thừa số $1-\eta\lambda=0$, nên $\theta_1=0$ và $\theta_{t+1}=0$ với mọi $t\ge1$. Tính theo Thuật toán 05.3:

- vòng 1: điểm dự báo $\theta_0=1$, gradient $4$, $v_1=-1$, $\theta_1=0$;
- vòng 2: điểm dự báo $0+0{,}25\cdot(-1)=-0{,}25$, gradient $-1$, $v_2=0{,}25\cdot(-1)-0{,}25\cdot(-1)=0$, $\theta_2=0$.

Định lý 05.23(b) cho điều kiện $4\eta<\tfrac{2\cdot1{,}25}{1{,}5}=\tfrac53$, tức $0<\eta<\tfrac5{12}$, khoảng $0{,}417$: hẹp hơn cả momentum và giảm gradient.

**Kiểm tra lại.**

Theo thuật toán momentum: $v_1=-0{,}25\cdot4\cdot1=-1$, nên $\theta_1=0$.

$v_2=0{,}25\cdot(-1)-0=-0{,}25$, nên $\theta_2=-0{,}25$.

$v_3=0{,}25\cdot(-0{,}25)-0{,}25\cdot4\cdot(-0{,}25)=0{,}1875$, nên $\theta_3=-0{,}0625$.

Tỷ số $\lvert\theta_4/\theta_2\rvert\approx0{,}19$ cùng bậc với $0{,}5^2=0{,}25$, khớp môđun $0{,}5$.
:::

**Chuỗi suy luận của mục.**

1. Ví dụ 05.15 và Mệnh đề 05.17 chỉ ra độ cong lớn nhất chặn bước học và số điều kiện quyết định tốc độ của giảm gradient.
2. Thuật toán 05.2 và Mệnh đề 05.18 thêm trạng thái vận tốc, viết bước thành tổng có trọng số của các gradient.
3. Bổ đề 05.20 và Định lý 05.21 viết momentum thành hệ tuyến tính hai biến, cho miền hội tụ $0<\eta L<2(1+\beta)$ và hệ số co $\sqrt\beta$; Hệ quả 05.22 chọn tham số cho hệ số $\tfrac{\sqrt\kappa-1}{\sqrt\kappa+1}$.
4. Thuật toán 05.3 và Định lý 05.23 dời điểm tính gradient, cho miền hội tụ hẹp hơn và hệ số $1-\tfrac1{\sqrt\kappa}$ với bước $\tfrac1L$.

Đích của mục là hai quy tắc cập nhật cùng hai định lý mô tả chúng trên hàm bậc hai.

**Kết mục.** Mục này cho hai quy tắc cập nhật (Thuật toán 05.2, 05.3) và phân tích đầy đủ của chúng trên hàm bậc hai (Định lý 05.21, 05.23, Hệ quả 05.22). Mọi kết quả đều giả định một điểm đầu tùy ý: với hàm bậc hai lồi chặt, điểm đầu không ảnh hưởng tới nghiệm. Với mạng nơ ron, điều đó sai: Nhận xét 05.9 đã chỉ ra mất mát có nhiều cực tiểu và điểm yên ngựa, và cách gradient truyền qua các lớp phụ thuộc giá trị ban đầu của trọng số. Mục 4 dựng một mạng nhỏ, tính gradient của nó bằng quy tắc dây chuyền, rồi suy ra hai yêu cầu đối với $\theta_0$.

## 4. Khởi tạo tham số mạng nơ ron

Các định lý của Mục 3 không phụ thuộc điểm đầu, nhưng với mạng nơ ron điểm đầu quyết định nơi thuật toán dừng: ở Tình huống 05.3, cùng dữ liệu và cùng bước học, khởi tạo hai đơn vị giống nhau làm $J$ dừng ở $\tfrac16$, trong khi mạng có thể đạt $0$.

Muốn chọn $\theta_0$ có căn cứ, cần biết gradient truyền qua cấu trúc mạng ra sao. Mục này dựng một mạng hai đơn vị ẩn, tính đạo hàm của nó bằng quy tắc dây chuyền, chứng minh rằng hai đơn vị bắt đầu giống nhau sẽ giống nhau mãi, rồi chuyển sang một mô hình tuyến tính ngẫu nhiên để suy ra thang của trọng số. Kết quả là hai yêu cầu riêng biệt đối với $\theta_0$: phá đối xứng và giữ phương sai.

### 4.1 Mạng hai đơn vị ẩn và quy tắc dây chuyền

Mạng nhỏ nhất đủ để xét quan hệ giữa các đơn vị ẩn có hai đơn vị. Ví dụ sau thực hiện phép truyền xuôi trên một quan sát trước khi đặt định nghĩa tổng quát.

::: example Ví dụ 05.22 (Truyền xuôi trên mạng hai đơn vị)
**Dữ kiện.** Đầu vào $x=1$, nhãn $y=0$. Mỗi đơn vị $j\in\{1,2\}$ có trọng số vào $w_j=1$, độ lệch $c_j=0$ và trọng số ra $a_j=1$. Hàm kích hoạt là ReLU, $\phi(z)=\max(0,z)$.

**Truyền xuôi.**

1. Tiền kích hoạt: $z_j=w_jx+c_j=1$.
2. Kích hoạt: $h_j=\phi(1)=1$.
3. Dự đoán: $f_\theta(x)=a_1h_1+a_2h_2=2$.
4. Mất mát bình phương: $\ell=\tfrac12(2-0)^2=2$.

**Kiểm tra lại.** Hai tiền kích hoạt dương, nên ReLU khả vi tại đó với đạo hàm $1$; mọi đạo hàm ở các ví dụ tiếp theo được tính tại điểm khả vi.
:::

![Sơ đồ mạng hai nhánh song song từ đầu vào x. Mỗi nhánh j có nhãn wj, bj trên cạnh vào, trong đó bj là độ lệch c_j của ghi chú, khối ReLU cho kích hoạt h_j, và trọng số ra a_j trên cạnh tới đầu ra f = a₁h₁ + a₂h₂. Mũi tên dưới cùng chỉ chiều truyền xuôi.](img/lec-05/two-hidden-units.svg)

Hình vẽ hai nhánh song song: mỗi nhánh nhận cùng đầu vào $x$, tính một hàm affine rồi qua ReLU, và đóng góp vào đầu ra qua trọng số ra của nó. Trên hình, $b_j$ ứng với độ lệch $c_j$ của ghi chú; chữ $b$ dành cho cỡ nhóm.

::: definition Định nghĩa 05.25 (Mạng hai đơn vị ẩn)
Cho hàm kích hoạt $\phi:\mathbb R\to\mathbb R$. Mạng hai đơn vị ẩn có tham số $\theta=(w_1,c_1,a_1,w_2,c_2,a_2)\in\mathbb R^6$ và, với đầu vào $x\in\mathbb R$,

$$
z_j=w_jx+c_j,\qquad h_j=\phi(z_j),\qquad f_\theta(x)=a_1h_1+a_2h_2 .
$$

Ba đại lượng lần lượt là tiền kích hoạt (pre-activation), kích hoạt (activation) và đầu ra. Với nhãn $y\in\mathbb R$, mất mát bình phương là $\ell=\tfrac12(f_\theta(x)-y)^2$, và sai số dự đoán là $e=f_\theta(x)-y$.
:::

Định nghĩa dùng các khái niệm của Mục 1: $f_\theta$ là mô hình tham số hóa của Định nghĩa 05.1 với $d=1$ và $p=6$, và $\ell$ là mất mát bình phương như ở ví dụ ba quan sát. Mô hình hằng của Ví dụ 05.1 là trường hợp riêng: với $w_j=0$, $c_j>0$ và ReLU, $f_\theta=a_1c_1+a_2c_2$ là một hằng số. Mạng khác mô hình tuyến tính ở chỗ $\phi$ phi tuyến và tham số xuất hiện dưới dạng tích $a_j\phi(w_jx+c_j)$, như hàm $\tfrac12(ab-1)^2$ của Tình huống 04.3.

Mệnh đề sau tính sáu đạo hàm riêng. Mỗi đạo hàm là tích các đạo hàm cục bộ dọc đường đi từ tham số tới mất mát.

::: proposition Mệnh đề 05.26 (Đạo hàm của mất mát theo sáu tham số)
**Giả thiết.** Mạng của Định nghĩa 05.25; $\phi$ khả vi tại $z_1$ và $z_2$.

**Kết luận.** Với $j\in\{1,2\}$,

$$
\frac{\partial\ell}{\partial a_j}=e\,h_j,\qquad\frac{\partial\ell}{\partial w_j}=e\,a_j\,\phi'(z_j)\,x,\qquad\frac{\partial\ell}{\partial c_j}=e\,a_j\,\phi'(z_j).
\tag{4.1}
$$

**Điều kiện áp dụng.** Với ReLU, cần $z_j\ne0$; tại $z_j=0$ phải chọn một giá trị quy ước cho $\phi'(0)$.

**Phạm vi.** Công thức cho đạo hàm trên một quan sát; với một nhóm, gradient nhóm là trung bình của (4.1) trên các quan sát.
:::

::: proof Chứng minh Mệnh đề 05.26
**Bước 1 (khâu cuối).**

$\ell=\tfrac12(f_\theta-y)^2$ nên $\partial\ell/\partial f_\theta=f_\theta-y=e$.

**Bước 2 (trọng số ra).**

$f_\theta$ phụ thuộc $a_j$ chỉ qua số hạng $a_jh_j$, nên $\partial f_\theta/\partial a_j=h_j$. Quy tắc dây chuyền cho $\partial\ell/\partial a_j=e\,h_j$.

**Bước 3 (trọng số vào và độ lệch).**

Tham số $w_j$ ảnh hưởng tới $\ell$ qua chuỗi $w_j\to z_j\to h_j\to f_\theta\to\ell$, với các đạo hàm cục bộ $\partial z_j/\partial w_j=x$, $\partial h_j/\partial z_j=\phi'(z_j)$, $\partial f_\theta/\partial h_j=a_j$ và $e$. Tích của chúng cho $\partial\ell/\partial w_j$. Với $c_j$, khâu đầu đổi thành $\partial z_j/\partial c_j=1$, nên thừa số $x$ biến mất. $\square$
:::

Công thức (4.1) đọc theo đường truyền ngược: sai số $e$ đi từ mất mát về đầu ra, nhân với trọng số ra $a_j$ để tới kích hoạt, nhân với $\phi'(z_j)$ để tới tiền kích hoạt, rồi nhân với đầu vào của khâu affine. Mỗi đạo hàm chứa hai loại thừa số: thừa số chung cho mọi đơn vị ($e$, $x$) và thừa số riêng của đơn vị ($a_j$, $z_j$, $h_j$, $\phi'(z_j)$). Sự phân chia này quyết định khi nào hai đơn vị nhận cùng cập nhật.

Quy tắc dây chuyền chỉ tính gradient; nó không phải thuật toán tối ưu. Thủ tục tính (4.1) cho mọi tham số của một mạng nhiều lớp bằng cách đi ngược từ mất mát gọi là truyền ngược (backpropagation); gradient thu được được đưa vào một trong các quy tắc cập nhật của Mục 2, 3.

::: example Ví dụ 05.23 (Sáu đạo hàm và một bước cập nhật)
**Dữ kiện.** Mạng hai đơn vị (Định nghĩa 05.25): $z_j=w_jx+c_j$, $h_j=\phi(z_j)$, $f_\theta(x)=a_1h_1+a_2h_2$, $\ell=\tfrac12(f_\theta(x)-y)^2$, $e=f_\theta(x)-y$, với ReLU $\phi(z)=\max(0,z)$. Cấu hình của Ví dụ 05.22: $x=1$, $y=0$, $w_j=1$, $c_j=0$, $a_j=1$, nên $e=2$, $h_j=1$, $\phi'(z_j)=1$.

**Đạo hàm theo (4.1).**

- $\partial\ell/\partial a_j=e\,h_j$, bằng $2\cdot1=2$;
- $\partial\ell/\partial w_j=e\,a_j\phi'(z_j)x$, bằng $2\cdot1\cdot1\cdot1=2$;
- $\partial\ell/\partial c_j=e\,a_j\phi'(z_j)$, bằng $2\cdot1\cdot1=2$.

Cả sáu đạo hàm bằng $2$.

**Một bước giảm gradient với $\eta=0{,}1$.** Mỗi tham số giảm $0{,}2$:

| Tham số | Đơn vị 1: trước → sau | Đơn vị 2: trước → sau |
|---|---|---|
| $a_j$ | $1\to0{,}8$ | $1\to0{,}8$ |
| $w_j$ | $1\to0{,}8$ | $1\to0{,}8$ |
| $c_j$ | $0\to-0{,}2$ | $0\to-0{,}2$ |

**Kiểm tra lại.** Sau bước:

- $z_j=0{,}8-0{,}2=0{,}6$ và $h_j=0{,}6$;
- $f_\theta=2\cdot0{,}8\cdot0{,}6=0{,}96$;
- $\ell=\tfrac12\cdot0{,}96^2\approx0{,}461$, nhỏ hơn $2$.

Hai cột của bảng giống hệt nhau.
:::

Sáu đạo hàm bằng nhau là do cấu hình đặc biệt; hai cột của bảng cũng trùng nhau sau cập nhật. Một bước chưa cho biết hai đơn vị có giữ bằng nhau ở mọi vòng hay không; Mục 4.2 trả lời bằng một định lý.

### 4.2 Đối xứng giữa các đơn vị ẩn và cách phá đối xứng

Trực giác, chưa phải phát biểu hình thức: nếu hai đơn vị có cùng tham số, chúng tính cùng kích hoạt trên mọi đầu vào, nhận cùng thừa số riêng trong (4.1), nên nhận cùng cập nhật. Khi đó chúng không bao giờ trở nên khác nhau, và mạng chỉ dùng được sức biểu diễn của một đơn vị.

::: definition Định nghĩa 05.27 (Hai đơn vị đối xứng)
Trong mạng của Định nghĩa 05.25, hai đơn vị ẩn đối xứng tại tham số $\theta$ nếu $(w_1,c_1,a_1)=(w_2,c_2,a_2)$. Với quy tắc cập nhật có vận tốc $v=(v_{w_1},v_{c_1},v_{a_1},v_{w_2},v_{c_2},v_{a_2})$, hai đơn vị đối xứng tại trạng thái $(\theta,v)$ nếu thêm $(v_{w_1},v_{c_1},v_{a_1})=(v_{w_2},v_{c_2},v_{a_2})$.
:::

Định nghĩa đòi bằng nhau đồng thời tham số vào và tham số ra. Bằng nhau một phần không đủ: với $w_1=w_2$ nhưng $a_1\ne a_2$, (4.1) cho $\partial\ell/\partial w_1\ne\partial\ell/\partial w_2$ khi $e\,x\,\phi'(z_j)\ne0$. Khái niệm khác với đối xứng hoán vị của Nhận xét 05.9: đối xứng hoán vị là tính chất của hàm mất mát, đúng với mọi tham số; đối xứng giữa hai đơn vị là tính chất của một tham số cụ thể.

Chứng minh của định lý sau là quy nạp theo số vòng lặp, dùng (4.1) ở bước quy nạp.

::: theorem Định lý 05.28 (Đối xứng được bảo toàn qua các bước lặp)
**Giả thiết.**

- Mạng của Định nghĩa 05.25, hai đơn vị dùng cùng hàm kích hoạt $\phi$.
- Huấn luyện bằng Thuật toán 05.1 (gradient nhóm hoặc gradient đầy đủ), 05.2 hoặc 05.3, với nhóm quan sát chung cho cả mạng và $v_0=0$.
- Tại vòng $0$, hai đơn vị đối xứng.
- Tại mọi vòng, mọi quan sát trong nhóm và điểm tính gradient, $\phi$ khả vi tại các tiền kích hoạt, hoặc hai đơn vị dùng cùng một giá trị quy ước cho $\phi'$ tại điểm không khả vi.

**Kết luận.** Với mọi $t\ge0$, hai đơn vị đối xứng tại trạng thái $(\theta_t,v_t)$, và $f_{\theta_t}(x)=2a_{1,t}\,\phi\bigl(w_{1,t}x+c_{1,t}\bigr)$ với mọi $x$, trong đó $a_{1,t}$, $w_{1,t}$, $c_{1,t}$ là giá trị của $a_1$, $w_1$, $c_1$ ở vòng $t$.

**Điều kiện áp dụng.** Quy tắc cập nhật xử lý mọi tham số theo cùng một công thức, không có nhiễu riêng cho từng đơn vị.

**Phạm vi.** Định lý không áp dụng khi có kỹ thuật làm nhiễu riêng từng đơn vị như bỏ ngẫu nhiên đơn vị (dropout). Nó nói về hai đơn vị trong cùng một lớp nhận cùng đầu vào.
:::

::: proof Chứng minh Định lý 05.28
**Bước 1 (giả thiết quy nạp).**

Giả sử hai đơn vị đối xứng tại $(\theta_t,v_t)$; với $t=0$ điều này là giả thiết, vì $v_0=0$.

**Bước 2 (điểm tính gradient).**

Với Thuật toán 05.1 và 05.2, gradient tính tại $\theta_t$. Với Thuật toán 05.3, gradient tính tại $\widetilde\theta_t=\theta_t+\beta v_t$; vì tham số và vận tốc của hai đơn vị bằng nhau, tham số dự báo của hai đơn vị cũng bằng nhau. Trong mọi trường hợp, tại điểm tính gradient hai đơn vị có cùng $(w,c,a)$.

**Bước 3 (gradient trên một quan sát).**

Với một quan sát $(x,y)$ của nhóm: $z_1=z_2$ và $h_1=h_2$ vì tham số vào bằng nhau; do đó $f_\theta$ và $e$ là một số chung. Theo (4.1), mỗi đạo hàm của đơn vị $j$ là tích của các thừa số chung $e$, $x$ với các thừa số riêng $a_j$, $h_j$, $\phi'(z_j)$; các thừa số riêng bằng nhau giữa hai đơn vị, kể cả $\phi'$ tại điểm không khả vi nhờ quy ước chung. Vậy đạo hàm theo $(w_1,c_1,a_1)$ bằng đạo hàm theo $(w_2,c_2,a_2)$.

**Bước 4 (gradient nhóm).**

Gradient nhóm là trung bình của các gradient trên từng quan sát của cùng một nhóm. Trung bình của các cặp bằng nhau là một cặp bằng nhau.

**Bước 5 (cập nhật).**

Mọi quy tắc cập nhật nhân và cộng từng tọa độ với cùng hệ số $\eta$, $\beta$. Hai bộ tọa độ bằng nhau trước cập nhật, nhận cùng gradient, nên bằng nhau sau cập nhật; điều này đúng cho cả tham số và vận tốc. Vậy hai đơn vị đối xứng tại $(\theta_{t+1},v_{t+1})$, và quy nạp cho mọi $t$.

**Bước 6 (dạng của đầu ra).**

Khi hai đơn vị đối xứng, $h_1=h_2=\phi(w_1x+c_1)$ với mọi $x$, nên $f_\theta(x)=(a_1+a_2)\phi(w_1x+c_1)=2a_1\phi(w_1x+c_1)$. $\square$
:::

Định lý nói rằng thuật toán dựa trên gradient không tự tách hai đơn vị giống nhau. Khác các định lý của Mục 3, vốn cho biết dãy lặp đi tới đâu, Định lý 05.28 cho biết tập tham số đối xứng là tập bất biến của mọi quy tắc trong chương; Hệ quả 05.29 lượng hóa cái giá của nó.

Nhóm dữ liệu thay đổi qua các vòng không giúp: mỗi nhóm được dùng chung cho cả mạng, nên Bước 4 áp dụng cho mọi nhóm. Momentum và Nesterov cũng không giúp, vì vận tốc của hai đơn vị bằng nhau.

Bỏ giả thiết cùng hàm kích hoạt, thừa số $\phi'(z_j)$ khác nhau. Bỏ giả thiết quy ước chung tại điểm gãy của ReLU, một đơn vị có thể nhận đạo hàm $0$ còn đơn vị kia nhận $1$ tại $z_j=0$. Bỏ giả thiết đối xứng ban đầu, Ví dụ 05.24 dưới đây cho thấy hai đơn vị tách nhau.

::: corollary Hệ quả 05.29 (Mạng đối xứng không tốt hơn một đơn vị)
**Giả thiết.** Như Định lý 05.28, với tập huấn luyện $\{(x_i,y_i)\}_{i=1}^N$ và mất mát huấn luyện $J$ của mạng hai đơn vị.

**Kết luận.** Với mọi $t$,

$$
J(\theta_t)\ge J_1^*:=\inf_{(w,c,a)\in\mathbb R^3}\frac1N\sum_{i=1}^N\tfrac12\bigl(a\,\phi(wx_i+c)-y_i\bigr)^2 .
$$

**Điều kiện áp dụng.** Như Định lý 05.28.

**Phạm vi.** $J_1^*$ là mất mát tốt nhất của mạng một đơn vị; khi dữ liệu cần hai đơn vị, như Tình huống 05.3, $J_1^*$ dương trong khi mạng hai đơn vị đạt $0$.
:::

::: proof Chứng minh Hệ quả 05.29
Theo Định lý 05.28, $f_{\theta_t}(x)=a\,\phi(wx+c)$ với $a=2a_{1,t}$, $w=w_{1,t}$, $c=c_{1,t}$. Do đó $J(\theta_t)$ là mất mát của một mạng một đơn vị với tham số $(w,c,a)$, không nhỏ hơn cận dưới đúng $J_1^*$ trên mọi mạng như vậy. $\square$
:::

::: remark Nhận xét 05.30 (Ba hệ quả thực tế của đối xứng)
**Khởi tạo bằng $0$ là điểm dừng.** Với $\phi(0)=0$, như ReLU và tanh, tham số $\theta=0$ cho $h_j=0$ và $a_j=0$, nên cả ba đạo hàm trong (4.1) bằng $0$ với mọi quan sát và với mọi quy ước của $\phi'(0)$: $\nabla J(0)=0$. Mọi quy tắc của chương đứng yên tại đó. Điểm này không là cực tiểu địa phương khi dữ liệu thỏa một điều kiện không suy biến, nêu riêng cho từng hàm kích hoạt dưới đây. Ký hiệu $\overline{xy}=\tfrac1N\sum_iy_ix_i$ và $\bar y=\tfrac1N\sum_iy_i$. Với tanh, Hessian của $J$ tại $\theta=0$ theo bộ $(w_j,c_j,a_j)$ của mỗi đơn vị là khối

$$
\begin{bmatrix}0&0&-\overline{xy}\\0&0&-\bar y\\-\overline{xy}&-\bar y&0\end{bmatrix},
$$

và các khối của hai đơn vị không liên kết. Với dữ liệu của Tình huống 05.3, $N=3$ và $\overline{xy}=\bar y=\tfrac43$.

- Với tanh, $J$ khả vi hai lần liên tục và khối trên có giá trị riêng $0$ và $\pm\sqrt{\overline{xy}^2+\bar y^2}$. Khi $(\overline{xy},\bar y)\ne0$, Hessian có một giá trị riêng dương và một giá trị riêng âm, nên gốc là điểm yên ngựa theo Mệnh đề 05.8(c). Với dữ liệu trên, hai giá trị đó là $\pm\tfrac43\sqrt2\approx\pm1{,}886$.
- Với ReLU, $J$ không khả vi hai lần tại $0$ nên Mệnh đề 05.8 không áp dụng; điều kiện là $\sum_iy_i\ne0$. Đi theo hướng $w_j=0$ và $a_j=c_j=\tau$ với $\tau>0$: $f_\theta=2\tau^2$ với mọi $x$, nên $J(\tau)-J(0)=-\tfrac{2\tau^2}N\sum_iy_i+2\tau^4$, âm khi $\tau$ nhỏ và $\sum_iy_i>0$; khi $\sum_iy_i<0$ dùng $a_j=-\tau$. Với dữ liệu trên, $J(\tau)=1-\tfrac83\tau^2+2\tau^4$, chẳng hạn $J(0{,}3)\approx0{,}776<1$.

**Momentum không sửa được đối xứng.** Định lý 05.28 bao gồm Thuật toán 05.2 và 05.3; vận tốc chỉ cộng dồn các gradient vốn đã bằng nhau.

**Đối xứng hoán vị.** Nếu hai đơn vị không đối xứng, hoán đổi $(w_1,c_1,a_1)$ với $(w_2,c_2,a_2)$ cho một tham số khác có cùng $f_\theta$ và cùng $J$; mất mát vì vậy có ít nhất hai cực tiểu cùng giá trị, như hai đáy của $\omega$ ở Ví dụ 05.6.
:::

Định lý 05.28 cho thấy đối xứng phải được phá ngay tại $\theta_0$. Cách đơn giản là lấy trọng số ngẫu nhiên từ một phân phối liên tục; mệnh đề sau cho biết hai trọng số như vậy khác nhau chắc chắn.

::: proposition Mệnh đề 05.31 (Trọng số ngẫu nhiên liên tục khác nhau với xác suất 1)
**Giả thiết.** $W_1,\ldots,W_n$ là các biến ngẫu nhiên thực độc lập; mỗi $W_k$ có phân phối liên tục, tức $\Pr(W_k=\varsigma)=0$ với mọi số thực $\varsigma$.

**Kết luận.** Xác suất để có hai chỉ số $k\ne k'$ với $W_k=W_{k'}$ bằng $0$.

**Điều kiện áp dụng.** Cần độc lập và phân phối liên tục; phân phối đều trên một đoạn và phân phối chuẩn đều thỏa.

**Phạm vi.** Mệnh đề chỉ bảo đảm các trọng số khác nhau; nó không nói chúng khác nhau đủ nhiều hay có độ lớn phù hợp.
:::

::: proof Chứng minh Mệnh đề 05.31
**Bước 1 (một cặp).** Với $k\ne k'$ cố định, theo công thức xác suất toàn phần, $\Pr(W_k=W_{k'})$ là kỳ vọng theo $W_k$ của $\Pr(W_{k'}=W_k\mid W_k)$, và xác suất có điều kiện này bằng $0$ vì $W_{k'}$ liên tục và độc lập với $W_k$.

**Bước 2 (mọi cặp).** Biến cố có hai trọng số bằng nhau là hợp của các biến cố ở Bước 1, nên xác suất của nó không vượt tổng các xác suất bằng $0$. $\square$
:::

Mệnh đề giải thích quy tắc thực hành: lấy trọng số độc lập từ một phân phối liên tục có trung bình $0$, thay vì chọn tay từng giá trị khác nhau. Độ lệch có thể khởi tạo bằng $0$: khi trọng số vào đã khác nhau, $z_1\ne z_2$ trên hầu hết đầu vào, và Bước 3 của chứng minh Định lý 05.28 không còn đúng.

::: example Ví dụ 05.24 (Hai trọng số vào khác nhau)
**Dữ kiện.** Mạng hai đơn vị: $z_j=w_jx+c_j$, $h_j=\phi(z_j)$, $f_\theta(x)=a_1h_1+a_2h_2$, $\ell=\tfrac12(f_\theta(x)-y)^2$, $e=f_\theta(x)-y$, với ReLU $\phi(z)=\max(0,z)$; đạo hàm (4.1): $\partial\ell/\partial a_j=e\,h_j$, $\partial\ell/\partial w_j=e\,a_j\phi'(z_j)x$, $\partial\ell/\partial c_j=e\,a_j\phi'(z_j)$. Như Ví dụ 05.22 nhưng $w_1=0{,}8$, $w_2=1{,}2$; giữ $a_j=1$, $c_j=0$, $x=1$, $y=0$, $\eta=0{,}1$. Hai giá trị được chọn để minh họa, không đến từ phép lấy mẫu.

**Vòng 1.**

- Truyền xuôi: $h_1=0{,}8$, $h_2=1{,}2$, $f_\theta=2$, $e=2$.
- Theo (4.1): $\partial\ell/\partial a_1=2\cdot0{,}8=1{,}6$ và $\partial\ell/\partial a_2=2\cdot1{,}2=2{,}4$.
- Đạo hàm theo $w_j$ và $c_j$ vẫn bằng $2$ ở cả hai đơn vị.
- Sau bước: $a=(0{,}84;\,0{,}76)$, $w=(0{,}6;\,1{,}0)$, $c=(-0{,}2;\,-0{,}2)$.

**Vòng 2.**

- Tiền kích hoạt: $z=(0{,}4;\,0{,}8)$.
- Đầu ra: $f_\theta=0{,}84\cdot0{,}4+0{,}76\cdot0{,}8=0{,}944$, nên $e=0{,}944$.
- Đạo hàm theo trọng số vào: $e\,a_1x=0{,}944\cdot0{,}84\approx0{,}793$ và $e\,a_2x=0{,}944\cdot0{,}76\approx0{,}717$.

**Diễn giải.** Trọng số vào khác nhau làm trọng số ra nhận gradient khác nhau ngay ở vòng 1; từ vòng 2, trọng số ra khác nhau làm trọng số vào nhận gradient khác nhau. Sự khác biệt lan sang mọi tham số.

**Kiểm tra lại.** Ở vòng 1, $f_\theta=0{,}8+1{,}2=2$ như Ví dụ 05.22, nên $e$ không đổi; khác biệt chỉ đến từ $h_j$.
:::

**Trong học máy.** Định lý 05.28 chứng minh cho hai đơn vị và một đầu ra. Cùng lập luận quy nạp áp dụng cho $n$ đơn vị của một lớp và nhiều đầu ra, với điều kiện trọng số vào, độ lệch và trọng số ra của các đơn vị đều bằng nhau, tức các cột tương ứng của ma trận trọng số lớp sau bằng nhau; khi đó lớp hoạt động như một đơn vị duy nhất trong suốt quá trình huấn luyện.

Với Thuật toán 05.1–05.3, và với mọi quy tắc xử lý mọi tọa độ theo cùng một công thức, kết luận đúng chính xác khi không có nhiễu riêng từng đơn vị như dropout. Vì vậy trọng số phải được khởi tạo ngẫu nhiên (Goodfellow, Bengio và Courville 2016, mục 8.4, tr. 301–302). Tình huống 05.3 tính bằng số hậu quả của việc vi phạm quy tắc này.

::: exercise Bài tập 05.6
**Dữ kiện.** Mạng hai đơn vị (Định nghĩa 05.25): $z_j=w_jx+c_j$, $h_j=\phi(z_j)$, $f_\theta(x)=a_1h_1+a_2h_2$, $\ell=\tfrac12(f_\theta(x)-y)^2$, $e=f_\theta(x)-y$. Đạo hàm (4.1): $\partial\ell/\partial a_j=e\,h_j$, $\partial\ell/\partial w_j=e\,a_j\phi'(z_j)x$, $\partial\ell/\partial c_j=e\,a_j\phi'(z_j)$.

Mạng hai đơn vị dùng $\phi=\tanh$, một quan sát $x=1$, $y=1$, và tham số ban đầu $w_j=0{,}5$, $c_j=0$, $a_j=0{,}5$ cho cả hai đơn vị.

- (a) Tính $z_j$, $h_j$, $f_\theta$, $e$ và sáu đạo hàm theo (4.1), dùng $\tanh0{,}5\approx0{,}4621$ và $\tanh'(z)=1-\tanh^2z$.
- (b) Với momentum, $v_{t+1}=\beta v_t-\eta\nabla\ell(\theta_t)$, $\theta_{t+1}=\theta_t+v_{t+1}$, $\eta=0{,}5$, $\beta=0{,}9$ và $v_0=0$, giải thích mà không cần tính số vì sao vận tốc của hai đơn vị bằng nhau ở mọi vòng.
- (c) Giữ mọi tham số trừ $w_2$. Tìm mọi $w_2$ để $\partial\ell/\partial w_1=\partial\ell/\partial w_2$ tại quan sát này; với giá trị $w_2\ne w_1$ tìm được, tính hai đạo hàm theo $a_1$, $a_2$ và giải thích vì sao bằng nhau ở một cặp đạo hàm chưa phải là đối xứng.
:::

::: hint
Ở (a), mọi thừa số riêng của hai đơn vị bằng nhau. Ở (c), hai đạo hàm theo $w_j$ có chung $e$, $a_j$, $x$, nên chúng bằng nhau khi $\tanh^2w_1=\tanh^2w_2$.
:::

::: solution
**Câu (a).**

$z_j=0{,}5$, $h_j\approx0{,}4621$, $f_\theta=2\cdot0{,}5\cdot0{,}4621\approx0{,}4621$, $e\approx-0{,}5379$. Với $\tanh'(0{,}5)=1-0{,}4621^2\approx0{,}7864$:

- $\partial\ell/\partial a_j=e\,h_j\approx-0{,}2486$;
- $\partial\ell/\partial w_j=e\,a_j\tanh'(z_j)\,x$, bằng $-0{,}5379\cdot0{,}5\cdot0{,}7864\approx-0{,}2115$;
- $\partial\ell/\partial c_j\approx-0{,}2115$.

Ba đạo hàm của đơn vị 1 bằng ba đạo hàm của đơn vị 2.

**Câu (b).**

$v_0=0$ đối xứng. Ở mỗi vòng, theo Định lý 05.28, hai đơn vị có cùng tham số nên cùng gradient; vận tốc mới $\beta v_t-\eta\widehat g_t$ của hai đơn vị là cùng một tổ hợp của hai đại lượng bằng nhau. Quy nạp cho mọi vòng.

**Câu (c).**

Với $a_1=a_2$ và $x=1$, hai đạo hàm $e\,a_j\tanh'(w_j)$ bằng nhau khi $e=0$ hoặc $\tanh'(w_1)=\tanh'(w_2)$. Trường hợp $e=0$ đòi $0{,}5\tanh0{,}5+0{,}5\tanh w_2=1$, tức $\tanh w_2\approx1{,}54$, vô nghiệm. Vì $\tanh'(z)=1-\tanh^2z$, còn lại $\tanh^2w_2=\tanh^2 0{,}5$, tức $w_2=\pm0{,}5$. Giá trị khác $w_1$ là $w_2=-0{,}5$.

Với $w_2=-0{,}5$:

- $h_1\approx0{,}4621$ và $h_2=\tanh(-0{,}5)\approx-0{,}4621$;
- $f_\theta=0{,}5\cdot0{,}4621-0{,}5\cdot0{,}4621=0$, nên $e=-1$;
- $\partial\ell/\partial w_j=-1\cdot0{,}5\cdot0{,}7864\approx-0{,}3932$ ở cả hai đơn vị;
- $\partial\ell/\partial a_1=-0{,}4621$ và $\partial\ell/\partial a_2=+0{,}4621$.

Tham số vào khác nhau, nên giả thiết của Định nghĩa 05.27 sai; một cặp đạo hàm bằng nhau không giữ được các cặp còn lại, và hai trọng số ra di chuyển ngược chiều nhau.

**Kiểm tra lại.**

Ở (a), $\ell=\tfrac12\cdot0{,}5379^2\approx0{,}1447$. Một bước giảm gradient với $\eta=0{,}5$ cho $a_j\approx0{,}6243$, $w_j\approx0{,}6058$; khi đó tiền kích hoạt là $0{,}6058+0{,}1058\approx0{,}7116$, $f_\theta\approx2\cdot0{,}6243\cdot0{,}6116\approx0{,}7636$, và $\ell\approx0{,}028$, nhỏ hơn $0{,}1447$, với hai đơn vị vẫn bằng nhau.
:::

### 4.3 Độ nhạy qua nhiều lớp và bão hòa

Phá đối xứng chỉ đòi các trọng số khác nhau; nó chưa nói chúng lớn cỡ nào. Trong mạng nhiều lớp, đạo hàm theo một tham số ở lớp đầu là tích các thừa số dọc mọi lớp phía sau, và độ lớn của trọng số quyết định từng thừa số. Để tách tác dụng của phép nhân liên tiếp, phần này dùng một chuỗi vô hướng làm mô hình minh họa thay cho mạng hai nhánh.

::: example Ví dụ 05.25 (Chuỗi tuyến tính bốn lớp)
**Dữ kiện.** Bốn lớp $h^{(k)}=\gamma_kh^{(k-1)}$, $k=1,\ldots,4$, với hệ số $\gamma_k\in\mathbb R$ của lớp $k$ và đầu vào $h^{(0)}=1$.

**Hai cấu hình.** Theo quy tắc dây chuyền, $\partial h^{(4)}/\partial h^{(0)}=\gamma_4\gamma_3\gamma_2\gamma_1$.

| Cấu hình | $h^{(1)},h^{(2)},h^{(3)},h^{(4)}$ | Độ nhạy $\prod\gamma_k$ |
|---|---|---|
| mọi $\gamma_k=\tfrac12$ | $\tfrac12,\tfrac14,\tfrac18,\tfrac1{16}$ | $\tfrac1{16}$ |
| mọi $\gamma_k=2$ | $2,4,8,16$ | $16$ |

**Diễn giải.** Với chuỗi tuyến tính và đầu vào $1$, tín hiệu và độ nhạy trùng nhau. Hệ số chỉ lệch $2$ lần khỏi $1$ đã tạo chênh lệch $256$ lần sau bốn lớp.

**Kiểm tra lại.** $(\tfrac12)^4=\tfrac1{16}$, $2^4=16$, $16/\tfrac1{16}=256$.
:::

![Chuỗi bốn lớp tuyến tính với đầu vào bằng 1, các hệ số lớp ghi là c1, …, c4, tức γ₁, …, γ₄ của ghi chú. Hàng trên: hệ số 1/2 ở mỗi lớp cho tín hiệu 1/2, 1/4, 1/8, 1/16. Hàng dưới: hệ số 2 cho 2, 4, 8, 16.](img/lec-05/linear-chain.svg)

Hình vẽ hai chuỗi bốn lớp cùng đầu vào $1$: hàng trên nhân $\tfrac12$ ở mỗi lớp, hàng dưới nhân $2$. Tín hiệu cuối là $\tfrac1{16}$ và $16$, và đó cũng là độ nhạy của đầu ra theo đầu vào, vì mỗi lớp tuyến tính nhân cả tín hiệu lẫn đạo hàm với cùng hệ số. Trên hình, hệ số của lớp $k$ ghi là $c_k$, ứng với $\gamma_k$ của ghi chú; chữ $c_j$ dành cho độ lệch.

Mệnh đề sau viết ví dụ này cho hàm kích hoạt bất kỳ. Nó là quy tắc dây chuyền của Mệnh đề 05.26 áp dụng dọc một chuỗi dài: ở đó đạo hàm theo $w_j$ là tích bốn thừa số qua bốn khâu, ở đây là tích $2M$ thừa số qua $M$ lớp.

::: proposition Mệnh đề 05.32 (Độ nhạy của một chuỗi)
**Giả thiết.** $M\ge1$ lớp vô hướng, $h^{(k)}=\phi\bigl(\gamma_kh^{(k-1)}\bigr)$ với $\gamma_k\in\mathbb R$, $k=1,\ldots,M$; $h^{(0)}$ là đầu vào; $\phi$ khả vi tại các tiền kích hoạt $z^{(k)}=\gamma_kh^{(k-1)}$.

**Kết luận.**

$$
\frac{\partial h^{(M)}}{\partial h^{(0)}}=\prod_{k=1}^M\gamma_k\,\phi'\bigl(z^{(k)}\bigr).
\tag{4.2}
$$

Nói riêng, với $\phi$ là hàm đồng nhất, $\partial h^{(M)}/\partial h^{(0)}=\prod_k\gamma_k$, và với mọi $\gamma_k=\gamma$ thì bằng $\gamma^M$.

**Điều kiện áp dụng.** Chuỗi vô hướng; các lớp nối tiếp không rẽ nhánh.

**Phạm vi.** Độ nhạy của đầu ra theo đầu vào là một thừa số của gradient mất mát theo tham số, chưa phải toàn bộ gradient.
:::

::: proof Chứng minh Mệnh đề 05.32
**Bước 1 (một lớp).**

Theo quy tắc dây chuyền, $\partial h^{(k)}/\partial h^{(k-1)}=\phi'(z^{(k)})\gamma_k$.

**Bước 2 (quy nạp).**

Với $M=1$, kết luận là Bước 1. Nếu (4.2) đúng cho $M-1$ lớp, quy tắc dây chuyền cho $\partial h^{(M)}/\partial h^{(0)}=\tfrac{\partial h^{(M)}}{\partial h^{(M-1)}}\cdot\tfrac{\partial h^{(M-1)}}{\partial h^{(0)}}$, tích của Bước 1 với lớp $M$ và giả thiết quy nạp. $\square$
:::

Công thức (4.2) cho thấy hai cơ chế làm gradient qua nhiều lớp co hoặc phóng đại. Thứ nhất, với $\lvert\gamma\rvert\ne1$, $\gamma^M$ co về $0$ hoặc tăng không bị chặn theo cấp số mũ của độ sâu. Thứ hai, thừa số $\phi'(z^{(k)})$ nhỏ khi hàm kích hoạt bão hòa (saturate), tức tiến tới một giá trị biên khi $\lvert z\rvert$ lớn.


Ví dụ 05.25 gợi ý chọn trọng số lớn để tránh co. Với hàm kích hoạt bão hòa, cách đó làm thừa số thứ hai của (4.2) nhỏ đi, như ví dụ sau cho thấy.

::: example Ví dụ 05.26 (Bão hòa của tanh)
**Dữ kiện.** Chuỗi vô hướng $h^{(k)}=\phi(\gamma h^{(k-1)})$, $k=1,\ldots,4$, với $\phi=\tanh$, cùng hệ số $\gamma$ ở mọi lớp và $h^{(0)}=1$. Độ nhạy (4.2): $\frac{\partial h^{(M)}}{\partial h^{(0)}}=\prod_{k=1}^M\gamma_k\phi'(z^{(k)})$ với $z^{(k)}=\gamma_kh^{(k-1)}$.

**Một đơn vị.** $\phi(z)=\tanh z$ có $\phi'(z)=1-\tanh^2z$. Tại $z=0$: $\phi'=1$. Tại $z=3$: $\tanh3\approx0{,}99505$, nên $\phi'(3)\approx0{,}00987$; gradient qua đơn vị đó bị nhân với khoảng $0{,}01$.

**Chuỗi bốn lớp tanh, $h^{(0)}=1$.** Tính theo (4.2), làm tròn bốn chữ số:

| $\gamma$ | Tiền kích hoạt $z^{(1)},\ldots,z^{(4)}$ | $\phi'(z^{(k)})$ | Độ nhạy |
|---|---|---|---|
| $\tfrac12$ | $0{,}5;\ 0{,}2311;\ 0{,}1135;\ 0{,}0565$ | $0{,}7864;\ 0{,}9485;\ 0{,}9872;\ 0{,}9968$ | $\approx0{,}0459$ |
| $2$ | $2;\ 1{,}9281;\ 1{,}9172;\ 1{,}9154$ | $0{,}0707;\ 0{,}0811;\ 0{,}0828;\ 0{,}0831$ | $\approx0{,}00063$ |

**Diễn giải.** Với $\gamma=2$, chuỗi tuyến tính cho độ nhạy $16$, còn chuỗi tanh cho $0{,}00063$: tiền kích hoạt gần $2$ ở mọi lớp đưa tanh vào vùng bão hòa, và bốn thừa số $\approx0{,}08$ thắng bốn thừa số $2$. Với $\gamma=\tfrac12$, tiền kích hoạt nhỏ dần, tanh gần tuyến tính, và độ nhạy $0{,}0459$ gần giá trị $\tfrac1{16}=0{,}0625$ của chuỗi tuyến tính.

**Kiểm tra lại.** Với $\gamma=2$: $2^4\cdot0{,}0707\cdot0{,}0811\cdot0{,}0828\cdot0{,}0831\approx16\cdot3{,}95\cdot10^{-5}\approx6{,}3\cdot10^{-4}$.
:::

![Đồ thị tanh z (đường tăng từ −1 tới 1, phẳng dần ở hai phía) và đạo hàm 1 − tanh² z (đường hình chuông, đỉnh 1 tại z = 0, gần 0 tại z = 3, giá trị khoảng 0,00987).](img/lec-05/tanh-saturation.svg)

Hình đặt $\tanh z$ cạnh đạo hàm của nó. Gần $z=0$, đồ thị $\tanh$ gần đường thẳng $z$ và đạo hàm gần $1$; khi $\lvert z\rvert$ tăng tới $3$, đồ thị phẳng ra và đạo hàm gần $0$, đúng thừa số $\phi'(z^{(k)})$ nhỏ của (4.2) ở hàng $\gamma=2$ trong bảng của Ví dụ 05.26.

::: remark Nhận xét 05.33 (Vùng gần tuyến tính và căn cứ của mô hình tuyến tính)
**Hai yêu cầu ngược chiều.** Trọng số lớn làm thừa số $\gamma_k$ lớn nhưng đẩy tiền kích hoạt vào vùng bão hòa; trọng số nhỏ giữ tanh gần tuyến tính nhưng làm tín hiệu co. Mục 4.4 xác định thang này (Định nghĩa 05.36).

**Mô hình tuyến tính.** Gần $z=0$, khai triển $\tanh z=z-\tfrac{z^3}3+\cdots$ cho $\tanh z\approx z$ và $\phi'\approx1$. Khi tiền kích hoạt nằm gần $0$, một lớp tanh xấp xỉ một lớp tuyến tính, và phép tính thang có thể thực hiện trên mô hình tuyến tính. Đây là căn cứ của Mục 4.4, với điều kiện cần kiểm: mô hình không bảo đảm mọi đơn vị thực tế ở trong vùng đó.

**Phóng đại.** Khi tích (4.2) phóng đại, gradient rất lớn xuất hiện ở một số vùng tham số, tương ứng các vách dốc (cliff) trên mặt mất mát. Một bước gradient tại đó có thể đẩy tham số đi rất xa; Goodfellow, Bengio và Courville (2016, mục 8.2.4–8.2.5, tr. 288–290) mô tả hiện tượng này. Kỹ thuật cắt gradient xử lý hiện tượng này nằm ngoài phạm vi chương.
:::

**Trong học máy.** Đối tượng của Mệnh đề 05.32 là chuỗi các lớp mà gradient đi qua khi truyền ngược trong một mạng sâu, với $\gamma_k$ ứng với trọng số và $\phi'(z^{(k)})$ ứng với đạo hàm hàm kích hoạt tại tiền kích hoạt thật. Giả thiết chuỗi vô hướng không rẽ nhánh bị vi phạm ở mạng thật, nơi mỗi lớp là một ma trận; khi đó tích (4.2) thành tích các ma trận Jacobian, và độ lớn của nó do các giá trị kỳ dị (singular value) quyết định. Kết luận vẫn giải thích hiện tượng gradient tiêu biến hoặc bùng nổ (vanishing/exploding gradient) theo độ sâu, và cho biết phải kiểm cả thang trọng số lẫn vùng hoạt động của hàm kích hoạt.

::: exercise Bài tập 05.7
**Dữ kiện.** Chuỗi vô hướng $h^{(k)}=\phi(\gamma_kh^{(k-1)})$, $k=1,\ldots,M$, với tiền kích hoạt $z^{(k)}=\gamma_kh^{(k-1)}$. Độ nhạy (4.2): $\frac{\partial h^{(M)}}{\partial h^{(0)}}=\prod_{k=1}^M\gamma_k\phi'(z^{(k)})$.

Chuỗi $M=10$ lớp vô hướng với đầu vào $h^{(0)}=1$.

- (a) Với hàm đồng nhất và mọi $\gamma_k=0{,}9$, tính độ nhạy $\partial h^{(10)}/\partial h^{(0)}$.
- (b) Với cùng hệ số, tìm số lớp nhỏ nhất để độ nhạy nhỏ hơn $0{,}01$.
- (c) Thay hàm đồng nhất bằng ReLU, giữ $\gamma_k=0{,}9$ ở mọi lớp trừ lớp đầu, nơi $\gamma_1=-0{,}9$. Tính độ nhạy theo (4.2), với quy ước ReLU có đạo hàm $0$ khi $z<0$, và giải thích.
:::

::: hint
Ở (b), giải $0{,}9^M<0{,}01$ bằng logarit. Ở (c), xét dấu của $z^{(1)}$.
:::

::: solution
**Câu (a).**

$0{,}9^{10}\approx0{,}349$.

**Câu (b).**

$0{,}9^M<0{,}01$ tương đương $M>\tfrac{\log100}{\log(1/0{,}9)}$. Vế phải bằng $\tfrac{4{,}605}{0{,}1054}\approx43{,}7$, nên $M=44$.

**Câu (c).**

$z^{(1)}=-0{,}9\cdot1<0$, nên $h^{(1)}=0$ và $\phi'(z^{(1)})=0$. Thừa số đầu của (4.2) bằng $0$, nên độ nhạy bằng $0$: mọi thay đổi nhỏ của đầu vào không tới được đầu ra. Đơn vị có tiền kích hoạt âm trên mọi dữ liệu không truyền gradient, một dạng tiêu biến khác với bão hòa của tanh.

**Kiểm tra lại.**

$0{,}9^{43}\approx0{,}0108>0{,}01$ và $0{,}9^{44}\approx0{,}0097<0{,}01$. Ở (c), các lớp sau có $z^{(k)}=0{,}9\cdot0=0$, nên kết luận không phụ thuộc quy ước đạo hàm tại $0$ của các lớp đó.
:::

### 4.4 Phương sai qua lớp tuyến tính và khởi tạo Glorot

Ở chuỗi vô hướng, độ lớn của một lớp là một hệ số cố định. Khi trọng số được lấy ngẫu nhiên theo Mệnh đề 05.31, độ lớn của tín hiệu sau một lớp là một biến ngẫu nhiên, và đại lượng tự nhiên để đo nó là phương sai. Câu hỏi của phần này là chọn phương sai $s^2$ của trọng số thế nào để phương sai tín hiệu không co, không phóng đại qua lớp, cả chiều tiến lẫn chiều lùi.

Mô hình phân tích: một lớp tuyến tính $z=Wh$, với $h\in\mathbb R^{n_{\rm in}}$ là đầu vào, $W\in\mathbb R^{n_{\rm out}\times n_{\rm in}}$ là ma trận trọng số và $z\in\mathbb R^{n_{\rm out}}$ là đầu ra; $n_{\rm in}$ và $n_{\rm out}$ là số đơn vị, còn gọi là độ rộng, ở hai phía. Theo Nhận xét 05.33, mô hình này xấp xỉ một lớp tanh khi tiền kích hoạt nhỏ.

::: example Ví dụ 05.27 (Lớp bốn đầu vào)
**Dữ kiện.** $n_{\rm in}=4$; các trọng số $W_{ji}$ độc lập, trung bình $0$, phương sai $s^2$, độc lập với $h$; các $h_i$ có trung bình $0$ và cùng phương sai $V_h$.

**Một đầu ra.** $z_j=W_{j1}h_1+W_{j2}h_2+W_{j3}h_3+W_{j4}h_4$. Mỗi số hạng có trung bình $\mathbb EW_{ji}\,\mathbb Eh_i=0$ và phương sai $\mathbb E[W_{ji}^2]\,\mathbb E[h_i^2]=s^2V_h$. Nếu các số hạng không tương quan, $\operatorname{Var}z_j=4s^2V_h$.

**Hai lựa chọn.** $s^2=1$ cho $\operatorname{Var}z_j=4V_h$: phương sai tăng bốn lần qua lớp. $s^2=\tfrac14$ cho đúng $V_h$.

**Kiểm tra lại.** Với $h_i\in\{-1,1\}$ đồng khả năng và $W_{ji}\in\{-s,s\}$ đồng khả năng, mỗi tích $W_{ji}h_i$ nhận $\pm s$, có phương sai $s^2$, và $V_h=1$.
:::

![Lớp tuyến tính bốn đầu vào h₁, …, h₄ và hai đầu ra z₁, z₂; mỗi đầu vào nối với mỗi đầu ra bằng một cạnh mang trọng số W_ji; mũi tên chỉ chiều truyền xuôi qua W.](img/lec-05/variance-forward.svg)

Hình vẽ lớp $4\to2$ của Ví dụ 05.27: mỗi đầu ra $z_j$ nhận đúng bốn cạnh, mỗi cạnh mang một trọng số $W_{ji}$. Số cạnh đi vào một đầu ra là $n_{\rm in}$, cũng là số số hạng của tổng trong công thức phương sai sắp phát biểu; theo chiều ngược, số cạnh đi vào một đầu vào là $n_{\rm out}$.

Ví dụ dùng giả thiết "các số hạng không tương quan" mà chưa chứng minh. Mệnh đề sau chứng minh nó từ tính độc lập của trọng số, kể cả khi các thành phần của $h$ tương quan với nhau.

::: proposition Mệnh đề 05.34 (Phương sai chiều tiến qua một lớp tuyến tính)
**Giả thiết.** $z=Wh$ với $W\in\mathbb R^{n_{\rm out}\times n_{\rm in}}$. Các phần tử $W_{ji}$ độc lập, trung bình $0$, phương sai $s^2$. Ma trận $W$ độc lập với vectơ $h$. Mỗi $h_i$ có trung bình $0$ và phương sai $V_h>0$.

**Kết luận.** Với mọi $j$: $\mathbb Ez_j=0$ và

$$
\operatorname{Var}z_j=n_{\rm in}\,s^2\,V_h .
\tag{4.3}
$$

Ngoài ra $\operatorname{Cov}(z_j,z_{j'})=0$ khi $j\ne j'$.

**Điều kiện áp dụng.** Không cần các $h_i$ độc lập với nhau.

**Phạm vi.** Đây là phát biểu về phân phối theo phép lấy trọng số; nó không khẳng định một ma trận cụ thể giữ đúng phương sai.
:::

::: proof Chứng minh Mệnh đề 05.34
**Bước 1 (trung bình).**

$z_j=\sum_iW_{ji}h_i$, và mỗi số hạng có $\mathbb E[W_{ji}h_i]=\mathbb EW_{ji}\,\mathbb Eh_i=0$ vì $W$ độc lập với $h$.

**Bước 2 (phương sai từng số hạng).**

$\mathbb E[(W_{ji}h_i)^2]=\mathbb E[W_{ji}^2]\,\mathbb E[h_i^2]=s^2V_h$, cũng do độc lập và do hai biến có trung bình $0$.

**Bước 3 (hạng chéo).**

Với $i\ne i'$: $\mathbb E[W_{ji}h_iW_{ji'}h_{i'}]=\mathbb E[W_{ji}W_{ji'}]\,\mathbb E[h_ih_{i'}]$, và $\mathbb E[W_{ji}W_{ji'}]=\mathbb EW_{ji}\,\mathbb EW_{ji'}=0$. Hạng chéo bằng $0$ bất kể $\mathbb E[h_ih_{i'}]$.

**Bước 4 (cộng).**

$\operatorname{Var}z_j=\mathbb E[z_j^2]$ là tổng của $n_{\rm in}$ số hạng của Bước 2 và các hạng chéo của Bước 3, bằng $n_{\rm in}s^2V_h$. Với $j\ne j'$, $\mathbb E[z_jz_{j'}]=\sum_{i,i'}\mathbb E[W_{ji}W_{j'i'}]\mathbb E[h_ih_{i'}]=0$ vì hai phần tử ở hai hàng khác nhau độc lập, trung bình $0$. $\square$
:::

Công thức (4.3) nói rằng mỗi lớp nhân phương sai với hệ số $n_{\rm in}s^2$, gọi là hệ số phương sai chiều tiến. Giữ phương sai qua lớp cần $s^2=\tfrac1{n_{\rm in}}$: lớp càng nhiều đầu vào, trọng số càng phải nhỏ, vì mỗi đầu ra cộng nhiều số hạng hơn. Kết quả song song với Định lý 05.11: cả hai là phương sai của một tổng các số hạng không tương quan, chỉ khác ở chỗ số số hạng là $b$ ở gradient nhóm và $n_{\rm in}$ ở đây.

Bước cập nhật dùng gradient, và gradient đi qua cùng ma trận $W$ theo chiều ngược lại. Mệnh đề sau tính phương sai của nó.

::: proposition Mệnh đề 05.35 (Truyền ngược qua một lớp và phương sai chiều lùi)
**Giả thiết.** Mất mát vô hướng $\ell$ khả vi, phụ thuộc $h$ qua $z=Wh$. Đặt $\delta_z=\nabla_z\ell\in\mathbb R^{n_{\rm out}}$ và $\delta_h=\nabla_h\ell\in\mathbb R^{n_{\rm in}}$, với $W$ giữ cố định khi lấy đạo hàm.

**Kết luận.**

- (a) $\delta_h=W^T\delta_z$, tức $\delta_{h,i}=\sum_{j=1}^{n_{\rm out}}W_{ji}\delta_{z,j}$.
- (b) Nếu thêm: các $W_{ji}$ như Mệnh đề 05.34; $\delta_z$ độc lập với toàn bộ $W$; mỗi $\delta_{z,j}$ có trung bình $0$ và phương sai $V_\delta>0$; thì

$$
\operatorname{Var}\delta_{h,i}=n_{\rm out}\,s^2\,V_\delta .
\tag{4.4}
$$

**Điều kiện áp dụng.** Phần (a) là đẳng thức của quy tắc dây chuyền, luôn đúng. Phần (b) cần giả thiết độc lập giữa $\delta_z$ và $W$.

**Phạm vi.** Giả thiết $\delta_z$ độc lập với $W$ là đơn giản hóa của mô hình phân tích; trong mạng thật, gradient và trọng số phụ thuộc nhau.
:::

::: proof Chứng minh Mệnh đề 05.35
**Bước 1 (phần a).**

$h_i$ ảnh hưởng tới $\ell$ qua mọi $z_j$, với $\partial z_j/\partial h_i=W_{ji}$. Quy tắc dây chuyền cho $\partial\ell/\partial h_i=\sum_j\tfrac{\partial\ell}{\partial z_j}W_{ji}$, tức $\delta_{h,i}=\sum_jW_{ji}\delta_{z,j}$; gom theo $i$ được $\delta_h=W^T\delta_z$.

**Bước 2 (phần b).**

Tổng $\sum_jW_{ji}\delta_{z,j}$ có cùng cấu trúc với $z_j=\sum_iW_{ji}h_i$, với vai trò của $h$ do $\delta_z$ đảm nhận và tổng chạy trên cột $i$ của $W$ thay vì hàng $j$. Các bước 1–4 của chứng minh Mệnh đề 05.34 áp dụng nguyên văn, với $n_{\rm out}$ số hạng thay cho $n_{\rm in}$, cho (4.4). $\square$
:::

Phần (a) là truyền ngược qua một lớp tuyến tính: gradient theo đầu vào bằng chuyển vị của ma trận trọng số nhân gradient theo đầu ra. Phần (b) cho hệ số phương sai chiều lùi $n_{\rm out}s^2$. Giữ phương sai chiều lùi cần $s^2=\tfrac1{n_{\rm out}}$; khi $n_{\rm in}\ne n_{\rm out}$, không giá trị $s^2$ nào giữ được cả hai chiều. Với lớp $4\to2$ của hình ở Ví dụ 05.27, $s^2=\tfrac14$ cho hệ số tiến $1$ và hệ số lùi $\tfrac12$, còn $s^2=\tfrac12$ cho $2$ và $1$: giữ chiều này thì chiều kia co hoặc phóng đại hai lần.

Vì không thể giữ đồng thời hai chiều, cần một giá trị thỏa hiệp. Glorot và Bengio (2010) chọn giá trị làm trung bình cộng của hai hệ số bằng $1$.

::: definition Định nghĩa 05.36 (Khởi tạo Glorot)
Với lớp có $n_{\rm in}$ đầu vào và $n_{\rm out}$ đầu ra, khởi tạo Glorot (còn gọi là khởi tạo Xavier) lấy các trọng số độc lập, trung bình $0$, với phương sai

$$
s^2=\frac2{n_{\rm in}+n_{\rm out}} .
\tag{4.5}
$$

Dạng đều của quy tắc lấy $W_{ji}\sim U[-\alpha,\alpha]$, phân phối đều trên đoạn $[-\alpha,\alpha]$, với $\alpha=\sqrt{\tfrac6{n_{\rm in}+n_{\rm out}}}$.
:::

Công thức (4.5) lấy nghịch đảo của số kết nối trung bình $\tfrac{n_{\rm in}+n_{\rm out}}2$. Khi $n_{\rm in}=n_{\rm out}=n$, nó trùng cả hai yêu cầu $\tfrac1n$. Quy tắc chỉ định phương sai; để lấy mẫu cần thêm một phân phối, và biên $\alpha$ của dạng đều được chọn để phân phối đều có đúng phương sai (4.5), như mệnh đề sau chứng minh.

::: proposition Mệnh đề 05.37 (Tính chất của khởi tạo Glorot)
**Giả thiết.** Lớp $n_{\rm in}\to n_{\rm out}$, $s^2$ theo (4.5). Hệ số tiến là $n_{\rm in}s^2$, hệ số lùi là $n_{\rm out}s^2$.

**Kết luận.**

- (a) Trung bình hai hệ số bằng $1$: $\tfrac12(n_{\rm in}s^2+n_{\rm out}s^2)=1$, và (4.5) là giá trị duy nhất của $s^2$ có tính chất này.
- (b) $s^2$ nằm giữa $\tfrac1{n_{\rm in}}$ và $\tfrac1{n_{\rm out}}$; một trong hai hệ số không nhỏ hơn $1$, hệ số kia không lớn hơn $1$.
- (c) Tích hai hệ số bằng $\tfrac{4n_{\rm in}n_{\rm out}}{(n_{\rm in}+n_{\rm out})^2}$, không vượt $1$, với dấu bằng khi và chỉ khi $n_{\rm in}=n_{\rm out}$.
- (d) Phân phối $U[-\alpha,\alpha]$ có trung bình $0$ và phương sai $\tfrac{\alpha^2}3$; với $\alpha=\sqrt{6/(n_{\rm in}+n_{\rm out})}$, phương sai bằng (4.5).

**Điều kiện áp dụng.** Mô hình tuyến tính của Mệnh đề 05.34 và 05.35.

**Phạm vi.** Tính chất (a) là một tiêu chí thỏa hiệp, không phải nghiệm của một bài tối ưu được nêu trước; một tiêu chí khác, như cực tiểu tổng bình phương độ lệch của hai hệ số khỏi $1$, cho giá trị $s^2$ khác.
:::

::: proof Chứng minh Mệnh đề 05.37
**Bước 1 (phần a).**

Tổng hai hệ số là $(n_{\rm in}+n_{\rm out})s^2$, nên trung bình bằng $1$ khi và chỉ khi $s^2=\tfrac2{n_{\rm in}+n_{\rm out}}$.

**Bước 2 (phần b).**

Giả sử $n_{\rm in}\le n_{\rm out}$. Khi đó $2n_{\rm in}\le n_{\rm in}+n_{\rm out}\le2n_{\rm out}$, nên $\tfrac1{n_{\rm out}}\le\tfrac2{n_{\rm in}+n_{\rm out}}\le\tfrac1{n_{\rm in}}$. Nhân với $n_{\rm in}$ và với $n_{\rm out}$: $n_{\rm in}s^2\le1$ và $n_{\rm out}s^2\ge1$. Trường hợp ngược lại đối xứng.

**Bước 3 (phần c).**

Tích hai hệ số là $n_{\rm in}n_{\rm out}s^4=\tfrac{4n_{\rm in}n_{\rm out}}{(n_{\rm in}+n_{\rm out})^2}$. Bất đẳng thức $4n_{\rm in}n_{\rm out}\le(n_{\rm in}+n_{\rm out})^2$ tương đương $(n_{\rm in}-n_{\rm out})^2\ge0$, với dấu bằng khi và chỉ khi $n_{\rm in}=n_{\rm out}$.

**Bước 4 (phần d).**

Mật độ của $U[-\alpha,\alpha]$ là $\tfrac1{2\alpha}$ trên đoạn. Trung bình bằng $0$ do đối xứng. Phương sai:

$$
\int_{-\alpha}^{\alpha}\frac{\varsigma^2}{2\alpha}\,d\varsigma=\frac1{2\alpha}\cdot\frac{2\alpha^3}3=\frac{\alpha^2}3 .
$$

Với $\alpha^2=\tfrac6{n_{\rm in}+n_{\rm out}}$, phương sai bằng $\tfrac2{n_{\rm in}+n_{\rm out}}$. $\square$
:::

Khi hai độ rộng khác nhau, Glorot làm một chiều tăng và chiều kia giảm, với trung bình đúng bằng $1$ và tích không vượt $1$.

::: example Ví dụ 05.28 (Glorot cho lớp $4\to2$)
**Dữ kiện.** Khởi tạo Glorot: $s^2=\frac2{n_{\rm in}+n_{\rm out}}$ (4.5), dạng đều $U[-\alpha,\alpha]$ với $\alpha=\sqrt{6/(n_{\rm in}+n_{\rm out})}$ (Định nghĩa 05.36); hệ số tiến $n_{\rm in}s^2$, hệ số lùi $n_{\rm out}s^2$, tích hai hệ số $\frac{4n_{\rm in}n_{\rm out}}{(n_{\rm in}+n_{\rm out})^2}$ (Mệnh đề 05.37(c)). Ở đây $n_{\rm in}=4$, $n_{\rm out}=2$.

**Tính.** $s^2=\tfrac2{4+2}=\tfrac13$ và $\alpha=\sqrt{6/6}=1$, nên $W_{ji}\sim U[-1,1]$.

**Hai hệ số.** Hệ số tiến $4\cdot\tfrac13=\tfrac43$ và hệ số lùi $2\cdot\tfrac13=\tfrac23$: phương sai tiến tăng một phần ba, phương sai lùi giảm một phần ba.

**Kiểm tra lại.** Trung bình hai hệ số là $\tfrac12(\tfrac43+\tfrac23)=1$; tích là $\tfrac89$, đúng bằng $\tfrac{4\cdot4\cdot2}{36}$ theo Mệnh đề 05.37(c); phương sai của $U[-1,1]$ là $\tfrac13$.
:::

Công thức (4.3) áp dụng liên tiếp cho phép tính hệ quả của một lựa chọn $s^2$ qua nhiều lớp. Mệnh đề sau làm điều đó dưới giả thiết các lớp độc lập.

::: proposition Mệnh đề 05.38 (Phương sai qua nhiều lớp tuyến tính)
**Giả thiết.** Các độ rộng $n_0,n_1,\ldots,n_M$; $h^{(k)}=W^{(k)}h^{(k-1)}$ với $W^{(k)}\in\mathbb R^{n_k\times n_{k-1}}$, $k=1,\ldots,M$. Các ma trận $W^{(1)},\ldots,W^{(M)}$ độc lập nhau và độc lập với $h^{(0)}$; trong mỗi ma trận, các phần tử độc lập, trung bình $0$, phương sai $s_k^2$. Mỗi thành phần của $h^{(0)}$ có trung bình $0$ và phương sai $V^{(0)}>0$.

**Kết luận.** Mỗi thành phần của $h^{(k)}$ có trung bình $0$ và phương sai

$$
V^{(k)}=n_{k-1}s_k^2\,V^{(k-1)},\qquad V^{(M)}=V^{(0)}\prod_{k=1}^Mn_{k-1}s_k^2 .
\tag{4.6}
$$

**Điều kiện áp dụng.** Mạng tuyến tính, các lớp độc lập.

**Phạm vi.** (4.6) là phép tính trong mô hình; nó không phải số đo trên một mạng cụ thể.
:::

::: proof Chứng minh Mệnh đề 05.38
**Bước 1 (độc lập giữa lớp và đầu vào của nó).**

$h^{(k-1)}$ là hàm của $h^{(0)},W^{(1)},\ldots,W^{(k-1)}$, nên độc lập với $W^{(k)}$ theo giả thiết.

**Bước 2 (quy nạp).**

Với $k=1$, Mệnh đề 05.34 cho $V^{(1)}=n_0s_1^2V^{(0)}$ và trung bình $0$. Nếu mỗi thành phần của $h^{(k-1)}$ có trung bình $0$ và phương sai $V^{(k-1)}$, thì cùng với Bước 1, mọi giả thiết của Mệnh đề 05.34 thỏa cho lớp $k$, nên mỗi thành phần của $h^{(k)}$ có trung bình $0$ và phương sai $n_{k-1}s_k^2V^{(k-1)}$.

**Bước 3 (tích).**

Lặp đẳng thức của Bước 2 từ $k=1$ tới $M$ được dạng tích của (4.6). $\square$
:::

::: example Ví dụ 05.29 (Ba lớp rộng 4)
**Dữ kiện.** $M=3$, mọi độ rộng $n_0,\ldots,n_3$ bằng $4$, $V^{(0)}=1$, cùng $s^2$ ở mọi lớp. Theo (4.6), $V^{(k)}=(4s^2)^k$.

**Hai lựa chọn.**

| $s^2$ | $V^{(0)}$ | $V^{(1)}$ | $V^{(2)}$ | $V^{(3)}$ |
|---|---|---|---|---|
| $\tfrac1{16}$ | $1$ | $\tfrac14$ | $\tfrac1{16}$ | $\tfrac1{64}$ |
| $\tfrac14$ | $1$ | $1$ | $1$ | $1$ |

**Diễn giải.** $s^2=\tfrac1{16}$ làm phương sai co bốn lần mỗi lớp; $s^2=\tfrac14$, trùng Glorot cho lớp $4\to4$, giữ nguyên. Với $M=20$ lớp, lựa chọn đầu cho $4^{-20}\approx9\cdot10^{-13}$.

**Kiểm tra lại.** $4\cdot\tfrac1{16}=\tfrac14$ và $(\tfrac14)^3=\tfrac1{64}$.
:::

::: remark Nhận xét 05.39 (Giới hạn của phép suy tuyến tính)
**ReLU.** Với $z$ có phân phối đối xứng quanh $0$, $\phi(z)^2=z^2\mathbf 1\{z>0\}$ khi $\phi$ là ReLU, với $\mathbf 1\{z>0\}$ là hàm chỉ thị bằng $1$ khi $z>0$ và bằng $0$ khi ngược lại; nên $\mathbb E[\phi(z)^2]=\tfrac12\mathbb Ez^2$, vì hai nửa $z>0$ và $z<0$ đóng góp như nhau. Kích hoạt ReLU vì vậy có trung bình dương và mômen bậc hai bằng nửa phương sai của tiền kích hoạt. Áp dụng (4.3) cho mômen bậc hai, hệ số chiều tiến của một lớp ReLU là $\tfrac{n_{\rm in}s^2}2$ thay cho $n_{\rm in}s^2$, nên với Glorot và $n_{\rm in}=n_{\rm out}$, mômen bậc hai giảm một nửa qua mỗi lớp. Quy tắc điều chỉnh cho ReLU của He và cộng sự (2015) nằm ngoài phạm vi chương.

**Giả thiết độc lập.** Mệnh đề 05.35(b) giả sử $\delta_z$ độc lập với $W$; trong mạng thật, $\delta_z$ được tính từ chính các trọng số của các lớp sau và từ dữ liệu. Phép suy cho thang hợp lý tại thời điểm khởi tạo, không cho bảo đảm trong lúc huấn luyện.

**Điều cần đo.** Khi vận hành, các đại lượng cần kiểm trên một nhóm dữ liệu tại $\theta_0$ là độ lệch chuẩn của kích hoạt và của gradient theo từng lớp, cùng sự xuất hiện của giá trị không hữu hạn. Glorot là điểm xuất phát có căn cứ, không phải chứng nhận rằng thang đã đúng (Goodfellow, Bengio và Courville 2016, mục 8.4, tr. 303–305).
:::

**Trong học máy.** Đối tượng của Mệnh đề 05.34, 05.35 và Định nghĩa 05.36 là ma trận trọng số của một lớp kết nối đầy đủ, với $n_{\rm in}$, $n_{\rm out}$ là số đơn vị của hai lớp kề nhau. Các giả thiết tuyến tính, trung bình $0$ và độc lập đều bị vi phạm ở mạng thật: hàm kích hoạt phi tuyến, kích hoạt ReLU có trung bình dương, gradient phụ thuộc trọng số. Kết luận vẫn cho phép làm một việc cụ thể: chọn thang ban đầu sao cho tín hiệu và gradient không co hay phóng đại theo cấp số mũ của độ sâu, như Ví dụ 05.29 tính. Một số thư viện, chẳng hạn Keras, dùng dạng đều của (4.5) làm khởi tạo mặc định cho lớp kết nối đầy đủ, không phụ thuộc hàm kích hoạt; thư viện khác dùng thang khác.

::: exercise Bài tập 05.8
**Dữ kiện.** Khởi tạo Glorot như ở Ví dụ 05.28: $s^2=\frac2{n_{\rm in}+n_{\rm out}}$ (4.5), dạng đều $U[-\alpha,\alpha]$ với $\alpha=\sqrt{6/(n_{\rm in}+n_{\rm out})}$ (Định nghĩa 05.36); hệ số tiến $n_{\rm in}s^2$, hệ số lùi $n_{\rm out}s^2$, tích hai hệ số $\frac{4n_{\rm in}n_{\rm out}}{(n_{\rm in}+n_{\rm out})^2}$ (Mệnh đề 05.37(c)).

Một lớp tuyến tính được khởi tạo theo Glorot trong mô hình của Mệnh đề 05.34 và 05.35. Lớp có $n_{\rm out}=100$ đầu ra, và hệ số tiến cho trước là $n_{\rm in}s^2=1{,}5$.

- (a) Tìm $n_{\rm in}$, $s^2$, biên $\alpha$ của dạng đều và hệ số lùi.
- (b) Kiểm Mệnh đề 05.37(c) trên lớp này. Nếu dùng phân phối chuẩn thay cho phân phối đều, nêu độ lệch chuẩn cần dùng.
- (c) Tìm $s^2$ cực tiểu $(n_{\rm in}s^2-1)^2+(n_{\rm out}s^2-1)^2$ và so với Glorot.
:::

::: hint
Với Glorot, $n_{\rm in}s^2=\tfrac{2n_{\rm in}}{n_{\rm in}+n_{\rm out}}$. Ở (c), lấy đạo hàm theo $s^2$.
:::

::: solution
**Câu (a).**

Phương trình $\tfrac{2n_{\rm in}}{n_{\rm in}+100}=1{,}5$ cho $2n_{\rm in}=1{,}5n_{\rm in}+150$, tức $n_{\rm in}=300$. Khi đó:

- $s^2=\tfrac2{400}=0{,}005$;
- $\alpha=\sqrt{6/400}\approx0{,}122$;
- hệ số lùi $100\cdot0{,}005=0{,}5$.

**Câu (b).**

Tích hai hệ số là $1{,}5\cdot0{,}5=0{,}75$, và công thức của Mệnh đề 05.37(c) cho $\tfrac{4\cdot300\cdot100}{400^2}=0{,}75$. Phân phối chuẩn $\mathcal N(0,s^2)$ có độ lệch chuẩn $\sqrt{0{,}005}\approx0{,}0707$.

**Câu (c).**

Đạo hàm theo $s^2$ của $(300s^2-1)^2+(100s^2-1)^2$ là $600(300s^2-1)+200(100s^2-1)$. Biểu thức này bằng $0$ khi $200000s^2=800$, tức $s^2=0{,}004$. Giá trị này nhỏ hơn $0{,}005$ của Glorot: hai tiêu chí cho hai thang khác nhau.

**Kiểm tra lại.**

Với $n_{\rm in}=300$: $300\cdot0{,}005=1{,}5$, khớp dữ kiện; trung bình hai hệ số $\tfrac12(1{,}5+0{,}5)=1$. Với $s^2=0{,}004$: hai hệ số là $1{,}2$ và $0{,}4$, tổng bình phương độ lệch $0{,}04+0{,}36=0{,}40$, nhỏ hơn $0{,}25+0{,}25=0{,}50$ của Glorot.
:::

**Chuỗi suy luận của mục.**

1. Định nghĩa 05.25 và Mệnh đề 05.26 dựng mạng hai đơn vị và gradient của nó.
2. Định nghĩa 05.27, Định lý 05.28 và Hệ quả 05.29 chứng minh đối xứng được bảo toàn và giới hạn sức biểu diễn; Mệnh đề 05.31 cho cách phá đối xứng bằng trọng số ngẫu nhiên liên tục.
3. Mệnh đề 05.32 và Ví dụ 05.25, 05.26 chỉ ra độ lớn trọng số quyết định gradient qua nhiều lớp, theo hai cơ chế ngược chiều.
4. Mệnh đề 05.34, 05.35 cho hệ số phương sai tiến $n_{\rm in}s^2$ và lùi $n_{\rm out}s^2$; Định nghĩa 05.36 và Mệnh đề 05.37 cho thỏa hiệp Glorot; Mệnh đề 05.38 cho hệ quả qua nhiều lớp.

Đích của mục là hai yêu cầu đối với $\theta_0$: trọng số đôi một khác nhau, và phương sai $s^2$ giữ hai hệ số truyền phương sai gần $1$.

**Kết mục.** Mục này cho hai điều kiện riêng biệt đối với điểm đầu: phá đối xứng (Định lý 05.28, Mệnh đề 05.31) và chọn thang (Định nghĩa 05.36, Mệnh đề 05.37, 05.38). Mỗi điều kiện có giả thiết riêng, và thang Glorot dựa trên một mô hình tuyến tính với các giả thiết độc lập bị vi phạm ở mạng thật (Nhận xét 05.39). Với các kết quả của Mục 1–4, mọi thành phần của một quy trình huấn luyện đã có căn cứ; Mục 5 đặt chúng lại theo thứ tự chạy của chương trình và chỉ ra mỗi kiểm tra chứng nhận điều gì.

## 5. Phối hợp các thành phần của quy trình huấn luyện

Mục 1–4 xây bốn quyết định theo thứ tự phân tích: đại lượng cần cực tiểu và tiêu chí chọn, nguồn gradient, quy tắc cập nhật, điểm đầu. Khi chạy chương trình, thứ tự khác: khởi tạo diễn ra trước mọi bước cập nhật. Một phiên huấn luyện cụ thể cho thấy cần phối hợp các quyết định: tập huấn luyện có $N=2\cdot10^5$ quan sát; ngân sách mỗi vòng cho phép tối đa $256$ gradient mẫu; lớp ẩn $784\to128$ và lớp ra $128\to10$ được khởi tạo với mọi trọng số bằng $0{,}01$; và sau vài lần đánh giá, mất mát xác thực thôi giảm.

Mục này xếp các quyết định theo thứ tự chạy, nêu điều mà mỗi kiểm tra chứng nhận, rồi chẩn đoán phiên huấn luyện trên bằng các kết quả đã có.

### 5.1 Thứ tự chạy và bốn quyết định

Một quy trình huấn luyện gồm bốn khâu theo thứ tự: dữ liệu và mất mát xác định $J$; khởi tạo sinh $\theta_0$ và $v_0=0$; vòng lặp rút nhóm, tính gradient và cập nhật; đánh giá xác thực theo lịch định trước quyết định bản lưu và thời điểm dừng. Bảng sau gắn mỗi quyết định với mục xây dựng nó và đại lượng cần kiểm.

| Quyết định | Đối tượng | Kết quả căn cứ | Đại lượng cần kiểm |
|---|---|---|---|
| Đại lượng cực tiểu và tiêu chí chọn | $J$, $\widehat R_{\rm val}$ | Định nghĩa 05.1, 05.4; Mệnh đề 05.5 | khoảng cách $J$ và $\widehat R_{\rm val}$ |
| Nguồn gradient | $D$, $b$, $\widehat g_t$ | Định lý 05.11; Mệnh đề 05.14 | chi phí $bC$; tỷ số $\operatorname{tr}\Sigma/(b\lVert\nabla J\rVert_2^2)$ |
| Quy tắc cập nhật | $\theta_t$, $v_t$, $\eta$, $\beta$ | Định lý 05.21, 05.23 | độ ổn định theo $\eta L$; dao động của $J$ |
| Khởi tạo | $\theta_0$ | Định lý 05.28; Định nghĩa 05.36 | đối xứng; phương sai kích hoạt và gradient theo lớp |

Bốn hàng thay ba giả định ngầm của Bài 04 nêu ở đầu Mục 1. Hàng thứ nhất thay giả định "hàm cần cực tiểu đã được cho" bằng cặp $J$ và tiêu chí xác thực. Hàng thứ hai và thứ ba thay giả định "gradient đầy đủ tính được"; nguồn gradient được chọn tách rời quy tắc cập nhật, vì cả momentum lẫn Nesterov dùng được với gradient đầy đủ và gradient nhóm. Hàng cuối thay giả định "điểm đầu không ảnh hưởng".

::: remark Nhận xét 05.40 (Điều mà mỗi kiểm tra chứng nhận)
1. **$J$ giảm** chứng nhận bộ tối ưu tiến trên mất mát huấn luyện; nó không chứng nhận $R$ giảm (Mệnh đề 05.2, Nhận xét 05.3).
2. **$\lVert\nabla J\rVert_2$ nhỏ** chứng nhận gần một điểm dừng, có thể là điểm yên ngựa (Mệnh đề 05.8); $\lVert\widehat g\rVert_2$ còn chứa nhiễu $\operatorname{tr}\Sigma/b$ (Hệ quả 05.12(b)).
3. **$\widehat R_{\rm val}$ nhỏ nhất** quyết định bản lưu; giá trị của bản được chọn là ước lượng lạc quan của $R$ (Mệnh đề 05.5(b)).
4. **Mất mát kiểm thử** là ước lượng không chệch của $R$ tại bản cuối, với điều kiện tập kiểm thử chỉ dùng một lần (Mệnh đề 05.5(a)).
5. **Phương sai kích hoạt và gradient ổn định qua các lớp tại $\theta_0$** chứng nhận thang khởi tạo không gây co hay phóng đại theo cấp số mũ; nó không chứng nhận thuật toán sẽ hội tụ (Nhận xét 05.39).

Nhầm lẫn thường gặp là dùng một số đo cho kết luận của hàng khác, như coi $J$ thấp là bằng chứng mô hình tốt.
:::

**Trong học máy.** Các thư viện học sâu tách bốn khâu này thành bộ nạp dữ liệu, bộ tối ưu giữ $v_t$, hàm khởi tạo và vòng lặp có lịch đánh giá; Nhận xét 05.40 chỉ ra số đo nào trỏ tới khâu cần sửa.

### 5.2 Chẩn đoán một phiên huấn luyện

::: example Ví dụ 05.30 (Chẩn đoán và sửa một phiên huấn luyện)
**Dữ kiện.** Số liệu giả lập sư phạm.

- Tập huấn luyện $N=2\cdot10^5$; ngân sách mỗi vòng tối đa $256$ gradient mẫu.
- Ước lượng tại điểm hiện tại từ một nhóm thử lớn: $\lVert\nabla J\rVert_2^2\approx0{,}05$ và $\operatorname{tr}\Sigma\approx3{,}2$; bước học dùng $\eta=\tfrac1L$.
- Lớp ẩn $784\to128$ được khởi tạo với mọi trọng số bằng $0{,}01$ và mọi độ lệch bằng $0$; lớp ra $128\to10$ kế tiếp cũng có mọi trọng số bằng $0{,}01$, nên các cột của ma trận trọng số lớp ra bằng nhau.
- Quy tắc dừng sớm $K_{\rm stop}=3$, $\varepsilon=0{,}005$; giá trị tốt nhất ban đầu $0{,}700$; năm lần đánh giá cho $0{,}520$; $0{,}470$; $0{,}468$; $0{,}471$; $0{,}466$.

**Nguồn gradient.** Gradient đầy đủ cần $2\cdot10^5$ gradient mẫu, vượt ngân sách, nên dùng gradient nhóm. Theo (2.5), kỳ vọng của $J$ giảm tại điểm hiện tại khi $b>\tfrac{3{,}2}{0{,}05}=64$. Chọn $b=128$, trong ngân sách; sai số chuẩn tổng hợp $\sqrt{3{,}2/128}\approx0{,}158$, nhỏ hơn $\lVert\nabla J\rVert_2\approx0{,}224$.

**Khởi tạo.** Với mỗi cặp đơn vị của lớp ẩn, trọng số vào, độ lệch và trọng số ra tới mười đầu ra đều bằng nhau. Định lý 05.28 chứng minh cho hai đơn vị và một đầu ra; cùng lập luận quy nạp, với thừa số riêng của mỗi đơn vị là cột tương ứng của lớp ra, cho thấy $128$ đơn vị giữ bằng nhau qua mọi vòng, nên lớp ẩn hoạt động như một đơn vị và momentum không sửa được (Nhận xét 05.30). Sửa: lấy trọng số của cả hai lớp độc lập theo Glorot, độ lệch giữ bằng $0$.

- Lớp ẩn $784\to128$: $s^2=\tfrac2{784+128}\approx0{,}00219$, dạng đều với $\alpha=\sqrt{6/912}\approx0{,}0811$.
- Lớp ra $128\to10$: $s^2=\tfrac2{128+10}\approx0{,}0145$, dạng đều với $\alpha=\sqrt{6/138}\approx0{,}209$.

Lớp ẩn ngẫu nhiên đã đủ phá đối xứng giữa các đơn vị ẩn, vì trọng số vào của chúng khác nhau. Lớp ra cũng lấy theo Glorot để thang của nó thỏa giả thiết của Mệnh đề 05.34 và 05.35, điều mà trọng số hằng $0{,}01$ không bảo đảm.

**Dừng sớm.** Theo Thuật toán 05.1, hai lần đầu giảm hơn $\varepsilon$ nên bộ đếm về $0$; ba lần sau giảm không quá $\varepsilon$ hoặc không giảm, nên bộ đếm lên $3$. Thuật toán dừng sau lần 5 và trả về bản có $0{,}466$. Giá trị này lạc quan theo Mệnh đề 05.5(b); con số báo cáo lấy từ tập kiểm thử, đánh giá một lần.

**Kiểm tra lại.** $\sqrt{0{,}05}\approx0{,}224$; $\tfrac{3{,}2}{128}=0{,}025$ và $\sqrt{0{,}025}\approx0{,}158$; $\tfrac6{138}\approx0{,}0435$ và $\sqrt{0{,}0435}\approx0{,}209$.
:::

::: exercise Bài tập 05.9
Một nhóm báo cáo kết quả huấn luyện như sau, với số liệu giả lập.

1. Họ thử $50$ cặp (bước học, cỡ nhóm) và báo cáo mất mát xác thực nhỏ nhất $0{,}12$ như kết quả cuối của mô hình.
2. Tại điểm đầu, ước lượng $\operatorname{tr}\Sigma\approx12$ và $\lVert\nabla J\rVert_2^2\approx0{,}3$; họ dùng $b=16$ với $\eta=\tfrac1L$.

Với mỗi điểm, nêu vấn đề, kết quả của chương làm căn cứ, và cách sửa có số liệu.
:::

::: hint
Điểm 1 dùng Mệnh đề 05.5(b), tức (1.5): $\mathbb E[\widehat R_{\rm val}(\theta_{\widehat k})]\le\min_kR(\theta_k)\le\mathbb E[R(\theta_{\widehat k})]$. Điểm 2 dùng (2.4), $\mathbb EJ(\theta^+)\le J(\theta)-\eta\bigl(1-\frac{L\eta}2\bigr)\lVert\nabla J(\theta)\rVert_2^2+\frac{L\eta^2}2\cdot\frac{\operatorname{tr}\Sigma(\theta)}b$, và (2.5): với $\eta=\tfrac1L$, kỳ vọng của $J$ giảm khi $b>\frac{\operatorname{tr}\Sigma(\theta)}{\lVert\nabla J(\theta)\rVert_2^2}$.
:::

::: solution
**Điểm 1.**

Giá trị xác thực của cấu hình được chọn trong $50$ ứng viên là ước lượng lạc quan của rủi ro, theo Mệnh đề 05.5(b). Sửa: giữ một tập kiểm thử chưa dùng, đánh giá cấu hình được chọn một lần và báo cáo con số đó.

**Điểm 2.**

Ngưỡng (2.5) là $b>\tfrac{12}{0{,}3}=40$. Với $b=16$, Mệnh đề 05.14(c) cho $\mathbb EJ(\theta^+)\le J(\theta)-\tfrac1{2L}(0{,}3-0{,}75)$, tức không bảo đảm giảm, và cận cho phép $J$ tăng tới $\tfrac{0{,}45}{2L}$. Sửa: dùng $b\ge41$, hoặc giữ $b=16$ và giảm bước học; với $\eta<\tfrac1L$, điều kiện giảm theo kỳ vọng của (2.4) là $\tfrac{\operatorname{tr}\Sigma}b<\tfrac{2-L\eta}{L\eta}\lVert\nabla J\rVert_2^2$, cho $L\eta<\tfrac{2\cdot0{,}3}{0{,}75+0{,}3}\approx0{,}571$ khi $b=16$.

**Kiểm tra lại.**

Ở điểm 2, thay $L\eta=0{,}571$: vế phải $\tfrac{2-0{,}571}{0{,}571}\cdot0{,}3\approx0{,}751$, gần đúng bằng $\tfrac{12}{16}=0{,}75$, tức đúng ngưỡng.
:::

**Chuỗi suy luận của mục.** Mục không thêm định nghĩa hay định lý mới. Bảng ở Mục 5.1 sắp các kết quả của Mục 1–4 theo thứ tự chạy; Nhận xét 05.40 nêu phạm vi chứng nhận của từng số đo; Ví dụ 05.30 áp dụng (2.5), Định lý 05.28, Định nghĩa 05.36 và Thuật toán 05.1 vào một phiên cụ thể. Ví dụ đó kiểm ba trong bốn quyết định của bảng; quyết định còn lại, quy tắc cập nhật, được tính ở Tình huống 05.2.

**Kết mục.** Mục này cho một quy trình huấn luyện mà mỗi khâu có căn cứ và mỗi số đo có phạm vi chứng nhận rõ. Các giới hạn còn lại nằm ở giả thiết của từng kết quả: bảo đảm hội tụ chỉ có dưới giả thiết lồi hoặc gradient Lipschitz (Nhận xét 05.16), phân tích momentum chỉ chính xác trên hàm bậc hai, và thang Glorot dựa trên mô hình tuyến tính. Phần tình huống áp dụng dưới đây đặt ba bài toán cụ thể, trong đó một bài có giả thiết bị vi phạm, để đo các giới hạn đó bằng số.

## Tình huống áp dụng và ứng dụng

::: application Tình huống 05.1 (Chọn bước học và cỡ nhóm cho hồi quy logistic)
**Bài toán và dữ liệu.**

Tám bài đánh giá có đặc trưng $x_i$, số giờ ôn tập đã chuẩn hóa, và nhãn $y_i\in\{-1,+1\}$, với $+1$ là đạt (số liệu giả lập sư phạm). Bốn bài có $x=2$, cả bốn đạt; bốn bài có $x=1$, hai đạt và hai không đạt. Mô hình dự báo xác suất đạt là $\sigma(\theta x)$, với $\sigma$ là hàm sigmoid, $\sigma(\varsigma)=1/(1+\exp(-\varsigma))$ cho mọi số thực $\varsigma$, và $\theta\in\mathbb R$; mô hình không có hệ số chặn để mọi phép tính làm được bằng tay. Cần chọn bước học và cỡ nhóm cho SGD từ điểm đầu $\theta_0=0$.

**Mô hình hóa.**

Đặt $m_i=y_ix_i$, biên có dấu của Định nghĩa 01.8 tính theo $\theta=1$; tám giá trị là $2,2,2,2,1,1,-1,-1$. Mất mát huấn luyện là

$$
J(\theta)=\frac18\sum_{i=1}^8\log\bigl(1+\exp(-m_i\theta)\bigr),
$$

bài không ràng buộc trên $\mathbb R$. Gradient mẫu là $g_i(\theta)=-m_i\,\sigma(-m_i\theta)$.

**Kiểm giả thiết.**

1. Lồi: theo Mệnh đề 01.9(c), mỗi số hạng có đạo hàm bậc hai dương, nên $J$ lồi chặt.
2. Gradient Lipschitz: $J''(\theta)=\tfrac18\sum_im_i^2\sigma(m_i\theta)\sigma(-m_i\theta)$, và mỗi tích $\sigma(m_i\theta)\sigma(-m_i\theta)$ không vượt $\tfrac14$, nên $J''(\theta)\le\tfrac14\cdot\tfrac{20}8=0{,}625$; theo Nhận xét 04.19, $L=0{,}625$.
3. Tồn tại nghiệm: có biên dương và biên âm, nên $J(\theta)\to\infty$ khi $\theta\to\pm\infty$. Phương pháp Newton của Bài 04 cho $\theta^*\approx1{,}0120$ và $J(\theta^*)\approx0{,}47007$.
4. Gradient nhóm không chệch theo Định lý 05.11 với chỉ số rút đều, độc lập, có hoàn lại.

**Bước học.** $\eta=\tfrac1L=1{,}6$, giá trị của Bổ đề 04.20 và Mệnh đề 05.14(c).

**Cỡ nhóm tại điểm đầu.**

Tại $\theta=0$, $\sigma(0)=\tfrac12$ nên $g_i(0)=-\tfrac{m_i}2$: bốn giá trị $-1$, hai giá trị $-0{,}5$, hai giá trị $0{,}5$.

- Gradient đầy đủ: $J'(0)=\tfrac18(-4-1+1)=-0{,}5$.
- Phương sai gradient mẫu: $\Sigma(0)=\tfrac18(4\cdot1+4\cdot0{,}25)-0{,}25=0{,}375$.
- Ngưỡng (2.5): $b>\tfrac{0{,}375}{0{,}25}=1{,}5$, tức $b\ge2$.

Cận của Mệnh đề 05.14(c), với $J(0)=\log2\approx0{,}6931$:

| $b$ | Cận trên $J(0)-0{,}8(0{,}25-\tfrac{0{,}375}b)$ | Giá trị đúng $\mathbb EJ(\theta_1)$ |
|---|---|---|
| $1$ | $0{,}7931$ | $0{,}6947$ |
| $2$ | $0{,}6431$ | $0{,}5786$ |

**Tính tay giá trị đúng với $b=1$.**

$\theta_1=-1{,}6\,g_{I_1}$ nhận $1{,}6$ với xác suất $\tfrac12$, $0{,}8$ với xác suất $\tfrac14$, $-0{,}8$ với xác suất $\tfrac14$. Từ định nghĩa của $J$: $J(1{,}6)\approx0{,}5119$, $J(0{,}8)\approx0{,}4775$, $J(-0{,}8)\approx1{,}2775$. Do đó

$$
\begin{aligned}
\mathbb EJ(\theta_1)&=\tfrac12\cdot0{,}5119+\tfrac14\cdot0{,}4775+\tfrac14\cdot1{,}2775\\
&\approx0{,}6947\\
&>J(0) .
\end{aligned}
$$

Với $b=1$, kỳ vọng của $J$ tăng sau một bước, đúng như (2.5) cảnh báo. Giá trị với $b=2$ tính bằng cách liệt kê $64$ cặp chỉ số.

**Gần nghiệm.**

Tại $\theta^*$, gradient mẫu nhận ba giá trị:

- $-0{,}2334$ ở bốn bài $x=2$;
- $-0{,}2666$ ở hai bài đạt với $x=1$;
- $0{,}7334$ ở hai bài không đạt.

Trung bình bằng $0$ và $\Sigma(\theta^*)\approx0{,}1795$. Mọi bước khác $0$ làm $J$ tăng; mức tăng kỳ vọng sau một bước:

| $\eta$ | $b$ | Cận $\tfrac{L\eta^2}2\cdot\tfrac{\Sigma}b$ | Giá trị đúng |
|---|---|---|---|
| $1{,}6$ | $2$ | $0{,}0718$ | $0{,}0409$ |
| $0{,}4$ | $2$ | $0{,}0045$ | $0{,}0023$ |

Giảm bước học bốn lần làm mức tăng giảm khoảng mười tám lần, gần thừa số $16$ của $\eta^2$.

**Diễn giải.** Ở đầu quá trình, $\eta=1{,}6$ với $b\ge2$ cho mức giảm kỳ vọng rõ rệt; $b=1$ thì không. Gần nghiệm, tín hiệu $\lvert J'\rvert$ về $0$ trong khi $\Sigma$ còn dương, nên với $(\eta,b)$ cố định, SGD dao động quanh nghiệm ở mức tỷ lệ với $\eta\Sigma/b$ như Ví dụ 05.14; giảm $\eta$ theo lịch hoặc tăng $b$ ở giai đoạn cuối là cần thiết.

**Kiểm tra lại.** Từ định nghĩa:

$$
\begin{aligned}
J(1{,}6)&=\tfrac18\bigl[4\log(1+\exp(-3{,}2))+2\log(1+\exp(-1{,}6))+2\log(1+\exp(1{,}6))\bigr]\\
&\approx\tfrac18(0{,}1598+0{,}3678+3{,}5678)\\
&\approx0{,}5119 .
\end{aligned}
$$
 Độ cong thật tại nghiệm $J''(\theta^*)\approx0{,}304$ nhỏ hơn $L=0{,}625$, nên các cận dùng $L$ là bi quan, khớp việc cận lớn hơn giá trị đúng ở cả hai bảng.

**Giới hạn.** Với $N$ lớn, $\Sigma$ và $\lVert\nabla J\rVert_2$ chỉ ước lượng được từ một nhóm thử, và ngưỡng (2.5) đổi theo $\theta$.

**Dẫn ngược lý thuyết.** Mệnh đề 01.9 và Nhận xét 04.19 ở bước kiểm giả thiết; Định lý 05.11 và Hệ quả 05.12 cho kỳ vọng, phương sai; Mệnh đề 05.14 và ngưỡng (2.5) cho cỡ nhóm; Ví dụ 05.14 và Nhận xét 05.16 cho hành vi gần nghiệm.
:::

::: application Tình huống 05.2 (Momentum trên hồi quy tuyến tính có số điều kiện 100)
**Bài toán và dữ liệu.**

Bốn quan sát có hai đặc trưng; đặc trưng thứ hai được đo theo đơn vị nhỏ hơn mười lần nên có giá trị lớn gấp mười. Các vectơ đặc trưng là $x_1=(1,10)^T$, $x_2=(1,-10)^T$, $x_3=(-1,10)^T$, $x_4=(-1,-10)^T$, và nhãn sinh từ $\theta^*=(1,1)^T$ không nhiễu: $y=(11,-9,9,-11)$. Cần so giảm gradient, momentum và Nesterov từ $\theta_0=0$, với gradient đầy đủ.

**Mô hình hóa.**

$J(\theta)=\tfrac14\sum_i\tfrac12(x_i^T\theta-y_i)^2$. Vì $y_i=x_i^T\theta^*$, $J(\theta)=\tfrac12(\theta-\theta^*)^TH(\theta-\theta^*)$ với $H=\tfrac14\sum_ix_ix_i^T=\operatorname{diag}(1,100)$; các hạng chéo triệt tiêu vì dấu của hai đặc trưng cân bằng.

**Kiểm giả thiết.** $J$ là hàm bậc hai lồi chặt, $\mu=1$, $L=100$, $\kappa=100$, $Q=\mathrm I$; Mệnh đề 05.17, Định lý 05.21 và 05.23 áp dụng chính xác. $J(\theta_0)=\tfrac12(1+100)=50{,}5$.

**Giảm gradient với $\eta=\tfrac1L=0{,}01$.** Tọa độ thứ hai có hệ số $0$, về đúng nghiệm sau một bước; tọa độ thứ nhất có hệ số $0{,}99$. Do đó $J(\theta_t)=\tfrac12\cdot0{,}99^{2t}$ với $t\ge1$, và $J\le10^{-4}$ cần $t\ge\tfrac{\log5000}{2\log(1/0{,}99)}\approx423{,}8$, tức $424$ bước.

**Momentum với tham số Polyak (3.5).** $\sqrt\beta=\tfrac{10-1}{10+1}=\tfrac9{11}$, $\beta=\tfrac{81}{121}\approx0{,}669$, $\eta=\tfrac4{(10+1)^2}=\tfrac4{121}$, khoảng $0{,}0331$. Cả hai tọa độ nằm đúng ở hai đầu dải của Định lý 05.21(c), nên có nghiệm kép:

- tọa độ thứ nhất: $\eta\lambda=\tfrac4{121}=(\tfrac2{11})^2$, nghiệm kép $\tfrac9{11}$; với $[\chi_0]_1=-1$ và $[\chi_1]_1=-\tfrac{117}{121}$, Bổ đề 05.20(a) cho $[\chi_t]_1=-(1+\tfrac{2t}{11})(\tfrac9{11})^t$;
- tọa độ thứ hai: $\eta\lambda=\tfrac{400}{121}=(\tfrac{20}{11})^2$, nghiệm kép $-\tfrac9{11}$; với $[\chi_0]_2=-1$ và $[\chi_1]_2=\tfrac{279}{121}$, $[\chi_t]_2=-(1+\tfrac{20t}{11})(-\tfrac9{11})^t$.

Biên độ tọa độ thứ hai $(1+\tfrac{20t}{11})(\tfrac9{11})^t$ bằng $2{,}31$; $3{,}10$; $3{,}54$; $3{,}71$ tại $t=1,\ldots,4$, rồi giảm. Vì vậy $J$ tăng từ $50{,}5$ lên khoảng $687$ tại $t=4$ trước khi giảm, và đạt $J\le10^{-4}$ ở bước $56$.

**Nesterov với $\eta=\tfrac1L$, $\beta=\tfrac9{11}$.** Theo Định lý 05.23(a), tọa độ thứ hai có $1-\eta\lambda=0$, nên $[\chi_t]_2=0$ với $t\ge1$. Tọa độ thứ nhất có đa thức $\zeta^2-1{,}8\zeta+0{,}81=(\zeta-0{,}9)^2$, nghiệm kép $0{,}9=1-\tfrac1{\sqrt\kappa}$, khớp Định lý 05.23(c); với $[\chi_1]_1=-0{,}99$, $[\chi_t]_1=-(1+0{,}1t)\,0{,}9^t$. Do đó $J(\theta_t)=\tfrac12(1+0{,}1t)^2\,0{,}81^t$, giảm đơn điệu vì $(1{,}1)^2\cdot0{,}81\approx0{,}98<1$, và đạt $J\le10^{-4}$ ở bước $59$.

![Đồ thị log cơ số 10 của J theo số bước t từ 0 tới 120 cho ba phương pháp trên hồi quy có κ = 100: giảm gradient với bước 1/L giảm chậm theo đường thẳng có độ dốc ứng với hệ số 0,99² mỗi bước, tới khoảng 10⁻⁴ ở bước 424 (ngoài khung); momentum Polyak tăng lên khoảng 687 ở bước 4 rồi giảm nhanh, qua 10⁻⁴ ở bước 56; Nesterov giảm đơn điệu, qua 10⁻⁴ ở bước 59.](img/lec-05/ill-conditioned-runs.svg)

Hình vẽ $\log_{10}J$ theo $t$ cho ba phương pháp. Hai phương pháp có momentum có độ dốc tiệm cận gần nhau, ứng với $\tfrac9{11}$ và $0{,}9$, dốc hơn nhiều so với $0{,}99$ của giảm gradient. Chỗ khác nhau nằm ở đầu quỹ đạo: momentum Polyak đi qua một đoạn tăng do thừa số $1+\tfrac{20t}{11}$ của nghiệm kép, còn Nesterov không.

**Khi giả thiết của Định lý 05.21(b) bị vi phạm.** Giữ $\beta=\tfrac{81}{121}$ nhưng tăng $\eta$ lên $0{,}04$: $\eta L=4$, lớn hơn $2(1+\beta)\approx3{,}339$. Tọa độ thứ hai có đa thức $\zeta^2+2{,}331\zeta+0{,}669$ với nghiệm $\approx-1{,}995$ và $\approx-0{,}336$; theo Bổ đề 05.20(d), $[\chi_t]_2$ không về $0$, và thực tế $\lvert[\chi_t]_2\rvert$ tăng gần gấp đôi mỗi bước: $J\approx1{,}3\cdot10^8$ tại $t=10$.

**Diễn giải.** Với $\kappa=100$, momentum và Nesterov cần khoảng $\sqrt\kappa$ lần ít bước hơn giảm gradient, đúng bậc của Hệ quả 05.22 và Định lý 05.23(c). Momentum Polyak có giai đoạn tăng đầu; Nesterov chọn bước học chỉ từ $L$. Cả hai cần $\mu$ để chọn hệ số $\beta$. Một bước học lớn hơn ngưỡng ổn định làm momentum phân kỳ dù hàm lồi chặt.

**Kiểm tra lại.** Tọa độ thứ nhất của momentum tại $t=1$:

$$
\begin{aligned}
-\Bigl(1+\frac2{11}\Bigr)\frac9{11}&=-\frac{117}{121}\\
&=\Bigl(1-\frac4{121}\Bigr)\cdot(-1),
\end{aligned}
$$

đúng bằng $[\chi_1]_1$ theo (3.4). Tọa độ thứ hai tại $t=4$: $(1+\tfrac{80}{11})(\tfrac9{11})^4\approx8{,}273\cdot0{,}4481\approx3{,}707$, nên $J\approx\tfrac12\cdot100\cdot3{,}707^2\approx687$, khớp mô phỏng.

**Giới hạn.** Với mô hình tuyến tính, chuẩn hóa đặc trưng thứ hai cho $H=\mathrm I$ và giảm gradient với $\eta=1$ tới nghiệm sau một bước, rẻ hơn mọi phương pháp gia tốc. Với mạng sâu, phân tích theo tọa độ riêng chỉ mô tả hành vi gần một cực tiểu.

**Dẫn ngược lý thuyết.** Mệnh đề 05.17 cho giảm gradient; Bổ đề 05.20, Định lý 05.21 và Hệ quả 05.22 cho momentum, kể cả trường hợp phân kỳ; Định lý 05.23 cho Nesterov.
:::

::: application Tình huống 05.3 (Mạng hai đơn vị với khởi tạo đối xứng: giả thiết không thỏa)
**Bài toán và dữ liệu.**

Ba quan sát $(x,y)$ là $(-1,1)$, $(1,1)$, $(2,2)$, lấy từ hàm $y=\lvert x\rvert$. Mạng hai đơn vị ẩn ReLU của Định nghĩa 05.25 biểu diễn đúng hàm này với $w=(1,-1)$, $c=(0,0)$, $a=(1,1)$, vì $\lvert x\rvert=\phi(x)+\phi(-x)$. Huấn luyện bằng giảm gradient với gradient đầy đủ, $\eta=0{,}1$, từ hai điểm đầu khác nhau.

**Mô hình hóa.** $J(\theta)=\tfrac13\sum_{i=1}^3\tfrac12(f_\theta(x_i)-y_i)^2$, với $\theta\in\mathbb R^6$.

**Kiểm giả thiết.** Định lý 05.28 cần đối xứng ban đầu và điểm khả vi. Mọi $x_i\ne0$ và độ lệch ban đầu bằng $0$, nên tiền kích hoạt ban đầu khác $0$; mô phỏng kiểm rằng không tiền kích hoạt nào bằng đúng $0$ trên quỹ đạo.

**Khởi tạo đối xứng $w_j=0{,}5$, $c_j=0$, $a_j=0{,}5$.**

Vòng đầu, tính tay:

- với $x=-1$: $z_j=-0{,}5$, $h_j=0$, $f=0$, $e=-1$;
- với $x=1$: $z_j=0{,}5$, $h_j=0{,}5$, $f=0{,}5$, $e=-0{,}5$;
- với $x=2$: $z_j=1$, $h_j=1$, $f=1$, $e=-1$.

Do đó $J=\tfrac13\cdot\tfrac12(1+0{,}25+1)=0{,}375$. Theo (4.1), lấy trung bình trên ba quan sát:

- $\partial J/\partial a_j=\tfrac13\bigl(0-0{,}25-1\bigr)\approx-0{,}4167$;
- $\partial J/\partial w_j=\tfrac13\bigl(0-0{,}5\cdot0{,}5\cdot1-1\cdot0{,}5\cdot2\bigr)\approx-0{,}4167$;
- $\partial J/\partial c_j=\tfrac13\bigl(0-0{,}25-0{,}5\bigr)=-0{,}25$.

Hai đơn vị nhận cùng cập nhật và sau bước có $a_j=w_j\approx0{,}5417$, $c_j=0{,}025$, $J\approx0{,}298$. Mô phỏng tiếp:

| $t$ | $0$ | $1$ | $3$ | $10$ | $100$ | $1000$ |
|---|---|---|---|---|---|---|
| $J(\theta_t)$ | $0{,}375$ | $0{,}298$ | $0{,}206$ | $0{,}167$ | $0{,}1669$ | $0{,}16667$ |

Hai đơn vị giống hệt nhau ở mọi vòng, và $J\to\tfrac16$: mạng khớp đúng hai quan sát $x=1$, $x=2$ bằng $f(x)\approx x$ và bỏ qua quan sát $x=-1$, nơi cả hai đơn vị không hoạt động.

**Khởi tạo Glorot.**

Lớp vào có $n_{\rm in}=1$, $n_{\rm out}=2$ và lớp ra có $n_{\rm in}=2$, $n_{\rm out}=1$; cả hai cho $s^2=\tfrac23$ và $\alpha=\sqrt2\approx1{,}414$. Chọn sẵn một bộ giá trị trong đoạn $[-1{,}414;\,1{,}414]$, đóng vai một lần lấy mẫu để phép tính lặp lại được: $w=(0{,}9;\,-1{,}1)$, $a=(0{,}6;\,0{,}8)$, $c=(0,0)$.

Vòng đầu, tính tay:

- với $x=-1$: $h=(0;\,1{,}1)$, $f=0{,}88$, $e=-0{,}12$;
- với $x=1$: $h=(0{,}9;\,0)$, $f=0{,}54$, $e=-0{,}46$;
- với $x=2$: $h=(1{,}8;\,0)$, $f=1{,}08$, $e=-0{,}92$.

Do đó $J=\tfrac16(0{,}0144+0{,}2116+0{,}8464)\approx0{,}1787$. Đạo hàm theo hai trọng số ra là $\tfrac13(-0{,}46\cdot0{,}9-0{,}92\cdot1{,}8)=-0{,}69$ và $\tfrac13(-0{,}12\cdot1{,}1)=-0{,}044$: hai đơn vị nhận cập nhật khác nhau ngay từ đầu. Mô phỏng tiếp:

| $t$ | $0$ | $1$ | $3$ | $10$ | $100$ | $1000$ |
|---|---|---|---|---|---|---|
| $J(\theta_t)$ | $0{,}1787$ | $0{,}1077$ | $0{,}0296$ | $0{,}00074$ | $0{,}00014$ | $<10^{-5}$ |

Đơn vị 1, với $w_1>0$, khớp phần $x>0$; đơn vị 2, với $w_2<0$, khớp quan sát $x=-1$.

![Ba quan sát (−1; 1), (1; 1), (2; 2) trên mặt phẳng (x, y) và hai hàm học được sau 1000 vòng: với khởi tạo đối xứng, f(x) ≈ x khi x > 0 và bằng 0 khi x < 0, bỏ qua quan sát tại x = −1; với khởi tạo Glorot, f(x) gần |x| và đi qua cả ba quan sát.](img/lec-05/symmetric-vs-random-fit.svg)

Hình vẽ hai hàm học được. Hàm của khởi tạo đối xứng là một nhánh ReLU duy nhất, đúng dạng $2a_1\phi(w_1x+c_1)$ của Định lý 05.28; hàm của khởi tạo Glorot dùng hai nhánh ngược hướng.

**Diễn giải.** Giả thiết phá đối xứng bị vi phạm ở khởi tạo đầu, và hậu quả đúng như Hệ quả 05.29: mạng hai đơn vị bị giới hạn ở sức biểu diễn của một đơn vị. Mất mát dừng ở $\tfrac16$, trong khi mạng có thể đạt $0$.

Mất mát tốt nhất của một đơn vị là $J_1^*=\tfrac1{21}\approx0{,}048$ (Bài tập 05.11), nhỏ hơn $\tfrac16$, nên quỹ đạo đối xứng còn dừng ở một điểm kém hơn mức tốt nhất của một đơn vị. Quan sát $x=-1$ nằm trong vùng $z_j<0$ của cả hai đơn vị suốt quá trình, nên không tạo gradient nào kéo đơn vị về phía nó.

Khởi tạo bằng $0$ còn kém hơn: theo Nhận xét 05.30, gradient bằng $0$ và $J$ đứng yên ở $\tfrac13\cdot\tfrac12(1+1+4)=1$.

**Kiểm tra lại.** Với khởi tạo đối xứng, sau một bước $a_j=w_j\approx0{,}5417$ và $c_j=0{,}025$:

- tại $x=1$: $z_j=0{,}5417+0{,}025=0{,}5667$ và $f=2\cdot0{,}5417\cdot0{,}5667\approx0{,}614$;
- tại $x=2$: $z_j=1{,}1083$ và $f\approx1{,}201$;
- tại $x=-1$: $z_j<0$ và $f=0$.

Khi đó $J\approx\tfrac16(1+0{,}149+0{,}639)\approx0{,}298$.

**Giới hạn.** Bộ giá trị Glorot ở đây được chọn sẵn; một lần lấy mẫu khác, chẳng hạn hai $w_j$ cùng dấu, có thể dừng ở điểm khác. Phá đối xứng là điều kiện cần, không bảo đảm đạt mất mát $0$.

**Dẫn ngược lý thuyết.** Định nghĩa 05.25 và Mệnh đề 05.26 cho mô hình và gradient; Định nghĩa 05.27, Định lý 05.28 và Hệ quả 05.29 cho hậu quả của đối xứng; Mệnh đề 05.31 và Định nghĩa 05.36 cho khởi tạo thay thế; Nhận xét 05.30 cho khởi tạo bằng $0$.
:::

Các khái niệm của chương xuất hiện trong học máy ở những chỗ sau.

- **Bộ tối ưu SGD của thư viện học sâu.** Tham số cỡ nhóm, bước học, momentum và cờ Nesterov ứng với $b$, $\eta$, $\beta$ và lựa chọn giữa Thuật toán 05.2 và 05.3.
- **Dừng sớm và chọn siêu tham số.** Thuật toán 05.1 chọn bản lưu theo mất mát xác thực, và Mệnh đề 05.5 cho biết giá trị xác thực của bản được chọn là ước lượng lạc quan (Goodfellow, Bengio và Courville 2016, mục 7.8, tr. 246–252).
- **Lịch bước học.** Ví dụ 05.14 và Nhận xét 05.16 giải thích vì sao bước học được giảm ở giai đoạn cuối.
- **Khởi tạo mặc định.** Một số thư viện, chẳng hạn Keras, dùng dạng đều của Định nghĩa 05.36 làm mặc định cho lớp kết nối đầy đủ; Nhận xét 05.39 nêu giới hạn với ReLU.
- **Chẩn đoán huấn luyện.** Nhận xét 05.40 liệt kê số đo nào chứng nhận điều gì.

## Tóm tắt chương

**Định nghĩa.**

- Mất mát huấn luyện và rủi ro kỳ vọng (Định nghĩa 05.1); tập xác thực, mất mát xác thực, tập kiểm thử (05.4); điểm dừng, cực tiểu địa phương, điểm yên ngựa (05.7).
- Gradient nhóm và hiệp phương sai của gradient mẫu (05.10).
- Mạng hai đơn vị ẩn (05.25); hai đơn vị đối xứng (05.27); khởi tạo Glorot (05.36).
- Thuật toán 05.1 (SGD với dừng sớm), 05.2 (momentum), 05.3 (Nesterov).

**Kết quả chính.**

- Mệnh đề 05.2: khoảng cách giữa $J$ và $R$ của mô hình hằng; Mệnh đề 05.5: mất mát xác thực không chệch khi tham số cố định và lạc quan khi được chọn.
- Mệnh đề 05.8: phân loại điểm dừng bằng dấu các giá trị riêng của Hessian.
- Định lý 05.11, Hệ quả 05.12: gradient nhóm không chệch, hiệp phương sai $\Sigma/b$; Mệnh đề 05.14: kỳ vọng mất mát sau một bước và ngưỡng cỡ nhóm.
- Mệnh đề 05.17: điều kiện co $0<\eta<\tfrac2L$ và hệ số $\tfrac{\kappa-1}{\kappa+1}$ của giảm gradient trên hàm bậc hai.
- Mệnh đề 05.18: vận tốc là tổng có trọng số; Bổ đề 05.20, Định lý 05.21, Hệ quả 05.22: momentum trên hàm bậc hai; Định lý 05.23: Nesterov trên hàm bậc hai.
- Mệnh đề 05.26: đạo hàm của mạng bằng quy tắc dây chuyền; Định lý 05.28, Hệ quả 05.29: đối xứng được bảo toàn; Mệnh đề 05.31: trọng số liên tục độc lập phá đối xứng.
- Mệnh đề 05.32: độ nhạy qua chuỗi; Mệnh đề 05.34, 05.35: phương sai tiến và lùi; Mệnh đề 05.37: tính chất của Glorot; Mệnh đề 05.38: phương sai qua nhiều lớp.

**Công thức cần nhớ.**

$$
\mathbb E\,\widehat g=\nabla J(\theta),\qquad\operatorname{Cov}\widehat g=\frac{\Sigma(\theta)}b,\qquad\mathbb E\,J(\theta-\eta\widehat g)\le J(\theta)-\eta\Bigl(1-\frac{L\eta}2\Bigr)\lVert\nabla J\rVert_2^2+\frac{L\eta^2}2\cdot\frac{\operatorname{tr}\Sigma}b ;
$$

$$
v_{t+1}=\beta v_t-\eta\widehat g_t,\qquad\theta_{t+1}=\theta_t+v_{t+1},\qquad\widetilde\theta_t=\theta_t+\beta v_t ;
$$

$$
0<\eta L<2,\qquad0<\eta L<2(1+\beta),\qquad0<\eta L<\frac{2(1+\beta)}{1+2\beta} ;
$$

$$
\operatorname{Var}z_j=n_{\rm in}s^2V_h,\qquad\operatorname{Var}\delta_{h,i}=n_{\rm out}s^2V_\delta,\qquad s^2=\frac2{n_{\rm in}+n_{\rm out}},\qquad\alpha=\sqrt{\frac6{n_{\rm in}+n_{\rm out}}} .
$$

Dòng đầu: gradient nhóm và bước SGD. Dòng hai: momentum và điểm dự báo của Nesterov. Dòng ba: miền ổn định trên hàm bậc hai của giảm gradient, momentum và Nesterov. Dòng bốn: phương sai qua một lớp và quy tắc Glorot.

**Giả thiết hay bị bỏ quên.**

- Gradient nhóm không chệch cho $\nabla J$, không cho $\nabla R$, và chỉ khi chỉ số rút đều.
- Không chệch không bảo đảm $J$ giảm ở từng bước; kỳ vọng giảm cần tín hiệu lớn hơn nhiễu theo (2.5).
- Phân tích momentum và Nesterov chính xác chỉ trên hàm bậc hai với gradient đầy đủ.
- Đối xứng chỉ bị phá khi trọng số ban đầu khác nhau; momentum và nhóm dữ liệu thay đổi không phá được nó.
- Glorot dựa trên mô hình tuyến tính, trung bình $0$, độc lập; với ReLU hệ số chiều tiến khác.

**Chuỗi suy luận của toàn chương.**

1. Định nghĩa 05.1, Mệnh đề 05.2, 05.5 đặt đích: cực tiểu $J$, chọn bản lưu theo $\widehat R_{\rm val}$; Mệnh đề 05.8 nêu giới hạn của điểm dừng khi không lồi.
2. Định lý 05.11 và Mệnh đề 05.14 thay $\nabla J$ bằng gradient nhóm; Thuật toán 05.1 ghép thành quy trình.
3. Mệnh đề 05.17 chỉ ra độ cong chặn giảm gradient; Định lý 05.21, 05.23 cho momentum và Nesterov khắc phục, với hệ số co bậc $\sqrt\kappa$.
4. Định lý 05.28 và Mệnh đề 05.31 đòi phá đối xứng tại $\theta_0$; Mệnh đề 05.32 cho độ nhạy qua chuỗi; Mệnh đề 05.34, 05.35, 05.37 cho thang Glorot.
5. Nhận xét 05.40 phối hợp các kết quả theo thứ tự chạy và phạm vi chứng nhận.

**Giới hạn còn lại và bài sau.** Chương xây quy trình huấn luyện bằng gradient nhóm, momentum và khởi tạo, kế thừa giảm gradient và bổ đề giảm của Bài 04. Ba giới hạn còn lại được các bài khác xử lý.

1. Chương chỉ phát biểu lại, không chứng minh, các định lý hội tụ của SGD (Nhận xét 05.16). Bài 05b (hội tụ của hạ gradient và hạ gradient ngẫu nhiên) chứng minh chúng, gồm sàn nhiễu, lịch bước và điều kiện Polyak–Łojasiewicz.
2. Các phép tính kỳ vọng, phương sai và độ lệch dùng xác suất ở mức tối thiểu. Bài 05c (xác suất cơ bản, bất đẳng thức tập trung và mất mát trung bình trên nhóm nhỏ) nên đọc trước hoặc song song với Mục 2: phần kỳ vọng, phương sai và trung bình mẫu là tiên quyết của Định lý 05.11, còn phần bất đẳng thức tập trung có thể đọc sau. Ghi chú đó cho cơ sở xác suất, các bất đẳng thức Markov, Chebyshev, Hoeffding và phân tích cỡ nhóm dưới ngân sách cố định.
3. Một bước học chung cho mọi tọa độ là nguồn gốc của số điều kiện ở Mục 3. Bài 06, về các phương pháp tối ưu trong học sâu, dùng bước học thích nghi theo tọa độ như AdaGrad, RMSProp, Adam, các phương pháp bậc hai xấp xỉ như Newton–CG, BFGS, và chuẩn hóa theo lô, vốn thay đổi chính thang của tín hiệu mà Mục 4 chỉ kiểm soát tại thời điểm khởi tạo.

## Bài tập củng cố

Mỗi mức có một bài; cùng với các bài trong mục, mọi mục tiêu học tập có ít nhất một bài tập. Các bài không trùng đề với bộ bài giao chính thức trong tệp bài tập của Bài 05.

### Mức nhận biết

::: exercise Bài tập 05.10 (Nhận biết: đúng hay sai)
Xác định đúng hay sai, giải thích bằng một kết quả có số hiệu hoặc một phản ví dụ.

- (i) Nếu mất mát huấn luyện tại nghiệm của $J$ nhỏ thì rủi ro kỳ vọng tại đó nhỏ.
- (ii) Mất mát xác thực của bản lưu được chọn là ước lượng không chệch của rủi ro của bản đó.
- (iii) Một điểm dừng mà Hessian có một giá trị riêng âm không thể là cực tiểu địa phương.
- (iv) Gradient nhóm với chỉ số rút đều, có hoàn lại là ước lượng không chệch của $\nabla J$.
- (v) Tăng cỡ nhóm từ $25$ lên $100$ làm sai số chuẩn của gradient nhóm giảm bốn lần.
- (vi) Trên mọi hàm bậc hai lồi chặt, momentum với $\beta=0{,}9$ hội tụ khi $\eta<\tfrac2L$.
- (vii) Trên hàm bậc hai với $\eta L=1{,}8$, Nesterov với $\beta=0{,}5$ hội tụ với mọi điểm đầu.
- (viii) Hai đơn vị khởi tạo giống nhau sẽ được tách ra nếu dùng Nesterov thay cho SGD.
- (ix) Khởi tạo Glorot giữ đúng phương sai chiều tiến khi $n_{\rm in}\ne n_{\rm out}$.
:::

::: hint
Các kết quả cần đối chiếu: Ví dụ 05.2, Mệnh đề 05.5, 05.8, Định lý 05.11, Hệ quả 05.12, Định lý 05.21, 05.23, 05.28, Mệnh đề 05.37.
:::

::: solution
**Đáp án.**

- (i) Sai. Ví dụ 05.2: $J(\theta^*)=\tfrac43$ nhưng $R(\theta^*)=3$; Mệnh đề 05.2 cho $\mathbb EJ(\widehat\theta)<\min R<\mathbb ER(\widehat\theta)$.
- (ii) Sai. Mệnh đề 05.5(b): giá trị xác thực của bản được chọn có kỳ vọng không vượt rủi ro tốt nhất; Ví dụ 05.4 cho $0{,}95<1$.
- (iii) Đúng. Mệnh đề 05.8(a).
- (iv) Đúng. Định lý 05.11.
- (v) Sai. Sai số chuẩn tỷ lệ $1/\sqrt b$ theo Hệ quả 05.12(c), nên giảm hai lần.
- (vi) Đúng. Định lý 05.21(b) cần $\eta L<2(1+0{,}9)=3{,}8$, và $\eta L<2$ thỏa điều đó.
- (vii) Sai. Định lý 05.23(b) cần $\eta L<\tfrac{2\cdot1{,}5}{2}=1{,}5$.
- (viii) Sai. Định lý 05.28 bao gồm Thuật toán 05.3.
- (ix) Sai. Mệnh đề 05.37(b): một hệ số lớn hơn $1$, hệ số kia nhỏ hơn $1$.

**Kiểm tra lại.**

Câu (vii) với $\eta L=1{,}8$, $\beta=0{,}5$: đa thức của tọa độ $\lambda=L$ là $\zeta^2-1{,}5\cdot(-0{,}8)\zeta+0{,}5\cdot(-0{,}8)=\zeta^2+1{,}2\zeta-0{,}4$, có nghiệm $\tfrac{-1{,}2-\sqrt{1{,}44+1{,}6}}2\approx-1{,}47$, môđun lớn hơn $1$.
:::

### Mức tính toán hoặc chứng minh

::: exercise Bài tập 05.11 (Chứng minh: mất mát tốt nhất của một đơn vị trong Tình huống 05.3)
Với ba quan sát $(-1,1)$, $(1,1)$, $(2,2)$ và mạng một đơn vị ReLU $f(x)=a\,\phi(wx+c)$, chứng minh

$$
J_1^*=\inf_{(w,c,a)}\frac13\sum_{i=1}^3\tfrac12\bigl(f(x_i)-y_i\bigr)^2=\frac1{21},
$$

và giá trị này đạt được.
:::

::: hint
Chia trường hợp theo tập $S$ các quan sát có $wx_i+c>0$. Trên $S$, $f$ là một hàm affine của $x$; ngoài $S$, $f=0$.
:::

::: solution
**Bước 1 (đơn vị hoạt động trên cả ba quan sát).**

Khi $S$ gồm cả ba điểm, $f(x_i)=aw\,x_i+ac$ là giá trị của một đường thẳng tại ba điểm, nên mất mát không nhỏ hơn cực tiểu của bình phương nhỏ nhất trên mọi đường thẳng. Với $\bar x=\tfrac23$, $\bar y=\tfrac43$, $\sum(x_i-\bar x)^2=\tfrac{42}9$ và $\sum(x_i-\bar x)(y_i-\bar y)=\tfrac{12}9$, đường bình phương nhỏ nhất có hệ số góc $\tfrac27$ và hệ số chặn $\tfrac43-\tfrac27\cdot\tfrac23=\tfrac87$. Phần dư tại ba điểm là $-\tfrac17$, $\tfrac37$, $-\tfrac27$, tổng bình phương $\tfrac{14}{49}=\tfrac27$, nên mất mát bằng $\tfrac13\cdot\tfrac12\cdot\tfrac27=\tfrac1{21}$.

**Bước 2 (giá trị đạt được).**

Lấy $a=1$, $w=\tfrac27$, $c=\tfrac87$: $wx+c$ bằng $\tfrac67$, $\tfrac{10}7$, $\tfrac{12}7$ tại ba điểm, đều dương, nên $S$ gồm cả ba điểm và $f$ trùng đường bình phương nhỏ nhất.

**Bước 3 (các tập hoạt động khác).**

Nếu $S$ thiếu ít nhất một quan sát $k$, thì $f(x_k)=0$ và mất mát không nhỏ hơn $\tfrac13\cdot\tfrac12y_k^2\ge\tfrac16$, vì mọi $y_k\ge1$. Vì $\tfrac16>\tfrac1{21}$, cận dưới đúng bằng $\tfrac1{21}$, đạt ở Bước 2. $\square$

**Kiểm tra lại.**

$\tfrac67-1=-\tfrac17$, $\tfrac{10}7-1=\tfrac37$, $\tfrac{12}7-2=-\tfrac27$; tổng phần dư bằng $0$, đúng tính chất của bình phương nhỏ nhất có hệ số chặn.
:::

### Mức vận dụng vào AI

::: exercise Bài tập 05.12 (Vận dụng: khởi tạo một mạng phân loại ảnh)
Một mạng kết nối đầy đủ phân loại ảnh $28\times28$ có hai lớp tuyến tính $784\to256$ và $256\to10$.

- (a) Tính $s^2$ và biên $\alpha$ của Glorot cho từng lớp.
- (b) Tính hệ số tiến $n_{\rm in}s^2$ và hệ số lùi $n_{\rm out}s^2$ của từng lớp.
- (c) Nếu có ReLU sau lớp thứ nhất, dùng Nhận xét 05.39 để tính hệ số mômen bậc hai chiều tiến của lớp thứ hai.
- (d) Nêu hai đại lượng cần đo tại $\theta_0$ để kiểm thang trước khi huấn luyện.
:::

::: hint
$s^2=\tfrac2{n_{\rm in}+n_{\rm out}}$, $\alpha=\sqrt{3s^2}$. Với ReLU, hệ số chiều tiến nhân thêm $\tfrac12$.
:::

::: solution
**Câu (a).**

- Lớp $784\to256$: $s^2=\tfrac2{1040}\approx0{,}00192$, $\alpha=\sqrt{6/1040}\approx0{,}0760$.
- Lớp $256\to10$: $s^2=\tfrac2{266}\approx0{,}00752$, $\alpha=\sqrt{6/266}\approx0{,}150$.

**Câu (b).**

- Lớp thứ nhất: hệ số tiến $784\cdot0{,}00192\approx1{,}51$, hệ số lùi $256\cdot0{,}00192\approx0{,}49$.
- Lớp thứ hai: hệ số tiến $256\cdot0{,}00752\approx1{,}92$, hệ số lùi $10\cdot0{,}00752\approx0{,}075$.

**Câu (c).**

Theo Nhận xét 05.39, hệ số mômen bậc hai chiều tiến của lớp thứ hai là $\tfrac{1{,}92}2\approx0{,}96$, gần $1$; ReLU bù một phần độ phóng đại của Glorot khi $n_{\rm in}\gg n_{\rm out}$.

**Câu (d).**

Độ lệch chuẩn của kích hoạt và của gradient theo trọng số ở từng lớp, đo trên một nhóm dữ liệu (Nhận xét 05.39).

**Kiểm tra lại.**

Mỗi lớp có trung bình hai hệ số bằng $1$: $\tfrac{1{,}51+0{,}49}2=1$ và $\tfrac{1{,}92+0{,}075}2\approx1$, theo Mệnh đề 05.37(a). Hệ số lùi $0{,}075$ của lớp ra cho thấy gradient vào lớp ẩn có phương sai nhỏ hơn khoảng $13$ lần so với gradient tại đầu ra trong mô hình tuyến tính.
:::

## Hướng dẫn đọc thêm và tài liệu tham khảo

- Goodfellow, I., Bengio, Y. và Courville, A. (2016), *Deep Learning*, MIT Press. Mục 5.2–5.3 (tr. 110–122) và 7.8 (tr. 246–252) cho Mục 1; mục 8.1 (tr. 274–281) cho Mục 1–2; mục 8.2 (tr. 282–294) cho Mục 1.4, 3.1, 4.3; mục 8.3 (tr. 294–301) cho Mục 2.4, 3.2, 3.4; mục 8.4 (tr. 301–306) cho Mục 4; mục 6.5 (từ tr. 204) cho truyền ngược.
- Boyd, S. và Vandenberghe, L. (2004), *Convex Optimization*, Cambridge University Press, mục 9.2–9.3 (tr. 463–475): giảm gradient trên hàm bậc hai, Mục 3.1.
- Nocedal, J. và Wright, S. J. (2006), *Numerical Optimization*, ấn bản 2, Springer, mục 3.3: tốc độ của giảm gradient trên hàm bậc hai, đối chiếu Mệnh đề 05.17.
- Wasserman, L. (2004), *All of Statistics*, Springer, chương 3 và 6: kỳ vọng, phương sai và sai số chuẩn, Mục 2.2.
- Bottou, L., Curtis, F. E. và Nocedal, J. (2018), "Optimization methods for large-scale machine learning", *SIAM Review* 60(2), tr. 223–311, mục 4.1: bất đẳng thức một bước của SGD, Mệnh đề 05.14.
- Polyak, B. T. (1964), "Some methods of speeding up the convergence of iteration methods", *USSR Computational Mathematics and Mathematical Physics* 4(5), tr. 1–17: Hệ quả 05.22.
- Nesterov, Y. (1983), "A method for solving the convex programming problem with convergence rate $O(1/k^2)$", *Soviet Mathematics Doklady* 27, tr. 372–376: Định lý 05.23, Nhận xét 05.24.
- Sutskever, I., Martens, J., Dahl, G. và Hinton, G. (2013), "On the importance of initialization and momentum in deep learning", *Proceedings of the 30th International Conference on Machine Learning*, tr. 1139–1147: Thuật toán 05.3.
- Lessard, L., Recht, B. và Packard, A. (2016), "Analysis and design of optimization algorithms via integral quadratic constraints", *SIAM Journal on Optimization* 26(1), tr. 57–95: phạm vi của Hệ quả 05.22.
- Glorot, X. và Bengio, Y. (2010), "Understanding the difficulty of training deep feedforward neural networks", *Proceedings of the 13th International Conference on Artificial Intelligence and Statistics*, tr. 249–256: Định nghĩa 05.36.
- He, K., Zhang, X., Ren, S. và Sun, J. (2015), "Delving deep into rectifiers", *Proceedings of the IEEE International Conference on Computer Vision*, tr. 1026–1034: khởi tạo cho ReLU, đọc sau Nhận xét 05.39.
- Hinton, G., Srivastava, N. và Swersky, K. (2012), *Neural Networks for Machine Learning*, Lecture 6, Đại học Toronto, tr. 17–21: hình học của momentum và Nesterov.
- Ghi chú bổ trợ Bài 05b (Định lý 05b.36, 05b.43) và Bài 05c (Định lý 05c.35, Mệnh đề 05c.36, Mục 6.6 về cỡ nhóm dưới ngân sách cố định).
