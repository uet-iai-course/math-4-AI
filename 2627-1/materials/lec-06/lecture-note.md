# Bài 06 — Mở rộng mô hình và dữ liệu

## Mục tiêu học tập

Bài 06 ứng với Buổi 6 của đề cương và hỗ trợ các chuẩn đầu ra bài học sau: một phần LLO11 (khác biệt giữa tối ưu trong học máy và tối ưu thuần túy; các thách thức do nhiều cực tiểu, điểm yên ngựa và độ sâu của đồ thị tính toán), một phần LLO12 (hạ gradient ngẫu nhiên nhóm nhỏ và lịch bước, chưa gồm momentum) và phần so sánh chi phí của LLO15 (phương pháp Newton). Các chuẩn đầu ra học phần liên quan là CLO1, CLO2 và CLO4.

Sau chương này, người học có thể:

1. Chứng minh dữ liệu XOR không tách được tuyến tính, dựng một mạng hai tầng biểu diễn đúng XOR và chứng minh rủi ro thực nghiệm của mạng đó không lồi bằng đối xứng hoán vị các đơn vị ẩn (LLO11; CLO1, CLO2).
2. Tính thủ công gradient của mất mát theo mọi tham số của mạng hai tầng bằng lan truyền ngược, kiểm tra bằng sai phân hữu hạn và đếm chi phí của phép tính (LLO11; CLO1).
3. Phân loại điểm dừng bằng trị riêng của Hessian, áp dụng bổ đề giảm và định lý hội tụ của chuẩn gradient khi mục tiêu không lồi, và nêu những điều định lý đó không khẳng định (LLO11; CLO1).
4. Tính kỳ vọng và sai số bình phương trung bình của gradient nhóm nhỏ khi chọn có và không hoàn lại, và thực hiện thuật toán hạ gradient ngẫu nhiên nhóm nhỏ (LLO12; CLO2).
5. Phát biểu đủ giả thiết và áp dụng các định lý hội tụ của hạ gradient ngẫu nhiên cho hàm lồi mạnh và hàm không lồi: tính mức nhiễu nền, chọn bước theo số bước, so sánh hai phương pháp dưới cùng tổng ngân sách và liên hệ dừng sớm với chính quy hóa bậc hai (LLO11, LLO12; CLO1, CLO2).
6. Chọn giữa hạ gradient đầy đủ, Newton và hạ gradient ngẫu nhiên theo số mẫu, số tham số và tính lồi, kèm bảo đảm và giới hạn của lựa chọn (LLO11, LLO15; CLO4).

## Kiến thức tiên quyết

Số hiệu `01.k`, `04.k`, `05.k`, `05b.k`, `05c.k` chỉ ghi chú Bài 01, 04, 05 và hai bài bổ trợ 05b, 05c. Ghi chú Bài 00 được dẫn bằng tên khái niệm. Mỗi kết quả được phát biểu lại tại đây hoặc tại chỗ dùng.

- **Quy tắc dây chuyền dạng Jacobian chuyển vị** (Bài 00). Nếu $\psi:\mathbb R^{d_u}\to\mathbb R^{d_v}$ khả vi với Jacobian $J_\psi(u)\in\mathbb R^{d_v\times d_u}$ và $g:\mathbb R^{d_v}\to\mathbb R$ khả vi, thì $\nabla(g\circ\psi)(u)=J_\psi(u)^\top\nabla g(\psi(u))$.
- **Khai triển Taylor bậc hai và phép kiểm tra bậc hai bằng Hessian** (Bài 00). Với $F$ khả vi liên tục hai lần, $F(\theta+s)=F(\theta)+\nabla F(\theta)^\top s+\tfrac12s^\top\nabla^2F(\theta)s+o(\lVert s\rVert^2)$; tại điểm có $\nabla F(\theta)=0$ và $\nabla^2F(\theta)\succ0$, $\theta$ là cực tiểu địa phương chặt.
- **Tính lồi** (Định nghĩa 01.22; Định lý 01.31(b); Hệ quả 01.27; Hệ quả 01.34). Hợp của một hàm lồi với một ánh xạ affine là hàm lồi. Với $F$ lồi khả vi, mọi điểm có $\nabla F(\theta)=0$ là cực tiểu toàn cục. Tập nghiệm của bài toán cực tiểu hóa một hàm lồi là tập lồi.
- **Gradient Lipschitz và bổ đề giảm** (Định nghĩa 04.17; Bổ đề 04.18, 04.20; Bổ đề 05b.6). Nếu $\nabla F$ là $L$-Lipschitz thì $F(\theta')\le F(\theta)+\nabla F(\theta)^\top(\theta'-\theta)+\tfrac L2\lVert\theta'-\theta\rVert^2$, và một bước hạ gradient với bước $\eta\in(0,\tfrac2L)$ làm $F$ giảm.
- **Kết luận của Bài 05.** Một bước hạ gradient trên $n$ mẫu với $d$ tham số tốn $O(nd)$, một bước Newton tốn $O(nd^2+d^3)$ (Mệnh đề 05.35). Dữ liệu XOR không tách được bằng điểm số affine (Mệnh đề 05.40), và số đơn thức bậc không quá $q$ của $d_0$ biến là $\binom{d_0+q}q$ (Mệnh đề 05.41). Tập xác thực, tập kiểm thử và dừng sớm được định nghĩa ở Định nghĩa 05.6 và Định nghĩa 05.38. Chính quy hóa bậc hai làm mất mát logistic lồi mạnh (Định lý 05.26).
- **Bài 05b** (Định nghĩa 05b.5, 05b.31; Định lý 05b.36, 05b.39, 05b.41, 05b.43; Hệ quả 05b.44). Các giả thiết có tên được phát biểu lại tại chỗ dùng đầu: H0 (bị chặn dưới) và H2 (gradient Lipschitz) ở Định lý 06.20, H3 (lồi mạnh) và H4 (có điểm cực tiểu) ở Định lý 06.31, H6 (không chệch), H6a (chặn mômen bậc hai) và H6b (chặn phương sai) ở Định nghĩa 06.26. Bốn định lý hội tụ trên được phát biểu lại đầy đủ ở Mục 4 và 6, thành Định lý 06.20 (Định lý 05b.41), Định lý 06.31 (Định lý 05b.36), Định lý 06.32 (Định lý 05b.39) và Định lý 06.34 (Định lý 05b.43).
- **Bài 05c** (Định nghĩa 05c.51; Định lý 05c.52, 05c.53; Mệnh đề 05c.56; Nhận xét 05c.58). Rủi ro thực nghiệm tại một tham số cố định ước lượng không chệch rủi ro kỳ vọng; gradient trên một nhóm mẫu chọn ngẫu nhiên ước lượng không chệch gradient đầy đủ. Hai kết quả này được phát biểu lại ở Mục 5.

## Bảng ký hiệu

Bảng chỉ gồm ký hiệu dùng xuyên suốt chương; ký hiệu của một ví dụ, một chứng minh hay một tình huống được giới thiệu tại chỗ. Chuẩn là chuẩn Euclid; $\log$ là logarit tự nhiên.

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $(x_i,y_i)$, $n$ | mẫu thứ $i$ gồm đầu vào và nhãn; số mẫu huấn luyện | $x_i\in\mathbb R^d$, $y_i\in\mathbb R$; $n\ge1$ |
| $f(x;\theta)$, $\theta$, $p$ | mô hình, vector tham số, số tham số | $\theta\in\mathbb R^p$ |
| $c$ | hệ số chặn của mô hình tuyến tính $w^\top x+c$ | $\mathbb R$ |
| $\ell$, $\ell_i(\theta)$ | mất mát, mặc định $\ell(f,y)=\tfrac12(f-y)^2$; mất mát trên mẫu $i$ | $\ell_i:\mathbb R^p\to\mathbb R$ |
| $F$, $R$ | rủi ro thực nghiệm $\tfrac1n\sum_i\ell_i$; rủi ro kỳ vọng | $\mathbb R^p\to\mathbb R$ |
| $m$ | số đơn vị ẩn của mạng hai tầng | $m\ge1$ |
| $W_1$, $b_1$, $w_2$, $b_2$ | tham số tầng ẩn và tầng ra; $b_1$, $b_2$ là độ chệch (bias) | $\mathbb R^{m\times d}$, $\mathbb R^m$, $\mathbb R^m$, $\mathbb R$ |
| $\sigma$ | hàm kích hoạt áp theo từng thành phần, mặc định $\sigma(z)=\max\{0,z\}$ | $\mathbb R\to\mathbb R$ |
| $z$, $h$ | tiền kích hoạt $W_1x+b_1$; kích hoạt $\sigma(z)$ | $\mathbb R^m$ |
| $e$, $\delta_h$, $\delta_z$ | sai số dự đoán $f-y$; đạo hàm của $\ell$ theo $h$ và theo $z$ | $\mathbb R$; $\mathbb R^m$ |
| $\theta_k$, $\eta$, $\eta_k$, $K$ | điểm lặp; bước hằng; bước tại bước lặp $k$; số bước | $\mathbb R^p$; $\eta,\eta_k>0$; $K\ge1$ |
| $b$, $B_k$ | kích thước nhóm nhỏ; nhóm chỉ số dùng ở bước $k$ | $1\le b\le n$; $B_k\subseteq\{1,\ldots,n\}$ |
| $\widehat g$, $\widehat g_k$ | gradient nhóm $\tfrac1b\sum_{i\in B}\nabla\ell_i$ | $\mathbb R^p$ |
| $\Sigma(\theta)$ | hiệp phương sai của gradient một mẫu chọn đều | ma trận $p\times p$ nửa xác định dương |
| $\sigma^2$, $\sigma_1^2$, $G^2$ | chặn phương sai của gradient ngẫu nhiên (H6b), không liên quan đến $\sigma$; chặn phương sai tổng của gradient một mẫu; chặn mômen bậc hai (H6a) | $\ge0$ |
| $L$, $\mu$, $\kappa$ | hằng số Lipschitz của $\nabla F$; hằng số lồi mạnh; số điều kiện $\kappa=L/\mu$ | $0<\mu\le L$; $\kappa\ge1$ |
| $F_{\inf}$, $\Delta_0$ | cận dưới đúng của $F$; $F(\theta_0)-F_{\inf}$ | $\mathbb R$; $\ge0$ |
| $\theta^*$, $D$ | một điểm cực tiểu; $\lVert\theta_0-\theta^*\rVert$ | $\mathbb R^p$; $\ge0$ |
| $\mathcal B$ | tổng ngân sách tính bằng số gradient mẫu | $\mathcal B>0$ |
| $\lambda$ | hệ số chính quy hóa $\ell_2$ (chính quy hóa bậc hai của Bài 05) | $\lambda>0$ |

Ba bộ dữ liệu xuyên suốt được dùng lại ở nhiều mục; mỗi khối ví dụ nêu lại dữ kiện của nó.

- **Dữ liệu XOR**: bốn đầu vào $(0,0)$, $(0,1)$, $(1,0)$, $(1,1)$ với nhãn $y=0,1,1,0$.
- **Mạng tuyến tính một đơn vị**: $F(u,v)=\tfrac12(uv-1)^2$, sinh từ một mẫu $x=1$, $y=1$ và mô hình $f=v\,u\,x$.
- **Dữ liệu bốn điểm**: $x=(-1,0,1,2)$, $y=(1,0,1,4)$, mô hình $f(x;w,c)=wx+c$, tham số $\theta=(w,c)$.

Mọi số liệu của các ví dụ là số liệu sư phạm tự xây dựng, trừ bảng RCV1 ở Mục 5.2 lấy từ tài liệu đã dẫn. Các giá trị được tính bằng phân số chính xác khi có thể.

## 1. Bài toán huấn luyện khi mô hình và dữ liệu lớn

Bài 05 khép lại với hai giới hạn có số liệu cụ thể. Giới hạn thứ nhất thuộc về phương pháp: mỗi bước hạ gradient trên $n$ mẫu với $d$ tham số tốn khoảng $nd$ phép nhân–cộng, mỗi bước Newton tốn khoảng $nd^2+d^3$ (Mệnh đề 05.35). Với $n=d=10^9$, riêng một bước hạ gradient đã cần $10^{18}$ phép tính, tức khoảng $11{,}6$ ngày trên một máy giả định thực hiện $10^{12}$ phép mỗi giây. Giới hạn thứ hai thuộc về mô hình: trên bốn điểm XOR, không điểm số affine nào phân lớp đúng cả bốn điểm (Mệnh đề 05.40). Thêm đặc trưng thủ công sửa được giới hạn này, nhưng với $d$ biến đầu vào và mọi đơn thức tới bậc $q$, số đặc trưng là $\binom{d+q}q$ (Mệnh đề 05.41).

Để vượt qua cả hai giới hạn, chúng ta cần một mô hình có đặc trưng học được từ dữ liệu và một phương pháp có chi phí mỗi bước không phụ thuộc $n$. Bài toán trung tâm của chương là huấn luyện bằng gradient một mô hình như vậy, đủ để biểu diễn XOR, khi một gradient đầy đủ vượt ngân sách mỗi bước. Bốn câu hỏi được trả lời lần lượt: mô hình nào biểu diễn được XOR và khi đó tính lồi còn giữ hay không (Mục 2); gradient theo mọi tham số được tính với chi phí bao nhiêu (Mục 3); gradient bằng $0$ hoặc gradient nhỏ chứng nhận điều gì khi mục tiêu không lồi (Mục 4); tốc độ hội tụ nào còn lại khi gradient đầy đủ được thay bằng gradient trên một nhóm nhỏ mẫu (Mục 5 và Mục 6).

### 1.1 Rủi ro thực nghiệm và rủi ro kỳ vọng

Mọi bài toán của chương có chung một dạng: từ $n$ mẫu, chọn tham số của một mô hình để mất mát trung bình nhỏ. Định nghĩa sau cố định các đối tượng và ký hiệu dùng cho đến hết chương.

::: definition Định nghĩa 06.1 (Bài toán huấn luyện)
Cho $n$ mẫu $(x_i,y_i)$, $i=1,\ldots,n$, với $x_i\in\mathbb R^d$ và $y_i\in\mathbb R$, được rút độc lập từ cùng một phân phối của cặp ngẫu nhiên $(X,Y)$. Cho một mô hình $f(x;\theta)$ với tham số $\theta\in\mathbb R^p$ và một hàm mất mát $\ell:\mathbb R\times\mathbb R\to\mathbb R$, lồi theo đối số thứ nhất.

**Mất mát trên mẫu $i$.** $\ell_i(\theta)=\ell\bigl(f(x_i;\theta),y_i\bigr)$.

**Rủi ro thực nghiệm.** $F(\theta)=\dfrac1n\displaystyle\sum_{i=1}^n\ell_i(\theta)$.

**Rủi ro kỳ vọng.** $R(\theta)=\mathbb E\,\ell\bigl(f(X;\theta),Y\bigr)$.

**Huấn luyện bằng gradient.** Dãy lặp $\theta_{k+1}=\theta_k-\eta_kg_k$, $k=0,1,2,\ldots$, trong đó $\eta_k>0$ là bước và $g_k\in\mathbb R^p$ là $\nabla F(\theta_k)$ hoặc gradient tính trên một nhóm mẫu.
:::

Trong định nghĩa trên, $R$ là đại lượng cần nhỏ, vì nó đo mất mát trên dữ liệu mới, còn $F$ là đại lượng tính được, vì nó chỉ dùng $n$ mẫu đã có. Huấn luyện là cực tiểu hóa $F$, nên mọi kết luận về $F$ chỉ có ý nghĩa với $R$ thông qua quan hệ thống kê giữa hai đại lượng. Quan hệ đó được phát biểu ở Mục 5.2 (Định lý 06.22).

Mất mát mặc định của chương là mất mát bình phương $\ell(f,y)=\tfrac12(f-y)^2$, được chọn vì nó cho các phép tính thủ công gọn. Mất mát logistic của Bài 05 cũng lồi theo $f$; các kết luận về tính không lồi ở Mục 2 vẫn giữ với mất mát đó (Nhận xét 06.10).

Định nghĩa 06.1 là Định nghĩa 05.5 và Định nghĩa 05c.51 viết với tham số $\theta$ và dãy lặp $\theta_k$. Các bài trước dùng những chữ khác cho cùng đối tượng, nên khi dẫn kết quả của các bài đó, chúng ta cần một bảng đối chiếu.

::: remark Nhận xét 06.2 (Đối chiếu ký hiệu với các bài trước)
1. Bài 05 viết đầu vào thô là $u$ và vector đặc trưng $x=\varphi(u)\in\mathbb R^d$ có một tọa độ hằng $1$, nên hệ số chặn nằm trong $w$ và số chiều $d$ của Bài 05 chính là số tham số. Trong chương này, đầu vào thô là $x\in\mathbb R^d$ và mô hình tuyến tính $w^\top x+c$ có hệ số chặn $c$ riêng, nên $p=d+1$. Bài 05 viết dãy lặp là $w_k$.
2. Bài 05b viết dãy lặp là $x_k\in\mathbb R^n$, hàm mục tiêu là $f$ và số mẫu là $N$. Khi dẫn một định lý của Bài 05b, $x_k$ đọc là $\theta_k$, $f$ đọc là $F$, số chiều $n$ đọc là $p$ và $N$ đọc là $n$.
3. Bài 05c viết rủi ro thực nghiệm là $J$, số mẫu là $N$ và số chiều tham số là $d$; ở đây là $F$, $n$ và $p$. Bài 05b và 05c gọi nhóm nhỏ là lô nhỏ.
4. Chữ $b$ không có chỉ số luôn là kích thước nhóm nhỏ. Độ chệch của mạng luôn có chỉ số, $b_1$ và $b_2$; hệ số chặn của mô hình tuyến tính là $c$.
5. Chữ $\sigma$ không bình phương là hàm kích hoạt của mạng (Mục 2, Mục 3); Bài 05 dùng $\sigma$ cho hàm sigmoid. Đại lượng $\sigma^2$ ở Mục 5 và Mục 6 là chặn phương sai của gradient ngẫu nhiên trong giả thiết H6b của Bài 05b; Bài 05 viết đại lượng này là $\tau^2$. Hai đại lượng $\sigma$ và $\sigma^2$ không liên quan đến nhau.
:::

### 1.2 Hai lý do xem xét lại khung lồi tất định

Các Bài 01–04 làm việc trong một khung lý thuyết gồm mục tiêu lồi có nghiệm chính xác và một phương pháp tất định có bảo đảm hội tụ tới nghiệm đó. Khi mô hình và dữ liệu lớn, khung này cần được xem xét lại vì hai lý do.

**Lý do thống kê.** Rủi ro thực nghiệm $F$ chỉ là đại lượng thay thế cho rủi ro kỳ vọng $R$. Trong Bài 05, chúng ta đã thấy hai bằng chứng rằng cực tiểu chính xác của $F$ không phải là đích: khi số đặc trưng tăng, nghiệm khớp dữ liệu huấn luyện tốt hơn nhưng dự đoán kém dần trên dữ liệu mới; và trên dữ liệu tách được, mất mát logistic không có điểm cực tiểu nếu không chính quy hóa (Định lý 05.22). Dừng sớm và chính quy hóa vì vậy là một phần của phương pháp.

**Lý do tính toán.** Khi một bước dùng đủ $n$ mẫu vượt ngân sách mỗi bước, chúng ta phải thay gradient đầy đủ bằng gradient trên một nhóm nhỏ mẫu chọn ngẫu nhiên. Phương pháp thu được là hạ gradient ngẫu nhiên (stochastic gradient descent, SGD). Nhiễu và tốc độ chậm hơn là điều phải đánh đổi để mỗi bước có chi phí không phụ thuộc $n$.

Bảng sau đặt hai khung cạnh nhau theo bốn dòng. Dòng **Đích** ứng với lý do thống kê; dòng **Bảo đảm** ứng với việc thay gradient đầy đủ bằng gradient nhóm; dòng **Biểu diễn** ứng với giới hạn biểu diễn của Bài 05; dòng **Chi phí** ứng với lý do tính toán.

| Dòng | Bài 01–04 | Mô hình và dữ liệu lớn |
|---|---|---|
| Đích | nghiệm chính xác của $F$ | $F$ chỉ thay thế cho $R$; mức chính xác đủ dùng do tập xác thực quyết định |
| Bảo đảm | tất định, $F$ giảm ở mỗi bước | với SGD, bảo đảm theo kỳ vọng và có số hạng nhiễu |
| Biểu diễn | mục tiêu lồi, điểm dừng là cực tiểu toàn cục | mô hình phi tuyến, mục tiêu không lồi, chỉ còn điểm dừng xấp xỉ |
| Chi phí | $n$ mẫu ở mỗi bước | nhóm $b$ mẫu, chi phí mỗi bước không phụ thuộc $n$ |

Bảng này chưa phải kết quả; mỗi ô của cột phải được chứng minh ở một mục sau. Dòng Biểu diễn được xử lý ở Mục 2 và Mục 4, dòng Chi phí ở Mục 3 và Mục 5, dòng Bảo đảm ở Mục 6, dòng Đích ở Mục 5.2 và Mục 6.6. Ở Mục 7, chúng ta đọc lại bảng với số hiệu của các kết quả đã chứng minh.

Một nhầm lẫn thường gặp là đọc lý do tính toán thành khẳng định "SGD nhanh hơn hạ gradient". Trên một bài toán lồi mạnh cố định, nếu chi phí không bị giới hạn, hạ gradient đầy đủ có tốc độ tuyến tính, còn SGD chỉ có tốc độ $O(1/k)$ theo kỳ vọng. Lý do tính toán chỉ nói rằng khi một bước dùng đủ $n$ mẫu không thực hiện được trong ngân sách mỗi bước, SGD là phương pháp còn dùng được. Lý do thống kê bổ sung rằng độ chính xác SGD đạt được thường đủ cho đích thật là $R$.

Trong Mục 2, chúng ta bắt đầu từ giới hạn biểu diễn, vì mô hình được chọn ở đó quyết định hàm $F$ mà mọi mục sau phải tối ưu.

## 2. Biểu diễn phi tuyến và mạng hai tầng

Bài toán XOR (phép "hoặc loại trừ") nhận hai bit và trả về $1$ khi đúng một bit bằng $1$. Với bốn đầu vào $(0,0)$, $(0,1)$, $(1,0)$, $(1,1)$ và nhãn $y=0,1,1,0$, bốn điểm vừa là toàn bộ dữ liệu huấn luyện vừa là toàn bộ miền quan tâm, nên câu hỏi tổng quát hóa không đặt ra (Goodfellow, Bengio và Courville, 2016, mục 6.1). Câu hỏi duy nhất là một lớp mô hình có chứa một hàm khớp đúng bốn điểm hay không.

Trong Bài 05, chúng ta đã trả lời câu hỏi đó cho điểm số affine và đã thấy cách sửa bằng đặc trưng thủ công. Để vượt qua giới hạn này mà không liệt kê đặc trưng, chúng ta cần một mô hình tự học phép biến đổi đặc trưng, và cần biết mô hình đó làm thay đổi bài toán tối ưu ra sao. Trong mục này, chúng ta dựng mô hình đó, mạng hai tầng, rồi chứng minh rủi ro thực nghiệm của nó không còn lồi.

![Bốn đỉnh của hình vuông đơn vị trên mặt phẳng x₁, x₂. Hai điểm (0, 0) và (1, 1) có nhãn y = 0, vẽ bằng ô vuông rỗng; hai điểm (0, 1) và (1, 0) có nhãn y = 1, vẽ bằng hình tròn đặc. Hai lớp nằm trên hai đường chéo của hình vuông.](img/lec-06/xor-points.svg)

Trên hình, hai lớp nằm trên hai đường chéo của hình vuông đơn vị. Một đường thẳng chia mặt phẳng thành hai nửa; muốn phân lớp đúng, nó phải để hai đầu của một đường chéo ở cùng một phía và hai đầu của đường chéo kia ở phía còn lại. Ở Mục 2.1, ta biến quan sát hình học này thành một chứng minh.

### 2.1 Bài toán XOR và giới hạn của mô hình tuyến tính

Trước khi phát biểu tổng quát, ta thử mô hình tuyến tính tốt nhất theo nghĩa bình phương nhỏ nhất. Mô hình là $f(x;w,c)=w^\top x+c$ với $w\in\mathbb R^2$, $c\in\mathbb R$, và một đầu vào được xếp vào lớp $1$ khi $f>\tfrac12$, trung điểm của hai nhãn.

::: example Ví dụ 06.1 (Bình phương nhỏ nhất affine trên XOR)
**Dữ kiện.** Bốn đầu vào $(0,0)$, $(0,1)$, $(1,0)$, $(1,1)$ với nhãn $y=(0,1,1,0)$; mô hình $f(x;w,c)=w_1x_1+w_2x_2+c$; rủi ro thực nghiệm $F(w,c)=\tfrac14\sum_{i=1}^4\tfrac12\bigl(f(x_i)-y_i\bigr)^2$.

**Phương trình chuẩn.** Ma trận thiết kế $A$ có các hàng $(x_1,x_2,1)$, tức $(0,0,1)$, $(0,1,1)$, $(1,0,1)$, $(1,1,1)$. Điểm cực tiểu của $F$ là nghiệm của $A^\top A\,(w_1,w_2,c)^\top=A^\top y$, với

$$
A^\top A=\begin{pmatrix}2&1&2\\1&2&2\\2&2&4\end{pmatrix},\qquad A^\top y=\begin{pmatrix}1\\1\\2\end{pmatrix}.
$$

**Nghiệm.** Thế $(w_1,w_2,c)=(0,0,\tfrac12)$: hàng thứ nhất cho $0+0+1=1$, hàng thứ hai cho $0+0+1=1$, hàng thứ ba cho $0+0+2=2$. Ma trận $A^\top A$ có định thức $2(8-4)-1(4-4)+2(2-4)=4\ne0$, nên đây là nghiệm duy nhất.

**Giá trị mục tiêu.** Mô hình trả về $\tfrac12$ tại mọi đầu vào, phần dư bằng $\pm\tfrac12$ tại cả bốn điểm, nên

$$
F=\frac14\cdot4\cdot\frac12\cdot\frac14=\frac18 .
$$

**Diễn giải.** Mô hình tuyến tính tốt nhất theo bình phương nhỏ nhất cho cùng một dự đoán ở mọi đầu vào, đúng bằng ngưỡng $\tfrac12$, nên không phân biệt được hai lớp.

**Kiểm tra lại.** Tổng nhãn bằng $2$ trên bốn mẫu, nên một hằng số tối ưu là trung bình nhãn $\tfrac12$; nghiệm tìm được chính là hằng số đó với $w=0$.
:::

Ví dụ cho thấy bình phương nhỏ nhất thất bại, nhưng chưa loại trừ một bộ $(w,c)$ nào khác phân lớp đúng. Để loại trừ mọi bộ tham số, ta cần khái niệm tách được tuyến tính của Bài 05, phát biểu lại với nhãn $\pm1$.

::: definition Định nghĩa 06.3 (Tách được tuyến tính)
Cho các mẫu $(x_i,y_{\pm,i})$, $i=1,\ldots,n$, với $x_i\in\mathbb R^d$ và nhãn $y_{\pm,i}\in\{-1,+1\}$. Dữ liệu **tách được tuyến tính** (linearly separable) nếu tồn tại $w\in\mathbb R^d$ và $c\in\mathbb R$ sao cho điểm số $g(x)=w^\top x+c$ thỏa

$$
y_{\pm,i}\,g(x_i)>0,\qquad i=1,\ldots,n.
$$
:::

Định nghĩa 06.3 là Định nghĩa 05.20 viết với hệ số chặn riêng $c$. Với nhãn $\{0,1\}$ của XOR, đặt $y_\pm=2y-1$, ta có $+1$ cho $(0,1)$, $(1,0)$ và $-1$ cho $(0,0)$, $(1,1)$. Với mô hình của Ví dụ 06.1 và $g=f-\tfrac12$, điều kiện $y_{\pm,i}\,g(x_i)>0$ nói rằng $f>\tfrac12$ ở lớp $1$ và $f<\tfrac12$ ở lớp $0$, tức phân lớp đúng bằng ngưỡng $\tfrac12$. Tách được tuyến tính là một tính chất của dữ liệu và không gian đặc trưng, không phụ thuộc thuật toán dùng để tìm $(w,c)$.

::: proposition Mệnh đề 06.4 (XOR không tách được tuyến tính)
**Giả thiết.** Bốn điểm XOR với nhãn $y_\pm=+1$ tại $(0,1)$, $(1,0)$ và $y_\pm=-1$ tại $(0,0)$, $(1,1)$; điểm số affine $g(x)=w_1x_1+w_2x_2+c$ với $w_1,w_2,c\in\mathbb R$ tùy ý.

**Kết luận.** Không bộ $(w_1,w_2,c)$ nào cho $y_{\pm,i}\,g(x_i)>0$ tại cả bốn điểm.

**Điều kiện áp dụng.** Mọi điểm số affine theo hai tọa độ gốc $(x_1,x_2)$.

**Phạm vi.** Kết luận chỉ dùng giá trị của $g$ tại bốn điểm, nên không phụ thuộc cách mã hóa nhãn hay hàm mất mát.
:::

::: proof Chứng minh Mệnh đề 06.4
**Bước 1 (đẳng thức tổng).** Với mọi $(w_1,w_2,c)$,

$$
\begin{aligned}
g(1,0)+g(0,1)&=(w_1+c)+(w_2+c)\\
&=w_1+w_2+2c\\
&=c+(w_1+w_2+c)\\
&=g(0,0)+g(1,1).
\end{aligned}
$$

Các dấu bằng chỉ dùng định nghĩa của $g$ tại bốn điểm.

**Bước 2 (mâu thuẫn).** Tách được đòi $g(1,0)>0$ và $g(0,1)>0$, nên vế trái dương; đồng thời đòi $g(0,0)<0$ và $g(1,1)<0$, nên vế phải âm. Theo Bước 1, hai vế bằng nhau, mâu thuẫn. $\square$
:::

![Bốn điểm XOR trên hình vuông đơn vị. Đường chéo liền nối hai điểm lớp 1, (0, 1) và (1, 0); đường chéo nét đứt nối hai điểm lớp 0, (0, 0) và (1, 1). Hai đường chéo cắt nhau tại trung điểm chung (½, ½), đánh dấu bằng vòng tròn rỗng.](img/lec-06/xor-diagonals.svg)

Đẳng thức tổng có một nghĩa hình học. Hai đường chéo của hình vuông có chung trung điểm $(\tfrac12,\tfrac12)$, và giá trị của một hàm affine tại trung điểm của một đoạn bằng trung bình giá trị tại hai đầu mút. Nếu $g>0$ tại hai điểm lớp $1$ thì $g(\tfrac12,\tfrac12)>0$; nếu $g<0$ tại hai điểm lớp $0$ thì $g(\tfrac12,\tfrac12)<0$. Một điểm không thể có cả hai dấu.

Mệnh đề 06.4 là Mệnh đề 05.40 (kết luận 1) phát biểu lại; chứng minh dùng cùng đẳng thức tổng. Mệnh đề mạnh hơn Ví dụ 06.1 ở chỗ nó loại trừ mọi $(w,c)$, không chỉ nghiệm bình phương nhỏ nhất. Ngược lại, nó không nói gì về mô hình có đặc trưng khác $(x_1,x_2)$; khả năng này được xét ở Mục 2.2.

### 2.2 Đặc trưng thủ công và chi phí theo số chiều

Mệnh đề 06.4 đặt giới hạn vào không gian đặc trưng, nên đổi không gian đặc trưng thì giới hạn có thể mất. Cách đơn giản nhất là thêm tích $x_1x_2$.

::: example Ví dụ 06.2 (Đặc trưng tích làm XOR biểu diễn được tuyến tính)
**Dữ kiện.** Bốn điểm XOR với nhãn $y=(0,1,1,0)$; đặc trưng $\varphi(x)=(x_1,x_2,x_1x_2)$; mô hình $w_0+w_1x_1+w_2x_2+w_3x_1x_2$.

**Hệ điều kiện khớp đúng.** Bốn điểm cho bốn phương trình:

- tại $(0,0)$: $w_0=0$;
- tại $(0,1)$: $w_0+w_2=1$;
- tại $(1,0)$: $w_0+w_1=1$;
- tại $(1,1)$: $w_0+w_1+w_2+w_3=0$.

**Nghiệm.** Ba phương trình đầu cho $w_0=0$, $w_1=w_2=1$; phương trình cuối cho $w_3=-2$. Hàm khớp đúng là $f=x_1+x_2-2x_1x_2$, và nghiệm là duy nhất vì bốn phương trình xác định bốn ẩn.

**Kiểm tra lại.** $f(0,0)=0$, $f(0,1)=f(1,0)=1$, $f(1,1)=1+1-2=0$.
:::

Cách sửa này cần biết trước dạng tương tác. Khi không biết, phải thêm mọi đơn thức tới một bậc $q$, và Mệnh đề 05.41 cho số đơn thức bậc không quá $q$ của $d$ biến, kể cả đơn thức hằng, là $\binom{d+q}q$. Ký hiệu $q$ được chọn để không trùng số tham số $p$; Bài 05 viết cùng công thức là $\binom{d_0+q}q$ với $d_0$ biến đầu vào, vì ở đó $d$ là số đặc trưng.

| $d$ | $q=1$ | $q=2$ | $q=3$ |
|---:|---:|---:|---:|
| $2$ | $3$ | $6$ | $10$ |
| $100$ | $101$ | $5\,151$ | $176\,851$ |
| $1000$ | $1\,001$ | $501\,501$ | $167\,668\,501$ |

Bảng cho thấy số đặc trưng tăng như $d^q/q!$. Với $d=1000$ và $q=2$, mô hình có $p=501\,501$ tham số, và riêng phần giải hệ của một bước Newton đã cần khoảng $p^3\approx1{,}26\cdot10^{17}$ phép tính. Đặc trưng thủ công khắc phục giới hạn biểu diễn bằng cách tăng số chiều, và chi phí mỗi bước tăng theo: $O(np)$ cho hạ gradient, $O(np^2+p^3)$ cho Newton. Trong phần hồi quy nhiều chiều của Bài 05, chúng ta còn thấy một hệ quả thống kê: khi số đặc trưng tăng, sai số trên dữ liệu mới tăng dần. Hai hệ quả này tạo nhu cầu cho một phép biến đổi đặc trưng có tham số, học được từ dữ liệu, thay cho việc liệt kê mọi đơn thức.

### 2.3 Phép biến đổi đặc trưng bằng tầng ẩn

Về mặt ý tưởng, thay vì cố định $\varphi$, ta muốn mỗi đặc trưng là một hàm đơn giản của một tổ hợp affine của đầu vào, với hệ số của tổ hợp là tham số. Điều này chưa phải định nghĩa; ví dụ sau cho thấy một lựa chọn cụ thể của các hệ số đã đủ cho XOR.

::: example Ví dụ 06.3 (Hai đặc trưng chỉnh lưu cho XOR)
**Dữ kiện.** Bốn điểm XOR; hai đặc trưng $h_1=\max\{0,x_1-x_2\}$ và $h_2=\max\{0,x_2-x_1\}$.

**Ảnh của bốn điểm.**

| $x$ | $x_1-x_2$ | $h=(h_1,h_2)$ | $h_1+h_2$ | $y$ |
|---|---:|---|---:|---:|
| $(0,0)$ | $0$ | $(0,0)$ | $0$ | $0$ |
| $(0,1)$ | $-1$ | $(0,1)$ | $1$ | $1$ |
| $(1,0)$ | $1$ | $(1,0)$ | $1$ | $1$ |
| $(1,1)$ | $0$ | $(0,0)$ | $0$ | $0$ |

**Tách trong không gian $h$.** Đường thẳng $h_1+h_2=\tfrac12$ tách gốc, ảnh của hai điểm lớp $0$, khỏi hai điểm $(1,0)$ và $(0,1)$, ảnh của hai điểm lớp $1$.

**Kiểm tra lại.** Với $g(h)=h_1+h_2-\tfrac12$ và $y_\pm=2y-1$: tại lớp $0$, $y_\pm g=(-1)(-\tfrac12)=\tfrac12>0$; tại lớp $1$, $y_\pm g=(+1)(\tfrac12)=\tfrac12>0$.
:::

![Hai khung. Khung thứ nhất: bốn điểm XOR trong không gian đầu vào, hai lớp nằm trên hai đường chéo. Khung thứ hai: ảnh qua h₁ = max(0, x₁ − x₂), h₂ = max(0, x₂ − x₁). Hai điểm lớp 0, (0, 0) và (1, 1), cùng đi tới gốc; điểm (1, 0) đi tới (1, 0); điểm (0, 1) đi tới (0, 1). Đường nét đứt h₁ + h₂ = ½ tách gốc khỏi hai điểm lớp 1.](img/lec-06/xor-feature-map.svg)

Trên hình, phép biến đổi gộp hai điểm lớp $0$ vào cùng một điểm. Sau phép gộp đó, hai lớp không còn nằm trên hai đường chéo có chung trung điểm, nên lập luận của Mệnh đề 06.4 không còn áp dụng. Goodfellow, Bengio và Courville (2016, Hình 6.1) dùng một phép biến đổi khác với cùng ý tưởng: học một không gian đặc trưng trong đó bài toán trở thành tuyến tính.

Yếu tố quyết định là hàm $\max\{0,\cdot\}$. Mệnh đề sau cho thấy không phép biến đổi affine nào làm được việc của Ví dụ 06.3, dù chọn bao nhiêu đặc trưng.

::: proposition Mệnh đề 06.5 (Đặc trưng affine không làm XOR tách được)
**Giả thiết.** $\varphi(x)=Ax+a$ với $A\in\mathbb R^{m\times2}$, $a\in\mathbb R^m$, $m\ge1$ tùy ý; bốn điểm XOR với nhãn $y_\pm$ như Mệnh đề 06.4.

**Kết luận.** Các ảnh $\varphi(x_i)$ với nhãn $y_{\pm,i}$ không tách được tuyến tính trong $\mathbb R^m$.

**Điều kiện áp dụng.** $\varphi$ affine.

**Phạm vi.** Mệnh đề nói về mọi đặc trưng affine của đầu vào; nó không áp dụng cho đặc trưng có hàm phi tuyến như Ví dụ 06.2 hay Ví dụ 06.3.
:::

::: proof Chứng minh Mệnh đề 06.5
Giả sử có $v\in\mathbb R^m$ và $c\in\mathbb R$ để $g(h)=v^\top h+c$ tách các ảnh. Hàm hợp

$$
x\mapsto g(\varphi(x))=v^\top(Ax+a)+c=(A^\top v)^\top x+(v^\top a+c)
$$

là một điểm số affine theo $(x_1,x_2)$ và có cùng dấu với $g$ tại mỗi điểm XOR. Khi đó nó tách bốn điểm XOR, trái với Mệnh đề 06.4. $\square$
:::

Như vậy, một đặc trưng học được phải chứa một hàm phi tuyến. Goodfellow, Bengio và Courville (2016, mục 6.3, tr. 191) gọi hàm $\max\{0,z\}$ là lựa chọn mặc định tốt cho đơn vị ẩn; ta cũng dùng nó làm hàm kích hoạt mặc định.

### 2.4 Mạng hai tầng

Ghép các đặc trưng có tham số của Mục 2.3 với một tầng tuyến tính ở đầu ra, ta được lớp mô hình sau.

::: definition Định nghĩa 06.6 (Mạng nơ-ron hai tầng)
Cho các số nguyên dương $d$ (số đầu vào) và $m$ (số đơn vị ẩn), ma trận trọng số $W_1\in\mathbb R^{m\times d}$, vector độ chệch (bias) $b_1\in\mathbb R^m$, vector trọng số tầng ra $w_2\in\mathbb R^m$, độ chệch tầng ra $b_2\in\mathbb R$ và một hàm $\sigma:\mathbb R\to\mathbb R$, áp theo từng thành phần khi đối số là vector.

**Mạng hai tầng** là hàm

$$
f(x;\theta)=w_2^\top\sigma(W_1x+b_1)+b_2,\qquad x\in\mathbb R^d,
\tag{2.1}
$$

với tham số $\theta=(W_1,b_1,w_2,b_2)\in\mathbb R^p$, $p=md+2m+1$.

**Tiền kích hoạt** (pre-activation) là $z=W_1x+b_1\in\mathbb R^m$; **kích hoạt** là $h=\sigma(z)\in\mathbb R^m$; $\sigma$ là **hàm kích hoạt**. Phép tính lần lượt $z$, $h$, $f$ gọi là **truyền xuôi** (forward pass).

**Hàm tuyến tính chỉnh lưu** (rectified linear unit, ReLU) là $\sigma(z)=\max\{0,z\}$; nó khả vi tại mọi $z\ne0$, và $z=0$ là **điểm gãy**.
:::

Trong định nghĩa trên, hàng thứ $j$ của $W_1$ cùng phần tử thứ $j$ của $b_1$ xác định đơn vị ẩn thứ $j$: đơn vị này tính $z_j=[W_1]_{j,:}x+[b_1]_j$ rồi $h_j=\sigma(z_j)$. Đầu ra là một tổ hợp tuyến tính của $m$ đặc trưng $h_j$ cộng độ chệch. Số tham số $p=md+2m+1$ đếm $md$ phần tử của $W_1$, $m$ phần tử của mỗi vector $b_1$, $w_2$ và một phần tử $b_2$.

![Sơ đồ mạng 2–2–1. Hai nút đầu vào x₁, x₂ nối tới hai đơn vị ẩn qua trọng số W₁ và độ chệch b₁; mỗi đơn vị ẩn tính tiền kích hoạt z và kích hoạt h = σ(z). Hai đơn vị ẩn nối tới đầu ra f = w₂ᵀh + b₂.](img/lec-06/two-layer-network.svg)

Sơ đồ ứng với trường hợp $d=m=2$: mỗi mũi tên từ đầu vào tới đơn vị ẩn mang một phần tử của $W_1$, mỗi mũi tên từ đơn vị ẩn tới đầu ra mang một phần tử của $w_2$.

Mạng hai tầng chứa mô hình tuyến tính: lấy $m=1$, $\sigma(z)=z$, ta được lại $w^\top x+c$. Nó cũng chứa mọi mô hình tuyến tính theo một đặc trưng dạng $\sigma(\text{affine})$, như Ví dụ 06.3. Điểm khác với đặc trưng thủ công là các hệ số bên trong $\sigma$ nay là tham số cần học.

Mạng sâu lặp lại cấu trúc "affine rồi $\sigma$" nhiều lần; ở đây chỉ cần hai tầng.

::: example Ví dụ 06.4 (Mạng hai đơn vị ẩn biểu diễn XOR)
**Dữ kiện.** Bốn điểm XOR với nhãn $y=(0,1,1,0)$; mạng hai tầng với $d=m=2$, $\sigma(z)=\max\{0,z\}$ và tham số $\theta_A$:

$$
W_1=\begin{pmatrix}1&-1\\-1&1\end{pmatrix},\qquad b_1=\begin{pmatrix}0\\0\end{pmatrix},\qquad w_2=\begin{pmatrix}1\\1\end{pmatrix},\qquad b_2=0.
$$

**Truyền xuôi.** Hai hàng của $W_1$ cho $z_1=x_1-x_2$ và $z_2=x_2-x_1$, nên $h_1$, $h_2$ chính là hai đặc trưng của Ví dụ 06.3 và $f=h_1+h_2=\lvert x_1-x_2\rvert$.

| $x$ | $z$ | $h$ | $f$ | $y$ |
|---|---|---|---:|---:|
| $(0,0)$ | $(0,0)$ | $(0,0)$ | $0$ | $0$ |
| $(0,1)$ | $(-1,1)$ | $(0,1)$ | $1$ | $1$ |
| $(1,0)$ | $(1,-1)$ | $(1,0)$ | $1$ | $1$ |
| $(1,1)$ | $(0,0)$ | $(0,0)$ | $0$ | $0$ |

**Kết luận.** $f(x;\theta_A)=y$ tại cả bốn điểm, nên với mất mát bình phương, $F(\theta_A)=0$, giá trị nhỏ nhất có thể của $F$.

**Kiểm tra lại.** Tại $(0,0)$ và $(1,1)$, cả hai tiền kích hoạt bằng $0$, tức nằm đúng điểm gãy. Giá trị $\sigma(0)=0$ vẫn xác định, nên bảng không đổi; chỉ đạo hàm tại điểm gãy cần một quy ước, được nêu ở Mục 3.4.
:::

Ví dụ 06.4 cho thấy mạng hai tầng biểu diễn được XOR. Câu hỏi tiếp theo là vai trò của $\sigma$: nếu bỏ tính phi tuyến, mạng còn biểu diễn được XOR hay không.

::: proposition Mệnh đề 06.7 (Mạng với kích hoạt tuyến tính là hàm affine)
**Giả thiết.** Mạng hai tầng (2.1) với $\sigma(z)=z$.

**Kết luận.** Với mọi $\theta$,

$$
f(x;\theta)=(W_1^\top w_2)^\top x+(w_2^\top b_1+b_2),
$$

là một hàm affine của $x$. Đặc biệt, khi $d=2$, không mạng nào như vậy phân lớp đúng bốn điểm XOR bằng ngưỡng $\tfrac12$.

**Điều kiện áp dụng.** Hàm kích hoạt đồng nhất, hoặc affine.

**Phạm vi.** Kết luận về biểu diễn; tính lồi của rủi ro thực nghiệm theo $\theta$ được xét ở Mục 2.5.
:::

::: proof Chứng minh Mệnh đề 06.7
**Bước 1 (khai triển).** Với $\sigma(z)=z$, $f=w_2^\top(W_1x+b_1)+b_2=(w_2^\top W_1)x+w_2^\top b_1+b_2$, và $w_2^\top W_1=(W_1^\top w_2)^\top$.

**Bước 2 (XOR).** Hàm $f-\tfrac12$ là một điểm số affine theo $(x_1,x_2)$; nếu nó phân lớp đúng thì bốn điểm XOR tách được tuyến tính, trái với Mệnh đề 06.4. $\square$
:::

Với tham số $\theta_A$ của Ví dụ 06.4 và $\sigma(z)=z$, ta có $W_1^\top w_2=(1-1,\,-1+1)=(0,0)$ và $w_2^\top b_1+b_2=0$, nên mạng trả về $0$ tại mọi đầu vào. Như vậy, cùng một bộ tham số biểu diễn đúng XOR với ReLU nhưng thành hàm hằng khi bỏ hàm kích hoạt. Hai tầng tuyến tính chồng lên nhau vẫn là một hàm affine, nên $\sigma$ phải phi tuyến.

::: example Ví dụ 06.5 (Số tham số của hai mạng)
**Dữ kiện.** Mạng hai tầng với số tham số $p=md+2m+1$.

**Mạng XOR.** $d=m=2$: $p=4+4+1=9$.

**Mạng cho ảnh $28\times28$ điểm ảnh.** $d=784$, $m=100$: $p=78\,400+200+1=78\,601$.

**Kiểm tra lại.** Với $d=784$, $m=100$: $W_1$ có $78\,400$ phần tử, $b_1$ và $w_2$ mỗi vector $100$ phần tử, $b_2$ một phần tử; tổng $78\,601$.
:::

Con số $78\,601$ được dùng lại ở Mục 3 để đếm chi phí của một gradient.

### 2.5 Rủi ro thực nghiệm của mạng và tính không lồi

Với mất mát bình phương, rủi ro thực nghiệm của mạng là

$$
F(\theta)=\frac1n\sum_{i=1}^n\frac12\bigl(f(x_i;\theta)-y_i\bigr)^2 .
\tag{2.2}
$$

Với mô hình tuyến tính $f=w^\top x+c$, mỗi số hạng là hợp của hàm lồi $t\mapsto\tfrac12(t-y_i)^2$ với ánh xạ affine $\theta\mapsto w^\top x_i+c$, nên lồi theo $\theta=(w,c)$ (Định lý 01.31(b)), và $F$ lồi như một tổng không âm của các hàm lồi. Với mạng, $f$ chứa tích của tham số tầng ra $w_2$ với kích hoạt $\sigma(W_1x+b_1)$ của tham số tầng ẩn, nên $\theta\mapsto f(x_i;\theta)$ không affine, và quy tắc hợp thành không áp dụng (Boyd và Vandenberghe, 2004, mục 3.2.2). "Không được bảo đảm lồi" chưa phải "không lồi"; để chứng minh $F$ không lồi, ta cần một phản ví dụ, và phản ví dụ đến từ một tính chất đối xứng của mạng.

::: example Ví dụ 06.6 (Đổi chỗ hai đơn vị ẩn)
**Dữ kiện.** Tham số $\theta_A$ của Ví dụ 06.4: $W_1=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, $b_1=(0,0)$, $w_2=(1,1)$, $b_2=0$, với $f(x;\theta_A)=\lvert x_1-x_2\rvert$ trên bốn điểm XOR.

**Đổi chỗ.** Đổi chỗ hai đơn vị ẩn là đổi chỗ đồng thời hai hàng của $W_1$, hai phần tử của $b_1$ và hai phần tử của $w_2$. Vì $b_1$ và $w_2$ có hai phần tử bằng nhau, chỉ $W_1$ đổi, và ta được $\theta_B$:

$$
W_1=\begin{pmatrix}-1&1\\1&-1\end{pmatrix},\qquad b_1=(0,0),\qquad w_2=(1,1),\qquad b_2=0.
$$

**Hàm thu được.** Đơn vị ẩn thứ nhất của $\theta_B$ tính $\max\{0,x_2-x_1\}$, đơn vị thứ hai tính $\max\{0,x_1-x_2\}$; tổng vẫn là $\lvert x_1-x_2\rvert$. Vậy $\theta_B\ne\theta_A$ nhưng $f(\cdot;\theta_B)=f(\cdot;\theta_A)$ và $F(\theta_B)=0$.

**Kiểm tra lại.** Tại $(0,1)$: $z=(1,-1)$, $h=(1,0)$, $f=1$, đúng nhãn.
:::

Hiện tượng trong ví dụ không phụ thuộc số liệu: thứ tự đánh số các đơn vị ẩn không ảnh hưởng tới hàm mà mạng tính. Mệnh đề sau phát biểu điều đó cho mọi phép hoán vị.

::: proposition Mệnh đề 06.8 (Đối xứng hoán vị các đơn vị ẩn)
**Giả thiết.** Mạng hai tầng (2.1) với $\sigma$ áp theo từng thành phần; $P\in\mathbb R^{m\times m}$ là một ma trận hoán vị. Ký hiệu $P\theta=(PW_1,Pb_1,Pw_2,b_2)$.

**Kết luận.** Với mọi $x\in\mathbb R^d$, $f(x;P\theta)=f(x;\theta)$. Do đó $F(P\theta)=F(\theta)$ với mọi dữ liệu và mọi hàm mất mát.

**Điều kiện áp dụng.** Mọi hàm kích hoạt áp theo từng thành phần.

**Phạm vi.** Một mạng có $m$ đơn vị ẩn có $m!$ cách sắp thứ tự các đơn vị; khi các đơn vị có tham số đôi một khác nhau, mỗi điểm $\theta$ có $m!$ bản sao phân biệt cho cùng một hàm.
:::

::: proof Chứng minh Mệnh đề 06.8
**Bước 1 (hoán vị đi qua $\sigma$).** Phép nhân với $P$ chỉ sắp lại thứ tự các thành phần, còn $\sigma$ tác động riêng lên từng thành phần, nên $\sigma(Pz)=P\sigma(z)$ với mọi $z\in\mathbb R^m$.

**Bước 2 (tính đầu ra).** Theo Bước 1 và vì $P^\top P=I$ với ma trận hoán vị,

$$
\begin{aligned}
f(x;P\theta)&=(Pw_2)^\top\sigma(PW_1x+Pb_1)+b_2\\
&=w_2^\top P^\top P\,\sigma(W_1x+b_1)+b_2\\
&=w_2^\top\sigma(W_1x+b_1)+b_2=f(x;\theta).
\end{aligned}
$$

**Bước 3 (rủi ro).** $F(\theta)$ chỉ phụ thuộc $\theta$ qua các giá trị $f(x_i;\theta)$, nên $F(P\theta)=F(\theta)$. $\square$
:::

Mệnh đề 06.8 nói rằng ánh xạ $\theta\mapsto f(\cdot;\theta)$ từ tham số tới hàm không đơn ánh. Goodfellow, Bengio và Courville (2016, mục 8.2.2, tr. 284) gọi hiện tượng này là đối xứng không gian trọng số (weight space symmetry), và ghi nhận rằng với mạng ReLU còn có một đối xứng thứ hai: nhân trọng số và độ chệch đi vào một đơn vị với $\omega>0$ và chia trọng số đi ra cho $\omega$ không đổi hàm.

Một hệ quả cho khởi tạo cũng suy ra trực tiếp: nếu hai đơn vị ẩn được khởi tạo giống hệt nhau, chúng nhận cùng gradient và giữ giống nhau sau mọi bước; khởi tạo được trình bày ở Bài 06b.

Từ một cực tiểu toàn cục, đối xứng hoán vị sinh ra một cực tiểu toàn cục khác. Ghép điều này với tính lồi của tập nghiệm (Hệ quả 01.34), ta được một phép kiểm tra tính lồi.

::: proposition Mệnh đề 06.9 (Phép kiểm tra tính lồi bằng đối xứng hoán vị)
**Giả thiết.** $F$ là rủi ro thực nghiệm (2.2) của một mạng hai tầng; $F$ đạt cực tiểu toàn cục tại $\theta^*$; hai đơn vị ẩn $j\ne j'$ của $\theta^*$ có tham số khác nhau, tức $([W_1]_{j,:},[b_1]_j,[w_2]_j)\ne([W_1]_{j',:},[b_1]_{j'},[w_2]_{j'})$; $P$ là ma trận hoán vị đổi chỗ $j$ và $j'$.

**Kết luận.**

1. $P\theta^*\ne\theta^*$ và $P\theta^*$ cũng là cực tiểu toàn cục của $F$.
2. Nếu $F$ lồi thì mọi điểm của đoạn $[\theta^*,P\theta^*]$ là cực tiểu toàn cục.
3. Do đó, nếu tồn tại $t\in(0,1)$ với $F\bigl((1-t)\theta^*+tP\theta^*\bigr)>F(\theta^*)$ thì $F$ không lồi.

**Điều kiện áp dụng.** Cần một cực tiểu toàn cục có hai đơn vị khác nhau.

**Phạm vi.** Mệnh đề là một phép kiểm tra, không khẳng định mọi mạng trên mọi dữ liệu đều cho $F$ không lồi.
:::

::: proof Chứng minh Mệnh đề 06.9
**Bước 1 (kết luận 1).** Theo Mệnh đề 06.8, $F(P\theta^*)=F(\theta^*)=\min F$. Phép đổi chỗ $j$, $j'$ thay các hàng $j$, $j'$ của bộ $(W_1,b_1,w_2)$ cho nhau; vì hai hàng đó khác nhau, $P\theta^*\ne\theta^*$.

**Bước 2 (kết luận 2).** Nếu $F$ lồi, tập nghiệm $\{\theta: F(\theta)=\min F\}$ là tập lồi (Hệ quả 01.34). Tập này chứa $\theta^*$ và $P\theta^*$, nên chứa cả đoạn nối hai điểm.

**Bước 3 (kết luận 3).** Điểm $(1-t)\theta^*+tP\theta^*$ thuộc đoạn nối nhưng có giá trị lớn hơn $\min F$, trái với kết luận 2. Vậy $F$ không lồi. $\square$
:::

Áp phép kiểm tra cho cặp $\theta_A$, $\theta_B=P\theta_A$ của Ví dụ 06.6, ta cần giá trị của $F$ trên đoạn nối hai tham số.

::: example Ví dụ 06.7 (Rủi ro thực nghiệm trên đoạn nối hai cực tiểu đối xứng)
**Dữ kiện.** Bốn điểm XOR với nhãn $y=(0,1,1,0)$; mất mát bình phương; $\theta_A$ có $W_1=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, $\theta_B$ có $W_1=\begin{pmatrix}-1&1\\1&-1\end{pmatrix}$, cả hai có $b_1=(0,0)$, $w_2=(1,1)$, $b_2=0$ và $F(\theta_A)=F(\theta_B)=0$.

**Tham số trên đoạn nối.** Với $t\in[0,1]$, $\theta(t)=(1-t)\theta_A+t\theta_B$ có $b_1$, $w_2$, $b_2$ không đổi và

$$
W_1(t)=(1-2t)\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

**Hàm của mạng.** Tiền kích hoạt là $z=(1-2t)(x_1-x_2,\ x_2-x_1)$. Hai thành phần đối dấu nhau, nên tổng phần dương của chúng bằng $\lvert1-2t\rvert\,\lvert x_1-x_2\rvert$, nên $f=\lvert1-2t\rvert\,\lvert x_1-x_2\rvert$.

**Rủi ro.** Tại $(0,0)$ và $(1,1)$, $f=0=y$. Tại $(0,1)$ và $(1,0)$, $f=\lvert1-2t\rvert$ và $y=1$, sai số bằng $1-\lvert1-2t\rvert$. Do đó

$$
\begin{aligned}
F(\theta(t))&=\frac14\cdot2\cdot\frac12\bigl(1-\lvert1-2t\rvert\bigr)^2\\
&=\frac14\bigl(1-\lvert1-2t\rvert\bigr)^2\\
&=\begin{cases}t^2,&0\le t\le\tfrac12,\\(1-t)^2,&\tfrac12\le t\le1.\end{cases}
\end{aligned}
$$

**Kết luận.** Tại $t=\tfrac12$, $W_1=0$, $f\equiv0$ và $F=\tfrac14>0$, trong khi hai đầu mút có $F=0$. Theo Mệnh đề 06.9, $F$ không lồi.

**Kiểm tra lại.** Tại $t=\tfrac14$, $W_1=\tfrac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, $f(0,1)=\tfrac12$, sai số $\tfrac12$, $F=\tfrac14\cdot2\cdot\tfrac12\cdot\tfrac14=\tfrac1{16}=t^2$.
:::

![Trục hoành t từ 0 đến 1, trục tung F(θ(t)) từ 0 đến 0,3. Đường liền bằng t² trên [0, ½] và (1 − t)² trên [½, 1], đạt đỉnh ¼ tại t = ½, nơi W₁ = 0. Hai đầu mút θ_A (t = 0) và θ_B (t = 1) có F = 0. Dây cung nét đứt nối hai cực tiểu nằm trên trục F = 0, dưới đồ thị, nên F không lồi.](img/lec-06/xor-symmetric-path.svg)

Trên hình, dây cung nối hai điểm $(0,0)$ và $(1,0)$ của đồ thị nằm dưới đồ thị tại mọi $t\in(0,1)$, trái với định nghĩa hàm lồi (Định nghĩa 01.22), vốn đòi đồ thị nằm dưới dây cung. Đỉnh $\tfrac14$ đạt tại trung điểm, nơi hai đơn vị ẩn triệt tiêu nhau.

::: remark Nhận xét 06.10 (Phạm vi của kết luận không lồi)
1. **Không phụ thuộc mất mát bình phương.** Với nhãn $\pm1$ và mất mát logistic $\log(1+e^{-y_\pm f})$, hai tham số $\theta_A$, $\theta_B$ cho cùng giá trị $F=\tfrac12\bigl(\log2+\log(1+e^{-1})\bigr)\approx0{,}503$. Trung điểm của chúng cho $f\equiv0$ và $F=\log2\approx0{,}693$, lớn hơn trung bình hai đầu mút, nên $F$ cũng không lồi.
2. **Không cần ReLU.** Mạng tuyến tính hai tầng, chỉ có tích tham số $w_2^\top W_1$, đã cho $F$ không lồi; trường hợp một đơn vị được xét ở Mục 4.2.
3. **Không áp dụng cho mọi mạng.** Mệnh đề 06.9 cần một cực tiểu toàn cục có hai đơn vị khác nhau. Nếu mọi cực tiểu toàn cục có các đơn vị trùng nhau, phép hoán vị không tạo cực tiểu mới và phép kiểm tra không kết luận.
4. **Nhầm lẫn thường gặp.** "Mất mát lồi theo $f$" không kéo theo "rủi ro lồi theo $\theta$". Tính lồi theo $\theta$ cần $\theta\mapsto f(x_i;\theta)$ affine, điều mạng không thỏa.
:::

Ở dòng 1 của nhận xét, giá trị $0{,}503$ tính như sau: tại $(0,0)$ và $(1,1)$, $f=0$ cho mất mát $\log2$; tại $(0,1)$ và $(1,0)$, $f=1$ và $y_\pm=1$ cho mất mát $\log(1+e^{-1})$; trung bình bốn mất mát là $\tfrac12\bigl(\log2+\log(1+e^{-1})\bigr)\approx\tfrac12(0{,}693+0{,}313)$.

**Trong học máy.** Rủi ro thực nghiệm của mọi mạng nơ-ron có đơn vị ẩn đều có đối xứng hoán vị, và mạng sâu có $s$ tầng ẩn, mỗi tầng $m$ đơn vị, có $(m!)^s$ cách sắp thứ tự (Goodfellow, Bengio và Courville, 2016, tr. 284). Vì vậy, cực tiểu toàn cục của mạng không duy nhất, và phép kiểm tra của Mệnh đề 06.9 bác bỏ tính lồi mỗi khi một cực tiểu toàn cục có hai đơn vị ẩn khác nhau.

Hệ quả cho tối ưu là các bảo đảm của Bài 04 dựa vào tính lồi, như "điểm dừng là cực tiểu toàn cục", không còn dùng được; những gì còn lại được xác định ở Mục 4. Hệ quả cho thực hành là cùng một mạng huấn luyện từ hai điểm khởi tạo khác nhau có thể cho hai bộ trọng số khác nhau nhưng dự đoán như nhau, nên so sánh trực tiếp trọng số của hai lần huấn luyện không có nghĩa.

::: exercise Bài tập 06.1 (Mạng một đơn vị với kích hoạt bình phương)
Cho bốn điểm XOR với nhãn $y=(0,1,1,0)$, mất mát bình phương và mạng một đơn vị ẩn $f(x;W_1,b_1,w_2,b_2)=w_2\,\sigma(W_1x+b_1)+b_2$ với $W_1\in\mathbb R^{1\times2}$, $b_1,w_2,b_2\in\mathbb R$ và $\sigma(z)=z^2$.

1. Với $W_1=(1,-1)$, $b_1=0$, $w_2=1$, $b_2=0$, tính $z$, $h$, $f$ tại bốn điểm và $F$.
2. Chứng minh rằng với $\sigma(z)=z^2$, tham số $(-W_1,-b_1,w_2,b_2)$ cho cùng hàm với $(W_1,b_1,w_2,b_2)$.
3. Tính $F$ dọc đoạn nối $W_1=(1,-1)$ và $W_1=(-1,1)$ (các tham số còn lại giữ nguyên), rồi kết luận về tính lồi của $F$.
:::

::: hint
Ở câu 2, dùng $(-z)^2=z^2$. Ở câu 3, viết $W_1(t)=(1-2t)(1,-1)$ và tính $f$ tại hai điểm có nhãn $1$; Mệnh đề 06.9 không áp dụng nguyên văn vì mạng chỉ có một đơn vị, nhưng lập luận ở Bước 2 của chứng minh vẫn dùng được.
:::

::: solution
1. $z=x_1-x_2$ bằng $0,-1,1,0$ tại $(0,0)$, $(0,1)$, $(1,0)$, $(1,1)$; $h=z^2$ bằng $0,1,1,0$; $f=h$ bằng $0,1,1,0$, đúng bằng nhãn. Vậy $F=0$.

2. Với mọi $x$, $\sigma(-W_1x-b_1)=(-(W_1x+b_1))^2=(W_1x+b_1)^2=\sigma(W_1x+b_1)$, nên đầu ra $w_2\sigma(\cdot)+b_2$ không đổi.

3. Với $W_1(t)=(1-2t)(1,-1)$, $f=(1-2t)^2(x_1-x_2)^2$. Tại $(0,0)$ và $(1,1)$, $f=0=y$. Tại $(0,1)$ và $(1,0)$, $f=(1-2t)^2$ và sai số là $1-(1-2t)^2$. Do đó

$$
F(t)=\frac14\cdot2\cdot\frac12\bigl(1-(1-2t)^2\bigr)^2=\frac14\bigl(1-(1-2t)^2\bigr)^2 .
$$

Tại $t=\tfrac12$, $F=\tfrac14$; tại $t=\tfrac14$, $F=\tfrac14\cdot(\tfrac34)^2=\tfrac9{64}$. Hai đầu mút là hai cực tiểu toàn cục với $F=0$ (câu 1 và câu 2). Nếu $F$ lồi, tập nghiệm là tập lồi (Hệ quả 01.34) và chứa cả đoạn nối, nhưng $F(\tfrac12)=\tfrac14>0$. Vậy $F$ không lồi.

**Kiểm tra.** Ở đây đối xứng là phép đổi dấu, không phải hoán vị: với một đơn vị, Mệnh đề 06.8 chỉ cho phép hoán vị đồng nhất, còn tính chẵn của $\sigma$ sinh ra bản sao $-W_1$.
:::

Như vậy, chúng ta đã thấy giới hạn biểu diễn của mô hình tuyến tính (Mệnh đề 06.4, 06.5) được khắc phục bằng mạng hai tầng với hàm kích hoạt phi tuyến (Định nghĩa 06.6, Ví dụ 06.4, Mệnh đề 06.7). Đặc trưng thủ công khắc phục giới hạn này bằng cách tăng số chiều; đặc trưng học được khắc phục nó nhưng làm mất tính lồi (Mệnh đề 06.8, 06.9, Ví dụ 06.7). Mạng biểu diễn XOR có $p=9$ tham số, còn mạng cho ảnh $28\times28$ có $78\,601$ tham số.

## 3. Lan truyền ngược trên đồ thị tính toán

Mọi phương pháp bậc nhất của Bài 04 và Bài 05 cần vector $\nabla F(\theta)\in\mathbb R^p$ ở mỗi bước, và $\nabla F=\tfrac1n\sum_i\nabla\ell_i$ là trung bình của các gradient mẫu. Với mô hình tuyến tính, gradient có công thức đóng; với mạng hai tầng có $p=78\,601$ tham số, chúng ta cần biết một gradient mẫu $\nabla\ell_i(\theta)$ tốn bao nhiêu phép tính. Để trả lời, chúng ta so sánh cách tính trực tiếp bằng sai phân hữu hạn với cách dùng lại các giá trị trung gian của truyền xuôi, rồi rút ra thuật toán lan truyền ngược (backpropagation) và chi phí của nó.

### 3.1 Chi phí của sai phân hữu hạn

Cách trực tiếp nhất để xấp xỉ đạo hàm riêng theo tọa độ $j$ là thay đổi riêng tọa độ đó một lượng nhỏ $\varepsilon>0$ rồi tính lại mất mát:

$$
\frac{\partial\ell}{\partial\theta_j}(\theta)\approx\frac{\ell(\theta+\varepsilon e_j)-\ell(\theta)}{\varepsilon},\qquad j=1,\ldots,p,
\tag{3.1}
$$

trong đó $e_j\in\mathbb R^p$ là vector đơn vị thứ $j$. Công thức (3.1) đọc là: độ dốc của $\ell$ theo hướng $e_j$ xấp xỉ bằng độ tăng của $\ell$ chia cho độ dịch. Mỗi tọa độ cần một lần tính lại $\ell$, tức một lần truyền xuôi, cộng một lần truyền xuôi tại chính $\theta$.

::: example Ví dụ 06.8 (Chi phí sai phân hữu hạn trên mạng cho ảnh)
**Dữ kiện.** Mạng hai tầng với $d=784$, $m=100$, $p=78\,601$ (Ví dụ 06.5); một lần truyền xuôi gồm $W_1x$ ($md$ phép nhân) và $w_2^\top h$ ($m$ phép nhân), tức $md+m=78\,500$ phép nhân, cùng bậc với $p$.

**Đếm.** Công thức (3.1) cần $p+1=78\,602$ lần truyền xuôi. Lấy mỗi lần khoảng $p$ phép nhân–cộng, tổng là $(p+1)p\approx6{,}2\cdot10^9$ phép nhân–cộng cho gradient của một mẫu.

**Diễn giải.** Gradient đầy đủ của $F$ còn nhân thêm $n$. Với $n=60\,000$ ảnh, con số là khoảng $3{,}7\cdot10^{14}$ cho một bước hạ gradient.

**Kiểm tra lại.** $78\,602\cdot78\,601=6\,178\,195\,802\approx6{,}2\cdot10^9$.
:::

Ngoài chi phí, (3.1) còn chịu hai loại sai số. Sai số chặt cụt (truncation error), có bậc $\varepsilon$, đến từ việc bỏ số hạng bậc hai của khai triển Taylor; sai số làm tròn, có bậc (độ chính xác máy)$/\varepsilon$, đến từ phép trừ hai số gần nhau. Vì vậy sai phân hữu hạn chỉ dùng để kiểm tra một cài đặt gradient trên vài tọa độ. Chúng ta cần một cách tính gradient chính xác của một mẫu với chi phí cùng bậc một lần truyền xuôi, tức $O(p)$ thay vì $O(p^2)$.

### 3.2 Đồ thị tính toán và truyền xuôi

Phép tính thừa của (3.1) là ở mỗi lần truyền xuôi, mọi đại lượng không đổi đều được tính lại từ đầu. Một cách tổ chức phép tính giúp dùng lại các đại lượng đó là đồ thị tính toán.

::: definition Định nghĩa 06.11 (Đồ thị tính toán)
Một **đồ thị tính toán** (computational graph) của một hàm là một đồ thị có hướng không chu trình, trong đó mỗi nút là một đại lượng (vô hướng, vector hoặc ma trận) và mỗi nút không phải đầu vào được tính từ các nút cha của nó bằng một phép toán đã biết, gọi là phép toán cục bộ của nút.

Với mạng hai tầng (2.1), một mẫu $(x,y)$ và mất mát $\ell(f,y)$, đồ thị gồm chuỗi nút

$$
x\ \to\ z=W_1x+b_1\ \to\ h=\sigma(z)\ \to\ f=w_2^\top h+b_2\ \to\ \ell=\ell(f,y),
$$

cùng các nút tham số $W_1$, $b_1$ đi vào $z$, các nút $w_2$, $b_2$ đi vào $f$ và nút nhãn $y$ đi vào $\ell$.
:::

Định nghĩa 06.11 theo cách trình bày của Goodfellow, Bengio và Courville (2016, mục 6.5.1). Đồ thị không thêm phép tính nào; nó chỉ ghi lại thứ tự phép tính và các đại lượng trung gian. Truyền xuôi đi theo chiều cạnh của đồ thị và lưu giá trị của mọi nút, như ví dụ sau.

::: example Ví dụ 06.9 (Truyền xuôi một mẫu)
**Dữ kiện.** Mẫu $x=(1,1)$, $y=0$; mất mát $\ell=\tfrac12(f-y)^2$; $\sigma(z)=\max\{0,z\}$; tham số

$$
W_1=\begin{pmatrix}1&\tfrac12\\\tfrac12&-1\end{pmatrix},\qquad b_1=\begin{pmatrix}-\tfrac12\\1\end{pmatrix},\qquad w_2=\begin{pmatrix}1\\-2\end{pmatrix},\qquad b_2=\tfrac12 .
$$

**Tính từng nút.**

$$
\begin{aligned}
z_1&=1\cdot1+\tfrac12\cdot1-\tfrac12=1,\\
z_2&=\tfrac12\cdot1-1\cdot1+1=\tfrac12,\\
h&=\sigma(z)=(1,\tfrac12),\\
f&=1\cdot1-2\cdot\tfrac12+\tfrac12=\tfrac12,\\
\ell&=\tfrac12\bigl(\tfrac12-0\bigr)^2=\tfrac18 .
\end{aligned}
$$

Cả hai thành phần của $z$ dương, nên $h=z$.

**Lưu lại.** $z=(1,\tfrac12)$, $h=(1,\tfrac12)$, $f=\tfrac12$, $\ell=\tfrac18$.

**Kiểm tra lại.** Cả hai đơn vị ẩn hoạt động ($z>0$), nên ví dụ không rơi vào điểm gãy và $\ell$ khả vi theo mọi tham số tại điểm này.
:::

![Chuỗi nút x → z → h → f → ℓ; các tham số W₁, b₁ đi vào z, w₂, b₂ đi vào f, nhãn y đi vào ℓ. Giá trị truyền xuôi với x = (1, 1), y = 0: z = (1, ½), h = (1, ½), f = ½, ℓ = ⅛. Dưới mỗi cạnh ghi phép toán: W₁x + b₁, σ, w₂ᵀh + b₂, ½(f − y)².](img/lec-06/backprop-forward.svg)

Hình ghi giá trị của mỗi nút sau truyền xuôi và phép toán cục bộ trên mỗi cạnh. Các giá trị $z$ và $h$ phải được lưu: bước ngược cần $h$ để tính đạo hàm theo $w_2$ và cần $z$ để tính $\sigma'(z)$.

### 3.3 Truyền ngược trên ví dụ

Về mặt ý tưởng, ta đi ngược đồ thị từ $\ell$ về các tham số, và tại mỗi nút nhân đạo hàm đã có của nút sau với đạo hàm cục bộ của phép toán tại nút đó. Đây mới là mô tả trực quan; bổ đề sau là quy tắc dây chuyền của Bài 00 viết chính xác cho một nút.

::: lemma Bổ đề 06.12 (Truyền ngược qua một nút)
**Giả thiết.** $u\in\mathbb R^{d_u}$; $v=g(u)\in\mathbb R^{d_v}$ với $g$ khả vi tại $u$ và Jacobian $J_g(u)\in\mathbb R^{d_v\times d_u}$; $\ell$ phụ thuộc $u$ chỉ qua $v$, tức $\ell=\phi(v)$ với $\phi$ khả vi tại $v$. Đặt $\delta_v=\nabla\phi(v)\in\mathbb R^{d_v}$.

**Kết luận.** $\delta_u:=\nabla_u\ell=J_g(u)^\top\delta_v$. Ba trường hợp riêng:

1. $v=\sigma(u)$ theo từng thành phần ($d_u=d_v$): $\delta_u=\sigma'(u)\odot\delta_v$, với $\odot$ là tích theo thành phần.
2. $v=Mu+\beta$ với $M\in\mathbb R^{d_v\times d_u}$, $\beta\in\mathbb R^{d_v}$: $\delta_u=M^\top\delta_v$, $\nabla_\beta\ell=\delta_v$ và $\nabla_M\ell=\delta_vu^\top$.
3. $v=w^\top u+\beta$ vô hướng ($d_v=1$): $\nabla_u\ell=\delta_v\,w$, $\nabla_w\ell=\delta_v\,u$, $\partial\ell/\partial\beta=\delta_v$.

**Điều kiện áp dụng.** $g$ và $\phi$ khả vi tại điểm đang xét.

**Phạm vi.** Bổ đề chỉ dùng thông tin cục bộ của một nút: giá trị $u$ (từ truyền xuôi) và $\delta_v$ (từ nút sau).
:::

::: proof Chứng minh Bổ đề 06.12
**Bước 1 (dạng chung).** Quy tắc dây chuyền dạng Jacobian chuyển vị (Bài 00) áp cho $\ell=\phi\circ g$ cho $\nabla_u\ell=J_g(u)^\top\nabla\phi(v)$.

**Bước 2 (trường hợp 1).** Với $v_j=\sigma(u_j)$, $\partial v_j/\partial u_k=\sigma'(u_j)$ khi $j=k$ và $0$ khi $j\ne k$, nên $J_g=\operatorname{diag}\sigma'(u)$ và $J_g^\top\delta_v=\sigma'(u)\odot\delta_v$.

**Bước 3 (trường hợp 2).** Theo $u$, Jacobian là $M$. Theo $\beta$, Jacobian là $I$. Theo phần tử $M_{jk}$, chỉ $v_j$ phụ thuộc và $\partial v_j/\partial M_{jk}=u_k$, nên $\partial\ell/\partial M_{jk}=[\delta_v]_ju_k$, tức $\nabla_M\ell=\delta_vu^\top$.

**Bước 4 (trường hợp 3).** Là trường hợp 2 với $d_v=1$ và $M=w^\top$: $\nabla_u\ell=w\,\delta_v$; theo $w$, $\partial v/\partial w_k=u_k$ cho $\nabla_w\ell=\delta_v u$. $\square$
:::

Áp bổ đề lần lượt cho các nút $f$, $h$, $z$ của Ví dụ 06.9, ta được toàn bộ gradient.

::: example Ví dụ 06.10 (Truyền ngược trên một mẫu)
**Dữ kiện.** Mạng và mẫu của Ví dụ 06.9: $x=(1,1)$, $y=0$, $W_1=\begin{pmatrix}1&\tfrac12\\\tfrac12&-1\end{pmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$; giá trị đã lưu $z=(1,\tfrac12)$, $h=(1,\tfrac12)$, $f=\tfrac12$, $\ell=\tfrac18$.

**Nút $\ell$.** $e=\partial\ell/\partial f=f-y=\tfrac12$.

**Nút $f=w_2^\top h+b_2$** (Bổ đề 06.12, trường hợp 3).

$$
\frac{\partial\ell}{\partial b_2}=e=\tfrac12,\qquad\nabla_{w_2}\ell=e\,h=\bigl(\tfrac12,\tfrac14\bigr),\qquad\delta_h=e\,w_2=\bigl(\tfrac12,-1\bigr).
$$

**Nút $h=\sigma(z)$** (trường hợp 1). Vì $z>0$ theo cả hai thành phần, $\sigma'(z)=(1,1)$ và $\delta_z=\delta_h\odot\sigma'(z)=(\tfrac12,-1)$.

**Nút $z=W_1x+b_1$** (trường hợp 2).

$$
\nabla_{W_1}\ell=\delta_zx^\top=\begin{pmatrix}\tfrac12&\tfrac12\\-1&-1\end{pmatrix},\qquad\nabla_{b_1}\ell=\delta_z=\bigl(\tfrac12,-1\bigr).
$$

**Chuẩn gradient.** Tổng bình phương chín thành phần là

$$
\lVert\nabla\ell\rVert^2=\underbrace{\tfrac14+\tfrac14+1+1}_{W_1}+\underbrace{\tfrac14+1}_{b_1}+\underbrace{\tfrac14+\tfrac1{16}}_{w_2}+\underbrace{\tfrac14}_{b_2}=\frac{69}{16}.
$$

**Kiểm tra lại.** Sai phân trung tâm $\bigl(\ell(\theta+\varepsilon e_j)-\ell(\theta-\varepsilon e_j)\bigr)/(2\varepsilon)$ theo phần tử $[W_1]_{22}$ với $\varepsilon=10^{-3}$ cho đúng $-1$. Khi $[W_1]_{22}$ thay đổi $\pm10^{-3}$, $z_2=\tfrac12\pm10^{-3}$ vẫn dương, nên theo riêng tọa độ này $\ell$ là hàm bậc hai, và sai phân trung tâm chính xác với hàm bậc hai. Tính bằng số thực dấu phẩy động, sai khác với $-1$ nhỏ hơn $10^{-13}$.
:::

![Cùng đồ thị x → z → h → f → ℓ, cạnh xuôi vẽ nhạt. Các mũi tên nét đứt chạy theo chiều ngược của đồ thị, mang đạo hàm ngược: e = f − y = ½ tại f, δ_h = e w₂ = (½, −1) tại h, δ_z = δ_h ⊙ σ′(z) = (½, −1) tại z. Hình ghi kèm gradient theo tham số: ∇W₁ = δ_z xᵀ, ∇b₁ = δ_z, ∇w₂ = e h = (½, ¼), ∇b₂ = e = ½.](img/lec-06/backprop-backward.svg)

Trên hình, mỗi mũi tên nét đứt mang đạo hàm của $\ell$ theo nút mà nó tới. Mỗi bước ngược dùng một kết quả của bước trước và một đại lượng đã có từ truyền xuôi ($h$, $z$ hoặc $x$); không bước nào tính lại truyền xuôi. Đây là lý do lan truyền ngược rẻ hơn (3.1).

### 3.4 Thuật toán lan truyền ngược

Ví dụ 06.10 dùng mất mát bình phương và các giá trị cụ thể; thuật toán sau phát biểu cùng thứ tự tính cho một mất mát khả vi bất kỳ.

::: algorithm Thuật toán 06.1 (Lan truyền ngược cho mạng hai tầng, một mẫu)
**Đầu vào.** Mẫu $(x,y)$; tham số $\theta=(W_1,b_1,w_2,b_2)$; hàm kích hoạt $\sigma$ và đạo hàm $\sigma'$; mất mát $\ell(f,y)$ khả vi theo $f$.

**Đầu ra.** Vector $\bigl(\nabla_{W_1}\ell,\nabla_{b_1}\ell,\nabla_{w_2}\ell,\partial\ell/\partial b_2\bigr)\in\mathbb R^p$.

1. **Truyền xuôi.** Tính $z=W_1x+b_1$, $h=\sigma(z)$, $f=w_2^\top h+b_2$; lưu $z$ và $h$.
2. **Tầng ra.** Tính $e=\partial\ell/\partial f$; đặt $\partial\ell/\partial b_2=e$ và $\nabla_{w_2}\ell=e\,h$.
3. **Tầng ẩn.** Tính $\delta_z=\sigma'(z)\odot(e\,w_2)$. Với ReLU, dùng quy ước $\sigma'(0)=0$.
4. **Tham số tầng ẩn.** Đặt $\nabla_{W_1}\ell=\delta_zx^\top$ và $\nabla_{b_1}\ell=\delta_z$.

**Chi phí.** Cùng bậc một lần truyền xuôi (Mệnh đề 06.15). **Bộ nhớ.** $z$ và $h$ của mẫu đang xử lý.
:::

Lan truyền ngược chỉ tính gradient; nó không phải một thuật toán tối ưu. Bước cập nhật tham số là việc của hạ gradient hay hạ gradient ngẫu nhiên, và gradient của $F$ là trung bình của các vector đầu ra trên $n$ mẫu. Mệnh đề sau xác định khi nào đầu ra của Thuật toán 06.1 đúng là gradient.

::: proposition Mệnh đề 06.13 (Tính đúng của lan truyền ngược)
**Giả thiết.** $\ell(\cdot,y)$ khả vi; $\sigma$ khả vi tại mọi thành phần của $z=W_1x+b_1$.

**Kết luận.** Đầu ra của Thuật toán 06.1 bằng $\nabla_\theta\ell\bigl(f(x;\theta),y\bigr)$. Với ReLU, điều kiện trên nghĩa là không tiền kích hoạt nào bằng $0$.

**Điều kiện áp dụng.** Điểm $\theta$ mà hàm $\theta\mapsto\ell(f(x;\theta),y)$ khả vi qua các phép toán cục bộ.

**Phạm vi.** Tại điểm có tiền kích hoạt bằng $0$, đầu ra là kết quả của quy ước $\sigma'(0)=0$ và nói chung không phải gradient (Nhận xét 06.14).
:::

::: proof Chứng minh Mệnh đề 06.13
**Bước 1 (tầng ra).** $\ell=\ell(f,y)$ với $f=w_2^\top h+b_2$. Bổ đề 06.12, trường hợp 3, với $\delta_v=e=\partial\ell/\partial f$, cho $\partial\ell/\partial b_2=e$, $\nabla_{w_2}\ell=e\,h$ và $\delta_h=e\,w_2$.

**Bước 2 (hàm kích hoạt).** $h=\sigma(z)$ khả vi tại $z$ theo giả thiết. Trường hợp 1 cho $\delta_z=\sigma'(z)\odot\delta_h=\sigma'(z)\odot(e\,w_2)$.

**Bước 3 (tầng ẩn).** $z=W_1x+b_1$ affine theo $(W_1,b_1)$. Trường hợp 2 với $M=W_1$, $u=x$, $\beta=b_1$ cho $\nabla_{W_1}\ell=\delta_zx^\top$ và $\nabla_{b_1}\ell=\delta_z$.

**Bước 4 (ghép).** Mỗi tham số chỉ ảnh hưởng tới $\ell$ qua đúng một nút ($W_1$, $b_1$ qua $z$; $w_2$, $b_2$ qua $f$), nên các đạo hàm riêng ở Bước 1 và Bước 3 là các thành phần của $\nabla_\theta\ell$. $\square$
:::

Mệnh đề 06.13 là trường hợp hai tầng của dạng chung: một nút $v=g(u)$ truyền về $\delta_u=J_g(u)^\top\delta_v$ (Bổ đề 06.12), áp lần lượt theo thứ tự ngược của đồ thị. Với mạng nhiều tầng, cùng quy tắc áp cho mỗi tầng (Goodfellow, Bengio và Courville, 2016, mục 6.5). Nhận xét sau cho thấy giả thiết khả vi của mệnh đề là cần thiết.

::: remark Nhận xét 06.14 (Quy ước $\sigma'(0)=0$ không cho gradient)
ReLU không khả vi tại $0$. Quy ước $\sigma'(0)=0$ là một lựa chọn tính toán, không phải đạo hàm. Hàm $q(z)=\sigma(z)-\sigma(-z)$ bằng $z$ với mọi $z$, nên $q'(0)=1$; lan truyền ngược với quy ước trên trả về $\sigma'(0)\cdot1-\sigma'(0)\cdot(-1)=0$ tại $z=0$. Vậy tại điểm có tiền kích hoạt bằng $0$, vector trả về có thể khác cả gradient lẫn mọi đạo hàm một phía. Trên dữ liệu XOR với đầu vào nguyên, điểm gãy xuất hiện thường xuyên (Ví dụ 06.4 có hai mẫu tại điểm gãy), nên các ví dụ tính thủ công của chương chọn tham số tránh điểm gãy, trừ khi nêu rõ quy ước.
:::

### 3.5 Chi phí của lan truyền ngược

Mục tiêu đặt ra ở Mục 3.1 là chi phí $O(p)$ cho một gradient mẫu. Mệnh đề sau đếm số phép nhân của Thuật toán 06.1.

::: proposition Mệnh đề 06.15 (Chi phí của lan truyền ngược)
**Giả thiết.** Mạng hai tầng với $d$ đầu vào, $m$ đơn vị ẩn, $p=md+2m+1$ tham số; ReLU; đếm phép nhân giữa hai số thực, bỏ phép cộng và phép áp $\sigma$.

**Kết luận.**

1. Truyền xuôi tốn $md+m$ phép nhân; bước ngược tốn $md+2m$ phép nhân.
2. Một gradient mẫu tốn $O(p)$; gradient đầy đủ của $F$ tốn $O(np)$.
3. Sai phân hữu hạn (3.1) tốn $p+1$ lần truyền xuôi, tức $O(p^2)$ cho một gradient mẫu.

**Điều kiện áp dụng.** Phép nhân với $\sigma'(z_j)\in\{0,1\}$ chỉ là phép chọn và không được đếm.

**Phạm vi.** Bộ nhớ: bước ngược cần $z$ và $h$ của mọi mẫu đang xử lý, tức $2m$ số mỗi mẫu (hoặc $m$ nếu tính lại $h=\sigma(z)$), nhân với số mẫu xử lý cùng lúc.
:::

::: proof Chứng minh Mệnh đề 06.15
**Bước 1 (truyền xuôi).** $W_1x$ cần $md$ phép nhân; $w_2^\top h$ cần $m$.

**Bước 2 (bước ngược).** $e\,h$ cần $m$ phép nhân; $e\,w_2$ cần $m$; tích ngoài $\delta_zx^\top$ cần $md$; $\nabla_{b_1}\ell=\delta_z$ không cần phép nhân. Tổng $md+2m$.

**Bước 3 (so bậc).** Cả hai số $md+m$ và $md+2m$ không vượt $p=md+2m+1$, nên cả thuật toán tốn $O(p)$. Gradient đầy đủ là trung bình $n$ gradient mẫu, nên tốn $O(np)$. Với (3.1), mỗi trong $p+1$ lần truyền xuôi tốn $md+m\le p$ phép nhân, tổng $O(p^2)$. $\square$
:::

| Phép tính | Số phép nhân | $d=784$, $m=100$ |
|---|---|---:|
| truyền xuôi: $W_1x$, $w_2^\top h$ | $md+m$ | $78\,500$ |
| bước ngược: $e\,h$, $e\,w_2$, $\delta_zx^\top$ | $md+2m$ | $78\,600$ |
| sai phân hữu hạn | $p+1$ lần truyền xuôi | $78\,602$ lần truyền xuôi |

Với mạng cho ảnh, lan truyền ngược tốn khoảng gấp đôi một lần truyền xuôi, trong khi sai phân hữu hạn tốn gấp khoảng $p=78\,601$ lần.

Goodfellow, Bengio và Courville (2016, Thuật toán 6.2, tr. 209–210) nêu kết luận tổng quát: chi phí lan truyền ngược tỉ lệ với số cạnh của đồ thị và cùng bậc với truyền xuôi; với mạng nhiều tầng đầy đủ, cả hai chiều cần $O(w)$ phép nhân–cộng với $w$ là số trọng số (tr. 220–221). Hằng số chính xác phụ thuộc cách cài đặt; điều cần dùng ở các mục sau chỉ là "cùng bậc".

### 3.6 Một bước hạ gradient trên mạng

Có gradient, ta thực hiện được một bước hạ gradient trên mạng. Ví dụ sau cho thấy cùng một hướng $-\nabla\ell$ có thể làm mất mát giảm hoặc tăng tùy độ dài bước.

::: example Ví dụ 06.11 (Hai độ dài bước trên cùng một hướng)
**Dữ kiện.** Mạng và mẫu của Ví dụ 06.9: $x=(1,1)$, $y=0$, $W_1=\begin{pmatrix}1&\tfrac12\\\tfrac12&-1\end{pmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$, $\ell(\theta)=\tfrac18$. Gradient của Ví dụ 06.10: $\nabla_{W_1}\ell=\begin{pmatrix}\tfrac12&\tfrac12\\-1&-1\end{pmatrix}$, $\nabla_{b_1}\ell=(\tfrac12,-1)$, $\nabla_{w_2}\ell=(\tfrac12,\tfrac14)$, $\partial\ell/\partial b_2=\tfrac12$, $\lVert\nabla\ell\rVert^2=\tfrac{69}{16}$. Bước $\theta^+=\theta-\eta\nabla\ell(\theta)$.

**Bước $\eta=0{,}02$.** Mỗi tham số dịch $0{,}02$ lần đạo hàm tương ứng, chẳng hạn $[W_1]_{11}=1-0{,}02\cdot\tfrac12=0{,}99$ và $[W_1]_{21}=\tfrac12-0{,}02\cdot(-1)=0{,}52$:

$$
W_1^+=\begin{pmatrix}0{,}99&0{,}49\\0{,}52&-0{,}98\end{pmatrix},\quad b_1^+=(-0{,}51;\ 1{,}02),\quad w_2^+=(0{,}99;\ -2{,}005),\quad b_2^+=0{,}49 .
$$

Truyền xuôi lại: $z^+=(0{,}99+0{,}49-0{,}51;\ 0{,}52-0{,}98+1{,}02)=(0{,}97;\ 0{,}56)$, $f^+=0{,}99\cdot0{,}97-2{,}005\cdot0{,}56+0{,}49=0{,}3275$ và $\ell^+=\tfrac12\cdot0{,}3275^2\approx0{,}0536$. Mất mát giảm từ $0{,}125$.

**Bước $\eta=0{,}25$.** Tương tự, $W_1^+=\begin{pmatrix}\tfrac78&\tfrac38\\\tfrac34&-\tfrac34\end{pmatrix}$, $b_1^+=(-\tfrac58,\tfrac54)$, $w_2^+=(\tfrac78,-\tfrac{33}{16})$, $b_2^+=\tfrac38$; $z^+=(\tfrac58,\tfrac54)$ và $f^+=\tfrac78\cdot\tfrac58-\tfrac{33}{16}\cdot\tfrac54+\tfrac38=-\tfrac{53}{32}$, nên $\ell^+=\tfrac{2809}{2048}\approx1{,}372$. Mất mát tăng.

**Đối chiếu với xấp xỉ bậc nhất.** Xấp xỉ bậc nhất dự báo mức giảm $\eta\lVert\nabla\ell\rVert^2$. Với $\eta=0{,}02$, dự báo là $0{,}08625$, còn mức giảm thật là $0{,}125-0{,}0536=0{,}0714$, nhỏ hơn vì số hạng bậc hai. Với $\eta=0{,}25$, xấp xỉ bậc nhất không còn đúng cả về dấu.

**Kiểm tra lại.** Với $\eta=0{,}5$, cùng cách tính cho $\ell^+=\tfrac{3721}{512}\approx7{,}27$; mất mát tăng nhanh theo độ dài bước.
:::

Ví dụ cho thấy độ dài bước an toàn phụ thuộc độ cong của mất mát, tức hằng số Lipschitz của gradient. Trong Bài 04, chúng ta đã có điều kiện $\eta\le\tfrac1L$ cho hàm có gradient $L$-Lipschitz. Ở Mục 4.4, chúng ta phát biểu lại điều kiện này khi mục tiêu không lồi và suy ra từ bước $0{,}25$ một cận dưới cho hằng số đó.

**Trong học máy.** Mọi thư viện học sâu cài đặt lan truyền ngược dưới dạng vi phân tự động chế độ ngược (reverse-mode automatic differentiation) trên đồ thị tính toán: người dùng viết truyền xuôi, thư viện ghi đồ thị và áp Bổ đề 06.12 ở mỗi nút. Mệnh đề 06.15 giải thích vì sao huấn luyện mạng có hàng triệu tham số khả thi: theo phép đếm của mệnh đề, một gradient mẫu, gồm truyền xuôi và bước ngược, tốn khoảng hai lần một truyền xuôi. Đổi lại, bộ nhớ cho các kích hoạt tăng theo số mẫu xử lý cùng lúc, và đây thường là giới hạn thực tế của kích thước nhóm (Mục 6.5). Sai phân hữu hạn vẫn được dùng để kiểm tra gradient của một cài đặt mới trên vài tọa độ, như dòng kiểm tra của Ví dụ 06.10.

::: exercise Bài tập 06.2 (Lan truyền ngược tại một tham số khớp đúng XOR)
Cho mạng hai tầng với tham số $\theta_A$: $W_1=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, $b_1=(0,0)$, $w_2=(1,1)$, $b_2=0$, $\sigma(z)=\max\{0,z\}$, mất mát $\ell=\tfrac12(f-y)^2$.

1. Với mẫu $x=(1,0)$, $y=\tfrac12$, chạy Thuật toán 06.1: tính $z$, $h$, $f$, $e$, $\nabla_{w_2}\ell$, $\delta_z$, $\nabla_{W_1}\ell$, $\nabla_{b_1}\ell$, $\partial\ell/\partial b_2$.
2. Giải thích vì sao hàng thứ hai của $\nabla_{W_1}\ell$ bằng $0$, và vì sao Mệnh đề 06.13 áp dụng được tại điểm này.
3. Với $d=10$, $m=5$, tính $p$ và số phép nhân của truyền xuôi và bước ngược theo Mệnh đề 06.15.
:::

::: hint
Ở câu 1, $z=(1,-1)$, nên chỉ đơn vị thứ nhất hoạt động. Ở câu 2, xét $\sigma'(z_2)$ và kiểm tra xem có tiền kích hoạt nào bằng $0$ không.
:::

::: solution
1. $z=W_1x+b_1=(1,-1)$, $h=(1,0)$, $f=1\cdot1+1\cdot0+0=1$, $e=f-y=\tfrac12$, $\ell=\tfrac18$. Tầng ra: $\partial\ell/\partial b_2=\tfrac12$, $\nabla_{w_2}\ell=e\,h=(\tfrac12,0)$. Tầng ẩn: $e\,w_2=(\tfrac12,\tfrac12)$, $\sigma'(z)=(1,0)$, nên $\delta_z=(\tfrac12,0)$. Tham số tầng ẩn:

$$
\nabla_{W_1}\ell=\delta_zx^\top=\begin{pmatrix}\tfrac12&0\\0&0\end{pmatrix},\qquad\nabla_{b_1}\ell=\bigl(\tfrac12,0\bigr).
$$

2. Đơn vị thứ hai có $z_2=-1<0$, nên $\sigma'(z_2)=0$ chặn mọi tín hiệu đi qua nó: $[\delta_z]_2=0$, kéo theo hàng hai của $\delta_zx^\top$ và $[\nabla_{b_1}\ell]_2$ bằng $0$. Cột hai của hàng một cũng bằng $0$ vì $x_2=0$. Hai tiền kích hoạt $1$ và $-1$ đều khác $0$, nên ReLU khả vi tại cả hai, và Mệnh đề 06.13 cho đầu ra đúng là gradient.

3. $p=md+2m+1=50+10+1=61$. Truyền xuôi: $md+m=55$ phép nhân. Bước ngược: $md+2m=60$ phép nhân.

**Kiểm tra.** Tăng $b_2$ thêm $\varepsilon$ làm $f=1+\varepsilon$ và $\ell=\tfrac12(\tfrac12+\varepsilon)^2$, có đạo hàm $\tfrac12$ tại $\varepsilon=0$, khớp $\partial\ell/\partial b_2$.
:::

Như vậy, lan truyền ngược (Thuật toán 06.1) tính đúng gradient của một mẫu tại mọi điểm khả vi (Mệnh đề 06.13), với chi phí cùng bậc một lần truyền xuôi (Mệnh đề 06.15), nhờ dùng lại các đại lượng trung gian của đồ thị tính toán (Định nghĩa 06.11, Bổ đề 06.12). Gradient đầy đủ của $F$ vì vậy tốn $O(np)$, con số Mục 5 sẽ dùng để so sánh các phương pháp. Ví dụ 06.11 và Nhận xét 06.14 lại cho thấy hai điều mà gradient chưa trả lời: bước nào chắc chắn làm $F$ giảm, và khi gradient bằng $0$, như ở các đơn vị không hoạt động, điểm đó có phải là cực tiểu hay không.

## 4. Điểm dừng và bảo đảm của gradient khi không lồi

Trong Bài 04, tiêu chí dừng $\lVert\nabla F(\theta_k)\rVert\le\varepsilon$ có một ý nghĩa rõ: với $F$ lồi khả vi, bất đẳng thức tiếp tuyến $F(\theta')\ge F(\theta)+\nabla F(\theta)^\top(\theta'-\theta)$ biến $\nabla F(\theta)=0$ thành $F(\theta')\ge F(\theta)$ với mọi $\theta'$ (Hệ quả 01.27), và gradient nhỏ kéo theo giá trị gần tối ưu. Không có tính lồi, bất đẳng thức tiếp tuyến mất đi, nên chúng ta phải xác định lại gradient bằng $0$ hoặc gradient nhỏ chứng nhận được điều gì. Chúng ta phân loại các điểm dừng trước, rồi xác định bảo đảm còn lại của hạ gradient.

### 4.1 Điểm dừng và phân loại điểm dừng

Điều kiện bậc nhất $\nabla F(\theta)=0$ vẫn là điều kiện cần cho cực tiểu địa phương của một hàm khả vi; khi $F$ không lồi, chỉ chiều ngược lại mất đi. Các đối tượng sau gọi tên những gì có thể xảy ra.

::: definition Định nghĩa 06.16 (Điểm dừng và điểm yên ngựa)
Cho $F:\mathbb R^p\to\mathbb R$ khả vi và $\theta\in\mathbb R^p$.

**Điểm dừng.** $\theta$ là điểm dừng (stationary point) nếu $\nabla F(\theta)=0$.

**Điểm dừng $\varepsilon$-xấp xỉ.** Với $\varepsilon>0$, $\theta$ là điểm dừng $\varepsilon$-xấp xỉ nếu $\lVert\nabla F(\theta)\rVert\le\varepsilon$.

**Cực tiểu địa phương.** $\theta$ là cực tiểu địa phương nếu có $\rho>0$ để $F(\theta')\ge F(\theta)$ với mọi $\lVert\theta'-\theta\rVert<\rho$; là cực tiểu địa phương chặt nếu bất đẳng thức là chặt với mọi $\theta'\ne\theta$ trong lân cận đó. Cực đại địa phương định nghĩa tương tự.

**Điểm yên ngựa.** Một điểm dừng không là cực tiểu địa phương cũng không là cực đại địa phương gọi là điểm yên ngựa (saddle point).
:::

Định nghĩa trên không dùng tính lồi. Mọi cực tiểu địa phương của hàm khả vi là điểm dừng, nhưng một điểm dừng có thể là cực tiểu, cực đại địa phương hoặc điểm yên ngựa. Bảng sau so sánh điều mà điểm dừng chứng nhận trong hai trường hợp.

| | $F$ lồi, khả vi | $F$ không lồi |
|---|---|---|
| $\nabla F(\theta)=0$ chứng nhận | cực tiểu toàn cục (Hệ quả 01.27) | một điểm dừng: cực tiểu địa phương, cực đại địa phương hoặc điểm yên ngựa |
| tập cực tiểu toàn cục | tập lồi (Hệ quả 01.34) | có thể không lồi; với mạng, chứa $\theta^*$ và $P\theta^*$ nhưng không chứa trọn đoạn nối (Ví dụ 06.7) |
| $\lVert\nabla F(\theta)\rVert\le\varepsilon$ chứng nhận | giá trị gần tối ưu khi thêm lồi mạnh | chỉ một điểm dừng $\varepsilon$-xấp xỉ |

Nhầm lẫn thường gặp là coi "gradient bằng $0$" đồng nghĩa với "đã tối ưu". Trong Mục 3, mẫu $x=(0,0)$ có thể cho $\nabla_{W_1}\ell=0$ chỉ vì $x=0$, và đơn vị có tiền kích hoạt âm cho gradient bằng $0$ theo các tham số của nó; cả hai không nói gì về tính tối ưu.

### 4.2 Mạng tuyến tính một đơn vị

Mạng XOR có chín tham số nên mặt mất mát của nó không biểu diễn được trên mặt phẳng. Để thấy đủ các loại điểm dừng trên một hình, ta dùng mạng nhỏ nhất có tích tham số.

::: example Ví dụ 06.12 (Mạng tuyến tính một đơn vị)
**Dữ kiện.** Mạng hai tầng với $d=m=1$, $\sigma(z)=z$, không có độ chệch: $f(x;u,v)=v\,(u\,x)$, tham số $\theta=(u,v)\in\mathbb R^2$. Một mẫu $x=1$, $y=1$, mất mát bình phương, nên

$$
F(u,v)=\tfrac12(uv-1)^2 .
$$

**Gradient và Hessian.** Đạo hàm riêng cho

$$
\nabla F(u,v)=\bigl((uv-1)v,\ (uv-1)u\bigr),\qquad
\nabla^2F(u,v)=\begin{pmatrix}v^2&2uv-1\\2uv-1&u^2\end{pmatrix}.
$$

**Điểm dừng.** $\nabla F=(uv-1)(v,u)=0$ khi $uv=1$ hoặc $(u,v)=(0,0)$. Các điểm của hyperbol $uv=1$ có $F=0$, giá trị nhỏ nhất có thể, nên là cực tiểu toàn cục. Gốc có $F=\tfrac12$.

**Đối xứng và tính không lồi.** Hai cực tiểu $(1,1)$ và $(-1,-1)$ có trung điểm $(0,0)$ với $F=\tfrac12>0$, nên theo đúng lập luận của Mệnh đề 06.9, $F$ không lồi. Tính không lồi ở đây chỉ do tích hai tham số, không cần ReLU.

**Kiểm tra lại.** Tại $(2,\tfrac12)$: $uv-1=0$ nên $\nabla F=0$ và $F=0$.
:::

![Hình vuông [−2, 2] × [−2, 2] với trục u, v. Đường mức là các hyperbol uv = hằng số. Tập cực tiểu uv = 1 (F = 0) gồm hai nhánh hyperbol vẽ đậm ở góc phần tư thứ nhất và thứ ba. Hai điểm (1, 1) và (−1, −1) nằm trên tập cực tiểu; đoạn nối chúng đi qua gốc. Gốc (0, 0), đánh dấu chữ X, là điểm yên ngựa với F = ½; đường mức F = ½ gồm hai trục tọa độ và hyperbol uv = 2, vẽ nét đứt.](img/lec-06/product-landscape.svg)

Trên hình, $F$ chỉ phụ thuộc tích $uv$, nên mọi đường mức là một hyperbol $uv=a$ với $a$ là hằng số. Tập cực tiểu $uv=1$ gồm hai nhánh rời nhau, không lồi, và đoạn nối $(1,1)$ với $(-1,-1)$ đi qua gốc, nơi $F=\tfrac12$. Đối xứng ở đây rộng hơn phép đổi dấu $(u,v)\mapsto(-u,-v)$: mọi phép co giãn $(u,v)\mapsto(\omega u,v/\omega)$ với $\omega\ne0$ giữ nguyên tích $uv$, nên giữ nguyên $F$.

### 4.3 Phân loại điểm dừng bằng Hessian

Gốc của Ví dụ 06.12 là điểm dừng nhưng không phải cực tiểu. Để phân biệt các loại điểm dừng mà không vẽ hình, ta dùng thông tin bậc hai. Mệnh đề sau nhắc lại phép kiểm tra bậc hai của Bài 00 và thêm một điều kiện cần.

::: proposition Mệnh đề 06.17 (Phân loại điểm dừng bằng Hessian)
**Giả thiết.** $F:\mathbb R^p\to\mathbb R$ khả vi liên tục hai lần; $\nabla F(\theta)=0$; $H=\nabla^2F(\theta)$.

**Kết luận.**

1. Nếu $H\succ0$ thì $\theta$ là cực tiểu địa phương chặt.
2. Nếu $H$ có cả trị riêng âm và trị riêng dương thì $\theta$ là điểm yên ngựa.
3. Nếu $\theta$ là cực tiểu địa phương thì $H\succeq0$.

**Điều kiện áp dụng.** $F\in C^2$ trong một lân cận của $\theta$.

**Phạm vi.** Khi $H\succeq0$ nhưng suy biến, mệnh đề không kết luận; dấu của $F(\theta+s)-F(\theta)$ khi đó do các số hạng bậc cao quyết định.
:::

::: proof Chứng minh Mệnh đề 06.17
Khai triển Taylor bậc hai tại điểm dừng (Bài 00) cho

$$
F(\theta+s)=F(\theta)+\tfrac12s^\top Hs+E_2(s),\qquad\frac{E_2(s)}{\lVert s\rVert^2}\to0\ \text{khi}\ s\to0 .
\tag{4.1}
$$

**Bước 1 (kết luận 1).** Gọi $\alpha_{\min}>0$ là trị riêng nhỏ nhất của $H$; khi đó $s^\top Hs\ge\alpha_{\min}\lVert s\rVert^2$. Chọn $\rho_0>0$ để $\lvert E_2(s)\rvert\le\tfrac14\alpha_{\min}\lVert s\rVert^2$ khi $\lVert s\rVert<\rho_0$. Với $0<\lVert s\rVert<\rho_0$, (4.1) cho $F(\theta+s)-F(\theta)\ge\tfrac14\alpha_{\min}\lVert s\rVert^2>0$.

**Bước 2 (kết luận 2).** Gọi $v$ là vector riêng đơn vị ứng với trị riêng $\alpha_-<0$. Với $s=tv$, (4.1) cho $F(\theta+tv)-F(\theta)=\tfrac12\alpha_-t^2+E_2(tv)$, âm khi $t\ne0$ đủ nhỏ, nên $\theta$ không là cực tiểu địa phương. Lập luận tương tự với vector riêng của trị riêng dương cho thấy $\theta$ không là cực đại địa phương. Vậy $\theta$ là điểm yên ngựa.

**Bước 3 (kết luận 3).** Nếu $H$ có một trị riêng âm, Bước 2 cho một hướng làm $F$ giảm ngay cạnh $\theta$, trái với giả thiết cực tiểu địa phương. Vậy mọi trị riêng của $H$ không âm. $\square$
:::

Kết luận 1 là phép kiểm tra bậc hai của Bài 00; kết luận 3 là điều kiện cần bậc hai và là phần thêm của mệnh đề. Goodfellow, Bengio và Courville (2016, mục 4.3.1, tr. 89–90) trình bày cùng phép kiểm tra, và lưu ý rằng phép kiểm tra không kết luận khi Hessian có trị riêng $0$ mà mọi trị riêng khác cùng dấu.

::: example Ví dụ 06.13 (Phân loại ba điểm dừng của mạng tuyến tính một đơn vị)
**Dữ kiện.** $F(u,v)=\tfrac12(uv-1)^2$, $\nabla^2F(u,v)=\begin{pmatrix}v^2&2uv-1\\2uv-1&u^2\end{pmatrix}$; ba điểm dừng $(0,0)$, $(1,1)$, $(2,\tfrac12)$.

**Tại $(0,0)$.** $\nabla^2F=\begin{pmatrix}0&-1\\-1&0\end{pmatrix}$ có trị riêng $-1$ với vector riêng $(1,1)$ và $1$ với vector riêng $(1,-1)$. Kết luận 2 cho điểm yên ngựa. Theo hướng $(1,1)$, tích $uv$ dương và $F$ giảm; theo hướng $(1,-1)$, tích $uv$ âm và $F$ tăng.

**Tại $(1,1)$.** $\nabla^2F=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ có trị riêng $0$ (vector riêng $(1,-1)$) và $2$ (vector riêng $(1,1)$). Mệnh đề 06.17 không kết luận, dù $(1,1)$ là cực tiểu toàn cục vì $F=0$.

**Tại $(2,\tfrac12)$.** $\nabla^2F=\begin{pmatrix}0{,}25&1\\1&4\end{pmatrix}$ có định thức $0$ và vết $4{,}25$, nên trị riêng là $0$ và $4{,}25$. Phép kiểm tra không kết luận; $F=0$ cho thấy đây là cực tiểu toàn cục.

**Kiểm tra lại.** Tại $(1,1)$, hướng của trị riêng $0$ là $(1,-1)$; đường cong $t\mapsto(t,1/t)$ nằm trong tập cực tiểu và có vector tiếp tuyến $(1,-1)$ tại $t=1$.
:::

Dòng kiểm tra của ví dụ chỉ ra nguồn gốc của trị riêng $0$, được phát biểu tổng quát trong nhận xét sau.

::: remark Nhận xét 06.18 (Đối xứng liên tục và Hessian suy biến)
1. Khi một họ đối xứng liên tục, như phép co giãn $(u,v)\mapsto(\omega u,v/\omega)$, giữ nguyên $F$, mọi cực tiểu nằm trên một đường cong gồm toàn cực tiểu; Hessian tại cực tiểu có trị riêng $0$ theo hướng tiếp tuyến của đường cong đó, và Mệnh đề 06.17 không kết luận. Mạng ReLU có đối xứng co giãn tương tự giữa trọng số vào và ra của một đơn vị, vì $\max\{0,\omega z\}=\omega\max\{0,z\}$ đúng với mọi $\omega\ge0$, và cần $\omega>0$ để chia trọng số đi ra cho $\omega$ (Goodfellow, Bengio và Courville, 2016, mục 8.2.2). Đối xứng hoán vị của Mệnh đề 06.8 chỉ tạo các bản sao rời rạc và không sinh trị riêng $0$.
2. Với mạng thật, Hessian có $p^2$ phần tử: $p=78\,601$ cho khoảng $6{,}2\cdot10^9$ phần tử. Mệnh đề 06.17 vì vậy là công cụ phân tích trên ví dụ nhỏ, không phải quy tắc dừng thực hành. Một bảo đảm dùng được cho mạng phải chỉ dùng gradient.
:::

### 4.4 Bổ đề giảm khi không lồi

Ví dụ 06.11 cho thấy cùng một hướng $-\nabla\ell$ có thể làm mất mát giảm hoặc tăng. Bổ đề giảm của Bài 04 trả lời câu hỏi "bước nào chắc chắn giảm", và chứng minh của nó không dùng tính lồi.

::: lemma Bổ đề 06.19 (Bổ đề giảm)
**Giả thiết.** $F:\mathbb R^p\to\mathbb R$ khả vi; $\nabla F$ là $L$-Lipschitz trên một tập lồi $C$, tức $\lVert\nabla F(\theta)-\nabla F(\theta')\rVert\le L\lVert\theta-\theta'\rVert$ với mọi $\theta,\theta'\in C$; $\theta\in C$, $\eta>0$ và $\theta-\eta\nabla F(\theta)\in C$.

**Kết luận.**

$$
F\bigl(\theta-\eta\nabla F(\theta)\bigr)\le F(\theta)-\eta\Bigl(1-\frac{L\eta}2\Bigr)\lVert\nabla F(\theta)\rVert^2 .
\tag{4.2}
$$

Với $\eta=\tfrac1L$, mức giảm ít nhất là $\lVert\nabla F(\theta)\rVert^2/(2L)$; với $0<\eta<\tfrac2L$, vế phải nhỏ hơn $F(\theta)$ khi $\nabla F(\theta)\ne0$.

**Điều kiện áp dụng.** Không cần tính lồi của $F$, không cần điểm cực tiểu; chỉ cần tính trơn trên một tập lồi chứa hai điểm.

**Phạm vi.** Bổ đề so $F$ tại hai điểm liên tiếp, không so với giá trị tối ưu.
:::

::: proof Chứng minh Bổ đề 06.19
**Bước 1 (cận trên bậc hai).** Với $\theta,\theta'\in C$, đặt $s=\theta'-\theta$. Đoạn nối nằm trong $C$ vì $C$ lồi. Theo định lý cơ bản của giải tích dọc đoạn này,

$$
\begin{aligned}
F(\theta')-F(\theta)-\nabla F(\theta)^\top s&=\int_0^1\bigl(\nabla F(\theta+ts)-\nabla F(\theta)\bigr)^\top s\,dt\\
&\le\int_0^1Lt\lVert s\rVert^2\,dt\\
&=\tfrac L2\lVert s\rVert^2 .
\end{aligned}
$$

Dòng thứ hai dùng bất đẳng thức Cauchy–Schwarz và tính Lipschitz: $\lVert\nabla F(\theta+ts)-\nabla F(\theta)\rVert\le Lt\lVert s\rVert$ vì $\theta+ts\in C$. Đây là Bổ đề 04.18, với giả thiết Lipschitz chỉ cần trên $C$.

**Bước 2 (thế bước hạ gradient).** Lấy $\theta'=\theta-\eta\nabla F(\theta)$, tức $s=-\eta\nabla F(\theta)$. Số hạng bậc nhất bằng $-\eta\lVert\nabla F(\theta)\rVert^2$, số hạng bậc hai bằng $\tfrac{L\eta^2}2\lVert\nabla F(\theta)\rVert^2$. Cộng lại được (4.2).

**Bước 3 (hai trường hợp riêng).** Với $\eta=\tfrac1L$, hệ số là $\tfrac1L\cdot\tfrac12=\tfrac1{2L}$. Với $0<\eta<\tfrac2L$, $1-\tfrac{L\eta}2>0$. $\square$
:::

Bổ đề 06.19 là Bổ đề 04.20 và Bổ đề 05b.6 phát biểu lại với giả thiết trơn chỉ trên một tập lồi. Sự thu hẹp này cần thiết cho mạng: với mạng tuyến tính một đơn vị, không có hằng số $L$ toàn cục, như ví dụ sau tính.

::: example Ví dụ 06.14 (Bổ đề giảm trên mạng tuyến tính một đơn vị)
**Dữ kiện.** $F(u,v)=\tfrac12(uv-1)^2$, $\nabla F=(uv-1)(v,u)$, $\nabla^2F=\begin{pmatrix}v^2&2uv-1\\2uv-1&u^2\end{pmatrix}$; điểm $\theta_0=(\tfrac12,\tfrac12)$; vùng $C=[0,1]^2$.

**Hằng số $L$ trên $C$.** Với ma trận đối xứng, mọi trị riêng có trị tuyệt đối không vượt tổng trị tuyệt đối lớn nhất của một hàng. Trên $[0,1]^2$, $v^2\le1$ và $\lvert2uv-1\rvert\le1$, nên mọi trị riêng có trị tuyệt đối không vượt $2$; tại $(1,1)$, trị riêng $2$ đạt được. Khi $\lVert\nabla^2F\rVert\le2$ trên tập lồi $C$, định lý giá trị trung bình dạng tích phân cho $\nabla F$ là $2$-Lipschitz trên $C$, nên $L=2$.

**Gradient tại $\theta_0$.** $uv-1=-\tfrac34$, $\nabla F(\theta_0)=(-\tfrac38,-\tfrac38)$, $\lVert\nabla F(\theta_0)\rVert^2=\tfrac9{32}=0{,}28125$; trùng hợp, $F(\theta_0)=\tfrac12\cdot\tfrac9{16}=\tfrac9{32}$ cũng bằng $0{,}28125$.

**Bảo đảm của Bổ đề 06.19.** Với $\eta=\tfrac1L=\tfrac12$: điểm mới $\theta_1=\theta_0-\tfrac12\nabla F(\theta_0)=(\tfrac{11}{16},\tfrac{11}{16})\in C$, và mức giảm ít nhất là $\tfrac{9/32}{4}=\tfrac9{128}\approx0{,}0703$.

**Giá trị thật.** $u_1v_1=\tfrac{121}{256}$, $F(\theta_1)=\tfrac12(\tfrac{121}{256}-1)^2=\tfrac{18225}{131072}\approx0{,}13905$. Mức giảm thật là $0{,}28125-0{,}13905=0{,}1422$, gấp đôi mức bảo đảm.

**Kiểm tra lại.** Trên hình, cận trên bậc hai dọc hướng $-\nabla F(\theta_0)$ là $\varphi(0)-\eta\lVert\nabla F\rVert^2+\tfrac L2\eta^2\lVert\nabla F\rVert^2=0{,}28125(1-\eta+\eta^2)$; tại $\eta=\tfrac12$ nó bằng $0{,}2109$, lớn hơn giá trị thật $0{,}1390$.
:::

![Trục hoành độ dài bước η từ 0 đến 1, trục tung giá trị từ 0 đến 0,4. Đường liền là φ(η) = F(θ₀ − η∇F(θ₀)) với θ₀ = (½, ½); đường nét đứt là cận trên bậc hai 0,28125(1 − η + η²) với L = 2. Hai đường bắt đầu tại 0,28125. Tại η = ½, cận bằng 0,2109 và giá trị thực bằng 0,1390; đường thực luôn nằm dưới cận.](img/lec-06/descent-bound-product.svg)

Trên hình, parabol nét đứt là vế phải của (4.2) theo $\eta$, còn đường liền là giá trị thật của $F$ dọc tia $\theta_0-\eta\nabla F(\theta_0)$. Đường liền luôn nằm dưới parabol, và parabol đạt cực tiểu tại $\eta=\tfrac1L=\tfrac12$.

Trên các hình vuông lớn hơn, cùng phép tính cho trị riêng lớn nhất về trị tuyệt đối của Hessian bằng $4$ trên $[-1,1]^2$ (đạt tại $(1,-1)$, nơi Hessian là $\begin{pmatrix}1&-3\\-3&1\end{pmatrix}$ với trị riêng $4$ và $-2$) và bằng $13$ trên $[-2,2]^2$. Hằng số $L$ tăng không bị chặn theo kích thước vùng, nên với mạng, giả thiết trơn chỉ đặt được trên một vùng chứa dãy lặp. Với hàm kích hoạt trơn hoặc mạng tuyến tính, chính quy hóa bậc hai làm tập mức dưới (sublevel set) bị chặn, nên có một hằng số $L$ trên tập mức dưới. Với ReLU thì không, vì $\nabla F$ gián đoạn tại điểm gãy.

Bổ đề 06.19 còn cho một cận dưới của độ cong từ Ví dụ 06.11. Ở đó, bước $\eta=0{,}25$ theo hướng $-\nabla\ell$ làm mất mát tăng từ $0{,}125$ lên $1{,}372$. Dọc đoạn nối $\theta$ và $\theta-0{,}25\nabla\ell$, mọi tiền kích hoạt của mẫu $(1,1)$ không nhỏ hơn $\tfrac12$, nên $\ell$ trơn trên đoạn đó. Nếu $\nabla\ell$ là $L$-Lipschitz trên đoạn với $L\le8$ thì $0{,}25\le\tfrac2L$, và (4.2) cho mất mát không tăng, mâu thuẫn. Vậy hằng số Lipschitz của gradient dọc đoạn này lớn hơn $8$.

### 4.5 Hội tụ của chuẩn gradient

Bổ đề 06.19 bảo đảm $F$ giảm ở mỗi bước. Cộng các mức giảm theo nhiều bước, ta được bảo đảm cơ bản của hạ gradient trên hàm không lồi trơn: chuẩn gradient phải nhỏ ở một bước nào đó. Định lý sau là Định lý 05b.41 phát biểu lại với ký hiệu của chương.

::: theorem Định lý 06.20 (Hạ gradient trên hàm không lồi)
**Giả thiết.**

- H0: $F$ khả vi và bị chặn dưới, $F_{\inf}=\inf_\theta F(\theta)>-\infty$.
- H2: $\nabla F$ là $L$-Lipschitz trên một tập lồi chứa mọi điểm lặp.
- $\theta_0\in\mathbb R^p$, $\Delta_0=F(\theta_0)-F_{\inf}$; dãy $\theta_{k+1}=\theta_k-\tfrac1L\nabla F(\theta_k)$.

**Kết luận.** Với mọi $K\ge1$,

$$
\min_{0\le k<K}\lVert\nabla F(\theta_k)\rVert^2\le\frac{2L\Delta_0}K .
\tag{4.3}
$$

**Điều kiện áp dụng.** Không cần tính lồi, không cần điểm cực tiểu. Với mạng, áp dụng được khi hàm kích hoạt trơn (chẳng hạn $\tanh$, softplus) hoặc với mạng tuyến tính; với ReLU, $\nabla F$ gián đoạn tại điểm gãy, nên H2 không đúng trên vùng nào chứa điểm gãy, và (4.3) chỉ dùng làm định hướng.

**Phạm vi.** Định lý không khẳng định $\theta_k$ hội tụ, không khẳng định điểm giới hạn là cực tiểu, không chặn $F(\theta_k)-F_{\inf}$, và chỉ chặn bước tốt nhất, không chặn bước cuối.
:::

::: proof Chứng minh Định lý 06.20
**Bước 1 (một bước).** Bổ đề 06.19 với $\eta=\tfrac1L$, áp trên tập lồi của H2, cho

$$
F(\theta_{k+1})\le F(\theta_k)-\frac1{2L}\lVert\nabla F(\theta_k)\rVert^2,\qquad k=0,1,\ldots
$$

**Bước 2 (triệt tiêu liên tiếp).** Cộng $K$ bất đẳng thức với $k=0,\ldots,K-1$; các số hạng $F(\theta_1),\ldots,F(\theta_{K-1})$ triệt tiêu:

$$
\begin{aligned}
\frac1{2L}\sum_{k<K}\lVert\nabla F(\theta_k)\rVert^2&\le F(\theta_0)-F(\theta_K)\\
&\le F(\theta_0)-F_{\inf}\\
&=\Delta_0,
\end{aligned}
$$

trong đó bất đẳng thức thứ hai dùng H0.

**Bước 3 (từ tổng sang cực tiểu).** Tổng của $K$ số không âm không nhỏ hơn $K$ lần số nhỏ nhất, nên $\tfrac K{2L}\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le\Delta_0$. Chia cho $\tfrac K{2L}$ được (4.3). $\square$
:::

Định lý 06.20 cho tốc độ $O(1/K)$ cho bình phương chuẩn gradient, tức $O(1/\sqrt K)$ cho chính chuẩn. So với Định lý 05b.18 cho hàm lồi mạnh, định lý bỏ H3 và trả bằng hai điều: đại lượng được chặn chuyển từ khoảng cách tới nghiệm sang chuẩn gradient, và tốc độ chuyển từ tuyến tính sang $O(1/K)$. Ví dụ sau so cận với dãy thật.

::: example Ví dụ 06.15 (Số bước theo cận của Định lý 06.20 và số bước thật)
**Dữ kiện.** $F(u,v)=\tfrac12(uv-1)^2$; $\theta_0=(\tfrac12,\tfrac12)$; $L=2$ trên $[0,1]^2$ (Ví dụ 06.14); $F_{\inf}=0$, nên $\Delta_0=F(\theta_0)=0{,}28125$. Yêu cầu: $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le0{,}01$.

**Kiểm tra giả thiết.** H0 đúng với $F_{\inf}=0$. Dãy $\theta_k$ nằm trên đường chéo $u=v=t_k$ với $t_{k+1}=t_k+\tfrac12t_k(1-t_k^2)$; hàm $t\mapsto t+\tfrac12t(1-t^2)$ tăng trên $[0,1]$ và giữ $[0,1]$, nên mọi điểm lặp ở trong $[0,1]^2$, nơi H2 đúng với $L=2$.

**Theo cận.** $\tfrac{2L\Delta_0}K\le0{,}01$ khi $K\ge\tfrac{2\cdot2\cdot0{,}28125}{0{,}01}=112{,}5$, tức $K=113$.

**Dãy thật.** Hạ gradient bước $\tfrac12$ cho $\lVert\nabla F(\theta_k)\rVert^2$ lần lượt bằng $0{,}28125$; $0{,}26288$; $0{,}09078$; $0{,}00453$ tại $k=0,1,2,3$. Vậy $K=4$ đã đủ.

**Diễn giải.** Cận đúng cho mọi hàm thỏa giả thiết, nên trên một hàm cụ thể nó có thể lớn hơn số bước thật nhiều lần, ở đây gần $30$ lần.

**Kiểm tra lại.** Tại $k=1$, $t_1=0{,}6875$, $t_1^2-1=-0{,}52734$, $\lVert\nabla F\rVert^2=2t_1^2(t_1^2-1)^2\approx2\cdot0{,}47266\cdot0{,}27809\approx0{,}26288$.
:::

### 4.6 Bình nguyên gần điểm yên ngựa

Định lý 06.20 chỉ chứng nhận rằng một bước nào đó có gradient nhỏ. Ví dụ sau cho thấy bước đó có thể nằm ngay cạnh một điểm yên ngựa, với giá trị $F$ còn xa cực tiểu.

::: example Ví dụ 06.16 (Bình nguyên gần điểm yên ngựa)
**Dữ kiện.** $F(u,v)=\tfrac12(uv-1)^2$; hạ gradient bước $\eta=\tfrac12$ từ $\theta_0=(0{,}01;\ 0{,}01)$; ngưỡng dừng $\varepsilon^2=2\cdot10^{-4}$ cho $\lVert\nabla F\rVert^2$.

**Rút về một chiều.** Vì $u_0=v_0$ và hai thành phần của $\nabla F$ đối xứng, dãy ở mãi trên đường chéo $u=v=t_k$, với

$$
t_{k+1}=t_k+\tfrac12t_k(1-t_k^2),\qquad F=\tfrac12(t_k^2-1)^2,\qquad\lVert\nabla F\rVert^2=2t_k^2(1-t_k^2)^2 .
$$

Như ở Ví dụ 06.15, dãy ở trong $[0,1]^2$, nơi $L=2$, nên $\eta=\tfrac12=\tfrac1L$ hợp lệ.

**Quỹ đạo.**

| $k$ | $t_k$ | $F(\theta_k)$ | $\lVert\nabla F(\theta_k)\rVert^2$ |
|---:|---:|---:|---:|
| $0$ | $0{,}0100$ | $0{,}4999$ | $2{,}00\cdot10^{-4}$ |
| $5$ | $0{,}0758$ | $0{,}4943$ | $1{,}14\cdot10^{-2}$ |
| $8$ | $0{,}2519$ | $0{,}4386$ | $0{,}111$ |
| $10$ | $0{,}5294$ | $0{,}2590$ | $0{,}290$ |
| $12$ | $0{,}8934$ | $0{,}0204$ | $0{,}065$ |
| $13$ | $0{,}9835$ | $5{,}3\cdot10^{-4}$ | $2{,}06\cdot10^{-3}$ |
| $14$ | $0{,}9996$ | $\approx0$ | $1{,}3\cdot10^{-6}$ |

**Đọc bảng.** Gần gốc, $t_{k+1}\approx1{,}5\,t_k$, nên $t$ tăng theo cấp số nhân từ $0{,}01$ và cần khoảng $8$ bước để rời vùng $F\approx\tfrac12$. Tiêu chí dừng $\lVert\nabla F(\theta_k)\rVert^2\le\varepsilon^2$ đã thỏa tại $k=0$, khi $F(\theta_0)\approx0{,}4999$ gần giá trị $\tfrac12$ tại điểm yên ngựa.

**Kiểm tra lại.** Tại $k=0$, $\lVert\nabla F\rVert^2=2\cdot10^{-4}(1-10^{-4})^2\approx2{,}00\cdot10^{-4}$, đúng bằng ngưỡng.
:::

![Hai đồ thị theo số bước k từ 0 đến 15, hạ gradient bước ½ từ θ₀ = (0,01; 0,01). Đồ thị thứ nhất: F(θₖ) giữ gần 0,5, giá trị tại điểm yên ngựa, tới khoảng k = 7, rồi giảm nhanh về 0 từ k = 10 đến k = 13. Đồ thị thứ hai: ‖∇F(θₖ)‖² trên thang logarit, tăng từ 2·10⁻⁴ tại k = 0 lên khoảng 0,29 tại k = 10 rồi giảm còn 1,3·10⁻⁶ tại k = 14; đường ngang ε² = 2·10⁻⁴ cho thấy θ₀ đã là điểm dừng ε-xấp xỉ.](img/lec-06/saddle-plateau.svg)

Đồ thị thứ nhất cho thấy một bình nguyên (plateau): một vùng gradient nhỏ, giá trị mục tiêu gần như không đổi và còn xa cực tiểu. Ở ví dụ này, vùng đó bao quanh điểm yên ngựa. Đồ thị thứ hai cho thấy chuẩn gradient không đơn điệu: nó tăng khi dãy rời điểm yên ngựa, đạt đỉnh tại $k=10$, rồi giảm khi dãy tới tập cực tiểu.

Goodfellow, Bengio và Courville (2016, mục 8.2.3, tr. 285–286) tách bình nguyên, vùng phẳng rộng có giá trị gần như không đổi, khỏi điểm yên ngựa, và ghi nhận rằng trong thực nghiệm, hạ gradient thường thoát được điểm yên ngựa; vấn đề nằm ở thời gian đi qua vùng phẳng và ở cách đọc tiêu chí dừng.

::: remark Nhận xét 06.21 (Những điều Định lý 06.20 không khẳng định)
1. Định lý không phân biệt cực tiểu với điểm yên ngựa: bước được chứng nhận ở Ví dụ 06.16 là $k=0$, cạnh điểm yên ngựa.
2. Định lý không cho biết $\theta_k$ tới cực tiểu nào trên tập cực tiểu, cũng không chặn khoảng cách tới một cực tiểu.
3. Định lý không chặn $F(\theta_k)-F_{\inf}$; ở Ví dụ 06.16, tại bước được chứng nhận, $F-F_{\inf}\approx0{,}5$.
4. Xuất phát đúng tại điểm yên ngựa $(0,0)$, hạ gradient đứng yên mãi vì $\nabla F(0,0)=0$; Định lý 06.20 vẫn đúng, với $\min_{k<K}\lVert\nabla F\rVert^2=0$.
:::

**Trong học máy.** Tiêu chí dừng theo chuẩn gradient vẫn được dùng khi huấn luyện mạng, nhưng nó chỉ xác nhận một điểm dừng xấp xỉ. Với mạng tuyến tính, khởi tạo mọi trọng số rất nhỏ đặt dãy lặp gần điểm yên ngựa ở gốc (Ví dụ 06.13); Ví dụ 06.16 cho thấy khi đó giá trị mất mát có thể đứng yên nhiều bước trước khi giảm, và một tiêu chí dừng chỉ dựa vào chuẩn gradient sẽ kết thúc huấn luyện tại $F\approx\tfrac12$.

Trong thực hành, người ta theo dõi cả giá trị mất mát trên tập xác thực (Mục 6.6), không chỉ chuẩn gradient. Giả thiết H2 của Định lý 06.20 đúng với mạng có hàm kích hoạt trơn trên một vùng bị chặn; với mạng ReLU phổ biến, định lý là định hướng về bậc của tốc độ, không phải bảo đảm.

::: exercise Bài tập 06.3 (Chính quy hóa bậc hai trên mạng tuyến tính một đơn vị)
Cho $F_\lambda(u,v)=\tfrac12(uv-1)^2+\tfrac\lambda2(u^2+v^2)$ với $\lambda=\tfrac12$.

1. Chứng minh mọi điểm dừng của $F_\lambda$ thỏa $u^2=v^2$, rồi tìm tất cả các điểm dừng.
2. Phân loại từng điểm dừng bằng Mệnh đề 06.17 và tính giá trị $F_\lambda$ tại đó.
3. So sánh với $F_0(u,v)=\tfrac12(uv-1)^2$ của Ví dụ 06.12: tập cực tiểu thay đổi thế nào, và Hessian tại cực tiểu còn suy biến hay không.
:::

::: hint
Ở câu 1, nhân phương trình $\partial F_\lambda/\partial u=0$ với $u$, phương trình $\partial F_\lambda/\partial v=0$ với $v$, rồi trừ. Xét riêng hai trường hợp $u=v$ và $u=-v$.
:::

::: solution
1. $\nabla F_\lambda=\bigl((uv-1)v+\lambda u,\ (uv-1)u+\lambda v\bigr)$. Nhân thành phần thứ nhất với $u$, thành phần thứ hai với $v$, hai phương trình bằng $0$ cho $(uv-1)uv+\lambda u^2=0$ và $(uv-1)uv+\lambda v^2=0$; trừ hai đẳng thức được $\lambda(u^2-v^2)=0$, nên $u^2=v^2$ vì $\lambda>0$.

- **Trường hợp $u=v$.** Thành phần thứ nhất thành $u(u^2-1+\lambda)=0$, nên $u=0$ hoặc $u^2=1-\lambda=\tfrac12$.
- **Trường hợp $u=-v$.** Thành phần thứ nhất thành $(-u^2-1)(-u)+\lambda u=u(u^2+1+\lambda)=0$, nên $u=0$.

Các điểm dừng là $(0,0)$, $(\tfrac1{\sqrt2},\tfrac1{\sqrt2})$ và $(-\tfrac1{\sqrt2},-\tfrac1{\sqrt2})$.

2. $\nabla^2F_\lambda=\begin{pmatrix}v^2+\lambda&2uv-1\\2uv-1&u^2+\lambda\end{pmatrix}$.

- Tại $(0,0)$: $\begin{pmatrix}\tfrac12&-1\\-1&\tfrac12\end{pmatrix}$ có trị riêng $\tfrac12\pm1$, tức $-\tfrac12$ và $\tfrac32$: điểm yên ngựa, $F_\lambda=\tfrac12$.
- Tại $\pm(\tfrac1{\sqrt2},\tfrac1{\sqrt2})$: $uv=\tfrac12$, nên $2uv-1=0$ và $v^2+\lambda=1$; Hessian là $I$, xác định dương: cực tiểu địa phương chặt, $F_\lambda=\tfrac12\cdot\tfrac14+\tfrac14\cdot1=\tfrac38$.

Vì $F_\lambda\to\infty$ khi $\lVert(u,v)\rVert\to\infty$, $F_\lambda$ đạt cực tiểu toàn cục tại một điểm dừng; so ba giá trị, hai điểm $\pm(\tfrac1{\sqrt2},\tfrac1{\sqrt2})$ là cực tiểu toàn cục.

3. Không chính quy hóa, tập cực tiểu là cả hyperbol $uv=1$ và Hessian tại cực tiểu có trị riêng $0$ (Ví dụ 06.13). Với $\lambda=\tfrac12$, số hạng $\tfrac\lambda2(u^2+v^2)$ phá đối xứng co giãn $(u,v)\mapsto(\omega u,v/\omega)$, chỉ còn đối xứng đổi dấu; tập cực tiểu gồm hai điểm cô lập và Hessian tại đó bằng $I$. Điểm yên ngựa tại gốc vẫn còn, và $F_\lambda$ vẫn không lồi.

**Kiểm tra.** Tại $(\tfrac1{\sqrt2},\tfrac1{\sqrt2})$: $(uv-1)v+\lambda u=(-\tfrac12)\tfrac1{\sqrt2}+\tfrac12\cdot\tfrac1{\sqrt2}=0$.
:::

Như vậy, khi mục tiêu không lồi, điểm dừng (Định nghĩa 06.16) có thể là cực tiểu, cực đại địa phương hoặc điểm yên ngựa, và thông tin bậc hai chỉ phân loại được khi Hessian không suy biến (Mệnh đề 06.17, Nhận xét 06.18). Bảo đảm còn lại chỉ dùng gradient là bổ đề giảm (Bổ đề 06.19) và tốc độ $O(1/K)$ cho bình phương chuẩn gradient nhỏ nhất (Định lý 06.20). Tuy nhiên, cả hai đều cần $\nabla F(\theta_k)$ đầy đủ ở mỗi bước, mỗi lần tốn $O(np)$ theo Mệnh đề 06.15. Trong Mục 5, chúng ta giữ các giả thiết về $F$ của Định lý 06.20 nhưng thay giả thiết "tính được gradient đầy đủ" bằng một ngân sách tính toán cố định cho mỗi bước.

## 5. Gradient nhóm nhỏ và chi phí mỗi bước

Thay gradient đầy đủ bằng một ước lượng rẻ hơn đặt ra hai yêu cầu. Thứ nhất, chúng ta cần định lượng ở quy mô nào một bước dùng đủ $n$ mẫu vượt ngân sách. Thứ hai, chúng ta cần biết gradient trên một nhóm nhỏ mẫu chọn ngẫu nhiên đúng theo nghĩa nào và sai bao nhiêu. Ta lập bảng chi phí, nhắc lại vì sao $F$ chỉ cần được tối ưu tới một mức vừa đủ, rồi tính kỳ vọng và phương sai của gradient nhóm.

### 5.1 Chi phí một bước của ba phương pháp

Ba phương pháp được so sánh là hạ gradient đầy đủ, Newton và hạ gradient ngẫu nhiên trên nhóm $b$ mẫu. Mô hình chi phí đếm phép nhân–cộng của một bước: hạ gradient đầy đủ tốn $np$ (lan truyền ngược trên $n$ mẫu, Mệnh đề 06.15); Newton tốn $np^2+p^3$ (lập Hessian từ $n$ mẫu và giải hệ $p\times p$, Mệnh đề 05.35); SGD trên nhóm $b$ mẫu tốn $bp$.

::: example Ví dụ 06.17 (Chi phí một bước ở ba quy mô)
**Dữ kiện.** Ba bộ $(n,p,b)$ minh họa; máy giả định thực hiện $10^{12}$ phép nhân–cộng mỗi giây; một năm bằng $3{,}156\cdot10^7$ giây; bỏ hằng số và song song phần cứng.

| $(n,\ p,\ b)$ | hạ gradient: $np$ | Newton: $np^2+p^3$ | SGD: $bp$ |
|---|---:|---:|---:|
| $(10^3,\ 10^2,\ 10)$ | $10^5$ | $1{,}1\cdot10^7$ | $10^3$ |
| $(10^5,\ 10^5,\ 100)$ | $10^{10}$ ($0{,}01$ s) | $2\cdot10^{15}$ ($2000$ s) | $10^7$ |
| $(10^9,\ 10^9,\ 10^3)$ | $10^{18}$ ($11{,}6$ ngày) | $2\cdot10^{27}$ ($6{,}3\cdot10^7$ năm) | $10^{12}$ ($1$ s) |

**Đọc bảng.** Ở quy mô thứ ba, một bước hạ gradient đầy đủ đã vượt ngân sách của một bước, một bước Newton không thực hiện được, còn một bước SGD có chi phí không phụ thuộc $n$. Riêng việc lưu Hessian ở quy mô thứ ba cần $8\cdot10^{18}$ byte với số thực $8$ byte.

**Kiểm tra lại.** Quy mô thứ ba: $10^{18}/10^{12}=10^6$ s, chia cho $86\,400$ được $11{,}57$ ngày; $2\cdot10^{27}/10^{12}=2\cdot10^{15}$ s, chia cho $3{,}156\cdot10^7$ được $6{,}34\cdot10^7$ năm.
:::

Bảng chỉ so chi phí một bước, không so số bước. Một lượt dữ liệu (epoch) tốn $np$ cho cả hạ gradient đầy đủ và SGD: hạ gradient đầy đủ thực hiện một cập nhật, SGD thực hiện $n/b$ cập nhật. Với Newton, giai đoạn hội tụ bậc hai cần khoảng $\log_2\log_2(\varepsilon_0/\varepsilon)$ bước và không chứa số điều kiện $\kappa=L/\mu$, nhưng ngưỡng $\varepsilon_0$ và giai đoạn tắt dần trước đó phụ thuộc chặn dưới $\mu$, chặn trên $L$ của trị riêng Hessian và hằng số Lipschitz $L_H$ của Hessian (Định lý 05.33).

### 5.2 Ước lượng rủi ro kỳ vọng bằng rủi ro thực nghiệm

Bảng chi phí cho lý do tính toán để thay gradient đầy đủ. Lý do thống kê cho biết sự thay thế đó không làm mất điều cần có, vì bản thân $F$ chỉ là ước lượng của $R$. Định lý sau là Định lý 05c.52 (kết luận 1) phát biểu lại.

::: theorem Định lý 06.22 (Rủi ro thực nghiệm tại một tham số cố định)
**Giả thiết.** Các mẫu $(x_i,y_i)$, $i=1,\ldots,n$, độc lập cùng phân phối với $(X,Y)$; $\theta\in\mathbb R^p$ cố định, không phụ thuộc các mẫu; $\sigma_\ell^2(\theta)=\operatorname{Var}\ell\bigl(f(X;\theta),Y\bigr)<\infty$.

**Kết luận.**

$$
\mathbb E\,F(\theta)=R(\theta),\qquad\operatorname{Var}F(\theta)=\frac{\sigma_\ell^2(\theta)}n .
$$

**Điều kiện áp dụng.** Tham số phải được xác định trước khi nhìn các mẫu dùng để tính $F$.

**Phạm vi.** Định lý không áp dụng cho tham số học được từ chính các mẫu đó; với tham số như vậy, $F$ thường nhỏ hơn $R$.
:::

::: proof Chứng minh Định lý 06.22
**Bước 1 (kỳ vọng).** Với $\theta$ cố định, $\ell_i(\theta)=\ell(f(x_i;\theta),y_i)$ là hàm của riêng mẫu $i$, nên các $\ell_i(\theta)$ độc lập, cùng phân phối với $\ell(f(X;\theta),Y)$ và có kỳ vọng $R(\theta)$. Tính tuyến tính của kỳ vọng cho $\mathbb EF(\theta)=\tfrac1n\sum_i\mathbb E\ell_i(\theta)=R(\theta)$.

**Bước 2 (phương sai).** Phương sai của tổng các biến độc lập bằng tổng phương sai, nên

$$
\begin{aligned}
\operatorname{Var}F(\theta)&=\frac1{n^2}\sum_i\operatorname{Var}\ell_i(\theta)\\
&=\frac{n\,\sigma_\ell^2(\theta)}{n^2}\\
&=\frac{\sigma_\ell^2(\theta)}n .
\end{aligned}
$$

$\square$
:::

Định lý nói rằng tại một tham số cố định, $F$ lệch $R$ một lượng có độ lệch chuẩn $\sigma_\ell(\theta)/\sqrt n$, tức bậc $1/\sqrt n$. Giả thiết "$\theta$ không phụ thuộc các mẫu" đúng với tập xác thực và tập kiểm thử, nhưng sai với tham số vừa huấn luyện trên chính các mẫu đó. Điều này dẫn tới một nhận xét về độ chính xác tối ưu cần thiết.

::: remark Nhận xét 06.23 (Phân tích của Bottou và Bousquet)
Bottou và Bousquet tách sai số vượt (excess error) của mô hình học được thành ba thành phần: sai số xấp xỉ (do lớp mô hình), sai số ước lượng (do chỉ có $n$ mẫu) và sai số tối ưu (do dừng thuật toán trước cực tiểu chính xác) (Bài 05c, Nhận xét 05c.58; Bottou và Bousquet, 2011, mục 13.2.3, tr. 354–355). Với bài toán lồi, khi thời gian tính toán là ràng buộc chính, giảm sai số tối ưu xuống dưới bậc của sai số ước lượng không cải thiện bậc của cận sai số vượt; thời gian đó dùng tốt hơn để xử lý thêm mẫu. Phân tích này cho bài toán lồi; với mạng, mức chính xác đủ dùng được quyết định bằng tập xác thực (Mục 6.6).
:::

Số liệu sau, lấy từ cùng tài liệu, minh họa nhận xét trên một bài toán phân loại văn bản thật.

::: example Ví dụ 06.18 (Máy vector hỗ trợ tuyến tính trên RCV1)
**Dữ kiện.** Bottou và Bousquet (2011, Bảng 13.3, tr. 363): máy vector hỗ trợ (support vector machine, SVM) tuyến tính với mất mát bản lề (hinge loss), hệ số chính quy hóa $\lambda=10^{-4}$, tập RCV1 với $n=781\,265$ văn bản huấn luyện và $d=47\,152$ đặc trưng. SVMLight và SVMPerf là hai bộ giải dùng toàn bộ dữ liệu; SGD dùng một mẫu mỗi bước với bước $\eta_t=1/(\lambda(t+t_0))$.

| Phương pháp | Thời gian huấn luyện | Giá trị mục tiêu | Lỗi kiểm thử |
|---|---:|---:|---:|
| SVMLight | $23\,642$ s | $0{,}2275$ | $6{,}02\,\%$ |
| SVMPerf | $66$ s | $0{,}2278$ | $6{,}03\,\%$ |
| SGD | $1{,}4$ s | $0{,}2275$ | $6{,}02\,\%$ |

**Đọc bảng.** Ba phương pháp đạt lỗi kiểm thử $6{,}02\,\%$, $6{,}03\,\%$ và $6{,}02\,\%$, trong khi thời gian chênh nhau khoảng bốn bậc giữa SVMLight và SGD.

**Giới hạn.** Mất mát bản lề không khả vi và thí nghiệm dùng một mẫu mỗi bước, nên giả thiết của các định lý ở Mục 6 không thỏa nguyên văn; chỉ dạng lịch bước $\tfrac1{\lambda t}$ giống lịch bước của Định lý 06.32, với $\lambda$ đóng vai hằng số lồi mạnh. Thí nghiệm khoảng năm 2011 là một minh họa có nguồn, không phải quy luật chung.

**Kiểm tra lại.** $23\,642/1{,}4\approx1{,}7\cdot10^4$, tức hơn bốn bậc độ lớn.
:::

Trong Bài 05 (Ví dụ 05.25), chúng ta đã xét các dòng mất mát logistic của cùng bảng; ở đó SGD đạt cùng lỗi kiểm thử với thời gian nhỏ hơn một bậc so với Newton miền tin cậy.

### 5.3 Gradient nhóm nhỏ

Hai lý do trên dẫn tới việc thay $\nabla F(\theta_k)$ bằng trung bình gradient trên $b$ mẫu chọn ngẫu nhiên. Trước khi phát biểu tổng quát, ta xem ước lượng đó thay đổi theo nhóm ra sao trên một bộ dữ liệu nhỏ.

::: example Ví dụ 06.19 (Gradient nhóm trên dữ liệu bốn điểm)
**Dữ kiện.** $x=(-1,0,1,2)$, $y=(1,0,1,4)$, mô hình $f(x;w,c)=wx+c$, $\theta=(w,c)$, mất mát $\ell_i=\tfrac12(wx_i+c-y_i)^2$, $F=\tfrac14\sum_i\ell_i$; điểm $\theta_0=(0,0)$; nhóm $b=2$ mẫu chọn đều không hoàn lại; bước $\eta=\tfrac14$.

**Gradient mẫu.** $\nabla\ell_i(\theta)=(wx_i+c-y_i)(x_i,1)$. Tại $\theta_0$, các phần dư là $-y_i$, nên bốn gradient mẫu là $(1,-1)$, $(0,0)$, $(-1,-1)$, $(-8,-4)$, và $\nabla F(\theta_0)=(-2;\ -1{,}5)$, $F(\theta_0)=\tfrac14\cdot\tfrac12(1+0+1+16)=\tfrac94$.

**Sáu nhóm.** Mỗi nhóm có xác suất $\tfrac16$. Gradient nhóm $\widehat g$ là trung bình hai gradient mẫu, và $\theta_1=\theta_0-\tfrac14\widehat g$:

| nhóm | $\{1,2\}$ | $\{1,3\}$ | $\{1,4\}$ | $\{2,3\}$ | $\{2,4\}$ | $\{3,4\}$ |
|---|---|---|---|---|---|---|
| $\widehat g$ | $(\tfrac12,-\tfrac12)$ | $(0,-1)$ | $(-\tfrac72,-\tfrac52)$ | $(-\tfrac12,-\tfrac12)$ | $(-4,-2)$ | $(-\tfrac92,-\tfrac52)$ |
| $F(\theta_1)$ | $2{,}324$ | $1{,}906$ | $0{,}605$ | $1{,}840$ | $0{,}625$ | $0{,}559$ |

**Đọc bảng.** Trung bình sáu vector $\widehat g$ là $(-2;\ -1{,}5)=\nabla F(\theta_0)$. Nhóm $\{1,2\}$ làm $F$ tăng từ $2{,}25$ lên $2{,}324$, dù hướng của nó là hướng giảm của hai mẫu trong nhóm. Kỳ vọng của $F(\theta_1)$ theo sáu nhóm là $\tfrac{503}{384}\approx1{,}310$, còn bước với gradient đầy đủ cho $\theta_1=(\tfrac12,\tfrac38)$ và $F=\tfrac{133}{128}\approx1{,}039$.

**Kiểm tra lại.** Tổng thành phần thứ nhất của sáu $\widehat g$: $\tfrac12+0-\tfrac72-\tfrac12-4-\tfrac92=-12$, chia $6$ được $-2$. Với nhóm $\{1,2\}$: $\theta_1=(-\tfrac18,\tfrac18)$, phần dư $wx_i+c-y_i$ là $-\tfrac34,\tfrac18,-1,-\tfrac{33}8$, nên $F=\tfrac18\bigl(\tfrac9{16}+\tfrac1{64}+1+\tfrac{1089}{64}\bigr)=\tfrac{595}{256}\approx2{,}324$.
:::

![Mặt phẳng hai thành phần (w, c) của gradient. Sáu mũi tên mảnh từ gốc tới sáu gradient nhóm: {1,2}: (0,5; −0,5); {1,3}: (0; −1); {1,4}: (−3,5; −2,5); {2,3}: (−0,5; −0,5); {2,4}: (−4; −2); {3,4}: (−4,5; −2,5). Mũi tên đậm là gradient đầy đủ ∇F(θ₀) = (−2; −1,5), bằng trung bình của sáu mũi tên.](img/lec-06/batch-gradients.svg)

Trên hình, sáu mũi tên mảnh tỏa ra quanh mũi tên đậm. Về mặt trực quan, gradient nhóm đúng "trung bình" nhưng sai ở từng lần chọn; mức tỏa của các mũi tên là phương sai của ước lượng. Nhận xét này chưa phải định lý; định nghĩa và định lý sau làm nó chính xác.

::: definition Định nghĩa 06.24 (Gradient nhóm nhỏ)
Cho $F=\tfrac1n\sum_{i=1}^n\ell_i$ với mọi $\ell_i$ khả vi tại $\theta\in\mathbb R^p$; đặt $g_i=\nabla\ell_i(\theta)$ và $\bar g=\nabla F(\theta)=\tfrac1n\sum_ig_i$.

**Hiệp phương sai của gradient một mẫu.**

$$
\Sigma(\theta)=\frac1n\sum_{i=1}^n(g_i-\bar g)(g_i-\bar g)^\top,\qquad\operatorname{tr}\Sigma(\theta)=\frac1n\sum_{i=1}^n\lVert g_i-\bar g\rVert^2 .
$$

**Gradient nhóm nhỏ.** Với một nhóm (minibatch) gồm $b$ chỉ số $I_1,\ldots,I_b\in\{1,\ldots,n\}$,

$$
\widehat g=\frac1b\sum_{t=1}^bg_{I_t}.
\tag{5.1}
$$

**Hai cách chọn.** *Có hoàn lại*: $I_1,\ldots,I_b$ độc lập, mỗi chỉ số đều trên $\{1,\ldots,n\}$. *Không hoàn lại*: $\{I_1,\ldots,I_b\}$ là một tập con $b$ phần tử chọn đều trong $\binom nb$ tập con, với $b\le n$.
:::

Trong định nghĩa, $\operatorname{tr}\Sigma(\theta)$ là phương sai tổng của gradient một mẫu chọn đều: trung bình bình phương khoảng cách từ các gradient mẫu tới trung bình của chúng. Khi $b=n$ và chọn không hoàn lại, nhóm là toàn bộ dữ liệu và $\widehat g=\bar g$. Khi $b=1$, $\widehat g$ là gradient của một mẫu, như thuật toán SGD gốc.

::: theorem Định lý 06.25 (Tính không chệch và sai số của gradient nhóm)
**Giả thiết.** Như Định nghĩa 06.24; $\theta$ cố định, không phụ thuộc nhóm đang được chọn.

**Kết luận.**

1. Chọn có hoàn lại: $\mathbb E\widehat g=\nabla F(\theta)$ và $\mathbb E\lVert\widehat g-\nabla F(\theta)\rVert^2=\dfrac{\operatorname{tr}\Sigma(\theta)}b$.
2. Chọn không hoàn lại, $n\ge2$, $1\le b\le n$: $\mathbb E\widehat g=\nabla F(\theta)$ và

$$
\mathbb E\lVert\widehat g-\nabla F(\theta)\rVert^2=\frac{\operatorname{tr}\Sigma(\theta)}b\cdot\frac{n-b}{n-1}.
\tag{5.2}
$$

**Điều kiện áp dụng.** Mọi $\ell_i$ khả vi tại $\theta$. Với mạng ReLU, điều này loại các $\theta$ có tiền kích hoạt bằng $0$ tại một mẫu; tại đó vector của lan truyền ngược là kết quả của quy ước $\sigma'(0)=0$ (Nhận xét 06.14).

**Phạm vi.** Định lý nói về một bước với $\theta$ cố định. Trong dãy lặp, $\theta_k$ phụ thuộc các nhóm trước; Mệnh đề 06.27 chuyển định lý sang trường hợp đó.
:::

::: proof Chứng minh Định lý 06.25
Đặt $a_i=g_i-\bar g$. Khi đó $\sum_ia_i=0$, $\tfrac1n\sum_i\lVert a_i\rVert^2=\operatorname{tr}\Sigma(\theta)$ và $\widehat g-\bar g=\tfrac1b\sum_ta_{I_t}$.

**Bước 1 (có hoàn lại).** Mỗi $I_t$ đều trên $\{1,\ldots,n\}$, nên $\mathbb Ea_{I_t}=\tfrac1n\sum_ia_i=0$, kéo theo $\mathbb E\widehat g=\bar g$. Với $t\ne t'$, $I_t$ và $I_{t'}$ độc lập, nên $\mathbb E[a_{I_t}^\top a_{I_{t'}}]=(\mathbb Ea_{I_t})^\top(\mathbb Ea_{I_{t'}})=0$. Do đó

$$
\begin{aligned}
\mathbb E\lVert\widehat g-\bar g\rVert^2&=\frac1{b^2}\sum_{t=1}^b\mathbb E\lVert a_{I_t}\rVert^2\\
&=\frac1{b^2}\cdot b\operatorname{tr}\Sigma(\theta)\\
&=\frac{\operatorname{tr}\Sigma(\theta)}b .
\end{aligned}
$$

**Bước 2 (không hoàn lại: kỳ vọng).** Mỗi chỉ số $i$ thuộc nhóm với xác suất $\tfrac bn$, nên $\mathbb E\widehat g=\tfrac1b\sum_i\tfrac bng_i=\bar g$.

**Bước 3 (không hoàn lại: sai số).** Mỗi cặp $i\ne j$ cùng thuộc nhóm với xác suất $\tfrac{b(b-1)}{n(n-1)}$. Khai triển bình phương:

$$
\begin{aligned}
\mathbb E\Bigl\lVert\sum_{i\in B}a_i\Bigr\rVert^2&=\sum_i\frac bn\lVert a_i\rVert^2+\sum_{i\ne j}\frac{b(b-1)}{n(n-1)}a_i^\top a_j\\
&=b\operatorname{tr}\Sigma(\theta)+\frac{b(b-1)}{n(n-1)}\Bigl(\Bigl\lVert\sum_ia_i\Bigr\rVert^2-\sum_i\lVert a_i\rVert^2\Bigr)\\
&=b\operatorname{tr}\Sigma(\theta)-\frac{b(b-1)}{n(n-1)}\,n\operatorname{tr}\Sigma(\theta)\\
&=b\operatorname{tr}\Sigma(\theta)\Bigl(1-\frac{b-1}{n-1}\Bigr)=b\operatorname{tr}\Sigma(\theta)\,\frac{n-b}{n-1}.
\end{aligned}
$$

Dòng thứ ba dùng $\sum_ia_i=0$. Chia cho $b^2$ được (5.2). $\square$
:::

Định lý 06.25 là Định lý 05c.53 phát biểu lại; Bài 05c gọi nhóm nhỏ là lô nhỏ. Hệ số $\tfrac{n-b}{n-1}\le1$ cho thấy chọn không hoàn lại không tệ hơn chọn có hoàn lại, và bằng $0$ khi $b=n$.

Sai số chuẩn $\sqrt{\operatorname{tr}\Sigma/b}$ giảm theo $1/\sqrt b$ trong khi chi phí tăng theo $b$ (Mệnh đề 05c.56): tăng kích thước nhóm lên $100$ lần chỉ giảm sai số chuẩn $10$ lần.

Goodfellow, Bengio và Courville (2016, mục 8.1.3, tr. 278) dùng chính phép so sánh này để giải thích vì sao phần lớn thuật toán tối ưu hội tụ nhanh hơn theo tổng chi phí khi dùng ước lượng gradient rẻ.

::: example Ví dụ 06.20 (Kiểm tra Định lý 06.25 trên dữ liệu bốn điểm)
**Dữ kiện.** Dữ liệu bốn điểm $x=(-1,0,1,2)$, $y=(1,0,1,4)$, mô hình $wx+c$, tại $\theta_0=(0,0)$: gradient mẫu $(1,-1)$, $(0,0)$, $(-1,-1)$, $(-8,-4)$; $\nabla F(\theta_0)=(-2;\ -1{,}5)$; sáu gradient nhóm $b=2$ không hoàn lại như Ví dụ 06.19.

**Tính $\operatorname{tr}\Sigma(\theta_0)$.** Sai lệch của bốn gradient mẫu khỏi trung bình là $(3;\ 0{,}5)$, $(2;\ 1{,}5)$, $(1;\ 0{,}5)$, $(-6;\ -2{,}5)$, với bình phương chuẩn $9{,}25$, $6{,}25$, $1{,}25$, $42{,}25$. Trung bình là $\operatorname{tr}\Sigma(\theta_0)=\tfrac{59}4$.

**Theo (5.2).** $\mathbb E\lVert\widehat g-\nabla F\rVert^2=\tfrac{59}4\cdot\tfrac12\cdot\tfrac{4-2}{4-1}=\tfrac{59}{12}$.

**Liệt kê.** Sai lệch của sáu $\widehat g$ khỏi $(-2;\ -1{,}5)$ là $(2{,}5;\ 1)$, $(2;\ 0{,}5)$, $(-1{,}5;\ -1)$, $(1{,}5;\ 1)$, $(-2;\ -0{,}5)$, $(-2{,}5;\ -1)$, với bình phương chuẩn $7{,}25$; $4{,}25$; $3{,}25$; $3{,}25$; $4{,}25$; $7{,}25$. Trung bình là $\tfrac{29{,}5}6=\tfrac{59}{12}$.

**Kiểm tra lại.** Hai cách cho cùng $\tfrac{59}{12}\approx4{,}92$; với chọn có hoàn lại, kết luận 1 cho $\tfrac{59}8\approx7{,}38$, lớn hơn.
:::

### 5.4 Thuật toán hạ gradient ngẫu nhiên nhóm nhỏ

Ghép gradient nhóm với lan truyền ngược, ta được thuật toán sau. Bước chọn nhóm được viết sao cho giả thiết của các định lý hội tụ ở Mục 6 được thỏa.

::: algorithm Thuật toán 06.2 (Hạ gradient ngẫu nhiên nhóm nhỏ)
**Đầu vào.** Dữ liệu $(x_i,y_i)_{i=1}^n$; điểm đầu $\theta_0$; kích thước nhóm $b$; lịch bước $(\eta_k)$; số bước $K$; tập xác thực; chu kỳ đánh giá $s$.

**Đầu ra.** Tham số đã lưu có mất mát xác thực nhỏ nhất.

Với $k=0,1,\ldots,K-1$:

1. Chọn nhóm $B_k$ gồm $b$ chỉ số đều trên $\{1,\ldots,n\}$, độc lập với các nhóm $B_0,\ldots,B_{k-1}$.
2. Tính $\widehat g_k=\tfrac1b\sum_{i\in B_k}\nabla\ell_i(\theta_k)$ bằng lan truyền ngược trên từng mẫu của nhóm.
3. Cập nhật $\theta_{k+1}=\theta_k-\eta_k\widehat g_k$.
4. Nếu $k+1$ chia hết cho $s$: tính mất mát trung bình trên tập xác thực; nếu nhỏ hơn mọi lần trước, lưu $\theta_{k+1}$.

**Chi phí.** Mỗi bước $O(bp)$, không phụ thuộc $n$; một lượt dữ liệu gồm $n/b$ bước, tổng $O(np)$. **Bộ nhớ.** Kích hoạt của $b$ mẫu.
:::

Thuật toán 06.2 nhận lại Thuật toán 8.1 của Goodfellow, Bengio và Courville (2016, tr. 294), thêm bước lưu tham số tốt nhất theo tập xác thực. Để dùng các định lý của Bài 05b cho dãy $\theta_k$ do thuật toán sinh ra, chúng ta cần phát biểu giả thiết về gradient ngẫu nhiên theo lịch sử của dãy.

::: definition Định nghĩa 06.26 (Giả thiết về gradient ngẫu nhiên)
Cho dãy của Thuật toán 06.2. Gọi $\mathcal F_k$ là lịch sử trước bước $k$, gồm $\theta_0$ và các nhóm $B_0,\ldots,B_{k-1}$; khi biết $\mathcal F_k$, điểm $\theta_k$ hoàn toàn xác định. Với mọi $k\ge0$:

**H6 (không chệch).** $\mathbb E[\widehat g_k\mid\mathcal F_k]=\nabla F(\theta_k)$.

**H6a (chặn mômen bậc hai).** $\mathbb E\bigl[\lVert\widehat g_k\rVert^2\mid\mathcal F_k\bigr]\le G^2$.

**H6b (chặn phương sai).** $\mathbb E\bigl[\lVert\widehat g_k-\nabla F(\theta_k)\rVert^2\mid\mathcal F_k\bigr]\le\sigma^2$.
:::

Định nghĩa 06.26 là Định nghĩa 05b.31 viết với $\theta_k$ và $F$. H6a chặn toàn bộ độ lớn của $\widehat g_k$, kể cả phần tín hiệu $\nabla F(\theta_k)$, còn H6b chỉ chặn phần nhiễu quanh tín hiệu. Hai giả thiết nối với nhau bằng đẳng thức tách phương sai $\mathbb E[\lVert\widehat g_k\rVert^2\mid\mathcal F_k]=\lVert\nabla F(\theta_k)\rVert^2+\mathbb E[\lVert\widehat g_k-\nabla F(\theta_k)\rVert^2\mid\mathcal F_k]$, đúng dưới H6 (Bổ đề 05b.32). Mệnh đề sau cho biết khi nào thuật toán thỏa các giả thiết này.

::: proposition Mệnh đề 06.27 (Giả thiết H6, H6b cho Thuật toán 06.2)
**Giả thiết.** Dãy của Thuật toán 06.2; mọi $\ell_i$ khả vi tại mọi điểm lặp; mọi điểm lặp nằm trong một tập $C$ với $\sigma_1^2:=\sup_{\theta\in C}\operatorname{tr}\Sigma(\theta)<\infty$.

**Kết luận.**

1. H6 đúng.
2. H6b đúng với $\sigma^2=\dfrac{\sigma_1^2}b$ khi nhóm chọn có hoàn lại, và với $\sigma^2=\dfrac{\sigma_1^2}b\cdot\dfrac{n-b}{n-1}$ khi nhóm chọn không hoàn lại.

**Điều kiện áp dụng.** Nhóm mới phải được chọn độc lập với lịch sử, như Bước 1 của thuật toán.

**Phạm vi.** Với mục tiêu như dữ liệu bốn điểm, $\operatorname{tr}\Sigma(\theta)$ tăng không bị chặn theo $\theta$, nên H6b chỉ đúng trên một vùng bị chặn.
:::

::: proof Chứng minh Mệnh đề 06.27
**Bước 1 (cố định lịch sử).** Khi biết $\mathcal F_k$, $\theta_k$ là một điểm cố định của $C$, còn $B_k$ được chọn độc lập với $\mathcal F_k$, nên vẫn có phân phối đều như trong Định nghĩa 06.24.

**Bước 2 (áp Định lý 06.25 có điều kiện).** Định lý 06.25 với $\theta=\theta_k$ cho $\mathbb E[\widehat g_k\mid\mathcal F_k]=\nabla F(\theta_k)$, tức H6, và cho $\mathbb E[\lVert\widehat g_k-\nabla F(\theta_k)\rVert^2\mid\mathcal F_k]$ bằng $\operatorname{tr}\Sigma(\theta_k)/b$ hoặc $\operatorname{tr}\Sigma(\theta_k)/b\cdot\tfrac{n-b}{n-1}$.

**Bước 3 (chặn trên $C$).** Vì $\theta_k\in C$, $\operatorname{tr}\Sigma(\theta_k)\le\sigma_1^2$, cho H6b với hằng số đã nêu. $\square$
:::

::: remark Nhận xét 06.28 (Thực hành so với giả thiết)
1. **Xáo trộn theo lượt.** Thực hành thường xáo trộn dữ liệu một lần rồi chia thành $n/b$ nhóm rời nhau cho mỗi lượt. Khi đó các nhóm trong một lượt phụ thuộc nhau, và H6 không đúng chính xác (Bài 05c, Mục 6.7; Goodfellow, Bengio và Courville, 2016, tr. 280–281). Các định lý ở Mục 6 vì vậy mô tả biến thể chọn nhóm độc lập.
2. **Đầu ra không phải $\theta_K$.** Các định lý hội tụ ở Mục 6 chặn đại lượng của dãy lặp, còn Thuật toán 06.2 trả về tham số tốt nhất theo tập xác thực, tức nhắm tới $R$. Hai tiêu chí bổ sung cho nhau; quy tắc lưu tham số tốt nhất được phân tích ở Mục 6.6.
3. **Một bước SGD trên mạng.** Bước 2 của thuật toán là một lần lan truyền ngược trên mỗi mẫu của nhóm, lấy trung bình, rồi cập nhật. Gradient của một mẫu trong nhóm có thể làm mất mát của chính mẫu khác trong nhóm tăng sau bước cập nhật.
:::

**Trong học máy.** Định lý 06.25 giải thích vì sao huấn luyện mạng bằng nhóm nhỏ là hợp lý: chi phí một bước tỉ lệ với $b$ chứ không với $n$, và gradient nhóm đúng theo trung bình. Tính chất quan trọng nhất của SGD, theo Goodfellow, Bengio và Courville (2016, tr. 295), là thời gian tính cho một cập nhật không tăng theo số mẫu huấn luyện, nên phương pháp vẫn hội tụ khi $n$ rất lớn.

Hai giả thiết của mục bị vi phạm trong thực hành. Giả thiết "mọi $\ell_i$ khả vi" bị vi phạm trên một tập có độ đo không với mạng ReLU, và giả thiết "nhóm chọn độc lập" bị vi phạm bởi cách xáo trộn theo lượt; cả hai vi phạm thường được bỏ qua. Cùng với việc H2 không đúng cho ReLU (điều kiện áp dụng của Định lý 06.20), chúng là lý do các định lý ở Mục 6 chỉ là định hướng với mạng ReLU.

::: exercise Bài tập 06.4 (Gradient nhóm chọn có hoàn lại trên dữ liệu bốn điểm)
Cho dữ liệu bốn điểm $x=(-1,0,1,2)$, $y=(1,0,1,4)$, mô hình $wx+c$, $\theta_0=(0,0)$, với bốn gradient mẫu $(1,-1)$, $(0,0)$, $(-1,-1)$, $(-8,-4)$ và $\nabla F(\theta_0)=(-2;\ -1{,}5)$.

1. Với nhóm $b=2$ chọn có hoàn lại, liệt kê $16$ cặp có thứ tự $(I_1,I_2)$ theo các giá trị của $\lVert\widehat g-\nabla F(\theta_0)\rVert^2$ và tính trung bình. So với kết luận 1 của Định lý 06.25.
2. Giải thích vì sao trung bình này lớn hơn giá trị $\tfrac{59}{12}$ của chọn không hoàn lại, dựa vào các cặp $I_1=I_2$.
3. Với $n$ lớn và $b$ cố định, hệ số $\tfrac{n-b}{n-1}$ tiến về đâu, và kết luận gì về sự khác biệt giữa hai cách chọn trong thực hành.
:::

::: hint
Viết $a_i=g_i-\nabla F(\theta_0)$, rồi $\widehat g-\nabla F=\tfrac12(a_{I_1}+a_{I_2})$. Bốn cặp có $I_1=I_2$ cho $\lVert a_i\rVert^2$; mười hai cặp còn lại tạo thành sáu cặp không thứ tự, mỗi cặp xuất hiện hai lần.
:::

::: solution
1. Các sai lệch là $a_1=(3;\ 0{,}5)$, $a_2=(2;\ 1{,}5)$, $a_3=(1;\ 0{,}5)$, $a_4=(-6;\ -2{,}5)$, với $\lVert a_i\rVert^2=9{,}25;\ 6{,}25;\ 1{,}25;\ 42{,}25$.

- Bốn cặp $I_1=I_2=i$ cho $\lVert a_i\rVert^2$, tổng $59$.
- Mười hai cặp $I_1\ne I_2$ là sáu nhóm của Ví dụ 06.20, mỗi nhóm hai lần, với các giá trị $7{,}25;\ 4{,}25;\ 3{,}25;\ 3{,}25;\ 4{,}25;\ 7{,}25$, tổng $2\cdot29{,}5=59$.

Trung bình trên $16$ cặp là $\tfrac{59+59}{16}=\tfrac{59}8$, đúng bằng $\tfrac{\operatorname{tr}\Sigma(\theta_0)}b=\tfrac{59/4}2$.

2. Các cặp $I_1=I_2$ đưa cùng một mẫu vào nhóm hai lần, nên $\widehat g=g_i$ và sai lệch bình phương là $\lVert a_i\rVert^2$, lớn hơn sai lệch bình phương trung bình của hai mẫu khác nhau. Chọn không hoàn lại loại bốn cặp này. Về công thức, $\tfrac{59}{12}=\tfrac{59}8\cdot\tfrac23$ với $\tfrac{n-b}{n-1}=\tfrac23$.

3. $\tfrac{n-b}{n-1}\to1$ khi $n\to\infty$. Với $n=10^6$ và $b=100$, hệ số bằng $0{,}9999$, nên trong thực hành hai cách chọn cho cùng sai số; khác biệt chỉ đáng kể khi $b$ là một phần đáng kể của $n$.

**Kiểm tra.** $\tfrac{59}8\approx7{,}375$ và $\tfrac{59}{12}\approx4{,}917$, tỉ số $\tfrac23$.
:::

Như vậy, chúng ta đã có đủ hai lý do để thay gradient đầy đủ. Lý do tính toán được định lượng bằng bảng chi phí (Ví dụ 06.17). Lý do thống kê dựa trên Định lý 06.22 và phân tích Bottou–Bousquet (Nhận xét 06.23), với số liệu RCV1 (Ví dụ 06.18). Gradient nhóm nhỏ là ước lượng không chệch có sai số $\operatorname{tr}\Sigma/b$ (Định lý 06.25), Thuật toán 06.2 có chi phí $O(bp)$ mỗi bước, và Mệnh đề 06.27 cho các giả thiết H6, H6b trên một vùng. Ví dụ 06.19 cũng cho thấy một bước SGD có thể làm $F$ tăng, và kỳ vọng của $F$ sau một bước SGD lớn hơn giá trị sau một bước hạ gradient đầy đủ. Trong Mục 6, chúng ta xác định hệ quả của nhiễu này lên tốc độ hội tụ sau $K$ bước.

## 6. Tốc độ hội tụ dưới nhiễu và dừng sớm

Với hạ gradient đầy đủ, $\nabla F(\theta^*)=0$, nên một bước xuất phát từ điểm cực tiểu $\theta^*$ đứng yên. Với gradient nhóm nhỏ, tính chất này mất, và Bổ đề 06.19 cùng Định lý 06.20 không còn áp dụng nguyên văn. Chúng ta đo hiện tượng này trên một phản ví dụ, rút ra bất đẳng thức một bước có số hạng nhiễu, rồi phát biểu các định lý hội tụ cho hàm lồi mạnh và hàm không lồi, cùng lý do tốc độ thu được là đủ khi $F$ chỉ là đại lượng thay thế.

### 6.1 Nhiễu của gradient nhóm tại điểm cực tiểu

Ví dụ sau đo hiện tượng đó trên dữ liệu bốn điểm.

::: example Ví dụ 06.21 (Một bước SGD từ điểm cực tiểu của dữ liệu bốn điểm)
**Dữ kiện.** Dữ liệu bốn điểm $x=(-1,0,1,2)$, $y=(1,0,1,4)$, mô hình $wx+c$, $F(\theta)=\tfrac14\sum_i\tfrac12(wx_i+c-y_i)^2$; nhóm $b=2$ chọn đều không hoàn lại; bước $\eta=\tfrac14$; điểm xuất phát $\theta_0=\theta^*$.

**Điểm cực tiểu.** $y=1+x+\varepsilon$ với $\varepsilon=(1,-1,-1,1)$, và $\varepsilon$ trực giao với $(1,1,1,1)$ và với $x$. Do đó phương trình chuẩn cho $\theta^*=(w,c)=(1,1)$, với phần dư $wx_i+c-y_i=-\varepsilon_i$ và $F^*=\tfrac14\cdot\tfrac12\cdot4=\tfrac12$. Hessian là $H=\begin{pmatrix}1{,}5&0{,}5\\0{,}5&1\end{pmatrix}$, với trị riêng $\tfrac{5\mp\sqrt5}4$, tức $\mu\approx0{,}691$ và $L\approx1{,}809$; vì vậy $\eta=\tfrac14\le\tfrac1L$.

**Gradient mẫu tại $\theta^*$.** $\nabla\ell_i(\theta^*)=-\varepsilon_i(x_i,1)$ cho $(1,-1)$, $(0,1)$, $(1,1)$, $(-2,-1)$, với trung bình $0=\nabla F(\theta^*)$ và $\operatorname{tr}\Sigma(\theta^*)=\tfrac14(2+1+2+5)=\tfrac52$.

**Sai số của gradient nhóm.** Định lý 06.25 cho $\mathbb E\lVert\widehat g\rVert^2=\tfrac52\cdot\tfrac12\cdot\tfrac{4-2}{4-1}=\tfrac56$. Liệt kê sáu nhóm cho $\lVert\widehat g\rVert^2=0{,}25;\ 1;\ 1{,}25;\ 1{,}25;\ 1;\ 0{,}25$, trung bình $\tfrac56$. Do đó $\mathbb E\lVert\theta_1-\theta^*\rVert^2=\eta^2\cdot\tfrac56=\tfrac5{96}$.

**Giá trị mục tiêu sau một bước.** Sáu nhóm cho $F(\theta_1)=\tfrac{131}{256},\ \tfrac{35}{64},\ \tfrac{143}{256},\ \tfrac{143}{256},\ \tfrac{35}{64},\ \tfrac{131}{256}$, với trung bình

$$
\mathbb E\,F(\theta_1)=\frac{69}{128}\approx0{,}539>F^*=\frac12 .
$$

**Kiểm tra lại.** Vì $F$ bậc hai và $\nabla F(\theta^*)=0$, $F(\theta_1)-F^*=\tfrac12(\theta_1-\theta^*)^\top H(\theta_1-\theta^*)=\tfrac{\eta^2}2\widehat g^\top H\widehat g$. Sáu giá trị $\widehat g^\top H\widehat g$ là $0{,}375;\ 1{,}5;\ 1{,}875;\ 1{,}875;\ 1{,}5;\ 0{,}375$, trung bình $1{,}25$, nên $\mathbb EF(\theta_1)-F^*=\tfrac1{32}\cdot1{,}25=\tfrac5{128}$ và $\mathbb EF(\theta_1)=\tfrac{64+5}{128}=\tfrac{69}{128}$.
:::

Ví dụ là phản ví dụ cho khẳng định "SGD giảm $F$ theo kỳ vọng ở mọi bước". Gradient đầy đủ tiến về $0$ khi dãy tới nghiệm, nhưng gradient nhóm tại nghiệm vẫn khác $0$, vì nó chỉ bằng $\nabla F$ theo trung bình (Goodfellow, Bengio và Courville, 2016, tr. 294). SGD chỉ còn giữ một bất đẳng thức một bước có thêm số hạng nhiễu.

::: proposition Mệnh đề 06.29 (Bất đẳng thức một bước có nhiễu)
**Giả thiết.** H2: $\nabla F$ là $L$-Lipschitz trên một tập lồi chứa $\theta_k$ và mọi giá trị có thể của $\theta_{k+1}=\theta_k-\eta\widehat g_k$; H6 và H6b (Định nghĩa 06.26) tại bước $k$; bước $\eta>0$ không phụ thuộc nhóm $B_k$.

**Kết luận.**

$$
\mathbb E\bigl[F(\theta_{k+1})\mid\mathcal F_k\bigr]\le F(\theta_k)-\eta\Bigl(1-\frac{L\eta}2\Bigr)\lVert\nabla F(\theta_k)\rVert^2+\frac{L\eta^2}2\sigma^2 .
\tag{6.1}
$$

**Điều kiện áp dụng.** Không cần tính lồi.

**Phạm vi.** Vế phải nhỏ hơn $F(\theta_k)$ chỉ khi $\bigl(1-\tfrac{L\eta}2\bigr)\lVert\nabla F(\theta_k)\rVert^2>\tfrac{L\eta}2\sigma^2$, tức khi gradient đủ lớn so với nhiễu. Gần điểm cực tiểu, vế phải có thể lớn hơn $F(\theta_k)$.
:::

::: proof Chứng minh Mệnh đề 06.29
Viết $\nabla_k=\nabla F(\theta_k)$.

**Bước 1 (cận trên bậc hai cho từng lần chọn).** Bước 1 của chứng minh Bổ đề 06.19 với $\theta=\theta_k$ và $\theta'=\theta_k-\eta\widehat g_k$ cho

$$
F(\theta_{k+1})\le F(\theta_k)-\eta\,\nabla_k^\top\widehat g_k+\frac{L\eta^2}2\lVert\widehat g_k\rVert^2 .
$$

**Bước 2 (kỳ vọng có điều kiện).** Khi biết $\mathcal F_k$, $\theta_k$ và $\nabla_k$ cố định. H6 cho $\mathbb E[\nabla_k^\top\widehat g_k\mid\mathcal F_k]=\nabla_k^\top\nabla_k=\lVert\nabla_k\rVert^2$. Tách phương sai rồi dùng H6b:

$$
\mathbb E\bigl[\lVert\widehat g_k\rVert^2\mid\mathcal F_k\bigr]=\lVert\nabla_k\rVert^2+\mathbb E\bigl[\lVert\widehat g_k-\nabla_k\rVert^2\mid\mathcal F_k\bigr]\le\lVert\nabla_k\rVert^2+\sigma^2 .
$$

Đẳng thức tách đúng vì số hạng chéo $2\nabla_k^\top\mathbb E[\widehat g_k-\nabla_k\mid\mathcal F_k]$ bằng $0$ theo H6.

**Bước 3 (ghép).** Lấy kỳ vọng có điều kiện hai vế của Bước 1 và thế Bước 2:

$$
\mathbb E[F(\theta_{k+1})\mid\mathcal F_k]\le F(\theta_k)-\eta\lVert\nabla_k\rVert^2+\frac{L\eta^2}2\bigl(\lVert\nabla_k\rVert^2+\sigma^2\bigr),
$$

chính là (6.1). $\square$
:::

Mệnh đề 06.29 là Bước 1–2 của chứng minh Định lý 05b.43. So với Bổ đề 06.19, nó có thêm số hạng $\tfrac{L\eta^2}2\sigma^2$ không phụ thuộc gradient, và số hạng này là lý do SGD có thể làm $F$ tăng theo kỳ vọng. Trên Ví dụ 06.21, ta kiểm tra được hai vế.

- Tại $\theta^*$: $\nabla F=0$ và H6b đúng với $\sigma^2=\tfrac56$, nên vế phải bằng $\tfrac12+\tfrac{L}{2}\cdot\tfrac1{16}\cdot\tfrac56\approx0{,}547$, không nhỏ hơn giá trị thật $\tfrac{69}{128}\approx0{,}539$.
- Tại $\theta_0=(0,0)$: $\lVert\nabla F\rVert^2=6{,}25$ và $\sigma^2=\tfrac{59}{12}$, nên vế phải bằng $\tfrac94-\tfrac14\bigl(1-\tfrac L8\bigr)\cdot6{,}25+\tfrac L{32}\cdot\tfrac{59}{12}\approx1{,}3188$, không nhỏ hơn $\tfrac{503}{384}\approx1{,}3099$ của Ví dụ 06.19.

::: remark Nhận xét 06.30 (Khi nhiễu tại nghiệm bằng $0$)
Điều kiện $\operatorname{tr}\Sigma(\theta^*)>0$ là cần cho hiện tượng của Ví dụ 06.21. Khi mọi mẫu được khớp đúng tại $\theta^*$, như $\theta_A$ trên XOR với $F(\theta_A)=0$ (Ví dụ 06.4), mọi gradient mẫu tại đó bằng $0$, nhiễu tại nghiệm bằng $0$ và SGD đứng yên tại nghiệm. Ngược lại, khi $\operatorname{tr}\Sigma(\theta^*)>0$ và $b<n$ (với chọn không hoàn lại), $\mathbb E\lVert\widehat g\rVert^2>0$ tại $\theta^*$, nên dãy SGD bước hằng dao động quanh $\theta^*$ và không dừng ở đó.
:::

### 6.2 Bước hằng trên hàm lồi mạnh và mức nhiễu nền

Với hàm lồi mạnh, ta theo dõi khoảng cách tới nghiệm thay cho giá trị $F$. Định lý sau là Định lý 05b.36 phát biểu lại.

::: theorem Định lý 06.31 (SGD bước hằng trên hàm lồi mạnh)
**Giả thiết.**

- H2: $\nabla F$ là $L$-Lipschitz trên $\mathbb R^p$.
- H3: $F$ lồi mạnh với hằng số $\mu>0$, tức $F(\theta')\ge F(\theta)+\nabla F(\theta)^\top(\theta'-\theta)+\tfrac\mu2\lVert\theta'-\theta\rVert^2$ với mọi $\theta,\theta'$.
- H4: $F$ có điểm cực tiểu $\theta^*$.
- H6, H6b tại mọi bước; $\theta_0$ tất định, $D=\lVert\theta_0-\theta^*\rVert$; bước hằng $0<\eta\le\tfrac1L$.

**Kết luận.** Với mọi $k\ge0$,

$$
\mathbb E\lVert\theta_k-\theta^*\rVert^2\le(1-\eta\mu)^kD^2+\frac{\eta\sigma^2}\mu .
\tag{6.2}
$$

**Điều kiện áp dụng.** H6b chỉ cần đúng tại các điểm lặp thực sự xuất hiện.

**Phạm vi.** Số hạng $\tfrac{\eta\sigma^2}\mu$, gọi là **mức nhiễu nền** (noise floor), không giảm theo $k$. Với $\sigma=0$, định lý cho hạ gradient đầy đủ với hệ số co $1-\eta\mu$. Mạng không thỏa H3; định lý áp dụng cho các bài toán lồi mạnh như hồi quy logistic có chính quy hóa của Bài 05.
:::

::: proof Chứng minh Định lý 06.31
Viết $D_k=\lVert\theta_k-\theta^*\rVert$ (nên $D_0=D$), $\Delta_k=F(\theta_k)-F(\theta^*)$ và $\nabla_k=\nabla F(\theta_k)$.

**Bước 1 (khai triển bình phương).** Từ $\theta_{k+1}-\theta^*=(\theta_k-\theta^*)-\eta\widehat g_k$,

$$
D_{k+1}^2=D_k^2-2\eta\,\widehat g_k^\top(\theta_k-\theta^*)+\eta^2\lVert\widehat g_k\rVert^2 .
$$

Lấy kỳ vọng có điều kiện theo $\mathcal F_k$ và dùng H6, H6b như Bước 2 của Mệnh đề 06.29:

$$
\mathbb E[D_{k+1}^2\mid\mathcal F_k]\le D_k^2-2\eta\,\nabla_k^\top(\theta_k-\theta^*)+\eta^2\bigl(\lVert\nabla_k\rVert^2+\sigma^2\bigr).
$$

**Bước 2 (hai cận từ H3 và H2).** H3 với $\theta=\theta_k$, $\theta'=\theta^*$ cho $F(\theta^*)\ge F(\theta_k)+\nabla_k^\top(\theta^*-\theta_k)+\tfrac\mu2D_k^2$, tức $\nabla_k^\top(\theta_k-\theta^*)\ge \Delta_k+\tfrac\mu2D_k^2$. Bổ đề 06.19 với $\eta=\tfrac1L$ và $F(\theta^*)\le F(\theta_k-\tfrac1L\nabla_k)$ cho $F(\theta^*)\le F(\theta_k)-\tfrac1{2L}\lVert\nabla_k\rVert^2$, tức $\lVert\nabla_k\rVert^2\le2L\Delta_k$. Thế vào Bước 1:

$$
\begin{aligned}
\mathbb E[D_{k+1}^2\mid\mathcal F_k]&\le D_k^2-2\eta \Delta_k-\eta\mu D_k^2+2L\eta^2\Delta_k+\eta^2\sigma^2\\
&=(1-\eta\mu)D_k^2-2\eta(1-L\eta)\Delta_k+\eta^2\sigma^2 .
\end{aligned}
$$

**Bước 3 (bỏ số hạng không dương).** Vì $\eta\le\tfrac1L$ và $\Delta_k\ge0$, số hạng $-2\eta(1-L\eta)\Delta_k$ không dương. Lấy kỳ vọng toàn phần, với $a_k=\mathbb E D_k^2$:

$$
a_{k+1}\le(1-\eta\mu)a_k+\eta^2\sigma^2 .
$$

**Bước 4 (giải đệ quy).** Vì $0<\eta\mu\le\tfrac\mu L\le1$, hệ số $1-\eta\mu$ thuộc $[0,1)$. Quy nạp theo $k$ rồi chặn tổng cấp số nhân cho

$$
\begin{aligned}
a_k&\le(1-\eta\mu)^ka_0+\eta^2\sigma^2\sum_{j=0}^{k-1}(1-\eta\mu)^j\\
&\le(1-\eta\mu)^kD^2+\frac{\eta^2\sigma^2}{\eta\mu}\\
&=(1-\eta\mu)^kD^2+\frac{\eta\sigma^2}\mu .
\end{aligned}
$$

Dòng thứ nhất là quy nạp từ đệ quy ở Bước 3, dòng thứ hai dùng $a_0=D^2$ và $\sum_{j\ge0}(1-\eta\mu)^j=\tfrac1{\eta\mu}$. Ta được (6.2). $\square$
:::

Định lý 06.31 có hai số hạng. Số hạng thứ nhất co tuyến tính như hạ gradient đầy đủ; số hạng thứ hai tỉ lệ thuận với bước và phương sai, tỉ lệ nghịch với độ cong. Giảm $\eta$ hạ mức nhiễu nền nhưng đưa hệ số co $1-\eta\mu$ về gần $1$, nên không bước hằng nào vừa co nhanh vừa có mức nhiễu nền thấp.

**Trong học máy.** Đối tượng của Định lý 06.31 là mục tiêu có chính quy hóa $F_\lambda=F+\tfrac\lambda2\lVert\theta\rVert^2$ của hồi quy tuyến tính hay hồi quy logistic, nơi H3 đúng với $\mu\ge\lambda$ nhờ số hạng chính quy hóa (Định lý 05.26). Mạng không thỏa H3, nên định lý không áp dụng cho mạng.

Kết luận của định lý cho một quy tắc thực hành: bước hằng giữ $\mathbb E\lVert\theta_k-\theta^*\rVert^2$ ở mức bậc $\eta\sigma^2/\mu$, tức bán kính lân cận bậc $\sqrt{\eta\sigma^2/\mu}$. Để thu nhỏ lân cận, ta giảm bước, hoặc tăng kích thước nhóm vì $\sigma^2$ giảm theo $1/b$ (Mệnh đề 06.27); giảm $\eta$ đi bốn lần chỉ thu bán kính đi hai lần. Tình huống 06.3 áp dụng định lý cho hồi quy có chính quy hóa trên mười triệu mẫu.

Ví dụ sau so cận với giá trị chính xác trên ví dụ xuyên suốt A của Bài 05b. Dữ liệu bốn điểm không dùng được ở đây, vì trên đó $\operatorname{tr}\Sigma(\theta)$ tăng không bị chặn theo $\theta$ và H6b chỉ đúng trên một vùng.

::: example Ví dụ 06.22 (Mức nhiễu nền trên ví dụ ba quan sát)
**Dữ kiện.** Ví dụ xuyên suốt A của Bài 05b (Ví dụ 05b.19): ba quan sát $y=(-1,1,3)$, tham số $\theta\in\mathbb R$, $F(\theta)=\tfrac16\sum_{i=1}^3(\theta-y_i)^2=\tfrac12(\theta-1)^2+\tfrac43$, $\theta^*=1$. Mỗi bước chọn đều một chỉ số $I$, $\widehat g=\theta-y_I$; bước $\eta=0{,}1$; $\theta_0=0$.

**Kiểm tra giả thiết.** $F''\equiv1$, nên H2, H3 đúng với $\mu=L=1$; $D=1$; $\eta=0{,}1\le1$. Phần nhiễu $\widehat g-F'(\theta)=1-y_I$ có kỳ vọng $0$ và phương sai $\tfrac13(4+0+4)=\tfrac83$ tại mọi $\theta$, nên H6 và H6b đúng với $\sigma^2=\tfrac83$ trên cả trục số.

**Cận của Định lý 06.31.** $(1-0{,}1)^k\cdot1+\tfrac{0{,}1\cdot8/3}1=0{,}9^k+0{,}267$.

**Giá trị chính xác.** $\theta_{k+1}-1=(1-\eta)(\theta_k-1)+\eta(y_I-1)$, với $y_I-1$ độc lập với $\theta_k$ và có kỳ vọng $0$, nên

$$
\mathbb E(\theta_{k+1}-1)^2=0{,}81\,\mathbb E(\theta_k-1)^2+0{,}01\cdot\tfrac83 .
$$

Nghiệm của đệ quy là $0{,}81^k+\tfrac8{57}(1-0{,}81^k)$, tiến về $\tfrac{0{,}01\cdot8/3}{1-0{,}81}=\tfrac8{57}\approx0{,}140$.

| $k$ | $0$ | $10$ | $20$ | $40$ | $\infty$ |
|---|---:|---:|---:|---:|---:|
| cận $0{,}9^k+0{,}267$ | $1{,}267$ | $0{,}615$ | $0{,}388$ | $0{,}281$ | $0{,}267$ |
| giá trị chính xác | $1$ | $0{,}245$ | $0{,}153$ | $0{,}140$ | $0{,}140$ |

**Kiểm tra lại.** Liệt kê ba nhánh sau một bước: $\theta_1=0{,}1y_I$ cho $(\theta_1-1)^2=1{,}21;\ 0{,}81;\ 0{,}49$, trung bình $0{,}8367$, khớp $0{,}81+0{,}0267$.
:::

![Trục hoành k từ 0 đến 40, trục tung từ 0 đến 1,4. Đường liền là kỳ vọng bình phương sai lệch chính xác, giảm về 0,140. Đường nét đứt là cận 0,9ᵏ + 0,267 của định lý, giảm về 0,267. Tại k = 20 giá trị chính xác là 0,153 và cận là 0,388.](img/lec-06/vda-sgd-bound-vs-exact.svg)

Trên hình, cả hai đường dừng ở một mức dương: đường liền ở $\tfrac8{57}\approx0{,}140$, đường nét đứt ở mức nhiễu nền $0{,}267$ của cận, gần gấp đôi giới hạn thật. Bước hằng vì vậy chỉ đưa SGD tới một lân cận của nghiệm. Để hội tụ tới chính nghiệm, bước phải giảm dần.

### 6.3 Bước giảm dần cho hàm lồi mạnh

Định lý sau là Định lý 05b.39 phát biểu lại. Nó thay H6b bằng H6a và chọn bước giảm theo $1/k$ với hằng số lồi mạnh đã biết.

::: theorem Định lý 06.32 (Bước giảm dần $\tfrac1{\mu(k+1)}$ cho hàm lồi mạnh)
**Giả thiết.** H3 với hằng số $\mu$; H4 với điểm cực tiểu $\theta^*$; H6, và H6a với hằng số $G^2$ trên một vùng chứa mọi điểm lặp; bước $\eta_k=\dfrac1{\mu(k+1)}$.

**Kết luận.** Với mọi $k\ge1$,

$$
\mathbb E\lVert\theta_k-\theta^*\rVert^2\le\frac{G^2}{\mu^2k}.
\tag{6.3}
$$

**Điều kiện áp dụng.** Cần biết $\mu$. H6a chỉ hợp lý trên một vùng, vì dưới H3 gradient không bị chặn trên $\mathbb R^p$.

**Phạm vi.** Cận về $0$ với tốc độ $O(1/k)$ theo kỳ vọng, không còn mức nhiễu nền; cận không chứa $D$.
:::

::: proof Chứng minh Định lý 06.32
**Bước 1 (đệ quy).** Như Bước 1 của chứng minh Định lý 06.31 nhưng dùng H6a cho số hạng cuối: $\mathbb E[D_{k+1}^2\mid\mathcal F_k]\le D_k^2-2\eta_k\nabla_k^\top(\theta_k-\theta^*)+\eta_k^2G^2$. Vì $\nabla F(\theta^*)=0$, H3 áp hai lần (tại $(\theta_k,\theta^*)$ và tại $(\theta^*,\theta_k)$) rồi cộng cho $\nabla_k^\top(\theta_k-\theta^*)\ge\mu D_k^2$. Lấy kỳ vọng toàn phần, với $a_k=\mathbb E D_k^2$ và $\eta_k\mu=\tfrac1{k+1}$:

$$
a_{k+1}\le\Bigl(1-\frac2{k+1}\Bigr)a_k+\frac{G^2}{\mu^2(k+1)^2}.
$$

**Bước 2 (cơ sở quy nạp).** Với $k=0$, hệ số $1-2=-1\le0$ và $a_0\ge0$, nên $a_1\le\tfrac{G^2}{\mu^2}$, tức (6.3) với $k=1$.

**Bước 3 (bước quy nạp).** Giả sử $a_k\le\tfrac{G^2}{\mu^2k}$ với một $k\ge1$. Hệ số $1-\tfrac2{k+1}=\tfrac{k-1}{k+1}\ge0$, nên

$$
a_{k+1}\le\frac{G^2}{\mu^2}\Bigl(\frac{k-1}{k(k+1)}+\frac1{(k+1)^2}\Bigr)\le\frac{G^2}{\mu^2}\cdot\frac1{k+1},
$$

trong đó bất đẳng thức cuối tương đương $\tfrac{k-1}k+\tfrac1{k+1}\le1$, tức $\tfrac1{k+1}\le\tfrac1k$. $\square$
:::

So với Định lý 06.31, Định lý 06.32 bỏ mức nhiễu nền nhưng trả bằng hai điều: bước phải dùng đúng hằng số $\mu$, và H6a chặn cả phần tín hiệu của gradient.

**Trong học máy.** Lịch bước $\eta_t=\tfrac1{\lambda(t+t_0)}$ của SVM tuyến tính trên RCV1 (Ví dụ 06.18) có cùng dạng với Định lý 06.32, với hệ số chính quy hóa $\lambda$ đóng vai $\mu$; hằng số $t_0$ làm các bước đầu không quá lớn. Mất mát bản lề không khả vi và H6a chỉ đúng trên một vùng, nên định lý giải thích dạng của lịch bước chứ không bảo đảm nguyên văn cho thí nghiệm đó. Khi $\mu$ không biết hoặc mục tiêu không lồi mạnh, lịch dạng này có thể quá nhỏ (Nhận xét 06.33).

Ví dụ sau đặt hai lịch bước cạnh nhau.

::: example Ví dụ 06.23 (Bước $\tfrac1{k+1}$ trên ví dụ ba quan sát)
**Dữ kiện.** Như Ví dụ 06.22: $y=(-1,1,3)$, $F(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, $\mu=1$, $\widehat g=\theta-y_I$, $\theta_0=0$; bước $\eta_k=\tfrac1{k+1}$.

**Dãy lặp.** $\theta_1=\theta_0-1\cdot(\theta_0-y_{I_0})=y_{I_0}$, và $\theta_{k+1}=\theta_k-\tfrac{\theta_k-y_{I_k}}{k+1}=\tfrac{k\theta_k+y_{I_k}}{k+1}$. Quy nạp cho $\theta_k$ là trung bình của $k$ quan sát được rút đầu tiên.

**Giá trị chính xác.** Trung bình của $k$ quan sát độc lập có phương sai $\tfrac{8/3}k$, nên $\mathbb E(\theta_k-1)^2=\tfrac8{3k}$.

**Cận của Định lý 06.32.** Mọi $\theta_k$ với $k\ge1$ nằm trong $[-1,3]$, cũng như $\theta_0=0$. Trên đoạn này, $\mathbb E[\widehat g^2\mid\theta]=(\theta-1)^2+\tfrac83\le4+\tfrac83=\tfrac{20}3$, nên H6a đúng với $G^2=\tfrac{20}3$ và cận là $\tfrac{20}{3k}$, gấp $2{,}5$ lần giá trị chính xác.

**So sánh với bước hằng $0{,}1$** (Ví dụ 06.22).

| $\mathbb E(\theta_k-1)^2$ | $k=10$ | $k=16$ | $k=20$ |
|---|---:|---:|---:|
| bước hằng $0{,}1$ | $0{,}2449$ | $0{,}1699$ | $0{,}1531$ |
| bước $\tfrac1{k+1}$ | $0{,}2667$ | $0{,}1667$ | $0{,}1333$ |

**Đọc bảng.** Bước hằng tốt hơn ở các bước đầu vì giảm nhanh theo $0{,}81^k$, nhưng dừng ở giới hạn dương $\tfrac8{57}$; bước giảm dần tốt hơn từ $k=16$.

**Kiểm tra lại.** Tại $k=1$, $\theta_1=y_{I_0}$ cho $(\theta_1-1)^2=4,0,4$, trung bình $\tfrac83=\tfrac8{3\cdot1}$.
:::

::: remark Nhận xét 06.33 (Các lịch bước khác)
1. Lịch chia đôi bước theo pha giữ bước hằng cho tới khi đạt mức nhiễu nền rồi chia đôi bước; nó cho tổng số bước $O\bigl(\tfrac1{\mu\eta_0}\log\tfrac{D^2}\varepsilon+\tfrac{\sigma^2}{\mu^2\varepsilon}\bigr)$ dưới H6b (Hệ quả 05b.38) và không cần H6a.
2. Goodfellow, Bengio và Courville (2016, (8.14), tr. 295) mô tả lịch giảm tuyến tính tới một bước $\tau$ rồi giữ hằng, phổ biến trong học sâu.
3. Điều kiện đủ cổ điển cho hội tụ của SGD là $\sum_k\eta_k=\infty$ và $\sum_k\eta_k^2<\infty$ (cùng tài liệu, (8.12)–(8.13), tr. 294–295); bước $\tfrac1{\mu(k+1)}$ thỏa cả hai.
4. Với bước $\tfrac{\eta_0}{k}$ mà $\eta_0$ quá nhỏ so với $\tfrac1\mu$, tốc độ chậm hơn $O(1/k)$; đây là lý do Định lý 06.32 cần đúng hằng số $\mu$.
:::

### 6.4 Hạ gradient ngẫu nhiên cho hàm không lồi

Mạng không thỏa H3, nên Định lý 06.31 và 06.32 không áp dụng cho mạng. Bỏ H3, giữ H2 và cộng bất đẳng thức một bước (6.1) theo $K$ bước như chứng minh Định lý 06.20, ta được định lý sau, là Định lý 05b.43 phát biểu lại.

::: theorem Định lý 06.34 (SGD trên hàm không lồi)
**Giả thiết.** H0 với $F_{\inf}>-\infty$; H2 trên một tập lồi chứa mọi điểm lặp có thể; H6, H6b tại mọi bước; $\theta_0$ tất định, $\Delta_0=F(\theta_0)-F_{\inf}$; bước hằng $0<\eta\le\tfrac1L$.

**Kết luận.** Với mọi $K\ge1$,

$$
\frac1K\sum_{k<K}\mathbb E\lVert\nabla F(\theta_k)\rVert^2\le\frac{2\Delta_0}{\eta K}+L\eta\sigma^2 .
\tag{6.4}
$$

**Điều kiện áp dụng.** Không cần tính lồi. Với mạng, áp dụng được khi hàm kích hoạt trơn ($\tanh$, softplus) hoặc với mạng tuyến tính; với ReLU, $\nabla F$ gián đoạn tại điểm gãy, nên (6.4) chỉ dùng làm định hướng.

**Phạm vi.** Số hạng $L\eta\sigma^2$ không giảm theo $K$. Nếu chọn chỉ số $\tilde k$ đều trên $\{0,\ldots,K-1\}$, độc lập với dãy, thì $\mathbb E\lVert\nabla F(\theta_{\tilde k})\rVert^2$ có cùng cận.
:::

::: proof Chứng minh Định lý 06.34
**Bước 1 (bất đẳng thức một bước).** Mệnh đề 06.29 cho (6.1). Vì $\eta\le\tfrac1L$, $1-\tfrac{L\eta}2\ge\tfrac12$. Trừ $F_{\inf}$ hai vế và lấy kỳ vọng toàn phần, với $\bar\Delta_k=\mathbb E[F(\theta_k)]-F_{\inf}$:

$$
\bar\Delta_{k+1}\le\bar\Delta_k-\frac\eta2\,\mathbb E\lVert\nabla F(\theta_k)\rVert^2+\frac{L\eta^2\sigma^2}2 .
$$

**Bước 2 (triệt tiêu liên tiếp).** Cộng $K$ bất đẳng thức với $k=0,\ldots,K-1$:

$$
\begin{aligned}
\frac\eta2\sum_{k<K}\mathbb E\lVert\nabla F(\theta_k)\rVert^2&\le\bar\Delta_0-\bar\Delta_K+\frac{KL\eta^2\sigma^2}2\\
&\le\Delta_0+\frac{KL\eta^2\sigma^2}2,
\end{aligned}
$$

vì $\bar\Delta_K\ge0$ theo H0 và $\bar\Delta_0=\Delta_0$ do $\theta_0$ tất định.

**Bước 3 (chia).** Nhân hai vế với $\tfrac2{\eta K}$ được (6.4). Phần về $\tilde k$: $\mathbb E\lVert\nabla F(\theta_{\tilde k})\rVert^2=\tfrac1K\sum_k\mathbb E\lVert\nabla F(\theta_k)\rVert^2$ vì $\tilde k$ đều và độc lập với dãy. $\square$
:::

Với $\sigma=0$ và $\eta=\tfrac1L$, (6.4) cho lại Định lý 06.20 ở dạng trung bình. Với $\sigma>0$ và bước hằng, vế phải không về $0$ khi $K\to\infty$; để cận nhỏ, bước phải được chọn theo số bước $K$ định trước.

::: corollary Hệ quả 06.35 (Chọn bước theo số bước)
**Giả thiết.** Như Định lý 06.34, với $\sigma>0$ và

$$
\eta=\min\Bigl\{\frac1L,\ \sqrt{\frac{2\Delta_0}{L\sigma^2K}}\Bigr\}.
$$

**Kết luận.**

$$
\frac1K\sum_{k<K}\mathbb E\lVert\nabla F(\theta_k)\rVert^2\le\frac{2L\Delta_0}K+2\sqrt{\frac{2L\Delta_0\sigma^2}K}=O\Bigl(\frac1{\sqrt K}\Bigr).
\tag{6.5}
$$

**Điều kiện áp dụng.** Cần biết $K$, $L$, $\sigma^2$ và $\Delta_0$ hoặc một cận trên của nó.

**Phạm vi.** Tốc độ $O(1/\sqrt K)$ chậm hơn $O(1/K)$ của Định lý 06.20; khi $K$ lớn, số hạng do nhiễu chi phối.
:::

::: proof Chứng minh Hệ quả 06.35
**Bước 1 (nhánh căn).** Nếu $\eta=\sqrt{2\Delta_0/(L\sigma^2K)}\le\tfrac1L$, hai số hạng của (6.4) bằng nhau: $\tfrac{2\Delta_0}{\eta K}=L\eta\sigma^2=\sqrt{2L\Delta_0\sigma^2/K}$, nên cận là $2\sqrt{2L\Delta_0\sigma^2/K}$, không vượt vế phải của (6.5).

**Bước 2 (nhánh $\tfrac1L$).** Nếu $\eta=\tfrac1L\le\sqrt{2\Delta_0/(L\sigma^2K)}$, bình phương hai vế cho $\sigma^2\le\tfrac{2L\Delta_0}K$. Cận (6.4) bằng $\tfrac{2L\Delta_0}K+\sigma^2$, và $\sigma^2=\sqrt{\sigma^2\cdot\sigma^2}\le\sqrt{\sigma^2\cdot2L\Delta_0/K}$, nên cận không vượt vế phải của (6.5). $\square$
:::

Cách chọn bước trong hệ quả cân bằng số hạng đầu, giảm khi $\eta$ tăng, với số hạng nhiễu, tăng khi $\eta$ tăng. Với các hằng số giả định $L=\Delta_0=\sigma^2=1$, ta có $\eta=\sqrt{2/K}$ khi $K\ge2$, và cận (6.5) bằng:

| $K$ | $10^2$ | $10^4$ | $10^6$ |
|---|---:|---:|---:|
| $\eta$ | $0{,}1414$ | $0{,}01414$ | $0{,}001414$ |
| cận (6.5) | $0{,}303$ | $0{,}0285$ | $0{,}00283$ |

Tăng $K$ lên $100$ lần chỉ giảm cận khoảng $10$ lần. Ba con số chỉ dùng để đọc bậc, không gắn với một mô hình cụ thể. Một áp dụng tính được trọn vẹn của bảo đảm cùng loại là ví dụ xuyên suốt D của Bài 05b (Ví dụ 05b.25), hạ gradient trên hàm bậc bốn $\tfrac14(\theta^2-1)^2$.

**Trong học máy.** Đối tượng của Định lý 06.34 là rủi ro thực nghiệm của mạng. Với hàm kích hoạt trơn như $\tanh$ hay softplus, H2 và H6b đúng trên một vùng bị chặn chứa dãy lặp, và định lý cho tốc độ $O(1/\sqrt K)$ cho trung bình kỳ vọng bình phương chuẩn gradient. Với ReLU, $\nabla F$ gián đoạn tại điểm gãy, nên định lý chỉ là định hướng (Tình huống 06.1).

Hệ quả 06.35 giải thích thực hành chọn bước theo số bước dự kiến: huấn luyện dài hơn cần bước nhỏ hơn. Định lý không chặn $R$ của tham số được trả về, nên tập xác thực vẫn cần thiết (Mục 6.6).

::: remark Nhận xét 06.36 (Đọc đúng Định lý 06.34)
1. Cận là về bình phương chuẩn gradient; với chính chuẩn, bất đẳng thức Jensen cho $\tfrac1K\sum_k\mathbb E\lVert\nabla F(\theta_k)\rVert=O(K^{-1/4})$ khi chọn bước theo Hệ quả 06.35.
2. Như Định lý 06.20, định lý không phân biệt điểm yên ngựa với cực tiểu (Ví dụ 06.16).
3. Với SGD, dãy lặp ngẫu nhiên, nên tập lồi trong H2 phải chứa mọi dãy lặp có thể; điều kiện này không kiểm tra được trước khi chạy.
4. Định lý bảo đảm cho dãy lặp, không cho tham số mà Thuật toán 06.2 trả về theo tập xác thực.
:::

### 6.5 So sánh dưới tổng ngân sách cố định

Hệ quả 06.35 cho SGD tốc độ $O(1/\sqrt K)$, chậm hơn $O(1/K)$ của hạ gradient đầy đủ. Tuy nhiên, một bước SGD rẻ hơn một bước hạ gradient đầy đủ $n/b$ lần. Để so sánh công bằng, chúng ta cố định tổng ngân sách $\mathcal B$, đo bằng tổng số gradient mẫu được tính, khác với ngân sách mỗi bước của Mục 5.1, rồi so hai cận trên. Đây là so sánh hai cận, không phải hai sai số thật.

::: proposition Mệnh đề 06.37 (Hai cận dưới cùng tổng ngân sách)
**Giả thiết.** $F$ thỏa H0, H2 trên một tập lồi chứa mọi điểm lặp; gradient một mẫu chọn đều có phương sai tổng không vượt $\sigma_1^2$ trên vùng đó; tổng ngân sách $\mathcal B$ gradient mẫu, $\mathcal B\ge n$; $b<n$.

**Kết luận.**

1. Hạ gradient đầy đủ chạy $K=\mathcal B/n$ bước, và Định lý 06.20 cho cận $\dfrac{2L\Delta_0n}{\mathcal B}$.
2. SGD với nhóm $b$ mẫu chọn có hoàn lại chạy $K=\mathcal B/b$ bước, với $\sigma^2=\sigma_1^2/b$, và Hệ quả 06.35 cho cận $\dfrac{2L\Delta_0b}{\mathcal B}+2\sqrt{\dfrac{2L\Delta_0\sigma_1^2}{\mathcal B}}$.
3. Cận của SGD nhỏ hơn khi và chỉ khi $\mathcal B<\dfrac{L\Delta_0(n-b)^2}{2\sigma_1^2}$. Với $L=\Delta_0=\sigma_1^2=1$, điều kiện là $\mathcal B<\tfrac{(n-b)^2}2$, tức số lượt dữ liệu $\mathcal B/n$ nhỏ hơn khoảng $\tfrac n2$.

**Điều kiện áp dụng.** Hai cận đều cần H2; với ReLU, so sánh chỉ là định hướng.

**Phạm vi.** Mệnh đề so hai cận trên cho hai đại lượng cùng loại (bình phương chuẩn gradient nhỏ nhất và trung bình). Mức chính xác đủ dùng không do mệnh đề quyết định.
:::

::: proof Chứng minh Mệnh đề 06.37
**Bước 1 (kết luận 1).** Mỗi bước hạ gradient đầy đủ tốn $n$ gradient mẫu, nên ngân sách cho $K=\mathcal B/n$ bước; thế vào (4.3).

**Bước 2 (kết luận 2).** Mỗi bước SGD tốn $b$ gradient mẫu, nên $K=\mathcal B/b$. Mệnh đề 06.27 với nhóm có hoàn lại cho H6b với $\sigma^2=\sigma_1^2/b$. Thế vào (6.5): $\tfrac{2L\Delta_0}K=\tfrac{2L\Delta_0b}{\mathcal B}$ và $\tfrac{\sigma^2}K=\tfrac{\sigma_1^2}b\cdot\tfrac b{\mathcal B}=\tfrac{\sigma_1^2}{\mathcal B}$.

**Bước 3 (kết luận 3).** So hai cận:

$$
\begin{aligned}
\frac{2L\Delta_0b}{\mathcal B}+2\sqrt{\frac{2L\Delta_0\sigma_1^2}{\mathcal B}}<\frac{2L\Delta_0n}{\mathcal B}
&\iff2\sqrt{\frac{2L\Delta_0\sigma_1^2}{\mathcal B}}<\frac{2L\Delta_0(n-b)}{\mathcal B}\\
&\iff\sqrt{2\sigma_1^2\mathcal B}<\sqrt{L\Delta_0}\,(n-b)\\
&\iff\mathcal B<\frac{L\Delta_0(n-b)^2}{2\sigma_1^2},
\end{aligned}
$$

trong đó bước thứ hai nhân hai vế với $\tfrac{\mathcal B}{2\sqrt{L\Delta_0}}>0$, và bước thứ ba bình phương hai vế dương. $\square$
:::

**Trong học máy.** Số hạng chính của cận SGD trong Mệnh đề 06.37, $2\sqrt{2L\Delta_0\sigma_1^2/\mathcal B}$, không phụ thuộc $b$; số hạng còn lại tăng theo $b$, nên dưới tổng ngân sách cố định, cận nghiêng về $b$ nhỏ. Tăng $b$ chỉ có lợi khi phần cứng xử lý song song cả nhóm trong cùng thời gian. Vì vậy, trong thực hành, kích thước nhóm được chọn theo bộ nhớ và mức song song của phần cứng (Bài 05c, Mục 6.6; Goodfellow, Bengio và Courville, 2016, mục 8.1.3, tr. 279–280).

::: example Ví dụ 06.24 (Hai quy mô với ngân sách mười lượt dữ liệu)
**Dữ kiện.** $L=\Delta_0=\sigma_1^2=1$; tổng ngân sách $\mathcal B=10n$, tức mười lượt dữ liệu.

**Quy mô lớn: $n=10^9$, $b=10^3$.** Hạ gradient đầy đủ: $K=10$, cận $\tfrac{2n}{\mathcal B}=0{,}2$. SGD: $K=10^7$, $\sigma^2=10^{-3}$, bước $\eta=\sqrt{2/(10^{-3}\cdot10^7)}\approx0{,}01414$, cận $\tfrac{2\cdot10^3}{10^{10}}+2\sqrt{\tfrac2{10^{10}}}=2\cdot10^{-7}+2{,}828\cdot10^{-5}\approx2{,}85\cdot10^{-5}$.

**Quy mô nhỏ: $n=10^3$, $b=10$.** Hạ gradient đầy đủ: $K=10$, cận $0{,}2$. SGD: $K=10^3$, $\sigma^2=0{,}1$, $\eta\approx0{,}1414$, cận $0{,}002+0{,}02828\approx0{,}0303$.

**Ngưỡng.** Với các hằng số bằng $1$, ngưỡng $\tfrac{L\Delta_0(n-b)^2}{2\sigma_1^2}$ của Mệnh đề 06.37 thành $\tfrac{(n-b)^2}2$. Với $n=10^3$, $b=10$: $\tfrac{(n-b)^2}2=\tfrac{990^2}2=490\,050$. Hạ gradient đầy đủ có cận nhỏ hơn khi $\mathcal B>490\,050$, tức khoảng $490$ lượt dữ liệu. Với $n=10^9$, ngưỡng là $5\cdot10^{17}$ gradient mẫu, tức khoảng $5\cdot10^8$ lượt.

**Kiểm tra lại.** Ở cả hai hàng, $\mathcal B=10n<\tfrac{(n-b)^2}2$, phù hợp với việc cận SGD nhỏ hơn.
:::

Phép so sánh trên dùng các cận của Bài 05b. Bottou và Bousquet (2011, Bảng 13.2, tr. 362) so sánh theo cách khác cho hàm lồi mạnh: thời gian để đạt độ chính xác tối ưu $\rho_{\mathrm{BB}}$ (ký hiệu $\rho$ của Bottou–Bousquet) là $O\bigl(nd\kappa\log\tfrac1{\rho_{\mathrm{BB}}}\bigr)$ với hạ gradient và $O\bigl(d\nu\kappa^2/\rho_{\mathrm{BB}}\bigr)$ với SGD, trong đó $\nu$ đo nhiễu của gradient. Với $\kappa=10$, $\rho_{\mathrm{BB}}=10^{-6}$, $\nu=1$, bỏ hệ số $d$ chung và mọi hằng số, hạ gradient cần khoảng $10\ln10^6\approx138$ lần $n$, SGD khoảng $10^8$; hai bậc bằng nhau khi $n$ trong khoảng $10^5$–$10^6$. Đây là phép so bậc độ lớn từ kết quả tiệm cận, không phải một ngưỡng.

::: remark Nhận xét 06.38 (Phạm vi của lập luận "SGD là đủ")
Mệnh đề 06.37 chỉ cho cận $O(1/\sqrt{\mathcal B})$ cho bình phương chuẩn gradient, tức $O(\mathcal B^{-1/4})$ cho chính chuẩn. Lập luận rằng mức đó đủ dùng không đến từ mệnh đề này. Với bài toán lồi, nó đến từ phân tích Bottou–Bousquet (Nhận xét 06.23): độ chính xác tối ưu cùng bậc với sai số thống kê là đủ cho bậc của sai số vượt. Với mạng, Định lý 06.34 chỉ bảo đảm điểm dừng xấp xỉ, và mức đủ dùng được quyết định bằng tập xác thực. Quy tắc dừng sớm biến nguyên tắc đó thành thủ tục.
:::

### 6.6 Dừng sớm theo tập xác thực

Trong Bài 05, chúng ta đã định nghĩa dừng sớm (Định nghĩa 05.38): chạy một thuật toán lặp và trả về điểm lặp có sai số trên tập xác thực nhỏ nhất. Trên ví dụ năm mẫu của Bài 05, sai số xác thực nhỏ nhất bằng $0{,}00108$ tại bước $79$, nhỏ hơn khoảng $45$ lần giới hạn $0{,}0487$ của nghiệm chính xác (Ví dụ 05.24). Tập xác thực và tập kiểm thử là hai tập mẫu tách khỏi tập huấn luyện; tập xác thực dùng để chọn siêu tham số và bước dừng, tập kiểm thử chỉ dùng để báo cáo $R$ (Định nghĩa 05.6).

![Mất mát huấn luyện có xu hướng giảm; mất mát xác thực nằm phía trên, giảm rồi tăng. Điểm thấp nhất của đường xác thực, đánh dấu bằng đường đứt thẳng đứng, là điểm dừng sớm. Đây là sơ đồ định tính.](img/lec-06/risk-curves.svg)

Hình là sơ đồ định tính, không phải số liệu thực nghiệm. Một cách trực quan, mất mát huấn luyện có xu hướng giảm theo vòng lặp, còn mất mát xác thực giảm tới cực tiểu rồi tăng; điểm cực tiểu là nơi nên dừng. Đây mới là trực giác; quy tắc dừng được phát biểu chính xác ở Thuật toán 06.3. Với SGD, mất mát huấn luyện chỉ có xu hướng giảm, vì một bước có thể làm nó tăng (Ví dụ 06.19). Đánh giá trên tập xác thực ở mọi bước quá tốn với SGD, nên quy tắc cần thêm chu kỳ đánh giá và điều kiện dừng.

::: algorithm Thuật toán 06.3 (Dừng sớm với chu kỳ đánh giá và ngưỡng kiên nhẫn)
**Đầu vào.** Một thuật toán lặp sinh $\theta_1,\theta_2,\ldots$ (chẳng hạn Thuật toán 06.2); tập xác thực; chu kỳ đánh giá $s\ge1$; ngưỡng kiên nhẫn $r\ge1$.

**Đầu ra.** Tham số $\widehat\theta$ có mất mát xác thực nhỏ nhất trong các lần đánh giá.

1. Đặt $\widehat R_{\min}=+\infty$ và bộ đếm $t=0$.
2. Sau mỗi $s$ bước, tính $\widehat R$, mất mát trung bình trên tập xác thực tại tham số hiện tại.
3. Nếu $\widehat R<\widehat R_{\min}$: đặt $\widehat R_{\min}=\widehat R$, lưu $\widehat\theta$ là tham số hiện tại, đặt $t=0$. Ngược lại, tăng $t$ thêm $1$.
4. Dừng khi $t=r$, tức $r$ lần đánh giá liên tiếp không cải thiện; trả về $\widehat\theta$.

**Chi phí.** Mỗi lần đánh giá tốn một lần truyền xuôi trên tập xác thực.
:::

Thuật toán 06.3 là Định nghĩa 05.38 với hai tham số thực hành: chu kỳ $s$ và ngưỡng kiên nhẫn $r$ (patience), như Thuật toán 7.1 của Goodfellow, Bengio và Courville (2016, mục 7.8).

::: remark Nhận xét 06.39 (Tập xác thực sau khi đã dùng để chọn)
Tại $\theta$ cố định, $\widehat R$ là ước lượng không chệch của $R(\theta)$ (Định lý 06.22). Tham số $\widehat\theta$ được chọn vì có $\widehat R$ nhỏ nhất, nên sau khi chọn, $\widehat R(\widehat\theta)$ lệch về phía lạc quan; báo cáo $R$ cần một tập kiểm thử riêng. Tham số trả về được chọn theo $R$ ước lượng; Định lý 06.34 bảo đảm cho dãy lặp, không cho tham số này.
:::

### 6.7 Dừng sớm và chính quy hóa $\ell_2$ trên mục tiêu toàn phương

Trong Bài 05 (Mệnh đề 05.39), chúng ta đã thấy hạ gradient trên bình phương nhỏ nhất khớp trước các hướng có độ cong lớn và khớp muộn các hướng phẳng, và nghiệm có chính quy hóa có dạng tương tự. Câu hỏi còn lại là định lượng: dừng sau $k$ bước tương ứng với hệ số chính quy hóa nào. Mệnh đề sau trả lời trên một mục tiêu toàn phương. Trong mục này, trị riêng của Hessian viết là $\alpha$ để không trùng hệ số chính quy hóa $\lambda$; Goodfellow, Bengio và Courville viết ngược lại.

::: proposition Mệnh đề 06.40 (Tỉ lệ giữ của dừng sớm và của chính quy hóa $\ell_2$)
**Giả thiết.** $Q(\theta)=\tfrac12(\theta-\theta^*)^\top H(\theta-\theta^*)$ với $H\in\mathbb R^{p\times p}$ đối xứng, $H=\sum_j\alpha_jv_jv_j^\top$, $\alpha_j>0$, $v_j$ trực chuẩn. Hạ gradient bước $\eta$ với $0<\eta\alpha_j<1$ từ $\theta_0=0$. Nghiệm chính quy hóa $\theta_\lambda=\arg\min_\theta Q(\theta)+\tfrac\lambda2\lVert\theta\rVert^2$ với $\lambda>0$.

**Kết luận.** Theo mỗi vector riêng $v_j$, thành phần của $\theta_k$ và của $\theta_\lambda$ bằng một tỉ lệ của thành phần của $\theta^*$:

$$
v_j^\top\theta_k=\bigl(1-(1-\eta\alpha_j)^k\bigr)\,v_j^\top\theta^*,\qquad v_j^\top\theta_\lambda=\frac{\alpha_j}{\alpha_j+\lambda}\,v_j^\top\theta^* .
\tag{6.6}
$$

Hai tỉ lệ này gọi là **tỉ lệ giữ** của dừng sớm và của chính quy hóa.

**Điều kiện áp dụng.** Mục tiêu toàn phương, điểm đầu $0$.

**Phạm vi.** Với mục tiêu không bậc hai, như mạng, tương ứng giữa $k$ và $\lambda$ chỉ là định hướng.
:::

::: proof Chứng minh Mệnh đề 06.40
**Bước 1 (dừng sớm).** $\nabla Q(\theta)=H(\theta-\theta^*)$, nên $\theta_{k+1}-\theta^*=(I-\eta H)(\theta_k-\theta^*)$ và $\theta_k-\theta^*=(I-\eta H)^k(0-\theta^*)$. Ma trận $I-\eta H$ có vector riêng $v_j$ với trị riêng $1-\eta\alpha_j$, nên $v_j^\top\theta_k=v_j^\top\theta^*-(1-\eta\alpha_j)^kv_j^\top\theta^*$.

**Bước 2 (chính quy hóa).** Điều kiện bậc nhất là $H(\theta_\lambda-\theta^*)+\lambda\theta_\lambda=0$, tức $(H+\lambda I)\theta_\lambda=H\theta^*$. Nhân với $v_j^\top$ và dùng $v_j^\top H=\alpha_jv_j^\top$: $(\alpha_j+\lambda)v_j^\top\theta_\lambda=\alpha_jv_j^\top\theta^*$. $\square$
:::

Cả hai cách giữ gần trọn thành phần theo hướng có độ cong lớn và nén thành phần theo hướng có độ cong nhỏ. Ví dụ sau so hai tỉ lệ khi $\lambda=\tfrac1{\eta k}$.

::: example Ví dụ 06.25 (Tỉ lệ giữ với $\eta=0{,}5$, $k=20$, $\lambda=0{,}1$)
**Dữ kiện.** Mục tiêu toàn phương của Mệnh đề 06.40 với ba trị riêng $\alpha=1;\ 0{,}1;\ 0{,}01$; bước $\eta=0{,}5$; dừng sau $k=20$ bước; hệ số chính quy hóa $\lambda=\tfrac1{\eta k}=0{,}1$.

**Hai tỉ lệ.**

| $\alpha$ | $\eta\alpha$ | dừng sớm $1-(1-\eta\alpha)^{20}$ | chính quy hóa $\tfrac\alpha{\alpha+0{,}1}$ |
|---:|---:|---:|---:|
| $1$ | $0{,}5$ | $1{,}000$ | $0{,}909$ |
| $0{,}1$ | $0{,}05$ | $0{,}642$ | $0{,}500$ |
| $0{,}01$ | $0{,}005$ | $0{,}095$ | $0{,}091$ |

**Đọc bảng.** Với $\alpha=0{,}01$, hai tỉ lệ gần nhau. Với $\alpha=0{,}1=\lambda$, hai tỉ lệ lệch nhau rõ dù $\eta\alpha=0{,}05$ nhỏ. Với $\alpha=1$, cả hai gần $1$.

**Kiểm tra lại.** $(0{,}95)^{20}\approx0{,}358$, nên dừng sớm cho $0{,}642$ ở dòng hai; $(0{,}995)^{20}\approx0{,}905$, nên dừng sớm cho $0{,}095$ ở dòng ba.
:::

![Trục hoành số bước k trên thang logarit từ 1 đến 1000, η = 0,5; trục tung tỉ lệ giữ từ 0 đến 1. Ba cặp đường cho ba trị riêng: α = 1 (vòng tròn), α = 0,1 (ô vuông), α = 0,01 (tam giác). Đường liền là tỉ lệ giữ của dừng sớm 1 − (1 − ηα)ᵏ; đường nét đứt là tỉ lệ giữ α/(α + λ) của chính quy hóa với λ = 1/(ηk). Các đường tăng dần theo k; cặp có α nhỏ hơn tăng muộn hơn. Tại k = 1, cặp α = 1 đã ở 0,5 và 0,33; tại k = 1000, đường chính quy hóa của α = 0,01 mới ở 0,83. Tại k = 20: α = 1 cho 1,000 và 0,909; α = 0,1 cho 0,642 và 0,500; α = 0,01 cho 0,095 và 0,091.](img/lec-06/early-stopping-shrinkage.svg)

Trên hình, mỗi cặp đường cùng ký hiệu tăng theo $k$, và cặp có $\alpha$ nhỏ hơn tăng muộn hơn: dừng sớm, như chính quy hóa với $\lambda=\tfrac1{\eta k}$, giữ hướng cong và nén hướng phẳng. Hai đường của một cặp chỉ gần nhau trên một phần của trục, và nhận xét sau nói rõ phần đó.

::: remark Nhận xét 06.41 (Điều kiện để hai tỉ lệ gần nhau)
Khi $\eta\alpha\ll1$, $(1-\eta\alpha)^k\approx e^{-\eta\alpha k}$. Khi $\alpha\ll\lambda$, $\tfrac\lambda{\alpha+\lambda}=\tfrac1{1+\alpha/\lambda}\approx e^{-\alpha/\lambda}$. Hai biểu thức bằng nhau khi $\lambda=\tfrac1{\eta k}$. Vậy hai tỉ lệ giữ gần nhau khi cả ba điều kiện cùng đúng: $\lambda\approx\tfrac1{\eta k}$, $\eta\alpha\ll1$ và $\alpha\ll\lambda$ (Goodfellow, Bengio và Courville, 2016, mục 7.8: hai tỉ lệ là (7.40) và (7.42), điều kiện tương đương (7.43), xấp xỉ (7.44)–(7.45)). Trong Ví dụ 06.25, dòng $\alpha=0{,}1$ vi phạm điều kiện thứ ba vì $\alpha/\lambda=1$: $(0{,}95)^{20}\approx0{,}358$ gần $e^{-1}\approx0{,}368$, nhưng $\tfrac\lambda{\alpha+\lambda}=0{,}5$ khác xa $e^{-1}$.
:::

**Trong học máy.** Mệnh đề 06.40 giải thích vì sao dừng sớm thay được việc chọn hệ số chính quy hóa. Một lần chạy cho cả quỹ đạo $\theta_k$, và trên mục tiêu toàn phương, theo hướng riêng có $\eta\alpha\ll1$ và $\alpha\ll\lambda$ (Nhận xét 06.41), mỗi $\theta_k$ gần với một nghiệm chính quy hóa có $\lambda\approx1/(\eta k)$; chọn $k$ trên tập xác thực vì vậy tương tự chọn $\lambda$, trong khi chọn $\lambda$ trực tiếp đòi giải lại bài toán cho mỗi giá trị. Với mạng, mục tiêu không toàn phương, nên tương ứng này chỉ là định hướng (Goodfellow, Bengio và Courville, 2016, mục 7.8).

::: exercise Bài tập 06.5 (Chọn bước hằng theo mức nhiễu nền)
Cho ví dụ ba quan sát: $y=(-1,1,3)$, $F(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, $\mu=L=1$, $\sigma^2=\tfrac83$, $\theta_0=0$, gradient một mẫu $\widehat g=\theta-y_I$ với $I$ đều trên $\{1,2,3\}$.

1. Tìm bước hằng lớn nhất để mức nhiễu nền của Định lý 06.31 không vượt $0{,}05$.
2. Với bước đó, tìm $k$ nhỏ nhất để cận (6.2) không vượt $0{,}1$.
3. Viết đệ quy chính xác cho $a_k=\mathbb E(\theta_k-1)^2$, tìm giới hạn và $k$ nhỏ nhất để $a_k\le0{,}1$. So với câu 2.
:::

::: hint
Mức nhiễu nền là $\tfrac{\eta\sigma^2}\mu$. Ở câu 3, $\theta_{k+1}-1=(1-\eta)(\theta_k-1)+\eta(y_I-1)$, với $y_I-1$ có kỳ vọng $0$ và phương sai $\tfrac83$.
:::

::: solution
1. $\tfrac{\eta\cdot8/3}1\le0{,}05$ khi $\eta\le\tfrac{0{,}15}8=0{,}01875$; bước này không vượt $\tfrac1L=1$.

2. Cận là $(1-0{,}01875)^k+0{,}05\le0{,}1$ khi $0{,}98125^k\le0{,}05$, tức $k\ge\tfrac{\ln0{,}05}{\ln0{,}98125}\approx158{,}3$, nên $k=159$.

3. Bình phương rồi lấy kỳ vọng, số hạng chéo bằng $0$ vì $y_I-1$ có kỳ vọng $0$ và độc lập với $\theta_k$:

$$
a_{k+1}=(1-\eta)^2a_k+\eta^2\cdot\tfrac83 .
$$

Giới hạn là $\tfrac{\eta^2\cdot8/3}{1-(1-\eta)^2}=\tfrac{\eta\cdot8/3}{2-\eta}=\tfrac{0{,}05}{1{,}98125}\approx0{,}0252$, khoảng một nửa mức nhiễu nền. Lặp đệ quy từ $a_0=1$, $a_k$ xuống dưới $0{,}1$ lần đầu tại $k=68$ ($a_{68}\approx0{,}0995$). Cận của định lý cần $159$ bước, hơn gấp đôi, vì hệ số co của cận là $1-\eta\mu$ còn hệ số co thật là $(1-\eta\mu)^2$, và mức nhiễu nền của cận gần gấp đôi giới hạn thật.

**Kiểm tra.** Dạng đóng $a_k=(1-\eta)^{2k}(1-a_\infty)+a_\infty$ tại $k=68$: $0{,}98125^{136}\approx0{,}0762$, nên $a_{68}\approx0{,}0762\cdot0{,}9748+0{,}0252\approx0{,}0995$.
:::

::: exercise Bài tập 06.6 (Ngân sách một triệu gradient mẫu)
Cho $L=\Delta_0=\sigma_1^2=1$, $n=10^5$ mẫu, nhóm $b=100$ chọn có hoàn lại và tổng ngân sách $\mathcal B=10^6$ gradient mẫu.

1. Tính số bước, bước (theo Hệ quả 06.35) và cận của SGD; tính số bước và cận của hạ gradient đầy đủ.
2. Tính ngưỡng $\mathcal B$ của Mệnh đề 06.37 và số lượt dữ liệu tương ứng.
3. Nêu hai lý do vì sao kết luận của câu 1 chưa đủ để chọn SGD cho một mạng ReLU trên dữ liệu này.
:::

::: hint
$\sigma^2=\sigma_1^2/b$ và $K=\mathcal B/b$ cho SGD; $K=\mathcal B/n$ cho hạ gradient đầy đủ. Ở câu 3, xét giả thiết H2 và đại lượng mà cận chặn.
:::

::: solution
1. SGD: $K=\tfrac{10^6}{100}=10^4$ bước, $\sigma^2=0{,}01$, $\eta=\min\{1,\sqrt{2/(0{,}01\cdot10^4)}\}=\sqrt{0{,}02}\approx0{,}1414$. Cận (6.5) với $L=\Delta_0=1$:

   $$
   \begin{aligned}
   \frac{2L\Delta_0}K+2\sqrt{\frac{2L\Delta_0\sigma^2}K}&=\frac2{10^4}+2\sqrt{\frac{2\cdot0{,}01}{10^4}}\\
   &=0{,}0002+2\sqrt{2\cdot10^{-6}}\\
   &\approx0{,}0002+0{,}00283\\
   &=0{,}00303 .
   \end{aligned}
   $$

   Hạ gradient đầy đủ: $K=\tfrac{10^6}{10^5}=10$ bước, cận $\tfrac{2\cdot10^5}{10^6}=0{,}2$.

2. Ngưỡng $\tfrac{L\Delta_0(n-b)^2}{2\sigma_1^2}$, với $L=\Delta_0=\sigma_1^2=1$, bằng $\tfrac{(n-b)^2}2=\tfrac{99\,900^2}2\approx4{,}99\cdot10^9$ gradient mẫu, tức khoảng $49\,900$ lượt dữ liệu. Ngân sách $10^6$ ứng với $10$ lượt, xa dưới ngưỡng.

3. Thứ nhất, với ReLU, $\nabla F$ gián đoạn tại điểm gãy, nên H2 không đúng và cả hai cận chỉ là định hướng. Thứ hai, cả hai cận chặn chuẩn gradient, không chặn $F-F_{\inf}$ hay $R$; mức chính xác đủ dùng được quyết định bằng tập xác thực (Nhận xét 06.38).

**Kiểm tra.** Ở câu 1, bước $\eta=\sqrt{0{,}02}$ thuộc nhánh căn, nên hai số hạng của (6.4) bằng nhau: $\tfrac2{\eta K}=L\eta\sigma^2\approx0{,}001414$, tổng $0{,}00283$. Cận $0{,}00303$ của (6.5) lớn hơn đúng $\tfrac{2L\Delta_0}K=0{,}0002$, số hạng mà (6.5) giữ để đúng cho cả hai nhánh.
:::

Như vậy, khi gradient có nhiễu, bảo đảm còn lại bắt đầu từ bất đẳng thức một bước có số hạng nhiễu (Mệnh đề 06.29), và Ví dụ 06.21 cho thấy số hạng đó thực sự xuất hiện. Với hàm lồi mạnh, bước hằng cho hội tụ tuyến tính tới một lân cận trong đó kỳ vọng bình phương khoảng cách tới nghiệm cùng bậc với mức nhiễu nền (Định lý 06.31), còn bước giảm dần cho hội tụ $O(1/k)$ tới chính nghiệm (Định lý 06.32). Với hàm không lồi, bảo đảm là điểm dừng xấp xỉ với tốc độ $O(1/\sqrt K)$ cho bình phương chuẩn gradient (Định lý 06.34, Hệ quả 06.35). Dưới tổng ngân sách cố định, cận của SGD nhỏ hơn cận của hạ gradient đầy đủ khi số lượt dữ liệu nhỏ hơn khoảng $n/2$ (Mệnh đề 06.37), và mức chính xác đủ dùng do tập xác thực quyết định qua dừng sớm (Thuật toán 06.3, Mệnh đề 06.40). Các kết quả này nằm rải rác theo giả thiết; trong Mục 7, chúng ta xếp chúng lại thành quy tắc lựa chọn phương pháp.

## 7. Bảo đảm mất đi, bảo đảm còn lại và lựa chọn phương pháp

Ở Mục 1.2, chúng ta đã đặt hai khung cạnh nhau trước khi có kết quả nào. Đến đây, mỗi ô của cột "Mô hình và dữ liệu lớn" đã có một kết quả với số hiệu, và chúng ta có thể đọc lại bảng đó như một tổng kết, rồi chuyển nó thành quy tắc chọn phương pháp theo số mẫu $n$, số tham số $p$ và tính lồi.

### 7.1 Những bảo đảm mất đi và những bảo đảm còn lại

Hai điều kiện làm mất bảo đảm là hai giới hạn của Bài 05: (i) chi phí, khi gradient nhóm nhỏ thay gradient đầy đủ; (ii) biểu diễn, khi mô hình phi tuyến theo tham số làm mục tiêu không lồi. Nhận xét sau dùng cùng bốn dòng và cùng thứ tự với Nhận xét 05.42, với cột phải nay ghi kết quả đã chứng minh trong chương.

::: remark Nhận xét 06.42 (Điều không còn giữ được và điều còn giữ được)
| Mất (khi nào) | Còn giữ được (kết quả của chương) |
|---|---|
| Đích là nghiệm chính xác (đã mất ở Bài 05) | Đích là $R$ nhỏ: $F$ chỉ thay thế cho $R$ (Định lý 06.22, Nhận xét 06.23); dừng theo tập xác thực (Thuật toán 06.3) |
| Tốc độ tuyến tính tất định của Định lý 05.30 (khi (i) hoặc (ii)) | Gradient đầy đủ: $F$ giảm mỗi bước (Bổ đề 06.19). SGD trên $F_\lambda=F+\tfrac\lambda2\lVert\theta\rVert^2$ lồi mạnh: bước hằng giữ $\mathbb E\lVert\theta_k-\theta^*\rVert^2$ ở mức bậc $\eta\sigma^2/\mu$, tức bán kính bậc $\sqrt{\eta\sigma^2/\mu}$ (Định lý 06.31), bước giảm dần tới cực tiểu với tốc độ $O(1/k)$ (Định lý 06.32) |
| Cực tiểu toàn cục (khi (ii); Mệnh đề 06.9) | Điểm dừng xấp xỉ: $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le\tfrac{2L\Delta_0}K$ (Định lý 06.20); SGD bước hằng: $\tfrac1K\sum_{k<K}\mathbb E\lVert\nabla F(\theta_k)\rVert^2\le\tfrac{2\Delta_0}{\eta K}+L\eta\sigma^2$ (Định lý 06.34) |
| Chi phí $O(np)$ mỗi bước (khi (i)) | Gradient nhóm nhỏ không chệch, $O(bp)$ mỗi bước (Định lý 06.25, Thuật toán 06.2) |
:::

Ba điểm của bảng hay bị đọc sai.

1. Tốc độ tuyến tính tất định $\Delta_k\le(1-\tfrac1\kappa)^k\Delta_0$ của Định lý 05.30, với $\Delta_k=F_\lambda(\theta_k)-\min F_\lambda$, mất khi gradient đầy đủ được thay bằng gradient nhóm, dù mục tiêu vẫn là $F_\lambda$ lồi mạnh, và cũng mất khi mục tiêu không còn lồi mạnh; chỉ cần một trong hai điều kiện. Dưới (ii) với gradient đầy đủ, bảo đảm tất định còn ở dạng bổ đề giảm và Định lý 06.20.
2. Cực tiểu toàn cục chỉ mất khi mục tiêu không lồi. Với $F_\lambda$ lồi mạnh, Định lý 06.32 vẫn cho hội tụ theo kỳ vọng tới cực tiểu, còn Định lý 06.31 chỉ cho hội tụ tuyến tính tới một lân cận.
3. SGD chỉ giữ một bất đẳng thức một bước có số hạng nhiễu (Mệnh đề 06.29), nên chỉ giảm $F$ theo kỳ vọng khi gradient đủ lớn so với nhiễu, và có thể làm $F$ tăng theo kỳ vọng (Ví dụ 06.21: $\tfrac{69}{128}>\tfrac12$).

Ký hiệu $\sigma^2$ cho chặn phương sai theo Nhận xét 06.2; Bài 05 viết đại lượng này là $\tau^2$.

### 7.2 Lựa chọn giữa hạ gradient đầy đủ, Newton và SGD

Bảng sau chuyển các kết quả thành quy tắc. Các ngưỡng "nhỏ", "vừa", "lớn" chỉ là bậc độ lớn, đọc cùng bảng chi phí của Ví dụ 06.17 và phép so sánh của Mệnh đề 06.37.

| Tình huống | Phương pháp | Mỗi bước | Bảo đảm | Giới hạn |
|---|---|---|---|---|
| $n$, $p$ nhỏ; lồi mạnh | Newton | $O(np^2+p^3)$ | bậc hai cục bộ (Định lý 05.33) | bộ nhớ $p^2$ |
| $p$ lớn, $n$ vừa; lồi mạnh, trơn | hạ gradient | $O(np)$ | tuyến tính (Định lý 05b.18) | quét toàn bộ dữ liệu mỗi bước |
| $n$ lớn; lồi mạnh | SGD, $\eta_k=\tfrac1{\mu(k+1)}$ | $O(bp)$ | $O(1/k)$ theo kỳ vọng (Định lý 06.32) | cần biết $\mu$ |
| không lồi (mạng), $n$ lớn | SGD nhóm nhỏ, bước chọn theo $K$ | $O(bp)$ | $O(1/\sqrt K)$ cho trung bình $\mathbb E\lVert\nabla F\rVert^2$ (Hệ quả 06.35), cần $F$ trơn | chỉ điểm dừng; với ReLU chỉ là định hướng |
| không lồi, $\mathcal B>\tfrac{L\Delta_0(n-b)^2}{2\sigma_1^2}$ (Mệnh đề 06.37) | hạ gradient | $O(np)$ | Định lý 06.20, cần $F$ trơn | chỉ điểm dừng |

Năm dòng của bảng có các điều kiện sau.

1. Dòng thứ nhất dành cho bài toán như hồi quy logistic có chính quy hóa với ít tham số. Giai đoạn hội tụ bậc hai của Newton cần khoảng $\log_2\log_2(\varepsilon_0/\varepsilon)$ bước, không chứa $\kappa$, nhưng ngưỡng $\varepsilon_0$ và giai đoạn tắt dần phụ thuộc $\mu$, $L$ và $L_H$ (Định lý 05.33).
2. Dòng thứ hai dùng Định lý 05b.18, cần $O(\kappa\log\tfrac1\varepsilon)$ bước. Với hàm lồi trơn nhưng không lồi mạnh, hạ gradient chỉ có tốc độ $O(1/k)$ (Định lý 05b.16).
3. Dòng thứ ba cần đúng bước $\tfrac1{\mu(k+1)}$ (Nhận xét 06.33).
4. Dòng thứ tư cần H2 và H6b trên một vùng chứa dãy lặp; lịch bước và dừng sớm là thực hành, ngoài phạm vi chứng minh của Định lý 06.34.
5. Dòng thứ năm cần H2; nó có thêm ưu điểm là tất định, và tiêu chí $\lVert\nabla F\rVert\le\varepsilon$ kiểm tra trực tiếp được.

Bảng không chứa momentum, Nesterov và các phương pháp khởi tạo, được trình bày ở Bài 06b, cũng không chứa AdaGrad, RMSProp, Adam, BFGS và chuẩn hóa theo lô, được trình bày ở Bài 06c. Các phương pháp đó sửa hai điểm yếu mà chương này để lại: bước chung cho mọi tọa độ khi số điều kiện lớn, và độ nhạy của mạng sâu với khởi tạo.

Như vậy, mỗi dòng của bảng ở Mục 1.2 đã có kết quả tương ứng: bảo đảm theo kỳ vọng với số hạng nhiễu thay cho bảo đảm tất định, điểm dừng xấp xỉ thay cho cực tiểu toàn cục, chi phí $O(bp)$ thay cho $O(np)$, và tập xác thực thay cho nghiệm chính xác làm đích. Giới hạn còn lại của chương là mọi bảo đảm đều cần $F$ trơn trên một vùng chứa dãy lặp, điều mạng ReLU không thỏa, và mọi bảo đảm cho mạng chỉ là về điểm dừng.

## Tình huống áp dụng và ứng dụng

Trong ba tình huống sau, chúng ta áp các kết quả của chương lên ba bài toán học máy mà mọi đại lượng đều tính được bằng tay hoặc bằng phép đếm. Tình huống thứ nhất là phép đếm chi phí trước khi huấn luyện một mạng. Tình huống thứ hai có các giả thiết của Định lý 06.20 thỏa nhưng thiếu tính lồi, và cho thấy hậu quả. Tình huống thứ ba thỏa mọi giả thiết của Định lý 06.31 và so sánh định lượng ba phương pháp.

::: application Tình huống 06.1 (Chi phí huấn luyện một mạng phân loại ảnh)
**Bài toán và dữ liệu.** Một tập giả định gồm $n=60\,000$ ảnh xám $28\times28$, mỗi ảnh có nhãn $y\in\{0,1\}$. Mô hình là mạng hai tầng với $d=784$ đầu vào, $m=100$ đơn vị ẩn ReLU và đầu ra vô hướng; mất mát bình phương. Cần ước lượng chi phí của các phương pháp và kiểm tra bảo đảm nào áp dụng được.

**Mô hình hóa.** Theo Định nghĩa 06.6, $p=md+2m+1=78\,601$ (Ví dụ 06.5); rủi ro thực nghiệm là (2.2).

**Chi phí một gradient mẫu.** Theo Mệnh đề 06.15, truyền xuôi tốn $78\,500$ và bước ngược $78\,600$ phép nhân, tổng $157\,100$. Sai phân hữu hạn cần $78\,602$ lần truyền xuôi, khoảng $6{,}2\cdot10^9$ phép nhân.

**Chi phí một bước.**

- Hạ gradient đầy đủ: $60\,000\cdot157\,100\approx9{,}4\cdot10^9$ phép nhân.
- SGD với $b=100$: $100\cdot157\,100\approx1{,}6\cdot10^7$ phép nhân; một lượt dữ liệu gồm $600$ bước.
- Newton: riêng Hessian có $p^2\approx6{,}2\cdot10^9$ phần tử, tức $4{,}9\cdot10^{10}$ byte với số thực $8$ byte; không thực hiện được trên một máy thông thường.

**Bộ nhớ của SGD.** Theo phạm vi của Mệnh đề 06.15, bước ngược cần $z$ và $h$ của cả nhóm: $2mb=20\,000$ số.

**Kiểm tra giả thiết.**

1. H6, H6b (Mệnh đề 06.27): đúng nếu mỗi nhóm được chọn độc lập với lịch sử và $\operatorname{tr}\Sigma$ bị chặn trên vùng chứa dãy lặp; xáo trộn theo lượt vi phạm H6 (Nhận xét 06.28).
2. H2 (Định lý 06.34): sai với ReLU, vì $\nabla F$ gián đoạn tại điểm gãy. Thay ReLU bằng softplus $\log(1+e^z)$, một hàm trơn, làm H2 đúng trên mọi vùng bị chặn, và Định lý 06.34 áp dụng trên vùng chứa dãy lặp.
3. Tính lồi: sai (Mệnh đề 06.9), nên mọi bảo đảm chỉ là về điểm dừng.

**Diễn giải.** Với ReLU, chương trình huấn luyện thực tế là Thuật toán 06.2 với dừng sớm (Thuật toán 06.3); các cận của Định lý 06.34 chỉ cho định hướng về bậc tốc độ và cách chọn bước theo số bước. Một bước SGD rẻ hơn một bước hạ gradient đầy đủ $600$ lần, và mười lượt dữ liệu cho $6\,000$ cập nhật thay vì $10$.

**Giới hạn.** Phép đếm bỏ hằng số cài đặt và tính song song; ở quy mô này, hạ gradient đầy đủ vẫn thực hiện được trong thời gian ngắn trên phần cứng hiện đại, nên lý do chọn SGD ở đây là số cập nhật trên cùng ngân sách (Mệnh đề 06.37), không phải tính khả thi.

**Kiểm tra lại.** $157\,100\cdot60\,000=9{,}426\cdot10^9$; $157\,100\cdot100=1{,}571\cdot10^7$; tỉ số $600=n/b$.

**Dẫn ngược.** Định nghĩa 06.6, Ví dụ 06.5, Mệnh đề 06.15 (bước đếm chi phí); Mệnh đề 06.27 (bước kiểm tra H6, H6b); Định lý 06.34 (bước kiểm tra H2); Mệnh đề 06.9 (bước kiểm tra tính lồi).
:::

::: application Tình huống 06.2 (Tiêu chí dừng khi khởi tạo gần điểm yên ngựa)
**Bài toán và dữ liệu.** Mạng tuyến tính một đơn vị $f=v\,u\,x$ huấn luyện trên một mẫu $x=1$, $y=1$, tức $F(u,v)=\tfrac12(uv-1)^2$. Trọng số được khởi tạo nhỏ với dấu ngược nhau, $\theta_0=(0{,}01;\ -0{,}01)$; hạ gradient bước $\eta=\tfrac12$; quy tắc dừng: dừng khi $\lVert\nabla F(\theta_k)\rVert^2\le10^{-8}$.

**Kiểm tra giả thiết của Định lý 06.20.** H0 đúng với $F_{\inf}=0$. Tới bước dừng $k=8$, và cả tại $\theta_9$, mọi điểm lặp của hai lần chạy dưới đây nằm trong hình vuông $C=[-0{,}011;\ 0{,}011]^2$. Trên $C$, $u^2,v^2\le0{,}000121$ và $\lvert2uv-1\rvert\le1{,}000242$, nên theo phép chặn tổng hàng như Ví dụ 06.14, mọi trị riêng của Hessian có trị tuyệt đối không vượt $1{,}0004$. Vậy H2 đúng trên $C$ với $L=1{,}0004$, và bước $\eta=\tfrac12$ nhỏ hơn $\tfrac1L$.

Với bước $\eta\le\tfrac1L$ thay cho đúng $\tfrac1L$, Bổ đề 06.19 cho mức giảm ít nhất $\tfrac\eta2\lVert\nabla F(\theta_k)\rVert^2$, nên chứng minh của Định lý 06.20 cho $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le\tfrac{2\Delta_0}{\eta K}$ với mọi $K\le9$. Giả thiết bị thiếu là tính lồi: theo Ví dụ 06.12, $F$ không lồi, nên Hệ quả 01.27 không áp dụng.

**Lần chạy thứ nhất, đúng trên đường chéo phụ.** Với $u=t$, $v=-t$, gradient là $\bigl(t(t^2+1),\,-t(t^2+1)\bigr)$, nên dãy ở mãi trên đường chéo phụ với $t_{k+1}=t_k-\tfrac12t_k(t_k^2+1)=\tfrac12t_k(1-t_k^2)$. Từ $t_0=0{,}01$: $t_1\approx5{,}0\cdot10^{-3}$, $t_{10}\approx9{,}8\cdot10^{-6}$, và $t_k\to0$. Khi đó $\lVert\nabla F\rVert^2=2t_k^2(1+t_k^2)^2\to0$: tiêu chí dừng thỏa lần đầu tại $k=8$ ($\lVert\nabla F\rVert^2\approx1{,}2\cdot10^{-8}$ tại $k=7$ và $3{,}1\cdot10^{-9}$ tại $k=8$), với $F\approx0{,}5$.

**Phân loại điểm dừng.** Điểm giới hạn $(0,0)$ có Hessian với trị riêng $-1$ và $1$ (Ví dụ 06.13), nên theo Mệnh đề 06.17 là điểm yên ngựa, không phải cực tiểu. Ở lần chạy này, $\lvert t_k\rvert$ giảm nên mọi điểm lặp nằm trong $C$, và bảo đảm của Định lý 06.20 đúng với mọi $K$: chuẩn gradient nhỏ nhất tiến về $0$.

**Lần chạy thứ hai, lệch $10^{-6}$.** Từ $\theta_0=(0{,}01+10^{-6};\ -0{,}01+10^{-6})$, gần gốc, phép lặp xấp xỉ $\theta_{k+1}\approx(I-\tfrac12\nabla^2F(0,0))\theta_k$ với $I-\tfrac12\nabla^2F(0,0)=\begin{pmatrix}1&\tfrac12\\\tfrac12&1\end{pmatrix}$. Ma trận này nhân thành phần theo hướng $(1,1)$ với $1{,}5$ và thành phần theo hướng $(1,-1)$ với $0{,}5$ ở mỗi bước. Thành phần lệch nhỏ theo hướng $(1,1)$ lớn dần: $F(\theta_k)\approx0{,}49999$ tại $k=20$, $0{,}465$ tại $k=30$, $0{,}0093$ tại $k=35$, và $F\approx0$ từ $k=40$. Tuy nhiên, quy tắc dừng đã thỏa tại $k=8$, khi $\lVert\nabla F\rVert^2\approx4{,}4\cdot10^{-9}$ và $F\approx0{,}5$.

**Diễn giải.** Gradient nhỏ chỉ chứng nhận một điểm dừng xấp xỉ (Nhận xét 06.21). Với mục tiêu không lồi, điểm đó có thể là điểm yên ngựa, và một quy tắc dừng chỉ dựa vào chuẩn gradient kết thúc huấn luyện tại $F\approx\tfrac12$. Nhiễu nhỏ theo hướng có độ cong âm, như nhiễu của SGD hay của số học dấu phẩy động, đẩy dãy rời điểm yên ngựa, nhưng cần thêm nhiều bước.

**Giới hạn.** Ví dụ có hai tham số; với mạng thật, không tính được Hessian để phân loại điểm dừng (Nhận xét 06.18), nên cách kiểm tra thực hành là theo dõi giá trị mất mát trên tập xác thực, không chỉ chuẩn gradient.

**Kiểm tra lại.** Với $t_0=0{,}01$: $t_1=\tfrac12\cdot0{,}01\cdot(1-10^{-4})=0{,}0049995$.

**Dẫn ngược.** Định nghĩa 06.16 (điểm dừng xấp xỉ, điểm yên ngựa); Mệnh đề 06.17 (phân loại tại $(0,0)$); Định lý 06.20 (giả thiết H0, H2 được kiểm tra ở bước đầu); Hệ quả 01.27 (giả thiết lồi bị thiếu).
:::

::: application Tình huống 06.3 (Hồi quy có chính quy hóa trên mười triệu mẫu)
**Bài toán và dữ liệu.** Hồi quy tuyến tính với $n=10^7$ mẫu và $p=10^3$ đặc trưng, mục tiêu $F_\lambda(\theta)=\tfrac1n\sum_i\tfrac12(x_i^\top\theta-y_i)^2+\tfrac\lambda2\lVert\theta\rVert^2$ với $\lambda=10^{-2}$. Các giả định của tình huống: đặc trưng được chuẩn hóa để $L\le1$; khoảng cách đầu $D^2=\lVert\theta_0-\theta^*\rVert^2\le1$; trên vùng chứa dãy lặp, phương sai tổng của gradient một mẫu không vượt $\sigma_1^2=1$. Yêu cầu: $\mathbb E\lVert\theta_k-\theta^*\rVert^2\le10^{-3}$.

**Kiểm tra giả thiết.** $F_\lambda$ có Hessian $\tfrac1n\sum_ix_ix_i^\top+\lambda I\succeq\lambda I$, nên H3 đúng với $\mu=\lambda=10^{-2}$ và H4 đúng; H2 đúng với $L=1$, nên $\kappa=100$. Với nhóm $b=100$ chọn có hoàn lại, Mệnh đề 06.27 cho H6 và H6b với $\sigma^2=\tfrac{\sigma_1^2}b=10^{-2}$. Gradient nhóm của số hạng chính quy hóa là chính xác, nên không thêm nhiễu.

**SGD bước hằng (Định lý 06.31).** Chọn $\eta=5\cdot10^{-4}$, mức nhiễu nền là $\tfrac{\eta\sigma^2}\mu=5\cdot10^{-4}$. Cần $(1-\eta\mu)^kD^2\le5\cdot10^{-4}$, tức $k\ge\tfrac{\ln2000}{-\ln(1-5\cdot10^{-6})}\approx1{,}52\cdot10^6$ bước. Mỗi bước tốn $bp=10^5$ phép nhân–cộng, tổng $1{,}52\cdot10^{11}$, tức khoảng $15$ lượt dữ liệu.

**Hạ gradient đầy đủ (Định lý 05b.18(a)).** $\lVert\theta_k-\theta^*\rVert^2\le(1-\tfrac1\kappa)^kD^2\le10^{-3}$ khi $k\ge\tfrac{\ln1000}{-\ln0{,}99}\approx687{,}3$, tức $688$ bước, mỗi bước $np=10^{10}$, tổng $6{,}88\cdot10^{12}$.

**Giải trực tiếp.** Mục tiêu toàn phương, nên Newton hội tụ sau một bước, tức giải hệ chuẩn: lập $\tfrac1n\sum_ix_ix_i^\top$ tốn $np^2=10^{13}$, giải hệ tốn $p^3=10^9$.

**Diễn giải.** Với yêu cầu này, SGD tốn ít hơn hạ gradient đầy đủ khoảng $45$ lần và ít hơn giải trực tiếp khoảng $66$ lần. Đổi lại, bảo đảm của SGD là theo kỳ vọng, còn hai phương pháp kia tất định; và nếu yêu cầu chặt hơn mức nhiễu nền, bước hằng không đạt được, phải giảm bước (Định lý 06.32) hoặc tăng $b$.

**Giới hạn.** Ba hằng số $L$, $D^2$, $\sigma_1^2$ là giả định; trên dữ liệu thật, $\sigma_1^2$ chỉ bị chặn trên một vùng (Mệnh đề 06.27). Phép so sánh dùng cận trên, có thể bi quan khác nhau cho từng phương pháp (Ví dụ 06.15, Ví dụ 06.22). Mức $10^{-3}$ đủ hay không do tập xác thực quyết định (Nhận xét 06.38).

**Kiểm tra lại.** $\tfrac{6{,}88\cdot10^{12}}{1{,}52\cdot10^{11}}\approx45{,}3$ và $\tfrac{1{,}0\cdot10^{13}}{1{,}52\cdot10^{11}}\approx66$; số lượt của SGD là $\tfrac{1{,}52\cdot10^6\cdot100}{10^7}\approx15{,}2$.

**Dẫn ngược.** Định lý 06.31 (H2, H3, H4, H6, H6b, bước $\eta\le\tfrac1L$); Mệnh đề 06.27 (bước tính $\sigma^2$ từ $b$); Định lý 05b.18 (bước so sánh với hạ gradient đầy đủ); Ví dụ 06.17 (mô hình chi phí).
:::

**Ứng dụng.**

- **Mạng nơ-ron sâu.** Định nghĩa 06.6 lặp lại theo tầng cho mạng nhiều tầng; đối xứng hoán vị (Mệnh đề 06.8) và tính không lồi (Mệnh đề 06.9) giữ nguyên ở mọi tầng (Goodfellow, Bengio và Courville, 2016, mục 8.2.2).
- **Vi phân tự động.** Lan truyền ngược (Thuật toán 06.1, Bổ đề 06.12) là chế độ ngược của vi phân tự động trong các thư viện học sâu; chi phí cùng bậc truyền xuôi là Mệnh đề 06.15 (Goodfellow, Bengio và Courville, 2016, mục 6.5).
- **Bộ tối ưu.** Mọi bộ tối ưu dùng trong học sâu, từ SGD tới Adam, dùng gradient nhóm nhỏ của Định lý 06.25; các biến thể có momentum và bước thích nghi thuộc Bài 06b, 06c.
- **Học quy mô lớn với mô hình lồi.** Hồi quy logistic và SVM tuyến tính trên dữ liệu văn bản dùng SGD với bước $\tfrac1{\lambda(t+t_0)}$, cùng dạng với Định lý 06.32 (Ví dụ 06.18; Bottou và Bousquet, 2011).
- **Chính quy hóa ngầm.** Dừng sớm có tác dụng gần như chính quy hóa $\ell_2$ trên mục tiêu toàn phương (Mệnh đề 06.40) và là quy tắc mặc định khi huấn luyện mạng (Goodfellow, Bengio và Courville, 2016, mục 7.8).

## Tóm tắt chương

Chúng ta đã xuất phát từ hai giới hạn của Bài 05: mô hình tuyến tính không biểu diễn được XOR, và mỗi bước của hạ gradient hay Newton trả chi phí của toàn bộ $n$ mẫu. Mạng hai tầng với hàm kích hoạt phi tuyến biểu diễn được XOR, nhưng đối xứng hoán vị các đơn vị ẩn làm rủi ro thực nghiệm không lồi (Mệnh đề 06.4, 06.8, 06.9). Lan truyền ngược tính gradient một mẫu với chi phí cùng bậc truyền xuôi (Thuật toán 06.1, Mệnh đề 06.13, 06.15), và khi mục tiêu không lồi, gradient chỉ chứng nhận điểm dừng xấp xỉ, có thể nằm cạnh điểm yên ngựa (Định lý 06.20, Ví dụ 06.16). Thay gradient đầy đủ bằng gradient nhóm nhỏ cho một ước lượng không chệch với chi phí $O(bp)$ mỗi bước (Định lý 06.25), đổi lại SGD chỉ giữ một bất đẳng thức một bước có số hạng nhiễu (Mệnh đề 06.29). Từ đó, SGD có mức nhiễu nền với bước hằng, tốc độ $O(1/k)$ với bước giảm dần trên hàm lồi mạnh, và tốc độ $O(1/\sqrt K)$ cho bình phương chuẩn gradient trên hàm không lồi (Định lý 06.31, 06.32, 06.34). Dưới tổng ngân sách cố định, cận của SGD tốt hơn khi số lượt dữ liệu nhỏ hơn khoảng $n/2$ (Mệnh đề 06.37), và vì $F$ chỉ thay thế cho $R$, mức chính xác đủ dùng do tập xác thực quyết định qua dừng sớm (Thuật toán 06.3, Mệnh đề 06.40). Giới hạn còn lại là mọi bảo đảm đều cần $F$ trơn, điều mạng ReLU không thỏa, và mọi bảo đảm cho mạng chỉ là về điểm dừng.

**Định nghĩa và kết quả theo mục.**

- Mục 1: bài toán huấn luyện, rủi ro thực nghiệm và rủi ro kỳ vọng (Định nghĩa 06.1); đối chiếu ký hiệu (Nhận xét 06.2).
- Mục 2: tách được tuyến tính (Định nghĩa 06.3); XOR không tách được (Mệnh đề 06.4), kể cả qua đặc trưng affine (Mệnh đề 06.5); mạng hai tầng (Định nghĩa 06.6); kích hoạt tuyến tính cho hàm affine (Mệnh đề 06.7); đối xứng hoán vị (Mệnh đề 06.8); phép kiểm tra tính lồi (Mệnh đề 06.9); phạm vi (Nhận xét 06.10).
- Mục 3: đồ thị tính toán (Định nghĩa 06.11); truyền ngược qua một nút (Bổ đề 06.12); Thuật toán 06.1; tính đúng (Mệnh đề 06.13) và quy ước $\sigma'(0)=0$ (Nhận xét 06.14); chi phí (Mệnh đề 06.15).
- Mục 4: điểm dừng, điểm yên ngựa (Định nghĩa 06.16); phân loại bằng Hessian (Mệnh đề 06.17, Nhận xét 06.18); bổ đề giảm (Bổ đề 06.19); hạ gradient trên hàm không lồi (Định lý 06.20, Nhận xét 06.21).
- Mục 5: rủi ro thực nghiệm tại tham số cố định (Định lý 06.22, Nhận xét 06.23); gradient nhóm nhỏ (Định nghĩa 06.24, Định lý 06.25); Thuật toán 06.2; giả thiết H6, H6a, H6b (Định nghĩa 06.26, Mệnh đề 06.27, Nhận xét 06.28).
- Mục 6: bất đẳng thức một bước có nhiễu (Mệnh đề 06.29, Nhận xét 06.30); SGD trên hàm lồi mạnh với bước hằng và bước giảm dần, SGD trên hàm không lồi (Định lý 06.31, 06.32, 06.34; Nhận xét 06.33, 06.36; Hệ quả 06.35); so sánh dưới tổng ngân sách (Mệnh đề 06.37, Nhận xét 06.38); dừng sớm (Thuật toán 06.3, Nhận xét 06.39); tỉ lệ giữ (Mệnh đề 06.40, Nhận xét 06.41).
- Mục 7: điều không còn giữ được và điều còn giữ được (Nhận xét 06.42); bảng lựa chọn phương pháp.

**Công thức cần nhớ.**

- Mạng hai tầng: $f(x;\theta)=w_2^\top\sigma(W_1x+b_1)+b_2$, $p=md+2m+1$.
- Lan truyền ngược: $e=\partial\ell/\partial f$, $\nabla_{w_2}\ell=e\,h$, $\delta_z=\sigma'(z)\odot(e\,w_2)$, $\nabla_{W_1}\ell=\delta_zx^\top$, $\nabla_{b_1}\ell=\delta_z$.
- Sai số của gradient nhóm: $\tfrac{\operatorname{tr}\Sigma}b$ (có hoàn lại), $\tfrac{\operatorname{tr}\Sigma}b\cdot\tfrac{n-b}{n-1}$ (không hoàn lại).
- Bất đẳng thức một bước: $\mathbb E[F(\theta_{k+1})\mid\mathcal F_k]\le F(\theta_k)-\eta(1-\tfrac{L\eta}2)\lVert\nabla F(\theta_k)\rVert^2+\tfrac{L\eta^2}2\sigma^2$.
- Mức nhiễu nền của bước hằng: $\tfrac{\eta\sigma^2}\mu$.
- Hạ gradient trên hàm không lồi (Định lý 06.20): $\min_{k<K}\lVert\nabla F\rVert^2\le\tfrac{2L\Delta_0}K$; SGD trên hàm không lồi với bước theo $K$ (Hệ quả 06.35): $\tfrac{2L\Delta_0}K+2\sqrt{\tfrac{2L\Delta_0\sigma^2}K}$.
- Tỉ lệ giữ: $1-(1-\eta\alpha)^k$ (dừng sớm), $\tfrac\alpha{\alpha+\lambda}$ (chính quy hóa), gần nhau khi $\lambda\approx\tfrac1{\eta k}$, $\eta\alpha\ll1$, $\alpha\ll\lambda$.

**Giả thiết hay bị bỏ quên.**

1. Mất mát lồi theo $f$ không kéo theo rủi ro lồi theo $\theta$ (Nhận xét 06.10).
2. Lan truyền ngược cho gradient chỉ tại điểm khả vi; quy ước $\sigma'(0)=0$ không cho gradient (Nhận xét 06.14).
3. H2 chỉ đúng trên một vùng với mạng tuyến tính và mạng có kích hoạt trơn; với ReLU, H2 sai (Ví dụ 06.14, Định lý 06.20).
4. Nhóm phải được chọn độc lập với lịch sử để H6 đúng; xáo trộn theo lượt vi phạm điều này (Nhận xét 06.28).
5. H6b thường chỉ đúng trên một vùng bị chặn (Mệnh đề 06.27).
6. Đại lượng được chặn: bước tốt nhất hay trung bình theo $k$, không phải bước cuối, và không phải tham số trả về theo tập xác thực (Nhận xét 06.36, 06.39).

**Giới hạn còn lại và bài tiếp theo.** Bước của SGD trong chương là một số chung cho mọi tọa độ, nên SGD chậm khi số điều kiện lớn, và các định lý của chương không nói gì về khởi tạo. Momentum, Nesterov và khởi tạo được trình bày ở Bài 06b; các phương pháp có bước thích nghi theo tọa độ (AdaGrad, RMSProp, Adam), phương pháp tựa Newton và chuẩn hóa theo lô được trình bày ở Bài 06c.

## Bài tập củng cố

Năm bài tập dưới đây bổ sung cho sáu bài tập trong các mục, theo ba mức: nhận biết (Bài tập 06.7), tính toán hoặc chứng minh (Bài tập 06.8, 06.9) và vận dụng vào AI (Bài tập 06.10, 06.11). Bảng sau ghi bài tập ứng với mỗi mục tiêu học tập.

| Mục tiêu | Bài tập |
|---|---|
| 1. XOR, mạng hai tầng, tính không lồi | 06.1, 06.7, 06.8 |
| 2. Lan truyền ngược và chi phí | 06.2, 06.9 |
| 3. Điểm dừng, bổ đề giảm, hạ gradient trên hàm không lồi | 06.3, 06.7, 06.8 |
| 4. Gradient nhóm nhỏ và thuật toán SGD | 06.4, 06.7 |
| 5. Hội tụ của SGD, ngân sách, dừng sớm | 06.5, 06.6, 06.10 |
| 6. Lựa chọn phương pháp | 06.6, 06.11 |

::: exercise Bài tập 06.7 (Mức nhận biết: sáu phát biểu)
Xác định mỗi phát biểu sau đúng hay sai, và nêu kết quả hoặc ví dụ của chương làm căn cứ.

1. Nếu $F$ là rủi ro thực nghiệm của một mạng hai tầng và $\nabla F(\theta)=0$ thì $\theta$ là cực tiểu địa phương của $F$.
2. Nếu mất mát $\ell(f,y)$ lồi theo $f$ thì rủi ro thực nghiệm $F(\theta)$ lồi theo $\theta$ với mọi mô hình $f(x;\theta)$.
3. Tại một $\theta$ cố định mà mọi $\ell_i$ khả vi, gradient nhóm nhỏ chọn đều không hoàn lại là ước lượng không chệch của $\nabla F(\theta)$.
4. Trên một hàm lồi mạnh và trơn, SGD với bước hằng $\eta\le\tfrac1L$ và $\sigma^2>0$ cho $\mathbb E\lVert\theta_k-\theta^*\rVert^2\to0$.
5. Định lý 06.20 chặn $F(\theta_K)-F_{\inf}$.
6. Tại một điểm mà mọi tiền kích hoạt khác $0$, lan truyền ngược trên mạng ReLU cho đúng gradient với chi phí cùng bậc một lần truyền xuôi.
:::

::: hint
Mỗi phát biểu ứng với đúng một kết quả hoặc ví dụ của chương: tìm kết quả đó, rồi kiểm tra giả thiết của nó.
:::

::: solution
1. **Sai.** Mạng tuyến tính một đơn vị là mạng hai tầng với $d=m=1$; gốc $(0,0)$ của $F(u,v)=\tfrac12(uv-1)^2$ có $\nabla F=0$ nhưng là điểm yên ngựa (Ví dụ 06.13, Mệnh đề 06.17).
2. **Sai.** Cần $\theta\mapsto f(x_i;\theta)$ affine (Định lý 01.31(b)). Với mạng, $F$ không lồi (Ví dụ 06.7, Nhận xét 06.10).
3. **Đúng.** Kết luận 2 của Định lý 06.25.
4. **Sai.** Định lý 06.31 chỉ cho cận $(1-\eta\mu)^kD^2+\tfrac{\eta\sigma^2}\mu$, và trên ví dụ ba quan sát với bước $0{,}1$, giá trị chính xác tiến về $\tfrac8{57}>0$ (Ví dụ 06.22). Cần bước giảm dần (Định lý 06.32).
5. **Sai.** Định lý 06.20 chặn $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2$; Ví dụ 06.16 có bước được chứng nhận với $F-F_{\inf}\approx0{,}5$ (Nhận xét 06.21).
6. **Đúng.** Mệnh đề 06.13 (tính đúng tại điểm khả vi) và Mệnh đề 06.15 (chi phí $md+2m$ so với $md+m$).
:::

::: exercise Bài tập 06.8 (Mức chứng minh: đối xứng liên tục và Hessian suy biến)
Cho $F:\mathbb R^p\to\mathbb R$ khả vi liên tục hai lần, $\theta^*$ là một cực tiểu địa phương, và $\gamma:I\to\mathbb R^p$, với $I$ là một khoảng mở chứa $1$, là một đường cong khả vi liên tục hai lần theo tham số $t$, với $\gamma(1)=\theta^*$, $\gamma'(1)\ne0$ và $F(\gamma(t))=F(\theta^*)$ với mọi $t$.

1. Chứng minh $\nabla^2F(\theta^*)\,\gamma'(1)=0$, tức $\gamma'(1)$ là vector riêng ứng với trị riêng $0$.
2. Với mạng hai tầng ReLU (2.1) và một vector $\omega=(\omega_1,\ldots,\omega_m)$ có mọi $\omega_j>0$, đặt $\Omega=\operatorname{diag}(\omega)$ và chứng minh tham số $(\Omega W_1,\Omega b_1,\Omega^{-1}w_2,b_2)$ cho cùng hàm với $(W_1,b_1,w_2,b_2)$.
3. Áp câu 1 cho $F(u,v)=\tfrac12(uv-1)^2$, $\theta^*=(1,1)$ và $\gamma(t)=(t,1/t)$; đối chiếu với Ví dụ 06.13.
:::

::: hint
Ở câu 1, đạo hàm hai lần hàm hằng $\phi(t)=F(\gamma(t))$ tại $t=1$, dùng $\nabla F(\theta^*)=0$, rồi dùng kết luận 3 của Mệnh đề 06.17. Đặt $\dot\gamma=\gamma'(1)$ và $H=\nabla^2F(\theta^*)$. Với ma trận nửa xác định dương $H$, $\dot\gamma^\top H\dot\gamma=0$ kéo theo $H\dot\gamma=0$: viết $H$ theo vector riêng. Ở câu 2, dùng $\max\{0,\omega z\}=\omega\max\{0,z\}$ khi $\omega>0$.
:::

::: solution
1. **Bước 1 (đạo hàm hàm hằng).** Đặt $\phi(t)=F(\gamma(t))$, hằng theo giả thiết, nên $\phi''(1)=0$. Quy tắc dây chuyền cho $\phi'(t)=\nabla F(\gamma(t))^\top\gamma'(t)$ và

   $$
   \phi''(t)=\gamma'(t)^\top\nabla^2F(\gamma(t))\,\gamma'(t)+\nabla F(\gamma(t))^\top\gamma''(t).
   $$

   Tại $t=1$, $\nabla F(\theta^*)=0$ vì $\theta^*$ là cực tiểu địa phương của hàm khả vi. Với $\dot\gamma=\gamma'(1)$ và $H=\nabla^2F(\theta^*)$, ta được $\dot\gamma^\top H\dot\gamma=0$.

   **Bước 2 ($H$ nửa xác định dương).** Kết luận 3 của Mệnh đề 06.17 cho $H\succeq0$. Viết $H=\sum_i\alpha_i\xi_i\xi_i^\top$ với trị riêng $\alpha_i\ge0$ và vector riêng $\xi_i$ trực chuẩn. Khi đó $0=\dot\gamma^\top H\dot\gamma=\sum_i\alpha_i(\xi_i^\top\dot\gamma)^2$. Mỗi số hạng không âm, nên $\alpha_i(\xi_i^\top\dot\gamma)^2=0$, kéo theo $\alpha_i(\xi_i^\top\dot\gamma)=0$ với mọi $i$. Do đó $H\dot\gamma=\sum_i\alpha_i(\xi_i^\top\dot\gamma)\xi_i=0$.

2. Với $\omega_j>0$, $\max\{0,\omega_jz_j\}=\omega_j\max\{0,z_j\}$. Tham số mới cho tiền kích hoạt $\omega_jz_j$ ở đơn vị $j$, kích hoạt $\omega_jh_j$, và đầu ra $\sum_j\tfrac{[w_2]_j}{\omega_j}\omega_jh_j+b_2=w_2^\top h+b_2$. Với $\omega_j<0$, đẳng thức $\max\{0,\omega_jz\}=\omega_j\max\{0,z\}$ sai, chẳng hạn $\omega_j=-1$, $z=1$ cho $0\ne-1$.

3. $F(\gamma(t))=\tfrac12(t\cdot\tfrac1t-1)^2=0=F(1,1)$ với mọi $t>0$, và $\gamma'(t)=(1,-\tfrac1{t^2})$, nên $\gamma'(1)=(1,-1)$. Câu 1 cho $\nabla^2F(1,1)(1,-1)^\top=0$.

**Kiểm tra.** $\begin{pmatrix}1&1\\1&1\end{pmatrix}\begin{pmatrix}1\\-1\end{pmatrix}=\begin{pmatrix}0\\0\end{pmatrix}$, đúng với trị riêng $0$ và vector riêng $(1,-1)$ của Ví dụ 06.13.
:::

::: exercise Bài tập 06.9 (Mức tính toán: lan truyền ngược trên mạng ba đơn vị ẩn)
Cho mạng hai tầng ReLU với $d=2$, $m=3$:

$$
W_1=\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix},\qquad b_1=\begin{pmatrix}0\\0\\-1\end{pmatrix},\qquad w_2=\begin{pmatrix}1\\1\\-2\end{pmatrix},\qquad b_2=0,
$$

một mẫu $x=(1,2)$, $y=1$, mất mát $\ell=\tfrac12(f-y)^2$.

1. Tính $z$, $h$, $f$, $\ell$ và mọi thành phần của gradient bằng Thuật toán 06.1; tính $\lVert\nabla\ell\rVert^2$.
2. Thực hiện một bước hạ gradient với $\eta=0{,}01$, $0{,}02$ và $0{,}05$; tính mất mát sau mỗi bước.
3. Từ kết quả với $\eta=0{,}05$, suy ra một cận dưới cho hằng số Lipschitz của $\nabla\ell$ dọc đoạn nối tham số đầu và tham số sau bước, sau khi kiểm tra $\ell$ trơn dọc đoạn đó.
:::

::: hint
Cả ba tiền kích hoạt dương, nên $\sigma'(z)=(1,1,1)$. Ở câu 3, dùng Bổ đề 06.19 với $\eta\le\tfrac2L$, và lưu ý tiền kích hoạt là hàm affine của $\eta$ dọc đoạn.
:::

::: solution
1. $z=(1,2,1+2-1)=(1,2,2)$, $h=z$, $f=1+2-4=-1$, $e=f-y=-2$, $\ell=2$.

- Tầng ra: $\partial\ell/\partial b_2=-2$, $\nabla_{w_2}\ell=e\,h=(-2,-4,-4)$.
- Tầng ẩn: $e\,w_2=(-2,-2,4)$, $\delta_z=(-2,-2,4)$.
- Tham số tầng ẩn: $\nabla_{W_1}\ell=\delta_zx^\top=\begin{pmatrix}-2&-4\\-2&-4\\4&8\end{pmatrix}$, $\nabla_{b_1}\ell=(-2,-2,4)$.

Tổng bình phương theo bốn khối $b_2$, $w_2$, $W_1$, $b_1$ là

$$
\begin{aligned}
\lVert\nabla\ell\rVert^2&=4+(4+16+16)+(4+16+4+16+16+64)+(4+4+16)\\
&=4+36+120+24\\
&=184 .
\end{aligned}
$$

2. Với $\eta=0{,}01$: $W_1^+=\begin{pmatrix}1{,}02&0{,}04\\0{,}02&1{,}04\\0{,}96&0{,}92\end{pmatrix}$, $b_1^+=(0{,}02;\ 0{,}02;\ -1{,}04)$, $w_2^+=(1{,}02;\ 1{,}04;\ -1{,}96)$, $b_2^+=0{,}02$. Khi đó $z^+=(1{,}12;\ 2{,}12;\ 1{,}76)$, $f^+=1{,}1424+2{,}2048-3{,}4496+0{,}02=-0{,}0824$ và $\ell^+=\tfrac12\cdot1{,}0824^2\approx0{,}586$.

Cùng cách tính: với $\eta=0{,}02$, $z^+=(1{,}24;\ 2{,}24;\ 1{,}52)$, $f^+=0{,}8304$, $\ell^+\approx0{,}0144$; với $\eta=0{,}05$, $z^+=(1{,}6;\ 2{,}6;\ 0{,}8)$, $f^+=3{,}54$, $\ell^+\approx3{,}226$. Hai bước đầu làm mất mát giảm từ $2$, bước thứ ba làm mất mát tăng.

3. Dọc đoạn nối, $z(\eta)=W_1(\eta)x+b_1(\eta)$ affine theo $\eta$, với $z(0)=(1,2,2)$ và $z(0{,}05)=(1{,}6;\ 2{,}6;\ 0{,}8)$ đều dương, nên mọi tiền kích hoạt dương trên cả đoạn và $\ell$ trơn dọc đoạn. Nếu $\nabla\ell$ là $L$-Lipschitz dọc đoạn với $L\le40$ thì $0{,}05\le\tfrac2L$, và Bổ đề 06.19 cho $\ell^+\le\ell$, trái với $3{,}226>2$. Vậy $L>40$.

**Kiểm tra.** $\partial\ell/\partial b_2=e=-2$: tăng $b_2$ thêm $\varepsilon$ cho $\ell=\tfrac12(-2+\varepsilon)^2$, đạo hàm tại $0$ bằng $-2$.
:::

::: exercise Bài tập 06.10 (Mức vận dụng: dừng sớm thay cho chính quy hóa)
Một mô hình được huấn luyện bằng hạ gradient bước $\eta=0{,}25$ từ $\theta_0=0$ trên một mục tiêu xấp xỉ bậc hai $\tfrac12(\theta-\theta^*)^\top H(\theta-\theta^*)$, với ba trị riêng của $H$ là $\alpha=2;\ 0{,}2;\ 0{,}002$.

1. Tìm số bước $k$ nhỏ nhất để tỉ lệ giữ của dừng sớm theo hướng $\alpha=0{,}2$ đạt ít nhất $0{,}5$.
2. Với $k$ đó và $\lambda=\tfrac1{\eta k}$, tính tỉ lệ giữ của dừng sớm và của chính quy hóa theo cả ba hướng.
3. Dùng Nhận xét 06.41, xác định hướng thỏa điều kiện để hai tỉ lệ gần nhau, rồi đối chiếu với câu 2.
4. Nêu một lý do để chọn dừng sớm thay cho chính quy hóa khi huấn luyện mạng, và một giới hạn của phép tương ứng $k\leftrightarrow\lambda$.
:::

::: hint
Tỉ lệ giữ của dừng sớm là $1-(1-\eta\alpha)^k$, của chính quy hóa là $\tfrac\alpha{\alpha+\lambda}$ (Mệnh đề 06.40). Ở câu 1, giải $(1-0{,}05)^k\le0{,}5$.
:::

::: solution
1. $\eta\alpha=0{,}05$. Cần $0{,}95^k\le0{,}5$, tức $k\ge\tfrac{\ln0{,}5}{\ln0{,}95}\approx13{,}5$, nên $k=14$. Kiểm tra: $1-0{,}95^{13}\approx0{,}487$ và $1-0{,}95^{14}\approx0{,}512$.

2. $\lambda=\tfrac1{0{,}25\cdot14}=\tfrac1{3{,}5}\approx0{,}286$.

| $\alpha$ | $\eta\alpha$ | dừng sớm | chính quy hóa |
|---:|---:|---:|---:|
| $2$ | $0{,}5$ | $1-0{,}5^{14}\approx1{,}000$ | $\tfrac2{2{,}286}\approx0{,}875$ |
| $0{,}2$ | $0{,}05$ | $0{,}512$ | $\tfrac{0{,}2}{0{,}486}\approx0{,}412$ |
| $0{,}002$ | $0{,}0005$ | $0{,}00698$ | $0{,}00695$ |

3. Hướng $\alpha=0{,}002$ thỏa cả $\eta\alpha\ll1$ và $\alpha\ll\lambda$ ($\alpha/\lambda=0{,}007$), và hai tỉ lệ gần như trùng nhau. Hướng $\alpha=0{,}2$ có $\eta\alpha$ nhỏ nhưng $\alpha/\lambda=0{,}7$ không nhỏ, nên hai tỉ lệ lệch nhau ($0{,}512$ và $0{,}412$). Hướng $\alpha=2$ vi phạm cả hai điều kiện; hai cách đều giữ phần lớn thành phần nhưng với tỉ lệ khác nhau.

4. Dừng sớm không đòi sửa mục tiêu và tiết kiệm chính các bước bị bỏ: một lần chạy với tập xác thực thay cho nhiều lần huấn luyện với các $\lambda$ khác nhau. Giới hạn: tương ứng $k\leftrightarrow\tfrac1{\eta\lambda}$ chỉ được chứng minh cho mục tiêu toàn phương và chỉ gần đúng dưới hai điều kiện của Nhận xét 06.41; với mạng, nó là định hướng.
:::

::: exercise Bài tập 06.11 (Mức vận dụng: bộ nhớ, kích thước nhóm và phương pháp)
Một mạng hai tầng ReLU với $d=3072$ đầu vào (ảnh màu $32\times32$) và $m=4096$ đơn vị ẩn được huấn luyện trên $n=10^7$ mẫu bằng SGD với nhóm chọn có hoàn lại, trên một bộ xử lý có $1{,}6\cdot10^{10}$ byte bộ nhớ, số thực $8$ byte.

1. Tính $p$ và bộ nhớ cần để lưu Hessian. Kết luận về Newton.
2. Bộ nhớ cố định gồm tham số và gradient, tức $2p$ số. Mỗi mẫu trong nhóm cần lưu $z$, $h$ (Mệnh đề 06.15) và đầu vào $x$ cho tích ngoài $\delta_zx^\top$. Tính kích thước nhóm lớn nhất $b_{\max}$ mà bộ nhớ cho phép.
3. Với tổng ngân sách $\mathcal B=10^9$ gradient mẫu và $L=\Delta_0=\sigma_1^2=1$, so cận của Mệnh đề 06.37 cho SGD với $b=256$ và với $b=b_{\max}$. Kết luận gì về việc chọn $b$ lớn nhất mà bộ nhớ cho phép?
:::

::: hint
Ở câu 2, mỗi mẫu cần $2m+d$ số. Ở câu 3, cận SGD là $\tfrac{2b}{\mathcal B}+2\sqrt{\tfrac2{\mathcal B}}$ khi các hằng số bằng $1$.
:::

::: solution
1. $p=md+2m+1=12\,582\,912+8\,192+1=12\,591\,105$. Hessian có $p^2\approx1{,}59\cdot10^{14}$ phần tử, tức khoảng $1{,}27\cdot10^{15}$ byte, gần $8\cdot10^4$ lần bộ nhớ có sẵn. Newton không thực hiện được, chưa kể chi phí giải hệ $p^3$.

2. Bộ nhớ cố định: $2p\cdot8\approx2{,}01\cdot10^8$ byte. Mỗi mẫu: $(2m+d)\cdot8=(8\,192+3\,072)\cdot8=90\,112$ byte. Phần còn lại $1{,}6\cdot10^{10}-2{,}01\cdot10^8\approx1{,}57985\cdot10^{10}$ byte, nên $b_{\max}=\lfloor1{,}57985\cdot10^{10}/90\,112\rfloor=175\,321$, nhỏ hơn $n$.

3. Số hạng chung $2\sqrt{2/10^9}\approx8{,}94\cdot10^{-5}$ không phụ thuộc $b$.

- $b=256$: số hạng còn lại $\tfrac{2\cdot256}{10^9}\approx5{,}1\cdot10^{-7}$, cận $\approx9{,}00\cdot10^{-5}$.
- $b=175\,321$: số hạng còn lại $\approx3{,}51\cdot10^{-4}$, cận $\approx4{,}40\cdot10^{-4}$.

Dưới tổng ngân sách cố định, nhóm lớn nhất mà bộ nhớ cho phép làm cận tệ hơn khoảng $5$ lần, vì nó cho ít bước hơn với cùng số gradient mẫu. Nhóm lớn chỉ có lợi khi phần cứng xử lý song song cả nhóm trong cùng thời gian, tức khi giới hạn là thời gian thực chứ không phải số gradient mẫu. Vì vậy $b$ được chọn theo mức song song của phần cứng, không theo bộ nhớ tối đa (Goodfellow, Bengio và Courville, 2016, mục 8.1.3).

**Kiểm tra.** $p^2\cdot8=12\,591\,105^2\cdot8\approx1{,}268\cdot10^{15}$; $175\,321\cdot90\,112\approx1{,}5798\cdot10^{10}$, không vượt phần bộ nhớ còn lại.
:::

## Hướng dẫn đọc thêm và tài liệu tham khảo

- Ian Goodfellow, Yoshua Bengio và Aaron Courville (2016), *Deep Learning*, MIT Press. Mục 4.3.1 (tr. 89–90: phép kiểm tra đạo hàm bậc hai và điểm yên ngựa), dùng cho Mục 4.3. Mục 6.1 (tr. 171–177: XOR và mạng hai tầng; Hình 6.1; nghiệm (6.4)–(6.11)), dùng cho Mục 2. Mục 6.5 (tr. 204–224: đồ thị tính toán, quy tắc dây chuyền, Thuật toán 6.2 ở tr. 209–210, chi phí ở tr. 220–221), dùng cho Mục 3. Mục 7.8 (tr. 246–252: dừng sớm, Thuật toán 7.1, phân tích (7.40)–(7.45)), dùng cho Mục 6.6–6.7. Mục 8.1 (tr. 275–282: học khác tối ưu thuần túy, đại lượng thay thế, nhóm nhỏ, tr. 278–281), mục 8.2.2–8.2.3 (tr. 283–286: đối xứng không gian trọng số, điểm yên ngựa, bình nguyên) và mục 8.3.1 (tr. 294–296: Thuật toán 8.1, điều kiện (8.12)–(8.14), tốc độ của SGD), dùng cho Mục 2.5, 4.6, 5 và 6.
- Léon Bottou và Olivier Bousquet (2011), "The Tradeoffs of Large-Scale Learning", chương 13 trong Suvrit Sra, Sebastian Nowozin và Stephen J. Wright (biên tập), *Optimization for Machine Learning*, MIT Press: mục 13.2.3 (tr. 354–355: phân rã sai số vượt), Bảng 13.2 (tr. 362: thời gian theo độ chính xác) và Bảng 13.3 (tr. 363: số liệu RCV1). Dùng cho Mục 5.2 và 6.5.
- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press, mục 3.2.2 (tr. 79: hợp với ánh xạ affine giữ tính lồi). Dùng cho Mục 2.5.
- Léon Bottou, Frank E. Curtis và Jorge Nocedal (2018), "Optimization Methods for Large-Scale Machine Learning", *SIAM Review* 60(2), 223–311, mục 4. Đọc thêm cho Mục 6: định lý SGD với bước cố định và bước giảm dần cho hàm lồi mạnh và không lồi.
- Ghi chú Bài 05b: Định nghĩa 05b.5, 05b.31; Bổ đề 05b.6, 05b.7, 05b.32; Hệ quả 05b.10, 05b.38, 05b.44; Định lý 05b.16, 05b.18, 05b.36, 05b.39, 05b.41, 05b.43; Ví dụ 05b.19, 05b.25. Các Định lý 06.20, 06.31, 06.32, 06.34 và Hệ quả 06.35 là các kết quả này phát biểu lại với ký hiệu của chương.
- Ghi chú Bài 05c, Mục 6: Định nghĩa 05c.51; Định lý 05c.52, 05c.53; Mệnh đề 05c.56; Nhận xét 05c.58; Mục 6.6 và 6.7. Định lý 06.22 và 06.25 là hai định lý đầu phát biểu lại.
- Ghi chú Bài 05: Định nghĩa 05.5, 05.6, 05.20, 05.38; Mệnh đề 05.35, 05.39, 05.40, 05.41; Định lý 05.22, 05.26, 05.30, 05.33; Ví dụ 05.24, 05.25; Nhận xét 05.42. Ghi chú Bài 01 (Định nghĩa 01.22; Định lý 01.31; Hệ quả 01.27, 01.34) và Bài 04 (Định nghĩa 04.17; Bổ đề 04.18, 04.20) là tiên quyết trực tiếp.

Mọi mệnh đề, bổ đề, định lý và hệ quả của chương đều có chứng minh trong chương. Các định lý phát biểu lại từ Bài 05b và 05c được chứng minh lại ngắn gọn, với cùng hằng số như chứng minh gốc. Mọi số liệu của các ví dụ được tính lại từ công thức đã nêu bằng phân số chính xác hoặc đệ quy kỳ vọng; không có mô phỏng ngẫu nhiên.
