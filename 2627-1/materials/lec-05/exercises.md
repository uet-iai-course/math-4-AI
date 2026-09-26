# Bài tập Bài 05 — Các phương pháp tối ưu trong huấn luyện mô hình học sâu

Bộ bài tập gồm các nhiệm vụ nhận biết, tính toán, chứng minh và vận dụng vào học máy. Chuẩn đầu ra bài học (LLO) 11 liên quan mục tiêu và thách thức tối ưu; LLO12 liên quan gradient và cập nhật; LLO13 liên quan khởi tạo tham số. Các bài dùng kiến thức và giả thiết đã trình bày trong ghi chú bài giảng.

## Bài 1. Mục tiêu huấn luyện và lựa chọn mô hình

Mức độ: nhận biết và tính toán. LLO11.

Cho ba quan sát $y=(-1,1,3)$, mô hình dự đoán hằng $f_\theta=\theta$ với $\theta\in\mathbb R$, mất mát $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$ và $J(\theta)=\tfrac13\sum_{i=1}^3\ell_i(\theta)$.

1. Biểu diễn $J$ dưới dạng bình phương hoàn chỉnh; xác định nghiệm và giá trị cực tiểu.
2. Hai thời điểm A và B của một phiên huấn luyện khác có số liệu giả lập sau. Xác định thời điểm được chọn nếu tiêu chí là lỗi xác thực; phân biệt kết luận này với kết luận về rủi ro kỳ vọng.

| Thời điểm | Mất mát huấn luyện | Lỗi xác thực |
|---|---:|---:|
| A | 0.24 | 0.12 |
| B | 0.18 | 0.16 |

3. Với $s(u,v)=u^2-v^2$, xác định ý nghĩa của $\nabla s(0,0)=0$ đối với việc chứng nhận cực tiểu.

::: solution
Ta có

$$
J(\theta)=\frac16[(\theta+1)^2+(\theta-1)^2+(\theta-3)^2]
=\frac12(\theta-1)^2+\frac43.
$$

Nghiệm duy nhất là $\theta=1$, giá trị cực tiểu $4/3$. Theo tiêu chí lỗi xác thực, chọn A vì $0.12<0.16$. Đây là lựa chọn trên tập xác thực hữu hạn, chưa chứng minh thứ tự rủi ro kỳ vọng trên mọi phân phối triển khai. Tập kiểm thử dành cho đánh giá sau lựa chọn.

Với $s$, gradient ở gốc bằng không nhưng $s(u,0)=u^2>0$ và $s(0,v)=-v^2<0$ khi tọa độ khác không. Gốc là điểm yên ngựa, không phải cực tiểu.
:::

## Bài 2. Kỳ vọng và hiệp phương sai của gradient nhóm

Mức độ: chứng minh. LLO12.

Cố định tập dữ liệu $D$ gồm $N\ge1$ mẫu và tham số $\theta\in\mathbb R^p$. Giả sử mọi $\ell_i$ khả vi tại $\theta$. Đặt

$$
g_i=\nabla\ell_i(\theta),\qquad
\bar g=\frac1N\sum_{i=1}^N g_i,\qquad
\Sigma=\frac1N\sum_{i=1}^N(g_i-\bar g)(g_i-\bar g)^T.
$$

Cho $b\in\mathbb N_{>0}$. Lấy $I_1,\ldots,I_b$ độc lập, phân phối đều trên $\{1,\ldots,N\}$, có hoàn lại, và $\widehat g=b^{-1}\sum_{r=1}^b g_{I_r}$. Chứng minh $\mathbb E[\widehat g\mid D,\theta]=\nabla J(\theta)$ và $\operatorname{Cov}(\widehat g\mid D,\theta)=\Sigma/b$. Xác định kích thước của các đại lượng và vị trí sử dụng tính độc lập.

::: solution
Các $g_i,\bar g,\widehat g$ thuộc $\mathbb R^p$; $\Sigma$ là ma trận $p\times p$. Do tổng hữu hạn và tính khả vi, $\bar g=\nabla J(\theta)$. Tính đều cho $\mathbb E[g_{I_r}\mid D,\theta]=\bar g$, nên tính tuyến tính của kỳ vọng cho kết luận thứ nhất.

Đặt $\xi_r=g_{I_r}-\bar g$. Các $\xi_r$ có kỳ vọng bằng không và $\mathbb E[\xi_r\xi_r^T\mid D,\theta]=\Sigma$. Khi $r\ne s$, tính độc lập cho $\mathbb E[\xi_r\xi_s^T\mid D,\theta]=0$. Vì vậy

$$
\operatorname{Cov}(\widehat g\mid D,\theta)
=\frac1{b^2}\sum_{r,s=1}^b\mathbb E[\xi_r\xi_s^T\mid D,\theta]
=\frac{b\Sigma}{b^2}.
$$

Cơ chế lấy mẫu quyết định việc triệt các hạng chéo. Công thức này không tự áp dụng cho một nhóm lấy không hoàn lại hoặc các mẫu có tương quan. Đích kỳ vọng là gradient của mục tiêu thực nghiệm $J$, không mặc nhiên là gradient của $R$.
:::

## Bài 3. Một bước SGD tại nghiệm thực nghiệm

Mức độ: tính toán và giải thích. LLO12.

Cho $y=(-1,1,3)$, $\ell_i(\theta)=\tfrac12(\theta-y_i)^2$ và $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$. Tại $\theta=1$, lấy hai chỉ số độc lập đều có hoàn lại. Ký hiệu $\widehat g$ là gradient trung bình của nhóm và cập nhật $\theta^+=1-0.1\widehat g$.

1. Xác định phân phối xác suất của $\widehat g$.
2. Tính $\mathbb E\widehat g$, $\operatorname{Var}(\widehat g)$ và $\mathbb E[J(\theta^+)-J(1)]$.
3. Trong lần lấy nhóm nhận $y=-1$ và $y=1$, tính $\widehat g$, $\theta^+$ và thay đổi $J$. Giải thích quan hệ với tính không chệch.

::: solution
Gradient của một mẫu nhận các giá trị $2,0,-2$, mỗi giá trị có xác suất $1/3$. Chín cặp có thứ tự đồng xác suất cho

| $\widehat g$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|---:|---:|---:|---:|---:|
| Xác suất | $1/9$ | $2/9$ | $3/9$ | $2/9$ | $1/9$ |

Do đó $\mathbb E\widehat g=0$ và $\operatorname{Var}(\widehat g)=4/3$. Từ dạng bình phương của $J$,

$$
J(\theta^+)-J(1)=\frac12(0.1\widehat g)^2,
\qquad
\mathbb E[J(\theta^+)-J(1)]=\frac1{150}.
$$

Nhóm đã cho có hai gradient $2,0$, nên $\widehat g=1$, $\theta^+=0.9$ và $\Delta J=0.005$. Tính không chệch quy định trung bình của hướng ước lượng; nó không bảo đảm giảm mất mát sau từng bước, cũng không bảo đảm giảm kỳ vọng mất mát tại nghiệm khi nhiễu còn dương.
:::

## Bài 4. Độ cong và điều kiện co của bước gradient

Mức độ: tính toán và chứng minh. LLO11–12.

Cho $\theta\in\mathbb R^2$ và

$$
q(\theta)=\frac12\left(3[\theta]_1^2+7[\theta]_2^2\right).
$$

1. Tính gradient, Hessian và biểu thức cập nhật $\theta^+=\theta-\eta\nabla q(\theta)$ theo từng tọa độ.
2. Xác định khoảng $\eta>0$ để cả hai tọa độ đều co nghiêm ngặt theo trị tuyệt đối khi tọa độ ban đầu khác không.
3. Với $\theta_0=(2,4)^T$, tính bước đầu khi $\eta=1/4$. Với $\eta=2/7$, phân tích tọa độ thứ hai qua các bước.

::: solution
Ta có $\nabla q=(3[\theta]_1,7[\theta]_2)^T$, $H=\operatorname{diag}(3,7)$ và

$$
[\theta^+]_1=(1-3\eta)[\theta]_1,\qquad
[\theta^+]_2=(1-7\eta)[\theta]_2.
$$

Điều kiện co là $|1-3\eta|<1$ và $|1-7\eta|<1$, tương đương $0<\eta<2/7$. Với $\eta=1/4$, hai hệ số bằng $1/4$ và $-3/4$, nên $\theta_1=(0.5,-3)^T$. Tọa độ thứ hai đổi dấu và giảm trị tuyệt đối.

Tại $\eta=2/7$, hệ số thứ hai bằng $-1$. Nếu tọa độ này ban đầu khác không, nó đổi dấu qua từng bước nhưng giữ nguyên trị tuyệt đối; dãy tham số không hội tụ về gốc. Kết quả áp dụng cho hàm bậc hai đã cho.
:::

## Bài 5. Trạng thái momentum và đối chứng cùng bước học

Mức độ: tính toán và chứng minh. LLO12.

Cho $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$, $\theta_0=(2,4)^T$, $v_0=0$, $\eta=0.05$, $\beta=0.5$. Momentum dùng

$$
v_{t+1}=\beta v_t-\eta\nabla q(\theta_t),\qquad
\theta_{t+1}=\theta_t+v_{t+1}.
$$

1. Tính hai bước momentum và hai bước hạ gradient dùng cùng $\eta$.
2. Tính giá trị $q$ tại hai kết quả sau bước thứ hai; nêu phạm vi của phép so sánh.
3. Với gradient bất kỳ $\widehat g_t$ và $\eta,\beta$ cố định, chứng minh $v_{t+1}=-\eta\sum_{s=0}^t\beta^{t-s}\widehat g_s$ khi $v_0=0$.

::: solution
Bước đầu chung là $\nabla q(\theta_0)=(6,28)^T$, $v_1=(-0.3,-1.4)^T$, $\theta_1=(1.7,2.6)^T$. Tại $\theta_1$, gradient bằng $(5.1,18.2)^T$. Momentum cho

$$
v_2=(-0.405,-1.61)^T,\qquad
\theta_2=(1.295,0.99)^T.
$$

Hạ gradient cho $\theta_2^{\mathrm{GD}}=(1.445,1.69)^T$. Thay trực tiếp vào $q$:

$$
q(\theta_2)=5.9458875,\qquad
q(\theta_2^{\mathrm{GD}})=13.1283875.
$$

Momentum cho giá trị nhỏ hơn ở bước thứ hai của cấu hình này. Hai bước không chứng minh nó luôn tốt hơn trên hàm khác hoặc tham số khác.

Công thức tổng đúng khi $t=0$ vì $v_1=-\eta\widehat g_0$. Nếu đúng tại $t-1$, thay vào truy hồi được

$$
v_{t+1}=-\eta\sum_{s=0}^{t-1}\beta^{t-s}\widehat g_s-\eta\widehat g_t
=-\eta\sum_{s=0}^t\beta^{t-s}\widehat g_s.
$$

Đây là tổng có trọng số. Tổng các trọng số $\sum_{s=0}^t\beta^{t-s}$ nói chung không bằng 1, nên biểu thức không phải trung bình đã chuẩn hóa.
:::

## Bài 6. Điểm đánh giá gradient của Nesterov

Mức độ: tính toán và phân tích. LLO12.

Cho $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$, trạng thái $\theta=(1,1)^T$, $v=(-0.2,0.2)^T$, $\eta=0.05$, $\beta=0.5$. Momentum tính gradient tại $\theta$. Nesterov đặt $\widetilde\theta=\theta+\beta v$, tính gradient tại $\widetilde\theta$, rồi dùng $v^+=\beta v-\eta\nabla q(\widetilde\theta)$ và $\theta^+=\theta+v^+$.

1. Tính điểm đánh giá gradient, gradient, $v^+$ và $\theta^+$ của mỗi phương pháp.
2. Kiểm tra $\nabla q(\widetilde\theta)-\nabla q(\theta)=H\beta v$.
3. Xác định kết quả khi $\beta=0$ và giải thích vì sao không được cộng điểm dự báo hai lần.

::: solution
Momentum có $g=(3,7)^T$, $v^+=(-0.25,-0.25)^T$, $\theta^+=(0.75,0.75)^T$.

Nesterov có $\widetilde\theta=(0.9,1.1)^T$, $g=(2.7,7.7)^T$, $v^+=(-0.235,-0.285)^T$, $\theta^+=(0.765,0.715)^T$. Hiệu hai gradient là $(-0.3,0.7)^T$, đúng bằng $\operatorname{diag}(3,7)(-0.1,0.1)^T$.

Khi $\beta=0$, điểm dự báo trùng $\theta$ và cả hai phương pháp trở thành hạ gradient thông thường; với gradient nhóm, chúng trở thành SGD. Vận tốc mới đã chứa $\beta v$, nên cập nhật từ $\widetilde\theta$ bằng cách cộng thêm $v^+$ sẽ cộng phần quán tính hai lần và tạo quy tắc khác.
:::

## Bài 7. Quy tắc dây chuyền và đối xứng đơn vị ẩn

Mức độ: tính toán và chứng minh. LLO13.

Cho

$$
z_j=w_jx+b_j,\qquad h_j=\operatorname{ReLU}(z_j),\qquad
f_\theta(x)=a_1h_1+a_2h_2,\qquad
\ell=\frac12(f_\theta(x)-y)^2.
$$

Mọi đại lượng là vô hướng. Tại $x=2,y=1,w_1=w_2=0.5,a_1=a_2=1,b_1=b_2=0$, thực hiện các yêu cầu sau.

1. Tính đầu ra, mất mát và đạo hàm theo cả sáu tham số. Tính một bước hạ gradient với $\eta=0.1$.
2. Chứng minh hai đơn vị giữ đối xứng qua các bước nếu tham số tương ứng, trạng thái cập nhật, quy tắc và dữ liệu dùng chung đều giống nhau, không có nhiễu riêng; các gradient đều được xét tại điểm khả vi.
3. Với $x=1,y=0,w_1=0.8,w_2=1.2,a_1=a_2=1,b_j=0$, tính gradient theo hai trọng số đầu ra và phân tích sự khác nhau.

::: solution
Ta có $z_j=h_j=1$, $f_\theta=2$, $e=f_\theta-y=1$ và $\ell=1/2$. Tại $z_j>0$, đạo hàm ReLU bằng 1, nên

$$
\frac{\partial\ell}{\partial a_j}=eh_j=1,\qquad
\frac{\partial\ell}{\partial w_j}=ea_jx=2,\qquad
\frac{\partial\ell}{\partial b_j}=ea_j=1.
$$

Sau bước cập nhật, $a_j^+=0.9$, $w_j^+=0.3$, $b_j^+=-0.1$ cho cả hai nhánh.

Hai bộ tham số bằng nhau cho tiền kích hoạt và kích hoạt bằng nhau trên cùng mẫu. Các trọng số đầu ra bằng nhau làm các gradient theo tham số tương ứng bằng nhau qua công thức dây chuyền. Quy tắc và trạng thái cập nhật giống nhau tạo tham số và trạng thái mới giống nhau. Quy nạp theo bước cho bảo toàn đối xứng trong các điều kiện đã nêu. Thay nhóm dữ liệu chung không tự phá đối xứng ở các bước khả vi. Nếu tiền kích hoạt bằng 0, hai đơn vị phải dùng cùng quy ước đạo hàm ReLU tại 0.

Ở cấu hình cuối, đầu ra vẫn bằng 2, nên $e=2$. Gradient theo $a_1,a_2$ lần lượt là $2\times0.8=1.6$ và $2\times1.2=2.4$. Trọng số đầu vào khác nhau đã làm hai cập nhật đầu ra khác nhau; điều này không bảo đảm toàn bộ quá trình huấn luyện thành công.
:::

## Bài 8. Độ nhạy qua lớp và bão hòa

Mức độ: tính toán và giải thích. LLO11–13.

Xét chuỗi tuyến tính vô hướng $h^{(l)}=c_lh^{(l-1)}$, $l=1,\ldots,4$, với $h^{(0)}=1$.

1. Tính $h^{(4)}$ và $\partial h^{(4)}/\partial h^{(0)}$ khi mọi $c_l=1/2$, rồi khi mọi $c_l=2$.
2. Với $\phi(z)=\tanh z$, tính $\phi'(0)$ và xấp xỉ $\phi'(3)$ bằng công thức $\phi'(z)=1-\tanh^2z$.
3. Giải thích vì sao trọng số lớn hơn có thể đồng thời tăng độ nhạy của phép tuyến tính và đưa một hàm kích hoạt vào vùng đạo hàm nhỏ. Phân biệt độ nhạy đầu ra theo đầu vào với gradient mất mát theo trọng số.

::: solution
Quy tắc dây chuyền cho $\partial h^{(4)}/\partial h^{(0)}=\prod_{l=1}^4c_l$. Vì $h^{(0)}=1$, cả đầu ra và độ nhạy bằng $1/16$ trong cấu hình thứ nhất, bằng 16 trong cấu hình thứ hai.

Ta có $\phi'(0)=1$ và $\phi'(3)\approx0.00987$. Trong một lớp phi tuyến, đạo hàm chứa cả trọng số và đạo hàm kích hoạt tại tiền kích hoạt thực tế. Trọng số lớn có thể làm tiền kích hoạt tăng về trị tuyệt đối; với tanh, điều đó có thể làm đạo hàm kích hoạt rất nhỏ. Vì vậy chỉ xét độ lớn trọng số chưa đủ để xác định gradient.

$\partial h^{(4)}/\partial h^{(0)}$ đo ảnh hưởng của đầu vào lên đầu ra. Gradient mất mát theo một trọng số còn chứa độ nhạy của mất mát đối với đầu ra và của tiền kích hoạt đối với trọng số đó; hai đại lượng không đồng nhất.
:::

## Bài 9. Phương sai và khởi tạo Glorot

Mức độ: chứng minh và tính toán. LLO13.

Cho lớp tuyến tính $z=Wh$, $h\in\mathbb R^{n_{in}}$, $W\in\mathbb R^{n_{out}\times n_{in}}$. Các phần tử của $W$ độc lập, trung bình 0, phương sai $s^2$, độc lập với toàn bộ $h$. Các thành phần $h_i$ có trung bình 0 và phương sai chung $q>0$. Với mất mát vô hướng khả vi phụ thuộc $h$ thông qua $z=Wh$, giữ $W$ cố định khi lấy đạo hàm theo $h$ và đặt $\delta_z=\nabla_z\ell$ và $\delta_h=\nabla_h\ell$. Trong mô hình phân tích, giả sử $\delta_z$ độc lập với toàn bộ $W$, các thành phần có trung bình 0 và phương sai chung $r>0$.

1. Chứng minh $\operatorname{Var}(z_j)=n_{in}s^2q$ và $\operatorname{Var}(\delta_{h,i})=n_{out}s^2r$.
2. Với $n_{in}=8,n_{out}=4$, dùng Glorot để tính $s^2$, biên $a$ của phân phối đều $U[-a,a]$ và hai hệ số phương sai tiến/lùi.
3. Xét riêng chuỗi ba lớp tuyến tính đều rộng 4. Các ma trận độc lập giữa các lớp và độc lập với đầu vào; mỗi ma trận thỏa các giả thiết trọng số trên. Đầu vào có các thành phần trung bình 0 và phương sai 1. Tính phương sai từng lớp khi $s^2=1/16$ và $s^2=1/4$.
4. Xác định giới hạn khi chuyển kết luận sang mạng ReLU.

::: solution
Với $z_j=\sum_iW_{ji}h_i$, mỗi tích có trung bình 0 và phương sai $s^2q$. Với $i\ne k$,

$$
\mathbb E[W_{ji}W_{jk}h_ih_k]
=\mathbb E[W_{ji}W_{jk}]\mathbb E[h_ih_k]=0,
$$

do trọng số độc lập, trung bình 0 và độc lập với cả vectơ đầu vào. Không cần giả thiết các $h_i$ độc lập trong phép triệt hạng chéo này. Cộng các phương sai cho kết luận tiến.

Dây chuyền cho $\delta_h=W^T\delta_z$, tức $\delta_{h,i}=\sum_jW_{ji}\delta_{z,j}$. Lập luận tương tự dùng giả thiết độc lập của $\delta_z$ với toàn bộ $W$ cho kết luận lùi. Giả thiết này là đơn giản hóa phân tích, không phải tính chất phổ quát của gradient trong mạng thực tế.

Với lớp $8\to4$,

$$
s^2=\frac2{8+4}=\frac16,\qquad
a=\sqrt{3s^2}=\frac1{\sqrt2}.
$$

Hệ số phương sai tiến bằng $8s^2=4/3$, hệ số lùi bằng $4s^2=2/3$. Không có bảo toàn chính xác đồng thời cả hai phía.

Trong chuỗi lớp rộng 4, $q_l=4s^2q_{l-1}$. Hai cấu hình cho

$$
1\to\frac14\to\frac1{16}\to\frac1{64},\qquad
1\to1\to1\to1.
$$

Các giá trị là phương sai trong mô hình tuyến tính ngẫu nhiên. Phép ReLU làm thay đổi phân phối và mômen của tín hiệu; không được suy nguyên các đẳng thức bảo toàn tuyến tính thành bảo toàn chính xác cho mạng ReLU.
:::

## Bài 10. Thiết lập huấn luyện theo ngân sách và xác thực

Mức độ: vận dụng vào học máy. LLO11–13.

Một mô hình có $N=10^5$ mẫu. Ngân sách mỗi bước cho phép tính tối đa 100 gradient mẫu. Các gradient mẫu được lấy đều độc lập có hoàn lại. Tại một tham số cố định đang khảo sát, gradient mẫu vô hướng có phương sai 8. Hai đơn vị ẩn ban đầu có toàn bộ tham số vào/ra giống nhau và trạng thái momentum bằng 0.

1. Đề xuất gradient nhóm phù hợp ngân sách. Tính phương sai khi dùng $b=25$ và $b=100$; nêu điều chưa thể kết luận về tổng thời gian huấn luyện.
2. Xác định vấn đề khởi tạo và một thay đổi có căn cứ. Phân biệt việc phá đối xứng với chọn thang trọng số.
3. Quy tắc dừng dùng $K_{\mathrm{stop}}=2$, $\delta=0.01$. Trước chuỗi đánh giá, giá trị tốt nhất đã lưu là 0.40, bộ đếm chờ bằng 0. Luôn lưu mọi giá trị xác thực nhỏ hơn tốt nhất cũ; chỉ đặt lại bộ đếm khi mức giảm so với tốt nhất cũ lớn hơn $\delta$, nếu không tăng bộ đếm. Các giá trị tiếp theo lần lượt là 0.38, 0.375, 0.370, 0.360. Xác định diễn biến bộ đếm, thời điểm dừng và mô hình được trả về.
4. Nêu vai trò của tập kiểm thử trong quy trình trên.

::: solution
Một nhóm bất kỳ với $1\le b\le100$ đáp ứng giới hạn số gradient mỗi bước; chẳng hạn dùng $b=100$. Phương sai bằng $8/b$, nên hai lựa chọn cho $0.32$ và $0.08$. Nhóm lớn hơn giảm phương sai tại tham số cố định theo mô hình này. Chưa có dữ kiện để kết luận tổng thời gian đạt tiêu chí tốt hơn, vì số bước cần thiết, chi phí phần cứng và xử lý song song chưa được xác định.

Hai đơn vị đối xứng có thể tiếp tục nhận cập nhật giống nhau. Khởi tạo trọng số khác nhau phá điều kiện đồng nhất; độ lệch có thể vẫn bằng 0. Việc chọn phương sai của trọng số giải quyết thang truyền tín hiệu và gradient, là yêu cầu riêng. Nếu áp dụng Glorot cần nêu kích thước lớp và phạm vi mô hình; không đủ dữ kiện để tính một phương sai cụ thể ở đây.

| Lần đánh giá | Giá trị mới | Tốt nhất trước lần này | Mức giảm | Tốt nhất sau cập nhật | Bộ đếm |
|---|---:|---:|---:|---:|---:|
| 1 | 0.380 | 0.400 | 0.020 | 0.380 | 0 |
| 2 | 0.375 | 0.380 | 0.005 | 0.375 | 1 |
| 3 | 0.370 | 0.375 | 0.005 | 0.370 | 2 |

Thuật toán dừng sau lần 3, trả mô hình có giá trị 0.370. Lần 4 không được thực hiện trong lần chạy đã dừng; con số giả định 0.360 không làm thay đổi quyết định trước đó. Mỗi cải thiện nhỏ vẫn được lưu, nhưng không đặt lại bộ đếm theo quy tắc đã cho.

Tập kiểm thử dùng để đánh giá sau quá trình chọn mô hình, không dùng chọn cỡ nhóm, khởi tạo, bước học hoặc thời điểm dừng.
:::

## Nguồn

Bài 1–3 và 10 dùng các khái niệm của Goodfellow, Bengio, Courville (2016), *Deep Learning*, §§8.1–8.3.1, với dữ kiện tự xây dựng. Bài 4 dùng phân tích gradient trên hàm bậc hai của Boyd và Vandenberghe (2004), *Convex Optimization*, §§9.1–9.3. Bài 5–6 dựa trên *Deep Learning*, §§8.3.2–8.3.3, công thức (8.15)–(8.22). Bài 7–9 dùng §§6.5,8.2.5,8.4 và công thức (8.23); phép tính, dữ kiện và chứng minh đã viết riêng cho tài liệu này. Các bài không sao chép nguyên đề từ nguồn bên thứ ba.
