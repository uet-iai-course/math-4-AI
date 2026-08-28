# Dàn ý Bài giảng 03 — Đối ngẫu Lagrange

## 1. Phạm vi và chuẩn đầu ra

- Buổi 3, 2 tiết lý thuyết và 1 tiết bài tập; 40 trang, 7 mạch P/A/B/C/D/E/Z.
- LLO4, nguyên văn đề cương: “Hiểu được hàm đối ngẫu và bài toán đối ngẫu Lagrange”.
- LLO5, nguyên văn đề cương: “Thể hiện được minh họa hình học của hàm đối ngẫu”.
- Sản phẩm bổ trợ: kiểm tra Slater/KKT và diễn giải độ nhạy; các sản phẩm này phục vụ CLO1 nhưng không thay nội dung LLO4–5.
- Đóng góp CLO1: hiểu, đánh giá và vận dụng chứng nhận tối ưu vào bài toán cụ thể.
- Vấn đề trung tâm: khi chưa biết nghiệm tối ưu, xây một cận kiểm chứng được, xác định khi cận khít, rồi chuyển cận thành điều kiện tối ưu và thông tin độ nhạy.

## 2. Quy ước và ví dụ xuyên suốt

$$
\min_{x\in\mathbb R} f_0(x)=x^2+1
\quad\text{với}\quad
f_1(x)=(x-2)(x-4)\le0.
$$

- $\mathcal F=[2,4]$, $x^*=2$, $p^*=5$.
- $L(x,\lambda)=(1+\lambda)x^2-6\lambda x+1+8\lambda$.
- $\operatorname{dom}g=(-1,\infty)$; bài toán đối ngẫu dùng $\lambda\ge0$.
- $\lambda^*=2$, $d^*=5$, $p^*-d^*=0$; Slater tại $x=3$.
- Với nhiễu $f_1(x)\le u$, $p'(0)=-2=-\lambda^*$.

## 3. Tuyến 40 trang

| Mạch | Trang | Luận điểm trung tâm | Vai trò |
|---|---|---|---|
| P | P00 | Đối ngẫu Lagrange là chủ đề của Buổi 3 | định danh |
| P | P01 | Bài dùng lại dạng chuẩn, tính lồi, gradient và thứ tự theo nón | tiên quyết |
| P | P02 | Trích nguyên LLO4–5; tách Slater, KKT và độ nhạy thành sản phẩm bổ trợ | mục tiêu |
| P | P03 | Tuyến cận → khít → hình học → KKT → độ nhạy giải quyết vấn đề trung tâm | bản đồ |
| A | A01 | Nghiệm ứng viên chưa phải là chứng nhận nếu chưa có cận | nhu cầu |
| A | A02 | Ví dụ xuyên suốt xác lập $f_0,f_1,\mathcal F,x^*,p^*$ | ví dụ dẫn nhập |
| A | A03 | Cực tiểu hóa $L(\cdot,\lambda)$ tạo một họ cận dưới | trực quan |
| A | A04 | Với $\varnothing\ne D\subseteq\mathbb R^n$, định nghĩa $L,g$ cho $\lambda\in\mathbb R^m$, $\nu\in\mathbb R^p$; dấu $\lambda\ge0$ chỉ dùng cho khả thi đối ngẫu | hình thức |
| A | A05 | Hàm đối ngẫu là infimum của các hàm affine theo nhân tử nên lõm | hình thức |
| A | A06 | Ví dụ cho $\operatorname{dom}g=(-1,\infty)$ và công thức $g(\lambda)$ | tính toán |
| A | A07 | Đối ngẫu yếu theo sau từ chuỗi $f_0(x)\ge L\ge g$ | chứng minh |
| A | A08 | Bài toán đối ngẫu chọn cận tốt nhất; QP chuyển giao cho $\lambda^*=1$, $x^*=(1/2,1/2)$ | ứng dụng/bài tập |
| B | B01 | Cận dưới chỉ hữu ích để chứng nhận khi biết độ lỏng | nhu cầu |
| B | B03 | Ví dụ đạt cực đại tại $\lambda^*=2$, $d^*=5$ | ví dụ |
| B | B02 | Đặt tên đối ngẫu yếu, mạnh và khoảng sau khi quan sát ví dụ khít | hình thức |
| B | B04 | Slater tinh chỉnh dùng $\operatorname{relint}D$, khả thi affine và chặt cho bất đẳng thức phi affine | định lý |
| B | B05 | Điểm $x=3$ áp Slater và đóng khoảng đối ngẫu | ứng dụng |
| B | B06 | Phân loại giả thiết trước khi kết luận đối ngẫu mạnh | bài tập |
| C | C01 | LLO5 cần giải thích hình học của cận thay vì chỉ đọc công thức | nhu cầu |
| C | C03 | Với $u=f_1(x)$, $t=f_0(x)$, đường $t+\lambda u=g(\lambda)$ có tung độ cắt là cận | trực quan/ví dụ |
| C | C02 | Hình thức hóa họ điểm vừa quan sát thành tập giá trị $\mathcal G$ | hình thức nền |
| C | C04 | Tập mở rộng $\mathcal A$ đặt $(0,p^*)$ vào hình học đối ngẫu | hình thức |
| C | C05 | Hệ số góc $-\lambda^*$, pháp tuyến $(\lambda^*,1)$ và hạng $\lambda^*\nabla f$ nối hình học với KKT | ứng dụng |
| C | C06 | Đọc đường đỡ để xác định $g(\lambda)$, $p^*$ và độ khít | bài tập LLO5 |
| D | D01 | Cần hệ điều kiện cục bộ thay cho so sánh mọi điểm khả thi | nhu cầu |
| D | D05 | Dùng phương trình $\partial_xL=2x+\lambda(2x-6)=0$ để so sánh $x=2$ và $x=4$ | ví dụ dẫn nhập |
| D | D02 | Bù trừ xác định ràng buộc hoạt động khi khoảng bằng không | trực quan/hình thức |
| D | D03 | KKT gồm đúng bốn nhóm điều kiện | hình thức |
| D | D04 | Tính cần và đủ của KKT phụ thuộc tính lồi và điều kiện chính quy | giới hạn |
| D | D06 | KKT diễn giải đánh đổi trong hồi quy có ràng buộc chuẩn | ứng dụng AI |
| D | D07 | Dùng kết quả QP ở A08 để chỉ kiểm tra Slater, bốn nhóm KKT và giả thiết kết luận | bài tập |
| E | E01 | Nhân tử còn đo tác động của việc nới ràng buộc | nhu cầu |
| E | E02 | Nới $u$ trong ví dụ làm miền khả thi rộng hơn và $p^*(u)$ giảm | ví dụ/trực quan |
| E | E03 | Định nghĩa tổng quát $p^*(u,v)$ và cận toàn cục | hình thức/định lý |
| E | E04 | Khi khả vi, đạo hàm bằng âm nhân tử theo quy ước đã khóa | hình thức/giới hạn |
| E | E05 | Áp dụng đầy đủ: $\lambda^*(0)=2$; tại $u=8$ ràng buộc hoạt động nhưng nhân tử bằng 0; với $u>8$ ràng buộc không hoạt động | ứng dụng |
| E | E06 | Với $F(x)\in\mathbb S^r$, nhân tử $Z\in\mathbb S_+^r$ cùng cấp; kiểm tra hạng ghép SDP | mở rộng/bài tập |
| Z | Z01 | Quy trình cận → khít → hình học → KKT → độ nhạy, kèm cầu nối nhân tử theo nón, trả lời P03 | tổng kết |
| Z | Z02 | Tự kiểm tra công thức, giả thiết, hình học, KKT và tính một xấp xỉ độ nhạy | đánh giá/bài tập E |
| Z | Z03 | Nguồn và cầu nối sang tối ưu không ràng buộc/có đẳng thức | chuyển tiếp |

## 4. Phân bổ nội bộ

| Cụm | Lý thuyết | Bài tập |
|---|---:|---:|
| P và chuyển mạch | 0,15 tiết | 0,00 tiết |
| A — hàm và bài toán đối ngẫu | 0,45 tiết | 0,15 tiết |
| B — đối ngẫu mạnh và Slater | 0,30 tiết | 0,15 tiết |
| C — hình học | 0,30 tiết | 0,15 tiết |
| D — KKT | 0,40 tiết | 0,25 tiết |
| E — độ nhạy và nón tổng quát | 0,30 tiết | 0,15 tiết |
| Z — tổng hợp | 0,10 tiết | 0,15 tiết |
| **Tổng** | **2,00 tiết** | **1,00 tiết** |

## 5. Nguồn và tài sản

- Boyd và Vandenberghe (2004), *Convex Optimization*, Chương 5, trang sách 215–271.
- Stephen Boyd, MIT 6.079/6.975, *Lecture 5: Duality* (2009), `sources/dual.pdf`; CC BY-NC-SA 4.0; chỉ dùng làm trục thứ tự và nguồn nội dung.
- `sources/Bài tập chương 4.pdf` cùng lời giải PDF để đối chiếu; mọi kết quả được tính lại theo `math-spec.md`.
- Đề cương chính thức và `sources/part1.docx` xác định phạm vi, LLO/CLO và chế độ nghiêm ngặt.
- SVG tự vẽ bằng polyline lấy mẫu trực tiếp từ công thức: họ Lagrangian, hàm đối ngẫu, tập giá trị/đường đỡ và hàm giá trị nhiễu; không dùng ảnh raster từ PDF/PPTX.
