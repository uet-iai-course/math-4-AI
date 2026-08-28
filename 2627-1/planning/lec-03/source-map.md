# Đặc tả nguồn và mẫu Bài giảng 03 — Đối ngẫu Lagrange

## 1. Kết luận phạm vi

- Bài thuộc Buổi 3, chủ đề **Chương 4. Đối ngẫu** theo đề cương chính thức; `sources/part1.docx` gọi cùng chủ đề là Tuần 3 `Duality` trong lõi tối ưu nghiêm ngặt của bảy tuần đầu.
- Thời lượng theo đề cương là 2 tiết lý thuyết và 1 tiết bài tập. Không quy đổi thành phút và không hiển thị thời lượng trên trang chiếu.
- LLO4: hiểu hàm đối ngẫu và bài toán đối ngẫu Lagrange. LLO5: thể hiện minh họa hình học của hàm đối ngẫu. Cả hai liên kết CLO1.
- Phạm vi bắt buộc từ đề cương: hàm đối ngẫu Lagrange; bài toán đối ngẫu Lagrange; minh họa hình học; điều kiện tối ưu; phân tích nhiễu và độ nhạy; ví dụ; bất đẳng thức tổng quát.
- Trọng tâm phải giữ đúng tinh thần `part1.docx`: nêu đối tượng toán học, giả thiết, kết quả chứng minh được và ranh giới áp dụng. Không biến KKT, Slater hoặc công thức độ nhạy thành quy tắc vô điều kiện.
- Tệp dự kiến là `2627-1/lecture-03-doi-ngau-lagrange.html`. Kế hoạch dùng 7 mạch lớn: P, A, B, C, D, E, Z. Các dải mã trong `plan.md` cộng thành **40 trang**, không phải 39: $4+8+6+6+7+6+3=40$. Tác tử soạn phải dùng 40 làm số dự kiến hoặc ghi rõ quyết định khác trong storyboard.

## 2. Kiểm kê và phân loại nguồn

| Nguồn | Loại và trạng thái | Phạm vi dùng | Quyết định |
|---|---|---|---|
| `sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx` | Đề cương chính thức | Buổi 3, LLO4–5/CLO1, 2 tiết lý thuyết + 1 tiết bài tập, bảy mục nội dung | Thẩm quyền về phạm vi và chuẩn đầu ra |
| `sources/part1.docx` | Tài liệu bổ sung của người dùng | Tuần 3 là `Duality`, chế độ nghiêm ngặt | Dùng làm khung học thuật; không dùng làm nguồn công thức |
| `sources/bv_cvxbook.pdf` | Giáo trình chuẩn, Boyd và Vandenberghe (2004) | Chương 5, trang sách 215–271; bài tập từ trang 273 | Thẩm quyền về định nghĩa, định lý, giả thiết và ký hiệu; chỉ diễn giải, tự vẽ hình |
| `sources/dual.pdf` | Mẫu cấu trúc MIT 6.079, Lecture 5, Stephen Boyd, 2009, 31 trang PDF | Trang in 5-1 đến 5-30 | Chọn làm mẫu thứ tự chính |
| `sources/Lecture5MIT-duality.pdf` | Bản sao của `dual.pdf` | Không dùng độc lập | SHA-256 trùng; không tính là nguồn thứ hai |
| `sources/c3e06e62a1d59d8c61efe93dd7ec9e12_MIT6_079F09_lec05.pdf` | Bản sao của `dual.pdf`; tên khớp URL tải chính thức | Không dùng độc lập | SHA-256 trùng; dùng tên này khi đối chiếu URL MIT OCW |
| `sources/Bài tập chương 4.pdf` | Đề bài cục bộ, Nguyễn Bích Vân, 2 trang | Bài 1 xuyên suốt; Bài 2 đối ngẫu LP; Bài 5 KKT bình phương tối thiểu | Chọn lọc và diễn giải; không sao chép bố cục hoặc hình |
| `sources/Bài tập chương 4-solution.pdf` | Lời giải tham khảo, 8 trang | Kiểm tra Bài 1 và Bài 5 | Chỉ đối chiếu; tự tính lại toàn bộ kết quả |
| `sources/Bài tập chương 4-solution.docx` | Bản lời giải cùng nội dung nhưng công thức trích xuất bị hỏng | Đối chiếu văn bản | Không dùng làm nguồn công thức; ưu tiên PDF và phép tính độc lập |
| `sources/Bài giảng chương 4 phần 2.pptx` | Trang chiếu cục bộ, 4 trang | Nhiễu và độ nhạy | Dùng thuật ngữ Việt và thứ tự phụ cho E01–E04; không đủ làm nguồn toàn bài |
| `sources/Chương 5.pdf`, `sources/Chương 5phần 1.pdf`, `sources/Chương 5p2.pptx` | Tối ưu không ràng buộc | Thuộc Bài giảng 04 | Loại khỏi Lecture 03 dù tên tệp là “Chương 5” |

Ba bản MIT có cùng SHA-256:

`a0c0b4340ae358e9254ae63a6fa08f68692fdb811932353e136a5c99f6ab6020`.

Nguồn MIT chính thức đã được kiểm tra ngày 2026-08-28:

- Trang tài nguyên: `https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/resources/mit6_079f09_lec05/`.
- URL PDF trên trang: `https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/c3e06e62a1d59d8c61efe93dd7ec9e12_MIT6_079F09_lec05.pdf`.
- Tác giả/giảng viên: Stephen Boyd; khóa học 6.079 / 6.975, Fall 2009; tiêu đề tài nguyên `Lecture 5: Duality`.
- Trang tài nguyên và điều khoản MIT OCW nêu CC BY-NC-SA 4.0. Hình và nội dung bên thứ ba vẫn phải được kiểm tra riêng; bài này không cần sao chụp hình nguồn.
- `sources/MIT/README.md` hiện chưa tồn tại. Trước khi dùng nguồn MIT này trong deck, tác tử nghiên cứu nguồn phải tạo danh mục theo AGENTS.md và ghi đúng checksum, URL, ngày kiểm tra, giấy phép, vai trò, đường dẫn cục bộ và quyết định vẽ lại. Không cần tải thêm vì bản cục bộ khớp checksum ở cả ba đường dẫn.

## 3. Thứ tự nguồn chính phải giữ

Thứ tự nội dung của MIT Lecture 5 khớp gần như toàn bộ đề cương và phải là trục ánh xạ:

1. Lagrangian và hàm đối ngẫu: trang in 5-2 đến 5-8.
2. Bài toán đối ngẫu, đối ngẫu yếu/mạnh và Slater: 5-9 đến 5-14.
3. Minh họa hình học: 5-15 đến 5-16.
4. Bù trừ và KKT: 5-17 đến 5-20.
5. Nhiễu và độ nhạy: 5-21 đến 5-23.
6. Cải dạng và ví dụ: 5-24 đến 5-27.
7. Bất đẳng thức tổng quát và SDP: 5-28 đến 5-30.

Deck không giữ mọi ví dụ MIT. Các trang 5-4 đến 5-8, 5-12 đến 5-14 và 5-24 đến 5-27 chỉ dùng chọn lọc trong ghi chú hoặc bài tập chuyển giao. Bài 1 của `Bài tập chương 4.pdf` được chèn xuyên suốt vào đúng vị trí khái niệm, không làm đảo thứ tự của trục MIT.

## 4. Ví dụ xuyên suốt đã kiểm chứng

Giữ một bài toán duy nhất từ Bài 1:

$$
\begin{aligned}
\operatorname*{minimize}_{x\in\mathbb R}\quad & f_0(x)=x^2+1\\
\text{với}\quad & f_1(x)=(x-2)(x-4)\le 0.
\end{aligned}
$$

Các kết quả phải truyền nguyên ký hiệu từ A đến E:

- Tập khả thi $[2,4]$; $x^*=2$; $p^*=5$.
- $L(x,\lambda)=(1+\lambda)x^2-6\lambda x+1+8\lambda$.
- Với $\lambda>-1$, điểm cực tiểu theo $x$ là $x(\lambda)=3\lambda/(1+\lambda)$ và
  $$g(\lambda)=1+8\lambda-\frac{9\lambda^2}{1+\lambda}.$$
  Với $\lambda\le-1$, $g(\lambda)=-\infty$. Bài toán đối ngẫu chỉ xét $\lambda\ge0$.
- Nghiệm đối ngẫu $\lambda^*=2$, $d^*=5$; khoảng đối ngẫu bằng 0.
- Slater đúng vì $x=3$ cho $f_1(3)=-1<0$.
- KKT tại $(x^*,\lambda^*)=(2,2)$: khả thi gốc, $\lambda^*\ge0$, $\lambda^*f_1(x^*)=0$, và $2x^*+\lambda^*(2x^*-6)=0$.
- Với nhiễu theo đúng quy ước $f_1(x)\le u$, bài toán vô nghiệm khi $u<-1$; khi $u\ge-1$, tập khả thi là $[3-\sqrt{1+u},3+\sqrt{1+u}]$.
- Với $-1\le u\le8$, $x^*(u)=3-\sqrt{1+u}$ và $p^*(u)=(3-\sqrt{1+u})^2+1$; với $u\ge8$, $x^*(u)=0$, $p^*(u)=1$.
- $p^{*\prime}(0)=-2=-\lambda^*$. Dấu âm phụ thuộc đúng vào quy ước $f_1(x)\le u$.

Hình $f_0$, $f_1$, họ $L(x,\lambda)$, $g(\lambda)$, tập giá trị và $p^*(u)$ phải được vẽ lại bằng SVG cục bộ. Không cắt hình từ lời giải hoặc MIT.

## 5. Ánh xạ dự kiến theo 40 trang

Đây là đặc tả nguồn cho tác tử soạn; số trang chỉ thay đổi khi storyboard chứng minh được khoảng trống hoặc trang dư.

| Mã | Vai trò và nội dung bắt buộc | Nguồn chính theo thứ tự | Giữ/gộp/lược và ràng buộc |
|---|---|---|---|
| P00 | Tiêu đề, Buổi 3, Đối ngẫu Lagrange | Đề cương; `part1.docx` | Thêm trang định danh |
| P01 | Tiên quyết và sản phẩm học tập | Lecture 01–02; đề cương | Không dạy lại dạng chuẩn hoặc tính lồi |
| P02 | LLO4–5 và quan hệ bộ phận với CLO1 | Đề cương, dòng Buổi 3 | Trích đúng LLO; không nâng “hiểu” thành “chứng minh mọi định lý” |
| P03 | Bản đồ 7 mạch và vấn đề trung tâm về chứng nhận | `part1.docx`; `plan.md` | Nêu bài thuộc chế độ nghiêm ngặt |
| A01 | Nhu cầu có cận kiểm chứng khi chưa biết nghiệm | BV 5.1.3, trang 216–217 | Nhu cầu trước ký hiệu |
| A02 | Bài toán gốc xuyên suốt và nghiệm hình học | Bài tập Ch.4, Bài 1a; lời giải PDF trang 2 | Ví dụ trước định nghĩa tổng quát; hình tự vẽ |
| A03 | Họ hàm khi thay đổi $\lambda$ | Bài 1b; lời giải PDF trang 2–3 | Trực quan: cực tiểu của $L$ tạo cận |
| A04 | Định nghĩa Lagrangian tổng quát | MIT 5-2; BV 5.1.1, trang 215–216 | Nêu $D$, kiểu $x,\lambda,\nu$ và quy ước dấu |
| A05 | Định nghĩa hàm đối ngẫu và tính lõm | MIT 5-3; BV 5.1.2, trang 216 | $g$ có thể bằng $-\infty$; lõm dù bài toán gốc không lồi |
| A06 | Suy ra $g(\lambda)$ cho ví dụ | Bài 1b; lời giải PDF trang 3 | Giữ cả miền $\lambda>-1$ trước khi áp $\lambda\ge0$ |
| A07 | Chứng minh tính chất cận dưới | MIT 5-3; BV 5.1.3, trang 216–217 | Viết chuỗi bất đẳng thức và chỗ dùng $\lambda\ge0$ |
| A08 | Bài toán đối ngẫu, khả thi đối ngẫu và bài tập cận | MIT 5-9; BV 5.2, trang 223–224 | Gộp định nghĩa với kiểm tra ngắn; đầu ra là $d^*\le p^*$ |
| B01 | Nhu cầu biết cận có khít hay không | MIT 5-10 | Không lặp định nghĩa A08 |
| B02 | Đối ngẫu yếu, mạnh và khoảng đối ngẫu | MIT 5-10; BV 5.2.2–5.2.3, trang 225–227 | Đối ngẫu yếu luôn đúng; mạnh không tự động đúng |
| B03 | Cực đại hóa $g(\lambda)$ trong ví dụ | Bài 1c; lời giải PDF trang 3 | $\lambda^*=2$, $d^*=5$; tự tính đạo hàm |
| B04 | Điều kiện Slater | MIT 5-11; BV 5.2.3, trang 226–227 | Điều kiện đủ; nêu `relint` trong ghi chú và ngoại lệ ràng buộc affine |
| B05 | Áp Slater và chứng nhận khoảng bằng 0 | Bài 1; MIT 5-11 | Điểm khả thi chặt $x=3$; không suy luận đảo |
| B06 | Bài tập phân loại giả thiết và kết luận | MIT 5-12 đến 5-14; bài tập tự tạo | Không dùng mệnh đề “QP luôn đối ngẫu mạnh” thiếu điều kiện |
| C01 | Nhu cầu giải thích hình học của cận | Đề cương LLO5; MIT 5-15 | Mở trực tiếp LLO5 |
| C02 | Tập $G=\{(f_1(x),f_0(x)):x\in D\}$ | MIT 5-15; BV 5.3.1, trang 232–234 | Đặt trục $u,t$ trước đường đỡ |
| C03 | Đường $t+\lambda u=g(\lambda)$ trong ví dụ | MIT 5-15; Bài 1 | SVG tự vẽ, dùng cùng $x,\lambda$ |
| C04 | Tập mở rộng $\mathcal A$ và điểm $(0,p^*)$ | MIT 5-16; BV 5.3.1 | Phân biệt $G$ với tập mở rộng/epigraph |
| C05 | Siêu phẳng đỡ, đối ngẫu mạnh và khả thi chặt | MIT 5-16; BV 5.3.2, trang 234–237 | Chứng minh chi tiết Slater chuyển ghi chú |
| C06 | Bài tập đọc hình | Bài tập tự tạo từ MIT 5-15–16 | Phải đo được LLO5, không chỉ hỏi thuật ngữ |
| D01 | Nhu cầu chuyển khoảng bằng 0 thành điều kiện kiểm tra | BV 5.5.1, trang 241–242 | Nối trực tiếp từ hình học tiếp xúc |
| D02 | Bù trừ và ràng buộc hoạt động | MIT 5-17; BV 5.5.2, trang 242–243 | Nêu đủ giả thiết mạnh và đạt nghiệm |
| D03 | Bốn nhóm điều kiện KKT | MIT 5-18; BV 5.5.3, trang 243–245 | Khả thi gốc, khả thi đối ngẫu, bù trừ, dừng |
| D04 | Bảng điều kiện cần/đủ | MIT 5-18–19; BV 5.5.3 | Tách trường hợp tổng quát, lồi và lồi + Slater |
| D05 | Giải KKT cho ví dụ xuyên suốt | Bài 1; phép tính độc lập | Kiểm tra đủ bốn nhóm, không chỉ stationarity |
| D06 | Ứng dụng AI: hồi quy có ràng buộc chuẩn | Nối từ Lecture 02 Z02; BV 5.5 | Dùng $\min_w\tfrac12\|Xw-y\|_2^2$ với $\|w\|_2^2\le\tau$, $\tau>0$; chỉ diễn giải KKT, không mở lý thuyết regularization của Tuần 11 |
| D07 | Bài tập KKT chuyển giao | Bài tập Ch.4, Bài 5; lời giải PDF trang 8 | Có thể rút gọn đại số; nêu $A$ hạng cột đầy đủ và $G$ hạng hàng đầy đủ |
| E01 | Nhu cầu đánh giá khi nới hoặc siết ràng buộc | MIT 5-21; PPTX Ch.4 phần 2, trang 2 | Chuyển nhân tử từ chứng nhận sang thông tin |
| E02 | Bài toán nhiễu và hàm giá trị $p^*(u,v)$ | MIT 5-21; BV 5.6.1, trang 249 | Khóa quy ước $f_i(x)\le u_i$, $h_i(x)=v_i$ |
| E03 | Bất đẳng thức độ nhạy toàn cục | MIT 5-22; BV 5.6.2, trang 250 | Cần đối ngẫu mạnh và nghiệm đối ngẫu của bài không nhiễu |
| E04 | Độ nhạy cục bộ | MIT 5-23; BV 5.6.3, trang 250–252; PPTX trang 3–4 | Chỉ viết đạo hàm khi $p^*$ khả vi; nêu dấu âm |
| E05 | Tính $p^*(u)$ cho ví dụ và diễn giải $\lambda^*$ | Bài 1d; lời giải PDF trang 3–4 | Nêu đủ ba miền $u<-1$, $-1\le u\le8$, $u\ge8$ |
| E06 | Bất đẳng thức tổng quát, đối ngẫu theo nón và bài kiểm tra | MIT 5-28 đến 5-30; BV 5.9, trang 264–271 | Chu trình rút gọn vì nón là tiên quyết; multipliers thuộc nón đối ngẫu; dùng SDP làm cầu nối Lecture 02 |
| Z01 | Bản đồ quyết định: cận → khít → hình học → KKT → độ nhạy | Tổng hợp MIT 5-2 đến 5-30 | Trả lời P03, không chỉ liệt kê công thức |
| Z02 | Tự kiểm tra LLO4–5/CLO1 | Bài 1, Bài 2, Bài 5 chọn lọc | Có đáp án/gợi ý trong ghi chú; hỏi cả giả thiết và hình học |
| Z03 | Tài liệu, quyền, giới hạn và cầu nối Lecture 04 | Đề cương; BV Ch.5; MIT L5 | Lecture 04 dùng KKT/đối ngẫu làm đầu vào cho tối ưu trơn và đẳng thức |

## 6. Định nghĩa và định lý phải chốt trước khi soạn

### 6.1. Dạng tổng quát và quy ước dấu

Cho $x\in\mathbb R^n$, miền không rỗng $D$, $f_i,h_j:D\to\mathbb R$:

$$
\min_{x\in D} f_0(x)\quad
\text{với }f_i(x)\le0,\ i=1,\ldots,m,\quad h_j(x)=0,\ j=1,\ldots,p.
$$

$$
L(x,\lambda,\nu)=f_0(x)+\sum_{i=1}^m\lambda_i f_i(x)+\sum_{j=1}^p\nu_jh_j(x),
\qquad
g(\lambda,\nu)=\inf_{x\in D}L(x,\lambda,\nu).
$$

- Với bài toán cực tiểu và ràng buộc $f_i\le0$, khả thi đối ngẫu đòi $\lambda_i\ge0$.
- $g$ lõm theo $(\lambda,\nu)$ kể cả khi bài toán gốc không lồi.
- Bài toán đối ngẫu là $\max g(\lambda,\nu)$ với $\lambda\ge0$ và miền hữu hiệu của $g$.
- Đối ngẫu yếu: $d^*\le p^*$ luôn đúng theo nghĩa giá trị mở rộng khi hai bài toán được định nghĩa đúng.
- Đối ngẫu mạnh là kết luận $d^*=p^*$, không phải giả thiết mặc định của “bài toán lồi”.

### 6.2. Slater

Với bài toán lồi có các bất đẳng thức lồi và đẳng thức affine, một phiên bản Slater đủ dùng là tồn tại $x\in\operatorname{relint}D$ sao cho các bất đẳng thức phi affine chặt và $Ax=b$. Khi $p^*>-\infty$, điều kiện này cho đối ngẫu mạnh và đạt nghiệm đối ngẫu. Bản đơn giản trên mặt trang có thể dùng $x\in\operatorname{int}D$ và $f_i(x)<0$, nhưng ghi chú phải nêu phiên bản tinh chỉnh cho ràng buộc affine.

### 6.3. KKT

Bốn nhóm điều kiện:

1. $f_i(x)\le0$, $h_j(x)=0$;
2. $\lambda_i\ge0$;
3. $\lambda_i f_i(x)=0$;
4. $\nabla f_0(x)+\sum_i\lambda_i\nabla f_i(x)+\sum_j\nu_j\nabla h_j(x)=0$.

Phải phân biệt:

- Nếu có nghiệm gốc và đối ngẫu đạt được, đối ngẫu mạnh và các hàm khả vi, nghiệm tối ưu thỏa KKT.
- Với bài toán lồi khả vi có đẳng thức affine, bất kỳ bộ thỏa KKT đều tối ưu; đây là tính đủ và không cần Slater sau khi bộ KKT đã tồn tại.
- Với bài toán lồi thỏa Slater, KKT là cần và đủ vì Slater cho đối ngẫu mạnh và đạt nghiệm đối ngẫu.
- Với bài toán phi lồi, KKT nói chung không chứng nhận tối ưu toàn cục.

### 6.4. Độ nhạy

Với nhiễu $f_i(x)\le u_i$, $h_j(x)=v_j$, nếu bài không nhiễu có đối ngẫu mạnh và $(\lambda^*,\nu^*)$ tối ưu đối ngẫu thì

$$
p^*(u,v)\ge p^*(0,0)-u^T\lambda^*-v^T\nu^*.
$$

Nếu thêm điều kiện $p^*$ khả vi tại $(0,0)$ thì

$$
\lambda_i^*=-\frac{\partial p^*}{\partial u_i}(0,0),
\qquad
\nu_j^*=-\frac{\partial p^*}{\partial v_j}(0,0).
$$

Khi $p^*$ không khả vi hoặc nghiệm đối ngẫu không duy nhất, không được gọi một nhân tử tùy ý là “đạo hàm”; phải dùng diễn giải dưới gradient hoặc đạo hàm một phía phù hợp.

### 6.5. Bất đẳng thức tổng quát

Nếu $f_i(x)\preceq_{K_i}0$, nhân tử phải thuộc nón đối ngẫu $K_i^*$ theo chiều $\lambda_i\succeq_{K_i^*}0$ và Lagrangian dùng tích vô hướng $\langle\lambda_i,f_i(x)\rangle$. Không dùng $\lambda\ge0$ thành phần cho một ràng buộc ma trận nếu chưa ánh xạ rõ sang nón PSD.

## 7. Mâu thuẫn, giả thiết thiếu và ký hiệu cần sửa

| Mức | Nguồn/vị trí | Vấn đề | Quyết định chuẩn hóa |
|---|---|---|---|
| Chặn bàn giao | `Bài tập chương 4.pdf`, Bài 1b | Đề viết cận dưới bằng dấu nghiêm $p^*>\inf_xL(x,\lambda)$, nhưng tại $\lambda^*=2$ xảy ra dấu bằng | Deck dùng $p^*\ge g(\lambda)$; chỉ dùng dấu `>` khi đã chứng minh cận không khít |
| Chặn bàn giao | Nhiều nguồn | Dễ đảo dấu nhân tử hoặc đạo hàm độ nhạy | Khóa $f_i\le0$, $\lambda_i\ge0$ và nhiễu $f_i\le u_i$ từ A04; khi đó đạo hàm là $-\lambda_i^*$ |
| Chặn bàn giao | Tóm tắt KKT phổ biến | KKT bị trình bày như đủ cho mọi bài toán | D04 phải có bảng cần/đủ và giả thiết; thêm cảnh báo phi lồi |
| Nghiêm trọng | MIT 5-11 | Bản đơn giản dùng `int D`, mọi bất đẳng thức chặt | Ghi chú nêu `relint D`; ràng buộc affine có phiên bản Slater tinh chỉnh |
| Nghiêm trọng | MIT 5-11, BV 5.2.3 | Dễ bỏ điều kiện hữu hạn khi nói đạt nghiệm đối ngẫu | Nêu điều kiện $p^*>-\infty$ cùng kết luận đạt nghiệm |
| Nghiêm trọng | Bài tập Ch.4, Bài 2 | Tiêu đề gọi “quy hoạch nguyên tổng quát” nhưng công thức hiển thị là LP liên tục | Không lặp nhãn sai; gọi là đối ngẫu của LP ở dạng tổng quát nếu dùng |
| Nghiêm trọng | `Bài tập chương 4-solution.docx` | Công thức và một đoạn số bị hỏng khi trích xuất | Không lấy công thức từ DOCX; dùng PDF trực quan và tự tính |
| Trung bình | Đề cương “Chương 4”, Boyd “Chương 5”, MIT “Lecture 5” | Số chương/bài khác nhau nhưng cùng chủ đề | Ghi tên chủ đề và nguồn, không đồng nhất số chương |
| Trung bình | MIT/BV | $h_i$ tổng quát ở dạng ban đầu, nhưng bài toán lồi yêu cầu đẳng thức affine | Khi phát biểu Slater/KKT cho bài toán lồi, thay bằng $Ax=b$ hoặc nêu $h_i$ affine |
| Trung bình | PDF trích xuất | Ký hiệu thứ tự xuất hiện thành ký tự lỗi `�` | Gõ lại bằng KaTeX; $\ge0$ cho vector thành phần, $\succeq_K$ cho nón, $\succeq0$ cho PSD |
| Trung bình | Các nguồn | Dùng lẫn $p^\star,d^\star$ và $p^*,d^*$ | Theo Lecture 02 dùng $p^*,d^*$ trong toàn deck |
| Trung bình | Bài tập Ch.4, Bài 5 | Công thức nghiệm cần $A^TA$ khả nghịch và ma trận Schur khả nghịch | Chỉ dùng khi $A$ hạng cột đầy đủ và $G$ hạng hàng đầy đủ như đề; không lược giả thiết |
| Nhẹ | MIT 5-15–16 | Hình dùng $G$ và $A$ nhưng $A$ dễ nhầm với ma trận ràng buộc | Deck dùng $\mathcal G$ và $\mathcal A$ cho tập hình học, giữ $A$ cho ma trận |

## 8. Quyết định giữ, gộp và lược so với MIT

- **Giữ theo thứ tự:** 5-2, 5-3, 5-9 đến 5-11, 5-15 đến 5-23, 5-28 đến 5-30.
- **Gộp:** 5-2 và 5-3 thành A04–A05; 5-9 và phần định nghĩa của 5-10 thành A08–B02; 5-17 đến 5-19 thành D02–D04; 5-21 đến 5-23 thành E02–E04; 5-28 đến 5-30 thành E06 và ghi chú.
- **Lược khỏi mặt trang:** least-norm, chuẩn đối ngẫu, phân hoạch hai phía, hàm liên hợp, ma trận trò chơi, trust-region phi lồi, cải dạng ngầm và hàng loạt đối ngẫu chuyên biệt. Lý do: không trực tiếp đo LLO4–5 trong 2 tiết lý thuyết.
- **Thay ví dụ nguồn:** dùng Bài 1 xuyên suốt thay vì đổi ví dụ ở mỗi trang MIT. Lý do: giữ ký hiệu và làm rõ sự tích lũy từ cận đến độ nhạy.
- **Thêm:** trang AI D06 để dùng KKT trên hồi quy có ràng buộc; không tuyên bố về tổng quát hóa hoặc mạng sâu. Trang này đóng vai ứng dụng, không thay nguồn định lý.
- **Vẽ lại:** mọi đồ thị và sơ đồ hình học. Chỉ giữ dữ liệu và quan hệ toán học; thêm trục, nhãn, mô tả thay thế và nguồn trong ghi chú.

## 9. Bài tập được phép chọn

1. Bài 1 là bài tập tích hợp bắt buộc; chia các tiểu nhiệm vụ qua A, B, C, D, E thay vì lặp toàn đề.
2. Bài 2 dùng cho đối ngẫu LP nếu cần một bài chuyển giao nhiều biến; phải đổi nhãn sai thành “LP dạng tổng quát”.
3. Bài 5 dùng cho KKT với ràng buộc đẳng thức; phần nghịch đảo dài chuyển ghi chú hoặc bài về nhà.
4. Bài 3 về LP Boolean và Bài 4 về phạt bậc hai không đưa vào tuyến chính vì mở nhánh tối ưu rời rạc/phương pháp phạt trước khi có đủ tiên quyết. Có thể ghi tài liệu đọc.
5. Mỗi bài tập phải yêu cầu nêu giả thiết trước kết luận. Đáp án phải được tính lại độc lập và đặt trong ghi chú diễn giả.

## 10. Điều kiện bàn giao cho tác tử soạn

- Giữ đúng trục nội dung `cận → cận tốt nhất → cận khít → hình học → KKT → độ nhạy → nón tổng quát`.
- Dùng 7 `<section>` ngoài P/A/B/C/D/E/Z; nếu đổi số mạch hoặc số trang, cập nhật đồng bộ outline, storyboard và review-log với lý do.
- Dùng cùng $x,f_0,f_1,\lambda,p^*,d^*$ cho ví dụ xuyên suốt; không đổi quy ước dấu giữa các mạch.
- LLO5 phải có ít nhất một hình tự vẽ mà người học có thể đọc để xác định $g(\lambda)$, $p^*$ và trạng thái cận khít.
- Mọi phát biểu Slater, KKT và độ nhạy phải mang đủ giả thiết như Mục 6.
- Không dùng ba bản MIT như ba nguồn và không tải thêm. Trước khi dùng MIT, tạo/cập nhật `sources/MIT/README.md` theo quy trình quản lý nguồn.
- Ghi rõ nguồn theo chương/mục/trang trong ghi chú; trang tài liệu tham khảo ghi nguồn chính, giấy phép MIT và việc vẽ lại.
- Không dùng hình raster từ PDF/PPTX. Tài sản dự kiến tối thiểu: SVG họ Lagrangian, SVG hàm đối ngẫu, SVG tập giá trị/siêu phẳng đỡ và SVG hàm giá trị nhiễu.
