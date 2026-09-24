# Nhật ký rà soát Bài giảng 04 — triển khai mạch KKT

## Trạng thái triển khai ngày 2026-09-25

Người dùng đã phê duyệt đầy đủ bản đề xuất KKT và yêu cầu triển khai, đồng bộ tài liệu, kiểm định, commit riêng rồi push upstream hiện tại. Phần này ghi lần triển khai mới; các báo cáo proposal và các bản cũ bên dưới chỉ là lịch sử, không dùng làm bằng chứng HTML mới đã đạt.

Điều phối viên đã đọc lại đề cương DOCX chính thức, kết quả KKT thực tế Bài03, AGENTS.md và skill build-math-slide-deck-outline; đã mở lại dự án Codex Slides hiện có để tiếp nhận đặc tả. Kế hoạch: reader lập kế hoạch → reader đối chiếu nguồn → các writer HTML theo mạch → writer hình → writer ghi chú → writer bài tập → kiểm kỹ thuật/hiển thị → gate storyboard mới → năm vai độc lập → editor riêng → các lượt rà lại đúng phạm vi → kiểm cuối → đồng bộ Codex Slides → commit/push. Các tác tử Codex phụ chỉ điều phối OpenRouter hoặc làm kiểm kỹ thuật; không thay các vai nội dung quy định.

### Phân xử trong khâu soạn

- Dùng KKT thật của Bài03: Lagrange và bốn nhóm điều kiện; tính lồi cho chiều đủ, điều kiện chính quy cho chiều cần. Bác ý mở rộng toàn bộ đối ngẫu yếu/bất đẳng thức vào mọi trang đẳng thức.
- Giữ nguyên các bản worker gốc trong scratch bị bỏ qua của kho; điều phối viên sửa các lỗi rõ trước hợp nhất. Metadata mô hình đúng được kiểm riêng, không thay kiểm nội dung.
- RG: sửa hệ số tái tính gradient về3,7; giải thích thành phần thứ hai đổi dấu và co chậm hơn. Thêm kiểm miền Armijo; ngưỡng nằm trên tiếp tuyến. Phân biệt124 là bình phương độ dài W,62 là giảm mô hình. Thu gọn chữ lặp và giữ cỡ chữ.
- RN: sửa cập nhật dùng t, không dùng alpha; hiện phép trừ giảm mô hình; định nghĩa delta không âm. Hình mở đầu không lộ nghiệm mô hình trước khi sinh viên giải ở trang sau.
- RE: khôi phục vị trí định nghĩa N trước hệ rút gọn; z=-2 là điểm đầu, z=4 mới cực tiểu. Các số khả thi đều theo(16,-2),g(32,-10),d(-6,6),eta=-20,F266,delta²252. Hướng giảm nghiêm cần d khác0; ma trận khối không dùng Cholesky trực tiếp.
- RR: sửa gradient tại nghiệm thành(20,20), thêm các bước khử số; định nghĩa r và Delta trước công thức đạo hàm chuẩn. Đạo hàm nửa bình phương chuẩn là -||r||². Kiểm dung sai trước giải hệ, cập nhật giảm bước cảhai biến. Mệnh đề t=1 cho nu+=eta chỉ được dùng theo chiều đủ, tránh chiều đảo sai khi Delta-nu=0.
- RS: thay hình cũ chứa bộ số khác bằng tỷ số độ cong bằng2 trên toàn miền; sơ đồ affine dùng HTML. Bảo toàn lớp hàm không đồng nhất với bất biến tọa độ Newton.
- RZ: bác bản writer gán gradient cho tuyến tính hóa gradient và cột nhận bước ghi hướng. Sửa theo các phép suy ra đã duyệt; hệ học tổng quát phải giữ Mᵀy, nghiệmVD3là(10,4),nu=-20. Đưa đáp án khỏi mặt câu hỏi, sửa việc gán Parth Nobel cho sách năm 2004, bỏ mã nội bộ và sửa tên mục sách sai.

Các sửa trên đã đưa vào bản ghép 46 trang/7 mạch và bảy SVG đã tích hợp. Tài liệu công khai, năm vai độc lập, tác tử chỉnh sửa riêng và các lượt rà lại đã hoàn tất. Kết quả cuối cùng nằm ở mục “Kiểm định cuối sau chỉnh sửa” bên dưới; các trạng thái ở những mục lịch sử chỉ mô tả thời điểm tương ứng.

### Lượt lỗi và phục hồi

- Planner lần đầu bị `RuntimeError: OpenRouter transport error: [Errno -3] Temporary failure in name resolution` trong sandbox. Dừng đúng tiến trình và chạy lại cùng cầu nối/mô hình với mạng ngoài sandbox theo quyền người dùng đã cấp. Lượt lỗi không tính đạt.
- WriterRZ lượt đầu bị điều phối hủy sau hơn600giây không có đầu ra (SIGTERM,exit143). Đây là tác vụ treo bị hủy, không mô tả thành lỗi server; không tính đạt.
- WriterRZ lượt tiếp theo báo `model exceeded the tool-call limit (8)`. Không có fragment hợp lệ; thu hẹp prompt, truyền nội dung trực tiếp và chỉ cho ghi file. Lượt phục hồi cùng mô hình hoàn tất với finish_reason=stop; nội dung vẫn được sửa các lỗi nêu trên.

- Writer ghi chú toàn bài gặp `RuntimeError: OpenRouter request exceeded 180s wall timeout`; chưa ghi được thay đổi, đã chia ABC/DE/FG. FG sau đó gặp cùng lỗi tại yêu cầu thứ bảy; lưu toàn bộ partial, bác đoạn sai về bất biến affine và phục hồi từ bản gốc theo hai phần F/G. Các lượt lỗi không tính đạt; giữ cùng mô hình và cầu nối.

FG phục hồi lần hai đã ghi 13 thay thế nhưng tiếp tục gặp cùng lỗi timeout khi báo cáo cuối. Giữ bản đó để đối chiếu, điều phối sửa lỗi rõ; một continuation cùng writer/mô hình nhận bản tích hợp F–G, không gọi công cụ nối tiếp, hoàn tất sau 24,9 giây với `finish_reason=stop` và không đề nghị patch thêm. Metadata của continuation được ghi riêng; hai lượt lỗi vẫn giữ trạng thái lỗi.

## Kiểm định storyboard của bản triển khai

Lượt độc lập mới dùng HTML thật, phần kế hoạch hiện hành, KKT Bài 03 và bằng chứng kiểm kỹ thuật. Runtime: requested_model = observed_model = `z-ai/glm-5.3-flash`, provider = `OpenRouter`, finish_reason = `stop`; 131,6 giây. Đủ 46 quyết định có bằng chứng và ảnh hưởng lân cận, đủ sáu cụm hành trình. Hash HTML: `b6d70ff442cdb0306f94db8168eef9543d69cc3b45b2cad608942f48f248265e`.

| Trang | Quyết định reviewer | Bằng chứng | Ảnh hưởng lân cận |
|---|---|---|---|
| RP00 | giữ | Tiêu đề, nhiệm vụ dùng KKT đúng kế hoạch, không công thức | Nối RP01 đặt nhiệm vụ |
| RP01 | giữ | Hai cột 45/55, ví dụ hồi quy và ba thao tác như duyệt | RP02 nhận hai dạng KKT |
| RP02 | giữ | Bốn nhóm, hai cột rút gọn, phân biệt g với g(λ,ν) | RG02, RE03 dùng hai phương trình đích |
| RP03 | giữ | Sơ đồ phụ thuộc và ba đầu ra đánh giá đúng bố cục duyệt | RP04 kiểm điều kiện vừa nêu |
| RP04 | giữ | Điền Lagrange, KKT, kiểm Ad với d=(-6,6) | RG01 bắt đầu chọn hướng |
| RG01 | giữ | Bảng bốn dữ kiện VD1, g^Td, ratio55 như duyệt | RG02 giải bài con chọn hướng |
| RG02 | giữ | Q_I, KKT theo d, d_G=-g, ghi biến bài con | RG03 kiểm đạo hàm hướng |
| RG03 | giữ | Bảng hai hướng -820/16, cập nhật x+td đúng | RG04 lập quy tắc chọn t |
| RG04 | giữ | Lưu đồ bốn bước, bất đẳng thức Armijo, vai trò α,β | RG05 thực thi đúng thứ tự |
| RG05 | giữ | Bảng ba lần thử, số 2040,703/2,255/8 kiểm đúng | RG06 gom thành vòng lặp |
| RG06 | sửa | Câu định lý bước cố định t=1/L nằm trên mặt trang | RG07 không bị lệch mạch |
| RG07 | giữ | Nhãn t=1/4 trên mặt, co ¼x₁ và −¾x₂ đúng | RG08 nhu cầu thước đo W |
| RG08 | giữ | W=diag(3,7), bài con chuẩn đơn vị, Lagrange ζ | RG09 giải bốn nhóm KKT |
| RG09 | giữ | Ba bước dừng, bù trừ, nghiệm v đúng đại số | RG10 đổi độ dài thành d |
| RG10 | giữ | d=(-2,-4), d^TWd=124, mô hình Q_W tường minh | RG11 kiểm Wd=-g |
| RG11 | giữ | Hai vùng hỏi hệ và logic dừng Armijo, đáp án đủ | RN01 dùng độ cong biến thiên |
| RN01 | giữ | VD2 φ=s−log s, s0=1/4, g=-3, H=16 | RN02 giải điều kiện dừng mô hình |
| RN02 | giữ | Q_H, Hd=-g, d=3/16, s+=7/16 đúng | RN03 nối phương trình tối ưu |
| RN03 | giữ | ≈ giữ ý nghĩa, kiểm φ'(7/16)=-9/7≠0 | RN04 định nghĩa δ_N |
| RN04 | giữ | δ_N²=d^THd=-g^Td, giảm mô hình 9/32 đúng | RN05 đặt cạnh giảm thật |
| RN05 | giữ | Ba phép trừ có số, ngưỡng Armijo 9/160 đúng | RN06 vào thuật toán |
| RN06 | giữ | Giả mã năm bước, điều kiện H≻0, chi phí O(n³) | RN07 kiểm mô hình vs thật |
| RN07 | giữ | Điền φ'(s+), sai số log4−3/4, câu hỏi cận | RS01 thu hồi câu hỏi cận |
| RE01 | giữ | VD3, Lagrange, nghiệm (10,4), ν=-20, F*=140 | RE02 xét điểm đầu (16,-2) |
| RE02 | giữ | Bước (-16,2) phá tổng, điều kiện Ad=0 đúng | RE03 thêm ràng buộc Ad=0 |
| RE03 | giữ | L_m, hai đạo hàm cho g+Hd+A^Tη=0, Ad=0 | RE04 xếp thành ma trận khối |
| RE04 | giữ | Ma trận khối có nguồn gốc từng hàng, giả thiết đủ hạng | RE05 giải hệ trên VD3 |
| RE05 | giữ | d=(-6,6), η=-20, δ_eq²=252, giảm 126 kiểm đúng | RE06 đối chiếu khử biến |
| RE06 | giữ | N^THN=7, N^Tg=-42, Δz=6, cùng hướng d | RE07 đặt vào vòng lặp |
| RE07 | giữ | Giả mã, bảo toàn Au=b, g^Td=-d^THd<0 | RE08 kiểm phép suy ra |
| RE08 | giữ | Ba ô Lagrange/điều kiện/hệ rút gọn, đáp án đủ | RR01 đổi điểm đầu chưa khả thi |
| RR01 | giữ | u=(1,8), ν=4, r_d=(6,44), r_p=-5 đúng | RR02 tuyến tính hóa hai phương trình |
| RR02 | giữ | ≈ chỉ hàng gradient, Δν là ẩn mới, vế phải −r | RR03 lập hệ hai ẩn |
| RR03 | giữ | Bảng đối chiếu η với Δν, vế phải, giả thiết | RR04 giải số VD3 |
| RR04 | giữ | d=(9,-4), Δν=-24, ν+=-20, kiểm r=0 đúng | RR05 cần thước đo phần dư |
| RR05 | giữ | Phản ví dụ F tăng, đạo hàm chuẩn phần dư −‖r‖ | RR06 dùng làm tiêu chí nhận bước |
| RR06 | sửa | Dòng dừng đứng trước các bước giả mã | RR07 không bị ảnh hưởng mạch |
| RR07 | giữ | Hai lỗi vế phải -44 và 5, phân biệt η, Δν | RS01 quay lại câu hỏi RN07 |
| RS01 | giữ | δ=3/4, φ''=1/s² không bị chặn, nhu cầu kiểm | RS02 định nghĩa tự điều chỉnh |
| RS02 | giữ | Tỷ số =2 toàn miền, kiểm 128=2·16^{3/2} đúng | RS03 lập cận có giả thiết |
| RS03 | giữ | Cận −δ−log(1−δ), δ=3/4 cho 0,63629 đúng | RS04 nối phép khử biến |
| RS04 | giữ | Bảo toàn lớp qua affine, điều kiện dùng cận rút gọn | RS05 kiểm giả thiết và δ |
| RS05 | giữ | Hai hàm cùng đạo hàm, phân biệt δ với δ² đúng | RZ01 tổng hợp nguồn gốc |
| RZ01 | giữ | Bảng năm phương pháp theo bài con, hệ, nhận bước | RZ02 chuyển giao sang mô hình học |
| RZ02 | giữ | g,H,KKT, điền r_d,r_p, khôi phục VD3 đúng | RZ03 giao bài tập tự học |
| RZ03 | giữ | Bảng nhiệm vụ/sản phẩm, tài liệu §§5.5.3, 9.4–9.6 | Kết thúc, không mở mạch mới |

| Cụm | Kết luận reviewer | Căn cứ |
|---|---|---|
| Gradient và bước | đạt | RG01 nhu cầu→RG02 hình thức→RG03-05 ứng dụng→RG06 thuật toán→RG11 kiểm |
| Chuẩn bậc hai | đạt | RG07 nhu cầu thước đo→RG08-09 KKT→RG10 đổi độ dài, W dẫn trước chỗ dùng |
| Newton | đạt | RN01 nhu cầu xấp xỉ→RN02-04 hình thức→RN05-06 ứng dụng, RN07 kiểm mở câu hỏi |
| Newton khả thi | đạt | RE01-02 nhu cầu giữ tổng→RE03-04 KKT→RE05-06 giải hai cách→RE07 thuật toán |
| Newton phần dư | đạt | RR01 phần dư→RR02-03 tuyến tính hóa→RR04 giải→RR05 biện minh→RR06 thuật toán |
| Tự điều chỉnh | nhẹ | RS01 nhu cầu→RS02 ví dụ trước định nghĩa→RS03 cận→RS04 khử; RS05 kiểm giả thiết |

### Phân xử cổng triển khai

- **RG06 — giữ, không nhận gợi ý chuyển câu cấu hình xuống notes.** Mặt trang chỉ có một câu phân biệt bước cố định $t=1/L$ với quay lui; toàn bộ định lý, giả thiết và cận ở notes. Câu này cần để tránh nhầm quy tắc bước khi chuyển sang hình $t=1/4$ ở RG07; không tạo thêm tuyến định lý trên mặt trang.
- **RR06 — giữ, không nhận gợi ý chuyển tiêu chí dừng xuống sau giả mã.** Hộp trên nêu tiêu chí; bước 1 của giả mã tính hai phần dư và kiểm dừng trước khi giải hệ. Trình tự thực thi đúng. Đẩy điều kiện xuống có thể làm yếu thao tác kiểm trước giải hệ.
- **RS03/RS05 — đã đáp ứng nhắc $\delta$ khác $\delta^2$.** Căn không âm được định nghĩa ở RN04; cận dùng $\delta$, bài kiểm tra phân biệt biểu thức cận với điều kiện ngưỡng.
- **Bác câu phụ của reviewer gán kiểm số cho số trang.** 55 kiểm số chỉ đối chiếu số học; đủ 46 trang và 7 mạch được kiểm riêng bằng parser HTML. Không nhận câu này làm chứng cứ.

**Quyết định điều phối: đạt cổng để mở năm vai độc lập.** Không thay đổi HTML, thứ tự, vai trò hoặc bố cục sau phân xử này. Không có lỗi chặn bàn giao hoặc nghiêm trọng trong báo cáo cổng. Kiểm định này chưa thay thế năm vai và rà tài liệu công khai.

## Hoàn thiện tài liệu và khả năng đọc ngày 2026-09-25

- Ghi chú đã đổi sang cùng bảy mạch của trang chiếu; giữ phần chứng minh mở rộng và kiểm tra giả thiết. Tám bài tập yêu cầu tự lập bài con, Lagrange, đạo hàm, hệ và kiểm lại; đáp án nằm trong khối gập.
- Điều phối viên sửa lỗi của bản thảo trước rà độc lập: cận ở Bài 7 là $\log4-3/4$, không phải $\log4+3/4$; Bài 5 định nghĩa mô hình không hằng là chênh lệch $F(u+d)-F(u)$; Bài 6 phân biệt Taylor tổng quát với đẳng thức chính xác của ví dụ bậc hai; Bài 8 khôi phục đủ dữ kiện số và thống nhất $J$. Mọi bản worker gốc được giữ riêng, không gán các sửa này cho tác giả.
- Writer bài tập toàn phần A và lần sinh toàn Bài 5 gặp `RuntimeError: OpenRouter request exceeded 180s wall timeout`. Các lượt phục hồi được chia thành patch thân đề/gợi ý và lời giải, vẫn dùng cùng mô hình. JSON của patch Bài 7b có lỗi `Invalid \escape`; chỉ chuẩn hóa escape để đọc dữ liệu, sau đó điều phối sửa lỗi dấu bằng một bước riêng. Lượt lỗi và đầu ra không đúng hợp đồng không được tính đạt.
- Kiểm số độc lập: 55 phép đối chiếu số học đạt. Đây không phải bằng chứng thay cho kiểm định toán, số trang hoặc khả năng đọc.
- Bản HTML trước editor có SHA-256 `68b78788d83f8c556953b27f35796073e8a414bb946a5ae750e6db216bfde8d3`. Đã render 46 trang ở 1600×900 và 390×844; không lỗi ảnh, mạng, JavaScript hoặc KaTeX. Đủ 22 trạng thái fragment đều hiện xong trước khi chụp.
- Kiểm trực quan phát hiện nút điều hướng che câu kết khi cuộn ở màn hình hẹp. Đã tách vùng đọc vào phần tử con để tránh cơ chế Reveal đặt lại vị trí cuộn mỗi giây, dành 128px cho điều hướng. Kiểm 138 vị trí đầu/giữa/cuối không còn che chữ; 16 hộp ngang cuộn bằng bàn phím. RR05 giữ vị trí sau 1,3 giây, cả khi dùng bàn phím và chuỗi sự kiện cảm ứng CDP. Cảm ứng được kiểm bằng Chromium giả lập, chưa thử trên điện thoại vật lý.
- Kiểm toàn bộ công thức nguồn của hai Markdown mới: 818 biểu thức ghi chú và 597 biểu thức bài tập đều parse bằng KaTeX cục bộ. Kiểm viewer HTTP/file ở rộng/hẹp không có lỗi công thức, JavaScript, mạng hoặc tràn thân trang; lời giải gập mặc định, dùng Enter và mở khi in. Kết quả này kiểm cú pháp và chức năng, không tự xác nhận đúng toán.
- Đối chiếu nguồn bổ sung ngày 2026-09-25: trang đầu [bộ slide chính thức](https://web.stanford.edu/~boyd/cvxbook/bv_cvxslides.pdf) ghi Stephen Boyd, Lieven Vandenberghe và Parth Nobel là tác giả bản sửa. Tên Nobel trong dàn ý là đúng cho bộ slide này; sách *Convex Optimization* (2004) có hai tác giả Boyd và Vandenberghe. Không tải thêm tài nguyên MIT và không tạo ngoại lệ raster.

## Năm vai rà độc lập của bản triển khai

Các vai nhận bản HTML `68b78788…`, ghi chú `c04477894f…` và bài tập `6f858c9521…` theo phạm vi tương ứng; không dùng báo cáo của bản cũ. Mỗi vai chạy trong tiến trình độc lập. Metadata của cả năm lượt hợp lệ đều là `requested_model = observed_model = z-ai/glm-5.3-flash`, `provider = OpenRouter`, `finish_reason = stop`. Mỗi báo cáo đủ phạm vi, vấn đề có bằng chứng và giới hạn; vai toán không phát hiện vấn đề. Bản thô, log và báo cáo đã kiểm cấu trúc nằm tại `openrouter-mcp/tmp/lec04-kkt-implementation/review-snapshots/implementation-full-r2/reports/` (chuyên gia) và `implementation-full-r3/reports/` (bốn vai còn lại).

| Vai | Thời gian lượt hợp lệ | Phạm vi và kết quả |
|---|---|---|
| Chuyên gia | 86,9 giây | Phạm vi, độ sâu, thuật ngữ, chuẩn đầu ra, nguồn; 4 góp ý, phân xử bên dưới |
| Toán học | 33,1 giây | Công thức và giả thiết trong HTML, ghi chú, bài tập; tự tính các ví dụ chính; không phát hiện lỗi. Không nhận đã xem hình trực tiếp |
| Sinh viên năm 3 | 48,5 giây | Tiên quyết, tải nhận thức, ký hiệu, dữ kiện, khả năng đọc qua bằng chứng kỹ thuật; 2 góp ý |
| Sư phạm | 229,4 giây | Trình tự, bài tập, cầu nối; 3 góp ý. Tác tử chỉ nhận cấu trúc phần chứng minh trong ghi chú nên không được suy phần chứng minh thật bị thiếu |
| Mạch kể chuyện | 139,5 giây | Luận đề, bảy mạch, vào–ra và điểm nhấn của 46 trang; 2 góp ý nhẹ |

Lượt narrative đầu gặp `api_transport_error`; không có báo cáo hợp lệ. Lần chạy bốn vai trong đợt thứ hai gặp `RuntimeError: OpenRouter request exceeded 180s wall timeout`; chỉ báo cáo chuyên gia hoàn tất được giữ. Bốn vai được chạy lại với hạn mức yêu cầu 300 giây và báo cáo ngắn, không đổi mô hình, nhà cung cấp hoặc bỏ phạm vi toán. Các lượt lỗi giữ nguyên trạng thái không đạt. Bản gate được tái dùng sau khi đối chiếu đủ 46 mặt/notes/tiêu đề/mạch/bố cục/tài sản, phần kế hoạch thực cấp gate và diff kỹ thuật. Hai đoạn hành chính của outline ngoài phần gate đã đọc được phục dựng đúng checksum để đối chiếu; không suy tính đồng nhất từ tên tệp.

### Phân xử từng góp ý

| Vai, vị trí, mức độ | Bằng chứng và tác động | Quyết định, sửa hoặc lý do không sửa |
|---|---|---|
| Chuyên gia 1; RS03/RS05; nghiêm trọng theo reviewer | Reviewer đề nghị thay cận trên bằng $\delta-\log(1+\delta)$ | **Bác bằng nguồn.** BV §9.6.3, trang in 502, (9.49) ghi $p^*\ge f(x)+\delta+\log(1-\delta)$, tương đương công thức hiện hành. Tại $s=1/4$, sai số $\log4-3/4\approx0{,}636294$ lớn hơn biểu thức reviewer đề nghị, khoảng $0{,}190384$. Giữ cận và nhận xét dấu bằng riêng cho ví dụ này; đưa nguồn vào lượt rà toán sau editor |
| Chuyên gia 2; RP00–RP03; trung bình | Đòi trang P02 trích nguyên văn LLO theo bản kế hoạch 40 trang cũ | **Bác.** Bản 46 trang đã được duyệt thay bản lịch sử; outline ánh xạ đủ LLO6–10 với sản phẩm đánh giá, RP03 có mục tiêu quan sát được. Không thêm trang hoặc nhãn nội bộ vào mặt trang |
| Chuyên gia 3; RE06; nhẹ | Hai ký hiệu $\ker A$, $\operatorname{null}A$ cùng chỉ không gian hạt nhân | **Nhận một phần.** Ghi rõ hai ký hiệu bằng $\{v:Av=0\}$ trong ghi chú/tài liệu. Giữ thuật ngữ không gian hạt nhân; không đổi thành “không gian rỗng” |
| Chuyên gia 4; RP00; nhẹ | Yêu cầu xác nhận học kỳ | **Đã xác minh, không sửa.** Năm 2026–2027, học kỳ 1 khớp `2627-1/` và chỉ dẫn người dùng |
| Sinh viên 1; RG05/RN05/RR03/RZ01; trung bình | Reviewer trích `bodyHorizontalOverflow=true` từ các bảng cuộn | **Bác sau đọc dữ liệu thật.** Cả bốn trường này đều `false`; reviewer nhầm với `revealHorizontalOverflow`. Bảng rộng 590px cuộn trong vùng 342px có tabindex và kiểm phím trái/phải đạt; không thu nhỏ chữ để bỏ cuộn hợp lệ |
| Sinh viên 2; RP04/RE05; nhẹ | Hướng $(-6,6)^T$ ở câu hỏi đầu bài làm lộ đáp án Newton khả thi về sau | **Nhận.** Đổi riêng câu hỏi mở đầu sang $d=(d_1,d_2)^T$, yêu cầu tìm $d_1+d_2=0$; không thêm bộ số mới. Giữ nguyên sổ số VD3 ở phần suy ra; đồng bộ đáp án và ba tệp kế hoạch |
| Sư phạm 1; RG09/RG10/Bài 2(c); trung bình | Cần cầu nối Cauchy–Schwarz và $W^{\pm1/2}$ trước bài kiểm bổ sung | **Nhận một phần.** Không coi proof bị lược trong trích đoạn là proof thật thiếu. Thêm cầu nối ngắn trong notes RG10 và định nghĩa căn ma trận chéo cụ thể trong đề Bài 2(c); giữ tuyến KKT chính |
| Sư phạm 2; RG06; nhẹ | Hằng số $L$ trên câu phân biệt bước chưa được giải thích tại chỗ | **Nhận một phần.** Giữ tín hiệu phân biệt cấu hình theo phân xử gate; gọi rõ $L$ là hằng số Lipschitz của gradient, viết bất đẳng thức định nghĩa trong notes trước định lý |
| Sư phạm 3; RG10; nhẹ | Chuẩn đối ngẫu xuất hiện như hệ số có sẵn | **Nhận.** Định nghĩa bằng giá trị lớn nhất của $g^Tv$ trên quả cầu đơn vị, nối với kết quả cực tiểu nhờ tính đối xứng; sau đó đổi độ dài để có $Wd=-g$ |
| Mạch 1; RP04/RG01/RE02; nhẹ | Hai câu hỏi mở đầu phục vụ hai phần nhưng câu nối chưa phân biệt | **Nhận phần chuyển ý.** Ghi rõ điều kiện dừng dẫn vào RG01, điều kiện $Ad=0$ chuẩn bị phần đẳng thức. Bác mô tả phụ rằng $(-6,6)$ phá khả thi: hướng phá tại RE02 thực tế là $(-16,2)$ |
| Mạch 2; RG07/RG08/RG10; nhẹ | Lý do chọn $W=\operatorname{diag}(3,7)$ chưa nói ngay khi đưa thước đo | **Nhận.** Nêu hai hệ số độ cong của VD1 ngay tại RG08; giải thích đây là quyết định chọn mô hình, không do KKT tự quyết định |

Góp ý riêng của điều phối: tách định nghĩa $J$ khỏi toán tử cực tiểu ở RZ02; giữ cụm $-820<0$ cùng dòng ở RG03; bỏ khoảng trắng thừa; thêm tám heading cấp hai cho mục lục bài tập. Đây không phải góp ý được gán ngược cho năm reviewer.

**Trạng thái tại thời điểm mở editor:** đã phân xử đủ 11 góp ý. Các bước hợp nhất, rà lại và kiểm kỹ thuật sau đó được ghi riêng dưới đây; không suy kết quả cuối từ báo cáo trước sửa.

## Tác tử chỉnh sửa riêng và hợp nhất

Editor-r1 nhận đủ bản nháp, năm báo cáo và phân xử, có runtime đúng mô hình nhưng **bị bác về nội dung**: chỉ sửa sai một heading trong khối bài tập, một lần thay báo `replacement count mismatch: expected 1, found 0`, rồi báo cáo không phản ánh đúng thay đổi. Không dùng bất kỳ thay đổi r1 nào vào kho chính.

Lượt phục hồi A–E dùng cùng mô hình qua OpenRouter, năm lần ghi tuần tự vào bản sao sáu tệp. Điều phối chuẩn bị hợp đồng `old/new` từ các quyết định đã chốt, kiểm tính duy nhất; worker áp trực tiếp. Không ghi công các câu do điều phối chuẩn bị thành nội dung worker tự quyết định. Tất cả 33 thay thế khớp tuyệt đối khi tái áp từ baseline, đủ metadata hợp lệ và `finish_reason=stop`. A sửa RP04/RZ02/RG03; B sửa RG06/RG08/RG10; C làm rõ ký hiệu ở notes RE02 và ghi chú, căn ma trận Bài 2, khoảng trắng; D thêm tám heading; E đồng bộ storyboard và hai bảng đáp án.

Điều phối đã xem các hợp đồng và diff, kiểm checksum kho còn khớp baseline rồi hợp nhất sáu tệp. HTML sau editor: `9ee267e5770857c31482c9fdafedfb483cd795115456fdf095d4c40f586221a0`; ghi chú: `93cae058d85aaf21ed16ff80412cf77caf8b6f5957486e42b6202c394c22d949`; bài tập: `56fabfc9015a2ecd9ee9b5e58d0a11a5aed04c92f5768ee636dbdfd36f7390a0`. Bản đóng gói đã đồng bộ và `--check` đạt; `git diff --check` sạch. Các tệp này là nguồn hiện hành; không chạy lại bộ ghép fragment cũ để tránh ghi đè editor.

Rà lại được giao trên tệp đã hợp nhất: vai mạch nhận đủ 46 mặt/notes và bảy mạch vì câu hỏi/chuyển ý mở đầu đã đổi; vai toán nhận các trang RP04/RG06/RG08/RG10/RE02/RE06/RZ02, hai Markdown và bằng chứng BV (9.49). Kiểm kỹ thuật chụp lại 92 bề mặt và kiểm viewer mới. Kết quả cuối được ghi tiếp sau khi hoàn tất, không suy từ lượt trước.

## Kiểm định cuối sau chỉnh sửa

Ngày hoàn tất kiểm nội dung và RevealJS: **2026-09-25**. Bản hiện hành có 46 trang trong bảy mạch RP/RG/RN/RE/RR/RS/RZ, khớp storyboard. HTML có SHA-256 `452b7abf30ef50a9c401e55e6ed566515977fc943691a938b4a9d4541c58c7d3`; hai Markdown giữ checksum sau editor nêu trên.

### Rà lại toán và mạch trình bày

| Vai và phạm vi | Thời gian | Metadata runtime | Kết luận và phân xử |
|---|---|---|---|
| Toán: các trang đã sửa, hai Markdown, Bài 2(c), nguồn BV (9.49) | 23,1 giây | `z-ai/glm-5.3-flash` yêu cầu = quan sát; `OpenRouter`; `stop` | Các phép toán được xác nhận. Một góp ý về tên phương pháp ở RZ02 xuất phát từ prompt điều phối viết sai phạm vi; bác góp ý, giữ báo cáo gốc và sửa phạm vi cho lượt bổ sung |
| Toán bổ sung: chỉ RZ02 trước/sau, định nghĩa $J$, phép cực tiểu, $g,H$, KKT và phần dư có $M^Ty$ | 8,0 giây | Cùng mô hình và nhà cung cấp; `stop` | Không phát hiện vấn đề. Định nghĩa hàm đã tách khỏi phép cực tiểu, các giả thiết và số hạng đúng |
| Mạch trình bày: toàn bộ 46 mặt trang, ghi chú và bảy mạch | 32,7 giây | Cùng mô hình và nhà cung cấp; `stop` | Không phát hiện vấn đề còn tồn tại; xác nhận câu nối RP04, lý do chọn $W$ và cầu nối chuẩn đối ngẫu |

Lượt rà mạch trước lần hoàn tất bị `RuntimeError: OpenRouter request exceeded 300s wall timeout`; không tính đạt. Lượt phục hồi giữ nguyên bằng chứng, mô hình và phạm vi, giảm ngân sách phản hồi để hoàn tất. Không tuyên bố các worker nhìn ảnh kết xuất. Báo cáo thô, metadata, phân xử và bằng chứng so sánh nằm trong `openrouter-mcp/tmp/lec04-kkt-implementation/review-snapshots/`; đây là scratch bị Git bỏ qua. Nội dung kết luận cần bàn giao được ghi đầy đủ trong nhật ký này.

### Sửa hiển thị và đối chiếu nội dung

Lượt chụp sau editor phát hiện hai lỗi thật: bảng RG03 vượt vùng đọc trên màn hình hẹp; công thức kết RG10 vượt đáy vùng chiếu khoảng 20px trên màn hình rộng. Đã bọc bảng trong vùng cuộn có `tabindex=0` và chỉ giảm lề công thức RG10 từ 20px xuống 4px ở màn hình rộng. Không đổi chữ, công thức, ghi chú, thứ tự hoặc cỡ chữ. Phép so sánh trực tiếp 46 trang và phép đảo hai thay đổi khôi phục chính xác HTML `9ee267e…`; vì vậy hai báo cáo nội dung sau editor vẫn áp dụng cho bản cuối `452b7abf…`.

Điều phối đã nhìn toàn bộ 46 trang ở màn hình rộng qua ảnh tổng hợp, xem riêng các trang suy diễn và ví dụ, bảy SVG cùng các trang hẹp trọng tâm. Sau editor đã xem lại RP04, RG03, RG08, RG10, RZ02 ở màn hình rộng và RG03, RG10, RZ02 ở màn hình hẹp. Màn hình hẹp dùng vùng cuộn đọc; các ảnh chụp tại đầu vùng không biểu thị toàn bộ nội dung, nên đã kiểm thêm vị trí giữa/cuối và bàn phím.

### Kết quả kiểm kỹ thuật

| Hạng mục | Bằng chứng cuối |
|---|---|
| Cấu trúc và nguồn | Đủ 46 trang/7 phần, ký hiệu và ghi chú; chỉ dùng runtime cục bộ của `2627-1/`; liên kết và tài sản tải được |
| Ví dụ và đáp án | 55 kiểm tra đại số chính xác hoặc số học đạt; rà toán độc lập đối chiếu HTML và tài liệu. Điểm khả thi $(16,-2)^T$, hệ rút gọn $7,-42,6$; không thêm ràng buộc không âm |
| Công thức | 2341 biểu thức nguồn được phân tích thành công: 921 trong HTML, 820 trong ghi chú, 600 trong bài tập; không lỗi KaTeX |
| Hiển thị slide | 92 bề mặt ở 1600×900 và 390×844; không tràn khối/chữ/thân, không lỗi JavaScript, ảnh hoặc yêu cầu mạng. 22 trạng thái xuất hiện từng bước đã hiện đầy đủ; thân bài nhỏ nhất 32px/24px |
| Điều hướng | 17 vùng cuộn ngang dùng được bằng Tab và phím mũi tên; điều hướng giữa phần đúng. 138 vị trí đầu/giữa/cuối của màn hình hẹp không bị nút che chữ. RR05 giữ vị trí cuộn sau 1,3 giây; Home, End, PageDown, Tab/Enter và chuỗi sự kiện cảm ứng CDP đạt |
| Tài liệu công khai | Hai tài liệu × `file://`/HTTP × rộng/hẹp = tám trường hợp đạt; chín hình có mô tả thay thế. Tám bài tập, 16 khối gợi ý/lời giải gập mặc định, mở bằng Enter và mở khi in; tám liên kết mục lục điều hướng đúng |
| Tài liệu trên màn hình hẹp | Đủ 48 vùng cuộn ngang của ghi chú và 14 vùng của bài tập dùng được bằng bàn phím trên HTTP và `file://`; không tràn ngang thân trang |
| Viewer và chỉ mục | Ba URL sai bị từ chối. Bốn trường hợp chỉ mục rộng/hẹp, HTTP/`file://` đạt; đủ ba liên kết công khai Bài 04, không đưa planning lên chỉ mục |
| Bản đóng gói | Đã chạy `python3 2627-1/scripts/sync-local-materials.py` và `--check`; đồng bộ đủ 12 tệp, gồm hai Markdown mới của Bài 04 |

Bằng chứng kỹ thuật tại `openrouter-mcp/tmp/lec04-kkt-implementation/technical/`: `final-render-summary.json`, các audit cấu trúc/hiển thị/bàn phím/cảm ứng/tài liệu và ảnh. Cảm ứng dùng Chromium giả lập qua CDP; chưa kiểm điện thoại vật lý hoặc mọi trình duyệt.

Nguồn và khác biệt so với mẫu đã ghi trong `source-map.md`: kế thừa MIT bài 16 rồi 17, đổi thứ tự theo yêu cầu xây dựng phương pháp từ KKT; bảy SVG tự dựng bằng dữ kiện toán, không dùng ảnh sinh làm bằng chứng. Không tải nguồn MIT mới. Sách *Convex Optimization* năm 2004 có hai tác giả Boyd–Vandenberghe; Parth Nobel thuộc bộ trang chiếu sửa đổi của Stanford được đối chiếu, không gán cho sách.

### Codex Slides và trạng thái bàn giao

Dự án dùng lại: `20260828120744-lecture-04-t-i-u-tr-n-v-r-ng-bu-c-ng-th--d4es`. Đã đồng bộ đủ 46 tiêu đề, luận điểm, ảnh PNG chụp từ RevealJS và ghi chú diễn giả. Đọc lại dữ liệu bền vững xác nhận từng ảnh có checksum đúng, toàn bộ tiêu đề/luận điểm/ghi chú khớp bản HTML cuối.

Sau `revise_outline`, dự án trở về `draft/outline` dù các ảnh đã lưu. Đã kiểm mã pipeline: lượt hoàn tất chỉ xử lý trang chưa kết xuất. Lượt `run-97f18d7f-5b2d-4092-a092-cf8f8dfe68f4` hoàn tất với không trang nào cần dựng lại, chuyển dự án sang `ready/deck`; 46 ảnh giữ nguyên. Giao diện còn lưu lựa chọn Design Files, nên đã nhấp tab canvas qua giao diện. Đây là thay đổi lựa chọn giao diện, không phải sửa nội dung.

Chromium ngoài đã mở 46 đường dẫn slide thật do MCP trả về: đúng ảnh trước và sau tải lại; không đổi nội dung bền vững. Đường dẫn có chỉ định trang 15 và panel ghi chú mở đúng RG10, ghi chú khớp cả trước và sau tải lại. Đường dẫn panel không chỉ định số trang giữ lựa chọn trang đang xem; không coi giả định mặc định trang 1 của harness là yêu cầu sản phẩm. Điều phối đã xem trực tiếp ảnh giao diện RP01 và RG10. Bản audit trước phục hồi và ảnh giao diện chưa đạt được giữ riêng, không tính vào kết quả đạt.

Tám Design Files hiện hành gồm HTML, hai Markdown công khai và năm tệp planning. API `upload_design_file` trả tệp đã có mà không thay nội dung; đã dùng `write_design_file` rồi `read_design_file` để đối chiếu chính xác từng tệp với kho. Các tệp có tên chứa “proposal” được giữ như hồ sơ lịch sử; đặc tả hiện hành là `storyboard.md` cùng các tệp chuẩn vừa đồng bộ.

**Giới hạn:** phiên này không cung cấp Browser tích hợp trong trình soạn thảo Codex. Kiểm trực quan Codex Slides thực hiện bằng Chromium ngoài, kết hợp dữ liệu dự án và checksum; không tuyên bố đã kiểm trong Browser tích hợp. Cảm ứng chỉ được kiểm giả lập, chưa kiểm thiết bị vật lý.

**Chốt phạm vi:** không còn lỗi chặn hoặc nghiêm trọng đã xác nhận chưa xử lý. `index.html` đã có đúng ba liên kết công khai và qua kiểm hồi quy nên không cần sửa. Phạm vi Git gồm 16 tệp Bài 04, kể cả bản đóng gói tài liệu; staging tường minh và kiểm diff. Nhánh hiện tại `main`, upstream `origin/main`; hash commit và kết quả xác minh sau push được cung cấp trong bàn giao. Prompt đầy đủ giữ tại mục 9 của `outline.md`.

## Lịch sử rà đề xuất Markdown — trước phê duyệt triển khai

## Nhật ký đề xuất KKT

## Trạng thái và phạm vi

**Đề xuất đang chờ người dùng duyệt, chưa triển khai.** Chỉ cập nhật `outline.md`, `storyboard.md`, `review-log.md`. HTML, hình, ghi chú và bài tập công khai, trang chỉ mục và tài sản chạy giữ nguyên. Không tạo commit hoặc đẩy bản đề xuất như một bộ trang chiếu đã hoàn thành.

Yêu cầu chi phối lần rà: đánh giá lại mạch hiện hành, dùng kết quả KKT thực tế của Bài 03 để suy ra phương pháp Bài 04, đề xuất nội dung và bố cục từng trang trong Markdown để duyệt. Những lần kiểm định đạt trước đây xác nhận các khía cạnh đã kiểm của bản cũ; không được dùng chúng để bác phản hồi về mạch học tập hiện tại.

Tệp gốc tại thời điểm tiếp nhận: Bài 03 có 47 trang, Bài 04 có 46 trang, HEAD `2b78ea4`, không có sửa đổi được theo dõi trước nhiệm vụ. Đã đọc phần hiển thị và ghi chú riêng, tránh đánh đồng “có trong ghi chú” với “sinh viên nhìn thấy bước suy ra”. Giữ bản kế hoạch cũ cuối mỗi tệp dưới nhãn lịch sử để còn đối chiếu HTML hiện hành. Mã R mới chỉ là đề xuất.

## Kế hoạch và phân công

Áp dụng skill `build-math-slide-deck-outline`. Planner OpenRouter đề xuất và điều phối viên chấp nhận chuỗi: kiểm kê nguồn và kết quả Bài 03 → phân tích các phép suy ra → soạn Markdown → kiểm định storyboard → năm vai độc lập → tác tử chỉnh sửa riêng → kiểm tra và bàn giao bản chờ duyệt. Chỉnh một điểm của kế hoạch: người dùng duyệt là bước tiếp theo sau bàn giao cụ thể, không phải lý do dừng trước khi viết đề xuất.

Các vai nội dung dùng cầu nối OpenRouter theo `AGENTS.md`; không dùng tác tử Codex thay người đọc, người soạn hoặc reviewer. Tác tử Codex phụ chỉ điều phối tiến trình gọi năm worker độc lập. Quyền gửi các tệp liên quan tới OpenRouter đã được người dùng xác nhận; các worker chỉ nhận gốc hẹp hoặc nội dung văn bản đã chọn, không nhận `.env` hay bí mật.

Nguồn đã kiểm: đề cương DOCX chính thức; HTML và ghi chú của hai bài; kế hoạch hiện hành; BV §§5.5.3, 9.4.1, 9.5.1, 9.6.3, 10.2–10.3; MIT lec16/lec17 đang có; tài liệu slide chính thức Stanford để đối chiếu cách suy ra. Không tải tài nguyên MIT mới. Bảng nguồn và vị trí dùng nằm trong dàn ý, tránh tự động nhận toàn bộ nguồn Bài 03 làm nội dung phải dạy lại.

## Chẩn đoán được chấp nhận

| Mức độ | Vị trí hiện tại | Bằng chứng, quyết định | Nơi xử lý đề xuất |
|---|---|---|---|
| Nghiêm trọng | P03/P04; A03; B03/B04; E06/E10 | KKT được nhắc hoặc xuất hiện dưới dạng kết quả, chưa thành thao tác tự suy ra. Thêm các dòng Lagrange/đạo hàm/tuyến tính hóa trên mặt trang. | RP01–RP04, RG02, RG08–RG10, RN02–RN03, RE03–RE04, RR02–RR03 |
| Nghiêm trọng | E05–E10 | Ví dụ cho hướng trước khi giải; nguồn gốc hai ẩn nhân tử/số gia chưa rõ. Viết hệ trước, giải số sau; thêm quan hệ khi giảm bước. | RE05, RR03–RR06 |
| Trung bình | B02–B05; C02–C07 | Đổi quy tắc bước, trùng hướng W/Newton và trùng giảm mô hình/sai số có thể bị hiểu thành tính chất chung. | RG05–RG07, RG10, RN01–RN05 |
| Trung bình | E03–E04 | Nhánh khử biến chưa nối lại hệ khối. Chuyển thành phép khử nhân tử của cùng hệ. | RE06 |
| Trung bình | D01–D05 | Cắt ngang chuỗi Newton và chưa dùng lớp hàm vào một cận tính được. Dời phần bảo đảm sau các phương pháp, thêm cận có giả thiết. | RS01–RS05 |
| Trung bình | E11/Z01 | Ứng dụng chưa nối hồi quy Bài 03; tổng kết chưa thu hồi cách xây dựng phương pháp. | RZ01–RZ02 |

Không kết luận “bài cũ hoàn toàn không có KKT”: E06/E10 đã có hệ KKT. Khiếm khuyết cần sửa là thiếu cầu nối tới kết quả Bài 03 và thiếu phép suy ra có thể theo dõi trên mặt trang.

## Kiểm soát chất lượng đầu ra worker

Planner, hai reader phân tích nguồn/toán và writer soạn phép suy ra đều trả metadata runtime `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`. Nội dung worker được rà riêng; metadata đúng không bảo đảm nội dung đúng.

| Nguồn góp ý | Vấn đề phát hiện | Quyết định của điều phối và bằng chứng sửa |
|---|---|---|
| Reader nguồn, lượt đầu | Báo cáo cuối viện dẫn phần trả lời trước không kèm theo; không đủ để truy nguyên toàn bộ. | Chạy lại nhiệm vụ hẹp về mã Bài 03 → Bài 04. Giữ chỉ những đối chiếu xác nhận được trong HTML. |
| Reader nguồn, lượt sau | Đề nghị thêm đối ngẫu yếu, đủ bốn nhóm KKT và nhánh bất đẳng thức vào mọi bài có đẳng thức. | Bác phần mở rộng không phục vụ phạm vi. Bài gốc chỉ đẳng thức không thiếu bù trừ; bốn nhóm chỉ cần dùng đầy đủ trong bài con chọn hướng có bất đẳng thức chuẩn. Chấp nhận nhắc Lagrange, đổi nghĩa g và hồi quy Bài 03. |
| Reader toán | Ví dụ hồi quy mới với $y=(3,4)^T$, tổng bằng 1, điểm đầu $(0,1)^T$ có gradient/đích tính sai; giới hạn quan hệ $\eta=\nu+\Delta\nu$ chỉ ở điểm khả thi. | Bỏ toàn bộ ví dụ mới. Tại dữ kiện đó gradient thật là $(-3,-3)^T$ và điểm đầu đã tối ưu; không đưa vào dàn ý. Dùng VD3 đã kiểm. Quan hệ nhân tử đúng cả ở điểm chưa khả thi nếu bài con dùng $Ad=-r_p$. |
| Writer phép suy ra | Viết Slater là lý do cho tính đủ; dòng giảm thật của hàm log thay số không nhất quán; gọi $\log4-3/4$ là sai số mô hình. | Sửa trước hợp nhất: tính đủ từ lồi, Slater cho chiều cần/tồn tại nhân tử; giảm thật $\log(7/4)-3/16$; $\log4-3/4$ là sai số tối ưu tại điểm đầu. Dàn ý §5.2–§5.3 là bản chuẩn. |
| Điều phối kiểm câu hỏi | Hỏi thay $\delta<1$ bằng $\delta^2<1$ như một lỗi sẽ sai vì $\delta\ge0$. | RS05 hỏi thay $\delta$ bằng $\delta^2$ trong biểu thức cận; đáp án nói rõ hai điều kiện ngưỡng vẫn tương đương. |

Không nhận đề xuất thêm slide chỉ vì nguồn Bài 03 có nội dung tương ứng. Cầu nối được chọn phải trực tiếp tạo ra hướng, hệ cập nhật, tiêu chí hoặc ứng dụng của Bài 04.

## Kiểm tra cục bộ trước các vòng rà độc lập

- 46 mã mới duy nhất; đủ 9 trường trên mỗi trang gồm nội dung, bố cục, lý do, vào–ra, chuẩn, số liệu, nguồn/ghi chú, quyết định, thời lượng.
- Ánh xạ đủ 46 mã hiện hành; 7 mạch có 7 trang kiểm tra riêng; tổng phân bổ đúng 2 LT + 1 BT.
- Tính lại bằng số hữu tỉ bảng Armijo, hai hệ Newton đẳng thức, độ giảm, ví dụ hồi quy Bài 03; kiểm log và đạo hàm thật của VD2. Các kết quả ở dàn ý §5–§7 khớp.
- Công thức Markdown dùng `$...$`, `$$...$$`; không dùng các dấu phân cách LaTeX thay thế trong phần đề xuất.
- Dự án Codex Slides hiện có được mở để xem bản hiện hành, gồm trang E06 với hệ khối và ghi chú. Đây là kiểm đối tượng cần sửa, không phải kiểm trực quan bản đề xuất. Chưa thay các trang của dự án hoặc HTML.

## Kiểm định storyboard và năm vai độc lập

Các báo cáo chỉ đánh giá đặc tả, không tuyên bố đã kiểm tràn, phông chữ hay điều hướng của những slide chưa triển khai.

### Cổng storyboard

Runtime: `z-ai/glm-5.3-flash` qua `OpenRouter`, requested/observed khớp. Vòng đầu hết ngân sách đầu ra ở phần suy luận; cầu nối tiếp tục vòng hai và trả báo cáo hoàn chỉnh với `finish_reason=stop`. Báo cáo bao phủ đủ 46 mã, kiểm 7 mạch và phân bổ tới từng trang; kết luận đạt cổng với sáu chi tiết cần chỉnh.

| Góp ý | Quyết định và trạng thái |
|---|---|
| Trường số liệu RE01/02/05/06 nhắc trước phần dư/số gia | Chấp nhận, đã tách hướng dẫn ký hiệu của mạch RE và RR; phần dư chỉ xuất hiện từ RR01. |
| Diễn đạt bước dùng bù trừ | Câu cũ đúng toán; nhận cách viết rõ hơn: bù trừ cùng nhân tử dương làm ràng buộc hoạt động. |
| Q_I bỏ hằng f(x), khác cách ghi Q_H | Chấp nhận thống nhất biểu thức Q_I có f(x); giá trị hướng không đổi. |
| RN04 đối chiếu hai ví dụ cần vị trí riêng | Chấp nhận; hộp đối chiếu hàm bậc hai ở dưới, không trộn số 62 vào bảng VD2. |
| Điều kiện r≠0 cần ở mặt RR05 | Nội dung đã có; làm rõ thêm trong giới hạn bố cục, đặt cạnh kết quả đạo hàm chuẩn. |
| Phân số tiết khó đối chiếu | Chấp nhận; thêm xấp xỉ thập phân, vẫn cộng bằng phân số chính xác. |

Điều phối bác hai lỗi **trong phép chép lại của reviewer**, không có trong đề xuất: ngưỡng Armijo của VD2 là $\alpha\delta^2=9/160$, không phải $\alpha\delta^2/2$; $|\varphi′′′(1/4)|=128$, không phải 32. Không dùng câu “mọi số đã kiểm đúng” của reviewer thay phép tính độc lập. Dàn ý vẫn giữ các số đúng.

Bổ sung kiểm soát ký hiệu: RP02 và dàn ý định nghĩa kích thước trước khi dùng, giải thích p của Bài 04 tương ứng số hàng r của Bài 03. Mã mục tiêu chỉ ở tài liệu kế hoạch.

### Năm vai độc lập

Đủ năm báo cáo tự chứa sau cổng, mỗi vai là một lượt reviewer độc lập. Kết quả cuối đều có `finish_reason=stop`, `requested_model=observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`. Đây là bằng chứng runtime; việc chấp nhận nội dung được quyết định riêng dưới đây.

| Vai | Phạm vi của báo cáo cuối | Số góp ý và quyết định |
|---|---|---|
| Sinh viên | Đủ 46 mã, nội dung hiển thị, bố cục và vào–ra; không kiểm số thay vai toán | 3 góp ý, nhận cả 3 (một góp ý trùng vai mạch) |
| Chuyên gia | Phạm vi/LLO, nguồn, giả thiết/giới hạn phương pháp, KKT và mô hình, liên hệ AI | 3 góp ý: nhận 2, bác 1 do bỏ sót ràng buộc |
| Toán học | Các phép suy ra, số liệu, cận, nhân tử và cập nhật; đối chiếu dàn ý và 17 trang trọng điểm | Nhận 2 góp ý biên tập; bác hai câu sai do reviewer tự thêm vào phần diễn giải |
| Học thuật–giảng dạy | Chu trình học, bài tập, dự toán thời lượng và tải nhận thức | 3 góp ý: nhận tải RZ02, bác 2 kết luận tính sai/hiểu sai vòng lặp |
| Mạch kể chuyện | 7 mạch, đủ 46 trang và các câu nối, ký hiệu và thu hồi vấn đề mở đầu | 5 góp ý: nhận 4, bác nhầm loại ràng buộc của Bài 03 |

Bản hợp nhất có truy nguyên từng vấn đề:

| Vai; mức độ worker | Vị trí; vấn đề | Quyết định, bằng chứng và nơi sửa |
|---|---|---|
| Sinh viên; trung bình | RG05: thiếu giá trị alpha trên mặt trang | Nhận; thêm $\alpha=1/10$, $\beta=1/2$, $f_0=62$, $g^Td=-820$ và ba điểm thử vào đặc tả bảng. |
| Sinh viên; trung bình | RN04 → RS01/RS03: delta bình phương đổi thành delta chưa có cầu nối | Nhận; định nghĩa $\delta_N=\sqrt{d^THd}\ge0$ ở RN04, viết gọn $\delta=\delta_N$ ở RS01, thay $9/16$ thành căn $3/4$ tường minh. |
| Sinh viên; nhẹ + Mạch; trung bình | RG10/RG11: Q_W chỉ được nhắc tên trước câu hỏi | Nhận; viết $Q_W=f(x)+g^Td+d^TWd/2$ và điều kiện dừng, nối phép thay I bằng W. |
| Chuyên gia; trung bình | RZ02: cho rằng y=0 làm nghiệm w=0 và hệ suy biến | Bác. Với $Aw=14$, $w=0$ không khả thi. $H=\operatorname{diag}(2,5)\succ0$ và định thức ma trận KKT là −7, không suy biến. Giữ ví dụ phục hồi đúng VD3. |
| Chuyên gia; trung bình | RZ02: nhân tử lambda cần gắn đúng ràng buộc | Nhận; phần chữa nói rõ lambda thuộc ràng buộc chuẩn Bài 03, nu thuộc Aw=b hiện tại, rho là hệ số cho trước. |
| Chuyên gia; nhẹ | RZ02 gắn LLO6–10 rộng hơn minh chứng | Nhận; chỉ gắn LLO9/CLO1 và LLO10/CLO2. LLO7 được đo ở RS05, không gán cho câu hỏi này. |
| Toán; nhẹ | RR06: đạo hàm âm không bảo đảm mọi bước thỏa Armijo | Nhận; đây là tiêu chí kiểm chấp nhận, tồn tại bước dương đủ nhỏ, không là bất đẳng thức cho mọi t. |
| Toán; nhẹ | RN05: ngưỡng 9/160 dễ lẫn giảm mô hình 9/32 | Nhận; ghi ngưỡng $\alpha(-g^Td)=9/160$, là lượng yêu cầu từ đạo hàm hướng. |
| Giảng dạy; nghiêm trọng | Cộng thời lượng ra 2.275 LT | Bác. Reviewer đã cộng LT cho các quiz ghi rõ 0 LT. Cộng từng dòng bằng phân số cho đúng 2 LT + 1 BT; không giảm nội dung để chữa một lỗi cộng của reviewer. |
| Giảng dạy; trung bình | RG07: cho rằng phép co tọa độ chỉ đúng tại điểm đầu | Bác. Gradient tính lại mỗi vòng là $(3x_1,7x_2)^T$, nên bước cố định $1/4$ cho $(x_1/4,-3x_2/4)^T$ ở mọi điểm. Reviewer đã giữ gradient điểm đầu như hằng số. |
| Giảng dạy; trung bình | RZ02 quá nhiều yêu cầu trong 0.10 BT | Nhận; hai mốc trên cùng trang, mốc sau điền phần dư vào mẫu hệ thay vì suy lại Jacobian. Tăng RZ02 lên 0.15 BT, giảm RG11 xuống 0.15 BT; tổng không đổi. |
| Mạch; trung bình | Đòi đổi lambda của hồi quy Bài 03 thành nhân tử đẳng thức | Bác. HTML S05-06 dùng $\|w\|_2^2\le\tau$, là bất đẳng thức. Đổi như reviewer sẽ làm sai kiến thức nền và cầu nối. |
| Mạch; nhẹ | RG03 và RG08 dùng v cho hai vai trò | Nhận; hướng thử RG03 là $\tilde d$, giữ v cho hướng chuẩn hóa. |
| Mạch; nhẹ | RR01 trường số liệu có Delta nu trước định nghĩa | Nhận; RR01 chỉ có u,nu,g,r_d,r_p; số gia xuất hiện từ RR02. |
| Mạch; nhẹ | Sổ số VD1 gọi delta_N trước Newton | Nhận; trước RN04 ghi $d^TWd=124$; chỉ khi đã định nghĩa Newton mới nối với $\delta_N^2$ vì W=H. |

Sai sót trong phần tự diễn giải của reviewer toán được bác riêng: công thức đúng là $\nu^+=\nu+t\Delta\nu=(1-t)\nu+t\eta$, không phải $(1-t)\nu+t\Delta\nu$. Với t=1, công thức bị chép sai cho −24 thay vì −20. Không nhận lời giải thích bổ sung về một hàm lambda(t) để chứng minh cận log khít; bản đề xuất chỉ kết luận bằng phép thế trực tiếp vào cận và sai số thật, đủ cho ví dụ này.

### Lỗi runtime và cách xử lý

Các lượt không hoàn tất không được tính vào năm báo cáo: `tool_call_limit` do đọc lặp; `RuntimeError: OpenRouter request exceeded 360s wall timeout`; `model returned an empty or incomplete answer after all retries` sau `finish_reason=length`. Đã báo nguyên văn cho người dùng trong quá trình làm, dừng giai đoạn chỉnh sửa phụ thuộc, giữ các bản đang có và chạy lại chính vai OpenRouter đó với bằng chứng hẹp đúng nhiệm vụ. Một số lượt được tắt công cụ đọc vì văn bản đã nhúng đủ; đây là giảm quyền công cụ của tiến trình, không thay mô hình, nhà cung cấp hoặc dùng Codex đóng vai reviewer. Không sửa mã cầu nối của kho. Năm kết quả cuối được kiểm tra là báo cáo hoàn chỉnh, không phải phần tiếp nối bị thiếu.

### Sửa thêm sau khi rà con số

Điều phối phát hiện số 7 trong Hessian rút gọn trùng độ lớn số gia 7 của điểm đầu cũ (3,11). Đây là trùng ngẫu nhiên có thể che lỗi lấy âm hệ số, không phải điều kiện bắt buộc của mô hình. Đề xuất đổi riêng điểm đầu khả thi thành (16,−2), giữ F,A,b và nghiệm (10,4). Các số mới đã tính bằng số hữu tỉ: g=(32,−10), d=(−6,6), eta=−20, F0=266, delta_eq²=252; hệ rút gọn có Hessian7, gradient−42, số gia6. Điểm âm hợp lệ vì bài không có điều kiện không âm; hình phải hiện miền tọa độ âm. Hai cách giải phải dùng cùng điểm mới. Các số trong báo cáo độc lập trước bước chỉnh này chỉ xác nhận bản trước đổi số; cần rà lại toán và mạch sau hợp nhất.

Các làm rõ bổ sung: RN06/RE07 viết dung sai mô hình tường minh, RS04 giới hạn bất biến Newton cho đổi tọa độ affine khả nghịch, RE06 định nghĩa N là cơ sở đầy đủ của kerA. Các thay đổi không làm đổi 46 trang hay 7 mạch.

### Tác tử chỉnh sửa và rà lại

Tác tử OpenRouter writer riêng nhận văn bản chuẩn cùng bảng phân xử năm vai, chỉ được ghi đầu ra trong thư mục hẹp. Lượt chỉnh sửa hoàn tất, metadata requested/observed cùng `z-ai/glm-5.3-flash`, provider `OpenRouter`. Đầu ra sửa nội dung/bố cục của 15 trang đã được điều phối kiểm trước khi hợp nhất. Sửa thêm hai lỗi nhỏ trong đầu ra: “biến s=0” thành “biên s=0”, bỏ câu phân bổ thời lượng khỏi trường bố cục RZ02 vì thời lượng đã ở metadata nội bộ. Đã đồng bộ dàn ý và storyboard. Chưa áp dụng sửa vào HTML.

Hai reviewer OpenRouter khác lượt chạy lại phần bị ảnh hưởng sau chỉnh sửa; đều trả báo cáo tự chứa, `finish_reason=stop`, metadata đúng mô hình/nhà cung cấp. Các trích đoạn được băm để phân biệt bản đã rà; phụ lục prompt triển khai §9 được bổ sung sau đó, nằm ngoài phạm vi reviewer.

| Rà lại | Kết quả và phân xử cuối |
|---|---|
| Toán | Không phát hiện lỗi. Xác nhận số mới VD3, hệ KKT/khử biến cùng hướng, hai nhân tử và cập nhật giảm bước, ba đại lượng VD2, cận tự điều chỉnh cùng giả thiết. Điều phối đã đối chiếu báo cáo với phép tính hữu tỉ độc lập. |
| Mạch: câu hỏi RN07 | Nhận yêu cầu làm rõ lời chuyển. Trường vào–ra RR07 đã thu hồi câu hỏi, nên bác nhận định bản đầy đủ hoàn toàn thiếu nối. Thêm câu nói cụ thể trong ghi chú dự kiến RE01 và RR07 để giữ câu hỏi về cận sai số xuyên qua hai mạch đẳng thức. Không thêm trang. |
| Mạch: nguồn/giả thiết RS04 | Reviewer nhận trích đoạn không có trường nguồn; bản đầy đủ đã có BV §§9.6.1, 9.6.3 và dàn ý §5.7. Không kết luận thiếu nguồn. Chấp nhận làm rõ trực tiếp các giả thiết hàm rút gọn kế thừa cận RS03: lồi chặt, Hessian xác định dương, đạt cực tiểu trong miền. |
| Mạch: số 62 ở RN04 | Nhận sửa câu thành “độ giảm của mô hình và độ giảm thật đều bằng 62”. Việc trùng với giá trị đầu là hệ quả nghiệm có giá trị 0 của hàm bậc hai này; hộp đối chiếu giải thích cấu trúc, không coi trùng số là tổng quát. |

Ba chỉnh lời cuối do điều phối xác nhận đối chiếu trực tiếp; không đổi công thức, số liệu, số trang, thứ tự hay thời lượng đã rà. Không coi ý kiến reviewer là mặc nhiên đúng khi trích đoạn không chứa trường cần đánh giá.

## Kiểm định trước bàn giao đề xuất

- Đủ 46 mã đề xuất duy nhất, 7 mạch và 7 trang kiểm tra; mỗi trang đủ 9 trường, gồm bố cục cụ thể và lý do phù hợp sinh viên năm 3. Ánh xạ đủ 46 trang hiện hành.
- Tổng dự toán từng trang bằng phân số chính xác: 2 tiết lý thuyết + 1 tiết bài tập. RZ02 đã tăng lên 0.15 BT, RG11 giảm tương ứng; không thêm thời lượng hiển thị.
- Tính lại các ví dụ và đáp án: bảng Armijo, hồi quy Bài 03, VD2, hệ KKT VD3 tại hai loại điểm đầu, hệ rút gọn và phản ví dụ nhận bước. Không còn dữ kiện khả thi cũ trong phần storyboard đề xuất; dữ kiện cũ chỉ giữ ở lịch sử và lý do đổi số.
- KaTeX cục bộ phân tích thành công **595 biểu thức** trong dàn ý nội dung và storyboard, không có lỗi cú pháp. Đây là kiểm công thức, không phải kiểm toán hay kiểm bố cục hiển thị. Phụ lục prompt triển khai không được tính là nội dung bài giảng để kiểm.
- Kiểm liên kết Markdown cục bộ, heading cấp một và dấu phân cách toán của phần mới. Không phát sinh tài sản trình chiếu mới cần kiểm.
- Chỉ ba tệp kế hoạch được sửa trong kho; HTML, SVG, ghi chú/bài tập công khai và dữ liệu đóng gói giữ nguyên. Chưa thể xác nhận đọc được/tràn nội dung của thiết kế mới trước khi dựng; bước đó được ghi bắt buộc trong prompt triển khai.

## Hồ sơ đề xuất trong Codex Slides

Đã thêm ba Design Files riêng mang tiền tố `lecture-04-kkt-proposal-` vào dự án `20260828120744-lecture-04-t-i-u-tr-n-v-r-ng-bu-c-ng-th--d4es`. Các tệp đề xuất không ghi đè kế hoạch hoặc trang trình chiếu hiện hành. Đọc lại cả ba tệp cho nội dung trùng bản đề xuất cục bộ; so sánh trạng thái dự án cho thấy 46 trang và outline của bộ trình chiếu không đổi.

Công cụ Browser tích hợp trong trình biên tập không khả dụng ở phiên này. Đã mở giao diện Codex Slides bằng Chromium cục bộ, kiểm đúng tên ba tệp và xem phần đầu storyboard có nhãn “chờ duyệt”. Giao diện xem trước của Design Files hiện bảng Markdown thành văn bản và chưa dựng công thức; chỉ dùng để xác nhận tệp đã xuất hiện, không coi đó là kiểm trực quan trang chiếu mới. Bản Markdown trong kho là đặc tả để duyệt và triển khai.

## Prompt cho bước triển khai sau duyệt

Theo yêu cầu bổ sung của người dùng, dàn ý §9 chứa prompt đầy đủ để sao chép sau khi duyệt. Prompt chỉ rõ storyboard chuẩn, các kết quả KKT cần kế thừa, sổ số, các tệp phải cập nhật đồng bộ, quy trình OpenRouter và các phép kiểm trước công bố. Đây là văn bản cho bước tiếp theo, không phải lệnh đã thực thi trong lần rà đề xuất này. Không commit/đẩy lên upstream trong nhiệm vụ hiện tại.

---

## Nhật ký bản triển khai trước đề xuất — lưu để đối chiếu

Các kết quả dưới đây thuộc bản hiện hành trước đề xuất. Không dùng chúng để xác nhận thiết kế mới đã được triển khai hoặc kiểm trực quan.

## Nhật ký rà soát Bài giảng04

### Kiểm định cuối bản triển khai — 2026-09-24

#### Chỉnh sửa và rà lại

Writer riêng thực hiện chín chỉnh sửa đã duyệt; điều phối viên hợp nhất rồi sửa thứ tự các giá trị thử trong ghi chú A06 và đặt chỗ điền $Ad=\ldots$ ở cả hai cột E12. Các thay đổi thị giác cuối giữ nguyên số trang, thứ tự và các dữ kiện: thẻ dữ kiện E02 theo storyboard; giới hạn chiều cao hình bằng bộ chọn CSS đủ ưu tiên; dịch nhãn SVG C01/E05 để tránh cắt hoặc chồng; công thức KaTeX trong các nút E11. Không thu nhỏ thân bài để che tràn.

Hai lượt rà lại độc lập đã đạt. Rà toán kiểm sáu trang A06, C05, E09–E12; câu kết “cả 5 trang” trong báo cáo là lỗi đếm của reviewer, không phải thiếu trang. Rà mạch kiểm đủ 7 mạch và 6 ranh giới giữa chúng; câu “7 ranh giới” trong báo cáo là lỗi đếm. Điều phối giữ câu nối A07 vì câu hoàn chỉnh, nêu đúng khoảng trống về hình học để B01 giải quyết; giữ đáp án Z02 trong ghi chú diễn giả theo quy định, không đưa lên mặt chiếu. Không còn lỗi chặn bàn giao hoặc nghiêm trọng chưa xử lý.

#### Kiểm tra bản cuối

| Phạm vi | Bằng chứng và kết quả |
|---|---|
| Cấu trúc | 46 mã trang duy nhất, 7 phần ngoài; khớp storyboard; 46 ghi chú; 7 trang kiểm tra P04/A07/B06/C08/D05/E12/Z02. |
| Toán và ví dụ | Tính lại bằng phân số chính xác, đạo hàm và phần dư; ba bộ số khớp math-spec, HTML, ghi chú và 8 bài tập. Phân biệt giảm mô hình, sai số thật, mức giảm một bước; giữ đủ ràng buộc trong mô hình bình phương tối thiểu. |
| Trình chiếu | Chromium duyệt toàn bộ 46 trang ở 1600×900 và 390×844; không lỗi KaTeX, ảnh hỏng, lỗi JavaScript/HTTP hoặc tràn ngang. Nội dung hẹp được cuộn dọc, không cắt. Kiểm điều hướng bàn phím từ P00 sang P01. Đã xem ảnh tổng quan cả 46 trang và ảnh lớn của các trang cần điều chỉnh. |
| Máy chủ | `python3 -u -m reloadserver 8765 --bind ::1` từ gốc kho; URL `http://[::1]:8765/2627-1/lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html`. IPv4 cùng cổng đang phục vụ kho khác nên giữ nguyên tiến trình đó. Khi chụp kiểm định, chặn riêng tín hiệu tự tải lại của reloadserver để tránh ảnh giữa chuyển cảnh. |
| Tài liệu học tập | 8 cấu hình: ghi chú/bài tập × HTTP/file × rộng/hẹp. Ghi chú 609 biểu thức KaTeX, bài tập 367; không lỗi công thức, tài nguyên hoặc tràn ngang. 16 khối gợi ý/lời giải gập mặc định, mở/đóng bằng Enter và mở khi in. Ba URL không hợp lệ đều bị từ chối. |
| Tệp dùng chung | Sửa CSS định vị lớp MathML ẩn trong công thức để hết tràn ngang bảng. Kiểm hồi quy ghi chú bài 03 và 05 ở rộng/hẹp đạt. Trang chỉ mục có đúng ba liên kết Bài 04, không lộ planning, không tràn ở rộng/hẹp. |
| Đóng gói | Đã chạy `sync-local-materials.py` và `--check`, bản đóng gói chứa 12 tài liệu, gồm hai Markdown của Bài 04. Markdown và đóng gói được commit cùng nhau. |
| Hình và nguồn | 15 SVG cục bộ có mô tả thay thế, XML hợp lệ; công thức và bảng là HTML/KaTeX. Không dùng raster; không tải thêm MIT. Danh mục checksum ở source-provenance.md. |
| Codex Slides | Dự án `20260828120744-lecture-04-t-i-u-tr-n-v-r-ng-bu-c-ng-th--d4es`: 46/46 trang rendered, 46 ghi chú khớp HTML; SHA-256 của 46 ảnh qua endpoint đã lưu khớp ảnh RevealJS. |

#### Trạng thái Codex Slides và giới hạn kiểm định

API tải ảnh đã lưu từng trang nhưng giữ trạng thái dự án ở dàn bài. Đã đọc mã và hướng dẫn known-errors, rồi chạy lượt hoàn tất `run-db7787b5-de39-40d3-8123-b4a771817faa` trên cùng dự án. Mã pipeline bỏ qua mọi trang đã rendered: không vẽ lại và không gọi mô hình cho trang nào. Lượt chạy có trạng thái `complete`; đọc lại dự án xác nhận `ready`, bước `deck`, 46 ảnh giữ nguyên checksum. Chromium mở lại đúng URL và xác nhận trang 41 “Newton cho hệ phần dư” cùng ghi chú hiển thị đúng. Không có công cụ Browser tích hợp trong phiên; vì vậy kiểm định trực quan ngay trong trình duyệt của Codex vẫn chưa thực hiện. Kiểm định cục bộ và đối chiếu ảnh đã lưu đã hoàn tất theo phương án dự phòng của skill.

Đường dẫn mở đúng trang: `http://127.0.0.1:4311/project/20260828120744-lecture-04-t-i-u-tr-n-v-r-ng-bu-c-ng-th--d4es?slide=41&checkpoint=deck`.

#### Bằng chứng các lượt hoàn tất

| Vai | Tệp kết quả runtime | requested_model | observed_model | provider | SHA-256 |
|---|---|---|---|---|---|
| Writer chỉnh sửa | `lec04-final-writer.json` | `z-ai/glm-5.3-flash` | `z-ai/glm-5.3-flash` | OpenRouter | `79feca53ff66493e4bf711f453833f30b3fd9f4b8e71970f0b54504ca67a8a69` |
| Rà lại toán | `lec04-recheck-math.json` | `z-ai/glm-5.3-flash` | `z-ai/glm-5.3-flash` | OpenRouter | `6ff0ae1c3485632e541e24ea740e45b4b806dc99abf4fe44dfe4d13c297aaec4` |
| Rà lại mạch | `lec04-recheck-narrative.json` | `z-ai/glm-5.3-flash` | `z-ai/glm-5.3-flash` | OpenRouter | `72bea604c3f5314b16841e2963a2a8cef7b17d01060680de10c1661c0ce1afdb` |

#### Báo cáo rà lại toán

###### Báo cáo rà soát (đọc trực tiếp dữ kiện đã cung cấp, không dùng công cụ)

###### A06 — Một lượt quay lui: **ĐẠT**
- Kiểm lại: g=(6,28) ⇒ d=(-6,-28), gᵀd = −36−784 = −820 ✓; ngưỡng 62+0,1t(−820) = 62−82t ✓ (với f=½(3x₁²+7x₂²), f(2,4)=62).
- Điểm thử khớp x⁰=(2,4): t=1→(−4,−24), f=2040; t=1/2→(−1,−10), f=703/2=351,5 > 21 (loại đúng); t=1/4→(1/2,−3), f=255/8=31,875 ≤ 83/2=41,5 (nhận đúng).
- Thứ tự giá trị thử t = 1, 1/2, 1/4 đúng quy tắc co β=0,5; dừng ngay khi nhận, không tiếp tục — đúng.
- Ghichú tách bạch hướng gradient và hướng Newton: hợp lệ, không sai lệch.

###### C05 — Thuật toán Newton với quay lui: **ĐẠT**
- Trình tự (g, H ⇒ Hd=−g ⇒ δ²=−gᵀd ⇒ kiểm δ²/2 ≤ ε ⇒ Armijo ⇒ cập nhật) đúng theo Boyd–Vandenberghe §9.5.
- Chi phí Cholesky bậc n³ cho H≻0 đúng; ghi chú giới hạn phạm vi áp dụng (không nguyên dạng cho KKT bất định) chính xác.

###### E09 — Hiệu chỉnh nguyên thủy và đối ngẫu: **ĐẠT**
- Thế số: 2·9−24=−6 ✓; 5·(−4)−24=−44 ✓; 9−4=5 ✓.
- Nhất quán dữ kiện gốc: u⁰=(1,8), b=14 ⇒ r_p=−5 ⇒ hàng ràng buộc d₁+d₂=5 ✓; r_d=(2,40)+(4,4)=(6,44) ⇒ vế phải −6, −44 ✓.
- Cập nhật ν¹=4+(−24)=−20 ✓; kiểm tra sau bước: u¹=(10,4) ⇒ r_p=14−14=0, r_d=(20,20)+(−20,−20)=0 ✓.

###### E10 — Newton cho hệ phần dư: **ĐẠT**
- Hệ khối [[H, Aᵀ],[A,0]][d; Δν] = −[r_d; r_p] đúng dấu; khối trên −r_d, khối dưới −r_p ✓.
- Giả thiết (f lồi hai lần khả vi, H≻0, A hạng hàng đầy đủ, u trong miền, 0<α<1/2, 0<β<1) đúng chuẩn; điều kiện giảm ‖r(u+tΔ)‖ ≤ (1−αt)‖r‖ đúng.

###### E11 — Bình phương tối thiểu có đẳng thức: **ĐẠT**
- g=Mᵀ(Mw−y)+ρw, H=MᵀM+ρI ✓; với M=diag(1,2), ρ=1 ⇒ H=diag(2,5) ✓; chứng minh H≻0 qua vᵀHv=‖Mv‖²+ρ‖v‖² đúng.
- A=[1 1] p×n hạng hàng đầy đủ (p=1), b=14 khớp ví dụ đẳng thức ở E09/E12 ✓.

###### E12 — Kiểm tra hai chế độ Newton: **ĐẠT**
- N=(−1,1), NᵀHN = 2·1 + 5·1 = 7 ✓.
- Chế độ I: Ad=0, Armijo trên F — đúng.
- Chế độ II: Ad = −r_p = 14−9 = 5 ✓; phương trình theo u₂: 5d₂+Δν = −r_d2 = −(5·8+4) = −44 ✓.
- Câu hỏi về lỗi −40: diễn giải đúng — dùng −40 là quên cộng ν⁰=4 vào gradient (g₂=40, r_d2=44); yêu cầu kiểm cả r_d và r_p sau cập nhật là đúng và đủ.

###### Kết luận
Cả 5 trang **đạt toàn bộ** các điểm kiểm tra yêu cầu: phép thế số, thứ tự giá trị thử trong quay lui, giả thiết H cho chi phí, giả thiết A p×n hạng hàng đầy đủ, liên kết ví dụ ridge A=[1 1], b=14, và các cặp hỏi–đáp. Không phát hiện lỗi số hay lỗi dữ kiện ràng buộc nào; không cần chỉnh sửa.

#### Báo cáo rà lại mạch

##### Báo cáo rà soát mạch kể chuyện — Bài 04 (46 trang, 7 mạch)

###### 1. Kết luận phát hành
**Đạt, chấp nhận phát hành về mạch.** Cấu trúc 7 mạch không đổi, các ranh giới mạch đều có câu chuyển ý, các chỉnh sửa P01, B06, E09, E10, E11, E12 đã hiện diện đúng yêu cầu, B04 được chấp nhận theo quyết định cổng storyboard (hình elip → hình ròn, chỉ đổi bố cục hình, không đổi nội dung). Không phát hiện lỗi mạch buộc chặn phát hành.

###### 2. Bảng 7 mạch

| # | Mạch (trang) | Chức năng | Đầu vào | Đầu ra | Đóng góp vào mạch sau | Vấn đề |
|---|---|---|---|---|---|---|
| 1 | Mở đầu P00–P04 | Đặt hai nhiệm vụ tính (giảm hàm tự do; giữ đẳng thức), nêu kết quả cần có, kiểm tra tiên quyết | Đề cương, hai hàm ví dụ, dữ kiện tiên quyết | Hai bài toán mở đầu + kỹ năng gᵀd, Av | Luận điểm "quy trình lặp = hướng + bước + dừng + khả thi" dẫn vào A | Không có. P01 đã có bảng nút kết quả/vai trò rõ |
| 2 | Hướng & bước A01–A07 | Định nghĩa hướng giảm, kiểm bằng số, Armijo, một lượt quay lui, kiểm quy tắc | f, x⁰, g⁰, H; d=−g | x⁺=(1/2,−3), t=1/4; quy tắc nhận bước | "Độ cong khác nhau → cần thước đo phù hợp" mở B | A07 ghi chú câu cuối "Một bước hợp lệ chưa giải thích ảnh hưởng của hình học đến cả đường đi" cụt ý, nên viết lại thành câu chuyển sang B (không thuộc 6 mục chỉnh sửa nhưng nên sửa chữ) |
| 3 | Thước đo độ dài B01–B06 | Chuẩn Euclid vs chuẩn W, tiền điều kiện, hội tụ gradient, kiểm tra gắn chuẩn | g, W=diag(3,7) | d_W=(−2,−4); nguyên tắc "giảm dốc nhất phải nói rõ chuẩn" | "Thước đo từ Hessian dẫn tới Newton" mở C | B06 đã tách 3 câu hỏi rõ (nhãn a/b, giải thích, câu phủ định). Đạt |
| 4 | Newton C01–C08 | Mô hình bậc hai, hệ Hd=−g, độ giảm δ²/2, thuật toán, hội tụ có điều kiện, ví dụ 1 biến | g, H≻0 | δ_N²/2 là tiêu chí dừng theo mô hình; phân biệt mô hình vs sai số thật | "Cần kiểm soát biến thiên độ cong" mở D | Không có lỗi mạch. C08→D01 chuyển tốt |
| 5 | Tự điều chỉnh D01–D05 | Bất đẳng thức tương đối, định nghĩa, bảo toàn affine, cặp hàm −log s vs s−log s | φ″, φ‴ | Tự điều chỉnh ≠ bảo đảm tồn tại nghiệm | "Ràng buộc có thể làm bước không dùng được" mở E | D05→E01 chuyển rõ. Đạt |
| 6 | Ràng buộc đẳng thức E01–E12 | Khử biến, không gian rỗng, hệ Newton khả thi, hệ phần dư, bình phương tối thiểu, kiểm hai chế độ | F, A=[1 1], b=14, u⁰ khả thi/chưa khả thi | Hệ khối [H Aᵀ; A 0]; nghiệm (10,4), ν=−20; tiêu chí ‖r_d‖, ‖r_p‖ | Bảng lựa chọn phương pháp ở Z | E09 đã nêu phép thế và 3 phép kiểm vô hướng; E10 đã có nhãn 2 khối; E11 đã có đủ dữ kiện A, b; E12 đã có chỗ điền "Ad=…" và vế phải. Đạt cả 4 |
| 7 | Tổng hợp Z01–Z03 | Bảng chọn phương pháp theo dữ kiện, kiểm tra quy trình, bài tập/đọc thêm | Toàn bộ 6 mạch trước | Quy trình chọn hoàn chỉnh | Kết bài, nối bài sau | Z02 ghi chú nêu trọn lời giải — nếu ghi chú là tài liệu giảng viên thì chấp nhận; nếu lộ cho học viên thì nên chuyển sang Z03 |

###### 3. Kiểm tra các chỉnh sửa được yêu cầu
- **P01 (nút nêu kết quả):** bảng "Kết quả cần có / Vai trò" với 2 hàng, dòng chốt "mỗi cụm bổ sung một thành phần quy trình" — đạt.
- **B06 (tách 3 câu):** ba câu hỏi đánh số ý rõ: nhãn Euclid, nhãn chuẩn W, câu hỏi phủ định về suy số vòng hội tụ — đạt.
- **E09 (phép thế rõ hơn):** có khối "Nghiệm và phép thế" kèm 3 đẳng thức kiểm (2×9−24=−6; 5×(−4)−24=−44; 9−4=5) — đạt.
- **E10 (nhãn 2 khối):** dòng "Khối trên: −r_d; khối dưới: −r_p" — đạt.
- **E11 (dữ kiện A, b):** A=[1 1], b=14 xuất hiện trong phần dữ kiện và trong ví dụ khôi phục — đạt.
- **E12 (chỗ điền):** hai chỗ "Ad=…" và "5d₂+Δν=…" ở chế độ II — đạt.
- **B04:** hình elip → hình ròn: chấp nhận theo cổng storyboard; ghi chú đã nói đúng "chuẩn W đo độ dài theo elip" nên nội dung không mất.

###### 4. Kiểm tra chuyển trang và ranh giới
- **Đổi trang trong mạch:** mỗi trang đều có câu cuối ghi chú mở sang trang kế (A06→A07, C07→C08, E08→E09, v.v.) — nhất quán.
- **2 trang lân cận mỗi phía của ranh giới:** P03–P04→A01 (tiên quyết gᵀd được dùng lại ở A03 ✓); A06–A07→B01–B02 (bước 1/4 và g tái sử dụng ✓); B05–B06→C01–C02 (d_W=(−2,−4) trùng d_N ở C02 ✓); C07–C08→D01–D02 (hàm s−log s nối tiếp ✓); D04–D05→E01–E02 (cảnh báo ràng buộc → bài đẳng thức ✓); E11–E12→Z01–Z02 (mô hình bình phương tối thiểu tái dùng ✓).
- **7 ranh giới mạch:** đều có câu chuyển ý tường minh; không có mạch nào kết thúc đột ngột.

###### 5. Vấn đề còn lại (không chặn phát hành)
1. **A07, ghi chú, câu cuối** cụt/khó hiểu — nên viết lại thành câu chuyển sang mạch B (sửa chữ, không đổi mã trang).
2. **Z02 ghi chú** lộ đầy đủ lời giải câu hỏi — cân nhắc dời phần lời giải sang Z03 hoặc đánh dấu là ghi chú giảng viên.
3. **P02:** hai hình SVG thật đã có trong bản gốc (bản trích bỏ tag img) — xác nhận đúng, không yêu cầu thêm ảnh.

**Quyết định: phát hành.**


### Triển khai RevealJS 46 trang — 2026-09-24

Người dùng đã xác nhận triển khai và cho phép OpenRouter; sau đó nhấn mạnh dùng `storyboard.md` làm căn cứ. Bản RevealJS giữ46mã,7mạch và7trang kiểm tra của kế hoạch. Hồ sơ và hai tài liệu học tập được đồng bộ theo ba bộ số đã chốt. Các phần về dàn bài/HTML40trang bên dưới là lịch sử.

#### Điều phối và bằng chứng runtime

Các vai reader/reviewer/writer đều trả metadata cầu nối `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`. Vai lập kế hoạch và phân tích nguồn hoàn tất trước soạn; điều phối sửa lỗi nháp về bình phương độ giảm và phân biệt danh sách trang ưu tiên thị giác với7trang kiểm tra. Writer bài tập sửa riêng mô hình học có ràng buộc; điều phối bác bản nháp từng bỏ ràng buộc và sửa cách gọi hướng chuẩn hóa. Cổng storyboard rà46/46 và yêu cầu bổ sung sơ đồ đổi thước đo B04; đã thêm `metric-transform.svg` và xác nhận tài sản cục bộ. Năm reviewer độc lập chạy theo cùng bản; báo cáo đầy đủ được giữ dưới đây.

Lỗi runtime đã báo người dùng: writer sửa bài tập `RuntimeError: OpenRouter request exceeded 300s wall timeout`; các lượt reviewer đầu `model exceeded the tool-call limit (8)`, hai lượt tiếp theo `model exceeded the tool-call limit (24)`. Đã dừng giai đoạn phụ thuộc, giữ bản nháp, thu hẹp yêu cầu hoặc cung cấp trực tiếp gói nội dung rồi chạy lại cùng mô hình/nhà cung cấp. Không dùng vai mặc định thay thế và không gửi bí mật/tệp môi trường.

#### Quyết định đối với báo cáo

| Nguồn nhận xét | Quyết định và bằng chứng |
|---|---|
| Cổng storyboard N1 | Sửa B04: elip $v^TWv=1$ biến thành đường tròn trong tọa độ $z=W^{1/2}v$; cùng hướng được ánh xạ đúng; SVG có mô tả thay thế. |
| Cổng N0/N2 | 15 SVG hiện hữu, được trình duyệt tải thành công; cập nhật trạng thái outline/storyboard từ kế hoạch sang bản đã dựng. |
| Tỷ lệ cột, B06, C05, E10/E11/E12 | Chỉnh cục bộ theo quyết định bố cục, nhãn các khối và vị trí phép tính; giữ46trang và thứ tự. |
| Sinh viên A06 | Không có lỗi toán: $703/2=351{,}5$, $255/8=31{,}875$, $83/2=41{,}5$. Giữ bảng phân số chính xác; ghi chú nêu rõ các cặp bằng nhau để giảng không nhầm. |
| Sinh viên C07 | Giữ giảm thật một bước trong ghi chú và bảng ba đại lượng trong lecture-note; đây là phần diễn giải cần kiểm Armijo, không phải dữ liệu thiếu trên trang. Không thêm hàng làm bảng quá tải. |
| Sinh viên E09 | Làm rõ phép thế $2\cdot9-24=-6$ và $5(-4)-24=-44$; không đổi hệ hay kết quả. |
| Sinh viên P04/E12/Z03 | Giữ khoảng trắng tính tay và đáp án trong ghi chú/tài liệu; không đưa mã trang nội bộ lên mặt chiếu để làm chỉ dẫn tự học. |
| Giảng dạy P02 | Bác nhận xét thiếu hình: HTML có hai SVG và ảnh chụp xác nhận hai hình; nhận xét xuất phát từ bản trích xuất văn bản. Giữ nội dung và ghi chú hình. |
| Giảng dạy P03 | KKT đã có ở bài03; ghi đầy đủ tên ở lần xuất hiện đầu. Không xem đây là kỹ thuật chưa dạy. |
| Mạch kể chuyện P00 | Cột storyboard mô tả luận điểm trang trước→trang sau, không phải hai phát biểu của riêng P00; sửa nhãn cột để hết nhập nhằng, không đổi tuyến. |
| Toán học | Kiểm lại độc lập ba ví dụ và các chứng minh: không lỗi chặn/nghiêm trọng. Sửa dấu phẩy thừa trong bài tập; thống nhất tên nguồn MIT6.079 với trang khóa học. |
| Chuyên gia C06 | Giữ giả thiết đủ mạnh cho mô tả hai pha; định lý trong tài liệu trình bày riêng cận cục bộ với giả thiết tối thiểu hơn. Không coi giả thiết đủ mạnh hơn là sai. |


#### Báo cáo độc lập: Góc nhìn sinh viên

##### Báo cáo rà soát 46 trang Bài 04 (góc nhìn sinh viên năm 3)

Phạm vi: nhận thức/tải nhận thức, tiên quyết, độ rõ dữ kiện số và ký hiệu, bố cục, câu hỏi và tự học. Chỉ dựa trên bản đọc và storyboard đã cung cấp; không gọi công cụ đọc lại.

###### Bảng mức độ / trang / vấn đề / bằng chứng / sửa cụ thể

| Mức độ | Trang | Vấn đề | Bằng chứng | Sửa cụ thể |
|---|---|---|---|---|
| Lỗi (trung bình) | A06 | Bảng ghi "Ngưỡng Armijo 62−82t" nhưng cột quyết định dùng ngưỡng số; dòng t=1/2 ghi ngưỡng "21" trong khi ghi chú nói "ngưỡng tương ứng 41,5" cho lần thứ ba — hai cách trình bày ngưỡng (biểu thức vs. số) lẫn lộn trên cùng bảng, dễ nhầm khi đối chiếu | Mặt trang: t=1 → −20; t=1/2 → 21; t=1/4 → 83/2; ghi chú: "chỉ lần thứ ba nhỏ hơn ngưỡng tương ứng 41,5" | Thống nhất một dạng: hoặc cả ba dòng đều là biểu thức 62−82t (−20; 21; 41,5), hoặc cả ba đều là số thập phân; thêm một dòng chú thích "ngưỡng = 62−82t" phía trên bảng |
| Lỗi (trung bình) | A06 | Dòng t=1/2 ghi giá trị "703/2" nhưng ghi chú nói "351,5" — hai dạng phân số/thập phân không khớp trực quan (703/2 = 351,5, đúng về số nhưng trộn dạng với 2040 và 255/8) | Bảng: 2040; 703/2; 255/8; ghi chú: "2040, 351,5 và 31,875" | Chọn một quy ước: nếu bảng dùng phân số thì ghi chú cũng dùng phân số (703/2, 255/8), hoặc ngược lại toàn thập phân (2040; 351,5; 31,875) |
| Lỗi (nhẹ) | C07 | Bảng ghi "Sai số thật: log4−3/4 ≈ 0,6363" nhưng ghi chú còn nêu thêm "mức giảm của riêng một bước là log(7/4)−3/16 ≈ 0,3721" — số thứ ba này không có trên mặt trang, trong khi storyboard yêu cầu "hạn chế hiện một lúc quá ba hàng bằng xuất hiện từng bước"; sinh viên tự học không thấy đại lượng thứ ba được phân biệt | Mặt trang chỉ có 9/32 và 0,6363; ghi chú có 0,3721 | Nếu 0,3721 cần thiết cho mục tiêu phân biệt ba đại lượng, đưa vào bảng như một hàng xuất hiện theo bước; nếu không, bỏ khỏi ghi chú để tránh dữ kiện "chỉ có trong ghi chú" |
| Lỗi (nhẹ) | E09 | Phép kiểm "18−24=−6" dùng d₁=9 nhưng mặt trang không ghi rõ 2d₁=18 đến từ đâu trong hệ (phương trình đầu là 2d₁+Δν=−6); sinh viên phải tự suy 2·9=18 | Hệ: 2d₁+Δν=−6; kiểm: 18−24=−6 | Thêm một cụm từ "2·9=18" hoặc ghi kiểm dưới dạng "2(9)+(−24)=−6" |
| Góp ý (tùy chọn) | P04 | Hai câu hỏi tiên quyết không có chỗ ghi đáp án/khung kiểm tra trên mặt trang; nửa dưới chỉ là "khoảng trắng tự tính" — hợp lệ theo storyboard nhưng sinh viên tự học không có cách tự đối chiếu | Storyboard P04: "chừa nửa dưới để người học tự tính"; ghi chú có đáp án 16 và 0 | Cân nhắc đưa đáp án vào trang xuất hiện theo bước (như C07) hoặc dẫn về trang tự học có đáp án; không bắt buộc |
| Góp ý (tùy chọn) | B02 | Hai hướng v_E và v_W hiển thị cạnh nhau nhưng mặt trang không nêu giá trị số gᵀv_E, gᵀv_W; ghi chú nói "không so trực tiếp" — đúng về học thuật, nhưng sinh viên năm 3 có thể tự tính và thắc mắc vì thiếu nhãn "không so sánh được" trên mặt trang | Ghi chú: "Không so trực tiếp giá trị gᵀv… hai tập hướng có ngân sách độ dài khác nhau" | Thêm một dòng nhãn dưới hai hình: "hai chuẩn khác ngân sách độ dài — không so gᵀv trực tiếp" |
| Góp ý (tùy chọn) | E12 | Câu hỏi phần II yêu cầu "Điền vế phải phương trình dừng theo u₂" nhưng mặt trang không có ô/khoảng trống được đánh dấu rõ là chỗ điền (đã xác nhận là khoảng trắng tự tính, không phải ô nhập tương tác) — với tự học, cần nhãn "điền vào chỗ trống" rõ ràng | Mặt trang II: "Điền vế phải phương trình dừng theo u₂" | Gắn nhãn văn bản "chỗ điền: ______" hoặc khung viền nhẹ để phân biệt vùng trả lời với khoảng trắng trang |
| Góp ý (tùy chọn) | Z03 | Ba nhiệm vụ tự học đều là sản phẩm quan sát được, nhưng không có tiêu chí tự kiểm (ví dụ: "bảng Armijo khớp A06") — sinh viên tự học khó biết khi nào hoàn thành | Z03: "Tái tạo bảng Armijo — Điểm thử, ngưỡng và bước đầu được nhận" | Thêm một cụm đối chiếu mỗi nhiệm vụ (ví dụ "so với A06", "so với C07/C08", "so với E11") |

###### Nhận xét theo tiêu chí (không phải lỗi)

- **Tiên quyết:** chuỗi tiên quyết sạch. P04 chỉ dùng tích vô hướng và nhân ma trận (đúng phạm vi trước phần A); A07, B06, C08, D05, E12 đều kiểm đúng nội dung vừa dạy, không đòi khái niệm chưa giới thiệu. Không phát hiện bài tập "đi trước" kiến thức.
- **Dữ kiện số:** các phép tính kiểm được đều nhất quán: gᵀd=16 (P04/A03), −820 (A03/A06), Armijo 62−82t (A06), Wd=−g ⇒ (−2,−4) (B04), NᵀHN=7 (E12), dᵀHd=343 (E07), phần dư (6,44,−5) và η=−20 (E08/E09), δ²=9/16, giảm mô hình 9/32 (C07). Hai điểm cần thống nhất dạng trình bày số đã liệt kê ở bảng (A06).
- **Ký hiệu:** phân biệt d (hướng), t (bước), η (nhân tử mô hình khả thi) và ν (nhân tử phần dư) được giữ nhất quán E05→E10; ghi chú E05/E09 chủ động cảnh báo nhầm η/ν — tốt. Ký hiệu chuẩn ‖·‖ bị escape thành "\| \|" trong bản đọc nhưng đó là hiện tượng trích xuất, không kết luận là lỗi mặt trang.
- **Bố cục:** mỗi trang khớp storyboard (tỷ lệ cột, vị trí bảng/hình); các trang gộp được storyboard biện minh rõ (B02, D02, E04, E10). Không phát hiện trang lệch khỏi storyboard.
- **Câu hỏi:** các câu hỏi đều có tiêu chí trả lời nêu trong ghi chú (A07: "phải có cả bất đẳng thức và vị trí dừng"; C08: "sửa cả hai sự đồng nhất") — tốt cho chấm và tự học; chỉ thiếu cơ chế tự đối chiếu khi tự học (đã nêu ở Z03/P04).
- **Tải nhận thức:** việc tách d và t (A04), tách giảm mô hình/sai số thật (C04), tách ba ô ν cũ/Δν/ν mới (E09) đều giảm tải đúng hướng; C05 đặt nhãn "giải hệ" tại đúng dòng giả mã khớp storyboard.

###### Kết luận

Không có lỗi nghiêm trọng. Có **2 lỗi trình bày số ở A06** (trộn phân số/thập phân và hai dạng ngưỡng trong cùng bảng) cần sửa trước khi dùng, **2 lỗi nhẹ** về dữ kiện chỉ có trong ghi chú (C07) và phép kiểm thiếu bước trung gian (E09), cùng **4 góp ý tùy chọn** về tự đối chiếu khi tự học (P04, B02, E12, Z03). Nội dung toán, tiên quyết, ký hiệu và bố cục đều nhất quán với storyboard và math-spec; các vị trí trống P04/E12 được xác nhận là khoảng trắng tự tính, không phải lỗi.


#### Báo cáo độc lập: Chuyên gia

##### Báo cáo rà soát Bài 04 (46 trang RevealJS + ghi chú giảng dạy)

Phạm vi: chỉ đọc `review-pack.md` (647 dòng) và `lecture-note.md` (1046 dòng). Không đọc lại outline/deck/storyboard. Đã kiểm tra độc lập các phép tính chính (Armijo, Newton, KKT, phần dư, self-concordant) trước khi kết luận.

###### 1. Kiểm tra độ phủ yêu cầu

| Yêu cầu | Kết quả | Bằng chứng |
|---|---|---|
| Đủ 46 trang | Đạt | P00–P04 (5) + A01–A07 (7) + B01–B06 (6) + C01–C08 (8) + D01–D05 (5) + E01–E12 (12) + Z01–Z03 (3) = 46 trang, khớp tuyên bố ở review-pack.md:3 |
| LLO6 | Đạt | A01–A04, B01–B06, C01–C08, Z01–Z03 gắn LLO6 |
| LLO7 | Đạt | D01–D05 (review-pack.md:369–437) |
| LLO8 | Đạt | A05–A07, B04–B06, C02, C05, C07, C08 |
| LLO9 | Đạt | E01–E12 |
| LLO10 | Đạt | E03–E12 (khử không gian rỗng, hệ KKT, Newton phần dư) |
| Ứng dụng AI | Đạt | E11 (ridge regression có ràng buộc, review-pack.md:579–591); lecture-note có mục "Ý nghĩa và ứng dụng trong AI" ở mọi mục 1–12 (vd. dòng 60, 92, 154, 218, 271, 345, 437, 543, 657, 701, 743, 805) |
| Chiều sâu (chứng minh đặt ở ghi chú/tự học) | Đạt | lecture-note có 10 định lý/mệnh đề kèm chứng minh (dòng 98–118, 160–180, 277–303, 351–391, 443–469, 471–507, 549–584, 852–897, 899–1003, 1005–1011); slide không bị ép chứng minh đầy đủ — đúng nguyên tắc "không buộc chứng minh trên slide nếu đã có ghi chú" |
| 2 tiết LT + 1 tiết BT | Đạt về cấu trúc | 7 bài tập xen kẽ (P04, A07, B06, C08, D05, E12, Z02) + Z03 tổng hợp; khối lượng 46 trang/2 tiết là dày nhưng các trang P/A/B/E đều có ghi chú soạn chỉ định nội dung nói, chấp nhận được |

###### 2. Kiểm tra tính đúng đắn số học và toán (trọng tâm)

Tất cả các phép tính then chốt đều **đúng** khi kiểm lại độc lập:

- Armijo A06/lecture-note §3: f(x⁰+td)=62−820t+2798t²; các giá trị 2040, 703/2, 255/8 và ngưỡng −20, 21, 83/2 đều đúng; bước chính xác 205/1399 = 820/5596 đúng (lecture-note.md:151).
- B02: ‖v_W‖_W²=(12+112)/124=1 đúng (review-pack.md:191).
- B05: μ=3, L=7 ⇒ 1−μ/L=4/7 đúng.
- C02/C04: bước Newton (−2,−4), δ²=124, mức giảm 62 đúng.
- C07/D02: φ′(1/4)=−3, φ″=16, d=3/16, δ²=9/16, giảm mô hình 9/32, sai số thật log4−3/4≈0,6363, mức giảm thật log(7/4)−3/16≈0,3721, ngưỡng Armijo αδ²=0,05625 — tất cả đúng.
- E02/E03: F(3,11)=623/2, ψ(z)=196−28z+(7/2)z², z*=4, u*=(10,4), F*=140 đúng.
- E05/E07: g=(6,55), d=(7,−7), Hd+g=(20,20), η=−20, δ_eq²=343 đúng; Armijo tại t=1 thỏa (140 ≤ 311,5−34,3).
- E08/E09: r_d=(6,44), r_p=−5; nghiệm d=(9,−4), Δν=−24; kiểm 18−24=−6, −20−24=−44, 9−4=5 đúng.
- E11/E12: H=diag(2,5), NᵀHN=7, vế phải −44 (không phải −40) đúng.
- Các định lý: bất biến Newton qua affine (dòng 471–507), khả nghịch ma trận KKT (949–975), tốc độ tuyến tính 1−μ/L (351–391), cận ω*(δ_N) (872–883) — phát biểu và chứng minh đều chính xác, giả thiết được nêu đủ.

###### 3. Bảng phát hiện

| Mức độ | Vị trí | Vấn đề | Bằng chứng | Đề xuất |
|---|---|---|---|---|
| Thấp / tùy chọn | review-pack.md:329 (C06) | Giả thiết slide "μI⪯H(x)⪯LI" mạnh hơn định lý trong ghi chú (chỉ cần chặn dưới μI + Hessian Lipschitz cục bộ, lecture-note.md:551). Không sai (đủ để suy ra), nhưng hơi dư | So C06 với lecture-note.md:549–559 | Tùy chọn: ghi "đủ (không cần thiết)" hoặc bỏ chặn trên L để khớp định lý; giữ nguyên cũng chấp nhận được vì slide là phát biểu "điển hình" |
| Thấp / tùy chọn | lecture-note.md:20, 1043–1044 | Ký hiệu khóa học "MIT 6.079/6.975" — phần "/6.975" không xác minh được trong phạm vi hai tệp này | Dòng 20 và mục tài liệu tham khảo 3–4 | Xác minh mã khóa học trên OCW trước khi phát hành; nếu chỉ có 6.079 thì bỏ "/6.975" |
| Thấp / tùy chọn | review-pack.md:231 (B05) | Cụm "nghiệm tối ưu đạt được" nằm trong ô giả thiết — đúng về logic (cần cho f−f*) nhưng dễ bị đọc lướt như hệ quả của lồi mạnh | B05 mặt trang | Tùy chọn: tách thành dòng "giả thiết thêm: đạt giá trị tối ưu p*" để nhất quán với lecture-note.md:353–366 |
| Thấp / tùy chọn | review-pack.md:3 (tiêu đề pack) | "N1 của gate đã sửa bằng SVG metric-transform" — trạng thái sửa không kiểm chứng được chỉ từ hai tệp này (không có tệp SVG trong phạm vi đọc) | review-pack.md:3 | Nếu cần nghiệm thu gate, nêu rõ SVG nào tương ứng B02/B04; không bắt buộc cho nội dung giảng dạy |
| Không phải lỗi | P04/E12 có vị trí trống | Đã được chính pack giải thích là khoảng trắng bố cục, không phải ô nhập tương tác | review-pack.md:3, 69, 601 | Không cần sửa |

Không phát hiện lỗi số học, lỗi thuật ngữ, lỗi giả thiết–kết luận, hay mâu thuẫn slide–ghi chú nào ở mức phải sửa bắt buộc. Các thuật ngữ (chuẩn đối ngẫu, hướng giảm dốc nhất chuẩn hóa/không chuẩn hóa, δ_N²/2, δ_eq², r_d/r_p, self-concordant chuẩn, LDLᵀ thay Cholesky cho hệ KKT bất định) được dùng nhất quán giữa hai tệp và đúng với Boyd–Vandenberghe ch. 9–10.

###### 4. Kết luận

**ĐẠT.** Bộ 46 trang phủ đủ LLO6–10, có ứng dụng AI cụ thể (E11), chiều sâu đặt đúng chỗ (chứng minh trong ghi chú tự học, không ép lên slide), số liệu tự dựng nhất quán và đúng đắn khi kiểm lại độc lập. Bốn mục ở bảng trên đều ở mức tùy chọn/nhẹ, không chặn việc phát hành; khuyến nghị xử lý mục C06 (giả thiết dư) và xác minh mã khóa học MIT trước khi đóng bản.


#### Báo cáo độc lập: Toán học

##### Báo cáo rà soát toán học — Bài 04 (review-pack.md, lecture-note.md, exercises.md, math-spec.md)

Phạm vi: chỉ 4 tệp trên, đọc 1 lượt mỗi tệp (max_lines=2000, không đọc trùng, không đọc outline/deck/storyboard). Đã **tự tính lại độc lập** toàn bộ 3 ví dụ số (VD1 bậc hai 3/7, VD2 log tại 1/4, VD3 tổng 14) và các chứng minh/phát biểu kèm theo.

###### 1. Tự tính 3 ví dụ (kiểm chứng số)

**VD1** — f=½(3x₁²+7x₂²), x⁰=(2,4): g=(6,28) ✓; f₀=½(12+112)=62 ✓; ‖g‖²=36+784=820 ✓. Bảng Armijo (α=0,1, β=0,5, ngưỡng 62−82t):
- t=1: (−4,−24), f=½(48+4032)=2040 > −20 → loại ✓
- t=1/2: (−1,−10), f=½(3+700)=703/2=351,5 > 21 → loại ✓
- t=1/4: (½,−3), f=½(3/4+63)=255/8=31,875 ≤ 83/2=41,5 → nhận ✓
- Tìm kiếm chính xác: f(t)=62−820t+2798t² ⇒ t*=820/5596=205/1399 ✓ (lecture-note L151)
- Hướng Newton: Hd=−g ⇒ d=(−2,−4), δ²=124, giảm mô hình 62 = sai số thật (hàm bậc hai) ✓; Armijo t=1: 0 ≤ 62−12,4=49,6 ✓

**VD2** — φ=s−log s, s⁰=1/4: φ′=1−1/s=−3 ✓; φ″=16 ✓; d_N=3/16, s¹=7/16 ✓; δ²=9/16 ✓; δ²/2=9/32=0,28125 ✓; sai số thật φ(1/4)−φ(1)=log4−3/4≈0,636294 ✓; giảm một bước log(7/4)−3/16≈0,372116 ✓; Armijo: 0,3721 ≥ αδ²=0,05625 ✓. Tự điều chỉnh: |φ‴|=2/s³=2(φ″)^{3/2} mọi s>0; tại 1/4: 2·16^{3/2}=128 ✓.

**VD3** — F=½(2u₁²+5u₂²), u₁+u₂=14:
- Khử: ψ(z)=½(2(14−z)²+5z²)=196−28z+(7/2)z² ✓; ψ′=7z−28=0 ⇒ z*=4, u*=(10,4), F*=½(200+80)=140 ✓; ν*=−20 ✓
- Khả thi (3,11): g=(6,55) ✓, F₀=½(18+605)=623/2 ✓; d=(7,−7): Hd+g=(20,20)=−Aᵀη, η=−20 ✓; δ²_eq=2·49+5·49=343 ✓; 343/2=623/2−140 ✓
- Chưa khả thi (1,8), ν⁰=4: g=(2,40) ✓; r_d=(6,44) ✓ (đã cộng Aᵀν=(4,4)); r_p=9−14=−5 ✓; hệ [2 0 1;0 5 1;1 1 0]d=(−6,−44,5): 2·9−24=−6 ✓; 5(−4)−24=−44 ✓; 9−4=5 ✓; u¹=(10,4), ν¹=−20 ✓
- E11/E12: M=diag(1,2), ρ=1 ⇒ H=diag(2,5) ✓; NᵀHN=2+5=7 ✓

**Các số khác:** B05: μ=3, L=7 ⇒ 1−μ/L=4/7 ✓ (phép thế e⁺≤e−‖g‖²/(2L), ‖g‖²≥2μe ⇒ hệ số 2 triệt tiêu — khớp mục "Kiểm riêng hệ số" của math-spec); B02: ‖(−2,−4)‖²_W=3·4+7·16=124 ✓; B01: x₂−(1/4)·7x₂=−(3/4)x₂ ✓; P04: gᵀd=−12+28=16, Av=0 ✓; A03: gᵀ(−g)=−820, gᵀv=16 ✓; E01: bước Newton không ràng buộc từ (3,11) là (−3,−11) ✓; E03: bước z là −7 ⇒ Δu=NΔz=(7,−7) ✓; định lý hội tụ bậc hai: chặn (L_H/2μ)‖e‖² ✓; cận tự điều chỉnh ω(δ)=−δ−log(1−δ) và pha tắt dần ω(δ)=δ−log(1+δ) ✓ đúng chuẩn BV; hệ KKT khả nghịch (chứng minh nhân dᵀ, dùng hạng hàng đầy đủ của A) ✓; H=MᵀM+ρI≻0 không cần M hạng cột đầy đủ ✓; hệ khối KKT [H Aᵀ;A 0][w;ν]=[Mᵀy;b] ✓ (từ Hw+Aᵀν=Mᵀy).

###### 2. Bảng phát hiện

| Mức độ | Vị trí | Vấn đề | Bằng chứng | Đề xuất |
|---|---|---|---|---|
| Nhẹ (bắt buộc sửa trước công bố) | exercises.md, dòng 20 (lời giải Bài 1) | Lỗi chính tả/dấu: "hệ số góc của ngưỡng là khác , hai bảng…" — dấu phẩy đứng sau khoảng trắng, câu cụt | "…hệ số góc của ngưỡng là khác , hai bảng không dùng chung hệ số." | Sửa thành "…là khác, hai bảng không dùng chung hệ số." |
| Tùy chọn | lecture-note.md, dòng 20 và 1043–1044 | Ký hiệu "MIT 6.079/6.975" — mã "6.975" không xuất hiện ở hai tệp còn lại (chỉ ghi "MIT 6.079"); không xác minh được từ tài liệu trong phạm vi | L20: "MIT 6.079/6.975 Introduction to Convex Optimization" | Kiểm tra lại mã môn học nguồn; nếu nguồn chỉ dùng 6.079 thì thống nhất về một ký hiệu. (Không khẳng định sai — chỉ yêu cầu nhất hóa.) |
| Tùy chọn (đã đúng, chỉ ghi nhận) | review-pack.md L3, math-spec.md L5 | Kiểu dính số "46trang", "dựng46trang" — nhất quán toàn bộ, không phải lỗi toán | L3 review-pack; L5 math-spec | Giữ nguyên nếu là quy ước soạn thảo chung; không bắt buộc. |

Không phát hiện bất kỳ lỗi số học, lỗi giả thiết, lỗi kích thước ma trận, lỗi sai số hay lỗi phát biểu hội tụ nào. Các phân biệt bắt buộc đều được tôn trọng: δ²/2 (giảm mô hình) ≠ sai số thật (VD2, C08); η (nhân tử mô hình khả thi) ≠ Δν (hiệu chỉnh nhân tử phần dư); −44 ≠ −40 (E08/E09/E12); không dùng Cholesky cho hệ KKT bất định (E07, math-spec); hệ số hội tụ 1−μ/L không phải 1−2μ/L (B05, math-spec §"Kiểm riêng"); tính tự điều chỉnh không suy tồn tại nghiệm (D04/D05, Bài 5); không suy hội tụ từ mọi điểm đầu cho Newton phần dư (E10, HT13).

###### 3. Kết luận

**ĐẠT.** Toàn bộ số liệu ở 1/4 (δ²=9/16, giảm mô hình 9/32, sai số thật log4−3/4≈0,6363), bảng Armijo t=1/4, tổng 14 (feasible (3,11), d=(7,−7); infeasible (1,8), ν=4, r_d=(6,44), r_p=−5, d=(9,−4), Δν=−24), hồi quy có ràng buộc Aw=b (H=diag(2,5), nghiệm (10,4), ν*=−20) đều được tính lại độc lập và khớp hoàn toàn giữa 4 tệp. Các chứng minh (hướng giảm, Armijo kết thúc, chuẩn đối ngẫu, tốc độ tuyến tính, bất biến affine của Newton, khả nghịch KKT, tham số hóa không gian rỗng, duy nhất nghiệm ridge có ràng buộc) đều đúng với giả thiết phát biểu đầy đủ. Chỉ còn 1 lỗi dấu câu nhẹ (bắt buộc sửa) và 1 mục nhất hóa ký hiệu nguồn (tùy chọn).


#### Báo cáo độc lập: Phản biện giảng dạy

##### Báo cáo phản biện học thuật–giảng dạy — Bài 04 (46 trang, 7 mạch P/A/B/C/D/E/Z)

Phạm vi: rà 6 bước nhu cầu→trực quan→ví dụ→hình thức→ứng dụng→bài tập; liên kết ví dụ–ký hiệu; đối chiếu LLO6–10 và phân bổ 2LT+1BT. Chỉ dựa trên tài liệu đã cung cấp, không gọi công cụ đọc lại.

###### Bảng tổng hợp

| Mức độ | Trang | Vấn đề | Bằng chứng | Sửa cụ thể |
|---|---|---|---|---|
| Lỗi nhỏ (trình tự–nhất quán) | P02 | Ghi chú nhắc "Hình chỉ định hướng" nhưng bố cục storyboard của P02 là "hai cột 1:1… một câu kết ở đáy", không có hình | P02: bố cục hai cột; ghi chú: "Hình chỉ định hướng; điểm tối ưu… sẽ được kiểm chứng bằng phép khử một biến" | Bỏ câu nhắc hình trong ghi chú, hoặc bổ sung hình vào bố cục P02 trong outline; hiện trạng ghi chú mô tả một thành phần không tồn tại trên mặt trang |
| Góp ý tùy chọn (đã được quy ước cho phép) | A01 | Ví dụ dẫn nhập đứng trước trực quan A02, lệch thứ tự chuẩn 6 bước | A01 vai trò "nhu cầu + ví dụ dẫn nhập"; storyboard tuyên bố rõ "ví dụ cùng nhu cầu trước trực quan theo quy ước của kho" | Không bắt buộc sửa; nếu muốn thuần nhất chu trình, có thể ghi chú trên slide rằng A01 là ví dụ mở đầu phục vụ nhu cầu |
| Góp ý tùy chọn | B05, C06 | Hai trang "bảo đảm/giới hạn" không đi đủ chu trình 6 bước (không có ứng dụng/bài tập riêng) | Storyboard: "kết quả hỗ trợ… không mở một chu trình đầy đủ riêng"; việc kiểm suy diễn quá mức được dồn về B06/C08/Z02 | Chấp nhận được theo thiết kế; chỉ cần đảm bảo B06/C08/Z02 thực sự phủ câu hỏi suy diễn — hiện B06 ("Có thể suy số vòng hội tụ…?") và C08 ("Sai số thật bằng 9/32…") đã phủ |
| Góp ý tùy chọn | P03 | Liệt kê "KKT" trong khung kiến thức sử dụng ngay từ đầu, trong khi KKT mới được lập ở E06 | P03: "Hệ tuyến tính và điều kiện Karush–Kuhn–Tucker (KKT)"; E06 mới dựng hệ khối | Có thể ghi "điều kiện dừng có ràng buộc đẳng thức (KKT)" để tránh hiểu là tiên quyết phải biết trước; P04 đúng mức chỉ kiểm tích vô hướng và nhân ma trận, không đòi KKT |
| Góp ý tùy chọn | Z03 | Ba sản phẩm liệt kê và cách phân loại ba tầng (nhận biết/tính toán–chứng minh/vận dụng) không được ánh xạ tường minh từng cặp | Z03: 3 nhiệm vụ; ghi chú: "các bài tập được chia thành nhận biết, tính toán hoặc chứng minh, và vận dụng" | Thêm một cột hoặc ghi chú gắn từng nhiệm vụ với tầng nào, giúp sinh viên tự đánh giá sản phẩm |
| Xác nhận đúng (không phải lỗi) | P04, E12 | Vị trí trống là khoảng trắng bố cục, không phải ô nhập tương tác | Đề bài đã xác nhận; storyboard P04 "chừa nửa dưới để người học tự tính", E12 "đáp án không hiện trước" | Giữ nguyên |
| Xác nhận đúng | B04 | SVG đổi thước đo đã có, đúng vai trò ứng dụng "giải hệ thay vì lập nghịch đảo" | B04 bố cục "sơ đồ đổi thước đo 45%" | Giữ nguyên |

###### Kiểm tra chi tiết theo tiêu chí

**1. Trình tự 6 bước từng mạch — đạt:**
- A: nhu cầu (A01) → trực quan (A02) → ví dụ (A03) → hình thức (A04–A05) → ứng dụng (A06) → bài tập (A07). Đúng.
- B: B01 nhu cầu+trực quan → B02 ví dụ → B03 hình thức → B04 ứng dụng → B06 bài tập (B05 là kết quả hỗ trợ, có kiểm ở B06). Đúng.
- C: C01 nhu cầu+trực quan → C02 ví dụ → C03–C04 hình thức → C05/C07 ứng dụng → C08 bài tập (C06 hỗ trợ, kiểm ở C08). Đúng.
- D: D01 nhu cầu → D02 trực quan+ví dụ → D03 hình thức → D04 ứng dụng → D05 bài tập. Đúng.
- E (khử): E01 nhu cầu → E02 trực quan+ví dụ → E03 ví dụ → E04 hình thức+ứng dụng → E12 bài tập. Đúng (E04 gộp hai bước, storyboard đã tuyên bố lý do: bảng đặt ký hiệu cạnh trường hợp đã tính ở E03).
- E (khả thi): E05 ví dụ → E06 hình thức → E07 ứng dụng → E12. Đúng; E02 dùng lại làm trực quan theo storyboard.
- E (phần dư): E08 nhu cầu+trực quan+ví dụ dẫn nhập → E09 ví dụ → E10 hình thức → E11 ứng dụng → E12. Đúng.
- P04/Z02 là kiểm tra định hướng/tổng hợp, không ép chu trình — nhất quán với nguyên tắc storyboard.

**2. Liên kết ví dụ–ký hiệu — đạt:** cùng bộ số truyền tiếp xuyên suốt: g=(6,28), H=diag(3,7), f(x⁰)=62 từ P04/A01 đến A06–A07, B02–B04, C02–C04; φ=s−log s, s⁰=1/4 từ C07 đến C08, D01–D02, D05; F=½(2u₁²+5u₂²), tổng 14, u⁰=(3,11) từ P02 đến E01–E07, E11–E12; phần dư (6,44,−5), ν⁰=4 từ E08 đến E09, E12. Không phát hiện ví dụ dùng số không khớp ký hiệu đã khóa.

**3. Kiểm số học (trích):** A06 (2040; 351,5; 31,875 so ngưỡng 62−82t) đúng; B02 ‖v_W‖_W²=(12+112)/124=1 đúng; C04 δ²=124, giảm 62 đúng; C07 (d=3/16, δ²=9/16, sai số log4−3/4≈0,6363) đúng; E03 ψ(z)=196−28z+(7/2)z², z*=4 đúng; E05 Hd+g=(20,20), η=−20 đúng; E09 nghiệm (9,−4), Δν=−24, u¹=(10,4) đúng; E11 H=diag(2,5) đúng. Không tìm thấy sai số.

**4. LLO6–10 — đạt:** LLO6,8 phủ A–C; LLO7 riêng mạch D (D01–D05); LLO9,10 riêng mạch E; Z01–Z03 tổng hợp LLO6–10. Không thấy LLO bị gán sai cụm; P04 đúng vai trò "không chứng nhận hoàn thành LLO".

**5. Phân bổ thời lượng — đạt:** LT: 0,15+0,30+0,25+0,40+0,25+0,55+0,10 = 2,00 tiết. BT: 0,10+0,15+0,10+0,15+0,10+0,30+0,10 = 1,00 tiết (E12 0,13BT tính một lần, không cộng trùng). Đúng 2LT+1BT.

###### Kết luận

Không phát hiện lỗi nội dung toán hay lỗi gán LLO/thời lượng; toàn bộ 46 trang tuân thủ trình tự 6 bước theo các quy ước gộp đã tuyên bố trong storyboard (A01, B02, D02, E04, E10). Có **một lỗi nhỏ cần sửa**: ghi chú P02 nhắc đến hình trong khi bố cục P02 không có hình — cần bỏ câu nhắc hoặc bổ sung hình vào outline. Bốn mục còn lại là góp ý tùy chọn (A01 ví dụ trước trực quan, B05/C06 không đủ chu trình, cách gọi KKT ở P03, ánh xạ sản phẩm ở Z03), đều đã có căn cứ thiết kế và không bắt buộc thay đổi.


#### Báo cáo độc lập: Mạch kể chuyện

##### Báo cáo rà mạch kể chuyện — 46 trang, 7 mạch (P/A/B/C/D/E/Z)

Phạm vi: chỉ đọc `review-pack.md` (647 dòng, 1 lần) và `storyboard.md` (90 dòng, 1 lần). Không đọc outline/deck, không rà toán.

###### 1. Kiểm kê cấu trúc

- **Đủ 46 trang**: P00–P04 (5) + A01–A07 (7) + B01–B06 (6) + C01–C08 (8) + D01–D05 (5) + E01–E12 (12) + Z01–Z03 (3) = 46. ✓
- **Đủ 7 mạch**, khớp bảng bản đồ hành trình trong storyboard (dòng 13–19). ✓
- **Chuỗi nối trong–ra**: đã đối chiếu từng cặp "đầu ra của trang trước = đầu vào nhận của trang sau" trên toàn bộ 45 mối nối trong review-pack: **khớp liên tục từ P00 đến Z03**, không đứt mạch, không nhảy cóc. Mỗi trang đều có đủ 4 thành phần: vai trò, bố cục, lý do năm 3, nối vào–ra. ✓

###### 2. Bảng phát hiện

| Mức độ | Trang | Vấn đề | Bằng chứng | Đề xuất cụ thể |
|---|---|---|---|---|
| Trung bình (bắt buộc sửa) | P00 | Đầu ra của P00 **không khớp giữa hai tài liệu**: review-pack ghi đầu ra "Bài 04 xây dựng quy trình tính từ điều kiện tối ưu", storyboard (dòng 35) ghi đầu ra "Năm cụm kiến thức cùng phục vụ việc chọn và kiểm tra một bước lặp" — thực chất là đầu ra của P01 | review-pack dòng 17 vs storyboard dòng 35 | Chọn một phiên bản đầu ra cho P00 và đồng bộ cả hai tệp; nếu giữ "Bài 04 xây dựng quy trình tính…" thì sửa ô đầu ra của P00 trong storyboard |
| Nhẹ (nên sửa) | A01 | Số liệu kiện trong mô tả bố cục lệch: review-pack ghi "bảng **bốn** dữ kiện", nhưng mặt trang liệt kê 5 hàng (Hàm, Điểm đầu, Gradient, Hessian, Giá trị đầu); storyboard ghi đúng "bảng **năm** dữ kiện" | review-pack dòng 83 vs dòng 77; storyboard dòng 40 | Sửa review-pack A01 thành "bảng năm dữ kiện 40% bên phải" |
| Ghi nhận (không phải lỗi) | P04, E12 | Vùng trống trên trang đã được khai báo rõ là khoảng trắng cố ý, không phải ô nhập tương tác | review-pack dòng 3; storyboard dòng 39, 77 | Giữ nguyên; chỉ cần kiểm khi triển khai (storyboard dòng 90 đã xếp vào mục kiểm triển khai) |
| Ghi nhận (điểm mạnh) | B05, E11, Z02 | Tính liên mạch tốt: B05 dùng μ=3, L=7 đúng từ VD1; E11 tái tạo đúng H=diag(2,5) của VD3; Z02 quay lại đúng hai nhiệm vụ mở đầu P02 — vòng kể chuyện khép kín | review-pack dòng 231, 581, 611, 623 | Giữ nguyên |
| Ghi nhận (điểm mạnh) | Z01 | Bảng tổng hợp đủ 5 hàng như storyboard yêu cầu ("gộp gradient và chuẩn W… để còn năm hàng") | review-pack dòng 609, 615 | Giữ nguyên |

###### 3. Phân biệt bắt buộc / tùy chọn

- **Bắt buộc**: đồng bộ đầu ra P00 giữa review-pack và storyboard (hai tài liệu căn cứ mâu thuẫn trực tiếp về một mắt xích nối).
- **Tùy chọn**: sửa chữ "bốn dữ kiện" ở A01 (chỉ lỗi mô tả bố cục, không ảnh hưởng mạch kể chuyện vì trang thật có 5 hàng và storyboard đã đúng).

###### 4. Kết luận

**ĐẠT** về mạch kể chuyện: đủ 46 trang, đủ 7 mạch, chuỗi nối vào–ra liên tục và nhất quán trên 45/46 mắt xích, mỗi trang có vai trò – kết nối – điểm nhấn rõ ràng. Chỉ còn **1 lỗi trung bình (P00)** cần đồng bộ trước khi chốt; lỗi A01 là tùy chọn. Không phát hiện lỗi bịa thêm; các mục không rà (toán, triển khai hình ảnh) đã được hai tài liệu tự phân định và nằm ngoài phạm vi này.

### Lịch sử trước triển khai


### Đợt lập dàn bài 2026-09-24 — kết quả mới, không phải kiểm định HTML

Người dùng xác nhận trực tiếp tiếp tục nhiệm vụ và cho phép worker OpenRouter đọc/gửi đề cương cùng tài liệu lập kế hoạch liên quan; bí mật và tệp.env được loại trừ. Đã khôi phục công việc sau điểm chặn duyệt tự động của các lượt trước. Phạm vi hiện tại chỉ là dàn bài theo skill build-slide-deck-outline, áp dụng thêm yêu cầu bố cục từng trang có lý do cho năm3 và số ví dụ không gây lẫn vai trò.

Sản phẩm:46trang,7mạch P/A/B/C/D/E/Z, đúng2tiết lý thuyết+1tiết bài tập. Bản trước40trang đã được thay trong outline/storyboard; toàn bộ phần lịch sử bên dưới giữ nguyên để truy nguyên. HTML và tài liệu học tập đang công bố vẫn là bản cũ; không tuyên bố đồng bộ nội dung/kiểm hiển thị mới. Chưa có hoạt động xuất bản, commit hoặc push cho yêu cầu lập dàn bài này.

### Bằng chứng phân vai runtime

Mỗi hàng dưới dùng metadata JSON của cầu nối, không dựa lời tự khai của worker. Reader/reviewer chỉ đọc; writer chỉ sửa bản nháp trong thư mục tạm hẹp, điều phối hợp nhất sau kiểm.

| Vai | requested_model | observed_model | provider | Kết quả xử lý |
|---|---|---|---|---|
| Lập kế hoạch | z-ai/glm-5.3-flash | z-ai/glm-5.3-flash | OpenRouter | Chấp nhận phạm vi/LLO; bác giữ cứng40trang và mở rộng HTML/push |
| Phân tích nguồn | z-ai/glm-5.3-flash | z-ai/glm-5.3-flash | OpenRouter | Dùng ánh xạ M16→M17; kiểm lại số trang và giả thiết bằng nguồn |
| Toán ban đầu | z-ai/glm-5.3-flash | z-ai/glm-5.3-flash | OpenRouter | Bác hai kết luận sai về hướng/rd; tự thế hệ để xác minh |
| Writer bố cục | z-ai/glm-5.3-flash | z-ai/glm-5.3-flash | OpenRouter | Nhận bố cục C05/E10; sửa lý do dựa trên tiên quyết ngay trong bài |
| Cổng storyboard | z-ai/glm-5.3-flash | z-ai/glm-5.3-flash | OpenRouter | Đọc46/46; không lỗi chặn; làm rõ nhãn và quyết định biên tập |
| Sinh viên | z-ai/glm-5.3-flash | z-ai/glm-5.3-flash | OpenRouter | Đọc46mục; xử lý4nguy cơ hiểu sai ởA06/B02/E10/E12 |
| Chuyên gia tối ưu | z-ai/glm-5.3-flash | z-ai/glm-5.3-flash | OpenRouter | Số khớp; bác hệ số hội tụ sai do worker đề xuất, làm rõ phạm vi Cholesky/hạngA |
| Toán học | z-ai/glm-5.3-flash | z-ai/glm-5.3-flash | OpenRouter | Tính lạiVD1–3, ma trận/kích thước và giả thiết; không lỗi nội dung |
| Học thuật–giảng dạy | z-ai/glm-5.3-flash | z-ai/glm-5.3-flash | OpenRouter | Rà trích LLO,7câu kiểmtra,nguồn,ứngdụng; làm rõ3điểm, bác yêu cầu giới hạn biên không cần |
| Mạch kể chuyện | z-ai/glm-5.3-flash | z-ai/glm-5.3-flash | OpenRouter | Đọc46mục và storyboard; không đứt mạch; rà lạiC05/E10 và lân cận |

### Lỗi thực thi và khôi phục

Writer phân tích lần đầu lỗi nguyên văn `RuntimeError: OpenRouter request exceeded 300s wall timeout`; dừng hợp nhất phần đó rồi chạy lại cùng mô hình/nhà cung cấp. Nháp trả về sau đó nhầm tự điều chỉnh với quay lui, bỏ đẳng thức và tự đổi ví dụ; điều phối bác, không đưa vào hồ sơ cuối. Writer được giao lại phần hẹp C05/E10 và hoàn tất đúng bốn trường bố cục/lý do; lý do được điều phối chỉnh theo kiến thức thực có trong bài.

Reviewer sinh viên và học thuật–giảng dạy lần đầu lỗi nguyên văn `model returned an empty or incomplete answer after all retries` do hết ngân sách hoàn tất trong suy luận. Hai vai đã chạy lại với trích đoạn tập trung và ngân sách đầu ra phù hợp, giữ nguyên model/provider; đã nhận báo cáo đầy đủ. Không dùng một báo cáo rỗng làm bằng chứng rà. Cổng storyboard có một phản hồi bị cắt, cơ chế thử lại của cầu nối đã hoàn tất báo cáo46hàng trong cùng phiên.

### Hợp nhất vấn đề và bằng chứng xử lý

| Mã | Vai và vấn đề | Quyết định điều phối | Bằng chứng hiện hành |
|---|---|---|---|
| R01 | Planner nhận định bản40trang đủ kiểmtra | Bác; thiếu kiểmtra mởđầu và bố cục từngtrang | P04 thêm;7trang kiểmtra và46trường bố cục/lýdo |
| R02 | Toán ban đầu dùng hướngNewton để kết luận bảnggradient sai | Bác; tính riêng hai hướng | A06 d=-g nhận1/4; C02Newton nhận1; math-spec hai phép kiểm |
| R03 | Toán ban đầu đổi rd2=44 thành40 khi giải | Bác bằng phép thế chính xác | K(9,-4,-24)=(-6,-44,5); E08–E12 giữ phân biệt g/rd |
| R04 | Số VD2 cũ làm bướcNewton trùng giảm môhình | Đổi s0 thành1/4 | d=3/16,δ²=9/16,δ²/2=9/32, sai số thật≈.636294 |
| R05 | Storyboard: nhãnP01/Z01, biêntậpZ02/E12 dễ hiểu nhầm | Làm rõ phụ thuộcP01, năm hàngZ01 và ý nghĩa cột biêntập | OutlineP01/Z01; chú giải trước bảng storyboard |
| R06 | Storyboard: A06 phân bổ hoạt động và nhãnB02 | Làm rõ giảng mẫu/kiểm hàng đãcho; B02 trựcquan+vídụ | OutlineA06/B02; tổngLT/BT giữ2/1 |
| R07 | Chuyên gia đề xuất hệ số1-2μ/L | Bác; hệ số2 triệt tiêu khi thế chặngradient | Math-spec mục kiểmB05: e+≤e-||g||²/(2L)≤(1-μ/L)e |
| R08 | Chuyên gia: phạmviCholesky, bước suyη=0 | Chấp nhận làm rõ, không sửa kết quả | C05 ghi choH; E06 ghi Aᵀη=0 và hạngđầyđủ |
| R09 | Sinh viên: cột62-82t thiếu nhãn trực tiếp | Chấp nhận | A06 đặt nhãn ngưỡngArmijo và côngthức ngay trong cột |
| R10 | Sinh viên: dấuAd=-rp ở kiểmtra | Giữ nhiệm vụ kiểm dấu; không cho trước đápán | E12 đápán ghi rõ Ad=-rp=5; E09 có phép thế |
| R11 | Sinh viên: α dùng trong hai điều kiện; trùng hướngW/Newton | Giữ quyước; thêm lýdo và phạmvi | E10 kiểmr với cảu,ν; C03 ghi chỉ trùng vìW=H trongVD1 |
| R12 | Học thuật: P04 chưa đo hoàn thànhLLO9; mãnộibộ/HT | Làm rõ kiểm tiênquyết; bỏ mãkhỏi đápánZ02; thêm chúgiảiHT | P04, mởđầuoutline, ghi chúZ02; chỉ dẫn loại mã/thời lượng khi tạo notes |
| R13 | Học thuật: D05 phải thêm giới hạn biên mới suy ra nghiệm | Bác yêu cầu bắt buộc; điểm dừng trong miền+lồi đủ | D05 nêuφ′(1)=0 vàφ″>0; không cần điều kiện biên cho chứngminh này |
| R14 | Kiểm cuối phát hiện thay nhãn B02 đã lan sang chữ “ví dụ” ở các mục khác | Sửa cách ghép theo bản ghi từngtrang, không thay toànvăn | Kiểm46bản ghi content/notes/layout/reason khớp chính xác vớioutline |

Năm báo cáo độc lập đều hoàn tất. Các nhận xét là nguy cơ đọc hiểu được phân biệt với lỗi toán; không nhận mọi khuyến nghị chỉ vì do worker đưa ra. Không còn lỗi toán, nguồn hay mạch bài ở mức chặn/nghiêm trọng được xác nhận trong phạm vi dàn bài.

### Kiểm chứng điều phối

- Trích đề cương DOCX chính thức: LLO6–10/CLO1,2;2LT+1BT; không tự đổi ra phút. Đối chiếu nguồn M16 trước M17; đọc BV chương9–10; xem trực tiếp hìnhMIT10–9,MIT11–7,Stanford10–14. Trạng thái truy cập/giới hạn nguồn ghi trong source-map.md.
- 33 kiểm tra bằng Fraction và phép nhân hệ tuyến tính đã đạt; kết quả từng phép ởmath-audit.md. Giả thiết hội tụ và các loại sai số được kiểm lại bằng nguồn và suy luận trực tiếp.
- 46 mã duy nhất, đúng thứ tự giữa bản ghi vàoutline;46bố cục/lýdo khớpstoryboard;7câu kiểmtra có dữkiện/đápán/tiêu chí; tổng200/100 phầntrămtiết tương ứng2LT+1BT.
- Mọi Markdown bắt đầu bằngheading; không có phân cách toán thay thế; git diff --check đạt. Chỉ8tệp quy trình bài04 thay đổi; không sửaHTML/chỉmục/tài liệu học tập.
- Chưa dựngSVG, kiểm16:9/màn hìnhhẹp/KaTeX/bànphím hoặc đồng bộMarkdowncôngkhai. Đây là giới hạn đúng phạmvi, không phải bằngchứng bộ trìnhchiếu đã vượt kiểmđịnh.

### Kiểm chứng bổ sung cuối

Reviewer rà lại đã hoàn tất bằng z-ai/glm-5.3-flash/OpenRouter. Chấp nhận các điểm làm rõ; bác hai nhầm lẫn trong báo cáo: gᵀd phải là-820, không phải820; với A=[1 1], hàng ràng buộc là d1+d2=5, không phải5d2=5. Báo cáo đã nhầm hàng khối với phương trình dừng theo tọa độ u2. Điều phối làm rõ câu chữ E12 thành “phương trình dừng theo tọa độ u2”, giữ công thức đúng 5d2+Δν=-44; tự kiểm lại bằng phép thế hệ đã xác minh. Không còn vấn đề được xác nhận chưa xử lý.

Codex Slides đã lưu 46 mục bằng revise_outline với danh sách tường minh. get_project sau khi mở lại cho config.pages=46 và outline trùng toàn bộ tiêu đề/ý chính với danh sách đã chốt; giữ nguyên 6 vai trò tài liệu nguồn. Dự án vẫn ở bước outline; không yêu cầu kết xuất trang. Đã mở đúng đường dẫn http://127.0.0.1:4311/project/20260828120744-lecture-04-t-i-u-tr-n-v-r-ng-bu-c-ng-th--d4es?checkpoint=outline. Phiên này không có công cụ Browser trong trình soạn thảo, nên chưa xác minh hiển thị trực tiếp; không gọi kiểm trạng thái JSON là kiểm trực quan. Tám tệp quy trình hiện hành đã đưa vào Design Files để giữ đầy đủ đặc tả ngoài danh sách trang.

### Lịch sử trước 2026-09-24 — bản HTML40trang

Các dòng trạng thái dưới đây chỉ áp dụng bản cũ; không chứng nhận đã triển khai dàn bài46trang mới.

## Nhật ký rà soát Bài giảng 04 — Tối ưu không ràng buộc và ràng buộc đẳng thức

### 1. Trạng thái bản nháp

- Bản nháp triển khai có 40 trang, đúng 7 section ngoài P/A/B/C/D/E/Z; số trang và thứ tự không đổi sau vòng sửa storyboard ngày 2026-08-28.
- Đã khóa toán trong `math-spec.md`, đồng bộ `outline.md`, `storyboard.md`, RevealJS và bảy SVG cục bộ dùng cho bộ trang chiếu cùng ghi chú.
- Báo cáo kiểm định storyboard vòng 1 và đủ năm báo cáo độc lập đã được hợp nhất vào HTML, SVG, `math-spec.md`, outline và storyboard. Vòng kiểm định lại độc lập, Chromium rộng/hẹp và Codex Slides do điều phối viên thực hiện; chưa sẵn sàng cập nhật chỉ mục, commit hoặc push.

### 2. Nguồn và quyết định sử dụng

| Nguồn/tài sản | Vai trò | Quyết định |
|---|---|---|
| Đề cương UET.AI2012 | Buổi 4, LLO6–10/CLO1–2, 2 LT + 1 BT | nguồn thẩm quyền phạm vi |
| `sources/part1.docx` | Tuần 4 và yêu cầu nghiêm ngặt | khung học thuật, không dùng làm nguồn công thức |
| `sources/bv_cvxbook.pdf`, Chương 9–10 | định nghĩa, thuật toán, hội tụ, Newton–KKT | nguồn toán học chính |
| MIT 6.079/6.975 Lecture 16 | thứ tự tối ưu không ràng buộc | dùng một bản chuẩn; không tính ba bản trùng độc lập |
| MIT 6.079/6.975 Lecture 17 | thứ tự tối ưu đẳng thức | dùng bản chuẩn hiện có |
| `sources/Chương 5.pdf` | thuật ngữ tiếng Việt | đối chiếu; mọi công thức kiểm lại bằng Boyd/MIT |
| Hai PDF Chương 6 viết tay | thuật ngữ và ghi chú bổ sung | không dùng làm thẩm quyền hoặc tài sản hình |
| `img/lec-04/*.svg` | đường mức, Armijo, mô hình Newton, hai pha, không gian rỗng | tự vẽ; không dùng raster nguồn |

Danh mục và quyền Lecture 16–17 đã được ghi tại `sources/MIT/README.md` và `source-provenance.md`. Giấy phép MIT OCW là CC BY-NC-SA 4.0; không dùng trực tiếp tài sản bên thứ ba.

### 3. Quy ước toán đã khóa

- Hướng âm gradient là hướng giảm dốc nhất theo chuẩn Euclid; chuẩn tổng quát phải đi cùng chuẩn đối ngẫu.
- Quay lui dùng $\alpha\in(0,1/2)$, $\beta\in(0,1)$ và điều kiện Armijo không nghiêm.
- Newton giải $H\Delta=-g$; không lập $H^{-1}$.
- Độ giảm Newton dùng ký hiệu $\delta_N$, không dùng $\lambda$.
- Hội tụ tuyến tính hoặc bậc hai chỉ phát biểu cùng giả thiết lồi mạnh, chặn Hessian hoặc Hessian liên tục Lipschitz và quy tắc tìm bước thích hợp.
- Hệ Newton–KKT khóa $A\in\mathbb R^{p\times n}$, $\operatorname{rank}A=p<n$, và $H$ xác định dương trên $\operatorname{null}A$.
- Chế độ khả thi dùng biến phụ $\eta$; chế độ nguyên thủy–đối ngẫu dùng $\Delta\nu$; không trộn hai đại lượng.

### 4. Sai khác có chủ ý so với mẫu

- Dùng hai ví dụ xuyên suốt để giảm chuyển ngữ cảnh.
- Đặt trực quan hoặc ví dụ trước định nghĩa tại B03 và D03. Riêng Newton, C02 định nghĩa mô hình và hướng trước khi C03 kiểm chứng tính một bước trên hàm bậc hai.
- Đặt C07 trước mạch D thay vì để phần triển khai ở cuối Lecture 16 như MIT. Mục đích là đóng LLO8 về thực hiện Newton trước khi chuyển sang LLO7; phần đếm phép toán được lược và thời lượng chuyển sang Newton–KKT.
- Lược các đồ thị thực nghiệm và ứng dụng dài của MIT; dùng bảy SVG cục bộ tự vẽ từ công thức cho bộ trang chiếu và ghi chú.
- Lược trust-region, quasi-Newton, điểm trong và bài toán bất đẳng thức tổng quát vì ngoài phạm vi Buổi 4.

### 5. Codex Slides

- Dự án Codex Slides và trạng thái nguồn do điều phối viên quản lý; tác tử triển khai này không có bề mặt Browser tích hợp để xác minh trực quan.
- RevealJS dùng `source-map.md` và `math-spec.md` làm thẩm quyền. Chỉ tuyên bố đồng bộ Codex Slides sau khi điều phối viên render và kiểm tra dự án bền vững.

### 6. Kiểm tra kỹ thuật bản nháp

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| 40 ID duy nhất, đúng thứ tự | đạt | C02 đứng trước C03; `outline.md` và bảng 40 trang trong storyboard khớp đúng thứ tự DOM |
| 40 ghi chú, mỗi ghi chú hai đoạn | đạt | kiểm tra lại sau sửa: 40 notes, tập số đoạn là `{2}` |
| 7 section ngoài | đạt | P/A/B/C/D/E/Z |
| HTML và đường dẫn cục bộ | đạt | bộ phân tích HTML chuẩn kiểm tra cân bằng section; 17 tham chiếu cục bộ đều tồn tại |
| KaTeX | đạt | 239 công thức được `renderToString` phân tích, 0 lỗi |
| SVG/XML và văn bản thay thế | đạt | 7 SVG phân tích XML thành công, đều có `title` và `desc`; mọi lần nhúng trong deck đều có `alt` |
| `git diff --check` | đạt | kiểm tra `--no-index --check` cho HTML/outline/storyboard/review-log, không có lỗi khoảng trắng |
| Chromium 1600×900 và màn hình hẹp | đạt | xem thêm kiểm định bàn giao ở Mục 11 |

### 7. Kiểm định storyboard

| Mức độ | Trang/cụm | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| trung bình | P03 | Bản đồ cũ tách hướng và bước nhưng không có chặng riêng cho mạch D | Năm ô trên mặt trang không ánh xạ một-một A–E | Sửa thành phương pháp giảm; gradient/chuẩn; Newton/độ cong; bảo đảm/tự điều chỉnh; khả thi/đẳng thức | đã sửa; chờ rà lại |
| trung bình | D03 | Dấu bằng công thức đúng nhưng trực quan “độ cong tự khống chế” chưa được lượng hóa | Chưa hiển thị tỷ số không thứ nguyên dẫn tới hằng số 2 | Thêm $|\phi'''|/(\phi'')^{3/2}=2$ và vai trò tử số–mẫu số | đã sửa; chờ rà lại |
| nghiêm trọng | E06 | Thuật toán không khả thi chưa đủ để sinh viên thực hiện độc lập | Chỉ ghi “backtracking theo $\|r\|_2$”, thiếu nhu cầu, đầu vào, điều kiện nhận bước và cập nhật | Mở bằng khó tìm điểm khả thi; thêm đầu vào, hai phần dư, hệ, điều kiện co residual, cập nhật và hai ngưỡng dừng | đã sửa; chờ rà lại |
| trung bình | D04 | Phép tính đóng chỉ được liệt kê, chưa tạo sản phẩm ứng dụng LLO7 | Không có hàm nhiều chiều được nhận dạng hoặc dựng | Dựng $-\sum_i\log(b_i-a_i^Tx)$ bằng hợp affine và lấy tổng; khóa hệ số chuẩn $c\ge1$ | đã sửa; chờ rà lại |
| trung bình | Z02 | Bài tổng hợp gắn LLO6–10 nhưng chưa có câu đo riêng LLO7 | Các câu chỉ đo gradient, Newton, hội tụ và đẳng thức | Thêm câu kiểm tra trực tiếp điều kiện đạo hàm bậc ba của $\phi(s)=s-\log s$ và giả thiết dùng decrement; kèm đáp án trong notes | đã sửa |
| trung bình | Hành trình A–B | Một hàng gộp che khuất đầu ra riêng của phương pháp giảm và lựa chọn chuẩn | Storyboard không cho thấy A07 là sản phẩm để B dùng | Tách thành hai hàng A và B, giữ dữ kiện A04 truyền sang B | đã sửa; chờ rà lại |
| trung bình | Hành trình E | Một hàng gộp che hai chế độ khả thi và không khả thi | $\eta$ và $\Delta\nu$ có vai trò khác nhưng chưa có hai tuyến kiểm tra riêng | Tách hai hàng; ghi E01–E02 là phần dùng chung và khóa sản phẩm từng nhánh | đã sửa; chờ rà lại |
| nhẹ | C07→D | Sai khác thứ tự với MIT chưa được truy nguyên | C07 nằm trước D dù phần triển khai ở cuối Lecture 16 | Ghi khác biệt có chủ ý trong HTML notes, outline, storyboard và nhật ký; lý do là đóng LLO8 | đã sửa; chờ rà lại |
| trung bình | C/D/E | Thời lượng E chưa phản ánh tải của hai thuật toán Newton–KKT | E có ít LT hơn C dù gồm khử và hai chế độ | Chuyển 0,05 LT từ C và 0,05 LT từ D sang E; tổng giữ 2 LT + 1 BT | đã sửa; chờ rà lại |

Phạm vi rà lại bắt buộc: P03; C07–D05; E04–E07; Z02; hai trang lân cận mỗi phía và toàn bộ ranh giới C→D, D→E, E→Z. Vòng sửa không thêm, bỏ hoặc đổi thứ tự trang.

### 8. Năm báo cáo rà soát độc lập và quyết định chỉnh sửa

#### 8.1. Góc nhìn sinh viên

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| nghiêm trọng | C01 và `newton-model.svg` | Hai đường cũ không tiếp xúc nên hình không thể hiện đúng Taylor cùng giá trị, dốc và độ cong tại $x$ | Vẽ lại từ $m(v)=2-2v+v^2$ và $f(x+v)=m(v)+0{,}08v^4$; khóa $H>0$, $v=0$, cực tiểu $v=\Delta x_N=1$ | đã sửa |
| trung bình | A04/B03 | A04 lộ toàn quỹ đạo trước khi mạch B tạo nhu cầu về điều kiện hóa | A04 dùng `quadratic-start.svg` chỉ có đường mức, điểm đầu và gradient; B03 mới dùng quỹ đạo đầy đủ lấy mẫu đúng | đã sửa |
| trung bình | C08/D05 | Đáp án hiện sẵn làm mất vai trò kiểm tra | Chuyển toàn bộ kết quả vào ghi chú diễn giả; mặt trang chỉ giữ yêu cầu và dữ kiện | đã sửa |
| trung bình | E06/Z02 | Tải chữ quá cao, khó đọc và khó thao tác | E06 giữ phần dư, hệ, khuôn chọn bước/cập nhật/dừng; bất đẳng thức quay lui chuyển notes. Z02 còn bốn nhiệm vụ đại diện | đã sửa |

#### 8.2. Góc nhìn chuyên gia

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| nghiêm trọng | D04–D05/Z01 | Định nghĩa tự điều chỉnh chưa trả lời bảo đảm Newton nào nhận được | Thêm phát biểu có điều kiện theo decrement: pha giảm bước, bước đầy đủ gần nghiệm và cận $\omega_*$; thu hồi ở Z01, không biến thành thuật toán mới | đã sửa |
| trung bình | B04–B05 | Chuẩn đối ngẫu và kết luận hội tụ tuyến tính chưa được phát biểu đủ | Thêm $\|g\|_*=\max_{\|v\|\le1}g^Tv$; khóa $\mu I\preceq H\preceq MI$, bước phù hợp và $\kappa=M/\mu$ | đã sửa |
| trung bình | E02/Z02 | Liên kết AI còn chung chung | Thêm hồi quy trơn $\frac12\|Xw-y\|^2$ với $\mathbf1^Tw=1$, phân loại lồi trơn/đẳng thức affine, chọn Newton–KKT và dừng phù hợp | đã sửa |
| nhẹ | A05 | Thuật ngữ tiếng Anh xuất hiện trước cách gọi Việt | Dùng “tìm kiếm đường chính xác (exact line search)” ở lần đầu | đã sửa |

#### 8.3. Độ chính xác toán học

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| nghiêm trọng | A06 và `armijo-backtracking.svg` | Đường cong cũ không khớp các giá trị $405$, $92{,}5$, $39{,}375$ | Vẽ lại đúng $q(t)=55-200t+550t^2$, đường $55-20t$, đáy $2/11$ và ba quyết định bước | đã sửa |
| nghiêm trọng | E04/Z01 | Decrement có ràng buộc chưa có đẳng thức và tiêu chuẩn dừng | Khóa $\delta_{\rm eq}^2=\Delta x^TH\Delta x=-g^T\Delta x$; dừng $\delta_{\rm eq}^2/2\le\varepsilon$ | đã sửa |
| trung bình | D04 | Thiếu kiểu $a_i,b_i,m$ và giả thiết miền trong | Thêm $a_i\in\mathbb R^n$, $b_i\in\mathbb R$, $m\in\mathbb N$ và miền trong khác rỗng | đã sửa |
| trung bình | E03–E06 | Thiếu kích thước $F,z,\eta,\nu,\Delta\nu$ và điều kiện điểm thử thuộc miền | Khóa đầy đủ kiểu đại lượng trên mặt hoặc notes; thêm $x+t\Delta x\in\operatorname{dom}f$ | đã sửa |
| trung bình | `quadratic-zigzag.svg`, `newton-phases.svg` | Tọa độ quỹ đạo và hình pha hội tụ chưa chứng minh đúng đại lượng | Lấy mẫu đúng $(10\rho^k,(-\rho)^k)$; chỉnh điểm pha bậc hai trên trục log sai số để độ dốc tăng | đã sửa |

#### 8.4. Phản biện học thuật và giảng dạy

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| trung bình | C06 | Chỉ gọi “hội tụ bậc hai” mà chưa nêu đại lượng/truy hồi | Thêm $\|x^{(k+1)}-x^*\|\le C\|x^{(k)}-x^*\|^2$ cùng giả thiết | đã sửa |
| trung bình | C07/E07 | Tên bộ giải chưa thành quy tắc lựa chọn | C07 giữ Cholesky khi Hessian xác định dương; E07 dùng LDLT có pivot cho hệ bất định, bổ Schur khi cấu trúc/điều kiện hóa phù hợp | đã sửa |
| trung bình | Z02 | Bảy nhiệm vụ trên mặt trang tạo tải đánh giá quá mức | Giữ bốn nhiệm vụ đại diện, chuyển phép tính phụ và phân biệt ký hiệu sang notes/tự học | đã sửa |
| nhẹ | C07→D | Đề xuất chuyển C07 về cuối phần tự điều chỉnh theo thứ tự mẫu MIT | Không áp dụng: giữ C07 trước D để đóng LLO8 về triển khai Newton trước khi chuyển sang LLO7; sai khác đã ghi trong outline/storyboard | giữ có lý do |

#### 8.5. Mạch kể chuyện và điểm kết nối

| Mức độ | Trang/cụm | Vấn đề và bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|
| nghiêm trọng | D05→E01 | Cầu nối cũ chỉ đổi chủ đề, chưa nói kết quả nào không còn đủ | Ghi rõ tự điều chỉnh kiểm soát độ cong nhưng không giữ $Ax=b$; E kết hợp mô hình Newton C với KKT | đã sửa |
| trung bình | E07→Z01 | Ghi chú chưa chỉ đầu ra nào được bảng quyết định thu hồi | Nối trực tiếp nghiệm hệ/phần dư sang hàng Newton–KKT trong Z01 | đã sửa |
| trung bình | Z03 | Chuyển tiếp Bài 05 chưa nêu thay đổi khái niệm | Làm nổi cảnh quan phi lồi, gradient nhiễu và minibatch; giữ khuôn hướng–bước–dừng | đã sửa |
| nhẹ | 7 mạch/40 trang | Có đề xuất thêm một trang riêng cho bảo đảm tự điều chỉnh | Không áp dụng: gộp vào D04 và thu hồi Z01 vì vẫn một luận điểm trung tâm, tránh tạo mạch/trang để bù số lượng | giữ 40 trang, 7 mạch |

### 9. Quyết định tài sản

- `quadratic-start.svg` chỉ hiển thị đường mức, điểm đầu và gradient ở A04; `quadratic-zigzag.svg` chỉ xuất hiện ở B03 sau khi nhu cầu về điều kiện hóa đã được thiết lập.
- `armijo-backtracking.svg`, `newton-model.svg`, `newton-phases.svg` được vẽ lại từ công thức; `equality-nullspace.svg` được giữ vì quan hệ $A\Delta x=0$ đúng và không dùng dữ liệu định lượng.
- Không áp dụng đề xuất sao chụp hình từ MIT: toàn bộ hình vẫn là SVG tự vẽ, có `title`/`desc` hoặc `alt`, và nguồn được truy nguyên trong notes.

### 10. Việc còn lại trước bàn giao

#### Hậu kiểm toán vòng cuối

| Mức độ | Trang/tài sản | Vấn đề | Quyết định | Trạng thái |
|---|---|---|---|---|
| trung bình | E02 và hồ sơ toán | Ca hồi quy chưa bảo đảm Hessian dương trên không gian rỗng của ràng buộc | Thêm $\operatorname{null}X\cap\operatorname{null}(\mathbf1^T)=\{0\}$ và nêu hệ quả $X^TX\succ0$ trên $\operatorname{null}(\mathbf1^T)$ | đã đóng |
| trung bình | E06 | Chuẩn $\|r\|_2$ được dùng trước khi vector ghép $r$ được định nghĩa | Thêm $r=(r_d^T,r_p^T)^T\in\mathbb R^{n+p}$ trong ghi chú trước bất đẳng thức quay lui | đã đóng |
| nhẹ | `quadratic-zigzag.svg` | Nét cuối nối điểm hữu hạn vào đúng nghiệm gây hiểu nhầm đạt nghiệm sau hữu hạn vòng | Bỏ đoạn nối tới gốc; dùng mũi tên đứt và nhãn $k\to\infty$ | đã đóng |
| nhẹ | `newton-phases.svg` | Điểm cuối sát đáy làm đoạn cuối có thể bị đọc như tốc độ phẳng dần | Dừng chuỗi trước đáy và ghi ký hiệu phần cắt | đã đóng |
| nhẹ | P03, A04, A06, A07, B03, B06, C03, C08, D03, E02, E05, E07, Z02, Z03 | Ghi chú nguồn còn lộ tên tệp nội bộ; P03 và C07 còn mô tả quy trình biên tập | Thay bằng nguồn học thuật hoặc mô tả phép kiểm; loại mã mạch và quyết định thứ tự khỏi notes | đã đóng |
| trung bình | Z01–Z02 | Bảo đảm giảm dốc nhất chưa gắn rõ giả thiết B04; chứng nhận dừng đẳng thức chưa viết đủ ngưỡng | Gắn bảo đảm với giả thiết lồi mạnh, trơn, bước phù hợp; giữ chuẩn dừng $\|g\|_*$; sửa thành $\delta_{\rm eq}^2/2\le\varepsilon$ | đã đóng |
| nhẹ | E06; `2627-1/index.html` | Nhu cầu chế độ không khả thi chưa hiện rõ; tiêu đề chỉ mục lệch tiêu đề deck | Thêm nhu cầu khó tìm điểm đầu khả thi; đồng bộ thành “Tối ưu không ràng buộc và ràng buộc đẳng thức” | đã đóng |
| trung bình | A02, A04, E02, E04–E05, Z02 | Giả thiết $S$ đóng chưa được gọi rõ là bổ sung; điểm ví dụ lệch đường mức; hai chế độ dừng và hai ký hiệu phụ còn dễ lẫn; câu tự kiểm tra chưa đủ dữ kiện | Làm rõ giả thiết; đặt lại điểm/hướng trên SVG; tách decrement khỏi hai chuẩn phần dư; đổi biến phụ khả thi thành $\eta$ nhưng giữ $\Delta\nu$ ở chế độ chưa khả thi; viết lại hai câu tự kiểm tra | đã đóng |

- **Cổng toán học cuối:** đạt; không còn lỗi chặn bàn giao, nghiêm trọng hoặc trung bình. Tác tử toán xác nhận lại quỹ đạo chỉ hội tụ khi $k\to\infty$, điều kiện khả nghịch của ca hồi quy, định nghĩa vector phần dư ghép và hình hai pha Newton.
- **Cổng storyboard, chuyên gia, học thuật và mạch kể chuyện:** đạt; đúng 40 trang và 7 mạch P/A/B/C/D/E/Z, không còn lỗi từ trung bình trở lên trong phạm vi hậu kiểm.
- **Chromium r4:** duyệt đủ 40/40 trang tại 1600×900 và 720×1280; 0 trang tràn, 0 phần tử vượt khung, 0 lỗi KaTeX. Contact sheet được xem trực tiếp; không phát hiện chồng lấn. Lỗi console duy nhất là favicon 404, không ảnh hưởng bộ trang chiếu.
- **Codex Slides:** dự án bền vững `20260828120744-lecture-04-t-i-u-tr-n-v-r-ng-bu-c-ng-th--d4es` chứa 6 nguồn đúng vai trò và dàn ý 40 trang đồng nhất thứ tự với RevealJS. Browser tích hợp không khả dụng trong phiên này, nên không tuyên bố đã rà trực quan bằng Codex Slides; cổng trực quan dùng Chromium cục bộ.
- Chỉ mục học kỳ đã đồng bộ tiêu đề và giữ nguyên liên kết; commit riêng và push do điều phối viên thực hiện sau kiểm tra HTTP cuối.

### 11. Kiểm định bàn giao cục bộ

- Tái kiểm độc lập bằng GLM 5.3 Flash qua OpenRouter đạt ở năm phạm vi bị ảnh hưởng: chuyên gia, sinh viên, độ chính xác toán học, học thuật–giảng dạy và mạch kể chuyện. Vòng toán xác nhận lại đạo hàm của $\phi$, cận theo decrement và hệ Newton–KKT; $\delta_{\rm eq}=0$ sau bước đầy đủ vì phần dư KKT chiếu bằng không và lần giải kế tiếp cho $\Delta x=0$, không phải vì gradient không ràng buộc bằng không.
- Chromium duyệt đủ 40/40 trang tại 1280×720, 800×600 và 720×900 qua máy chủ tạm `127.0.0.1:8876`; cổng 8765 đang thuộc tiến trình khác nên không bị thay đổi. Không có lỗi console, lỗi trang, yêu cầu tải thất bại hoặc tài nguyên cục bộ thiếu.
- Lần chạy đầu phát hiện E01 tràn thật ở 1280×720. Tiêu đề được rút thành “Newton với đẳng thức”; lần chạy lại không còn tràn. Cảnh báo hình học 7,7 px của A04 tại 720×900 có `scrollWidth` và `scrollHeight` bằng vùng hiển thị; ảnh chụp xác nhận toàn bộ hình, công thức và năm gạch đầu dòng đều hiện, nên đây là sai báo do hộp đo trực tiếp của RevealJS.
- Ảnh chụp P03, A04, E01, E02, E06 và Z02 đã được xem trực tiếp. Hình A04 đặt đúng điểm, vector và nhãn; E06, Z02 đọc được, không chồng lấn.
- Đã bỏ khóa phóng to khỏi thẻ viewport và thêm favicon dữ liệu rỗng. Bộ trang chiếu giữ 7 section ngoài, 40 ID duy nhất, 40 ghi chú, 40 đoạn nguồn và 17/17 tham chiếu cục bộ hợp lệ.
- Codex Slides không thể chạy ổn định trong môi trường hiện tại do runtime cục bộ không tương thích và bề mặt Browser không khả dụng. Không tuyên bố đã kiểm định trực quan vòng này bằng Codex Slides; cổng hiển thị cuối dùng Chromium cục bộ theo phương án dự phòng trong `AGENTS.md`.

### 12. Ghi chú bài giảng và SVG ngày 2026-08-31

- Ghi chú công khai gồm 6 mạch A–F và 13 chủ đề. Các cầu nối bổ sung là chứng minh hướng giảm, sự kết thúc của quay lui Armijo, chuẩn đối ngẫu, bất biến affine của Newton, điều kiện không suy biến của hệ KKT và tuyến tính hóa phần dư.
- Mỗi chủ đề có đủ tám thành phần đọc hiểu. Phần định lý và chứng minh được tách khỏi tuyến giải thích chính; nội dung dừng trước gradient ngẫu nhiên, momentum, quasi-Newton và tối ưu phi lồi của các bài sau.
- Vòng biên tập `no-ai-slop` đã bỏ các câu chỉ dẫn nội bộ, phần giải lặp và thuật ngữ Anh không cần thiết. Thuật ngữ `độ giảm Newton`, `quay lui` và `không gian hạt nhân` được dùng nhất quán.
- Sáu SVG được đối chiếu với công thức và raster hóa ở 900 px cùng 600 px. Đã sửa tỷ lệ ellipse–quỹ đạo, nhãn Armijo, mức giảm mô hình, hai pha Newton và hai chế độ Newton–KKT. Cả sáu hình phân tích XML thành công, có `role`, `title`, `desc`, không dùng script, `foreignObject`, ảnh nhúng hoặc tài nguyên mạng.
- Hai vòng rà soát độc lập đã sửa định nghĩa hàm tự điều chỉnh nhiều biến thành hàm lồi $C^3$ trên miền mở, lồi; hậu kiểm toán học và mạch đọc đều đạt.
- Máy chủ HTTP cục bộ tại cổng tạm 8878 trả 200 cho viewer, Markdown và sáu SVG. Không có Browser tích hợp trong lượt này, nên cổng hình dùng raster cục bộ và kiểm tra HTTP.
- Liên kết ghi chú Bài 04 chỉ được mở trên trang chỉ mục sau khi các cổng nội dung, công thức, khối Markdown, tài sản và HTTP đều đạt.

### 13. Vòng chỉnh sửa theo phản hồi ngày 2026-09-01

| Mức độ | Trang/tệp | Lý do thay đổi | Thay đổi | Trạng thái |
|---|---|---|---|---|
| trung bình | A07 | Cụm “chứng nhận phù hợp” mơ hồ, không nói rõ đại lượng kiểm | Ở đây dùng chuẩn gradient; độ giảm Newton và phần dư chỉ xuất hiện sau khi được định nghĩa | đã đóng |
| trung bình | B03 | Thiếu cầu nối giải thích vì sao quỹ đạo zigzag dẫn tới khái niệm chuẩn | Mặt slide gọi rõ quỹ đạo theo chuẩn Euclid; notes nối sang khung chuẩn ở B02 | đã đóng |
| trung bình | B05 | Bảo đảm tuyến tính chưa nêu đủ giả thiết và dễ lẫn với số điều kiện phổ của bậc hai | Nêu $\mu$-lồi mạnh, gradient $M$-Lipschitz, bước $t=1/M$, hệ số co $1-\mu/M$ và phân biệt hai số điều kiện | đã đóng |
| trung bình | D04 | Phép hợp affine và tổng bảo toàn tính tự điều chỉnh chuẩn chưa được truy nguyên | Deck và ghi chú cùng dựng $\Phi(x)=-\sum_i\log(b_i-a_i^Tx)$ với miền, kiểu đại lượng và nguồn Boyd §9.6 | đã đóng |
| trung bình | E02 | Ký hiệu $\delta_{\rm eq}$, $r_d$, $r_p$ xuất hiện trên mặt slide trước khi được định nghĩa | Bỏ ký hiệu và tiêu chuẩn dừng khỏi mặt slide; E04 và E06 định nghĩa chúng đúng vị trí | đã đóng |
| nhẹ | E06 | Bất đẳng thức quay lui theo chuẩn phần dư cần được giữ đúng vị trí | Notes và Chủ đề 12 dùng thống nhất $r$, $\Delta x$, $\Delta\nu$, điều kiện giảm đủ và điểm thử thuộc miền | đã đóng |
| nhẹ | lecture note nhóm F | Thuật ngữ “hàm cưỡng bức” thiếu thuật ngữ Anh chuẩn | Sửa thành “hàm cưỡng bức (coercive)” | đã đóng |
| nhẹ | lecture note tài liệu tham khảo | Tài liệu MIT ghi thiếu giảng viên thứ hai | Ghi Stephen Boyd và Pablo Parrilo theo danh mục nguồn MIT của kho | đã đóng |

Vòng này không thêm, bỏ hoặc đổi thứ tự trang; giữ nguyên 40 slide, 7 mạch và thứ tự DOM. Chỉ sửa `lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html`, `materials/lec-04/lecture-note.md`, `planning/lec-04/outline.md`, `planning/lec-04/storyboard.md`, `planning/lec-04/source-map.md` (không thay đổi nội dung vì đã xác nhận giảng viên Boyd–Parrilo) và `planning/lec-04/review-log.md`.

#### Phản biện độc lập và xử lý

- Rà soát sư phạm và kiểm định toán học: đạt, không có lỗi chặn.
- Rà soát sinh viên phát hiện `decrement` xuất hiện sớm ở A07 và ký hiệu bước E06 lệch với ghi chú. A07 nay chỉ dùng chuẩn gradient và báo trước các tiêu chuẩn sau; E06 thống nhất $\Delta x,\Delta\nu$ với Chủ đề 12.
- Rà soát chuyên gia phát hiện cụm “trong ca khả vi hai lần”; đã sửa thành “trong trường hợp khả vi hai lần”. Mục nguồn `§§6.5, 10.1` được giữ vì §6.5 là nguồn cho mô hình hồi quy trơn, còn nghiệm KKT được ghi rõ là phép kiểm tra trực tiếp; siêu dữ liệu Boyd–Parrilo được giữ theo `sources/MIT/README.md` và `source-map.md`.
- Rà soát mạch kể chuyện đề nghị làm lộ cầu B03→B02; mặt B03 nay gọi rõ đây là quỹ đạo theo chuẩn Euclid. Không thêm hộp điều phối lên A07/E02 để tránh tải chữ và nhãn quy trình; cầu nối vẫn hiện ở nội dung B01, E01 và ghi chú diễn giả.

#### Cổng bàn giao

- Năm phạm vi rà soát độc lập đã hoàn tất: chuyên gia, sinh viên, toán học, sư phạm và mạch kể chuyện. Các phát hiện nhỏ đã được xử lý; hậu kiểm toán học và mạch kể chuyện đều `PASS`.
- Kiểm tra tĩnh đạt: 40 ID duy nhất, 40 ghi chú diễn giả, 7 section ngoài; thẻ `section`, `div`, `aside`, `ol`, `ul`, `table` cân bằng; Markdown bắt đầu bằng heading cấp một, không dùng delimiter LaTeX ngoài `$...$` và `$$...$$`; `git diff --check` sạch.
- Máy chủ HTTP cục bộ tại cổng tạm 8884 trả 200 cho deck, viewer, Markdown, CSS, RevealJS, plugin, KaTeX và sáu SVG. Máy chủ đã dừng sau kiểm tra.
- Codex Slides xác nhận dự án `20260828120744-lecture-04-t-i-u-tr-n-v-r-ng-bu-c-ng-th--d4es` ở trạng thái draft, có đúng 40 trang, 40 mục outline và sáu nguồn đúng vai trò. Browser tích hợp và trình duyệt headless cục bộ không khả dụng trong phiên này, nên không tuyên bố đã rà trực quan lại sau các thay đổi chữ; cổng hình học trước đó vẫn được ghi ở Mục 11.

### Rà văn phong ngày 2026-09-01

- Đã bỏ 13 dòng `Đầu ra` lặp mục tiêu đọc hiểu trong lecture note; toàn bộ định nghĩa, ví dụ, suy diễn, chứng minh và câu hỏi kiểm tra được giữ nguyên.
- Ghi chú diễn giả A07, B03, D05 và E01 được viết lại bằng quan hệ thuật toán, phổ Hessian, chuẩn đối ngẫu và hệ KKT; không còn nhãn mạch hay lời điều phối “trang sau”.
- Deck giữ đúng 40 mã duy nhất, 40 ghi chú và 7 section ngoài; `git diff --check` đạt. Các sửa chỉ rút gọn chữ, không đổi công thức, hình, số trang hoặc thứ tự.
- Hậu kiểm toàn khóa bỏ hai tham chiếu “mạch trước/mạch sau” còn sót ở C08 và E01; thay bằng quan hệ trực tiếp giữa độ cong, mô hình Newton và hệ KKT.

### 14. Rà soát sâu và kiểm định in ngày 2026-09-01

#### Nội dung và mạch khái niệm

- A05 và B04 dùng quan hệ thuộc với `argmin`, vì tập cực tiểu có thể chứa nhiều phần tử.
- B03 tự nêu hướng Euclid $d=-g$ trước khi tính quỹ đạo; B02 sau đó gọi tên đây là trường hợp giảm dốc nhất theo chuẩn Euclid.
- C02 được đặt trước C03. Sinh viên thấy mô hình bậc hai, giả thiết $H\succ0$ và hệ Newton trước khi kiểm chứng kết quả một bước trên hàm bậc hai.
- D02 nêu đủ miền mở, tính lồi, lớp $C^3$ và điều kiện theo mọi hạn chế trên đường. E07 ghi rõ kiểu của $x^{(0)}$ và $\nu^{(0)}$.
- Các từ `decrement`, `backtracking`, `normalized` và `unnormalized` trên mặt trang hoặc ghi chú đã được thay bằng thuật ngữ Việt tương ứng, trừ tên tiếng Anh đặt trong ngoặc ở lần giới thiệu đầu và nguyên văn LLO trong đề cương.
- Ghi chú diễn giả không còn mã mạch, chỉ dẫn sửa tệp, lời nhắc công bố đáp án hoặc câu điều phối biên tập. Các chuyển ý còn lại đều nêu quan hệ toán học giữa đầu ra hiện tại và nhu cầu kế tiếp.

#### Kiểm định cấu trúc, toán học và tài sản

- Có 40 mã trang duy nhất, 40 ghi chú, 40 đoạn nguồn và 7 `<section>` ngoài. Storyboard có đúng một hàng cho mỗi mã; bảng 40 trang trong outline khớp thứ tự DOM.
- Tính lại bằng phân số chính xác cho $t_0=2/11$, ba phép thử Armijo và hai hệ Newton–KKT đều khớp số liệu trên trang.
- Bảy SVG phân tích XML thành công, đều có `title` và `desc`, không chứa `script`, `foreignObject`, ảnh nhúng hoặc tài nguyên mạng. Contact sheet đã được xem trực tiếp; nhãn, trục và mũi tên thể hiện đúng đại lượng.
- Kết xuất PDF ban đầu phát hiện A04 mất nội dung vì SVG nội dòng và quy tắc màn hình hẹp kích hoạt khi in. Hình được tách thành `quadratic-start.svg`; quy tắc `@media print` giữ lưới hai/ba cột. PDF kết xuất lại có đủ 40 trang 16:9; contact sheet và trang A04 riêng đều hiển thị đủ hình, công thức và dữ kiện.
- Ảnh chụp trực tiếp ở 1280×720 cho C02 và ở 720×900 cho A04, C02, D02, E07 đều đọc được, không tràn hoặc chồng lấn.
- Máy chủ đang giữ cổng 8765 là `python3 -m http.server 8765 --bind 127.0.0.1 --directory 2627-1`; vì vậy URL kiểm định trong phiên này không có tiền tố `/2627-1/`. Deck và 16 tài sản được tham chiếu trực tiếp đều trả HTTP 200; KaTeX cục bộ trả 200 tại `vendor/katex/dist/katex.min.js`.

#### Giới hạn chưa đóng

- `python3 -m reloadserver 8765` không chạy được vì môi trường không có mô-đun `reloadserver`; cổng 8765 đồng thời đã thuộc máy chủ tĩnh nêu trên. Không dừng tiến trình có sẵn hoặc đổi cổng.
- Codex Slides không có bề mặt Browser/MCP trong phiên này. Kiểm định trực quan dùng Chromium headless cục bộ; không tuyên bố đã rà lại bằng Codex Slides.

#### Phản biện OpenRouter sau khi được cấp quyền

- Reviewer chạy qua OpenRouter với `requested_model` và `observed_model` cùng bằng `z-ai/glm-5.3-flash`. Lần đầu bị cắt ở giới hạn đầu ra; lần chạy lại hoàn tất và trả báo cáo.
- Reviewer xác nhận số học, các cận tự điều chỉnh, giả thiết hội tụ, điều kiện không suy biến của hệ Newton–KKT và số lượng 40 trang đều đúng.
- Hai lỗi trung bình đã đóng: storyboard nay ghi đúng bảy SVG; lecture note đã bỏ mã `A04`, các tham chiếu “Chủ đề 10/12/13” và đường dẫn `sources/Chương 5.pdf` khỏi tài liệu người học.
- Các lỗi nhẹ đã đóng: A02 nêu rõ $\operatorname{dom}f$ mở; outline tách kiểu của $x^{(0)}$ và $\nu^{(0)}$; chứng minh hội tụ bậc hai giải thích nghịch đảo chỉ là ký hiệu phân tích, còn triển khai vẫn giải hệ.
- Đề xuất thêm `self-concordant-curvature.svg` vào D03 không áp dụng: D03 đã có trực quan định lượng bằng tỷ số, tử số và mẫu số; SVG nhiều panel được giữ cho ghi chú bài giảng để tránh lặp và quá tải mặt trang. Outline đã ghi rõ sáu SVG dùng trong deck và một SVG dùng riêng trong lecture note.
- Thứ tự B01→B03→B02 được giữ theo storyboard. B03 tự nêu $d=-g$ và tìm kiếm đường chính xác trước công thức quỹ đạo, nên ký hiệu không xuất hiện đột ngột; mã `data-slide-id` không hiển thị trên mặt trang.
- Lượt tái kiểm cuối dùng `read_text_file` đúng một lần cho mỗi tệp và kết thúc `PASS (0/8 gạch lỗi)`; `requested_model` và `observed_model` cùng là `z-ai/glm-5.3-flash`, nhà cung cấp OpenRouter.
- Sau các sửa theo phản biện, deck được kết xuất lại thành PDF 40 trang, khung 16:9. Contact sheet và trang A02 được xem trực tiếp; nội dung, công thức và hình đều hiển thị đầy đủ, không tràn hoặc chồng lấn. Deck, Markdown và material viewer cùng trả HTTP 200 tại cổng kiểm định cục bộ.

### 15. Rà soát OpenRouter bổ sung ngày 2026-09-01

- Người dùng chỉ cho phép gửi bốn tệp: deck, lecture note, outline và storyboard của Bài 04. Reviewer được đặt trong thư mục tạm chỉ chứa bốn tệp này; `.env`, khóa API, SVG, `review-log.md` và các tệp khác không thuộc phạm vi đọc.
- Metadata runtime xác nhận `requested_model` và `observed_model` cùng bằng `z-ai/glm-5.3-flash`, nhà cung cấp OpenRouter. Yêu cầu hoàn tất qua HTTP 200, không có `api_transport_error`.
- Reviewer kết luận `PASS`, không có lỗi nghiêm trọng hoặc lỗi lớn. Các phép tính Armijo, Newton, Newton–KKT, cận hội tụ và điều kiện tự điều chỉnh được tính lại độc lập và đều khớp.
- Sáu lỗi nhẹ đã được xử lý: A04 thống nhất ký hiệu $\kappa_2(H)$; B05 dùng $\nabla^2f(x)$ thay cho ký hiệu $H$ bị quá tải; C06 phát biểu rõ mức giảm cố định trong pha tắt dần; lecture note bỏ từ lặp; ghi chú P02 và Z03 bỏ lời biên tập; mục tổng hợp cùng nhóm định lý tương ứng của lecture note đổi từ `F` thành `Z` để khớp deck, outline và storyboard.
- Rà soát độc lập sau chỉnh sửa phát hiện một nhãn `Nhóm F` còn sót trong phần định lý của lecture note. Nhãn đã đổi thành `Nhóm Z`; các kiểm tra cấu trúc, công thức, khối mở/đóng và tài nguyên cục bộ đều đạt.
