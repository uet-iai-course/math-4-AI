# Dàn ý Bài 11 — Học từ dữ liệu qua ước lượng thống kê

Phạm vi người dùng: chỉ ghi chú Markdown, không tạo hoặc sửa slide. Người dùng đã cho phép dùng toàn bộ Codex thay quy định Claude trong AGENTS.md.

## Đích học tập và thời lượng

Từ dữ liệu độc lập và một họ mô hình xác suất, lập likelihood, tối ưu tham số, kiểm điều kiện tồn tại của nghiệm, rồi diễn giải hình học của mô hình Gaussian đã khớp. Mục tiêu cụ thể hóa CLO2 của đề cương; không tự tạo mã LLO.

| Mục nội dung | Thời lượng | Kết quả cần đạt |
|---|---:|---|
| 11.1 Mô hình thống kê, mẫu, ước lượng và likelihood | 15 phút | Phân biệt mô hình dữ liệu, likelihood và hậu nghiệm; chỉ rõ vai trò giả thiết độc lập |
| 11.2 Ước lượng Bernoulli | 25 phút | Đạo hàm, tính cực đại và nghiệm biên; nguồn gốc mất mát logarit |
| 11.3 Ước lượng phân loại | 20 phút | Lagrange trên simplex; số đếm bằng không |
| 11.4 Gaussian một chiều | 25 phút | Cực đại toàn cục, phương sai MLE và không chệch; mẫu hằng |
| 11.5 Gaussian nhiều chiều và hình học | 35 phút | Mean/covariance MLE, điều kiện hạng, phổ và Mahalanobis |

Bài trên lớp: ba bài, tổng 30 phút. Tự học: E11.1–E11.4 lần lượt 45,40,45,50 phút; đọc và kiểm ví dụ khoảng 120 phút. Bài củng cố và lời giải được đặt trong cùng tài liệu. Homework được giữ trong note theo yêu cầu chỉ biên soạn lecture-note.md.

## Nguồn và vai trò

- Kế hoạch người dùng: attachment d2f4744e-48a6-435e-b0a8-8532bcb2890c/pasted-text-1.txt, phần A,C,G.
- Đề cương chính thức sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx: CLO2 và tiên quyết.
- Murphy (2022), Probabilistic Machine Learning: An Introduction: §§4.1,4.2.1–4.2.6,4.3; §§3.2.1–3.2.2; mở rộng §§4.6,6.2. Mục lục nhà xuất bản được kiểm trực tiếp; không tuyên bố đọc toàn văn khi PDF tải thất bại.
- sources/part2/lecture_notes.pdf §6.1–6.5, trang in10–14: nội dung khởi đầu và các ví dụ 7/10, counts(2,3,5), dữ liệu0–4 và covariance[[1,1],[1,2]].
- sources/part2/homework.pdf W2.1–W2.4, trang1: bài tự học điều chỉnh, không gán số bài Murphy.
- materials/lec-10/lecture-note.md: xác suất và Gaussian đã biết; phần mới là ước lượng và hình học.

## Giới hạn

Không dạy lại đối ngẫu Lagrange, Bayes hoặc phép lấy biên. Chỉ suy ra mất mát từ likelihood và nêu cầu nối; hồi quy có điều kiện, rủi ro tổng thể, PAC/VC thuộc Bài12. KL và Bayes là phần mở rộng, không chiếm thời gian cốt lõi. Hình cảm biến tự tạo bằng SVG; không tải tài sản MIT OCW mới.

## Cấu trúc sau rà soát theo mẫu statistical-learning-theory (2026-11-04)

Ghi chú được tái cấu trúc theo Q1 của `planning/notes-10-14-slt-template.md`; bài tập chuyển sang `materials/lec-11/exercises.md`. Thời lượng ở trên chỉ là kế hoạch giảng, không xuất hiện trong văn bản sinh viên đọc. Các mục của ghi chú hiện tại:

- Câu hỏi mở đầu
- Mục tiêu học tập
- Kiến thức tiên quyết
- 1. Thiết lập bài toán
- 2. Ký hiệu và giả thiết
- 3. Ví dụ xuyên suốt
- 4. Mô hình thống kê, mẫu và hàm hợp lý
- 5. Hợp lý cực đại cho mô hình Bernoulli
- 6. Ước lượng phân loại và tối ưu có ràng buộc
- 7. Gaussian một chiều: trung bình và phương sai
- 8. Gaussian nhiều chiều: ước lượng và hình học
- 9. Ý nghĩa, tác động và giới hạn
- 10. Bài tập
- 11. Câu hỏi cuối buổi và cầu nối
- 12. Tài liệu đọc
- Phụ lục

Tệp bài tập:

- Bài tập 11.1 (Nghiệm trong và nghiệm biên của mô hình Bernoulli)
- Bài tập 11.2 (Nhân tử Lagrange trên một mặt của đơn hình)
- Bài tập 11.3 (Hình học Gaussian theo hướng riêng)
- Bài tập 11.4 (Hợp lý Bernoulli, nghiệm biên và cơ chế lấy mẫu)
- Bài tập 11.5 (Ước lượng phân loại và entropy chéo)
- Bài tập 11.6 (Phương sai hợp lý cực đại và phương sai không chệch)
- Bài tập 11.7 (Ma trận hiệp phương sai, đường đồng mức và dữ liệu suy biến)
- Bài tập 11.8 (Mất mát từ mô hình nhiễu có phương sai khác nhau)

Ánh xạ số hiệu cũ → mới: xem `review-log.md`, mục "Ánh xạ số hiệu cũ → mới".
