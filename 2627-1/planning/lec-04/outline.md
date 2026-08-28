# Dàn ý Bài giảng 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

## 1. Phạm vi và chuẩn đầu ra

- Buổi 4, đúng 2 tiết lý thuyết và 1 tiết bài tập; 40 trang, 7 mạch P/A/B/C/D/E/Z.
- LLO6/CLO1: “Hiểu và vận dụng được các thuật toán để giải các bài toán tối ưu không ràng buộc như thuật toán gradient descent, steepest descent, Newton.”
- LLO7/CLO1: “Hiểu và vận dụng được khái niệm các hàm tự điều chỉnh trong bài toán tối ưu không ràng buộc.”
- LLO8/CLO2: “Hiểu rõ và biết áp dụng từng bước để thực hiện một thuật toán tối ưu không ràng buộc.”
- LLO9/CLO1: “Hiểu rõ và biết áp dụng phương pháp Newton tổng quát để giải bài toán tối ưu ràng buộc đẳng thức.”
- LLO10/CLO2: “Hiểu rõ và biết áp dụng từng bước để thực hiện một thuật toán tối ưu ràng buộc đẳng thức.”
- Vấn đề trung tâm: biến điều kiện tối ưu thành một quy trình tạo dãy lặp, chọn bước, dừng có căn cứ và giữ hoặc phục hồi tính khả thi.

## 2. Quy ước và ví dụ xuyên suốt

Ví dụ không ràng buộc:

$$
f(x)=\frac12(x_1^2+10x_2^2),\qquad
x^{(0)}=(10,1)^T,\qquad H=\operatorname{diag}(1,10).
$$

- $x^*=0$, $p^*=0$, $f(x^{(0)})=55$, $g^{(0)}=(10,10)^T$.
- Gradient exact line search có $t_0=2/11$, $x^{(1)}=(90/11,-9/11)^T$.
- Backtracking với $\alpha=0{,}1$, $\beta=0{,}5$ nhận $t=1/4$ sau hai lần co.
- Newton giải $H\Delta x_N=-g$ và đến nghiệm sau một bước; không lập $H^{-1}$.

Ví dụ đẳng thức:

$$
\min\ \frac12(x_1^2+4x_2^2)
$$

với ràng buộc $x_1+x_2=1$.

- $x^*=(4/5,1/5)^T$, $\nu^*=-4/5$, $p^*=2/5$.
- Từ $(1/2,1/2)^T$, bước khả thi là $(3/10,-3/10)^T$.
- Từ $(x,\nu)=(0,0,0)$, bước primal–dual là $\Delta x=(4/5,1/5)^T$, $\Delta\nu=-4/5$.

## 3. Tuyến 40 trang

| Mạch | Trang | Luận điểm trung tâm | Vai trò |
|---|---|---|---|
| P | P00 | Buổi 4 nối tối ưu không ràng buộc với ràng buộc đẳng thức | định danh |
| P | P01 | Bài dùng lại gradient, Hessian, tính lồi và KKT với kiểu đại lượng đã khóa | tiên quyết |
| P | P02 | LLO6–10 đo cả hiểu thuật toán và thực hiện từng bước | mục tiêu |
| P | P03 | Năm chặng A–E: phương pháp giảm → gradient/chuẩn → Newton/độ cong → bảo đảm/tự điều chỉnh → khả thi/đẳng thức | bản đồ |
| A | A01 | Điều kiện $\nabla f(x^*)=0$ chưa tạo ra một dãy lặp | nhu cầu |
| A | A02 | Miền mở, nghiệm đạt, điểm đầu và tập mức khóa phạm vi thuật toán | giả thiết |
| A | A03 | $g^Td<0$ cho thay đổi âm bậc nhất | trực quan |
| A | A04 | Bậc hai điều kiện kém xác lập đường mức, điểm đầu và gradient; chưa lộ quỹ đạo | ví dụ |
| A | A05 | Tìm kiếm đường chính xác và Armijo trả lời hai cách chọn bước | hình thức |
| A | A06 | Backtracking nhận $t=1/4$ sau hai lần co | ứng dụng |
| A | A07 | Một vòng lặp phải có hướng, bước, cập nhật và dừng | thuật toán/bài tập |
| B | B01 | Điều kiện hóa làm gradient tiến chậm theo một số hướng | nhu cầu |
| B | B03 | Quỹ đạo exact line search zigzag với hệ số $9/11$ | trực quan/ví dụ |
| B | B02 | Gradient là giảm dốc nhất theo chuẩn Euclid | hình thức |
| B | B04 | Chuẩn đối ngẫu $\|g\|_*=\max_{\|v\|\le1}g^Tv$ xác định hướng giảm dốc nhất | hình thức |
| B | B05 | Chuẩn bậc hai tương đương tiền điều kiện; hội tụ tuyến tính cần chặn Hessian và bước phù hợp | ứng dụng/bảo đảm |
| B | B06 | So sánh hai hướng trên cùng gradient đo LLO6/LLO8 | bài tập |
| C | C01 | Mô hình bậc nhất bỏ qua độ cong nên cần mô hình bậc hai | nhu cầu |
| C | C03 | Newton giải đúng bậc hai xuyên suốt trong một bước | ví dụ dẫn nhập |
| C | C02 | Hướng Newton là nghiệm hệ Hessian và cực tiểu mô hình bậc hai | hình thức |
| C | C04 | $\delta_N^2/2$ đo mức giảm của mô hình, không mặc định là sai số thật | trực quan/hình thức |
| C | C05 | Newton đầy đủ gồm giải hệ, backtracking, cập nhật và dừng | thuật toán |
| C | C06 | Hội tụ bậc hai là truy hồi sai số $\|e_{k+1}\|\le C\|e_k\|^2$ trong pha gần nghiệm dưới giả thiết rõ | bảo đảm |
| C | C07 | Triển khai dùng bộ giải hệ và cấu trúc, không lập nghịch đảo; đóng LLO8 trước khi chuyển LLO7 | ứng dụng tính toán |
| C | C08 | Một bước Newton cho $s-\log s$ nối sang tự điều chỉnh; đáp án nằm trong notes | bài tập/chuyển ý |
| D | D01 | Hằng số hội tụ cổ điển khó biết và không bất biến affine | nhu cầu |
| D | D03 | Tỷ số $|\phi'''|/(\phi'')^{3/2}=2$ cho trực quan độ cong tự khống chế biến thiên | trực quan/ví dụ |
| D | D02 | Tự điều chỉnh khống chế đạo hàm cấp ba bằng độ cong cấp hai | hình thức |
| D | D04 | Dựng hàm chắn log với kiểu/miền đầy đủ và nêu bảo đảm Newton có điều kiện theo decrement | ứng dụng/bảo đảm |
| D | D05 | Kiểm tra $-\log s$, chặn suy luận quá mức và nối sang nhu cầu giữ $Ax=b$; đáp án trong notes | bài tập/chuyển ý |
| E | E01 | Bước Newton không ràng buộc có thể phá $Ax=b$ | nhu cầu |
| E | E02 | Bài toán bậc hai đẳng thức khóa dữ kiện xuyên E và chuyển giao sang hồi quy trơn có $\mathbf1^Tw=1$, $\operatorname{null}X\cap\operatorname{null}(\mathbf1^T)=\{0\}$ | ví dụ/AI |
| E | E03 | Tham số hóa $F\in\mathbb R^{n\times(n-p)}$, $z\in\mathbb R^{n-p}$ loại đẳng thức | trực quan/hình thức |
| E | E04 | Newton khả thi ép $A\Delta x=0$ và dừng bằng $\delta_{\rm eq}^2/2$ | thuật toán |
| E | E05 | Bước từ $(1/2,1/2)$ giữ khả thi và đến nghiệm | ứng dụng/bài tập |
| E | E06 | Khi khó tìm điểm đầu khả thi, Newton primal–dual giải hệ, chọn bước trong miền, cập nhật và dừng bằng hai ngưỡng | thuật toán |
| E | E07 | Bước từ $(0,0,0)$ phục hồi khả thi và đến nghiệm | bài tập/triển khai |
| Z | Z01 | Bảng quyết định phân biệt bốn họ hướng, tiêu chuẩn dừng và điều kiện bảo đảm | tổng kết |
| Z | Z02 | Bốn nhiệm vụ đại diện đo tìm bước, tự điều chỉnh, Newton–KKT và ca hồi quy trơn | đánh giá LLO6–10 |
| Z | Z03 | Nguồn, giới hạn và cầu nối nổi bật sang cảnh quan, nhiễu gradient và minibatch ở Bài 05 | chuyển tiếp |

## 4. Phân bổ nội bộ

| Cụm | Lý thuyết | Bài tập |
|---|---:|---:|
| P và chuyển mạch | 0,15 tiết | 0,00 tiết |
| A — phương pháp giảm và tìm bước | 0,35 tiết | 0,15 tiết |
| B — gradient và giảm dốc nhất | 0,30 tiết | 0,15 tiết |
| C — Newton không ràng buộc | 0,40 tiết | 0,20 tiết |
| D — hàm tự điều chỉnh | 0,20 tiết | 0,15 tiết |
| E — Newton với đẳng thức | 0,50 tiết | 0,25 tiết |
| Z — tổng hợp | 0,10 tiết | 0,10 tiết |
| **Tổng** | **2,00 tiết** | **1,00 tiết** |

## 5. Nguồn và tài sản

- Boyd và Vandenberghe (2004), *Convex Optimization*, Chương 9–10.
- Stephen Boyd, MIT 6.079/6.975, Lecture 16–17, Fall 2009; CC BY-NC-SA 4.0; chỉ dùng làm nguồn nội dung và trục thứ tự.
- `sources/Chương 5.pdf` dùng để đối chiếu thuật ngữ tiếng Việt; công thức được kiểm bằng Boyd/MIT và `math-spec.md`.
- SVG tự vẽ: `quadratic-zigzag.svg`, `armijo-backtracking.svg`, `newton-model.svg`, `newton-phases.svg`, `equality-nullspace.svg`.
- Không sao chụp hình MIT hoặc PDF viết tay; không dùng ảnh raster.
- Khác MIT Lecture 16, C07 được đặt ngay sau bảo đảm hội tụ và trước mạch tự điều chỉnh để đóng minh chứng LLO8 về triển khai Newton; chi tiết đếm phép toán được lược và thời lượng chuyển sang Newton–KKT.
