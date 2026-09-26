# Nhật ký xây lại và rà soát Bài 05

## Trạng thái hiện tại ngày 2026-09-26

Đã hoàn tất bản RevealJS 37 trang, năm phần (7/8/8/11/3), 15 SVG tự dựng, ghi chú và mười bài tập công khai. Cổng storyboard, năm vai rà độc lập, biên tập riêng, tái kiểm toán và mạch bài đều đạt. Kiểm định trình duyệt và hồi quy CSS chung đã đạt; Codex Slides đã lưu đủ 37 hình và 37 ghi chú, đối chiếu từng trang trên canvas. Không còn phát hiện chặn bàn giao hoặc nghiêm trọng. Kết quả quản lý phiên bản được xác minh và báo trong bàn giao.

Đính chính đơn vị thời lượng: đề cương DOCX chính thức dùng nhãn **“Số giờ/buổi”**. Bản hiện hành giữ **2 giờ lý thuyết (LT) + 1 giờ bài tập (BT)** và mọi phân số phân bổ, không quy đổi phút. Những chỗ ghi “tiết” dưới đây là nguyên văn lịch sử lập kế hoạch ngày 2026-09-25, đã được đính chính trong outline/storyboard ngày 2026-09-26.

Các mục kế tiếp tới trước “Rà bản triển khai” ghi lại giai đoạn dàn bài. Trạng thái “đã đạt/đã đóng/chưa triển khai” trong giai đoạn đó chỉ áp dụng cho sản phẩm và thời điểm được ghi, không mô tả HTML hiện tại.

## Phạm vi và trạng thái

Ngày 2026-09-25. Người dùng yêu cầu loại bỏ dàn bài trước, xây lại từ nguồn và nghiên cứu cách Boyd cùng *Deep Learning* thiết lập, tái sử dụng khái niệm làm bệ đỡ. Toàn bộ các vai của lượt này dùng **GPT-6-Astra ultra**, không gọi OpenRouter. Không đọc lại nội dung dàn bài cũ hoặc báo cáo OpenRouter; không tạo bản lưu dàn cũ.

Sản phẩm là [outline.md](outline.md), [storyboard.md](storyboard.md) và nhật ký này: **37 trang, 5 phần, 2 tiết lý thuyết (LT) + 1 tiết bài tập (BT)**. Chưa có căn cứ đổi tiết sang phút. Chỉ biên tập tài liệu lập kế hoạch; chưa tạo HTML, tài sản hình, ghi chú hoặc bài tập công khai.

Quy ước thuật ngữ: chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), phương pháp hạ gradient (GD), phương pháp hạ gradient ngẫu nhiên (SGD), phương pháp gradient gia tốc Nesterov (NAG), hàm tuyến tính chỉnh lưu (ReLU).

**Trạng thái sau biên tập:** đã thực hiện 17 mục được điều phối viên duyệt và bốn cầu nối ST01–ST04. Không thêm, bỏ hoặc đổi thứ tự trang. Tác tử toán đã tái kiểm và đóng M1–M7; tác tử mạch kể chuyện đã tái kiểm và đóng ST01–ST04. Hai báo cáo `review-math-recheck.md` và `review-story-recheck.md` xác nhận đạt trong phạm vi dàn bài/storyboard. Không còn phát hiện chặn bàn giao, nghiêm trọng hoặc trung bình chưa xử lý trong hai phạm vi này. Các kết luận không thay thế kiểm định hiển thị sau triển khai.

## Các vai và bằng chứng rà

| Vai | Tác tử, công việc thực tế | Trạng thái và nguồn báo cáo |
|---|---|---|
| Điều phối | `/root`: xác lập yêu cầu, kiểm đề cương, duyệt kiến trúc, điều phối các lượt rà, tiếp nhận phát hiện và giao biên tập | Đã kiểm định cuối và đồng bộ Codex Slides; thực hiện quản lý phiên bản sau khi chốt ba tệp |
| Lập kế hoạch | `/root/lec05_rebuild_planner`: đọc đề cương và Bài 04, so hai phương án, xác định tiên quyết mạng còn thiếu | Kiến trúc mới được duyệt; nội dung cần thiết tích hợp trong outline/storyboard |
| Nghiên cứu Boyd | `/root/boyd_scaffolding`: đọc sách, slide chính thức và các hình liên quan | Báo cáo mới `boyd-scaffolding.md`; phân biệt quan sát nguồn với suy luận sư phạm |
| Nghiên cứu Deep Learning và soạn | `/root/dl_scaffolding`: đọc §§8.1–8.4 cùng nền cần thiết, đối chiếu Hinton; viết bản nháp ba tệp | Báo cáo `dl-scaffolding.md`; bản nháp 37 trang đã bàn giao trước khi biên tập |
| Góc nhìn sinh viên | `/root/lec05_independent_student` | Đã rà độc lập; `review-student-independent.md`, SV01–SV04 |
| Góc nhìn chuyên gia | `/root/lec05_rebuild_planner` | Đã thực hiện lượt chuyên môn riêng; `review-expert.md`; phát hiện thuật ngữ được gán mã EX01 trong nhật ký để truy nguyên |
| Độ chính xác toán học | `/root/lec05_independent_math` | Báo cáo độc lập chính thức `review-math-independent.md`; `review-math-recheck.md` đã đóng M1–M7 |
| Phản biện học thuật và giảng dạy | `/root/boyd_scaffolding` | Báo cáo `review-academic.md`; AC1–AC4. Cùng tác tử cũng có lượt kiểm storyboard trước đó, không tính thành một người rà khác |
| Mạch kể chuyện và kết nối | `/root/lec05_independent_story` | Báo cáo độc lập chính thức `review-story-independent.md`; `review-story-recheck.md` đã đóng ST01–ST04 và kiểm các ranh giới bị ảnh hưởng |
| Biên tập | `/root/lec05_rebuild_planner`, khác tác tử soạn | Chỉ sửa ba tệp planning theo `edit-requests.md` và các chuyển ý đã duyệt; không tự đóng phát hiện cần tái kiểm |

Các báo cáo gốc nằm tại `/tmp/lec05-astra-rebuild/` trong lượt làm việc. Bảng phát hiện dưới đây giữ nội dung, mức độ, quyết định và trạng thái trong kho để việc truy nguyên không phụ thuộc riêng vào tệp tạm. Tiền kiểm toán của điều phối viên và tác tử lập kế hoạch, cùng các lượt mạch ban đầu của tác tử Boyd, là bằng chứng bổ sung; không tự nhận đó là thêm người rà độc lập. Năm vai chính thức ở bảng trên đã đọc bản nháp mới.

## Những quyết định thiết kế được giữ

1. Năm phần gồm mục tiêu/đánh giá; gradient lấy mẫu; momentum/Nesterov; khởi tạo; tổng hợp. Số 37 xuất phát từ các bước ví dụ, suy luận và năm kiểm tra riêng, không kế thừa số trang cũ.
2. Phân bổ LT lần lượt 0.35/0.40/0.50/0.60/0.15 tiết; BT lần lượt 0.10/0.25/0.25/0.25/0.15 tiết. Mọi hoạt động của A07/B08/C08/D11/E02 nằm trong một tiết BT. D11 chỉ phân lại thời gian nội bộ khi bổ sung phép đạo hàm.
3. Giữ ba bệ đỡ: trung bình dữ liệu → gradient lấy mẫu; mô hình cục bộ → trạng thái cập nhật; hợp hàm → truyền đạo hàm và thang. Không dùng một công thức bao trùm các cơ chế khác nhau.
4. Chủ ý phân phối §8.2 tới nơi có tác dụng: A06 giới hạn điểm dừng/cực tiểu, B thông tin gradient, C độ cong, D độ sâu/bão hòa. Không đưa thuật toán thích ứng, thuật toán bậc hai hoặc chuẩn hóa theo lô của Bài 06 vào tuyến chính.
5. VD1 có nhiễu còn tại nghiệm. VD2 giữ hàm Bài 04, viết nhất quán $q(\theta)=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$; $\theta_t$ là vectơ vòng lặp, $[\theta]_i$ là tọa độ. C02 nhắc bước $1/4$; C03–C07 dùng cấu hình đối chứng chung $\eta=1/20,\beta=1/2,v_0=0$. Không so hai cấu hình khác bước để chứng minh tác dụng riêng của momentum.
6. VD3 là mạng ReLU hai đơn vị phục vụ dây chuyền/đối xứng. Mô hình tuyến tính ngẫu nhiên phục vụ phương sai được công bố riêng. Glorot không được coi là bảo toàn chính xác cho ReLU; không thêm He ngoài quyết định đã chốt.
7. D10 mang tên **Thang phương sai qua nhiều lớp** và chỉ tính hệ quả mô hình; D11 kiểm đạo hàm với dữ kiện mới và Glorot cho lớp $8\to4$. E01 mang tên **Cấu hình quy trình huấn luyện**. Các trang giữ nguyên vai trò.

## Phát hiện và quyết định biên tập

Mức độ dưới đây giữ **mức ban đầu cao nhất** khi các báo cáo trùng vấn đề. Các phát hiện không bị xóa sau khi sửa. “Đã sửa” là mô tả thao tác, chỉ “tái kiểm đạt” mới đóng lượt xác nhận tương ứng.

| Mã gốc và mức độ ban đầu | Bằng chứng/vấn đề | Biên tập và vị trí | Trạng thái |
|---|---|---|---|
| M1 — **chặn bàn giao**; SV02 trung bình; tiền kiểm toán | HT2/B03 dùng $\Sigma(\theta)$ nhưng chưa định nghĩa hoặc nêu kích thước | Định nghĩa $g_i,\bar g$, hiệp phương sai bằng cả kỳ vọng và tổng; ghi $\mathbb R^{p\times p}$, khả vi tại điểm xét, lấy mẫu độc lập đều có hoàn lại và độc lập với lịch sử | Đã sửa; tác tử toán tái kiểm M1 đạt theo thông báo điều phối viên |
| M2 — **chặn bàn giao**; SV02/AC3 trung bình | D08 chưa định nghĩa hai gradient delta, chưa có bước dây chuyền từ vô hướng; thiếu điều kiện trung bình 0 trong công thức phương sai | HT9/D08 đặt $\delta_z=\nabla_z\ell$, $\delta_h=\nabla_h\ell$, viết tổng từng thành phần trước $W^T\delta_z$; nêu $r>0$, trung bình 0, độc lập với toàn bộ $W$. D07 đặt $q>0$; đồng bộ KN5a | Đã sửa; tác tử toán tái kiểm M2 đạt. Cầu nối đã được tái kiểm mạch xác nhận đạt |
| M3 — **nghiêm trọng** | C dùng $\theta_1,\theta_2$ cho cả tọa độ và vectơ vòng lặp | Đặt quy ước trước VD2; đổi mọi tọa độ, hàm, trục và công thức co sang $[\theta]_i$; giữ $\theta_t$ cho vectơ vòng lặp; đồng bộ storyboard | Đã sửa; tác tử toán tái kiểm M3 đạt |
| M4 — trung bình; SV03 trung bình | $p$ vừa là số tham số vừa là số lần chờ dừng sớm; ngân sách và tiêu chí cải thiện chưa rõ | B05 giữ $p$ cho số tham số; dùng duy nhất $K_{\mathrm{stop}}\in\mathbb N_{>0}$; định nghĩa $T,t$, lưu giá trị xác thực nhỏ nhất và so ngưỡng với giá trị tốt nhất trước lần đánh giá | Đã sửa; tác tử toán tái kiểm M4 đạt |
| M5 — trung bình | Các ký hiệu phân phối/miền, ma trận đơn vị, trị riêng, lớp và phân phối đều chưa được chú giải đủ | HT1/A04 đặt miền nhãn/dự đoán, $P,(X,Y),d,p$; C01/C02 đặt $I_2,\lambda_1,\lambda_2$; D05 đặt $l,L,c_l,h^{(l)}$; D07 đặt kích thước; D09/HT10 định nghĩa phân phối đều và $a>0$ | Đã sửa; tác tử toán tái kiểm M5 đạt |
| M6 — trung bình | D10 thiếu độc lập giữa ma trận lớp; E02 lẫn tình huống mạng với vectơ hai chiều | D10 nêu độc lập giữa các ma trận và với đầu vào; E02 ghi phần Nesterov là tiểu bài toán độc lập trong $\mathbb R^2$ | Đã sửa; tác tử toán tái kiểm M6 đạt |
| SV01 — trung bình | B08/C08/D11 viện dẫn mã ví dụ, đề chưa tự chứa dữ liệu/hàm cần tính | B08 ghi ba quan sát, mất mát, $J$; C08 ghi chính hàm $q$; D11 ghi mạng, mất mát, dữ kiện và giả thiết của lớp tuyến tính ngay trong đề; storyboard bắt buộc giữ dữ kiện hiển thị | Đã sửa; dữ kiện trên đề đã được đối chiếu trong tái kiểm toán/mạch |
| SV04/AC4 — trung bình | MT3 yêu cầu tự tính đạo hàm nhưng các phép đạo hàm đều là ví dụ có hướng dẫn | D11 thêm $x=2,y=1,w_j=0.5,a_j=1,b_j=0$; sinh viên tính hai đạo hàm theo $w_j$ trước giải thích đối xứng. Đáp án $z_j=h_j=1,f=2,e=1$, hai đạo hàm 2; cập nhật tiêu chí và minh chứng KN4 | Đã sửa; đáp án mới đã được tác tử toán kiểm đúng theo điều phối viên; giữ 0.25 BT |
| AC1 — trung bình | Dữ kiện C01 chưa minh họa đúng luận điểm “gradient lớn không đồng nghĩa cần đi xa nhất” | Giữ dữ kiện, đổi luận điểm thành gradient phụ thuộc độ lệch và độ cong; dùng $[g]_i=\lambda_i[\theta]_i$, so tỷ số $14/3$ với 2. Không gọi $7/3$ là điều kiện cực kỳ kém | Đã sửa; tái kiểm mạch C01–C05 đạt; M7 đã được tác tử toán đóng |
| AC2/ST02 — trung bình | C05→C06 mới mô tả đổi điểm đo, chưa có nhu cầu hiệu chỉnh ở vị trí dự báo | Tái dùng Hessian: thay đổi gradient là $H\beta v=(-0.45,-4.9)^T$. Đặt cạnh hai gradient; C07 tổng quát hóa hiệu chỉnh tại điểm dự báo. Giữ kết quả Nesterov không tốt hơn momentum ở bước hai | Đã sửa; tái kiểm mạch C03–C08 và ranh giới C→D đạt |
| ST01 — trung bình | C02 đổi sang bước nhỏ và thêm trạng thái ở C03 nhưng chưa nói hạn chế còn lại | Nêu giảm bước tránh vượt trục đồng thời làm ngắn tiến triển; C03 thử giữ thành phần hướng nhất quán. Chỉ C05 đối chứng cùng bước để tách tác dụng trạng thái | Đã sửa; tái kiểm C01–C05 và ranh giới B→C đạt |
| ST03 — trung bình | D09 hứa kiểm tín hiệu thực tế nhưng D10 chỉ có bảng tính phương sai mô hình | Đổi câu nối và luận điểm D10 sang hệ quả thang qua nhiều lớp; giữ bảng tính. Đo kích hoạt/gradient là bước vận hành tiếp theo trong ghi chú, chưa là thí nghiệm đã làm | Đã sửa; tái kiểm D07–D11, E01–E02 và ranh giới D→E đạt |
| ST04 — nhẹ | D06 nêu bão hòa nhưng D07 chưa dùng vùng gần tuyến tính để giải thích chọn mô hình | Nêu $\tanh z\approx z$ gần 0, đạo hàm gần 1; lấy mô hình tuyến tính để ước lượng thang xuất phát, phải kiểm lại khi đưa phi tuyến vào | Đã sửa; tái kiểm D04–D09 đạt |
| EX01 — nhẹ | SGD/ReLU/LLO/CLO dùng trước lời giải nghĩa; B05 gọi nhầm là lần đầu | Thêm thuật ngữ đầu từng tài liệu, kể cả GD/NAG; A02 yêu cầu tên đầy đủ trên bản đồ; bỏ lời “lần đầu” không đúng ở B05/D01. Dùng “chuẩn hóa theo lô”; thay các từ chỉ dẫn tiếng Anh còn sót trong storyboard | Đã sửa; đã kiểm vị trí giải nghĩa trong lượt biên tập |
| Bổ sung điều phối — không phải phát hiện của người rà thứ sáu | B06 đặc tả đường sai số chưa có dữ liệu; B08 đếm cứng số kết quả; hai tiêu đề còn thiên về thao tác | B06 đặc tả sai số chuẩn $\sqrt{8/(3b)}$ tại tham số cố định, không phải đường hội tụ; B08 dùng “các giá trị”; đồng bộ tên mới D10/E01 | Đã sửa; kiểm cấu trúc cùng lượt biên tập |

### Phát hiện khi tái kiểm

| Mã, mức độ | Bằng chứng mới | Quyết định và trạng thái |
|---|---|---|
| M7 — trung bình | Sau sửa AC1, $g_i$ của C01 có nghĩa tọa độ trong khi phần B dùng $g_i$ cho gradient mẫu | Đã sửa C01 thành $g=\nabla q(\theta)$, $[g]_i=\lambda_i[\theta]_i$; HT4 định nghĩa $g=\nabla q(\theta)$ trước công thức. Storyboard không có $g_i$ với nghĩa tọa độ. **Đã được tác tử toán tái kiểm và đóng** trong `review-math-recheck.md`. |

Không có đề xuất sửa được duyệt nào bị bỏ. Phương án rút ngắn dàn bài theo hạn ngạch số từ không áp dụng: các trường nguồn, dữ kiện, giả thiết, liên kết và đáp án vẫn cần cho triển khai; chỉ sửa phạm vi đã được chốt.

## Kết quả kiểm định sau biên tập

Kiểm trực tiếp sau biên tập xác nhận 37 mã trang, tiêu đề và thứ tự khớp tuyệt đối giữa outline/storyboard; tổng từng trang đúng 2.00 tiết LT + 1.00 tiết BT. Năm trang kiểm tra vẫn là A07/B08/C08/D11/E02. Các phân cách công thức hợp lệ trong cả ba tệp; không còn công thức tọa độ cũ, ký hiệu chờ không thống nhất hoặc các từ chỉ dẫn được yêu cầu Việt hóa. `git diff --check` trong phạm vi ba tệp đạt. Điều phối viên kiểm thêm liên kết cục bộ, kết quả đạt.

Đã đọc hai báo cáo tái kiểm cuối. Rà toán đóng M1–M7, gồm đáp án mới D11, ký hiệu thành phần gradient và đồng bộ storyboard. Rà mạch đóng ST01–ST04 và xác nhận các sửa C01/C06/D08/D11, các trang lân cận và ranh giới B→C, C→D, D→E. Cả hai kết luận chỉ áp dụng cho đặc tả trước triển khai. Điều phối viên đã lược một câu lặp không ảnh hưởng kết luận ở KN5a, đồng bộ lại đúng nội dung tệp và kiểm giao diện storyboard cuối đạt; không thay nội dung toán hoặc cấu trúc.

## Nguồn, Codex Slides và quản lý phiên bản

Nguồn gốc và vị trí được giữ trong outline. Tối ưu không ràng buộc là Chương 9 trong sách Boyd, phần 10 trong original slides. Các trang DL dẫn số in của PDF cục bộ kèm mục/công thức, không trộn với trang web. Dòng thang trọng số mâu thuẫn ở Hinton trang 10 không được kế thừa. Không tải thêm nguồn MIT hoặc đưa hình bên thứ ba chưa xác minh quyền vào bài.

Điều phối viên đã tạo dự án Codex Slides mới `20260925161327-b-i-05-t-i-u-trong-hu-n-luy-n-m-ng-n-ron-k7xn`, đồng bộ đủ 37 trang với đúng tiêu đề/luận điểm và tải lên hai tệp có checksum SHA-256 khớp nội dung cục bộ tại thời điểm đối chiếu. Giao diện dàn bài đã được kiểm bằng Playwright cục bộ, kết quả đạt. Môi trường không có công cụ Browser gốc trong trình soạn thảo; không mô tả lượt kiểm này thành việc sử dụng công cụ ấy. Các thao tác dự án/nguồn không gọi tác tử AI khác. Bằng chứng này do điều phối viên thực hiện và báo lại trong lượt làm việc; người biên tập không tự nhận là người thao tác.

Chưa dựng hoặc kết xuất HTML nên chưa kiểm tràn, cỡ chữ thực tế, KaTeX, bàn phím, màn hình rộng/hẹp hay xuất tệp của bộ trang chiếu. Không có tuyên bố HTML đã chạy. Đồng bộ sau lược câu lặp đã hoàn tất. Phạm vi mốc Git gồm đúng ba tệp kế hoạch Bài 05; điều phối viên thực hiện commit/push sau các kiểm tra trên, theo quyền đã được người dùng cấp. Mã phiên bản và kết quả đẩy được đối chiếu trong lịch sử Git khi bàn giao.

## Rà bản triển khai ngày 2026-09-26

Tất cả vai dùng GPT-6-Astra native theo yêu cầu người dùng, không OpenRouter, không đọc `.env`. Tác tử chỉnh sửa khác tác tử soạn; chỉ bắt đầu sau khi nhận đủ năm báo cáo và lượt rà toán tài liệu công khai. Kỹ năng `no-ai-slop` được dùng cho giọng học thuật trực tiếp; chỉ sửa câu chưa rõ, giữ dữ kiện, giả thiết, giới hạn và kết luận có căn cứ.

### Năm báo cáo chính thức và cổng storyboard

Bảng dưới lưu kết luận, phạm vi và phát hiện của từng báo cáo. Mã ở mục này thuộc **giai đoạn triển khai**, độc lập với mã trùng tên ở lịch sử dàn bài. Báo cáo gốc trong phiên nằm tại `/tmp/lec05-implementation/`; nội dung quyết định được giữ trong các bảng dưới để truy nguyên không phụ thuộc tệp tạm.

| Vai và tên báo cáo | Phạm vi, kết luận và giới hạn | Phát hiện đã nhận |
|---|---|---|
| Kiểm định storyboard — `review-storyboard.md` | Đọc 37 trang và notes, đối chiếu outline/storyboard. Đủ năm phần và năm trang kiểm tra; mọi trang có lý do tồn tại. Đủ điều kiện chuyển năm vai, cần ba sửa cục bộ; không thêm/bỏ/đổi thứ tự. Chưa thay kiểm thị giác. | SB01 A03 thiếu nhiệm vụ tối thiểu hóa; SB02 D02 trộn nút biến với đạo hàm; SB03 mục tiêu A02 chỉ ở notes. |
| Sinh viên — `review-student.md` | Đọc đủ nội dung/notes, xem 37 ảnh rộng và các ảnh hẹp trọng tâm. Chấp nhận hệ ví dụ và tiên quyết; phép thử CSS chưa phải HTML thật. Khung hẹp cần kiểm đến cuối; tài liệu công khai chưa hoàn tất lúc rà. | SV01 nghiêm trọng: bảng D08 chạm chân trang; SV02 trung bình: tên D11 gán tám đầu vào cho cả hai mô hình; SV03 nhẹ: thiếu giải nghĩa sai số chuẩn. Nhắc SB01/SB02 và ba mục tiêu trong ghi chú công khai. |
| Chuyên gia — `review-expert.md` | Đọc 37 trang, ghi chú và mười bài tập. Đủ LLO11–13 và ba mức bài tập; không có phát hiện mới chặn/nghiêm trọng. Không cần thêm He, Adam, định lý gia tốc. | EX01 bước cố định momentum/Nesterov; EX02 phụ thuộc mất mát qua lớp; EX03 miền cỡ nhóm và sai số chuẩn; EX04 định nghĩa số điều kiện; EX05 nguồn Hinton công khai. |
| Toán học — `review-math.md` | Đọc đủ 37 trang/notes, kiểm hình và tính số độc lập. Các gradient, hiệp phương sai, quỹ đạo, Glorot và đáp án đúng dưới giả thiết dự định. Bổ sung M06 sau kiểm hình học: tọa độ đúng nhưng tỷ lệ trục gây méo góc. Chưa rà materials ở thời điểm báo cáo. | M01 trung bình: định nghĩa mất mát mẫu tổng quát thiếu; M02–M05 nhẹ: miền nguyên dương, bước cố định, khả vi ReLU, đường phụ thuộc mất mát; M06 trung bình: năm SVG dùng 72/35 điểm trên đơn vị thay vì bằng nhau. |
| Phản biện học thuật — `review-academic.md` | Đọc toàn bộ nội dung/notes và kế hoạch. Mạch phù hợp, ứng dụng dùng kết quả, không cần tăng trang. Rà văn phong không phát hiện quảng bá hoặc nguồn mơ hồ. Chưa kiểm bố cục ảnh. | AC01 D07 đặt tổng quát trước ví dụ; AC02/AC03/AC04 trùng SB01/SB02/SB03. Câu notes D02 có thể viết trực tiếp hơn. |
| Mạch kể chuyện — `review-story.md` | Đủ năm mạch có chức năng/đầu vào/đầu ra và ranh giới A→B→C→D→E. E thu hồi vấn đề mở đầu. Không có lỗi chặn/nghiêm trọng thuộc vai này. Rà toàn tuyến sau sửa mở bài; không dùng rà mã thay kiểm ảnh. | ST01 trùng SB01; ST02 trùng SV02; ST03 cần hiện kết luận xung đột D08→D09; ST04 trùng SB03. |
| Rà toán materials — `review-materials-math.md` | Đọc toàn bộ hai Markdown và mười lời giải. Số học và chứng minh đúng dưới giả thiết dự định; chưa có lỗi nghiêm trọng/chặn. | MM01 Bài 9.3 thiếu đầu vào trung bình 0; MM02 trùng M05/EX02; MM03 trùng M02/EX03; MM04 trùng M03/EX01. |

### Bảng hợp nhất phát hiện và quyết định

Mọi đề nghị sửa dưới đây được điều phối viên chấp nhận. Trạng thái **đã sửa** chỉ xác nhận thao tác của người biên tập; không tự thay kết luận của vai tái kiểm.

| Mã / mức ban đầu / vai | Bằng chứng và ảnh hưởng | Quyết định đã thực hiện, vị trí và lý do | Trạng thái sau sửa, trước tái kiểm |
|---|---|---|---|
| SB01 / trung bình; AC02; ST01 | A03 có mất mát và $J(1)$ nhưng chưa nói chọn tham số theo mục tiêu nào; phép tính có thể bị hiểu là nhiệm vụ cuối. | Thêm nhu cầu chọn dự đoán chung để mất mát trung bình trên ba quan sát nhỏ nhất trước công thức; giữ phép tính $J(1)$ và không giải tối ưu sớm. | Đã sửa HTML/outline; chờ rà mạch toàn tuyến vì chạm mở bài. |
| SB03 / nhẹ; AC04; ST04; ghi nhận sinh viên | A02 chỉ hiện danh mục phần, ba kết quả đánh giá được ở notes. | Khối dưới bản đồ hiện ba thao tác phân biệt mục tiêu/đánh giá, tính bước, giải thích đối xứng/thang. Ghi chú công khai có kết quả cần đạt và tiên quyết. | Đã sửa; chờ rà mạch. |
| SB02 / trung bình; AC03 | D02 đặt $x,\phi'(z_j),a_j,e$ thành nút ngang hàng với các biến tính toán. | Chỉ giữ nút $w_j,z_j,h_j,f_\theta,\ell$; ghi đạo hàm cục bộ trên mũi tên KaTeX, notes giải thích nhãn. Giữ ví dụ số trước công thức tổng quát. | Đã sửa; chờ tái kiểm D01–D05 và hai lân cận theo phạm vi điều phối. |
| AC ghi chú / nhẹ | Câu “Tính gradient bằng quy tắc dây chuyền là bước phân biệt…” rối. | Viết “Quy tắc dây chuyền tính gradient; thuật toán tối ưu dùng gradient để cập nhật tham số.” | Đã sửa; không đổi mệnh đề. |
| M01 / trung bình | $\ell_i$ chỉ có nghĩa ở ví dụ A03; B01 dùng cho mô hình tổng quát. | A04 đặt $\ell_i(\theta)=\ell(f_\theta(x_i),y_i)$ trước $J=N^{-1}\sum_i\ell_i$. Ghi chú đã có định nghĩa đúng. | Đã sửa; chờ toán tái kiểm. |
| M02 / nhẹ; EX03; MM03 | Miền $b$ thiếu, B05 chưa ghi $T$ dương. | B03 và mệnh đề ghi chú/đề Bài 2 nêu $b\in\mathbb N_{>0}$; B05 nêu $b,T,K_{\rm stop}\in\mathbb N_{>0}$. Không thêm $b\le N$. | Đã sửa đồng bộ; chờ toán tái kiểm. |
| M03 / nhẹ; EX01 / trung bình; MM04 | HTML chuyển từ lịch SGD sang $\eta$ mà chưa công bố; notes dùng $\eta_t$ rồi gọi hệ số cố định. | C04/C07 và phần C ghi chú công bố $\eta>0$ cố định; hai truy hồi dùng $\eta$. Phần B SGD giữ lịch $\eta_t$. | Đã sửa; chờ toán tái kiểm. |
| M04 / nhẹ | Bất biến ReLU qua nhiều bước thiếu phạm vi khả vi; tại 0 đạo hàm cổ điển chưa tồn tại. | D03 nêu “ở các bước khả vi”; notes D03/D11/E02 nói cùng quy ước đạo hàm tại 0. D11 giới hạn câu hỏi; lời giải Bài 7 đồng bộ. Ghi chú đã có điều kiện phù hợp. | Đã sửa; chờ toán tái kiểm. |
| M05 / nhẹ; EX02 / trung bình; MM02 | $\delta_h=W^T\delta_z$ cần mất mát phụ thuộc $h$ qua $z=Wh$, không chỉ khả vi. | Nêu đường phụ thuộc ở D08, HT9/dàn bài, ghi chú và đề Bài 9; giữ $W$ cố định khi đạo hàm. Giữ độc lập gradient/trọng số là giả thiết mô hình. | Đã sửa; chờ toán tái kiểm. |
| M06 / trung bình | Năm SVG C dùng tỷ lệ 72 và 35 khiến đường mức bị dẹt, góc gradient/tiếp tuyến bị sai dù tọa độ đúng. | Vẽ lại đúng năm SVG bằng ánh xạ $X=300+36x$, $Y=195-36y$. Giữ hàm $q$, các mức, điểm, vectơ, quỹ đạo sáu bước và cấu hình. Dời nhãn khi cần, không xoay vectơ độc lập. | Đã sửa; đã xem ảnh năm hình; chờ toán xác nhận tỷ lệ và kiểm sau CSS. |
| K01 / lỗi hiển thị; tiền kiểm điều phối | KaTeX nạp sau CSS nội bộ thắng selector cùng độ ưu tiên, gây tràn 17 trang trước phép thử. | Tạm dùng `.reveal .katex` và `.reveal .katex-display` cho cỡ chữ/khoảng cách trong HTML; không giảm cỡ thân. Tác tử CSS sẽ chuyển tuần tự sang stylesheet chung theo yêu cầu mới. | Kiểm HTML thật sau sửa: khung rộng không tràn; chưa coi chuyển CSS hoàn tất. |
| K02; SV01 / nghiêm trọng | Bảng D08 kết thúc dưới khung 900px, hàng thứ hai bị chân trang đè sau phép thử CSS. | Hai cột: dây chuyền/giả thiết/phương sai bên trái, bảng 4→2 và kết luận bên phải. Bỏ hình mạng lùi lặp theo phê duyệt điều phối; D07 giữ hình lớp. Giữ cả hai hàng, thân 28px và toàn bộ công thức/giả thiết. | Ảnh HTML thật hiện đủ, không chạm footer; chờ kiểm sau CSS và vai độc lập. |
| SV03 / nhẹ; EX03 | Sai số chuẩn chưa được nối bằng định nghĩa với phương sai đã học. | B06 và ghi chú định nghĩa căn phương sai; công thức $\sqrt{8/(3b)}$ tại $\theta=1$ cố định. Giữ giới hạn đây không phải đường hội tụ. | Đã sửa; chờ tái kiểm nội dung. |
| AC01 / vừa | D07 tổng quát hóa trước ví dụ; chưa bám trình tự đã duyệt. | Nhu cầu giữ phương sai → miền/giả thiết → ví dụ bốn đầu vào với $s^2=1,1/4$ cạnh hình → tổng phương sai tổng quát. Giữ $q>0$ là phương sai. | Đã sửa và xem ảnh; chờ rà mạch/toán. |
| SV02 / trung bình; ST02 | Tiêu đề D11 chỉ đúng cột phải, dễ gộp mạng hai đơn vị với lớp tám đầu vào. | Đổi duy nhất tiêu đề D11 thành “Đối xứng và thang khởi tạo”; ghi hai tiểu bài toán độc lập. Đồng bộ outline/storyboard, giữ mã/vị trí/dữ kiện. | Đã sửa; chờ rà mạch D và ranh giới D→E. |
| ST03 / nhẹ | D09 nói thỏa hiệp nhưng D08 chỉ nêu xung đột trong notes. | Câu cuối cột phải D08 hiện rõ hai độ rộng khác nhau làm hai yêu cầu bảo toàn không cùng thỏa. | Đã sửa; chờ rà D06–D11 và ranh giới D→E. |
| EX04 / nhẹ | “Điều kiện hóa kém” chưa có định nghĩa gắn với hai độ cong. | Notes C01 và ghi chú phần C định nghĩa $\kappa(H)=\lambda_{\max}/\lambda_{\min}$ cho Hessian xác định dương; hướng cong lớn giới hạn bước. Giữ $7/3$ là chênh lệch vừa, không phóng đại. | Đã sửa; chờ toán tái kiểm. |
| EX05 / nhẹ | Nguồn Hinton cuối ghi chú thiếu tên khóa học và URL. | Thêm *Neural Networks for Machine Learning*, Lecture 6 và PDF Toronto chính thức đã có trong outline. | Đã sửa liên kết nguồn, không nghiên cứu nguồn mới. |
| MM01 / trung bình | Bài 9.3 chỉ ghi phương sai 1. Nếu trung bình 1 thì công thức cho lớp đầu phải là $8s^2$, không phải $4s^2$. | Đề nói đầu vào có các thành phần trung bình 0 và phương sai 1; giữ lời giải đã đúng dưới giả thiết này. | Đã sửa; chờ toán materials tái kiểm. |

Không bác bỏ đề nghị sửa nào trong nhóm được duyệt. Không thêm trang, không đổi thứ tự, không thay ví dụ hoặc thuật toán. Đề nghị bổ sung định lý, lịch sử hay He không thuộc nhóm sửa được yêu cầu. Việc loại hình lùi D08 là quyết định riêng được điều phối viên chấp nhận vì lặp thông tin và cản khả năng đọc, không lược giả thiết hay bước suy.

### Tài sản hình và sai khác có chủ ý

HTML hiện dùng 15 SVG cục bộ tự dựng từ công thức/ví dụ: ba quan sát, hai loại điểm tới hạn, hướng gradient mẫu, bước mẫu, sai số chuẩn, độ dài bước ngẫu nhiên, năm hình bậc hai, mạng hai đơn vị, chuỗi tuyến tính, tanh và lớp tuyến tính tiến. Một SVG có thể được dùng trên nhiều trang. Không có raster được dùng và không có ngoại lệ quyền bên thứ ba. Hình `variance-backward.svg` được tạo trong lượt triển khai này nhưng không còn được nhúng tại D08; điều phối viên đã loại tệp chưa được Git theo dõi này khỏi sản phẩm. Không xóa tài sản cũ đã có trong kho.

Năm SVG đã sửa hình học là `quadratic-initial.svg`, `quadratic-step.svg`, `momentum-vectors.svg`, `momentum-comparison.svg`, `nesterov-points.svg`. Chỉ tách phần hàm hình liên quan từ tập lệnh dựng trong phiên; không chạy lại toàn bộ trình dựng và không ghi đè nội dung HTML/Markdown. Các đồ thị là minh họa tính toán xác định, không phải bằng chứng thực nghiệm. Nguồn khái niệm và việc tự dựng được ghi trong notes tương ứng.

Các thay đổi có chủ ý so với đặc tả ban đầu: bổ sung mục tiêu hiển thị A02, động cơ A03, định nghĩa A04; sửa biểu diễn D02; đưa ví dụ D07 trước tổng quát; đổi bố cục D08 và bỏ hình lặp; đổi tên D11; đính chính giờ thay tiết. Những thay đổi đều giữ 37 mã và năm phần. Bảng bố cục hiện hành cho đủ 37 mã đã bổ sung trong storyboard.

### Kiểm tra của người chỉnh sửa và phần việc còn lại

- Đọc đề cương DOCX qua nội dung XML, đối chiếu Buổi 5 và nhãn đơn vị “Số giờ/buổi”; không suy số phút.
- Playwright chạy bản HTML thật tại cổng 8765, khung 1600×900 và 390×844; đi đủ 37 trang ở mỗi khung. Báo cáo `/tmp/lec05-implementation/render-edited/report.json`: không lỗi JavaScript, HTTP, tài nguyên, KaTeX hoặc ảnh hỏng; khung rộng không có phần tử tràn hay chạm chân trang. Đã xem riêng ảnh A04, D02, D07, D08, D11 và cả năm hình C.
- Khung hẹp có nội dung ngoài vùng nhìn ban đầu vì vùng đọc dài; đã kiểm `End` tới đáy tất cả trang có cuộn và `ArrowRight` cho mọi công thức/bảng rộng, không có lỗi cuộn bàn phím. Không tính ảnh đầu vùng là bằng chứng đọc hết. Phím End trên trang không có cuộn vẫn theo RevealJS.
- Đã sửa vị trí nhãn $\beta v_1$ để tránh vạch trục trên hình momentum sau xem ảnh; vị trí nhãn không đổi tọa độ toán. Cần kiểm lại hình này và mọi trang bị ảnh hưởng sau chuyển CSS chung.
- Đã đồng bộ `material-local-data.js` từ 13 Markdown bằng `sync-local-materials.py`; `--check` đạt. Kiểm tĩnh cấu trúc và `git diff --check` được thực hiện ở cuối lượt chỉnh sửa; kết quả ghi tại bàn giao kỹ thuật.

Dự án Codex Slides bền vững dùng trong giai đoạn dàn bài vẫn là `20260925161327-b-i-05-t-i-u-trong-hu-n-luy-n-m-ng-n-ron-k7xn`. Người chỉnh sửa không tự nhận đã đồng bộ hoặc kiểm thị giác cuối trong dự án sau các sửa này; điều phối viên còn phải xác minh nội dung/trạng thái bền vững và bề mặt hiển thị đúng phiên bản. Môi trường chưa có công cụ Browser gốc; Playwright cục bộ được ghi đúng là phép kiểm cục bộ, không thay tên thành kiểm bằng Browser gốc.

Cổng tiếp theo: tái kiểm toán (gồm materials), rà mạch toàn tuyến do thay mở bài, chuyển CSS chung theo yêu cầu người dùng, kiểm hiển thị/khả năng tiếp cận sau chuyển, đồng bộ Codex Slides và chỉ sau đó công bố/commit/push theo điều phối. Người chỉnh sửa đã giữ các phát hiện cần xác nhận ở trạng thái chờ; mọi kết luận đóng sau này cần thêm người rà và bằng chứng.


## Kiểm định cuối ngày 2026-09-26

### Tái kiểm độc lập và đóng phát hiện

- `/root/review_math` đã tái kiểm toàn bộ 37 trang, năm SVG hình học và mười lời giải: **đạt M01–M06, MM01–MM04, EX01–EX02**. Năm hình dùng cùng tỷ lệ 36 điểm SVG trên mỗi đơn vị của cả hai trục; gradient vuông góc đường mức, sai lệch tọa độ do làm tròn dưới 0.005 điểm SVG. Giả thiết đường phụ thuộc của mất mát, trung bình 0 và bước cố định đã đầy đủ. Không phát hiện hồi quy toán học.
- `/root/recheck_story` đã rà toàn tuyến, các trang sửa cùng lân cận và ranh giới các phần: **đạt SB01–SB03, ST01–ST04, AC01–AC04, SV02–SV03, EX03–EX05**. Đủ 37 mục storyboard và 37 đặc tả bố cục; tiêu đề, thứ tự, năm phần và bản đồ sáu bước khớp HTML.
- **SV01/K02 và K01 đã đóng sau kiểm trình duyệt cuối**: bảng D08 hiện đủ hai hàng và kết luận, không chạm chân trang; selector KaTeX có độ ưu tiên phù hợp. Không giảm thân bài dưới ngưỡng để xử lý tràn.
- Bằng chứng phiên làm việc: `/tmp/lec05-implementation/recheck-math.md`, `recheck-story.md`, `render-final/report.json`. Nội dung và kết luận cần truy nguyên đã được giữ trong nhật ký này; không phụ thuộc việc các tệp tạm còn tồn tại.

### Hồi quy CSS chung cho toàn bộ bộ trang chiếu phát hành

Theo yêu cầu mới của người dùng, tám bộ Bài 00–07 dùng duy nhất `2627-1/lecture-style.css` cho CSS tự viết. Đã bỏ hai tệp CSS riêng Bài 02/03, chuyển các khối style và 19 thuộc tính style tĩnh của Bài 04 thành lớp; dùng `data-lecture` trên `html` và `:where()` để giới hạn phạm vi mà giữ độ ưu tiên. CSS thư viện giữ nguyên. Không có JavaScript chèn CSS tĩnh. Nguyên tắc được ghi trong `AGENTS.md`.

Kiểm tĩnh xác nhận nội dung, công thức, ghi chú, thứ tự và mã trang của cả tám bộ không đổi do chuyển CSS. Bảy bộ ngoài Bài 05 có 354 trang; so trước–sau tại 1600×900 và 390×844 cho **0 thay đổi hình học, computed style hoặc nội dung**. Ảnh desktop giống hoàn toàn. Chế độ cuộn Reveal trên mobile tạo 30 quan sát lặp, nên đã kiểm 350 mã duy nhất trong lượt chính và bổ sung bốn trang cuối E06/K06/Z03/Z02 của Bài 00/01/06/07. Không tính bản sao lưu. Một ảnh M01 của Bài 01 khác thanh cuộn; ảnh bổ sung E06 khác hai pixel; đã xem ảnh sai khác và xác nhận không thuộc nội dung hay bố cục.

Cộng 37 trang Bài 05 tại hai kích thước, phạm vi kiểm là **391 trang × 2 = 782 cặp trang–kích thước**. Không tuyên bố các quan sát lặp là trang mới. Báo cáo kiến trúc và hồi quy được `/root/css_unification` tái kiểm độc lập; không còn yêu cầu sửa CSS.

### RevealJS, tài liệu và khả năng truy cập

- Máy chủ được mở từ gốc kho bằng `python3 -m reloadserver 8765`. Duyệt đủ 37 mã ngang/dọc tại 1600×900 và 390×844; không lỗi JavaScript, tải tài nguyên, KaTeX hay ảnh vỡ. Khung rộng không tràn, không chạm chân trang. Khung hẹp dùng vùng đọc cuộn; đã thử End tới cuối và ArrowRight cho mọi bảng/công thức rộng, không mất nội dung. Điều hướng xuống và sang phải tới đúng A02/B01.
- Đã xem ảnh tổng thể và ảnh riêng các trang dày A04, D02, D07, D08, D11 cùng năm hình bậc hai. Sai khác ảnh Bài 05 trước–sau CSS chỉ gồm trạng thái nút điều hướng/thanh tiến độ và nhãn momentum đã sửa theo duyệt; không thay bố cục nội dung.
- Ghi chú và bài tập mở được qua HTTP và `file://`, tại 1440×1000 và 390×844. Lần lượt 314 và 235 biểu thức KaTeX không lỗi; không tràn ngang trang hoặc ảnh hỏng. Mười lời giải đóng mặc định, mở bằng Enter; sự kiện trước in mở tất cả, sau in phục hồi trạng thái. Markdown nguồn và bản đóng gói đã đồng bộ; `sync-local-materials.py --check` xác nhận 13 tài liệu.
- Chỉ mục chỉ công bố bài giảng và hai tài liệu công khai thực sự tồn tại; đã đổi tiêu đề/mô tả Bài 05 đúng phạm vi hiện tại, bỏ He khỏi mô tả. Không đưa tài liệu planning lên chỉ mục. Kiểm luồng chỉ mục → bài tập đạt ở cả bốn cấu hình HTTP/file:// và rộng/hẹp: ba liên kết tải được, Tab/Enter mở đúng bài tập với mười lời giải đóng mặc định, không lỗi JavaScript.

### Codex Slides và giới hạn bề mặt kiểm định

Dự án bền vững: `20260925161327-b-i-05-t-i-u-trong-hu-n-luy-n-m-ng-n-ron-k7xn`. Dàn bài giữ 37 trang, cập nhật tiêu đề D11; mỗi hình được tải từ ảnh kết xuất RevealJS cuối, không gọi mô hình tạo ảnh. Có đủ 37 trạng thái rendered và 37 ghi chú. Đã mở lần lượt từng trang trên canvas; SHA-256 của ảnh được máy chủ trả về khớp ảnh RevealJS tương ứng ở cả 37 trang, ghi chú hiện đúng ở cả 37 trang, không lỗi JavaScript. Dự án đã chuyển đúng sang giai đoạn deck và vùng canvas sau khi phát hiện giao diện còn ở giai đoạn dàn bài dù hình đã lưu; dùng API cập nhật dự án xác định, không gọi tác tử hoặc mô hình khác. Các tệp thiết kế hiện hành được đồng bộ để giữ nguồn biên tập cùng dự án.

Browser tích hợp trong Codex không có công cụ khả dụng trong phiên này. Kiểm giao diện Codex Slides được thực hiện bằng Chromium cục bộ qua Playwright; không tuyên bố đã kiểm trong Browser tích hợp. Sản phẩm chính vẫn là HTML RevealJS và tài sản trong kho. Không tải nguồn MIT mới, không dùng raster hay ảnh sinh bằng AI; nguồn chính và thay đổi có chủ ý đã được ghi ở các mục trên. Toàn bộ tác tử thực hiện lượt triển khai này là GPT-6-Astra qua cơ chế subscription; không đọc `.env`, không gọi OpenRouter.
