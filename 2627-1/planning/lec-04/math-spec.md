# Đặc tả toán và lựa chọn số — Bài giảng 04

## Trạng thái bản 2026-09-24

Đây là đặc tả của dàn bài mới46trang, chưa phản ánh HTML40trang đang công bố. Dùng cùng [outline.md](outline.md) và [storyboard.md](storyboard.md). Các ví dụ VD1–VD3 là ví dụ sư phạm tự xây dựng; nguồn BV/M16/M17 cung cấp cơ chế toán, không phải nguồn các số mới. Kết quả tính bằng phân số chính xác và phép thế hệ tuyến tính; không coi báo cáo worker là bằng chứng tự đủ.

## Kiểu, giả thiết và quy ước

Mặc định $x,g,d\in\mathbb R^n$ là vectơ cột, $H\in\mathbb R^{n\times n}$ đối xứng. Với đẳng thức: $u\in\mathbb R^n$, $A\in\mathbb R^{p\times n}$ hạng hàng đầy đủ, $p<n$, $b,\nu,r_p\in\mathbb R^p$, $r_d\in\mathbb R^n$. Dữ liệu mô hình học: $M\in\mathbb R^{m\times n}$, $y\in\mathbb R^m$, $\rho>0$; ký hiệu m không dùng lại cho hằng số lồi mạnh.

Dùng $\mu$ cho hằng số lồi mạnh, $L$ cho Lipschitz của gradient, $L_H$ cho Lipschitz của Hessian; $\alpha=1/10,\beta=1/2$ cho quay lui; t là độ dài bước. $\delta_N$ là độ giảm Newton không ràng buộc, $\delta_{eq}$ cho chế độ khả thi. $\eta$ là nhân tử mô hình khả thi; $\Delta\nu$ là hiệu chỉnh nhân tử ở Newton phần dư; hai đối tượng này không được trộn.

Phân biệt lồi, lồi chặt (còn gọi là lồi nghiêm ngặt), lồi mạnh và Hessian xác định dương. Tuyến Newton dùng giả thiết đủ $H\succ0$. Đẳng thức trong bài là affine; không mở rộng kết luận sang đẳng thức phi tuyến. Phép giải hệ là thao tác triển khai; công thức nghịch đảo chỉ dùng khi phân tích. Không dùng Cholesky cho toàn ma trận KKT bất định.

## Sổ số và kiểm tra trùng vai trò

| Ví dụ | Dữ kiện cố định | Đại lượng dẫn xuất cần giữ nhãn | Lý do chọn và giới hạn |
|---|---|---|---|
| VD1 | Hệ số3,7; $x^0=(2,4)$ | $g=(6,28)$; $f_0=62$; $\|g\|^2=820$; $d_G=(-6,-28)$; $d_N=(-2,-4)$ | Tọa độ, độ cong và gradient không trùng nhau. Dùng d_G/d_N để tránh nhầm hai hướng cùng điểm. $\kappa=7/3$ chỉ minh họa độ cong không đều. |
| VD2 | $\varphi(s)=s-\log s$, $s^0=1/4$ | $g=-3,H=16$, $d_N=3/16$, $s^1=7/16$, $\delta^2=9/16$, $\delta^2/2=9/32$ | Tránh điểm1/2 và1/3 vì d_N có thể trùng δ² hoặc δ²/2. Phân số giữ tính tay đơn giản; sai số thật tách riêng. |
| VD3 | Hệ số2,5; tổng14; khởi đầu khả thi(3,11), chưa khả thi(1,8), $\nu^0=4$ | Nghiệm(10,4); $\nu^*=-20$; bước khả thi(7,-7); bước chưa khả thi(9,-4), $\Delta\nu=-24$ | Nghiệm không nằm giữa đường tổng; khởi đầu và bước không bằng nghiệm. Dữ kiện hai chế độ được đặt trong bảng có nhãn. |

Không áp quy tắc “mọi số trên toàn bài phải khác nhau”. Một số trùng là hệ quả cần dạy: $-d_N=x^0$ trong VD1 vì nghiệm0; giảm mô hình62 bằng sai số thật62 vì hàm bậc hai; hai thành phần d khả thi đối dấu cùng độ lớn do $Ad=0$; $\eta=\nu^*=-20$ trong bài bậc hai. Giữ các đẳng thức này, giải thích bằng nhãn và phép suy luận. Số4 là thành phần nghiệm VD3 và nhân tử ban đầu được ghi đúng bối cảnh; không đặt cạnh nhau không nhãn. Không cần thay số chỉ để đạt khác biệt hình thức.

### VD1 — Hai hướng phải được kiểm riêng

$$
f(x)=\tfrac12(3x_1^2+7x_2^2),\quad x^0=(2,4)^T,\quad g=(6,28)^T.
$$

| t trên hướng gradient | Điểm thử | Giá trị f | Ngưỡng $62-82t$ | Kết quả |
|---|---|---:|---:|---|
| 1 | $(-4,-24)$ | 2040 | -20 | loại |
| 1/2 | $(-1,-10)$ | $703/2$ | 21 | loại |
| 1/4 | $(1/2,-3)$ | $255/8$ | $83/2$ | nhận |

Trên hướng Newton $d_N=(-2,-4)$, $\delta_N^2=124$; t=1 cho f=0 và ngưỡng $62-12{,}4=49{,}6$, nên nhận ngay. Hai bảng không dùng chung hệ số góc Armijo. Quỹ đạo cố định t=1/4 ở B01 là minh họa riêng, không suy đoán mọi vòng quay lui trả cùng t. Bảo đảm B05 áp dụng bước1/L, không gán sang t=1/4.

### VD2 — Sai số mô hình và sai số thật

$$
\varphi^\prime(s)=1-1/s,\quad \varphi^{\prime\prime}(s)=1/s^2,\quad \varphi^{\prime\prime\prime}(s)=-2/s^3.
$$

Tại $s^0=1/4$: $d_N=3/16$, $s^1=7/16$, $\delta_N^2=9/16$, $\delta_N^2/2=9/32=0{,}28125$. Sai số thật tại điểm đầu là $\varphi(1/4)-\varphi(1)=\log4-3/4\approx0{,}636294$. Mức giảm của một bước là $\log(7/4)-3/16\approx0{,}372116$; ba đại lượng không đổi tên cho nhau. Bước đầy đủ thỏa Armijo vì mức giảm yêu cầu chỉ là $\alpha\delta_N^2=0{,}05625$.

Tính tự điều chỉnh kiểm cho mọi s>0 bằng $|\varphi^{\prime\prime\prime}|=2(\varphi^{\prime\prime})^{3/2}$, không bằng một phép thử tại1/4. $-\log s$ có cùng đạo hàm bậc hai/ba nhưng không có cực tiểu hữu hạn, nên là phản ví dụ cho việc suy tồn tại nghiệm từ tính tự điều chỉnh.

### VD3 — Khử, Newton khả thi và Newton phần dư

$$
F(u)=\tfrac12(2u_1^2+5u_2^2),\quad A=[1\;1],\quad b=14.
$$

Khử: $\hat u=(14,0)$, $N=(-1,1)^T$, $u=\hat u+Nz$; $\psi(z)=196-28z+(7/2)z^2$. Nghiệm $z^*=4$, $u^*=(10,4)$, $\nu^*=-20$, $F^*=140$.

Khả thi: $u^0=(3,11)$, $g=(6,55)$, $F_0=623/2$. $d=(7,-7)$, $\eta=-20$ thỏa $Hd+A^T\eta=-g$, $Ad=0$. $\delta_{eq}^2=343$, giảm mô hình343/2 bằng $F_0-F^*$ vì bài bậc hai.

Chưa khả thi: $u^0=(1,8)$, $\nu^0=4$, $g=(2,40)$; **sau cộng** $A^T\nu$ mới có $r_d=(6,44)$, $r_p=-5$. Hệ và phép thế:

$$
\begin{bmatrix}2&0&1\\0&5&1\\1&1&0\end{bmatrix}
\begin{bmatrix}9\\-4\\-24\end{bmatrix}
=\begin{bmatrix}-6\\-44\\5\end{bmatrix}.
$$

Vì thế $u^1=(10,4)$, $\nu^1=-20$, hai phần dư đều0. Vế phải thứ hai là -44, không phải -40. Một báo cáo worker trước đó tính đúng rd=(6,44) nhưng đổi sang-40 khi giải; điều phối bác kết luận sai đó bằng phép thế trên.

## Danh mục hình thức hóa và mức chứng minh

| Mã; vị trí | Loại và phát biểu dùng | Giả thiết quyết định | Mức chứng minh; nguồn |
|---|---|---|---|
| HT1; A04 | Định nghĩa hướng giảm $g^Td<0$; hệ quả bước đủ nhỏ giảm hàm | f khả vi quanh x trong miền mở | Phác thảo khai triển bậc nhất; BV§9.2, M16 10–5 |
| HT2; A05–07 | Thuật toán Armijo với kiểm miền và bất đẳng thức giảm đủ | gᵀd<0; α∈(0,1/2),β∈(0,1); khả vi | Chứng minh kết thúc từ đạo hàm hướng; BV§9.2.1, M16 10–6 |
| HT3; B03–04 | Định nghĩa giảm dốc nhất chuẩn hóa; quy ước dạng không chuẩn hóa; trường hợp W giải Wd=-g | g≠0; W đối xứng xác định dương | Cauchy–Schwarz cho Euclid/W; chuẩn đối ngẫu chỉ phát biểu đủ dùng; BV§9.4, M16 10–11 đến10–13 |
| HT4; B05 | Mệnh đề: với bước1/L, sai số hàm bị chặn bởi $(1-\mu/L)^k$ lần sai số đầu | f lồi mạnh μ, gradient Lipschitz L trên toàn miền xét chứa các đoạn/bước; nghiệm đạt được | Phác thảo bổ đề giảm và chặn gradient; không đồng nhất với đường hội tụ thực nghiệm; BV§9.3 |
| HT5; C03 | Mệnh đề: q có nghiệm duy nhất Hd=-g; gᵀd=-dᵀHd<0 khi g≠0 | H≻0 | Chứng minh đầy đủ hai dòng bằng đạo hàm q và tính xác định dương; BV§9.5.1 |
| HT6; C04,C08 | Định nghĩa δ và đẳng thức giảm mô hình δ²/2 | H≻0, d nghiệm hệ Newton | Thay Hd=-g vào q; VD2 bác việc đồng nhất sai số thật; BV§9.5.1 |
| HT7; C05 | Thuật toán Newton quay lui; dừng theo mô hình | điểm đầu trong miền, H≻0 tại các lần lặp, Armijo hợp lệ | Giải thích từng bước, không chứng nhận khoảng cách nghiệm chỉ từ δ²/2; BV§9.5.2,9.7 |
| HT8; C06 | Mệnh đề hội tụ hai pha và bậc hai cục bộ | f hai lần khả vi liên tục; tập mức ban đầu đóng nằm trong miền; lồi mạnh; Hessian Lipschitz, chặn trên/dưới trên vùng xét | Phác thảo dùng sai số tuyến tính hóa; xem công thức(9.31)–(9.33), BV§9.5.3. Không áp cho hàm phi lồi |
| HT9; D03–05 | Định nghĩa tự điều chỉnh một biến và qua mọi đường trong đa biến; tính bất biến affine | lồi, C³, miền mở lồi; xét trong miền hợp lệ | Chứng minh trường hợp log và đổi biến một chiều; không giảng tensor hay chứng minh toàn bộ cận số vòng; BV§9.6, M16 10–25,10–26 |
| HT10; E04 | Tham số hóa u=uhat+Nz; gradient/Hessian rút gọn | A hạng p<n, Auhat=b, N cơ sở ker A | Chứng minh biểu diễn và quy tắc dây chuyền; BV§10.1.2 |
| HT11; E06 | Hệ Newton khả thi và khả nghịch của hệ khối | u khả thi, H≻0, A hạng hàng đầy đủ | Chứng minh bằng nhân dᵀ rồi dùng hạng A; BV§10.2.1 |
| HT12; E07 | Độ giảm khả thi δeq²=dᵀHd; vòng Newton bảo toàn Au=b | hệ E06, Armijo trên F, kiểm miền | Chứng minh Ad=0⇒A(u+td)=b; dừng chỉ theo mô hình; BV§10.2 |
| HT13; E10–12 | Newton cho r=(rd,rp); Jacobian là hệ KKT; quay lui theo chuẩn phần dư | f C², H≻0, A hạng đầy đủ; điểm đầu trong miền. Khi phát biểu hội tụ cần tính đều Jacobian và nghiệm, không tự suy từ hệ khả nghịch | Tuyến tính hóa rd,rp; phép thế VD3; BV§10.3.1–10.3.2. Không khẳng định hội tụ từ mọi điểm đầu |

BV là Boyd và Vandenberghe, *Convex Optimization* (2004), chương9 trang in457–520, chương10 trang521–560; bản PDF cục bộ lệch+14 trang so với số in. Đọc mục cụ thể theo bảng trên. M16/M17 được truy nguyên trong source-map.md; trang PDF của hai bộ MIT trùng chỉ số sau dấu gạch ở nhãn10–k/11–k, giấy phép ở trang cuối.

### Kiểm riêng hệ số hội tụ ở B05

Đặt $e=f(x)-f^*$. Bổ đề giảm với bước1/L cho $e^+\le e-\|g\|_2^2/(2L)$. Tính lồi mạnh cho $\|g\|_2^2\ge2\mu e$. Thế vào được $e^+\le e-(\mu/L)e=(1-\mu/L)e$. Hệ số2 triệt tiêu; không phải $1-2\mu/L$. Nhận xét của reviewer đề xuất hệ số sau đã bị bác bằng phép thế này.

## Thuật toán, dừng và chi phí cần giữ khi triển khai

Gradient/chuẩn W: kiểm gradient, tạo d, tìm t, cập nhật; g=0 thì dừng. Nếu có lồi mạnh μ, chặn sai số hàm bởi $\|g\|^2/(2\mu)$ có thể biến dung sai gradient thành chứng nhận; nếu thiếu μ thì chỉ ghi dừng theo chuẩn gradient. Mỗi vòng có chi phí tính gradient và số lần đánh giá hàm; với W còn có chi phí giải hệ.

Newton không ràng buộc: giải H d=-g bằng phân tích phù hợp, không nghịch đảo; tính δ² và kiểm trước cập nhật. H đặc dương tổng quát có chi phí phân tích bậc n³ và bộ nhớ bậc n²; cấu trúc thưa/đường chéo thay đổi chi phí. Newton đẳng thức dùng hệ bất định n+p hoặc khử; không gán chi phí Cholesky n³ cho toàn hệ KKT.

Newton phần dư: đầu vào u0 trong miền, ν0,α,β,εd,εp,giới hạn vòng. Lặp tính rd,rp; dừng khi cả hai chuẩn đạt dung sai; giải hệ; thử miền rồi điều kiện giảm chuẩn r; cập nhật đồng thời u,ν. Các bảo đảm dùng phần dư chưa chuẩn hóa theo nguồn; thực hành phải chú ý tỷ lệ/đơn vị khi gộp hai phần dư. Nếu không nhận được bước hoặc hết vòng, trả trạng thái chưa đạt, không trả nhãn tối ưu.
