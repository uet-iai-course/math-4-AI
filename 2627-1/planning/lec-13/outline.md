# Dàn ý Bài 13 — Ra quyết định tuần tự dưới điều kiện bất định

Phạm vi là phần A, E và G trong kế hoạch người dùng: chỉ ghi chú Markdown, không tạo hoặc sửa slide. Người dùng yêu cầu tác tử Codex và cho phép commit, push. Các mục tiêu cụ thể hóa CLO2 và CLO4; không tự tạo mã LLO.

| Mạch | Phút | Kết quả cần đạt |
|---|---:|---|
| 13.1. Quá trình ngẫu nhiên và xích Markov | 25 | Tính Markov, thuần nhất, ma trận chuyển hàng và phân phối sau nhiều bước |
| 13.2. MDP, chính sách và tổng thưởng | 25 | Mô hình có điều khiển, chính sách tổng quát và dừng, tổng thưởng chiết khấu, Bellman theo chính sách |
| 13.3. Bellman tối ưu và lặp giá trị | 40 | Tính co, điểm bất động duy nhất, ý nghĩa tối ưu, hội tụ và ví dụ tính tay |
| 13.4. Biết mô hình và học từ trải nghiệm | 30 | Ước lượng chuyển tiếp, mục tiêu Bellman, thăm dò, học dựa trên mô hình và học trực tiếp giá trị |

Ba bài trên lớp chiếm 30 phút. Bốn bài tự học E13.1–E13.4 lần lượt40,60,45,35 phút, tổng180 phút; thêm khoảng120 phút đọc và kiểm lại ví dụ. Các bài củng cố có gợi ý và lời giải. Homework nằm trong cùng note, không bắt buộc lời giải đầy đủ ở phần chính theo G.3.

## Nguồn và cách sử dụng

- Murphy (2023), Probabilistic Machine Learning: Advanced Topics là giáo trình chính: §§2.6.1,2.6.3;34.5.1,34.5.3–34.5.5;34.6.1;35.1.1,35.1.4–35.1.5;35.2.2,35.2.5. Các số mục được kiểm với mục lục nhà xuất bản; không nhận đã đọc toàn văn khi tải lỗi.
- Sutton và Barto (2018), bản PDF local, Chương3–4, là nguồn bổ trợ về cách diễn giải và chứng minh, không thay Murphy.
- lecture_notes.pdf, Tuần4,§8.1–§8.4 giữ hai ví dụ xích Markov và robot. homework.pdf,W4.1–W4.4 là nguồn bốn bài điều chỉnh, không gán thành số bài Murphy.
- Bài07,Định lý07.49 là điểm xuất phát: đổi cực tiểu chi phí thành cực đại thưởng, thêm kỳ vọng và chuyển từ hữu hạn sang vô hạn có chiết khấu.
- Bài11,Định lý11.7 cung cấp MLE phân loại cho một hàng chuyển tiếp. Bài12 cung cấp sự phân biệt giữa giải đúng bài toán tối ưu và học được mô hình đúng.

## Giới hạn

Giữ phần countMLE, mục tiêu Bellman và phân biệt quy hoạch/học ở cốt lõi. Chặn phần dư và phản ví dụ bỏ chiết khấu được phân tầng mở rộng. Cập nhật Q chỉ minh họa một mục tiêu ngẫu nhiên; không triển khai toàn bộ lý thuyết hội tụ Q-learning, policy gradient hoặc deep RL. Không đồng nhất hội tụ của toán tử chính xác với hội tụ của một thuật toán lấy mẫu.

## Cấu trúc sau rà soát theo mẫu statistical-learning-theory (2026-11-04)

Ghi chú được tái cấu trúc theo Q1 của `planning/notes-10-14-slt-template.md`; bài tập chuyển sang `materials/lec-13/exercises.md`. Thời lượng ở trên chỉ là kế hoạch giảng, không xuất hiện trong văn bản sinh viên đọc. Các mục của ghi chú hiện tại:

- Câu hỏi mở đầu
- Mục tiêu học tập
- Kiến thức tiên quyết
- 1. Thiết lập bài toán
- 2. Ký hiệu và giả thiết
- 3. Ví dụ xuyên suốt
- 4. Xích Markov và phân phối trạng thái
- 5. Quá trình quyết định Markov, chính sách và tổng thưởng chiết khấu
- 6. Phương trình Bellman tối ưu và lặp giá trị
- 7. Biết mô hình và học từ trải nghiệm
- 8. Ý nghĩa, tác động và giới hạn
- 9. Bài tập
- 10. Câu hỏi cuối buổi và cầu nối
- 11. Tài liệu đọc
- Phụ lục

Tệp bài tập:

- Bài tập 13.1 (Truyền phân phối hai bước)
- Bài tập 13.2 (Lặp giá trị và điểm bất động)
- Bài tập 13.3 (Mục tiêu theo mô hình và mục tiêu từ một mẫu)
- Bài tập 13.4 (Xích Markov, xác suất chuyển và xác suất quỹ đạo)
- Bài tập 13.5 (Lặp giá trị cho robot và giá trị dài hạn)
- Bài tập 13.6 (Học mô hình và mục tiêu Bellman)
- Bài tập 13.7 (Giả thiết và bảo đảm của quy hoạch và của học)
- Bài tập 13.8 (Giá trị của chính sách dừng)
- Bài tập 13.9 (Phương trình Bellman tối ưu có hai hành động cùng tối ưu)
- Bài tập 13.10 (Tính co và phần dư Bellman)
- Bài tập 13.11 (Kiểm tra một khẳng định hội tụ)

Ánh xạ số hiệu cũ → mới: xem `review-log.md`, mục "Ánh xạ số hiệu cũ → mới".
