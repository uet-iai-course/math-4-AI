# Dàn ý Lecture 02 — Các bài toán tối ưu lồi

## 1. Phạm vi và chuẩn đầu ra

- Tệp trình chiếu: `2627-1/lecture-02-cac-bai-toan-toi-uu-loi.html`.
- Đối tượng: sinh viên học phần Cơ sở toán học cho AI, đã hoàn thành Lecture 01.
- Phân bổ theo đề cương: 2 tiết lý thuyết và 1 tiết bài tập. Không hiển thị thời lượng trên trang chiếu hoặc trong ghi chú diễn giả.
- LLO3: trình bày và vận dụng các dạng bài toán tối ưu lồi.
- CLO1: hiểu và đánh giá các thuật toán tối ưu; vận dụng kiến thức tối ưu để giải quyết bài toán thực tế.
- Quan hệ chuẩn đầu ra: nhận dạng, kiểm tra và cải dạng trong LLO3 là minh chứng bộ phận đóng góp vào CLO1; không đồng nhất ba thao tác này với toàn bộ CLO1.
- Sản phẩm: nhận dạng và kiểm tra LP, QP, QCQP, GP, SDP; cải dạng bài toán; giải thích mô hình hồi quy có ràng buộc và đánh đổi sai số–chi phí trong AI.

## 2. Tuyến nội dung

| Phần | Mã | Luận điểm |
|---|---|---|
| Mở đầu | P00–P03 | Xác lập tiên quyết, LLO3/CLO1 và vấn đề nhận dạng cấu trúc |
| A | A01 → A03 → A02 → A04 → A05 → A06 → A07 | Ví dụ biểu diễn tương đương tạo nhu cầu, rồi khuôn tổng quát và kiểm tra mức làm lộ cấu trúc lồi |
| B | B01 → B03 → B02 → B05 → B06 → B04 → B08 → B07 → B10 → B09 | Mỗi lớp LP, QP, QCQP đi từ ví dụ hoặc phản ví dụ tới khuôn hình thức rồi nhiệm vụ kiểm tra; PSD là giả thiết quyết định |
| C | C01 → C05 → C02 → C03 → C04 → C06 → C07 | Ví dụ tích dẫn tới đơn thức, đa thức dương, dạng GP, phép đổi log và ứng dụng dầm chuẩn hóa |
| D | D01 → D02 → D05 → D03 → D04 → D06 → D08 → D07 → D09 → D10 | Thứ tự theo nón được cụ thể bằng chặn trị riêng trước SDP; đánh đổi mục tiêu xuất hiện trước định nghĩa Pareto |
| Kết | Z01–Z03 | Bản đồ quyết định, tự kiểm tra và chuyển sang đối ngẫu |

### Phân bổ nội bộ toàn bài

| Thành phần | Lý thuyết | Bài tập | Phạm vi |
|---|---:|---:|---|
| Mở đầu, trang chia phần và chuyển mạch | 0,20 tiết | 0 | P00–P03, A01, B01, C01, D01 và các câu nối |
| Dạng chuẩn, tựa lồi và chia đôi | 0,40 tiết | 0,15 tiết | A02–A07 |
| LP, QP và QCQP | 0,55 tiết | 0,30 tiết | B02–B10 |
| GP và đổi log | 0,30 tiết | 0,15 tiết | C02–C07 |
| SDP theo nón và Pareto | 0,45 tiết | 0,20 tiết | D02–D10 |
| Tổng hợp, ca AI và chuyển tiếp | 0,10 tiết | 0,20 tiết | Z01–Z03 |
| **Tổng** | **2,00 tiết** | **1,00 tiết** | Đúng đề cương |

Phân bổ này bao gồm toàn bộ 41 trang, kể cả trang tiêu đề, mục tiêu, trang chia phần, chuyển ý và kết luận. Không có tuyến phụ hoặc trang đọc thêm trên mặt trình chiếu; chi tiết vượt phạm vi được giữ trong ghi chú diễn giả.

## 3. Ánh xạ nguồn

| Nguồn | Vai trò | Phần dùng | Quyết định |
|---|---|---|---|
| `sources/part1.docx` | Định hướng học phần | Phạm vi Lecture 02 | Giữ tuyến nhận dạng các lớp bài toán; không dùng làm nguồn công thức chi tiết |
| `sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx` | Đề cương chính thức | P01–P02 | Giữ LLO3/CLO1 và phân bổ 2 LT + 1 BT |
| `sources/bv_cvxbook.pdf` | Giáo trình nền | A–D, Z | Dùng Chương 4 cho định nghĩa, giả thiết và phép cải dạng |
| `sources/Chương 3 Các bài toán tối ưu lồi (phần 1).pdf` | Trang chiếu nội dung cục bộ | Đối chiếu thị giác | Tệp OneNote 6 trang; trang đầu và metadata không ghi tác giả hoặc năm, nên ghi tác giả/năm là chưa xác minh; không dùng làm căn cứ cho công thức hoặc số trang trích dẫn |
| `sources/Chương 3 Các bài toán tối ưu lồi phần 2.pdf` | Trang chiếu nội dung cục bộ | A, B | Trang 1 xác nhận tác giả Nguyễn Bích Vân; năm chưa xác minh. Dùng trang PDF 2–4 cho bài toán tương đương, 5–8 cho tựa lồi, 9–16 cho LP/QP/QCQP; sửa giả thiết khi đối chiếu giáo trình |
| `sources/Lecture4-MIT.pdf` | Tham chiếu cấu trúc MIT 6.079, Lecture 4 | A–D | Metadata xác nhận Stephen Boyd, 2009, 48 trang; không cắt hoặc sao chép ảnh nguồn |
| `sources/Bài tập tuần 3.pdf` và bản lời giải | Bài tập nguồn | B09 | Giữ nguyên miền khả thi chung và ba mục tiêu ở các ca a, c, e; tính lại đáp án bằng hình học và thế biến |

## 4. Bảng ký hiệu

| Ký hiệu | Kiểu và ý nghĩa |
|---|---|
| $x\in\mathbb R^n$ | Biến quyết định vector; biến vô hướng được nêu riêng |
| $D\subseteq\mathbb R^n$ | Miền xác định chung |
| $\mathcal F$ | Tập khả thi |
| $p^*$ | Giá trị tối ưu theo nghĩa infimum, cho phép $\pm\infty$ |
| $A^\dagger$ | Giả nghịch đảo Moore–Penrose; không đồng nhất với $(A^TA)^{-1}A^T$ nếu thiếu hạng cột đầy đủ |
| $E$, $K\subseteq E$ | Không gian vector hữu hạn chiều và nón sinh thứ tự trên $E$ |
| $G:\mathbb R^n\to E$, $h\in E$ | Ánh xạ tuyến tính và phần tử vế phải trong dạng tối ưu nón |
| $\mathbb S^r$, $\mathbb S_+^r$ | Ma trận đối xứng và nón ma trận nửa xác định dương cấp $r$ |
| $P\succeq0$ | $z^TPz\ge0$ với mọi $z\in\mathbb R^n$ |
| $u\preceq_Kv$ | $v-u\in K$ |
| $\Phi(x)$ | Ánh xạ mục tiêu vector ở D08–D09; $F(x)$ chỉ dùng cho ánh xạ ma trận affine trong LMI ở A04 và D04 |
| $\mathbb R_{++}^n$ | Miền vector có mọi tọa độ dương |

## 5. Ví dụ và kết quả đã chốt

- A03: hai ràng buộc tương đương với $x_1\le0$, $x_1+x_2=0$; “cùng tập khả thi” chỉ là định nghĩa tương đương trong ví dụ này, còn phép cải dạng tổng quát có thể thêm/bớt biến nhưng phải bảo toàn giá trị tối ưu và ánh xạ được nghiệm.
- A04: giả thiết lồi của $D$, $f_i$ và affine của $Ax=b$ kết luận trực tiếp tập khả thi lồi; ghi chú dẫn tới định lý tập khả thi trong lecture note.
- A05–A06: $f(x)=(x^2+1)/(x+2)$ trên $[0,2]$; ví dụ này cũng lồi, còn A07 ca 2 mới phân biệt tựa lồi không lồi; $x^*=\sqrt5-2$, $p^*=2\sqrt5-4$; mức $t=0{,}5$ khả thi theo nghĩa $S_t\ne\varnothing$, cụ thể $S_t=[0,0{,}5]$; bảo đảm sau $k$ vòng $u_k-l_k=(u_0-l_0)/2^k$ được nêu trên mặt slide A06, quy tắc dừng $u-l\le\varepsilon$ vẫn giữ nguyên.
- B03: nghiệm $(3,0)$, giá trị $3$; SVG chỉ là cửa sổ hữu hạn của miền khả thi không bị chặn và đường mức đi qua $(3,0)$.
- B05: nghiệm không ràng buộc $2$; trên $[0,1]$ nghiệm $1$, giá trị $4$; $A^\dagger$ được định nghĩa ngay trên mặt slide là giả nghịch đảo Moore–Penrose, điều kiện hạng cột đầy đủ cho công thức $(A^TA)^{-1}A^T$ giữ trong ghi chú.
- B06: nghiệm $(0{,}8,0{,}2)$, giá trị $0{,}8$.
- B08: $(\sqrt2,\pm1)$ khả thi nhưng trung điểm không khả thi vì $(\sqrt2)^2-0^2=2>1$.
- B10: QCQP với hai miền ellipse có Hessian $\operatorname{diag}(2,8)$ và $2I$; giao khác rỗng vì chứa $(0{,}8,0{,}7)$.
- B09: trên miền chung $2x_1+x_2\ge1$, $x_1+3x_2\ge1$, $x\ge0$: ca a có $(2/5,1/5),3/5$; ca c có tập nghiệm $\{(0,x_2):x_2\ge1\}$, giá trị $0$; ca e có $(1/2,1/6),1/2$.
- C05: nghiệm $(2,2)$, giá trị $1/4$; ví dụ đứng trước định nghĩa hình thức của GP.
- C04: hộp kết luận là phát biểu định lý ngắn: GP và bài toán theo $y$ tương đương, $x^*=\exp(y^*)$, giá trị log biến đổi bằng $\log p^*$; điều kiện mục tiêu dương (hệ số $c_k>0$ trên miền $\mathbb R_{++}^n$) nêu trong ghi chú.
- C06: mô hình dầm chuẩn hóa dùng $\min\sum_i h_i$ và $\sum_i d_i h_i^{-3}\le1$, $d=(0{,}1,0{,}2,0{,}3,0{,}4)$; sau $y_i=\log h_i$ thu được hai biểu thức log-tổng-mũ lồi.
- C07: dạng lồi log-tổng-mũ; bài tập chỉ yêu cầu cải dạng, không mở tuyến giải số phụ.
- D04: tính lồi của tập khả thi được ghi rõ theo định lý nghịch ảnh affine của nón lồi.
- D05: $x=t=1$.
- D08: thứ tự theo nón được chuyển từ ràng buộc ma trận sang vector mục tiêu; mọi $x\in[0,2]$ là Pareto.
- D09: trọng số dương sinh nghiệm Pareto; chiều đảo cần tập mục tiêu lồi phù hợp. Với $0<\lambda<1$, $x^*=2(1-\lambda)$; hai đầu mút $\lambda=1$ và $\lambda=0$ lần lượt cho $x^*=0$ và $x^*=2$; liên hệ đánh đổi sai số–chi phí suy diễn.
- D10: dưới một nhãn “Câu hỏi:”, dạng đầy đủ $\min_{x,t}t$ với LMI cho $x^*=t^*=1{,}5$; ba điểm không bị trội và $(3,3)$ bị trội.
- Z02: dưới nhãn “Câu hỏi:”, với $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$, $w\in\mathbb R^d$, $\tau\ge0$, ca hồi quy AI $\min_w\|Xw-y\|_2^2$ với $\|w\|_2^2\le\tau$ là QCQP lồi; $\tau$ giới hạn độ lớn tham số. Tập mức bằng của hàm lồi phi tuyến nói chung không lồi; đẳng thức dạng chuẩn phải affine.

## 6. Điều kiện hoàn thành bản nháp

- Đủ đúng 41 mã P00–P03, A01–A07, B01–B10, C01–C07, D01–D10, Z01–Z03.
- Mỗi trang có một luận điểm trung tâm và ghi chú diễn giả có nguồn hoặc đáp án.
- Không hiển thị mã nội bộ, badge quy trình hoặc thời lượng.
- Dùng tài sản cục bộ; hình dầm là SVG tự vẽ có mô tả thay thế.
- Bản nháp phải qua kiểm định storyboard, năm rà soát độc lập, chỉnh sửa, rà lại toán học và mạch kể chuyện, rồi kiểm định trực quan trước khi được coi là hoàn thành.
