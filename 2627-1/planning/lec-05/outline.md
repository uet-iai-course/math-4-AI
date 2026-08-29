# Dàn ý Bài giảng 05 — Tối ưu bậc nhất cho học máy

## 1. Phạm vi và chuẩn đầu ra

- Buổi 5, đúng 2 tiết lý thuyết và 1 tiết bài tập; 40 trang, 7 mạch `P/A/B/C/D/E/Z`.
- **LLO11/CLO1:** “Hiểu sự khác biệt giữa tối ưu hóa trong học máy và tối ưu hóa thuần túy, cũng như các thách thức trong tối ưu mạng nơ-ron như điều kiện hóa kém, nhiều điểm cực trị cục bộ và độ sâu đồ thị tính toán.”
- **LLO12/CLO2:** “Hiểu và vận dụng được các thuật toán cơ bản như gradient descent ngẫu nhiên, momentum và momentum Nesterov.”
- **LLO13/CLO2:** “Hiểu và vận dụng được các chiến lược khởi tạo tham số.”
- Phạm vi dừng ở Goodfellow Chương 8, §§8.1–8.4. Không mở sang AdaGrad, RMSProp, Adam, chuẩn hóa theo lô hoặc phương pháp bậc hai.
- Vấn đề trung tâm: làm thế nào giảm mục tiêu trên lô nhỏ mà vẫn hướng tới dữ liệu chưa thấy, đồng thời kiểm soát nhiễu cập nhật và thang tín hiệu qua mạng sâu.
- Thứ tự triển khai sau kiểm định storyboard: `A01→A03→A04→A02→A05→A06`, `C01→C03→C02→C04→C05→C06→C07`, `D01→D03→D02→D04→D05→D06`. Ba đổi chỗ cục bộ đưa ví dụ hoặc trực quan lên trước phát biểu hình thức mà vẫn giữ 40 trang và 7 mạch.

## 2. Ví dụ và quy ước xuyên suốt

Ví dụ hai mẫu dùng cho gradient ngẫu nhiên (SGD), momentum và Nesterov:

$$
\ell_1(\theta)=\frac12[(\theta_1-1)^2+4(\theta_2-1)^2],\qquad
\ell_2(\theta)=\frac12[(\theta_1+1)^2+4(\theta_2+1)^2].
$$

$$
F(\theta)=\frac12\theta_1^2+2\theta_2^2+\frac52,\quad
\theta_0=(2,1),\quad v_0=0,\quad \eta=0{,}1,\quad \beta=0{,}5.
$$

Hai lô đơn cố định là $B_0=\{1\}$, $B_1=\{2\}$. Đây là vết tính tái lập, không dùng để chứng minh tính không chệch. Trong mô hình không chệch, $B_t=(I_{t,1},\ldots,I_{t,b_t})$ là đa tập các chỉ số độc lập, đều và có hoàn lại. Quy ước vận tốc:

$$
v_{t+1}=\beta v_t-\eta_t g_t(\theta_t),\qquad \theta_{t+1}=\theta_t+v_{t+1}.
$$

Nesterov dùng $q_t=\theta_t+\beta v_t$ và tính $g_t(q_t)$. Khởi tạo dùng $W\in\mathbb R^{fan_{out}\times fan_{in}}$; ví dụ số khóa $fan_{in}=4$, $fan_{out}=2$.

## 3. Tuyến 40 trang

| Mạch | Trang | Luận điểm trung tâm | Vai trò |
|---|---|---|---|
| P | P00 | Bài 05 nối khuôn hướng–bước–dừng với học từ dữ liệu | định danh |
| P | P01 | Bài dùng lại gradient, Hessian, xác suất và quy tắc dây chuyền | tiên quyết |
| P | P02 | LLO11–13 được rút thành ba sản phẩm quan sát được: phân biệt/chẩn đoán, tính hai vòng, chọn và tính thang | mục tiêu |
| P | P03 | Năm quyết định A–E trả lời vấn đề tối ưu trên lô nhỏ và dữ liệu chưa thấy; không phải thứ tự thời gian | bản đồ |
| A | A01 | Tối ưu huấn luyện là phương tiện, không phải mục tiêu cuối | nhu cầu |
| A | A03 | Mất mát 0–1 tạo ví dụ dẫn nhập cho đại lượng huấn luyện thay thế | ví dụ dẫn nhập |
| A | A04 | Hai đường huấn luyện–xác thực tạo trực quan; $\widehat R_{\mathrm{val}}$ là ước lượng hữu hạn dùng chọn dừng, không phải $R$ | trực quan/ứng dụng |
| A | A02 | Rủi ro kỳ vọng, thực nghiệm và vai trò riêng của ước lượng xác thực được hình thức hóa | hình thức |
| A | A05 | Dạng tổng theo mẫu cho phép batch và minibatch | ứng dụng cấu trúc |
| A | A06 | Phân loại lỗi tối ưu, tổng quát hóa và sai mục tiêu | bài tập LLO11 |
| B | B01 | Điều kiện hóa kém làm một bước vô hướng phải thỏa hiệp | nhu cầu/trực quan |
| B | B02 | Gradient bằng không có thể là điểm yên ngựa | ví dụ/hình thức |
| B | B03 | Ví dụ $f(x)=x^4/4-x^3/3-x^2$ phân biệt cực tiểu cục bộ kém, cực tiểu toàn cục và cực đại; B02 giữ vai trò điểm yên ngựa | ví dụ/hình thức |
| B | B04 | Định nghĩa $J_\ell=\partial h_\ell/\partial h_{\ell-1}$ cùng kích thước trước khi dùng tích Jacobian | trực quan/ví dụ |
| B | B05 | Nhiễu lô nhỏ và tính cục bộ là hai giới hạn khác nhau | tổng hợp |
| B | B06 | Người học phân loại yên ngựa, cực tiểu cục bộ kém và cực đại trước khi hiện đáp án; chẩn đoán vẫn ánh xạ sang A/C/D/E dưới nhãn “Mạch xử lý” | bài tập LLO11 |
| C | C01 | Với $C_{\nabla}$ là chi phí một gradient mẫu, chi phí đổi từ $O(nC_{\nabla})$ sang $O(b_tC_{\nabla})$ | nhu cầu |
| C | C03 | Hai mất mát bậc hai khóa $F$, $b_t$, các lô và trực quan hai mũi tên gradient | ví dụ/trực quan |
| C | C02 | Định nghĩa chỉ số độc lập $I_{t,j}$, đa tập có hoàn lại và $g_t(q)$ trước phát biểu không chệch | hình thức |
| C | C04 | SGD là vòng lấy lô–tính gradient–cập nhật–đánh giá | thuật toán |
| C | C05 | $\eta_t$ và $b_t$ điều khiển chi phí, nhiễu và ổn định | ứng dụng |
| C | C06 | Bảo đảm SGD nêu cận phương sai đều có điều kiện theo $\theta_t$ và kết luận đúng mức; chi tiết tổng nằm trong notes | ranh giới lý thuyết |
| C | C07 | Phân biệt vết lô cố định với mô hình độc lập có hoàn lại; chứng minh $\sigma^2=17/b$ đúng với mọi $\theta$, rồi kiểm tra $L=4$, cận dưới và lịch bước hằng | bài tập LLO12 |
| D | D01 | Tăng lô giảm nhiễu nhưng không triệt dao động do điều kiện hóa; trạng thái vận tốc xử lý cơ chế thứ hai | nhu cầu/trực quan |
| D | D03 | Vết hai bước tự định nghĩa vận tốc cụ thể và cho thấy quán tính ở vòng hai | ví dụ dẫn nhập |
| D | D02 | Momentum khái quát đúng quy ước độ dời đã dùng trong vết số | hình thức |
| D | D04 | Nesterov tính gradient tại điểm nhìn trước | trực quan |
| D | D05 | Công thức Nesterov giữ cùng quy ước vận tốc | hình thức |
| D | D06 | So sánh ba vết số, khóa $g_1(q_1),v_2$ và nối rõ sang yêu cầu chọn điểm đầu | bài tập LLO12 |
| E | E01 | Hoán vị đầy đủ $(w,b,\phi,c)$, cùng lô và cập nhật giữ các đơn vị đối xứng trong cùng quỹ đạo | nhu cầu/phản ví dụ |
| E | E02 | Với hàng $W_{j,:}$ độc lập với véc-tơ $a$ tại khởi tạo và các trọng số trong hàng độc lập, trung bình $0$, công thức mômen bậc hai chuẩn bị Xavier/He | trực quan/tiên quyết toán |
| E | E03 | Phương sai mục tiêu quyết định độ lệch chuẩn hoặc nửa độ rộng của phân phối | chuyển đổi kiểu đại lượng |
| E | E04 | Hai mục tiêu $1/fan_{in}$ và $1/fan_{out}$ dẫn tới thỏa hiệp Xavier $2/(fan_{in}+fan_{out})$ | ví dụ → hình thức |
| E | E05 | Dữ kiện ReLU với $fan_{in}=4$ dẫn tới và khái quát quy tắc He | ví dụ → hình thức |
| E | E06 | Hàm kích hoạt quyết định quy tắc khởi tạo ban đầu | ứng dụng |
| E | E07 | Tính thang và kiểm tra đối xứng dưới đúng giả thiết hoán vị/cập nhật | bài tập LLO13 |
| Z | Z01 | Hệ quyết định tách mục tiêu, điểm đầu, chẩn đoán, cập nhật, đánh giá/dừng; không phải thứ tự thời gian | tổng kết |
| Z | Z02 | Bài tích hợp trên mạng ReLU mới khởi tạo phân biệt vai trò tăng $b$, momentum, dừng sớm và He | tự kiểm tra |
| Z | Z03 | Bảo đảm cổ điển không chuyển nguyên xi sang mạng sâu hữu hạn | kết luận giới hạn |
| Z | Z04 | Nguồn và cầu nối sang thuật toán thích nghi Bài 06 | đọc tiếp |

## 4. Phân bổ nội bộ

| Mạch | Lý thuyết | Bài tập |
|---|---:|---:|
| P và chuyển mạch | 0,15 | 0,00 |
| A — mục tiêu học máy | 0,30 | 0,10 |
| B — thách thức mạng sâu | 0,30 | 0,15 |
| C — SGD/lô nhỏ | 0,35 | 0,25 |
| D — momentum/Nesterov | 0,35 | 0,25 |
| E — khởi tạo | 0,45 | 0,15 |
| Z — tổng hợp | 0,10 | 0,10 |
| **Tổng** | **2,00** | **1,00** |

## 5. Nguồn và tài sản

- Goodfellow, Bengio và Courville (2016), *Deep Learning*, Chương 8, §§8.1–8.4.
- Glorot và Bengio (2010), PMLR 9; Sutskever và cộng sự (2013), PMLR 28(3); He và cộng sự (2015), ICCV/CVF.
- `sources/Chapter7-full1.pdf` chỉ đối chiếu thuật ngữ; không kế thừa hình.
- Sáu SVG tự vẽ: `risk-curves.svg`, `ill-conditioning.svg`, `saddle.svg`, `gradient-chain.svg`, `momentum-lookahead.svg`, `variance-flow.svg`.
- Không dùng `sources/6S191_MIT_DeepLearning_L1.pdf` và không dùng bản sách `z-lib.org` làm nguồn phát hành.
