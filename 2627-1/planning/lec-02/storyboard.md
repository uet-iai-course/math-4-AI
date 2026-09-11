# Storyboard Bài 02 — Các bài toán tối ưu lồi

Phiên bản làm lại ngày 2026-09-11; bảy mạch đã được người dùng thống nhất.

## Trạng thái và mục tiêu

- Phạm vi hiện tại: bảy trang của phần 1 có nội dung và ghi chú diễn giả; các phần 2–7 vẫn là khung tiêu đề. Phần 1 có bảy trang sau khi bỏ trang điều kiện riêng theo yêu cầu người dùng; toàn bài hiện có 13 trang trong bảy section ngoài. Chưa chốt số trang cuối cùng, ví dụ số cho các phần 2–7, phân bổ thời lượng, vị trí của tựa lồi và nhiều mục tiêu.
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

### Mạch 2 — Quy hoạch tuyến tính: phân bổ nguồn lực và kiểm soát sai số

- Ví dụ: phân bổ ngân sách hoặc nguồn lực liên tục để hình thành quy hoạch tuyến tính (LP), rồi quay lại dự đoán với tổng sai số tuyệt đối hoặc sai số lớn nhất.
- Nội dung: biến phụ đưa trị tuyệt đối/cực đại về ràng buộc tuyến tính; giải thích tương đương và đọc nghiệm. Biến thể: số máy/sản phẩm phải nguyên.
- Đầu vào: mô hình và khung chứng nhận.
- Đầu ra: dạng LP, cải dạng bằng biến phụ và giới hạn của giả thiết biến liên tục.

### Mạch 3 — Quy hoạch bậc hai: khớp dữ liệu và kiểm soát độ lớn của mô hình

- Ví dụ: hồi quy tuyến tính, bổ sung hạn chế độ lớn hệ số; hình thành quy hoạch bậc hai (QP) và quy hoạch bậc hai với ràng buộc bậc hai (QCQP).
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
| 2 | `section-2` | `mach-2` / `S02` | Thêm khung tiêu đề cho mạch 2; nội dung sẽ được xây dựng cùng người dùng |
| 3 | `section-3` | `mach-3` / `S03` | Thêm khung tiêu đề cho mạch 3; nội dung sẽ được xây dựng cùng người dùng |
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
