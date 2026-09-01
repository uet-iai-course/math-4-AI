# Nhật ký rà soát Bài giảng 05 — Tối ưu bậc nhất cho học máy

## Trạng thái khởi tạo

- Đã đọc `plan.md`, `source-provenance.md`, `source-map.md` và `math-spec.md`.
- Đã khóa 40 trang theo thứ tự `P4/A6/B6/C7/D6/E7/Z4`, đúng bảy mạch gồm mở đầu và kết luận.
- `math-spec.md` được dùng làm thẩm quyền cuối cho quy ước SGD–momentum–Nesterov, vết số hai vòng và Xavier/He.
- Không phát hiện xung đột chưa giải quyết giữa bốn đặc tả. Tên tệp theo yêu cầu người dùng; tiêu đề phụ giữ tên chương trong đề cương.
- Codex Slides không có bề mặt Browser khả dụng trong phiên tác tử soạn này. Không tuyên bố đã mở, render hoặc kiểm định bằng Codex Slides; RevealJS cục bộ là bản triển khai để các vòng kiểm định sau tiếp tục.

## Nguồn và tài sản

- Nguồn nội dung: Goodfellow Chương 8 §§8.1–8.4; Glorot–Bengio 2010; He và cộng sự 2015; Sutskever và cộng sự 2013.
- `sources/Chapter7-full1.pdf` chỉ dùng đối chiếu thuật ngữ. Không dùng tệp 6.S191 hoặc bản sách phân phối không chính thức.
- Tạo mới sáu SVG cục bộ từ công thức: đường huấn luyện/xác thực, khe điều kiện kém, điểm yên ngựa, tích Jacobian, điểm nhìn trước Nesterov và lan truyền phương sai.
- Không sao chụp hình, bảng hoặc dữ liệu thực nghiệm của nguồn.

## Kiểm tra tiền bàn giao của tác tử soạn

### Sửa tiền kiểm định theo đặc tả đã duyệt

- Khôi phục đúng thứ tự mã và mẫu nguồn ở ba cụm: `A01→A02→A03→A04→A05→A06`, `C01→C02→C03→C04→C05→C06→C07`, `D01→D02→D03→D04→D05→D06`; giữ tổng số 40 trang và 7 mạch.
- Sửa P02 và ghi chú diễn giả để mô tả mục tiêu đã được thao tác hóa; không gọi phần hiển thị là bản trích nguyên văn.
- Sửa C06 theo `math-spec.md` §4: nêu $F\ge F_{\inf}$, gradient $L$-Lipschitz, lấy mẫu và không chệch có điều kiện, phương sai chặn, $0<\eta_t\le1/L$ và lịch bước có hai tổng thích hợp.
- Đồng bộ câu nối trước–sau, bản đồ hành trình và phân bổ 2 tiết lý thuyết + 1 tiết bài tập trong `outline.md`, `storyboard.md` và `source-map.md`.
- Các báo cáo độc lập vẫn ở trạng thái chờ; không gán năm, ngày hoặc kết quả cho báo cáo chưa nhận.

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| 40 `data-slide-id` duy nhất | đạt | đếm được 40 ID và 40 ID duy nhất, đúng P00–Z04 |
| 7 `<section>` ngoài | đạt | đếm được 7 mạch P/A/B/C/D/E/Z |
| Notes mọi trang | đạt | 40/40 trang có mạch nói và nguồn |
| Công thức/vết số | đã khóa | trùng `math-spec.md` §§2–6 |
| SVG và `alt` | đạt bước máy | 6/6 SVG phân tích XML được; mọi thẻ `img` có mô tả thay thế |
| HTML parser, đường dẫn, KaTeX | đạt bước máy | REXML sau khi bỏ doctype: đạt; 170 công thức KaTeX, 0 lỗi; 17 tham chiếu tương đối đều tồn tại |
| Chromium rộng/hẹp | chờ điều phối viên/vòng kiểm định | chưa thực hiện trong bước soạn |

## Cổng rà soát độc lập

- Kiểm định storyboard: chờ.
- Góc nhìn sinh viên: chờ.
- Chuyên gia nội dung: chờ.
- Độ chính xác toán học: chờ.
- Phản biện học thuật–giảng dạy: chờ.
- Mạch kể chuyện và điểm kết nối: chờ.

Không đánh dấu các vai độc lập là hoàn thành trong bước soạn–triển khai.

## Phản hồi kiểm định storyboard và vòng sửa hiện hành

Báo cáo `review-storyboard.md` xác định hai lỗi chặn bàn giao về tiên quyết ký hiệu, ba lỗi nghiêm trọng về thứ tự hành trình A/C/D, cùng các lỗi câu nối và đồng bộ hồ sơ. Điều phối viên đã duyệt sửa cục bộ, không thay đổi tổng số trang hay số mạch.

| Mã báo cáo | Quyết định hiện hành | Sửa đã phản ánh trong bản RevealJS và hồ sơ |
|---|---|---|
| SB-01 | sửa | A05 và C01 khóa $F(\theta)=\widehat R_n(\theta)$; C01 khóa $b_t$; C03 khóa $F,b_t,B_0,B_1,\theta_0$; C02 mới định nghĩa $g_t$ và phát biểu tính không chệch. |
| SB-02 | sửa | E02 nêu $W\in\mathbb R^{fan_{out}\times fan_{in}}$ và nghĩa của $fan_{in}$ trước công thức phương sai; E03 hoàn tất $fan_{out}$ và phân biệt $\operatorname{Var}$ với $\operatorname{Std}$. |
| SB-03 | sửa | Đổi tuyến A thành `A01→A03→A04→A02→A05→A06`; A03–A04 chỉ dùng nhãn định tính huấn luyện/xác thực trước khi A02 đặt $R,\widehat R_n$. |
| SB-04 | sửa | Đổi tuyến C thành `C01→C03→C02→C04…`; C03 được viết như ví dụ/trực quan hai mũi tên và không dựa vào định đề không chệch chưa nêu. |
| SB-05 | sửa | Đổi tuyến D thành `D01→D03→D02→D04…`; D03 tự nêu vận tốc số theo quy ước độ dời, D02 khái quát cùng quy ước; D06 giữ quyết định ứng dụng có điều kiện. |
| SB-06–SB-08 | sửa | Notes và storyboard ghi câu nối tại các ranh giới bị đổi; bản đồ hành trình bổ sung thời lượng A–B, C–D và E. |
| SB-09 | sửa | Dùng $b_t$ cho lô thay đổi theo vòng; ví dụ hằng ghi $b_t=b$ hoặc $b_t=1$. |
| SB-10 | giữ nguyên nguyên tắc | Notes chỉ dùng nguồn học thuật hoặc ghi ví dụ tự tạo; tệp planning chỉ còn trong hồ sơ truy nguyên. |

Tuyến dữ kiện khởi tạo hiện được ghi rõ: E01 chỉ là phản ví dụ phá đối xứng; E02–E03 khóa $W$, $fan_{in}$, $fan_{out}$, Var/Std; E04 dùng lớp $4\to2$ dẫn Xavier; E05 chuyển sang He. C06 được giữ đủ giả thiết đã khóa trong `math-spec.md`.

Vòng sửa này không tự kết luận cổng storyboard đã đạt. Cần một tác tử chỉ đọc kiểm định lại các mạch A, C, D, E, hai trang lân cận tại các ranh giới bị đổi và tính đồng bộ của bốn tệp hiện hành.

### SB-11 — tiên quyết và thứ tự ví dụ trong tuyến khởi tạo

- **Mức độ khi mở:** nghiêm trọng.
- **Vấn đề:** E02 chưa khóa đủ kiểu của $a$, $W$, $z$ và nghĩa hai fan trước công thức; E04–E05 nêu quy tắc tổng quát trước dữ kiện số nên ví dụ chưa dẫn tới hình thức.
- **Quyết định sửa:** E02 khóa $a\in\mathbb R^{fan_{in}}$, $W\in\mathbb R^{fan_{out}\times fan_{in}}$, $z=Wa\in\mathbb R^{fan_{out}}$, nghĩa $fan_{in}$, $fan_{out}$ và $a_k$ trước công thức. E03 rút về một luận điểm chuyển Var sang Std hoặc nửa độ rộng. E04 và E05 đặt dữ kiện cùng kết quả lớp $4\to2$ trước, rồi mới khái quát Xavier và He bằng $W_{jk}$. Notes E01 nối rõ phá đối xứng là cần nhưng chưa đủ.
- **Trạng thái:** đã sửa trong HTML và đồng bộ hồ sơ; chưa tự kết luận cổng đạt, chờ tác tử chỉ đọc kiểm định lại E01–E05.

Kiểm tra cốt lõi sau sửa SB-11: HTML phân tích được; đúng 40 ID duy nhất, 40 notes và 7 `<section>` ngoài; 186 biểu thức KaTeX không có lỗi sau khi giải mã thực thể HTML; 16 đường dẫn tương đối duy nhất đều tồn tại; bốn tệp Markdown hiện hành không dùng kiểu phân cách LaTeX thay thế và không có khoảng trắng cuối dòng. Đây là bằng chứng kỹ thuật của vòng sửa, không thay cho cổng kiểm định storyboard độc lập hoặc rà soát trực quan.

## Bằng chứng kiểm tra của tác tử soạn

- `git diff --check` không báo lỗi khoảng trắng.
- Không còn mã vị trí nội bộ trên mặt trang hoặc trong notes; mã chỉ nằm ở `data-slide-id`.
- Không sửa `2627-1/index.html`, CSS chung hoặc tài sản dùng chung.
- Chưa có Chromium trong phiên tác tử này; kiểm tra tràn 16:9 và màn hình hẹp vẫn thuộc vòng kiểm định trực quan sau.

## Bản hợp nhất năm báo cáo độc lập và quyết định chỉnh sửa

Các dòng “chờ” ở phần lịch sử phía trên phản ánh thời điểm trước khi nhận báo cáo. Bảng dưới là bản hợp nhất hiện hành của năm vai: góc nhìn sinh viên (`SV`), chuyên gia nội dung (`CG`), độ chính xác toán học (`TH`), phản biện học thuật–giảng dạy (`GD`) và mạch kể chuyện (`MC`). `Đã sửa` chỉ xác nhận thay đổi đã vào RevealJS/tài sản/hồ sơ; không thay cho tái kiểm độc lập hay rà trực quan.

| Mã | Vai | Mức độ | Trang | Vấn đề | Bằng chứng trong bản trước sửa | Đề xuất | Trạng thái | Quyết định và bằng chứng hiện hành |
|---|---|---|---|---|---|---|---|---|
| R5-01 | TH, GD | chặn bàn giao | B04 | Tích Jacobian dùng $J_\ell$ trước định nghĩa và kích thước | Mặt trang chỉ có $J_1^T\cdots J_L^T$ | Định nghĩa $J_\ell=\partial h_\ell/\partial h_{\ell-1}$ và kiểu trước tích | đã sửa, chờ tái kiểm | B04 nay nêu $h_\ell\in\mathbb R^{d_\ell}$ và $J_\ell\in\mathbb R^{d_\ell\times d_{\ell-1}}$ trước công thức |
| R5-02 | TH, GD | chặn bàn giao | E01, E07 | Lập luận đối xứng chỉ khóa $(w,b)$, thiếu hàm kích hoạt và vai trò/trọng số đi ra | Hoán vị hai đơn vị chưa chắc để nguyên mô hình nếu tham số ra khác | Khóa toàn bộ bộ $(w,b,\phi,c)$, trạng thái, lô và cập nhật | đã sửa, chờ tái kiểm | E01 nêu đối xứng đầy đủ; E07 dùng đúng giả thiết và notes chứng minh bằng hoán vị/quy nạp |
| R5-03 | TH, GD, SV | nghiêm trọng | B03, B06 | Chưa dạy và đo phân biệt cực tiểu cục bộ/toàn cục/yên ngựa | B03 chỉ đối chiếu bằng lời; B06 dùng trị riêng âm như tín hiệu đơn lẻ | Thêm ví dụ tính được và phân loại theo định nghĩa | đã sửa, chờ xác nhận cuối | B06 nay buộc phân loại ba trường hợp từ gradient, Hessian và giá trị hàm; đáp án yên ngựa/cực tiểu cục bộ kém/cực đại chỉ hiện bằng fragment |
| R5-04 | TH | nghiêm trọng | E02 | Công thức phương sai thay mômen bậc hai bằng phương sai khi trung bình kích hoạt có thể khác $0$ | Bản trước viết $fan_{in}\operatorname{Var}(W)\operatorname{Var}(a)$ tổng quát | Dùng $\mathbb E[a_k^2]$ và nêu điều kiện để đổi sang $\operatorname{Var}(a_k)$ | đã sửa, chờ xác nhận cuối | E02 và `math-spec.md` dùng mômen tổng quát; nêu cả hàng $W_{j,:}$ độc lập với véc-tơ $a$ tại khởi tạo, các trọng số trong hàng độc lập và trung bình $0$ |
| R5-05 | TH, GD | nghiêm trọng | E02, E04, E05; `variance-flow.svg` | Cầu từ lan truyền tín hiệu sang Xavier/He mâu thuẫn và thiếu nhánh truyền ngược | Hình cũ chỉ có $fan_{in}\operatorname{Var}(W)$; E04 nhảy thẳng tới Xavier | Dùng hệ số $c_\phi$, hai mục tiêu thuận/ngược và nhánh mômen ReLU | đã sửa, chờ tái kiểm | SVG ghi $c_\phi fan_{in}\operatorname{Var}(W)$, $c_\phi\approx1$ hoặc $1/2$; E04 dẫn $1/fan_{in}$, $1/fan_{out}$ tới $2/(fan_{in}+fan_{out})$; E05 giữ mômen ReLU |
| R5-06 | CG, SV | trung bình | C01 | $O(nd)\to O(b_td)$ ngầm giả sử chi phí gradient mẫu bằng $O(d)$ | Không nêu chi phí kiến trúc/truyền xuôi–ngược | Định nghĩa $C_{\nabla}$ và dùng chi phí theo số gradient mẫu | đã sửa, chờ tái kiểm | C01 dùng $O(nC_{\nabla})\to O(b_tC_{\nabla})$ và notes giải nghĩa |
| R5-07 | SV, GD | nghiêm trọng | C06, C07 | Định lý SGD đứng riêng, tải mặt trang cao và không có bài kiểm giả thiết | C06 liệt kê bốn giả thiết cùng hai tổng; C07 chỉ tính cập nhật/phương sai | Giảm tải C06; tại C07 kiểm $L$, cận dưới, phương sai và lịch bước | đã sửa, chờ xác nhận cuối | C06 hiện cận phương sai đều có điều kiện; C07 kiểm $L=4$, $F\ge5/2$, chứng minh $\sigma^2=17/b$ và nhận ra $\eta_t=0{,}1$ vi phạm $\sum\eta_t^2<\infty$ |
| R5-08 | TH, GD | nghiêm trọng | C02, C03, C07 | Trộn vết lô cố định với mô hình ngẫu nhiên; $g_t$ thiếu đối số ở vài chỗ | $B_t$ được gọi là tập dù lấy có hoàn lại; công thức $17/b$ đứng cạnh vết cố định | Định nghĩa chỉ số độc lập/đa tập; gắn nhãn hai cơ chế và giữ đối số | đã sửa, chờ xác nhận cuối | C07 giữ vết cố định riêng; trong mô hình độc lập có hoàn lại, hai độ lệch $(-1,-4),(1,4)$ đúng với mọi $\theta$, các tích chéo có kỳ vọng $0$, nên cận đều là $17/b$ |
| R5-09 | SV, CG | trung bình | P02 | Mục tiêu dài, chép gần nguyên văn và chưa quan sát được trên mặt trang | Ba đoạn “Hiểu…” gây tải đọc | Rút thành sản phẩm phân biệt/chẩn đoán, tính và chọn/tính | đã sửa, chờ tái kiểm | P02 giữ mã LLO/CLO nhưng mỗi thẻ chỉ nêu thao tác đánh giá được; nguyên văn vẫn trong outline |
| R5-10 | GD, TH | trung bình | A04, A02, Z01 | Chưa phân biệt mất mát xác thực với rủi ro kỳ vọng | Bản trước đặt “xác thực” cạnh $R$ mà không định nghĩa | Nêu $\widehat R_{\mathrm{val}}$ là ước lượng hữu hạn dùng chọn dừng | đã sửa, chờ tái kiểm | Notes A04/A02 định nghĩa; Z01 tách hàng đánh giá/dừng khỏi mục tiêu |
| R5-11 | SV | trung bình | E04, E05 | Hai trang khởi tạo dồn dữ kiện, kết quả và quy tắc tổng quát cùng lúc | Mặt trang có nhiều câu và hai công thức Var/Std | Giữ ví dụ trước quy tắc, dùng fragment cho khái quát | đã sửa, chờ tái kiểm | E04/E05 đặt dữ kiện và kết quả trước; công thức khái quát là fragment; thuật ngữ phương sai/độ lệch chuẩn nhất quán |
| R5-12 | MC | trung bình | A05→C01 | Dạng tổng được hứa dùng cho lô nhỏ nhưng bị treo qua mạch B | Câu nối cũ nói “trực tiếp” dù C còn sau sáu trang B | Báo trước việc giữ dữ kiện và gọi lại ở C01 | đã sửa, chờ tái kiểm | Notes A05 giữ dạng tổng cho C; notes C01 nói rõ quay lại A05 |
| R5-13 | MC | trung bình | B06 | Mạch chẩn đoán giống danh mục, chưa phân luồng sang công cụ | Không có ánh xạ B→A/C/D/E | Thêm ánh xạ chẩn đoán→mạch xử lý | đã sửa, chờ xác nhận cuối | B06 giữ ánh xạ tổng quát hóa/nhiễu lô/điều kiện hóa/gradient qua sâu sang A/C/D/E và dùng đúng nhãn “Mạch xử lý” |
| R5-14 | MC | trung bình | C07→D01 | Chuyển từ phương sai lô sang dao động điều kiện hóa đột ngột | D01 quay lại khe hẹp mà không phân biệt hai loại dao động | Nêu tăng $b$ giảm nhiễu nhưng không triệt dao động có cấu trúc | đã sửa, chờ tái kiểm | Notes C07 khóa quan hệ này trước D01 |
| R5-15 | MC | nhẹ | B03→B04; D06→E01 | Hai câu chuyển giữa cơ chế còn mờ | B03 và D06 đúng riêng lẻ nhưng chưa báo đổi loại nguyên nhân | Thêm câu nối phân loại | đã sửa, chờ tái kiểm | Notes B03 mở cơ chế do độ sâu; D06 có câu trên mặt trang về điểm đầu và notes khóa $g_1(q_1),v_2$ |
| R5-16 | MC | trung bình | P03, Z01 | Khung bị hiểu như thứ tự thời gian dù điểm đầu đứng sau cập nhật | Tiêu đề “năm chặng” và “một vòng huấn luyện” | Gọi là hệ quyết định và xếp điểm đầu trước cập nhật | đã sửa, chờ tái kiểm | P03 đổi thành “Năm quyết định để thiết kế huấn luyện”; Z01 xếp điểm đầu trước cập nhật và tách đánh giá/dừng |
| R5-17 | MC, GD | trung bình | Z02 | Bài tích hợp thiếu bối cảnh, tín hiệu lô và đáp án đóng vai trò công cụ | Gradient lớp đầu nhỏ có nhiều nguyên nhân; không có tín hiệu phân biệt $b$ với momentum | Khóa mạng ReLU mới khởi tạo; thêm phương sai lô, dao động và khoảng xác thực | đã sửa, chờ tái kiểm | Z02 yêu cầu phân biệt He, tăng $b$, momentum và dừng sớm; notes trả lời vai trò riêng |
| R5-18 | CG | trung bình | Z04 | Hồ sơ nguồn trên trang chưa cho tiêu đề/URL ổn định trong notes | Chỉ có tên tác giả, năm và hội nghị | Bổ sung tiêu đề và URL phát hành chính thức nếu hồ sơ có | đã sửa, chờ tái kiểm | Notes Z04 ghi đủ bốn tiêu đề và URL đã có trong `math-spec.md`/`source-provenance.md`; không bịa DOI |
| R5-19 | SV | nghiêm trọng | CSS cục bộ | Cỡ chữ màn hẹp dưới ngưỡng; bảng lồng có thể dưới $0{,}65$ em tương đối | Base hẹp $0{,}72$ em; bảng $0{,}78$ lần base | Giữ thân bài tối thiểu $0{,}75$ em và nội dung lồng tối thiểu $0{,}65$ em | đã sửa, chờ rà trực quan | CSS cục bộ đặt base hẹp $0{,}75$ em; bảng/formula nhỏ nhất $0{,}88$ lần base, tức $0{,}66$ em |

### Các đề xuất không áp dụng

- Không thêm, bỏ, gộp, tách hoặc đổi thứ tự trang: mọi lỗi trên sửa được cục bộ, nên giữ đúng 40 trang, 7 mạch và thứ tự mẫu đã duyệt.
- Không thêm DOI cho nguồn khi hồ sơ hiện hành chỉ xác minh URL phát hành chính thức; tránh bịa siêu dữ liệu. Tiêu đề và URL ổn định đã được bổ sung trong notes Z04.
- Không đưa toàn bộ bất đẳng thức tổng SGD lên mặt C06: chi tiết nằm trong notes để giữ tải nhận thức; mặt trang vẫn còn đủ giả thiết thao tác và kết luận có điều kiện, còn C07 đo khả năng kiểm giả thiết.

### Phạm vi cần tái kiểm độc lập

- Toán học: B03–B06, C01–C07, D06, E01–E07 và Z02.
- Mạch kể chuyện: A05→B01→B06→C01, C07→D01, D06→E01, P03 và Z01–Z02.
- Trực quan và khả năng đọc: toàn bộ 40 trang ở 16:9 và màn hình hẹp, đặc biệt B03, B06, C07, E01–E05, Z01–Z02.

Không tự kết luận năm vòng tái kiểm đã đạt trong nhật ký này.

## Vòng chỉnh sửa cục bộ cuối theo tái kiểm học thuật–giảng dạy

- **B06 — đo phân loại điểm dừng:** thay bảng cho sẵn công cụ bằng ba trường hợp phải phân loại trước khi hiện fragment: yên ngựa từ $\nabla f=0$ và Hessian bất định; cực tiểu cục bộ kém tại $x=-1$ của hàm ở B03; cực đại cục bộ, không phải cực tiểu, tại $x=0$. Ánh xạ chẩn đoán sang A/C/D/E vẫn được giữ dưới nhãn **“Mạch xử lý”**.
- **C06–C07 — cận phương sai đều:** C06 hiện trực tiếp giả thiết $\mathbb E[\|g_t(\theta_t)-\nabla F(\theta_t)\|_2^2\mid\theta_t]\le\sigma^2$. C07 và `math-spec.md` chứng minh hai độ lệch gradient mẫu là $(-1,-4)$ và $(1,4)$ với mọi $\theta$; độc lập và trung bình bằng $0$ làm các tích chéo triệt tiêu, nên $\sigma^2=17/b$ là cận đều.
- **E02 — giả thiết độc lập:** mặt trang, notes, `math-spec.md`, `source-map.md`, outline và storyboard cùng nêu cả hàng $W_{j,:}$ độc lập với véc-tơ $a$ tại khởi tạo; các trọng số trong hàng độc lập, cùng phương sai và có trung bình $0$.
- **P03 — thuật ngữ mạch:** storyboard đổi “năm chặng” thành “năm quyết định”, đồng bộ với mặt trang và outline. Cụm lịch sử trong dòng R5-16 vẫn giữ nguyên để truy nguyên phát biểu trước sửa.

### Tái kiểm cục bộ sau sửa

- Phân tích HTML bằng REXML: đạt; đúng 40 `data-slide-id` duy nhất, 40 khối notes và 7 `<section>` ngoài.
- KaTeX cục bộ: kết xuất thử 270 biểu thức sau khi giải mã thực thể HTML, không có lỗi.
- Đường dẫn: 17 tham chiếu tương đối, 16 đường dẫn duy nhất, tất cả đều tồn tại.
- SVG: cả 6 tệp trong `img/lec-05/` phân tích XML được.
- Markdown: 5 tệp hiện hành được kiểm, không có kiểu phân cách LaTeX thay thế hoặc khoảng trắng cuối dòng; HTML và năm tệp hồ sơ bị ảnh hưởng cũng không có khoảng trắng cuối dòng.
- `git diff --check`: không báo lỗi trong phạm vi diff được Git theo dõi. Các tệp Bài 05 hiện chưa được Git theo dõi nên đã được kiểm khoảng trắng trực tiếp như dòng trên.
- Kiểm tra chuỗi đích: mặt B06 không còn nhãn “Đi tiếp”; storyboard P03 dùng “năm quyết định”. Tổng số trang và mạch không thay đổi.

**Trạng thái:** các sửa cục bộ đã phản ánh trong RevealJS và hồ sơ liên quan; vẫn **chờ xác nhận cuối** của tác tử rà soát độc lập và điều phối viên. Mục này không kết luận cổng đã đạt.

## Sửa lỗi hiển thị P03 ở khung hẹp

- **Mức độ khi mở:** nghiêm trọng về khả năng đọc.
- **Bằng chứng trước sửa:** ảnh `/tmp/lec05-narrow/04-0-3-P03.png` ở khung $720\times720$ cho thấy nội dung P03 cao đến $y=735{,}56$, vượt đáy khung; hộp **“Vấn đề trung tâm”** bị cắt và chồng lên số trang.
- **Nguyên nhân:** khi media query chuyển `.flow` thành lưới một cột, bốn hàng mũi tên giữ cỡ dòng và khoảng cách của bố cục rộng, làm tổng chiều cao vượt khung.
- **Quyết định sửa:** chỉ trong media query và chỉ cho P03, giảm khoảng cách lưới, đệm nút, cỡ cùng chiều dòng của mũi tên, khoảng cách dưới tiêu đề và đệm hộp kết luận. Giữ nguyên nội dung; cỡ chữ thân bài vẫn là $0{,}75\,\mathrm{em}$, không hạ nội dung lồng dưới ngưỡng $0{,}65\,\mathrm{em}$.
- **Bằng chứng kỹ thuật sau sửa:** Chromium headless đã chụp lại đúng P03 tại $1280\times720$ và $720\times720$; phép đo tự động ghi `overflowCount = 0` ở cả hai khung, không có lỗi KaTeX trên P03. Ảnh hẹp mới nằm tại cùng đường dẫn `/tmp/lec05-narrow/04-0-3-P03.png`.
- **Trạng thái:** đã sửa trong HTML; chờ tác tử kiểm thử trực quan độc lập xác nhận lại, không tự kết luận vòng tái kiểm đạt.

## Bằng chứng kiểm định cuối

### Các vòng rà soát độc lập

- **Độ chính xác toán học:** đạt ở vòng tái kiểm cuối. Các định nghĩa, giả thiết, kích thước, quy ước SGD–momentum–Nesterov, cận phương sai và công thức Xavier/He trong phạm vi sửa không còn lỗi chặn bàn giao hoặc nghiêm trọng.
- **Phản biện học thuật–giảng dạy:** đạt ở vòng tái kiểm cuối. Các tiên quyết ký hiệu, ví dụ dẫn tới phát biểu hình thức, bài tập phân loại và câu nối ứng dụng đã đóng các vấn đề bắt buộc.
- **Mạch kể chuyện và điểm kết nối:** đạt ở vòng tái kiểm cuối. B06 giữ đúng cơ chế phân loại trước khi hiện đáp án và ánh xạ chẩn đoán sang A/C/D/E; ranh giới B06→C01 liền mạch; P03 và hồ sơ hiện hành cùng dùng “năm quyết định”.

### RevealJS và khả năng tiếp cận

- Chromium headless đã duyệt đủ 40/40 trang, gồm mọi trang dọc, tại $1280\times720$ và $720\times720$.
- Sau sửa P03, không trang nào vượt viewport ở cả hai khung; không còn lỗi tràn hoặc chồng lấn nghiêm trọng. Contact sheet kiểm tra nằm tại `/tmp/lec05-wide-contact.png` và `/tmp/lec05-narrow-contact.png`; dữ liệu phép đo nằm tại `/tmp/lec05-audit.json`.
- Đúng 7 `<section>` ngoài, 40 `data-slide-id` duy nhất và 40/40 khối ghi chú diễn giả. Không có lỗi KaTeX, ảnh vỡ, yêu cầu mạng ngoài, lỗi trang, chữ dưới ngưỡng CSS đã kiểm hoặc vi phạm tương phản tự động.
- Bảy lần dùng ảnh SVG tải thành công và có văn bản thay thế; sáu SVG cục bộ đều có `title` và `desc`. Điều hướng bằng phím Right, Down, Home và liên kết hash một-gốc đã hoạt động đúng.
- Tại gốc kho, lệnh chính xác `env PYTHONPATH=/tmp/lec05-reloadserver python3 -m reloadserver 8765` đã chạy; URL `http://127.0.0.1:8765/2627-1/lecture-05-toi-uu-bac-nhat-cho-hoc-may.html` trả HTTP 200.

### Codex Slides và giới hạn fallback

- Dự án bền vững đúng là `20260828132333-b-i-05-t-i-u-b-c-nh-t-cho-h-c-m-y-y48p`; dàn ý 40 trang đã được đồng bộ và giữ đúng thứ tự.
- Run render native `run-ed24c9b2-019c-4656-898a-22574a080d1d` kết thúc ở trạng thái `cancelled`; trạng thái canonical sau run vẫn là bản nháp với 0/40 ảnh trang chiếu.
- Các lần thử upload ảnh trang chiếu và Design File trả HTTP 500 với lỗi runtime `ReferenceError: File is not defined`.
- Vì vậy chưa có bằng chứng kiểm định trực quan hoàn chỉnh trong Codex Slides. Vòng kiểm định cuối dùng RevealJS cục bộ làm fallback; không tuyên bố render, upload hoặc rà soát trực quan Codex Slides đã đạt. Ảnh bằng chứng bề mặt bị hủy nằm tại `/tmp/codex-slides-lec05-cancelled.png`.

### Sửa tuân thủ cuối tại B06

- Loại hai lần hiển thị mã nội bộ `B03` khỏi mặt trang, thay bằng “hàm bậc bốn ở trang trước”; mã truy nguyên vẫn chỉ nằm trong thuộc tính, outline, storyboard và nhật ký.
- Tác tử kiểm thử độc lập đã render lại B06 tại $1280\times720$ và $720\times720$: không tràn, không chồng lấn và không lỗi KaTeX. Toàn bộ nội dung hiển thị cùng ghi chú không còn mã vị trí dạng `P00`, `A01`, …; các chữ A/C/D/E trong hộp “Mạch xử lý” là nhãn phần được phép. Bằng chứng nằm tại `/tmp/lec05-b06-retest.json`, `/tmp/lec05-b06-wide.png` và `/tmp/lec05-b06-narrow.png`.

**Kết luận kỹ thuật:** bản RevealJS hiện hành đạt kiểm định rộng và hẹp; các vòng toán học, học thuật–giảng dạy và mạch kể chuyện cuối đều đạt. Giới hạn còn lại là runtime render/upload của Codex Slides, đã được ghi rõ và không bị diễn giải thành một cổng đã vượt.

## Hợp nhất phát hiện cuối của năm vòng rà soát

- **Góc nhìn sinh viên:** đóng yêu cầu tự chứa tại C07 và Z02; dữ kiện cần tính nay nằm trên mặt trang, còn nhãn bài tích hợp được chuẩn hóa thành **“Câu hỏi:”**.
- **Chuyên gia nội dung:** E02 giải nghĩa hai fan và khóa kiểu ma trận; notes A04 xác định §7.8 là tiên quyết ngoài phạm vi chính §§8.1–8.4; notes B04 phân biệt minh họa nhân lặp với đo thực nghiệm.
- **Độ chính xác toán học:** không đổi quy ước hay kết quả số; công thức $F$, kích thước $a,W,z$ và dữ kiện hai vòng được nhắc lại đúng đặc tả hiện hành.
- **Phản biện học thuật–giảng dạy:** D06 giảm tải bằng cách chuyển câu nối về điểm đầu sang notes; C07 và Z02 giữ một nhiệm vụ đánh giá rõ.
- **Mạch kể chuyện:** notes P03 và Z01 cùng giải thích Z01 tái nhóm năm quyết định, tách đánh giá/dừng và không biểu diễn thứ tự thời gian.

Cổng storyboard và năm phát hiện bắt buộc trên đã được phản ánh đồng bộ trong deck, outline và storyboard; không thêm, bỏ hoặc đổi thứ tự trang. Giới hạn Codex Slides vẫn như mục kiểm định cuối: runtime không render/upload được, nên chỉ kiểm định RevealJS cục bộ, không tuyên bố đã rà trực quan bằng Codex Slides.

### Tái kiểm tính tự chứa tại Z02

- Bổ sung trực tiếp $F(\theta)=\tfrac12\theta_1^2+2\theta_2^2+\tfrac52$ vào câu tính vòng hai, cùng $\theta_0,\eta,\beta,B_0,B_1$ đã có.
- Giữ nhãn **“Câu hỏi:”**, tổng số trang, số mạch, notes và nguồn notes; không thay đổi quy ước hoặc đáp án số.

### Kiểm định bàn giao của điều phối viên

- Tái kiểm cuối bằng GLM 5.3 Flash qua OpenRouter đạt ở bốn phạm vi bị tác động: sinh viên, toán học, học thuật–giảng dạy và mạch kể chuyện. Z02 đạt sau khi hiện đầy đủ $F,\theta_0,\eta,\beta,B_0,B_1$; C07 và E02 cũng đạt về tính tự chứa, phép tính và kiểu đại lượng.
- Chromium duyệt lại đủ 40/40 trang tại $1280\times720$, $800\times600$ và $720\times900$ qua máy chủ tạm `127.0.0.1:8876`. Cổng 8765 đang thuộc tiến trình khác nên không bị thay đổi trong vòng này. Cả ba khung có 0 tràn, 0 lỗi console, 0 lỗi trang và 0 yêu cầu tải thất bại.
- Ảnh chụp P03, C07, D06, E02 và Z02 được xem trực tiếp sau sửa. Công thức, bảng, hộp câu hỏi và hình đều nằm trọn khung; Z02 vẫn đọc được sau khi bổ sung hàm $F$.
- Thẻ viewport cho phép người dùng phóng to và favicon dữ liệu rỗng loại yêu cầu 404. Kiểm tra tĩnh giữ 7 section ngoài, 40 ID duy nhất, 40 ghi chú, 40 đoạn nguồn và 17/17 tham chiếu cục bộ hợp lệ; `git diff --check` sạch.
- Codex Slides vẫn không có bằng chứng render trực quan thành công do giới hạn runtime đã ghi ở trên. Kết luận bàn giao chỉ dựa trên RevealJS cục bộ và không tuyên bố cổng Codex Slides đã đạt.

## Ghi chú bài giảng công khai — kiểm định ngày 2026-08-31

- **Phạm vi:** `materials/lec-05/lecture-note.md` gồm 6 mạch A–F và 14 chủ đề. Mỗi chủ đề có đủ mục tiêu đọc hiểu, định nghĩa và giả thiết, trực quan, ví dụ tính được, ý nghĩa và ứng dụng trong AI, điểm dễ nhầm, câu hỏi kiểm tra và đầu ra.
- **Tách chứng minh:** tuyến A–F chỉ giữ phát biểu định lý hoặc mệnh đề. Năm chứng minh dài của A–C được chuyển xuống phần riêng; các chứng minh D–F tiếp tục nằm trong các nhóm riêng ở cuối ghi chú.
- **Rà soát toán học độc lập:** đạt sau khi bổ sung giả thiết dãy tốc độ học xác định cho cận SGD, khóa đầy đủ tham số và trạng thái bộ tối ưu trong mệnh đề đối xứng, sửa ký hiệu $\mathrm{fan}_{\mathrm{in}}$, $\mathrm{fan}_{\mathrm{out}}$ và tái kiểm toàn bộ năm chứng minh A–C sau khi di chuyển. Các phép tính SGD, momentum, Nesterov, Xavier và He đều đạt.
- **Biên tập `no-ai-slop`:** đạt sau hai vòng. Đã bỏ giọng điều phối nội bộ, câu lặp, cấu trúc dấu hai chấm tạo nhịp máy móc và metadata sản xuất trong tài liệu tham khảo; giữ nguyên nội dung toán học và khuôn tám nhãn của mỗi chủ đề.
- **Markdown:** đúng 1 heading cấp một, 6 mạch chính, 14 chủ đề; 190 dấu phân cách công thức khối; 9 khối `proof` mở và 9 khối đóng; không dùng kiểu phân cách LaTeX thay thế; `git diff --check` sạch.
- **Hình:** ghi chú dùng 7 SVG cục bộ, trong đó `minibatch-unbiased-variance.svg` được bổ sung cho tính không chệch và quy luật $17/b$. Cả 7 tệp phân tích XML được, có `role="img"`, `title`, `desc`, không chứa script, `foreignObject`, ảnh nhúng hoặc tài nguyên mạng.
- **Rà trực quan SVG:** cả 7 hình được kết xuất và xem trực tiếp ở chiều rộng 900 px và 600 px. `momentum-lookahead.svg` được vẽ lại thành hai bảng, biểu diễn riêng điểm đánh giá gradient, $q_t$, $v_{t+1}$ và $\theta_{t+1}$; vòng tái kiểm độc lập xác nhận phép cộng véc-tơ và trường hợp $\beta=0$ đúng. Không dùng màu làm tín hiệu duy nhất.
- **HTTP cục bộ:** máy chủ tạm tại `127.0.0.1:8877` trả 200 cho chỉ mục, viewer với đúng cặp `doc`–`deck`, Markdown, bộ trang chiếu và cả 7 SVG; máy chủ đã dừng sau kiểm tra.
- **Công bố:** chỉ sau các cổng trên, thẻ Bài 05 trong `index.html` mới được đổi từ `Chưa có` thành liên kết viewer. Codex Slides không có bề mặt Browser khả dụng trong vòng ghi chú này; không tuyên bố đã kiểm định ghi chú bằng Codex Slides.

## Rà văn phong và mạch khái niệm ngày 2026-09-01

- Bỏ 14 dòng `Đầu ra` lặp mục tiêu đọc hiểu trong lecture note; giữ nguyên định nghĩa, ví dụ, định lý, suy diễn và câu hỏi kiểm tra.
- Deck không còn mã mạch A–E hoặc nhãn “Mạch xử lý” trên mặt trang. Các nối giữa tổng quát hóa, cảnh quan, nhiễu lô, momentum và khởi tạo được viết bằng tín hiệu quan sát cùng can thiệp tương ứng.
- Dòng nguồn bỏ các câu QA lặp; bằng chứng tính toán vẫn nằm trong nhật ký. Kiểm định đạt 40 mã duy nhất, 40 ghi chú, 7 section ngoài, thẻ cân bằng, tài sản tồn tại, SVG hợp lệ và HTTP 200 cho deck/viewer/note/KaTeX.
- Codex Slides xác nhận dự án `20260901025958-lecture-05-t-i-u-b-c-nh-t-cho-h-c-m-y-z8ku` ở trạng thái draft với 40 trang; không có Browser để tuyên bố rà trực quan mới.
- Reviewer độc lập `z-ai/glm-5.3-flash` đọc toàn bộ deck và note, kết luận PASS về mạch khái niệm, độ đầy đủ và độ chính xác toán học.
- Hậu kiểm toàn khóa thay các tham chiếu “mạch/trang trước” còn sót bằng các quan hệ cụ thể: điều kiện hóa–nhiễu–đối xứng, dao động trong khe hẹp và phép đổi từ phương sai sang tham số phân phối.

## Rà soát sâu và kiểm định in ngày 2026-09-01

### Mạch khái niệm và ký hiệu

- P03 đổi chuỗi mũi tên sai thứ tự thành lưới năm câu hỏi: mục tiêu, điểm đầu, dữ liệu và gradient, cập nhật, đánh giá và dừng. Z01 nêu trực tiếp ba quan hệ phụ thuộc thay cho câu chữa “không phải thứ tự thời gian”.
- Thứ tự A01→A03→A04→A02 được khôi phục đúng outline và storyboard: nhu cầu phân biệt mục tiêu → ví dụ mất mát → trực quan dừng sớm → định nghĩa rủi ro kỳ vọng và thực nghiệm.
- C03 định nghĩa ngay hai lô một phần tử $B_0=(1)$, $B_1=(2)$. C02 sau đó khái quát $B_t$ thành đa tập lấy độc lập, đều, có hoàn lại và dùng hình phương sai; C06 hiện đủ hai tổng Robbins–Monro trước khi C07 kiểm tốc độ học hằng.
- B04 dùng $\mathcal L$ cho mất mát, phân biệt với hằng Lipschitz $L$. Lecture note áp dụng cùng quy ước trong ví dụ đối xứng.
- E01 nêu đủ đẳng thức của $(w,b,\phi,c)$, trạng thái bộ tối ưu, cùng lô và cùng quy tắc cập nhật xác định trước kết luận bảo toàn đối xứng.

### Phản biện độc lập và biên tập

- Tác tử lập kế hoạch kiểm kê 40 trang, 7 SVG và các phụ thuộc trước khi sửa; không sửa tệp và không gửi dữ liệu ra ngoài.
- Lượt phản biện độc lập đầu tiên xác nhận các sửa trọng tâm đúng, đồng thời phát hiện năm điểm còn lại: lời dẫn “Nhóm … cuối ghi chú”, xung đột ký hiệu $L$, câu thao tác hóa LLO trong notes, ký hiệu ngoặc nhọn trong SVG và danh mục hình thiếu trong storyboard. Cả năm điểm đã được sửa.
- Các câu chuyển chung chung “điểm kết của câu chuyện”, “cầu trực tiếp” và lời biên tập nội bộ được thay bằng quan hệ toán học cụ thể. Ghi chú bài giảng giữ nguyên chứng minh và ví dụ, chỉ bỏ lời dẫn quy trình.
- Vòng rà soát này không gửi tệp Bài 05 tới OpenRouter. Các mục OpenRouter trước đó trong nhật ký là lịch sử của lần kiểm định cũ.

### Kiểm định toán học, cấu trúc và hình

- Tính lại bằng phân số chính xác: SGD cho $(1{,}61,0{,}2)$, momentum cho $(1{,}56,0{,}2)$, Nesterov cho $(1{,}565,0{,}2)$; sai số bình phương một mẫu là $17$, Xavier có phương sai $1/3$, He có phương sai $1/2$.
- Deck có 40 mã duy nhất, 40 ghi chú, 40 đoạn nguồn và 7 `<section>` ngoài. Outline và storyboard đều có đúng 40 hàng, khớp tập mã và thứ tự DOM. Markdown bắt đầu bằng heading cấp một; chín khối mở rộng và chín dấu đóng cân bằng; `git diff --check` sạch.
- Bảy SVG phân tích XML thành công, có `title` và `desc`, không chứa `script`, `foreignObject`, ảnh nhúng hoặc tài nguyên mạng. `minibatch-unbiased-variance.svg` được render và xem trực tiếp sau khi đổi ký hiệu sang $B_0=(1)$, $B_1=(2)$; các mũi tên, số $17$, $8{,}5$, $4{,}25$ và quy luật $17/b$ hiển thị đúng.
- Kết xuất in ban đầu làm lưới P03, C02, C06 và E01 thành một cột vì quy tắc màn hình hẹp cũng kích hoạt khi in. Quy tắc `@media print` nay giữ lưới hai hoặc ba cột. PDF cuối có khung 16:9 và 46 trạng thái in do các fragment; bốn trang sửa chính và E01 riêng đều hiển thị đủ nội dung, không chồng lấn.
- Deck, lecture note, material viewer và toàn bộ tài sản cục bộ trả HTTP 200 tại cổng kiểm định 8765.

### Giới hạn công cụ

- Codex Slides không có bề mặt Browser/MCP trong phiên này. Rà trực quan dùng Chromium headless và RevealJS cục bộ; không tuyên bố đã kiểm định bằng Codex Slides.
- Tái kiểm độc lập cuối kết thúc `PASS`: năm lỗi của lượt trước đã đóng; thứ tự DOM khớp tuyệt đối với outline và storyboard; 40 ID, 40 ghi chú, 40 nguồn, 7 section ngoài và 7 SVG đều đồng bộ; không phát hiện lỗi toán, ký hiệu hoặc lời dẫn quy trình mới.

### Bổ sung sau rà soát chéo toàn học phần

- A04 định nghĩa $\widehat R_{\mathrm{tr}}$ và $\widehat R_{\mathrm{val}}$ trước khi đọc hình dừng sớm; ví dụ dẫn nhập không còn dùng ký hiệu chưa giới thiệu.
- C02 công bố $q\in\mathbb R^d$ ở cả trang chiếu và lecture note trước khi định nghĩa $g_t(q)$.
