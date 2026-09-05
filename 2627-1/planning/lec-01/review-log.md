# Nhật ký rà soát Bài 01

## Trạng thái

- Ngày: 2026-09-05.
- Sản phẩm hiện tại: bản hoàn chỉnh đã qua vòng nghiệm thu cuối.
- Cấu trúc 6 mạch, 23 trang ở các mục lịch sử dưới đây đã hết hiệu lực. Bản hoàn chỉnh gồm đúng 7 mạch và 37 trang theo `outline.md` và `storyboard.md`.

## Quyết định nguồn và cấu trúc

- Đề cương DOCX chính thức xác nhận Buổi 1 gồm giới thiệu tối ưu, tập lồi và hàm lồi; LLO1–LLO2 cùng gắn CLO1.
- Dùng Boyd và Vandenberghe (2004), Chương 1–3, cùng MIT 6.079 lec01 → lec02 → lec03 làm nguồn khái niệm và mẫu tham chiếu.
- Chỉ dẫn của người dùng được ưu tiên: điều khiển một bước → hồi quy tuyến tính → hồi quy logistic → khuôn tổng quát → tập lồi → hàm lồi → chứng nhận lại.
- Skeleton đã dùng 6 mạch và 23 trang lá. Vòng hoàn thiện chuyển thành 7 mạch và 37 trang lá để tách riêng ba ca ứng dụng, khuôn chung, công cụ lồi và mạch quay lại chứng nhận.
- Không có ảnh raster hoặc tài sản hình mới trong skeleton.
- Ca độ sáng bị bỏ khỏi mặt trang chiếu vì trùng vai trò dẫn nhập; có thể tái sử dụng như bài luyện.

## Bằng chứng đa tác tử

- Tác tử lập kế hoạch: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`. Điều phối viên bác đề xuất giữ nguyên 53 mã vì không phản ánh chỉ dẫn mới.
- Tác tử phân tích nguồn: cùng mô hình và nhà cung cấp; đề xuất 6 mạch, 23 trang và ánh xạ ứng dụng trước lý thuyết. Điều phối viên chấp nhận cấu trúc này.
- Tác tử soạn skeleton: cùng mô hình và nhà cung cấp; tạo bản nháp trong thư mục tạm. Điều phối viên bác các lỗi kỹ thuật của bản nháp gồm: không lồng section ngoài, thiếu `data-slide-id`, hiển thị mã nội bộ trên tiêu đề, sai đường dẫn plugin và đặt chân trang thành một trang chiếu. Các lỗi này được sửa trước khi đưa vào kho.

## Trạng thái rà soát

| Vai rà soát | Trạng thái | Ghi chú |
|---|---|---|
| Kiểm định storyboard | Đạt | 7 mạch, 37 trang và các bản đồ sáu bước khớp bản triển khai. |
| Góc nhìn sinh viên | Đạt sau sửa | Ký hiệu, ví dụ, câu hỏi và điểm dễ nhầm đã được xử lý. |
| Góc nhìn chuyên gia | Đạt | Phạm vi lý thuyết và giả thiết miền mở được dùng đúng. |
| Độ chính xác toán học | Đạt sau tái kiểm | Ba ví dụ, các chứng nhận và bài tập đã được tính lại. |
| Phản biện học thuật–giảng dạy | Đạt sau sửa | Thang bài tập và ánh xạ LLO/CLO đã được xác nhận. |
| Mạch kể chuyện | Đạt sau tái kiểm | Ba món nợ nhận thức và mạch quay lại được khép kín. |

## Kiểm định storyboard vòng skeleton

- Worker: requested_model=z-ai/glm-5.3-flash, observed_model=z-ai/glm-5.3-flash, provider=OpenRouter.
- Kết quả cấu trúc: 23 mã khớp HTML và storyboard; 6 mạch có chức năng, đầu vào, đầu ra; bản đồ sáu bước hợp lệ; LLO1–LLO2–CLO1 đồng bộ.
- Lỗi nghiêm trọng về lệnh tạo khoảng trắng qquad ở U01 và F02: đã sửa.
- Lỗi trung bình về bảng kiểm bốn thành phần ở U03–U04: đã bổ sung miền và trạng thái không có giới hạn bổ sung.
- Lỗi trung bình về nhãn nhóm tập ở F03: đã tách thành nhóm affine, khoảng cách và bất đẳng thức tuyến tính.
- Lỗi nhẹ về miền của U04, ký hiệu $s$ ở H03 và giả thiết tại H04/K01: đã sửa.
- Việc phân bố câu hỏi kiểm tra sau từng cụm vẫn để cho vòng nội dung, đúng phạm vi skeleton.

## Rà mạch kể chuyện vòng skeleton

- Worker: requested_model=z-ai/glm-5.3-flash, observed_model=z-ai/glm-5.3-flash, provider=OpenRouter.
- Kết quả: 0 lỗi chặn bàn giao, 0 nghiêm trọng, 0 trung bình và 5 lỗi nhẹ.
- M03: giữ mũi tên vì người dùng đã chỉ định thứ tự khảo sát; bổ sung nhãn “Thứ tự khảo sát trong bài” để tránh hiểu thành quan hệ nhân quả giữa ba ca.
- U03: thống nhất nhãn “Biến quyết định” và “Mục tiêu” với bảng kiểm U02.
- T04 và F01: bổ sung câu nối từ cực tiểu địa phương/toàn cục sang giả thiết miền lồi.
- H04: ghi rõ trong ghi chú cách áp dụng điều kiện độ cong cho mục tiêu điều khiển trên đoạn đóng.
- K02: thu hồi trực tiếp vấn đề trung tâm trước phần tự kiểm tra.

## Rà độ chính xác toán học vòng skeleton

- Worker: requested_model=z-ai/glm-5.3-flash, observed_model=z-ai/glm-5.3-flash, provider=OpenRouter.
- Kết quả ban đầu: 0 lỗi chặn bàn giao, 0 nghiêm trọng, 3 trung bình và 4 nhẹ.
- T03: thay “lân cận khả thi” bằng định nghĩa dùng $C\cap N$ và lượng từ đầy đủ.
- H04: nêu rõ $C$ mở, lồi; bổ sung miền của mọi $x,y$ và giả thiết khả vi tương ứng.
- K01: nêu rõ cực tiểu địa phương được hiểu tương đối với $C$.
- U02: bổ sung miền của $x_0,r$ và điều kiện $u_{\max},\lambda\ge0$.
- T04/K01: thay dấu cộng giữa hai điều kiện bằng chữ “và”.
- F05: đổi căn cứ của $\mathbb R^d$ thành “toàn không gian”, không dựa vào thuật ngữ affine chưa định nghĩa.

## Lượt rà lại mạch kể chuyện

- Worker OpenRouter dừng trước khi trả báo cáo với lỗi nguyên văn: model exceeded the tool-call limit (10).
- Không thay thế lượt rà này bằng worker Codex.
- Theo yêu cầu của người dùng, lượt gọi lại dùng max_rounds=16, timeout=180 giây và max_tokens=6000; prompt chỉ định đúng bốn tệp và các trang cần rà.
- Lượt gọi điều chỉnh hoàn tất sau 7 vòng. Năm lỗi nhẹ ban đầu đã được xác nhận xử lý; không còn lỗi chặn bàn giao, nghiêm trọng hoặc trung bình về nội dung mạch. Ba lưu ý nhẹ được chuyển sang vòng nội dung hoặc sửa ngay: thống nhất “miền khả thi” ở U03, nối ký hiệu $a_i$ với hàng dữ liệu của U03, và ánh xạ quy tắc H05 vào từng ca khi bổ sung chi tiết.

## Rà lại độ chính xác toán học

- Lượt gọi dùng cùng cấu hình max_rounds=16, timeout=180 giây và max_tokens=6000; hoàn tất sau 4 vòng.
- Không còn lỗi chặn bàn giao, nghiêm trọng hoặc trung bình.
- Hai lỗi nhẹ ở H04 đã sửa trong ghi chú: xác nhận điều kiện bậc nhất và bậc hai là cần và đủ trong giả thiết đã nêu; làm rõ nghĩa của khả vi trên tập mở $C$.

## Giới hạn công cụ

- Codex Slides trả danh mục khả năng nhưng runtime tại `http://127.0.0.1:4311` không khởi động; lệnh liệt kê dự án hết hạn và kiểm tra kết nối bị từ chối.
- Vì vậy chưa có kiểm định trực quan bằng Codex Slides. Không tuyên bố đã thực hiện kiểm định này.

## Kiểm định kỹ thuật vòng skeleton

- Codex Slides trả danh mục khả năng nhưng runtime cục bộ không khởi động; chưa có kiểm định trực quan bằng Codex Slides.
- Lệnh bắt buộc python3 -m reloadserver 8765 không chạy vì môi trường thiếu mô-đun reloadserver.
- Dùng máy chủ dự phòng giới hạn trong thư mục 2627-1, bind tại 127.0.0.1:8765; tệp HTML trả HTTP 200.
- Kiểm tra 6 section ngoài, 23 slide lá, 23 mã duy nhất và 23 khối ghi chú.
- Kiểm tra mọi CSS, plugin RevealJS và KaTeX cục bộ đều tồn tại; HTML không phụ thuộc tài nguyên mạng.
- Chromium headless render đủ 23 trang ở 1280 × 720; không phát hiện tràn, chồng lấn, công thức hỏng hoặc tài nguyên vỡ.
- Kiểm tra các trang dày nhất M03, U03, U04, T02, F03, H04 và K02 ở cửa sổ 720 × 1280; không phát hiện tràn.
- Chạy git diff --check; không có lỗi khoảng trắng.
- Bản sao lưu có SHA-256 12f00e3eef47c63c69714be5f2e88e3a63adb571a711473cd60cdedbdb792d20, trùng checksum của deck trước thay đổi.

## Việc dành cho vòng nội dung

- Điền ví dụ số và tự tính lại kết quả.
- Vẽ SVG cho các quan hệ cần trực quan.
- Bổ sung ghi chú diễn giả thành mạch nói hoàn chỉnh.
- Đồng bộ `materials/lec-01/lecture-note.md`; tạo và kiểm định `materials/lec-01/exercises.md`.
- Chạy kiểm định storyboard, năm vòng rà soát độc lập, kiểm tra rộng/hẹp và Codex Slides khi runtime khả dụng.

## Pha lập kế hoạch bản hoàn chỉnh

### Quyền gửi dữ liệu và biện pháp loại trừ

- Người dùng cho phép rõ ràng việc gửi tới OpenRouter: toàn bộ SVG Bài 01, ba PDF MIT, mẫu HTML/CSS, deck, đề cương, thư mục planning, materials, `index.html`, `material-viewer.html` và `sources/MIT/README.md`.
- `.env` và `.env.*` bị loại trừ tuyệt đối. Worker chỉ thấy thư mục tạm chứa tệp đã duyệt; `--api-key-root` trỏ về kho thật nhưng đường dẫn này không được công bố qua công cụ của worker.

### Điều chỉnh tham số worker

- Mỗi lượt gọi dùng `--json` và lưu ba trường truy nguyên: `requested_model`, `observed_model`, `provider`.
- Tác vụ được chia hẹp theo nguồn MIT, SVG và mẫu HTML/CSS; `--task-profile` được đặt theo pha; `--max-rounds`, `--max-tokens`, `--timeout`, `--temperature` và `--empty-answer-retries` được giảm hoặc tăng theo đúng nguyên nhân lỗi của lượt trước.
- Lượt đọc tổng hợp nguồn và SVG từng trả lỗi nguyên văn `model returned an empty or incomplete answer after all retries`; pha phụ thuộc đã dừng, lỗi được báo cho người dùng, sau đó tác vụ được tách thành các lượt lec01, lec02, lec03 và SVG riêng.
- Lượt đối chiếu mẫu từng trả lỗi nguyên văn `ValueError: Invalid pattern: '**' can only be an entire path component`, sau đó `model exceeded the tool-call limit (5)`. Lượt thử lại dùng thư mục tối giản chỉ có năm tệp, cấm `list_files` và hoàn tất thành công.

### Bằng chứng reader bản hoàn chỉnh

- Reader lập kế hoạch: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`. Điều phối viên giữ đề xuất ứng dụng trước lý thuyết nhưng sửa phạm vi thành đúng bảy mạch người dùng yêu cầu.
- Reader MIT lec01: cùng mô hình và nhà cung cấp. Điều phối viên bác hai kết luận sai: quy hoạch tuyến tính không phải một trong ba ca; tên bảy mạch không xuất phát từ MIT. Ánh xạ đã sửa tại `storyboard.md`.
- Reader MIT lec02 và lec03: cùng mô hình và nhà cung cấp. Giữ định nghĩa, ví dụ và phép bảo toàn trực tiếp phục vụ ba ca; bỏ nón, epigraph, Jensen, liên hợp, tựa lồi và thư viện mở rộng.
- Reader SVG: cùng mô hình và nhà cung cấp. Chấp nhận sáu SVG lõi, sửa ca logistic, thêm tối đa hai SVG cho điều khiển và hồi quy tuyến tính; các SVG rộng hơn phạm vi không được dùng trong tuyến chính.
- Reader mẫu HTML/CSS: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`. Kết quả xác nhận cấu hình RevealJS cục bộ, section lồng, chân trang cuối `.slides` và các lớp bố cục của mẫu. Hai rủi ro chính là CSS nội dòng trùng vai trò với CSS chung và cỡ chữ cộng dồn sát ngưỡng.

### Quyết định cấu trúc đã phê duyệt

- Bảy mạch: mở đầu và ba nhu cầu; điều khiển một bước; hồi quy tuyến tính; hồi quy logistic; khuôn chung; công cụ lồi vừa đủ; trở lại ba ca.
- Ba ví dụ số được cố định trước khi viết deck để mọi reviewer kiểm lại cùng một dữ kiện.
- Mạch 6 chỉ giữ lý thuyết cần để chứng nhận ba ca. Mạch 7 phải phân biệt rõ bảo đảm toàn cục, tồn tại và duy nhất; không dùng từ “lồi” như một bảo đảm tổng quát cho cả ba.
- Ca chiếu sáng từ MIT lec01 được dùng làm bài tập chuyển giao, không trở thành ca chính thứ tư.

### Kiểm định storyboard trước triển khai

- Hai lượt đầu không tạo được báo cáo: một lượt kết thúc với `exit_code=1`, `output=""`; lượt kế tiếp trả nguyên văn `model returned an empty or incomplete answer after all retries`.
- Nhật ký lượt thứ ba cho thấy `finish_reason=length` và toàn bộ 1.800 token đều bị dùng cho suy luận. Tham số được sửa theo nguyên nhân: giữ hai tệp, dùng `task_profile=recheck`, `max_rounds=5`, `max_tokens=3000`, `reasoning_effort=low`, `empty_answer_retries=1` và giới hạn báo cáo tám dòng.
- Lượt hoàn tất: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`.
- Kết quả: đúng 7 mạch; 37 mã trang; tổng 2 tiết lý thuyết và 1 tiết bài tập; LLO1–LLO2–CLO1 nhất quán; ký hiệu ba ca truyền xuyên; chu trình sáu bước không bỏ ngầm; phạm vi công cụ lồi vừa đủ.
- Kết luận reviewer: `ĐƯỢC TRIỂN KHAI`.

### Writer và tích hợp bản hoàn chỉnh

- Writer được giới hạn ở 12 trang ứng dụng và ba SVG trong thư mục tạm. Lượt đầu dùng `reasoning_effort=high`, `max_tokens=6500`; cả hai phản hồi dùng hết ngân sách cho suy luận và kết thúc bằng `model returned an empty or incomplete answer after all retries`. Không tệp nào được ghi.
- Tác vụ được thu hẹp còn một fragment 12 trang, dùng `reasoning_effort=low`, `max_tokens=5000`. Worker tạo đối số ghi 12.717 ký tự nhưng lời gọi thất bại với `tool_arguments_invalid`, `reason=invalid_json`, sau đó chờ quá thời hạn. Điều phối viên ngắt tiến trình; không có fragment nào được tích hợp.
- Theo yêu cầu tránh lỗi lặp lại, không gọi lại writer cho khối lớn. Điều phối viên triển khai HTML bằng các bản vá nhỏ và tự vẽ SVG cục bộ từ storyboard đã được reviewer duyệt.
- Deck triển khai ban đầu có đúng 7 mạch, 37 trang lá, 37 mã `data-slide-id` duy nhất và 37 khối ghi chú diễn giả. Ba SVG tạo hoặc sửa đều phân tích được như XML.

## Giới hạn Codex Slides ở vòng hoàn thiện

- Lần mở đầu thất bại với thông báo `Codex Slides did not start at http://127.0.0.1:4311. See /tmp/codex-slides-server.log.` do sandbox không cho bind `0.0.0.0:4311`.
- Chạy runtime ngoài sandbox đã mở được Codex Slides và tạo dự án bền vững `20260905080627-b-i-gi-ng-01-gi-i-thi-u-t-i-u-t-p-l-i-v--bkkd`, tỷ lệ 16:9. Dự án nhận đủ 11 nguồn: deck hiện tại, đề cương chính thức, ba PDF MIT, mẫu HTML/CSS, outline, storyboard, ghi chú bài giảng và bài tập.
- Giao diện Browser trong Codex không hoàn tất handoff. API tải Design File trả HTTP 500 với lỗi `ReferenceError: File is not defined`; tham số tạo dự án cũng giới hạn `pages` không quá 30 nên không thể đặt trực tiếp 37 trang. Vì vậy chưa có phiên bản 37 trang đã render trong Codex Slides để đối chiếu trực quan.
- Bản RevealJS trong kho là bản có thẩm quyền. Kiểm định trực quan cuối được thực hiện bằng Chromium và Playwright; không tuyên bố đã rà trực quan bằng Codex Slides.

## Rà soát độc lập bản hoàn chỉnh

Mọi lượt hoàn tất dưới đây đều ghi `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`.

### Đối chiếu storyboard và triển khai

- Kết luận: `ĐẠT`.
- Xác nhận 7 section ngoài, 37 mã trang duy nhất, tiêu đề và thứ tự khớp storyboard; tám câu nối bắt buộc có trong ghi chú; ba chu trình ứng dụng và mạch K01–K06 khép kín.
- Sửa mô tả đầu ra mạch 5 thành “bốn loại kết luận và ba chặng chứng nhận”.
- Bác đề nghị đổi khối Markdown sang `definition` và `theorem` vì viewer chỉ hỗ trợ `example`, `derivation`, `proof`, `exercise`, `hint`, `solution`.

### Góc nhìn sinh viên

- Kết luận: `ĐẠT` có điều kiện; không có lỗi số học.
- Đã sửa các ký hiệu dùng trước khi giải thích: mô tả `clip` tại D03, nghĩa của $A\succeq0$ tại H05, thay $\ker(X)=\{0\}$ bằng phương trình $Xv=0$ tại K02 và nêu nghĩa địa phương tương đối tại H03.
- Đã viết lại lập luận dấu ở D04; bổ sung bất đẳng thức chứng minh tính bức ở K03; sửa vị trí điểm dữ liệu trên SVG logistic; thêm hình chiếu trực giao vào kiến thức dùng trong ghi chú.
- Không thêm đáp án lên mặt T04 và H07 vì quy trình cho phép đặt đáp án câu hỏi trong ghi chú diễn giả; việc hiện đáp án ngay sẽ làm mất chức năng kiểm tra.
- Không tách K01 vì công thức nghiệm và ba chứng nhận cùng phục vụ một luận điểm trung tâm: vì sao nghiệm điều khiển tồn tại, duy nhất và có dạng chiếu.

### Góc nhìn chuyên gia tối ưu lồi

- Lượt rộng chứa ba bản trích MIT vượt thời hạn và được ngắt, kết thúc bằng `exit_code=130`, `KeyboardInterrupt` sau `asyncio.exceptions.CancelledError`. Lượt thay thế chỉ dùng deck và bảng ánh xạ nguồn trong storyboard.
- Kết luận lượt thay thế: `ĐẠT`.
- Đã đưa trực tiếp lên H05 cách kiểm tra $q$ trên miền mở $\mathbb R$ rồi hạn chế xuống đoạn đóng; sửa câu hỏi H07 để chỉ rõ mệnh đề cần xét.
- Giữ tập affine và nửa không gian ở F03 vì hai dạng này được dùng tại F04 và bài chuyển giao K05.

### Độ chính xác toán học

- Lượt gộp deck, ghi chú và bài tập thất bại với lỗi nguyên văn `RuntimeError: OpenRouter request exceeded 180s wall timeout`. Tác vụ được tách thành hai tiểu lượt.
- Tiểu lượt deck kết luận `ĐẠT`: các phép tính D03, L03, G03; định nghĩa F02, H02; định lý H03–H07; và chứng nhận K01–K04 đều đúng.
- Tiểu lượt bài tập phát hiện $D$ chưa được định nghĩa ở Bài 8 và thiếu $p_{\max}\ge0$ ở Bài 9. Đã thay $A^TDA$ bằng tổng có $d_i$ được định nghĩa; viết lập luận tồn tại qua tập mức dưới; bổ sung $p_{\max}\ge0$ và điều kiện $\operatorname{rank}(A)=m$.

### Phản biện học thuật và giảng dạy

- Kết luận: `ĐẠT` có điều kiện; thang nhận biết → tính toán hoặc chứng minh → vận dụng AI rõ và dữ liệu số đúng.
- Đã sửa câu nối bị treo trong lời giải Bài 8; làm rõ $X^TX$ “chỉ nửa xác định dương, không xác định dương” ở Bài 6.
- Đã thêm bảng ánh xạ bài tập với LLO1, LLO2, CLO1 và chỉ định Bài 1, 4, 7, 9 là nhóm trọng tâm để không quá tải một tiết bài tập.
- Đã sửa Bài 4 để nghiệm tự do nằm ngoài đoạn, nhờ đó sinh viên phải giải thích đạo hàm khác không tại nghiệm biên.
- Không đưa phác chứng minh H04–H05 lên mặt trang chiếu; chứng minh và diễn giải đã nằm trong ghi chú diễn giả cùng `lecture-note.md`, phù hợp nguyên tắc một luận điểm mỗi trang.
- Giữ đường tròn ở Bài 2 làm phản ví dụ, đúng yêu cầu có trường hợp biên hoặc phản ví dụ.

### Mạch kể chuyện

- Kết luận: `ĐẠT`.
- Reviewer ghi nhầm “36 trang”; đếm cấu trúc thực tế và storyboard đều cho 37 trang. Không dùng số đếm sai này làm căn cứ.
- Đã sửa storyboard để SVG logistic chỉ dùng tại G03; sửa K04 thành “lồi; lồi chặt (còn gọi là lồi nghiêm ngặt) trong ví dụ G03”, tránh suy rộng tính lồi chặt cho mọi bộ dữ liệu.

### Tái kiểm sau chỉnh sửa

- Tái kiểm toán: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`; kết luận `ĐẠT`. D03, D04, H03, H05, H07, K02–K04 và Bài 4, 6, 8, 9 đều được xác nhận đúng sau sửa.
- Tái kiểm mạch: cùng mô hình và nhà cung cấp; kết luận `ĐẠT`. Xác nhận đúng 7 mạch, 37 trang; SVG logistic chỉ ở G03; tám câu nối và ba món nợ nhận thức được khép lại; K05–K06 kết thúc đúng vai trò.

### Tái kiểm L02–L04 sau sửa bố cục

- Playwright phát hiện công thức phần dư ở L03 vượt mép phải tại 1280 × 720. Chỉ đổi cách chia hai dòng: dòng một chứa $w^*$ và $J(w^*)$; dòng hai chứa $Xw^*-y$. Không đổi dữ kiện, ký hiệu hoặc kết quả.
- Worker chỉ nhận một bản deck trong thư mục tạm không có `.env` hoặc `.env.*`. Lượt gọi dùng `task_profile=recheck`, `max_rounds=4`, `max_tokens=2500`, `timeout=120`, `temperature=0`, `reasoning_effort=low`, `empty_answer_retries=1`; prompt cấm liệt kê và tìm kiếm tệp, chỉ cho đọc dòng 177–220 một lần.
- Bằng chứng runtime: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`; hoàn tất sau 2 vòng.
- Kết luận: `ĐẠT`. Số học, ký hiệu, phần dư, giá trị mục tiêu, ghi chú và mạch L02 → L03 → L04 đều khớp; không có lỗi trung bình trở lên.

## Biên tập giọng văn

- Áp dụng kỹ năng `no-ai-slop` cho deck, ghi chú bài giảng, bài tập và trang chỉ mục.
- Loại các câu chuyển ý chung chung, cách lặp “không chỉ”, ghi chú sản xuất và từ tiếng Anh có cách gọi tiếng Việt ổn định. Giữ nguyên tên riêng, ký hiệu, tên thư viện và thuật ngữ kỹ thuật cần thiết.
- Chuyển chú thích nguồn của K05 khỏi mặt trang chiếu vào ghi chú diễn giả; mặt trang không còn nhãn quy trình, mã nội bộ, thời lượng, khẩu hiệu hoặc câu cảm thán.
- Không thay đổi kết luận toán học trong lượt biên tập này.
- Vòng tự kiểm theo `eval.md` đã đọc lại toàn bộ văn bản hiển thị, ghi chú diễn giả, ghi chú bài giảng, bài tập và mô tả Bài 01 trên chỉ mục. Không còn câu cảm thán, lời ca tụng hoặc quảng bá, câu hỏi tu từ, nhịp câu khuôn mẫu, đối lập giả tạo, câu báo trước tầm quan trọng hoặc thay từ đồng nghĩa làm lệch thuật ngữ.
- Tìm lại các chuỗi `TODO`, `FIXME`, `placeholder`, ghi chú sản xuất, chỉ dẫn cho người viết, reviewer hoặc worker trong năm bề mặt công khai cho kết quả bằng không. Các câu hỏi còn lại đều mang nhãn `Câu hỏi:` và có đáp án hoặc gợi ý trong ghi chú diễn giả khi phù hợp.
- Sửa bố cục L03 sau vòng biên tập chỉ đổi vị trí hai công thức; không phát sinh văn bản mới cần biên tập lại.

## Kiểm định kỹ thuật và trực quan cuối

- Lần chạy đầu của lệnh bắt buộc `python3 -m reloadserver 8765` thất bại vì thiếu mô-đun. Sau khi cài bản cố định `reloadserver==1.0.0` và phụ thuộc `watchdog==6.0.0` vào user site, chính lệnh này chạy thành công tại gốc kho trên cổng 8765. Không còn dùng máy chủ dự phòng làm bằng chứng nghiệm thu.
- Deck, chỉ mục, Markdown ghi chú và Markdown bài tập đều trả HTTP 200.
- Kiểm tra cấu trúc tự động xác nhận 7 section ngoài, 37 trang lá, 37 mã `data-slide-id` duy nhất, 37 khối ghi chú và tập mã trùng khớp chính xác với storyboard.
- Kiểm tra 20 đường dẫn cục bộ trong deck; mọi tài sản đều tồn tại và không thoát khỏi thư mục học kỳ. Cả 16 SVG của Bài 01 phân tích được như XML.
- RevealJS khởi tạo trong Chromium; DOM có 276 công thức KaTeX, không có `katex-error` hoặc dấu lỗi JavaScript.
- Render và quan sát toàn bộ 37 trang ở 1280 × 720 và 720 × 1280. H07 từng làm mất phần cuối ba thẻ và câu hỏi ở khung 16:9; đã giảm chiều cao hình, rút câu và render lại. Không còn tràn hoặc chồng lấn. Các trang dày H05, H07, K03, K04, K05 và K06 được mở riêng ở độ phân giải gốc.
- Trình xem ghi chú tạo 286 công thức KaTeX, trình xem bài tập tạo 104 công thức; cả hai có 0 lỗi KaTeX và không có lỗi tải. Một khối gập trong ghi chú và 14 khối gập trong bài tập đóng mặc định; yêu cầu ghép sai số bài bị từ chối.
- In thử bài tập tạo PDF 9 trang; đủ 14 tiêu đề gợi ý hoặc lời giải xuất hiện trong văn bản PDF, xác nhận các khối được mở khi in.
- Markdown bắt đầu bằng heading cấp một, chỉ dùng `$...$` và `$$...$$`; mọi directive thuộc sáu loại được hỗ trợ, đóng đủ và không lồng nhau. Liên kết bài 01 trên chỉ mục ghép đúng deck với từng tài liệu.
- `git diff --check` hoàn tất không có lỗi khoảng trắng.
- Playwright duyệt đủ 37 trang tại 1280 × 720 và 37 trang tại 720 × 1280 qua `reloadserver`; phép đo phần tử và quan sát bảng ảnh liên lạc không phát hiện tràn hoặc chồng lấn. L03 được sửa sau lần đo đầu và đã vượt lượt chạy lại.
- DOM deck có 275 nút KaTeX trong phiên Playwright và 0 `katex-error`; sai khác một nút so với lần đếm Chromium CLI trước thuộc cách dựng DOM của hai phiên bản trình duyệt. Không trang nào còn dấu phân cách toán chưa render.
- Điều hướng RevealJS bằng `ArrowDown` và `ArrowUp` đã đổi trang đúng. Các khối `details/summary` của cả hai viewer mở và đóng bằng phím `Enter`; yêu cầu ghép sai số bài tiếp tục bị từ chối.
- Checksum SHA-256 của ba PDF MIT trùng danh mục. Storyboard phân loại đủ 16 SVG: 9 hình dùng trong deck và 7 hình loại khỏi tuyến; mọi hình dùng đều có `alt`, và ánh xạ `first-second-order-convexity.svg` được sửa thành đúng H05.
- Sau lần push đầu của vòng nghiệm thu, URL công khai trả HTTP 200 từ GitHub Pages; checksum HTML trùng tuyệt đối với tệp local. Playwright trên chính URL công khai tiếp tục đạt 37 trang ở cả hai kích thước, 0 lỗi KaTeX, hai viewer đúng số công thức và khối gập, điều hướng bàn phím hoạt động và đủ ba liên kết Bài 01.

## Trạng thái bàn giao

- Năm vai rà soát độc lập và ba lượt tái kiểm đều đạt sau chỉnh sửa; không còn lỗi chặn bàn giao, nghiêm trọng hoặc trung bình.
- Codex Slides đã có dự án bền vững và đủ nguồn nhưng chưa render được phiên bản 37 trang do lỗi Browser/Design File nêu trên. Đây là giới hạn công cụ được báo trung thực theo phương án người dùng cho phép; không dùng nó để thay thế bằng chứng RevealJS.
- RevealJS, material viewer, nguồn, hình, giọng văn và điều hướng đã vượt kiểm định cuối. Commit sửa L03 và tài liệu quy trình đã được đẩy; hash local trùng ref `origin/main` khi kiểm tra bằng `git ls-remote`.

## Bỏ hướng dẫn điều phối khỏi mặt trang

- Theo yêu cầu ngày 2026-09-05, xóa khỏi M01 câu `Tuyến học: ba bài toán cụ thể → khuôn tối ưu → công cụ lồi → chứng nhận.` và khỏi M02 câu `Các sản phẩm này cụ thể hóa LLO1 và LLO2, cùng hỗ trợ CLO1.`; không thay bằng nội dung khác.
- Rà toàn bộ văn bản hiển thị không phát hiện nhãn tuyến, lộ trình, mã LLO/CLO hoặc chỉ dẫn điều phối tương tự. Giữ mục tiêu học tập, vấn đề trung tâm và câu hỏi kiểm tra vì chúng có chức năng học tập cụ thể. LLO/CLO tiếp tục được truy nguyên trong outline, storyboard và review-log, không hiển thị trên mặt trang.
- Writer chỉ nhận `deck.html` trong thư mục tạm không có `.env` hoặc `.env.*`; dùng `task_profile=write`, `max_rounds=4`, `max_tokens=2500`, `timeout=120`, `temperature=0`, `reasoning_effort=low`, `empty_answer_retries=1` và hoàn tất đúng 4 vòng.
- Bằng chứng runtime: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`. Writer chỉ đọc dòng 50–80 rồi thực hiện đúng hai phép thay thế; điều phối viên kiểm tra diff trước khi áp dụng.
- M02 được viết lại thành bốn nội dung người học cần nắm: các bài toán tối ưu trong điều khiển thông minh và AI; nhu cầu về bằng chứng nghiệm tối ưu; tập lồi và hàm lồi; quay lại ba ví dụ để chứng nhận. Ghi chú diễn giả được sửa đồng bộ.
- Lượt writer thứ hai dùng cùng thư mục tạm và các giới hạn trên, với `max_tokens=2800`; hoàn tất đúng 4 vòng. Bằng chứng runtime tiếp tục là `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`.
- Reviewer cuối chỉ đọc M01–M03, dùng `task_profile=recheck`, `max_rounds=4`, `max_tokens=2400`, `timeout=120`, `temperature=0`, `reasoning_effort=low`, `empty_answer_retries=1`; hoàn tất sau 2 vòng. Bằng chứng runtime: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`; kết luận `ĐẠT`, không có lỗi trung bình trở lên.
- Tự kiểm `no-ai-slop` trên phần sửa xác nhận bốn thẻ dùng từ cụ thể, không có mã nội bộ, câu quảng bá, câu hỏi tu từ hoặc lời chỉ dẫn người xem. Playwright duyệt lại đủ 37 trang ở 1280 × 720 và 720 × 1280; không có tràn, lỗi KaTeX hoặc lỗi điều hướng.
- Codex Slides mở được dự án bền vững nhưng dự án vẫn có 0 slide render; Browser handoff không phản hồi trong 8 giây. Vì vậy thay đổi được kiểm định trên bản RevealJS có thẩm quyền, không tuyên bố đã rà trực quan bằng Codex Slides.

## Đổi tên trang M03 theo nhóm bài toán ứng dụng

- Theo yêu cầu ngày 2026-09-05, đổi tiêu đề M03 từ `Ba nhu cầu tối ưu` thành `Một số bài toán tối ưu trong điều khiển và AI`. Giữ nguyên ba ca điều khiển, hồi quy tuyến tính và hồi quy logistic cùng vấn đề trung tâm.
- Sửa câu chuyển cuối ghi chú M02 thành `Chuyển sang ba bài toán mở đầu.`; đồng bộ tên mạch mở đầu trong `outline.md` và tiêu đề M03 trong `storyboard.md`. Không đổi số trang, thứ tự, ký hiệu hoặc kết luận toán học.
- Writer chỉ nhận `deck.html` trong thư mục tạm không có `.env` hoặc `.env.*`; dùng `task_profile=write`, `max_rounds=4`, `max_tokens=2200`, `timeout=120`, `temperature=0`, `reasoning_effort=low`, `empty_answer_retries=1`. Bằng chứng runtime: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`.
- Reviewer chỉ đọc M02–M03–D01 trong cùng bản sao tạm; dùng `task_profile=recheck`, `max_rounds=4`, `max_tokens=2200`, `timeout=120`, `temperature=0`, `reasoning_effort=low`, `empty_answer_retries=1`. Bằng chứng runtime: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`; kết luận `ĐẠT`, không phát hiện vấn đề.
- Kiểm định cấu trúc tiếp tục đạt 7 mạch, 37 trang lá, 37 ghi chú và mã storyboard khớp chính xác. Playwright render đủ 37 trang ở 1280 × 720 và 720 × 1280, không phát hiện tràn hoặc chồng lấn; deck có 275 nút KaTeX và 0 lỗi KaTeX. Quan sát riêng M03 ở cả hai kích thước xác nhận tiêu đề mới và ba thẻ đọc rõ.
- Codex Slides tiếp tục nhận diện dự án bền vững nhưng dự án có 0 slide render; lần mở Browser không phản hồi và đã được dừng. Vì vậy không tuyên bố đã rà trực quan thay đổi này trong Codex Slides; bằng chứng trực quan dùng bản RevealJS có thẩm quyền.

## Bổ sung trực quan mở đầu và ca điều khiển

- Theo yêu cầu ngày 2026-09-05, M03 có ba SVG tự tạo minh họa lần lượt bài toán điều khiển, hồi quy tuyến tính và hồi quy logistic. Ba hình dùng cùng màu và ký hiệu với các ví dụ được triển khai về sau; không dùng dữ liệu hay ảnh sinh bởi AI làm bằng chứng.
- Chuyển sơ đồ `one-step-control.svg` từ D02 sang D01 để trạng thái, tác động, đích và giới hạn xuất hiện trước hàm mục tiêu. Đổi ký hiệu đích từ $r$ sang $t$ trong deck, ghi chú bài giảng, outline, storyboard và SVG; lần đầu dùng ghi rõ $t$ là đích (target).
- Sửa vị trí nhãn `so với đích` trong SVG để nhãn nằm cạnh đường nét đứt nối trạng thái mới với đích, không chồng lên mũi tên năng lượng. D02 đổi tên thành `Tối ưu nhiều mục tiêu: Bám đích và Năng lượng` và đặt phát biểu `Mô hình: quan niệm chủ quan của con người về thế giới` trong khung màu nhấn.
- Worker lập kế hoạch đầu tiên dừng với lỗi nguyên văn `model exceeded the tool-call limit (5)`. Lượt thay thế tăng `max_rounds` từ 5 lên 10, giữ `timeout=180`, `max_tokens=3200`, `temperature=0`, `reasoning_effort=low`; hoàn tất và trả kế hoạch khả thi.
- Writer chỉ nhận bản sao deck, ghi chú, outline, storyboard và các SVG liên quan trong thư mục tạm không chứa `.env` hoặc `.env.*`; dùng `task_profile=write`, `max_rounds=18`, `timeout=360`, `max_tokens=6500`, `temperature=0`, `reasoning_effort=low`. Bằng chứng runtime: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`.
- Reviewer gặp hai lỗi liên tiếp `model exceeded the tool-call limit (10)` và `(16)` khi được cấp quá nhiều tệp. Lượt đạt chỉ cấp một tệp ngữ cảnh cô đọng, cấm liệt kê tệp và giới hạn một lần đọc; dùng `task_profile=recheck`, `max_rounds=4`, `timeout=120`, `max_tokens=2800`, `temperature=0`, `reasoning_effort=low`. Bằng chứng runtime cùng mô hình và nhà cung cấp; kết luận `ĐẠT`.
- Kiểm định cấu trúc xác nhận 7 mạch, 37 trang, 37 ghi chú, mã storyboard khớp chính xác, 23 đường dẫn cục bộ hợp lệ và 19 SVG phân tích được như XML. Playwright dựng 281 nút KaTeX, 0 lỗi KaTeX, không có ảnh hỏng; M03, D01 và D02 không tràn ở 1280 × 720 hoặc 720 × 1280. Đã quan sát riêng bốn ảnh chụp của ba trang sau lần sửa bố cục cuối.
- Codex Slides vẫn giữ dự án bền vững ở trạng thái `draft/clarify` nhưng có 0 trang render. Vì vậy không tuyên bố đã rà trực quan bằng Codex Slides; kiểm định hiển thị dùng bản RevealJS có thẩm quyền.

## Đổi tên và chuẩn hóa thuật ngữ T01

- Theo yêu cầu ngày 2026-09-05, đổi tiêu đề T01 thành `Bài toán tối ưu tổng quát`. Thay câu mô tả trong SVG bằng `Một mô hình tối ưu xác định rõ biến quyết định, hàm mục tiêu và tập khả thi`; dùng `tập khả thi` thay vì `tập nghiệm khả thi` để không nhầm với tập nghiệm tối ưu.
- Đồng bộ tiêu đề trong SVG, ghi chú bài giảng và storyboard; giữ danh sách ký hiệu $x$, $f_0$ và $C$ cùng ghi chú về dữ kiện.
- Reader lập kế hoạch dùng `task_profile=plan`, `max_rounds=6`, `timeout=120`, `max_tokens=2200`, `temperature=0`, `reasoning_effort=low`. Worker đoán sai hai tên tệp không tồn tại nhưng vẫn trả đúng quyết định thuật ngữ; điều phối viên chỉ chấp nhận phần kế hoạch đã đối chiếu trực tiếp. Writer sau đó được cấp chính xác bốn tên tệp, cấm liệt kê và tìm kiếm, giới hạn mỗi tệp một lượt đọc; dùng `task_profile=write`, `max_rounds=10`, `timeout=180`, `max_tokens=3000`, `temperature=0`, `reasoning_effort=low` và hoàn tất sau 4 vòng.
- Reviewer chỉ đọc một tệp ngữ cảnh cô đọng; dùng `task_profile=recheck`, `max_rounds=4`, `timeout=120`, `max_tokens=2200`, `temperature=0`, `reasoning_effort=low`; kết luận `ĐẠT`. Cả ba lượt hoàn tất đều có `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`; thư mục tạm không chứa `.env` hoặc `.env.*`.
- Kiểm định cấu trúc tiếp tục đạt 7 mạch, 37 trang, 37 ghi chú, mã storyboard khớp chính xác, 23 đường dẫn hợp lệ và 19 SVG hợp lệ. Playwright xác nhận T01 không tràn ở 1280 × 720 hoặc 720 × 1280, không có lỗi KaTeX hay ảnh hỏng; ảnh chụp 16:9 đã được quan sát trực tiếp.
