# Storyboard Bài 01: Giới thiệu tối ưu, tập lồi và hàm lồi

## Ghi chú quy trình

- Đây là **hồ sơ quy trình cũ được tiếp tục tại chỗ** theo quy tắc không tự di chuyển: outline và review-log giữ nguyên vị trí `lecture-01-outline.md` và `lecture-01-review-log.md`; không tạo thư mục `planning/lec-01`.
- Worker **không đọc** `sources/MIT/README.md`, các tệp PDF hoặc bản trích PDF; mọi tham chiếu trang PDF cụ thể (lec01/lec02/lec03) được lấy từ outline và review-log và được **đánh dấu chưa xác minh bởi worker**.
- HTML hiện có đúng **6 section ngoài**, tương ứng sáu mạch đã được validator phê duyệt và triển khai.
- Công thức trong tài liệu này chỉ dùng `$...$` và `$$...$$`.

## Bản đồ 68 trang theo thứ tự HTML

Mỗi hàng đúng một `data-slide-id`, theo đúng thứ tự xuất hiện trong HTML.

| # | Mã | Lý do tồn tại | Khoảng trống học tập | Quan hệ trước–sau | LLO/CLO | Minh chứng | Quyết định | Lý do |
|---|---|---|---|---|---|---|---|---|
| 1 | P00 | Định vị bài học trong học phần | Chưa biết bài học nói về gì | Trang đầu; mở cho P01 | CLO1 | Nhận diện chủ đề bài học | Giữ | Trang tiêu đề chuẩn |
| 2 | P01 | Kích hoạt tiên quyết | Khoảng trống giữa nền tảng đã học và công cụ sẽ dùng | P00→P01→P02 | CLO1 | Kiểm tra nhanh kiểu $Ax$, $A^Tx$ | Giữ | Cần đối chiếu đã biết/sẽ dùng |
| 3 | P02 | Chuyển LLO thành biểu hiện quan sát được | Học viên chưa biết đích đến | P01→P02→P03 | LLO1, LLO2, CLO1 | Hai LLO nguyên ý + khối biểu hiện | Giữ | Đã sửa tách LLO và biểu hiện |
| 4 | P03 | Công bố vấn đề trung tâm và sáu chặng | Chưa thấy cấu trúc tổng thể và câu hỏi cần giải quyết | P02→P03→A00 | LLO1, LLO2, CLO1 | Hộp vấn đề trung tâm và sáu thẻ chặng | Sửa | Tạo cặp mở–khép với C23–C24 |
| 5 | A00 | Trả lời tại sao phải tối ưu, bắt đầu từ lựa chọn và đánh đổi | Học viên nghĩ tối ưu là công thức | P03→A00→A01 | LLO1, CLO1 | Ca nhỏ hai mô hình A/B | Giữ | Lấp khoảng trống động cơ |
| 6 | A01 | Trả lời tại sao phải mô hình hóa | Chưa phân biệt dữ kiện, biến, mục tiêu, miền | A00→A01→A02 | LLO1, CLO1 | Chuỗi tình huống→biểu diễn→bài toán | Giữ | Đã sửa theo vòng tái cấu trúc |
| 7 | A02 | Củng cố khuôn mô hình bằng ba ví dụ tự học | Khuôn còn trừu tượng | A01→A02→A03 | LLO1, CLO1 | Ba thẻ khớp dữ liệu, danh mục, mạch | Giữ | Ví dụ tự học củng cố khuôn sau A01, trước nhu cầu chứng nhận ở A03; không chặn tuyến giảng chính |
| 8 | A03 | Tạo nhu cầu cho cấu trúc lồi | Nhầm tìm được nghiệm với chứng nhận tối ưu | A02→A03→A03L | LLO1, CLO1 | Đối chiếu tìm ứng viên/chứng nhận toàn cục | Giữ | Luận điểm trung tâm của mạch A |
| 9 | A03L | Định nghĩa cực tiểu địa phương và toàn cục tương đối với tập khả thi $C$ | Nhầm so sánh trong lân cận với so sánh trên toàn $C$ | A03→A03L→A03W | LLO1, CLO1 | Định nghĩa lượng từ; ví dụ $f(x)=(x^2-1)^2$; SVG `img/lec-01/local-versus-global-minimum.svg`; ứng dụng AI là điểm thuật toán dừng chưa tự chứng nhận toàn cục | Thêm | Bổ sung độc lập sau A03; phạm vi 16 slide còn lại chờ xác nhận |
| 10 | A03W | Phân biệt tồn tại và duy nhất của nghiệm | Nhầm lồi chặt cho tồn tại, hoặc thiếu compact cho tồn tại | A03L→A03W→A11 | LLO1, CLO1 | Định lý Weierstrass ($C\ne\varnothing$ compact, $f_0$ liên tục); lồi chặt cho nhiều nhất một nghiệm; ví dụ $\min e^x$ trên $\mathbb R$ có infimum $0$ không đạt; SVG `img/lec-01/existence-and-uniqueness.svg` | Thêm | Bổ sung độc lập sau A03L; nối sang A11/A04 |
| 11 | A11 | Giải thích chuỗi nhu cầu lịch sử của lĩnh vực | Không hiểu vì sao ngôn ngữ lồi hình thành | A03W→A11→A04 | LLO1 | Chuỗi nhân quả Đơn hình→điểm trong→học máy | Giữ | Khôi phục theo yêu cầu; không niên biểu tách rời |
| 12 | A04 | Cho hai lớp bài toán có cấu trúc làm ví dụ nền | Chưa thấy lớp bài toán cụ thể | A11→A04→A05 | LLO1 | LS và LP | Giữ | Nền cho bảo đảm lồi |
| 13 | A05 | Công bố lời hứa của cấu trúc lồi | Chưa biết lồi mua được gì | A04→A05→A06 | LLO1, CLO1 | Hai hình đoạn nối và dây cung; một câu trên mặt: định nghĩa tập lồi ở B01 và hàm lồi ở C02, đây là lời hứa bảo đảm không dùng làm định nghĩa | Giữ | Chỉ công bố; định nghĩa ở B01/C02 |
| 14 | A06 | Cung cấp quy trình ứng dụng | Chưa có quy trình nhận dạng–cải dạng–giải | A05→A06→A07 | LLO1, CLO1 | Ba bước quy trình | Giữ | Khung cho ca độ sáng |
| 15 | A07 | Tạo nhu cầu và trực quan ca độ sáng | Chưa có ca cụ thể cho quy trình | A06→A07→A07M | LLO1, CLO1 | SVG hai nguồn–hai vị trí đo | Giữ | Tách trực quan khỏi mô hình |
| 16 | A07M | Hình thức hóa ca độ sáng | Trực quan chưa thành mô hình | A07→A07M→A08 | LLO1, CLO1 | Dữ kiện $A$, $d=(3,1)^T$, biến, miền, mục tiêu | Giữ | Trang mô hình riêng giảm mật độ |
| 17 | A08 | Cho trải nghiệm tính trước khi cải dạng | Chưa cảm nhận sai lệch tại điểm khả thi | A07M→A08→A09 | LLO1, CLO1 | Hai phương án $p^{(a)}$, $p^{(b)}$ | Giữ | Chỉ hai phương án trên lớp |
| 18 | A09 | Thực hiện cải dạng lồi | Chưa biết biến đổi giữ cấu trúc | A08→A09→A10 | LLO1, CLO1 | Cải dạng log, miền $Ap>0$, $0\le p\le4$; một câu trên mặt: quy tắc $1/u$ lồi và cực đại điểm sẽ được chứng minh ở C12–C15 | Giữ | Nghiệm trong ghi chú |
| 19 | A10 | Cho thấy ràng buộc có thể phá cấu trúc | Cầu sang tập lồi | A09→A10→B00 | LLO1, CLO1 | Đối chiếu tuyến tính/lực lượng | Giữ | Câu nối sang mạch B |
| 20 | B00 | Tạo nhu cầu và trực quan tập lồi | Chưa có hình ảnh đoạn nối | A10→B00→B01 | LLO2, CLO1 | Hai hình $C_1$ lồi, $C_2$ không lồi | Giữ | Trực quan trước định nghĩa |
| 21 | B01 | Định nghĩa tập lồi sau trực quan | Trực quan chưa thành lượng từ | B00→B01→B02 | LLO2, CLO1 | Định nghĩa đoạn nối, đối chiếu affine | Giữ | Định nghĩa sau hình |
| 22 | B02 | Mở rộng trộn hai điểm sang nhiều điểm | Chưa có bao lồi | B01→B02→B03 | LLO2 | Tổ hợp lồi, tam giác bao | Giữ | Bước tự nhiên |
| 23 | B03 | Giới thiệu nón lồi | Chưa có phép co giãn | B02→B03→B04 | LLO2 | $\mathbb R_+^2$, định nghĩa nón | Giữ | Viên gạch chuẩn |
| 24 | B04 | Siêu phẳng và nửa không gian | Chưa có viên gạch tuyến tính | B03→B04→B05 | LLO2 | $a^Tx\le b$ | Giữ | Dùng cho đa diện, tách |
| 25 | B05 | Cầu và ellipsoid | Chưa thấy tập cong lồi | B04→B05→B06 | LLO2 | Ellipsoid qua biến đổi affine | Giữ | Tự học, giảm tải |
| 26 | B06 | Cầu chuẩn và SOC | Chưa có ràng buộc chuẩn | B05→B06→B07 | LLO2 | $\mathcal Q^{n+1}$ | Giữ | Dùng lại ở C23 |
| 27 | B07 | Đa diện | Chưa ghép nhiều ràng buộc | B06→B07→B08 | LLO2 | $Ax\preceq b$, $Cx=d$ | Giữ | Giao hữu hạn nửa không gian |
| 28 | B08 | Nón PSD | Chưa có ràng buộc ma trận | B07→B08→B10 | LLO2 | $\mathbb S_+^n$, điều kiện $2\times2$ | Giữ | Liên hệ hiệp phương sai, Hessian |
| 29 | B10 | Trả lời vì sao ràng buộc lồi tạo miền lồi | Chưa biết giao bảo toàn lồi | B08→B10→B11 | LLO2, CLO1 | Giao các $C_i$ | Giữ | Không dùng hàm lồi trước phần C |
| 30 | B11 | Công cụ ảnh/nghịch ảnh affine | Chưa xây được tập mới | B10→B11→B09 | LLO2, CLO1 | Ảnh, nghịch ảnh, ví dụ SOC | Giữ | Tiên quyết cho B09 |
| 31 | B09 | Kiểm tra công cụ lõi trước phần mở rộng tự học | Chưa luyện công cụ vừa học | B11→B09→B12 | LLO2, CLO1 | Bốn tập cần phân loại | Giữ | Kiểm tra công cụ lõi sau B11, trước B12 và các phần mở rộng tự học |
| 32 | B12 | Phối cảnh và phân tuyến tính | Công cụ xây tập còn thiếu | B09→B12→B13 | LLO2 | $f(x)=(Ax+b)/(c^Tx+d)$ | Giữ | Tự học |
| 33 | B13 | Nón chính quy | Cần nền cho bất đẳng thức tổng quát | B12→B13→B13I | LLO2 | Bốn tính chất | Giữ | Chuẩn hóa thuật ngữ proper cone |
| 34 | B13I | Bất đẳng thức tổng quát | Chưa có thứ tự bộ phận | B13→B13I→B14 | LLO2 | $\preceq_K$, ví dụ $\mathbb R_+^2$ | Giữ | Tách từ B13 |
| 35 | B14 | Phân biệt phần tử nhỏ nhất và tối tiểu | Nhầm hai khái niệm | B13I→B14→B16P | LLO2 | Định nghĩa song song | Giữ | Nền cho Pareto |
| 36 | B16P | Định nghĩa biên Pareto | Chưa có khái niệm đa mục tiêu | B14→B16P→B16PE | LLO2, CLO1 | $\operatorname{Pareto}(S)$ | Giữ | Tách ba bước Pareto |
| 37 | B16PE | Ví dụ biên Pareto ba điểm có câu hỏi kiểm tra | Định nghĩa chưa được kiểm | B16P→B16PE→B16PA | LLO2, CLO1 | $S=\{(1,4),(4,1),(3,5)\}$, SVG, câu hỏi kiểm tra thêm $d=(2,2)$ | Giữ | Ví dụ có câu hỏi kiểm tra ngay sau định nghĩa, không chỉ ví dụ thụ động |
| 38 | B16PA | Ứng dụng lựa chọn mô hình AI | Chưa thấy ý nghĩa AI | B16PE→B16PA→B15 | LLO2, CLO1 | Bảng lỗi–độ trễ | Giữ | Số liệu minh họa |
| 39 | B15 | Siêu phẳng tách và tựa | Thiếu chứng nhận hình học | B16PA→B15→B16D | LLO2 | Hai cột đối chiếu | Giữ | Tự học; thuật ngữ "tựa" |
| 40 | B16D | Nón đối ngẫu | Thiếu khái niệm đối ngẫu hình học | B15→B16D→C00 | LLO2 | $(\mathbb R_+^n)^*=\mathbb R_+^n$ | Giữ | Hai bao hàm |
| 41 | C00 | Tạo nhu cầu và trực quan hàm lồi | Chưa thấy cảnh hai đáy | B16D→C00→C01 | LLO2, CLO1 | Hai đồ thị lồi/không lồi | Giữ | Trực quan trước định nghĩa |
| 42 | C01 | Dây cung và ví dụ $u^2$ | Trực quan chưa thành bất đẳng thức | C00→C01→C02 | LLO2 | Ví dụ số $f(u)=u^2$ | Giữ | Ví dụ trước định nghĩa |
| 43 | C02 | Định nghĩa hàm lồi | Chưa có định nghĩa đầy đủ | C01→C02→C03 | LLO2 | Bất đẳng thức, lồi chặt | Giữ | Sau trực quan và ví dụ |
| 44 | C03 | Ví dụ hàm cơ sở | Kho ví dụ còn ít | C02→C03→C04 | LLO2 | Chuẩn, affine, chuẩn phổ | Giữ | Tự học |
| 45 | C04 | Hạn chế theo đường | Cần công cụ kiểm tra nhiều chiều | C03→C04→C05 | LLO2 | $g(t)=f(x+tv)$ | Giữ | Nối C06–C07 |
| 46 | C05 | Giá trị mở rộng $+\infty$ | Chưa gộp miền vào hàm | C04→C05→C06 | LLO2 | $\widetilde f$, hàm chỉ thị | Giữ | Nối A01/A05 |
| 47 | C06 | Điều kiện bậc nhất | Chưa có chứng nhận khả vi | C05→C06→C07 | LLO2, CLO1 | Ba tiếp tuyến dưới đồ thị | Giữ | Hình đã sửa ba tiếp tuyến |
| 48 | C07 | Điều kiện bậc hai | Cần kiểm tra Hessian | C06→C07→C08 | LLO2, CLO1 | $\nabla^2f\succeq0$, phản ví dụ $x^4$ | Giữ | Cặp với C06 |
| 49 | C08 | Ví dụ bậc hai và LS | Áp dụng điều kiện vừa học | C07→C08→C09 | LLO2, CLO1 | $P\succeq0$, $2A^TA$ | Giữ | Miền $P\in\mathbb S^n$ |
| 50 | C09 | Kiểm tra công cụ lõi trước phần mở rộng tự học | Chưa luyện tay | C08→C09→C10 | LLO2, CLO1 | $x^2/y$, log-tổng-mũ | Giữ | Kiểm tra công cụ lõi sau C08, trước C10 và cụm mở rộng tự học C11–C22; đáp án trong mảnh hiện tuần tự |
| 51 | C10 | Tập mức dưới và epigraph | Cầu nối hàm→tập | C09→C10→C11 | LLO2, CLO1 | $\operatorname{epi}f$ | Giữ | Sau khi C02 đã định nghĩa |
| 52 | C11 | Jensen | Ứng dụng xác suất | C10→C11→C12 | LLO2 | $f(\mathbb EZ)\le\mathbb E[f(Z)]$ | Giữ | Điểm dừng tự học |
| 53 | C12 | Bản đồ phép bảo toàn | Cần quy tắc xây hàm mới | C11→C12→C13 | LLO2, CLO1 | Bốn nhóm quy tắc | Giữ | Bảng kiểm |
| 54 | C13 | Tổng trọng số và hợp affine | Quy tắc đầu cần ví dụ | C12→C13→C14 | LLO2 | $-\sum\log(b_i-a_i^Tx)$ | Giữ | Tự học |
| 55 | C14 | Cực đại điểm và cận trên đúng | Quy tắc sup | C13→C14→C15 | LLO2 | $\lambda_{\max}$ | Giữ | Tự học |
| 56 | C15 | Hợp hàm đơn điệu | Quy tắc hợp | C14→C15→C16 | LLO2 | $e^{g}$, $1/g$ | Giữ | Có phản ví dụ |
| 57 | C16 | Cận dưới đúng và phối cảnh | Quy tắc inf | C15→C16→C17 | LLO2 | Hai giả thiết bắt buộc | Giữ | Điểm dừng tự học |
| 58 | C17 | Hàm liên hợp | Tự học có điều kiện | C16→C17→C18 | LLO2 | $f^*$ của $-\log x$ | Giữ | Câu hỏi tự kiểm trong ghi chú |
| 59 | C18 | Hàm tựa lồi | Hàm không lồi vẫn có cấu trúc | C17→C18→C19 | LLO2 | Định nghĩa max, tập mức lồng | Giữ | Nhu cầu nêu rõ |
| 60 | C19 | Tỷ suất hoàn vốn nội bộ | Ứng dụng tựa lõm | C18→C19→C20 | LLO2 | $PV(x,\operatorname{IRR}(x))=0$ | Giữ | Giả thiết cắt dấu một lần |
| 61 | C20 | Nhu cầu, dữ liệu, biến, trực quan Gauss | Chưa có ví dụ log-lõm | C19→C20→C20F | LLO2, CLO1 | SVG log-hợp lý một đỉnh | Giữ | Tách cụm Gauss |
| 62 | C20F | Công thức và kiểm tra độ cong | Trực quan chưa kiểm chứng | C20→C20F→C20D | LLO2 | Hessian $-N\Sigma^{-1}\prec0$ | Giữ | Tách phép tính khỏi định nghĩa |
| 63 | C20D | Định nghĩa hàm log-lõm | Chưa khái quát hóa | C20F→C20D→C21 | LLO2 | Bất đẳng thức log-lõm, hệ quả | Giữ | Giảm mật độ |
| 64 | C21 | Tích phân, tích chập, hiệu suất | Mở rộng log-lõm | C20D→C21→C22 | LLO2 | Prékopa, tập hiệu suất lồi | Giữ | Tự học có điều kiện |
| 65 | C22 | Lồi theo bất đẳng thức tổng quát | Mở rộng sang ma trận | C21→C22→C23 | LLO2 | $f(X)=X^2$ trên $\mathbb S^m$ | Sửa | Ghi chú nêu chính xác điểm hỏng khi bỏ đối xứng |
| 66 | C23 | Ca AI khép vòng, trả lời vấn đề trung tâm | Chưa tổng hợp đủ sáu bước | C22→C23→C24 | LLO1, LLO2, CLO1 | Hồi quy logistic đủ nhu cầu→bảo đảm | Sửa | Khép vòng P03 và bổ sung phản ví dụ cho bài về nhà 3 |
| 67 | C24 | Tổng kết theo LLO/CLO bằng một luận điểm | Chưa đối chiếu kết quả bài học với chuẩn đầu ra | C23→C24→C25 | LLO1, LLO2, CLO1 | Một mệnh đề nhận dạng và bảo đảm, ánh xạ ba chuẩn | Thêm | Không thể gộp vào C23 mà không làm quá tải trang bài tập |
| 68 | C25 | Tự kiểm tra và định tuyến đọc tiếp | Chưa có cơ chế tự đánh giá và nguồn đọc truy nguyên ở cuối bài | C24→C25 (kết thúc) | LLO1, LLO2, CLO1 | Ba câu tự kiểm tra, hai nguồn đọc, gợi ý trong notes | Thêm | Kết thúc bằng minh chứng có thể tự chấm và tài liệu đọc |

## Bản đồ hành trình khái niệm theo cụm trọng tâm

### Cụm 1: Tối ưu và mô hình hóa (A00–A10, có A03L–A03W và A11 theo vị trí HTML)

- **Nhu cầu:** A00 (lựa chọn, đánh đổi, căn cứ chứng minh) → A03 (tìm ứng viên ≠ chứng nhận toàn cục) → A03L (địa phương ≠ toàn cục) → A03W (tồn tại ≠ duy nhất) → A11 (chuỗi nhu cầu lịch sử).
- **Trực quan:** A00 ca nhỏ hai mô hình; A03L đồ thị hai đáy; A03W đối chiếu không đạt infimum và nhiều nhất một nghiệm; A05 hai hình đoạn nối và dây cung; A07 SVG hai nguồn sáng.
- **Ví dụ:** A02 ba mô hình; A03L dùng $(x^2-1)^2$; A03W dùng $\min e^x$; A07–A09 ca độ sáng; A10 hai ràng buộc.
- **Hình thức/toán học:** A01 khuôn $\min_{x\in C}f_0(x)$; A03L định nghĩa cực tiểu tương đối với $C$; A03W phát biểu Weierstrass và điều kiện nhiều nhất một nghiệm; A07M mô hình độ sáng; A09 cải dạng log.
- **Ứng dụng:** A03L cảnh báo điểm dừng thuật toán chưa chứng nhận toàn cục; A06 quy trình nhận dạng–cải dạng–giải; A10 cảnh báo ràng buộc lực lượng.
- **Bài tập:** A08 (hai phương án trên lớp), A09 (cải dạng, nghiệm trong ghi chú).
- **Đầu vào:** trực giác quyết định của học viên; tiên quyết P01.
- **Sản phẩm:** một mô hình tối ưu hoàn chỉnh có cải dạng lồi (A09).
- **Ký hiệu truyền:** $x$, $x^\star$, $f_0$, $C$, $p$, $I=Ap$, $d=(3,1)^T$, $u_k=I_k/d_k$.
- **Bước gộp/không áp dụng:** A03L và A03W tách riêng vì trả lời hai câu hỏi khác nhau; không gộp A07/A07M; không gộp A08/A09; A11 giữ sau A03W vì quan hệ nhân quả.
- **Câu nối:** A10→B00: "cần ngôn ngữ hình học để kiểm tra đoạn nối giữa hai điểm khả thi".
- **Tổng thời lượng:** thuộc khối A, 28 phút theo phân bổ hiện hành 7/28/23/32 (bốn khối thời lượng nội bộ, không nhất thiết trùng sáu mạch RevealJS).

### Cụm 2: Tập lồi và ràng buộc lồi (B00–B16D)

- **Nhu cầu:** B00 (đoạn nối hai điểm khả thi) → B10 (vì sao giao các ràng buộc lồi vẫn lồi).
- **Trực quan:** B00 hai hình đối chiếu; B03 nón; B04 pháp tuyến; B06 lát cắt cầu.
- **Ví dụ:** B02 tam giác bao; B05 ellipsoid; B08 điều kiện $2\times2$; B16PE ba điểm Pareto kèm câu hỏi kiểm tra; B16PA bảng lỗi–độ trễ.
- **Hình thức/toán học:** B01 định nghĩa đoạn nối; B13 bốn tính chất nón chính quy; B13I $\preceq_K$; B14 tối tiểu; B16P $\operatorname{Pareto}(S)$; B15 siêu phẳng tách/tựa; B16D $K^*$.
- **Ứng dụng:** B16PA lựa chọn mô hình AI; B11 nghịch ảnh SOC cho ràng buộc chuẩn.
- **Bài tập:** B09 bốn tập nhận dạng; B16PE câu hỏi kiểm tra thêm $d=(2,2)$ (B16PE là ví dụ có câu hỏi kiểm tra, không chỉ ví dụ thụ động).
- **Đầu vào:** câu nối từ A10; các viên gạch B04–B08.
- **Sản phẩm:** khả năng phân loại một tập cho trước lồi hay không bằng quy tắc hoặc phản ví dụ (B09).
- **Ký hiệu truyền:** $\theta x+(1-\theta)y$, $\operatorname{conv}S$, $\mathcal Q^{n+1}$, $\mathbb S_+^n$, $\preceq_K$, $K^*$.
- **Bước gộp/không áp dụng:** không gộp B16P/B16PE/B16PA (ba bước Pareto đã tách theo vòng 64 trang); B05, B12, B13, B13I, B14, B15 gắn nhãn tự học nên không gộp thêm; B09 giữ sau B11.
- **Câu nối:** B16D→C00: "sang hàm lồi, nơi cấu trúc miền và mục tiêu cùng tạo bảo đảm toàn cục".
- **Tổng thời lượng:** thuộc khối B, 23 phút theo phân bổ hiện hành 7/28/23/32.

### Cụm 3: Hàm lồi và đánh giá kết thúc (C00–C25)

- **Nhu cầu:** C00 (hai đáy địa phương) → C12 (cần quy tắc xây hàm mới) → C18 (hàm không lồi vẫn có cấu trúc) → C20 (cần nhận dạng mục tiêu lồi trong ước lượng tham số).
- **Trực quan:** C00 hai đồ thị; C01 dây cung; C06 ba tiếp tuyến; C10 epigraph; C20 hình log-hợp lý một đỉnh.
- **Ví dụ:** C01 $u^2$; C03 chuẩn; C08 bậc hai và LS; C20 Gauss.
- **Hình thức/toán học:** C02 định nghĩa; C06–C07 điều kiện bậc nhất/bậc hai; C10 epigraph; C20D log-lõm; C22 lồi theo $\preceq_{\mathbb S_+^m}$.
- **Ứng dụng:** C11 Jensen; C19 IRR; C20F âm log-hợp lý lồi; C21 tập hiệu suất.
- **Bài tập:** C09 tính Hessian; C23 hồi quy logistic đi đủ sáu bước; C25 tự kiểm tra ba mắt xích.
- **Đầu vào:** bảo đảm đã công bố ở A05; định nghĩa tập lồi B01.
- **Sản phẩm:** C23 trả lời vấn đề trung tâm; C24 đối chiếu LLO/CLO; C25 cho phép tự kiểm tra kết quả học tập.
- **Ký hiệu truyền:** $\operatorname{dom}f$, $\nabla f$, $\nabla^2f$, $\operatorname{epi}f$, $f^*$, $L(\alpha u+(1-\alpha)v)\ge L(u)^\alpha L(v)^{1-\alpha}$.
- **Bước gộp/không áp dụng:** không gộp C20/C20F/C20D; C17, C21, C22 tự học có điều kiện; C23, C24 và C25 tách riêng để mỗi trang giữ một luận điểm trung tâm.
- **Câu nối:** C23 khép vòng về P03; C24 tổng kết theo chuẩn; C25 chuyển sang tự kiểm tra và đọc tiếp.
- **Tổng thời lượng:** thuộc khối C, 32 phút theo phân bổ hiện hành 7/28/23/32.

## Chốt 6 mạch theo validator (đã triển khai)

1. **Mạch 1 — Mở đầu:** P00, P01, P02, P03 (4 trang).
2. **Mạch 2 — Tối ưu và mô hình hóa, kèm lịch sử:** A00, A01, A02, A03, A03L, A03W, A11, A04 (8 trang).
3. **Mạch 3 — Bảo đảm cấu trúc lồi và ca độ sáng:** A05, A06, A07, A07M, A08, A09, A10 (7 trang).
4. **Mạch 4 — Tập lồi, công cụ tập, Pareto, đối ngẫu:** B00, B01, B02, B03, B04, B05, B06, B07, B08, B10, B11, B09, B12, B13, B13I, B14, B16P, B16PE, B16PA, B15, B16D (21 trang).
5. **Mạch 5 — Hàm lồi:** C00, C01, C02, C03, C04, C05, C06, C07, C08, C09, C10, C11, C12, C13, C14, C15, C16, C17, C18, C19, C20, C20F, C20D, C21, C22 (25 trang).
6. **Mạch 6 — Đánh giá kết thúc:** C23, C24, C25 (3 trang), lần lượt vận dụng, tổng kết theo chuẩn và tự kiểm tra.

Tổng tạm thời: $4+8+7+21+25+3=68$ trang trong 6 mạch. HTML hiện có đúng 6 section ngoài; 16 trang vượt phạm vi vẫn được giữ nguyên trong khi chờ xác nhận.

## Phân bổ thời gian hiện hành

- Phân bổ hiện hành: mở/A/B/C = 7/28/23/32 phút, tổng 90 phút. Đây là bốn khối thời lượng nội bộ, không nhất thiết trùng sáu mạch RevealJS.
- Phân bổ cũ 7/23/27/33 đã được thay thế; mọi số 7/23/27/33 còn lại trong tài liệu chỉ mang giá trị lịch sử trong review-log, không phải cấu hình hiện hành.

### Ma trận xử lý từng trang

Mọi trang vẫn xuất hiện theo một tuyến RevealJS liên tục từ P00 đến C25. `Chế độ` chỉ là cách xử lý sư phạm trong buổi học, không tạo tuyến, nhánh, badge hoặc cơ chế điều hướng riêng.

| Khối | Mã | Chế độ | Phút |
|---|---|---|---:|
| Mở | P00 | dẫn nhanh | 1 |
| Mở | P01 | trình bày | 2 |
| Mở | P02 | trình bày | 2 |
| Mở | P03 | trình bày | 2 |
| A | A00 | trình bày | 1,5 |
| A | A01 | trình bày | 2 |
| A | A02 | định vị và giao đọc sau | 0,5 |
| A | A03 | trình bày | 1,5 |
| A | A03L | trình bày | 1,5 |
| A | A03W | trình bày | 1,5 |
| A | A11 | định vị và giao đọc sau | 0,5 |
| A | A04 | dẫn nhanh | 1 |
| A | A05 | trình bày | 2 |
| A | A06 | trình bày | 2 |
| A | A07 | trình bày | 2 |
| A | A07M | trình bày | 3 |
| A | A08 | trình bày | 3 |
| A | A09 | trình bày | 4 |
| A | A10 | trình bày | 2 |
| B | B00 | trình bày | 2 |
| B | B01 | trình bày | 2 |
| B | B02 | dẫn nhanh | 1 |
| B | B03 | định vị và giao đọc sau | 0,5 |
| B | B04 | dẫn nhanh | 1 |
| B | B05 | định vị và giao đọc sau | 0,5 |
| B | B06 | dẫn nhanh | 1 |
| B | B07 | dẫn nhanh | 1 |
| B | B08 | dẫn nhanh | 1 |
| B | B10 | trình bày | 1,5 |
| B | B11 | trình bày | 1,5 |
| B | B09 | trình bày | 3 |
| B | B12 | định vị và giao đọc sau | 0,5 |
| B | B13 | định vị và giao đọc sau | 0,5 |
| B | B13I | định vị và giao đọc sau | 0,5 |
| B | B14 | dẫn nhanh | 1 |
| B | B16P | dẫn nhanh | 1 |
| B | B16PE | trình bày | 1,5 |
| B | B16PA | dẫn nhanh | 1 |
| B | B15 | định vị và giao đọc sau | 0,5 |
| B | B16D | định vị và giao đọc sau | 0,5 |
| C+kết | C00 | trình bày | 1,5 |
| C+kết | C01 | trình bày | 1,5 |
| C+kết | C02 | trình bày | 2 |
| C+kết | C03 | định vị và giao đọc sau | 0,5 |
| C+kết | C04 | dẫn nhanh | 1 |
| C+kết | C05 | định vị và giao đọc sau | 0,5 |
| C+kết | C06 | trình bày | 2 |
| C+kết | C07 | trình bày | 2 |
| C+kết | C08 | trình bày | 1,5 |
| C+kết | C09 | trình bày | 3 |
| C+kết | C10 | trình bày | 1,5 |
| C+kết | C11 | định vị và giao đọc sau | 0,5 |
| C+kết | C12 | dẫn nhanh | 1 |
| C+kết | C13 | định vị và giao đọc sau | 0,5 |
| C+kết | C14 | định vị và giao đọc sau | 0,5 |
| C+kết | C15 | định vị và giao đọc sau | 0,5 |
| C+kết | C16 | định vị và giao đọc sau | 0,5 |
| C+kết | C17 | định vị và giao đọc sau | 0,5 |
| C+kết | C18 | dẫn nhanh | 1 |
| C+kết | C19 | dẫn nhanh | 1 |
| C+kết | C20 | trình bày | 1,5 |
| C+kết | C20F | trình bày | 2 |
| C+kết | C20D | dẫn nhanh | 1 |
| C+kết | C21 | định vị và giao đọc sau | 0,5 |
| C+kết | C22 | định vị và giao đọc sau | 0,5 |
| C+kết | C23 | trình bày | 2 |
| C+kết | C24 | dẫn nhanh | 1 |
| C+kết | C25 | định vị và giao đọc sau | 0,5 |
| **Tổng** | **68 trang** | **một tuyến liên tục** | **90** |

Tổng theo khối: mở 7 phút; A 28 phút; B 23 phút; C và kết thúc 32 phút. Quy tắc nhất quán là từ 1,5 phút trở lên dùng `trình bày`, 1 phút dùng `dẫn nhanh`, và 0,5 phút dùng `định vị và giao đọc sau`.

## Đồng bộ outline

- Outline đã ghi 68 trang; storyboard này khớp 68 hàng, gồm A03L, A03W, C24 và C25.
- Sáu mạch đã chốt như trên, đúng thứ tự hiện tại của HTML.
- Ánh xạ lec01→lec02→lec03 ở mức bài giảng: mạch 2 và cụm C00–C22 chủ yếu từ lec01/lec03; mạch 3–4 từ lec02; C23–C25 là tổng hợp và đánh giá. **Mọi tham chiếu trang PDF cụ thể (ví dụ "lec01 tr.9") được kế thừa từ outline và review-log, chưa được worker xác minh trực tiếp trên PDF.**

## Tự kiểm cuối

- 68 hàng duy nhất trong bản đồ, mỗi hàng một `data-slide-id`, đúng thứ tự HTML: **đạt** (đếm 1–68, không trùng mã, khớp thứ tự section trong HTML).
- 6 mạch đúng thứ tự hiện tại: **đạt** (P00–P03; A00,A01,A02,A03,A03L,A03W,A11,A04; A05–A10; B00–B16D với B09 sau B11; C00–C22; C23–C25), tổng $4+8+7+21+25+3=68$.
- P03 hiển thị vấn đề trung tâm và sáu chặng, không lộ mã nội bộ hoặc thời lượng: **đạt**.
- A06 có ý chính, điểm dễ nhầm và câu chuyển; B12 có phép dựng trọng số lồi và giải thích điều kiện mẫu số dương: **đạt**.
