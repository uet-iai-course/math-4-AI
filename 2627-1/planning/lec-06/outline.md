# Dàn bài Bài giảng 06: Các phương pháp tối ưu trong học sâu

## Thông tin chung

Bản xây dựng lại ngày 2026-09-26, dành cho sinh viên năm ba học phần **Cơ sở toán học cho AI**. Nguồn bắt buộc: đề cương DOCX chính thức, Buổi 6; Goodfellow, Bengio, Courville (2016), Chương 8 §§8.5–8.7. [Phân tích nguồn và các quyết định](#phân-tích-nguồn-và-thiết-kế-nội-dung), [bản đồ hành trình và vai trò từng trang](storyboard.md).

Vấn đề trung tâm: lựa chọn thành phần cần điều chỉnh khi một tốc độ học vô hướng không xử lý đủ khác biệt thang đo, độ cong và giới hạn của mô hình hoặc dữ liệu. Phương án phải có dữ kiện, giả thiết, chi phí và phép kiểm.

Chuẩn đầu ra bài học (LLO) và chuẩn đầu ra học phần (CLO) được ánh xạ như sau. MT1: tính và phân biệt AdaGrad, RMSProp, Adam (LLO14/CLO2,3). MT2: vận dụng Newton, gradient liên hợp, BFGS và kiểm điều kiện (LLO15/CLO2,3). MT3: vận dụng sáu chiến lược, xác định thành phần bị thay và giới hạn (LLO16/CLO3,4). Các mã chỉ dùng trong tài liệu soạn.

Tiên quyết: mục tiêu trung bình, giảm theo gradient ngẫu nhiên (SGD), momentum, Nesterov, khởi tạo từ Bài 05; gradient, Hessian, dạng toàn phương và quy tắc dây chuyền. Gradient liên hợp và BFGS được dạy mới. Tổng **45 trang, 7 mạch, 2 tiết lý thuyết và 1 tiết bài tập**. Không quy đổi sang phút. Hoạt động tính tay và kiểm tra đã nằm trong tổng; thời lượng không được đưa lên mặt trang hay ghi chú diễn giả.

Bản này chỉ là kế hoạch mới; HTML và tài liệu công khai hiện có chưa đồng bộ. Không giữ hoặc dùng kết quả kiểm định tuyến cũ để chứng nhận tuyến mới.

Quy ước viết tắt trong kế hoạch: ma trận đối xứng xác định dương (SPD); gradient liên hợp (conjugate gradient, CG); chuẩn hóa theo lô (batch normalization, BN); BFGS là tên thuật toán Broyden–Fletcher–Goldfarb–Shanno. Các dạng viết tắt được giới thiệu lại tại trang dạy tương ứng nếu cần hiển thị.

Cơ sở chung: bài toán huấn luyện với dữ liệu, mô hình, mục tiêu, tham số đầu, quỹ đạo và quy tắc trả về; mô hình bước có phạt xác định dương liên kết B–D. E–F thay thành phần của quá trình huấn luyện, không ép vào cùng công thức bước. Vòng t≥1 tính gradient tại tham số t−1; Newton/BFGS dùng ký hiệu điểm hiện tại khi không cần chỉ số. Chi tiết hợp đồng ký hiệu và các phát biểu HT0–HT13 nằm ở phần Phân tích nguồn và thiết kế nội dung, mục 4 và 7.

## Bản đồ các phần

| Mạch | Chức năng | Đầu vào | Đầu ra và liên kết | Trang | Lý thuyết (tiết) | Bài tập (tiết) | Kiểm tra |
|---|---|---|---|---|---|---|---|
| A | Bài toán và mô hình bước cập nhật | Gradient, hàm bậc hai và bước SGD của Bài 05 | Sơ đồ thành phần huấn luyện; ma trận phạt và nhu cầu ước lượng thang đo | A01–A05 | 0,20 | 0,08 | A05 |
| B | Thống kê gradient theo tọa độ | Mô hình bước với ma trận đường chéo | Ba cơ chế trạng thái và giới hạn tương tác tọa độ | B01–B09 | 0,38 | 0,20 | B09 |
| C | Độ cong và hệ Newton | Giới hạn của thống kê đường chéo | Hệ SPD, hướng Newton và nghiệm CG có phần dư kiểm được | C01–C08 | 0,40 | 0,22 | C08 |
| D | Xấp xỉ độ cong từ gradient | Chi phí cung cấp toán tử độ cong trong Newton–CG | Cặp cát tuyến hợp lệ và hướng BFGS; nhu cầu xem các thành phần khác | D01–D05 | 0,24 | 0,12 | D05 |
| E | Phép tính mô hình, khối biến và đầu ra | Các giới hạn của việc chỉ thay bước | Phân biệt BN, hạ theo khối, Polyak và đường truyền gradient | E01–E08 | 0,38 | 0,15 | E08 |
| F | Huấn luyện theo giai đoạn | Mô hình, mục tiêu, dữ liệu và điểm đầu của bài toán | Phân biệt chuyển tham số, họ mục tiêu, lịch phân phối; điều kiện mục tiêu đích | F01–F07 | 0,30 | 0,13 | F07 |
| G | Lựa chọn và đánh giá phương pháp | Kết quả và giới hạn của sáu mạch trước | Phương án có dữ kiện, điều kiện áp dụng và phép kiểm | G01–G03 | 0,10 | 0,10 | G02 |

Tổng: 2,00 tiết lý thuyết + 1,00 tiết bài tập = 3,00 tiết. Mở đầu theo thứ tự tiêu đề → nội dung/mục tiêu → động lực. Số trang là kết quả phân rã cơ chế, ví dụ và kiểm tra; không được thêm trang chỉ để giữ mốc 45.

## Dàn bài chi tiết

### Mạch A. Bài toán và mô hình bước cập nhật

Chức năng: bài toán và mô hình bước cập nhật. Đầu vào: Gradient, hàm bậc hai và bước SGD của Bài 05. Đầu ra: Sơ đồ thành phần huấn luyện; ma trận phạt và nhu cầu ước lượng thang đo. Mục tiêu: MT1–MT3; A03–A05 tập trung MT1–MT2. Mạch học tập và ngoại lệ gộp được ghi trong storyboard. Thời lượng: 0,20 tiết lý thuyết, 0,08 tiết bài tập, gồm A05.

#### A01. Các phương pháp tối ưu trong học sâu

- **Vai trò và mục tiêu:** Xác lập phạm vi Bài 06; MT1–MT3.
- **Luận điểm trung tâm:** Bài học xét cách điều chỉnh bước cập nhật và tổ chức quá trình huấn luyện.
- **Ý chính:** Cơ sở toán học cho AI; Bài 06; Viện Trí tuệ nhân tạo. Phạm vi Chương 8, §§8.5–8.7.
- **Ví dụ/hình dự kiến:** Không cần hình: trang nhận diện bài học.
- **Hình thức hóa:** Không áp dụng.
- **Kết nối:** Nhận mục tiêu huấn luyện từ Bài 05; A02 phân chia các quyết định cần học.
- **Nguồn:** DC, Buổi 6; DL, §§8.5–8.7.
- **Thời lượng:** 0,02 tiết lý thuyết + 0,00 tiết bài tập. Nhận diện chủ đề, học phần và phạm vi Chương 8.
- **Ghi chú soạn:** Tiêu đề học thuật; không hiện thời lượng hoặc mã trang.

#### A02. Nội dung và mục tiêu học tập

- **Vai trò và mục tiêu:** Bản đồ nội dung; MT1–MT3.
- **Luận điểm trung tâm:** Ba nhóm quyết định tương ứng với ba chuẩn đầu ra của buổi học.
- **Ý chính:** Tính bước AdaGrad, RMSProp, Adam; giải hoặc xấp xỉ hệ Newton bằng gradient liên hợp và BFGS; vận dụng sáu chiến lược tổ chức huấn luyện. Tiên quyết: gradient, Hessian, ma trận xác định dương, giảm theo gradient ngẫu nhiên (SGD), momentum và Nesterov.
- **Ví dụ/hình dự kiến:** Sơ đồ dữ liệu và mô hình → mục tiêu cùng điểm đầu → quy tắc cập nhật và quỹ đạo → quy tắc trả về và đầu ra. Ba nhóm mục tiêu đặt dưới sơ đồ: thống kê gradient, thông tin độ cong, các thành phần huấn luyện. B–D điều chỉnh cách sinh bước; E–F xét phép tính, khối biến, đầu ra, điểm đầu và mục tiêu theo giai đoạn.
- **Hình thức hóa:** MT1/LLO14, MT2/LLO15, MT3/LLO16; không giả định đã học gradient liên hợp hoặc BFGS.
- **Kết nối:** A01 xác lập phạm vi; sơ đồ thành phần là cơ sở toàn bài. A03–A04 xét riêng một bước trên quỹ đạo, E01 và G01 dùng lại cùng các thành phần để phân biệt can thiệp.
- **Nguồn:** DC, LLO14–16; DL, §§8.5–8.7.
- **Thời lượng:** 0,03 tiết lý thuyết + 0,00 tiết bài tập. Đọc sơ đồ thành phần, xác định ba nhóm quyết định và tiên quyết.
- **Ghi chú soạn:** Mục tiêu dùng động từ tính, phân biệt, lựa chọn kèm điều kiện; các định nghĩa mới được dạy tại chỗ.

#### A03. Sai lệch thang đo trong bước cập nhật

- **Vai trò và mục tiêu:** Nhu cầu, trực quan và ví dụ dẫn nhập cho HT1; MT1–MT2.
- **Luận điểm trung tâm:** Một tốc độ học vô hướng chịu chi phối bởi hướng có độ cong lớn.
- **Ý chính:** Xét $F(\theta)=\frac12(\theta_1^2+9\theta_2^2)$ tại điểm hiện tại $\theta=(1,1)^\top$, với gradient $g=(1,9)^\top$. Với $\eta=0{,}2$, hạ gradient cho $\theta^+=(0{,}8,-0{,}8)^\top$; với $\eta=1$ cho $\theta^+=(0,-8)^\top$.
- **Ví dụ/hình dự kiến:** Đường đồng mức trên hai trục $\theta_1,\theta_2$, đánh dấu điểm đầu và hai bước. $F$ lần lượt là $5$, $3{,}2$, $288$. Tất cả là ví dụ tự xây dựng.
- **Hình thức hóa:** Nhắc $\theta^+=\theta-\eta g$; $\theta_1,\theta_2$ chỉ hai tọa độ của điểm hiện tại. Chưa gọi bước chuẩn hóa là Newton.
- **Kết nối:** A02 đặt nhiệm vụ chọn bước; các độ dài lệch nhau tạo nhu cầu về ma trận phạt tại A04.
- **Nguồn:** Ví dụ V1 tự xây dựng; DL, §8.2.1; ST, tr. 15–17.
- **Thời lượng:** 0,08 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Hình chỉ minh họa hàm bậc hai xác định dương. Không suy rộng giá trị giảm này cho gradient lô nhỏ hoặc mạng phi lồi.

#### A04. Mô hình cục bộ của bước cập nhật

- **Vai trò và mục tiêu:** Hình thức hóa và ứng dụng HT1; MT1–MT2.
- **Luận điểm trung tâm:** Ma trận phạt xác định dương cho một cách điều chỉnh độ dài và hướng của bước.
- **Ý chính:** Dữ liệu $\mathcal D=\{(x_i,y_i)\}_{i=1}^n$, tham số $\theta\in\mathbb R^p$, $F(\theta)=n^{-1}\sum_i\ell(f_\theta(x_i),y_i)$; $g_t$ là gradient lô nhỏ, bằng $\nabla F$ khi dùng toàn bộ dữ liệu. Với $M_t\succ0$, $\eta_t>0$, tối thiểu hóa $g_t^\top d+(2\eta_t)^{-1}d^\top M_td$. Quy ước chỉ số: vòng $t\ge1$ tính $g_t$ tại $\theta_{t-1}$ và nhận $\theta_t=\theta_{t-1}+d_t$; Newton/BFGS dùng ký hiệu điểm hiện tại $\theta$ khi không cần chỉ số.
- **Ví dụ/hình dự kiến:** V1: chọn $M=\operatorname{diag}(1,9)$, $\eta=1$ cho $d=(-1,-1)^\top$. Vẽ elip của mức phạt và tiếp xúc mặt phẳng tuyến tính.
- **Hình thức hóa:** HT1: $d_t=-\eta_tM_t^{-1}g_t$. Đạo hàm theo $d$ bằng $g_t+M_td/\eta_t$; nghiệm duy nhất do $M_t\succ0$. Ma trận đối xứng xác định dương (SPD) thỏa $M=M^\top$ và $z^\top Mz>0$ với mọi $z\ne0$.
- **Kết nối:** A02 xác lập các thành phần huấn luyện; A03 cung cấp dữ kiện để xét một bước trên quỹ đạo. B dùng thống kê gradient để dựng ma trận đường chéo, C dùng Hessian; E–F gọi lại sơ đồ để thay thành phần khác.
- **Nguồn:** HT1 tự suy ra; DL, §§8.5–8.7. BV, §9.4.1, tr.476–477, hướng theo chuẩn bậc hai.
- **Thời lượng:** 0,07 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Phân biệt độ đo của bước với Hessian. Khi Adam dùng moment thay $g_t$, công thức không bảo đảm hướng giảm của gradient hiện tại. E–F không buộc vào mô hình này.

#### A05. Kiểm tra mô hình bước cập nhật

- **Vai trò và mục tiêu:** Kiểm tra riêng mạch A; MT1–MT2.
- **Luận điểm trung tâm:** Điều chỉnh thang đo phải gắn với dữ kiện và giả thiết.
- **Ý chính:** Bài tính dùng mô hình và ký hiệu đã xác lập; đáp án ở ghi chú.
- **Ví dụ/hình dự kiến:** Bảng hai lựa chọn ma trận phạt; không thêm hình.
- **Hình thức hóa:** HT1, phép nhân ma trận đường chéo.
- **Kết nối:** A04 cho công thức; kết quả A05 đặt nhu cầu ước lượng thang đo khi chưa biết Hessian tại B01.
- **Nguồn:** Ví dụ tự xây dựng từ V1.
- **Thời lượng:** 0,00 tiết lý thuyết + 0,08 tiết bài tập. Suy nghĩ, trình bày và chữa theo mục hoạt động dưới.
- **Ghi chú soạn:** Đánh giá dấu, kích thước và điều kiện xác định dương; không hỏi công thức AdaGrad trước khi học.
- **Câu hỏi:** Cho $g=(2,8)^\top$, $\eta=1/2$, xét bài toán $\min_{d\in\mathbb R^2}\{g^\top d+(2\eta)^{-1}d^\top Md\}$. Tính nghiệm $d$ với $M=I$ và $M=\operatorname{diag}(1,4)$. Nếu $M=\operatorname{diag}(1,-4)$, bài toán có nghiệm cực tiểu không? Giải thích bằng dạng toàn phương.
- **Kiến thức được đo:** MT1–MT2: áp dụng công thức bước có phạt; kiểm tính xác định dương và tính bị chặn dưới. Chỉ dùng A03–A04 và tiên quyết.
- **Đáp án/gợi ý:** Hai bước là $(-1,-4)^\top$ và $(-1,-1)^\top$. Ma trận cuối không xác định dương; hàm theo $d$ không bị chặn dưới theo tọa độ thứ hai.
- **Tiêu chí đánh giá:** Tính đúng hai bước (2 ý); giải thích bằng dấu của dạng toàn phương (1 ý).
- **Thời gian hoạt động:** Suy nghĩ 0,04 tiết; trình bày 0,02; đối chiếu 0,02. Đã tính trong thời lượng trang.

### Mạch B. Thống kê gradient theo tọa độ

Chức năng: thống kê gradient theo tọa độ. Đầu vào: Mô hình bước với ma trận đường chéo. Đầu ra: Ba cơ chế trạng thái và giới hạn tương tác tọa độ. Mục tiêu: MT1. Mạch học tập và ngoại lệ gộp được ghi trong storyboard. Thời lượng: 0,38 tiết lý thuyết, 0,20 tiết bài tập, gồm B09.

#### B01. Thống kê gradient theo tọa độ

- **Vai trò và mục tiêu:** Nhu cầu và trực quan KN1; MT1.
- **Luận điểm trung tâm:** Lịch sử gradient cung cấp thang đo theo tọa độ mà không cần Hessian.
- **Ý chính:** Xét hai gradient liên tiếp $(2,1)^\top$ và $(2,0)^\top$. Tọa độ thứ nhất hoạt động cả hai lần, tọa độ thứ hai chỉ ở lần đầu. Theo dõi bình phương để không triệt tiêu dấu.
- **Ví dụ/hình dự kiến:** Bảng hai bước và hai tọa độ; cột tổng bình phương là (4,1), rồi (8,1). Màu kèm nhãn “lặp lại” và “ít xuất hiện”.
- **Hình thức hóa:** $g_t\odot g_t$ là bình phương từng thành phần; thống kê này không phải Hessian.
- **Kết nối:** A05 cần ước lượng thang đo; B02 dùng chính dãy gradient để tính một bước AdaGrad.
- **Nguồn:** DL, §8.5.1; ST, tr. 30–34; DU, thuật toán AdaGrad đường chéo.
- **Thời lượng:** 0,04 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Gradient là đầu vào minh họa, không khẳng định đây là quỹ đạo gradient của V1. Thang đo thống kê phụ thuộc đường đi.

#### B02. Ví dụ cập nhật AdaGrad

- **Vai trò và mục tiêu:** Ví dụ tính tay KN1; MT1.
- **Luận điểm trung tâm:** Với tốc độ học cơ sở cố định, tốc độ học hiệu dụng của AdaGrad theo từng tọa độ không tăng.
- **Ý chính:** Với dãy B01, $v_0=0$, $\eta=1$, bỏ $\varepsilon$ trong riêng phép tính có mẫu dương: $v_1=(4,1)$, $d_1=(-1,-1)$; $v_2=(8,1)$, $d_2=(-1/\sqrt2,0)$.
- **Ví dụ/hình dự kiến:** Hai thanh độ dài bước: tọa độ 1 giảm từ 1 xuống xấp xỉ 0,707; tọa độ 2 có gradient bằng 0 ở bước 2.
- **Hình thức hóa:** Tính $v_t=v_{t-1}+g_t\odot g_t$ trước, rồi chia gradient cho căn của thống kê mới.
- **Kết nối:** B01 cho dãy; B03 tổng quát hóa cùng $v_t$, $g_t$ và quy định xử lý mẫu bằng 0.
- **Nguồn:** Ví dụ V2 tự xây dựng; DL, thuật toán 8.4.
- **Thời lượng:** 0,03 tiết lý thuyết + 0,03 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Chỉ bỏ epsilon để tính tay khi tất cả mẫu dùng đều dương. Trình tự cập nhật thống kê trước tham số phải được giữ.

#### B03. Thuật toán AdaGrad

- **Vai trò và mục tiêu:** Hình thức hóa và ứng dụng KN1/HT2; MT1.
- **Luận điểm trung tâm:** AdaGrad dùng tổng bình phương gradient từ đầu quá trình.
- **Ý chính:** Đầu vào $\theta_0,\eta>0,\varepsilon>0,T$ và các lô $\mathcal B_t$; khởi tạo $v_0=0$. Lặp: tính $g_t$ tại $\theta_{t-1}$, cập nhật $v_t$, rồi $\theta_t=\theta_{t-1}-\eta g_t/(\sqrt{v_t}+\varepsilon)$. Các phép chia, căn thực hiện theo tọa độ.
- **Ví dụ/hình dự kiến:** Tọa độ thứ hai của dãy $(2,1),(2,0)$ mô tả gradient của một đặc trưng thưa chỉ xuất hiện ở lô đầu. Sau hai vòng, $v_2=(8,1)$ nên tốc độ học hiệu dụng là $\eta/(\sqrt8+\varepsilon)$ và $\eta/(1+\varepsilon)$. Tọa độ ít xuất hiện giữ tốc độ hiệu dụng lớn hơn trong dãy này, dù bước hiện tại bằng 0 vì gradient bằng 0.
- **Hình thức hóa:** HT2; $M_t=\operatorname{diag}(\sqrt{v_t}+\varepsilon)\succ0$; chi phí trạng thái $O(p)$ ngoài gradient.
- **Kết nối:** B02 cung cấp cơ chế; tích lũy không quên dẫn tới nhu cầu B04 khi gradient thay đổi phân bố.
- **Nguồn:** DL, §8.5.1, thuật toán 8.4; DU, §3, Hình 1, tr.2130; §5, tr.2136.
- **Thời lượng:** 0,06 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Dừng theo ngân sách $T$ hoặc tiêu chí kiểm định đã ấn định. Bảo đảm trong tối ưu lồi của nguồn AdaGrad không được dùng như định lý hội tụ mạng sâu.

#### B04. Ví dụ cập nhật RMSProp

- **Vai trò và mục tiêu:** Nhu cầu, trực quan và ví dụ KN2; MT1.
- **Luận điểm trung tâm:** Trung bình mũ giảm ảnh hưởng của gradient xa trong quá khứ.
- **Ý chính:** Dùng lại $g_1=(2,1)$, $g_2=(2,0)$, $v_0=0$, $\rho=1/2$, $\eta=1$. Có $v_1=(2,1/2)$, $v_2=(3,1/4)$; bỏ $\varepsilon$ riêng ví dụ cho $d_2=(-2/\sqrt3,0)$.
- **Ví dụ/hình dự kiến:** Bảng trọng số gradient: lần gần nhất 1/2, lần trước 1/4; đối chiếu tổng 8 của AdaGrad với trung bình 3 ở tọa độ 1.
- **Hình thức hóa:** $v_t=\rho v_{t-1}+(1-\rho)g_t\odot g_t$; biểu thức chưa hiệu chỉnh độ chệch.
- **Kết nối:** B03 tích lũy toàn lịch sử; B04 thay tổng bằng bộ nhớ suy giảm, B05 nêu thuật toán.
- **Nguồn:** DL, §8.5.2; TO, tr. 29; ví dụ V3 tự xây dựng.
- **Thời lượng:** 0,03 tiết lý thuyết + 0,03 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Không so sánh độ lớn bước để kết luận thuật toán nào tốt hơn; hai thống kê có thang khác nhau.

#### B05. Thuật toán RMSProp

- **Vai trò và mục tiêu:** Hình thức hóa và ứng dụng KN2/HT3; MT1.
- **Luận điểm trung tâm:** RMSProp chuẩn hóa gradient bằng một thống kê bình phương có bộ nhớ hữu hạn hiệu dụng.
- **Ý chính:** Khởi tạo $v_0=0$; $0<\rho<1$, $\eta>0$, $\varepsilon>0$. Mỗi bước tính $g_t$, cập nhật $v_t$ như B04, rồi $\theta_t=\theta_{t-1}-\eta g_t/(\sqrt{v_t}+\varepsilon)$.
- **Ví dụ/hình dự kiến:** Đồ thị trọng số $(1-\rho)\rho^k$ theo độ trễ $k$, có nhãn trục và hai giá trị $\rho$; hình tự vẽ. Ở tọa độ thứ hai của dãy đã tính, gradient mất đi một vòng làm thống kê RMSProp giảm từ $1/2$ xuống $1/4$, còn AdaGrad giữ giá trị 1.
- **Hình thức hóa:** HT3; bộ nhớ và phép tính ngoài gradient $O(p)$; không dùng momentum hoặc hiệu chỉnh độ chệch trong biến thể được chọn. Ứng dụng cơ chế quên: nếu $g_{t+1,j}=\cdots=g_{t+k,j}=0$ thì $v_{t+k,j}=\rho^kv_{t,j}$; tổng AdaGrad ở tọa độ đó không đổi. Với $\varepsilon>0$, mẫu của tốc độ học hiệu dụng giảm trong thời gian vắng gradient; khi tọa độ hoạt động lại, thống kê mới còn phải cộng đóng góp gradient hiện tại.
- **Kết nối:** B04 cho phép tính; B06 bổ sung moment bậc nhất để kết hợp lịch sử hướng với lịch sử độ lớn.
- **Nguồn:** DL, thuật toán 8.5; TO, tr. 29–31, nguồn công thức; ST, tr. 32–33, đối chiếu mạch RMSProp.
- **Thời lượng:** 0,05 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Chọn một biến thể xuyên suốt với epsilon ngoài căn. Dừng theo quy tắc chung HT0; không hứa hội tụ vô điều kiện. So với thuật toán 8.5 trong DL đặt hằng số bên trong căn, dàn bài chọn biến thể ε ngoài căn; không đồng nhất hai hằng số.

#### B06. Ví dụ hiệu chỉnh moment trong Adam

- **Vai trò và mục tiêu:** Nhu cầu, trực quan và ví dụ KN3; MT1.
- **Luận điểm trung tâm:** Khởi tạo moment bằng 0 làm ước lượng ban đầu lệch về 0.
- **Ý chính:** Cho $g_1=(2,1)$, $m_0=v_0=0$, $\beta_1=1/2$, $\beta_2=3/4$. Có $m_1=(1,1/2)$, $v_1=(1,1/4)$; sau hiệu chỉnh $\widehat m_1=(2,1)$, $\widehat v_1=(4,1)$. Với $\eta=1$ và bỏ epsilon trong ví dụ, $d_1=(-1,-1)$.
- **Ví dụ/hình dự kiến:** Bảng moment thô/đã hiệu chỉnh; dùng cùng tọa độ với AdaGrad để đối chiếu cơ chế.
- **Hình thức hóa:** $\widehat m_t=m_t/(1-\beta_1^t)$, $\widehat v_t=v_t/(1-\beta_2^t)$.
- **Kết nối:** B05 cung cấp moment bậc hai; B06 cần thêm moment bậc nhất và hiệu chỉnh, B07 nêu đầy đủ thứ tự.
- **Nguồn:** DL, §8.5.3; AD, thuật toán 1 và §3; ví dụ V4 tự xây dựng.
- **Thời lượng:** 0,05 tiết lý thuyết + 0,03 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Tham số chọn để tính tay, không phải mặc định triển khai. Cùng bước đầu trong ví dụ không có nghĩa ba thuật toán tương đương. Chia cho tổng trọng số 1−β^t loại ảnh hưởng khởi tạo 0; chỉ gọi không chệch đối với moment chung khi giả định moment đó không đổi.

#### B07. Thuật toán Adam

- **Vai trò và mục tiêu:** Hình thức hóa và ứng dụng kiểm giới hạn KN3/HT4; MT1.
- **Luận điểm trung tâm:** Adam dùng moment đã hiệu chỉnh để xác định tử và mẫu của bước cập nhật.
- **Ý chính:** $m_t=\beta_1m_{t-1}+(1-\beta_1)g_t$, $v_t=\beta_2v_{t-1}+(1-\beta_2)g_t\odot g_t$; hiệu chỉnh như B06; $\theta_t=\theta_{t-1}-\eta_t\widehat m_t/(\sqrt{\widehat v_t}+\varepsilon)$.
- **Ví dụ/hình dự kiến:** Lưu đồ: gradient → hai moment → hiệu chỉnh theo $t$ → tham số. Hai nhánh trạng thái đều bắt đầu bằng 0.
- **Hình thức hóa:** HT4: $0<\beta_1,\beta_2<1$, $\varepsilon>0$; đầu vào $\theta_0,T,\eta_t,\mathcal B_t$; đầu ra $\theta_T$ hoặc điểm được chọn theo kiểm định.
- **Kết nối:** B06 xác lập hiệu chỉnh; B07 phân biệt moment và gradient hiện tại. B08 xét riêng thông tin tương tác mà thống kê đường chéo không chứa.
- **Nguồn:** AD, thuật toán 1; DL, thuật toán 8.7.
- **Thời lượng:** 0,07 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Tại vòng t dùng gradient ở tham số t−1. Không đồng nhất moment với gradient hiện tại; chi phí ngoài gradient và bộ nhớ đều O(p). Phản ví dụ một chiều: $g_t=-1$, $\widehat m_t=1$, $\eta_t>0$ và mẫu dương cho $d_t<0$, nên $g_td_t>0$. Nguyên nhân là moment khác dấu gradient hiện tại; ví dụ một chiều không liên quan đến thiếu tương tác giữa tọa độ.

#### B08. Giới hạn của chuẩn hóa theo tọa độ

- **Vai trò và mục tiêu:** Giới hạn chung của thống kê đường chéo KN1–KN3; chuẩn bị Newton KN4; MT1–MT2.
- **Luận điểm trung tâm:** Thống kê đường chéo không biểu diễn tương tác độ cong giữa các tọa độ.
- **Ý chính:** Với $Q=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, các trục riêng nghiêng so với trục tọa độ. Thống kê gradient đường chéo không tái tạo các phần tử ngoài đường chéo của $Q$. Cần thông tin độ cong có thể biểu diễn sự tương tác này.
- **Ví dụ/hình dự kiến:** Elip nghiêng có trục riêng (1,1) và (1,−1); vẽ hình đối chiếu không gắn số liệu thực nghiệm.
- **Hình thức hóa:** Với $z=(z_1,z_2)^\top$, $z^\top Qz=2z_1^2+2z_1z_2+2z_2^2$. Ma trận đường chéo chỉ tạo các hạng bình phương riêng, không có hạng tương tác $2z_1z_2$.
- **Kết nối:** B07 cho công thức; B09 kiểm tra thống kê và C01 sử dụng tương tác độ cong còn thiếu.
- **Nguồn:** DL, §§8.5.4–8.6.1; ST, tr. 45–49; ma trận và hình minh họa tự xây dựng.
- **Thời lượng:** 0,05 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Đánh giá thực nghiệm cần cùng dữ liệu, ngân sách, phép chọn siêu tham số; không chọn phương pháp chỉ từ một bước số học.

#### B09. Kiểm tra thuật toán thích ứng

- **Vai trò và mục tiêu:** Kiểm tra riêng mạch B; MT1.
- **Luận điểm trung tâm:** Phải cập nhật đúng thống kê trước khi so sánh các bước.
- **Ý chính:** Tính và giải thích ba thống kê từ cùng gradient; đáp án trong ghi chú.
- **Ví dụ/hình dự kiến:** Bảng ba hàng AdaGrad, RMSProp, Adam; cột trạng thái và bước.
- **Hình thức hóa:** HT2–HT4; quy ước epsilon của B03–B07.
- **Kết nối:** B08 giới hạn lựa chọn; C01 thay thống kê gradient bằng mô hình độ cong.
- **Nguồn:** Ví dụ tự xây dựng dựa trên V2–V4.
- **Thời lượng:** 0,00 tiết lý thuyết + 0,11 tiết bài tập. Suy nghĩ, trình bày và chữa theo mục hoạt động dưới.
- **Ghi chú soạn:** Bài tập đo cả thứ tự cập nhật và hiệu chỉnh; số nhỏ để phần giải thích chiếm đủ thời lượng.
- **Câu hỏi:** Cho $g_1=2$, $g_2=0$, mọi trạng thái ban đầu bằng 0; $\eta=1$, bỏ $\varepsilon$ vì mẫu dương. Tính bước thứ hai của AdaGrad, RMSProp với $\rho=1/2$, Adam với $\beta_1=1/2,\beta_2=3/4$. Giải thích vì sao Adam còn dịch chuyển.
- **Kiến thức được đo:** MT1: tổng bình phương, trung bình mũ, hiệu chỉnh moment và thứ tự cập nhật; đã học ở B01–B07.
- **Đáp án/gợi ý:** AdaGrad: $v_2=4,d_2=0$. RMSProp: $v_2=1,d_2=0$. Adam: $m_2=1/2,v_2=3/4$, $\widehat m_2=2/3,\widehat v_2=12/7$, $d_2=-(2/3)/\sqrt{12/7}\approx-0{,}5092$. Moment bậc nhất lưu gradient trước.
- **Tiêu chí đánh giá:** Đúng thống kê (3 ý), hiệu chỉnh Adam (1 ý), giải thích dịch chuyển dù gradient hiện tại bằng 0 (1 ý).
- **Thời gian hoạt động:** Suy nghĩ 0,06 tiết; trình bày 0,02; chữa 0,03. Đã tính trong thời lượng trang.

### Mạch C. Độ cong và hệ Newton

Chức năng: độ cong và hệ Newton. Đầu vào: Giới hạn của thống kê đường chéo. Đầu ra: Hệ SPD, hướng Newton và nghiệm CG có phần dư kiểm được. Mục tiêu: MT2. Mạch học tập và ngoại lệ gộp được ghi trong storyboard. Thời lượng: 0,40 tiết lý thuyết, 0,22 tiết bài tập, gồm C08.

#### C01. Tương tác độ cong giữa các tọa độ

- **Vai trò và mục tiêu:** Nhu cầu và trực quan KN4; MT2.
- **Luận điểm trung tâm:** Hessian biểu diễn cả độ cong theo từng hướng và tương tác giữa các tọa độ.
- **Ý chính:** Xét $F(\theta)=\frac12\theta^\top Q\theta$, $Q=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, $\theta_0=(1,0)^\top$. Gradient $(2,1)^\top$ không cùng phương với hướng tới nghiệm $(0,0)^\top$.
- **Ví dụ/hình dự kiến:** Elip nghiêng của B08 với điểm đầu trên trục ngang; vẽ −g và đoạn nối nghiệm.
- **Hình thức hóa:** $\nabla F=Q\theta$, $\nabla^2F=Q\succ0$; trị riêng 1 và 3.
- **Kết nối:** B08 để lại tương tác ngoài đường chéo; C02 tính bước dùng toàn bộ Q.
- **Nguồn:** DL, §8.6.1; ST, tr. 45–48; ví dụ V5 tự xây dựng.
- **Thời lượng:** 0,05 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Hình dùng hàm bậc hai trơn; Hessian toàn cục này chỉ là mô hình minh họa cho mạng sâu.

#### C02. Ví dụ bước Newton

- **Vai trò và mục tiêu:** Ví dụ tính tay KN4; MT2.
- **Luận điểm trung tâm:** Giải hệ độ cong đưa hàm bậc hai xác định dương tới nghiệm trong một bước.
- **Ý chính:** Với dữ kiện C01, giải $2d_1+d_2=-2$, $d_1+2d_2=-1$. Suy ra $d=(-1,0)^\top$, $\theta_1=(0,0)^\top$, $F(\theta_1)=0$.
- **Ví dụ/hình dự kiến:** Hai dòng khử ẩn và hình C01 cập nhật thêm d; không biểu diễn nghịch đảo ma trận bằng số.
- **Hình thức hóa:** $Qd=-g$ là điều kiện dừng của mô hình bậc hai tại $\theta_0$.
- **Kết nối:** C01 cho độ cong; C03 tổng quát hóa khi Hessian thay đổi theo tham số.
- **Nguồn:** Ví dụ V5 tự xây dựng; DL, §8.6.1.
- **Thời lượng:** 0,04 tiết lý thuyết + 0,03 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Phân biệt giải hệ với tính tường minh nghịch đảo; kết quả một bước đòi hỏi hàm bậc hai và giải hệ chính xác.

#### C03. Phương pháp Newton

- **Vai trò và mục tiêu:** Hình thức hóa KN4/HT5; MT2.
- **Luận điểm trung tâm:** Bước Newton cực tiểu hóa mô hình Taylor bậc hai khi Hessian xác định dương.
- **Ý chính:** Cho $F$ khả vi hai lần, $g=\nabla F(\theta)$, $H=\nabla^2F(\theta)\succ0$. Mô hình $F(\theta)+g^\top d+\frac12d^\top Hd$ cho hệ $Hd=-g$. Cập nhật $\theta^+=\theta+\alpha d$, với $\alpha$ được chọn để giảm mục tiêu.
- **Ví dụ/hình dự kiến:** Đặt mô hình tuyến tính có phạt A04 cạnh mô hình Taylor, cùng lựa chọn M=H và η=1.
- **Hình thức hóa:** HT5: nếu $g\ne0$, $g^\top d=-g^\top H^{-1}g<0$. Hội tụ bậc hai là kết quả cục bộ, cần Hessian Lipschitz và nghiệm có Hessian xác định dương. Hội tụ bậc hai còn cần khởi tạo đủ gần và bước đầy đủ ở pha cục bộ.
- **Kết nối:** C02 minh họa nghiệm mô hình; C04 kiểm tra giả thiết H xác định dương.
- **Nguồn:** DL, §8.6.1. BV, §9.5.1 tr.484; §9.5.2 tr.487; §9.5.3 tr.488–489.
- **Thời lượng:** 0,08 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Chứng minh dấu bằng biểu thức dạng toàn phương; phát biểu điều kiện hội tụ, không chứng minh dài. Chi phí lưu Hessian O(p²), giải hệ đặc O(p³).

#### C04. Giảm chấn cho hệ Newton

- **Vai trò và mục tiêu:** Trường hợp biên và ứng dụng KN4; MT2.
- **Luận điểm trung tâm:** Hessian bất định có thể cho hướng tăng; giảm chấn phải làm hệ xác định dương.
- **Ý chính:** Cho $F(\theta)=\frac12(\theta_1^2-\theta_2^2)$ tại $(0,1)$: $g=(0,-1)$, $H=\operatorname{diag}(1,-1)$. Newton cho $d=(0,-1)$ và $g^\top d=1>0$. Chọn $A=H+2I=\operatorname{diag}(3,1)$ cho $d=(0,1)$, $g^\top d=-1$.
- **Ví dụ/hình dự kiến:** Hình mặt cắt theo θ₂ với hai mũi tên ngược chiều; nhãn mục tiêu và hướng giảm.
- **Hình thức hóa:** $A=H+\lambda I\succ0$ khi $\lambda>-\lambda_{\min}(H)$; chỉ $\lambda>0$ chưa đủ. Tìm bước giảm hoặc vùng tin cậy là bước kiểm soát bổ sung.
- **Kết nối:** C03 cần SPD; C04 tạo hệ SPD nhưng chi phí lưu/giải còn lớn, dẫn đến C05.
- **Nguồn:** DL, §8.6.1; HF, §3; ví dụ V6 tự xây dựng.
- **Thời lượng:** 0,06 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Hàm ví dụ không có cực tiểu toàn cục; chỉ dùng kiểm tra hướng. Không hứa giảm thực tế chỉ từ dấu đạo hàm khi bước quá lớn.

#### C05. Ví dụ gradient liên hợp

- **Vai trò và mục tiêu:** Nhu cầu, trực quan và ví dụ KN5; MT2.
- **Luận điểm trung tâm:** Gradient liên hợp giải hệ xác định dương bằng các hướng liên hợp và tích ma trận–vectơ.
- **Ý chính:** Gradient liên hợp (conjugate gradient, CG) giải $Ad=b$, với $A=\operatorname{diag}(1,4)$, $b=(1,1)^\top$, $d_0=0$, $r_0=p_0=b$. Tối thiểu $q(d_0+\alpha p_0)$ cho $\alpha_0=(1^2+1^2)/(1+4)=2/5$. Do đó $d_1=(2/5,2/5)$, $r_1=(3/5,-3/5)$. Đặt $p_1=r_1+\beta_0p_0$ và buộc $p_0^\top Ap_1=0$: $\beta_0=-(-9/5)/5=9/25=[(3/5)^2+(-3/5)^2]/2$. Suy ra $p_1=(3/5,-3/5)+(9/25)(1,1)=(24/25,-6/25)$.
- **Ví dụ/hình dự kiến:** Elip của $q(d)=d^\top Ad/2-b^\top d$ và hai đoạn tới nghiệm. Vòng thứ hai cho $\alpha_1=5/8$, $d_2=(1,1/4)$; chi tiết phép thế ở ghi chú. Kiểm $p_0^\top Ap_1=0$ nhưng $p_0^\top p_1=18/25\ne0$.
- **Hình thức hóa:** $r_k=b-Ad_k$; “liên hợp” nghĩa là $p_i^\top Ap_j=0$ với $i\ne j$.
- **Kết nối:** C04 tạo hệ A; C05 dùng một hệ SPD nhỏ, C06 tổng quát hóa cùng r,p,α,β.
- **Nguồn:** SH, §8, (45)–(49), tr. in 32/trang PDF 38; DL, §8.6.2 cho phạm vi; ví dụ V7 tự xây dựng.
- **Thời lượng:** 0,05 tiết lý thuyết + 0,07 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Chỉ số k là vòng giải hệ bên trong, khác t của huấn luyện. CG tuyến tính được dạy mới, không giả định tiên quyết.

#### C06. Thuật toán gradient liên hợp tuyến tính

- **Vai trò và mục tiêu:** Hình thức hóa KN5/HT6; MT2.
- **Luận điểm trung tâm:** Thuật toán cần toán tử nhân với ma trận xác định dương, không cần ma trận nghịch đảo.
- **Ý chính:** Đầu vào toán tử $v\mapsto Av$, $b$, $d_0$, dung sai $\tau$, giới hạn K; $A=A^\top\succ0$. Đặt $r_0=b-Ad_0,p_0=r_0$. Nếu $r_0=0$ trả $d_0$. Lặp $\alpha_k=r_k^\top r_k/(p_k^\top Ap_k)$; $d_{k+1}=d_k+\alpha_kp_k$; $r_{k+1}=r_k-\alpha_kAp_k$; dừng nếu chuẩn phần dư đạt ngưỡng; nếu chưa, $\beta_k=r_{k+1}^\top r_{k+1}/(r_k^\top r_k)$, $p_{k+1}=r_{k+1}+\beta_kp_k$.
- **Ví dụ/hình dự kiến:** Giả mã gồm khởi tạo, bước, cập nhật phần dư, kiểm dừng, rồi cập nhật hệ số và hướng liên hợp. Giữ đủ cập nhật β và p trên mặt trang; phần giải thích chi phí và hữu hạn vòng đặt trong ghi chú.
- **Hình thức hóa:** HT6: dừng khi $\|r_k\|_2\le\tau\max(1,\|b\|_2)$ hoặc k=K; trong số học chính xác, nhiều nhất p bước cho hệ p chiều SPD.
- **Kết nối:** C05 giải hai chiều; C07 dùng cùng thuật toán cho hệ Newton giảm chấn.
- **Nguồn:** SH, §1 tr. in 1/PDF 7; §8 (45)–(49) tr. in 32/PDF 38; Phụ lục B2 tr. in 50/PDF 56. DL §8.6.2 cho phạm vi; HF §3 cho ứng dụng Newton–CG.
- **Thời lượng:** 0,07 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Bảo đảm hữu hạn bước đòi hỏi số học chính xác. Phân biệt CG tuyến tính và biến thể phi tuyến trong giáo trình; không dùng công thức tuyến tính với Hessian đổi sau mỗi vòng k. Quy tắc dừng $\tau\max(1,\|b\|_2)$ là lựa chọn biên soạn; SH B2 dùng ngưỡng tương đối theo $\|r_0\|_2$ và tính lại phần dư định kỳ. SH §9, tr. in 32–34/PDF 38–40 nêu dừng hữu hạn trong số học chính xác và ảnh hưởng sai số làm tròn.

#### C07. Giải gần đúng hệ Newton

- **Vai trò và mục tiêu:** Ứng dụng KN4–KN5; MT2.
- **Luận điểm trung tâm:** Tích Hessian–vectơ cho phép giải gần đúng hệ mà không lưu toàn bộ Hessian.
- **Ý chính:** Tại một bước huấn luyện, giữ cố định tham số và dữ liệu để định nghĩa $A=H+\lambda I\succ0$, $b=-g$. Nếu $g=0$, dừng để kiểm điểm dừng. Nếu $g\ne0$, dùng tích $Hv$ từ tự động vi phân và CG với $d_0=0$; kiểm phần dư rồi kiểm $g^\top d<0$ trước tìm bước ngoài. Nếu không đạt kiểm hướng do giải gần đúng hoặc sai số, siết dung sai/giải lại hoặc dùng $-g$ kèm tìm bước.
- **Ví dụ/hình dự kiến:** Sơ đồ vòng ngoài t bao vòng trong k; mọi tích Av ở một vòng trong dùng cùng toán tử. Ví dụ A=diag(1,4), b=(1,1) cho phần dư sau bước 1 có chuẩn √0,72.
- **Hình thức hóa:** Mỗi vòng CG: một tích Av và O(p) phép vectơ; bộ nhớ phụ O(p). Khi dùng Hessian thật phải kiểm soát độ cong âm; các xấp xỉ khác ngoài phạm vi chính.
- **Kết nối:** C06 cung cấp bộ giải; D01 sẽ bỏ yêu cầu tích Hessian–vectơ và học độ cong từ chênh lệch gradient.
- **Nguồn:** HF, §3–4; DL, §8.6.2.
- **Thời lượng:** 0,05 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Không tuyên bố tích Hessian–vectơ miễn phí. Không gọi tất cả CG là phương pháp bậc hai; vai trò ở đây là giải hệ Newton. Phần dư đo sai lệch giải hệ; một ngưỡng phần dư cho sẵn không thay phát biểu hướng giảm của nghiệm chính xác. Khi g=0, không yêu cầu bất đẳng thức hướng giảm nghiêm và không kết luận đó là cực tiểu.

#### C08. Kiểm tra hệ Newton và phần dư

- **Vai trò và mục tiêu:** Kiểm tra riêng mạch C; MT2.
- **Luận điểm trung tâm:** Chọn được hệ hợp lệ và kiểm tra nghiệm gần đúng là điều kiện áp dụng CG.
- **Ý chính:** Bài kiểm tra gồm độ cong, giảm chấn và một bước giải hệ.
- **Ví dụ/hình dự kiến:** Dữ kiện ma trận và bảng phần dư; lời giải trong ghi chú.
- **Hình thức hóa:** HT5–HT6.
- **Kết nối:** C07 tạo nghiệm gần đúng; D01 đặt bài toán khi không có toán tử Hessian.
- **Nguồn:** Ví dụ tự xây dựng dựa trên V6–V7.
- **Thời lượng:** 0,00 tiết lý thuyết + 0,12 tiết bài tập. Suy nghĩ, trình bày và chữa theo mục hoạt động dưới.
- **Ghi chú soạn:** Phân biệt điều kiện SPD với điều kiện ma trận khả nghịch; điểm đánh giá dành cho lý do, không chỉ đáp số.
- **Câu hỏi:** Cho $H=\operatorname{diag}(-1,2)$, $g=(-1,-1)^\top$. (a) Chọn $\lambda=0{,}5$ hoặc $2$ để $A=H+\lambda I\succ0$. (b) Với lựa chọn hợp lệ, chạy một bước CG từ $d_0=0$ để giải $Ad=-g$. (c) Ngưỡng phần dư tuyệt đối 0,1 đã đạt chưa?
- **Kiến thức được đo:** MT2: dịch trị riêng để tạo hệ xác định dương, một vòng CG và chuẩn phần dư; đã học ở C03–C07.
- **Đáp án/gợi ý:** Chọn λ=2, A=diag(1,4). α₀=2/5, d₁=(2/5,2/5), r₁=(3/5,−3/5); chuẩn phần dư √0,72≈0,8485>0,1 nên chưa đạt.
- **Tiêu chí đánh giá:** Chọn đúng và nêu trị riêng (1 ý); tính đúng bước và phần dư (2 ý); quyết định dừng đúng (1 ý).
- **Thời gian hoạt động:** Suy nghĩ 0,06 tiết; trình bày 0,02; chữa 0,04. Đã tính trong thời lượng trang.

### Mạch D. Xấp xỉ độ cong từ gradient

Chức năng: xấp xỉ độ cong từ gradient. Đầu vào: Chi phí cung cấp toán tử độ cong trong Newton–CG. Đầu ra: Cặp cát tuyến hợp lệ và hướng BFGS; nhu cầu xem các thành phần khác. Mục tiêu: MT2. Mạch học tập và ngoại lệ gộp được ghi trong storyboard. Thời lượng: 0,24 tiết lý thuyết, 0,12 tiết bài tập, gồm D05.

#### D01. Thông tin độ cong từ chênh lệch gradient

- **Vai trò và mục tiêu:** Nhu cầu và trực quan KN6; MT2.
- **Luận điểm trung tâm:** Chênh lệch gradient dọc một bước cho thông tin độ cong mà không tính Hessian.
- **Ý chính:** Với hai điểm $\theta,\theta^+$, đặt $s=\theta^+-\theta$, $y=\nabla F(\theta^+)-\nabla F(\theta)$. Trên hàm bậc hai, $y=Qs$. Một cặp $(s,y)$ chỉ đo tác động trên một hướng.
- **Ví dụ/hình dự kiến:** Hai điểm trên đường đồng mức và hai mũi tên gradient; mũi tên sai phân y được nối với s.
- **Hình thức hóa:** Phương trình cát tuyến cho xấp xỉ Hessian B: $Bs=y$; cho xấp xỉ nghịch đảo P: $Py=s$.
- **Kết nối:** C07 cần toán tử Hessian–vectơ; D01 thay đầu vào bằng hai gradient, D02 kiểm một cặp số.
- **Nguồn:** DL, §8.6.3; CM, tr. 5–9.
- **Thời lượng:** 0,05 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Dùng P cho xấp xỉ nghịch đảo để không nhầm Hessian H. Gradient trong cặp phải của cùng mục tiêu; nhiễu có thể phá điều kiện độ cong.

#### D02. Ví dụ cập nhật BFGS

- **Vai trò và mục tiêu:** Ví dụ KN6; MT2.
- **Luận điểm trung tâm:** Một cập nhật cát tuyến phải đồng thời khớp thông tin mới và giữ xác định dương.
- **Ý chính:** Cho $P_0=I$, $s=(1,0)^\top$, $y=(2,1)^\top$. Có $y^\top s=2>0$. Ma trận cập nhật $P_1=\begin{pmatrix}3/4&-1/2\\-1/2&1\end{pmatrix}$ thỏa $P_1y=s$ và xác định dương vì các định thức con đầu là 3/4 và 1/2.
- **Ví dụ/hình dự kiến:** Bảng kiểm hai điều kiện cát tuyến và xác định dương; đối chiếu P₀y=(2,1) với P₁y=(1,0).
- **Hình thức hóa:** Cặp dữ kiện lấy từ Q ở C01: Qs=y; ma trận P₁ chưa bằng Q⁻¹ vì chỉ dùng một hướng.
- **Kết nối:** D01 cho cặp cát tuyến; D02 xác lập hai điều kiện, D03 giải thích phép cập nhật bảo toàn chúng.
- **Nguồn:** Ví dụ V8 tự xây dựng; CM, tr. 12–16.
- **Thời lượng:** 0,04 tiết lý thuyết + 0,03 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Tính đầy đủ phép nhân và định thức; tránh tuyên bố một cặp đã xác định toàn bộ Hessian.

#### D03. Cập nhật nghịch đảo BFGS

- **Vai trò và mục tiêu:** Hình thức hóa KN6/HT7; MT2.
- **Luận điểm trung tâm:** BFGS bảo toàn xác định dương khi xấp xỉ hiện tại xác định dương và cặp mới có độ cong dương.
- **Ý chính:** Với $P=P^\top\succ0$, $y^\top s>0$, đặt $\rho=1/(y^\top s)$. Khi đó $P^+=(I-\rho sy^\top)P(I-\rho ys^\top)+\rho ss^\top$.
- **Ví dụ/hình dự kiến:** Ánh xạ từng s,y,ρ của D02 vào hai hạng công thức; chỉ một công thức trung tâm trên mặt trang.
- **Hình thức hóa:** HT7: $P^+y=s$ và $P^+\succ0$. Phác thảo: dạng toàn phương là tổng hai số không âm; nếu cả hai bằng 0 thì vectơ thử bằng 0.
- **Kết nối:** D02 đã kiểm số; D04 dùng P để tạo hướng và quyết định nhận hoặc bỏ cặp cập nhật.
- **Nguồn:** CM, tr. 12–16; DL, §8.6.3.
- **Thời lượng:** 0,08 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Phát biểu điều kiện trước công thức. Đây là cập nhật hạng hai, không dùng cách gọi hạng một trong ST tr.49. Không chứng minh tốc độ siêu tuyến tính.

#### D04. Thuật toán BFGS và bộ nhớ giới hạn

- **Vai trò và mục tiêu:** Ứng dụng KN6/HT7; MT2.
- **Luận điểm trung tâm:** Lưu ít cặp độ cong giảm bộ nhớ nhưng không loại bỏ nhu cầu kiểm tra bước và nhiễu.
- **Ý chính:** Đầu vào θ₀, P₀≻0, ngân sách T, ngưỡng gradient; tính g; đặt d=−Pg; tìm bước α; tính s=αd và y từ gradient mới; nhận cập nhật khi yᵀs đủ dương, nếu không bỏ cập nhật hoặc giảm chấn có quy tắc. BFGS lưu ma trận O(p²); BFGS với bộ nhớ giới hạn (L-BFGS) lưu m cặp, O(mp).
- **Ví dụ/hình dự kiến:** Sơ đồ so sánh Newton–CG cần Av với BFGS cần (s,y); một cặp ô bộ nhớ minh họa L-BFGS.
- **Hình thức hóa:** Dừng khi $\|\nabla F\|_2$ dưới ngưỡng hoặc hết ngân sách; tìm bước Wolfe cho hàm trơn và hướng giảm là một cách bảo đảm $y^\top s>0$.
- **Kết nối:** D03 cho phép cập nhật hợp lệ; E01 xem xét giới hạn mà chỉ đổi quy tắc cập nhật chưa xử lý.
- **Nguồn:** CM, tr. 17–23; DL, §8.6.3.
- **Thời lượng:** 0,07 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** L-BFGS là khái niệm hỗ trợ: giải thích đầu vào, chi phí, không triển khai đệ quy hai vòng trong tuyến chính. Với gradient lô nhỏ, cùng kiểm tra dấu chưa bảo đảm thông tin độ cong chính xác.

#### D05. Kiểm tra điều kiện BFGS

- **Vai trò và mục tiêu:** Kiểm tra riêng mạch D; MT2.
- **Luận điểm trung tâm:** Điều kiện độ cong quyết định tính hợp lệ của cập nhật.
- **Ý chính:** Kiểm cặp có thể nhận, rồi dùng ma trận đã biết để tạo hướng.
- **Ví dụ/hình dự kiến:** Hai cặp cùng s, khác y; không thêm khái niệm.
- **Hình thức hóa:** HT7 và hướng d=−Pg.
- **Kết nối:** D04 kết thúc nhóm cập nhật; E01 mở các thành phần còn lại của bài toán.
- **Nguồn:** Ví dụ V8 và phản ví dụ tự xây dựng.
- **Thời lượng:** 0,00 tiết lý thuyết + 0,09 tiết bài tập. Suy nghĩ, trình bày và chữa theo mục hoạt động dưới.
- **Ghi chú soạn:** Đáp án nhấn rằng điều kiện đủ bảo toàn SPD là một giả thiết cần kiểm, không tự đúng vì đã chạy một bước.
- **Câu hỏi:** Cho $s=(1,0)^\top$, hai sai phân gradient $y^{(1)}=(2,1)^\top$, $y^{(2)}=(-1,1)^\top$. Với $P_0=I$, cặp nào đáp ứng định lý bảo toàn xác định dương? Cho $P_1=\begin{pmatrix}3/4&-1/2\\-1/2&1\end{pmatrix}$ và $g=(1,0)^\top$, tính $d=-P_1g$ và $g^\top d$.
- **Kiến thức được đo:** MT2: kiểm điều kiện độ cong và tính hướng bằng xấp xỉ nghịch đảo; đã học ở D01–D04.
- **Đáp án/gợi ý:** Chỉ cặp 1 có $y^\top s=2>0$; cặp 2 có $y^\top s=-1$. Với gradient được cho, $P_1g=(3/4,-1/2)^\top$, $d=(-3/4,1/2)^\top$, $g^\top d=-3/4<0$.
- **Tiêu chí đánh giá:** Kiểm dấu hai cặp (2 ý); tính hướng và đạo hàm theo hướng (2 ý).
- **Thời gian hoạt động:** Suy nghĩ 0,04 tiết; trình bày 0,02; chữa 0,03. Đã tính trong thời lượng trang.

### Mạch E. Phép tính mô hình, khối biến và đầu ra

Chức năng: phép tính mô hình, khối biến và đầu ra. Đầu vào: Các giới hạn của việc chỉ thay bước. Đầu ra: Phân biệt BN, hạ theo khối, Polyak và đường truyền gradient. Mục tiêu: MT3. Mạch học tập và ngoại lệ gộp được ghi trong storyboard. Thời lượng: 0,38 tiết lý thuyết, 0,15 tiết bài tập, gồm E08.

#### E01. Các thành phần của quá trình huấn luyện

- **Vai trò và mục tiêu:** Nhu cầu và bản đồ KN7–KN10; MT3.
- **Luận điểm trung tâm:** Quy tắc cập nhật chỉ tác động lên một phần của quá trình huấn luyện.
- **Ý chính:** Sơ đồ đã xác lập gồm dữ liệu $\mathcal D$, mô hình $f_\theta$, mục tiêu $F$, điểm đầu $\theta_0$, quy tắc cập nhật/quỹ đạo và quy tắc trả về. Sau các cách đổi bước, ba thành phần được xét là phép tính mô hình, nhóm biến cập nhật và đầu ra. Thang đầu vào tầng ảnh hưởng độ nhạy theo tham số; cần xét phép tính tạo gradient trước khi chọn cách cập nhật.
- **Ví dụ/hình dự kiến:** Dùng lại sơ đồ dữ liệu và mô hình → mục tiêu cùng điểm đầu → quy tắc cập nhật và quỹ đạo → quy tắc trả về và đầu ra. Đánh dấu phép tính mô hình, khối biến và quy tắc trả về; giữ các nhãn còn lại để đối chiếu.
- **Hình thức hóa:** Gọi lại cơ sở thành phần đã xuất hiện ở A02; mô hình bước ở A04 chỉ cụ thể hóa một khâu. Không có định lý hội tụ chung cho các can thiệp này.
- **Kết nối:** D05 kết thúc thay bước; E02 xét đầu vào của các tầng trước khi có gradient.
- **Nguồn:** DL, §8.7, tr.313–323.
- **Thời lượng:** 0,03 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Giữ phân biệt tham số hóa với cập nhật. Các chiến lược có thể phối hợp nhưng hiệu quả cần kiểm định.

#### E02. Ví dụ chuẩn hóa theo lô

- **Vai trò và mục tiêu:** Nhu cầu, trực quan và ví dụ KN7; MT3.
- **Luận điểm trung tâm:** Giá trị sau chuẩn hóa phụ thuộc các mẫu cùng lô trong khi huấn luyện.
- **Ý chính:** Xét cùng một đặc trưng trong hai lô $a=(1,1,5,5)$ và $a+4=(5,5,9,9)$. Nhu cầu là đưa vị trí và thang của đặc trưng về quy ước chung trước phép tính tầng. Hai lô có trung bình 3 và 7, cùng phương sai 4; trừ trung bình và chia độ lệch chuẩn đều cho $(-1,-1,1,1)$ trong giới hạn $\varepsilon\to0$. Với $\gamma=2$, $\beta=1$, cả hai cho $z=(-1,-1,3,3)$.
- **Ví dụ/hình dự kiến:** Hai trục số cho hai lô trước chuẩn hóa và một trục chung sau chuẩn hóa. Cùng giá trị 5 cho đầu ra gần 3 ở lô thứ nhất và gần −1 ở lô thứ hai: dịch chuyển chung bị triệt tiêu, nhưng đầu ra của một mẫu còn phụ thuộc lô.
- **Hình thức hóa:** Ví dụ giới hạn ε→0, không phải khuyến nghị đặt ε=0 khi triển khai.
- **Kết nối:** E01 xác định phép tính mô hình; E03 tổng quát hóa và phân biệt chế độ huấn luyện/suy luận.
- **Nguồn:** DL, §8.7.1; BN, thuật toán 1; ví dụ V9 tự xây dựng.
- **Thời lượng:** 0,04 tiết lý thuyết + 0,02 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Đơn vị của đầu ra đổi theo γ,β. So sánh hai lô làm rõ vì sao mô hình huấn luyện phụ thuộc lô. Quan hệ kiểm được ở đây là tính bất biến với dịch chuyển chung của lô và sự phụ thuộc ngữ cảnh lô; không suy ra luôn cải thiện điều kiện hoặc tốc độ hội tụ.

#### E03. Chuẩn hóa theo lô

- **Vai trò và mục tiêu:** Hình thức hóa và ứng dụng KN7/HT8; MT3.
- **Luận điểm trung tâm:** Chuẩn hóa theo lô dùng thống kê lô khi học và thống kê cố định khi suy luận.
- **Ý chính:** Chuẩn hóa theo lô (batch normalization, BN): với aᵢ của một đặc trưng trong lô cỡ m, $\mu_\mathcal B=m^{-1}\sum_i a_i$, $\sigma_\mathcal B^2=m^{-1}\sum_i(a_i-\mu_\mathcal B)^2$, $\widehat a_i=(a_i-\mu_\mathcal B)/\sqrt{\sigma_\mathcal B^2+\varepsilon}$, $z_i=\gamma\widehat a_i+\beta$.
- **Ví dụ/hình dự kiến:** Hai nhánh “huấn luyện: μ_B,σ²_B” và “suy luận: μ_run,σ²_run cố định”; áp dụng vào một tầng ẩn.
- **Hình thức hóa:** HT8: ε>0; γ,β là tham số học. Phương sai của giá trị chuẩn hóa là σ²/(σ²+ε), không đúng bằng 1 khi ε>0.
- **Kết nối:** E02 cho số; E04 xét can thiệp nhóm biến thay vì phép tính tầng.
- **Nguồn:** DL, §8.7.1, (8.34)–(8.37); BN, §3.1.
- **Thời lượng:** 0,07 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Khi BN ở chế độ học, dùng mục tiêu kỳ vọng theo lô $F_{BN}(θ)=\mathbb E_\mathcal B[L_\mathcal B(θ)]$; không còn giả định mỗi đầu ra chỉ phụ thuộc một mẫu như A04. Không trình bày “giảm dịch chuyển phân phối nội bộ” như định lý cơ chế.

#### E04. Ví dụ hạ theo tọa độ

- **Vai trò và mục tiêu:** Nhu cầu, trực quan và ví dụ KN8; MT3.
- **Luận điểm trung tâm:** Giữ một khối cố định có thể tạo bài toán con dễ giải.
- **Ý chính:** Cho $F(u,v)=\frac12[(u+v-2)^2+u^2+v^2]$. Từ (0,0), tối thiểu theo u với v=0 cho u=1; rồi tối thiểu theo v với u=1 cho v=1/2. F giảm từ 2 xuống 1 rồi 3/4.
- **Ví dụ/hình dự kiến:** Elip trên trục u,v; đường gấp khúc (0,0)→(1,0)→(1,1/2). Nhãn “giữ v”, “giữ u”.
- **Hình thức hóa:** $\partial_uF=2u+v-2$, $\partial_vF=u+2v-2$; nghiệm bài toán con u=(2−v)/2, v=(2−u)/2.
- **Kết nối:** E03 thay phép tính mạng; E04 chuyển sang tập biến cập nhật, E05 nêu quy trình và giới hạn.
- **Nguồn:** DL, §8.7.2; ví dụ V10 tự xây dựng.
- **Thời lượng:** 0,04 tiết lý thuyết + 0,03 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Nghiệm bài toán đầy đủ là (2/3,2/3); một lượt qua hai tọa độ chưa đạt nghiệm.

#### E05. Hạ theo tọa độ và theo khối

- **Vai trò và mục tiêu:** Hình thức hóa và ứng dụng KN8/HT9; MT3.
- **Luận điểm trung tâm:** Giảm của từng bài toán con chỉ bảo đảm mục tiêu không tăng trong điều kiện đã nêu.
- **Ý chính:** Chia θ=(θ^(1),…,θ^(K)). Chọn khối k, giữ các khối còn lại, giải hoặc giảm mục tiêu theo khối k. Dùng khối vừa cập nhật khi chuyển sang khối sau. Đầu ra là vectơ ghép sau một lượt hoặc sau nhiều lượt.
- **Ví dụ/hình dự kiến:** Ứng dụng hai nhóm hệ số của mô hình tuyến tính; dùng lại F(u,v). Một lượt nữa cho (3/4,5/8).
- **Hình thức hóa:** HT9: nếu khối cũ khả thi và bài toán con được giải không tệ hơn khối cũ thì $F(θ^+)\le F(θ)$. Dừng khi thay đổi tương đối mục tiêu/khối dưới ngưỡng hoặc hết ngân sách.
- **Kết nối:** E04 cho một lượt; E06 xét cách chọn đầu ra từ các điểm đã sinh.
- **Nguồn:** DL, §8.7.2, (8.38).
- **Thời lượng:** 0,06 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Chứng minh không tăng bằng tính khả thi của khối cũ. Không suy ra hội tụ đến cực tiểu cục bộ hay toàn cục cho mạng sâu nếu thiếu giả thiết.

#### E06. Trung bình Polyak

- **Vai trò và mục tiêu:** Nhu cầu, trực quan, ví dụ và hình thức hóa KN9; MT3.
- **Luận điểm trung tâm:** Trung bình tham số thay đầu ra của quỹ đạo, có thể giảm dao động trong cùng miền nghiệm.
- **Ý chính:** Với $F(\theta)=(\theta-2)^2/2$ và bốn điểm $1;3;1{,}5;2{,}5$, trung bình bằng 2 và $F(2)=0$. Định nghĩa $\bar\theta_T=T^{-1}\sum_{t=1}^T\theta_t$.
- **Ví dụ/hình dự kiến:** Trục tham số với bốn điểm và trung bình; hình phụ phản ví dụ F(θ)=(θ²−1)²: hai điểm −1,1 có mất mát 0, trung bình 0 có mất mát 1.
- **Hình thức hóa:** HT10: có thể tính trực tuyến $\bar\theta_t=\bar\theta_{t-1}+(\theta_t-\bar\theta_{t-1})/t$; trạng thái O(p).
- **Kết nối:** E05 sinh quỹ đạo; E06 thay quy tắc trả về; E07 xét yếu tố trước cả gradient là kiến trúc.
- **Nguồn:** DL, §8.7.3, tr. 318, đoạn định nghĩa trung bình đều không đánh số; ví dụ V11 tự xây dựng.
- **Thời lượng:** 0,07 tiết lý thuyết + 0,03 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Phát biểu rõ các số bằng dấu chấm phẩy khi trình bày. Trung bình tham số khác trung bình dự đoán; không gọi là momentum, không bảo đảm cải thiện cho mọi mạng phi lồi.

#### E07. Thiết kế đường truyền gradient

- **Vai trò và mục tiêu:** Khái niệm hỗ trợ KN10; MT3.
- **Luận điểm trung tâm:** Kiến trúc quyết định các tích đạo hàm mà thuật toán tối ưu phải sử dụng.
- **Ý chính:** Trong ví dụ vô hướng, $h_0,\ldots,h_5\in\mathbb R$; $h_0$ là biểu diễn đầu vào khối năm lớp và $h_5$ là đầu ra. Với $h_l=0{,}1h_{l-1}$, tích đạo hàm qua khối là $10^{-5}$. Với nối tắt $h_l=h_{l-1}+0{,}1h_{l-1}$, tích bằng $1{,}1^5=1{,}61051$. Gọi $\mathcal L$ là mất mát vô hướng của mạng; các tích trên là hệ số truyền ngược qua khối.
- **Ví dụ/hình dự kiến:** Hai chuỗi năm nút, chuỗi thứ hai có cạnh đồng nhất; mọi nhãn ghi hệ số đạo hàm. Hình tự dựng, không dùng so sánh thực nghiệm.
- **Hình thức hóa:** Quy tắc dây chuyền: $\frac{\partial\mathcal L}{\partial h_0}=\frac{\partial\mathcal L}{\partial h_5}\prod_{l=1}^5\frac{\partial h_l}{\partial h_{l-1}}$. Với tham số $w$ của tầng trước chỉ tác động qua $h_0$, $\frac{\partial\mathcal L}{\partial w}=\frac{\partial\mathcal L}{\partial h_0}\frac{\partial h_0}{\partial w}$.
- **Kết nối:** E06 thay đầu ra; E07 đặt giới hạn mà chỉ đổi thuật toán cập nhật chưa xử lý; F01 xét cách xây điểm đầu qua nhiệm vụ phụ.
- **Nguồn:** DL, §8.7.5, tr.322–323; ví dụ V12 tự xây dựng.
- **Thời lượng:** 0,07 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Chu trình rút gọn do đây là khái niệm hỗ trợ đã có quy tắc dây chuyền. Không suy ra nối tắt luôn chặn gradient; 1,1^L vẫn có thể tăng theo L. Tích đạo hàm là một thừa số của gradient tham số; các đạo hàm của mất mát và biểu diễn đầu khối còn tham gia. Ví dụ không chứng minh gradient tốt hơn cho mọi mạng.

#### E08. Kiểm tra can thiệp trong huấn luyện

- **Vai trò và mục tiêu:** Kiểm tra riêng mạch E; MT3.
- **Luận điểm trung tâm:** Mỗi can thiệp cần được kiểm bằng đại lượng mà nó thực sự thay đổi.
- **Ý chính:** Một phép tính độc lập về chuẩn hóa; ba đối chiếu từ kết quả trung gian để giải thích điều kiện và giới hạn.
- **Ví dụ/hình dự kiến:** Dữ kiện một đặc trưng trong lô bốn mẫu, kết quả cập nhật theo khối và trung bình hai nghiệm; đáp án trong ghi chú.
- **Hình thức hóa:** HT8–HT10 và quy tắc dây chuyền E07.
- **Kết nối:** E02–E07 cho công cụ; F01 mở các thay đổi theo giai đoạn.
- **Nguồn:** Ví dụ tự xây dựng.
- **Thời lượng:** 0,00 tiết lý thuyết + 0,07 tiết bài tập. Suy nghĩ, trình bày và chữa theo mục hoạt động dưới.
- **Ghi chú soạn:** Không chỉ hỏi tên chiến lược; các bài kiểm tra đầu ra hoặc điều kiện dùng.
- **Câu hỏi:** (a) Một đặc trưng trong lô $a=(1,1,5,5)$, $\varepsilon=1$, $\gamma=1$, $\beta=0$: tính phương sai sau chuẩn hóa. (b) Cho $F(u,v)=[(u+v-2)^2+u^2+v^2]/2$. Từ $(1,1/2)$, đã tính được điểm sau một lượt là $(3/4,5/8)$ bằng tối thiểu lần lượt theo $u$ rồi $v$. Nêu điều kiện bảo đảm $F$ không tăng, không cần tính lại lượt. (c) Với $F(\theta)=(\theta^2-1)^2$, hai nghiệm $-1,1$ có trung bình 0 và $F(0)=1$. Kết quả này bác bỏ bảo đảm nào của trung bình tham số? (d) Cho hệ số truyền ngược qua khối $1{,}1^L\to\infty$ khi độ sâu $L\to\infty$. Nối tắt có bảo đảm hệ số này bị chặn với mọi độ sâu không?
- **Kiến thức được đo:** MT3: phương sai sau BN; tính không tăng theo khối; giới hạn trung bình tham số và hệ số truyền ngược; đã học ở E02–E07.
- **Đáp án/gợi ý:** (a) Trung bình 3, phương sai trước chuẩn hóa 4, nên phương sai sau là $4/(4+1)=4/5$. (b) Khối cũ khả thi và mỗi lần cập nhật giải bài toán con không tệ hơn điểm cũ. (c) Trung bình các nghiệm của hàm phi lồi không nhất thiết còn là nghiệm hoặc cho mất mát nhỏ hơn. (d) Không; hệ số đã cho tăng không bị chặn. Đây chỉ là một thừa số của gradient mất mát.
- **Tiêu chí đánh giá:** Tính phương sai đúng và dùng mẫu số gồm epsilon (1 ý); nêu đủ điều kiện không tăng (1 ý); giải thích giới hạn trung bình tham số và nối tắt từ dữ kiện đã cho (2 ý).
- **Thời gian hoạt động:** Suy nghĩ 0,04 tiết cho phép tính (a) và ba đối chiếu; trình bày 0,01; chữa điều kiện và giới hạn 0,02. Đã tính trong thời lượng trang.

### Mạch F. Huấn luyện theo giai đoạn

Chức năng: huấn luyện theo giai đoạn. Đầu vào: Mô hình, mục tiêu, dữ liệu và điểm đầu của bài toán. Đầu ra: Phân biệt chuyển tham số, họ mục tiêu, lịch phân phối; điều kiện mục tiêu đích. Mục tiêu: MT3. Mạch học tập và ngoại lệ gộp được ghi trong storyboard. Thời lượng: 0,30 tiết lý thuyết, 0,13 tiết bài tập, gồm F07.

#### F01. Khởi tạo qua nhiệm vụ có nhãn

- **Vai trò và mục tiêu:** Nhu cầu, trực quan và ví dụ KN11; MT3.
- **Luận điểm trung tâm:** Một nhiệm vụ phụ có nhãn có thể cung cấp tham số ban đầu cho mô hình đích.
- **Ý chính:** Nhiệm vụ phụ có x=1,y=2, mô hình f_a(x)=ax cho a=2. Mô hình đích f_(a,b)(x)=bax, nhãn đích y=3, F(a,b)=(ab−3)²/2. Chuyển a=2, khởi tạo b=1 cho F=1/2 và gradient (−1,−2). Tại điểm đầu $(a,b)=(0,0)$, $\nabla F=((ab-3)b,(ab-3)a)=(0,0)$ nên gradient chính xác không tạo bước. Điểm chuyển $(2,1)$ có gradient khác 0; hai điểm đầu tạo quỹ đạo khác nhau.
- **Ví dụ/hình dự kiến:** Sơ đồ mô hình nông học có nhãn → giữ a, thêm b → tối ưu toàn bộ. Ghi rõ nhãn phụ và nhãn đích khác nhau.
- **Hình thức hóa:** Một bước η=0,1 cho (a,b)=(2,1;1,2), ab=2,52, F=0,1152; dùng dấu chấm phẩy để phân tách hai tọa độ thập phân.
- **Kết nối:** E07 cho vai trò kiến trúc; F01 dùng kiến trúc tăng dần để xây điểm đầu, F02 tổng quát hóa quy trình.
- **Nguồn:** DL, §8.7.4, Hình 8.7; ví dụ V13 tự xây dựng.
- **Thời lượng:** 0,04 tiết lý thuyết + 0,02 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Không giả định sinh viên đã học chuyển giao. Ví dụ mạng tuyến tính để tính tay, không phải bằng chứng về độ chính xác mạng sâu. Đối chiếu với điểm đầu bằng 0 chỉ tạo nhu cầu chọn khởi tạo có tín hiệu gradient trong ví dụ; không chứng minh tiền huấn luyện hơn mọi khởi tạo ngẫu nhiên.

#### F02. Tiền huấn luyện có giám sát

- **Vai trò và mục tiêu:** Hình thức hóa và ứng dụng KN11/HT11; MT3.
- **Luận điểm trung tâm:** Tiền huấn luyện dùng nghiệm nhiệm vụ phụ làm khởi tạo, rồi tinh chỉnh mục tiêu đích.
- **Ý chính:** Đầu vào nhiệm vụ phụ có nhãn, ánh xạ tham số sang mô hình đích và dữ liệu đích. Học tham số tầng nông; giữ biểu diễn, thêm tầng và bộ dự đoán; khi đủ tầng, tinh chỉnh các tham số đã chọn bằng mục tiêu đích.
- **Ví dụ/hình dự kiến:** Ba khung của F01 với mũi tên chuyển tham số a, không chuyển nhãn phụ vào mất mát đích.
- **Hình thức hóa:** HT11: θ₀=T(θ_aux,ξ), trong đó T là phép chuyển đã chỉ định, ξ khởi tạo phần mới. F đích được giữ khi tinh chỉnh.
- **Kết nối:** F01 cho phép chuyển cụ thể; F03 xét trường hợp giữ không gian tham số nhưng thay mục tiêu theo giai đoạn.
- **Nguồn:** DL, §8.7.4, tr.319–321.
- **Thời lượng:** 0,05 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Chỉ định khối được tinh chỉnh và tiêu chí chọn điểm kiểm định. Tiền huấn luyện không bảo đảm tốt hơn khởi tạo khác; không đồng nhất mọi tiền huấn luyện với học từng tầng.

#### F03. Ví dụ họ mục tiêu tiếp diễn

- **Vai trò và mục tiêu:** Nhu cầu, trực quan và ví dụ KN12; MT3.
- **Luận điểm trung tâm:** Thay độ khó của mục tiêu có thể tạo một chuỗi bài toán trên cùng tham số.
- **Ý chính:** Dùng F₀(θ)=(θ²−1)² của E06. Thêm phạt λθ²: với λ=3, hàm có cực tiểu duy nhất 0; với λ=1,5, các cực tiểu là ±1/2; với λ=0, các cực tiểu là ±1.
- **Ví dụ/hình dự kiến:** Ba đồ thị trên cùng trục θ và Fλ, ghi λ=3;1,5;0. Đánh dấu các nghiệm; dữ liệu là phép tính hàm, không phải đường học thực nghiệm.
- **Hình thức hóa:** Họ tự xây dựng $F_\lambda(θ)=(θ^2-1)^2+\lambda θ^2$; đây là thay mục tiêu bằng phạt, không gọi là phép chập Gauss.
- **Kết nối:** F02 thay điểm đầu; F03 cho mục tiêu đổi có tham số λ, F04 kiểm điều kiện và giới hạn truyền nghiệm.
- **Nguồn:** DL, §8.7.6; ví dụ V14 tự xây dựng.
- **Thời lượng:** 0,04 tiết lý thuyết + 0,02 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Bậc bốn vẫn dùng đạo hàm một biến đã học. Các nghiệm được kiểm đại số ở F04; không đưa xác suất Gaussian làm tiên quyết mới.

#### F04. Phương pháp tiếp diễn

- **Vai trò và mục tiêu:** Hình thức hóa và ứng dụng KN12/HT12; MT3.
- **Luận điểm trung tâm:** Nghiệm giai đoạn trước là khởi tạo cho giai đoạn sau, nhưng điểm dừng có thể tồn tại suốt chuỗi.
- **Ý chính:** Phương pháp tiếp diễn (continuation) chọn Fλ₀,…,Fλ_K=F đích; gần giải từng bài toán và chuyển nghiệm làm điểm đầu. Với V14, $F_\lambda'=4θ^3+(2\lambda-4)θ$, $F_\lambda''=12θ^2+2\lambda-4$.
- **Ví dụ/hình dự kiến:** Kiểm λ=3,1,5,0 bằng dấu đạo hàm hai tại các điểm dừng. Vẽ đường θ=0 qua cả ba đồ thị.
- **Hình thức hóa:** HT12: $\theta_{k,0}=\theta_{k-1,out}$; chỉ số k là giai đoạn. Trong V14, θ=0 luôn có gradient 0, nên gradient chính xác bắt đầu từ 0 không tự chọn nhánh ±1/2.
- **Kết nối:** F03 tạo họ mục tiêu; F04 nêu giới hạn; F05 thay phân phối dữ liệu để tạo họ mục tiêu theo cơ chế khác.
- **Nguồn:** DL, §8.7.6, tr.323–325; ví dụ tự xây dựng.
- **Thời lượng:** 0,06 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Cần phá đối xứng hoặc chọn nhánh ở ví dụ nếu muốn rời 0. Không đưa bảo đảm nghiệm toàn cục. Tiêu chí dừng nội bộ và lịch λ là đầu vào thiết kế, phải nêu trước thực nghiệm.

#### F05. Học theo chương trình

- **Vai trò và mục tiêu:** Nhu cầu, trực quan, ví dụ và hình thức hóa KN13; MT3.
- **Luận điểm trung tâm:** Thay xác suất lấy mẫu theo giai đoạn làm thay mục tiêu trung bình đang tối ưu.
- **Ý chính:** Học theo chương trình (curriculum learning): hai mẫu E=(1,1), H=(3,1), fθ(x)=θx; ℓ_E=(θ−1)²/2, ℓ_H=(3θ−1)²/2. Quy ước H nhạy hơn vì độ cong 9 so với 1. Nếu xác suất H là q, $F_q=(1-q)\ell_E+q\ell_H$.
- **Ví dụ/hình dự kiến:** Bảng q=0;1/4;1/2 với xác suất hai mẫu và nghiệm 1;1/2;2/5. Trục đường nghiệm theo q; ghi phân phối đích q=1/2.
- **Hình thức hóa:** HT13: $F_q'=(1+8q)θ-(1+2q)$, $θ_q^*=(1+2q)/(1+8q)$. Các bước dùng nghiệm trước làm điểm đầu hoặc đổi phân phối trong quá trình học.
- **Kết nối:** F04 thay hàm trực tiếp; F05 thay trọng số mẫu, F06 so sánh các can thiệp theo đúng dữ kiện.
- **Nguồn:** DL, §8.7.6; CU, §2–3; ví dụ V15 tự xây dựng.
- **Thời lượng:** 0,06 tiết lý thuyết + 0,02 tiết bài tập. Giải thích kết hợp tính tay và đối chiếu số; phần tính tay được tính vào bài tập.
- **Ghi chú soạn:** Quy ước độ khó chỉ phục vụ ví dụ. Nếu giữ q=0 thì giải mục tiêu khác phân phối đích; không khẳng định dễ đến khó luôn nhanh hơn lấy mẫu đều.

#### F06. Điều kiện đánh giá huấn luyện theo giai đoạn

- **Vai trò và mục tiêu:** Ứng dụng KN11–KN13; MT3.
- **Luận điểm trung tâm:** So sánh chiến lược đòi hỏi cùng mục tiêu đích và công bố chi phí của các giai đoạn.
- **Ý chính:** Ba hồ sơ: chuyển tham số đã học từ nhiệm vụ có nhãn; giảm λ của phạt về 0; tăng q về phân phối đích. Sản phẩm mỗi hồ sơ gồm đối tượng thay, dữ liệu dùng, tiêu chí chuyển giai đoạn, mục tiêu cuối và ngân sách tính cả giai đoạn phụ.
- **Ví dụ/hình dự kiến:** Bảng ba cột ghi θ₀, Fλ, Pq; cùng hàng cuối “đánh giá trên dữ liệu đích tách riêng”.
- **Hình thức hóa:** Ứng dụng trực tiếp HT11–HT13; không có định lý ưu thế chung.
- **Kết nối:** F02,F04,F05 cung cấp cơ chế; F07 kiểm áp dụng bằng số, G01 dùng hồ sơ để lựa chọn có điều kiện.
- **Nguồn:** DL, §8.7.4 và §8.7.6; CU, §2–3.
- **Thời lượng:** 0,05 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Ngân sách và tập đánh giá phải giữ để không nhầm lợi ích với tăng tài nguyên hoặc dùng dữ liệu đánh giá trong huấn luyện.

#### F07. Kiểm tra huấn luyện theo giai đoạn

- **Vai trò và mục tiêu:** Kiểm tra riêng mạch F; MT3.
- **Luận điểm trung tâm:** Phải xác định được điểm đầu, mục tiêu đang giải và mục tiêu cuối.
- **Ý chính:** Tính độc lập một bước tinh chỉnh; đối chiếu điểm dừng và phân phối đích bằng đạo hàm, nghiệm đã cho.
- **Ví dụ/hình dự kiến:** Dữ kiện lấy từ F01,F03,F05 để không thêm ký hiệu.
- **Hình thức hóa:** HT11–HT13.
- **Kết nối:** F06 đặt điều kiện đánh giá; G01 tổng hợp theo giới hạn đã chứng minh.
- **Nguồn:** Ví dụ V13–V15 tự xây dựng.
- **Thời lượng:** 0,00 tiết lý thuyết + 0,07 tiết bài tập. Suy nghĩ, trình bày và chữa theo mục hoạt động dưới.
- **Ghi chú soạn:** Đáp án không chỉ nhận dạng tên; yêu cầu giải thích điều gì thay đổi và điều gì chưa được bảo đảm.
- **Câu hỏi:** (a) Mục tiêu đích $F(a,b)=(ab-3)^2/2$ nhận $a=2$ từ nhiệm vụ phụ và $b=1$. Tính một bước gradient đồng thời với $\eta=0{,}1$ và giá trị $F$ mới. (b) Cho $F_\lambda(\theta)=(\theta^2-1)^2+\lambda\theta^2$ và $F_\lambda^{\prime}(\theta)=4\theta^3+(2\lambda-4)\theta$. Khi chuyển $\lambda=3$ sang $1{,}5$ và bắt đầu tại $\theta=0$, dùng đạo hàm đã cho để xét gradient chính xác có rời 0 không. (c) Cho $F_q(\theta)=(1-q)(\theta-1)^2/2+q(3\theta-1)^2/2$, với $q$ là xác suất lấy mẫu thứ hai. Đã tính được $\theta_{1/4}^*=1/2$, $\theta_{1/2}^*=2/5$. Đối chiếu hai nghiệm để giải thích dừng ở $q=1/4$ đã giải đúng phân phối đích đều $q=1/2$ hay chưa; không cần tính lại nghiệm.
- **Kiến thức được đo:** MT3: tinh chỉnh mục tiêu đích, điểm dừng của họ tiếp diễn và nghiệm theo phân phối; đã học ở F01–F06.
- **Đáp án/gợi ý:** (a) (a,b)=(2,1;1,2), F=0,1152. (b) Không vì Fλ′(0)=0 với mọi λ. (c) Nghiệm lần lượt 1/2 và 2/5; q=1/4 còn khác mục tiêu đích q=1/2.
- **Tiêu chí đánh giá:** Tính đúng gradient, cập nhật đồng thời và mất mát mới (1 nhóm ý); dùng đạo hàm đã cho để giải thích mắc điểm dừng (1 ý); phân biệt hai mục tiêu từ hai nghiệm và phân phối (1 ý).
- **Thời gian hoạt động:** Suy nghĩ 0,04 tiết cho bước tinh chỉnh và hai đối chiếu; trình bày 0,01; chữa điểm dừng và mục tiêu đích 0,02. Đã tính trong thời lượng trang.

### Mạch G. Lựa chọn và đánh giá phương pháp

Chức năng: lựa chọn và đánh giá phương pháp. Đầu vào: Kết quả và giới hạn của sáu mạch trước. Đầu ra: Phương án có dữ kiện, điều kiện áp dụng và phép kiểm. Mục tiêu: MT1–MT3. Mạch học tập và ngoại lệ gộp được ghi trong storyboard. Thời lượng: 0,10 tiết lý thuyết, 0,10 tiết bài tập, gồm G02.

#### G01. Lựa chọn phương pháp theo điều kiện bài toán

- **Vai trò và mục tiêu:** Tổng hợp kết quả; MT1–MT3.
- **Luận điểm trung tâm:** Mỗi phương pháp đáp ứng một loại thông tin hoặc thay một thành phần huấn luyện.
- **Ý chính:** Gradient và bộ nhớ O(p): xét phương pháp thích ứng. Có toán tử độ cong SPD: Newton–CG. Có gradient đủ ổn định và cặp độ cong dương: BFGS/L-BFGS. Khó khăn thuộc phép tính, nhóm biến, quỹ đạo hoặc giai đoạn: chọn can thiệp tương ứng và kiểm bằng mục tiêu đích.
- **Ví dụ/hình dự kiến:** Bảng bốn cột: dữ kiện; cơ chế; giả thiết; phép kiểm. Không xếp hạng thuật toán chung. Gọi lại sơ đồ mở bài với cùng nhãn: dữ liệu/mô hình, mục tiêu/điểm đầu, quy tắc cập nhật/quỹ đạo, quy tắc trả về/đầu ra. Mỗi hàng của bảng chỉ đúng thành phần được thay và phép kiểm tương ứng.
- **Hình thức hóa:** Kế thừa HT1–HT13; tiêu chí chọn là điều kiện quan sát và nguồn lực, chưa đủ để suy hiệu quả thực nghiệm.
- **Kết nối:** F07 đã phân biệt các giai đoạn; G02 buộc phối hợp ba chuẩn đầu ra trong một tình huống.
- **Nguồn:** DL, §8.5.4 và §§8.6–8.7; tổng hợp sư phạm.
- **Thời lượng:** 0,06 tiết lý thuyết + 0,00 tiết bài tập. Giải thích và đối chiếu.
- **Ghi chú soạn:** Trở lại V1: sửa thang bước, dùng độ cong, hoặc thay biểu diễn là quyết định khác nhau; cần nêu chính xác đại lượng bị thay.

#### G02. Kiểm tra lựa chọn phối hợp

- **Vai trò và mục tiêu:** Kiểm tra riêng mạch G và tổng hợp; MT1–MT3.
- **Luận điểm trung tâm:** Một phương án huấn luyện phải gắn cơ chế với phép kiểm và giới hạn.
- **Ý chính:** Tình huống hai mô hình và một lịch dữ liệu; sản phẩm là bảng lựa chọn kèm điều kiện.
- **Ví dụ/hình dự kiến:** Phiếu nhóm ba hàng, mỗi hàng có dữ kiện, phương pháp, phép kiểm; không yêu cầu viết mã.
- **Hình thức hóa:** HT2–HT13, không dùng kiến thức ngoài tuyến.
- **Kết nối:** G01 cung cấp tiêu chí; G03 chỉ tài liệu để đối chiếu sau bài.
- **Nguồn:** Tình huống V16 tự xây dựng.
- **Thời lượng:** 0,00 tiết lý thuyết + 0,10 tiết bài tập. Suy nghĩ, trình bày và chữa theo mục hoạt động dưới.
- **Ghi chú soạn:** Đây là bài phối hợp có sản phẩm riêng nên giữ tại kết luận; không mở mạch thực hành thứ tám. Câu trả lời khác đáp án vẫn đạt nếu đúng điều kiện và lý do.
- **Câu hỏi:** (a) Mô hình $p=10^6$ chỉ cung cấp gradient lô nhỏ, ngân sách trạng thái phụ $\le4p$ số thực, không có toán tử Hessian. Đề xuất một phương pháp cập nhật và nêu điều chưa thể bảo đảm. (b) Mô hình trơn $p=100$ có toán tử $A=H+\lambda I\succ0$ và gradient đầy đủ $g$; đề xuất cách tìm $d$, phép kiểm giải hệ và kiểm hướng trước bước ngoài, kể cả trường hợp $g=0$. (c) Xét $F_q(\theta)=(1-q)(\theta-1)^2/2+q(3\theta-1)^2/2$, với $q$ là xác suất lấy mẫu $H=(3,1)$, mẫu còn lại $E=(1,1)$. Lịch dừng ở $q=1/4$ nhưng phân phối đích có $q=1/2$: cần sửa điều gì; trung bình tham số có tự sửa sai mục tiêu này không?
- **Kiến thức được đo:** MT1–MT3: đối chiếu bộ nhớ, giả thiết toán tử, phần dư, dấu hướng và phân phối đích; kết hợp B–F.
- **Đáp án/gợi ý:** (a) Adam dùng hai vectơ trạng thái hoặc AdaGrad/RMSProp dùng một, đáp ứng ngân sách; không có bảo đảm giảm $F$ từng bước. (b) Nếu $g=0$, dừng để kiểm điểm dừng. Nếu $g\ne0$, dùng CG từ $d_0=0$ giải $Ad=-g$, kiểm phần dư và ngân sách; kiểm $g^\top d<0$ trước tìm bước ngoài. Nếu kiểm hướng không đạt, siết dung sai/giải lại hoặc dùng $-g$ kèm tìm bước. (c) Đưa lịch tới $q=1/2$ và đánh giá mục tiêu đích; trung bình tham số không tự thay phân phối đích.
- **Tiêu chí đánh giá:** Mỗi hàng phải nêu cơ chế, điều kiện và phép kiểm (3 nhóm ý); không chấp nhận “Adam luôn tốt nhất” hoặc “CG dùng được với mọi Hessian”.
- **Thời gian hoạt động:** Làm nhóm 0,05 tiết; trình bày 0,02; đối chiếu 0,03. Đã tính trong thời lượng trang.

#### G03. Tài liệu đối chiếu

- **Vai trò và mục tiêu:** Kết thúc và truy nguyên; MT1–MT3.
- **Luận điểm trung tâm:** Các bảo đảm và biến thể cần được tra theo đúng giả thiết của nguồn.
- **Ý chính:** Goodfellow, Bengio, Courville (2016), Chương 8 §§8.5–8.7; Duchi và cộng sự (2011); Kingma và Ba (2015); Martens (2010); Ioffe và Szegedy (2015); Bengio và cộng sự (2009). Tài liệu đại học bổ sung: Stanford CS231n 2017, Toronto Lecture 6 2012, CMU 10-725 2019.
- **Ví dụ/hình dự kiến:** Không cần hình; danh mục tác giả–năm–mục, đường dẫn trong ghi chú hoặc tài liệu kèm.
- **Hình thức hóa:** Không đưa kết quả mới.
- **Kết nối:** G02 hoàn tất minh chứng; nguồn phục vụ kiểm công thức và đọc giới hạn.
- **Nguồn:** Danh mục đầy đủ trong phần Phân tích nguồn và thiết kế nội dung, mục 2–3.
- **Thời lượng:** 0,04 tiết lý thuyết + 0,00 tiết bài tập. Đối chiếu nhóm kết quả với nguồn và vị trí đọc tiếp để kiểm giả thiết.
- **Ghi chú soạn:** Chỉ hiện tài liệu đã đọc; phần chính giữ ngắn, URL đầy đủ trong ghi chú. Bản dàn bài chưa đồng bộ HTML hiện có. Nguồn cho Newton: Boyd, Vandenberghe (2004), Convex Optimization, §9.5.1–9.5.3, tr. 484–489, https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf. Nguồn truy hồi CG: Shewchuk (1994), An Introduction to the Conjugate Gradient Method Without the Agonizing Pain, CMU, §8 (45)–(49), tr. in 32; Phụ lục B2, tr. in 50, https://www.cs.cmu.edu/~quake-papers/painless-conjugate-gradient.pdf. Danh mục hiển thị giữ ngắn; các vị trí chi tiết thuộc ghi chú tài liệu.

## Tự kiểm và giới hạn

MT1 được dạy ở B01–B08 và kiểm ở B09; MT2 ở C01–C07/D01–D04, kiểm C08/D05; MT3 ở E02–E07/F01–F06, kiểm E08/F07. A05 kiểm đầu vào của các thuật toán; G02 kiểm phối hợp cả ba mục tiêu. Không có câu hỏi riêng nào dùng thuật toán chưa được thiết lập trong tuyến.

Các ví dụ, công thức, chỉ số và tổng thời lượng đã được tác tử soạn kiểm lại; các sửa sớm của điều phối viên gồm phân biệt gradient đầy đủ/ngẫu nhiên, tốc độ học hiệu dụng/độ dài bước, điều kiện hiệu chỉnh moment, nguồn CG và pha hội tụ Newton. Phạm vi kiểm tra độc lập tiếp theo và trạng thái xử lý được ghi ở review-log.md. Tiêu đề, ý chính, câu hỏi và ghi chú soạn đã qua no-ai-slop Edit và tự đối chiếu eval.md; các chú thích quy trình ở đây không được chép vào ghi chú diễn giả.

Nguồn hình chỉ là đặc tả tự dựng. Khả năng đọc thực tế, KaTeX, bàn phím, màn hình rộng/hẹp và đồng bộ ghi chú/bài tập công khai chưa được kiểm vì chưa triển khai RevealJS. Dàn bài không chứng nhận trạng thái HTML hiện có.

## Phân tích nguồn và thiết kế nội dung

Tám mục dưới được tích hợp trong outline.md vì quy tắc Git hiện tại bỏ qua tệp Markdown mới trong học kỳ; không tạo nguồn phân tích trùng lặp.

### 1. Bài toán giảng dạy

Bài 06 thuộc học phần **Cơ sở toán học cho AI**, dành cho sinh viên năm ba. Phạm vi chính thức là Chương 8, §§8.5–8.7 của Goodfellow, Bengio và Courville (2016). Dàn bài này được xây dựng lại từ đề cương và các nguồn đã đọc ngày 2026-09-26; không kế thừa tuyến của dàn bài hay storyboard cũ.

Vấn đề trung tâm: chọn thành phần cần điều chỉnh trong quá trình huấn luyện khi một tốc độ học vô hướng không xử lý đủ khác biệt thang đo, tương tác độ cong và giới hạn của mô hình hoặc dữ liệu. Một lựa chọn phải nêu dữ kiện sử dụng, điều kiện áp dụng, chi phí chính và phép kiểm kết quả.

| Mục tiêu quan sát được | Ánh xạ chính thức | Minh chứng trong bài |
|---|---|---|
| MT1: tính trạng thái và bước cập nhật AdaGrad, RMSProp, Adam; phân biệt tổng tích lũy, trung bình mũ và moment đã hiệu chỉnh | LLO14; chuẩn đầu ra học phần (CLO) 2, 3 | B09 và G02 |
| MT2: lập hệ Newton; chạy gradient liên hợp trên hệ xác định dương; kiểm một cập nhật BFGS và điều kiện độ cong | LLO15; CLO2, 3 | C08, D05 và G02 |
| MT3: tính hoặc kiểm đầu ra của sáu chiến lược; xác định thành phần huấn luyện bị thay và giới hạn suy luận | LLO16; CLO3, 4 | E08, F07 và G02 |

Bài 05 đã thiết lập mục tiêu trung bình, gradient lô nhỏ, SGD, momentum, Nesterov và khởi tạo. Đại số ma trận, đạo hàm riêng, Hessian, xác định dương và quy tắc dây chuyền là kiến thức cần nhắc. Không giả định đã học gradient liên hợp hoặc BFGS. Không yêu cầu kiến thức phân phối Gaussian, phương pháp Gauss–Newton hay tìm kiếm Wolfe đầy đủ để giải bài kiểm tra.

Đề cương DOCX mô tả hình thức tổ chức bằng **2 tiết lý thuyết và 1 tiết bài tập**; bảng tổ chức có nhãn cột “Số giờ/buổi” với số 2 và 1. Dàn bài dùng đơn vị tiết theo đoạn mô tả, ghi nhận khác biệt nhãn này và không tự đổi sang phút. Tổng dự toán là 3 tiết, gồm giải thích, tính tay, trả lời, chữa bài và hoạt động nhóm. Bài có 45 trang sau khi phân rã nội dung; không lấy số trang hoặc mặc định 120 phút của kỹ năng làm ràng buộc. Những trang nhận diện ngắn bù cho các trang tính tay và kiểm tra dài hơn.

Ngoài phạm vi: chứng minh hội tụ tổng quát của Adam; chứng minh hội tụ siêu tuyến tính BFGS; SR1, DFP và lớp Broyden; đệ quy hai vòng L-BFGS; gradient tự nhiên; AdaDelta; triển khai mã; thí nghiệm so sánh tối ưu hóa trên mạng sâu. Thiết kế mô hình ở §8.7.5 được giữ bằng một trang hỗ trợ về đường truyền gradient, dù LLO16 không liệt kê riêng.

Sản phẩm hiện tại chỉ gồm tài liệu lập kế hoạch. HTML, ghi chú công khai và bài tập hiện có chưa được đồng bộ với bản mới; không dùng trạng thái kiểm định cũ để chứng nhận bản này.

### 2. Kiểm kê và phân tích học liệu

Vị trí nguồn ghi theo số trang in khi có; “trang PDF” ghi rõ khi khác. Các nguồn được đọc bởi vai phân tích nguồn và điều phối viên, sau đó tác tử soạn đọc toàn bộ báo cáo nguồn. Những báo cáo làm việc trong `/tmp` được tổng hợp vào tài liệu này để căn cứ không phụ thuộc tệp tạm.

| Mã | Tài liệu, tác giả/đơn vị, năm, loại | Đường dẫn hoặc URL | Vị trí đã đọc và vai trò |
|---|---|---|---|
| DC | Đề cương chính thức UET.AI2012, DOCX nội bộ | `sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx` | Buổi 5–6; LLO14–16; chuẩn đầu ra và tổ chức giảng dạy. Nguồn ràng buộc phạm vi/thời lượng |
| DL | Goodfellow, Bengio, Courville, *Deep Learning*, 2016, giáo trình | [Chương 8 chính thức](https://www.deeplearningbook.org/contents/optimization.html) | §§8.5–8.7, tr.302–325; điều phối viên đọc thêm §8.2.1, tr.279–280 cho nhu cầu thang đo A03. Nguồn cấu trúc nội dung bắt buộc |
| DU | Duchi, Hazan, Singer, 2011, bài báo JMLR 12 | [Bài báo](https://jmlr.org/papers/volume12/duchi11a/duchi11a.pdf) | §3, Hình 1, tr.2130; §5, tr.2136. Công thức AdaGrad đường chéo và giới hạn giả thiết |
| AD | Kingma, Ba, 2015, bài báo Adam; bản arXiv 2014 | [Bài báo](https://arxiv.org/pdf/1412.6980) | Thuật toán 1, trang PDF 2; §3, trang PDF 3. Moment và hiệu chỉnh độ chệch |
| HF | Martens, 2010, *Deep Learning via Hessian-free Optimization* | `sources/Deep_HessianFree.pdf`; [bản tác giả](https://www.cs.toronto.edu/~jmartens/docs/Deep_HessianFree.pdf) | §3, thuật toán 1, trang PDF 3; §4.1–4.2, trang PDF 3–4. Toán tử độ cong, CG và giảm chấn |
| SH | Jonathan Richard Shewchuk, *An Introduction to the Conjugate Gradient Method Without the Agonizing Pain*, Carnegie Mellon University, 1994, Edition 1¼, báo cáo | [PDF chính thức](https://www.cs.cmu.edu/~quake-papers/painless-conjugate-gradient.pdf) | Vai chuyên gia xác minh §1 tr. in 1/PDF 7 (SPD); §8 (45)–(49) tr. in 32/PDF 38 (truy hồi); §9 tr. in 32–34/PDF 38–40 (hữu hạn vòng/sai số); B2 tr. in 50/PDF 56 (giả mã). Nguồn trực tiếp C05–C06/HT6; không tải tài sản vào kho |
| BN | Ioffe, Szegedy, 2015, ICML | [Bài báo](https://proceedings.mlr.press/v37/ioffe15.pdf) | Thuật toán 1, trang PDF 4; §3.1, trang PDF 4–5. Huấn luyện và suy luận |
| CU | Bengio, Louradour, Collobert, Weston, 2009, ICML | [Bản tác giả](https://ronan.collobert.com/pub/matos/2009_curriculum_icml.pdf) | §2–3, trang PDF 2–3. Lịch phân phối và liên hệ tiếp diễn |
| BV | Boyd, Vandenberghe, *Convex Optimization*, 2004, giáo trình | `sources/bv_cvxbook.pdf`; [bản tác giả](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf) | Điều phối viên đọc §9.4.1 tr.476–477 (hướng theo chuẩn bậc hai); §9.5.1 tr.484, §9.5.2 tr.487, §9.5.3 tr.488–489: bước Newton, tìm bước và pha hội tụ cục bộ. Không dùng phụ lục C.3 làm nguồn CG |
| OP | Ishan Misra, *Optimization for Deep Networks*, 2015, 67 trang chiếu | `sources/Optimization_2015_11_11.pdf`; [bản tác giả](https://www.cs.cmu.edu/~imisra/data/Optimization_2015_11_11.pdf) | Trang PDF 22–25, 37–38, 44–49; bổ sung kiểm chéo thuật toán và BN. Chỉ đọc văn bản, chưa dùng làm bằng chứng bố cục |
| ST | Stanford CS231n, Lecture 7, Li, Johnson, Yeung, 25-04-2017, 99 trang chiếu | [PDF chính thức](https://cs231n.stanford.edu/slides/2017/cs231n_2017_lecture7.pdf) | Trang 1, 13–52, 57, 73, 87–93; xem ảnh 30, 36. Đối chiếu mạch/độ sâu, không phải mẫu bắt buộc |
| TO | Toronto, Neural Networks for Machine Learning, Lecture 6, Hinton cùng Srivastava, Swersky, 2012, 31 trang chiếu | [PDF](https://www.cs.toronto.edu/~hinton/coursera/lecture6/lec6.pdf); [xác minh năm](https://www.cs.toronto.edu/~hinton/coursera_slides.html) | Trang PDF 1–4, 26–31; xem ảnh 28–29. Đối chiếu cách tạo nhu cầu RMSProp |
| CM | CMU 10-725, Quasi-Newton Methods, Ryan Tibshirani, 2019, 26 trang chiếu | [PDF](https://stat.cmu.edu/~ryantibs/convexopt/lectures/quasi-newton.pdf); [lịch 23-10-2019](https://www.stat.cmu.edu/~ryantibs/convexopt/) | Trang 1–26; xem ảnh 19. Đối chiếu cát tuyến, BFGS, điều kiện độ cong và bộ nhớ |

Các nguồn Chương 8 cục bộ `math-ai-ch8p2-v3.pdf`, `mathAI-ch8p3.pdf`, `math-ai-ch8p4.pdf`, `Bài tập chương 8.pdf` là ứng viên nguồn nội dung/bài tập; chưa được chọn để kế thừa trong lần làm lại này vì nội dung dùng đã có nguồn chính thức và ví dụ tự dựng. Không gọi chúng là mẫu người dùng giao. Bản PDF *Deep Learning* có tên kho phân phối bên thứ ba không được dùng để lấy tài sản; dùng trang chính thức DL. Những nguồn tối ưu khác trong `sources/` không tự động thuộc phạm vi bài này. Tệp `._*` bị loại khỏi kiểm kê. Không sử dụng hoặc tải bổ sung nguồn trong `sources/MIT/`, nên không tạo mục danh mục MIT mới.

Phần chính của DL được ánh xạ đầy đủ: §8.5.1→B01–B03; §8.5.2→B04–B05; §8.5.3→B06–B07; §8.5.4→B08,G01; §8.6.1→C01–C04; §8.6.2→C05–C07; §8.6.3→D01–D04; §8.7.1→E02–E03; §8.7.2→E04–E05; §8.7.3→E06; §8.7.4→F01–F02; §8.7.5→E07; §8.7.6→F03–F06. Các trang kiểm tra là phần tự soạn.

Nguồn chính đủ phạm vi nhưng thiếu ví dụ số ngắn cho mỗi cơ chế và slide đánh giá riêng. Nguồn DU/AD/BN kiểm thuật toán; HF và CM làm rõ yêu cầu tính toán/độ cong; SH bổ sung nguồn trực tiếp cho đúng truy hồi phần dư CG mà DL/HF không trình bày đầy đủ theo dạng đã chọn; các ví dụ tự dựng lấp khoảng trống tính tay. Không nguồn bổ sung nào tự động trở thành mẫu thứ tự bắt buộc. Không sao chép hình, mã hoặc tài sản bên thứ ba; hình được đặc tả để vẽ mới sau khi dàn bài được duyệt.

### 3. Đối chiếu trang chiếu đại học

| Nguồn và bằng chứng trực tiếp | Quan sát nội dung, hình thức hóa và kiểm tra | Quyết định sư phạm cho Bài 06 |
|---|---|---|
| ST tr.15–20, 30–39, 45–49 | Độ cong chênh lệch và nhiễu tạo nhu cầu; momentum→AdaGrad→RMSProp→Adam→Newton. Tr.30 đặt mã cạnh elip; tr.35–36 nêu hiệu chỉnh độ chệch. Thiên về cơ chế, không chứng minh hội tụ | Giữ thứ tự nhóm thích ứng rồi độ cong. Bỏ phần momentum đã học; thêm số ở B02/B04/B06, giả thiết C03 và các trang kiểm tra. Sửa lỗi chỉ số bắt đầu bằng 0 trong mã Adam tr.36; BFGS là cập nhật hạng hai, khác mô tả hạng một ở tr.49 |
| TO tr.1–4 và 26–31 | Mặt lỗi bậc hai; khác biệt độ lớn gradient→rprop→vấn đề lô nhỏ→RMSProp. Tr.28 có chín gradient +0,1 và một −0,9; tr.29 trung bình bình phương. Không có bài kiểm tra riêng hoặc chứng minh hội tụ | Giữ nhu cầu thang đo và trung bình mũ; không đưa toàn bộ rprop vào tuyến. Ví dụ nguồn có mô tả chiều tăng trọng số không khớp quy ước trừ gradient, nên không chép lời giải. Dùng V3 có quy ước dấu xuyên suốt |
| CM tr.5–9, 12–23 | Chi phí Hessian/giải hệ→cát tuyến→SR1→BFGS→độ cong→hội tụ→L-BFGS; có suy diễn và chứng minh. Tr.19 so sánh hai thuật toán bằng đồ thị có hai miền số vòng khác nhau | Dùng quan hệ chi phí–thông tin tại ranh giới C/D. Đưa điều kiện yᵀs>0 trước công thức/chứng minh; thay hàm rào bằng V8 tính tay. Lược SR1/DFP, không lấy biểu đồ tr.19 làm xếp hạng hiệu suất hoặc áp bảo đảm lồi cho mạng sâu |

Đây là nhận định của nhóm soạn từ các quan sát nêu trong cột giữa, không phải kết luận chung của ba trường. Ba nguồn đối chiếu không bao phủ đồng đều LLO16 và không thay nguồn SH cho truy hồi gradient liên hợp; DL giữ vai trò phạm vi và HF giữ vai trò Newton–CG. Công cụ chụp PDF trên web không ổn định; tác tử nguồn tải PDF chính thức vào `/tmp`, chuyển trang thành ảnh và xem năm trang được liệt kê. Không suy đoán bố cục các trang chưa xem trực tiếp. Không có mẫu bố cục do người dùng chỉ định cho lần làm lại này.

### 4. Khái niệm và quan hệ phụ thuộc

Cơ sở chung là bài toán huấn luyện $F(\theta)$ trên dữ liệu $\mathcal D$, mô hình $f_\theta$, điểm đầu, quỹ đạo và quy tắc trả về. Trong B–D, cơ sở được cụ thể hóa bằng mô hình tuyến tính cục bộ có phạt xác định dương. Trong E–F, đối tượng được thay nằm trong các thành phần của quá trình huấn luyện; không suy rằng mọi can thiệp tương đương đổi ma trận phạt.

Quy ước: $\theta\in\mathbb R^p$; $t\ge1$ là vòng huấn luyện, $g_t$ tính tại $\theta_{t-1}$ và tạo $\theta_t$; $g=\nabla F(\theta)$ khi phát biểu hướng giảm xác định. Gradient lô được gọi rõ là ước lượng. $M$ là ma trận phạt, $H$ là Hessian, $A$ là ma trận hệ SPD, $P$ là xấp xỉ nghịch đảo Hessian. Chỉ số $k$ trong CG là vòng giải hệ nội bộ; trong tiếp diễn là giai đoạn với ngữ cảnh được định nghĩa lại. Các phép căn, bình phương, chia vectơ ở B thực hiện theo tọa độ. Dùng một quy ước epsilon ngoài căn cho B; khác thuật toán RMSProp 8.5 của DL được ghi rõ.

| Khái niệm | Vai trò và tiên quyết | Sản phẩm học tập; ranh giới | Đầu ra |
|---|---|---|---|
| KN0: mô hình bước | Hỗ trợ chung; gradient, dạng toàn phương | Suy ra bước; ma trận phạt chưa phải Hessian | B và C |
| KN1–KN3: AdaGrad, RMSProp, Adam | Trọng tâm; KN0, moment/SGD đã học | Tính trạng thái; moment bậc hai thô khác phương sai và Hessian | B09, giới hạn tại C01 |
| KN4: Newton | Trọng tâm; Hessian, KN0 | Giải mô hình; hướng giảm khác bước giảm; phi lồi có Hessian bất định | KN5 |
| KN5: CG tuyến tính | Trọng tâm mới; hệ SPD, tích vô hướng | Hai vòng, phần dư, dừng; khác CG phi tuyến | C07 và nhu cầu D01 |
| KN6: BFGS | Trọng tâm mới; gradient hai điểm và SPD | Cát tuyến và điều kiện độ cong; P khác H | D05; tổng hợp |
| KN7: BN | Trọng tâm; trung bình và phương sai | Tính đầu ra, phân biệt học/suy luận; mô hình học phụ thuộc lô | E08 |
| KN8: hạ tọa độ/khối | Trọng tâm; đạo hàm riêng, tối ưu con | Một lượt và lý do không tăng; không tự có hội tụ mạng sâu | E08 |
| KN9: Polyak | Trọng tâm; quỹ đạo tham số | Tính trung bình, phản ví dụ hai miền nghiệm; khác momentum | E08, F03 dùng lại hàm bậc bốn |
| KN10: thiết kế đường đạo hàm | Hỗ trợ; quy tắc dây chuyền | Tính tích đạo hàm và giới hạn nối tắt | E08, F01 |
| KN11: tiền huấn luyện có giám sát | Trọng tâm; gradient, kiến trúc tầng | Chuyển tham số và một bước tinh chỉnh; khác đổi dữ liệu đích | F07 |
| KN12: tiếp diễn | Trọng tâm; đạo hàm đa thức | Tạo họ mục tiêu, truyền nghiệm, kiểm mắc điểm dừng | KN13, F07 |
| KN13: học theo chương trình | Trọng tâm; trung bình có trọng số | Tính nghiệm theo lịch, kiểm phân phối đích | F07, G02 |

Đồ thị phụ thuộc: kiến thức Bài 05 → KN0 → KN1 → KN2 → KN3 → giới hạn đường chéo → KN4 → KN5 → KN6. Sau đó gọi lại các thành phần của bài toán tại E01; KN7, KN8, KN9 là ba can thiệp có thể phân biệt từ cùng bản đồ, không giả lập quan hệ suy ra giữa chúng. KN10 nối phép tính mô hình với điểm đầu học được của KN11. KN12 và KN13 cùng thay mục tiêu theo giai đoạn nhưng bằng hai cơ chế khác nhau. Mạch G sử dụng cả ba nhóm chuẩn đầu ra, không đưa trọng tâm mới.

### 5. Mạch giảng cho từng khái niệm

Bản đồ sáu bước đầy đủ, mã trang, thời lượng cụm và lý do gộp nằm trong [storyboard.md](storyboard.md). Phiếu dưới ghi quyết định trước khi tổng hợp trang, gồm phương án khác khi có lựa chọn thực chất.

| Khái niệm | Vấn đề, mạch chọn, năng lực | Phương án khác và quyết định | Hình thức hóa, ứng dụng, kiểm tra và câu nối |
|---|---|---|---|
| KN0 | V1 làm rõ bước vô hướng; elip→ma trận phạt→đạo hàm mô hình; tính bước | Mở bằng định nghĩa chuẩn có trọng số làm tăng ký hiệu trước nhu cầu, nên không chọn | HT1; A04 áp cùng V1; A05 kiểm. Thang đo lệch tạo nhu cầu thống kê B |
| KN1 | Tọa độ hoạt động nhiều/ít→bảng gradient→một bước số→thuật toán | Ví dụ hồi quy nhiều đặc trưng phải thêm dữ liệu không cần cho cơ chế, nên dùng gradient cho sẵn | HT2; B03 nối tọa độ ít hoạt động với đặc trưng thưa và tốc độ hiệu dụng; B09. Tích lũy dẫn nhu cầu quên |
| KN2 | Lịch sử xa→trọng số suy giảm→V3→RMSProp | Dẫn bằng rprop mất thêm tiên quyết và dễ lẫn dấu; không chọn | HT3; B05 tính thống kê khi một tọa độ vắng gradient, đối chiếu tích lũy không đổi; B09. Thống kê độ lớn chưa có lịch sử hướng |
| KN3 | Moment từ 0→bảng thô/hiệu chỉnh→V4→Adam | Mở bằng toàn bộ giả mã che nhu cầu hiệu chỉnh; đặt sau bước số | HT4; B07 kiểm hướng moment, B08 kiểm giới hạn độ cong đường chéo; B09. Đường chéo chưa dùng tương tác tham số |
| KN4 | Elip nghiêng→V5 giải hệ→Taylor→SPD/giảm chấn | Tiếp tục elip thẳng V1 không làm hiện tương tác; đổi có chủ ý sang Q ngoài đường chéo | HT5; C04 áp tại yên ngựa; C08. Hệ đúng còn đắt |
| KN5 | Hệ đắt→hai hướng liên hợp→V7 hai vòng→thuật toán | Cùng ma trận Q của Newton cho phân số dài; chọn hệ chéo có hai trị riêng để tính tay. Liên hệ hệ Newton được giữ bằng A,d,b | HT6; C07 giải hệ qua Av; C08. Đầu vào Av có thể chưa có |
| KN6 | Thiếu Av→cát tuyến→V8→BFGS→bộ nhớ | Giới thiệu SR1 rồi BFGS làm rộng phạm vi; đi trực tiếp hai điều kiện cát tuyến/SPD | HT7; D04 hướng và L-BFGS; D05. Thay bước chưa đổi phép tính mô hình |
| KN7 | Thang đầu vào tầng→hai lô dịch chuyển chung→trục số V9→công thức→hai chế độ | Chuẩn hóa cả dữ liệu đầu vào trước không giải thích phụ thuộc lô; dùng một đặc trưng tại tầng ẩn | HT8; E03 ứng dụng tầng; E08. Nhóm biến là thành phần khác có thể thay |
| KN8 | Bài toán con dễ→đường gấp khúc V10→cập nhật khối | Bắt đầu bằng mô hình mạng khó kiểm nghiệm tối ưu từng khối; chọn hồi quy bậc hai | HT9; E05 hai nhóm hệ số; E08. Quỹ đạo đã sinh còn có cách chọn đầu ra |
| KN9 | Dao động→điểm trên trục→V11→trung bình→phản ví dụ | Định lý tiệm cận cần xác suất vượt phạm vi; dùng ví dụ và ranh giới đủ để vận dụng | HT10; trung bình quỹ đạo và kiểm hai miền nghiệm; E08. Kiến trúc có thể cần đổi trước khi tối ưu |
| KN10 | Tích đạo hàm trong gradient mất mát→hai sơ đồ→tính hệ số truyền ngược→kiểm | Không mở một mạch kiến trúc vì chỉ hỗ trợ §8.7.5 | Quy tắc dây chuyền; E08. Kiến trúc tầng dẫn tới xây điểm đầu theo tầng |
| KN11 | Điểm đầu (0,0) mất tín hiệu gradient→nhiệm vụ phụ có nhãn→chuyển a→V13 tinh chỉnh→quy trình | Dùng ảnh phân loại không tính tay được; mô hình hai tầng tuyến tính đủ thể hiện chuyển tham số | HT11; F02 áp mục tiêu đích; F07. Đổi điểm đầu khác đổi họ mục tiêu |
| KN12 | Đổi mục tiêu khó→ba đồ thị→V14→lịch và giới hạn | Làm trơn Gaussian cần moment bậc bốn xác suất; dùng phạt λθ² cùng cơ chế họ mục tiêu. Đây là ví dụ tự dựng, không gán cho sách | HT12; F04 kiểm điểm dừng; F07. Dữ liệu cũng có thể sinh họ mục tiêu |
| KN13 | Độ nhạy mẫu→trọng số→V15→Fq→mục tiêu cuối | Lịch “dễ đến khó” chỉ bằng lời không đo được; chọn hai mẫu và quy ước độ khó cụ thể | HT13; F06 thiết kế đánh giá; F07. G02 phối hợp lựa chọn có điều kiện |

### 6. Ví dụ, hình và phương án thay thế

Mọi ví dụ V1–V16 là ví dụ sư phạm tự xây dựng, không phải kết quả thực nghiệm. Nguồn chỉ cung cấp khái niệm/thuật toán. Các số đã kiểm bằng đại số và chương trình độc lập; minh chứng được ghi trong nhật ký. Hình chưa được tạo vì phạm vi chỉ lập dàn bài.

| Mã và trang | Dữ kiện, thao tác, kết quả | Hình và giới hạn; lý do chọn thay phương án khác |
|---|---|---|
| V1 A03–A04 | F=(θ₁²+9θ₂²)/2, θ=(1,1); η=0,2 cho F mới 3,2; η=1 cho 288; M=diag(1,9) cho nghiệm với η=1 | Đồng mức/trục θ₁,θ₂; ba mũi tên có nhãn. Thay dữ liệu huấn luyện thực để tách chính xác thang đo |
| V2–V4 B01–B09 | g₁=(2,1), g₂=(2,0); AdaGrad v₂=(8,1); RMSProp ρ=1/2 có v₂=(3,1/4); Adam bước đầu hiệu chỉnh về g₁ và g₁² | Bảng trạng thái và trọng số; giữ số nhỏ. Gradient cho sẵn không phải quỹ đạo chung của một hàm sau khi thuật toán tách đường đi |
| V5 C01–C03 | Q=[[2,1],[1,2]], θ=(1,0); g=(2,1); d=(−1,0) | Elip nghiêng/trục riêng; thay hàm chéo V1 để thấy tương tác |
| V6 C04 | H=diag(1,−1), g=(0,−1); Newton gᵀd=1; cộng 2I cho −1 | Mặt cắt θ₂; chỉ kiểm hướng, hàm không có cực tiểu toàn cục |
| V7 C05–C08 | A=diag(1,4), b=(1,1); CG d₁=(2/5,2/5), r₁=(3/5,−3/5), d₂=(1,1/4) | Đường hai đoạn trên q(d); hệ chéo vẫn cần hai hướng, giúp tính tay ngắn hơn hệ nghiêng |
| V8 D02–D05 | s=(1,0), y=(2,1), P₀=I; P₁=[[3/4,−1/2],[−1/2,1]], P₁y=s, det=1/2 | Bảng điều kiện; tái dùng Q của V5. Không cần đồ thị thực nghiệm của CM |
| V9 E02–E03 | a=(1,1,5,5), a+4=(5,5,9,9); trung bình 3 và 7, cùng σ²=4; ε→0,γ=2,β=1 cho z=(−1,−1,3,3); ε=1 cho phương sai chuẩn hóa 4/5 | Hai trục số và nhánh học/suy luận; một đặc trưng đủ thể hiện phụ thuộc lô |
| V10 E04–E05 | F=[(u+v−2)²+u²+v²]/2; (0,0)→(1,0)→(1,1/2)→(3/4,1/2)→(3/4,5/8) | Đồng mức u,v và đường cập nhật vuông góc trục; nghiệm đầy đủ (2/3,2/3). Không khái quát hội tụ mạng phi lồi |
| V11 E06 | Quỹ đạo 1;3;1,5;2,5 trung bình 2. Hai nghiệm −1,1 của (θ²−1)² trung bình 0 có mất mát 1 | Trục tham số và mặt cắt quartic; phản ví dụ xác định rõ giới hạn |
| V12 E07 | Hệ số truyền ngược từ h₅ tới h₀: 0,1⁵=10⁻⁵; nối tắt 1,1⁵=1,61051; gradient tham số tầng trước còn nhân ∂ℒ/∂h₅ và ∂h₀/∂w | Hai chuỗi có cạnh đồng nhất; không ngụ ý mạng thứ hai luôn học tốt hơn |
| V13 F01–F02 | F=(ab−3)²/2; tại (0,0), gradient bằng 0; tại (2,1), gradient (−1,−2); bước η=0,1 cho a=2,1;b=1,2; F=0,1152 | Chuyển tham số giữa mô hình nông và hai tầng; thay ảnh thực bằng mô hình tính được |
| V14 F03–F04 | Fλ=(θ²−1)²+λθ²; λ=3;1,5;0 cho nghiệm 0;±1/2;±1. Gradient tại 0 luôn 0 | Cùng trục θ,Fλ; kiểm rõ mắc điểm dừng. Không dùng moment Gaussian vì chưa là tiên quyết |
| V15 F05 | E=(1,1),H=(3,1); q=0;1/4;1/2 cho nghiệm 1;1/2;2/5 | Bảng xác suất/nghiệm; độ khó là quy ước theo độ nhạy, không định nghĩa phổ quát |
| V16 G02 | Mô hình p=10⁶ chỉ có gradient, ≤4p số trạng thái; mô hình p=100 có Av SPD; lịch q còn khác đích | Phiếu phương án ba hàng. Bài áp dụng phối hợp; không thêm dữ liệu để ngầm suy ưu thế thuật toán |

Mọi hình dự kiến có nhãn trục/đối tượng, chú giải cơ chế và văn bản thay thế mô tả quan hệ cần nhìn thấy. Không sử dụng màu làm tín hiệu duy nhất. Khi triển khai, phép tính dài chuyển sang ghi chú; giữ một kết luận trên mặt trang. Phản ví dụ chỉ xuất hiện khi kiểm ranh giới của kết quả vừa học.

### 7. Danh mục hình thức hóa

**HT0. Bài toán và hợp đồng thuật toán; định nghĩa.** $\mathcal D=\{(x_i,y_i)\}_{i=1}^n$, $\theta\in\mathbb R^p$, $F(\theta)=n^{-1}\sum_i\ell(f_\theta(x_i),y_i)$ khi đầu ra từng mẫu độc lập với các mẫu cùng lô. Vòng $t\ge1$ tính gradient lô tại $\theta_{t-1}$ rồi tạo $\theta_t$. Cần dữ liệu, tham số đầu, ngân sách, lịch bước và quy tắc kiểm định; dừng theo ngân sách hoặc tiêu chí đã định trước. Chuẩn gradient ngẫu nhiên nhỏ ở một lô không chứng minh dừng tối ưu của $F$. BN thay giả thiết độc lập bằng mục tiêu kỳ vọng theo lô ở HT8. Vị trí A02 (sơ đồ thành phần), A04 (mô hình một bước), B03–B07, E01/E03 và G01 (gọi lại thành phần). Nguồn DL, §§8.1, 8.5, 8.7.1; chỉ nhắc lại phần bài toán từ Bài 05, không chứng minh.

**HT1. Bước có phạt xác định dương; mệnh đề tự suy ra.** Cho $g\in\mathbb R^p$, $M=M^\top\succ0$, $\eta>0$. Hàm $g^\top d+(2\eta)^{-1}d^\top Md$ lồi chặt (còn gọi là lồi nghiêm ngặt), có nghiệm duy nhất $d=-\eta M^{-1}g$. Nếu $g=\nabla F(\theta)\ne0$ thì $g^\top d=-\eta g^\top M^{-1}g<0$. Đây là hướng giảm; giảm sau bước hữu hạn cần điều kiện bước. Chứng minh đầy đủ bằng đạo hàm và dạng toàn phương tại A04; không áp kết luận dấu này cho moment Adam hoặc gradient lô bất kỳ. V1 ánh xạ $M=\operatorname{diag}(1,9)$. Vai trò là so sánh B–D; nguồn hỗ trợ DL §§8.5–8.6, BV §9.5.1, còn mô hình thống nhất là tổng hợp sư phạm.

**HT2. AdaGrad; thuật toán.** $v_0=0$, $v_t=v_{t-1}+g_t\odot g_t$, $\theta_t=\theta_{t-1}-\eta g_t/(\sqrt{v_t}+\varepsilon)$, $\eta,\varepsilon>0$. Tính gradient, cập nhật thống kê, rồi tham số; dừng HT0; đầu ra tham số được chọn bằng kiểm định đã định trước. Tốc độ học hiệu dụng $\eta/(\sqrt{v_{t,j}}+\varepsilon)$ không tăng với $t$ khi $\eta$ cố định; độ dài bước còn phụ thuộc $g_{t,j}$. V2 minh họa một tọa độ lặp gradient. Phát biểu/áp dụng, không chứng minh định lý tối ưu trực tuyến; trạng thái $O(p)$. Nguồn DL §8.5.1, thuật toán 8.4; DU §3 và §5. Vị trí B01–B03, kiểm B09.

**HT3. RMSProp; thuật toán với biến thể epsilon đã chọn.** $v_0=0$, $v_t=\rho v_{t-1}+(1-\rho)g_t\odot g_t$, $0<\rho<1$; cập nhật tham số như HT2 với thống kê mới. Đầu vào và dừng HT0. Đây là dạng epsilon ngoài căn; DL thuật toán 8.5 dùng hằng số bên trong căn. Không đồng nhất giá trị hai hằng số. V3 dùng $\rho=1/2$ và mẫu dương, bỏ epsilon chỉ để tính tay. Trọng số của gradient cách $k$ vòng là $(1-\rho)\rho^k$; giải thích bằng khai triển, không trình bày bảo đảm hội tụ mạng sâu. Chi phí ngoài gradient/bộ nhớ $O(p)$. Nguồn DL §8.5.2; TO tr.29–31; vị trí B04–B05, kiểm B09.

**HT4. Adam; thuật toán và tính chất trọng số.** $m_0=v_0=0$; $m_t=\beta_1m_{t-1}+(1-\beta_1)g_t$, $v_t=\beta_2v_{t-1}+(1-\beta_2)g_t\odot g_t$, $0<\beta_1,\beta_2<1$; $\widehat m_t=m_t/(1-\beta_1^t)$, $\widehat v_t=v_t/(1-\beta_2^t)$; $\theta_t=\theta_{t-1}-\eta_t\widehat m_t/(\sqrt{\widehat v_t}+\varepsilon)$. Chia cho tổng trọng số loại ảnh hưởng khởi tạo 0; gọi ước lượng không chệch của moment chung chỉ khi moment đó không đổi theo thời gian. Moment bậc hai thô khác phương sai. Trình tự: gradient→moment→hiệu chỉnh→tham số; dừng HT0; bộ nhớ $O(p)$. V4 kiểm vòng đầu và B09 kiểm vòng hai; Ghi chú B07 cho trường hợp hướng moment không giảm; B08 chỉ xét tương tác tọa độ. Nguồn AD thuật toán 1/§3; DL §8.5.3; vị trí B06–B07. Chỉ khai triển trọng số, không dùng chứng minh hội tụ bản Adam đầu làm bảo đảm tổng quát.

**HT5. Newton; mô hình, thuật toán và kết quả cục bộ.** Tại điểm $\theta$ khả vi hai lần, $g=\nabla F(\theta)$, $H=\nabla^2F(\theta)\succ0$, mô hình Taylor có nghiệm $Hd=-g$. Nếu $g\ne0$ thì $g^\top d<0$. Đầu vào $F,\theta_0$, ngưỡng, ngân sách và quy tắc chọn bước; mỗi vòng tính $g,H$, giải hệ, chọn $\alpha$, cập nhật $\theta+\alpha d$. Dừng bằng chuẩn gradient đầy đủ hoặc ngân sách. Khi Hessian bất định, chọn $A=H+\lambda I\succ0$, với $\lambda>-\lambda_{\min}(H)$; cộng một số dương bất kỳ chưa đủ. Hội tụ bậc hai cần nghiệm có Hessian xác định dương, Hessian Lipschitz lân cận, điểm đầu đủ gần và bước đầy đủ trong pha cục bộ; tìm bước có thể cho phép bước đầy đủ ở pha này, nhưng cố định $\alpha<1$ không tự cho tốc độ đó. Chứng minh hướng giảm đầy đủ; chỉ phát biểu kết quả cục bộ. V5,V6; nguồn BV §9.5.1 tr.484, §9.5.2 tr.487, §9.5.3 tr.488–489; DL §8.6.1; HF §3. Vị trí C01–C04, dùng tại C07.

**HT6. Gradient liên hợp tuyến tính; thuật toán.** Hệ $Ad=b$ có $A=A^\top\succ0$ cố định. Đầu vào toán tử $Av$, $b$, $d_0$, $\tau$, $K$; khởi tạo $r_0=b-Ad_0$, $p_0=r_0$. Nếu $r_0=0$ thì trả ngay. Vòng $k$: $\alpha_k=(r_k^\top r_k)/(p_k^\top Ap_k)$, $d_{k+1}=d_k+\alpha_kp_k$, $r_{k+1}=r_k-\alpha_kAp_k$. Kiểm dừng trước khi chia tiếp; nếu tiếp tục, $\beta_k=(r_{k+1}^\top r_{k+1})/(r_k^\top r_k)$, $p_{k+1}=r_{k+1}+\beta_kp_k$. Dừng khi $\|r_k\|_2\le\tau\max(1,\|b\|_2)$ hoặc hết $K$; đầu ra gần đúng. Tính liên hợp $p_i^\top Ap_j=0$ được kiểm trên V7; kết quả tối đa $p$ vòng trong số học chính xác chỉ phát biểu, không chứng minh toàn bộ. Mỗi vòng một tích $Av$ và $O(p)$ phép vectơ; bộ nhớ phụ $O(p)$. Nguồn truy hồi: SH §8 (45)–(49), tr. in 32/PDF 38; giả mã B2 tr. in 50/PDF 56; giả thiết SPD §1 tr. in 1/PDF 7; hữu hạn vòng và sai số §9 tr. in 32–34/PDF 38–40. Ngưỡng dừng theo $\max(1,\|b\|_2)$ là biến thể biên soạn, khác B2 dùng chuẩn phần dư ban đầu và tính lại phần dư định kỳ. DL §8.6.2 giữ vai trò phạm vi, HF §3–4 cho ứng dụng Newton–CG. Vị trí C05–C07; kiểm C08. CG phi tuyến ngoài phạm vi chi tiết; chỉ nêu phân biệt. Toán tử và dữ liệu dùng cho nó phải cố định trong mỗi lần giải hệ. Trong Newton–CG ở C07, dùng $d_0=0$. Nếu $g=0$, dừng để kiểm điểm dừng; nếu $g\ne0$, kiểm thêm $g^\top d<0$ trước tìm bước ngoài. Khi kiểm hướng không đạt do giải gần đúng hoặc sai số, siết dung sai/giải lại hoặc dùng $-g$ kèm tìm bước. Kiểm phần dư và kiểm dấu là hai yêu cầu khác nhau.

**HT7. BFGS; thuật toán và mệnh đề bảo toàn xác định dương.** Với $s,y\in\mathbb R^p$, $P=P^\top\succ0$, $y^\top s>0$, $\rho=(y^\top s)^{-1}$, đặt $P^+=(I-\rho sy^\top)P(I-\rho ys^\top)+\rho ss^\top$. Có $P^+y=s$ và $P^+\succ0$. Phác thảo chứng minh bằng dạng toàn phương tại D03; V8 kiểm tích và định thức. Thuật toán: gradient đầy đủ, hướng $d=-Pg$, chọn bước, lập $s$ và sai phân gradient $y$, kiểm điều kiện độ cong, cập nhật hoặc bỏ/sửa theo quy tắc. Đầu vào $\theta_0,P_0\succ0$, ngân sách, ngưỡng, quy tắc tìm bước; dừng như HT5. Tìm bước Wolfe là một cách thu được điều kiện độ cong; nội dung đầy đủ Wolfe không là tiên quyết bài tập. BFGS lưu $O(p^2)$; L-BFGS lưu $m$ cặp với $O(mp)$, chỉ giới thiệu vai trò. Không đồng nhất $P$ với Hessian hoặc với $M$ của HT1; với $\eta=1$, hướng $d=-Pg$ tương ứng $M=P^{-1}$. Bước thực tế là $\alpha d$; nếu dùng HT1 cho bước này thì đặt $\eta=\alpha$ và vẫn $M=P^{-1}$. Nguồn CM tr.8–18, 20–23; DL §8.6.3. Vị trí D01–D04, kiểm D05; không phát biểu siêu tuyến tính vô điều kiện.

**HT8. BN; định nghĩa phép biến đổi.** Với một đặc trưng $a_i$ trong lô $m$, $\mu_\mathcal B=m^{-1}\sum_i a_i$, $\sigma_\mathcal B^2=m^{-1}\sum_i(a_i-\mu_\mathcal B)^2$, $\widehat a_i=(a_i-\mu_\mathcal B)/\sqrt{\sigma_\mathcal B^2+\varepsilon}$, $z_i=\gamma\widehat a_i+\beta$, $\varepsilon>0$. $\gamma,\beta$ được học. Phương sai chuẩn hóa là $\sigma^2/(\sigma^2+\varepsilon)$; kiểm một dòng đại số trên V9. Huấn luyện dùng thống kê lô; suy luận dùng thống kê đã ước lượng và cố định. Mô hình học phụ thuộc lô nên mục tiêu phù hợp là $F_{BN}(\theta)=\mathbb E_\mathcal B[L_\mathcal B(\theta)]$. Đây là thay phép tính/biểu diễn, không là chia gradient theo ma trận đường chéo. Nguồn BN thuật toán 1/§3.1; DL §8.7.1, (8.34)–(8.37). Vị trí E02–E03; kiểm E08. Không khẳng định giả thuyết về cơ chế trong tên bài báo là định lý.

**HT9. Hạ theo khối; thuật toán và tính không tăng.** Chia $\theta=(\theta^{(1)},\ldots,\theta^{(K)})$. Chọn khối, giữ các khối khác, giải bài toán con hoặc tìm giá trị không tệ hơn điểm cũ. Nếu điểm cũ khả thi thì $F(\theta^+)\le F(\theta)$; chứng minh đầy đủ bằng so sánh với lựa chọn cũ. Đầu vào phép chia khối, lịch khối, điểm đầu, bộ giải con, ngưỡng và ngân sách; cập nhật tuần tự dùng giá trị mới nhất. Dừng theo thay đổi khối/mục tiêu hoặc ngân sách; chi phí chính là bộ giải con, phụ thuộc cấu trúc, không gán một bậc chung. V10 tính được bài toán con. Nguồn DL §8.7.2, (8.38); vị trí E04–E05, kiểm E08. Không suy hội tụ tới cực tiểu mạng sâu từ tính không tăng.

**HT10. Trung bình Polyak; định nghĩa quy tắc trả về.** Cho quỹ đạo $\theta_1,\ldots,\theta_T$ cùng không gian tham số; $\bar\theta_T=T^{-1}\sum_t\theta_t$. Tính trực tuyến bằng $\bar\theta_t=\bar\theta_{t-1}+(\theta_t-\bar\theta_{t-1})/t$; $O(p)$ bộ nhớ. Đầu vào là quỹ đạo, không thay bước đã sinh; dừng khi quỹ đạo đầu vào dừng. V11 tính trung bình và phản ví dụ hai nghiệm khác miền. Phát biểu/áp dụng, không chứng minh định lý xác suất tiệm cận. Nguồn DL §8.7.3, tr. 318, đoạn định nghĩa trung bình đều không đánh số; vị trí E06, kiểm E08. Phương trình DL (8.39) mô tả trung bình mũ, một biến thể riêng, không đổi định nghĩa đang dùng.

**HT11. Tiền huấn luyện có giám sát; quy trình.** Dữ liệu phụ có nhãn, mô hình phụ, phép chuyển $T$ và tham số mới $\xi$ xác định $\theta_0=T(\theta_{aux},\xi)$. Học nhiệm vụ phụ, chuyển phần tham số hợp lệ, khởi tạo phần thêm, tinh chỉnh trên mục tiêu đích. Đầu ra là tham số đích; dừng/giai đoạn theo ngân sách và kiểm định đã chọn; chi phí phải tính cả huấn luyện phụ. V13 đối chiếu gradient bằng 0 tại điểm đầu (0,0) với gradient khác 0 tại điểm chuyển (2,1), rồi tính bước tinh chỉnh; chỉ minh họa quỹ đạo phụ thuộc điểm đầu, không chứng minh ưu thế so với mọi khởi tạo ngẫu nhiên. Nguồn DL §8.7.4 tr.319–321, Hình 8.7. Vị trí F01–F02, kiểm F07. Không đồng nhất mọi tiền huấn luyện với sơ đồ tham lam từng tầng minh họa.

**HT12. Tiếp diễn; định nghĩa quy trình họ bài toán.** Cùng không gian tham số; lịch $F_{\lambda_0},\ldots,F_{\lambda_K}=F$ và các bộ giải con. Nghiệm trả về của giai đoạn $k-1$ làm điểm đầu giai đoạn $k$; dừng con theo tiêu chí đã định, dừng ngoài khi hoàn thành mục tiêu đích hoặc ngân sách. V14 có $F_\lambda=(\theta^2-1)^2+\lambda\theta^2$, $F_\lambda'=4\theta^3+(2\lambda-4)\theta$; nghiệm và điểm dừng được kiểm bằng đạo hàm hai. Có thể mắc ở 0 dù mục tiêu đã đổi. Phát biểu và áp dụng, không có bảo đảm tối ưu toàn cục. Nguồn DL §8.7.6 tr.323–325; họ phạt là ví dụ tự dựng. Vị trí F03–F04, kiểm F07.

**HT13. Học theo chương trình; quy trình thay phân phối.** Lịch phân phối mẫu $P_k$ hoặc trọng số tương ứng xác định $F_k(\theta)=\mathbb E_{(x,y)\sim P_k}\ell(f_\theta(x),y)$. Phải chỉ định tiêu chí độ khó, chuyển giai đoạn và phân phối đích; ngân sách/dừng thuộc thiết kế. V15 có $F_q=(1-q)(\theta-1)^2/2+q(3\theta-1)^2/2$ với $0\le q\le1$, nghiệm $\theta_q^*=(1+2q)/(1+8q)$. Suy ra đầy đủ bằng đạo hàm; mẫu H chỉ được gọi nhạy hơn theo độ cong đã tính. Đổi thứ tự một hoán vị không tự đồng nhất với đổi kỳ vọng này. Nguồn DL §8.7.6, CU §2–3. Vị trí F05–F06, kiểm F07; không đưa định lý dễ đến khó luôn tốt hơn.

### 8. Quyết định tổng hợp và giới hạn

| Nội dung nguồn hoặc phân tích | Quyết định | Lý do và vị trí đích |
|---|---|---|
| DL §§8.5–8.6 | Giữ thứ tự nhóm, tách bước ví dụ/thuật toán | Phù hợp LLO14–15; B–D mỗi thuật toán có đầu vào số trước công thức tổng quát |
| Mô hình bước chung | Thêm A03–A05 | Tạo sườn so sánh có giả thiết và ví dụ; không lấy tên thuật toán làm mạch |
| Newton và CG | Tách C02–C03, C05–C06 | Sinh viên chưa được giả định biết CG; cần ví dụ hệ và phần dư trước giả mã |
| BFGS và chi phí | Tách thành mạch D | C dùng toán tử Av; D học thông tin từ hai gradient. C07→D01 nêu rõ thay đầu vào |
| ST/CM | Sửa lỗi và đổi thứ tự điều kiện | Adam t≥1; BFGS hạng hai; điều kiện yᵀs>0 đứng trước công thức |
| RMSProp DL thuật toán 8.5 | Sửa biến thể biểu diễn | Dùng ε ngoài căn cho thống nhất B; ghi khác nguồn, không coi hai hằng số đồng nhất |
| DL §8.7.5 | Giữ, chuyển trước §8.7.4 | E07 kết phép tính mô hình; F01 dùng kiến trúc tầng để chuẩn bị điểm đầu. Đây là đổi thứ tự có chủ ý, không bỏ một tiểu mục bắt buộc |
| Sáu chiến lược LLO16 | Gộp thành E và F theo thành phần bị thay | E: phép tính/khối/đầu ra; F: điểm đầu/mục tiêu/phân phối. Không ép chúng vào HT1 |
| Ví dụ trong slide đại học | Thay bằng ví dụ tự dựng | Tính tay ngắn, ký hiệu kiểm được; không sao chép hình hoặc khẳng định thực nghiệm |
| AdaDelta, RMSProp–Nesterov, CG phi tuyến chi tiết, SR1/DFP, Broyden, natural gradient | Bỏ khỏi tuyến chính | Không cần để đo LLO14–16 trong 3 tiết; CG phi tuyến chỉ có phân biệt thuật ngữ |
| L-BFGS | Gộp hỗ trợ D04 | Giải thích bộ nhớ O(mp), không thêm đệ quy hai vòng hoặc bài tập chưa có tiên quyết |
| Bài thực hành phối hợp | Gộp G02, không tạo mạch thứ tám | Sản phẩm nhóm là phương án có điều kiện; tính tay từng cơ chế đã phân bố ở B–F |
| Đánh giá mỗi mạch | Thêm A05/B09/C08/D05/E08/F07/G02 | Mỗi đề đủ dữ kiện, đáp án và tiêu chí; câu hỏi không dùng kiến thức chưa dạy |

Tổng 7 mạch, 45 trang, 2 tiết lý thuyết + 1 tiết bài tập. Không thay HTML/CSS hoặc tài liệu học tập công khai trong phạm vi này. Codex Slides do điều phối viên xử lý bằng các trang đã soạn tường minh; nhật ký chỉ ghi thao tác có bằng chứng. Rà trực quan RevealJS và đồng bộ tài liệu công khai thuộc bước triển khai sau, chưa được chứng nhận bởi dàn bài. Các quyết định từ rà độc lập được lưu trong `review-log.md`; trạng thái bản cũ là lịch sử.
