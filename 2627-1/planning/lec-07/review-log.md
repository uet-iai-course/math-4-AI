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
