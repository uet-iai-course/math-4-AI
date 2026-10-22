# Dàn ý Bài giảng 07 — Quy hoạch tuyến tính và quy hoạch động

## Phạm vi và chuẩn đầu ra

- Buổi 7 theo đề cương UET.AI2012; phân bổ chính thức: **2 tiết lý thuyết + 1 tiết bài tập**.
- Trọng tâm chính: Chương 9–10, gồm mô hình quy hoạch tuyến tính, đa diện, dạng chuẩn, điểm cực biên, bảo đảm tồn tại và tối ưu, thuật toán khái niệm.
- **LLO17 / CLO1:** hiểu định nghĩa quy hoạch tuyến tính và diễn đạt bài toán thực tế thành LP.
- **LLO18 / CLO1:** xây dựng đa diện, vận dụng điểm cực biên, sự tồn tại và tính tối ưu, thuật toán khái niệm.
- Quy hoạch động chỉ là cầu nối nội bộ theo cấu trúc cập nhật trong `sources/part1.docx`; phạm vi giới hạn ở chân trời, trạng thái và điều khiển hữu hạn, chuyển tất định, chi phí cộng; không gán thêm LLO/CLO.
- Tiên quyết: hệ tuyến tính, độc lập tuyến tính, hạng ma trận, tập lồi và tổ hợp lồi.
- Sản phẩm: mô hình LP đầy đủ; chuyển về dạng chuẩn; nhận dạng điểm cực biên/nghiệm cơ sở khả thi và bốn kết cục; áp dụng bảo đảm điểm cực biên; tính Bellman trên đồ thị tầng nhỏ.

## Sáu mạch và 53 trang

Cập nhật 2026-10-12 theo AGENTS.md, mục “Trang tiêu đề mạch” và “Văn phong và mật độ mặt trang chiếu”. Mạch 2–5 giữ mã trang tiêu đề A01–D01; mạch 6 mở bằng Z00. Trước đợt sửa deck có 37 trang.

| Mạch | Mã | Tiêu đề | Vai trò |
|---|---|---|---|
| 1 · Mở đầu | P00 | Quy hoạch tuyến tính và quy hoạch động | Định danh; trang tiêu đề của mạch mở đầu |
| 1 | P01 | Tiên quyết và quy ước | Khóa ký hiệu |
| 1 | P02 | Mục tiêu học tập | Khóa minh chứng |
| 1 | P02b | Nội dung | Danh sách sáu mạch |
| 1 | P03 | Vấn đề trung tâm | Vấn đề trung tâm và hình hai cấu trúc |
| 2 · Mô hình hóa quy hoạch tuyến tính | A01 | 2. Mô hình hóa quy hoạch tuyến tính | Trang tiêu đề mạch; nhu cầu |
| 2 | A02 | Bài toán sản xuất hộp hạt | Nhu cầu và ví dụ dẫn nhập |
| 2 | A03 | Ràng buộc từ giới hạn | Trực quan theo đơn vị |
| 2 | A04 | Hàm mục tiêu và so sánh phương án | Ví dụ tính được, mô hình đầy đủ |
| 2 | A05 | Quy hoạch tuyến tính dạng ma trận | Hình thức (nhắc lại định nghĩa Bài 02, giả thiết tỉ lệ và cộng tính) |
| 2 | A05b | Ví dụ: bài toán hộp hạt dạng ma trận | Ánh xạ ví dụ → $c,A,b$ |
| 2 | A07 | Hồi quy chuẩn $L_1$ dưới dạng LP | Ứng dụng |
| 2 | A08 | Bài tập: dựng mô hình phân bổ GPU | Đề bài tập LLO17 |
| 2 | A09 | Bài tập: dựng mô hình phân bổ GPU | Lời giải trên mặt trang |
| 3 · Đa diện và dạng chuẩn | B01 | 3. Đa diện và dạng chuẩn | Trang tiêu đề mạch; nhu cầu |
| 3 | B02 | Đa diện và đường mức | Trực quan–ví dụ |
| 3 | B03 | Đa diện và tính bị chặn | Hình thức hình học (nhắc lại đa diện của Bài 02; mới: bị chặn, tập $\{x:Ax=b,x\ge0\}$ là đa diện) |
| 3 | B04 | Dạng chuẩn | Hình thức đại số |
| 3 | B05 | Ví dụ: bài toán hộp hạt dạng chuẩn | Ứng dụng chuyển dạng |
| 3 | B06 | Nghiệm cơ sở khả thi | Định nghĩa |
| 3 | B06b | Nghiệm cơ sở suy biến | Định nghĩa và ví dụ suy biến |
| 3 | B07 | Bài tập: nghiệm cơ sở của bài toán hộp hạt | Đề bài tập LLO18 |
| 3 | B07b | Bài tập: nghiệm cơ sở của bài toán hộp hạt | Lời giải trên mặt trang |
| 4 · Điểm cực biên và bảo đảm tối ưu | C01 | 4. Điểm cực biên và bảo đảm tối ưu | Trang tiêu đề mạch; nhu cầu |
| 4 | C02 | Điểm cực biên | Hình thức hình học |
| 4 | C03 | Điểm cực biên và nghiệm cơ sở khả thi | Định lý tương đương |
| 4 | C03b | Số điểm cực biên | Hệ quả hữu hạn, chứng minh một dòng, hình nhắc lại |
| 4 | C05 | Đa diện chứa đường thẳng | Nhu cầu, phản ví dụ, định nghĩa chứa đường thẳng |
| 4 | C05b | Định lý tồn tại điểm cực biên | Định lý và hệ quả dạng chuẩn |
| 4 | C06 | Bốn kết cục của quy hoạch tuyến tính | Phân loại |
| 4 | C07 | Điểm cực biên tối ưu | Định lý |
| 4 | C04 | Ví dụ: bài toán có nhiều nghiệm tối ưu | Giới hạn kết luận của định lý (đặt sau C07 từ 2026-10-22) |
| 4 | C07b | Đỉnh kề | Định nghĩa |
| 4 | C07c | Bổ đề đỉnh kề cải thiện | Bổ đề và tiêu chuẩn dừng |
| 4 | C08 | Thuật toán duyệt đỉnh kề | Thuật toán ở mức khái niệm |
| 4 | C09 | Ví dụ: duyệt đỉnh kề trên bài toán hộp hạt | Trực quan thuật toán |
| 4 | C10 | Bài tập: điểm cực biên và đỉnh kề trên đa giác mới | Bài tự làm LLO18 |
| 4 | C11 | Bài tập: bài toán hộp hạt với lợi ích mới | Đề bài tích hợp LLO17–18 |
| 4 | C11b | Bài tập: bài toán hộp hạt với lợi ích mới | Lời giải trên mặt trang |
| 5 · Quy hoạch động | D01 | 5. Quy hoạch động | Trang tiêu đề mạch; nhu cầu |
| 5 | D01b | Chuỗi quyết định và số phương án | Nhu cầu và so sánh LP–DP |
| 5 | D02 | Trạng thái và bài toán con | Trực quan và định nghĩa trạng thái |
| 5 | D03 | Ví dụ: đường đi ngắn nhất trên đồ thị tầng | Ví dụ DP |
| 5 | D04 | Bài toán quyết định theo giai đoạn | Định nghĩa mô hình |
| 5 | D04b | Phương trình Bellman | Định lý |
| 5 | D05 | Quy trình giải ngược | Thuật toán |
| 5 | D05b | Chi phí tính toán của giải ngược | Độ phức tạp |
| 5 | D06 | Bài tập: giải ngược Bellman với chi phí mới | Đề bài tập DP |
| 5 | D06b | Bài tập: giải ngược Bellman với chi phí mới | Lời giải trên mặt trang |
| 6 · Tổng kết và chuyển tiếp | Z00 | 6. Tổng kết và chuyển tiếp | Trang tiêu đề mạch |
| 6 | Z01 | Tổng kết | Kết quả / giả thiết / công thức |
| 6 | Z01b | Câu hỏi tự kiểm tra | Ba câu hỏi, đáp án trong ghi chú |
| 6 | Z02 | Tài liệu và chuyển tiếp | Nguồn và cầu nối Bài 08 |

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
2. Bertsimas và Tsitsiklis (1997), *Introduction to Linear Optimization*, Chương 1–2: nguồn chính cho mô hình LP, đa diện, dạng chuẩn, nghiệm cơ sở khả thi, điểm cực biên và bảo đảm tối ưu.
3. Vanderbei (2014), *Linear Programming: Foundations and Extensions*, ấn bản 4, Chương 1–3: bổ sung cách trình bày dạng chuẩn và nghiệm cơ sở trong lecture note.
4. `sources/Chương 8 Quy hoạch tuyến tính-phần 1.pdf`: mẫu nội dung người dùng cung cấp; chỉ có tiêu đề và các trang trống khi trích văn bản, nên không dùng làm nguồn phát biểu toán.
5. `sources/part1.docx`: cấu trúc cập nhật đặt LP và DP trong Tuần 7; chỉ dùng để xác nhận cầu nối DP.
6. `sources/MIT/189163b71d0f322315c5c5324a3bc5e6_MIT15_093J_F09_lec16.pdf`: nguồn MIT OCW cho khung trạng thái, quyết định, chuyển trạng thái và Bellman; không sao chép hình.

## Khóa ký hiệu và dữ kiện

- LP tổng quát: $x,c\in\mathbb R^n$, $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$.
- Dạng chuẩn trong bài: $\max c^Tx$ với $Ax=b$, $x\ge0$, $\operatorname{rank}(A)=m\le n$.
- Ví dụ hộp hạt: $x_1,x_2$ là sản lượng tính theo nghìn hộp; $\max 2x_1+3x_2$ với $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$.
- Các đỉnh: $(0,0),(30,0),(30,12),(14,20),(0,20)$; giá trị tương ứng $0,60,96,88,60$; nghiệm tối ưu duy nhất $(30,12)$.
- Hồi quy $L_1$: $M$ mẫu $h_i\in\mathbb R^n$, $y_i\in\mathbb R$, $x\in\mathbb R^n$, $t_i\in\mathbb R_+$ (không dùng $a_i,b_i,m$ vì các chữ này chỉ dữ kiện ràng buộc $A$, $b$); ví dụ $\min_x|x-1|+|x-3|$ có tập nghiệm $[1,3]$.
- Ví dụ điểm cực biên: $\max x_1+x_2$ với $x_1+x_2\le2$, $x\ge0$ (trước 2026-10-03 viết dạng tương đương $\min -x_1-x_2$); cả cạnh $x_1+x_2=2$ tối ưu.
- Bài tổng hợp C11: miền hộp hạt với $\max 2x_1+4x_2$; giá trị tại năm đỉnh $0,60,108,108,80$; cả cạnh $(30,12)$–$(14,20)$ tối ưu; thuật toán từ $(0,0)$ dừng tại $(30,12)$.
- Bài chuyển giao C10: $\max x_1+x_2$ với $x_1+2x_2\le4$, $3x_1+x_2\le6$, $x\ge0$; đường đỉnh kề $(0,0)\to(2,0)\to(1{,}6;\,1{,}2)$ có giá trị $0\to2\to2{,}8$.
- DP hữu hạn tất định: $x_{k+1}=f_k(x_k,u)$, $u\in U_k(x_k)$, chi phí $g_k$, chi phí cuối $g_N$, hàm giá trị $J_k$.
- Đồ thị tầng: các cạnh có chi phí $s$–$A$: $2$, $s$–$B$: $5$, $A$–$C$: $4$, $A$–$D$: $2$, $B$–$C$: $1$, $B$–$D$: $3$, $C$–$t$: $3$, $D$–$t$: $1$. Khi giải ngược, $J(C)=3$, $J(D)=1$, $J(A)=3$, $J(B)=4$, $J(s)=5$; đường tối ưu là $s\to A\to D\to t$.
- Bài chuyển giao D06 đổi $c(s,B)=3$, $c(C,t)=0$ và giữ các cạnh khác: $J(C)=0$, $J(D)=1$, $J(A)=3$, $J(B)=1$, $J(s)=4$; đường tối ưu là $s\to B\to C\to t$.
