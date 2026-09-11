# Storyboard Bài 02 — Các bài toán tối ưu lồi

Phiên bản làm lại ngày 2026-09-11; bảy mạch đã được người dùng thống nhất.

## Trạng thái và mục tiêu

- Phạm vi hiện tại: phần 1 có bảy trang, phần 2 có 12 trang và phần 3 có 14 trang đã triển khai, kèm ghi chú diễn giả; phần 4–7 vẫn là khung tiêu đề theo yêu cầu làm từng phần. Toàn bài hiện có 37 trang trong bảy section ngoài. Chưa chốt số trang cuối cùng hoặc thời lượng; không triển khai các phần tiếp theo trong lượt này.
- Cấu trúc 58 trang (39 chính + 19 phụ lục) của lần sửa trước không còn là ràng buộc.
- Bản storyboard cũ lưu trong lịch sử Git tại commit e030846; không tạo bản sao, không di chuyển tệp cũ.
- Mục tiêu bài học: sinh viên hiểu rõ các dạng bài toán tối ưu lồi; nhận biết bài toán thực tế có thể chuyển về dạng lồi hoặc xấp xỉ bằng dạng lồi; chứng minh một bài toán tối ưu là lồi. Ưu tiên ví dụ trong trí tuệ nhân tạo và học máy (AI/ML) hoặc bài toán quen thuộc.
- Ba trường hợp xuyên suốt: mô hình đã lồi; cải dạng tương đương thành lồi; thay bằng bài toán lồi gần đúng. Không đồng nhất cải dạng với thay đổi yêu cầu hay xấp xỉ.

## Quy trình chín bước cho mỗi ví dụ

1. Tình huống thực tế: cần quyết định gì, vì sao cần tối ưu?
2. Mô hình ban đầu: xác định dữ liệu, biến, miền, mục tiêu, ràng buộc và đầu ra.
3. Cách tiếp cận trực tiếp: nêu phương án trực giác hoặc mô hình đơn giản, cùng hạn chế nếu có.
4. Ý tưởng nhận dạng hoặc cải dạng: tìm dấu hiệu cấu trúc gợi ý lớp bài toán phù hợp.
5. Phép biến đổi chi tiết: viết các bước thiết yếu, biến phụ, đổi biến và điều kiện áp dụng.
6. Chứng nhận: giải thích tính lồi, quan hệ với mô hình gốc và cách khôi phục nghiệm.
7. Ví dụ số và hình học: kiểm tra bằng dữ liệu nhỏ, trực quan hóa và diễn giải nghiệm.
8. Khái quát hóa: rút ra dạng chuẩn, dấu hiệu nhận dạng và giới hạn áp dụng.
9. Biến thể kiểm tra hiểu: thay một giả thiết hoặc yêu cầu; kiểm tra mô hình còn lồi hoặc còn cải dạng được không.

Chuỗi này áp dụng bên trong mỗi ví dụ, không phải chín phần của bài và không mặc định là chín trang. Thứ tự chín bước theo yêu cầu cụ thể của người dùng được ưu tiên so với chu trình sáu bước trong quy ước chung. Nếu không cần cải dạng, bước 5 ghi rõ lý do.

## Bảy mạch nội dung đã thống nhất

### Mạch 1 — Mô hình hóa và chứng nhận bài toán tối ưu lồi

- Theo yêu cầu mới, phần mở đầu gồm trang tiêu đề bài, nội dung chính, mô hình tối ưu tổng quát, dạng toán học kèm điều kiện lồi và ví dụ nhanh với hàm quen thuộc. Ba ví dụ đã triển khai với các tập khả thi khác nhau: hàm bậc hai trên đoạn $[0,1]$, giá trị tuyệt đối trên $\mathbb{R}$ và nghịch đảo trên $(0,+\infty)$. Ví dụ dự đoán giá nhà được giữ như ý tưởng cho các mạch ứng dụng sau; chưa triển khai trong phần mở đầu.
- Nội dung: nhắc lại khung chứng nhận trước các ví dụ nhanh theo thứ tự người dùng yêu cầu — miền xác định lồi, mục tiêu lồi, bất đẳng thức hàm lồi không vượt quá 0, đẳng thức affine. Phân biệt chứng minh tính lồi với tìm nghiệm.
- Đầu vào: kiến thức tập/hàm lồi của Bài 01.
- Đầu ra: mô hình rõ nghĩa và khung chứng nhận để dùng ở các mạch tiếp theo.

### Mạch 2 — Quy hoạch tuyến tính

- Ví dụ: pha trộn nguyên liệu cho một vườn ươm để hình thành quy hoạch tuyến tính (LP), rồi hồi quy với tổng sai số tuyệt đối hoặc sai số lớn nhất.
- Nội dung: biến phụ đưa trị tuyệt đối/cực đại về ràng buộc tuyến tính; giải thích tương đương và đọc nghiệm. Biến thể: số máy/sản phẩm phải nguyên.
- Đầu vào: mô hình và khung chứng nhận.
- Đầu ra: dạng LP, cải dạng bằng biến phụ và giới hạn của giả thiết biến liên tục.

### Mạch 3 — Quy hoạch bậc hai

- Ví dụ: hồi quy bình phương tối thiểu; chính quy hóa chuẩn một hoặc bình phương chuẩn hai cho cả sai số tuyệt đối và tổng bình phương sai số. Giới hạn cứng độ lớn hệ số dẫn tới quy hoạch bậc hai với ràng buộc bậc hai (QCQP).
- Nội dung: chứng minh dạng bậc hai lồi qua ma trận nửa xác định dương; phân biệt hình phạt ở mục tiêu với giới hạn cứng. Hình đường đồng mức/miền khả thi giải thích nghiệm. Không mặc định hai cách cho cùng nghiệm nếu chưa xác định quan hệ tham số.
- Đầu vào: cùng dữ liệu dự đoán với tiêu chí sai số ở mạch 2.
- Đầu ra: nhận dạng QP/QCQP, chứng nhận cả mục tiêu lẫn ràng buộc và diễn giải lựa chọn mô hình.

### Mạch 4 — Quy hoạch hình học và phép đổi biến làm lộ tính lồi

- Ví dụ: thiết kế hộp có thể tích cho trước, sử dụng ít vật liệu nhất. Tích kích thước nảy sinh từ nhu cầu; cách nhìn trực tiếp chưa cho mô hình lồi.
- Nội dung: phát triển đổi biến log, điều kiện biến dương, đơn thức và đa thức dương, khái quát quy hoạch hình học (GP). Phải làm rõ quan hệ nghiệm, giá trị mục tiêu sau biến đổi và khôi phục kích thước thật. Biến thể: phép trừ hoặc biến được phép bằng 0.
- Đầu vào: nhận dạng/chứng nhận theo biến ban đầu.
- Đầu ra: cải dạng bằng đổi biến, kèm điều kiện và ánh xạ nghiệm.

### Mạch 5 — Tối ưu nón và quy hoạch nửa xác định: ràng buộc trên chuẩn và ma trận

- Ví dụ: giới hạn chuẩn trong hồi quy dẫn tới cấu trúc nón bậc hai. Ví dụ chính tiếp theo: học khoảng cách từ các cặp dữ liệu tương tự/khác nhau, biến là ma trận. Bình phương khoảng cách không âm dẫn tới ma trận nửa xác định dương. Với lựa chọn mục tiêu và ràng buộc tuyến tính theo ma trận, thu được quy hoạch nửa xác định (SDP).
- Nội dung: làm rõ ràng buộc áp dụng mọi hướng và vì sao đường chéo không âm chưa đủ. Không khẳng định mọi mô hình học khoảng cách là SDP; ma trận nửa xác định dương có thể cho bình phương khoảng cách bằng 0 giữa hai điểm khác nhau.
- Đầu vào: ràng buộc chuẩn và ma trận nửa xác định dương ở mạch 3, kỹ năng cải dạng ở mạch 4.
- Đầu ra: chứng nhận ràng buộc nón/ma trận, diễn giải nghiệm ma trận.

### Mạch 6 — Xấp xỉ lồi và nới lỏng bài toán không lồi

- Ví dụ chính: phân loại nhị phân, mục tiêu trực tiếp giảm số dự đoán sai, xây dựng hàm mất mát lồi thay thế. Có thể tiếp nối lựa chọn đặc trưng, thay đếm số hệ số khác 0 bằng hình phạt chuẩn một.
- Nội dung: phân biệt thay mục tiêu bằng hàm thay thế với nới rộng miền khả thi; chọn máy dưới ngân sách bỏ điều kiện nguyên minh họa nới lỏng. Không tự gọi chuẩn một là nới lỏng nếu chưa chứng minh quan hệ miền/mục tiêu, không gọi hàm mất mát thay thế là xấp xỉ địa phương. Với mỗi trường hợp: nghiệm có dùng được cho bài gốc không, bảo đảm nào giữ, phải kiểm tra lại gì?
- Đầu vào: nhận dạng và cải dạng tương đương ở các mạch trước.
- Đầu ra: phân biệt tương đương/xấp xỉ/nới lỏng và đánh giá nghiệm theo mô hình ban đầu.

### Mạch 7 — Tổng hợp: lựa chọn biểu diễn và đánh giá nghiệm

- Ví dụ/tình huống: tình huống mới hoặc đổi giả thiết ví dụ đã học. Sinh viên tự đi đủ chín bước, chọn dạng bài và viết chứng nhận.
- Nội dung: sản phẩm gồm mô hình rõ nghĩa, lập luận tính lồi, quan hệ với bài ban đầu, diễn giải nghiệm. Bảng tổng hợp dạng chuẩn xuất hiện sau các ví dụ.
- Đầu vào: các lớp mô hình và phép biến đổi/xấp xỉ.
- Đầu ra: bài làm tích hợp có thể đánh giá theo ba mục tiêu bài học.

## Phần còn chờ chốt: tựa lồi và nhiều mục tiêu

- Nội dung giữ để chốt phạm vi sau: tối ưu tựa lồi và nhiều mục tiêu trong bản cũ.
- Tựa lồi mở rộng cách giải qua bài toán khả thi lồi; nhiều mục tiêu giải thích chọn tiêu chí/đánh đổi.
- Nếu triển khai đầy đủ cần ví dụ riêng; không ghép vội vào kết luận, không tự quyết đưa phụ lục/loại bỏ hoặc chốt thời lượng.
- Không gán LLO/CLO hay thời lượng mới khi chưa đối chiếu đề cương.

## Quyết định thay cấu trúc và tham chiếu bản cũ

- Bỏ ràng buộc 58 trang.
- Ví dụ thiết kế hộp thay dầm ở mạch GP; học khoảng cách thay phép đo hiệp phương sai ở mạch SDP.
- Xấp xỉ/nới lỏng thành mạch riêng.
- Ưu tiên AI/ML hoặc bài quen thuộc.
- Bản storyboard cũ: lịch sử Git tại commit e030846.
- Việc chuyển thành từng trang, chọn dữ liệu, chứng minh, hình và bài tập là bước làm việc tiếp theo với người dùng. Bộ trang chiếu hiện đã được thay bằng khung bảy phần theo yêu cầu tiếp theo của người dùng; ghi chú bài giảng và bài tập vẫn giữ bản cũ để tham khảo.

## Khung RevealJS đã tạo ngày 2026-09-11

Người dùng yêu cầu xóa toàn bộ các trang hiện tại và chỉ tạo bảy section lớn để cùng xây dựng từng phần. Ở bước tạo khung ban đầu, bộ trang chiếu có bảy section ngoài, mỗi phần một trang tiêu đề. Cập nhật hiện tại: section đầu có bảy trang, đều có nội dung và ghi chú diễn giả; tổng số trang là 13. Trang điều kiện riêng đã được bỏ theo yêu cầu người dùng.

| Mạch | Section ngoài | Trang khung | Vai trò và quyết định |
|---|---|---|---|
| 1 | `section-1` | `S01-01`–`S01-04`, `S01-06`–`S01-08` | Soạn bốn trang đầu và ba ví dụ; bỏ `S01-05` theo bảng bên dưới |
| 2 | `section-2` | `mach-2` / `S02` | Giữ tiêu đề; 11 trang nội dung của mạch 2 được ánh xạ trong bảng triển khai phần 2 phía dưới |
| 3 | `section-3` | `mach-3` / `S03` | Giữ tiêu đề; 13 trang nội dung được ánh xạ trong bảng phần 3 phía dưới |
| 4 | `section-4` | `mach-4` / `S04` | Thêm khung tiêu đề cho mạch 4; nội dung sẽ được xây dựng cùng người dùng |
| 5 | `section-5` | `mach-5` / `S05` | Thêm khung tiêu đề cho mạch 5; nội dung sẽ được xây dựng cùng người dùng |
| 6 | `section-6` | `mach-6` / `S06` | Thêm khung tiêu đề cho mạch 6; nội dung sẽ được xây dựng cùng người dùng |
| 7 | `section-7` | `mach-7` / `S07` | Thêm khung tiêu đề cho mạch 7; nội dung sẽ được xây dựng cùng người dùng |

Các trang khung phục vụ điều hướng và xác định vị trí soạn bài, chưa được coi là minh chứng hoàn thành mục tiêu học tập. Bảng từng trang với liên kết chuẩn đầu ra, phép biến đổi, chứng nhận và bài tập sẽ được bổ sung khi triển khai từng mạch. Nội dung trước khi xóa có thể truy xuất tại commit `774112d`.

## Bảy trang của phần 1

Bốn trang đầu được soạn theo nội dung người dùng chốt; ba ví dụ được triển khai ngay theo yêu cầu tiếp theo, với ba tập khả thi khác nhau. Thứ tự hình thức trước ví dụ là yêu cầu cụ thể cho phần ôn tập này, với kiến thức tập lồi và hàm lồi đã học ở Bài 01. Không coi phần mở đầu là một ví dụ ứng dụng đầy đủ theo chín bước.

| Mã | Tiêu đề | Nhu cầu và vai trò | Kết nối trước–sau | Minh chứng hỗ trợ | Quyết định |
|---|---|---|---|---|---|
| `S01-01` | Bài 02: Các bài toán tối ưu lồi | Định danh bài, học phần và đơn vị | Mở bài → nội dung chính | Định hướng; không đánh giá riêng | Sửa: thêm học phần, Viện Trí tuệ nhân tạo và học kỳ |
| `S01-02` | Nội dung chính | Cho biết các nhóm mô hình và kỹ năng sẽ học | Tên bài → khung chung của các mô hình | Định hướng ba mục tiêu bài học | Sửa: liệt kê nội dung; bỏ nhãn nội bộ khỏi mặt chiếu |
| `S01-03` | Bài toán tối ưu lồi tổng quát | Phân biệt hai đối tượng cần chứng nhận: mục tiêu và tập khả thi | Nội dung chính → cách biểu diễn ràng buộc | Nhận dạng bài toán lồi; chuẩn bị chứng nhận | Sửa: mô hình $\min_{x\in C} f_0(x)$, $C$ lồi và $f_0$ lồi |
| `S01-04` | Dạng phổ biến của tối ưu lồi | Cụ thể hóa tập khả thi bằng ràng buộc để kiểm tra mô hình | Tập $C$ → các hàm quen thuộc | Chuẩn bị chứng minh tính lồi | Sửa theo yêu cầu mới: bỏ ký hiệu $D$, dùng $x\in\mathbb{R}^n$; $f_0,\ldots,f_m$ lồi, $f_i(x)\le0$, $Ax=b$; ghi kích thước và giải thích giao tập trong notes |
| `S01-06` | Ví dụ: hàm bậc hai | Dùng đoạn khả thi để phân biệt cực tiểu tự do với nghiệm có ràng buộc | Dạng chuẩn → hàm không trơn | Chứng nhận lồi; tìm nghiệm ở biên $x^\star=1$; biến thể đổi cận trên thành 3 trong notes | Sửa: công thức, parabol với đoạn khả thi, chứng nhận và nghiệm |
| `S01-07` | Ví dụ: hàm giá trị tuyệt đối | Cho thấy tính lồi không cần khả vi | Hàm trơn trên đoạn → hàm không trơn trên toàn trục → miền dương | Chứng nhận bằng bất đẳng thức tam giác; nghiệm $x^\star=2$; biến thể $[3,5]$ trong notes | Sửa: đồ thị chữ V, chứng nhận, nghiệm tại điểm không khả vi |
| `S01-08` | Ví dụ: hàm nghịch đảo | Phân biệt tính lồi với sự tồn tại nghiệm tối ưu | Hai ví dụ có nghiệm → cận dưới không đạt → quy hoạch tuyến tính | Chứng nhận trên miền dương; chứng minh cận dưới 0 không đạt; biến thể thêm chặn trên trong notes | Sửa: đồ thị không chạm trục hoành, chứng nhận và giới hạn |

Quyết định bỏ: `S01-05` / `dieu-kien-loi` — người dùng yêu cầu bỏ vì điều kiện đã được nêu tại `S01-04`. Không tái sử dụng mã này; các mã ví dụ giữ nguyên để truy nguyên. Nối trực tiếp dạng toán học với ví dụ hàm bậc hai.

### Bản đồ hành trình của phần mở đầu

Phần này ôn khái niệm đã học trong Bài 01, theo thứ tự hình thức trước ví dụ mà người dùng yêu cầu. Các ví dụ hàm số quen thuộc dùng chu trình rút gọn nhu cầu → mô hình và hình học → chứng nhận → kiểm tra; không giả tạo ứng dụng AI cho ba bài một biến. Hành trình ứng dụng đầy đủ theo chín bước sẽ nằm trong các mạch tiếp theo.

| Cụm | Nhu cầu | Trực quan và ví dụ | Hình thức/toán học | Ứng dụng | Bài tập |
|---|---|---|---|---|---|
| Khung chung | `S01-02`–`S01-03`: nhận dạng cấu trúc | Hai đối tượng mục tiêu và tập khả thi ở `S01-03`; kiến thức nền Bài 01 | `S01-03`–`S01-04`: mô hình trừu tượng và dạng chuẩn | Các mạch 2–6 sẽ dùng khung; chưa triển khai | Ba ví dụ sau áp dụng chứng nhận |
| Bậc hai | `S01-06`, notes: chọn giá trị gần mốc 2 nhưng chỉ được nằm trong $[0,1]$ | Cùng trang: parabol và đoạn khả thi | Dùng $f_0''=2$ cùng hai bất đẳng thức affine; chứng minh nghiệm ở 1 trong notes | Không áp dụng riêng: ví dụ ôn hàm quen thuộc theo yêu cầu | Notes: thay $C$ bằng $[0,3]$; nghiệm 2 |
| Giá trị tuyệt đối | `S01-07`, notes: đo độ lệch tới mốc 2 bằng trị tuyệt đối | Cùng trang: đồ thị chữ V trên toàn trục | Bất đẳng thức tam giác trong notes; nghiệm tại 2 dù không khả vi | Không áp dụng riêng: chuẩn bị tiêu chí sai số tuyệt đối ở mạch 2 | Notes: thay $C$ bằng $[3,5]$; nghiệm 3 |
| Nghịch đảo | `S01-08`, notes: làm $1/x$ nhỏ hơn với $x>0$ | Cùng trang: đường cong tiến sát trục hoành | $f_0''=2/x^3>0$; chứng minh infimum bằng 0 nhưng không đạt trong notes | Không áp dụng riêng: kiểm tra giới hạn của kết luận về bài toán lồi | Notes: thêm $x\le M$, $M>0$; nghiệm $M$ |

Đầu vào: tập/hàm lồi, đạo hàm bậc hai và bất đẳng thức tam giác. Sản phẩm: chứng nhận mục tiêu/tập khả thi, tìm hoặc chứng minh không tồn tại nghiệm cho ba ví dụ. Ký hiệu xuyên suốt: $x$, $f_0$, $C$; không dùng ký hiệu miền chung $D$ trên trang dạng phổ biến theo yêu cầu người dùng; điều kiện xác định của từng hàm được hiểu ngầm và nêu rõ khi cần trong ví dụ. Hai bài đầu dùng mốc 2; bài thứ ba xét miền dương. Câu nối: nhận dạng cấu trúc → nghiệm ở biên → lồi không cần khả vi → lồi chưa bảo đảm có nghiệm. Các bước trực quan, ví dụ và áp dụng chứng nhận được gộp trên mỗi trang để giữ một điểm nhấn. Các bước cải dạng không áp dụng vì ba mô hình đã lồi; notes chỉ nối ràng buộc đoạn với dạng chuẩn. Không gán thời lượng hoặc mã chuẩn đầu ra mới; nội dung hỗ trợ mục tiêu nhận dạng và chứng minh tính lồi đã chốt của bài.

### Nguồn và tham chiếu trình bày

- Boyd và Vandenberghe (2004), *Convex Optimization*, bản có sẵn `sources/bv_cvxbook.pdf`: §4.1.1–4.1.2 cho mô hình và thuật ngữ, §4.2 cho điều kiện lồi; §3.1.3 và §3.1.5 cho hàm bậc hai và giá trị tuyệt đối. Ví dụ hàm nghịch đảo tham chiếu trực tiếp Ví dụ 4.1, trang in 128, với miền dương. Không tải thêm nguồn.
- Tham khảo `../rl-plan/2627-1/lecture-style.css` và CSS trong `lecture-01-gioi-thieu-hoc-tang-cuong.html`, `lecture-02-giao-dien-tac-tu-moi-truong.html`: nền trắng, chữ Source Sans Pro từ theme cục bộ, tiêu đề xanh, cỡ nội dung 0.84em và phân cấp h1/h2. Giữ kiểu chữ hoa/thường đã viết, không tự chuyển toàn bộ thành chữ hoa.
- CSS điều chỉnh được lưu tại `2627-1/lecture-02-style.css`; không tạo phụ thuộc runtime sang kho tham chiếu.


## Triển khai phần 2 — Quy hoạch tuyến tính

Trạng thái: đã triển khai theo yêu cầu ngày 2026-09-11. Tổng 12 trang trong phần 2; 24 trang trong toàn bộ bảy phần. So với kế hoạch 10 trang, thêm chuẩn tắc theo yêu cầu và tách câu chuyện vườn ươm khỏi bảng dữ liệu/mô hình. Giữ mã cũ, không đổi phần 1 và các khung phần 3–7.

Mục tiêu: nhận dạng quy hoạch tuyến tính (LP), mô hình hóa một bài toán đã có cấu trúc tuyến tính, cải dạng hồi quy với sai số tuyệt đối hoặc sai số lớn nhất thành LP, chứng nhận tính lồi và giải thích nghiệm. Hỗ trợ CLO2 về xây dựng mô hình học máy và CLO4 về nhận dạng bài toán tối ưu trong đề cương chính thức; không ấn định thời lượng mới. Phần này giới thiệu LP trong chủ đề các dạng bài toán lồi. Đề cương dành các buổi sau cho giới thiệu/hình học LP và phương pháp đơn hình nên kế hoạch hiện tại tập trung vào mô hình và cải dạng.

Ví dụ mở đầu: pha trộn hai nguyên liệu với chi phí thấp nhất, đáp ứng hai chỉ tiêu tối thiểu. Lượng nguyên liệu là biến liên tục, dùng số liệu minh họa đã kiểm chứng. Đây là biến thể của bài toán khẩu phần trong Boyd, quen thuộc và dễ vẽ hình hai chiều. Ví dụ chính về học máy: hồi quy tuyến tính với tổng sai số tuyệt đối; sau đó đổi tiêu chí thành sai số lớn nhất trên cùng dữ liệu. Bối cảnh vườn ươm bổ sung theo yêu cầu người dùng: cần đủ nitơ và phốtpho, lượng nguyên liệu liên tục. Pha trộn thay ý tưởng phân bổ ngân sách trong kế hoạch khái quát trước.

| Vị trí / mã | Tiêu đề | Nội dung và lý do tồn tại | Kết nối vào → ra | Sản phẩm học tập / quyết định |
|---|---|---|---|---|
| 1 / `S02` | Quy hoạch tuyến tính | Định danh lớp bài toán tiếp theo | Khung chứng nhận phần 1 → nhu cầu pha trộn | Sửa tiêu đề đã được yêu cầu; giữ trang hiện có |
| 2 / `S02-01b` | Pha trộn cho một vườn ươm | Xác lập người ra quyết định, luống cây cần dinh dưỡng, đánh đổi giá và hàm lượng; tránh mở ví dụ bằng ký hiệu | Tiêu đề phần → dữ liệu của mô hình | Đề xuất cách mua ban đầu; Thêm theo yêu cầu câu chuyện, tách khỏi mô hình để giữ khả năng đọc |
| 3 / `S02-02` | Mô hình pha trộn | Nêu quyết định cần chọn, bảng chi phí và hàm lượng; xác định dữ liệu, lượng nguyên liệu, mục tiêu, ràng buộc, đơn vị, đầu ra. So sánh cách chọn nguyên liệu rẻ nhất với yêu cầu đủ chỉ tiêu | Nhu cầu thực tế → các biểu thức affine | Mô hình rõ nghĩa; Thêm: đã triển khai |
| 4 / `S02-03` | Dạng phổ biến của quy hoạch tuyến tính | Nhận ra các biểu thức affine; đưa mô hình về $\min c^Tx$ với $Gx\le h$, $Ax=b$. Nhắc lại ký hiệu từ phần 1; các bước đổi dấu và kích thước chi tiết để notes. Chứng nhận ngắn: mục tiêu affine, tập khả thi là giao các nửa không gian/siêu phẳng lồi | Mô hình cụ thể → dạng chuẩn và chứng nhận | Giải thích vì sao bài toán là LP và là lồi; Thêm: đã triển khai |
| 5 / `S02-03b` | Dạng chuẩn của quy hoạch tuyến tính | Chuyển bài tổng quát về đẳng thức và biến không âm: tách biến tự do, thêm biến phụ; viết ma trận khối và chứng minh bảo toàn trong ghi chú | Dạng phổ biến → dạng chuẩn → kiểm nghiệm mô hình | Tự chuẩn hóa LP và khôi phục biến gốc; Sửa theo yêu cầu mới, bỏ so sánh canonical/standard |
| 6 / `S02-04` | Nghiệm của bài toán pha trộn | Tính ví dụ hai biến, vẽ miền khả thi và các đường cùng chi phí; đọc nghiệm thành lượng từng nguyên liệu và tổng chi phí. Đổi một đơn giá hoặc yêu cầu số lượng nguyên để kiểm tra hiểu | Dạng chuẩn → nghiệm trong ngữ cảnh ban đầu | Giải thích nghiệm, nhận ra giả thiết biến liên tục; Thêm: đã triển khai |
| 7 / `S02-05` | Hồi quy với sai số tuyệt đối | Dữ liệu $X,y$, tham số $w$, dự đoán $Xw$, phần dư $r=Xw-y$; nhu cầu khớp dữ liệu theo tổng độ lệch tuyệt đối. Mô hình trực tiếp $\min_w\sum_i\lvert r_i\rvert$ đã lồi nhưng chưa được viết thành LP | LP đã có sẵn → mô hình cần cải dạng | Phân biệt dự đoán tuyến tính với dạng của bài toán tối ưu; Thêm: đã triển khai |
| 8 / `S02-06` | Biến phụ cho giá trị tuyệt đối | Bắt đầu với một phần dư; dùng $t_i\ge r_i$, $t_i\ge-r_i$. Ghép thành $\min_{w,t}\sum_i t_i$ với $-t\le Xw-y\le t$ | Trị tuyệt đối → mục tiêu và ràng buộc affine | Tự viết LP bằng biến phụ; Thêm: đã triển khai |
| 9 / `S02-07` | Tính tương đương của phép cải dạng | Hai chiều: từ $w$ chọn $t_i=\lvert r_i\rvert$; từ cặp khả thi suy ra $\sum_i t_i\ge\sum_i\lvert r_i\rvert$. Chứng nhận LP lồi, giải thích vì sao tại nghiệm tối ưu mọi $t_i=\lvert r_i\rvert$ và lấy lại $w$ để dự đoán | Phép biến đổi → bảo đảm không thay đổi bài toán | Chứng minh tương đương thay vì chỉ nhận dạng công thức; Thêm: đã triển khai |
| 10 / `S02-08` | Nghiệm hồi quy với sai số tuyệt đối | Dùng một bộ dữ liệu nhỏ; tính nghiệm, vẽ dữ liệu và đường dự đoán, kiểm từng phần dư và tổng sai số. Diễn giải $w$ và $t$; làm rõ $t$ là biến phụ, không phải tham số dùng để dự đoán | Chứng minh → kiểm tra số và diễn giải | Kiểm lại nghiệm của LP bằng mục tiêu gốc; Thêm: đã triển khai |
| 11 / `S02-09` | Hồi quy với sai số lớn nhất | Đổi nhu cầu sang giảm sai số tệ nhất; dùng một biến $t$ với $-t\mathbf{1}\le Xw-y\le t\mathbf{1}$, mục tiêu $\min t$. Kiểm quan hệ $t\ge\max_i\lvert r_i\rvert$, vẽ dải sai số trên cùng dữ liệu và so sánh với tổng sai số tuyệt đối | Cùng dữ liệu, khác tiêu chí → một LP khác | Tự chuyển giao kỹ thuật biến phụ; Thêm: đã triển khai |
| 12 / `S02-10` | Nhận dạng quy hoạch tuyến tính | Bài tập phân loại ba biến thể: thay đổi ràng buộc affine, thêm điều kiện nguyên, đổi mục tiêu thành tổng bình phương sai số. Yêu cầu giải thích dạng bài toán và tính lồi; trường hợp cuối nối cùng bài hồi quy sang phần quy hoạch bậc hai | Các ví dụ → lựa chọn dạng mô hình và giới hạn | Bài tập phân loại kèm lập luận; Thêm: đã triển khai |

### Ánh xạ chín bước và hành trình học

| Ví dụ | Bước 1–3: nhu cầu, mô hình, cách trực tiếp | Bước 4–6: nhận dạng, biến đổi, chứng nhận | Bước 7–8: số, hình, khái quát | Bước 9: biến thể |
|---|---|---|---|---|
| Pha trộn | `S02-01b`–`S02-02` | `S02-03`–`S02-03b`; không cần biến phụ vì mô hình đã tuyến tính, chỉ chuẩn hóa dấu và ký hiệu | `S02-04`; dạng chung ở `S02-03` là cầu nối ký hiệu | `S02-04`, nhắc lại ở `S02-10` |
| Hồi quy sai số tuyệt đối | `S02-05` | `S02-06`–`S02-07` | `S02-08`; khái quát vào `S02-10` | `S02-09`–`S02-10` |
| Hồi quy sai số lớn nhất | Nhu cầu thay đổi ở `S02-09`; dùng lại dữ liệu/biến từ ví dụ trước | Một biến chặn trên thay cho từng biến $t_i$; lập luận hai chiều tương tự, có kiểm tra cụ thể | Dùng lại dữ liệu ở `S02-08` để so sánh nghiệm và dải sai số | Sinh viên tự đề xuất ràng buộc giới hạn sai số trên từng điểm |

Nhu cầu đi trước dạng chuẩn. Trực quan pha trộn bắt đầu bằng bảng hàm lượng ở `S02-02`; mô hình và phép chuẩn hóa ở `S02-03`, hình miền khả thi dùng để kiểm nghiệm ở `S02-04`. Hồi quy dùng các đoạn biểu diễn sai số từ `S02-05`, sau đó biến phụ, chứng minh và kiểm tra số. Ứng dụng thực sự sử dụng mô hình vừa dựng; biến thể kiểm tra chuyển giao kỹ thuật. Giữ cùng $X,y,w,r$ cho hai tiêu chí hồi quy và phần quy hoạch bậc hai tiếp theo. Hành trình sáu bước được gộp trong các ví dụ theo chuỗi chín bước người dùng yêu cầu; không tạo một trang riêng chỉ liệt kê quy trình nội bộ.

### Nguồn và các điểm phải kiểm khi soạn

- Boyd và Vandenberghe (2004), *Convex Optimization*, §4.3 và §4.3.1 cho LP và bài toán khẩu phần/pha trộn; §6.1.1 cho xấp xỉ theo chuẩn một và chuẩn vô cùng. Tệp đã có: `sources/bv_cvxbook.pdf`; không tải thêm tài liệu.
- Đề cương chính thức: `sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx`. Chỉ dùng để xác định phạm vi và chuẩn đầu ra; không lấy thời lượng từ kho mẫu.
- Không đồng nhất “hồi quy tuyến tính” với “quy hoạch tuyến tính”; lớp bài toán còn phụ thuộc hàm mất mát và ràng buộc.
- Dạng LP dùng hàm affine; hằng số ở mục tiêu có thể bỏ khi tìm nghiệm. Điều kiện $x\ge0$ là ràng buộc của mô hình hoặc một quy ước dạng chuẩn, không bắt buộc với mọi cách viết LP.
- Không biến minh họa một nghiệm ở đỉnh thành khẳng định rằng mọi LP đều có nghiệm, có đỉnh hoặc có nghiệm duy nhất.
- Không gọi thêm biến phụ là xấp xỉ: cần chứng minh giá trị tối ưu và cách khôi phục nghiệm. Với sai số lớn nhất, không khẳng định mọi điểm dữ liệu đều đạt cùng sai số $t$.
- Dữ liệu minh họa phải được tự tính và kiểm nghiệm khi soạn; số liệu tự tạo, không phải kết quả thực nghiệm. Biến thể nguyên nhìn chung làm mất tính lồi; bình phương sai số chuẩn bị cho dạng bậc hai ở phần sau.

### Quy ước, dữ liệu và nguồn đã chốt

- Dạng chuẩn hiện tại: cực tiểu với đẳng thức và biến không âm, theo Boyd–Vandenberghe §4.3. Chuyển từ bài tổng quát bằng tách biến tự do và thêm biến phụ; ma trận khối, hai chiều bảo toàn và khôi phục nghiệm nằm trong ghi chú. Theo yêu cầu mới, bỏ so sánh canonical/standard. Tham chiếu MIT về tên canonical chỉ còn là lịch sử phiên bản trước; không dùng trên trang hiện tại.
- Dữ liệu vườn ươm: giá 3 và 2 (10 nghìn đồng/kg); nitơ 2 và 1 g/kg; phốtpho 1 và 2 g/kg; cần ít nhất 4 g nitơ và 5 g phốtpho. Nghiệm (1,2), chi phí 7; chứng minh cận dưới bằng tổ hợp hai bất đẳng thức với hệ số 4/3 và 1/3 trong ghi chú. Đổi giá loại I lên 4 tạo cả đoạn nghiệm tối ưu từ (0,4) đến (1,2).
- Hồi quy: u=(-2,-1,0,1,2), y=(-2,-1,3,1,2), w=(a,b), hàng i của X là (u_i,1), phần dư r=Xw-y. Tổng sai số tuyệt đối: w=(1,0), r=(0,0,-3,0,0), giá trị 3. Sai số lớn nhất: w=(1,1.5), r=(1.5,1.5,-1.5,1.5,1.5), giá trị 1.5; tổng sai số tuyệt đối 7.5. Mỗi kết quả có cận dưới giải tích trong ghi chú và được kiểm lại bằng bộ giải LP HiGHS qua SciPy.
- CLO1 và LLO3 là đối chiếu trực tiếp với buổi 2 trong đề cương; liên hệ CLO2/CLO4 về mô hình học máy và nhận dạng tối ưu là ánh xạ thiết kế của nhóm soạn, không phải trích nguyên ánh xạ LLO của đề cương. Không suy diễn thời lượng riêng cho phần LP.
- Năm SVG tự tạo: lp-mixture.svg, lp-data.svg, lp-epigraph.svg, lp-lad.svg, lp-minimax.svg. Không dùng tài sản raster. Đơn vị g và kg của câu chuyện không truyền sang dữ liệu hồi quy đã chuẩn hóa.
- Rà ghi chú học tập và bài tập cũ: hai tệp vẫn thuộc bản trước (mô hình X=I2, y=(2,1), các chủ đề sau chưa xây dựng lại). Giữ chúng làm tham khảo, tiếp tục ngừng liên kết trên chỉ mục; không công bố như tài liệu đã đồng bộ với phần mới. Trong phạm vi hiện tại, lời giải và biến thể của phần LP nằm trong ghi chú diễn giả.

## Triển khai phần 3 — Quy hoạch bậc hai

Đã triển khai theo yêu cầu bổ sung chính quy hóa rồi làm phần 3. Phần này có 14 trang; toàn bài 37 trang/bảy phần. So với kế hoạch 10 trang, thêm bốn trang S03-04b–e để thiết lập nhu cầu và tách các phép cải dạng. Giữ mã cũ; sửa vai trò S03-05 thành trường hợp bình phương sai số + hình phạt bậc hai, S03-06 thành so sánh bốn nghiệm. Không dạy thuật toán giải, KKT hoặc đối ngẫu; không gán thời lượng. Năng lực thiết kế hỗ trợ LLO3/CLO1 buổi 2: mô hình hóa, nhận dạng, chứng nhận và diễn giải nghiệm; đánh giá bằng bài tập cá nhân/nhóm.

| Mã | Tiêu đề | Lý do tồn tại / khoảng trống | Kết nối vào → ra | Minh chứng / quyết định |
|---|---|---|---|---|
| S03 | Quy hoạch bậc hai | Định danh lớp bài toán; nhận câu hỏi đổi tiêu chí từ phần 2. | Phần 2 → S03-01 | Định hướng; Giữ tiêu đề, bổ sung ghi chú |
| S03-01 | Hồi quy với tổng bình phương sai số | Thiết lập nhu cầu dự đoán và hai ứng viên trước khi khai triển mục tiêu. | S03 → S03-02 | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Triển khai kế hoạch; sửa nội dung theo phạm vi cuối |
| S03-02 | Dạng bậc hai của bình phương sai số | Chỉ ra cấu trúc bậc hai và chứng nhận Hessian; phân biệt viết lại với thay mục tiêu. | S03-01 → S03-03 | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Triển khai kế hoạch; sửa nội dung theo phạm vi cuối |
| S03-03 | Dạng phổ biến của quy hoạch bậc hai | Khái quát nhận dạng QP: mục tiêu bậc hai lồi, ràng buộc affine. | S03-02 → S03-04 | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Triển khai kế hoạch; sửa nội dung theo phạm vi cuối |
| S03-04 | Nghiệm hồi quy bình phương tối thiểu | Đọc nghiệm thành đường dự đoán; hình đồng mức làm rõ tác động của ràng buộc. | S03-03 → S03-04b | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Triển khai kế hoạch; sửa nội dung theo phạm vi cuối |
| S03-04b | Chính quy hóa trong hồi quy | Thiết lập nhu cầu kiểm soát hệ số và phân biệt hai tiêu chí sai số với hai hình phạt. | S03-04 → S03-04c | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Thêm theo yêu cầu chính quy hóa |
| S03-04c | Sai số tuyệt đối và chính quy hóa chuẩn một | Dùng lại biến phụ của phần 2 cho cả sai số và hệ số; nhận dạng LP. | S03-04b → S03-04d | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Thêm theo yêu cầu chính quy hóa |
| S03-04d | Sai số tuyệt đối và chính quy hóa bậc hai | Thay hình phạt bằng bình phương chuẩn hai; nhận ra QP dù sai số chưa trơn. | S03-04c → S03-04e | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Thêm theo yêu cầu chính quy hóa |
| S03-04e | Bình phương sai số và chính quy hóa chuẩn một | Giữ sai số bậc hai, cải dạng hình phạt chuẩn một; phân biệt QP với hàm trơn. | S03-04d → S03-05 | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Thêm theo yêu cầu chính quy hóa |
| S03-05 | Bình phương sai số và chính quy hóa bậc hai | Khai triển chính quy hóa bậc hai; chỉ rõ điều kiện đủ cho nghiệm duy nhất theo w. | S03-04e → S03-06 | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Triển khai kế hoạch; sửa nội dung theo phạm vi cuối |
| S03-06 | Nghiệm hồi quy có chính quy hóa | Đối chiếu bốn đường dự đoán, hệ số và tham số; đánh giá theo từng mục tiêu gốc. | S03-05 → S03-07 | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Triển khai kế hoạch; sửa nội dung theo phạm vi cuối |
| S03-07 | Hồi quy với giới hạn độ lớn hệ số | Thay chi phí mềm bằng mức trần cứng; chứng nhận miền hình tròn và nghiệm trên biên. | S03-06 → S03-08 | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Triển khai kế hoạch; sửa nội dung theo phạm vi cuối |
| S03-08 | Quy hoạch bậc hai với ràng buộc bậc hai | Khái quát QCQP từ ràng buộc chuẩn; chứng nhận cả mục tiêu và các bất đẳng thức. | S03-07 → S03-09 | Mô hình, chứng nhận hoặc diễn giải nghiệm hỗ trợ LLO3/CLO1; Triển khai kế hoạch; sửa nội dung theo phạm vi cuối |
| S03-09 | Nhận dạng và chứng nhận bài toán bậc hai | Kiểm tra chuyển giao khi thêm ràng buộc, đổi chiều bất đẳng thức hoặc đặt hệ số phạt bằng 0. | S03-08 → Phần 4: đổi biến | Phân loại và lập luận ở bài tập; Triển khai kế hoạch; sửa nội dung theo phạm vi cuối |


### Chín bước theo từng ví dụ

| Ví dụ | 1–3: nhu cầu, mô hình, cách trực tiếp | 4–6: cấu trúc, cải dạng, chứng nhận | 7–8: số, hình, khái quát | 9: kiểm tra hiểu |
|---|---|---|---|---|
| Bình phương tối thiểu | S03-01: dự đoán cùng dữ liệu, thử đường $\hat y=u$ | S03-02–03: khai triển tương đương, Hessian, QP | S03-04: đường dự đoán, nghiệm và đồng mức; QP đã khái quát ở S03-03 | S03-04: thêm $a\le1/2$ |
| Sai số tuyệt đối + chuẩn một | S03-04b–c: kiểm soát hệ số; bắt đầu từ nghiệm không phạt của phần 2 | S03-04c: hai nhóm biến phụ, tương đương hai chiều và LP | S03-06 và notes S03-04c: nghiệm, đường dự đoán, lớp LP | Notes: tăng $\lambda$ từ 4 lên 8; S03-09: $\lambda=0$ |
| Sai số tuyệt đối + bình phương chuẩn hai | S03-04b,d: cùng nhu cầu và dữ liệu, thay hình phạt | S03-04d: biến phụ cho sai số, mục tiêu QP; lồi chặt theo $w$ khi $\lambda>0$ | S03-06 và notes S03-04d: nghiệm/cận dưới, đường dự đoán | S03-06: $\lambda=0$ trả về hồi quy sai số tuyệt đối |
| Bình phương sai số + chuẩn một | S03-04b,e: thử nghiệm LS trước khi phạt | S03-04e: biến phụ cho hệ số, QP, bảo toàn giá trị và khôi phục $w$ | S03-06 và notes S03-04e: nghiệm; công thức theo $\lambda$ cho riêng dữ liệu này | Notes: $\lambda=8$; S03-09: thêm giới hạn chuẩn một |
| Bình phương sai số + bình phương chuẩn hai | S03-04b, S03-05: cân bằng sai số/độ lớn, thử nghiệm LS không phạt | S03-05: khai triển giữ nguyên biến, ma trận nửa xác định dương; $\lambda>0$ cho xác định dương | S03-06 và notes S03-05: nghiệm, đường dự đoán, QP không cần biến phụ | S03-06: $\lambda=0$; notes: phạt chỉ một phần hệ số |
| Giới hạn cứng | S03-07: yêu cầu mức trần, kiểm nghiệm LS nằm ngoài hình tròn | S03-07: mô hình đã lồi; Hessian của ràng buộc và cận dưới chứng minh nghiệm, không cần đổi biến | S03-07–08: nghiệm trên biên, đường dự đoán, khái quát QCQP | Notes: $R=0$, $R$ đủ lớn; S03-09: đảo chiều ràng buộc |

### Bản đồ sáu bước và ký hiệu

- Bình phương tối thiểu: nhu cầu và trực quan hai ứng viên ở S03-01 → ví dụ cùng năm điểm → hình thức S03-02–03 → áp dụng đọc nghiệm S03-04 → biến thể trong notes S03-04.
- Bốn mô hình chính quy hóa: nhu cầu ở S03-04b → trực quan hình thoi/đường tròn trên cùng trang → ví dụ dùng lại dữ liệu đã học → hình thức và chứng nhận riêng S03-04c,d,e,05 → áp dụng số/đường dự đoán S03-06 → bài tập trong notes và S03-09. Ví dụ số sau chứng nhận tuân theo chín bước người dùng yêu cầu; không xem hình thoi là bằng chứng rằng mọi nghiệm đều thưa.
- QCQP: nhu cầu, trực quan hình tròn và ví dụ giới hạn cụ thể ở S03-07 → hình thức riêng trên trang và chứng nhận trong ghi chú của trang, khái quát S03-08 → dùng nghiệm để dự đoán → bài tập S03-09. Gộp các bước trên S03-07 vì chỉ thêm một ràng buộc vào mô hình đã biết; chứng minh chi tiết nằm trong notes.
- Đầu vào: tập/hàm lồi, đạo hàm bậc hai và đại số tuyến tính từ Bài 01; mô hình hồi quy và kỹ thuật biến phụ của phần 2. Sản phẩm: mô hình rõ nghĩa, phép cải dạng hai chiều, chứng nhận và diễn giải nghiệm. Điểm ra: phân biệt bài đã lồi theo biến gốc với bài cần xét phép đổi biến ở phần 4. Thời lượng chưa phân bổ riêng.
- Xuyên suốt $X\in\mathbb R^{5\times2}$ có hàng $(u_i,1)$, $w=(a,b)$, $r=Xw-y$. Khi khái quát $X\in\mathbb R^{m\times n}$, $w,v\in\mathbb R^n$, $r,y,t\in\mathbb R^m$. $E=\|r\|_2^2$; hình phạt $\|w\|_1$ hoặc $\|w\|_2^2$; không dùng chuẩn Euclid chưa bình phương thay thế ngầm. $b$ trong $Ax=b$ là vectơ dữ liệu, khác hệ số chặn của hồi quy.

### Số liệu, nguồn và giới hạn

- Giữ dữ liệu phần 2: $u=(-2,-1,0,1,2)$, $y=(-2,-1,3,1,2)$. Phạt cả hệ số góc và hệ số chặn để minh họa; thang đặc trưng đã chuẩn hóa. Không khẳng định đây là lựa chọn mặc định mọi mô hình hay bảo đảm hiệu quả tổng quát hóa.
- Các ví dụ đã kiểm bằng HiGHS/SLSQP và phép tính độc lập: $\ell_1+\ell_1$, $\lambda=4$, $w=(1,0)$, mục tiêu 7; $\ell_1+\ell_2^2$, $\lambda=4$, $w=(3/4,1/8)$, mục tiêu $107/16$; $\ell_2^2+\ell_1$, $\lambda=4$, $w=(4/5,1/5)$, mục tiêu $62/5$; $\ell_2^2+\ell_2^2$, $\lambda=10$, $w=(1/2,1/5)$, mục tiêu $67/5$. Không so sánh giá trị giữa các hàm mục tiêu khác nhau hoặc nhận các $\lambda$ minh họa là đã chọn tối ưu trên tập kiểm định.
- Giới hạn $\|w\|_2^2\le29/100$ cho $w=(1/2,1/5)$, $E=21/2$. Bán kính chọn từ nghiệm hình phạt $\lambda=10$; notes chứng minh cận dưới, không suy ra quan hệ $\lambda=R$. Mô hình phạt và trần cứng chỉ được gọi cùng nghiệm khi đã xác lập quan hệ tham số.
- Tại $\lambda=0$, biến phụ cho hình phạt có thể không chạm $\lvert w\rvert$; vẫn khôi phục nghiệm $w$ và bảo toàn giá trị. Với phạt bình phương toàn bộ $w$ và $\lambda>0$, mục tiêu gốc lồi chặt theo $w$ ngay cả khi Hessian của bài có biến phụ chỉ nửa xác định dương. Không dùng hạng đầy cột làm điều kiện bắt buộc cho trường hợp này.
- Nguồn: Boyd–Vandenberghe (2004), sources/bv_cvxbook.pdf, §4.4 tr.152–153, §4.4.1 tr.153–154, §6.3.2 tr.306, §6.5.4 tr.334; đề cương DOCX chính thức cho buổi 2/LLO3/CLO1. Các phép cải dạng ba mô hình có biến phụ được tự suy từ khung nguồn, không nhận là trích nguyên ví dụ. Không tải MIT mới.
- Năm SVG tự vẽ: qp-ls.svg, qp-geometry.svg, qp-penalties.svg, qp-regularized.svg, qp-bound.svg. Tỷ lệ trục $a,b$ bằng nhau ở các hình hình học; có chú giải nét, nhãn và mô tả thay thế. Không tài sản raster hoặc ảnh sinh bởi AI.
- Ghi chú học tập và bài tập của bản cũ tiếp tục ngừng liên kết trong lúc xây dựng các phần còn lại; không công bố như đã đồng bộ. Lời giải, giả thiết và biến thể của phần mới nằm trong notes.
