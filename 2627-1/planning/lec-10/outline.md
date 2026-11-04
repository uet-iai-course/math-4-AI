# Kế hoạch ghi chú Bài 10

## Phạm vi và ủy quyền

Người dùng yêu cầu viết tiếp Bài 10 theo kế hoạch năm bài 10–14, chỉ tạo ghi chú Markdown, không tạo hoặc sửa slide. Người dùng xác nhận “Dùng Codex toàn bộ”, thay yêu cầu mô hình Claude của AGENTS.md cho nhiệm vụ này; sau đó nhấn mạnh dùng textbook Murphy. Giữ Mục 1 hiện có, chỉ cập nhật lời nối cần thiết; viết Mục 2–5 và phần cuối chương. Không triển khai Bài 11–14.

## Nguồn

- Chính: Kevin P. Murphy (2022), Probabilistic Machine Learning: An Introduction, §§2.2–2.6, §3.1 và phần giới thiệu §3.2.1. Nguồn trang sách chính thức và mục lục được kiểm tra ngày 2026-11-02.
- Ví dụ khởi đầu: sources/part2/lecture_notes.pdf, Week 1A–1E, trang in 3–8. Không kế thừa phân bổ thời gian khác với kế hoạch mới của người dùng.
- Bài tập: sources/part2/homework.pdf, W1.1–W1.4, trang in 1. Dùng bài W1.2–W1.4 làm nền cho E10.1–E10.3, thêm E10.4 tự biên soạn; không gán số bài của Murphy.
- Đề cương: sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx, CLO2; không bịa mã LLO cho kế hoạch mới.
- Liên hệ: Bài05c (điều kiện, Bayes, mômen đã có, trọng tâm concentration), Bài03–06 (tối ưu hàm mục tiêu); chỉ phát biểu lại kiến thức cần thiết và phát triển hướng suy luận.

## Mạch và thời gian

1. Không gian mẫu và tiên đề: 15 phút, giữ camera hiện có.
2. Điều kiện, độc lập, Bayes: 30 phút; chuyển sang kiểm định sản phẩm, tiền nghiệm → quan sát → hậu nghiệm.
3. Biến ngẫu nhiên, PMF/CDF/PDF, Bernoulli/phân loại/Gaussian: 25 phút.
4. Kỳ vọng, phương sai, hiệp phương sai, kỳ vọng toàn phần: 25 phút.
5. Phân phối đồng thời, lấy biên, suy luận khi thiếu nhà cung cấp: 25 phút.

Bài tập trên lớp: 3 × 10 phút. Tự học: 4 bài, 40+40+50+50=180 phút; đọc thêm khoảng 120 phút. Lời giải tự học đặt cuối cùng trong cùng tệp. Các khối ::: không lồng nhau.

## Cấu trúc sau rà soát theo mẫu statistical-learning-theory (2026-11-04)

Ghi chú được tái cấu trúc theo Q1 của `planning/notes-10-14-slt-template.md`; bài tập chuyển sang `materials/lec-10/exercises.md`. Thời lượng ở trên chỉ là kế hoạch giảng, không xuất hiện trong văn bản sinh viên đọc. Các mục của ghi chú hiện tại:

- Câu hỏi mở đầu
- Mục tiêu học tập
- Kiến thức tiên quyết
- 1. Thiết lập bài toán
- 2. Ký hiệu và giả thiết
- 3. Ví dụ xuyên suốt
- 4. Thí nghiệm ngẫu nhiên, biến cố và mô hình xác suất
- 5. Xác suất có điều kiện, độc lập và định lý Bayes
- 6. Biến ngẫu nhiên và phân phối xác suất
- 7. Kỳ vọng, phương sai và hàm của biến ngẫu nhiên
- 8. Phân phối đồng thời, lấy biên và suy luận
- 9. Ý nghĩa, tác động và giới hạn
- 10. Bài tập
- 11. Câu hỏi cuối buổi và cầu nối
- 12. Tài liệu đọc
- Phụ lục

Tệp bài tập:

- Bài tập 10.1 (Đọc điều kiện trên bảng camera)
- Bài tập 10.2 (Mật độ đều và xác suất trên khoảng)
- Bài tập 10.3 (Độc lập trước và sau khi quan sát)
- Bài tập 10.4 (Không gian mẫu đều với hai xúc xắc)
- Bài tập 10.5 (Xác suất lỗi của camera dưới quy trình lấy mẫu khác)
- Bài tập 10.6 (Bayes trong kiểm định sản phẩm)
- Bài tập 10.7 (Phân phối rời rạc ba giá trị)
- Bài tập 10.8 (Phân phối đồng thời và lấy biên)
- Bài tập 10.9 (Hiệp phương sai bằng không nhưng phụ thuộc)
- Bài tập 10.10 (Murphy (2022), Bài tập 2.9: chẩn đoán bệnh hiếm)
- Bài tập 10.11 (Murphy (2022), Bài tập 3.1: không tương quan với biến liên tục)
- Bài tập 10.12 (Murphy (2022), Bài tập 3.2: hệ số tương quan thuộc $[-1,1]$)

Ánh xạ số hiệu cũ → mới: xem `review-log.md`, mục "Ánh xạ số hiệu cũ → mới".
