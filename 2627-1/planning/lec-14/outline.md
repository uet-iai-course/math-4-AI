# Dàn ý Lecture Note 14

Ngày 2026-11-03. Phạm vi người dùng: chỉ lecture note 14, không tạo hoặc sửa slide; commit và push được cho phép. Kế hoạch nguồn: `/home/tqlong/.codex/attachments/3893a558-0387-4fd2-85f7-7193feb41a27/pasted-text-1.txt`, phần A,F,G và liên kết với các bài trước. Người dùng yêu cầu Codex làm agents, ưu tiên hơn điều phối Claude trong AGENTS.md. Không đổi AGENTS.md.

## Bài toán và sườn lý thuyết

Từ bốn điểm 2D, tìm biểu diễn một chiều giảm lỗi tái tạo; sau đó bổ sung tiên nghiệm và likelihood để mô hình hóa/sinh dữ liệu. Sườn: phân rã phổ → tối ưu phương sai → lỗi trực giao → AE và đổi tọa độ → mật độ biến ẩn → KL không âm → ELBO decomposition → Gaussian KL/reparameterization → VAE và giới hạn đánh giá.

## Nội dung và thời gian

| Mục | Chức năng | Nguồn diễn giải | Phút |
|---|---|---|---:|
|14.1|Chọn không gian con từ tiêu chuẩn nén, chứng minh phương sai/tái tạo|Murphy I20.1/20.1.2|30|
|14.2|Học hai ánh xạ; phân biệt subspace/axes và tái tạo/sinh|Murphy I20.3/20.3.1|25|
|14.3|Tiên nghiệm, conditional likelihood, biên, posterior và khó tích phân|Murphy II21.1/21.2.1|25|
|14.4|KL,ELBO,VAE,Gaussian KL và gradient qua mẫu|Murphy I6.2.3/6.2.4;II10.1.1/10.1.5/10.2.1/21.2.2;KingmaWelling§§2–3|40|
|14.5–14.6|Hai ứng dụng, thất bại giả thiết và tổng kết|Tự biên soạn, áp dụng kết quả đã chứng minh|tích hợp|
|14.7|Ba bài lớp có lời giải|lecture_notes.pdf tr24, điều chỉnh|30 riêng|
|14.8–14.9|Bốn homework phân mức và lời giải phụ lục|homework.pdf W5.1–4, điều chỉnh|180 tự học|

## Kiểm kê và vai trò nguồn

- Đề cương DOCX chính thức hiện có trong sources: năng lực CLO2,CLO4 kế thừa cách đối chiếu của Bài11–13; không tạo LLO mới.
- `sources/part2/lecture_notes.pdf`, Tuần5 §9 tr22–24: nguồn khởi đầu, giữ PCA bốn điểm (±2,0),(0,±1), S=diag(2,1/2), lỗi trung bình1/2; AE trục ngang trên hai điểm; Gaussian KL N(1,.25)||N(0,1); ba bài lớp10phút. Không coi nguồn này là textbook Murphy.
- `sources/part2/homework.pdf`, W5.1–4 tr2–3: giữ toàn bộ dữ kiện chính. Thời lượng điều chỉnh từ50/35/60/35 thành45/35/65/35 theo kế hoạch người dùng, vẫn180. Bổ sung đổi đơn vị/đổi tọa độ/mật độ suy biến/kiểm phân rã exact/gradient để đủ bốn dạng bài tập.
- Murphy I,2022: nguồn chính PCA/AE/KL. Trang tác giả https://probml.github.io/pml-book/book1.html; TOC https://probml.github.io/pml-book/toc1.pdf xác minh số mục20.1,20.1.2,20.3,20.3.1,6.2.3,6.2.4. TOC nháp2021 không dùng để gán số trang ấn bản2022. Không nhận đã đọc toàn văn trong phiên này.
- Murphy II,2023: nguồn chính VI/VAE. TOC nhà xuất bản https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/14319/TOC_MurphyPMLv2.pdf xác minh10.1.1 tr433,10.1.5 tr438,10.2.1 tr440,21.1/21.2 tr781,21.2.1 tr782,21.2.2/3 tr783. Không nhận đã đọc toàn văn khi mới kiểm TOC.
- Kingma,Welling,Auto-Encoding Variational Bayes,arXiv1312.6114v11,2022-12-10: nguồn bổ trợ được root đọc local trong kho statistical-learning-theory/sources/supp/kingma-welling-2014.pdf;§§2.2–2.4 tr3–5,§3 tr5. References chỉ dẫn URL tác giả https://arxiv.org/abs/1312.6114, không phụ thuộc runtime crossrepo. Dùng bổ trợ proof/reparam, giữ Murphy chính.
- Không tải nguồn MIT mới; không dùng ảnh bên thứ ba. Hai SVG được tự vẽ bằng số liệu chương.

## Liên hệ và ngoại lệ phạm vi

Đầu chương phát biểu lại nền đại số/tối ưu/Bayes, dẫn Mệnh đề11.3 đã kiểm. Kết nối Bài05–06 được mô tả theo chủ đề, không bịa số kết quả. Bài12 phục vụ kiểm định chất lượng ngoài mẫu; Bài13 phục vụ phân biệt giải mô hình và học mô hình. Kết thúc không thêm Bài15 không tồn tại. Tất cả bài tập nằm trong cùng note theo yêu cầu user, không tạo exercises.md. Không tạo RevealJS hoặc ép 5–7 strands slide cho sản phẩm Markdown.

## Cấu trúc sau rà soát theo mẫu statistical-learning-theory (2026-11-04)

Ghi chú được tái cấu trúc theo Q1 của `planning/notes-10-14-slt-template.md`; bài tập chuyển sang `materials/lec-14/exercises.md`. Thời lượng ở trên chỉ là kế hoạch giảng, không xuất hiện trong văn bản sinh viên đọc. Các mục của ghi chú hiện tại:

- Câu hỏi mở đầu
- Mục tiêu học tập
- Kiến thức tiên quyết
- 1. Thiết lập bài toán
- 2. Ký hiệu và giả thiết
- 3. Ví dụ xuyên suốt
- 4. Phân tích thành phần chính
- 5. Bộ tự mã hóa tất định
- 6. Mô hình xác suất có biến ẩn
- 7. Suy luận biến phân và cận dưới bằng chứng
- 8. Bộ tự mã hóa biến phân
- 9. Ý nghĩa, tác động và giới hạn
- 10. Bài tập
- 11. Câu hỏi cuối buổi và cầu nối
- 12. Tài liệu đọc
- Phụ lục

Tệp bài tập:

- Bài tập 14.1 (Phân tích thành phần chính của bốn quan sát trên hai trục)
- Bài tập 14.2 (Mô hình sinh từ bộ tự mã hóa trục ngang)
- Bài tập 14.3 (Hai vai trò của KL trong phân rã ELBO)
- Bài tập 14.4 (KL tới tiên nghiệm và tái tham số hóa)
- Bài tập 14.5 (Phương sai mã và lỗi tái tạo theo góc)
- Bài tập 14.6 (Phân tích thành phần chính của dữ liệu theo đường chéo)
- Bài tập 14.7 (Mã, tái tạo và xác suất của một miền)
- Bài tập 14.8 (Bộ tự mã hóa theo đường chéo và giới hạn sinh dữ liệu)
- Bài tập 14.9 (KL Gaussian, kỳ vọng tái tạo và ELBO)
- Bài tập 14.10 (Mẫu tái tham số hóa và ước lượng gradient)
- Bài tập 14.11 (KL bằng không, mômen khớp và mô hình sai)

Ánh xạ số hiệu cũ → mới: xem `review-log.md`, mục "Ánh xạ số hiệu cũ → mới".
