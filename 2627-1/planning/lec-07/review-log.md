# Nhật ký rà soát Bài giảng 07

## Trạng thái

**Cập nhật 2026-10-12:** deck có 53 trang, 6 mạch, trang tiêu đề mạch A01, B01, C01, D01, Z00; xem mục “2026-10-12 — Văn phong và mật độ theo MAT1101, trang tiêu đề mạch” cuối tệp. Đoạn dưới đây mô tả trạng thái trước đợt sửa.

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

### Tái kiểm cuối và kiểm định bàn giao

- **Tái kiểm toán học D–Z (kèm C06–C07 sau đổi thứ tự).** Tác tử `fork` chỉ đọc (kế thừa Claude Opus 5.5, effort high), tại HEAD `1550646`–`7e81083`: **PASS** (8 nhẹ; cả hai bộ giá trị $J$, $q^N$, $Nq^2$, $80$ so với $2^{20}$, tọa độ ba hình đồ thị tầng tính lại khớp). Đã xử lý:
  - nhẹ | Z01 | dòng quy hoạch động thiếu “tất định” → bổ sung. **Đã đóng.**
  - nhẹ | Z02 | “bước sang đỉnh kề là đổi một cột cơ sở” sai khi suy biến → “mỗi bước đổi một cột cơ sở (khi không suy biến, bước đó sang một đỉnh kề)”. **Đã đóng.**
  - nhẹ | D05 | đầu vào thiếu $x_0$ → bổ sung. **Đã đóng.**
  - nhẹ | D03 | thiếu điều kiện biên $J(t)=0$ trên mặt trang → bổ sung ở câu mở. **Đã đóng.**
  - nhẹ | ghi chú D04 | lý do mới một chiều → thêm chiều ghép lựa chọn với đuôi tối ưu. **Đã đóng.**
  - nhẹ | alt D02 | “ba lịch sử” dễ hiểu sai → “các lịch sử, ví dụ…”. **Đã đóng.**
  - nhẹ | ghi chú D06 | từ quy trình “chuyển giao” → bỏ. **Đã đóng.**
  - nhẹ | ghi chú bài giảng mục 10–12 | “Chủ đề 10” và ngôi “ta” → “mục 10”, câu bị động hoặc “cần”. **Đã đóng.**
  - nhẹ | ghi chú D01 | câu tương phản phủ định (no-ai-slop) → câu khẳng định. **Đã đóng.**
- **Tái kiểm mạch toàn bài và góc nhìn sinh viên** (bắt buộc vì mở bài và kết luận đổi). Tác tử `fork` chỉ đọc (kế thừa Claude Opus 5.5, effort high), tại `7e81083`: **PASS có điều kiện** (1 trung bình, 8 nhẹ). Vấn đề trung tâm của P03 được A–D xây dựng và Z01 trả lời; mọi ranh giới mạch nêu kết quả kế thừa và khoảng trống; hành trình khái niệm đủ bước; 37 mã trong deck, outline và storyboard trùng tập và thứ tự. Đã xử lý:
  - trung bình | C03 | ví dụ dựa vào thứ tự cột của phần B mà không nhắc lại → khung nêu thứ tự biến và ba cột dương; định lý viết (i)–(iii) trong một đoạn để trang không vượt khung. **Đã đóng.**
  - nhẹ | C07 | cần biết $(30,0)$ kề $(30,12)$ → “nối bởi cạnh $x_1=30$”. **Đã đóng.**
  - nhẹ | C07 | “cạnh” chưa định nghĩa trong nhiều chiều → “cạnh (mặt một chiều)”. **Đã đóng.**
  - nhẹ | D01→D02 | “tình huống” và “trạng thái” chưa nối → thẻ DP ở D01 ghi “tình huống (trạng thái)”. **Đã đóng.**
  - nhẹ | C08 | “cho ngay một quy trình” khẩu ngữ → “dẫn tới quy trình sau”. **Đã đóng.**
  - nhẹ | storyboard dòng bản đồ cụm điểm cực | mô tả C08–C09 lỗi thời, thiếu C11 → cập nhật. **Đã đóng.**
  - nhẹ | ghi chú D01, D06, ghi chú bài giảng mục 11 | trùng với báo cáo toán → đã đóng ở trên.
  - ngoài phạm vi | A05, B03 | tiêu đề “Định nghĩa …” không cùng kiểu với C02 “Điểm cực” → **giữ**: B03 đổi thành “Đa diện” sẽ trùng gần với B01, B02; không ảnh hưởng mạch.
- **Kiểm trình duyệt toàn bài.** Playwright Chromium qua `python3 -m reloadserver 8765`, đủ 37 trang tại 1600×900 và 390×844 (chụp cả khi cuộn tới cuối vùng đọc hẹp): không lỗi JavaScript hoặc trang, không `.katex-error`, không tràn ngang tài liệu; trang cao nhất ở khung 16:9 là 681px (D03), dưới 720px; cỡ chữ thân bài không dưới $0{,}75$em; ArrowRight điều hướng đúng. Ở khung hẹp, công thức và bảng rộng cuộn ngang trong vùng có dấu “↔”.
- **Trình xem ghi chú bài giảng.** `material-viewer.html?doc=materials/lec-07/lecture-note.md&deck=lecture-07-quy-hoach-tuyen-tinh-va-dong.html`: 582 nút KaTeX, không `.katex-error`, 16 hình Bài 07 đều tải, hai khối lời giải thu gọn. Lỗi CSP duy nhất trên bảng điều khiển là script tự tải lại do `reloadserver` chèn; Bài 06 cho cùng lỗi, không thuộc Bài 07.
- **Chỉ mục.** `index.html` có thẻ Bài 07 với liên kết bài giảng và ghi chú bài giảng; không liên kết tới `planning/`.

## 2026-10-09 — Bổ sung ghi chú diễn giả cho sinh viên tự đọc

Người dùng phản ánh sinh viên thấy trang chiếu thiếu dẫn dắt, thiếu ngữ cảnh, thông tin bị cắt cụt, và yêu cầu bổ sung ghi chú diễn giả (phím S) cho mọi trang của Bài 01–07. Phạm vi lượt này: chỉ nội dung bên trong `<aside class="notes">` của 37 trang; mặt trang (kể cả hộp "Bài 08" ở cuối deck), cấu trúc section, `data-slide-id`, storyboard và dàn ý không đổi. Mỗi ghi chú viết lại theo bốn phần: dẫn dắt, diễn giải đủ ký hiệu, công thức, hình, bảng và lời giải câu hỏi, điểm dễ nhầm, kết nối trang sau bằng quan hệ suy luận; giữ quy ước `<p class="note-source">` và các nhãn "Ý tưởng/Các bước/Điểm dùng giả thiết" của deck. Ghi chú không hứa thời điểm giảng dạy phương pháp đơn hình, chỉ nêu quan hệ nội dung.

### Tác tử và quyết định của điều phối viên

Điều phối viên: Claude Fable 5.1 (`claude-fable-5-1`, effort medium). Tác tử con tạo bằng Agent tool, `subagent_type=general-purpose`, `model=opus` (Claude Opus 5.5), `effort=high`; chỉ một tác tử ghi tệp tại một thời điểm.

| Vai | Ghi tệp | Kết quả | Quyết định |
|---|---|---|---|
| Soạn ghi chú (37 trang) | Có, chỉ aside.notes | Đủ 37 ghi chú; sửa ghi chú cũ C03 (đánh số (i)–(iii) khớp mặt trang, chứng minh với λ tổng quát), C05 (phác thảo chứng minh thay "định lý đa diện"), P02 (bỏ LLO), P00/C08/C09 (bỏ lời hứa "Bài 08"); nêu nghi ngờ số mục Bertsimas–Tsitsiklis; liệt kê 24 lập luận mới | yêu cầu sửa |
| Rà chính xác toán học | Không | Tính lại toàn bộ số liệu (hộp hạt, hồi quy ℓ1, định thức, đường đi, quy hoạch động) và đối chiếu SVG, MIT 15.093J lec16, slide Bertsimas, đề cương DOCX: 24 lập luận mới đúng. 1 nghiêm trọng (D04, từ ghi chú cũ: "Bellman không mở rộng sang ngẫu nhiên/liên tục/vô hạn" sai, mâu thuẫn Z01 và nguồn MIT có $E_{w_k}$), 3 trung bình (số mục B–T lệch một mục trên 12 trang; nguồn bổ đề đỉnh kề; B06 phản ví dụ đổi biến cơ sở và chiều nhân quả suy biến), 5 nhẹ | chấp nhận; điều phối viên xác nhận mục lục B–T chương 1–2 (§2.2 điểm cực/BFS, §2.3 dạng chuẩn, §2.4 suy biến, §2.5 tồn tại, §2.6 tối ưu tại điểm cực) |
| Rà mạch truyện và tự đọc | Không | 1 nghiêm trọng (C07: "cạnh", "kề" không định nghĩa trong $\mathbb R^n$), 11 trung bình (nón tiếp xúc, pivot/cycling chưa giải thích; hữu hạn điểm cực dùng trước C08; điểm cực vs cực trị; không nối LP của Bài 02; chứng nhận B02/C10 cần hệ số không âm và cách tìm; $A$ vs $\bar A$; C05 thiếu kết nối; D05 sai số bước, "hàm giá trị"; D04 mâu thuẫn Z01), 19 nhẹ; số dòng outline/storyboard kiểm bằng cat -n | chấp nhận |

### Phát hiện và trạng thái

| Mức độ | Trang | Vấn đề | Trạng thái |
|---|---|---|---|
| nghiêm trọng | D04 | Phạm vi phương trình Bellman nói sai | yêu cầu sửa: hữu hạn tất định; ngẫu nhiên lấy kỳ vọng; liên tục inf; vô hạn điểm bất động |
| nghiêm trọng | C07 | Cạnh, kề, nón hướng khả thi, pivot, cycling chưa định nghĩa | yêu cầu sửa |
| trung bình | B04–C09 (12 trang) | Số mục Bertsimas–Tsitsiklis lệch | yêu cầu sửa theo ánh xạ |
| trung bình | B06 | Đổi biến cơ sở không luôn giữ điểm; chiều nhân quả suy biến | yêu cầu sửa |
| trung bình | C02, P00/A05/A07, B02/C10, B06/B07, C05, D05 | Như bảng rà mạch truyện | yêu cầu sửa |
| nhẹ | 24 mục | Rút C03/C05/C07/C08, câu mở C04, D01/P03, thuật ngữ tiếng Anh, Z01, P02, B01, B02, B07 | yêu cầu sửa |

### Lượt sửa và tái kiểm

- Tác tử soạn (lượt sửa): thực hiện đủ 9 mục bắt buộc và toàn bộ mục nhẹ; C07 viết lại với định nghĩa cạnh, kề, nón hướng khả thi, pivot, cycling; số mục B–T theo ánh xạ; D04 phạm vi Bellman; B06; nối Bài 02–03 ở P00, A05, A07, B02, C10. Quyết định: chấp nhận, chờ tái kiểm.
- Tái kiểm toán học: đạt; 4 nhẹ (định nghĩa cạnh cần nhóm cố định và số chiều 1; cơ sở khác một cột khi suy biến; B02 vế trái phải trùng $c^Tx$; A07 ngoại lệ dưới gradient Bài 05b). Tái kiểm mạch truyện (27 trang đổi ± 2, cụm C05→C11 đọc trọn): đạt; 1 trung bình mới (D04 mất câu kết nối), 5 nhẹ.
- Lượt sửa cuối (D04, C07, B02, A07, D01, C04, P00): đã thực hiện; C07 và D04 đúng 350 tiếng. Điều phối viên chạy lại `check-deck.py`: 37 trang, 37 ghi chú, không lỗi console, không `.katex-error`, không tràn ở 16:9; đã xem ảnh C01 ở hai kích thước, mặt trang không đổi; `git diff --check` sạch. Quyết định: chấp nhận, bàn giao Bài 07.
- Việc còn mở ngoài phạm vi: hộp "Bài 08" trên mặt trang Z02 và câu "Phương pháp đơn hình thuộc Bài 08" trên mặt trang (ghi chú không nhắc thời điểm); học liệu Bài 07 không đổi vì mặt trang không đổi.

## Đồng bộ thuật ngữ cho deck và rà chất lượng SVG (2026-10-11)

Yêu cầu người dùng: như nhật ký Bài 03 cùng ngày. Tác tử biên tập deck và hình (general-purpose, Claude Opus 5.5 `claude-opus-5-5`, high; điều phối viên Fable 5.1 duyệt). Deck: "điểm cực" → "điểm cực biên" (44 mặt trang, 74 ghi chú diễn giả), "bài hộp hạt" → "bài toán hộp hạt" (tiêu đề B05, B07), "đi qua đỉnh kề" → "duyệt đỉnh kề" (tiêu đề C08, Z01), "kiểm" → "kiểm tra" (20), "chạm miền" → "có điểm chung với miền", "chi phí tốt nhất" → "chi phí tối ưu", "tính tay" → "tính thủ công"; C04 rút câu để không tràn dòng thứ ba; ô Z01 "tiêu chuẩn dừng theo đỉnh kề". Ghi chú: LLO18 ở dòng 8 "thuật toán duyệt đỉnh kề". SVG: 11/14 sửa; lp-dp-decision-map (mũi tên cong cắt nhãn, đầu mũi tên quá to, chữ chạm viền), standard-form-basis (ngũ giác vẽ sai tọa độ đỉnh, vẽ lại đúng số liệu), extreme-point-def (nhãn tách hai dòng), polyhedron-level-sets (đường z = 60 cắt nhãn), lp-model-units (sắp lại bốn hộp, "Kiểm tra đơn vị"), dp-state-sufficiency (đầu mũi tên lọt vào nút), multiple-optima, central-problem (desc và đỉnh (30,12) lệch tỉ lệ), l1-residual-slack (nhãn trục ra ngoài khung); svg-audit 0 cảnh báo sau sửa. Kiểm tra: `deck-audit.py` 37 trang, 0 lỗi, 0 quá cao; cờ tràn ngang ở A01, B01, C01, D01, Z01 là ảnh giả của hiệu ứng chuyển trang (điều phối viên đo lại sau 2,5 giây: không tràn); điều phối viên xem PNG lp-dp-decision-map: đạt. Có sẵn: ở 390 px các trang hai cột (P03, B02, C02, C09, D02) thu hình còn khoảng 150 px, thuộc CSS dùng chung. Quyết định: chấp nhận, commit.

## Rà đầy đủ các SVG không được dùng (2026-10-11, khép mục mở)

Sau lượt đồng bộ deck và SVG, các hình không được deck hay ghi chú tham chiếu mới chỉ được sửa lỗi rõ. Điều phối viên Fable 5.1 giao hai tác tử biên tập hình (general-purpose, Claude Opus 5.5 `claude-opus-5-5`, high) rà đủ 55 tệp mồ côi của mọi bài (Bài 01: 7, 02: 26, 03: 2, 04: 6, 05: 5 cùng saddle.svg và gradient-chain.svg, 05c: 1, 06: 6, 07: 1): mở xem từng PNG, đối chiếu khái niệm trong ghi chú, tính lại số liệu, vẽ lại các hình sai nội dung (saddle: parabol không qua gốc; coordinate-polyak-geometry panel A: đường mức elip và đường đi hạ tọa độ đúng; ill-conditioning, momentum-lookahead, risk-curves, quadratic-start, adaptive-scaling, self-concordant-curvature, line-restriction-convex-library, psd-cone-and-quadratic-directions, convex-preservation-and-jensen, quasiconvex-level-bisection, lp-qp-qcqp-geometry, pareto-front-weighted-scalarization, cone-induced-orders, qcqp-intersection, feasible-ray), thu nhỏ đầu mũi tên quá to, dời nhãn bị đường cắt, bỏ viền khung cắt làm miền không bị chặn trông như bị chặn, đổi thuật ngữ và tiêu đề dạng câu, thêm desc. Cùng lượt: Bài 06 thống nhất chính tả "vectơ" → "vector" trong deck (13), ghi chú (53), bài tập (4) và SVG (3). Kiểm tra của điều phối viên: `svg-audit.py` trên 56 tệp chỉ còn bốn cảnh báo dương tính giả (clipPath ở quadratic-local-model, momentum-lookahead, coordinate-polyak-geometry; nền chữ ở curvature-toolchain); đã xem PNG coordinate-polyak-geometry và psd-cone-and-quadratic-directions: đạt; `sync-local-materials.py --check` đạt; `git diff --check` sạch. Quyết định: chấp nhận, commit.

## Khép các mục mở của lượt deck và SVG (2026-10-11)

Màn hẹp 390×844: sáu trang lưới nhiều cột (A05, A07, B02, C02, C09, D03) thu hình còn 121–177 px vì các quy tắc tỉ lệ cột theo trang `[data-slide-id="…"] .responsive` có độ đặc hiệu cao hơn quy tắc xếp một cột trong khối `@media (max-width:760px)` của Bài 07. Tác tử sửa CSS (general-purpose, Claude Opus 5.5 `claude-opus-5-5`, high) nâng độ đặc hiệu quy tắc một cột bằng bộ chọn `[data-slide-id]` cho `.responsive`, `.grid2`, `.grid3` trong `lecture-style.css`, có chú thích; 1600×900 không đổi (đo lại tỉ lệ cột sáu trang). Rà hồi quy chín deck trước và sau: số trang cao quá khung và tràn ngang không đổi; ở 390 px hình rộng 336 px, chữ đọc được (xem ảnh B02, C02, C09, A07, D03, A05, P03, D02). Điều phối viên chạy script kiểm cuối trên chín deck sau toàn bộ lượt: 0 cao quá khung, 0 tràn ngang, 0 lỗi. Ghi nhận: P03 ghép hai panel trong một SVG nên chữ còn nhỏ ở màn hẹp; A07, D03 công thức dài cuộn ngang theo thiết kế. Quyết định về SVG không được dùng (toàn bộ học phần, 55 tệp): giữ làm tài sản tái dùng vì đã rà và sửa đúng.

## Khép cuối lượt deck và SVG (2026-10-11): chế độ cuộn màn hẹp, hình P03, kiểm toàn bộ SVG

- **Chế độ đọc cuộn ở màn hẹp cho deck 00–03** (trước đây chỉ 04–07 có): tác tử hạ tầng deck (general-purpose, Claude Opus 5.5 `claude-opus-5-5`, high) thêm wrapper `.lecture-viewport`, `scrollActivationWidth:null` (00, 01) và khối JS giống Bài 04/07 vào bốn deck; thêm khối CSS scoped `:where(html[data-lecture="00"], …="03")` trong `lecture-style.css` (dòng 1021–1071) chép theo Bài 07, cùng quy tắc một cột cho `.grid2/.grid3/.grid4/.split-6040/.example-grid/.ap-cards/.stack-cards`, `.route` xếp dọc, bảng cuộn ngang, viền báo tràn. Không `<style>`, không `style=""` (điều phối viên kiểm: 0). Màn rộng không đổi: so tọa độ mọi phần tử của 235 trang với HEAD, trùng khớp. Kiểm cuối của điều phối viên (`deck-audit-final.py`, 1600×900): deck 00 73 trang, 01 41, 02 74, 03 47: 0 lỗi, 0 cao quá khung, 0 tràn ngang; ở 390 px tác tử rà 235 trang: không tràn ngang, chữ ≥ 14 px, không lỗi console; điều phối viên xem ảnh ghép trước/sau của Bài 01 (M01B, F05): đạt.
- **Bài 07 P03**: SVG ghép hai panel tách thành `central-problem-lp.svg` và `central-problem-dp.svg` (viewBox 420×350, chữ 17,6 px ở 390 px thay vì 7,7 px), P03 dùng lưới hai cột sẵn có; ghi chú Bài 07 dòng 78 dùng hai hình với alt riêng, đoạn đọc hình sửa "ô trái/phải" → "hình thứ nhất/thứ hai"; tệp cũ `central-problem.svg` xóa bằng `git rm` (không còn tham chiếu); storyboard P03 ghi lý do.
- **Kiểm toàn bộ 217 SVG** bằng `svg-audit.py` do điều phối viên chạy: 18 tệp còn cờ, trong đó 14 là đường hoặc elip bị clipPath cắt (dương tính giả), 1 là chữ trên nền hộp (curvature-toolchain), 1 đã xem bằng mắt không che (equality-nullspace); 3 lỗi thật được sửa: nhãn "(2/3; 2/3)" ở coordinate-path dời lên vùng trống kèm đường dẫn; nhãn trục "giá trị hàm" (phi-local-model) và "tỷ số" (self-concordance-ratio) bị cắt 3 đơn vị ở mép trên, dời vào trong. Điều phối viên xem PNG coordinate-path sau sửa: đạt.
- **SVG không được dùng**: 54 tệp còn lại đã được rà từng tệp ở lượt trước; quyết định giữ làm tài sản tái dùng (ghi ở nhật ký Bài 00, 01, 07).

## 2026-10-12 — Văn phong và mật độ theo MAT1101, trang tiêu đề mạch

### Phạm vi và tác tử

- Phạm vi: chỉ deck `lecture-07-quy-hoach-tuyen-tinh-va-dong.html`, `outline.md`, `storyboard.md` và tệp này. Không sửa `lecture-style.css`, `materials/`, `index.html`, `img/lec-07/`. Không commit.
- Căn cứ: AGENTS.md, mục “Trang tiêu đề mạch”, “Văn phong và mật độ mặt trang chiếu”, “Tiêu chuẩn trình bày”; `planning/style-revision-2026-10-12.md` (bảng deck 07); báo cáo phân tích MAT1101, phần B.3, D.8.
- Tác tử biên tập: general-purpose, claude-opus-5-5, effort high (theo brief của master; master ghi bằng chứng lời gọi công cụ). Đã nạp `no-ai-slop` (Edit mode) trước khi viết.

### Thay đổi theo trang

| Trang | Quyết định | Nội dung |
|---|---|---|
| A01, B01, C01, D01 | sửa | Trang mở mạch lai thành trang tiêu đề mạch: lớp `strand-title`, `id="mach-2"`–`"mach-5"`, chữ số “2.”–“5.” thay “A.”–“D.”, giữ mã; dòng dẫn “Muốn …” ≤ 20 âm tiết; dòng từ khóa; ghi chú 93–96 âm tiết nêu đầu vào, nhiệm vụ, đầu ra. Gạch đầu dòng định nghĩa chuyển vào trang kế hoặc ghi chú; bảng so sánh LP–DP của D01 chuyển sang D01b. |
| Z00 | thêm | Trang tiêu đề mạch 6 “Tổng kết và chuyển tiếp”, `id="mach-6"`. |
| P02b | thêm | Trang “Nội dung” liệt kê sáu mạch đánh số, tên trùng trang tiêu đề mạch. |
| Z01b | thêm | Câu hỏi tự kiểm tra (ba câu, đáp án trong ghi chú), theo AGENTS.md, mục “Mở bài và kết bài”. |
| A09, B07b, C11b, D06b | thêm | Lời giải mẫu trên mặt trang cho bốn cụm khái niệm lớn, cùng tiêu đề với trang đề. |
| A05b, B06b, C03b, C05b, C07b, C07c, D01b, D04b, D05b | tách | Tách từ A05, B06, C03, C05, C07 (ba trang), D01, D04, D05 để mỗi trang một luận điểm và về trần mật độ. |
| P01, P02, P03, A02, A03, A04, A05, A07, A08, B02, B04, B05, B06, B07, C02, C03, C04, C05, C06, C07, C08, C09, C10, C11, D02, D03, D04, D05, D06, Z01, Z02 | sửa | Nhãn ngoài danh sách đổi sang nhãn cho phép (“Yêu cầu:” → “Nhu cầu:”, “Quy ước.”/“Mô hình.” → “Định nghĩa.”, “Không phải LP:” → “Lưu ý:”, “Phạm vi:” → “Giả thiết:”, “Vấn đề trung tâm:” → “Kết luận:”, “Bài 08:” bỏ, “Nhu cầu.” → “Nhu cầu:”, bỏ in đậm “Bước 1/2/Dừng”); tiêu đề “Ví dụ: …”, “Bài tập: …”; thẻ có câu văn đổi thành đoạn để mỗi trang một khung; câu dài tách hoặc chuyển vào ghi chú. |
| C02 | sửa | `\qquad` → `\quad` trong công thức định nghĩa; hết tràn ngang 3 px. |
| Ghi chú diễn giả | sửa | Nhắc “phần A–D” trong ghi chú đổi thành “phần 2–5” hoặc tên phần; ghi chú trên 250 âm tiết rút về ≤ 250 (bỏ câu trùng mặt trang hoặc trùng ghi chú khác); ghi chú các trang tách được chia theo trang; câu “Ở bước 3” sửa thành “Ở bước 2” theo danh sách bước mới của D05. |

Số trang: 37 → 53, vẫn 6 mạch. Bảng số âm tiết trước/sau và ngoại lệ ghi trong `storyboard.md`, mục “Mật độ mặt trang trước và sau (2026-10-12)”.

### Kiểm tra

- `density.py`: 53 trang; 2 trang trên 60 âm tiết, cả hai là ngoại lệ đã ghi trong storyboard (D01b 72, bảng so sánh; Z01 79, tổng kết; trần 80). Mọi trang ≤ 6 dòng, dòng dài nhất ≤ 20 âm tiết, không trang có ghi chú trên 250 âm tiết; ghi chú bốn trang tiêu đề mạch 93–96 âm tiết, Z00 81. Không còn lớp `.dense`. Trước sửa: 37 trang, 18 trang trên 60.
- `deckcheck.py` (1600×900 và 390×844): 0 lỗi console/page, 0 `.katex-error`, 0 tràn dọc, 0 tràn ngang (C02 đã hết), không chữ dưới 0,65em.
- Ảnh chụp (đã xem, tắt chuyển cảnh và chặn tải lại của `reloadserver`): A01, B01, C01, D01, Z00, P01, P02b, P03, A02, A03, A05, A08, A09, B06b, B07b, C02, C03, C03b, C07b, C07c, C08, C11b, D01b, D04, D05, D06b, Z01, Z01b ở 1600×900; A01, D01, C03, B07b, Z01, A08 ở 390×844 (đầu và cuối vùng cuộn). Bảng Z01, A08 và công thức B07b cuộn ngang ở màn hẹp với dấu hiệu “↔” sẵn có của deck.
- `git diff --check`: sạch.
- `no-ai-slop` (Edit mode, đối chiếu `eval.md`): mặt trang không còn câu chỉ đường, câu hỏi không nhãn, khẩu hiệu hay mã nội bộ; ghi chú trang tiêu đề mạch, P02b, A05b, A08, Z01b không mở bằng “Trang này” hay lấy tài liệu làm chủ ngữ ở câu đầu; không dùng gạch ngang dài trang trí.

### Việc chưa làm, chuyển master

- Học liệu: tiêu đề và thứ tự trang mới không đổi ký hiệu, ví dụ hay lời giải; lời giải A09, C11b, D06b trùng Bài tập 07.1, 07.7, 07.9 của `lecture-note.md`. `materials/lec-07/exercises.md` chưa tồn tại. Không cần đồng bộ học liệu vì đợt sửa này.
- CSS: các luật theo trang `[data-slide-id="A03"] .card` và `[data-slide-id="A05"] .grid2` trong `lecture-style.css` không còn phần tử khớp (A03 bỏ thẻ, A05 bỏ lưới); có thể xóa ở lượt CSS sau. Danh sách có `type="a"`/`type="i"` bị CSS chung ghi đè thành số, nên deck dùng đánh số 1, 2, 3 (“câu 1”) hoặc dòng (i)–(iii) viết tay.
- Cần vai mạch lập luận và vai toán rà lại các trang tách, các trang tiêu đề mạch, hai trang lân cận mỗi phía và ranh giới mạch (AGENTS.md, mục 6), vì số và thứ tự trang thay đổi.

### Vòng sửa sau tái kiểm (2026-10-12)

Đầu vào: `recheck-07-math.md` (tái kiểm toán, Opus 5.5, chỉ đọc) và `recheck-07-story.md` (tái kiểm mạch kể, Opus 5.5, chỉ đọc), qua master. Tác tử sửa: cùng tác tử biên tập (general-purpose, claude-opus-5-5, high).

| Nguồn | Mức | Trang | Vấn đề | Trạng thái |
|---|---|---|---|---|
| toán | trung bình | C08 | Lý do dừng thiếu “hữu hạn điểm cực biên” | đã sửa: “Không đỉnh nào lặp lại vì $c^Tv$ tăng nghiêm ngặt; $P$ có hữu hạn đỉnh nên thuật toán dừng.” |
| toán | trung bình | Z01 (hàng 2, ghi chú) | Thiếu ngữ cảnh dạng chuẩn và $A_B$ khả nghịch; ghi chú gán sai vai trò $\operatorname{rank}(A)=m$ | đã sửa: hàng “dạng chuẩn, $\operatorname{rank}(A)=m$; $A_B$ khả nghịch; $A_B^{-1}b\ge0$”; ghi chú “ít nhất một $A_B$ khả nghịch”, khớp B06 |
| toán + mạch kể | trung bình / nhẹ | Z01 (kết luận) | Kết luận không điều kiện | đã sửa: bỏ dòng khỏi mặt trang; ghi chú nêu câu trả lời có điều kiện; 66 âm tiết |
| mạch kể | trung bình | B01 | Dòng dẫn nêu nhiệm vụ mạch 4 | đã sửa: “Muốn tìm tập ứng viên hữu hạn, phải mô tả toàn bộ miền khả thi và tính được các đỉnh bằng đại số.” |
| mạch kể | trung bình | P00, P02, P02b, P03, A05, A09, B06, D01, Z01, Z02 (ghi chú) | Tài liệu, phần bài hoặc dòng mặt trang làm chủ ngữ | đã sửa: câu viết lại với chủ ngữ là đối tượng toán học; đoạn mở Z02 bỏ |
| mạch kể | trung bình | storyboard | Cột lý do và quan hệ của trang gốc đã tách còn nội dung cũ | đã sửa: A05, A08, B06, B07, C03, C05, C07, C11, D01, D04, D05, D06, Z02; “Quyết định cấu trúc” sửa C07 → C07c, D02–D06 → D01b–D06b |
| mạch kể | trung bình | storyboard, bản đồ cụm C | C09 ghi “Trực quan” sau hình thức; thiếu hàng “tối ưu tại đỉnh” | đã sửa: tách ba hàng (điểm cực biên; tối ưu tại đỉnh và bốn kết cục với trực quan B02; thuật toán với C09 là ứng dụng) |
| mạch kể | trung bình | D01b | Ba luận điểm, dùng “trạng thái” trước D02, phải dùng ngoại lệ | đã sửa: dòng “Giả thiết:” vào ghi chú, bảng dùng “tình huống”; 72 → 55 âm tiết, bỏ ngoại lệ |
| toán | nhẹ | C03b | Thiếu ngữ cảnh $P$, $m$ | đã sửa: “Với $P=\{x:Ax=b,\ x\ge0\}$, $\operatorname{rank}(A)=m$: …” |
| toán | nhẹ | C11b | Suy luận “≤ 108 ⇒ nhiều nghiệm”; “cũng chỉ” | đã sửa: “đạt tại hai đỉnh … cả cạnh nối chúng tối ưu”; “không lớn hơn nghiêm ngặt” |
| toán + mạch kể | nhẹ | C07 | Dãy $z$ không gắn đỉnh | đã sửa |
| toán | nhẹ | D06b | Chi phí không gắn đường | đã sửa |
| toán | nhẹ | D04b | “với mọi $k$” bao cả $k=N$ | đã sửa: $k=N-1,\ldots,0$ |
| toán | nhẹ | D02 | Mất ý “quá khứ không ảnh hưởng thêm” | đã sửa (19 âm tiết trên dòng) |
| toán | nhẹ | D01b (ghi chú) | “bốn giới hạn” liệt kê ba | đã sửa: ba giả thiết, giả thiết thứ tư (trạng thái đủ) nêu cùng định nghĩa trạng thái |
| toán | nhẹ | D05b | Lưu ý lặp | đã sửa: “nếu trạng thái phải chứa cả lịch sử, $\lvert X_k\rvert$ tăng theo hàm mũ và ưu thế mất” |
| toán + mạch kể | nhẹ | D01, A01, Z00 | Dòng dẫn thiếu vế chính / mơ hồ / chung chung | đã sửa (21, 21, 23 âm tiết; trần 25) |
| mạch kể | nhẹ | B06/B06b, D05/D05b, P02/P02b | Câu nối trỏ qua trang mới chèn | đã sửa: câu cũ chuyển xuống trang tách, trang gốc có câu nối sang trang tách |
| mạch kể | nhẹ | C07c, C05b, D04 | Ghi chú mở bằng nhãn cụt; D04 thiếu câu nối | đã sửa |
| mạch kể | nhẹ | B06b, C07b | Khái niệm phụ không có nhu cầu trên mặt trang | đã sửa trong storyboard: ghi chu trình rút gọn kèm lý do |
| mạch kể | nhẹ | C01 (ghi chú) | Chưa nêu đầu ra cho mạch 5 | không áp dụng: ghi chú đang 96 âm tiết, thêm câu vượt khoảng 40–100; đầu ra cho mạch 5 nêu ở ghi chú D01 và C11b |
| mạch kể | nhẹ | A08 | “Câu hỏi:” trước câu dữ kiện | đã sửa: “dựng mô hình cho hai luồng suy luận …” |
| mạch kể | nhẹ | B05, C04, C09 | Thiếu dòng yêu cầu bằng động từ học tập | đã sửa: “Viết dạng chuẩn của …”, “Xác định tập nghiệm tối ưu của …” (công thức hiển thị thành nội dòng để C04 không chạm chân trang), “chạy thuật toán duyệt đỉnh kề từ $(0,0)$” |
| mạch kể | nhẹ | C07, C07c, C03b | Dòng “Ví dụ.” ngoài khuôn trang kết quả | giữ có chủ ý: mỗi trang một luận điểm, ví dụ một dòng áp dụng kết quả lên bài toán hộp hạt |
| mạch kể | nhẹ | Z01b | Câu 3 không gọi tên đồ thị tầng | đã sửa |
| mạch kể | nhẹ | P01 | Thứ tự khác mặc định | giữ, ghi lý do trong storyboard (ký hiệu dùng trong mục tiêu; P01 và P03 làm “Ngữ cảnh”) |
| mạch kể | nhẹ | A05b, D01b (ghi chú) | Lặp mặt trang | đã sửa |
| mạch kể | nhẹ | storyboard, outline | “mười” trang tách; ô nhu cầu hàng tích hợp; “điểm cực” | đã sửa: “chín”; “không áp dụng”; thống nhất “điểm cực biên” |

Kiểm sau vòng sửa: `density.py` 53 trang, chỉ Z01 vượt 60 (66, ngoại lệ tổng kết ≤ 80); mọi trang ≤ 6 dòng; dòng dài nhất ≤ 20 âm tiết trừ năm dòng dẫn trang tiêu đề mạch (21–23, trần riêng 25); mọi ghi chú ≤ 250 âm tiết, ghi chú trang tiêu đề mạch 81–98. `deckcheck.py --port 8790`: 0 lỗi, 0 tràn ở 1600×900 và 390×844; ảnh đã xem: B01, C04, C08, C11b, D01b, Z01 (tắt chuyển cảnh). `git diff --check`: sạch.

### Quyết định của master (Fable 5.1, effort medium) — 2026-10-12

Master đã tự chạy `density.py` (53 trang, chỉ Z01 ở 66 dưới trần 80 của trang tổng kết; bốn dòng dẫn 21–23 âm tiết theo trần 25 của trang tiêu đề mạch), `deckcheck.py` trên máy chủ tĩnh với chuyển cảnh tắt (0 lỗi console, 0 tràn ở hai kích thước), đọc nguyên văn C08 ("P có hữu hạn đỉnh nên thuật toán dừng") và bảng Z01 sau sửa (hàng nghiệm cơ sở khả thi: dạng chuẩn, rank(A) = m, A_B khả nghịch, A_B⁻¹b ≥ 0), xem ảnh các trang tiêu đề mạch và trang tách, đối chiếu bảng trạng thái hai báo cáo tái kiểm. `git diff --check` sạch. Quyết định: `chấp nhận`, commit Bài 07. Việc còn treo: hai luật CSS scoped cho A03/A05 không còn phần tử khớp (đợt CSS chung); `materials/lec-07` chưa có `exercises.md`.

### Tệp bài tập `materials/lec-07/exercises.md` (2026-10-12)

Tác tử soạn học liệu: general-purpose, claude-opus-5-5, effort high (theo brief của master); nạp `no-ai-slop` chế độ Edit, tự đối chiếu `eval.md`. Không commit, không chạy `sync-local-materials.py`.

- **Nội dung.** 13 bài theo bốn mạch nội dung. Bài tập 07.1–07.9 chép nguyên đề, gợi ý và lời giải của ghi chú bài giảng, giữ số hiệu. Gộp với trang chiếu: 07.1 ↔ A08/A09 (`#/2/8`, `#/2/9`); 07.6 (a)–(d) ↔ C10 (`#/4/14`, đáp án trong ghi chú diễn giả); 07.7 ↔ C11/C11b (`#/4/15`, `#/4/16`); 07.9 (a)–(d) ↔ D06/D06b (`#/5/9`, `#/5/10`). Bài tập trang B07/B07b (`#/3/8`, `#/3/9`) thành Bài tập 07.13, ghi là hai dòng của bảng Bài tập 07.4. Ba bài vận dụng vào AI mới: 07.14 trọng số trộn dữ liệu (nhận biết, Định lý 07.15, Hệ quả 07.16, 07.24), 07.15 phân bổ giờ gán nhãn (tính toán, Định lý 07.13, chứng nhận như Ví dụ 07.5), 07.16 lập kế hoạch tác tử với giới hạn số hành động (vận dụng, Mệnh đề 07.39, Nhận xét 07.36). Bài tập 07.10–07.12 để lại ở "Bài tập củng cố" của ghi chú, tệp bài tập chỉ dẫn tới. Mục lục dẫn tới trang tiêu đề mạch `#/h/1`, h = 1…6.
- **Kiểm số.** Tính lại bằng phân số chính xác (script tạm, không lưu trong kho): mười định thức và nghiệm cơ sở của 07.4 (khớp bảng ghi chú); sáu cơ sở của 07.14 (bốn khả thi, $z^*=4{,}4$); mười giao điểm của 07.15 (năm đỉnh, $z^*=760$, $\mu=(10,30)$, ngân sách 42 cho 780); $J(v)$ và $J(v,r)$ của 07.16 cùng liệt kê năm đường (8 không giới hạn, 9 với tối đa ba hành động).
- **Kiểm trình duyệt.** Viewer trên máy chủ tĩnh cổng 8790, 1600×900 và 390×844: 0 lỗi console, 0 cảnh báo KaTeX (đã bỏ chữ có dấu trong `\text{}`), 0 `.katex-error`, 13 khối exercise, 26 khối hint/solution gập mặc định, mở và đóng lại được, ảnh SVG tải được, trang không tràn ngang; một số ma trận và bảng cuộn ngang trong khung ở 390 px như ghi chú. `index.html` thêm thẻ "Bài tập" cho Bài 07, mở không lỗi. `git diff --check` sạch.
- **Điểm cần master quyết định.** (1) AGENTS.md mục "Cấu trúc bắt buộc của một chương" ghi "hai tệp không lặp đề bài", còn brief yêu cầu chép 07.1–07.9; tệp làm theo brief. (2) Ghi chú bài giảng, mục "Bài tập củng cố", còn câu "Bài 07 không có tệp bài tập riêng", nay không còn đúng. (3) Ghi chú diễn giả trang C10 ký hiệu hai hệ số nhân là $\lambda_1,\lambda_2$, ghi chú bài giảng dùng $\mu_1,\mu_2$ ($\lambda$ trong bảng ký hiệu là hệ số tổ hợp lồi); tệp bài tập theo ghi chú. (4) Mô tả Bài 07 trong `index.html` còn chữ "điểm cực" thay vì "điểm cực biên".

Quyết định của master (Fable 5.1), đợt đồng bộ học liệu 2026-10-12: đã đọc diff, viewer (ghi chú và bài tập) trên máy chủ tĩnh 0 lỗi console, 0 `.katex-error`; `sync-local-materials.py --check` OK; `git diff --check` sạch. `chấp nhận`, commit.

## Đợt rà soát thuật ngữ và thứ tự định nghĩa 2026-10-12

- **Tác tử rà soát:** general-purpose, claude-opus-5-5, effort high (chỉ đọc; báo cáo `report-07.md`, 21 phát hiện bảng A, 7 phát hiện bảng B).
- **Tác tử biên tập:** general-purpose, claude-opus-5-5, effort high; nạp `no-ai-slop` chế độ Edit, tự kiểm theo `eval.md`. Áp dụng `decisions-common.md` rồi `decisions-07.md` của điều phối viên. Không commit, không chạy `sync-local-materials.py`.
- **Phạm vi đã sửa:** deck, `storyboard.md` (40 mục có dòng “Sửa (2026-10-12, thuật ngữ)”), `outline.md` (“Thuật toán ở mức khái niệm”), năm SVG trong `img/lec-07/` (`central-problem-lp.svg`, `polyhedron-level-sets.svg`, `lp-four-statuses.svg`, `lp-dp-decision-map.svg`: “vector”; `standard-form-basis.svg`: “biến bù”), `materials/lec-07/lecture-note.md` và `exercises.md`. Không thêm trang, không đổi số mạch, trang “Nội dung” và `#/N` giữ nguyên (53 trang).

| mức độ | trang | vấn đề | quyết định điều phối viên | trạng thái | cách sửa |
|---|---|---|---|---|---|
| nghiêm trọng | B06 | “ma trận cột $A_B$” sai nghĩa | chấp nhận (A1) | đã sửa | “ma trận con $A_B$ (gồm các cột $A_j$, $j\in B$)”; 44 → 56 âm tiết cùng mục B3 |
| trung bình | B02 | “còn chạm miền” | chấp nhận (A2) | đã sửa | “còn có điểm chung với miền”; 39 → 42 |
| trung bình | A05, A05b | tên tự đặt “Dạng thường dùng” | chấp nhận (A3) | đã sửa | “Dạng ma trận” trên hai trang và storyboard |
| trung bình | B01, B04, B05, C09, P01, A05b (ghi chú) | slack gọi là “biến phụ”, trùng tên với $t_i$ | chấp nhận (A4) | đã sửa | “biến bù (slack variable)”; $t_i$ giữ “biến phụ”, surplus giữ “biến dư”; học liệu đổi 30 chỗ “biến phụ” (nghĩa slack) thành “biến bù” |
| trung bình | A09, B05; ghi chú C02, C03, C05b, C07, C07b, C10 | “ràng buộc chặt” cho nghĩa active | chấp nhận (A5) | đã sửa | “ràng buộc hoạt động (active constraint)”; học liệu: Định nghĩa 07.12 đổi tên “Ràng buộc hoạt động”, 79 chỗ “chặt” nghĩa active đổi theo, “chặt hơn” (nghĩa hạn chế hơn) thành “hạn chế hơn” |
| trung bình | D05b | “cỡ $Nq^2$”, “cỡ $80$”, “nối đủ” | chấp nhận (A6) | đã sửa | “$O(Nq^2)$”, “khoảng $80$”, “nối đầy đủ”; ghi chú “tổng là $Nq^2$, tức bậc $O(Nq^2)$” |
| trung bình | D04b | “chi phí trả ngay” | chấp nhận (A7) | đã sửa | “chi phí giai đoạn $k$”; tên “chi phí giai đoạn (stage cost)” đặt ở D04 (mặt trang và ghi chú); học liệu “chi phí giai đoạn hiện tại” |
| trung bình | D05, D06 | “đạt min” | chấp nhận (A8) | đã sửa | “đạt giá trị nhỏ nhất”; D05 38 → 47, D06 44 → 47 |
| nhẹ | D05, D06, D06b | bốn tên cho hai lượt | chấp nhận (A9) | đã sửa | D05 bước 2 “Lượt ngược (backward pass):”, bước 3 “Lượt xuôi (forward pass):”; ghi chú D05 “giải ngược (backward induction)” |
| nhẹ | D04 | “trạng thái kế” | chấp nhận (A10) | đã sửa | “trạng thái kế tiếp”; học liệu đổi 7 chỗ |
| nhẹ | D01b | “tình huống” và “trạng thái” xen kẽ | chấp nhận (A11) | đã sửa | bảng “chi phí tối ưu còn lại theo trạng thái”; ghi chú dùng “trạng thái”; 54 → 56 |
| nhẹ | P01, D01b, alt P03, ghi chú | “véc-tơ” lệch quy ước | chấp nhận (A12) | đã sửa | “vector” 17 chỗ trong deck, nhãn và title SVG, 43 chỗ trong học liệu |
| nhẹ | C08, C10, C11b; ghi chú C07, C11 | “nghiêm ngặt” | chấp nhận (A13) | đã sửa | “tăng chặt”, “lớn hơn chặt”, “bất đẳng thức chặt”; học liệu giữ duy nhất cụm “(còn gọi là lồi nghiêm ngặt)” |
| nhẹ | P00 (ghi chú) | KKT chưa viết đầy đủ | chấp nhận (A14) | đã sửa | “điều kiện Karush–Kuhn–Tucker (KKT)” |
| nhẹ | P00 (ghi chú) | thiếu “simplex method” | chấp nhận (A15) | đã sửa | “Phương pháp đơn hình (simplex method)” |
| nhẹ | C07c (ghi chú) | “nón tiếp xúc” | chấp nhận (A16) | đã sửa | “nón tiếp tuyến (tangent cone)”; storyboard theo |
| nhẹ | A05b, A08, D04 (ghi chú) | từ “khuôn” | chấp nhận (A17) | đã sửa | “dạng ma trận”, “cùng cấu trúc”, “cấu trúc chung”; storyboard theo |
| nhẹ | P00, C08, Z02 (ghi chú) | “ở mức ý niệm” | chấp nhận (A18) | đã sửa | “ở mức khái niệm”; outline và học liệu (4 chỗ) theo |
| nhẹ | A02, B06, D02, D03, D04 | thiếu tiếng Anh lần đầu | chấp nhận (A19) | đã sửa | ghi chú: decision variable, basic solution, subproblem, layered graph, control, stage cost, terminal cost |
| nhẹ | B04 (ghi chú) | tên “dạng chính tắc” của giáo trình tiếng Việt | chấp nhận (A20) | đã sửa | ghi chú B04 nêu tên này, mặt trang giữ “dạng chuẩn” |
| nhẹ | D02, D03, D04 | trùng chữ $s,B$; $u$ và $u_k$ | chấp nhận (A21) | đã sửa | ghi chú D02, D03 nói rõ $s,A,B,C,D,t$ là tên nút; D04 viết $u_k\in U_k(x_k)$, $f_k(x_k,u_k)$, $g_k(x_k,u_k)$ |
| trung bình | B03 | nửa không gian chưa viết rõ | chấp nhận (B1) | đã sửa | “các nửa không gian $\{x:a_i^Tx\le b_i\}$, $i=1,\ldots,m$”; 53 âm tiết, không đổi |
| trung bình | A09 | ràng buộc hoạt động không định nghĩa trên mặt trang | chấp nhận (B2) | đã sửa | “hai ràng buộc hoạt động (thỏa với dấu bằng)”; ghi chú thêm “Nhắc lại:” theo Bài 03–04; 25 → 30 |
| trung bình | B06 | “cơ sở”, “biến cơ sở” chưa được đặt tên | chấp nhận (B3) | đã sửa | dòng “$B$ gọi là cơ sở (basis); $x_j$, $j\in B$, là biến cơ sở.”; dòng “Trực quan.” giữ trên mặt trang vì trang còn dưới trần (56 âm tiết) |
| trung bình | C07b | định nghĩa kề dựa vào “mặt một chiều” | chấp nhận (B4) | đã sửa | “Trong đa diện $P\subset\mathbb R^n$, hai điểm cực biên khác nhau kề nhau nếu chúng có chung $n-1$ ràng buộc hoạt động độc lập tuyến tính” (Bertsimas và Tsitsiklis, §2.2, định nghĩa nghiệm cơ sở kề nhau, ghi trong nguồn của ghi chú); ghi chú: cạnh là hình ảnh hình học, ví dụ $n=2$, ở dạng chuẩn tính cả $m$ phương trình; 49 → 55 |
| trung bình | D04 | chưa nêu đại lượng cần cực tiểu | chấp nhận (B5) | đã sửa | gạch thứ ba thêm “mục tiêu $\min\sum_{k=0}^{N-1}g_k(x_k,u_k)+g_N(x_N)$ (chi phí cộng)”; 51 → 59, 5 dòng |
| nhẹ | A05b | giả thiết tỉ lệ, cộng tính chỉ có trong ghi chú | chấp nhận (B6) | đã sửa | “Lưu ý: tuyến tính gồm tỉ lệ (gấp đôi sản lượng, gấp đôi lợi ích) và cộng tính.”; ghi chú đọc hai giả thiết trên dữ kiện; 25 → 43 |
| nhẹ | C03, B06 | $A_j$ chưa khai báo | chấp nhận (B7, giải quyết bởi A1) | đã sửa | B06 khai báo “các cột $A_j$, $j\in B$” |
| nhẹ | B02 | “(level set)” | quyết định liên bài 6 | đã sửa | “(level curve)” |
| nhẹ | A03, Z01b (ghi chú) | nhãn “Đáp án” | quyết định liên bài 13 | đã sửa | “Lời giải:”; Z01b đánh (1)–(3) |

Ghi chú biên tập: (1) Ghi chú bài giảng gọi $t_i$ của hồi quy $L_1$ là “biến chặn”, deck A07 gọi là “biến phụ” theo quyết định A4; hai tên chưa thống nhất, để điều phối viên quyết định. (2) Câu C10 ghi chú “ràng buộc thứ hai chặt hơn” (nghĩa hạn chế hơn) đổi thành “hạn chế hơn” để “chặt” chỉ còn nghĩa strict.

**Kiểm tra.** `grep` trong deck: “véc-tơ”, “nghiêm ngặt”, “ý niệm”, “khuôn”, “tiếp xúc”, “chạm”, “cỡ”, “tình huống”, “thường dùng”, “ma trận cột”, “Đáp án”, “level set” đều 0; “chặt” còn 9 chỗ, đều nghĩa strict (tăng chặt, lớn hơn chặt, bất đẳng thức chặt); “biến phụ” còn 4 chỗ, đều chỉ $t_i$ hoặc liệt kê ba loại biến ở P01. Học liệu: “véc-tơ” 0, “nghiêm ngặt” chỉ còn “(còn gọi là lồi nghiêm ngặt)”, “ý niệm” 0. `deckcheck.py` cho P01, P03, A05, A05b, A09, B02–B06, C07b, C08, C10, C11b, D01b, D04, D04b, D05, D05b, D06: `errors: none`, không FLAG; ảnh 1600×900 (tắt chuyển cảnh) đã xem cho A05b, A09, B02, B03, B06, C07b, D04, D05, D05b, nội dung thấp nhất ≤ 805 px; ảnh 390×844 đã xem cho B06 và D04 (cuộn tới cuối). `git diff --check` sạch.

Quyết định bổ sung của điều phối viên (2026-10-12): $t_i$ của hồi quy $L_1$ gọi là “biến phụ (auxiliary variable)”, thống nhất với deck A07 và Bài 02. Tác tử biên tập đổi cả 8 chỗ “biến chặn” trong `materials/lec-07/lecture-note.md` thành “biến phụ” (dòng 30, 56, 274 có thêm “(auxiliary variable)” ở lần giới thiệu, 297 hai chỗ, 302, 345, 553); cả 8 chỗ cùng nghĩa biến chặn trên trị tuyệt đối, kể cả dòng 30 tóm tắt Bổ đề 02.14, nên không giữ chỗ nào. `exercises.md` không có “biến chặn”.

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12):** chấp nhận. Đã đối chiếu diff mặt trang với decisions-07 và decisions-common; kiểm định nghĩa kề ở C07b (hai điểm cực biên chung n−1 ràng buộc hoạt động độc lập tuyến tính, Bertsimas–Tsitsiklis); kiểm 79 chỗ thay 'chặt' trong học liệu không chạm 'lồi chặt'/'tăng chặt'; tự chạy deckcheck trên A05b, A09, B02, B06, C07b, D04, D05, D06: 0 lỗi, 0 FLAG; xem ảnh B06, C07b ở 1600×900. Quyết định bổ sung: t_i gọi là 'biến phụ' (8 chỗ 'biến chặn' trong ghi chú đã đổi). Gói học liệu cục bộ đồng bộ ở commit cuối đợt.

## Rà soát 2026-10-22

### Tác tử

| vai trò | id tác tử | loại | mô hình | effort | ghi tệp |
|---|---|---|---|---|---|
| R1: reviewer mạch kể và tập trung mạch (storyline and linking) | `a78e236a47ecc5de6` | general-purpose | Opus 5.5 (`claude-opus-5-5`) | high | không |
| R2: reviewer góc nhìn sinh viên, mật độ, văn phong, toán | `a09e96e8aac640521` | general-purpose | Opus 5.5 (`claude-opus-5-5`) | high | không |
| Tác tử biên tập (worker, tác tử ghi tệp duy nhất) | `ac02524b7499b6851` | general-purpose | Opus 5.5 (`claude-opus-5-5`) | medium | có |

Hai reviewer nạp `no-ai-slop` chế độ Detect, đọc đủ 53 trang (mặt trang và ghi chú), 15 SVG của `img/lec-07/`; R1 đối chiếu thêm Bài 02 (S02-03, S02-03b, S02-05, S02-06, S03-04c). Không có phát hiện `chặn bàn giao` hay `nghiêm trọng`. R2 tính lại toàn bộ số liệu (năm đỉnh hộp hạt và giá trị $z$, chứng nhận cận $96$, các định thức $-2$ và $1$, ví dụ suy biến, bài tập C10 và C11, các giá trị $J$ ở D03 và D06b, $Nq^2=80$, tọa độ SVG): không có lỗi toán. Quyết định của master: `decisions-07-1022.md` (scratchpad phiên), chia thành 34 đơn vị U0–U33, mỗi đơn vị một commit.

### Báo cáo rà tập trung từng mạch (R1, Phần A, viết gọn)

**Mạch 1. Mở đầu (P00–P03).** Câu hỏi của bài (P03): tìm phương án tối ưu khi tập phương án quá lớn để duyệt hết.

| trang | phần việc | đề xuất |
|---|---|---|
| P00 | định danh | giữ |
| P01 | khóa ký hiệu $x,c,A,b$ | sửa dòng "Nhắc lại:" (U1) |
| P02 | ba mục tiêu đo được | thẻ 2 thiếu định lý điểm cực biên tối ưu và duyệt đỉnh kề (U2) |
| P02b | bản đồ mạch | giữ |
| P03 | khung lý thuyết, hai cấu trúc | giữ |

**Mạch 2. Mô hình hóa quy hoạch tuyến tính (A01–A09).** Câu hỏi: viết một quyết định thành quy hoạch tuyến tính thế nào (biến → ràng buộc → mục tiêu → dạng ma trận)? Có trên dòng dẫn A01; A02 "Nhu cầu:" nêu đủ ba thành phần. Đạt.

| trang | phần việc | đề xuất |
|---|---|---|
| A01 | đặt câu hỏi | giữ |
| A02 | biến | giữ |
| A03 | ràng buộc | giữ |
| A04 | mục tiêu; khoảng trống "vài điểm chưa đủ" | sửa câu hộp (U3) |
| A05 | dạng ma trận | dạy lại Bài 02 không có "Nhắc lại:" (U4) |
| A05b | ánh xạ $c,A,b$ | "Lưu ý:" tổng quát trên trang ví dụ (U4) |
| A07 | ứng dụng: hồi quy $L_1$ | trùng Bài 02 S02-06 (U5) |
| A08, A09 | đo mục tiêu mạch | giữ |

**Mạch 3. Đa diện và dạng chuẩn (B01–B07b).** Câu hỏi: mô tả toàn bộ miền khả thi và tính các đỉnh bằng đại số thế nào? Có trên dòng dẫn B01; B02 chưa có "Nhu cầu:".

| trang | phần việc | đề xuất |
|---|---|---|
| B01 | đặt câu hỏi | giữ |
| B02 | mô tả miền; đỉnh là ứng viên | thêm "Nhu cầu:" (U6) |
| B03 | mô tả miền trong $\mathbb R^n$ | dạy lại định nghĩa đa diện; ví dụ trên trang định nghĩa (U7) |
| B04 | dạng chuẩn | bảng phép chuyển dạy lại Bài 02 S02-03b (U8) |
| B05 | tính đỉnh trên ví dụ | thiếu hình nhắc lại đỉnh, khung chưa có "Diễn giải:" (U9) |
| B06 | nghiệm cơ sở khả thi | bỏ viết tắt (U10) |
| B06b | suy biến | giữ |
| B07, B07b | đo mục tiêu mạch | làm rõ $A_B$ (U11); thêm hình nghiệm cơ sở (U12) |

**Mạch 4. Điểm cực biên và bảo đảm tối ưu (C01–C11b).** Câu hỏi: khi nào chắc chắn có một đỉnh tối ưu, và tìm nó bằng cách nào? Dòng dẫn C01 chỉ nêu phần "định nghĩa đỉnh"; phần "tìm bằng cách nào" xuất hiện lần đầu trên thân trang ở C07b/C08 (nửa sau mạch). C02 chưa có "Nhu cầu:".

| trang | phần việc | đề xuất |
|---|---|---|
| C01 | đặt câu hỏi (một nửa) | sửa dòng dẫn (U13) |
| C02 | định nghĩa đỉnh | thêm "Nhu cầu:" (U14) |
| C03 | đỉnh tính được | giữ |
| C03b | tính hữu hạn | ví dụ trùng định thức B07b (U15) |
| C04 | giới hạn kết luận định lý | đứng trước định lý mà nó giới hạn; chuyển sau C07 (U20) |
| C05 | giả thiết 1 | tiêu đề chưa gọi tên khái niệm (U16) |
| C05b | giả thiết 1: dạng chuẩn có đỉnh | sửa nhãn chứng minh (U17) |
| C06 | giả thiết 2: bốn kết cục | thêm dòng chữ (U18) |
| C07 | định lý điểm cực biên tối ưu | "Ví dụ." trùng hình C09 (U19) |
| C07b | đi giữa các đỉnh | thiếu nhu cầu, thiếu hình (U21) |
| C07c | tiêu chuẩn dừng | "Ví dụ." trùng bước 2 của C09 (U22) |
| C08 | thuật toán | giữ |
| C09 | tìm đỉnh tối ưu trên ví dụ | thiếu "Diễn giải:", tiêu đề vụng (U23) |
| C10, C11, C11b | đo mục tiêu mạch | C11 thiếu hình, ghi chú gọi "tổng hợp"; C11b thiếu "Diễn giải:" và hình (U24) |

**Mạch 5. Quy hoạch động (D01–D06b).** Câu hỏi: tối ưu một chuỗi quyết định thế nào mà không liệt kê $q^N$ chuỗi? Có trên dòng dẫn D01; "Nhu cầu:" của D01b nêu một tính chất, chưa nêu câu hỏi.

| trang | phần việc | đề xuất |
|---|---|---|
| D01 | đặt câu hỏi | giữ |
| D01b | kích thước bài toán | sửa "Nhu cầu:" và ô bảng (U25) |
| D02 | trạng thái | nhãn $J$ trong hình dùng trước định nghĩa (U26) |
| D03 | Bellman bằng số | hộp chưa có nhãn "Diễn giải:" (U27) |
| D04 | hình thức | thiếu $x_0$; nhắc đồ thị tầng bằng lời (U28) |
| D04b | phương trình Bellman | "Ý nghĩa:" đọc lại công thức (U29) |
| D05, D05b | giải ngược, chi phí $O(Nq^2)$ | giữ |
| D06, D06b | đo mục tiêu mạch | D06b thiếu hình giá trị mới (U30) |

**Mạch 6. Tổng kết và chuyển tiếp (Z00–Z02).** Câu hỏi: mỗi kết quả cần giả thiết nào, và vấn đề trung tâm được trả lời có điều kiện ra sao? Phần sau chỉ có trong ghi chú Z01.

| trang | phần việc | đề xuất |
|---|---|---|
| Z00 | đặt câu hỏi | ghi chú "bốn sản phẩm" lệch "ba mục tiêu" (U31) |
| Z01 | giả thiết từng kết quả | thêm "Kết luận:" có điều kiện (U32) |
| Z01b | tự kiểm tra | câu 3 nhắc đồ thị tầng bằng lời (U33) |
| Z02 | chuyển tiếp | giữ |

### Phát hiện hợp nhất và quyết định

Nguồn: R1 (B-1…B-18, C-1…C-10), R2 (bảng phát hiện). Quyết định của master; trạng thái cập nhật theo từng đơn vị.

| đơn vị | mức độ | trang | vấn đề | nguồn | quyết định | trạng thái |
|---|---|---|---|---|---|---|
| U0 | trung bình | storyboard, review-log | thiếu cột câu hỏi trung tâm và báo cáo rà tập trung | R1 B-7 | chấp nhận | đã sửa: thêm cột "Câu hỏi trung tâm (2026-10-22)" vào bảng mạch của `storyboard.md`; ghi Phần A của R1 và bảng này vào `review-log.md`; master chấp nhận |
| U1 | nhẹ | P01 | "Nhắc lại:" lệch ghi chú (bất phương trình/phương trình); ghi chú 251 âm tiết | R1 B-16, R2 | chấp nhận dạng R2; bác bỏ nhãn "Tiên quyết:" (không thuộc danh sách nhãn) | đã sửa: mặt trang "**Nhắc lại:** hệ phương trình và bất phương trình tuyến tính, hạng ma trận, tập lồi và tổ hợp lồi." (37 → 40 âm tiết, 4 dòng, dòng dài nhất 20); ghi chú nêu vai trò của bốn mục, 251 → 148 âm tiết; ghi chú bài giảng không cần sửa (mục "Kiến thức tiên quyết" đã có đại số tuyến tính và tập lồi); master chấp nhận |
| U2 | nhẹ | P02; ghi chú P01, P02, P02b | thẻ 2 thiếu đầu ra mạch 4; "kết cục" thiếu ngữ cảnh; số sản phẩm lệch | R1 B-12, R2 | chấp nhận dạng R1; bác bỏ dạng R2 "kết cục của bài toán" | đã sửa: thẻ 2 "Chuyển về dạng chuẩn; tính nghiệm cơ sở khả thi; tìm điểm cực biên tối ưu bằng duyệt đỉnh kề." (55 → 59 âm tiết, trần 80); ghi chú P01 bỏ câu "ba loại sản phẩm" (U1), P02 và P02b dùng "ba mục tiêu", P02 nêu mục tiêu 2 trải qua phần 3 và 4 (238 → 214), P02b 150; ghi chú bài giảng không cần sửa (sáu mục tiêu chi tiết đã gồm định lý điểm cực biên tối ưu và duyệt đỉnh kề); master chấp nhận |
| U3 | nhẹ | A04 | chủ ngữ "vài điểm" không thể "chứng minh" | R2 | chấp nhận | đã sửa: khung "Chỉ so sánh $z$ giữa phương án khả thi; so sánh vài điểm không chứng minh được điểm nào tối ưu." (39 → 40 âm tiết, 3 dòng, dòng dài nhất 20; bỏ "các" để giữ trần 20 âm tiết mỗi dòng); ghi chú diễn giả và ghi chú bài giảng đã dùng đúng câu "so sánh vài điểm không chứng minh được", không cần sửa; master chấp nhận |
| U4 | trung bình | A05, A05b | dạy lại định nghĩa LP Bài 02 không có "Nhắc lại:"; "Lưu ý:" tổng quát trên trang ví dụ; "Lưu ý:" A05 thiếu chủ ngữ | R1 B-1, B-10; R2 | chấp nhận | đã sửa: A05 tiêu đề "Quy hoạch tuyến tính dạng ma trận", "**Nhắc lại:** quy hoạch tuyến tính (linear programming, LP) có mục tiêu và hữu hạn ràng buộc đều tuyến tính." (viết lại để dòng ≤ 20 âm tiết), dạng ma trận giữ, thêm "**Giả thiết:** tỉ lệ và cộng tính; biến nhận giá trị thực.", "**Lưu ý:** bài toán có … không phải là LP."; 56 → 51 âm tiết, 5 dòng. A05b bỏ "Lưu ý:", "**Diễn giải:**" là dòng cuối; 43 → 27. Ghi chú bài giảng Mục 1.2: câu dẫn trước Định nghĩa 07.1 nhắc lại Định nghĩa 02.9 của Bài 02; thêm đoạn ba giả thiết mô hình (tỉ lệ, cộng tính, biến thực) trước hai phản ví dụ; outline đổi tiêu đề A05; master chấp nhận |
| U5 | trung bình | A07 | trùng Bài 02 S02-06; $r_i$ dùng trước khi định nghĩa | R1 B-2, R2 | giữ trang, gắn "Nhắc lại:", thêm "Diễn giải:" về $n+m$ biến, $2m$ ràng buộc; ví dụ $\lvert x-1\rvert+\lvert x-3\rvert$ vào ghi chú; bác bỏ phương án hồi quy minimax (Bài 02 đã có) và phương án bỏ trang | đã sửa: dòng "Với $a_i,x\in\mathbb R^n$, $b_i\in\mathbb R$, $i=1,\ldots,m$: phần dư $r_i$, biến phụ $t_i\ge0$." lên đầu trang; "**Nhắc lại:** $\lvert r\rvert=\min\{t: t\ge r, t\ge-r\}$"; dòng cuối "**Diễn giải:** biến $(x,t)\in\mathbb R^{n+m}$, $2m$ ràng buộc tuyến tính; đây là LP, nên mọi kết quả về đa diện áp dụng được." (19 âm tiết; "điểm cực biên" để trong ghi chú vì dòng đủ ý sẽ vượt 20 âm tiết); ví dụ $\lvert x-1\rvert+\lvert x-3\rvert$ vào ghi chú; 31 → 43 âm tiết, 5 dòng; ghi chú 269 → 199. Ghi chú bài giảng Mục 1.3: thêm câu nhắc lại Bài 02 (Bổ đề 02.14, Định lý 02.15) và lý do nhắc lại; đã đồng bộ; master chấp nhận |
| U5b | nhẹ | A07 (deck) | deck A07 dùng $a_i,b_i,m$ cho dữ liệu hồi quy, trùng chữ với dữ kiện ràng buộc ($A\in\mathbb R^{m\times n}$ ở A05) và lệch bảng ký hiệu của ghi chú bài giảng ($h_i,y_i,M$) | master (sau U5) | ban đầu yêu cầu đổi học liệu sang $a_i,b_i,m$; tác tử biên tập báo xung đột với quy ước "mỗi chữ một nghĩa" của chương; master chọn phương án (A): đổi deck, giữ học liệu | đã sửa: A07 mặt trang "Với $h_i,x\in\mathbb R^n$, $y_i\in\mathbb R$, $i=1,\ldots,M$: phần dư $r_i=h_i^Tx-y_i$ …", công thức theo $h_i,y_i,M$, "**Diễn giải:** biến $(x,t)\in\mathbb R^{n+M}$, $2M$ ràng buộc tuyến tính …"; ghi chú "$M$ mẫu", ví dụ $n=1$, $M=2$, $h_1=h_2=1$, $y_1=1$, $y_2=3$ (khớp Ví dụ 07.4); alt hình không chứa các ký hiệu này; A08, A09 không dùng; storyboard (bản đồ hành trình, dòng A07) và outline (mục ký hiệu) theo; 43 âm tiết, không đổi; học liệu không đổi; master chấp nhận |
| U5c | trung bình | A07 (mặt trang, ghi chú), lecture-note Mục 1.3, storyboard A07 | tái kiểm R1 #1, R2: "đây là LP, nên mọi kết quả về đa diện áp dụng được" sai khi có $d\ne0$ với $h_i^Td=0$ mọi $i$ (miền chứa đường thẳng, không có điểm cực biên) | tái kiểm mạch 2: R1 (`a78e236a47ecc5de6`), R2 (`a09e96e8aac640521`), Opus 5.5, high | master chấp nhận: "Diễn giải:" chỉ khẳng định bài toán là LP; ghi chú và lecture-note nêu kết luận có điều kiện | đã sửa: "**Diễn giải:** biến $(x,t)\in\mathbb R^{n+M}$, mục tiêu và $2M$ ràng buộc đều tuyến tính, nên bài toán là một LP."; ghi chú A07 và Mục 1.3: các kết quả phần 3–4 áp dụng khi đủ giả thiết; miền không chứa đường thẳng khi và chỉ khi các $h_i^T$ có hạng $n$; khi đó có điểm cực biên, mục tiêu không âm nên giá trị tối ưu hữu hạn (đã kiểm: hướng $(d,\delta)$ thuộc miền theo cả hai chiều buộc $\delta=0$, $Hd=0$); master chấp nhận |
| U5c | nhẹ | A07 | tái kiểm R1 #2: "biến phụ $t_i\ge0$" khai báo trước nhu cầu; công thức nằm ngoài phạm vi nhãn "Nhắc lại:" | R1 | master chấp nhận | đã sửa: dòng 1 chỉ khai báo $h_i,x,y_i,M$, $r_i$; "**Nhắc lại:** $\lvert r\rvert=\min\{t: t\ge r, t\ge-r\}$; thay mỗi $\lvert r_i\rvert$ bằng biến phụ $t_i$." đặt ở cột phải dưới "Nhu cầu:", ngay trên công thức (bản đầu đặt dưới khối hình tràn khung 940 > 864 px, master yêu cầu sửa); 43 âm tiết, 5 dòng; vcheck 1600×900 contentBottomRel 830 ≤ 864; master chấp nhận |
| U5c | nhẹ | A01 (ghi chú), storyboard (bản đồ hành trình "Mô hình LP", dòng A05, A05b) | tái kiểm R1 #3: chưa đồng bộ việc A05 là "Nhắc lại:" | R1 | master chấp nhận | đã sửa: ghi chú A01 "…rồi viết gọn bằng dạng ma trận của quy hoạch tuyến tính đã định nghĩa ở Bài 02."; ô Hình thức "A05 (nhắc lại định nghĩa Bài 02; dạng ma trận và giả thiết …)"; cột lý do A05, A05b sửa; master chấp nhận |
| U5c | trung bình | lecture-note Mục 1.2 | tái kiểm R2: đoạn ba giả thiết mới lặp Nhận xét 07.3; câu dẫn trước Nhận xét thừa; "ta" ở câu kế hoạch | R2 | master chấp nhận | đã sửa: đoạn thay bằng một câu dẫn tới Nhận xét 07.3 ("chúng ta"); câu dẫn trước Nhận xét bỏ vế "nên chúng ta nêu rõ các giả thiết đó trong nhận xét sau" (giữ hai câu làm câu dẫn vào khối); master chấp nhận |
| U5c | nhẹ | lecture-note Mục 1.2 dòng ~148 | tái kiểm R2: định nghĩa làm chủ ngữ, lặp câu dòng 74 | R2 | master chấp nhận | đã sửa: "Chúng ta viết lại Định nghĩa 02.9 của Bài 02 ở dạng ma trận theo chiều cực đại; dạng này được dùng xuyên suốt chương."; "trước hết ta tách" → "trước hết chúng ta tách"; master chấp nhận |
| U5c | nhẹ | A05 | tái kiểm R2: "Giả thiết:" và "Lưu ý:" trùng ý; "tỉ lệ", "cộng tính" là từ trơ | R2 | master chấp nhận | đã sửa: "**Giả thiết:** tỉ lệ (không có $x_1^2$), cộng tính (không có $x_1x_2$), biến nhận giá trị thực (không có biến nguyên)."; 51 → 43 âm tiết, 4 dòng; master chấp nhận |
| U5c | nhẹ | A05, Z01, Nhận xét 07.3 | tái kiểm R2: một giả thiết ba tên ("biến nhận giá trị thực", "biến liên tục", "chia được") | R2 | master chấp nhận; Z01 sửa ở U32 | đã sửa phần học liệu: tiêu đề khối "**Biến nhận giá trị thực (chia được).**"; tóm tắt chương (dòng ~2279) "biến nhận giá trị thực"; Z01 chờ U32; master chấp nhận |
| U5c | nhẹ | A05b | tái kiểm R2: "là một giới hạn" không chính xác, vế sau cụt | R2 | master chấp nhận | đã sửa: "**Diễn giải:** hàng $i$ của $A$ chứa hệ số của giới hạn $i$; $2x_1$ tỉ lệ với $x_1$, $2x_1+3x_2$ là tổng hai đóng góp."; ghi chú "chứa hệ số của giới hạn giờ máy"; 27 → 29 âm tiết; master chấp nhận |
| U5c | nhẹ | A07 (ghi chú), lecture-note Mục 1.3 | tái kiểm R2: thiếu câu đối chiếu ký hiệu Bài 02 ($X$, $w$, $N$) | R2 | master chấp nhận | đã sửa: câu đối chiếu trong ghi chú A07 và cuối đoạn đầu Mục 1.3; master chấp nhận |
| U5c | nhẹ | lecture-note Mục 2.1 | giọng: "ở đây ta nhắc lại" là câu kế hoạch | master | master yêu cầu | đã sửa: "ở đây chúng ta nhắc lại"; master chấp nhận |
| U5d | nhẹ | P02 | tái kiểm R2: thẻ 2 bỏ "kết cục", C10, C11 mất mục tiêu tương ứng; "trải qua" khó đọc | R2 | master chấp nhận | đã sửa: thẻ 2 "Chuyển về dạng chuẩn; tính nghiệm cơ sở khả thi; xác định kết cục và điểm cực biên tối ưu." (59 âm tiết, dòng dài nhất 20); ghi chú "Mục tiêu hình học đa diện ứng với phần 3 và phần 4, gồm ba thao tác: …, và xác định kết cục của bài toán cùng điểm cực biên tối ưu, tìm bằng duyệt đỉnh kề khi đủ giả thiết …" (224 âm tiết); vcheck 1600×900 contentBottomRel 471, 0 lỗi; master chấp nhận |
| U6 | nhẹ | B02 | thiếu "Nhu cầu:"; ghi chú 253 âm tiết | R1 B-11, R2 | chấp nhận dạng R1 | đã sửa: dòng đầu "**Nhu cầu:** mô tả toàn bộ miền khả thi, không chỉ vài điểm." (42 → 55 âm tiết, 5 dòng, dòng dài nhất 14); ghi chú 253 → 199 (mở bằng nhu cầu, rút đoạn cơ chế chứng nhận, bỏ "Hình cho thấy"); ghi chú bài giảng không cần sửa (Mục 2.1 đã mở bằng nhu cầu loại vô số phương án và có Ví dụ 07.5); master chấp nhận |
| U7 | trung bình | B03 | dạy lại định nghĩa đa diện; ví dụ trên trang định nghĩa | R1 B-1, B-9 | chấp nhận | đã sửa: "**Nhắc lại:** đa diện (polyhedron) là tập nghiệm của hữu hạn bất phương trình tuyến tính …"; "**Định nghĩa.** $P$ **bị chặn** …" (phần mới); giữ gạch đầu dòng tính lồi và tập $\{x:Ax=b,x\ge0\}$ là đa diện; ví dụ hộp hạt bị chặn và tập không bị chặn chuyển vào ghi chú; tiêu đề "Đa diện và tính bị chặn" (thay "Định nghĩa đa diện", vì đa diện không còn là định nghĩa mới; không dùng "dạng chuẩn" vì B04 mới định nghĩa); 53 → 48 âm tiết, 5 dòng; ghi chú 184 → 198. Ghi chú bài giảng Mục 2.1: câu dẫn trước Định nghĩa 07.5 thêm quan hệ với Bài 02; đã đồng bộ; outline đổi tiêu đề; master chấp nhận |
| U8 | trung bình | B04 | bảng phép chuyển dạy lại Bài 02 S02-03b; ghi chú 265 âm tiết | R1 B-1, R2 | chấp nhận | đã sửa: dòng "**Nhắc lại:** ba phép chuyển ràng buộc và biến về dạng chuẩn." trước bảng; "Nhu cầu:" và định nghĩa giữ; 38 → 50 âm tiết; ghi chú 265 → 199; ghi chú bài giảng Mục 2.2: thêm tên "dạng chính tắc" và phân biệt biến bù với biến phụ $t_i$ (trước đó chưa có), đã đồng bộ; vcheck 1600×900 contentBottomRel 791, 0 lỗi; master chấp nhận |
| U9 | nhẹ | B05 | thiếu hình nhắc lại đỉnh; khung không nhãn; $n$ đổi nghĩa; mục tiêu dạng chuẩn không viết | R1 C-1, R2 | chấp nhận; hình mới `pentagon-edge-labels.svg` | đã sửa: hình mới `img/lec-07/pentagon-edge-labels.svg` (cùng hệ tọa độ $X=80+11x_1$, $Y=450-11x_2$ với `polyhedron-level-sets.svg`; năm đỉnh kiểm bằng tính toán; chữ 26 px như hình gốc; không dùng "nghiệm cơ sở"); mặt trang: "Viết dạng chuẩn … với biến bù $s_i\ge0$.", hệ phương trình | hình, "$\bar A=[A\ I]$, $\operatorname{rank}(\bar A)=3$, $n=5$ (đếm cả ba biến bù); mục tiêu giữ nguyên, $c=(2,3,0,0,0)$.", "**Diễn giải:** hai biến bù bằng $0$ là hai ràng buộc hoạt động, cắt nhau tại đỉnh $(30,12)$."; ma trận $\bar A$ đầy đủ chuyển vào ghi chú (quyết định cho phép); 36 → 32 âm tiết, 4 dòng; CSS mới phạm vi Bài 07 cho ảnh B05 (max-height 300px); ghi chú 247 → 178; ghi chú bài giảng Ví dụ 07.7: thêm hình và câu "mục tiêu giữ nguyên với $c=(2,3,0,0,0)$"; đã đồng bộ, hình tải được trong trình xem; vcheck 1600×900 contentBottomRel 840 ≤ 864, 0 lỗi; master chấp nhận |
| U10 | nhẹ | B06 | viết tắt BFS không dùng lại, trùng tìm kiếm theo chiều rộng | R2 | chấp nhận | đã sửa: "(basic feasible solution, BFS)" → "(basic feasible solution)" trên mặt trang B06 và Định nghĩa 07.10 của ghi chú bài giảng (dòng ~616); grep "BFS" trong deck, lecture-note, exercises: 0; đã đồng bộ; 56 → 55 âm tiết; vcheck 1600×900 contentBottomRel 640, 0 lỗi; master chấp nhận |
| U11 | nhẹ | B07 | không nói $A_B$ lấy cột của $\bar A$ | R2 | chấp nhận | đã sửa: "**Câu hỏi:** xét hệ dạng chuẩn, thứ tự cột $(x_1,x_2,s_1,s_2,s_3)$ của $\bar A$; $A_B$ gồm các cột của $\bar A$ có chỉ số thuộc $B$:"; 27 → 35 âm tiết, 4 dòng; exercises.md (bài nghiệm cơ sở hộp hạt) thêm câu định nghĩa $\bar A$ và $A_B$, đã đồng bộ; vcheck 1600×900 contentBottomRel 600, 0 lỗi; master chấp nhận |
| U12 | nhẹ | B07b | nghiệm cơ sở là giao hai đường biên chỉ có bằng lời | R1 C-2, R2 | chấp nhận; hình mới `basic-solutions-boxes.svg` | đã sửa: hình mới `img/lec-07/basic-solutions-boxes.svg` (tỉ lệ 10 px/đơn vị, $X=70+10x_1$, $Y=380-10x_2$, cùng phông 26 và màu với `pentagon-edge-labels.svg`; liệt kê đủ mười tập $B$ bằng phép tính phân số: 5 khả thi, 3 không khả thi $(30,20)$, $(54,0)$, $(0,27)$, 2 không khả nghịch $\{x_1,s_1,s_3\}$, $\{x_2,s_2,s_3\}$, khớp bảng Bài tập 07.4); B07b: lưới [lời giải | hình], "Diễn giải:" toàn bề rộng; CSS ảnh B07b max-height 290px; 23 âm tiết; ghi chú 149 → 181; hình chèn vào lời giải Bài tập 07.4 trong lecture-note và exercises.md, đã đồng bộ, tải được trong trình xem; vcheck 1600×900 contentBottomRel 834 ≤ 864, 0 lỗi; master chấp nhận |
| U12b | nhẹ | lecture-note Mục 2.1 (dòng ~404) | "đường mức (level set)" lệch deck B02 "(level curve)" (quyết định liên bài 2026-10-12) | tác tử biên tập phát hiện khi làm U12 | master yêu cầu sửa | đã sửa: "(level set)" → "(level curve)"; grep "level set" trong deck, lecture-note, exercises.md và SVG Bài 07: 0; đã đồng bộ; master chấp nhận |
| U13 | trung bình | C01 | dòng dẫn chỉ nêu nửa câu hỏi của mạch | R1 B-3 | chấp nhận | đã sửa: dòng dẫn "Muốn thay miền khả thi bằng hữu hạn đỉnh, cần định nghĩa đỉnh, điều kiện có đỉnh tối ưu và cách duyệt đỉnh." (23 âm tiết ≤ 25); ghi chú nêu ba phần việc theo thứ tự trang (định nghĩa đỉnh, hai giả thiết, duyệt đỉnh kề), 93 âm tiết; ghi chú bài giảng không cần sửa (Mục 3 và Mục 4 đã mở bằng các câu hỏi tương ứng); vcheck 1600×900 contentBottomRel 471, 0 lỗi; master chấp nhận |
| U14 | trung bình | C02 | thiếu "Nhu cầu:" | R1 B-3, R2 | chấp nhận dạng R1 | đã sửa: dòng đầu "**Nhu cầu:** tiêu chuẩn nhận ra đỉnh trong $\mathbb R^n$ chỉ bằng phép toán vector."; 37 → 50 âm tiết, 5 dòng, dòng dài nhất 19; ghi chú 260 → 196 (phép kiểm $v$ rút gọn, dẫn tới Ví dụ 07.10); ghi chú bài giảng không cần sửa (Mục 3 mở bằng câu hỏi định nghĩa đỉnh cho mọi số chiều); vcheck 1600×900 contentBottomRel 719, 0 lỗi; master chấp nhận |
| U12c | trung bình | B04 (mặt trang "Nhắc lại:", ghi chú) | tái kiểm mạch 3 R1 #1: bảng nhắc lại có biến dư, cho là chưa dạy ở Bài 02 | R1 (`a78e236a47ecc5de6`, Opus 5.5, high) | **bác bỏ**: ghi chú bài giảng Bài 02 (dòng 575, 887) đã dùng biến dư (surplus variable) khi lập dạng chuẩn; nhãn "Nhắc lại:" đúng | không sửa |
| U12c | nhẹ | B05 | tái kiểm R1 #2, R2: "Diễn giải:" dùng "là" đồng nhất biến với ràng buộc, không nói ràng buộc nào, mất $s_2=8$ | R1, R2 (`a09e96e8aac640521`, Opus 5.5, high) | master chấp nhận | đã sửa: "**Diễn giải:** tại $(30,12)$, $s_1=s_3=0$: $x_1\le30$, $x_1+2x_2\le54$ hoạt động; $s_2=8$." (một dòng; bản theo quyết định chiếm hai dòng sát chân trang, master yêu cầu rút); để vừa khung, dòng $\bar A$ rút còn một dòng ("(đếm cả biến bù); mục tiêu $c=(2,3,0,0,0)$"; "giữ nguyên" chuyển vào ghi chú, ghi chú đã nêu biến bù có hệ số mục tiêu $0$); 18 âm tiết; vcheck 783/864; master chấp nhận |
| U12c | nhẹ | B03 | tái kiểm R2: định nghĩa "bị chặn" lẫn giữa hai gạch nhận xét; R1 #3: ghi chú chưa nêu vai trò của tính bị chặn | R1, R2 | master chấp nhận; không đưa ví dụ lại mặt trang | đã sửa: định nghĩa thành dòng riêng dưới công thức; ghi chú thêm "Tính bị chặn được dùng ở phần 4: đa diện khác rỗng và bị chặn không chứa đường thẳng, và trên nó mục tiêu tuyến tính có giá trị tối ưu hữu hạn."; vcheck 655/864; master chấp nhận |
| U12c | nhẹ | B07b | tái kiểm R1 #4: "Diễn giải:" lặp câu 2, chưa nói ý chính của hình | R1 | master chấp nhận | đã sửa: "**Diễn giải:** tám nghiệm cơ sở là giao các đường biên; năm nghiệm khả thi là năm đỉnh."; chi tiết $(30,20)$ vào ghi chú; vcheck 825/864; master chấp nhận |
| U12c | nhẹ | B04 (ghi chú), lecture-note Mục 2.2 | tái kiểm R2: "Bảng nhắc lại…" (bảng làm chủ ngữ); "giáo trình tiếng Việt thường gọi…" là quy kết mơ hồ | R2 | master chấp nhận | đã sửa: ghi chú B04 "Ba phép chuyển trong bảng là các phép của Bài 02 (Mệnh đề 02.10)." (đã kiểm số mệnh đề trong `materials/lec-02/lecture-note.md`); lecture-note "…và một số tài liệu khác gọi dạng (2.2) là "dạng chính tắc"; trong chương này, dạng chuẩn luôn là (2.2)."; câu tên gọi không thêm vào ghi chú B04 vì ghi chú sẽ vượt 200 âm tiết; master chấp nhận |
| U12c | nhẹ | lecture-note Mục 2.1 | tái kiểm R2: câu dẫn không đứng ngay trước Định nghĩa 07.5; nửa không gian thuộc Bài 01 | R2 | master chấp nhận | đã sửa: đoạn kết bằng "Chúng ta nhắc lại các khái niệm đó và bổ sung khái niệm đa diện bị chặn trong định nghĩa sau."; dẫn Bài 01 (Mệnh đề 01.19(c), đã kiểm trong `materials/lec-01/lecture-note.md`); master chấp nhận |
| U12c | nhẹ | lecture-note, exercises (lời giải Bài tập 07.4); lecture-note Ví dụ 07.7 | tái kiểm R2: hai hình mới chèn vào không có câu dẫn | R2 | master chấp nhận | đã sửa: Bài tập 07.4 (cả hai tệp) "Trên hình sau, mỗi nghiệm cơ sở là giao của hai đường biên: chấm đặc là năm nghiệm cơ sở khả thi, chấm rỗng là ba nghiệm cơ sở không khả thi."; Ví dụ 07.7 "Trên hình sau, hai cạnh tô đậm nằm trên $x_1=30$ ($s_1=0$) và $x_1+2x_2=54$ ($s_3=0$); chúng cắt nhau tại đỉnh $(30,12)$, nơi hai biến bù này cùng bằng $0$."; đã đồng bộ; master chấp nhận |
| U15 | trung bình | C03b | ví dụ trùng định thức $-2$ của B07b | R1 B-6, C-3; R2 | chấp nhận; dùng lại `standard-form-basis.svg` | đã sửa: bỏ dòng "Ví dụ." và định thức $-2$ (trùng B07b); "**Chứng minh.** Cột của thành phần dương độc lập; mỗi tập $m$ cột trong $\binom nm$ tập cho tối đa một điểm." (19 âm tiết); hình `standard-form-basis.svg` (chữ đúng thuật ngữ hiện hành; trong trang chữ hiển thị khoảng 15–19 px ở 1600×900) với alt đầy đủ; CSS ảnh C03b max-height 320px; 41 → 37 âm tiết; ghi chú nêu chứng minh đầy đủ và nhắc lại $B=\{x_1,x_2,s_2\}$, 150 âm tiết; ghi chú bài giảng không cần sửa (Hệ quả 07.16 có chứng minh); vcheck 1600×900 contentBottomRel 835, 0 lỗi; master chấp nhận |
| U16 | nhẹ | C05 | tiêu đề không gọi tên khái niệm; câu định nghĩa thiếu "với" | R1 B-14, R2 | chấp nhận | đã sửa: tiêu đề "Đa diện chứa đường thẳng"; định nghĩa "… có $x\in P$ và $d\ne0$ sao cho $x+td\in P$ với mọi $t\in\mathbb R$."; 44 → 46 âm tiết; outline đổi tiêu đề; ghi chú bài giảng Định nghĩa 07.18 sửa cùng cấu trúc câu ("sao cho … với mọi"), đã đồng bộ; vcheck 1600×900 contentBottomRel 450, 0 lỗi; master chấp nhận |
| U17 | nhẹ | C05b | "Chứng minh." chỉ chứng minh hệ quả | R2 | chấp nhận | đã sửa: "**Chứng minh** (hệ quả). Nếu $x+td\ge0$ với mọi $t\in\mathbb R$ thì $d=0$, nên đa diện dạng chuẩn không chứa đường thẳng."; 48 → 52 âm tiết, dòng dài nhất 20; ghi chú bài giảng không cần sửa (Hệ quả 07.21 có chứng minh riêng); vcheck 1600×900 contentBottomRel 493, 0 lỗi; master chấp nhận |
| U18 | nhẹ | C06 | bốn kết cục chỉ có trong hình | R2 | chấp nhận | đã sửa: dòng "không khả thi ($P=\emptyset$); mục tiêu không bị chặn trên $P$; tối ưu duy nhất; nhiều nghiệm tối ưu." dưới câu "Mỗi LP rơi vào đúng một trong bốn kết cục (outcome):"; 29 → 46 âm tiết; quy tắc CSS sẵn có của C06 đổi max-height 360 → 320px (trước khi đổi: 888 px, tràn); ghi chú bài giảng không cần sửa (Mục 4.3 có đủ bốn kết cục); vcheck 1600×900 contentBottomRel 840, 0 lỗi; master chấp nhận |
| U19 | trung bình | C07 | "Ý nghĩa:" chung chung; "Ví dụ." trùng hình C09 | R1 B-9, C-4; R2 | chấp nhận; bác bỏ hình thu nhỏ `conceptual-vertex-walk.svg` (R2) và hình H3 (R1), vì C09 đã có đủ năm giá trị | đã sửa: "**Ý nghĩa:** một nghiệm tối ưu nằm trong tập điểm cực biên; với dạng chuẩn, tập này hữu hạn." (rút "đa diện" để dòng 19 âm tiết); dòng "Ví dụ." năm đỉnh chuyển vào ghi chú; 52 → 47 âm tiết, 3 dòng; ghi chú 227 → 231; ghi chú bài giảng không cần sửa (Hệ quả 07.14 cho hữu hạn điểm cực biên với mọi đa diện, mạnh hơn câu trên mặt trang); vcheck 1600×900 contentBottomRel 379, 0 lỗi; master chấp nhận |
| U20 | trung bình | C04 | ví dụ giới hạn định lý đứng trước định lý; hộp lặp gạch đầu dòng | R1 B-5, R2 | chấp nhận dạng R1; chuyển C04 sau C07 | đã sửa: C04 chuyển ra sau C07, trước C07b (thứ tự mạch 4: C01, C02, C03, C03b, C05, C05b, C06, C07, C04, C07b, …); "**Diễn giải:** định lý chỉ bảo đảm một nghiệm tối ưu là điểm cực biên, không phải mọi nghiệm." (viết gọn để dòng 18 âm tiết; câu đủ ý theo quyết định dài 25); hai gạch đầu dòng về cạnh và $(1,1)$ gộp; 47 → 43 âm tiết; câu nối ghi chú: C03b kết bằng "đa diện nào có điểm cực biên và quan hệ … với nghiệm tối ưu" (đã có, dẫn sang C05), C04 mở bằng định lý và kết bằng nhu cầu đi giữa các đỉnh, C07 dẫn tới "ví dụ nhiều nghiệm tối ưu kế tiếp", C07b mở bằng định lý và ví dụ; C05 ghi chú không đổi (đã khớp sau C03b); storyboard (bảng từng trang, bản đồ hành trình) và outline cập nhật thứ tự; liên kết `#/4/14`, `#/4/15`, `#/4/16` trong exercises.md (C10, C11, C11b) không đổi vì C04 vẫn trong mạch 4 và trước C10; index.html không dẫn số trang Bài 07; ghi chú bài giảng không đổi (Mục 4.1 dùng ví dụ nhiều nghiệm làm nhu cầu cho dạng phát biểu "tồn tại một điểm cực biên tối ưu" ở Mục 4.2, không phải giới hạn sau định lý); vcheck C04 740/864, C07 379, C07b 541, 0 lỗi. Kèm theo: gỡ bốn câu "Sửa (2026-10-22, …)" bị chèn nhầm vào bảng "Mật độ mặt trang trước và sau" của storyboard (dòng B06, C01, C05, C07, do script trước khớp nhầm tiền tố dòng; nội dung đúng vẫn ở bảng từng trang); master chấp nhận |
| U21 | trung bình | C07b | thiếu nhu cầu; dòng định nghĩa 25 âm tiết; ví dụ chỉ bằng lời | R1 B-4, C-5; R2 | chấp nhận; hình mới `pentagon-adjacent.svg` | đã sửa: "**Nhu cầu:** số điểm cực biên có thể tới $\binom nm$; cần đi sang đỉnh tốt hơn thay vì liệt kê." (19 âm tiết); "**Định nghĩa.** Hai điểm cực biên $v\ne w$ của $P\subset\mathbb R^n$ **kề nhau** nếu có chung $n-1$ ràng buộc hoạt động độc lập tuyến tính." (20 âm tiết, trước 25); hình mới `img/lec-07/pentagon-adjacent.svg` ($(30,0)$ tô đậm, hai cạnh $x_2=0$, $x_1=30$ tô đậm với nhãn "kề" ở $(0,0)$, $(30,12)$, $(14,20)$ nhạt, nét đứt "không kề"; tọa độ $X=80+11x_1$, $Y=450-11x_2$ kiểm lại; bbox nhãn không chồng, nhãn "không kề" dời vào trong miền để không cắt cạnh xiên) thay dòng "Ví dụ."; "Dạng khác:" và công thức (viết `aligned` hai dòng) giữ; 55 → 58 âm tiết, 4 dòng; ghi chú 218 → 192; ghi chú bài giảng sau Định nghĩa 07.28 thêm câu dẫn và hình, đã đồng bộ, hình tải được trong trình xem; vcheck 1600×900 contentBottomRel 770, 0 lỗi; master chấp nhận |
| U22 | trung bình | C07c | "Ví dụ." trùng bước 2 của C09 | R1 B-9 | chấp nhận | đã sửa: dòng "Ví dụ." chuyển vào cuối ghi chú; 54 → 41 âm tiết, 3 dòng; ghi chú 242 → 229 (bỏ nhắc "nón tiếp tuyến", rút câu pivot và quay vòng); ghi chú bài giảng không cần sửa (Ví dụ duyệt đỉnh kề đã có bước này); vcheck 1600×900 contentBottomRel 326, 0 lỗi; master chấp nhận |
| U23 | nhẹ | C09 | thiếu "Diễn giải:"; tiêu đề vụng; ghi chú 256 âm tiết | R1 B-13, R2 | chấp nhận | đã sửa: tiêu đề "Ví dụ: duyệt đỉnh kề trên bài toán hộp hạt"; "**Diễn giải:** đỉnh dừng $(30,12)$ có $z^*=96$; bổ đề đỉnh kề cải thiện bảo đảm đỉnh dừng tối ưu."; 33 → 50 âm tiết, 5 dòng; ghi chú 256 → 193, bỏ "Ví dụ hộp hạt cho thấy…" và "Hình ghi…" làm chủ ngữ; outline đổi tiêu đề; storyboard: cột lý do C07 và C07c chỉnh cho khớp (ví dụ đã vào ghi chú, bỏ "nón tiếp tuyến" theo yêu cầu master sau U22); ghi chú bài giảng không cần sửa; vcheck 1600×900 contentBottomRel 720, 0 lỗi; master chấp nhận |
| U24 | nhẹ | C11, C11b | thiếu hình; ghi chú gọi "tổng hợp"; C11b thiếu "Diễn giải:" | R1 B-13, B-17, C-6, C-7; R2 | chấp nhận; hình mới `pentagon-vertices.svg`, `multiple-optima-boxes.svg` | đã sửa: hai hình mới cùng hệ tọa độ `pentagon-edge-labels.svg` (kiểm: năm điểm trên $2x_1+4x_2=108$ gồm $(30,12)$, $(14,20)$, $(22,16)$ và hai đầu nét đứt $(6,24)$, $(46,4)$ đều cho $108$; mũi tên $(30,-60)$ px ∝ $c=(2,4)$, vuông góc cạnh vì $30\cdot176-60\cdot88=0$; bbox nhãn không chồng, nhãn $(14,20)$ dời vào miền để không cắt nét đứt). C11: dòng "Năm đỉnh" thay bằng `pentagon-vertices.svg` (46 → 44 âm tiết); ghi chú bỏ "tổng hợp". C11b: "**Lời giải:** tập nghiệm tối ưu $\{x: x_1+2x_2=54, 14\le x_1\le30\}$." (khối công thức riêng bỏ để vừa khung), lưới [lời giải | `multiple-optima-boxes.svg`], "**Diễn giải:** thuật toán trả về một điểm cực biên tối ưu, không trả về cả cạnh."; CSS lưới C11b 1.25fr/0.75fr; 35 → 56 âm tiết, 5 dòng. Học liệu: hình và câu dẫn thêm vào lời giải Bài tập 07.7 (lecture-note, exercises); tiêu đề Bài tập 07.7 bỏ "Bài tập tổng hợp:", exercises bỏ "bài tổng hợp" ở dòng mức độ; đã đồng bộ, hình tải được. Storyboard C11, C11b bỏ "tổng hợp". vcheck 1600×900: C11 733, C11b 804, 0 lỗi; master chấp nhận |
| U25 | trung bình | D01b | "Nhu cầu:" nêu tính chất, không nêu câu hỏi; ô bảng dùng khái niệm chưa định nghĩa | R1 B-15, R2 | chấp nhận dạng R1 cho "Nhu cầu:"; ô bảng "chi phí nhỏ nhất từ mỗi trạng thái tới đích" | đã sửa: "**Nhu cầu:** tối ưu chuỗi quyết định mà không liệt kê từng chuỗi."; ô bảng "chi phí nhỏ nhất từ mỗi trạng thái tới đích"; ghi chú dùng cùng cụm thay "chi phí tối ưu còn lại"; 56 → 57 âm tiết; ghi chú bài giảng không cần sửa (tên "chi phí tối ưu còn lại" là tên chính thức của $J_k$, định nghĩa tại dòng ~1688; trước đó chỉ xuất hiện trong bảng ký hiệu và câu kế hoạch đầu Mục 5); vcheck 1600×900 contentBottomRel 469, 0 lỗi |
| U26 | trung bình | D02 | nhãn $J(C)=3$ trước định nghĩa $J$; câu "Trực quan." và định nghĩa trạng thái khó đọc; ghi chú 278 âm tiết | R2 | chấp nhận | chưa sửa |
| U27 | nhẹ | D03 | hộp không nhãn "Diễn giải:"; ghi chú 287 âm tiết | R2 | chấp nhận | chưa sửa |
| U28 | trung bình | D04 | thiếu trạng thái đầu $x_0$; nhắc đồ thị tầng bằng lời | R1 C-8, R2 | chấp nhận; dùng lại `dp-layered-graph.svg` nếu vừa khung | chưa sửa |
| U29 | nhẹ | D04b | "Ý nghĩa:" đọc lại công thức | R1 B-18 | chấp nhận | chưa sửa |
| U30 | nhẹ | D06b | lời giải không có hình giá trị mới | R1 C-9 | chấp nhận; hình mới `dp-bellman-values-new-costs.svg` | chưa sửa |
| U31 | nhẹ | Z00 (ghi chú) | "bốn sản phẩm" lệch "ba mục tiêu" | R1 B-12 | chấp nhận | chưa sửa |
| U32 | trung bình | Z01 | vấn đề trung tâm chỉ được trả lời trong ghi chú | R1 B-8 | chấp nhận nếu tổng ≤ 80 âm tiết | chưa sửa |
| U33 | nhẹ | Z01b | câu 3 nhắc đồ thị tầng bằng lời | R1 C-10 | chấp nhận dạng R1 (`dp-state-sufficiency.svg`); bác bỏ `dp-layered-graph.svg` (R2) | chưa sửa |
| chung | nhẹ | ghi chú nhiều trang | ghi chú > 250 âm tiết; "Ví dụ này cho thấy", "Hình cho thấy" làm chủ ngữ | R1, R2 | rút về ≤ 200 và bỏ mẫu chủ ngữ này trên các trang được sửa | chưa sửa |
| — | nhẹ | B06b, D05b | ví dụ trên trang phát biểu, chưa ghi ngoại lệ chu trình rút gọn trong storyboard | R1 B-9 | chấp nhận ghi ngoại lệ chu trình rút gọn cho D05b (phân tích chi phí là hệ quả của quy trình D05, không phải khái niệm lõi mới); B06b đã có ngoại lệ trong storyboard | đã sửa: ghi ngoại lệ D05b vào storyboard, mục "Quyết định cấu trúc" |
