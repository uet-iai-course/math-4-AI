# Storyboard Bài giảng 05 — Tối ưu bậc nhất cho học máy

## 1. Bản đồ bảy mạch

| Mạch | Chức năng | Đầu vào | Đầu ra | Điểm nhấn |
|---|---|---|---|---|
| P — Mở đầu | Đổi bối cảnh từ tối ưu hàm xác định sang học từ dữ liệu | Khuôn hướng–bước–dừng Bài 04 | Vấn đề trung tâm và ba sản phẩm LLO | tối ưu lô nhỏ nhưng đánh giá ngoài mẫu |
| A — Mục tiêu học máy | Phân biệt đại lượng tối ưu, đại lượng đích và ước lượng dùng chọn dừng | Kỳ vọng, mất mát | $R$, $\widehat R_n$, $\widehat R_{\mathrm{val}}$, hàm thay thế, dừng sớm | giảm huấn luyện chưa đủ |
| B — Thách thức mạng sâu | Chẩn đoán hình học, phi lồi và độ sâu | Gradient, Hessian, dây chuyền | Phân biệt cực tiểu cục bộ/toàn cục, cực đại, yên ngựa; ánh xạ tín hiệu sang A/C/D/E | không quy mọi lỗi cho cực tiểu địa phương |
| C — Gradient ngẫu nhiên (SGD)/lô nhỏ | Đổi gradient toàn bộ lấy ước lượng rẻ nhưng nhiễu | Dạng tổng từ A; $C_{\nabla}$; chẩn đoán B | SGD, mô hình chỉ số có hoàn lại, điều kiện không chệch và giới hạn bảo đảm | chi phí–nhiễu–ổn định |
| D — Momentum/Nesterov | Thêm trạng thái để xử lý dao động và hướng nhất quán | Cập nhật SGD; khe hẹp B | Hai quy tắc cùng vết số | nơi tính gradient là khác biệt chính |
| E — Khởi tạo | Phá đối xứng đầy đủ và giữ mômen tín hiệu ban đầu | Mômen bậc hai; gradient qua sâu B | Chọn Xavier hoặc He từ $c_\phi fan_{in}\operatorname{Var}(W)$ | phương sai khác độ lệch chuẩn |
| Z — Kết luận | Thu hồi toàn tuyến và khóa ranh giới bảo đảm | Sản phẩm A–E | Bảng quyết định, bài tích hợp, cầu Bài 06 | bằng chứng có điều kiện |

Deck có đúng bảy `<section>` ngoài, gồm mở đầu P và kết luận Z. P03 trình bày năm câu hỏi phụ thuộc nhau dưới dạng lưới, không dùng mũi tên gợi một trình tự sai. Cầu nối: P03→A01 đặt sai khác giữa đại lượng tối ưu và đích; A05 giữ dạng tổng cho C rồi A06→B01 hoàn tất chẩn đoán; B06 ánh xạ tín hiệu sang công cụ phù hợp; C07→D01 nêu tăng lô giảm nhiễu nhưng không triệt dao động do điều kiện hóa; D06→E01 chỉ ra cập nhật tốt vẫn cần điểm đầu phá đối xứng và đúng thang; E07→Z01 tổng hợp các điều kiện thành hệ quyết định.

Bảy SVG dùng trong deck là `risk-curves.svg`, `ill-conditioning.svg`, `saddle.svg`, `gradient-chain.svg`, `minibatch-unbiased-variance.svg`, `momentum-lookahead.svg` và `variance-flow.svg`. Mỗi hình phục vụ đúng một quan hệ định lượng hoặc hình học trong A04, B01, B02, B04, C02, D04 và E02.

Sau kiểm định storyboard, ba mạch dùng thứ tự thật trong RevealJS: `A01→A03→A04→A02→A05→A06`, `C01→C03→C02→C04→C05→C06→C07` và `D01→D03→D02→D04→D05→D06`. Các đổi chỗ chỉ sửa quan hệ ví dụ/trực quan trước hình thức; tổng số vẫn là 40 trang trong 7 mạch.

## 2. Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm |
|---|---|---|---|---|---|---|---|
| Mục tiêu và thách thức học máy | A01, B01 | A04, B01–B04 | A03; B02; B03 với $f(x)=x^4/4-x^3/3-x^2$; B04 | A02, A05, B02–B04 | A04, A05, B05 | A06, B06 | mất mát, kỳ vọng, $\widehat R_{\mathrm{val}}$, Hessian, $J_\ell\in\mathbb R^{d_\ell\times d_{\ell-1}}$ → phân biệt mục tiêu và chẩn đoán LLO11; 0,60 LT + 0,25 BT |
| SGD, momentum, Nesterov | C01, D01 | C03, D01, D04 | C03, C07, D03, D06 | C02, C04, C06, D02, D05 | C05, D06 | C07, D06 | $F,\theta_0,I_{t,j},B_t,b_t,C_{\nabla},\eta,\beta,v_0$ → phân biệt vết cố định với mô hình có hoàn lại, tính hai vòng và kiểm giả thiết LLO12; 0,70 LT + 0,50 BT |
| Khởi tạo | E01 | E02 | E01, E04, E05 | E02–E05 | E06 | E07 | E01 khóa hoán vị đầy đủ $(w,b,\phi,c)$, cùng lô/trạng thái/cập nhật; E02 khóa công thức mômen và $c_\phi$; E04 dẫn thỏa hiệp Xavier từ hai mục tiêu; E05 dẫn He từ mômen ReLU → chọn thang, phá đối xứng LLO13; 0,45 LT + 0,15 BT |

Không tách sáu bước thành sáu trang máy móc. A03 là ví dụ dẫn nhập đứng trước trực quan A04 và phục vụ trực tiếp nhu cầu A01; A02 sau đó đặt tên hình thức cho đại lượng đích và đại lượng tối ưu. C03 khóa $F$, $b_t=1$, $B_0=(1)$, $B_1=(2)$, $\theta_0$ và hai mũi tên trước khi C02 định nghĩa đa tập tổng quát $B_t$, $g_t$ và tính không chệch; C02 dùng `minibatch-unbiased-variance.svg` để nối ví dụ với kết quả $1/b_t$. D03 tự nêu quy tắc vận tốc số theo quy ước độ dời; D02 chỉ khái quát cùng quy ước, không đổi dấu hay chuẩn hóa lại vận tốc. Với E, E01 dùng phản ví dụ có đủ tham số và trạng thái bộ tối ưu để mở nhu cầu phá đối xứng; E02 khóa đầy đủ ánh xạ có kiểu trước công thức phương sai; E03 chỉ đổi giữa Var, Std và nửa độ rộng; E04–E05 đều đặt dữ kiện số trước rồi mới khái quát Xavier/He. Chu trình được đóng bởi A05–A06, C05–C07, D06 và E06–E07.

### Thời lượng nội bộ của các cụm

| Cụm | Lý thuyết | Bài tập | Tổng |
|---|---:|---:|---:|
| P và chuyển mạch | 0,15 | 0,00 | 0,15 |
| A–B: mục tiêu và thách thức | 0,60 | 0,25 | 0,85 |
| C–D: SGD, momentum, Nesterov | 0,70 | 0,50 | 1,20 |
| E: khởi tạo | 0,45 | 0,15 | 0,60 |
| Z: tổng hợp | 0,10 | 0,10 | 0,20 |
| **Tổng** | **2,00** | **1,00** | **3,00** |

## 3. Vai trò từng trang

| Mã | Lý do tồn tại | Quan hệ trước → sau | LLO/CLO | Quyết định |
|---|---|---|---|---|
| P00 | Định danh đúng Buổi 5 và chủ đề | mở bài → P01 | định hướng | giữ — định danh buổi và bối cảnh còn cần thiết |
| P01 | Khóa tiên quyết và kiểu đại lượng | chủ đề → P02 | tiên quyết | giữ — khóa đầu vào trước mục tiêu học tập |
| P02 | Thao tác hóa LLO11–13 thành sản phẩm đánh giá | tiên quyết → P03 | LLO11–13 | giữ — ba sản phẩm đo được vẫn khớp đề cương |
| P03 | Đặt năm câu hỏi thiết kế và vấn đề trung tâm | mục tiêu → A01 | toàn bài | sửa — dùng lưới không thứ tự thay chuỗi mũi tên gây hiểu nhầm |
| A01 | Tạo nhu cầu phân biệt tối ưu với học | P03 → A03 | LLO11 | giữ — tạo nhu cầu trước ví dụ dẫn nhập |
| A03 | Cho ví dụ hàm thay thế tính được | A01 → A04 | LLO11 | sửa — đưa trước hình thức và nối định tính sang xác thực |
| A04 | Biến khoảng cách tổng quát hóa thành quyết định dừng | A03 → A02 | LLO11 | sửa — chỉ dùng nhãn huấn luyện/xác thực trước khi có $R,\widehat R_n$ |
| A02 | Khóa $R$ và $\widehat R_n$ | A04 → A05 | LLO11 | sửa — hình thức hóa sau ví dụ và trực quan |
| A05 | Nối dạng tổng với batch/minibatch | A02 → A06 | LLO11 | giữ — dùng trực tiếp $\widehat R_n$ vừa được khóa |
| A06 | Đo khả năng phân loại ba loại lỗi | cấu trúc tổng → B01 | LLO11 | giữ — bài tập đóng đúng LLO11 |
| B01 | Tạo nhu cầu từ điều kiện hóa | lỗi mục tiêu → B02 | LLO11 | giữ — trực quan khe hẹp mở chẩn đoán |
| B02 | Chứng minh gradient bằng không chưa đủ trong phi lồi | khe hẹp → B03 | LLO11 | giữ — ví dụ số phân biệt điểm dừng |
| B03 | Phân biệt ba loại điểm dừng bằng ví dụ tính được | ví dụ yên ngựa 2D → B04 | LLO11 | sửa — thêm cực tiểu cục bộ kém, cực tiểu toàn cục và cực đại trước khi chuyển cơ chế |
| B04 | Nối độ sâu với tích Jacobian có kiểu | phi lồi → B05 | LLO11 | sửa — định nghĩa $J_\ell$ và kích thước trước tích |
| B05 | Phân biệt nhiễu với thông tin cục bộ | dây chuyền → B06 | LLO11 | giữ — tách hai giới hạn cần công cụ khác nhau |
| B06 | Đo khả năng phân loại điểm dừng rồi đóng bộ chẩn đoán và phân luồng | thách thức → C01/D/E | LLO11 | sửa — ba trường hợp buộc phân loại trước khi hiện đáp án; giữ ánh xạ tổng quát hóa/nhiễu/điều kiện hóa/độ sâu sang A/C/D/E dưới nhãn “Mạch xử lý” |
| C01 | Định lượng nhu cầu giảm chi phí mỗi bước | chẩn đoán và A05 → C03 | LLO12 | sửa — dùng $O(nC_{\nabla})\to O(b_tC_{\nabla})$ |
| C03 | Khóa dữ kiện hai mẫu, lô một phần tử và hai mũi tên | C01 → C02 | LLO12 | sửa — định nghĩa $B_0=(1)$, $B_1=(2)$ tại chỗ; chưa suy tính không chệch |
| C02 | Nêu chỉ số lấy mẫu, đa tập, trực quan phương sai và tính không chệch | C03 → C04 | LLO12 | sửa — định nghĩa $I_{t,j}$, $B_t$, $g_t(q)$ với lấy độc lập có hoàn lại; dùng SVG phương sai |
| C04 | Gom một vòng SGD đủ thao tác | hình thức → C05 | LLO12 | giữ — dùng đúng $g_t$ vừa định nghĩa |
| C05 | Cho quyết định $\eta_t$ và $b_t$ | thuật toán → C06 | LLO12 | giữ — ứng dụng đánh đổi trước bảo đảm |
| C06 | Khóa điều kiện bước, không chệch, cận phương sai đều, tính trơn, bị chặn dưới và hai tổng Robbins–Monro | ứng dụng → C07 | LLO12 | sửa — mọi giả thiết được bài C07 kiểm đều xuất hiện trên mặt trang |
| C07 | Phân biệt vết cố định với mô hình ngẫu nhiên và kiểm giả thiết | bảo đảm → D01 | LLO12 | sửa — nhắc lại $F=\tfrac12\theta_1^2+2\theta_2^2+\tfrac52$ trên mặt để bài tự chứa; tính $L=4$, cận dưới và cận đều $\sigma^2=17/b$; chỉ ra $\eta_t=0{,}1$ không thỏa tổng bình phương |
| D01 | Tạo nhu cầu quán tính từ dao động/nhiễu | SGD → D03 | LLO12 | giữ — trực quan mở nhu cầu bộ nhớ hướng |
| D03 | Tính vết quán tính tự đủ dữ kiện | D01 → D02 | LLO12 | sửa — đưa trước hình thức và tự định nghĩa vận tốc số |
| D02 | Khóa quy ước momentum | D03 → D04 | LLO12 | sửa — khái quát đúng quy ước độ dời của ví dụ |
| D04 | Trực quan hóa điểm nhìn trước | momentum → D05 | LLO12 | giữ — chuẩn bị vị trí đánh giá gradient |
| D05 | Khóa công thức Nesterov | trực quan → D06 | LLO12 | giữ — giữ cùng quy ước vận tốc toàn mạch |
| D06 | So sánh ba vết và chặn xếp hạng | hình thức → E01 | LLO12 | sửa — giữ một luận điểm trên mặt; chuyển nhắc về điểm đầu sang notes để nối E01 mà không tăng tải |
| E01 | Chứng minh khởi tạo đối xứng không tự tách | cập nhật → E02 | LLO13 | sửa — khóa tham số, trạng thái bộ tối ưu, cùng lô và cùng cập nhật xác định |
| E02 | Khóa ánh xạ có kiểu và mômen bậc hai qua lớp | đối xứng → E03 | LLO13 | sửa — giải nghĩa hai fan, khóa $a,W,z$ nhất quán với kiểu ma trận; nêu các giả thiết độc lập và trung bình $0$; dùng $\mathbb E[a_k^2]$ tổng quát và định nghĩa $c_\phi$ |
| E03 | Chuyển phương sai mục tiêu thành tham số phân phối | trực quan → E04 | LLO13 | sửa — bỏ lặp kích thước, chỉ phân biệt Var/Std/nửa độ rộng |
| E04 | Dùng lớp $4\to2$ để dẫn Xavier | kiểu → E05 | LLO13 | sửa — hai mục tiêu thuận/ngược $1/fan_{in}$, $1/fan_{out}$ dẫn thỏa hiệp $2/(fan_{in}+fan_{out})$ |
| E05 | Dùng ReLU với $fan_{in}=4$ để dẫn He | Xavier → E06 | LLO13 | sửa — đặt dữ kiện và kết quả số trước quy tắc tổng quát |
| E06 | Chuyển công thức thành quyết định | hai quy tắc → E07 | LLO13 | giữ — ứng dụng dùng đúng Xavier/He |
| E07 | Đo tính toán và giải thích đối xứng | ứng dụng → Z01 | LLO13 | giữ — bài tập đóng đủ hai tuyến của mạch E |
| Z01 | Trả lời vấn đề trung tâm bằng hệ quyết định | A–E → Z02 | LLO11–13 | sửa — xếp điểm đầu trước cập nhật, tách đánh giá/dừng và nêu quan hệ phụ thuộc cụ thể |
| Z02 | Đo chuyển giao trên mạng ReLU mới khởi tạo | bảng → Z03 | LLO11–13 | sửa — hiện $F,\theta_0,\eta,\beta,B_0,B_1$ để bài hai vòng tự chứa; dùng nhãn “Câu hỏi:”; thêm phương sai lô và dao động để phân biệt tăng $b$, momentum, dừng sớm và He |
| Z03 | Khóa khoảng cách lý thuyết–thực nghiệm | tự kiểm → Z04 | CLO1–2 | giữ — giới hạn bảo đảm được nêu đúng mức |
| Z04 | Truy nguyên nguồn và nối Bài 06 | kết luận → bài sau | đọc tiếp | giữ — cung cấp nguồn và cầu sang thuật toán thích nghi |

## 4. Quy tắc triển khai

- Mỗi trang có đúng một luận điểm trung tâm và notes gồm mạch nói cùng nguồn.
- Không hiển thị mã trang, thời lượng, nhãn tuyến hoặc tên nguồn ở chân trang nội dung.
- Hình đều tự vẽ; không dùng 6.S191 hay hình CVF/PMLR trực tiếp.
- `math-spec.md` là thẩm quyền cuối nếu công thức hoặc vết số khác nguồn trình bày.
