# Nhật ký rà soát Bài giảng 06

## Vòng triển khai RevealJS theo kế hoạch mới, 2026-09-27

**Trạng thái nghiệm thu:** bản RevealJS và học liệu đã qua cổng storyboard, đủ năm phản biện độc lập, chỉnh sửa riêng và tái kiểm; các phép kiểm cục bộ cuối đều đạt. Đã đồng bộ 45 ảnh và 45 notes vào Codex Slides. Browser tích hợp của Codex không có công cụ trong phiên; giới hạn và bằng chứng thay thế được ghi rõ bên dưới. Các kết quả phía dưới chỉ áp dụng bản triển khai 45 trang, 7 mạch; trạng thái của những vòng cũ được giữ nguyên để truy nguyên.

### Phạm vi và tổ chức công việc

- Triển khai lại `lecture-06-toi-uu-mang-sau.html` theo outline/storyboard đã chốt: A01–A05, B01–B09, C01–C08, D01–D05, E01–E08, F01–F07, G01–G03; 45 trang và 45 ghi chú diễn giả. Giữ thứ tự, tiêu đề, bảy câu hỏi kiểm tra và các quan hệ phụ thuộc của kế hoạch.
- Cơ sở chung là các thành phần của quá trình huấn luyện. Mô hình bước có phạt xác định dương liên kết B–D; E–F thay phép tính mô hình, khối biến, đầu ra, điểm đầu, họ mục tiêu hoặc phân phối. Không diễn giải mọi can thiệp thành một ma trận tiền điều kiện hóa.
- Đối chiếu Buổi 6 trong DOCX chính thức, Chương 8 §§8.5–8.7: LLO14/CLO2,3; LLO15/CLO2,3; LLO16/CLO3,4; 2 tiết lý thuyết và 1 tiết bài tập. Không đưa thời lượng lên mặt trang hoặc notes. Nguồn và ví dụ đã chốt ở vòng kế hoạch tiếp tục được kiểm trực tiếp trong bản triển khai; không dùng chứng nhận kế hoạch thay phản biện sản phẩm.
- Viết lại ghi chú bài giảng và thêm 12 bài tập có gợi ý/lời giải trong `materials/lec-06/`. Markdown là nguồn; cập nhật `material-local-data.js` cùng nguồn bằng script Python đã quy định. Không sinh HTML học liệu hoặc dùng Node.js để build học liệu.
- Chỉ sửa khối Bài 06 trong `lecture-style.css`. Cả tám bộ đang phát hành dùng cùng tệp CSS tự viết; các selector riêng của Bài 06 có phạm vi `:where(html[data-lecture="06"])`. Runtime, KaTeX, plugin và tài sản đều nằm trong học kỳ. Không thêm khối style, style tĩnh hoặc CSS riêng cho bài.
- Kế thừa cấu trúc và giao diện của `2526-2-another-course/lecture-template.html`; dùng runtime cục bộ học kỳ. Khung rộng 1280×720; màn hẹp giữ chữ 24px và cho cuộn nội dung, công thức, bảng hoặc hình khi cần. Không cắt nội dung hoặc hạ chữ để che tràn.
- Mỗi lần chỉ một tác tử ghi kho. Điều phối viên duyệt kế hoạch, tiếp nhận phân tích nguồn, duyệt cổng storyboard, hợp nhất năm phản biện độc lập, giao tác tử chỉnh sửa riêng và kiểm định đầu ra. Các báo cáo và quyết định dưới đây giữ cả lỗi đã sửa.

### Tác tử và bằng chứng chỉ định mô hình

Tất cả lời gọi tạo tác tử của vòng này chỉ định `model: "gpt-6-astra"`, `fork_turns: "none"` qua `collaboration.spawn_agent`. Các lượt tiếp tục dùng `collaboration.followup_task` trên cùng tác tử. Đây là bằng chứng cấu hình từ công cụ, không phải chứng nhận độc lập mô hình runtime hoặc tuyến thanh toán. Không dùng OpenRouter, script gọi mô hình, API/CLI mô hình, khóa API hoặc tệp `.env`/`.env.*`.

| Tác tử | Vai trò và đầu ra |
|---|---|
| `lec06_implementation_plan` | Kế hoạch triển khai; điều phối viên đã duyệt trước khi sửa HTML |
| `lec06_impl_source` | Đối chiếu nguồn, quy định và hồi quy CSS chung |
| `lec06_deck_writer` | Soạn 45 trang, 45 notes và chín SVG |
| `lec06_material_draft` | Soạn ghi chú mở rộng và 12 bài tập; điều phối viên đưa bản thảo vào kho |
| `lec06_deck_storyboard_gate` | Cổng kiểm định storyboard và tái kiểm sau sửa |
| `lec06_deck_math` | Phản biện toán học độc lập và tái kiểm |
| `lec06_deck_argument` | Phản biện mạch lập luận độc lập và tái kiểm |
| `lec06_deck_student` | Phản biện góc nhìn sinh viên và trực quan |
| `lec06_deck_expert` | Phản biện chuyên gia, nguồn và chuẩn đầu ra |
| `lec06_deck_academic` | Phản biện học thuật–giảng dạy và no-ai-slop Detect |
| `lec06_deck_editor` | Biên tập riêng sau phản biện; tự kiểm no-ai-slop Edit và eval |
| Điều phối viên | Duyệt, kiểm trực quan/kỹ thuật, đồng bộ Codex Slides và quản lý phiên bản |

### Hình tự vẽ và thay đổi so với đặc tả

| Trang | SVG trong `img/lec-06/` | Nội dung và quyết định |
|---|---|---|
| A03 | `scale-step.svg` | Hàm bậc hai và hai bước; hai ô có thang riêng, ô toàn cảnh chứa điểm (0,−8) |
| B05 | `rms-weights.svg` | Trọng số quá khứ của hai hệ số suy giảm; tính từ công thức |
| B08 | `tilted-curvature.svg` | Đường đồng mức nghiêng và hai trục riêng của Q |
| C01 | `newton-direction.svg` | Hướng gradient âm và bước Newton; mũi tên gradient được co 5/8 và ghi rõ trong notes |
| C05 | `cg-path.svg` | Hai bước CG; trục dùng chỉ số tọa độ có ngoặc để phân biệt số vòng |
| E02 | `batch-shift.svg` | Hai lô dịch chuyển, trung bình/phương sai và đầu ra chuẩn hóa |
| E04 | `coordinate-path.svg` | Hai bước tọa độ; giữ đường elip đầy đủ rồi cắt bằng clipPath, tránh đoạn nối giả qua điểm ngoài khung |
| E07 | `gradient-chain.svg` | Hai chuỗi năm hệ số và tích; màn hẹp giữ tỷ lệ hình trong vùng cuộn |
| F03 | `continuation-quartic.svg` | Ba hàm bậc bốn, các cực tiểu và điểm dừng 0 |

Tất cả hình có title/desc và alt ở HTML. Phản biện toán học tính ngược tọa độ để kiểm hàm và quan hệ; sai số chỉ do làm tròn tọa độ SVG. Hình là ví dụ sư phạm tự tạo, không phải dữ liệu thực nghiệm. Không cắt ảnh PDF, không dùng raster hoặc tài sản bên thứ ba; không tải nguồn MIT mới. Sáu SVG cũ không còn được bản mới tham chiếu và được giữ để tránh xóa tài sản ngoài phạm vi.

### Cổng storyboard và sửa trước năm phản biện

| Vấn đề | Quyết định và bằng chứng |
|---|---|
| D04: dấu nhỏ trong TeX bị HTML hiểu thành thẻ | Đổi sang lệnh TeX lt; kiểm không có thẻ lạ, không lỗi KaTeX; tái kiểm gate đóng lỗi nghiêm trọng |
| D04: vòng BFGS chưa nêu đủ nhận điểm/ma trận, lặp và trả | Hoàn chỉnh giả mã; giữ hoặc cập nhật P theo kiểm cặp; gate đóng lỗi |
| C05: trục đồ thị trùng chỉ số vòng | Sửa trục thành chỉ số tọa độ có ngoặc; notes định nghĩa các biến; gate đóng lỗi |
| E04: đường mức nối giả sau lọc điểm | Giữ đủ đường khép kín và dùng clipPath; toán học kiểm lại đường mức |
| C06/D02/F05: khối cuối chạm chân trang | Rút khoảng cách hoặc chuyển phép đối chiếu phụ sang notes; giữ nội dung trung tâm, không hạ chữ; kiểm rộng/hẹp đạt |
| F01: công thức gradient dài | Tách hai đạo hàm riêng; kiểm rộng không bị cắt |
| B01/B04/B09/F05: MathML làm nở khung ngoài | Đặt vùng chứa tương đối và bảng trong vùng cuộn; khung ngoài ở màn hẹp rộng đúng 390px |
| Bàn phím vùng cuộn | Giữ phím cuộn trong vùng có tiêu điểm; kiểm cuộn không đổi trang và điều hướng toàn bài vẫn hoạt động |
| C06: miền vòng lặp còn ngầm hiểu | Ghi rõ k chạy từ 0 đến K−1 trước bốn bước; đồng bộ ngân sách nguyên dương trong học liệu; math tái kiểm đóng M01 |
| Trạng thái planning lỗi thời | Sửa các câu còn nói chỉ lập kế hoạch/chưa có hình/chưa đồng bộ HTML; giữ toàn bộ lịch sử trong nhật ký |

Cổng storyboard sau sửa xác nhận đúng 45 ID, 45 tiêu đề, thứ tự và 7 mạch; 14 cụm và bảy câu hỏi có tiên quyết. Đủ điều kiện mở năm vai phản biện. Không có thay đổi số trang hoặc thứ tự trong vòng triển khai.

#### Hợp nhất finding và quyết định sửa

| Finding | Quyết định, sửa thực tế | Bằng chứng / phạm vi tái kiểm |
|---|---|---|
| AC01 + sinh viên C05–C06 | Nhận. C05 thêm dòng định danh $d_k$ là nghiệm gần đúng, $r_k=b-Ad_k$ là phần dư, $p_k$ là hướng tìm kiếm. Công thức mặt trang ghi $\alpha_0=(r_0^\top r_0)/(p_0^\top Ap_0)=2/5$, $d_1=\alpha_0p_0$, $p_1=r_1+(9/25)p_0$ và $p_0^\top Ap_1=0$. | Giữ hình, dữ kiện, số $d_1,r_1$ và thứ tự C05→C06. Ảnh rộng đủ nội dung; không giảm cỡ chữ. Cần tái kiểm math/argument đối với C05 và hai trang lân cận. |
| Sinh viên: khó nhận vùng cuộn ngang | Nhận. Chỉ ở màn hình hẹp, vùng công thức/bảng/hình thực sự tràn có dấu ↔, viền trên/dưới và tiêu điểm bàn phím. JavaScript đo overflow rồi đổi class/tabindex/aria-label; không chèn style tĩnh. | Sáu trang C05/D03/E07/F01/F05/G01 đạt kiểm mở liên kết trực tiếp, chuyển trang, đổi kích thước, cuộn bàn phím tới tận phải. Nội dung ngoài rộng đúng 390px. Có ảnh sau khi cuộn tới cuối. |
| AC02 + sinh viên E03 | Nhận. Đổi nhãn thành “Phương sai lô của $\widehat a$”. | Công thức giữ nguyên, khớp §5.1 của học liệu; không gán phương sai này cho $z$. |
| AC03 + sinh viên F05 | Nhận. F05 và dữ kiện G02 ghi rõ “Hai mẫu $(x,y)$”. Ghi chú bài giảng §6.3 cũng ghi cùng định danh trước cặp mẫu. | Giữ $E=(1,1)$, $H=(3,1)$, mô hình, mất mát, lịch phân phối và đích. Độ nhạy $1$ và $9$ tiếp tục trong notes/học liệu; không thêm định nghĩa độ khó phổ quát. |
| AC04, notes F06 | Nhận. Thay bình luận về cách tổ chức đánh giá bằng “Bước tinh chỉnh được kiểm trên mất mát đích; truyền nghiệm cần kiểm điểm dừng; lịch lấy mẫu cần đạt phân phối cuối.” | Nêu ba quan hệ học thuật cụ thể. F07 và đáp án không đổi. |
| F04, nhận xét ngôn ngữ học thuật | Nhận. Đổi “gần giải từng bài toán” thành “giải gần đúng từng bài toán”. | Không đổi quy trình hay bảo đảm của tiếp diễn. |
| EX-02 | Nhận. Dùng “xác thực” cho chọn điểm/tiêu chí dừng trong B03/B05/B07/F02 và ghi chú bài giảng §2.5. | Đã kiểm tất cả lần “kiểm định” trong ba sản phẩm: đều chỉ cùng chức năng validation. Giữ “tập kiểm tra”, “phép kiểm”, “kiểm hướng”, “kiểm phần dư”. Các chỗ dùng “xác thực” sẵn có trong ghi chú §1.1/§6.4 và Bài 9 giữ nguyên. |
| M01–M04 / SG6 | Giữ bản sửa đã được math đóng. Không chỉnh lại C06/D01/D04 hoặc giả thiết epsilon ở Bài 2 trong vòng này. | Hash học liệu Bài tập giữ nguyên bản đã tái kiểm toán học. |
| ARG-01 / EX-01 / AC05 | Không ghi thêm: điều phối viên đã sửa hồ sơ và các vai đã xác nhận. | Tác tử này không có quyền ghi planning; giữ kết quả đóng trong báo cáo các vai. |

Không bác bỏ finding nội dung nào được giao. Các giới hạn về diễn tập/thời lượng và khoảng cách đọc giảng đường vẫn là giới hạn của bằng chứng hiện có; không suy chúng thành lỗi hoặc chứng nhận thực dạy.

#### Chi tiết chuyển nội dung C05 để đồng bộ planning

- Thêm nhãn $d_k,r_k,p_k$ lên mặt trang, giữ bản diễn giải đầy đủ trong notes.
- Thay đáp số $\alpha_0=2/5$ bằng phép thế tỷ số tạo hệ số; thay dòng chỉ cho $\beta_0=9/25$, $p_1=(24/25,-6/25)^\top$ bằng quan hệ sinh hướng $p_1=r_1+(9/25)p_0$ và điều kiện liên hợp.
- Đưa kết quả số tường minh $p_1=(24/25,-6/25)^\top$ và phép suy ra hệ số $\beta_0$ về notes; cả hai đã có đầy đủ ở đó, nên không mất nội dung.
- Bỏ khung cuối lặp lại điều kiện liên hợp và các số vòng hai khỏi mặt trang. Điều kiện liên hợp xuất hiện ngay cạnh công thức $p_1$; $\alpha_1=5/8$ và phép tính $d_2=(1,1/4)^\top$ còn trong notes. Hình vẫn giữ nhãn điểm cuối $d_2$ và quỹ đạo hai bước.
- Không sửa SVG, không đổi vai trò, tiêu đề, số trang, thứ tự hoặc dữ kiện bài kiểm tra. C06 tiếp tục tổng quát hóa từ ví dụ đã có công thức sinh hệ số/hướng.


### Kiểm định cuối và giới hạn bằng chứng

- Cấu trúc: 45 trang, 45 notes, 7 mạch; ID/thứ tự/tiêu đề khớp kế hoạch. Chín SVG hợp lệ, tất cả tài sản cục bộ tồn tại, có mô tả thay thế. Không có style tĩnh trong HTML, khối style, mã trang nội bộ hoặc thời lượng trên sản phẩm công khai.
- RevealJS: kiểm 45 trang × 1600×900 và 390×844, tổng 90 lượt; không tràn ngoài vùng cuộn, không lỗi KaTeX, JavaScript, hình hoặc tài nguyên. Màn rộng không có công thức bị cắt. Màn hẹp giữ nội dung dài trong vùng cuộn có thể nhận biết và tiếp cận. Điều phối viên đã xem toàn bộ ảnh rộng; sinh viên xem lại 27 ảnh sau sửa cùng bằng chứng cuộn.
- Bàn phím: 67 ca vùng cuộn và hai ca điều hướng/tải lại, tổng 69 ca; tất cả đạt. Các phím cuộn giữ đúng trang; điều hướng tới A02 cho hash `#/1/2` và tải lại giữ A02. Phải chờ khoảng cập nhật URL của RevealJS trước khi kiểm hash. Sáu ca mở liên kết sâu, chuyển trang, đổi kích thước và cuộn tới tận phải đều đạt; dấu ↔ chỉ hiện ở vùng thực sự tràn trên màn hẹp.
- Hồi quy CSS chung: bảy bộ 00–05 và 07, 355 trang × hai kích thước = 710 lượt; đối chiếu 20.326 nút với CSS từ HEAD trước nhiệm vụ. Không có thay đổi văn bản, kiểu tính toán hoặc hình học; không lỗi JavaScript, KaTeX, hình hay tài nguyên. Byte ngoài khối CSS Bài 06 giữ nguyên. Đây là kiểm ảnh hưởng của thay CSS, không phải một cuộc phản biện mới về nội dung bảy bài đó.
- Học liệu: hai tài liệu × HTTP/file × rộng/hẹp = tám ca. Ghi chú render 587 công thức; bài tập 322 công thức; không lỗi KaTeX hoặc tài nguyên, không nở chiều rộng ngoài màn hình. Năm khối lời giải trong ghi chú và 14 khối gợi ý/lời giải trong bài tập gập mặc định; mở bằng bàn phím được, mở khi in và khôi phục trạng thái sau in. `sync-local-materials.py --check` đạt với 14 Markdown toàn học kỳ.
- Chỉ mục: chỉ sửa thẻ Bài 06, cập nhật tên/phạm vi và thêm liên kết bài tập đã kiểm. Bốn ca HTTP/file × rộng/hẹp xác nhận ba liên kết, bố cục và mở bài tập bằng bàn phím. Không đưa tài liệu planning lên chỉ mục.
- no-ai-slop: tác tử soạn và học liệu áp dụng Edit trên toàn bản thảo, tự đối chiếu eval; editor áp dụng Edit và tự eval trong các phạm vi sửa đã liệt kê. Năm vai áp dụng Detect, giữ các phân biệt toán học có chức năng. Đã sửa bình luận tổ chức đánh giá ở F06 và thống nhất “xác thực”; không dùng điểm phát hiện AI hoặc suy đoán tác giả. Điều phối viên biên tập các cập nhật planning, chỉ mục và nhật ký theo cùng nguyên tắc, giữ lịch sử nguyên trạng.
- Không có diễn tập giảng đường trong phiên. Nhận định về thời lượng dựa trên đề cương, phân bổ hoạt động và phản biện thiết kế; không coi số trang hay ảnh chụp là bằng chứng đã dạy trong đúng thời lượng.

### Codex Slides và tài liệu dự án

Dự án bền vững: `20260901031052-lecture-06-t-i-u-m-ng-s-u-bjy1`. Đã tiếp nhận đề cương bắt buộc, outline/storyboard và tệp `lecture-template.html` với vai trò tham chiếu cấu trúc/giao diện. Nhập ảnh PNG từ 45 trang RevealJS bằng thao tác xác định; nhập 45 notes bằng thao tác xác định. Không gọi render/outline/notes generation hoặc dịch vụ mô hình bên ngoài tác tử gốc.

Trạng thái đọc lại: 45 mục outline, 45 trang có ảnh và trạng thái rendered, 45 notes khớp bản HTML; workflow ở deck. Phiên bản hiện tại **46**, ID `141a309a-fc01-454a-860c-cb21731a8402`, có 45 ảnh. Tải lại từng endpoint ảnh cho checksum giống PNG đã kiểm; gọi GET lần nữa vẫn giữ ảnh và notes. Trường gợi ý sinh trang của plugin bị giới hạn 30 và trường status tổng vẫn là draft khi nhập thủ công; số trang thực trong outline/pages/version là 45, không dùng hai trường đó để suy số lượng hoặc nghiệm thu.

Không có công cụ Browser tích hợp trong phiên. Theo hướng dẫn của kỹ năng kiểm định Codex Slides, dùng trạng thái chuẩn và endpoint ảnh lưu bền vững làm bằng chứng cấu trúc; dùng ảnh RevealJS và trình duyệt Chromium cục bộ làm bằng chứng trực quan. **Chưa kiểm bề mặt hiển thị trong Browser tích hợp Codex**, không tuyên bố đã thực hiện bước đó. Liên kết bàn giao chính xác: [Bài 06 trong Codex Slides](http://127.0.0.1:4311/project/20260901031052-lecture-06-t-i-u-m-ng-s-u-bjy1?slide=1&mode=workspace&checkpoint=deck).

HTML, CSS, hai Markdown và ba tệp planning được đồng bộ thành Design Files để truy nguyên; tệp trong kho là nguồn triển khai RevealJS. Không xuất PDF/PPTX vì không có yêu cầu.

### Dấu vân tay bản được kiểm

| Tệp | SHA-256 |
|---|---|
| `2627-1/lecture-06-toi-uu-mang-sau.html` | `6561e164fdcc24f84a7b6bccff2cb171142b5e7ac3a040d77521f4c5979396e4` |
| `2627-1/lecture-style.css` | `14d4f69d56769e9eb55c9832acb0af0dbccb5c79a4ce4111c66d9faa4dd14611` |
| `2627-1/materials/lec-06/lecture-note.md` | `54a9d86124db41a3222c9d6473b6355dc88b30933614ddad914cb33ea3754050` |
| `2627-1/materials/lec-06/exercises.md` | `175f30c3ba342c61c203f989000f16c65cd06184c23f1bbc2fa3c14905b459c6` |
| `2627-1/material-local-data.js` | `b49545668012918811f944db519a0bd35ee5d79c95a911b76e29c40327124ef6` |

### Ảnh đã đối chiếu với endpoint lưu bền vững

| Trang | Ảnh dự án | SHA-256 |
|---|---|---|
| A01 | `01.png` | `62cc1b4fb2251f260e08d97c189d05b9ae83e3dc1abeb6891f05cc4e7e2f4df2` |
| A02 | `02.png` | `b98d3fa70c6dbd6035f9e9b03f46a1256956b3d36a747d603f588f2512745a88` |
| A03 | `03.png` | `e829daa3eca7a6445ad18447cbb63a2792afee4bd74ab223282abb2d24b5d0a1` |
| A04 | `04.png` | `ce88e9cda4d16b66963339cbc27e42fb34a729c78a7f112d2ded07649748581d` |
| A05 | `05.png` | `712552067d15599e3a7532dbcba1c2fdb53a4b0b46184c7f04b6336526b08a94` |
| B01 | `06.png` | `237248ab09f77e0bf21cbc3ae71a41e5c561bdfa01beabfe2384566a8724b788` |
| B02 | `07.png` | `d858269715f31bf725bacf760979ce4a7164336e3dd7100fe5b906b3e1cb7af1` |
| B03 | `08.png` | `c4dc0b0d00506e5c5ceee4124248eda7edee107e38b9a7811b073d81efde06a3` |
| B04 | `09.png` | `a80f1951d3f1a588ace16ea988607a51e6e6d5aa73988f751c4a6c051c1e301e` |
| B05 | `10.png` | `e3441ec6705e30ad435aaa8258a43c7e062e9e0bd3d11def4636c9ccd57573ad` |
| B06 | `11.png` | `bd2ed2271e3ce2704fd1e2b90a2add1f48cabc0e69c9c2281a1efa4cc637266a` |
| B07 | `12.png` | `16675c48ed666c867501de61c8657c913a9dba151775dd36a093afd7f37b0a16` |
| B08 | `13.png` | `cf741ecee2bff65c899c6873629e323bf90cde07f0ec323d8541fb42ff2586a8` |
| B09 | `14.png` | `62cc89902739935fabce23c1836705a7397ddfb2262461947103893da25c2ab9` |
| C01 | `15.png` | `2af3afa934940065e6e324bda7ebc86ec9bc30af12915f63e57d7f1d0fb31570` |
| C02 | `16.png` | `32c92ea9036b04519d8337e279bd42de70b836934847af4e48e5a6fdaae9c1a3` |
| C03 | `17.png` | `33c8d02eb2ba7799b4a45a48d46b98e4ab10daf73600440a7fdb63fc652f03ca` |
| C04 | `18.png` | `cba3eaeeb4c7eff6617f0b0e991ce841758118f8796f25b570d95c7f1ed09df0` |
| C05 | `19.png` | `efa77e433ed3f0301268e32789b5362a008913739fba26255abc122e01b218dd` |
| C06 | `20.png` | `da9a13d6c10c6ac96193d25bf45fa685379faa3ddb09c1cb42a03cc735a42565` |
| C07 | `21.png` | `312756be69ee8c72f2d61de6c0332c0c5a98ff552efc7da65126b06ebd92b3cd` |
| C08 | `22.png` | `bb74907baae884d3bac297b44ebe93dc3fcbc4305075ae1cbcd7e914aecbe9f8` |
| D01 | `23.png` | `83a0b092c7ef8aebcd02797830c556cf3fc4f89b0d92134940d1de97dc540142` |
| D02 | `24.png` | `c30cf3c115cbcc81c57543d600a34d0b07ac669ef5d4d71ffeb315502b945fb8` |
| D03 | `25.png` | `26362d6f6d6ec36636190e6ab8abacc7ad4e21dd623dfc45e91fe4c9ca4f7d1e` |
| D04 | `26.png` | `dfa425ae9ac8db28ef2c5e9d98fb53c9b1288f9f89f3f1483ea6ccf2a45ca405` |
| D05 | `27.png` | `d1f204794bcad7918c0e0b2cf4a00d0cd40fcbae1631c2091108795ec3b94adc` |
| E01 | `28.png` | `8e4b587f18cfd52c0592b9082e5b3c97c50c5be9415f66c0d60ce278a038ae6b` |
| E02 | `29.png` | `9c46161b3880cb29dfb65e4c8691683b758017f0776ae3f9e891562b146fb739` |
| E03 | `30.png` | `51b65e6dfbb18ba5fdc34c0ff56296821422b335e03fd3059ba2f894e5c12420` |
| E04 | `31.png` | `e70e719504ff0a83f9a3df2bc534262e3b6ff34899c70b4ac5c6cd96d62f8a2b` |
| E05 | `32.png` | `580b002ecff70fa92f8ca9bdee2ee8fbceb4a119637278a00250d083b2f3a33f` |
| E06 | `33.png` | `0eba9aec41d2adcb982935849351406665a32ef13a5a3267e8d3224607b45aa3` |
| E07 | `34.png` | `c31043ca67a07ad42e704ccf7dd9f82b4e207a57255d98173ef966ba05c28607` |
| E08 | `35.png` | `123876997618bf5db9085814d0a45c6180282465f8c3b1c9c27b376bb66def1e` |
| F01 | `36.png` | `922c7ee11d6085edf924b6466af79b9e91d9c0687fb30bebe10636b07901b7a9` |
| F02 | `37.png` | `4b24063f0ffcb54292a890030c3a22c9e590eccd136ed1926a35d15bfd8ff250` |
| F03 | `38.png` | `b191fbfb18dea914e38574198a7a1a813a227b8ebdb80f32f6963340a852b70d` |
| F04 | `39.png` | `7d71b164aaf4b3ef8aae90c03e73751f07f3ad2062c78d574ee8c45874fc894b` |
| F05 | `40.png` | `b8ef1f68fa4597e95a4b6a3797175de94e7d5388318a40d227c7845caa850140` |
| F06 | `41.png` | `063eb4dabfcfcb002c418a737a70e4c8528c41f70e31434d31e196be54830492` |
| F07 | `42.png` | `640150b94316804b4b6e04a3d8e8f5b4773ff477a3f0c0c436e22b53959d0548` |
| G01 | `43.png` | `fafbb55eb4f1f3a9905c075bba1dbcbbeb400800860ff2f911bfaa40de5bce60` |
| G02 | `44.png` | `9696a520fe0af0af30ddeee63b18bcf19a803a4d1205a64919ecdd9c6c1d0eac` |
| G03 | `45.png` | `721b47314e6f25e2680591730a32a137a9f76edb4a8cb358743b511f42c0f1da` |

### Năm báo cáo độc lập và các lượt tái kiểm

Các báo cáo dưới giữ kết luận tại thời điểm đọc cùng các phần tái kiểm bổ sung. Bảng quyết định ở trên xác định trạng thái xử lý cuối; một đề xuất đã đóng vẫn được giữ làm lịch sử.

### Phản biện toán học độc lập Bài 06

Ngày kiểm: 2026-09-27. Vai chỉ đọc: `/root/lec06_deck_math`. Đã đọc `AGENTS.md` và kỹ năng `no-ai-slop/SKILL.md`, áp dụng Detect. Không sửa kho; không đọc `.env`; không gọi dịch vụ mô hình. Báo cáo này chỉ chứng nhận phạm vi toán học đã kiểm, không thay bốn vai rà soát còn lại hoặc nghiệm thu trực quan.

#### Kết luận

Không phát hiện lỗi **chặn bàn giao** hoặc **nghiêm trọng** về toán học trong bản đã đọc. Các ví dụ số và đáp án trung tâm đúng; điều kiện CG, Newton–CG, BFGS, hiệu chỉnh Adam, BN, tiếp diễn và học theo chương trình được phân biệt với kết luận hội tụ. Có hai điểm trung bình và hai điểm nhẹ nên sửa để phát biểu, giả mã và học liệu tự đủ hơn. C06 là điểm nhẹ đã được điều phối viên báo trước; ba điểm còn lại được phát hiện khi đọc trực tiếp sản phẩm.

#### Vấn đề có cấu trúc

| Mã | Mức độ | Trang/vị trí | Vấn đề và bằng chứng | Đề xuất sửa |
|---|---|---|---|---|
| M01 | Nhẹ | C06, `lecture-note.md` §3.3 | Mặt trang có $K\ge1$ nguyên, kiểm dừng khởi tạo và $k+1=K$, nhưng danh sách bốn bước chưa ghi miền lặp. Ghi chú bài giảng dùng “Với $k=0,1,\ldots$” và “ngân sách $K$ vòng”, chưa định rõ $K$ nguyên dương. Thuật toán đúng khi hiểu lặp tự nhiên, nhưng người đọc phải tự bổ sung cấu trúc lặp. | Trước danh sách ghi “Với $k=0,\ldots,K-1$”; đồng bộ ghi chú bài giảng thành $K\ge1$ nguyên và nêu trả $d_{k+1}$ khi dừng. |
| M02 | Trung bình | D01, ghi chú diễn giả | Câu “Nếu $F$ khả vi hai lần trên đoạn nối” được dùng để suy $y=\int_0^1\nabla^2F(\theta+ts)s\,dt$. Chỉ khả vi hai lần chưa bảo đảm Hessian khả tích theo nghĩa thông thường; điều kiện an toàn là Hessian liên tục trên đoạn. `lecture-note.md` §4.1 đã có đúng điều kiện liên tục, nên hai sản phẩm hiện khác mức giả thiết. Kết quả bậc hai $y=Qs$ và công thức BFGS không bị ảnh hưởng. | Thay giả thiết của câu tích phân bằng “Nếu Hessian liên tục trên đoạn nối hai điểm” hoặc $F\in C^2$ trên một lân cận đoạn. Giữ nguyên công thức. |
| M03 | Trung bình | D04 bước 2; `lecture-note.md` §4.3 bước 3 | Bước chỉ ghi “tìm bước $\alpha>0$ trên cùng mục tiêu”. Điều kiện chấp nhận bước chưa tường minh; kiểm $s^\top y>0$ ở bước sau bảo vệ ma trận, không bảo vệ giá trị mục tiêu. Ví dụ $F(x)=x^2/2$, $x=1$, $P=1$, $d=-1$, chọn $\alpha=3$ cho $x^+=-2$, $s=y=-3$, $s^\top y=9>0$ nhưng $F$ tăng từ $1/2$ lên $2$. Notes có giải thích Wolfe đúng, song chưa ràng buộc bước được nhận phải giảm mục tiêu. | Ghi “tìm $\alpha>0$ làm giảm mục tiêu” trong giả mã; notes giữ Wolfe là một lựa chọn mạnh hơn giúp có độ cong dương. Nếu chọn đặc tả Wolfe thì cần nêu điều kiện đủ giảm cùng điều kiện độ cong, không chỉ điều kiện sau. Không cần thêm bài học Wolfe. |
| M04 | Nhẹ | `exercises.md`, Bài 2, đề mở đầu và lời giải phần 3 | Đề nói “Trong bài này bỏ $\varepsilon$”, nhưng phản ví dụ của phần 3 đổi sang $\varepsilon=1$. Phản ví dụ số đúng nhưng phạm vi giả thiết chưa thống nhất. | Thu hẹp lời mở đầu thành “Trong các phép tính số ở phần 1–2, bỏ $\varepsilon$”; phần 3 xét công thức tổng quát có $\varepsilon>0$. Hoặc giữ $\varepsilon=0$ và dùng dãy $g_1=1,g_2=1,g_3=10$: độ dài bước thứ hai $1/\sqrt2$ tăng thành $10/\sqrt{102}$ ở vòng ba. |

Các điểm trên không làm sai một đáp án hiện có hoặc một định lý trọng tâm. M02 sửa giả thiết của một diễn giải phụ; M03 làm rõ hợp đồng tìm bước thay vì thêm bảo đảm hội tụ.

#### Bảng phủ phạm vi

| Phạm vi | Nội dung đã đọc và kiểm | Kết quả |
|---|---|---|
| A01–A05, đủ nội dung và notes | Mục tiêu, quy ước gradient, hai bước thang đo, bài toán phạt SPD, trường hợp bất định | 5/5 trang; phép tính và phân biệt hướng giảm/bước hữu hạn đúng |
| B01–B09, đủ nội dung và notes | AdaGrad, RMSProp, Adam, hiệu chỉnh moment, moment thô/phương sai, giới hạn đường chéo, bài kiểm tra | 9/9 trang; đúng. Biến thể epsilon ngoài căn được xác định trong học liệu và dàn bài |
| C01–C08, đủ nội dung và notes | Newton, điều kiện cục bộ bậc hai, giảm chấn, hai vòng CG, kiểm phần dư, Newton–CG, $g=0$ | 8/8 trang; đúng; M01 |
| D01–D05, đủ nội dung và notes | Sai phân gradient, cát tuyến, nghịch đảo BFGS, chứng minh SPD, Wolfe, L-BFGS, bài kiểm tra | 5/5 trang; đúng công thức và số; M02–M03 |
| E01–E08, đủ nội dung và notes | BN, mục tiêu phụ thuộc lô, hạ khối, Polyak/Jensen, chuỗi đạo hàm và nối tắt | 8/8 trang; đúng; không suy hội tụ mạng sâu từ không tăng hoặc từ ví dụ |
| F01–F07, đủ nội dung và notes | Chuyển tham số, bước đồng thời, tiếp diễn bậc bốn, điểm dừng cố định, lịch phân phối | 7/7 trang; đúng; mục tiêu đích và ngân sách tách rõ |
| G01–G03, đủ nội dung và notes | Lựa chọn có điều kiện, ngân sách trạng thái, giải hệ và sai phân phối | 3/3 trang; đáp án đủ điều kiện toán học |
| `lecture-note.md` | Đọc toàn bộ 757 dòng, các chứng minh và lời giải; kiểm riêng CG §3.4, sai số nghiệm §3.5, BFGS §4.2, Jensen và tiếp diễn | Công thức và suy luận đúng; đồng bộ M01/M03 là đủ |
| `exercises.md` | Đọc toàn bộ 374 dòng; 12 bài, đủ đề, gợi ý và lời giải | Đáp án đúng; M04 |
| `outline.md` / `storyboard.md` | Đối chiếu 45 mã, bảy mạch, bảng V1–V16, hợp đồng ký hiệu và HT0–HT13, bản đồ hành trình | Cơ sở toán học được triển khai đúng. Các câu trạng thái “chưa đồng bộ” trong kế hoạch là trạng thái quy trình, không được dùng để kết luận sai nội dung hiện tại |
| 9 SVG thực sự dùng | Đọc XML, nhãn, tọa độ; tính ngược các đường đồng mức và đường hàm từ tọa độ SVG | Không phát hiện sai số toán học ngoài làm tròn tọa độ; chi tiết ở bảng dưới |

#### Phép tính độc lập

Tính lại bằng đại số và Python `fractions.Fraction`; không lấy kết quả từ một báo cáo cũ.

| Nhóm | Kết quả kiểm độc lập |
|---|---|
| Thang đo | $F(1,1)=5$; $\eta=1/5$ cho $(4/5,-4/5)$ và $16/5$; $\eta=1$ cho $(0,-8)$ và $288$. Lặp hội tụ từ mọi điểm đầu khi $0<\eta<2/9$. |
| Phạt ma trận | $d=-\eta M^{-1}g$; với $g=(2,8)$, $\eta=1/2$, hai ma trận SPD cho $(-1,-4)$ và $(-1,-1)$. Ma trận $\operatorname{diag}(1,-4)$ cho $8z-4z^2\to-\infty$. |
| AdaGrad/RMSProp | AdaGrad $v_1=(4,1)$, $v_2=(8,1)$, $d_2=(-1/\sqrt2,0)$. RMSProp $v_1=(2,1/2)$, $v_2=(3,1/4)$, $d_1=(-\sqrt2,-\sqrt2)$, $d_2=(-2/\sqrt3,0)$. |
| Adam | Với $g_1=2,g_2=0$: $(m_2,v_2)=(1/2,3/4)$, $(\widehat m_2,\widehat v_2)=(2/3,12/7)$, $d_2=-0{,}5091750772\ldots$. Với $g_2=-1/5$, $m_2=2/5$ nên $g_2d_2>0$. Hiệu chỉnh kỳ vọng chỉ cần moment chung và tuyến tính kỳ vọng, không cần độc lập. |
| Newton | $Q$ có trị riêng $1,3$; $Q(-1,0)^\top=-(2,1)^\top$. Ví dụ bất định: Newton cho $g^\top d=1$, giảm chấn $2I$ cho $-1$. Điều kiện SPD chính xác là $\lambda>-\lambda_{\min}(H)$. |
| CG | $\alpha_0=2/5$, $r_1=(3/5,-3/5)$, $\beta_0=9/25$, $p_1=(24/25,-6/25)$; $p_0^\top Ap_1=0$, $p_0^\top p_1=18/25$; $p_1^\top Ap_1=144/125$, $\alpha_1=5/8$, $d_2=(1,1/4)$, $r_2=0$. $\|r_1\|=0{,}848528\ldots$. |
| Newton–CG | Từ $r=-g-Ad$, suy $d-d_*=-A^{-1}r$ và $g^\top d=-d^\top Ad-r^\top d$. CG số học chính xác từ $0$ tạo hướng giảm khi bước khác $0$; học liệu đã nêu điều này và vẫn giữ kiểm dấu để bảo vệ triển khai. |
| BFGS | Nhân công thức cho $P_1=\left(\begin{smallmatrix}3/4&-1/2\\-1/2&1\end{smallmatrix}\right)$, $P_1y=s$, $\det P_1=1/2$; hướng cho $g=(1,0)$ là $(-3/4,1/2)$. Dạng toàn phương chứng minh SPD đúng. Cặp $y=(-1,1)$ không thể thỏa cát tuyến với ma trận SPD. |
| BN | Hai lô dịch chuyển có $(\mu,\sigma^2)=(3,4),(7,4)$. Lô $(1,1,1,5)$ có $(2,3)$. Với $\varepsilon=1$, giá trị $5$ cho $2/\sqrt5$ hoặc $3/2$. Phương sai chuẩn hóa $4/5$; sau affine phải nhân $\gamma^2$, học liệu đã tách rõ. |
| Hạ tọa độ | Dãy giá trị $2,1,3/4,11/16,43/64$ ứng với các điểm trong ghi chú. Nghiệm $(2/3,2/3)$ có giá trị $2/3$. |
| Polyak/kiến trúc | Trung bình bốn điểm bằng $2$; hai nghiệm $\pm1$ của hàm bậc bốn cho trung bình có mất mát $1$. Tích qua năm lớp là $10^{-5}$ và $1{,}61051$. |
| Tiền huấn luyện | Bước đồng thời $(2,1)\mapsto(21/10,6/5)$ cho tích $63/25$ và mất mát $72/625$. Điểm $(0,0)$ có gradient bằng $0$. |
| Tiếp diễn | $F_\lambda'=\theta(4\theta^2+2\lambda-4)$; $0$ luôn dừng. Với $\lambda=3/2$, cực tiểu $\pm1/2$ có giá trị $15/16$. Với $\lambda=2$, $F_2=\theta^4+1$ vẫn có cực tiểu duy nhất $0$. |
| Chương trình | $F_q'=(1+8q)\theta-(1+2q)$; ba nghiệm $1,1/2,2/5$. Mất mát đích tại hai nghiệm sau là $1/8$ và $1/10$, chênh $1/40$. Tại $\theta=1/2$, mọi $F_q$ cùng bằng $1/8$; nhận xét trong ghi chú đúng. |

#### Kiểm toán học của hình

| SVG | Phép kiểm |
|---|---|
| `scale-step.svg` | Hai điểm mới đúng theo hai hệ trục riêng; đường đồng mức có giá trị xấp xỉ $0{,}5;2;5$. Dao động lớn nhất trên một đường dưới $0{,}0011$ do lưu tọa độ hai chữ số. |
| `rms-weights.svg` | Tính ngược đủ 18 điểm cho $(1-\rho)\rho^k$, $k=0,\ldots,8$, $\rho=0{,}5;0{,}9$; sai số tuyệt đối dưới $10^{-5}$. |
| `tilted-curvature.svg` | Bốn đường có $F\approx0{,}15;0{,}4;1;1{,}5$, trục riêng ứng với $(1,1)$ và $(1,-1)$; dao động dưới $0{,}00024$. |
| `newton-direction.svg` | Cùng các đường mức đúng; mũi Newton tới gốc. Mũi $-g$ có độ dời toán học $(-1{,}25,-0{,}625)$, đúng hệ số $5/8$ ghi trong notes. |
| `cg-path.svg` | Đường đi đúng $0\to(2/5,2/5)\to(1,1/4)$. Các đường $q$ có giá trị xấp xỉ $-0{,}605;-0{,}545;-0{,}425;-0{,}125$ và dao động dưới $0{,}000074$. |
| `batch-shift.svg` | Vị trí tám dấu chấm, hai trung bình và hai phương sai đúng; đầu ra giới hạn ghi đúng. |
| `coordinate-path.svg` | Hai đoạn song song trục tới $(1,0)$ rồi $(1,1/2)$; nghiệm đánh dấu đúng $(2/3,2/3)$. Các đường mức quanh nghiệm đúng trong sai số làm tròn dưới $0{,}00015$. |
| `gradient-chain.svg` | Mỗi chuỗi có năm cạnh, hệ số $0{,}1$ hoặc $1{,}1$; tích cuối đúng. Đây là hệ số qua khối, phù hợp phân biệt với gradient đầy đủ trong E07. |
| `continuation-quartic.svg` | Tính ngược đủ các điểm của ba đường hàm; sai số tuyệt đối dưới $0{,}00031$. Năm dấu cực tiểu đúng vị trí và giá trị. |

Kiểm hình ở đây là kiểm dữ liệu và hình học SVG, không chứng nhận kích thước chữ hoặc cách trình duyệt hiển thị.

#### Đối chiếu nguồn và Detect

Đã mở lại các nguồn chính thức, độc lập với báo cáo cũ: [Shewchuk 1994](https://www.cs.cmu.edu/~quake-papers/painless-conjugate-gradient.pdf) cho hệ SPD/truy hồi CG; [CMU Quasi-Newton](https://stat.cmu.edu/~ryantibs/convexopt/lectures/quasi-newton.pdf), tr.13–16 cho công thức nghịch đảo, bảo toàn SPD và điều kiện độ cong; [Adam](https://arxiv.org/pdf/1412.6980), thuật toán 1 và §3 cho chỉ số, epsilon và moment không đổi; [BN](https://proceedings.mlr.press/v37/ioffe15.pdf), thuật toán 1 và §3.1 cho phương sai lô, phụ thuộc lô và thống kê suy luận. Các công thức được đối chiếu phù hợp.

[Deep Learning, Chương 8](https://www.deeplearningbook.org/contents/optimization.html), §8.7.3 và §8.7.6, xác nhận phân biệt trung bình đều/trung bình mũ và cách thay trọng số hoặc tần suất lấy mẫu trong chương trình. URL bản tác giả bài Curriculum trả lỗi trong lần mở này; không suy rằng nguồn không tồn tại và không ghi đã đọc lại PDF đó. Phép tính chương trình được kiểm trực tiếp từ hàm tự xây dựng, nguồn giáo trình truy cập được đủ kiểm cơ chế được dùng.

Detect bao phủ tiêu đề, nội dung, notes và hai học liệu. Không phát hiện câu dẫn rỗng, kết luận kịch tính hoặc lời ca tụng cần xử lý trong phạm vi đọc. Các câu phủ định bảo đảm toàn cục có chức năng phân biệt toán học, không đánh dấu máy móc thành lỗi đối lập nhị nguyên. Không chấm điểm phát hiện AI hoặc suy đoán tác giả.

Đề nghị điều phối viên ghi phạm vi và kết quả Detect vào `review-log.md`, xử lý M01–M04 rồi gửi tái kiểm. Chỉ sau đủ các vai còn lại mới có căn cứ nghiệm thu toàn bộ bộ trang chiếu.

#### Tái kiểm lần 1 sau sửa M01–M04

Ngày 2026-09-27. Đã đọc `/tmp/lec06-deck-editor-math.md`, sau đó kiểm trực tiếp các tệp hiện tại. Chuỗi `bd98ed3...` là SHA-256 của HTML, không phải mã commit Git. Bản tái kiểm có các checksum khớp bàn giao của tác tử biên tập:

```text
bd98ed3b877c625828b9d9ba558bac15797a238a5b8ac35bc1307c4f652c9101  lecture-06-toi-uu-mang-sau.html
0c0adae0db2be1c980681bc7fc8d3d3becb1cc0a59b4dd4493697f9960e80237  materials/lec-06/lecture-note.md
175f30c3ba342c61c203f989000f16c65cd06184c23f1bbc2fa3c14905b459c6  materials/lec-06/exercises.md
fd535aea19a526dd56abc57b41f9fe1aec64a333b3b5e668e060eaf2a317ff62  material-local-data.js
```

| Mã | Kết quả | Bằng chứng tái kiểm |
|---|---|---|
| M01 | Đóng | C06 đặt “Với $k=0,\ldots,K-1$, lặp” trước đủ bốn bước; giữ $K\ge1$ nguyên, kiểm khởi tạo, kiểm phần dư mới trước $\beta_k$ và trả ở $k+1=K$. Ghi chú §3.3 đã thống nhất $\tau>0$, ngân sách nguyên, miền lặp và đầu ra. Với $K=1$, trả $d_1$ sau một vòng; với nghiệm ở điểm đầu, trả $d_0$ trước mọi phép chia. |
| M02 | Đóng | D01 notes đã dùng “Nếu Hessian liên tục trên đoạn nối hai điểm”; công thức tích phân giữ nguyên và khớp §4.1. Giả thiết đủ cho áp dụng định lý cơ bản của giải tích lên gradient dọc đoạn. |
| M03 | Đóng | D04 yêu cầu tìm $\alpha>0$ làm giảm cùng $F$. Notes tách điều kiện $y^\top s>0$ khỏi việc nhận bước tham số và xác định ngân sách đếm bước được nhận. §4.3 viết rõ $F(\theta+\alpha d)<F(\theta)$, nhận hoặc giữ $P$, nhận tham số và lặp. Phản ví dụ $x=1,\alpha=3$ của vòng đầu sẽ bị loại ở phép kiểm giảm; không còn dùng dấu cặp để thay kiểm mục tiêu. |
| M04 | Đóng | Đề Bài 2 chỉ bỏ $\varepsilon$ ở phần 1–2 và quy định phần 3 xét $\varepsilon>0$. Phản ví dụ với $\varepsilon=1$ giữ nguyên, đúng vì $10/(\sqrt{101}+1)>1/2$. Phần 4 về thống kê không phụ thuộc epsilon. |

Phạm vi hồi quy: đọc lại C04–C08, D01–D05 và E01, gồm ít nhất hai trang liền trước/sau mỗi vị trí sửa khi xét hợp phạm vi. Đọc lại ghi chú §3.3–§4.3 và Bài 1–4 trong tệp bài tập. So sánh văn bản 45 trang với bản trích ở vòng đầu xác nhận chỉ C06, D01, D04 đổi nội dung; không có thay đổi kín ở trang khác. Các ví dụ CG, cặp BFGS và bài kiểm tra liền kề giữ nguyên đáp số và điều kiện đã kiểm. Không phát hiện hồi quy toán học.

Chạy độc lập `python3 2627-1/scripts/sync-local-materials.py --check`: đạt, bản đóng gói khớp 14 Markdown. Đây là kiểm chỉ đọc; không ghi vào kho.

Detect cho phần vừa sửa: câu trực tiếp, ký hiệu và thuật ngữ nhất quán; không phát hiện lời dẫn rỗng hoặc phô trương. Phân biệt kiểm giảm mục tiêu với kiểm độ cong là nội dung toán học cần giữ.

**Kết luận tái kiểm:** M01–M04 đều đã đóng. Trong phạm vi toán học đã kiểm, hiện không còn phát hiện mở ở bất kỳ mức nào; không có lỗi chặn bàn giao hoặc nghiêm trọng. Kết luận chỉ áp dụng cho các checksum trên. Các đề xuất đang chờ về nhãn $d/r/p$ tại C05, biến có phương sai tại E03 và cặp mẫu $(x,y)$ tại F05 chưa được chỉnh trong bản này, nên chưa thuộc phần xác nhận sửa. Bốn vai còn lại đã được điều phối viên mở; báo cáo không kết luận quy trình còn bị chặn bởi công cụ và không thay nghiệm thu đủ năm vai.

#### Tái kiểm lần 2: bản biên tập cuối

Ngày 2026-09-27. Kiểm chỉ đọc trực tiếp HTML có SHA-256 `6561e164fdcc24f84a7b6bccff2cb171142b5e7ac3a040d77521f4c5979396e4`, khớp đúng bản điều phối viên giao. Tệp bàn giao `/tmp/lec06-deck-editor-final.md` chưa tồn tại ở hai lần kiểm trong lượt này; kết luận dựa trên sản phẩm thực tế và phạm vi sửa do điều phối viên cung cấp, không dựa trên báo cáo chưa đọc.

Phạm vi: C05, E03, F04–F06, G02 cùng hai trang lân cận mỗi phía khi còn trang trong bộ; hợp phạm vi gồm C03–C07, E01–E05, F02–G03. Đọc thêm B03/B05/B07 và F02 cho việc thống nhất “xác thực”; đối chiếu ghi chú §2.4, §3.3, §5.1, §6.3–§6.4, các bài tập liên quan và các điều kiện đã đóng ở M01–M04.

| Sửa đổi | Kết quả toán học |
|---|---|
| C05 định nghĩa $d_k,r_k,p_k$ trước ví dụ; hiện thương tính $\alpha_0$ và cách tạo $p_1$ | Đạt. $r_0=p_0=(1,1)^\top$ cho $\alpha_0=2/5$. Do $d_0=0$, cách viết $d_1=\alpha_0p_0$ đúng. $r_1=(3/5,-3/5)^\top$ và $p_1=r_1+(9/25)p_0$ cho $(24/25,-6/25)^\top$, nên $p_0^\top Ap_1=0$. Ghi chú còn đầy đủ suy ra $\beta_0$, kết quả số $p_1$ và vòng hai; hình và học liệu khớp. Việc chuyển số vòng hai khỏi mặt trang không làm mất giả thiết hoặc biến đổi. |
| E03 chỉ rõ phương sai lô của $\widehat a$ | Đạt. Công thức $\sigma_\mathcal B^2/(\sigma_\mathcal B^2+\varepsilon)$ thuộc biến trước affine; ghi chú bài giảng vẫn phân biệt phương sai của $z$ bằng $\gamma^2$ lần đại lượng này. Không còn khả năng gán trực tiếp công thức trên cho $z$ từ nhãn mặt trang. |
| F05/G02 định danh $E,H$ là cặp mẫu $(x,y)$ | Đạt. Với $f_\theta(x)=\theta x$ và hai nhãn bằng $1$, hai mất mát, trọng số, nghiệm $\theta_q^*=(1+2q)/(1+8q)$ và các đáp án giữ nguyên. Ghi chú §6.3 đã thêm cùng định danh. |
| F04 đổi “gần giải” thành “giải gần đúng” | Đạt. Không thay quy trình hoặc khẳng định bảo đảm. Phản ví dụ gradient giữ nguyên $0$ vẫn được giới hạn rõ cho khởi tạo chính xác tại $0$. |
| F06 thay câu điều phối bằng câu nối học thuật | Đạt. Ba phép kiểm gắn đúng với bước tinh chỉnh, truyền nghiệm và phân phối cuối. Không bổ sung kết luận hội tụ hay ưu thế phương pháp. |
| Thống nhất “xác thực” trong thuật toán và học liệu | Đạt. Thuật ngữ chỉ tiêu chí chọn điểm/dừng đã định; không bị dùng thay cho kiểm hướng, kiểm phần dư hoặc chứng nhận điểm dừng. Phân biệt tập xác thực với tập kiểm tra cuối vẫn được giữ. |
| Hồi quy M01–M04 | M01–M04 tiếp tục đóng: C06 còn miền lặp và kiểm dừng; D01 còn giả thiết Hessian liên tục; D04 còn điều kiện giảm cùng mục tiêu; Bài 2 còn phạm vi epsilon phần 1–2 và phần 3 riêng. |

Checksum học liệu của bản này:

```text
54a9d86124db41a3222c9d6473b6355dc88b30933614ddad914cb33ea3754050  materials/lec-06/lecture-note.md
175f30c3ba342c61c203f989000f16c65cd06184c23f1bbc2fa3c14905b459c6  materials/lec-06/exercises.md
b49545668012918811f944db519a0bd35ee5d79c95a911b76e29c40327124ef6  material-local-data.js
```

Chạy lại kiểm chỉ đọc `sync-local-materials.py --check`: đạt, bản đóng gói khớp 14 Markdown. Detect trên câu vừa sửa không phát hiện vấn đề mới; ký hiệu, giả thiết và các phân biệt toán học được bảo toàn.

**Kết luận toán học cuối:** Không phát hiện hồi quy; toàn bộ phát hiện M01–M04 đã đóng. Không còn lỗi toán học mở, chặn bàn giao hoặc nghiêm trọng trong phạm vi đã kiểm của bản SHA-256 nêu trên. Không yêu cầu sửa toán học thêm. Chứng nhận hiển thị và nghiệm thu chung thuộc kết quả tổng hợp các vai của điều phối viên.


### Rà soát độc lập mạch lập luận Bài 06

Ngày rà: 2026-09-27. Vai: mạch lập luận và liên kết trang chiếu, chỉ đọc. Đã đọc AGENTS.md và kỹ năng no-ai-slop, chế độ Detect. Đầu vào chính là nội dung và ghi chú của `2627-1/lecture-06-toi-uu-mang-sau.html`; đối chiếu với `planning/lec-06/outline.md` và `storyboard.md`. Kết luận dưới đây được rút từ bản HTML, không kế thừa kết luận rà soát trong hồ sơ cũ. Không sửa tệp trong kho; không gọi API, không dùng OpenRouter và không đọc tệp môi trường.

#### Kết luận và phạm vi

Bản HTML có đủ 45 trang, phân vào đúng 7 mạch ngoài: 5 + 9 + 8 + 5 + 8 + 7 + 3. Các mục trang trong dàn ý và storyboard cùng có đúng 45 mã, không trùng và khớp HTML. Không phát hiện lỗi chặn bàn giao, nghiêm trọng hoặc trung bình thuộc vai mạch lập luận. Có một lỗi nhẹ về trạng thái hồ sơ, ghi ở cuối báo cáo.

Cơ sở chung có hai tầng phù hợp với phạm vi bài. Sơ đồ quá trình huấn luyện ở A02 xác định dữ liệu/mô hình, mục tiêu/điểm đầu, quy tắc cập nhật/quỹ đạo và quy tắc trả về/đầu ra. Mô hình bước có phạt xác định dương ở A04 cụ thể hóa nhóm quyết định cập nhật, nối B–D bằng ma trận phạt, thống kê gradient, độ cong và xấp xỉ nghịch đảo. E–F quay về sơ đồ quá trình để phân biệt các can thiệp ngoài bước cập nhật. Bài không suy ra một định lý hội tụ chung cho mọi can thiệp.

Phạm vi kiểm tra này là quan hệ học thuật và vai trò trang. Không chứng nhận thay vai toán học, nguồn, storyboard hoặc kiểm tra trực quan. Đã đọc lại C06 có miền vòng lặp, D01 có giả thiết Hessian liên tục và D04 có bước làm giảm cùng mục tiêu sau chỉnh sửa; các sửa này giữ nguyên quan hệ trước–sau.

#### Bảng phủ cấp mạch

| Mạch | Chức năng | Đầu vào | Đầu ra | Đóng góp cho vấn đề trung tâm và bằng chứng ranh giới |
|---|---|---|---|---|---|
| A | Xác lập bài toán và công cụ mô hình bước | Gradient, hàm bậc hai, cập nhật SGD | Sơ đồ thành phần; bước có phạt và điều kiện xác định dương | A03 cho thất bại của bước vô hướng, A04 giải bằng ma trận phạt; notes A05 đặt nhu cầu ước lượng thang từ lịch sử gradient. |
| B | Dựng bước từ thống kê theo tọa độ | Mô hình A04 và gradient cho sẵn | AdaGrad, RMSProp, Adam; phân biệt hướng moment và giới hạn đường chéo | B08 dùng hạng tương tác ngoài đường chéo; notes B09 nối giới hạn này với Hessian ở C01. |
| C | Dùng độ cong và giải hệ có kiểm soát | Giới hạn đường chéo; Hessian và xác định dương | Hướng Newton, giảm chấn, CG, phép kiểm phần dư/hướng | C07–C08 nêu toán tử cố định, điều kiện SPD và giới hạn khi thiếu tích Hessian–vectơ; D01 nhận trực tiếp giới hạn này. |
| D | Xấp xỉ độ cong từ gradient | Gradient hai điểm cùng mục tiêu; thiếu toán tử độ cong | Cát tuyến, BFGS, bảo toàn SPD, chi phí và kiểm cặp | Notes D04–D05 nói rõ phương pháp mới chỉ thay cách sinh bước; E01 gọi lại thành phần mô hình, khối và đầu ra. |
| E | Phân biệt phép tính mô hình, biến được cập nhật và đầu ra | Giới hạn của can thiệp bước | Chuẩn hóa theo lô, hạ khối, trung bình, đường truyền gradient cùng điều kiện riêng | E03 sửa giả thiết mục tiêu độc lập mẫu; E08 đóng bốn phép kiểm, rồi mở điểm đầu/mục tiêu/phân phối theo giai đoạn. |
| F | Tổ chức các giai đoạn theo đối tượng thay | Điểm đầu, mục tiêu, dữ liệu đích | Phép chuyển tham số, họ mục tiêu, lịch phân phối, hồ sơ đánh giá | F06 đối chiếu đích và toàn ngân sách; notes F07 đưa kết quả vào lựa chọn phối hợp ở G01. |
| G | Tổng hợp điều kiện lựa chọn và kiểm chuyển giao | Các cơ chế, giả thiết, giới hạn A–F | Phương án có dữ kiện, cơ chế, điều kiện, chi phí, phép kiểm | G01 tái dùng đúng sơ đồ A02; G02 kiểm ba tình huống có ràng buộc thay vì xếp hạng tên thuật toán; G03 cung cấp đường truy nguyên. |

#### Bảng phủ 45 trang

Mỗi hàng xác định vai trò, kết nối vào, bước mới hoặc kết quả cần đạt và kết nối ra. Quyết định trong phạm vi mạch lập luận: giữ cả 45 trang; không đề xuất thêm, bỏ, gộp, tách hoặc đổi thứ tự.

| Trang | Vai trò trong lập luận | Kết nối vào | Kết quả cần đạt | Kết nối ra |
|---|---|---|---|---|
| A01 | Xác lập phạm vi | Tiên quyết Bài 05 được nêu trong notes | Phân biệt thống kê, độ cong và tổ chức huấn luyện | A02 chuyển phạm vi thành các quyết định học tập. |
| A02 | Luận đề và sơ đồ chung | Phạm vi A01 | Lựa chọn thành phần cần điều chỉnh với ba nhóm mục tiêu | A03 xét cụ thể giới hạn bước vô hướng. |
| A03 | Nhu cầu và ví dụ sai lệch thang | Quyết định cập nhật ở A02 | Hai bước cùng gradient có hệ quả khác do độ cong | A04 thay hệ số chung bằng ma trận phạt. |
| A04 | Suy ra công cụ chung B–D | Hàm và gradient A03 | Bước duy nhất dưới SPD; tách gradient đầy đủ/lô | A05 kiểm công thức và giả thiết. |
| A05 | Kiểm đầu mạch | Công thức và dạng toàn phương A04 | Tính hai bước; bác ma trận khiến bài toán không bị chặn | Notes tạo nhu cầu ước lượng thang ở B01. |
| B01 | Giới thiệu thống kê có căn cứ | Chưa biết ma trận phạt thích hợp | Bình phương tránh triệt tiêu dấu; tích lũy theo tọa độ | B02 dùng đúng dãy số. |
| B02 | Tính bước AdaGrad | Dãy gradient B01 | Phân biệt thống kê, tốc độ hiệu dụng và độ dài bước | B03 tổng quát và xử lý mẫu bằng không. |
| B03 | Thuật toán và giới hạn tích lũy | Phép tính B02 | Quy tắc khép kín, ma trận phạt, chi phí, ứng dụng tọa độ thưa | Thống kê không quên đặt nhu cầu RMSProp B04. |
| B04 | Ví dụ thay cơ chế nhớ | Giới hạn tích lũy B03 | Trọng số suy giảm làm khác thống kê trên cùng dãy | B05 tổng quát hóa độ trễ. |
| B05 | RMSProp và hệ quả bộ nhớ | Ví dụ trung bình mũ B04 | Quy tắc, trọng số, thống kê khi vắng gradient | B06 thêm moment bậc nhất và hiệu chỉnh. |
| B06 | Ví dụ hiệu chỉnh | Tổng trọng số trung bình mũ chưa bằng một | Moment thô và đã hiệu chỉnh ở vòng đầu | B07 hoàn thiện Adam. |
| B07 | Adam và giới hạn hướng | Cơ chế hiệu chỉnh B06; momentum tiên quyết | Phân biệt moment bậc hai thô/phương sai và moment/gradient hiện tại | B08 chuyển sang giới hạn khác: tương tác tọa độ. |
| B08 | Chuẩn bị nhu cầu độ cong đầy đủ | Ma trận chuẩn hóa đường chéo B01–B07 | Hạng tương tác không thể được tái tạo bằng dạng đường chéo | B09 kiểm thống kê; C01 tiếp nhận đúng ma trận nghiêng. |
| B09 | Kiểm cơ chế trạng thái | Ba thuật toán đã hoàn chỉnh | Tính vòng hai, giải thích Adam còn dịch chuyển | Notes gọi lại tương tác để vào C01. |
| C01 | Hình học độ cong tương tác | Ma trận B08 | Gradient âm không hướng thẳng tới nghiệm | C02 giải hệ dùng toàn bộ ma trận. |
| C02 | Ví dụ Newton | Hessian/gradient C01 | Bước chính xác của mô hình bậc hai | C03 tổng quát và hạn chế kết quả một bước. |
| C03 | Newton và các giả thiết | Phép giải hệ C02; mô hình A04 | SPD cho hướng giảm; tốc độ bậc hai cần điều kiện cục bộ | C04 phá giả thiết SPD để kiểm giới hạn. |
| C04 | Phản ví dụ và giảm chấn | Điều kiện hướng giảm C03 | Hessian khả nghịch chưa đủ; dịch trị riêng để có SPD | Hệ hợp lệ cần cách giải qua tích ma trận ở C05. |
| C05 | Ví dụ CG | Hệ SPD C04 | Phần dư, bước tìm kiếm, hướng liên hợp, hai vòng số | C06 tổng quát cùng ký hiệu vòng trong. |
| C06 | Bộ giải tuyến tính có dừng | Phép tính C05 | Toán tử cố định; truy hồi đầy đủ; dừng trước chia; chi phí | C07 gắn bộ giải vào vòng Newton ngoài. |
| C07 | Ghép Newton và CG | Hệ SPD cùng bộ giải C06 | Tách phần dư khỏi kiểm hướng, xử lý gradient bằng không | C08 kiểm hệ và phần dư; D01 thay nguồn độ cong. |
| C08 | Kiểm giả thiết rồi tính | C04–C07 | Chọn giảm chấn hợp lệ và quyết định chưa đạt dung sai | Notes nêu trường hợp thiếu toán tử dẫn vào D01. |
| D01 | Nguồn độ cong thay thế | Hạn chế toán tử ở C07–C08 | Sai phân cùng mục tiêu cho cát tuyến; một hướng chưa đủ Hessian | D02 kiểm một cập nhật cụ thể. |
| D02 | Ví dụ hai yêu cầu ma trận | Cát tuyến D01 | Kiểm cát tuyến và SPD riêng; xấp xỉ khác nghịch đảo thật | D03 cho công thức bảo toàn hai yêu cầu. |
| D03 | Kết quả BFGS | Điều kiện số D02 | Cát tuyến và SPD dưới điều kiện độ cong dương | D04 dùng ma trận tạo hướng và quản lý cặp. |
| D04 | Thuật toán và tài nguyên | Cập nhật hợp lệ D03 | Hướng, bước giảm, nhận/bỏ cặp, chi phí BFGS/L-BFGS | D05 kiểm độc lập cặp và hướng; notes mở các thành phần còn lại. |
| D05 | Kiểm điều kiện | D03–D04 | Phân biệt nhận cặp với dùng ma trận đã có tạo hướng | Notes nối việc chỉ thay bước với nhu cầu E01. |
| E01 | Gọi lại cơ sở toàn bài | Nhóm cập nhật B–D đã hoàn tất | Định vị phép tính, biến cập nhật, đầu ra | Nhu cầu thang đặc trưng dẫn E02. |
| E02 | Ví dụ BN và phụ thuộc lô | Phép tính tầng E01 | Dịch chung vẫn cùng chuẩn hóa; cùng giá trị có đầu ra tùy lô | E03 định nghĩa và sửa giả thiết mục tiêu. |
| E03 | BN cùng hai chế độ | Trung bình/phương sai E02 | Phương sai có epsilon; học/suy luận; mục tiêu theo lô | Notes phân biệt thay phép tính với thay tập biến E04. |
| E04 | Ví dụ bài toán con | Thành phần tập biến từ E01/E03 | Một tọa độ làm bài toán dễ giải; dùng giá trị mới | E05 tổng quát thành hạ khối. |
| E05 | Quy tắc và tính không tăng | Lượt cập nhật E04 | Điều kiện khả thi và nghiệm con đủ để không tăng | Quỹ đạo sinh ra dẫn tới quy tắc trả về E06. |
| E06 | Đầu ra trung bình và giới hạn | Quỹ đạo đã có | Tính trung bình đều; phản ví dụ phi lồi; không đồng nhất với momentum | Notes nhắc đầu ra không sửa đạo hàm do kiến trúc tạo ở E07. |
| E07 | Yếu tố kiến trúc trước cập nhật | Giới hạn của thay bước/đầu ra | Tích đạo hàm chỉ là thừa số; nối tắt có giới hạn theo độ sâu | E08 kiểm cùng ba can thiệp trước; notes nối kiến trúc/điểm đầu. |
| E08 | Kiểm phân biệt can thiệp | E02–E07 | Phương sai, điều kiện không tăng, phản ví dụ trung bình, giới hạn nối tắt | Notes chuyển tới điểm đầu, mục tiêu và phân phối ở F. |
| F01 | Ví dụ điểm đầu có tín hiệu | E07–E08 xác định vai trò điểm đầu | Chuyển tham số phụ tạo gradient khác và bước tinh chỉnh tính được | F02 tổng quát phép chuyển. |
| F02 | Quy trình tiền huấn luyện | Ví dụ chuyển hệ số F01 | Phần giữ/mới, nhiệm vụ phụ/đích, tinh chỉnh, ngân sách | Notes đối chiếu với giữ không gian tham số nhưng đổi mục tiêu F03. |
| F03 | Họ mục tiêu có cấu trúc nghiệm thay đổi | Can thiệp mục tiêu thay cho chỉ điểm đầu | Đồ thị/phép tính tạo giả thuyết truyền nghiệm cần kiểm | F04 kiểm đường điểm dừng thay vì suy ưu thế từ hình. |
| F04 | Tiếp diễn và phản ví dụ đường đi | Họ mục tiêu F03 | Điểm dừng có thể giữ nguyên dù mất tính cực tiểu | Notes đổi cơ chế tạo họ mục tiêu sang lấy mẫu F05. |
| F05 | Phân phối sinh mục tiêu | Ý tưởng họ mục tiêu F04 | Trọng số dữ liệu đổi nghiệm; phân phối cuối phải đúng đích | F06 thống nhất điều kiện đánh giá ba cơ chế. |
| F06 | Hồ sơ đánh giá giai đoạn | Phép chuyển, họ hàm, phân phối F01–F05 | Ghi đúng đối tượng thay, đích, dữ liệu và toàn chi phí | F07 kiểm bằng ba dữ kiện số. |
| F07 | Kiểm cơ chế giai đoạn | F01–F06 | Bước tinh chỉnh, mắc điểm dừng, sai mục tiêu cuối | Notes đưa kết quả vào lựa chọn phối hợp G01. |
| G01 | Trả lời vấn đề mở đầu | Cơ chế/giới hạn A–F | Bảng dữ kiện–cơ chế–giả thiết–phép kiểm theo đúng sơ đồ A02 | G02 yêu cầu lập phương án có điều kiện. |
| G02 | Minh chứng tổng hợp | Bảng lựa chọn G01; toàn bộ công cụ đã dạy | Chọn theo bộ nhớ, giải hệ có kiểm, sửa phân phối đích; không dùng trung bình để sửa sai mục tiêu | G03 chỉ đường đối chiếu và tự học. |
| G03 | Truy nguyên kết quả | G02 hoàn tất nội dung đánh giá | Vị trí nguồn để kiểm biến thể/giả thiết | Kết thúc tuyến; không đưa kết quả toán mới chưa chuẩn bị. |

#### Mở bài, kết luận và câu hỏi

A02 nêu bài toán lựa chọn thành phần khi tốc độ học vô hướng chưa đủ; G01 giữ đúng sơ đồ và bổ sung bảng điều kiện, G02 buộc sử dụng bảng đó trên dữ kiện cụ thể. Vì vậy kết luận giải quyết vấn đề mở đầu bằng phương án có điều kiện, không khẳng định có một bộ tối ưu tốt nhất.

Bảy trang kiểm tra A05, B09, C08, D05, E08, F07 và G02 đều sử dụng công cụ đã được giới thiệu. A05 đo tính hợp lệ của mô hình bước; B09 đo trạng thái thay vì chỉ nhận dạng tên; C08 yêu cầu chọn SPD trước khi tính CG; D05 tách cặp độ cong và hướng; E08 kiểm các giới hạn khác nhau; F07 kiểm điểm đầu và đích; G02 tích hợp nguồn lực với phép kiểm. L-BFGS chỉ dùng ở mức chi phí, không có bài tập đòi đệ quy chưa dạy. G02 không đòi nội dung Wolfe để trả lời. Chưa phát hiện tiên quyết ẩn khiến người học phải dùng kết quả ngoài tuyến.

Ranh giới dễ đứt D→E và E→F đều có câu nối cụ thể trong notes. Việc E06→E07 quay từ đầu ra về kiến trúc được giải thích bằng quan hệ nhân quả: đổi đầu ra không thay các đạo hàm của mô hình. B08 và C01 cùng dùng ma trận nghiêng nhưng không lặp chức năng: B08 chứng minh giới hạn của biểu diễn đường chéo; C01 lập mục tiêu và gradient để chuẩn bị hệ Newton.

#### Phát hiện có cấu trúc

| Mã | Mức độ | Vị trí | Vấn đề và bằng chứng | Vai trò / kết nối vào / kết nối ra / kết quả cần đạt | Đề xuất |
|---|---|---|---|---|---|
| ARG-01 | Nhẹ | `outline.md`, phần Thông tin chung; `storyboard.md`, Phạm vi | Dàn ý ghi “Bản này chỉ là kế hoạch mới; HTML và tài liệu công khai hiện có chưa đồng bộ”; storyboard ghi “Bản này chưa đồng bộ RevealJS.” HTML hiện đã chứa đủ đúng 45 mã và tuyến 7 mạch được mô tả. Đây là trạng thái hồ sơ lỗi thời, chưa phải lỗi nội dung bài. | Vai trò: xác định phiên bản được kiểm. Kết nối vào: kế hoạch đã chốt. Kết nối ra: bản HTML đang được rà. Kết quả cần đạt: người đọc nhận biết rõ nội dung nào đã triển khai và bước kiểm nào còn chờ. | Cập nhật riêng trạng thái triển khai RevealJS và trạng thái kiểm định/tài liệu công khai; giữ lịch sử kiểm định cũ trong review-log. Không cần đổi trang hoặc mạch. |

Không có phát hiện nội dung nào cần sửa bắt buộc thuộc vai này. Có thể chấp nhận tuyến hiện tại trong khi sửa ARG-01 và hoàn tất các vai kiểm định khác.

#### no-ai-slop Detect

Phạm vi: toàn bộ tiêu đề, nội dung và ghi chú 45 trang. Không phát hiện đoạn dẫn rỗng, ca tụng, suy diễn ý nghĩa không có cơ chế, câu kết kịch tính hoặc thay từ đồng nghĩa làm mơ hồ đối tượng toán học. Các đối chiếu “không phải”, “chưa bảo đảm” ở B07, C04, E06 và F04 có chức năng phân biệt toán học; không đề nghị xóa theo quy tắc văn phong máy móc. Các câu nối giữ đối tượng, giả thiết và kết quả cụ thể; không biến thành lời điều phối giảng viên. Không dùng điểm phát hiện AI hoặc suy đoán tác giả.

Điều phối viên cần ghi phạm vi, kết quả Detect và ARG-01 vào review-log.md; tác tử chỉ đọc không chỉnh nhật ký trong kho.

#### Tái kiểm sau biên tập cuối ngày 2026-09-27

Bản được kiểm có SHA-256 `6561e164fdcc24f84a7b6bccff2cb171142b5e7ac3a040d77521f4c5979396e4`, xác nhận trực tiếp bằng `sha256sum`. Giữ nguyên toàn bộ báo cáo trước làm lịch sử. Lượt này chỉ đọc bản HTML và các đoạn hồ sơ liên quan; chưa cần dựa vào báo cáo biên tập để kết luận.

Phạm vi bao gồm các trang sửa C05, E03, F04, F05, F06, G02 và ít nhất hai trang lân cận mỗi phía: C03–C07, toàn bộ E01–E08, F01–F07, G01–G03. Đọc lại A02 để đối chiếu luận đề với G01–G02. Phân tích cấu trúc HTML xác nhận vẫn 45 trang trong 7 mạch với cùng thứ tự mã. Các ranh giới E→F, F→G đã được rà đầy đủ qua notes và nội dung.

| Trang hoặc cụm | Vai trò và kết nối vào | Kết quả sửa và kết nối ra | Kết luận hồi quy |
|---|---|---|---|
| C03–C07, trọng tâm C05 | C03–C04 tạo hệ SPD cần giải; C05 cung cấp ví dụ trước thuật toán | C05 đã định nghĩa ngay $d_k$, $r_k$, $p_k$; công thức $\alpha_0$ và cách tạo $p_1$ xuất hiện trên trang. Notes giữ suy ra hệ số $9/25$ từ điều kiện liên hợp, giá trị vectơ $p_1$ và vòng hai. C06 dùng chính các đại lượng này trong truy hồi; C07 giữ ứng dụng Newton–CG. | Không mất bước lập luận khi chuyển kết quả số vòng hai vào notes. Vai trò nhu cầu → ví dụ → thuật toán → ứng dụng được giữ; ký hiệu dễ nhận biết hơn. |
| E01–E05, trọng tâm E03 | E01 xác định phép tính mô hình; E02 tạo dữ kiện hai lô | Nhãn mới “Phương sai lô của $\widehat a$” chỉ đúng đại lượng trước phép biến đổi affine. Notes vẫn điều chỉnh giả thiết mục tiêu độc lập mẫu. E04–E05 chuyển sang chọn khối cập nhật trên mục tiêu đã xác định. | Không đổi kết quả BN hoặc quan hệ sang hạ khối. Không tạo tiên quyết mới. |
| E06–F02 | Đầu ra trung bình và kiến trúc là hai thành phần khác nhau; E08 kiểm phân biệt | Notes E08 còn nêu điểm đầu, mục tiêu và phân phối là đối tượng theo giai đoạn; F01 cụ thể hóa bằng gradient tại hai điểm đầu, F02 quy định phép chuyển và tinh chỉnh. | Ranh giới E→F giữ đủ điểm vào/đầu ra. Thuật ngữ “xác thực” trong F02 không đổi vai trò chọn tham số trên nhiệm vụ đích. |
| F02–F06, trọng tâm F04–F05 | F02 thay điểm đầu; F03 tạo họ mục tiêu trên cùng không gian tham số | “Giải gần đúng” ở F04 diễn đạt đúng thao tác bộ giải con, không thay kết luận về điểm dừng $0$. F05 xác định rõ hai mẫu là $(x,y)$ và $q=P(H)$; cùng các giá trị đó tiếp tục sinh $F_q$ và nghiệm theo phân phối. | Không đổi chuỗi phép chuyển → họ mục tiêu → phân phối; không phát sinh mâu thuẫn với F07. |
| F04–G01, trọng tâm notes F06 | Ba cơ chế giai đoạn đã có ví dụ và giới hạn | Câu mới “Bước tinh chỉnh được kiểm trên mất mát đích; truyền nghiệm cần kiểm điểm dừng; lịch lấy mẫu cần đạt phân phối cuối” nêu ba quan hệ học thuật cụ thể. F07 áp dụng đúng ba quan hệ; G01 dùng chúng làm tiêu chí chọn thành phần. | Câu nối rõ hơn và không còn nhận xét về việc tổ chức câu hỏi. Ranh giới F→G không bị đứt. |
| F07–G03, trọng tâm G02 | G01 tổng hợp theo cùng sơ đồ A02; G02 đo khả năng sử dụng kết quả | G02 chỉ làm rõ nhãn hai mẫu $(x,y)$ trước biểu thức mục tiêu. Câu hỏi vẫn yêu cầu sửa lịch tới phân phối đích và phân biệt trung bình tham số với thay mục tiêu. Đáp án và kết luận giữ nguyên. | G02 không đổi luận đề, phạm vi hay kết luận cuối bài; không cần mở lại toàn bộ 45 trang sau lượt rà toàn bài trước. |

ARG-01 được **đóng**. Dàn ý hiện ghi “HTML đã được triển khai đủ 45 trang và 7 mạch theo kế hoạch này”; storyboard hiện ghi “RevealJS đã được triển khai đủ 45 trang theo thứ tự này ngày 2026-09-27”. Cả hai chuyển trạng thái rà soát sang review-log.md, nên đã phân biệt triển khai với kiểm định. Bằng chứng này thay trạng thái mở trong bảng phát hiện trước, không xóa lịch sử.

no-ai-slop Detect cho phạm vi tái kiểm: không phát hiện thêm đoạn cần sửa. Câu nối F06 đã thay nhận xét về hoạt động kiểm tra bằng đối tượng và điều kiện học thuật cụ thể; giả thiết, ký hiệu, nguồn và giới hạn được giữ.

Kết quả tái kiểm: không có hồi quy về mạch lập luận, không còn phát hiện mở thuộc vai này và không cần sửa thêm. Kết luận chỉ chứng nhận phạm vi nội dung/quan hệ học thuật đã rà, không thay kiểm định hình thức hiển thị hoặc độ chính xác toán học độc lập.


### Rà soát Bài 06 — góc nhìn sinh viên

Ngày: 2026-09-27. Vai trò độc lập, chỉ đọc. Không sửa tệp trong kho. Đã đọc AGENTS.md và kỹ năng no-ai-slop; áp dụng chế độ Detect. Báo cáo này không thay rà soát toán học, chuyên gia hoặc kiểm thử trình duyệt.

#### Kết luận

Không phát hiện lỗi **chặn bàn giao** hoặc **nghiêm trọng** mới trong phạm vi góc nhìn sinh viên. Bản gồm 45 trang, 7 mạch, phù hợp cấu trúc được giao. Có hai lưu ý trung bình và hai lưu ý nhẹ dưới đây. Các sửa C06, D01, D04 do tác tử biên tập đang thực hiện cần được kiểm tra lại trên ảnh mới; ảnh đã xem vẫn chứa bản trước những sửa này.

Mặt trang rộng có chữ và công thức đọc được, không thấy chồng lấn hoặc cắt nội dung ở 45 ảnh được ghép. Những trang được chỉ định có mật độ cao C06, D03, D04, E07, F01, F05 vẫn phân biệt rõ dữ kiện, phép tính và kết luận ở bản rộng. Ảnh không chứng nhận khoảng cách đọc thực trong giảng đường.

#### Phạm vi đã kiểm tra

- Đọc toàn bộ 45 trang và 45 phần ghi chú trong `2627-1/lecture-06-toi-uu-mang-sau.html`.
- Đọc phần cơ sở chung, tiên quyết, bản đồ 7 mạch, phân bổ 2 tiết lý thuyết + 1 tiết bài tập, bản đồ hành trình và các mục từng trang trong outline/storyboard. Không quy đổi tiết sang phút.
- Đối chiếu có chọn lọc tài liệu công khai: phần chuẩn bị, §3.3–3.5 về gradient liên hợp và Newton–CG; cấu trúc các mục cùng bài tập. Không tuyên bố đã rà toàn bộ học liệu công khai trong vai này.
- Xem trực tiếp đủ `/tmp/lec06-qa/contact/01.png` đến `12.png`, bao phủ lần lượt 45 trang.
- Xem riêng ảnh rộng: `20-C06.png`, `25-D03.png`, `26-D04.png`, `34-E07.png`, `36-F01.png`, `40-F05.png` trong `/tmp/lec06-qa/deck/wide/`.
- Xem riêng ảnh hẹp đầu/cuối: C05, C06, D04, E07, F01, F05, G01; D03 chỉ có một ảnh. Tổng cộng 15 ảnh trong `/tmp/lec06-qa/deck/narrow/`.
- Không thao tác trực tiếp trình duyệt hoặc bàn phím trong vòng này. Đã đối chiếu mã HTML cho các vùng cuộn ngang và ghi rõ giới hạn của kết luận.

#### Danh sách vấn đề

| Mức độ | Trang | Vấn đề | Bằng chứng | Đề xuất sửa |
|---|---|---|---|---|
| Trung bình | C05–C06 | Nhiều ký hiệu mới xuất hiện đồng thời; sinh viên chỉ xem mặt trang có thể chép các hệ số mà chưa biết ý nghĩa của chúng. | C05 hiện cùng lúc $d_k,r_k,p_k,\alpha_k,\beta_k$. Mặt trang cho $\alpha_0=2/5$, $\beta_0=9/25$ nhưng phần giải thích “$d_k$ là xấp xỉ nghiệm, $r_k$ là phần dư, $p_k$ là hướng tìm kiếm” và cách xác định hai hệ số chỉ ở notes. Tài liệu công khai §3.3 đã có định nghĩa rõ. | Khi có vòng sửa nội dung tiếp theo, đưa một dòng nhãn ngắn cho $d_k,r_k,p_k$ lên C05, hoặc thay một dòng tính sẵn bằng ý nghĩa của hệ số bước. Giữ chứng minh và vòng hai ở ghi chú; không cần thêm trang. |
| Trung bình | D03, E07, F01, F05, G01; tương tự C05 | Nội dung quan trọng ở bên phải vùng cuộn ngang khó được nhận ra trên điện thoại. | Ảnh D03 dừng giữa công thức BFGS; E07 chỉ thấy đến $h_2$, chưa thấy hai tích cuối; F01 chưa thấy hết gradient; F05 chưa thấy hạng mất mát thứ hai và các cột cuối; G01 chưa thấy đủ cột giả thiết/phép kiểm. HTML có vùng cuộn, tabindex và xử lý phím, nên đây chưa phải bằng chứng mất nội dung. Tuy nhiên ảnh ban đầu không có chỉ dấu cuộn ngang rõ. | Bổ sung dấu ↔ hoặc biên thị giác cho vùng tràn ngang ở chế độ hẹp; không cần lời hướng dẫn giảng viên hay văn nói. Kiểm và ghi nhận người dùng nhìn thấy thanh cuộn/điểm nhận tiêu điểm. Giữ bố cục rộng. Cần ảnh sau khi cuộn ngang hoặc kiểm bàn phím để đóng nhận xét khả dụng này. |
| Nhẹ | F05 | Hai cặp dữ liệu và tiêu chí “dễ/khó” chỉ được giải mã đầy đủ trong ghi chú. | Mặt trang viết “$E=(1,1)$, $H=(3,1)$” rồi dùng mô hình và lịch lấy mẫu; không ghi ngay hai thành phần là $(x,y)$. Notes mới nêu độ cong $1$ và $9$, cùng giới hạn của cách gọi độ khó. | Ghi “hai mẫu $(x,y)$” trước $E,H$. Nếu còn chỗ, gọi $H$ là mẫu có độ nhạy cao hơn trong ví dụ. Không cần thêm định nghĩa độ khó chung. |
| Nhẹ | E03 | Nhãn phương sai có thể bị đọc là phương sai của đầu ra cuối $z$, dù công thức đang nói về $\widehat a$. | Mặt trang đặt $z_i=\gamma\widehat a_i+\beta$ ngay trước dòng “Phương sai sau chuẩn hóa: $\sigma_{\mathcal B}^2/(\sigma_{\mathcal B}^2+\varepsilon)$”. Notes giải thích đúng phép chia và E08 chọn $\gamma=1$, nhưng sinh viên đọc nhanh có thể quên phép co giãn. | Đổi nhãn thành “Phương sai của $\widehat a$” trong lần sửa nội dung tiếp theo. Không cần thêm công thức mới. |

#### Những phần hỗ trợ người học

Tiên quyết phù hợp với tuyến: gradient, Hessian, xác định dương, quy tắc dây chuyền và các quy tắc SGD/momentum đã học. Các phép tính B02–B07 giữ cùng dãy gradient, nên thay đổi thống kê được so sánh bằng cùng dữ kiện. C01–C04 phân biệt hướng giảm với độ dài bước; C08 có dữ kiện đủ để tự kiểm. D02 kiểm cát tuyến và xác định dương trước công thức tổng quát, D05 tách phép kiểm cặp với phép tạo hướng.

Bảy mạch có điểm vào/ra nhận ra được. Sơ đồ A02 được dùng lại ở E01 và G01, giúp người học phân biệt thay quy tắc cập nhật với thay mô hình, điểm đầu, mục tiêu và đầu ra. E06 và F04 có phản ví dụ cụ thể, tránh việc học tên chiến lược như một bảo đảm cải thiện. E08 và F07 đã cung cấp đủ dữ kiện trung gian để người học tập trung vào kết luận cần kiểm. G02 yêu cầu lựa chọn có điều kiện, thay vì chỉ nhắc tên thuật toán.

Ghi chú diễn giả bổ sung đáp án, phân biệt dễ nhầm và quan hệ suy luận. Không thấy mã trang nội bộ hoặc chỉ dẫn điều phối lớp trên mặt trang hay trong ghi chú đã đọc. Chứng minh CG/BFGS cần học liệu đi kèm để tự học đầy đủ; mặt trang phù hợp làm điểm tựa cho buổi học, không phải toàn bộ giáo trình.

#### no-ai-slop — Detect

Đã rà tiêu đề, nội dung hiển thị và toàn bộ 45 notes. Không phát hiện câu dẫn rỗng, lời ca tụng, kết luận kịch tính hoặc nhịp khẩu hiệu đủ rõ để lập lỗi riêng. Các mẫu “không bảo đảm” xuất hiện nhiều nhưng đều giới hạn một kết luận cụ thể: hướng giảm, tối ưu toàn cục, trung bình tham số, tiếp diễn hoặc kiến trúc. Không đề xuất xóa chúng vì chức năng toán học và học tập rõ. Các nhãn “Câu hỏi”, “Giả thiết”, “Kết quả” được giữ theo chức năng. Không dùng điểm phát hiện AI hoặc suy đoán tác giả.

#### Giới hạn và công việc bàn giao lại

Các ảnh được cung cấp là ảnh bản trước chỉnh sửa D01, D04, C06; cần điều phối viên xem lại đúng những trang đổi sau khi biên tập. Nhận xét cuộn ngang là vấn đề về dấu hiệu hiển thị, không phải kết luận tính năng cuộn thất bại. Chưa chứng nhận điều hướng trực tiếp, tương phản đo được hoặc sự phù hợp thời lượng qua diễn tập. Với 2 tiết lý thuyết + 1 tiết bài tập, rủi ro nhịp tập trung ở C05–D04 vì CG và BFGS đều được dạy mới. Cần quan sát mức hoàn thành C08 và D05 trong diễn tập; việc chưa có phép đo này không đủ để kết luận bộ trang chiếu vượt thời lượng.

Tại thời điểm báo cáo, số lỗi chặn bàn giao/nghiêm trọng mới trong vai này: **0**. Có thể tiếp tục bàn giao sau khi hợp nhất kết quả các vai còn lại và kiểm lại các sửa đang thực hiện. Phạm vi cùng kết quả no-ai-slop cần được điều phối viên đưa vào review-log.md; tác tử này không sửa kho theo nhiệm vụ chỉ đọc.

#### Tái kiểm cuối ngày 2026-09-27 — sau vòng biên tập hợp nhất

Phần này bổ sung trạng thái mới; giữ nguyên các nhận xét lịch sử ở trên. Đã đối chiếu hash tại thời điểm tái kiểm:

```text
6561e164fdcc24f84a7b6bccff2cb171142b5e7ac3a040d77521f4c5979396e4  lecture-06-toi-uu-mang-sau.html
14d4f69d56769e9eb55c9832acb0af0dbccb5c79a4ce4111c66d9faa4dd14611  lecture-style.css
```

##### Bằng chứng đã đọc và xem lại

Đã đọc báo cáo `/tmp/lec06-deck-editor-final.md`, nội dung HTML cùng notes ở C05, C06, D03, D04, E03, E07, F01, F05, G01, G02; đọc dữ liệu `/tmp/lec06-final-scroll-qa.json`. Đã mở trực tiếp 9 ảnh rộng của C05, C06, D03, D04, E03, E07, F01, F05, G01 trong `/tmp/lec06-qa/deck/wide/`; mở 9 ảnh hẹp tương ứng và 3 ảnh cuối trang C06, D04, E03 trong `/tmp/lec06-qa/deck/narrow/`; mở đủ 6 ảnh `/tmp/lec06-scroll-{C05,D03,E07,F01,F05,G01}-right.png`.

Tổng ảnh xem trực tiếp trong lần tái kiểm này: 27. Đây là các ảnh mới sau sửa. Kết quả 90 lượt toàn bộ do điều phối viên thực hiện không được tính thành phép kiểm do tác tử này tự chạy.

##### Trạng thái bốn nhận xét

| Nhận xét trước | Trạng thái | Bằng chứng tái kiểm |
|---|---|---|
| Trung bình: tải ký hiệu C05–C06 | **Đóng** | C05 định danh $d_k$ là nghiệm gần đúng, $r_k=b-Ad_k$ là phần dư, $p_k$ là hướng tìm kiếm trước chuỗi tính số. Phép thế tạo $\alpha_0$ và quan hệ $p_1=r_1+(9/25)p_0$ nối ví dụ với thuật toán C06. Bản rộng đủ nội dung, không chồng lấn. Notes giữ cách suy ra hệ số và vòng hai. C06 ghi rõ miền vòng $k=0,\ldots,K-1$. |
| Trung bình: dấu hiệu nhận biết cuộn ngang | **Đóng** | Ảnh hẹp hiện dấu ↔ và biên màu tại đúng vùng tràn. Ảnh tận phải cho thấy phần cuối công thức BFGS, hai tích $10^{-5}$ và $1{,}61051$, gradient $(-1,-2)$, hạng mất mát thứ hai, cột nghiệm và cột giả thiết/phép kiểm. Khung tiêu điểm nhìn rõ. JSON ghi mọi vùng tràn có chỉ dấu, tabindex 0; vị trí cuộn sau thao tác đạt đúng `scroll-client`; khung ngoài vẫn 390px; khi rộng 1600px, không có chỉ dấu tràn. Sáu danh sách lỗi đều rỗng. Kết luận dựa trên ảnh và bản ghi kiểm thử được cung cấp, không tự nhận đã thao tác bàn phím. |
| Nhẹ: định danh cặp mẫu F05 | **Đóng** | F05 và G02 ghi rõ “Hai mẫu $(x,y)$” trước $E,H$; $q=P(H)$ hiện cùng dữ kiện. F05 rộng/hẹp đọc được. Giới hạn cách gọi độ khó tiếp tục nằm trong notes. |
| Nhẹ: nhãn phương sai E03 | **Đóng** | Nhãn đổi thành “Phương sai lô của $\widehat a$”, nhìn rõ trên ảnh rộng và ảnh cuối trang hẹp. Không còn khả năng gán trực tiếp công thức đó cho $z$ từ nhãn. |

D04 hiện yêu cầu tìm bước làm giảm cùng mục tiêu $F$; nội dung vẫn vừa ảnh rộng và đọc được qua ảnh hẹp đầu/cuối. D03, E07, F01, F05, G01 giữ cấu trúc mặt trang rộng; các phần chưa nhìn thấy tại vị trí đầu trên màn hình hẹp là nội dung cuộn được, không phải dữ liệu bị mất. C05 tăng thông tin định danh nhưng đã bỏ phần lặp ở khung cuối, nên không tạo lỗi mật độ mới trên màn hình rộng.

Áp dụng lại no-ai-slop Detect cho các đoạn nội dung vừa sửa: không phát hiện mẫu câu rỗng hoặc bình luận ngoài nội dung học thuật cần lập lỗi mới. Không đề nghị xóa giả thiết, giới hạn hoặc các nhãn phục vụ học tập.

**Trạng thái cuối trong vai sinh viên:** không còn nhận xét mở thuộc bốn mục của báo cáo; không có lỗi chặn bàn giao/nghiêm trọng. Rủi ro nhịp khi giảng thực tế và khoảng cách đọc cuối giảng đường vẫn là giới hạn bằng chứng, không phải lỗi đang mở. Vòng tái kiểm này không thay kiểm tra trực tiếp bằng Browser Codex/Codex Slides và không chứng nhận rằng việc đó đã được thực hiện. Không sửa tệp trong kho.


### Phản biện chuyên gia Bài giảng 06

Ngày rà: 2026-09-27. Tác tử: `lec06_deck_expert`. Vai trò: chuyên gia độc lập, chỉ đọc kho; không thay vai toán học, sinh viên, phản biện giảng dạy hoặc mạch lập luận. Đã đọc `AGENTS.md` và `/home/tqlong/.codex/skills/no-ai-slop/SKILL.md`, áp dụng chế độ Detect. Báo cáo này chỉ ghi nhận kết quả kiểm tra nội dung; không chứng nhận kiểm định trình duyệt hoặc Codex Slides.

#### Kết luận

Không phát hiện lỗi **chặn bàn giao** hoặc **nghiêm trọng** trong phạm vi chuyên gia. Bộ trang chiếu bao phủ đủ LLO14–16 của Buổi 6, có chiều sâu phù hợp để tính, vận dụng và kiểm điều kiện. Sáu chiến lược trong LLO16 đều có cơ chế và minh chứng đánh giá, không chỉ được nêu tên. Thông tin trạng thái cũ trong kế hoạch đã được root sửa và tái kiểm trong vòng rà; còn một đề xuất nhẹ về nhất quán thuật ngữ.

Bản HTML đã rà có SHA-256 `bd98ed3b877c625828b9d9ba558bac15797a238a5b8ac35bc1307c4f652c9101`, gồm đúng 45 trang và 7 mạch. Đã đọc toàn văn hiển thị và ghi chú diễn giả của A01–A05, B01–B09, C01–C08, D01–D05, E01–E08, F01–F07, G01–G03; đối chiếu `outline.md`, `storyboard.md`, toàn bộ `lecture-note.md` và 12 bài trong `exercises.md`.

#### Nguồn và phạm vi đối chiếu

Đã giải nén và đọc `word/document.xml` của đề cương chính thức `sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx`. Buổi 6 quy định ba nhóm nội dung: thuật toán thích ứng; Newton, gradient liên hợp và BFGS; các chiến lược tối ưu. Ánh xạ LLO14→CLO2,3; LLO15→CLO2,3; LLO16→CLO3,4 trong kế hoạch khớp văn bản. Phần tổ chức giảng dạy ghi 2 tiết lý thuyết và 1 tiết bài tập mỗi buổi.

Đã mở nguồn chính thức [Deep Learning, Chương 8](https://www.deeplearningbook.org/contents/optimization.html) và kiểm trực tiếp các đoạn liên quan §8.5.1–8.5.3, §8.6.2, §8.7.3–8.7.6. Sự phân biệt giữa trung bình đều và trung bình mũ, giữa CG tuyến tính và vai trò giải hệ trong Newton, cùng phạm vi các chiến lược phù hợp với cách bài giảng sử dụng nguồn. Báo cáo không xác nhận lại toàn bộ PDF bổ sung: vị trí nguồn chuyên biệt được đối chiếu trong danh mục của outline và nguồn dẫn từng trang. Không tải nguồn MIT hoặc tài sản bên thứ ba mới.

#### Bao phủ 45 trang và 7 mạch

| Mạch và các trang đã đọc | Kết quả chuyên môn | Minh chứng đánh giá và chiều sâu |
|---|---|---|
| A: A01, A02, A03, A04, A05 | Thiết lập được bài toán trung tâm và các thành phần huấn luyện. Mô hình có phạt SPD là sườn cho nhóm tạo bước; không bị dùng như một lý thuyết bao trùm sai cho các chiến lược còn lại. | A03 có số kiểm được; A04 nêu miền, giả thiết và suy ra nghiệm; A05 kiểm cả bước hợp lệ lẫn ma trận làm bài toán không bị chặn dưới. |
| B: B01, B02, B03, B04, B05, B06, B07, B08, B09 | Bao phủ đầy đủ LLO14. Tách tổng tích lũy, trung bình mũ, moment bậc nhất và moment bậc hai thô. Không đồng nhất thống kê gradient với Hessian hay phương sai. | Có tính tay hai vòng; điều kiện không chệch được giới hạn đúng; B07 nêu giới hạn hướng moment, B08 nêu giới hạn tương tác tọa độ; B09 đo cả trạng thái lẫn giải thích. |
| C: C01, C02, C03, C04, C05, C06, C07, C08 | Newton nối tiếp đúng giới hạn đường chéo. Hessian SPD, giảm chấn, toán tử cố định và phần dư được phân biệt. CG tuyến tính được dạy trước khi dùng trong Newton–CG. | Có ví dụ giải hệ, phản ví dụ hướng tăng, hai vòng CG, giả mã khép kín và xử lý phần dư ban đầu bằng không. C08 đo chọn hệ hợp lệ rồi chạy và kiểm một vòng. |
| D: D01, D02, D03, D04, D05 | Cặp sai phân gradient cung cấp đầu vào thay thế toán tử độ cong. Phân biệt xấp xỉ Hessian và nghịch đảo; điều kiện cát tuyến khác điều kiện SPD. | BFGS có kiểm số, công thức, chứng minh SPD trong notes, quy trình nhận/bỏ cập nhật và so bộ nhớ với L-BFGS. D05 dùng gradient mới, không chỉ chép phép kiểm cát tuyến. |
| E: E01, E02, E03, E04, E05, E06, E07, E08 | Ba chiến lược BN, hạ theo khối và Polyak được phân biệt bằng đối tượng thay. E07 bổ sung thiết kế đường truyền gradient, phù hợp §8.7.5. | BN có phụ thuộc lô, epsilon và học/suy luận; hạ khối có điều kiện không tăng; Polyak có phản ví dụ phi lồi; nối tắt có giới hạn theo độ sâu. E08 kiểm bốn cơ chế với dữ kiện đã có. |
| F: F01, F02, F03, F04, F05, F06, F07 | Ba chiến lược còn lại thay điểm đầu, họ mục tiêu và phân phối. Tiền huấn luyện không bị đồng nhất với mọi trường hợp học từng tầng; tiếp diễn không bị gán bảo đảm toàn cục. | Có bước tinh chỉnh tính được; kiểm điểm dừng qua lịch; nghiệm theo phân phối và sai khác đích. F06 yêu cầu tính toàn ngân sách và tách dữ liệu đánh giá; F07 đo vận dụng. |
| G: G01, G02, G03 | Kết luận trả lời vấn đề mở bài bằng dữ kiện, điều kiện và phép kiểm; không đưa bảng xếp hạng vô điều kiện. Nguồn đọc tiếp truy nguyên được. | G02 kết hợp bộ nhớ, toán tử SPD, kiểm hướng và mục tiêu đích. Đây là minh chứng tổng hợp cho ba LLO. |

#### Học liệu, liên kết AI và thời lượng

`lecture-note.md` mở rộng thực chất các phép suy ra: bước có phạt, kỳ vọng moment, bất biến CG, cát tuyến BFGS, phương sai BN, tính không tăng theo khối, Jensen và các điểm dừng của họ tiếp diễn. Tài liệu không đơn thuần chép notes. Quy ước chỉ số, ma trận và ví dụ tương thích với HTML. Phần CG nêu rõ tính hữu hạn vòng chỉ áp dụng số học chính xác; phần Newton–CG phân biệt dấu hướng và sai lệch giải hệ. Chứng minh dài nằm ở học liệu nên không làm tăng nghĩa vụ trình bày trên mặt trang.

`exercises.md` có mức nhận biết (Bài 1), tính toán/chứng minh (Bài 2–8), vận dụng vào mô hình và thiết kế huấn luyện (Bài 9–12). Bài 10 kiểm thêm trường hợp biên $\lambda=2$ bằng đa thức đã học; không đưa kỹ thuật chưa chuẩn bị. Bài 12 về BN và trung bình tham số có căn cứ ở mục 5.3 của ghi chú, do đó người học có tài liệu chuẩn bị cho yêu cầu này.

Liên kết AI hiện diện trong mục tiêu theo lô, đặc trưng thưa, bộ nhớ trạng thái, toán tử Hessian–vectơ, biến đổi tầng BN, đường truyền gradient, chuyển tham số và đánh giá phân phối đích. Các ví dụ nhỏ được ghi đúng là minh họa tính toán, không giả làm bằng chứng thực nghiệm mạng sâu. Ánh xạ CLO3 được hỗ trợ qua phạm vi ứng dụng và giới hạn; bài này không tự đại diện toàn bộ CLO3 của học phần.

Phân bổ 2 tiết lý thuyết và 1 tiết bài tập đúng đề cương và tổng trong kế hoạch. Khối lượng khá chặt, đặc biệt C05–C07 và E08/F07/G02. Cách giảm tải hiện tại hợp lý: dùng cùng dữ kiện, cho sẵn kết quả trung gian ở câu hỏi tổng hợp, đặt chứng minh dài trong notes và ghi chú học tập. Nhận định phù hợp thời lượng dựa trên thiết kế này; chưa có bằng chứng thực dạy hoặc tập giảng. Không diễn giải bộ 12 bài tập công khai là tất cả phải hoàn thành trong một tiết trên lớp.

#### Danh sách vấn đề

| Mã | Mức độ | Trang/vị trí | Vấn đề và bằng chứng | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|---|
| EX-01 | Trung bình | `outline.md` phần Thông tin chung, Tự kiểm, Phân tích nguồn §1 và đoạn cuối; `storyboard.md` phần mở đầu | Lần đọc đầu còn các câu “Bản này chưa đồng bộ RevealJS”, “Sản phẩm hiện tại chỉ gồm tài liệu lập kế hoạch” trong khi đã có HTML 45 trang và hai học liệu tương ứng. Đây là thông tin trạng thái không còn đúng. | Cập nhật trạng thái hiện hành; bảo toàn các nhận xét chưa kiểm ở dạng lịch sử có mốc hoặc dẫn `review-log.md`. | Đã sửa. Root cập nhật các đoạn đầu/cuối và bổ sung sửa dòng 668, 752, 821. Tái đọc trực tiếp xác nhận dòng 668 ghi sản phẩm đã triển khai; dòng 752 ghi chín SVG đã vẽ; đoạn cuối dẫn nhật ký vòng triển khai, không tự chứng nhận các kiểm định. Giữ finding này làm lịch sử. |
| EX-02 | Nhẹ | B03/B05/B07 notes; `lecture-note.md` §1.1, §6.4; `exercises.md` Bài 9 | Thuật ngữ cùng chức năng chọn mô hình đổi giữa “tiêu chí kiểm định”, “tập xác thực”, “quy tắc xác thực”. Không gây sai công thức, nhưng chưa nhất quán về cùng một khâu đánh giá. | Chọn một cách gọi cho dữ liệu/tiêu chí xác thực và dùng nhất quán; giữ “tập kiểm tra” cho báo cáo cuối. Không thay các phép kiểm đại số bằng thuật ngữ xác thực. | Đề xuất biên tập nhẹ, không chặn. |

#### Kiểm tra no-ai-slop ở chế độ Detect

Đã rà tiêu đề, phần hiển thị, notes và hai học liệu. Không thấy lời ca tụng, kết luận kịch tính, gán nguồn mơ hồ, câu dẫn rỗng hoặc câu hỏi tu từ cần chặn. Các đối chiếu “moment khác phương sai”, “hướng giảm khác bước giảm” và các phủ định bảo đảm tổng quát có chức năng toán học nên cần giữ. Câu hỏi học tập và tổng kết có chức năng đánh giá rõ, không bị xem là khuôn sáo.

EX-02 là trường hợp nhẹ của đổi cách gọi cùng một đối tượng (synonym cycling), có trích đoạn và đề xuất cụ thể. Không dùng điểm từ bộ phát hiện AI hoặc suy đoán tác giả. Tác tử chỉ đọc không ghi `review-log.md`; điều phối viên cần nhập kết luận cùng trạng thái xử lý vào nhật ký.

**Còn lỗi chặn bàn giao/nghiêm trọng trong phạm vi chuyên gia: 0/0.** Đây là kết quả một vai độc lập, không phải chứng nhận hoàn tất năm vai hoặc kiểm định kỹ thuật.


### Phản biện học thuật và giảng dạy Bài 06

Ngày rà: 2026-09-27. Vai: `/root/lec06_deck_academic`, chỉ đọc kho. Đã đọc `AGENTS.md` và kỹ năng `no-ai-slop`, áp dụng chế độ Detect; không chấm điểm phát hiện AI, không suy đoán tác giả. Không sửa tệp trong kho.

#### Phạm vi và kết luận

Đã rà toàn bộ 45 trang cùng 45 ghi chú của `2627-1/lecture-06-toi-uu-mang-sau.html`, hai học liệu `materials/lec-06/lecture-note.md` và `exercises.md`, đối chiếu dàn bài và 14 cụm KN0–KN13 trong storyboard. HTML lúc rà có SHA-256 `bd98ed3b877c625828b9d9ba558bac15797a238a5b8ac35bc1307c4f652c9101`.

Không phát hiện lỗi **chặn bàn giao** hoặc **nghiêm trọng** về học thuật và giảng dạy trong bản đã đọc. Có một điểm mức vừa cần làm rõ ở phần dẫn nhập CG, hai điểm nhẹ về định danh đại lượng, một điểm nhẹ về diễn đạt ghi chú và một điểm vừa về trạng thái tài liệu kế hoạch. Báo cáo này không chứng nhận chất lượng hiển thị, trạng thái Codex Slides hay nghiệm thu kỹ thuật; đó là các phép kiểm riêng.

Sườn chung phù hợp với phạm vi bài: quá trình huấn luyện gồm dữ liệu/mô hình, mục tiêu/điểm đầu, quy tắc cập nhật/quỹ đạo, quy tắc trả về. Mô hình bước có ma trận phạt nối nhóm thích ứng với nhóm độ cong; phần chiến lược huấn luyện sử dụng sơ đồ thành phần chung, không bị ép vào cùng một công thức bước. Bảy mạch có chức năng riêng và có câu nối theo đối tượng hoặc giả thiết thay đổi. Không thấy trang chỉ tồn tại để đủ số lượng.

#### Các điểm cần xử lý

| Mã | Mức độ | Vị trí | Bằng chứng và tác động | Đề xuất sửa |
|---|---|---|---|---|
| AC01 | Vừa | C05, mặt trang; KN5 | Trang đưa ngay `$r_0=p_0=b$`, `$\alpha_0=2/5$`, `$\beta_0=9/25$`, `$p_1=(24/25,-6/25)^\top$`. Người học chưa được giả định biết CG; ý nghĩa phần dư, hướng và hệ số mới có trong notes, còn công thức sinh hệ số ở trang C06 phía sau. Storyboard nêu C05 phải cho thấy hệ số và hướng được sinh ra, nhưng mặt trang hiện chủ yếu đưa đáp số. | Đưa một dòng định danh `$r_k=b-Ad_k$` là phần dư, `$p_k$` là hướng; thay các đáp số hệ số đơn lẻ bằng phép thế ngắn `$\alpha_0=(r_0^\top r_0)/(p_0^\top Ap_0)=2/5$` và `$p_1=r_1+(9/25)p_0$`. Giữ phép suy ra điều kiện liên hợp trong notes; tránh tăng mật độ bằng cách chuyển kết quả vòng hai sang notes nếu cần. |
| AC02 | Nhẹ | E03, mặt trang; KN7 | Sau khi giới thiệu cả `$\widehat a_i$` và `$z_i=\gamma\widehat a_i+\beta$`, câu cuối ghi “Phương sai sau chuẩn hóa: …”. Người học có thể hiểu đó là phương sai đầu ra `$z$`, trong khi công thức là của `$\widehat a$`. Học liệu §5.1 đã phân biệt đầy đủ. | Ghi rõ “Phương sai lô của `$\widehat a$`: …”. Có thể giữ công thức phương sai của `$z$` trong notes/học liệu. |
| AC03 | Nhẹ | F05 và dữ kiện nhắc lại G02; KN13 | Mặt trang viết “`$E=(1,1)$`, `$H=(3,1)$`, `$f_\theta(x)=\theta x$`” mà chưa nói hai cặp là `$(x,y)$`. Công thức mất mát cho phép suy ra, nhưng vai trò dữ kiện nên có trước công thức. | Ghi “Hai mẫu `$(x,y)$`: `$E=(1,1)$`, `$H=(3,1)$`”. Không đổi quy ước độ khó theo độ cong hay phân phối đích. |
| AC04 | Nhẹ | F06, notes | “Các phép kiểm số tiếp theo xác nhận bước tinh chỉnh, điểm dừng và mục tiêu đích, thay vì chỉ nhận dạng tên chiến lược.” Đây là **interpretive metadiscourse** theo kỹ năng: bình luận về cách tổ chức đánh giá thay cho quan hệ học thuật; không sai toán học. | Bỏ câu hoặc thay bằng quan hệ cụ thể: “Bước tinh chỉnh được kiểm trên mất mát đích; truyền nghiệm cần kiểm điểm dừng; lịch lấy mẫu cần đạt phân phối cuối.” Không cần sửa câu hỏi đánh giá ở F07. |
| AC05 | Vừa, tài liệu quy trình | `outline.md`: 668, 752, 821 | Còn “Sản phẩm hiện tại chỉ gồm tài liệu lập kế hoạch… chưa được đồng bộ”, “Hình chưa được tạo vì phạm vi chỉ lập dàn bài”, và “Rà trực quan RevealJS… thuộc bước triển khai sau”. Các câu này không còn phản ánh bản HTML/học liệu đang được rà. | Chuyển thành ghi nhận lịch sử có ngày hoặc cập nhật trạng thái triển khai, dẫn `review-log.md`; không biến cập nhật trạng thái thành tuyên bố nghiệm thu. Đầu/cuối chính của outline và storyboard đã được điều phối viên sửa trong lượt rà; ba vị trí tích hợp cuối outline nêu trên vẫn còn lúc kiểm lại. |

AC01–AC03 trùng một phần với phản hồi sinh viên đã được điều phối viên thông báo; nên hợp nhất thành một lần sửa và một lần kiểm lại. Không cần đổi thứ tự 45 trang để xử lý chúng. **AC05 đã được điều phối viên sửa và tác tử phản biện đọc kiểm lại trước bàn giao:** cả ba đoạn còn lại đã ghi trạng thái triển khai và dẫn nhật ký; không còn dùng trạng thái lập kế hoạch để mô tả sản phẩm hiện tại. Giữ dòng finding để truy nguyên.

#### Đối chiếu 14 hành trình khái niệm

Ký hiệu trong cột tuyến lần lượt là nhu cầu → trực quan/ví dụ → hình thức → ứng dụng → kiểm tra. Các nhiệm vụ kiểm tra đã có lời giải trong notes và được mở rộng trong học liệu.

| Cụm | Tuyến thực tế và tiên quyết | Đánh giá đóng vòng, liên hệ chuẩn đầu ra |
|---|---|---|
| KN0: bước cục bộ | A03 cho sai lệch thang đo bằng hình và số; A04 suy ra bước từ ma trận phạt; áp lại cùng `$g=(1,9)$`; A05 kiểm hai ma trận hợp lệ và một ma trận bất định. Dùng gradient/dạng toàn phương đã học. | Đạt MT1–MT2. Phân biệt nghiệm phương trình dừng với cực tiểu, hướng giảm với bước hữu hạn được giữ. |
| KN1: AdaGrad | A05 cần ước lượng thang; B01 cho lịch sử tọa độ, B02 tính hai vòng, B03 nêu thuật toán và tốc độ hiệu dụng của đặc trưng thưa; B09 tính lại trường hợp gradient hiện tại bằng không. | Đạt MT1. Ký hiệu thống nhất; không suy độ dài bước luôn giảm từ thống kê tăng. |
| KN2: RMSProp | Notes B03 nêu hạn chế tích lũy, B04 thay bằng trọng số suy giảm với cùng dãy, B05 nêu thuật toán và hệ quả `$\rho^k$`; B09 kiểm thống kê. | Đạt MT1. Nhu cầu có trước thuật toán; hình trọng số ở B05 hỗ trợ tổng quát hóa. Storyboard gọi “hình trọng số B04” chưa sát dạng bảng thực tế, nhưng không gây đảo tuyến học. |
| KN3: Adam | B05 đặt nhu cầu bộ nhớ hướng và hiệu chỉnh; B06 có bảng thô/hiệu chỉnh, B07 tổng quát và kiểm giới hạn hướng moment; B09 kiểm dịch chuyển khi gradient bằng không. Momentum là tiên quyết đã nêu. | Đạt MT1. Phân biệt chuẩn hóa tổng trọng số với tính không chệch dưới giả thiết moment không đổi; không đồng nhất moment bậc hai với phương sai. |
| KN4: Newton | B08–C01 tạo nhu cầu tương tác tọa độ; C02 giải hệ số; C03 mô hình Taylor và hướng giảm; C04 phản ví dụ Hessian bất định cùng giảm chấn; C08 chọn hệ hợp lệ. | Đạt MT2. Cầu nối ma trận phạt/Hessian rõ; điều kiện hội tụ cục bộ và giới hạn ví dụ yên ngựa đúng phạm vi. |
| KN5: CG tuyến tính | Chi phí C03–C04 tạo nhu cầu; C05 có quỹ đạo hai bước và ví dụ; C06 giả mã; C07 Newton–CG; C08 kiểm phần dư, G02 kiểm hướng và trường hợp `$g=0$`. | Đạt nội dung MT2 với điểm cần gia cố AC01. Không dùng kiến thức CG như tiên quyết ngầm của C08 vì C06 đã dạy đầy đủ. |
| KN6: BFGS | C07/C08 kết bằng thiếu toán tử độ cong; D01 dùng chênh lệch gradient, D02 kiểm cặp số, D03 cập nhật và chứng minh trong notes, D04 thuật toán/chi phí, D05 kiểm dấu và hướng. | Đạt MT2. Phương trình cát tuyến xuất hiện trước phép cập nhật là hợp lý: nó xác lập yêu cầu cần thỏa, không đưa công thức BFGS trước động cơ. L-BFGS được rút gọn rõ và bài tập không đòi đệ quy chưa dạy. |
| KN7: chuẩn hóa theo lô | E01 nêu thang đầu vào tầng; E02 so hai lô dịch chuyển; E03 công thức và hai chế độ; E08 tính phương sai. Tiên quyết là trung bình/phương sai. | Đạt MT3, cần định danh AC02. Notes và học liệu điều chỉnh mục tiêu khi đầu ra phụ thuộc lô, không giữ ngầm mục tiêu tách độc lập từng mẫu. |
| KN8: hạ theo khối | E03 kết bằng thay tập biến; E04 giải bài toán con và đường gấp khúc, E05 tổng quát rồi thực hiện lượt tiếp; E08 nêu điều kiện không tăng. | Đạt MT3. Nhu cầu bài toán con dễ giải nằm trong notes E04; không đồng nhất không tăng với hội tụ tham số hay tối ưu toàn cục. |
| KN9: trung bình Polyak | E05 cho quỹ đạo và nhu cầu chọn đầu ra; E06 bắt đầu bằng bốn điểm số rồi định nghĩa, kiểm phản ví dụ phi lồi; E08 yêu cầu chỉ ra bảo đảm bị bác bỏ. | Đạt MT3. Gộp chu trình được chấp nhận vì trung bình là tiên quyết; phản ví dụ là ứng dụng kiểm phạm vi. Học liệu mở rộng Jensen và trạng thái BN, không chép nguyên notes. |
| KN10: đường truyền gradient | E06 kết bằng yếu tố kiến trúc; E07 sơ đồ và quy tắc dây chuyền đã học, tích số và giới hạn độ sâu; E08 kiểm kết luận bị chặn. | Đạt vai trò hỗ trợ MT3 theo chu trình rút gọn đã ghi. Hệ số truyền qua khối được phân biệt với gradient tham số đầy đủ. |
| KN11: tiền huấn luyện | E07 nối kiến trúc/điểm đầu; F01 đối chiếu điểm mất gradient với tham số chuyển và tính bước; F02 quy trình; F06 điều kiện đánh giá; F07 tính tinh chỉnh. | Đạt MT3. Phân biệt nhãn phụ/đích, khởi tạo/tinh chỉnh và cập nhật đồng thời/theo khối. Không suy ưu thế trước mọi khởi tạo ngẫu nhiên. |
| KN12: tiếp diễn | F02 phân biệt đổi điểm đầu với đổi mục tiêu; F03 ba đồ thị cùng không gian, F04 lịch và điểm dừng tồn tại; F06 đích/cuối; F07 kiểm việc giữ nguyên không. | Đạt MT3. Nhu cầu giản hóa mục tiêu thể hiện qua trường hợp đơn cực tiểu; ví dụ kiểm giới hạn được duy trì. Không gán họ phạt cho phép chập Gauss. |
| KN13: học theo chương trình | F04 dẫn thay phân phối; F05 dùng hai mẫu và bảng xác suất/nghiệm rồi tổng có trọng số; F06 phép đánh giá, F07/G02 đối chiếu đích. | Đạt MT3 với AC03. Gộp hợp lý vì kỳ vọng có trọng số và hồi quy một biến đã có; độ khó được quy ước theo độ cong, không tuyên bố định nghĩa phổ quát. |

G01 tổng hợp điều kiện lựa chọn theo sườn A02; G02 yêu cầu phương pháp, điều kiện và phép kiểm, nên phần kết luận không chỉ nhắc danh sách thuật toán. G03 không đưa tiên quyết mới. Các câu hỏi A05/B09/C08/D05/E08/F07/G02 dùng kiến thức trước đó và đánh giá đúng mục tiêu tương ứng. Hai học liệu có tính toán, chứng minh, phản ví dụ và vận dụng; không thấy bài tập đòi một định lý ngoài tuyến bắt buộc.

#### Rà ngôn ngữ theo no-ai-slop Detect

Phạm vi: tiêu đề, mặt trang, 45 notes, toàn văn ghi chú bài giảng và bài tập/lời giải. Tiêu đề gọi tên đối tượng hoặc nhiệm vụ học thuật; không có câu cảm thán, quảng bá, câu hỏi tu từ hoặc lời chỉ dẫn giảng viên kiểu “chúng ta hãy nhìn”. Không phát hiện chuỗi câu dẫn rỗng, đổi tên thuật ngữ tùy tiện hoặc kết luận kịch tính cần sửa diện rộng.

Mẫu có bằng chứng cần biên tập cục bộ là **interpretive metadiscourse** tại AC04. “Gần giải từng bài toán” ở F04 là diễn đạt kém tự nhiên nhưng không phải bằng chứng của một mẫu AI; có thể đổi thành “giải gần đúng từng bài toán”. Các cấu trúc lặp trong giả mã và nhãn câu hỏi phục vụ chức năng học tập, không phải lý do loại bỏ.

Các phủ định như “không phải Hessian”, “chưa bảo đảm bước hữu hạn giảm”, “không tự bảo đảm nghiệm toàn cục”, “khác phương sai”, “khác gradient tham số” là phân biệt toán học có đối tượng và hệ quả rõ. Không đề xuất xóa theo quy tắc chống đối lập hình thức của kỹ năng. Tương tự, bảng tổng kết và câu hỏi kiểm tra có chức năng đo chuẩn đầu ra nên được giữ.

#### Trạng thái bàn giao vai phản biện

Không còn lỗi chặn/nghiêm trọng được phát hiện trong phạm vi học thuật của bản đã đọc. Điều phối viên cần hợp nhất AC01–AC04, ghi quyết định vào `review-log.md`, và kiểm lại riêng C05/E03/F05 nếu được sửa; AC05 đã đóng. Rà lại kỹ thuật hoặc Codex Slides không thuộc bằng chứng của báo cáo này. Không sửa repo trong lượt phản biện.

#### Tái kiểm sau biên tập cuối ngày 2026-09-27

Đã đọc trực tiếp các trang và notes C05, E03, F04, F05, F06, G02 trên HTML có SHA-256 `6561e164fdcc24f84a7b6bccff2cb171142b5e7ac3a040d77521f4c5979396e4`. Phạm vi tái kiểm là các finding đã nêu; không thay thế các bằng chứng rà toàn tuyến trước đó.

| Finding hoặc phạm vi | Bằng chứng sau sửa | Kết quả |
|---|---|---|
| AC01, C05 | Mặt trang định nghĩa nghiệm gần đúng, phần dư và hướng; hệ số đầu có phép thế $\alpha_0=(r_0^\top r_0)/(p_0^\top Ap_0)=2/5$; $p_1=r_1+(9/25)p_0$ gắn trực tiếp điều kiện liên hợp. Notes giữ phép suy ra $9/25$ và vòng hai. | Đóng. Ví dụ chuẩn bị được ký hiệu và thao tác cho C06; không phát hiện đảo trình tự hoặc giả định CG như tiên quyết. |
| AC02, E03 | Câu cuối đã ghi “Phương sai lô của $\widehat a$”. | Đóng. Đại lượng được phân biệt với đầu ra affine $z$. |
| AC03, F05/G02 | Cả lần giới thiệu và đề tổng hợp đều ghi “Hai mẫu $(x,y)$”. | Đóng. Công thức mất mát và vai trò dữ kiện thống nhất. |
| AC04, F06 | Notes đã thay bình luận về phép kiểm bằng “Bước tinh chỉnh được kiểm trên mất mát đích; truyền nghiệm cần kiểm điểm dừng; lịch lấy mẫu cần đạt phân phối cuối.” | Đóng. Câu nối thể hiện quan hệ học thuật, không còn mẫu interpretive metadiscourse đã chỉ ra. |
| Diễn đạt F04 | Đã dùng “giải gần đúng từng bài toán và chuyển nghiệm”. | Đạt; giữ nguyên nội dung và điều kiện của tiếp diễn. |
| Thuật ngữ xác thực | HTML và hai học liệu không còn “kiểm định” để gọi validation; các vị trí liên quan dùng “xác thực”. | Đạt tính nhất quán trong phạm vi thay thuật ngữ. |

Tái kiểm `no-ai-slop` Detect ở sáu trang bị ảnh hưởng không phát hiện mẫu mới cần sửa. Những phủ định về bảo đảm, điểm dừng, mục tiêu đích và phương sai vẫn phục vụ phân biệt toán học nên được giữ. AC01–AC05 đều đã đóng; không còn finding mở hoặc lỗi chặn/nghiêm trọng trong phạm vi phản biện học thuật này. Không sửa tệp trong kho.


---

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
