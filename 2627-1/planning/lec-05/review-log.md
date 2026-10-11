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

## Lượt duyệt từng trang ngày 2026-10-01

Yêu cầu người dùng: duyệt lần lượt từng trang, xác định trang muốn nói gì, đề xuất rồi sửa để tiêu đề ngắn gọn, học thuật, mạch lập luận chặt chẽ và khái niệm không xuất hiện đột ngột; sau mỗi trang sửa phần ghi chú bài giảng tương ứng, rồi commit và push. Điều phối viên là phiên Claude Code chính, chạy Claude Opus 5.5 (`claude-opus-5-5`), đồng thời giữ vai biên tập cho các sửa một trang. Sau mỗi phần, hai tác tử `fork` chỉ đọc (kế thừa Opus 5.5) tái kiểm toán học và mạch lập luận trên các trang đã sửa; kết quả ghi ở cuối mỗi phần. Văn bản được tự kiểm theo `no-ai-slop` (`eval.md`). Mỗi trang sửa được kiểm bằng Playwright Chromium tại 1600×900 và 390×844 (kể cả cuộn tới cuối vùng đọc hẹp) qua `python3 -m reloadserver 8765`.

### Phần A

- **A01 — giữ.** Trang định vị đúng học phần, số bài, chủ đề và đơn vị; không có thay đổi.
- **A02 — sửa.** Trang thiếu vấn đề trung tâm mà bản đồ nội dung phải có; khung cũ chỉ liệt kê kết quả bằng cụm danh từ. Khung mới nêu ba quyết định (cực tiểu đại lượng nào, dùng gradient thế nào, bắt đầu từ tham số nào); ghi chú ánh xạ ba quyết định vào A–E. Mục E đổi thành “Phối hợp các thành phần của quy trình huấn luyện” cho đúng chức năng của E01–E03 và khớp tiêu đề phần E trong ghi chú bài giảng; outline và storyboard cập nhật theo. Ghi chú bài giảng: đoạn mở đầu nêu cùng ba quyết định và ánh xạ phần.
- **A03 — sửa.** Trang tính $J(1)=4/3$ nhưng không nói vì sao xét $\theta=1$. Mặt trang nay ghi dạng chính tắc $J(\theta)=\tfrac12(\theta-1)^2+\tfrac43$, nghiệm $\theta^*=1$ (trung bình mẫu) và $J(\theta^*)=4/3>0$. Tiêu đề rút thành “Bài toán huấn luyện”. Ghi chú diễn giả nêu phép khai triển và việc cực tiểu trung bình không làm từng mất mát bằng 0. Ghi chú bài giảng: đổi tiêu đề mục, nêu “mất mát bình phương” và nghiệm là trung bình mẫu.
- **A04 — sửa.** Trang mở bằng ký hiệu trước khi có lý do cần $R$, nên rủi ro kỳ vọng xuất hiện đột ngột. Mặt trang nay theo thứ tự nhu cầu (mô hình dùng cho quan sát mới; dữ liệu huấn luyện chỉ là mẫu) → sơ đồ $P\to D$/quan sát mới → ký hiệu → hai định nghĩa. Ký hiệu gộp thành một đoạn để giữ chiều cao; ghi chú diễn giả nêu thuật ngữ tiếng Anh “expected risk” và nối với ba quan sát mở đầu. Ghi chú bài giảng thêm đoạn nhu cầu trước định nghĩa.
- **A05 — sửa.** Trang thiếu mắt xích từ A04 (vì sao cần dữ liệu tách riêng), nên “tập xác thực” xuất hiện đột ngột; tiêu đề chung chung. Tiêu đề mới “Tập xác thực và tập kiểm thử”. Câu mở nêu $P$ chưa biết nên phải ước lượng $R$ trên dữ liệu không dùng để cập nhật; thêm dòng đọc bảng. Ghi chú diễn giả nêu ước lượng không chệch tại $\theta$ cố định, độ lệch lạc quan sau khi chọn và lý do giữ tập kiểm thử; câu mất mát thay thế giữ trong ghi chú. Ghi chú bài giảng thêm mục cùng tên với lập luận này.
- **A06 — sửa.** Trang thiếu nhu cầu: không nhắc rằng với hàm lồi điểm dừng là cực tiểu toàn cục, nên chưa rõ vì sao cần xét yên ngựa. Khung cuối khẳng định “nhiều bộ tham số biểu diễn cùng một hàm” mà trang không có ví dụ đỡ. Tiêu đề mới “Điểm dừng của hàm không lồi”; câu mở nối với Bài 04; khung chỉ giữ hai kết luận do $s$ và $r$ chứng minh, ý hoán đổi đơn vị ẩn giữ trong ghi chú và được D03 giải thích. Thuật ngữ tiếng Anh ở lần đầu đặt trong ghi chú. Ghi chú bài giảng đổi tiêu đề mục và thêm đoạn nhu cầu.
- **A07 — sửa.** Hai yêu cầu viết dạng cụm danh từ, không nêu thao tác; tiêu đề không nói kỹ năng được kiểm. Tiêu đề mới “Chọn thời điểm lưu và phân loại điểm dừng”; yêu cầu dùng động từ học tập. Ghi chú nêu lỗi xác thực là tỷ lệ dự đoán sai, khác mất mát khả vi, để cột “Lỗi xác thực” không xuất hiện đột ngột sau A05. Ghi chú bài giảng: câu hỏi cuối phần A bổ sung yêu cầu phân loại điểm dừng.

### Phần B

- **B01 — sửa.** Chi phí của $\nabla J$ chưa thành nhu cầu vì trang không nhắc rằng hạ gradient của Bài 04 cần nó ở mọi bước; $C$ được định nghĩa sau bảng đã dùng nó. Câu mở nay nêu phép lặp hạ gradient; $C$ đứng trước bảng; câu rào đón về thời gian phần cứng vào ghi chú; thuật ngữ “nhóm nhỏ (minibatch)” nêu trong ghi chú. Hộp sơ đồ $g_1,\ldots,g_N\to\nabla J$ bị bỏ vì lặp công thức và làm hàng cuối của bảng chạm chân trang ở 1600×900. Ghi chú bài giảng thêm câu nhu cầu và thuật ngữ.
- **Tái kiểm phần A.** Hai tác tử `fork` chỉ đọc (kế thừa Claude Opus 5.5 từ phiên điều phối), tại commit `195acfd`: tái kiểm toán học **PASS** (1 trung bình, 4 nhẹ); tái kiểm mạch lập luận **PASS có điều kiện** (2 trung bình, 4 nhẹ). Đã xử lý:
  - trung bình | A05 | ước lượng không chệch thiếu giả thiết quan sát xác thực có phân phối $P$; “xu hướng thấp hơn” chưa nói theo kỳ vọng → ghi chú diễn giả và ghi chú bài giảng nêu giả thiết và bất đẳng thức $\mathbb E\min_k\widehat R_k\le\min_kR(\theta_k)\le R(\theta_{\hat k})$. **Đã đóng.**
  - trung bình | storyboard | bảng bố cục thực tế mô tả bố cục cũ của A02–A06, B01 → cập nhật các dòng tương ứng. **Đã đóng.**
  - trung bình | A05→A06 | thiếu câu nối vì sao xét điểm dừng sau tiêu chí xác thực → ghi chú A06 và ghi chú bài giảng nêu tiêu chí dừng theo chuẩn gradient của Bài 04 và lý do chuyển sang xác thực. **Đã đóng.**
  - nhẹ | A06 | thiếu cực đại địa phương trong danh sách điểm dừng → bổ sung. **Đã đóng.**
  - nhẹ | A07 | “lỗi xác thực” giả định phân loại → ghi “trong bài toán phân loại”. **Đã đóng.**
  - nhẹ | A04 | $d,p\ge1$ chưa nói là số nguyên → $d,p\in\mathbb N_{>0}$. **Đã đóng.**
  - nhẹ | A03, A02 (ghi chú) | hai câu trừu tượng theo no-ai-slop → viết lại cụ thể. **Đã đóng.**
  - nhẹ | A05 | “thời điểm” chưa giải nghĩa → ghi chú: số bước cập nhật đã thực hiện. **Đã đóng.**
  - nhẹ | B01 | thiếu kết quả kế thừa → đã xử lý ở commit sửa B01. **Đã đóng.**
  - nhẹ | B02 | lặp dạng chính tắc của $J$ với A03 → xử lý khi duyệt B02.
- **B02 — sửa.** Trang không nối với nhóm nhỏ ở B01 và lặp dạng chính tắc của $J$ đã có ở A03 (phát hiện nhẹ của tái kiểm mạch lập luận). Câu mở nay nêu nhóm nhỏ chỉ dùng một phần các $g_i$; dòng trung bình viết thành $J'(1)=\bar g=0$; bỏ dòng công thức cuối (vốn chạm chân trang sau khi thêm câu mở). Ghi chú diễn giả và ghi chú bài giảng nêu hệ quả: nhóm chỉ chứa mẫu $-1$ dịch tham số dù nghiệm đã đạt. **Phát hiện nhẹ B02 của tái kiểm phần A đã đóng.**
- **B03 — sửa.** Trang mở thẳng vào giả thiết, không nối câu hỏi B02 để lại; kết quả không có nhãn; $8/(3b)$ xuất hiện không có phép tính $\Sigma$. Thêm câu trực quan về lấy chỉ số đều, nhãn **Mệnh đề**, dòng ví dụ ghi $\Sigma=\tfrac13(2^2+0^2+2^2)=\tfrac83$. Ghi chú diễn giả nối với B02 và nêu “không chệch (unbiased)”. Ở khung hẹp, dòng $\widehat g,\Sigma$ vẫn cuộn ngang bằng bàn phím như bản trước. Ghi chú bài giảng thêm đoạn trực quan và phép tính $\Sigma$.
- **B04 — sửa nhỏ.** Phản ví dụ rõ, tiêu đề đúng khái niệm; giữ bố cục. $\eta$ được dùng từ B01 nhưng chưa được gọi tên: mặt trang ghi “bước học $\eta=0.1$”, ghi chú diễn giả và ghi chú bài giảng nêu “bước học (learning rate)”.
- **B05 — sửa.** Khối theo dõi đưa bộ đếm chờ, $K_{\rm stop}$, $\delta$ vào mà không gọi tên khái niệm và không nêu lý do; dòng đầu vào chỉ là chuỗi ký hiệu. Đầu vào nay ghi tên từng ký hiệu; khối đổi thành “Dừng sớm theo xác thực”, câu đầu nêu lý do từ B04 (một bước có thể làm $J$ tăng). Ghi chú diễn giả nêu “dừng sớm (early stopping)” và hai kết quả được kết hợp. Ghi chú bài giảng đổi tiêu đề mục thành “Thuật toán SGD và dừng sớm” và thêm lý do.
- **B06 — sửa.** Sai số chuẩn được định nghĩa sau bảng đã dùng nó; trang không nêu kết quả kế thừa từ B03; tiêu đề không nói quan hệ được trình bày. Tiêu đề mới “Cỡ nhóm và sai số chuẩn”; câu mở kế thừa $\operatorname{Cov}=\Sigma/b$ và định nghĩa sai số chuẩn; khối kết luận nêu đánh đổi cụ thể (chi phí ×4, sai số chuẩn ÷2). Câu về bộ nhớ và xử lý song song chỉ còn trong ghi chú. Ghi chú bài giảng thêm câu kế thừa và đổi tiêu đề mục.
- **B07 — sửa nhỏ.** Tiêu đề và phép tính giữ nguyên. Thiếu câu nối từ B06 nên chưa rõ vì sao xét bước học sau cỡ nhóm; câu mở nay nêu tăng $b$ tốn chi phí, còn giảm $\eta_t$ thu nhỏ bước ngẫu nhiên mà không tốn thêm. Ghi chú diễn giả và ghi chú bài giảng nêu “lịch bước học (learning-rate schedule)”.
- **B08 — sửa.** Yêu cầu viết dạng cụm danh từ; câu nối cuối ghi chú hướng tới “phương pháp có trạng thái” trong khi C01 mở bằng độ cong với gradient đầy đủ. Yêu cầu nay dùng “Tính… Nêu…”; câu nối nêu giới hạn tiếp theo: độ cong khác nhau theo các hướng làm hạ gradient chậm hoặc vượt nghiệm ngay cả khi không có nhiễu. Ghi chú bài giảng viết lại câu hỏi cuối phần B theo cùng yêu cầu.

### Phần C

- **C01 — sửa.** Câu gác nhiễu lấy mẫu chỉ có trong ghi chú; kết luận “gradient kết hợp độ lệch và độ cong” trừu tượng; tiêu đề chỉ nêu đối tượng. Tiêu đề mới “Hướng gradient trên hàm bậc hai”; câu mở nêu ranh giới B→C (gradient đầy đủ, hướng vẫn phụ thuộc độ cong); khối kết luận so $-g_0\propto(3,14)^T$ với hướng về cực tiểu $-\theta_0\propto(1,2)^T$. Đồng thời đóng phát hiện nhẹ “ranh giới B08→C01 chỉ nằm trong ghi chú” của tái kiểm mạch phần B. Ghi chú bài giảng đổi tiêu đề mục và thêm phép so hướng.
- **Tái kiểm phần B.** Hai tác tử `fork` chỉ đọc (kế thừa Claude Opus 5.5), tại commit `3cbf708`: tái kiểm toán học **PASS** (1 trung bình, 4 nhẹ); tái kiểm mạch lập luận **PASS có điều kiện** (2 trung bình, 5 nhẹ). Đã xử lý:
  - trung bình | B05 | lý do trên mặt trang chỉ biện minh việc lưu bản tốt nhất, chưa biện minh dùng xác thực → “Một bước có thể làm $J$ tăng và $J$ khác $R$…”. **Đã đóng.**
  - trung bình | B08 (outline) | trường Kết nối cũ mâu thuẫn câu nối mới → sửa theo độ cong với gradient đầy đủ. **Đã đóng.**
  - trung bình | storyboard B07 | bảng bố cục chưa ghi câu nối → cập nhật. **Đã đóng.**
  - nhẹ | B03 | phép tính $\Sigma$ bỏ dấu của $g_3$ → $\tfrac13\big(2^2+0^2+(-2)^2\big)$, ghi chú bài giảng nêu $\bar g=0$. **Đã đóng.**
  - nhẹ | B07 | “không tốn thêm” dễ hiểu là không có giá; công thức thiếu $D$ trong điều kiện → “không thêm phép tính”, $\operatorname{Var}(\theta_{t+1}\mid D,\theta_t=1)$; câu mở thêm “cách”. **Đã đóng.**
  - nhẹ | B05 | “Dừng khi đạt $K_{\rm stop}$” thiếu chủ ngữ → “khi bộ đếm đạt”. **Đã đóng.**
  - nhẹ | B06 | chưa nối $b$ là đầu vào thuật toán B05 → thêm vào ghi chú. **Đã đóng.**
  - nhẹ | B08 (ghi chú) | mẫu dấu hai chấm tiết lộ (no-ai-slop) → viết thành câu thường. **Đã đóng.**
  - nhẹ | B08→C01 | ranh giới chỉ nằm trong ghi chú → đã xử lý ở commit sửa C01. **Đã đóng.**
- **C02 — sửa.** Đẳng thức Taylor ở cuối là luận điểm thứ hai không được dùng trên mặt trang; trang không nêu hệ quả dẫn sang C03, nên việc đổi sang $\eta=1/20$ ở C03 trông tùy ý. Tiêu đề mới “Độ cong và bước học”; Taylor chuyển vào ghi chú; khối kết luận nêu bước học bị chặn bởi độ cong lớn, và với $\eta=1/20$ hai hệ số $0.85$, $0.65$ (không vượt trục, hướng cong nhỏ co chậm). Ghi chú diễn giả và ghi chú bài giảng thêm $0.85^{10}\approx0.20$ và căn cứ cho việc tích lũy hướng.
- **C03 — sửa.** $v$ và $\beta$ xuất hiện trong dòng “Cấu hình mới” mà chưa được giải nghĩa; ý tưởng tích lũy chỉ lộ ra qua phép tính. Thêm câu **Trực quan** ($v_t$ là bước dịch chuyển, giữ phần $\beta$ của bước cũ, cộng bước âm gradient mới); dòng cấu hình nay dẫn lại $\eta=1/20$ do C02 chuẩn bị. Ghi chú diễn giả nêu hai thành phần cùng dấu được cộng thêm. Ghi chú bài giảng thêm đoạn ý tưởng trước phép tính.
- **C04 — giữ mặt trang, sửa ghi chú.** Trang có đủ đầu vào, điều kiện, thứ tự cập nhật, dạng tổng, chi phí trạng thái và quy tắc dừng; tiêu đề đúng tên phương pháp. Ghi chú diễn giả gọi $v$ là “vận tốc”, còn mặt trang C03 gọi “bước dịch chuyển”; ghi chú diễn giả và ghi chú bài giảng nay nêu hai tên là một, kèm thuật ngữ “velocity”. Mặt trang không đổi nên không cần kiểm trực quan lại.
- **C05 — sửa.** Tiêu đề “Quỹ đạo…” không cho biết trang là phép đối chứng; dòng gradient hằng chưa nói ý nghĩa. Tiêu đề mới “Đối chứng momentum với hạ gradient”; dòng cuối thêm giới hạn $-\eta g/(1-\beta)$, tức bước hiệu dụng $2\eta$ khi $\beta=1/2$. Ghi chú diễn giả và ghi chú bài giảng cập nhật tương ứng.
- **C06 — sửa.** Thiếu nhu cầu trên mặt trang nên điểm $\theta+\beta v$ xuất hiện như một lựa chọn tùy ý; tiêu đề chưa gọi tên khái niệm. Tiêu đề mới “Gradient tại điểm dự báo”; câu mở nêu momentum luôn dịch thêm $\beta v_t$ nên gradient tại $\theta_t+\beta v_t$ đo độ dốc ở nơi tham số sắp tới; dòng $v_2$ ghi rõ quy tắc $\beta v_1-\eta\nabla q(\widetilde\theta_1)$. Ở khung hẹp, dòng này cuộn ngang bằng bàn phím như các công thức rộng khác. Ghi chú diễn giả và ghi chú bài giảng nêu “điểm dự báo (look-ahead point)” và lập luận nhu cầu.
- **C07 — sửa nhỏ.** Trang đủ đầu vào, điểm đo, trình tự, chi phí và quy tắc dừng; tiêu đề đạt. Chi tiết dễ nhầm nhất (cộng $v_{t+1}$ vào $\theta_t$ chứ không vào $\widetilde\theta_t$) chỉ có trong ghi chú; nay thành bước 3 trên mặt trang. Ghi chú bài giảng đã nêu ý này, không cần sửa.
- **C08 — sửa.** Yêu cầu cuối là cụm danh từ; câu nối sang D trong ghi chú chung chung. Tiêu đề mới “Momentum và Nesterov từ cùng trạng thái”; yêu cầu viết “Tính… Nêu…”; câu nối nêu cả hai quy tắc bắt đầu từ $\theta_0$, còn việc chọn $\theta_0$ cho mạng phụ thuộc cách gradient truyền qua cấu trúc mạng. Ghi chú bài giảng viết lại câu hỏi cuối phần C cho đủ dữ kiện và yêu cầu.
  - Bổ sung C08: ở khung hẹp, dòng dữ kiện cũ che $\eta,\beta$ sau thanh cuộn; dữ kiện tách thành hai công thức ngắn, $\eta,\beta$ chuyển vào câu yêu cầu. Khung rộng không chạm chân trang.

### Phần D

- **D01 — sửa.** Trang mở thẳng bằng hình mạng; nhu cầu chọn $\theta_0$ chỉ có trong ghi chú C08 (cũng được tái kiểm mạch phần C nêu). $z_j,h_j$ chưa có tên dù các trang sau dùng “tiền kích hoạt”. Câu mở nay nêu mọi quy tắc cập nhật bắt đầu từ $\theta_0$ và việc chọn $\theta_0$ cần biết gradient truyền qua mạng; mặt trang gọi tên tiền kích hoạt, kích hoạt, ReLU và truyền xuôi. Ghi chú diễn giả và ghi chú bài giảng thêm lập luận nhu cầu cùng thuật ngữ tiếng Anh ở lần đầu.
- **Tái kiểm phần C.** Hai tác tử `fork` chỉ đọc (kế thừa Claude Opus 5.5), tại commit `d614663`: tái kiểm toán học **PASS** (4 nhẹ; mọi số liệu C01–C08 tính lại khớp); tái kiểm mạch lập luận **PASS có điều kiện** (1 trung bình, 6 nhẹ). Đã xử lý:
  - trung bình | storyboard KN3a | bản đồ hành trình còn ghi $\eta=1/20$ công bố từ C03 → sửa theo C02 giới thiệu, C03 thêm $\beta$. **Đã đóng.**
  - nhẹ | C02 | chưa gọi tên $\theta^+$ là bước hạ gradient → “Bước hạ gradient trên $q$: $\theta^+=\theta-\eta H\theta=(I_2-\eta H)\theta$”. **Đã đóng.**
  - nhẹ | C03 | chỉ số mơ hồ → “Bước mới $v_{t+1}$ giữ phần $\beta$ của bước cũ $v_t$”; ghi chú bỏ câu lặp ý. **Đã đóng.**
  - nhẹ | C05 | “bước hiệu dụng” chưa định nghĩa → “hệ số của $-g$ tiến tới $\eta/(1-\beta)=2\eta$” trên mặt trang, ghi chú bài giảng, outline, storyboard. **Đã đóng.**
  - nhẹ | C06 | “nơi tham số sắp tới” bỏ qua hiệu chỉnh → “nơi tham số tới trước khi hiệu chỉnh”. **Đã đóng.**
  - nhẹ | C08 (ghi chú) | “bắt đầu từ θ₀ và v₀=0” lẫn với đề có $v\ne0$ → “Khi chạy từ đầu, cả hai quy tắc cần θ₀ và v₀=0”. **Đã đóng.**
  - nhẹ | ghi chú bài giảng C02 | mẫu dấu hai chấm tiết lộ → dấu chấm phẩy. **Đã đóng.**
  - nhẹ | storyboard bố cục C07 | thêm bước 3. **Đã đóng.**
  - ngoài phạm vi | D01 | thiếu nhu cầu chọn $\theta_0$ trên mặt trang → đã xử lý ở commit sửa D01. **Đã đóng.**
- **D02 — sửa nhỏ.** $e$ xuất hiện không có tên; ý chính “tích các đạo hàm cục bộ dọc đường đi” chỉ hiện qua sơ đồ cuối. Dòng đầu gọi $e$ là sai số dự đoán; tiêu đề cột quy tắc thành “Tích đạo hàm cục bộ, tại điểm khả vi”; ghi chú diễn giả và ghi chú bài giảng mở bằng nhu cầu gradient theo sáu tham số. Không thêm dòng vì trang đã gần chân trang ở 1600×900.
- **D03 — sửa.** Trang chưa nêu hệ quả của đối xứng nên chưa có lý do phải phá nó; khối bất biến là mệnh đề nhưng không có nhãn; câu hoán vị không có nhãn. Câu mở nối với D02; khối đổi thành **Mệnh đề** kèm hệ quả “mạng chỉ dùng được một đơn vị”; câu hoán vị mang nhãn **Nhận xét**. Ghi chú diễn giả và ghi chú bài giảng nêu $f_\theta=(a_1+a_2)h$.
- **D04 — sửa.** Bước nhảy từ hai giá trị chọn tay sang “phân phối liên tục” chưa có lý do. Tiêu đề mới “Phá đối xứng bằng khởi tạo ngẫu nhiên”; dòng cuối mang nhãn **Quy tắc** và nêu trọng số khác nhau với xác suất 1; khối kết luận thêm hệ quả hai đơn vị tách nhau sau một bước. Ghi chú diễn giả và ghi chú bài giảng nêu lý do xác suất; ghi chú bài giảng đổi tiêu đề mục và bỏ một dấu hai chấm tiết lộ ở đoạn D03.
- **D05 — sửa.** Thiếu câu nối từ D04, nên việc chuyển sang chuỗi tuyến tính đột ngột. Câu mở nay nêu phá đối xứng chưa xác định độ lớn trọng số, và độ lớn quyết định các thừa số trong tích dây chuyền; định nghĩa mô hình gộp một dòng để giữ chiều cao; kết luận viết định lượng ($c^L$, cấp số mũ theo độ sâu). Ghi chú bài giảng thêm câu nối và kết luận tương ứng.
- **D06 — sửa.** Trang chuyển từ ReLU sang tanh không lý do (“Một hàm kích hoạt khác”), mối nối với D05 chỉ có trong ghi chú. Câu mở nay nêu tăng trọng số để tránh co làm tiền kích hoạt lớn, và với hàm bão hòa $\phi'$ khi đó rất nhỏ; tanh được giới thiệu là ví dụ hàm bão hòa. Khối cũ lặp ý câu mở nên bị bỏ (đã làm trang tràn); khối kết luận mới là vùng gần tuyến tính, đầu ra cho D07. Ghi chú bài giảng thêm câu nối.
- **D07 — sửa.** Chưa nói vì sao chuyển từ hệ số $c_l$ sang phương sai; kết luận không có nhãn. Câu mở nay nêu với trọng số ngẫu nhiên độ lớn tín hiệu đo bằng phương sai; ví dụ $n_{\rm in}=4$ gộp một dòng và đứng trước nhãn **Mệnh đề**, đúng thứ tự ví dụ → tổng quát của storyboard; công thức cuối giữ vai phép suy. Chiều cao trang không đổi so với bản trước. Ghi chú diễn giả và ghi chú bài giảng thêm lý do dùng phương sai.
- **D08 — sửa.** Trang chưa nói vì sao cần xét chiều lùi sau khi đã giữ phương sai chiều tiến; kết luận dùng dấu hai chấm tiết lộ và không nêu điều kiện. Dòng mở (giữ hai dòng) nêu cập nhật dùng gradient truyền ngược qua lớp; kết luận “Khi $n_{\rm in}\ne n_{\rm out}$, không có $s^2$ giữ đồng thời hai phương sai”. Ghi chú diễn giả và ghi chú bài giảng nêu backpropagation và hệ quả với độ lớn bước ở các lớp đầu. Chiều cao trang không đổi.
- **D09 — sửa.** $U[-a,a]$ và phương sai $a^2/3$ được định nghĩa ở dòng cuối, sau khi đã dùng để suy ra $a$. Định nghĩa nay đứng trước phép suy $a=\sqrt{3s^2}=\sqrt{6/(n_{\rm in}+n_{\rm out})}$, tách thành dòng riêng để không bị cắt ở khung hẹp; dòng định nghĩa cuối trang bị bỏ. Ghi chú diễn giả và ghi chú bài giảng nêu tên gọi khác là khởi tạo Xavier.
- **D10 — sửa.** Giả thiết độc lập giữa các lớp đứng sau bảng dù công thức lặp đã dùng nó; chú thích chỉ là lời rào đón, không nêu kết luận. Khối giả thiết chuyển lên trước công thức; chú thích nêu kết luận đọc từ bảng ($s^2=1/16$ co bốn lần mỗi lớp, $s^2=1/4$ giữ nguyên) và giữ ý “tính theo mô hình”. Ghi chú bài giảng thêm câu nối với chuỗi vô hướng $c_l=1/2$.
- **D11 — sửa.** Hai yêu cầu viết dạng cụm danh từ (“Hai đạo hàm…; tác động của…”, “Glorot: $s^2$, biên $a$…”). Nay dùng “Tính… Giải thích… Nêu…”; tiêu đề và dữ kiện giữ nguyên. Ghi chú diễn giả nối hai tiểu bài toán với hai yêu cầu của điểm khởi đầu. Ghi chú bài giảng viết lại câu hỏi cuối phần D, thêm yêu cầu giới hạn với ReLU.

### Phần E

- **E01 — sửa.** Trang tổng hợp không quay lại vấn đề trung tâm nêu ở A02; khối dưới lặp sơ đồ vận hành. Tiêu đề rút thành “Quy trình huấn luyện”; mỗi quyết định ghi phần xây dựng nó (A–D, nhãn phần được phép); khối dưới nêu bốn quyết định trả lời ba câu hỏi mở đầu; câu vòng lặp chuyển vào ghi chú. Ghi chú bài giảng cập nhật bảng và câu dẫn.
- **Tái kiểm phần D.** Hai tác tử `fork` chỉ đọc (kế thừa Claude Opus 5.5), tại commit `e17d104`: tái kiểm toán học **PASS** (4 nhẹ; mọi số liệu D01–D11 tính lại khớp); tái kiểm mạch lập luận **PASS có điều kiện** (1 trung bình, 6 nhẹ). Đã xử lý:
  - trung bình | storyboard bố cục D02–D05, D08, D11 | mô tả bố cục cũ → cập nhật sáu dòng. **Đã đóng.**
  - nhẹ | D03 | hệ quả viết lỏng → “mạng tương đương một đơn vị”, ghi chú nêu trọng số ra $a_1+a_2$; ghi chú bài giảng sửa theo. **Đã đóng.**
  - nhẹ | D04 | “hai đơn vị tách nhau” không chính xác vì $w_1\ne w_2$ từ đầu → “sau một bước hai trọng số ra cũng khác nhau”. **Đã đóng.**
  - nhẹ | D05 | thiếu điều kiện $|c|\ne1$ → bổ sung trên mặt trang và ghi chú bài giảng. **Đã đóng.**
  - nhẹ | D06, D07 | câu mở khó tách vế → viết lại thành quan hệ điều kiện và hai mệnh đề. **Đã đóng.**
  - nhẹ | D09 | quy tắc Glorot không có nhãn, chưa nhắc xung đột từ D08 → “**Quy tắc.** Thỏa hiệp giữa $1/n_{\rm in}$ và $1/n_{\rm out}$…”. **Đã đóng.**
  - nhẹ | D11→E01 | ranh giới D→E nằm giữa ghi chú D11 → câu nối chuyển xuống cuối ghi chú, nêu điểm khởi đầu hoàn tất các thành phần của quy trình; E01 đã gắn quyết định với phần A–D. **Đã đóng.**
  - nhẹ | E01 (ghi chú) | câu kết chung chung theo no-ai-slop → bỏ. **Đã đóng.**
- **E02 — sửa.** Tiêu đề và dữ kiện đạt; bốn yêu cầu viết dạng cụm danh từ (“Lựa chọn cách tính gradient; vấn đề khởi tạo…”, “Điểm tính gradient Nesterov”). Nay dùng “Chọn… nêu căn cứ”, “Xác định… đề xuất cách sửa”, “Xác định bản lưu”, “Tính điểm đánh giá gradient Nesterov”. Ghi chú bài giảng thêm câu dẫn liệt kê bốn nhiệm vụ trước ví dụ.
- **E03 — sửa.** Bảng kết luận liệt kê kỹ năng theo chủ đề, không trả lời vấn đề trung tâm và không nêu điều kiện sử dụng (ba giới hạn chỉ có trong ghi chú). Bảng nay có ba hàng theo ba câu hỏi của A02, mỗi hàng gồm kết quả và giới hạn. Ở khung hẹp, bảng cuộn ngang bằng bàn phím như các bảng khác. Ghi chú bài giảng thêm đoạn kết luận theo ba câu hỏi.
- **Tái kiểm phần E và toàn bài.** Hai tác tử `fork` chỉ đọc (kế thừa Claude Opus 5.5), tại commit `dce31aa`: tái kiểm toán học E **PASS** (1 trung bình, 5 nhẹ); tái kiểm mạch toàn bài (bắt buộc vì mở bài và kết luận đổi) **PASS có điều kiện** (1 trung bình, 5 nhẹ). Toàn bài: 37 mã duy nhất, 37 ghi chú, 5 section ngoài; tiêu đề và thứ tự khớp storyboard, bảng bố cục và outline; không có mã trang, thời lượng hay lời điều phối trong ghi chú. Đã xử lý:
  - trung bình | ghi chú bài giảng E | “thang Glorot giữ phương sai” mâu thuẫn hệ số $4/3$, $2/3$ ở D09 → “dung hòa phương sai chiều tiến và chiều lùi”. **Đã đóng.**
  - trung bình | storyboard | vấn đề trung tâm chưa theo khung ba quyết định của A02 → viết lại, nêu A→(1), B/C→(2), D→(3), E phối hợp. **Đã đóng.**
  - nhẹ | E03 | “phương sai $\Sigma/b$” thiếu điều kiện và sai tên → “hiệp phương sai $\Sigma/b$ (lấy đều, độc lập)”; ghi chú bài giảng nêu điều kiện và “ba quy tắc này không tự bảo đảm”. **Đã đóng.**
  - nhẹ | E01 | lựa chọn kết quả cũng xây ở B05 → “(A, B)”; câu hỏi “cực tiểu gì” gắn vào sơ đồ “Dữ liệu, mất mát $J$ (A)”; outline E01 sửa thành bốn quyết định. **Đã đóng.**
  - nhẹ | E01→E02→E03 | thiếu câu nối trong ghi chú → thêm hai câu nối. **Đã đóng.**
  - nhẹ | E03, ghi chú bài giảng E | câu bình luận cách đọc (no-ai-slop) → bỏ. **Đã đóng.**
  - nhẹ | A02/E01/E03 | hai cách gọi câu hỏi thứ ba → thống nhất “bắt đầu từ đâu ($\theta_0$)” trên A02 và ghi chú bài giảng. **Đã đóng.**
  - nhẹ | storyboard | hai câu trạng thái cũ → cập nhật. **Đã đóng.**
- **Kiểm trình duyệt toàn bài.** Playwright Chromium qua `python3 -m reloadserver 8765`, đủ 37 trang tại 1600×900 và 390×844 (cuộn tới cuối vùng đọc hẹp): không lỗi JavaScript hoặc trang, không `.katex-error`, không tràn ngang tài liệu, cỡ chữ thân bài nhỏ nhất 0.9em; ArrowRight điều hướng đúng. Ở 1600×900, nội dung mạch B–E không chạm mép trên chân trang. Chân trang bị ẩn (`display:none`) khi đang ở mạch A; hiện tượng có từ trước lượt sửa này và không gây chồng lấn, nên không sửa CSS dùng chung. A05 được rút một dòng (gộp chú thích số liệu giả lập vào dòng đọc bảng) để đáy nội dung thấp hơn mép khung.

## 2026-10-09 — Bổ sung ghi chú diễn giả cho sinh viên tự đọc

Người dùng phản ánh sinh viên thấy trang chiếu thiếu dẫn dắt, thiếu ngữ cảnh, thông tin bị cắt cụt, và yêu cầu bổ sung ghi chú diễn giả (phím S) cho mọi trang của Bài 01–07. Phạm vi lượt này: nội dung bên trong `<aside class="notes">` của 37 trang, cộng một sửa mặt trang được điều phối viên cho phép riêng (C01, hai dấu trừ). Cấu trúc section, `data-slide-id`, storyboard và dàn ý không đổi. Mỗi ghi chú viết lại theo bốn phần: dẫn dắt, diễn giải đủ ký hiệu, công thức, hình, bảng và lời giải câu hỏi, điểm dễ nhầm, kết nối trang sau bằng quan hệ suy luận. Độ dài sau sửa: 142–334 tiếng, trung vị 244.

### Tác tử và quyết định của điều phối viên

Điều phối viên: Claude Fable 5.1 (`claude-fable-5-1`, effort medium). Tác tử con tạo bằng Agent tool, `subagent_type=general-purpose`, `model=opus` (Claude Opus 5.5), `effort=high`; chỉ một tác tử ghi tệp tại một thời điểm.

| Vai | Ghi tệp | Kết quả | Quyết định |
|---|---|---|---|
| Soạn ghi chú (37 trang) | Có, chỉ aside.notes | Đủ 37 ghi chú; bỏ câu sai của ghi chú cũ A06 ("với hàm lồi, chuẩn gradient nhỏ chứng nhận gần tối ưu": sai khi không lồi mạnh), bỏ mã LLO/CLO ở A02; khôi phục hai câu cũ bị cắt cụt vì ký tự `<` chưa thoát (A07, C02); liệt kê các lập luận mới để rà toán | yêu cầu sửa |
| Rà chính xác toán học | Không | Tính lại A03, B01–B08, C01–C08, D02–D11, E02 và đối chiếu SVG: đều đúng; các lập luận mới đúng. 3 trung bình (C01 mặt trang và ghi chú viết $-g_0\propto(3,14)^T$, $-\theta_0\propto(1,2)^T$ với hằng số âm; A07 sai cơ chế vì sao lỗi 0–1 không dùng để cập nhật; D03 khẳng định mạnh hơn chứng minh), 11 nhẹ, 5 ý cũ bị mất | chấp nhận; điều phối viên kiểm mặt trang C01 và cho phép sửa đúng hai dấu trừ |
| Rà mạch truyện và tự đọc | Không | 1 nghiêm trọng (câu kết trang k chép thành câu mở trang k+1 ở 26/36 chỗ chuyển trang), 5 trung bình (điểm dừng A05/A06 lẫn với thời điểm ngừng lặp; "quá khớp" chưa định nghĩa; A06 mất mắt xích tiêu chí xác thực; E01 chưa ghép bốn quyết định với ba câu hỏi; 8 trang dài), 24 nhẹ; câu thêm ở E03 có căn cứ outline dòng 101, 671 | chấp nhận |
| Soạn ghi chú, lượt sửa | Có, aside.notes + hai dấu trừ C01 | Sửa mục 0, 8 mục bắt buộc và toàn bộ mục nhẹ; diff ngoài aside chỉ gồm hai dấu trừ (điều phối viên kiểm bằng difflib) | chấp nhận, chờ tái kiểm |

### Phát hiện và trạng thái

| Mức độ | Trang | Vấn đề | Trạng thái |
|---|---|---|---|
| nghiêm trọng | 26 chỗ chuyển trang | Lặp câu kết trang trước thành câu mở trang sau | đã sửa; kiểm 8-gram chỉ còn trùng câu "Nguồn: Goodfellow…" |
| trung bình | C01 (mặt trang + ghi chú) | $-g_0\propto(3,14)^T$, $-\theta_0\propto(1,2)^T$ sai dấu hướng | đã sửa mặt trang thành $\propto-(3,14)^T$, $\propto-(1,2)^T$; ghi chú viết $-\theta_0=-2(1,2)^T$, $-g_0=-2(3,14)^T$ |
| trung bình | A07 | Lỗi 0–1 "không khả vi nên không cập nhật" | đã sửa: hàm hằng từng khúc, gradient 0 nơi tồn tại |
| trung bình | D03 | "Các điều kiện đều cần" | đã sửa: mỗi giả thiết được dùng; ví dụ cần $e\,x\,\phi'(z_j)\ne0$ |
| trung bình | A05, A06 | Điểm dừng/ngừng lặp; quá khớp; mắt xích tiêu chí xác thực | đã sửa |
| trung bình | E01 | Chưa ghép bốn quyết định với ba câu hỏi | đã sửa |
| trung bình | A05, A06, C01, D04, D05, D08, D10, E01 | Dài trên 280 do lặp | đã rút, đều dưới 280 |
| nhẹ | 35 mục | Thuật ngữ tiếng Anh lần đầu, ký hiệu trùng ($s$, $r$, $b$), B03 hiệp phương sai không hoàn lại, C07 giả thiết $O(1/t^2)$, D09/E02 ReLU, khôi phục ý cũ (A03, A04, B06, D08), E03 viết lại câu thêm | đã sửa |
| ghi nhận | C01 (màn hẹp) | Dòng `H=diag(3,7), g=∇q(θ)=Hθ` bị cắt bên phải ở 390 px; tình trạng có sẵn, không thuộc hai chỗ sửa | còn mở, ngoài phạm vi |
| ghi nhận | C03/C08 (mặt trang) | $v_t$ gọi là "bước" ở C03, "vận tốc" ở C08; ghi chú nêu "vận tốc (velocity)" một lần rồi dùng thống nhất | giữ mặt trang |

### Kiểm tra của điều phối viên

- `check-deck.py`: 37 trang, 37 ghi chú, không `$` lệch, không cụm chỉ đường; Chromium 1600×900 và 390×844: không lỗi console, không `.katex-error`, không tràn khung ở 16:9. Đã xem ảnh C01 ở hai kích thước sau khi sửa mặt trang: hộp kết luận xuống hai dòng và vừa khung ở 16:9.
- Diff ngoài aside (difflib sau khi bỏ aside): đúng hai chèn dấu "-" ở C01.
- `git diff --check` sạch. Ghi chú bài giảng Bài 05: cần rà câu tương ứng về hướng $-g_0$, $-\theta_0$ nếu có (xem mục đồng bộ dưới).
- Tái kiểm toán học: 2 trung bình mới (A05 định nghĩa quá khớp đồng nhất với dấu hiệu; D05 câu mới sai "mạng thật không dùng chung trọng số"), 3 nhẹ. Tái kiểm mạch truyện (đọc lại 37 ghi chú): đạt mức sinh viên tự đọc được; cùng phát hiện D05, 7 nhẹ. Lượt sửa cuối (D05, A05, C07, D10, A04, A06, E01/E03, C06, D03/C02) đã thực hiện; điều phối viên chạy lại `check-deck.py`: đạt. Quyết định: chấp nhận, bàn giao Bài 05.
- Việc còn mở (ngoài phạm vi lượt này): `materials/lec-05/lecture-note.md` dòng 204 có cùng cách viết $-g_0\propto(3,14)^T$, $-\theta_0\propto(1,2)^T$ cần sửa dấu như mặt trang C01; chưa sửa vì script đồng bộ gom cả `materials/lec-01b/` đang được một phiên khác soạn và `material-local-data.js` đang có thay đổi chưa commit của phiên đó.

## Đồng bộ thuật ngữ cho deck và rà chất lượng SVG (2026-10-11)

Yêu cầu người dùng: như nhật ký Bài 03 cùng ngày. Tác tử biên tập deck và hình (general-purpose, Claude Opus 5.5 `claude-opus-5-5`, high; điều phối viên Fable 5.1 duyệt). Deck: "nhóm" theo nghĩa mini-batch → "lô" (26 trên mặt trang, 80 trong ghi chú diễn giả; tiêu đề B06 "Kích thước lô và sai số chuẩn", B08 "Cập nhật từ một lô quan sát"), "kiểm" → "kiểm tra" (7), "tính tay/bằng tay" → "thủ công" (3), "tiểu bài" → "tiểu bài toán". SVG: 15/25 tệp sửa; "giảm gradient" → "hạ gradient" ở ill-conditioned-runs, spectral-radius; momentum-vectors và nesterov-points vẽ lại trong khung phóng to với thang trục đều vì vector quá ngắn bị đầu mũi tên che; sample-step mũi tên nối đúng hai điểm kèm nhãn mức giảm ℓ₁ và mức tăng J; spectral-radius dời nhãn ρ = 1 bị đường cắt; nhãn các họ bậc hai có nền trắng; two-hidden-units thêm chỉ số và mũi tên lan truyền tới theo alt; số liệu vẽ tính lại khớp ghi chú. Ghi chú: ba alt và câu đọc hình sửa theo hình thật (observations.svg trục ngang vạch dọc; critical-points và dòng 1996 "hai cực tiểu địa phương"). Bảy SVG không được dùng (gradient-chain, ill-conditioning, minibatch-unbiased-variance, momentum-lookahead, risk-curves, saddle, variance-flow) giữ nguyên; saddle.svg sai (đường u² không qua gốc), risk-curves và ill-conditioning có chú thích tràn hộp: để người dùng quyết xóa hay vẽ lại. Kiểm tra: `deck-audit.py` 37 trang, 0 lỗi, 0 quá cao; cờ tràn ngang là ảnh giả chuyển trang hoặc nét căn của KaTeX bị cắt (có sẵn); tác tử xem ảnh mọi trang đổi chữ ở hai kích thước; điều phối viên duyệt báo cáo. Có sẵn ở HEAD: khung chú thích B06 che chân trang ở 1600 px. Quyết định: chấp nhận, commit.

## Rà đầy đủ các SVG không được dùng (2026-10-11, khép mục mở)

Sau lượt đồng bộ deck và SVG, các hình không được deck hay ghi chú tham chiếu mới chỉ được sửa lỗi rõ. Điều phối viên Fable 5.1 giao hai tác tử biên tập hình (general-purpose, Claude Opus 5.5 `claude-opus-5-5`, high) rà đủ 55 tệp mồ côi của mọi bài (Bài 01: 7, 02: 26, 03: 2, 04: 6, 05: 5 cùng saddle.svg và gradient-chain.svg, 05c: 1, 06: 6, 07: 1): mở xem từng PNG, đối chiếu khái niệm trong ghi chú, tính lại số liệu, vẽ lại các hình sai nội dung (saddle: parabol không qua gốc; coordinate-polyak-geometry panel A: đường mức elip và đường đi hạ tọa độ đúng; ill-conditioning, momentum-lookahead, risk-curves, quadratic-start, adaptive-scaling, self-concordant-curvature, line-restriction-convex-library, psd-cone-and-quadratic-directions, convex-preservation-and-jensen, quasiconvex-level-bisection, lp-qp-qcqp-geometry, pareto-front-weighted-scalarization, cone-induced-orders, qcqp-intersection, feasible-ray), thu nhỏ đầu mũi tên quá to, dời nhãn bị đường cắt, bỏ viền khung cắt làm miền không bị chặn trông như bị chặn, đổi thuật ngữ và tiêu đề dạng câu, thêm desc. Cùng lượt: Bài 06 thống nhất chính tả "vectơ" → "vector" trong deck (13), ghi chú (53), bài tập (4) và SVG (3). Kiểm tra của điều phối viên: `svg-audit.py` trên 56 tệp chỉ còn bốn cảnh báo dương tính giả (clipPath ở quadratic-local-model, momentum-lookahead, coordinate-polyak-geometry; nền chữ ở curvature-toolchain); đã xem PNG coordinate-polyak-geometry và psd-cone-and-quadratic-directions: đạt; `sync-local-materials.py --check` đạt; `git diff --check` sạch. Quyết định: chấp nhận, commit.

## Rà bằng mắt toàn bộ SVG và thống nhất dấu thập phân (2026-10-11)

Như nhật ký Bài 02 cùng ngày: điều phối viên Fable 5.1 xem toàn bộ 218 SVG qua 36 bảng PNG, không phát hiện lỗi nội dung, mũi tên che chữ hay chữ sai vị trí (đã tính lại 1,1⁵ = 1,61051 của gradient-chain, cây θ₂ của history-tree, 17/b của minibatch-unbiased-variance, √(8/3) = 1,633 của stderr-and-cost-vs-b). Hai SVG Bài 05 còn dấu chấm thập phân trong chữ: batch-standard-error (1.633, 0.816, 0.408) và step-noise (η = 0.1, 0.05); tác tử biên tập hình (general-purpose, Claude Opus 5.5 `claude-opus-5-5`, high) đổi sang dấu phẩy, chỉ phần chữ; `svg-audit.py`: 0 chồng, 0 trên nét, 0 ngoài khung (cờ `fixed_width` có sẵn, không thuộc lượt này); `git diff --check` sạch. Quyết định: chấp nhận, commit.

## Vòng lập lại kế hoạch theo Lecture A (2026-10-11)

### Yêu cầu của người dùng

Ngày 2026-10-11 người dùng đưa ra thiết kế hai bài (gửi dưới dạng ảnh) thay cho Bài 05 và Bài 06 hiện hành. Bài 05 ứng với **Lecture A — Scaling the Feature Space** (150 phút), phụ đề "From convex regression to the limits of deterministic optimization", gồm ba phiên:

| Phiên | Tên | Câu hỏi trung tâm |
|---|---|---|
| A1 | High-dimensional regression | What breaks when d grows? |
| A2 | Logistic regression and regularization | Why can a convex learning problem have no minimizer? |
| A3 | Curvature and computational cost | What is the price of a faster update? |

Bài 06 ứng với Lecture B (B1 XOR và mạng hai lớp, B2 lan truyền ngược và tính không lồi, B3 SGD theo nhóm nhỏ). Thiết kế này là đặc tả duy nhất; chỗ thiết kế không quy định được quyết định và ghi lý do trong kế hoạch.

Cùng ngày người dùng bổ sung luận đề xuyên suốt hai bài: khung của Bài 01–04 (mục tiêu lồi có cực tiểu chính xác, phương pháp tất định hội tụ tới nó) không còn là bức tranh đúng khi mô hình và dữ liệu lớn, vì (1) tính toán không cho phép dùng gradient đầy đủ ở mỗi bước, nên chuyển sang SGD là bắt buộc do chi phí chứ không phải lựa chọn phong cách, và (2) mất mát huấn luyện chỉ là đại lượng thay thế cho rủi ro trên dữ liệu mới, nên khớp chính xác tập huấn luyện không phải đích; dừng sớm và chính quy hóa là một phần của phương pháp. Mở đầu Bài 05 phải nêu sự thay đổi bức tranh này; kết luận Bài 05 và mở đầu Bài 06 phát biểu lại dưới dạng điều không còn giữ được (tính chính xác, bảo đảm tất định, gradient đầy đủ) và điều còn giữ được (tính giảm, điểm dừng, tốc độ theo kỳ vọng).

Điều phối viên chốt thời lượng theo đề cương DOCX: Buổi 5 gồm 2 tiết LT + 1 tiết BT, mỗi phiên một khối 1 tiết; vòng này chỉ lập kế hoạch, không dựng deck, không sửa học liệu.

### Tác tử tham gia

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Tác tử lập kế hoạch Bài 05 | Agent tool, general-purpose | claude-opus-5-5 | high | chỉ đọc | Lệnh gọi Agent của điều phối viên; đầu ra `plan-lec-05.md` trong thư mục nháp của phiên (`scratchpad/replan/`) |
| Tác tử lập kế hoạch Bài 06 | Agent tool, general-purpose | claude-opus-5-5 | high | chỉ đọc | Lệnh gọi Agent của điều phối viên; đầu ra `plan-lec-06.md` trong cùng thư mục nháp |
| Điều phối viên | phiên hiện tại | claude-fable-5-1 | medium | duyệt | Quyết định ghi trong `master-decisions.md` (thư mục nháp) và tóm tắt dưới đây |
| Tác tử soạn kế hoạch Bài 05 | Agent tool, general-purpose | claude-opus-5-5 | high | ghi, chỉ trong `planning/lec-05/` | Lệnh gọi Agent của điều phối viên; đầu ra: `outline.md`, `storyboard.md` mới, hai tệp lưu trữ, mục này của nhật ký |

Hai tác tử lập kế hoạch chạy song song (chỉ đọc). Tác tử soạn kế hoạch Bài 05 và tác tử soạn kế hoạch Bài 06 ghi đồng thời vào hai thư mục khác nhau (`planning/lec-05/`, `planning/lec-06/`), theo quy tắc chỉ tuần tự hóa khi cùng một tệp. Không tác tử nào commit.

### Quyết định của điều phối viên về kế hoạch Bài 05

**Chấp nhận** `plan-lec-05.md`. Điều phối viên đã tính lại độc lập bằng Python (Fraction/float) các số liệu sau và xác nhận khớp:

- bảng A1: $w$, MSE huấn luyện và kiểm thử, $\lambda_{\min}$, $\lambda_{\max}$, $\kappa$ cho $d=1..5$;
- bảng ridge $d=5$;
- dừng sớm: $k=79$ với MSE kiểm thử $0{,}001084$; $F\le10^{-6}$ từ $k=2509$; $L=1{,}571488$;
- LG10: $w_\lambda$, $P$, $L$, $\kappa$, $\lVert w_\lambda\rVert$ cho $\lambda=0{,}1$ và $0{,}01$;
- CP03: số bước hạ gradient 12/71/446; cận 106/917/9037; Newton 4/5/7; $F''_\lambda(w_\lambda)$;
- $F^*=\tfrac13\log\tfrac{27}4$;
- CP08: hòa vốn $\kappa\approx548$;
- CP09, CP10, KL05: các bậc chi phí.

Nguồn: Bảng 13.3 của Sra–Nowozin–Wright (ch. 13, Bottou–Bousquet, tr. 363) được đối chiếu bằng pdftotext. Hàng hinge $\lambda=10^{-4}$: 23 642 s / 66 s / 1,4 s; 0,2275 / 0,2278 / 0,2275; 6,02 %. Hàng logistic $\lambda=10^{-5}$: TRON 30 s / 44 s, SGD 2,3 s; 0,18907 / 0,18890 / 0,18893; 5,68 / 5,70 / 5,66 %. Khớp. Văn bản nguồn xác nhận các hàng TRON dùng mất mát logistic.

### Mười điểm hòa giải giữa kế hoạch Bài 05 và Bài 06

1. **Hệ số chặn.** Không bài nào dùng $b$ cho hệ số chặn ($b$ là cỡ nhóm nhỏ như 05b/05c). Bài 05: hệ số chặn nằm trong $w$ qua tọa độ hằng $1$ của $x_i$. Bài 06: độ lệch mạng $b_1,b_2$ luôn có chỉ số; ví dụ tuyến tính E03 viết hệ số chặn $c$. Bài 06 A04 ghi một câu ánh xạ với quy ước của Bài 05.
2. **Newton và $\kappa$.** Cả hai bài dùng cách phát biểu của Bài 05 CP05/R1: chỉ giai đoạn hội tụ bậc hai ($\log_2\log_2(\varepsilon_0/\varepsilon)$) không chứa $\kappa$; $\varepsilon_0$ và giai đoạn tắt dần phụ thuộc $m$, $M$, $L_H$. Bài 06 (A03, E01, G02) không viết "Newton không phụ thuộc $\kappa$" vô điều kiện.
3. **Tốc độ không lồi.** Chấp nhận Q3 của Bài 06: T8 chặn trung bình kỳ vọng **bình phương** chuẩn gradient, $O(1/\sqrt K)$; chuyển sang chuẩn là $O(K^{-1/4})$ (ghi chú). Bài 05 KL04 chỉ nêu tên T5, T8.
4. **Mã hóa XOR.** Bài 05 KL03 dùng đúng bốn điểm $\{0,1\}^2$ như Bài 06 B01 (nhãn $+1$ cho $(0,1),(1,0)$, $-1$ cho $(0,0),(1,1)$ theo quy ước $\pm1$ của Bài 05); lập luận $g(1,0)+g(0,1)=g(0,0)+g(1,1)$. Bài 06 B01 nêu nhãn $\{0,1\}$ và mất mát bình phương là lựa chọn để tính tay; ghi chú B07 nói kết luận không lồi giữ nguyên với mất mát logistic (Q5 chấp nhận).
5. **Tập xác thực.** Bài 05 HQ05 định nghĩa trên mặt trang cả tập xác thực (chọn $d$, $\lambda$, bước dừng) và tập kiểm thử (báo cáo $R$); Bài 06 F05 chỉ dẫn lại, không định nghĩa lại (R3 của Bài 06 không kích hoạt).
6. **Thuật ngữ.** "hạ gradient" ở cả hai bài (D5 Bài 05); "nhóm nhỏ (minibatch)"; "lan truyền ngược (backpropagation)".
7. **Phụ đề.** Tạm dùng phụ đề danh từ do hai kế hoạch đề xuất; ghi là chờ người dùng xác nhận (D1/Q1).
8. **Hình dùng lại** (Bài 06 F01–F03, F05): ở giai đoạn dựng deck sẽ sao chép vào `img/lec-06/` kèm dòng xuất xứ trong review-log; storyboard ghi đường dẫn gốc (Q4).
9. **Deck và học liệu hiện hành** của Bài 05, 06 không đụng tới trong vòng này; `index.html` không đổi. Việc giữ chúng làm bài bổ trợ (06b) là quyết định của người dùng (D2/Q2), chưa thực hiện.
10. **Kế hoạch cũ.** `outline.md` và `storyboard.md` hiện có được đổi tên (git mv) thành `outline.old-<ngày>.md`, `storyboard.old-<ngày>.md` trong cùng thư mục; `review-log.md` giữ nguyên và được nối thêm một vòng mới.

### Tác tử soạn kế hoạch Bài 05: việc đã làm và chỗ khác kế hoạch

- `git mv` `outline.md` → `outline.old-2026-10-01.md`, `storyboard.md` → `storyboard.old-2026-10-01.md` (điểm 10). Hai tệp lưu trữ giữ nguyên nội dung; liên kết nội bộ của chúng tới `outline.md`, `storyboard.md` nay trỏ sang bản mới, chấp nhận vì đây là bản lưu.
- Viết `outline.md` mới (43 trang, 5 mạch) và `storyboard.md` mới (43 mục, cùng mã và tiêu đề với dàn bài; bản đồ hành trình KN1–KN8 và khái niệm hỗ trợ dừng sớm).
- **KL03 (điểm 4):** thay XOR $(\pm1,\pm1)$, $y=u_1u_2$ của kế hoạch bằng bốn điểm $\{0,1\}^2$ và lập luận $g(1,0)+g(0,1)=g(0,0)+g(1,1)$. Bổ sung một nghiệm tách được với đặc trưng $(1,u_1,u_2,u_1u_2)$: $\bar w=(-\tfrac12,1,1,-2)$, mọi biên bằng $\tfrac12$ (kiểm tra tay ở dàn bài, mục 6.4). Số liệu này không có trong kế hoạch; cần tác tử toán kiểm lại.
- **HQ05 (điểm 5):** chuyển định nghĩa tập xác thực và tập kiểm thử từ ghi chú lên mặt trang; ghi chú giải thích vì sao hai tập phải tách nhau và quy ước bốn điểm $u=\pm\tfrac14,\pm\tfrac34$ đóng vai tập xác thực khi chọn ở HQ09 và KL01. Ghi chú KL01 và dòng cuối bảng dừng sớm (mục 6.1) thêm cùng quy ước để con số $0{,}00108$ không bị đọc là báo cáo cuối về $R$. Giả thiết G3 thêm mẫu xác thực.
- **CP05 (điểm 2):** giữ cách phát biểu của kế hoạch, thêm tham chiếu điểm hòa giải.
- **Thời lượng từng trang:** kế hoạch chỉ cho thời lượng theo mạch và theo cụm khái niệm. Tác tử soạn phân bổ thời lượng cho từng trang sao cho tổng theo mạch (0,10 / 0,56+0,34 / 0,67+0,33 / 0,55+0,25 / 0,12+0,08) và tổng theo cụm khái niệm của kế hoạch giữ nguyên; phép cộng ghi ở cuối mục Dàn bài từng trang.
- **Bước hành trình:** đồng bộ dòng "Hành trình" của LG05, LG08, CP03, CP04, CP08 với bản đồ hành trình của kế hoạch (thêm bước nhu cầu hoặc ứng dụng của cụm kế tiếp mà bản đồ đã ghi).
- **Văn phong:** đổi liên kết HQ03 từ dạng câu hỏi trích dẫn sang câu nêu giới hạn; đổi tiêu đề KL04 từ "Điều cần bỏ và điều còn giữ" thành "Điều không còn giữ được và điều còn giữ được" theo cách nói của luận đề; thêm dòng "Điểm trung tâm" cho các trang kiểm tra (HQ10, LG11, CP10, KL05) và dòng "Hình", "Liên kết" cho các trang kế hoạch để trống. Mã trang của bài khác trong mục Ghi chú được đánh dấu là chỉ để truy nguyên, không đưa vào ghi chú diễn giả.
- **Phân công nguồn chung với Bài 06** (quyết định của điều phối viên sau khi duyệt, 2026-10-11): KL02 của Bài 05 trình bày các hàng mất mát logistic của SNW Bảng 13.3 (TRON 30 s / 44 s, SGD 2,3 s), E02 của Bài 06 trình bày các hàng mất mát hinge và dẫn lại KL02; về dừng sớm, KL01 của Bài 05 chỉ nêu quan sát số trên dữ liệu A1 và gọi tên Goodfellow §7.8 trong ghi chú, F05 của Bài 06 mang phép so sánh định lượng về độ co. Đã thêm một câu vào ghi chú KL01, KL02 trong `outline.md` và vào mục KL01, KL02 trong `storyboard.md`.
- Tự kiểm `no-ai-slop` (chế độ Edit, đối chiếu `eval.md`): không câu cảm thán, câu hỏi tu từ, lời giảng viên, khẩu hiệu; tiêu đề là cụm danh từ; không đổi giả thiết, ký hiệu, nguồn hay số liệu của kế hoạch.

### Nguồn đã tham khảo (theo kế hoạch đã duyệt)

| Nguồn | Vị trí đã đọc | Lấy gì |
|---|---|---|
| Đề cương `sources/đề cương-cơ sở toán học của AI-v2.docx` | Buổi 5, Buổi 6 (LLO11–LLO16), bảng CLO | Phạm vi, LLO, CLO, 2 LT + 1 BT |
| Boyd, Vandenberghe (2004), `sources/bv_cvxbook.pdf` | §6.3.1–6.3.2 (tr. 305–307); §7.1.1 (tr. 354–355); §9.1.2 (tr. 459–461); §9.3.1 (tr. 466–468); §9.5.1 (tr. 486); §9.5.3 (tr. 488–490); §9.7.1–9.7.2 (tr. 509–512) | Chính quy hóa như vô hướng hóa song tiêu chí; mô hình logistic; số điều kiện tập mức; cận số bước hạ gradient và Newton hai giai đoạn; chi phí Cholesky và cấu trúc đường chéo cộng hạng thấp |
| Goodfellow, Bengio, Courville (2016), `sources/Deep Learning … (z-lib.org).pdf` | §5.2 (tr. 110–117, hình 5.2); §5.2.2 (tr. 118); §5.7.1 (tr. 140); §7.1.1 (tr. 231); §7.3 (tr. 239–240); §7.8 (tr. 246–250); §8.1 (tr. 275–277); §8.2.1 | Thứ tự dung lượng → quá khớp → chính quy hóa; logistic trên dữ liệu tách được; dừng sớm; rủi ro và đại lượng thay thế |
| Sra, Nowozin, Wright (2011), ch. 13 Bottou, Bousquet | §13.1–13.2 (tr. 351–354); §13.3 Bảng 13.2 (tr. 360–362); §13.4.1 Bảng 13.3 (tr. 363) | Đánh đổi xấp xỉ–ước lượng–tối ưu; bảng chi phí GD/2GD/SGD; số liệu RCV1 |
| Giáo trình *Học máy thống kê* của người dùng (`../SML-textbook-main.zip`) | `chapters/05_regression/sec_linear_regression.tex`; `chapters/01_classification/sec_logistic_regression.tex` | Thứ tự trình bày hồi quy tuyến tính và hồi quy logistic |
| Bài 01, 02, 04, 05b, 05c (`planning/lec-NN/outline.md`, ghi chú bài giảng Bài 01, 02) | Các mệnh đề, ví dụ và định lý liệt kê ở dàn bài, mục Nguồn đã tham khảo | Kết quả dùng lại, ký hiệu, số liệu đối chiếu |

Nocedal–Wright không có trong `sources/`; không dùng nguồn MIT OCW bổ sung. Chỉ lấy thứ tự trình bày và cách tạo động cơ; không dịch, không chép đoạn văn.

### Quyết định chờ người dùng và rủi ro

| Mã | Nội dung | Phương án tạm dùng | Trạng thái |
|---|---|---|---|
| D1 | Phụ đề (dịch sát phụ đề gốc cho dạng "Từ … đến …" bị cấm) | "Hồi quy lồi và giới hạn của tối ưu tất định" (điểm 7) | mở |
| D2 | Deck, học liệu và hình Bài 05 hiện hành: (a) đổi thành bài bổ trợ "06b"; (b) lưu trữ, gỡ khỏi chỉ mục; (c) xóa | Kế hoạch đề xuất (a); vòng này không đụng tới (điểm 9) | mở |
| D3 | LLO12, LLO13, LLO14, LLO16 và phần còn lại của LLO11, LLO15 không được hai bài mới phủ | Bảng gợi ý nơi đặt ở dàn bài, mục Nội dung đề cương không còn | mở |
| D4 | Ký hiệu hệ số chặn | Gộp vào $w$, không dùng $b$ (điểm 1) | mở |
| D5 | "Hạ gradient" hay "giảm gradient" | "hạ gradient" ở cả hai bài (điểm 6) | mở |

| Mã | Rủi ro | Cách xử lý trong dàn bài | Trạng thái |
|---|---|---|---|
| R1 | Phát biểu Newton và $\kappa$ | CP05 chỉ nói giai đoạn bậc hai không chứa $\kappa$ (điểm 2) | mở |
| R2 | $O(nd^2+d^3)$ chỉ đúng với ma trận dày, $n\ge d$ | CP07 nêu trường hợp $d>n$ và dữ liệu thưa | mở |
| R3 | RCV1: TRON không phải Newton thuần; phần cứng 2008–2011 | KL02 dùng để so bậc, có chú thích | mở |
| R4 | Ví dụ năm điểm chỉ định tính; $\kappa$ phụ thuộc cơ sở đơn thức | Ghi chú HQ08 | mở |
| R5 | Cận số bước bi quan 9–20 lần | CP03, CP08 nêu rõ | mở |
| R6 | Trùng lặp với Bài 01 | LG chỉ phát biểu lại; phần mới là $d$ tổng quát, chế độ nội suy, cận $L$, $\kappa$ | mở |
| R7 | Quá tải trang ở khối 1 (15 trang) và khối 3 (16 trang) | Thứ tự cắt: bảng độ nhạy HQ08 vào ghi chú; KL02 vào ghi chú KL01; CP10(c) thành bài tập về nhà | mở |
| R8 | LG05, LG09, CP05 dày công thức, nguy cơ vượt khung 16:9 | Tách chứng minh LG05 sang trang kế nếu cần, ghi vào storyboard | mở |

### Cổng storyboard Bài 05 và lượt sửa (2026-10-11)

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Tác tử kiểm định storyboard Bài 05 | Agent tool, general-purpose | claude-opus-5-5 | high | chỉ đọc | Lệnh gọi Agent của điều phối viên; báo cáo `scratchpad/replan/gate-lec-05.md`, mã kiểm số `scratchpad/gate05/a1.py`–`a5.py` |
| Tác tử soạn kế hoạch Bài 05 (cùng tác tử soạn ở bảng trên, tiếp tục bằng SendMessage) | Agent tool, general-purpose | claude-opus-5-5 | high | ghi, chỉ trong `planning/lec-05/` | Sửa `outline.md`, `storyboard.md`, nối mục này |
| Tác tử kiểm định storyboard Bài 05, tái kiểm (cùng tác tử kiểm định ở trên, tiếp tục bằng SendMessage) | Agent tool, general-purpose | claude-opus-5-5 | high | chỉ đọc | Báo cáo tái kiểm nối vào `scratchpad/replan/gate-lec-05.md` |

Kết luận của cổng: **đạt có điều kiện**; 0 chặn bàn giao, 2 nghiêm trọng, 13 trung bình, 11 nhẹ; hơn 60 con số tính lại đều khớp, trừ hai chỗ làm tròn. Điều phối viên đã kiểm các phát hiện bắt buộc sửa (mục 1–11 của lệnh sửa) và bổ sung một phát hiện từ cổng storyboard Bài 06.

**Số trang mới: 44** (43 + 1, do tách HQ08). Bảng đổi mã so với bản trước cổng (các mục trước trong vòng này dùng mã cũ):

| Mã cũ | Mã mới |
|---|---|
| HQ08 "Số điều kiện và độ nhạy của nghiệm" | HQ08 "Độ nhạy của nghiệm" + HQ09 "Số điều kiện" |
| HQ09 | HQ10 |
| HQ10 | HQ11 |
| HQ11 | HQ12 |
| LG12 "Cái giá của hệ số chính quy hóa nhỏ" | LG12 "Hệ số chính quy hóa và số điều kiện" |
| KL03 "Hai giới hạn của bài" | KL03 "Giới hạn của mô hình tuyến tính và phương pháp tất định" |
| HQ04 "Sai số kiểm thử theo số chiều" | HQ04 "Sai số ngoài mẫu theo số chiều" |

Thời lượng: KN3 $+0{,}01$ tiết LT (HQ08 $0{,}04$ + HQ09 $0{,}04$), HQ12 $0{,}08\to0{,}07$; CP09 $0{,}06\to0{,}04$, KL02 $0{,}02\to0{,}01$, KL03 $0{,}02\to0{,}05$. Mạch CP $0{,}53$ LT, KL $0{,}14$ LT; tổng vẫn 2 LT + 1 BT, mỗi khối 1 tiết.

Nhãn kết quả trên mặt trang (thay mã KQ): Mệnh đề 1 (HQ07), Mệnh đề 2 (LG04), Định lý 1 (LG05), Mệnh đề 3 (LG06), Định lý 2 (LG08), Mệnh đề 4 (LG09), Định lý 3 (CP04, T2b của Bài 05b), Định lý 4 (CP05), Mệnh đề 5 (CP07). Bảng Kết quả dùng lại của dàn bài có thêm cột "Nhãn trên trang".

| Mã | Mức độ | Trang (mã mới) | Phát hiện | Trạng thái | Cách xử lý hoặc lý do |
|---|---|---|---|---|---|
| G1 | nghiêm trọng | HQ11 | KN1 không có bài tập đo đúng sản phẩm của nó | đã sửa | Thêm câu (d): bảng MSE huấn luyện / xác thực $d=1..5$ (số A1), chọn $d$ và nêu tập báo cáo cuối; đáp án $d=2$, báo cáo trên tập kiểm thử riêng |
| G2 | nghiêm trọng | LG09, LG11(c), CP08, mục 6.4, bảng KQ | $\lVert x_i\rVert\le1$ mâu thuẫn với tọa độ hằng $1$ | đã sửa | Mệnh đề 4: $\lVert x_i\rVert\le r\Rightarrow L\le r^2/4+\lambda$, $\kappa\le1+r^2/(4\lambda)$, $r\ge1$; CP08 với $r^2=2$: $\kappa\le501$ ($\approx9{,}2\cdot10^{11}$), $\kappa\le50\,001$ ($\approx9{,}2\cdot10^{13}$); LG11(c): $L\le0{,}52$, $\kappa\le26$, cận chuẩn giữ $8{,}33$ |
| G3 | trung bình | HQ08, HQ09 | Bốn bước KN3 trên một trang, nhu cầu đứng sau định nghĩa | đã sửa | Tách: HQ08 nhu cầu (thí nghiệm $\delta y_3$) + trực quan (đường mức); HQ09 bảng $\kappa$ + định nghĩa + cận độ nhạy + nhận xét xen kẽ Cauchy |
| G4 | trung bình | LG09 | Ví dụ đứng sau mệnh đề | đã sửa | Ví dụ một chiều ($F_\lambda''\in(\lambda,\tfrac14+\lambda]$, bốn giá trị $\kappa$) đặt đầu trang, Mệnh đề 4 sau |
| G5 | trung bình | LG06, LG10 | Bước "ứng dụng" của KN4 là một mệnh đề mới | đã sửa | LG06 ghi là hình thức (đối chứng); ứng dụng của KN4 chuyển sang dòng $\lambda=0$ ở LG10 (chế độ $\operatorname{rank}X=n$ làm mất cực tiểu với mọi nhãn, gồm năm mẫu VD-A1 ở $d=5$) |
| G6 | trung bình | KL01, KL05 | Dừng sớm không có định nghĩa; kiểm tra khai báo nhưng không có câu hỏi | đã sửa | KL01 thêm dòng định nghĩa; KL05 thêm câu (c) về tập chọn bước dừng và tập báo cáo, có đáp án |
| G7 | trung bình | KL04 | Cột "còn giữ được" thiếu tính giảm và điểm dừng | đã sửa | Xem G27 cho cách viết cuối; thêm T6, T7 |
| G8 | trung bình | HQ04, HQ10, KL01, mục 6.1 | Bốn điểm gọi là "kiểm thử" nhưng dùng để chọn | đã sửa | Từ HQ05 trở đi gọi là tập xác thực; mọi cột "MSE kiểm thử" ở mục 6.1, bảng KL01 và mô tả SVG đổi thành "MSE xác thực"; ghi rõ ví dụ thu nhỏ không có tập kiểm thử riêng (HQ05, HQ10, KL01, Giới hạn áp dụng). HQ04 đặt tiêu đề "Sai số ngoài mẫu" vì thuật ngữ được định nghĩa ở HQ05; mặt trang HQ04 báo trước bốn điểm sẽ là tập xác thực |
| G9 | trung bình | CP03; storyboard KN7 | "Gần tỉ lệ với $\kappa$" không chính xác | đã sửa | Điểm trung tâm: $\kappa\times83{,}5$, số bước $\times37$, $L/F''_\lambda(w_\lambda)\times35{,}5$; cận theo $\kappa$ là cận trên; ghi chú giải thích hệ số co cục bộ $1-F''_\lambda(w_\lambda)/L$ |
| G10 | trung bình | HQ09, HQ12 | "$\kappa$ tăng" khẳng định không căn cứ | đã sửa | Nhận xét xen kẽ Cauchy ở HQ09 ($X_d^TX_d$ là ma trận con chính của $X_{d+1}^TX_{d+1}$); ghi chú phân biệt chiều tăng (chung) với mức tăng (phụ thuộc cơ sở); HQ12(c) đổi thành "không giảm" |
| G11 | trung bình | HQ07, LG04–LG09, CP04, CP05, CP07, MD02, MD03 | Mã nội bộ sắp lên mặt trang | đã sửa | Nhãn đánh số theo bài; CP05 bỏ "Bài 04 RN07" khỏi nhãn; MD03 gọi phần bằng tên; MD02 viết "Mục tiêu 1–3"; quy ước mã ở đầu dàn bài mở rộng (KQ, KN, MT, phiên A1–A3, điểm hòa giải, giao diện A–B chỉ dùng trong kế hoạch) |
| G12 | trung bình | HQ12, LG12, CP11, LG03, KL01, KL02 | Đặc tả ghi chú chỉ gồm siêu dữ liệu quy trình; LG12 có lời chỉ đường | đã sửa | HQ12: bình phương nhỏ nhất luôn có nghiệm vì là hình chiếu; LG12: độ gần bài toán gốc và $\kappa$ kéo ngược nhau, không dùng "tiếp theo"; CP11: tổng chi phí là tích hai thừa số, một lượt dữ liệu là đơn vị chi phí nhỏ nhất; LG03 bỏ câu nhãn KN; câu phân công nguồn với Bài 06 ở KL01, KL02 chuyển từ "Ghi chú" sang "Liên kết"; nhãn giao diện A–B chuyển sang "Liên kết" |
| G13 | trung bình | CP09, KL02, KL03, CP11 | KL03 0,02 tiết mà chứa chứng minh XOR trùng B02 của Bài 06; giới hạn (i) lặp nguyên văn | chấp nhận một phần | Đã sửa: KL03 nhận $0{,}05$ tiết (từ CP09 và KL02, theo quyết định của điều phối viên), chỉ phát biểu XOR và một đẳng thức, chứng minh để B02 của Bài 06; KL03(i) rút thành một dòng dẫn CP11. Không tăng thời lượng CP05 như cổng gợi ý, vì điều phối viên chỉ định nguồn bù là CP09 và KL02 và tổng khối 3 cố định |
| G14 | trung bình | MD04, bảng ký hiệu, KL03 | Thiếu ánh xạ $u\leftrightarrow x$ và nghĩa của $d$ giữa hai bài | đã sửa | MD04 thêm một dòng ánh xạ ($u$ ở đây là $x$ của Bài 06; $d$ ở đây bằng $p=d+1$ của Bài 06); bảng ký hiệu và ghi chú KL03 ghi cùng ánh xạ. Phía Bài 06 (A04) thuộc tác tử soạn Bài 06 |
| G15 | trung bình | HQ07, LG08 | Hai trang quá tải; LG08 dùng dữ liệu không nêu lại | chấp nhận một phần | HQ07: công thức $w_{\rm mn}$ chuyển xuống ghi chú, gạch đầu dòng ví dụ tách đôi. LG08: nêu dữ liệu một mẫu $x_1=1$, $y_1=+1$ trên trang. Bảng bốn dòng của LG08 giữ lại; chỉ chuyển sang LG09 nếu kiểm tra 16:9 khi dựng deck cho thấy vượt khung, vì LG09 đã nhận ví dụ một chiều ở đầu trang (R8) |
| G16 | nhẹ | HQ02, LG02 | Trang nhắc lại công cụ gắn nhãn bước "hình thức" | đã sửa | Đổi thành "tiên quyết nhắc lại (Bài 01), không tính vào sáu bước" |
| G17 | nhẹ | HQ09, HQ10 | Làm tròn sai | đã sửa | $8{,}39$ (từ $8{,}3946$); $0{,}007635$ theo chỉ định của điều phối viên |
| G18 | nhẹ | HQ09, bảng ký hiệu | $\kappa=\infty$ chưa ghi là quy ước | đã sửa | Ghi "quy ước $\kappa=\infty$ khi $\lambda_{\min}=0$" trên trang và trong bảng ký hiệu |
| G19 | nhẹ | MD02, HQ10, KL02, CP06, CP09 | Mã mục tiêu, viết tắt chưa viết đầy đủ | đã sửa | "Mục tiêu 1–3"; "Mệnh đề 02.21(c)"; "hạ gradient ngẫu nhiên (SGD)" lần đầu trên mặt trang KL02; IRLS và TF-IDF viết đầy đủ trong ghi chú |
| G20 | nhẹ | LG12, KL03 | Tiêu đề chưa gọi tên khái niệm | đã sửa | "Hệ số chính quy hóa và số điều kiện"; "Giới hạn của mô hình tuyến tính và phương pháp tất định" |
| G21 | nhẹ | KL04 | Thiếu T6 cho tốc độ $O(1/k)$ lồi mạnh | đã sửa | Ghi T5, T6, T8 (chỉ nêu tên) |
| G22 | nhẹ | CP02 | Bảng dùng bước Newton đầy đủ, định lý giả thiết quay lui | đã sửa | Ghi chú CP02: quay lui với $\alpha=0{,}25$ nhận $t=1$ ở mọi bước của cả ba $\lambda$ (số do cổng kiểm) |
| G23 | nhẹ | KL02 | Điểm trung tâm đặt SGD như phương pháp nhanh hơn; "không đổi lỗi kiểm thử" | đã sửa | Điểm trung tâm: chi phí mỗi bước không phụ thuộc $n$, cùng mức lỗi 5,66–5,70 %; ghi chú: SGD bị buộc bởi chi phí mỗi bước, lỗi chênh không quá 0,04 điểm phần trăm |
| G24 | nhẹ | CP11 | "Vượt ngân sách" không có số | đã sửa | Dẫn số RCV1: $3{,}7\cdot10^{10}$ phép nhân–cộng cho một gradient đầy đủ; $1{,}7\cdot10^{15}$ và 17,8 GB cho một bước Newton dày |
| G25 | nhẹ | HQ05 | Định nghĩa quá khớp chưa nêu khoảng cách | đã sửa | "$F(w)$ nhỏ nhưng khoảng cách $R(w)-F(w)$ lớn" |
| G26 | nhẹ | KL01 | Chưa phân biệt giới hạn với giá trị sau hữu hạn bước | đã sửa | "khi $k\to\infty$ sai số xác thực tiến tới $0{,}0487$"; ghi chú: tại $k=2509$ là $0{,}0476$ |
| G27 | trung bình (phát hiện của cổng storyboard Bài 06, áp dụng cho Bài 05) | KL04, MD03, Phạm vi (dàn bài, storyboard), nhật ký | "Tính giảm theo kỳ vọng" không phải tính chất SGD giữ được: trên dữ liệu bốn điểm của Bài 06, một bước SGD từ chính cực tiểu cho $\mathbb E\,F(\theta_1)=\tfrac{69}{128}>\tfrac12$ | đã sửa | Cột "còn giữ được" của KL04: tính giảm mỗi bước của hạ gradient dùng gradient đầy đủ (bổ đề giảm); với SGD, bất đẳng thức một bước có số hạng nhiễu và tốc độ theo kỳ vọng (T5, T6, T8); điểm dừng (T7, T8). Ghi chú KL04 nêu phản ví dụ của Bài 06; MD03 và mục Phạm vi của dàn bài, storyboard ghi cùng cách viết. Đoạn ghi yêu cầu người dùng ở đầu vòng này giữ nguyên câu chữ của người dùng ("tính giảm, điểm dừng, tốc độ theo kỳ vọng"); cách hiểu đúng là cách viết của KL04 ở trên |

Kiểm tra sau sửa: 44 mục `####` trong `outline.md` và `storyboard.md`, mã và tiêu đề trùng nhau (so bằng `diff`); tổng thời lượng theo trang $2{,}00$ LT + $1{,}00$ BT; `git diff --check` sạch. Cần chạy lại cổng storyboard cho các trang bị ảnh hưởng và hai trang lân cận mỗi phía (HQ06–HQ12, LG04–LG12, CP01–CP11, KL01–KL05, MD02–MD04), và tác tử toán kiểm lại các số mới: $r^2=2$ ở CP08, LG11(c); câu HQ11(d); nhận xét xen kẽ Cauchy; hệ số co cục bộ ở ghi chú CP03.

### Tái kiểm cổng storyboard Bài 05 và lượt sửa cuối (2026-10-11)

Kết quả tái kiểm: **đạt có điều kiện**; 0 chặn bàn giao, 0 nghiêm trọng, 3 trung bình, 4 nhẹ. Điều phối viên giao sáu điểm sửa; tác tử soạn kế hoạch Bài 05 đã sửa trong `outline.md` và nhật ký:

| Mã | Trang | Vấn đề | Trạng thái | Cách xử lý |
|---|---|---|---|---|
| T1 | LG12 (ghi chú) | "phương pháp dùng độ cong là cách để số bước không tăng theo $\kappa$" trái điểm hòa giải 2 | đã sửa | Newton có giai đoạn hội tụ bậc hai mà số bước không chứa $\kappa$; giai đoạn tắt dần vẫn phụ thuộc độ cong qua $m$, $M$, $L_H$ (ký hiệu của CP05) |
| T2 | CP03 (ghi chú) | Hệ số co $1-F''_\lambda(w_\lambda)/L$ gán cho sai số giá trị | đã sửa | $1-F''/L$ là hệ số co của khoảng cách; sai số giá trị $e_k$ co theo $(1-F''/L)^2=0{,}267;\,0{,}819;\,0{,}973$, khớp tỉ số đo được $0{,}2667;\,0{,}8193;\,0{,}9727$; kết luận giữ nguyên |
| T3 | CP03 (mặt trang) | "không theo $\kappa$" mâu thuẫn với điểm trung tâm | đã sửa | Dòng dưới bảng: số bước theo sát $L/F''_\lambda(w_\lambda)$, tăng chậm hơn $\kappa$; số bước Newton gần như không đổi ($4$, $5$, $7$) |
| T4 | HQ07, LG04, LG09 (ghi chú) | Câu lịch sử quy trình trong đặc tả ghi chú diễn giả | đã sửa | Bỏ câu "chuyển từ mặt trang xuống ghi chú" (HQ07); "cầu nối A1 → A2" thành "mệnh đề nối hồi quy nhiều chiều với hồi quy logistic" (LG04); câu về giả thiết của kế hoạch ban đầu thành lý do toán học: tọa độ hằng $1$ cho $\lVert x_i\rVert\ge1$ (LG09) |
| T5 | KL04 | Hàng 2 giữ "gradient đầy đủ" trong khi hàng 4 bỏ nó | đã sửa | Hàng 2: "tính giảm mỗi bước của hạ gradient với gradient đầy đủ, khi còn tính được"; hàng 4: "gradient đầy đủ $O(nd)$ ở mỗi bước, không còn khả thi ở quy mô lớn"; điểm trung tâm viết theo |
| T6 | Nhật ký | Hàng tác tử chỉnh sửa dễ đọc thành tác tử kiểm định | đã sửa | Ghi rõ "cùng tác tử soạn ở bảng trên"; thêm hàng tái kiểm (cùng tác tử kiểm định, chỉ đọc) |

Các phát hiện nhẹ còn lại của tái kiểm nằm ngoài sáu điểm điều phối viên giao, không sửa trong lượt này. Số trang giữ 44. `git diff --check` sạch.

### Trạng thái

Deck, ghi chú và bài tập Bài 05 chưa dựng lại theo kế hoạch này; deck hiện hành vẫn được index.html liên kết.

Điều phối viên đã chấp nhận `outline.md` và `storyboard.md` (kể cả lời giải XOR ở KL03) và cổng storyboard đã chạy; bản hiện tại là bản sau lượt sửa theo cổng (44 trang). Bước tiếp theo: điều phối viên duyệt lượt sửa, tái kiểm cổng storyboard và toán trên các trang bị ảnh hưởng.
