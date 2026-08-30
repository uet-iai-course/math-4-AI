# Dàn ý Bài giảng 06 — Tối ưu để huấn luyện mô hình học sâu II

## Phạm vi và chuẩn đầu ra

- Buổi 6, Chương 8, mục 8.5–8.7 theo đề cương UET.AI2012; thời lượng chính thức: **2 tiết lý thuyết + 1 tiết bài tập**.
- **LLO14 / CLO2,3:** hiểu và vận dụng AdaGrad, RMSProp, Adam.
- **LLO15 / CLO2,3:** tính được hai vòng gradient liên hợp, kiểm được một cập nhật BFGS và chọn Newton, HF–CG hoặc BFGS/L-BFGS theo giả thiết và chi phí.
- **LLO16 / CLO3,4:** hiểu và vận dụng chuẩn hóa theo lô, hạ tọa độ, lấy trung bình Polyak, tiền huấn luyện có giám sát, phương pháp tiếp tục và học theo chương trình.
- Tiên quyết: gradient lô nhỏ, momentum, Hessian, số điều kiện, khởi tạo và tiêu chuẩn dừng từ Bài 05.
- Sản phẩm: giải thích ba loại bộ nhớ ở vòng đầu, tính và so sánh vòng hai của ba cập nhật thích nghi; tính hai vòng CG; kiểm hướng giảm BFGS; chọn công cụ độ cong theo chi phí; áp dụng và phân biệt đủ sáu chiến lược LLO16 theo khung tình huống–can thiệp–phép đo/giới hạn.

## Sáu mạch và 36 trang

| Mạch | Mã | Tiêu đề | Vai trò |
|---|---|---|---|
| P | P00 | Tối ưu để huấn luyện mô hình học sâu II | Định danh |
| P | P01 | Tiên quyết và mục tiêu học tập | Khóa ký hiệu, ba sản phẩm và sáu minh chứng LLO16 |
| P | P02 | Ba quyết định mở rộng SGD | Vấn đề trung tâm |
| A | A01 | Một tốc độ học cho mọi tọa độ | Nhu cầu |
| A | A02 | Trực quan co giãn theo lịch sử | Trực quan |
| A | A03 | Trạng thái vòng đầu của ba bộ tối ưu | Ví dụ chung; giải thích $r_1,v_1^{\mathrm{RMS}},m_1^{\mathrm{Adam}},v_1^{\mathrm{Adam}}$ trước công thức thuật toán |
| A | A04 | AdaGrad | Hình thức |
| A | A05 | RMSProp | Hình thức và giới hạn |
| A | A06 | Adam và hiệu chỉnh độ lệch | Hình thức |
| A | A07 | Quy trình triển khai và lựa chọn | Ứng dụng |
| A | A08 | Vòng hai và so sánh bộ nhớ | Bài tập LLO14 và đối chiếu ba cơ chế nhớ |
| B | B01 | Gradient chưa mô tả độ cong | Nhu cầu |
| B | B02 | Mô hình bậc hai cục bộ | Trực quan–hình thức |
| B | B03 | Newton có giảm chấn | Ví dụ và trường hợp biên |
| B | B04 | Newton trong mạng sâu | Thuật toán và chi phí |
| B | B05 | CG trong Hessian-free | Thuật toán, giả thiết SPD và tích ma trận–véc-tơ |
| B | B06 | Hai vòng gradient liên hợp | Ví dụ tính được LLO15 |
| B | B07 | BFGS và L-BFGS | Công thức, bộ nhớ và điều kiện cặp cong |
| B | B08 | Kiểm số một cập nhật BFGS | Ví dụ tính được LLO15 |
| B | B09 | Bài tập chọn công cụ độ cong | Bài tập LLO15 |
| C | C01 | Ổn định bài toán thay vì chỉ đổi bước | Nhu cầu chiến lược |
| C | C02 | Chuẩn hóa theo lô | BN: trực quan–hình thức |
| C | C03 | Ví dụ chuẩn hóa một đặc trưng | BN: ví dụ với $\epsilon>0$ và giới hạn lý tưởng |
| C | C04 | Hạ tọa độ và hạ theo khối | Chiến lược 2 |
| C | C05 | Ví dụ hạ tọa độ chậm | Phân biệt một cập nhật và một chu kỳ |
| C | C06 | Lấy trung bình Polyak | Chiến lược 3 và ví dụ tính được |
| C | C07 | Khung chọn chiến lược cục bộ | Ba minh chứng theo tín hiệu–can thiệp–phép đo/giới hạn; gộp trang tổng hợp cũ |
| D | D01 | Điểm đầu chưa nằm trong miền dễ tối ưu | Nhu cầu toàn cục |
| D | D02 | Tiền huấn luyện có giám sát | Chiến lược 4 |
| D | D03 | Phương pháp tiếp tục | Chiến lược 5; minh họa khởi tạo ấm và làm trơn/độ khó tăng |
| D | D04 | Học theo chương trình | Chiến lược 6 |
| D | D05 | Ví dụ lịch độ khó ngẫu nhiên | Ví dụ–ứng dụng |
| D | D06 | Ba phương án cho tuyến huấn luyện | Ba tình huống cụ thể; đáp án can thiệp và phép đo/giới hạn hiện bằng fragment |
| Z | Z01 | Bảng quyết định tổng hợp | Thu hồi ba quyết định |
| Z | Z02 | Bài tập tích hợp | Tổng hợp–lựa chọn theo LLO14–16; mỗi lựa chọn có phép đo và giới hạn |
| Z | Z03 | Ranh giới, tài liệu và chuyển tiếp | Phân biệt bảo đảm, nguồn cốt lõi và cầu nối Bài 07; URL chi tiết đặt trong ghi chú |

## Phân bổ nội bộ

Đơn vị trong bảng là **tiết**.

| Mạch | Lý thuyết | Bài tập | Vai trò |
|---|---:|---:|---|
| P và Z | $0{,}30$ | $0{,}20$ | Mở bài, khóa minh chứng, tổng hợp và tự kiểm |
| A | $0{,}40$ | $0{,}20$ | Tốc độ học thích nghi, trạng thái và bài tập hai vòng |
| B | $0{,}40$ | $0{,}30$ | Độ cong xấp xỉ, hai phép tính và chọn công cụ |
| C | $0{,}45$ | $0{,}20$ | Ba chiến lược cục bộ và khung đánh giá |
| D | $0{,}45$ | $0{,}10$ | Ba tuyến huấn luyện và phép đo tách biệt |
| **Tổng** | **$2{,}00$** | **$1{,}00$** | Đúng phân bổ đề cương |

C và D mỗi mạch nhận $0{,}45$ tiết lý thuyết để đủ phát triển sáu chiến lược LLO16. P và Z nhận $0{,}30$ LT + $0{,}20$ BT để khóa đầu vào, thu hồi quyết định và tự kiểm; B nhận nhiều bài tập nhất vì LLO15 có hai phép tính độc lập và một quyết định lựa chọn công cụ.

Không hiển thị phân bổ này trên trang chiếu hoặc trong ghi chú diễn giả.

## Nguồn được chọn

1. Đề cương UET.AI2012 chính thức: phạm vi, 2 LT + 1 BT, LLO14–16 và CLO2–4.
2. Goodfellow, Bengio và Courville (2016), *Deep Learning*, Chương 8, mục 8.5–8.7: nguồn nội dung chính; dùng trang sách chính thức của tác giả để trích dẫn.
3. Duchi, Hazan và Singer (2011): AdaGrad; Hinton (2012), bài giảng 6e: RMSProp; Kingma và Ba (2015): Adam.
4. Martens (2010), *Deep learning via Hessian-free optimization*: HF, gradient liên hợp và tích ma trận–véc-tơ.
5. Nocedal và Wright (2006), *Numerical Optimization*: Newton, BFGS, L-BFGS.
6. Ioffe và Szegedy (2015): chuẩn hóa theo lô; Polyak và Juditsky (1992): lấy trung bình; Bengio và cộng sự (2009): học theo chương trình.
7. `sources/Optimization_2015_11_11.pdf`, `sources/Deep_HessianFree.pdf`: chỉ kiểm chéo; không sao chép hình.

## Khóa ký hiệu

- $\theta,g_t,r_t,p_t,s_t,y_t\in\mathbb R^d$; $v_t^{\mathrm{RMS}},m_t^{\mathrm{Adam}},v_t^{\mathrm{Adam}}\in\mathbb R^d$. Mọi phép chia, căn và bình phương trong thuật toán thích nghi là theo phần tử.
- $a_t\in\mathbb R^d_{\ge0}$ là thống kê lịch sử bình phương gradient; $a_{t,j}$ là phần tử thứ $j$.
- $H_t=\nabla^2F(\theta_t)\in\mathbb R^{d\times d}$; Newton giảm chấn dùng $B_t=H_t+\lambda_tI$; HF thường dùng $B_t=G_t+\lambda_tI$ với $G_t\succeq0$, $\lambda_t>0$ để $B_t\succ0$.
- Trong BFGS, $M_t\approx H_t^{-1}$; $s_t=\theta_{t+1}-\theta_t$, $y_t=g_{t+1}-g_t$, yêu cầu $y_t^Ts_t>0$ cho cập nhật dương xác định chuẩn.
- Với chuẩn hóa theo lô, $H\in\mathbb R^{m\times d}$, thống kê lấy theo $m$ hàng; $\gamma,\beta\in\mathbb R^d$.
