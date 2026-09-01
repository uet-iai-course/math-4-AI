# Bài 06 — Tối ưu để huấn luyện mô hình học sâu II

Bài 05 đã xây dựng gradient lô nhỏ, SGD, momentum, Nesterov và khởi tạo tham số. Ghi chú này dùng các kết quả đó làm đầu vào để xử lý ba quyết định mới: co giãn bước theo từng tọa độ, khai thác độ cong trong giới hạn bộ nhớ và thay đổi biểu diễn hoặc tuyến huấn luyện.

Ký hiệu chung là $\theta_t,g_t\in\mathbb R^d$ cho tham số và gradient ở vòng $t$. Tích $\odot$, bình phương, căn và phép chia trong các bộ tối ưu thích nghi đều được hiểu theo phần tử. Khi xét mô hình bậc hai, $g=\nabla F(\theta)$ là gradient của mục tiêu tại một điểm cố định và $H=\nabla^2F(\theta)$ là Hessian; ký hiệu này được tách khỏi gradient lô nhiễu.

Nguồn chính là Goodfellow, Bengio và Courville (2016), Chương 8, §§8.5–8.7. Các công thức chuyên biệt được đối chiếu với Duchi, Hazan và Singer (2011), Hinton (2012), Kingma và Ba (2015), Martens (2010), Nocedal và Wright (2006), Ioffe và Szegedy (2015), Polyak và Juditsky (1992), cùng Bengio và cộng sự (2007, 2009). Bài 07 sẽ chuyển sang quy hoạch tuyến tính và quy hoạch động; ghi chú này không mở rộng sang hình học đa diện hoặc phương trình Bellman.

## A. Từ bước vô hướng đến co giãn theo tọa độ

Phần này tiếp nhận gradient lô và quy tắc cập nhật từ Bài 05 mà không định nghĩa lại SGD hay momentum. Mục tiêu là nhận ra giới hạn của một tốc độ học chung và xây dựng ngôn ngữ dùng cho ba bộ tối ưu thích nghi.

### 1. Khung chung của bước thích nghi theo tọa độ

**Mục tiêu đọc hiểu.** Người đọc viết được một bước co giãn theo tọa độ dưới dạng ma trận đường chéo, kiểm tra được kích thước và phân biệt phép co giãn này với việc dùng Hessian đầy đủ.

**Định nghĩa và giả thiết.** Cho tham số và gradient tại vòng $t$ là

$$
\theta_t,g_t\in\mathbb R^d.
$$

Một lớp cập nhật thích nghi theo tọa độ có dạng

$$
\theta_t
=\theta_{t-1}-\eta D_tg_t,
\qquad
D_t=\operatorname{diag}\!\left(
\frac{1}{\sqrt{a_t}+\epsilon}
\right),
$$

trong đó $\eta>0$, $\epsilon>0$, $a_t\in\mathbb R_{\ge0}^d$, và căn cùng phép chia được thực hiện theo từng thành phần. Vì $D_t\in\mathbb R^{d\times d}$ là ma trận đường chéo nên cập nhật chỉ thay thang của từng tọa độ. Nó chưa mô hình hóa trực tiếp tương tác giữa hai tọa độ khác nhau.

**Trực quan.** Nếu lịch sử gradient ở tọa độ $j$ có bình phương lớn, phần tử tương ứng của $D_t$ nhỏ và bước theo tọa độ đó bị co lại. Nếu lịch sử bình phương nhỏ, cùng một gradient hiện tại tạo ra bước tương đối dài hơn.

![Gradient được co ngắn khác nhau theo lịch sử bình phương của từng tọa độ.](img/lec-06/adaptive-scaling.svg)

**Ví dụ tính được.** Lấy

$$
g_1=(2,1)^T,
\qquad
a_1=(4,1)^T,
\qquad
\eta=0{,}1,
\qquad
\epsilon=10^{-8}.
$$

Khi $\theta_0=(0,0)^T$,

$$
\theta_1
=-0{,}1
\left(
\frac{2}{2+10^{-8}},
\frac{1}{1+10^{-8}}
\right)^T
\approx(-0{,}1,-0{,}1)^T.
$$

Hai thành phần gradient khác nhau nhưng sau co giãn lại tạo ra hai độ dời gần bằng nhau vì $a_1$ mang đúng thang bình phương của $g_1$. Kết quả này không đúng cho mọi lựa chọn $a_t$.

**Ý nghĩa và ứng dụng trong AI.** Khung $D_t$ cho phép đọc AdaGrad, RMSProp và Adam như ba cách khác nhau để xây dựng trạng thái lịch sử. Cách viết này cũng cho biết checkpoint phải lưu thêm những véc-tơ nào ngoài $\theta_t$.

**Điểm dễ nhầm.** $\epsilon$ bảo vệ phép chia, không thay vai trò của tốc độ học $\eta$. Một ma trận đường chéo không quay hướng theo các tương tác chéo như Hessian đầy đủ. Ký hiệu $a_t$ ở đây là tên chung; mỗi thuật toán sau sẽ dùng một trạng thái riêng.

**Câu hỏi kiểm tra.** Giữ $g_1=(2,1)^T$ nhưng đổi $a_1$ thành $(4,9)^T$. Bỏ qua $\epsilon$ chỉ trong phép tính gần đúng, hãy tính $D_1g_1$ và cho biết tọa độ nào bị co mạnh hơn.

## B. Ba bộ tối ưu thích nghi

Ba chủ đề trong mạch này dùng chung dữ kiện

$$
\theta_0=(0,0)^T,
\qquad
g_1=(2,1)^T,
\qquad
g_2=(0,3)^T,
$$

với $\eta=0{,}1$ và $\epsilon=10^{-8}$. Vết gradient được cho trước chỉ dùng để so sánh trạng thái; nó không chứng minh ba thuật toán đang tối ưu cùng một hàm cố định.

### 2. AdaGrad và bộ nhớ không quên

**Mục tiêu đọc hiểu.** Người đọc tính được hai vòng AdaGrad, giải thích được vì sao tốc độ học hiệu dụng không tăng và nhận ra trường hợp tổng lịch sử làm bước tắt sớm.

**Định nghĩa và giả thiết.** AdaGrad khởi tạo $r_0=0\in\mathbb R^d$ và cập nhật

$$
r_t=r_{t-1}+g_t\odot g_t,
$$

$$
\theta_t
=\theta_{t-1}
-\eta\frac{g_t}{\sqrt{r_t}+\epsilon}.
$$

Mọi phép toán ở phân số đều theo từng thành phần. Vì $g_t\odot g_t\ge0$, ta có $r_t\ge r_{t-1}$ theo từng thành phần. Do đó, nếu $\eta$ giữ cố định thì tốc độ học hiệu dụng $\eta/(\sqrt{r_{t,j}}+\epsilon)$ không tăng theo $t$.

**Trực quan.** AdaGrad giữ toàn bộ bình phương gradient từ vòng đầu. Mỗi quan sát mới chỉ có thể làm cột tích lũy cao hơn hoặc giữ nguyên.

![AdaGrad cộng toàn bộ lịch sử, RMSProp quên dần, còn Adam giữ riêng mômen bậc nhất và bậc hai.](img/lec-06/adaptive-optimizers-state.svg)

**Ví dụ tính được.** Sau vòng đầu,

$$
r_1=(4,1)^T,
\qquad
\theta_1\approx(-0{,}1,-0{,}1)^T.
$$

Sau vòng hai,

$$
r_2=(4,1)^T+(0,9)^T=(4,10)^T.
$$

Tọa độ thứ nhất không đổi vì $g_{2,1}=0$. Tọa độ thứ hai được cập nhật thêm

$$
-0{,}1\frac{3}{\sqrt{10}+10^{-8}}
\approx-0{,}0949.
$$

Vì vậy

$$
\theta_2\approx(-0{,}1000,-0{,}1949)^T.
$$

**Ý nghĩa và ứng dụng trong AI.** AdaGrad thường hữu ích khi gradient thưa: một tọa độ ít xuất hiện chưa tích lũy mẫu số lớn nên vẫn nhận được bước tương đối đáng kể. Mỗi vòng cần thêm $O(d)$ thời gian và $O(d)$ bộ nhớ cho $r_t$.

**Điểm dễ nhầm.** “Không quên” không có nghĩa thuật toán luôn hội tụ tốt trên mạng sâu phi lồi. Khi $r_t$ đã rất lớn, gradient mới dù có ích vẫn bị chia cho mẫu số lớn. Nếu $g_{t,j}=0$ thì $r_{t,j}$ giữ nguyên chứ không giảm.

**Câu hỏi kiểm tra.** Giả sử từ vòng 3 trở đi $g_{t,2}=1$. Viết $r_{t,2}$ theo $t$ và giải thích vì sao bước hiệu dụng ở tọa độ 2 tiến dần về $0$ khi $\eta$ cố định.

### 3. RMSProp và trung bình mũ bậc hai

**Mục tiêu đọc hiểu.** Người đọc tính được trạng thái RMSProp, giải thích được vai trò của hệ số quên $\rho$ và phân biệt trạng thái RMSProp với vận tốc momentum.

**Định nghĩa và giả thiết.** Với $0\le\rho<1$, RMSProp trong quy ước của deck khởi tạo $v_0^{\mathrm{RMS}}=0$ và dùng

$$
v_t^{\mathrm{RMS}}
=\rho v_{t-1}^{\mathrm{RMS}}
+(1-\rho)(g_t\odot g_t),
$$

$$
\theta_t
=\theta_{t-1}
-\eta\frac{g_t}{\sqrt{v_t^{\mathrm{RMS}}}+\epsilon}.
$$

Khai triển truy hồi cho thấy bình phương gradient ở $k$ vòng trước mang trọng số tỉ lệ với $(1-\rho)\rho^k$. Giá trị $\rho$ gần $1$ tạo bộ nhớ dài hơn.

**Trực quan.** Trong hình dòng thời gian ở Chủ đề 2, hàng RMSProp có các cột lịch sử nhạt dần theo khoảng cách tới hiện tại. Khác với AdaGrad, ảnh hưởng của một gradient cũ có thể giảm theo thời gian.

**Ví dụ tính được.** Chọn $\rho=0{,}9$. Ở vòng đầu,

$$
v_1^{\mathrm{RMS}}
=0{,}1(4,1)^T
=(0{,}4,0{,}1)^T,
$$

nên

$$
\theta_1
\approx(-0{,}3162,-0{,}3162)^T.
$$

Ở vòng hai,

$$
v_2^{\mathrm{RMS}}
=0{,}9(0{,}4,0{,}1)^T
+0{,}1(0,9)^T
=(0{,}36,0{,}99)^T.
$$

Do $g_{2,1}=0$ và

$$
0{,}1\frac{3}{\sqrt{0{,}99}+10^{-8}}
\approx0{,}3015,
$$

ta được

$$
\theta_2\approx(-0{,}3162,-0{,}6177)^T.
$$

**Ý nghĩa và ứng dụng trong AI.** Trung bình mũ cho phép thang bước phản ứng với vùng hiện tại của quỹ đạo, nhất là khi thống kê gradient thay đổi trong quá trình huấn luyện.

**Điểm dễ nhầm.** $v_t^{\mathrm{RMS}}$ là trung bình bình phương gradient, không phải véc-tơ vận tốc trong momentum. Phiên bản RMSProp đang dùng không có bước hiệu chỉnh độ lệch do khởi tạo bằng $0$. Không có một giá trị $\rho$ tốt cho mọi bài toán.

**Câu hỏi kiểm tra.** Với $\rho=0{,}9$, hãy tính hệ số trực tiếp của $g_{t-2}\odot g_{t-2}$ trong $v_t^{\mathrm{RMS}}$. Hệ số này thay đổi thế nào nếu $\rho=0{,}5$?

### 4. Adam, hai mômen và hiệu chỉnh độ lệch

**Mục tiêu đọc hiểu.** Người đọc tính được hai mômen Adam, áp dụng đúng hiệu chỉnh độ lệch ở vòng đầu và xác định đủ trạng thái cần lưu để tiếp tục một lần huấn luyện.

**Định nghĩa và giả thiết.** Với $0\le\beta_1,\beta_2<1$, Adam khởi tạo

$$
m_0^{\mathrm{Adam}}=0,
\qquad
v_0^{\mathrm{Adam}}=0,
$$

rồi cập nhật, với chỉ số đầu tiên là $t=1$,

$$
m_t^{\mathrm{Adam}}
=\beta_1m_{t-1}^{\mathrm{Adam}}
+(1-\beta_1)g_t,
$$

$$
v_t^{\mathrm{Adam}}
=\beta_2v_{t-1}^{\mathrm{Adam}}
+(1-\beta_2)(g_t\odot g_t).
$$

Hai trạng thái được hiệu chỉnh bằng

$$
\widehat m_t^{\mathrm{Adam}}
=\frac{m_t^{\mathrm{Adam}}}{1-\beta_1^t},
\qquad
\widehat v_t^{\mathrm{Adam}}
=\frac{v_t^{\mathrm{Adam}}}{1-\beta_2^t},
$$

và tham số được cập nhật theo

$$
\theta_t
=\theta_{t-1}
-\eta
\frac{\widehat m_t^{\mathrm{Adam}}}
{\sqrt{\widehat v_t^{\mathrm{Adam}}}+\epsilon}.
$$

**Trực quan.** Adam dùng hai hàng của dòng thời gian: $m_t$ giữ hướng trung bình có dấu, còn $v_t$ giữ thang bình phương không âm. Hai mẫu số $1-\beta_1^t$ và $1-\beta_2^t$ bù phần lịch sử chưa tồn tại ở đầu quỹ đạo.

**Ví dụ tính được.** Chọn $\beta_1=0{,}9$ và $\beta_2=0{,}999$. Ở vòng đầu,

$$
m_1^{\mathrm{Adam}}=(0{,}2,0{,}1)^T,
\qquad
v_1^{\mathrm{Adam}}=(0{,}004,0{,}001)^T.
$$

Sau hiệu chỉnh,

$$
\widehat m_1^{\mathrm{Adam}}=(2,1)^T,
\qquad
\widehat v_1^{\mathrm{Adam}}=(4,1)^T,
$$

nên $\theta_1\approx(-0{,}1,-0{,}1)^T$. Ở vòng hai,

$$
m_2^{\mathrm{Adam}}=(0{,}18,0{,}39)^T,
$$

$$
v_2^{\mathrm{Adam}}=(0{,}003996,0{,}009999)^T.
$$

Vì $1-\beta_1^2=0{,}19$ và $1-\beta_2^2=0{,}001999$,

$$
\widehat m_2^{\mathrm{Adam}}
\approx(0{,}9474,2{,}0526)^T,
$$

$$
\widehat v_2^{\mathrm{Adam}}
\approx(1{,}9990,5{,}0020)^T.
$$

Do đó

$$
\theta_2\approx(-0{,}1670,-0{,}1918)^T.
$$

**Ý nghĩa và ứng dụng trong AI.** Adam kết hợp một hướng đã làm trơn với một thang thích nghi theo tọa độ. Một checkpoint có thể tiếp tục đúng quỹ đạo phải giữ ít nhất $\theta_t$, $m_t^{\mathrm{Adam}}$, $v_t^{\mathrm{Adam}}$ và chỉ số $t$, ngoài các trạng thái khác của hệ thống huấn luyện.

**Điểm dễ nhầm.** Hiệu chỉnh độ lệch không phải điều chuẩn. $v_t^{\mathrm{Adam}}$ không phải $v_t^{\mathrm{RMS}}$ và cũng không phải vận tốc momentum. Công thức $\sqrt{\widehat v_t}+\epsilon$ đang dùng không được tự ý đổi thành $\sqrt{\widehat v_t+\epsilon}$. Adam không bảo đảm tìm cực tiểu toàn cục hay luôn cho khả năng khái quát hóa tốt nhất.

**Câu hỏi kiểm tra.** Ở vòng đầu, nếu bỏ hiệu chỉnh $1-\beta_2^t$, mẫu số chứa $\sqrt{v_1}$ nhỏ hơn $\sqrt{\widehat v_1}$ bao nhiêu lần khi $\epsilon$ không đáng kể?

#### Mệnh đề: kỳ vọng của hai mômen Adam dưới thống kê dừng

Giả sử $g_1,g_2,\ldots$ có kỳ vọng không đổi $\mathbb E[g_t]=\mu$ và mômen bậc hai theo thành phần không đổi $\mathbb E[g_t\odot g_t]=\nu<\infty$. Với $m_0=v_0=0$,

$$
\mathbb E[m_t]=(1-\beta_1^t)\mu,
\qquad
\mathbb E[v_t]=(1-\beta_2^t)\nu.
$$

Vì vậy $\widehat m_t=m_t/(1-\beta_1^t)$ và $\widehat v_t=v_t/(1-\beta_2^t)$ có đúng kỳ vọng $\mu$ và $\nu$ dưới các giả thiết trên. Phần chứng minh cuối bài khai triển truy hồi để chỉ ra chính xác nguồn gốc của hai hệ số hiệu chỉnh.

Các phương pháp thích nghi vừa xét chỉ thay thang theo tọa độ. Khi các tọa độ tương tác mạnh, ta cần cân nhắc thông tin độ cong đầy đủ hơn cùng chi phí tính toán của nó.

## C. Độ cong trong ngân sách tính toán

Ba công cụ dưới đây trả lời cùng một câu hỏi: cần bao nhiêu thông tin độ cong để tạo hướng tìm kiếm có ích mà vẫn nằm trong ngân sách?

### 5. Mô hình bậc hai và Newton có giảm chấn

**Mục tiêu đọc hiểu.** Người đọc suy ra được hệ Newton từ mô hình bậc hai, kiểm tra được một hướng giảm và giải thích được vì sao Hessian khả nghịch vẫn chưa đủ trong bài toán phi lồi.

**Định nghĩa và giả thiết.** Cho $F:\mathbb R^d\to\mathbb R$ khả vi hai lần trong lân cận của $\theta_t$. Đặt

$$
g_t=\nabla F(\theta_t),
\qquad
H_t=\nabla^2F(\theta_t).
$$

Mô hình bậc hai theo độ dời $p\in\mathbb R^d$ là

$$
q_t(p)
=F(\theta_t)+g_t^Tp+\frac12p^TH_tp.
$$

Nếu $H_t\succ0$, điểm cực tiểu duy nhất của $q_t$ giải

$$
H_tp=-g_t.
$$

Trong bài toán phi lồi, ta có thể dùng ma trận giảm chấn

$$
B_t=H_t+\lambda_tI
$$

và giải $B_tp=-g_t$, với $\lambda_t$ được chọn để $B_t\succ0$ hoặc ít nhất để hướng thu được vượt qua kiểm tra $g_t^Tp<0$. Sau đó vẫn cần chọn độ dài bước, chẳng hạn bằng tìm kiếm đường.

**Trực quan.** Gradient chỉ cho độ dốc tại một điểm. Hessian thay quả cầu đo độ dài bằng một elip có thể xoay, nên các tọa độ được liên kết. Giảm chấn dịch các trị riêng của Hessian sang phải; khi $\lambda$ lớn, hướng tiến gần hướng gradient âm đã co ngắn.

![Newton, Hessian-free kết hợp gradient liên hợp, và BFGS hoặc L-BFGS dùng thông tin độ cong với chi phí khác nhau.](img/lec-06/curvature-toolchain.svg)

**Ví dụ tính được.** Xét

$$
g=(1,2)^T,
\qquad
H=\operatorname{diag}(-1,4).
$$

Newton không giảm chấn giải $Hp=-g$ và cho

$$
p=(1,-1/2)^T,
\qquad
g^Tp=1-1=0.
$$

Hướng này không giảm chặt. Với $\lambda=2$,

$$
B=H+2I=\operatorname{diag}(1,6)\succ0,
$$

$$
p=-B^{-1}g=(-1,-1/3)^T,
\qquad
g^Tp=-1-2/3=-5/3<0.
$$

**Ý nghĩa và ứng dụng trong AI.** Newton dùng tương tác độ cong để chọn hướng thay vì chỉ co từng tọa độ. Tuy nhiên, Hessian đặc cần $O(d^2)$ bộ nhớ và phép giải đặc có thể cần tới $O(d^3)$ thời gian, nên không phù hợp trực tiếp với mạng có hàng triệu tham số.

**Điểm dễ nhầm.** Hessian khả nghịch có thể bất định. Không cần và không nên tạo $H^{-1}$ tường minh để giải hệ. Điều kiện $g^Tp<0$ xác nhận hướng giảm cục bộ khi $g\ne0$, nhưng chưa chọn được độ dài bước an toàn. Công thức $p\approx-g/\lambda$ chỉ là xấp xỉ khi $\lambda$ đủ lớn so với thang của $H$.

**Câu hỏi kiểm tra.** Với $B\succ0$, $g\ne0$ và $Bp=-g$, hãy biến đổi $g^Tp$ theo $p^TBp$ và xác định dấu của nó.

#### Mệnh đề: hệ giảm chấn dương xác định cho hướng giảm

Nếu $B\in\mathbb R^{d\times d}$ đối xứng dương xác định, $g\ne0$ và $Bp=-g$, thì $p$ tồn tại duy nhất, $p\ne0$ và

$$
g^Tp=-p^TBp<0.
$$

Phần chứng minh cuối bài khóa dấu của $g^Tp$ bằng tính dương xác định của $B$.

### 6. Tối ưu không tạo Hessian và gradient liên hợp

**Mục tiêu đọc hiểu.** Người đọc mô tả được vai trò của tích Hessian–véc-tơ, thực hiện được hai vòng gradient liên hợp trên hệ cấp hai và nêu đúng điều kiện của vòng lặp trong.

**Định nghĩa và giả thiết.** Tối ưu không tạo Hessian (Hessian-free, HF) không lưu Hessian dưới dạng ma trận. Thay vào đó, thuật toán cung cấp một toán tử

$$
v\longmapsto B_tv,
$$

thường được tính bằng vi phân tự động. Một lựa chọn an toàn cho vòng gradient liên hợp (conjugate gradient, CG) là

$$
B_t=G_t+\lambda_tI,
\qquad
G_t\succeq0,
\qquad
\lambda_t>0,
$$

suy ra $B_t\succ0$. CG giải gần đúng

$$
B_tp=-g_t
$$

chỉ bằng các tích $B_tv$. Với $p_0=0$, đặt $r_0=-g_t-B_tp_0=-g_t$ và $d_0=r_0$. Một vòng chuẩn dùng

$$
\alpha_k=\frac{r_k^Tr_k}{d_k^TB_td_k},
$$

$$
p_{k+1}=p_k+\alpha_kd_k,
\qquad
r_{k+1}=r_k-\alpha_kB_td_k,
$$

$$
\beta_k=\frac{r_{k+1}^Tr_{k+1}}{r_k^Tr_k},
\qquad
d_{k+1}=r_{k+1}+\beta_kd_k.
$$

**Trực quan.** Gradient âm dốc nhất theo hình học Euclid, còn các hướng CG được chọn liên hợp theo $B$: hướng mới không làm hỏng phần nghiệm đã xử lý theo hướng trước.

Hình bản đồ công cụ độ cong ở Chủ đề 5 đặt HF–CG giữa Newton đặc và phương pháp tựa Newton. Trong CG, quan hệ cần kiểm là $d_i^TBd_j=0$ với $i\ne j$, không phải trực giao Euclid.

**Ví dụ tính được.** Xét

$$
B=\begin{pmatrix}4&1\\1&2\end{pmatrix}\succ0,
\qquad
b=-g=(1,0)^T,
\qquad
p_0=0.
$$

Ta có $r_0=d_0=(1,0)^T$. Vòng đầu cho

$$
\alpha_0=\frac{1}{4},
\qquad
p_1=(1/4,0)^T,
\qquad
r_1=(0,-1/4)^T.
$$

Tiếp theo,

$$
\beta_0=\frac{1/16}{1}=\frac1{16},
\qquad
d_1=(1/16,-1/4)^T.
$$

Vì

$$
Bd_1=(0,-7/16)^T,
$$

nên

$$
\alpha_1
=\frac{1/16}{7/64}
=\frac47.
$$

Do đó

$$
p_2
=p_1+\frac47d_1
=(2/7,-1/7)^T,
$$

và kiểm trực tiếp cho $Bp_2=b$.

**Ý nghĩa và ứng dụng trong AI.** Mỗi vòng CG chủ yếu cần một tích $B_tv$ và một số phép toán véc-tơ, nên bộ nhớ không tăng thành $O(d^2)$. HF có ích khi tích toán tử đủ rẻ và thông tin độ cong cải thiện đáng kể hướng tìm kiếm.

**Điểm dễ nhầm.** CG chuẩn yêu cầu hệ SPD. Hessian của mạng sâu có thể bất định, nên không được đưa trực tiếp vào CG rồi mặc nhiên dùng bảo đảm SPD. Dừng CG sớm chỉ cho nghiệm gần đúng; vòng ngoài còn phải kiểm độ giảm thực tế, phần dư hoặc điều chỉnh giảm chấn.

**Câu hỏi kiểm tra.** Với dữ kiện trên, hãy kiểm $d_0^TBd_1=0$. Quan hệ này khác gì với $d_0^Td_1=0$?

#### Định lý: kết thúc hữu hạn của CG trong số học chính xác

Cho $B\in\mathbb R^{d\times d}$ đối xứng dương xác định, $b\in\mathbb R^d$ và điểm đầu $p_0\in\mathbb R^d$ tùy ý. Đặt $r_0=b-Bp_0$. Nếu $r_0=0$ thì $p_0$ đã là nghiệm. Nếu $r_0\ne0$, trong số học chính xác, các hướng CG sinh ra trước khi kết thúc đều khác $0$, đôi một liên hợp theo $B$, và CG tìm được nghiệm duy nhất của $Bp=b$ sau không quá $d$ vòng.

Phần chứng minh cuối bài dùng tính độc lập tuyến tính của các hướng liên hợp và giải thích vì sao sai số dấu phẩy động làm mất kết luận hữu hạn chính xác.

### 7. BFGS và L-BFGS

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được điều kiện cặp cong, tính được một cập nhật BFGS cho nghịch đảo Hessian gần đúng và so sánh bộ nhớ của BFGS với L-BFGS.

**Định nghĩa và giả thiết.** Đặt

$$
s_t=\theta_{t+1}-\theta_t,
\qquad
y_t=g_{t+1}-g_t,
\qquad
\rho_t=\frac{1}{y_t^Ts_t}.
$$

Giả sử $y_t^Ts_t>0$. Nếu $M_t$ xấp xỉ nghịch đảo Hessian, cập nhật BFGS là

$$
M_{t+1}
=(I-\rho_ts_ty_t^T)
M_t
(I-\rho_ty_ts_t^T)
+\rho_ts_ts_t^T.
$$

BFGS lưu $M_t\in\mathbb R^{d\times d}$, cần $O(d^2)$ bộ nhớ. L-BFGS không lưu ma trận này; nó giữ $m$ cặp gần nhất $(s_i,y_i)$ và áp dụng nghịch đảo gần đúng bằng hai vòng lặp, cần $O(md)$ bộ nhớ.

**Trực quan.** Cặp $(s_t,y_t)$ cung cấp một phép đo độ cong dọc theo độ dời vừa đi. Điều kiện secant yêu cầu xấp xỉ mới ánh xạ $y_t$ về $s_t$. Điều kiện $y_t^Ts_t>0$ giúp ellipsoid do $M_{t+1}$ xác định không bị lật thành dạng bất định.

Hình bản đồ công cụ độ cong ở Chủ đề 5 đặt BFGS và L-BFGS ở nhánh học xấp xỉ nghịch đảo từ các cặp cong $(s_t,y_t)$, thay vì tạo Hessian hoặc chỉ gọi tích Hessian–véc-tơ.

**Ví dụ tính được.** Lấy

$$
s=(1,0)^T,
\qquad
y=(2,1)^T,
\qquad
M_0=I.
$$

Ta có $y^Ts=2>0$ và $\rho=1/2$. Thay vào công thức cho

$$
M_1=
\begin{pmatrix}
0{,}75&-0{,}5\\
-0{,}5&1
\end{pmatrix}.
$$

Ma trận này đối xứng, có phần tử đầu $0{,}75>0$ và định thức $0{,}5>0$, nên $M_1\succ0$. Với gradient mới $g=(1,2)^T$,

$$
p=-M_1g=(0{,}25,-1{,}5)^T,
$$

$$
g^Tp=0{,}25-3=-2{,}75<0.
$$

**Ý nghĩa và ứng dụng trong AI.** BFGS học độ cong từ chênh lệch tham số và gradient thay vì tính Hessian. L-BFGS phù hợp hơn khi $d$ lớn nhưng gradient đủ ổn định và việc tìm kiếm đường đáng tin cậy.

**Điểm dễ nhầm.** $M_t$ ở đây xấp xỉ nghịch đảo Hessian, không phải Hessian. Nếu $g_t$ và $g_{t+1}$ được tính từ hai lô không tương thích, $y_t$ có thể phản ánh nhiễu thay vì độ cong. Điều kiện $y_t^Ts_t>0$ không nên bị bỏ qua. L-BFGS không tạo rồi nén một ma trận $d\times d$; nó áp dụng xấp xỉ từ các cặp đã lưu.

**Câu hỏi kiểm tra.** Với $d=10^6$ và $m=10$, BFGS lưu bậc bao nhiêu số thực, còn L-BFGS lưu bậc bao nhiêu? Không cần tính bộ nhớ phụ của triển khai.

#### Định lý: BFGS bảo toàn tính dương xác định

Giả sử $M_t\succ0$, $s_t\ne0$ và $y_t^Ts_t>0$. Khi đó cập nhật BFGS ở trên cho $M_{t+1}\succ0$ và thỏa điều kiện secant

$$
M_{t+1}y_t=s_t.
$$

Phần chứng minh cuối bài kiểm trực tiếp điều kiện secant và viết dạng toàn phương của cập nhật để bảo toàn tính dương xác định.

Ba công cụ độ cong trên thay cách tạo hướng bước. Nhóm tiếp theo giữ bộ tối ưu nhưng can thiệp cục bộ vào biểu diễn, khối biến được cập nhật hoặc điểm đại diện của quỹ đạo.

## D. Thay cấu trúc cục bộ của quá trình tối ưu

### 8. Chuẩn hóa theo lô: đổi tham số hóa của biểu diễn

**Mục tiêu đọc hiểu.** Người đọc tính được thống kê chuẩn hóa của một đặc trưng trên một lô, phân biệt chế độ huấn luyện với suy diễn và giải thích được chuẩn hóa theo lô tác động lên biểu diễn chứ không thay thế bộ tối ưu.

**Định nghĩa và giả thiết.** Xét ma trận kích hoạt trước chuẩn hóa $H\in\mathbb R^{m\times d}$, trong đó $m$ hàng là các mẫu trong lô và $d$ cột là các đặc trưng. Với từng đặc trưng $j$, đặt

$$
\mu_j=\frac1m\sum_{i=1}^m H_{ij},
\qquad
\sigma_j^2=\frac1m\sum_{i=1}^m(H_{ij}-\mu_j)^2.
$$

Chuẩn hóa theo lô tạo

$$
\widehat H_{ij}=\frac{H_{ij}-\mu_j}{\sqrt{\sigma_j^2+\epsilon}},
\qquad
Y_{ij}=\gamma_j\widehat H_{ij}+\beta_j,
$$

với $\epsilon>0$ và $\gamma,\beta\in\mathbb R^d$ là các tham số học được. Phương sai ở đây dùng mẫu số $m$, đúng với phép biến đổi trong thuật toán, không phải ước lượng phương sai không chệch dùng mẫu số $m-1$.

Khi huấn luyện, $\mu_j$ và $\sigma_j^2$ được tính từ lô hiện tại. Khi suy diễn một mẫu hoặc một lô có cấu trúc khác, mô hình thường dùng trung bình và phương sai chạy đã tích lũy trong huấn luyện. Hai chế độ phải được lưu cùng trạng thái mô hình.

![Một đặc trưng được định tâm, co giãn rồi biến đổi affine bằng gamma và beta.](img/lec-06/batch-normalization.svg)

**Trực quan.** Phép trừ $\mu_j$ đưa tâm của đặc trưng về $0$; phép chia cho $\sqrt{\sigma_j^2+\epsilon}$ kiểm soát thang; $\gamma_j$ và $\beta_j$ trả lại cho lớp khả năng học thang và vị trí phù hợp. Phép tham số hóa lại khả vi này thay tọa độ mà các lớp sau nhìn thấy, trong khi AdaGrad, Adam hoặc Newton thay quy tắc đi trong không gian tham số.

**Ví dụ tính được.** Xét một đặc trưng trên lô hai mẫu

$$
h=(1,3)^T,\qquad \gamma=2,\qquad \beta=0{,}5,\qquad \epsilon=0{,}01.
$$

Ta có

$$
\mu=2,\qquad
\sigma^2=\frac{(1-2)^2+(3-2)^2}{2}=1.
$$

Vì $\sqrt{1{,}01}\approx1{,}0050$,

$$
\widehat h\approx(-0{,}9950,0{,}9950)^T,
\qquad
y=2\widehat h+0{,}5\approx(-1{,}490,2{,}490)^T.
$$

Trung bình của $\widehat h$ đúng bằng $0$, nhưng phương sai theo lô là

$$
\frac{1}{1+0{,}01}\approx0{,}9901,
$$

không đúng bằng $1$. Chỉ trong giới hạn $\epsilon\to0$ với $\sigma^2>0$ mới thu được $\widehat h=(-1,1)^T$ và $y=(-1{,}5,2{,}5)^T$.

**Ý nghĩa và ứng dụng trong AI.** Chuẩn hóa theo lô có thể làm thang kích hoạt và gradient dễ quản lý hơn, cho phép dùng cấu hình tối ưu ổn định hơn và đôi khi tạo nhiễu có tác dụng điều chuẩn từ thống kê lô. Trong mạng tích chập, thống kê thường còn được gộp theo vị trí không gian cho từng kênh. Hiệu quả phụ thuộc phép tham số hóa, cấu trúc lô và quy trình huấn luyện; “giảm dịch chuyển hiệp biến nội bộ” là cách giải thích lịch sử, không phải một cơ chế nhân quả duy nhất đã được chứng minh.

**Điểm dễ nhầm.** Chuẩn hóa theo lô không buộc đầu ra $Y$ có trung bình $0$ hay phương sai $1$, vì $\gamma$ và $\beta$ được học. Với $\epsilon>0$, ngay cả $\widehat H$ cũng có phương sai $\sigma^2/(\sigma^2+\epsilon)$ thay vì đúng bằng $1$. Không dùng thống kê của một lô suy diễn đơn lẻ thay cho thống kê chạy nếu mô hình được huấn luyện theo quy ước chuẩn. Ký hiệu $\beta$ tại đây là độ dịch của lớp chuẩn hóa, không phải $\beta_1,\beta_2$ của Adam.

**Câu hỏi kiểm tra.** Nếu mọi giá trị trong một cột của $H$ đều bằng nhau thì $\sigma_j^2$ bằng bao nhiêu, $\widehat H_{ij}$ bằng bao nhiêu, và vì sao $\epsilon>0$ là cần thiết? Trong ví dụ trên, kết quả nào thay đổi nếu chuyển sang chế độ suy diễn với trung bình chạy $1{,}8$ và phương sai chạy $1{,}2$?

### 9. Hạ theo tọa độ và hạ theo khối

**Mục tiêu đọc hiểu.** Người đọc mô tả được một vòng hạ theo tọa độ hoặc theo khối, tính được nghiệm chính xác của bài toán con và nhận biết khi ghép mạnh giữa các biến làm phương pháp tiến chậm.

**Định nghĩa và giả thiết.** Chia $x\in\mathbb R^d$ thành $q$ khối $x=(x_{S_1},\ldots,x_{S_q})$. Ở vòng $t$, chọn một khối $S_t$, giữ các khối còn lại cố định và thực hiện một trong hai dạng. Dạng tối ưu chính xác dưới đây giả sử tập nghiệm của bài toán con không rỗng:

$$
x_{S_t}^{t+1}\in\arg\min_u
F(x_{-S_t}^t,u),
$$

hoặc một bước gradient theo khối

$$
x_{S_t}^{t+1}=x_{S_t}^t-\eta_t\nabla_{S_t}F(x^t),
\qquad
x_{-S_t}^{t+1}=x_{-S_t}^t.
$$

Hạ theo tọa độ là trường hợp mỗi $S_t$ chứa một tọa độ. Quy tắc chọn có thể là tuần hoàn, ngẫu nhiên hoặc dựa trên mức vi phạm; phát biểu hội tụ phải khớp với quy tắc đó. Với bước gradient theo khối, một giả thiết hữu ích là gradient theo khối $S$ có hằng số Lipschitz $L_S>0$:

$$
\|\nabla_S F(x+U_Sh)-\nabla_SF(x)\|_2\le L_S\|h\|_2,
$$

trong đó $U_Sh$ chèn độ dời $h$ vào khối $S$ và giữ các khối khác bằng $0$.

**Trực quan.** Thay vì di chuyển đồng thời theo mọi hướng, thuật toán tối ưu một lát cắt song song với một trục hoặc một không gian con. Nếu đường mức gần song song với các trục, các lát cắt dẫn nhanh tới tâm. Nếu đường mức là một khe hẹp nghiêng, mỗi cập nhật chỉ đi ngang từ bờ này sang bờ kia và một chu kỳ tạo rất ít tiến bộ dọc khe.

![Quỹ đạo hạ theo tọa độ zíc-zắc trên đường mức ghép mạnh và trung bình Polyak nằm giữa các điểm dao động.](img/lec-06/coordinate-polyak-geometry.svg)

**Ví dụ tính được.** Xét

$$
F(x_1,x_2)=(x_1-x_2)^2+\alpha(x_1^2+x_2^2),
\qquad \alpha>0.
$$

Giữ $x_2=x_2^k$ và giải chính xác theo $x_1$:

$$
\frac{\partial F}{\partial x_1}=2(x_1-x_2^k)+2\alpha x_1=0
\quad\Longrightarrow\quad
x_1^{k+1}=\frac{x_2^k}{1+\alpha}.
$$

Sau đó giữ $x_1=x_1^{k+1}$ và giải theo $x_2$:

$$
x_2^{k+1}=\frac{x_1^{k+1}}{1+\alpha}
=\frac{x_2^k}{(1+\alpha)^2}.
$$

Với $\alpha=0{,}01$, một phép truyền từ tọa độ kia có hệ số

$$
\frac1{1{,}01}\approx0{,}9901,
$$

nhưng một chu kỳ đầy đủ cập nhật $x_1$ rồi $x_2$ co $x_2$ theo

$$
\frac1{1{,}01^2}\approx0{,}9803.
$$

Nghiệm duy nhất là $(0,0)$ vì Hessian của $F$ xác định dương khi $\alpha>0$. Ví dụ cho thấy tối ưu chính xác từng tọa độ vẫn có thể hội tụ chậm khi hai biến ghép mạnh.

**Ý nghĩa và ứng dụng trong AI.** Hạ theo khối phù hợp khi một nhóm tham số có bài toán con rẻ hoặc có nghiệm đóng: cập nhật luân phiên biểu diễn và đầu phân loại, tối ưu từng tầng trong một thủ tục tham lam, hoặc cập nhật các nhóm biến ẩn và tham số mô hình. Nó cũng là khuôn để đọc nhiều thuật toán luân phiên. Lợi ích phải được đo theo chi phí của một chu kỳ đầy đủ, không chỉ theo chi phí một cập nhật khối.

**Điểm dễ nhầm.** Tối ưu đúng một khối không có nghĩa là đã tối ưu toàn bộ $F$. Giảm mục tiêu sau mỗi bước không tự suy ra hội tụ tới cực tiểu toàn cục trong bài toán phi lồi. Hệ số $0{,}9901$ trong ví dụ là một phép truyền tọa độ, còn $0{,}9803$ mới là hệ số co của $x_2$ sau cả chu kỳ. Không áp dụng định lý cho quy tắc chọn ngẫu nhiên nếu chứng minh chỉ xét tuần hoàn.

**Câu hỏi kiểm tra.** Với $\alpha=1$ và $x_2^0=4$, hãy tính $x_1^1,x_2^1$ và giá trị $F$ trước, sau từng cập nhật khi $x_1^0=0$. Nếu chỉ báo “mất mát giảm sau một cập nhật $x_1$”, còn thiếu đại lượng nào để so sánh công bằng với một bước cập nhật toàn bộ véc-tơ?

### 10. Trung bình Polyak: đổi đầu ra của quỹ đạo

**Mục tiêu đọc hiểu.** Người đọc tính được trung bình các tham số, chứng minh bảo đảm Jensen trong trường hợp lồi và phân biệt trung bình Polyak với trung bình mũ hoặc một quy tắc cập nhật mới.

**Định nghĩa và giả thiết.** Cho dãy tham số $\theta_1,\ldots,\theta_t\in C$, trong đó $C$ là tập lồi. Trung bình đều là

$$
\widehat\theta_t=\frac1t\sum_{i=1}^t\theta_i.
$$

Trong thực hành có thể bỏ giai đoạn quá độ và lấy trung bình hậu kỳ

$$
\widehat\theta_{s:t}=\frac1{t-s+1}\sum_{i=s}^t\theta_i.
$$

Trung bình là đầu ra được tính từ quỹ đạo; bộ tối ưu gốc vẫn tạo từng $\theta_i$. Kết quả Jensen bên dưới chỉ cần $F$ lồi trên $C$. Các kết quả tiệm cận Polyak–Ruppert mạnh hơn còn cần những giả thiết riêng về xấp xỉ ngẫu nhiên, nghiệm, bước giảm dần và nhiễu.

**Trực quan.** Nếu các bước sau giai đoạn quá độ dao động quanh cùng một vùng tốt, độ lệch theo các hướng khác nhau có thể triệt nhau khi lấy trung bình. Trung bình không biết đâu là “vùng tốt”; vì vậy trộn các điểm thuộc những miền xa hoặc hai nghiệm tương đương qua đối xứng tham số có thể tạo một tham số trung gian kém.

Hình ở Chủ đề 9 đối chiếu hai cơ chế: hạ theo tọa độ thay cách tạo từng điểm của quỹ đạo, còn trung bình Polyak giữ nguyên các điểm rồi thay đầu ra bằng trọng tâm của chúng.

**Ví dụ tính được.** Cho

$$
\theta_1=(1,-1),\quad
\theta_2=(-1,1),\quad
\theta_3=(1,-1),\quad
\theta_4=(-1,1).
$$

Khi đó

$$
\widehat\theta_4
=\frac14(\theta_1+\theta_2+\theta_3+\theta_4)
=(0,0).
$$

Với hàm lồi $F(\theta)=\|\theta\|_2^2$, mỗi điểm có $F(\theta_i)=2$, còn

$$
F(\widehat\theta_4)=0
\le\frac14\sum_{i=1}^4F(\theta_i)=2.
$$

Ví dụ biểu diễn sự triệt dao động đối xứng, không phải bằng chứng rằng trung bình luôn cải thiện một mạng sâu phi lồi.

**Ý nghĩa và ứng dụng trong AI.** Trung bình hậu kỳ có thể tạo một bộ tham số ổn định hơn từ một lần chạy SGD nhiễu mà gần như không tăng chi phí gradient. Phép đo quyết định vẫn là mất mát hoặc thước đo trên tập xác thực đích. Nếu không muốn lưu mọi điểm, có thể cập nhật trực tuyến

$$
\widehat\theta_t=\widehat\theta_{t-1}+\frac1t(\theta_t-\widehat\theta_{t-1}).
$$

**Điểm dễ nhầm.** Trung bình đều không phải trung bình mũ: trọng số của mọi điểm trong cửa sổ bằng nhau. Bất đẳng thức Jensen cần tính lồi và chỉ so sánh giá trị tại trung bình với trung bình các giá trị, không buộc nó nhỏ hơn từng $F(\theta_i)$. Trong mạng có đối xứng hoán vị đơn vị ẩn, hai tham số biểu diễn cùng một hàm có thể có trung bình tham số biểu diễn một hàm khác.

**Câu hỏi kiểm tra.** Nếu chỉ lấy trung bình hậu kỳ của $\theta_3$ và $\theta_4$ trong ví dụ thì kết quả là gì? Hãy cho một hàm không lồi một biến và hai điểm mà giá trị tại trung bình lớn hơn trung bình hai giá trị.

Các can thiệp cục bộ vẫn tối ưu cùng một bài toán từ điểm đầu đã cho. Khi điểm đầu hoặc chính tuyến mục tiêu là nút thắt, ta phải thay một đối tượng ở cấp cao hơn.

## E. Thay điểm đầu và tuyến bài toán

### 11. Tiền huấn luyện có giám sát

**Mục tiêu đọc hiểu.** Người đọc thiết kế được tuyến tiền huấn luyện–tinh chỉnh, xác định rõ tham số được chuyển và phép đo trên nhiệm vụ đích, đồng thời nhận biết nguy cơ chuyển giao âm.

**Định nghĩa và giả thiết.** Cho nhiệm vụ nguồn có dữ liệu gắn nhãn $D_S$, mục tiêu $J_S(\theta_S)$ và nhiệm vụ đích có dữ liệu $D_T$, mục tiêu $J_T(\theta_T)$. Với độ chính xác tối ưu nguồn $\delta_S\ge0$, tiền huấn luyện có giám sát trước hết tìm $\widetilde\theta_S$ thỏa

$$
J_S(\widetilde\theta_S)
\le
\inf_{\theta_S}J_S(\theta_S)+\delta_S,
$$

sau đó dùng một ánh xạ tương thích $T$ để khởi tạo phần tham số dùng chung của mô hình đích:

$$
\theta_T^{(0)}=T(\widetilde\theta_S).
$$

Cuối cùng, mô hình được tinh chỉnh theo $J_T$. Phải chỉ rõ kiến trúc nào được chia sẻ, lớp nào được khởi tạo mới, lớp nào đóng băng hoặc cho phép cập nhật và dữ liệu nào được dùng để chọn siêu tham số.

**Trực quan.** Nhiệm vụ nguồn đưa tham số tới một vùng đã mã hóa cấu trúc hữu ích trước khi dữ liệu đích ít ỏi phải định hình toàn bộ mô hình. Cách làm chỉ thay điểm đầu và không chứng minh vùng đó chứa nghiệm tốt nhất của nhiệm vụ đích.

**Ví dụ tính được.** Giả sử nhiệm vụ đích có $200$ mẫu gắn nhãn, còn nhiệm vụ nguồn liên quan có $50\,000$ mẫu. Một encoder $e_{\phi}$ và đầu nguồn $c_{\psi_S}$ được huấn luyện trên nguồn. Khi chuyển sang đích, bỏ $\psi_S$, khởi tạo đầu mới $\psi_T$, rồi tinh chỉnh $(\phi,\psi_T)$.

Để tách tác dụng, so sánh hai cấu hình dùng cùng kiến trúc, cùng phép chia dữ liệu đích và cùng ngân sách tinh chỉnh:

| Cấu hình | Khởi tạo encoder | Thước đo quyết định |
|---|---|---|
| Từ đầu | ngẫu nhiên theo cùng quy tắc | mất mát xác thực đích |
| Tiền huấn luyện | $\widetilde\phi_S$ | mất mát xác thực đích |

Nếu mất mát xác thực đích lần lượt là $0{,}61$ và $0{,}48$, chênh lệch quan sát được là $0{,}13$. Phép so sánh giả định này không phải bảo đảm lý thuyết hay số liệu thực nghiệm từ một bộ dữ liệu cụ thể.

**Ý nghĩa và ứng dụng trong AI.** Tiền huấn luyện có giám sát hữu ích khi nhiệm vụ nguồn có nhiều nhãn và chia sẻ đặc trưng với nhiệm vụ đích: nhận dạng đối tượng rồi tinh chỉnh cho phân loại chuyên ngành, hoặc học nhiệm vụ phụ trước khi huấn luyện hệ thống đầy đủ. Nó có thể giúp cả tối ưu lẫn khái quát hóa; thí nghiệm cần tách hai hiệu ứng bằng đường cong huấn luyện và xác thực.

**Điểm dễ nhầm.** Nhiều dữ liệu nguồn không bảo đảm chuyển giao tốt nếu nhãn, miền hoặc đặc trưng quyết định khác nhiệm vụ đích. Hiệu năng nguồn cao không thay cho đánh giá đích. “Tiền huấn luyện” không đồng nghĩa với “đóng băng encoder”; đóng băng hay tinh chỉnh là một quyết định riêng. Không so sánh hai tuyến có ngân sách, kiến trúc hoặc tiêu chuẩn dừng khác nhau rồi quy toàn bộ chênh lệch cho điểm khởi tạo.

**Câu hỏi kiểm tra.** Nếu tiền huấn luyện giảm mất mát huấn luyện đích nhanh hơn nhưng thước đo xác thực đích kém hơn, kết luận nào liên quan tối ưu và kết luận nào liên quan chuyển giao? Cần lưu những trạng thái nào ngoài trọng số nếu muốn tiếp tục bộ tối ưu Adam từ một checkpoint nguồn?

### 12. Phương pháp tiếp tục

**Mục tiêu đọc hiểu.** Người đọc xây dựng được một họ mục tiêu từ dễ đến đích, thực hiện khởi tạo ấm qua các giai đoạn và nêu đúng giới hạn của việc lần theo một nhánh nghiệm.

**Định nghĩa và giả thiết.** Phương pháp tiếp tục dùng một họ mục tiêu

$$
J^{(0)},J^{(1)},\ldots,J^{(K)}=J
$$

trên cùng không gian tham số $\Theta$, hoặc có ánh xạ tham số được nêu rõ giữa hai giai đoạn liên tiếp. Tại giai đoạn $k$, thuật toán bắt đầu từ nghiệm gần đúng của giai đoạn trước. Với dung sai $\delta_k\ge0$, ký hiệu này được viết chính xác bằng

$$
\theta^{(k)}_0=\widetilde\theta^{(k-1)},
\qquad
J^{(k)}(\widetilde\theta^{(k)})
\le
\inf_{\theta\in\Theta}J^{(k)}(\theta)+\delta_k.
$$

Tiêu chuẩn chuyển giai đoạn có thể dựa trên chuẩn gradient, mức giảm mục tiêu, ngân sách hoặc một thước đo ổn định đã khóa trước.

![Chuỗi mục tiêu từ dễ đến mục tiêu đích và một lịch phân phối dữ liệu từ dễ đến khó.](img/lec-06/continuation-curriculum.svg)

**Trực quan.** Thay vì nhảy trực tiếp vào cảnh quan khó, ta tạo các cảnh quan trung gian và lần theo một nghiệm đang thay đổi. Mục tiêu đầu có thể được làm trơn, điều chuẩn mạnh hơn hoặc giảm độ phi tuyến; độ khó sau đó tăng dần tới bài toán thật.

**Ví dụ tính được.** Dùng minh họa khởi tạo ấm

$$
J^{(k)}(\theta)=(\theta-k)^2,
\qquad k=0,1,2.
$$

Nghiệm lần lượt là $\theta^{\star(0)}=0$, $\theta^{\star(1)}=1$ và $\theta^{\star(2)}=2$. Tại giai đoạn $k$, gradient là

$$
\nabla J^{(k)}(\theta)=2(\theta-k).
$$

Với tốc độ học $\eta=1/2$, khởi tạo từ nghiệm trước $\theta_0^{(k)}=k-1$ cho

$$
\theta_1^{(k)}
=\theta_0^{(k)}-\frac12\,2(\theta_0^{(k)}-k)
=k.
$$

Một bước đi đúng tới nghiệm kế tiếp. Ví dụ chỉ minh họa khởi tạo ấm vì các parabol chỉ tịnh tiến; nó không phải một ví dụ làm trơn thực sự.

**Ý nghĩa và ứng dụng trong AI.** Tiếp tục có thể dùng lịch giảm điều chuẩn, giảm dần mức làm trơn, tăng độ sâu đang hoạt động hoặc tăng độ chính xác của bài toán con. Phép đánh giá cần theo dõi cả tiến độ trên $J^{(k)}$ lẫn kết quả cuối trên $J$. Ngân sách ở các bài trung gian chỉ có giá trị nếu giúp giảm chi phí hoặc cải thiện nghiệm cuối.

**Điểm dễ nhầm.** Các nghiệm tối ưu theo $k$ không nhất thiết tạo một nhánh liên tục hay dẫn tới nghiệm toàn cục của $J$. Một nhánh có thể phân đôi, biến mất hoặc đi vào miền kém. Không gọi mọi chuỗi checkpoint là phương pháp tiếp tục: phải có họ bài toán và quy tắc chuyển rõ. Ví dụ parabol trên không chứng minh lợi ích so với tối ưu trực tiếp $J^{(2)}$.

**Câu hỏi kiểm tra.** Nếu thay tốc độ học bằng $1/4$, từ $\theta=0$ khi tối ưu $J^{(1)}$ ta đến đâu sau một bước? Trong một tuyến làm trơn ảnh, đại lượng nào phải hội tụ về bài toán đích để giai đoạn cuối thực sự giải đúng mục tiêu ban đầu?

### 13. Học theo chương trình

**Mục tiêu đọc hiểu.** Người đọc biểu diễn học theo chương trình như một lịch phân phối lấy mẫu, tính được rủi ro ở từng giai đoạn và đánh giá mô hình trên phân phối đích thay vì trên lịch dễ tạm thời.

**Định nghĩa và giả thiết.** Cho mẫu $z$, mất mát $\ell(\theta;z)$, độ khó $c(z)$ và phân phối lấy mẫu ở vòng $t$ là $q_t$. Mục tiêu tức thời là

$$
J^{(t)}(\theta)=\mathbb E_{z\sim q_t}\ell(\theta;z).
$$

Một chương trình học làm $q_t$ ban đầu đặt nhiều khối lượng hơn lên mẫu dễ, rồi dần tiến tới phân phối đích $q_\star$. Lịch có thể phụ thuộc số vòng hoặc một tiêu chí hiệu năng, nhưng tiêu chí phải tránh dùng tập kiểm tra. Không bắt buộc sắp xếp dữ liệu đúng một lần; lịch ngẫu nhiên có thể giữ cả mẫu dễ và khó ở mọi giai đoạn.

**Trực quan.** Chương trình học là một trường hợp thay tuyến bài toán bằng cách thay phân phối dữ liệu. Các ví dụ dễ tạo tín hiệu ban đầu ít biến động; mẫu khó được tăng dần khi mô hình đã có biểu diễn cơ sở. Tuy nhiên, “dễ với con người” không nhất thiết là “cung cấp gradient hữu ích cho mô hình”.

**Ví dụ tính được.** Chia dữ liệu chuỗi thành nhóm ngắn $E$ và dài $K$. Xét lịch

| Giai đoạn | $q_t(E)$ | $q_t(K)$ |
|---|---:|---:|
| đầu | $0{,}8$ | $0{,}2$ |
| giữa | $0{,}5$ | $0{,}5$ |
| đích | $0{,}2$ | $0{,}8$ |

Mỗi hàng là một phân phối vì hai xác suất không âm và có tổng bằng $1$. Nếu tại một tham số cố định ta đo được

$$
\ell_E(\theta)=0{,}25,
\qquad
\ell_K(\theta)=1{,}00,
$$

thì mục tiêu ở ba giai đoạn lần lượt là

$$
J^{(\mathrm{đầu})}=0{,}8(0{,}25)+0{,}2(1)=0{,}40,
$$

$$
J^{(\mathrm{giữa})}=0{,}625,
\qquad
J^{(\mathrm{đích})}=0{,}85.
$$

Mục tiêu tăng dù tham số không đổi vì phân phối đã đổi. Do đó không được đọc đường mất mát xuyên giai đoạn như thể cùng một hàm đang được tối ưu.

**Ý nghĩa và ứng dụng trong AI.** Lịch độ dài chuỗi, mức nhiễu, độ phân giải hoặc độ khó nhãn có thể giảm gánh nặng tối ưu ban đầu. Liên hệ với tiếp tục nằm ở chỗ $q_t$ sinh ra họ mục tiêu $J^{(t)}$. Khác biệt triển khai là curriculum thay dữ liệu được lấy mẫu, còn tiếp tục tổng quát có thể thay bất kỳ thành phần nào của mục tiêu.

**Điểm dễ nhầm.** Đổi $q_t$ đồng nghĩa đổi hàm mục tiêu, nên mất mát giữa hai giai đoạn không so trực tiếp nếu chưa quy về cùng phân phối đánh giá. Một lịch có thể làm mô hình quên mẫu dễ hoặc thiên lệch về một nhóm. Không dùng tập kiểm tra để quyết định chuyển giai đoạn. Không có bảo đảm rằng một thứ tự “dễ đến khó” tùy ý sẽ tìm nghiệm tốt hơn.

**Câu hỏi kiểm tra.** Với $\ell_E=0{,}4$ và $\ell_K=0{,}7$, hãy tính ba mục tiêu theo bảng. Nếu mất mát quan sát tăng ở lần chuyển từ giữa sang đích, cần tính thêm đại lượng nào trên một phân phối cố định trước khi kết luận mô hình xấu đi?

Tiếp tục và chương trình học cùng tạo một chuỗi mục tiêu, nhưng chưa cho biết cách phối hợp chúng với các can thiệp ở các nhóm trước. Ca cuối gom các quyết định vào một tuyến huấn luyện có đối chứng.

## F. Ca tích hợp và bản đồ quyết định

### 14. Thiết kế tuyến huấn luyện cho bộ phân loại chuỗi

**Mục tiêu đọc hiểu.** Người đọc ghép sáu chiến lược vừa trình bày thành một tuyến có thể kiểm chứng, chỉ áp dụng mỗi can thiệp khi có tín hiệu phù hợp và thiết kế phép đối chứng để xác định đóng góp riêng.

**Định nghĩa và giả thiết.** Xét bộ phân loại chuỗi gồm encoder $e_\phi$, lớp chuẩn hóa theo lô và đầu phân loại $c_\psi$. Tập nguồn có $50\,000$ chuỗi gắn nhãn liên quan; tập đích có $200$ chuỗi gắn nhãn. Gọi $q_\star$ là phân phối đích trên các cặp $(x,y)$, trong đó xác suất chuỗi $x$ thuộc nhóm ngắn $E$ và dài $K$ lần lượt là $0{,}2$ và $0{,}8$. Mục tiêu đích là

$$
J_T(\phi,\psi)=
\mathbb E_{(x,y)\sim q_\star}
\ell(c_\psi(e_\phi(x)),y).
$$

Một cấu hình được xem là có thể kiểm chứng khi công bố: cách chia dữ liệu; hạt giống; thứ tự hoặc phân phối lấy lô; trạng thái chuẩn hóa; bộ tối ưu; quy tắc chọn khối; cửa sổ trung bình; lịch nhiệm vụ; tiêu chuẩn chuyển; checkpoint và tiêu chuẩn dừng.

**Trực quan.** Mỗi công cụ thay một đối tượng khác nhau:

$$
\text{BN: biểu diễn}
\quad\longrightarrow\quad
\text{hạ khối: biến được cập nhật}
\quad\longrightarrow\quad
\text{Polyak: đầu ra quỹ đạo},
$$

$$
\text{tiền huấn luyện: điểm đầu}
\quad\longrightarrow\quad
\text{tiếp tục: họ mục tiêu}
\quad\longrightarrow\quad
\text{curriculum: phân phối dữ liệu}.
$$

Các công cụ có thể phối hợp nhưng không thay thế lẫn nhau. Một tín hiệu phải dẫn tới một can thiệp và một phép đo xác nhận cụ thể.

**Ví dụ tính được.** Xét kế hoạch sáu bước:

1. Tiền huấn luyện $(\phi,\psi_S)$ trên $50\,000$ mẫu nguồn; chuyển $\phi$ và khởi tạo mới $\psi$.
2. Huấn luyện đích với chuẩn hóa theo lô; lưu $(\gamma,\beta)$ cùng trung bình và phương sai chạy.
3. Trong năm chu kỳ đầu, luân phiên một bước cập nhật $\psi$ và một bước cập nhật $\phi$; báo cáo chi phí theo chu kỳ hai khối.
4. Dùng curriculum $q_t(E),q_t(K)$ lần lượt bằng $(0{,}8,0{,}2)$, $(0{,}5,0{,}5)$ và $(0{,}2,0{,}8)$.
5. Đồng thời giảm hệ số làm trơn nhãn qua $0{,}2\to0{,}1\to0$, nên mục tiêu cuối đúng là $J_T$ không làm trơn.
6. Sau giai đoạn quá độ, lấy trung bình bốn checkpoint

$$
\theta_1=(1,-1),\quad
\theta_2=(-1,1),\quad
\theta_3=(1,-1),\quad
\theta_4=(-1,1),
$$

thu được $\widehat\theta=(0,0)$ trong ví dụ hai chiều minh họa.

Mỗi bước cần một đối chứng:

| Can thiệp | Tín hiệu | Phép đo xác nhận | Giới hạn cần kiểm |
|---|---|---|---|
| BN | thống kê kích hoạt dao động | thống kê chạy và mất mát đích | lô nhỏ gây nhiễu |
| Hạ theo khối | bài toán đầu phân loại rẻ | giảm mục tiêu mỗi chu kỳ | ghép mạnh làm chậm |
| Polyak | checkpoint muộn dao động cùng vùng | mất mát của trung bình trên xác thực | trộn miền xa có thể kém |
| Tiền huấn luyện | ít nhãn đích, nguồn liên quan | đối chứng khởi tạo từ đầu | lệch nhiệm vụ nguồn |
| Tiếp tục | mục tiêu đích trực tiếp bất ổn | kết quả cuối trên $J_T$ | nhánh nghiệm sai |
| Curriculum | chuỗi dài làm gradient bất ổn | đánh giá cố định trên $q_\star$ | lịch độ khó thiên lệch |

**Ý nghĩa và ứng dụng trong AI.** Ca tích hợp biến một danh sách kỹ thuật thành một thiết kế thí nghiệm. Có thể bật nhiều kỹ thuật trong cấu hình cuối, nhưng nghiên cứu cắt bỏ từng thành phần phải giữ cố định ngân sách, phép chia dữ liệu, tiêu chuẩn dừng và hạt giống. Kết quả cần báo cáo cả tối ưu, chẳng hạn đường mất mát theo chi phí, lẫn khái quát hóa trên phân phối đích.

**Điểm dễ nhầm.** Không dùng thống kê BN từ tập xác thực để huấn luyện. Không so một cập nhật khối với một cập nhật toàn bộ mà bỏ qua chi phí. Không trung bình checkpoint từ các chế độ kiến trúc hoặc trạng thái BN không tương thích. Curriculum và tiếp tục đều tạo mục tiêu thay đổi theo thời gian; log phải ghi mục tiêu hoặc phân phối đang dùng. Tiền huấn luyện tốt và mất mát huấn luyện thấp không đủ chứng minh chất lượng đích.

**Câu hỏi kiểm tra.** Nếu chỉ được bật một can thiệp cho từng tín hiệu sau, hãy chọn công cụ và phép đo: kích hoạt đổi thang mạnh giữa các lô; hai khối có bài toán con rẻ; checkpoint muộn dao động; chỉ có ít nhãn đích; tối ưu mục tiêu chưa làm trơn thất bại; chuỗi dài gây gradient tăng vọt. Vì sao không thể dùng cùng một đường mất mát thô để đánh giá cả sáu quyết định?

## Các định lý và chứng minh quan trọng: Nhóm A–C

Đọc bốn kết quả theo chuỗi: hiệu chỉnh kỳ vọng của Adam, dấu của hướng Newton, tính liên hợp của CG và điều kiện secant của BFGS.

### Hiệu chỉnh độ lệch của hai mômen Adam

::: proof
Từ truy hồi và $m_0=0$, khai triển theo thời gian cho

$$
m_t
=(1-\beta_1)
\sum_{k=1}^{t}\beta_1^{t-k}g_k.
$$

Tính tuyến tính của kỳ vọng và giả thiết $\mathbb E[g_k]=\mu$ cho

$$
\begin{aligned}
\mathbb E[m_t]
&=(1-\beta_1)
\sum_{k=1}^{t}\beta_1^{t-k}\mu\\
&=(1-\beta_1)
\frac{1-\beta_1^t}{1-\beta_1}\mu\\
&=(1-\beta_1^t)\mu.
\end{aligned}
$$

Do đó

$$
\mathbb E[\widehat m_t]
=\frac{\mathbb E[m_t]}{1-\beta_1^t}
=\mu.
$$

Tương tự,

$$
v_t
=(1-\beta_2)
\sum_{k=1}^{t}\beta_2^{t-k}(g_k\odot g_k).
$$

Với $\mathbb E[g_k\odot g_k]=\nu<\infty$ không đổi,

$$
\mathbb E[v_t]=(1-\beta_2^t)\nu,
\qquad
\mathbb E[\widehat v_t]=\nu.
$$

Chứng minh chỉ dùng kỳ vọng không đổi theo thời gian; không cần giả thiết các gradient độc lập. Tuy nhiên, nó không chứng minh Adam hội tụ và không nói hai tỉ số ngẫu nhiên trong bước cập nhật là không chệch sau khi lấy căn và chia.
:::

### Hướng giảm của hệ Newton có ma trận dương xác định

::: proof
Vì $B\succ0$, ma trận $B$ khả nghịch nên hệ $Bp=-g$ có nghiệm duy nhất. Nếu $p=0$ thì $g=-Bp=0$, trái với giả thiết $g\ne0$. Vì vậy $p\ne0$.

Nhân đẳng thức $Bp=-g$ bên trái với $p^T$ cho

$$
p^TBp=-p^Tg=-g^Tp.
$$

Tính dương xác định và $p\ne0$ suy ra $p^TBp>0$. Do đó

$$
g^Tp=-p^TBp<0.
$$

Giả thiết dương xác định được dùng để khóa dấu tại bước này. Nếu $B$ chỉ khả nghịch nhưng bất định, dấu của $p^TBp$ không được kiểm soát.
:::

### Kết thúc hữu hạn của gradient liên hợp trên hệ SPD

::: proof
Đặt $r_0=b-Bp_0$. Nếu $r_0=0$ thì $p_0$ đã giải hệ và thuật toán kết thúc trước vòng lặp đầu tiên. Xét trường hợp $r_0\ne0$ và chỉ các vòng trước khi phần dư trở thành $0$; khi đó mọi mẫu số trong công thức CG đều dương vì $B\succ0$ và hướng hiện tại khác $0$.

Ta nêu các bước chính của chứng minh trong số học chính xác. Công thức chọn $\alpha_k$ làm phần dư mới trực giao với hướng hiện tại:

$$
r_{k+1}^Td_k=0.
$$

Công thức chọn $\beta_k$ làm hướng mới liên hợp theo $B$ với hướng trước:

$$
d_{k+1}^TBd_k=0.
$$

Bằng quy nạp, các phần dư khác $0$ đôi một trực giao và các hướng khác $0$ đôi một $B$-liên hợp. Vì $B\succ0$, các hướng $B$-liên hợp khác $0$ độc lập tuyến tính. Không gian $\mathbb R^d$ chứa nhiều nhất $d$ hướng độc lập như vậy.

Sau $k$ vòng, $p_k$ là điểm cực tiểu của dạng toàn phương

$$
\varphi(p)=\frac12p^TBp-b^Tp
$$

trên không gian Krylov đã sinh. Khi các hướng đã sinh toàn bộ $\mathbb R^d$, điều kiện cực tiểu cho $\nabla\varphi(p)=Bp-b=0$, nên $p$ là nghiệm duy nhất của $Bp=b$. Vì vậy CG kết thúc sau không quá $d$ vòng.

Trong số học dấu phẩy động, tính trực giao và liên hợp bị suy giảm. Trong HF, ta thường dừng sớm vì ngân sách hoặc vì phần dư đã đủ nhỏ. Hai trường hợp này không được diễn giải thành kết thúc chính xác sau $d$ vòng.
:::

### BFGS bảo toàn tính dương xác định và thỏa điều kiện secant

::: proof
Đặt

$$
\rho=\frac1{y^Ts}>0,
\qquad
V=I-\rho sy^T.
$$

Công thức BFGS viết gọn thành

$$
M_+=VMV^T+\rho ss^T.
$$

Với mọi $z\ne0$,

$$
z^TM_+z
=(V^Tz)^TM(V^Tz)
+\rho(s^Tz)^2.
$$

Hai hạng ở vế phải đều không âm vì $M\succ0$ và $\rho>0$. Nếu tổng bằng $0$, ta phải có đồng thời

$$
V^Tz=0
\qquad\text{và}\qquad
s^Tz=0.
$$

Nhưng

$$
V^Tz=z-\rho y(s^Tz)=z
$$

khi $s^Tz=0$. Do đó $V^Tz=0$ kéo theo $z=0$, mâu thuẫn với lựa chọn $z\ne0$. Suy ra $z^TM_+z>0$ với mọi $z\ne0$, tức $M_+\succ0$.

Để kiểm điều kiện secant, trước hết

$$
V^Ty
=y-\rho y(s^Ty)
=0.
$$

Vì vậy

$$
M_+y
=VMV^Ty+\rho ss^Ty
=0+\rho s(y^Ts)
=s.
$$

Điều kiện $y^Ts>0$ vừa làm $\rho$ dương trong chứng minh tính dương xác định, vừa bảo đảm mẫu số khác $0$.
:::

## Các định lý và chứng minh quan trọng: Nhóm D–F

### Mệnh đề: trung bình và phương sai sau chuẩn hóa theo lô

**Giả thiết.** Xét một đặc trưng $h_1,\ldots,h_m\in\mathbb R$, $m\ge1$, với

$$
\mu=\frac1m\sum_{i=1}^m h_i,
\qquad
\sigma^2=\frac1m\sum_{i=1}^m(h_i-\mu)^2,
$$

và $\epsilon>0$. Đặt $\widehat h_i=(h_i-\mu)/\sqrt{\sigma^2+\epsilon}$.

**Kết luận.** Trung bình theo lô của $\widehat h$ bằng $0$ và phương sai theo lô của $\widehat h$ bằng $\sigma^2/(\sigma^2+\epsilon)$:

$$
\frac1m\sum_{i=1}^m\widehat h_i=0,
\qquad
\frac1m\sum_{i=1}^m\widehat h_i^2
=\frac{\sigma^2}{\sigma^2+\epsilon}.
$$

::: proof
Từ định nghĩa trung bình,

$$
\sum_{i=1}^m(h_i-\mu)
=\sum_{i=1}^m h_i-m\mu=0.
$$

Mẫu số của mọi $\widehat h_i$ giống nhau và dương vì $\epsilon>0$, do đó

$$
\frac1m\sum_{i=1}^m\widehat h_i
=\frac{1}{m\sqrt{\sigma^2+\epsilon}}
\sum_{i=1}^m(h_i-\mu)=0.
$$

Vì trung bình chuẩn hóa bằng $0$, phương sai theo lô chính là trung bình bình phương:

$$
\frac1m\sum_{i=1}^m\widehat h_i^2
=\frac{1}{m(\sigma^2+\epsilon)}
\sum_{i=1}^m(h_i-\mu)^2
=\frac{\sigma^2}{\sigma^2+\epsilon}.
$$

Giả thiết $\epsilon>0$ được dùng để phép chia luôn xác định, kể cả khi $\sigma^2=0$. Khi đó mọi $h_i=\mu$, nên mọi $\widehat h_i=0$.
:::

**Điểm dễ sai.** Không thay mẫu số $m$ bằng $m-1$ giữa chừng. Không kết luận phương sai đúng bằng $1$ khi $\epsilon>0$. Sau biến đổi $y_i=\gamma\widehat h_i+\beta$, trung bình và phương sai lần lượt là $\beta$ và $\gamma^2\sigma^2/(\sigma^2+\epsilon)$, không còn là $0$ và gần $1$ nói chung.

### Mệnh đề: một bước gradient theo khối làm giảm mục tiêu

**Giả thiết.** $F:\mathbb R^d\to\mathbb R$ khả vi. Với một khối $S$, gradient theo khối là $L_S$-Lipschitz dọc mọi độ dời trong khối. Giả thiết này suy ra bất đẳng thức hạ trơn

$$
F(x+U_Sh)
\le F(x)+\nabla_SF(x)^Th+\frac{L_S}{2}\|h\|_2^2
$$

cho mọi $x,h$, trong đó $L_S>0$. Thực hiện bước

$$
x^+=x-\frac1{L_S}U_S\nabla_SF(x).
$$

**Kết luận.** Mục tiêu không tăng và giảm một lượng được chặn dưới bởi

$$
F(x^+)\le F(x)-\frac1{2L_S}\|\nabla_SF(x)\|_2^2.
$$

::: proof
Chọn

$$
h=-\frac1{L_S}\nabla_SF(x)
$$

trong bất đẳng thức hạ trơn. Khi đó

$$
\nabla_SF(x)^Th
=-\frac1{L_S}\|\nabla_SF(x)\|_2^2
$$

và

$$
\frac{L_S}{2}\|h\|_2^2
=\frac1{2L_S}\|\nabla_SF(x)\|_2^2.
$$

Cộng hai hạng cho kết luận. Nếu $\nabla_SF(x)\ne0$, bất đẳng thức cho giảm chặt ở bước đó.

Nếu thay bước gradient bằng nghiệm chính xác của bài toán con và $x_S$ hiện tại là một điểm khả thi của bài toán con, ta còn có trực tiếp

$$
F(x_{-S},x_S^+)\le F(x_{-S},x_S).
$$

Kết quả này chỉ nói về một bước. Muốn suy ra hội tụ của cả dãy cần thêm quy tắc chọn khối, tính bị chặn dưới hoặc compact của tập mức và các giả thiết phù hợp với lớp bài toán.
:::

**Điểm dễ sai.** Giảm theo từng bước không chứng minh hội tụ tới cực tiểu toàn cục. Không dùng hằng số Lipschitz toàn cục không tồn tại. Nếu dùng bước lớn hơn $1/L_S$, cận trên không còn cho đúng hệ số giảm nêu trên.

### Định lý: bất đẳng thức Jensen cho trung bình Polyak

**Giả thiết.** $C\subseteq\mathbb R^d$ là tập lồi, $F:C\to\mathbb R$ là hàm lồi và $\theta_1,\ldots,\theta_t\in C$, với $t\ge1$. Đặt

$$
\widehat\theta_t=\frac1t\sum_{i=1}^t\theta_i.
$$

**Kết luận.** Ta có $\widehat\theta_t\in C$ và

$$
F(\widehat\theta_t)
\le\frac1t\sum_{i=1}^tF(\theta_i).
$$

::: proof
Vì $C$ lồi và các trọng số $1/t$ không âm, có tổng bằng $1$, tổ hợp lồi $\widehat\theta_t$ thuộc $C$. Với $t=1$, kết luận là đẳng thức. Giả sử Jensen đúng cho $t-1$ điểm và viết

$$
\widehat\theta_t
=\frac{t-1}{t}\widehat\theta_{t-1}
+\frac1t\theta_t.
$$

Tính lồi hai điểm cho

$$
F(\widehat\theta_t)
\le\frac{t-1}{t}F(\widehat\theta_{t-1})
+\frac1tF(\theta_t).
$$

Dùng giả thiết quy nạp,

$$
F(\widehat\theta_t)
\le\frac{t-1}{t}
\left(\frac1{t-1}\sum_{i=1}^{t-1}F(\theta_i)\right)
+\frac1tF(\theta_t)
=\frac1t\sum_{i=1}^tF(\theta_i).
$$

Định lý được chứng minh.
:::

**Điểm dễ sai.** Định lý không nói $F(\widehat\theta_t)\le F(\theta_i)$ với mọi $i$. Nó cũng không áp dụng trực tiếp cho mục tiêu mạng sâu phi lồi. Các bảo đảm tiệm cận của trung bình Polyak–Ruppert là kết quả khác, cần giả thiết về quá trình ngẫu nhiên và lịch tốc độ học.

## Tài liệu tham khảo

- Bengio, Y., Lamblin, P., Popovici, D. và Larochelle, H. (2007), “Greedy Layer-Wise Training of Deep Networks”; nguồn lịch sử cho tiền huấn luyện tham lam từng tầng có giám sát. Ví dụ chuyển $50\,000$ mẫu nguồn sang $200$ mẫu đích trong ghi chú là minh họa tự tạo theo khung tổng quát của Goodfellow, Bengio và Courville (2016), không phải kết quả thực nghiệm của bài báo này.
- Bengio, Y., Louradour, J., Collobert, R. và Weston, J. (2009), “Curriculum Learning”, *Proceedings of the 26th International Conference on Machine Learning*.
- Duchi, J., Hazan, E. và Singer, Y. (2011), “Adaptive Subgradient Methods for Online Learning and Stochastic Optimization”, *Journal of Machine Learning Research*, 12, 2121–2159.
- Goodfellow, I., Bengio, Y. và Courville, A. (2016), *Deep Learning*, Chương 8, mục 8.5–8.7, MIT Press.
- Hinton, G. (2012), *Neural Networks for Machine Learning*, bài giảng 6e, “rmsprop”.
- Ioffe, S. và Szegedy, C. (2015), “Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift”, *Proceedings of the 32nd International Conference on Machine Learning*.
- Kingma, D. P. và Ba, J. (2015), “Adam: A Method for Stochastic Optimization”, *International Conference on Learning Representations*.
- Martens, J. (2010), “Deep Learning via Hessian-Free Optimization”, *Proceedings of the 27th International Conference on Machine Learning*, 735–742.
- Nocedal, J. và Wright, S. J. (2006), *Numerical Optimization*, ấn bản thứ hai, Springer, các chương 3, 5, 6 và 7.
- Polyak, B. T. và Juditsky, A. B. (1992), “Acceleration of Stochastic Approximation by Averaging”, *SIAM Journal on Control and Optimization*, 30(4), 838–855.
