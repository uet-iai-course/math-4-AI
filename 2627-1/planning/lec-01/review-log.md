# Nhật ký rà soát Bài 01

## Trạng thái

- Ngày: 2026-09-05.
- Sản phẩm hiện tại: skeleton đang phát triển, chưa phải bộ trang chiếu hoàn chỉnh.
- Phạm vi vòng này: thay cấu trúc lý thuyết trước bằng tuyến ứng dụng trước; chưa điền đầy đủ ví dụ, chứng minh, hình và bài tập.

## Quyết định nguồn và cấu trúc

- Đề cương DOCX chính thức xác nhận Buổi 1 gồm giới thiệu tối ưu, tập lồi và hàm lồi; LLO1–LLO2 cùng gắn CLO1.
- Dùng Boyd và Vandenberghe (2004), Chương 1–3, cùng MIT 6.079 lec01 → lec02 → lec03 làm nguồn khái niệm và mẫu tham chiếu.
- Chỉ dẫn của người dùng được ưu tiên: điều khiển một bước → hồi quy tuyến tính → hồi quy logistic → khuôn tổng quát → tập lồi → hàm lồi → chứng nhận lại.
- Dùng 6 mạch và 23 trang lá. Bản cũ có 53 trang lá được giữ nguyên dưới tên sao lưu.
- Không có ảnh raster hoặc tài sản hình mới trong skeleton.
- Ca độ sáng bị bỏ khỏi mặt trang chiếu vì trùng vai trò dẫn nhập; có thể tái sử dụng như bài luyện.

## Bằng chứng đa tác tử

- Tác tử lập kế hoạch: `requested_model=z-ai/glm-5.3-flash`, `observed_model=z-ai/glm-5.3-flash`, `provider=OpenRouter`. Điều phối viên bác đề xuất giữ nguyên 53 mã vì không phản ánh chỉ dẫn mới.
- Tác tử phân tích nguồn: cùng mô hình và nhà cung cấp; đề xuất 6 mạch, 23 trang và ánh xạ ứng dụng trước lý thuyết. Điều phối viên chấp nhận cấu trúc này.
- Tác tử soạn skeleton: cùng mô hình và nhà cung cấp; tạo bản nháp trong thư mục tạm. Điều phối viên bác các lỗi kỹ thuật của bản nháp gồm: không lồng section ngoài, thiếu `data-slide-id`, hiển thị mã nội bộ trên tiêu đề, sai đường dẫn plugin và đặt chân trang thành một trang chiếu. Các lỗi này được sửa trước khi đưa vào kho.

## Trạng thái rà soát

| Vai rà soát | Trạng thái | Ghi chú |
|---|---|---|
| Kiểm định storyboard | Đã rà skeleton | Không còn lỗi chặn, nghiêm trọng hoặc trung bình. |
| Góc nhìn sinh viên | Hoãn | Thực hiện khi ví dụ và hình đã được điền. |
| Góc nhìn chuyên gia | Hoãn | Thực hiện khi độ bao phủ chi tiết đã được chốt. |
| Độ chính xác toán học | Đã rà skeleton | Công thức khung đã qua lượt rà lại; ví dụ số chưa tồn tại. |
| Phản biện học thuật–giảng dạy | Hoãn | Thực hiện sau bản nháp nội dung. |
| Mạch kể chuyện | Đã rà skeleton | Lượt gọi điều chỉnh hoàn tất; chi tiết nói vẫn dành cho vòng nội dung. |

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
