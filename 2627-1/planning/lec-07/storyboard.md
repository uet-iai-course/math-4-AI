# Storyboard Bài giảng 07 — Quy hoạch tuyến tính và quy hoạch động

## Bản đồ hành trình khái niệm

| Cụm | Nhu cầu | Trực quan | Ví dụ | Hình thức/toán học | Ứng dụng | Bài tập | Đầu vào → sản phẩm; ký hiệu truyền; LLO/CLO | Gộp và câu nối; thời lượng |
|---|---|---|---|---|---|---|---|---|
| Mô hình LP | A01 | A03 | A02–A04 | A05 | A07 | A08 | Dữ kiện tài nguyên → mô hình LP đầy đủ; truyền $x_1,x_2,c=(2,3)$ và các giới hạn $30,20,54$; LLO17/CLO1 | Ví dụ dẫn nhập A02 cụ thể hóa nhu cầu phân bổ ở A01 trước khi hình thức hóa. Sau định nghĩa A05, A07 vận dụng bằng hồi quy $L_1$ và A08 đo khả năng dựng mô hình. Tổng $0{,}40$ LT + $0{,}20$ BT. |
| Đa diện và dạng chuẩn | B01 | B02 | B02, B05 | B03–B06 | B05–B06 | B07 | Mô hình LP → đa diện, dạng chuẩn, BFS; truyền cùng $x_1,x_2$, thêm $s_1,s_2,s_3$ và cơ sở chỉ số $B=\{1,2,4\}$ tương ứng $\{x_1,x_2,s_2\}$; LLO18/CLO1 | B02 gộp trực quan với ví dụ; B06 là tiên quyết trực tiếp để B07 kiểm BFS ngay tại $(30,12)$. “Miền có vô số điểm nhưng được tạo bởi hữu hạn nửa không gian.” Tổng $0{,}35$ LT + $0{,}15$ BT. |
| Điểm cực và thuật toán ở mức ý niệm | C01 | C02, C09 | C04 và ví dụ hộp hạt ở B02 | C03, C05–C06, C08 | C07–C09 | C10 | Đa diện/dạng chuẩn → phân loại kết cục và vận dụng bảo đảm điểm cực; truyền $P,A,b,c$ rồi đổi sang dữ kiện C10; LLO18/CLO1 | C06 dùng nón tiếp xúc và tính hữu hạn của tối ưu để nối mọi điểm cực chưa tối ưu với một điểm cực kề cải thiện; suy biến chỉ ảnh hưởng biểu diễn cơ sở và pivot. C08–C09 dùng chuỗi số $0\to60\to96$; C10 chuyển giao sang đa diện mới. Tổng $0{,}50$ LT + $0{,}30$ BT. |
| Hồi quy $L_1$ | A07 | A07 | A07 | A07 | A07 | A07 | Mất mát bình phương khuếch đại ngoại lai, còn $L_1$ không khả vi → mô hình hồi quy $L_1$ dưới dạng LP; truyền $a_i\in\mathbb R^n$, $b_i\in\mathbb R$, phần dư $a_i^Tx-b_i$ và $t_i\in\mathbb R_+$; củng cố LLO17/CLO1 | Dùng chu trình rút gọn nhu cầu → hình thức → kiểm tra vì đây là kỹ thuật phụ; các bước nhu cầu, trực quan đại số, ví dụ, hình thức, ứng dụng và tự kiểm đều được gộp tại A07. Ví dụ $|x-1|+|x-3|$ kiểm tính tương đương; không dùng C11 làm bài tập cho cụm này. Tổng $0{,}15$ LT + $0{,}05$ BT. |
| DP hữu hạn tất định | D02 | D02–D03 | D03 | D04 | D05 | D06 | Quyết định đơn → chuỗi quyết định; truyền đồ thị D03 sang $x_k,u,f_k,g_k,J_k$, rồi đổi $c(s,B)=3$, $c(C,t)=0$ ở D06; mục tiêu nội bộ, không gán LLO/CLO | Chỉ xét chân trời, trạng thái và điều khiển hữu hạn, chuyển tất định, chi phí cộng. D06 đo chuyển giao bằng dữ kiện mới. “Trạng thái đủ cho phép dùng chi phí còn lại thay toàn bộ quá khứ.” Tổng $0{,}40$ LT + $0{,}20$ BT. |
| Tích hợp LP và tổng kết | C01 | B02, C09 | C11 | C03, C05–C08 | C09 | C11 | Các cụm LP → chuỗi mô hình–hình học–bảo đảm–thuật toán; LLO17–18/CLO1 | C11 đánh giá tích hợp trước biên DP. Z01 chỉ thu hồi kết quả, đồng thời tách rõ mục tiêu nội bộ DP khỏi LLO17–18. |

## Phân bổ thời lượng nội bộ

| Khối | Lý thuyết | Bài tập | Ghi chú |
|---|---:|---:|---|
| Mở bài và kết luận | $0{,}20$ tiết | $0{,}10$ tiết | P, Z |
| Quy hoạch tuyến tính | $1{,}40$ tiết | $0{,}70$ tiết | A–C, hoàn tất bằng C11 |
| Quy hoạch động | $0{,}40$ tiết | $0{,}20$ tiết | D01–D06, mục tiêu nội bộ |
| **Tổng** | **$2{,}00$ tiết** | **$1{,}00$ tiết** | Đúng phân bổ đề cương |

## Bảng từng trang

| Mã | Lý do tồn tại và nhu cầu giải quyết | Quan hệ trước → sau | LLO/CLO hoặc minh chứng | Quyết định |
|---|---|---|---|---|
| P00 | Định danh đúng Buổi 7 và hai đối tượng LP–DP. | Mở bài → khóa tiên quyết. | Phạm vi đề cương và cấu trúc cập nhật. | thêm: trang tiêu đề bắt buộc. |
| P01 | Nêu miền, kích thước và quy ước trước khi dùng. | Bài trước → mục tiêu đo được. | Tiên quyết LLO17–18. | thêm: tránh ký hiệu ngầm. |
| P02 | Chuyển LLO17–18 thành sản phẩm có thể chấm và khai báo DP là cầu nối nội bộ. | Ký hiệu → vấn đề trung tâm. | Minh chứng CLO1; không tạo LLO DP. | sửa: ba thẻ phân biệt LP chính thức và DP nội bộ. |
| P03 | Nối hai cơ chế tránh duyệt vét cạn mà không đồng nhất LP với DP. | Mục tiêu → nhu cầu mô hình hóa. | Bản đồ đánh giá tích hợp. | sửa: thêm ranh giới “véc-tơ → chuỗi quyết định”. |
| A01 | Một quyết định tài nguyên cần biến, mục tiêu và ràng buộc đồng nhất. | P03 → ví dụ hộp hạt. | Nhu cầu LLO17. | thêm: không mở bằng định nghĩa. |
| A02 | Khóa dữ kiện và đơn vị dùng xuyên bài. | Nhu cầu → dựng ràng buộc. | Ví dụ dẫn nhập LLO17. | thêm: lấp khoảng trống trước hình thức. |
| A03 | Biến giới hạn thành bất phương trình và kiểm một điểm vi phạm. | Dữ kiện → mục tiêu. | Tái tạo ràng buộc LLO17. | thêm: trực quan theo đơn vị. |
| A04 | Buộc so sánh đúng các phương án khả thi; khóa kết quả $96>88$. | Ràng buộc → định nghĩa LP. | Ví dụ tính được LLO17. | thêm: kiểm số học. |
| A05 | Nêu định nghĩa, đầu vào, đầu ra và ranh giới tuyến tính. | Ví dụ → ứng dụng hồi quy $L_1$. | Hiểu định nghĩa LLO17. | giữ: khái niệm đề cương và mở bước ứng dụng A07. |
| A07 | Chuyển hồi quy $L_1$ thành LP với đầy đủ kiểu và ví dụ kiểm được. | Định nghĩa LP → bài tập dựng mô hình. | Vận dụng mô hình hóa LLO17. | đổi mã và chuyển trước bài tập để giữ hình thức → ứng dụng → bài tập. |
| A08 | Đo khả năng dựng mô hình đầy đủ từ dữ kiện mới. | Ứng dụng hồi quy $L_1$ → nhu cầu hình học. | Bài tập LLO17/CLO1. | đổi mã: kết mạch A bằng minh chứng chuyển giao. |
| B01 | Giải thích vì sao cần đa diện và dạng chuẩn trước điểm cực. | A08 → hình hộp hạt. | Nhu cầu LLO18. | thêm: nối đại số–hình học. |
| B02 | Cho thấy cùng miền khả thi, đỉnh và đường mức của ví dụ đã tính. | Nhu cầu → định nghĩa đa diện. | Trực giác LLO18. | thêm: SVG tự vẽ, không sao chép nguồn. |
| B03 | Định nghĩa đa diện và phân biệt bị chặn/không bị chặn. | Hình → dạng chuẩn. | Hiểu đa diện LLO18. | giữ: khái niệm đề cương. |
| B04 | Khóa một quy ước dạng chuẩn và giả thiết hạng đầy đủ. | Đa diện → biến phụ. | Dạng chuẩn LLO18. | sửa: nêu rõ quy ước thay vì dùng mơ hồ. |
| B05 | Chuyển đúng ba bất phương trình hộp hạt và diễn giải biến phụ. | Dạng chuẩn → cơ sở. | Vận dụng dạng chuẩn LLO18. | thêm: ứng dụng cùng ký hiệu. |
| B06 | Nêu đủ điều kiện cơ sở, nghiệm cơ sở và tính khả thi; cung cấp tiên quyết trực tiếp cho B07. | Biến phụ → bài tập kiểm cơ sở trên cùng hệ. | BFS LLO18. | sửa: thêm $A_B^{-1}b\ge0$ và khóa quan hệ B06→B07. |
| B07 | Buộc kiểm một BFS trên chính hệ hộp hạt thay vì hệ một phương trình rời rạc. | Kết B → nhu cầu điểm cực. | Bài tập LLO18/CLO1; nghiệm $(30,12,8)$. | sửa: truyền nguyên ký hiệu và dữ kiện B05. |
| C01 | Miền vô hạn điểm cần một tập ứng viên có cấu trúc. | B07 → định nghĩa hình học. | Nhu cầu LLO18. | thêm: mở mạch bảo đảm. |
| C02 | Định nghĩa điểm cực bằng tổ hợp lồi, dùng được ở mọi chiều. | Nhu cầu → đặc trưng đại số. | Hiểu điểm cực LLO18. | giữ: định nghĩa đề cương. |
| C03 | Liên hệ điểm cực với BFS và độc lập cột dưới đúng giả thiết. | Hình học → phản ví dụ. | Tương đương hình học–đại số. | sửa: nêu hạng và suy biến. |
| C04 | Ví dụ $\min -x_1-x_2$ tách “tồn tại đỉnh tối ưu” khỏi “mọi nghiệm tối ưu là đỉnh”. | Tương đương → tồn tại. | Trường hợp biên LLO18. | thêm: sửa ngộ nhận. |
| C05 | Tách định lý và hệ quả dạng chuẩn thành bảng giả thiết–kết luận. | Ví dụ → tối ưu tại điểm cực. | Bảo đảm tồn tại LLO18. | sửa: giảm tải văn bản, giữ điều kiện không chứa đường thẳng. |
| C06 | Nêu định lý tối ưu và bổ đề tổng quát: điểm cực chưa tối ưu có điểm cực kề cải thiện khi đa diện có điểm cực và tối ưu hữu hạn. | Tồn tại → bốn kết cục và Bài 08. | Bảo đảm tối ưu LLO18. | sửa: dùng nón tiếp xúc và hướng cạnh; suy biến ảnh hưởng pivot/quay vòng, không ảnh hưởng sự tồn tại của đỉnh kề cải thiện. |
| C07 | Phân loại đầy đủ không khả thi, không bị chặn, tối ưu duy nhất và nhiều tối ưu. | Định lý → thuật toán. | Chẩn đoán kết cục LLO18. | sửa: dùng “kết cục” để không lẫn với trạng thái của DP. |
| C08 | Mô tả thuật toán ở mức ý niệm và gắn chuỗi hộp hạt $0\to60\to96$. | Kết cục → đường đi trực quan. | Mô tả ở mức ý niệm cho LLO18. | sửa: tên thuần Việt, thêm số cụ thể, không tableau/pivot. |
| C09 | Vẽ đúng đa diện hộp hạt và hai cạnh của chuỗi ở C08. | Thuật toán → bài tập. | Trực giác thuật toán LLO18. | sửa: thay đa giác trừu tượng bằng dữ kiện xuyên bài. |
| C10 | Đo chuyển giao sang đa diện, đỉnh và đường đi mới; buộc nêu giả thiết định lý. | Thuật toán → bài tích hợp LP. | Giá trị $0,2,2{,}8,2$; LLO18/CLO1. | sửa: không lặp ví dụ C04. |
| C11 | Buộc nối mô hình, dạng chuẩn, đỉnh, kết cục và ba bước kiểm chứng của thuật toán ý niệm trước khi mở DP. | C10 → biên D01. | Bài tập tích hợp LLO17–18. | sửa tiêu chí thành đỉnh xuất phát → đỉnh kề cải thiện → tiêu chuẩn dừng. |
| D01 | So sánh đúng cấu trúc LP và DP, đồng thời khóa phạm vi DP hữu hạn tất định. | C11 → nhu cầu DP. | Không gán LLO/CLO mới. | sửa: cầu nối cụ thể, không khẳng định tương đương LP–DP. |
| D02 | Nêu vấn đề trùng lặp khi quyết định theo chuỗi và vai trò trạng thái. | Biên D01 → đồ thị tầng. | Mục tiêu nội bộ DP. | đổi mã từ D03. |
| D03 | Ví dụ tính được, cùng dữ kiện truyền sang Bellman. | Nhu cầu → phương trình Bellman. | Minh chứng nội bộ: $J(s)=5$, đường $s\to A\to D\to t$. | đổi mã từ D04 và sửa toàn bộ dữ kiện cạnh. |
| D04 | Nêu Bellman đúng với quyết định ở $k=0,\ldots,N-1$, chi phí cuối ở $N$, và tập điều khiển hữu hạn, không rỗng. | Ví dụ → thuật toán giải ngược. | Hình thức DP nội bộ. | sửa: khóa chỉ số giai đoạn và bỏ nhánh điều khiển vô hạn vượt phạm vi. |
| D05 | Chuyển Bellman thành quy trình có đầu vào/ra và chiều tính. | Hình thức → bài tập. | Ứng dụng DP nội bộ. | đổi mã từ D06. |
| D06 | Buộc tính lại Bellman khi hai chi phí đổi, thay vì chép kết quả D03. | Kết D → tổng kết. | $J(C)=0$, $J(D)=1$, $J(A)=3$, $J(B)=1$, $J(s)=4$; đường $s\to B\to C\to t$. | sửa: bài chuyển giao trên dữ kiện mới. |
| Z01 | Thu hồi LLO17–18 và so sánh hai cơ chế tránh duyệt vét cạn. | A–D → tài liệu. | Tổng hợp LLO17–18/CLO1; DP nội bộ. | sửa: cầu nối không tạo chuẩn đầu ra DP. |
| Z02 | Thu hồi ngắn vai trò trạng thái–Bellman, truy nguyên nguồn và nối bổ đề cơ sở C06 với phương pháp đơn hình Bài 08. | Khép bài → Bài 08. | Tự học. | sửa: kết luận DP trước khi tuyến chính quay lại LP. |

## Quyết định cấu trúc

- Chốt **37 trang** sau khi bỏ A06 vì ba ví dụ miền ứng dụng không tạo thêm minh chứng; đúng 6 `<section>` ngoài `P/A/B/C/D/Z`.
- LP gồm A–C, có hồi quy $L_1$ ở A07 trước bài tập A08 và hoàn tất LLO17–18 bằng bài tích hợp C11 trước khi mở DP.
- D01 chỉ là biên xác nhận LP hoàn tất và DP là mục tiêu nội bộ. DP chiếm D02–D06, không gán LLO/CLO; đủ chu trình nhu cầu → trực quan → ví dụ → hình thức → ứng dụng → bài tập.
- Không đưa tableau, pivot, biến vào–ra hoặc tìm cơ sở ban đầu theo Phase I. C06 phân biệt rõ: suy biến và quay vòng là vấn đề của biểu diễn cơ sở và quy tắc pivot, không làm mất bổ đề tồn tại điểm cực kề cải thiện.
- Nguồn MIT Bài 16 rộng hơn phạm vi: chỉ giữ DP hữu hạn tất định với trạng thái/điều khiển hữu hạn và Bellman; lược các biến thể và ví dụ vượt nhu cầu của mạch phụ.
