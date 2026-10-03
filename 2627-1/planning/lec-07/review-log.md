# Nhật ký rà soát Bài giảng 07

## Trạng thái

**Đã sửa theo năm vòng rà soát độc lập; chờ kiểm định trực quan bằng Browser.** Tệp RevealJS, outline và storyboard đồng bộ ở 37 trang, 6 mạch. Các vấn đề nội dung, toán học, sư phạm và mạch kể chuyện trong bảng hợp nhất dưới đây đã đóng; kiểm định trực quan thực tế còn bị giới hạn bởi phiên không có Browser tích hợp.

## Kiểm kê nguồn và quyền

| Nguồn | Vai trò | Quyền/quyết định |
|---|---|---|
| Đề cương UET.AI2012 DOCX chính thức | Phạm vi Buổi 7, 2 LT + 1 BT, LLO17–18/CLO1 | Nguồn nội bộ do người dùng cung cấp; chỉ trích thông tin học phần |
| Bertsimas và Tsitsiklis (1997), Chương 1–2 | Nội dung chính về LP, đa diện, dạng chuẩn, BFS, điểm cực và bảo đảm | Dùng định nghĩa, định lý và công thức có ghi nguồn; không sao chép hình |
| `sources/Chương 8 Quy hoạch tuyến tính-phần 1.pdf` | Trang chiếu mẫu nội dung | Trích văn bản chỉ cho tiêu đề và bốn trang trống; không đủ làm nguồn nội dung hay bố cục chi tiết |
| `sources/part1.docx` | Cấu trúc học phần cập nhật đặt LP và DP trong Tuần 7 | Nguồn nội bộ; chỉ dùng để xác nhận cầu nối DP, không thay ánh xạ LLO chính thức |
| `sources/MIT/189163b71d0f322315c5c5324a3bc5e6_MIT15_093J_F09_lec16.pdf` | Khung DP, trạng thái, điều khiển, chuyển trạng thái và Bellman | MIT OpenCourseWare, tài liệu 15.093J/6.255J Fall 2009; dùng nội dung toán và ghi công, không sao chép hình |

Nguồn MIT mới đã được tác tử nguồn bổ sung vào kho và đã có mục tương ứng trong `sources/MIT/README.md`. Tác tử soạn không sửa danh mục nguồn theo giới hạn nhiệm vụ. Không dùng tệp `._*`.

## Tài sản tự vẽ

| Tệp | Vai trò | Quyết định |
|---|---|---|
| `img/lec-07/polyhedron-level-sets.svg` | Miền đa diện, năm đỉnh và đường mức hộp hạt | Tự vẽ từ dữ kiện; nhãn trục, điểm, đường mức và chiều tăng; có `title`, `desc`, `alt` |
| `img/lec-07/lp-four-statuses.svg` | Bốn kết cục LP | Sơ đồ khái niệm tự vẽ; hình dạng và văn bản cùng mã hóa kết cục, không chỉ dùng màu |
| `img/lec-07/conceptual-vertex-walk.svg` | Đường đi đỉnh kề cải thiện | Tự vẽ; không trình bày như vết chạy của đơn hình |
| `img/lec-07/dp-layered-graph.svg` | Đồ thị tầng và đường tối ưu chi phí 5 | Ví dụ tự tạo; số cạnh, đường tối ưu và phép cộng hiển thị rõ |

Không dùng ảnh raster hoặc ảnh sinh bởi AI. Không sao chép hình từ PDF.

## Sai khác có chủ ý so với mẫu

- Kế thừa cấu trúc RevealJS, nền sáng, thẻ, bảng, chân trang và màu từ `2526-2-another-course/` và Bài 05–06; không phụ thuộc runtime chéo.
- Mẫu `Chương 8 Quy hoạch tuyến tính-phần 1.pdf` không chứa nội dung trích xuất ngoài tiêu đề, nên deck giữ thứ tự đề cương chính thức thay vì mô phỏng các trang trống.
- Cấu trúc cập nhật trong `part1.docx` bổ sung DP vào Tuần 7, trong khi đề cương chính thức chỉ ánh xạ LLO17–18 cho LP. Vì vậy LP chiếm phần chính và hoàn tất LLO trước DP; DP được ghi là mục tiêu nội bộ.
- Bổ sung ví dụ hộp hạt xuyên suốt để giữ ký hiệu từ nhu cầu đến định lý và bài tập. Nghiệm đúng là $(30,12)$ với $z=96$; $(14,20)$ chỉ cho $88$.
- Bỏ A06 vì ba miền ứng dụng chỉ minh họa bằng tên, không tạo thêm thao tác hay minh chứng. Mã A07–A08 được dùng liên tục; tổng số giảm từ 38 xuống 37.
- Đặt hồi quy chuẩn $L_1$ tại A07, nêu kiểu $a_i,b_i,x,t_i$ và ví dụ một chiều kiểm được; A08 là bài tập kết mạch để giữ thứ tự hình thức → ứng dụng → bài tập.
- P02, P03, D01, Z01 và Z02 cùng tạo cầu LP–DP: so sánh hai cơ chế khai thác cấu trúc nhưng không tuyên bố hai lớp bài toán tương đương và không gán LLO/CLO mới cho DP.
- Bổ sung ví dụ $\min -x_1-x_2$ để sửa ngộ nhận rằng mọi nghiệm tối ưu phải là điểm cực.
- Mô tả thuật toán ở mức ý niệm chỉ gồm đỉnh xuất phát, chuyển sang đỉnh kề cải thiện và dừng khi không còn đỉnh kề cải thiện. C08–C09 dùng chuỗi hộp hạt cụ thể $(0,0)\to(30,0)\to(30,12)$ với $z:0\to60\to96$.
- Từ nguồn MIT Bài 16, chỉ giữ DP hữu hạn tất định với chân trời, trạng thái và điều khiển hữu hạn, chuyển tất định, chi phí cộng. Lược các biến thể, điều kiện điều khiển liên tục và ví dụ vượt nhu cầu của mạch phụ.

## Lỗi hoặc khoảng trống nguồn đã sửa

- Sửa kết luận số học dễ nhầm trong ví dụ hộp hạt: $2\cdot30+3\cdot12=96$ lớn hơn $2\cdot14+3\cdot20=88$.
- Không dùng câu “LP tối ưu luôn ở một đỉnh” thiếu giả thiết. Deck nêu miền dạng chuẩn không rỗng và giá trị tối ưu hữu hạn.
- Nêu đúng điều kiện đa diện có điểm cực: không rỗng và không chứa đường thẳng.
- Nêu đầy đủ điều kiện nghiệm cơ sở khả thi: $A_B$ khả nghịch và $A_B^{-1}b\ge0$.
- Phân loại bốn kết cục: không khả thi với miền khả thi rỗng; không bị chặn theo chiều tối ưu; tối ưu hữu hạn duy nhất; tối ưu hữu hạn nhiều nghiệm.
- Với Bellman, nêu điều kiện min đạt khi tập điều khiển hữu hạn, không rỗng; nếu tập vô hạn thì cần điều kiện bổ sung như compact và liên tục.
- Sửa phân loại ở A05: điều kiện biến nguyên tạo miền rời rạc và lớp quy hoạch nguyên, không phải một biểu thức phi tuyến.
- Sửa B03 để dùng đúng thuật ngữ “đa diện bị chặn”; bỏ cách gọi dễ gây nhầm “đa diện lồi hữu hạn”.
- Sửa C03 để nêu rõ $x\in P$ trước ba mệnh đề tương đương điểm cực–nghiệm cơ sở khả thi–độc lập cột.
- Sửa B07 để kiểm nghiệm cơ sở khả thi trên chính hệ hộp hạt: $B=\{x_1,x_2,s_2\}$, $\det(A_B)=-2\ne0$ và nghiệm cơ sở không âm $(30,12,8)$.
- Sửa C05 thành bảng định lý–giả thiết–kết luận; C06 thêm bổ đề điểm cực kề cải thiện và khóa chi tiết cập nhật cơ sở sang Bài 08.
- Sửa C10 thành bài chuyển giao với bốn đỉnh $(0,0),(2,0),(1{,}6,1{,}2),(0,2)$ và đường giá trị $0\to2\to2{,}8$.
- Sửa D06 bằng dữ kiện mới $c(s,B)=3$, $c(C,t)=0$: kết quả $J(s)=4$ và đường $s\to B\to C\to t$.

## Phân bổ thời lượng đã khóa

| Khối | Lý thuyết | Bài tập |
|---|---:|---:|
| Mở bài và kết luận | $0{,}20$ tiết | $0{,}10$ tiết |
| Quy hoạch tuyến tính | $1{,}40$ tiết | $0{,}70$ tiết |
| Quy hoạch động | $0{,}40$ tiết | $0{,}20$ tiết |
| **Tổng** | **$2{,}00$ tiết** | **$1{,}00$ tiết** |

## Giới hạn Codex Slides

- CLI `capabilities` hoạt động và cho biết địa chỉ cục bộ `http://127.0.0.1:4311` cùng bề mặt Browser.
- Lệnh `open` được gọi trước khi triển khai nhưng phiên tác tử không có công cụ Browser tích hợp để điều hướng tới URL và xác nhận màn hình tạo dự án.
- Vì không có bề mặt Browser/MCP trong phiên, không thể tạo và duy trì dự án bền vững, gán vai trò nguồn, render hoặc rà trực quan bằng Codex Slides.
- Bản này không tuyên bố đã kiểm tra bằng Codex Slides. RevealJS cục bộ và các kiểm tra cấu trúc là cơ chế dự phòng theo chỉ dẫn kho.

## Kiểm tra của tác tử soạn

- Kiểm tra cấu trúc xác nhận đúng 6 `<section>` ngoài, 37 `data-slide-id` duy nhất và 37 khối ghi chú diễn giả.
- Tập và thứ tự 37 mã trong storyboard trùng chính xác với RevealJS.
- Mọi đường dẫn CSS, JavaScript, plugin, KaTeX và SVG đều là đường dẫn tương đối và tồn tại trong `2627-1/`.
- KaTeX cục bộ kết xuất thử toàn bộ biểu thức sau chỉnh sửa, không có lỗi.
- Bốn SVG phân tích XML thành công, ImageMagick nhận đúng kích thước, mỗi tệp có `title` và `desc`; bốn lần nhúng đều có `alt` cụ thể.
- Kiểm tra số học xác nhận năm đỉnh hộp hạt có giá trị $0,60,96,88,60$; bài C10 có giá trị $0,2,2{,}8,2$; đồ thị D03 cho $J(s)=5$, còn dữ kiện chuyển giao D06 cho $J(C)=0$, $J(D)=1$, $J(A)=3$, $J(B)=1$, $J(s)=4$ và đường $s\to B\to C\to t$.
- Không có mã trang hoặc nhãn tuyến trên mặt trang; sáu lời mời tương tác đều dùng nhãn **“Câu hỏi:”**.
- `git diff --no-index --check` không báo lỗi khoảng trắng trong các tệp mới thuộc Bài 07.
- Kiểm tra tràn thực tế ở khung 16:9 và màn hình hẹp vẫn cần tác tử kiểm thử trực quan độc lập; phiên này không có Browser tích hợp.

## Các mục bắt buộc cho vòng rà soát độc lập

1. Kiểm toán số học toàn bộ ví dụ hộp hạt và đồ thị DP.
2. Kiểm tra giả thiết của định lý điểm cực, tương đương BFS và bốn kết cục LP.
3. Kiểm tra mô tả thuật toán ở mức ý niệm không lấn nội dung phương pháp đơn hình Bài 08.
4. Rà chu trình sáu bước và tính khả thi của 2 LT + 1 BT.
5. Render 37/37 trang ở $1280\times720$ và khung hẹp; kiểm KaTeX, tràn, alt, điều hướng bàn phím và hash.

## Hợp nhất năm vòng rà soát

Không xóa các nhận định trước. Bảng này ghi quyết định mới nhất và bằng chứng đóng vấn đề.

| Vai rà soát | Vấn đề | Mức | Trang/tài sản | Quyết định | Trạng thái | Bằng chứng hiện tại |
|---|---|---|---|---|---|---|
| Sinh viên | Bốn SVG nhiều nhãn, hình C09 trừu tượng và khó nối với ví dụ. | cao | B02, C07, C09, D03; 4 SVG | Vẽ lại tối giản; C09 dùng đúng đa diện và số của hộp hạt; cập nhật `alt`, `title`, `desc`. | đã sửa | Bốn SVG phân tích XML được; C09 hiển thị $(0,0)\to(30,0)\to(30,12)$ và $0\to60\to96$. |
| Toán học | Đường mức ở B02 chưa đi qua $(30,12)$ theo phép ánh xạ tọa độ; ô không bị chặn ở C07 còn một cạnh phải giả. | nghiêm trọng | `polyhedron-level-sets.svg`, `lp-four-statuses.svg` | Tính lại hai đường mức từ phép ánh xạ trục; vẽ miền recession mở bằng hai tia có mũi tên, không có cạnh phải. | đã sửa | Nét đứt $z=72$ đi qua các điểm ảnh $(95,37)$ và $(491,445)$; đường đỏ $z=96$ song song và đi qua điểm ảnh của $(30,12)$. Miền không bị chặn mở sang phải, không có đoạn biên đứng. |
| Sinh viên | A06 chỉ liệt kê miền ứng dụng; deck dài và phân bổ DP lấn phần LP chính thức. | vừa | A06; toàn bài | Bỏ A06; giảm còn 37 trang; lần phân bổ trước dùng $0{,}15/0{,}05 + 1{,}55/0{,}80 + 0{,}20/0{,}10 + 0{,}10/0{,}05$. | đã sửa, phân bổ đã cập nhật tiếp | HTML không còn A06; tổng vẫn đúng 2 LT + 1 BT. Phân bổ hiện hành ở bảng trên dành $0{,}40/0{,}20$ cho DP và được đồng bộ trong outline, storyboard, nhật ký. |
| Chuyên gia nội dung | B07 dùng hệ đồ chơi, A08 thiếu kiểu và ví dụ AI cụ thể. | cao | A07, B07 | Chuyển nội dung hồi quy $L_1$ sang A07 với kiểu và ví dụ; B07 dùng cơ sở của bài hộp hạt. | đã sửa | A07 nêu $a_i,b_i,x,t_i$; B07 có $\det(A_B)=-2\ne0$ và nghiệm $(30,12,8)$. |
| Mạch kể chuyện | A07 bài tập đứng trước A08 ứng dụng, làm đảo thứ tự hình thức → ứng dụng → bài tập. | cao | A07–A08; outline; storyboard | Đặt hồi quy $L_1$ tại A07 và bài tập dựng mô hình tại A08; đổi toàn bộ quan hệ trước–sau. | đã sửa | HTML, outline và storyboard cùng có thứ tự A05 định nghĩa → A07 ứng dụng → A08 bài tập → B01. |
| Học thuật–giảng dạy | Cụm hồi quy $L_1$ gán C11 làm bài tập dù C11 là bài tích hợp LP khác. | cao | Bản đồ hành trình khái niệm | Dùng chu trình rút gọn nhu cầu → hình thức → kiểm tra tại A07 vì đây là kỹ thuật phụ có ví dụ số kiểm được. | đã sửa | Hàng hồi quy dùng A05/A07 và nêu rõ A07 gộp ứng dụng với tự kiểm; không còn gán C11. |
| Chuyên gia nội dung | C08 dùng tên Anh và C08–C09 không có vết số kiểm được. | vừa | C08–C09 | Dùng tên “Mô tả thuật toán ở mức ý niệm”; khóa chuỗi đỉnh và giá trị mục tiêu. | đã sửa | Tiêu đề C08 thuần Việt; HTML, SVG và ghi chú trùng số $0,60,96$. |
| Toán học | C05–C06 khó phân biệt định lý, hệ quả và cầu nối đến cơ sở; Bellman mở rộng vượt phạm vi. | cao | C05–C06, D01, D04 | C05 dùng bảng giả thiết–kết luận; C06 thêm bổ đề cầu nối; DP giới hạn hữu hạn tất định. | đã sửa | C05 nêu không rỗng/không chứa đường thẳng; C06 viện dẫn tương đương C03; D01/D04 khóa tập hữu hạn; D04 đặt quyết định ở $k=0,\ldots,N-1$ và chi phí cuối ở $N$. |
| Toán học | C10 và D06 lặp dữ kiện đã giải nên chưa đo chuyển giao. | cao | C10, D06 | Thay bằng hai bộ dữ kiện mới và ghi đáp án trong notes. | đã sửa | C10 có tối ưu $(1{,}6,1{,}2)$; D06 có $J(s)=4$, đường $s\to B\to C\to t$. |
| Học thuật–giảng dạy | LP và DP đứng cạnh nhau nhưng cầu khái niệm chưa rõ; DP dễ bị hiểu thành LLO chính thức. | cao | P02, P03, D01, Z01, Z02 | Dùng nhất quán đối chiếu “điểm cực/cơ sở” với “trạng thái/Bellman”; gắn nhãn DP là cầu nối nội bộ. | đã sửa | Năm trang cùng phân biệt tuyến LLO17–18 với mục tiêu nội bộ DP; Z02 quay về đơn hình Bài 08. |
| Học thuật–giảng dạy | C06 chưa chuẩn bị đủ cho Bài 08. | vừa | C06, Z02 | Vòng trước đã nêu bổ đề trong trường hợp không suy biến và để quy tắc cập nhật cơ sở, suy biến, quay vòng sang Bài 08. | đã thay thế bằng kết luận tổng quát | Nhận định được giữ để truy nguyên. Vòng hiện hành bỏ giả thiết không suy biến khỏi bổ đề hình học; xem hàng đóng vấn đề mới bên dưới. |
| Mạch kể chuyện | P03 chuyển đột ngột từ LP sang Bellman; D01 chỉ là nhãn phần. | cao | P03, D01 | Thêm ranh giới đối tượng quyết định và so sánh hai cách tránh duyệt vét cạn. | đã sửa | P03 có nút “véc-tơ → chuỗi quyết định”; D01 đối chiếu cấu trúc LP–DP. |
| Mạch kể chuyện | Tổng kết chưa trả lại tuyến chính của học phần. | vừa | Z01–Z02 | Z01 thu hồi LLO LP; Z02 thu hồi ngắn trạng thái–Bellman rồi nối bổ đề C06 với đơn hình Bài 08. | đã sửa | Hai trang kết luận tách rõ cầu DP nội bộ, kết luận DP và chuyển tiếp LP chính thức. |
| Sinh viên | Chữ và nhãn trong bốn SVG nhỏ khi chiếu; khung hình HTML giới hạn quá thấp. | cao | B02, C07, C09, D03; 4 SVG | Tăng chữ nội dung cốt lõi lên tối thiểu 30 px, tiêu đề ô lên 34 px; rút nhãn và tăng `max-height` hình lên 410 px, màn hẹp 280 px. | đã sửa | Bốn SVG không còn `font-size` dưới 30; CSS giữ ngưỡng thân bài và chỉ tăng vùng hình. PNG kết xuất được dùng để kiểm tra biên và nhãn. |
| Học thuật–giảng dạy | C06 giới hạn sai bổ đề đỉnh kề ở trường hợp không suy biến; C05–C06 thiếu tuyến chứng minh và C08 chưa khóa cùng điều kiện đầu vào. | nghiêm trọng | C05, C06, C08; storyboard, outline | Phát biểu bổ đề trên đa diện có điểm cực và tối ưu hữu hạn; giải thích bằng nón tiếp xúc, hướng cạnh và hướng suy thoái; tách suy biến của cơ sở/pivot khỏi tồn tại hình học; đồng bộ điều kiện C08. | đã sửa | C05–C06 notes có mục tiêu, ý tưởng, các bước và điểm dùng giả thiết. C06 không còn giả thiết không suy biến; C08 dùng đúng ba điều kiện của C06 và viện dẫn tiêu chuẩn dừng. |

## Đóng lỗi mã nội bộ trong nội dung — 2026-08-30

| Vai rà soát | Vấn đề | Mức | Trang | Quyết định | Trạng thái | Bằng chứng sau sửa |
|---|---|---|---|---|---|---|
| Học thuật–giảng dạy | Mã vị trí nội bộ xuất hiện trên mặt trang hoặc trong ghi chú, làm lộ cơ chế truy nguyên cho người học. | cao | B07, C08, C10, D01, D06, Z02 | Thay mọi tham chiếu mã bằng tên hệ, định lý, bổ đề, ví dụ hoặc quan hệ trước–sau có nghĩa. | đã đóng | Nội dung dùng “hệ biến phụ của bài hộp hạt”, “bổ đề đỉnh kề”, “hai bài tập tích hợp quy hoạch tuyến tính”, “đồ thị ví dụ đường đi theo tầng” và “ví dụ trước”. Quét văn bản sau khi loại thuộc tính, `style` và `script` không còn mã dạng chữ cái–hai chữ số. |

## Kiểm định kỹ thuật và trực quan cuối — 2026-08-30

- Codex Slides đã được mở trước khi triển khai nhưng không tạo được dự án bền vững: Node.js cục bộ là 18.19.1 trong khi plugin yêu cầu từ 20; manifest plugin và gói gốc cũng lệch phiên bản. Lỗi máy chủ là `ReferenceError: File is not defined`. Không tuyên bố đã kiểm định bằng Codex Slides.
- `python3 -m reloadserver 8765` không khả dụng vì môi trường thiếu mô-đun `reloadserver`. Dùng máy chủ HTTP cục bộ làm cơ chế dự phòng; tệp HTML và 14 tài nguyên cốt lõi đều trả mã HTTP 200.
- Chromium kết xuất đủ 37 trang ở $1280\times720$ và $720\times1280$. Ảnh toàn bộ trang đã được rà trực quan; phép đo hộp bao trên phiên bản cuối cho kết quả 0 trang tràn.
- Cấu trúc cuối có 6 mạch, 37 mã duy nhất và 37 ghi chú. Có 229 biểu thức KaTeX; trình duyệt không báo lỗi công thức. Điều hướng bàn phím chuyển từ `#/1/1` sang `#/1/2`; `hash: true` và `hashOneBasedIndex: true` hoạt động.
- Bốn SVG có mô tả truy cập và cỡ chữ tối thiểu 30 px; bốn thẻ ảnh có `alt`. Không có yêu cầu tài nguyên cốt lõi thất bại.

## Rà soát GLM 5.3 Flash và chỉnh sửa hợp nhất — 2026-08-30

- Tác tử lập kế hoạch và các vai kiểm định storyboard, sinh viên, chuyên gia nội dung, toán học, học thuật–giảng dạy và mạch kể chuyện chạy bằng `z-ai/glm-5.3-flash` qua OpenRouter. Vùng làm việc của worker chỉ chứa `AGENTS.md`, đề cương DOCX chính thức, deck HTML, ba tệp planning, template, CSS và index; không chứa PDF, trích xuất PDF, `sources/MIT/README.md`, `part1.docx`, `.env`, khóa hoặc dữ liệu xác thực.
- Vòng phân tích nguồn GLM đầu tiên gặp `api_transport_error`; lần thử lại không tạo kết quả dùng được. Điều phối viên đối chiếu nguồn cục bộ: PDF mẫu quy hoạch tuyến tính có bốn trang nhưng chỉ trích được tiêu đề; MIT 15.093J Bài 16 có khung trạng thái, quyết định, chuyển trạng thái và Bellman ở trang 6–9; `part1.docx` đặt quy hoạch tuyến tính và quy hoạch động ở Tuần 7. Vì đề cương chính thức chỉ gán LLO17–18/CLO1 cho LP, DP tiếp tục là cầu nối nội bộ, không tạo LLO/CLO mới.
- Kiểm định storyboard đạt PASS với 37 trang, 6 mạch và đúng 2 LT + 1 BT. Hai điểm nhẹ được đóng: B06 được ghi là tiên quyết trực tiếp cho B07; chu trình hồi quy $L_1$ ghi rõ các bước gộp tại A07.
- Kiểm toán toán học đạt PASS. Các giá trị hộp hạt, nghiệm cơ sở khả thi, ví dụ chuẩn $L_1$, bài C10 và Bellman D03/D06 đều được tính lại và đúng.
- Rà sinh viên và học thuật–giảng dạy yêu cầu làm rõ lượng từ ở C05 và giả thiết của bổ đề C06. Deck hiện nêu rõ $P=\{x:Ax=b,x\ge0\}$, $x\in P$, lượng từ $t\in\mathbb R$, đồng thời lặp điều kiện có điểm cực và giá trị tối ưu hữu hạn ngay trong hộp bổ đề.
- Rà chuyên gia yêu cầu phân biệt “không khả thi” với “không bị chặn”; rà mạch kể chuyện yêu cầu tiêu chí C11 kiểm chứng được. C07 hiện dùng “bốn kết cục”, ghi miền khả thi rỗng; C11 yêu cầu đỉnh xuất phát, bước sang đỉnh kề cải thiện và tiêu chuẩn dừng.
- A02 tách rõ hai giới hạn sản lượng; A07 nêu nhu cầu từ ảnh hưởng của ngoại lai và tính không khả vi; B07 ánh xạ cơ sở chỉ số $B=\{1,2,4\}$ với $\{x_1,x_2,s_2\}$; P01 bỏ ký hiệu không dùng; D02 và ghi chú B04 được viết thành câu đầy đủ. Index đồng bộ nhãn `Bài 07` và tiêu đề deck.
- Worker soạn vượt giới hạn 16 lần gọi công cụ trước khi áp dụng bản sao tạm. Điều phối viên dừng worker và áp dụng cục bộ gói sửa đã được năm reviewer cùng kiểm định storyboard phê duyệt. Không có dữ liệu ngoài phạm vi được gửi thêm.
- Giới hạn Codex Slides không đổi: runtime cục bộ dùng Node.js 18 và lỗi `ReferenceError: File is not defined`, trong khi plugin yêu cầu Node.js 20 trở lên; không có bề mặt Browser tích hợp. Không tuyên bố đã kiểm định bằng Codex Slides. Kiểm định RevealJS/Chromium cục bộ là cơ chế dự phòng bắt buộc trước bàn giao.

## Kiểm định bàn giao sau chỉnh sửa — 2026-08-30

- Tái kiểm sinh viên, toán học và học thuật–giảng dạy đều đạt PASS; không còn lỗi chặn. Hai chỗ còn dùng “trạng thái” cho LP ở C10 và Z01 đã đổi thành “kết cục”.
- Tăng cỡ chữ bảng từ `0.86em` lên `0.94em`; với cỡ trang `0.8em`, cỡ hiệu dụng đạt khoảng `0.752em`. Không có trang nào dùng lớp `small-table`.
- Cập nhật SVG `lp-four-statuses.svg` thành “Bốn kết cục”, nhãn “Không khả thi”, giữ mô tả truy cập, hình dạng và tín hiệu không phụ thuộc riêng vào màu.
- Chromium kết xuất đủ 37 trang ở $1280\times720$, $800\times600$ và $720\times900$. Cả ba khung đều có 0 trang tràn, 0 lỗi console, 0 lỗi trang và 0 yêu cầu tài nguyên thất bại.
- Ảnh chụp trực tiếp các trang P03, A02, A07, B07, C05, C06, C07, C11, D02, D03 và Z01 ở khung rộng, cùng P03, A02, A07, C05, C06, C07, C11 và D02 ở khung hẹp, đã được rà trực quan. Công thức, bảng, hộp giả thiết, sơ đồ và tiêu chí bài tập đều đọc được, không bị cắt.
- Cấu trúc cuối: 6 mạch, 37 mã duy nhất, 37 ghi chú diễn giả, 37 mục nguồn, 14 tham chiếu cục bộ và không có đường dẫn thiếu. Cấu hình RevealJS bắt buộc và phân cách công thức Markdown đều hợp lệ; `git diff --check` sạch.

## Ghi chú bài giảng — 2026-08-31

- Tạo `materials/lec-07/lecture-note.md` gồm 6 mạch nội dung, 14 chủ đề và một phần riêng có 7 định lý hoặc mệnh đề kèm chứng minh. Mỗi chủ đề có đủ mục tiêu đọc hiểu, định nghĩa và giả thiết, trực quan, ví dụ tính được, hình, ứng dụng AI, điểm dễ nhầm, câu hỏi kiểm tra và đầu ra.
- Khóa ranh giới với các bài liền kề: không giảng lại cải dạng lồi tổng quát của Bài 02; không đưa đối ngẫu hoặc KKT của Bài 03; không triển khai pivot, chi phí giảm, Phase I/II hay chống quay vòng của Bài 08. Quy hoạch động chỉ giới hạn ở chân trời hữu hạn, trạng thái và điều khiển hữu hạn, chuyển tất định, chi phí cộng.
- Kiểm toán toán học phát hiện và sửa ba lỗi trước công bố: hai lệnh giãn cách KaTeX thiếu dấu gạch chéo; ví dụ độ phức tạp DP không khớp giữa số tầng, số chuỗi và số cạnh; định lý tồn tại điểm cực viện dẫn kết quả cần giả thiết hạng hàng đầy đủ nhưng chưa nêu giả thiết đó.
- Bổ sung năm SVG tự tạo: `lp-model-units.svg`, `l1-residual-slack.svg`, `standard-form-basis.svg`, `dp-state-sufficiency.svg`, `lp-dp-decision-map.svg`. Sau lần render đầu, sửa tràn chữ ở bốn hình, bỏ ký tự chỉ số dưới phụ thuộc phông trong hai hình và render lại.
- Chín SVG của bài phân tích XML thành công, có `role="img"`, `title`, `desc`, không có script hoặc `foreignObject`; ImageMagick kết xuất đủ chín PNG để rà trực quan. Mọi ảnh trong Markdown có văn bản thay thế và đường dẫn cục bộ tồn tại.
- Dùng quy trình `no-ai-slop` để sửa tối thiểu các câu dẫn chung, cụm nhấn mạnh mơ hồ và sự lặp cấu trúc; giữ nguyên nội dung toán, ký hiệu và mức chứng minh.
- Giới hạn Codex Slides không đổi: runtime cục bộ chưa đáp ứng phiên bản Node.js mà plugin yêu cầu và phiên này không có bề mặt Browser tích hợp. Không tuyên bố đã kiểm định ghi chú bằng Codex Slides; kiểm định Markdown, SVG, HTTP và viewer cục bộ được dùng làm cơ chế dự phòng.

## Rà văn phong và mạch khái niệm ngày 2026-09-01

- Bỏ 14 dòng `Đầu ra` lặp mục tiêu đọc hiểu trong lecture note; không sửa định nghĩa, ví dụ, định lý, chứng minh hoặc câu hỏi kiểm tra.
- Deck không có lời điều phối biên tập hoặc mã quy trình lộ ra. Các cụm “kiểm trực tiếp” còn trong note là nhiệm vụ toán học cụ thể về chi phí đường đi và tích ma trận–véc-tơ, nên được giữ.
- Kiểm định đạt 37 mã duy nhất, 37 ghi chú, 6 section ngoài, thẻ cân bằng, tài sản tồn tại, SVG hợp lệ và HTTP 200 cho deck/viewer/note/KaTeX.
- Codex Slides xác nhận dự án `20260901031914-lecture-07-quy-ho-ch-tuy-n-t-nh-v-ng-dqvy` ở trạng thái draft với 37 trang; không có Browser để tuyên bố rà trực quan mới.
- Reviewer độc lập `z-ai/glm-5.3-flash` đọc toàn bộ deck và note, kết luận PASS. Ghi chú nhỏ về nguồn nội bộ ở P02 đã được xử lý: nhãn đổi thành `Chuỗi quyết định`, nguồn thay bằng đề cương và Bellman (1957).
- Hậu kiểm toàn khóa bỏ ba câu dùng “mạch” để mô tả cấu trúc bài; thay bằng chuyển đổi khái niệm cụ thể giữa mô hình LP, hình học đa diện và chuỗi quyết định DP.

## Rà soát sâu và kiểm định bổ sung ngày 2026-09-01

### Nội dung và văn phong

- Ví dụ hộp hạt không còn gọi biến liên tục là “số lô”. Deck, lecture note, outline và SVG thống nhất $x_1,x_2$ là sản lượng tính theo nghìn hộp; nguồn chung là 54 giờ máy và hệ số tiêu hao là 1, 2 giờ máy trên mỗi nghìn hộp. Nếu quyết định chỉ nhận số lô nguyên, nội dung nêu rõ phải chuyển sang quy hoạch nguyên.
- A05 dùng “kết cục” cho quy hoạch tuyến tính, tránh lẫn với “trạng thái” của quy hoạch động. P02, P03, A08, C10, C11, D01 và Z01 đã bỏ lời về đo LLO, tuyến nội bộ hoặc quy trình biên soạn khỏi ghi chú công khai; mục tiêu học tập P02 vẫn giữ mã LLO/CLO vì đây là nội dung chính thức của đề cương.
- Lecture note bỏ 14 câu mở đầu lặp mẫu `Mục tiêu đọc hiểu`; định nghĩa, trực quan, ví dụ, ứng dụng, điểm dễ nhầm, câu hỏi kiểm tra, định lý và chứng minh được giữ nguyên. Khuôn LP tổng quát khai báo kiểu của $A,b,G,h,\boldsymbol\ell,u$ trước khi dùng và thống nhất $\boldsymbol\ell$ trong công thức.
- Z01 được viết lại thành bảng điều kiện toán học cần giữ và so sánh hai cơ chế tránh duyệt vét cạn. Metadata LLO/CLO tiếp tục nằm trong outline và storyboard để truy nguyên, không lộ thành lời điều phối trên trang tổng kết.

### Định lý, SVG và hiển thị

- Rà soát toán học độc lập xác nhận các chứng minh về tồn tại điểm cực của đa diện dạng chuẩn, đạt supremum hữu hạn, tồn tại điểm cực tối ưu, điểm cực kề cải thiện và phương trình Bellman đều đúng với giả thiết đã nêu.
- `lp-four-statuses.svg` đổi nhãn thành “Mục tiêu không bị chặn”. Ô không khả thi nay tô hai nửa không gian đối nghịch, gắn nhãn `H1`, `H2` và để khoảng trống giữa chúng; hình không còn chỉ dựa vào hai đường song song hoặc màu.
- `lp-model-units.svg` ghi đủ đơn vị biến, giới hạn, giờ máy và hệ số tiêu hao. Ký hiệu trong SVG dùng `x1`, `x2` thay cho chỉ số dưới Unicode để tránh mất glyph khi kết xuất. Hai SVG được phân tích và kết xuất lại; không có chữ tràn.
- Chromium kiểm tra trực tiếp A02, C07 và Z01 ở $1280\times720$, cùng A02 ở $720\times900$: chữ, bảng, công thức và hình đọc được, không cắt hoặc chồng lấn. Material viewer tải thành công; trạng thái chờ có thuộc tính `hidden`, có 484 nút KaTeX và không có `katex-error`.
- Cấu trúc giữ 6 section ngoài, 37 mã duy nhất, 37 ghi chú và 37 mục nguồn. `git diff --check` sạch. Reviewer độc lập hậu kiểm ba lỗi nhẹ cuối và trả `PASS`.

### Codex Slides và phạm vi dữ liệu ngoài

- Dự án Codex Slides `20260901031914-lecture-07-quy-ho-ch-tuy-n-t-nh-v-ng-dqvy` vẫn ở trạng thái draft với 37 trang. Outline bền vững đã cập nhật tiêu đề Z01 thành “Điều kiện cần giữ và cầu nối”; lần đọc lại xác nhận đúng 37 mục outline và 37 trang.
- Phiên hiện tại không có Browser tích hợp, nên không tuyên bố đã kiểm tra bề mặt hiển thị của Codex Slides. Kiểm định trực quan dùng RevealJS và Chromium cục bộ.
- Không gửi nội dung Bài 07 tới OpenRouter hoặc dịch vụ ngoài. Quyền gửi dữ liệu được người dùng cấp trong lượt này chỉ áp dụng cho bốn tệp Bài 04.

### Bổ sung sau rà soát chéo toàn học phần

- Lecture note công bố ánh xạ giữa ký hiệu in đậm $(\mathbf x,\mathbf c,\mathbf A,\mathbf b)$ và dạng lược kiểu đậm $(x,c,A,b)$ trên trang chiếu; kiểu và kích thước đại lượng không đổi.
- Hậu kiểm toàn cục bỏ tham chiếu biên tập giữa hai bề mặt: lecture note nêu trực tiếp ánh xạ ký hiệu, còn ghi chú B04 phát biểu quy ước dạng chuẩn bằng `Trong bài này`.

## Lượt duyệt từng trang ngày 2026-10-03

Yêu cầu người dùng: duyệt lần lượt từng trang, xác định trang muốn nói gì và còn vấn đề gì, đề xuất rồi sửa để tiêu đề ngắn gọn, học thuật, mạch lập luận chặt chẽ, khái niệm không xuất hiện đột ngột; duyệt lại theo góc nhìn sinh viên; giảm chữ và giải thích dài; dùng hình để nhắc lại thay cho tham chiếu tới ví dụ ở trang trước; sau mỗi trang sửa phần ghi chú bài giảng tương ứng, gắn bài lên `index.html`, rồi commit và push. Điều phối viên là phiên Claude Code chính, chạy Claude Opus 5.5 (`claude-opus-5-5`), đồng thời giữ vai biên tập cho các sửa một trang. Sau mỗi phần (hoặc cặp phần), hai tác tử `fork` chỉ đọc (kế thừa Opus 5.5) tái kiểm toán học và mạch lập luận trên các trang đã sửa. Văn bản tự kiểm theo `no-ai-slop`. Mỗi trang sửa được kiểm bằng Playwright Chromium tại 1600×900 và 390×844 (kể cả cuộn tới cuối vùng đọc hẹp) qua `python3 -m reloadserver 8765`.

### Hạ tầng hiển thị và trang chỉ mục

- **Màn hẹp — sửa.** Bài 07 chưa có vùng đọc cuộn như Bài 04–06; ở 390×844 khung 16:9 bị thu nhỏ, chữ thân bài còn khoảng 10px. Bọc `.slides` trong `.lecture-viewport`, thêm `scrollActivationWidth:null`, quy tắc màn hẹp trong `lecture-style.css` (phạm vi `data-lecture="07"`), dấu cuộn ngang cho công thức/bảng tràn và xử lý phím cuộn trong vùng đọc. Khung rộng giữ nguyên bố cục. Chữ thân bài ở màn hẹp nay 22px.
- **Chỉ mục — thêm.** `index.html` thêm thẻ Bài 07 với liên kết bài giảng và ghi chú bài giảng (Bài 07 chưa có tệp bài tập riêng).
- **Phát hiện chờ xử lý theo trang:** A07 cao 737px ở khung 16:9 (vượt 720px); B05 (691px) và D01 (655px) sát khung.

### Phần P

- **P00 — sửa.** Phụ đề “Hình học của quyết định tuyến tính” chỉ bao phần LP. Phụ đề mới “Đa diện, điểm cực và phương trình Bellman” nêu đủ hai phần. Ghi chú bỏ “hoàn tất quy hoạch tuyến tính” (phương pháp đơn hình còn ở Bài 08) và nêu phạm vi. Ghi chú bài giảng: đoạn mở đầu viết lại câu về quan hệ LP–DP.
- **P01 — sửa.** Thẻ “Đầu vào” đổi thành “Kiến thức cần có”; mục “Giá trị nhỏ nhất và lớn nhất” không nêu kỹ năng cụ thể, thay bằng phép đổi chiều $\min f=-\max(-f)$. Ghi chú mở bằng lời điều phối “Kiểm tra người học…”, viết lại thành giải thích vai trò biến–dữ kiện và tác động của phép đổi chiều. Ghi chú bài giảng: đoạn ký hiệu thêm câu kiến thức cần có.
- **P02 — sửa.** Nhãn thẻ là mã “LLO17 · CLO1”, “LLO18 · CLO1” và không nói nội dung; đổi thành “Mô hình hóa”, “Hình học đa diện”, “Quyết định theo chuỗi”. Thẻ thứ ba “so sánh … giải bằng Bellman” thay bằng sản phẩm đo được: giải bài toán đường đi theo tầng bằng phương trình Bellman. Ánh xạ LLO giữ trong ghi chú diễn giả. Ghi chú bài giảng không có mục mục tiêu riêng; không đổi.
- **P03 — sửa.** Tiêu đề “Bản đồ quyết định” không nói trang chứa gì; sơ đồ năm nút dồn thuật ngữ chưa giới thiệu (nghiệm cơ sở, đỉnh kề cải thiện, Bellman); vấn đề trung tâm viết thành câu hỏi. Tiêu đề mới “Vấn đề trung tâm”; khung nêu vấn đề dạng khẳng định; thêm hình tự vẽ `central-problem.svg` (đa diện có vô số điểm và năm đỉnh; đồ thị tầng có bốn đường đi) và hai thẻ nêu cấu trúc được khai thác, kèm giả thiết “miền có đỉnh”. Ghi chú diễn giả nêu số chuỗi $q^N$ và giả thiết đầy đủ. Ghi chú bài giảng: đoạn mở đầu thêm vấn đề trung tâm. CSS: giới hạn chiều cao hình của P03 để trang không vượt khung 16:9.

### Phần A

- **A01 — sửa.** Câu khung trừu tượng và không nối với vấn đề trung tâm; ba gạch đầu dòng trộn ví dụ với thành phần mô hình. Câu khung mới nêu lý do cần mô hình trước khi khai thác cấu trúc; ba gạch là ba thành phần có nhãn (biến quyết định, hàm mục tiêu, ràng buộc). Ghi chú diễn giả phân biệt dữ kiện và mô hình. Ghi chú bài giảng: đoạn mở phần A viết lại theo ba thành phần, bỏ lối “Ta bắt đầu…”.
- **A02 — sửa.** Bảng trộn dữ kiện với ràng buộc (ô ghi $x_1\le30$, cột giới hạn ghi “—”), làm A03 lặp lại; tiêu đề “Ví dụ hộp hạt” không nói bài toán gì. Tiêu đề mới “Bài toán sản xuất hộp hạt”; bảng chỉ chứa dữ kiện có đơn vị (lợi ích, giờ máy, sản lượng tối đa); khung nêu yêu cầu bài toán; nhận xét về quy hoạch nguyên chuyển vào ghi chú diễn giả. Ghi chú bài giảng: ví dụ mục 1 thêm bảng dữ kiện và câu yêu cầu trước mô hình. Màn hẹp: cột thứ tư bị cắt không có dấu cuộn; bọc mọi bảng của Bài 07 trong `.table-scroll` và giảm độ rộng tối thiểu của ô.
- **A03 — sửa.** Thẻ “Nguồn lực chung” không cho thấy hệ số $1,2$ từ đâu ra, người học phải nhớ bảng ở trang trước; thiếu điều kiện không âm. Mỗi thẻ nay tự nêu dữ kiện và đơn vị rồi viết bất phương trình (giờ máy, sản lượng tối đa, miền biến); câu mở nêu quy tắc cùng đơn vị. Ghi chú diễn giả giải thích đơn vị và đáp án. Ghi chú bài giảng: ví dụ mục 1 thêm câu về đơn vị của ràng buộc giờ máy.
- **A04 — sửa.** Hai điểm $(30,12)$, $(14,20)$ xuất hiện không rõ lý do; khoảng trống dẫn sang phần hình học chỉ có trong ghi chú; mô hình đầy đủ chưa hiện trọn trên trang nào. Tiêu đề mới “Hàm mục tiêu và so sánh phương án”; trang hiện mô hình đầy đủ một dòng; bảng thêm cột giờ máy để thấy lý do khả thi; khung nêu “so sánh vài điểm chưa chứng minh được điểm nào tối ưu”. Ghi chú diễn giả nêu hai điểm là giao của đường giờ máy với giới hạn sản lượng. Ghi chú bài giảng: ví dụ mục 1 thêm điểm $(14,20)$ và câu nêu khoảng trống.
- **A05 — sửa.** Trang không cho thấy bài hộp hạt là một trường hợp của dạng tổng quát; thẻ “Đầu ra” dùng “kết cục” (định nghĩa ở phần C); tên tiếng Anh của LP chưa nêu. Định nghĩa nay nêu “linear programming, LP” và kích thước $c,A,b$; thẻ ví dụ ánh xạ hộp hạt thành $c,A,b$ với $n=2$, $m=3$; thẻ “Không phải LP” giữ ranh giới. Đầu vào/đầu ra chuyển vào ghi chú diễn giả. Ghi chú bài giảng: thêm tên tiếng Anh và đoạn ánh xạ hộp hạt thành $(\mathbf c,\mathbf A,\mathbf b)$.
- **A07 — sửa.** Trang cao 737px, vượt khung 16:9; bước trực quan không có trên trang; câu “ta đưa bài toán về LP”. Tiêu đề mới “Hồi quy chuẩn $L_1$ dưới dạng LP”; hai dòng có nhãn **Nhu cầu** và **Trực quan** ($|r|=\min\{t: t\ge r,\ t\ge-r\}$) đặt cạnh hình; mô hình LP gộp một dòng; ví dụ rút gọn. Hình `l1-residual-slack.svg` vẽ lại: tô vùng $t\ge|r|$, mũi tên “giảm t” dừng tại $t=|r|$, bỏ chữ tiếng Anh “Miền epigraph” và nhãn bị nét che. Ghi chú diễn giả nêu số liệu ngoại lai ($10$ so với $100$), lý do tương đương và lời giải ví dụ. Ghi chú bài giảng mục 2: đoạn trực quan và alt của hình viết lại theo hình mới. Trang nay cao 679px.
- **A08 — sửa.** Đề cho sẵn các bất phương trình nên người học chỉ chép lại; thiếu đơn vị, trái với yêu cầu chính của phần A. Đề mới cho dữ kiện bằng lời có đơn vị (lợi ích, phút GPU, số nghìn yêu cầu tối đa); bốn bước yêu cầu tự nêu biến, viết mục tiêu, ràng buộc và kiểm $(4,6)$. Đáp số không đổi ($z=46$). Ghi chú bài giảng: câu hỏi kiểm tra mục 1 dùng đề mới.
- **Danh sách thuật toán — sửa CSS.** Lớp `.algorithm` có cỡ chữ $0{,}72$em (dưới ngưỡng $0{,}75$em) và số thứ tự nằm ngoài nền do quy tắc `.reveal ol` của chủ đề thắng độ ưu tiên. Nâng cỡ lên $0{,}94$ lần (≈$0{,}75$em), tăng độ ưu tiên thành `.reveal .algorithm` và đặt lề trái trong nền. Đã kiểm A08, B06, B07, C08, C10, C11, D05 ở hai kích thước: không trang nào vượt khung.

### Phần B

- **B01 — sửa.** Câu khung trừu tượng, không nối với khoảng trống của A04; tiêu đề “Dạng chuẩn và đa diện” ngược thứ tự trình bày. Tiêu đề mới “Đa diện và dạng chuẩn”; câu nhu cầu nêu “so sánh từng phương án không chứng minh được tối ưu; cần nhìn toàn bộ miền và tính được các đỉnh”; ba gạch có nhãn (đa diện, dạng chuẩn, nghiệm cơ sở khả thi). Ghi chú bài giảng: đoạn mở phần B viết lại theo nhu cầu và ánh xạ mục 3–5.
- **B02 — sửa.** Hình có nhãn chồng lên nét (“mức 72”, “(14,20)”, “x2”); “đường mức” chưa được giải thích; gạch “đường mức cuối chạm tại $(30,12)$” mơ hồ. Vẽ lại `polyhedron-level-sets.svg`: đường mức $z=60$ đi qua hai đỉnh $(30,0)$, $(0,20)$ thay cho $z=72$, đường $z=96$ chỉ chạm đỉnh $(30,12)$, chỉ số dưới bằng `tspan`, không nhãn nào bị nét che. Ba gạch nêu đủ năm nửa không gian, định nghĩa đường mức và hướng tịnh tiến $(2,3)$, kết luận có số $z=96$. Ghi chú bài giảng mục 3: đoạn trực quan và alt hình viết lại theo hình mới.
- **Tái kiểm phần P–A.** Hai tác tử `fork` chỉ đọc (kế thừa Claude Opus 5.5, effort high), tại commit `0539e9d`: tái kiểm toán học **PASS có điều kiện** (1 trung bình, 6 nhẹ; mọi số liệu P00–A08 tính lại khớp); tái kiểm mạch và góc nhìn sinh viên **PASS có điều kiện** (3 trung bình, 6 nhẹ). Đã xử lý:
  - trung bình | A05, A04, ghi chú bài giảng mục 1 | thứ tự hàng $A,b$ (giờ máy ở hàng 1) ngược với B05/B07 → $A=[1\ 0;0\ 1;1\ 2]$, $b=(30,20,54)^T$; mô hình A04 liệt kê $x_1\le30$, $x_2\le20$, giờ máy; thẻ A03 đổi thứ tự; ghi chú nêu “hàng thứ ba là giờ máy”. **Đã đóng.**
  - trung bình | A03, A04, P01 | “khả thi”, “miền khả thi” dùng trước khi định nghĩa → câu mở A03 định nghĩa; ghi chú bài giảng mục 1 thêm định nghĩa. **Đã đóng.**
  - trung bình | A08→B01 | B01 không kế thừa khoảng trống của A04 → đã xử lý ở commit sửa B01 (báo cáo đọc bản trước đó). **Đã đóng.**
  - nhẹ | P03 | “chi phí còn lại” chưa giải nghĩa → “chi phí nhỏ nhất từ một nút đến đích”. **Đã đóng.**
  - nhẹ | A04 | nguồn gốc hai điểm → cột “Giờ máy dùng”; lý do giao điểm giữ trong ghi chú diễn giả. **Đã đóng.**
  - nhẹ | A07, P01 | kiểu $t_i$ lệch giữa trang, ghi chú và kế hoạch → $t_i\ge0$, ghi chú nêu điều kiện tự thỏa. **Đã đóng.**
  - nhẹ | A07 | thiếu tên tiếng Anh “outlier” và vị trí không khả vi → bổ sung trên trang và ghi chú bài giảng. **Đã đóng.**
  - nhẹ | A07 | ví dụ không nối với $a_i,b_i$ → ghi chú diễn giả nêu $n=1$, $a_1=a_2=1$, $b=(1,3)$. **Đã đóng.**
  - nhẹ | A05 (ghi chú) | phép đưa về $Ax\le b$ thiếu trường hợp phương trình → thêm “thay mỗi phương trình bằng hai bất phương trình”. **Đã đóng.**
  - nhẹ | ghi chú bài giảng, đoạn ký hiệu | $m\le n$ dễ nhầm với $m=3>n=2$ của ví dụ → nêu rõ chỉ áp dụng cho dạng chuẩn. **Đã đóng**; phần B nêu ma trận $3\times5$.
  - nhẹ | ghi chú P03, ghi chú bài giảng mở đầu | câu tương phản phủ định (no-ai-slop) → viết khẳng định “khai thác cấu trúc theo giai đoạn, độc lập với hình học đa diện”. **Đã đóng.**
  - nhẹ | ghi chú bài giảng mở đầu | dùng lẫn “đỉnh”, “điểm cực” → “đỉnh (điểm cực)”. **Đã đóng.**
  - nhẹ | storyboard A01, A03, A05, A08 | chưa phản ánh lượt sửa → thêm “Sửa (2026-10-03)”. **Đã đóng.**
  - nhẹ | P02 | “kết cục” dùng trước định nghĩa → **không sửa**: trang mục tiêu nêu tên sản phẩm học tập, thuật ngữ được định nghĩa ở phần C.
- **B03 — sửa.** “Bị chặn” định nghĩa bằng lời mơ hồ; không có ví dụ đa diện không bị chặn; thiếu cầu nối sang dạng chuẩn. Định nghĩa nay nêu tên tiếng Anh và kích thước $A,b$; gạch thứ hai định nghĩa bị chặn bằng $\|x\|\le K$ kèm ví dụ bị chặn/không bị chặn; gạch thứ ba nêu $\{x:Ax=b,\ x\ge0\}$ cũng là đa diện. Ghi chú bài giảng mục 3: thêm tên tiếng Anh, định nghĩa bị chặn, ví dụ và câu về tập dạng chuẩn.
- **B04 — sửa.** Trang không nêu vì sao cần dạng chuẩn; khung $\min\to\max$ lặp P01; các phép chuyển tổng quát nằm rải ở B05. Thêm dòng **Nhu cầu** (đỉnh là giao của các ràng buộc chặt, tính bằng hệ phương trình); quy ước nêu tên tiếng Anh; bảng ba phép chuyển (biến phụ, biến dư, tách biến tự do). Phép đổi chiều và ý nghĩa giả thiết hạng chuyển vào ghi chú diễn giả. Ghi chú bài giảng mục 4: thêm đoạn nhu cầu và tên tiếng Anh của biến phụ, biến dư.
- **B05 — sửa.** Dòng “Hai phép đổi khác” trùng B04; chưa có ma trận dạng chuẩn $3\times5$ (tái kiểm toán P–A nêu $m\le n$ dễ nhầm); ý nối sang nghiệm cơ sở chưa nói ra. Tiêu đề mới “Dạng chuẩn của bài hộp hạt”; hệ phương trình đặt cạnh $A\in\mathbb R^{3\times5}$, $b$ và hạng; khung nêu hai biến phụ bằng $0$ ứng với hai ràng buộc chặt cắt nhau tại đỉnh $(30,12)$. Ghi chú bài giảng mục 4: thêm câu ràng buộc chặt và ma trận $[\mathbf A_0\ \mathbf I]$.
- **Lưới ở màn hẹp — sửa CSS.** Phần tử con của `.grid2`, `.grid3`, `.responsive` giữ độ rộng tối thiểu theo nội dung, nên ma trận rộng bị cắt mà không hiện dấu cuộn. Thêm `min-width:0` cho các phần tử con; A05 đặt lại tỉ lệ cột để không xuống dòng ở khung rộng. Đã kiểm lại P03, A03, A05, A07, B02, B05.
- **B06 — sửa.** Thiếu bước trực quan; chưa có nhãn “Định nghĩa” và tên tiếng Anh; danh sách trộn điều kiện với bước tính. Thêm dòng **Trực quan** (cho $n-m$ biến bằng $0$, giải hệ vuông); **Định nghĩa** tách hai điều kiện, rồi nêu nghiệm cơ sở và BFS (basic feasible solution); khung suy biến nêu tên tiếng Anh. Ghi chú diễn giả phân biệt hạng, khả nghịch và khả thi. Ghi chú bài giảng mục 5: trực quan nối với hai ràng buộc chặt của bài hộp hạt; thêm “degenerate”.
- **B07 — sửa.** Đề dựa vào hệ ở trang trước mà không nhắc lại; cho sẵn $A_B$ nên người học không tự chọn cột; chỉ có trường hợp khả thi. Đề mới tự nêu hệ dạng chuẩn; (a) $B=\{1,2,4\}$ yêu cầu tự viết $A_B$ và xác định đỉnh; (b) $B=\{1,2,5\}$ cho nghiệm cơ sở $s_3=-16<0$, ứng với điểm $(30,20)$ ngoài miền. Ghi chú diễn giả có đáp án hai phần. Ghi chú bài giảng mục 5: câu hỏi kiểm tra thêm phần (b).

### Phần C

- **C01 — sửa.** Câu khung trừu tượng, không nêu khoảng trống từ phần B. Câu nhu cầu mới: hình hai chiều gợi ý đỉnh tối ưu, nhưng trong nhiều chiều cần định nghĩa đỉnh và chứng minh khi nào có đỉnh tối ưu; ba gạch có nhãn (điểm cực, điểm cực và BFS, bảo đảm). Ghi chú bài giảng: đoạn mở phần C viết lại theo nhu cầu và ánh xạ mục 6–9, bỏ lối “ta xác định”.
- **C02 — sửa.** Trang mở thẳng bằng định nghĩa tổ hợp lồi, không có trực quan hay ví dụ; khung “đoạn thẳng không tầm thường” khó hiểu. Tiêu đề mới “Điểm cực”; thêm dòng **Trực quan**; hình tự vẽ `extreme-point-def.svg` trên miền hộp hạt: đỉnh $(30,12)$ là điểm cực, $(30,6)=\tfrac12(30,0)+\tfrac12(30,12)$ và một điểm trong không phải; định nghĩa nêu tên tiếng Anh. Ghi chú bài giảng mục 6: trực quan viết lại theo ví dụ, hình đổi từ `lp-four-statuses.svg` sang hình mới.
- **Tái kiểm phần B.** Hai tác tử `fork` chỉ đọc (kế thừa Claude Opus 5.5, effort high), tại commit `91a65ec`: tái kiểm toán học **PASS có điều kiện** (1 trung bình, 6 nhẹ; mọi số liệu B01–B07 và tọa độ SVG tính lại khớp); tái kiểm mạch và góc nhìn sinh viên **PASS có điều kiện** (4 trung bình, 4 nhẹ). Đã xử lý:
  - trung bình | B04, ghi chú bài giảng mục 4 | “đỉnh là giao của các ràng buộc chặt” không chính xác (giao có thể là một cạnh) → trang viết “mỗi đỉnh là nghiệm duy nhất của một nhóm ràng buộc lấy dấu bằng”; ghi chú diễn giả và ghi chú bài giảng nêu “$n$ ràng buộc độc lập; trong mặt phẳng: hai đường biên cắt nhau”. **Đã đóng.**
  - trung bình | B05, ghi chú bài giảng mục 4–5 | chữ $A$ chỉ cả ma trận $3\times2$ và $3\times5$ → B05 dùng $\bar A=[A\ I]$ và nêu thành phần; ghi chú bài giảng dùng $\bar{\mathbf A}$ ở mục 4 và nêu rõ quy ước ở ví dụ mục 5. **Đã đóng.**
  - trung bình | C01 | không kế thừa kết quả B → đã xử lý ở commit sửa C01. **Đã đóng.**
  - trung bình | C02 | thiếu trực quan và hình → đã xử lý ở commit sửa C02. **Đã đóng.**
  - nhẹ | ghi chú B03 | “ở trang sau” → câu khẳng định không chỉ vị trí. **Đã đóng.**
  - nhẹ | B02 | “nửa không gian” chưa giải nghĩa → ghi chú diễn giả định nghĩa $\{x:a^Tx\le\beta\}$. **Đã đóng.**
  - nhẹ | B06 | suy biến không có ví dụ → ghi chú diễn giả thêm ví dụ $x_1+x_3=1$, $x_2+x_4=0$. **Đã đóng.**
  - nhẹ | storyboard B01–B04, B06 | chưa ghi lượt sửa → bổ sung. **Đã đóng.**
  - nhẹ | ghi chú bài giảng mục 5 | thiếu điều kiện hai đường cắt nhau → thêm “$\mathbf A_B$ khả nghịch”. **Đã đóng.**
  - nhẹ | B03 | ví dụ thiếu $\mathbb R^2$ → bổ sung. **Đã đóng.**
  - nhẹ | ghi chú bài giảng mục 4 | vế phải $b$ trùng ký hiệu véc-tơ → $\beta$. **Đã đóng.**
  - nhẹ | B04 | chưa khai báo $b,c$ → bổ sung. **Đã đóng.**
  - nhẹ | ghi chú A05 | thiếu đổi dấu mục tiêu → bổ sung. **Đã đóng.**
  - nhẹ | `polyhedron-level-sets.svg` | nhãn “z = 60” xa nét đứt → đặt sát phía trên nét. **Đã đóng**; nhãn “(14,20)” giữ dưới cạnh nghiêng vì vị trí gần hơn sẽ chạm cạnh.
  - nhẹ | ghi chú bài giảng mục 4 | câu tương phản (no-ai-slop) → viết khẳng định “phép bỏ tọa độ biến phụ là song ánh”. **Đã đóng.**
- **C03 — sửa.** Tiêu đề “Đặc trưng đại số” chung chung; định lý không kèm ví dụ nên không thấy nối với phần B; ý chứng minh vắng. Tiêu đề mới “Điểm cực và nghiệm cơ sở khả thi”; định lý nêu kích thước $A$; dòng **Hệ quả** thêm “$P$ có hữu hạn điểm cực” (dùng ở C06); khung ví dụ áp dụng cho $x=(30,12,0,8,0)$. Ghi chú diễn giả có ý tưởng hai chiều chứng minh. Ghi chú bài giảng mục 7: hệ quả thêm tính hữu hạn.
- **C04 — sửa.** Ví dụ hình học không có hình; dạng $\min -x_1-x_2$ thêm dấu trừ không cần thiết; tiêu đề có chữ “Ví dụ”. Tiêu đề mới “Nhiều nghiệm tối ưu”; đổi sang $\max x_1+x_2$ (cùng tập nghiệm, giá trị tối ưu $2$); hình tự vẽ `multiple-optima.svg` (tam giác, cạnh tối ưu, $(1,1)$ là trung điểm); ba gạch nêu điểm cực, cạnh tối ưu, $(1,1)=\tfrac12(2,0)+\tfrac12(0,2)$. Ghi chú bài giảng mục 6: ví dụ đổi sang dạng cực đại và thêm hình.
- **C05 — sửa.** Thiếu nhu cầu và phản ví dụ; “chứa đường thẳng” chưa định nghĩa; công thức cuối trang là một bước chứng minh đặt riêng, khó đọc. Thêm dòng **Nhu cầu** với phản ví dụ nửa mặt phẳng $\{x_2\ge0\}$; dòng **Định nghĩa** “chứa đường thẳng”; bảng định lý–hệ quả giữ nguyên; công thức thay bằng khung nêu lý do của hệ quả. Ghi chú bài giảng mục 8: thêm đoạn nhu cầu và phản ví dụ.
- **C06 — sửa.** “Kề” dùng mà chưa định nghĩa; tên “Bổ đề cầu nối” không nói nội dung; không có ví dụ áp dụng. Thêm dòng **Định nghĩa** (hai điểm cực kề nhau khi đoạn nối là một cạnh); bổ đề đổi tên “đỉnh kề cải thiện” và rút gọn bằng “với cùng giả thiết”; thêm ví dụ tại $(30,12)$: hai đỉnh kề có $z=60,88<96$ nên $(30,12)$ tối ưu. Ghi chú diễn giả nêu bổ đề là phản đảo của tiêu chuẩn dừng. Ghi chú bài giảng mục 9 đã có định nghĩa kề và ví dụ tương ứng; không đổi.
- **C07 — sửa.** Trang chỉ có hình, không nói vì sao cần phân loại; hình có nhãn “một điểm” đè lên cạnh, hai ô tối ưu không vẽ hướng mục tiêu. Thêm câu dẫn: định lý điểm cực tối ưu cần giá trị hữu hạn, mỗi LP rơi vào đúng một trong bốn kết cục. Vẽ lại `lp-four-statuses.svg`: ô không khả thi dùng $x_2\ge2$ và $x_2\le1$; ô không bị chặn có véc-tơ $c$ và đường mức; ô tối ưu duy nhất có đường mức chạm một đỉnh; ô nhiều nghiệm có cạnh vuông góc với $c$. Ghi chú diễn giả thêm ví dụ một biến và nhận xét “miền không bị chặn chưa kéo theo mục tiêu không bị chặn”. Ghi chú bài giảng mục 8: alt hình viết lại.
- **C08 — sửa.** Tiêu đề “Mô tả thuật toán ở mức ý niệm” dài; thiếu câu nối với bổ đề; thiếu lý do dừng hữu hạn; khung ví dụ lặp chuỗi số của C09. Tiêu đề mới “Thuật toán đi qua đỉnh kề”; câu mở nêu quy trình suy ra từ bổ đề; thuật toán ghi bằng $v\leftarrow w$ với đầu vào, điều kiện dừng và đầu ra; khung nêu lý do dừng sau hữu hạn bước. Ghi chú bài giảng mục 9: trực quan viết lại, thêm lý do dừng hữu hạn, bỏ lối “ta đi”.
- **C09 — sửa.** Hình `conceptual-vertex-walk.svg` lỗi: đầu mũi tên phóng theo độ dày nét nên quá to và đè lên nhãn $(30,0)$; trang không nêu bài toán và không có bước kiểm dừng. Vẽ lại hình cùng hệ tọa độ với hình đa diện, mũi tên dùng `markerUnits="userSpaceOnUse"`, ghi $z$ ở cả năm đỉnh; câu mở nêu mô hình và đỉnh xuất phát; ba gạch có nhãn Bước 1, Bước 2, Dừng (hai đỉnh kề có $z=60,88<96$). Ghi chú diễn giả nêu đường đi khác qua $(0,20)$. Ghi chú bài giảng mục 9: alt hình viết lại.
- **C10 — sửa.** Tiêu đề dùng từ quy trình “chuyển giao”, không nói nội dung; đề cho sẵn bốn đỉnh. Tiêu đề mới “Bài tập về điểm cực và đỉnh kề”; bốn yêu cầu bắt đầu bằng vẽ miền và tự xác định đỉnh. Ghi chú diễn giả nêu cách tìm đỉnh $(1{,}6;1{,}2)$. Ghi chú bài giảng mục 9: thêm bài tập cùng đề, lời giải trong khối `solution`.
- **C11 — sửa.** Đề “với bài hộp hạt, hãy hoàn tất chuỗi lập luận” dựa vào dữ kiện ở các trang trước và lặp đáp án đã có; tiêu đề dùng từ quy trình “tích hợp”. Tiêu đề mới “Bài tập tổng hợp quy hoạch tuyến tính”; đề tự nêu miền và năm đỉnh; lợi ích loại 2 đổi thành $4$, nên $z=2(x_1+2x_2)$ song song ràng buộc giờ máy: giá trị $108$ đạt trên cả cạnh $(30,12)$–$(14,20)$, và thuật toán dừng tại $(30,12)$ vì $(14,20)$ không cải thiện nghiêm ngặt. Ghi chú diễn giả có đáp án đầy đủ. Ghi chú bài giảng mục 9: thêm bài tập tổng hợp và lời giải. Outline: thêm dữ kiện C11.

### Phần D

- **D01 — sửa.** Trang không nêu nhu cầu của phần mới; hai thẻ dùng “trạng thái”, “bài toán con”, “cơ sở” trước khi định nghĩa; câu ghi chú dạng tương phản phủ định. Khung mới nêu bài toán chuỗi quyết định và số chuỗi $q^N$; hai thẻ so sánh bằng lời (đỉnh của đa diện; chi phí tốt nhất từ mỗi tình huống, tính một lần); dòng phạm vi nói bằng lời thường; DP có tên tiếng Anh; tiêu đề rút thành “Quy hoạch động” (phạm vi hữu hạn tất định nêu ở dòng phạm vi) để trang không vượt khung. Ghi chú bài giảng: đoạn mở phần D thêm nhu cầu $q^N$ và tên tiếng Anh.
- **D02 — sửa.** Sơ đồ bốn ô trừu tượng lặp nhu cầu của D01; “trạng thái” và “bài toán con” chưa được định nghĩa. Tiêu đề mới “Trạng thái và bài toán con”; hình `dp-state-sufficiency.svg` (sửa chữ tràn khỏi hình tròn, tiêu đề hình ngắn hơn) đặt cạnh dòng **Trực quan** và định nghĩa trạng thái (state); khung định nghĩa bài toán con. Ghi chú diễn giả nêu khi nào nút không còn là trạng thái đủ. Ghi chú bài giảng mục 10: hình minh họa trực quan đổi sang hình trạng thái.
- **D03 — sửa.** Trang chỉ có hình đã tô sẵn đáp án, phép tính nằm hết trong ghi chú diễn giả; hình cũ đặt hai nhãn chi phí “2”, “1” tại chỗ hai cạnh cắt nhau và vẽ trùng cạnh A–D. Sinh lại ba hình từ cùng bộ tọa độ: `dp-layered-graph.svg` (chỉ chi phí), `dp-bellman-values.svg` (thêm $J$ và đường tối ưu), `dp-layered-graph-new-costs.svg` (hai chi phí mới cho D06); nhãn cạnh chéo đặt gần nút trái. Tiêu đề mới “Đường đi ngắn nhất theo tầng”; câu mở định nghĩa $J(v)$; phép tính ngược bốn dòng đặt cạnh hình; khung nêu đường tối ưu. Ghi chú bài giảng mục 11: hình đổi sang hình có giá trị $J$.
- **D04 — sửa.** Ký hiệu $x_k,u,U_k,f_k,g_k$ xuất hiện dồn dập, không nối với ví dụ đồ thị tầng; $J_k$ chưa được nói là gì trước công thức; thiếu nhãn định lý. Tiêu đề mới “Phương trình Bellman”; dòng **Mô hình** nêu đủ thành phần; **Định lý** định nghĩa $J_k$ rồi nêu phương trình; khung ánh xạ ký hiệu sang đồ thị tầng. Ghi chú diễn giả nêu ý nghĩa, lý do (nguyên lý tối ưu) và vì sao min đạt. Ghi chú bài giảng mục 10–11 đã có các thành phần này; không đổi.
- **D05 — sửa.** “Chính sách” dùng mà chưa định nghĩa; chưa nói cách dựng đường tối ưu từ điều khiển đã lưu; công thức đếm phép tính không so với số chuỗi. Thuật toán nêu đầu vào cụ thể, bước khởi tạo theo từng $x\in X_N$, đầu ra định nghĩa chính sách (policy) và lượt dựng xuôi; khung so sánh cỡ $Nq^2$ phép tính với $q^N$ chuỗi. Ghi chú diễn giả có chính sách của ví dụ, trường hợp nhiều điều khiển cùng đạt min và số liệu $q=2$, $N=20$. Ghi chú bài giảng mục 12–13 đã có các nội dung này; không đổi.
- **D06 — sửa.** Đề “giữ đồ thị ví dụ đường đi theo tầng nhưng đổi…” buộc người học lật lại trang trước; tiêu đề có từ quy trình “chuyển giao”; bảng ba dòng không thêm thông tin. Tiêu đề mới “Bài tập giải ngược Bellman”; đề tự đủ với hình `dp-layered-graph-new-costs.svg` (hai chi phí mới tô màu); bốn yêu cầu theo thứ tự tầng và lượt xuôi. Ghi chú diễn giả thêm kiểm trực tiếp $3+1+0=4$ và so sánh với đường cũ. Ghi chú bài giảng mục 12: thêm hình trước câu hỏi kiểm tra.

### Phần Z

- **Z01 — sửa.** Tiêu đề “Điều kiện cần giữ và cầu nối” mơ hồ; bảng thiếu dòng quy hoạch động; giả thiết dòng điểm cực ghi “khả thi, giá trị hữu hạn”, thiếu “miền có điểm cực”; khung cuối không trả lời vấn đề trung tâm của P03. Tiêu đề mới “Tổng kết”; bảng bốn dòng (mô hình hóa, dạng chuẩn, điểm cực, quy hoạch động) với giả thiết đủ; khung trả lời vấn đề trung tâm. Ghi chú diễn giả tóm chuỗi lập luận và giới hạn áp dụng. Ghi chú bài giảng, mục Tóm tắt: hai gạch cuối viết lại theo kết luận mới.
- **Z02 — sửa.** Dòng “Thu hồi DP” lặp Z01 và dùng từ quy trình; khung chuyển tiếp dùng “chọn cơ sở kề, cập nhật cơ sở” mà không nối với khái niệm đã học. Bỏ dòng thu hồi; khung Bài 08 nêu phương pháp đơn hình thực hiện thuật toán đi qua đỉnh kề bằng đại số (mỗi đỉnh là một BFS, bước sang đỉnh kề là đổi một cột cơ sở). Ghi chú diễn giả viết lại tương ứng. Ghi chú bài giảng: mục Tài liệu tham khảo không đổi.
- **Tái kiểm phần C.** Hai tác tử `fork` chỉ đọc (kế thừa Claude Opus 5.5, effort high): tái kiểm toán học tại `224649a` **PASS có điều kiện** (2 trung bình, 6 nhẹ; mọi số liệu C03–C11 và tọa độ bốn hình tính lại khớp); tái kiểm mạch và góc nhìn sinh viên tại `f48fef3` **PASS có điều kiện** (3 trung bình, 7 nhẹ). Đã xử lý:
  - trung bình | C06→C07→C08 | trang bốn kết cục chen giữa bổ đề và thuật toán → đặt bốn kết cục trước định lý và đổi mã: **C06 nay là “Bốn kết cục”, C07 là “Điểm cực tối ưu và đỉnh kề”**; câu dẫn bốn kết cục nêu cần biết bài toán có nghiệm tối ưu; outline và storyboard đổi thứ tự và tham chiếu mã. **Đã đóng.**
  - trung bình | C02, C07–C11 | “đỉnh” và “điểm cực” dùng lẫn mà chưa nói là một → định nghĩa ghi “extreme point, gọi tắt là đỉnh”; ghi chú bài giảng mục 6 tương ứng. **Đã đóng.**
  - trung bình | C04→C05 | ranh giới thiếu câu nối → nhu cầu C05: “kết luận ‘có điểm cực tối ưu’ chỉ có nghĩa khi miền có điểm cực”. **Đã đóng.**
  - trung bình | hình bốn kết cục | miền “không bị chặn” vẽ thành tam giác đóng → bỏ viền phải, hai biên là tia có mũi tên. **Đã đóng.**
  - trung bình | ghi chú C10, outline | “$(1{,}6,1{,}2)$” đọc như bốn thành phần → “$(1{,}6;\,1{,}2)$” ở mọi chỗ. **Đã đóng.**
  - nhẹ | bốn kết cục | câu dẫn chỉ vị trí “hai kết cục dưới” và thiếu giả thiết có điểm cực → câu dẫn mới; giả thiết đầy đủ trong ghi chú. **Đã đóng.**
  - nhẹ | C07, C09 | ví dụ bổ đề lặp bước kiểm dừng của C09 → ví dụ chiều thuận tại $(30,0)$. **Đã đóng.**
  - nhẹ | C03 | thiếu nhu cầu → thêm dòng **Nhu cầu**. **Đã đóng.**
  - nhẹ | C11 | bước “viết dạng chuẩn” lặp B05 → bỏ. **Đã đóng.**
  - nhẹ | C08 | hữu hạn điểm cực mới phát biểu cho dạng chuẩn → ghi chú nêu lý do cho mọi đa diện. **Đã đóng.**
  - nhẹ | ghi chú C04, C07 | phát biểu cạnh tối ưu và nón tiếp xúc chưa chuẩn → sửa; “phép xoay cơ sở (pivot)” ở lần đầu. **Đã đóng.**
  - nhẹ | ghi chú C02 | `<` trần trong HTML → `&lt;`. **Đã đóng.**
  - nhẹ | ghi chú C01, C09 | câu tương phản phủ định (no-ai-slop) → viết khẳng định. **Đã đóng.**
  - nhẹ | storyboard C05, C08, C09, outline vai trò C07 | lỗi thời → cập nhật. **Đã đóng.**
  - nhẹ | C11→D01 | ranh giới sang DP → đã xử lý ở commit sửa D01. **Đã đóng.**
