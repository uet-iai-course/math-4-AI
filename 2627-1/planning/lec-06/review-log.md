# Nhật ký rà soát Bài giảng 06

## Vòng xây dựng lại dàn bài, 2026-09-26

**Trạng thái:** đã chốt dàn bài mới sau cổng storyboard, năm báo cáo độc lập, chỉnh sửa riêng và tái kiểm toán học, học thuật, mạch lập luận. Bản 45 trang/7 mạch đã được lưu trong Codex Slides và đối chiếu trạng thái dự án. Phạm vi chỉ là kế hoạch nội dung; HTML, ghi chú và bài tập công khai chưa đồng bộ. Chưa kiểm trực quan bằng Browser.

Mọi trạng thái “đã đồng bộ”, “đã kiểm định” hoặc số trang trong phần lịch sử phía dưới chỉ áp dụng phiên bản cũ. Không dùng chúng để chứng nhận bản 45 trang/7 mạch hiện tại. Không đọc hoặc kế thừa tuyến outline/storyboard cũ khi xây bản này. Nhật ký cũ được giữ để truy nguyên, không xóa vấn đề và quyết định trước đây.

### Phạm vi, nguồn và quyết định

- Thực hiện `build-slide-deck-outline` và đọc `references/output-template.md`; soạn 8 phần phân tích, 45 trang đủ 9 trường, bản đồ 14 cụm KN0–KN13 và 45 mục storyboard.
- Đối chiếu đề cương DOCX chính thức: Buổi 6, Chương 8 §§8.5–8.7; LLO14/CLO2,3; LLO15/CLO2,3; LLO16/CLO3,4. Đơn vị dự toán là tiết theo đoạn tổ chức giảng dạy: 2 lý thuyết + 1 bài tập. Nhãn “Số giờ/buổi” khác trong bảng được ghi rõ tại phần phân tích trong outline, không suy đổi sang phút.
- Nguồn nội dung chính là Goodfellow, Bengio, Courville (2016). Đối chiếu ba bộ trang chiếu chính thức của Stanford, Toronto và CMU; phạm vi đọc và ảnh đã xem nằm trong phần phân tích của outline mục 2–3. Nguồn gốc AdaGrad, Adam, Hessian-free, BN, curriculum được đọc theo báo cáo lý thuyết; BV§9.4.1/9.5.1–9.5.3 do điều phối viên xác minh.
- Giữ 7 mạch: bài toán/mô hình bước; thống kê gradient; Newton–CG; BFGS; phép tính/khối/đầu ra; huấn luyện theo giai đoạn; tổng hợp lựa chọn. Mỗi mạch có trang kiểm tra riêng. 45 trang là kết quả phân rã nội dung, không phải ràng buộc số lượng.
- Sườn chung có đối tượng huấn luyện và mô hình bước có phạt SPD cho B–D. E–F thay đúng thành phần của quá trình; không ép BN hoặc curriculum thành ma trận tiền điều kiện hóa.
- Toàn bộ hình ở mức đặc tả tự vẽ; không sao chép hình đại học hoặc tài sản bên thứ ba. Không bổ sung nguồn MIT OpenCourseWare, không sửa danh mục MIT.

### Điều phối và mô hình được chỉ định

| Tác tử | Vai trò | Mô hình chỉ định và bằng chứng |
|---|---|---|
| lec06_outline_plan | Lập kế hoạch công việc | Điều phối viên xác nhận lời gọi collaboration.spawn_agent chỉ định gpt-6-astra |
| lec06_source_comparison | Đối chiếu ba bộ trang chiếu đại học; lượt 2 rà chuyên gia, báo cáo EX01–EX07 | Như trên; báo cáo nguồn đã chuyển vào phần phân tích trong outline |
| lec06_theory_sources | Phân tích lý thuyết, nguồn và ví dụ; lượt 2 rà toán học, báo cáo M01–M07 | Như trên; báo cáo lý thuyết đã chuyển vào phần phân tích trong outline |
| lec06_outline_writer | Soạn bản mới và tự kiểm | Như trên; chỉ ghi planning/lec-06, không sửa sản phẩm công khai |
| lec06_storyboard_gate | Kiểm định hành trình và vai trò 45 trang | Lời gọi collaboration chỉ định gpt-6-astra theo điều phối viên; chỉ đọc |
| lec06_review_student | Rà sinh viên, SV-01–SV-05 | Như trên; chỉ đọc |
| lec06_review_academic | Rà học thuật–giảng dạy, HTGD-01–HTGD-06 | Như trên; chỉ đọc |
| lec06_review_argument | Rà mạch lập luận, ARG-01–ARG-04 | Như trên; chỉ đọc |
| lec06_outline_editor | Chỉnh sửa riêng sau cổng và năm báo cáo | Như trên; chỉ ghi ba tệp planning đã chỉ định |

Đây là ghi nhận cấu hình lời gọi do điều phối viên cung cấp, không phải xác minh độc lập mô hình thực chạy hoặc tuyến thanh toán. Không đọc/nạp `.env` hoặc `.env.*`; không dùng OpenRouter, cầu nối, API/CLI gọi mô hình thay tác tử gốc.

### Các vấn đề phát hiện trong lượt soạn và trạng thái

| Mức độ | Trang/phạm vi | Vấn đề và bằng chứng | Quyết định, kiểm lại |
|---|---|---|---|
| Nghiêm trọng | C06, nguồn CG | Dẫn phụ lục C.3 của BV cho phương pháp lặp; phần này thực tế là phân tích LU/Cholesky/LDLᵀ | Đã bỏ dẫn sai, dùng DL§8.6.2 và HF§3–4; điều phối viên xác minh nguồn |
| Trung bình | A03 | Dùng tên SGD cho ví dụ gradient đầy đủ có thể tạo hiểu nhầm về nhiễu | Đã đổi thành hạ gradient; công thức và giá trị F giữ đúng |
| Nghiêm trọng | B02/HT2 | Luận điểm “độ dài bước giảm” thiếu điều kiện gradient, trong khi chỉ tốc độ học hiệu dụng chắc chắn không tăng | Đã đổi thành tốc độ học hiệu dụng với η cố định; phép tính dãy gradient riêng vẫn được giữ |
| Nghiêm trọng | B06/HT4 | Hiệu chỉnh moment không tự là không chệch với một moment chung khi dữ liệu không dừng | Đã giải thích tổng trọng số 1−β^t; nêu giả thiết moment không đổi nếu dùng từ không chệch |
| Nghiêm trọng | C03/HT5 | Hội tụ bậc hai cần đủ gần nghiệm và bước đầy đủ trong pha cục bộ | Đã bổ sung điều kiện; BV§9.5.3 tr.488–489 được điều phối viên đọc |
| Trung bình | B05/HT3 | RMSProp dùng epsilon ngoài căn khác thuật toán 8.5 của DL | Đã ghi rõ biến thể, không đồng nhất hai hằng số; mọi phép tính tay dùng mẫu dương và ghi riêng ε=0 |
| Nghiêm trọng | E03/HT8 | BN khi học làm đầu ra phụ thuộc lô, khác giả thiết tổng hàm độc lập từng mẫu | Đã nêu mục tiêu kỳ vọng theo lô; phân biệt thống kê học/suy luận và phương sai sau chuẩn hóa |
| Trung bình | Các ranh giới C/D, D/E, E/F | Cần nêu rõ thay dữ kiện hoặc thành phần nào, tránh danh sách phương pháp rời | Đã ghi cầu nối Av→(s,y), bước→thành phần, trong quá trình→theo giai đoạn; chờ rà độc lập |

### Kiểm cấu trúc và phép tính của tác tử soạn

Ghi nhận tự kiểm của tác tử soạn trước rà độc lập (cần đọc cùng đính chính dưới): chạy chương trình Python tạm `/tmp/lec06-check.py` sau khi ghi tệp. Kết quả đạt: 45 mã duy nhất và ánh xạ một–một với 45 mục storyboard; mỗi trang đủ 9 trường; 7 đề kiểm tra đủ câu hỏi, kiến thức, đáp án, tiêu chí, hoạt động; tổng 2,00 tiết lý thuyết + 1,00 tiết bài tập. Markdown không có dấu phân cách công thức thay thế hoặc ký tự điều khiển do escape; dấu dollar cân bằng, bảng không chứa dấu phân cách cột trong công thức.

Tính lại bằng phân số hữu tỷ các ví dụ: V1 giá trị mục tiêu 3,2 và 288; V7 hai vòng CG cho d=(1,1/4), phần dư bước đầu(3/5,−3/5); V8 P₁y=s và det(P₁)=1/2; V10 sau hai lượt có (3/4,5/8), F=43/64; V13 mất mát 72/625=0,1152; V15 nghiệm 1→1/2→2/5; B09 moment Adam m̂₂=2/3, v̂₂=12/7. Dấu hướng, giả thiết SPD và giới hạn của continuation/Polyak được kiểm đại số trong nội dung. Không tuyên bố các ví dụ là số liệu thực nghiệm.

### Biên tập no-ai-slop của lượt soạn trước rà độc lập

Bảng dưới ghi nguyên kết luận tự kiểm ở lượt soạn; các vai độc lập sau đó phát hiện câu lặp và lý do thiếu cụ thể. Kết quả đã được đính chính và biên tập lại trong mục hợp nhất cuối vòng, không dùng bảng cũ để chứng nhận bản sửa.

Chế độ **Edit**. Đã đọc `/home/tqlong/.codex/skills/no-ai-slop/SKILL.md` và `eval.md`; phạm vi: tiêu đề, luận điểm, ý chính, ví dụ, câu hỏi, ghi chú soạn, phần phân tích và storyboard. Giọng văn cần giữ là học thuật, thuật ngữ ổn định, giả thiết rõ; không có giọng cá nhân hoặc hài hước cần giữ. Ví dụ mới được người dùng cho phép trong nhiệm vụ làm lại và đã ghi nhãn tự dựng; không thêm tuyên bố thực nghiệm.

| Nhóm kiểm trong eval.md | Kết quả và cách đối chiếu |
|---|---|
| Nguyên tắc 1–4: giữ ý, giọng và mức biên tập | Đạt; giữ phạm vi §§8.5–8.7, LLO và giả thiết. Thay tuyến cũ theo yêu cầu cụ thể của người dùng; không biên tập toán thành khẳng định đơn giản hơn |
| Nguyên tắc 5–6: thông tin cần trước, thứ tự phù hợp | Đạt; mở đầu đúng tiêu đề→nội dung→động lực; số xuất hiện trước thuật toán; không mở trọng tâm bằng danh sách ký hiệu |
| Nguyên tắc 7–9: câu cụ thể, phép thử tính thay thế và động từ | Đạt; mỗi trang nêu dữ kiện/phép tính/kết quả; loại lời ca tụng, dẫn nhập rỗng và nhấn mạnh không có căn cứ |
| Nguyên tắc 10–11: cấu trúc và câu rõ | Đạt; phân biệt cơ chế, giả thiết và kết luận; tách thuật toán với ví dụ khi tải ký hiệu tăng |
| Từ cần bỏ | Đạt; không dùng khẩu hiệu, từ quảng bá hoặc trạng từ rỗng; tên thuật toán và thuật ngữ được giữ nhất quán |
| Mẫu cần bỏ 1–3 | Đạt; không dùng đối lập kịch tính, câu hỏi tu từ, dẫn nguồn mơ hồ hoặc xếp hạng phương pháp vô điều kiện |
| Mẫu cần bỏ 4–6 | Đạt; loại lời hướng dẫn giảng viên khỏi nội dung học thuật dự kiến; phần tổng hợp giữ vì đo chuẩn đầu ra, không làm kết luận kịch tính |
| Mẫu cần bỏ 7–9 | Đạt; bảng dùng cho so sánh, nhãn dùng theo template; không trang trí, không dùng gạch ngang dài thành nhịp văn |
| Đọc cuối 1–4 | Đạt; tác tử tự đối chiếu trực tiếp eval.md sau sửa; những trường lặp theo template có chức năng kiểm chứng, không lặp câu luận điểm |
| Đọc cuối 5 | Đạt trong phạm vi tệp; bản đã sửa là outline và storyboard, phần “Thay đổi biên tập” dưới đây thay mục What changed tiếng Anh |
| Đọc cuối 6 | Không áp dụng cho tác tử soạn vì dùng Edit; các vai chỉ đọc sau dùng Detect |

Thay đổi biên tập: làm tiêu đề gọi đúng khái niệm; thay lời nhận xét tổng quát bằng dữ kiện và điều kiện; sửa cách gọi AdaGrad/moment/Newton để giữ ranh giới toán học; bỏ câu ca tụng và lời điều phối lớp. Không dùng điểm bộ phát hiện AI hoặc suy đoán tác giả làm bằng chứng.

### Chuẩn bị Codex Slides trong lượt soạn

Điều phối viên quản lý dự án Codex Slides `20260901031052-lecture-06-t-i-u-m-ng-s-u-bjy1`, dự kiến thay outline bằng dữ liệu trang tường minh. Tác tử soạn không gọi mô hình ngoài để sinh lại nội dung. Chưa có bằng chứng Browser tích hợp hoặc rà giao diện ở vòng này; điều phối viên ghi thao tác và kết quả thật sau cùng.

Các báo cáo độc lập và quyết định xử lý được hợp nhất ở mục sau; xác nhận chốt kế hoạch vẫn chờ điều phối viên. Chưa chạy kiểm định HTML/KaTeX, hình, bàn phím hay màn hình rộng/hẹp vì không triển khai sản phẩm công khai. Không commit hoặc push trong phạm vi tác tử soạn.

### Tích hợp phân tích và sửa tổng cụm

Điều phối viên xác minh `.gitignore` bỏ qua Markdown mới trong học kỳ; không force-add và không sửa quy tắc. Đã tích hợp nguyên nội dung tám phần phân tích vào cuối outline.md, cập nhật tham chiếu trong storyboard, xóa analysis.md vừa tạo để chỉ có một nguồn. Kiểm định storyboard phát hiện hai khoảng mã ở ranh giới mạch kéo theo trang kiểm tra không thuộc cụm; đã thay bằng tập hợp tường minh. KN4 là 0,28 tiết lý thuyết+0,15 tiết bài tập; KN6 là 0,29+0,12. Tất cả 14 tổng cụm đã tính lại từ hợp các mã tham chiếu. Tổng toàn bài vẫn 2+1 tiết.


### Hợp nhất cổng storyboard và năm báo cáo độc lập

Đầu vào của tác tử chỉnh sửa là toàn bộ bản 45 trang/7 mạch, tám phần phân tích, storyboard và sáu báo cáo cuối. Các báo cáo chỉ rà kế hoạch; không chứng nhận HTML cũ hoặc sản phẩm công khai. Bản hợp nhất dưới giữ mọi mã phát hiện, kể cả vấn đề trùng. Khi các vai đánh mức khác nhau, ghi mức cao nhất và nêu khác biệt nếu liên quan. “Đã sửa” là trạng thái biên tập, chưa thay kết luận rà lại độc lập.

| Báo cáo, vai | Phạm vi và kết luận đã nhận |
|---|---|
| `/tmp/lec06-storyboard-gate.md`, cổng storyboard | Đủ 45 trang, 14 cụm, 7 mạch và 7 kiểm tra; chấp nhận chức năng/tiên quyết, nêu SB01–SB05. KN9/KN13 được gộp có lý do, KN10 rút gọn vì là nội dung hỗ trợ |
| `/tmp/lec06-review-student.md`, sinh viên | Rà đủ 45 trang; SV-01–SV-05 và thuật ngữ cát tuyến. Lưu ý tái tạo hệ số CG, hai nguyên nhân ở B08, tải E08/F07 và cầu nối gradient |
| `/tmp/lec06-review-math.md`, toán học | Tính kiểm độc lập các ví dụ, bảy đáp án và giả thiết; M01–M07. Kết quả số đúng ở bản trước sửa; D05 đổi dữ kiện trong lượt biên tập nên phải rà lại đáp án mới |
| `/tmp/lec06-review-expert.md`, chuyên gia | Xác nhận phạm vi LLO14–16, EX01–EX07; xác minh trực tiếp SH cho truy hồi CG, vị trí ST và trung bình đều của DL |
| `/tmp/lec06-review-academic.md`, học thuật–giảng dạy | HTGD-01–HTGD-06; nêu CG chưa có phép sinh hệ số/ẩn cập nhật là chặn bàn giao, nhu cầu BN và rho là nghiêm trọng; các sửa đều thực hiện trong trang sẵn có |
| `/tmp/lec06-review-argument.md`, mạch lập luận | ARG-01–ARG-04; yêu cầu sườn chung hiện trên mở bài, động cơ điểm đầu và tách phần dư với kiểm hướng Newton–CG; chấp nhận chức năng bảy mạch |

Điều phối viên chấp nhận toàn bộ sửa cục bộ trong chỉ dẫn `/tmp/lec06-editor-brief.md`, kể cả đổi gradient D05, kiểm hướng Newton–CG và ứng dụng đặc trưng thưa. Không thêm/bỏ/đổi thứ tự trang. Các quyết định giữ dữ kiện hoặc không mở rộng phạm vi được ghi riêng trong bảng.

| Mã báo cáo/vai | Mức độ | Chứng cứ trước sửa | Quyết định và vị trí sau sửa | Trạng thái |
|---|---|---|---|---|
| SB01; HTGD xác nhận; ARG đã biết | Trung bình | Đề dùng “ở A04”, “ở D02”, “ở E04”, “ở F03/F05”, “trong V15” thay dữ kiện | Đã sửa A05/D05/E08/F07/G02: ghi trực tiếp bài toán, ma trận, hàm và phân phối; không còn mã trang/ví dụ trong bảy câu hỏi | Đạt kiểm câu hỏi của điều phối viên, học thuật và mạch lập luận |
| SB02 | Trung bình | KN4 ghi thừa 0,11 BT; KN6 thừa 0,12 BT do cộng trang không thuộc ánh xạ | Giữ sửa sớm của điều phối viên; xác nhận KN4={B08,C01,C02,C03,C04,C08}: 0,28 LT+0,15 BT; KN6={C07,D01,D02,D03,D04,D05}: 0,29 LT+0,12 BT | Đạt kiểm 14 hợp trang và tổng cụm |
| SB03; M01; EX01; HTGD xác nhận | Nghiêm trọng (SB/M: trung bình) | B05 có xuống dòng và “ho” thay rho trong đặc tả hình | Đã ghi đúng $(1-\rho)\rho^k$ và $\rho$; kiểm literal, không có xuống dòng trong biểu thức hoặc ký tự điều khiển | Đạt tái kiểm toán, học thuật và kiểm literal |
| SB04; HTGD-03; ARG-04 | Trung bình (SB/ARG: nhẹ) | A01/A02 nêu MT1–MT3 nhưng thiếu LLO16; B08 nêu MT2 thiếu LLO15 | Đã sửa ánh xạ A01/A02 thành LLO14–16/CLO2–4; B08 thêm LLO15 và ghi rõ chuẩn bị MT2 ở C01. Đầu mạch A phản ánh cả MT1–MT3 | Đạt tái kiểm mạch lập luận và đối chiếu chuẩn đầu ra |
| SB05; M06; Detect của cả năm vai | Nhẹ | “riêng A05...” sao chép sáu đề; “Kết quả cần thiết” và quyết định lặp luận điểm; hoạt động A01/G03 rỗng | Đã viết kiến thức đo riêng từng đề, lý do/định hướng biên tập/hoạt động riêng cho 45 trang; A01 nhận diện, G03 truy nguyên nguồn. Giữ đủ trường bắt buộc | Đạt tái kiểm học thuật, mạch lập luận và Edit |
| SV-01; HTGD xác nhận | Chặn bàn giao (SV: trung bình) | C05 cho sẵn α,β,p; C06 cho phép đưa β,p khỏi mặt trang | C05 thêm tối thiểu trên đường, điều kiện liên hợp và phép thế số α₀,β₀,p₁; C06 giữ toàn bộ vòng cập nhật trên mặt trang, chuyển giải thích chi phí/hội tụ vào ghi chú; KN5 đồng bộ | Đạt tái kiểm toán và học thuật |
| SV-02; HTGD/ARG xác nhận | Trung bình | B08 ghép thiếu tương tác với phản ví dụ moment một chiều | Chuyển phản ví dụ sang ghi chú học thuật B07; B08 chỉ giữ hạng chéo và hình elip nối C01. KN3, HT4, vai trò/nguồn/kết nối đồng bộ; không đồng nhất hai nguyên nhân | Đạt tái kiểm mạch lập luận |
| SV-03; EX06; HTGD xác nhận | Trung bình (EX: nhẹ) | E08 bốn ý và F07 ba ý nhiều phép tính trong 0,07 BT mỗi trang | E08 giữ tính độc lập phương sai BN; cho điểm sau lượt khối và kết quả phản ví dụ. F07 giữ tính bước tinh chỉnh; cho đạo hàm/ nghiệm ở hai ý đối chiếu. Tiêu chí và hoạt động phân biệt tính/giải thích; giữ tổng từng mạch | Đạt tái kiểm học thuật về tải kế hoạch; chưa diễn tập |
| SV-04; HTGD xác nhận | Trung bình | E07 chỉ có đạo hàm đầu ra–đầu vào nhưng kết luận về gradient | Bổ sung h₀,h₅, mất mát ℒ, quan hệ dây chuyền và gradient tham số tầng trước; tích minh họa là một thừa số. KN10/V12 đồng bộ | Đạt tái kiểm toán và mạch lập luận; ký hiệu mất mát đã tách |
| SV-05; M07; HTGD xác nhận | Nhẹ | KN12 ghi “Đạo hàm bậc bốn” | Sửa thành đạo hàm cấp một và cấp hai của đa thức bậc bốn; không tăng tiên quyết | Đạt đối chiếu tiên quyết |
| M02; HTGD xác nhận | Trung bình | A03 dùng θ₁ vừa tọa độ vừa vectơ lặp, g₀ trái quy ước | Dùng điểm hiện tại θ, g và θ⁺; giữ θ₁,θ₂ là tọa độ; đối chiếu HT0 và dữ kiện V1 | Đạt tái kiểm toán |
| M03 | Trung bình | HT7 ghép M=P⁻¹ nhưng không nói η | Làm rõ η=1 cho hướng d=−Pg; bước thực tế αd dùng η=α trong HT1 | Đạt tái kiểm toán |
| M04 | Nhẹ | E08 gọi bốn giá trị là “bốn đặc trưng” | Sửa thành một đặc trưng trong lô bốn mẫu ở đặc tả và câu hỏi | Đạt kiểm dữ kiện và đáp án |
| M05; EX03 | Trung bình (M: nhẹ) | E06/HT10 dẫn (8.39) cho trung bình đều | Dẫn DL §8.7.3, tr.318, đoạn định nghĩa không đánh số; (8.39) chỉ gắn biến thể trung bình mũ | Đạt đối chiếu E06/HT10 với phát hiện nguồn đã xác minh |
| EX02 | Trung bình | DL/HF chưa là nguồn trực tiếp cho đúng dạng truy hồi phần dư C06 | Thêm SH (CMU, Shewchuk, 1994) vào C05/C06/HT6 và danh mục; ghi vị trí truy hồi, giả mã, SPD, hữu hạn vòng/sai số. Nêu ngưỡng biên soạn theo max(1, norm b) khác SH B2 theo norm r₀. DL giữ phạm vi; HF cho Newton–CG. Không tải tài sản vào kho | Đạt tái kiểm toán và nguồn SH trực tiếp |
| EX04 | Nhẹ | B05 dẫn ST tr.35–39 đã chuyển sang Adam/lịch bước | Sửa ST tr.32–33; DL/TO giữ nguồn công thức. Danh mục DL bổ sung §8.2.1 tr.279–280 do điều phối viên đã đọc cho A03 | Đạt đối chiếu vị trí nguồn theo báo cáo chuyên gia |
| EX05; HTGD-01 | Nghiêm trọng (EX: trung bình) | E01 mới liệt kê thành phần, E02 tính BN chưa có nhu cầu chuẩn hóa | E01 nêu thang đầu vào tầng ảnh hưởng độ nhạy tham số; E02 đặt nhiệm vụ đưa vị trí/thang hai lô a,a+4 về quy ước chung trước tính. KN7/V9/phiếu khái niệm đồng bộ; không suy tăng tốc hội tụ | Đạt tái kiểm học thuật và mạch lập luận |
| EX07 | Nhẹ | G03 thiếu BV dù C03/HT5 dùng kết quả Newton | Ghi chú G03 thêm Boyd–Vandenberghe, chương/mục/trang/URL và SH; danh mục hiển thị giữ ngắn | Đạt đối chiếu danh mục và ghi chú G03 |
| HTGD-02 | Trung bình | B03 mới gọi tên đặc trưng thưa; B05 chưa có ứng dụng sau công thức | B03 nối tọa độ ít hoạt động với tốc độ hiệu dụng η/(1+ε). B05 dùng tọa độ mất gradient: RMSProp giảm 1/2→1/4, AdaGrad giữ 1; hệ quả ρ^k giữ ε>0. Đồng bộ KN1/KN2/phiếu, không kết luận bước tốt hơn | Đạt tái kiểm học thuật, toán và mạch lập luận |
| HTGD-04 | Trung bình | D05 nhân P₁ với đúng y đã kiểm; C08 trùng hệ ví dụ | Đổi riêng D05 sang g=(1,0): d=(−3/4,1/2), gᵀd=−3/4. Giữ C08 vì chọn giảm chấn và kiểm ngưỡng đã tạo nhiệm vụ mới; không thêm vòng tính | Đạt tái kiểm toán và học thuật |
| HTGD-05 | Nhẹ | CG/SPD dùng trước lần ghép tên; L-BFGS chưa giải thích dạng bộ nhớ | Thêm quy ước viết tắt LLO/CLO, SGD, SPD, CG, BN, tên BFGS trong kế hoạch; CG được ghép ở C05, SPD tại A04, BN tại E03, L-BFGS tại D04 | Đạt đối chiếu lần xuất hiện đầu |
| HTGD-06; Detect SV/ARG | Nhẹ | “adaGrad”, “rMSProp”, “hessian”, “bFGS”, “newton”, “secant” thiếu nhất quán | Chuẩn hóa tên riêng, cát tuyến, elip và khoảng trắng; không đổi giả thiết/ký hiệu để rút văn | Đạt kiểm thuật ngữ trong văn bản, loại trừ URL |
| ARG-01 | Nghiêm trọng | A02 chỉ có ba nhánh, bộ thành phần đầy đủ xuất hiện lần đầu ở E01 | A02 hiện sơ đồ đầy đủ trên tuyến; A04 xét một bước; E01/G01 hồi chiếu cùng nhãn. Đồng bộ đầu mạch A, HT0, cơ sở chung và storyboard | Đạt tái kiểm toàn bộ mạch lập luận |
| ARG-02 | Trung bình | F01 nêu nhu cầu “điểm đầu được học” nhưng chưa chỉ giới hạn của khởi tạo | Thêm gradient bằng 0 tại (0,0), khác 0 tại (2,1) của cùng F; KN11/V13/HT11 đồng bộ. Chỉ kết luận quỹ đạo phụ thuộc điểm đầu | Đạt tái kiểm toán và mạch lập luận |
| ARG-03 | Trung bình | C07 chỉ kiểm phần dư cho nghiệm gần đúng nhưng dùng bước ngoài | C07/HT6/G02(b) đặt d₀=0, g=0 thì dừng/kiểm điểm dừng, g≠0 thì kiểm gᵀd<0. Nếu không đạt vì sai số/giải gần đúng: siết dung sai/giải lại hoặc −g kèm tìm bước | Đạt tái kiểm toán và mạch lập luận |
| ARG Detect, bản đồ KN0–KN13 | Nhẹ | Cả 14 cụm lặp “Sản phẩm học tập là phép tính hoặc phân biệt...” | Viết đầu ra riêng theo đại lượng và cơ chế từng cụm; giữ tham chiếu đề kiểm tra/đáp án | Đạt tái kiểm 14 sản phẩm học tập |

### Sửa bổ sung trong lượt rà lại toán học

Điều phối viên chuyển phát hiện nhẹ ở E07: L vừa là mất mát vừa là độ sâu ở ghi chú/E08. Đã đổi mất mát thành $\mathcal L$, nêu rõ $h_0,\ldots,h_5\in\mathbb R$ trong ví dụ; giữ L cho độ sâu. Công thức dây chuyền, V12 và KN10 đã đồng bộ. Đây là sửa ký hiệu, không đổi phép tính; vai toán đã xác nhận bản cuối. Bằng chứng các lượt tái kiểm nằm trong mục chốt của điều phối viên.

### Đính chính kết quả tự kiểm trước vòng sửa

Tự kiểm cấu trúc và kết xuất công thức có thể không bắt lỗi về nghĩa. Công thức B05 đã bị tách thành các dòng “ho”; phép kiểm ký tự điều khiển không phát hiện sau khi xuống dòng được chuẩn hóa, và thông báo KaTeX “0 lỗi” của lượt kiểm công thức trước không bảo đảm ký hiệu rho còn đúng. Cổng storyboard và các vai toán/chuyên gia/học thuật đã phát hiện; tác tử chỉnh sửa khôi phục literal `\rho` và kiểm trực tiếp ý nghĩa trọng số. Không xóa phát hiện này dù đã sửa.

Bảng no-ai-slop của lượt soạn ghi “không lặp câu luận điểm” chưa phù hợp bản thực tế mà các vai đã đọc. Vòng này đã bỏ câu ngoại lệ A05 sao chép, viết lại lý do/quyết định/hoạt động từng trang và đầu ra từng cụm. Nguồn DL/HF thay cho BV C.3 là sửa sớm đúng hướng nhưng chưa đủ nguồn trực tiếp cho dạng truy hồi CG; EX02 được xử lý tiếp bằng SH. Không dùng kết quả tự kiểm trước làm bằng chứng thay rà lại bản mới.

### Tự kiểm của tác tử chỉnh sửa và phạm vi bàn giao

Chế độ **no-ai-slop Edit**; đã đọc kỹ năng và `eval.md`, sau biên tập tự đối chiếu đủ nhóm nguyên tắc, từ/mẫu cần bỏ và lượt đọc cuối. Phạm vi: tiêu đề, luận điểm, nội dung học thuật/câu hỏi dự kiến, ghi chú soạn, tám mục phân tích, 14 cụm và 45 mục storyboard; chỉ cập nhật phần nhật ký vòng mới. Giữ văn phong học thuật, giả thiết, ký hiệu, nguồn và các phân biệt toán học. Không dùng điểm phát hiện AI hoặc suy đoán tác giả.

| Nhóm tự kiểm sau sửa | Kết quả |
|---|---|
| Giữ ý, phạm vi, cấu trúc và giọng học thuật | Đạt ở mức biên tập: 45 trang/7 mạch, ba mục tiêu và giả thiết được giữ; sửa số ở D05 theo quyết định điều phối viên |
| Câu cụ thể, thông tin cần trước, phép thử tính thay thế | Đạt: nhu cầu BN/điểm đầu có dữ kiện; 45 lý do chỉ chức năng học tập; 14 đầu ra chỉ đại lượng/cơ chế riêng |
| Loại lặp khuôn, đổi từ tùy tiện, dẫn rỗng và lời nhấn mạnh | Đạt: bỏ sáu đuôi A05, lặp luận điểm và hoạt động rỗng; chuẩn hóa cát tuyến/tên riêng; giữ nhãn có chức năng |
| Bảo toàn giả thiết, ranh giới và kiểm chứng | Đạt: không giản lược SPD, epsilon, gradient đầy đủ/ước lượng, hướng/bước, phụ thuộc lô hoặc giới hạn phi lồi |
| Hình thức và lượt đọc cuối | Đã tự đọc phần thay đổi cùng toàn bộ phần giữ, kiểm dòng trống trước danh sách; tài liệu hoàn chỉnh nằm trong ba tệp, thay đổi và giới hạn bàn giao trong mục này |

Đã chạy lại `/tmp/lec06-check.py`: đạt 45 mã duy nhất, 9 trường/trang, 7 kiểm tra đủ trường, ánh xạ storyboard một–một và tổng 2 LT + 1 BT; các phép tính gốc trong chương trình vẫn đạt. Kiểm riêng sau biên tập bao gồm hợp trang của 14 cụm, số trang mỗi mạch, công thức rho, dữ kiện/đáp án D05 mới, hệ số CG, thống kê vắng gradient, đạo hàm hai điểm đầu và đề tự đủ không có mã nội bộ. Bằng chứng kết quả chi tiết được ghi trong báo cáo bàn giao tác tử; `git diff --check` đã chạy và đạt trước bàn giao. Chương trình bổ sung `/tmp/lec06-editor-check.py` đạt toàn bộ 14 tổng cụm và các kiểm nêu trên.

Lịch sử sau sentinel được giữ nguyên từng byte (đối chiếu SHA-256 với bản trước tác tử chỉnh sửa). Không sửa HTML/CSS, tài liệu học tập, chỉ mục, AGENTS.md hoặc .gitignore; không chạy lại chương trình sinh dàn bài, không commit/push và không gọi Codex Slides trong vai chỉnh sửa. Không chứng nhận KaTeX trong trình duyệt, hình, bàn phím hoặc khả năng đọc của sản phẩm chưa triển khai. Đồng bộ dự án Codex Slides và Git do điều phối viên thực hiện sau rà lại.

Phạm vi tái kiểm đã thực hiện: toán học tại các công thức, ví dụ và đề bị sửa; học thuật tại CG, nhu cầu BN/khởi tạo, ứng dụng và tải kiểm tra; mạch lập luận trên toàn bộ 45 trang vì thay mở bài. Nguồn SH được đọc lại trực tiếp; điều phối viên đối chiếu các sửa ST/Polyak/BV với báo cáo nguồn. Kết quả và giới hạn của từng vai được ghi dưới đây.

### Tái kiểm và quyết định chốt của điều phối viên

Các kết quả dưới đây thay trạng thái chờ sau biên tập, không xóa báo cáo hoặc phát hiện trước đó.

| Vai/phép kiểm | Phạm vi và bằng chứng | Kết luận |
|---|---|---|
| Toán học, `lec06_theory_sources` | Tái tính các thay đổi A03, B05, C05–C07/HT6, D05/HT7, E07/E08, F01/F07/G02; đọc SH trang PDF 38 và 56. Chương trình phân số hữu tỉ kiểm lại gradient mới, hướng, hệ số CG và truy hồi RMSProp | Đạt; không còn vấn đề chưa xử lý trong phạm vi toán |
| Học thuật, `lec06_review_academic` | CG có phép sinh hệ số và vòng đủ; BN có nhu cầu; B03/B05 dùng kết quả; A02 có sườn; E08/F07 giảm tính lặp nhưng giữ mục tiêu | Đạt trên bản trước sửa ký hiệu mất mát E07; chênh lệch E07/V12 đã được vai toán kiểm đầy đủ |
| Mạch lập luận, `lec06_review_argument` | Rà lại 45 trang/7 mạch, 14 đầu ra, 7 câu hỏi; ARG-01–04, toàn bộ ranh giới phần và sự hồi chiếu A02/E01/G01 | Đạt; không còn lỗi chặn hoặc nghiêm trọng về mạch |
| Điều phối viên | Đối chiếu cấu trúc, chín trường/trang, 7 kiểm tra đủ dữ kiện, 14 tổng cụm, tổng 2 LT + 1 BT; kiểm tên riêng, thứ tự/tiêu đề và lịch sử nhật ký nguyên byte | Đạt trong phạm vi kế hoạch |
| Cú pháp công thức | Kết xuất 511 đoạn công thức trong outline/storyboard bằng KaTeX cục bộ; kiểm riêng literal rho và đọc lại nội dung toán | 0 lỗi cú pháp; không dùng kết quả này thay kiểm nghĩa hoặc kiểm trực quan |

Hai chỉnh nhẹ phát hiện trong tái kiểm đã xử lý: E07 từng dùng L cho cả mất mát và độ sâu; nay mất mát là $\mathcal L$, $h_0,\ldots,h_5\in\mathbb R$ và L chỉ độ sâu. Vai toán đã đọc lại toàn bộ chênh lệch E07/V12. Quyết định nội bộ của storyboard E03 đổi “bảo vệ giả thiết độc lập mẫu” thành “phân biệt mục tiêu độc lập mẫu với mục tiêu phụ thuộc lô”, đúng đề xuất cuối của vai mạch lập luận và nội dung E03/HT8 đã kiểm. Điều phối viên đọc lại câu đổi; không đổi thứ tự, công thức hoặc vai trò trang.

Bản outline được chốt có SHA-256 `c1d967f0557bd60d133ed6de09c16f6b66e8d70550ded70652c7add01665e0d5`. Storyboard sau chỉnh từ E03 có SHA-256 `df39d4f02536f8365696399a00eafc2e51a170b5cf36f52dcf1187d1fe7f4eb0`; bản vai mạch lập luận đã rà trước đúng một câu đổi này có SHA-256 `8ff05eb44806d1d7ace940079209a39923df6db45458df2fba3bc01fc234a76d`. Điều phối viên đã đối chiếu hash, đọc báo cáo cuối và chấp nhận kết quả. Các báo cáo làm việc `/tmp/lec06-recheck-math.md`, `/tmp/lec06-recheck-academic.md`, `/tmp/lec06-recheck-argument.md` đã được tổng hợp ở đây; căn cứ bàn giao không phụ thuộc việc giữ các tệp tạm.

### Đồng bộ Codex Slides và giới hạn kiểm định

Dự án `20260901031052-lecture-06-t-i-u-m-ng-s-u-bjy1` đã nhận đủ 45 trang theo thứ tự mới bằng `revise_outline` với danh sách `pages` tường minh; không gọi mô hình để sinh lại dàn bài. Đã đọc lại `get_project`: 45 mục outline, 45 trang chờ triển khai, cấu hình 45 trang, giai đoạn `outline`; toàn bộ tiêu đề và ý khớp dữ liệu đã gửi. Sáu tham chiếu mã nội bộ trong ý chính được thay bằng dữ kiện/công thức sẵn có khi chuyển vào outline dự án, để mã không trở thành nội dung trang. Dàn bài chi tiết vẫn là tệp trong kho.

Đã cập nhật tên/phạm vi dự án và gắn đề cương chính thức bằng API cục bộ xác định; thao tác chỉ sửa siêu dữ liệu, không gọi mô hình. Đề cương có vai trò nguồn nội dung bắt buộc cho Buổi 6, LLO14–16, 2 tiết lý thuyết + 1 tiết bài tập. Hai Design Files `uploaded/outline.md` và `uploaded/storyboard.md` đã được đối chiếu trùng từng byte với bản kho; `generated/brief.md` ghi vai trò tài liệu, nguồn và phạm vi kế hoạch. Nhật ký này được bàn giao cùng hai tệp.

Liên kết trả về cho đúng bước dàn bài: [Codex Slides, Bài 06](http://127.0.0.1:4311/project/20260901031052-lecture-06-t-i-u-m-ng-s-u-bjy1?checkpoint=outline). Browser tích hợp không có trong phiên, nên chưa xác nhận bề mặt hiển thị. Không có hình trang chiếu mới, không tuyên bố đã kiểm trình chiếu, bàn phím, tràn nội dung, khả năng đọc hoặc nhịp giảng thực tế. Các kiểm định ấy thuộc bước triển khai RevealJS sau này.

Ba tệp planning là phạm vi thay đổi trong kho. `git diff --check` đã đạt; commit và push được điều phối viên thực hiện theo ủy quyền trong AGENTS.md sau kiểm staging. Chưa đồng bộ HTML, ghi chú hoặc bài tập công khai với kế hoạch mới.

## Lịch sử trước khi xây dựng lại dàn bài

Phần dưới giữ nguyên nội dung nhật ký trước vòng 2026-09-26. Các mô tả 36 trang, 6 mạch và trạng thái sản phẩm chỉ có giá trị lịch sử.

---

# Nhật ký rà soát Bài giảng 06

## Kiểm định ghi chú bài giảng — 2026-08-31

- Ghi chú công khai gồm 6 mạch, 14 chủ đề; mỗi chủ đề có mục tiêu đọc hiểu, định nghĩa và giả thiết, trực quan, ví dụ tính được, ứng dụng AI, điểm dễ nhầm, câu hỏi kiểm tra và đầu ra.
- Bảy kết quả về Adam, Newton, gradient liên hợp, BFGS, chuẩn hóa theo lô, hạ theo khối và trung bình Polyak được tách thành phần chứng minh sau ca tích hợp.
- Rà toán học độc lập đạt sau khi bổ sung trường hợp $r_0=0$ cho gradient liên hợp, viết nghiệm gần đúng bằng sai số giá trị hàm, định nghĩa $q_\star$ trên cặp $(x,y)$ và giữ đúng chiều suy ra của bất đẳng thức hạ trơn.
- Hậu kiểm `no-ai-slop` đạt; các câu dẫn chứng minh lặp, lời xác nhận quy trình và ba chỗ chuyển mạch đột ngột đã được sửa.
- Sáu SVG của ghi chú phân tích XML thành công, có `role="img"`, `title`, `desc`, không chứa script, tài nguyên mạng hoặc `foreignObject`; cả bản rộng 900 px và hẹp 600 px đã được kết xuất và xem trực tiếp, không có phần tử chồng hoặc bị cắt.
- Nguồn đúng của Martens (2010) là tệp ICML `https://icml.cc/Conferences/2010/papers/458.pdf`; đường dẫn Proceedings of Machine Learning Research từng xuất hiện trong ghi chú diễn giả của deck không phải trang bài báo này. Ghi chú dùng nội dung từ `sources/Deep_HessianFree.pdf` và không lặp lại URL sai.
- Codex Slides vẫn không khả dụng do giới hạn runtime đã ghi bên dưới. Kiểm định phát hành dùng RevealJS và viewer web tĩnh cục bộ; không tuyên bố đã kiểm bằng Codex Slides.

## Trạng thái

**Đã chỉnh sửa theo vòng rà soát cuối; chờ kiểm định trực quan bằng Browser.** Tệp RevealJS, outline và storyboard được đồng bộ ở 36 trang, 6 mạch. Các vấn đề nội dung của vai sinh viên, chuyên gia, toán học, học thuật–giảng dạy và mạch kể chuyện đã có quyết định và bằng chứng bên dưới; chưa tuyên bố đạt cổng trực quan bằng Codex Slides.

## Kiểm kê nguồn và quyền

| Nguồn | Vai trò | Quyền/quyết định |
|---|---|---|
| Đề cương UET.AI2012 DOCX chính thức | Phạm vi, LLO/CLO, 2 LT + 1 BT | Nguồn nội bộ do người dùng cung cấp; chỉ trích thông tin học phần |
| Goodfellow, Bengio, Courville (2016), Ch. 8 §§8.5–8.7 | Nguồn nội dung chính | Trích dẫn trang HTML chính thức của tác giả; không sao chép hình từ bản PDF phân phối không chính thức |
| Duchi et al. (2011); Kingma & Ba (2015) | AdaGrad, Adam | Dùng công thức và ghi nguồn; không lấy tài sản hình |
| Martens (2010), `sources/Deep_HessianFree.pdf` | Hessian-free, CG và giảm chấn | Dùng nội dung toán, tự vẽ sơ đồ; không sao chép hình thực nghiệm |
| Nocedal & Wright (2006) | Newton, BFGS, L-BFGS | Dùng phát biểu chuẩn và công thức; không sao chép hình |
| Ioffe & Szegedy (2015); Polyak & Juditsky (1992); Bengio et al. (2009) | Ba chiến lược LLO16 | Dùng định nghĩa/công thức, không dùng hình gốc |
| `sources/Optimization_2015_11_11.pdf` | Kiểm chéo | Quyền phát hành chưa xác minh; không đưa tài sản trực tiếp vào deck |

Không tải thêm nguồn MIT OpenCourseWare. Không dùng tệp `._*`. Bốn SVG trong `img/lec-06/` là hình tự vẽ, chỉ biểu diễn quan hệ toán học, không giả làm dữ liệu thực nghiệm.

## Sai khác có chủ ý so với mẫu

- Kế thừa cấu trúc RevealJS, nền sáng, bảng, thẻ, chân trang và màu từ `2526-2-another-course/`; không phụ thuộc runtime chéo.
- Dùng đúng 6 mạch `P/A/B/C/D/Z`, thay vì 7 mạch của Bài 05, để gộp sáu chiến lược LLO16 thành hai mạch có quan hệ rõ: ổn định cục bộ và thay đổi tuyến bài toán.
- Không giữ lịch sử thuật toán hoặc ảnh thực nghiệm trong mẫu tham khảo. Thay bằng ví dụ số kiểm được và SVG tự vẽ.
- Bổ sung Hessian-free và L-BFGS để làm rõ cách mở rộng CG/BFGS cho số chiều lớn; đây là triển khai trực tiếp phạm vi “phương pháp xấp xỉ bậc hai”, không mở sang một chương mới.
- Tách huấn luyện và suy diễn ở chuẩn hóa theo lô; bổ sung điều kiện $y^Ts>0$ cho BFGS và giảm chấn cho Newton để tránh lược giả thiết quyết định tính đúng.

## Giới hạn Codex Slides

- Runtime cục bộ là Node.js `18.19.1`, trong khi Codex Slides yêu cầu Node.js `>=20`.
- Lệnh `capabilities` trả được bề mặt lệnh, nhưng không có Browser tích hợp trong phiên tác tử để xác nhận màn hình tạo dự án.
- Các lần chạy trước trong cùng kho ghi nhận hợp đồng phiên bản giữa CLI và dịch vụ bị lệch; thao tác tải tệp/render có thể dừng với `ReferenceError: File is not defined`.
- Vì ba giới hạn trên, bản này không tuyên bố đã render, tải tệp hoặc rà trực quan bằng Codex Slides. RevealJS cục bộ là cơ chế dự phòng theo chỉ dẫn kho.

## Kiểm tra của tác tử soạn

- Bộ phân tích HTML xác nhận đúng 6 `<section>` ngoài, 38 `data-slide-id` duy nhất và 38 khối ghi chú diễn giả.
- 38 mã trong storyboard trùng tập và đúng thứ tự với 38 mã trong RevealJS.
- Mọi tham chiếu CSS, JavaScript, plugin, KaTeX và SVG đều là đường dẫn tương đối tồn tại trong `2627-1/`.
- KaTeX cục bộ được kết xuất thử lại sau chỉnh sửa; kết quả kiểm định cuối được ghi ở mục hợp nhất năm vai.
- Bốn SVG phân tích XML được và đều có `title`, `desc`; bốn lần nhúng trong HTML có `alt` cụ thể.
- `git diff --check` không báo lỗi trong phạm vi Bài 06. `xmllint` không có trong môi trường, nên kiểm tra XML dùng bộ phân tích chuẩn của Python.
- Kiểm tra tràn ở khung 16:9 và màn hình hẹp vẫn cần Browser hoặc tác tử kiểm thử trực quan độc lập. CSS cục bộ giữ thân bài ở mức `0.80em`, màn hình hẹp `0.78em`; bảng và mã dùng hệ số `0.90em`, nên cỡ hiệu dụng tối thiểu là `0.702em`.

## Các mục bắt buộc cho vòng rà soát độc lập

1. Kiểm toán số học A03–A08 và B03.
2. Kiểm tra quy ước Adam, dấu bước Newton/CG/BFGS, điều kiện giảm chấn và độ phức tạp.
3. Kiểm tra chu trình sáu bước trong storyboard và tính khả thi của 2 LT + 1 BT.
4. Rà đủ sáu chiến lược LLO16, đặc biệt phân biệt tiền huấn luyện, tiếp tục hóa và học theo chương trình.
5. Render 38/38 trang ở $1280\times720$ và khung hẹp; kiểm KaTeX, tràn, alt, điều hướng bàn phím và hash.

## Chỉnh sửa theo kiểm định storyboard

| Yêu cầu | Bằng chứng sau chỉnh sửa |
|---|---|
| Sáu chiến lược LLO16 có minh chứng riêng | Bản đồ hành trình tách sáu hàng; C08.1–3 đo BN, hạ theo khối, Polyak; D07.1–3 đo tiền huấn luyện, tiếp tục và chương trình học. P02 và outline trỏ đúng sáu minh chứng này. |
| Ánh xạ ứng dụng của tiền huấn luyện và tiếp tục | Đã sửa cột ứng dụng thành D07.1 cho tiền huấn luyện và D07.2 cho phương pháp tiếp tục, trùng với cột bài tập tương ứng; cùng một sản phẩm thiết kế vừa là vận dụng vừa là minh chứng đánh giá. |
| C03 giữ $\epsilon>0$ | HTML dùng $\epsilon=0{,}01$, tính $\widehat h\approx(\!-0{,}995,0{,}995)^T$; kết quả với $\epsilon=0$ chỉ xuất hiện dưới dạng giới hạn $\epsilon\to0^+$. |
| C05 phân biệt cập nhật và chu kỳ | Một cập nhật vô hướng có hệ số $1/(1+\alpha)\approx0{,}9901$; một chu kỳ hai tọa độ co biến được truyền theo $1/(1+\alpha)^2\approx0{,}9803$. |
| C06 có ví dụ Polyak tính được | Bốn véc-tơ dao động được cộng và chia trực tiếp, cho $\widehat\theta_4=(0,0)$. |
| C08 đòi dữ kiện và giới hạn | Đề bài yêu cầu cả hai; ghi chú nêu tiêu chí chấm riêng cho từng tình huống. |
| D03 có ví dụ continuation | Chuỗi $J^{(k)}(\theta)=(\theta-k)^2$, $k=0,1,2$, có nghiệm truyền $0\to1\to2$ và bước gradient kiểm được. |
| D07 tách continuation khỏi curriculum | Đề bài và ghi chú chấm riêng thay mục tiêu $J^{(k)}$ với thay phân phối $q_t$; yêu cầu báo kết quả riêng trên phân phối đích. |
| Z04 truy nguyên nguồn | Ghi chú diễn giả chứa URL ổn định cho sách, AdaGrad, Adam, HF, BN; DOI cho curriculum; tập/chương cho Polyak và Nocedal–Wright. |
| Danh mục nguồn và ký hiệu | Loại `sources/lecture6-appro.pdf` khỏi nguồn dùng; sửa ký tự tab thành $\theta$ và $\gamma$. |
| Thời lượng vòng storyboard trước | Phân bổ cũ P/Z 0,15/0,15; A 0,70/0,35; B 0,65/0,25; C 0,30/0,10; D 0,20/0,15 đã đạt tổng 2,00 LT + 1,00 BT nhưng được thay bằng phân bổ mới ở vòng hợp nhất năm vai bên dưới. |

## Hợp nhất năm vai rà soát — vòng 2026-08-30

Không xóa các phát hiện và bằng chứng của vòng trước. Bảng này ghi quyết định mới nhất sau khi đối chiếu đồng thời năm vai.

| Vai rà soát | Vấn đề | Mức | Trang | Quyết định | Trạng thái | Bằng chứng sau sửa |
|---|---|---|---|---|---|---|
| Sinh viên | Dữ kiện A03 thiếu siêu tham số và trạng thái đầu nên A08 không tự đủ để tính. | cao | A03, A06, A08 | sửa | đã xử lý | A03 hiển thị $\rho=0{,}9$, $\beta_1=0{,}9$, $\beta_2=0{,}999$, $\epsilon=10^{-8}$ và phân biệt khởi tạo $r_0=v_0^{\mathrm{RMS}}=m_0^{\mathrm{Adam}}=v_0^{\mathrm{Adam}}=0$; A08 gọi đúng bốn trạng thái rồi hiện trạng thái vòng 2 và kết quả gần đúng. |
| Sinh viên | Mã và bảng nhỏ hơn ngưỡng đọc khi chiếu; C08/D07 buộc đọc đề dài nhưng thiếu khung trả lời. | cao | CSS cục bộ, C08, D07 | sửa | đã xử lý về mã; chờ kiểm trực quan | Thân bài `0.80em`, màn hẹp `0.78em`; bảng/mã `0.90em`, cỡ hiệu dụng nhỏ nhất `0.702em`. C08 và D07 dùng ba cột tín hiệu–can thiệp–phép đo/giới hạn. |
| Chuyên gia | Newton/HF–CG lược điều kiện dương xác định; CG cắt ngắn có thể bị hiểu là luôn cho bước đủ tốt. | nghiêm trọng | B04–B06 | sửa và gộp | đã xử lý | B04 yêu cầu chọn/tăng $\lambda$ để $B\succ0$ hoặc kiểm $g^Tp<0$ trước tìm kiếm đường. B05 nêu $G\succeq0$, $\lambda>0\Rightarrow B\succ0$; ghi chú B06 nêu giới hạn CG cắt ngắn và kiểm giảm ở vòng ngoài. |
| Chuyên gia | BFGS và L-BFGS tách thành hai trang khái niệm nhưng chưa có phép kiểm số. | cao | B07, B08 | gộp và sửa | đã xử lý | B07 gộp công thức, điều kiện cặp cong và bộ nhớ; B08 tính $M_1$, $p=(0{,}25,-1{,}5)^T$, $g^Tp=-2{,}75$. |
| Toán học | A06 viết $g_t^2$ dễ mơ hồ; giá trị tọa độ hai của $\widehat v_2$ chưa đúng bốn chữ số. | cao | A06, A08 | sửa | đã xử lý | A06 dùng $g_t\odot g_t$; A08 dùng $v_2=(0{,}003996,0{,}009999)$ và $\widehat v_{2,2}\approx5{,}0020$. |
| Toán học | LLO15 chưa đo khả năng vận dụng CG/BFGS; chỉ có bài chọn tên công cụ. | nghiêm trọng | P02, B06, B08, B09 | tách minh chứng | đã xử lý | B06 tính hai vòng CG cho $H=\begin{pmatrix}4&1\\1&2\end{pmatrix}$ tới $(2/7,-1/7)^T$; B08 kiểm BFGS; B09 giữ lựa chọn công cụ. P02 và storyboard ánh xạ đủ ba minh chứng. |
| Học thuật–giảng dạy | D03 dùng tịnh tiến mục tiêu nhưng có nguy cơ bị hiểu là làm trơn; chưa nêu cơ chế tăng độ khó. | vừa | D03 | sửa | đã xử lý | Mặt trang gọi đây là “minh họa khởi tạo ấm” và nêu “làm trơn trước; tăng dần độ khó”; ghi chú phân biệt ví dụ tịnh tiến với làm trơn thực sự. |
| Học thuật–giảng dạy | Hai bài LLO16 chưa buộc gắn can thiệp với phép đo và giới hạn; D06/C07 tách rời minh chứng. | cao | C07 cũ, C08, D06 cũ, D07 | gộp và sửa | đã xử lý | C07 được gộp vào C08/Z01; D06 được gộp vào D07. Hai trang đánh giá đều có cùng khung ba cột và ba minh chứng chấm riêng. |
| Mạch kể chuyện | Nhãn thứ ba ở P03 chỉ nói “đổi bài toán” nên không bao quát biểu diễn, khối và quỹ đạo ở mạch C. | vừa | P03 | sửa | đã xử lý | P03 đổi thành “đổi đối tượng can thiệp” và liệt kê biểu diễn, khối, quỹ đạo, tuyến bài toán; ghi chú ánh xạ rõ C và D. |
| Mạch kể chuyện | Bộ trang chiếu 40 trang quá dày; các trang tổng hợp C07/D06 lặp lại nội dung đánh giá. | cao | C07, D06, toàn bài | gộp, bỏ | đã xử lý | Bỏ C07 và D06 dưới dạng trang riêng; nội dung cần thiết được giữ trong C08, D07 và Z01. Deck còn 38 trang, 6 mạch. |
| Học thuật–giảng dạy | Phân bổ cũ dành quá ít lý thuyết cho sáu chiến lược và quá nhiều cho A. | cao | outline, storyboard | sửa | đã xử lý | Phân bổ mới: P+Z $0{,}20/0{,}10$; A $0{,}45/0{,}20$; B $0{,}45/0{,}30$; C $0{,}45/0{,}25$; D $0{,}45/0{,}15$; tổng $2{,}00$ LT + $1{,}00$ BT. |
| Chuyên gia | Z04 ghi sai Buổi 7 và thiếu nguồn cụ thể cho RMSProp; HF xuất hiện dưới dạng viết tắt trước khi mở rộng. | cao | P02, Z04 | sửa | đã xử lý | P02 mở rộng “tối ưu không tạo Hessian (Hessian-free, HF)” ở lần đầu trên mặt trang; Z04 thêm Hinton (2012), bài giảng 6e và sửa phạm vi thành Buổi 6. |

### Quyết định cấu trúc sau hợp nhất

- Giữ 38 trang và 6 mạch. Hai phép tính B06/B08 làm cho LLO15 quan sát được mà không tăng tổng số trang.
- Giữ C08 và D07 làm mã đánh giá ổn định; bỏ riêng C07 và D06, đồng thời truy nguyên quyết định gộp trong storyboard.
- Không thay CSS chung, index, nguồn hoặc tài sản ngoài Bài 06.

### Kiểm định cục bộ sau hợp nhất

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Cấu trúc RevealJS | đạt | 6 `<section>` ngoài; 38 mã `data-slide-id` duy nhất; 38 khối ghi chú diễn giả. |
| Đồng bộ quy trình | đạt | Outline và bảng từng trang trong storyboard có cùng 38 mã, đúng tập và đúng thứ tự với HTML. |
| KaTeX | đạt | Kết xuất thử 212 biểu thức bằng KaTeX cục bộ với `throwOnError`; không có lỗi. Cảnh báo thiếu metric cho hai ký tự tiếng Việt trong chế độ văn bản không làm hỏng kết xuất. |
| Số học | đạt | Kiểm lại bằng tính toán độc lập: AdaGrad, RMSProp, Adam khớp A08; phần dư CG ở nghiệm chỉ còn sai số dấu phẩy động $5{,}55\times10^{-17}$; BFGS cho $g^Tp=-2{,}75$. |
| Tài nguyên | đạt | 14 tham chiếu cục bộ đều tồn tại; 4 SVG đều có `title`, `desc`; 4 thẻ ảnh có `alt`. |
| Cỡ chữ cục bộ | đạt theo CSS | Thân bài tối thiểu `0.78em`; bảng và mã có cỡ hiệu dụng tối thiểu $0{,}78\times0{,}90=0{,}702$ em. Không dùng quy tắc dưới `0.70em`. |
| Khoảng trắng | đạt | `git diff --check` không báo lỗi trong bốn tệp Bài 06. |
| Rà trực quan | chưa xác minh | Phiên tác tử không có Browser tích hợp và runtime Node.js vẫn là 18.19.1; không tuyên bố đã kiểm tràn trực quan bằng Codex Slides. |

## Đóng ba vấn đề vòng cuối — 2026-08-30

Các mục của những vòng trước được giữ nguyên để truy nguyên quyết định tại thời điểm rà soát. Bảng dưới đây là trạng thái mới nhất và thay thế các mã trang cũ khi có đổi mã.

| Vai rà soát | Vấn đề | Mức | Trang | Quyết định | Trạng thái | Bằng chứng sau sửa |
|---|---|---|---|---|---|---|
| Sinh viên | A03 mới chỉ cho dữ kiện nên người học phải đọc ba công thức trước khi hiểu các trạng thái lưu loại lịch sử nào; ký hiệu $v_t$ của RMSProp và Adam dễ bị nhập làm một. A08 tính số nhưng chưa buộc so sánh. | cao | A03, A08 | sửa | đã đóng | A03 hiển thị khởi tạo $r_0=v_0^{\mathrm{RMS}}=m_0^{\mathrm{Adam}}=v_0^{\mathrm{Adam}}=0$, đủ $\rho=0{,}9$, $\beta_1=0{,}9$, $\beta_2=0{,}999$, rồi hiện tuần tự bằng fragment $r_1=(4,1)$, $v_1^{\mathrm{RMS}}=(0{,}4,0{,}1)$, $m_1^{\mathrm{Adam}}=(0{,}2,0{,}1)$ và $v_1^{\mathrm{Adam}}=(0{,}004,0{,}001)$ trước A04–A06. Storyboard ghi rõ Ví dụ = A03. A08 gọi đúng bốn trạng thái và siêu tham số này, tính vòng hai và có cột so sánh `nhớ toàn bộ / quên dần / hướng và thang`; ghi chú giải thích đáp án. |
| Học thuật–giảng dạy | Bài đánh giá tuyến huấn luyện còn chung chung, đáp án lộ sẵn và chưa buộc nộp đủ ba phương án có phép đo cùng giới hạn. | cao | D06, trước đây D07 | sửa và đổi mã | đã đóng | D06 cho ba tình huống cụ thể: 200/50.000 nhãn, chuỗi mục tiêu ngày càng ít làm trơn và chuỗi dài làm gradient tăng vọt. Đề yêu cầu nộp ba phương án. Sáu ô đáp án `Can thiệp` và `Phép đo / giới hạn` dùng fragment; ghi chú có đáp án và tiêu chí chấm cho từng phương án. |
| Mạch kể chuyện | Tám trang P+Z làm phần mở–kết dài và lặp; mã C08/D07 có khoảng trống sau các lần gộp; phân bổ thời lượng chưa phản ánh ưu tiên vòng cuối. | cao | P01–P02 cũ, P03 cũ, C08 cũ, D07 cũ, Z03–Z04 cũ | gộp, đổi mã và sửa thời lượng | đã đóng | Gộp P01+P02 thành P01 nhưng giữ trang tiêu đề P00 và bản đồ ở P02; gộp Z03+Z04 thành Z03 với URL chi tiết trong ghi chú. Đổi C08→C07 và D07→D06, nên mọi mạch có mã liên tục. Deck còn 36 trang. Phân bổ mới: P+Z $0{,}30/0{,}20$; A $0{,}40/0{,}20$; B $0{,}40/0{,}30$; C $0{,}45/0{,}20$; D $0{,}45/0{,}10$, tổng đúng 2 LT + 1 BT. |

### Kiểm định cục bộ vòng cuối

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Cấu trúc RevealJS | đạt | 6 `<section>` ngoài; 36 mã `data-slide-id` duy nhất; 36 khối ghi chú diễn giả. |
| Mã liên tục | đạt | P00–P02, A01–A08, B01–B09, C01–C07, D01–D06, Z01–Z03; không còn mã hiện hành P03, C08, D07 hoặc Z04. |
| Đồng bộ quy trình | đạt | Outline và bảng từng trang trong storyboard cùng có 36 mã, trùng tập và đúng thứ tự với HTML. |
| KaTeX | đạt | Kết xuất thử 224 biểu thức bằng KaTeX cục bộ với `throwOnError`; không có lỗi. Cảnh báo metric cho ký tự tiếng Việt trong chế độ văn bản không làm hỏng kết xuất. |
| Tài nguyên | đạt | 14 tham chiếu cục bộ đều tồn tại; không thêm hoặc sửa tài sản hình. |
| Tương tác | đạt về cấu trúc | A03 có 4 fragment; D06 có 6 fragment cho đúng hai cột đáp án của ba tình huống. |
| Khoảng trắng | đạt | `git diff --check` không báo lỗi trong bốn tệp Bài 06. |
| Rà trực quan | chưa xác minh | Phiên tác tử không có Browser tích hợp và runtime Node.js là 18.19.1; không tuyên bố đã kiểm tràn bằng Codex Slides. |

## Đóng lỗi mã nội bộ trong nội dung — 2026-08-30

| Vai rà soát | Vấn đề | Mức | Trang | Quyết định | Trạng thái | Bằng chứng sau sửa |
|---|---|---|---|---|---|---|
| Học thuật–giảng dạy | Mã vị trí nội bộ xuất hiện trên mặt trang hoặc trong ghi chú, trái quy ước trình chiếu. | cao | A03, A08 | Thay mã bằng quan hệ ngữ nghĩa giữa các trang. | đã đóng | Mặt A03 dùng “ba thuật toán tiếp theo”; A08 gọi “ví dụ vòng đầu”. Quét văn bản sau khi loại thuộc tính, `style` và `script` không còn mã dạng chữ cái–hai chữ số. |

## Kiểm định kỹ thuật và trực quan cuối — 2026-08-30

- Codex Slides đã được mở trước khi triển khai nhưng không tạo được dự án bền vững: Node.js cục bộ là 18.19.1 trong khi plugin yêu cầu từ 20; manifest plugin và gói gốc cũng lệch phiên bản. Lỗi máy chủ là `ReferenceError: File is not defined`. Không tuyên bố đã kiểm định bằng Codex Slides.
- `python3 -m reloadserver 8765` không khả dụng vì môi trường thiếu mô-đun `reloadserver`. Dùng máy chủ HTTP cục bộ làm cơ chế dự phòng; tệp HTML và 14 tài nguyên cốt lõi đều trả mã HTTP 200.
- Chromium kết xuất đủ 36 trang ở $1280\times720$ và $720\times1280$. Ảnh toàn bộ trang đã được rà trực quan; không có hình, công thức hoặc nội dung bị cắt ở phiên bản cuối.
- Phép đo hộp bao phát hiện C02 và D03 có công thức vượt biên ngang trong bản trước. C02 được tách công thức thống kê và phép biến đổi; D03 rút gọn chuỗi mục tiêu và tách ví dụ. Kiểm lại toàn bộ 36 trang ở cả hai khung cho kết quả 0 trang tràn.
- Cấu trúc cuối có 6 mạch, 36 mã duy nhất và 36 ghi chú. Có 225 biểu thức KaTeX; trình duyệt không báo lỗi công thức. Điều hướng bàn phím chuyển từ `#/1/1` sang `#/1/2`; `hash: true` và `hashOneBasedIndex: true` hoạt động.
- Chỉ có yêu cầu `/favicon.ico` không thuộc tài nguyên cốt lõi trả 404; lỗi này không ảnh hưởng bộ trang chiếu.

## Cổng storyboard sau hợp nhất — 2026-08-30

- Giữ nguyên lịch sử các vòng 38 trang và 36 trang ở trên. Trạng thái hiện hành có 36 mã, 6 mạch; tập mã và thứ tự trong outline, storyboard và RevealJS trùng nhau.
- Cụm A đã đồng bộ bốn trạng thái $r_1$, $v_1^{\mathrm{RMS}}$, $m_1^{\mathrm{Adam}}$, $v_1^{\mathrm{Adam}}$ từ ví dụ tới công thức và bài tập. Ba thẻ fragment cùng hộp nối ở A03 khớp giữa storyboard và HTML.
- Cụm Z dùng chu trình rút gọn `nhu cầu → hình thức → kiểm tra`: Z01 vừa đặt lại nhu cầu quyết định vừa hình thức hóa bảng ánh xạ; Z02 kiểm tra tổng hợp–lựa chọn. Các bước trực quan và ví dụ được ghi `không áp dụng` vì cụm không đưa khái niệm mới; Z03 là ranh giới, tài liệu và chuyển tiếp, không bị gán sai thành bước hình thức.
- Z02 không đo lại các phép tính đã được A08, B06 và B08 kiểm tra. Trang này đo khả năng phối hợp bốn lựa chọn; mỗi lựa chọn phải kèm phép đo kiểm chứng và một giới hạn.
- Vòng hợp nhất hiện tại sửa thêm ký hiệu RMSProp/Adam, định nghĩa $a_{t,j}$, xấp xỉ giảm chấn lớn, tính tự chứa của ví dụ CG, ánh xạ LLO/CLO và nguồn Bengio và cộng sự (2009) cho ví dụ học theo chương trình. Không thêm, gộp, tách hoặc bỏ trang.
- GLM 5.3 Flash qua OpenRouter đã rà bản sao giới hạn chỉ gồm các tệp được người dùng cho phép. Metadata runtime: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`; không cung cấp PDF, trích xuất PDF, danh mục MIT, `.env`, khóa API hoặc dữ liệu xác thực cho worker.

## Đóng lỗi hiển thị sau hợp nhất — 2026-08-30

- A03 tràn dọc 157 px khi hiện đủ fragment. Giữ nguyên cỡ chữ, dữ kiện và bốn trạng thái; bỏ ba câu giải thích lặp trong thẻ và rút hộp tổng hợp thành ba cơ chế nhớ.
- D03 vượt ngang 8 px ở khung rộng. Giữ nguyên công thức và cỡ chữ; giảm riêng khoảng cách lưới của trang từ `0.7em` xuống `0.35em`, không đổi CSS dùng chung.
- Ghi chú Z02 bổ sung đủ checkpoint Adam gồm $\theta_t,m_t^{\mathrm{Adam}},v_t^{\mathrm{Adam}},t$ và điều kiện HF–CG $G\succeq0$, $\lambda>0\Rightarrow B=G+\lambda I\succ0$; phép đo cùng giới hạn được giữ.

## Kiểm định bàn giao của điều phối viên — 2026-08-30

- Tái kiểm cuối bằng GLM 5.3 Flash qua OpenRouter đạt ở bốn phạm vi bị tác động: sinh viên, toán học, học thuật–giảng dạy và mạch kể chuyện. Ký hiệu RMSProp/Adam, ví dụ CG, phép đo–giới hạn Z02 và cụm kết luận đều đạt.
- Chromium duyệt lại đủ 36/36 trang tại $1280\times720$, $800\times600$ và $720\times900$ qua máy chủ tạm `127.0.0.1:8876`. Cổng 8765 đang thuộc tiến trình khác nên không bị thay đổi trong vòng này. Cả ba khung có 0 tràn, 0 lỗi console, 0 lỗi trang và 0 yêu cầu tải thất bại.
- Ảnh A03 với toàn bộ fragment và ảnh D03 được xem trực tiếp sau sửa. A03 giữ cỡ chữ và đủ bốn trạng thái; D03 giữ công thức, hình và luận điểm trong khung.
- Thẻ viewport cho phép phóng to và favicon dữ liệu rỗng loại yêu cầu 404. Kiểm tra tĩnh giữ 6 section ngoài, 36 ID duy nhất, 36 ghi chú, 36 đoạn nguồn và 14/14 tham chiếu cục bộ hợp lệ; `git diff --check` sạch.
- Codex Slides vẫn không có bằng chứng render trực quan thành công do giới hạn runtime đã ghi ở trên. Kết luận bàn giao chỉ dựa trên RevealJS cục bộ và không tuyên bố cổng Codex Slides đã đạt.

## Rà văn phong và mạch khái niệm ngày 2026-09-01

- Bỏ 14 dòng `Đầu ra` lặp mục tiêu đọc hiểu trong lecture note; giữ nguyên toàn bộ nội dung toán và câu hỏi.
- Ghi chú P02 thay mô tả mã mạch bằng ba loại thông tin thật sự được tích lũy hoặc can thiệp: trạng thái theo tọa độ, độ cong liên kết hướng và cấu trúc bài toán. Dòng nguồn của các vết số không còn câu QA lặp.
- Kiểm định đạt 36 mã duy nhất, 36 ghi chú, 6 section ngoài, thẻ cân bằng, tài sản tồn tại, SVG hợp lệ và HTTP 200 cho deck/viewer/note/KaTeX.
- Codex Slides xác nhận dự án `20260901031052-lecture-06-t-i-u-m-ng-s-u-bjy1` ở trạng thái draft với 36 trang; không có Browser để tuyên bố rà trực quan mới.
- Reviewer độc lập `z-ai/glm-5.3-flash` đọc toàn bộ deck và note, kết luận PASS về mạch khái niệm, độ đầy đủ và độ chính xác toán học.
- Hậu kiểm toàn khóa bỏ câu mô tả cách tổ chức “mạch bắt đầu từ nhu cầu” và thay “ba chủ đề trong mạch” bằng tên ba bộ tối ưu; nội dung thuật toán không đổi.

## Rà soát sâu mạch khái niệm và hình — 2026-09-01

- B02 định nghĩa $g_t=\nabla F(\theta_t)$, $H_t=\nabla^2F(\theta_t)$ và độ dời $p$ trên mặt trang trước khi dùng mô hình Taylor $q_t(p)$. Cách này loại việc dùng ký hiệu trước định nghĩa.
- Chuẩn hóa theo lô dùng $Z,\widehat Z,Y$ trong deck, lecture note, storyboard và SVG. Ký hiệu $H_t$ chỉ còn dành cho Hessian; $\beta_j$ của lớp chuẩn hóa được phân biệt với $\beta_1,\beta_2$ của Adam và $\beta_k$ của CG.
- D02 nêu rõ $\theta_{\mathrm{pre}}$, điều kiện kiến trúc hoặc ánh xạ tham số tương thích và nguy cơ chuyển giao âm. D03 tách ví dụ khởi tạo ấm khỏi phát biểu làm trơn; SVG không còn gọi parabola đầu là “mục tiêu dễ”. D04 hiện cả $q_t\to q_*$ và mục tiêu tức thời $J^{(t)}$.
- Sửa lỗi KaTeX ở D03 từ `,qquad` thành `,\qquad`. SVG bộ tối ưu dùng thống nhất $r_t,r_1,r_2$ cho AdaGrad và cụm “độ lệch do khởi tạo”; “Hai vòng kiểm số” đổi thành “Hai vòng tính”.
- Lecture note bỏ bốn câu điều phối “Phần chứng minh cuối bài”. Chứng minh CG được bổ sung không gian Krylov, ba bất biến quy nạp, bước trực giao phần dư, tính liên hợp theo $B$ và lập luận kết thúc sau không quá $d$ vòng. Trường hợp $k=0$ dùng riêng $d_0=r_0$.
- Hậu kiểm `no-ai-slop` bỏ câu “Điểm so sánh cần nói được” và cụm “hiện thực hóa điều kiện”; giữ nguyên số liệu, giả thiết và thuật ngữ chuyên môn. Quét phần văn bản công khai sau khi bỏ thuộc tính, CSS và JavaScript không thấy mã trang nội bộ hoặc các cụm `storyboard`, `review-log`, `tiêu chí chấm`, `hướng dẫn chấm`, `nộp bài`, `kiểm lại độc lập`.

### Kiểm định hiện hành

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Cấu trúc RevealJS | đạt | 6 section ngoài với số trang dọc `3/8/9/7/6/3`; 36 ID duy nhất, 36 ghi chú và 36 dòng nguồn; thẻ HTML cân bằng. |
| Đồng bộ quy trình | đạt | 36 ID trong deck, outline và bảng từng trang của storyboard trùng thứ tự. Bản đồ khái niệm BN đã đổi $H,\widehat H$ thành $Z,\widehat Z$. |
| Markdown | đạt | Heading cấp một ở đầu tệp; dấu `$` cân bằng; 7 khối mở rộng và 7 dấu đóng; sáu hình có văn bản thay thế. |
| Số học | đạt | AdaGrad, RMSProp và Adam khớp A08; CG cho phần dư bằng $0$ tại $(2/7,-1/7)^T$; BFGS cho $g^Tp=-2{,}75$; BN và hai hệ số hạ tọa độ khớp số hiển thị. |
| SVG | đạt | 6/6 tệp phân tích XML, có `title` và `desc`, không có script hoặc `foreignObject`; ba SVG sửa đổi đã được kết xuất trực tiếp bằng Chromium và xem ở kích thước gốc. |
| Tài nguyên web | đạt | Deck, viewer, 14 tài sản cốt lõi và hai SVG chỉ dùng trong lecture note đều trả HTTP 200 từ máy chủ cục bộ. Viewer đã tải xong, ẩn trạng thái chờ và hiển thị Markdown cùng công thức. |
| Trực quan | đạt bằng cơ chế dự phòng | Chromium kết xuất bản in 16:9 gồm 67 trạng thái fragment của 36 slide; contact sheet và các ảnh B02, C02, D02–D04, D06 không có nội dung bị cắt. Viewer được xem ở $1365\times768$ và $390\times844$. |
| Codex Slides | đạt về trạng thái, chưa có ảnh render | `get_project` xác nhận dự án `20260901031052-lecture-06-t-i-u-m-ng-s-u-bjy1` có đúng 36 slide và ở trạng thái draft. Phiên này không có Browser tích hợp để xác nhận bề mặt hiển thị; không tuyên bố đã rà trực quan bằng Codex Slides. |
| OpenRouter | không dùng | Không gửi tệp Bài 06 ra ngoài; quyền gần nhất của người dùng chỉ áp dụng đúng bốn tệp Bài 04. |

### Đóng phát hiện của rà soát độc lập

- Bỏ điều kiện gần cực tiểu toàn cục khỏi định nghĩa tiền huấn luyện. Bản hiện hành định nghĩa checkpoint nguồn bằng quỹ đạo $\theta_S^{(t)}$, chỉ số chuyển $T_S$ và tiêu chuẩn đã chọn; sau đó ánh xạ tham số dùng chung sang điểm đầu của nhiệm vụ đích.
- Bỏ điều kiện gần $\inf J^{(k)}$ khỏi phương pháp tiếp tục. Bản hiện hành dùng thuật toán $\mathcal A_k$, ánh xạ giữa không gian tham số và tiêu chuẩn dừng $\operatorname{stop}_k$; không đòi nghiệm toàn cục hoặc gần toàn cục ở từng giai đoạn.
- Gỡ Bengio và cộng sự (2007) khỏi D02, lời dẫn và tài liệu tham khảo. Công trình này nói về tiền huấn luyện tham lam không giám sát, không phải nguồn cho ví dụ chuyển nhiệm vụ có nhãn. D02 chỉ giữ Goodfellow, Bengio và Courville (2016), §8.7.4.
- Chứng minh CG định nghĩa $\mathcal K_0=\{0\}$ và suy ra rõ $p_k-p_0\in\mathcal K_k$, $r_k\perp\mathcal K_k$ trước khi dùng điều kiện tối ưu trên $p_0+\mathcal K_k$.
- Khóa ký hiệu của outline đổi kích hoạt chuẩn hóa theo lô từ $H$ sang $Z$. Lecture note bỏ cụm “trong quy ước của deck”; ghi chú Z03 nêu trực tiếp các giả thiết và chi phí cần kiểm.
- Tác tử rà soát độc lập kiểm lại sau sửa và trả `PASS`. Viewer kết xuất lại 628 nút KaTeX của lecture note, không có `katex-error`; bố cục tài liệu đã mở và trạng thái chờ được ẩn.

### Bổ sung sau rà soát chéo toàn học phần

- A03 được gắn nhãn “Ví dụ dẫn nhập” và nói rõ các trạng thái vòng đầu là kết quả cần được giải thích bằng quy tắc cập nhật; AdaGrad, RMSProp và Adam không còn xuất hiện như ký hiệu hình thức chưa định nghĩa.
