# Storyboard Bài 01: ứng dụng trước lý thuyết

## Bản đồ bảy mạch kể chuyện

| Mạch | Chức năng | Điểm vào | Đầu ra dùng cho mạch sau | Phân bổ nội bộ |
|---|---|---|---|---:|
| 1. Mở đầu và ba nhu cầu | Đặt vấn đề trung tâm và chuẩn đầu ra | Kiến thức tiên quyết | Ba quyết định cần mô hình hóa | 0,15 tiết lý thuyết |
| 2. Điều khiển một bước | Xây ca có đánh đổi, ràng buộc và nghiệm biên | Nhu cầu bám đích | Mô hình $\min_{u\in C}q(u)$ và nghi vấn về điều kiện dừng | 0,30 tiết lý thuyết |
| 3. Hồi quy tuyến tính | Xây ca học tham số bằng bình phương nhỏ nhất | Dữ liệu dự đoán liên tục | Mô hình $\min_w\lVert Xw-y\rVert^2$ và nghi vấn về duy nhất | 0,30 tiết lý thuyết |
| 4. Hồi quy logistic | Xây ca phân loại có cận dưới đúng nhưng có thể không có nghiệm | Dữ liệu nhãn nhị phân | Mô hình mất mát logistic và nghi vấn về tồn tại | 0,30 tiết lý thuyết |
| 5. Khuôn chung | Trừu tượng hóa ba ca bằng cùng một ngôn ngữ | Ba mô hình cụ thể | $\min_{x\in C}f_0(x)$, bốn loại kết luận và ba chặng chứng nhận | 0,20 tiết lý thuyết |
| 6. Công cụ lồi vừa đủ | Xây đúng các định nghĩa và định lý cần cho ba ca | Bốn câu hỏi chứng nhận | Bộ công cụ về miền, mục tiêu, toàn cục, tồn tại và duy nhất | 0,75 tiết lý thuyết |
| 7. Trở lại ba ca | Ghép công cụ, diễn giải nghiệm và chuyển giao | Bộ công cụ lồi | Ba chứng nhận hoàn chỉnh và bài tập mới | 1,00 tiết bài tập |

Tổng phân bổ: 2 tiết lý thuyết và 1 tiết bài tập. Không đưa phân bổ này lên mặt trang chiếu hoặc vào ghi chú diễn giả.

## Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm | Ký hiệu truyền tiếp | LLO/CLO |
|---|---|---|---|---|---|---|---|---|---|
| Điều khiển một bước | M03, D01 | D01 | D03 | D01–D03, T01 | K01 | D04 | Đại số một biến → lập và giải mô hình bị chặn | $x_0,t,u,u_{\max},\lambda,q$ → $x,C,f_0$ | LLO1, CLO1 |
| Hồi quy tuyến tính | M03, L01 | L02 | L03 | L01–L03, T01 | K02 | L04 | Đại số tuyến tính → lập mô hình và đọc nghiệm | $X,y,w,J$ → $x,C,f_0$ | LLO1, CLO1 |
| Hồi quy logistic | M03, G01 | G01, G03 | G03 | G02, G03, T01 | K03 | G04 | Xác suất và hàm mũ → phân biệt cận dưới đúng với nghiệm | $a_i,y_i,w,L$ → $x,C,f_0$ | LLO1, CLO1 |
| Tập lồi | T04, F01 | F01 | F03 | F02, F04 | F05, K01–K03 | F05 | Đoạn thẳng và tập hợp → chứng nhận miền lồi | $C,x,y,\theta$ | LLO2, CLO1 |
| Hàm lồi và chứng nhận | T04, H01 | H01, H03, H07 | H05, H06 | H02–H07 | K01–K04 | H07, K05 | Đạo hàm, Hessian → kết luận toàn cục, tồn tại, duy nhất | $f,\nabla f,\nabla^2f$ | LLO2, CLO1 |

Các ví dụ D03, L03 và G03 được đặt trước định nghĩa lồi để làm rõ nhu cầu. Ký hiệu của chúng được giữ nguyên tại K01–K03. Không bước nào bị bỏ ngầm. Hai bước trực quan và ví dụ được gộp ở D02–D03, L02–L03 và G03 vì mỗi trang vẫn giữ một luận điểm trung tâm.

## Bảng theo từng trang

| Mã | Tiêu đề | Lý do tồn tại và khoảng trống được giải quyết | Kết nối vào → kết nối ra | LLO/CLO | Quyết định |
|---|---|---|---|---|---|
| M01 | Giới thiệu tối ưu, tập lồi và hàm lồi | Định danh bài, học phần, học kỳ và đơn vị | Mở bài → M02 | CLO1 | Sửa |
| M02 | Mục tiêu học tập | Nêu bốn nội dung: các ví dụ tối ưu, nhu cầu chứng nhận, công cụ lồi và quay lại ví dụ | M01 → M03 | LLO1, LLO2, CLO1 | Sửa |
| M03 | Một số bài toán tối ưu trong điều khiển và AI | Tạo ba quyết định cụ thể và vấn đề trung tâm bằng ba hình khái quát | M02 → D01 | LLO1, CLO1 | Sửa; thêm ba SVG |
| D01 | Bài toán điều khiển một bước | Xác định dữ kiện, động lực, biến và miền bằng sơ đồ trạng thái–tác động–chi phí | M03 → D02 | LLO1, CLO1 | Tách từ U01; chuyển SVG từ D02 |
| D02 | Tối ưu nhiều mục tiêu: Bám đích và Năng lượng | Làm rõ lựa chọn mô hình khi gộp bám đích và năng lượng thành một hàm chi phí | D01 → D03 | LLO1, CLO1 | Sửa tiêu đề; nhóm các giải thích vào thẻ năng lượng; tách công thức mô hình |
| D03 | Nghiệm của ca điều khiển | Dùng đồ thị để phân biệt nghiệm tự do ngoài miền với nghiệm tối ưu trên biên và so sánh hai giá trị mục tiêu | D02 → D04 | LLO1, CLO1 | Sửa; thêm SVG |
| D04 | Nghiệm tối ưu trên biên | Phát hiện điều kiện $q'(u)=0$ không áp dụng máy móc ở biên | D03 → L01 | LLO1, CLO1 | Thêm câu hỏi; làm rõ xấp xỉ biến thiên bậc nhất |
| L01 | Bài toán dự đoán giá trị số | Đặt kiểu, kích thước, mô hình dự đoán và biến tham số | D04 → L02 | LLO1, CLO1 | Tách từ U03 |
| L02 | Bình phương nhỏ nhất | Nối phần dư với khoảng cách hình học và hàm mục tiêu; nêu rõ lựa chọn mô hình chủ quan | L01 → L03 | LLO1, CLO1 | Sửa; thêm SVG |
| L03 | Ví dụ hồi quy tuyến tính | Tính nghiệm, dự đoán, phần dư và tổng bình phương sai số; chỉ rõ cột toàn số một tạo hệ số chặn $b$ và $a^*=1/2$ là hệ số góc | L02 → L04 | LLO1, CLO1 | Thêm |
| L04 | Hạng của ma trận thiết kế | Tạo nhu cầu phân biệt tồn tại và duy nhất | L03 → G01 | LLO1, CLO1 | Thêm câu hỏi |
| G01 | Bài toán phân loại bằng biên tuyến tính | Chuyển nhãn nhị phân thành đại lượng đo độ đúng của dự đoán; minh họa mặt phẳng đặc trưng, hai miền dấu, biên qua gốc và véc tơ pháp tuyến $w$ | L04 → G02 | LLO1, CLO1 | Tách từ U04; thêm SVG `g01-linear-boundary-2d.svg` |
| G02 | Mất mát logistic | Xây mục tiêu từ từng biên có dấu, nêu đúng miền $\mathbb R^d$ | G01 → G03 | LLO1, CLO1 | Sửa |
| G03 | Dữ liệu tách tuyến tính | Cho ví dụ số có mất mát giảm mãi nhưng không đạt cận dưới | G02 → G04 | LLO1, CLO1 | Thêm; sửa SVG sẵn có |
| G04 | Giá trị tốt dần và sự tồn tại nghiệm | Buộc người học phân biệt dãy tốt dần với một nghiệm hữu hạn | G03 → T01 | LLO1, CLO1 | Thêm câu hỏi |
| T01 | Bài toán tối ưu tổng quát | Rút cấu trúc chung sau ba ca, không mở bài bằng định nghĩa | G04 → T02 | LLO1, CLO1 | Giữ, đổi vị trí |
| T02 | 3 bài toán tối ưu đã học | Kiểm tra nghĩa của dữ kiện, $x$, $f_0$ và $C$ trong từng bài toán | T01 → T03 | LLO1, CLO1 | Sửa |
| T03 | Bốn loại chứng nhận | Phân biệt bốn loại chứng nhận: khả thi, giá trị tối ưu, tồn tại và duy nhất | T02 → T04 | LLO1, LLO2, CLO1 | Thêm |
| T04 | Các câu hỏi | Chuyển bốn loại chứng nhận thành sáu câu hỏi dẫn vào tập lồi và hàm lồi | T03 → F01 | LLO1, LLO2, CLO1 | Sửa |
| F01 | Đoạn nối giữa hai phương án | Tạo trực giác miền không có lỗ trên các đoạn khả thi | T04 → F02 | LLO2, CLO1 | Sửa; dùng SVG |
| F02 | Định nghĩa tập lồi | Cung cấp lượng từ và miền của hệ số tổ hợp lồi | F01 → F03 | LLO2, CLO1 | Giữ |
| F03 | Các tập lồi dùng trong ba ví dụ | Chỉ giữ toàn không gian, đoạn, tập affine và nửa không gian | F02 → F04 | LLO2, CLO1 | Gộp và lược |
| F04 | Xây miền lồi từ các tập đơn giản | Cung cấp giao và nghịch ảnh affine, hai phép cần cho ràng buộc | F03 → F05 | LLO2, CLO1 | Sửa |
| F05 | Kiểm tra miền của ba ví dụ | Đo khả năng dùng định nghĩa và phép bảo toàn | F04 → H01 | LLO2, CLO1 | Sửa thành câu hỏi |
| H01 | Dây cung và đồ thị hàm | Tạo trực giác độ cong trước bất đẳng thức | F05 → H02 | LLO2, CLO1 | Giữ; dùng SVG |
| H02 | Định nghĩa hàm lồi | Phát biểu lồi và lồi chặt (còn gọi là lồi nghiêm ngặt) trên miền lồi bằng cùng ký hiệu | H01 → H03 | LLO2, CLO1 | Giữ |
| H03 | Cực tiểu địa phương là toàn cục | Trả lời câu hỏi toàn cục và chỉ ra vai trò của cả hai giả thiết lồi | H02 → H04 | LLO2, CLO1 | Dời T03; dùng SVG |
| H04 | Điều kiện bậc nhất | Cho chứng nhận bằng siêu phẳng tiếp xúc trên miền mở, lồi | H03 → H05 | LLO2, CLO1 | Tách từ H04 |
| H05 | Điều kiện bậc hai | Cho chứng nhận bằng Hessian và áp dụng vào hàm bậc hai | H04 → H06 | LLO2, CLO1 | Tách từ H04; dùng SVG |
| H06 | Ghép các viên gạch lồi | Dùng tổng không âm và hợp affine để dựng ba mục tiêu | H05 → H07 | LLO2, CLO1 | Sửa H05 |
| H07 | Tồn tại và duy nhất | Phân biệt lồi, lồi chặt, miền đóng bị chặn và tính bức bằng phản ví dụ | H06 → K01 | LLO1, LLO2, CLO1 | Thêm; dùng SVG; có câu hỏi |
| K01 | Chứng nhận ca điều khiển | Ghép miền đóng, bị chặn và lồi với độ cong để kết luận tồn tại và duy nhất | H07 → K02 | LLO1, LLO2, CLO1 | Tách từ K01 |
| K02 | Chứng nhận hồi quy tuyến tính | Kết luận tồn tại luôn có và duy nhất đúng khi $X$ hạng cột đầy đủ | K01 → K03 | LLO1, LLO2, CLO1 | Tách từ K01 |
| K03 | Chứng nhận hồi quy logistic | Chỉ ra lồi không kéo theo tồn tại và vai trò của chính quy hóa | K02 → K04 | LLO1, LLO2, CLO1 | Tách từ K01 |
| K04 | So sánh ba ca | Đặt các kết luận cạnh nhau để ngăn suy diễn quá mức từ tính lồi | K03 → K05 | LLO1, LLO2, CLO1 | Thêm |
| K05 | Bài tập chuyển giao về chiếu sáng | Đo khả năng lập mô hình và đề xuất chuỗi chứng nhận cho ca mới | K04 → K06 | LLO1, LLO2, CLO1 | Khôi phục lec01 trang 1-9–1-12 làm bài tập |
| K06 | Tổng kết và tài liệu | Thu hồi vấn đề trung tâm, tự kiểm tra và ghi nguồn truy nguyên | K05 → Bài 02 | LLO1, LLO2, CLO1 | Sửa |

## Ánh xạ trang cũ sang cấu trúc mới

| Trang skeleton cũ | Trang mới | Xử lý |
|---|---|---|
| M01–M03 | M01–M03 | Giữ vai trò, thay toàn bộ câu chữ tạm bằng nội dung hoàn chỉnh |
| U01–U02 | D01–D04 | Tách ca điều khiển thành mô hình, trực quan, ví dụ và kiểm tra |
| U03 | L01–L04 | Tách hồi quy tuyến tính thành dữ kiện, mất mát, ví dụ và kiểm tra |
| U04 | G01–G04 | Tách hồi quy logistic; thêm phản ví dụ không tồn tại nghiệm |
| T01–T02 | T01–T02 | Giữ và bổ sung dữ liệu ánh xạ |
| T03–T04 | H03, T04 | Chuyển địa phương–toàn cục sang mạch công cụ; giữ cầu vào lý thuyết |
| F01–F04 | F01–F04 | Giữ lõi, lược tập và phép không dùng trực tiếp |
| F05 | F05, K01–K03 | Tách kiểm tra miền khỏi chứng nhận hoàn chỉnh |
| H01–H05 | H01–H06 | Tách điều kiện bậc nhất/bậc hai; giới hạn phép bảo toàn |
| K01 | K01–K04 | Tách từng ca và bảng so sánh |
| K02 | K05–K06 | Tách bài tập chuyển giao khỏi tổng kết và tài liệu |

## Ánh xạ ba bộ trang chiếu MIT theo đúng thứ tự

| Nguồn | Trang nguồn | Quyết định và đích dùng |
|---|---|---|
| lec01 | 1-1 | Bỏ; chỉ là bìa mẫu |
| lec01 | 1-2 | Giữ ý mô hình chung tại T01 |
| lec01 | 1-3 | Gộp vai trò nhu cầu ứng dụng vào M03 |
| lec01 | 1-4 | Giữ ý phân lớp và nhu cầu cấu trúc tại T04 |
| lec01 | 1-5 | Giữ bình phương nhỏ nhất tại L01–L03 |
| lec01 | 1-6 | Bỏ khỏi tuyến chính; quy hoạch tuyến tính thuộc bài sau |
| lec01 | 1-7–1-8 | Giữ khái niệm bài toán lồi tại H02–H03 và K01–K04 |
| lec01 | 1-9–1-12 | Chuyển thành bài tập chiếu sáng K05, không dùng như ca chính thứ tư |
| lec01 | 1-13 | Dùng để kiểm tra mục tiêu học tập tại M02 |
| lec01 | 1-14 | Giữ quan hệ địa phương–toàn cục tại H03 |
| lec01 | 1-15 | Bỏ lịch sử vì không phục vụ mạch nhân quả của bài |
| lec02 | 2-1–2-2 | Dùng rất nhẹ làm cầu vào F01; không giữ trang giới thiệu riêng |
| lec02 | 2-3 | Giữ định nghĩa tập lồi tại F02 |
| lec02 | 2-4–2-5 | Gộp các ví dụ trực tiếp dùng vào F03 |
| lec02 | 2-6 | Giữ nửa không gian tại F03 |
| lec02 | 2-7–2-10 | Bỏ hoặc chuyển đọc thêm; không phục vụ ba ca |
| lec02 | 2-11–2-13 | Giữ giao và ánh xạ affine tại F04 |
| lec02 | 2-14–2-23 | Bỏ khỏi Bài 01: nón, thứ tự tổng quát, tách và siêu phẳng đỡ |
| lec03 | 3-1 | Bỏ trang giới thiệu riêng |
| lec03 | 3-2 | Giữ định nghĩa tại H02 |
| lec03 | 3-3–3-4 | Gộp vào trực giác H01 và ví dụ H05–H06 |
| lec03 | 3-5–3-6 | Bỏ khỏi tuyến chính |
| lec03 | 3-7 | Giữ điều kiện bậc nhất tại H04 |
| lec03 | 3-8 | Giữ điều kiện bậc hai tại H05 |
| lec03 | 3-9 | Giữ hàm bậc hai tại H05 và L02–L03; bỏ quadratic-over-linear |
| lec03 | 3-10–3-12 | Bỏ hoặc chuyển đọc thêm |
| lec03 | 3-13–3-14 | Giữ tổng không âm và hợp affine tại H06 |
| lec03 | 3-15–3-31 | Bỏ khỏi Bài 01: thư viện rộng, epigraph, Jensen, liên hợp, tựa lồi và log-concavity |

Ánh xạ lec01 được điều phối viên sửa so với đề xuất của một reader: quy hoạch tuyến tính không phải một trong ba ca của bài; bảy mạch cố định là cấu trúc do người dùng yêu cầu, không phải tên mục của MIT.

## Kiểm kê SVG Bài 01

| Tệp | Quyết định | Vị trí hoặc lý do |
|---|---|---|
| `optimization-model-anatomy.svg` | Giữ | T01 |
| `convex-set-and-combination.svg` | Giữ | F01 |
| `convex-concave-strict.svg` | Giữ | H01 |
| `local-versus-global-minimum.svg` | Giữ | H03 |
| `first-second-order-convexity.svg` | Giữ | H05 |
| `existence-and-uniqueness.svg` | Giữ | H07 |
| `logistic-loss-convex-case.svg` | Sửa | G03; ưu tiên miền $\mathbb R$ và trường hợp không đạt nghiệm |
| `one-step-control.svg` | Thêm | D01 |
| `linear-regression-fit.svg` | Thêm | L02 |
| `m03-control-target.svg` | Thêm | M03 |
| `m03-linear-fit-sketch.svg` | Thêm | M03 |
| `m03-logistic-classes.svg` | Thêm | M03 |
| `d03-cost-parabola-feasible.svg` | Thêm | D03 |
| `basic-convex-set-library.svg` | Bỏ khỏi tuyến | Rộng hơn nhu cầu ba ca |
| `convex-hull-and-conic-hull.svg` | Bỏ khỏi tuyến | Nón lồi không thuộc phạm vi cần thiết |
| `convex-set-preservation-map.svg` | Bỏ khỏi tuyến | Có phép tổng Minkowski chưa cần |
| `epigraph-levelset-indicator.svg` | Bỏ khỏi tuyến | Epigraph và hàm chỉ báo không cần cho chứng nhận |
| `convex-preservation-and-jensen.svg` | Bỏ khỏi tuyến | Jensen vượt nhu cầu Bài 01 |
| `line-restriction-convex-library.svg` | Bỏ khỏi tuyến | Thư viện hàm rộng và dễ quá tải |
| `psd-cone-and-quadratic-directions.svg` | Bỏ khỏi tuyến | Nón nửa xác định dương không cần trình bày riêng |

## Câu nối bắt buộc

- M03 → D01: bắt đầu bằng quyết định vật lý có giới hạn.
- D04 → L01: chuyển từ một biến điều khiển sang nhiều tham số học từ dữ liệu.
- L04 → G01: chuyển từ dự đoán liên tục sang quyết định phân loại.
- G04 → T01: ba ca tạo ba nghi vấn khác nhau nhưng cùng một khuôn mô hình.
- T04 → F01: chứng nhận toàn cục bắt đầu từ cấu trúc của miền khả thi.
- F05 → H01: miền lồi mới là một nửa; mục tiêu còn phải có độ cong phù hợp.
- H07 → K01: dùng từng giả thiết đúng chỗ, không gộp lồi với tồn tại hay duy nhất.
- K04 → K05: chuyển từ ba ca đã biết sang một ca mới để đo khả năng lập mô hình.

## Nội dung bỏ hoặc chuyển khỏi mặt trang chiếu

- Không có lịch sử kiểu danh sách năm–tên–thuật toán.
- Không có nhãn quy trình, mã tuyến, mã trang hoặc thời lượng trên mặt trang chiếu và ghi chú diễn giả.
- Chứng minh đại số dài chuyển sang `lecture-note.md`; mặt trang chiếu chỉ giữ mục tiêu, ý tưởng và bước then chốt.
- Bài giải đầy đủ của K05 chuyển sang ghi chú diễn giả và tệp bài tập; mặt trang chiếu chỉ nêu dữ kiện và yêu cầu.
