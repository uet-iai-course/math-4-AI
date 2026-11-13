# Dàn ý Bài 01: Giới thiệu tối ưu, tập lồi và hàm lồi

## Ghi chú bài giảng viết lại theo mẫu SLT (2026-11-12)

Mục này mô tả `materials/lec-01/lecture-note.md` sau lần viết lại theo `prompt_fix_lecture_notes_00_07.md` (U1–U4, Q-A đến Q-G) và quyết định Q01-1 đến Q01-12 của điều phối viên. Các mục phía dưới là lịch sử của deck và dàn ý cũ, giữ nguyên.

### Câu hỏi trung tâm và câu hỏi mở đầu

- Câu hỏi trung tâm: khi nào một điểm tìm được là nghiệm toàn cục, khi nào nghiệm tồn tại và khi nào nghiệm duy nhất.
- Câu hỏi mở đầu: hồi quy logistic trên hai mẫu tách được, $L(w)=2\log(1+e^{-w})$, $L''>0$, thuật toán dừng ở $w=8$; câu trả lời hấp dẫn "có đúng một nghiệm, $w=8$ gần nghiệm" sai vì ba lý do. Câu trả lời tường minh ở §10.5 (đoạn "Do đó, với câu hỏi mở đầu, …").
- Câu hỏi cuối buổi: cùng hai mẫu với mất mát bản lề; $S^*=[1,+\infty)$, có nghiệm nhưng không duy nhất.

### Ví dụ xuyên suốt (Ví dụ 01.1, §3)

- Điều khiển một bước: $x_0=0$, $t=3$, $u_{\max}=1$, $\lambda=\tfrac12$ (Ví dụ 01.2, 01.3, 01.13(a), 01.14(a); Mệnh đề 01.44).
- Bình phương nhỏ nhất: năm người $s=(50,\ldots,70)$, $y=(158,\ldots,172)$ (Ví dụ 01.4); ba điểm $(0,1),(1,2),(2,2)$ (Ví dụ 01.5, 01.6, 01.13(b); Bài tập 01.13, 01.19).
- Hồi quy logistic: hai mẫu $(1,+1),(-1,-1)$ và ba mẫu thêm $(1,-1)$ (Ví dụ 01.7, 01.8; Mệnh đề 01.46; Tình huống 01.1; Bài tập 01.20, 01.21; câu hỏi mở đầu và cuối buổi).

### Mục và khối có số hiệu

Bộ đếm chung 01.1–01.47 (12 định nghĩa, 10 mệnh đề, 7 định lý, 2 bổ đề, 4 hệ quả, 11 nhận xét, 1 thuật toán); Ví dụ 01.1–01.17; Tình huống 01.1–01.3; Bài tập 01.1–01.21 (01.1–01.13 cuối tiểu mục, 01.14–01.21 ở §11). Nhãn công thức (4.1)–(4.7), (5.1), (6.1), (7.1)–(7.3). Ánh xạ số cũ → số mới ở `map-lec-01.md`.

- **Câu hỏi mở đầu**: (văn xuôi)
- **Mục tiêu học tập**: (văn xuôi)
- **Kiến thức tiên quyết**: (văn xuôi)
- **1. Thiết lập bài toán**: (văn xuôi)
- **2. Ký hiệu và giả thiết**: (văn xuôi)
- **3. Ví dụ xuyên suốt: ba quyết định**: Ví dụ 01.1 (Ba quyết định)
- **4. Ba mô hình tối ưu**: (văn xuôi)
- **4.1. Điều khiển một bước và nghiệm trên biên**: Định nghĩa 01.1 (Bài toán điều khiển một bước); Mệnh đề 01.2 (Cực tiểu không ràng buộc và quy tắc cắt); Ví dụ 01.2 (Bộ số chuẩn của bài toán điều khiển); Nhận xét 01.3 (Đạo hàm khác không tại nghiệm biên); Ví dụ 01.3 (Ảnh hưởng của trọng số năng lượng); Bài tập 01.1
- **4.2. Bình phương nhỏ nhất và tập nghiệm**: Định nghĩa 01.4 (Ma trận thiết kế và bài toán bình phương nhỏ nhất); Hệ quả 01.5 (Tập nghiệm của bài toán bình phương nhỏ nhất); Ví dụ 01.4 (Đường hồi quy cân nặng – chiều cao); Ví dụ 01.5 (Ba điểm dữ liệu); Ví dụ 01.6 (Hai cột trùng nhau); Nhận xét 01.6 (Phần dư, thang đo và các nhầm lẫn thường gặp); Bài tập 01.2; Bài tập 01.3
- **4.3. Hồi quy logistic và nghiệm không tồn tại**: Định nghĩa 01.7 (Biên có dấu, mất mát logistic và bài toán hồi quy logistic); Mệnh đề 01.8 (Tính chất của mất mát logistic); Ví dụ 01.7 (Dữ liệu tách được tuyến tính, không có nghiệm); Ví dụ 01.8 (Dữ liệu không tách được, có nghiệm); Định nghĩa 01.9 (Cận dưới đúng, giá trị nhỏ nhất, dãy cực tiểu hóa); Nhận xét 01.10 (Dãy cực tiểu hóa luôn tồn tại và có thể không dẫn tới nghiệm); Bài tập 01.4
- **5. Dạng tổng quát của bài toán tối ưu**: (văn xuôi)
- **5.1. Bài toán tối ưu tổng quát**: Định nghĩa 01.11 (Bài toán tối ưu, khả thi, giá trị tối ưu và nghiệm)
- **5.2. Cực tiểu địa phương và cực tiểu toàn cục**: Định nghĩa 01.12 (Cực tiểu địa phương, cực tiểu toàn cục, cực tiểu chặt); Mệnh đề 01.13 (Quan hệ giữa các loại cực tiểu); Ví dụ 01.9 (Cực tiểu địa phương không toàn cục); Nhận xét 01.14 (Điểm dừng và cực tiểu trên biên); Bài tập 01.5
- **5.3. Miền lồng nhau và bốn loại kết luận**: Mệnh đề 01.15 (So sánh hai bài toán có miền lồng nhau); Ví dụ 01.10 (Bốn loại kết luận trên ba trường hợp); Nhận xét 01.16 (Sáu câu hỏi chứng nhận); Bài tập 01.6
- **6. Tập lồi**: (văn xuôi)
- **6.1. Đoạn nối và tổ hợp lồi**: Định nghĩa 01.17 (Tổ hợp lồi của hai điểm và tập lồi)
- **6.2. Các tập lồi cơ bản và phép toán bảo toàn tính lồi**: Mệnh đề 01.18 (Các tập lồi cơ bản); Mệnh đề 01.19 (Các phép toán bảo toàn tính lồi của tập); Ví dụ 01.11 (Chứng nhận miền bằng phép ghép); Nhận xét 01.20 (Khi bỏ giả thiết: hợp, phần bù, ánh xạ phi tuyến, tính đóng và tính bị chặn); Bài tập 01.7; Bài tập 01.8
- **7. Hàm lồi**: (văn xuôi)
- **7.1. Định nghĩa qua dây cung**: Định nghĩa 01.21 (Hàm lồi, hàm lồi chặt, hàm lõm); Ví dụ 01.12 (Kiểm tra bằng định nghĩa); Nhận xét 01.22 (Hạn chế hàm lồi xuống tập con lồi)
- **7.2. Tập mức dưới**: Định nghĩa 01.23 (Tập mức dưới); Mệnh đề 01.24 (Tập mức dưới của hàm lồi); Bài tập 01.9
- **7.3. Điều kiện bậc nhất**: Định lý 01.25 (Điều kiện bậc nhất); Hệ quả 01.26 (Điều kiện đủ tối ưu cho hàm lồi khả vi); Ví dụ 01.13 (Điều kiện bậc nhất trên hai bài toán)
- **7.4. Điều kiện bậc hai**: Bổ đề 01.27 (Hạn chế lên đường thẳng); Bổ đề 01.28 (Tiêu chuẩn bậc hai một biến); Định lý 01.29 (Điều kiện bậc hai); Ví dụ 01.14 (Điều kiện bậc hai trên các hàm của bài); Bài tập 01.10
- **7.5. Các phép toán bảo toàn tính lồi**: Định lý 01.30 (Các phép toán bảo toàn tính lồi của hàm); Ví dụ 01.15 (Chứng nhận tính lồi của các hàm mất mát); Nhận xét 01.31 (Khi bỏ giả thiết: các phép toán không bảo toàn tính lồi); Bài tập 01.11
- **8. Tính toàn cục, sự tồn tại và tính duy nhất của nghiệm**: (văn xuôi)
- **8.1. Tính toàn cục**: Định lý 01.32 (Cực tiểu địa phương của hàm lồi là cực tiểu toàn cục); Hệ quả 01.33 (Tập nghiệm của bài toán lồi là tập lồi)
- **8.2. Tính duy nhất**: Định lý 01.34 (Lồi chặt cho nhiều nhất một nghiệm)
- **8.3. Sự tồn tại**: Định lý 01.35 (Định lý Weierstrass; còn gọi là định lý giá trị cực trị, extreme value theorem); Nhận xét 01.36 (Khi bỏ giả thiết của Định lý 01.35); Định nghĩa 01.37 (Hàm cưỡng bức); Định lý 01.38 (Tồn tại nghiệm với hàm cưỡng bức)
- **8.4. Lồi mạnh và chính quy hóa bậc hai**: Định nghĩa 01.39 (Hàm lồi mạnh); Nhận xét 01.40 (Lồi mạnh qua Hessian; quan hệ với lồi chặt); Hệ quả 01.41 (Hàm lồi mạnh khả vi có nghiệm duy nhất); Định nghĩa 01.42 (Chính quy hóa bậc hai); Ví dụ 01.16 (Chính quy hóa bậc hai với hai đặc trưng trùng nhau); Nhận xét 01.43 (Các suy diễn sai về tồn tại và duy nhất); Bài tập 01.12
- **9. Chứng nhận nghiệm**: (văn xuôi)
- **9.1. Ba trường hợp xuyên suốt**: Mệnh đề 01.44 (Chứng nhận bài toán điều khiển); Mệnh đề 01.45 (Chứng nhận bình phương nhỏ nhất); Mệnh đề 01.46 (Chứng nhận hồi quy logistic, có và không có chính quy hóa)
- **9.2. Quy trình chứng nhận**: Thuật toán 01.47 (Quy trình chứng nhận một mô hình tối ưu); Ví dụ 01.17 (Phân bố công suất chiếu sáng); Bài tập 01.13
- **10. Ý nghĩa, tác động và giới hạn**: (văn xuôi)
- **10.1. Chính quy hóa khi dữ liệu tách được**: Tình huống 01.1 (Hồi quy logistic có chính quy hóa trên dữ liệu tách được tuyến tính)
- **10.2. Trọng số trộn của ba mô hình**: Tình huống 01.2 (Trọng số trộn của tổ hợp ba mô hình)
- **10.3. Khi giả thiết lồi bị vi phạm**: Tình huống 01.3 (Mạng một nơ-ron ẩn: giả thiết lồi bị vi phạm)
- **10.4. Ứng dụng trong học máy**: (văn xuôi)
- **10.5. Tóm tắt**: (văn xuôi)
- **11. Bài tập**: (văn xuôi)
- **11.1. Mức nhận biết**: Bài tập 01.14 (Lập lịch sạc pin); Bài tập 01.15 (Đúng hay sai)
- **11.2. Mức tính toán hoặc chứng minh**: Bài tập 01.16 (Điều khiển với cận không đối xứng); Bài tập 01.17 (Hessian xác định dương nhưng không có nghiệm); Bài tập 01.18 (Máy vector hỗ trợ lề mềm)
- **11.3. Mức vận dụng**: Bài tập 01.19 (Hồi quy ridge); Bài tập 01.20 (Trung bình hai mô hình); Bài tập 01.21 (Ràng buộc chuẩn thay cho chính quy hóa)
- **12. Câu hỏi cuối buổi và cầu nối**: (văn xuôi)
- **13. Tài liệu đọc**: (văn xuôi)

### Giả thiết của bài

Sau vòng rà 1: danh sách (K1)–(K5) đặt ở cuối §8 (sau khi định nghĩa lồi chặt, cưỡng bức, lồi mạnh); §2 chỉ còn giả thiết về dữ liệu. Ký hiệu đổi sau vòng rà 1: xem `map-lec-01.md` §7.

(K1) miền lồi; (K2) mục tiêu lồi; (K3) $C$ không rỗng, đóng, $f_0$ liên tục; (K4) $C$ bị chặn hoặc $f_0$ cưỡng bức; (K5) lồi chặt, hoặc lồi mạnh khi $C=\mathbb R^d$. Toàn cục ← (K1)+(K2); tồn tại ← (K3)+(K4); duy nhất ← (K1)+(K5).

### Nguồn theo mục

- §4.1: Boyd và Vandenberghe (2004) §1.1; deck D01–D04.
- §4.2: Boyd và Vandenberghe (2004) §1.2.1 (tr. 4); Bài 00 Định nghĩa 00.21, Định lý 00.22, Mệnh đề 00.45, Định lý 00.9, Mệnh đề 00.20; deck L01–L04B.
- §4.3: Murphy (2022) §10.2.1, §10.2.3; Bài 00 Định nghĩa 00.64, Mệnh đề 00.65; deck G00–G04.
- §5: Boyd và Vandenberghe (2004) §4.1.1 (tr. 127–128), §4.2.2; deck T00–T04.
- §6: Boyd và Vandenberghe (2004) §2.1 (tr. 21–26), §2.2.1–2.2.3 (tr. 27–30), §2.3.1–2.3.2 (tr. 36–38); deck F00–F05.
- §7: Boyd và Vandenberghe (2004) §3.1.1, §3.1.3–3.1.4 (tr. 67–71), §3.1.6 (tr. 75), §3.2.1–3.2.3 (tr. 79–81), §4.2.3 (tr. 139–140); Bài 00 Định nghĩa 00.30, Mệnh đề 00.38; deck H01–H06.
- §8: Boyd và Vandenberghe (2004) §4.2.2 (tr. 138), §9.1.2 (tr. 459), §6.3.2 (tr. 306); Rudin (1976) Định lý 2.41, 4.16; "cưỡng bức" không có trong Boyd (giữ định nghĩa của ghi chú cũ); deck H03, H07, H07B.
- §9: deck K00–K06, K05/K05B; slide của Boyd và Vandenberghe cho MIT 6.079 (Boyd, Parrilo 2009) lec01, tr. 1–9 đến 1–12 (bài chiếu sáng; nhãn trang in trên slide).
- §10: Tình huống 01.1–01.3 của ghi chú cũ; Boyd và Vandenberghe (2004) §8.6.1.
- §12: Bài 02 §5.2 (Mệnh đề 02.36(c): mất mát bản lề về quy hoạch tuyến tính bằng biến phụ).

### Lệch với deck (để đồng bộ sau, Q-F)

Đã đồng bộ trong đợt sửa deck 2026-11-13 (mục "Sửa deck theo bảng phát hiện 2026-11-13" của `review-log.md`): deck dùng ký hiệu $s_i$, $y_i$, $w_0$, $w_1$, $a_i^T$, $\tau$, $v$, $\nabla^2f$, $\mathcal I$, $d$ đèn, $\operatorname{Col}$, $\operatorname{Ker}$; H07 dùng "Định lý."; T04 thành "Sáu câu hỏi chứng nhận"; M02 có năm mục tiêu. Các dòng dưới đây giữ làm lịch sử.

- Ký hiệu: cân nặng, chiều cao $s_i$, $y_i$, hệ số $w_0$, $w_1$ (deck L01: $m_i$, $h_i$, $b$, $a$; ghi chú dùng bản sao `height-weight-regression-note.svg`, `g00-…-note.svg`, `g01-…-note.svg`); hàng ma trận thiết kế $a_i^T$ (deck L01B: $x_i^T$); biến hàm hạn chế $\tau$ (deck H05: $t$); độ sáng $\mathcal I$, số đèn $d$ (deck K05: $I$, $m$); $\operatorname{Col}(X)$ (deck K07: $\mathcal R(X)$).
- Bố cục: deck gộp tập lồi, hàm lồi, toàn cục, tồn tại, duy nhất trong mạch 6; ghi chú tách §6–§8. Deck H07 gọi kết quả cưỡng bức và lồi chặt là "Mệnh đề"; ghi chú là Định lý 01.38 và 01.34. Deck T04 "sáu bước", K06 bốn bước; ghi chú: Nhận xét 01.16 (sáu câu hỏi) và Thuật toán 01.47 (bốn giai đoạn, chín bước).
- Bài chiếu sáng: deck K05/K05B là bài tập; ghi chú là Ví dụ 01.17 có bộ số.
- Mục tiêu: deck M02 bốn mục tiêu, ghi chú năm.

## Trạng thái

Dàn ý triển khai ngày 2026-09-05. Bài được tổ chức theo hướng ứng dụng trước lý thuyết: ba nhu cầu cụ thể tạo dữ kiện và câu hỏi, sau đó mới trừu tượng hóa và xây công cụ chứng nhận. Bộ trang chiếu gồm đúng bảy mạch, tạo thành một tuyến trình chiếu liên tục.

## Phạm vi theo đề cương chính thức

- Học phần: UET.AI2012, Cơ sở toán học của Trí tuệ nhân tạo.
- Bài 01: giới thiệu tối ưu; tập lồi; hàm lồi.
- Phân bổ theo đề cương: 2 tiết lý thuyết và 1 tiết bài tập. Dàn ý không quy đổi tiết sang phút.
- Kiến thức tiên quyết: Giải tích 1, Xác suất thống kê, Đại số tuyến tính cho kỹ thuật.
- LLO1: trình bày được các khái niệm cơ bản của tối ưu toán học, gồm tối ưu lồi và ứng dụng.
- LLO2: trình bày được khái niệm, tính chất của tập lồi và hàm lồi; dùng chúng trong bài toán tối ưu.
- LLO1 và LLO2 cùng hỗ trợ CLO1. Minh chứng của Bài 01 là câu hỏi ngắn trên lớp và bài tập cá nhân hoặc nhóm.

## Vấn đề trung tâm và sản phẩm học tập

Vấn đề trung tâm: từ một nhu cầu cụ thể, xây dựng mô hình tối ưu và xác định điều kiện để kết luận về nghiệm toàn cục, sự tồn tại và tính duy nhất.

Sau bài học, sinh viên phải làm được năm việc (theo mục "Mục tiêu học tập" của ghi chú bài giảng, đồng bộ 2026-11-13):

1. Tách dữ kiện, biến, mục tiêu, miền; viết bài toán ở dạng tổng quát.
2. Lập và giải bài toán điều khiển, bình phương nhỏ nhất, hồi quy logistic.
3. Kiểm tra tính lồi của tập và hàm bằng định nghĩa, đạo hàm, phép toán bảo toàn.
4. Chứng nhận riêng ba kết luận: toàn cục, tồn tại, duy nhất.
5. Áp dụng quy trình chứng nhận cho mô hình mới, chỉ ra kết luận mất khi bỏ giả thiết.

Năm mục tiêu trùng nguyên văn trang `M02` (đồng bộ 2026-11-13).

## Bảy mạch và 58 trang lá

Trạng thái sau đợt sửa deck 2026-11-13. Mỗi mạch trừ mạch mở đầu mở bằng một trang tiêu đề mạch (`id="mach-N"`); tên mạch trùng trang "Nội dung" `M02B`.

1. **Mở đầu và ba bài toán tối ưu — M01, M01A, M01B, M02, M02B, M03 (6 trang):** bìa, hai phần học phần, kiểm tra đánh giá, mục tiêu, nội dung, nhu cầu trung tâm với ba quyết định cần tối ưu.
2. **Điều khiển một bước — D00–D04 (5 trang):** mô hình phương trình trạng thái, hàm chi phí bám đích–năng lượng, ví dụ nghiệm trên biên, bài tập chứng minh nghiệm biên.
3. **Hồi quy tuyến tính — L00, L01, L01B, L02–L04, L04B (7 trang):** dự đoán chiều cao từ cân nặng, khái quát sang nhiều đặc trưng, bình phương nhỏ nhất, ví dụ ba điểm, bài tập cột trùng (lời giải ở L04B).
4. **Hồi quy logistic — GT, G00–G04 (6 trang):** phân loại cam, biên có dấu, mất mát logistic, ví dụ hai mẫu tách được tuyến tính, bài tập dãy cực tiểu hóa.
5. **Dạng tổng quát của bài toán tối ưu — T00–T02, T02B, T03, T04 (6 trang):** ba thành phần, ba bài toán trong dạng tổng quát, cực tiểu địa phương và toàn cục, bốn loại kết luận, sáu câu hỏi chứng nhận.
6. **Tập lồi và hàm lồi — F00–F05, H01, H02, H03B, H04–H06, H03, H07, H07B, H08, H09 (17 trang):** tập lồi, hàm lồi, nhắc lại tập mở, đóng, bị chặn, điều kiện vi phân, phép toán bảo toàn tính lồi, định lý địa phương–toàn cục (sau các tiêu chuẩn, theo §8.1 của ghi chú), tồn tại và duy nhất, bài tập hàm mũ, hàm lồi mạnh, chính quy hóa bậc hai.
7. **Chứng nhận nghiệm và tổng kết — K00–K04, K06, K05, K05B, K07, K07B, K08 (11 trang):** mạch kết luận: chứng nhận từng trường hợp, so sánh bốn trường hợp, quy trình chứng nhận, bài tập chiếu sáng có lời giải, bảng tổng kết, bài tập tự kiểm tra hồi quy ridge, tài liệu đọc.

## Phân bổ nội bộ theo tiết

| Mạch | Phân bổ dự kiến | Vai trò |
|---|---:|---|
| 1. Mở đầu và ba bài toán tối ưu | 0,15 tiết lý thuyết | Đặt vấn đề và chuẩn đầu ra |
| 2. Điều khiển một bước | 0,30 tiết lý thuyết | Ca có ràng buộc và nghiệm biên |
| 3. Hồi quy tuyến tính | 0,30 tiết lý thuyết | Ca bậc hai trong học máy |
| 4. Hồi quy logistic | 0,30 tiết lý thuyết | Ca lồi có thể không đạt nghiệm |
| 5. Dạng tổng quát của bài toán tối ưu | 0,20 tiết lý thuyết | Trừu tượng hóa ba trường hợp |
| 6. Tập lồi và hàm lồi | 0,75 tiết lý thuyết | Xây công cụ chứng nhận |
| 7. Chứng nhận nghiệm và tổng kết | 1,00 tiết bài tập | Chứng nhận, diễn giải và chuyển giao |

Tổng phân bổ là 2 tiết lý thuyết và 1 tiết bài tập, đúng đề cương; đây là dữ liệu điều phối nội bộ, không hiển thị trên trang chiếu hoặc ghi chú diễn giả.

## Ba ca xuyên suốt

### Điều khiển một bước

- Dữ kiện: $x_0,t\in\mathbb R$, trong đó $t$ là đích (target); $u_{\max}\ge 0$, $\lambda\ge 0$.
- Biến quyết định: $u\in[-u_{\max},u_{\max}]$; trạng thái kế tiếp $x_1=x_0+u$.
- Mục tiêu: $q(u)=(x_0+u-t)^2+\lambda u^2$.
- Ví dụ số: $x_0=0$, $t=3$, $\lambda=1/2$, $u_{\max}=1$; $u_{\mathrm{free}}=2$, $u^*=1$, $q(u^*)=9/2$.
- Kết luận cuối bài: miền đóng, bị chặn và lồi; $q$ lồi chặt (còn gọi là lồi nghiêm ngặt) khi $\lambda\ge0$; nghiệm tồn tại và duy nhất. Nghiệm biên không cần thỏa $q'(u^*)=0$.

### Hồi quy tuyến tính

- Dữ kiện: $X\in\mathbb R^{n\times d}$, $y\in\mathbb R^n$.
- Biến quyết định: $w\in\mathbb R^d$.
- Mục tiêu: $J(w)=\lVert Xw-y\rVert_2^2$.
- Ví dụ số: ba điểm $(s_i,y_i)$ với đầu vào $s_i\in\{0,1,2\}$ (ký hiệu $s$, không dùng $t$ vì $t$ là đích của bài toán điều khiển), $X=[(1,0);(1,1);(1,2)]$, $y=(1,2,2)^T$; $w^*=(7/6,1/2)^T$, tổng bình phương sai số bằng $1/6$.
- Kết luận cuối bài: $J$ lồi; luôn có ít nhất một nghiệm; nghiệm duy nhất khi và chỉ khi $X$ có hạng cột đầy đủ.

### Hồi quy logistic

- Dữ kiện: $a_i\in\mathbb R^d$, $y_i\in\{-1,+1\}$, $i=1,\ldots,n$.
- Biến quyết định: $w\in\mathbb R^d$.
- Mục tiêu: $L(w)=\sum_i\log(1+\exp(-y_i a_i^Tw))$.
- Ví dụ số tách được tuyến tính: $(a_1,y_1)=(1,+1)$, $(a_2,y_2)=(-1,-1)$; $L(w)=2\log(1+e^{-w})\downarrow0$ khi $w\to+\infty$ nhưng không có nghiệm hữu hạn.
- Kết luận cuối bài: $L$ lồi; tính lồi không tự bảo đảm tồn tại. Thêm $\mu\lVert w\rVert_2^2/2$ với $\mu>0$ tạo mục tiêu lồi mạnh, cưỡng bức và có nghiệm duy nhất.

## Công cụ lý thuyết được giữ

- Tổ hợp lồi và định nghĩa tập lồi.
- Các tập trực tiếp phục vụ ba ca: $\mathbb R^d$, đoạn hoặc hộp, tập affine và nửa không gian.
- Giao của các tập lồi và nghịch ảnh affine.
- Định nghĩa hàm lồi; `lồi chặt (còn gọi là lồi nghiêm ngặt)` ở lần xuất hiện đầu.
- Định lý: cực tiểu địa phương của hàm lồi trên tập lồi là cực tiểu toàn cục.
- Điều kiện bậc nhất và bậc hai trên miền mở, lồi; cách áp dụng cho hàm xác định trên $\mathbb R$ rồi hạn chế lên đoạn đóng.
- Phép toán bảo toàn tính lồi: tổng không âm và hợp với ánh xạ affine.
- Nhắc lại điểm trong, tập mở, tập đóng, tập bị chặn (H03B), vì Bài 00 không ôn các khái niệm này.
- Phân biệt tồn tại và duy nhất; định lý Weierstrass trên miền đóng, bị chặn; vai trò của tính cưỡng bức.
- Hàm lồi mạnh (Định nghĩa 01.39, Hệ quả 01.41) và chính quy hóa bậc hai (Định nghĩa 01.42), thêm vào deck ngày 2026-11-13 (H08, H09) theo §8.4 của ghi chú.

Không đưa nón lồi, nón nửa xác định dương, epigraph, tập mức dưới (sublevel set), Jensen, liên hợp, tựa lồi, log-lồi hoặc log-lõm vào tuyến chính vì chúng không cần để chứng nhận ba ca.

## Nguồn và thứ tự sử dụng

1. Đề cương chính thức UET.AI2012 xác định phạm vi, LLO/CLO, kiến thức tiên quyết và hình thức đánh giá.
2. MIT 6.079 lec01: mô hình tối ưu, bình phương nhỏ nhất, phân lớp bài toán, tối ưu lồi và ca chiếu sáng dùng làm bài chuyển giao.
3. MIT 6.079 lec02: định nghĩa tập lồi, nửa không gian, giao và ảnh affine.
4. MIT 6.079 lec03: định nghĩa hàm lồi, điều kiện bậc nhất/bậc hai, hàm bậc hai, tổng không âm và hợp affine.
5. Boyd và Vandenberghe (2004), Chương 1–3, dùng để kiểm tra giả thiết và phát biểu.

Thứ tự khai thác nguồn vẫn là lec01 → lec02 → lec03. Thứ tự trình bày khác mẫu vì chỉ dẫn của người dùng yêu cầu ứng dụng trước lý thuyết.

## Tài sản trực quan

- Bản sao cho deck (2026-11-13): `optimization-model-anatomy-deck.svg` (nhãn "x: d thành phần"), `first-second-order-convexity-deck.svg` (nhãn $\tau$, $v$, $\nabla^2f$); deck dùng bản `-note` của `height-weight-regression`, `g00-orange-quality-pipeline`, `g01-linear-boundary-2d`; `lighting-distribution.svg` đổi nhãn $I$ thành $\mathcal I$.
- Giữ và dùng: `optimization-model-anatomy.svg`, `convex-set-and-combination.svg`, `convex-concave-strict.svg`, `local-versus-global-minimum.svg`, `first-second-order-convexity.svg`, `existence-and-uniqueness.svg`.
- Sửa: `logistic-loss-convex-case.svg` để ca chính dùng miền $\mathbb R$ và làm rõ cận dưới đúng không đạt; phần ràng buộc đóng, bị chặn được chuyển thành đối chiếu trong mạch kết luận.
- Tạo mới mười SVG: `one-step-control.svg`, `height-weight-regression.svg`, `linear-regression-fit.svg`, `d03-cost-parabola-feasible.svg`, `g00-orange-quality-pipeline.svg`, `g01-linear-boundary-2d.svg`, `lighting-distribution.svg` và ba hình khái quát ở M03 (`m03-control-target.svg`, `m03-linear-fit-sketch.svg`, `m03-logistic-classes.svg`).
- Không dùng trong tuyến chính: `basic-convex-set-library.svg`, `convex-hull-and-conic-hull.svg`, `convex-set-preservation-map.svg`, `epigraph-levelset-indicator.svg`, `convex-preservation-and-jensen.svg`, `line-restriction-convex-library.svg`, `psd-cone-and-quadratic-directions.svg`.

## Tiêu chí hoàn thành

- HTML có đúng 7 `<section>` ngoài, 54 trang lá, 54 mã `data-slide-id` duy nhất, sáu trang tiêu đề mạch `mach-2`…`mach-7` và ghi chú diễn giả có nội dung trên mọi trang nội dung.
- Mỗi ca có nhu cầu, trực quan, ví dụ tính được, mô hình, chứng nhận và bài tập kiểm tra.
- Mọi giả thiết của kết luận về lồi, tồn tại và duy nhất đều hiện diện trước khi dùng.
- Ghi chú học tập mở rộng lập luận; bài tập có mức nhận biết, tính toán hoặc chứng minh và vận dụng AI.
- Trang chỉ mục chỉ công bố các tệp đã tồn tại và đã kiểm định.
- Bộ trang chiếu, viewer và tài liệu chạy hoàn toàn bằng tài sản cục bộ; không có liên kết runtime chéo hoặc tài nguyên hỏng.

## Bổ sung định hướng học phần ngày 2026-09-07

- Thêm M01A và M01B sau tiêu đề, trước mục tiêu bài; tăng 39 lên 41 trang, giữ bảy mạch và thứ tự các trang toán học.
- M01A đối chiếu mục I và III của đề cương chính thức: tối ưu hóa; xác suất và mô hình xác suất, trọng tâm đồ thị, suy diễn và học tham số. Không biến phần giới thiệu thành bài giảng xác suất mới.
- M01B dùng mục IV.1 và chỉ dẫn cụ thể của người dùng: kiểm tra thường xuyên 20%, giữa kỳ 20%, cuối kỳ 60%; cuối kỳ có một buổi tuần 15 và một buổi theo lịch thi. Không suy diễn tỷ trọng từng buổi.
- Nguồn mới chỉ là đề cương hiện có và chỉ dẫn người dùng; không tải thêm MIT. Hai trang định hướng không kế thừa mẫu nội dung MIT; dùng thẻ và bảng sẵn có của RevealJS.
- Giữ tổng 2 tiết lý thuyết và 1 tiết bài tập. Phần mở đầu vẫn phân bổ nội bộ 0,15 tiết, trình bày ngắn và đưa chi tiết vào tài liệu học tập.

## Sửa văn phong và trang tiêu đề mạch ngày 2026-10-12

- Theo yêu cầu người dùng 2026-10-12 và các mục "Trang tiêu đề mạch", "Văn phong và mật độ mặt trang chiếu" của `AGENTS.md`: thêm sáu trang tiêu đề mạch D00, L00, GT, T00, F00, K00; thêm trang "Nội dung" M02B; tách H07B khỏi H07, K05B khỏi K05, K07 và K08 khỏi K06. Tổng 41 → 52 trang, vẫn bảy mạch.
- Đổi tên bốn mạch cho khớp trang "Nội dung" (lý do ở `storyboard.md`). Đổi tiêu đề D01, D02, D03, L03, L04, G03, G04, T01, T02, T03, T04, F05, K05 theo mẫu trang ví dụ, bài tập và quy tắc tiêu đề.
- Mỗi cụm khái niệm lớn có một bài tập có "Lời giải:" trên mặt trang: D04, L04, G04, F05, H07B, K05B. Lời giải K05B trùng Bài 9 (phần 1–4) của `materials/lec-01/exercises.md`.
- Mạch kết luận có bảng tổng kết theo kết quả K07 và trang tài liệu đọc K08. Thời lượng theo đề cương không đổi.

## Rà soát thuật ngữ và thứ tự định nghĩa ngày 2026-10-12

- Thuật ngữ thống nhất: biên có dấu (signed margin, còn gọi là lề có dấu), biên quyết định (decision boundary), giá trị tối ưu (optimal value), phương trình trạng thái, dãy cực tiểu hóa (minimizing sequence), tách được tuyến tính (linearly separable), hạng cột đầy đủ (full column rank), phép toán bảo toàn tính lồi, miền khả thi (feasible set), cực tiểu không ràng buộc (unconstrained minimizer), định lý Weierstrass, vector, kích thước.
- Định nghĩa đặt trên mặt trang trước khi dùng: tổ hợp lồi (F01), cực tiểu địa phương (H03), tập mở, tập đóng, tập bị chặn (trang mới H03B), tách được tuyến tính (G03), dãy cực tiểu hóa (G04), hạng cột đầy đủ (L04), ký hiệu clip (K01), điều kiện cưỡng bức (H07).
- L04 tách thành L04 (câu hỏi, "Nhắc lại:") và L04B (lời giải) vì dòng "Nhắc lại:" làm trang vượt khung 16:9. Tổng 52 → 54 trang, vẫn bảy mạch; trang "Nội dung" không đổi.
