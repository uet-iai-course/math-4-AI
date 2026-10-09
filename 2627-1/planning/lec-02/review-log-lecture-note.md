> Ngày 2026-10-10: bản ghi chú này đã thay thế `materials/lec-02/lecture-note.md` cũ theo yêu cầu người dùng; thư mục `lec-02b` bị gỡ và nhật ký được chuyển về đây. Các đường dẫn `lec-02b` dưới đây là đường dẫn tại thời điểm rà soát.

# Nhật ký rà soát Bài 02b — ghi chú bài giảng viết lại theo tiêu chuẩn giáo trình

Tệp sản phẩm: `materials/lec-02b/lecture-note.md` (tệp mới, để so sánh với `materials/lec-02/lecture-note.md`). Bộ trang chiếu, `materials/lec-02/*` và `exercises.md` không bị sửa. Bản đóng gói `material-local-data.js` được cập nhật bằng `scripts/sync-local-materials.py`. Chưa commit.

Số hiệu trong nhật ký này theo bản lượt 2 (sau chỉnh sửa), trừ khi ghi "số cũ". Bảng đổi số hiệu ở cuối tệp.

## Tác tử

| Vai | Loại tác tử | Mô hình | Effort | Ghi chú |
|---|---|---|---|---|
| Soạn (authoring), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo brief của điều phối viên ngày 2026-10-09; tác tử tự ghi, điều phối viên đối chiếu với lời gọi công cụ. |
| Rà toán (math accuracy), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo ghi nhận của điều phối viên; chỉ đọc. |
| Rà mạch truyện (storyline), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo ghi nhận của điều phối viên; chỉ đọc. |
| Chỉnh sửa (editor), lượt 2 | general-purpose (cùng tác tử soạn, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "yêu cầu sửa" lượt 1 của điều phối viên. |
| Rà toán, rà lại lượt 2 | general-purpose (tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo ghi nhận của điều phối viên; chỉ đọc. |
| Rà mạch truyện, rà lại lượt 2 | general-purpose (tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo ghi nhận của điều phối viên; chỉ đọc. |
| Chỉnh sửa nhẹ, lượt 3 | general-purpose (cùng tác tử, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng 13 mục sửa nhẹ của quyết định lượt 2. |

Kỹ năng `no-ai-slop` được nạp (chế độ Edit) và tự đối chiếu `eval.md` trước mỗi lần bàn giao (mục "Tự kiểm `no-ai-slop`").

## Quyết định của điều phối viên

| Lượt | Đầu ra | Quyết định | Lý do |
|---|---|---|---|
| 1 | Bản soạn 29 961 từ, 143 khối | yêu cầu sửa | Một phát hiện nghiêm trọng (định nghĩa cải dạng tương đương cho phép ánh xạ hằng, nên các câu "không có ánh xạ nào thỏa (1.3)" sai), mười phát hiện trung bình, các phát hiện nhẹ và yêu cầu cắt lặp khoảng 1 000 từ. |
| 2 | Bản chỉnh sửa 30 431 từ | chấp nhận sau sửa nhẹ | Mọi phát hiện nghiêm trọng và trung bình của lượt 1 đã đóng; còn một điểm trung bình mới (thiếu "Chuỗi suy luận của toàn chương") và 12 điểm nhẹ, xem bảng "Phát hiện lượt 2". |
| 3 | Bản sửa nhẹ (tệp hiện tại), 30 704 từ | chờ điều phối viên | Xem bảng "Phát hiện lượt 2" và kết quả kiểm tra. |

Các quyết định đi kèm lượt 1:

1. Nâng phát hiện N1 của báo cáo rà toán (ánh xạ hằng trong Định nghĩa 02.5) lên mức nghiêm trọng.
2. Chấp nhận và ghi nhận: các bài 1, 2, 3, 4, 5, 7, 10, 11, 13, 14 của `materials/lec-02/exercises.md` có lời giải mẫu trong ghi chú, vì bộ bài giao vốn dựng từ ví dụ của bộ trang chiếu (ghi chú cũ cũng vậy); phần biến thể 3c, 4c, 6b, 8, 9, 12 là bài giao thật. Việc đổi dữ liệu của `exercises.md` sẽ được cân nhắc sau, ngoài phạm vi lượt này.
3. Các chỗ lệch ký hiệu phía bộ trang chiếu ($h_j$/$g_j$, $x^\star$/$x^*$, $\le$/$\preceq$, $g_k$/$g_i$): trạng thái "chờ sửa deck".
4. Ngoại lệ độ dài: ghi chú vượt 20 000 từ của tiêu chuẩn chung; điều phối viên chấp nhận ngoại lệ nếu vẫn trên 20 000 từ sau khi cắt lặp. Bản lượt 2 có 30 431 từ, bản lượt 3 có 30 704 từ (brief ban đầu đặt 22 000–30 000).

## Phát hiện lượt 1 và cách xử lý

Hai báo cáo (rà toán, rà mạch truyện) được điều phối viên hợp nhất thành các mục A–E dưới đây; cột "Nguồn" ghi báo cáo gốc khi điều phối viên nêu rõ. Vị trí ghi theo số cũ (bản lượt 1). Không xóa phát hiện nào.

| # | Mức độ | Nguồn | Vị trí (số cũ) | Vấn đề | Quyết định | Trạng thái |
|---|---|---|---|---|---|---|
| A1 | nghiêm trọng (nâng từ N1) | rà toán, rà mạch truyện | Định nghĩa 02.5, đoạn sau Mệnh đề 02.9, Nhận xét 02.22, đoạn sau Định nghĩa 02.34, Nhận xét 02.41, tóm tắt | Ánh xạ hằng $\varphi\equiv\zeta^*$, $\psi\equiv x^*$, $T(s)=s+q^*-p^*$ thỏa (1.3) khi cả hai bài có nghiệm, nên mọi câu "không có ánh xạ nào thỏa (1.3)" sai | Thêm Nhận xét 02.7 (tương đương là tính chất của cặp ánh xạ; chỉ có ích khi $\varphi,\psi,T$ cho bằng công thức dựng từ cấu trúc bài toán: $x^\pm$, $t_i=m_i(x)$, $z=\log x$). Thay các câu phủ định bằng điều chứng được: nghiệm bài thay thế nói chung không là nghiệm gốc (Ví dụ 02.25: mọi nghiệm của $H$ có $\operatorname{err}=2$, tối ưu là $1$), không có công thức khôi phục. Nhận xét 02.43 phát biểu theo cách này. | đã sửa |
| B2 | trung bình | rà toán | Mệnh đề 02.38, đoạn sau | "Sự tồn tại cần hai nhãn" sai (một nhãn: $w=0$, $b\ge1$ cho $J=0$); "trường hợp riêng của Mệnh đề 02.20" không đúng | Điều kiện áp dụng: hai nhãn là điều kiện đủ để chặn $b$; thêm Nhận xét 02.40 với phản ví dụ một nhãn (tập nghiệm $\{(0,b)\mid b\ge1\}$ không bị chặn); "tương tự về cấu trúc" | đã sửa |
| B3 | trung bình | rà toán, rà mạch truyện | Mục 5.3 "Trong học máy", Tình huống 02.2, Ứng dụng, Mệnh đề 02.25, tóm tắt | Trỏ tới nội dung Bài 03 không có (đối ngẫu SVM, thủ thuật hạt nhân, chiều trần → hình phạt) | Đổi thành Boyd và Vandenberghe mục 8.6.1 và 6.3.1–6.3.2, "ngoài phạm vi học phần"; bỏ câu hỏi mở về chiều trần → hình phạt khỏi "Giới hạn còn lại" | đã sửa |
| B4 | trung bình | rà toán, rà mạch truyện | "Trong học máy" sau Hệ quả 02.3 | Dẫn (a) thay vì (c) với $C=\mathbb R^n$ | Dẫn (c) với $C=\mathbb R^n$, thêm "(gradient descent, Bài 05)" | đã sửa |
| B5 | trung bình | rà toán, rà mạch truyện | Mục 3.4 sau Định nghĩa 02.23 | "$P_i\succeq0$ là cần" mâu thuẫn Phạm vi của Mệnh đề 02.2; cặp điểm $(\sqrt2,\pm1)$ trùng `exercises.md` Bài 2(a); elip có thể rỗng | "Không bỏ được: bỏ thì tập khả thi có thể không lồi", cặp điểm $(2,\pm\sqrt3)$; thêm "(có thể rỗng hoặc suy biến thành một điểm)" | đã sửa |
| B6 | trung bình | rà mạch truyện | Bảng ký hiệu | Dòng $L,U$ không dùng; thiếu $L(w),R(w)$; tập nới lỏng $R$ trùng $R(w)$; ký hiệu một mục nằm trong bảng | Bỏ dòng $L,U$ và các ký hiệu một mục ($\mathbb R^n_{++}$, $z$, $\theta$, $\ell_{01}$, $\ell_h$, $F$); thêm $L(w),R(w),\lambda$; tập nới lỏng đổi thành $\tilde F$, nghiệm nới lỏng $\tilde x$; bảng 18 dòng (lượt 2 ghi nhầm 19) | đã sửa |
| B7 | trung bình | rà mạch truyện | Mục 3.3 trước Định nghĩa 02.19 | Thiếu ví dụ số trước định nghĩa chính quy hóa | Thêm Ví dụ 02.13 (giữ $a=1$; phạt bình phương $b=3/(5+\lambda)$; phạt trị tuyệt đối $b=\tfrac35-\tfrac\lambda{10}$ khi $\lambda<6$, $b=0$ khi $\lambda\ge6$); Ví dụ 02.17 trỏ về | đã sửa |
| B8 | trung bình | rà mạch truyện | Mục 1.3; "Trong học máy" sau Hệ quả 02.3 | Thiếu bài tập kiểm (1.3) cho phép đổi biến; thiếu ví dụ AI cho Hệ quả 02.3 | Thêm Bài tập 02.1 ($\min_{x>0}x+1/x$ và $\min_z\log(e^z+e^{-z})$, $\varphi=\log$, $\psi=\exp$, $T=\log$); dẫn Ví dụ 01.6 (logistic trên dữ liệu tách được) | đã sửa |
| B9 | trung bình | rà toán, rà mạch truyện | "Trong học máy" Mục 6.2 | "Không giải được bằng công cụ lồi" sai | "Không đưa được về một bài lồi duy nhất; lời giải chính xác cần liệt kê $\sum_{j\le k}\binom dj$ bài lồi" | đã sửa |
| B10 | trung bình | rà mạch truyện | Ví dụ 02.1, 02.4, 02.5; Định lý 02.14; Định nghĩa 02.12, 02.27; tính đóng của đơn thức; Mục 5.4 | Thiếu dẫn nguồn tại chỗ cho ví dụ kinh điển | Thêm dẫn tại chỗ (B&V 4.2.1 và MIT Bài giảng 4 tr. 4–7; Ví dụ 4.1 tr. 128; tr. 148; tr. 150; §6.1; §4.5; tr. 160–161; Bài tập 4.15 tr. 194) | đã sửa |
| B11 | trung bình | rà mạch truyện | Nhận xét 02.41, Thuật toán 02.1 bước 7 | Chỉ nêu ba phép xử lý, không khớp `exercises.md` Bài 14(c) | Nhận xét 02.43 thành bảng bốn phép (cải dạng tương đương, thay mất mát, thay ràng buộc bằng hình phạt, nới lỏng miền); Thuật toán 02.1 bước 7–8 theo bốn phép | đã sửa |
| C12 | nhẹ | rà toán | nhiều chỗ | Giả thiết Hệ quả 02.3(c); Mệnh đề 02.9(a); Mệnh đề 02.29(c) với $\sup g=+\infty$; Ví dụ 02.13 $\lambda=6$; "xác định dương"; hệ số chặn so với Ví dụ 01.10(b); số làm tròn Bài tập 02.1 và 02.7; "(7.1) của Bài 01"; tác giả 15.093J; $O(nK)$; "Một giá trị riêng khác" | Sửa đủ: "lồi và khả vi trên một tập mở lồi chứa $C$"; "tập nghiệm của hữu hạn bất đẳng thức và đẳng thức tuyến tính"; quy ước $1/(+\infty)=0$; câu bao hàm tập nghiệm; $2{,}51$ và $4{,}51$; $\ell(\tfrac12)\approx0{,}6839$ và ghi chú tổng tính từ giá trị chưa làm tròn; Dimitris Bertsimas; $O(nK)$ với chi phí nguyên | đã sửa |
| C13 | nhẹ | rà mạch truyện | nhiều chỗ | Thứ tự Nhận xét 02.18; nhu cầu dạng chuẩn LP; ví dụ $\log(e^z+e^{-z})$ trước Định lý 02.31; câu dẫn "cần gì trước"; nối Mục 5 → 6 và kết Mục 6; mở Mục 1; phát biểu lại (3.2); căn cứ định thức; tiên quyết; hai chỗ trỏ vào bước chứng minh; ví dụ SVM | Sửa đủ: Nhận xét 02.19 sau Ví dụ 02.12; đoạn nhu cầu nêu phương pháp đơn hình (simplex method, Bài 07); ví dụ $\log(e^z+e^{-z})$ và cách đọc phương sai đặt trước Định lý 02.32; câu dẫn trước Mệnh đề 02.10, 02.25, 02.30, 02.39, 02.42; Ví dụ 02.26 và Nhận xét 02.40 cho SVM; tiên quyết thêm phân rã trị riêng, Cauchy–Schwarz, hàm lõm | đã sửa |
| C14 | nhẹ | rà mạch truyện | nhiều chỗ | Thuật ngữ tiếng Anh lần đầu; "s.t."; $\lambda_i$ ở Bài tập 02.14; dữ liệu Bài tập 02.9(c); Bài tập 02.11(ii); bảng ánh xạ; dẫn thừa ở Tình huống 02.1; ký hiệu chồng nghĩa | Thêm cross-validation, cross-entropy, scaling law, decision boundary, kernel trick, quantile regression, simplex method, duality; "subject to"; $\mu$; Bài tập 02.10(c) dùng $x_1^2-4x_2^2\le4$ với $(4,\pm\sqrt3)$; Bài tập 02.12(ii) đổi thành $\min x^2-\lvert x\rvert$ (hệ số $-1$ trước cực đại); bảng ánh xạ sửa; bỏ dẫn Hệ quả 02.3(a); $\eta_{ij}$, $\nu_i$ ở Mục 4.4; $z_a,z_b,z_c$ ở Ví dụ 02.20; $\mathcal H$ trong chứng minh Mệnh đề 02.2; phạm vi của $b$ ghi trong bảng ký hiệu | đã sửa |
| C15 | nhẹ | rà mạch truyện | Mục 1, Mục 5, nhiều ví dụ | Hai câu siêu bình luận; "bài mới sống trong một không gian khác"; ý "đổi hàm gộp là đổi bài toán" lặp; nhãn bước không in đậm | Bỏ hai câu; "bài mới có biến trong $\mathbb R^{n'}$"; giữ ý một nơi (sau Định nghĩa 02.13); nhãn bước in đậm | đã sửa |
| N2 | nghiêm trọng | rà mạch truyện | Lời giải các ví dụ trùng với bài 1, 2, 3, 4, 5, 7, 10, 11, 13, 14 của `exercises.md` | Ghi chú chứa lời giải mẫu của bài giao chính thức | Đóng theo quyết định 2 của điều phối viên: chấp nhận vì bộ bài giao dựng từ ví dụ của deck; phần biến thể là bài giao thật | đã đóng (chấp nhận) |
| G1 | nhẹ | rà mạch truyện | Tình huống 02.3 | Tình huống dùng một nới lỏng mà giả thiết bị vi phạm | Giữ: tình huống minh họa giới hạn của tiền đề (nghiệm nới lỏng không nguyên), đúng yêu cầu có một tình huống vi phạm giả thiết | giữ |
| G2 | nhẹ | rà mạch truyện | Bài tập 02.11(a) | Đáp án có sẵn trong văn bản (Hệ quả, Ví dụ) | Giữ: bài ở mức nhận biết, mục đích là đối chiếu với văn bản | giữ |
| D | nhẹ | rà mạch truyện | toàn chương | Lặp ý "không phải cải dạng", đoạn chuỗi suy luận và đoạn kết tách đôi, danh mục ứng dụng dài, "Giả thiết hay bị bỏ quên" và "Chuỗi suy luận của toàn chương" trùng | Ý giữ ở Nhận xét 02.7, 02.43, bảng 6.1, chỗ khác trỏ số hiệu; gộp chuỗi suy luận với đoạn kết ở cả sáu mục; danh mục ứng dụng mỗi gạch một câu; "Giả thiết hay bị bỏ quên" còn ba câu; bỏ "Chuỗi suy luận của toàn chương" (lượt 3 khôi phục thành một đoạn bốn câu, xem R1); bỏ đoạn sau hình nghịch đảo | đã sửa |
| E16 | nhẹ | điều phối viên | `review-log.md` | Thiếu bảng phát hiện, quyết định; hai dòng tự kiểm sai (thứ tự Nhận xét 02.18; dòng $L,U$ trong bảng ký hiệu) | Tệp này | đã sửa |

## Phát hiện lượt 2 và cách xử lý

Nguồn: rà lại lượt 2 của rà toán và rà mạch truyện, hợp nhất trong quyết định lượt 2 của điều phối viên. Vị trí theo số hiệu lượt 2.

| # | Mức độ | Vị trí | Vấn đề | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| R1 | trung bình | Tóm tắt chương | Bỏ "Chuỗi suy luận của toàn chương" làm mất đoạn nối toàn chương | Khôi phục một đoạn bốn câu dẫn Định nghĩa 02.1, Mệnh đề 02.2 → Hệ quả 02.3 → Mệnh đề 02.6, Nhận xét 02.7 → Mệnh đề 02.11, Định lý 02.15 → Mệnh đề 02.18, 02.21 → Định lý 02.32, 02.33 → Mệnh đề 02.36, 02.42 → Thuật toán 02.1. Bù độ dài: dòng kiểm của Ví dụ 02.26 (trùng Tình huống 02.2) thay bằng kiểm tại $\lambda=2$; bỏ câu "Mục này…" lặp ở đầu Mục 6 | đã sửa |
| R2 | nhẹ | Chứng minh Mệnh đề 02.30(c) | Thiếu lập luận cho $\inf_C(1/g)=1/\sup_Cg$ khi không có nghiệm | Thêm: $s\mapsto1/s$ giảm chặt, liên tục, nên cận trên đúng thành cận dưới đúng; giả thiết $C\ne\varnothing$ ghi trong kết luận (c) | đã sửa |
| R3 | nhẹ | Chứng minh Mệnh đề 02.18 | "Giao của nửa không gian đóng và tập affine đóng" | "Tập nghiệm của hữu hạn bất đẳng thức tuyến tính không chặt và đẳng thức tuyến tính, nên đóng" | đã sửa |
| R4 | nhẹ | Mục 5.3 "Trong học máy", Tình huống 02.2 | Dẫn B&V 8.6.1 cho đối ngẫu SVM lề mềm và thủ thuật hạt nhân (mục này không trình bày) | Chỉ ghi "ngoài phạm vi học phần", không kèm nguồn; B&V 8.6.1 chỉ còn dẫn cho phân loại tuyến tính | đã sửa |
| R5 | nhẹ | Mệnh đề 02.26, Phạm vi | Thiếu mục vô hướng hóa | Thêm B&V mục 4.7.4 | đã sửa |
| R6 | nhẹ | Bài tập 02.15; chứng minh Mệnh đề 02.18, 02.25 | $\mu$ trùng ký hiệu $\mu\succeq0$ của bảng ký hiệu | Chứng nhận dùng $\nu$ với $\lvert\nu_i\rvert\le1$; giá trị riêng nhỏ nhất ký hiệu $\lambda_{\min}$ | đã sửa |
| R7 | nhẹ | Bài tập 02.7(a), (d) | Thiếu dẫn nguồn | Thêm "(phỏng theo Boyd và Vandenberghe 2004, tr. 161)" | đã sửa |
| R8 | nhẹ | Ranh giới Mục 3 – Mục 4 | Câu nối chỉ có một phía | Kết Mục 3: "Mục 4 dùng phép đổi biến"; mở Mục 4 nhắc ba lớp của Mục 2–3 nhận ra tính lồi theo biến ban đầu, bài thiết kế thì không | đã sửa |
| R9 | nhẹ | Đoạn đọc hình $1/x$ | Chưa nối với Nhận xét 02.8 | Thêm: cận dưới đúng $p^*=0$ không đạt, đúng tình huống Nhận xét 02.8 | đã sửa |
| R10 | nhẹ | Đầu Mục 6, kết Mục 5 | "Có sẵn hình dạng" mơ hồ | "Đã biết trước thuộc lớp nào" | đã sửa |
| R11 | nhẹ | Mục 2.1, 3.1, 4.1 | Nhãn trực giác viết lẫn trong đoạn | Tách đoạn, nhãn in đậm "**Trực giác (chưa phải định nghĩa).**" | đã sửa |
| R12 | nhẹ | nhiều chỗ | "token" chưa giải nghĩa; "entropy chéo (cross-entropy)" chưa ở lần đầu; "đối ngẫu (duality) mạnh"; câu cuối Nhận xét 02.40; câu dài trong Nhận xét 02.7; thứ tự bảng ánh xạ; phạm vi của $m$, $m_i$ | Giải nghĩa token ở Mục 4.5; tiếng Anh chuyển lên lần đầu ở Mục 4.3; "đối ngẫu mạnh (strong duality)"; "dữ liệu một nhãn chỉ cho bộ phân loại hằng"; tách câu sau "(Mục 4.3)"; "02.1, 02.2"; ghi $m$ ở Bổ đề 02.22 và $m_i$ ở chứng minh Định lý 02.15 là ký hiệu cục bộ | đã sửa |
| R13 | nhẹ | `review-log.md` | Cột nguồn của A1, B4, B5, B9; thiếu N2 và hai dòng "giữ"; số dòng bảng ký hiệu; thứ tự hành trình SVM; câu tự kiểm về "nhu cầu của mục sau"; thiếu ghi tác tử và quyết định lượt 2 | Sửa trong tệp này | đã sửa |

Phát hiện deck-side theo quyết định 3:

| Mức độ | Vị trí | Vấn đề | Quyết định | Trạng thái |
|---|---|---|---|---|
| nhẹ | Bộ trang chiếu Bài 02, quy hoạch hình học | Đẳng thức đơn thức ký hiệu $h_j$ (ghi chú dùng $g_j$) | sửa phía deck | chờ sửa deck |
| nhẹ | Bộ trang chiếu Bài 02 | Nghiệm ký hiệu $x^\star$ (ghi chú dùng $x^*$) | sửa phía deck | chờ sửa deck |
| nhẹ | Bộ trang chiếu Bài 02, quy hoạch tuyến tính | $\le$ giữa hai vector (ghi chú dùng $\preceq$) | sửa phía deck | chờ sửa deck |
| nhẹ | Bộ trang chiếu Bài 02, quy hoạch hình học | Chỉ số $g_k$ (ghi chú dùng $g_i$, $g_j$ theo vai) | sửa phía deck | chờ sửa deck |

## Giáo trình đã tham khảo

| Mục của chương | Giáo trình, mục, trang | Điều học được và cách dùng |
|---|---|---|
| Mục 1 (bài toán lồi, cải dạng tương đương, ba ví dụ một biến) | Boyd và Vandenberghe (2004) §4.1 (tr. 127–136), §4.1.3 (tr. 130–135), §4.2.1–4.2.3 (tr. 136–140), Ví dụ 4.1 (tr. 128); MIT 6.079 Bài giảng 4, tr. 4–2 đến 4–13 | Thứ tự dạng chuẩn → bài toán lồi → toàn cục → điều kiện tối ưu; ví dụ biểu diễn không lồi của tập lồi (tr. 4–7) thành Ví dụ 02.1; "tương đương không chính thức" (tr. 4–11 đến 4–13) được làm chính xác thành Định nghĩa 02.5, Mệnh đề 02.6 và Nhận xét 02.7 (đổi thứ tự: cải dạng đặt sau Hệ quả 02.3 vì Mục 2–4 cần nó làm công cụ chứng minh). Ví dụ $1/x$ và $-\log x$ lấy theo Ví dụ 4.1. Chiều cần của (1.2) dẫn tr. 139–140, không chứng minh. |
| Mục 2 (quy hoạch tuyến tính, biến phụ) | B&V §4.3 (tr. 146–152): bài toán khẩu phần (tr. 148), cực tiểu hàm tuyến tính từng khúc (tr. 150); §6.1 (tr. 291–302); MIT 6.079 Bài giảng 4, tr. 4–17, 4–18; Bertsimas và Tsitsiklis (1997) §2.6 | Bài pha trộn giữ vai trò bài khẩu phần; biến phụ tổng quát hóa ví dụ tr. 150 thành Định lý 02.15; chứng nhận bằng tổ hợp không âm (Mệnh đề 02.11) là phiên bản sơ cấp của đối ngẫu yếu, dẫn tới Bài 03. Tính tối ưu tại đỉnh chỉ dẫn nguồn (Nhận xét 02.12). |
| Mục 3 (QP, chính quy hóa, QCQP) | B&V §4.4 (tr. 152–160); §6.3.1–6.3.2 (tr. 306–310); MIT 6.079 Bài giảng 4, tr. 4–22, 4–24; Tibshirani (1996) | $P\succeq0$ là một phần của định nghĩa QP, QCQP (như B&V); chuẩn một như phép thay thế lồi của phép đếm; quan hệ hình phạt – trần chỉ chứng minh một chiều (Mệnh đề 02.26), chiều ngược ngoài phạm vi học phần. |
| Mục 4 (GP) | B&V §4.5 (tr. 160–167); §3.1.5 (tr. 74); Bài tập 4.20 (tr. 196); MIT 6.079 Bài giảng 4, tr. 4–29, 4–30; Bài giảng 3, tr. 3–10; Hoffmann và cộng sự (2022) §3.3 | Thứ tự đơn thức → tổng đơn thức dương → dạng chuẩn → đổi biến → dạng lồi giữ như B&V. Log-sum-exp lồi được chứng minh bằng cách đọc Hessian như ma trận hiệp phương sai, có ví dụ $\log(e^z+e^{-z})$ đặt trước. Phân bổ công suất phỏng theo Bài tập 4.20, số liệu tự xây dựng. Ví dụ 02.23 dùng dạng tham số của luật tỷ lệ, số liệu giả lập. |
| Mục 5 (hàm thay thế, SVM, nới lỏng) | B&V §8.6.1 (tr. 423–427); Bài tập 4.15 (tr. 194); MIT 15.093J (Dimitris Bertsimas) Bài giảng 16, mục 2 | Mất mát bản lề và SVM lề mềm theo B&V; đối ngẫu và thủ thuật hạt nhân ghi ngoài phạm vi học phần. Nới lỏng LP và câu hỏi của Bài tập 4.15 thành Mệnh đề 02.42. Brief nêu "B&V 7.1 (hàm mất mát thay thế)"; trong bản PDF cục bộ, §7.1 là ước lượng phân phối tham số, nên chương dẫn §8.6.1. |
| Mục 6 (tổng hợp, số đặc trưng) | B&V §6.3.2 (tr. 306–310); MIT 6.079 Bài giảng 4 | Bảng nhận dạng và Thuật toán 02.1 mở rộng Thuật toán 01.1 của Bài 01; nguyên lý thay phép đếm bằng chuẩn một và giới hạn của nó (Ví dụ 02.29). |
| Tình huống và bài tập | Như các mục tương ứng; không dịch hay chép đoạn văn nào | Số liệu tình huống và bài tập củng cố là số liệu mới, khác bộ dữ liệu chung của `exercises.md`. |

## Tự kiểm theo bảng kiểm "Kiểm định ghi chú bài giảng" (bản lượt 2)

| Mục kiểm | Kết quả | Bằng chứng |
|---|---|---|
| Mỗi mục tiêu học tập có định lý hoặc ví dụ và bài tập | Đạt | Bảng ánh xạ ở đầu "Bài tập củng cố": mục tiêu 1 (Bài tập 02.1, 02.2, 02.11), 2 (02.3, 02.4, 02.12, 02.15, 02.17), 3 (02.5, 02.6, 02.13, 02.14), 4 (02.7, 02.16), 5 (02.8, 02.9, 02.11, 02.13), 6 (02.10, 02.14–02.17). |
| Mỗi khái niệm trọng tâm đi đủ tám bước | Đạt | LP: nhu cầu và Ví dụ 02.5 → hình miền khả thi → Định nghĩa 02.9 → Mệnh đề 02.10, 02.11 → chứng minh → Ví dụ 02.6, 02.7 → Nhận xét 02.12 → Bài tập 02.3. Biến phụ: dữ liệu 2.4 → hình → Định nghĩa 02.13 → Bổ đề 02.14, Định lý 02.15 → chứng minh → Ví dụ 02.8, 02.9 → Nhận xét 02.16 → Bài tập 02.4. QP: Ví dụ 02.10 → hình → Định nghĩa 02.17 → Mệnh đề 02.18 → chứng minh → Ví dụ 02.11, 02.12 → Nhận xét 02.19 (sau Ví dụ 02.12; dòng tự kiểm lượt 1 ghi sai thứ tự) → Bài tập 02.5. Chính quy hóa: Ví dụ 02.13 → hình → Định nghĩa 02.20 → Mệnh đề 02.21, Bổ đề 02.22 → chứng minh → Ví dụ 02.14–02.17 → Nhận xét 02.23 → Bài tập 02.5, 02.14. QCQP: mở đầu 3.4 → hình → Định nghĩa 02.24 → Mệnh đề 02.25, 02.26 → chứng minh → Ví dụ 02.18 → Nhận xét 02.27 → Bài tập 02.6. GP: Ví dụ 02.19 → hình → Định nghĩa 02.28, 02.29 → Mệnh đề 02.30, Bổ đề 02.31, Định lý 02.32, 02.33 → chứng minh → Ví dụ 02.20–02.23 → Nhận xét 02.34 → Bài tập 02.7. Hàm thay thế: Ví dụ 02.24 → hình → Định nghĩa 02.35 → Mệnh đề 02.36 → chứng minh → Ví dụ 02.25 → Nhận xét 02.37 → Bài tập 02.8. SVM: nhu cầu và Ví dụ 02.26 (đứng trước định nghĩa) → Định nghĩa 02.38 → Mệnh đề 02.39 → chứng minh → Nhận xét 02.40 → ví dụ áp dụng là Tình huống 02.2 → Bài tập 02.13 (lượt 2 ghi sai thứ tự Nhận xét 02.40 và Tình huống 02.2). Nới lỏng: Ví dụ 02.27 → trực giác → Định nghĩa 02.41 → Mệnh đề 02.42 → chứng minh → Ví dụ 02.28 → Nhận xét 02.43 → Bài tập 02.9. |
| Ký hiệu có trong bảng ký hiệu | Đạt cho ký hiệu xuyên suốt | Bảng 18 dòng (đếm lại ở lượt 3) (không còn dòng $L,U$; dòng tự kiểm lượt 1 ghi sai). Ký hiệu cục bộ ($\mathbb R^n_{++}$, $z$, $\theta$, $\ell_{01}$, $\ell_h$, $F$, $\tilde F$, $\kappa$, $N_p,N_d$) được giới thiệu tại chỗ. |
| Định lý đủ bốn phần, có chứng minh hoặc nguồn có trang | Đạt | Script kiểm: mọi khối theorem, proposition, lemma, corollary có đủ Giả thiết, Kết luận, Điều kiện áp dụng, Phạm vi; 20 khối proof đứng ngay sau kết quả, kết thúc bằng $\square$. |
| Ví dụ có kết quả số và dòng kiểm tra lại | Đạt | 29/29 ví dụ có "**Kiểm tra lại.**". Số liệu mới của lượt 2 được tính lại bằng Python (danh sách trong báo cáo bàn giao). |
| Bài tập có hint và solution | Đạt | 17 bài, mỗi bài theo sau đúng một hint rồi một solution. |
| Không "xem trang chiếu", không câu mảnh, không bỏ bước | Đạt | Quét "trang chiếu", "slide", mã trang, "chúng ta", "hãy", "dễ thấy", "suy ra ngay", dấu hỏi ngoài công thức: 0 kết quả. |
| Số hiệu liên tục, tham chiếu đúng, khối không lồng, render đúng | Đạt | 46 khối bộ đếm chung, 29 ví dụ, 17 bài tập, 3 tình huống, 1 thuật toán; 493 tham chiếu `02.k` khớp loại, 23 số hiệu trần chỉ trong bảng ánh xạ; 112 tham chiếu `01.k` khớp loại và số hiệu của `lec-01b`. Viewer: 150 khối `:::` = 150 `.material-block`. |
| Móc nối, "Trong học máy", chuỗi suy luận, mở và kết chương | Đạt | 13 đoạn "Trong học máy"; mỗi mục có một đoạn "Chuỗi suy luận và kết quả" nêu kết quả và thiếu hụt còn lại; nhu cầu của mục sau được nêu ở đoạn mở của mục đó (Mục 4 và Mục 6 nhắc lại thiếu hụt của mục trước); tóm tắt có "Chuỗi suy luận của toàn chương" và nối Bài 03, 04, 07. |
| Giáo trình ghi theo mục | Đạt | Bảng "Giáo trình đã tham khảo"; dẫn tại chỗ trong văn bản. |
| Nhất quán với bộ trang chiếu | Đạt, có chỗ lệch có chủ ý | Xem "Chỗ lệch có chủ ý" và bảng phát hiện deck-side. |

### Tự kiểm `no-ai-slop` (eval.md)

- Từ cấm, trạng từ rỗng ("quan trọng", "then chốt", "đáng chú ý", "rất", "hoàn toàn", "thực sự", "chính là", "lưu ý", "nói cách khác"): 0 kết quả.
- Siêu bình luận: đã bỏ "Phần Phạm vi là chỗ hay bị bỏ quên…" và "đây là chỗ hay bị hiểu sai"; nhân cách hóa "bài mới sống trong một không gian khác" đã đổi.
- Đối lập nhị phân, câu hỏi tu từ, lời dẫn tiến trình: không còn.
- Gạch ngang dài: một lần (tiêu đề theo quy định).
- Giọng học thuật và độ chính xác toán học được ưu tiên hơn gợi ý về giọng nói của kỹ năng.

## Kiểm tra kỹ thuật đã chạy (lượt 3)

- Đếm từ: 30 704. Script cấu trúc: 0 lỗi (46 khối bộ đếm chung, 29 ví dụ, 17 bài tập; 508 tham chiếu `02.k`, 112 tham chiếu `01.k` khớp loại). Số hiệu không đổi so với lượt 2.
- Sync rồi `--check`: OK (20 tệp). `git diff --check`: sạch.
- Playwright 1600×900 (và 390×844): không `pageerror`, `.katex-error` = 0, 150 khối = 150 `.material-block`, 24/24 hình, không tràn ngang cấp trang, không công thức khối nào tràn ở 1600 px.

## Kiểm tra kỹ thuật đã chạy (lượt 2)

- Đếm từ: `wc -w materials/lec-02b/lecture-note.md` = 30 431 (lượt 1: 29 961). Lượt 2 thêm Nhận xét 02.7, 02.40, Ví dụ 02.13, 02.26, Bài tập 02.1, bảng bốn phép xử lý, các câu dẫn và dẫn nguồn; cắt lặp theo mục D, rút gọn mục tiêu học tập và tài liệu tham khảo. Ngoại lệ độ dài theo quyết định 4.
- Script cấu trúc (`scratchpad/lec02b/tools/check.py`): 0 lỗi.
- `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: OK (20 tệp). `git diff --check`: sạch.
- Playwright Chromium, `http://localhost:8765/2627-1/material-viewer.html?doc=materials/lec-02b/lecture-note.md`, 1600×900 và 390×844, đầu, giữa, cuối: không `pageerror`; `.katex-error` = 0; 24/24 hình nạp; không tràn ngang cấp trang (scrollWidth 1585 ≤ 1600, 375 ≤ 390); 150 khối. Ở 1600 px, công thức tóm tắt dòng một tràn khung (865 > 808 px) và đã được tách thành hai dòng; sau sửa không công thức khối nào tràn. Ở 390 px, 55 công thức khối cuộn ngang bên trong `.katex-display`, như bản 01b đã duyệt. Phần tử vượt mép phải chỉ là đường SVG và MathML ẩn bên trong khối gập. Một lỗi CSP từ script nội tuyến do `reloadserver` chèn, giống bản 01b.

## Hình thiếu hoặc hạn chế

- Dùng lại 24 SVG của `img/lec-02/`; không tạo hình mới.
- Không có hình cho: đường đi nghiệm LASSO (Tình huống 02.1), lề của SVM một chiều (Tình huống 02.2), bài ba lô (Tình huống 02.3), luật tỷ lệ (Ví dụ 02.23), phản ví dụ bốn điểm của hình phạt chuẩn một (Ví dụ 02.29).
- Ở màn 390 px, viewer hiển thị SVG rộng 900 px trong khung cuộn ngang (thiết kế chung của viewer).

## Chỗ lệch có chủ ý so với outline hoặc deck

1. Ký hiệu: hằng số của mục tiêu QP và QCQP là $s$, $s_i$ (deck dùng $r_0$, $r_i$); số mẫu là $N$ (deck dùng $m$); số lỗi là $\operatorname{err}(\theta)$ (deck dùng $E(\theta)$); đẳng thức đơn thức của GP là $g_j$ (deck dùng $h_j$). Phía deck: "chờ sửa deck".
2. Khung lý thuyết không có trên deck: Định nghĩa 02.5, Mệnh đề 02.6, Nhận xét 02.7, Mệnh đề 02.11, Định lý 02.15, Bổ đề 02.22, Mệnh đề 02.26, 02.39, Nhận xét 02.40, Mệnh đề 02.42, 02.45.
3. Ví dụ mới: Ví dụ 02.13 (phạt một hệ số), 02.14 ($\ell_1+\ell_1$, $\lambda=6$, vô số nghiệm), 02.23 (luật tỷ lệ), 02.26 (bản lề trên dữ liệu tách được); ba tình huống với dữ liệu mới.
4. Trang "Tư duy thiết kế phương pháp AI" của deck viết lại thành Nhận xét 02.37; các trang câu hỏi kiểm tra biến thể thành bài tập mới.
5. Ví dụ chính quy hóa ở Mục 3.3 phạt cả hệ số chặn như deck; Tình huống 02.1 và SVM không phạt hệ số chặn.
6. Không đưa vào: tựa lồi, tối ưu nhiều mục tiêu, SDP.

## Điểm còn phân vân (chuyển điều phối viên)

- Dẫn Bertsimas và Tsitsiklis (1997) §2.6 và Hoffmann và cộng sự (2022) §3.3 theo hiểu biết của tác tử soạn, không có bản PDF cục bộ để kiểm trang.
- Độ dài 30 704 từ (lượt 3), vượt trần 30 000 của brief ban đầu 704 từ; cắt thêm sẽ phải bỏ nội dung mà lượt 1 và lượt 2 yêu cầu thêm.

## Bảng đổi số hiệu (lượt 1 → lượt 2)

| Loại | Số cũ → số mới |
|---|---|
| Bộ đếm chung | mới: Nhận xét 02.7 (tương đương là tính chất của cặp ánh xạ), Nhận xét 02.40 (giả thiết hai nhãn). 02.7→02.8; 02.8–02.18→02.9–02.19 (tăng 1); 02.19–02.37→02.20–02.38 (tăng 1); 02.38→02.39; 02.39–02.44→02.41–02.46 (tăng 2). 02.1–02.6 giữ nguyên. |
| Ví dụ | mới: Ví dụ 02.13 (phạt một hệ số), Ví dụ 02.26 (bản lề trên dữ liệu tách được). 02.1–02.12 giữ nguyên; 02.13–02.24→02.14–02.25; 02.25–02.27→02.27–02.29. |
| Bài tập | mới: Bài tập 02.1 (kiểm (1.3) cho $x=e^z$). 02.1–02.16→02.2–02.17. |
| Tình huống, thuật toán | không đổi. |

## Chỉnh sửa trình bày sáng sủa 2026-10-09

Yêu cầu người dùng: "trình bày các chứng minh và diễn giải sáng sủa hơn, cần thì xuống dòng để tách các ý ra không bị dính vào nhau"; tiêu chí ở tiểu mục "Trình bày sáng sủa: chứng minh và diễn giải" của `AGENTS.md`.

**Tác tử.** Tác tử chỉnh sửa (editor), loại `general-purpose`, mô hình Claude Opus 5.5 (`claude-opus-5-5`), effort `high`, theo brief của điều phối viên Fable 5.1. Phạm vi ghi: `materials/lec-02b/lecture-note.md` và nhật ký này.

**Phạm vi thay đổi.** Chỉ bố cục và tách câu; không đổi nội dung toán học, căn cứ, số liệu, số hiệu, tiêu đề khối hay thứ tự khối; không thêm hay bớt bước lập luận.

| loại khối | số khối đã bố cục lại / tổng |
|---|---|
| proof | 20 / 20 (chia bước có nhãn in đậm; chứng minh ngắn của Hệ quả 02.3 chuyển thành danh sách ba phần) |
| solution | 17 / 17 |
| example | 29 / 29 (nhãn Lập mô hình, Kiểm giả thiết, Tính, Diễn giải, Kiểm tra lại; phép tính có kết quả trung gian dài đặt trên dòng riêng) |
| remark | 13 / 13 (nhầm lẫn "Thứ nhất, thứ hai…" thành danh sách đánh số) |
| exercise (đề) | 15 / 17 |
| proposition, theorem, corollary, definition | 9, 2, 1, 6 (danh sách kết luận (a), (b), (c) mỗi mục một dòng hoặc mỗi mục một đoạn khi có công thức hiển thị) |
| application | 3 / 3 (giai đoạn "Áp dụng" tách thành các nhãn con) |

Số liệu khác: đoạn văn ngoài khối từ 143 lên 236 (khoảng 93 lần tách đoạn diễn giải); mục danh sách từ 36 lên 265; công thức hiển thị từ 62 lên 110, khối `aligned` từ 10 lên 24; 85 nhãn bước. Số từ: 30 704 → 31 840.

**Kiểm tra đã chạy.**

- Script so sánh bản trước và sau (bản sao trong thư mục tạm của phiên): số khối `:::` và dãy nhãn khối (loại, tên, số hiệu) giống hệt, cùng thứ tự; số dòng đóng `:::` bằng số khối; số `$$` chẵn; không có `\text{}` chứa chữ có dấu; tập tham chiếu chéo (Định nghĩa, Mệnh đề, Định lý, Hệ quả, Bổ đề, Ví dụ, Nhận xét, Bài tập, Tình huống, Thuật toán kèm số hiệu) và tập số hiệu công thức không mất mục nào; tập các con số trong văn bản không mất số nào (số thêm vào chỉ là số thứ tự của nhãn bước và mục danh sách).
- So sánh tập từ (chữ thường, ngoài công thức): từ mất đi chỉ là từ nối ("nên", "và", "với", "thứ nhất/hai/ba") do tách câu và chuyển thành danh sách; từ thêm vào là nhãn ("Bước", "phần", "Lập mô hình", "Tính", "Kiểm tra lại", "Diễn giải"). Công thức nội dòng mất đi đều đã chuyển sang công thức hiển thị.
- `git diff --check` trên hai tệp: đạt.
- Playwright Chromium qua `python3 -m reloadserver 8765`, `material-viewer.html?doc=materials/lec-NN/lecture-note.md`, ở 1600×900 và 390×844, so với bản trước (bản trước được phục vụ qua chặn yêu cầu, không ghi vào kho): không `pageerror`; `.katex-error` = 0; dòng trạng thái cảnh báo của trình đọc ẩn (không có công thức lỗi); `scrollWidth` của trang nhỏ hơn bề rộng khung nhìn ở cả hai cỡ; số `.material-block` bằng số khối. Lỗi console CSP về script nội dòng có ở cả bản trước và bản sau, không do nội dung ghi chú.
- Ảnh chụp một khối chứng minh đã mở ở hai cỡ màn hình, đã tự xem; công thức `aligned` canh dấu đúng, nhãn bước in đậm đứng đầu đoạn.
- `no-ai-slop` (chế độ Edit, đối chiếu `eval.md`): chỉ tách câu, đổi bố cục và thêm nhãn; không thêm câu dẫn, lời nhấn mạnh hay kết luận; nhãn bước nêu nội dung bước, không trang trí. Đạt.
- Không chạy `scripts/sync-local-materials.py`, không sửa `material-local-data.js` (theo brief; tệp này đang có thay đổi của tác tử khác). Không commit.

**Điểm còn phân vân (chuyển điều phối viên).**

- Hai đoạn "Định nghĩa." và "Kết quả." của Tóm tắt chương là danh mục ngăn bằng dấu chấm phẩy; giữ nguyên vì là danh mục tra cứu.
- Bước 8 của Thuật toán 02.1 và các dòng "Dẫn ngược lý thuyết" vẫn liệt kê bằng dấu chấm phẩy; giữ nguyên vì là bước thuật toán và danh mục dẫn chiếu.
- Ở 390×844, 91/110 công thức hiển thị cuộn ngang trong khung riêng (bản trước 55/62); trang không tràn ngang.
