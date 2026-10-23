# Dàn ý Bài giảng 07 — Quy hoạch tuyến tính và quy hoạch động

## Phạm vi và chuẩn đầu ra

- Buổi 7 theo đề cương UET.AI2012; phân bổ chính thức: **2 tiết lý thuyết + 1 tiết bài tập**.
- Trọng tâm chính: Chương 9–10 và, từ 2026-10-23, Chương 11 (phương pháp đơn hình); gồm mô hình quy hoạch tuyến tính, đa diện, dạng chuẩn, điểm cực biên, bảo đảm tồn tại và tối ưu, thuật toán khái niệm.
- **LLO17 / CLO1:** hiểu định nghĩa quy hoạch tuyến tính và diễn đạt bài toán thực tế thành LP.
- **LLO18 / CLO1:** xây dựng đa diện, vận dụng điểm cực biên, sự tồn tại và tính tối ưu, thuật toán khái niệm.
- **Lệch đề cương có chủ ý (yêu cầu người dùng 2026-10-23):** Bài 07 gồm nội dung Buổi 7 và Chương 11 của Buổi 8 (11.1–11.4, một phần 11.6; 11.5 chỉ trong ghi chú bài giảng); LLO19, LLO20 (Buổi 8), LLO21 một phần.
  - **LLO19 / CLO1–2 (Buổi 8):** thực hiện phương pháp đơn hình: chi phí rút gọn, phép thử tỉ số, bước xoay, bảng đơn hình, pha I.
  - **LLO20 / CLO1–2 (Buổi 8):** khắc phục khó khăn trong trường hợp suy biến bằng quy tắc Bland. Đề cương dùng lại số LLO20/LLO21 cho Buổi 9–10, nên ghi rõ "Buổi 8".
  - **LLO21 (Buổi 8), một phần:** hiệu quả tính toán (số bước phụ thuộc quy tắc chọn biến vào; bài toán Klee–Minty trong ghi chú). Hình học cột (11.5) chỉ trong ghi chú bài giảng.
- Quy hoạch động chỉ là cầu nối nội bộ theo cấu trúc cập nhật trong `sources/part1.docx`; phạm vi giới hạn ở chân trời, trạng thái và điều khiển hữu hạn, chuyển tất định, chi phí cộng; không gán thêm LLO/CLO.
- Tiên quyết: hệ tuyến tính, độc lập tuyến tính, hạng ma trận, tập lồi và tổ hợp lồi.
- Sản phẩm: mô hình LP đầy đủ; chuyển về dạng chuẩn; nhận dạng điểm cực biên/nghiệm cơ sở khả thi và bốn kết cục; áp dụng bảo đảm điểm cực biên; chạy phương pháp đơn hình trên bảng (chi phí rút gọn, phép thử tỉ số, quy tắc Bland, pha I); tính Bellman trên đồ thị tầng nhỏ.

## Bảy mạch và 70 trang

Cập nhật 2026-10-23 (yêu cầu người dùng): thêm mạch 5 "Phương pháp đơn hình" (S00, S01–S11b; 14 trang, thành 17 trang sau vòng chỉnh sửa cùng ngày: tách S08b, S09c, thêm S10b) giữa mạch 4 và quy hoạch động; quy hoạch động thành mạch 6 (D01, `id="mach-6"`), tổng kết thành mạch 7 (Z00, `id="mach-7"`). Mã trang cũ giữ nguyên. Deck từ 53 lên 67 trang.

Cập nhật 2026-10-12 theo AGENTS.md, mục “Trang tiêu đề mạch” và “Văn phong và mật độ mặt trang chiếu”. Mạch 2–5 giữ mã trang tiêu đề A01–D01; mạch 6 mở bằng Z00. Trước đợt sửa deck có 37 trang.

| Mạch | Mã | Tiêu đề | Vai trò |
|---|---|---|---|
| 1 · Mở đầu | P00 | Quy hoạch tuyến tính và quy hoạch động | Định danh; trang tiêu đề của mạch mở đầu |
| 1 | P01 | Tiên quyết và quy ước | Khóa ký hiệu |
| 1 | P02 | Mục tiêu học tập | Khóa minh chứng |
| 1 | P02b | Nội dung | Danh sách bảy mạch (từ 2026-10-23) |
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
| 5 · Phương pháp đơn hình | S00 | 5. Phương pháp đơn hình | Trang tiêu đề mạch (`id="mach-5"`); câu hỏi trung tâm và phân rã bốn phần |
| 5 | S01 | Chi phí rút gọn | Nhu cầu, ví dụ dẫn nhập tại $(14,20)$, trực quan |
| 5 | S02 | Hướng cơ sở và chi phí rút gọn | Định nghĩa $d^j$, $\bar c_j$ |
| 5 | S03 | Điều kiện tối ưu theo chi phí rút gọn | Mệnh đề (a), (b), chứng minh một dòng, lưu ý suy biến |
| 5 | S04 | Phép thử tỉ số và bước xoay | Mệnh đề (i) không bị chặn, (ii) $\theta^*$, $B'$ |
| 5 | S05 | Thuật toán đơn hình | Đầu vào, ba bước, đầu ra, dừng hữu hạn khi không suy biến |
| 5 | S06 | Ví dụ: bài toán hộp hạt, ba bước đơn hình | Bảng lặp, quy tắc $\bar c_j$ lớn nhất |
| 5 | S07 | Ví dụ: bài toán hộp hạt có đỉnh suy biến | Thêm $x_1+x_2\le30$; bước có $\theta^*=0$ |
| 5 | S08 | Quay vòng tại đỉnh suy biến | Nhu cầu, trực quan (hình đỉnh suy biến) |
| 5 | S08b | Quy tắc Bland | Định nghĩa, định lý, ý nghĩa |
| 5 | S09 | Bảng đơn hình | Nhu cầu, định nghĩa, quy tắc xoay |
| 5 | S09b | Ví dụ: bảng đơn hình hộp hạt, bước xoay đầu | Hai bảng, phần tử xoay, quy tắc Bland |
| 5 | S09c | Ví dụ: bảng đơn hình hộp hạt, bảng cuối | Bảng cuối, nghiệm tối ưu duy nhất; hình hai đường đơn hình |
| 5 | S10 | Cơ sở khả thi xuất phát và pha I | Nhu cầu (hợp đồng $x_1+x_2\ge40$), trực quan, pha I giải bài toán phụ, mệnh đề |
| 5 | S10b | Ví dụ: bài toán hộp hạt có hợp đồng, pha I | Pha I (quy tắc Bland), pha II ($\bar c_j$ lớn nhất) |
| 5 | S11 | Bài tập: phương pháp đơn hình, lợi ích mới | Đề bài LLO19 |
| 5 | S11b | Bài tập: phương pháp đơn hình, lợi ích mới | Lời giải trên mặt trang: bảng lặp, tập nghiệm tối ưu từ điều kiện tối ưu (a) |
| 6 · Quy hoạch động | D01 | 6. Quy hoạch động | Trang tiêu đề mạch (`id="mach-6"` từ 2026-10-23); nhu cầu |
| 6 | D01b | Chuỗi quyết định và số phương án | Nhu cầu và so sánh LP–DP |
| 6 | D02 | Trạng thái và bài toán con | Trực quan và định nghĩa trạng thái |
| 6 | D03 | Ví dụ: đường đi ngắn nhất trên đồ thị tầng | Ví dụ DP |
| 6 | D04 | Bài toán quyết định theo giai đoạn | Định nghĩa mô hình |
| 6 | D04b | Phương trình Bellman | Định lý |
| 6 | D05 | Quy trình giải ngược | Thuật toán |
| 6 | D05b | Chi phí tính toán của giải ngược | Độ phức tạp |
| 6 | D06 | Bài tập: giải ngược Bellman với chi phí mới | Đề bài tập DP |
| 6 | D06b | Bài tập: giải ngược Bellman với chi phí mới | Lời giải trên mặt trang |
| 7 · Tổng kết và chuyển tiếp | Z00 | 7. Tổng kết và chuyển tiếp | Trang tiêu đề mạch (`id="mach-7"` từ 2026-10-23); dòng dẫn trả lời vấn đề trung tâm |
| 7 | Z01 | Tổng kết | Kết quả / giả thiết / công cụ (năm hàng); "Kết luận:" có điều kiện trả lời P03 trên mặt trang |
| 7 | Z01b | Câu hỏi tự kiểm tra | Bốn câu hỏi (thêm $\theta^*=0$ từ 2026-10-23), đáp án trong ghi chú |
| 7 | Z02 | Tài liệu và chuyển tiếp | Nguồn; nhu cầu chuyển sang luồng mạng (đề cương, Buổi 9) |

## Phân bổ nội bộ

| Khối | Lý thuyết | Bài tập | Phạm vi |
|---|---:|---:|---|
| Mở bài và kết luận | $0{,}20$ tiết | $0{,}10$ tiết | P, Z |
| Quy hoạch tuyến tính | $1{,}40$ tiết | $0{,}70$ tiết | A, B, C; gồm bài tích hợp C11 |
| Quy hoạch động | $0{,}40$ tiết | $0{,}20$ tiết | D01–D06, cầu nối nội bộ |
| **Tổng** | **$2{,}00$ tiết** | **$1{,}00$ tiết** | Đúng đề cương |

Không hiển thị phân bổ này trên trang chiếu hoặc trong ghi chú diễn giả.

Bảng trên là phân bổ trước 2026-10-23 cho Buổi 7. Mạch 5 (phương pháp đơn hình) thuộc Chương 11 của Buổi 8 và được đưa vào Bài 07 theo yêu cầu người dùng 2026-10-23; không đặt số tiết nội bộ mới cho mạch này (quyết định master: không tự tạo phân bổ thời lượng).

## Nguồn được chọn

1. Đề cương UET.AI2012 chính thức: phạm vi Buổi 7, phân bổ 2 LT + 1 BT, LLO17–18 và CLO1.
2. Bertsimas và Tsitsiklis (1997), *Introduction to Linear Optimization*, Chương 1–2: nguồn chính cho mô hình LP, đa diện, dạng chuẩn, nghiệm cơ sở khả thi, điểm cực biên và bảo đảm tối ưu.
3. Vanderbei (2014), *Linear Programming: Foundations and Extensions*, ấn bản 4, Chương 1–3: bổ sung cách trình bày dạng chuẩn và nghiệm cơ sở trong lecture note.
4. `sources/Chương 8 Quy hoạch tuyến tính-phần 1.pdf`: mẫu nội dung người dùng cung cấp; chỉ có tiêu đề và các trang trống khi trích văn bản, nên không dùng làm nguồn phát biểu toán.
5. `sources/part1.docx`: cấu trúc cập nhật đặt LP và DP trong Tuần 7; chỉ dùng để xác nhận cầu nối DP.
6. `sources/MIT/189163b71d0f322315c5c5324a3bc5e6_MIT15_093J_F09_lec16.pdf`: nguồn MIT OCW cho khung trạng thái, quyết định, chuyển trạng thái và Bellman; không sao chép hình.
7. (2026-10-23) Bertsimas và Tsitsiklis (1997), Chương 3 (§§3.1–3.5; §3.6 hình học cột và §3.7 hiệu quả chỉ dẫn trong ghi chú bài giảng): nguồn chính của mạch 5; sách viết cho bài toán cực tiểu, deck viết cho cực đại nên dấu điều kiện tối ưu đảo lại. Không có bản cục bộ, chỉ trích theo mục.
8. (2026-10-23) Vanderbei (2014), ấn bản 4, Chương 2 (tr. 11–23: thuật toán, pha I §2.3, không bị chặn §2.4), Chương 3 (tr. 25–37: suy biến, quay vòng §3.2, quy tắc Bland §3.4, Định lý 3.3), Chương 4 (§4.4, tr. 41: Klee–Minty).
9. (2026-10-23) Bài giảng của giảng viên `mathAI-ch8p3`, `math-ai-ch8p4` (thứ tự nội dung chi phí rút gọn → tối ưu → cải thiện → không bị chặn → thuật toán → suy biến; bảng; pha I) và Bài tập chương 8, câu 5 (nguồn của bài toán hộp hạt, yêu cầu giải bằng đơn hình dạng bảng). Không trích `simplex-method 1.pdf` (MIT) để không cần thêm mục vào `sources/MIT/README.md`.

## Khóa ký hiệu và dữ kiện

- LP tổng quát: $x,c\in\mathbb R^n$, $A\in\mathbb R^{m\times n}$, $b\in\mathbb R^m$.
- Dạng chuẩn trong bài: $\max c^Tx$ với $Ax=b$, $x\ge0$, $\operatorname{rank}(A)=m\le n$.
- Ví dụ hộp hạt: $x_1,x_2$ là sản lượng tính theo nghìn hộp; $\max 2x_1+3x_2$ với $x_1\le30$, $x_2\le20$, $x_1+2x_2\le54$, $x\ge0$.
- Các đỉnh: $(0,0),(30,0),(30,12),(14,20),(0,20)$; giá trị tương ứng $0,60,96,88,60$; nghiệm tối ưu duy nhất $(30,12)$.
- Hồi quy $L_1$: $M$ mẫu $h_i\in\mathbb R^n$, $y_i\in\mathbb R$, $x\in\mathbb R^n$, $t_i\in\mathbb R_+$ (không dùng $a_i,b_i,m$ vì các chữ này chỉ dữ kiện ràng buộc $A$, $b$); ví dụ $\min_x|x-1|+|x-3|$ có tập nghiệm $[1,3]$.
- Ví dụ điểm cực biên: $\max x_1+x_2$ với $x_1+x_2\le2$, $x\ge0$ (trước 2026-10-03 viết dạng tương đương $\min -x_1-x_2$); cả cạnh $x_1+x_2=2$ tối ưu.
- Bài tập C11 (lợi ích mới trên miền hộp hạt): miền hộp hạt với $\max 2x_1+4x_2$; giá trị tại năm đỉnh $0,60,108,108,80$; cả cạnh $(30,12)$–$(14,20)$ tối ưu; thuật toán từ $(0,0)$ dừng tại $(30,12)$.
- Bài chuyển giao C10: $\max x_1+x_2$ với $x_1+2x_2\le4$, $3x_1+x_2\le6$, $x\ge0$; đường đỉnh kề $(0,0)\to(2,0)\to(1{,}6;\,1{,}2)$ có giá trị $0\to2\to2{,}8$.
- Phương pháp đơn hình (2026-10-23): dạng chuẩn cực đại; cơ sở $B$, $A_B$, $x_B$, $c_B$; chỉ số ngoài cơ sở viết "$j\notin B$" hoặc $B^{\mathrm c}$ (không dùng $N$, vì $N$ là số giai đoạn của quy hoạch động); hướng cơ sở $d^j$ ($d^j_j=1$, $d^j_B=-A_B^{-1}A_j$); chi phí rút gọn $\bar c_j=c_j-c_B^TA_B^{-1}A_j$; biến vào khi $\bar c_j>0$, dừng khi mọi $\bar c_j\le0$; phép thử tỉ số $\theta^*$ đạt tại chỉ số ra $l$; cơ sở mới $B'$; bảng đơn hình có hàng cuối $[\bar c^T\mid -z]$; biến nhân tạo $\tilde s$ (không dùng $a$, trùng hàng $a_i^T$), biến dư $s_4$; không dùng $u$, $p$, $\mu$ cho đại lượng mới.
- Số liệu mạch 5 (kiểm bằng phân số chính xác): đường $\bar c_j$ lớn nhất $(0,0)\to(0,20)\to(14,20)\to(30,12)$, $z=0,60,88,96$, tại $(30,12)$ $\bar c_{s_1}=-\tfrac12$, $\bar c_{s_3}=-\tfrac32$; đường theo chỉ số nhỏ nhất (bảng S09b–S09c) $(0,0)\to(30,0)\to(30,12)$; thêm $x_1+x_2\le30$: $(0,0)\to(30,0)\xrightarrow{\theta^*=0}(30,0)\to(10,20)$, $z^*=80$; pha I với $x_1+x_2\ge40$: $(0,0)\to(30,0)\to(30,10)$, $\tilde s=40\to10\to0$, pha II tới $(30,12)$; bài tập $c=(2,4)$: $(0,0)\to(0,20)\to(14,20)$, $z^*=108$, $\bar c_{s_2}=0$, $\theta^*=8$ tới $(30,12)$.
- DP hữu hạn tất định: $x_{k+1}=f_k(x_k,u)$, $u\in U_k(x_k)$, chi phí $g_k$, chi phí cuối $g_N$, hàm giá trị $J_k$.
- Đồ thị tầng: các cạnh có chi phí $s$–$A$: $2$, $s$–$B$: $5$, $A$–$C$: $4$, $A$–$D$: $2$, $B$–$C$: $1$, $B$–$D$: $3$, $C$–$t$: $3$, $D$–$t$: $1$. Khi giải ngược, $J(C)=3$, $J(D)=1$, $J(A)=3$, $J(B)=4$, $J(s)=5$; đường tối ưu là $s\to A\to D\to t$.
- Bài chuyển giao D06 đổi $c(s,B)=3$, $c(C,t)=0$ và giữ các cạnh khác: $J(C)=0$, $J(D)=1$, $J(A)=3$, $J(B)=1$, $J(s)=4$; đường tối ưu là $s\to B\to C\to t$.

## Quyết định cấu trúc đợt 2026-10-23

- Đảo quyết định cũ "Không đưa tableau, pivot, biến vào–ra hoặc tìm cơ sở ban đầu theo Phase I" (storyboard, mục "Quyết định cấu trúc"): lý do là yêu cầu người dùng 2026-10-23 đưa Chương 11 (phương pháp đơn hình) vào Bài 07.
- Mạch 4 giữ hình học và thuật toán duyệt đỉnh kề ở mức khái niệm; mọi phép tính trên cơ sở lên mặt trang ở mạch 5.
- Lược khỏi deck: hình học cột (11.5), phương pháp đơn hình cải tiến, quy tắc từ điển, ví dụ quay vòng, chiều ngược của điều kiện tối ưu khi không suy biến; các nội dung này nằm trong ghi chú bài giảng hoặc ghi chú diễn giả.
