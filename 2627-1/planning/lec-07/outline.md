# Dàn ý Bài giảng 07 — Quy hoạch tuyến tính và quy hoạch động

## Phạm vi và chuẩn đầu ra

- Buổi 7 theo đề cương UET.AI2012; phân bổ chính thức: **2 tiết lý thuyết + 1 tiết bài tập**.
- Trọng tâm chính: Chương 9–10, gồm mô hình quy hoạch tuyến tính, đa diện, dạng chuẩn, điểm cực, bảo đảm tồn tại và tối ưu, thuật toán khái niệm.
- **LLO17 / CLO1:** hiểu định nghĩa quy hoạch tuyến tính và diễn đạt bài toán thực tế thành LP.
- **LLO18 / CLO1:** xây dựng đa diện, vận dụng điểm cực, sự tồn tại và tính tối ưu, thuật toán khái niệm.
- Quy hoạch động chỉ là cầu nối nội bộ theo cấu trúc cập nhật trong `sources/part1.docx`; phạm vi giới hạn ở chân trời, trạng thái và điều khiển hữu hạn, chuyển tất định, chi phí cộng; không gán thêm LLO/CLO.
- Tiên quyết: hệ tuyến tính, độc lập tuyến tính, hạng ma trận, tập lồi và tổ hợp lồi.
- Sản phẩm: mô hình LP đầy đủ; chuyển về dạng chuẩn; nhận dạng điểm cực/nghiệm cơ sở khả thi và bốn kết cục; áp dụng bảo đảm điểm cực; tính Bellman trên đồ thị tầng nhỏ.

## Sáu mạch và 37 trang

| Mạch | Mã | Tiêu đề | Vai trò |
|---|---|---|---|
| P | P00 | Quy hoạch tuyến tính và quy hoạch động | Định danh |
| P | P01 | Tiên quyết và quy ước | Khóa ký hiệu |
| P | P02 | Mục tiêu học tập | Khóa minh chứng |
| P | P03 | Bản đồ quyết định | Vấn đề trung tâm |
| A | A01 | Mô hình hóa quy hoạch tuyến tính | Nhu cầu |
| A | A02 | Ví dụ hộp hạt | Ví dụ dẫn nhập |
| A | A03 | Ràng buộc từ giới hạn | Trực quan theo đơn vị |
| A | A04 | Mục tiêu và phương án ứng viên | Ví dụ tính được |
| A | A05 | Định nghĩa quy hoạch tuyến tính | Hình thức |
| A | A07 | Hồi quy với mất mát chuẩn $L_1$ | Nhu cầu, ứng dụng chuyển về LP và ví dụ kiểm tra |
| A | A08 | Bài tập dựng mô hình | Bài tập LLO17 |
| B | B01 | Dạng chuẩn và đa diện | Nhu cầu |
| B | B02 | Đa diện và đường mức | Trực quan–ví dụ |
| B | B03 | Định nghĩa đa diện | Hình thức hình học |
| B | B04 | Dạng chuẩn | Hình thức đại số |
| B | B05 | Biến phụ cho hộp hạt | Ứng dụng chuyển dạng |
| B | B06 | Nghiệm cơ sở khả thi | Điều kiện đại số và tiên quyết trực tiếp cho B07 |
| B | B07 | Nghiệm cơ sở của bài hộp hạt | Bài tập LLO18 xuyên ví dụ |
| C | C01 | Điểm cực và bảo đảm tối ưu | Nhu cầu |
| C | C02 | Định nghĩa hình học của điểm cực | Hình thức hình học |
| C | C03 | Đặc trưng đại số | Tương đương điểm cực–BFS |
| C | C04 | Ví dụ nhiều nghiệm tối ưu | Ví dụ và trường hợp biên |
| C | C05 | Bảo đảm tồn tại điểm cực | Định lý tồn tại |
| C | C06 | Điểm cực tối ưu và đỉnh kề | Định lý và bổ đề cầu nối đơn hình trên đa diện tổng quát |
| C | C07 | Bốn kết cục của quy hoạch tuyến tính | Phân loại |
| C | C08 | Mô tả thuật toán ở mức ý niệm | Cầu hình học tới phương pháp đơn hình |
| C | C09 | Đường đi qua các đỉnh kề | Trực quan thuật toán |
| C | C10 | Bài tập chuyển giao về điểm cực | Bài tập LLO18 trên dữ kiện mới |
| C | C11 | Bài tập tích hợp quy hoạch tuyến tính | Đánh giá LLO17–18 trước biên DP |
| D | D01 | Quy hoạch động hữu hạn tất định | Biên LP hoàn tất–DP nội bộ |
| D | D02 | Nhu cầu của quyết định nhiều giai đoạn | Nhu cầu DP |
| D | D03 | Ví dụ đường đi theo tầng | Trực quan–ví dụ DP |
| D | D04 | Phương trình Bellman hữu hạn tất định | Quyết định ở $k=0,\ldots,N-1$; chi phí cuối ở $N$ |
| D | D05 | Quy trình giải ngược | Ứng dụng DP |
| D | D06 | Bài tập chuyển giao Bellman | Bài tập DP với dữ kiện mới |
| Z | Z01 | Kết quả học tập và cầu nối | Tổng kết |
| Z | Z02 | Tài liệu và chuyển tiếp | Thu hồi DP, nguồn và cầu nối Bài 08 |

## Phân bổ nội bộ

| Khối | Lý thuyết | Bài tập | Phạm vi |
|---|---:|---:|---|
| Mở bài và kết luận | $0{,}20$ tiết | $0{,}10$ tiết | P, Z |
| Quy hoạch tuyến tính | $1{,}40$ tiết | $0{,}70$ tiết | A, B, C; gồm bài tích hợp C11 |
| Quy hoạch động | $0{,}40$ tiết | $0{,}20$ tiết | D01–D06, cầu nối nội bộ |
| **Tổng** | **$2{,}00$ tiết** | **$1{,}00$ tiết** | Đúng đề cương |

Không hiển thị phân bổ này trên trang chiếu hoặc trong ghi chú diễn giả.

## Nguồn được chọn

1. Đề cương UET.AI2012 chính thức: phạm vi Buổi 7, phân bổ 2 LT + 1 BT, LLO17–18 và CLO1.
2. Bertsimas và Tsitsiklis (1997), *Introduction to Linear Optimization*, Chương 1–2: nguồn chính cho mô hình LP, đa diện, dạng chuẩn, nghiệm cơ sở khả thi, điểm cực và bảo đảm tối ưu.
3. `sources/Chương 8 Quy hoạch tuyến tính-phần 1.pdf`: mẫu nội dung người dùng cung cấp; chỉ có tiêu đề và các trang trống khi trích văn bản, nên không dùng làm nguồn phát biểu toán.
4. `sources/part1.docx`: cấu trúc cập nhật đặt LP và DP trong Tuần 7; chỉ dùng để xác nhận cầu nối DP.
5. `sources/MIT/189163b71d0f322315c5c5324a3bc5e6_MIT15_093J_F09_lec16.pdf`: nguồn MIT OCW cho khung trạng thái, quyết định, chuyển trạng thái và Bellman; không sao chép hình.

## Khóa ký hiệu và dữ kiện

- LP tổng quát: $x,c\in\mathbb R^n$, $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$.
- Dạng chuẩn trong bài: $\max c^Tx$ với $Ax=b$, $x\ge0$, $\operatorname{rank}(A)=m\le n$.
- Ví dụ hộp hạt: $\max 2x_1+3x_2$ với $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$.
- Các đỉnh: $(0,0),(30,0),(30,12),(14,20),(0,20)$; giá trị tương ứng $0,60,96,88,60$; nghiệm tối ưu duy nhất $(30,12)$.
- Hồi quy $L_1$: $a_i\in\mathbb R^n$, $b_i\in\mathbb R$, $x\in\mathbb R^n$, $t_i\in\mathbb R_+$; ví dụ $\min_x|x-1|+|x-3|$ có tập nghiệm $[1,3]$.
- Ví dụ điểm cực: $\min -x_1-x_2$ với $x_1+x_2\le2$, $x\ge0$; cả cạnh $x_1+x_2=2$ tối ưu.
- Bài chuyển giao C10: $\max x_1+x_2$ với $x_1+2x_2\le4$, $3x_1+x_2\le6$, $x\ge0$; đường đỉnh kề $(0,0)\to(2,0)\to(1{,}6,1{,}2)$ có giá trị $0\to2\to2{,}8$.
- DP hữu hạn tất định: $x_{k+1}=f_k(x_k,u)$, $u\in U_k(x_k)$, chi phí $g_k$, chi phí cuối $g_N$, hàm giá trị $J_k$.
- Đồ thị tầng: các cạnh có chi phí $s$–$A$: $2$, $s$–$B$: $5$, $A$–$C$: $4$, $A$–$D$: $2$, $B$–$C$: $1$, $B$–$D$: $3$, $C$–$t$: $3$, $D$–$t$: $1$. Khi giải ngược, $J(C)=3$, $J(D)=1$, $J(A)=3$, $J(B)=4$, $J(s)=5$; đường tối ưu là $s\to A\to D\to t$.
- Bài chuyển giao D06 đổi $c(s,B)=3$, $c(C,t)=0$ và giữ các cạnh khác: $J(C)=0$, $J(D)=1$, $J(A)=3$, $J(B)=1$, $J(s)=4$; đường tối ưu là $s\to B\to C\to t$.
