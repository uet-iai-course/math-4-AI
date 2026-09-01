# Nhật ký rà soát Lecture 02

## Hậu kiểm mạch khái niệm và giả thiết — 2026-09-01

- A05 dùng $x^3$ trên $[-1,1]$ làm ví dụ tựa lồi nhưng không lồi, vì vậy sự khác nhau giữa hai khái niệm hiện ra ngay tại định nghĩa thay vì chỉ nằm trong ghi chú.
- A06 nêu lại miền $D$, hàm phân thức $f$ và bài toán khả thi $\phi_t(x)\le0$ trước bảng chia đôi; bảng không còn phụ thuộc vào ví dụ của trang trước.
- C04 phân biệt ba mệnh đề: song ánh giữa hai miền biến, quan hệ giữa nghiệm khi tối ưu đạt được, và quan hệ giá trị $\widetilde p^*=\log p^*$ khi $0<p^*<\infty$.
- Không thay số trang hoặc thứ tự mạch; các sửa đổi chỉ khép khoảng trống về trực giác và giả thiết.

## 1. Trạng thái

- Bản RevealJS có 41 trang và một SVG cục bộ sau vòng chỉnh sửa storyboard lần hai.
- Trạng thái cuối: **đã hoàn tất năm lượt rà lại độc lập theo góc nhìn sinh viên, chuyên gia, độ chính xác toán học, phản biện học thuật–giảng dạy và mạch kể chuyện; kiểm định lại storyboard cũng đã hoàn tất**.
- Không còn lỗi chặn bàn giao, lỗi nghiêm trọng hoặc lỗi trung bình. Hai lỗi nhẹ toán học cuối đã đóng: B04 nêu $r\in\mathbb R$; B05 xác định rõ $A^\dagger b$ là nghiệm có chuẩn Euclid nhỏ nhất trong tập nghiệm của bài toán bình phương tối thiểu.
- Bằng chứng hoàn tất gồm kiểm tra toán học, kiểm tra khả năng theo dõi của sinh viên, kiểm tra mạch kể chuyện và điểm nối, kiểm tra chuyên gia nội dung, kiểm tra học thuật–giảng dạy, cùng lượt rà từng trang và hành trình sáu bước của storyboard.

## 2. Nguồn và quyền sử dụng

| Nguồn/tài sản | Cách dùng | Quyền và quyết định |
|---|---|---|
| `sources/bv_cvxbook.pdf` | Định nghĩa và giả thiết Chương 4 | Giáo trình cục bộ; chỉ diễn giải và trích công thức ngắn, không sao chép hình |
| `sources/Chương 3 Các bài toán tối ưu lồi (phần 1).pdf` | Đối chiếu thị giác | Tệp OneNote 6 trang; trang đầu và metadata không ghi tác giả hoặc năm, nên tác giả và năm chưa xác minh; không dùng làm căn cứ cho công thức |
| `sources/Chương 3 Các bài toán tối ưu lồi phần 2.pdf` | Thứ tự A–B | Trang 1 ghi Nguyễn Bích Vân; năm chưa xác minh. Dùng trang PDF 2–4 cho bài toán tương đương, 5–8 cho tựa lồi, 9–16 cho LP/QP/QCQP; không cắt ảnh |
| `sources/Lecture4-MIT.pdf` | Tham chiếu cấu trúc MIT 6.079, Lecture 4 | `pdfinfo` xác nhận tiêu đề, Stephen Boyd, ngày tạo năm 2009 và 48 trang; không sao chép tài sản bên thứ ba |
| `img/lec-02/cantilever-gp.svg` | Sơ đồ dầm công-xôn | Tự vẽ, không sao chép dữ liệu thực nghiệm; có `title`, `desc` và `alt` khi nhúng |
| SVG nội dòng B03 | Hình học LP | Tự vẽ; có `role="img"` và mô tả thay thế |

## 3. Lỗi hoặc giới hạn của nguồn đã xử lý

1. Nguồn bậc hai viết $A^+=(A^TA)^{-1}A^T$ như công thức tổng quát. Deck dùng $A^\dagger$ cho giả nghịch đảo Moore–Penrose và chỉ cho phép công thức nghịch đảo khi $A$ hạng cột đầy đủ.
2. Một tài liệu bài tập gắn nhãn bài toán LP đơn giản như bài toán nguyên. Deck không sao chép nhãn này.
3. QCQP chỉ được gọi lồi khi mọi ma trận bậc hai tương ứng PSD. Deck thêm phản ví dụ $x_1^2-x_2^2\le1$.
4. GP luôn nêu miền $\mathbb R_{++}^n$; không lấy log ở biên không dương.
5. SDP luôn nêu $F_i\in\mathbb S^n$ cùng kích thước và phân biệt thứ tự PSD với so sánh từng phần tử.
6. Tối ưu Pareto có cảnh báo về nghiệm Pareto không được hỗ trợ trong tập mục tiêu không lồi.
7. B09 giữ đúng miền chung $2x_1+x_2\ge1$, $x_1+3x_2\ge1$, $x\ge0$ và đúng ba mục tiêu a, c, e của nguồn; không thay hệ số để ép khớp đáp án.

## 4. Kiểm tra số đã thực hiện khi soạn

- A06: $x^*=\sqrt5-2$, $p^*=2\sqrt5-4$; ba vòng chia đôi đầu cho các khoảng $[0,0{,}5]$, $[0{,}25,0{,}5]$, $[0{,}375,0{,}5]$.
- B03: cận $x_1+2x_2\ge3$ đạt duy nhất tại $(3,0)$.
- B05: trên $[0,1]$, nghiệm $x=1$, giá trị $4$.
- B06: nghiệm $(0{,}8,0{,}2)$, giá trị $0{,}8$.
- B09: ca a đạt tại giao hai đường biên $(2/5,1/5)$, giá trị $3/5$; ca c có tập nghiệm $\{(0,x_2):x_2\ge1\}$, giá trị $0$; ca e dùng $x_1^2+9x_2^2\ge\tfrac12(x_1+3x_2)^2$ để cho $(1/2,1/6)$ và $1/2$.
- B10: hai Hessian ràng buộc là $\operatorname{diag}(2,8)$ và $2I$, đều xác định dương; điểm $(0{,}8,0{,}7)$ nằm trong giao hai ellipse.
- C05: AM–GM cho nghiệm $(2,2)$, giá trị $1/4$.
- C07: đạo hàm sau khi khử ràng buộc cho phương trình $u^3-6u^2+24u-16=0$; nghiệm khả thi xấp xỉ $u=0{,}8078567$, $v=2{,}3842866$.
- D05 và D10: cân bằng hai phần tử đường chéo; nghiệm lần lượt $1$ và $1{,}5$.
- D09: đạo hàm cho $x^*=2(1-\lambda)$.

## 5. Kiểm định storyboard vòng đầu

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| chặn bàn giao | B09 | Đề nháp thay miền và mục tiêu của các ca a, c, e, nên không còn truy nguyên được tới bài tập nguồn | Khôi phục miền chung và ba mục tiêu; tính lại bằng hình học và thế biến | đã sửa; chờ rà toán học |
| nghiêm trọng | B01–B09 | Dạng chuẩn LP, QP và QCQP xuất hiện trước ví dụ hoặc phản ví dụ tương ứng | Đổi thứ tự thành B03→B02, B05→B06→B04, B08→B07; giữ nguyên mã | đã sửa; chờ rà storyboard và mạch kể chuyện |
| nghiêm trọng | C01–C07 | Thuật ngữ và dạng chuẩn GP xuất hiện trước ví dụ tạo nhu cầu | Đưa C05 trước C02; giữ C04 trước ứng dụng C06 | đã sửa; chờ rà lại |
| nghiêm trọng | D01–D10 | SDP và Pareto đều phát biểu hình thức trước ví dụ trực quan | Đưa D05 trước D03–D04 và D08 trước D07 | đã sửa; chờ rà lại |
| trung bình | A01–A04 | A02 là trang nền ký hiệu nhưng đứng trước ví dụ dẫn nhập, làm chu trình mở bằng hình thức | Đưa A03 trước A02 và ghi rõ A02 là ngoại lệ nền sau ví dụ | đã sửa |
| trung bình | A06 | Chỉ minh họa một mức, chưa cho thấy cập nhật cận của chia đôi | Thêm bảng ba vòng đầu và tiêu chuẩn dừng trong ghi chú | đã sửa |
| trung bình | C06 | Ứng dụng dầm chỉ nêu một họ biểu thức chung, chưa thực sự dùng phép đổi log vừa học | Dùng GP chuẩn hóa có hệ số minh họa và viết bài toán sau đổi log | đã sửa; cần kiểm định khả năng đọc |
| trung bình | toàn bài | Phân bổ nội bộ dồn ít thời lượng cho cụm D dù có hai khái niệm trọng tâm | Phân bổ lại đúng tổng 2 tiết lý thuyết + 1 tiết bài tập | đã sửa trong storyboard |

## 6. Bản hợp nhất năm báo cáo rà soát độc lập

### 6.1. Góc nhìn sinh viên

| Mức độ | Trang | Vấn đề | Bằng chứng | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|---|
| nghiêm trọng | B02, B04, B07, C02–C04, D03–D04, D07 | Nhiều định nghĩa xuất hiện trước khi người học có tình huống để gắn ký hiệu | Tuyến cũ đi thẳng từ trang phần sang dạng chuẩn | Đưa ví dụ hoặc phản ví dụ lên trước, thêm câu nối trong ghi chú | đã sửa thứ tự và ghi chú |
| trung bình | A06 | Người học không thấy cơ chế cận trên/cận dưới tiến triển | Chỉ có kiểm tra $t=0{,}5$ | Thêm 2–3 vòng chia đôi | đã sửa bằng bảng ba vòng |

### 6.2. Góc nhìn chuyên gia

| Mức độ | Trang | Vấn đề | Bằng chứng | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|---|
| chặn bàn giao | B09 | Bài tập không còn đúng đề nguồn | Miền và mục tiêu bị thay đổi trong bản nháp | Khôi phục nguyên cấu trúc các ca a, c, e | đã sửa |
| trung bình | C06 | Liên kết ứng dụng GP chưa kiểm chứng được | Chỉ viết $\sum_kd_k\prod_i h_i^{a_{ki}}\le1$ | Cho một mô hình chuẩn hóa cụ thể và đổi log | đã sửa; ghi rõ hệ số chỉ minh họa |

### 6.3. Độ chính xác toán học

| Mức độ | Trang | Vấn đề | Bằng chứng | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|---|
| chặn bàn giao | B09 | Đáp án đúng bị ghép với một đề khác | Các hàm mục tiêu cũ không phải $x_1+x_2$, $x_1$, $x_1^2+9x_2^2$ | Khôi phục đề; tự tính lại từng ca mà không dùng kỹ thuật chưa học | đã sửa; các phép tính ghi ở mục 4 |
| nhẹ | D05 | Ví dụ dùng thuật ngữ LMI trước khi định nghĩa | D05 cũ đứng sau D04 nên không lộ; khi đổi thứ tự cần tránh tiền giả định | Gọi là bất đẳng thức ma trận và báo trước thuật ngữ ở trang sau | đã sửa |

### 6.4. Phản biện học thuật và giảng dạy

| Mức độ | Trang | Vấn đề | Bằng chứng | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|---|
| nghiêm trọng | B, C, D | Chu trình nhu cầu → trực quan → ví dụ → hình thức bị đảo ở các khái niệm trọng tâm | B02/B04/B07, C02/C03 và D03/D04/D07 đứng trước ví dụ | Đổi thứ tự vật lý nhưng giữ mã truy nguyên; cập nhật storyboard đồng bộ | đã sửa |
| trung bình | A02 | Trang nền cần thiết nhưng vai trò sư phạm chưa được giải thích | Khuôn tổng quát mở ngay sau trang phần | Đặt sau A03 và ghi ngoại lệ nền | đã sửa |

### 6.5. Mạch kể chuyện và điểm kết nối

| Mức độ | Trang/cụm | Vai trò trong câu chuyện | Kết nối vào | Kết nối ra | Điểm nhấn | Vấn đề và đề xuất | Trạng thái |
|---|---|---|---|---|---|---|---|
| nghiêm trọng | B01–B09 | Tăng dần sức biểu diễn từ LP tới QCQP | A07 khép cụm cải dạng | B09 kiểm tra rồi mở GP | PSD là chứng nhận | Tuyến cũ để khuôn hình thức tranh vai trò trung tâm với ví dụ; ghép thành ba nhịp ví dụ → khuôn | đã sửa |
| nghiêm trọng | C01–C07 | Đổi biến log làm lộ tính lồi của mô hình tích | B09 kết thúc mô hình bậc hai | C07 kiểm tra và mở thứ tự theo nón | C04–C06 | Ví dụ xuất hiện quá muộn; chuyển C05 lên trước thuật ngữ và làm C06 thu hồi phép đổi log | đã sửa |
| nghiêm trọng | D01–D10 | Một ngôn ngữ thứ tự phục vụ cả ma trận và nhiều mục tiêu | C07 kết thúc GP | D10 đóng hai nhánh vào bài tập | D05–D04; D08–D07 | Hai nhánh đều mở bằng định nghĩa; chuyển thành ví dụ → hình thức và dùng D02 làm bản lề | đã sửa |
| trung bình | P03, Z01–Z03 | Mở và thu hồi luận đề nhận dạng cấu trúc | P02 nêu LLO | Lecture 03 dùng dạng chuẩn cho đối ngẫu | Z01 | Cần ghi rõ Z01 thu hồi vấn đề P03 | đã bổ sung trong storyboard; chờ rà toàn bài |

## 7. Quyết định chỉnh sửa và bằng chứng

- Giữ toàn bộ 40 mã cũ và thêm B10, nâng tổng số lên 41 trang; các thay đổi thứ tự vật lý vẫn duy trì truy nguyên.
- Cập nhật đồng bộ `outline.md`, `storyboard.md`, RevealJS và ghi chú diễn giả tại mọi ranh giới bị ảnh hưởng.
- Không sửa SVG: hình hiện tại vẫn đúng vai trò và có mô tả thay thế; C06 thay nội dung mô hình, không thay quan hệ hình học của hình.
- Các lỗi chặn bàn giao, nghiêm trọng và trung bình đã được năm vai độc lập cùng tác tử kiểm định storyboard rà lại và đóng; hai lỗi nhẹ B04/B05 cũng đã được sửa và xác nhận.

## 8. Kiểm định lại storyboard và mạch kể chuyện

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| nghiêm trọng | B07–B09 | QCQP có phản ví dụ và dạng chuẩn nhưng chưa có bài toán lồi cụ thể để người học tự kiểm tra PSD và miền; B09 đã đủ ba ca nguồn nên không thể nhận thêm nhiệm vụ | Thêm B10 giữa B07 và B09 với hai miền ellipse, Hessian xác định dương và câu hỏi nhận dạng; giữ nguyên B09 | đã đóng sau rà lại B07–B10 |
| nghiêm trọng | toàn bộ storyboard | Cột quan hệ trước–sau chỉ ghi mã nên chưa chứng minh được nội dung nào được truyền giữa hai trang | Viết lại đủ 41 dòng thành quan hệ nội dung cụ thể: đầu vào từ trang trước và sản phẩm chuyển sang trang sau | đã đóng sau kiểm định từng trang |
| trung bình | D06–D08 | Chuyển từ LMI sang nhiều mục tiêu đột ngột | Thêm câu nối tái sử dụng thứ tự theo nón từ ma trận sang vector trong ghi chú D06 | đã sửa |
| trung bình | D08 | Dùng thuật ngữ Pareto trước khi D07 định nghĩa | Đổi tiêu đề thành “Một đường đánh đổi liên tục” và mô tả bằng quan hệ cải thiện–làm xấu | đã sửa |
| trung bình | bản đồ hành trình | Các cụm A, B, D quá rộng nên che khuất bước thiếu ở từng khái niệm | Tách thành A1/A2, B1/B2/B3 và D1/D2; giữ tổng phân bổ 2 tiết lý thuyết + 1 tiết bài tập | đã sửa |

- B10 là trang mới duy nhất; các mã cũ được giữ nguyên để bảo toàn truy nguyên.
- Phạm vi B07, B10, B09 và hai trang lân cận; D04–D09; toàn bộ bảng quan hệ trong storyboard đã được rà lại và không còn lỗi mở.

## 9. Năm báo cáo độc lập — vòng hợp nhất cuối

### 9.1. Góc nhìn sinh viên

| Mức độ | Trang | Vấn đề | Quyết định | Trạng thái và bằng chứng |
|---|---|---|---|---|
| trung bình | P01, A04, A06, C06 | Viết tắt chưa giải nghĩa, công thức dày và bảng dùng cỡ chữ dưới ngưỡng | Giải nghĩa tại P01; rút gọn A04; đặt bảng ở `1em`; đưa công thức C06 ra toàn chiều rộng và thêm lưới đáp ứng | đã sửa trong HTML; 41 trang vẫn giữ nguyên |
| trung bình | B03 | Hình thiếu nhãn miền, đường biên và chiều dịch mục tiêu | Thêm nhãn văn bản cùng mũi tên, không dùng màu làm tín hiệu duy nhất | đã sửa SVG nội tuyến và `aria-label` |

### 9.2. Góc nhìn chuyên gia

| Mức độ | Trang | Vấn đề | Quyết định | Trạng thái và bằng chứng |
|---|---|---|---|---|
| nghiêm trọng | P02, planning | CLO1 bị diễn giải thành nhận dạng dạng bài, không đúng văn bản đề cương | Trích đúng “hiểu và đánh giá các thuật toán tối ưu; vận dụng kiến thức tối ưu để giải quyết bài toán thực tế”; coi nhận dạng/cải dạng là minh chứng bộ phận LLO3 | đã sửa P02, outline và storyboard |
| trung bình | B05, D09, Z02 | Liên kết AI còn ở mức nêu tên | Thêm hồi quy có ràng buộc, đánh đổi sai số–chi phí suy diễn và ca QCQP hồi quy tích hợp | đã sửa; mỗi ca dùng trực tiếp cấu trúc toán vừa học |
| nhẹ | nguồn cục bộ | Tên MIT chưa trỏ đúng tệp; nguồn Nguyễn Bích Vân thiếu trạng thái xác minh năm và trang dùng | Ghi `sources/Lecture4-MIT.pdf`; kiểm tra `pdfinfo` và trang đầu; chỉ ghi Nguyễn Bích Vân cho phần 2, năm chưa xác minh, cùng các trang PDF thực dùng | đã sửa outline và mục 2; phần 1 ghi tác giả/năm chưa xác minh |

### 9.3. Độ chính xác toán học

| Mức độ | Trang | Vấn đề | Quyết định | Trạng thái và bằng chứng |
|---|---|---|---|---|
| nghiêm trọng | A04 | Khử đẳng thức thiếu $\operatorname{range}(F)=\ker A$; biến dư thiếu $\exists s$; epigraph có thể bị hiểu là bỏ ràng buộc | Bổ sung đủ ba điều kiện và chuyển chi tiết sang ghi chú | đã sửa trên mặt trang và ghi chú |
| nghiêm trọng | D02–D03 | Khuôn nón dùng $K\subseteq\mathbb R^q$ nhưng ánh xạ ma trận không cùng kiểu | Dùng không gian hữu hạn chiều $E$, $K\subseteq E$, $G:\mathbb R^n\to E$, $h\in E$; tách cấp ma trận $r$ khỏi số biến $n$ | đã sửa D02, D03 và bảng ký hiệu |
| trung bình | A05, B02, B04, B05, B07, D09, D10 | Thiếu lượng từ mức, kích thước, định nghĩa giả nghịch đảo hoặc trường hợp biên | Bổ sung $t\in\mathbb R$, tập rỗng khi $t<0$, đủ kích thước, kiểu $A^\dagger$, hai đầu mút $\lambda$, và dạng $\min_{x,t}$ | đã sửa; công thức giữ nhất quán |
| nhẹ | B04 | Hằng số $r$ xuất hiện trong mục tiêu QP nhưng chưa nêu kiểu | Thêm $r\in\mathbb R$ cùng các kiểu dữ liệu trên mặt trang | đã sửa; biểu thức QP hiện đủ kiểu |
| nhẹ | B05 | Cụm “nghiệm chuẩn nhỏ nhất” có thể bị hiểu là chuẩn của phần dư thay vì chuẩn của nghiệm | Viết rõ $A^\dagger b$ có chuẩn Euclid nhỏ nhất trong tập nghiệm của $\min_z\|Az-b\|_2^2$; chuyển kiểu $A^\dagger$ xuống ghi chú | đã sửa; phát biểu phân biệt hai đại lượng |
| nhẹ | Z02 | Ca hồi quy AI dùng $X,y,w,\tau$ trước khi nêu kiểu và miền | Thêm $X\in\mathbb R^{N\times d}$, $y\in\mathbb R^N$, $w\in\mathbb R^d$, $\tau\ge0$ trước công thức | đã sửa trên mặt trang, outline và storyboard |

### 9.4. Phản biện học thuật và giảng dạy

| Mức độ | Trang | Vấn đề | Quyết định | Trạng thái và bằng chứng |
|---|---|---|---|---|
| nghiêm trọng | A05–A07 | Tựa lồi mới được minh họa bằng phân thức, chưa có định nghĩa tổng quát hoặc giao diện thuật toán chia đôi; bài tập chưa phân biệt lồi/tựa lồi | Nêu $S_t$ cho mọi mức, đầu vào–đầu ra–dung sai và thêm ca $x^3$ tựa lồi nhưng không lồi | đã sửa, không thêm trang |
| trung bình | D06 | Bổ đề Schur xuất hiện như chứng minh chưa được chuẩn bị | Chuyển thành mẫu nhận dạng, thêm trực giác vô hướng và nói rõ không yêu cầu chứng minh | đã sửa |
| trung bình | toàn bài | Phân bổ trước chưa tính mở đầu, trang chia phần, chuyển ý và kết luận | Phân bổ lại đủ 2 tiết lý thuyết + 1 tiết bài tập cho toàn bộ 41 trang | đã cập nhật outline và storyboard |
| nhẹ | A04, storyboard | A04 bị gán đồng thời vai hình thức và ứng dụng dù chỉ minh họa ba cải dạng | Giữ A04 ở vai hình thức/minh họa ngắn; ghi ứng dụng là không áp dụng và đo chuyển giao tại A07 | đã sửa bản đồ hành trình, không tăng tải trang |

### 9.5. Mạch kể chuyện và điểm kết nối

| Mức độ | Trang/cụm | Vai trò trong câu chuyện | Kết nối vào | Kết nối ra | Điểm nhấn | Quyết định và trạng thái |
|---|---|---|---|---|---|---|
| nghiêm trọng | D02–D06 | Mở rộng ngôn ngữ mô hình từ vô hướng sang nón | GP đã cho một kiểu cải dạng | Đánh đổi vector tái sử dụng thứ tự theo nón | LMI là mẫu nhận dạng | Bỏ hoàn toàn hàng SOCP để không tạo tuyến phụ; D06 nối trực tiếp sang vector mục tiêu; đã sửa |
| nghiêm trọng | Z01 | Thu hồi luận đề trung tâm | D10 hoàn tất hai nhánh cuối | Z02 chuyển giao sang ca AI | Pipeline nhận dạng → cải dạng → chứng nhận | Thêm pipeline trên mặt trang và ghi chú nói rõ trả lời P03; đã sửa |
| trung bình | A07, C07 | Ranh giới phần thiếu câu nối | Bài tập đóng chu trình hiện tại | Phần sau nhận đúng đầu ra | Tín hiệu chuyển mạch | Thêm câu nối A07→B01 và C07→D01 trong ghi chú; đã sửa |

Không xóa các báo cáo vòng trước; mục 9 ghi riêng vòng hợp nhất hiện tại và dẫn bằng chứng tới trạng thái RevealJS mới nhất.

## 10. Kiểm định trực quan

- Chromium tại khung 16:9 phát hiện A05 bị cắt ngang ở cột phải do hai công thức đặt cùng một dòng trong thẻ hẹp.
- Đã tách $f(x)$ và $\phi_t(x)$ thành hai dòng công thức, đặt hai trường hợp $t<0$ và $t\ge0$ thành hai thẻ riêng, đồng thời giảm cỡ công thức cục bộ xuống $0{,}94\,\mathrm{em}$.
- Sau sửa A05, Chromium đã duyệt đủ 41 trang ở hai khung $1600\times900$ và $720\times1280$: 0 lỗi KaTeX và 0 phần tử hiển thị tràn khung. Giữ nguyên luận điểm, mã A05, ghi chú diễn giả và cấu trúc 41 trang.
- A03 có cờ `scrollWidth` do MathML ẩn do KaTeX tạo ra; kiểm tra hộp bao của các phần tử cấp cao và ảnh cho thấy không có nội dung nhìn thấy bị tràn. Đây không phải lỗi trình chiếu.
- Chỉ có phản hồi 404 cho `favicon`, không ảnh hưởng tài sản bài giảng. Trang chỉ mục ở cả khung rộng và hẹp đều cho `overflow=false`.
- Kiểm tra kỹ thuật sau đó phát hiện các đoạn ý chính trong ghi chú diễn giả chưa được bao bởi thẻ `<p>`, tạo ít nhất 9 thẻ `</p>` mồ côi khi phân tích cấu trúc HTML. Đã chuẩn hóa đủ 41 khối `<aside class="notes">` về đúng hai đoạn cùng cấp: đoạn ý chính `<p>...</p>` và đoạn nguồn `<p class="note-source">...</p>`; không thay đổi nội dung hiển thị, mã trang hoặc thứ tự.
- Bằng chứng sau sửa: bộ phân tích `HTMLParser` đếm 41 khối ghi chú, mỗi khối có đúng 2 thẻ đoạn; không còn thẻ `</p>` mồ côi, thẻ `<p>` lồng nhau hoặc đoạn chưa đóng. Kiểm tra cấu trúc vẫn cho 41 mã trang duy nhất và 41 khối ghi chú.

## 11. Codex Slides

- Dự án bền vững có mã `20260828090221-lecture-02-c-c-b-i-to-n-t-i-u-l-i-cho-h--42jc`; outline đã đồng bộ đủ 41 trang.
- Lượt render có mã rút gọn do điều phối viên cung cấp là `run-7ce…` thất bại ở ít nhất 15 trang và được hủy khi xử lý trang 18; không dùng kết quả render này làm bằng chứng kiểm định.
- Browser tích hợp không khả dụng trong phiên hiện tại, nên chưa thể xác nhận bề mặt Codex Slides. Bản RevealJS cục bộ vẫn là sản phẩm có thẩm quyền; giới hạn này phải được nêu khi bàn giao.

## 12. Kiểm định hạ tầng và trạng thái đóng

- Đã cài `reloadserver` 1.0.0 vào `/tmp/math4ai-reloadserver` và chạy thành công từ thư mục gốc kho bằng `PYTHONPATH=/tmp/math4ai-reloadserver python3 -m reloadserver 8765`.
- Qua máy chủ cổng 8765, tệp HTML, SVG, RevealJS, KaTeX và các plugin cục bộ đều trả HTTP 200. Kiểm tra đường dẫn, công thức, ghi chú, điều hướng, khung 16:9 và màn hình hẹp đã hoàn tất.
- Năm vai rà soát độc lập và tác tử kiểm định storyboard đã hoàn tất lượt xác nhận sau sửa; không còn lỗi mở thuộc mức chặn bàn giao, nghiêm trọng hoặc trung bình.
- Bộ trang chiếu đạt điều kiện kỹ thuật cục bộ để chuyển sang bước cập nhật chỉ mục, commit riêng và push theo quy định của kho.

## 13. Cổng soạn sau storyboard PASS

| Mã | Vấn đề | Sửa | Trạng thái |
|---|---|---|---|
| Z03 | Truy nguyên gắn Nguyễn Bích Vân cho cả phần 1–2; MIT chưa nêu rõ vai trò | Chỉ gắn Nguyễn Bích Vân với phần 2; phần 1 ghi tác giả và năm chưa xác minh; MIT Lecture 4 là tham chiếu cấu trúc | đã sửa |
| D07–D09 | $F(x)$ trùng với ánh xạ ma trận affine trong LMI; hai thẻ D08 trùng tiêu đề | Đổi ánh xạ mục tiêu vector thành $\Phi(x)$; đồng bộ D07, D09, outline và storyboard; đặt tiêu đề theo từng thành phần mục tiêu | đã sửa |
| B09 | Lời giải ca e thiếu dẫn xuất của cận dưới | Giữ nguyên đề ca e; thêm $x_1^2+9x_2^2-\tfrac12(x_1+3x_2)^2=\tfrac12(x_1-3x_2)^2\ge0$ trong ghi chú | đã sửa |
| C05 | Bất đẳng thức trung bình cộng–trung bình nhân chưa được khai triển; điều kiện dấu bằng chưa tách | Nêu $\sqrt{xy}\le(x+y)/2$ và tách điều kiện $x=y$ với $x+y=4$ | đã sửa |
| Storyboard | B03/B05 bị gán vai ứng dụng; điểm đo chuyển giao A1 chưa đủ rõ | Ghi B03/B05 là ví dụ dẫn nhập, ứng dụng B1/B2 tại B09 và A1 được đo chuyển giao tại A07 | đã sửa |

- Ràng buộc giữ nguyên: 41 `data-slide-id`, 6 `section` ngoài, thứ tự trang và 41 khối ghi chú; không sửa A05–A06.
- GLM 5.3 Flash qua OpenRouter đã đề xuất các thay thế theo mã trang trên đúng bốn tệp được phép; điều phối viên áp dụng và tự kiểm lại bản vá. Lượt rà sau chỉnh sửa của cùng mô hình kết luận PASS cho toàn bộ yêu cầu và các ràng buộc cấu trúc.

## 14. Hợp nhất lỗi từ năm lượt rà soát độc lập

| Mã | Bằng chứng reviewer | Sửa hợp nhất | Trạng thái |
|---|---|---|---|
| P01, D07 | P01 dùng thứ tự theo nón trước khi bài thiết lập lại; D07 chưa nhắc vai trò của nón nhọn | P01 báo trước định nghĩa chính thức ở D02; D07 nối định nghĩa tối tiểu với nón nhọn và tính phản đối xứng | đã sửa |
| A02 | Câu dẫn bỏ sót vai trò hàm mục tiêu $f_0$ | Nêu riêng $f_0$ và các hàm ràng buộc $f_i,h_j$ | đã sửa |
| A05–A06 | Ví dụ A05 có thể bị hiểu là tựa lồi nhưng không lồi; cột “Kết quả” ở A06 không nói rõ đối tượng khả thi | Ghi ví dụ A05 cũng lồi và A07 ca 2 mới phân biệt; đổi nhãn cột thành $S_t\ne\varnothing$? và giải nghĩa trong ghi chú | đã sửa |
| B03 | Đường mức không đi qua nghiệm; hình có thể bị hiểu là toàn bộ miền bị chặn | Kéo đường mức tới $(3,0)$; ghi rõ SVG chỉ là cửa sổ hữu hạn của miền không bị chặn | đã sửa |
| B08 | Phép kiểm tra trung điểm viết tắt thành $2-0>1$ | Viết đầy đủ $(\sqrt2)^2-0^2=2>1$ | đã sửa |
| D08 | Thiếu câu nối từ thứ tự ma trận sang vector mục tiêu | Thêm câu trên mặt trang: thứ tự theo nón cũng so sánh vector mục tiêu | đã sửa |
| D10, Z02 | Lời mời tương tác chưa dùng nhãn bắt buộc; đáp án Z02(1) thiếu điều kiện “nói chung” | Thêm nhãn “Câu hỏi:” và sửa đáp án thành phát biểu có điều kiện | đã sửa |
| Z03 | Trạng thái metadata chưa xác minh làm nặng mặt trang | Chuyển chi tiết xác minh xuống ghi chú, vẫn tách phần 1 và phần 2 trên mặt trang | đã sửa |
| Storyboard D1 | D02 bị gán vai trực quan dù là trang định nghĩa | Chuyển D02 sang bước hình thức/toán học; D05 đảm nhiệm trực quan và ví dụ | đã sửa |

- Không thêm trang, không đổi thời lượng, thứ tự hoặc mã; giữ 41 `data-slide-id`, 6 `section` ngoài và 41 khối ghi chú.

## 15. Sửa tràn C05 sau kiểm định render

- Ở khung $1280\times720$, phần cuối C05 bị cắt đáy do thẻ tính toán diễn giải dài và hộp kết luận lặp lại kết quả.
- Giữ lần xuất hiện đầy đủ `Bất đẳng thức trung bình cộng–trung bình nhân (AM–GM)`, rút chuỗi tính thành $\sqrt{xy}\le(x+y)/2\le2$, suy ra $xy\le4$; gộp điều kiện dấu bằng và giá trị tối ưu vào thẻ tính toán.
- Bỏ hộp kết luận lặp lại; không giảm cỡ chữ, không thêm trang và không thay đổi nội dung toán học, mã trang, thời lượng hoặc mạch kể chuyện.

## 16. Kiểm định kỹ thuật cuối ngày 2026-08-30

- Bỏ `maximum-scale` và `user-scalable` khỏi viewport để không chặn phóng đại hỗ trợ tiếp cận; thêm favicon dữ liệu rỗng để loại yêu cầu 404 không liên quan đến bài giảng.
- Cổng 8765 đang được một kho khác sử dụng nên không bị dừng hoặc thay đổi. Kiểm định HTTP dùng cổng tạm 8876; HTML, SVG dầm công-xôn, RevealJS, plugin, KaTeX và phông cục bộ đều trả 200 hoặc 304.
- Chromium duyệt đúng 41 cặp chỉ số RevealJS tại 1280 × 720, 800 × 600 và 720 × 900. Không có lỗi bảng điều khiển, lỗi trang hoặc yêu cầu thất bại.
- Sau khi rút C05, mọi trang đều có `scrollHeight` bằng vùng chứa. A03 còn chênh `scrollWidth` 9 px do MathML ẩn của KaTeX, không phải nội dung nhìn thấy; ảnh chụp A03 xác nhận toàn bộ công thức và hộp nằm trong khung.
- Kiểm tra trực quan riêng P03, A03, A06, B03, B08, C05, D08, D10, Z02 và Z03. B03 hiển thị đúng đường mức sau sửa; C05 hiển thị đủ điều kiện dấu bằng và giá trị tối ưu, không bị cắt.
- Các tái kiểm toán học, học thuật–giảng dạy và mạch kể chuyện đều đạt bằng GLM 5.3 Flash qua OpenRouter. Codex Slides vẫn không khả dụng trong môi trường hiện tại; không dùng nó làm bằng chứng kiểm định.

## 17. Ghi chú bài giảng ngày 2026-08-31

- Đã tạo `materials/lec-02/lecture-note.md` với sáu mạch A–F và 12 chủ đề: khuôn/cải dạng; tựa lồi/chia đôi; LP–QP–QCQP; GP/đổi log; tối ưu nón/SDP; Pareto/vô hướng hóa.
- Mỗi chủ đề có mục tiêu đọc hiểu, định nghĩa và giả thiết, trực quan, ví dụ tính được, hình minh họa, ứng dụng AI, điểm dễ nhầm, câu hỏi kiểm tra và đầu ra.
- Có bảy khối chứng minh hoặc phác thảo chứng minh: tập khả thi lồi; hai đặc trưng tựa lồi; bất biến chia đôi; chứng nhận PSD cho QP/QCQP; đổi log của GP; nghịch ảnh affine của nón; trọng số dương sinh nghiệm Pareto.
- Đã tạo bảy SVG mới tại `img/lec-02/` và tái dùng `cantilever-gp.svg`. Mọi SVG mới có `title`, `desc`, `role="img"`, không dùng script, `foreignObject` hoặc tài nguyên mạng; đã render kiểm tra ở bề rộng 900 px.
- Rà soát độc lập phát hiện và đã sửa hai lỗi chặn: panel QCQP không khớp ví dụ đĩa đơn vị; phép đổi log chưa nêu quan hệ $\widetilde p^*=\log p^*$. Lượt tái kiểm cuối kết luận PASS.
- Đã mở Codex Slides và kiểm tra dự án bền vững `20260828090221-lecture-02-c-c-b-i-to-n-t-i-u-l-i-cho-h--42jc`; phiên hiện tại không có công cụ Browser để xác nhận trực tiếp bề mặt hiển thị Codex Slides, nên không dùng nó làm bằng chứng trực quan.
- Kiểm định tĩnh đạt: Markdown bắt đầu bằng heading cấp một; chỉ dùng `$...$` và `$$...$$`; 12 chủ đề, 12 tham chiếu hình, 20 khối mở/đóng cân bằng; mọi đường dẫn hình tồn tại; XML SVG hợp lệ; `git diff --check` đạt.
- Máy chủ HTTP cục bộ tại cổng tạm 8877 trả 200 cho viewer, Markdown, CSS và toàn bộ tám SVG. Không có Chromium trong môi trường hiện tại nên chưa thực hiện kiểm tra DOM/render tự động của viewer; khả năng cuộn hình ở màn hình hẹp được bảo đảm bằng selector chung `img[src^="img/lec-"]` và `min-width: 900px`.
- Sau các kiểm định trên, trang chỉ mục được cập nhật để công bố ghi chú Bài 02.

## 18. Đồng bộ deck với lecture note ngày 2026-09-01

### Kiểm toán kế hoạch và ánh xạ nguồn

- Tác tử lập kế hoạch và tác tử phân tích nguồn chạy độc lập qua OpenRouter; cả hai có `requested_model` và `observed_model` là `z-ai/glm-5.3-flash`, provider `OpenRouter`.
- Kiểm toán xác nhận giữ nguyên 41 trang, 41 khối ghi chú và 6 mạch P–A–B–C–D–Z. Thứ tự ví dụ trước hình thức trong deck là có chủ ý và đã được storyboard giải thích.
- Ánh xạ đủ 41 slide với `materials/lec-02/lecture-note.md` phát hiện hai lỗi logic ưu tiên: A03 đồng nhất khái niệm tương đương tổng quát với “cùng tập khả thi”; B05/Z02 dùng $A^\dagger$ khi mặt slide chưa định nghĩa ký hiệu này.
- Các kết quả quan trọng trong lecture note đã có trên deck dưới dạng tóm tắt nhưng cần cầu nối rõ hơn: tập khả thi của dạng lồi chuẩn là lồi; bất biến và độ co của chia đôi; tương đương GP–log; nghịch ảnh affine của nón lồi; trọng số dương sinh nghiệm Pareto.

### Sửa theo từng mạch

- A03 phân biệt tương đương trong ví dụ với cải dạng tổng quát có thể thêm/bớt biến nhưng phải bảo toàn giá trị tối ưu và ánh xạ nghiệm. A04 nêu trực tiếp cấu trúc giao làm tập khả thi lồi. A06 đưa bảo đảm $u_k-l_k=(u_0-l_0)/2^k$ lên mặt slide và giữ bất biến $p^*\in[l_k,u_k]$ trong ghi chú.
- B05 định nghĩa $A^\dagger$ là giả nghịch đảo Moore–Penrose ngay lần xuất hiện đầu; điều kiện hạng cột đầy đủ cho $(A^TA)^{-1}A^T$ vẫn nằm trong ghi chú và được đo ở Z02.
- C04 phát biểu ngắn định lý tương đương GP–log, gồm ánh xạ $x^*=\exp(y^*)$ và giá trị tối ưu mới $\log p^*$; ghi chú nêu điều kiện mục tiêu dương trên $\mathbb R_{++}^n$.
- D04 dùng đúng định lý nghịch ảnh affine để chứng nhận tập LMI lồi. D09 nêu chiều thuận của vô hướng hóa bằng trọng số dương và điều kiện lồi phù hợp cho chiều đảo.
- Không sửa lecture note, SVG, số trang, thứ tự trang, mã truy nguyên hoặc số mạch.

### Runtime writer và giới hạn

- Writer chạy với `requested_model` và `observed_model` là `z-ai/glm-5.3-flash`, provider `OpenRouter`; các sửa HTML và một phần hồ sơ quy trình đã được ghi bền vững.
- Writer dừng với lỗi nguyên gốc `model exceeded the tool-call limit (16)` khi đang cập nhật storyboard, không phải `api_transport_error`. Điều phối viên đã đối chiếu diff, rút gọn A06 và D04 để tránh tăng tải mặt slide, rồi hoàn tất storyboard và review-log bằng `apply_patch`.

### Năm góc nhìn rà soát và sửa sau phản biện

- Rà toán học: **PASS** cho A03, A04, A06, B05, C04, D04, D09 và các trang lân cận; các ví dụ số, giả thiết và kết luận đều được tính lại.
- Rà theo góc nhìn sinh viên: **PASS**; phát hiện hai thuật ngữ có thể xuất hiện đột ngột. C04 đã định nghĩa $\operatorname{lse}(z)=\log\sum_k e^{z_k}$ ngay lần đầu; D09 đã bỏ cụm “Pareto được hỗ trợ” vì bài không định nghĩa thuật ngữ này.
- Rà học thuật theo Boyd: **PASS**; sửa thuật ngữ không chính xác “tia affine” ở A03 thành “tia (nửa đường thẳng)”. Quy ước dấu $F(x)\succeq0$ ở D04 tương đương quy ước đổi dấu thường gặp và không làm thay đổi lớp SDP.
- Rà sư phạm: lượt đầu không hợp lệ vì worker tìm sai đường dẫn và kết luận thiếu tệp dù tệp tồn tại; không dùng lượt này làm bằng chứng. Lượt chạy lại với ba đường dẫn khóa chính xác kết luận **PASS** cho hành trình sáu bước, phân bổ 2 tiết lý thuyết + 1 tiết bài tập, tải nhận thức và minh chứng LLO3/CLO1. A06 được bổ sung cận khởi tạo $[l_0,u_0]=[0,1]$ trên mặt slide.
- Rà mạch kể: **PASS**; phát hiện hai dòng D09 trùng trong outline và đã gộp thành một mục. Sáu mạch, 41 mã và các thứ tự ví dụ trước hình thức vẫn nhất quán.
- Một lượt chuyên gia khác dừng với `model exceeded the tool-call limit (10)` và không tạo báo cáo hoàn chỉnh; lượt chạy lại có đường dẫn khóa chính xác đã thay thế kết quả này.
- Tất cả các reviewer hợp lệ dùng `requested_model` và `observed_model` là `z-ai/glm-5.3-flash`, provider `OpenRouter`.

### Tái kiểm sau sửa cuối

- Reviewer toán học tái kiểm A03, A04, A06, B05, C04, D04, D09 sau mọi thay đổi và kết luận **PASS**.
- Reviewer mạch kể tái kiểm 41 slide, 6 mạch, bảy điểm khái niệm trọng tâm và outline sau khi gộp D09; kết luận **PASS**.

### Kiểm định kỹ thuật vòng đồng bộ

- Bộ phân tích HTML xác nhận mọi thẻ đóng/mở cân bằng; có đúng 41 `data-slide-id` duy nhất, 41 khối ghi chú và 6 section ngoài. Mười một đường dẫn tài sản cục bộ đều tồn tại; `git diff --check` không báo lỗi.
- Qua máy chủ HTTP cục bộ trên cổng tạm 8876, HTML, CSS, RevealJS, plugin Notes/Highlight/Math và SVG dầm công-xôn đều trả mã 200.
- Môi trường hiện tại không có Chromium, Firefox hoặc trình duyệt headless; không tuyên bố đã tái kiểm tràn trang bằng trình duyệt trong vòng đồng bộ này. Bản 41 trang trước đó đã có bằng chứng Chromium ở mục 16; các thay đổi hiện tại chỉ sửa văn bản trên bảy trang và đã được rút gọn sau phản biện để hạn chế tăng tải.
- Codex Slides vẫn không khả dụng trong phiên hiện tại; không dùng nó làm bằng chứng kiểm định.

## 19. Rà văn phong và mạch khái niệm ngày 2026-09-01

- Đã đọc lại toàn bộ 41 trang và toàn bộ ghi chú bài giảng theo tiêu chí `no-ai-slop`. Ghi chú diễn giả được sửa từ lời điều phối nội bộ sang lời giảng trực tiếp; đã loại các cụm `Chuyển ý:`, `Lưu ý sư phạm`, tham chiếu mã trang, tham chiếu chéo tới chính lecture note và thông tin quản trị metadata.
- B05 không còn đưa giả nghịch đảo Moore–Penrose vào ví dụ một biến. Khái niệm này không phục vụ LLO3 và làm đứt mạch LP–QP; hộp nội dung mới gọi tên QP từ mục tiêu bậc hai lồi và ràng buộc affine. Câu hỏi tương ứng ở Z02 cũng được bỏ.
- D05 viết đầy đủ `bất đẳng thức ma trận tuyến tính (LMI)` ngay lần xuất hiện đầu, thay cho lời hẹn “các trang sau gọi”. Các cầu nối A, B, C và D hiện nêu trực tiếp quan hệ toán học giữa hai khái niệm.
- Ghi chú bài giảng bỏ các dòng `Đầu ra` lặp lại mục tiêu đọc hiểu; đổi `Tóm tắt ba mạch đầu` thành `Bảng kiểm nhận dạng`. Định nghĩa, ví dụ, chứng minh, ứng dụng AI và câu hỏi kiểm tra không bị lược.
- Reviewer độc lập bằng `z-ai/glm-5.3-flash` qua OpenRouter đọc toàn bộ hai tệp, xác nhận không phát hiện lỗi toán học và nêu đúng các điểm điều phối, lặp khuôn và khái niệm xuất hiện đột ngột đã sửa ở trên.
- Kiểm định tĩnh đạt: 41 mã duy nhất, 41 ghi chú, 6 section ngoài; thẻ `section` và `aside` cân bằng; Markdown bắt đầu bằng H1 và chỉ dùng `$...$`, `$$...$$`; mọi tài sản tồn tại; tám SVG hợp lệ theo XML; `git diff --check` đạt. Tám SVG được raster hóa và rà trên một contact sheet: nhãn, trục, hướng mũi tên, miền tô, điểm tối ưu và quan hệ lồi/không lồi đều hiển thị đúng, không có phần tử mất hoặc chồng lấn đáng kể.
- Máy chủ HTTP cục bộ giới hạn trong `2627-1/` trả 200 cho deck, viewer, lecture note, KaTeX và toàn bộ tám SVG của Bài 02. Không có Chromium, Firefox hoặc trình duyệt headless trong môi trường, nên không tuyên bố kiểm định trực quan mới.
- Codex Slides xác nhận dự án bền vững `20260828090221-lecture-02-c-c-b-i-to-n-t-i-u-l-i-cho-h--42jc` ở trạng thái draft với đúng 41 trang. Phiên hiện tại không có bề mặt Browser để đối chiếu hình ảnh; kiểm định hiển thị dựa trên RevealJS cục bộ và giới hạn này được giữ minh bạch.

## 20. Đồng bộ mạch deck–lecture note ngày 2026-09-01

- Deck được tách theo đúng sáu phần nội dung của lecture note: A — khuôn bài toán; B — tối ưu tựa lồi; C — LP/QP/QCQP; D — quy hoạch hình học; E — tối ưu nón và SDP; F — tối ưu nhiều mục tiêu và Pareto.
- Giữ nguyên 41 trang nhưng đổi mã truy nguyên theo mạch mới. Thứ tự vật lý là P00–P03; A01, A03, A02, A04; B01–B03; C01, C03, C02, C05, C06, C04, C08, C07, C10, C09; D01, D05, D02–D04, D06–D07; E01, E02, E05, E03, E04, E06; F01–F04; Z01–Z03.
- Phần bài tập hỗn hợp SDP–Pareto trước đây được tách theo mạch: E06 nhận câu hỏi chặn trị riêng; F04 chỉ kiểm tra quan hệ trội và phép vô hướng hóa. Thuật ngữ `không gian vector` và các lần dùng `vector` trong phạm vi sửa được chuẩn hóa thành `không gian véc-tơ` và `véc-tơ`.
- Deck hiện có 8 section ngoài nếu tính cả mở đầu và kết luận. Đây là ngoại lệ có chủ ý so với giới hạn mặc định 5–7, vì yêu cầu đồng bộ trực tiếp sáu phần A–F của lecture note; không thêm trang và không tạo tuyến điều hướng phụ.
- Outline và storyboard được cập nhật theo mã, thứ tự và quan hệ đầu vào–đầu ra mới. Cổng kiểm định yêu cầu: 41 ID duy nhất, 8 section ngoài, thẻ cân bằng, tài sản cục bộ tồn tại, HTTP cục bộ trả 200 và ảnh chụp tĩnh không tràn nội dung.
- Kiểm định cấu trúc đạt: 41 ID duy nhất theo đúng thứ tự DOM, 41 ghi chú, 8 section ngoài, storyboard có đúng 41 hàng tương ứng, thẻ `section` cân bằng và mọi `src`/`href` cục bộ đều tồn tại. `git diff --check` đạt.
- Tám SVG của Bài 02 đều phân tích được bằng XML và kết xuất tĩnh thành PNG bằng ImageMagick; kích thước đầu ra nằm trong khoảng $760\times300$ đến $1200\times760$, không có lỗi bộ giải mã.
- Không có Chromium, Firefox hoặc trình kết xuất HTML headless trong môi trường. Yêu cầu mở máy chủ HTTP cục bộ bị cơ chế an toàn từ chối vì thư mục phục vụ có tài liệu nội bộ; do đó vòng này không tuyên bố đã chụp hoặc rà tràn toàn deck bằng trình duyệt, cũng không tuyên bố kiểm tra HTTP 200.
### Hậu kiểm trực quan sau đồng bộ mạch

- Chromium ở khung $1280\times720$ phát hiện tiêu đề hai thẻ E01 chạm nhau và công thức trong tiêu đề thẻ F01 khó đọc. E01 dùng nhãn ngắn “Ràng buộc phổ”, “Thứ tự ma trận”; F01 tách tên mục tiêu khỏi công thức hiển thị.
- Kết xuất lại E01 và F01 sau sửa; tiêu đề, công thức, hộp kết luận và chân trang đều nằm trong khung.
- Hậu kiểm toàn cục thay metadata đánh giá ở P02 và tham chiếu chéo sang lecture note ở P03 bằng quan hệ trực tiếp giữa nhận dạng, kiểm tra PSD, cải dạng và sáu nhóm bài toán A–F.
