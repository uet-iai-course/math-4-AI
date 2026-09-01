# Dàn ý Bài 01: Giới thiệu tối ưu, tập lồi và hàm lồi

## Thông tin và chuẩn đầu ra

- Học phần: Cơ sở toán học cho AI, học kỳ 1, năm học 2026–2027.
- Deck: `lecture-01-gioi-thieu-toi-uu-tap-loi-ham-loi.html`.
- Lecture note: `materials/lec-01/lecture-note.md`.
- Nguồn mẫu theo thứ tự: MIT 6.079 `lec01` → `lec02` → `lec03`.
- LLO1: hiểu các khái niệm cơ bản về tối ưu toán học, tối ưu lồi và ứng dụng.
- LLO2: trình bày khái niệm, tính chất của tập lồi, hàm lồi và áp dụng trong bài toán tối ưu.
- CLO1: nhận dạng dạng bài toán tối ưu và xây dựng mô hình toán từ một bài toán AI.

## Trạng thái hiện hành

- Deck có đúng **53 slide lá**, **53 mã `data-slide-id` duy nhất**, **53 khối ghi chú diễn giả** và **6 section ngoài**.
- Sáu section ngoài tạo một tuyến liên tục. Hai section giữa cùng thuộc phần A nhưng có chức năng khác nhau: section A1 xây khuôn mô hình; section A2 dùng bảo đảm lồi trong ca độ sáng.
- Mạch kết thúc dùng các mã **D01–D04**.

## Tuyến nội dung theo DOM

| Section ngoài | Mã theo đúng thứ tự DOM | Chức năng |
|---|---|---|
| P — Mở đầu | P00 → P01 → P02 → P03 | Định vị bài, kích hoạt tiên quyết, nêu LLO/CLO và vấn đề trung tâm. |
| A1 — Bài toán tối ưu | A00 → A01 → A02 → A03 → A03L → A03W → A11 → A04 | Đi từ nhu cầu lựa chọn tới khuôn mô hình, các loại nghiệm, điều kiện tồn tại–duy nhất và hai lớp bài toán nền tảng. |
| A2 — Bảo đảm lồi và ca độ sáng | A05 → A06 → A07 → A07M → A08 → A09 → A10 | Nêu bảo đảm địa phương–toàn cục, quy trình nhận dạng–cải dạng–giải và áp dụng vào một mô hình độ sáng. |
| B — Tập lồi | B00 → B01 → B02 → B03 → B04 → B05 → B06 → B07 → B08 → B10 → B11 → B09 → B12 | Xây trực giác, định nghĩa, các tập chuẩn, phép giao, ảnh/nghịch ảnh affine và bài kiểm tra nhận dạng. |
| C — Hàm lồi | C00 → C01 → C02 → C03 → C04 → C05 → C06 → C07 → C08 → C09 → C10 → C11 → C12 → C13 → C14 → C15 → C16 | Xây trực giác dây cung, định nghĩa, điều kiện vi phân và các phép bảo toàn tính lồi. |
| D — Ca tổng hợp và kết luận | D01 → D02 → D03 → D04 | Xây mất mát logistic, hoàn thành ca hồi quy logistic, thu hồi LLO/CLO và tự kiểm tra. |

## Bản đồ khái niệm trọng tâm

| Cụm | Nhu cầu | Trực quan/ví dụ | Hình thức/toán học | Ứng dụng | Bài tập |
|---|---|---|---|---|---|
| Mô hình tối ưu | A00 | A00, A02 | A01, A03 | A04 | D02 |
| Cực tiểu, tồn tại và duy nhất | A03 | A03L, A03W | A03L, A03W | A05 | D04 |
| Nhận dạng cấu trúc lồi | A05 | A07, A08 | A06, A07M, A09 | A09 | A10 |
| Tập lồi | B00 | B00, B02–B08 | B01, B10, B11, B12 | B06–B08, B11 | B09 |
| Hàm lồi | C00 | C01, C03, C08 | C02, C04–C07, C10 | C11–C16 | C09 |
| Mất mát logistic | D01 | D01 và ví dụ tính được trong lecture note | D01 | D02 | D02, D04 |

Các khái niệm trọng tâm đi theo chuỗi nhu cầu → trực quan/ví dụ → hình thức → ứng dụng → bài tập. Một số bước được gộp trên cùng slide khi vẫn giữ một luận điểm trung tâm; chi tiết chứng minh và ví dụ mở rộng nằm trong lecture note.

## Ký hiệu và giả thiết truyền qua bài

| Ký hiệu | Nghĩa |
|---|---|
| $x,w\in\mathbb R^n$ | Biến quyết định. |
| $C$ | Tập khả thi; cực tiểu địa phương luôn được hiểu tương đối với $C$. |
| $f_0$ | Hàm mục tiêu của bài toán tối ưu. |
| $A\succeq0$ | Ma trận đối xứng nửa xác định dương. |
| $\operatorname{dom}f$, $\operatorname{epi}f$ | Miền hữu hiệu và trên-đồ-thị của hàm. |
| $(a_i,y_i)$ | Dữ liệu phân loại nhị phân, $a_i\in\mathbb R^n$, $y_i\in\{-1,1\}$. |
| $s_i(w)=y_i a_i^Tw$ | Biên phân loại có dấu. |
| $\phi(s)=\log(1+e^{-s})$ | Mất mát logistic một mẫu. |

## Truy nguyên nguồn

| Nguồn | Vai trò hiện hành |
|---|---|
| Boyd và Vandenberghe (2004), *Convex Optimization*, Chương 1–4 | Nguồn chính cho định nghĩa, giả thiết, định lý và phép bảo toàn. |
| MIT OpenCourseWare 6.079 (2009), Bài giảng 1–3 | Mẫu thứ tự và ví dụ nền cho mô hình tối ưu, tập lồi và hàm lồi. |
| Bottou, Curtis và Nocedal (2018) | Căn cứ cho phần thuật toán tối ưu quy mô lớn trong lịch sử lĩnh vực. |
| Goodfellow, Bengio và Courville (2016) | Đối chiếu vai trò mất mát logistic trong phân loại. |
| Đề cương học phần UET.AI2012 | LLO1, LLO2 và đóng góp vào CLO1. |

## Điều kiện hoàn thành

- Thứ tự DOM, outline và storyboard khớp đúng 53 mã hiện hành.
- Mỗi slide có ghi chú diễn giả và nguồn trong ghi chú.
- Deck và lecture note dùng cùng ký hiệu cho mô hình tối ưu, cực tiểu tương đối với tập khả thi và mất mát logistic.
- Không đưa mã nội bộ, thời lượng hoặc chỉ dẫn biên tập lên mặt slide.
- Tài sản cục bộ tồn tại; thẻ HTML cân bằng; `git diff --check` đạt.
- Kiểm định trực quan bằng trình duyệt chỉ được ghi PASS khi thực sự có trình duyệt và đã rà khung rộng, hẹp.
