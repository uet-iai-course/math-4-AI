# Bài 05 — Tối ưu bậc nhất cho học máy

Ghi chú này kế thừa khuôn hướng–bước–dừng của Bài 04 và dùng gradient ước lượng từ dữ liệu thay cho gradient toàn bộ. Quy trình huấn luyện phải đồng thời giảm mất mát huấn luyện, kiểm soát nhiễu lấy mẫu, xử lý hình học phi lồi, giữ thang tín hiệu qua mạng sâu và theo dõi chất lượng trên dữ liệu chưa thấy.

Ký hiệu chung là $\theta\in\mathbb R^d$ cho tham số, $(x_i,y_i)_{i=1}^n$ cho tập huấn luyện và $\ell_i(\theta)=\ell(f_\theta(x_i),y_i)$ cho mất mát trên mẫu thứ $i$. Mục tiêu thực nghiệm có dạng

$$
F(\theta)=\widehat R_n(\theta)=\frac1n\sum_{i=1}^n\ell_i(\theta).
$$

Nguồn chính là Goodfellow, Bengio và Courville (2016), Chương 8, cùng Glorot và Bengio (2010), Sutskever và cộng sự (2013), He và cộng sự (2015). Bài 06 sẽ tiếp tục với tốc độ học thích nghi, chuẩn hóa và các phương pháp dùng thông tin độ cong; ghi chú này dừng ở gradient ngẫu nhiên, momentum, Nesterov và khởi tạo Xavier/He.

## A. Mục tiêu tối ưu trong học máy

### 1. Rủi ro kỳ vọng, rủi ro thực nghiệm và dữ liệu chưa thấy

**Mục tiêu đọc hiểu.** Người đọc phân biệt được rủi ro kỳ vọng, rủi ro thực nghiệm và mất mát xác thực; đồng thời giải thích được vì sao giảm hàm huấn luyện chưa đủ để kết luận mô hình sẽ hoạt động tốt trên dữ liệu mới.

**Định nghĩa và giả thiết.** Cho mô hình $f_\theta$, mất mát $\ell(f_\theta(x),y)$ và giả sử các mẫu huấn luyện được lấy độc lập, cùng phân phối từ $P$. Rủi ro kỳ vọng là

$$
R(\theta)
=\mathbb E_{(X,Y)\sim P}
\left[\ell(f_\theta(X),Y)\right].
$$

Đây là đại lượng đích trên dữ liệu chưa thấy. Vì $P$ chưa biết, ta tối ưu rủi ro thực nghiệm

$$
\widehat R_n(\theta)
=\frac1n\sum_{i=1}^n\ell(f_\theta(x_i),y_i).
$$

Một tập xác thực độc lập cho ước lượng $\widehat R_{\mathrm{val}}(\theta)$ dùng để chọn siêu tham số hoặc thời điểm dừng. Tập kiểm tra được giữ lại cho đánh giá cuối, không tham gia các quyết định huấn luyện.

**Trực quan.** $R$ là trung bình trên một quần thể không quan sát hết; $\widehat R_n$ là trung bình trên một mẫu hữu hạn. Hai đại lượng có liên hệ nhưng không đồng nhất. Thuật toán nhìn thấy tập huấn luyện nhiều lần nên có thể tiếp tục giảm $\widehat R_n$ trong khi chất lượng ngoài mẫu đã xấu đi.

![Hai đường mất mát theo vòng huấn luyện: mất mát huấn luyện tiếp tục giảm, còn mất mát xác thực giảm rồi tăng; thời điểm dừng được chọn gần đáy đường xác thực.](img/lec-05/risk-curves.svg)

**Ví dụ tính được.** Giả sử tập xác thực có bốn mất mát theo mẫu tại hai thời điểm:

$$
(0{,}2,0{,}4,0{,}6,0{,}8)
\quad\text{và}\quad
(0{,}1,0{,}3,0{,}9,1{,}1).
$$

Hai mất mát xác thực trung bình lần lượt là

$$
\widehat R_{\mathrm{val}}^{(1)}=0{,}5,
\qquad
\widehat R_{\mathrm{val}}^{(2)}=0{,}6.
$$

Nếu mất mát huấn luyện ở thời điểm thứ hai nhỏ hơn, ta vẫn chưa nên chọn thời điểm đó: đại lượng dùng để chọn dừng là mất mát xác thực, không phải riêng mất mát huấn luyện.

**Ý nghĩa và ứng dụng trong AI.** Mọi tuyến huấn luyện cần công bố ba vai trò: hàm được tối ưu trên tập huấn luyện, đại lượng dùng để chọn mô hình trên tập xác thực và phép đánh giá cuối trên tập kiểm tra. Cách tách này ngăn việc điều chỉnh mô hình theo dữ liệu vốn được dành để báo cáo kết quả.

**Điểm dễ nhầm.** $\widehat R_{\mathrm{val}}$ vẫn chỉ là một ước lượng hữu hạn, không phải chính $R$. Dừng sớm là một quyết định chọn mô hình dựa trên xác thực, không phải chứng nhận rằng gradient đã bằng không. Tính độc lập cùng phân phối là giả thiết mô hình hóa; nếu phân phối triển khai thay đổi, cả rủi ro thực nghiệm lẫn xác thực có thể không đại diện cho đích mới.

**Câu hỏi kiểm tra.** Nếu $\widehat R_n$ giảm nhưng $\widehat R_{\mathrm{val}}$ tăng qua nhiều vòng, đây trước hết là dấu hiệu của lỗi tối ưu hay khoảng cách khái quát hóa? Vì sao không dùng tập kiểm tra để chọn vòng dừng?

### 2. Mất mát thay thế khả vi và dừng sớm

**Mục tiêu đọc hiểu.** Người đọc phân biệt được thước đo đích với mất mát thay thế, tính được mất mát logistic theo biên và giải thích được vai trò riêng của dừng sớm.

**Định nghĩa và giả thiết.** Với phân loại nhị phân, $y\in\{-1,1\}$ và điểm số $s=f_\theta(x)$, biên có dấu là $m=ys$. Mất mát $0$–$1$ và mất mát logistic là

$$
\ell_{01}(m)=\mathbf1\{m\le0\},
\qquad
\ell_{\log}(m)=\log(1+e^{-m}).
$$

Mất mát $0$–$1$ đo trực tiếp một quy ước lỗi phân loại nhưng không liên tục tại biên. Mất mát logistic là một mất mát thay thế khả vi, dùng để tạo gradient huấn luyện.

**Trực quan.** Mất mát $0$–$1$ chỉ trả lời dự đoán nằm ở phía nào của biên quyết định. Mất mát logistic còn phân biệt mức độ: một dự đoán đúng với biên nhỏ vẫn bị phạt nhiều hơn một dự đoán đúng với biên lớn. Vì vậy nó cung cấp tín hiệu thay đổi tham số ngay cả khi nhãn dự đoán chưa đổi.

**Ví dụ tính được.** Với $y=1$ và $s=-0{,}5$, ta có $m=-0{,}5$ và

$$
\ell_{01}=1,
\qquad
\ell_{\log}=\log(1+e^{0{,}5})\approx0{,}974.
$$

Nếu $s=2$, dự đoán đã đúng nên $\ell_{01}=0$, nhưng

$$
\ell_{\log}=\log(1+e^{-2})\approx0{,}127
$$

vẫn tạo một tín hiệu nhỏ để tăng biên.

**Ý nghĩa và ứng dụng trong AI.** Mất mát thay thế biến một tiêu chí rời rạc thành bài toán tối ưu trơn. Dừng sớm xử lý một quyết định khác: chọn thời điểm mà đại lượng xác thực tốt nhất, ngay cả khi mất mát thay thế trên huấn luyện còn có thể giảm.

**Điểm dễ nhầm.** Mất mát logistic không phải độ chính xác và giảm log-loss không buộc độ chính xác thay đổi ở mọi vòng. Quy ước $\mathbf1\{m\le0\}$ tính điểm đúng biên là lỗi; nếu dùng quy ước khác phải nói rõ. Không dùng việc logistic khả vi để suy rằng mô hình sâu tạo ra một hàm lồi theo $\theta$.

**Câu hỏi kiểm tra.** Tính hai mất mát tại $m=0$ và $m=2$. Đại lượng nào đổi liên tục khi biên thay đổi, và đại lượng nào trực tiếp đếm lỗi theo quy ước đã nêu?

### Mệnh đề: tính trơn và lồi của mất mát logistic theo biên

**Giả thiết.** Đặt $\phi(m)=\log(1+e^{-m})$ với $m\in\mathbb R$.

**Kết luận.** $\phi$ khả vi hai lần, giảm theo $m$ và lồi theo $m$.

Chứng minh chi tiết nằm ở mục Nhóm A cuối ghi chú.

Mất mát khả vi tạo ra gradient để cập nhật tham số. Hình học của hàm hợp theo $\theta$ mới quyết định gradient đó dễ hay khó sử dụng.

## B. Chẩn đoán cảnh quan và độ sâu

### 3. Điều kiện hóa và phân loại điểm dừng

**Mục tiêu đọc hiểu.** Người đọc dùng Hessian để tách điều kiện hóa kém khỏi cấu trúc điểm dừng và phân loại được cực tiểu, cực đại hoặc điểm yên ngựa khi kiểm tra bậc hai đủ kết luận.

**Định nghĩa và giả thiết.** Với hàm $f\in C^2$, một điểm $x^*$ là điểm dừng nếu $\nabla f(x^*)=0$. Nếu Hessian xác định dương tại đó, điểm là cực tiểu địa phương chặt; nếu xác định âm, điểm là cực đại địa phương chặt; nếu Hessian bất định, điểm là điểm yên ngựa. Hessian nửa xác định nhưng suy biến không đủ để phân loại.

Với một Hessian xác định dương $H$, số điều kiện phổ là

$$
\kappa_2(H)=\frac{\lambda_{\max}(H)}{\lambda_{\min}(H)}.
$$

Số điều kiện lớn mô tả sự chênh lệch độ cong quanh một điểm, không tự nói điểm đó là cực tiểu địa phương xấu.

**Trực quan.** Đường mức dài và hẹp làm một tốc độ học vô hướng phải thỏa hiệp: bước đủ nhỏ cho hướng cong lớn lại tiến chậm theo hướng phẳng. Ở điểm yên ngựa, tình huống khác hẳn: có hướng đi lên và hướng đi xuống ngay trong mọi lân cận.

![Các đường mức dài và hẹp cùng quỹ đạo dao động qua hai phía của khe điều kiện kém.](img/lec-05/ill-conditioning.svg)

![Hai lát cắt cong ngược chiều của hàm $u^2-v^2$ tại điểm yên ngựa.](img/lec-05/saddle.svg)

**Ví dụ tính được.** Với

$$
q(u,v)=\frac12(u^2+100v^2),
$$

Hessian là $\operatorname{diag}(1,100)$ và $\kappa_2(H)=100$. Nghiệm $0$ vẫn là cực tiểu toàn cục duy nhất; khó khăn nằm ở điều kiện hóa.

Ngược lại, với

$$
s(u,v)=u^2-v^2,
$$

ta có $\nabla s(0,0)=0$ và $\nabla^2s=\operatorname{diag}(2,-2)$. Dọc $v=0$, $s(u,0)=u^2>0$; dọc $u=0$, $s(0,v)=-v^2<0$. Vì vậy gốc là điểm yên ngựa.

**Ý nghĩa và ứng dụng trong AI.** Chẩn đoán quyết định công cụ. Tăng kích thước lô có thể giảm nhiễu gradient nhưng không sửa số điều kiện. Momentum có thể giảm dao động có cấu trúc nhưng không biến cảnh quan phi lồi thành lồi. Gradient nhỏ tại một điểm cũng chưa đủ để tuyên bố đã tìm được cực tiểu tốt.

**Điểm dễ nhầm.** $\nabla f=0$ chỉ là điều kiện dừng. Hessian nửa xác định dương không bảo đảm cực tiểu nếu thiếu thông tin bậc cao. Số điều kiện chỉ có ý nghĩa theo chuẩn và tọa độ đã chọn. Không quy mọi thất bại huấn luyện cho “cực tiểu địa phương”; nhiễu, độ sâu và điều kiện hóa là các cơ chế khác nhau.

**Câu hỏi kiểm tra.** Một điểm dừng có Hessian $\operatorname{diag}(0,2)$ có thể được kết luận là cực tiểu chỉ từ dữ kiện này không? So sánh với Hessian $\operatorname{diag}(-1,3)$.

### Định lý: kiểm tra bậc hai tại điểm dừng

**Giả thiết.** $f\in C^2$ trong một lân cận của $x^*$ và $\nabla f(x^*)=0$.

**Kết luận.** Nếu $\nabla^2f(x^*)\succ0$ thì $x^*$ là cực tiểu địa phương chặt. Nếu $\nabla^2f(x^*)\prec0$ thì $x^*$ là cực đại địa phương chặt. Nếu Hessian bất định thì $x^*$ là điểm yên ngựa.

Mục Nhóm B cuối ghi chú chứng minh kết quả này bằng khai triển Taylor.

### 4. Tích Jacobian và gradient qua mạng sâu

**Mục tiêu đọc hiểu.** Người đọc kiểm tra được kích thước trong công thức lan truyền ngược, giải thích được nguy cơ gradient tiêu biến hoặc bùng nổ và phân biệt ví dụ vô hướng với kết luận ma trận.

**Định nghĩa và giả thiết.** Xét chuỗi ánh xạ khả vi

$$
h_k=F_k(h_{k-1}),
\qquad k=1,\ldots,K,
$$

với $h_k\in\mathbb R^{d_k}$ và

$$
J_k=\frac{\partial h_k}{\partial h_{k-1}}
\in\mathbb R^{d_k\times d_{k-1}}.
$$

Nếu mất mát vô hướng là $\mathcal L(h_K)$ và gradient dùng quy ước véc-tơ cột, quy tắc dây chuyền cho

$$
\nabla_{h_0}\mathcal L
=J_1^TJ_2^T\cdots J_K^T
\nabla_{h_K}\mathcal L.
$$

**Trực quan.** Lan truyền ngược chuyển một tín hiệu qua nhiều phép biến đổi tuyến tính cục bộ. Mỗi Jacobian có thể co một số hướng và kéo giãn các hướng khác. Phép nhân lặp khiến khác biệt thang nhỏ ở từng lớp tích lũy theo độ sâu.

![Chuỗi lan truyền ngược là tích các Jacobian chuyển vị; các thang nhỏ lặp lại làm tín hiệu suy giảm, còn các thang lớn lặp lại làm tín hiệu tăng nhanh.](img/lec-05/gradient-chain.svg)

**Ví dụ tính được.** Trong trường hợp vô hướng, nếu mỗi lớp nhân độ nhạy với $0{,}8$, sau $20$ lớp hệ số là

$$
0{,}8^{20}\approx0{,}0115.
$$

Nếu mỗi lớp nhân với $1{,}2$, hệ số là

$$
1{,}2^{20}\approx38{,}3.
$$

Hai con số minh họa bản chất tích lũy; chúng không phải số đo từ một mạng thực nghiệm.

**Ý nghĩa và ứng dụng trong AI.** Công thức giải thích vì sao lựa chọn hàm kích hoạt, thang khởi tạo, chuẩn hóa và kết nối dư có thể ảnh hưởng mạnh tới gradient ở các lớp đầu. Nhu cầu kiểm soát thang tín hiệu này dẫn tới các quy tắc khởi tạo Xavier và He ở phần sau.

**Điểm dễ nhầm.** Cận

$$
\|\nabla_{h_0}\mathcal L\|_2
\le
\left(\prod_{k=1}^K\|J_k\|_2\right)
\|\nabla_{h_K}\mathcal L\|_2
$$

là cận trên, nên trực tiếp mô tả nguy cơ tăng lớn. Muốn bảo đảm không tiêu biến cần cận dưới theo trị kỳ dị nhỏ nhất và phải xét hướng của gradient. Không thể thay mọi Jacobian ma trận bằng một số vô hướng mà vẫn giữ đầy đủ hình học.

**Câu hỏi kiểm tra.** Kiểm tra kích thước của $J_K^T\nabla_{h_K}\mathcal L$, rồi tiếp tục tới $\nabla_{h_0}\mathcal L$. Vì sao chỉ biết $\|J_k\|_2\le1$ chưa mô tả chính xác mọi hướng?

### Mệnh đề: cận chuẩn cho gradient truyền ngược

**Giả thiết.** Các ánh xạ ở trên khả vi và dùng chuẩn Euclid cùng chuẩn toán tử cảm sinh.

**Kết luận.** Gradient đầu vào thỏa

$$
\|\nabla_{h_0}\mathcal L\|_2
\le
\prod_{k=1}^K\|J_k\|_2
\|\nabla_{h_K}\mathcal L\|_2.
$$

Nếu mọi $J_k$ vuông và có trị kỳ dị nhỏ nhất dương, ta còn có

$$
\|\nabla_{h_0}\mathcal L\|_2
\ge
\prod_{k=1}^K\sigma_{\min}(J_k)
\|\nabla_{h_K}\mathcal L\|_2.
$$

Mục Nhóm B cuối ghi chú trình bày chuỗi bất đẳng thức chuẩn.

Sau khi nhận diện độ cong và nguy cơ suy giảm tín hiệu, ta chuyển sang cách ước lượng gradient khi tập dữ liệu quá lớn để dùng toàn bộ ở mỗi vòng.

## C. Gradient ngẫu nhiên và lô nhỏ

### 5. Gradient lô, tính không chệch và phương sai

**Mục tiêu đọc hiểu.** Người đọc định nghĩa được gradient lô dưới một cơ chế lấy mẫu cụ thể, chứng minh tính không chệch có điều kiện và tính được quy luật phương sai $1/b$.

**Định nghĩa và giả thiết.** Viết mục tiêu hữu hạn dưới dạng

$$
F(\theta)=\frac1n\sum_{i=1}^n\ell_i(\theta).
$$

Gọi $\mathcal F_t$ là toàn bộ lịch sử trước khi lấy lô thứ $t$; do đó $\theta_t$ đo được theo $\mathcal F_t$. Điều kiện theo $\mathcal F_t$, lấy các chỉ số $I_{t,1},\ldots,I_{t,b_t}$ độc lập, đều trên $\{1,\ldots,n\}$ và có hoàn lại. Đặt

$$
g_t(q)=\frac1{b_t}
\sum_{j=1}^{b_t}\nabla\ell_{I_{t,j}}(q).
$$

Khi lô mới độc lập với lịch sử,

$$
\mathbb E[g_t(\theta_t)\mid\mathcal F_t]
=\nabla F(\theta_t).
$$

**Trực quan.** Mỗi gradient mẫu là một mũi tên nhiễu quanh gradient toàn bộ. Trung bình nhiều mũi tên độc lập không làm thay đổi tâm nhưng làm giảm độ phân tán. Đổi lại, mỗi cập nhật cần nhiều phép tính gradient mẫu hơn.

![Lấy mẫu độc lập có hoàn lại giữ gradient lô không chệch và làm kỳ vọng bình phương chuẩn của sai số giảm từ 17 xuống 17 chia b.](img/lec-05/minibatch-unbiased-variance.svg)

**Ví dụ tính được.** Xét hai mất mát

$$
\ell_1(\theta)
=\frac12\left[(\theta_1-1)^2+4(\theta_2-1)^2\right],
$$

$$
\ell_2(\theta)
=\frac12\left[(\theta_1+1)^2+4(\theta_2+1)^2\right].
$$

Khi đó

$$
F(\theta)
=\frac12\theta_1^2+2\theta_2^2+\frac52,
\qquad
\nabla F(\theta)=(\theta_1,4\theta_2)^T.
$$

Hai nhiễu gradient không phụ thuộc $\theta$:

$$
\nabla\ell_1-\nabla F=(-1,-4)^T,
\qquad
\nabla\ell_2-\nabla F=(1,4)^T.
$$

Mỗi véc-tơ có bình phương chuẩn bằng $17$; với lô độc lập cỡ $b$, kỳ vọng bình phương chuẩn của sai số gradient là $17/b$.

**Ý nghĩa và ứng dụng trong AI.** Gradient lô cho phép một cập nhật chỉ dùng $b_t$ mẫu thay vì toàn bộ $n$ mẫu. Nếu $C_{\nabla}$ là chi phí một gradient mẫu, chi phí thô đổi từ $O(nC_{\nabla})$ thành $O(b_tC_{\nabla})$.

**Điểm dễ nhầm.** Một thứ tự lô cố định không tạo ra kỳ vọng xác suất. Khi duyệt không hoàn lại trong một epoch, tính không chệch có điều kiện theo toàn bộ lịch sử cần được xét riêng. Công thức $1/b$ dùng độc lập; các gradient tương quan có thể không cho cùng mức giảm phương sai.

**Câu hỏi kiểm tra.** Với ví dụ hai mẫu, tính gradient toàn bộ tại $\theta=(2,1)^T$ và so sánh với từng gradient mẫu. Vì sao trung bình hai gradient bằng gradient toàn bộ nhưng vết cố định $\{1\},\{2\}$ vẫn không phải một chứng minh hội tụ?

### Định lý: gradient lô không chệch và giảm phương sai theo $1/b$

**Giả thiết.** Điều kiện theo $\mathcal F_t$, các véc-tơ

$$
Z_j=\nabla\ell_{I_{t,j}}(\theta_t)
$$

độc lập, cùng phân phối, có trung bình $\nabla F(\theta_t)$ và

$$
\mathbb E[\|Z_j-\nabla F(\theta_t)\|_2^2\mid\mathcal F_t]
\le\sigma_1^2.
$$

**Kết luận.** Với $g_t=b_t^{-1}\sum_jZ_j$,

$$
\mathbb E[g_t\mid\mathcal F_t]=\nabla F(\theta_t)
$$

và

$$
\mathbb E[\|g_t-\nabla F(\theta_t)\|_2^2\mid\mathcal F_t]
\le\frac{\sigma_1^2}{b_t}.
$$

Mục Nhóm C cuối ghi chú chứng minh kết quả bằng cách triệt các hạng chéo.

### 6. Thuật toán SGD và một vết hai vòng

**Mục tiêu đọc hiểu.** Người đọc thực hiện được một vòng gradient ngẫu nhiên (SGD), giữ đúng chỉ số thời gian và phân biệt vết số tái lập với mô hình lấy mẫu của định lý.

**Định nghĩa và giả thiết.** Gradient ngẫu nhiên (SGD) thực hiện

$$
\theta_{t+1}=\theta_t-\eta_tg_t(\theta_t),
\qquad \eta_t>0.
$$

Một vòng đầy đủ gồm: lấy lô theo cơ chế đã công bố; tính $g_t$ tại $\theta_t$; cập nhật; theo dõi đại lượng huấn luyện và xác thực; kiểm tra tiêu chuẩn dừng. Tập xác thực không tham gia tính $g_t$.

**Trực quan.** Gradient toàn bộ cho cùng một hướng tại một điểm. SGD thay hướng đó bằng một mũi tên lô có nhiễu. Dãy cập nhật vì thế có thể dao động, nhưng chi phí mỗi bước giảm và số bước trên cùng ngân sách mẫu có thể tăng.

**Ví dụ tính được.** Dùng hai mất mát ở Chủ đề 5 với

$$
\theta_0=(2,1)^T,
\qquad
\eta=0{,}1,
\qquad
B_0=\{1\},\quad B_1=\{2\}.
$$

Vòng đầu:

$$
g_0(\theta_0)=(1,0)^T,
\qquad
\theta_1=(2,1)^T-0{,}1(1,0)^T=(1{,}9,1)^T.
$$

Vòng hai:

$$
g_1(\theta_1)=(2{,}9,8)^T,
$$

$$
\theta_2=(1{,}9,1)^T-0{,}1(2{,}9,8)^T
=(1{,}61,0{,}2)^T.
$$

Vết xác định này chỉ dùng để kiểm phép tính. Hai lô đã ấn định không biểu diễn hai lần lấy mẫu để ước lượng một kỳ vọng.

**Ý nghĩa và ứng dụng trong AI.** SGD là giao diện cơ sở của huấn luyện theo dữ liệu: lô quyết định chi phí và nhiễu; tốc độ học quyết định thang cập nhật; phép đánh giá xác thực hỗ trợ lựa chọn thời điểm dừng. Phần momentum và Nesterov bổ sung trạng thái nhưng vẫn dùng giao diện lô này.

**Điểm dễ nhầm.** $g_t$ phải được tính tại đúng đối số: SGD dùng $g_t(\theta_t)$, còn Nesterov sẽ dùng điểm nhìn trước. Chỉ một cập nhật có mất mát giảm không chứng minh hội tụ. Tốc độ học hằng có thể thỏa $\eta\le1/L$ nhưng vẫn không thỏa điều kiện tổng bình phương hữu hạn của một định lý Robbins–Monro.

**Câu hỏi kiểm tra.** Từ dữ kiện trên, hãy tính lại $g_1(\theta_1)$ trước khi tính $\theta_2$. Nếu đổi thứ tự hai lô, vì sao không được mặc định kết quả sau hai vòng giữ nguyên?

### 7. Đánh đổi tốc độ học–kích thước lô và bảo đảm điểm dừng

**Mục tiêu đọc hiểu.** Người đọc nêu đủ giả thiết của một bảo đảm SGD không lồi, diễn giải đúng đại lượng hội tụ và phân tích được ảnh hưởng riêng của tốc độ học với kích thước lô.

**Định nghĩa và giả thiết.** Giả sử $F$ bị chặn dưới bởi $F_{\inf}$ và có gradient $L$-Lipschitz:

$$
\|\nabla F(x)-\nabla F(y)\|_2
\le L\|x-y\|_2.
$$

Giả sử thêm

$$
\mathbb E[g_t(\theta_t)\mid\mathcal F_t]
=\nabla F(\theta_t)
$$

và

$$
\mathbb E[
\|g_t(\theta_t)-\nabla F(\theta_t)\|_2^2
\mid\mathcal F_t]
\le\sigma^2.
$$

Chọn trước một dãy xác định $0<\eta_t\le1/L$. Giả thiết này phục vụ định lý bên dưới; một tuyến huấn luyện mạng sâu không tự động thỏa nó.

**Trực quan.** $\eta_t$ lớn làm mỗi mũi tên tạo độ dời lớn; $b_t$ lớn làm mũi tên trung bình ít nhiễu hơn. Giảm $\eta_t$ có thể hạ sàn nhiễu nhưng làm tiến chậm. Tăng $b_t$ giảm phương sai lấy mẫu gần theo $1/b_t$ trong mô hình độc lập, nhưng tăng chi phí mỗi cập nhật và không sửa điều kiện hóa.

**Ví dụ tính được.** Với ví dụ xuyên suốt,

$$
\nabla^2F=\operatorname{diag}(1,4),
$$

nên có thể chọn $L=4$. Đồng thời $F(\theta)\ge5/2$. Trong mô hình lấy độc lập có hoàn lại với lô cỡ $b$,

$$
\sigma^2=\frac{17}{b}.
$$

Tốc độ hằng $\eta_t=0{,}1$ thỏa $\eta_t\le1/L=0{,}25$, nhưng

$$
\sum_{t=0}^{\infty}\eta_t^2=\infty.
$$

Vì vậy nó không thỏa lịch giảm thường dùng để làm cận trung bình tiến về $0$ khi nhiễu còn dương.

**Ý nghĩa và ứng dụng trong AI.** Định lý cung cấp một chuẩn đọc log huấn luyện: dưới giả thiết phù hợp, ta có thể khống chế trung bình chuẩn gradient, không phải chứng minh đã tìm cực tiểu toàn cục. Nó cũng giải thích vì sao bước hằng thường tạo một vùng dao động do nhiễu và vì sao tăng lô hoặc giảm bước là hai can thiệp khác nhau.

**Điểm dễ nhầm.** Kết luận về trung bình có trọng số không kéo theo mọi $\mathbb E\|\nabla F(\theta_t)\|^2$ giảm đơn điệu. Điều kiện $F$ bị chặn dưới không phải tính lồi. Không chuyển định lý này sang momentum hoặc Nesterov nếu chưa kiểm một định lý riêng cho đúng biến thể. Trong mạng sâu hữu hạn, cận phương sai đều và trơn toàn cục có thể không đúng.

**Câu hỏi kiểm tra.** Với $\eta_t=c/(t+1)^a$, khoảng nào của $a$ làm $\sum_t\eta_t=\infty$ nhưng $\sum_t\eta_t^2<\infty$? Vì sao $a=0$ không đạt yêu cầu thứ hai?

### Định lý: cận trung bình gradient của SGD không lồi trơn

**Giả thiết.** Các giả thiết ở Chủ đề 7 được thỏa, $\{\eta_t\}$ là một dãy xác định được chọn trước và SGD dùng

$$
\theta_{t+1}=\theta_t-\eta_tg_t(\theta_t).
$$

**Kết luận.** Với mọi $T\ge1$,

$$
\sum_{t=0}^{T-1}
\eta_t\mathbb E\|\nabla F(\theta_t)\|_2^2
\le
2\bigl(F(\theta_0)-F_{\inf}\bigr)
+L\sigma^2\sum_{t=0}^{T-1}\eta_t^2.
$$

Nếu $\sum_t\eta_t=\infty$ và $\sum_t\eta_t^2<\infty$, trung bình có trọng số

$$
\frac{
\sum_{t=0}^{T-1}\eta_t
\mathbb E\|\nabla F(\theta_t)\|_2^2
}{
\sum_{t=0}^{T-1}\eta_t
}
$$

tiến về $0$.

Mục Nhóm C cuối ghi chú suy ra cận này từ bổ đề giảm của hàm trơn.

### Hệ quả: chọn ngẫu nhiên một vòng để đọc cận

Chọn chỉ số $\tau\in\{0,\ldots,T-1\}$ độc lập sau khi chạy thuật toán, với

$$
\mathbb P(\tau=t)
=\frac{\eta_t}{\sum_{k=0}^{T-1}\eta_k}.
$$

Khi đó

$$
\mathbb E\|\nabla F(\theta_\tau)\|_2^2
=
\frac{
\sum_{t=0}^{T-1}\eta_t
\mathbb E\|\nabla F(\theta_t)\|_2^2
}{
\sum_{t=0}^{T-1}\eta_t
}.
$$

Cách chọn $\tau$ chuyển cận trung bình thành bảo đảm cho một đầu ra ngẫu nhiên; cận không áp dụng riêng cho vòng cuối hoặc cho mọi vòng.

## D. Quán tính: momentum và Nesterov

### 8. Momentum theo quy ước độ dời

**Mục tiêu đọc hiểu.** Người đọc thực hiện được hai vòng momentum, giải thích được vai trò của vận tốc và giữ nhất quán một quy ước cập nhật.

**Định nghĩa và giả thiết.** Cho tham số $\theta_t\in\mathbb R^d$, tốc độ học $\eta_t>0$, hệ số quán tính $0\le\beta<1$, gradient lô $g_t(\theta_t)$ và $v_0=0$. Trong ghi chú này, $v_t$ là độ dời tích lũy và đã chứa thang tốc độ học:

$$
\begin{aligned}
v_{t+1}&=\beta v_t-\eta_tg_t(\theta_t),\\
\theta_{t+1}&=\theta_t+v_{t+1}.
\end{aligned}
$$

Khi $\beta=0$, quy tắc thu về gradient ngẫu nhiên (SGD).

**Trực quan.** Thành phần gradient đổi dấu liên tục bị các độ dời trước triệt bớt. Thành phần giữ cùng dấu qua nhiều vòng được tích lũy. Trong một khe hẹp, cơ chế này có thể giảm dao động ngang và duy trì chuyển động dọc khe, nhưng không thay đổi hình học của hàm mục tiêu.

![Momentum tích lũy các độ dời trước, còn Nesterov tính gradient tại điểm nhìn trước.](img/lec-05/momentum-lookahead.svg)

**Ví dụ tính được.** Dùng

$$
\begin{aligned}
\ell_1(\theta)&=\frac12\left[(\theta_1-1)^2+4(\theta_2-1)^2\right],\\
\ell_2(\theta)&=\frac12\left[(\theta_1+1)^2+4(\theta_2+1)^2\right],
\end{aligned}
$$

với $\theta_0=(2,1)^T$, $v_0=0$, $\eta=0{,}1$, $\beta=0{,}5$, $B_0=\{1\}$ và $B_1=\{2\}$. Vòng đầu cho

$$
g_0(\theta_0)=(1,0)^T,\qquad
v_1=(-0{,}1,0)^T,\qquad
\theta_1=(1{,}9,1)^T.
$$

Ở vòng hai,

$$
g_1(\theta_1)=(2{,}9,8)^T,
$$

nên

$$
v_2=0{,}5(-0{,}1,0)^T-0{,}1(2{,}9,8)^T
=(-0{,}34,-0{,}8)^T,
$$

và $\theta_2=(1{,}56,0{,}2)^T$.

**Ý nghĩa và ứng dụng trong AI.** Momentum thêm một trạng thái nhỏ cho mỗi tham số. Trạng thái này giúp cập nhật bớt nhạy với một gradient lô riêng lẻ và thường hữu ích khi các hướng có độ cong rất khác nhau.

**Điểm dễ nhầm.** Một số tài liệu gọi trung bình động của gradient là “vận tốc” rồi đặt tốc độ học ngoài trạng thái. Quy ước đó có thể tương đương sau đổi biến, nhưng không được trộn với quy ước độ dời ở đây trong cùng phép tính. Momentum không loại bỏ nhiễu, không biến mục tiêu phi lồi thành lồi và không bảo đảm luôn nhanh hơn SGD.

**Câu hỏi kiểm tra.** Đặt $\beta=0$ trong hai phương trình cập nhật. Quy tắc nhận được có đúng bằng SGD không? Trong ví dụ, phần nào của $v_2$ đến từ trạng thái cũ?

### 9. Momentum Nesterov và điểm nhìn trước

**Mục tiêu đọc hiểu.** Người đọc xác định đúng điểm tính gradient của Nesterov và tính được hai vòng bằng cùng quy ước vận tốc của momentum.

**Định nghĩa và giả thiết.** Đặt điểm nhìn trước

$$
q_t=\theta_t+\beta v_t.
$$

Momentum Nesterov trong ghi chú này dùng

$$
\begin{aligned}
v_{t+1}&=\beta v_t-\eta_tg_t(q_t),\\
\theta_{t+1}&=\theta_t+v_{t+1}.
\end{aligned}
$$

Khác biệt với Chủ đề 8 nằm ở đối số của gradient: $q_t$ thay cho $\theta_t$.

**Trực quan.** Momentum thường trước hết đi theo quán tính rồi mới cộng gradient được đo tại vị trí cũ. Nesterov nhìn tại vị trí mà quán tính đang đưa tham số tới, sau đó dùng gradient ở đó để sửa hướng sớm hơn.

**Ví dụ tính được.** Vòng đầu trùng momentum vì $v_0=0$, nên

$$
q_0=\theta_0,\qquad
v_1=(-0{,}1,0)^T,\qquad
\theta_1=(1{,}9,1)^T.
$$

Ở vòng hai,

$$
q_1=\theta_1+0{,}5v_1=(1{,}85,1)^T.
$$

Với $B_1=\{2\}$,

$$
g_1(q_1)=(2{,}85,8)^T.
$$

Do đó

$$
v_2=0{,}5(-0{,}1,0)^T-0{,}1(2{,}85,8)^T
=(-0{,}335,-0{,}8)^T,
$$

và $\theta_2=(1{,}565,0{,}2)^T$.

**Ý nghĩa và ứng dụng trong AI.** Điểm nhìn trước có thể sửa quán tính trước khi tham số đi quá xa theo một hướng. Cơ chế này được dùng trong nhiều bộ tối ưu bậc nhất, nhưng hiệu quả phụ thuộc mục tiêu, lịch bước, cơ chế lấy lô và cách tham số hóa.

**Điểm dễ nhầm.** Dạng ngẫu nhiên với $\beta$ cố định ở đây không tự thừa hưởng tốc độ $O(1/t^2)$ của phương pháp Nesterov cổ điển cho bài toán lồi trơn xác định với dãy hệ số được thiết kế riêng. Không thay $g_t(q_t)$ bằng $g_t(\theta_t)$ sau khi đã tính điểm nhìn trước.

**Câu hỏi kiểm tra.** Trong ví dụ, nếu nhầm tính gradient tại $\theta_1$ thay vì $q_1$, thành phần thứ nhất của gradient và của $v_2$ sẽ bằng bao nhiêu?

### 10. So sánh ba vết cập nhật

**Mục tiêu đọc hiểu.** Người đọc đối chiếu được ba quy tắc trên cùng dữ kiện và nêu đúng giới hạn của một so sánh ngắn.

**Định nghĩa và giả thiết.** So sánh giữ cố định $\theta_0$, $\eta$, $\beta$, $B_0$, $B_1$ và hai hàm mất mát. Vết $B_0=\{1\}$, $B_1=\{2\}$ là một thứ tự cố định để tái lập phép tính, không phải quá trình lấy mẫu dùng trong định lý không chệch.

**Trực quan.** Ba quỹ đạo có cùng bước đầu. Ở bước hai, momentum dùng thêm vận tốc cũ; Nesterov còn dịch điểm đánh giá gradient. Khoảng cách nhỏ giữa ba điểm chỉ biểu diễn khác biệt cơ chế trong hai vòng này.

Hình ở Chủ đề 8 cho thấy đúng khác biệt này: momentum đánh giá gradient tại $\theta_t$, còn Nesterov đánh giá tại điểm nhìn trước $q_t$.

**Ví dụ tính được.** Kết quả sau hai vòng là

| Quy tắc | Điểm tính gradient ở $t=1$ | $\theta_2$ |
|---|---|---|
| SGD | $(1{,}9,1)^T$ | $(1{,}61,0{,}2)^T$ |
| Momentum | $(1{,}9,1)^T$ | $(1{,}56,0{,}2)^T$ |
| Nesterov | $(1{,}85,1)^T$ | $(1{,}565,0{,}2)^T$ |

Mục tiêu trung bình của ví dụ là

$$
F(\theta)=\frac12\theta_1^2+2\theta_2^2+\frac52,
$$

với nghiệm $\theta^*=0$. Các khoảng cách đến $0$ sau hai vòng có thể tính được, nhưng không dùng chúng để xếp hạng tổng quát ba thuật toán.

**Ý nghĩa và ứng dụng trong AI.** Một vết số ngắn phát hiện lỗi chỉ số, dấu, vị trí tính gradient và cách lưu trạng thái trước khi chạy trên mô hình lớn.

**Điểm dễ nhầm.** Một thứ tự hai mẫu có thể thiên vị một quy tắc. Kết quả trên không phải bằng chứng hội tụ, tốc độ hay khái quát hóa. Muốn so sánh thực nghiệm phải kiểm soát lịch tốc độ học, hạt giống, ngân sách tính toán và thước đo trên dữ liệu chưa thấy.

**Câu hỏi kiểm tra.** Từ bảng, hãy chỉ ra hai nguồn tạo khác biệt giữa Nesterov và SGD ở vòng hai. Kết luận nào không được phép rút ra từ ba điểm $\theta_2$?

Mọi quy tắc cập nhật đều cần một điểm đầu. Điểm đó phải phá đối xứng giữa các đơn vị và giữ thang tín hiệu phù hợp trước vòng cập nhật đầu tiên.

## E. Khởi tạo, phá đối xứng và thang tín hiệu

### 11. Đối xứng tham số và nhu cầu phá đối xứng

**Mục tiêu đọc hiểu.** Người đọc nhận biết được một đối xứng giữa các đơn vị ẩn, chứng minh đối xứng được bảo toàn qua cập nhật và chọn cách phá đối xứng.

**Định nghĩa và giả thiết.** Gọi $w_j$, $b_j$, $\phi_j$ và $c_j$ lần lượt là trọng số vào, độ chệch (bias), hàm kích hoạt và toàn bộ trọng số đi ra của đơn vị ẩn thứ $j$. Xét hai đơn vị thỏa

$$
(w_1,b_1,\phi_1,c_1)=(w_2,b_2,\phi_2,c_2),
$$

và có các trạng thái bộ tối ưu tương ứng bằng nhau. Nếu chúng nhận cùng dữ liệu, cùng lô và được cập nhật bởi cùng quy tắc xác định, phép hoán vị hai đơn vị không làm thay đổi mạng.

**Trực quan.** Hai đơn vị bắt đầu trùng nhau tạo cùng kích hoạt và nhận cùng gradient sau khi hoán vị đầy đủ. Chúng tiếp tục đi trên cùng quỹ đạo, nên chiều rộng danh nghĩa không tạo hai đặc trưng khác nhau.

Có thể đọc cơ chế này trực tiếp từ ví dụ dưới đây: hai đạo hàm bằng nhau tạo hai cập nhật bằng nhau. Chỉ cần theo dõi cặp $(w_1,w_2)$ trước và sau bước cập nhật để thấy đường chéo $w_1=w_2$ được bảo toàn.

**Ví dụ tính được.** Xét hai đơn vị tuyến tính $h_j=w_jx$ với $x=2$ và mất mát

$$
L=\frac12(h_1+h_2-y)^2.
$$

Nếu $w_1=w_2=0$ và $y=1$ thì

$$
\frac{\partial L}{\partial w_1}
=\frac{\partial L}{\partial w_2}
=(0+0-1)\,2=-2.
$$

Với cùng tốc độ học, hai trọng số vẫn bằng nhau sau bước cập nhật. Nếu khởi tạo $w_1=\varepsilon$, $w_2=-\varepsilon$, các kích hoạt ban đầu khác nhau; mạng đã có khả năng rời khỏi quỹ đạo đối xứng, dù việc tách thực tế còn phụ thuộc toàn kiến trúc và dữ liệu.

**Ý nghĩa và ứng dụng trong AI.** Khởi tạo ngẫu nhiên phá đối xứng giữa các đơn vị có vai trò giống nhau. Phá đối xứng và giữ phương sai tín hiệu là hai yêu cầu riêng: một khởi tạo có thể đạt yêu cầu thứ nhất nhưng vẫn có thang quá lớn hoặc quá nhỏ.

**Điểm dễ nhầm.** Không phải mọi tham số đều phải khác nhau. Độ chệch thường có thể khởi tạo bằng $0$ khi trọng số vào đã ngẫu nhiên. Lập luận đối xứng phải hoán vị đầy đủ cả tham số vào, hàm kích hoạt và tham số đi ra; chỉ nhìn một véc-tơ trọng số là chưa đủ.

**Câu hỏi kiểm tra.** Trong ví dụ, tính $w_1^+$ và $w_2^+$ với tốc độ học $0{,}1$. Vì sao hai đơn vị chưa học hai vai trò khác nhau?

### 12. Truyền mômen bậc hai qua một lớp

**Mục tiêu đọc hiểu.** Người đọc suy ra được mômen bậc hai của tiền kích hoạt, nêu đúng giả thiết độc lập và phân biệt mômen bậc hai với phương sai.

**Định nghĩa và giả thiết.** Xét

$$
W\in\mathbb R^{\mathrm{fan}_{\mathrm{out}}\times \mathrm{fan}_{\mathrm{in}}},
\qquad
z_j=\sum_{k=1}^{\mathrm{fan}_{\mathrm{in}}}W_{jk}a_k.
$$

Tại khởi tạo, giả sử hàng $W_{j,:}$ độc lập với $a$, các $W_{jk}$ độc lập, cùng phân phối và có trung bình $0$, còn các $a_k$ có cùng mômen bậc hai. Khi đó

$$
\operatorname{Var}(z_j)
=\mathrm{fan}_{\mathrm{in}}\operatorname{Var}(W_{jk})\mathbb E[a_k^2].
$$

Chỉ khi $\mathbb E[a_k]=0$ mới được thay $\mathbb E[a_k^2]$ bằng $\operatorname{Var}(a_k)$.

**Trực quan.** Mỗi lớp nhân thang tín hiệu xấp xỉ với $\mathrm{fan}_{\mathrm{in}}\operatorname{Var}(W)$. Sau kích hoạt, thêm một hệ số $c_\phi$ qua quan hệ

$$
\mathbb E[a_{\ell}^2]\approx c_\phi\mathbb E[z_{\ell}^2].
$$

Tích các hệ số lớn hơn $1$ qua nhiều lớp làm tín hiệu phình ra; nhỏ hơn $1$ làm tín hiệu co lại.

![Mômen bậc hai được nhân qua các lớp; Xavier cân bằng hai fan còn He bù phần mômen bị ReLU loại.](img/lec-05/variance-flow.svg)

**Ví dụ tính được.** Cho $\mathrm{fan}_{\mathrm{in}}=4$, $\mathbb E[a_k^2]=1$.

- Nếu $\operatorname{Var}(W)=1/16$ thì $\operatorname{Var}(z_j)=1/4$.
- Nếu $\operatorname{Var}(W)=1/4$ thì $\operatorname{Var}(z_j)=1$.
- Nếu $\operatorname{Var}(W)=1$ thì $\operatorname{Var}(z_j)=4$.

Nếu mỗi lớp lặp cùng hệ số lần lượt là $1/4$, $1$ hoặc $4$, sự khác biệt tăng theo lũy thừa của độ sâu.

**Ý nghĩa và ứng dụng trong AI.** Công thức cho một tiêu chuẩn chọn thang khởi tạo trước khi huấn luyện: giữ tín hiệu và gradient ở phạm vi số hữu ích qua nhiều lớp. Phân tích chỉ mô tả thời điểm khởi tạo, chưa mô hình hóa toàn bộ quá trình học.

**Điểm dễ nhầm.** Công thức dựa trên các xấp xỉ độc lập và trung bình $0$. Tương quan giữa đơn vị, độ chệch, tích chập chia sẻ trọng số, kết nối tắt và chuẩn hóa có thể làm sai mô hình. Không đổi $\operatorname{Var}$ thành $\operatorname{Std}$ mà quên căn bậc hai.

**Câu hỏi kiểm tra.** Nếu $\mathbb E[a_k]=1$ và $\operatorname{Var}(a_k)=2$, mômen $\mathbb E[a_k^2]$ bằng bao nhiêu? Đại lượng nào phải được dùng trong công thức tổng quát?

### 13. Khởi tạo Xavier/Glorot và He

**Mục tiêu đọc hiểu.** Người đọc chọn đúng quy tắc khởi tạo theo hàm kích hoạt và chuyển đúng giữa phương sai, độ lệch chuẩn và nửa độ rộng của phân phối đều.

**Định nghĩa và giả thiết.** Với kích hoạt gần tuyến tính trong miền khởi tạo, thường gặp ở tanh, khởi tạo Xavier/Glorot dùng thỏa hiệp

$$
\operatorname{Var}(W_{jk})
=\frac{2}{\mathrm{fan}_{\mathrm{in}}+\mathrm{fan}_{\mathrm{out}}}.
$$

Với ReLU và tiền kích hoạt gần đối xứng quanh $0$, khởi tạo He dùng

$$
\operatorname{Var}(W_{jk})
=\frac{2}{\mathrm{fan}_{\mathrm{in}}}.
$$

Hai quy tắc là lựa chọn thang ban đầu dưới các giả thiết mômen, không phải định lý hội tụ của huấn luyện.

**Trực quan.** Xavier thỏa hiệp giữa mục tiêu truyền thuận $1/\mathrm{fan}_{\mathrm{in}}$ và truyền ngược $1/\mathrm{fan}_{\mathrm{out}}$. ReLU đặt các giá trị âm về $0$; với phân phối đối xứng, mômen bậc hai sau ReLU xấp xỉ một nửa trước kích hoạt, nên He tăng phương sai trọng số lên hệ số $2/\mathrm{fan}_{\mathrm{in}}$.

**Ví dụ tính được.** Với $\mathrm{fan}_{\mathrm{in}}=4$ và $\mathrm{fan}_{\mathrm{out}}=2$:

$$
\operatorname{Var}_{\mathrm{Xavier}}(W)=\frac13,
\qquad
\operatorname{Std}_{\mathrm{Xavier}}(W)=\frac1{\sqrt3}.
$$

Một phân phối đều cùng phương sai là

$$
W_{jk}\sim\mathcal U[-1,1],
$$

vì phân phối đều trên $[-a,a]$ có phương sai $a^2/3$. Với He,

$$
\operatorname{Var}_{\mathrm{He}}(W)=\frac12,
\qquad
\operatorname{Std}_{\mathrm{He}}(W)=\frac1{\sqrt2}.
$$

Nếu dùng phân phối đều cùng phương sai He thì nửa độ rộng là $\sqrt{3/2}$.

**Ý nghĩa và ứng dụng trong AI.** Xavier thường là điểm đầu hợp lý cho tanh hoặc kích hoạt gần tuyến tính; He phù hợp hơn với ReLU. Quy tắc cần được điều chỉnh khi kiến trúc, hệ số khuếch đại của kích hoạt hoặc phép chuẩn hóa thay đổi.

**Điểm dễ nhầm.** $\sqrt{2/(\mathrm{fan}_{\mathrm{in}}+\mathrm{fan}_{\mathrm{out}})}$ là độ lệch chuẩn Xavier, không phải phương sai. Tương tự, $\sqrt{2/\mathrm{fan}_{\mathrm{in}}}$ là độ lệch chuẩn He. “Xavier cho tanh, He cho ReLU” là quy tắc khởi đầu có giả thiết, không phải luật không ngoại lệ.

**Câu hỏi kiểm tra.** Với một lớp ReLU có $\mathrm{fan}_{\mathrm{in}}=100$, hãy tính phương sai và độ lệch chuẩn He. Với lớp tanh có $\mathrm{fan}_{\mathrm{in}}=100$, $\mathrm{fan}_{\mathrm{out}}=50$, hãy tính hai đại lượng Xavier.

## F. Ca tích hợp và bản đồ quyết định

### 14. Thiết kế một quy trình huấn luyện có thể kiểm chứng

**Mục tiêu đọc hiểu.** Người đọc ghép mục tiêu, khởi tạo, lấy lô, cập nhật và đánh giá thành một quy trình có thể tái lập, rồi chọn can thiệp theo đúng tín hiệu.

**Định nghĩa và giả thiết.** Một cấu hình tối thiểu phải công bố: mô hình và khởi tạo; mục tiêu tổng hữu hạn; cơ chế lấy lô; tốc độ học và lịch của nó; trạng thái momentum nếu có; tập xác thực và tiêu chuẩn dừng. Xét một mạng ReLU khởi tạo He, huấn luyện bằng lô nhỏ với momentum và dừng theo mất mát xác thực.

**Trực quan.** Sơ đồ chữ của vòng cập nhật là $\text{khởi tạo}\to\text{lấy lô}\to\text{tính gradient}\to\text{cập nhật trạng thái và tham số}$. Nhánh đánh giá dùng tập xác thực để quyết định dừng, nhưng không đưa gradient xác thực vào cập nhật.

**Ví dụ tính được.** Dùng lại vết hai mẫu với $\eta=0{,}1$, $\beta=0{,}5$. Sau hai vòng momentum, $\theta_2=(1{,}56,0{,}2)^T$. Giả sử đồng thời quan sát bốn tín hiệu:

| Tín hiệu | Can thiệp phù hợp | Phép đo kiểm tra |
|---|---|---|
| Gradient đổi mạnh giữa các lô | tăng $b$ | phương sai gradient theo lô |
| Quỹ đạo đổi dấu trong khe | momentum | dao động theo hướng cong lớn |
| Mất mát huấn luyện giảm nhưng xác thực tăng | dừng sớm | đáy của đường xác thực |
| Mômen kích hoạt co mạnh qua lớp ReLU | khởi tạo He | mômen bậc hai theo lớp tại khởi tạo |

Mỗi can thiệp xử lý một cơ chế khác. Không thay dừng sớm bằng tăng lô, hoặc thay khởi tạo đúng thang bằng momentum.

**Ý nghĩa và ứng dụng trong AI.** Bảng ghép mỗi tín hiệu với một can thiệp và phép đo kiểm tra. Hồ sơ tái lập cần lưu hạt giống, thứ tự hoặc cơ chế lấy lô, siêu tham số, trạng thái bộ tối ưu và thời điểm dừng.

**Điểm dễ nhầm.** Khởi tạo xảy ra trước vòng cập nhật đầu tiên. Tập kiểm tra không dùng để chọn siêu tham số hay dừng. Các bảo đảm SGD có điều kiện không chuyển nguyên dạng sang mạng sâu phi lồi với momentum.

**Câu hỏi kiểm tra.** Với bốn tín hiệu trong bảng, hãy giải thích vì sao ba can thiệp còn lại không thay thế trực tiếp can thiệp được ghép. Cần lưu những trạng thái nào để tiếp tục một lần chạy momentum đúng chỗ đã dừng?

## Các định lý và chứng minh quan trọng: Nhóm A–C

Phần này trình bày chi tiết năm chứng minh đã được viện dẫn trong các phần A–C. Mỗi chứng minh dùng đúng giả thiết và ký hiệu của phát biểu tương ứng.

### Nhóm A: tính trơn và lồi của mất mát logistic theo biên

::: proof
Với $\phi(m)=\log(1+e^{-m})$, ta tính được

$$
\phi'(m)=-\frac1{1+e^m}<0
$$

và

$$
\phi''(m)=\frac{e^m}{(1+e^m)^2}>0.
$$

Đạo hàm thứ nhất âm cho thấy biên lớn hơn làm mất mát nhỏ hơn. Đạo hàm thứ hai dương cho thấy $\phi$ lồi theo biến biên $m$. Kết luận này chưa nói hàm hợp $\phi(yf_\theta(x))$ lồi theo $\theta$; điều đó còn phụ thuộc dạng của $f_\theta$.
:::

### Nhóm B: kiểm tra bậc hai tại điểm dừng

::: proof
Đặt $H=\nabla^2f(x^*)$. Khai triển Taylor cho

$$
f(x^*+h)-f(x^*)
=\frac12h^THh+o(\|h\|_2^2).
$$

Nếu $H\succ0$, tồn tại $\mu>0$ sao cho $h^THh\ge\mu\|h\|_2^2$. Với $h$ đủ nhỏ, số dư có độ lớn không quá $\mu\|h\|_2^2/4$, nên hiệu hàm dương với mọi $h\ne0$. Trường hợp $H\prec0$ tương tự sau khi đổi dấu.

Nếu $H$ bất định, tồn tại hai hướng đơn vị $a,b$ sao cho $a^THa>0$ và $b^THb<0$. Với $t$ đủ nhỏ, hạng bậc hai chi phối số dư trên cả hai tia $ta,tb$; hàm tăng theo một hướng và giảm theo hướng kia. Do đó $x^*$ là điểm yên ngựa.
:::

### Nhóm B: cận chuẩn cho gradient truyền ngược

::: proof
Đẳng thức dây chuyền đã cho là tích ma trận–véc-tơ. Áp dụng liên tiếp tính dưới nhân của chuẩn toán tử,

$$
\|A z\|_2\le\|A\|_2\|z\|_2,
$$

cho từng $J_k^T$ tạo cận trên. Với cận dưới, dùng

$$
\|J_k^Tz\|_2\ge\sigma_{\min}(J_k)\|z\|_2
$$

và lặp lại qua các lớp. Điều kiện trị kỳ dị nhỏ nhất dương là điểm quyết định; nếu một Jacobian triệt một hướng, cận dưới có thể bằng $0$.
:::

### Nhóm C: gradient lô không chệch và giảm phương sai theo $1/b$

::: proof
Tính tuyến tính của kỳ vọng cho đẳng thức không chệch. Đặt

$$
\xi_j=Z_j-\nabla F(\theta_t).
$$

Điều kiện theo $\mathcal F_t$, các $\xi_j$ độc lập và có trung bình $0$. Do đó các tích chéo có kỳ vọng bằng $0$:

$$
\mathbb E[\xi_i^T\xi_j\mid\mathcal F_t]=0,
\qquad i\ne j.
$$

Suy ra

$$
\begin{aligned}
\mathbb E\left[
\left\|\frac1{b_t}\sum_{j=1}^{b_t}\xi_j\right\|_2^2
\middle|\mathcal F_t\right]
&=\frac1{b_t^2}
\sum_{j=1}^{b_t}
\mathbb E[\|\xi_j\|_2^2\mid\mathcal F_t]\\
&\le\frac{\sigma_1^2}{b_t}.
\end{aligned}
$$

Tính độc lập và trung bình bằng $0$ triệt các hạng chéo ở bước này.
:::

### Nhóm C: cận trung bình gradient của SGD không lồi trơn

::: proof
Bổ đề giảm của hàm $L$-trơn cho

$$
F(\theta_{t+1})
\le
F(\theta_t)
-\eta_t\nabla F(\theta_t)^Tg_t
+\frac{L\eta_t^2}{2}\|g_t\|_2^2.
$$

Lấy kỳ vọng có điều kiện theo $\mathcal F_t$. Tính không chệch cho

$$
\mathbb E[\nabla F(\theta_t)^Tg_t\mid\mathcal F_t]
=\|\nabla F(\theta_t)\|_2^2.
$$

Phân rã phương sai cho

$$
\mathbb E[\|g_t\|_2^2\mid\mathcal F_t]
\le
\|\nabla F(\theta_t)\|_2^2+\sigma^2.
$$

Do $\eta_t\le1/L$,

$$
\mathbb E[F(\theta_{t+1})\mid\mathcal F_t]
\le
F(\theta_t)
-\frac{\eta_t}{2}\|\nabla F(\theta_t)\|_2^2
+\frac{L\eta_t^2}{2}\sigma^2.
$$

Lấy kỳ vọng toàn phần, cộng từ $t=0$ đến $T-1$ và dùng $F(\theta_T)\ge F_{\inf}$ cho cận thứ nhất. Chia hai vế cho $\sum_{t<T}\eta_t$; tử số nhiễu chứa một tổng hội tụ còn mẫu số tiến ra vô hạn, nên trung bình có trọng số tiến về $0$.
:::

## Các định lý và chứng minh quan trọng: Nhóm D

### Mệnh đề: momentum là tổng có trọng số của các gradient trước

**Giả thiết.** Dùng tốc độ học không đổi $\eta>0$, $v_0=0$ và

$$
v_{t+1}=\beta v_t-\eta g_t(\theta_t),
\qquad 0\le\beta<1.
$$

**Kết luận.** Với mọi $t\ge0$,

$$
v_{t+1}
=-\eta\sum_{k=0}^{t}\beta^{t-k}g_k(\theta_k).
$$

::: proof
Với $t=0$, công thức cho $v_1=-\eta g_0(\theta_0)$, đúng vì $v_0=0$. Giả sử công thức đúng tại $t-1$:

$$
v_t=-\eta\sum_{k=0}^{t-1}\beta^{t-1-k}g_k(\theta_k).
$$

Thế vào truy hồi,

$$
\begin{aligned}
v_{t+1}
&=\beta v_t-\eta g_t(\theta_t)\\
&=-\eta\sum_{k=0}^{t-1}\beta^{t-k}g_k(\theta_k)
-\eta g_t(\theta_t)\\
&=-\eta\sum_{k=0}^{t}\beta^{t-k}g_k(\theta_k).
\end{aligned}
$$

Quy nạp hoàn tất chứng minh. Trọng số hình học cho thấy gradient gần hiện tại có trọng số lớn hơn; đẳng thức không tự cho một kết luận hội tụ.
:::

### Hệ quả: $\beta=0$ đưa momentum và Nesterov về SGD

**Giả thiết.** Dùng hai quy tắc ở Chủ đề 8–9 với $\beta=0$.

**Kết luận.** Cả hai đều cho

$$
\theta_{t+1}=\theta_t-\eta_tg_t(\theta_t).
$$

::: proof
Với momentum, $v_{t+1}=-\eta_tg_t(\theta_t)$. Với Nesterov, $q_t=\theta_t$, nên cùng đẳng thức cho $v_{t+1}$. Cập nhật $\theta_{t+1}=\theta_t+v_{t+1}$ hoàn tất kết luận.
:::

## Các định lý và chứng minh quan trọng: Nhóm E

### Mệnh đề: cập nhật giống nhau bảo toàn đối xứng đơn vị

**Giả thiết.** Hai đơn vị của cùng một lớp có toàn bộ tham số tương ứng bằng nhau: trọng số vào, độ chệch, hàm kích hoạt và trọng số đi ra. Các trạng thái bộ tối ưu tương ứng cũng bằng nhau. Hai đơn vị nhận cùng lô, dùng cùng quy tắc cập nhật xác định và không có nhiễu riêng.

**Kết luận.** Nếu hai bộ tham số bằng nhau ở vòng $t$, chúng vẫn bằng nhau ở vòng $t+1$.

::: proof
Do các trọng số vào và độ chệch bằng nhau, hai đơn vị tạo cùng tiền kích hoạt và kích hoạt trên mọi mẫu của lô. Các trọng số đi ra bằng nhau làm mất mát bất biến dưới phép đổi chỗ hai đơn vị. Vì vậy gradient theo hai bộ tham số là ảnh hoán vị của nhau và có cùng giá trị trong hệ tọa độ tương ứng. Áp dụng cùng quy tắc cập nhật xác định cho các tham số và trạng thái bằng nhau tạo các giá trị mới bằng nhau. Lặp lập luận theo vòng cho thấy đối xứng được bảo toàn.
:::

### Định lý: mômen bậc hai của tiền kích hoạt

**Giả thiết.** Trong

$$
z_j=\sum_{k=1}^{\mathrm{fan}_{\mathrm{in}}}W_{jk}a_k,
$$

các $W_{jk}$ độc lập, cùng phân phối, có trung bình $0$ và độc lập với $a$; các $a_k$ có cùng mômen bậc hai hữu hạn.

**Kết luận.** Ta có

$$
\operatorname{Var}(z_j)
=\mathrm{fan}_{\mathrm{in}}\operatorname{Var}(W_{jk})\mathbb E[a_k^2].
$$

::: proof
Do $\mathbb E[W_{jk}]=0$ và $W_{jk}$ độc lập với $a_k$,

$$
\mathbb E[W_{jk}a_k]=0,
$$

nên $\mathbb E[z_j]=0$. Khi khai triển $\mathbb E[z_j^2]$, các hạng chéo có kỳ vọng bằng $0$ do trọng số độc lập và có trung bình $0$. Vì vậy

$$
\begin{aligned}
\operatorname{Var}(z_j)
&=\mathbb E[z_j^2]\\
&=\sum_{k=1}^{\mathrm{fan}_{\mathrm{in}}}\mathbb E[W_{jk}^2]\mathbb E[a_k^2]\\
&=\mathrm{fan}_{\mathrm{in}}\operatorname{Var}(W_{jk})\mathbb E[a_k^2].
\end{aligned}
$$

Nếu $\mathbb E[a_k]=0$, đẳng thức $\mathbb E[a_k^2]=\operatorname{Var}(a_k)$ cho dạng thường gặp.
:::

### Phác thảo: thang Xavier/Glorot

**Giả thiết.** Một lớp đầy đủ ở khởi tạo thỏa các giả thiết mômen trên; kích hoạt gần tuyến tính và muốn giữ thang ở cả truyền thuận lẫn truyền ngược.

**Kết luận.** Hai mục tiêu riêng là

$$
\operatorname{Var}(W)\approx\frac1{\mathrm{fan}_{\mathrm{in}}},
\qquad
\operatorname{Var}(W)\approx\frac1{\mathrm{fan}_{\mathrm{out}}}.
$$

Thỏa hiệp Xavier/Glorot dùng

$$
\operatorname{Var}(W)=\frac{2}{\mathrm{fan}_{\mathrm{in}}+\mathrm{fan}_{\mathrm{out}}}.
$$

**Ý tưởng chứng minh.** Công thức mômen thuận tạo mục tiêu thứ nhất. Áp dụng lập luận tương tự cho gradient truyền ngược tạo mục tiêu thứ hai. Khi hai fan khác nhau, không thể thỏa đồng thời chính xác; trung bình điều hòa của hai thang cho công thức trên. Phép dẫn này chỉ chọn thang tại khởi tạo và không chứng minh hội tụ.

### Phác thảo: thang He cho ReLU

**Giả thiết.** Tiền kích hoạt $z$ có phân phối đối xứng quanh $0$, có mômen bậc hai hữu hạn, và $a=\operatorname{ReLU}(z)$.

**Kết luận.** Ta có

$$
\mathbb E[a^2]=\frac12\mathbb E[z^2].
$$

Để giữ mômen bậc hai qua lớp, chọn

$$
\operatorname{Var}(W)=\frac2{\mathrm{fan}_{\mathrm{in}}}.
$$

**Ý tưởng chứng minh.** Vì phân phối đối xứng, hai nửa $z>0$ và $z<0$ đóng góp bằng nhau vào $\mathbb E[z^2]$. ReLU giữ nửa dương và đặt nửa âm về $0$, nên mômen còn một nửa. Thế $c_\phi=1/2$ vào hệ số $c_\phi \mathrm{fan}_{\mathrm{in}}\operatorname{Var}(W)$ và đặt hệ số này bằng $1$ cho kết luận.

## Các định lý và chứng minh quan trọng: Nhóm F

### Nhận xét: mỗi can thiệp cần một tín hiệu và phép đo riêng

Khung ở Chủ đề 14 là một quy tắc chẩn đoán, không phải định lý hội tụ. Tăng kích thước lô làm giảm phương sai ước lượng dưới mô hình lấy mẫu phù hợp; momentum thay đổi truy hồi cập nhật; dừng sớm chọn thời điểm bằng tập xác thực; He thay thang tín hiệu tại khởi tạo. Không có phép suy luận toán học nào cho phép đổi tùy ý bốn công cụ này cho nhau.

## Bản đồ tổng hợp

| Tín hiệu | Đại lượng cần kiểm tra | Can thiệp trong Bài 05 | Không được kết luận |
|---|---|---|---|
| Mất mát huấn luyện và xác thực tách nhau | $\widehat R_n$, $\widehat R_{\mathrm{val}}$ | dừng sớm hoặc xem lại mô hình | mất mát kiểm tra đã được tối ưu |
| Gradient lô biến thiên mạnh | phương sai theo lô, kích thước $b$ | tăng $b$ hoặc điều chỉnh $\eta_t$ | điều kiện hóa đã được sửa |
| Quỹ đạo dao động qua khe | thành phần gradient và độ dời | momentum hoặc Nesterov | mục tiêu đã trở thành lồi |
| Gradient tiêu biến hoặc bùng nổ qua sâu | mômen kích hoạt và gradient theo lớp | chọn Xavier hoặc He đúng giả thiết | thang tốt bảo đảm hội tụ |
| Gradient nhỏ tại một điểm phi lồi | Hessian hoặc hướng cong | chẩn đoán điểm dừng | đã đạt cực tiểu toàn cục |

Chuỗi triển khai là

$$
\text{chọn mục tiêu và điểm đầu}
\longrightarrow
\text{lấy lô và tính gradient}
\longrightarrow
\text{cập nhật trạng thái}
\longrightarrow
\text{đánh giá và dừng}.
$$

Bài 04 cung cấp khuôn hướng–bước–dừng cùng phân tích gradient, Hessian và điều kiện hóa. Bài 05 thay gradient xác định bằng gradient từ dữ liệu, thêm momentum và kiểm soát thang khởi tạo. Bài 06 mới xét AdaGrad, RMSProp, Adam, phương pháp bậc hai cho mạng sâu, chuẩn hóa theo lô, hạ tọa độ, lấy trung bình tham số và các chiến lược thay đổi tuyến huấn luyện.

## Tài liệu tham khảo

1. Ian Goodfellow, Yoshua Bengio và Aaron Courville (2016), *Deep Learning*, MIT Press, Chương 8, đặc biệt §§8.1–8.4 về khác biệt giữa tối ưu thuần túy và học máy, thách thức tối ưu mạng sâu, SGD, momentum và khởi tạo tham số.
2. Xavier Glorot và Yoshua Bengio (2010), “Understanding the difficulty of training deep feedforward neural networks”, *Proceedings of AISTATS 2010*, PMLR 9:249–256. Dùng cho trực giác bão hòa và quy tắc khởi tạo Glorot.
3. Ilya Sutskever, James Martens, George Dahl và Geoffrey Hinton (2013), “On the importance of initialization and momentum in deep learning”, *Proceedings of ICML 2013*, PMLR 28(3):1139–1147. Dùng cho bối cảnh thực nghiệm của momentum và khởi tạo; không suy thành bảo đảm phổ quát.
4. Kaiming He, Xiangyu Zhang, Shaoqing Ren và Jian Sun (2015), “Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification”, *Proceedings of ICCV 2015*. Dùng cho quy tắc khởi tạo He.
