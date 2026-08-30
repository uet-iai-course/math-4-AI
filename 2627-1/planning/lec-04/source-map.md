# Đặc tả nguồn và mẫu Bài giảng 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

## 1. Phạm vi đã khóa

- Bài thuộc **Buổi 4**, gồm Chương 6 “Tối ưu không ràng buộc” và Chương 7 “Tối ưu với các ràng buộc đẳng thức” theo đề cương UET.AI2012.
- Thời lượng chính thức là 2 tiết lý thuyết và 1 tiết bài tập. Không quy đổi thành phút trên trang chiếu.
- Tiên quyết: gradient, Hessian, hàm lồi, điều kiện tối ưu bậc nhất, đối ngẫu và KKT từ Bài 01–03.
- Phạm vi bắt buộc: phương pháp giảm; tìm kiếm đường; gradient descent; steepest descent; Newton; độ giảm Newton; hàm tự điều chỉnh; quy trình thuật toán không ràng buộc; khử đẳng thức; Newton với khởi đầu khả thi và không khả thi.
- Không mở sang trust-region, quasi-Newton, phương pháp điểm trong, bất đẳng thức hoặc tối ưu ngẫu nhiên. Phân rã ma trận chỉ trình bày ở mức “giải hệ, không lập nghịch đảo”.
- Bài dùng đúng bảy mạch `P/A/B/C/D/E/Z` theo `plan.md`. Bảng dưới dự kiến 40 trang; storyboard được phép đổi khi chứng minh được trang thiếu hoặc dư.

### LLO/CLO nguyên văn và sản phẩm đánh giá

- **LLO6 / CLO1:** “Hiểu và vận dụng được các thuật toán để giải các bài toán tối ưu không ràng buộc như thuật toán gradient descent, steepest descent, Newton.”
- **LLO7 / CLO1:** “Hiểu và vận dụng được khái niệm các hàm tự điều chỉnh trong bài toán tối ưu không ràng buộc.”
- **LLO8 / CLO2:** “Hiểu rõ và biết áp dụng từng bước để thực hiện một thuật toán tối ưu không ràng buộc.”
- **LLO9 / CLO1:** “Hiểu rõ và biết áp dụng phương pháp Newton tổng quát để giải bài toán tối ưu ràng buộc đẳng thức.”
- **LLO10 / CLO2:** “Hiểu rõ và biết áp dụng từng bước để thực hiện một thuật toán tối ưu ràng buộc đẳng thức.”
- Minh chứng tối thiểu: người học tính được hướng, bước, cập nhật và điều kiện dừng; phân biệt gradient với steepest descent theo chuẩn; kiểm tra được một hàm tự điều chỉnh; lập đúng hệ Newton–KKT và phần dư cho hai chế độ khởi đầu.

## 2. Kiểm kê và thứ tự ưu tiên nguồn

| Ưu tiên | Nguồn | Phạm vi dùng | Quyết định |
|---:|---|---|---|
| 1 | Đề cương UET.AI2012 chính thức | Buổi 4, LLO6–10, CLO1–2, 2 LT + 1 BT | Thẩm quyền phạm vi và chuẩn đầu ra |
| 2 | `sources/part1.docx` | Tuần 4, chế độ nghiêm ngặt | Giữ yêu cầu nêu giả thiết, bảo đảm và giới hạn |
| 3 | `2627-1/planning/lec-04/plan.md`; master plan §6 | Bảy mạch, bốn hành trình, rủi ro | Khung tổ chức đã duyệt |
| 4 | `sources/bv_cvxbook.pdf`, Ch. 9–10 | Định nghĩa, thuật toán, hội tụ, hệ KKT | Nguồn toán học chính: Ch. 9, trang sách 457–520; Ch. 10, trang 521–559 |
| 5 | MIT 6.079/6.975 Lecture 16 | Trình tự tối ưu không ràng buộc | Mẫu thứ tự A–D; chọn lọc, không sao chụp hình |
| 6 | MIT 6.079/6.975 Lecture 17 | Trình tự tối ưu đẳng thức | Mẫu thứ tự E; lược các ứng dụng dài |
| 7 | `sources/Chương 5.pdf` | Thuật ngữ tiếng Việt và tuyến nội dung không ràng buộc | Nguồn Việt chính; đối chiếu lại mọi công thức bằng Boyd/MIT |
| 8 | `sources/Chương 5phần 1.pdf` | 12 trang đầu của cùng tuyến Chương 5 | Bản rút gọn, không tính là nguồn độc lập |
| 9 | `sources/Chương 5p2.pptx` | Hai trang mở đầu phần Newton | Chỉ tham khảo thuật ngữ; không đủ làm mẫu |
| 10 | Hai PDF `Chương 6 Tối ưu với các ràng buộc đẳng thức...` | Ghi chép tay về KKT, Newton khả thi/không khả thi; bản thứ hai thêm analytic centering | Nguồn bổ sung có OCR yếu; không dùng làm thẩm quyền công thức hoặc tài sản hình |

### Trạng thái nguồn MIT

- Lecture 16: trang tài nguyên `https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/resources/mit6_079f09_lec16/`; PDF chính thức `https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/b9e5d6e835bcd8071edc67771e5362e7_MIT6_079F09_lec16.pdf`.
- Lecture 17: trang tài nguyên `https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/resources/mit6_079f09_lec17/`; PDF chính thức `https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/4c428302acfe82bee62cf037829a8abd_MIT6_079F09_lec17.pdf`.
- Khóa học: MIT 6.079 / 6.975, *Introduction to Convex Optimization*, Fall 2009; giảng viên Stephen Boyd và Pablo Parrilo; tài liệu dựa trên Boyd và Vandenberghe.
- Ngày kiểm tra URL: `2026-08-28`. MIT OCW công bố CC BY-NC-SA 4.0; quyền của tài sản bên thứ ba vẫn phải kiểm riêng.
- Hai bản Lecture 16 có cùng kích thước 498331 byte và SHA-256 `bfacc5ec5826b58fbb30435e91a80f9e4ce26ecbd68b07b695b4ab4b9b18ee8d`; chỉ dùng `sources/b9e5d6e835bcd8071edc67771e5362e7_MIT6_079F09_lec16.pdf`.
- Lecture 17 tại `sources/4c428302acfe82bee62cf037829a8abd_MIT6_079F09_lec17.pdf`, 183694 byte, SHA-256 `c095477564ed820a1b4d813a0d729ec44d5c85fa39c070f2bc82913b7eab0b36`.
- `sources/MIT/README.md` đã có mục Lecture 16–17 với URL chính thức, ngày tải, giấy phép, vai trò, đường dẫn cục bộ và checksum. Deck dùng hai tài nguyên đúng vai trò đã ghi; không di chuyển hoặc đổi tên tệp.

## 3. Thứ tự nội dung kế thừa

1. **MIT Lecture 16, 10-2–10-6 / Boyd §§9.1–9.2:** bài toán, điểm đầu, tập mức, phương pháp giảm và tìm kiếm đường.
2. **MIT 10-7–10-13 / Boyd §§9.3–9.4:** gradient descent, ví dụ điều kiện kém, steepest descent và lựa chọn chuẩn.
3. **MIT 10-14–10-23 / Boyd §9.5:** bước Newton, độ giảm Newton, thuật toán, giả thiết hội tụ và hai pha.
4. **MIT 10-24–10-28 / Boyd §9.6:** hàm tự điều chỉnh, phép tính và bảo đảm có điều kiện.
5. **MIT 10-29–10-30:** triển khai bằng giải hệ; chỉ giữ thông điệp Cholesky/cấu trúc, lược đếm flop chi tiết.
6. **MIT Lecture 17, 11-2–11-5 / Boyd §10.1:** dạng đẳng thức, KKT bậc hai và khử ràng buộc.
7. **MIT 11-6–11-9 / Boyd §10.2:** Newton từ điểm khả thi, độ giảm và tương đương với bài toán rút gọn.
8. **MIT 11-10–11-12 / Boyd §§10.3–10.4:** phần dư gốc–đối ngẫu, Newton khởi đầu không khả thi và giải hệ KKT.

Các trang MIT 10-9–10-10, 10-21–10-23, 10-28, 11-13–11-19 chỉ dùng làm bằng chứng về hành vi hoặc cấu trúc trong notes. Không đưa đồ thị thực nghiệm MIT lên mặt slide. Analytic centering, network flow và LMI center được lược vì mở sang điểm trong hoặc ứng dụng vượt thời lượng.

## 4. Ánh xạ 40 trang dự kiến

| Mạch | Mã | Luận điểm/vai trò bắt buộc | Nguồn theo thứ tự | Giữ, gộp hoặc lược |
|---|---|---|---|---|
| P | P00 | Định danh Buổi 4 và hai lớp bài toán | Đề cương | thêm |
| P | P01 | Khóa tiên quyết và kiểu đại lượng | Bài 01–03; plan | thêm; không dạy lại gradient/Hessian/KKT |
| P | P02 | Trích đúng LLO6–10 và sản phẩm đánh giá | Đề cương | giữ nguyên văn; nhóm theo CLO |
| P | P03 | Vấn đề trung tâm: biến điều kiện tối ưu thành dãy lặp có dừng và bảo đảm | `part1.docx`; plan | thêm bản đồ bảy mạch |
| A | A01 | Điều kiện $\nabla f=0$ chưa cho quy trình tìm nghiệm | Boyd §9.1; MIT 10-2 | nhu cầu trước thuật toán |
| A | A02 | Khóa bài toán, miền mở, nghiệm đạt, điểm đầu và tập mức | Boyd §§9.1.1–9.1.2; MIT 10-2–10-4 | gộp giả thiết; không biến thành danh sách trang trí |
| A | A03 | Hướng giảm tạo thay đổi âm bậc nhất | Boyd §9.2; MIT 10-5 | trực quan đường mức và $g^Td<0$ |
| A | A04 | Giới thiệu ví dụ bậc hai điều kiện kém và mọi dữ kiện | MIT 10-8; ví dụ số Mục 6 | ví dụ xuyên A–C; SVG tự vẽ |
| A | A05 | Exact line search và Armijo backtracking | Boyd §9.2.1; MIT 10-6 | giữ $\alpha\in(0,1/2)$, $\beta\in(0,1)$ |
| A | A06 | Chạy backtracking một bước trên ví dụ | phép tính Mục 6 | ứng dụng có thể kiểm tra |
| A | A07 | Khuôn hướng → bước → cập nhật → dừng | MIT 10-5–10-7 | gộp giả mã; bài tập chạy bước kế |
| B | B01 | Điều kiện hóa quyết định quỹ đạo của gradient | MIT 10-8, 10-13 | nhu cầu; không dùng đồ thị MIT trực tiếp |
| B | B03 | Quan sát zigzag và hệ số co trên ví dụ $\gamma=10$ | MIT 10-8; phép tính Mục 6 | ví dụ trước khái quát chuẩn |
| B | B02 | Gradient descent là steepest descent theo chuẩn Euclid | Boyd §9.3; MIT 10-7 | thuật toán, dừng bằng $\|\nabla f\|_2$ |
| B | B04 | Định nghĩa steepest descent theo chuẩn và chuẩn đối ngẫu | Boyd §9.4.1; MIT 10-11 | nêu normalized và unnormalized rõ ràng |
| B | B05 | Chuẩn bậc hai tạo tiền điều kiện $-W^{-1}g$ | Boyd §9.4.2; MIT 10-12–10-13 | ứng dụng cùng ví dụ; $W=H$ cho hướng Newton |
| B | B06 | So sánh Euclid và chuẩn $H$ trên cùng điểm | phép tính Mục 6 | bài tập LLO6/LLO8 |
| C | C01 | Độ cong khác nhau tạo nhu cầu mô hình bậc hai | Boyd §9.5.1; MIT 10-14 | nhu cầu và trực quan |
| C | C03 | Trên bậc hai, Newton đi đúng nghiệm trong một bước | ví dụ số Mục 6 | ví dụ dẫn nhập trước phát biểu tổng quát |
| C | C02 | Newton là nghiệm của hệ Hessian và cực tiểu mô hình bậc hai | Boyd §9.5.1; MIT 10-14–10-15 | viết $H\Delta x=-g$, không lập $H^{-1}$ |
| C | C04 | Độ giảm Newton đo giảm của mô hình | Boyd §9.5.1; MIT 10-16 | dùng ký hiệu đã chuẩn hóa $\delta_N(x)$ |
| C | C05 | Thuật toán Newton đầy đủ với backtracking và dừng | Boyd §9.5.2; MIT 10-17 | đủ đầu vào, hướng, bước, cập nhật, dừng |
| C | C06 | Hai pha hội tụ và giả thiết cần | Boyd §9.5.3; MIT 10-18–10-20 | giữ định tính; không hứa hội tụ bậc hai vô điều kiện |
| C | C07 | Triển khai bằng Cholesky hoặc bộ giải hệ | Boyd §9.5.4; MIT 10-29–10-30 | lược công thức cấu trúc dài; nhấn mạnh chi phí |
| C | C08 | Tính một bước Newton và decrement cho $s-\log s$ | MIT 10-25; phép tính Mục 6 | bài tập, đồng thời nối sang D |
| D | D01 | Phân tích cổ điển dùng các hằng số thường không biết và không bất biến affine | Boyd §9.6; MIT 10-24 | nhu cầu |
| D | D03 | Ví dụ $\phi(s)=s-\log s$ cho quan hệ đạo hàm bậc ba | Boyd §9.6.1; phép tính Mục 6 | ví dụ trước định nghĩa tổng quát |
| D | D02 | Định nghĩa tự điều chỉnh một chiều và theo mọi đường thẳng | Boyd §9.6.1; MIT 10-25 | hình thức; miền mở, lồi, đạo hàm cấp ba |
| D | D04 | Bất biến affine, phép tính đóng và bảo đảm Newton có điều kiện | Boyd §§9.6.2–9.6.4; MIT 10-26–10-27 | gộp; không chứng minh dài |
| D | D05 | Kiểm tra $-\log s$ và nêu giới hạn của khái niệm | Boyd §9.6; MIT 10-25 | bài tập LLO7; nhắc tự điều chỉnh không tự bảo đảm có nghiệm |
| E | E01 | Bước Newton thường phá $Ax=b$ | Boyd §10.1; MIT 11-2 | nhu cầu từ KKT Bài 03 |
| E | E02 | Dạng bài, kích thước, hạng và ví dụ bậc hai có đẳng thức | Boyd §10.1; MIT 11-2–11-3; Mục 7 | ví dụ xuyên E; ứng dụng phân bổ |
| E | E03 | Khử đẳng thức bằng $x=Fz+\hat x$ | Boyd §10.1.2; MIT 11-4–11-5 | giữ điều kiện $AF=0$, $\operatorname{rank}F=n-p$ |
| E | E04 | Newton khả thi giải hệ Newton–KKT với $A\Delta x=0$ | Boyd §10.2.1; MIT 11-6–11-8 | hình thức và thuật toán |
| E | E05 | Tính bước khả thi từ $(1/2,1/2)$ | phép tính Mục 7 | ứng dụng/bài tập LLO9 |
| E | E06 | Newton không khả thi dùng $r_d,r_p$ và backtracking theo chuẩn phần dư | Boyd §10.3; MIT 11-10–11-11 | phân biệt $\eta$ với $\Delta\nu$; dừng số gần đúng |
| E | E07 | Tính một bước từ $(0,0,0)$ và chọn cách giải hệ | MIT 11-12; phép tính Mục 7 | bài tập LLO10; nhắc LDLT/Schur |
| Z | Z01 | Bảng quyết định: gradient, steepest, Newton, Newton–KKT | tổng hợp Boyd Ch. 9–10 | trả lời P03 |
| Z | Z02 | Bài tích hợp: hướng, bước, decrement, phần dư và dừng | hai ví dụ Mục 6–7 | tự kiểm tra LLO6–10; đáp án ở notes |
| Z | Z03 | Nguồn, giới hạn và cầu nối tối ưu học sâu | đề cương; Boyd; MIT | không đưa planning lên index |

## 5. Định nghĩa, định lý và thuật toán phải chốt

### 5.1. Bài toán và phương pháp giảm

Cho $f:\mathbb R^n\to\mathbb R\cup\{+\infty\}$ lồi, khả vi liên tục cấp hai trên miền mở $\operatorname{dom}f$. Trên tuyến chính giả sử $p^*=\inf_x f(x)$ hữu hạn và đạt được, $x^{(0)}\in\operatorname{dom}f$, và tập mức

$$
S=\{x\mid f(x)\le f(x^{(0)})\}
$$

đóng. Đặt $g=\nabla f(x)$. Hướng $d$ là hướng giảm khi $g^Td<0$. Cập nhật chung là $x^+=x+td$.

Backtracking Armijo: bắt đầu $t=1$, lặp $t\leftarrow\beta t$ đến khi

$$
f(x+td)\le f(x)+\alpha t g^Td,
\qquad \alpha\in(0,1/2),\quad \beta\in(0,1).
$$

Không trộn $t$ với chỉ số vòng lặp và không gọi exact line search là tiêu chuẩn thực hành mặc định.

### 5.2. Gradient và steepest descent

- Gradient descent: $d=-g$; đây là steepest descent theo chuẩn Euclid.
- Với chuẩn $\|\cdot\|$ và chuẩn đối ngẫu $\|\cdot\|_*$,

$$
d_{\mathrm{nsd}}=\operatorname*{argmin}_{\|v\|=1}g^Tv,
\qquad d_{\mathrm{sd}}=\|g\|_*d_{\mathrm{nsd}},
\qquad g^Td_{\mathrm{sd}}=-\|g\|_*^2.
$$

- Với $\|v\|_W=(v^TWv)^{1/2}$, $W\in\mathbb S_{++}^n$, hướng không chuẩn hóa là $d=-W^{-1}g$.
- Phát biểu hội tụ tuyến tính chỉ dùng khi có $\mu I\preceq\nabla^2f(x)\preceq MI$ trên tập mức liên quan và line search phù hợp. Không suy từ “lồi” sang tốc độ tuyến tính.

### 5.3. Newton và độ giảm Newton

Với $H=\nabla^2f(x)\succ0$, tính hướng bằng hệ

$$
H\Delta x_N=-g.
$$

Không viết việc lập $H^{-1}$ như một bước triển khai. Độ giảm Newton được ký hiệu trong deck là

$$
\delta_N(x)^2=-g^T\Delta x_N=\Delta x_N^TH\Delta x_N.
$$

Đây là độ giảm của mô hình bậc hai: khoảng cách mô hình là $\delta_N^2/2$; không mặc định bằng sai số thật $f(x)-p^*$. Tiêu chuẩn dừng là $\delta_N^2/2\le\varepsilon$ trong phạm vi bảo đảm thích hợp.

Phát biểu hai pha cần $f$ lồi mạnh trên $S$, $H$ Lipschitz trên $S$ và backtracking phù hợp. Pha tắt dần cho giảm hữu hạn mỗi vòng; gần nghiệm, bước đầy đủ được nhận và gradient hội tụ bậc hai. Không dùng bảo đảm này khi Hessian suy biến, không xác định dương hoặc bài toán phi lồi.

### 5.4. Hàm tự điều chỉnh

Một hàm lồi $\phi:\mathbb R\to\mathbb R$ đạo hàm ba lần là tự điều chỉnh chuẩn nếu

$$
|\phi'''(s)|\le2\phi''(s)^{3/2}.
$$

$f:\mathbb R^n\to\mathbb R$ tự điều chỉnh khi $t\mapsto f(x+tv)$ tự điều chỉnh trên mọi đường thẳng nằm trong miền. Giữ các mệnh đề: bảo toàn qua hợp affine, tổng và nhân hệ số $a\ge1$; không nói mọi phép nhân dương đều bảo toàn. Tự điều chỉnh là một lớp hàm đặc biệt, không tự bảo đảm nghiệm tồn tại hoặc Newton hội tụ từ mọi điểm.

### 5.5. Newton với $Ax=b$

Khóa kích thước

$$
x\in\mathbb R^n,\quad A\in\mathbb R^{p\times n},\quad b\in\mathbb R^p,
\quad \operatorname{rank}A=p<n.
$$

Với $H=\nabla^2f(x)$, hệ KKT khả nghịch khi $H$ xác định dương trên $\operatorname{null}A$:

$$
Av=0,\ v\ne0\Longrightarrow v^THv>0.
$$

Tại điểm khả thi, hướng Newton và biến phụ $\eta$ giải

$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}
\begin{bmatrix}\Delta x_N\\\eta\end{bmatrix}
=-
\begin{bmatrix}g\\0\end{bmatrix},
$$

nên $A\Delta x_N=0$ và mọi cập nhật vẫn khả thi. Khi khởi đầu không khả thi, đặt

$$
r_d(x,\nu)=\nabla f(x)+A^T\nu,
\qquad r_p(x)=Ax-b,
$$

và giải

$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}
\begin{bmatrix}\Delta x_N\\\Delta\nu_N\end{bmatrix}
=-
\begin{bmatrix}r_d\\r_p\end{bmatrix}.
$$

Backtracking thực hiện trên $\|r\|_2$; tiêu chuẩn dừng triển khai dùng $\|r_d\|_2\le\varepsilon_d$ và $\|r_p\|_2\le\varepsilon_p$, không đòi đẳng thức dấu phẩy động tuyệt đối.

## 6. Ví dụ số xuyên suốt cho gradient và Newton

Chọn đúng ví dụ MIT nhưng tự tính và tự vẽ:

$$
f(x)=\frac12(x_1^2+10x_2^2),
\qquad x^{(0)}=(10,1)^T,
\qquad H=\begin{bmatrix}1&0\\0&10\end{bmatrix}.
$$

- $p^*=0$, $x^*=0$, $f(x^{(0)})=55$, $g^{(0)}=(10,10)^T$.
- Gradient với exact line search:

$$
t_0=\frac{g^Tg}{g^THg}=\frac2{11},
\qquad x^{(1)}=\left(\frac{90}{11},-\frac9{11}\right)^T,
\qquad f(x^{(1)})=\frac{4455}{121}.
$$

- Tổng quát, với $\rho=9/11$:

$$
x_1^{(k)}=10\rho^k,
\qquad x_2^{(k)}=(-\rho)^k,
$$

cho quỹ đạo zigzag chậm do số điều kiện $\kappa(H)=10$.
- Với Armijo $\alpha=0.1$, $\beta=0.5$ và $d=-g$, $t=1$ và $t=1/2$ thất bại; $t=1/4$ được nhận, cho $x^+=(7.5,-1.5)^T$, $f(x^+)=39.375$.
- Newton: $\Delta x_N=-H^{-1}g=(-10,-1)^T$, $x^+=0$ sau một bước; $\delta_N^2=g^TH^{-1}g=110$ và $\delta_N^2/2=55=f(x^{(0)})-p^*$ vì đây là bậc hai.
- Steepest descent theo chuẩn $H$ cũng cho $-H^{-1}g$; đây là điểm nối giữa B và C, không phải khẳng định gradient Euclid luôn bằng Newton.

Ví dụ phụ cho Newton phi bậc hai và tự điều chỉnh:

$$
\phi(s)=s-\log s,\qquad s>0.
$$

$\phi'(s)=1-1/s$, $\phi''(s)=1/s^2$, $\phi'''(s)=-2/s^3$, nên đạt dấu bằng trong bất đẳng thức tự điều chỉnh. Tại $s_0=1/2$, $\Delta s_N=1/4$, $s_1=3/4$ và $\delta_N(s_0)^2=(s_0-1)^2=1/4$. Nghiệm là $s^*=1$.

## 7. Ví dụ số xuyên suốt cho ràng buộc đẳng thức

$$
\begin{aligned}
\operatorname*{minimize}_{x\in\mathbb R^2}\quad
&\frac12(x_1^2+4x_2^2)\\
\text{với}\quad &x_1+x_2=1.
\end{aligned}
$$

Đặt $H=\operatorname{diag}(1,4)$, $A=[1\ 1]\in\mathbb R^{1\times2}$, $b=1$. Hệ KKT cho nghiệm cho

$$
x^*=\left(\frac45,\frac15\right)^T,
\qquad \nu^*=-\frac45.
$$

- Khởi đầu khả thi $x^{(0)}=(1/2,1/2)^T$: hệ Newton–KKT cho $\Delta x=(3/10,-3/10)^T$, $\eta=-4/5$; bước đầy đủ đến đúng $x^*$ và giữ $A\Delta x=0$.
- Khởi đầu không khả thi $(x^{(0)},\nu^{(0)})=(0,0,0)$: $r_d=(0,0)^T$, $r_p=-1$; hệ primal–dual cho $\Delta x=(4/5,1/5)^T$, $\Delta\nu=-4/5$, nên bước đầy đủ đến nghiệm.
- Khử đẳng thức có thể dùng $\hat x=(1,0)^T$, $F=(-1,1)^T$ hoặc một tham số hóa tương đương; phải kiểm tra $AF=0$ trước khi dùng.
- Vai trò ứng dụng: phân bổ một tổng tài nguyên bằng 1 giữa hai thành phần có độ cong chi phí khác nhau. Không gọi đây là bằng chứng thực nghiệm AI.

## 8. Xung đột, giả thiết thiếu và quy ước ký hiệu

| Mức | Vị trí | Vấn đề | Quyết định chuẩn hóa |
|---|---|---|---|
| Chặn bàn giao | Mọi phát biểu hội tụ | Dễ nói gradient/Newton hội tụ tuyến tính hoặc bậc hai chỉ từ tính lồi | Ghi rõ $\mu I\preceq H\preceq MI$, Hessian Lipschitz, tập mức và line search tương ứng |
| Chặn bàn giao | Newton đẳng thức | Dễ sai dấu, kích thước hoặc điều kiện khả nghịch KKT | Khóa $A\in\mathbb R^{p\times n}$, hạng hàng đầy đủ và $H\succ0$ trên $\operatorname{null}A$ |
| Nghiêm trọng | Đề cương/local/Boyd/MIT | Cùng nội dung được đánh số Ch. 6–7, Ch. 5–6, Ch. 9–10 và slide 10–11 | Ghi tên chủ đề; chỉ dùng số chương đi kèm đúng nguồn |
| Nghiêm trọng | `Chương 5.pdf`, trang 31 | Ghi “Newton và Nemirovski” | Dùng đúng **Nesterov và Nemirovski** theo đề cương, Boyd và MIT |
| Nghiêm trọng | Gradient/steepest | “Gradient descent” dễ bị đồng nhất với steepest descent theo mọi chuẩn | Gradient là trường hợp chuẩn Euclid; chuẩn tổng quát phải nêu chuẩn đối ngẫu và hướng tương ứng |
| Nghiêm trọng | Newton | Công thức $-H^{-1}g$ dễ bị biến thành thao tác lập nghịch đảo | Mặt slide và giả mã dùng `giải $H\Delta=-g$` |
| Nghiêm trọng | Newton decrement | Ký hiệu $\lambda$ xung đột nhân tử Lagrange Bài 03 | Deck dùng $\delta_N(x)$; notes nêu MIT/Boyd dùng $\lambda(x)$ |
| Nghiêm trọng | Hai chế độ đẳng thức | $\eta$ của bước khả thi bị lẫn với $\Delta\nu$ của bước primal–dual | Đặt tên và RHS riêng; không trộn hai hệ trên một công thức |
| Trung bình | MIT backtracking | Nguồn dùng dấu nghiêm trong Armijo | Deck dùng $\le$ theo quy ước thuật toán; không ảnh hưởng logic |
| Trung bình | Hằng số | $m$ vừa là số ràng buộc, vừa là hằng số lồi mạnh | Dùng $\mu$ cho lồi mạnh, $M$ cho chặn trên Hessian, $L_H$ cho Lipschitz Hessian |
| Trung bình | Ma trận | $P$ dùng cho bậc hai và cho chuẩn | Ví dụ dùng $H$ cho Hessian, $W$ cho ma trận chuẩn |
| Trung bình | Self-concordance | Dễ nói tự điều chỉnh bảo toàn qua mọi hệ số dương | Chỉ ghi hệ số $a\ge1$ cho định nghĩa chuẩn; phân biệt biến thể có tham số |
| Trung bình | Khởi đầu không khả thi | MIT ghi dừng bằng $Ax=b$ chính xác | Khi triển khai số dùng hai ngưỡng phần dư; notes mới nhắc giới hạn dấu phẩy động |
| Trung bình | Hai PDF Chương 6 | Bản quét viết tay và khác số trang, OCR không đủ | Chỉ dùng để đối chiếu thuật ngữ; tự gõ và kiểm công thức bằng Boyd/MIT |
| Nhẹ | Ký hiệu vòng lặp | $x^+$, $x^{(k+1)}$, `x :=` xuất hiện lẫn nhau | Mặt slide dùng $x^{(k+1)}$; giả mã có thể dùng `x ← x+td` |

## 9. Quyết định giữ, gộp và lược

- **Giữ:** khuôn descent/backtracking; gradient và steepest theo chuẩn; ví dụ điều kiện kém; Newton step/decrement/algorithm; hai pha có giả thiết; định nghĩa tự điều chỉnh; khử đẳng thức; Newton khả thi và không khả thi; giải hệ KKT.
- **Gộp:** điểm đầu, tập mức và giả thiết vào A02; exact/backtracking vào A05; các diễn giải Newton vào C02–C04; self-concordant calculus và bảo đảm vào D04; KKT solve/Schur vào notes E07.
- **Lược khỏi tuyến chính:** các ví dụ ngẫu nhiên MIT, đếm flop chi tiết, analytic centering, network flow, LMI center, trust-region, Newton phi lồi, quasi-Newton và chứng minh hội tụ dài.
- **Thay hình nguồn:** tự vẽ đường mức/quỹ đạo của bậc hai, đồ thị Armijo, mô hình bậc hai, hai pha và không gian rỗng. Không sao chụp đồ thị MIT hoặc bản viết tay Chương 6.
- **Giữ nguồn Việt ở vai trò ngôn ngữ:** dùng “hướng giảm”, “tìm kiếm đường quay lui”, “độ giảm Newton”, “hàm tự điều chỉnh”, “khởi đầu không khả thi”; thuật ngữ lần đầu có tiếng Anh trong ngoặc khi cần.

## 10. Điều kiện bàn giao cho tác tử soạn

- Giữ đúng trục `điều kiện tối ưu → hướng → tìm bước → cập nhật/dừng → dùng độ cong → giữ hoặc phục hồi khả thi`.
- Truyền nguyên hai bộ dữ kiện ở Mục 6–7 sang outline, storyboard, HTML, SVG, bài tập và notes; mọi số phải được tính lại độc lập.
- Mỗi thuật toán phải có đầu vào, hướng/hệ cần giải, line search, cập nhật, tiêu chuẩn dừng, giả thiết bảo đảm và giới hạn.
- Không dùng nghịch đảo ma trận như thao tác triển khai; không gọi KKT hoặc Newton là bảo đảm toàn cục ngoài phạm vi lồi đã khóa.
- Storyboard phải hoàn tất sáu bước cho bốn cụm trong `plan.md`; phần self-concordance có thể gộp ứng dụng và kiểm tra nhưng không bỏ nhu cầu hoặc ví dụ.
- Danh mục `sources/MIT/README.md` cho Lecture 16–17 đã hoàn tất. Mọi hình đều vẽ lại cục bộ và ghi nguồn trong notes.
