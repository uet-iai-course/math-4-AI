# Storyboard Bài giảng 06 — Tối ưu để huấn luyện mô hình học sâu II

## Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm; ký hiệu truyền; LLO/CLO | Gộp và câu nối; thời lượng |
|---|---|---|---|---|---|---|---|---|
| Tốc độ học thích nghi | A01 | A02 | A03 | A04–A06 | A07 | A08 | Gradient lô và momentum → giải thích $r_1,v_1,m_1$, tính vòng hai và so sánh AdaGrad, RMSProp, Adam; truyền $g_1,g_2,\theta_0,\eta,\epsilon,\rho,\beta_1,\beta_2$ và trạng thái đầu; LLO14/CLO2,3 | A03 là ví dụ số trước phát biểu hình thức: ba fragment lần lượt hiện tổng không quên, trung bình có quên và hướng có quán tính. “Một mẫu số chung không phản ánh lịch sử từng tọa độ.” $0{,}40$ LT + $0{,}20$ BT. |
| Độ cong xấp xỉ | B01 | B02 | B03, B06, B08 | B04, B05, B07 | B06, B08 | B09 | Hessian và hệ tuyến tính → tính hai vòng CG, kiểm hướng BFGS, chọn Newton/HF/BFGS; truyền $g,H,B,p,r,d,s,y,M$; LLO15/CLO2,3 | B05 gộp CG với HF nhưng B06 tách phép tính; B07 gộp BFGS/L-BFGS nhưng B08 tách phép kiểm. “Co giãn đường chéo vẫn bỏ qua tương tác chéo.” $0{,}40$ LT + $0{,}30$ BT. |
| Chuẩn hóa theo lô | C01 | C02 và SVG | C03 | C02 | C07.1 | C07.1 | Kích hoạt $H\in\mathbb R^{m\times d}$ → tính $\mu,\sigma^2,\widehat H,Y$, chọn thống kê suy diễn và nêu giới hạn lô nhỏ; giữ $H,\mu,\sigma,\epsilon,\gamma,\beta$; LLO16/CLO3,4 | C02 gộp trực quan–hình thức; C03 dùng $\epsilon>0$. C07 gộp ứng dụng với bài tập theo khung ba cột. |
| Hạ tọa độ hoặc theo khối | C01 | C04 | C05 | C04–C05 | C07.2 | C07.2 | Phân hoạch biến → lập cập nhật khối, phân biệt một cập nhật với một chu kỳ, nêu giới hạn ghép mạnh; giữ $x_1,x_2,\alpha$; LLO16/CLO3,4 | C04 gộp trực quan–thuật toán; C05 là trường hợp biên tính được. Trang tổng hợp cũ được gộp vào C07 và Z01. |
| Lấy trung bình Polyak | C01 | C06 | C06 | C06 | C07.3 | C07.3 | Quỹ đạo $\theta_1,\ldots,\theta_t$ → tính $\widehat\theta_t$, xác định giai đoạn lấy trung bình và giới hạn trộn miền; giữ $\theta_i,\widehat\theta_t$; LLO16/CLO3,4 | C06 gộp trực quan–ví dụ–định nghĩa; C07 gộp ứng dụng với bài tập. Toàn mạch C: $0{,}45$ LT + $0{,}20$ BT. |
| Tiền huấn luyện có giám sát | D01 | D02 | D02 và tình huống D06.1 | D02 | D06.1 | D06.1 | 200 nhãn đích và 50.000 nhãn nguồn liên quan → nêu encoder được chuyển, phép đo sau tinh chỉnh và giới hạn lệch nhiệm vụ; LLO16/CLO3,4 | D02 gộp trực quan–hình thức–ví dụ khái quát; D06.1 buộc nộp phương án trên dữ kiện cụ thể. “Nếu điểm đầu xấu, học một nhiệm vụ có nhãn dễ hơn để tạo điểm đầu.” |
| Phương pháp tiếp tục | D01 | D03 và SVG | D03 | D03 | D06.2 | D06.2 | Chuỗi mục tiêu $J^{(0)},J^{(1)},J$ ngày càng ít làm trơn → thiết kế khởi tạo ấm, phép đo từng giai đoạn và giới hạn nhánh nghiệm; giữ $J^{(k)},\theta^{*(k)}$; LLO16/CLO3,4 | D03 gọi rõ ví dụ tịnh tiến là minh họa khởi tạo ấm; D06.2 gộp ứng dụng–bài tập–giới hạn trên tình huống cụ thể. |
| Học theo chương trình | D01 | D04 và SVG | D05 | D04 | D05, D06.3 | D06.3 | Chuỗi dài làm gradient tăng vọt → thiết kế $q_t$ theo độ dài, đo trên phân phối đích và nêu giới hạn lịch sai; giữ $c(z),q_t,E,K$; LLO16/CLO3,4 | D04 gộp trực quan–hình thức; D05 gộp ví dụ–ứng dụng; trang tổng hợp cũ gộp vào D06. Toàn mạch D: $0{,}45$ LT + $0{,}10$ BT. |
| Tích hợp quyết định | Z01 | không áp dụng: bảng quyết định đã là ánh xạ | Z02 | Z03 | Z01–Z02 | Z02 | Bốn cụm → chẩn đoán và thiết kế kế hoạch; LLO14–16/CLO2–4 | Chu trình rút gọn tổng kết → vận dụng → tự kiểm; Z03 gộp ranh giới với tài liệu và chuyển tiếp, URL chi tiết ở ghi chú. P+Z: $0{,}30$ LT + $0{,}20$ BT. |

## Phân bổ thời lượng

Đơn vị trong bảng là **tiết**. Tổng phân bổ là **2,00 tiết lý thuyết (LT) + 1,00 tiết bài tập (BT)**.

| Mạch | LT | BT | Lý do phân bổ |
|---|---:|---:|---|
| P và Z | 0,30 | 0,20 | Mở bài, khóa minh chứng, tổng hợp và tự kiểm; không dạy thêm khái niệm. |
| A | 0,40 | 0,20 | Ba bộ tối ưu thích nghi dùng một vết số, giải thích vòng đầu và so sánh vòng hai. |
| B | 0,40 | 0,30 | Hai phép tính CG/BFGS và bài chọn công cụ đo trực tiếp LLO15. |
| C | 0,45 | 0,20 | Ba chiến lược cục bộ có ví dụ và khung đánh giá riêng. |
| D | 0,45 | 0,10 | Ba tuyến huấn luyện cần đủ động cơ, cơ chế và giới hạn. |
| **Tổng** | **2,00** | **1,00** | Đúng 2 LT + 1 BT trong đề cương. |

C và D mỗi mạch nhận $0{,}45$ LT để phát triển đủ sáu chiến lược. P và Z nhận $0{,}30$ LT + $0{,}20$ BT để khóa đầu vào, thu hồi quyết định và tự kiểm. B nhận $0{,}30$ BT vì phải đo hai phép tính độc lập và một quyết định lựa chọn.

## Bảng từng trang

| Mã | Lý do tồn tại và nhu cầu giải quyết | Quan hệ trước → sau | LLO/CLO hoặc minh chứng | Quyết định |
|---|---|---|---|---|
| P00 | Định danh đúng Buổi 6 và phạm vi tiếp nối Bài 05. | Mở bài → khóa tiên quyết. | Phạm vi đề cương. | thêm: cần trang tiêu đề. |
| P01 | Khóa miền, kích thước và quy ước đồng thời chuyển LLO14–16 thành ba sản phẩm quan sát được. | Bài 05 → vấn đề trung tâm. | LLO14: A08; LLO15: B06, B08, B09; LLO16: C07.1–3, D06.1–3. | gộp P01/P02 cũ: hai nhóm thông tin cùng phục vụ hợp đồng học tập, vừa trong một lưới hai cột. |
| P02 | Cho người học biết ba quyết định nối nhau và C/D cùng đổi đối tượng can thiệp. | Mục tiêu → nhu cầu A01. | Bản đồ đánh giá tích hợp. | đổi mã từ P03: renumber liên tục sau khi gộp mở bài. |
| A01 | Một $\eta$ chung không đáp ứng các tọa độ khác thang. | P02 → A02. | Chẩn đoán LLO14. | giữ: nhu cầu bắt buộc. |
| A02 | Hình cho thấy lịch sử bình phương điều khiển độ dài bước. | A01 → ví dụ số. | Trực giác LLO14. | thêm: không mở bằng công thức. |
| A03 | Làm cụ thể ba loại bộ nhớ trên cùng $g_1$ trước khi đặt công thức thuật toán. | Trực quan → AdaGrad. | Ví dụ LLO14: $r_1=(4,1)$, $v_1=(0{,}4,0{,}1)$, $m_1=(0{,}2,0{,}1)$. | sửa: ba fragment hiện lần lượt tổng không quên, trung bình có quên và hướng có quán tính; dữ kiện $g_2$ truyền sang A08. |
| A04 | Nêu đầy đủ đầu vào, trạng thái, cập nhật và giới hạn AdaGrad. | Ví dụ → RMSProp. | Vận dụng AdaGrad. | giữ: thuật toán đề cương. |
| A05 | Thay tổng toàn lịch sử bằng trung bình mũ để thích nghi cục bộ. | AdaGrad → Adam. | Vận dụng RMSProp. | giữ: thuật toán đề cương. |
| A06 | Khóa hai mômen, tích theo phần tử, hiệu chỉnh lệch và trạng thái checkpoint. | RMSProp → lựa chọn. | Vận dụng Adam. | sửa: dùng $g_t\odot g_t$ và nêu $\theta_t,m_t,v_t,t$. |
| A07 | Biến ba công thức thành quy trình có dừng, chi phí và giới hạn. | Hình thức → bài tập. | Chọn thuật toán LLO14. | thêm: ứng dụng bắt buộc. |
| A08 | Buộc tính vòng hai rồi so sánh cơ chế nhớ trên đúng dữ kiện A03. | Kết cụm A → nhu cầu độ cong. | Bài tập LLO14/CLO2,3. | sửa: hiển thị $r_2,v_2,\widehat m_2,\widehat v_2$, $\theta_2$ và kết luận nhớ toàn bộ/quên dần/hướng–thang. |
| B01 | Co giãn chéo không nắm tương tác giữa tọa độ. | A08 → Taylor. | Chẩn đoán LLO15. | thêm: nhu cầu bậc hai. |
| B02 | Taylor bậc hai làm rõ Hessian biến gradient thành bước. | Nhu cầu → ví dụ giảm chấn. | Trực giác và hình thức LLO15. | giữ: cầu toán học. |
| B03 | Phản ví dụ Hessian bất định chứng minh Newton thuần có thể không giảm. | Taylor → thuật toán Newton. | Tính được LLO15. | thêm: trường hợp biên bắt buộc. |
| B04 | Nêu đầu vào/ra/dừng/chi phí và điều kiện tạo hướng giảm. | Ví dụ → HF–CG. | Vận dụng Newton. | sửa: tăng $\lambda$ để $B\succ0$ hoặc kiểm $g^Tp<0$ trước tìm kiếm đường. |
| B05 | Gắn thuật toán CG với toán tử HF có giả thiết SPD rõ. | Newton → ví dụ CG. | Hình thức LLO15. | gộp B05/B06 cũ: $G\succeq0$, $\lambda>0$ suy ra $B\succ0$. |
| B06 | Cho phép tính đủ hai vòng CG và nghiệm kiểm trực tiếp. | Thuật toán CG → BFGS. | Minh chứng tính LLO15/CLO2,3. | sửa vai trò: dùng ma trận $\begin{pmatrix}4&1\\1&2\end{pmatrix}$ và nghiệm $(2/7,-1/7)$. |
| B07 | Trình bày BFGS và L-BFGS trong cùng một luận điểm về cặp cong và bộ nhớ. | CG → ví dụ BFGS. | Hình thức LLO15. | gộp B07/B08 cũ để giảm tải trang. |
| B08 | Kiểm một cập nhật BFGS, tính hướng và dấu tích vô hướng. | Hình thức BFGS → chọn công cụ. | Minh chứng tính LLO15/CLO2,3. | sửa vai trò: $M_1$, $p$ và $g^Tp=-2{,}75$. |
| B09 | Đo khả năng ghép cấu trúc bài toán với Newton/HF/L-BFGS. | Kết B → thay đổi bài toán ở C. | Bài tập LLO15/CLO2,3. | thêm: đo chuyển giao. |
| C01 | Mở nhu cầu chiến lược ngoài bộ tối ưu. | B09 → BN. | Chẩn đoán LLO16. | thêm: tránh danh sách rời. |
| C02 | BN là tái tham số hóa theo thống kê lô, không phải bộ tối ưu. | Nhu cầu → ví dụ BN. | Chiến lược 1 LLO16. | giữ: khóa huấn luyện/suy diễn. |
| C03 | Ví dụ $h=(1,3)$ kiểm được phép chuẩn hóa với $\epsilon=0{,}01$ và tách kết quả thật khỏi giới hạn lý tưởng. | BN hình thức → hạ tọa độ. | Minh chứng tính BN cho LLO16. | sửa: không đặt $\epsilon=0$ trong thuật toán; ghi $\epsilon\to0^+$ riêng. |
| C04 | Hạ tọa độ khai thác cấu trúc tách hoặc nghiệm khối rẻ. | BN → phản ví dụ. | Chiến lược 2 LLO16. | giữ: đủ đầu vào/ra/dừng. |
| C05 | Hàm ghép mạnh cho thấy hạ tọa độ có thể tiến rất chậm và buộc phân biệt một cập nhật vô hướng với một chu kỳ đầy đủ. | Hạ tọa độ → Polyak. | Trường hợp biên LLO16; hệ số $0{,}9901$ và $0{,}9803$. | sửa: khóa đúng đơn vị tiến triển của thuật toán. |
| C06 | Ví dụ bốn điểm dao động cho phép tính trực tiếp $\widehat\theta_4=(0,0)$ và chỉ ra Polyak không đổi cập nhật gốc. | Phản ví dụ → khung đánh giá. | Minh chứng tính Polyak cho LLO16. | sửa: bổ sung ví dụ số kiểm được. |
| C07 | Đo riêng ba chiến lược theo tín hiệu–can thiệp–phép đo/giới hạn. | Kết C → nhu cầu D. | C07.1 BN; C07.2 hạ theo khối; C07.3 Polyak. | đổi mã từ C08 để mạch liên tục; giữ ba minh chứng chấm độc lập. |
| D01 | Một điểm đầu xấu cần thay tuyến bài toán, không chỉ bước cục bộ. | C07 → tiền huấn luyện. | Nhu cầu LLO16. | thêm: mở mạch nhân quả. |
| D02 | Tiền huấn luyện dùng mô hình/nhiệm vụ dễ làm điểm đầu rồi tinh chỉnh chung. | Nhu cầu → tiếp tục hóa. | Chiến lược 4 LLO16. | giữ: phân biệt với khởi tạo ngẫu nhiên. |
| D03 | Định nghĩa chuỗi mục tiêu, minh họa khởi tạo ấm và nêu cơ chế làm trơn/độ khó tăng. | Tiền huấn luyện → chương trình học. | Minh chứng giải thích chiến lược 5 LLO16. | sửa: không trình bày ví dụ tịnh tiến như minh họa làm trơn. |
| D04 | Chương trình học hiện thực hóa tiếp tục hóa bằng phân phối ví dụ thay đổi. | Tiếp tục hóa → ví dụ lịch. | Chiến lược 6 LLO16. | giữ: nêu $q_t$. |
| D05 | Lịch ngẫu nhiên giữ cả ví dụ dễ/khó và tăng dần tỷ trọng khó. | Hình thức → khung đánh giá. | Ứng dụng LLO16. | thêm: ví dụ kiểm được. |
| D06 | Buộc nộp ba phương án độc lập trên ba tình huống có dữ kiện; đáp án can thiệp và phép đo/giới hạn chỉ hiện sau bằng fragment. | Kết D → tổng hợp. | D06.1 tiền huấn luyện; D06.2 tiếp tục; D06.3 chương trình học. | sửa và đổi mã từ D07: tình huống 200/50.000 nhãn, chuỗi mục tiêu ít làm trơn dần và chuỗi dài gây gradient tăng vọt; ghi chú có đáp án đầy đủ. |
| Z01 | Gom ba quyết định thành bảng chọn công cụ theo tín hiệu. | A–D → bài tích hợp. | Tổng hợp LLO14–16. | thêm: thu hồi vấn đề trung tâm. |
| Z02 | Một tình huống yêu cầu phối hợp Adam/HF/BN/curriculum mà không lẫn vai trò. | Bảng quyết định → ranh giới. | Bài tập tích hợp CLO2–4. | thêm: đánh giá tổng hợp. |
| Z03 | Tách bảo đảm có điều kiện khỏi heuristic, giữ nguồn cốt lõi và nối sang Bài 07. | Bài tập → Bài 07. | Phản biện kết luận, tự học và kiểm chứng nguồn. | gộp Z03/Z04 cũ ở mức vừa phải; mặt trang chỉ giữ nguồn cốt lõi, URL chi tiết chuyển vào ghi chú. |

## Quyết định cấu trúc

- Đúng 36 trang và 6 `<section>` ngoài. P01/P02 cũ được gộp thành P01; Z03/Z04 cũ được gộp thành Z03. C08 đổi mã thành C07 và D07 đổi mã thành D06 để các mạch liên tục. Không có trang trang trí.
- So với nguồn chính, thứ tự giữ `8.5 → 8.6 → 8.7`; trong 8.7 tách thành `C` (BN, hạ tọa độ, Polyak) và `D` (tiền huấn luyện, tiếp tục hóa, chương trình học) để mỗi mạch có đầu vào và đầu ra rõ.
- Mọi thay đổi số lượng so với các trang PDF tham khảo là có chủ ý: không sao chép một-một; chỉ giữ khái niệm, giả thiết, ví dụ và bài tập cần cho LLO14–16.
