# Bài tập Bài 06 — Mở rộng mô hình và dữ liệu

Bộ bài tập gồm mười một bài theo sáu phần của bài học, ở ba mức: nhận biết, tính toán hoặc chứng minh, và vận dụng vào AI. Các Bài 1, 3, 5, 7, 9 và 11 dựa trên câu hỏi trên trang chiếu, ở đây có gợi ý và lời giải đầy đủ; ở Bài 1, 5 và 9, một phần dữ kiện được đổi để không trùng các ví dụ đã giải trong ghi chú bài giảng. Lời giải mẫu của Bài 3 và Bài 7 có trên trang chiếu, và câu 5 của Bài 7 được tách thành một bài riêng ở đó; đáp án ngắn của Bài 11 nằm trong ghi chú diễn giả của trang câu hỏi tự kiểm tra. Ký hiệu, giả thiết H0–H6b và số hiệu theo ghi chú bài giảng Bài 06. Các kết quả hội tụ được gọi bằng phát biểu kèm số hiệu, như trên trang chiếu: bất đẳng thức một bước có số hạng nhiễu là Mệnh đề 06.29; hạ gradient trên hàm không lồi là Định lý 06.20 (Định lý 05b.41); SGD trên hàm không lồi là Định lý 06.34 (Định lý 05b.43), và cách chọn bước theo số bước là Hệ quả 06.35 (Hệ quả 05b.44). Hai định lý SGD trên hàm lồi mạnh, Định lý 06.31 (Định lý 05b.36) và Định lý 06.32 (Định lý 05b.39), chỉ có trong ghi chú bài giảng; bộ bài tập này chỉ dùng Định lý 06.32 như cách khác ở Bài 11. Trên trang chiếu, Mệnh đề 1, 2, 3 là Mệnh đề 06.4, 06.8, 06.9 của ghi chú.

Bốn bộ dữ liệu dùng chung, được nêu lại trong từng bài khi cần:

- Dữ liệu XOR: đầu vào $(0,0)$, $(0,1)$, $(1,0)$, $(1,1)$ với nhãn $y=0,1,1,0$; mất mát $\ell=\tfrac12(f-y)^2$.
- Mạng của ví dụ đồ thị tính toán: $W_1=\begin{pmatrix}1&\tfrac12\\\tfrac12&-1\end{pmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$, $\sigma(z)=\max\{0,z\}$.
- Mạng tuyến tính một đơn vị: $F(u,v)=\tfrac12(uv-1)^2$.
- Dữ liệu bốn điểm: $x=(-1,0,1,2)$, $y=(1,0,1,4)$, mô hình $wx+c$, $\theta=(w,c)$, $F=\tfrac14\sum_i\tfrac12(wx_i+c-y_i)^2$.

Lời giải cần nêu kết quả được dùng ở từng bước. Số thập phân viết với dấu phẩy. Viết tắt: chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), hạ gradient ngẫu nhiên (SGD).

## Bài 1. Biểu diễn XOR và đối xứng của mạng

Mức độ: tính toán. LLO11; CLO1, CLO2.

::: exercise Bài 1
Cho dữ liệu XOR với nhãn $y=(0,1,1,0)$ và mất mát bình phương.

1. Tìm $w_0,w_1,w_2,w_3$ để $w_0+w_1x_1+w_2x_2+w_3x_1x_2$ khớp đúng nhãn $y_\pm=2y-1$ của XOR (tức $-1,1,1,-1$), và chứng minh nghiệm là duy nhất.
2. Với mạng hai tầng ReLU có $W_1=\begin{pmatrix}1&1\\1&1\end{pmatrix}$, $b_1=(0,-1)$, $w_2=(1,-2)$, $b_2=0$, tính $z$, $h$, $f$ tại bốn đầu vào XOR.
3. Viết tham số nhận được khi đổi chỗ hai đơn vị ẩn của mạng ở câu 2, rồi tính $F$ tại trung điểm của hai tham số. Kết luận gì về tính lồi của $F$?
4. Tính số tham số $p$ của mạng hai tầng cho ảnh màu $32\times32$ ($d=3072$) với $m=256$ đơn vị ẩn.
:::

::: hint Gợi ý Bài 1
Ở câu 1, viết bốn điều kiện khớp tại bốn đầu vào. Ở câu 3, đổi chỗ hai đơn vị là đổi chỗ đồng thời hai hàng của $W_1$, hai phần tử của $b_1$ và hai phần tử của $w_2$; dùng Mệnh đề 06.9.
:::

::: solution Lời giải Bài 1
1. Bốn điều kiện là $w_0=-1$ tại $(0,0)$, $w_0+w_2=1$ tại $(0,1)$, $w_0+w_1=1$ tại $(1,0)$ và $w_0+w_1+w_2+w_3=-1$ tại $(1,1)$. Giải lần lượt: $w_0=-1$, $w_2=2$, $w_1=2$, $w_3=-1-(-1+2+2)=-4$. Hệ có bốn phương trình tuyến tính, bốn ẩn, và mỗi ẩn được xác định duy nhất theo thứ tự trên, nên nghiệm $(-1,2,2,-4)$ là duy nhất. Kiểm tra tại $(1,1)$: $-1+2+2-4=-1$. Nghiệm này bằng $2(0,1,1,-2)-(1,0,0,0)$, đúng với phép đổi nhãn $y_\pm=2y-1$.

2. Hai hàng của $W_1$ bằng nhau, nên $z=(x_1+x_2,\ x_1+x_2-1)$. Theo thứ tự $(0,0)$, $(0,1)$, $(1,0)$, $(1,1)$:

| $x$ | $z$ | $h$ | $f=h_1-2h_2$ |
|---|---|---|---:|
| $(0,0)$ | $(0,-1)$ | $(0,0)$ | $0$ |
| $(0,1)$ | $(1,0)$ | $(1,0)$ | $1$ |
| $(1,0)$ | $(1,0)$ | $(1,0)$ | $1$ |
| $(1,1)$ | $(2,1)$ | $(2,1)$ | $0$ |

Mạng biểu diễn đúng XOR, nên $F=0$ (Goodfellow, Bengio và Courville, 2016, (6.7)–(6.11)). Tại $(0,1)$ và $(1,0)$, đơn vị thứ hai có $z_2=0$, nằm ở điểm gãy; giá trị hàm vẫn xác định.

3. Đổi chỗ hai đơn vị giữ nguyên $W_1$ (hai hàng bằng nhau), cho $b_1=(-1,0)$ và $w_2=(-2,1)$; theo Mệnh đề 06.8, tham số mới cũng có $F=0$. Trung điểm có $W_1$ không đổi và $b_1=w_2=(-\tfrac12,-\tfrac12)$, nên $z=(s-\tfrac12)(1,1)$ với $s=x_1+x_2$ và $f=-\tfrac12\bigl(\sigma(z_1)+\sigma(z_2)\bigr)=-\max\{0,s-\tfrac12\}$. Bốn giá trị là $f=0,\ -\tfrac12,\ -\tfrac12,\ -\tfrac32$, sai số $0,\ -\tfrac32,\ -\tfrac32,\ -\tfrac32$, nên

$$
F=\frac14\cdot\frac12\Bigl(0+\frac94+\frac94+\frac94\Bigr)=\frac{27}{32}>0 .
$$

Hai đầu mút là hai cực tiểu toàn cục khác nhau vì hai đơn vị có tham số khác nhau, và trung điểm có $F>0$; theo Mệnh đề 06.9, $F$ không lồi.

4. $p=md+2m+1=3072\cdot256+512+1=786\,432+513=786\,945$.

**Kiểm tra.** Ở câu 3, tại $(1,1)$: $z=(\tfrac32,\tfrac32)$, $f=-\tfrac12\cdot3=-\tfrac32$, sai số bình phương $\tfrac94$.
:::

## Bài 2. Tính không lồi với mất mát logistic

Mức độ: tính toán hoặc chứng minh. LLO11; CLO1.

::: exercise Bài 2
Cho dữ liệu XOR với nhãn $y_\pm=2y-1\in\{-1,+1\}$ và mất mát logistic $\ell(f,y_\pm)=\log(1+e^{-y_\pm f})$, hàm kích hoạt $\sigma(z)=\max\{0,z\}$. Hai tham số $\theta_A'$ và $\theta_B'$ có $b_1=(0,0)$, $w_2=(1,1)$, $b_2=0$ và lần lượt $W_1=\begin{pmatrix}2&-2\\-2&2\end{pmatrix}$, $W_1=\begin{pmatrix}-2&2\\2&-2\end{pmatrix}$. Như vậy $\theta_A'$ là tham số $\theta_A$ của Ví dụ 06.4 ($W_1=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, $b_1=(0,0)$, $w_2=(1,1)$, $b_2=0$, biểu diễn đúng XOR) với $W_1$ nhân đôi, và $\theta_B'$ nhận được bằng cách đổi chỗ hai đơn vị ẩn của $\theta_A'$.

1. Chứng minh $\theta(t)=(1-t)\theta_A'+t\theta_B'$ cho $F(\theta(t))=\tfrac12\log2+\tfrac12\log\bigl(1+e^{-2\lvert1-2t\rvert}\bigr)$.
2. Tính $F$ tại $t=0$, $t=\tfrac14$, $t=\tfrac12$, rồi chứng minh $F$ không lồi.
3. Giải thích vì sao tính lồi của $\ell$ theo $f$ không chuyển thành tính lồi của $F$ theo $\theta$.
:::

::: hint Gợi ý Bài 2
Ở câu 1, hai hàng của $W_1(t)$ đối dấu nhau, nên đúng như Ví dụ 06.7 của ghi chú, $f$ bằng tổng phần dương của hai tiền kích hoạt. Ở câu 2, so giá trị tại trung điểm với trung bình hai đầu mút.
:::

::: solution Lời giải Bài 2
1. $W_1(t)=2(1-2t)\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, nên $z=2(1-2t)(x_1-x_2,\ x_2-x_1)$. Hai thành phần đối dấu nhau, nên tổng phần dương của chúng là $f=2\lvert1-2t\rvert\,\lvert x_1-x_2\rvert$.

- Tại $(0,0)$ và $(1,1)$: $f=0$, mất mát $\log2$.
- Tại $(0,1)$ và $(1,0)$: $y_\pm=1$, $f=2\lvert1-2t\rvert$, mất mát $\log\bigl(1+e^{-2\lvert1-2t\rvert}\bigr)$.

Trung bình bốn mất mát là công thức cần chứng minh.

2. Ba giá trị:

- $F(\theta(0))=\tfrac12\bigl(\log2+\log(1+e^{-2})\bigr)\approx\tfrac12(0{,}6931+0{,}1269)=0{,}4100$, và $F(\theta(1))$ bằng giá trị đó vì $\lvert1-2t\rvert$ đối xứng quanh $t=\tfrac12$;
- $F(\theta(\tfrac14))=\tfrac12\bigl(\log2+\log(1+e^{-1})\bigr)\approx0{,}5032$;
- $F(\theta(\tfrac12))=\log2\approx0{,}6931$.

Nếu $F$ lồi thì $F(\theta(\tfrac12))\le\tfrac12F(\theta(0))+\tfrac12F(\theta(1))=0{,}4100$, mâu thuẫn. Vậy $F$ không lồi.

3. Tính lồi của $\theta\mapsto\ell(f(x_i;\theta),y_i)$ được bảo đảm khi $\theta\mapsto f(x_i;\theta)$ affine (Định lý 01.31(b)). Với mạng, $f$ chứa tích $w_2^\top\sigma(W_1x+b_1)$ giữa tham số tầng ra và kích hoạt của tham số tầng ẩn, nên $f$ không affine theo $\theta$; dọc đoạn trên, $f$ là $\lvert1-2t\rvert$ lần một hằng số, không affine theo $t$.

**Kiểm tra.** Ở $t=\tfrac14$, $f(0,1)=2\cdot\tfrac12=1$, đúng bằng giá trị của $\theta_A$ không nhân đôi, nên mất mát tại hai điểm lớp $1$ là $\log(1+e^{-1})$.
:::

## Bài 3. Lan truyền ngược khi một đơn vị không hoạt động

Mức độ: tính toán. LLO11; CLO1.

::: exercise Bài 3
Cho mạng của ví dụ đồ thị tính toán: $W_1=\begin{pmatrix}1&\tfrac12\\\tfrac12&-1\end{pmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$, ReLU, mất mát bình phương. Mẫu $x=(0,0)$, $y=0$.

1. Tính $z$, $h$, $f$, $\ell$.
2. Tính $\partial\ell/\partial b_2$, $\nabla_{w_2}\ell$, $\delta_z$, $\nabla_{W_1}\ell$, $\nabla_{b_1}\ell$ bằng Thuật toán 06.1.
3. Giải thích vì sao hàng một của $\nabla_{W_1}\ell$ và $[\nabla_{b_1}\ell]_1$ bằng $0$, và vì sao cả $\nabla_{W_1}\ell$ bằng $0$.
4. Với $x=(0,1)$, xác định tiền kích hoạt và nêu quy ước cần dùng.
:::

::: hint Gợi ý Bài 3
Với $x=0$, $z=b_1$. Một đơn vị có tiền kích hoạt âm có $\sigma'=0$. Mỗi phần tử $\partial\ell/\partial[W_1]_{ji}$ bằng $[\delta_z]_jx_i$. Ở câu 4, cả hai tiền kích hoạt rơi vào điểm gãy, nên kết quả phụ thuộc quy ước $\sigma'(0)=0$ của thuật toán.
:::

::: solution Lời giải Bài 3
1. $z=W_1\cdot0+b_1=(-\tfrac12,1)$, $h=(0,1)$, $f=1\cdot0-2\cdot1+\tfrac12=-\tfrac32$, $\ell=\tfrac12\cdot\tfrac94=\tfrac98$.

2. $e=f-y=-\tfrac32$. Tầng ra: $\partial\ell/\partial b_2=-\tfrac32$, $\nabla_{w_2}\ell=e\,h=(0,-\tfrac32)$. Tầng ẩn: $e\,w_2=(-\tfrac32,3)$, $\sigma'(z)=(0,1)$, nên $\delta_z=(0,3)$. Tham số tầng ẩn: $\nabla_{W_1}\ell=\delta_zx^\top=0$ và $\nabla_{b_1}\ell=\delta_z=(0,3)$.

3. Đơn vị thứ nhất có $z_1=-\tfrac12<0$, nên $\sigma'(z_1)=0$ chặn mọi tín hiệu đi qua nó: $[\delta_z]_1=0$, kéo theo hàng một của $\delta_zx^\top$ và $[\nabla_{b_1}\ell]_1$ bằng $0$. Toàn bộ $\nabla_{W_1}\ell$ bằng $0$ vì mỗi phần tử $[\delta_z]_jx_i$ chứa $x_i=0$. Gradient bằng $0$ theo một khối tham số ở một mẫu không có nghĩa khối tham số đó đã tối ưu: $\nabla_{b_1}\ell$ và $\nabla_{w_2}\ell$ vẫn khác $0$, và mất mát $\tfrac98$ còn lớn.

4. $z=(0+\tfrac12-\tfrac12,\ 0-1+1)=(0,0)$: cả hai đơn vị ở điểm gãy. Với quy ước $\sigma'(0)=0$, $\delta_z=0$ và lan truyền ngược trả $0$ cho $\nabla_{W_1}\ell$, $\nabla_{b_1}\ell$. Tại điểm này, $\ell$ không khả vi theo $W_1$, $b_1$, nên vector trả về là kết quả của quy ước $\sigma'(0)=0$ (Mệnh đề 06.13, Nhận xét 06.14).

**Kiểm tra.** Tăng $b_2$ thêm $\varepsilon$ làm $f=-\tfrac32+\varepsilon$ và $\ell=\tfrac12(-\tfrac32+\varepsilon)^2$, đạo hàm tại $0$ bằng $-\tfrac32$.
:::

## Bài 4. Hằng số Lipschitz của gradient trên mạng tuyến tính một đơn vị

Mức độ: tính toán hoặc chứng minh. LLO11; CLO1.

::: exercise Bài 4
Cho $F(u,v)=\tfrac12(uv-1)^2$ với $\nabla^2F(u,v)=\begin{pmatrix}v^2&2uv-1\\2uv-1&u^2\end{pmatrix}$.

1. Chứng minh mọi trị riêng của $\nabla^2F$ trên $[-1,1]^2$ có trị tuyệt đối không vượt $4$, và giá trị $4$ đạt tại $(1,-1)$.
2. Chứng minh không có hằng số $L$ nào để $\nabla F$ là $L$-Lipschitz trên toàn $\mathbb R^2$.
3. Với $L=4$ và $\theta_0=(\tfrac12,\tfrac12)$, thực hiện một bước hạ gradient với $\eta=\tfrac1L$. So mức giảm thật với mức bảo đảm của Bổ đề 06.19.
:::

::: hint Gợi ý Bài 4
Ở câu 1, với ma trận đối xứng, mọi trị riêng có trị tuyệt đối không vượt tổng trị tuyệt đối lớn nhất của một hàng. Ở câu 2, xét phần tử $u^2$ của Hessian dọc trục $u$. Ở câu 3, $\nabla F(\theta_0)=(-\tfrac38,-\tfrac38)$.
:::

::: solution Lời giải Bài 4
1. Trên $[-1,1]^2$: $v^2\le1$, $u^2\le1$ và $-3\le2uv-1\le1$, nên tổng trị tuyệt đối mỗi hàng không vượt $1+3=4$, và mọi trị riêng có trị tuyệt đối không vượt $4$. Tại $(1,-1)$, Hessian là $\begin{pmatrix}1&-3\\-3&1\end{pmatrix}$ với trị riêng $1\pm3$, tức $4$ và $-2$.

2. Tại $(u,0)$, Hessian là $\begin{pmatrix}0&-1\\-1&u^2\end{pmatrix}$, có vết $u^2$ nên trị riêng lớn nhất không nhỏ hơn $\tfrac{u^2}2$, không bị chặn khi $u\to\infty$. Nếu $\nabla F$ là $L$-Lipschitz trên $\mathbb R^2$ thì mọi trị riêng của Hessian có trị tuyệt đối không vượt $L$, mâu thuẫn.

3. $\eta=\tfrac14$, $\theta_1=\theta_0+\tfrac14(\tfrac38,\tfrac38)=(\tfrac{19}{32},\tfrac{19}{32})\in[-1,1]^2$. $F(\theta_1)=\tfrac12\bigl(\tfrac{361}{1024}-1\bigr)^2\approx0{,}20960$. Mức giảm thật: $0{,}28125-0{,}20960=0{,}07165$. Bảo đảm: $\tfrac{\lVert\nabla F(\theta_0)\rVert^2}{2L}=\tfrac{9/32}8=\tfrac9{256}\approx0{,}0352$. Mức giảm thật gấp khoảng hai lần bảo đảm. So với $L=2$ trên $[0,1]^2$ (Ví dụ 06.14), hằng số lớn hơn cho bước nhỏ hơn và bảo đảm yếu hơn, dù cả hai đều đúng.

**Kiểm tra.** Đoạn nối $\theta_0$ và $\theta_1$ nằm trong $[-1,1]^2$, tập lồi nơi $L=4$, nên Bổ đề 06.19 áp dụng.
:::

## Bài 5. Phân loại điểm dừng và số bước của hạ gradient trên hàm không lồi

Mức độ: tính toán. LLO11; CLO1.

::: exercise Bài 5
Cho $F(u,v)=\tfrac12(uv-1)^2$.

1. Xác định mọi điểm dừng.
2. Tính Hessian tại $(4,\tfrac14)$, các trị riêng, và kết luận của phép kiểm tra bậc hai.
3. Với $L=2$, $\theta_0=(\tfrac14,\tfrac14)$, tìm $K$ nhỏ nhất để cận của Định lý 06.20 bảo đảm $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2\le0{,}01$; so với số bước thực tế của hạ gradient bước $\tfrac12$.
4. Nêu một kết luận mà Định lý 06.20 không cho.
:::

::: hint Gợi ý Bài 5
Ở câu 1, $\nabla F=(uv-1)(v,u)$. Ở câu 3, $F_{\inf}=0$ và $\Delta_0=F(\theta_0)$; dãy ở trên đường chéo $u=v=t_k$ với $t_{k+1}=t_k+\tfrac12t_k(1-t_k^2)$ và $\lVert\nabla F\rVert^2=2t_k^2(1-t_k^2)^2$.
:::

::: solution Lời giải Bài 5
1. $\nabla F=(uv-1)(v,u)=0$ khi $uv=1$ hoặc $(u,v)=(0,0)$. Các điểm dừng là gốc và mọi điểm của hyperbol $uv=1$.

2. Tại $(4,\tfrac14)$, $uv=1$ nên $\nabla^2F=\begin{pmatrix}v^2&2uv-1\\2uv-1&u^2\end{pmatrix}=\begin{pmatrix}\tfrac1{16}&1\\1&16\end{pmatrix}$, định thức $1-1=0$, vết $16{,}0625$: trị riêng $0$ và $16{,}0625$. Mệnh đề 06.17 không kết luận, nhưng $F=0$ là giá trị nhỏ nhất có thể, nên đây là cực tiểu toàn cục. Trị riêng lớn cho thấy độ cong theo hướng pháp tuyến của hyperbol tăng khi cực tiểu nằm xa đường chéo.

3. $\Delta_0=F(\theta_0)=\tfrac12(\tfrac1{16}-1)^2=\tfrac{225}{512}\approx0{,}43945$. Dãy tăng từ $t_0=\tfrac14$ về $1$ và ở trong $[0,1]^2$, nơi $L=2$ (Ví dụ 06.14). Cận $\tfrac{2L\Delta_0}K\le0{,}01$ khi $K\ge\tfrac{4\cdot0{,}43945}{0{,}01}\approx175{,}8$, tức $K=176$. Thực tế:

| $k$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---:|---:|---:|---:|---:|---:|
| $t_k$ | $0{,}2500$ | $0{,}3672$ | $0{,}5260$ | $0{,}7163$ | $0{,}8907$ | $0{,}9827$ |
| $\lVert\nabla F(\theta_k)\rVert^2$ | $0{,}1099$ | $0{,}2018$ | $0{,}2895$ | $0{,}2433$ | $0{,}0678$ | $0{,}0023$ |

Giá trị đầu tiên không vượt $0{,}01$ ở $k=5$, nên $K=6$ đã đủ, nhỏ hơn cận khoảng $30$ lần. Chuẩn gradient tăng qua hai bước đầu vì dãy xuất phát gần vùng phẳng quanh điểm yên ngựa.

4. Chẳng hạn, Định lý 06.20 không cho biết $\theta_k$ tới cực tiểu nào trên hyperbol, không chặn $F(\theta_k)$, và không loại trường hợp dãy dừng gần điểm yên ngựa (Nhận xét 06.21).

**Kiểm tra.** Tại $k=5$: $t_5^2\approx0{,}96574$, $(1-t_5^2)^2\approx0{,}0011738$, nên $\lVert\nabla F\rVert^2\approx2\cdot0{,}96574\cdot0{,}0011738\approx0{,}00227$.
:::

## Bài 6. Chi phí một bước ở một quy mô mới

Mức độ: vận dụng vào AI. LLO11, LLO15; CLO4.

::: exercise Bài 6
Một mô hình có $p=10^6$ tham số được huấn luyện trên $n=10^7$ mẫu, với máy giả định thực hiện $10^{12}$ phép nhân–cộng mỗi giây và số thực $8$ byte. Dùng mô hình chi phí của Ví dụ 06.17.

1. Tính chi phí và thời gian một bước của hạ gradient đầy đủ, Newton và SGD với nhóm $b=256$.
2. Tính bộ nhớ cần để lưu Hessian và số bước SGD trong một lượt dữ liệu.
3. Với ngân sách $10$ giờ, mỗi phương pháp thực hiện được bao nhiêu bước?
:::

::: hint Gợi ý Bài 6
Hạ gradient đầy đủ tốn $np$, Newton tốn $np^2+p^3$, SGD tốn $bp$ mỗi bước.
:::

::: solution Lời giải Bài 6
1. Hạ gradient đầy đủ: $np=10^{13}$, tức $10$ giây. Newton: $np^2+p^3=10^{19}+10^{18}=1{,}1\cdot10^{19}$, tức $1{,}1\cdot10^7$ giây, khoảng $127$ ngày. SGD: $bp=2{,}56\cdot10^8$, tức $2{,}56\cdot10^{-4}$ giây.

2. Hessian có $p^2=10^{12}$ phần tử, tức $8\cdot10^{12}$ byte. Một lượt dữ liệu gồm $n/b=10^7/256\approx39\,063$ bước SGD.

3. Mười giờ là $36\,000$ giây. Hạ gradient đầy đủ: $3\,600$ bước. Newton: không hoàn thành một bước. SGD: $36\,000/(2{,}56\cdot10^{-4})\approx1{,}4\cdot10^8$ bước, khoảng $3\,600$ lượt dữ liệu, cùng số lượt với hạ gradient đầy đủ nhưng nhiều cập nhật hơn khoảng $39\,063$ lần.

**Kiểm tra.** Mỗi lượt dữ liệu tốn $np=10^{13}$ phép tính cho cả hai phương pháp bậc nhất; khác biệt chỉ ở số cập nhật trong một lượt.
:::

## Bài 7. Một bước SGD trên mạng XOR

Mức độ: tính toán. LLO11, LLO12; CLO1, CLO2.

::: exercise Bài 7
Cho mạng của ví dụ đồ thị tính toán ($W_1=\begin{pmatrix}1&\tfrac12\\\tfrac12&-1\end{pmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$, ReLU, mất mát bình phương). Gradient của mẫu $((1,1),0)$ đã có: $\nabla_{W_1}\ell=\begin{pmatrix}\tfrac12&\tfrac12\\-1&-1\end{pmatrix}$, $\nabla_{b_1}\ell=(\tfrac12,-1)$, $\nabla_{w_2}\ell=(\tfrac12,\tfrac14)$, $\partial\ell/\partial b_2=\tfrac12$, với $\ell=\tfrac18$. Nhóm gồm hai mẫu $((1,1),0)$ và $((1,0),1)$; bước $\eta=0{,}02$.

1. Tính gradient của mẫu $((1,0),1)$.
2. Tính gradient nhóm $\widehat g$.
3. Tính $\theta^+$ và mất mát trung bình trên nhóm trước và sau bước.
4. Tính tiền kích hoạt tại $(0,1)$ và giải thích vì sao gradient của mẫu $((0,1),1)$ phụ thuộc quy ước $\sigma'(0)$.
5. Với dữ liệu bốn điểm tại $\theta=(w,c)=(1,0)$: tính các gradient mẫu, $\operatorname{tr}\Sigma(\theta)$ và $\mathbb E\lVert\widehat g-\nabla F(\theta)\rVert^2$ cho nhóm $b=3$ chọn không hoàn lại.
:::

::: hint Gợi ý Bài 7
Ở câu 1, chạy Thuật toán 06.1 với $x=(1,0)$, $y=1$; cả hai đơn vị hoạt động. Ở câu 5, dùng kết luận 2 của Định lý 06.25, rồi kiểm tra bằng cách liệt kê bốn nhóm ba mẫu.
:::

::: solution Lời giải Bài 7
1. $z=(1+0-\tfrac12,\ \tfrac12+0+1)=(\tfrac12,\tfrac32)$, $h=z$, $f=\tfrac12-3+\tfrac12=-2$, $e=f-y=-3$, $\ell=\tfrac92$. Do đó $\partial\ell/\partial b_2=-3$, $\nabla_{w_2}\ell=e\,h=(-\tfrac32,-\tfrac92)$, $\delta_z=e\,w_2=(-3,6)$, $\nabla_{W_1}\ell=\delta_zx^\top=\begin{pmatrix}-3&0\\6&0\end{pmatrix}$, $\nabla_{b_1}\ell=(-3,6)$.

2. Trung bình với gradient của mẫu $(1,1)$:

$$
\nabla_{W_1}=\begin{pmatrix}-\tfrac54&\tfrac14\\\tfrac52&-\tfrac12\end{pmatrix},\quad\nabla_{b_1}=\bigl(-\tfrac54,\tfrac52\bigr),\quad\nabla_{w_2}=\bigl(-\tfrac12,-\tfrac{17}8\bigr),\quad\nabla_{b_2}=-\tfrac54 .
$$

3. $\theta^+=\theta-0{,}02\,\widehat g$: $W_1^+=\begin{pmatrix}1{,}025&0{,}495\\0{,}45&-0{,}99\end{pmatrix}$, $b_1^+=(-0{,}475;\ 0{,}95)$, $w_2^+=(1{,}01;\ -1{,}9575)$, $b_2^+=0{,}525$. Mất mát trung bình trên nhóm giảm từ $\tfrac12(\tfrac18+\tfrac92)=\tfrac{37}{16}=2{,}3125$ xuống $1{,}9202$. Riêng mẫu $(1,1)$, mất mát tăng từ $0{,}125$ lên $0{,}3025$, còn mẫu $(1,0)$ giảm từ $4{,}5$ xuống $3{,}538$: bước theo gradient nhóm có thể làm tăng mất mát của một mẫu trong nhóm.

4. $z=(0+\tfrac12-\tfrac12,\ 0-1+1)=(0,0)$: cả hai tiền kích hoạt ở điểm gãy. Tại đó $\ell$ không khả vi theo $W_1$, $b_1$, nên vector lan truyền ngược trả về phụ thuộc giá trị gán cho $\sigma'(0)$; với quy ước $\sigma'(0)=0$ thì $\delta_z=0$. Một bước SGD là một lần lan truyền ngược trên mỗi mẫu của nhóm, lấy trung bình, rồi cập nhật, nên quy ước ảnh hưởng trực tiếp tới bước.

5. Phần dư $wx_i+c-y_i=-2,0,0,-2$, gradient mẫu $(2,-2)$, $(0,0)$, $(0,0)$, $(-4,-2)$, trung bình $\nabla F=(-\tfrac12,-1)$. Sai lệch là $(\tfrac52,-1)$, $(\tfrac12,1)$, $(\tfrac12,1)$, $(-\tfrac72,-1)$, với bình phương chuẩn $\tfrac{29}4,\tfrac54,\tfrac54,\tfrac{53}4$, nên $\operatorname{tr}\Sigma=\tfrac{23}4$. Theo Định lý 06.25 (không hoàn lại),

$$
\mathbb E\lVert\widehat g-\nabla F\rVert^2=\frac{23}4\cdot\frac13\cdot\frac{4-3}{4-1}=\frac{23}{36}.
$$

**Kiểm tra.** Nhóm ba mẫu bỏ mẫu $j$ cho

$$
\begin{aligned}
\widehat g-\nabla F&=\tfrac13\bigl(4\nabla F-g_j\bigr)-\nabla F\\
&=\tfrac13(\nabla F-g_j),
\end{aligned}
$$

nên giá trị trung bình là $\tfrac19\cdot\tfrac14\sum_j\lVert g_j-\nabla F\rVert^2=\tfrac19\operatorname{tr}\Sigma=\tfrac{23}{36}$.
:::

## Bài 8. Kích thước nhóm và nhiễu tại điểm cực tiểu

Mức độ: tính toán. LLO12; CLO2.

::: exercise Bài 8
Cho dữ liệu bốn điểm tại điểm cực tiểu $\theta^*=(1,1)$, với gradient mẫu $(1,-1)$, $(0,1)$, $(1,1)$, $(-2,-1)$, $\operatorname{tr}\Sigma(\theta^*)=\tfrac52$, Hessian $H=\begin{pmatrix}1{,}5&0{,}5\\0{,}5&1\end{pmatrix}$, $L=\tfrac{5+\sqrt5}4$, $F^*=\tfrac12$; bước $\eta=\tfrac14$ từ $\theta_0=\theta^*$.

1. Với nhóm $b=3$ chọn không hoàn lại, tính $\mathbb E\lVert\widehat g\rVert^2$ theo Định lý 06.25 và tính $\mathbb E\,F(\theta_1)$ bằng liệt kê.
2. Kiểm tra bất đẳng thức một bước (Mệnh đề 06.29) với $\sigma^2$ bằng giá trị ở câu 1.
3. So với nhóm $b=2$ không hoàn lại ($\mathbb EF(\theta_1)=\tfrac{69}{128}$, Ví dụ 06.21), nêu tác dụng của việc tăng kích thước nhóm lên mức tăng của $F$ sau một bước.
:::

::: hint Gợi ý Bài 8
Nhóm ba mẫu bỏ mẫu $j$ có $\widehat g=-\tfrac13g_j$ vì tổng bốn gradient mẫu bằng $0$. Vì $F$ bậc hai và $\nabla F(\theta^*)=0$, $F(\theta_1)-F^*=\tfrac{\eta^2}2\widehat g^\top H\widehat g$.
:::

::: solution Lời giải Bài 8
1. Định lý 06.25: $\mathbb E\lVert\widehat g\rVert^2=\tfrac52\cdot\tfrac13\cdot\tfrac{4-3}{4-1}=\tfrac5{18}$. Với $\widehat g=-\tfrac13g_j$, $F(\theta_1)-F^*=\tfrac1{32}\cdot\tfrac19g_j^\top Hg_j=\tfrac{g_j^\top Hg_j}{288}$. Bốn giá trị $g_j^\top Hg_j$ là $1{,}5$; $1$; $3{,}5$; $9$, trung bình $3{,}75$. Do đó $\mathbb EF(\theta_1)=\tfrac12+\tfrac{3{,}75}{288}=\tfrac{197}{384}\approx0{,}5130$. Bốn giá trị $F(\theta_1)$ ứng với $j=1,2,3,4$ là $\tfrac{97}{192}$, $\tfrac{145}{288}$, $\tfrac{295}{576}$, $\tfrac{17}{32}$.

2. Tại $\theta^*$, $\nabla F=0$, nên vế phải của (6.1) là $F^*+\tfrac{L\eta^2}2\sigma^2=\tfrac12+\tfrac L{32}\cdot\tfrac5{18}\approx0{,}5157$, không nhỏ hơn $\mathbb EF(\theta_1)\approx0{,}5130$.

3. Tăng $b$ từ $2$ lên $3$ giảm $\mathbb E\lVert\widehat g\rVert^2$ từ $\tfrac56$ xuống $\tfrac5{18}$, nhờ cả hệ số $\tfrac1b$ và hệ số $\tfrac{n-b}{n-1}$, và giảm mức tăng $\mathbb EF(\theta_1)-F^*$ từ $\tfrac5{128}\approx0{,}039$ xuống $\tfrac5{384}\approx0{,}013$. Mức tăng vẫn dương vì $b<n$; chỉ khi $b=n$ (gradient đầy đủ) bước từ $\theta^*$ mới đứng yên.

**Kiểm tra.** Với $j=4$: $\widehat g=(\tfrac23,\tfrac13)$, $\theta_1=(1-\tfrac16,1-\tfrac1{12})$; trực tiếp, phần dư $wx_i+c-y_i$ là $-\varepsilon_i+(-\tfrac16x_i-\tfrac1{12})$ với $\varepsilon=(1,-1,-1,1)$, tức $(-\tfrac{11}{12},\tfrac{11}{12},\tfrac34,-\tfrac{17}{12})$, cho $F(\theta_1)=\tfrac18\cdot\tfrac{612}{144}=\tfrac{17}{32}$.
:::

## Bài 9. Bất đẳng thức một bước, cận không lồi và dừng sớm

Mức độ: tính toán. LLO11, LLO12; CLO1, CLO2.

::: exercise Bài 9
1. Với $L=\sigma^2=1$ và $\lVert\nabla F(\theta_k)\rVert^2=1$, tìm mọi $\eta>0$ để bất đẳng thức một bước (Mệnh đề 06.29) bảo đảm giảm theo kỳ vọng, tức vế phải nhỏ hơn $F(\theta_k)$.
2. Với $L=\Delta_0=\sigma^2=1$, tìm $K$ nhỏ nhất để cận của Hệ quả 06.35 không vượt $0{,}02$.
3. Với $\eta=0{,}5$, $k=20$, trị riêng $\alpha=0{,}05$, tính tỉ lệ giữ của dừng sớm và của chính quy hóa với hệ số $\lambda=0{,}1$, rồi giải thích sai khác.
:::

::: hint Gợi ý Bài 9
Ở câu 1, viết hai số hạng sau $F(\theta_k)$ ở vế phải của (6.1) thành một đa thức theo $\eta$ rồi xét dấu. Ở câu 2, với $K\ge2$, bước của Hệ quả 06.35 là $\sqrt{2/K}$ và cận là $\tfrac2K+\tfrac{2\sqrt2}{\sqrt K}$. Ở câu 3, xem Nhận xét 06.41.
:::

::: solution Lời giải Bài 9
1. Theo (6.1), vế phải nhỏ hơn $F(\theta_k)$ khi và chỉ khi phần thay đổi

$$
\begin{aligned}
\Delta(\eta)&=-\eta\Bigl(1-\frac{L\eta}2\Bigr)\lVert\nabla F(\theta_k)\rVert^2+\frac{L\eta^2}2\sigma^2\\
&=-\eta\Bigl(1-\frac\eta2\Bigr)+\frac{\eta^2}2\\
&=-\eta+\eta^2=\eta(\eta-1)
\end{aligned}
$$

là số âm. Với $\eta>0$, thừa số $\eta$ dương, nên $\Delta(\eta)<0$ khi và chỉ khi $\eta<1$. Khi $\eta\ge1$, số hạng nhiễu $\tfrac{\eta^2}2$ không nhỏ hơn phần giảm $\eta(1-\tfrac\eta2)$, và bất đẳng thức một bước không còn bảo đảm giảm theo kỳ vọng. Dù vậy, $\mathbb E[F(\theta_{k+1})\mid\theta_k]$ vẫn có thể nhỏ hơn $F(\theta_k)$, vì (6.1) chỉ là một cận trên.

2. Giải $\tfrac2K+\tfrac{2\sqrt2}{\sqrt K}\le0{,}02$ cho $K=20\,200$ (cận $\approx0{,}0199998$); với $K=20\,199$, cận vượt $0{,}02$. Số hạng chính $\tfrac{2\sqrt2}{\sqrt K}$ cho ước lượng nhanh $K\approx(100\sqrt2)^2=20\,000$. Ngược lại, khi yêu cầu chặt hơn hai lần, từ $0{,}02$ xuống $0{,}01$, số bước tăng khoảng bốn lần ($80\,400$ so với $20\,200$), đúng với tốc độ $O(1/\sqrt K)$.

3. Dừng sớm: $1-(1-0{,}025)^{20}\approx1-0{,}6027=0{,}3973$; chính quy hóa: $\tfrac{0{,}05}{0{,}05+0{,}1}=\tfrac13\approx0{,}3333$. Ở đây $\eta\alpha=0{,}025$ nhỏ, nên $0{,}975^{20}\approx0{,}6027$ gần $e^{-\eta\alpha k}=e^{-0{,}5}\approx0{,}6065$. Nhưng $\alpha/\lambda=0{,}5$ không nhỏ, nên $\tfrac\lambda{\alpha+\lambda}=\tfrac23\approx0{,}667$ khác $e^{-\alpha/\lambda}=e^{-0{,}5}\approx0{,}6065$. Sai khác đến từ điều kiện $\alpha\ll\lambda$.

**Kiểm tra.** Ở câu 1, với $\eta=\tfrac12$: $\Delta=-\tfrac12\cdot\tfrac34+\tfrac18=-\tfrac14<0$; với $\eta=2$: $\Delta=-2\cdot0+2=2>0$. Hai giá trị nằm hai phía của $1$, khớp với dấu của $\eta(\eta-1)$.
:::

## Bài 10. Ngân sách cố định và quy tắc dừng sớm

Mức độ: vận dụng vào AI. LLO11, LLO12; CLO2, CLO4.

::: exercise Bài 10
1. Với $L=\Delta_0=\sigma_1^2=1$, $n=10^4$, $b=10$ (nhóm chọn có hoàn lại) và tổng ngân sách $\mathcal B=10^6$ gradient mẫu, tính cận của hạ gradient đầy đủ và cận của SGD theo Hệ quả 06.35 và Mệnh đề 06.37, rồi tính ngưỡng $\mathcal B$ mà từ đó hạ gradient đầy đủ có cận nhỏ hơn.
2. Thuật toán 06.3 chạy với chu kỳ $s=100$ bước. Mất mát xác thực đo được tại các bước $100,200,\ldots,900$ là

$$
0{,}90;\ 0{,}62;\ 0{,}48;\ 0{,}45;\ 0{,}46;\ 0{,}44;\ 0{,}47;\ 0{,}49;\ 0{,}50 .
$$

Với ngưỡng kiên nhẫn $r=3$, $r=2$ và $r=1$, xác định bước dừng và tham số được trả về.
3. Giải thích vì sao giá trị $0{,}44$ không dùng được làm ước lượng của $R$ cho tham số được trả về.
:::

::: hint Gợi ý Bài 10
Ở câu 1, hạ gradient đầy đủ chạy $\mathcal B/n$ bước, SGD chạy $\mathcal B/b$ bước với $\sigma^2=\sigma_1^2/b$. Ở câu 2, theo dõi bộ đếm $t$ số lần liên tiếp không cải thiện, như Thuật toán 06.3.
:::

::: solution Lời giải Bài 10
1. Hạ gradient đầy đủ: $K=100$ bước, cận $\tfrac{2n}{\mathcal B}=0{,}02$. SGD: $K=10^5$, $\sigma^2=0{,}1$, cận $\tfrac{2b}{\mathcal B}+2\sqrt{\tfrac2{\mathcal B}}=0{,}00002+0{,}00283\approx0{,}00285$. Ngưỡng của Mệnh đề 06.37 là $\mathcal B^*=\tfrac{L\Delta_0(n-b)^2}{2\sigma_1^2}$; với $L=\Delta_0=\sigma_1^2=1$, $\mathcal B^*=\tfrac{(n-b)^2}2=\tfrac{9990^2}2\approx4{,}99\cdot10^7$, tức khoảng $5\,000$ lượt dữ liệu; ngân sách $10^6$ ứng với $100$ lượt, dưới ngưỡng, phù hợp với việc cận SGD nhỏ hơn.

2. Theo dõi giá trị nhỏ nhất và bộ đếm:

| bước | $100$ | $200$ | $300$ | $400$ | $500$ | $600$ | $700$ | $800$ | $900$ |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| $\widehat R$ | $0{,}90$ | $0{,}62$ | $0{,}48$ | $0{,}45$ | $0{,}46$ | $0{,}44$ | $0{,}47$ | $0{,}49$ | $0{,}50$ |
| bộ đếm $t$ | $0$ | $0$ | $0$ | $0$ | $1$ | $0$ | $1$ | $2$ | $3$ |

- $r=3$: dừng tại bước $900$, trả về tham số tại bước $600$ ($\widehat R=0{,}44$).
- $r=2$: dừng tại bước $800$, trả về tham số tại bước $600$.
- $r=1$: dừng tại bước $500$ khi $t=1$, trả về tham số tại bước $400$ ($\widehat R=0{,}45$); điểm tốt hơn ở bước $600$ bị bỏ lỡ.

3. Tham số tại bước $600$ được chọn vì có $\widehat R$ nhỏ nhất, tức nó phụ thuộc chính tập xác thực. Định lý 06.22 chỉ cho $\widehat R$ không chệch tại một tham số cố định trước khi nhìn tập đánh giá, nên sau khi chọn, $0{,}44$ lệch về phía lạc quan (Nhận xét 06.39). Ước lượng $R$ cần một tập kiểm thử riêng.

**Kiểm tra.** Ở câu 1, hai cận đúng thứ tự với Mệnh đề 06.37: $\mathcal B=10^6<4{,}99\cdot10^7$ nên cận SGD nhỏ hơn.
:::

## Bài 11. Lựa chọn phương pháp và phạm vi của các bảo đảm

Mức độ: nhận biết và vận dụng vào AI. LLO11, LLO15; CLO1, CLO4.

::: exercise Bài 11
1. Chọn phương pháp cho: (a) $n=10^3$, $p=50$, hồi quy logistic có chính quy hóa; (b) $n=10^8$, $p=10^6$, cùng mô hình; (c) mạng, $n=p=10^7$.
2. Giải thích vì sao Mệnh đề 06.9 không khẳng định mọi mạng đều cho $F$ không lồi.
3. Định lý 06.34 (SGD trên hàm không lồi) chặn đại lượng nào, và không chặn đại lượng nào?
4. Nêu giá trị giới hạn của vế phải cận trong Định lý 06.34 khi $K\to\infty$ với $\eta$ cố định, và cách chọn $\eta$ theo $K$.
:::

::: hint Gợi ý Bài 11
Ở câu 1, tính chi phí một bước theo bảng của Ví dụ 06.17 và dùng bảng lựa chọn ở Mục 7.2 của ghi chú. Ở câu 4, xét riêng hai số hạng $\tfrac{2\Delta_0}{\eta K}$ và $L\eta\sigma^2$ của cận, rồi dùng Hệ quả 06.35.
:::

::: solution Lời giải Bài 11
1. (a) Newton: một bước tốn $np^2+p^3=2{,}5\cdot10^6+1{,}25\cdot10^5\approx2{,}6\cdot10^6$ phép tính, và có hội tụ bậc hai cục bộ (Định lý 05.33). (b) SGD nhóm nhỏ với bước hằng chọn theo $K$ (Hệ quả 06.35). Giả thiết của bảo đảm là $F$ bị chặn dưới, gradient Lipschitz, gradient nhóm không chệch và chặn phương sai; mất mát logistic có chính quy hóa thỏa các giả thiết này. Bảo đảm là $O(1/\sqrt K)$ cho trung bình kỳ vọng bình phương chuẩn gradient; vì mục tiêu $\mu$-lồi mạnh, $F(\theta)-F^*\le\lVert\nabla F(\theta)\rVert^2/(2\mu)$ (Bổ đề 05b.8(b), tức Mệnh đề 04.25(b)), nên gradient nhỏ kéo theo giá trị gần tối ưu. Cách khác: khi biết $\mu$, bước giảm dần $\tfrac1{\mu(k+1)}$ cho tốc độ $O(1/k)$ theo kỳ vọng (Định lý 06.32, dòng 3 của bảng ở Mục 7.2); trang chiếu không trình bày định lý này. Lý do chính là chi phí một bước: hạ gradient đầy đủ tốn $np=10^{14}$, Newton tốn $np^2+p^3\approx10^{20}$, còn một bước SGD tốn $bp$. Chỉ báo bổ sung (so bậc cho SGD trên hàm lồi mạnh): theo Bottou và Bousquet (2011, Bảng 13.2), với $\kappa=10$ và độ chính xác $10^{-6}$, hai bậc thời gian bằng nhau khi $n$ trong khoảng $10^5$–$10^6$, và $n=10^8$ vượt xa bậc đó. (c) SGD nhóm nhỏ (Thuật toán 06.2) với lịch bước và dừng sớm (Thuật toán 06.3); Định lý 06.34 chỉ là định hướng nếu mạng dùng ReLU.

2. Mệnh đề 06.9 là một phép kiểm tra tại một cặp cực tiểu toàn cục có hai đơn vị ẩn khác nhau. Trên dữ liệu khác, mọi cực tiểu có thể có các đơn vị trùng nhau; khi đó phép hoán vị không tạo cực tiểu mới và phép kiểm tra không kết luận.

3. Định lý 06.34 chặn trung bình theo $k$ của kỳ vọng bình phương chuẩn gradient của dãy lặp. Nó không chặn khoảng cách tới một cực tiểu, không chặn giá trị $F$, không phân biệt điểm yên ngựa với cực tiểu, và không chặn $R$ của tham số được trả về theo tập xác thực (Nhận xét 06.36).

4. Với $\eta$ cố định, số hạng $\tfrac{2\Delta_0}{\eta K}$ tiến về $0$ khi $K\to\infty$, còn số hạng $L\eta\sigma^2$ không phụ thuộc $K$; vế phải tiến về $L\eta\sigma^2$, nên cận không tiến về $0$. Muốn cận tiến về $0$, bước phải giảm theo $K$. Hệ quả 06.35 chọn $\eta=\min\{\tfrac1L,\sqrt{2\Delta_0/(L\sigma^2K)}\}$, tức $\eta$ tỉ lệ với $1/\sqrt K$ khi $K$ lớn; hai số hạng khi đó cùng bậc và cận là $O(1/\sqrt K)$.

**Kiểm tra.** Ở câu 1(b): $10^8\cdot10^{12}+10^{18}=1{,}01\cdot10^{20}$.
:::

## Nguồn

- Ian Goodfellow, Yoshua Bengio và Aaron Courville (2016), *Deep Learning*, MIT Press, mục 6.1 (nghiệm XOR (6.4)–(6.11) của Bài 1), mục 6.5 (lan truyền ngược), mục 7.8 (dừng sớm và (7.40)–(7.45) của Bài 9), mục 8.1–8.3.
- Léon Bottou và Olivier Bousquet (2011), "The Tradeoffs of Large-Scale Learning", chương 13 trong Sra, Nowozin và Wright (biên tập), *Optimization for Machine Learning*, MIT Press, Bảng 13.2 (tr. 362), dùng ở Bài 11.
- Ghi chú bài giảng Bài 06 và các ghi chú Bài 05b, 05c cho phát biểu và chứng minh của các định lý được dùng.

Mọi số liệu của các bài được tính lại bằng phân số chính xác hoặc đệ quy kỳ vọng; không có mô phỏng ngẫu nhiên.
