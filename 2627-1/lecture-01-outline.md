# Dàn ý Bài 01: Giới thiệu tối ưu, tập lồi và hàm lồi

## Thông tin và chuẩn đầu ra

- Học phần: Cơ sở toán học cho trí tuệ nhân tạo (AI), học kỳ 1, năm học 2026–2027.
- Đầu ra: `lecture-01-gioi-thieu-toi-uu-tap-loi-ham-loi.html`.
- Mẫu theo thứ tự: MIT 6.079 `lec01` → `lec02` → `lec03`.
- LLO1: hiểu các khái niệm cơ bản về tối ưu toán học, tối ưu lồi và ứng dụng.
- LLO2: trình bày khái niệm, tính chất của tập lồi, hàm lồi và áp dụng trong bài toán tối ưu.
- CLO1: nhận dạng dạng bài toán tối ưu và xây dựng mô hình toán từ một bài toán AI.

## Nguyên tắc tổ chức

Mỗi cụm khái niệm đi theo thứ tự:

$$
\text{nhu cầu}\to\text{trực quan}\to\text{ví dụ}\to
\text{hình thức/toán học}\to\text{ứng dụng}\to\text{bài tập}.
$$

Phần lịch sử không dùng như niên biểu. A11 giải thích chuỗi nhu cầu: Phương pháp Đơn hình cho quy hoạch tuyến tính → nhu cầu bảo đảm tính toán → phương pháp thời gian đa thức → Phương pháp điểm trong cho tối ưu lồi phi tuyến → thuật toán quy mô lớn cho huấn luyện học máy.

## Cấu trúc trình chiếu

- Bộ tạm thời gồm 68 trang theo một tuyến liên tục từ đầu đến cuối; 16 trang vượt phạm vi lecture note chưa bị xóa trong khi chờ xác nhận.
- Các lớp kỹ thuật dùng để kiểm định không tạo tuyến trình chiếu riêng và không xuất hiện trên mặt trang hoặc trong ghi chú.

## Phần mở đầu

| Mã | Nội dung | Vai trò |
|---|---|---|
| P00–P01 | Tiêu đề, vị trí và tiên quyết | Định vị bài học và kích hoạt kiến thức nền. |
| P02 | Mục tiêu học tập | Chuyển LLO thành biểu hiện quan sát được. |
| P03 | Hành trình nội dung | Công bố vấn đề trung tâm và sáu chặng: mô hình hóa; bảo đảm lồi; tập lồi; Pareto và đối ngẫu; hàm lồi; ca tổng hợp. |

## A. Tối ưu và mô hình hóa (A00–A10, có A11 nằm giữa A03 và A04 theo vị trí HTML)

| Mã | Nội dung | Bước trong hành trình | Nguồn |
|---|---|---|---|
| A00 | Bài toán tối ưu | Nhu cầu, ví dụ AI | lec01 tr.2–4 |
| A01 | Mô hình hóa bài toán tối ưu | Trực quan và khuôn toán học | lec01 tr.2–3 |
| A02 | Ví dụ tự học củng cố khuôn mô hình | Ba mô hình cụ thể cho khớp dữ liệu, danh mục đầu tư và kích thước mạch; dùng để củng cố khuôn sau A01, trước nhu cầu chứng nhận ở A03; không chặn tuyến giảng chính | lec01 tr.3 |
| A03 | Cấu trúc của bài toán tối ưu | Nhu cầu cho lồi | lec01 tr.4,14 |
| A03L | Cực tiểu địa phương và toàn cục | Định nghĩa tương đối với tập khả thi $C$; trực quan và ví dụ $f(x)=(x^2-1)^2$ trên $\mathbb R$; hình `img/lec-01/local-versus-global-minimum.svg`; ứng dụng AI là điểm thuật toán dừng chưa tự chứng nhận toàn cục | Boyd &amp; Vandenberghe (2004), §4.2.1 |
| A03W | Tồn tại và duy nhất | Định lý Weierstrass ($C\ne\varnothing$ compact, $f_0$ liên tục thì minimum đạt được); phân biệt tồn tại với nhiều nhất một nghiệm (lồi chặt); ví dụ $\min e^x$ trên $\mathbb R$ có infimum $0$ không đạt; hình `img/lec-01/existence-and-uniqueness.svg` | Boyd &amp; Vandenberghe (2004), §4.2 |
| A11 | Lịch sử lĩnh vực tối ưu | Quan hệ nhân quả; từ thập niên 2000, các phương pháp quy mô lớn mở rộng mạnh cho học máy, không phải mốc ra đời của gradient ngẫu nhiên; nằm giữa A03 và A04 theo vị trí HTML | lec01 tr.15; Bottou, Curtis & Nocedal (2018) |
| A04 | Bình phương tối thiểu và LP | Ví dụ lớp có cấu trúc | lec01 tr.5–6 |
| A05 | Bảo đảm của cấu trúc lồi | Trực quan bảo đảm; trên mặt có một câu: định nghĩa tập lồi ở B01 và hàm lồi ở C02; đây là lời hứa bảo đảm, không dùng làm định nghĩa | lec01 tr.7 |
| A06 | Nhận dạng–cải dạng–giải | Quy trình ứng dụng | lec01 tr.8,13 |
| A07 | Ví dụ độ sáng | Nhu cầu và trực quan hai nguồn–hai vị trí đo | lec01 tr.9 |
| A07M | Mô hình bài toán độ sáng | Dữ kiện, biến, miền log và mục tiêu | lec01 tr.9 |
| A08–A09 | Ca độ sáng | Ví dụ tính dẫn nhập/củng cố, rồi cải dạng; A09 ghi rõ trên mặt rằng các quy tắc $1/u$ lồi và cực đại điểm sẽ được chứng minh ở C12–C15 | lec01 tr.10–11 |
| A10 | Hai ràng buộc, hai độ khó | Giới hạn và cầu sang tập lồi | lec01 tr.12 |

## B. Tập lồi và ràng buộc lồi

| Mã | Nội dung | Bước trong hành trình | Nguồn |
|---|---|---|---|
| B00 | Tập lồi | Nhu cầu và trực quan đoạn nối | lec02 tr.2–3 |
| B01 | Định nghĩa tập lồi và đối chiếu affine | Hình thức | lec02 tr.2–3 |
| B02 | Bao lồi | Ví dụ và ứng dụng | lec02 tr.4 |
| B03 | Nón lồi | Ví dụ và ứng dụng | lec02 tr.5 |
| B04 | Siêu phẳng và nửa không gian | Ví dụ và ứng dụng | lec02 tr.6 |
| B05 | Cầu và ellipsoid | Ví dụ và ứng dụng | lec02 tr.7 |
| B06 | Cầu chuẩn và SOC | Ví dụ và ứng dụng | lec02 tr.8 |
| B07 | Đa diện | Ví dụ và ứng dụng | lec02 tr.9 |
| B08 | Nón PSD | Ví dụ và ứng dụng | lec02 tr.10 |
| B10 | Giao của các tập lồi | Hình thức và ứng dụng của giao | lec02 tr.11–12 |
| B11 | Ảnh và nghịch ảnh affine | Công cụ xây tập | lec02 tr.13 |
| B09 | Kiểm tra công cụ lõi sau B11, trước B12 | Bài tập tổng hợp trước phần mở rộng tự học | lec02 tr.7–13 |
| B12 | Phối cảnh và phân tuyến tính | Công cụ xây tập, mở rộng tự học | lec02 tr.14–15 |
| B13 | Nón chính quy | Định nghĩa bốn tính chất cấu thành | lec02 tr.16 |
| B13I | Bất đẳng thức tổng quát | Định nghĩa thứ tự bộ phận | lec02 tr.16 |
| B14 | Phần tử nhỏ nhất và tối tiểu | Định nghĩa song song | lec02 tr.17 |
| B16P | Biên Pareto | Định nghĩa | lec02 tr.18 |
| B16PE | Ví dụ biên Pareto có câu hỏi kiểm tra | Ví dụ ba điểm kèm câu hỏi kiểm tra, không chỉ ví dụ thụ động | lec02 tr.18 |
| B16PA | Ứng dụng lựa chọn mô hình AI | Ứng dụng bảng lỗi–độ trễ | lec02 tr.19, 23 |
| B15 | Siêu phẳng tách và siêu phẳng tựa | Chứng nhận hình học | lec02 tr.19–21 |
| B16D | Nón đối ngẫu | Ví dụ hai bao hàm | lec02 tr.22 |

## C. Hàm lồi

| Mã | Nội dung | Bước trong hành trình | Nguồn |
|---|---|---|---|
| C00 | Hàm lồi | Nhu cầu và trực quan bằng đồ thị, cực tiểu địa phương và toàn cục | lec01 tr.7,14; lec03 tr.2 |
| C01 | Dây cung và ví dụ $u^2$ | Trực quan và ví dụ | lec03 tr.2–3 |
| C02 | Định nghĩa hàm lồi | Hình thức | lec03 tr.2–3 |
| C03–C05 | Hàm cơ sở, hạn chế theo đường, giá trị mở rộng | Ví dụ và công cụ | lec03 tr.4–6 |
| C06–C09 | Điều kiện vi phân, Hessian và bài tập Hessian | Hình thức, ứng dụng; C09 là kiểm tra công cụ lõi sau C08, trước C10 và các phần mở rộng tự học C11–C22 | lec03 tr.7–10 |
| C10 | Tập mức dưới và epigraph | Cầu nối hàm→tập | lec03 tr.11 |
| C11 | Jensen | Ứng dụng xác suất tự học | lec03 tr.12 |
| C12–C16 | Phép bảo toàn | Nhu cầu, quy tắc, ví dụ, kiểm tra | lec03 tr.13–20 |
| C17–C19 | Liên hợp, tựa lồi và tựa lõm | Tự học có điều kiện | lec03 tr.21–26 |
| C20–C21 | Log-lõm: ví dụ Gauss, log-hợp lý theo $\mu$, định nghĩa đủ lượng từ và ứng dụng | C20 nêu nhu cầu, dữ liệu, biến và trực quan; C20F kiểm tra độ cong; C20D phát biểu định nghĩa, hệ quả và câu hỏi; C21 mở rộng qua biến ẩn | lec03 tr.27–30 |
| C22 | Mở rộng ma trận | Tự học có điều kiện | lec03 tr.31 |
| C23 | Ca AI khép vòng | Bài tập đi đủ sáu bước, trả lời vấn đề trung tâm | Tổng hợp |
| C24 | Tổng kết theo chuẩn đầu ra | Một luận điểm nối LLO1, LLO2 và CLO1 | Đề cương; Boyd & Vandenberghe (2004), §4.2 |
| C25 | Tự kiểm tra và tài liệu đọc | Ba câu tự kiểm tra, gợi ý trong notes và hai nguồn đọc truy nguyên | Boyd & Vandenberghe (2004), Ch. 2–4; MIT 6.079, Bài giảng 1–3 |

## Đồng bộ storyboard (2026-08-30, cập nhật theo validator; bổ sung A03L/A03W)

- Tổng tạm thời là **68 trang** sau khi thêm A03L và A03W ngay sau A03; đây là **bổ sung độc lập**, trong khi quyết định phạm vi 16 slide còn lại vẫn **chờ xác nhận** và chưa được áp dụng vào tuyến.
- Xác nhận 68 trang; storyboard `lecture-01-storyboard.md` khớp 68 `data-slide-id` theo thứ tự HTML, gồm A03L, A03W, C24 và C25.
- Chốt 6 mạch theo thứ tự HTML với tổng $4+8+7+21+25+3=68$ trang:
  1. Mạch 1 — Mở đầu: P00, P01, P02, P03 (4 trang).
  2. Mạch 2 — Tối ưu và mô hình hóa, kèm lịch sử: A00, A01, A02, A03, A03L, A03W, A11, A04 (8 trang).
  3. Mạch 3 — Bảo đảm cấu trúc lồi và ca độ sáng: A05, A06, A07, A07M, A08, A09, A10 (7 trang).
  4. Mạch 4 — Tập lồi, công cụ tập, Pareto, đối ngẫu: B00, B01, B02, B03, B04, B05, B06, B07, B08, B10, B11, B09, B12, B13, B13I, B14, B16P, B16PE, B16PA, B15, B16D (21 trang).
  5. Mạch 5 — Hàm lồi: C00, C01, C02, C03, C04, C05, C06, C07, C08, C09, C10, C11, C12, C13, C14, C15, C16, C17, C18, C19, C20, C20F, C20D, C21, C22 (25 trang).
  6. Mạch 6 — Đánh giá kết thúc: C23, C24, C25 (3 trang).
- HTML đã triển khai 6 section ngoài đúng phương án validator; hai trang C24–C25 được thêm sau C23; hai trang A03L–A03W được thêm sau A03 theo vị trí HTML.
- Phân bổ thời gian hiện hành: mở/A/B/C = 7/28/23/32 phút, tổng 90 phút. Đây là bốn khối thời lượng nội bộ, không nhất thiết trùng sáu mạch RevealJS. Phân bổ cũ 7/23/27/33 đã bị thay thế và chỉ còn giá trị lịch sử trong review-log.
- Ánh xạ lec01→lec02→lec03 ở mức bài giảng giữ như bảng nguồn dưới; mọi trang PDF cụ thể được đánh dấu chưa xác minh bởi worker (không đọc PDF/README).

## Truy nguyên thay đổi

- Thêm A00, B00 và C00 để lấp ba khoảng trống động cơ/trực quan trước khái niệm hình thức.
- Khôi phục A11 theo yêu cầu lịch sử; nội dung được viết theo quan hệ nhân quả, không lặp A03.
- Sửa A01 để trả lời riêng tại sao phải mô hình hóa.
- Sửa A05 để chỉ công bố lời hứa; định nghĩa tập lồi và hàm lồi lần lượt xuất hiện sau trực quan tại B01 và C02.
- Sửa B10 để chứng minh giao các miền ràng buộc lồi vẫn lồi mà không dùng hàm lồi trước phần C; C10 bổ sung tập mức dưới sau khi C02 đã định nghĩa hàm lồi.
- Chuyển B09 sau B11; hiển thị rõ B06, B08, B11 là tiên quyết.
- Sửa C01–C02 để trực quan và ví dụ xuất hiện trước định nghĩa.
- Sửa C23 thành bài tập bắt buộc đi từ nhu cầu tới bảo đảm.
- Tách ví dụ độ sáng thành trang trực quan và trang mô hình; A08 là ví dụ tính dẫn nhập/củng cố trước cải dạng.
- Tách cụm C20 thành ví dụ Gauss, C20F kiểm tra log-hợp lý và C20D định nghĩa hàm log-lõm để giảm mật độ, giữ thứ tự ví dụ–trực quan trước hình thức.
- Chuẩn hóa tiêu đề kể tiến trình thành tên khái niệm trực tiếp: `Định nghĩa tập lồi`, `Nón lồi`, `Định nghĩa hàm lồi`, `Bài tập tổng hợp: hồi quy logistic`.

## Tài liệu

- Stephen Boyd và Lieven Vandenberghe (2004), *Convex Optimization*, Cambridge University Press, Chương 1–4, https://web.stanford.edu/~boyd/cvxbook/.
- MIT OpenCourseWare (2009), *6.079 Introduction to Convex Optimization*, Bài giảng 1–3; ba tệp PDF trong `MIT/`.

## Quy ước triển khai

- Mỗi trang có `data-slide-id`, nhãn tuyến, ghi chú diễn giả và nguồn trong ghi chú.
- Công thức nội dòng dùng `$...$`; công thức khối dùng `$$...$$`.
- RevealJS và KaTeX dùng tài nguyên cục bộ.
- P03 trình bày sáu chặng bằng tên nội dung, không hiển thị mã trang hoặc thời lượng nội bộ.
- Ghi chú A06 làm rõ ba bước nhận dạng–cải dạng–giải; ghi chú B12 chứng minh phép phân tuyến tính bảo toàn tính lồi trên miền mẫu số dương.

## Ma trận xử lý sư phạm 90 phút

Mọi trang vẫn xuất hiện theo một tuyến RevealJS liên tục từ P00 đến C25. `Chế độ` dưới đây chỉ quy định cách giảng viên xử lý trang trong buổi học, không tạo tuyến, nhánh, badge hoặc cơ chế điều hướng riêng.

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
