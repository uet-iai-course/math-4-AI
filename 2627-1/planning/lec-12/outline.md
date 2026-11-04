# Dàn ý Bài 12 — Học máy, rủi ro thống kê và khả năng tổng quát hóa

## Hợp đồng biên soạn

Kế hoạch người dùng phầnA,D,G; chỉ ghi chú Markdown, không tạo/sửa slide. Người dùng yêu cầu dùng Codexagents, commit và push. Chỉ đạo bổ sung: toàn bộ lý thuyết VC chỉ làm trên đầu vào một chiều, dùng để minh họa độ phức tạp của lớp giả thuyết. Việc có cùng số chiều đầu vào không đồng nghĩa có cùng khả năng biểu diễn nhãn.

| Mạch | Thời lượng | Kết quả đích |
|---|---:|---|
|12.1Hồi quyGaussian|30phút|Hợp lý có điều kiện→mất mát bình phương→phương trình chuẩn, điều kiện duy nhất|
|12.2Logistic|25phút|Bernoulli có điều kiện→entropy chéo, xác suất và phân loại, nghiệm hữu hạn có thể không tồn tại|
|12.3Rủi ro vàERM|30phút|Rủi ro tổng thể/thực nghiệm; thresholdUniform1D; khớp mẫu không đủ|
|12.4Tổng quát hóa/PAC/VC1D|35phút|Hội tụ đều, chặnERM gần đúng, accuracy/confidence, VCthreshold1 vàaffine1D2, ba nguồn sai số|

120phút lý thuyết+30phút ba bài trên lớp. Tự học4bài E12.1–4 times50/40/45/45=180phút+đọc120phút. Các bài củng cố có gợi ý/lời giải; homework trong cùng note, không bắt buộc lời giải đầy đủ ở phần chính theo kế hoạch.

## Nguồn

- Murphy2022: §§4.2.7,4.3,5.1.1–2/5,5.4.1/4,10.2.3,11.2.2. Đã xác minh số mục với TOC nhà xuất bản; không tuyên bố đọc toàn văn khi tải lỗi.
- Shalev-Shwartz&Ben-David2014 UML: bảnPDF có thật trong kho học phần statistical-learning-theory/sources/uml, chỉ đọc tham khảo, không chép/commit nguồn. §§3.1–3.2,4.1–4.2,5.2,6.2–6.4 (Theorems6.7–6.8), Ch28 đọc sâu.
- sources/part2/lecture_notes.pdf §7.1–7.4 trangin15–18:4ví dụ cần giữ. sources/part2/homework.pdf W3.1–4 trang2: nguồn bài tập điều chỉnh.
- Đề cương DOCX chính thức: mục tiêu biên soạn cụ thể hóa CLO2 vàCLO4, không tạo mãLLO giả.
- Bài11 Mệnh đề11.3 vàĐịnh lý11.9: điểm xuất phát likelihood; Bài05c Mệnh đề05c.7/Định lý05c.47/52: unionbound vàHoeffding, không chứng minh lại concentration.

## Phân tầng và giới hạn

Cốt lõi có chứng minh hai suy diễn mất mát, normal equations, riskthreshold, finiteH uniformbound, ERMconsequence vàVC1D. Kết quảVCuniform cho lớp vô hạn dẫnUML6.4, chứng minh sâu ởCh28 ngoài lớp. Không áp cận0–1/boundedloss cho crossentropy không chặn. Phân rã sai số dùng upperbound với empirical optimization gap, không gọi population riskdifference là sai số tối ưu luôn không âm. Không triển khai highdimVC, neuralnetworkVC hoặc toàn bộ học phần cao học.

## Cấu trúc sau rà soát theo mẫu statistical-learning-theory (2026-11-04)

Ghi chú được tái cấu trúc theo Q1 của `planning/notes-10-14-slt-template.md`; bài tập chuyển sang `materials/lec-12/exercises.md`. Thời lượng ở trên chỉ là kế hoạch giảng, không xuất hiện trong văn bản sinh viên đọc. Các mục của ghi chú hiện tại:

- Câu hỏi mở đầu
- Mục tiêu học tập
- Kiến thức tiên quyết
- 1. Thiết lập bài toán
- 2. Ký hiệu và giả thiết
- 3. Ví dụ xuyên suốt
- 4. Hồi quy Gaussian và mất mát bình phương
- 5. Hợp lý logistic và entropy chéo nhị phân
- 6. Rủi ro kỳ vọng, rủi ro thực nghiệm và tối thiểu hóa rủi ro thực nghiệm
- 7. Hội tụ đều và rủi ro dư của ERM
- 8. Học PAC và số chiều VC trên trục thực
- 9. Ý nghĩa, tác động và giới hạn
- 10. Bài tập
- 11. Câu hỏi cuối buổi và cầu nối
- 12. Tài liệu đọc
- Phụ lục

Tệp bài tập:

- Bài tập 12.1 (Suy ra và giải mục tiêu hồi quy từ ba số đo)
- Bài tập 12.2 (Tập nghiệm ERM và hai loại rủi ro của lớp ngưỡng)
- Bài tập 12.3 (Các cách gán nhãn của hai lớp ngưỡng trên hai điểm)
- Bài tập 12.4 (Hợp lý Gaussian, phương trình chuẩn và tồn tại nghiệm hợp lý cực đại)
- Bài tập 12.5 (Entropy chéo, cực tiểu không đạt được và nhãn đổi)
- Bài tập 12.6 (Rủi ro chính xác của bộ phân loại ngưỡng dưới hai phân phối đầu vào)
- Bài tập 12.7 (Số chiều VC, giới hạn tổng quát hóa và lớp khoảng)
- Bài tập 12.8 (Tham số độ chính xác và độ tin cậy trong một phát biểu PAC)
- Bài tập 12.9 (Hội tụ đều và nghiệm ERM gần đúng)

Ánh xạ số hiệu cũ → mới: xem `review-log.md`, mục "Ánh xạ số hiệu cũ → mới".
